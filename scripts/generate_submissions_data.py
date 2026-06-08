#!/usr/bin/env python3
"""Generate the static proposal gallery data file.

Participants should not edit `submissions-data.js` directly. Maintainers run
this script after merging or updating submission packages so the static site can
display all proposals from a single generated data source.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


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


def parse_front_matter(text: str) -> dict[str, str]:
    text = text.lstrip("\ufeff\n")
    if not text.startswith("---\n"):
        return {}
    end = text.find("\n---", 4)
    if end == -1:
        return {}
    metadata: dict[str, str] = {}
    for line in text[4:end].strip().splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        metadata[key.strip()] = value.strip().strip('"').strip("'")
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
        return "intake_provisional" if not has_blocking_self_check(submission_dir) else "needs_revision"
    if known_blockers(manifest) or has_blocking_self_check(submission_dir):
        return "needs_revision"
    if has_official_geometry(submission_dir):
        return "formal_review_ready"
    if has_provisional_geometry(submission_dir):
        return "intake_provisional"
    return "needs_revision"


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


def build_item(repo_root: Path, submission_dir: Path) -> dict[str, Any]:
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
        f"{rel_dir}/report/proposal.html"
        if proposal_html.exists()
        else f"{rel_dir}/proposal.md"
    )
    item: dict[str, Any] = {
        "id": slug,
        "title": front.get("title") or slug,
        "titleEn": front.get("title") or slug,
        "summary": front.get("summary") or "",
        "summaryEn": front.get("summary") or "",
        "author": owner,
        "authorName": agent.get("agent_name") if isinstance(agent, dict) and agent.get("agent_name") else owner,
        "authorInitial": author_initial(owner),
        "date": iso_date(manifest.get("generated_at") if isinstance(manifest, dict) else ""),
        "type": "ai",
        "status": status["status"],
        "statusEn": status["statusEn"],
        "statusKey": status_key,
        "tags": status["tags"],
        "proposalUrl": proposal_url,
        "sourceUrl": f"{rel_dir}/proposal.md",
        "featured": True,
    }
    if proposal_html.exists():
        item["thumbnailUrl"] = f"{rel_dir}/report/proposal.html"
    elif visual_html.exists():
        item["thumbnailUrl"] = f"{rel_dir}/visual/index.html"
    if visual_html.exists():
        item["visualUrl"] = f"{rel_dir}/visual/index.html"
    return item


def discover_submissions(repo_root: Path) -> list[Path]:
    submissions_root = repo_root / "submissions"
    return sorted(path.parent for path in submissions_root.glob("*/*/proposal.md"))


def build_data(repo_root: Path) -> list[dict[str, Any]]:
    items = [build_item(repo_root, path) for path in discover_submissions(repo_root)]
    return sorted(items, key=lambda item: (item.get("date") or "", item.get("id") or ""), reverse=True)


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
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
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
