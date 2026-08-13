#!/usr/bin/env python3
"""Generate a local formal scoring scorecard template.

This script does not score submissions automatically. It only prepares a
structured scorecard after the maintainer gate has confirmed that a package can
enter formal professional scoring.

The script runs the maintainer gate (``maintainer_review.py``) first. If the
gate returns ``formal-review-ready``, the scorecard status is set to ``draft``
and professional scorers can fill it in.  Otherwise the status is ``blocked``
and the scorecard is not eligible for professional scoring until the
participant resolves the reported blockers.

Output files (written to ``--out``, default ``.maintainer-review/<slug>/formal-scorecard/``)
--------------------------------------------------------------------------------------------
- ``formal-scorecard.json`` — structured scorecard template with seven
  dimensions, weights, and empty score/reason fields for expert panel
- ``formal-scorecard-comment.md`` — PR comment template for posting the
  final scores

Seven scoring dimensions and weights
-------------------------------------
- ``brief_alignment`` — 任务书相关性 (20 %)
- ``originality`` — 原创性 (10 %)
- ``ai_planning_innovation`` — AI 与城市规划创新性 (15 %)
- ``implementation_feasibility`` — 可实施性 (20 %)
- ``public_interest_inclusion`` — 公共利益与包容性 (10 %)
- ``risk_compliance`` — 风险与合规意识 (10 %)
- ``expression_completeness`` — 表达完整度 (15 %)

Usage
-----
Generate the scorecard template::

    python3 scripts/generate_formal_scorecard.py submissions/<login>/<slug> \\
        --pr-author <login>

Print the PR comment template::

    python3 scripts/generate_formal_scorecard.py submissions/<login>/<slug> \\
        --pr-author <login> --comment

Machine-readable JSON output::

    python3 scripts/generate_formal_scorecard.py submissions/<login>/<slug> \\
        --pr-author <login> --json

Exit code is 0 when ``scoring_status`` is ``draft`` and 1 when ``blocked``.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

from maintainer_review import run_maintainer_review
from review_submission import RUBRIC_DIMENSIONS


DEFAULT_OUTPUT_ROOT = ".maintainer-review"
FORMAL_SCORECARD_SCHEMA_PATH = "brief/site-package/schemas/formal_scorecard.schema.json"
DIMENSION_WEIGHTS = {
    "brief_alignment": 20,
    "originality": 10,
    "ai_planning_innovation": 15,
    "implementation_feasibility": 20,
    "public_interest_inclusion": 10,
    "risk_compliance": 10,
    "expression_completeness": 15,
}


def relpath(path: Path, root: Path) -> str:
    try:
        return path.resolve().relative_to(root.resolve()).as_posix()
    except ValueError:
        return path.resolve().as_posix()


def build_dimension_rows() -> list[dict[str, Any]]:
    rows = []
    for dimension in RUBRIC_DIMENSIONS:
        dimension_id = dimension["dimension_id"]
        rows.append(
            {
                "dimension_id": dimension_id,
                "dimension_zh": dimension["title_zh"],
                "weight_percent": DIMENSION_WEIGHTS[dimension_id],
                "score_0_to_5": None,
                "weighted_score_100": None,
                "score_reason_zh": "",
                "evidence_refs": [],
                "risks_zh": [],
                "panel_followups_zh": [],
            }
        )
    return rows


def build_comment(scorecard: dict[str, Any]) -> str:
    lines = [
        "# Formal Professional Scorecard",
        "",
        f"Submission: `{scorecard['submission_dir']}`",
        f"Scoring status: **{scorecard['scoring_status']}**",
        f"Maintainer gate: **{scorecard['eligibility_gate']['maintainer_recommendation']}**",
        f"Can enter formal professional scoring: **{'YES' if scorecard['eligibility_gate']['can_enter_formal_review'] else 'NO'}**",
        "",
    ]
    if scorecard["scoring_status"] == "blocked":
        lines.extend(
            [
                "Formal scoring is blocked. Do not assign professional scores until the maintainer gate returns `formal-review-ready`.",
                "",
                "Required action:",
                f"- {scorecard['eligibility_gate']['summary_zh']}",
            ]
        )
    else:
        lines.extend(
            [
                "This package is eligible for formal professional scoring. Fill `formal-scorecard.json` locally, then copy the final PR comment summary if the panel wants to notify the contributor.",
                "",
                "## Dimensions",
            ]
        )
        for row in scorecard["dimensions"]:
            lines.append(f"- {row['dimension_zh']} (`{row['dimension_id']}`): {row['weight_percent']}%")
        lines.extend(
            [
                "",
                "Scores are 0-5 per dimension. The weighted total is out of 100.",
            ]
        )
    return "\n".join(lines) + "\n"


def build_scorecard(summary: dict[str, Any]) -> dict[str, Any]:
    ready = bool(summary.get("can_enter_formal_review"))
    recommendation = summary.get("recommendation", "request-changes")
    scoring_status = "draft" if ready and recommendation == "formal-review-ready" else "blocked"
    if scoring_status == "draft":
        gate_summary = "维护者 gate 已确认该方案可进入正式专业评分；请由专家组填写评分、证据引用和分歧意见。"
    else:
        gate_summary = "维护者 gate 尚未确认 formal-review-ready；请修复参与者可控制的校验问题。组织方缺少正式边界数据本身不得阻断评分。"
    return {
        "schema_version": "0.1.0",
        "submission_dir": summary["submission_dir"],
        "scoring_status": scoring_status,
        "eligibility_gate": {
            "maintainer_recommendation": recommendation,
            "can_enter_formal_review": ready,
            "summary_zh": gate_summary,
        },
        "reviewer_panel": [
            {"role_zh": "城市规划/城市设计专家", "name_or_org": None, "notes_zh": None},
            {"role_zh": "建筑与公共空间专家", "name_or_org": None, "notes_zh": None},
            {"role_zh": "交通/市政/实施专家", "name_or_org": None, "notes_zh": None},
            {"role_zh": "AI 产业与运营专家", "name_or_org": None, "notes_zh": None},
        ],
        "dimensions": build_dimension_rows(),
        "total_weighted_score_100": None,
        "recommendation_after_scoring": None,
        "panel_notes_zh": "",
        "pr_comment_markdown": "",
    }


def run_formal_scorecard(repo_root: Path, submission_dir: Path, pr_author: str, out_dir: Path) -> dict[str, Any]:
    summary = run_maintainer_review(repo_root, submission_dir, pr_author, out_dir)
    scorecard = build_scorecard(summary)
    scorecard["pr_comment_markdown"] = build_comment(scorecard)
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "formal-scorecard.json").write_text(
        json.dumps(scorecard, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (out_dir / "formal-scorecard-comment.md").write_text(scorecard["pr_comment_markdown"], encoding="utf-8")
    return scorecard


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
        help="Output directory for scorecard artifacts (default: .maintainer-review/<slug>/formal-scorecard)",
    )
    parser.add_argument(
        "--comment",
        action="store_true",
        help="Print formal-scorecard-comment.md content to stdout",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Print machine-readable JSON scorecard to stdout",
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
        out_dir = repo_root / DEFAULT_OUTPUT_ROOT / submission_dir.name / "formal-scorecard"

    scorecard = run_formal_scorecard(repo_root, submission_dir, args.pr_author, out_dir)
    if args.json:
        print(json.dumps(scorecard, ensure_ascii=False, indent=2))
    elif args.comment:
        print(scorecard["pr_comment_markdown"], end="")
    else:
        print(out_dir)
        print(f"scorecard: {out_dir / 'formal-scorecard.json'}")
        print(f"status: {scorecard['scoring_status']}")
    return 0 if scorecard["scoring_status"] == "draft" else 1


if __name__ == "__main__":
    raise SystemExit(main())
