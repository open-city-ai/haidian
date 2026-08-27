#!/usr/bin/env python3
"""v1.2 optimization: densify geometry, refactor phasing, recalc metrics, regen figures."""

from __future__ import annotations

import hashlib
import json
import math
from pathlib import Path
from typing import Any

from pyproj import Transformer
from shapely.geometry import LineString, MultiLineString, MultiPolygon, Polygon, mapping, shape
from shapely.ops import transform, unary_union

REPO = Path(__file__).resolve().parents[1]
PKG = REPO / "submissions/zenzenzense520-bit/jingzhang-ai-pulse"
GEO = PKG / "geometry"
FIG = PKG / "assets/figures"
TRANS = Transformer.from_crs("EPSG:4326", "EPSG:4548", always_xy=True)


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


def feat(fid: str, layer: str, geom: Any, **props: Any) -> dict[str, Any]:
    base = {
        "id": fid,
        "layer": layer,
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
    }
    base.update(props)
    if geom.geom_type in {"Polygon", "MultiPolygon"}:
        base["area_sqm_declared"] = round(area_sqm(geom), 3)
    return {"type": "Feature", "id": fid, "properties": base, "geometry": mapping(geom)}


def line_feat(fid: str, coords: list, road_class: str, name_zh: str) -> dict[str, Any]:
    geom = LineString(coords) if len(coords) >= 2 else LineString([])
    return feat(fid, "ROAD_CENTERLINE", geom, road_class=road_class, name_zh=name_zh)


def new_buildings() -> list[dict[str, Any]]:
    specs = [
        ("BLDG-013", "lab", "众智园安全治理中心", 116.3512, 40.018, 116.3532, 40.0202),
        ("BLDG-014", "office", "众智园开源协作中心", 116.3465, 40.022, 116.3485, 40.024),
        ("BLDG-015", "lab", "端侧算力评测站", 116.3495, 40.024, 116.351, 40.0255),
        ("BLDG-016", "cultural", "标准工作坊", 116.347, 40.017, 116.3485, 40.0185),
        ("BLDG-017", "office", "治理展示节点", 116.352, 40.021, 116.3535, 40.0225),
        ("BLDG-018", "community_service", "园区服务驿站", 116.345, 40.019, 116.3465, 40.0205),
        ("BLDG-019", "office", "原点社区加速器", 116.351, 39.986, 116.3525, 39.9875),
        ("BLDG-020", "office", "校企联合实验室", 116.348, 39.9845, 116.3495, 39.986),
        ("BLDG-021", "cultural", "开源成果展示廊", 116.346, 39.987, 116.3475, 39.9885),
        ("BLDG-022", "community_service", "青年创客公寓B座", 116.3515, 39.9845, 116.353, 39.986),
        ("BLDG-023", "office", "数据要素会客厅", 116.3538, 39.946, 116.3552, 39.9475),
        ("BLDG-024", "mixed_use", "站城一体TOD裙房", 116.3475, 39.945, 116.349, 39.9465),
        ("BLDG-025", "cultural", "国际路演客厅", 116.3505, 39.946, 116.352, 39.9475),
        ("BLDG-026", "office", "产业服务综合体", 116.3535, 39.953, 116.355, 39.9545),
        ("BLDG-027", "office", "中关村服务翼总部", 116.3518, 39.958, 116.3533, 39.9595),
        ("BLDG-028", "community_service", "AI健康驿站", 116.3435, 40.002, 116.345, 40.0035),
        ("BLDG-029", "cultural", "京张文脉解读中心", 116.3455, 39.951, 116.347, 39.9525),
        ("BLDG-030", "office", "场景开放运营中心", 116.3525, 39.998, 116.3532, 39.9995),
        ("BLDG-031", "cultural", "开源发布塔概念体", 116.3495, 39.991, 116.3508, 39.9925),
        ("BLDG-032", "mobility_hub", "五道口接驳微枢纽", 116.344, 39.992, 116.3455, 39.9935),
    ]
    return [feat(c[0], "BUILDING_FOOTPRINT", box_poly(*c[3:]), building_type=c[1], name_zh=c[2]) for c in specs]


def new_roads() -> list[dict[str, Any]]:
    return [
        line_feat("ROAD-010", [[116.343, 40.0165], [116.3538, 40.0165]], "secondary", "众智园内部东西向支路"),
        line_feat("ROAD-011", [[116.343, 39.9888], [116.3525, 39.9888]], "branch", "原点社区南北向支路"),
        line_feat("ROAD-012", [[116.342, 39.947], [116.355, 39.947]], "secondary", "大钟寺片区东西向支路"),
        line_feat("ROAD-013", [[116.3462, 39.952], [116.3462, 40.024]], "pedestrian", "智脉步行主轴"),
        line_feat("ROAD-014", [[116.3515, 39.952], [116.3515, 40.018]], "cycleway", "中关村服务翼慢行轴"),
        line_feat("ROAD-015", [[116.3415, 39.975], [116.3445, 39.975]], "greenway", "西翼滨水慢行联络线"),
        line_feat("ROAD-016", [[116.3536, 39.975], [116.3536, 40.0075]], "cycleway", "小月河场景赋能联络线"),
        line_feat("ROAD-017", [[116.3453, 39.9493], [116.3453, 40.0235]], "branch", "西翼纵向微循环"),
        line_feat("ROAD-018", [[116.3495, 39.944], [116.3495, 40.0075]], "branch", "东翼纵向微循环"),
        line_feat("ROAD-019", [[116.3473, 39.9468], [116.3473, 39.9888]], "pedestrian", "站城步行通廊"),
        line_feat("ROAD-020", [[116.3428, 40.012], [116.354, 40.012]], "secondary", "众智园北侧联络线"),
        line_feat("ROAD-021", [[116.342, 39.9835], [116.353, 39.9835]], "branch", "原点社区南侧联络线"),
    ]


def new_green() -> list[dict[str, Any]]:
    specs = [
        ("GREEN-004", "众智园中央创新谷", 116.347, 40.014, 116.3495, 40.017),
        ("GREEN-005", "众智园滨河口袋公园", 116.344, 40.023, 116.346, 40.0255),
        ("GREEN-006", "原点社区发布轴绿带", 116.345, 39.987, 116.347, 39.9895),
        ("GREEN-007", "原点社区慢行绿岛", 116.3505, 39.985, 116.3525, 39.987),
        ("GREEN-008", "大钟寺站前绿岛", 116.3485, 39.944, 116.3505, 39.9455),
        ("GREEN-009", "大钟寺产业绿带", 116.3525, 39.948, 116.3545, 39.9505),
        ("GREEN-010", "西翼社区绿带", 116.3415, 39.998, 116.3425, 40.001),
        ("GREEN-011", "东翼场景试验绿带", 116.3525, 39.998, 116.3532, 40.001),
    ]
    return [feat(c[0], "GREEN_SPACE", box_poly(*c[2:]), land_use_code="1401", name_zh=c[1]) for c in specs]


def new_public() -> list[dict[str, Any]]:
    specs = [
        ("PUBLIC-006", "众智园开源发布广场", 116.3465, 40.015, 116.3485, 40.017),
        ("PUBLIC-007", "众智园治理展示前庭", 116.351, 40.019, 116.3525, 40.0205),
        ("PUBLIC-008", "原点社区创客客厅", 116.3475, 39.985, 116.3495, 39.987),
        ("PUBLIC-009", "原点社区慢行交汇广场", 116.3445, 39.99, 116.3465, 39.992),
        ("PUBLIC-010", "大钟寺四象限步行广场", 116.348, 39.947, 116.3505, 39.949),
        ("PUBLIC-011", "大钟寺产业路演前庭", 116.3525, 39.9455, 116.3545, 39.9475),
        ("PUBLIC-012", "京张绿廊中段活动场", 116.345, 39.968, 116.347, 39.9705),
        ("PUBLIC-013", "中关村服务翼社区客厅", 116.351, 39.956, 116.353, 39.958),
        ("PUBLIC-014", "小月河场景开放前庭", 116.353, 40.004, 116.3540, 40.006),
    ]
    return [feat(c[0], "PUBLIC_SPACE", box_poly(*c[2:]), name_zh=c[1]) for c in specs]


def new_phasing(site: Polygon) -> list[dict[str, Any]]:
    p1a = box_poly(116.343, 40.0075, 116.354, 40.026)
    p1b = box_poly(116.346, 39.944, 116.354, 39.9485)
    phase1 = MultiPolygon([p1a, p1b])
    p2a = box_poly(116.342, 39.9835, 116.353, 39.9935)
    p2b = box_poly(116.3512, 39.952, 116.3545, 40.018)
    phase2 = unary_union([p2a, p2b])
    used = unary_union([phase1, phase2]).intersection(site)
    phase3 = site.difference(used)
    if phase3.is_empty:
        phase3 = site
    return [
        feat("PHASE-001", "PHASE", phase1, phase="phase_1", name_zh="近期2026-2028：众智园+大钟寺站城门户"),
        feat("PHASE-002", "PHASE", phase2, phase="phase_2", name_zh="中期2028-2030：原点社区+中关村服务翼慢行网"),
        feat("PHASE-003", "PHASE", phase3, phase="phase_3", name_zh="远期2030+：小月河场景翼+全域节点织补"),
    ]


def phase_area(phase_id: str, phases: list[dict[str, Any]]) -> float:
    total = 0.0
    for f in phases:
        if f["properties"].get("phase") == phase_id:
            total += area_sqm(shape(f["geometry"]))
    return total


def update_geometry() -> dict[str, float]:
    site = shape(load_geo("site_boundary.geojson")["features"][0]["geometry"])
    buildings = load_geo("buildings.geojson")["features"] + new_buildings()
    roads = load_geo("roads.geojson")["features"] + new_roads()
    greens = load_geo("green_space.geojson")["features"] + new_green()
    publics = load_geo("public_space.geojson")["features"] + new_public()
    phases = new_phasing(site)
    save_geo("buildings.geojson", {"type": "FeatureCollection", "name": "building_footprints", "features": buildings})
    save_geo("roads.geojson", {"type": "FeatureCollection", "name": "roads", "features": roads})
    save_geo("green_space.geojson", {"type": "FeatureCollection", "name": "green_space", "features": greens})
    save_geo("public_space.geojson", {"type": "FeatureCollection", "name": "public_space", "features": publics})
    save_geo("phasing.geojson", {"type": "FeatureCollection", "name": "phasing", "features": phases})
    b_area = sum(area_sqm(shape(f["geometry"])) for f in buildings)
    g_area = sum(area_sqm(shape(f["geometry"])) for f in greens)
    p_area = sum(area_sqm(shape(f["geometry"])) for f in publics)
    s_area = area_sqm(site)
    road_len = 0.0
    greenway_len = 0.0
    for f in roads:
        g = shape(f["geometry"])
        road_len += line_len_m(g)
        rc = f["properties"].get("road_class", "")
        if rc in {"greenway", "cycleway", "pedestrian"}:
            greenway_len += line_len_m(g)
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
        "phase_1_area_sqm": round(phase_area("phase_1", phases), 3),
        "phase_2_area_sqm": round(phase_area("phase_2", phases), 3),
        "phase_3_area_sqm": round(phase_area("phase_3", phases), 3),
        "building_count": len(buildings),
        "road_count": len(roads),
        "green_count": len(greens),
        "public_count": len(publics),
    }


def update_metrics(values: dict[str, float]) -> None:
    path = PKG / "metrics.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    m = data["metrics"]
    mapping_fields = {
        "site_area_sqm": ("sqm", "polygon_area(submitted_site_boundary)"),
        "building_footprint_area_sqm": ("sqm", "sum(polygon_area(building_footprints))"),
        "green_space_area_sqm": ("sqm", "sum(polygon_area(green_space))"),
        "public_space_area_sqm": ("sqm", "sum(polygon_area(public_space))"),
        "green_ratio": ("ratio", "green_space_area_sqm / site_area_sqm"),
        "public_space_ratio": ("ratio", "public_space_area_sqm / site_area_sqm"),
        "building_density": ("ratio", "building_footprint_area_sqm / site_area_sqm"),
        "road_length_m": ("m", "sum(line_length(roads))"),
        "greenway_length_m": ("m", "sum(line_length(greenway/cycleway/pedestrian roads))"),
        "phase_1_area_sqm": ("sqm", "sum(polygon_area(phase_1))"),
    }
    for key, (unit, formula) in mapping_fields.items():
        if key in m and key in values:
            m[key]["value"] = values[key]
            m[key]["unit"] = unit
            m[key]["formula"] = formula
    if "phase_2_area_sqm" not in m:
        m["phase_2_area_sqm"] = {
            "status": "known",
            "value": values["phase_2_area_sqm"],
            "unit": "sqm",
            "source_files": ["geometry/phasing.geojson"],
            "formula": "sum(polygon_area(phase_2))",
            "confidence": "medium",
            "assumptions": ["Phasing polygons are conceptual design proposals."],
        }
    else:
        m["phase_2_area_sqm"]["value"] = values["phase_2_area_sqm"]
    if "phase_3_area_sqm" not in m:
        m["phase_3_area_sqm"] = {
            "status": "known",
            "value": values["phase_3_area_sqm"],
            "unit": "sqm",
            "source_files": ["geometry/phasing.geojson"],
            "formula": "sum(polygon_area(phase_3))",
            "confidence": "medium",
            "assumptions": ["Phasing polygons are conceptual design proposals."],
        }
    else:
        m["phase_3_area_sqm"]["value"] = values["phase_3_area_sqm"]
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


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
    manifest["generated_at"] = "2026-08-23T10:30:00Z"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def render_figures(values: dict[str, float]) -> None:
    import matplotlib.pyplot as plt
    from matplotlib.patches import Polygon as MplPoly
    from matplotlib.collections import PatchCollection, LineCollection

    plt.rcParams["font.sans-serif"] = ["Microsoft YaHei", "SimHei", "Arial Unicode MS", "DejaVu Sans"]
    plt.rcParams["axes.unicode_minus"] = False
    FIG.mkdir(parents=True, exist_ok=True)

    def load_layer(name: str, color: str, alpha=0.55):
        polys, cols = [], []
        for f in load_geo(name)["features"]:
            g = shape(f["geometry"])
            if g.geom_type == "Polygon":
                polys.append(MplPoly(list(g.exterior.coords), closed=True))
                cols.append(color)
            elif g.geom_type == "MultiPolygon":
                for p in g.geoms:
                    polys.append(MplPoly(list(p.exterior.coords), closed=True))
                    cols.append(color)
        return polys, cols

    def draw_map(ax, title: str, layers: list[tuple[str, str]], lines: list[tuple[str, str]] | None = None):
        ax.set_title(title, fontsize=14, pad=10)
        site = shape(load_geo("site_boundary.geojson")["features"][0]["geometry"])
        ax.add_patch(MplPoly(list(site.exterior.coords), closed=True, fill=False, edgecolor="#94a3b8", linewidth=1.2, linestyle="--"))
        for fname, color in layers:
            polys, cols = load_layer(fname, color)
            if polys:
                ax.add_collection(PatchCollection(polys, facecolor=cols, edgecolor="#334155", linewidth=0.4, alpha=0.55))
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
        ax.text(0.01, 0.01, "provisional boundary · concept design · v1.2", transform=ax.transAxes, fontsize=8, color="#64748b")

    # site overview
    fig, ax = plt.subplots(figsize=(12, 8), dpi=150)
    draw_map(ax, "京张智脉总览：一脉串联三核", [
        ("green_space.geojson", "#86efac"),
        ("public_space.geojson", "#fde68a"),
        ("buildings.geojson", "#cbd5e1"),
        ("key_areas.geojson", "#c4b5fd"),
    ], [("roads.geojson", "#0f766e")])
    fig.savefig(FIG / "site-overview.png", bbox_inches="tight", facecolor="#f8fafc")
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(12, 8), dpi=150)
    draw_map(ax, "用地结构与两翼翼向", [("land_use.geojson", "#93c5fd"), ("phasing.geojson", "#fca5a5")])
    fig.savefig(FIG / "land-use-structure.png", bbox_inches="tight", facecolor="#f8fafc")
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(12, 8), dpi=150)
    draw_map(ax, "三核差异化锚点", [
        ("key_areas.geojson", "#ddd6fe"),
        ("buildings.geojson", "#64748b"),
        ("public_space.geojson", "#fbbf24"),
    ])
    fig.savefig(FIG / "key-areas.png", bbox_inches="tight", facecolor="#f8fafc")
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(12, 8), dpi=150)
    draw_map(ax, "交通慢行与蓝绿公共空间", [
        ("green_space.geojson", "#22c55e"),
        ("public_space.geojson", "#eab308"),
    ], [("roads.geojson", "#0284c7")])
    fig.savefig(FIG / "mobility-bluegreen.png", bbox_inches="tight", facecolor="#f8fafc")
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(12, 8), dpi=150)
    ax.axis("off")
    ax.set_title("核心指标复算（v1.2）", fontsize=14, pad=12)
    rows = [
        ("site_area_sqm", values["site_area_sqm"], "m²"),
        ("building_density", f"{values['building_density']*100:.1f}%", ""),
        ("green_ratio", f"{values['green_ratio']*100:.1f}%", ""),
        ("public_space_ratio", f"{values['public_space_ratio']*100:.1f}%", ""),
        ("road_length_m", values["road_length_m"], "m"),
        ("phase_1_area_sqm", values["phase_1_area_sqm"], "m²"),
        ("phase_2_area_sqm", values["phase_2_area_sqm"], "m²"),
        ("buildings", values["building_count"], "个"),
    ]
    y = 0.82
    for k, v, u in rows:
        ax.text(0.08, y, f"{k}", fontsize=12, color="#334155")
        ax.text(0.55, y, f"{v}{u}", fontsize=14, color="#0f172a", fontweight="bold")
        y -= 0.09
    fig.savefig(FIG / "metrics-evidence.png", bbox_inches="tight", facecolor="#f8fafc")
    plt.close(fig)


def render_pdfs() -> None:
    from reportlab.lib.pagesizes import A3, landscape
    from reportlab.lib.utils import ImageReader
    from reportlab.pdfgen import canvas

    names = [
        "site-overview.png",
        "land-use-structure.png",
        "key-areas.png",
        "mobility-bluegreen.png",
        "metrics-evidence.png",
    ]
    images = [FIG / n for n in names]

    def make_pdf(path: Path, page_size, cols: int):
        c = canvas.Canvas(str(path), pagesize=page_size)
        w, h = page_size
        c.setFont("Helvetica-Bold", 16)
        c.drawString(36, h - 36, "Jing-Zhang AI Pulse v1.2")
        c.setFont("Helvetica", 10)
        c.drawString(36, h - 52, "Concept urban design boards derived from submission GeoJSON")
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


def patch_visual_html(values: dict[str, float]) -> None:
    path = PKG / "visual/index.html"
    text = path.read_text(encoding="utf-8")
    repl = {
        "3,692,893": f"{values['phase_1_area_sqm']:,.0f}".replace(",", ","),
        "618,413": f"{values['building_footprint_area_sqm']:,.0f}".replace(",", ","),
        "5.4%": f"{values['building_density']*100:.1f}%",
        "51,642": f"{values['road_length_m']:,.0f}".replace(",", ","),
        "15,354": f"{values['greenway_length_m']:,.0f}".replace(",", ","),
        "v1.1": "v1.2",
    }
    for old, new in repl.items():
        text = text.replace(old, new)
    if "phase_2_area_sqm" not in text:
        text = text.replace(
            "近期启动区面积为",
            f"近期启动区 {values['phase_1_area_sqm']:,.0f} m²、中期 {values['phase_2_area_sqm']:,.0f} m²、远期 {values['phase_3_area_sqm']:,.0f} m²；近期启动区面积为",
        )
    path.write_text(text, encoding="utf-8")


def main() -> None:
    values = update_geometry()
    update_metrics(values)
    render_figures(values)
    render_pdfs()
    patch_visual_html(values)
    refresh_manifest()
    print(json.dumps(values, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
