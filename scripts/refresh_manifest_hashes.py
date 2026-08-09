#!/usr/bin/env python3
"""Refresh sha256 values for files already listed in a submission manifest."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath


def manifest_file_path(root: Path, raw_path: object) -> tuple[str, Path]:
    if not isinstance(raw_path, str) or not raw_path.strip():
        raise ValueError("manifest file path must be a non-empty string")
    relative = raw_path.strip()
    pure_path = PurePosixPath(relative)
    if pure_path.is_absolute() or ".." in pure_path.parts:
        raise ValueError(f"manifest path must stay inside the package: {relative}")
    path = root / pure_path.as_posix()
    try:
        resolved_root = root.resolve()
        resolved_path = path.resolve()
        resolved_path.relative_to(resolved_root)
    except (OSError, RuntimeError, ValueError) as exc:
        raise ValueError(f"manifest path must stay inside the package: {relative}") from exc
    if path.is_symlink() or not path.is_file():
        raise ValueError(f"manifest file is missing or not a regular file: {relative}")
    return pure_path.as_posix(), path


def package_manifest_path(root: Path) -> Path:
    """Return only a regular manifest file physically contained by the package."""
    manifest_path = root / "manifest.json"
    try:
        resolved_path = manifest_path.resolve(strict=True)
        resolved_path.relative_to(root)
    except (OSError, RuntimeError, ValueError) as exc:
        raise ValueError("manifest.json must stay inside the package") from exc
    if manifest_path.is_symlink() or not manifest_path.is_file():
        raise ValueError("manifest.json must be a regular file inside the package")
    return manifest_path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("submission_dir")
    args = parser.parse_args()

    root = Path(args.submission_dir).resolve()
    try:
        manifest_path = package_manifest_path(root)
    except ValueError as exc:
        parser.error(str(exc))
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        parser.error(f"manifest.json must be valid UTF-8 JSON: {exc}")

    files = manifest.get("files") if isinstance(manifest, dict) else None
    if not isinstance(files, list):
        parser.error("manifest.json must contain a files array")

    errors: list[str] = []
    resolved_files: list[tuple[dict, str, Path]] = []
    for index, item in enumerate(files):
        if not isinstance(item, dict):
            errors.append(f"files[{index}] must be an object")
            continue
        try:
            relative, path = manifest_file_path(root, item.get("path"))
        except ValueError as exc:
            errors.append(f"files[{index}]: {exc}")
            continue
        if relative == "manifest.json":
            continue
        resolved_files.append((item, relative, path))

    if errors:
        print("Manifest hashes were not updated:")
        for error in errors:
            print(f"- {error}")
        return 1

    for item, _, path in resolved_files:
        item["sha256"] = hashlib.sha256(path.read_bytes()).hexdigest()
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Updated {len(resolved_files)} manifest hashes: {manifest_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
