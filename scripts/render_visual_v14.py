#!/usr/bin/env python3
"""v1.4 visual upgrade: render offline visual/index.html with embedded GeoJSON-driven SVG maps.

Reads geometry/*.geojson (v1.4 output) and metrics.json, simplifies coordinates,
projects to screen space, and injects into a static HTML template. The page stays
fully offline: no remote resources, no external scripts, all data embedded.
"""
from __future__ import annotations

import json
import math
from pathlib import Path
from typing import Any

from shapely.geometry import shape
from shapely.ops import transform

REPO = Path(__file__).resolve().parents[1]
PKG = REPO / "submissions/zenzenzense520-bit/jingzhang-ai-pulse"
GEO = PKG / "geometry"
TPL = REPO / "scripts/templates/visual_index_template.html"
OUT = PKG / "visual/index.html"

SIMPLIFY_TOL = 0.00004  # ~4 m in lon/lat; enough for screen rendering

CORE_INFO = {
    "zhongzhiyuan_ai_acceleration_area": {
        "name": "众智园",
        "sub": "AI 自主创新加速区",
        "role": "硬测试场",
        "anchor": "模型评测、端侧算力验证、标准工作坊与治理推演",
        "structure": "一廊两带一谷",
        "scenarios": "SC-02 / SC-06 / SC-11 / SC-12",
        "phase": "一期 2026–2028",
        "color": "#2b7fff",
    },
    "beijing_ai_origin_community": {
        "name": "AI 原点社区",
        "sub": "北京 AI 原点社区",
        "role": "转化通道",
        "anchor": "高校师生与开源开发者的日常转化通道，不做总部门户",
        "structure": "街区缝合、发布轴带、社区服务环",
        "scenarios": "SC-01 / SC-04 / SC-07 / SC-09",
        "phase": "二期 2028–2030",
        "color": "#e8833a",
    },
    "dazhongsi_ai_industry_cluster": {
        "name": "大钟寺",
        "sub": "AI 产业聚集区",
        "role": "流通门户",
        "anchor": "要素流通与品牌展示，不做研发测试",
        "structure": "站城一体、四象限连通、文化商业复合",
        "scenarios": "SC-05 / SC-08 / SC-10",
        "phase": "一期 2026–2028",
        "color": "#7a5af8",
    },
}

PHASES = [
    {"key": "phase_1", "label": "一期", "time": "2026–2028", "title": "双门户试点",
     "scope": "众智园 + 大钟寺站城门户", "color": "#ef4444",
     "projects": "众智园全栈测试与治理客厅、大钟寺站城一体化公共界面、安全治理沙盒试点",
     "trigger": "重点区控规条件初步明确、轨道站点改造方案进入深化"},
    {"key": "phase_2", "label": "二期", "time": "2028–2030", "title": "转化轴成型",
     "scope": "原点社区 + 中关村服务翼慢行网", "color": "#f59e0b",
     "projects": "原点社区成果转化街、服务翼慢行轴、京张绿廊中段缝合",
     "trigger": "一期运营数据验证、慢行断点交通评估完成"},
    {"key": "phase_3", "label": "三期", "time": "2030+", "title": "全域织补开放",
     "scope": "小月河场景翼 + 全域 AI 场景节点", "color": "#22c55e",
     "projects": "小月河场景赋能翼、全域端侧算力节点、全球 AI 活动周路线",
     "trigger": "场景开放机制建立、两翼微循环基本贯通"},
]


def load_geo(name: str) -> list[dict[str, Any]]:
    return json.loads((GEO / f"{name}.geojson").read_text(encoding="utf-8"))["features"]


def load_metrics() -> dict[str, Any]:
    data = json.loads((PKG / "metrics.json").read_text(encoding="utf-8"))
    out: dict[str, Any] = {}
    for key, entry in data["metrics"].items():
        out[key] = entry.get("value")
    return out


def project_xy(lon: float, lat: float, ref: tuple[float, float], scale: float) -> tuple[float, float]:
    lon0, lat0 = ref
    x = (lon - lon0) * scale * math.cos(math.radians(lat0))
    y = (lat0 - lat) * scale
    return round(x, 2), round(y, 2)


def simplify_coords(coords: list[list[float]]) -> str:
    return " ".join(f"{x},{y}" for x, y in coords)


def geom_path(geom: Any, ref: tuple[float, float], scale: float) -> str:
    parts: list[str] = []
    g = transform(lambda lon, lat: project_xy(lon, lat, ref, scale), geom)
    geoms = g.geoms if g.geom_type == "MultiPolygon" else [g]
    for p in geoms:
        parts.append(f"M {simplify_coords(list(p.exterior.coords))} Z")
    return " ".join(parts)


def lines_path(geom: Any, ref: tuple[float, float], scale: float) -> str:
    parts: list[str] = []
    g = transform(lambda lon, lat: project_xy(lon, lat, ref, scale), geom)
    geoms = g.geoms if g.geom_type == "MultiLineString" else [g]
    for line in geoms:
        parts.append(f"M {simplify_coords(list(line.coords))}")
    return " ".join(parts)


def simplify(geom: Any) -> Any:
    if geom.geom_type in {"Polygon", "MultiPolygon"}:
        return geom.simplify(SIMPLIFY_TOL, preserve_topology=True)
    return geom


def render_core_map(area_id: str, key_feats: list[dict[str, Any]]) -> str:
    info = CORE_INFO[area_id]
    key_feat = next(f for f in key_feats if f["properties"]["area_id"] == area_id)
    core = shape(key_feat["geometry"])
    minx, miny, maxx, maxy = core.bounds
    pad = 0.0012
    lon0 = (minx + maxx) / 2
    lat0 = (miny + maxy) / 2
    w_lon = maxx - minx + 2 * pad
    h_lat = maxy - miny + 2 * pad
    view_w, view_h = 620, 430
    scale = min(view_w / (w_lon * math.cos(math.radians(lat0))), view_h / h_lat) * 0.94
    ref = (lon0, lat0)
    paths: list[str] = []
    # roads first
    for f in load_geo("roads"):
        d = lines_path(simplify(shape(f["geometry"])), ref, scale)
        if d:
            paths.append(f'<path d="{d}" fill="none" stroke="#94a3b8" stroke-width="2.5" opacity="0.75"/>')
    for f in load_geo("green_space"):
        paths.append(f'<path d="{geom_path(simplify(shape(f["geometry"])), ref, scale)}" fill="#86efac" stroke="#4ade80" stroke-width="1" opacity="0.85"/>')
    for f in load_geo("public_space"):
        paths.append(f'<path d="{geom_path(simplify(shape(f["geometry"])), ref, scale)}" fill="#fde68a" stroke="#f59e0b" stroke-width="1" opacity="0.85"/>')
    for f in load_geo("buildings"):
        paths.append(f'<path d="{geom_path(simplify(shape(f["geometry"])), ref, scale)}" fill="#cbd5e1" stroke="#64748b" stroke-width="1"/>')
    paths.append(
        f'<path d="{geom_path(core, ref, scale)}" fill="{info["color"]}" fill-opacity="0.14" '
        f'stroke="{info["color"]}" stroke-width="4"/>'
    )
    cx, cy = project_xy(core.centroid.x, core.centroid.y, ref, scale)
    cx += 140
    cy -= 60
    paths.append(
        f'<g font-family="Microsoft YaHei, sans-serif">'
        f'<text x="{cx}" y="{cy}" font-size="26" font-weight="700" fill="{info["color"]}">{info["name"]} · {info["role"]}</text>'
        f'<text x="{cx}" y="{cy + 34}" font-size="17" fill="#334155">{info["structure"]}</text>'
        f'<text x="{cx}" y="{cy + 60}" font-size="15" fill="#64748b">锚点：{info["anchor"]}</text>'
        f'</g>'
    )
    return (
        f'<svg viewBox="0 0 {view_w} {view_h}" role="img" aria-label="{info["name"]}差异化定位图" '
        f'style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d6dce4;border-radius:10px">'
        f'{"".join(paths)}</svg>'
    )


def render_overview_svg() -> str:
    site = shape(load_geo("site_boundary")[0]["geometry"])
    minx, miny, maxx, maxy = site.bounds
    lon0 = (minx + maxx) / 2
    lat0 = (miny + maxy) / 2
    view_w = 520
    k = view_w / ((maxx - minx) * math.cos(math.radians(lat0)))
    view_h = (maxy - miny) * k * 1.02
    ref = (lon0, lat0)
    paths: list[str] = []
    for f in load_geo("roads"):
        d = lines_path(simplify(shape(f["geometry"])), ref, k)
        if d:
            paths.append(f'<path d="{d}" fill="none" stroke="#0f766e" stroke-width="2" opacity="0.7"/>')
    for f in load_geo("green_space"):
        paths.append(f'<path d="{geom_path(simplify(shape(f["geometry"])), ref, k)}" fill="#86efac" stroke="#4ade80" stroke-width="0.8" opacity="0.8"/>')
    for f in load_geo("public_space"):
        paths.append(f'<path d="{geom_path(simplify(shape(f["geometry"])), ref, k)}" fill="#fde68a" stroke="#eab308" stroke-width="0.8" opacity="0.8"/>')
    for f in load_geo("buildings"):
        paths.append(f'<path d="{geom_path(simplify(shape(f["geometry"])), ref, k)}" fill="#cbd5e1" stroke="#64748b" stroke-width="0.8"/>')
    key_colors = {"zhongzhiyuan_ai_acceleration_area": "#2b7fff",
                  "beijing_ai_origin_community": "#e8833a",
                  "dazhongsi_ai_industry_cluster": "#7a5af8"}
    for f in load_geo("key_areas"):
        color = key_colors.get(f["properties"]["area_id"], "#94a3b8")
        paths.append(f'<path d="{geom_path(shape(f["geometry"]), ref, k)}" fill="{color}" fill-opacity="0.10" stroke="{color}" stroke-width="3"/>')
    phase_colors = {"phase_1": "#ef4444", "phase_2": "#f59e0b", "phase_3": "#22c55e"}
    for f in load_geo("phasing"):
        color = phase_colors[f["properties"]["phase"]]
        paths.append(f'<path d="{geom_path(shape(f["geometry"]), ref, k)}" fill="none" stroke="{color}" stroke-width="1.6" stroke-dasharray="6 5"/>')
    paths.append(
        f'<path d="{geom_path(site, ref, k)}" fill="none" stroke="#475569" stroke-width="2.5" stroke-dasharray="8 6"/>'
    )
    return (
        f'<svg viewBox="0 0 {view_w:.0f} {view_h:.0f}" role="img" aria-label="京张智脉空间结构总览（真实几何）" '
        f'style="display:block;margin:0 auto;background:#fbfcfe;border:1px solid #d6dce4;border-radius:10px;max-height:680px">'
        f'{"".join(paths)}</svg>'
    )


def render_core_cards() -> str:
    key_feats = load_geo("key_areas")
    cards = []
    for area_id, info in CORE_INFO.items():
        svg = render_core_map(area_id, key_feats)
        cards.append(
            f'<div class="core-card" style="border-top:5px solid {info["color"]}">'
            f'<div class="core-head"><span class="core-name">{info["name"]}</span>'
            f'<span class="core-role" style="background:{info["color"]};color:#fff">{info["role"]}</span></div>'
            f'<p class="core-sub">{info["sub"]}</p>'
            f'{svg}'
            f'<ul class="core-list">'
            f'<li><strong>唯一锚点</strong>：{info["anchor"]}</li>'
            f'<li><strong>空间结构</strong>：{info["structure"]}</li>'
            f'<li><strong>主导场景卡</strong>：{info["scenarios"]}</li>'
            f'<li><strong>主导分期</strong>：{info["phase"]}</li>'
            f'</ul></div>'
        )
    return "".join(cards)


def render_timeline(metrics: dict[str, Any]) -> str:
    total = float(metrics["site_area_sqm"])
    bars = []
    for i, ph in enumerate(PHASES):
        area = float(metrics[f"{ph['key']}_area_sqm"])
        pct = area / total * 100
        bars.append(
            f'<div class="phase-row">'
            f'<div class="phase-meta"><span class="phase-badge" style="background:{ph["color"]}">{ph["label"]}</span>'
            f'<span class="phase-time">{ph["time"]}</span></div>'
            f'<div class="phase-bar-wrap"><div class="phase-bar" style="width:{pct:.1f}%;background:{ph["color"]}"></div>'
            f'<span class="phase-pct">{pct:.1f}% · {area:,.0f} m²</span></div>'
            f'<div class="phase-body"><strong>{ph["title"]}</strong>：{ph["scope"]}<br>'
            f'核心项目：{ph["projects"]}<br><span class="muted">触发条件：{ph["trigger"]}</span></div>'
            f'</div>'
        )
    return "".join(bars)


def inject(metrics: dict[str, Any]) -> str:
    template = TPL.read_text(encoding="utf-8")
    fmt = lambda v: f"{v:,.0f}"
    repl = {
        "{{SVG_OVERVIEW}}": render_overview_svg(),
        "{{CORE_CARDS}}": render_core_cards(),
        "{{TIMELINE}}": render_timeline(metrics),
        "{{M_SITE_AREA}}": fmt(metrics["site_area_sqm"]),
        "{{M_SITE_AREA_RAW}}": repr(float(metrics["site_area_sqm"])),
        "{{M_KEY_AREA}}": fmt(metrics["key_area_total_sqm"]),
        "{{M_GREEN_RATIO}}": f"{metrics['green_ratio']*100:.1f}%",
        "{{M_GREEN_RATIO_RAW}}": repr(float(metrics["green_ratio"])),
        "{{M_PUBLIC_RATIO}}": f"{metrics['public_space_ratio']*100:.1f}%",
        "{{M_PUBLIC_RATIO_RAW}}": repr(float(metrics["public_space_ratio"])),
        "{{M_DENSITY}}": f"{metrics['building_density']*100:.1f}%",
        "{{M_GREEN_AREA}}": fmt(metrics["green_space_area_sqm"]),
        "{{M_PUBLIC_AREA}}": fmt(metrics["public_space_area_sqm"]),
        "{{M_BUILDING_AREA}}": fmt(metrics["building_footprint_area_sqm"]),
        "{{M_ROAD}}": fmt(metrics["road_length_m"]),
        "{{M_GREENWAY}}": fmt(metrics["greenway_length_m"]),
        "{{M_P1}}": fmt(metrics["phase_1_area_sqm"]),
        "{{M_P2}}": fmt(metrics["phase_2_area_sqm"]),
        "{{M_P3}}": fmt(metrics["phase_3_area_sqm"]),
        "{{M_PHASE_TOTAL}}": fmt(metrics["phasing_total_sqm"]),
        "{{M_BUILDING_COUNT}}": str(metrics["building_count"]),
        "{{M_ROAD_COUNT}}": str(metrics["road_count"]),
    }
    for key, value in repl.items():
        template = template.replace(key, value)
    return template


def main() -> None:
    metrics = load_metrics()
    metrics["building_count"] = len(load_geo("buildings"))
    metrics["road_count"] = len(load_geo("roads"))
    html = inject(metrics)
    OUT.write_text(html, encoding="utf-8")
    print(f"written {OUT} ({len(html):,} chars)")


if __name__ == "__main__":
    main()
