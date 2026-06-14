#!/usr/bin/env python3
"""Validate Haidian AI proposal pull requests.

The validator is intentionally deterministic and dependency-free so it can run
on untrusted pull requests without installing contributor-controlled code.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path, PurePosixPath
from typing import Iterable


REQUIRED_SECTIONS = [
    "摘要",
    "问题理解",
    "核心概念",
    "空间与产业方案",
    "AI 治理与创新场景",
    "落地路径",
    "风险与合规说明",
    "参考资料",
]

GITHUB_LOGIN_RE = re.compile(r"^[A-Za-z0-9-]{1,39}$")
PROPOSAL_SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]{2,63}$")
ITERATION_RE = re.compile(r"^v?\d+(?:\.\d+){0,2}(?:[-+][A-Za-z0-9.-]+)?$")
CHANGELOG_VERSION_HEADING_RE = re.compile(r"^##\s+v?\d+(?:\.\d+){0,2}\s+-\s+\d{4}-\d{2}-\d{2}\s*$")
ALLOWED_ASSET_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
ALLOWED_EXHIBIT_MODULE_TYPES = {
    "executive_summary",
    "concept_cards",
    "spatial_strategy",
    "agent_workflow",
    "scenario_gallery",
    "timeline",
    "metrics",
    "risk_notes",
    "references",
}
EXHIBIT_ASSET_KEYS = {"image", "src", "asset", "poster", "thumbnail", "cover"}
MAX_MARKDOWN_BYTES = 256 * 1024
MAX_EXHIBIT_BYTES = 128 * 1024
MAX_ASSET_BYTES = 5 * 1024 * 1024
MAX_TOTAL_BYTES = 20 * 1024 * 1024

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


@dataclass
class ValidationReport:
    ok: bool = True
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    proposal_files: list[str] = field(default_factory=list)
    exhibit_files: list[str] = field(default_factory=list)
    changelog_files: list[str] = field(default_factory=list)
    changed_files: list[str] = field(default_factory=list)
    total_bytes: int = 0
    maintainer_bypass: bool = False

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
            "exhibit_files": self.exhibit_files,
            "changelog_files": self.changelog_files,
            "changed_files": self.changed_files,
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


def extract_headings(text: str) -> list[str]:
    headings = []
    for line in text.splitlines():
        match = re.match(r"^##\s+(.+?)\s*$", line)
        if match:
            headings.append(match.group(1).strip())
    return headings


def is_under_assets(parts: list[str]) -> bool:
    return len(parts) >= 5 and parts[3] == "assets"


def proposal_dir_from_submission_path(path: str) -> str | None:
    parts = path.split("/")
    if len(parts) >= 3 and parts[0] == "submissions":
        return "/".join(parts[:3])
    return None


def validate_exhibit_asset_path(
    report: ValidationReport,
    repo_root: Path,
    exhibit_path: str,
    proposal_dir: str,
    raw_path: object,
) -> None:
    if not isinstance(raw_path, str):
        report.add_error(f"{exhibit_path}: exhibit asset references must be strings")
        return
    value = raw_path.strip().replace("\\", "/")
    path = PurePosixPath(value)
    if not value:
        report.add_error(f"{exhibit_path}: exhibit asset path may not be empty")
        return
    if "://" in value or value.startswith("//"):
        report.add_error(f"{exhibit_path}: external asset URLs are not allowed: {value}")
        return
    if path.is_absolute() or ".." in path.parts:
        report.add_error(f"{exhibit_path}: unsafe asset path: {value}")
        return
    if len(path.parts) < 2 or path.parts[0] != "assets":
        report.add_error(f"{exhibit_path}: asset paths must start with assets/: {value}")
        return
    extension = Path(path.name).suffix.lower()
    if extension not in ALLOWED_ASSET_EXTENSIONS:
        allowed = ", ".join(sorted(ALLOWED_ASSET_EXTENSIONS))
        report.add_error(f"{exhibit_path}: asset paths must use one of {allowed}: {value}")
        return
    asset_path = repo_root / proposal_dir / path.as_posix()
    if not asset_path.exists():
        report.add_error(f"{exhibit_path}: referenced asset is missing: {path.as_posix()}")


def validate_exhibit_asset_references(
    report: ValidationReport,
    repo_root: Path,
    exhibit_path: str,
    proposal_dir: str,
    value: object,
    key: str = "",
) -> None:
    if isinstance(value, dict):
        for child_key, child_value in value.items():
            if child_key in EXHIBIT_ASSET_KEYS:
                validate_exhibit_asset_path(report, repo_root, exhibit_path, proposal_dir, child_value)
            else:
                validate_exhibit_asset_references(
                    report, repo_root, exhibit_path, proposal_dir, child_value, child_key
                )
    elif isinstance(value, list):
        for item in value:
            validate_exhibit_asset_references(report, repo_root, exhibit_path, proposal_dir, item, key)


def validate_exhibit_file(
    report: ValidationReport,
    repo_root: Path,
    exhibit_path: str,
) -> None:
    full_path = repo_root / exhibit_path
    try:
        exhibit = json.loads(full_path.read_text(encoding="utf-8"))
    except UnicodeDecodeError:
        report.add_error(f"{exhibit_path}: exhibit.json must be UTF-8 text")
        return
    except json.JSONDecodeError as exc:
        report.add_error(f"{exhibit_path}: invalid JSON: {exc.msg}")
        return

    if not isinstance(exhibit, dict):
        report.add_error(f"{exhibit_path}: exhibit.json must be a JSON object")
        return

    if exhibit.get("version") != 1:
        report.add_error(f"{exhibit_path}: version must be 1")

    card = exhibit.get("card")
    if not isinstance(card, dict):
        report.add_error(f"{exhibit_path}: card must be an object")
    else:
        for key in ["title", "subtitle", "summary", "cover"]:
            if not isinstance(card.get(key), str) or not card.get(key, "").strip():
                report.add_error(f"{exhibit_path}: card.{key} is required")
        tags = card.get("tags")
        if (
            not isinstance(tags, list)
            or not tags
            or len(tags) > 8
            or any(not isinstance(item, str) or not item.strip() for item in tags)
        ):
            report.add_error(f"{exhibit_path}: card.tags must be an array of 1-8 non-empty strings")
        highlights = card.get("highlights", [])
        if highlights and (
            not isinstance(highlights, list)
            or len(highlights) > 4
            or any(not isinstance(item, str) or not item.strip() for item in highlights)
        ):
            report.add_error(
                f"{exhibit_path}: card.highlights must be an array of up to 4 non-empty strings"
            )
        status = card.get("status", "draft")
        if status not in {"draft", "submitted", "under-review", "featured"}:
            report.add_error(
                f"{exhibit_path}: card.status must be draft, submitted, under-review, or featured"
            )

    theme = exhibit.get("theme")
    if theme is not None and theme not in {"civic-lab", "planning-board", "innovation-belt"}:
        report.add_error(f"{exhibit_path}: theme must be civic-lab, planning-board, or innovation-belt")

    hero = exhibit.get("hero")
    if hero is not None and not isinstance(hero, dict):
        report.add_error(f"{exhibit_path}: hero must be an object")
    elif isinstance(hero, dict) and (
        not isinstance(hero.get("tagline"), str) or not hero.get("tagline").strip()
    ):
        report.add_error(f"{exhibit_path}: hero.tagline is required")

    badges = exhibit.get("badges", [])
    if badges and (
        not isinstance(badges, list)
        or len(badges) > 8
        or any(not isinstance(item, str) or not item.strip() for item in badges)
    ):
        report.add_error(f"{exhibit_path}: badges must be an array of up to 8 non-empty strings")

    modules = exhibit.get("modules")
    if modules is not None and not isinstance(modules, list):
        report.add_error(f"{exhibit_path}: modules must be an array")
    elif modules is not None and len(modules) > 16:
        report.add_error(f"{exhibit_path}: modules may contain at most 16 items")
    elif modules:
        for index, module in enumerate(modules):
            if not isinstance(module, dict):
                report.add_error(f"{exhibit_path}: modules[{index}] must be an object")
                continue
            module_type = module.get("type")
            if module_type not in ALLOWED_EXHIBIT_MODULE_TYPES:
                report.add_error(f"{exhibit_path}: unsupported module type `{module_type}`")

    proposal_dir = "/".join(exhibit_path.split("/")[:3])
    validate_exhibit_asset_references(report, repo_root, exhibit_path, proposal_dir, exhibit)


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
    required_metadata = ["title", "author_github", "language", "license", "summary"]
    for key in required_metadata:
        if not metadata.get(key):
            report.add_error(f"{proposal_path}: missing front matter field `{key}`")

    author = metadata.get("author_github", "")
    if author and author.lower() != pr_author.lower():
        report.add_error(
            f"{proposal_path}: author_github `{author}` must match PR author `{pr_author}`"
        )
    if author and author.lower() != path_author.lower():
        report.add_error(
            f"{proposal_path}: author_github `{author}` must match path owner `{path_author}`"
        )

    language = metadata.get("language")
    if language and language not in {"zh", "en", "bilingual"}:
        report.add_error(f"{proposal_path}: language must be zh, en, or bilingual")

    license_value = metadata.get("license")
    if license_value and license_value not in {"CC-BY-4.0", "CC-BY-SA-4.0"}:
        report.add_error(f"{proposal_path}: license must be CC-BY-4.0 or CC-BY-SA-4.0")

    for version_key in ["iteration", "version"]:
        version_value = metadata.get(version_key)
        if version_value and not ITERATION_RE.match(version_value):
            report.add_error(
                f"{proposal_path}: {version_key} must look like v0.1, 0.1, or 1.0.0"
            )

    headings = extract_headings(body)
    for required in REQUIRED_SECTIONS:
        if not any(required in heading for heading in headings):
            report.add_error(f"{proposal_path}: missing required section `## {required}`")

    for placeholder in PLACEHOLDERS:
        if placeholder in text:
            report.add_error(f"{proposal_path}: remove template placeholder `{placeholder}`")

    compact_len = len(re.sub(r"\s+", "", body))
    if compact_len < 800:
        report.add_warning(
            f"{proposal_path}: proposal body is short; AI review may request more detail"
        )

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


def validate_submission(
    repo_root: Path,
    pr_author: str,
    changed_files: Iterable[str],
    maintainer_bypass_logins: Iterable[str] = (),
) -> ValidationReport:
    report = ValidationReport()
    repo_root = repo_root.resolve()
    pr_author = pr_author.strip()
    bypass_logins = {login.strip().lower() for login in maintainer_bypass_logins if login.strip()}
    report.maintainer_bypass = pr_author.lower() in bypass_logins

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
    exhibit_files: set[str] = set()
    changelog_files: set[str] = set()

    for path in normalized_files:
        parts = path.split("/")
        full_path = repo_root / path

        if not report.maintainer_bypass:
            if parts[0] != "submissions" or len(parts) < 2:
                report.add_error(
                    f"{path}: participant PRs may only change submissions/{pr_author}/"
                )
                continue
            if parts[1].lower() != pr_author.lower():
                report.add_error(
                    f"{path}: PR author `{pr_author}` may not change submissions/{parts[1]}/"
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
        elif len(parts) == 4 and parts[3] == "exhibit.json":
            exhibit_files.add(path)
        elif len(parts) == 4 and parts[3] == "changelog.md":
            changelog_files.add(path)
        elif is_under_assets(parts):
            extension = Path(path).suffix.lower()
            if extension not in ALLOWED_ASSET_EXTENSIONS:
                allowed = ", ".join(sorted(ALLOWED_ASSET_EXTENSIONS))
                report.add_error(f"{path}: assets must use one of {allowed}")
        else:
            report.add_error(
                f"{path}: each proposal directory may contain proposal.md, exhibit.json, changelog.md, and assets/* only"
            )

        if not full_path.exists():
            report.add_error(f"{path}: changed file is missing in the PR checkout")
            continue
        if full_path.is_dir():
            report.add_error(f"{path}: directories are not valid changed files")
            continue

        size = full_path.stat().st_size
        report.total_bytes += size
        if path.endswith(".md") and size > MAX_MARKDOWN_BYTES:
            report.add_error(f"{path}: Markdown files must be <= {MAX_MARKDOWN_BYTES} bytes")
        if path.endswith(".json") and size > MAX_EXHIBIT_BYTES:
            report.add_error(f"{path}: JSON files must be <= {MAX_EXHIBIT_BYTES} bytes")
        if is_under_assets(parts) and size > MAX_ASSET_BYTES:
            report.add_error(f"{path}: assets must be <= {MAX_ASSET_BYTES} bytes")

    if report.total_bytes > MAX_TOTAL_BYTES:
        report.add_error(f"changed files total {report.total_bytes} bytes exceeds {MAX_TOTAL_BYTES}")

    for proposal_dir in sorted(proposal_dirs):
        proposal_path = f"{proposal_dir}/proposal.md"
        if not (repo_root / proposal_path).exists():
            report.add_error(f"{proposal_path}: every touched proposal directory needs proposal.md")
        else:
            proposal_files.add(proposal_path)

    for proposal_path in sorted(proposal_files):
        if not (repo_root / proposal_path).exists():
            continue
        path_author = proposal_path.split("/")[1]
        validate_proposal_file(report, repo_root, proposal_path, pr_author, path_author)

    for exhibit_path in sorted(exhibit_files):
        if not (repo_root / exhibit_path).exists():
            continue
        validate_exhibit_file(report, repo_root, exhibit_path)

    for changelog_path in sorted(changelog_files):
        if not (repo_root / changelog_path).exists():
            continue
        validate_changelog_file(report, repo_root, changelog_path)

    report.proposal_files = sorted(proposal_files)
    report.exhibit_files = sorted(exhibit_files)
    report.changelog_files = sorted(changelog_files)
    return report


def format_report(report: ValidationReport) -> str:
    lines = ["# Submission validation", ""]
    lines.append(f"Result: {'PASS' if report.ok else 'FAIL'}")
    lines.append(f"Changed files: {len(report.changed_files)}")
    lines.append(f"Proposal files: {len(report.proposal_files)}")
    lines.append(f"Exhibit files: {len(report.exhibit_files)}")
    lines.append(f"Changelog files: {len(report.changelog_files)}")
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
