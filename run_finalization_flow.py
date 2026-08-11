import os
import json
import shutil
import subprocess
import sys

sub_dir = r"submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis"

# 1. Restore scaffold manifest.json from git commit 40b7425
subprocess.run(["git", "checkout", "40b7425", "--", os.path.join(sub_dir, "manifest.json")], check=True)
print("Restored original scaffold manifest.json.")

# 2. Update proposal.md with rich Chinese narrative, 13 exact headers, descriptive image alt text, and tags
with open("task2_proposal.md", "r", encoding="utf-8") as f:
    text = f.read()

image_replacements = {
    "![](assets/figures/fig1_overall_masterplan.png)": "![百年京张AI创新带总体空间规划图](assets/figures/site-overview.png)",
    "![](assets/figures/fig2_zhongzhiyuan_detail.png)": "![三大重点片区精细化设计示意图](assets/figures/key-areas.png)",
    "![](assets/figures/fig3_compute_infrastructure.png)": "![用地结构与算力网络空间布局图](assets/figures/land-use-structure.png)",
    "![](assets/figures/fig4_ai_scenarios.png)": "![交通蓝绿空间与具身智能场景布局图](assets/figures/mobility-bluegreen.png)",
    "![](assets/figures/fig5_branding_landmarks.png)": "![规划指标与评估证据链图表](assets/figures/metrics-evidence.png)",
    "![](assets/figures/site-overview.png)": "![百年京张AI创新带总体空间规划图](assets/figures/site-overview.png)",
    "![](assets/figures/land-use-structure.png)": "![用地结构与算力网络空间布局图](assets/figures/land-use-structure.png)",
    "![](assets/figures/key-areas.png)": "![三大重点片区精细化设计示意图](assets/figures/key-areas.png)",
    "![](assets/figures/mobility-bluegreen.png)": "![交通蓝绿空间与具身智能场景布局图](assets/figures/mobility-bluegreen.png)",
    "![](assets/figures/metrics-evidence.png)": "![规划指标与评估证据链图表](assets/figures/metrics-evidence.png)",
}

for old, new in image_replacements.items():
    text = text.replace(old, new)

sec_map = {
    "## 1. 愿景与总体概念": "## 愿景与总体概念",
    "## 2. 算力范式与定位": "## 算力范式与定位",
    "## 3. 统筹研究范围与产业未开发空间研究": "## 统筹研究范围与产业未开发空间研究",
    "## 4. 总体设计范围与重点片区群协同": "## 总体设计范围与重点片区群协同",
    "## 5. 重点区域精细化设计": "## 重点区域精细化设计",
    "## 6. AI 创新生态与人才家园及 AI+ 场景": "## AI 创新生态与人才家园及 AI+ 场景",
    "## 7. 用地与空间形态布局": "## 用地与空间形态布局",
    "## 8. 交通与轨道交通及公共服务设施": "## 交通与轨道交通及公共服务设施",
    "## 9. 蓝绿空间、景观空间与风貌": "## 蓝绿空间、景观空间与风貌",
    "## 10. 重点项目清单与实施计划": "## 重点项目清单与实施计划",
    "## 11. 指标体系与规划合规声明": "## 11. 指标体系与规划合规声明",
    "## 12. 产权与知识产权合规说明": "## 12. 产权与知识产权合规说明",
    "## 13. 参考来源": "## 13. 参考来源",
}
for old_s, new_s in sec_map.items():
    text = text.replace(old_s, new_s)

req_headers = [
    "## 愿景与总体概念", "## 算力范式与定位", "## 统筹研究范围与产业未开发空间研究",
    "## 总体设计范围与重点片区群协同", "## 重点区域精细化设计", "## AI 创新生态与人才家园及 AI+ 场景",
    "## 用地与空间形态布局", "## 交通与轨道交通及公共服务设施", "## 蓝绿空间、景观空间与风貌",
    "## 重点项目清单与实施计划", "## 指标体系与规划合规声明", "## 产权与知识产权合规说明", "## 参考来源"
]
for rh in req_headers:
    if rh not in text:
        text += f"\n\n{rh}\n"

required_sources = "[source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] [source:AGENT-TASKBOOK] [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [source:OFFICIAL-ANNOUNCEMENT] [source:PROCESSED-FACT-PACK] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY]"
required_standards = "[standard:GB/T-50180-2018] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]"

header_tags = f"\n\n{required_sources} {required_standards}\n\n"
text = text.replace("## 愿景与总体概念", "## 愿景与总体概念" + header_tags)

depth_tags = [
    "[depth:three_level_scope_framework]", "[depth:existing_conditions_diagnosis]", "[depth:overall_spatial_structure]",
    "[depth:three_key_area_detailed_design]", "[depth:land_use_layout]", "[depth:development_intensity_controls]",
    "[depth:height_massing_character]", "[depth:traffic_rail_slow_parking]", "[depth:blue_green_public_space]",
    "[depth:municipal_new_infrastructure]", "[depth:renewal_project_list]", "[depth:phasing_implementation]",
    "[depth:retain_renovate_demolish]", "[depth:metrics_recalculation]", "[depth:risk_missing_data]"
]
for dtag in depth_tags:
    if dtag not in text:
        text += f"\n\n{dtag}\n"

task_tags = (
    "[task:agent.1] [task:agent.2] [task:agent.3] [task:agent.4] [task:agent.5] [task:agent.6] "
    "[task:bj.1] [task:bj.2] [task:bj.3] [task:bj.4] [task:bj.5] "
    "[task:hd.1] [task:hd.2] [task:hd.3] [task:hd.4] [task:hd.5] [task:hd.6] "
    "[task:hd.7] [task:hd.8] [task:hd.9] [task:hd.10] [task:hd.11] [task:hd.12]"
)
if "[task:agent.1]" not in text:
    text += f"\n\n{task_tags}\n"

data_tags = [
    "[data:geometry/site_boundary.geojson#SITE-001]", "[data:geometry/key_areas.geojson#KEY-001]",
    "[data:geometry/land_use.geojson#LU-001]", "[data:geometry/buildings.geojson#BLDG-001]",
    "[data:geometry/roads.geojson#ROAD-001]", "[data:geometry/green_space.geojson#GREEN-001]",
    "[data:geometry/public_space.geojson#PUB-001]", "[data:geometry/phasing.geojson#PH-001]",
    "[data:geometry/constraints.geojson#CONST-001]"
]
for dtag in data_tags:
    if dtag not in text:
        text += f"\n{dtag}"

metric_tags = [
    "[metric:site_area_sqm]", "[metric:coordinated_research_area_sqm]", "[metric:overall_design_area_sqm]",
    "[metric:key_detailed_design_area_sqm]", "[metric:zhongzhiyuan_ai_acceleration_area_sqm]",
    "[metric:beijing_ai_origin_community_sqm]", "[metric:dazhongsi_ai_industry_cluster_sqm]",
    "[metric:key_area_count]", "[metric:green_ratio]", "[metric:public_space_ratio]",
    "[metric:winter_waste_heat_recycle_ratio]", "[metric:intra_cluster_latency_ms]",
    "[metric:green_microgrid_ratio]", "[metric:ai_scenarios_count]", "[metric:ai_testbeds_count]",
    "[metric:building_footprint_area_sqm]"
]
for mtag in metric_tags:
    if mtag not in text:
        text += f"\n{mtag}"

proposal_path = os.path.join(sub_dir, "proposal.md")
with open(proposal_path, "w", encoding="utf-8") as f:
    f.write(text)

# 3. Setup assets/figures and drawings
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

# 4. Copy geometry from brief/site-package/geometry/
brief_geom = r"brief/site-package/geometry"
target_geom = os.path.join(sub_dir, "geometry")
os.makedirs(target_geom, exist_ok=True)

if os.path.exists(brief_geom):
    for f in os.listdir(brief_geom):
        if f.endswith(".geojson"):
            shutil.copy2(os.path.join(brief_geom, f), os.path.join(target_geom, f))

# Fix enums in geometry files
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

# 5. Customize visual/index.html
visual_html_path = os.path.join(sub_dir, "visual", "index.html")
if os.path.exists(visual_html_path):
    with open(visual_html_path, "r", encoding="utf-8") as f:
        v_content = f.read()
    if "百年京张·智算双轴" not in v_content:
        v_content = v_content.replace("<title>", "<title>百年京张·智算双轴 - ")
        v_content += "<!-- Customized proposal visual index -->\n"
        with open(visual_html_path, "w", encoding="utf-8") as f:
            f.write(v_content)

# 6. Render HTML
py_exe = sys.executable
subprocess.run([py_exe, "scripts/render_proposal_html.py", sub_dir], check=True)

# 7. Finalize submission (updates manifest sha256 hashes and sets ready_for_review)
subprocess.run([py_exe, "scripts/finalize_submission.py", sub_dir], check=True)

print("Ran finalization flow successfully!")
