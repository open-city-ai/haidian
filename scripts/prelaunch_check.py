#!/usr/bin/env python3
"""Run non-mutating checks before opening the repository to public intake.

This script is for maintainers only. It validates that the repository is
consistently configured for public submission intake, checking ten aspects:

1. **key_documents_present** — required public workflow documents exist.
2. **public_intake_open** — ``activity-status.json`` declares open status and
   public pages contain the correct opening date.
3. **generated_data_current** — frontend data files are up to date.
4. **source_registry_valid** — ``data/source_registry.json`` passes schema
   validation.
5. **boundary_language_consistent** — no stale "missing official boundary
   blocks submission" language; required non-blocking language is present.
6. **workflow_uses_trusted_base** — ``submission-validation.yml`` uses
   ``pull_request_target`` and checks out the trusted default branch.
7. **pr_template_protects_public_index** — the PR template includes guardrails
   against participants editing ``submissions-data.js`` or
   ``gallery-publication.json``.
8. **review_results_comment_only** — maintainer review artifacts are
   Git-ignored and not surfaced in public HTML pages.
9. **gallery_status_only** — gallery page explains submission status without
   exposing review details.
10. **github_settings_documented** — ``docs/github-settings.md`` documents the
    required branch-protection and status-check configuration.

Usage
-----
Run from the repository root::

    python3 scripts/prelaunch_check.py

Machine-readable JSON::

    python3 scripts/prelaunch_check.py --json

Exit code is 0 when all ten checks pass and 1 when any check fails.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from typing import Any


KEY_DOCS = [
    "activity-status.json",
    "README.md",
    "requirements-review.txt",
    "submissions/README.md",
    "agent.html",
    ".github/PULL_REQUEST_TEMPLATE.md",
    "docs/formal-submission-guide.md",
    "docs/maintainer-workflow.md",
    "docs/github-settings.md",
    "submissions.html",
]

OPEN_DATE = "2026-08-07"
OPEN_DATE_ZH = "2026年8月7日"

FORBIDDEN_BOUNDARY_PATTERNS = [
    re.compile(r"缺少官方边界[^。\n]*都会失败"),
    re.compile(r"没有官方边界时，formal 脚手架会失败"),
    re.compile(r"missing official boundary[^.\n]*fail", re.I),
]

PUBLIC_REVIEW_ARTIFACT_MARKERS = [
    "Maintainer Review Summary",
    "review-summary.json",
    "advisory-review.md",
    "formal-scorecard.json",
    "formal-scorecard-comment.md",
]


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def add_check(checks: list[dict[str, Any]], name: str, ok: bool, message: str, details: Any = None) -> None:
    item: dict[str, Any] = {"name": name, "ok": ok, "message": message}
    if details is not None:
        item["details"] = details
    checks.append(item)


def run_command(repo_root: Path, command: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        command,
        cwd=repo_root,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        env={**os.environ, "PYTHONUTF8": "1", "PYTHONIOENCODING": "utf-8"},
        check=False,
    )


def check_generated_data(repo_root: Path, checks: list[dict[str, Any]]) -> None:
    commands = [
        [sys.executable, "scripts/generate_submissions_data.py", "--check"],
        [sys.executable, "scripts/generate_source_registry_data.py", "--check"],
    ]
    failures = []
    for command in commands:
        completed = run_command(repo_root, command)
        if completed.returncode != 0:
            failures.append(
                {
                    "command": " ".join(command),
                    "stdout": completed.stdout.strip(),
                    "stderr": completed.stderr.strip(),
                }
            )
    add_check(
        checks,
        "generated_data_current",
        not failures,
        "Generated frontend data is current." if not failures else "Generated frontend data is stale.",
        failures or None,
    )


def check_source_registry(repo_root: Path, checks: list[dict[str, Any]]) -> None:
    completed = run_command(repo_root, [sys.executable, "scripts/validate_data_registry.py", "--json"])
    parsed: dict[str, Any] | None = None
    try:
        parsed = json.loads(completed.stdout)
    except json.JSONDecodeError:
        parsed = None
    ok = completed.returncode == 0 and isinstance(parsed, dict) and parsed.get("ok") is True
    add_check(
        checks,
        "source_registry_valid",
        ok,
        "Source registry is valid." if ok else "Source registry validation failed.",
        parsed if parsed is not None else {"stdout": completed.stdout, "stderr": completed.stderr},
    )


def check_required_docs(repo_root: Path, checks: list[dict[str, Any]]) -> None:
    missing = [path for path in KEY_DOCS if not (repo_root / path).exists()]
    add_check(
        checks,
        "key_documents_present",
        not missing,
        "Key public workflow documents are present." if not missing else "Key public workflow documents are missing.",
        missing or None,
    )


def check_activity_open(repo_root: Path, checks: list[dict[str, Any]]) -> None:
    status_path = repo_root / "activity-status.json"
    try:
        status = json.loads(read_text(status_path))
    except (OSError, json.JSONDecodeError) as exc:
        add_check(checks, "public_intake_open", False, "Activity status is unreadable.", str(exc))
        return
    failures = []
    expected = {
        "status": "open",
        "public_intake_open": True,
        "public_intake_open_date": OPEN_DATE,
        "submission_deadline": "2026-08-31",
        "implementation_begins": "2026-09",
        "timezone": "Asia/Shanghai",
    }
    for key, value in expected.items():
        if status.get(key) != value:
            failures.append(f"activity-status.json: {key} must be {value!r}")
    public_pages = ["index.html", "agent.html", "brief.html", "review.html", "submissions.html", "README.md"]
    forbidden = [
        "当前未开放公共",
        "暂未开放公共",
        "尚未开放公共",
        "独立社区公开征集",
        "非政府或主办方官方报名",
    ]
    for rel in public_pages:
        text = read_text(repo_root / rel)
        if OPEN_DATE_ZH not in text and "August 7, 2026" not in text:
            failures.append(f"{rel}: missing Beijing-time opening date")
        for marker in forbidden:
            if marker in text:
                failures.append(f"{rel}: stale closed-state text `{marker}`")
    add_check(
        checks,
        "public_intake_open",
        not failures,
        "Public intake is consistently open from 2026-08-07 Beijing time."
        if not failures
        else "Public intake opening status is inconsistent.",
        failures or None,
    )


def check_boundary_language(repo_root: Path, checks: list[dict[str, Any]]) -> None:
    hits = []
    for rel in [
        "README.md",
        "submissions/README.md",
        "agent.html",
        ".github/PULL_REQUEST_TEMPLATE.md",
        "docs/formal-submission-guide.md",
    ]:
        text = read_text(repo_root / rel)
        for pattern in FORBIDDEN_BOUNDARY_PATTERNS:
            for match in pattern.finditer(text):
                hits.append({"path": rel, "text": match.group(0)})

    required_text = {
        "README.md": ["组织方的数据缺口不再阻断内容评分", "不得因此扣分"],
        "docs/data-boundary-decision.md": ["不再阻断内容评分", "不得因组织方未提供正式 polygon 扣减"],
    }
    missing = []
    for rel, snippets in required_text.items():
        text = read_text(repo_root / rel)
        for snippet in snippets:
            if snippet not in text:
                missing.append({"path": rel, "missing": snippet})

    ok = not hits and not missing
    add_check(
        checks,
        "boundary_language_consistent",
        ok,
        "Boundary language preserves precision warnings without organizer-data scoring barriers."
        if ok
        else "Boundary language has stale or incomplete wording.",
        {"forbidden_hits": hits, "missing_required_text": missing} if not ok else None,
    )


def check_workflow_trusted_base(repo_root: Path, checks: list[dict[str, Any]]) -> None:
    text = read_text(repo_root / ".github" / "workflows" / "submission-validation.yml")
    failures = []
    if "pull_request_target" not in text:
        failures.append("workflow must use pull_request_target")
    if "github.event.repository.default_branch" not in text:
        failures.append("workflow must checkout the current trusted default branch")
    if "github.event.pull_request.head.sha" in text or "pull_request.head.sha" in text:
        failures.append("workflow must not checkout the PR head SHA")
    if "python3 scripts/github_pr_validation.py" not in text:
        failures.append("workflow must run the deterministic PR validator")
    if "pip install" not in text or "requirements-review.txt" not in text:
        failures.append("workflow must install requirements-review.txt before trusted review gates")
    add_check(
        checks,
        "workflow_uses_trusted_base",
        not failures,
        "submission-validation uses trusted base scripts." if not failures else "submission-validation workflow is unsafe or incomplete.",
        failures or None,
    )


def check_pr_template(repo_root: Path, checks: list[dict[str, Any]]) -> None:
    text = read_text(repo_root / ".github" / "PULL_REQUEST_TEMPLATE.md")
    required = [
        "本 PR 不修改 `gallery-publication.json` 或 `submissions-data.js`",
        "已合并方案自动进入展示页，首页精选由维护者决定",
        "本 PR 只修改 `submissions/<my-github-login>/`",
        "已记录 `package_type` 与派生的 `review_status`",
    ]
    missing = [snippet for snippet in required if snippet not in text]
    add_check(
        checks,
        "pr_template_protects_public_index",
        not missing,
        "PR template keeps participants out of generated gallery and review artifacts."
        if not missing
        else "PR template is missing public-index guardrails.",
        missing or None,
    )


def check_review_comment_only(repo_root: Path, checks: list[dict[str, Any]]) -> None:
    workflow_doc = read_text(repo_root / "docs" / "maintainer-workflow.md")
    gitignore = read_text(repo_root / ".gitignore")
    required = [
        ("docs/maintainer-workflow.md", "只在 PR comment 中展示"),
        ("docs/maintainer-workflow.md", "不进入 `submissions-data.js`"),
        ("docs/maintainer-workflow.md", "不要把这些文件写入参赛者投稿目录"),
        (".gitignore", ".maintainer-review/"),
        (".gitignore", "docs/reviews/"),
    ]
    missing = []
    for rel, snippet in required:
        haystack = workflow_doc if rel == "docs/maintainer-workflow.md" else gitignore
        if snippet not in haystack:
            missing.append({"path": rel, "missing": snippet})

    public_hits = []
    for rel in ["index.html", "submissions.html"]:
        text = read_text(repo_root / rel)
        for marker in PUBLIC_REVIEW_ARTIFACT_MARKERS:
            if marker in text:
                public_hits.append({"path": rel, "marker": marker})

    ok = not missing and not public_hits
    add_check(
        checks,
        "review_results_comment_only",
        ok,
        "Maintainer review artifacts are local-only and PR-comment-only."
        if ok
        else "Maintainer review artifacts could leak into public display.",
        {"missing_required_text": missing, "public_hits": public_hits} if not ok else None,
    )


def check_gallery_status_only(repo_root: Path, checks: list[dict[str, Any]]) -> None:
    text = read_text(repo_root / "submissions.html")
    required = ["formal_review_ready", "intake_provisional", "PR comment", "不展示维护者审核正文"]
    missing = [snippet for snippet in required if snippet not in text]
    add_check(
        checks,
        "gallery_status_only",
        not missing,
        "Gallery explains status only; review details stay in PR comments."
        if not missing
        else "Gallery status-only explanation is incomplete.",
        missing or None,
    )


def check_github_settings_doc(repo_root: Path, checks: list[dict[str, Any]]) -> None:
    text = read_text(repo_root / "docs" / "github-settings.md")
    required = [
        "公开前 checklist",
        "submission-validation",
        "Require status checks to pass before merging",
        "CODEOWNERS",
        "Fork PR",
        "generate_submissions_data.py",
        "gallery-publication.json",
    ]
    missing = [snippet for snippet in required if snippet not in text]
    add_check(
        checks,
        "github_settings_documented",
        not missing,
        "GitHub launch settings are documented." if not missing else "GitHub launch settings are incomplete.",
        missing or None,
    )


def build_report(repo_root: Path) -> dict[str, Any]:
    checks: list[dict[str, Any]] = []
    check_required_docs(repo_root, checks)
    check_activity_open(repo_root, checks)
    check_generated_data(repo_root, checks)
    check_source_registry(repo_root, checks)
    check_boundary_language(repo_root, checks)
    check_workflow_trusted_base(repo_root, checks)
    check_pr_template(repo_root, checks)
    check_review_comment_only(repo_root, checks)
    check_gallery_status_only(repo_root, checks)
    check_github_settings_doc(repo_root, checks)
    return {
        "ok": all(item["ok"] for item in checks),
        "check_count": len(checks),
        "checks": checks,
    }


def print_markdown(report: dict[str, Any]) -> None:
    status = "PASS" if report["ok"] else "FAIL"
    print(f"# Prelaunch Check: {status}\n")
    for item in report["checks"]:
        marker = "PASS" if item["ok"] else "FAIL"
        print(f"- **{marker}** `{item['name']}`: {item['message']}")
        if not item["ok"] and item.get("details") is not None:
            print(f"  - details: `{json.dumps(item['details'], ensure_ascii=False)}`")


def main() -> int:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--repo-root",
        default=".",
        help="Repository root directory (default: current working directory)",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Emit machine-readable JSON instead of Markdown",
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    report = build_report(repo_root)
    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print_markdown(report)
    return 0 if report["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
