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
from typing import Any

from validate_submission import normalize_changed_path


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def write_json_file(path: Path, data: dict) -> None:
    """Replace a JSON object atomically while preserving its file mode."""
    serialized = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
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


def write_manifest(path: Path, manifest: dict) -> None:
    """Backward-compatible manifest-specific wrapper."""
    write_json_file(path, manifest)


def refresh_manifest(
    manifest_path: Path,
    *,
    check_only: bool = False,
    invalidate_self_check: bool = True,
) -> tuple[int, list[str]]:
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
        claim = manifest.get("validation_claim")
        if invalidate_self_check and isinstance(claim, dict):
            # New declared artifact bytes require a new four-gate check.  A
            # hash refresh is not itself proof that those checks were rerun.
            claim["self_checked"] = False
        try:
            write_manifest(manifest_path, manifest)
        except OSError as exc:
            return 0, [f"cannot write {manifest_path}: {exc}"]
    return changed, []


def discover_manifests(repo_root: Path) -> list[Path]:
    """Return manifests under the two-level participant submission layout."""
    submissions_root = repo_root / "submissions"
    if not submissions_root.is_dir():
        return []
    return sorted(path for path in submissions_root.glob("*/*/manifest.json") if path.is_file())


def audit_manifests(repo_root: Path) -> dict[str, Any]:
    """Read every manifest hash without changing package files.

    This is deliberately audit-only: a stale hash can invalidate a stored
    formal-readiness claim, but an audit must never rewrite that claim or make
    a package appear newly checked.
    """
    repo_root = repo_root.resolve()
    packages: list[dict[str, Any]] = []
    stale_packages = 0
    stale_artifacts = 0
    error_packages = 0
    for manifest_path in discover_manifests(repo_root):
        stale, errors = refresh_manifest(manifest_path, check_only=True)
        rel_dir = manifest_path.parent.relative_to(repo_root).as_posix()
        packages.append(
            {
                "submission_dir": rel_dir,
                "stale_artifacts": stale,
                "errors": errors,
            }
        )
        if stale:
            stale_packages += 1
            stale_artifacts += stale
        if errors:
            error_packages += 1
    return {
        "ok": stale_packages == 0 and error_packages == 0,
        "packages": packages,
        "summary": {
            "packages_scanned": len(packages),
            "packages_with_stale_hashes": stale_packages,
            "stale_artifacts": stale_artifacts,
            "packages_with_errors": error_packages,
        },
    }


def format_audit(report: dict[str, Any]) -> str:
    lines = ["# Manifest hash audit", ""]
    for package in report["packages"]:
        if package["errors"]:
            lines.append(f"- ERROR {package['submission_dir']}: {'; '.join(package['errors'])}")
        elif package["stale_artifacts"]:
            lines.append(f"- STALE {package['submission_dir']}: {package['stale_artifacts']} artifact(s)")
    summary = report["summary"]
    lines.extend(
        [
            "",
            (
                "Scanned {packages_scanned} package(s); {packages_with_stale_hashes} stale package(s), "
                "{stale_artifacts} stale artifact(s), {packages_with_errors} error package(s)."
            ).format(**summary),
        ]
    )
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("submission_dir", nargs="?", help="AI submission directory containing manifest.json")
    parser.add_argument(
        "--check",
        action="store_true",
        help="report stale hashes without changing manifest.json",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="audit every submissions/<owner>/<slug>/manifest.json without changing package files",
    )
    parser.add_argument("--repo-root", default=".", help="repository root used with --all")
    parser.add_argument("--json", action="store_true", help="emit machine-readable audit output with --all")
    args = parser.parse_args()

    if args.all:
        if args.submission_dir:
            parser.error("submission_dir cannot be used with --all")
        report = audit_manifests(Path(args.repo_root))
        if args.json:
            print(json.dumps(report, ensure_ascii=False, indent=2))
        else:
            print(format_audit(report))
        return 0 if report["ok"] else 1
    if not args.submission_dir:
        parser.error("submission_dir is required unless --all is used")

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
