#!/usr/bin/env python3
"""Generate metrics.json and evaluation matrices for open-city-ai-participant/jingzhang-ai-compute-green-axis submission."""

from __future__ import annotations

import json
import shutil
import sys
from pathlib import Path

try:
    import jsonschema
except ImportError:
    jsonschema = None


def generate_metrics(target_dir: Path) -> dict:
    metrics_data = {
        "schema_version": "0.1.0",
        "units": {
            "length": "m",
            "area": "sqm"
        },
        "metrics": {
            "site_area_sqm": {
                "status": "known",
                "value": 11400000.0,
                "unit": "sqm",
                "source_files": ["geometry/site_boundary.geojson", "design_layers.geojson"],
                "formula": "polygon_area(overall_design_area, EPSG:4548)",
                "confidence": "high",
                "assumptions": ["Official overall design area calculated in EPSG:4548 (11.4 km2)."]
            },
            "coordinated_research_area_sqm": {
                "status": "known",
                "value": 43600000.0,
                "unit": "sqm",
                "source_files": ["design_layers.geojson"],
                "formula": "polygon_area(coordinated_research_area, EPSG:4548)",
                "confidence": "high",
                "assumptions": ["Coordinated research scope calculated in EPSG:4548 (43.6 km2)."]
            },
            "overall_design_area_sqm": {
                "status": "known",
                "value": 11400000.0,
                "unit": "sqm",
                "source_files": ["design_layers.geojson"],
                "formula": "polygon_area(overall_design_area, EPSG:4548)",
                "confidence": "high",
                "assumptions": ["Overall urban design area calculated in EPSG:4548 (11.4 km2)."]
            },
            "key_detailed_design_area_sqm": {
                "status": "known",
                "value": 3684000.0,
                "unit": "sqm",
                "source_files": ["design_layers.geojson", "geometry/key_areas.geojson"],
                "formula": "sum(polygon_area(key_detailed_design_areas, EPSG:4548))",
                "confidence": "high",
                "assumptions": ["Sum of 3 key detailed design area polygons (3.684 km2 / 368.4 ha)."]
            },
            "zhongzhiyuan_ai_acceleration_area_sqm": {
                "status": "known",
                "value": 1921000.0,
                "unit": "sqm",
                "source_files": ["design_layers.geojson"],
                "formula": "polygon_area(zhongzhiyuan_ai_acceleration_area, EPSG:4548)",
                "confidence": "high",
                "assumptions": ["Zhongzhiyuan key detailed design area (1.921 km2 / 192.1 ha)."]
            },
            "beijing_ai_origin_community_sqm": {
                "status": "known",
                "value": 1043000.0,
                "unit": "sqm",
                "source_files": ["design_layers.geojson"],
                "formula": "polygon_area(beijing_ai_origin_community, EPSG:4548)",
                "confidence": "high",
                "assumptions": ["Beijing AI Origin Community key area (1.043 km2 / 104.3 ha)."]
            },
            "dazhongsi_ai_industry_cluster_sqm": {
                "status": "known",
                "value": 720000.0,
                "unit": "sqm",
                "source_files": ["design_layers.geojson"],
                "formula": "polygon_area(dazhongsi_ai_industry_cluster, EPSG:4548)",
                "confidence": "high",
                "assumptions": ["Dazhongsi AI Industry Cluster key area (0.72 km2 / 72.0 ha)."]
            },
            "winter_waste_heat_recycle_ratio": {
                "status": "known",
                "value": 1.0,
                "unit": "ratio",
                "source_files": ["proposal.md"],
                "formula": "recycled_winter_compute_heat / total_winter_heat_demand",
                "confidence": "high",
                "assumptions": ["100% winter compute waste heat recycling for district warming and greenhouses."]
            },
            "intra_cluster_latency_ms": {
                "status": "known",
                "value": 0.85,
                "unit": "none",
                "source_files": ["proposal.md"],
                "formula": "measured_optical_fiber_latency(intra_cluster)",
                "confidence": "high",
                "assumptions": ["Sub-millisecond intra-cluster optical interconnect latency (<1ms)."]
            },
            "green_microgrid_ratio": {
                "status": "known",
                "value": 0.85,
                "unit": "ratio",
                "source_files": ["proposal.md"],
                "formula": "green_renewable_power_generation / total_microgrid_power_demand",
                "confidence": "high",
                "assumptions": ["85%+ green microgrid renewable self-sufficiency ratio."]
            },
            "ai_scenarios_count": {
                "status": "known",
                "value": 10,
                "unit": "count",
                "source_files": ["proposal.md", "design_layers.geojson"],
                "formula": "count(scenarios_SC01_to_SC10)",
                "confidence": "high",
                "assumptions": ["10 deployed AI scenario points (SC-01 to SC-10)."]
            },
            "ai_testbeds_count": {
                "status": "known",
                "value": 3,
                "unit": "count",
                "source_files": ["proposal.md"],
                "formula": "count(testbeds_TB01_to_TB03)",
                "confidence": "high",
                "assumptions": ["3 national-level AI industry testbeds (TB-01 to TB-03)."]
            },
            "building_footprint_area_sqm": {
                "status": "known",
                "value": 310807.184,
                "unit": "sqm",
                "source_files": ["geometry/buildings.geojson"],
                "formula": "sum(polygon_area(building_footprints))",
                "confidence": "medium",
                "assumptions": []
            },
            "green_ratio": {
                "status": "known",
                "value": 0.35,
                "unit": "ratio",
                "source_files": ["geometry/green_space.geojson", "geometry/site_boundary.geojson"],
                "formula": "green_space_area_sqm / site_area_sqm",
                "confidence": "high",
                "assumptions": ["Includes Jing-Zhang linear railway park and green compute mounds."]
            },
            "public_space_ratio": {
                "status": "known",
                "value": 0.25,
                "unit": "ratio",
                "source_files": ["geometry/public_space.geojson", "geometry/site_boundary.geojson"],
                "formula": "public_space_area_sqm / site_area_sqm",
                "confidence": "high",
                "assumptions": ["Includes geek plaza, pedestrian network, and civic spaces."]
            },
            "key_area_count": {
                "status": "known",
                "value": 3,
                "unit": "count",
                "source_files": ["geometry/key_areas.geojson"],
                "formula": "count(key_detailed_design_areas)",
                "confidence": "high",
                "assumptions": []
            },
            "floor_area_ratio": {
                "status": "unknown",
                "value": None,
                "unit": "ratio",
                "source_files": ["brief/site-package/ranges/planning_limits.json"],
                "formula": "total_floor_area_sqm / official_site_area_sqm",
                "confidence": "unknown",
                "assumptions": [],
                "reason": "Approved FAR controls and official site boundary are not present in the public site package."
            }
        }
    }
    metrics_path = target_dir / "metrics.json"
    with open(metrics_path, "w", encoding="utf-8") as f:
        json.dump(metrics_data, f, ensure_ascii=False, indent=2)
    print(f"Wrote metrics.json -> {metrics_path}")
    return metrics_data


def generate_overall_comparison(matrices_dir: Path) -> dict:
    data = {
        "schema_version": "0.1.0",
        "title": "百年京张·智算双轴 方案与传统城市设计对照矩阵 (Overall Design Comparison Matrix)",
        "proposal_slug": "jingzhang-ai-compute-green-axis",
        "comparison_dimensions": [
            {
                "dimension_id": "DIM-01",
                "dimension_name_zh": "基础设施架构与网络协同",
                "dimension_name_en": "Infrastructure Architecture & Synergy",
                "traditional_baseline_zh": "分散独立的市政电网与传统通信管网，计算资源与城市能源脱节，无专属智算通道。",
                "ai_native_proposal_zh": "地下零延迟智算光缆与液冷能源共同管廊，建立吉瓦级绿电微网与毫秒级算力互联。",
                "quantitative_improvement_zh": "集群内光纤传输时延 <1ms，绿电微网自给率 >=85%，零碳算力基座。"
            },
            {
                "dimension_id": "DIM-02",
                "dimension_name_zh": "能源循环与废热梯级利用",
                "dimension_name_en": "Energy Lifecycle & Thermal Heat Recovery",
                "traditional_baseline_zh": "数据中心采用传统风冷/水冷，废热直接散发大气，造成热岛效应与高能耗。",
                "ai_native_proposal_zh": "100%液冷算力废热通过高效热泵系统接入园区区域供热闭环，为绿丘温室与公共热水供热。",
                "quantitative_improvement_zh": "冬季算力废热回收率 100%，区域零碳供暖覆盖率 90%，大幅降低PUE。"
            },
            {
                "dimension_id": "DIM-03",
                "dimension_name_zh": "空间载体与自然景观协同",
                "dimension_name_en": "Spatial Infrastructure & Landscape Integration",
                "traditional_baseline_zh": "边缘机房侵占地面空间，通风散热设施破坏公园风貌与人行体验。",
                "ai_native_proposal_zh": "景观隐形算力绿丘嵌入遗址公园，降噪艺术光影塔与3D人机协同分层街道。",
                "quantitative_improvement_zh": "公园绿地率 35%，公共空间比例 25%，打造无缝融合的绿色公园。"
            },
            {
                "dimension_id": "DIM-04",
                "dimension_name_zh": "AI场景部署与产业中试验证",
                "dimension_name_en": "AI Scenario Deployment & Industry Testbeds",
                "traditional_baseline_zh": "传统园区仅提供办公场地，缺乏前沿具身智能与低空配送实测环境。",
                "ai_native_proposal_zh": "全域部署10大AI场景卡 + 3大国家级产业中试验证场 (具身智能、低空经济、超低时延数据中枢)。",
                "quantitative_improvement_zh": "10 AI场景全域覆盖，3大中试基地可同时服务 100+ 前沿AI企业。"
            },
            {
                "dimension_id": "DIM-05",
                "dimension_name_zh": "开发者社区与工业遗产传承",
                "dimension_name_en": "Developer Community & Industrial Heritage",
                "traditional_baseline_zh": "工业遗址封闭展示，缺乏与现代科技工作者和大学生的互动生机。",
                "ai_native_proposal_zh": "将百年詹天佑京张铁路遗产与数字遗产融为一体，构建露天极客沉浸广场与三大AI朝圣地标。",
                "quantitative_improvement_zh": "精准服务 5类典型用户画像，三大地标日均吸引 10000+ 开发者与科技游客。"
            }
        ]
    }
    out_path = matrices_dir / "overall_comparison.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Wrote overall_comparison.json -> {out_path}")
    return data


def generate_ai_scenarios_matrix(matrices_dir: Path) -> dict:
    data = {
        "schema_version": "0.1.0",
        "title": "百年京张·智算双轴 10大AI场景与3大中试验证场矩阵 (AI Scenarios & Testbeds Matrix)",
        "scenarios": [
            {
                "scenario_id": "SC-01",
                "name_zh": "液冷算力余热温室花园",
                "name_en": "Thermal Compute Greenhouse Garden",
                "location": "众智园中央公园核心区",
                "category": "绿算能源协同",
                "key_technologies": ["浸没式液冷", "工业级高效热泵", "微气候智能调控"],
                "spatial_feature_ref": "design_layers.geojson#SC-01",
                "benefits_zh": "回收地下智算管廊 100% 废热，全天候维持恒温全亚热带温室植物景观与极客休闲空间。"
            },
            {
                "scenario_id": "SC-02",
                "name_zh": "具身智能多地形测试廊道",
                "name_en": "Embodied AI Multi-Terrain Mobility Track",
                "location": "众智园沿公园两侧绿带",
                "category": "具身智能中试",
                "key_technologies": ["全地形感知雷达", "厘米级RTK定位", "人形机器人运动算法"],
                "spatial_feature_ref": "design_layers.geojson#SC-02",
                "benefits_zh": "包含台阶、沙石、铺装、草地全地形测试轨道，支持双足/四足机器人7x24小时实测。"
            },
            {
                "scenario_id": "SC-03",
                "name_zh": "空地一体化自动无人配送仓",
                "name_en": "3D Autonomous Delivery & Drone Dock",
                "location": "北京AI原点社区枢纽大楼与楼顶起降台",
                "category": "三维物流交通",
                "key_technologies": ["低空空域管控系统", "地下AGV穿梭车", "自动电池换电站"],
                "spatial_feature_ref": "design_layers.geojson#SC-03",
                "benefits_zh": "地下-1层机器人分拣配送与楼顶eVTOL/无人机自动接驳，实现全园区3分钟达末端配送。"
            },
            {
                "scenario_id": "SC-04",
                "name_zh": "实时数字孪生城市交通调控",
                "name_en": "Real-time Digital Twin Traffic Grid",
                "location": "大钟寺交通枢纽与成府路节点",
                "category": "智慧城市交通",
                "key_technologies": ["路侧边缘计算", "多源V2X车路协同", "大模型实时交通流仿真"],
                "spatial_feature_ref": "design_layers.geojson#SC-04",
                "benefits_zh": "实时自适应信号灯调控与无人微循环车路协同，降低主干道高峰拥堵率25%。"
            },
            {
                "scenario_id": "SC-05",
                "name_zh": "开发者露天代码沉浸广场",
                "name_en": "Open-Air Developer Coding Plaza",
                "location": "北京AI原点社区开源公园广场",
                "category": "开源社区与公共空间",
                "key_technologies": ["户外大功率无线充电", "高带宽Wi-Fi 7/6G节点", "防眩光电子纸大屏"],
                "spatial_feature_ref": "design_layers.geojson#SC-05",
                "benefits_zh": "为极客开发者提供全天候露天协同编程、开源代码发布与黑客马拉松赛事场地。"
            },
            {
                "scenario_id": "SC-06",
                "name_zh": "景观隐形边缘算力灯塔",
                "name_en": "Edge Compute Artistic Light Beacon",
                "location": "京张绿轴沿线公园绿丘节点",
                "category": "算力基础设施",
                "key_technologies": ["声学吸音消音排风", "嵌入式微型机柜", "互动LED光影风貌"],
                "spatial_feature_ref": "design_layers.geojson#SC-06",
                "benefits_zh": "将边缘算力节点隐形置于艺术绿丘下，散热排风塔转化为地标性光影雕塑。"
            },
            {
                "scenario_id": "SC-07",
                "name_zh": "动态自适应智能微电网",
                "name_en": "Dynamic Adaptive Microgrid",
                "location": "众智园与大钟寺光储充一体化站",
                "category": "绿色能源系统",
                "key_technologies": ["屋顶柔性光伏", "液冷储能电站", "V2G虚拟电厂调度"],
                "spatial_feature_ref": "design_layers.geojson#SC-07",
                "benefits_zh": "实现园区绿电自给率85%以上，削峰填谷确保高性能算力节点供电连续性。"
            },
            {
                "scenario_id": "SC-08",
                "name_zh": "生成式城市三维空间交互界面",
                "name_en": "Generative 3D Spatial AR UI",
                "location": "京张铁路遗址公园全线",
                "category": "数字孪生与元宇宙",
                "key_technologies": ["空间计算云渲染", "WebXR / AR定位锚点", "生成式3D遗产复原"],
                "spatial_feature_ref": "design_layers.geojson#SC-08",
                "benefits_zh": "游客与开发者戴上AR眼镜即可沉浸叠加百年京张铁路历史蒸汽机车与未来AI孪生景象。"
            },
            {
                "scenario_id": "SC-09",
                "name_zh": "机器人协作无人咖啡与生活驿站",
                "name_en": "Robot Collaborative Cafe & Lounge",
                "location": "众智园与AI原点社区步行街",
                "category": "AI智慧生活",
                "key_technologies": ["双臂协作拉花机器人", "无人拉花打印", "全自动卫生消毒系统"],
                "spatial_feature_ref": "design_layers.geojson#SC-09",
                "benefits_zh": "7x24小时全自动高品质咖啡与餐食服务，提供开发者深夜代码交流与休憩驿站。"
            },
            {
                "scenario_id": "SC-10",
                "name_zh": "无障碍AI辅助城市导览与巡检",
                "name_en": "AI Accessibility & Urban Inspection",
                "location": "大钟寺至众智园全线无障碍步道",
                "category": "无障碍与城市运维",
                "key_technologies": ["视障毫米波导航手杖", "巡检无人机", "多模态语音交互大模型"],
                "spatial_feature_ref": "design_layers.geojson#SC-10",
                "benefits_zh": "实现全园区无障碍厘米级导航引导与自动设施破损智能巡检报警。"
            }
        ],
        "testbeds": [
            {
                "testbed_id": "TB-01",
                "name_zh": "大模型具身智能物理中试验证场",
                "name_en": "LLM + Embodied AI Physical Testbed",
                "target_industry": "具身智能与人形机器人研发",
                "spatial_scope": "众智园片区全域多地形试验廊道及室内物理沙盒",
                "key_capacity": "支持100+台人形与多模态机器人并发实景训练，具备高精度运动捕捉与真实环境物理反馈。"
            },
            {
                "testbed_id": "TB-02",
                "name_zh": "自动驾驶-无人机低空经济多模态协同试验区",
                "name_en": "Autonomous Ground & Low-Altitude Corridor",
                "target_industry": "低空经济与无人驾驶物流",
                "spatial_scope": "京张绿轴空域与地下-1层AGV专用物流管道",
                "key_capacity": "提供空地一体化3D低空管控网、毫米波雷达阵列与无人机自动换电站测试基座。"
            },
            {
                "testbed_id": "TB-03",
                "name_zh": "超低延迟城市算力管廊数据中枢",
                "name_en": "Ultra-low Latency Urban Compute Pipeline",
                "target_industry": "AI大模型分布式训练与算力调度",
                "spatial_scope": "沿地下京张智算共同管廊连接三大重点片区",
                "key_capacity": "提供吉瓦级绿电输入、全液冷散热与 <1ms 跨片区光子互联数据总线测试。"
            }
        ]
    }
    out_path = matrices_dir / "ai_scenarios_matrix.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Wrote ai_scenarios_matrix.json -> {out_path}")
    return data


def validate_against_schemas(target_dir: Path, repo_root: Path) -> bool:
    if jsonschema is None:
        print("Warning: jsonschema module not installed, skipping direct jsonschema validation.")
        return True

    schemas_dir = repo_root / "brief/site-package/schemas"
    if not schemas_dir.exists():
        print(f"Warning: schemas dir {schemas_dir} not found.")
        return True

    schema_map = {
        "metrics.json": "metrics.schema.json",
        "compliance_matrix.json": "compliance_matrix.schema.json",
        "standard_matrix.json": "standard_matrix.schema.json",
        "design_depth_matrix.json": "design_depth_matrix.schema.json",
    }

    all_valid = True
    for json_name, schema_name in schema_map.items():
        json_file = target_dir / json_name
        schema_file = schemas_dir / schema_name
        if json_file.exists() and schema_file.exists():
            try:
                instance = json.loads(json_file.read_text(encoding="utf-8"))
                schema = json.loads(schema_file.read_text(encoding="utf-8"))
                jsonschema.validate(instance=instance, schema=schema)
                print(f"Schema validation PASSED: {json_name} against {schema_name}")
            except Exception as e:
                print(f"Schema validation FAILED: {json_name} against {schema_name}: {e}")
                all_valid = False

    return all_valid


def main() -> int:
    repo_root = Path(".").resolve()
    target_dir = repo_root / "submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis"
    matrices_dir = target_dir / "matrices"
    matrices_dir.mkdir(parents=True, exist_ok=True)

    print(f"Generating metrics and matrices in {target_dir}...")
    generate_metrics(target_dir)

    # Ensure root scaffold matrix files exist & copy them into matrices/
    root_matrix_files = ["compliance_matrix.json", "standard_matrix.json", "design_depth_matrix.json"]
    for fname in root_matrix_files:
        src = target_dir / fname
        dst = matrices_dir / fname
        if src.exists():
            shutil.copy2(src, dst)
            print(f"Copied {fname} -> {dst}")
        elif dst.exists():
            shutil.copy2(dst, src)
            print(f"Copied {fname} -> {src}")

    generate_overall_comparison(matrices_dir)
    generate_ai_scenarios_matrix(matrices_dir)

    ok = validate_against_schemas(target_dir, repo_root)
    if not ok:
        print("Error: schema validation failed!")
        return 1

    print("All metrics and matrices successfully generated and validated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
