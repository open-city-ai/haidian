#!/usr/bin/env python3
"""Run an advisory, deterministic functional-convergence audit.

The audit is a review prompt, not a plagiarism detector or originality score.
Participants provide explicit aliases for five public-function fields. The
tool then fetches only the proposal text needed for comparison, reports
field-level evidence, and keeps same-author iterations separate from peers.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
import urllib.error
from pathlib import Path, PurePosixPath
from typing import Any
from urllib.parse import urlparse

from read_peer_proposals import (
    RAW_ROOT,
    PeerReaderError,
    fetch_bytes,
    parse_index,
    proposal_base,
    proposal_key,
    safe_repo_path,
)


SCHEMA = "1.0-functional-convergence-audit"
FUNCTIONAL_FIELDS = (
    "beneficiary",
    "public_task",
    "spatial_carrier",
    "human_decision_right",
    "failure_outcome",
)
OPTIONAL_FIELDS = ("bounded_ai_role",)
FIELD_LABELS = {
    "beneficiary": "beneficiary / service recipient",
    "public_task": "end-to-end public task",
    "spatial_carrier": "spatial carrier or route",
    "human_decision_right": "named human decision or right",
    "failure_outcome": "public outcome after failure, refusal, or withdrawal",
    "bounded_ai_role": "bounded AI role",
}
DEFAULT_MAX_PROPOSALS = 200
DEFAULT_MAX_FILE_BYTES = 350_000
DEFAULT_MAX_INDEX_BYTES = 8_000_000
DEFAULT_MAX_EXCERPT_CHARS = 220
DEFAULT_MIN_ALIAS_CHARS = 2
USER_AGENT = "open-city-haidian-functional-convergence-audit/1.0"
NEGATION_PATTERNS = (
    re.compile(r"\b(?:does not|do not|did not|not|no|without|never|lacks?)\b", re.I),
    re.compile(r"(?:没有|无|未|不|尚未)[^。！？;；,，\n]{0,32}$"),
)


class AuditError(RuntimeError):
    """Raised when a candidate or catalog cannot be audited safely."""


def configure_utf8_output() -> None:
    for stream in (sys.stdout, sys.stderr):
        reconfigure = getattr(stream, "reconfigure", None)
        if reconfigure is not None:
            try:
                reconfigure(encoding="utf-8", errors="backslashreplace")
            except (OSError, ValueError):
                continue


def load_json(path: Path) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise AuditError(f"could not read JSON candidate: {path}") from exc
    if not isinstance(value, dict):
        raise AuditError(f"candidate must be a JSON object: {path}")
    return value


def compact(text: str) -> str:
    """Normalize prose for phrase matching without guessing synonyms."""
    return compact_with_map(text)[0]


def compact_with_map(text: str) -> tuple[str, list[int]]:
    normalized = unicodedata.normalize("NFKC", text).casefold()
    chars: list[str] = []
    positions: list[int] = []
    for index, char in enumerate(normalized):
        if re.match(r"[\w\u3400-\u9fff]", char, flags=re.UNICODE):
            chars.append(char)
            positions.append(index)
    return "".join(chars), positions


def display_text(text: str) -> str:
    return re.sub(r"\s+", " ", unicodedata.normalize("NFKC", text)).strip()


def candidate_field_values(value: Any, field: str) -> list[str]:
    """Return participant-entered values and explicit aliases only."""
    values: list[str] = []
    if isinstance(value, str):
        values.append(value)
    elif isinstance(value, list):
        for item in value:
            if isinstance(item, str):
                values.append(item)
    elif isinstance(value, dict):
        for key in ("value", "zh", "en"):
            item = value.get(key)
            if isinstance(item, str):
                values.append(item)
        aliases = value.get("aliases", [])
        if isinstance(aliases, list):
            values.extend(item for item in aliases if isinstance(item, str))
    else:
        raise AuditError(f"candidate field `{field}` must be a string, list, or object")

    cleaned: list[str] = []
    seen: set[str] = set()
    for item in values:
        item = display_text(item)
        normalized = compact(item)
        if len(normalized) < DEFAULT_MIN_ALIAS_CHARS or normalized in seen:
            continue
        seen.add(normalized)
        cleaned.append(item)
    if not cleaned:
        raise AuditError(f"candidate field `{field}` needs a value or explicit alias")
    return cleaned


def candidate_aliases(candidate: dict[str, Any]) -> dict[str, list[str]]:
    fields = candidate.get("fields")
    if not isinstance(fields, dict):
        fields = candidate
    aliases: dict[str, list[str]] = {}
    for field in (*FUNCTIONAL_FIELDS, *OPTIONAL_FIELDS):
        if field not in fields:
            if field in OPTIONAL_FIELDS:
                continue
            raise AuditError(f"candidate is missing required field `{field}`")
        aliases[field] = candidate_field_values(fields[field], field)
    return aliases


def load_catalog(index_path: str | None, repo_root: Path, max_bytes: int) -> tuple[list[dict[str, Any]], str]:
    if index_path:
        parsed = urlparse(index_path)
        if parsed.scheme in {"http", "https"}:
            text = fetch_bytes(index_path, max_bytes).decode("utf-8")
            return parse_index(text), index_path
        path = Path(index_path).expanduser().resolve()
    else:
        path = (repo_root / "submissions-data.js").resolve()
        if not path.is_file():
            url = f"{RAW_ROOT}/submissions-data.js"
            text = fetch_bytes(url, max_bytes).decode("utf-8")
            return parse_index(text), url
    try:
        return parse_index(path.read_text(encoding="utf-8")), str(path)
    except OSError as exc:
        raise AuditError(f"could not read catalog: {path}") from exc


def local_text(repo_root: Path, item: dict[str, Any], rel: str) -> str | None:
    base = PurePosixPath(proposal_base(item))
    path = repo_root / Path(*base.parts) / rel
    if not path.is_file():
        return None
    try:
        return path.read_text(encoding="utf-8")
    except OSError as exc:
        raise AuditError(f"could not read peer text: {path}") from exc


def remote_text(item: dict[str, Any], rel: str, max_bytes: int) -> str | None:
    path = safe_repo_path(f"{proposal_base(item)}/{rel}")
    try:
        return fetch_bytes(f"{RAW_ROOT}/{path}", max_bytes).decode("utf-8")
    except urllib.error.HTTPError as exc:
        if exc.code == 404:
            return None
        raise AuditError(f"failed to download peer text: HTTP {exc.code}") from exc
    except urllib.error.URLError as exc:
        raise AuditError(f"failed to download peer text: {exc.reason}") from exc


def load_peer_text(
    item: dict[str, Any],
    repo_root: Path,
    max_bytes: int,
    no_network: bool,
) -> tuple[str, str]:
    parts: list[tuple[str, str]] = []
    for rel in ("proposal.md", "proposal.en.md"):
        text = local_text(repo_root, item, rel)
        if text is None and not no_network:
            text = remote_text(item, rel, max_bytes)
        if text:
            parts.append((rel, text))
    if not parts:
        if no_network:
            raise AuditError(f"peer text is not present locally: {proposal_key(item)}")
        raise AuditError(f"peer text could not be downloaded: {proposal_key(item)}")
    return "\n\n".join(text for _, text in parts), "; ".join(rel for rel, _ in parts)


def excerpt(text: str, start: int, end: int, limit: int) -> str:
    half = max(30, (limit - 3) // 2)
    left = max(0, start - half)
    right = min(len(text), end + half)
    snippet = display_text(text[left:right])
    if left:
        snippet = "…" + snippet
    if right < len(text):
        snippet += "…"
    return snippet[:limit]


def negation_before(text: str, start: int) -> str | None:
    window_start = max(0, start - 96)
    window = text[window_start:start]
    for pattern in NEGATION_PATTERNS:
        match = pattern.search(window)
        if match:
            return display_text(match.group(0))
    return None


def field_matches(text: str, aliases: list[str], limit: int) -> dict[str, Any]:
    compact_text, positions = compact_with_map(text)
    hits: list[dict[str, str]] = []
    negated_hits: list[dict[str, str]] = []
    for alias in aliases:
        needle = compact(alias)
        index = compact_text.find(needle)
        if index < 0:
            continue
        original_index = positions[index]
        compact_end = index + len(needle) - 1
        original_end = min(len(text), positions[compact_end] + 1)
        negation = negation_before(text, original_index)
        if negation:
            negated_hits.append(
                {
                    "alias": alias,
                    "negation": negation,
                    "excerpt": excerpt(text, original_index, original_end, limit),
                }
            )
            continue
        hits.append(
            {
                "alias": alias,
                "excerpt": excerpt(text, original_index, original_end, limit),
            }
        )
    return {"matched": bool(hits), "hits": hits, "negated_hits": negated_hits}


def classification(coverage: int) -> str:
    if coverage == len(FUNCTIONAL_FIELDS):
        return "complete_functional_chain"
    if coverage >= 3:
        return "functional_overlap"
    if coverage >= 1:
        return "thematic_overlap"
    return "no_material_match"


def compare_item(
    candidate: dict[str, Any],
    aliases: dict[str, list[str]],
    item: dict[str, Any],
    text: str,
    text_files: str,
    excerpt_chars: int,
) -> dict[str, Any]:
    field_results: dict[str, Any] = {}
    for field in FUNCTIONAL_FIELDS:
        field_results[field] = field_matches(text, aliases[field], excerpt_chars)
    coverage = sum(1 for result in field_results.values() if result["matched"])
    author = str(item.get("author", ""))
    candidate_author = str(candidate.get("author", ""))
    candidate_key = str(candidate.get("candidate_key") or candidate.get("key") or "")
    key = proposal_key(item)
    relation = "self_iteration" if author and candidate_author and author.casefold() == candidate_author.casefold() else "peer"
    if key.casefold() == candidate_key.casefold():
        relation = "self_iteration"
    return {
        "proposal_key": key,
        "id": item.get("id"),
        "title": item.get("title"),
        "title_en": item.get("titleEn"),
        "author": author,
        "relation": relation,
        "coverage": {"matched_fields": coverage, "total_fields": len(FUNCTIONAL_FIELDS)},
        "classification": classification(coverage),
        "field_matches": field_results,
        "evidence_paths": [f"{proposal_base(item)}/{rel}" for rel in text_files.split("; ")],
    }


def audit(
    candidate: dict[str, Any],
    items: list[dict[str, Any]],
    repo_root: Path,
    max_proposals: int,
    max_bytes: int,
    excerpt_chars: int,
    no_network: bool,
) -> dict[str, Any]:
    aliases = candidate_aliases(candidate)
    candidate_key = str(candidate.get("candidate_key") or candidate.get("key") or "").strip()
    if not candidate_key:
        raise AuditError("candidate needs `candidate_key` or `key`")
    selected = items[:max_proposals]
    compared: list[dict[str, Any]] = []
    skipped: list[dict[str, str]] = []
    for item in selected:
        try:
            text, text_files = load_peer_text(item, repo_root, max_bytes, no_network)
        except AuditError as exc:
            skipped.append({"proposal_key": proposal_key(item), "reason": str(exc)})
            continue
        compared.append(compare_item(candidate, aliases, item, text, text_files, excerpt_chars))

    compared.sort(
        key=lambda item: (
            item["classification"] == "complete_functional_chain",
            item["coverage"]["matched_fields"],
            item["classification"] == "functional_overlap",
            item["relation"] == "self_iteration",
            item["proposal_key"],
        ),
        reverse=True,
    )
    return {
        "schema": SCHEMA,
        "candidate": {
            "candidate_key": candidate_key,
            "author": candidate.get("author"),
            "explicit_aliases": aliases,
        },
        "compared_count": len(compared),
        "catalog_count": len(items),
        "truncated": len(items) > len(selected),
        "skipped": skipped,
        "comparisons": compared,
        "limitations": [
            "This is an advisory review prompt, not a plagiarism verdict, originality score, or proof of copying.",
            "Matches are deterministic phrase or alias hits supplied by the participant; the tool does not infer synonyms with a hosted model.",
            "A complete functional-chain match asks for mutation or human review before more build work; it does not decide whether a proposal is original.",
            "Missing field matches may reflect missing aliases or unavailable peer text and require human inspection.",
        ],
    }


def main(argv: list[str] | None = None) -> int:
    configure_utf8_output()
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--candidate", required=True, help="Participant-provided candidate JSON")
    parser.add_argument("--index", help="Local submissions-data.js or HTTPS catalog URL")
    parser.add_argument("--repo-root", default=".", help="Sparse repository root with local proposal text")
    parser.add_argument("--max-proposals", type=int, default=DEFAULT_MAX_PROPOSALS)
    parser.add_argument("--max-file-bytes", type=int, default=DEFAULT_MAX_FILE_BYTES)
    parser.add_argument("--max-index-bytes", type=int, default=DEFAULT_MAX_INDEX_BYTES)
    parser.add_argument("--max-excerpt-chars", type=int, default=DEFAULT_MAX_EXCERPT_CHARS)
    parser.add_argument("--no-network", action="store_true", help="Fail closed when peer text is not local")
    parser.add_argument("--json", action="store_true", help="Print stable machine-readable JSON")
    args = parser.parse_args(argv)
    if min(args.max_proposals, args.max_file_bytes, args.max_index_bytes, args.max_excerpt_chars) < 1:
        parser.error("limits must be positive")
    try:
        candidate = load_json(Path(args.candidate).expanduser().resolve())
        items, source = load_catalog(args.index, Path(args.repo_root).expanduser().resolve(), args.max_index_bytes)
        result = audit(
            candidate,
            items,
            Path(args.repo_root).expanduser().resolve(),
            args.max_proposals,
            args.max_file_bytes,
            args.max_excerpt_chars,
            args.no_network,
        )
        result["catalog_source"] = source
    except (AuditError, PeerReaderError, OSError, UnicodeError) as exc:
        print(f"functional-convergence-audit: {exc}", file=sys.stderr)
        return 2

    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True))
    else:
        print(f"Functional convergence audit: {result['compared_count']} compared / {result['catalog_count']} catalogued")
        for item in result["comparisons"][:20]:
            matched = item["coverage"]["matched_fields"]
            total = item["coverage"]["total_fields"]
            print(f"{item['proposal_key']} [{item['relation']}] {item['classification']} {matched}/{total}")
        print("Advisory only: inspect evidence and mutate the public task when a complete chain matches.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())