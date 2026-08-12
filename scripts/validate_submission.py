#!/usr/bin/env python3
"""Validate Haidian AI proposal pull requests.

The validator is intentionally deterministic and dependency-free so it can run
on untrusted pull requests without installing contributor-controlled code.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path, PurePosixPath
from typing import Iterable


POLICY_ROOT = Path(__file__).resolve().parents[1]
PERSISTED_READINESS_CONTRACT = "persisted-self-check-v1"

REQUIRED_SECTIONS = [
    "设计依据与资料清单",
    "三层范围工作框架",
    "统筹研究范围产业与未来城市研究",
    "总体设计范围城市更新与控规深度城市设计",
    "重点区域详细设计",
    "AI 创新生态、人才画像与 AI+ 场景",
    "用地、建筑规模与拆改留方案",
    "交通、轨道、市政与公共服务设施",
    "蓝绿空间、公共空间与城市风貌",
    "更新项目清单、实施政策与分期计划",
    "指标体系、面积复算与合规矩阵",
    "风险、版权与合规说明",
    "参考资料",
]
REQUIRED_SECTIONS_EN = [
    "Design Basis and Source List",
    "Three-Level Scope Framework",
    "Coordinated Research Area: Industry and Future City Research",
    "Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design",
    "Detailed Design of Key Areas",
    "AI Innovation Ecosystem, Personas, and AI+ Scenarios",
    "Land Use, Building Scale, and Retain-Renovate-Demolish Strategy",
    "Transport, Rail, Municipal Infrastructure, and Public Services",
    "Blue-Green Network, Public Space, and Urban Character",
    "Renewal Projects, Implementation Policy, and Phasing",
    "Metrics, Area Recalculation, and Compliance Matrix",
    "Risk, Copyright, and Compliance",
    "References",
]

OFFICIAL_REQUIRED_TASK_IDS = {
    "1.3.1",
    "1.3.2",
    "1.3.3",
    "1.4.1",
    "1.4.2",
    "1.4.3",
    "1.5.1.1",
    "1.5.1.2",
    "1.5.2.1",
    "1.5.2.2",
    "1.5.2.3",
    "1.5.2.4",
    "1.5.2.5",
    "1.5.3.required",
    "1.5.3.1",
    "1.5.3.2",
    "1.5.3.3",
}
AGENT_OPEN_CALL_REQUIRED_TASK_IDS = {
    "agent.1",
    "agent.2",
    "agent.3",
    "agent.4",
    "agent.5",
    "agent.6",
}
ALL_REQUIRED_TASK_IDS = OFFICIAL_REQUIRED_TASK_IDS | AGENT_OPEN_CALL_REQUIRED_TASK_IDS

GITHUB_LOGIN_RE = re.compile(r"^[A-Za-z0-9-]{1,39}$")
PROPOSAL_SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]{2,63}$")
TRACK_ID_RE = re.compile(r"^[a-z0-9][a-z0-9-]{2,63}$")
SCENARIO_ID_RE = re.compile(r"^[a-z0-9][a-z0-9-]{2,63}$")
MODEL_FAMILY_VALUES = {
    "gpt",
    "claude",
    "deepseek",
    "qwen",
    "glm",
    "kimi",
    "grok",
    "other",
}
MODEL_DISCLOSURE_PLACEHOLDERS = {
    "agent-declared-model",
    "replace-with-declared-model",
    "replace-with-your-model",
}
SPATIAL_ITEM_ID_RE = re.compile(r"^[a-z0-9][a-z0-9-]{2,63}$")
ITERATION_RE = re.compile(r"^v?\d+(?:\.\d+){0,2}(?:[-+][A-Za-z0-9.-]+)?$")
CHANGELOG_VERSION_HEADING_RE = re.compile(r"^##\s+v?\d+(?:\.\d+){0,2}\s+-\s+\d{4}-\d{2}-\d{2}\s*$")
ALLOWED_ASSET_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}
ALLOWED_VIDEO_EXTENSIONS = {".mp4", ".webm"}
ALLOWED_AUDIO_EXTENSIONS = {".mp3", ".m4a", ".ogg"}
ALLOWED_MEDIA_SIDECAR_EXTENSIONS = {".vtt", ".md"}
ALLOWED_MEDIA_EXTENSIONS = (
    ALLOWED_VIDEO_EXTENSIONS | ALLOWED_AUDIO_EXTENSIONS | ALLOWED_MEDIA_SIDECAR_EXTENSIONS
)
ALLOWED_MEDIA_FILE_EXTENSIONS = ALLOWED_MEDIA_EXTENSIONS | ALLOWED_ASSET_EXTENSIONS
ALLOWED_DRAWING_EXTENSIONS = {".pdf"}
PACKAGE_ROOT_JSON_FILES = {
    "manifest.json",
    "agent.json",
    "metrics.json",
    "assumptions.json",
    "sources.json",
    "self_check.json",
    "compliance_matrix.json",
    "standard_matrix.json",
    "design_depth_matrix.json",
}
RISK_DIMENSIONS = {
    "data_privacy": "数据隐私",
    "implementation_complexity": "实施复杂度",
    "public_acceptance": "公众接受度",
    "operations_cost": "运维成本",
    "policy_uncertainty": "政策不确定性",
    "spatial_dispute": "空间争议",
    "technology_maturity": "技术成熟度",
    "equity_inclusion": "公平与包容性",
}
REQUIRED_AI_PACKAGE_FILES = {
    "manifest.json",
    "agent.json",
    "metrics.json",
    "assumptions.json",
    "sources.json",
    "self_check.json",
    "compliance_matrix.json",
    "standard_matrix.json",
    "design_depth_matrix.json",
    "geometry/site_boundary.geojson",
    "geometry/key_areas.geojson",
    "geometry/land_use.geojson",
    "geometry/buildings.geojson",
    "geometry/roads.geojson",
    "geometry/green_space.geojson",
    "geometry/public_space.geojson",
    "geometry/constraints.geojson",
    "geometry/phasing.geojson",
    "report/proposal.html",
    "report/copyright_statement.md",
    "drawings/a3-booklet.pdf",
    "drawings/a0-boards.pdf",
    "visual/index.html",
}
ALLOWED_GEOMETRY_FILES = {
    "site_boundary.geojson",
    "key_areas.geojson",
    "land_use.geojson",
    "buildings.geojson",
    "roads.geojson",
    "green_space.geojson",
    "public_space.geojson",
    "constraints.geojson",
    "phasing.geojson",
}
ALLOWED_REPORT_FILES = {
    "proposal.html",
    "proposal.zh.html",
    "proposal.en.html",
    "narrative.md",
    "copyright_statement.md",
}
ALLOWED_VISUAL_ASSET_EXTENSIONS = {".css", ".js", ".json", ".svg", ".png", ".jpg", ".jpeg", ".webp"}
PARTICIPANT_PROTECTED_GLOBAL_FILES = {
    "submissions-data.js",
    "gallery-publication.json",
}
MAINTAINER_CONTROLLED_SUBMISSIONS_ROOT_FILES = {
    "submissions/README.md",
}
PROTECTED_REVIEW_ARTIFACT_PREFIXES = (
    ".maintainer-review/",
    "docs/reviews/",
)
SUBMISSION_STAGES = {"formal"}
FORMAL_NONEMPTY_GEOMETRY_FILES = {
    "site_boundary.geojson",
    "key_areas.geojson",
    "land_use.geojson",
    "roads.geojson",
    "green_space.geojson",
    "public_space.geojson",
    "phasing.geojson",
}
# constraints.geojson is deliberately absent from FORMAL_NONEMPTY_GEOMETRY_FILES: with no official
# regulatory-control geometry published for this site, an empty constraint layer is a legitimate and
# accepted outcome. The advisory below never changes that; it only asks that the gap be recorded
# somewhere machine-readable, so "deliberately empty" is distinguishable from "never looked at".
CONSTRAINTS_DATA_GAP_DECLARATION_KEYS = (
    "data_gap",
    "data_gaps",
    "missing_official_layers",
    "constraint_status",
)
CONSTRAINTS_GAP_ASSUMPTION_ID_PATTERN = re.compile(r"control|constraint|regulat", re.IGNORECASE)
CONSTRAINTS_GAP_ASSUMPTION_TERMS = (
    "regulatory control",
    "regulatory plan",
    "control plan",
    "statutory control",
    "road redline",
    "road red line",
    "redline",
    "red line",
    "constraint",
    "控规",
    "管控",
    "红线",
    "约束",
    "控制线",
    "文保",
)
TRUSTED_BOUNDARY_SOURCE_TYPES = {
    "official_public",
    "official_open_data",
    "user_provided_cleared",
}
PROVISIONAL_BOUNDARY_SOURCE_TYPES = {
    "agent_inferred_from_public_data",
    "osm",
    "user_provided_cleared",
}
REVIEW_READY_STAGES = {"formal"}
PROPOSAL_READABLE_DATA_REFS = {
    "geometry/site_boundary.geojson",
    "geometry/key_areas.geojson",
    "geometry/land_use.geojson",
    "geometry/buildings.geojson",
    "geometry/roads.geojson",
    "geometry/green_space.geojson",
    "geometry/public_space.geojson",
    "geometry/constraints.geojson",
    "geometry/phasing.geojson",
}
REQUIRED_PROPOSAL_IMAGE_PATHS = {
    "assets/figures/site-overview.png",
    "assets/figures/land-use-structure.png",
    "assets/figures/key-areas.png",
    "assets/figures/mobility-bluegreen.png",
    "assets/figures/metrics-evidence.png",
}
FALLBACK_REQUIRED_STANDARD_IDS = {
    "PROJECT-OFFICIAL-ANNOUNCEMENT",
    "PROJECT-AGENT-OPEN-CALL-TASKBOOK",
    "MOHURD-URBAN-DESIGN-MEASURES",
    "MOHURD-CONTROL-DETAILED-PLANNING",
    "MNR-LAND-USE-CLASSIFICATION-GUIDE",
}
REQUIRED_DESIGN_DEPTH_IDS = {
    "existing_conditions_diagnosis",
    "three_level_scope_framework",
    "overall_spatial_structure",
    "land_use_layout",
    "development_intensity_controls",
    "height_massing_character",
    "retain_renovate_demolish",
    "traffic_rail_slow_parking",
    "municipal_new_infrastructure",
    "blue_green_public_space",
    "three_key_area_detailed_design",
    "renewal_project_list",
    "phasing_implementation",
    "metrics_recalculation",
    "risk_missing_data",
}
REFERENCE_RE = re.compile(r"\[(source|standard|depth|data|metric):([^\]\s]+)\]")
PROPOSAL_FORMAT_VERSION = "2"
BILINGUAL_CONTRACT_VERSION = "1"
MAX_INLINE_REFERENCES_PER_BLOCK = 8
MAX_CONSECUTIVE_REFERENCES = 3
MARKDOWN_IMAGE_RE = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
MAX_MARKDOWN_BYTES = 256 * 1024
MAX_JSON_BYTES = 512 * 1024
MAX_GEOJSON_BYTES = 10 * 1024 * 1024
MAX_ASSET_BYTES = 5 * 1024 * 1024
MAX_VIDEO_BYTES = 20 * 1024 * 1024
MAX_AUDIO_BYTES = 8 * 1024 * 1024
MAX_DRAWING_BYTES = 10 * 1024 * 1024
MAX_HTML_BYTES = 2 * 1024 * 1024
MAX_VISUAL_ASSET_BYTES = 5 * 1024 * 1024
MAX_TOTAL_BYTES = 40 * 1024 * 1024
MIN_FORMAL_PROPOSAL_COMPACT_CHARS = 5000
MIN_REQUIRED_SECTION_COMPACT_CHARS = 280
MIN_ENGLISH_PROPOSAL_LETTERS = 2000
MAX_TRACKS_PER_PROPOSAL = 3
MAX_SCENARIOS_PER_PROPOSAL = 8
MIN_RISK_SCORE = 1
MAX_RISK_SCORE = 5
HIGH_RISK_SCORE = 4
SPATIAL_ITEM_TYPES = {"node", "corridor", "area"}
SPATIAL_PUBLIC_LEVELS = {"public", "cleared", "provisional"}

PLACEHOLDERS = [
    "your-github-login",
    "方案标题",
    "用 200-400 字说明",
    "请用 3-5 句话",
]

HARD_RISK_PATTERNS = [
    (re.compile(r"\b\d{17}[\dXx]\b"), "疑似身份证号码"),
    (re.compile(r"(?<!\d)1[3-9]\d{9}(?!\d)"), "疑似手机号"),
    (re.compile(r"(已获|已经获得).{0,12}(政府|官方).{0,12}(批准|背书|认可)"), "疑似伪造官方批准或背书"),
]

SOFT_RISK_PATTERNS = [
    (re.compile(r"(内部资料|内部数据|涉密|保密图件|非公开空间数据|未公开图件|绝密|机密)"), "可能涉及非公开或敏感资料"),
    (re.compile(r"(无需审批|保证落地|一定实施)"), "可能存在不可执行承诺"),
]

FORBIDDEN_HTML_PATTERNS = [
    (re.compile(r"<script\b", re.I), "HTML report must not contain scripts"),
    (re.compile(r"<iframe\b", re.I), "HTML report must not contain iframe embeds"),
    (re.compile(r"<form\b", re.I), "HTML report must not contain form submission UI"),
    (re.compile(r"\bfetch\s*\(", re.I), "HTML report must not call fetch()"),
    (re.compile(r"\bXMLHttpRequest\b", re.I), "HTML report must not use XMLHttpRequest"),
    (re.compile(r"\bWebSocket\b", re.I), "HTML report must not open WebSocket connections"),
    (re.compile(r"\bsendBeacon\s*\(", re.I), "HTML report must not send beacon requests"),
    (re.compile(r"(?:src|href)\s*=\s*['\"]?(?:https?:)?//", re.I), "HTML report must not load remote resources"),
    (re.compile(r"url\s*\(\s*['\"]?(?:https?:)?//", re.I), "HTML report CSS must not load remote assets"),
]
FORBIDDEN_VISUAL_HTML_PATTERNS = [
    (re.compile(r"<iframe\b", re.I), "visual HTML must not contain iframe embeds"),
    (re.compile(r"<form\b", re.I), "visual HTML must not contain form submission UI"),
    (re.compile(r"\bfetch\s*\(", re.I), "visual HTML must not call fetch()"),
    (re.compile(r"\bXMLHttpRequest\b", re.I), "visual HTML must not use XMLHttpRequest"),
    (re.compile(r"\bWebSocket\b", re.I), "visual HTML must not open WebSocket connections"),
    (re.compile(r"\bEventSource\b", re.I), "visual HTML must not open EventSource connections"),
    (re.compile(r"\bsendBeacon\s*\(", re.I), "visual HTML must not send beacon requests"),
    (re.compile(r"@import\s+url\s*\(\s*['\"]?(?:https?:)?//", re.I), "visual HTML/CSS must not import remote styles"),
    (re.compile(r"url\s*\(\s*['\"]?(?:https?:)?//", re.I), "visual HTML CSS must not load remote assets"),
    (re.compile(r"<script\b[^>]*\bsrc\s*=\s*['\"]?(?:https?:)?//", re.I), "visual HTML must not load remote scripts"),
    (re.compile(r"<link\b[^>]*\bhref\s*=\s*['\"]?(?:https?:)?//", re.I), "visual HTML must not load remote linked resources"),
    (re.compile(r"<(?:img|source|video|audio)\b[^>]*\bsrc\s*=\s*['\"]?(?:https?:)?//", re.I), "visual HTML must not load remote media"),
    (re.compile(r"<(?:video|audio)\b[^>]*\bautoplay\b", re.I), "visual HTML must not autoplay media"),
]


@dataclass
class ValidationReport:
    ok: bool = True
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    proposal_files: list[str] = field(default_factory=list)
    changelog_files: list[str] = field(default_factory=list)
    changed_files: list[str] = field(default_factory=list)
    ai_package_stages: dict[str, str] = field(default_factory=dict)
    total_bytes: int = 0
    maintainer_bypass: bool = False
    strict_manifest_paths: set[str] = field(default_factory=set)

    def add_error(self, message: str) -> None:
        self.ok = False
        self.errors.append(message)

    def add_warning(self, message: str) -> None:
        self.warnings.append(message)

    def to_dict(self) -> dict:
        return {
            "ok": self.ok,
            "errors": self.errors,
            "warnings": self.warnings,
            "proposal_files": self.proposal_files,
            "changelog_files": self.changelog_files,
            "changed_files": self.changed_files,
            "ai_package_stages": self.ai_package_stages,
            "total_bytes": self.total_bytes,
            "maintainer_bypass": self.maintainer_bypass,
        }


def normalize_changed_path(raw_path: str) -> str:
    raw_path = raw_path.strip().replace("\\", "/")
    if not raw_path:
        raise ValueError("empty changed path")
    path = PurePosixPath(raw_path)
    if path.is_absolute() or ".." in path.parts:
        raise ValueError(f"unsafe path: {raw_path}")
    return path.as_posix()


def first_symbolic_link(repo_root: Path, relative_path: str) -> Path | None:
    """Return the first symlink traversed by a repository-relative path."""
    candidate = repo_root
    for part in PurePosixPath(relative_path).parts:
        candidate /= part
        if candidate.is_symlink():
            return candidate
    return None


def report_symbolic_link(report: ValidationReport, repo_root: Path, path: Path) -> None:
    relative = path.relative_to(repo_root).as_posix()
    report.add_error(f"{relative}: symbolic links are not allowed in submission packages")


def submission_directory_is_safe(
    report: ValidationReport, repo_root: Path, proposal_dir: str
) -> bool:
    """Reject symlinks before a package validator reads package-controlled files."""
    linked_path = first_symbolic_link(repo_root, proposal_dir)
    if linked_path is not None:
        report_symbolic_link(report, repo_root, linked_path)
        return False

    base = repo_root / proposal_dir
    if not base.exists():
        return True
    for directory, names, files in os.walk(base, followlinks=False):
        for name in [*names, *files]:
            candidate = Path(directory) / name
            if candidate.is_symlink():
                report_symbolic_link(report, repo_root, candidate)
                return False
    return True


def load_changed_files(args: argparse.Namespace) -> list[str]:
    files: list[str] = []
    files.extend(args.changed_file or [])
    if args.changed_files_list:
        files.extend(Path(args.changed_files_list).read_text(encoding="utf-8").splitlines())
    if not files and not sys.stdin.isatty():
        files.extend(sys.stdin.read().splitlines())
    normalized = []
    for item in files:
        if item.strip():
            normalized.append(normalize_changed_path(item))
    return sorted(dict.fromkeys(normalized))


def parse_front_matter(text: str) -> tuple[dict[str, str], str]:
    text = text.lstrip("\ufeff\n")
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---", 4)
    if end == -1:
        return {}, text
    raw = text[4:end].strip()
    body = text[end + len("\n---") :].lstrip("\n")
    metadata: dict[str, str] = {}
    for line in raw.splitlines():
        line = line.strip()
        if not line or line.startswith("#") or ":" not in line:
            continue
        key, value = line.split(":", 1)
        value = value.strip().strip('"').strip("'")
        metadata[key.strip()] = value
    return metadata, body


def requires_bilingual_display(repo_root: Path, proposal_dir: str) -> bool:
    """Return whether the proposal explicitly opts into the blocking contract.

    Historical v1 and early v2 packages remain valid without being rewritten.
    New scaffolds declare the independent bilingual contract version so future
    format revisions do not accidentally redefine the migration boundary.
    """
    proposal_path = repo_root / proposal_dir / "proposal.md"
    if not proposal_path.is_file():
        return False
    try:
        metadata, _ = parse_front_matter(proposal_path.read_text(encoding="utf-8"))
    except UnicodeDecodeError:
        return False
    return requires_bilingual_contract(metadata)


def parse_track_metadata(raw_value: object) -> list[str]:
    if raw_value is None:
        return []
    if isinstance(raw_value, list):
        return [str(item).strip() for item in raw_value if str(item).strip()]
    raw = str(raw_value).strip()
    if not raw:
        return []
    if raw.startswith("[") and raw.endswith("]"):
        try:
            parsed = json.loads(raw)
        except json.JSONDecodeError:
            parsed = None
        if isinstance(parsed, list):
            return [str(item).strip() for item in parsed if str(item).strip()]
        raw = raw[1:-1]
    return [
        item.strip().strip('"').strip("'")
        for item in raw.split(",")
        if item.strip().strip('"').strip("'")
    ]


def load_track_registry(repo_root: Path) -> dict[str, dict[str, object]]:
    track_path = policy_file(repo_root, "tracks.json")
    if not track_path.exists():
        return {}
    try:
        data = json.loads(track_path.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return {}
    tracks = data.get("tracks")
    if not isinstance(tracks, list):
        return {}
    registry: dict[str, dict[str, object]] = {}
    for item in tracks:
        if not isinstance(item, dict):
            continue
        track_id = str(item.get("id", "")).strip()
        if track_id:
            registry[track_id] = item
    return registry


def load_scenario_registry(repo_root: Path) -> dict[str, dict[str, object]]:
    scenarios_dir = policy_file(repo_root, "scenarios")
    if not scenarios_dir.exists() or not scenarios_dir.is_dir():
        return {}
    registry: dict[str, dict[str, object]] = {}
    for path in sorted(scenarios_dir.glob("*.json")):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            continue
        if not isinstance(data, dict):
            continue
        scenario_id = str(data.get("id", "")).strip()
        if scenario_id:
            registry[scenario_id] = data
    return registry


def validate_track_metadata(
    report: ValidationReport,
    repo_root: Path,
    proposal_path: str,
    raw_value: object,
) -> None:
    tracks = parse_track_metadata(raw_value)
    if not tracks:
        return
    if len(tracks) > MAX_TRACKS_PER_PROPOSAL:
        report.add_error(
            f"{proposal_path}: tracks may include at most {MAX_TRACKS_PER_PROPOSAL} track IDs"
        )
    if len(set(tracks)) != len(tracks):
        report.add_error(f"{proposal_path}: tracks must not contain duplicate IDs")

    registry = load_track_registry(repo_root)
    if not registry:
        report.add_error(f"{proposal_path}: tracks registry is missing or invalid")
        return
    for track_id in tracks:
        if not TRACK_ID_RE.match(track_id):
            report.add_error(
                f"{proposal_path}: track id `{track_id}` must use lowercase letters, digits, and hyphens"
            )
        elif track_id not in registry:
            report.add_error(f"{proposal_path}: unknown track id `{track_id}`")


def validate_scenario_metadata(
    report: ValidationReport,
    repo_root: Path,
    proposal_path: str,
    raw_value: object,
) -> None:
    scenarios = parse_track_metadata(raw_value)
    if not scenarios:
        return
    if len(scenarios) > MAX_SCENARIOS_PER_PROPOSAL:
        report.add_error(
            f"{proposal_path}: scenarios may include at most {MAX_SCENARIOS_PER_PROPOSAL} scenario IDs"
        )
    if len(set(scenarios)) != len(scenarios):
        report.add_error(f"{proposal_path}: scenarios must not contain duplicate IDs")

    registry = load_scenario_registry(repo_root)
    if not registry:
        report.add_error(f"{proposal_path}: scenario registry is missing or invalid")
        return
    for scenario_id in scenarios:
        if not SCENARIO_ID_RE.match(scenario_id):
            report.add_error(
                f"{proposal_path}: scenario id `{scenario_id}` must use lowercase letters, digits, and hyphens"
            )
        elif scenario_id not in registry:
            report.add_error(f"{proposal_path}: unknown scenario id `{scenario_id}`")


def extract_headings(text: str) -> list[str]:
    headings = []
    for line in text.splitlines():
        match = re.match(r"^##\s+(.+?)\s*$", line)
        if match:
            headings.append(match.group(1).strip())
    return headings


def extract_section_bodies(text: str) -> dict[str, str]:
    sections: dict[str, list[str]] = {}
    current: str | None = None
    for line in text.splitlines():
        match = re.match(r"^##\s+(.+?)\s*$", line)
        if match:
            current = match.group(1).strip()
            sections.setdefault(current, [])
            continue
        if current is not None:
            sections[current].append(line)
    return {heading: "\n".join(lines).strip() for heading, lines in sections.items()}


def extract_reference_values(text: str) -> dict[str, set[str]]:
    refs: dict[str, set[str]] = {
        "source": set(),
        "standard": set(),
        "depth": set(),
        "data": set(),
        "metric": set(),
    }
    for kind, value in REFERENCE_RE.findall(text):
        refs[kind].add(value)
    return refs


def has_readability_reference(text: str) -> bool:
    return bool(REFERENCE_RE.search(text))


def proposal_format_version(metadata: dict[str, str]) -> str:
    """Return the explicit proposal contract version, preserving legacy files as v1."""
    return metadata.get("proposal_format_version", "1").strip() or "1"


def requires_bilingual_contract(metadata: dict[str, str]) -> bool:
    """Return whether a v2 proposal explicitly accepts the bilingual gate."""
    return (
        proposal_format_version(metadata) == PROPOSAL_FORMAT_VERSION
        and metadata.get("bilingual_contract_version") == BILINGUAL_CONTRACT_VERSION
    )


def reference_density_issues(body: str) -> list[str]:
    """Find evidence dumps that interrupt the human reading layer."""
    issues: list[str] = []
    for block in re.split(r"\n\s*\n", body):
        lines = [line for line in block.splitlines() if line.strip()]
        structured_lines = sum(
            1
            for line in lines
            if line.lstrip().startswith(("|", "- ", "* ", "+ "))
            or re.match(r"^\s*\d+[.)]\s+", line)
        )
        # A table or reference list may legitimately contain many rows. Apply
        # density limits per row/item instead of treating the whole structure
        # as one prose paragraph.
        units = lines if len(lines) >= 2 and structured_lines >= 2 else [block]
        for unit in units:
            refs = list(REFERENCE_RE.finditer(unit))
            if len(refs) > MAX_INLINE_REFERENCES_PER_BLOCK:
                issues.append(
                    f"a paragraph/block contains {len(refs)} evidence markers; keep the full index in structured files"
                )
                continue
            longest = 0
            run = 0
            previous: re.Match[str] | None = None
            for match in refs:
                if previous is None:
                    run = 1
                else:
                    separator = unit[previous.end() : match.start()]
                    if len(separator) <= 12 and re.fullmatch(r"[\s、,，;；:/和与&+]*", separator):
                        run += 1
                    else:
                        run = 1
                longest = max(longest, run)
                previous = match
            if longest > MAX_CONSECUTIVE_REFERENCES:
                issues.append(
                    f"a paragraph/block contains {longest} consecutive evidence markers; attach no more than {MAX_CONSECUTIVE_REFERENCES} to one claim"
                )
    return list(dict.fromkeys(issues))


def is_under_assets(parts: list[str]) -> bool:
    return len(parts) >= 5 and parts[3] == "assets"


def is_under_media(parts: list[str]) -> bool:
    return len(parts) == 6 and parts[3] == "assets" and parts[4] == "media"


def media_signature_is_valid(path: Path) -> bool:
    extension = path.suffix.lower()
    data = path.read_bytes()[:16]
    if extension in {".mp4", ".m4a"}:
        return len(data) >= 8 and data[4:8] == b"ftyp"
    if extension == ".webm":
        return data.startswith(b"\x1a\x45\xdf\xa3")
    if extension == ".mp3":
        return data.startswith(b"ID3") or (
            len(data) >= 2 and data[0] == 0xFF and data[1] & 0xE0 == 0xE0
        )
    if extension == ".ogg":
        return data.startswith(b"OggS")
    return True


def validate_media_manifest_entries(
    report: ValidationReport,
    repo_root: Path,
    proposal_dir: str,
    files: list[object],
    listed_paths: set[str],
) -> None:
    entries: dict[str, dict] = {}
    for item in files:
        if not isinstance(item, dict) or not isinstance(item.get("path"), str):
            continue
        try:
            safe_path = normalize_changed_path(item["path"])
        except ValueError:
            # The main manifest loop reports the unsafe path. Never inspect it here.
            continue
        entries[safe_path] = item
    media_roles = {"video", "audio", "media_poster", "caption_track", "transcript"}
    for rel_path, item in entries.items():
        role = item.get("role")
        extension = Path(rel_path).suffix.lower()
        if role not in media_roles and not rel_path.startswith("assets/media/"):
            continue
        if not rel_path.startswith("assets/media/") or extension not in ALLOWED_MEDIA_FILE_EXTENSIONS:
            report.add_error(
                f"{proposal_dir}/manifest.json: media `{rel_path}` must stay under assets/media/ with a supported extension"
            )
            continue
        expected_role = (
            "video"
            if extension in ALLOWED_VIDEO_EXTENSIONS
            else "audio"
            if extension in ALLOWED_AUDIO_EXTENSIONS
            else "caption_track"
            if extension == ".vtt"
            else "transcript"
            if extension == ".md"
            else "media_poster"
        )
        if role != expected_role:
            report.add_error(
                f"{proposal_dir}/manifest.json: `{rel_path}` must use role={expected_role}"
            )
            continue
        repository_path = f"{proposal_dir}/{rel_path}"
        linked_path = first_symbolic_link(repo_root, repository_path)
        if linked_path is not None:
            report_symbolic_link(report, repo_root, linked_path)
            continue
        full_path = repo_root / repository_path
        if not full_path.is_file():
            continue
        if extension in ALLOWED_VIDEO_EXTENSIONS | ALLOWED_AUDIO_EXTENSIONS:
            if not media_signature_is_valid(full_path):
                report.add_error(
                    f"{proposal_dir}/manifest.json: `{rel_path}` does not match its declared media container"
                )
            for field in ("title_zh", "title_en", "description_zh", "description_en"):
                value = item.get(field)
                if not isinstance(value, str) or len(value.strip()) < 2:
                    report.add_error(
                        f"{proposal_dir}/manifest.json: media `{rel_path}` needs {field}"
                    )
            required_refs = ["transcript"]
            if role == "video":
                required_refs.extend(["poster", "caption"])
            for field in required_refs:
                reference = item.get(field)
                if not isinstance(reference, str) or reference not in listed_paths:
                    report.add_error(
                        f"{proposal_dir}/manifest.json: media `{rel_path}` needs a manifest-listed {field}"
                    )
                    continue
                referenced_role = entries.get(reference, {}).get("role")
                expected_ref_role = {
                    "poster": "media_poster",
                    "caption": "caption_track",
                    "transcript": "transcript",
                }[field]
                if referenced_role != expected_ref_role:
                    report.add_error(
                        f"{proposal_dir}/manifest.json: media `{rel_path}` {field} must reference role={expected_ref_role}"
                    )
        elif role == "caption_track":
            try:
                if not full_path.read_text(encoding="utf-8").lstrip().startswith("WEBVTT"):
                    report.add_error(
                        f"{proposal_dir}/manifest.json: caption `{rel_path}` must be UTF-8 WebVTT"
                    )
            except UnicodeDecodeError:
                report.add_error(
                    f"{proposal_dir}/manifest.json: caption `{rel_path}` must be UTF-8 WebVTT"
                )
        elif role == "transcript":
            try:
                if len(full_path.read_text(encoding="utf-8").strip()) < 20:
                    report.add_error(
                        f"{proposal_dir}/manifest.json: transcript `{rel_path}` must describe the media content"
                    )
            except UnicodeDecodeError:
                report.add_error(
                    f"{proposal_dir}/manifest.json: transcript `{rel_path}` must be UTF-8 Markdown"
                )


def is_under_geometry(parts: list[str]) -> bool:
    return len(parts) == 5 and parts[3] == "geometry"


def is_under_drawings(parts: list[str]) -> bool:
    return len(parts) == 5 and parts[3] == "drawings"


def is_empty_pdf(data: bytes) -> bool:
    """Detect zero-page placeholder PDFs.

    Catches the scaffold placeholder (a page tree with ``/Count 0``) and tiny
    stub PDFs with no page objects. Real multi-page boards have ``/Count`` > 0
    or embedded ``/Type /Page`` objects, so this avoids false positives on
    legitimate drawings.
    """
    if not data.startswith(b"%PDF"):
        return False
    if re.search(rb"/Count\s+0\b", data):
        return True
    has_page = re.search(rb"/Type\s*/Page\b", data) is not None
    return not has_page and len(data) < 2048


def is_under_report(parts: list[str]) -> bool:
    return len(parts) == 5 and parts[3] == "report"


def is_visual_index(parts: list[str]) -> bool:
    return (
        len(parts) == 5
        and parts[3] == "visual"
        and parts[4] in {"index.html", "index.zh.html", "index.en.html"}
    )


def is_under_visual_assets(parts: list[str]) -> bool:
    return len(parts) >= 6 and parts[3] == "visual" and parts[4] == "assets"


def proposal_dir_from_submission_path(path: str) -> str | None:
    parts = path.split("/")
    if len(parts) >= 3 and parts[0] == "submissions":
        return "/".join(parts[:3])
    return None


DISPLAY_BASE_FILES = {
    "proposal.md",
    "report/proposal.html",
    "visual/index.html",
    "drawings/a3-booklet.pdf",
    "drawings/a0-boards.pdf",
}


def localized_path(path: str, language: str) -> str:
    pure = PurePosixPath(path)
    suffix = pure.suffix
    return pure.with_name(f"{pure.stem}.{language}{suffix}").as_posix()


def is_localized_display_path(path: str) -> bool:
    return bool(re.search(r"\.(?:zh|en)\.(?:md|html|pdf|png|jpe?g|webp|gif|svg)$", path, re.I))


def primary_path_from_localized(path: str) -> tuple[str, str] | None:
    pure = PurePosixPath(path)
    match = re.match(r"^(.+)\.(zh|en)(\.[^.]+)$", pure.name, re.I)
    if not match:
        return None
    primary_name = match.group(1) + match.group(3)
    return pure.with_name(primary_name).as_posix(), match.group(2).lower()


def is_display_material(path: str) -> bool:
    if path in DISPLAY_BASE_FILES or is_localized_display_path(path):
        return True
    return path.startswith("assets/figures/") and Path(path).suffix.lower() in ALLOWED_ASSET_EXTENSIONS


def relative_to_proposal(path: str, proposal_dir: str) -> str:
    prefix = proposal_dir.rstrip("/") + "/"
    return path[len(prefix) :] if path.startswith(prefix) else path


def load_json_file(report: ValidationReport, path: Path, display_path: str) -> object | None:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except UnicodeDecodeError:
        report.add_error(f"{display_path}: JSON files must be UTF-8 text")
    except json.JSONDecodeError as exc:
        report.add_error(f"{display_path}: invalid JSON: {exc.msg} at line {exc.lineno}")
    return None


def validate_agent_disclosure(
    report: ValidationReport, data: object, display_path: str
) -> None:
    """Validate optional machine-readable model disclosure without breaking legacy packages."""
    if not isinstance(data, dict):
        return
    family = data.get("model_family")
    detail = data.get("model_detail")
    if family is None and detail is None:
        return
    if family is None:
        report.add_error(f"{display_path}: model_detail requires model_family")
    elif not isinstance(family, str) or family not in MODEL_FAMILY_VALUES:
        allowed = ", ".join(sorted(MODEL_FAMILY_VALUES))
        report.add_error(f"{display_path}: model_family must be one of: {allowed}")
    if detail is None:
        report.add_error(f"{display_path}: model_family requires model_detail")
    elif not isinstance(detail, str) or len(detail.strip()) < 2:
        report.add_error(f"{display_path}: model_detail must be a non-empty string")
    elif detail.strip().casefold() in MODEL_DISCLOSURE_PLACEHOLDERS:
        report.add_error(
            f"{display_path}: model_detail must replace the scaffold placeholder with a declared model"
        )


def policy_file(repo_root: Path, relative_path: str) -> Path:
    candidate = repo_root / relative_path
    if candidate.exists():
        return candidate
    return POLICY_ROOT / relative_path


def load_allowed_layers(repo_root: Path) -> set[str]:
    enum_path = policy_file(repo_root, "brief/site-package/enums/layers.json")
    if not enum_path.exists():
        return set()
    try:
        data = json.loads(enum_path.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return set()
    return {item.get("code", "") for item in data.get("layers", []) if item.get("code")}


def load_enum_codes(repo_root: Path, relative_path: str, top_key: str, field: str = "code") -> set[str]:
    enum_path = policy_file(repo_root, relative_path)
    if not enum_path.exists():
        return set()
    try:
        data = json.loads(enum_path.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return set()
    return {str(item.get(field, "")) for item in data.get(top_key, []) if item.get(field)}


def load_string_enums(repo_root: Path, relative_path: str) -> dict[str, set[str]]:
    enum_path = policy_file(repo_root, relative_path)
    if not enum_path.exists():
        return {}
    try:
        data = json.loads(enum_path.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return {}
    return {
        key: {str(item) for item in value}
        for key, value in data.items()
        if isinstance(value, list) and all(isinstance(item, str) for item in value)
    }


def allowed_values_hint(values: set[str]) -> str:
    return ", ".join(sorted(values))


def load_required_standard_ids(repo_root: Path) -> set[str]:
    standards_path = policy_file(repo_root, "brief/site-package/standards/standards.json")
    if not standards_path.exists():
        return set(FALLBACK_REQUIRED_STANDARD_IDS)
    try:
        data = json.loads(standards_path.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return set(FALLBACK_REQUIRED_STANDARD_IDS)
    standards = data.get("standards")
    if not isinstance(standards, list):
        return set(FALLBACK_REQUIRED_STANDARD_IDS)
    required = {
        str(item.get("standard_id"))
        for item in standards
        if isinstance(item, dict)
        and item.get("mandatory_for_formal") is True
        and item.get("standard_id")
    }
    return required or set(FALLBACK_REQUIRED_STANDARD_IDS)


def coordinate_pair_is_valid(value: object) -> bool:
    if not isinstance(value, list) or len(value) < 2:
        return False
    lon, lat = value[0], value[1]
    if not isinstance(lon, (int, float)) or not isinstance(lat, (int, float)):
        return False
    return -180 <= lon <= 180 and -90 <= lat <= 90


def polygon_rings_are_closed(coordinates: object) -> bool:
    if not isinstance(coordinates, list) or not coordinates:
        return False
    for ring in coordinates:
        if not isinstance(ring, list) or len(ring) < 4:
            return False
        if ring[0] != ring[-1]:
            return False
        if not all(coordinate_pair_is_valid(pair) for pair in ring):
            return False
    return True


def geometry_coordinates_are_valid(geometry: dict) -> bool:
    geometry_type = geometry.get("type")
    coordinates = geometry.get("coordinates")
    if geometry_type == "Point":
        return coordinate_pair_is_valid(coordinates)
    if geometry_type == "LineString":
        return isinstance(coordinates, list) and len(coordinates) >= 2 and all(
            coordinate_pair_is_valid(pair) for pair in coordinates
        )
    if geometry_type == "MultiLineString":
        return isinstance(coordinates, list) and all(
            isinstance(line, list)
            and len(line) >= 2
            and all(coordinate_pair_is_valid(pair) for pair in line)
            for line in coordinates
        )
    if geometry_type == "Polygon":
        return polygon_rings_are_closed(coordinates)
    if geometry_type == "MultiPolygon":
        return isinstance(coordinates, list) and all(
            polygon_rings_are_closed(polygon) for polygon in coordinates
        )
    return False


def _collect_strings(value: object, sink: list[str]) -> None:
    """Flatten every string (including object keys) reachable from ``value``."""
    if isinstance(value, str):
        sink.append(value)
    elif isinstance(value, dict):
        for key, item in value.items():
            sink.append(str(key))
            _collect_strings(item, sink)
    elif isinstance(value, list):
        for item in value:
            _collect_strings(item, sink)


def constraints_file_declares_data_gap(data: object) -> bool:
    """True when constraints.geojson itself records why its feature set is empty."""
    if not isinstance(data, dict):
        return False
    return any(bool(data.get(key)) for key in CONSTRAINTS_DATA_GAP_DECLARATION_KEYS)


def assumptions_declare_constraints_gap(data: object) -> bool:
    """True when assumptions.json registers the missing regulatory-control inputs.

    Both the scaffold default (`A-CONTROLS-001`) and the many hand-written variants in
    existing packages are accepted: an entry qualifies when its identifier names controls,
    constraints or regulation, or when any of its text mentions the missing control inputs.
    """
    if not isinstance(data, dict):
        return False
    entries = data.get("assumptions")
    if not isinstance(entries, list):
        return False
    for entry in entries:
        if not isinstance(entry, dict):
            continue
        for key in ("id", "assumption_id"):
            value = entry.get(key)
            if isinstance(value, str) and CONSTRAINTS_GAP_ASSUMPTION_ID_PATTERN.search(value):
                return True
        strings: list[str] = []
        _collect_strings(entry, strings)
        blob = " ".join(strings).lower()
        if any(term in blob for term in CONSTRAINTS_GAP_ASSUMPTION_TERMS):
            return True
    return False


def validate_empty_constraints_declaration(
    report: ValidationReport, path: Path, data: object, display_path: str
) -> None:
    """Advise (never block) when an empty constraint layer leaves the gap unrecorded.

    An empty constraints.geojson stays valid: no official regulatory-control geometry is
    published for this site, and inventing one is worse than leaving the set empty. This
    only asks for the gap to be stated once, either in the file or in assumptions.json.
    """
    if constraints_file_declares_data_gap(data):
        return
    assumptions_path = path.parent.parent / "assumptions.json"
    try:
        assumptions = json.loads(assumptions_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError, json.JSONDecodeError):
        assumptions = None
    if assumptions_declare_constraints_gap(assumptions):
        return
    report.add_warning(
        f"{display_path}: empty constraint layer is accepted and is not a blocking issue, but the "
        "missing official control data is not recorded anywhere; add a top-level `data_gap` object to "
        "this file, or an assumptions.json entry covering the missing regulatory controls. Keep the "
        "feature list empty unless you have citable official or cleared geometry - never fabricate "
        "constraint geometry, and never label an inferred surface `official_constraint`."
    )


def validate_geojson_file(
    report: ValidationReport,
    repo_root: Path,
    path: Path,
    display_path: str,
    require_features: bool,
    stage: str,
    geometry_name: str,
) -> int:
    data = load_json_file(report, path, display_path)
    if not isinstance(data, dict):
        return 0
    if data.get("type") != "FeatureCollection":
        report.add_error(f"{display_path}: GeoJSON root type must be FeatureCollection")
        return 0
    features = data.get("features")
    if not isinstance(features, list):
        report.add_error(f"{display_path}: GeoJSON features must be an array")
        return 0
    if require_features and not features:
        report.add_error(f"{display_path}: this geometry file needs at least one feature")
    if geometry_name == "constraints.geojson" and not features:
        validate_empty_constraints_declaration(report, path, data, display_path)

    allowed_layers = load_allowed_layers(repo_root)
    source_enums = load_string_enums(repo_root, "brief/site-package/enums/source_types.json")
    land_use_codes = load_enum_codes(
        repo_root, "brief/site-package/enums/land_use_codes.json", "codes"
    )
    road_classes = load_enum_codes(
        repo_root, "brief/site-package/enums/road_classes.json", "classes"
    )
    building_types = load_enum_codes(
        repo_root, "brief/site-package/enums/building_types.json", "types"
    )
    official_boundary_features = 0
    provisional_boundary_features = 0
    unofficial_boundary_features = 0
    seen_ids: set[str] = set()
    for index, feature in enumerate(features):
        feature_label = f"{display_path}: feature[{index}]"
        if not isinstance(feature, dict) or feature.get("type") != "Feature":
            report.add_error(f"{feature_label}: must be a GeoJSON Feature")
            continue
        feature_id = str(feature.get("id") or "")
        properties = feature.get("properties")
        geometry = feature.get("geometry")
        if not feature_id:
            report.add_error(f"{feature_label}: missing feature id")
        elif feature_id in seen_ids:
            report.add_error(f"{feature_label}: duplicate feature id `{feature_id}`")
        seen_ids.add(feature_id)
        if not isinstance(properties, dict):
            report.add_error(f"{feature_label}: properties must be an object")
            continue
        for key in ["id", "layer", "source_type", "confidence", "geometry_role"]:
            if not properties.get(key):
                report.add_error(f"{feature_label}: missing property `{key}`")
        layer = properties.get("layer")
        if allowed_layers and layer and layer not in allowed_layers:
            report.add_error(
                f"{feature_label}: unknown layer `{layer}`; allowed: "
                f"{allowed_values_hint(allowed_layers)}"
            )
        source_type = properties.get("source_type")
        allowed_source_types = source_enums.get("source_types", set())
        if allowed_source_types and source_type and source_type not in allowed_source_types:
            report.add_error(
                f"{feature_label}: unknown source_type `{source_type}`; allowed: "
                f"{allowed_values_hint(allowed_source_types)}"
            )
        confidence = properties.get("confidence")
        allowed_confidence = source_enums.get("confidence_levels", set())
        if allowed_confidence and confidence and confidence not in allowed_confidence:
            report.add_error(
                f"{feature_label}: unknown confidence `{confidence}`; allowed: "
                f"{allowed_values_hint(allowed_confidence)}"
            )
        geometry_role = properties.get("geometry_role")
        allowed_roles = source_enums.get("geometry_roles", set())
        if allowed_roles and geometry_role and geometry_role not in allowed_roles:
            report.add_error(
                f"{feature_label}: unknown geometry_role `{geometry_role}`; allowed: "
                f"{allowed_values_hint(allowed_roles)}"
            )
        land_use_code = properties.get("land_use_code")
        if land_use_codes and land_use_code and str(land_use_code) not in land_use_codes:
            report.add_error(
                f"{feature_label}: unknown land_use_code `{land_use_code}`; allowed: "
                f"{allowed_values_hint(land_use_codes)}"
            )
        road_class = properties.get("road_class")
        if road_classes and road_class and str(road_class) not in road_classes:
            report.add_error(
                f"{feature_label}: unknown road_class `{road_class}`; allowed: "
                f"{allowed_values_hint(road_classes)}"
            )
        building_type = properties.get("building_type")
        if building_types and building_type and str(building_type) not in building_types:
            report.add_error(
                f"{feature_label}: unknown building_type `{building_type}`; allowed: "
                f"{allowed_values_hint(building_types)}"
            )
        if not isinstance(geometry, dict):
            report.add_error(f"{feature_label}: geometry must be an object")
        elif not geometry_coordinates_are_valid(geometry):
            report.add_error(f"{feature_label}: invalid or unclosed geometry coordinates")

        if geometry_name == "site_boundary.geojson":
            official_boundary = properties.get("official_boundary")
            if (
                official_boundary is True
                and geometry_role == "official_constraint"
                and source_type in TRUSTED_BOUNDARY_SOURCE_TYPES
                and confidence not in {"low", "unknown", None, ""}
            ):
                official_boundary_features += 1
            elif (
                official_boundary is False
                and geometry_role == "provisional_constraint"
                and source_type in PROVISIONAL_BOUNDARY_SOURCE_TYPES
                and confidence not in {"unknown", None, ""}
            ):
                provisional_boundary_features += 1
            else:
                unofficial_boundary_features += 1

    if geometry_name == "site_boundary.geojson":
        if stage == "formal" and official_boundary_features == 0 and provisional_boundary_features == 0:
            report.add_error(
                f"{display_path}: formal submissions require an official site boundary "
                "or provisional site boundary with geometry_role=provisional_constraint, official_boundary=false, "
                "traceable source_type, and non-unknown confidence"
            )
        elif stage == "formal" and official_boundary_features == 0 and provisional_boundary_features > 0:
            report.add_warning(
                f"{display_path}: uses provisional boundary; do not treat it as an official redline or precise-area basis. "
                "Organizer data gaps do not block content scoring; recalculate when official geometry is supplied"
            )
    return len(features)


def validate_metrics_file(report: ValidationReport, path: Path, display_path: str) -> None:
    data = load_json_file(report, path, display_path)
    if not isinstance(data, dict):
        return
    if data.get("schema_version") is None:
        report.add_error(f"{display_path}: missing schema_version")
    units = data.get("units")
    if not isinstance(units, dict) or units.get("length") != "m" or units.get("area") != "sqm":
        report.add_error(f"{display_path}: units must be length=m and area=sqm")
    metrics = data.get("metrics")
    if not isinstance(metrics, dict) or not metrics:
        report.add_error(f"{display_path}: metrics must be a non-empty object")
        return
    for name, metric in metrics.items():
        label = f"{display_path}: metrics.{name}"
        if not isinstance(metric, dict):
            report.add_error(f"{label}: metric must be an object")
            continue
        status = metric.get("status")
        if status not in {"known", "unknown", "not_applicable"}:
            report.add_error(f"{label}: status must be known, unknown, or not_applicable")
        if status == "unknown":
            if metric.get("value") is not None:
                report.add_error(f"{label}: unknown metric value must be null")
            if not metric.get("reason"):
                report.add_error(f"{label}: unknown metric needs reason")
        if status == "known" and not isinstance(metric.get("value"), (int, float)):
            report.add_error(f"{label}: known metric needs numeric value")
        if metric.get("unit") == "ratio" and isinstance(metric.get("value"), (int, float)):
            value = metric["value"]
            if value < 0 or value > 1:
                report.add_error(f"{label}: ratio value must be between 0 and 1")


def _simulation_source_declared(metric: object) -> bool:
    if not isinstance(metric, dict):
        return False
    source_files = metric.get("source_files")
    if not isinstance(source_files, list):
        return False
    for source in source_files:
        if not isinstance(source, str):
            continue
        normalized = source.split("#", 1)[0].strip().lstrip("./")
        if normalized == "simulation.json":
            return True
    return False


def _simulation_scalar_equal(left: object, right: object) -> bool:
    if isinstance(left, bool) or isinstance(right, bool):
        return left == right
    if not isinstance(left, (int, float)) or not isinstance(right, (int, float)):
        return left == right
    scale = max(1.0, abs(float(left)), abs(float(right)))
    return abs(float(left) - float(right)) <= 1e-9 * scale


def _simulation_issue(report: ValidationReport, strict: bool, message: str) -> None:
    if strict:
        report.add_error(message)
    else:
        report.add_warning(message + "; legacy simulation remains compatible")


def validate_simulation_consistency(
    report: ValidationReport,
    repo_root: Path,
    proposal_dir: str,
    metrics_path: Path,
    simulation_path: Path,
    *,
    strict: bool,
) -> None:
    """Check that claimed simulation aggregates are reproducible from task records."""
    simulation_display = f"{proposal_dir}/simulation.json"
    simulation = load_json_file(report, simulation_path, simulation_display)
    if not isinstance(simulation, dict):
        return

    tasks = simulation.get("tasks")
    if not isinstance(tasks, list) or not tasks or not all(isinstance(task, dict) for task in tasks):
        _simulation_issue(
            report,
            strict,
            f"{simulation_display}: tasks must be a non-empty array of objects for reproducible aggregates",
        )
        return

    task_count = simulation.get("task_count")
    if isinstance(task_count, bool) or not isinstance(task_count, int):
        _simulation_issue(
            report,
            strict,
            f"{simulation_display}: task_count must be an integer matching tasks.length",
        )
    elif task_count != len(tasks):
        _simulation_issue(
            report,
            strict,
            f"{simulation_display}: task_count={task_count} does not match tasks.length={len(tasks)}",
        )

    derived: dict[str, int | float] = {"simulation_task_count": len(tasks)}
    derivation_problems: dict[str, str] = {}

    outcomes = [task.get("outcome") for task in tasks]
    if all(isinstance(outcome, str) and outcome.strip() for outcome in outcomes):
        successful = sum(
            1
            for outcome in outcomes
            if outcome == "success" or outcome.endswith("_success")
        )
        derived["simulation_success_rate"] = successful / len(tasks)
    else:
        derivation_problems["simulation_success_rate"] = (
            "each task needs a non-empty outcome; use `success` or an outcome ending in `_success` for successful tasks"
        )

    schema_values = [task.get("dispatch_schema_valid") for task in tasks]
    if all(isinstance(value, bool) for value in schema_values):
        derived["tool_schema_pass_rate"] = sum(schema_values) / len(tasks)
    else:
        derivation_problems["tool_schema_pass_rate"] = "each task needs boolean dispatch_schema_valid"

    energy_values = [
        (task.get("energy_used_kwh"), task.get("energy_budget_kwh"))
        for task in tasks
    ]
    if all(
        isinstance(used, (int, float))
        and not isinstance(used, bool)
        and isinstance(budget, (int, float))
        and not isinstance(budget, bool)
        for used, budget in energy_values
    ):
        derived["energy_budget_violations"] = sum(
            1 for used, budget in energy_values if used > budget
        )
    else:
        derivation_problems["energy_budget_violations"] = (
            "each task needs numeric energy_used_kwh and energy_budget_kwh"
        )

    audit_values = [task.get("audit_complete") for task in tasks]
    if all(isinstance(value, bool) for value in audit_values):
        derived["audit_completeness"] = sum(audit_values) / len(tasks)
    else:
        derivation_problems["audit_completeness"] = "each task needs boolean audit_complete"

    metrics_data = load_json_file(report, metrics_path, f"{proposal_dir}/metrics.json")
    metric_items = metrics_data.get("metrics") if isinstance(metrics_data, dict) else None
    if not isinstance(metric_items, dict):
        return

    for name, problem in derivation_problems.items():
        metric = metric_items.get(name)
        if isinstance(metric, dict) and metric.get("status") == "known" and _simulation_source_declared(metric):
            _simulation_issue(
                report,
                strict,
                f"{simulation_display}: metrics.{name} cannot be recomputed; {problem}",
            )

    for name, expected in derived.items():
        metric = metric_items.get(name)
        if not isinstance(metric, dict) or metric.get("status") != "known":
            continue
        if not _simulation_source_declared(metric):
            continue
        actual = metric.get("value")
        if not isinstance(actual, (int, float)) or isinstance(actual, bool):
            continue
        if not _simulation_scalar_equal(actual, expected):
            _simulation_issue(
                report,
                strict,
                f"{simulation_display}: metrics.{name}={actual} does not match the task-derived value {expected}",
            )

    baseline = simulation.get("baselines")
    if not isinstance(baseline, dict):
        return

    metric_to_baseline = {
        "simulation_success_rate": "success_rate",
        "tool_schema_pass_rate": "tool_schema_pass_rate",
        "high_risk_intercept_rate": "high_risk_intercept_rate",
        "energy_budget_violations": "energy_budget_violations",
        "replan_p95_seconds": "replan_p95_seconds",
        "audit_completeness": "audit_completeness",
    }
    harness_baseline = baseline.get("urban_llm_harness")
    if isinstance(harness_baseline, dict):
        for metric_name, baseline_name in metric_to_baseline.items():
            metric = metric_items.get(metric_name)
            baseline_value = harness_baseline.get(baseline_name)
            if (
                isinstance(metric, dict)
                and metric.get("status") == "known"
                and _simulation_source_declared(metric)
                and isinstance(metric.get("value"), (int, float))
                and not isinstance(metric.get("value"), bool)
                and isinstance(baseline_value, (int, float))
                and not isinstance(baseline_value, bool)
                and not _simulation_scalar_equal(metric["value"], baseline_value)
            ):
                _simulation_issue(
                    report,
                    strict,
                    f"{simulation_display}: metrics.{metric_name}={metric['value']} conflicts with baselines.urban_llm_harness.{baseline_name}={baseline_value}; urban_llm_harness must mirror the task-derived aggregate, so record any distinct evaluation under a different documented baseline",
                )

    evaluation_path = repo_root / proposal_dir / "visual" / "assets" / "evaluation-baseline.json"
    if not evaluation_path.is_file():
        return
    evaluation_display = f"{proposal_dir}/visual/assets/evaluation-baseline.json"
    evaluation = load_json_file(report, evaluation_path, evaluation_display)
    if not isinstance(evaluation, dict):
        return
    evaluation_metrics = evaluation.get("metrics")
    if not isinstance(evaluation_metrics, dict):
        return
    for baseline_name, values in baseline.items():
        evaluation_values = evaluation_metrics.get(baseline_name)
        if not isinstance(values, dict) or not isinstance(evaluation_values, dict):
            continue
        for key, value in values.items():
            other = evaluation_values.get(key)
            if (
                isinstance(value, (int, float))
                and not isinstance(value, bool)
                and isinstance(other, (int, float))
                and not isinstance(other, bool)
                and not _simulation_scalar_equal(value, other)
            ):
                _simulation_issue(
                    report,
                    strict,
                    f"{evaluation_display}: metrics.{baseline_name}.{key}={other} conflicts with simulation.json baselines.{baseline_name}.{key}={value}",
                )


def validate_manifest_file(report: ValidationReport, repo_root: Path, proposal_dir: str) -> tuple[dict | None, str]:
    manifest_path = repo_root / proposal_dir / "manifest.json"
    data = load_json_file(report, manifest_path, f"{proposal_dir}/manifest.json")
    if not isinstance(data, dict):
        return None, "unknown"
    validate_agent_disclosure(
        report, data.get("agent"), f"{proposal_dir}/manifest.json: agent"
    )
    stage = data.get("submission_stage")
    if stage not in SUBMISSION_STAGES:
        report.add_error(
            f"{proposal_dir}/manifest.json: submission_stage must be formal"
        )
        stage = "unknown"
    report.ai_package_stages[proposal_dir] = stage
    package_type = data.get("package_type")
    if package_type is None:
        report.add_warning(
            f"{proposal_dir}/manifest.json: add package_type=professional_design_package; "
            "submission_stage is retained only for legacy compatibility"
        )
    elif package_type != "professional_design_package":
        report.add_error(
            f"{proposal_dir}/manifest.json: package_type must be professional_design_package"
        )
    package_state = data.get("package_state")
    if package_state is None:
        report.add_warning(
            f"{proposal_dir}/manifest.json: add package_state=ready_for_review; legacy package accepted"
        )
    elif package_state == "scaffold":
        report.add_error(
            f"{proposal_dir}/manifest.json: generated scaffold is not a submission; replace draft content, "
            "figures, geometry, and drawings, remove the SCAFFOLD-DRAFT marker, then set package_state=ready_for_review"
        )
    elif package_state != "ready_for_review":
        report.add_error(
            f"{proposal_dir}/manifest.json: package_state must be scaffold or ready_for_review"
        )
    if data.get("submission_type") != "ai_agent":
        report.add_error(f"{proposal_dir}/manifest.json: submission_type must be ai_agent")
    if data.get("project_id") != "centennial-jingzhang-ai-belt":
        report.add_error(
            f"{proposal_dir}/manifest.json: project_id must be centennial-jingzhang-ai-belt"
        )
    strict_bilingual = requires_bilingual_display(repo_root, proposal_dir)
    files = data.get("files")
    listed_paths: set[str] = set()
    if not isinstance(files, list) or not files:
        report.add_error(f"{proposal_dir}/manifest.json: files must be a non-empty array")
    else:
        for index, item in enumerate(files):
            if not isinstance(item, dict) or not item.get("path"):
                report.add_error(f"{proposal_dir}/manifest.json: files[{index}] needs path")
                continue
            rel_path = str(item["path"])
            try:
                safe_path = normalize_changed_path(rel_path)
            except ValueError as exc:
                report.add_error(f"{proposal_dir}/manifest.json: files[{index}] {exc}")
                continue
            translation_entry = is_localized_display_path(safe_path)
            if safe_path in listed_paths:
                message = f"{proposal_dir}/manifest.json: duplicate file path `{safe_path}`"
                if translation_entry and not strict_bilingual:
                    report.add_warning(message + "; legacy bilingual metadata does not block review")
                else:
                    report.add_error(message)
                continue
            listed_paths.add(safe_path)
            listed_file = repo_root / proposal_dir / safe_path
            if not listed_file.is_file():
                message = f"{proposal_dir}/manifest.json: listed file `{safe_path}` is missing"
                if translation_entry and not strict_bilingual:
                    report.add_warning(message + "; legacy bilingual display remains non-blocking")
                else:
                    report.add_error(message)
                continue
            declared_digest = item.get("sha256")
            if safe_path != "manifest.json" and not declared_digest:
                message = f"{proposal_dir}/manifest.json: listed file `{safe_path}` needs sha256"
                if translation_entry and not strict_bilingual:
                    report.add_warning(message + "; legacy bilingual metadata does not block review")
                elif package_type == "professional_design_package":
                    report.add_error(message)
                else:
                    report.add_warning(message + " (legacy package compatibility)")
            elif declared_digest and safe_path == "manifest.json":
                report.add_error(
                    f"{proposal_dir}/manifest.json: manifest.json must not declare sha256; remove the field"
                )
            elif declared_digest:
                actual_digest = hashlib.sha256(listed_file.read_bytes()).hexdigest()
                if declared_digest != actual_digest:
                    message = (
                        f"{proposal_dir}/manifest.json: sha256 mismatch for `{safe_path}`; "
                        f"declared={declared_digest}, actual={actual_digest}"
                    )
                    if translation_entry and not strict_bilingual:
                        report.add_warning(message + "; legacy bilingual metadata does not block review")
                    else:
                        report.add_error(message)
        for required in sorted(REQUIRED_AI_PACKAGE_FILES):
            if required not in listed_paths:
                report.add_error(
                    f"{proposal_dir}/manifest.json: required file `{required}` must be listed in files"
                )
        validate_media_manifest_entries(report, repo_root, proposal_dir, files, listed_paths)
        cover_image = data.get("cover_image")
        if cover_image not in (None, ""):
            if not isinstance(cover_image, str) or not cover_image.startswith("assets/media/"):
                report.add_error(
                    f"{proposal_dir}/manifest.json: cover_image must be empty or a local assets/media/ image"
                )
            elif cover_image not in listed_paths:
                report.add_error(
                    f"{proposal_dir}/manifest.json: cover_image `{cover_image}` must be listed in files"
                )
            elif Path(cover_image).suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
                report.add_error(
                    f"{proposal_dir}/manifest.json: cover_image must use PNG, JPEG, or WebP"
                )
            else:
                cover_entry = next(
                    (
                        item
                        for item in files
                        if isinstance(item, dict) and item.get("path") == cover_image
                    ),
                    {},
                )
                if cover_entry.get("role") != "media_poster":
                    report.add_error(
                        f"{proposal_dir}/manifest.json: cover_image must reference role=media_poster"
                    )
    validation_claim = data.get("validation_claim")
    if isinstance(validation_claim, dict):
        known_blockers = validation_claim.get("known_blockers")
        if isinstance(known_blockers, list) and known_blockers:
            report.add_warning(
                f"{proposal_dir}/manifest.json: known_blockers present; submission may pass intake but cannot enter formal professional scoring until resolved"
            )
    from manifest_schema import schema_errors

    manifest_path = f"{proposal_dir}/manifest.json"
    strict_schema = (
        manifest_path in report.strict_manifest_paths
        or str(data.get("schema_version", "")).startswith("0.2.")
    )
    if strict_schema and not str(data.get("schema_version", "")).startswith("0.2."):
        report.add_error(
            f"{manifest_path}: new manifests must adopt schema_version 0.2.x; "
            "legacy 0.1.x packages remain advisory until their manifest is revised"
        )
    schema_issues = schema_errors(data)
    if schema_issues:
        mode = "blocking" if strict_schema else "legacy advisory"
        detail = "; ".join(schema_issues[:5])
        if len(schema_issues) > 5:
            detail += f"; ... {len(schema_issues) - 5} more"
        message = f"{manifest_path}: published schema {mode}: {detail}"
        if strict_schema:
            report.add_error(message)
        else:
            report.add_warning(message + "; update this manifest before adopting schema 0.2.x")
    return data, stage


def validate_readiness_claim(
    report: ValidationReport,
    proposal_dir: str,
    manifest: dict | None,
    self_check: dict | None,
    *,
    allow_pending_self_check: bool = False,
    readiness_contract_required: bool = False,
) -> None:
    """Keep new ready packages strict without invalidating pre-contract history."""
    if not isinstance(manifest, dict):
        return
    if manifest.get("package_state") != "ready_for_review":
        return
    claim = manifest.get("validation_claim")
    readiness_contract = (
        claim.get("readiness_contract") if isinstance(claim, dict) else None
    )
    enforce_persisted_evidence = readiness_contract == PERSISTED_READINESS_CONTRACT
    if readiness_contract is not None and not enforce_persisted_evidence:
        report.add_error(
            f"{proposal_dir}/manifest.json: unsupported readiness_contract "
            f"{readiness_contract!r}"
        )
    if readiness_contract_required and readiness_contract != PERSISTED_READINESS_CONTRACT:
        report.add_error(
            f"{proposal_dir}/manifest.json: trusted base requires "
            f"validation_claim.readiness_contract={PERSISTED_READINESS_CONTRACT!r} "
            "for this new or previously contracted ready package"
        )
        enforce_persisted_evidence = True

    def report_pending_or_error(message: str) -> None:
        if allow_pending_self_check:
            report.add_warning(message + "; pending self-check completion")
        elif enforce_persisted_evidence:
            report.add_error(message)
        else:
            report.add_warning(
                message
                + "; legacy package accepted for intake; run "
                "self_check_submission.py --mark-self-checked to migrate"
            )

    if not isinstance(claim, dict) or claim.get("self_checked") is not True:
        report_pending_or_error(
            f"{proposal_dir}/manifest.json: packages marked ready_for_review "
            "must set validation_claim.self_checked=true after running self_check"
        )

    if not isinstance(self_check, dict):
        report_pending_or_error(
            f"{proposal_dir}/self_check.json: packages marked ready_for_review "
            "must persist a four-gate self-check report"
        )
        return
    if self_check.get("ok") is not True:
        report_pending_or_error(
            f"{proposal_dir}/self_check.json: packages marked ready_for_review "
            "must persist ok=true"
        )
    if self_check.get("can_enter_formal_review") is not True:
        report_pending_or_error(
            f"{proposal_dir}/self_check.json: packages marked ready_for_review "
            "must persist can_enter_formal_review=true"
        )

    required_gates = {
        "DETERMINISTIC_VALIDATION",
        "SPATIAL_REVIEW",
        "VISUAL_PACKAGING",
        "PROFESSIONAL_EVIDENCE",
    }
    checks = self_check.get("checks")
    persisted_gates = {
        check.get("check_id"): check
        for check in checks
        if isinstance(check, dict) and isinstance(check.get("check_id"), str)
    } if isinstance(checks, list) else {}
    incomplete_gates = sorted(
        gate
        for gate in required_gates
        if not isinstance(persisted_gates.get(gate), dict)
        or persisted_gates[gate].get("result") != "pass"
        or persisted_gates[gate].get("severity") != "blocking"
    )
    if incomplete_gates:
        report_pending_or_error(
            f"{proposal_dir}/self_check.json: packages marked ready_for_review "
            "must persist pass/blocking gates for " + ", ".join(incomplete_gates)
        )


def validate_compliance_matrix_file(report: ValidationReport, path: Path, display_path: str) -> None:
    data = load_json_file(report, path, display_path)
    if not isinstance(data, dict):
        return
    if data.get("schema_version") is None:
        report.add_error(f"{display_path}: missing schema_version")
    requirements = data.get("requirements")
    if not isinstance(requirements, list) or not requirements:
        report.add_error(f"{display_path}: requirements must be a non-empty array")
        return

    covered: set[str] = set()
    required_arrays = [
        "report_sections",
        "geojson_layers",
        "metrics",
        "drawings",
        "visual_sections",
        "source_ids",
        "assumption_ids",
        "self_check_ids",
    ]
    for index, item in enumerate(requirements):
        label = f"{display_path}: requirements[{index}]"
        if not isinstance(item, dict):
            report.add_error(f"{label}: requirement must be an object")
            continue
        requirement_id = item.get("requirement_id")
        if not isinstance(requirement_id, str) or not requirement_id:
            report.add_error(f"{label}: missing requirement_id")
        else:
            covered.add(requirement_id)
        if item.get("mandatory") is not True:
            report.add_error(f"{label}: mandatory must be true for required announcement and agent taskbook tasks")
        for key in required_arrays:
            value = item.get(key)
            if not isinstance(value, list) or not value or not all(isinstance(v, str) and v for v in value):
                report.add_error(f"{label}: {key} must be a non-empty string array")

    missing = sorted(ALL_REQUIRED_TASK_IDS - covered)
    if missing:
        report.add_error(
            f"{display_path}: missing required announcement or agent taskbook coverage: {', '.join(missing)}"
        )


def validate_required_string_array(
    report: ValidationReport,
    label: str,
    item: dict,
    key: str,
) -> None:
    value = item.get(key)
    if not isinstance(value, list) or not value or not all(isinstance(v, str) and v for v in value):
        report.add_error(f"{label}: {key} must be a non-empty string array")


def validate_standard_matrix_file(
    report: ValidationReport,
    repo_root: Path,
    path: Path,
    display_path: str,
) -> dict | None:
    data = load_json_file(report, path, display_path)
    if not isinstance(data, dict):
        return None
    if data.get("schema_version") is None:
        report.add_error(f"{display_path}: missing schema_version")
    standards = data.get("standards")
    if not isinstance(standards, list) or not standards:
        report.add_error(f"{display_path}: standards must be a non-empty array")
        return data

    covered: set[str] = set()
    required_arrays = [
        "proposal_sections",
        "drawing_refs",
        "geometry_refs",
        "metric_refs",
        "source_ids",
        "assumption_ids",
        "self_check_ids",
    ]
    for index, item in enumerate(standards):
        label = f"{display_path}: standards[{index}]"
        if not isinstance(item, dict):
            report.add_error(f"{label}: standard response must be an object")
            continue
        standard_id = item.get("standard_id")
        if not isinstance(standard_id, str) or not standard_id:
            report.add_error(f"{label}: missing standard_id")
        else:
            covered.add(standard_id)
        if not isinstance(item.get("requirement_zh"), str) or not item.get("requirement_zh", "").strip():
            report.add_error(f"{label}: requirement_zh must be non-empty")
        if not isinstance(item.get("professional_dimension"), str) or not item.get("professional_dimension", "").strip():
            report.add_error(f"{label}: professional_dimension must be non-empty")
        if item.get("review_status") not in {"addressed", "data_gap", "not_applicable"}:
            report.add_error(f"{label}: review_status must be addressed, data_gap, or not_applicable")
        if item.get("mandatory") is True and item.get("review_status") != "addressed":
            report.add_error(f"{label}: mandatory standard responses must be addressed")
        if not isinstance(item.get("evidence_summary_zh"), str) or not item.get("evidence_summary_zh", "").strip():
            report.add_error(f"{label}: evidence_summary_zh must be non-empty")
        for key in required_arrays:
            validate_required_string_array(report, label, item, key)

    required_standard_ids = load_required_standard_ids(repo_root)
    missing = sorted(required_standard_ids - covered)
    if missing:
        report.add_error(f"{display_path}: missing required standard response coverage: {', '.join(missing)}")
    return data


def validate_design_depth_matrix_file(
    report: ValidationReport,
    path: Path,
    display_path: str,
) -> dict | None:
    data = load_json_file(report, path, display_path)
    if not isinstance(data, dict):
        return None
    if data.get("schema_version") is None:
        report.add_error(f"{display_path}: missing schema_version")
    items = data.get("items")
    if not isinstance(items, list) or not items:
        report.add_error(f"{display_path}: items must be a non-empty array")
        return data

    covered: set[str] = set()
    required_arrays = [
        "proposal_sections",
        "drawing_refs",
        "geometry_refs",
        "metric_refs",
        "source_ids",
        "assumption_ids",
        "self_check_ids",
    ]
    for index, item in enumerate(items):
        label = f"{display_path}: items[{index}]"
        if not isinstance(item, dict):
            report.add_error(f"{label}: design depth item must be an object")
            continue
        item_id = item.get("item_id")
        if not isinstance(item_id, str) or not item_id:
            report.add_error(f"{label}: missing item_id")
        else:
            covered.add(item_id)
        if not isinstance(item.get("title_zh"), str) or not item.get("title_zh", "").strip():
            report.add_error(f"{label}: title_zh must be non-empty")
        if not isinstance(item.get("professional_dimension"), str) or not item.get("professional_dimension", "").strip():
            report.add_error(f"{label}: professional_dimension must be non-empty")
        if item.get("required") is not True:
            report.add_error(f"{label}: required must be true for formal design depth items")
        if item.get("status") != "complete":
            report.add_error(f"{label}: formal design depth item status must be complete")
        if not isinstance(item.get("evidence_summary_zh"), str) or not item.get("evidence_summary_zh", "").strip():
            report.add_error(f"{label}: evidence_summary_zh must be non-empty")
        for key in required_arrays:
            validate_required_string_array(report, label, item, key)

    missing = sorted(REQUIRED_DESIGN_DEPTH_IDS - covered)
    if missing:
        report.add_error(f"{display_path}: missing required design depth coverage: {', '.join(missing)}")
    return data


def validate_self_check_file(
    report: ValidationReport,
    path: Path,
    display_path: str,
    stage: str,
    *,
    allow_pending_self_check: bool = False,
) -> dict | None:
    data = load_json_file(report, path, display_path)
    if not isinstance(data, dict):
        return None
    checks = data.get("checks")
    if not isinstance(checks, list):
        report.add_error(f"{display_path}: checks must be an array")
        return data
    for index, check in enumerate(checks):
        label = f"{display_path}: checks[{index}]"
        if not isinstance(check, dict):
            report.add_error(f"{label}: check must be an object")
            continue
        result = check.get("result")
        severity = check.get("severity")
        if result not in {"pass", "fail", "unknown", "not_applicable"}:
            report.add_error(f"{label}: result must be pass, fail, unknown, or not_applicable")
        if severity not in {"blocking", "major", "minor", "info"}:
            report.add_error(f"{label}: severity must be blocking, major, minor, or info")
        if result == "fail" and severity == "blocking":
            check_id = check.get("check_id", f"index-{index}")
            message = f"{display_path}: formal submission has blocking failed self-check `{check_id}`"
            if allow_pending_self_check:
                report.add_warning(message + "; pending self-check replacement")
            else:
                report.add_error(message)
    return data


def collect_json_ids(data: object, list_key: str, id_key: str) -> set[str]:
    if not isinstance(data, dict):
        return set()
    items = data.get(list_key)
    if not isinstance(items, list):
        return set()
    return {
        str(item.get(id_key))
        for item in items
        if isinstance(item, dict) and item.get(id_key)
    }


def proposal_has_data_ref(data_refs: set[str], rel_path: str) -> bool:
    return rel_path in data_refs or any(ref.startswith(f"{rel_path}#") for ref in data_refs)


def extract_markdown_images(text: str) -> list[tuple[str, str]]:
    return [(match.group(1).strip(), match.group(2).strip()) for match in MARKDOWN_IMAGE_RE.finditer(text)]


def normalize_proposal_image_path(raw_path: str) -> str | None:
    if re.match(r"^(?:https?:)?//", raw_path, re.I):
        return None
    if re.match(r"^(?:data|file|javascript):", raw_path, re.I):
        return None
    clean_path = raw_path.split("#", 1)[0].split("?", 1)[0]
    try:
        pure = PurePosixPath(clean_path)
    except ValueError:
        return None
    if pure.is_absolute() or ".." in pure.parts:
        return None
    return pure.as_posix()


def validate_proposal_embedded_images(
    report: ValidationReport,
    repo_root: Path,
    proposal_dir: str,
    body: str,
) -> None:
    images = extract_markdown_images(body)
    normalized_images: set[str] = set()
    for alt_text, raw_path in images:
        normalized = normalize_proposal_image_path(raw_path)
        if normalized is None:
            report.add_error(
                f"{proposal_dir}/proposal.md: embedded images must use local assets/ paths, not `{raw_path}`"
            )
            continue
        normalized_images.add(normalized)
        if not normalized.startswith("assets/"):
            report.add_error(
                f"{proposal_dir}/proposal.md: embedded image `{normalized}` must be under assets/"
            )
            continue
        extension = Path(normalized).suffix.lower()
        if extension not in ALLOWED_ASSET_EXTENSIONS:
            allowed = ", ".join(sorted(ALLOWED_ASSET_EXTENSIONS))
            report.add_error(
                f"{proposal_dir}/proposal.md: embedded image `{normalized}` must use one of {allowed}"
            )
        if len(alt_text) < 6:
            report.add_error(
                f"{proposal_dir}/proposal.md: embedded image `{normalized}` needs descriptive alt text"
            )
        if not (repo_root / proposal_dir / normalized).exists():
            report.add_error(
                f"{proposal_dir}/proposal.md: embedded image `{normalized}` is missing"
            )

    for required in sorted(REQUIRED_PROPOSAL_IMAGE_PATHS):
        if required not in normalized_images:
            report.add_error(
                f"{proposal_dir}/proposal.md: must embed required human-readable diagram `![]({required})`"
            )


def validate_proposal_html_file(
    report: ValidationReport,
    path: Path,
    display_path: str,
    require_primary_figures: bool = True,
    translation_advisory: bool = False,
) -> None:
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        message = f"{display_path}: proposal HTML report must be UTF-8 text"
        if translation_advisory:
            report.add_warning(message + "; bilingual completeness does not block review")
        else:
            report.add_error(message)
        return
    for pattern, reason in FORBIDDEN_HTML_PATTERNS:
        if pattern.search(text):
            report.add_error(f"{display_path}: {reason}")
    if require_primary_figures:
        for required in sorted(REQUIRED_PROPOSAL_IMAGE_PATHS):
            expected_src = "../" + required
            if expected_src not in text:
                report.add_error(f"{display_path}: missing rendered figure reference `{expected_src}`")
    if "<main" not in text or "</html>" not in text:
        message = f"{display_path}: proposal HTML report must be a complete HTML document"
        if translation_advisory:
            report.add_warning(message + "; bilingual completeness does not block review")
        else:
            report.add_error(message)


def validate_visual_html_safety(
    report: ValidationReport,
    path: Path,
    display_path: str,
    translation_advisory: bool = False,
) -> None:
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        message = f"{display_path}: visual HTML must be UTF-8 text"
        if translation_advisory:
            report.add_warning(message + "; bilingual completeness does not block review")
        else:
            report.add_error(message)
        return
    for pattern, reason in FORBIDDEN_VISUAL_HTML_PATTERNS:
        if pattern.search(text):
            report.add_error(f"{display_path}: {reason}")
    if "<html" not in text.lower() or "</html>" not in text.lower():
        message = f"{display_path}: visual HTML must be a complete HTML document"
        if translation_advisory:
            report.add_warning(message + "; bilingual completeness does not block review")
        else:
            report.add_error(message)


def validate_proposal_evidence_references(
    report: ValidationReport,
    repo_root: Path,
    proposal_dir: str,
    standard_matrix: dict | None,
    design_depth_matrix: dict | None,
) -> None:
    proposal_path = repo_root / proposal_dir / "proposal.md"
    if not proposal_path.exists():
        return
    try:
        text = proposal_path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return
    metadata, body = parse_front_matter(text)
    format_version = proposal_format_version(metadata)
    required_sections = REQUIRED_SECTIONS_EN if metadata.get("language") == "en" else REQUIRED_SECTIONS
    section_bodies = extract_section_bodies(body)
    for required in required_sections:
        matching_bodies = [
            content for heading, content in section_bodies.items() if required in heading
        ]
        if matching_bodies and not any(has_readability_reference(content) for content in matching_bodies):
            report.add_error(
                f"{proposal_dir}/proposal.md: section `{required}` must include at least one "
                "machine-readable evidence reference such as [source:...], [standard:...], [depth:...], [data:...], or [metric:...]"
            )

    density_issues = reference_density_issues(body)
    for issue in density_issues:
        message = f"{proposal_dir}/proposal.md: {issue}"
        if format_version == PROPOSAL_FORMAT_VERSION:
            report.add_error(message)
        else:
            report.add_warning(message + "; legacy proposal remains compatible and the viewer will condense it")

    # Version 2 keeps exhaustive coverage in the structured package. The prose
    # only needs claim-adjacent anchors above. Version 1 retains the original
    # exhaustive checks so existing submissions continue to validate exactly as
    # they did before this contract was introduced.
    if format_version == PROPOSAL_FORMAT_VERSION:
        return

    refs = extract_reference_values(body)

    sources = load_json_file(report, repo_root / proposal_dir / "sources.json", f"{proposal_dir}/sources.json")
    for source_id in sorted(collect_json_ids(sources, "sources", "id")):
        if source_id not in refs["source"]:
            report.add_error(f"{proposal_dir}/proposal.md: missing source reference [source:{source_id}]")

    metrics = load_json_file(report, repo_root / proposal_dir / "metrics.json", f"{proposal_dir}/metrics.json")
    metric_items = metrics.get("metrics") if isinstance(metrics, dict) else {}
    if isinstance(metric_items, dict):
        for name, metric in sorted(metric_items.items()):
            if isinstance(metric, dict) and metric.get("status") == "known" and name not in refs["metric"]:
                report.add_error(f"{proposal_dir}/proposal.md: missing known metric reference [metric:{name}]")

    for rel_path in sorted(PROPOSAL_READABLE_DATA_REFS):
        if not proposal_has_data_ref(refs["data"], rel_path):
            report.add_error(f"{proposal_dir}/proposal.md: missing data reference [data:{rel_path}#...]")

    if isinstance(standard_matrix, dict):
        for standard_id in sorted(collect_json_ids(standard_matrix, "standards", "standard_id")):
            if standard_id not in refs["standard"]:
                report.add_error(f"{proposal_dir}/proposal.md: missing standard reference [standard:{standard_id}]")

    if isinstance(design_depth_matrix, dict):
        for item_id in sorted(collect_json_ids(design_depth_matrix, "items", "item_id")):
            if item_id not in refs["depth"]:
                report.add_error(f"{proposal_dir}/proposal.md: missing design depth reference [depth:{item_id}]")


def validate_bilingual_display(
    report: ValidationReport,
    repo_root: Path,
    proposal_dir: str,
    manifest: dict | None,
) -> None:
    changed_rel = {
        relative_to_proposal(path, proposal_dir)
        for path in report.changed_files
        if path.startswith(proposal_dir.rstrip("/") + "/")
    }
    strict_bilingual = requires_bilingual_display(repo_root, proposal_dir)
    if not strict_bilingual and not any(is_display_material(path) for path in changed_rel):
        return

    base = repo_root / proposal_dir
    proposal_path = base / "proposal.md"
    if not proposal_path.is_file():
        return
    try:
        metadata, body = parse_front_matter(proposal_path.read_text(encoding="utf-8"))
    except UnicodeDecodeError:
        return
    primary_language = metadata.get("language")
    if primary_language not in {"zh", "en"}:
        return
    translation_language = "en" if primary_language == "zh" else "zh"
    translation_file = localized_path("proposal.md", translation_language)
    def report_bilingual_problem(message: str) -> None:
        if strict_bilingual:
            report.add_error(message)
        else:
            report.add_warning(message + "; legacy v1 package remains compatible")

    if metadata.get("translation_file") != translation_file:
        report_bilingual_problem(
            f"{proposal_dir}/proposal.md: bilingual contract requires "
            f"translation_file={translation_file}"
        )

    manifest_items: dict[str, dict] = {}
    if isinstance(manifest, dict) and isinstance(manifest.get("files"), list):
        manifest_items = {
            str(item.get("path")): item
            for item in manifest["files"]
            if isinstance(item, dict) and item.get("path")
        }

    display_files = {path for path in DISPLAY_BASE_FILES if (base / path).is_file()}
    if strict_bilingual:
        # The manifest is the package inventory. Some text-bearing figures are
        # used only by the rendered report or visual page and are not linked
        # directly from proposal.md, so they must not bypass the language gate.
        for path, item in manifest_items.items():
            if (
                path.startswith("assets/figures/")
                and primary_path_from_localized(path) is None
                and item.get("language") != "neutral"
                and (base / path).is_file()
            ):
                display_files.add(path)
    for match in MARKDOWN_IMAGE_RE.finditer(body):
        raw = match.group(2).split("#", 1)[0].split("?", 1)[0]
        image_path = PurePosixPath(raw)
        if (
            not image_path.is_absolute()
            and ".." not in image_path.parts
            and image_path.as_posix().startswith("assets/figures/")
        ):
            display_files.add(image_path.as_posix())

    for changed_path in sorted(changed_rel):
        localized = primary_path_from_localized(changed_path)
        if localized is None:
            continue
        primary_path, localized_language = localized
        if (base / primary_path).is_file():
            continue
        report_bilingual_problem(
            f"{proposal_dir}/{changed_path}: bilingual counterpart has no primary display file "
            f"`{primary_path}`"
        )
        companion_item = manifest_items.get(changed_path)
        if not companion_item:
            report_bilingual_problem(f"{proposal_dir}/manifest.json: list bilingual counterpart `{changed_path}`")
        else:
            if companion_item.get("language") != localized_language:
                report_bilingual_problem(
                    f"{proposal_dir}/manifest.json: `{changed_path}` should declare "
                    f"language={localized_language}"
                )
            if companion_item.get("translation_of") != primary_path:
                report_bilingual_problem(
                    f"{proposal_dir}/manifest.json: `{changed_path}` should declare "
                    f"translation_of={primary_path}"
                )

    for display_path in sorted(display_files):
        primary_item = manifest_items.get(display_path)
        if (
            display_path.startswith("assets/figures/")
            and primary_item
            and primary_item.get("language") == "neutral"
        ):
            continue
        companion_path = localized_path(display_path, translation_language)
        companion = base / companion_path
        if not companion.is_file():
            report_bilingual_problem(
                f"{proposal_dir}/{display_path}: bilingual contract requires "
                f"{translation_language} display counterpart `{companion_path}`"
            )
            continue

        if not primary_item:
            report_bilingual_problem(f"{proposal_dir}/manifest.json: list bilingual primary file `{display_path}`")
        elif primary_item.get("language") != primary_language:
            report_bilingual_problem(
                f"{proposal_dir}/manifest.json: `{display_path}` should declare language={primary_language}"
            )
        companion_item = manifest_items.get(companion_path)
        if not companion_item:
            report_bilingual_problem(f"{proposal_dir}/manifest.json: list bilingual counterpart `{companion_path}`")
        else:
            if companion_item.get("language") != translation_language:
                report_bilingual_problem(
                    f"{proposal_dir}/manifest.json: `{companion_path}` should declare language={translation_language}"
                )
            if companion_item.get("translation_of") != display_path:
                report_bilingual_problem(
                    f"{proposal_dir}/manifest.json: `{companion_path}` should declare translation_of={display_path}"
                )

    translated_proposal = base / translation_file
    if translated_proposal.is_file():
        try:
            translated_metadata, _ = parse_front_matter(translated_proposal.read_text(encoding="utf-8"))
        except UnicodeDecodeError:
            report_bilingual_problem(f"{proposal_dir}/{translation_file}: translation must be UTF-8 text")
        else:
            if translated_metadata.get("language") != translation_language:
                report_bilingual_problem(
                    f"{proposal_dir}/{translation_file}: front matter should set language={translation_language}"
                )
            if translated_metadata.get("translation_of") != "proposal.md":
                report_bilingual_problem(
                    f"{proposal_dir}/{translation_file}: front matter should set translation_of=proposal.md"
                )


def validate_ai_package_dir(
    report: ValidationReport,
    repo_root: Path,
    proposal_dir: str,
    *,
    allow_pending_self_check: bool = False,
    readiness_contract_required: bool = False,
) -> None:
    base = repo_root / proposal_dir
    for required in sorted(REQUIRED_AI_PACKAGE_FILES):
        if not (base / required).exists():
            report.add_error(f"{proposal_dir}/{required}: required AI package file is missing")

    if not (base / "manifest.json").exists():
        return
    manifest, stage = validate_manifest_file(report, repo_root, proposal_dir)
    strict_bilingual = requires_bilingual_display(repo_root, proposal_dir)
    strict_simulation = strict_bilingual or (
        isinstance(manifest, dict) and manifest.get("package_state") == "ready_for_review"
    )

    for name in ["agent.json", "assumptions.json", "sources.json"]:
        path = base / name
        if path.exists():
            data = load_json_file(report, path, f"{proposal_dir}/{name}")
            if name == "agent.json":
                validate_agent_disclosure(report, data, f"{proposal_dir}/{name}")
    self_check_path = base / "self_check.json"
    self_check: dict | None = None
    if self_check_path.exists():
        self_check = validate_self_check_file(
            report,
            self_check_path,
            f"{proposal_dir}/self_check.json",
            stage,
            allow_pending_self_check=allow_pending_self_check,
        )
    validate_readiness_claim(
        report,
        proposal_dir,
        manifest,
        self_check,
        allow_pending_self_check=allow_pending_self_check,
        readiness_contract_required=readiness_contract_required,
    )

    metrics_path = base / "metrics.json"
    if metrics_path.exists():
        validate_metrics_file(report, metrics_path, f"{proposal_dir}/metrics.json")

    simulation_path = base / "simulation.json"
    if simulation_path.exists() and metrics_path.exists():
        validate_simulation_consistency(
            report,
            repo_root,
            proposal_dir,
            metrics_path,
            simulation_path,
            strict=strict_simulation,
        )

    compliance_path = base / "compliance_matrix.json"
    if compliance_path.exists():
        validate_compliance_matrix_file(
            report, compliance_path, f"{proposal_dir}/compliance_matrix.json"
        )

    standard_matrix: dict | None = None
    standard_path = base / "standard_matrix.json"
    if standard_path.exists():
        standard_matrix = validate_standard_matrix_file(
            report, repo_root, standard_path, f"{proposal_dir}/standard_matrix.json"
        )

    design_depth_matrix: dict | None = None
    design_depth_path = base / "design_depth_matrix.json"
    if design_depth_path.exists():
        design_depth_matrix = validate_design_depth_matrix_file(
            report, design_depth_path, f"{proposal_dir}/design_depth_matrix.json"
        )

    proposal_html_path = base / "report" / "proposal.html"
    if proposal_html_path.exists():
        validate_proposal_html_file(report, proposal_html_path, f"{proposal_dir}/report/proposal.html")
    for language in ["zh", "en"]:
        translated_html = base / "report" / f"proposal.{language}.html"
        if translated_html.exists():
            validate_proposal_html_file(
                report,
                translated_html,
                f"{proposal_dir}/report/proposal.{language}.html",
                require_primary_figures=False,
                translation_advisory=not strict_bilingual,
            )

    for visual_name in ["index.html", "index.zh.html", "index.en.html"]:
        visual_path = base / "visual" / visual_name
        if visual_path.exists():
            validate_visual_html_safety(
                report,
                visual_path,
                f"{proposal_dir}/visual/{visual_name}",
                translation_advisory=visual_name != "index.html" and not strict_bilingual,
            )

    for geometry_name in sorted(ALLOWED_GEOMETRY_FILES):
        geometry_path = base / "geometry" / geometry_name
        if geometry_path.exists():
            require_features = geometry_name == "site_boundary.geojson"
            if stage == "formal" and geometry_name in FORMAL_NONEMPTY_GEOMETRY_FILES:
                require_features = True
            if stage == "formal" and geometry_name == "phasing.geojson":
                require_features = True
            validate_geojson_file(
                report,
                repo_root,
                geometry_path,
                f"{proposal_dir}/geometry/{geometry_name}",
                require_features=require_features,
                stage=stage,
                geometry_name=geometry_name,
            )

    validate_proposal_evidence_references(
        report, repo_root, proposal_dir, standard_matrix, design_depth_matrix
    )
    validate_bilingual_display(report, repo_root, proposal_dir, manifest)


def validate_proposal_file(
    report: ValidationReport,
    repo_root: Path,
    proposal_path: str,
    pr_author: str,
    path_author: str,
) -> None:
    full_path = repo_root / proposal_path
    try:
        text = full_path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        report.add_error(f"{proposal_path}: proposal.md must be UTF-8 text")
        return

    metadata, body = parse_front_matter(text)
    if "SCAFFOLD-DRAFT" in text:
        report.add_error(
            f"{proposal_path}: generated scaffold marker remains; replace the template with the participant's actual proposal"
        )
    required_metadata = ["title", "author_github", "language", "license", "summary"]
    for key in required_metadata:
        if not metadata.get(key):
            report.add_error(f"{proposal_path}: missing front matter field `{key}`")

    author = metadata.get("author_github", "")
    if author and author.lower() != pr_author.lower() and not report.maintainer_bypass:
        report.add_error(
            f"{proposal_path}: author_github `{author}` must match PR author `{pr_author}`"
        )
    if author and author.lower() != path_author.lower():
        report.add_error(
            f"{proposal_path}: author_github `{author}` must match path owner `{path_author}`"
        )

    language = metadata.get("language")
    if language and language not in {"zh", "en"}:
        report.add_error(f"{proposal_path}: language must be zh or en")
    format_version = metadata.get("proposal_format_version")
    if format_version and format_version not in {"1", PROPOSAL_FORMAT_VERSION}:
        report.add_error(
            f"{proposal_path}: proposal_format_version must be 1 or {PROPOSAL_FORMAT_VERSION}"
        )
    bilingual_contract_version = metadata.get("bilingual_contract_version")
    if bilingual_contract_version and bilingual_contract_version != BILINGUAL_CONTRACT_VERSION:
        report.add_error(
            f"{proposal_path}: bilingual_contract_version must be {BILINGUAL_CONTRACT_VERSION}"
        )
    if bilingual_contract_version and format_version != PROPOSAL_FORMAT_VERSION:
        report.add_error(
            f"{proposal_path}: bilingual_contract_version requires proposal_format_version={PROPOSAL_FORMAT_VERSION}"
        )
    validation_body = body
    if language == "en":
        # Legacy English submissions may still contain an inline Chinese
        # translation. New v2 submissions use the required proposal.zh.md
        # companion, while v1 packages retain compatibility warnings.
        translation_match = re.search(r"(?m)^# 中文正式译文\s*$", body)
        if translation_match is not None:
            validation_body = body[: translation_match.start()]
        english_letters = len(re.findall(r"[A-Za-z]", validation_body))
        if english_letters < MIN_ENGLISH_PROPOSAL_LETTERS:
            report.add_error(
                f"{proposal_path}: English primary text is too short; need at least "
                f"{MIN_ENGLISH_PROPOSAL_LETTERS} English letters"
            )

    license_value = metadata.get("license")
    if license_value and license_value not in {"COMMUNITY-DISPLAY-ONLY", "CC-BY-4.0", "CC-BY-SA-4.0"}:
        report.add_error(f"{proposal_path}: unsupported license")

    for version_key in ["iteration", "version"]:
        version_value = metadata.get(version_key)
        if version_value and not ITERATION_RE.match(version_value):
            report.add_error(
                f"{proposal_path}: {version_key} must look like v0.1, 0.1, or 1.0.0"
            )

    validate_track_metadata(report, repo_root, proposal_path, metadata.get("tracks"))
    validate_scenario_metadata(report, repo_root, proposal_path, metadata.get("scenarios"))

    required_sections = REQUIRED_SECTIONS_EN if language == "en" else REQUIRED_SECTIONS
    headings = extract_headings(validation_body)
    section_bodies = extract_section_bodies(validation_body)
    for required in required_sections:
        if not any(required in heading for heading in headings):
            report.add_error(f"{proposal_path}: missing required section `## {required}`")
            continue
        matching_bodies = [
            content for heading, content in section_bodies.items() if required in heading
        ]
        compact_section_len = max(
            (len(re.sub(r"\s+", "", content)) for content in matching_bodies),
            default=0,
        )
        if compact_section_len < MIN_REQUIRED_SECTION_COMPACT_CHARS:
            report.add_error(
                f"{proposal_path}: section `{required}` is too thin; explain design intent, evidence, geometry/metric implications, and data gaps in at least {MIN_REQUIRED_SECTION_COMPACT_CHARS} non-whitespace characters"
            )

    for placeholder in PLACEHOLDERS:
        if placeholder in text:
            report.add_error(f"{proposal_path}: remove template placeholder `{placeholder}`")

    compact_len = len(re.sub(r"\s+", "", validation_body))
    if compact_len < MIN_FORMAL_PROPOSAL_COMPACT_CHARS:
        report.add_error(
            f"{proposal_path}: formal proposal body is too short; need at least {MIN_FORMAL_PROPOSAL_COMPACT_CHARS} non-whitespace characters"
        )

    proposal_dir = str(PurePosixPath(proposal_path).parent)
    validate_proposal_embedded_images(report, repo_root, proposal_dir, validation_body)

    for pattern, reason in HARD_RISK_PATTERNS:
        if pattern.search(text):
            report.add_error(f"{proposal_path}: {reason}")

    for pattern, reason in SOFT_RISK_PATTERNS:
        if pattern.search(text):
            report.add_warning(f"{proposal_path}: {reason}; maintainer review required")


def validate_changelog_file(
    report: ValidationReport,
    repo_root: Path,
    changelog_path: str,
) -> None:
    full_path = repo_root / changelog_path
    try:
        text = full_path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        report.add_error(f"{changelog_path}: changelog.md must be UTF-8 text")
        return

    if "# 方案迭代记录" not in text:
        report.add_error(f"{changelog_path}: missing title `# 方案迭代记录`")

    if not any(CHANGELOG_VERSION_HEADING_RE.match(line.strip()) for line in text.splitlines()):
        report.add_error(
            f"{changelog_path}: add at least one version heading like `## v0.1 - 2026-06-14`"
        )

    compact_len = len(re.sub(r"\s+", "", text))
    if compact_len < 80:
        report.add_warning(
            f"{changelog_path}: changelog is short; consider noting changes, feedback, and open issues"
        )

    for pattern, reason in HARD_RISK_PATTERNS:
        if pattern.search(text):
            report.add_error(f"{changelog_path}: {reason}")

    for pattern, reason in SOFT_RISK_PATTERNS:
        if pattern.search(text):
            report.add_warning(f"{changelog_path}: {reason}; maintainer review required")


def validate_risk_file(
    report: ValidationReport,
    repo_root: Path,
    risk_path: str,
) -> None:
    full_path = repo_root / risk_path
    data = load_json_file(report, full_path, risk_path)
    if not isinstance(data, dict):
        report.add_error(f"{risk_path}: risk.json root must be an object")
        return

    if data.get("version") != 1:
        report.add_error(f"{risk_path}: version must be 1")

    dimensions = data.get("dimensions")
    if not isinstance(dimensions, list) or not dimensions:
        report.add_error(f"{risk_path}: dimensions must be a non-empty array")
        return
    if len(dimensions) > len(RISK_DIMENSIONS):
        report.add_error(f"{risk_path}: dimensions may include at most {len(RISK_DIMENSIONS)} items")

    seen_ids: set[str] = set()
    for index, item in enumerate(dimensions):
        label = f"{risk_path}: dimensions[{index}]"
        if not isinstance(item, dict):
            report.add_error(f"{label}: must be an object")
            continue

        dimension_id = str(item.get("id", "")).strip()
        if dimension_id not in RISK_DIMENSIONS:
            allowed = ", ".join(sorted(RISK_DIMENSIONS))
            report.add_error(f"{label}: unknown risk dimension `{dimension_id}`; use one of {allowed}")
        elif dimension_id in seen_ids:
            report.add_error(f"{label}: duplicate risk dimension `{dimension_id}`")
        seen_ids.add(dimension_id)

        dimension_label = str(item.get("label", "")).strip()
        if not dimension_label:
            report.add_error(f"{label}: missing label")

        score = item.get("score")
        if isinstance(score, bool) or not isinstance(score, int):
            report.add_error(f"{label}: score must be an integer from {MIN_RISK_SCORE} to {MAX_RISK_SCORE}")
            continue
        if score < MIN_RISK_SCORE or score > MAX_RISK_SCORE:
            report.add_error(f"{label}: score must be between {MIN_RISK_SCORE} and {MAX_RISK_SCORE}")

        note = str(item.get("note", "")).strip()
        mitigation = str(item.get("mitigation", "")).strip()
        human_review = str(item.get("human_review", "")).strip()
        if len(note) < 8:
            report.add_error(f"{label}: note must explain the risk")
        if len(mitigation) < 8:
            report.add_error(f"{label}: mitigation must explain how the risk is reduced")
        if score >= HIGH_RISK_SCORE and len(human_review) < 8:
            report.add_error(
                f"{label}: high risk scores need human_review with a professional or public review path"
            )

        combined_text = "\n".join([note, mitigation, human_review])
        for pattern, reason in HARD_RISK_PATTERNS:
            if pattern.search(combined_text):
                report.add_error(f"{label}: {reason}")
        for pattern, reason in SOFT_RISK_PATTERNS:
            if pattern.search(combined_text):
                report.add_warning(f"{label}: {reason}; maintainer review required")


def validate_spatial_file(
    report: ValidationReport,
    repo_root: Path,
    spatial_path: str,
) -> None:
    full_path = repo_root / spatial_path
    data = load_json_file(report, full_path, spatial_path)
    if not isinstance(data, dict):
        report.add_error(f"{spatial_path}: spatial.json root must be an object")
        return

    if data.get("version") != 1:
        report.add_error(f"{spatial_path}: version must be 1")
    if data.get("disclaimer") != "concept-only":
        report.add_error(f"{spatial_path}: disclaimer must be concept-only")

    items = data.get("items")
    if not isinstance(items, list) or not items:
        report.add_error(f"{spatial_path}: items must be a non-empty array")
        return
    if len(items) > 24:
        report.add_error(f"{spatial_path}: items may include at most 24 concept objects")

    seen_ids: set[str] = set()
    scenario_registry = load_scenario_registry(repo_root)
    for index, item in enumerate(items):
        label = f"{spatial_path}: items[{index}]"
        if not isinstance(item, dict):
            report.add_error(f"{label}: must be an object")
            continue

        item_id = str(item.get("id", "")).strip()
        if not SPATIAL_ITEM_ID_RE.match(item_id):
            report.add_error(f"{label}: id must use lowercase letters, digits, and hyphens")
        elif item_id in seen_ids:
            report.add_error(f"{label}: duplicate spatial item id `{item_id}`")
        seen_ids.add(item_id)

        item_type = item.get("type")
        if item_type not in SPATIAL_ITEM_TYPES:
            allowed = ", ".join(sorted(SPATIAL_ITEM_TYPES))
            report.add_error(f"{label}: type must be one of {allowed}")

        title = str(item.get("title", "")).strip()
        summary = str(item.get("summary", "")).strip()
        source = str(item.get("source", "")).strip()
        public_level = item.get("public_level")
        if len(title) < 2:
            report.add_error(f"{label}: title is required")
        if len(summary) < 8:
            report.add_error(f"{label}: summary must explain the concept")
        if len(source) < 2:
            report.add_error(f"{label}: source is required")
        if public_level not in SPATIAL_PUBLIC_LEVELS:
            allowed = ", ".join(sorted(SPATIAL_PUBLIC_LEVELS))
            report.add_error(f"{label}: public_level must be one of {allowed}")
        elif public_level == "provisional":
            report.add_warning(
                f"{label}: provisional spatial concept needs maintainer review before being treated as public-facing context"
            )

        linked_scenarios = item.get("linked_scenarios")
        if linked_scenarios is not None:
            if not isinstance(linked_scenarios, list):
                report.add_error(f"{label}: linked_scenarios must be an array")
            else:
                for scenario_id in linked_scenarios:
                    scenario_id_text = str(scenario_id).strip()
                    if scenario_registry and scenario_id_text not in scenario_registry:
                        report.add_error(f"{label}: unknown linked scenario `{scenario_id_text}`")

        geometry = item.get("geometry")
        if not isinstance(geometry, dict):
            report.add_error(f"{label}: geometry must be an object")
            continue
        if geometry.get("mode") != "concept":
            report.add_error(f"{label}: geometry.mode must be concept")
        geometry_label = str(geometry.get("label", "")).strip()
        if len(geometry_label) < 2:
            report.add_error(f"{label}: geometry.label is required")
        forbidden_keys = sorted(set(geometry) - {"mode", "label"})
        if forbidden_keys:
            report.add_error(
                f"{label}: geometry may only contain mode and label; remove {', '.join(forbidden_keys)}"
            )

        combined_text = "\n".join([title, summary, source, geometry_label])
        for pattern, reason in HARD_RISK_PATTERNS:
            if pattern.search(combined_text):
                report.add_error(f"{label}: {reason}")
        for pattern, reason in SOFT_RISK_PATTERNS:
            if pattern.search(combined_text):
                report.add_warning(f"{label}: {reason}; maintainer review required")


def validate_submission(
    repo_root: Path,
    pr_author: str,
    changed_files: Iterable[str],
    maintainer_bypass_logins: Iterable[str] = (),
    *,
    allow_pending_self_check: bool = False,
    required_readiness_contract_dirs: Iterable[str] = (),
    strict_manifest_paths: Iterable[str] = (),
) -> ValidationReport:
    report = ValidationReport()
    repo_root = repo_root.resolve()
    pr_author = pr_author.strip()
    bypass_logins = {login.strip().lower() for login in maintainer_bypass_logins if login.strip()}
    report.maintainer_bypass = pr_author.lower() in bypass_logins
    required_readiness_contracts = {
        str(proposal_dir).strip().rstrip("/")
        for proposal_dir in required_readiness_contract_dirs
        if str(proposal_dir).strip()
    }
    report.strict_manifest_paths = {
        normalize_changed_path(path) for path in strict_manifest_paths
    }

    if not pr_author or not GITHUB_LOGIN_RE.match(pr_author):
        report.add_error(f"invalid PR author `{pr_author}`")
        return report

    normalized_files = []
    for raw_path in changed_files:
        try:
            normalized_files.append(normalize_changed_path(raw_path))
        except ValueError as exc:
            report.add_error(str(exc))
    normalized_files = sorted(dict.fromkeys(normalized_files))
    report.changed_files = normalized_files

    if not normalized_files:
        report.add_error("no changed files were provided")
        return report

    proposal_dirs: set[str] = set()
    proposal_files: set[str] = set()
    ai_package_dirs: set[str] = set()
    changelog_files: set[str] = set()
    risk_files: set[str] = set()
    spatial_files: set[str] = set()

    for path in normalized_files:
        parts = path.split("/")
        full_path = repo_root / path

        linked_path = first_symbolic_link(repo_root, path)
        if linked_path is not None:
            report_symbolic_link(report, repo_root, linked_path)
            continue

        if path.startswith(PROTECTED_REVIEW_ARTIFACT_PREFIXES):
            report.add_error(
                f"{path}: maintainer review artifacts must stay local and only be shared through PR comments"
            )
            continue

        if path in MAINTAINER_CONTROLLED_SUBMISSIONS_ROOT_FILES:
            if not report.maintainer_bypass:
                report.add_error(
                    f"{path}: only maintainers may edit submissions root documentation"
                )
            continue

        if not report.maintainer_bypass:
            if path in PARTICIPANT_PROTECTED_GLOBAL_FILES:
                report.add_error(
                    f"{path}: participants must not edit maintainer-controlled gallery publication data"
                )
                continue
            if parts[0] != "submissions" or len(parts) < 2:
                report.add_error(
                    f"{path}: participant PRs may only change submissions/{pr_author}/"
                )
                continue
            if parts[1] != pr_author:
                report.add_error(
                    f"{path}: submission directory `{parts[1]}` must exactly match "
                    f"GitHub PR author `{pr_author}`, including letter case"
                )
                continue

        if parts[0] != "submissions":
            continue

        if len(parts) < 4:
            report.add_error(
                f"{path}: submissions must use submissions/<github-login>/<proposal-slug>/..."
            )
            continue

        path_author = parts[1]
        slug = parts[2]
        proposal_dir = "/".join(parts[:3])
        proposal_dirs.add(proposal_dir)

        if not GITHUB_LOGIN_RE.match(path_author):
            report.add_error(f"{path}: invalid GitHub login directory `{path_author}`")
        if not PROPOSAL_SLUG_RE.match(slug):
            report.add_error(
                f"{path}: proposal slug `{slug}` must use lowercase letters, digits, and hyphens"
            )

        if len(parts) == 4 and parts[3] == "proposal.md":
            proposal_files.add(path)
        elif len(parts) == 4 and parts[3] in {"proposal.zh.md", "proposal.en.md"}:
            ai_package_dirs.add(proposal_dir)
        elif len(parts) == 4 and parts[3] == "changelog.md":
            changelog_files.add(path)
        elif len(parts) == 4 and parts[3] == "FEEDBACK.md":
            if not report.maintainer_bypass:
                report.add_error(
                    f"{path}: only maintainers may add or edit FEEDBACK.md"
                )
        elif len(parts) == 4 and parts[3] == "risk.json":
            risk_files.add(path)
        elif len(parts) == 4 and parts[3] == "spatial.json":
            spatial_files.add(path)
        elif len(parts) == 4 and parts[3] == "simulation.json":
            ai_package_dirs.add(proposal_dir)
        elif len(parts) == 4 and parts[3] in PACKAGE_ROOT_JSON_FILES:
            ai_package_dirs.add(proposal_dir)
        elif is_under_media(parts):
            ai_package_dirs.add(proposal_dir)
            extension = Path(path).suffix.lower()
            if extension not in ALLOWED_MEDIA_FILE_EXTENSIONS:
                allowed = ", ".join(sorted(ALLOWED_MEDIA_FILE_EXTENSIONS))
                report.add_error(f"{path}: media assets must use one of {allowed}")
        elif is_under_assets(parts):
            extension = Path(path).suffix.lower()
            if extension not in ALLOWED_ASSET_EXTENSIONS:
                allowed = ", ".join(sorted(ALLOWED_ASSET_EXTENSIONS))
                report.add_error(f"{path}: assets must use one of {allowed}")
        elif is_under_geometry(parts):
            ai_package_dirs.add(proposal_dir)
            if parts[4] not in ALLOWED_GEOMETRY_FILES:
                allowed = ", ".join(sorted(ALLOWED_GEOMETRY_FILES))
                report.add_error(f"{path}: geometry files must be one of {allowed}")
        elif is_under_drawings(parts):
            ai_package_dirs.add(proposal_dir)
            extension = Path(path).suffix.lower()
            if extension not in ALLOWED_DRAWING_EXTENSIONS:
                allowed = ", ".join(sorted(ALLOWED_DRAWING_EXTENSIONS))
                report.add_error(f"{path}: drawings must use one of {allowed}")
        elif is_under_report(parts):
            ai_package_dirs.add(proposal_dir)
            if parts[4] not in ALLOWED_REPORT_FILES:
                allowed = ", ".join(sorted(ALLOWED_REPORT_FILES))
                report.add_error(f"{path}: report files must be one of {allowed}")
        elif is_visual_index(parts):
            ai_package_dirs.add(proposal_dir)
        elif is_under_visual_assets(parts):
            extension = Path(path).suffix.lower()
            if extension not in ALLOWED_VISUAL_ASSET_EXTENSIONS:
                allowed = ", ".join(sorted(ALLOWED_VISUAL_ASSET_EXTENSIONS))
                report.add_error(f"{path}: visual assets must use one of {allowed}")
        else:
            report.add_error(
                f"{path}: each proposal directory may contain proposal.md, proposal.zh.md, proposal.en.md, changelog.md, maintainer-only FEEDBACK.md, risk.json, spatial.json, simulation.json, AI package files, assets/*, geometry/*, drawings/*, report/*, and localized visual/index HTML plus visual/assets/* only"
            )

        if not full_path.exists():
            rel_path = relative_to_proposal(path, proposal_dir)
            if is_localized_display_path(rel_path) and not requires_bilingual_display(repo_root, proposal_dir):
                report.add_warning(
                    f"{path}: bilingual display file was removed or is missing; "
                    "legacy v1 package remains compatible"
                )
            else:
                report.add_error(f"{path}: changed file is missing in the PR checkout")
            continue
        if full_path.is_dir():
            report.add_error(f"{path}: directories are not valid changed files")
            continue

        size = full_path.stat().st_size
        report.total_bytes += size
        if path.endswith(".md") and size > MAX_MARKDOWN_BYTES:
            report.add_error(f"{path}: Markdown files must be <= {MAX_MARKDOWN_BYTES} bytes")
        if path.endswith(".json") and size > MAX_JSON_BYTES:
            report.add_error(f"{path}: JSON files must be <= {MAX_JSON_BYTES} bytes")
        if path.endswith(".geojson") and size > MAX_GEOJSON_BYTES:
            report.add_error(f"{path}: GeoJSON files must be <= {MAX_GEOJSON_BYTES} bytes")
        if (
            is_under_media(parts)
            and Path(path).suffix.lower() in ALLOWED_VIDEO_EXTENSIONS
            and size > MAX_VIDEO_BYTES
        ):
            report.add_error(f"{path}: video files must be <= {MAX_VIDEO_BYTES} bytes")
        elif (
            is_under_media(parts)
            and Path(path).suffix.lower() in ALLOWED_AUDIO_EXTENSIONS
            and size > MAX_AUDIO_BYTES
        ):
            report.add_error(f"{path}: audio files must be <= {MAX_AUDIO_BYTES} bytes")
        elif (
            is_under_media(parts)
            and Path(path).suffix.lower() not in ALLOWED_VIDEO_EXTENSIONS
            and Path(path).suffix.lower() not in ALLOWED_AUDIO_EXTENSIONS
            and size > MAX_ASSET_BYTES
        ):
            report.add_error(
                f"{path}: media sidecars and posters must be <= {MAX_ASSET_BYTES} bytes"
            )
        elif is_under_assets(parts) and not is_under_media(parts) and size > MAX_ASSET_BYTES:
            report.add_error(f"{path}: assets must be <= {MAX_ASSET_BYTES} bytes")
        if is_under_drawings(parts) and size > MAX_DRAWING_BYTES:
            report.add_error(f"{path}: drawings must be <= {MAX_DRAWING_BYTES} bytes")
        if is_under_drawings(parts) and Path(path).suffix.lower() == ".pdf" and is_empty_pdf(full_path.read_bytes()):
            if (
                is_localized_display_path(relative_to_proposal(path, proposal_dir))
                and not requires_bilingual_display(repo_root, proposal_dir)
            ):
                report.add_warning(
                    f"{path}: bilingual drawing PDF has no pages; replace the placeholder, "
                    "but legacy v1 compatibility remains"
                )
            else:
                report.add_error(
                    f"{path}: drawing PDF has no pages; zero-page or placeholder drawings cannot enter review"
                )
        if is_visual_index(parts) and size > MAX_HTML_BYTES:
            report.add_error(f"{path}: visual/index.html must be <= {MAX_HTML_BYTES} bytes")
        if is_under_report(parts) and parts[4].endswith(".html") and size > MAX_HTML_BYTES:
            report.add_error(f"{path}: report HTML files must be <= {MAX_HTML_BYTES} bytes")
        if is_under_visual_assets(parts) and size > MAX_VISUAL_ASSET_BYTES:
            report.add_error(f"{path}: visual assets must be <= {MAX_VISUAL_ASSET_BYTES} bytes")

    if report.total_bytes > MAX_TOTAL_BYTES:
        report.add_error(f"changed files total {report.total_bytes} bytes exceeds {MAX_TOTAL_BYTES}")

    unsafe_submission_dirs = {
        proposal_dir
        for proposal_dir in proposal_dirs
        if not submission_directory_is_safe(report, repo_root, proposal_dir)
    }

    for proposal_dir in sorted(proposal_dirs):
        ai_package_dirs.add(proposal_dir)
        if proposal_dir in unsafe_submission_dirs:
            continue
        proposal_path = f"{proposal_dir}/proposal.md"
        if not (repo_root / proposal_path).exists():
            report.add_error(f"{proposal_path}: every touched proposal directory needs proposal.md")
        else:
            proposal_files.add(proposal_path)
        risk_path = f"{proposal_dir}/risk.json"
        if (repo_root / risk_path).exists():
            risk_files.add(risk_path)
        spatial_path = f"{proposal_dir}/spatial.json"
        if (repo_root / spatial_path).exists():
            spatial_files.add(spatial_path)

    for proposal_path in sorted(proposal_files):
        if str(PurePosixPath(proposal_path).parent) in unsafe_submission_dirs:
            continue
        if not (repo_root / proposal_path).exists():
            continue
        path_author = proposal_path.split("/")[1]
        validate_proposal_file(report, repo_root, proposal_path, pr_author, path_author)

    for proposal_dir in sorted(ai_package_dirs):
        if proposal_dir in unsafe_submission_dirs:
            continue
        validate_ai_package_dir(
            report,
            repo_root,
            proposal_dir,
            allow_pending_self_check=allow_pending_self_check,
            readiness_contract_required=proposal_dir in required_readiness_contracts,
        )

    for changelog_path in sorted(changelog_files):
        if str(PurePosixPath(changelog_path).parent) in unsafe_submission_dirs:
            continue
        if not (repo_root / changelog_path).exists():
            continue
        validate_changelog_file(report, repo_root, changelog_path)

    for risk_path in sorted(risk_files):
        if str(PurePosixPath(risk_path).parent) in unsafe_submission_dirs:
            continue
        if not (repo_root / risk_path).exists():
            continue
        validate_risk_file(report, repo_root, risk_path)

    for spatial_path in sorted(spatial_files):
        if str(PurePosixPath(spatial_path).parent) in unsafe_submission_dirs:
            continue
        if not (repo_root / spatial_path).exists():
            continue
        validate_spatial_file(report, repo_root, spatial_path)

    report.proposal_files = sorted(proposal_files)
    report.changelog_files = sorted(changelog_files)
    return report


def format_report(report: ValidationReport) -> str:
    lines = ["# Submission validation", ""]
    lines.append(f"Result: {'PASS' if report.ok else 'FAIL'}")
    lines.append(f"Changed files: {len(report.changed_files)}")
    lines.append(f"Proposal files: {len(report.proposal_files)}")
    lines.append(f"Changelog files: {len(report.changelog_files)}")
    if report.ai_package_stages:
        stage_summary = ", ".join(
            f"{path}={stage}" for path, stage in sorted(report.ai_package_stages.items())
        )
        lines.append(f"AI package stages: {stage_summary}")
    if report.maintainer_bypass:
        lines.append("Maintainer bypass: active")
    if report.errors:
        lines.extend(["", "Errors:"])
        lines.extend(f"- {item}" for item in report.errors)
    if report.warnings:
        lines.extend(["", "Warnings:"])
        lines.extend(f"- {item}" for item in report.warnings)
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-root", default=".")
    parser.add_argument("--pr-author", required=True)
    parser.add_argument("--changed-file", action="append")
    parser.add_argument("--changed-files-list")
    parser.add_argument("--maintainer-bypass-logins", default=os.getenv("MAINTAINER_BYPASS_LOGINS", ""))
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    changed_files = load_changed_files(args)
    bypass_logins = [item for item in args.maintainer_bypass_logins.split(",") if item.strip()]
    report = validate_submission(Path(args.repo_root), args.pr_author, changed_files, bypass_logins)

    if args.json:
        print(json.dumps(report.to_dict(), ensure_ascii=False, indent=2))
    else:
        print(format_report(report))
    return 0 if report.ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
