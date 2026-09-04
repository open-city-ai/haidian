#!/usr/bin/env python3
"""Regenerate visual/index.html (zh/en) from the canonical submission data.

What changes vs. the hand-drawn page:
  * the overview-map <svg> is rendered from the same GeoJSON layers used by
    tools/generate_figures.py (provisional site edge, land use, green and
    public space, roads, key areas), projected to EPSG:4548;
  * the core-metric cards are re-read from metrics.json, so the
    data-metric / data-value attributes always match (visual_review.py
    compares them at 1e-6 relative tolerance);
  * all remaining copy (hero, sheets, scenario cards) is kept verbatim.

The SVG text is converted to paths (svg.fonttype = 'path') so the page
renders identically on any machine without the source fonts.

Usage:
  python3 tools/generate_visual.py [submission-dir]

Requires: matplotlib, shapely, pyproj (see requirements-review.txt).
"""

from __future__ import annotations

import argparse
import io
import re
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
matplotlib.rcParams["svg.fonttype"] = "path"
import matplotlib.pyplot as plt
from matplotlib import font_manager
from pyproj import Transformer
from shapely.geometry import shape
from shapely.ops import transform

from generate_figures import (
    BUILDING_COLORS,
    C_GREENWAY,
    C_PED,
    C_PUBLIC,
    C_PUBLIC_EDGE,
    C_ROAD,
    C_SITE_EDGE,
    C_SITE_FILL,
    C_TRANSIT,
    KEY_AREA_COLORS,
    KEY_AREA_NAMES_EN,
    KEY_AREA_NAMES_ZH,
    LAND_USE_COLORS,
    ROAD_STYLES,
    proj_geom,
    load_geojson,
    load_metrics,
)

CRS_SOURCE = "EPSG:4326"
CRS_PROJECTED = "EPSG:4548"
TRANSFORMER = Transformer.from_crs(CRS_SOURCE, CRS_PROJECTED, always_xy=True)

SVG_RE = re.compile(r"<svg\b[^>]*>.*?</svg>", re.S)
METRIC_RE = re.compile(
    r'(<strong data-metric="(?P<name>[^"]+)" data-value=")[^"]*(">)[^<]*(</strong>)'
)


def plot_geom(ax, geom, **kwargs):
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


def render_map_svg(L, lang: str) -> str:
    """Render the overview map from canonical layers; return inline <svg>."""
    font = None
    for name in ["PingFang HK", "Hiragino Sans GB", "STHeiti", "Songti SC", "Arial Unicode MS", "DejaVu Sans"]:
        if any(f.name == name for f in font_manager.fontManager.ttflist):
            font = name
            break
    plt.rcParams["font.family"] = font

    fig, ax = plt.subplots(figsize=(12.4, 6.4), dpi=110)
    fig.patch.set_facecolor("white")

    site = proj_geom(L["site"][0])
    plot_geom(ax, site, facecolor=C_SITE_FILL, edgecolor=C_SITE_EDGE, linewidth=1.4, zorder=1)
    xs, ys = site.exterior.xy
    ax.plot(xs, ys, color=C_SITE_EDGE, linewidth=1.2, linestyle=(0, (5, 4)), zorder=2)

    for f in L["land_use"]:
        code = str(f.get("properties", {}).get("land_use_code"))
        plot_geom(ax, proj_geom(f), facecolor=LAND_USE_COLORS.get(code, "#D5DBDB"),
                  edgecolor="white", linewidth=0.4, alpha=0.92, zorder=3)
    for f in L["green_space"]:
        code = str(f.get("properties", {}).get("land_use_code"))
        plot_geom(ax, proj_geom(f), facecolor=C_GREENWAY, edgecolor="white", linewidth=0.4,
                  alpha=0.55 if code == "1402" else 0.85, zorder=4)
    for f in L["public_space"]:
        plot_geom(ax, proj_geom(f), facecolor=C_PUBLIC, edgecolor=C_PUBLIC_EDGE, linewidth=0.7, alpha=0.75, zorder=5)
    for f in L["roads"]:
        cls = f.get("properties", {}).get("road_class")
        color, width, style = ROAD_STYLES.get(cls, (C_ROAD, 1.4, "-"))
        plot_lines(ax, proj_geom(f), color=color, linewidth=width, linestyle=style, zorder=7)
    for f in L["key_areas"]:
        props = f.get("properties", {})
        aid = props.get("area_id")
        color = KEY_AREA_COLORS.get(aid, "#5D6D7E")
        g = proj_geom(f)
        plot_geom(ax, g, facecolor="none", edgecolor=color, linewidth=2.4, zorder=6)
        label = KEY_AREA_NAMES_ZH.get(aid) if lang == "zh" else KEY_AREA_NAMES_EN.get(aid)
        ax.annotate(label, xy=(g.centroid.x, g.centroid.y), fontsize=9, ha="center", va="center",
                    color="#1B2631", bbox=dict(boxstyle="round,pad=0.3", fc="white", ec=color, lw=0.9, alpha=0.94), zorder=8)

    margin = 250
    ax.set_xlim(min(xs) - margin, max(xs) + margin)
    ax.set_ylim(min(ys) - margin, max(ys) + margin)
    ax.set_aspect("equal")
    ax.axis("off")
    fig.subplots_adjust(left=0.0, right=1.0, top=1.0, bottom=0.0)

    buf = io.StringIO()
    fig.savefig(buf, format="svg", facecolor="white")
    plt.close(fig)
    svg = buf.getvalue()
    svg = re.sub(r"<metadata>.*?</metadata>", "", svg, flags=re.S)
    m = re.search(r"<svg\b[^>]*>", svg)
    if m:
        svg = re.sub(r'<svg\b[^>]*>', '<svg role="img" aria-label="Overview map derived from canonical GeoJSON">', svg, count=1)
    return svg.strip()


def display_values(M) -> dict[str, str]:
    """Human-readable display per metric (page copy stays zh/en-neutral)."""
    site = M["site_area_sqm"]["value"]
    return {
        "site_area_sqm": f"{site:,.1f}",
        "green_ratio": f"{M['green_ratio']['value'] * 100:.2f}%",
        "public_space_ratio": f"{M['public_space_ratio']['value'] * 100:.2f}%",
    }


def render_page(html_text: str, svg: str, M) -> str:
    def replace_metric(match: re.Match) -> str:
        name = match.group("name")
        value = M[name]["value"]
        raw = f"{value:g}" if abs(value) < 1000 else f"{value:.1f}"
        return (
            f'{match.group(1)}{raw}{match.group(3)}'
            f'{display_values(M)[name]}{match.group(4)}'
        )

    html_text = METRIC_RE.sub(replace_metric, html_text)
    html_text = SVG_RE.sub(lambda m: svg, html_text, count=1)
    return html_text


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
        "roads": load_geojson(root, "roads.geojson"),
    }
    if not L["site"]:
        print("ERROR: missing geometry/site_boundary.geojson", file=sys.stderr)
        return 1

    visual_dir = root / "visual"
    for lang, filename in (("zh", "index.html"), ("en", "index.en.html")):
        path = visual_dir / filename
        template = path.read_text(encoding="utf-8")
        svg = render_map_svg(L, lang)
        path.write_text(render_page(template, svg, M), encoding="utf-8")
        print(f"wrote {path.relative_to(root)} (svg {len(svg) // 1024} KiB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
