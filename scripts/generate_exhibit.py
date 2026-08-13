#!/usr/bin/env python3
"""Generate a portal exhibit card for a submission (maintainer-curated).

Portal entry is a maintainer decision, not a contributor-supplied artifact.
Contributors do not include exhibit.json in their submissions (the deterministic
validator rejects it). After selecting a submission for the showcase, a
maintainer runs this script to derive exhibit.json from the merged package
proposal metadata and figures, then renders the portal with render_portal.py.

The generated exhibit.json is a local build artifact (gitignored under
submissions/), so it can be regenerated deterministically and never enters the
contributor intake path.

Prerequisites
-------------
The submission must be listed in gallery-publication.json with
"published": true and "review_status": "approved_for_publication"
before this script will generate an exhibit card for it.

Output
------
exhibit.json with: version, theme, card (title/summary/cover/tracks/scenarios),
links (proposal.md and report/proposal.html), hero, badges, and modules.

Usage
-----
Generate::

    python3 scripts/generate_exhibit.py submissions/<login>/<slug>

Check without writing::

    python3 scripts/generate_exhibit.py submissions/<login>/<slug> --check

Exit code is 0 on success and 1 when not approved or out of date.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

from validate_submission import parse_front_matter, parse_track_metadata
from generate_submissions_data import load_publication_registry


COVER_CANDIDATES = (
    "assets/figures/site-overview.png",
    "assets/figures/land-use-structure.png",
    "assets/figures/key-areas.png",
)
SPATIAL_IMAGE_CANDIDATES = (
    "assets/figures/land-use-structure.png",
    "assets/figures/site-overview.png",
)


def pick_image(submission_dir: Path, candidates: tuple[str, ...]) -> str | None:
    for rel in candidates:
        if (submission_dir / rel).exists():
            return rel
    for path in sorted((submission_dir / "assets" / "figures").glob("*.png")):
        return path.relative_to(submission_dir).as_posix()
    return None


def boundary_readiness(submission_dir: Path) -> bool:
    """Return True when the package is on official (not provisional) geometry."""
    self_check = submission_dir / "self_check.json"
    if not self_check.exists():
        return False
    try:
        data = json.loads(self_check.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return False
    checks = data.get("checks") if isinstance(data, dict) else None
    if not isinstance(checks, list):
        return False
    relevant = {"BOUNDARY_TRUST", "KEY_AREAS_TRUST"}
    seen: dict[str, str] = {}
    for item in checks:
        if isinstance(item, dict) and item.get("check_id") in relevant:
            seen[str(item["check_id"])] = str(item.get("severity", ""))
    return bool(seen) and all(severity == "info" for severity in seen.values())


def build_exhibit(repo_root: Path, submission_dir: Path) -> dict[str, Any]:
    proposal_path = submission_dir / "proposal.md"
    if not proposal_path.exists():
        raise SystemExit(f"{submission_dir}: proposal.md is missing")
    metadata, _body = parse_front_matter(proposal_path.read_text(encoding="utf-8"))

    title = metadata.get("title") or submission_dir.name
    tracks = parse_track_metadata(metadata.get("tracks"))
    scenarios = parse_track_metadata(metadata.get("scenarios"))
    summary = metadata.get("summary") or (
        "围绕百年京张 AI 创新带提出 formal 城市设计方案，覆盖三层范围、三处重点区域、"
        "AI 创新生态与落地路径。"
    )

    cover = pick_image(submission_dir, COVER_CANDIDATES)
    if cover is None:
        raise SystemExit(
            f"{submission_dir}: no cover image found under assets/figures/; "
            "render_portal requires card.cover to exist"
        )
    spatial_image = pick_image(submission_dir, SPATIAL_IMAGE_CANDIDATES) or cover

    rel = submission_dir.resolve().relative_to(repo_root.resolve()).as_posix()
    publication = load_publication_registry(repo_root).get(rel)
    if not publication or publication.get("published") is not True:
        raise SystemExit(f"{rel}: submission is not approved for public display in gallery-publication.json")
    official = boundary_readiness(submission_dir)
    readiness = "官方边界就绪" if official else "临时边界，保留精度警示并待正式数据发布后复算；不阻断内容评分"

    return {
        "version": 1,
        "theme": "civic-lab",
        "card": {
            "title": title,
            "subtitle": "百年京张 AI 创新带 formal 城市设计方案",
            "summary": summary,
            "cover": cover,
            "tags": ["AI 创新带", "城市更新", "公共空间"],
            "tracks": tracks,
            "scenarios": scenarios,
            "highlights": ["公开资料驱动", "三层范围递进", "人工复核高风险判断"],
            "status": "featured" if publication.get("featured") is True else "submitted",
        },
        "links": {"proposal": "proposal.md", "detail": "report/proposal.html"},
        "hero": {
            "eyebrow": "AI 城市方案展示",
            "tagline": "用结构化成果说明方案如何重塑京张创新廊道的公共价值。",
            "image": cover,
            "caption": f"方案概览示意图（{readiness}）。",
        },
        "badges": ["三层范围", "重点区域详细设计", "AI 创新生态", "人工复核"],
        "modules": [
            {"type": "executive_summary", "title": "方案摘要", "body": summary},
            {"type": "executive_summary", "title": "入选理由", "body": publication["selection_reason_zh"]},
            {
                "type": "spatial_strategy",
                "title": "空间策略",
                "image": spatial_image,
                "items": [
                    "统筹研究范围内组织 AI 产业生态与未来城市形态。",
                    "总体设计范围内推进城市更新、用地结构与蓝绿慢行系统。",
                    "三处重点区域开展控规深度的详细城市设计。",
                ],
            },
            {"type": "references", "title": "参考资料", "items": ["brief/public-brief.md"]},
        ],
    }


def validate_against_schema(repo_root: Path, exhibit: dict[str, Any]) -> None:
    schema_path = repo_root / "schema" / "exhibit.schema.json"
    if not schema_path.exists():
        return
    try:
        import jsonschema
    except ImportError:
        return
    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    jsonschema.validate(exhibit, schema)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("submission_dir")
    parser.add_argument("--repo-root", default=".")
    parser.add_argument(
        "--output",
        help="Output path (default: <submission_dir>/exhibit.json)",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Exit non-zero if the output is missing or out of date instead of writing it.",
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    submission_dir = Path(args.submission_dir)
    if not submission_dir.is_absolute():
        submission_dir = repo_root / submission_dir
    output = Path(args.output) if args.output else submission_dir / "exhibit.json"

    exhibit = build_exhibit(repo_root, submission_dir)
    validate_against_schema(repo_root, exhibit)
    rendered = json.dumps(exhibit, ensure_ascii=False, indent=2) + "\n"

    if args.check:
        if not output.exists():
            print(f"{output}: missing; run generate_exhibit.py to create it", file=sys.stderr)
            return 1
        if output.read_text(encoding="utf-8") != rendered:
            print(f"{output}: out of date; re-run generate_exhibit.py", file=sys.stderr)
            return 1
        print(f"{output}: up to date")
        return 0

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(rendered, encoding="utf-8")
    print(str(output))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
