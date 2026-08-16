#!/usr/bin/env python3
"""Prepare an AI review packet for a structured urban design submission.

This script does not call a model. It produces deterministic inputs and a prompt
that maintainers can pass to an external model or review agent.

The review packet contains:
- A structured JSON input (review-input.json) with proposal text, evidence
  summary, self-check results, and seven rubric dimensions.
- A Markdown prompt (review-prompt.md) ready to paste into an AI interface.

Seven rubric dimensions
-----------------------
1. brief_alignment (任务书相关性) — coverage of open-call brief requirements.
2. originality (原创性) — novel concepts, mechanisms, scenarios.
3. ai_planning_innovation (AI 与城市规划创新性) — AI-urban integration.
4. implementation_feasibility (可实施性) — phasing, actors, metrics.
5. public_interest_inclusion (公共利益与包容性) — resident and equity coverage.
6. risk_compliance (风险与合规意识) — data boundaries, copyright, risk matrix.
7. expression_completeness (表达完整度) — full evidence closure.

Usage
-----
Build a review packet for one submission::

    python3 scripts/review_submission.py submissions/<login>/<slug> \\
        --pr-author <login>

The output files go to .maintainer-review/<slug>/ by default.
Pass --out to override. This script is typically called by maintainer_review.py
rather than directly.
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
PACKAGE_FILES_INCLUDED_AS_RAW_TEXT = {
    "proposal.md",
    "manifest.json",
    "metrics.json",
    "assumptions.json",
    "sources.json",
    "self_check.json",
    "compliance_matrix.json",
    "standard_matrix.json",
    "design_depth_matrix.json",
}
PACKAGE_FILES_INCLUDED_AS_RENDERED_PREVIEW = {
    "assets/figures/site-overview.png",
    "assets/figures/site-overview.en.png",
    "assets/figures/land-use-structure.png",
    "assets/figures/land-use-structure.en.png",
    "assets/figures/key-areas.png",
    "assets/figures/key-areas.en.png",
    "assets/figures/mobility-bluegreen.png",
    "assets/figures/mobility-bluegreen.en.png",
    "assets/figures/metrics-evidence.png",
    "assets/figures/metrics-evidence.en.png",
    "report/proposal.html",
    "report/proposal.en.html",
    "visual/index.html",
    "visual/index.en.html",
}
PACKAGE_FILES_INCLUDED_AS_PARTIAL_PREVIEW = {
    "drawings/a3-booklet.pdf",
    "drawings/a3-booklet.en.pdf",
    "drawings/a0-boards.pdf",
    "drawings/a0-boards.en.pdf",
}


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


def build_review_input_access_boundary(
    package_files: list[str],
    manifest: Any,
) -> dict[str, Any]:
    """Describe packet visibility without reading or executing arbitrary artifacts."""
    present_paths = set(package_files)
    raw_text_paths = sorted(PACKAGE_FILES_INCLUDED_AS_RAW_TEXT & present_paths)
    rendered_preview_paths = sorted(PACKAGE_FILES_INCLUDED_AS_RENDERED_PREVIEW & present_paths)
    partial_preview_paths = sorted(PACKAGE_FILES_INCLUDED_AS_PARTIAL_PREVIEW & present_paths)
    not_supplied_paths = sorted(
        present_paths
        - PACKAGE_FILES_INCLUDED_AS_RAW_TEXT
        - PACKAGE_FILES_INCLUDED_AS_RENDERED_PREVIEW
        - PACKAGE_FILES_INCLUDED_AS_PARTIAL_PREVIEW
    )
    manifest_artifacts: list[dict[str, Any]] = []
    if isinstance(manifest, dict) and isinstance(manifest.get("files"), list):
        for item in manifest["files"]:
            if not isinstance(item, dict) or not isinstance(item.get("path"), str):
                continue
            path = item["path"]
            artifact = {
                "path": path,
                "role": item.get("role"),
                "present_in_package": path in present_paths,
                "raw_content_in_review_input_json": path in raw_text_paths,
                "rendered_preview_supplied": path in rendered_preview_paths,
                "partial_preview_supplied": path in partial_preview_paths,
            }
            manifest_artifacts.append(artifact)
    return {
        "raw_text_paths": raw_text_paths,
        "rendered_preview_paths": rendered_preview_paths,
        "partial_preview_paths": partial_preview_paths,
        "partial_preview_rule": "PDF previews include only the first page of each listed file.",
        "not_supplied_paths": not_supplied_paths,
        "manifest_artifacts": manifest_artifacts,
        "participant_verification_scripts_executed": False,
        "trusted_gate_reports_supplied": [
            "deterministic_validation",
            "spatial_review",
            "visual_review",
            "professional_review",
        ],
        "rule": (
            "A package artifact listed in not_supplied_paths is absent from the advisory packet, "
            "not absent from the submission. Rendered previews do not expose source bytes, and PDF "
            "previews include only their first page. Never claim to have inspected content "
            "outside the stated access mode or executed a participant artifact."
        ),
    }


def build_review_input(repo_root: Path, submission_dir: Path) -> dict:
    author = infer_author(submission_dir, repo_root)
    changed_files = discover_files(submission_dir, repo_root)
    submission_rel = submission_dir.resolve().relative_to(repo_root.resolve())
    package_files = [
        Path(path).relative_to(submission_rel).as_posix()
        for path in changed_files
    ]
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
    manifest = read_json(submission_dir / "manifest.json")
    return {
        "submission_dir": submission_rel.as_posix(),
        "author": author,
        "proposal_md": read_text(submission_dir / "proposal.md"),
        "manifest": manifest,
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
        "review_input_access_boundary": build_review_input_access_boundary(
            package_files,
            manifest,
        ),
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
            "Use `review_input_access_boundary` to distinguish raw package content actually supplied in the review-input JSON from artifacts that are only listed in the manifest or file inventory. Some visual artifacts may be attached separately as rendered previews.",
            "Do not reduce a rubric score, create a required repair, fail a gate, or make an adverse recommendation merely because an artifact is listed in `not_supplied_paths`. Treat `rendered_preview_paths` as visual evidence rather than source bytes, and never claim that `partial_preview_paths` proves anything beyond the first PDF page. Do not claim to have inspected or executed an unsupplied artifact. Use the trusted deterministic, spatial, visual, and professional gate reports for those checks; request participant action only when a supplied report or visible contradiction establishes a real failure.",
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
            "Version 2 bilingual deliverables are mandatory. A missing, incomplete, malformed, or incorrectly mapped Chinese/English counterpart is a blocking package-readiness failure. Historical version 1 packages remain compatible; review their available language without inventing missing content. Human reviewers must still compare translated claims, metrics, evidence, and figure positions for substantive equivalence.",
            "When English counterparts are present, the multimodal packet includes language-paired figure, PDF first-page, and HTML screenshot evidence. Do not reduce expression_completeness merely because a counterpart is absent from the multimodal packet; the deterministic bilingual gate and human package review own that mapping check.",
            "Organizer-owned missing geometry or official data is a data gap, not a participant repair. If you include an organizer-owned follow-up in required_next_actions_zh, prefix it with exactly `组织方：` or `主办方：`; official/正式 wording alone does not establish ownership. Any action asking the participant to correct, remove, clarify, or replace a claim remains participant-controlled even when it mentions official boundaries or geometry. Record organizer-owned items in data_gaps_zh; required_next_actions_zh must contain participant-controlled repairs and must not block featured-candidate solely because organizer data still needs recalculation.",
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
