#!/usr/bin/env python3
"""Validate a manifest against the published site-package schema.

The import is intentionally lazy: the pull-request validator remains usable
for non-package checks when the optional jsonschema dependency is absent.
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any


SCHEMA_PATH = Path(__file__).resolve().parents[1] / "brief" / "site-package" / "schemas" / "manifest.schema.json"
LEGACY_ROLE_TOKEN = re.compile(r"^[a-z][a-z0-9_]{1,63}$")


def _json_path(parts: list[object]) -> str:
    result = ""
    for part in parts:
        if isinstance(part, int):
            result += f"[{part}]"
        elif result:
            result += f".{part}"
        else:
            result = str(part)
    return result or "<root>"


def schema_errors(manifest: dict[str, Any], schema_path: Path = SCHEMA_PATH) -> list[str]:
    """Return deterministic, human-readable schema errors for one manifest."""
    try:
        import jsonschema
    except ImportError:
        return [
            "jsonschema is required for manifest schema validation; "
            "install requirements-validation.txt"
        ]

    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    validator = jsonschema.Draft202012Validator(
        schema,
        format_checker=jsonschema.FormatChecker(),
    )
    errors = sorted(
        validator.iter_errors(manifest),
        key=lambda error: (list(error.absolute_path), error.message),
    )
    return [f"{_json_path(list(error.absolute_path))}: {error.message}" for error in errors]


def canonical_roles(schema_path: Path = SCHEMA_PATH) -> set[str]:
    """Return the controlled role vocabulary from the published 0.2 contract."""
    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    for condition in schema.get("allOf", []):
        role_schema = (
            condition.get("then", {})
            .get("properties", {})
            .get("files", {})
            .get("items", {})
            .get("properties", {})
            .get("role", {})
        )
        if isinstance(role_schema.get("enum"), list):
            return set(role_schema["enum"])
    raise ValueError("published manifest schema does not expose canonical 0.2 roles")


def _path_role_hint(path: str) -> str | None:
    """Return a role only when the path-to-role mapping is unambiguous."""
    normalized = path.replace("\\", "/").lstrip("./")
    filename = Path(normalized).name
    exact = {
        "manifest.json": "manifest",
        "agent.json": "agent_card",
        "metrics.json": "metrics",
        "assumptions.json": "assumptions",
        "sources.json": "sources",
        "self_check.json": "self_check",
        "compliance_matrix.json": "compliance_matrix",
        "standard_matrix.json": "standard_matrix",
        "design_depth_matrix.json": "design_depth_matrix",
        "changelog.md": "changelog",
        "proposal.md": "narrative",
        "proposal.en.md": "narrative",
    }
    if normalized in exact:
        return exact[normalized]
    if normalized in {"report/proposal.html", "report/proposal.en.html"}:
        return "rendered_proposal_html"
    if normalized in {"report/narrative.md", "visual/index.html", "visual/index.en.html"}:
        return "narrative" if filename == "narrative.md" else "visualization"
    if normalized.startswith("visual/assets/") and normalized.endswith(".js"):
        return "verification_script"
    return None


def legacy_role_findings(
    manifest: dict[str, Any],
    schema_path: Path = SCHEMA_PATH,
) -> list[dict[str, str]]:
    """Explain non-canonical roles without rewriting a legacy manifest.

    A path-specific suggestion is deliberately called a candidate. Everything
    else remains a schema-gap/extension finding so the audit never silently
    reclassifies contributor-owned evidence.
    """
    version = str(manifest.get("schema_version", ""))
    if not version.startswith("0.1."):
        return []
    files = manifest.get("files")
    if not isinstance(files, list):
        return []
    roles = canonical_roles(schema_path)
    findings: list[dict[str, str]] = []
    for item in files:
        if not isinstance(item, dict):
            continue
        path = item.get("path")
        role = item.get("role")
        if not isinstance(path, str) or not isinstance(role, str) or role in roles:
            continue
        if not LEGACY_ROLE_TOKEN.fullmatch(role):
            findings.append(
                {
                    "classification": "invalid_role_token",
                    "path": path,
                    "role": role,
                }
            )
            continue
        hint = _path_role_hint(path)
        if hint and hint != role:
            findings.append(
                {
                    "classification": "author_typo_candidate",
                    "path": path,
                    "role": role,
                    "suggested_role": hint,
                }
            )
            continue
        findings.append(
            {
                "classification": "schema_gap_or_extension",
                "path": path,
                "role": role,
                "suggested_role": "other",
                "suggested_role_detail": role,
            }
        )
    return findings


def manifest_paths(repo_root: Path) -> list[Path]:
    """Return repository submission manifests in stable path order."""
    return sorted((repo_root / "submissions").glob("*/*/manifest.json"))
