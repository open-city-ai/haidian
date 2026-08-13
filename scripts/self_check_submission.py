#!/usr/bin/env python3
"""Run contributor-facing pre-submit checks for an AI urban design package.

This is the four-gate self-check that every participant must pass before
opening a pull request.  It orchestrates four independent validators and
writes the result into ``self_check.json`` when ``--mark-self-checked`` is
supplied.

Four gates
----------
1. **DETERMINISTIC_VALIDATION** — ``validate_local_submission.py``: checks
   file scope, bilingual contract, manifest hashes, proposal structure, and
   PII risk patterns.  This gate runs without optional dependencies.
2. **SPATIAL_REVIEW** — ``spatial_review.py``: validates GeoJSON topology,
   coordinate system, area coverage, and metric reproducibility.  Requires
   ``shapely`` and ``pyproj``; install with ``requirements-review.txt``.
3. **VISUAL_PACKAGING** — ``visual_review.py``: validates ``visual/index.html``
   offline constraints, data-attribute metric matching, and forbidden network
   patterns.
4. **PROFESSIONAL_EVIDENCE** — ``professional_review.py``: validates
   ``standard_matrix.json``, ``design_depth_matrix.json``,
   ``compliance_matrix.json``, and source coverage.

Usage
-----
Dry run (advisory output only)::

    python3 scripts/self_check_submission.py submissions/<login>/<slug> \\
        --pr-author <login>

Write the four-gate report into ``self_check.json`` and update
``manifest.json``::

    python3 scripts/self_check_submission.py submissions/<login>/<slug> \\
        --pr-author <login> --mark-self-checked --json

Pass ``--json`` to get machine-readable output.  The exit code is 0 when all
four gates pass and 1 otherwise.

Install review dependencies before running gates 2–4::

    python3 -m pip install -r requirements-review.txt

After ``--mark-self-checked`` completes successfully, open the pull request.
Any subsequent file edit invalidates the self-check; re-run with
``--mark-self-checked`` before pushing the update.
"""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Any

from validate_submission import PERSISTED_READINESS_CONTRACT


REVIEW_DEPENDENCIES = ("shapely", "pyproj", "jsonschema")
INSTALL_HINT = "python3 -m pip install -r requirements-review.txt"
SCRIPT_DIR = Path(__file__).resolve().parent


def script_path(repo_root: Path, name: str) -> Path:
    # Keep every subprocess on the same trusted validator version as this
    # entrypoint.  repo_root may be an untrusted or older PR checkout.
    return SCRIPT_DIR / name


def run_json_command(command: list[str]) -> dict[str, Any]:
    # Validator subprocesses emit UTF-8 JSON and often include Chinese
    # diagnostics.  Do not let the contributor's Windows code page decide how
    # those bytes are decoded (GBK/cp936 otherwise crashes before a report is
    # produced). Keep the same contract for the complete Python child tree,
    # including validators that invoke another validator.
    environment = os.environ.copy()
    environment["PYTHONUTF8"] = "1"
    environment["PYTHONIOENCODING"] = "utf-8"
    completed = subprocess.run(
        command,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        check=False,
        env=environment,
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


def missing_review_dependencies() -> list[str]:
    """Return the names of optional review dependencies that are not installed."""
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
                actions.append(f"Review legacy bilingual compatibility warning: {warning}")
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


def build_self_check(
    repo_root: Path,
    submission_dir: Path,
    pr_author: str,
    *,
    allow_pending_self_check: bool = False,
) -> dict[str, Any]:
    repo_root = repo_root.resolve()
    submission_dir = submission_dir.resolve()
    validation_command = [
        sys.executable,
        str(script_path(repo_root, "validate_local_submission.py")),
        str(submission_dir),
        "--repo-root",
        str(repo_root),
        "--pr-author",
        pr_author,
        "--json",
    ]
    if allow_pending_self_check:
        validation_command.append("--allow-pending-self-check")
    validation = run_json_command(validation_command)
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


def _self_check_gate_checks(report: dict[str, Any]) -> list[dict[str, str]]:
    gates = [
        ("DETERMINISTIC_VALIDATION", "deterministic_validation", "validate_local_submission.py"),
        ("SPATIAL_REVIEW", "spatial_review", "spatial_review.py"),
        ("VISUAL_PACKAGING", "visual_review", "visual_review.py"),
        ("PROFESSIONAL_EVIDENCE", "professional_review", "professional_review.py"),
    ]
    checks = []
    for check_id, report_key, target in gates:
        gate = report.get(report_key)
        passed = isinstance(gate, dict) and gate.get("ok") is True
        checks.append(
            {
                "check_id": check_id,
                "result": "pass" if passed else "fail",
                "severity": "blocking",
                "target": target,
                "message": f"{report_key}: {'PASS' if passed else 'FAIL'}",
            }
        )
    return checks


def _report_without_pending_warning(report: dict[str, Any]) -> dict[str, Any]:
    """Remove only the temporary pending-claim warning before persisting evidence."""
    persisted = json.loads(json.dumps(report, ensure_ascii=False))
    deterministic = persisted.get("deterministic_validation")
    stdout = deterministic.get("stdout") if isinstance(deterministic, dict) else None
    if isinstance(stdout, dict) and isinstance(stdout.get("warnings"), list):
        stdout["warnings"] = [
            warning
            for warning in stdout["warnings"]
            if not str(warning).endswith("; pending self-check completion")
        ]
    return persisted


def mark_self_checked(submission_dir: Path, report: dict[str, Any]) -> tuple[bool, str]:
    """Persist the passing four-gate report and its manifest claim atomically enough to retry safely."""
    if report.get("can_enter_formal_review") is not True:
        return False, "cannot mark self_checked unless can_enter_formal_review=true"
    manifest_path = submission_dir / "manifest.json"
    self_check_path = submission_dir / "self_check.json"
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        existing_self_check = json.loads(self_check_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError, json.JSONDecodeError) as exc:
        return False, f"cannot read manifest.json or self_check.json: {exc}"
    claim = manifest.get("validation_claim")
    if not isinstance(claim, dict):
        return False, "manifest.json is missing validation_claim"
    if manifest.get("package_state") != "ready_for_review":
        return False, "package_state must be ready_for_review before marking self_checked"
    manifest_files = manifest.get("files")
    self_check_item = None
    if isinstance(manifest_files, list):
        self_check_item = next(
            (
                item
                for item in manifest_files
                if isinstance(item, dict) and item.get("path") == "self_check.json"
            ),
            None,
        )
    if not isinstance(self_check_item, dict):
        return False, "manifest.json does not list self_check.json for hash refresh"

    persisted = _report_without_pending_warning(report)
    schema_version = (
        existing_self_check.get("schema_version")
        if isinstance(existing_self_check, dict)
        else None
    )
    persisted["schema_version"] = schema_version or "0.1.0"
    persisted["checks"] = _self_check_gate_checks(persisted)
    self_check_bytes = (json.dumps(persisted, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    original_manifest = manifest_path.read_bytes()
    original_self_check = self_check_path.read_bytes()
    try:
        self_check_path.write_bytes(self_check_bytes)
        self_check_item["sha256"] = hashlib.sha256(self_check_bytes).hexdigest()
        claim["readiness_contract"] = PERSISTED_READINESS_CONTRACT
        claim["self_checked"] = True
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    except OSError as exc:
        self_check_path.write_bytes(original_self_check)
        manifest_path.write_bytes(original_manifest)
        return False, f"cannot update manifest.json: {exc}"
    return True, ""


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
        "--pr-author",
        required=True,
        help="Exact GitHub login of the PR author; must match the directory owner",
    )
    parser.add_argument(
        "--repo-root",
        default=".",
        help="Repository root directory (default: current working directory)",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Emit machine-readable JSON instead of human-readable Markdown",
    )
    parser.add_argument(
        "--mark-self-checked",
        action="store_true",
        help=(
            "After a passing four-gate check, set manifest.validation_claim.self_checked=true, "
            "write self_check.json, and verify the result; required before opening the PR"
        ),
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root)
    submission_dir = Path(args.submission_dir)
    if not submission_dir.is_absolute():
        submission_dir = repo_root / submission_dir

    report = build_self_check(
        repo_root,
        submission_dir,
        args.pr_author,
        allow_pending_self_check=args.mark_self_checked,
    )
    if args.mark_self_checked:
        if report["ok"]:
            original_manifest = (submission_dir / "manifest.json").read_bytes()
            original_self_check = (submission_dir / "self_check.json").read_bytes()
            marked, error = mark_self_checked(submission_dir, report)
            if not marked:
                report["ok"] = False
                report["review_status"] = "revision-requested"
                report["can_enter_formal_review"] = False
                report.setdefault("next_actions", []).append(error)
                report["self_checked_manifest_updated"] = False
            else:
                verified = build_self_check(repo_root, submission_dir, args.pr_author)
                if verified["ok"]:
                    report = verified
                    report["self_checked_manifest_updated"] = True
                else:
                    try:
                        (submission_dir / "self_check.json").write_bytes(original_self_check)
                        (submission_dir / "manifest.json").write_bytes(original_manifest)
                    except OSError as exc:
                        error = f"; additionally failed to revert persisted evidence: {exc}"
                    else:
                        error = ""
                    report["ok"] = False
                    report["review_status"] = "revision-requested"
                    report["can_enter_formal_review"] = False
                    report.setdefault("next_actions", []).append(
                        "Strict validation failed after persisting self-check evidence; changes were reverted"
                        + error
                    )
                    report["self_checked_manifest_updated"] = False
        else:
            report["self_checked_manifest_updated"] = False
    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print(format_markdown(report))
    return 0 if report["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
