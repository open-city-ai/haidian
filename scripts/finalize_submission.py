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
    first_symbolic_link,
    is_empty_pdf,
    localized_path,
    normalize_changed_path,
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
REFRESH_PLACEHOLDER_MARKERS = ("SCAFFOLD-DRAFT", "PARTICIPANT-DESIGN: replace")


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def safe_manifest_path(root: Path, raw_path: object) -> tuple[str | None, Path | None, str | None]:
    """Normalize a manifest path and prove that it stays inside the package."""
    if not isinstance(raw_path, str):
        return None, None, "manifest.json contains a non-string file path"
    try:
        rel = normalize_changed_path(raw_path)
    except ValueError as exc:
        return None, None, f"manifest.json contains an unsafe file path {raw_path!r}: {exc}"
    linked = first_symbolic_link(root, rel)
    if linked is not None:
        linked_rel = linked.relative_to(root).as_posix()
        return None, None, f"manifest.json path traverses symbolic link: {rel} (via {linked_rel})"
    path = root / rel
    try:
        path.resolve().relative_to(root.resolve())
    except ValueError:
        return None, None, f"manifest.json path resolves outside the package: {rel}"
    return rel, path, None


def safe_fixed_package_path(root: Path, relative_path: str) -> Path:
    """Resolve a fixed package file without following a contributor symlink."""
    linked = first_symbolic_link(root, relative_path)
    if linked is not None:
        linked_rel = linked.relative_to(root).as_posix()
        raise ValueError(
            f"fixed package path traverses symbolic link: {relative_path} (via {linked_rel})"
        )
    path = root / relative_path
    try:
        path.resolve().relative_to(root.resolve())
    except ValueError as exc:
        raise ValueError(f"fixed package path resolves outside the package: {relative_path}") from exc
    return path


def invalidated_self_check_bytes(root: Path) -> bytes:
    """Build the fail-closed self-check payload for a package refresh."""
    path = safe_fixed_package_path(root, "self_check.json")
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError, json.JSONDecodeError):
        data = {}
    if not isinstance(data, dict):
        data = {}
    data["ok"] = False
    data["can_enter_formal_review"] = False
    data["review_status"] = "revision-requested"
    checks = data.get("checks")
    if not isinstance(checks, list):
        checks = []
    checks = [
        item
        for item in checks
        if not (isinstance(item, dict) and item.get("check_id") == "REFRESH_INVALIDATED")
    ]
    checks.append(
        {
            "check_id": "REFRESH_INVALIDATED",
            "result": "fail",
            "severity": "blocking",
            "target": "self_check.json",
            "message": "Package files changed; rerun scripts/self_check_submission.py before formal review.",
        }
    )
    data["checks"] = checks
    return (json.dumps(data, ensure_ascii=False, indent=2) + "\n").encode("utf-8")


def refresh_ready_package(root: Path, manifest_path: Path, manifest: dict) -> int:
    """Refresh hashes for a ready package after a participant revision.

    A ready package has already passed the scaffold-to-submission promotion
    checks.  Re-running those checks would reject a legitimate presentation-
    only edit because the files are no longer unchanged from the scaffold.
    Refresh therefore keeps the package state, verifies the anti-placeholder
    and bilingual metadata boundaries, rewrites declared hashes, and marks the
    persisted validation claim stale until self-check is run again.
    """
    errors: list[str] = []

    def fixed_path(relative_path: str) -> Path | None:
        try:
            return safe_fixed_package_path(root, relative_path)
        except ValueError as exc:
            errors.append(str(exc))
            return None

    try:
        self_check_path = safe_fixed_package_path(root, "self_check.json")
    except ValueError as exc:
        errors.append(str(exc))
        self_check_path = root / "self_check.json"
    proposal_path = fixed_path("proposal.md")
    if proposal_path is None or not proposal_path.is_file():
        errors.append("proposal.md is required for refresh")
        proposal_text = ""
    else:
        proposal_text = proposal_path.read_text(encoding="utf-8")
    for marker in REFRESH_PLACEHOLDER_MARKERS:
        if marker in proposal_text:
            errors.append(f"proposal.md still contains the generated placeholder marker: {marker}")
    for rel in [*FIGURES, *DRAWINGS, *READABLE_OUTPUTS]:
        path = fixed_path(rel)
        if path is None or not path.is_file():
            errors.append(f"required review artifact is missing: {rel}")
        elif rel in DRAWINGS and is_empty_pdf(path.read_bytes()):
            errors.append(f"{rel} has no pages or is still a placeholder drawing")

    proposal_metadata, _ = parse_front_matter(proposal_text) if proposal_text else ({}, "")
    primary_language = proposal_metadata.get("language")
    translation_language = "en" if primary_language == "zh" else "zh" if primary_language == "en" else None
    strict_bilingual = requires_bilingual_contract(proposal_metadata)
    if translation_language and strict_bilingual:
        expected_translation = localized_path("proposal.md", translation_language)
        if proposal_metadata.get("translation_file") != expected_translation:
            errors.append(
                f"proposal.md must declare translation_file: {expected_translation} for the required bilingual package"
            )
        translated_path = fixed_path(expected_translation)
        if translated_path is None or not translated_path.is_file():
            errors.append(f"required bilingual counterpart is missing: {expected_translation}")
        else:
            try:
                translated_metadata, _ = parse_front_matter(
                    translated_path.read_text(encoding="utf-8")
                )
            except UnicodeDecodeError:
                errors.append(f"{expected_translation} must be UTF-8 text")
            else:
                if translated_metadata.get("language") != translation_language:
                    errors.append(f"{expected_translation} must declare language: {translation_language}")
                if translated_metadata.get("translation_of") != "proposal.md":
                    errors.append(f"{expected_translation} must declare translation_of: proposal.md")

    files = manifest.get("files")
    listed_items: dict[str, dict] = {}
    if not isinstance(files, list) or not files:
        errors.append("manifest.json files must be a non-empty array")
    else:
        for item in files:
            if not isinstance(item, dict) or not item.get("path"):
                errors.append("manifest.json contains a file entry without a path")
                continue
            rel, path, path_error = safe_manifest_path(root, item["path"])
            if path_error:
                errors.append(path_error)
                continue
            assert rel is not None and path is not None
            item["path"] = rel
            if rel in listed_items:
                errors.append(f"manifest.json contains duplicate file entries: {rel}")
                continue
            listed_items[rel] = item
            if rel == "manifest.json":
                continue
            if not path.is_file():
                errors.append(f"manifest.json lists a missing file: {rel}")

    if translation_language and strict_bilingual:
        bilingual_primary_files = [*sorted(DISPLAY_BASE_FILES), *sorted(FIGURES)]
        for rel in bilingual_primary_files:
            primary_item = listed_items.get(rel)
            if primary_item is None:
                errors.append(f"manifest.json must list the required display file: {rel}")
                continue
            if rel.startswith("assets/figures/") and primary_item.get("language") == "neutral":
                continue
            translated_rel = localized_path(rel, translation_language)
            translated_path = fixed_path(translated_rel)
            if translated_path is None or not translated_path.is_file():
                errors.append(f"required bilingual counterpart is missing: {translated_rel}")
                continue
            translated_item = listed_items.get(translated_rel)
            if translated_item is None:
                errors.append(f"manifest.json must list the required bilingual counterpart: {translated_rel}")
                continue
            if translated_item.get("language") != translation_language:
                errors.append(f"{translated_rel} must declare language: {translation_language}")
            if translated_item.get("translation_of") != rel:
                errors.append(f"{translated_rel} must declare translation_of: {rel}")
            if translated_rel.endswith(".pdf") and is_empty_pdf(translated_path.read_bytes()):
                errors.append(f"{translated_rel} has no pages or is still a placeholder drawing")

    if errors:
        print("Ready package was not refreshed:")
        for error in errors:
            print(f"- {error}")
        return 1

    try:
        original_manifest = manifest_path.read_bytes()
        original_self_check = self_check_path.read_bytes()
        refreshed_self_check = invalidated_self_check_bytes(root)
    except (OSError, UnicodeDecodeError, json.JSONDecodeError, ValueError) as exc:
        print(f"Ready package was not refreshed: cannot prepare transactional update: {exc}")
        return 1

    for item in manifest["files"]:
        if not isinstance(item, dict):
            continue
        rel = item.get("path")
        if not rel or rel == "manifest.json":
            continue
        if rel == "self_check.json":
            item["sha256"] = hashlib.sha256(refreshed_self_check).hexdigest()
            continue
        _, path, path_error = safe_manifest_path(root, rel)
        if path_error is None and path is not None and path.is_file():
            item["sha256"] = digest(path)
    claim = manifest.get("validation_claim")
    if not isinstance(claim, dict):
        claim = {}
        manifest["validation_claim"] = claim
    claim["self_checked"] = False
    refreshed_manifest = (json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    try:
        self_check_path.write_bytes(refreshed_self_check)
        manifest_path.write_bytes(refreshed_manifest)
    except OSError as exc:
        try:
            self_check_path.write_bytes(original_self_check)
            manifest_path.write_bytes(original_manifest)
        except OSError as rollback_exc:
            print(
                "Ready package refresh failed and rollback was incomplete: "
                f"{exc}; rollback error: {rollback_exc}"
            )
            return 1
        print(f"Ready package was not refreshed; transactional update rolled back: {exc}")
        return 1
    print(f"Refreshed review-ready package: {root}")
    print(
        "Run self_check_submission.py --mark-self-checked now; the persisted validation "
        "claim remains pending until the passing four-gate report is persisted."
    )
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("submission_dir")
    parser.add_argument(
        "--refresh",
        action="store_true",
        help="refresh hashes for an existing ready_for_review package after a revision",
    )
    args = parser.parse_args()
    root = Path(args.submission_dir).resolve()
    try:
        manifest_path = safe_fixed_package_path(root, "manifest.json")
    except ValueError as exc:
        parser.error(str(exc))
    if not manifest_path.is_file():
        parser.error(f"manifest.json not found under {root}")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    package_state = manifest.get("package_state")
    if package_state == "ready_for_review":
        if not args.refresh:
            parser.error("package_state is ready_for_review; use --refresh to refresh a revised package")
        return refresh_ready_package(root, manifest_path, manifest)
    if package_state != "scaffold":
        parser.error("package_state must be scaffold before finalization")
    if args.refresh:
        parser.error("--refresh requires package_state=ready_for_review")

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
