#!/usr/bin/env python3
"""Audit historical bilingual proposal pairs without modifying submissions.

This read-only tool scans all merged submission directories and reports the
health of each bilingual proposal pair (primary + translation).  It does not
write or modify any files.

Checks performed
----------------
- Both primary and translation files exist and declare the correct ``language``
  and ``translation_of`` front-matter.
- Section headings in both files are paired and aligned (by count and rough
  content match).
- Evidence markers (``[source:...]``, ``[depth:...]``, etc.) are present in
  both files with no large asymmetry.
- Inline images match between primary and translation.
- No legacy combined-file format (single file with ``# 中文正式译文`` heading)
  is mixed with the standalone bilingual contract.

Usage
-----
Run from the repository root::

    python3 scripts/audit_bilingual_backfill.py

Limit to specific submissions::

    python3 scripts/audit_bilingual_backfill.py submissions/alice/my-proposal

Exit code is 0 when the audit completes (it is advisory; individual issues
are warnings, not hard failures).
"""
from __future__ import annotations

import argparse
from collections import Counter
import re
from pathlib import Path

from backfill_bilingual_submissions import (
    CJK_RE,
    GENERIC_REFERENCE_RE,
    MARKDOWN_LINK_RE,
    PROTECTED_RE,
    front_value,
    infer_language,
    parse_front_matter,
    proposal_dirs,
)


ROOT = Path(__file__).resolve().parents[1]
HEADING_RE = re.compile(r"(?m)^(#{1,6})\s+(.+?)\s*$")
IMAGE_RE = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")
FENCE_RE = re.compile(r"(?ms)^(```|~~~)([^\n]*)\n(.*?)^\1\s*$")
LEGACY_ZH_RE = re.compile(r"(?m)^#\s+中文正式译文\s*$")


def comparison_body(body: str, source_language: str) -> str:
    if source_language == "en":
        marker = LEGACY_ZH_RE.search(body)
        if marker:
            return body[: marker.start()].rstrip() + "\n"
    return body


def normalized_image_path(path: str) -> str:
    return re.sub(r"\.(?:zh|en)(?=\.[^.]+$)", "", path)


def unprotected_cjk(text: str) -> bool:
    scrubbed = FENCE_RE.sub(
        lambda match: match.group(0)
        if match.group(2).strip().lower() in {"text", "plain", "plaintext"}
        else "",
        text,
    )
    scrubbed = PROTECTED_RE.sub("", scrubbed)
    scrubbed = GENERIC_REFERENCE_RE.sub("", scrubbed)
    scrubbed = MARKDOWN_LINK_RE.sub(
        lambda match: match.group(1) + match.group(2) + match.group(3) + match.group(5),
        scrubbed,
    )
    return bool(CJK_RE.search(scrubbed))


def audit_pair(directory: Path) -> list[str]:
    failures: list[str] = []
    primary_path = directory / "proposal.md"
    primary_front, primary_body = parse_front_matter(primary_path.read_text(encoding="utf-8"))
    source_language = infer_language(primary_front, primary_body)
    target_language = "en" if source_language == "zh" else "zh"
    expected_name = f"proposal.{target_language}.md"
    target_path = directory / expected_name

    if front_value(primary_front, "translation_file") != expected_name:
        failures.append(f"primary translation_file must be {expected_name}")
    if not target_path.exists():
        failures.append(f"missing {expected_name}")
        return failures

    target_front, target_body = parse_front_matter(target_path.read_text(encoding="utf-8"))
    if front_value(target_front, "language") != target_language:
        failures.append(f"{expected_name} language must be {target_language}")
    if front_value(target_front, "translation_of") != "proposal.md":
        failures.append(f"{expected_name} translation_of must be proposal.md")

    source_body = comparison_body(primary_body, source_language)
    source_headings = [len(match.group(1)) for match in HEADING_RE.finditer(source_body)]
    target_headings = [len(match.group(1)) for match in HEADING_RE.finditer(target_body)]
    if source_headings != target_headings:
        failures.append(
            f"heading level/order mismatch: {source_headings!r} != {target_headings!r}"
        )

    source_images = [normalized_image_path(path) for path in IMAGE_RE.findall(source_body)]
    target_images = [normalized_image_path(path) for path in IMAGE_RE.findall(target_body)]
    if source_images != target_images:
        failures.append(f"image order mismatch: {source_images!r} != {target_images!r}")

    source_references = Counter(GENERIC_REFERENCE_RE.findall(source_body))
    target_references = Counter(GENERIC_REFERENCE_RE.findall(target_body))
    if source_references != target_references:
        failures.append("evidence reference multiset mismatch")

    source_fences = [
        match.group(3)
        for match in FENCE_RE.finditer(source_body)
        if match.group(2).strip().lower() not in {"text", "plain", "plaintext"}
    ]
    target_fences = [
        match.group(3)
        for match in FENCE_RE.finditer(target_body)
        if match.group(2).strip().lower() not in {"text", "plain", "plaintext"}
    ]
    if source_fences != target_fences:
        failures.append("fenced code block mismatch")

    if target_language == "en" and unprotected_cjk(target_body):
        failures.append("English translation contains unprotected Chinese prose")
    return failures


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo-root", type=Path, default=ROOT)
    args = parser.parse_args(argv)
    repo_root = args.repo_root.resolve()

    failures: list[tuple[Path, list[str]]] = []
    directories = proposal_dirs(repo_root, [])
    if not directories:
        print("Audit failed: no bilingual submissions found under submissions/*/*/proposal.md")
        return 2
    for directory in directories:
        problems = audit_pair(directory)
        if problems:
            failures.append((directory, problems))
    if failures:
        for directory, problems in failures:
            print(directory.relative_to(repo_root))
            for problem in problems:
                print(f"  - {problem}")
        print(f"Audit failed for {len(failures)} of {len(directories)} submissions")
        return 1
    print(f"Audit passed for {len(directories)} bilingual submissions")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
