#!/usr/bin/env python3
"""Run contributor-facing pre-submit checks for an AI urban design package."""

from __future__ import annotations

import argparse
import importlib.util
import json
import subprocess
import sys
from pathlib import Path
from typing import Any


REVIEW_DEPENDENCIES = ("shapely", "pyproj", "jsonschema")
INSTALL_HINT = "python3 -m pip install -r requirements-review.txt"
SCRIPT_DIR = Path(__file__).resolve().parent


def script_path(repo_root: Path, name: str) -> Path:
    # Keep every subprocess on the same trusted validator version as this
    # entrypoint.  repo_root may be an untrusted or older PR checkout.
    return SCRIPT_DIR / name


def run_json_command(command: list[str]) -> dict[str, Any]:
    completed = subprocess.run(command, capture_output=True, text=True, check=False)
    parsed: Any = {}
    if completed.stdout.strip():
        try:
            parsed = json.loads(completed.stdout)
        except json.JSONDecodeError:
            parsed = {"raw_stdout": completed.stdout}
    return {
        "returncode": completed.returncode,
        "ok": completed.returncode == 0,
        "stdout": parsed,
        "stderr": completed.stderr.strip(),
    }


def missing_review_dependencies() -> list[str]:
    return [name for name in REVIEW_DEPENDENCIES if importlib.util.find_spec(name) is None]


def infer_stage(validation_result: dict[str, Any], submission_dir: Path) -> str:
    stages = validation_result.get("stdout", {}).get("ai_package_stages", {})
    if isinstance(stages, dict):
        for stage in stages.values():
            if stage == "formal":
                return stage
    manifest_path = submission_dir / "manifest.json"
    if manifest_path.exists():
        try:
            stage = json.loads(manifest_path.read_text(encoding="utf-8")).get("submission_stage")
        except (UnicodeDecodeError, json.JSONDecodeError):
            return "unknown"
        if stage == "formal":
            return stage
    return "unknown"


def spatial_issue_ids(spatial_result: dict[str, Any]) -> list[str]:
    stdout = spatial_result.get("stdout")
    if not isinstance(stdout, dict):
        return []
    issues = stdout.get("issues")
    if not isinstance(issues, list):
        return []
    ids = []
    for issue in issues:
        if isinstance(issue, dict) and issue.get("check_id"):
            ids.append(str(issue["check_id"]))
    return ids


def visual_issue_ids(visual_result: dict[str, Any]) -> list[str]:
    stdout = visual_result.get("stdout")
    if not isinstance(stdout, dict):
        return []
    issues = stdout.get("issues")
    if not isinstance(issues, list):
        return []
    ids = []
    for issue in issues:
        if isinstance(issue, dict) and issue.get("check_id"):
            ids.append(str(issue["check_id"]))
    return ids


def professional_issue_ids(professional_result: dict[str, Any]) -> list[str]:
    stdout = professional_result.get("stdout")
    if not isinstance(stdout, dict):
        return []
    issues = stdout.get("issues")
    if not isinstance(issues, list):
        return []
    ids = []
    for issue in issues:
        if isinstance(issue, dict) and issue.get("check_id"):
            ids.append(str(issue["check_id"]))
    return ids


def next_actions(report: dict[str, Any]) -> list[str]:
    actions: list[str] = []
    missing = report.get("missing_review_dependencies") or []
    if missing:
        actions.append(f"Install review dependencies: {INSTALL_HINT}")

    deterministic = report.get("deterministic_validation", {})
    stdout = deterministic.get("stdout") if isinstance(deterministic, dict) else {}
    reported_errors = bool(isinstance(stdout, dict) and stdout.get("errors"))
    if isinstance(stdout, dict):
        for error in stdout.get("errors", []) or []:
            actions.append(f"Fix deterministic validation error: {error}")
        for warning in stdout.get("warnings", []) or []:
            if "cannot enter formal" in warning or "non-official" in warning:
                actions.append(f"Resolve formal-readiness warning: {warning}")
            elif any(
                marker in warning
                for marker in [
                    "display counterpart",
                    "bilingual",
                    "translation_of",
                    "front matter should set language",
                ]
            ):
                actions.append(f"Add recommended bilingual display material (non-blocking): {warning}")
    # Surface a hard crash (non-zero exit with no parsed errors), e.g. the
    # submission directory living outside the repo root.
    if isinstance(deterministic, dict) and not deterministic.get("ok") and not reported_errors:
        stderr = str(deterministic.get("stderr") or "").strip()
        if stderr:
            actions.append(f"Fix deterministic validation error: {stderr}")

    spatial = report.get("spatial_review", {})
    spatial_stdout = spatial.get("stdout") if isinstance(spatial, dict) else {}
    if isinstance(spatial_stdout, dict):
        for issue in spatial_stdout.get("issues", []) or []:
            if not isinstance(issue, dict):
                continue
            severity = issue.get("severity")
            if severity in {"blocking", "major"}:
                check_id = issue.get("check_id", "SPATIAL_ISSUE")
                message = issue.get("message", "")
                actions.append(f"Repair spatial issue {check_id}: {message}")

    visual = report.get("visual_review", {})
    visual_stdout = visual.get("stdout") if isinstance(visual, dict) else {}
    if isinstance(visual_stdout, dict):
        for issue in visual_stdout.get("issues", []) or []:
            if not isinstance(issue, dict):
                continue
            severity = issue.get("severity")
            if severity in {"blocking", "major"}:
                check_id = issue.get("check_id", "VISUAL_ISSUE")
                message = issue.get("message", "")
                actions.append(f"Repair visual issue {check_id}: {message}")

    professional = report.get("professional_review", {})
    professional_stdout = professional.get("stdout") if isinstance(professional, dict) else {}
    if isinstance(professional_stdout, dict):
        for issue in professional_stdout.get("issues", []) or []:
            if not isinstance(issue, dict):
                continue
            severity = issue.get("severity")
            if severity in {"blocking", "major"}:
                check_id = issue.get("check_id", "PROFESSIONAL_ISSUE")
                message = issue.get("message", "")
                actions.append(f"Repair professional evidence issue {check_id}: {message}")

    return actions


def can_enter_formal_review(stage: str, report: dict[str, Any]) -> bool:
    # Organizer-supplied geometry gaps must not disqualify an otherwise valid
    # package. Provisional geometry remains prominently disclosed and may limit
    # precision, but eligibility is based on participant-controlled checks.
    return stage == "formal" and bool(report.get("ok"))


def build_self_check(repo_root: Path, submission_dir: Path, pr_author: str) -> dict[str, Any]:
    repo_root = repo_root.resolve()
    submission_dir = submission_dir.resolve()
    validation = run_json_command(
        [
            sys.executable,
            str(script_path(repo_root, "validate_local_submission.py")),
            str(submission_dir),
            "--repo-root",
            str(repo_root),
            "--pr-author",
            pr_author,
            "--json",
        ]
    )
    stage = infer_stage(validation, submission_dir)
    missing = missing_review_dependencies()
    if missing:
        spatial = {
            "returncode": 2,
            "ok": False,
            "stdout": {},
            "stderr": f"Missing review dependencies: {', '.join(missing)}. Install with: {INSTALL_HINT}",
        }
    else:
        spatial = run_json_command(
            [
                sys.executable,
                str(script_path(repo_root, "spatial_review.py")),
                str(submission_dir),
                "--repo-root",
                str(repo_root),
                "--json",
            ]
        )
    visual = run_json_command(
        [
            sys.executable,
            str(script_path(repo_root, "visual_review.py")),
            str(submission_dir),
            "--json",
        ]
    )
    professional = run_json_command(
        [
            sys.executable,
            str(script_path(repo_root, "professional_review.py")),
            str(submission_dir),
            "--repo-root",
            str(repo_root),
            "--json",
        ]
    )

    report: dict[str, Any] = {
        "ok": bool(validation["ok"] and spatial["ok"] and visual["ok"] and professional["ok"]),
        "submission_dir": str(submission_dir.relative_to(repo_root)) if submission_dir.is_relative_to(repo_root) else str(submission_dir),
        "pr_author": pr_author,
        "stage": stage,
        "deterministic_validation": validation,
        "spatial_review": spatial,
        "visual_review": visual,
        "professional_review": professional,
        "spatial_issue_ids": spatial_issue_ids(spatial),
        "visual_issue_ids": visual_issue_ids(visual),
        "professional_issue_ids": professional_issue_ids(professional),
        "missing_review_dependencies": missing,
    }
    report["can_enter_formal_review"] = can_enter_formal_review(stage, report)
    report["package_type"] = "professional_design_package" if stage == "formal" else "unknown"
    report["review_status"] = "formal-review-ready" if report["can_enter_formal_review"] else "revision-requested"
    report["next_actions"] = next_actions(report)
    return report


def format_markdown(report: dict[str, Any]) -> str:
    lines = ["# Submission self-check", ""]
    lines.append(f"Result: {'PASS' if report.get('ok') else 'FAIL'}")
    lines.append(f"Package type: {report.get('package_type')}")
    lines.append(f"Review status: {report.get('review_status')}")
    lines.append(f"Can enter formal review: {'YES' if report.get('can_enter_formal_review') else 'NO'}")
    deterministic = report.get("deterministic_validation", {})
    spatial = report.get("spatial_review", {})
    visual = report.get("visual_review", {})
    professional = report.get("professional_review", {})
    lines.append(f"Deterministic validation: {'PASS' if deterministic.get('ok') else 'FAIL'}")
    lines.append(f"Spatial review: {'PASS' if spatial.get('ok') else 'FAIL'}")
    lines.append(f"Visual packaging check: {'PASS' if visual.get('ok') else 'FAIL'}")
    lines.append(f"Professional evidence review: {'PASS' if professional.get('ok') else 'FAIL'}")
    if report.get("missing_review_dependencies"):
        lines.extend(["", "Missing review dependencies:"])
        lines.extend(f"- `{item}`" for item in report["missing_review_dependencies"])
        lines.append(f"- Install with: `{INSTALL_HINT}`")
    if report.get("spatial_issue_ids"):
        lines.extend(["", "Spatial issues:"])
        lines.extend(f"- `{item}`" for item in report["spatial_issue_ids"])
    if report.get("visual_issue_ids"):
        lines.extend(["", "Visual issues:"])
        lines.extend(f"- `{item}`" for item in report["visual_issue_ids"])
    if report.get("next_actions"):
        lines.extend(["", "Next actions:"])
        lines.extend(f"- {item}" for item in report["next_actions"])
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("submission_dir")
    parser.add_argument("--pr-author", required=True)
    parser.add_argument("--repo-root", default=".")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    repo_root = Path(args.repo_root)
    submission_dir = Path(args.submission_dir)
    if not submission_dir.is_absolute():
        submission_dir = repo_root / submission_dir

    report = build_self_check(repo_root, submission_dir, args.pr_author)
    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print(format_markdown(report))
    return 0 if report["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
