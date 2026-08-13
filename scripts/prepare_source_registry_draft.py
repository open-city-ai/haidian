#!/usr/bin/env python3
"""Prepare a review-only source registry draft from discovery CSV files.

The generated draft is intentionally conservative: records default to
review_status=needs_review and cannot be used as formal evidence until a
maintainer manually approves and merges them into data/source_registry.json.

Input formats
-------------
- **discovery_csv** — output of ``scripts/discover_public_sources.py``:
  columns ``url``, ``title``, ``publisher``, ``source_type``,
  ``date_approx``, ``topic_terms``.
- **seed_csv** — the seed URL table at ``brief/data/auto-crawl-seed-urls.csv``.
- **auto** (default) — try discovery CSV first, fall back to seed CSV.

Output
------
The draft is written to ``data/source_registry.draft.json`` (override with
``--out``).  It follows the same schema as ``data/source_registry.json`` but
every entry has ``review_status: needs_review`` and prefixed IDs
(``DRAFT-...``).

Submit the draft to maintainers via a ``[source-registry]`` Issue; do not edit
``data/source_registry.json`` directly.

Usage
-----
Generate from the default discovery CSV::

    python3 scripts/prepare_source_registry_draft.py

Generate from the seed CSV::

    python3 scripts/prepare_source_registry_draft.py \\
        --input brief/data/auto-crawl-seed-urls.csv \\
        --input-format seed_csv

Machine-readable output::

    python3 scripts/prepare_source_registry_draft.py --json

Exit code is 0 when the draft passes schema validation and 1 otherwise.
"""
from __future__ import annotations

import argparse
import csv
import datetime as dt
import hashlib
import json
import re
import urllib.parse
from pathlib import Path
from typing import Any

from discover_public_sources import (
    classify_authority,
    classify_recency,
    content_type_kind,
    parse_dateish,
)
from validate_data_registry import validate_registry


DEFAULT_DISCOVERY_CSV = "brief/discovery/candidate-sources.csv"
DEFAULT_SEED_CSV = "brief/data/auto-crawl-seed-urls.csv"
DEFAULT_REGISTRY = "data/source_registry.json"
DEFAULT_OUTPUT = "data/source_registry.draft.json"


def normalize_id(value: str, fallback_url: str) -> str:
    base = re.sub(r"[^A-Za-z0-9]+", "-", value or "").strip("-").upper()
    if not base:
        digest = hashlib.sha1(fallback_url.encode("utf-8")).hexdigest()[:10].upper()
        base = f"URL-{digest}"
    if not re.match(r"^[A-Z0-9]", base):
        base = f"SRC-{base}"
    return f"DRAFT-{base}"


def canonicalize_url(url: str) -> str:
    parsed = urllib.parse.urlsplit((url or "").strip())
    scheme = parsed.scheme.lower()
    netloc = parsed.netloc.lower()
    path = re.sub(r"/{2,}", "/", parsed.path)
    return urllib.parse.urlunsplit((scheme, netloc, path, parsed.query, ""))


def load_rows(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        return []
    with path.open(encoding="utf-8", newline="") as fh:
        return list(csv.DictReader(fh))


def load_existing_registry(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"schema_version": "0.1.0", "updated_date": dt.date.today().isoformat(), "sources": []}
    return json.loads(path.read_text(encoding="utf-8"))


def existing_urls(registry: dict[str, Any]) -> set[str]:
    urls = set()
    for source in registry.get("sources", []):
        if isinstance(source, dict) and source.get("url"):
            urls.add(canonicalize_url(str(source["url"])))
    return urls


def row_url(row: dict[str, str]) -> str:
    return row.get("final_url") or row.get("url") or ""


def row_title(row: dict[str, str]) -> str:
    return row.get("title") or row.get("name") or row_url(row)


def derive_file_type(row: dict[str, str], url: str) -> str:
    row_type = (row.get("type") or "").lower()
    content_type = row.get("content_type") or ""
    if "pdf" in row_type:
        return "pdf"
    if "docx" in row_type or "doc" in row_type:
        return "docx"
    if "csv" in row_type:
        return "csv"
    if "geo" in row_type:
        return "webpage"
    if row_type == "metadata_html":
        return "webpage"
    kind = content_type_kind(content_type, url)
    return {
        "html": "html",
        "pdf": "pdf",
        "docx": "docx",
        "json": "json",
        "csv": "csv",
    }.get(kind, "webpage")


def derive_source_kind(row: dict[str, str], authority: str, url: str, title: str) -> str:
    haystack = f"{title} {url} {row.get('topic', '')} {row.get('notes', '')}".lower()
    if "openstreetmap" in haystack or "odbl" in haystack:
        return "open_license_reference"
    if authority == "A3":
        return "international_reference"
    if authority == "A2":
        return "media_report"
    if "data.beijing.gov.cn" in url or "open_data" in haystack or "数据目录" in haystack:
        return "official_open_data"
    if any(term in title for term in ["标准", "办法", "导则", "指南"]) or "standard" in haystack:
        return "official_standard"
    if any(term in title for term in ["公告", "资格预审"]):
        return "official_announcement"
    return "official_news" if authority in {"A0", "A1"} else "media_report"


def derive_access_status(row: dict[str, str], url: str) -> str:
    haystack = f"{row.get('type', '')} {row.get('notes', '')} {url}".lower()
    if any(term in haystack for term in ["keyed_api", "userkey", "登录", "下载密码", "需登录"]):
        return "restricted_or_unknown"
    return "public_url"


def derive_formal_use(authority: str, access_status: str) -> str:
    if access_status == "restricted_or_unknown":
        return "no"
    if authority in {"A0", "A1"}:
        return "background_only"
    if authority == "A3":
        return "background_only"
    return "no"


def derive_allowed_uses(row: dict[str, str], authority: str) -> list[str]:
    topic = row.get("topic") or "|".join((row.get("topic_hits") or "").split("|")[:5])
    uses = ["candidate source for maintainer review before use in submissions"]
    if topic:
        uses.append(f"background context for topic: {topic}")
    if authority == "A0":
        uses.append("potential formal evidence only after maintainer approval")
    return uses


def derive_prohibited_uses(row: dict[str, str], access_status: str) -> list[str]:
    prohibited = [
        "formal evidence before review_status is manually changed to approved",
        "official boundary or statutory planning control unless the source explicitly provides cleared official geometry",
        "government approval, implementation commitment, or precise engineering conclusion beyond the source text",
    ]
    if access_status == "restricted_or_unknown":
        prohibited.append("use without confirming access rights, API terms, license, and redistribution permission")
    if "征求意见" in f"{row.get('title', '')} {row.get('notes', '')}":
        prohibited.append("final standard or adopted policy claim because this appears to be a draft/consultation source")
    return prohibited


def discovery_row_to_source(row: dict[str, str], current_year: int) -> dict[str, Any]:
    url = row_url(row)
    title = row_title(row)
    published_date = row.get("published_date") or parse_dateish(f"{title} {url} {row.get('notes', '')}")
    if not published_date:
        published_date = None
    elif not re.fullmatch(r"\d{4}-\d{2}-\d{2}", published_date):
        published_date = None
    authority = row.get("authority") or classify_authority(url, title, row.get("notes", ""))
    recency = row.get("recency") or classify_recency(published_date or "", title, row.get("notes", ""), current_year)
    access_status = derive_access_status(row, url)
    source_id_seed = row.get("id") or f"{title}-{hashlib.sha1(url.encode('utf-8')).hexdigest()[:8]}"
    return {
        "source_id": normalize_id(source_id_seed, url),
        "title": title,
        "publisher": "Needs maintainer review",
        "source_kind": derive_source_kind(row, authority, url, title),
        "url": url,
        "published_date": published_date,
        "accessed_date": row.get("accessed_date") or dt.date.today().isoformat(),
        "file_type": derive_file_type(row, url),
        "authority_level": authority if authority in {"A0", "A1", "A2", "A3"} else "A2",
        "timeliness_level": recency if recency in {"T0", "T1", "T2", "T3", "T4"} else "NA",
        "public_access_status": access_status,
        "license_summary": "Needs maintainer review before reuse; do not treat as cleared or formal-ready.",
        "review_status": "needs_review",
        "usable_for_formal": derive_formal_use(authority, access_status),
        "allowed_uses": derive_allowed_uses(row, authority),
        "prohibited_uses": derive_prohibited_uses(row, access_status),
        "topics": [
            item
            for item in re.split(r"[|,，;；\s]+", row.get("topic") or row.get("topic_hits") or "public_source_candidate")
            if item
        ],
        "local_paths": [],
        "notes_zh": "由自动发现或种子表生成的待复核草稿；维护者确认发布机构、许可、用途边界和是否需要本地快照后，才可合并进正式 registry。",
    }


def dedupe_sources(sources: list[dict[str, Any]]) -> list[dict[str, Any]]:
    by_url: dict[str, dict[str, Any]] = {}
    for source in sources:
        key = canonicalize_url(source["url"])
        if key not in by_url:
            by_url[key] = source
    used_ids: set[str] = set()
    output = []
    for source in by_url.values():
        original = source["source_id"]
        candidate = original
        suffix = 2
        while candidate in used_ids:
            candidate = f"{original}-{suffix}"
            suffix += 1
        source["source_id"] = candidate
        used_ids.add(candidate)
        output.append(source)
    return output


def build_draft(
    input_path: Path,
    existing_registry_path: Path,
    input_format: str,
    current_year: int,
    limit: int,
    include_existing: bool,
) -> dict[str, Any]:
    rows = load_rows(input_path)
    if input_format == "auto":
        fieldnames = set(rows[0].keys()) if rows else set()
        input_format = "discovery_csv" if "review_bucket" in fieldnames else "seed_csv"
    existing = load_existing_registry(existing_registry_path)
    existing_url_set = existing_urls(existing)
    sources = []
    for row in rows:
        url = row_url(row)
        if not url:
            continue
        if not include_existing and canonicalize_url(url) in existing_url_set:
            continue
        sources.append(discovery_row_to_source(row, current_year))
        if limit and len(sources) >= limit:
            break
    return {
        "schema_version": "0.1.0",
        "updated_date": dt.date.today().isoformat(),
        "sources": dedupe_sources(sources),
        "_draft_note": f"Generated from {input_format}; review manually before merging into data/source_registry.json.",
    }


def write_registry_json(data: dict[str, Any], path: Path) -> None:
    serializable = {key: value for key, value in data.items() if not key.startswith("_")}
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(serializable, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-root", default=".")
    parser.add_argument("--input", default="")
    parser.add_argument("--input-format", choices=["auto", "discovery_csv", "seed_csv"], default="auto")
    parser.add_argument("--existing-registry", default=DEFAULT_REGISTRY)
    parser.add_argument("--out", default=DEFAULT_OUTPUT)
    parser.add_argument("--current-year", type=int, default=0)
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--include-existing", action="store_true")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    input_path = Path(args.input) if args.input else repo_root / DEFAULT_DISCOVERY_CSV
    if not input_path.is_absolute():
        input_path = repo_root / input_path
    if not input_path.exists() and not args.input:
        input_path = repo_root / DEFAULT_SEED_CSV
    registry_path = Path(args.existing_registry)
    if not registry_path.is_absolute():
        registry_path = repo_root / registry_path
    out_path = Path(args.out)
    if not out_path.is_absolute():
        out_path = repo_root / out_path
    current_year = args.current_year or dt.date.today().year

    draft = build_draft(
        input_path=input_path,
        existing_registry_path=registry_path,
        input_format=args.input_format,
        current_year=current_year,
        limit=args.limit,
        include_existing=args.include_existing,
    )
    write_registry_json(draft, out_path)
    report = validate_registry(repo_root, out_path)
    summary = {
        "ok": report.ok,
        "input": input_path.relative_to(repo_root).as_posix() if input_path.is_relative_to(repo_root) else str(input_path),
        "out": out_path.relative_to(repo_root).as_posix() if out_path.is_relative_to(repo_root) else str(out_path),
        "source_count": len(draft["sources"]),
        "validation_errors": report.errors,
        "validation_warnings": report.warnings,
    }
    if args.json:
        print(json.dumps(summary, ensure_ascii=False, indent=2))
    else:
        print(f"wrote {summary['source_count']} draft sources to {summary['out']}")
        for warning in report.warnings:
            print(f"WARNING: {warning}")
        for error in report.errors:
            print(f"ERROR: {error}")
    return 0 if report.ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
