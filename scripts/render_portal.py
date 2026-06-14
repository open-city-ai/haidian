#!/usr/bin/env python3
"""Render a static portal page from proposal exhibit cards."""

from __future__ import annotations

import argparse
import html
import json
import os
from pathlib import Path, PurePosixPath
from typing import Any

from render_exhibit import safe_asset_path
from validate_submission import parse_front_matter


class PortalError(ValueError):
    """Raised when portal input cannot be rendered safely."""


def text(value: Any, default: str = "") -> str:
    if value is None:
        return default
    return str(value)


def esc(value: Any) -> str:
    return html.escape(text(value), quote=True)


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


def load_card(proposal_dir: Path, output_parent: Path) -> dict[str, Any]:
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

    return {
        "title": text(card.get("title"), metadata.get("title", proposal_dir.name)),
        "subtitle": text(card.get("subtitle"), metadata.get("summary", "")),
        "summary": text(card.get("summary"), metadata.get("summary", "")),
        "cover": relative_url(output_parent, cover_path),
        "tags": [text(item) for item in tags if text(item).strip()][:8],
        "highlights": [text(item) for item in highlights if text(item).strip()][:4],
        "status": status,
        "author": metadata.get("author_github", proposal_dir.parent.name),
        "language": metadata.get("language", "zh"),
        "license": metadata.get("license", "CC-BY-4.0"),
        "detail_url": relative_url(output_parent, proposal_dir / detail),
        "proposal_url": relative_url(output_parent, proposal_dir / proposal),
    }


def status_label(status: str) -> str:
    return {
        "draft": "草稿",
        "submitted": "已提交",
        "under-review": "复核中",
        "featured": "精选",
    }.get(status, status)


def render_card(card: dict[str, Any]) -> str:
    tags = "".join(f"<span>{esc(tag)}</span>" for tag in card["tags"])
    highlights = "".join(f"<li>{esc(item)}</li>" for item in card["highlights"])
    return f"""
      <a class="proposal-card" href="{esc(card['detail_url'])}" aria-label="查看 {esc(card['title'])}">
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


def render_portal(cards: list[dict[str, Any]], title: str, visuals: dict[str, list[str]] | None = None) -> str:
    visuals = visuals or {"archive": [], "modern": []}
    tag_counts: dict[str, int] = {}
    for card in cards:
        for tag in card["tags"]:
            tag_counts[tag] = tag_counts.get(tag, 0) + 1
    top_tags = sorted(tag_counts.items(), key=lambda item: (-item[1], item[0]))[:10]
    tag_cloud = "".join(f"<span>{esc(tag)} <b>{count}</b></span>" for tag, count in top_tags)
    card_html = "".join(render_card(card) for card in cards)
    visual_html = render_visual_strip(visuals)
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
    .tag-row span {{
      border: 1px solid var(--line);
      border-radius: 999px;
      background: rgba(255,255,255,0.72);
      padding: 5px 10px;
      color: #34413d;
      font-size: 0.86rem;
    }}
    .tag-cloud b {{
      color: var(--teal);
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
          <div class="stat"><strong>{len(tag_counts)}</strong><span>标签</span></div>
        </div>
      </div>
      {visual_html}
    </header>
    <section class="tag-strip" aria-label="标签概览">
      <strong>标签</strong>
      <div class="tag-cloud">{tag_cloud}</div>
    </section>
    <main class="portal-layout">
      <section class="card-grid" aria-label="方案卡片">
        {card_html}
      </section>
    </main>
    <footer>方案内容由投稿者提供，平台展示不代表官方审定结论；涉及空间、交通、建设和公共政策的建议均需后续复核。</footer>
  </div>
</body>
</html>
"""


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--title", default="百年京张 AI 创新带方案 Portal")
    parser.add_argument("--visual-assets-dir", type=Path)
    parser.add_argument("proposal_dirs", nargs="+", type=Path)
    args = parser.parse_args()

    output_parent = args.output.parent
    try:
        cards = [load_card(path, output_parent) for path in args.proposal_dirs]
        visuals = load_visual_assets(args.visual_assets_dir, output_parent)
        rendered = render_portal(cards, args.title, visuals)
    except (OSError, json.JSONDecodeError, PortalError) as exc:
        parser.error(str(exc))

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
