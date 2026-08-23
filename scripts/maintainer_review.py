#!/usr/bin/env python3
"""Run the local maintainer review bundle for one submission directory.

This script orchestrates the four-gate self-check, builds a human-readable
review summary, and writes the following files to ``--out`` (default:
``.maintainer-review/<proposal-slug>/``):

- ``review-input.json`` — structured input for an external AI review model
- ``review-prompt.md`` — ready-to-paste prompt including the rubric
- ``review-summary.json`` — machine-readable gate and recommendation summary
- ``maintainer-comment.md`` — GitHub PR comment template
- ``advisory-review.md`` — human-readable advisory review with per-dimension
  stubs ready for professional scoring

Recommendation values
---------------------
- ``formal-review-ready``: all four gates pass; eligible for professional scoring.
- ``intake-provisional``: may be merged for intake discussion but not scored.
- ``request-changes``: one or more gates fail; contributor must repair.
- ``reject``: mandatory rejection condition detected (PII, false official claim,
  classified material, etc.); close or reject the PR.

Usage
-----
Run from the repository root::

    python3 scripts/maintainer_review.py submissions/<login>/<slug> \\
        --pr-author <login>

Write output to a custom directory::

    python3 scripts/maintainer_review.py submissions/<login>/<slug> \\
        --pr-author <login> \\
        --out .maintainer-review/<login>-<slug>

Print the PR comment to stdout::

    python3 scripts/maintainer_review.py submissions/<login>/<slug> \\
        --pr-author <login> --comment

Machine-readable summary::

    python3 scripts/maintainer_review.py submissions/<login>/<slug> \\
        --pr-author <login> --json

Exit code is 0 when recommendation is ``formal-review-ready`` or
``intake-provisional`` and 1 otherwise.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Any

from review_submission import build_prompt, build_review_input


SCRIPT_DIR = Path(__file__).resolve().parent
DEFAULT_OUTPUT_ROOT = ".maintainer-review"


def script_path(repo_root: Path, name: str) -> Path:
    candidate = repo_root / "scripts" / name
    if candidate.exists():
        return candidate
    return SCRIPT_DIR / name


def run_json_command(command: list[str]) -> dict[str, Any]:
    completed = subprocess.run(
        command,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        env={**os.environ, "PYTHONUTF8": "1", "PYTHONIOENCODING": "utf-8"},
        check=False,
    )
    parsed: Any = {}
    stdout = completed.stdout or ""
    stderr = completed.stderr or ""
    if stdout.strip():
        try:
            parsed = json.loads(stdout)
        except json.JSONDecodeError:
            parsed = {"raw_stdout": stdout}
    return {
        "returncode": completed.returncode,
        "ok": completed.returncode == 0,
        "stdout": parsed,
        "stderr": stderr.strip(),
    }


def relpath(path: Path, root: Path) -> str:
    try:
        return path.resolve().relative_to(root.resolve()).as_posix()
    except ValueError:
        return path.resolve().as_posix()


def collect_issue_lines(result: dict[str, Any], section: str) -> list[str]:
    stdout = result.get("stdout")
    if not isinstance(stdout, dict):
        return []
    issues = stdout.get("issues")
    if not isinstance(issues, list):
        return []
    lines = []
    for issue in issues:
        if not isinstance(issue, dict):
            continue
        severity = issue.get("severity", "unknown")
        check_id = issue.get("check_id", "UNKNOWN")
        target = issue.get("target_file") or issue.get("path") or issue.get("target") or ""
        message = issue.get("message", "")
        if severity in {"blocking", "major"}:
            lines.append(f"- `{section}` [{severity}] `{check_id}` {target}: {message}".strip())
    return lines


def deterministic_errors(self_check: dict[str, Any]) -> list[str]:
    deterministic = self_check.get("deterministic_validation", {})
    stdout = deterministic.get("stdout") if isinstance(deterministic, dict) else {}
    if not isinstance(stdout, dict):
        return []
    return [str(item) for item in stdout.get("errors", []) or []]


def mandatory_rejection_hits(self_check: dict[str, Any]) -> list[str]:
    hits = []
    for error in deterministic_errors(self_check):
        if any(keyword in error for keyword in ["身份证", "手机号", "伪造官方", "隐私", "涉密", "攻击性", "歧视"]):
            hits.append(error)
    return hits


def recommendation_for(self_check: dict[str, Any]) -> str:
    if mandatory_rejection_hits(self_check):
        return "reject"
    if not self_check.get("ok"):
        return "request-changes"
    return "formal-review-ready"


def check_status(self_check: dict[str, Any], key: str) -> str:
    result = self_check.get(key)
    if isinstance(result, dict) and result.get("ok"):
        return "PASS"
    return "FAIL"


def build_summary(repo_root: Path, submission_dir: Path, pr_author: str, self_check_result: dict[str, Any]) -> dict[str, Any]:
    self_check = self_check_result.get("stdout") if isinstance(self_check_result.get("stdout"), dict) else {}
    if not isinstance(self_check, dict):
        self_check = {}
    recommendation = recommendation_for(self_check)
    return {
        "submission_dir": relpath(submission_dir, repo_root),
        "pr_author": pr_author,
        "recommendation": recommendation,
        "ok": bool(self_check.get("ok")),
        "can_enter_formal_review": bool(self_check.get("can_enter_formal_review")),
        "checks": {
            "deterministic_validation": check_status(self_check, "deterministic_validation"),
            "spatial_review": check_status(self_check, "spatial_review"),
            "visual_packaging_check": check_status(self_check, "visual_review"),
            "professional_review": check_status(self_check, "professional_review"),
        },
        "mandatory_rejection_hits": mandatory_rejection_hits(self_check),
        "next_actions": self_check.get("next_actions", []) if isinstance(self_check.get("next_actions"), list) else [],
        "spatial_issue_ids": self_check.get("spatial_issue_ids", []) if isinstance(self_check.get("spatial_issue_ids"), list) else [],
        "visual_issue_ids": self_check.get("visual_issue_ids", []) if isinstance(self_check.get("visual_issue_ids"), list) else [],
        "professional_issue_ids": self_check.get("professional_issue_ids", []) if isinstance(self_check.get("professional_issue_ids"), list) else [],
    }


def build_comment(summary: dict[str, Any]) -> str:
    lines = [
        "# Maintainer Review Summary",
        "",
        f"Submission: `{summary['submission_dir']}`",
        f"Recommendation: **{summary['recommendation']}**",
        f"Can enter formal professional scoring: **{'YES' if summary['can_enter_formal_review'] else 'NO'}**",
        "",
        "## Gate Checks",
    ]
    for name, status in summary["checks"].items():
        lines.append(f"- {name}: **{status}**")
    if summary["mandatory_rejection_hits"]:
        lines.extend(["", "## Mandatory Rejection Hits"])
        lines.extend(f"- {item}" for item in summary["mandatory_rejection_hits"])
    if summary["next_actions"]:
        lines.extend(["", "## Required Next Actions"])
        lines.extend(f"- {item}" for item in summary["next_actions"][:20])
    else:
        lines.extend(["", "## Required Next Actions", "- None from automated maintainer review. Human review still required."])
    lines.extend(
        [
            "",
            "## Maintainer Decision Guide",
            "- `formal-review-ready`: eligible for formal professional scoring.",
            "- `intake-provisional`: may be merged/displayed for intake discussion, but not formal scoring.",
            "- `request-changes`: ask contributor to repair listed issues.",
            "- `reject`: close or reject due to mandatory rejection condition.",
        ]
    )
    return "\n".join(lines) + "\n"


def build_advisory(summary: dict[str, Any], review_input: dict[str, Any]) -> str:
    lines = [
        "# Advisory Review",
        "",
        f"Submission: `{summary['submission_dir']}`",
        "",
        "## Mandatory Rejection",
    ]
    if summary["mandatory_rejection_hits"]:
        lines.append("- Result: FAIL")
        lines.extend(f"- {item}" for item in summary["mandatory_rejection_hits"])
    else:
        lines.append("- Result: PASS")
        lines.append("- Notes: No automatic mandatory rejection hit was detected. Maintainers should still inspect sources, copyright, and claims.")
    lines.extend(
        [
            "",
            "## Formal Review Readiness",
            f"- Pre-submit self-check: {'PASS' if summary['ok'] else 'FAIL'}",
            f"- Can enter formal professional review: {'YES' if summary['can_enter_formal_review'] else 'NO'}",
            f"- Result: {summary['recommendation']}",
            "",
            "## Seven-Dimension Review",
        ]
    )
    for dimension in review_input.get("rubric_dimensions", []):
        if isinstance(dimension, dict):
            label = f"`{dimension.get('dimension_id', 'unknown')}` {dimension.get('title_zh', '未知维度')}"
        else:
            label = str(dimension)
        lines.append(f"- {label}: Pending human/professional scoring after gate review.")
    lines.extend(["", "## Data Gaps And Repairs"])
    if summary["next_actions"]:
        lines.extend(f"- {item}" for item in summary["next_actions"])
    else:
        lines.append("- No automated repair action was produced.")
    lines.extend(["", "## Recommendation", summary["recommendation"]])
    return "\n".join(lines) + "\n"


def run_maintainer_review(repo_root: Path, submission_dir: Path, pr_author: str, out_dir: Path) -> dict[str, Any]:
    self_check_result = run_json_command(
        [
            sys.executable,
            str(script_path(repo_root, "self_check_submission.py")),
            str(submission_dir.resolve()),
            "--repo-root",
            str(repo_root.resolve()),
            "--pr-author",
            pr_author,
            "--json",
        ]
    )
    review_input = build_review_input(repo_root, submission_dir)
    summary = build_summary(repo_root, submission_dir, pr_author, self_check_result)
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "review-input.json").write_text(
        json.dumps(review_input, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (out_dir / "review-prompt.md").write_text(build_prompt(review_input), encoding="utf-8")
    (out_dir / "review-summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (out_dir / "maintainer-comment.md").write_text(build_comment(summary), encoding="utf-8")
    (out_dir / "advisory-review.md").write_text(build_advisory(summary, review_input), encoding="utf-8")
    return summary


def main() -> int:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "submission_dir",
        help="Path to the proposal directory, e.g. submissions/<login>/<slug>",
    )
    parser.add_argument(
        "--repo-root",
        default=".",
        help="Repository root directory (default: current working directory)",
    )
    parser.add_argument(
        "--pr-author",
        required=True,
        help="Exact GitHub login of the PR author",
    )
    parser.add_argument(
        "--out",
        help="Output directory for review artifacts (default: .maintainer-review/<slug>)",
    )
    parser.add_argument(
        "--comment",
        action="store_true",
        help="Print maintainer-comment.md content to stdout",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Print machine-readable JSON summary to stdout",
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    submission_dir = Path(args.submission_dir)
    if not submission_dir.is_absolute():
        submission_dir = repo_root / submission_dir
    if args.out:
        out_dir = Path(args.out)
        if not out_dir.is_absolute():
            out_dir = repo_root / out_dir
    else:
        out_dir = repo_root / DEFAULT_OUTPUT_ROOT / submission_dir.name
    summary = run_maintainer_review(repo_root, submission_dir, args.pr_author, out_dir)
    if args.json:
        print(json.dumps(summary, ensure_ascii=False, indent=2))
    elif args.comment:
        print((out_dir / "maintainer-comment.md").read_text(encoding="utf-8"), end="")
    else:
        print(out_dir)
        print(f"comment: {out_dir / 'maintainer-comment.md'}")
        print(f"recommendation: {summary['recommendation']}")
    return 0 if summary["recommendation"] in {"formal-review-ready", "intake-provisional"} else 1


if __name__ == "__main__":
    raise SystemExit(main())
