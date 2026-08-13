#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Install or verify the Haidian urban design participant skill.

This script copies the ``urban-design-ai-submission`` skill from the
repository into the AI agent's skill directory so the agent can reference it
with ``$urban-design-ai-submission`` in prompts.

The skill directory is ``skills/urban-design-ai-submission/`` inside the
repository.  The target is ``$CODEX_HOME/skills/urban-design-ai-submission/``
(defaults to ``~/.codex/skills/urban-design-ai-submission/``).

Usage
-----
Install or update the skill::

    python3 scripts/install_submission_skill.py

Verify without modifying files::

    python3 scripts/install_submission_skill.py --check

Use a custom Codex home::

    python3 scripts/install_submission_skill.py --codex-home /path/to/codex

Machine-readable JSON output::

    python3 scripts/install_submission_skill.py --json

Exit code is 0 when the skill is installed and up to date, and 1 otherwise.

After installation, the starter prompt is::

    Use $urban-design-ai-submission to create a lightweight sparse workspace,
    participate in the Centennial Jing-Zhang AI Innovation Belt open call, read
    peer work progressively, prepare a verifiable proposal package, and pass
    local PR preflight before uploading.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import sys
from pathlib import Path
from typing import Any


SKILL_NAME = "urban-design-ai-submission"
STARTER_PROMPT = (
    "Use $urban-design-ai-submission to create a lightweight sparse workspace, "
    "participate in the Centennial Jing-Zhang AI Innovation Belt open call, read "
    "peer work progressively, prepare a verifiable proposal package, and pass local "
    "PR preflight before uploading."
)


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def default_codex_home() -> Path:
    return Path(os.environ.get("CODEX_HOME", Path.home() / ".codex")).expanduser()


def tree_digest(path: Path) -> str:
    digest = hashlib.sha256()
    for item in sorted(path.rglob("*")):
        if not item.is_file():
            continue
        rel = item.relative_to(path).as_posix()
        digest.update(rel.encode("utf-8"))
        digest.update(b"\0")
        digest.update(item.read_bytes())
        digest.update(b"\0")
    return digest.hexdigest()


def copy_skill(source: Path, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(
        source,
        target,
        dirs_exist_ok=True,
        ignore=shutil.ignore_patterns("__pycache__", "*.pyc", ".DS_Store"),
    )


def build_report(source: Path, target: Path, installed: bool, action: str) -> dict[str, Any]:
    source_exists = (source / "SKILL.md").exists()
    target_exists = (target / "SKILL.md").exists()
    report: dict[str, Any] = {
        "ok": source_exists and target_exists,
        "action": action,
        "skill_name": SKILL_NAME,
        "source": str(source),
        "target": str(target),
        "installed": installed,
        "source_exists": source_exists,
        "target_exists": target_exists,
        "starter_prompt": STARTER_PROMPT,
    }
    if source_exists:
        report["source_sha256"] = tree_digest(source)
    if target_exists:
        report["target_sha256"] = tree_digest(target)
    if source_exists and target_exists:
        report["up_to_date"] = report.get("source_sha256") == report.get("target_sha256")
    else:
        report["up_to_date"] = False
    return report


def render_text(report: dict[str, Any]) -> str:
    lines = [
        f"Skill: {report['skill_name']}",
        f"Source: {report['source']}",
        f"Target: {report['target']}",
        f"Installed: {'yes' if report['installed'] else 'no'}",
        f"Up to date: {'yes' if report.get('up_to_date') else 'no'}",
        "",
        "Starter prompt:",
        report["starter_prompt"],
    ]
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--codex-home",
        default=str(default_codex_home()),
        help="Codex home directory (default: $CODEX_HOME or ~/.codex)",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Verify that the skill is installed and up to date without copying files",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Print a machine-readable JSON report",
    )
    args = parser.parse_args(argv)

    source = repo_root() / "skills" / SKILL_NAME
    target = Path(args.codex_home).expanduser() / "skills" / SKILL_NAME

    if not (source / "SKILL.md").exists():
        report = build_report(source, target, installed=False, action="missing-source")
        report["ok"] = False
        if args.json:
            print(json.dumps(report, ensure_ascii=False, indent=2))
        else:
            print(render_text(report), file=sys.stderr)
        return 1

    installed = False
    if not args.check:
        copy_skill(source, target)
        installed = True

    report = build_report(source, target, installed=installed, action="check" if args.check else "install")
    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print(render_text(report))
    return 0 if report["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
