#!/usr/bin/env python3
"""Validate the public source index.

The source index is deterministic project metadata. This script intentionally
uses only the Python standard library so it can run in CI without installing
untrusted dependencies.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path, PurePosixPath
from typing import Any


SOURCE_ID_RE = re.compile(r"^[a-z0-9][a-z0-9-]{2,63}$")
ALLOWED_TYPES = {"brief", "boundary", "policy", "map", "culture", "industry", "news", "other"}
ALLOWED_PUBLIC_STATUSES = {"confirmed-public", "public-draft", "external-public"}
REQUIRED_FIELDS = [
    "id",
    "title",
    "type",
    "publisher",
    "published_at",
    "public_status",
    "citation",
    "usage_note",
    "risk_note",
]


@dataclass
class SourceValidationReport:
    ok: bool = True
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    source_count: int = 0
    index_path: str = ""

    def add_error(self, message: str) -> None:
        self.ok = False
        self.errors.append(message)

    def add_warning(self, message: str) -> None:
        self.warnings.append(message)

    def to_dict(self) -> dict[str, Any]:
        return {
            "ok": self.ok,
            "errors": self.errors,
            "warnings": self.warnings,
            "source_count": self.source_count,
            "index_path": self.index_path,
        }


def normalize_local_path(raw_path: str) -> str:
    value = raw_path.strip().replace("\\", "/")
    path = PurePosixPath(value)
    if not value:
        raise ValueError("path may not be empty")
    if "://" in value or value.startswith("//") or path.is_absolute() or ".." in path.parts:
        raise ValueError(f"unsafe path: {raw_path}")
    return path.as_posix()


def validate_source_item(
    report: SourceValidationReport,
    repo_root: Path,
    source: Any,
    index: int,
    seen_ids: set[str],
) -> None:
    prefix = f"sources[{index}]"
    if not isinstance(source, dict):
        report.add_error(f"{prefix}: source must be an object")
        return

    for field_name in REQUIRED_FIELDS:
        if not isinstance(source.get(field_name), str) or not source.get(field_name, "").strip():
            report.add_error(f"{prefix}: missing required string field `{field_name}`")

    source_id = source.get("id", "")
    if isinstance(source_id, str) and source_id:
        if not SOURCE_ID_RE.match(source_id):
            report.add_error(f"{prefix}: invalid id `{source_id}`")
        if source_id in seen_ids:
            report.add_error(f"{prefix}: duplicate id `{source_id}`")
        seen_ids.add(source_id)

    source_type = source.get("type")
    if source_type and source_type not in ALLOWED_TYPES:
        allowed = ", ".join(sorted(ALLOWED_TYPES))
        report.add_error(f"{prefix}: type must be one of {allowed}")

    public_status = source.get("public_status")
    if public_status and public_status not in ALLOWED_PUBLIC_STATUSES:
        allowed = ", ".join(sorted(ALLOWED_PUBLIC_STATUSES))
        report.add_error(f"{prefix}: public_status must be one of {allowed}")

    path_value = source.get("path")
    url_value = source.get("url")
    if not path_value and not url_value:
        report.add_error(f"{prefix}: either `path` or `url` is required")

    if path_value is not None:
        if not isinstance(path_value, str):
            report.add_error(f"{prefix}: path must be a string")
        else:
            try:
                local_path = normalize_local_path(path_value)
            except ValueError as exc:
                report.add_error(f"{prefix}: {exc}")
            else:
                if not (repo_root / local_path).is_file():
                    report.add_error(f"{prefix}: referenced path is missing: {local_path}")

    if url_value is not None:
        if not isinstance(url_value, str) or not url_value.startswith("https://"):
            report.add_error(f"{prefix}: url must start with https://")

    for optional_key in source:
        if optional_key not in {*REQUIRED_FIELDS, "path", "url"}:
            report.add_error(f"{prefix}: unsupported field `{optional_key}`")


def validate_source_index(repo_root: Path, index_path: Path | None = None) -> SourceValidationReport:
    repo_root = repo_root.resolve()
    index_path = index_path or repo_root / "sources" / "public-sources.json"
    if not index_path.is_absolute():
        index_path = repo_root / index_path

    report = SourceValidationReport(index_path=str(index_path.relative_to(repo_root)))
    if not index_path.exists():
        report.add_error(f"{report.index_path}: source index is missing")
        return report

    try:
        index_data = json.loads(index_path.read_text(encoding="utf-8"))
    except UnicodeDecodeError:
        report.add_error(f"{report.index_path}: source index must be UTF-8 text")
        return report
    except json.JSONDecodeError as exc:
        report.add_error(f"{report.index_path}: invalid JSON: {exc.msg}")
        return report

    if not isinstance(index_data, dict):
        report.add_error(f"{report.index_path}: source index must be a JSON object")
        return report

    if index_data.get("version") != 1:
        report.add_error(f"{report.index_path}: version must be 1")

    sources = index_data.get("sources")
    if not isinstance(sources, list) or not sources:
        report.add_error(f"{report.index_path}: sources must be a non-empty array")
        return report

    report.source_count = len(sources)
    seen_ids: set[str] = set()
    for index, source in enumerate(sources):
        validate_source_item(report, repo_root, source, index, seen_ids)

    return report


def format_report(report: SourceValidationReport) -> str:
    lines = ["# Public sources validation", ""]
    lines.append(f"Result: {'PASS' if report.ok else 'FAIL'}")
    lines.append(f"Index: {report.index_path}")
    lines.append(f"Sources: {report.source_count}")
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
    parser.add_argument("--index", default="sources/public-sources.json")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    report = validate_source_index(Path(args.repo_root), Path(args.index))
    if args.json:
        print(json.dumps(report.to_dict(), ensure_ascii=False, indent=2))
    else:
        print(format_report(report))
    return 0 if report.ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
