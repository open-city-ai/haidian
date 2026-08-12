#!/usr/bin/env python3
"""Fetch official standard/reference pages into local Markdown snapshots.

The fetched files are reference material for AI agents and reviewers. They do
not replace the official online source; each snapshot records the source URL,
fetch status, access date, and SHA-256.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from datetime import date
from html.parser import HTMLParser
from pathlib import Path
from typing import Any


DEFAULT_USER_AGENT = "Mozilla/5.0 (compatible; haidian-ai-standards-fetcher/0.1)"
ALLOWED_URL_SCHEMES = {"http", "https"}
REDIRECT_STATUS_CODES = {301, 302, 303, 307, 308}
MAX_REDIRECTS = 5
MAX_RESPONSE_BYTES = 10 * 1024 * 1024


@dataclass
class FetchResult:
    ok: bool
    status: str
    content_type: str | None = None
    final_url: str | None = None
    raw_sha256: str | None = None
    error: str | None = None
    text: str = ""


class VisibleTextParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self.skip_stack: list[str] = []
        self.link_stack: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        if tag in {"script", "style", "noscript", "svg"}:
            self.skip_stack.append(tag)
            return
        if tag in {"p", "div", "section", "article", "li", "tr", "h1", "h2", "h3", "br"}:
            self.parts.append("\n")
        if tag == "a":
            href = dict(attrs).get("href")
            self.link_stack.append(href or "")

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if self.skip_stack and self.skip_stack[-1] == tag:
            self.skip_stack.pop()
            return
        if tag == "a" and self.link_stack:
            self.link_stack.pop()
        if tag in {"p", "div", "section", "article", "li", "tr", "h1", "h2", "h3"}:
            self.parts.append("\n")

    def handle_data(self, data: str) -> None:
        if self.skip_stack:
            return
        text = data.strip()
        if not text:
            return
        self.parts.append(text)
        if self.link_stack and self.link_stack[-1]:
            self.parts.append(f" ({self.link_stack[-1]})")

    def text(self) -> str:
        raw = html.unescape(" ".join(self.parts))
        raw = re.sub(r"[ \t\r\f\v]+", " ", raw)
        raw = re.sub(r"\n\s+", "\n", raw)
        raw = re.sub(r"\n{3,}", "\n\n", raw)
        lines = [line.strip() for line in raw.splitlines()]
        lines = [line for line in lines if line]
        return "\n\n".join(lines)


class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):  # type: ignore[no-untyped-def]
        return None


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9-]+", "-", value.lower()).strip("-")
    slug = re.sub(r"-{2,}", "-", slug)
    return slug or "standard"


def decode_html(raw: bytes, content_type: str | None) -> str:
    candidates: list[str] = []
    if content_type:
        match = re.search(r"charset=([\w-]+)", content_type, re.I)
        if match:
            candidates.append(match.group(1))
    candidates.extend(["utf-8", "gb18030"])
    for encoding in candidates:
        try:
            return raw.decode(encoding)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="replace")


def fetch_url(url: str, timeout: float) -> FetchResult:
    opener = urllib.request.build_opener(NoRedirectHandler())
    current_url = url
    response = None
    for redirect_count in range(MAX_REDIRECTS + 1):
        try:
            scheme = urllib.parse.urlsplit(current_url).scheme.lower()
        except ValueError as exc:
            return FetchResult(False, "invalid_url", error=str(exc), final_url=current_url)
        if scheme not in ALLOWED_URL_SCHEMES:
            return FetchResult(
                False,
                "unsupported_url_scheme",
                error=f"URL scheme must be http or https: {scheme or 'missing'}",
                final_url=current_url,
            )
        request = urllib.request.Request(
            current_url, headers={"User-Agent": DEFAULT_USER_AGENT}
        )
        try:
            response = opener.open(request, timeout=timeout)
            break
        except urllib.error.HTTPError as exc:
            if exc.code not in REDIRECT_STATUS_CODES:
                return FetchResult(
                    False, f"http_{exc.code}", error=str(exc), final_url=current_url
                )
            location = exc.headers.get("location") or exc.headers.get("uri")
            exc.close()
            if not location:
                return FetchResult(
                    False,
                    "redirect_missing_location",
                    error=f"HTTP {exc.code} response has no Location header",
                    final_url=current_url,
                )
            if redirect_count == MAX_REDIRECTS:
                return FetchResult(
                    False,
                    "too_many_redirects",
                    error=f"redirect limit exceeded ({MAX_REDIRECTS})",
                    final_url=current_url,
                )
            current_url = urllib.parse.urljoin(current_url, location)
        except urllib.error.URLError as exc:
            return FetchResult(
                False, "url_error", error=str(exc.reason), final_url=current_url
            )
        except (TimeoutError, ValueError) as exc:
            status = "timeout" if isinstance(exc, TimeoutError) else "invalid_url"
            return FetchResult(False, status, error=str(exc), final_url=current_url)

    if response is None:
        return FetchResult(False, "url_error", error="request produced no response", final_url=current_url)
    with response:
        content_type = response.headers.get("content-type")
        final_url = response.geturl()
        content_length = response.headers.get("content-length")
        try:
            declared_length = int(content_length) if content_length is not None else None
        except ValueError:
            declared_length = None
        if declared_length is not None and declared_length > MAX_RESPONSE_BYTES:
            return FetchResult(
                False,
                "response_too_large",
                error=f"declared response size exceeds {MAX_RESPONSE_BYTES} bytes",
                final_url=final_url,
                content_type=content_type,
            )
        raw = response.read(MAX_RESPONSE_BYTES + 1)
    if len(raw) > MAX_RESPONSE_BYTES:
        return FetchResult(
            False,
            "response_too_large",
            error=f"response exceeds {MAX_RESPONSE_BYTES} bytes",
            final_url=final_url,
            content_type=content_type,
        )

    parser = VisibleTextParser()
    parser.feed(decode_html(raw, content_type))
    text = parser.text()
    return FetchResult(
        True,
        "fetched",
        content_type=content_type,
        final_url=final_url,
        raw_sha256=hashlib.sha256(raw).hexdigest(),
        text=text,
    )


def extract_title(text: str, fallback: str) -> str:
    for line in text.splitlines():
        stripped = line.strip()
        if stripped and stripped not in {"首页", "打印", "关闭"}:
            return stripped[:120]
    return fallback


def write_reference_markdown(
    output_path: Path,
    standard: dict[str, Any],
    result: FetchResult,
    accessed_date: str,
) -> None:
    title = standard.get("title_zh") or standard.get("standard_id")
    body_title = extract_title(result.text, str(title)) if result.text else str(title)
    lines = [
        "---",
        f"standard_id: {standard['standard_id']}",
        f"title_zh: {json.dumps(str(title), ensure_ascii=False)}",
        f"source_url: {json.dumps(standard.get('source_url'), ensure_ascii=False)}",
        f"final_url: {json.dumps(result.final_url, ensure_ascii=False)}",
        f"source_status: {standard.get('source_status')}",
        f"fetch_status: {result.status}",
        f"accessed_date: {accessed_date}",
        f"content_type: {json.dumps(result.content_type, ensure_ascii=False)}",
        f"raw_sha256: {result.raw_sha256 or ''}",
        "---",
        "",
        f"# {title}",
        "",
        "> 本文件为官方公开页面的本地参考快照，供 AI agent 和评审者离线检索。正式引用仍以 source_url / final_url 指向的官方页面为准。",
        "",
    ]
    if result.ok and result.text:
        lines.extend([f"## {body_title}", "", result.text.strip(), ""])
    else:
        lines.extend(
            [
                "## Fetch Status",
                "",
                f"- Status: `{result.status}`",
                f"- Error: `{result.error or 'unknown'}`",
                "",
                "该标准当前没有成功拉取正文。保留该记录用于提醒维护者补齐官方文件或更新可访问官方 URL。",
                "",
            ]
        )
    output_path.write_text("\n".join(lines), encoding="utf-8")


def read_reference_frontmatter(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    lines = path.read_text(encoding="utf-8").splitlines()
    if not lines or lines[0].strip() != "---":
        return {}
    fields: dict[str, Any] = {}
    for line in lines[1:]:
        if line.strip() == "---":
            break
        if ":" not in line:
            continue
        key, raw_value = line.split(":", 1)
        value = raw_value.strip()
        if not value:
            fields[key.strip()] = ""
            continue
        try:
            fields[key.strip()] = json.loads(value)
        except json.JSONDecodeError:
            fields[key.strip()] = value
    return fields


def should_preserve_existing_reference(output_path: Path, result: FetchResult) -> bool:
    if result.ok:
        return False
    existing = read_reference_frontmatter(output_path)
    return existing.get("fetch_status") in {
        "fetched_via_official_pdf_text",
        "fetched_manual_official",
        "user_provided_summary",
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-root", default=".")
    parser.add_argument("--standards", default="brief/site-package/standards/standards.json")
    parser.add_argument("--output-dir", default="brief/site-package/standards/references")
    parser.add_argument("--timeout", type=float, default=20)
    parser.add_argument("--accessed-date", default=date.today().isoformat())
    parser.add_argument("--update-standards", action="store_true")
    args = parser.parse_args()

    repo_root = Path(args.repo_root)
    standards_path = repo_root / args.standards
    output_dir = repo_root / args.output_dir
    output_dir.mkdir(parents=True, exist_ok=True)
    data = json.loads(standards_path.read_text(encoding="utf-8"))

    index: list[dict[str, Any]] = []
    for standard in data.get("standards", []):
        standard_id = standard.get("standard_id")
        if not standard_id:
            continue
        source_url = standard.get("source_url")
        result = (
            fetch_url(source_url, args.timeout)
            if isinstance(source_url, str) and source_url
            else FetchResult(False, "missing_source_url", error="source_url is null")
        )
        rel_path = f"{args.output_dir}/{slugify(str(standard_id))}.md"
        output_path = repo_root / rel_path
        existing_meta: dict[str, Any] = {}
        if should_preserve_existing_reference(output_path, result):
            existing_meta = read_reference_frontmatter(output_path)
        else:
            if (
                standard.get("reference_fetch_status") == "user_provided_summary"
                and standard.get("local_reference_path")
                and (repo_root / str(standard["local_reference_path"])).exists()
            ):
                output_path = repo_root / str(standard["local_reference_path"])
                rel_path = str(standard["local_reference_path"])
                existing_meta = {
                    "fetch_status": "user_provided_summary",
                    "accessed_date": standard.get("reference_accessed_date", args.accessed_date),
                    "final_url": standard.get("reference_final_url"),
                }
            else:
                write_reference_markdown(output_path, standard, result, args.accessed_date)
        digest = hashlib.sha256(output_path.read_bytes()).hexdigest()
        fetch_status = str(existing_meta.get("fetch_status") or result.status)
        final_url = existing_meta.get("final_url") or result.final_url
        accessed_date = str(existing_meta.get("accessed_date") or args.accessed_date)
        record = {
            "standard_id": standard_id,
            "title_zh": standard.get("title_zh"),
            "source_url": source_url,
            "local_reference_path": rel_path,
            "local_reference_format": "markdown",
            "local_markdown_path": rel_path,
            "local_reference_sha256": digest,
            "fetch_status": fetch_status,
            "accessed_date": accessed_date,
        }
        if final_url:
            record["final_url"] = final_url
        index.append(record)
        if args.update_standards:
            standard["local_reference_path"] = rel_path
            standard["local_reference_format"] = "markdown"
            standard["local_markdown_path"] = rel_path
            standard["local_reference_sha256"] = digest
            standard["reference_fetch_status"] = fetch_status
            standard["reference_accessed_date"] = accessed_date
            if final_url:
                standard["reference_final_url"] = final_url

    index_doc = {
        "schema_version": "0.1.0",
        "generated_at": args.accessed_date,
        "references": index,
    }
    index_path = output_dir / "index.json"
    index_path.write_text(json.dumps(index_doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if args.update_standards:
        standards_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    ok_count = sum(
        1
        for item in index
        if item["fetch_status"] in {"fetched", "fetched_via_official_pdf_text", "user_provided_summary"}
    )
    print(f"wrote {len(index)} local reference records ({ok_count} fetched) to {output_dir}")
    return 0 if ok_count else 1


if __name__ == "__main__":
    raise SystemExit(main())
