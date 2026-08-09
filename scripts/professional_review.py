#!/usr/bin/env python3
"""Review professional standard/depth evidence for a formal submission.

This script is dependency-free. It summarizes the evidence chain that makes
`proposal.md` human-readable while keeping JSON/GeoJSON as machine evidence.
"""

from __future__ import annotations

import argparse
import json
import math
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
TABLE_NUMBER_RE = re.compile(
    r"(?P<number>[+-]?(?:\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?))\s*"
    r"(?P<unit>km²|km2|m²|sqm|ha|公顷|平方公里|平方千米|公里|米|km|m|㎡|%|％|ratio|比例|个|处|项)?",
    re.IGNORECASE,
)

# These aliases are intentionally limited to unambiguous metric-table labels.
# The checker does not interpret arbitrary prose or unlabeled numbers.
METRIC_TABLE_ALIASES: dict[str, tuple[str, ...]] = {
    "site_area_sqm": ("范围面积", "site area", "overall design area"),
    "green_ratio": ("绿地率", "green ratio"),
    "public_space_ratio": ("公共空间比例", "public-space ratio", "public space ratio"),
    "building_footprint_area_sqm": ("建筑基底面积", "building footprint area"),
    "road_network_length_m": ("道路网络长度", "road network length"),
    "heritage_spine_length_m": ("双轨慢行主脊长度", "heritage spine length", "slow-mobility spine length"),
    "second_line_length_m": ("AI智轨复线长度", "AI smart-line length", "second-line length"),
    "ai_scenario_node_count": ("AI场景节点数", "AI scenario node count"),
    "ai_service_zone_count": ("AI服务区数量", "AI service-zone count"),
    "renewal_project_count": ("更新项目数量", "renewal project count"),
    "building_count": ("建筑数量", "building count"),
    "land_use_parcel_count": ("用地分区数量", "land-use parcel count"),
    "floor_area_ratio": ("容积率", "floor area ratio", "FAR"),
    "building_height_m": ("建筑高度", "building height"),
    "building_density": ("建筑密度", "building density"),
}


@dataclass(frozen=True)
class ProposalMetricClaim:
    metric_id: str
    raw_value: str
    value: float
    unit: str
    line_number: int


def _parse_table_value(value_cell: str) -> tuple[float, str] | None:
    """Parse one unambiguous numeric value from a metric table value cell."""
    # Ranges and compound values are deliberately left to human review rather
    # than guessed from their first number.
    if re.search(r"\d\s*(?:-|–|—|至|到)\s*\d", value_cell):
        return None
    match = TABLE_NUMBER_RE.search(value_cell)
    if not match:
        return None
    try:
        number = float(match.group("number").replace(",", ""))
    except ValueError:
        return None
    if not math.isfinite(number):
        return None
    return number, (match.group("unit") or "").casefold()


def extract_proposal_metric_claims(text: str) -> list[ProposalMetricClaim]:
    """Extract only explicit metric-table rows with a known display alias."""
    claims: list[ProposalMetricClaim] = []
    for line_number, line in enumerate(text.splitlines(), start=1):
        if line.count("|") < 2 or re.match(r"^\s*\|?\s*:?-{3,}", line):
            continue
        cells = [cell.strip().strip("`*") for cell in line.strip().strip("|").split("|")]
        if len(cells) < 2:
            continue
        label = cells[0].casefold()
        parsed = _parse_table_value(cells[1])
        if parsed is None:
            continue
        value, unit = parsed
        for metric_id, aliases in METRIC_TABLE_ALIASES.items():
            if any(alias.casefold() in label for alias in aliases):
                claims.append(
                    ProposalMetricClaim(
                        metric_id=metric_id,
                        raw_value=cells[1],
                        value=value,
                        unit=unit,
                        line_number=line_number,
                    )
                )
                break
    return claims


def _metric_value_in_base_units(claim: ProposalMetricClaim, metric: dict[str, Any]) -> float:
    """Convert a displayed table value using its explicit unit."""
    unit = claim.unit
    value = claim.value
    target = str(metric.get("unit", "")).casefold()
    if unit in {"%", "％"} and target in {"ratio", "比例"}:
        return value / 100
    if unit in {"km", "公里"} and target in {"m", "米"}:
        return value * 1000
    if unit in {"ha", "公顷"} and target in {"sqm", "m²", "㎡"}:
        return value * 10000
    if unit in {"km²", "km2", "平方公里", "平方千米"} and target in {"sqm", "m²", "㎡"}:
        return value * 1_000_000
    return value


def validate_proposal_metric_table_claims(
    report: ProfessionalReport,
    target_file: str,
    text: str,
    metrics: dict[str, Any],
) -> None:
    """Reject explicit table values that contradict the machine metric ledger."""
    for claim in extract_proposal_metric_claims(text):
        metric = metrics.get(claim.metric_id)
        if not isinstance(metric, dict):
            continue
        status = metric.get("status")
        if status in {"unknown", "not_applicable"}:
            report.add(
                "PROPOSAL_UNKNOWN_METRIC_NUMERIC_CLAIM",
                "major",
                target_file,
                f"line {claim.line_number}: `{claim.metric_id}` is {status!r} in metrics.json but the table displays `{claim.raw_value}`; use an explicit non-numeric pending label.",
            )
            continue
        if status != "known" or not isinstance(metric.get("value"), (int, float)):
            continue
        expected = float(metric["value"])
        actual = _metric_value_in_base_units(claim, metric)
        tolerance = max(abs(expected) * 0.01, 0.01)
        if abs(actual - expected) > tolerance:
            report.add(
                "PROPOSAL_METRIC_VALUE_MISMATCH",
                "major",
                target_file,
                f"line {claim.line_number}: table value `{claim.raw_value}` for `{claim.metric_id}` resolves to {actual:g}, but metrics.json says {expected:g}; regenerate the narrative from the final metric ledger.",
            )


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
    if isinstance(metric_items, dict):
        validate_proposal_metric_table_claims(report, "proposal.md", proposal_text, metric_items)
        english_proposal_path = submission_dir / "proposal.en.md"
        if english_proposal_path.exists():
            try:
                english_proposal_text = english_proposal_path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                english_proposal_text = ""
            validate_proposal_metric_table_claims(
                report,
                "proposal.en.md",
                english_proposal_text,
                metric_items,
            )
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
    parser = argparse.ArgumentParser()
    parser.add_argument("submission_dir")
    parser.add_argument("--repo-root", default=".")
    parser.add_argument("--json", action="store_true")
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
