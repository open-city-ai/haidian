#!/usr/bin/env python3
"""Promote a materially edited scaffold to a review-ready submission package."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

from validate_submission import (
    DISPLAY_BASE_FILES,
    PERSISTED_READINESS_CONTRACT,
    is_empty_pdf,
    localized_path,
    parse_front_matter,
    primary_path_from_localized,
    requires_bilingual_contract,
)


FIGURES = [
    "assets/figures/site-overview.png",
    "assets/figures/land-use-structure.png",
    "assets/figures/key-areas.png",
    "assets/figures/mobility-bluegreen.png",
    "assets/figures/metrics-evidence.png",
]
DESIGN_GEOMETRY = [
    "geometry/land_use.geojson",
    "geometry/buildings.geojson",
    "geometry/roads.geojson",
    "geometry/green_space.geojson",
    "geometry/public_space.geojson",
    "geometry/phasing.geojson",
]
DRAWINGS = ["drawings/a3-booklet.pdf", "drawings/a0-boards.pdf"]
READABLE_OUTPUTS = ["proposal.md", "report/proposal.html", "visual/index.html"]


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("submission_dir")
    args = parser.parse_args()
    root = Path(args.submission_dir).resolve()
    manifest_path = root / "manifest.json"
    if not manifest_path.is_file():
        parser.error(f"manifest.json not found under {root}")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    if manifest.get("package_state") != "scaffold":
        parser.error("package_state must be scaffold before finalization")

    declared = {
        str(item.get("path")): str(item.get("sha256"))
        for item in manifest.get("files", [])
        if isinstance(item, dict) and item.get("path") and item.get("sha256")
    }
    errors: list[str] = []

    proposal_text = (root / "proposal.md").read_text(encoding="utf-8")
    proposal_metadata, _ = parse_front_matter(proposal_text)
    if "SCAFFOLD-DRAFT" in proposal_text:
        errors.append("proposal.md still contains the SCAFFOLD-DRAFT marker")

    primary_language = proposal_metadata.get("language")
    translation_language = "en" if primary_language == "zh" else "zh" if primary_language == "en" else None
    strict_bilingual = requires_bilingual_contract(proposal_metadata)
    if translation_language and strict_bilingual:
        expected_translation = localized_path("proposal.md", translation_language)
        if proposal_metadata.get("translation_file") != expected_translation:
            errors.append(
                f"proposal.md must declare translation_file: {expected_translation} for the required bilingual package"
            )

    def changed(rel: str) -> bool:
        path = root / rel
        return path.is_file() and rel in declared and digest(path) != declared[rel]

    for rel in READABLE_OUTPUTS:
        if not changed(rel):
            errors.append(f"{rel} is unchanged from the generated scaffold")
    unchanged_figures = [rel for rel in FIGURES if not changed(rel)]
    if unchanged_figures:
        errors.append("all five proposal figures must be regenerated: " + ", ".join(unchanged_figures))
    if not any(changed(rel) for rel in DESIGN_GEOMETRY):
        errors.append("at least one participant-controlled design geometry layer must change")
    for rel in DRAWINGS:
        path = root / rel
        if not changed(rel):
            errors.append(f"{rel} is unchanged from the placeholder drawing")
        elif is_empty_pdf(path.read_bytes()):
            errors.append(f"{rel} has no pages")

    if translation_language and strict_bilingual:
        listed_items = {
            str(item.get("path")): item
            for item in manifest.get("files", [])
            if isinstance(item, dict) and item.get("path")
        }
        bilingual_primary_files = [*sorted(DISPLAY_BASE_FILES), *FIGURES]
        for rel in bilingual_primary_files:
            item = listed_items.get(rel, {})
            if rel.startswith("assets/figures/") and item.get("language") == "neutral":
                continue
            translated_rel = localized_path(rel, translation_language)
            if not (root / translated_rel).is_file():
                errors.append(f"required bilingual counterpart is missing: {translated_rel}")
        translated_proposal = root / localized_path("proposal.md", translation_language)
        if translated_proposal.is_file():
            try:
                translated_metadata, _ = parse_front_matter(
                    translated_proposal.read_text(encoding="utf-8")
                )
            except UnicodeDecodeError:
                errors.append(f"{translated_proposal.name} must be UTF-8 text")
            else:
                if translated_metadata.get("language") != translation_language:
                    errors.append(f"{translated_proposal.name} must declare language: {translation_language}")
                if translated_metadata.get("translation_of") != "proposal.md":
                    errors.append(f"{translated_proposal.name} must declare translation_of: proposal.md")

    if errors:
        print("Submission is still a scaffold:")
        for error in errors:
            print(f"- {error}")
        return 1

    manifest["package_state"] = "ready_for_review"
    claim = manifest.get("validation_claim")
    if isinstance(claim, dict):
        claim["readiness_contract"] = PERSISTED_READINESS_CONTRACT
        claim["self_checked"] = False
        claim["known_blockers"] = [
            item for item in claim.get("known_blockers", [])
            if "Generated scaffold is not a submission" not in str(item)
        ]
    manifest_files = manifest.get("files", [])
    listed = {
        str(item.get("path")): item
        for item in manifest_files
        if isinstance(item, dict) and item.get("path")
    }
    if translation_language:
        for rel, item in list(listed.items()):
            if rel not in DISPLAY_BASE_FILES and not rel.startswith("assets/figures/"):
                continue
            if rel.startswith("assets/figures/") and primary_path_from_localized(rel) is not None:
                continue
            if rel.startswith("assets/figures/") and item.get("language") == "neutral":
                continue
            item["language"] = primary_language
            translated_rel = localized_path(rel, translation_language)
            translated_path = root / translated_rel
            if translated_path.is_file():
                translated_item = listed.get(translated_rel)
                if translated_item is None:
                    translated_item = {
                        "path": translated_rel,
                        "role": item.get("role", "narrative"),
                        "required": strict_bilingual,
                    }
                    manifest_files.append(translated_item)
                    listed[translated_rel] = translated_item
                translated_item["language"] = translation_language
                translated_item["translation_of"] = rel
                translated_item["required"] = strict_bilingual
    for item in manifest_files:
        if not isinstance(item, dict):
            continue
        rel = item.get("path")
        if rel and rel != "manifest.json" and (root / rel).is_file():
            item["sha256"] = digest(root / rel)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Review-ready package: {root}")
    print("Run self_check_submission.py --mark-self-checked --json now; it records the four-gate report and refreshes self_check.json's manifest hash. Any later file edit requires refreshed manifest hashes and another full validation.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
