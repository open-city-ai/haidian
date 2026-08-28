#!/usr/bin/env python3
"""Validate the public data source registry without external dependencies.

The data source registry is at ``data/source_registry.json``. It is the
shared repository-wide index of sources that have been reviewed and classified
for use in formal urban design submissions. Participants must not modify this
file directly; submit a ``[source-registry]`` Issue to request additions.

Validation rules
----------------
- ``schema_version`` must be ``"0.1.0"``.
- ``updated_date`` must be ``YYYY-MM-DD`` format.
- Every source entry must have a unique ``source_id`` matching
  ``^[A-Z0-9][A-Z0-9_-]+$``.
- Required fields per entry: ``title``, ``publisher``, ``source_kind``,
  ``url``, ``accessed_date``, ``file_type``, ``authority_level``,
  ``timeliness_level``, ``public_access_status``, ``license_summary``,
  ``review_status``, ``usable_for_formal``, ``allowed_uses``,
  ``prohibited_uses``, ``topics``.
- ``authority_level`` must be one of ``A0``, ``A1``, ``A2``, ``A3``,
  ``CLEARED_USER_DOCUMENT``, ``PROVISIONAL_REPOSITORY``,
  ``OPEN_LICENSE_REFERENCE``.
- ``source_kind`` must be one of the recognized kind values.
- ``timeliness_level`` must be one of ``T0``–``T4`` or ``NA``.
- ``public_access_status`` must be a recognized access-status value.
- ``review_status`` must be one of ``approved``, ``provisional``,
  ``needs_review``, ``rejected``.
- ``usable_for_formal`` must be one of ``yes``, ``background_only``,
  ``provisional_only``, ``no``.
- Consistency rules: ``usable_for_formal=yes`` requires
  ``review_status=approved``; ``provisional`` sources cannot be
  ``usable_for_formal=yes``; ``restricted_or_unknown`` sources cannot be
  ``approved``.
- ``local_paths`` items must be relative repo paths that exist on disk.

Usage
-----
Validate the default registry::

    python3 scripts/validate_data_registry.py

Validate a custom registry::

    python3 scripts/validate_data_registry.py --registry path/to/registry.json

Machine-readable JSON::

    python3 scripts/validate_data_registry.py --json

Exit code is 0 when the registry passes all checks and 1 otherwise.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
import unicodedata
import urllib.parse
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


VALID_AUTHORITY_LEVELS = {
    "A0",
    "A1",
    "A2",
    "A3",
    "CLEARED_USER_DOCUMENT",
    "PROVISIONAL_REPOSITORY",
    "OPEN_LICENSE_REFERENCE",
}
VALID_SOURCE_KINDS = {
    "official_announcement",
    "official_standard",
    "official_open_data",
    "official_news",
    "media_report",
    "cleared_user_document",
    "provisional_repository_data",
    "open_license_reference",
    "international_reference",
}
VALID_TIMELINESS_LEVELS = {"T0", "T1", "T2", "T3", "T4", "NA"}
VALID_ACCESS_STATUSES = {
    "public_url",
    "public_local_snapshot",
    "cleared_for_repo",
    "provisional_repository",
    "restricted_or_unknown",
}
VALID_REVIEW_STATUSES = {"approved", "provisional", "needs_review", "rejected"}
VALID_FORMAL_USE = {"yes", "background_only", "provisional_only", "no"}
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
ID_RE = re.compile(r"^[A-Z0-9][A-Z0-9_-]+$")


@dataclass
class RegistryReport:
    ok: bool = True
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    source_count: int = 0

    def error(self, message: str) -> None:
        self.ok = False
        self.errors.append(message)

    def warning(self, message: str) -> None:
        self.warnings.append(message)

    def to_dict(self) -> dict[str, Any]:
        return {
            "ok": self.ok,
            "source_count": self.source_count,
            "errors": self.errors,
            "warnings": self.warnings,
        }


def load_json(path: Path, report: RegistryReport) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        report.error(f"{path}: registry file does not exist")
    except json.JSONDecodeError as exc:
        report.error(f"{path}: invalid JSON: {exc}")
    return None


def is_non_empty_list(value: Any) -> bool:
    return isinstance(value, list) and all(isinstance(item, str) and item.strip() for item in value) and bool(value)


def is_iso_date(value: Any) -> bool:
    if not isinstance(value, str) or not DATE_RE.fullmatch(value):
        return False
    try:
        dt.date.fromisoformat(value)
    except ValueError:
        return False
    return True


def is_http_url(value: str) -> bool:
    if any(char.isspace() or unicodedata.category(char) in {"Cc", "Cf", "Cs"} for char in value):
        return False
    try:
        parsed = urllib.parse.urlsplit(value)
        hostname = parsed.hostname
        _ = parsed.port
    except ValueError:
        return False
    return parsed.scheme.lower() in {"http", "https"} and bool(parsed.netloc) and bool(hostname)


def validate_local_path(report: RegistryReport, repo_root: Path, source_id: str, value: str) -> None:
    path = Path(value)
    if path.is_absolute() or ".." in path.parts:
        report.error(f"{source_id}: local path must be relative and stay inside the repo: {value}")
        return
    if path.parts and path.parts[0] == "submissions":
        report.error(f"{source_id}: data registry must not reference submitted proposal files: {value}")
        return
    resolved = (repo_root / path).resolve()
    try:
        resolved.relative_to(repo_root.resolve())
    except ValueError:
        report.error(f"{source_id}: local path escapes repo: {value}")
        return
    if not resolved.exists():
        report.error(f"{source_id}: local path does not exist: {value}")


def validate_source(report: RegistryReport, repo_root: Path, source: dict[str, Any], seen: set[str]) -> None:
    source_id = source.get("source_id")
    if not isinstance(source_id, str) or not ID_RE.match(source_id):
        report.error(f"source has invalid source_id: {source_id!r}")
        source_id = str(source_id or "<missing>")
    if source_id in seen:
        report.error(f"{source_id}: duplicate source_id")
    seen.add(source_id)

    required = [
        "title",
        "publisher",
        "source_kind",
        "url",
        "accessed_date",
        "file_type",
        "authority_level",
        "timeliness_level",
        "public_access_status",
        "license_summary",
        "review_status",
        "usable_for_formal",
        "allowed_uses",
        "prohibited_uses",
        "topics",
    ]
    for key in required:
        if key not in source:
            report.error(f"{source_id}: missing {key}")

    if source.get("authority_level") not in VALID_AUTHORITY_LEVELS:
        report.error(f"{source_id}: invalid authority_level {source.get('authority_level')!r}")
    if source.get("source_kind") not in VALID_SOURCE_KINDS:
        report.error(f"{source_id}: invalid source_kind {source.get('source_kind')!r}")
    if source.get("timeliness_level") not in VALID_TIMELINESS_LEVELS:
        report.error(f"{source_id}: invalid timeliness_level {source.get('timeliness_level')!r}")
    if source.get("public_access_status") not in VALID_ACCESS_STATUSES:
        report.error(f"{source_id}: invalid public_access_status {source.get('public_access_status')!r}")
    if source.get("review_status") not in VALID_REVIEW_STATUSES:
        report.error(f"{source_id}: invalid review_status {source.get('review_status')!r}")
    if source.get("usable_for_formal") not in VALID_FORMAL_USE:
        report.error(f"{source_id}: invalid usable_for_formal {source.get('usable_for_formal')!r}")

    accessed_date = source.get("accessed_date")
    if not is_iso_date(accessed_date):
        report.error(f"{source_id}: accessed_date must be YYYY-MM-DD")
    published_date = source.get("published_date")
    if published_date is not None and not is_iso_date(published_date):
        report.error(f"{source_id}: published_date must be YYYY-MM-DD or null")

    for key in ["allowed_uses", "prohibited_uses", "topics"]:
        if not is_non_empty_list(source.get(key)):
            report.error(f"{source_id}: {key} must be a non-empty string array")

    license_summary = source.get("license_summary")
    if not isinstance(license_summary, str) or len(license_summary.strip()) < 5:
        report.error(f"{source_id}: license_summary is too short")

    url = source.get("url")
    access_status = source.get("public_access_status")
    if not isinstance(url, str) or not url.strip():
        report.error(f"{source_id}: url must be a non-empty string")
    elif access_status in {"public_url", "public_local_snapshot"} and not is_http_url(url):
        report.error(f"{source_id}: public URL sources must use an http(s) url")
    elif access_status in {"cleared_for_repo", "provisional_repository"}:
        validate_local_path(report, repo_root, source_id, url)

    for local_path in source.get("local_paths", []) or []:
        if not isinstance(local_path, str):
            report.error(f"{source_id}: local_paths items must be strings")
            continue
        validate_local_path(report, repo_root, source_id, local_path)

    review_status = source.get("review_status")
    usable_for_formal = source.get("usable_for_formal")
    authority = source.get("authority_level")
    if review_status == "approved" and access_status == "restricted_or_unknown":
        report.error(f"{source_id}: restricted_or_unknown sources cannot be approved")
    if usable_for_formal == "yes" and review_status != "approved":
        report.error(f"{source_id}: usable_for_formal=yes requires review_status=approved")
    if usable_for_formal == "yes" and authority == "PROVISIONAL_REPOSITORY":
        report.error(f"{source_id}: provisional repository data cannot be usable_for_formal=yes")
    if review_status == "provisional" and usable_for_formal == "yes":
        report.error(f"{source_id}: provisional sources cannot be formal-ready")
    if review_status == "needs_review":
        report.warning(f"{source_id}: source still needs review")


def validate_registry(repo_root: Path, registry_path: Path) -> RegistryReport:
    report = RegistryReport()
    data = load_json(registry_path, report)
    if not isinstance(data, dict):
        return report
    if data.get("schema_version") != "0.1.0":
        report.error("registry schema_version must be 0.1.0")
    updated_date = data.get("updated_date")
    if not is_iso_date(updated_date):
        report.error("registry updated_date must be YYYY-MM-DD")
    sources = data.get("sources")
    if not isinstance(sources, list) or not sources:
        report.error("registry sources must be a non-empty array")
        return report
    report.source_count = len(sources)
    seen: set[str] = set()
    for source in sources:
        if not isinstance(source, dict):
            report.error("sources items must be objects")
            continue
        validate_source(report, repo_root, source, seen)
    return report


def main() -> int:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--repo-root",
        default=".",
        help="Repository root directory (default: current working directory)",
    )
    parser.add_argument(
        "--registry",
        default="data/source_registry.json",
        help="Path to the registry file relative to --repo-root (default: data/source_registry.json)",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Emit machine-readable JSON instead of text",
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    registry_path = Path(args.registry)
    if not registry_path.is_absolute():
        registry_path = repo_root / registry_path
    report = validate_registry(repo_root, registry_path)
    if args.json:
        print(json.dumps(report.to_dict(), ensure_ascii=False, indent=2))
    else:
        status = "PASS" if report.ok else "FAIL"
        print(f"data registry validation: {status} ({report.source_count} sources)")
        for message in report.errors:
            print(f"ERROR: {message}")
        for message in report.warnings:
            print(f"WARNING: {message}")
    return 0 if report.ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
