#!/usr/bin/env python3
"""Check that the public gallery exposes the current generated submissions."""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.request
from pathlib import Path
from typing import Any


DEFAULT_PUBLIC_URL = "https://haidian.open-city.ai/submissions-data.js"
DATA_PATTERN = re.compile(
    r"window\.HAIDIAN_SUBMISSIONS\s*=\s*(\[.*\]);\s*$", re.DOTALL
)


class GalleryDataError(ValueError):
    """Raised when a generated gallery data file cannot be trusted."""


def parse_gallery_data(text: str) -> list[dict[str, Any]]:
    match = DATA_PATTERN.search(text)
    if match is None:
        raise GalleryDataError("missing window.HAIDIAN_SUBMISSIONS JSON payload")
    try:
        payload = json.loads(match.group(1))
    except json.JSONDecodeError as exc:
        raise GalleryDataError(f"invalid gallery JSON: {exc}") from exc
    if not isinstance(payload, list) or any(not isinstance(item, dict) for item in payload):
        raise GalleryDataError("gallery payload must be a list of objects")
    return payload


def source_urls(items: list[dict[str, Any]]) -> set[str]:
    return set(items_by_source_url(items))


def items_by_source_url(items: list[dict[str, Any]]) -> dict[str, str]:
    """Return a canonical payload indexed by its stable gallery source URL."""
    indexed_items: dict[str, str] = {}
    for index, item in enumerate(items):
        value = item.get("sourceUrl")
        if not isinstance(value, str) or not value.strip():
            raise GalleryDataError(f"entry {index} has no non-empty sourceUrl")
        if value in indexed_items:
            raise GalleryDataError(f"duplicate sourceUrl: {value}")
        indexed_items[value] = json.dumps(
            item,
            ensure_ascii=False,
            sort_keys=True,
            separators=(",", ":"),
        )
    return indexed_items


def fetch_public_data(url: str, timeout: int = 30) -> str:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "haidian-public-gallery-parity/1.0"},
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return response.read().decode("utf-8")


def compare_gallery_data(
    expected_text: str, public_text: str
) -> tuple[set[str], set[str], set[str]]:
    expected = items_by_source_url(parse_gallery_data(expected_text))
    public = items_by_source_url(parse_gallery_data(public_text))
    shared_urls = expected.keys() & public.keys()
    changed = {url for url in shared_urls if expected[url] != public[url]}
    return expected.keys() - public.keys(), public.keys() - expected.keys(), changed


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--expected",
        type=Path,
        default=Path("submissions-data.js"),
        help="generated local gallery data file",
    )
    parser.add_argument("--url", default=DEFAULT_PUBLIC_URL, help="public gallery data URL")
    parser.add_argument("--timeout", type=int, default=30)
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    try:
        expected_text = args.expected.read_text(encoding="utf-8")
        public_text = fetch_public_data(args.url, timeout=args.timeout)
        missing, unexpected, changed = compare_gallery_data(expected_text, public_text)
    except (OSError, UnicodeDecodeError, GalleryDataError, ValueError) as exc:
        print(f"public gallery parity check failed: {exc}", file=sys.stderr)
        return 2

    expected_count = len(source_urls(parse_gallery_data(expected_text)))
    public_count = len(source_urls(parse_gallery_data(public_text)))
    print(f"expected_entries={expected_count} public_entries={public_count}")
    print(
        "missing_on_public="
        f"{len(missing)} unexpected_on_public={len(unexpected)} "
        f"changed_on_public={len(changed)}"
    )
    for path in sorted(missing):
        print(f"MISSING_ON_PUBLIC {path}")
    for path in sorted(unexpected):
        print(f"UNEXPECTED_ON_PUBLIC {path}")
    for path in sorted(changed):
        print(f"CHANGED_ON_PUBLIC {path}")
    return 1 if missing or unexpected or changed else 0


if __name__ == "__main__":
    raise SystemExit(main())
