#!/usr/bin/env python3
"""Regenerate the five required proposal figures (zh + en) from the canonical
submission geometry and metrics.

Figures produced (presentation-quality urban-design diagrams):
  assets/figures/site-overview.png           总体设计范围总览与证据链图
  assets/figures/land-use-structure.png      用地结构与分期实施框架图
  assets/figures/key-areas.png               三处重点区域（三座月台）索引图
  assets/figures/mobility-bluegreen.png      交通慢行与蓝绿公共空间复合系统图
  assets/figures/metrics-evidence.png        核心指标复算与证据链图

Every figure embeds a provisional-boundary warning because
geometry/site_boundary.geojson and geometry/key_areas.geojson are
provisional_constraint layers (official polygons are not yet published).
All values come from metrics.json written by tools/recompute_metrics.py —
figures and text therefore stay consistent by construction.

Usage:
  python3 tools/generate_figures.py [submission-dir]

Requires: matplotlib, shapely, pyproj (see requirements-review.txt).
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.lines import Line2D
from matplotlib.patches import Patch
from pyproj import Transformer
from shapely.geometry import shape
from shapely.ops import transform

CRS_SOURCE = "EPSG:4326"
CRS_PROJECTED = "EPSG:4548"

TRANSFORMER = Transformer.from_crs(CRS_SOURCE, CRS_PROJECTED, always_xy=True)

# ---- palette (railway heritage + AI blue-green) ----
C_GREENWAY = "#2E7D57"
C_TRANSIT = "#C0392B"
C_ROAD = "#7F8C8D"
C_PED = "#B8C4C9"
C_SITE_EDGE = "#5D6D7E"
C_SITE_FILL = "#F4F6F7"
C_PUBLIC = "#D4A017"
C_PUBLIC_EDGE = "#8B6914"

LAND_USE_COLORS = {
    "05": "#8FAADC",
    "0701": "#E8B64C",
    "0802": "#D2695A",
    "1401": "#7FBF7F",
    "1402": "#B8D8B8",
    "1403": "#D8CDB8",
}
LAND_USE_LABELS_ZH = {
    "05": "公共管理与公共服务",
    "0701": "居住用地",
    "0802": "商业服务业设施",
    "1401": "公园绿地",
    "1402": "防护绿地",
    "1403": "广场用地",
}
LAND_USE_LABELS_EN = {
    "05": "Public admin & services",
    "0701": "Residential",
    "0802": "Commercial & services",
    "1401": "Park green space",
    "1402": "Buffer green space",
    "1403": "Plaza",
}

BUILDING_COLORS = {
    "ai_r_and_d": "#5B8DD9",
    "lab": "#6BAED6",
    "office": "#9E9AC8",
    "education": "#F2A65A",
    "talent_apartment": "#74C476",
    "retail": "#F4716F",
    "residential": "#E0C06A",
}
BUILDING_LABELS_ZH = {
    "ai_r_and_d": "AI研发",
    "lab": "实验室",
    "office": "办公",
    "education": "教育",
    "talent_apartment": "人才公寓",
    "retail": "商业",
    "residential": "居住",
}
BUILDING_LABELS_EN = {
    "ai_r_and_d": "AI R&D",
    "lab": "Lab",
    "office": "Office",
    "education": "Education",
    "talent_apartment": "Talent housing",
    "retail": "Retail",
    "residential": "Residential",
}

ROAD_STYLES = {
    "greenway": (C_GREENWAY, 3.4, "-"),
    "transit_connection": (C_TRANSIT, 2.2, "-"),
    "secondary": (C_ROAD, 1.6, "-"),
    "pedestrian": (C_PED, 1.6, (0, (4, 3))),
}

KEY_AREA_COLORS = {
    "zhongzhiyuan_ai_acceleration_area": "#D05C2B",
    "beijing_ai_origin_community": "#6C5BA7",
    "dazhongsi_ai_industry_cluster": "#1E8449",
}
KEY_AREA_NAMES_ZH = {
    "zhongzhiyuan_ai_acceleration_area": "众智园创新月台",
    "beijing_ai_origin_community": "AI原点人才月台",
    "dazhongsi_ai_industry_cluster": "大钟寺消费月台",
}
KEY_AREA_NAMES_EN = {
    "zhongzhiyuan_ai_acceleration_area": "Zhongzhiyuan Innovation Platform",
    "beijing_ai_origin_community": "AI Origin Talent Platform",
    "dazhongsi_ai_industry_cluster": "Dazhongsi Consumption Platform",
}

PHASE_COLORS = {
    "phase_1": "#F5CBA7",
    "phase_2": "#AED6F1",
    "phase_3": "#A9DFBF",
}
PHASE_LABELS_EN = {
    "phase_1": "Phase 1 · platforms & corridor",
    "phase_2": "Phase 2 · dual-track inner belt",
    "phase_3": "Phase 3 · outer community renewal",
}


def load_geojson(root: Path, name: str) -> list[dict]:
    path = root / "geometry" / name
    if not path.exists():
        return []
    data = json.loads(path.read_text(encoding="utf-8"))
    return data.get("features", [])


def proj_geom(feature: dict):
    return transform(TRANSFORMER.transform, shape(feature["geometry"]))


def load_metrics(root: Path) -> dict:
    data = json.loads((root / "metrics.json").read_text(encoding="utf-8"))
    return data.get("metrics", {})


def plot_geom(ax, geom, **kwargs):
    """Plot a polygon/line geometry (possibly multi) on projected axes."""
    if geom.is_empty:
        return
    if geom.geom_type == "Polygon":
        xs, ys = geom.exterior.xy
        ax.fill(xs, ys, **kwargs)
    elif geom.geom_type == "MultiPolygon":
        for poly in geom.geoms:
            xs, ys = poly.exterior.xy
            ax.fill(xs, ys, **kwargs)
    elif geom.geom_type in {"LineString", "MultiLineString"}:
        geoms = [geom] if geom.geom_type == "LineString" else list(geom.geoms)
        for line in geoms:
            xs, ys = line.xy
            ax.plot(xs, ys, **kwargs)
    elif geom.geom_type == "GeometryCollection":
        for sub in geom.geoms:
            plot_geom(ax, sub, **kwargs)


def plot_lines(ax, geom, **kwargs):
    geoms = [geom] if geom.geom_type == "LineString" else list(geom.geoms) if geom.geom_type == "MultiLineString" else []
    for line in geoms:
        xs, ys = line.xy
        ax.plot(xs, ys, **kwargs)


def setup_axes(ax, site_geom):
    xs, ys = site_geom.exterior.xy
    margin = 250
    ax.set_xlim(min(xs) - margin, max(xs) + margin)
    ax.set_ylim(min(ys) - margin, max(ys) + margin)
    ax.set_aspect("equal")
    ax.axis("off")


def title_block(ax, text_zh: str, text_en: str, lang: str):
    ax.set_title(
        text_zh if lang == "zh" else text_en,
        fontsize=15,
        fontweight="bold",
        loc="left",
        pad=12,
        color="#1B2631",
    )
    warn = (
        "注意：边界与重点区为临时粗略几何（provisional_constraint），不作正式红线；官方多边形发布后须重算全部图层、指标与图纸。"
        if lang == "zh"
        else "Note: boundary and key areas are provisional rough geometry (provisional_constraint); not an official redline. Recompute all layers, metrics and drawings once official polygons are published."
    )
    ax.text(0.0, -0.055, warn, transform=ax.transAxes, fontsize=8, color="#A93226", style="italic")


def plot_site_base(ax, L, lang: str):
    """Shared map base: provisional site edge (dashed), land use, key areas."""
    site = proj_geom(L["site"][0])
    plot_geom(ax, site, facecolor=C_SITE_FILL, edgecolor=C_SITE_EDGE, linewidth=1.4, zorder=1)
    xs, ys = site.exterior.xy
    ax.plot(xs, ys, color=C_SITE_EDGE, linewidth=1.2, linestyle=(0, (5, 4)), zorder=2)
    for f in L["land_use"]:
        code = str(f.get("properties", {}).get("land_use_code"))
        plot_geom(ax, proj_geom(f), facecolor=LAND_USE_COLORS.get(code, "#D5DBDB"),
                  edgecolor="white", linewidth=0.4, alpha=0.92, zorder=3)
    for f in L["key_areas"]:
        props = f.get("properties", {})
        aid = props.get("area_id")
        color = KEY_AREA_COLORS.get(aid, "#5D6D7E")
        g = proj_geom(f)
        plot_geom(ax, g, facecolor="none", edgecolor=color, linewidth=2.4, zorder=5)
        label = KEY_AREA_NAMES_ZH.get(aid) if lang == "zh" else KEY_AREA_NAMES_EN.get(aid)
        if label:
            ax.annotate(label, xy=(g.centroid.x, g.centroid.y), fontsize=8.5, ha="center", va="center",
                        color="#1B2631", bbox=dict(boxstyle="round,pad=0.25", fc="white", ec=color, lw=0.8, alpha=0.92), zorder=6)
    return site


def land_use_legend(ax, lang: str, loc: str = "lower left"):
    labels = LAND_USE_LABELS_ZH if lang == "zh" else LAND_USE_LABELS_EN
    handles = [Patch(facecolor=LAND_USE_COLORS[c], edgecolor="white", label=labels[c]) for c in sorted(LAND_USE_COLORS)]
    return ax.legend(handles=handles, loc=loc, fontsize=7.5, framealpha=0.92,
                     title=("用地分类" if lang == "zh" else "Land use"), title_fontsize=8)


def note_box(ax, text: str, loc=(0.015, 0.02)):
    ax.text(loc[0], loc[1], text, transform=ax.transAxes, fontsize=8.5, color="#1B2631", va="bottom",
            bbox=dict(boxstyle="round,pad=0.4", fc="white", ec=C_SITE_EDGE, alpha=0.95), zorder=8)


# --------------------------------------------------------------------------- #
# figure 1: site overview
# --------------------------------------------------------------------------- #
def fig_site_overview(ax, L, M, lang: str):
    plot_site_base(ax, L, lang)
    for f in L["green_space"]:
        code = str(f.get("properties", {}).get("land_use_code"))
        plot_geom(ax, proj_geom(f), facecolor=C_GREENWAY, edgecolor="white", linewidth=0.4,
                  alpha=0.55 if code == "1402" else 0.85, zorder=4)
    for f in L["roads"]:
        cls = f.get("properties", {}).get("road_class")
        color, width, style = ROAD_STYLES.get(cls, (C_ROAD, 1.4, "-"))
        plot_lines(ax, proj_geom(f), color=color, linewidth=width, linestyle=style, zorder=7, alpha=0.95)
    km2 = round(M["site_area_sqm"]["value"] / 1_000_000, 2)
    green = round(M["green_ratio"]["value"] * 100, 1)
    public = round(M["public_space_ratio"]["value"] * 100, 1)
    text = (
        f"总体设计范围（临时几何）{km2} km²\n绿地率 {green}% · 公共空间比例 {public}%\n"
        "“一条联廊 · 三座月台 · 两股轨道”"
        if lang == "zh"
        else f"Overall design area (provisional) {km2} km²\nGreen {green}% · Public space {public}%\n"
        "One corridor · Three platforms · Two tracks"
    )
    note_box(ax, text)
    handles = [
        Patch(facecolor=C_GREENWAY, label=("京张联廊绿道" if lang == "zh" else "Jing-Zhang corridor greenway")),
        Line2D([0], [0], color=C_TRANSIT, linewidth=2.2, label=("轨道接驳" if lang == "zh" else "Transit connection")),
        Line2D([0], [0], color=C_SITE_EDGE, linewidth=1.2, linestyle=(0, (5, 4)),
               label=("临时边界(provisional)" if lang == "zh" else "Provisional boundary")),
    ]
    ax.legend(handles=handles, loc="upper right", fontsize=7.5, framealpha=0.92)


# --------------------------------------------------------------------------- #
# figure 2: land use structure
# --------------------------------------------------------------------------- #
def fig_land_use(ax, L, M, lang: str):
    plot_site_base(ax, L, lang)
    for f in L["phasing"]:
        props = f.get("properties", {})
        color = PHASE_COLORS.get(props.get("phase"), "#EAECEE")
        g = proj_geom(f)
        polys = [g] if g.geom_type == "Polygon" else list(g.geoms) if g.geom_type == "MultiPolygon" else []
        for poly in polys:
            xs, ys = poly.exterior.xy
            ax.plot(xs, ys, color="#7F8C8D", linewidth=1.0, linestyle=(0, (6, 4)), zorder=4)
        label = props.get("name_zh") if lang == "zh" else PHASE_LABELS_EN.get(props.get("phase"), "")
        ax.text(g.centroid.x, g.centroid.y, label, fontsize=7, ha="center", va="center",
                color="#5D6D7E", rotation=12, zorder=4,
                bbox=dict(boxstyle="round,pad=0.2", fc="white", ec="#B0BEC5", lw=0.5, alpha=0.85))
    land_use_legend(ax, lang, loc="lower left")
    text = (
        f"{M['land_use_block_count']['value']} 个用地分区 · 全域无缝闭合\n"
        f"建筑基底 {round(M['building_footprint_area_sqm']['value'] / 1e4, 1)} 万㎡（{M['building_count']['value']} 栋）"
        if lang == "zh"
        else f"{M['land_use_block_count']['value']} land-use blocks, seamless\n"
        f"Building footprint {round(M['building_footprint_area_sqm']['value'] / 1e4, 1)} ha ({M['building_count']['value']} buildings)"
    )
    note_box(ax, text)


# --------------------------------------------------------------------------- #
# figure 3: key areas
# --------------------------------------------------------------------------- #
ZH_NOTES = {
    "zhongzhiyuan_ai_acceleration_area": "定位：花园型全栈自主创新街区\n动作：清河界面·产业展示·低碳创新交往\n场景：自主模型测试·安全治理展示",
    "beijing_ai_origin_community": "定位：近校型成果转化与人才社区\n动作：校区园区慢行缝合·成果发布·开源协作\n场景：开源社区·人才特区服务",
    "dazhongsi_ai_industry_cluster": "定位：城市型智能经济与国际交往街区\n动作：大钟寺站一体化·四象限步行连通\n场景：智能终端展示·数据要素·国际路演",
}
EN_NOTES = {
    "zhongzhiyuan_ai_acceleration_area": "Garden-type full-stack innovation block\nQinghe waterfront, industry showcase, low-carbon exchange\nModel testing, safety governance showcase",
    "beijing_ai_origin_community": "Near-campus incubation & talent community\nCampus-park slow stitching, release & open-source\nOpen-source community, talent services",
    "dazhongsi_ai_industry_cluster": "Urban smart-economy & international exchange block\nDazhongsi station integration, 4-quadrant links\nSmart-terminal showcase, data factors, roadshows",
}


def fig_key_areas(ax, L, M, lang: str):
    plot_site_base(ax, L, lang)
    for f in L["public_space"]:
        plot_geom(ax, proj_geom(f), facecolor=C_PUBLIC, edgecolor=C_PUBLIC_EDGE, linewidth=0.8, alpha=0.75, zorder=5)
    notes = ZH_NOTES if lang == "zh" else EN_NOTES
    offsets = {
        "zhongzhiyuan_ai_acceleration_area": (0.06, 0.68),
        "beijing_ai_origin_community": (0.06, 0.10),
        "dazhongsi_ai_industry_cluster": (0.70, 0.08),
    }
    for f in L["key_areas"]:
        props = f.get("properties", {})
        aid = props.get("area_id")
        color = KEY_AREA_COLORS.get(aid, "#5D6D7E")
        x0, y0 = offsets.get(aid, (0.5, 0.5))
        ax.text(x0, y0, notes.get(aid, ""), transform=ax.transAxes, fontsize=7.2, color="#1B2631",
                va="top", bbox=dict(boxstyle="round,pad=0.5", fc="white", ec=color, lw=1.2, alpha=0.96), zorder=8)
    handles = [
        Patch(facecolor=C_PUBLIC, alpha=0.75, label=("月台广场/公共空间节点" if lang == "zh" else "Platform plaza / public space")),
        Patch(facecolor="none", edgecolor="#D05C2B", linewidth=2, label=("重点区域(provisional)" if lang == "zh" else "Key area (provisional)")),
    ]
    ax.legend(handles=handles, loc="upper right", fontsize=7.5, framealpha=0.92)
    ha = round(M["key_area_total_area_sqm"]["value"] / 1e4, 1)
    text = (
        f"三座月台合计约 {ha} 公顷（临时几何复算）"
        if lang == "zh"
        else f"Three platforms total ~{ha} ha (provisional recompute)"
    )
    note_box(ax, text)


# --------------------------------------------------------------------------- #
# figure 4: mobility & blue-green
# --------------------------------------------------------------------------- #
def fig_mobility(ax, L, M, lang: str):
    plot_site_base(ax, L, lang)
    for f in L["buildings"]:
        btype = f.get("properties", {}).get("building_type")
        plot_geom(ax, proj_geom(f), facecolor=BUILDING_COLORS.get(btype, "#D5DBDB"),
                  edgecolor="white", linewidth=0.2, alpha=0.85, zorder=4)
    for f in L["green_space"]:
        code = str(f.get("properties", {}).get("land_use_code"))
        plot_geom(ax, proj_geom(f), facecolor=C_GREENWAY, edgecolor="white", linewidth=0.4,
                  alpha=0.55 if code == "1402" else 0.85, zorder=5)
    for f in L["public_space"]:
        plot_geom(ax, proj_geom(f), facecolor=C_PUBLIC, edgecolor=C_PUBLIC_EDGE, linewidth=0.7, alpha=0.7, zorder=5)
    for f in L["roads"]:
        cls = f.get("properties", {}).get("road_class")
        color, width, style = ROAD_STYLES.get(cls, (C_ROAD, 1.4, "-"))
        plot_lines(ax, proj_geom(f), color=color, linewidth=width, linestyle=style, zorder=7)
    handles = [
        Line2D([0], [0], color=C_GREENWAY, linewidth=3.2, label=("绿道/联廊" if lang == "zh" else "Greenway / corridor")),
        Line2D([0], [0], color=C_TRANSIT, linewidth=2.2, label=("轨道接驳" if lang == "zh" else "Transit connection")),
        Line2D([0], [0], color=C_ROAD, linewidth=1.6, label=("次干路" if lang == "zh" else "Secondary road")),
        Line2D([0], [0], color=C_PED, linewidth=1.6, linestyle=(0, (4, 3)), label=("步行通道" if lang == "zh" else "Pedestrian")),
        Patch(facecolor=BUILDING_COLORS["ai_r_and_d"], label=("AI研发/实验室" if lang == "zh" else "AI R&D / labs")),
        Patch(facecolor=BUILDING_COLORS["residential"], label=("居住" if lang == "zh" else "Residential")),
        Patch(facecolor=C_PUBLIC, alpha=0.7, label=("公共空间节点" if lang == "zh" else "Public-space nodes")),
    ]
    ax.legend(handles=handles, loc="lower right", fontsize=7, framealpha=0.92, ncol=2)
    km = round(M["road_network_length_m"]["value"] / 1000, 1)
    text = (
        f"道路中心线总长约 {km} 公里，慢行与蓝绿网络复合“两股轨道”"
        if lang == "zh"
        else f"Road network ~{km} km; slow-mobility + blue-green network forms the two tracks"
    )
    note_box(ax, text)


# --------------------------------------------------------------------------- #
# figure 5: metrics evidence
# --------------------------------------------------------------------------- #
def fig_metrics(ax, L, M, lang: str):
    ax.axis("off")
    names = ["site_area_sqm", "green_space_area_sqm", "public_space_area_sqm", "building_footprint_area_sqm"]
    labels = {
        "zh": ["总体设计范围", "绿地面积", "公共空间面积", "建筑基底"],
        "en": ["Overall design area", "Green space", "Public space", "Building footprint"],
    }
    values = [M[n]["value"] / 1e4 for n in names]
    bars = ax.bar(labels[lang], values, color=["#5D6D7E", C_GREENWAY, C_PUBLIC, "#9E9AC8"], width=0.55)
    for bar, v in zip(bars, values):
        ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + max(values) * 0.01,
                f"{v:,.1f}", ha="center", fontsize=8.5, color="#1B2631")
    ax.set_ylabel(("万㎡" if lang == "zh" else "ha"), fontsize=8.5)
    ax.set_title(("核心空间指标（EPSG:4548 复算）" if lang == "zh" else "Core spatial metrics (recomputed in EPSG:4548)"),
                 fontsize=12, fontweight="bold", loc="left", color="#1B2631")
    ratios = [("green_ratio", "绿地率", "Green ratio"), ("public_space_ratio", "公共空间比例", "Public-space ratio")]
    for i, (key, zh, en) in enumerate(ratios):
        txt = f"{zh} {M[key]['value'] * 100:.2f}%" if lang == "zh" else f"{en} {M[key]['value'] * 100:.2f}%"
        ax.text(0.02, 0.88 - i * 0.055, txt, transform=ax.transAxes, fontsize=10.5, color="#1B2631",
                bbox=dict(boxstyle="round,pad=0.35", fc="white", ec=C_SITE_EDGE, alpha=0.95))
    evidence = (
        "证据链：geometry/*.geojson → tools/recompute_metrics.py（EPSG:4326→EPSG:4548）→ metrics.json\n"
        "空间复核：scripts/spatial_review.py 按同一坐标系复算；本图数值与 metrics.json 逐一对应。"
        if lang == "zh"
        else "Evidence chain: geometry/*.geojson -> tools/recompute_metrics.py (EPSG:4326->EPSG:4548) -> metrics.json\n"
        "Spatial review: scripts/spatial_review.py recomputes in the same CRS; every value matches metrics.json."
    )
    ax.text(0.02, 0.02, evidence, transform=ax.transAxes, fontsize=7.8, color="#34495E", va="bottom",
            bbox=dict(boxstyle="round,pad=0.4", fc="#F4F6F7", ec="#BDC3C7", alpha=0.95))


FIGURES = {
    "site-overview": fig_site_overview,
    "land-use-structure": fig_land_use,
    "key-areas": fig_key_areas,
    "mobility-bluegreen": fig_mobility,
    "metrics-evidence": fig_metrics,
}
TITLES_ZH = {
    "site-overview": "京张月台 · 总体设计范围总览与空间证据链",
    "land-use-structure": "京张月台 · 用地结构与分期实施框架",
    "key-areas": "京张月台 · 三处重点区域（三座月台）索引与设计任务",
    "mobility-bluegreen": "京张月台 · 交通慢行与蓝绿公共空间复合系统",
    "metrics-evidence": "京张月台 · 核心指标复算与证据链",
}
TITLES_EN = {
    "site-overview": "JINGZHANG PLATFORM · Overall design area and evidence chain",
    "land-use-structure": "JINGZHANG PLATFORM · Land-use structure and phasing",
    "key-areas": "JINGZHANG PLATFORM · Three key areas (three platforms) index",
    "mobility-bluegreen": "JINGZHANG PLATFORM · Mobility and blue-green network",
    "metrics-evidence": "JINGZHANG PLATFORM · Core metrics and evidence chain",
}

FONT_ZH = ["PingFang HK", "Hiragino Sans GB", "STHeiti", "Songti SC", "Arial Unicode MS"]
FONT_EN = ["Helvetica Neue", "Arial", "DejaVu Sans"]


def pick_font(priorities: list[str]) -> str:
    installed = {f.name for f in font_manager.fontManager.ttflist}
    for name in priorities:
        if name in installed:
            return name
    return "DejaVu Sans"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("submission_dir", nargs="?", default=".")
    args = parser.parse_args()

    root = Path(args.submission_dir).resolve()
    M = load_metrics(root)
    L = {
        "site": load_geojson(root, "site_boundary.geojson"),
        "key_areas": load_geojson(root, "key_areas.geojson"),
        "land_use": load_geojson(root, "land_use.geojson"),
        "green_space": load_geojson(root, "green_space.geojson"),
        "public_space": load_geojson(root, "public_space.geojson"),
        "buildings": load_geojson(root, "buildings.geojson"),
        "roads": load_geojson(root, "roads.geojson"),
        "phasing": load_geojson(root, "phasing.geojson"),
    }
    if not L["site"]:
        print("ERROR: missing geometry/site_boundary.geojson", file=sys.stderr)
        return 1

    out_dir = root / "assets" / "figures"
    out_dir.mkdir(parents=True, exist_ok=True)

    for fig_name, renderer in FIGURES.items():
        for lang in ("zh", "en"):
            plt.rcParams["font.family"] = pick_font(FONT_ZH if lang == "zh" else FONT_EN)
            fig, ax = plt.subplots(figsize=(10.2, 5.1), dpi=150)
            fig.patch.set_facecolor("white")
            renderer(ax, L, M, lang)
            title_block(ax, TITLES_ZH[fig_name], TITLES_EN[fig_name], lang)
            suffix = "" if lang == "zh" else ".en"
            out = out_dir / f"{fig_name}{suffix}.png"
            fig.savefig(out, bbox_inches="tight", facecolor="white", pad_inches=0.08)
            plt.close(fig)
            print(f"wrote {out.relative_to(root)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
