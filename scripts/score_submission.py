#!/usr/bin/env python3
"""Run a deterministic proposal self-check.

This script is advisory. It helps contributors find missing or weak areas
before opening a PR, but it does not replace maintainer review and does not call
AI services.

It evaluates eight scoring dimensions:

1. **任务书相关性** — coverage of key Jing-Zhang AI innovation belt terms.
2. **原创性** — presence of concept, mechanism, and scenario language.
3. **AI 与城市规划创新性** — AI and urban-planning term density.
4. **可实施性** — phasing, actor, and metric language.
5. **公共利益** — inclusion of resident and accessibility terms.
6. **风险合规** — presence of risk, copyright, and data-gap disclosure.
7. **表达完整度** — required section coverage and metadata completeness.
8. **公开资料引用** — citation of public sources from the repository index.

This script checks ``proposal.md`` only.  It does not run the four formal
validation gates (deterministic, spatial, visual, professional).  A ``pass``
result here does not guarantee formal review readiness; run
``scripts/self_check_submission.py --mark-self-checked`` for that.

Usage
-----
Advisory run::

    python3 scripts/score_submission.py submissions/<login>/<slug>/proposal.md

Machine-readable output::

    python3 scripts/score_submission.py submissions/<login>/<slug>/proposal.md --json

Strict mode (exits 1 when any dimension is ``missing``)::

    python3 scripts/score_submission.py submissions/<login>/<slug>/proposal.md --strict
"""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from validate_submission import PLACEHOLDERS, extract_headings, parse_front_matter


STATUS_PASS = "pass"
STATUS_NEEDS_WORK = "needs-work"
STATUS_MISSING = "missing"
STATUS_MANUAL_REVIEW = "manual-review"

DIMENSION_ORDER = [
    "任务书相关性",
    "原创性",
    "AI 与城市规划创新性",
    "可实施性",
    "公共利益",
    "风险合规",
    "表达完整度",
    "公开资料引用",
]

REQUIRED_METADATA = ["title", "author_github", "language", "license", "summary"]

# Each required area is satisfied when a heading contains ANY of its aliases.
# This keeps the advisory self-check in sync with both the lightweight example
# template and the formal scaffold template (templates/proposal.md), whose
# section headings differ.
REQUIRED_SECTION_GROUPS: list[tuple[str, list[str]]] = [
    ("摘要 / 设计依据", ["摘要", "设计依据"]),
    ("问题理解 / 研究范围", ["问题理解", "研究范围", "三层范围"]),
    ("核心概念 / 总体设计", ["核心概念", "总体设计", "重点区域"]),
    ("空间与产业方案", ["空间与产业", "用地", "交通", "蓝绿"]),
    ("AI 创新场景", ["AI 治理与创新场景", "AI 创新生态"]),
    ("落地路径 / 实施计划", ["落地路径", "更新项目清单", "实施政策", "分期"]),
    ("风险与合规说明", ["风险与合规", "风险、版权", "风险"]),
    ("参考资料", ["参考资料"]),
]

CONCEPT_SECTION_ALIASES = ["核心概念", "总体设计", "重点区域"]
AI_SECTION_ALIASES = ["AI 治理与创新场景", "AI 创新生态"]
LANDING_SECTION_ALIASES = ["落地路径", "更新项目清单", "实施政策", "分期"]
RISK_SECTION_ALIASES = ["风险与合规", "风险、版权", "风险"]
REFERENCE_SECTION_ALIASES = ["参考资料"]

TASK_TERMS = ["百年京张", "京张", "海淀", "AI", "人工智能", "创新带", "中关村", "城市"]
ORIGINALITY_TERMS = ["概念", "机制", "模式", "体系", "网络", "平台", "社区", "场景", "环"]
AI_TERMS = ["AI", "人工智能", "智能体", "算法", "模型", "机器人", "自动驾驶", "无人", "数据"]
URBAN_TERMS = ["空间", "交通", "公共服务", "产业", "治理", "文化", "慢行", "社区", "园区"]
PHASE_TERMS = ["阶段", "试点", "近期", "中期", "远期", "个月", "年度", "0-6", "1 年", "三年"]
ACTOR_TERMS = ["政府", "企业", "高校", "社区", "居民", "维护者", "部门", "主体", "团队"]
METRIC_TERMS = ["指标", "评估", "满意度", "数量", "比例", "时长", "可衡量", "监测", "反馈"]
PUBLIC_TERMS = ["居民", "青年", "学生", "企业", "高校", "游客", "无障碍", "包容", "公共", "弱势"]
RISK_TERMS = ["公开", "非公开", "隐私", "版权", "授权", "复核", "风险", "合规", "涉密", "边界"]
MANUAL_REVIEW_TERMS = ["内部资料", "内部数据", "非公开空间数据", "未公开图件", "无需审批", "保证落地", "一定实施"]

# These are first-party audit artifacts inside a formal submission package,
# not public evidence that needs a source-registry record.
PACKAGE_ARTIFACT_NAMES = {
    "agent.json",
    "assumptions.json",
    "compliance_matrix.json",
    "design_depth_matrix.json",
    "manifest.json",
    "metrics.json",
    "self_check.json",
    "sources.json",
    "standard_matrix.json",
}


@dataclass
class CheckResult:
    dimension: str
    status: str
    messages: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "dimension": self.dimension,
            "status": self.status,
            "messages": self.messages,
        }


@dataclass
class SourceMatch:
    id: str
    citation: str

    def to_dict(self) -> dict[str, str]:
        return {"id": self.id, "citation": self.citation}


@dataclass
class SelfCheckReport:
    proposal_path: str
    checks: list[CheckResult]
    matched_sources: list[SourceMatch] = field(default_factory=list)
    unmatched_reference_lines: list[str] = field(default_factory=list)
    metadata_missing: list[str] = field(default_factory=list)
    required_sections_missing: list[str] = field(default_factory=list)

    @property
    def summary(self) -> dict[str, int]:
        counts = {
            STATUS_PASS: 0,
            STATUS_NEEDS_WORK: 0,
            STATUS_MISSING: 0,
            STATUS_MANUAL_REVIEW: 0,
        }
        for check in self.checks:
            counts[check.status] = counts.get(check.status, 0) + 1
        return counts

    @property
    def ready(self) -> bool:
        return not any(check.status == STATUS_MISSING for check in self.checks)

    def to_dict(self) -> dict[str, Any]:
        return {
            "check_scope": "advisory_proposal_only",
            "formal_readiness": "not_assessed",
            "next_required_check": "scripts/self_check_submission.py",
            "proposal_path": self.proposal_path,
            "ready": self.ready,
            "summary": self.summary,
            "metadata_missing": self.metadata_missing,
            "required_sections_missing": self.required_sections_missing,
            "matched_sources": [item.to_dict() for item in self.matched_sources],
            "unmatched_reference_lines": self.unmatched_reference_lines,
            "checks": [check.to_dict() for check in self.checks],
        }


def compact_len(text: str) -> int:
    return len(re.sub(r"\s+", "", text))


def count_terms(text: str, terms: list[str]) -> int:
    return sum(1 for term in terms if term.lower() in text.lower())


def split_sections(body: str) -> dict[str, str]:
    sections: dict[str, str] = {}
    current_title: str | None = None
    current_lines: list[str] = []
    for line in body.splitlines():
        match = re.match(r"^##\s+(.+?)\s*$", line)
        if match:
            if current_title is not None:
                sections[current_title] = "\n".join(current_lines).strip()
            current_title = match.group(1).strip()
            current_lines = []
        elif current_title is not None:
            current_lines.append(line)
    if current_title is not None:
        sections[current_title] = "\n".join(current_lines).strip()
    return sections


def first_section(sections: dict[str, str], required_title: str) -> str:
    for title, content in sections.items():
        if required_title in title:
            return content
    return ""


def find_section(sections: dict[str, str], aliases: list[str]) -> str:
    """Return the body of the first section whose title contains any alias."""
    for title, content in sections.items():
        if any(alias in title for alias in aliases):
            return content
    return ""


def status_from_term_count(count: int, pass_at: int = 3, needs_at: int = 1) -> str:
    if count >= pass_at:
        return STATUS_PASS
    if count >= needs_at:
        return STATUS_NEEDS_WORK
    return STATUS_MISSING


def load_source_index(repo_root: Path, index_path: Path | None = None) -> list[dict[str, Any]]:
    """Load the repository-wide public source index."""
    index_path = index_path or repo_root / "sources" / "public-sources.json"
    if not index_path.is_absolute():
        index_path = repo_root / index_path
    if not index_path.exists():
        return []
    try:
        index_data = json.loads(index_path.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return []
    sources = index_data.get("sources") if isinstance(index_data, dict) else []
    return sources if isinstance(sources, list) else []


def load_package_source_index(proposal_path: Path) -> list[dict[str, Any]]:
    """Load the formal package-local source registry when one is present.

    Proposal format v2 keeps the human-readable proposal beside a package
    ``sources.json``.  The advisory score should recognize those citations in
    addition to the repository-wide lightweight index; otherwise a valid
    formal package is reported as having no source coverage.
    """
    package_index_path = proposal_path.parent / "sources.json"
    if not package_index_path.exists():
        return []
    try:
        index_data = json.loads(package_index_path.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return []
    raw_sources = index_data.get("sources") if isinstance(index_data, dict) else []
    if not isinstance(raw_sources, list):
        return []

    sources: list[dict[str, Any]] = []
    for source in raw_sources:
        if not isinstance(source, dict):
            continue
        normalized = dict(source)
        if not normalized.get("id") and normalized.get("registry_source_id"):
            normalized["id"] = normalized["registry_source_id"]
        if not normalized.get("citation"):
            for key in ("url", "path", "title"):
                value = normalized.get(key)
                if isinstance(value, str) and value.strip():
                    normalized["citation"] = value.strip()
                    break
        sources.append(normalized)
    return sources


def reference_lines(reference_section: str) -> list[str]:
    lines = []
    for raw_line in reference_section.splitlines():
        line = raw_line.strip()
        if line.startswith("- "):
            value = line[2:].strip()
            if value:
                lines.append(value)
    return lines


def is_package_artifact_reference(line: str) -> bool:
    """Return true when a reference bullet names only local package artifacts."""
    if re.search(r"https?://", line, flags=re.IGNORECASE):
        return False
    file_tokens = re.findall(r"[\w./-]+\.(?:json|geojson)", line, flags=re.IGNORECASE)
    if not file_tokens or not all(token in PACKAGE_ARTIFACT_NAMES for token in file_tokens):
        return False

    remainder = line
    for token in file_tokens:
        remainder = remainder.replace(token, "", 1)
    return re.fullmatch(r"(?:[\s`*_()\[\]{},，、;；:+&/|]|and|与|及)*", remainder, flags=re.IGNORECASE) is not None


def match_sources(text: str, reference_section: str, sources: list[dict[str, Any]]) -> tuple[list[SourceMatch], list[str]]:
    haystack = f"{text}\n{reference_section}"
    matched: list[SourceMatch] = []
    matched_ids: set[str] = set()
    matched_tokens: set[str] = set()
    for source in sources:
        if not isinstance(source, dict):
            continue
        source_id = str(source.get("id") or "").strip()
        registry_source_id = str(source.get("registry_source_id") or "").strip()
        citation = str(source.get("citation", "")).strip()
        path = str(source.get("path", "")).strip()
        url = str(source.get("url", "")).strip()
        candidates = [item for item in [source_id, registry_source_id, citation, path, url] if item]
        if any(candidate in haystack for candidate in candidates):
            match_id = source_id or registry_source_id or citation or path or url
            if match_id not in matched_ids:
                matched.append(SourceMatch(match_id, citation or path or url))
                matched_ids.add(match_id)
            matched_tokens.update(candidates)

    unmatched = []
    for line in reference_lines(reference_section):
        normalized = line.replace("`", "")
        if not any(token and token in normalized for token in matched_tokens) and not is_package_artifact_reference(
            normalized
        ):
            unmatched.append(line)
    return matched, unmatched


def build_check(dimension: str, status: str, *messages: str) -> CheckResult:
    return CheckResult(dimension, status, [message for message in messages if message])


def score_proposal(
    repo_root: Path,
    proposal_path: Path,
    sources_index_path: Path | None = None,
) -> SelfCheckReport:
    repo_root = repo_root.resolve()
    if not proposal_path.is_absolute():
        proposal_path = repo_root / proposal_path
    display_path = str(proposal_path.relative_to(repo_root)) if proposal_path.is_relative_to(repo_root) else str(proposal_path)

    text = proposal_path.read_text(encoding="utf-8")
    metadata, body = parse_front_matter(text)
    headings = extract_headings(body)
    sections = split_sections(body)
    missing_metadata = [key for key in REQUIRED_METADATA if not metadata.get(key)]
    missing_sections = [
        label
        for label, aliases in REQUIRED_SECTION_GROUPS
        if not any(any(alias in heading for alias in aliases) for heading in headings)
    ]

    checks: list[CheckResult] = []

    task_count = count_terms(text, TASK_TERMS)
    checks.append(
        build_check(
            "任务书相关性",
            status_from_term_count(task_count, pass_at=4, needs_at=2),
            f"命中 {task_count} 个任务关键词；建议明确回应百年京张、海淀、AI 创新带和城市治理/空间议题。",
        )
    )

    concept = find_section(sections, CONCEPT_SECTION_ALIASES)
    concept_terms = count_terms(concept, ORIGINALITY_TERMS)
    if not concept:
        originality_status = STATUS_MISSING
        originality_message = "缺少核心概念章节内容。"
    elif compact_len(concept) >= 120 and concept_terms >= 2:
        originality_status = STATUS_PASS
        originality_message = "核心概念具备一定篇幅，并包含机制、体系或场景表达。"
    else:
        originality_status = STATUS_NEEDS_WORK
        originality_message = "核心概念偏短或缺少清晰机制，建议补充命名、关键机制和差异化主张。"
    checks.append(build_check("原创性", originality_status, originality_message))

    ai_scene = find_section(sections, AI_SECTION_ALIASES)
    ai_count = count_terms(ai_scene, AI_TERMS)
    urban_count = count_terms(ai_scene, URBAN_TERMS)
    if not ai_scene:
        ai_status = STATUS_MISSING
        ai_message = "缺少 AI 治理与创新场景章节内容。"
    elif ai_count >= 2 and urban_count >= 2 and compact_len(ai_scene) >= 120:
        ai_status = STATUS_PASS
        ai_message = "AI 能力与城市空间、治理或公共服务议题已有结合。"
    else:
        ai_status = STATUS_NEEDS_WORK
        ai_message = "建议把 AI 能力和具体城市问题绑定，说明数据、服务对象、人工复核和落地场景。"
    checks.append(build_check("AI 与城市规划创新性", ai_status, ai_message))

    landing = find_section(sections, LANDING_SECTION_ALIASES)
    phase_count = count_terms(landing, PHASE_TERMS)
    actor_count = count_terms(landing, ACTOR_TERMS)
    metric_count = count_terms(landing, METRIC_TERMS)
    if not landing:
        landing_status = STATUS_MISSING
        landing_message = "缺少落地路径章节内容。"
    elif phase_count and actor_count and metric_count:
        landing_status = STATUS_PASS
        landing_message = "落地路径包含阶段、参与主体和可衡量指标。"
    elif phase_count or actor_count or metric_count:
        landing_status = STATUS_NEEDS_WORK
        landing_message = "落地路径已有部分信息，建议同时补足阶段、参与主体和指标。"
    else:
        landing_status = STATUS_MISSING
        landing_message = "落地路径需要说明阶段、试点、参与主体和可衡量指标。"
    checks.append(build_check("可实施性", landing_status, landing_message))

    public_count = count_terms(text, PUBLIC_TERMS)
    checks.append(
        build_check(
            "公共利益",
            status_from_term_count(public_count, pass_at=4, needs_at=2),
            f"命中 {public_count} 个公共利益相关词；建议说明居民、青年、企业、高校、游客和弱势群体的受益与影响。",
        )
    )

    risk = find_section(sections, RISK_SECTION_ALIASES)
    risk_count = count_terms(risk, RISK_TERMS)
    manual_review_count = count_terms(text, MANUAL_REVIEW_TERMS)
    if manual_review_count:
        risk_status = STATUS_MANUAL_REVIEW
        risk_message = "文本出现需要维护者复核的敏感或承诺性表达，请确认公开性、审批边界和措辞。"
    elif not risk:
        risk_status = STATUS_MISSING
        risk_message = "缺少风险与合规说明章节内容。"
    elif risk_count >= 4 and compact_len(risk) >= 100:
        risk_status = STATUS_PASS
        risk_message = "风险章节已覆盖公开边界、隐私、版权、复核或合规议题。"
    else:
        risk_status = STATUS_NEEDS_WORK
        risk_message = "建议补充公开资料边界、隐私保护、版权、实施风险和人工复核说明。"
    checks.append(build_check("风险合规", risk_status, risk_message))

    placeholder_hits = [placeholder for placeholder in PLACEHOLDERS if placeholder in text]
    body_len = compact_len(body)
    if missing_metadata or missing_sections:
        completeness_status = STATUS_MISSING
        completeness_message = "缺少必要 metadata 或必填章节。"
    elif placeholder_hits:
        completeness_status = STATUS_MISSING
        completeness_message = f"仍包含模板占位符：{', '.join(placeholder_hits)}。"
    elif body_len < 800:
        completeness_status = STATUS_NEEDS_WORK
        completeness_message = "正文较短，建议补充问题理解、空间产业策略、AI 场景和落地路径细节。"
    else:
        completeness_status = STATUS_PASS
        completeness_message = "结构完整，正文长度达到基础自检阈值。"
    checks.append(build_check("表达完整度", completeness_status, completeness_message))

    reference_section = find_section(sections, REFERENCE_SECTION_ALIASES)
    sources = load_source_index(repo_root, sources_index_path)
    sources.extend(load_package_source_index(proposal_path))
    matched_sources, unmatched_references = match_sources(text, reference_section, sources)
    if not reference_section:
        source_status = STATUS_MISSING
        source_message = "缺少参考资料章节内容。"
    elif matched_sources:
        source_status = STATUS_PASS if not unmatched_references else STATUS_NEEDS_WORK
        source_message = "已引用全局或方案包来源索引内资料。"
        if unmatched_references:
            source_message += " 未匹配的资料需要说明来源和公开性。"
    else:
        source_status = STATUS_NEEDS_WORK
        source_message = "未匹配到来源索引内资料；轻量方案建议引用 brief/public-brief.md，正式 v2 包建议提供可匹配的 sources.json。"
    checks.append(build_check("公开资料引用", source_status, source_message))

    ordered_checks = sorted(checks, key=lambda item: DIMENSION_ORDER.index(item.dimension))
    return SelfCheckReport(
        proposal_path=display_path,
        checks=ordered_checks,
        matched_sources=matched_sources,
        unmatched_reference_lines=unmatched_references,
        metadata_missing=missing_metadata,
        required_sections_missing=missing_sections,
    )


def format_report(report: SelfCheckReport) -> str:
    summary = report.summary
    lines = ["# Proposal self-check", ""]
    lines.append(f"Proposal: {report.proposal_path}")
    lines.append(
        "Result: "
        f"{summary.get(STATUS_PASS, 0)} pass, "
        f"{summary.get(STATUS_NEEDS_WORK, 0)} needs-work, "
        f"{summary.get(STATUS_MISSING, 0)} missing, "
        f"{summary.get(STATUS_MANUAL_REVIEW, 0)} manual-review"
    )
    lines.append("")
    lines.append(
        "> This is advisory only: `pass` and a zero `--strict` exit code apply only to this "
        "proposal-level check. They do not assess formal readiness."
    )
    lines.append(
        "> Formal readiness: not assessed. Next run "
        "`scripts/self_check_submission.py <submission-dir> --pr-author <github-login>` "
        "for deterministic, spatial, visual, and professional evidence validation."
    )

    if report.metadata_missing:
        lines.extend(["", "Missing metadata:"])
        lines.extend(f"- {item}" for item in report.metadata_missing)
    if report.required_sections_missing:
        lines.extend(["", "Missing sections:"])
        lines.extend(f"- ## {item}" for item in report.required_sections_missing)

    lines.extend(["", "Checks:"])
    for check in report.checks:
        lines.append(f"- [{check.status}] {check.dimension}: {' '.join(check.messages)}")

    if report.matched_sources:
        lines.extend(["", "Matched indexed sources:"])
        lines.extend(f"- {item.id}: {item.citation}" for item in report.matched_sources)
    if report.unmatched_reference_lines:
        lines.extend(["", "References needing source/public-status notes:"])
        lines.extend(f"- {item}" for item in report.unmatched_reference_lines)

    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "proposal",
        help="Path to proposal.md, e.g. submissions/<login>/<slug>/proposal.md",
    )
    parser.add_argument(
        "--repo-root",
        default=".",
        help="Repository root directory (default: current working directory)",
    )
    parser.add_argument(
        "--sources-index",
        default="sources/public-sources.json",
        help="Path to the public sources index relative to --repo-root (default: sources/public-sources.json)",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Emit machine-readable JSON instead of human-readable Markdown",
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help=(
            "Exit non-zero when any advisory dimension is 'missing'; "
            "formal readiness is not assessed by this flag"
        ),
    )
    args = parser.parse_args()

    report = score_proposal(Path(args.repo_root), Path(args.proposal), Path(args.sources_index))
    if args.json:
        print(json.dumps(report.to_dict(), ensure_ascii=False, indent=2))
    else:
        print(format_report(report))
    return 1 if args.strict and not report.ready else 0


if __name__ == "__main__":
    raise SystemExit(main())
