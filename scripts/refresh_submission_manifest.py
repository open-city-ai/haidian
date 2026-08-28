#!/usr/bin/env python3
"""Refresh hashes for files already declared by a review-ready submission."""

from __future__ import annotations

import argparse
import json
import os
import shlex
import stat
import tempfile
from pathlib import Path, PurePosixPath
from typing import Any

from finalize_submission import manifest_digests


def refresh_manifest(root: Path) -> tuple[bool, str, list[str]]:
    root = root.resolve()
    manifest_path = root / "manifest.json"
    try:
        manifest: Any = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError, json.JSONDecodeError) as exc:
        return False, f"cannot read manifest.json: {exc}", []
    if not isinstance(manifest, dict):
        return False, "manifest.json must contain an object", []
    if manifest.get("package_state") != "ready_for_review":
        return False, "package_state must be ready_for_review; scaffold packages must use finalize_submission.py", []
    files = manifest.get("files")
    if not isinstance(files, list):
        return False, "manifest.json must contain a files array", []
    claim = manifest.get("validation_claim")
    if not isinstance(claim, dict):
        return False, "manifest.json is missing validation_claim", []

    refreshed: list[str] = []
    refresh_items: list[tuple[dict[str, Any], str]] = []
    seen: set[str] = set()
    for item in files:
        if not isinstance(item, dict):
            return False, "every manifest file entry must be an object", []
        rel = item.get("path")
        if not isinstance(rel, str) or not rel:
            return False, "every manifest file entry must have a non-empty path", []
        pure = PurePosixPath(rel)
        if pure.is_absolute() or ".." in pure.parts or rel in seen:
            return False, f"unsafe or duplicate manifest path: {rel}", []
        seen.add(rel)
        if rel == "manifest.json":
            if "sha256" in item:
                return False, "manifest.json cannot declare a hash for itself", []
            continue
        target = (root / Path(*pure.parts)).resolve()
        if not target.is_relative_to(root) or not target.is_file():
            return False, f"listed file is missing or outside the submission: {rel}", []
        refresh_items.append((item, rel))

    if not refresh_items:
        return False, "manifest.json has no declared files to refresh", []
    try:
        hashes = manifest_digests(root, [rel for _item, rel in refresh_items])
    except OSError as exc:
        paths = ", ".join(rel for _item, rel in refresh_items)
        return False, f"cannot read listed files ({paths}): {exc}", []
    except (ValueError, RuntimeError) as exc:
        return False, f"unsafe manifest path: {exc}", []
    for item, rel in refresh_items:
        item["sha256"] = hashes[rel]
        refreshed.append(rel)
    claim["self_checked"] = False

    encoded = (json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    temporary: str | None = None
    try:
        manifest_mode = stat.S_IMODE(manifest_path.stat().st_mode)
        with tempfile.NamedTemporaryFile(dir=root, prefix=".manifest-", suffix=".tmp", delete=False) as handle:
            temporary = handle.name
            handle.write(encoded)
            handle.flush()
            os.fsync(handle.fileno())
        os.chmod(temporary, manifest_mode)
        os.replace(temporary, manifest_path)
    except OSError as exc:
        if temporary:
            Path(temporary).unlink(missing_ok=True)
        return False, f"cannot update manifest.json: {exc}", []
    return True, "", refreshed


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("submission_dir")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()
    root = Path(args.submission_dir)
    ok, error, refreshed = refresh_manifest(root)
    result = {
        "ok": ok,
        "submission_dir": str(root),
        "refreshed_files": refreshed,
        "validation_claim_self_checked": False if ok else None,
        "next_command": (
            f"python3 scripts/self_check_submission.py {shlex.quote(str(root))} "
            "--pr-author GITHUB_LOGIN "
            "--mark-self-checked --json"
            if ok
            else None
        ),
        "next_command_note": "Replace GITHUB_LOGIN with the exact PR author login." if ok else None,
        "error": error or None,
    }
    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    elif ok:
        print(f"Refreshed {len(refreshed)} declared manifest hashes and set validation_claim.self_checked=false.")
        print(f"Next: {result['next_command']}")
        print(result["next_command_note"])
    else:
        print(f"Manifest refresh refused: {error}")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
