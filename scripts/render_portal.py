#!/usr/bin/env python3
"""Render a static portal page from proposal exhibit cards.

This is a maintainer-only rendering tool. It combines exhibit cards from
multiple submission directories into a single gallery portal page for the
public website.

The rendered page is a self-contained static HTML file with:
- A hero header with project title and description.
- A card grid of all included proposals.
- Track and scenario filter buttons.
- A side-by-side proposal comparison panel.
- Collection highlight sections (optional).

Security: The page does not execute contributor JavaScript; all interactive
behavior is driven by vanilla DOM and CSS. Remote resources are not loaded.

Usage
-----
Render a portal from multiple submission directories::

    python3 scripts/render_portal.py \\
        --proposal-dirs submissions/alice/proposal-a submissions/bob/proposal-b \\
        --title "百年京张 AI 创新带 · 城市设计方案展" \\
        --output public/submissions.html

Pass a collections directory for highlight sections::

    python3 scripts/render_portal.py \\
        --proposal-dirs ... \\
        --collections-dir collections/ \\
        --output public/submissions.html

Exit code is 0 on success and 1 on a parsing or rendering error.
"""
from __future__ import annotations

import argparse
import html
import json
import os
import re
from pathlib import Path, PurePosixPath
from typing import Any

from render_exhibit import safe_asset_path
from validate_submission import (
    load_scenario_registry,
    load_track_registry,
    parse_front_matter,
    parse_track_metadata,
)


class PortalError(ValueError):
    """Raised when portal input cannot be rendered safely."""


def text(value: Any, default: str = "") -> str:
    if value is None:
        return default
    return str(value)


def esc(value: Any) -> str:
    return html.escape(text(value), quote=True)


def compact_text(value: Any, limit: int = 240) -> str:
    compacted = re.sub(r"\s+", " ", text(value)).strip()
    if len(compacted) <= limit:
        return compacted
    return compacted[: limit - 1].rstrip() + "…"


def json_for_script(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False).replace("</", "<\\/")


def safe_local_link(raw_path: Any, default: str) -> str:
    value = text(raw_path, default).strip().replace("\\", "/") or default
    path = PurePosixPath(value)
    if "://" in value or value.startswith("//") or path.is_absolute() or ".." in path.parts:
        raise PortalError(f"unsafe portal link: {value}")
    return path.as_posix()


def relative_url(output_parent: Path, target: Path) -> str:
    return os.path.relpath(target.resolve(), output_parent.resolve()).replace(os.sep, "/")


def load_visual_assets(assets_dir: Path | None, output_parent: Path) -> dict[str, list[str]]:
    if not assets_dir:
        return {"archive": [], "modern": []}
    names = {
        "archive": ["archive-01.jpg", "archive-02.jpg", "archive-03.jpg", "archive-04.jpg"],
        "modern": ["modern-01.jpg", "modern-02.jpg", "modern-03.jpg", "modern-04.jpg"],
    }
    visuals: dict[str, list[str]] = {"archive": [], "modern": []}
    for group, filenames in names.items():
        for filename in filenames:
            path = assets_dir / filename
            if path.exists():
                visuals[group].append(relative_url(output_parent, path))
    return visuals


def safe_proposal_ref(raw_path: Any) -> str:
    value = text(raw_path).strip().replace("\\", "/")
    path = PurePosixPath(value)
    if not value:
        raise PortalError("collection proposal path is empty")
    if "://" in value or value.startswith("//") or path.is_absolute() or ".." in path.parts:
        raise PortalError(f"unsafe collection proposal path: {value}")
    if path.parts[0] == "submissions" and len(path.parts) == 3:
        return path.as_posix()
    if path.parts[0] == "examples" and len(path.parts) == 2:
        return path.as_posix()
    raise PortalError(
        f"collection proposal must look like submissions/<author>/<slug> or examples/<slug>: {value}"
    )


def proposal_tracks(
    card: dict[str, Any],
    metadata: dict[str, str],
    track_registry: dict[str, dict[str, object]],
) -> list[dict[str, str]]:
    track_ids = parse_track_metadata(card.get("tracks")) or parse_track_metadata(metadata.get("tracks"))
    tracks = []
    for track_id in track_ids[:3]:
        track = track_registry.get(track_id, {})
        tracks.append({"id": track_id, "title": text(track.get("title"), track_id)})
    return tracks


def proposal_scenarios(
    card: dict[str, Any],
    metadata: dict[str, str],
    scenario_registry: dict[str, dict[str, object]],
) -> list[dict[str, str]]:
    scenario_ids = parse_track_metadata(card.get("scenarios")) or parse_track_metadata(metadata.get("scenarios"))
    scenarios = []
    for scenario_id in scenario_ids[:8]:
        scenario = scenario_registry.get(scenario_id, {})
        scenarios.append({"id": scenario_id, "title": text(scenario.get("title"), scenario_id)})
    return scenarios


def load_risk_summary(proposal_dir: Path) -> dict[str, Any]:
    risk_path = proposal_dir / "risk.json"
    empty = {"dimensions": [], "max_score": None, "high_count": 0}
    if not risk_path.exists():
        return empty
    try:
        data = json.loads(risk_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise PortalError(f"{risk_path}: invalid JSON: {exc}") from exc
    if not isinstance(data, dict):
        raise PortalError(f"{risk_path}: risk.json must be an object")
    dimensions = data.get("dimensions")
    if not isinstance(dimensions, list):
        raise PortalError(f"{risk_path}: dimensions must be an array")

    parsed = []
    for item in dimensions:
        if not isinstance(item, dict):
            continue
        score = item.get("score")
        if isinstance(score, bool) or not isinstance(score, int) or score < 1 or score > 5:
            continue
        parsed.append(
            {
                "id": text(item.get("id")),
                "label": text(item.get("label"), text(item.get("id"), "风险")),
                "score": score,
                "note": text(item.get("note")),
            }
        )
    if not parsed:
        return empty
    top_dimensions = sorted(parsed, key=lambda item: (-item["score"], item["label"]))[:3]
    return {
        "dimensions": top_dimensions,
        "max_score": max(item["score"] for item in parsed),
        "high_count": sum(1 for item in parsed if item["score"] >= 4),
    }


def spatial_type_label(item_type: str) -> str:
    return {
        "node": "节点",
        "corridor": "廊道",
        "area": "区域",
    }.get(item_type, item_type)


def load_spatial_summary(proposal_dir: Path) -> dict[str, Any]:
    spatial_path = proposal_dir / "spatial.json"
    empty = {"summary": "", "items": [], "counts": {}}
    if not spatial_path.exists():
        return empty
    try:
        data = json.loads(spatial_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise PortalError(f"{spatial_path}: invalid JSON: {exc}") from exc
    if not isinstance(data, dict):
        raise PortalError(f"{spatial_path}: spatial.json must be an object")
    if data.get("disclaimer") != "concept-only":
        raise PortalError(f"{spatial_path}: disclaimer must be concept-only")
    items = data.get("items")
    if not isinstance(items, list):
        raise PortalError(f"{spatial_path}: items must be an array")

    parsed = []
    counts: dict[str, int] = {}
    for item in items:
        if not isinstance(item, dict):
            continue
        item_type = text(item.get("type"), "node")
        geometry = item.get("geometry") if isinstance(item.get("geometry"), dict) else {}
        counts[item_type] = counts.get(item_type, 0) + 1
        parsed.append(
            {
                "id": text(item.get("id")),
                "type": item_type,
                "type_label": spatial_type_label(item_type),
                "title": text(item.get("title"), "空间对象"),
                "summary": compact_text(item.get("summary"), 140),
                "label": text(geometry.get("label"), "概念位置"),
                "order": item.get("order") if isinstance(item.get("order"), int) else 99,
            }
        )
    parsed = sorted(parsed, key=lambda item: (item["order"], item["title"]))[:6]
    return {"summary": compact_text(data.get("summary"), 240), "items": parsed, "counts": counts}


def module_summary(exhibit: dict[str, Any], module_type: str, limit: int = 260) -> str:
    modules = exhibit.get("modules")
    if not isinstance(modules, list):
        return ""
    for module in modules:
        if not isinstance(module, dict) or module.get("type") != module_type:
            continue
        parts: list[str] = []
        for key in ["body", "caption"]:
            if module.get(key):
                parts.append(text(module.get(key)))
        for key in ["items", "cards", "scenarios", "steps", "metrics"]:
            values = module.get(key)
            if not isinstance(values, list):
                continue
            for item in values[:4]:
                if isinstance(item, str):
                    parts.append(item)
                elif isinstance(item, dict):
                    title = text(item.get("title") or item.get("name") or item.get("label") or item.get("period"))
                    body = text(item.get("body") or item.get("note") or item.get("value"))
                    parts.append("：".join(part for part in [title, body] if part))
        return compact_text("；".join(part for part in parts if part), limit)
    return ""


def compare_fields(card: dict[str, Any], exhibit: dict[str, Any]) -> dict[str, str]:
    track_titles = "、".join(track["title"] for track in card["tracks"]) or "未提供"
    tag_titles = "、".join(card["tags"]) or "未提供"
    highlight_text = "；".join(card["highlights"]) or "未提供"
    risk = card.get("risk") if isinstance(card.get("risk"), dict) else {}
    risk_dimensions = risk.get("dimensions") if isinstance(risk.get("dimensions"), list) else []
    if risk_dimensions:
        risk_text = "；".join(f"{item['label']} {item['score']}/5" for item in risk_dimensions)
    else:
        risk_text = "未提供"
    youth_text = "已覆盖" if any(track["id"] == "youth-friendly-public-space" for track in card["tracks"]) else "未单独声明"
    scenario_text = "、".join(scenario["title"] for scenario in card.get("scenarios", [])) or "未提供"
    spatial = card.get("spatial") if isinstance(card.get("spatial"), dict) else {}
    spatial_items = spatial.get("items") if isinstance(spatial.get("items"), list) else []
    spatial_text = "；".join(
        f"{item['type_label']}：{item['title']}（{item['label']}）" for item in spatial_items[:4]
    ) or "未提供"
    return {
        "核心概念": compact_text(card["summary"] or card["subtitle"], 220) or "未提供",
        "主题赛道": track_titles,
        "概念空间": spatial_text,
        "公共空间策略": module_summary(exhibit, "spatial_strategy") or "未提供",
        "产业生态/治理": module_summary(exhibit, "agent_workflow") or tag_titles,
        "AI 场景": module_summary(exhibit, "scenario_gallery") or scenario_text or highlight_text,
        "落地路径": module_summary(exhibit, "timeline") or "未提供",
        "风险与合规": risk_text,
        "青年友好": youth_text,
        "公众受益对象": tag_titles,
    }


def load_collections(collections_dir: Path | None, cards: list[dict[str, Any]]) -> list[dict[str, Any]]:
    if not collections_dir or not collections_dir.exists():
        return []
    if not collections_dir.is_dir():
        raise PortalError(f"{collections_dir}: collections path must be a directory")

    repo_root = collections_dir.resolve().parent

    def proposal_identity(raw_path: str) -> Path:
        path = Path(raw_path)
        return (path if path.is_absolute() else repo_root / path).resolve()

    card_lookup = {
        proposal_identity(text(card["source_path"])): card
        for card in cards
    }
    collections: list[dict[str, Any]] = []
    for path in sorted(collections_dir.glob("*.json")):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            raise PortalError(f"{path}: invalid JSON: {exc}") from exc
        if not isinstance(data, dict):
            raise PortalError(f"{path}: collection must be an object")
        if data.get("version") != 1:
            raise PortalError(f"{path}: collection version must be 1")
        items = data.get("items")
        if not isinstance(items, list) or not items:
            raise PortalError(f"{path}: collection items must be a non-empty array")

        rendered_items = []
        for item in items:
            if not isinstance(item, dict):
                raise PortalError(f"{path}: each collection item must be an object")
            proposal_ref = safe_proposal_ref(item.get("proposal"))
            matched = card_lookup.get(proposal_identity(proposal_ref))
            rendered_items.append(
                {
                    "proposal": proposal_ref,
                    "title": text(matched.get("title") if matched else "", proposal_ref),
                    "author": text(matched.get("author") if matched else "", "未载入"),
                    "url": matched.get("detail_url") if matched else "",
                    "reason": compact_text(item.get("reason"), 220),
                    "highlight": text(item.get("highlight")),
                    "loaded": matched is not None,
                }
            )
        collections.append(
            {
                "id": text(data.get("id"), path.stem),
                "title": text(data.get("title"), path.stem),
                "summary": compact_text(data.get("summary"), 320),
                "selection_reason": compact_text(data.get("selection_reason"), 320),
                "badge": text(data.get("badge"), "精选"),
                "items": rendered_items,
            }
        )
    return collections


def load_card(
    proposal_dir: Path,
    output_parent: Path,
    track_registry: dict[str, dict[str, object]],
    scenario_registry: dict[str, dict[str, object]],
) -> dict[str, Any]:
    proposal_path = proposal_dir / "proposal.md"
    exhibit_path = proposal_dir / "exhibit.json"
    if not proposal_path.exists():
        raise PortalError(f"{proposal_dir}: proposal.md is missing")
    if not exhibit_path.exists():
        raise PortalError(f"{proposal_dir}: exhibit.json is missing")

    metadata, _body = parse_front_matter(proposal_path.read_text(encoding="utf-8"))
    exhibit = json.loads(exhibit_path.read_text(encoding="utf-8"))
    if not isinstance(exhibit, dict):
        raise PortalError(f"{exhibit_path}: exhibit.json must be an object")
    card = exhibit.get("card")
    if not isinstance(card, dict):
        raise PortalError(f"{exhibit_path}: card must be an object")

    links = exhibit.get("links") if isinstance(exhibit.get("links"), dict) else {}
    cover = safe_asset_path(card.get("cover"))
    cover_path = proposal_dir / cover
    if not cover_path.exists():
        raise PortalError(f"{exhibit_path}: card.cover is missing: {cover}")
    detail = safe_local_link(links.get("detail"), "index.html")
    proposal = safe_local_link(links.get("proposal"), "proposal.md")

    tags = card.get("tags") if isinstance(card.get("tags"), list) else []
    highlights = card.get("highlights") if isinstance(card.get("highlights"), list) else []
    status = text(card.get("status"), "draft")

    loaded_card = {
        "id": f"{proposal_dir.parent.name}-{proposal_dir.name}",
        "source_path": proposal_dir.as_posix().rstrip("/"),
        "title": text(card.get("title"), metadata.get("title", proposal_dir.name)),
        "subtitle": text(card.get("subtitle"), metadata.get("summary", "")),
        "summary": text(card.get("summary"), metadata.get("summary", "")),
        "cover": relative_url(output_parent, cover_path),
        "tags": [text(item) for item in tags if text(item).strip()][:8],
        "tracks": proposal_tracks(card, metadata, track_registry),
        "scenarios": proposal_scenarios(card, metadata, scenario_registry),
        "risk": load_risk_summary(proposal_dir),
        "spatial": load_spatial_summary(proposal_dir),
        "highlights": [text(item) for item in highlights if text(item).strip()][:4],
        "status": status,
        "author": metadata.get("author_github", proposal_dir.parent.name),
        "language": metadata.get("language", "zh"),
        "license": metadata.get("license", "CC-BY-4.0"),
        "detail_url": relative_url(output_parent, proposal_dir / detail),
        "proposal_url": relative_url(output_parent, proposal_dir / proposal),
    }
    loaded_card["compare"] = compare_fields(loaded_card, exhibit)
    return loaded_card


def status_label(status: str) -> str:
    return {
        "draft": "草稿",
        "submitted": "已提交",
        "under-review": "复核中",
        "featured": "精选",
    }.get(status, status)


def render_card(card: dict[str, Any]) -> str:
    tags = "".join(f"<span>{esc(tag)}</span>" for tag in card["tags"])
    track_attr = " ".join(track["id"] for track in card["tracks"])
    scenario_attr = " ".join(scenario["id"] for scenario in card["scenarios"])
    tracks = "".join(
        f'<span data-track-id="{esc(track["id"])}">{esc(track["title"])}</span>'
        for track in card["tracks"]
    )
    scenarios = "".join(
        f'<span data-scenario-id="{esc(scenario["id"])}">{esc(scenario["title"])}</span>'
        for scenario in card["scenarios"]
    )
    risk = card.get("risk") if isinstance(card.get("risk"), dict) else {}
    risk_dimensions = risk.get("dimensions") if isinstance(risk.get("dimensions"), list) else []
    risk_items = "".join(
        f'<span class="risk-item" data-score="{item["score"]}">'
        f'<em>{esc(item["label"])}</em><b>{item["score"]}/5</b>'
        f'<i style="--risk-score: {item["score"]}"></i></span>'
        for item in risk_dimensions
    )
    risk_html = ""
    if risk_items:
        risk_html = (
            '<div class="risk-panel">'
            f'<div class="risk-head"><strong>风险矩阵</strong><span>高风险 {risk.get("high_count", 0)} 项</span></div>'
            f'<div class="risk-list">{risk_items}</div>'
            "</div>"
        )
    spatial = card.get("spatial") if isinstance(card.get("spatial"), dict) else {}
    spatial_items = spatial.get("items") if isinstance(spatial.get("items"), list) else []
    spatial_html = ""
    if spatial_items:
        spatial_nodes = "".join(
            f'<li><span>{esc(item["type_label"])}</span><strong>{esc(item["title"])}</strong><em>{esc(item["label"])}</em></li>'
            for item in spatial_items[:5]
        )
        spatial_html = (
            '<div class="spatial-panel">'
            '<div class="spatial-head"><strong>概念空间</strong><span>concept-only</span></div>'
            f"<ol>{spatial_nodes}</ol>"
            "</div>"
        )
    highlights = "".join(f"<li>{esc(item)}</li>" for item in card["highlights"])
    return f"""
      <a class="proposal-card" href="{esc(card['detail_url'])}" data-proposal-id="{esc(card['id'])}" data-tracks="{esc(track_attr)}" data-scenarios="{esc(scenario_attr)}" aria-label="查看 {esc(card['title'])}">
        <div class="cover-frame">
          <img src="{esc(card['cover'])}" alt="{esc(card['title'])}" loading="lazy">
          <span class="status">{esc(status_label(card['status']))}</span>
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span>@{esc(card['author'])}</span>
            <span>{esc(card['language'])}</span>
            <span>{esc(card['license'])}</span>
          </div>
          <h2>{esc(card['title'])}</h2>
          <p class="subtitle">{esc(card['subtitle'])}</p>
          <p class="card-summary">{esc(card['summary'])}</p>
          <div class="track-row">{tracks}</div>
          <div class="scenario-row">{scenarios}</div>
          {spatial_html}
          {risk_html}
          <div class="tag-row">{tags}</div>
          <ul class="highlights">{highlights}</ul>
        </div>
      </a>
"""


def css_url(value: str) -> str:
    return "url('" + value.replace("'", "%27") + "')"


def render_visual_strip(visuals: dict[str, list[str]]) -> str:
    archive = visuals.get("archive", [])
    modern = visuals.get("modern", [])
    if not archive and not modern:
        return """
        <div class="visual-backdrop visual-fallback" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
"""
    style_parts = []
    if archive:
        style_parts.append(f"--archive-main: {css_url(archive[0])}")
    if len(archive) > 1:
        style_parts.append(f"--archive-ghost: {css_url(archive[1])}")
    if len(archive) > 2:
        style_parts.append(f"--archive-detail: {css_url(archive[2])}")
    if modern:
        style_parts.append(f"--modern-main: {css_url(modern[0])}")
    if len(modern) > 1:
        style_parts.append(f"--modern-ghost: {css_url(modern[1])}")
    if len(modern) > 2:
        style_parts.append(f"--modern-detail: {css_url(modern[2])}")
    style_attr = "; ".join(style_parts)
    return f"""
        <div class="visual-backdrop" style="{esc(style_attr)}" aria-hidden="true"></div>
"""


def render_collections(collections: list[dict[str, Any]]) -> str:
    if not collections:
        return ""
    collection_html = []
    for collection in collections:
        items = []
        for item in collection["items"]:
            title = esc(item["title"])
            if item["url"]:
                title_html = f'<a href="{esc(item["url"])}">{title}</a>'
            else:
                title_html = f"<span>{title}</span>"
            highlight = f'<em>{esc(item["highlight"])}</em>' if item["highlight"] else ""
            loaded = "" if item["loaded"] else '<small>未载入 portal</small>'
            items.append(
                "<li>"
                f"<div>{title_html}{loaded}</div>"
                f"{highlight}"
                f"<p>{esc(item['reason'])}</p>"
                "</li>"
            )
        reason = ""
        if collection["selection_reason"]:
            reason = f'<p class="collection-reason">{esc(collection["selection_reason"])}</p>'
        collection_html.append(
            '<article class="collection-card">'
            f'<span class="collection-badge">{esc(collection["badge"])}</span>'
            f"<h2>{esc(collection['title'])}</h2>"
            f"<p>{esc(collection['summary'])}</p>"
            f"{reason}"
            f"<ul>{''.join(items)}</ul>"
            "</article>"
        )
    return f"""
    <section class="collections" aria-label="精选方案专题">
      <div class="section-head">
        <strong>精选专题</strong>
        <span>维护者整理的阅读入口，非官方审定结论</span>
      </div>
      <div class="collection-grid">{''.join(collection_html)}</div>
    </section>
"""


def render_portal(
    cards: list[dict[str, Any]],
    title: str,
    visuals: dict[str, list[str]] | None = None,
    collections: list[dict[str, Any]] | None = None,
) -> str:
    visuals = visuals or {"archive": [], "modern": []}
    collections = collections or []
    tag_counts: dict[str, int] = {}
    track_counts: dict[str, dict[str, Any]] = {}
    scenario_counts: dict[str, dict[str, Any]] = {}
    for card in cards:
        for tag in card["tags"]:
            tag_counts[tag] = tag_counts.get(tag, 0) + 1
        for track in card["tracks"]:
            bucket = track_counts.setdefault(track["id"], {"title": track["title"], "count": 0})
            bucket["count"] += 1
        for scenario in card["scenarios"]:
            bucket = scenario_counts.setdefault(
                scenario["id"], {"title": scenario["title"], "count": 0}
            )
            bucket["count"] += 1
    top_tags = sorted(tag_counts.items(), key=lambda item: (-item[1], item[0]))[:10]
    tag_cloud = "".join(f"<span>{esc(tag)} <b>{count}</b></span>" for tag, count in top_tags)
    track_buttons = [
        f'<button type="button" class="active" data-track-filter="all">全部 <b>{len(cards)}</b></button>'
    ]
    for track_id, item in sorted(track_counts.items(), key=lambda item: (-item[1]["count"], item[1]["title"])):
        track_buttons.append(
            f'<button type="button" data-track-filter="{esc(track_id)}">{esc(item["title"])} <b>{item["count"]}</b></button>'
        )
    scenario_buttons = [
        f'<button type="button" class="active" data-scenario-filter="all">全部 <b>{len(cards)}</b></button>'
    ]
    for scenario_id, item in sorted(scenario_counts.items(), key=lambda item: (-item[1]["count"], item[1]["title"])):
        scenario_buttons.append(
            f'<button type="button" data-scenario-filter="{esc(scenario_id)}">{esc(item["title"])} <b>{item["count"]}</b></button>'
        )
    compare_options = "".join(
        f'<label><input type="checkbox" value="{esc(card["id"])}" data-compare-check> <span>{esc(card["title"])}</span></label>'
        for card in cards
    )
    compare_data = [
        {
            "id": card["id"],
            "title": card["title"],
            "author": card["author"],
            "detailUrl": card["detail_url"],
            "fields": card["compare"],
        }
        for card in cards
    ]
    card_html = "".join(render_card(card) for card in cards)
    visual_html = render_visual_strip(visuals)
    collections_html = render_collections(collections)
    return f"""<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title)}</title>
  <style>
    :root {{
      --paper: #f1ebdd;
      --ink: #1f1d18;
      --muted: #776d5f;
      --line: #d6c8b1;
      --panel: #fffaf0;
      --teal: #0b6963;
      --blue: #315d82;
      --gold: #aa781d;
      --red: #9a4c39;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      background:
        radial-gradient(circle at 16% 8%, rgba(170,120,29,0.1), transparent 28%),
        linear-gradient(90deg, rgba(33,31,26,0.026) 1px, transparent 1px),
        linear-gradient(180deg, rgba(33,31,26,0.024) 1px, transparent 1px),
        var(--paper);
      background-size: auto, 36px 36px, 36px 36px, auto;
      color: var(--ink);
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.58;
    }}
    a {{ color: inherit; }}
    .portal-shell {{
      max-width: 1480px;
      margin: 0 auto;
      padding: clamp(18px, 3vw, 34px) clamp(18px, 4vw, 52px) 54px;
    }}
    header {{
      position: relative;
      overflow: hidden;
      min-height: clamp(540px, 66vh, 700px);
      padding: clamp(28px, 5vw, 68px);
      border: 1px solid rgba(214,200,177,0.72);
      border-radius: 8px;
      background: #1e1c18;
      box-shadow: 0 24px 52px rgba(60, 43, 24, 0.16);
    }}
    header::before {{
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, rgba(20,18,14,0.86) 0%, rgba(23,20,16,0.74) 40%, rgba(23,20,16,0.18) 68%, rgba(20,18,14,0.42) 100%),
        linear-gradient(180deg, rgba(17,15,12,0.16), rgba(17,15,12,0.72));
      z-index: 1;
      pointer-events: none;
    }}
    header::after {{
      content: "FROM RAILWAY HERITAGE TO AI CIVIC FUTURES";
      position: absolute;
      right: clamp(18px, 4vw, 48px);
      bottom: 20px;
      z-index: 3;
      color: rgba(255,250,240,0.56);
      font-size: 0.78rem;
      font-weight: 750;
      letter-spacing: 0;
    }}
    .hero-copy {{
      position: relative;
      z-index: 3;
      max-width: 720px;
      margin-top: clamp(10px, 4vh, 52px);
    }}
    .eyebrow {{
      color: #9ed6c8;
      font-size: 0.82rem;
      font-weight: 800;
      margin-bottom: 12px;
    }}
    h1 {{
      margin: 0;
      max-width: 720px;
      font-size: clamp(2.65rem, 5.1vw, 5.35rem);
      line-height: 0.96;
      letter-spacing: 0;
      color: #fff9eb;
      text-shadow: 0 10px 30px rgba(0,0,0,0.32);
    }}
    .intro {{
      max-width: 760px;
      margin: 24px 0 0;
      color: rgba(255,250,240,0.86);
      font-size: clamp(1.02rem, 1.5vw, 1.22rem);
    }}
    .heritage-note {{
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
      margin-top: 20px;
    }}
    .heritage-note span {{
      border: 1px solid rgba(168,121,36,0.42);
      border-radius: 999px;
      background: rgba(255,250,240,0.13);
      padding: 6px 11px;
      color: rgba(255,250,240,0.82);
      font-size: 0.86rem;
      font-weight: 700;
      backdrop-filter: blur(8px);
    }}
    .stats {{
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      max-width: 360px;
      margin-top: 28px;
    }}
    .stat {{
      border-left: 4px solid #7fc7bb;
      padding: 12px 14px;
      background: rgba(255,250,240,0.14);
      box-shadow: inset 0 0 0 1px rgba(255,250,240,0.2);
      color: #fff9eb;
      backdrop-filter: blur(8px);
    }}
    .stat strong {{
      display: block;
      font-size: 1.65rem;
      line-height: 1;
    }}
    .stat span {{
      color: rgba(255,250,240,0.72);
      font-size: 0.88rem;
    }}
    .visual-backdrop {{
      position: absolute;
      inset: 0;
      overflow: hidden;
      background:
        linear-gradient(90deg, rgba(31,29,24,0.04), rgba(31,29,24,0.08)),
        var(--archive-main, linear-gradient(135deg, #494237, #1f1d18));
      background-size: cover;
      background-position: center;
      filter: sepia(0.22) saturate(0.78) contrast(1.04);
    }}
    .visual-backdrop::before {{
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, rgba(31,29,24,0.36), rgba(31,29,24,0.08) 44%, rgba(31,29,24,0.18)),
        var(--modern-main, var(--archive-main));
      background-size: cover;
      background-position: center right;
      clip-path: polygon(58% 0, 100% 0, 100% 100%, 46% 100%);
      filter: saturate(1.08) contrast(1.02);
      opacity: 0.74;
    }}
    .visual-backdrop::after {{
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, rgba(241,235,221,0.035) 1px, transparent 1px),
        linear-gradient(180deg, rgba(241,235,221,0.03) 1px, transparent 1px),
        radial-gradient(circle at 78% 32%, rgba(255,250,240,0.14), transparent 28%),
        radial-gradient(circle at 22% 88%, rgba(170,120,29,0.16), transparent 30%);
      background-size: 42px 42px, 42px 42px, auto, auto;
      mix-blend-mode: screen;
      opacity: 0.42;
    }}
    .visual-fallback {{
      position: relative;
      min-height: 100%;
      background: linear-gradient(135deg, rgba(13,105,99,0.18), rgba(170,120,29,0.16));
    }}
    .visual-fallback span {{
      position: absolute;
      height: 7px;
      background: rgba(33,31,26,0.62);
      transform: rotate(-12deg);
    }}
    .visual-fallback span:nth-child(1) {{ left: 8%; right: 12%; top: 38%; }}
    .visual-fallback span:nth-child(2) {{ left: 12%; right: 8%; top: 48%; }}
    .visual-fallback span:nth-child(3) {{ left: 18%; right: 18%; top: 58%; background: rgba(13,105,99,0.74); }}
    .tag-strip {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      margin: 20px 0 18px;
    }}
    .tag-strip strong {{
      margin-right: 4px;
      color: #473d30;
      font-size: 0.92rem;
    }}
    .tag-cloud {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }}
    .tag-cloud span,
    .tag-row span,
    .track-row span,
    .scenario-row span {{
      border: 1px solid var(--line);
      border-radius: 999px;
      background: rgba(255,255,255,0.72);
      padding: 5px 10px;
      color: #34413d;
      font-size: 0.86rem;
    }}
    .track-filter {{
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
      margin: 0 0 22px;
    }}
    .scenario-filter {{
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
      margin: -12px 0 22px;
    }}
    .track-filter button {{
      appearance: none;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: #fffaf0;
      color: #34413d;
      cursor: pointer;
      padding: 8px 12px;
      font: inherit;
      font-size: 0.9rem;
      font-weight: 750;
    }}
    .track-filter button.active,
    .track-filter button:hover,
    .scenario-filter button.active,
    .scenario-filter button:hover {{
      border-color: rgba(13,105,99,0.54);
      background: #e9f4ef;
      color: var(--teal);
    }}
    .scenario-filter button {{
      appearance: none;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: #fffdf7;
      color: #34413d;
      cursor: pointer;
      padding: 8px 12px;
      font: inherit;
      font-size: 0.9rem;
      font-weight: 750;
    }}
    .track-filter b,
    .scenario-filter b {{
      color: var(--gold);
      margin-left: 4px;
    }}
    .compare-panel {{
      margin: 0 0 24px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: #fffaf0;
      box-shadow: 0 10px 24px rgba(60,43,24,0.07);
      overflow: hidden;
    }}
    .compare-head {{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      border-bottom: 1px solid var(--line);
      padding: 14px 16px;
      color: #3e3429;
    }}
    .compare-head strong {{
      color: var(--blue);
    }}
    .compare-head span {{
      color: var(--muted);
      font-size: 0.88rem;
      font-weight: 750;
    }}
    .compare-options {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 14px 16px;
    }}
    .compare-options label {{
      display: inline-flex;
      align-items: center;
      gap: 7px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: rgba(255,255,255,0.72);
      padding: 7px 11px;
      color: #34413d;
      font-size: 0.9rem;
      cursor: pointer;
    }}
    .compare-options input {{
      accent-color: var(--teal);
    }}
    .compare-output {{
      padding: 0 16px 16px;
      overflow-x: auto;
    }}
    .compare-empty {{
      color: var(--muted);
      font-size: 0.9rem;
      padding: 12px 0 0;
    }}
    .compare-table {{
      width: 100%;
      min-width: 760px;
      border-collapse: collapse;
      background: #fffdf7;
      font-size: 0.9rem;
    }}
    .compare-table th,
    .compare-table td {{
      border: 1px solid var(--line);
      vertical-align: top;
      padding: 10px 12px;
    }}
    .compare-table th {{
      width: 150px;
      color: #35433f;
      background: #f3ead8;
      text-align: left;
    }}
    .compare-table thead th {{
      background: #e9f4ef;
      color: #1c5b55;
      min-width: 220px;
    }}
    .compare-table a {{
      color: var(--teal);
      font-weight: 800;
      text-decoration: none;
    }}
    .tag-cloud b {{
      color: var(--teal);
      font-weight: 800;
    }}
    .collections {{
      margin: 0 0 24px;
    }}
    .section-head {{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 12px;
      color: #473d30;
    }}
    .section-head strong {{
      color: var(--blue);
      font-size: 1.02rem;
    }}
    .section-head span {{
      color: var(--muted);
      font-size: 0.9rem;
      font-weight: 700;
    }}
    .collection-grid {{
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }}
    .collection-card {{
      border: 1px solid var(--line);
      border-radius: 8px;
      background: #fffaf0;
      padding: 18px;
      box-shadow: 0 10px 24px rgba(60,43,24,0.07);
    }}
    .collection-badge {{
      display: inline-block;
      border-radius: 999px;
      background: #e9f4ef;
      color: var(--teal);
      padding: 5px 10px;
      font-size: 0.8rem;
      font-weight: 800;
      margin-bottom: 10px;
    }}
    .collection-card h2 {{
      margin: 0 0 8px;
      color: #263b38;
      font-size: clamp(1.2rem, 2vw, 1.55rem);
      line-height: 1.2;
    }}
    .collection-card p {{
      margin: 0;
      color: var(--muted);
      font-size: 0.94rem;
    }}
    .collection-reason {{
      margin-top: 10px !important;
      color: #4b453d !important;
    }}
    .collection-card ul {{
      display: grid;
      gap: 10px;
      list-style: none;
      padding: 0;
      margin: 14px 0 0;
    }}
    .collection-card li {{
      border-top: 1px solid rgba(214,200,177,0.7);
      padding-top: 10px;
    }}
    .collection-card li div {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      font-weight: 800;
    }}
    .collection-card li a {{
      color: var(--teal);
      text-decoration: none;
    }}
    .collection-card small {{
      color: var(--red);
      font-weight: 800;
    }}
    .collection-card em {{
      display: inline-block;
      margin: 6px 0;
      color: var(--gold);
      font-style: normal;
      font-size: 0.84rem;
      font-weight: 800;
    }}
    .portal-layout {{
      padding-top: 0;
    }}
    .card-grid {{
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 22px;
    }}
    .proposal-card {{
      display: grid;
      grid-template-rows: auto 1fr;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--panel);
      text-decoration: none;
      box-shadow: 0 10px 28px rgba(60,43,24,0.08);
      transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
    }}
    .proposal-card:hover {{
      transform: translateY(-2px);
      border-color: rgba(13,105,101,0.45);
      box-shadow: 0 16px 34px rgba(60,43,24,0.12);
    }}
    .cover-frame {{
      position: relative;
      display: block;
      text-decoration: none;
      background: #e7decb;
      border-bottom: 1px solid var(--line);
    }}
    .cover-frame img {{
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      filter: saturate(0.88) contrast(1.02);
    }}
    .status {{
      position: absolute;
      left: 14px;
      top: 14px;
      border-radius: 999px;
      background: var(--ink);
      color: #fff;
      padding: 5px 10px;
      font-size: 0.82rem;
      font-weight: 800;
    }}
    .card-body {{
      display: flex;
      flex-direction: column;
      min-height: 300px;
      padding: clamp(17px, 2.2vw, 24px);
    }}
    .card-meta {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      color: var(--muted);
      font-size: 0.84rem;
      margin-bottom: 12px;
    }}
    .card-meta span + span::before {{
      content: "/";
      margin-right: 8px;
      color: var(--line);
    }}
    .proposal-card h2 {{
      margin: 0;
      font-size: clamp(1.38rem, 2vw, 1.78rem);
      line-height: 1.18;
      letter-spacing: 0;
    }}
    .subtitle {{
      margin: 8px 0 10px;
      color: #263b38;
      font-weight: 750;
    }}
    .card-summary {{
      margin: 0;
      color: var(--muted);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }}
    .tag-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 14px;
    }}
    .track-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 14px;
    }}
    .scenario-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }}
    .track-row span {{
      border-color: rgba(13,105,99,0.34);
      background: #e9f4ef;
      color: #1c5b55;
      font-weight: 750;
    }}
    .scenario-row span {{
      border-color: rgba(49,93,130,0.28);
      background: #edf3f8;
      color: #2c516f;
      font-weight: 750;
    }}
    .spatial-panel {{
      margin-top: 14px;
      border: 1px solid rgba(49,93,130,0.22);
      border-radius: 8px;
      background: #f5f8f9;
      padding: 12px;
    }}
    .spatial-head {{
      display: flex;
      justify-content: space-between;
      gap: 12px;
      color: #33413d;
      font-size: 0.86rem;
      margin-bottom: 8px;
    }}
    .spatial-head strong {{
      color: var(--blue);
    }}
    .spatial-head span {{
      color: var(--muted);
      font-size: 0.78rem;
      font-weight: 800;
    }}
    .spatial-panel ol {{
      counter-reset: spatial;
      display: grid;
      gap: 8px;
      list-style: none;
      margin: 0;
      padding: 0;
    }}
    .spatial-panel li {{
      counter-increment: spatial;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 4px 8px;
      align-items: center;
      color: #33413d;
      font-size: 0.86rem;
    }}
    .spatial-panel li::before {{
      content: counter(spatial, decimal-leading-zero);
      grid-row: span 2;
      color: var(--blue);
      font-weight: 800;
    }}
    .spatial-panel span {{
      justify-self: start;
      border-radius: 999px;
      background: #e3edf3;
      color: #2c516f;
      padding: 2px 7px;
      font-size: 0.72rem;
      font-weight: 800;
    }}
    .spatial-panel strong {{
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }}
    .spatial-panel em {{
      grid-column: 2;
      color: var(--muted);
      font-style: normal;
      font-size: 0.8rem;
    }}
    .risk-panel {{
      margin-top: 14px;
      border: 1px solid rgba(154,76,57,0.22);
      border-radius: 8px;
      background: #fff7ef;
      padding: 12px;
    }}
    .risk-head {{
      display: flex;
      justify-content: space-between;
      gap: 12px;
      color: #5d3429;
      font-size: 0.86rem;
      margin-bottom: 9px;
    }}
    .risk-head strong {{
      color: var(--red);
    }}
    .risk-list {{
      display: grid;
      gap: 8px;
    }}
    .risk-item {{
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 8px;
      align-items: center;
      color: #44352d;
      font-size: 0.84rem;
    }}
    .risk-item em {{
      font-style: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }}
    .risk-item b {{
      color: var(--red);
      font-size: 0.8rem;
    }}
    .risk-item i {{
      grid-column: 1 / -1;
      display: block;
      height: 6px;
      border-radius: 999px;
      background:
        linear-gradient(90deg, rgba(154,76,57,0.76) calc(var(--risk-score) * 20%), rgba(214,200,177,0.58) 0);
    }}
    .highlights {{
      margin: 14px 0 0;
      padding-left: 1.1rem;
      color: #33413d;
      font-size: 0.94rem;
    }}
    .highlights li + li {{
      margin-top: 4px;
    }}
    footer {{
      margin-top: 44px;
      border-top: 1px solid var(--line);
      padding-top: 18px;
      color: var(--muted);
      font-size: 0.9rem;
    }}
    @media (max-width: 860px) {{
      header,
      .collection-grid,
      .card-grid {{
        grid-template-columns: 1fr;
      }}
      header {{
        min-height: auto;
      }}
      header::before {{
        background:
          linear-gradient(180deg, rgba(20,18,14,0.88), rgba(20,18,14,0.58) 55%, rgba(20,18,14,0.82));
      }}
    }}
  </style>
</head>
<body>
  <div class="portal-shell">
    <header>
      <div class="hero-copy">
        <div class="eyebrow">百年京张 AI 创新带 / Open Call</div>
        <h1>{esc(title)}</h1>
        <p class="intro">从中国人自建铁路的历史现场出发，面向 AI 时代重新想象海淀的公共空间、产业服务与城市治理。这里汇集人类团队与 AI agent 提交的开放方案，每张卡片进入一个可浏览的方案展示页。</p>
        <div class="heritage-note">
          <span>中国人自建铁路记忆</span>
          <span>京张铁路遗址公园</span>
          <span>AI 城市开放征集</span>
        </div>
        <div class="stats">
          <div class="stat"><strong>{len(cards)}</strong><span>方案</span></div>
          <div class="stat"><strong>{len(track_counts)}</strong><span>赛道</span></div>
        </div>
      </div>
      {visual_html}
    </header>
    <section class="tag-strip" aria-label="标签概览">
      <strong>标签</strong>
      <div class="tag-cloud">{tag_cloud}</div>
    </section>
    <section class="track-filter" aria-label="赛道筛选">
      {"".join(track_buttons)}
    </section>
    <section class="scenario-filter" aria-label="场景筛选">
      {"".join(scenario_buttons)}
    </section>
    {collections_html}
    <section class="compare-panel" aria-label="方案横向对比">
      <div class="compare-head">
        <strong>方案对比</strong>
        <span data-compare-count>0 / 4</span>
      </div>
      <div class="compare-options">{compare_options}</div>
      <div class="compare-output" data-compare-output>
        <div class="compare-empty">选择 2-4 个方案</div>
      </div>
    </section>
    <main class="portal-layout">
      <section class="card-grid" aria-label="方案卡片">
        {card_html}
      </section>
    </main>
    <footer>方案内容由投稿者提供，平台展示不代表官方审定结论；涉及空间、交通、建设和公共政策的建议均需后续复核。</footer>
  </div>
  <script>
    window.PROPOSALS = {json_for_script(compare_data)};
    (() => {{
      const buttons = Array.from(document.querySelectorAll("[data-track-filter]"));
      const scenarioButtons = Array.from(document.querySelectorAll("[data-scenario-filter]"));
      const cards = Array.from(document.querySelectorAll(".proposal-card"));
      const compareChecks = Array.from(document.querySelectorAll("[data-compare-check]"));
      const compareOutput = document.querySelector("[data-compare-output]");
      const compareCount = document.querySelector("[data-compare-count]");
      const fieldOrder = ["核心概念", "主题赛道", "概念空间", "公共空间策略", "产业生态/治理", "AI 场景", "落地路径", "风险与合规", "青年友好", "公众受益对象"];
      const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({{
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      }}[char]));
      const selectedProposals = () => compareChecks
        .filter((check) => check.checked)
        .map((check) => window.PROPOSALS.find((proposal) => proposal.id === check.value))
        .filter(Boolean);
      const renderCompare = () => {{
        const selected = selectedProposals();
        compareCount.textContent = `${{selected.length}} / 4`;
        compareChecks.forEach((check) => {{
          check.disabled = !check.checked && selected.length >= 4;
        }});
        if (selected.length < 2) {{
          compareOutput.innerHTML = '<div class="compare-empty">选择 2-4 个方案</div>';
          return;
        }}
        const header = selected.map((proposal) => (
          `<th><a href="${{escapeHtml(proposal.detailUrl)}}">${{escapeHtml(proposal.title)}}</a><br><small>@${{escapeHtml(proposal.author)}}</small></th>`
        )).join("");
        const rows = fieldOrder.map((field) => {{
          const cells = selected.map((proposal) => `<td>${{escapeHtml(proposal.fields[field] || "未提供")}}</td>`).join("");
          return `<tr><th>${{escapeHtml(field)}}</th>${{cells}}</tr>`;
        }}).join("");
        compareOutput.innerHTML = `<table class="compare-table"><thead><tr><th>维度</th>${{header}}</tr></thead><tbody>${{rows}}</tbody></table>`;
      }};
      compareChecks.forEach((check) => check.addEventListener("change", renderCompare));
      let activeTrack = "all";
      let activeScenario = "all";
      const applyFilters = () => {{
        cards.forEach((card) => {{
          const tracks = (card.getAttribute("data-tracks") || "").split(/\\s+/);
          const scenarios = (card.getAttribute("data-scenarios") || "").split(/\\s+/);
          const trackMatch = activeTrack === "all" || tracks.includes(activeTrack);
          const scenarioMatch = activeScenario === "all" || scenarios.includes(activeScenario);
          card.hidden = !(trackMatch && scenarioMatch);
        }});
      }};
      buttons.forEach((button) => {{
        button.addEventListener("click", () => {{
          activeTrack = button.getAttribute("data-track-filter") || "all";
          buttons.forEach((item) => item.classList.toggle("active", item === button));
          applyFilters();
        }});
      }});
      scenarioButtons.forEach((button) => {{
        button.addEventListener("click", () => {{
          activeScenario = button.getAttribute("data-scenario-filter") || "all";
          scenarioButtons.forEach((item) => item.classList.toggle("active", item === button));
          applyFilters();
        }});
      }});
      renderCompare();
    }})();
  </script>
</body>
</html>
"""


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--title", default="百年京张 AI 创新带方案 Portal")
    parser.add_argument("--visual-assets-dir", type=Path)
    parser.add_argument("--collections-dir", type=Path, default=Path("collections"))
    parser.add_argument("proposal_dirs", nargs="+", type=Path)
    args = parser.parse_args()

    output_parent = args.output.parent
    try:
        track_registry = load_track_registry(Path.cwd())
        scenario_registry = load_scenario_registry(Path.cwd())
        cards = [
            load_card(path, output_parent, track_registry, scenario_registry)
            for path in args.proposal_dirs
        ]
        collections = load_collections(args.collections_dir, cards)
        visuals = load_visual_assets(args.visual_assets_dir, output_parent)
        rendered = render_portal(cards, args.title, visuals, collections)
    except (OSError, json.JSONDecodeError, PortalError) as exc:
        parser.error(str(exc))

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
