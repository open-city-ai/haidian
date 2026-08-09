#!/usr/bin/env python3
"""Browse merged proposal summaries and download selected text or media on demand."""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path, PurePosixPath
from typing import Any


RAW_ROOT = "https://raw.githubusercontent.com/open-city-ai/haidian/main"
SITE_ROOT = "https://haidian.open-city.ai"
INDEX_PATH = "submissions-data.js"
DEFAULT_TEXT_FILES = (
    "proposal.md",
    "agent.json",
    "sources.json",
    "assumptions.json",
    "metrics.json",
    "changelog.md",
    "report/narrative.md",
    "report/copyright_statement.md",
)
FULL_TEXT_FILES = (
    "proposal.en.md",
    "proposal.zh.md",
    "manifest.json",
    "self_check.json",
    "compliance_matrix.json",
    "standard_matrix.json",
    "design_depth_matrix.json",
    "risk.json",
)
FIGURE_FILES = (
    "assets/figures/site-overview.png",
    "assets/figures/land-use-structure.png",
    "assets/figures/key-areas.png",
    "assets/figures/mobility-bluegreen.png",
    "assets/figures/metrics-evidence.png",
)
DRAWING_FILES = ("drawings/a3-booklet.pdf", "drawings/a0-boards.pdf")
VISUAL_FILES = ("report/proposal.html", "visual/index.html")
USER_AGENT = "open-city-haidian-peer-reader/1.0"


class PeerReaderError(RuntimeError):
    pass


def configure_utf8_output() -> None:
    """Keep human and JSON output encodable on Windows locale-bound terminals."""
    for stream in (sys.stdout, sys.stderr):
        reconfigure = getattr(stream, "reconfigure", None)
        if reconfigure is not None:
            try:
                reconfigure(encoding="utf-8", errors="backslashreplace")
            except (OSError, ValueError):
                # Embedded/test streams and older Python implementations may reject reconfigure.
                continue


def safe_repo_path(value: str) -> str:
    path = PurePosixPath(value)
    if path.is_absolute() or ".." in path.parts or not path.parts:
        raise PeerReaderError(f"unsafe repository path: {value}")
    return path.as_posix()


def fetch_bytes(url: str, max_bytes: int) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=30) as response:
        length = response.headers.get("Content-Length")
        if length and int(length) > max_bytes:
            raise PeerReaderError(f"remote file exceeds limit ({int(length)} bytes): {url}")
        chunks: list[bytes] = []
        total = 0
        while True:
            chunk = response.read(1024 * 1024)
            if not chunk:
                break
            total += len(chunk)
            if total > max_bytes:
                raise PeerReaderError(f"download exceeded limit ({max_bytes} bytes): {url}")
            chunks.append(chunk)
        return b"".join(chunks)


def parse_index(text: str) -> list[dict[str, Any]]:
    match = re.search(r"window\.HAIDIAN_SUBMISSIONS\s*=\s*(\[.*\])\s*;?\s*$", text, re.S)
    if not match:
        raise PeerReaderError("could not parse submissions-data.js")
    data = json.loads(match.group(1))
    if not isinstance(data, list):
        raise PeerReaderError("proposal index is not a list")
    return [item for item in data if isinstance(item, dict)]


def load_index(repo_root: Path, max_bytes: int) -> tuple[list[dict[str, Any]], str]:
    local = repo_root / INDEX_PATH
    if local.is_file():
        return parse_index(local.read_text(encoding="utf-8")), str(local)
    url = f"{RAW_ROOT}/{INDEX_PATH}"
    return parse_index(fetch_bytes(url, max_bytes).decode("utf-8")), url


def proposal_base(item: dict[str, Any]) -> str:
    source = safe_repo_path(str(item.get("sourceUrl") or ""))
    parts = PurePosixPath(source).parts
    if len(parts) < 4 or parts[0] != "submissions":
        raise PeerReaderError(f"invalid proposal source path: {source}")
    return PurePosixPath(*parts[:3]).as_posix()


def proposal_key(item: dict[str, Any]) -> str:
    base = PurePosixPath(proposal_base(item))
    return f"{base.parts[1]}/{base.parts[2]}"


def filter_items(items: list[dict[str, Any]], args: argparse.Namespace) -> list[dict[str, Any]]:
    selected = items
    if args.author:
        needle = args.author.casefold()
        selected = [item for item in selected if str(item.get("author", "")).casefold() == needle]
    if args.status:
        needle = args.status.casefold()
        selected = [item for item in selected if str(item.get("statusKey", "")).casefold() == needle]
    if args.search:
        needle = args.search.casefold()
        selected = [
            item
            for item in selected
            if needle
            in " ".join(
                str(item.get(key, ""))
                for key in ("id", "title", "titleEn", "summary", "summaryEn", "author", "authorName")
            ).casefold()
        ]
    selected = sorted(selected, key=lambda item: (str(item.get("date", "")), proposal_key(item)), reverse=True)
    return selected[: args.latest]


def find_proposal(items: list[dict[str, Any]], identifier: str) -> dict[str, Any]:
    needle = identifier.strip().casefold()
    matches = [
        item
        for item in items
        if needle in {str(item.get("id", "")).casefold(), proposal_key(item).casefold()}
    ]
    if not matches:
        raise PeerReaderError(f"proposal not found: {identifier}")
    if len(matches) > 1:
        options = ", ".join(proposal_key(item) for item in matches)
        raise PeerReaderError(f"proposal id is ambiguous; use author/slug: {options}")
    return matches[0]


def item_summary(item: dict[str, Any]) -> dict[str, Any]:
    base = proposal_base(item)
    return {
        "key": proposal_key(item),
        "id": item.get("id"),
        "title": item.get("title"),
        "title_en": item.get("titleEn"),
        "summary": item.get("summary"),
        "summary_en": item.get("summaryEn"),
        "author": item.get("author"),
        "agent_name": item.get("authorName"),
        "date": item.get("date"),
        "status": item.get("status"),
        "status_en": item.get("statusEn"),
        "source_url": f"{RAW_ROOT}/{safe_repo_path(str(item.get('sourceUrl')))}",
        "gallery_url": f"{SITE_ROOT}/{item.get('proposalUrl')}",
        "visual_url": f"{SITE_ROOT}/{safe_repo_path(str(item.get('visualUrl')))}",
        "repository_path": base,
    }


def download_bundle(item: dict[str, Any], args: argparse.Namespace) -> dict[str, Any]:
    base = proposal_base(item)
    output = Path(args.output_dir).expanduser().resolve() / proposal_key(item)
    output.mkdir(parents=True, exist_ok=True)
    files = list(DEFAULT_TEXT_FILES)
    if args.full_text:
        files.extend(FULL_TEXT_FILES)
    if args.include_figures:
        files.extend(FIGURE_FILES)
    if args.include_visual:
        files.extend(VISUAL_FILES)
    if args.include_drawings:
        files.extend(DRAWING_FILES)

    downloaded: list[dict[str, Any]] = []
    skipped: list[str] = []
    for rel in dict.fromkeys(files):
        repo_path = safe_repo_path(f"{base}/{rel}")
        url = f"{RAW_ROOT}/{repo_path}"
        try:
            content = fetch_bytes(url, args.max_file_mb * 1024 * 1024)
        except urllib.error.HTTPError as exc:
            if exc.code == 404:
                skipped.append(rel)
                continue
            raise PeerReaderError(f"failed to download {url}: HTTP {exc.code}") from exc
        target = output / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(content)
        downloaded.append({"path": rel, "bytes": len(content), "source_url": url})

    metadata = item_summary(item)
    metadata.update({"downloaded": downloaded, "optional_missing": skipped})
    (output / "peer-metadata.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return {"ok": True, "output_dir": str(output), **metadata}


def render_list(items: list[dict[str, Any]], source: str) -> str:
    lines = [f"Merged proposal catalog: {len(items)} shown", f"Index: {source}", ""]
    for item in items:
        summary = item_summary(item)
        lines.extend(
            [
                f"{summary['key']}  [{summary['status_en']}]",
                f"  {summary['title']}",
                f"  {summary['summary']}",
                f"  {summary['gallery_url']}",
                "",
            ]
        )
    return "\n".join(lines).rstrip()


def main(argv: list[str] | None = None) -> int:
    configure_utf8_output()
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo-root", default=".", help="Sparse workspace containing submissions-data.js")
    parser.add_argument("--latest", type=int, default=20, help="Maximum catalog entries to show")
    parser.add_argument("--author", help="Filter by exact GitHub author")
    parser.add_argument("--status", help="Filter by status key")
    parser.add_argument("--search", help="Search titles, summaries, authors, and ids")
    parser.add_argument("--proposal", help="Download one proposal by id or author/slug")
    parser.add_argument("--output-dir", default=".peer-proposals", help="Git-ignored download cache")
    parser.add_argument("--full-text", action="store_true", help="Include translations and structured matrices")
    parser.add_argument("--include-figures", action="store_true", help="Download the five proposal figures")
    parser.add_argument("--include-visual", action="store_true", help="Download proposal and visual HTML")
    parser.add_argument("--include-drawings", action="store_true", help="Download large A3/A0 PDFs")
    parser.add_argument("--max-file-mb", type=int, default=25, help="Per-file safety limit")
    parser.add_argument("--json", action="store_true", help="Print machine-readable output")
    args = parser.parse_args(argv)

    if args.latest < 1 or args.max_file_mb < 1:
        parser.error("--latest and --max-file-mb must be positive")
    try:
        items, source = load_index(Path(args.repo_root).resolve(), args.max_file_mb * 1024 * 1024)
        if args.proposal:
            result: Any = download_bundle(find_proposal(items, args.proposal), args)
        else:
            selected = filter_items(items, args)
            result = {
                "ok": True,
                "index_source": source,
                "total_proposals": len(items),
                "shown": len(selected),
                "proposals": [item_summary(item) for item in selected],
            }
    except (PeerReaderError, OSError, UnicodeDecodeError, json.JSONDecodeError, urllib.error.URLError) as exc:
        result = {"ok": False, "error": str(exc)}

    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    elif result.get("ok") and not args.proposal:
        selected_items = [find_proposal(items, item["key"]) for item in result["proposals"]]
        print(render_list(selected_items, result["index_source"]))
    elif result.get("ok"):
        print(f"Downloaded {len(result['downloaded'])} files to {result['output_dir']}")
        if result.get("optional_missing"):
            print("Optional files not present: " + ", ".join(result["optional_missing"]))
    else:
        print(f"Peer proposal read failed: {result['error']}", file=sys.stderr)
    return 0 if result.get("ok") else 1


if __name__ == "__main__":
    raise SystemExit(main())
