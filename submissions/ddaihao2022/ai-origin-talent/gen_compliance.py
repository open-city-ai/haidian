#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, os

# headings (must match proposal.md exactly)
H1="设计依据与资料清单"; H2="三层范围工作框架"; H3="统筹研究范围产业与未来城市研究"
H4="总体设计范围城市更新与控规深度城市设计"; H5="重点区域详细设计"
H6="AI 创新生态、人才画像与 AI+ 场景"; H7="用地、建筑规模与拆改留方案"
H8="交通、轨道、市政与公共服务设施"; H9="蓝绿空间、公共空间与城市风貌"
H10="更新项目清单、实施政策与分期计划"; H11="指标体系、面积复算与合规矩阵"
H12="风险、版权与合规说明"; H13="参考资料"
N1="全球案例对标"; N2="Logo 与视觉识别设计"; N3="AI 创新生态体系图谱"
N4="实施矩阵与测试验证场景"; N5="地标与荣誉展示体系"; N6="文化叙事与国际传播策略"
N7="年度活动体系与长期运营框架"; N8="无障碍包容性与隐私保护"

site="geometry/site_boundary.geojson"; key="geometry/key_areas.geojson"
land="geometry/land_use.geojson"; bldg="geometry/buildings.geojson"
road="geometry/roads.geojson"; green="geometry/green_space.geojson"
pub="geometry/public_space.geojson"; ph="geometry/phasing.geojson"
con="geometry/constraints.geojson"

M_site="site_area_sqm"; M_bldg="building_footprint_area_sqm"; M_green="green_ratio"
M_pub="public_space_ratio"; M_far="floor_area_ratio"; M_key="key_area_count"
M_comp="land_use_composition"

DR=["drawings/a3-booklet.pdf","drawings/a0-boards.pdf"]
SITE="SITE-PACKAGE"; SRCREG="SOURCE-REGISTRY"; FP="PROCESSED-FACT-PACK"
BS="BOUNDARY-SOURCE"; KA="KEY-AREA-SOURCE"; OA="OFFICIAL-ANNOUNCEMENT"; ATB="AGENT-TASKBOOK"
BT="BOUNDARY_TRUST"; KAT="KEY_AREAS_TRUST"; LUT="LAND_USE_TOPOLOGY"; VS="VISUAL_STATIC"
ASM=["A-CONTROLS-001"]

def r(rid, title, sec, gj, met, vis, src, sc):
    return {"requirement_id":rid,"title_zh":title,"mandatory":True,
            "report_sections":sec,"geojson_layers":gj,"metrics":met,
            "drawings":DR,"visual_sections":vis,"source_ids":src,
            "assumption_ids":ASM,"self_check_ids":sc}

reqs=[
 r("1.3.1","构建世界级AI创新生态体系",[H3,H6],[site],[M_site,M_key],["总览地图","任务覆盖"],[OA,ATB,FP],[BT,KAT]),
 r("1.3.2","建设适配AI新质生产力的新型城市形态",[H3,H7],[site,land],[M_site,M_green,M_pub,M_comp],["总览地图","核心指标"],[OA,ATB,BS],[LUT,VS]),
 r("1.3.3","打造全球AI创新人才向往的高品质城区",[H3,H6,N8],[site,pub,green],[M_site,M_pub,M_green],["总览地图","核心指标"],[OA,ATB,SITE],[BT,VS]),
 r("1.4.1","统筹研究范围",[H2,H3],[site],[M_site],["总览地图"],[SITE,FP,SRCREG],[BT]),
 r("1.4.2","总体设计范围",[H2,H4,H7],[site,land,bldg,road],[M_site,M_bldg,M_green,M_pub],["总览地图","核心指标"],[SITE,BS,KA],[BT,KAT,LUT]),
 r("1.4.3","重点区域范围",[H2,H5],[key,site],[M_site,M_key],["总览地图","任务覆盖"],[SITE,KA,BS],[KAT,BT]),
 r("1.5.1.1","统筹研究范围：AI创新生态体系",[H3,N3],[site],[M_site],["总览地图","生态图谱"],[OA,ATB,FP],[BT]),
 r("1.5.1.2","统筹研究范围：适配人工智能的未来城市形态",[H3,H6],[site,land],[M_site,M_green,M_pub,M_comp],["总览地图","核心指标"],[OA,ATB,BS],[LUT,VS]),
 r("1.5.2.1","总体设计范围：产业目标与功能布局",[H4,H7],[land,bldg,site],[M_site,M_bldg,M_comp],["总览地图","核心指标"],[SITE,BS,KA],[LUT,BT]),
 r("1.5.2.2","总体设计范围：城市更新总体框架",[H4,H10],[ph,site,bldg],[M_site,M_bldg,M_key],["任务覆盖"],[SITE,SRCREG,KA],[BT,KAT]),
 r("1.5.2.3","总体设计范围：交通轨道市政配套设施",[H8],[road,pub,con,site],[M_site,M_pub],["核心指标"],[SITE,BS,KA],[BT,VS]),
 r("1.5.2.4","总体设计范围：京张遗址公园活力带",[H9],[green,pub,site],[M_green,M_pub,M_site],["总览地图","核心指标"],[OA,SITE,BS],[BT,VS]),
 r("1.5.2.5","总体设计范围：城市风貌",[H9,N6],[site,key],[M_site,M_key],["总览地图","国际传播"],[OA,ATB,SITE],[BT,KAT]),
 r("1.5.3.required","重点区域范围详细设计必选项",[H5],[key,land,bldg,road,pub,green],[M_site,M_key,M_bldg,M_green,M_pub],["总览地图","任务覆盖","核心指标"],[SITE,KA,BS,ATB],[BT,KAT,LUT,VS]),
 r("1.5.3.1","众智园AI自主创新加速区",[H5],[key,land,green,road],[M_key,M_green,M_pub],["任务覆盖"],[KA,ATB,SITE],[KAT,LUT]),
 r("1.5.3.2","北京AI原点社区",[H5,H6],[key,land,pub,road],[M_key,M_pub,M_green],["任务覆盖"],[KA,ATB,SITE],[KAT,LUT]),
 r("1.5.3.3","大钟寺AI产业聚集区",[H5],[key,land,con,road],[M_key,M_bldg,M_pub],["任务覆盖"],[KA,ATB,SITE],[KAT,LUT]),
 r("agent.1","一带总体概念与功能统筹方案设计",[H2,N2],[site,key],[M_site,M_key],["总览地图"],[OA,ATB,SITE],[BT,KAT,VS]),
 r("agent.2","AI全栈自主创新体系与世界级AI创新生态设计",[H3,N3,N1],[site],[M_site],["总览地图","任务覆盖","生态图谱"],[ATB,OA,FP],[BT]),
 r("agent.3","AI+场景赋能新范式与智能化AI活力城市设计",[H6,N4],[key,pub,road,green],[M_key,M_pub,M_green],["任务覆盖","核心指标"],[ATB,SITE,KA],[KAT,VS]),
 r("agent.4","AI公共空间、智能原生新业态与朝圣地标设计",[H9,N5],[pub,green,key],[M_pub,M_green,M_key],["总览地图","核心指标"],[SITE,ATB,KA],[KAT,VS]),
 r("agent.5","百年京张文化、中关村文化与AI新文化融合叙事设计",[H9,N6],[site,green],[M_site,M_green],["总览地图","国际传播","生态图谱"],[OA,ATB,FP],[BT,KAT]),
 r("agent.6","一带全球AI创新活动体系与长期运营设计",[H10,N7,N1],[ph,site,key],[M_site,M_key],["任务覆盖","总览地图","活动运营"],[SITE,ATB,SRCREG],[BT,KAT]),
 # extra theme-specific requirements covering talent / privacy / governance / ops scope
 r("ext.1","人才特区、开源协作与公共参与机制",[H6,N8,N7],[key,pub,site],[M_key,M_pub,M_site],["任务覆盖","核心指标"],[ATB,SITE,SRCREG],[KAT,VS]),
 r("ext.2","智能体治理、数据隐私与合规边界",[H12,N8,N4],[con,site],[M_site],["核心指标"],[SRCREG,ATB,SITE],[BT,VS]),
 r("ext.3","国际传播、荣誉体系与全球AI活动运营",[N6,N5,N7],[site,key],[M_site,M_key],["国际传播","活动运营","任务覆盖"],[ATB,OA,SITE],[KAT,VS]),
 r("ext.4","全球案例对标与方法论",[N1,N3],[site],[M_site],["总览地图","生态图谱"],[OA,FP,SITE],[BT]),
]

# uniqueness assertion
seen={}
for x in reqs:
    t=(tuple(x["report_sections"]),tuple(x["geojson_layers"]),tuple(x["metrics"]),
       tuple(x["visual_sections"]),tuple(x["source_ids"]),tuple(x["self_check_ids"]))
    seen.setdefault(t,[]).append(x["requirement_id"])
dups=[v for v in seen.values() if len(v)>1]
assert not dups, f"DUPLICATE MAPPINGS: {dups}"
assert len(reqs)>=23, len(reqs)

doc={"schema_version":"0.1.0","requirements":reqs}
out=os.path.join(os.path.dirname(os.path.abspath(__file__)),"compliance_matrix.json")
json.dump(doc,open(out,"w",encoding="utf-8"),ensure_ascii=False,indent=2)
print("wrote",out,"requirements=",len(reqs),"duplicates=",len(dups))
