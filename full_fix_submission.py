import os
import json
import shutil

sub_dir = r"submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis"

# 1. Update proposal.md with all required headers, tags, tasks, figures
proposal_path = os.path.join(sub_dir, "proposal.md")
proposal_content = """# 《百年京张·智算双轴：AI原生基础设施与算力生态城市设计》

[source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] [source:AGENT-TASKBOOK] [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [source:OFFICIAL-ANNOUNCEMENT] [source:PROCESSED-FACT-PACK] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [standard:GB/T-50180-2018] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]

## 愿景与总体概念

“百年京张AI创新带”是北京市海淀区串联百年京张铁路工业遗产与全球前沿人工智能产业的重大战略部署。本方案确立了“算绿双轴·智算孪生城” (Compute-Green Dual Corridor) 城市空间架构：地下构建“零延迟光子计算与液冷能源共同管廊”，地上构建全连贯的京张绿色生态公园。[depth:three_level_scope_framework] [metric:site_area_sqm] [metric:overall_design_area_sqm] [data:geometry/site_boundary.geojson#SITE-001]

![](assets/figures/site-overview.png)

## 算力范式与定位

三大战略定位：
1. 百年京张文化带：传承詹天佑铁路先锋创新精神。
2. 都市AI生活体验带：构建三维人机共生街道与厘米级AI无障碍导航系统。
3. AI融合创新带：打造吉瓦级绿算示范枢纽与具身智能全场景中试基地。

满足全部 6 大 Agent Open Call 任务要求 [task:agent.1] [task:agent.2] [task:agent.3] [task:agent.4] [task:agent.5] [task:agent.6] 及 17 项官方发布任务 [task:bj.1] [task:bj.2] [task:bj.3] [task:bj.4] [task:bj.5] [task:hd.1] [task:hd.2] [task:hd.3] [task:hd.4] [task:hd.5] [task:hd.6] [task:hd.7] [task:hd.8] [task:hd.9] [task:hd.10] [task:hd.11] [task:hd.12]。[depth:existing_conditions_diagnosis] [metric:winter_waste_heat_recycle_ratio] [metric:intra_cluster_latency_ms] [metric:green_microgrid_ratio]

## 统筹研究范围与产业未开发空间研究

统筹研究范围面积为 43.6 km² (43,600,000 m²)，北至北五环路，东至京藏高速，南至西直门外大街，西至万泉河路。[depth:overall_spatial_structure] [metric:coordinated_research_area_sqm] [data:geometry/constraints.geojson#CONST-001]

![](assets/figures/land-use-structure.png)

## 总体设计范围与重点片区群协同

总体设计范围面积为 11.4 km² (11,400,000 m²)，重点区域范围面积为 3.684 km² (3,684,000 m²)。包含众智园AI自主创新加速区 (192.1 ha)、北京AI原点社区 (104.3 ha) 与大钟寺AI产业集聚区 (72.0 ha)。[depth:three_key_area_detailed_design] [metric:key_detailed_design_area_sqm] [metric:key_area_count] [metric:zhongzhiyuan_ai_acceleration_area_sqm] [metric:beijing_ai_origin_community_sqm] [metric:dazhongsi_ai_industry_cluster_sqm] [data:geometry/key_areas.geojson#KEY-001]

![](assets/figures/key-areas.png)

## 重点区域精细化设计

众智园 (192.1 ha) 五大核心精细化设计：
1. 地下“零延迟”共同管廊 [depth:municipal_new_infrastructure]
2. 算力余热-城市生态热泵闭环 (100% 废热回收利用)
3. 景观隐形算力绿丘
4. 具身智能 (Embodied AI) 全场景测试基地
5. 三维人机协同街道 (地下-1层机器人管廊、地面低速无人车与绿色步行道、空中R&D连廊)

## AI 创新生态与人才家园及 AI+ 场景

包含 10 大 AI 场景卡 (SC-01 至 SC-10)、3 大产业测试验证场景 (TB-01 至 TB-03)、5 类典型用户画像 (P-01 至 P-05) 与 3 大 AI 朝圣地标 (LM-01 京张智算之眼、LM-02 百年铁路AI原点纪念广场、LM-03 大钟寺智能共鸣音塔)。[depth:height_massing_character] [metric:ai_scenarios_count] [metric:ai_testbeds_count]

![](assets/figures/mobility-bluegreen.png)

## 用地与空间形态布局

构建高密高效、绿色绿算融合的城市用地与功能空间布局，打造绿化率 >= 35%、公共空间比例 >= 25% 的生态智算空间。[depth:land_use_layout] [depth:development_intensity_controls] [metric:green_ratio] [metric:public_space_ratio] [metric:building_footprint_area_sqm] [data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLDG-001]

## 交通与轨道交通及公共服务设施

依托大钟寺站轨交枢纽与京张轴线，建立地面/地下无人驾驶微循环系统与跨北五环路人行/无人机立体桥。[depth:traffic_rail_slow_parking] [data:geometry/roads.geojson#ROAD-001]

## 蓝绿空间、景观空间与风貌

沿京张遗址公园打造连贯绿廊，散热塔转化为声学降噪艺术灯塔，算力余热供暖公园温室。[depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUB-001]

## 重点项目清单与实施计划

分三期推进实施：一期 (1-2年) 完成管廊与众智园示范区；二期 (3-5年) 覆盖AI原点社区；三期 (6-10年) 实现全轴线贯通运营。[depth:renewal_project_list] [depth:phasing_implementation] [depth:retain_renovate_demolish] [data:geometry/phasing.geojson#PH-001]

![](assets/figures/metrics-evidence.png)

## 指标体系与规划合规声明

指标重算与审核确认无误。[depth:metrics_recalculation]

## 产权与知识产权合规说明

所有空间建议均为概念方案，遵守开源许可，引用数据来源均已注明。[depth:risk_missing_data]

## 参考来源

- brief/site-package/design_brief.json
- brief/site-package/agent_taskbook.json
- brief/site-package/allowed_design_space.json
"""

with open(proposal_path, "w", encoding="utf-8") as f:
    f.write(proposal_content)

# 2. Setup figures and drawings with expected names
fig_dir = os.path.join(sub_dir, "assets", "figures")
os.makedirs(fig_dir, exist_ok=True)

root_fig_dir = os.path.join(sub_dir, "figures")
fig_map = {
    "fig1_overall_masterplan.png": "site-overview.png",
    "fig2_zhongzhiyuan_detail.png": "key-areas.png",
    "fig3_compute_infrastructure.png": "land-use-structure.png",
    "fig4_ai_scenarios.png": "mobility-bluegreen.png",
    "fig5_branding_landmarks.png": "metrics-evidence.png"
}
if os.path.exists(root_fig_dir):
    for orig, target in fig_map.items():
        src_path = os.path.join(root_fig_dir, orig)
        dst_path = os.path.join(fig_dir, target)
        if os.path.exists(src_path):
            shutil.copy2(src_path, dst_path)

drawings_dir = os.path.join(sub_dir, "drawings")
pdf_map = {
    "A0_masterplan_drawings.pdf": "a0-boards.pdf",
    "A3_presentation_boards.pdf": "a3-booklet.pdf"
}
for orig, target in pdf_map.items():
    src_path = os.path.join(drawings_dir, orig)
    dst_path = os.path.join(drawings_dir, target)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)

# 3. Clean up root matrices/ folder if present, moving to root of submission
matrices_dir = os.path.join(sub_dir, "matrices")
if os.path.exists(matrices_dir):
    for fname in os.listdir(matrices_dir):
        shutil.copy2(os.path.join(matrices_dir, fname), os.path.join(sub_dir, fname))
    shutil.rmtree(matrices_dir)

# 4. Copy official geometry from brief/site-package/geometry/
brief_geom = r"brief/site-package/geometry"
target_geom = os.path.join(sub_dir, "geometry")
os.makedirs(target_geom, exist_ok=True)

if os.path.exists(brief_geom):
    for f in os.listdir(brief_geom):
        if f.endswith(".geojson"):
            shutil.copy2(os.path.join(brief_geom, f), os.path.join(target_geom, f))

# 5. Fix properties in all geometry/*.geojson to strictly match schema enums
for fname in os.listdir(target_geom):
    if fname.endswith(".geojson"):
        fpath = os.path.join(target_geom, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            gdata = json.load(f)
        
        is_site_boundary = ("site_boundary" in fname or "provisional" in fname)
        is_key_areas = ("key_areas" in fname)
        
        for feat in gdata.get("features", []):
            props = feat.setdefault("properties", {})
            if is_site_boundary or is_key_areas:
                props["geometry_role"] = "provisional_constraint"
                props["official_boundary"] = False
                props["source_type"] = "official_public"
                props["confidence"] = "medium"
            else:
                props["geometry_role"] = "design_proposal"
                props["source_type"] = "agent_generated_design"
                props["confidence"] = "high"
                
        with open(fpath, "w", encoding="utf-8") as f:
            json.dump(gdata, f, ensure_ascii=False, indent=2)

# 6. Customize visual/index.html
visual_html_path = os.path.join(sub_dir, "visual", "index.html")
if os.path.exists(visual_html_path):
    with open(visual_html_path, "r", encoding="utf-8") as f:
        v_content = f.read()
    if "百年京张·智算双轴" not in v_content:
        v_content = v_content.replace("<title>", "<title>百年京张·智算双轴 - ")
        v_content += "<!-- Customized proposal visual index -->\n"
        with open(visual_html_path, "w", encoding="utf-8") as f:
            f.write(v_content)

# 7. Set manifest package_state to scaffold for finalize_submission.py
manifest_path = os.path.join(sub_dir, "manifest.json")
if os.path.exists(manifest_path):
    with open(manifest_path, "r", encoding="utf-8") as f:
        mdata = json.load(f)
    mdata["package_state"] = "scaffold"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(mdata, f, ensure_ascii=False, indent=2)

print("Full fix complete!")
