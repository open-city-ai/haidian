#!/usr/bin/env python3
"""Generate the static proposal gallery data file.

Participants should not edit `submissions-data.js` directly. Every proposal
directory merged into the main branch is included by default. Maintainers run
this script after merging or updating submission packages so the static site can
display them from a single generated data source. `gallery-publication.json`
remains an optional curation layer for homepage features or an explicit hold.

Output
------
The generated file is ``submissions-data.js`` at the repository root. It
exports ``window.HAIDIAN_SUBMISSIONS``, an array of submission metadata objects
used by the gallery and gallery filter controls.

Each entry contains: ``id``, ``author``, ``title``, ``titleEn``, ``summary``,
``summaryEn``, ``language``, ``date``, ``status``, ``statusKey``, ``tracks``,
``scenarios``, ``sourceUrl``, ``proposalUrl``, ``visualUrl``, ``thumbnailUrl``,
and optional ``coverUrl``.

Usage
-----
Generate or update the data file (run from repository root)::

    python3 scripts/generate_submissions_data.py

Check whether the file is current without writing::

    python3 scripts/generate_submissions_data.py --check

Write to a custom output path::

    python3 scripts/generate_submissions_data.py --out path/to/submissions-data.js

Exit code is 0 on success and 1 when ``--check`` finds the file stale or when
any submission fails to parse.
"""

from __future__ import annotations

import argparse
from datetime import date
import hashlib
import json
import re
import sys
from pathlib import Path
from typing import Any
from urllib.parse import quote

from front_matter import parse_front_matter as parse_front_matter_document


PUBLICATION_FILE = "gallery-publication.json"


REQUIRED_PACKAGE_FILES = {
    "manifest.json",
    "agent.json",
    "metrics.json",
    "assumptions.json",
    "sources.json",
    "self_check.json",
    "compliance_matrix.json",
    "standard_matrix.json",
    "design_depth_matrix.json",
    "geometry/site_boundary.geojson",
    "geometry/key_areas.geojson",
    "geometry/land_use.geojson",
    "geometry/buildings.geojson",
    "geometry/roads.geojson",
    "geometry/green_space.geojson",
    "geometry/public_space.geojson",
    "geometry/constraints.geojson",
    "geometry/phasing.geojson",
    "report/proposal.html",
    "report/copyright_statement.md",
    "drawings/a3-booklet.pdf",
    "drawings/a0-boards.pdf",
    "visual/index.html",
}

STATUS_META = {
    "formal_review_ready": {
        "status": "正式评分就绪",
        "statusEn": "Formal review ready",
        "tags": ["Formal", "Ready", "HTML"],
    },
    "intake_provisional": {
        "status": "临时边界 intake",
        "statusEn": "Provisional intake",
        "tags": ["Formal intake", "Provisional", "HTML"],
    },
    "needs_revision": {
        "status": "需修改",
        "statusEn": "Needs revision",
        "tags": ["Needs revision"],
    },
    "blocked_fixture": {
        "status": "阻断样例",
        "statusEn": "Blocked fixture",
        "tags": ["流程测试", "Blocked"],
    },
    "legacy_fixture": {
        "status": "历史样例",
        "statusEn": "Legacy fixture",
        "tags": ["Legacy", "Fixture"],
    },
}


def read_json(path: Path) -> Any:
    if not path.exists():
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return None


def package_sha256(submission_dir: Path) -> str:
    """Hash the reviewed manifest plus every manifest-declared public artifact."""
    manifest_path = submission_dir / "manifest.json"
    manifest = read_json(manifest_path)
    if not isinstance(manifest, dict) or not isinstance(manifest.get("files"), list):
        raise SystemExit(f"{submission_dir}: manifest.json with a files array is required")
    paths = {"manifest.json", "proposal.md"}
    for index, item in enumerate(manifest["files"]):
        if not isinstance(item, dict) or not isinstance(item.get("path"), str):
            raise SystemExit(f"{manifest_path}: files[{index}].path is required")
        rel = item["path"].strip().replace("\\", "/")
        pure = Path(rel)
        if not rel or pure.is_absolute() or ".." in pure.parts:
            raise SystemExit(f"{manifest_path}: unsafe declared path {rel}")
        paths.add(rel)
    digest = hashlib.sha256()
    for rel in sorted(paths):
        path = submission_dir / rel
        if not path.is_file():
            raise SystemExit(f"{submission_dir}: reviewed package file is missing: {rel}")
        payload = path.read_bytes()
        digest.update(rel.encode("utf-8"))
        digest.update(b"\0")
        digest.update(str(len(payload)).encode("ascii"))
        digest.update(b"\0")
        digest.update(payload)
        digest.update(b"\0")
    return digest.hexdigest()


def parse_front_matter(text: str) -> dict[str, str]:
    metadata, _ = parse_front_matter_document(text)
    return metadata


def load_front_matter(proposal_path: Path) -> dict[str, str]:
    try:
        return parse_front_matter(proposal_path.read_text(encoding="utf-8"))
    except UnicodeDecodeError:
        return {}


def has_blocking_self_check(submission_dir: Path) -> bool:
    data = read_json(submission_dir / "self_check.json")
    if not isinstance(data, dict):
        return True
    if data.get("ok") is False:
        return True
    checks = data.get("checks")
    if isinstance(checks, list):
        for item in checks:
            if not isinstance(item, dict):
                continue
            if item.get("result") == "fail" and item.get("severity") == "blocking":
                return True
    return False


def stored_formal_readiness(submission_dir: Path) -> bool | None:
    data = read_json(submission_dir / "self_check.json")
    if isinstance(data, dict) and isinstance(data.get("can_enter_formal_review"), bool):
        return bool(data["can_enter_formal_review"])
    return None


def known_blockers(manifest: Any) -> list[str]:
    if not isinstance(manifest, dict):
        return []
    claim = manifest.get("validation_claim")
    if not isinstance(claim, dict):
        return []
    blockers = claim.get("known_blockers")
    if isinstance(blockers, list):
        return [str(item) for item in blockers if str(item).strip()]
    return []


def feature_collection(path: Path) -> list[dict[str, Any]]:
    data = read_json(path)
    if isinstance(data, dict) and isinstance(data.get("features"), list):
        return [item for item in data["features"] if isinstance(item, dict)]
    return []


def has_provisional_geometry(submission_dir: Path) -> bool:
    for rel in ["geometry/site_boundary.geojson", "geometry/key_areas.geojson"]:
        for feature in feature_collection(submission_dir / rel):
            props = feature.get("properties")
            if not isinstance(props, dict):
                continue
            if props.get("official_boundary") is False:
                return True
            if props.get("geometry_role") == "provisional_constraint":
                return True
    return False


def has_official_geometry(submission_dir: Path) -> bool:
    site_features = feature_collection(submission_dir / "geometry/site_boundary.geojson")
    key_features = feature_collection(submission_dir / "geometry/key_areas.geojson")
    if not site_features or len(key_features) < 3:
        return False
    for feature in [*site_features, *key_features]:
        props = feature.get("properties")
        if not isinstance(props, dict):
            return False
        if props.get("official_boundary") is not True:
            return False
        if props.get("geometry_role") != "official_constraint":
            return False
    return True


def package_complete(submission_dir: Path) -> bool:
    return all((submission_dir / rel).exists() for rel in REQUIRED_PACKAGE_FILES)


def classify_submission(submission_dir: Path, manifest: Any) -> str:
    # This is a display classification, not an independent attestation. A
    # historical package may retain formal_review_ready for gallery continuity
    # even when it predates the persisted-self-check contract; that label must
    # not be presented as newly trusted formal evidence.
    rel = submission_dir.as_posix()
    stage = manifest.get("submission_stage") if isinstance(manifest, dict) else None
    if "formal-blocked" in rel or "blocked-draft" in rel:
        return "blocked_fixture"
    if stage != "formal":
        return "legacy_fixture"
    if not package_complete(submission_dir):
        return "needs_revision"
    if stored_formal_readiness(submission_dir) is True:
        return "formal_review_ready"
    if stored_formal_readiness(submission_dir) is False:
        # Stored results created under the former organizer-data gate are not
        # authoritative. Only participant-controlled validation failures block.
        return "formal_review_ready" if not has_blocking_self_check(submission_dir) else "needs_revision"
    if known_blockers(manifest) or has_blocking_self_check(submission_dir):
        return "needs_revision"
    return "formal_review_ready"


def iso_date(value: Any) -> str:
    if not isinstance(value, str) or not value:
        return ""
    match = re.match(r"^(\d{4}-\d{2}-\d{2})", value)
    return match.group(1) if match else value[:10]


def author_initial(author: str) -> str:
    for char in author:
        if char.isalnum():
            return char.upper()
    return "A"


def build_item(repo_root: Path, submission_dir: Path, publication: dict[str, Any]) -> dict[str, Any]:
    rel_dir = submission_dir.relative_to(repo_root).as_posix()
    path_parts = submission_dir.relative_to(repo_root).parts
    owner = path_parts[1] if len(path_parts) >= 2 else "unknown"
    slug = path_parts[2] if len(path_parts) >= 3 else submission_dir.name
    front = load_front_matter(submission_dir / "proposal.md")
    manifest = read_json(submission_dir / "manifest.json")
    agent = read_json(submission_dir / "agent.json")
    status_key = classify_submission(submission_dir, manifest)
    status = STATUS_META[status_key]

    proposal_html = submission_dir / "report" / "proposal.html"
    visual_html = submission_dir / "visual" / "index.html"
    proposal_url = (
        f"proposal-view.html?proposal={quote(rel_dir, safe='/')}"
        if proposal_html.exists()
        else f"{rel_dir}/proposal.md"
    )
    primary_language = front.get("language", "zh")
    translation_language = "en" if primary_language == "zh" else "zh"
    translation_md = submission_dir / f"proposal.{translation_language}.md"
    translation_front = load_front_matter(translation_md) if translation_md.exists() else {}
    if primary_language == "en":
        title_zh = translation_front.get("title") or front.get("title_zh") or front.get("title") or slug
        title_en = front.get("title") or slug
        summary_zh = translation_front.get("summary") or front.get("summary_zh") or front.get("summary") or ""
        summary_en = front.get("summary") or ""
    else:
        title_zh = front.get("title") or slug
        title_en = translation_front.get("title") or front.get("title_en") or title_zh
        summary_zh = front.get("summary") or ""
        summary_en = translation_front.get("summary") or front.get("summary_en") or summary_zh

    source_urls = {primary_language: f"{rel_dir}/proposal.md"}
    proposal_urls = {primary_language: proposal_url}
    visual_urls: dict[str, str] = {}
    thumbnail_urls: dict[str, str] = {}
    if proposal_html.exists():
        thumbnail_urls[primary_language] = f"{rel_dir}/report/proposal.html"
    elif visual_html.exists():
        thumbnail_urls[primary_language] = f"{rel_dir}/visual/index.html"
    if visual_html.exists():
        visual_urls[primary_language] = f"{rel_dir}/visual/index.html"
    if translation_md.exists():
        source_urls[translation_language] = f"{rel_dir}/proposal.{translation_language}.md"
        proposal_urls[translation_language] = source_urls[translation_language]
    translated_report = submission_dir / "report" / f"proposal.{translation_language}.html"
    if translated_report.exists():
        url = f"{rel_dir}/report/proposal.{translation_language}.html"
        proposal_urls[translation_language] = url
        thumbnail_urls[translation_language] = url
    translated_visual = submission_dir / "visual" / f"index.{translation_language}.html"
    if translated_visual.exists():
        url = f"{rel_dir}/visual/index.{translation_language}.html"
        visual_urls[translation_language] = url
        thumbnail_urls.setdefault(translation_language, url)
    item: dict[str, Any] = {
        # Slugs are participant-scoped and frequently repeat across authors.
        # Use the repository-relative owner/slug pair as the public stable key.
        "id": f"{owner}/{slug}",
        "slug": slug,
        "title": title_zh,
        "titleEn": title_en,
        "summary": summary_zh,
        "summaryEn": summary_en,
        "author": owner,
        "authorName": agent.get("agent_name") if isinstance(agent, dict) and agent.get("agent_name") else owner,
        "authorInitial": author_initial(owner),
        "githubUrl": f"https://github.com/{quote(owner, safe='')}",
        "avatarUrl": f"https://github.com/{quote(owner, safe='')}.png?size=96",
        "date": iso_date(manifest.get("generated_at") if isinstance(manifest, dict) else ""),
        "type": "ai",
        "status": status["status"],
        "statusEn": status["statusEn"],
        "statusKey": status_key,
        "tags": status["tags"],
        "proposalUrl": proposal_url,
        "sourceUrl": f"{rel_dir}/proposal.md",
        "proposalUrlZh": proposal_urls.get("zh", proposal_url),
        "proposalUrlEn": proposal_urls.get("en", proposal_url),
        "sourceUrlZh": source_urls.get("zh", f"{rel_dir}/proposal.md"),
        "sourceUrlEn": source_urls.get("en", f"{rel_dir}/proposal.md"),
        "featured": bool(publication.get("featured", False)),
        "selectionReason": str(publication.get("selection_reason_zh", "")),
        "selectionReasonEn": str(publication.get("selection_reason_en", "")),
    }
    cover_image = manifest.get("cover_image") if isinstance(manifest, dict) else None
    if isinstance(cover_image, str) and cover_image.startswith("assets/media/"):
        normalized_cover = cover_image.strip().replace("\\", "/")
        pure_cover = Path(normalized_cover)
        if not pure_cover.is_absolute() and ".." not in pure_cover.parts:
            cover_path = submission_dir / normalized_cover
            if cover_path.is_file() and cover_path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}:
                item["coverUrl"] = f"{rel_dir}/{normalized_cover}"
    if proposal_html.exists():
        item["thumbnailUrl"] = f"{rel_dir}/report/proposal.html"
    elif visual_html.exists():
        item["thumbnailUrl"] = f"{rel_dir}/visual/index.html"
    if visual_html.exists():
        item["visualUrl"] = f"{rel_dir}/visual/index.html"
    item["thumbnailUrlZh"] = thumbnail_urls.get("zh", item.get("thumbnailUrl", ""))
    item["thumbnailUrlEn"] = thumbnail_urls.get("en", item.get("thumbnailUrl", ""))
    item["visualUrlZh"] = visual_urls.get("zh", item.get("visualUrl", ""))
    item["visualUrlEn"] = visual_urls.get("en", item.get("visualUrl", ""))
    return item


def discover_submissions(repo_root: Path) -> list[Path]:
    submissions_root = repo_root / "submissions"
    return sorted(path.parent for path in submissions_root.glob("*/*/proposal.md"))


def load_publication_registry(repo_root: Path) -> dict[str, dict[str, Any]]:
    path = repo_root / PUBLICATION_FILE
    data = read_json(path)
    if not isinstance(data, dict) or not isinstance(data.get("entries"), list):
        raise SystemExit(f"{PUBLICATION_FILE}: expected an object with an entries array")
    if data.get("version") != 1:
        raise SystemExit(f"{PUBLICATION_FILE}: version must be 1")
    unknown_root = sorted(set(data) - {"version", "entries"})
    if unknown_root:
        raise SystemExit(f"{PUBLICATION_FILE}: unknown fields: {', '.join(unknown_root)}")
    registry: dict[str, dict[str, Any]] = {}
    required_fields = {
        "path",
        "published",
        "featured",
        "review_status",
        "quality_tier",
        "reviewed_by",
        "reviewed_at",
        "rights_reviewed",
        "reviewed_package_sha256",
        "selection_reason_zh",
        "selection_reason_en",
        "selected_at",
    }
    for index, entry in enumerate(data["entries"]):
        if not isinstance(entry, dict) or not isinstance(entry.get("path"), str):
            raise SystemExit(f"{PUBLICATION_FILE}: entries[{index}].path is required")
        missing = sorted(required_fields - set(entry))
        if missing:
            raise SystemExit(f"{PUBLICATION_FILE}: entries[{index}] missing fields: {', '.join(missing)}")
        unknown = sorted(set(entry) - required_fields)
        if unknown:
            raise SystemExit(f"{PUBLICATION_FILE}: entries[{index}] unknown fields: {', '.join(unknown)}")
        for flag in ["published", "featured", "rights_reviewed"]:
            if not isinstance(entry[flag], bool):
                raise SystemExit(f"{PUBLICATION_FILE}: entries[{index}].{flag} must be boolean")
        for field in ["selection_reason_zh", "selection_reason_en"]:
            if not isinstance(entry[field], str) or len(entry[field].strip()) < 5:
                raise SystemExit(f"{PUBLICATION_FILE}: entries[{index}].{field} must contain at least 5 characters")
        for date_field in ["reviewed_at", "selected_at"]:
            try:
                date.fromisoformat(entry[date_field])
            except (TypeError, ValueError):
                raise SystemExit(f"{PUBLICATION_FILE}: entries[{index}].{date_field} must be YYYY-MM-DD") from None
        if entry["review_status"] not in {"approved_for_publication", "not_approved"}:
            raise SystemExit(f"{PUBLICATION_FILE}: entries[{index}].review_status is invalid")
        if entry["quality_tier"] not in {"qualified", "featured"}:
            raise SystemExit(f"{PUBLICATION_FILE}: entries[{index}].quality_tier is invalid")
        if not isinstance(entry["reviewed_by"], str) or not re.fullmatch(r"[A-Za-z0-9-]{1,39}", entry["reviewed_by"]):
            raise SystemExit(f"{PUBLICATION_FILE}: entries[{index}].reviewed_by must be a GitHub login")
        if not isinstance(entry["reviewed_package_sha256"], str) or not re.fullmatch(r"[0-9a-f]{64}", entry["reviewed_package_sha256"]):
            raise SystemExit(f"{PUBLICATION_FILE}: entries[{index}].reviewed_package_sha256 must be a lowercase SHA-256")
        rel = entry["path"].strip().rstrip("/")
        if rel in registry:
            raise SystemExit(f"{PUBLICATION_FILE}: duplicate entry for {rel}")
        if not rel.startswith("submissions/") or len(Path(rel).parts) != 3:
            raise SystemExit(f"{PUBLICATION_FILE}: invalid submission path {rel}")
        if entry.get("published") is True and not (repo_root / rel / "proposal.md").is_file():
            raise SystemExit(f"{PUBLICATION_FILE}: published submission does not exist: {rel}")
        if entry.get("featured") is True and entry.get("published") is not True:
            raise SystemExit(f"{PUBLICATION_FILE}: featured submission must also be published: {rel}")
        if entry.get("published") is True and entry.get("review_status") != "approved_for_publication":
            raise SystemExit(f"{PUBLICATION_FILE}: published submission needs approved_for_publication review: {rel}")
        if entry.get("published") is True and entry.get("rights_reviewed") is not True:
            raise SystemExit(f"{PUBLICATION_FILE}: published submission needs rights_reviewed=true: {rel}")
        if entry.get("featured") is True and entry.get("quality_tier") != "featured":
            raise SystemExit(f"{PUBLICATION_FILE}: homepage feature needs quality_tier=featured: {rel}")
        if entry.get("featured") is False and entry.get("quality_tier") == "featured":
            raise SystemExit(f"{PUBLICATION_FILE}: quality_tier=featured requires featured=true: {rel}")
        if entry.get("published") is True:
            actual_sha = package_sha256(repo_root / rel)
            if actual_sha != entry["reviewed_package_sha256"]:
                raise SystemExit(
                    f"{PUBLICATION_FILE}: reviewed package SHA-256 is stale for {rel}; "
                    f"expected {entry['reviewed_package_sha256']}, actual {actual_sha}; re-run maintainer review"
                )
        registry[rel] = entry
    return registry


def build_data(repo_root: Path) -> list[dict[str, Any]]:
    registry = load_publication_registry(repo_root)
    items = []
    for path in discover_submissions(repo_root):
        rel = path.relative_to(repo_root).as_posix()
        publication = registry.get(rel, {})
        # A merged proposal is public by default. A full registry entry with
        # published=false is an explicit maintainer hold; published=true keeps
        # the stricter package/version checks and may opt the item into the
        # homepage feature set.
        if publication and publication.get("published") is False:
            continue
        if publication.get("published") is True:
            manifest = read_json(path / "manifest.json")
            status_key = classify_submission(path, manifest)
            if status_key != "formal_review_ready":
                raise SystemExit(
                    f"{PUBLICATION_FILE}: cannot publish {rel} with generated status {status_key}; "
                    "repair and re-run the full maintainer review first"
                )
        items.append(build_item(repo_root, path, publication))
    return sorted(items, key=lambda item: (item.get("date") or "", item.get("slug") or ""), reverse=True)


def render_js(items: list[dict[str, Any]]) -> str:
    payload = json.dumps(items, ensure_ascii=False, indent=2)
    return (
        "// Generated by scripts/generate_submissions_data.py; do not edit manually.\n"
        f"window.HAIDIAN_SUBMISSIONS = {payload};\n"
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-root", default=".")
    parser.add_argument("--out", default="submissions-data.js")
    parser.add_argument("--check", action="store_true")
    parser.add_argument(
        "--package-sha",
        metavar="SUBMISSION_DIR",
        help="Print the deterministic reviewed-package SHA-256 and exit.",
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    if args.package_sha:
        submission_dir = Path(args.package_sha)
        if not submission_dir.is_absolute():
            submission_dir = repo_root / submission_dir
        print(package_sha256(submission_dir))
        return 0
    out_path = Path(args.out)
    if not out_path.is_absolute():
        out_path = repo_root / out_path
    generated = render_js(build_data(repo_root))
    if args.check:
        existing = out_path.read_text(encoding="utf-8") if out_path.exists() else ""
        if existing != generated:
            print(f"{out_path.relative_to(repo_root)} is out of date; run scripts/generate_submissions_data.py", file=sys.stderr)
            return 1
        return 0
    out_path.write_text(generated, encoding="utf-8")
    print(out_path.relative_to(repo_root))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
