#!/usr/bin/env python3
"""Refresh SHA-256 values for files already declared by a submission manifest."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath


def safe_declared_file(root: Path, raw_path: object) -> tuple[str, Path]:
    if not isinstance(raw_path, str) or not raw_path.strip():
        raise ValueError("manifest file entry needs a non-empty string path")
    rel = raw_path.strip()
    candidate = PurePosixPath(rel)
    if candidate.is_absolute() or ".." in candidate.parts or "\\" in rel:
        raise ValueError(f"unsafe manifest path: {rel}")
    normalized = candidate.as_posix()
    target = (root / normalized).resolve()
    try:
        target.relative_to(root)
    except ValueError as exc:
        raise ValueError(f"manifest path escapes submission directory: {rel}") from exc
    return normalized, target


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("submission_dir")
    args = parser.parse_args()

    root = Path(args.submission_dir).resolve()
    manifest_path = root / "manifest.json"
    if not manifest_path.is_file():
        parser.error(f"manifest.json not found under {root}")
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        parser.error(f"manifest.json must be valid UTF-8 JSON: {exc}")

    files = manifest.get("files") if isinstance(manifest, dict) else None
    if not isinstance(files, list) or not files:
        parser.error("manifest.json files must be a non-empty array")

    errors: list[str] = []
    refreshed = 0
    for index, item in enumerate(files):
        if not isinstance(item, dict):
            errors.append(f"files[{index}] must be an object")
            continue
        try:
            rel, target = safe_declared_file(root, item.get("path"))
        except ValueError as exc:
            errors.append(f"files[{index}]: {exc}")
            continue
        if rel == "manifest.json":
            item.pop("sha256", None)
            continue
        if not target.is_file():
            errors.append(f"files[{index}]: listed file is missing: {rel}")
            continue
        item["sha256"] = hashlib.sha256(target.read_bytes()).hexdigest()
        refreshed += 1

    if errors:
        print("Manifest hashes were not changed:")
        for error in errors:
            print(f"- {error}")
        return 1

    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Refreshed {refreshed} manifest hashes under {root}")
    print("Run self_check_submission.py again before pushing the revision.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
