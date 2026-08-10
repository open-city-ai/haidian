#!/usr/bin/env python3
"""Surface unusually close JSON Schema structures for human provenance review.

This module deliberately does not decide originality, plagiarism, copyright, or
permission. It identifies a narrow, reproducible structural signal so a
maintainer can inspect sources, attribution, and licence boundaries before a
submission is published.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path, PurePosixPath


MIN_TOP_LEVEL_REQUIRED_FIELDS = 8
MIN_NESTED_REQUIRED_MATCHES = 3
MIN_NESTED_REQUIRED_FIELDS = 3
MAX_FINDINGS_PER_CANDIDATE = 3


@dataclass(frozen=True)
class SchemaFingerprint:
    """Required-field vectors at the root and named object-property paths."""

    top_level_required: tuple[str, ...]
    nested_required: dict[str, tuple[str, ...]]


@dataclass(frozen=True)
class SchemaSimilarityFinding:
    """A high-confidence structural signal that needs human review."""

    candidate_path: str
    peer_path: str
    top_level_required_count: int
    nested_paths: tuple[str, ...]


def _required_vector(value: object) -> tuple[str, ...] | None:
    if not isinstance(value, dict):
        return None
    required = value.get("required")
    if not isinstance(required, list) or not all(isinstance(item, str) for item in required):
        return None
    if len(required) != len(set(required)):
        return None
    return tuple(required)


def fingerprint_schema(value: object) -> SchemaFingerprint | None:
    """Return only field structure, never descriptions, examples, or prose."""
    if not isinstance(value, dict):
        return None

    top_level_required = _required_vector(value)
    if top_level_required is None:
        return None

    nested_required: dict[str, tuple[str, ...]] = {}

    def visit(node: object, path: tuple[str, ...]) -> None:
        if not isinstance(node, dict):
            return
        if path:
            required = _required_vector(node)
            if required is not None:
                nested_required[".".join(path)] = required
        properties = node.get("properties")
        if not isinstance(properties, dict):
            return
        for name, child in properties.items():
            if isinstance(name, str):
                visit(child, (*path, name))

    visit(value, ())
    return SchemaFingerprint(top_level_required, nested_required)


def _ordered_subset(smaller: tuple[str, ...], larger: tuple[str, ...]) -> bool:
    """Require common fields to retain their relative required-field order."""
    smaller_fields = set(smaller)
    if not smaller_fields.issubset(larger):
        return False
    return smaller == tuple(item for item in larger if item in smaller_fields)


def _nested_required_matches(
    candidate: SchemaFingerprint,
    peer: SchemaFingerprint,
) -> tuple[str, ...]:
    matches: list[str] = []
    for path, candidate_fields in candidate.nested_required.items():
        peer_fields = peer.nested_required.get(path)
        if peer_fields is None:
            continue
        if min(len(candidate_fields), len(peer_fields)) < MIN_NESTED_REQUIRED_FIELDS:
            continue
        if _ordered_subset(candidate_fields, peer_fields) or _ordered_subset(peer_fields, candidate_fields):
            matches.append(path)
    return tuple(sorted(matches))


def find_structural_similarity(
    candidate_path: str,
    candidate: SchemaFingerprint,
    peer_path: str,
    peer: SchemaFingerprint,
) -> SchemaSimilarityFinding | None:
    """Return a finding only for a deliberately high bar of shared structure."""
    top_level = candidate.top_level_required
    if len(top_level) < MIN_TOP_LEVEL_REQUIRED_FIELDS or top_level != peer.top_level_required:
        return None
    nested_paths = _nested_required_matches(candidate, peer)
    if len(nested_paths) < MIN_NESTED_REQUIRED_MATCHES:
        return None
    return SchemaSimilarityFinding(
        candidate_path=candidate_path,
        peer_path=peer_path,
        top_level_required_count=len(top_level),
        nested_paths=nested_paths,
    )


def _load_fingerprint(path: Path) -> SchemaFingerprint | None:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError, json.JSONDecodeError):
        return None
    return fingerprint_schema(value)


def _proposal_root(path: PurePosixPath) -> tuple[str, str] | None:
    if len(path.parts) < 4 or path.parts[0] != "submissions":
        return None
    return path.parts[1], path.parts[2]


def _changed_schema_paths(worktree: Path, changed_files: list[str]) -> list[PurePosixPath]:
    paths: list[PurePosixPath] = []
    for raw_path in changed_files:
        path = PurePosixPath(raw_path)
        if path.is_absolute() or ".." in path.parts or not path.name.endswith(".schema.json"):
            continue
        if _proposal_root(path) is None or not (worktree / path).is_file():
            continue
        paths.append(path)
    return sorted(dict.fromkeys(paths), key=lambda item: item.as_posix())


def review_changed_schema_files(
    worktree: Path,
    trusted_repo_root: Path,
    changed_files: list[str],
) -> list[SchemaSimilarityFinding]:
    """Compare changed submission schemas with existing peer submission schemas.

    `worktree` contains inert contributor files. `trusted_repo_root` must be the
    checked-out base branch, so a submission cannot select the peer corpus that
    produces a warning.
    """
    peer_root = trusted_repo_root / "submissions"
    if not peer_root.is_dir():
        return []

    peer_fingerprints: list[tuple[PurePosixPath, SchemaFingerprint]] = []
    for peer_file in sorted(peer_root.rglob("*.schema.json")):
        if not peer_file.is_file():
            continue
        fingerprint = _load_fingerprint(peer_file)
        if fingerprint is not None:
            peer_fingerprints.append((peer_file.relative_to(trusted_repo_root), fingerprint))

    findings: list[SchemaSimilarityFinding] = []
    for candidate_path in _changed_schema_paths(worktree, changed_files):
        candidate_fingerprint = _load_fingerprint(worktree / candidate_path)
        candidate_root = _proposal_root(candidate_path)
        if candidate_fingerprint is None or candidate_root is None:
            continue
        candidate_findings: list[SchemaSimilarityFinding] = []
        for peer_path, peer_fingerprint in peer_fingerprints:
            if peer_path == candidate_path or _proposal_root(peer_path) == candidate_root:
                continue
            finding = find_structural_similarity(
                candidate_path.as_posix(),
                candidate_fingerprint,
                peer_path.as_posix(),
                peer_fingerprint,
            )
            if finding is not None:
                candidate_findings.append(finding)
        findings.extend(
            sorted(
                candidate_findings,
                key=lambda item: (-len(item.nested_paths), item.peer_path),
            )[:MAX_FINDINGS_PER_CANDIDATE]
        )
    return findings


def format_similarity_warning(finding: SchemaSimilarityFinding) -> str:
    """Keep the CI signal precise and non-accusatory."""
    nested_paths = ", ".join(f"`{path}`" for path in finding.nested_paths)
    return (
        f"{finding.candidate_path}: has the same ordered top-level `required` fields "
        f"({finding.top_level_required_count}) as existing peer schema {finding.peer_path}, "
        f"with ordered equal/subset nested `required` fields at {nested_paths}; "
        "maintainer provenance, attribution, and licence review required. "
        "This structural signal is not an automated plagiarism, infringement, or permission conclusion."
    )
