#!/usr/bin/env python3
"""Create a lightweight Haidian participant workspace without proposal media.

This script performs a blobless partial clone with sparse checkout so only the
participation materials land in the working tree.  Other proposals' PDFs,
images, and GeoJSON blobs are excluded until explicitly requested.

What the script does
--------------------
1. Clones the participant's fork (or the canonical repository) with
   ``--filter=blob:none --sparse --depth=<N>``.
2. Sets the sparse-checkout cone to the participation paths listed in
   ``DEFAULT_SPARSE_PATHS``.
3. Adds ``open-city-ai/haidian`` as the ``upstream`` remote and syncs the base
   branch from it.
4. Creates ``submissions/<github-login>/<proposal-slug>/`` in the sparse
   checkout and switches to a participant branch.
5. Verifies that all required files and directories are present.

Usage
-----
Bootstrap using the GitHub CLI authenticated identity (recommended)::

    python3 scripts/bootstrap_participant_workspace.py \\
        --proposal-slug <proposal-slug>

Specify the fork owner and GitHub login explicitly (no GitHub CLI required)::

    python3 scripts/bootstrap_participant_workspace.py \\
        --fork-owner <login> \\
        --github-login <login> \\
        --proposal-slug <proposal-slug>

Dry run (print commands without executing)::

    python3 scripts/bootstrap_participant_workspace.py \\
        --proposal-slug <proposal-slug> --dry-run

After bootstrapping, install review dependencies and scaffold the submission::

    cd haidian
    python3 -m pip install -r requirements-review.txt
    python3 scripts/scaffold_ai_submission.py \\
        submissions/<login>/<slug> --stage formal
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any


CANONICAL_REPO = "https://github.com/open-city-ai/haidian.git"
DEFAULT_SPARSE_PATHS = (
    "/.github",
    "/brief",
    "/data",
    "/docs",
    "/schema",
    "/scripts",
    "/skills",
    "/scenarios",
    "/sources",
    "/templates",
    "/tracks.json",
    "/requirements-review.txt",
    "/requirements-translation.txt",
)
REQUIRED_FILES = (
    "skills/urban-design-ai-submission/SKILL.md",
    "brief/site-package/agent_taskbook.json",
    "data/source_registry.json",
    "sources/public-sources.json",
    "scripts/scaffold_ai_submission.py",
    "scripts/self_check_submission.py",
    "requirements-review.txt",
    "tracks.json",
)
REQUIRED_DIRECTORIES = ("scenarios",)
GITHUB_LOGIN_RE = re.compile(r"^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$")
SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$")


class BootstrapError(RuntimeError):
    pass


def run(command: list[str], *, cwd: Path | None = None) -> str:
    completed = subprocess.run(
        command,
        cwd=cwd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        check=False,
    )
    if completed.returncode:
        detail = completed.stderr.strip() or completed.stdout.strip()
        raise BootstrapError(f"command failed ({completed.returncode}): {' '.join(command)}\n{detail}")
    return completed.stdout.strip()


def validate_identity(login: str | None, slug: str | None) -> None:
    if bool(login) != bool(slug):
        raise BootstrapError("--github-login and --proposal-slug must be supplied together")
    if login and not GITHUB_LOGIN_RE.fullmatch(login):
        raise BootstrapError(f"invalid GitHub login: {login}")
    if slug and not SLUG_RE.fullmatch(slug):
        raise BootstrapError(
            "proposal slug must be 3-64 lowercase letters, digits, or hyphens and start/end alphanumeric"
        )


def resolve_github_identity(args: argparse.Namespace) -> None:
    """Use the authenticated GitHub login so directory casing stays canonical."""
    if args.proposal_slug and not args.github_login:
        if not shutil.which("gh"):
            raise BootstrapError(
                "--github-login is required when GitHub CLI is unavailable; preserve its exact letter case"
            )
        args.github_login = run(["gh", "api", "user", "--jq", ".login"])
    if args.github_login and not args.fork_owner and args.repo_url == CANONICAL_REPO:
        args.fork_owner = args.github_login


def directory_size(path: Path) -> int:
    return sum(item.stat().st_size for item in path.rglob("*") if item.is_file())


def human_size(size: int) -> str:
    value = float(size)
    for unit in ("B", "KB", "MB", "GB"):
        if value < 1024 or unit == "GB":
            return f"{value:.1f} {unit}"
        value /= 1024
    return f"{value:.1f} GB"


def clone_url(args: argparse.Namespace) -> str:
    if args.fork_owner:
        if not GITHUB_LOGIN_RE.fullmatch(args.fork_owner):
            raise BootstrapError(f"invalid fork owner: {args.fork_owner}")
        return f"https://github.com/{args.fork_owner}/haidian.git"
    return args.repo_url


def command_plan(args: argparse.Namespace, target: Path) -> list[list[str]]:
    origin = clone_url(args)
    clone = [
        "git",
        "clone",
        "--filter=blob:none",
        "--sparse",
        f"--depth={args.depth}",
        "--single-branch",
        "--branch",
        args.branch,
        origin,
        str(target),
    ]
    commands = [clone, ["git", "sparse-checkout", "set", "--no-cone", *DEFAULT_SPARSE_PATHS]]
    if origin.rstrip("/") != args.upstream_url.rstrip("/"):
        commands.extend(
            [
                ["git", "remote", "add", "upstream", args.upstream_url],
                ["git", "fetch", "--filter=blob:none", f"--depth={args.depth}", "upstream", args.branch],
                ["git", "switch", "-C", args.branch, f"upstream/{args.branch}"],
            ]
        )
    if args.github_login and args.proposal_slug:
        proposal_path = f"submissions/{args.github_login}/{args.proposal_slug}"
        commands.extend(
            [
                ["git", "sparse-checkout", "add", proposal_path],
                ["git", "switch", "-c", args.work_branch or f"submission/{args.github_login}/{args.proposal_slug}"],
            ]
        )
    return commands


def execute_plan(commands: list[list[str]], target: Path) -> None:
    run(commands[0])
    for command in commands[1:]:
        run(command, cwd=target)


def build_report(args: argparse.Namespace, target: Path, commands: list[list[str]]) -> dict[str, Any]:
    report: dict[str, Any] = {
        "ok": True,
        "target": str(target),
        "origin_url": clone_url(args),
        "upstream_url": args.upstream_url,
        "branch": args.branch,
        "partial_clone_filter": "blob:none",
        "shallow": True,
        "depth": args.depth,
        "sparse_paths": list(DEFAULT_SPARSE_PATHS),
        "commands": commands,
        "dry_run": args.dry_run,
    }
    if args.github_login and args.proposal_slug:
        report["submission_path"] = f"submissions/{args.github_login}/{args.proposal_slug}"
        report["work_branch"] = args.work_branch or f"submission/{args.github_login}/{args.proposal_slug}"
    if args.dry_run:
        return report

    missing_files = [rel for rel in REQUIRED_FILES if not (target / rel).is_file()]
    missing_directories = [rel for rel in REQUIRED_DIRECTORIES if not (target / rel).is_dir()]
    if missing_files:
        report["ok"] = False
        report["missing_required_files"] = missing_files
    if missing_directories:
        report["ok"] = False
        report["missing_required_directories"] = missing_directories
    report["worktree_size_bytes"] = directory_size(target)
    report["worktree_size_human"] = human_size(report["worktree_size_bytes"])
    report["is_sparse_checkout"] = run(
        ["git", "config", "--bool", "core.sparseCheckout"], cwd=target
    ) == "true"
    report["is_shallow_repository"] = run(
        ["git", "rev-parse", "--is-shallow-repository"], cwd=target
    ) == "true"
    report["partial_clone_config"] = run(
        ["git", "config", "--get", "remote.origin.partialclonefilter"], cwd=target
    )
    return report


def render_text(report: dict[str, Any]) -> str:
    if report.get("dry_run"):
        lines = ["Lightweight workspace plan:"]
        lines.extend("  " + " ".join(command) for command in report["commands"])
        return "\n".join(lines)
    lines = [
        f"Workspace: {report['target']}",
        f"Result: {'PASS' if report.get('ok') else 'FAIL'}",
        f"Working files: {report.get('worktree_size_human', 'unknown')}",
        "Partial clone: blob:none",
        f"Sparse checkout: {'yes' if report.get('is_sparse_checkout') else 'no'}",
        f"Shallow history: {'yes' if report.get('is_shallow_repository') else 'no'}",
    ]
    if report.get("submission_path"):
        lines.extend(
            [
                f"Submission path: {report['submission_path']}",
                f"Work branch: {report['work_branch']}",
                "",
                "Next:",
                "  python3 -m pip install -r requirements-review.txt",
                "  python3 scripts/scaffold_ai_submission.py " + report["submission_path"] + " ...",
            ]
        )
    return "\n".join(lines)


def render_failure(report: dict[str, Any]) -> str:
    """Render execution and post-bootstrap validation failures without losing detail."""
    details: list[str] = []
    if report.get("error"):
        details.append(str(report["error"]))
    for field in ("missing_required_files", "missing_required_directories"):
        values = report.get(field)
        if values:
            details.append(f"{field}: {', '.join(str(value) for value in values)}")
    if not details:
        details.append("no additional details were reported")
    return "Bootstrap failed:\n" + "\n".join(f"  {detail}" for detail in details)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--target",
        default="haidian",
        help="New workspace directory name (default: haidian)",
    )
    parser.add_argument(
        "--repo-url",
        default=CANONICAL_REPO,
        help="Repository URL when not using a fork (default: canonical open-city-ai/haidian)",
    )
    parser.add_argument(
        "--upstream-url",
        default=CANONICAL_REPO,
        help="Canonical upstream repository URL (default: open-city-ai/haidian)",
    )
    parser.add_argument(
        "--fork-owner",
        help="Clone https://github.com/<owner>/haidian.git as origin",
    )
    parser.add_argument(
        "--branch",
        default="main",
        help="Base branch to clone (default: main)",
    )
    parser.add_argument(
        "--depth",
        type=int,
        default=50,
        help="Shallow commit depth; blobs are fetched on demand (default: 50)",
    )
    parser.add_argument(
        "--github-login",
        help="GitHub login used for the submission directory; uses gh auth login if omitted",
    )
    parser.add_argument(
        "--proposal-slug",
        help="Lowercase proposal directory slug, e.g. ai-heritage-park",
    )
    parser.add_argument(
        "--work-branch",
        help="Participant branch name (default: submission/<login>/<slug>)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the deterministic command plan without executing it",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Print a machine-readable JSON report",
    )
    args = parser.parse_args(argv)

    try:
        if args.depth < 1:
            raise BootstrapError("--depth must be positive")
        resolve_github_identity(args)
        validate_identity(args.github_login, args.proposal_slug)
        if not shutil.which("git"):
            raise BootstrapError("git is required")
        target = Path(args.target).expanduser().resolve()
        if not args.dry_run and target.exists() and any(target.iterdir()):
            raise BootstrapError(f"target directory is not empty: {target}")
        commands = command_plan(args, target)
        if not args.dry_run:
            execute_plan(commands, target)
        report = build_report(args, target, commands)
    except (BootstrapError, OSError) as exc:
        report = {"ok": False, "error": str(exc)}

    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print(render_text(report) if report.get("ok") else render_failure(report))
    return 0 if report.get("ok") else 1


if __name__ == "__main__":
    raise SystemExit(main())
