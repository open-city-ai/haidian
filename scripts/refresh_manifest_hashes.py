#!/usr/bin/env python3
"""Refresh file hashes in an AI submission manifest after package edits."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import stat
import sys
import tempfile
from pathlib import Path

from validate_submission import normalize_changed_path


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def write_manifest(path: Path, manifest: dict) -> None:
    """Replace the manifest atomically while preserving its file mode."""
    serialized = json.dumps(manifest, ensure_ascii=False, indent=2) + "\n"
    temporary_path: Path | None = None
    try:
        with tempfile.NamedTemporaryFile(
            "w",
            encoding="utf-8",
            dir=path.parent,
            prefix=f".{path.name}.",
            suffix=".tmp",
            delete=False,
        ) as handle:
            temporary_path = Path(handle.name)
            handle.write(serialized)
            handle.flush()
            os.fsync(handle.fileno())
        os.chmod(temporary_path, stat.S_IMODE(path.stat().st_mode))
        os.replace(temporary_path, path)
    finally:
        if temporary_path is not None:
            temporary_path.unlink(missing_ok=True)


def refresh_manifest(manifest_path: Path, *, check_only: bool = False) -> tuple[int, list[str]]:
    """Refresh hashes and return (changed_count, errors).

    Validation happens before writing so an invalid manifest or missing listed
    file cannot result in a partially refreshed package.
    """
    root = manifest_path.parent
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError, json.JSONDecodeError) as exc:
        return 0, [f"cannot read {manifest_path}: {exc}"]
    if not isinstance(manifest, dict):
        return 0, [f"{manifest_path}: top-level JSON value must be an object"]

    files = manifest.get("files")
    if not isinstance(files, list) or not files:
        return 0, [f"{manifest_path}: files must be a non-empty array"]

    errors: list[str] = []
    updates: list[tuple[dict, str]] = []
    seen: set[str] = set()
    for index, item in enumerate(files):
        if not isinstance(item, dict) or not item.get("path"):
            errors.append(f"{manifest_path}: files[{index}] needs path")
            continue
        raw_path = str(item["path"])
        try:
            relative = normalize_changed_path(raw_path)
        except ValueError as exc:
            errors.append(f"{manifest_path}: files[{index}] {exc}")
            continue
        if relative in seen:
            errors.append(f"{manifest_path}: duplicate file path `{relative}`")
            continue
        seen.add(relative)
        if relative == "manifest.json":
            continue
        file_path = root / relative
        try:
            file_path.resolve().relative_to(root.resolve())
        except ValueError:
            errors.append(f"{manifest_path}: listed file `{relative}` resolves outside the package")
            continue
        if not file_path.is_file():
            errors.append(f"{manifest_path}: listed file `{relative}` is missing")
            continue
        updates.append((item, sha256(file_path)))

    if errors:
        return 0, errors

    changed = sum(1 for item, digest in updates if item.get("sha256") != digest)
    if not check_only and changed:
        for item, digest in updates:
            item["sha256"] = digest
        try:
            write_manifest(manifest_path, manifest)
        except OSError as exc:
            return 0, [f"cannot write {manifest_path}: {exc}"]
    return changed, []


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("submission_dir", help="AI submission directory containing manifest.json")
    parser.add_argument(
        "--check",
        action="store_true",
        help="report stale hashes without changing manifest.json",
    )
    args = parser.parse_args()
    submission_dir = Path(args.submission_dir).resolve()
    manifest_path = submission_dir / "manifest.json"
    changed, errors = refresh_manifest(manifest_path, check_only=args.check)
    if errors:
        for error in errors:
            print(error, file=sys.stderr)
        return 1
    if args.check:
        if changed:
            print(f"Manifest hashes need refresh: {submission_dir} ({changed} stale)")
            return 1
        print(f"Manifest hashes are current: {submission_dir}")
        return 0
    if changed:
        print(f"Refreshed {changed} manifest hashes: {submission_dir}")
    else:
        print(f"Manifest hashes are already current: {submission_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
