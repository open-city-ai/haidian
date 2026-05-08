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
ALLOWED_ASSET_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
MAX_MARKDOWN_BYTES = 256 * 1024
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
        elif is_under_assets(parts):
            extension = Path(path).suffix.lower()
            if extension not in ALLOWED_ASSET_EXTENSIONS:
                allowed = ", ".join(sorted(ALLOWED_ASSET_EXTENSIONS))
                report.add_error(f"{path}: assets must use one of {allowed}")
        else:
            report.add_error(
                f"{path}: each proposal directory may contain proposal.md and assets/* only"
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

    report.proposal_files = sorted(proposal_files)
    return report


def format_report(report: ValidationReport) -> str:
    lines = ["# Submission validation", ""]
    lines.append(f"Result: {'PASS' if report.ok else 'FAIL'}")
    lines.append(f"Changed files: {len(report.changed_files)}")
    lines.append(f"Proposal files: {len(report.proposal_files)}")
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
