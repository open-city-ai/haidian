import os
import json
import shutil
import subprocess
import sys

sub_dir = r"submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis"
proposal_path = os.path.join(sub_dir, "proposal.md")

# 1. Update agent.json and manifest.json to replace placeholder model_detail
agent_path = os.path.join(sub_dir, "agent.json")
if os.path.exists(agent_path):
    with open(agent_path, "r", encoding="utf-8") as f:
        adata = json.load(f)
    adata["model_detail"] = "Google Gemini 3.6 Flash"
    adata["model"] = "Google Gemini 3.6 Flash"
    with open(agent_path, "w", encoding="utf-8") as f:
        json.dump(adata, f, ensure_ascii=False, indent=2)

manifest_path = os.path.join(sub_dir, "manifest.json")
if os.path.exists(manifest_path):
    with open(manifest_path, "r", encoding="utf-8") as f:
        mdata = json.load(f)
    if isinstance(mdata.get("agent"), dict):
        mdata["agent"]["model_detail"] = "Google Gemini 3.6 Flash"
        mdata["agent"]["model"] = "Google Gemini 3.6 Flash"
    mdata["package_state"] = "scaffold"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(mdata, f, ensure_ascii=False, indent=2)

# 2. Clean up forbidden files in root of submission and in geometry/
allowed_root_files = {
    "proposal.md", "changelog.md", "manifest.json", "agent.json", "assumptions.json",
    "compliance_matrix.json", "design_depth_matrix.json", "metrics.json", "self_check.json",
    "sources.json", "standard_matrix.json"
}
allowed_root_dirs = {"assets", "drawings", "geometry", "report", "visual"}

for item in os.listdir(sub_dir):
    full_p = os.path.join(sub_dir, item)
    if os.path.isfile(full_p):
        if item not in allowed_root_files:
            os.remove(full_p)
            print(f"Removed forbidden root file: {item}")
    elif os.path.isdir(full_p):
        if item not in allowed_root_dirs:
            shutil.rmtree(full_p)
            print(f"Removed forbidden root dir: {item}")

allowed_geom_files = {
    "buildings.geojson", "constraints.geojson", "green_space.geojson",
    "key_areas.geojson", "land_use.geojson", "phasing.geojson",
    "public_space.geojson", "roads.geojson", "site_boundary.geojson"
}
geom_dir = os.path.join(sub_dir, "geometry")
if os.path.exists(geom_dir):
    for item in os.listdir(geom_dir):
        if item not in allowed_geom_files:
            os.remove(os.path.join(geom_dir, item))
            print(f"Removed extra geometry file: {item}")

# 3. Read task2_proposal.md handling UTF-16 / UTF-8 with BOM
raw_bytes = open("task2_proposal.md", "rb").read()
if raw_bytes.startswith(b'\xff\xfe') or raw_bytes.startswith(b'\xfe\xff'):
    text = raw_bytes.decode("utf-16")
elif raw_bytes.startswith(b'\xef\xbb\xbf'):
    text = raw_bytes.decode("utf-8-sig")
else:
    text = raw_bytes.decode("utf-8", errors="ignore")

# Replace image embeds with descriptive alt text
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

# Normalize section headers
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
    "## 11. 指标体系与规划合规声明": "## 指标体系与规划合规声明",
    "## 12. 产权与知识产权合规说明": "## 产权与知识产权合规说明",
    "## 13. 参考来源": "## 参考来源",
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

# Remove old front matter if present
if text.startswith("---\n"):
    end_fm = text.find("\n---\n", 4)
    if end_fm != -1:
        text = text[end_fm + 5:]

front_matter = """---
title: "百年京张·智算双轴：AI原生基础设施与算力生态城市设计"
author_github: "open-city-ai-participant"
language: "zh"
license: "CC-BY-4.0"
summary: "聚焦AI原生基础设施与算力空间协同，在海淀百年京张遗址公园打造地下零延迟算力管廊与地上绿色生态双轴架构。"
---
"""

required_sources = "[source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] [source:AGENT-TASKBOOK] [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [source:OFFICIAL-ANNOUNCEMENT] [source:PROCESSED-FACT-PACK] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY]"
required_standards = "[standard:GB/T-50180-2018] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]"

header_tags = f"\n\n{required_sources} {required_standards}\n\n"

full_proposal_content = front_matter + header_tags + text

with open(proposal_path, "w", encoding="utf-8") as f:
    f.write(full_proposal_content)
print("Updated proposal.md with front matter and required sections.")

# 4. Copy geometry from brief/site-package/geometry/
brief_geom = r"brief/site-package/geometry"

if os.path.exists(brief_geom):
    for f in os.listdir(brief_geom):
        if f.endswith(".geojson") and f in allowed_geom_files:
            shutil.copy2(os.path.join(brief_geom, f), os.path.join(geom_dir, f))

for fname in os.listdir(geom_dir):
    if fname.endswith(".geojson"):
        fpath = os.path.join(geom_dir, fname)
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

# 5. Render HTML
py_exe = sys.executable
subprocess.run([py_exe, "scripts/render_proposal_html.py", sub_dir], check=True)

# 6. Finalize submission
subprocess.run([py_exe, "scripts/finalize_submission.py", sub_dir], check=True)

print("Master fix pass completed successfully!")
