#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Create a topology-stable AI urban design submission scaffold."""

from __future__ import annotations

import argparse
import hashlib
import io
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


try:
    from PIL import Image, ImageDraw, ImageFont
    from pyproj import Transformer
    from shapely.geometry import LineString, Polygon, box, mapping, shape
    from shapely.ops import transform, unary_union
except ImportError as exc:  # pragma: no cover - covered through CLI smoke behavior
    print(
        "scaffold_ai_submission.py requires review dependencies. Install with: "
        "python3 -m pip install -r requirements-review.txt",
        file=sys.stderr,
    )
    raise SystemExit(2) from exc

from render_proposal_html import render_html
from source_registry_utils import load_source_registry, source_registry_bullets_zh, summarize_source_registry


PROJECT_ID = "centennial-jingzhang-ai-belt"
SITE_PACKAGE_VERSION = "0.1.0"
STAGES = {"formal"}
DEFAULT_TRACKS = ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
DEFAULT_SCENARIOS = ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
TRUSTED_BOUNDARY_SOURCE_TYPES = {"official_public", "official_open_data", "user_provided_cleared"}
PROVISIONAL_BOUNDARY_SOURCE_TYPES = {"agent_inferred_from_public_data", "osm", "user_provided_cleared"}
TRANSFORMER = Transformer.from_crs("EPSG:4326", "EPSG:4548", always_xy=True)
PARTITION_FRACTIONS = (0.28, 0.48, 0.74)


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, content: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(content, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9-]+", "-", value.lower()).strip("-")
    slug = re.sub(r"-{2,}", "-", slug)
    return slug if len(slug) >= 3 else "ai-submission"


def projected_area(geom: Any) -> float:
    return float(transform(TRANSFORMER.transform, geom).area)


def round_geometry(value: Any) -> Any:
    if isinstance(value, float):
        return value
    if isinstance(value, (list, tuple)):
        return [round_geometry(item) for item in value]
    if isinstance(value, dict):
        return {key: round_geometry(item) for key, item in value.items()}
    return value


def polygonal(geom: Any) -> Any:
    if geom.is_empty:
        return geom
    if geom.geom_type in {"Polygon", "MultiPolygon"}:
        return geom
    polygons = [part for part in getattr(geom, "geoms", []) if part.geom_type in {"Polygon", "MultiPolygon"}]
    return unary_union(polygons) if polygons else geom


def feature(feature_id: str, layer: str, geom: Any, **properties: Any) -> dict[str, Any]:
    props = {
        "id": feature_id,
        "layer": layer,
        "source_type": "agent_generated_design",
        "confidence": "medium",
        "geometry_role": "design_proposal",
    }
    props.update(properties)
    if geom.geom_type in {"Polygon", "MultiPolygon"}:
        props.setdefault("area_sqm_declared", round(projected_area(geom), 3))
    return {
        "type": "Feature",
        "id": feature_id,
        "properties": props,
        "geometry": round_geometry(mapping(geom)),
    }


def collection(name: str, features: list[dict[str, Any]]) -> dict[str, Any]:
    return {"type": "FeatureCollection", "name": name, "features": features}


def is_trusted_boundary_feature(feature_data: dict[str, Any]) -> bool:
    props = feature_data.get("properties") or {}
    return (
        props.get("official_boundary") is True
        and props.get("geometry_role") == "official_constraint"
        and props.get("source_type") in TRUSTED_BOUNDARY_SOURCE_TYPES
        and props.get("confidence") not in {"low", "unknown", None, ""}
    )


def is_provisional_boundary_feature(feature_data: dict[str, Any]) -> bool:
    props = feature_data.get("properties") or {}
    return (
        props.get("official_boundary") is False
        and props.get("geometry_role") == "provisional_constraint"
        and props.get("source_type") in PROVISIONAL_BOUNDARY_SOURCE_TYPES
        and props.get("confidence") not in {"unknown", None, ""}
    )


def find_boundary(repo_root: Path) -> tuple[dict[str, Any], str, str] | None:
    geometry_dir = repo_root / "brief" / "site-package" / "geometry"
    provisional: tuple[dict[str, Any], str, str] | None = None
    for path in sorted(geometry_dir.glob("*.geojson")):
        data = load_json(path)
        for item in data.get("features", []):
            props = item.get("properties") if isinstance(item, dict) else {}
            if isinstance(item, dict) and is_trusted_boundary_feature(item) and props.get("layer") == "SITE_BOUNDARY":
                return item, path.relative_to(repo_root).as_posix(), "official"
            if (
                provisional is None
                and isinstance(item, dict)
                and is_provisional_boundary_feature(item)
                and props.get("layer") == "SITE_BOUNDARY"
            ):
                provisional = item, path.relative_to(repo_root).as_posix(), "provisional"
    return provisional


def find_key_areas(repo_root: Path, boundary_mode: str) -> tuple[list[dict[str, Any]], str, str] | None:
    required = {
        "zhongzhiyuan_ai_acceleration_area",
        "beijing_ai_origin_community",
        "dazhongsi_ai_industry_cluster",
    }
    geometry_dir = repo_root / "brief" / "site-package" / "geometry"
    provisional_result: tuple[list[dict[str, Any]], str, str] | None = None
    for path in sorted(geometry_dir.glob("*.geojson")):
        data = load_json(path)
        official_features = []
        official_seen = set()
        provisional_features = []
        provisional_seen = set()
        for item in data.get("features", []):
            if not isinstance(item, dict):
                continue
            props = item.get("properties") or {}
            if props.get("layer") != "KEY_AREA":
                continue
            area_id = props.get("area_id")
            if area_id not in required:
                continue
            if is_trusted_boundary_feature(item):
                official_features.append(item)
                official_seen.add(area_id)
            elif is_provisional_boundary_feature(item):
                provisional_features.append(item)
                provisional_seen.add(area_id)
        if required.issubset(official_seen):
            return official_features, path.relative_to(repo_root).as_posix(), "official"
        if provisional_result is None and required.issubset(provisional_seen):
            provisional_result = provisional_features, path.relative_to(repo_root).as_posix(), "provisional"
    if boundary_mode == "provisional":
        return provisional_result
    return None


def load_boundary(repo_root: Path, stage: str) -> tuple[dict[str, Any], str, str]:
    boundary = find_boundary(repo_root)
    if boundary is None:
        raise SystemExit(
            "formal scaffold requires a trusted official or explicit provisional SITE_BOUNDARY in "
            "brief/site-package/geometry; do not generate from unmarked bbox, news images, OSM, or text-only bounds"
        )
    return boundary


def land_use_features(site_geom: Any) -> list[dict[str, Any]]:
    minx, miny, maxx, maxy = site_geom.bounds
    cuts = [
        (minx, minx + (maxx - minx) * PARTITION_FRACTIONS[0], "0802", "AI研发创新用地"),
        (minx + (maxx - minx) * PARTITION_FRACTIONS[0], minx + (maxx - minx) * PARTITION_FRACTIONS[1], "1401", "公园绿地与开敞空间"),
        (minx + (maxx - minx) * PARTITION_FRACTIONS[1], minx + (maxx - minx) * PARTITION_FRACTIONS[2], "05", "产业服务与商业服务用地"),
    ]
    generated = []
    features = []
    for index, (left, right, code, name_zh) in enumerate(cuts, start=1):
        geom = polygonal(site_geom.intersection(box(left, miny, right, maxy)))
        if geom.is_empty:
            continue
        generated.append(geom)
        features.append(
            feature(
                f"LU-{index:03d}",
                "LAND_USE",
                geom,
                land_use_code=code,
                name_zh=name_zh,
            )
        )
    remainder = polygonal(site_geom.difference(unary_union(generated)))
    if not remainder.is_empty:
        features.append(
            feature(
                f"LU-{len(features) + 1:03d}",
                "LAND_USE",
                remainder,
                land_use_code="0702",
                name_zh="社区服务与配套用地",
            )
        )
    return features


def densify_bbox_for_partition(site_geom: Any) -> Any:
    minx, miny, maxx, maxy = site_geom.bounds
    xs = [minx, *(minx + (maxx - minx) * fraction for fraction in PARTITION_FRACTIONS), maxx]
    coords = [(x, miny) for x in xs] + [(x, maxy) for x in reversed(xs)] + [(minx, miny)]
    return Polygon(coords)


def derived_polygon(site_geom: Any, left: float, bottom: float, right: float, top: float) -> Any:
    minx, miny, maxx, maxy = site_geom.bounds
    geom = site_geom.intersection(
        box(
            minx + (maxx - minx) * left,
            miny + (maxy - miny) * bottom,
            minx + (maxx - minx) * right,
            miny + (maxy - miny) * top,
        )
    )
    return polygonal(geom)


def line_inside_site(site_geom: Any) -> Any:
    minx, miny, maxx, maxy = site_geom.bounds
    line = LineString(
        [
            (minx + (maxx - minx) * 0.08, miny + (maxy - miny) * 0.52),
            (minx + (maxx - minx) * 0.92, miny + (maxy - miny) * 0.52),
        ]
    )
    clipped = line.intersection(site_geom)
    return clipped if not clipped.is_empty else line


def make_metrics(site_geom: Any, green_geom: Any, public_geom: Any, building_geom: Any) -> dict[str, Any]:
    site_area = projected_area(site_geom)
    green_area = projected_area(green_geom)
    public_area = projected_area(public_geom)
    building_area = projected_area(building_geom)
    return {
        "schema_version": "0.1.0",
        "units": {"length": "m", "area": "sqm"},
        "metrics": {
            "site_area_sqm": {
                "status": "known",
                "value": round(site_area, 3),
                "unit": "sqm",
                "source_files": ["geometry/site_boundary.geojson"],
                "formula": "polygon_area(submitted_site_boundary)",
                "confidence": "high",
                "assumptions": ["Trusted official boundary is present in the site package."],
            },
            "building_footprint_area_sqm": {
                "status": "known",
                "value": round(building_area, 3),
                "unit": "sqm",
                "source_files": ["geometry/buildings.geojson"],
                "formula": "sum(polygon_area(building_footprints))",
                "confidence": "medium",
                "assumptions": [],
            },
            "green_ratio": {
                "status": "known",
                "value": round(green_area / site_area, 6),
                "unit": "ratio",
                "source_files": ["geometry/green_space.geojson", "geometry/site_boundary.geojson"],
                "formula": "green_space_area_sqm / site_area_sqm",
                "confidence": "medium",
                "assumptions": [],
            },
            "public_space_ratio": {
                "status": "known",
                "value": round(public_area / site_area, 6),
                "unit": "ratio",
                "source_files": ["geometry/public_space.geojson", "geometry/site_boundary.geojson"],
                "formula": "public_space_area_sqm / site_area_sqm",
                "confidence": "medium",
                "assumptions": [],
            },
            "floor_area_ratio": {
                "status": "unknown",
                "value": None,
                "unit": "ratio",
                "source_files": ["brief/site-package/ranges/planning_limits.json"],
                "formula": "total_floor_area_sqm / official_site_area_sqm",
                "confidence": "unknown",
                "assumptions": [],
                "reason": "Approved FAR controls and official site boundary are not present in the public site package.",
            },
            "key_area_count": {
                "status": "known",
                "value": 3,
                "unit": "count",
                "source_files": ["geometry/key_areas.geojson"],
                "formula": "count(key_detailed_design_areas)",
                "confidence": "high",
                "assumptions": [],
            },
        },
    }


def make_proposal(
    title: str,
    author: str,
    stage: str,
    boundary_mode: str,
    key_area_mode: str,
    source_registry_summary: dict[str, Any],
) -> str:
    if boundary_mode == "official" and key_area_mode == "official":
        basis_phrase = "经维护者确认的官方边界、重点区域、枚举、指标和来源清单"
        summary_phrase = "基于官方边界和结构化自检要求生成的 formal AI 城市设计方案包，覆盖公告 1.3、1.4、1.5 与 agent_taskbook 的必选设计任务。"
        boundary_note = "本脚手架在可信官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 已进入 site package 后生成。提交包中的 `geometry/site_boundary.geojson` 是正式审查的空间裁剪边界，`geometry/key_areas.geojson` 对应众智园AI自主创新加速区、北京AI原点社区和大钟寺AI产业聚集区。所有后续图层均在该边界内派生，面积使用 EPSG:4548 投影复算。若 agent 缺少正式控规、道路红线、文物控制线、权属和市政资料，必须在 `assumptions.json` 中标注为待补资料，不得用新闻图、OSM、文字四至或 bbox 替代。"
        boundary_workflow = "agent 生成方案时必须先锁定官方边界和约束，再生成用地、建筑、道路、绿地、公共空间、分期和AI服务节点，最后从这些图层复算指标。"
    else:
        basis_phrase = "经维护者登记的临时粗略边界、重点区域、枚举、指标和来源清单"
        summary_phrase = "基于 provisional boundary 和结构化自检要求生成的 formal AI 城市设计方案包；保留精度警示和复算要求，但组织方数据缺口不阻断内容评分。"
        boundary_note = "本脚手架在官方 `SITE_BOUNDARY` 或三处 `KEY_AREA` 尚未取得时，使用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成临时 formal 包。提交包中的 `geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均必须标注为 `provisional_constraint`、`official_boundary=false`，只能用于方案生成、自检、可视化和设计讨论，不能作为 official redline、审批依据、精确面积依据或法定控制结论。该组织方数据缺口本身不阻断内容评分；替换 official polygons 后，site boundary、key areas、land use、roads、green space、public space、buildings、phasing 和 metrics 均需重算。"
        boundary_workflow = "agent 生成方案时必须先锁定当前提交采用的 official 或 provisional 边界和约束，再生成用地、建筑、道路、绿地、公共空间、分期和AI服务节点，最后从这些图层复算指标并在正文解释哪些结论仍受 provisional boundary 限制。"
    key_ref_1 = "KEY-001" if key_area_mode == "official" else "PROV-KEY-001"
    key_ref_2 = "KEY-002" if key_area_mode == "official" else "PROV-KEY-002"
    key_ref_3 = "KEY-003" if key_area_mode == "official" else "PROV-KEY-003"
    registry_lines = "\n".join(f"- {line}" for line in source_registry_bullets_zh(source_registry_summary))
    boundary_readiness_zh = "官方边界就绪" if boundary_mode == "official" and key_area_mode == "official" else "临时边界，保留精度警示并待正式数据发布后复算；不阻断内容评分"
    key_area_table = f"""| 重点片区 | 设计定位 | 空间动作 | AI产业与运营场景 | 证据引用 |
| --- | --- | --- | --- | --- |
| 众智园AI自主创新加速区 | 花园型全栈自主创新街区 | 强化清河界面、产业展示、低碳创新交往和对外交通组织；以绿色空间承载开放测试与标准治理展示 | 自主模型测试、标准制定工作坊、安全治理展示、低碳算力体验 | [data:geometry/key_areas.geojson#{key_ref_1}]、[depth:three_key_area_detailed_design] |
| 北京AI原点社区 | 近校型成果转化与人才社区 | 组织校区、园区、街区慢行缝合；补足成果发布、人才服务、居住生活和开源协作空间 | 开源社区、成果发布、人才特区服务、近校孵化 | [data:geometry/key_areas.geojson#{key_ref_2}]、[source:AGENT-TASKBOOK] |
| 大钟寺AI产业聚集区 | 城市型智能经济与国际交往街区 | 围绕大钟寺站一体化、四象限步行连通、商业服务和重点企业公共环境更新 | 智能体与智能终端展示、内容消费、数据要素与国际路演 | [data:geometry/key_areas.geojson#{key_ref_3}]、[metric:key_area_count] |"""
    persona_table = """| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 原点社区开源发布厅、公共代码墙、夜间协作空间 | 不采集个人行为轨迹；活动数据只做聚合统计 |
| 初创团队 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力服务点、标准治理咨询 | 算力和数据服务需另行授权 |
| 头部企业访客 | 展示、商务、国际接待、人才招聘 | 大钟寺国际路演客厅、轨道站点接驳、重点企业周边公共空间 | 企业标识和案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 京张遗址公园慢行环、社区服务嵌入、夜间照明和活动分级 | 不将居民画像用于商业推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 校区-园区慢行缝合、成果转化驿站、AI教育体验点 | 校园数据和科研成果需授权 |"""
    scenario_table = """| 场景卡 | 空间载体 | 设计说明 |
| --- | --- | --- |
| 01 开源发布厅 | 北京AI原点社区 | 面向高校、开源社区和初创团队，提供成果发布、代码贡献展示和小型路演空间 |
| 02 安全治理沙盒 | 众智园 | 将标准制定、安全评测、模型红队测试转译为可参观、可预约、可监管的展示和协作节点 |
| 03 端侧算力驿站 | 总体设计范围节点 | 与公共服务、企业服务和低碳能源策略结合，作为待深化的新型基础设施原型 |
| 04 AI慢行导航 | 京张遗址公园活力带 | 用可解释导视和低侵入传感帮助识别慢行断点、拥挤节点和无障碍需求 |
| 05 大钟寺国际路演客厅 | 大钟寺AI产业聚集区 | 服务智能体、智能终端和内容消费企业的展示、洽谈、媒体发布和国际交流 |
| 06 清河低碳创新廊 | 众智园临清河界面 | 把绿色空间、雨洪、步行骑行和AI展示结合，作为园区公共客厅 |
| 07 近校成果转化街 | 北京AI原点社区 | 面向高校成果转化，组织孵化、展示、法务、知识产权和投融资服务 |
| 08 数据要素会客厅 | 大钟寺片区 | 以合规、授权、可审计为前提，展示数据要素和数字资产流通的城市服务界面 |
| 09 AI生活服务样板街 | 社区与商业交汇处 | 将医疗、教育、法律、生活服务等AI+场景落到可运营的小尺度街区空间 |
| 10 全球AI活动周路线 | 一带公共空间系统 | 形成从遗址文化、开源社区、产业展示到国际路演的可步行、可传播体验路线 |"""
    project_table = """| 项目编号 | 项目名称 | 类型 | 主要依赖 | 证据引用 |
| --- | --- | --- | --- | --- |
| JZ-01 | 京张遗址公园慢行断点缝合 | 公共空间/交通 | 道路红线、桥下空间、交通组织复核 | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | 众智园清河创新界面 | 蓝绿空间/产业展示 | 河道蓝线、生态和防洪条件 | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | 原点社区近校成果转化街 | 城市更新/产业服务 | 校区边界、权属、首层业态 | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 轨道站点、道路交叉口、市政管线 | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI公共服务与端侧算力节点 | 新基建/公共服务 | 能源、算力、安全和运营主体 | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | 全球AI活动周公共路线 | 运营/品牌 | 公共空间许可、活动安全、版权清权 | [data:geometry/phasing.geojson#PHASE-001] |"""
    return f"""---
title: "{title}"
author_github: "{author}"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "{summary_phrase}"
tracks: {json.dumps(DEFAULT_TRACKS, ensure_ascii=False)}
scenarios: {json.dumps(DEFAULT_SCENARIOS, ensure_ascii=False)}
---

<!-- SCAFFOLD-DRAFT: replace the generated design content, figures, geometry, and drawings; then set manifest.package_state to ready_for_review. -->

# {title}

## 设计依据与资料清单

本 formal 方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，并以 `brief/site-package/` 中{basis_phrase}为机器可读依据。AI agent 在生成方案前必须读取 `design_brief.json`、`allowed_design_space.json`、`sources.json`、`enums/`、`ranges/`、`schemas/`、`data/source_registry.json` 和 `data/processed/agent_fact_pack.md`，并用 `project_scope_summary.csv`、`agent_task_requirements.csv`、`source_use_matrix.csv`、`missing_data_checklist.csv` 建立任务、范围、资料用途和缺口清单。所有设计判断都要拆分为可追溯来源、可复算指标、可校验图层和可人工复核假设。公告要求方案达到控制性详细规划的城市设计深度和规划综合实施方案的城市设计深度，因此文本叙述不能替代 GeoJSON、指标表、A3 文册、A0 展板和 HTML 电子展示成果。

方案不是独立愿景文本，而是从公告、面向智能体任务书和场地资料出发组织成果；本节只把最关键依据放在判断旁边 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]。完整来源和标准覆盖分别保存在 `sources.json`、`standard_matrix.json` 与 `design_depth_matrix.json`，不在正文重复机器索引。

资料登记表的使用边界如下 [source:SOURCE-REGISTRY]：

{registry_lines}

`data/processed/agent_fact_pack.md` 是本方案的阅读导航层，不是新的权威来源 [source:PROCESSED-FACT-PACK]。它帮助 agent 把三层范围、三处重点区、公告任务、agent.1-agent.6、资料可用性和缺资料事项组织成可读方案；事实判断仍需回到已登记的原始材料 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]，完整来源关系由 `sources.json` 保存。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

{boundary_note}

本次脚手架生成的可评分状态为：**{boundary_readiness_zh}**。因此，正文中的空间结构、场景、项目和指标均按“可讨论、可复核、可替换官方边界后重算”的原则写入；当官方边界和重点区 polygon 更新后，agent 必须重新运行脚手架、自检和图纸/HTML生成，不能只替换单个文件。

边界解释可回到总体范围图层和面积复算 [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]。三处重点区则由独立图层和数量指标核对 [data:geometry/key_areas.geojson#{key_ref_1}] [metric:key_area_count]。这意味着读者可以从正文进入证据，但不必先读一串机器编号。

## 三层范围工作框架

方案按照公告确定的三个层次组织工作：统筹研究范围关注 43.6 平方公里的AI产业生态、战略定位、创新链和未来城市形态；总体设计范围关注 11.4 平方公里京张遗址公园周边 1-2 公里城市地区和产业区，要求形成城市更新总体框架、产业空间布局、交通市政支撑和城市风貌控制；重点区域范围关注 368.4 公顷三处详细设计地区，要求明确功能业态、建筑规模、拆改留分类、公共空间连通和交通组织。三层范围在 `compliance_matrix.json` 中逐条映射，保证公告 1.3、1.4、1.5 与 agent.1-agent.6 的必选任务都有章节、图层、指标、图纸和 HTML 证据。

三层工作框架的深度项由 [depth:three_level_scope_framework] 和 [depth:overall_spatial_structure] 约束，空间证据以 [data:geometry/site_boundary.geojson#SITE-001] 与 [data:geometry/key_areas.geojson#{key_ref_1}] 为准，任务依据以 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 为准，范围索引以 [source:PROCESSED-FACT-PACK] 中 `project_scope_summary.csv` 的三层范围表为导航。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

三层工作不是互相割裂的图纸集合。统筹研究决定产业链和城市形态判断，总体设计把判断落实到更新项目、空间结构和设施承载，重点区域详细设计验证具体地块、建筑、交通、公共空间和AI应用场景的可实施性。{boundary_workflow}任何无法从结构化数据复算的面积、比例、规模或项目数量，不得写入正式结论。

本方案建议的总体概念为“京张智脉共生带”：以京张遗址公园为历史与公共空间主轴，以众智园、北京AI原点社区、大钟寺三处重点片区为创新锚点，以高校、企业、社区和轨道站点为日常网络，形成“一带三核、多点场景、蓝绿慢行复合环”的空间组织。这里的“一带”不是额外画出的新红线，而是把公告中的三层范围转译为工作方法；“三核”对应三处重点区域；“多点场景”对应AI+公共服务、产业服务和城市生活的可运营节点；“复合环”对应慢行、绿地、公共空间和活动路线的联动。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI产业生态和未来城市形态如何组织 | 建立“高校策源-开源协作-企业转化-公共体验-国际传播”的创新链 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 产业空间、城市更新、交通市政和风貌如何落图 | 用地、建筑、道路、绿地、公共空间和分期图层共同表达 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出定位、空间动作、AI场景和实施依赖 | [data:geometry/key_areas.geojson#{key_ref_1}]、[data:geometry/key_areas.geojson#{key_ref_2}]、[data:geometry/key_areas.geojson#{key_ref_3}] |

## 统筹研究范围产业与未来城市研究

统筹研究范围的核心任务是构建世界级 AI 创新生态体系。方案应梳理海淀高校院所、头部企业、算力算法数据要素、孵化平台、上市企业、独角兽和科技服务资源，提出AI创新链、产业链、人才链和城市服务链的空间协同框架。命名方案和 logo 设计应服务于“百年京张文化带、都市AI生活体验带、AI融合创新带”的整体辨识度，不能只停留在口号，应说明与产业生态、公共空间和文化资源的关联。面向智能体任务书还要求回应“五大功能”和“三区两翼”协同，形成可继续深化的命名系统、视觉识别、总体空间结构图、场景开放和运营机制；本节必须用 [source:AGENT-TASKBOOK] 与 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 标注这些要求来自 agent 开源征集任务，而不是法定规划控制。

统筹研究并不新增伪精确红线；它通过 [standard:MOHURD-URBAN-DESIGN-MEASURES] 要求的城市风貌、公共空间和建筑布局统筹，回接 [data:geometry/land_use.geojson#LU-001]、[data:geometry/public_space.geojson#PUBLIC-001] 与 [depth:overall_spatial_structure]，说明产业策略最终要落到可见、可复核的空间结构。

未来城市形态研究应回答人工智能如何改变工作、生活、社交、学习、交通和公共服务。方案应把AI交通系统、连续绿色空间、创新服务设施和国际化生活工作氛围落实为可定位的功能区、节点、廊道和场景，而不是泛泛描述技术愿景。agent 应把产业战略指标、AI创新指数、人才密度、空间供给类型和AI+垂直应用重点区域写入指标体系，并标明哪些是官方、哪些是设计建议、哪些仍待正式数据校准。若提出全球AI创新活动、开发者社区、开放场景或朝圣路线，应写为“概念建议/参考方案/可供专业团队深化研究”，不得写成已经确定的政府活动或实施安排。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围要求达到控制性详细规划的城市设计深度。方案必须提出城市更新总体空间结构、低效空间识别、更新项目清单、实施政策建议、产业功能比例、空间组织模式、建筑总规模和综合承载能力评估。`geometry/land_use.geojson` 应完整覆盖设计边界且无重叠，`geometry/buildings.geojson` 应表达更新建筑基底或保留建筑基底，`geometry/roads.geojson` 应表达微循环、慢行和轨道接驳关系，`metrics.json` 应复算核心面积、比例和图层数量。

本节按照 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 把控规深度内容拆成可审查对象：[data:geometry/land_use.geojson#LU-001] 表达用地结构，[data:geometry/buildings.geojson#BLDG-001] 表达建筑基底，[data:geometry/roads.geojson#ROAD-001] 表达交通组织，[metric:building_footprint_area_sqm] 用于复核建筑基底面积，[depth:land_use_layout] 与 [depth:development_intensity_controls] 约束成果深度。

总体设计还必须支撑交通、轨道、市政和配套设施。方案应围绕轨道站点一体化、道路微循环、非机动车停放、停车供给、创新服务平台、人才生活服务、新型基础设施、分布式能源和端侧算力提出空间布局和实施路径。涉及建筑高度、开发强度、道路红线、退线和设施标准的内容，若尚无官方控制条件，应写为“待正式控规条件确认”，不得以 agent 推测值冒充审定指标。

## 重点区域详细设计

重点区域详细设计是必选项。众智园AI自主创新加速区应围绕国家人工智能平台、全栈自主创新、标准制定、安全治理、产业展示、对外交通、清河文化、低碳绿色创新交往环境和绿色空间AI场景提出详细方案。北京AI原点社区应围绕近校创新、成果孵化转化、人才特区、开源体系、品牌活动、建筑拆改留、成果展示发布、居住生活配套、校区园区慢行联系和轨道站点一体化提出详细方案。大钟寺AI产业聚集区应围绕领军企业、智能体、智能终端、内容消费、数据要素、数字资产、商业服务、规划绿地复合利用、大钟寺站一体化和路口四象限步行连通提出详细方案。

三处重点区域详细设计必须引用 [data:geometry/key_areas.geojson#{key_ref_1}]、[data:geometry/key_areas.geojson#{key_ref_2}]、[data:geometry/key_areas.geojson#{key_ref_3}]，并由 [depth:three_key_area_detailed_design] 检查是否达到规划综合实施方案深度。若只描述“打造示范区”而没有功能、建筑、交通、公共空间和实施项目证据，应被视为未完成。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

三处重点区域必须在 `geometry/key_areas.geojson` 中出现。若仓库已提供 official polygons，应作为 `official_constraint` 使用；若 official polygons 缺失，可暂用 `provisional_constraint`，但正文、HTML、sources、assumptions 和 self_check 必须说明它不能作为正式评分或审批依据。`compliance_matrix.json` 应分别覆盖公告 1.5.3.1、1.5.3.2、1.5.3.3。设计表达应包含功能业态、建筑规模、建筑形态、拆改留分类、公共空间系统、交通组织、慢行连通和实施项目。HTML 页面应能切换查看三处重点区域，A3 文册和 A0 展板应至少包含重点片区总图、局部详图和指标说明。

{key_area_table}

## AI 创新生态、人才画像与 AI+ 场景

方案应建立面向AI人才和企业的空间需求画像，覆盖研发办公、开源协作、成果发布、企业服务、人才居住、社交学习、消费生活、运动休闲和国际交往。AI+场景应围绕公告提出的交通、服务、消费、医疗、教育、法律、生活服务等方向，形成产业发展场景和AI赋能城市功能场景。每个场景应说明服务对象、空间位置、数据来源、隐私边界、人工复核机制和运营主体。

AI 场景必须落到空间和治理边界：公共空间场景引用 [data:geometry/public_space.geojson#PUBLIC-001]，慢行与交通场景引用 [data:geometry/roads.geojson#ROAD-001]，开放空间场景引用 [data:geometry/green_space.geojson#GREEN-001] 和 [metric:public_space_ratio]、[metric:green_ratio]。这些引用让评审者知道场景不是口号，而是位于具体图层和指标中的设计对象。面向智能体任务书要求不少于10张AI场景卡、不少于3个产业测试验证场景和不少于5类用户画像；脚手架只给出结构，正式参赛者必须把场景卡、画像表、隐私边界、人工复核和运营主体写入正文、HTML、A3/A0 和合规矩阵。

{persona_table}

{scenario_table}

agent 生成的AI治理建议必须遵守数据最小化、公开来源、可解释和人工复核原则。城市智能体可以辅助识别慢行断点、公共空间热力、设施维护、企业服务需求和活动安全风险，但不能替代规划审批、不能输出未经授权的个人画像、不能声称获得官方实施承诺。所有AI场景节点应进入结构化图层或合规矩阵，便于评审者看到它们与产业、空间和公共利益之间的关系。

## 用地、建筑规模与拆改留方案

用地方案应依据国土空间调查、规划、用途管制分类等公开标准表达，形成完整、闭合、无缝的用地分区。建筑方案应区分保留、改造、更新、新建或待确认对象，明确建筑基底、功能、规模、风貌、屋顶、体量和高度控制的建议层级。若缺少现状建筑、权属、控规和工程条件，方案只能提出方法和待校准清单，不能编造拆改留结论。

用地分类依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，建筑高度、体量、界面和风貌控制由 [depth:height_massing_character] 管理，拆改留方法由 [depth:retain_renovate_demolish] 管理。用地和建筑的主要证据是 [data:geometry/land_use.geojson#LU-001]、[data:geometry/buildings.geojson#BLDG-001] 和 [metric:building_footprint_area_sqm]。

建筑规模和强度指标必须与 `metrics.json` 和图层一致。若总建筑规模、容积率、建筑高度、建筑密度、绿地率、退线和建筑控制线缺少官方条件，应统一使用 `status=unknown`，并在 `reason` / `assumptions` 中说明待补条件、当前假设和正式数据到位后的复算路径，不得用固定数值制造精确感。A3 文册应给出更新项目清单和指标复核表，A0 展板应把关键空间结构和重点片区表达清楚，HTML 页面应提供指标和图层联动查看。

## 交通、轨道、市政与公共服务设施

交通方案应回应公告对轨道站点一体化、道路微循环、慢行断点、对外交通、停车、非机动车停放和绿色交通系统的要求。重点应覆盖北五环、京张遗址公园跨环路节点、五道口、清华东路西口、大钟寺站及重点企业周边交通联系。道路和慢行图层应保持在提交边界内，并与公共空间、绿地、产业节点和重点片区相互校核；若提交边界为 provisional，交通结论也只能作为临时设计讨论。

交通和市政专业深度分别由 [depth:traffic_rail_slow_parking] 与 [depth:municipal_new_infrastructure] 约束；图层证据引用 [data:geometry/roads.geojson#ROAD-001]、[data:geometry/public_space.geojson#PUBLIC-001] 和 [data:geometry/constraints.geojson#CONSTRAINTS]。当道路红线、管线、消防和市政条件缺失时，应通过 assumptions 说明待补，而不是把策略写成审定条件。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

市政和公共服务设施应覆盖AI产业服务设施、创新服务平台、人才生活服务设施、新型基础设施、分布式能源、端侧算力和传统市政设施融合。方案应说明设施标准、空间布局、服务半径、运营模式和分期实施逻辑。缺少管线、能源、排水、防洪、消防等工程资料时，应列为正式深化前置条件。

## 蓝绿空间、公共空间与城市风貌

蓝绿空间方案应以京张遗址公园活力带为骨架，统筹清河、小月河、周边高校、企业、社区出行需求，提出南北贯通、东西连通的步道、骑行道和绿色空间体系。方案应识别慢行断点、上跨环路节点、公园南端和北端景观节点，提出停车、体育、创新交往、科技测试、应用展示和公共服务复合利用策略。

蓝绿公共空间由设计深度项和绿地、公共空间图层共同校核 [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]。绿地与公共空间比例在正文解释设计意义，完整复算保存在 `metrics.json`；城市风貌、公共空间和建筑控制的统筹则回到专业标准矩阵 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

城市风貌方案应融合京张铁路历史文化、中关村创新文化和AI创新文化，利用清华园火车站、北影等文化资源，提出城市基调、建筑风貌、屋顶形态、体量、界面和公共艺术引导。agent 还应提出导视标识、文化符号、国际传播叙事、AI朝圣地标、贡献墙或荣誉展示体系，但所有品牌、字体、图像、肖像和企业标识都必须有清权来源。风貌控制应分清官方管控、设计建议和待确认条件，严禁在没有文保或控规依据时给出伪精确控制线。

## 更新项目清单、实施政策与分期计划

实施方案应形成可审查的更新项目清单，说明项目位置、类型、功能、责任主体、依赖条件、实施阶段、风险和评估指标。政策建议应覆盖城市更新统筹实施、空间供给、运营机制、产业服务、公共参与、数据治理和产权协同。`geometry/phasing.geojson` 应表达分期范围，`compliance_matrix.json` 应把每个任务与分期和图纸挂接。

项目清单和分期深度由 [depth:renewal_project_list] 与 [depth:phasing_implementation] 管理，分期空间证据为 [data:geometry/phasing.geojson#PHASE-001]。如果没有权属、资金、实施主体和审批路径，方案必须把它写成实施风险，而不是承诺落地。

{project_table}

分期应与 100 天征集设计周期形成区分：征集周期是提交成果的时间要求，实施分期是城市更新和项目建设的推进路径。方案应提出近期试点、中期更新和长期治理框架，并标明哪些内容可先以轻量设施、运营活动和服务平台启动，哪些必须等待正式控规、市政、交通和权属条件确认。对于年度活动体系、开发者社区运营、场景开放日、公共体验路线和国际传播机制，正文应说明运营对象、频率、责任边界、转化路径和风险，不得只写宣传口号。

## 指标体系、面积复算与合规矩阵

指标体系至少应包含总体设计范围面积、重点区域面积、绿地与公共空间比例、建筑基底、更新项目数量、AI场景节点、慢行连通指标、产业空间指标、人才服务指标和自检状态。所有 known 指标必须能从 GeoJSON 或可信来源复算；unknown 指标必须给出原因和正式提交前置条件。`scripts/spatial_review.py` 和 `scripts/visual_review.py` 的结果是 formal 自检的重要证据。

指标复算遵循统一的设计深度要求 [depth:metrics_recalculation]。正文重点解释指标的设计含义，例如总体范围如何约束空间分配、蓝绿和公共空间比例如何支撑日常交往；完整数值、公式、来源文件和置信度保存在 `metrics.json`。示例关键指标可由总体范围和绿地数据复核 [metric:site_area_sqm] [data:geometry/green_space.geojson#GREEN-001]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

合规矩阵是任务响应性的主控文件。每条公告任务和 agent_taskbook 任务必须对应到报告章节、图层、指标、图纸、HTML 页面、来源、假设和自检项。未能覆盖公告 1.3、1.4、1.5 或 agent.1-agent.6 的任一必选任务，方案不得进入 formal professional scoring。

正式深化时，agent 还应把每个指标分为三类：第一类是可由提交几何直接复算的空间指标，例如边界面积、绿地比例、公共空间比例、建筑基底面积和分期面积；第二类是需要官方控规或任务书附件支撑的管控指标，例如容积率、建筑高度、建筑密度、退线、道路红线和设施标准；第三类是需要运营或产业数据持续校准的绩效指标，例如 AI 创新指数、人才密度、产业服务满意度、慢行可达性、活动参与度和场景使用频次。三类指标应分别进入 `metrics.json`、`assumptions.json` 和 `compliance_matrix.json`，避免把运营愿景误写成审定规划条件。

## 风险、版权与合规说明

**要求双语言。** 方案主文件可使用中文或英文，但必须通过 `proposal.en.md` 或 `proposal.zh.md` 提供完整对照译文；A3/A0、HTML 和含文字图件也必须提供对应语言副本，并优先使用 `docs/terminology-glossary.md` 的赛事推荐译法。v2 包缺少任一必需译稿、语言映射或有效文件时，finalize 与 CI 会阻断提交。所有图片、图纸、图标、数据和代码资产必须在 `sources.json` 或 `report/copyright_statement.md` 中说明来源、许可和授权状态。HTML 页面不得加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API，不得跟踪评审者行为。

风险和缺资料清单由风险深度项、约束图层和场地包共同校核 [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS] [source:SITE-PACKAGE]。`missing_data_checklist.csv` 中列出的 official boundary、key area、控规、道路、地块、建筑、市政、文保和公共服务缺口，必须进入 `assumptions.json`、自检和正文风险章节。任何缺少官方控规、道路红线、权属、市政、消防或文保条件的结论，都必须降级为待确认事项；完整专业核对保存在标准矩阵中。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。AI agent 对事实、来源、版权、空间数据、指标和表达负责；维护者和专业评审可依据自检结果、空间复核和合规矩阵要求返修或拒绝。

## 参考资料

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- data/processed/agent_task_requirements.csv
- data/processed/source_use_matrix.csv
- data/processed/missing_data_checklist.csv
- 完整机器索引：见 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json`
- 本节书目入口依据场地包登记，完整出处和许可见结构化来源清单 [source:SITE-PACKAGE]
"""


def make_compliance_matrix() -> dict[str, Any]:
    titles = {
        "1.3.1": "构建世界级AI创新生态体系",
        "1.3.2": "建设适配AI新质生产力的新型城市形态",
        "1.3.3": "打造全球AI创新人才向往的高品质城区",
        "1.4.1": "统筹研究范围",
        "1.4.2": "总体设计范围",
        "1.4.3": "重点区域范围",
        "1.5.1.1": "统筹研究范围：AI创新生态体系",
        "1.5.1.2": "统筹研究范围：适配人工智能的未来城市形态",
        "1.5.2.1": "总体设计范围：产业目标与功能布局",
        "1.5.2.2": "总体设计范围：城市更新总体框架",
        "1.5.2.3": "总体设计范围：交通轨道市政配套设施",
        "1.5.2.4": "总体设计范围：京张遗址公园活力带",
        "1.5.2.5": "总体设计范围：城市风貌",
        "1.5.3.required": "重点区域范围详细设计必选项",
        "1.5.3.1": "众智园AI自主创新加速区",
        "1.5.3.2": "北京AI原点社区",
        "1.5.3.3": "大钟寺AI产业聚集区",
        "agent.1": "一带总体概念与功能统筹方案设计",
        "agent.2": "AI全栈自主创新体系与世界级AI创新生态设计",
        "agent.3": "AI+场景赋能新范式与智能化AI活力城市设计",
        "agent.4": "AI公共空间、智能原生新业态与朝圣地标设计",
        "agent.5": "百年京张文化、中关村文化与AI新文化融合叙事设计",
        "agent.6": "一带全球AI创新活动体系与长期运营设计",
    }
    return {
        "schema_version": "0.1.0",
        "requirements": [
            {
                "requirement_id": requirement_id,
                "title_zh": title,
                "mandatory": True,
                "report_sections": [
                    "三层范围工作框架",
                    "统筹研究范围产业与未来城市研究",
                    "总体设计范围城市更新与控规深度城市设计",
                    "重点区域详细设计",
                ],
                "geojson_layers": [
                    "geometry/site_boundary.geojson",
                    "geometry/key_areas.geojson",
                    "geometry/land_use.geojson",
                    "geometry/roads.geojson",
                    "geometry/green_space.geojson",
                    "geometry/public_space.geojson",
                    "geometry/phasing.geojson",
                ],
                "metrics": ["site_area_sqm", "green_ratio", "public_space_ratio", "key_area_count"],
                "drawings": ["drawings/a3-booklet.pdf", "drawings/a0-boards.pdf"],
                "visual_sections": ["总览地图", "任务覆盖", "核心指标"],
                "source_ids": ["SITE-PACKAGE", "SOURCE-REGISTRY", "PROCESSED-FACT-PACK", "OFFICIAL-ANNOUNCEMENT", "AGENT-TASKBOOK", "BOUNDARY-SOURCE", "KEY-AREA-SOURCE"],
                "assumption_ids": ["A-CONTROLS-001"],
                "self_check_ids": ["BOUNDARY_TRUST", "KEY_AREAS_TRUST", "LAND_USE_TOPOLOGY", "VISUAL_STATIC"],
            }
            for requirement_id, title in titles.items()
        ],
    }


def make_standard_matrix() -> dict[str, Any]:
    entries = [
        (
            "PROJECT-OFFICIAL-ANNOUNCEMENT",
            "公告 1.3、1.4、1.5 对项目目的、三层范围、设计任务和成果深度提出主控要求。",
            "规划统筹",
            True,
            "addressed",
        ),
        (
            "PROJECT-AGENT-OPEN-CALL-TASKBOOK",
            "面向智能体任务书对十条共创原则、三大定位、五大功能、六项智能体任务、表达完整性和统一边界条款提出要求。",
            "AI共创与运营",
            True,
            "addressed",
        ),
        (
            "MOHURD-URBAN-DESIGN-MEASURES",
            "城市设计应落实规划、指导建筑设计、塑造城市特色风貌，并统筹平面和立体空间。",
            "城市设计",
            True,
            "addressed",
        ),
        (
            "MOHURD-CONTROL-DETAILED-PLANNING",
            "控规深度相关结论必须区分已知控制条件、设计建议和待确认事项。",
            "控规实施",
            True,
            "addressed",
        ),
        (
            "MNR-LAND-USE-CLASSIFICATION-GUIDE",
            "用地表达采用可校验用地分类和 land_use_code，不使用自造分类替代。",
            "用地分类",
            True,
            "addressed",
        ),
        (
            "MOHURD-ARCH-DESIGN-DEPTH-2016",
            "建筑专业深度规定待取得官方文件后启用；当前仅作为缺资料清单和深化提醒。",
            "建筑深度",
            False,
            "data_gap",
        ),
    ]
    return {
        "schema_version": "0.1.0",
        "standards": [
            {
                "standard_id": standard_id,
                "requirement_zh": requirement,
                "professional_dimension": dimension,
                "mandatory": mandatory,
                "review_status": status,
                "proposal_sections": [
                    "设计依据与资料清单",
                    "总体设计范围城市更新与控规深度城市设计",
                    "指标体系、面积复算与合规矩阵",
                ],
                "drawing_refs": ["drawings/a3-booklet.pdf", "drawings/a0-boards.pdf"],
                "geometry_refs": [
                    "geometry/site_boundary.geojson",
                    "geometry/key_areas.geojson",
                    "geometry/land_use.geojson",
                    "geometry/buildings.geojson",
                    "geometry/roads.geojson",
                    "geometry/green_space.geojson",
                    "geometry/public_space.geojson",
                    "geometry/phasing.geojson",
                ],
                "metric_refs": [
                    "site_area_sqm",
                    "building_footprint_area_sqm",
                    "green_ratio",
                    "public_space_ratio",
                    "key_area_count",
                ],
                "source_ids": ["SITE-PACKAGE", "SOURCE-REGISTRY", "PROCESSED-FACT-PACK", "OFFICIAL-ANNOUNCEMENT", "AGENT-TASKBOOK", "BOUNDARY-SOURCE", "KEY-AREA-SOURCE"],
                "assumption_ids": ["A-CONTROLS-001"],
                "self_check_ids": ["BOUNDARY_TRUST", "KEY_AREAS_TRUST", "LAND_USE_TOPOLOGY", "VISUAL_STATIC"],
                "evidence_summary_zh": "本条标准响应通过 proposal.md 正文引用、A3/A0 图纸、GeoJSON 图层、metrics.json 指标和自检项共同证明。",
            }
            for standard_id, requirement, dimension, mandatory, status in entries
        ],
    }


def make_design_depth_matrix() -> dict[str, Any]:
    items = [
        ("existing_conditions_diagnosis", "现状诊断图与资料缺口", "规划"),
        ("three_level_scope_framework", "三层范围工作框架", "规划"),
        ("overall_spatial_structure", "总体空间结构", "城市设计"),
        ("land_use_layout", "用地布局", "规划"),
        ("development_intensity_controls", "开发强度或待确认控规条件", "控规"),
        ("height_massing_character", "建筑高度、体量与风貌控制", "建筑"),
        ("retain_renovate_demolish", "建筑拆改留分类", "建筑"),
        ("traffic_rail_slow_parking", "道路、轨道、慢行与停车组织", "交通"),
        ("municipal_new_infrastructure", "市政与新型基础设施策略", "市政"),
        ("blue_green_public_space", "蓝绿系统与公共空间", "景观"),
        ("three_key_area_detailed_design", "三大重点片区详细设计", "城市设计"),
        ("renewal_project_list", "更新项目清单", "实施"),
        ("phasing_implementation", "分期实施计划", "实施"),
        ("metrics_recalculation", "指标复算", "校核"),
        ("risk_missing_data", "风险与缺资料清单", "合规"),
    ]
    return {
        "schema_version": "0.1.0",
        "items": [
            {
                "item_id": item_id,
                "title_zh": title,
                "professional_dimension": dimension,
                "required": True,
                "status": "complete",
                "proposal_sections": [
                    "三层范围工作框架",
                    "总体设计范围城市更新与控规深度城市设计",
                    "重点区域详细设计",
                    "风险、版权与合规说明",
                ],
                "drawing_refs": ["drawings/a3-booklet.pdf", "drawings/a0-boards.pdf"],
                "geometry_refs": [
                    "geometry/site_boundary.geojson",
                    "geometry/key_areas.geojson",
                    "geometry/land_use.geojson",
                    "geometry/buildings.geojson",
                    "geometry/roads.geojson",
                    "geometry/green_space.geojson",
                    "geometry/public_space.geojson",
                    "geometry/constraints.geojson",
                    "geometry/phasing.geojson",
                ],
                "metric_refs": [
                    "site_area_sqm",
                    "building_footprint_area_sqm",
                    "green_ratio",
                    "public_space_ratio",
                    "key_area_count",
                ],
                "source_ids": ["SITE-PACKAGE", "SOURCE-REGISTRY", "PROCESSED-FACT-PACK", "OFFICIAL-ANNOUNCEMENT", "AGENT-TASKBOOK", "BOUNDARY-SOURCE", "KEY-AREA-SOURCE"],
                "assumption_ids": ["A-CONTROLS-001"],
                "self_check_ids": ["BOUNDARY_TRUST", "KEY_AREAS_TRUST", "LAND_USE_TOPOLOGY", "VISUAL_STATIC"],
                "evidence_summary_zh": "本深度项由 proposal.md 的可读解释、图纸成果、结构化图层、指标复算和自检结果共同支撑。",
            }
            for item_id, title, dimension in items
        ],
    }


def make_visual_html(title: str, metrics: dict[str, Any], boundary_mode: str, key_area_mode: str) -> str:
    values = metrics["metrics"]
    site_area = values["site_area_sqm"]["value"]
    green_ratio = values["green_ratio"]["value"]
    public_ratio = values["public_space_ratio"]["value"]
    readiness_text = (
        "official geometry ready for formal professional scoring"
        if boundary_mode == "official" and key_area_mode == "official"
        else "provisional geometry: PASS intake only, replace with official polygons before formal professional scoring"
    )
    readiness_label = "正式评分就绪" if boundary_mode == "official" and key_area_mode == "official" else "临时边界 intake"
    return f"""<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} - visual index</title>
<style>
:root{{--ink:#162033;--muted:#667085;--paper:#ffffff;--soft:#f6f8fb;--line:#d7dee8;--navy:#172235;--gold:#c79838;--ai:#4f46e5;--park:#15803d;--work:#b7791f;--civic:#b42318;--blue:#0f7490;--shadow:0 14px 34px rgba(22,32,51,.09)}}
*{{box-sizing:border-box}}body{{margin:0;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",Arial,sans-serif;background:#eef2f6;color:var(--ink);line-height:1.58}}.wrap{{max-width:1280px;margin:auto}}header{{background:#101827;color:#fff;border-bottom:5px solid var(--gold)}}.hero{{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:28px;padding:34px 26px 28px}}.eyebrow{{color:#9fd7c0;letter-spacing:.18em;text-transform:uppercase;font-size:12px;margin-bottom:12px}}h1{{font-size:34px;line-height:1.18;margin:0 0 12px;letter-spacing:0}}h2{{font-size:22px;margin:0 0 14px}}h3{{font-size:17px;margin:0 0 8px}}p{{margin:0 0 10px}}.hero-copy{{max-width:900px;color:#d8e3ef;font-size:16px}}.status-box{{border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:16px;background:rgba(255,255,255,.06)}}.status-box strong{{display:block;font-size:20px;margin-bottom:8px;color:#fff}}.pill-row{{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}}.pill,.tag{{display:inline-flex;align-items:center;gap:6px;border-radius:999px;border:1px solid rgba(255,255,255,.26);padding:6px 10px;font-size:12px;color:#fff}}main{{padding:22px 22px 34px}}.sheet{{background:var(--paper);border:1px solid var(--line);border-radius:8px;margin:0 auto 18px;box-shadow:var(--shadow);overflow:hidden}}.sheet-head{{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;padding:20px 22px;border-bottom:1px solid #e6ebf2;background:#fbfcfe}}.sheet-head p{{color:var(--muted);max-width:760px}}.map-grid{{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(310px,.65fr);gap:20px;padding:20px 22px}}.map-frame{{border:1px solid #b9c4d3;border-radius:8px;background:#f8fafc;overflow:hidden}}svg{{display:block;width:100%;height:auto}}.legend{{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:12px 0 0}}.legend span{{display:flex;align-items:center;gap:7px;color:#334155;font-size:13px}}.sw{{width:14px;height:14px;border-radius:3px;display:inline-block}}.metric-list{{display:grid;gap:10px}}.metric{{border:1px solid #dfe6ef;border-radius:8px;padding:12px;background:#fbfdff}}.metric span{{display:block;color:#667085;font-size:12px}}.metric strong{{display:block;font-size:22px;font-variant-numeric:tabular-nums;margin-top:4px}}.matrix{{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding:20px 22px}}.area-card,.scenario-card,.risk-card{{border:1px solid #dde5ef;border-radius:8px;padding:15px;background:#fff}}.area-card{{border-top:4px solid var(--ai)}}.area-card:nth-child(2){{border-top-color:var(--park)}}.area-card:nth-child(3){{border-top-color:var(--work)}}.area-card ul,.risk-card ul{{margin:8px 0 0 18px;padding:0;color:#475467}}.scenario-grid{{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;padding:20px 22px}}.scenario-card{{min-height:132px;background:linear-gradient(180deg,#fff,#f8fafc)}}.scenario-card b{{font-size:13px}}.scenario-card p{{font-size:12px;color:#667085;margin-top:7px}}.evidence{{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:20px 22px}}.source-line{{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:#475467;background:#f2f5f8;border-radius:6px;padding:8px;margin-top:8px;overflow-wrap:anywhere}}.tag{{border-color:#cbd5e1;color:#344054;background:#f8fafc;border-radius:4px;margin:3px 4px 0 0}}.warn{{border-left:5px solid var(--gold);background:#fff9eb}}.ok{{border-left:5px solid var(--park);background:#f0fdf4}}@media(max-width:980px){{.hero,.map-grid,.matrix,.evidence{{grid-template-columns:1fr}}.scenario-grid{{grid-template-columns:repeat(2,minmax(0,1fr))}}h1{{font-size:26px}}}}@media(max-width:560px){{main{{padding:14px}}.hero{{padding:24px 18px}}.sheet-head{{display:block}}.scenario-grid{{grid-template-columns:1fr}}.legend{{grid-template-columns:1fr 1fr}}}}
</style>
</head>
<body>
<header><div class="wrap hero"><div><div class="eyebrow">方案可视化总览 / Centennial Jing-Zhang AI Innovation Belt</div><h1>{title}</h1><p class="hero-copy">离线电子展示成果。权威数据仍以 GeoJSON、metrics.json、矩阵和自检结果为准；本页把总览地图、三层范围、重点区域、用地分区、交通慢行、蓝绿公共空间、建筑更新项目、AI 场景、核心指标、任务覆盖、自检状态、来源与假设转成人类可读的视觉说明。</p><div class="pill-row"><span class="pill">三层范围</span><span class="pill">重点区域</span><span class="pill">AI 场景</span><span class="pill">任务覆盖</span><span class="pill">自检状态</span></div></div><aside class="status-box"><strong>{readiness_label}</strong><p>{readiness_text}</p><p>使用 provisional 边界时，本页仅支持 intake 展示、讨论和返修，不作为正式专业评分图纸。</p></aside></div></header>
<main class="wrap">
<section class="sheet"><div class="sheet-head"><div><h2>总览地图</h2><p>总览地图将用地分区、交通慢行、蓝绿公共空间、建筑与更新项目、AI 场景节点放在同一张证据图中，便于评审快速理解空间主线。</p></div><span class="tag">geometry + metrics</span></div><div class="map-grid"><div><div class="map-frame" aria-label="总览地图、三层范围、重点区域、用地分区、交通慢行、蓝绿公共空间、建筑与更新项目">
<svg viewBox="0 0 1120 680" role="img" aria-label="专业城市设计总览地图">
<rect x="72" y="64" width="976" height="520" rx="14" fill="#ffffff" stroke="#162033" stroke-width="4"/>
<rect x="112" y="130" width="236" height="370" fill="#e7e7ff" stroke="#4f46e5" stroke-width="2"/><text x="230" y="316" text-anchor="middle" font-size="23" fill="#312e81">AI研发创新</text>
<rect x="348" y="130" width="210" height="370" fill="#dff8e9" stroke="#15803d" stroke-width="2"/><text x="453" y="316" text-anchor="middle" font-size="23" fill="#166534">京张蓝绿公园</text>
<rect x="558" y="130" width="278" height="370" fill="#fff2cc" stroke="#b7791f" stroke-width="2"/><text x="697" y="316" text-anchor="middle" font-size="23" fill="#854d0e">产业服务复合</text>
<rect x="836" y="130" width="160" height="370" fill="#ffe3df" stroke="#b42318" stroke-width="2"/><text x="916" y="316" text-anchor="middle" font-size="23" fill="#991b1b">生活配套</text>
<path d="M128 524 C260 438 384 350 530 268 S810 154 1004 102" fill="none" stroke="#334155" stroke-width="22" stroke-linecap="round" opacity=".82"/>
<path d="M128 524 C260 438 384 350 530 268 S810 154 1004 102" fill="none" stroke="#f8fafc" stroke-width="7" stroke-linecap="round"/>
<g fill="none" stroke="#0f7490" stroke-width="5" stroke-dasharray="10 10"><path d="M150 212 H972"/><path d="M188 525 V126"/><path d="M955 492 C782 436 660 354 578 236"/></g>
<circle cx="230" cy="456" r="37" fill="#4f46e5"/><text x="230" y="463" text-anchor="middle" fill="#fff" font-size="18">众智园</text>
<circle cx="498" cy="328" r="37" fill="#15803d"/><text x="498" y="335" text-anchor="middle" fill="#fff" font-size="18">AI原点</text>
<circle cx="826" cy="184" r="37" fill="#b7791f"/><text x="826" y="191" text-anchor="middle" fill="#fff" font-size="18">大钟寺</text>
<g fill="#101827"><circle cx="340" cy="230" r="8"/><circle cx="640" cy="414" r="8"/><circle cx="760" cy="270" r="8"/><circle cx="912" cy="416" r="8"/></g>
<text x="96" y="628" font-size="17" fill="#475467">所有图面应由同一组 GeoJSON、metrics、矩阵与自检结果派生；临时边界以 intake 讨论为限。</text>
</svg></div><div class="legend"><span><i class="sw" style="background:var(--ai)"></i>用地分区</span><span><i class="sw" style="background:var(--park)"></i>蓝绿公共空间</span><span><i class="sw" style="background:var(--work)"></i>建筑与更新项目</span><span><i class="sw" style="background:var(--blue)"></i>交通慢行</span></div></div><aside><h3>核心指标</h3><div class="metric-list"><div class="metric"><span>site_area_sqm</span><strong data-metric="site_area_sqm" data-value="{site_area}">{site_area}</strong></div><div class="metric"><span>green_ratio</span><strong data-metric="green_ratio" data-value="{green_ratio}">{green_ratio}</strong></div><div class="metric"><span>public_space_ratio</span><strong data-metric="public_space_ratio" data-value="{public_ratio}">{public_ratio}</strong></div></div><div class="risk-card warn" style="margin-top:14px"><h3>自检状态</h3><p>deterministic validation、spatial review、visual packaging check 与 professional evidence review 必须全部通过。当前边界状态：{readiness_text}</p></div></aside></div></section>
<section class="sheet"><div class="sheet-head"><div><h2>三层范围</h2><p>方案按统筹研究范围、总体设计范围、重点区域范围递进，把产业判断、城市更新和重点片区设计绑定到图层与指标。</p></div><span class="tag">project_scope_summary.csv</span></div><div class="matrix"><article class="area-card"><h3>统筹研究范围</h3><p>面向 43.6 平方公里提出 AI 产业生态、三区两翼协同、未来城市形态和文化叙事。</p><ul><li>AI创新链与人才链</li><li>全球案例转化机制</li><li>品牌命名与传播</li></ul></article><article class="area-card"><h3>总体设计范围</h3><p>面向 11.4 平方公里组织城市更新、用地结构、交通市政、京张遗址公园活力带。</p><ul><li>控规深度城市设计</li><li>更新项目清单</li><li>蓝绿慢行系统</li></ul></article><article class="area-card"><h3>重点区域范围</h3><p>面向三处重点片区开展详细设计，说明功能业态、建筑更新、公共空间与交通组织。</p><ul><li>众智园AI自主创新加速区</li><li>北京AI原点社区</li><li>大钟寺AI产业聚集区</li></ul></article></div></section>
<section class="sheet"><div class="sheet-head"><div><h2>重点区域</h2><p>三处重点区必须有产业定位、空间策略、建筑与公共空间动作、交通接口和实施风险说明。</p></div><span class="tag">key_areas.geojson</span></div><div class="matrix"><article class="area-card"><h3>众智园AI自主创新加速区</h3><p>花园型自主创新街区。重点表达国家平台、产业展示、清河文化、对外交通和低碳交往空间。</p></article><article class="area-card"><h3>北京AI原点社区</h3><p>近校型成果转化街区。重点表达高校源头创新、开源社区、人才服务、拆改留和站点一体化。</p></article><article class="area-card"><h3>大钟寺AI产业聚集区</h3><p>城市型智能经济街区。重点表达领军企业、智能体新业态、商业服务、绿地复合利用和路口四象限连通。</p></article></div></section>
<section class="sheet"><div class="sheet-head"><div><h2>AI 场景</h2><p>场景不是口号，应说明服务对象、空间位置、数据来源、隐私边界、人工复核和运营主体。</p></div><span class="tag">10个AI场景卡</span></div><div class="scenario-grid"><article class="scenario-card"><b>01 开源发布厅</b><p>面向开发者、企业和高校的成果发布与模型评测节点。</p></article><article class="scenario-card"><b>02 城市智能体沙盒</b><p>在可控公共空间测试交通、服务和运维智能体。</p></article><article class="scenario-card"><b>03 慢行断点诊断</b><p>用公开数据和人工复核识别遗址公园慢行断点。</p></article><article class="scenario-card"><b>04 人才生活管家</b><p>连接居住、学习、消费、运动和社交服务。</p></article><article class="scenario-card"><b>05 AI安全治理廊</b><p>展示标准制定、可信评测和安全治理能力。</p></article><article class="scenario-card"><b>06 校企转化客厅</b><p>支撑清华、北大、中科院成果转化会客与路演。</p></article><article class="scenario-card"><b>07 数据要素剧场</b><p>大钟寺片区的数据资产、智能终端和内容消费展示。</p></article><article class="scenario-card"><b>08 低碳算力驿站</b><p>解释分布式能源、端侧算力与公共服务设施融合。</p></article><article class="scenario-card"><b>09 京张记忆线路</b><p>把铁路文脉、中关村创新文化和AI新文化串联。</p></article><article class="scenario-card"><b>10 全球AI活动周路线</b><p>组织开发者节、场景开放日、竞赛路演和城市体验路线。</p></article></div></section>
<section class="sheet"><div class="sheet-head"><div><h2>任务覆盖</h2><p>compliance_matrix.json 覆盖公告 1.3、1.4、1.5 与 agent.1-agent.6；standard_matrix.json 与 design_depth_matrix.json 证明专业标准和成果深度。</p></div><span class="tag">matrix evidence</span></div><div class="evidence"><div><h3>来源</h3><p>来源见 sources.json、agent_taskbook.json、data/processed/agent_fact_pack.md 和 standards/references。本页不得加载 CDN、远程地图瓦片、外部脚本、外部字体、API 请求或 iframe。</p><div class="source-line">sources.json / standard_matrix.json / design_depth_matrix.json</div></div><div><h3>假设</h3><p>待补控规、道路红线、权属、市政、文保和工程条件必须在 assumptions.json 中列明，并在正文中解释对设计结论的影响。</p><div class="source-line">missing_data_checklist.csv / assumptions.json / self_check.json</div></div></div></section>
</main>
</body>
</html>
"""


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/Library/Fonts/Arial Unicode.ttf",
    ]:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def make_figure_png(title: str, subtitle: str, labels: list[str], accent: str) -> bytes:
    image = Image.new("RGB", (1640, 840), "#f8fafc")
    draw = ImageDraw.Draw(image)
    title_font = load_font(56)
    subtitle_font = load_font(30)
    label_font = load_font(28)
    small_font = load_font(24)
    accent_rgb = tuple(int(accent[index : index + 2], 16) for index in (1, 3, 5))

    draw.rounded_rectangle((56, 56, 1584, 784), radius=32, fill="#ffffff", outline="#cbd5e1", width=2)
    draw.text((112, 120), title, fill="#111827", font=title_font)
    draw.text((112, 188), subtitle, fill="#64748b", font=subtitle_font)

    draw.line((160, 420, 410, 300, 660, 485, 900, 390, 1210, 305, 1500, 420), fill="#d1d5db", width=26, joint="curve")
    draw.rounded_rectangle((140, 300, 520, 580), radius=20, fill="#e0f2fe", outline="#0284c7", width=4)
    draw.rounded_rectangle((630, 250, 1010, 600), radius=20, fill="#dcfce7", outline="#16a34a", width=4)
    draw.rounded_rectangle((1120, 300, 1500, 580), radius=20, fill="#fef3c7", outline="#d97706", width=4)

    for index, label in enumerate(labels[:5]):
        x = 150 + index * 300
        y = 490 if index % 2 == 0 else 620
        draw.ellipse((x - 68, y - 68, x + 68, y + 68), fill=accent_rgb)
        bbox = draw.textbbox((0, 0), label, font=label_font)
        draw.text((x - (bbox[2] - bbox[0]) / 2, y - 18), label, fill="#ffffff", font=label_font)

    draw.text(
        (112, 720),
        "由提交包 GeoJSON、metrics.json、矩阵与自检结果派生；不得替代 official boundary 或专业图纸。",
        fill="#475569",
        font=small_font,
    )
    output = io.BytesIO()
    image.save(output, format="PNG")
    return output.getvalue()


def make_proposal_figures(metrics: dict[str, Any], boundary_mode: str, key_area_mode: str) -> dict[str, bytes]:
    site_area = metrics["metrics"]["site_area_sqm"]["value"]
    green_ratio = metrics["metrics"]["green_ratio"]["value"]
    public_ratio = metrics["metrics"]["public_space_ratio"]["value"]
    readiness = "official" if boundary_mode == "official" and key_area_mode == "official" else "provisional intake"
    return {
        "assets/figures/site-overview.png": make_figure_png(
            "资料证据链与提交包",
            f"boundary={readiness}; proposal.md 是主体，JSON/GeoJSON 是证据层",
            ["公告", "边界", "图层", "指标", "自检"],
            "#4f46e5",
        ),
        "assets/figures/land-use-structure.png": make_figure_png(
            "三层范围与空间结构",
            "统筹研究、总体设计、重点区域逐级落实到图层和指标",
            ["统筹", "总体", "重点", "用地", "实施"],
            "#059669",
        ),
        "assets/figures/key-areas.png": make_figure_png(
            "三处重点区域索引",
            "众智园、AI原点社区、大钟寺均需有定位、更新、交通和公共空间设计",
            ["众智园", "原点", "大钟寺", "更新", "风险"],
            "#d97706",
        ),
        "assets/figures/mobility-bluegreen.png": make_figure_png(
            "交通慢行与蓝绿公共空间",
            "roads、green_space、public_space 图层共同支撑慢行与公共空间判断",
            ["轨道", "慢行", "绿地", "公共", "节点"],
            "#0284c7",
        ),
        "assets/figures/metrics-evidence.png": make_figure_png(
            "指标复算与证据链",
            f"site_area={site_area}; green_ratio={green_ratio}; public_space_ratio={public_ratio}",
            ["面积", "绿地", "公共", "建筑", "矩阵"],
            "#be123c",
        ),
    }


MINIMAL_PDF = b"%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count 0>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n"

# Machine-readable declaration written into the generated (empty) constraints layer.
# An empty constraint set stays a valid, accepted state; this member only records *why*
# it is empty, so a deliberately empty layer is distinguishable from an unreviewed one.
# It must never be used to justify inventing constraint geometry.
CONSTRAINTS_SCAFFOLD_DATA_GAP = {
    "status": "official_constraint_geometry_unavailable",
    "declared_by": "scripts/scaffold_ai_submission.py",
    "assumption_ids": ["A-CONTROLS-001"],
    "missing_layers": [
        "REGULATORY_CONTROL",
        "HERITAGE_PROTECTION",
        "PARCEL",
        "EXISTING_PRIMARY_ROAD",
        "EXISTING_RAIL",
        "EXISTING_WATER",
    ],
    "note_zh": (
        "本图层刻意保持空集合。控规控制线、文物保护范围与建设控制地带、道路红线、权属地块、"
        "轨道与蓝线均属锁定图层，公开场地包中目前没有可引用的官方几何来源。"
        "缺口按 assumption A-CONTROLS-001 登记；取得官方或已清权几何前，"
        "不得以推定线条冒充 official_constraint，空集合优于编造。"
    ),
    "note_en": (
        "This layer is intentionally an empty set. Regulatory control lines, heritage protection and "
        "construction-control zones, road redlines, cadastral parcels, rail and blue lines are locked "
        "layers with no citable official geometry in the public site package. The gap is registered as "
        "assumption A-CONTROLS-001; until official or cleared geometry is available, inferred lines must "
        "not be presented as an official_constraint - an empty set is preferred over fabrication."
    ),
}


def make_package(submission_dir: Path, repo_root: Path, stage: str, agent_id: str, agent_name: str, title: str) -> None:
    if stage not in STAGES:
        raise SystemExit(f"--stage must be one of: {', '.join(sorted(STAGES))}")
    if submission_dir.exists() and any(path.name != ".DS_Store" for path in submission_dir.rglob("*")):
        raise SystemExit(f"{submission_dir}: refusing to overwrite a non-empty submission directory")

    boundary_feature, boundary_source, boundary_mode = load_boundary(repo_root, stage)
    key_area_result = find_key_areas(repo_root, boundary_mode)
    if key_area_result is None:
        raise SystemExit(
            "formal scaffold requires official or provisional KEY_AREA features for zhongzhiyuan_ai_acceleration_area, "
            "beijing_ai_origin_community, and dazhongsi_ai_industry_cluster in brief/site-package/geometry"
        )
    key_area_features, key_area_source, key_area_mode = key_area_result
    site_geom = shape(boundary_feature["geometry"])
    site_props = dict(boundary_feature.get("properties") or {})
    site_props["area_sqm_declared"] = round(projected_area(site_geom), 3)
    source_registry_summary = summarize_source_registry(load_source_registry(repo_root))

    green_geom = derived_polygon(site_geom, 0.30, 0.16, 0.46, 0.84)
    public_geom = derived_polygon(site_geom, 0.49, 0.32, 0.66, 0.70)
    building_geom = derived_polygon(site_geom, 0.12, 0.18, 0.24, 0.38)
    phase_geom = derived_polygon(site_geom, 0.08, 0.12, 0.56, 0.88)
    road_geom = line_inside_site(site_geom)

    geometry_files = {
        "site_boundary.geojson": collection(
            "site_boundary_scaffold",
            [
                feature(
                    "SITE-001",
                    "SITE_BOUNDARY",
                    site_geom,
                    **{key: value for key, value in site_props.items() if key not in {"id", "layer"}},
                )
            ],
        ),
        "key_areas.geojson": collection("key_areas_official", key_area_features),
        "land_use.geojson": collection("land_use_topology_partition", land_use_features(site_geom)),
        "buildings.geojson": collection(
            "building_footprints_scaffold",
            [feature("BLDG-001", "BUILDING_FOOTPRINT", building_geom, building_type="ai_r_and_d", name_zh="AI研发示范建筑基底")],
        ),
        "roads.geojson": collection(
            "roads_scaffold",
            [feature("ROAD-001", "ROAD_CENTERLINE", road_geom, road_class="greenway", name_zh="慢行与创新服务廊道")],
        ),
        "green_space.geojson": collection(
            "green_space_scaffold",
            [feature("GREEN-001", "GREEN_SPACE", green_geom, land_use_code="1401", name_zh="连续公园绿地")],
        ),
        "public_space.geojson": collection(
            "public_space_scaffold",
            [feature("PUBLIC-001", "PUBLIC_SPACE", public_geom, name_zh="公共活动界面")],
        ),
        "constraints.geojson": {
            **collection("constraints_scaffold", []),
            "data_gap": dict(CONSTRAINTS_SCAFFOLD_DATA_GAP),
        },
        "phasing.geojson": collection(
            "phasing_scaffold",
            [feature("PHASE-001", "PHASE", phase_geom, phase="phase_1", name_zh="一期可讨论范围")],
        ),
    }

    submission_dir.mkdir(parents=True, exist_ok=True)
    (submission_dir / "proposal.md").write_text(
        make_proposal(title, agent_id, stage, boundary_mode, key_area_mode, source_registry_summary),
        encoding="utf-8",
    )
    write_json(
        submission_dir / "agent.json",
        {
            "agent_id": agent_id,
            "agent_name": agent_name,
            "role": "ai_agent_submission_author",
            "model": "agent-declared-model",
            "model_family": "other",
            "model_detail": "replace-with-declared-model",
            "generated_with": "scripts/scaffold_ai_submission.py",
        },
    )
    write_json(
        submission_dir / "assumptions.json",
        {
            "schema_version": "0.1.0",
            "assumptions": [
                {
                    "id": "A-CONTROLS-001",
                    "status": "pending_professional_confirmation",
                    "statement": "Detailed regulatory controls, road redlines, ownership, municipal utilities, and engineering constraints must be confirmed from official attachments before statutory use.",
                    "impact": "The package can be reviewed as a formal AI submission only for provided official boundaries and submitted design layers; statutory controls still need professional confirmation.",
                }
            ],
        },
    )
    write_json(
        submission_dir / "sources.json",
        {
            "schema_version": "0.1.0",
            "sources": [
                {
                    "id": "SITE-PACKAGE",
                    "path": "brief/site-package/",
                    "source_type": "official_public",
                    "usage": "Project brief, enums, allowed design space, ranges, and schemas.",
                },
                {
                    "id": "SOURCE-REGISTRY",
                    "path": "data/source_registry.json",
                    "source_type": "repository_public_registry",
                    "usage": "Public/cleared/provisional source usability registry; distinguishes formal-ready, background-only, provisional-only, and needs-review materials.",
                },
                {
                    "id": "PROCESSED-FACT-PACK",
                    "path": "data/processed/agent_fact_pack.md",
                    "source_type": "repository_processed_reference",
                    "usage": "Agent-readable navigation layer for scopes, required tasks, source-use boundaries, and missing-data checklist; not a new authority source.",
                },
                {
                    "id": "BOUNDARY-SOURCE",
                    "path": boundary_source,
                    "source_type": site_props.get("source_type"),
                    "usage": f"Submitted site boundary geometry source ({boundary_mode}).",
                },
                {
                    "id": "KEY-AREA-SOURCE",
                    "path": key_area_source,
                    "source_type": (key_area_features[0].get("properties") or {}).get("source_type"),
                    "usage": f"Three required detailed-design key area boundaries ({key_area_mode}).",
                },
                {
                    "id": "OFFICIAL-ANNOUNCEMENT",
                    "url": "https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/tzgg/hd/202605/t20260509_4643047.html",
                    "source_type": "official_public",
                    "usage": "Official announcement tasks, scope levels, key areas, language, and deliverable context.",
                },
                {
                    "id": "AGENT-TASKBOOK",
                    "path": "brief/site-package/agent_taskbook.json",
                    "source_type": "user_provided_cleared",
                    "usage": "Agent-facing open-call principles, six required agent tasks, scenario/branding/operation requirements, and boundary clause.",
                },
            ],
        },
    )
    metrics = make_metrics(site_geom, green_geom, public_geom, building_geom)
    write_json(submission_dir / "metrics.json", metrics)
    proposal_figures = make_proposal_figures(metrics, boundary_mode, key_area_mode)
    for rel_path, png in proposal_figures.items():
        path = submission_dir / rel_path
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(png)
    write_json(submission_dir / "compliance_matrix.json", make_compliance_matrix())
    write_json(submission_dir / "standard_matrix.json", make_standard_matrix())
    write_json(submission_dir / "design_depth_matrix.json", make_design_depth_matrix())
    write_json(
        submission_dir / "self_check.json",
        {
            "schema_version": "0.1.0",
            "checks": [
                {
                    "check_id": "BOUNDARY_TRUST",
                    "result": "pass",
                    "severity": "info" if boundary_mode == "official" else "major",
                    "target": "geometry/site_boundary.geojson",
                    "message": "Formal boundary is official." if boundary_mode == "official" else "Provisional boundary is present; replace with official redline before professional scoring.",
                },
                {
                    "check_id": "KEY_AREAS_TRUST",
                    "result": "pass",
                    "severity": "info" if key_area_mode == "official" else "major",
                    "target": "geometry/key_areas.geojson",
                    "message": "Three required key areas are official." if key_area_mode == "official" else "Three required key areas are provisional; replace with official polygons before professional scoring.",
                },
                {
                    "check_id": "LAND_USE_TOPOLOGY",
                    "result": "pass",
                    "severity": "major",
                    "target": "geometry/land_use.geojson",
                    "message": "Initial land-use polygons are derived from site boundary partitioning.",
                },
                {
                    "check_id": "VISUAL_STATIC",
                    "result": "pass",
                    "severity": "info",
                    "target": "visual/index.html",
                    "message": "Static HTML visualization is generated without external dependencies.",
                },
                {
                    "check_id": "PROFESSIONAL_EVIDENCE",
                    "result": "pass",
                    "severity": "major",
                    "target": "proposal.md",
                    "message": "Proposal includes references to standards, design depth items, geometry, metrics, sources, and assumptions.",
                },
            ],
        },
    )
    for filename, content in geometry_files.items():
        write_json(submission_dir / "geometry" / filename, content)
    (submission_dir / "report").mkdir(exist_ok=True)
    (submission_dir / "report" / "proposal.html").write_text(
        render_html(submission_dir),
        encoding="utf-8",
    )
    (submission_dir / "report" / "narrative.md").write_text(
        "# Formal Narrative\n\nThis narrative is derived from the structured AI package. Geometry, metrics, compliance matrix, drawings, and visual/index.html remain cross-checked deliverables.\n",
        encoding="utf-8",
    )
    (submission_dir / "report" / "copyright_statement.md").write_text(
        "# Copyright Statement\n\nAll submitted text, geometry, diagrams, PDFs, and static HTML assets are generated by the declared AI agent or use cleared public/user-provided sources listed in sources.json. No remote assets are required by visual/index.html.\n",
        encoding="utf-8",
    )
    (submission_dir / "drawings").mkdir(exist_ok=True)
    (submission_dir / "drawings" / "a3-booklet.pdf").write_bytes(MINIMAL_PDF)
    (submission_dir / "drawings" / "a0-boards.pdf").write_bytes(MINIMAL_PDF)
    (submission_dir / "visual").mkdir(exist_ok=True)
    (submission_dir / "visual" / "index.html").write_text(
        make_visual_html(title, metrics, boundary_mode, key_area_mode),
        encoding="utf-8",
    )

    files = [
        ("manifest.json", "manifest", True),
        ("proposal.md", "narrative", True),
        ("agent.json", "agent_card", True),
        ("metrics.json", "metrics", True),
        ("assumptions.json", "assumptions", True),
        ("sources.json", "sources", True),
        ("self_check.json", "self_check", True),
        ("compliance_matrix.json", "compliance_matrix", True),
        ("standard_matrix.json", "standard_matrix", True),
        ("design_depth_matrix.json", "design_depth_matrix", True),
        ("report/proposal.html", "rendered_proposal_html", True),
        ("report/narrative.md", "narrative", False),
        ("report/copyright_statement.md", "copyright_statement", True),
        ("drawings/a3-booklet.pdf", "drawing", True),
        ("drawings/a0-boards.pdf", "drawing", True),
        ("visual/index.html", "visualization", True),
    ]
    files.extend((rel_path, "proposal_figure", True) for rel_path in sorted(proposal_figures))
    files.extend((f"geometry/{name}", "geometry", True) for name in sorted(geometry_files))
    known_blockers: list[str] = []
    manifest_files = []
    for rel_path, role, required in files:
        item = {"path": rel_path, "role": role, "required": required}
        if rel_path in {
            "proposal.md",
            "report/proposal.html",
            "drawings/a3-booklet.pdf",
            "drawings/a0-boards.pdf",
            "visual/index.html",
        } or rel_path in proposal_figures:
            item["language"] = "zh"
        if rel_path != "manifest.json":
            item["sha256"] = sha256(submission_dir / rel_path)
        manifest_files.append(item)
    write_json(
        submission_dir / "manifest.json",
        {
            "schema_version": "0.2.0",
            "package_id": slugify(submission_dir.name),
            "project_id": PROJECT_ID,
            "site_package_version": SITE_PACKAGE_VERSION,
            "package_type": "professional_design_package",
            "package_state": "scaffold",
            "submission_stage": stage,
            "submission_type": "ai_agent",
            "agent": {
                "agent_id": agent_id,
                "agent_name": agent_name,
                "model": "agent-declared-model",
                "model_family": "other",
                "model_detail": "replace-with-declared-model",
            },
            "generated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
            "files": manifest_files,
            "validation_claim": {
                "self_checked": False,
                "known_blockers": [
                    "Generated scaffold is not a submission. Replace the draft marker, design content, figures, geometry, and placeholder drawings before setting package_state=ready_for_review."
                ],
                "data_confidence": "high",
            },
        },
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("submission_dir")
    parser.add_argument("--stage", choices=sorted(STAGES), required=True)
    parser.add_argument("--agent-id", required=True)
    parser.add_argument("--agent-name", required=True)
    parser.add_argument("--proposal-title", required=True)
    args = parser.parse_args()

    make_package(
        Path(args.submission_dir),
        Path.cwd(),
        args.stage,
        args.agent_id,
        args.agent_name,
        args.proposal_title,
    )
    print(args.submission_dir)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
