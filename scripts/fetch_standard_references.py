#!/usr/bin/env python3
"""Fetch official standard/reference pages into local Markdown snapshots.

The fetched files are reference material for AI agents and reviewers. They do
not replace the official online source; each snapshot records the source URL,
fetch status, access date, and SHA-256.

The script reads standard entries from ``brief/site-package/standards/standards.json``
and fetches the ``source_url`` of each entry.  Fetched HTML pages are stripped
to visible text and written as Markdown files to
``brief/site-package/standards/references/``.  Existing files with
``fetch_status: fetched_via_official_pdf_text``, ``fetched_manual_official``,
or ``user_provided_summary`` are preserved even when the live URL is
unreachable, so a permanent redirect or takedown does not delete a hand-curated
snapshot.

Output
------
- One ``.md`` file per standard in ``--output-dir`` with YAML front matter
  recording ``standard_id``, ``source_url``, ``fetch_status``, ``accessed_date``,
  ``raw_sha256``, and (when available) the page title.
- ``<output-dir>/index.json`` — array of all standard metadata records.

Usage
-----
Fetch all standards from the default path::

    python3 scripts/fetch_standard_references.py

Use a custom standards file::

    python3 scripts/fetch_standard_references.py \\
        --standards path/to/standards.json \\
        --output-dir path/to/references

Exit code is 0 when at least one standard was successfully fetched and 1 when
no standards could be fetched.
"""
from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import sys
import urllib.error
import urllib.request
from dataclasses import dataclass
from datetime import date
from html.parser import HTMLParser
from pathlib import Path
from typing import Any


DEFAULT_USER_AGENT = "Mozilla/5.0 (compatible; haidian-ai-standards-fetcher/0.1)"


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
    request = urllib.request.Request(url, headers={"User-Agent": DEFAULT_USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            raw = response.read()
            content_type = response.headers.get("content-type")
            final_url = response.geturl()
    except urllib.error.HTTPError as exc:
        return FetchResult(False, f"http_{exc.code}", error=str(exc), final_url=url)
    except urllib.error.URLError as exc:
        return FetchResult(False, "url_error", error=str(exc.reason), final_url=url)
    except TimeoutError as exc:
        return FetchResult(False, "timeout", error=str(exc), final_url=url)

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
