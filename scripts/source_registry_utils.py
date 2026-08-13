"""Helpers for reading and summarizing the public source registry.

This module is imported by ``review_submission.py``, ``ai_review_submission.py``,
``scaffold_ai_submission.py``, and other scripts that need a quick read of
``data/source_registry.json`` without re-implementing the parsing logic.

Key functions
-------------
- :func:`load_source_registry` — load the full registry dict.
- :func:`summarize_source_registry` — return a compact summary with counts
  and the top sources per tier (formal, background, provisional, needs_review).
- :func:`source_registry_bullets` / :func:`source_registry_bullets_zh` —
  return 3-line English / Chinese summaries suitable for prompt context.

Source tiers
------------
- ``approved`` + ``usable_for_formal=yes`` — formal-ready; authoritative
  evidence for scoring claims.
- ``usable_for_formal=background_only`` — context and illustration only; must
  not support boundary, area, or statutory-control claims.
- ``usable_for_formal=provisional_only`` — intake and visualization only;
  must be labeled as provisional; not formal evidence.
- ``review_status=needs_review`` — not approved; must not be used in any
  formal or background capacity until a maintainer approves.

Agents must not upgrade background or provisional sources into official
boundaries, statutory controls, or formal scoring evidence.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


DEFAULT_SOURCE_REGISTRY_PATH = "data/source_registry.json"


def read_json(path: Path) -> Any:
    if not path.exists():
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        return {"_error": f"invalid JSON: {exc}"}


def load_source_registry(repo_root: Path) -> dict[str, Any]:
    """Load ``data/source_registry.json`` and return it as a dict.

    Returns an empty dict when the file is absent or unparseable.
    """
    data = read_json(repo_root / DEFAULT_SOURCE_REGISTRY_PATH)
    return data if isinstance(data, dict) else {}


def _increment(counts: dict[str, int], key: str) -> None:
    counts[key] = counts.get(key, 0) + 1


def _compact_source(source: dict[str, Any]) -> dict[str, Any]:
    return {
        "source_id": source.get("source_id"),
        "title": source.get("title"),
        "publisher": source.get("publisher"),
        "authority_level": source.get("authority_level"),
        "review_status": source.get("review_status"),
        "usable_for_formal": source.get("usable_for_formal"),
        "topics": source.get("topics", [])[:6] if isinstance(source.get("topics"), list) else [],
        "allowed_uses": source.get("allowed_uses", [])[:3] if isinstance(source.get("allowed_uses"), list) else [],
        "prohibited_uses": source.get("prohibited_uses", [])[:3] if isinstance(source.get("prohibited_uses"), list) else [],
        "url": source.get("url"),
    }


def summarize_source_registry(registry: dict[str, Any], limit: int = 8) -> dict[str, Any]:
    """Return a compact summary of the registry with per-tier source lists.

    Args:
        registry: The full registry dict as returned by :func:`load_source_registry`.
        limit: Maximum number of sources to include per tier (default: 8).

    Returns:
        A dict with ``counts``, ``approved_formal_sources``,
        ``background_sources``, ``provisional_sources``,
        ``needs_review_sources``, and a ``usage_rule`` string.
    """
    sources = registry.get("sources") if isinstance(registry, dict) else []
    if not isinstance(sources, list):
        sources = []
    counts = {
        "total": 0,
        "by_review_status": {},
        "by_usable_for_formal": {},
        "by_authority_level": {},
    }
    approved_formal = []
    provisional = []
    background = []
    needs_review = []
    for source in sources:
        if not isinstance(source, dict):
            continue
        counts["total"] += 1
        review_status = str(source.get("review_status", "unknown"))
        formal_use = str(source.get("usable_for_formal", "unknown"))
        authority = str(source.get("authority_level", "unknown"))
        _increment(counts["by_review_status"], review_status)
        _increment(counts["by_usable_for_formal"], formal_use)
        _increment(counts["by_authority_level"], authority)
        compact = _compact_source(source)
        if review_status == "approved" and formal_use == "yes":
            approved_formal.append(compact)
        elif formal_use == "provisional_only":
            provisional.append(compact)
        elif formal_use == "background_only":
            background.append(compact)
        elif review_status == "needs_review":
            needs_review.append(compact)
    return {
        "registry_path": DEFAULT_SOURCE_REGISTRY_PATH,
        "updated_date": registry.get("updated_date") if isinstance(registry, dict) else None,
        "counts": counts,
        "approved_formal_sources": approved_formal[:limit],
        "background_sources": background[:limit],
        "provisional_sources": provisional[:limit],
        "needs_review_sources": needs_review[:limit],
        "usage_rule": (
            "Use approved formal sources for formal evidence; "
            "background_only sources for context; "
            "provisional_only sources for intake/visualization only; "
            "needs_review sources must not be used until reviewed."
        ),
    }


def source_registry_bullets(summary: dict[str, Any]) -> list[str]:
    """Return 3-line English summary suitable for AI prompt context."""
    counts = summary.get("counts", {})
    formal_count = counts.get("by_usable_for_formal", {}).get("yes", 0) if isinstance(counts, dict) else 0
    background_count = counts.get("by_usable_for_formal", {}).get("background_only", 0) if isinstance(counts, dict) else 0
    provisional_count = counts.get("by_usable_for_formal", {}).get("provisional_only", 0) if isinstance(counts, dict) else 0
    return [
        f"{summary.get('registry_path', DEFAULT_SOURCE_REGISTRY_PATH)} records public/cleared/provisional source usability.",
        f"Current registry summary: {formal_count} formal-ready, {background_count} background-only, {provisional_count} provisional-only sources.",
        "Agents must not upgrade background_only or provisional_only sources into official boundaries, statutory controls, or formal scoring evidence.",
    ]


def source_registry_bullets_zh(summary: dict[str, Any]) -> list[str]:
    """Return 3-line Chinese summary suitable for AI prompt context."""
    counts = summary.get("counts", {})
    formal_count = counts.get("by_usable_for_formal", {}).get("yes", 0) if isinstance(counts, dict) else 0
    background_count = counts.get("by_usable_for_formal", {}).get("background_only", 0) if isinstance(counts, dict) else 0
    provisional_count = counts.get("by_usable_for_formal", {}).get("provisional_only", 0) if isinstance(counts, dict) else 0
    return [
        f"{summary.get('registry_path', DEFAULT_SOURCE_REGISTRY_PATH)} 登记公开、清权与临时资料的用途边界。",
        f"当前登记摘要：formal 可用资料 {formal_count} 条，背景资料 {background_count} 条，provisional-only 资料 {provisional_count} 条。",
        "agent 不得把 background_only 或 provisional_only 资料升级为 official boundary、法定控规、正式评分依据或政府实施承诺。",
    ]
