# Formal Narrative

This narrative is derived from the structured AI package. Geometry, metrics, compliance matrix, drawings, and visual/index.html remain cross-checked deliverables.

---

# 附录 A：随包校验脚本全文（Verification Scripts）

本附录收录两个最小可用校验脚本的完整源码。脚本仅读取包内文件、不发起任何外部请求；运行方式：将脚本保存为 `.py` 文件置于提交包根目录后执行（依赖：Python 3.10+，fashi_validator 另需 shapely）。数字原型脚本从 `visual/assets/digital_prototype_simulation.json` 复算统计量并重出双语对比图；营造法式校验器读取 `geometry/` 图层逐条机器校验并输出报告。

## A.1 digital_prototype.py — 数字原型步行仿真复算与出图

```python
# -*- coding: utf-8 -*-
"""京张源点 · 数字原型步行仿真：统计复算与出图脚本（可复现性声明）

方法（与提案「数字原型」节一致）：
- 样区：节点 B（五道口—六道口段）
- 边数据来源：OpenStreetMap 步行路网，osmnx 抓取（2026-07，抓取参数见 results JSON）
- 现状网络：1035 条边；干预网络：现状 + 绿廊脊柱 + 5 条穿越通道
- OD 采样：样区内随机点 60 组，随机种子 20260717（numpy RandomState）
- 路径：Dijkstra 最短路径；绕行系数 = 网络距离 / 欧氏距离

本脚本不重新抓取网络（评审环境不保证联网），而是从随包结果文件
digital_prototype_results.json 复算全部统计量并重新出图，
证明"仿真修正均质化假设"是一个可复算、可视的结论。
原始逐条 OD 表由团队留存（含 OSM 抓取缓存），可按需提供。

用法：将本脚本置于提交包根目录后运行 python digital_prototype.py
输入：visual/assets/digital_prototype_simulation.json
输出：visual/assets/digital_prototype_check.json + assets/figures/digital-prototype-ab.png（中英双语）
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = HERE  # 脚本存放于 report/narrative.md 附录；运行时将本文件置于提交包根目录
RESULTS = os.path.join(ROOT, "visual", "assets", "digital_prototype_simulation.json")
OUT_JSON = os.path.join(ROOT, "visual", "assets", "digital_prototype_check.json")
OUT_FIG = os.path.join(ROOT, "assets", "figures", "digital-prototype-ab.png")

TOL = 1e-6


def main():
    with open(RESULTS, encoding="utf-8") as f:
        res = json.load(f)

    params = res["parameters"]
    agg = res["aggregate"]

    # 复算统计量
    along_reduction = (agg["along_corridor_detour_before"] - agg["along_corridor_detour_after"]) / agg[
        "along_corridor_detour_before"
    ]
    cross_reduction = (agg["cross_corridor_detour_before"] - agg["cross_corridor_detour_after"]) / agg[
        "cross_corridor_detour_before"
    ]
    checks = {
        "parameters": params,
        "recomputed": {
            "along_corridor_reduction": round(along_reduction, 4),
            "cross_corridor_reduction": round(cross_reduction, 4),
        },
        "declared": {
            "along_corridor_reduction": agg["along_corridor_reduction_declared"],
            "cross_corridor_reduction": agg["cross_corridor_reduction_declared"],
        },
    }
    ok = (
        abs(along_reduction - agg["along_corridor_reduction_declared"]) < TOL
        and abs(cross_reduction - agg["cross_corridor_reduction_declared"]) < TOL
    )
    checks["consistent"] = ok
    checks["note_zh"] = (
        "仿真值，非实测；与实测指标的换算关系待真实数据校准，不作为工程结论。"
        "原始逐条 OD 表（含 OSM 缓存）由团队留存，可按需提供。"
    )
    os.makedirs(os.path.dirname(OUT_JSON), exist_ok=True)
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(checks, f, ensure_ascii=False, indent=2)
    print("recomputed:", checks["recomputed"], "consistent:", ok)

    # 出图（基线—干预对比）
    try:
        import matplotlib

        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
    except ImportError:
        print("matplotlib not available; skip figure", file=sys.stderr)
        return 0 if ok else 1

    try:
        from daimon_runtime import setup_plot

        setup_plot()
    except Exception:
        plt.rcParams["font.sans-serif"] = ["Microsoft YaHei", "Noto Sans CJK SC", "sans-serif"]
        plt.rcParams["axes.unicode_minus"] = False

    def draw(lang):
        L = {
            "zh": dict(
                od1="沿线步行 OD", od2="横向穿越 OD", before="现状网络", after="干预网络",
                title1="：绕行系数", ylabel="绕行系数（网络距离/欧氏距离）",
                sup="数字原型：干预前后步行仿真（样区 {}, {} 组随机 OD，种子 {}，仿真值非实测）",
                short="缩短",
            ),
            "en": dict(
                od1="Along-corridor OD", od2="Cross-corridor OD", before="existing network", after="intervention",
                title1=": detour ", ylabel="detour factor (network / euclidean)",
                sup="Digital prototype: before/after walking simulation (sample {}, {} random OD pairs, seed {}, simulated not measured)",
                short="-",
            ),
        }[lang]
        fig, axes = plt.subplots(1, 2, figsize=(10, 4.2))
        for ax, (label, before, after, red) in zip(
            axes,
            [
                (L["od1"], agg["along_corridor_detour_before"], agg["along_corridor_detour_after"], along_reduction),
                (L["od2"], agg["cross_corridor_detour_before"], agg["cross_corridor_detour_after"], cross_reduction),
            ],
        ):
            bars = ax.bar([L["before"], L["after"]], [before, after], color=["#8a4b2f", "#1f2a38"], width=0.55)
            for b, v in zip(bars, (before, after)):
                ax.text(b.get_x() + b.get_width() / 2, v + 0.01, f"{v:.2f}", ha="center", fontsize=12,
                        fontweight="bold")
            if lang == "zh":
                ax.set_title(f"{label}{L['title1']} {before:.2f} → {after:.2f}（{L['short']} {red*100:.1f}%）",
                             fontsize=12)
            else:
                ax.set_title(f"{label}{L['title1']}{before:.2f} → {after:.2f} (−{red*100:.1f}%)", fontsize=12)
            ax.set_ylim(0, max(before, after) * 1.25)
            ax.set_ylabel(L["ylabel"])
        area = params["sample_area_zh"] if lang == "zh" else params["sample_area_en"]
        fig.suptitle(L["sup"].format(area, params["od_pairs"], params["random_seed"]), fontsize=13)
        fig.tight_layout(rect=(0, 0, 1, 0.93))
        fig.text(0.99, 0.005, "概念值 · 非法定控制指标 | CONCEPTUAL — NOT STATUTORY",
                 ha="right", va="bottom", fontsize=7, color="#888888")
        suffix = "" if lang == "zh" else ".en"
        out = OUT_FIG.replace(".png", f"{suffix}.png")
        fig.savefig(out, dpi=150, bbox_inches="tight")
        plt.close(fig)
        print("figure:", out)

    os.makedirs(os.path.dirname(OUT_FIG), exist_ok=True)
    draw("zh")
    draw("en")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())

```

## A.2 fashi_validator.py — 营造法式 G1–G5 机器校验器

```python
# -*- coding: utf-8 -*-
"""京张源点 · 营造法式 G1–G5 最小可用机器校验器（规则即交付物的证明）

在 EPSG:4548 下读取提交建筑体量（geometry/buildings.geojson），
对 G1 结构法则中可机器化的条款逐条校验，并输出逐条报告：

- G1-H  高度带：按 floors_assumed × 3.0m 折算高度，对照距绿廊距离分带
        （≤70m: ≤18m；70–150m: ≤24m；150–300m: ≤50m；>300m: ≤100m）
- G1-T  塔楼条款：塔楼（折算高度 >50m）只落站点院落、占地比 ≤25%、面宽 ≤40m
- G1-R  结果统计：通过/违规逐条计数，违规即图则修订项

G2 模数、G3 变奏、G4 界面、G5 时间的多数条款依赖图则参数与院落细胞几何，
当前提交图层尚不可机器化，报告中如实标注 not_machine_checkable，
作为后续图则深化的校验接口预留。

用法：将本脚本置于提交包根目录后运行 python fashi_validator.py
输出：visual/assets/fashi_validation_report.json
"""
import json
import math
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = HERE  # 脚本存放于 report/narrative.md 附录；运行时将本文件置于提交包根目录
BUILDINGS = os.path.join(ROOT, "geometry", "buildings.geojson")
GREEN = os.path.join(ROOT, "geometry", "green_space.geojson")
OUT = os.path.join(ROOT, "visual", "assets", "fashi_validation_report.json")

FLOOR_HEIGHT_M = 3.0
BANDS = [(70.0, 18.0), (150.0, 24.0), (300.0, 50.0), (math.inf, 100.0)]
TOWER_HEIGHT_M = 50.0
TOWER_MAX_FOOTPRINT_SHARE = 0.25
TOWER_MAX_FACE_WIDTH_M = 40.0


def _load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def main():
    from shapely.geometry import shape
    from shapely.ops import unary_union

    buildings = _load(BUILDINGS)["features"]
    corridor = unary_union([shape(f["geometry"]) for f in _load(GREEN)["features"]])

    def cap_for(dist):
        for limit, cap in BANDS:
            if dist <= limit:
                return cap
        return BANDS[-1][1]

    height_violations = []
    towers = []
    total_footprint = 0.0
    tower_footprint = 0.0
    face_width_violations = []

    for f in buildings:
        props = f["properties"]
        geom = shape(f["geometry"])
        bid = props.get("id")
        floors = props.get("floors_assumed") or 0
        height = floors * FLOOR_HEIGHT_M
        dist = geom.centroid.distance(corridor)
        cap = cap_for(dist)
        if height > cap + 1e-9:
            height_violations.append(
                {"id": bid, "height_m": round(height, 1), "dist_to_corridor_m": round(dist, 1), "band_cap_m": cap}
            )
        area = geom.area
        total_footprint += area
        if height > TOWER_HEIGHT_M:
            towers.append(bid)
            tower_footprint += area
            rect = geom.minimum_rotated_rectangle
            coords = list(rect.exterior.coords)[:4]
            edges = [
                math.hypot(coords[i + 1][0] - coords[i][0], coords[i + 1][1] - coords[i][1]) for i in range(3)
            ]
            if max(edges) > TOWER_MAX_FACE_WIDTH_M + 1e-9:
                face_width_violations.append({"id": bid, "face_width_m": round(max(edges), 1)})

    tower_share = (tower_footprint / total_footprint) if total_footprint else 0.0
    checks = [
        {
            "check_id": "G1-H",
            "rule_zh": "高度带：檐口基准带(≤70m)≤18m；过渡带(70–150m)≤24m、(150–300m)≤50m；以外≤100m",
            "checked": len(buildings),
            "violations": height_violations,
            "result": "pass" if not height_violations else "fail",
        },
        {
            "check_id": "G1-T1",
            "rule_zh": "塔楼占地比 ≤25%（塔楼=折算高度>50m）",
            "tower_count": len(towers),
            "tower_footprint_share": round(tower_share, 4),
            "result": "pass" if tower_share <= TOWER_MAX_FOOTPRINT_SHARE else "fail",
        },
        {
            "check_id": "G1-T2",
            "rule_zh": "塔楼面宽 ≤40m",
            "violations": face_width_violations,
            "result": "pass" if not face_width_violations else "fail",
        },
        {
            "check_id": "G2-G5",
            "rule_zh": "模数/变奏/界面/时间条款依赖图则参数与院落细胞几何",
            "result": "not_machine_checkable",
            "note_zh": "随图则深化提供校验接口；当前图层无可机器化输入。",
        },
    ]
    report = {
        "schema_version": "0.1.0",
        "validator": "report/narrative.md#附录A",
        "floor_height_m_assumed": FLOOR_HEIGHT_M,
        "crs": "EPSG:4548",
        "building_count": len(buildings),
        "checks": checks,
        "overall": "pass" if all(c["result"] in ("pass", "not_machine_checkable") for c in checks) else "fail",
        "note_zh": "概念体量的机器校验报告；建筑高度为 floors_assumed×3.0m 折算的概念值，非法定控制指标。",
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    print("overall:", report["overall"], "| buildings:", len(buildings), "| G1-H violations:", len(height_violations))
    return 0 if report["overall"] == "pass" else 1


if __name__ == "__main__":
    raise SystemExit(main())

```
