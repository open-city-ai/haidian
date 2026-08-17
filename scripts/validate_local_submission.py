#!/usr/bin/env python3
"""Validate a local submission directory.

This is a contributor-friendly wrapper around validate_submission.py. It
discovers files under one proposal directory and passes them as changed files.

Usage
-----
Run from the repository root (or pass --repo-root explicitly):

    python3 scripts/validate_local_submission.py submissions/<login>/<slug> \\
        --pr-author <login>

Add --json to get machine-readable output suitable for automated repair:

    python3 scripts/validate_local_submission.py submissions/<login>/<slug> \\
        --pr-author <login> --json

The exit code is 0 when the package passes all blocking checks and 1 when one
or more errors are found.  Warnings do not affect the exit code.

Use --allow-pending-self-check to skip the self_checked assertion when the
four-gate self-check is still running in a background process.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from validate_submission import format_report, validate_submission
from participant_owner_aliases import authorized_legacy_submission_dirs


def repo_relative(path: Path, repo_root: Path) -> str:
    try:
        return path.resolve().relative_to(repo_root.resolve()).as_posix()
    except ValueError as exc:
        raise SystemExit(
            f"{path} is not under repo root {repo_root.resolve()}; "
            "submissions must live at submissions/<github-login>/<proposal-slug> "
            "inside the repository (pass --repo-root if you run this from elsewhere)"
        ) from exc


def discover_submission_files(submission_dir: Path, repo_root: Path) -> list[str]:
    try:
        submission_dir.resolve().relative_to(repo_root.resolve())
    except ValueError as exc:
        raise SystemExit(
            f"{submission_dir}: submission directory is not under repo root "
            f"{repo_root.resolve()}; scaffold and validate submissions at "
            "submissions/<github-login>/<proposal-slug> inside the repository "
            "(pass --repo-root if you run this from elsewhere)"
        ) from exc
    if not submission_dir.exists():
        raise SystemExit(f"{submission_dir}: submission directory does not exist")
    if not submission_dir.is_dir():
        raise SystemExit(f"{submission_dir}: expected a submission directory")
    files = [
        repo_relative(path, repo_root)
        for path in sorted(submission_dir.rglob("*"))
        # exhibit.json and FEEDBACK.md are organizer-owned files rather than
        # participant package inputs. A contributor-supplied change is still
        # rejected when it appears in the GitHub PR changed-file list handled
        # directly by validate_submission.py.
        if path.is_file()
        and path.name != ".DS_Store"
        and not (
            path.parent == submission_dir
            and path.name in {"exhibit.json", "FEEDBACK.md"}
        )
    ]
    if not files:
        raise SystemExit(f"{submission_dir}: no files found")
    return files


def strict_manifest_paths(changed_files: list[str]) -> set[str]:
    """Treat the local package manifest as newly introduced when requested."""
    return {
        path
        for path in changed_files
        if path.startswith("submissions/") and path.endswith("/manifest.json")
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("submission_dir")
    parser.add_argument("--pr-author", required=True)
    parser.add_argument(
        "--pr-author-id",
        type=int,
        help="Stable numeric GitHub user ID; required only for a maintainer-approved login alias",
    )
    parser.add_argument("--repo-root", default=".")
    parser.add_argument("--json", action="store_true")
    parser.add_argument(
        "--allow-pending-self-check",
        action="store_true",
        help="allow a v2 ready package's self_checked=false claim while the self-check is completing",
    )
    parser.add_argument(
        "--strict-manifest",
        action="store_true",
        help="require the discovered manifest to use the forward schema 0.2.x contract",
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root)
    submission_dir = Path(args.submission_dir)
    if not submission_dir.is_absolute():
        submission_dir = repo_root / submission_dir

    changed_files = discover_submission_files(submission_dir, repo_root)
    report = validate_submission(
        repo_root,
        args.pr_author,
        changed_files,
        allow_pending_self_check=args.allow_pending_self_check,
        strict_manifest_paths=strict_manifest_paths(changed_files)
        if args.strict_manifest
        else (),
        authorized_legacy_submission_dirs=authorized_legacy_submission_dirs(
            repo_root, args.pr_author_id, args.pr_author
        ),
    )
    if args.json:
        print(json.dumps(report.to_dict(), ensure_ascii=False, indent=2))
    else:
        print(format_report(report))
    return 0 if report.ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
