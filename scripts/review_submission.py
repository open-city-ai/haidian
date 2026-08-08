#!/usr/bin/env python3
"""Prepare an AI review packet for a structured urban design submission.

This script does not call a model. It produces deterministic inputs and a prompt
that maintainers can pass to an external model or review agent.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path
from typing import Any

from source_registry_utils import load_source_registry, summarize_source_registry
from validate_submission import validate_submission


RUBRIC_DIMENSIONS = [
    {
        "dimension_id": "brief_alignment",
        "title_zh": "任务书相关性",
        "review_focus_zh": "是否围绕百年京张 AI 创新带、三层范围、三大重点片区和公告 1.5 任务展开。",
    },
    {
        "dimension_id": "originality",
        "title_zh": "原创性",
        "review_focus_zh": "是否提出清晰的新概念、新机制或新场景，避免空泛拼贴。",
    },
    {
        "dimension_id": "ai_planning_innovation",
        "title_zh": "AI 与城市规划创新性",
        "review_focus_zh": "是否把 AI 能力与产业、空间、交通、公共服务、文化和治理结合。",
    },
    {
        "dimension_id": "implementation_feasibility",
        "title_zh": "可实施性",
        "review_focus_zh": "是否有阶段路径、试点区域、参与主体、指标和可核验数据边界。",
    },
    {
        "dimension_id": "public_interest_inclusion",
        "title_zh": "公共利益与包容性",
        "review_focus_zh": "是否兼顾居民、青年人才、企业、高校、游客和弱势群体。",
    },
    {
        "dimension_id": "risk_compliance",
        "title_zh": "风险与合规意识",
        "review_focus_zh": "是否尊重公开资料边界、隐私、版权和政策不确定性。",
    },
    {
        "dimension_id": "expression_completeness",
        "title_zh": "表达完整度",
        "review_focus_zh": "是否形成可读正文、图纸、HTML、指标、图层和证据引用的完整闭环。",
    },
]
DIMENSIONS = [dimension["title_zh"] for dimension in RUBRIC_DIMENSIONS]
SCRIPT_DIR = Path(__file__).resolve().parent
DEFAULT_OUTPUT_ROOT = ".maintainer-review"
ADVISORY_REVIEW_SCHEMA_PATH = "brief/site-package/schemas/advisory_review.schema.json"


def read_text(path: Path) -> str:
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")


def read_json(path: Path) -> Any:
    if not path.exists():
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        return {"_error": f"invalid JSON: {exc}"}


def discover_files(submission_dir: Path, repo_root: Path) -> list[str]:
    return [
        path.resolve().relative_to(repo_root.resolve()).as_posix()
        for path in sorted(submission_dir.rglob("*"))
        if path.is_file() and path.name != ".DS_Store"
    ]


def infer_author(submission_dir: Path, repo_root: Path) -> str:
    rel = submission_dir.resolve().relative_to(repo_root.resolve()).parts
    if len(rel) >= 2 and rel[0] == "submissions":
        return rel[1]
    return "unknown"


def script_path(repo_root: Path, name: str) -> Path:
    # Review a participant checkout with the maintainer worker's trusted
    # validation code.  The checkout can predate a validator fix (or contain
    # participant-controlled scripts), so it must never supply executables to
    # the review process.
    return SCRIPT_DIR / name


def run_json_command(command: list[str]) -> dict:
    completed = subprocess.run(command, capture_output=True, text=True, check=False)
    if completed.stdout.strip():
        try:
            parsed = json.loads(completed.stdout)
        except json.JSONDecodeError:
            parsed = {"raw_stdout": completed.stdout}
    else:
        parsed = {}
    return {
        "returncode": completed.returncode,
        "stdout": parsed,
        "stderr": completed.stderr.strip(),
    }


def run_pre_submit_self_check(repo_root: Path, submission_dir: Path, author: str) -> dict:
    command = [
        sys.executable,
        str(script_path(repo_root, "self_check_submission.py")),
        submission_dir.resolve().as_posix(),
        "--repo-root",
        repo_root.resolve().as_posix(),
        "--pr-author",
        author,
        "--json",
    ]
    return run_json_command(command)


def build_review_input(repo_root: Path, submission_dir: Path) -> dict:
    author = infer_author(submission_dir, repo_root)
    changed_files = discover_files(submission_dir, repo_root)
    pre_submit = run_pre_submit_self_check(repo_root, submission_dir, author)
    pre_submit_stdout = pre_submit.get("stdout") if isinstance(pre_submit.get("stdout"), dict) else {}
    validation_stdout = (
        pre_submit_stdout.get("deterministic_validation", {}).get("stdout")
        if isinstance(pre_submit_stdout, dict)
        else None
    )
    if not isinstance(validation_stdout, dict):
        validation_stdout = validate_submission(repo_root, author, changed_files).to_dict()
    spatial_review = pre_submit_stdout.get("spatial_review", {}) if isinstance(pre_submit_stdout, dict) else {}
    visual_review = pre_submit_stdout.get("visual_review", {}) if isinstance(pre_submit_stdout, dict) else {}
    professional_review = pre_submit_stdout.get("professional_review", {}) if isinstance(pre_submit_stdout, dict) else {}
    agent_taskbook = read_json(repo_root / "brief" / "site-package" / "agent_taskbook.json")
    advisory_review_schema = read_json(repo_root / ADVISORY_REVIEW_SCHEMA_PATH)
    source_registry = load_source_registry(repo_root)
    source_registry_summary = summarize_source_registry(source_registry)
    return {
        "submission_dir": submission_dir.resolve().relative_to(repo_root.resolve()).as_posix(),
        "author": author,
        "proposal_md": read_text(submission_dir / "proposal.md"),
        "manifest": read_json(submission_dir / "manifest.json"),
        "metrics": read_json(submission_dir / "metrics.json"),
        "assumptions": read_json(submission_dir / "assumptions.json"),
        "sources": read_json(submission_dir / "sources.json"),
        "self_check": read_json(submission_dir / "self_check.json"),
        "compliance_matrix": read_json(submission_dir / "compliance_matrix.json"),
        "standard_matrix": read_json(submission_dir / "standard_matrix.json"),
        "design_depth_matrix": read_json(submission_dir / "design_depth_matrix.json"),
        "agent_taskbook": agent_taskbook,
        "visual_index_path": "visual/index.html" if (submission_dir / "visual" / "index.html").exists() else None,
        "pre_submit_self_check": pre_submit,
        "deterministic_validation": validation_stdout,
        "spatial_review": spatial_review,
        "visual_review": visual_review,
        "professional_review": professional_review,
        "rubric_dimensions": RUBRIC_DIMENSIONS,
        "rubric_dimension_titles": DIMENSIONS,
        "advisory_review_schema_path": ADVISORY_REVIEW_SCHEMA_PATH,
        "advisory_review_schema": advisory_review_schema,
        "source_registry_summary": source_registry_summary,
        "review_visibility_rule": "Maintainer/advisory review results are local-only and may be shared with the contributor through PR comments only. Do not add them to submissions-data.js, public gallery cards, or committed review pages.",
        "agent_taskbook_review_dimensions": agent_taskbook.get("review_dimensions") if isinstance(agent_taskbook, dict) else None,
        "agent_taskbook_boundary_clause": agent_taskbook.get("boundary_clause") if isinstance(agent_taskbook, dict) else None,
        "mandatory_rejection_checks": [
            "个人隐私、涉密信息、内部或非公开空间数据",
            "伪造官方背书、审批结论或实施承诺",
            "攻击性、歧视性、违法或恶意内容",
            "主要内容与任务书无关",
            "未回应 agent_taskbook.json 的六项智能体任务",
            "把概念建议、活动设想或政策机制表述为已确定政府决策或实施安排",
        ],
    }


def build_prompt(review_input: dict) -> str:
    return "\n".join(
        [
            "# AI Urban Design Advisory Review Prompt",
            "",
            "You are reviewing a machine-readable AI urban design submission for the Haidian Centennial Jing-Zhang AI Innovation Belt.",
            "Use only the supplied review-input JSON. Do not invent official boundaries, planning controls, data sources, or approval status.",
            "Use `source_registry_summary` to distinguish approved formal sources, background-only sources, provisional sources, and needs-review sources.",
            "The review is a local maintainer aid. The only user-visible destination is a Pull Request comment; do not ask to publish this review to the gallery, submissions-data.js, or committed review pages.",
            "",
            f"Return JSON that validates against `{ADVISORY_REVIEW_SCHEMA_PATH}` and include the PR comment body in `pr_comment_markdown`.",
            "Use these recommendation values exactly: reject, request-changes, intake-provisional, formal-review-ready.",
            "",
            "The JSON must include:",
            "- Mandatory rejection check result",
            "- Gate check summaries for deterministic validation, spatial review, machine visual-packaging checks, and professional evidence review",
            "- Whether the package can enter formal professional review",
            "- Seven-dimension rubric scores and comments using the supplied `rubric_dimensions[].dimension_id` values",
            "- Agent taskbook comments inside the relevant rubric comments when agent_taskbook_review_dimensions is present",
            "- Data gaps and repair actions",
            "- `pr_comment_markdown`: concise Markdown for a PR comment",
            "",
            "Important: deterministic validation and spatial review results are evidence. Treat blocking self-checks, known blockers, and missing official geometry as serious readiness limits.",
            "Treat background_only, provisional_only, and needs_review registry entries as non-formal evidence unless the submitted package separately provides reviewed official/cleared evidence.",
            "Bilingual-file warnings are advisory only: missing or incomplete translations, terminology differences, and stale translation hashes must not by themselves lower the recommendation or block content review. Independent safety or rights violations inside a translation remain enforceable.",
            "If pre-submit self-check, spatial review, machine visual-packaging checks, or professional evidence review is FAIL, the package cannot enter formal professional scoring.",
            "",
            "Submission path:",
            f"`{review_input['submission_dir']}`",
        ]
    )


def build_template(review_input: dict) -> str:
    lines = ["# Advisory Review", ""]
    lines.append("Local-only maintainer aid. If shared with the contributor, copy the final result into a PR comment only.")
    lines.append("")
    lines.append(f"Submission: `{review_input['submission_dir']}`")
    lines.append(f"Output schema: `{ADVISORY_REVIEW_SCHEMA_PATH}`")
    lines.append("")
    lines.append("## Mandatory Rejection")
    lines.append("- Result: TODO")
    lines.append("- Notes: TODO")
    lines.append("")
    lines.append("## Formal Review Readiness")
    self_check = review_input.get("pre_submit_self_check", {}).get("stdout", {})
    if isinstance(self_check, dict):
        ready = "YES" if self_check.get("can_enter_formal_review") else "NO"
        lines.append(f"- Pre-submit self-check: {'PASS' if self_check.get('ok') else 'FAIL'}")
        professional = self_check.get("professional_review", {})
        if isinstance(professional, dict):
            lines.append(f"- Professional evidence review: {'PASS' if professional.get('ok') else 'FAIL'}")
        lines.append(f"- Can enter formal professional review: {ready}")
    else:
        lines.append("- Pre-submit self-check: TODO")
        lines.append("- Can enter formal professional review: TODO")
    lines.append("- Result: TODO")
    lines.append("- Blocking issues: TODO")
    lines.append("")
    lines.append("## Seven-Dimension Review")
    for dimension in RUBRIC_DIMENSIONS:
        lines.append(f"- `{dimension['dimension_id']}` {dimension['title_zh']}: TODO")
    lines.append("")
    lines.append("## Data Gaps And Repairs")
    lines.append("- TODO")
    lines.append("")
    lines.append("## Recommendation")
    lines.append("TODO")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("submission_dir")
    parser.add_argument("--repo-root", default=".")
    parser.add_argument("--out")
    args = parser.parse_args()

    repo_root = Path(args.repo_root)
    submission_dir = Path(args.submission_dir)
    if not submission_dir.is_absolute():
        submission_dir = repo_root / submission_dir
    if args.out:
        out_dir = Path(args.out)
        if not out_dir.is_absolute():
            out_dir = repo_root / out_dir
    else:
        out_dir = repo_root / DEFAULT_OUTPUT_ROOT / submission_dir.name / "review-packet"
    out_dir.mkdir(parents=True, exist_ok=True)

    review_input = build_review_input(repo_root, submission_dir)
    (out_dir / "review-input.json").write_text(
        json.dumps(review_input, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (out_dir / "review-prompt.md").write_text(build_prompt(review_input), encoding="utf-8")
    (out_dir / "advisory-review.md").write_text(build_template(review_input), encoding="utf-8")
    print(out_dir)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
