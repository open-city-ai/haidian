#!/usr/bin/env python3
"""Discover authoritative public sources for the Haidian AI brief.

The agent is intentionally dependency-free. It uses:

1. A curated query list for web search.
2. Existing seed URLs for link exploration.
3. Lightweight metadata extraction and scoring rules aligned with
   brief/source-quality-rules.md.

It does not automatically add sources to the public brief. It writes a review
queue for humans to approve.

Discovery pipeline
------------------
1. Load seed URLs from ``brief/data/auto-crawl-seed-urls.csv``.
2. Load search queries from ``brief/data/discovery-queries.txt``.
3. For each seed URL, fetch the page and extract outbound links.
4. Score each candidate URL against topic terms, recency signals, and
   domain authority rules.
5. Write ranked candidates to ``brief/discovery/candidate-sources.csv``.

The output CSV can be fed into ``scripts/prepare_source_registry_draft.py``
to generate a draft registry for maintainer review.

Usage
-----
Run discovery from defaults::

    python3 scripts/discover_public_sources.py

Limit to a subset of seed URLs::

    python3 scripts/discover_public_sources.py --max-seeds 10

Write to a custom output directory::

    python3 scripts/discover_public_sources.py --output-dir path/to/discovery

Exit code is 0 when discovery completes and 1 on network or IO error.
"""
from __future__ import annotations

import argparse
import csv
import datetime as dt
import hashlib
import html
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SEED_CSV = REPO_ROOT / "brief/data/auto-crawl-seed-urls.csv"
DEFAULT_QUERY_FILE = REPO_ROOT / "brief/data/discovery-queries.txt"
DEFAULT_OUTPUT_DIR = REPO_ROOT / "brief/discovery"

USER_AGENT = (
    "haidian-public-source-discovery/0.1 "
    "(public brief research; contact: repository maintainer)"
)

TOPIC_TERMS = [
    "百年京张",
    "京张",
    "ai创新带",
    "ai 创新带",
    "人工智能创新带",
    "人工智能",
    "原点社区",
    "三区两翼",
    "海淀",
    "中关村科学城",
    "京张铁路遗址公园",
    "清华园车站",
    "五道口",
    "大钟寺",
    "小月河",
    "众智园",
    "学北园",
    "城市智能体",
    "城市大脑",
    "智能体",
    "慢行",
    "绿道",
    "滨水",
    "公共空间",
    "创新街区",
    "创新高地",
    "ai+",
    "ai +",
]

FORMAL_DOC_TERMS = [
    "公告",
    "通知",
    "政策文件",
    "政府公报",
    "规划纲要",
    "规划",
    "统计公报",
    "标准",
    "行动计划",
    "实施方案",
    "若干措施",
    "意见",
    "办法",
    "开放数据",
    "数据目录",
    "资格预审",
]

NEWS_TERMS = ["新闻", "报道", "发布", "召开", "推进会", "专题", "解读", "图解"]

OFFICIAL_HOSTS_A0 = {
    "www.gov.cn",
    "www.beijing.gov.cn",
    "ghzrzyw.beijing.gov.cn",
    "fgw.beijing.gov.cn",
    "kw.beijing.gov.cn",
    "jxj.beijing.gov.cn",
    "zyk.bjhd.gov.cn",
    "www.bjhd.gov.cn",
    "data.beijing.gov.cn",
    "tjj.beijing.gov.cn",
    "yllhj.beijing.gov.cn",
    "wwj.beijing.gov.cn",
    "jtw.beijing.gov.cn",
    "swj.beijing.gov.cn",
    "cac.gov.cn",
    "www.cac.gov.cn",
}

OFFICIAL_SUFFIXES = (".gov.cn", ".beijing.gov.cn", ".bjhd.gov.cn")

MEDIA_HOSTS_A2 = {
    "www.people.com.cn",
    "people.com.cn",
    "www.xinhuanet.com",
    "xinhuanet.com",
    "www.chinanews.com.cn",
    "chinanews.com.cn",
    "www.bjd.com.cn",
    "bjd.com.cn",
}

INTERNATIONAL_HOSTS_A3 = {
    "www.oecd.org",
    "oecd.org",
    "unhabitat.org",
    "www.unhabitat.org",
    "www.brookings.edu",
    "brookings.edu",
    "gouai.cidob.org",
    "www.cidob.org",
    "cidob.org",
}

EXCLUDED_HOST_KEYWORDS = [
    "map.baidu",
    "amap.com",
    "qq.com/map",
    "google.com/maps",
]

EXCLUDED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".svg",
    ".css",
    ".js",
    ".ico",
    ".mp4",
    ".mp3",
    ".zip",
    ".rar",
}


@dataclass
class FetchResult:
    url: str
    final_url: str
    status: int | None
    content_type: str = ""
    charset: str = ""
    body: bytes = b""
    error: str = ""


@dataclass
class PageMetadata:
    title: str = ""
    description: str = ""
    text: str = ""
    meta: dict[str, str] = field(default_factory=dict)
    links: list[tuple[str, str]] = field(default_factory=list)


@dataclass
class Candidate:
    url: str
    final_url: str = ""
    title: str = ""
    status: int | None = None
    content_type: str = ""
    published_date: str = ""
    accessed_date: str = ""
    authority: str = ""
    recency: str = ""
    score: int = 0
    topic_hits: list[str] = field(default_factory=list)
    discovery_method: str = ""
    query: str = ""
    source_seed: str = ""
    notes: str = ""
    error: str = ""

    def identity_url(self) -> str:
        return canonicalize_url(self.final_url or self.url)


class MetadataParser(HTMLParser):
    def __init__(self, max_text_chars: int = 80_000) -> None:
        super().__init__(convert_charrefs=True)
        self.in_title = False
        self.title_parts: list[str] = []
        self.text_parts: list[str] = []
        self.meta: dict[str, str] = {}
        self.links: list[tuple[str, str]] = []
        self._current_href: str | None = None
        self._current_anchor_text: list[str] = []
        self.max_text_chars = max_text_chars
        self._text_len = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = {key.lower(): value or "" for key, value in attrs}
        tag = tag.lower()
        if tag == "title":
            self.in_title = True
        elif tag == "meta":
            key = (
                attrs_dict.get("name")
                or attrs_dict.get("property")
                or attrs_dict.get("http-equiv")
                or ""
            ).strip().lower()
            value = attrs_dict.get("content", "").strip()
            if key and value:
                self.meta[key] = value
        elif tag == "a":
            self._current_href = attrs_dict.get("href")
            self._current_anchor_text = []

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag == "title":
            self.in_title = False
        elif tag == "a" and self._current_href:
            anchor = normalize_space(" ".join(self._current_anchor_text))
            self.links.append((self._current_href, anchor))
            self._current_href = None
            self._current_anchor_text = []

    def handle_data(self, data: str) -> None:
        if not data:
            return
        if self.in_title:
            self.title_parts.append(data)
        if self._current_href is not None:
            self._current_anchor_text.append(data)
        if self._text_len < self.max_text_chars:
            chunk = normalize_space(data)
            if chunk:
                self.text_parts.append(chunk)
                self._text_len += len(chunk)

    def metadata(self) -> PageMetadata:
        html_title = normalize_space(" ".join(self.title_parts))
        title = (
            self.meta.get("articletitle")
            or self.meta.get("article:title")
            or self.meta.get("og:title")
            or html_title
        )
        title = normalize_space(title)
        desc = self.meta.get("description", "") or self.meta.get("og:description", "")
        return PageMetadata(
            title=title,
            description=normalize_space(desc),
            text=normalize_space(" ".join(self.text_parts)),
            meta=self.meta,
            links=self.links,
        )


def normalize_space(value: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(value or "")).strip()


def canonicalize_url(url: str) -> str:
    parsed = urllib.parse.urlsplit(url.strip())
    scheme = parsed.scheme.lower()
    netloc = parsed.netloc.lower()
    path = re.sub(r"/{2,}", "/", parsed.path)
    query_pairs = []
    for key, value in urllib.parse.parse_qsl(parsed.query, keep_blank_values=True):
        if key.lower().startswith(("utm_", "spm", "from", "share")):
            continue
        query_pairs.append((key, value))
    query = urllib.parse.urlencode(query_pairs)
    return urllib.parse.urlunsplit((scheme, netloc, path, query, ""))


def host_of(url: str) -> str:
    return urllib.parse.urlsplit(url).netloc.lower()


def is_probably_supported_url(url: str) -> bool:
    if not url.startswith(("http://", "https://")):
        return False
    lower = url.lower()
    if any(item in lower for item in EXCLUDED_HOST_KEYWORDS):
        return False
    path = urllib.parse.urlsplit(lower).path
    return not any(path.endswith(ext) for ext in EXCLUDED_EXTENSIONS)


def decode_body(result: FetchResult) -> str:
    if not result.body:
        return ""
    charset = result.charset
    if not charset:
        match = re.search(
            rb"<meta[^>]+charset=[\"']?([A-Za-z0-9_\-]+)",
            result.body[:4096],
            re.IGNORECASE,
        )
        if match:
            charset = match.group(1).decode("ascii", errors="ignore")
    for candidate in [charset, "utf-8", "gb18030", "latin-1"]:
        if not candidate:
            continue
        try:
            return result.body.decode(candidate, errors="replace")
        except LookupError:
            continue
    return result.body.decode("utf-8", errors="replace")


def fetch_url(url: str, timeout: float = 12, max_bytes: int = 1_500_000) -> FetchResult:
    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/pdf,application/xml;q=0.9,*/*;q=0.8",
    }
    request = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            body = response.read(max_bytes)
            content_type = response.headers.get("content-type", "")
            charset = response.headers.get_content_charset() or ""
            return FetchResult(
                url=url,
                final_url=response.geturl(),
                status=getattr(response, "status", None),
                content_type=content_type,
                charset=charset,
                body=body,
            )
    except urllib.error.HTTPError as exc:
        body = exc.read(min(max_bytes, 64_000))
        return FetchResult(
            url=url,
            final_url=exc.geturl(),
            status=exc.code,
            content_type=exc.headers.get("content-type", ""),
            charset=exc.headers.get_content_charset() or "",
            body=body,
            error=str(exc),
        )
    except Exception as exc:  # noqa: BLE001 - tool should keep going.
        return FetchResult(url=url, final_url=url, status=None, error=str(exc))


def parse_html_metadata(text: str) -> PageMetadata:
    parser = MetadataParser()
    try:
        parser.feed(text)
    except Exception:
        pass
    return parser.metadata()


def content_type_kind(content_type: str, url: str) -> str:
    lower = (content_type or "").lower()
    path = urllib.parse.urlsplit(url.lower()).path
    if "pdf" in lower or path.endswith(".pdf"):
        return "pdf"
    if "wordprocessingml" in lower or path.endswith((".docx", ".doc")):
        return "docx"
    if "html" in lower or path.endswith((".htm", ".html", ".shtml")) or not path.split("/")[-1].count("."):
        return "html"
    if "json" in lower:
        return "json"
    if "csv" in lower or path.endswith(".csv"):
        return "csv"
    return "other"


def extract_published_date(meta: PageMetadata, url: str, fetched_text: str = "") -> str:
    for key in [
        "article:published_time",
        "article:modified_time",
        "pubdate",
        "publishdate",
        "publish-date",
        "date",
        "dc.date",
        "dc.date.issued",
        "weibo:article:create_at",
        "articletime",
        "articlepubdate",
    ]:
        value = meta.meta.get(key)
        parsed = parse_dateish(value or "")
        if parsed:
            return parsed

    haystack = " ".join([meta.title, meta.description, url, fetched_text[:5000]])
    parsed = parse_dateish(haystack)
    return parsed or ""


def parse_dateish(text: str) -> str:
    if not text:
        return ""
    patterns = [
        r"(20\d{2})[-/.年](\d{1,2})[-/.月](\d{1,2})日?",
        r"(20\d{2})(\d{2})(\d{2})",
        r"t(20\d{2})(\d{2})(\d{2})",
    ]
    for pattern in patterns:
        match = re.search(pattern, text)
        if not match:
            continue
        try:
            year, month, day = map(int, match.groups()[:3])
            return dt.date(year, month, day).isoformat()
        except ValueError:
            continue
    match = re.search(r"(20\d{2})[-/.年](\d{1,2})", text)
    if match:
        year, month = map(int, match.groups())
        if 1 <= month <= 12:
            return f"{year:04d}-{month:02d}"
    match = re.search(r"(20\d{2})", text)
    if match:
        return match.group(1)
    return ""


def classify_authority(url: str, title: str, text: str = "") -> str:
    host = host_of(url)
    main_title = re.split(r"[_|｜]", title or "", maxsplit=1)[0]
    title_haystack = f"{main_title} {url}".lower()
    text_haystack = f"{main_title} {text[:2000]} {url}".lower()
    if "ssologin" in text_haystack or "登录" in title:
        return "X"
    if host in INTERNATIONAL_HOSTS_A3:
        return "A3"
    if host in MEDIA_HOSTS_A2:
        return "A2"
    official = host in OFFICIAL_HOSTS_A0 or host.endswith(OFFICIAL_SUFFIXES)
    if official:
        if host == "data.beijing.gov.cn":
            return "A0"
        if any(term.lower() in title_haystack for term in FORMAL_DOC_TERMS):
            return "A0"
        if "政府公报" in text_haystack and any(
            term.lower() in text_haystack for term in ["规划纲要", "实施方案", "通知"]
        ):
            return "A0"
        return "A1"
    if host.endswith(".edu.cn"):
        return "A1"
    return "A2"


def classify_recency(published_date: str, title: str, text: str, current_year: int) -> str:
    year = None
    if published_date:
        match = re.match(r"(20\d{2})", published_date)
        if match:
            year = int(match.group(1))
    haystack = f"{title} {text[:2000]}".lower()
    if year and year >= current_year:
        return "T0"
    if year and year == current_year - 1:
        return "T1"
    if any(term in haystack for term in ["2035", "十五五", "2026-2030", "2026—2030", "2026至2030"]):
        return "T2"
    if any(term in haystack for term in ["历史", "文物", "旧址", "遗址", "公园名录", "文化"]):
        return "T3"
    return "T4"


def topic_hits_for(title: str, text: str, url: str) -> list[str]:
    haystack = f"{title} {text[:8000]} {url}".lower().replace(" ", "")
    hits = []
    for term in TOPIC_TERMS:
        normalized = term.lower().replace(" ", "")
        if normalized and normalized in haystack:
            hits.append(term)
    return sorted(dict.fromkeys(hits))


def score_candidate(
    url: str,
    title: str,
    text: str,
    published_date: str,
    content_type: str,
    current_year: int,
) -> tuple[int, str, str, list[str], str]:
    authority = classify_authority(url, title, text)
    recency = classify_recency(published_date, title, text, current_year)
    hits = topic_hits_for(title, text, url)
    kind = content_type_kind(content_type, url)

    score = 0
    notes = []

    score += {"A0": 48, "A1": 38, "A2": 20, "A3": 26, "X": -50}.get(authority, 0)
    score += {"T0": 26, "T1": 21, "T2": 19, "T3": 10, "T4": 0}.get(recency, 0)
    score += min(28, len(hits) * 4)
    if kind in {"pdf", "docx", "csv", "json"}:
        score += 5
    if any(term.lower() in f"{title} {url}".lower() for term in FORMAL_DOC_TERMS):
        score += 6
    if "征求意见" in title or "征求意见" in text[:2000]:
        score -= 8
        notes.append("draft_or_consultation")
    if authority == "X":
        notes.append("excluded_or_login")
    if not hits and authority not in {"A0", "A3"}:
        score -= 12
        notes.append("low_topic_match")

    score = max(0, min(100, score))
    return score, authority, recency, hits, ";".join(notes)


def load_seed_rows(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        return []
    with path.open(encoding="utf-8", newline="") as fh:
        return list(csv.DictReader(fh))


def load_queries(path: Path, extra_queries: Iterable[str]) -> list[str]:
    queries: list[str] = []
    if path.exists():
        for line in path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#"):
                queries.append(line)
    queries.extend(q.strip() for q in extra_queries if q.strip())
    return sorted(dict.fromkeys(queries))


def decode_duckduckgo_url(url: str) -> str:
    parsed = urllib.parse.urlsplit(url)
    qs = urllib.parse.parse_qs(parsed.query)
    if "uddg" in qs and qs["uddg"]:
        return qs["uddg"][0]
    return url


def extract_links_from_html(html_text: str, base_url: str) -> list[tuple[str, str]]:
    metadata = parse_html_metadata(html_text)
    output = []
    for raw_href, anchor in metadata.links:
        href = raw_href.strip()
        if not href or href.startswith(("javascript:", "mailto:", "tel:")):
            continue
        url = urllib.parse.urljoin(base_url, href)
        url = decode_duckduckgo_url(url)
        if is_probably_supported_url(url):
            output.append((canonicalize_url(url), anchor))
    deduped: dict[str, str] = {}
    for url, anchor in output:
        deduped.setdefault(url, anchor)
    return list(deduped.items())


def search_duckduckgo(query: str, max_results: int, timeout: float) -> list[str]:
    search_url = "https://duckduckgo.com/html/?" + urllib.parse.urlencode({"q": query})
    result = fetch_url(search_url, timeout=timeout, max_bytes=800_000)
    if result.status and result.status >= 400:
        return []
    text = decode_body(result)
    links = extract_links_from_html(text, result.final_url or search_url)
    urls = []
    for url, anchor in links:
        lower = url.lower()
        if "duckduckgo.com" in host_of(url):
            continue
        if looks_like_search_result(url, anchor):
            urls.append(url)
        if len(urls) >= max_results:
            break
    return urls


def search_bing(query: str, max_results: int, timeout: float) -> list[str]:
    search_url = "https://www.bing.com/search?" + urllib.parse.urlencode({"q": query})
    result = fetch_url(search_url, timeout=timeout, max_bytes=900_000)
    if result.status and result.status >= 400:
        return []
    text = decode_body(result)
    links = extract_links_from_html(text, result.final_url or search_url)
    urls = []
    for url, anchor in links:
        host = host_of(url)
        if "bing.com" in host or "microsoft.com" in host:
            continue
        if looks_like_search_result(url, anchor):
            urls.append(url)
        if len(urls) >= max_results:
            break
    return urls


def looks_like_search_result(url: str, anchor: str = "") -> bool:
    if not is_probably_supported_url(url):
        return False
    host = host_of(url)
    if not host:
        return False
    if host in {"www.baidu.com", "baidu.com", "cn.bing.com", "www.bing.com"}:
        return False
    combined = f"{url} {anchor}".lower()
    if any(bad in combined for bad in ["javascript", "login", "sso"]):
        return False
    return True


def discover_search_urls(queries: list[str], max_results: int, timeout: float, pause: float) -> list[tuple[str, str]]:
    discovered: list[tuple[str, str]] = []
    for query in queries:
        urls = search_duckduckgo(query, max_results=max_results, timeout=timeout)
        if not urls:
            urls = search_bing(query, max_results=max_results, timeout=timeout)
        for url in urls:
            discovered.append((url, query))
        if pause:
            time.sleep(pause)
    deduped: dict[str, str] = {}
    for url, query in discovered:
        deduped.setdefault(canonicalize_url(url), query)
    return list(deduped.items())


def link_relevance_score(url: str, anchor: str) -> int:
    hits = topic_hits_for(anchor, "", url)
    score = len(hits) * 6
    host = host_of(url)
    if host in OFFICIAL_HOSTS_A0 or host.endswith(OFFICIAL_SUFFIXES):
        score += 12
    if any(term in f"{anchor} {url}" for term in FORMAL_DOC_TERMS):
        score += 8
    if re.search(r"20(25|26)", f"{anchor} {url}"):
        score += 5
    return score


def discover_seed_links(
    seed_rows: list[dict[str, str]],
    max_seed_pages: int,
    max_links_per_seed: int,
    timeout: float,
) -> list[tuple[str, str]]:
    discovered: list[tuple[str, str]] = []
    html_rows = [
        row
        for row in seed_rows
        if row.get("type") in {"auto_html", "metadata_html"} and row.get("url", "").startswith("http")
    ]
    for row in html_rows[:max_seed_pages]:
        seed_url = row["url"]
        result = fetch_url(seed_url, timeout=timeout, max_bytes=1_200_000)
        if result.error:
            continue
        text = decode_body(result)
        links = extract_links_from_html(text, result.final_url or seed_url)
        ranked = sorted(links, key=lambda item: link_relevance_score(item[0], item[1]), reverse=True)
        kept = 0
        for url, anchor in ranked:
            if kept >= max_links_per_seed:
                break
            if link_relevance_score(url, anchor) <= 0:
                continue
            discovered.append((url, seed_url))
            kept += 1
    deduped: dict[str, str] = {}
    for url, seed_url in discovered:
        deduped.setdefault(canonicalize_url(url), seed_url)
    return list(deduped.items())


def build_candidate(
    url: str,
    method: str,
    current_year: int,
    timeout: float,
    query: str = "",
    source_seed: str = "",
) -> Candidate:
    accessed = dt.date.today().isoformat()
    result = fetch_url(url, timeout=timeout)
    final_url = result.final_url or url
    kind = content_type_kind(result.content_type, final_url)

    metadata = PageMetadata()
    text = ""
    if kind in {"html", "json", "csv"} and result.body:
        text = decode_body(result)
        if kind == "html":
            metadata = parse_html_metadata(text)
        else:
            metadata.title = infer_title_from_url(final_url)
            metadata.text = text[:20_000]
    else:
        metadata.title = infer_title_from_url(final_url)

    title = metadata.title or infer_title_from_url(final_url)
    text_for_score = " ".join([metadata.description, metadata.text, text[:2000]])
    published = extract_published_date(metadata, final_url, text)
    score, authority, recency, hits, notes = score_candidate(
        final_url,
        title,
        text_for_score,
        published,
        result.content_type,
        current_year,
    )
    if result.error:
        notes = ";".join(filter(None, [notes, f"fetch_error:{result.error[:80]}"]))
    return Candidate(
        url=url,
        final_url=final_url,
        title=title,
        status=result.status,
        content_type=result.content_type.split(";")[0],
        published_date=published,
        accessed_date=accessed,
        authority=authority,
        recency=recency,
        score=score,
        topic_hits=hits,
        discovery_method=method,
        query=query,
        source_seed=source_seed,
        notes=notes,
        error=result.error,
    )


def infer_title_from_url(url: str) -> str:
    path = urllib.parse.urlsplit(url).path
    name = path.rstrip("/").split("/")[-1] or host_of(url)
    name = urllib.parse.unquote(name)
    return normalize_space(re.sub(r"[_-]+", " ", name))


def candidate_sort_key(candidate: Candidate) -> tuple[int, str, str]:
    return (-candidate.score, candidate.authority, candidate.title)


def dedupe_candidates(candidates: Iterable[Candidate]) -> list[Candidate]:
    best: dict[str, Candidate] = {}
    for candidate in candidates:
        key = candidate.identity_url()
        current = best.get(key)
        if current is None or candidate.score > current.score:
            best[key] = candidate
    return sorted(best.values(), key=candidate_sort_key)


def review_bucket(score: int) -> str:
    if score >= 75:
        return "core_review"
    if score >= 55:
        return "secondary_review"
    if score >= 35:
        return "background"
    return "low_priority"


def write_csv(candidates: list[Candidate], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fields = [
        "review_bucket",
        "score",
        "authority",
        "recency",
        "title",
        "url",
        "final_url",
        "published_date",
        "accessed_date",
        "content_type",
        "status",
        "topic_hits",
        "discovery_method",
        "query",
        "source_seed",
        "notes",
    ]
    with path.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=fields)
        writer.writeheader()
        for candidate in candidates:
            writer.writerow(
                {
                    "review_bucket": review_bucket(candidate.score),
                    "score": candidate.score,
                    "authority": candidate.authority,
                    "recency": candidate.recency,
                    "title": candidate.title,
                    "url": candidate.url,
                    "final_url": candidate.final_url,
                    "published_date": candidate.published_date,
                    "accessed_date": candidate.accessed_date,
                    "content_type": candidate.content_type,
                    "status": candidate.status,
                    "topic_hits": "|".join(candidate.topic_hits),
                    "discovery_method": candidate.discovery_method,
                    "query": candidate.query,
                    "source_seed": candidate.source_seed,
                    "notes": candidate.notes,
                }
            )


def write_markdown(candidates: list[Candidate], path: Path, limit: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        "# 公开资料自动发现候选清单",
        "",
        f"> 生成时间：{dt.datetime.now().isoformat(timespec='seconds')}",
        "> 说明：本文件是自动发现结果，所有资料进入 brief 前仍需人工复核。",
        "",
    ]
    for bucket, heading in [
        ("core_review", "核心复核"),
        ("secondary_review", "二级复核"),
        ("background", "背景线索"),
        ("low_priority", "低优先级"),
    ]:
        group = [c for c in candidates if review_bucket(c.score) == bucket][:limit]
        if not group:
            continue
        lines.extend([f"## {heading}", ""])
        for candidate in group:
            hits = "、".join(candidate.topic_hits[:8]) or "无明显命中"
            date = candidate.published_date or "未知日期"
            lines.extend(
                [
                    f"- **{candidate.title or candidate.final_url}**",
                    f"  - URL: {candidate.final_url or candidate.url}",
                    f"  - 分数: {candidate.score}；权威: {candidate.authority}；时效: {candidate.recency}；日期: {date}",
                    f"  - 命中: {hits}",
                ]
            )
            if candidate.notes:
                lines.append(f"  - 备注: {candidate.notes}")
        lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


def write_summary(
    candidates: list[Candidate],
    path: Path,
    queries: list[str],
    seed_count: int,
    discovered_counts: dict[str, int],
) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    summary = {
        "generated_at": dt.datetime.now().isoformat(timespec="seconds"),
        "query_count": len(queries),
        "seed_count": seed_count,
        "candidate_count": len(candidates),
        "discovered_counts": discovered_counts,
        "buckets": count_by(review_bucket(c.score) for c in candidates),
        "authority": count_by(c.authority for c in candidates),
        "recency": count_by(c.recency for c in candidates),
        "top_urls_sha256": hashlib.sha256(
            "\n".join(c.identity_url() for c in candidates[:50]).encode("utf-8")
        ).hexdigest(),
    }
    path.write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def count_by(values: Iterable[str]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for value in values:
        counts[value] = counts.get(value, 0) + 1
    return dict(sorted(counts.items()))


def run(args: argparse.Namespace) -> int:
    current_year = args.current_year or dt.date.today().year
    seed_rows = load_seed_rows(args.seed_csv)
    if args.no_default_queries:
        queries = sorted(dict.fromkeys(q.strip() for q in args.query if q.strip()))
    else:
        queries = load_queries(args.query_file, args.query)

    raw_items: list[tuple[str, str, str, str]] = []
    discovered_counts: dict[str, int] = {}

    if args.include_seeds:
        for row in seed_rows[: args.max_seed_candidates]:
            url = row.get("url", "")
            if is_probably_supported_url(url):
                raw_items.append((url, "seed", "", ""))
        discovered_counts["seed"] = len(raw_items)

    if not args.no_search and queries:
        search_items = discover_search_urls(
            queries,
            max_results=args.max_query_results,
            timeout=args.timeout,
            pause=args.pause,
        )
        for url, query in search_items:
            raw_items.append((url, "search", query, ""))
        discovered_counts["search"] = len(search_items)

    if not args.no_seed_links:
        seed_link_items = discover_seed_links(
            seed_rows,
            max_seed_pages=args.max_seed_pages,
            max_links_per_seed=args.max_links_per_seed,
            timeout=args.timeout,
        )
        for url, source_seed in seed_link_items:
            raw_items.append((url, "seed_link", "", source_seed))
        discovered_counts["seed_link"] = len(seed_link_items)

    deduped_raw: dict[str, tuple[str, str, str, str]] = {}
    for url, method, query, source_seed in raw_items:
        deduped_raw.setdefault(canonicalize_url(url), (url, method, query, source_seed))

    candidates: list[Candidate] = []
    for index, (url, method, query, source_seed) in enumerate(deduped_raw.values()):
        if index >= args.max_candidates:
            break
        candidate = build_candidate(
            url,
            method=method,
            current_year=current_year,
            timeout=args.timeout,
            query=query,
            source_seed=source_seed,
        )
        if candidate.authority != "X" or args.include_excluded:
            candidates.append(candidate)
        if args.pause:
            time.sleep(args.pause)

    candidates = dedupe_candidates(candidates)
    if args.min_score:
        candidates = [candidate for candidate in candidates if candidate.score >= args.min_score]

    output_dir: Path = args.output_dir
    write_csv(candidates, output_dir / "candidate-sources.csv")
    write_markdown(candidates, output_dir / "candidate-sources.md", limit=args.markdown_limit)
    write_summary(
        candidates,
        output_dir / "run-summary.json",
        queries=queries,
        seed_count=len(seed_rows),
        discovered_counts=discovered_counts,
    )

    print(f"wrote {len(candidates)} candidates to {output_dir}")
    print(f"buckets: {count_by(review_bucket(c.score) for c in candidates)}")
    print(f"authority: {count_by(c.authority for c in candidates)}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Discover and score public source candidates for the Haidian AI brief."
    )
    parser.add_argument("--seed-csv", type=Path, default=DEFAULT_SEED_CSV)
    parser.add_argument("--query-file", type=Path, default=DEFAULT_QUERY_FILE)
    parser.add_argument("--query", action="append", default=[], help="Extra search query.")
    parser.add_argument(
        "--no-default-queries",
        action="store_true",
        help="Only use --query values; do not read the default query file.",
    )
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    parser.add_argument("--current-year", type=int, default=0)
    parser.add_argument("--timeout", type=float, default=12)
    parser.add_argument("--pause", type=float, default=0.15)
    parser.add_argument("--max-query-results", type=int, default=6)
    parser.add_argument("--max-seed-pages", type=int, default=24)
    parser.add_argument("--max-links-per-seed", type=int, default=8)
    parser.add_argument("--max-seed-candidates", type=int, default=80)
    parser.add_argument("--max-candidates", type=int, default=160)
    parser.add_argument("--min-score", type=int, default=0)
    parser.add_argument("--markdown-limit", type=int, default=30)
    parser.add_argument("--no-search", action="store_true")
    parser.add_argument("--no-seed-links", action="store_true")
    parser.add_argument("--include-seeds", action="store_true", default=True)
    parser.add_argument("--no-include-seeds", dest="include_seeds", action="store_false")
    parser.add_argument("--include-excluded", action="store_true")
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        return run(args)
    except KeyboardInterrupt:
        print("interrupted", file=sys.stderr)
        return 130


if __name__ == "__main__":
    raise SystemExit(main())
