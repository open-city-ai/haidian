#!/usr/bin/env python3
"""Run local workspace, scope, size, remote, and submission checks before a PR.

This script is the final gate before uploading.  It confirms that the local
workspace, branch, remote configuration, file scope, package size, and
contributor self-check are all in order.  Run it once before committing and
again with ``--check-push`` immediately before ``git push``.

Checks performed
----------------
- Branch is not ``main`` or ``master``; a participant branch is required.
- Submission path is ``submissions/<github-login>/<proposal-slug>``; the
  directory owner matches ``--pr-author`` exactly.
- All changed files are inside the participant's proposal directory.
- No file exceeds GitHub's 100 MiB hard limit.
- Total package size is reported; a warning fires above 200 MiB.
- ``origin`` is a fork (not the canonical repository) unless
  ``--allow-canonical-origin`` is supplied.
- ``upstream`` remote points to ``open-city-ai/haidian`` (advisory).
- Workspace uses blobless partial clone and sparse checkout (advisory).
- Self-check passes (``self_check_submission.py``), unless ``--skip-self-check``.
- Optional: ``git push --dry-run`` to confirm push credentials and access.

Usage
-----
Standard preflight (run from repository root)::

    python3 scripts/participant_preflight.py submissions/<login>/<slug> \\
        --pr-author <login>

Include push credential check::

    python3 scripts/participant_preflight.py submissions/<login>/<slug> \\
        --pr-author <login> --check-push

Machine-readable output::

    python3 scripts/participant_preflight.py submissions/<login>/<slug> \\
        --pr-author <login> --json

The exit code is 0 when all blockers pass and 1 otherwise.  Fix every listed
blocker before running ``git push`` and ``gh pr create``.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Any

from participant_owner_aliases import authorized_legacy_submission_dirs


GITHUB_HARD_FILE_LIMIT = 100 * 1024 * 1024
LARGE_FILE_WARNING = 25 * 1024 * 1024
LARGE_PACKAGE_WARNING = 200 * 1024 * 1024


def run(command: list[str], cwd: Path) -> subprocess.CompletedProcess[str]:
    environment = os.environ.copy()
    environment["PYTHONUTF8"] = "1"
    environment["PYTHONIOENCODING"] = "utf-8"
    return subprocess.run(
        command,
        cwd=cwd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        env=environment,
        check=False,
    )


def git_output(repo_root: Path, *args: str, allow_failure: bool = False) -> str:
    completed = run(["git", *args], repo_root)
    if completed.returncode and not allow_failure:
        detail = completed.stderr.strip() or completed.stdout.strip()
        raise RuntimeError(f"git {' '.join(args)} failed: {detail}")
    return completed.stdout.strip()


def changed_files(repo_root: Path, base_ref: str | None) -> list[str]:
    paths: set[str] = set()
    tracked_commands: list[tuple[str, ...]] = [
        ("diff", "--name-only", "--cached", "-z"),
        ("diff", "--name-only", "-z"),
    ]
    if base_ref:
        tracked_commands.append(("diff", "--name-only", "-z", f"{base_ref}...HEAD"))
    for command in tracked_commands:
        output = git_output(repo_root, *command)
        paths.update(item for item in output.split("\0") if item)
    untracked = git_output(repo_root, "ls-files", "--others", "--exclude-standard", "-z")
    paths.update(
        item
        for item in untracked.split("\0")
        if item and not item.startswith(".peer-proposals/")
    )
    return sorted(paths)


def bool_config(repo_root: Path, key: str) -> bool:
    return git_output(repo_root, "config", "--bool", key, allow_failure=True) == "true"


def file_inventory(submission_dir: Path) -> tuple[list[dict[str, Any]], int]:
    files: list[dict[str, Any]] = []
    total = 0
    for path in sorted(submission_dir.rglob("*")):
        if not path.is_file():
            continue
        size = path.stat().st_size
        total += size
        files.append({"path": path.relative_to(submission_dir).as_posix(), "bytes": size})
    return files, total


def check_push(repo_root: Path, branch: str) -> dict[str, Any]:
    completed = run(["git", "push", "--dry-run", "origin", f"HEAD:refs/heads/{branch}"], repo_root)
    return {
        "ok": completed.returncode == 0,
        "command": f"git push --dry-run origin HEAD:refs/heads/{branch}",
        "stdout": completed.stdout.strip(),
        "stderr": completed.stderr.strip(),
    }


def run_self_check(
    repo_root: Path, submission_rel: str, pr_author: str, pr_author_id: int | None
) -> dict[str, Any]:
    command = [
        sys.executable,
        str(repo_root / "scripts" / "self_check_submission.py"),
        submission_rel,
        "--pr-author",
        pr_author,
        "--json",
    ]
    if pr_author_id is not None:
        command.extend(["--pr-author-id", str(pr_author_id)])
    completed = run(command, repo_root)
    try:
        output: Any = json.loads(completed.stdout) if completed.stdout.strip() else {}
    except json.JSONDecodeError:
        output = {"raw_stdout": completed.stdout.strip()}
    return {
        "ok": completed.returncode == 0,
        "returncode": completed.returncode,
        "report": output,
        "stderr": completed.stderr.strip(),
    }


def inspect(args: argparse.Namespace) -> dict[str, Any]:
    requested_root = Path(args.repo_root).expanduser().resolve()
    root_text = git_output(requested_root, "rev-parse", "--show-toplevel")
    repo_root = Path(root_text).resolve()
    submission_dir = (repo_root / args.submission_dir).resolve()
    try:
        submission_rel = submission_dir.relative_to(repo_root).as_posix()
    except ValueError as exc:
        raise RuntimeError("submission directory must be inside the repository") from exc

    parts = Path(submission_rel).parts
    blockers: list[str] = []
    warnings: list[str] = []
    authorized_legacy_dirs = authorized_legacy_submission_dirs(
        repo_root, args.pr_author_id, args.pr_author
    )
    if len(parts) != 3 or parts[0] != "submissions":
        blockers.append("submission path must be submissions/<github-login>/<proposal-slug>")
    elif parts[1] != args.pr_author and submission_rel not in authorized_legacy_dirs:
        blockers.append(
            f"submission owner '{parts[1]}' does not exactly match PR author '{args.pr_author}'; "
            "for a maintainer-approved login alias, pass the stable GitHub user ID with --pr-author-id"
        )
    if not submission_dir.is_dir():
        blockers.append(f"submission directory does not exist: {submission_rel}")

    branch = git_output(repo_root, "branch", "--show-current")
    if not branch:
        blockers.append("HEAD is detached; create a participant branch before pushing")
    elif branch in {"main", "master"}:
        blockers.append(f"do not submit directly from protected branch '{branch}'")

    origin_url = git_output(repo_root, "remote", "get-url", "origin", allow_failure=True)
    upstream_url = git_output(repo_root, "remote", "get-url", "upstream", allow_failure=True)
    if not origin_url:
        blockers.append("origin remote is missing")
    elif "open-city-ai/haidian" in origin_url and not args.allow_canonical_origin:
        warnings.append(
            "origin points to the canonical repository; contributors without write access "
            "should clone their fork as origin"
        )
    if origin_url and "open-city-ai/haidian" not in origin_url and not upstream_url:
        warnings.append("fork workspace has no upstream remote for syncing open-city-ai/haidian")

    partial_filter = git_output(
        repo_root, "config", "--get", "remote.origin.partialclonefilter", allow_failure=True
    )
    sparse = bool_config(repo_root, "core.sparseCheckout")
    shallow = git_output(repo_root, "rev-parse", "--is-shallow-repository", allow_failure=True) == "true"
    if partial_filter != "blob:none":
        warnings.append("workspace is not a blobless partial clone and may consume unnecessary disk space")
    if not sparse:
        warnings.append("workspace does not use sparse checkout and may materialize other proposals")

    base_ref = None
    for candidate in ("upstream/main", "origin/main"):
        if git_output(repo_root, "rev-parse", "--verify", candidate, allow_failure=True):
            base_ref = candidate
            break
    if not base_ref:
        blockers.append("no upstream/main or origin/main base ref is available to verify committed PR scope")
    changes = changed_files(repo_root, base_ref)
    allowed_prefix = submission_rel.rstrip("/") + "/"
    outside = [path for path in changes if not path.startswith(allowed_prefix)]
    if outside:
        blockers.append("PR scope contains files outside the participant proposal directory")
    if not changes:
        warnings.append("no participant changes were found relative to the base branch or working tree")

    inventory: list[dict[str, Any]] = []
    package_bytes = 0
    if submission_dir.is_dir():
        inventory, package_bytes = file_inventory(submission_dir)
        oversized = [item for item in inventory if item["bytes"] > GITHUB_HARD_FILE_LIMIT]
        large = [
            item
            for item in inventory
            if LARGE_FILE_WARNING < item["bytes"] <= GITHUB_HARD_FILE_LIMIT
        ]
        if oversized:
            blockers.append(
                "files exceed GitHub's 100 MiB hard limit: "
                + ", ".join(item["path"] for item in oversized)
            )
        if large:
            warnings.append(
                "large files may upload slowly: " + ", ".join(item["path"] for item in large)
            )
        if package_bytes > LARGE_PACKAGE_WARNING:
            warnings.append(f"proposal package is large ({package_bytes / 1048576:.1f} MiB)")

    self_check: dict[str, Any] | None = None
    if not args.skip_self_check and submission_dir.is_dir():
        self_check = run_self_check(
            repo_root, submission_rel, args.pr_author, args.pr_author_id
        )
        if not self_check["ok"]:
            blockers.append("submission self-check failed; repair the reported issues before pushing")

    push_check: dict[str, Any] | None = None
    if args.check_push and branch and origin_url:
        push_check = check_push(repo_root, branch)
        if not push_check["ok"]:
            blockers.append("origin push dry-run failed; authenticate or use a writable fork before uploading")

    return {
        "ok": not blockers,
        "repo_root": str(repo_root),
        "submission_dir": submission_rel,
        "pr_author": args.pr_author,
        "branch": branch,
        "origin_url": origin_url,
        "upstream_url": upstream_url,
        "workspace": {
            "partial_clone_filter": partial_filter or None,
            "sparse_checkout": sparse,
            "shallow_repository": shallow,
        },
        "changed_files": changes,
        "base_ref": base_ref,
        "outside_scope_files": outside,
        "package_file_count": len(inventory),
        "package_bytes": package_bytes,
        "self_check": self_check,
        "push_dry_run": push_check,
        "blockers": blockers,
        "warnings": warnings,
        "next_commands": [
            f"git add {submission_rel}",
            f'git commit -m "Submit {parts[-1] if parts else "proposal"}"',
            "git push -u origin HEAD",
            "gh pr create --repo open-city-ai/haidian --base main",
        ],
    }


def render_text(report: dict[str, Any]) -> str:
    lines = [
        "# Participant PR preflight",
        "",
        f"Result: {'PASS' if report.get('ok') else 'FAIL'}",
        f"Submission: {report.get('submission_dir')}",
        f"Branch: {report.get('branch') or 'detached'}",
        f"Changed files: {len(report.get('changed_files', []))}",
        f"Package size: {report.get('package_bytes', 0) / 1048576:.1f} MiB",
    ]
    if report.get("blockers"):
        lines.extend(["", "Blockers:"])
        lines.extend(f"- {item}" for item in report["blockers"])
    if report.get("warnings"):
        lines.extend(["", "Warnings:"])
        lines.extend(f"- {item}" for item in report["warnings"])
    if report.get("ok"):
        lines.extend(["", "Upload commands:"])
        lines.extend(f"- `{item}`" for item in report["next_commands"])
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "submission_dir",
        help="Path to the proposal directory, e.g. submissions/<login>/<slug>",
    )
    parser.add_argument(
        "--pr-author",
        required=True,
        help="Exact GitHub login of the PR author; must match the directory owner",
    )
    parser.add_argument(
        "--pr-author-id",
        type=int,
        help="Stable numeric GitHub user ID; required only for a maintainer-approved login alias",
    )
    parser.add_argument(
        "--repo-root",
        default=".",
        help="Repository root directory (default: current working directory)",
    )
    parser.add_argument(
        "--skip-self-check",
        action="store_true",
        help="Skip the self_check_submission.py gate (not recommended before the final push)",
    )
    parser.add_argument(
        "--check-push",
        action="store_true",
        help="Run git push --dry-run to verify origin credentials and write access",
    )
    parser.add_argument(
        "--allow-canonical-origin",
        action="store_true",
        help="Suppress the fork warning; for maintainers with direct write access",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Emit machine-readable JSON instead of human-readable text",
    )
    args = parser.parse_args(argv)
    try:
        report = inspect(args)
    except (OSError, RuntimeError) as exc:
        report = {"ok": False, "blockers": [str(exc)], "warnings": []}
    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print(render_text(report))
    return 0 if report.get("ok") else 1


if __name__ == "__main__":
    raise SystemExit(main())
