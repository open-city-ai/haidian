#!/usr/bin/env python3
"""Export offline expert review packets for one or more submissions."""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path, PurePosixPath
from typing import Any

from generate_submissions_data import STATUS_META, classify_submission
from render_proposal_html import parse_front_matter


DEFAULT_OUTPUT_ROOT = ".maintainer-review"
IMAGE_RE = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
INLINE_CODE_RE = re.compile(r"`([^`]+)`")
BOLD_RE = re.compile(r"\*\*([^*\n]+?)\*\*")
REFERENCE_RE = re.compile(r"\[(source|standard|depth|data|metric):([^\]\s]+)\]")
TABLE_SEPARATOR_CELL_RE = re.compile(r"^:?-{3,}:?$")

KEY_REVIEW_FILES = [
    ("方案正文", "proposal.md"),
    ("离线报告 HTML", "report/proposal.html"),
    ("视觉展示 HTML", "visual/index.html"),
    ("A3 图册", "drawings/a3-booklet.pdf"),
    ("A0 展板", "drawings/a0-boards.pdf"),
    ("自检结果", "self_check.json"),
    ("资料清单", "sources.json"),
    ("假设与缺口", "assumptions.json"),
    ("指标数据", "metrics.json"),
    ("合规矩阵", "compliance_matrix.json"),
    ("专业标准矩阵", "standard_matrix.json"),
    ("设计深度矩阵", "design_depth_matrix.json"),
]


class ReviewPacketError(ValueError):
    """Raised when a review packet cannot be exported."""


@dataclass
class SubmissionPacket:
    submission_dir: Path
    rel_dir: str
    owner: str
    slug: str
    title: str
    summary: str
    iteration: str
    version: str
    stage: str
    generated_at: str
    agent_name: str
    status_key: str
    status_label: str
    can_enter_formal_review: bool | None
    proposal_body: str
    manifest: dict[str, Any]
    self_check: dict[str, Any]
    sources: list[dict[str, Any]]
    assumptions: list[dict[str, Any]]
    metrics: dict[str, Any]
    risk_dimensions: list[dict[str, Any]]
    key_files: list[dict[str, Any]]


def read_json(path: Path) -> dict[str, Any] | None:
    if not path.exists():
        return None
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except UnicodeDecodeError as exc:
        raise ReviewPacketError(f"{path}: JSON file must be UTF-8") from exc
    except json.JSONDecodeError as exc:
        raise ReviewPacketError(f"{path}: invalid JSON: {exc}") from exc
    except OSError as exc:
        raise ReviewPacketError(f"{path}: could not read JSON: {exc}") from exc
    if not isinstance(data, dict):
        raise ReviewPacketError(f"{path}: JSON root must be an object")
    return data


def as_dict(value: Any) -> dict[str, Any]:
    return value if isinstance(value, dict) else {}


def as_list(value: Any) -> list[Any]:
    return value if isinstance(value, list) else []


def text(value: Any, default: str = "") -> str:
    if value is None:
        return default
    return str(value)


def compact(value: Any, limit: int = 260) -> str:
    normalized = re.sub(r"\s+", " ", text(value)).strip()
    if len(normalized) <= limit:
        return normalized
    return normalized[: limit - 1].rstrip() + "…"


def relpath(path: Path, root: Path) -> str:
    try:
        return path.resolve().relative_to(root.resolve()).as_posix()
    except ValueError:
        return path.resolve().as_posix()


def safe_output_link(output_dir: Path, target: Path) -> str:
    return os.path.relpath(target.resolve(), output_dir.resolve()).replace(os.sep, "/")


def markdown_cell(value: Any) -> str:
    return compact(value, 220).replace("|", "\\|").replace("\n", " ")


def markdown_table(headers: list[str], rows: list[list[Any]]) -> list[str]:
    if not rows:
        return ["_暂无。_"]
    lines = [
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join("---" for _ in headers) + " |",
    ]
    for row in rows:
        lines.append("| " + " | ".join(markdown_cell(cell) for cell in row) + " |")
    return lines


def inside_repo(path: Path, repo_root: Path) -> bool:
    try:
        path.resolve().relative_to(repo_root.resolve())
        return True
    except ValueError:
        return False


def discover_submission_dirs(repo_root: Path) -> list[Path]:
    submissions_root = repo_root / "submissions"
    return sorted(path.parent for path in submissions_root.glob("*/*/proposal.md"))


def normalize_submission_dirs(repo_root: Path, raw_dirs: list[str], include_all: bool) -> list[Path]:
    if include_all and raw_dirs:
        raise ReviewPacketError("use either explicit submission paths or --all, not both")
    if include_all:
        dirs = discover_submission_dirs(repo_root)
        if not dirs:
            raise ReviewPacketError("no submissions found under submissions/*/*/proposal.md")
        return dirs
    if not raw_dirs:
        raise ReviewPacketError("provide at least one submission directory, or use --all")
    dirs = []
    for raw_dir in raw_dirs:
        path = Path(raw_dir)
        if not path.is_absolute():
            path = repo_root / path
        path = path.resolve()
        if not inside_repo(path, repo_root):
            raise ReviewPacketError(f"submission path is outside repo: {raw_dir}")
        if not (path / "proposal.md").exists():
            raise ReviewPacketError(f"{relpath(path, repo_root)} does not contain proposal.md")
        dirs.append(path)
    return sorted(dict.fromkeys(dirs))


def proposal_identity(submission_dir: Path, repo_root: Path) -> tuple[str, str]:
    try:
        parts = submission_dir.resolve().relative_to(repo_root.resolve()).parts
    except ValueError:
        return "unknown", submission_dir.name
    if len(parts) >= 3 and parts[0] == "submissions":
        return parts[1], parts[2]
    return "unknown", submission_dir.name


def load_proposal(submission_dir: Path) -> tuple[dict[str, str], str]:
    proposal_text = (submission_dir / "proposal.md").read_text(encoding="utf-8")
    metadata, body = parse_front_matter(proposal_text)
    return metadata, body.strip()


def load_sources(submission_dir: Path) -> list[dict[str, Any]]:
    data = as_dict(read_json(submission_dir / "sources.json"))
    return [item for item in as_list(data.get("sources")) if isinstance(item, dict)]


def load_assumptions(submission_dir: Path) -> list[dict[str, Any]]:
    data = as_dict(read_json(submission_dir / "assumptions.json"))
    return [item for item in as_list(data.get("assumptions")) if isinstance(item, dict)]


def load_metrics(submission_dir: Path) -> dict[str, Any]:
    data = as_dict(read_json(submission_dir / "metrics.json"))
    metrics = data.get("metrics")
    return metrics if isinstance(metrics, dict) else {}


def load_risk_dimensions(submission_dir: Path) -> list[dict[str, Any]]:
    data = as_dict(read_json(submission_dir / "risk.json"))
    dimensions = []
    for item in as_list(data.get("dimensions")):
        if not isinstance(item, dict):
            continue
        score = item.get("score")
        if isinstance(score, bool) or not isinstance(score, int):
            continue
        dimensions.append(
            {
                "id": text(item.get("id")),
                "label": text(item.get("label"), text(item.get("id"), "风险")),
                "score": score,
                "note": compact(item.get("note"), 220),
                "mitigation": compact(item.get("mitigation"), 220),
            }
        )
    return sorted(dimensions, key=lambda item: (-item["score"], item["label"]))


def load_key_files(submission_dir: Path, repo_root: Path) -> list[dict[str, Any]]:
    files = []
    for label, rel in KEY_REVIEW_FILES:
        path = submission_dir / rel
        files.append(
            {
                "label": label,
                "path": relpath(path, repo_root),
                "exists": path.exists(),
            }
        )
    return files


def self_check_readiness(self_check: dict[str, Any]) -> bool | None:
    if isinstance(self_check.get("can_enter_formal_review"), bool):
        return bool(self_check["can_enter_formal_review"])
    return None


def load_submission_packet(repo_root: Path, submission_dir: Path) -> SubmissionPacket:
    metadata, body = load_proposal(submission_dir)
    manifest = as_dict(read_json(submission_dir / "manifest.json"))
    self_check = as_dict(read_json(submission_dir / "self_check.json"))
    agent_file = as_dict(read_json(submission_dir / "agent.json"))
    owner, slug = proposal_identity(submission_dir, repo_root)
    manifest_agent = as_dict(manifest.get("agent"))
    agent_name = (
        text(agent_file.get("agent_name"))
        or text(manifest_agent.get("agent_name"))
        or text(manifest_agent.get("agent_id"))
        or owner
    )
    status_key = classify_submission(submission_dir, manifest)
    status_label = text(STATUS_META.get(status_key, {}).get("status"), status_key)
    readiness = self_check_readiness(self_check)
    if readiness is None and status_key in {"formal_review_ready", "intake_provisional", "needs_revision", "blocked_fixture"}:
        readiness = status_key == "formal_review_ready"
    return SubmissionPacket(
        submission_dir=submission_dir,
        rel_dir=relpath(submission_dir, repo_root),
        owner=owner,
        slug=slug,
        title=text(metadata.get("title"), slug),
        summary=text(metadata.get("summary")),
        iteration=text(metadata.get("iteration")),
        version=text(metadata.get("version")),
        stage=text(manifest.get("submission_stage"), "unknown"),
        generated_at=text(manifest.get("generated_at")),
        agent_name=agent_name,
        status_key=status_key,
        status_label=status_label,
        can_enter_formal_review=readiness,
        proposal_body=body,
        manifest=manifest,
        self_check=self_check,
        sources=load_sources(submission_dir),
        assumptions=load_assumptions(submission_dir),
        metrics=load_metrics(submission_dir),
        risk_dimensions=load_risk_dimensions(submission_dir),
        key_files=load_key_files(submission_dir, repo_root),
    )


def default_out_dir(repo_root: Path, submissions: list[Path], include_all: bool) -> Path:
    if len(submissions) == 1:
        return repo_root / DEFAULT_OUTPUT_ROOT / submissions[0].name / "review-packet"
    name = "all" if include_all else "selected"
    return repo_root / DEFAULT_OUTPUT_ROOT / "review-packets" / name


def readiness_label(value: bool | None) -> str:
    if value is True:
        return "YES"
    if value is False:
        return "NO"
    return "未声明"


def self_check_rows(packet: SubmissionPacket) -> list[list[Any]]:
    rows = []
    for item in as_list(packet.self_check.get("checks")):
        if not isinstance(item, dict):
            continue
        rows.append(
            [
                item.get("check_id", ""),
                item.get("result", ""),
                item.get("severity", ""),
                item.get("target", ""),
                item.get("message", ""),
            ]
        )
    return rows


def known_blockers(packet: SubmissionPacket) -> list[str]:
    validation_claim = as_dict(packet.manifest.get("validation_claim"))
    blockers = validation_claim.get("known_blockers")
    return [text(item) for item in as_list(blockers) if text(item).strip()]


def metric_rows(packet: SubmissionPacket) -> list[list[Any]]:
    rows = []
    for key, value in sorted(packet.metrics.items()):
        if not isinstance(value, dict):
            continue
        metric_value = value.get("value")
        unit = value.get("unit", "")
        if isinstance(metric_value, float):
            metric_text = f"{metric_value:.4g} {unit}".strip()
        elif metric_value is None:
            metric_text = "unknown"
        else:
            metric_text = f"{metric_value} {unit}".strip()
        rows.append([key, value.get("status", ""), metric_text, value.get("confidence", ""), value.get("formula", "")])
    return rows


def source_rows(packet: SubmissionPacket) -> list[list[Any]]:
    rows = []
    for item in packet.sources:
        rows.append(
            [
                item.get("id", ""),
                item.get("source_type", ""),
                item.get("path") or item.get("url") or "",
                item.get("usage", ""),
            ]
        )
    return rows


def assumption_rows(packet: SubmissionPacket) -> list[list[Any]]:
    rows = []
    for item in packet.assumptions:
        rows.append(
            [
                item.get("id", ""),
                item.get("status", ""),
                item.get("statement", ""),
                item.get("impact", ""),
            ]
        )
    return rows


def risk_rows(packet: SubmissionPacket) -> list[list[Any]]:
    return [
        [item["label"], f"{item['score']}/5", item["note"], item["mitigation"]]
        for item in packet.risk_dimensions
    ]


def file_rows(packet: SubmissionPacket) -> list[list[Any]]:
    return [
        [item["label"], "有" if item["exists"] else "缺失", item["path"]]
        for item in packet.key_files
    ]


def shift_markdown_headings(markdown: str, offset: int = 2) -> str:
    lines = []
    for line in markdown.splitlines():
        if line.startswith("#"):
            hashes = len(line) - len(line.lstrip("#"))
            if hashes > 0 and line[hashes:hashes + 1] == " ":
                lines.append("#" * min(hashes + offset, 6) + line[hashes:])
                continue
        lines.append(line)
    return "\n".join(lines)


def rewrite_markdown_image_links(markdown: str, packet: SubmissionPacket, output_dir: Path) -> str:
    def replace(match: re.Match[str]) -> str:
        alt = match.group(1).strip()
        raw_src = match.group(2).strip()
        src = image_src_for_packet(packet.submission_dir, output_dir, raw_src)
        if not src:
            return f"_图片未纳入评审包：`{raw_src}`_"
        return f"![{alt}]({src})"

    return IMAGE_RE.sub(replace, markdown)


def append_packet_markdown(lines: list[str], packet: SubmissionPacket, index: int, output_dir: Path) -> None:
    lines.extend(
        [
            f"## {index}. {packet.title}",
            "",
            "### 快速判断",
            "",
            f"- 投稿路径：`{packet.rel_dir}`",
            f"- 作者 / Agent：{packet.owner} / {packet.agent_name}",
            f"- 投稿阶段：{packet.stage}",
            f"- 展示状态：{packet.status_label} (`{packet.status_key}`)",
            f"- 可进入正式专业评分：{readiness_label(packet.can_enter_formal_review)}",
            f"- 版本 / 迭代：{packet.version or '未声明'} / {packet.iteration or '未声明'}",
            f"- 生成时间：{packet.generated_at or '未声明'}",
        ]
    )
    if packet.summary:
        lines.extend(["", f"> {packet.summary}"])

    blockers = known_blockers(packet)
    if blockers:
        lines.extend(["", "### 已知阻断项", ""])
        lines.extend(f"- {item}" for item in blockers)

    lines.extend(["", "### 风险与待补条件", ""])
    if packet.risk_dimensions:
        lines.extend(markdown_table(["风险维度", "等级", "说明", "缓解方式"], risk_rows(packet)))
    else:
        lines.append("_未提供 `risk.json`。_")
    lines.extend(["", "#### 假设与资料缺口", ""])
    lines.extend(markdown_table(["ID", "状态", "说明", "影响"], assumption_rows(packet)))

    lines.extend(["", "### 自检与证据链", ""])
    if packet.self_check:
        lines.extend(markdown_table(["Check", "结果", "等级", "对象", "说明"], self_check_rows(packet)))
    else:
        lines.append("_未提供 `self_check.json`。_")
    lines.extend(["", "#### 公开资料引用", ""])
    lines.extend(markdown_table(["ID", "类型", "路径/URL", "用途"], source_rows(packet)))
    lines.extend(["", "#### 核心指标", ""])
    lines.extend(markdown_table(["指标", "状态", "数值", "置信度", "公式"], metric_rows(packet)))

    lines.extend(["", "### 离线材料索引", ""])
    lines.extend(markdown_table(["材料", "状态", "路径"], file_rows(packet)))

    lines.extend(["", "### 完整方案正文", ""])
    shifted_body = shift_markdown_headings(packet.proposal_body or "_未提供正文。_")
    lines.append(rewrite_markdown_image_links(shifted_body, packet, output_dir))
    lines.append("")


def render_markdown(packets: list[SubmissionPacket], title: str, output_dir: Path) -> str:
    lines = [
        f"# {title}",
        "",
        "> 本文件是维护者本地生成的专家离线评审包。它只整理投稿材料、风险、资料和正文，不替代人工评审，也不代表官方审定结论。",
        "",
        "## 包内方案",
        "",
    ]
    lines.extend(
        markdown_table(
            ["#", "方案", "作者", "展示状态", "正式评分", "路径"],
            [
                [
                    idx,
                    packet.title,
                    packet.owner,
                    packet.status_label,
                    readiness_label(packet.can_enter_formal_review),
                    packet.rel_dir,
                ]
                for idx, packet in enumerate(packets, 1)
            ],
        )
    )
    lines.extend(
        [
            "",
            "## 阅读顺序建议",
            "",
            "1. 先看“快速判断”确认投稿状态、是否可正式评分和版本。",
            "2. 再看“风险与待补条件”确认缺资料、边界、隐私、实施和运维风险。",
            "3. 查看“公开资料引用”和“核心指标”，判断证据链是否足够支撑方案。",
            "4. 最后阅读“完整方案正文”和原始 HTML/PDF 材料。",
            "",
        ]
    )
    for idx, packet in enumerate(packets, 1):
        append_packet_markdown(lines, packet, idx, output_dir)
    return "\n".join(lines).rstrip() + "\n"


def render_inline(value: str) -> str:
    escaped = html.escape(value)
    code_spans: list[str] = []

    def replace_code(match: re.Match[str]) -> str:
        marker = f"\x00CODE{len(code_spans)}\x00"
        code_spans.append(f"<code>{match.group(1)}</code>")
        return marker

    escaped = INLINE_CODE_RE.sub(replace_code, escaped)
    escaped = BOLD_RE.sub(lambda match: f"<strong>{match.group(1)}</strong>", escaped)

    def replace_ref(match: re.Match[str]) -> str:
        kind = match.group(1)
        ref = match.group(2)
        return f'<span class="evidence evidence-{kind}">[{kind}:{html.escape(ref)}]</span>'

    escaped = REFERENCE_RE.sub(replace_ref, escaped)
    for index, code_span in enumerate(code_spans):
        escaped = escaped.replace(f"\x00CODE{index}\x00", code_span)
    return escaped


def split_markdown_table_row(value: str) -> list[str] | None:
    stripped = value.strip()
    if "|" not in stripped:
        return None
    if stripped.startswith("|"):
        stripped = stripped[1:]
    if stripped.endswith("|") and not stripped.endswith(r"\|"):
        stripped = stripped[:-1]
    cells = re.split(r"(?<!\\)\|", stripped)
    if len(cells) < 2:
        return None
    return [cell.strip().replace(r"\|", "|") for cell in cells]


def is_markdown_table_separator(cells: list[str] | None) -> bool:
    return bool(cells) and all(TABLE_SEPARATOR_CELL_RE.fullmatch(cell) for cell in cells)


def image_src_for_packet(submission_dir: Path, output_dir: Path, raw_src: str) -> str | None:
    if re.match(r"^(?:https?:)?//", raw_src, re.I) or re.match(r"^(?:data|file|javascript):", raw_src, re.I):
        return None
    clean = raw_src.split("#", 1)[0].split("?", 1)[0]
    pure = PurePosixPath(clean)
    if pure.is_absolute() or ".." in pure.parts:
        return None
    image_path = submission_dir / pure.as_posix()
    if not image_path.exists():
        return None
    return safe_output_link(output_dir, image_path)


def render_proposal_body_html(packet: SubmissionPacket, output_dir: Path) -> str:
    blocks: list[str] = []
    paragraph: list[str] = []
    in_list = False

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            blocks.append(f"<p>{render_inline(' '.join(paragraph))}</p>")
            paragraph = []

    def close_list() -> None:
        nonlocal in_list
        if in_list:
            blocks.append("</ul>")
            in_list = False

    lines = packet.proposal_body.splitlines()
    index = 0
    while index < len(lines):
        raw_line = lines[index]
        line = raw_line.rstrip()
        header_cells = split_markdown_table_row(line)
        separator_cells = (
            split_markdown_table_row(lines[index + 1]) if index + 1 < len(lines) else None
        )
        if (
            header_cells
            and is_markdown_table_separator(separator_cells)
            and len(header_cells) == len(separator_cells or [])
        ):
            flush_paragraph()
            close_list()
            rows: list[list[str]] = []
            next_index = index + 2
            while next_index < len(lines):
                row = split_markdown_table_row(lines[next_index])
                if row is None or is_markdown_table_separator(row):
                    break
                if len(row) < len(header_cells):
                    row.extend([""] * (len(header_cells) - len(row)))
                rows.append(row[: len(header_cells)])
                next_index += 1
            blocks.append(html_table(header_cells, rows, render_cells=True))
            index = next_index
            continue

        index += 1
        if not line.strip():
            flush_paragraph()
            close_list()
            continue

        image_match = IMAGE_RE.fullmatch(line.strip())
        if image_match:
            flush_paragraph()
            close_list()
            alt = image_match.group(1).strip() or "proposal figure"
            src = image_src_for_packet(packet.submission_dir, output_dir, image_match.group(2).strip())
            if src:
                blocks.append(
                    '<figure class="proposal-figure">'
                    f'<img src="{html.escape(src)}" alt="{html.escape(alt)}">'
                    f"<figcaption>{html.escape(alt)}</figcaption>"
                    "</figure>"
                )
            else:
                blocks.append(f'<p class="warning">图片未纳入评审包：{html.escape(image_match.group(2).strip())}</p>')
            continue

        if line.startswith("#"):
            flush_paragraph()
            close_list()
            hashes = len(line) - len(line.lstrip("#"))
            level = min(hashes + 2, 6)
            title = line[hashes:].strip()
            blocks.append(f"<h{level}>{render_inline(title)}</h{level}>")
            continue

        if line.startswith("- "):
            flush_paragraph()
            if not in_list:
                blocks.append("<ul>")
                in_list = True
            blocks.append(f"<li>{render_inline(line[2:].strip())}</li>")
            continue

        paragraph.append(line.strip())

    flush_paragraph()
    close_list()
    return "\n".join(blocks) if blocks else "<p>未提供正文。</p>"


def html_table(
    headers: list[str], rows: list[list[Any]], *, render_cells: bool = False
) -> str:
    if not rows:
        return '<p class="empty">暂无。</p>'
    render = render_inline if render_cells else lambda value: html.escape(compact(value, 320))
    head = "".join(f"<th>{render(header)}</th>" for header in headers)
    body_rows = []
    for row in rows:
        cells = "".join(f"<td>{render(cell)}</td>" for cell in row)
        body_rows.append(f"<tr>{cells}</tr>")
    return f"<table><thead><tr>{head}</tr></thead><tbody>{''.join(body_rows)}</tbody></table>"


def render_packet_html_section(packet: SubmissionPacket, output_dir: Path, index: int) -> str:
    blockers = known_blockers(packet)
    blocker_html = ""
    if blockers:
        blocker_html = "<h3>已知阻断项</h3><ul>" + "".join(
            f"<li>{html.escape(item)}</li>" for item in blockers
        ) + "</ul>"
    summary_html = f"<p class=\"summary\">{html.escape(packet.summary)}</p>" if packet.summary else ""
    return f"""
<article class="proposal">
  <h2>{index}. {html.escape(packet.title)}</h2>
  {summary_html}
  <section class="quick-grid">
    <div><span>投稿路径</span><strong>{html.escape(packet.rel_dir)}</strong></div>
    <div><span>作者 / Agent</span><strong>{html.escape(packet.owner)} / {html.escape(packet.agent_name)}</strong></div>
    <div><span>展示状态</span><strong>{html.escape(packet.status_label)}</strong></div>
    <div><span>正式评分</span><strong>{html.escape(readiness_label(packet.can_enter_formal_review))}</strong></div>
    <div><span>阶段</span><strong>{html.escape(packet.stage)}</strong></div>
    <div><span>版本 / 迭代</span><strong>{html.escape(packet.version or '未声明')} / {html.escape(packet.iteration or '未声明')}</strong></div>
  </section>
  {blocker_html}
  <h3>风险与待补条件</h3>
  {html_table(["风险维度", "等级", "说明", "缓解方式"], risk_rows(packet)) if packet.risk_dimensions else '<p class="empty">未提供 risk.json。</p>'}
  <h4>假设与资料缺口</h4>
  {html_table(["ID", "状态", "说明", "影响"], assumption_rows(packet))}
  <h3>自检与证据链</h3>
  {html_table(["Check", "结果", "等级", "对象", "说明"], self_check_rows(packet)) if packet.self_check else '<p class="empty">未提供 self_check.json。</p>'}
  <h4>公开资料引用</h4>
  {html_table(["ID", "类型", "路径/URL", "用途"], source_rows(packet))}
  <h4>核心指标</h4>
  {html_table(["指标", "状态", "数值", "置信度", "公式"], metric_rows(packet))}
  <h3>离线材料索引</h3>
  {html_table(["材料", "状态", "路径"], file_rows(packet))}
  <h3>完整方案正文</h3>
  <section class="proposal-body">
  {render_proposal_body_html(packet, output_dir)}
  </section>
</article>
"""


def render_html(packets: list[SubmissionPacket], title: str, output_dir: Path) -> str:
    overview_rows = [
        [
            idx,
            packet.title,
            packet.owner,
            packet.status_label,
            readiness_label(packet.can_enter_formal_review),
            packet.rel_dir,
        ]
        for idx, packet in enumerate(packets, 1)
    ]
    sections = "\n".join(render_packet_html_section(packet, output_dir, idx) for idx, packet in enumerate(packets, 1))
    return f"""<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<style>
:root {{
  --ink: #172033;
  --muted: #5f6b7a;
  --line: #d7dee8;
  --paper: #ffffff;
  --bg: #f5f7fb;
  --accent: #1f5b7a;
  --soft: #eef5f8;
}}
* {{ box-sizing: border-box; }}
body {{
  margin: 0;
  color: var(--ink);
  background: var(--bg);
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif;
  line-height: 1.72;
}}
main {{
  max-width: 1120px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 42px 28px 80px;
  background: var(--paper);
}}
.cover {{
  border-bottom: 4px solid var(--accent);
  padding-bottom: 28px;
  margin-bottom: 28px;
}}
h1 {{ margin: 0 0 12px; font-size: 34px; line-height: 1.2; }}
h2 {{ margin: 42px 0 12px; font-size: 27px; line-height: 1.28; border-top: 1px solid var(--line); padding-top: 28px; }}
h3 {{ margin: 28px 0 10px; font-size: 21px; }}
h4 {{ margin: 22px 0 8px; font-size: 17px; color: #30465d; }}
p, li, td, th {{ font-size: 15px; }}
.lead {{ color: var(--muted); max-width: 860px; font-size: 17px; }}
.summary {{ color: var(--muted); font-size: 16px; max-width: 880px; }}
.quick-grid {{
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 18px 0 24px;
}}
.quick-grid div {{
  border: 1px solid var(--line);
  background: var(--soft);
  padding: 10px 12px;
  min-height: 76px;
}}
.quick-grid span {{
  display: block;
  color: var(--muted);
  font-size: 12px;
  margin-bottom: 4px;
}}
.quick-grid strong {{
  display: block;
  font-size: 14px;
  font-weight: 650;
  overflow-wrap: anywhere;
}}
table {{
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0 18px;
  table-layout: fixed;
}}
th, td {{
  border: 1px solid var(--line);
  padding: 8px 9px;
  vertical-align: top;
  overflow-wrap: anywhere;
}}
th {{
  text-align: left;
  color: #26394f;
  background: #eef2f7;
}}
code {{
  background: #eef2f7;
  color: #1d4f7a;
  padding: 0.08em 0.32em;
  border-radius: 4px;
}}
.empty, .warning {{
  color: var(--muted);
  background: #fafafa;
  border-left: 3px solid var(--line);
  padding: 8px 12px;
}}
.warning {{ border-left-color: #b7791f; }}
.evidence {{
  white-space: nowrap;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: #31506f;
  border-radius: 4px;
  padding: 0.03em 0.32em;
  font-size: 0.92em;
}}
.proposal-figure {{
  margin: 20px 0 26px;
  border: 1px solid var(--line);
  background: #f8fafc;
}}
.proposal-figure img {{
  display: block;
  width: 100%;
  height: auto;
}}
.proposal-figure figcaption {{
  border-top: 1px solid var(--line);
  color: var(--muted);
  padding: 8px 12px;
  font-size: 13px;
}}
@media print {{
  body {{ background: #fff; }}
  main {{ max-width: none; padding: 20mm 16mm; }}
  .proposal {{ break-before: page; }}
  h2, h3 {{ break-after: avoid; }}
  table, figure {{ break-inside: avoid; }}
}}
@media (max-width: 760px) {{
  main {{ padding: 28px 16px 60px; }}
  h1 {{ font-size: 27px; }}
  h2 {{ font-size: 23px; }}
  .quick-grid {{ grid-template-columns: 1fr; }}
  table {{ table-layout: auto; }}
}}
</style>
</head>
<body>
<main>
<section class="cover">
<h1>{html.escape(title)}</h1>
<p class="lead">本评审包由本地脚本整理生成，面向专家离线阅读。它汇总投稿状态、风险、公开资料、指标、关键文件和完整方案正文；不替代人工评审，也不代表官方审定结论。</p>
</section>
<h2>包内方案</h2>
{html_table(["#", "方案", "作者", "展示状态", "正式评分", "路径"], overview_rows)}
<h2>阅读顺序建议</h2>
<ol>
  <li>先看“快速判断”确认投稿状态、是否可正式评分和版本。</li>
  <li>再看“风险与待补条件”确认缺资料、边界、隐私、实施和运维风险。</li>
  <li>查看“公开资料引用”和“核心指标”，判断证据链是否足够支撑方案。</li>
  <li>最后阅读“完整方案正文”和原始 HTML/PDF 材料。</li>
</ol>
{sections}
</main>
</body>
</html>
"""


def render_manifest(packets: list[SubmissionPacket], files: dict[str, str]) -> dict[str, Any]:
    return {
        "schema_version": "0.1.0",
        "generated_by": "scripts/export_review_packet.py",
        "outputs": files,
        "submissions": [
            {
                "path": packet.rel_dir,
                "title": packet.title,
                "author": packet.owner,
                "status": packet.status_key,
                "can_enter_formal_review": packet.can_enter_formal_review,
            }
            for packet in packets
        ],
    }


def render_pdf(html_path: Path, pdf_path: Path, engine: str = "auto") -> None:
    engines = ["wkhtmltopdf", "chromium"] if engine == "auto" else [engine]
    errors = []
    for candidate in engines:
        if candidate == "wkhtmltopdf":
            binary = shutil.which("wkhtmltopdf")
            if not binary:
                errors.append("wkhtmltopdf not found")
                continue
            completed = subprocess.run(
                [binary, "--quiet", "--print-media-type", html_path.as_posix(), pdf_path.as_posix()],
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                check=False,
            )
        elif candidate == "chromium":
            binary = next(
                (
                    found
                    for name in ["chromium", "chromium-browser", "google-chrome", "google-chrome-stable"]
                    if (found := shutil.which(name))
                ),
                None,
            )
            if not binary:
                mac_chrome = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
                if mac_chrome.exists():
                    binary = mac_chrome.as_posix()
            if not binary:
                errors.append("chromium/google-chrome not found")
                continue
            completed = subprocess.run(
                [
                    binary,
                    "--headless",
                    "--disable-gpu",
                    f"--print-to-pdf={pdf_path.as_posix()}",
                    html_path.resolve().as_uri(),
                ],
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                check=False,
            )
        else:
            raise ReviewPacketError(f"unknown PDF engine: {engine}")
        if completed.returncode == 0 and pdf_path.exists():
            return
        errors.append((completed.stderr or completed.stdout or f"{candidate} failed").strip())
    raise ReviewPacketError(
        "PDF export requested but no working PDF engine was found. "
        "Install wkhtmltopdf or Chromium, or rerun without --pdf. "
        + "; ".join(error for error in errors if error)
    )


def export_review_packet(
    repo_root: Path,
    submission_dirs: list[Path],
    out_dir: Path,
    title: str,
    include_pdf: bool = False,
    pdf_engine: str = "auto",
) -> dict[str, str]:
    packets = [load_submission_packet(repo_root, path) for path in submission_dirs]
    out_dir.mkdir(parents=True, exist_ok=True)
    markdown_path = out_dir / "review-packet.md"
    html_path = out_dir / "review-packet.html"
    manifest_path = out_dir / "packet-manifest.json"
    markdown_path.write_text(render_markdown(packets, title, out_dir), encoding="utf-8")
    html_path.write_text(render_html(packets, title, out_dir), encoding="utf-8")
    files = {
        "markdown": markdown_path.as_posix(),
        "html": html_path.as_posix(),
        "manifest": manifest_path.as_posix(),
    }
    if include_pdf:
        pdf_path = out_dir / "review-packet.pdf"
        render_pdf(html_path, pdf_path, pdf_engine)
        files["pdf"] = pdf_path.as_posix()
    manifest_path.write_text(
        json.dumps(render_manifest(packets, files), ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return files


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("submission_dirs", nargs="*", help="Submission directories containing proposal.md")
    parser.add_argument("--all", action="store_true", help="Export every submissions/*/*/proposal.md package")
    parser.add_argument("--repo-root", default=".")
    parser.add_argument("--out", help="Output directory; defaults under .maintainer-review/")
    parser.add_argument("--title", default="专家离线评审包")
    parser.add_argument("--pdf", action="store_true", help="Also render review-packet.pdf when a local PDF engine is available")
    parser.add_argument("--pdf-engine", choices=["auto", "wkhtmltopdf", "chromium"], default="auto")
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    try:
        submission_dirs = normalize_submission_dirs(repo_root, args.submission_dirs, args.all)
        out_dir = Path(args.out).resolve() if args.out else default_out_dir(repo_root, submission_dirs, args.all)
        files = export_review_packet(
            repo_root=repo_root,
            submission_dirs=submission_dirs,
            out_dir=out_dir,
            title=args.title,
            include_pdf=args.pdf,
            pdf_engine=args.pdf_engine,
        )
    except ReviewPacketError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1
    print(out_dir)
    for label, path in files.items():
        print(f"{label}: {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
