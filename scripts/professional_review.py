#!/usr/bin/env python3
"""Review professional standard/depth evidence for a formal submission.

This script is dependency-free. It summarizes the evidence chain that makes
``proposal.md`` human-readable while keeping JSON/GeoJSON as machine evidence.

Checks performed
----------------
- ``standard_matrix.json`` covers all required professional standard IDs
  loaded from the repository's standard registry.
- ``design_depth_matrix.json`` covers all 15 required design-depth item IDs.
- For v1 proposals: ``proposal.md`` contains inline ``[standard:...]``,
  ``[depth:...]``, ``[data:...]``, and ``[metric:...]`` references for every
  item in the matrices.  (v2 proposals use section-anchored evidence instead;
  exhaustive inline references are not required.)
- ``metrics.json`` is present and parseable.

Usage
-----
Human-readable output::

    python3 scripts/professional_review.py submissions/<login>/<slug>

Machine-readable JSON::

    python3 scripts/professional_review.py submissions/<login>/<slug> --json

This script is gate 4 of the four-gate self-check. It has no optional
dependencies and can run offline in any environment where Python 3.9+ is
available.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from validate_submission import (
    PROPOSAL_FORMAT_VERSION,
    PROPOSAL_READABLE_DATA_REFS,
    REQUIRED_DESIGN_DEPTH_IDS,
    load_required_standard_ids,
    parse_front_matter,
    proposal_format_version,
)


REFERENCE_RE = re.compile(r"\[(source|standard|depth|data|metric):([^\]\s]+)\]")


@dataclass
class ProfessionalIssue:
    check_id: str
    severity: str
    target_file: str
    message: str


@dataclass
class ProfessionalReport:
    ok: bool = True
    issues: list[ProfessionalIssue] = field(default_factory=list)
    summary: dict[str, Any] = field(default_factory=dict)

    def add(self, check_id: str, severity: str, target_file: str, message: str) -> None:
        if severity in {"blocking", "major"}:
            self.ok = False
        self.issues.append(ProfessionalIssue(check_id, severity, target_file, message))

    def to_dict(self) -> dict[str, Any]:
        return {
            "ok": self.ok,
            "issues": [issue.__dict__ for issue in self.issues],
            "summary": self.summary,
        }


def load_json(path: Path, report: ProfessionalReport, label: str) -> Any:
    if not path.exists():
        report.add("PROFESSIONAL_FILE_MISSING", "blocking", label, "Missing required professional evidence file.")
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except UnicodeDecodeError:
        report.add("PROFESSIONAL_ENCODING", "blocking", label, "File must be UTF-8.")
    except json.JSONDecodeError as exc:
        report.add("PROFESSIONAL_JSON", "blocking", label, f"Invalid JSON: {exc.msg} at line {exc.lineno}.")
    return None


def extract_refs(text: str) -> dict[str, set[str]]:
    """Extract all evidence marker IDs from *text* grouped by marker type."""
    refs: dict[str, set[str]] = {"source": set(), "standard": set(), "depth": set(), "data": set(), "metric": set()}
    for kind, value in REFERENCE_RE.findall(text):
        refs[kind].add(value)
    return refs


def collect_ids(data: Any, list_key: str, id_key: str) -> set[str]:
    if not isinstance(data, dict) or not isinstance(data.get(list_key), list):
        return set()
    return {
        str(item[id_key])
        for item in data[list_key]
        if isinstance(item, dict) and isinstance(item.get(id_key), str) and item[id_key]
    }


def data_ref_present(data_refs: set[str], rel_path: str) -> bool:
    return rel_path in data_refs or any(ref.startswith(f"{rel_path}#") for ref in data_refs)


def build_professional_review(repo_root: Path, submission_dir: Path) -> ProfessionalReport:
    report = ProfessionalReport()
    repo_root = repo_root.resolve()
    submission_dir = submission_dir.resolve()

    proposal_path = submission_dir / "proposal.md"
    if not proposal_path.exists():
        report.add("PROPOSAL_MISSING", "blocking", "proposal.md", "proposal.md is the required human-readable main proposal.")
        proposal_text = ""
    else:
        try:
            proposal_text = proposal_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            report.add("PROPOSAL_ENCODING", "blocking", "proposal.md", "proposal.md must be UTF-8.")
            proposal_text = ""

    standard_matrix = load_json(submission_dir / "standard_matrix.json", report, "standard_matrix.json")
    depth_matrix = load_json(submission_dir / "design_depth_matrix.json", report, "design_depth_matrix.json")
    metrics = load_json(submission_dir / "metrics.json", report, "metrics.json")

    metadata, _ = parse_front_matter(proposal_text)
    format_version = proposal_format_version(metadata)
    refs = extract_refs(proposal_text)
    required_standard_ids = load_required_standard_ids(repo_root)
    matrix_standard_ids = collect_ids(standard_matrix, "standards", "standard_id")
    missing_standard_matrix = sorted(required_standard_ids - matrix_standard_ids)
    if missing_standard_matrix:
        report.add(
            "STANDARD_MATRIX_COVERAGE",
            "major",
            "standard_matrix.json",
            f"Missing required standard responses: {', '.join(missing_standard_matrix)}.",
        )
    if format_version != PROPOSAL_FORMAT_VERSION:
        for standard_id in sorted(matrix_standard_ids):
            if standard_id not in refs["standard"]:
                report.add("STANDARD_PROPOSAL_REF", "major", "proposal.md", f"Missing [standard:{standard_id}] reference.")

    matrix_depth_ids = collect_ids(depth_matrix, "items", "item_id")
    missing_depth = sorted(REQUIRED_DESIGN_DEPTH_IDS - matrix_depth_ids)
    if missing_depth:
        report.add(
            "DESIGN_DEPTH_COVERAGE",
            "major",
            "design_depth_matrix.json",
            f"Missing required design depth items: {', '.join(missing_depth)}.",
        )
    if format_version != PROPOSAL_FORMAT_VERSION:
        for item_id in sorted(matrix_depth_ids):
            if item_id not in refs["depth"]:
                report.add("DEPTH_PROPOSAL_REF", "major", "proposal.md", f"Missing [depth:{item_id}] reference.")

    if format_version != PROPOSAL_FORMAT_VERSION:
        for rel_path in sorted(PROPOSAL_READABLE_DATA_REFS):
            if not data_ref_present(refs["data"], rel_path):
                report.add("DATA_PROPOSAL_REF", "major", "proposal.md", f"Missing [data:{rel_path}#...] reference.")

    metric_items = metrics.get("metrics") if isinstance(metrics, dict) else {}
    known_metric_ids = {
        name
        for name, value in metric_items.items()
        if isinstance(value, dict) and value.get("status") == "known"
    } if isinstance(metric_items, dict) else set()
    if format_version != PROPOSAL_FORMAT_VERSION:
        for metric_id in sorted(known_metric_ids):
            if metric_id not in refs["metric"]:
                report.add("METRIC_PROPOSAL_REF", "major", "proposal.md", f"Missing [metric:{metric_id}] reference.")

    report.summary = {
        "standard_matrix_items": len(matrix_standard_ids),
        "design_depth_items": len(matrix_depth_ids),
        "known_metric_refs_required": len(known_metric_ids),
        "proposal_format_version": format_version,
        "evidence_contract": "section-anchors-plus-structured-audit" if format_version == PROPOSAL_FORMAT_VERSION else "legacy-exhaustive-inline",
        "proposal_reference_counts": {kind: len(values) for kind, values in refs.items()},
    }
    return report


def format_markdown(report: ProfessionalReport) -> str:
    lines = ["# Professional evidence review", ""]
    lines.append(f"Result: {'PASS' if report.ok else 'FAIL'}")
    if report.summary:
        lines.append("")
        lines.append("Summary:")
        for key, value in report.summary.items():
            lines.append(f"- {key}: {value}")
    if report.issues:
        lines.append("")
        lines.append("Issues:")
        for issue in report.issues:
            lines.append(f"- [{issue.severity}] {issue.check_id} `{issue.target_file}`: {issue.message}")
    return "\n".join(lines)


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
        "--json",
        action="store_true",
        help="Emit machine-readable JSON instead of human-readable Markdown",
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root)
    submission_dir = Path(args.submission_dir)
    if not submission_dir.is_absolute():
        submission_dir = repo_root / submission_dir
    report = build_professional_review(repo_root, submission_dir)
    if args.json:
        print(json.dumps(report.to_dict(), ensure_ascii=False, indent=2))
    else:
        print(format_markdown(report))
    return 0 if report.ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
