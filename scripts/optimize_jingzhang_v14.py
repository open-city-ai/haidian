#!/usr/bin/env python3
"""v1.4 optimization: fix phasing containment, enrich key-area roles, recalc metrics, regen figures.

Fixes the v1.2 defect where phase polygons overflowed the site boundary
(phasing total exceeded site area by ~488k sqm) and adds design-role
properties to key_areas so the narrative -> layer evidence chain closes.
"""
from __future__ import annotations

import hashlib
import json
import math
from pathlib import Path
from typing import Any

from pyproj import Transformer
from shapely.geometry import MultiPolygon, Polygon, mapping, shape
from shapely.ops import transform, unary_union

REPO = Path(__file__).resolve().parents[1]
PKG = REPO / "submissions/zenzenzense520-bit/jingzhang-ai-pulse"
GEO = PKG / "geometry"
FIG = PKG / "assets/figures"
TRANS = Transformer.from_crs("EPSG:4326", "EPSG:4548", always_xy=True)

CORE_ROLES = {
    "zhongzhiyuan_ai_acceleration_area": {
        "differentiation_role": "硬测试场：全栈测试验证 + 安全治理沙盒",
        "unique_anchor": "模型评测、端侧算力验证、标准工作坊与城市智能体治理推演",
        "spatial_structure": "一廊两带一谷",
        "scenario_ids": ["SC-02", "SC-06", "SC-11", "SC-12"],
        "lead_phase": "phase_1",
    },
    "beijing_ai_origin_community": {
        "differentiation_role": "转化通道：成果转化街 + 发布轴 + 近校慢网",
        "unique_anchor": "高校师生与开源开发者的日常转化通道，不做总部门户",
        "spatial_structure": "街区缝合、发布轴带、社区服务环",
        "scenario_ids": ["SC-01", "SC-04", "SC-07", "SC-09"],
        "lead_phase": "phase_2",
    },
    "dazhongsi_ai_industry_cluster": {
        "differentiation_role": "流通门户：站城一体 + 四象限慢行 + 产业门户",
        "unique_anchor": "要素流通与品牌展示，不做研发测试",
        "spatial_structure": "站城一体、四象限连通、文化商业复合",
        "scenario_ids": ["SC-05", "SC-08", "SC-10"],
        "lead_phase": "phase_1",
    },
}


def load_geo(name: str) -> dict[str, Any]:
    return json.loads((GEO / name).read_text(encoding="utf-8"))


def save_geo(name: str, data: dict[str, Any]) -> None:
    (GEO / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def area_sqm(geom: Any) -> float:
    return float(transform(TRANS.transform, geom).area)


def line_len_m(geom: Any) -> float:
    return float(transform(TRANS.transform, geom).length)


def box_poly(minx: float, miny: float, maxx: float, maxy: float) -> Polygon:
    return Polygon([(minx, miny), (maxx, miny), (maxx, maxy), (minx, maxy), (minx, miny)])


def enrich_key_areas() -> None:
    """Attach design-role props (concept layer) to the three key areas."""
    data = load_geo("key_areas.geojson")
    for f in data["features"]:
        area_id = f["properties"].get("area_id")
        role = CORE_ROLES.get(area_id)
        if not role:
            continue
        f["properties"]["design_role"] = {
            "differentiation_role": role["differentiation_role"],
            "unique_anchor": role["unique_anchor"],
            "spatial_structure": role["spatial_structure"],
            "scenario_ids": role["scenario_ids"],
            "lead_phase": role["lead_phase"],
            "evidence_note": "设计角色为概念建议，与 proposal.md 三核差异化叙事一一对应",
        }
    save_geo("key_areas.geojson", data)


def rebuild_phasing(site: Polygon) -> list[dict[str, Any]]:
    """Rebuild phasing so every phase is clipped to the site and phases tile it exactly."""
    p1a = box_poly(116.343, 40.0075, 116.354, 40.026)
    p1b = box_poly(116.346, 39.944, 116.354, 39.9485)
    p2a = box_poly(116.342, 39.9835, 116.353, 39.9935)
    p2b = box_poly(116.3512, 39.952, 116.3545, 40.018)

    phase1 = unary_union([p1a, p1b]).intersection(site)
    phase2 = unary_union([p2a, p2b]).difference(phase1).intersection(site)
    phase3 = site.difference(unary_union([phase1, phase2]))
    if phase3.is_empty:
        phase3 = site.difference(phase1).difference(phase2)

    def to_feature(fid: str, phase_id: str, name_zh: str, geom: Any) -> dict[str, Any]:
        return {
            "type": "Feature",
            "id": fid,
            "properties": {
                "id": fid,
                "layer": "PHASE",
                "phase": phase_id,
                "name_zh": name_zh,
                "source_type": "agent_generated_design",
                "confidence": "medium",
                "geometry_role": "design_proposal",
                "containment": "clipped_to_site_boundary",
                "area_sqm_declared": round(area_sqm(geom), 3),
            },
            "geometry": mapping(geom),
        }

    return [
        to_feature("PHASE-001", "phase_1", "近期2026-2028：众智园+大钟寺站城门户", phase1),
        to_feature("PHASE-002", "phase_2", "中期2028-2030：原点社区+中关村服务翼慢行网", phase2),
        to_feature("PHASE-003", "phase_3", "远期2030+：小月河场景翼+全域节点织补", phase3),
    ]


def update_geometry() -> dict[str, float]:
    site = shape(load_geo("site_boundary.geojson")["features"][0]["geometry"])
    enrich_key_areas()
    phases = rebuild_phasing(site)
    save_geo("phasing.geojson", {"type": "FeatureCollection", "name": "phasing", "features": phases})

    buildings = load_geo("buildings.geojson")["features"]
    greens = load_geo("green_space.geojson")["features"]
    publics = load_geo("public_space.geojson")["features"]
    roads = load_geo("roads.geojson")["features"]
    b_area = sum(area_sqm(shape(f["geometry"])) for f in buildings)
    g_area = sum(area_sqm(shape(f["geometry"])) for f in greens)
    p_area = sum(area_sqm(shape(f["geometry"])) for f in publics)
    s_area = area_sqm(site)
    road_len = greenway_len = 0.0
    for f in roads:
        g = shape(f["geometry"])
        road_len += line_len_m(g)
        if f["properties"].get("road_class") in {"greenway", "cycleway", "pedestrian"}:
            greenway_len += line_len_m(g)
    p1 = sum(area_sqm(shape(f["geometry"])) for f in phases if f["properties"]["phase"] == "phase_1")
    p2 = sum(area_sqm(shape(f["geometry"])) for f in phases if f["properties"]["phase"] == "phase_2")
    p3 = sum(area_sqm(shape(f["geometry"])) for f in phases if f["properties"]["phase"] == "phase_3")
    return {
        "site_area_sqm": round(s_area, 3),
        "building_footprint_area_sqm": round(b_area, 3),
        "green_space_area_sqm": round(g_area, 3),
        "public_space_area_sqm": round(p_area, 3),
        "green_ratio": round(g_area / s_area, 6),
        "public_space_ratio": round(p_area / s_area, 6),
        "building_density": round(b_area / s_area, 6),
        "road_length_m": round(road_len, 1),
        "greenway_length_m": round(greenway_len, 1),
        "phase_1_area_sqm": round(p1, 3),
        "phase_2_area_sqm": round(p2, 3),
        "phase_3_area_sqm": round(p3, 3),
        "phasing_total_sqm": round(p1 + p2 + p3, 3),
        "building_count": len(buildings),
        "road_count": len(roads),
        "green_count": len(greens),
        "public_count": len(publics),
    }


def update_metrics(values: dict[str, float]) -> None:
    path = PKG / "metrics.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    m = data["metrics"]
    mapping = {
        "site_area_sqm": ("sqm", "polygon_area(submitted_site_boundary)"),
        "building_footprint_area_sqm": ("sqm", "sum(polygon_area(building_footprints))"),
        "green_space_area_sqm": ("sqm", "sum(polygon_area(green_space))"),
        "public_space_area_sqm": ("sqm", "sum(polygon_area(public_space))"),
        "green_ratio": ("ratio", "green_space_area_sqm / site_area_sqm"),
        "public_space_ratio": ("ratio", "public_space_area_sqm / site_area_sqm"),
        "building_density": ("ratio", "building_footprint_area_sqm / site_area_sqm"),
        "road_length_m": ("m", "sum(line_length(roads))"),
        "greenway_length_m": ("m", "sum(line_length(greenway/cycleway/pedestrian roads))"),
    }
    for key, (unit, formula) in mapping.items():
        if key in m and key in values:
            m[key]["value"] = values[key]
            m[key]["unit"] = unit
            m[key]["formula"] = formula
    for phase_key in ("phase_1_area_sqm", "phase_2_area_sqm", "phase_3_area_sqm"):
        entry = m.get(phase_key)
        if not entry:
            continue
        entry["value"] = values[phase_key]
        entry["assumptions"] = [
            "Phasing polygons are conceptual design proposals clipped to the provisional site boundary; "
            "sum of phases equals site_area_sqm.",
        ]
    if "phasing_total_sqm" not in m:
        m["phasing_total_sqm"] = {
            "status": "known",
            "value": values["phasing_total_sqm"],
            "unit": "sqm",
            "source_files": ["geometry/phasing.geojson"],
            "formula": "sum(polygon_area(phase_1..3))",
            "confidence": "medium",
            "assumptions": ["Phases tile the provisional site exactly."],
        }
    else:
        m["phasing_total_sqm"]["value"] = values["phasing_total_sqm"]
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def render_figures(values: dict[str, float]) -> None:
    import matplotlib.pyplot as plt
    from matplotlib.collections import LineCollection, PatchCollection
    from matplotlib.patches import Polygon as MplPoly

    plt.rcParams["font.sans-serif"] = ["Microsoft YaHei", "SimHei", "Arial Unicode MS", "DejaVu Sans"]
    plt.rcParams["axes.unicode_minus"] = False
    FIG.mkdir(parents=True, exist_ok=True)

    def load_layer(name: str):
        polys, cols, ids = [], [], []
        for f in load_geo(name)["features"]:
            g = shape(f["geometry"])
            parts = g.geoms if g.geom_type == "MultiPolygon" else [g]
            for p in parts:
                polys.append(MplPoly(list(p.exterior.coords), closed=True))
                cols.append(None)
                ids.append(f.get("id"))
        return polys, cols, ids

    def draw_base(ax, title: str, layers: list[tuple[str, str]], lines: list[tuple[str, str]] | None = None, legend: list[tuple[str, str]] | None = None):
        ax.set_title(title, fontsize=14, pad=10)
        site = shape(load_geo("site_boundary.geojson")["features"][0]["geometry"])
        ax.add_patch(MplPoly(list(site.exterior.coords), closed=True, fill=False, edgecolor="#94a3b8", linewidth=1.2, linestyle="--"))
        for fname, color in layers:
            polys, cols, _ = load_layer(fname)
            if polys:
                ax.add_collection(PatchCollection(polys, facecolor=color, edgecolor="#334155", linewidth=0.4, alpha=0.55))
        if lines:
            for fname, color in lines:
                segs = []
                for f in load_geo(fname)["features"]:
                    g = shape(f["geometry"])
                    if g.geom_type == "LineString":
                        segs.append(list(g.coords))
                    elif g.geom_type == "MultiLineString":
                        segs.extend(list(l.coords) for l in g.geoms)
                if segs:
                    ax.add_collection(LineCollection(segs, colors=color, linewidths=1.8, alpha=0.9))
        ax.set_aspect("equal")
        ax.axis("off")
        ax.text(0.01, 0.01, "provisional boundary · concept design · v1.4", transform=ax.transAxes, fontsize=8, color="#64748b")
        if legend:
            from matplotlib.patches import Patch
            handles = [Patch(facecolor=c, edgecolor="#334155", linewidth=0.4, label=lbl) for lbl, c in legend]
            ax.legend(handles=handles, loc="lower right", fontsize=9, framealpha=0.9)

    # 1) site overview
    fig, ax = plt.subplots(figsize=(12, 8), dpi=150)
    draw_base(
        ax, "京张智脉总览：一脉串联三核、两翼协同（v1.4）",
        [("green_space.geojson", "#86efac"), ("public_space.geojson", "#fde68a"),
         ("buildings.geojson", "#cbd5e1"), ("key_areas.geojson", "#c4b5fd")],
        [("roads.geojson", "#0f766e")],
        legend=[("绿地", "#86efac"), ("公共空间", "#fde68a"), ("建筑", "#cbd5e1"), ("三核", "#c4b5fd"), ("道路", "#0f766e")],
    )
    fig.savefig(FIG / "site-overview.png", bbox_inches="tight", facecolor="#f8fafc")
    plt.close(fig)

    # 2) land use + phasing
    fig, ax = plt.subplots(figsize=(12, 8), dpi=150)
    draw_base(
        ax, "用地结构与三期实施（phasing 已裁剪至提交边界，三期总和=边界面积）",
        [("land_use.geojson", "#93c5fd")], [],
    )
    phase_colors = {"phase_1": "#ef4444", "phase_2": "#f59e0b", "phase_3": "#22c55e"}
    for f in load_geo("phasing.geojson")["features"]:
        g = shape(f["geometry"])
        parts = g.geoms if g.geom_type == "MultiPolygon" else [g]
        for p in parts:
            ax.add_patch(MplPoly(list(p.exterior.coords), closed=True, fill=False,
                                 edgecolor=phase_colors[f["properties"]["phase"]], linewidth=1.6))
    from matplotlib.patches import Patch
    ax.legend(handles=[Patch(facecolor="none", edgecolor=c, label=lbl) for lbl, c in
                       [("一期 众智园+大钟寺门户", "#ef4444"), ("二期 原点社区+服务翼", "#f59e0b"), ("三期 小月河+全域织补", "#22c55e")]],
              loc="lower right", fontsize=9, framealpha=0.9)
    fig.savefig(FIG / "land-use-structure.png", bbox_inches="tight", facecolor="#f8fafc")
    plt.close(fig)

    # 3) three-core differentiation
    core_colors = {"zhongzhiyuan_ai_acceleration_area": "#2b7fff",
                   "beijing_ai_origin_community": "#e8833a",
                   "dazhongsi_ai_industry_cluster": "#7a5af8"}
    fig, ax = plt.subplots(figsize=(12, 8), dpi=150)
    draw_base(ax, "三核差异化定位：硬测试场 · 转化通道 · 流通门户（v1.4）",
              [("buildings.geojson", "#e2e8f0"), ("public_space.geojson", "#fef3c7")],
              [("roads.geojson", "#94a3b8")])
    roles = {
        "zhongzhiyuan_ai_acceleration_area": ("众智园\n硬测试场", "#2b7fff", (0.30, 0.78)),
        "beijing_ai_origin_community": ("原点社区\n转化通道", "#e8833a", (0.62, 0.50)),
        "dazhongsi_ai_industry_cluster": ("大钟寺\n流通门户", "#7a5af8", (0.40, 0.16)),
    }
    for f in load_geo("key_areas.geojson")["features"]:
        aid = f["properties"]["area_id"]
        color = core_colors.get(aid, "#94a3b8")
        g = shape(f["geometry"])
        ax.add_patch(MplPoly(list(g.exterior.coords), closed=True, fill=False, edgecolor=color, linewidth=2.2))
        cx, cy = g.centroid.x, g.centroid.y
        ax.annotate(roles[aid][0], xy=(cx, cy), fontsize=13, fontweight="bold", color=roles[aid][1],
                    ha="center", va="center",
                    bbox=dict(boxstyle="round,pad=0.4", fc="white", ec=roles[aid][1], alpha=0.92))
    fig.savefig(FIG / "key-areas.png", bbox_inches="tight", facecolor="#f8fafc")
    plt.close(fig)

    # 4) mobility + blue-green
    fig, ax = plt.subplots(figsize=(12, 8), dpi=150)
    draw_base(
        ax, "交通慢行与蓝绿公共空间复合系统（v1.4）",
        [("green_space.geojson", "#22c55e"), ("public_space.geojson", "#eab308")],
        [("roads.geojson", "#0284c7")],
        legend=[("绿地", "#22c55e"), ("公共空间", "#eab308"), ("道路", "#0284c7")],
    )
    fig.savefig(FIG / "mobility-bluegreen.png", bbox_inches="tight", facecolor="#f8fafc")
    plt.close(fig)

    # 5) metrics evidence
    fig, ax = plt.subplots(figsize=(12, 8), dpi=150)
    ax.axis("off")
    ax.set_title("核心指标复算（v1.4，三期总和=边界面积）", fontsize=14, pad=12)
    rows = [
        ("site_area_sqm", f"{values['site_area_sqm']:,.0f}", "m²"),
        ("building_density", f"{values['building_density']*100:.1f}%", ""),
        ("green_ratio", f"{values['green_ratio']*100:.1f}%", ""),
        ("public_space_ratio", f"{values['public_space_ratio']*100:.1f}%", ""),
        ("road_length_m", f"{values['road_length_m']:,.0f}", "m"),
        ("phase_1_area_sqm", f"{values['phase_1_area_sqm']:,.0f}", "m²"),
        ("phase_2_area_sqm", f"{values['phase_2_area_sqm']:,.0f}", "m²"),
        ("phase_3_area_sqm", f"{values['phase_3_area_sqm']:,.0f}", "m²"),
        ("phasing_total_sqm", f"{values['phasing_total_sqm']:,.0f}", "m²"),
        ("buildings", f"{values['building_count']}", "个"),
    ]
    y = 0.86
    for k, v, u in rows:
        ax.text(0.08, y, k, fontsize=12, color="#334155")
        ax.text(0.58, y, f"{v}{u}", fontsize=14, color="#0f172a", fontweight="bold")
        y -= 0.077
    fig.savefig(FIG / "metrics-evidence.png", bbox_inches="tight", facecolor="#f8fafc")
    plt.close(fig)


def render_pdfs() -> None:
    from reportlab.lib.pagesizes import A3, landscape
    from reportlab.lib.utils import ImageReader
    from reportlab.pdfgen import canvas

    names = ["site-overview.png", "land-use-structure.png", "key-areas.png",
             "mobility-bluegreen.png", "metrics-evidence.png"]
    images = [FIG / n for n in names]

    def make_pdf(path: Path, page_size, cols: int) -> None:
        c = canvas.Canvas(str(path), pagesize=page_size)
        w, h = page_size
        c.setFont("Helvetica-Bold", 16)
        c.drawString(36, h - 36, "Jing-Zhang AI Pulse v1.4")
        c.setFont("Helvetica", 10)
        c.drawString(36, h - 52, "Concept urban design boards derived from submission GeoJSON (phasing clipped to site)")
        slot_w = (w - 72 - (cols - 1) * 12) / cols
        slot_h = (h - 120) / 2
        for i, img in enumerate(images):
            row, col = divmod(i, cols)
            x = 36 + col * (slot_w + 12)
            y = h - 90 - (row + 1) * slot_h - row * 12
            c.drawImage(ImageReader(str(img)), x, y, width=slot_w, height=slot_h, preserveAspectRatio=True, anchor="c")
            c.showPage()
        c.save()

    make_pdf(PKG / "drawings/a3-booklet.pdf", landscape(A3), 2)
    make_pdf(PKG / "drawings/a0-boards.pdf", landscape(A3), 3)


def refresh_manifest() -> None:
    manifest_path = PKG / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    for item in manifest.get("files", []):
        rel = item.get("path")
        if not rel or rel == "manifest.json":
            continue
        fp = PKG / rel
        if fp.is_file():
            item["sha256"] = hashlib.sha256(fp.read_bytes()).hexdigest()
    manifest["generated_at"] = "2026-08-27T12:00:00Z"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    values = update_geometry()
    update_metrics(values)
    render_figures(values)
    render_pdfs()
    refresh_manifest()
    print(json.dumps(values, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
