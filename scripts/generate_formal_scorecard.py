#!/usr/bin/env python3
"""Generate a local formal scoring scorecard template.

This script does not score submissions automatically. It only prepares a
structured scorecard after the maintainer gate has confirmed that a package can
enter formal professional scoring.
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
    parser = argparse.ArgumentParser()
    parser.add_argument("submission_dir")
    parser.add_argument("--repo-root", default=".")
    parser.add_argument("--pr-author", required=True)
    parser.add_argument("--out")
    parser.add_argument("--comment", action="store_true", help="Print formal-scorecard-comment.md content to stdout")
    parser.add_argument("--json", action="store_true")
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
