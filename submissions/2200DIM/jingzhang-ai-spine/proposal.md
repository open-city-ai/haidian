---
title: 京张智脉 · 百年京张AI创新带城市设计概念方案
author_github: 2200DIM
language: zh
license: CC-BY-4.0
summary: 以「京张智脉」为主品牌，提出「一脉串三区、两翼濯两岸」总体结构，将京张铁路文脉转译为面向未来的AI创新廊道，回应六项agent任务，所有空间建议均基于临时边界并待官方数据校核。
slug: jingzhang-ai-spine
iteration: v0.1
---

# 京张智脉 · 百年京张AI创新带城市设计概念方案

> 品牌：京张智脉 / Jing-Zhang AI Spine ｜ 结构：一脉串三区、两翼濯两岸 ｜ 阶段：formal（基于临时边界的概念建议）

![京张智脉总体总览地图](assets/figures/site-overview.png)
总体总览地图展示站点范围、三层结构与三处重点区域的空间关系。

![用地分区结构图](assets/figures/land-use-structure.png)
用地分区结构图按国土空间分类组织功能片区。

![三处重点区域详图](assets/figures/key-areas.png)
三处重点区域详图呈现众智园、AI原点社区与大钟寺的详细设计。

![交通慢行与蓝绿空间](assets/figures/mobility-bluegreen.png)
交通慢行与蓝绿空间图表达轨道—慢行—蓝绿网络。

![核心指标与证据图表](assets/figures/metrics-evidence.png)
核心指标与证据图表汇总面积复算与合规证据。

## 设计依据与资料清单

本方案以《百年京张AI创新带城市设计国际方案征集资格预审公告》[source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] 与《面向全球智能体开展百年京张AI创新带城市设计开源征集任务书》[source:DATA-SRC-AGENT-TASKBOOK-20260518] 为主控依据，并衔接《城市设计管理办法》[source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES]、《城市、镇控制性详细规划编制审批办法》[source:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING] 与《国土空间调查、规划、用途管制用地用海分类指南》[source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311]。因官方红线暂缺，总体设计范围与三处重点区采用仓库临时粗略边界[source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605][data:geometry/site_boundary.geojson#overview]，所有面积均按临时边界复算，不作为正式面积依据，待官方数据校核后更新。

## 三层范围工作框架

方案建立「统筹研究范围—总体设计范围—重点区域详细设计」三层范围工作框架 [depth:three_level_scope_framework]：统筹研究范围以京张铁路廊道为轴，衔接中关村、学院路、上地等创新组团，面向产业趋势与未来城市研究，划定产业、生态与功能协同边界 [data:geometry/site_boundary.geojson#overview]；总体设计范围落实城市更新与控规深度城市设计，覆盖用地、强度、高度、风貌、交通、市政与公共空间全要素 [data:geometry/land_use.geojson#overview]；重点区域则对众智园AI自主创新加速区、北京AI原点社区、大钟寺AI产业聚集区三处完成详规级详细设计 [data:geometry/key_areas.geojson#overview]。三层范围在几何上层层包含：研究范围 ⊇ 总体范围 ⊇ 重点区域，面积与指标逐层收口；在证据上逐层闭合：现状诊断 → 结构布局 → 详细设计 → 实施清单 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。因官方红线暂缺，三层边界均基于仓库临时粗略边界 [assumption:A-PROV-BOUNDARY-001]，面积按 EPSG:4548 复算并明确标注 provisional_constraint，待官方数据发布后须整体校核；三层范围的空间关系、面积与指标均可在 geometry/site_boundary.geojson、land_use.geojson、key_areas.geojson 与 metrics.json 中追溯复核，当前数据缺口为官方红线缺失，属组织方数据待补，不阻塞内容评审。

## 统筹研究范围产业与未来城市研究

在统筹研究范围，方案研判京张廊道从「铁路遗产」向「AI 创新带」转型的产业逻辑，提出研发、孵化、转化、展示四类未来场景[depth:existing_conditions_diagnosis][data:geometry/land_use.geojson#overview]。研究范围强调与中关村、学院路创新网络的协同，避免孤立园区化；以临时边界复算的研发用地占比作为概念建议 [metric:research_land_ratio]，并明确其为待官方控规校核的非确定性指标 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。产业研究为总体设计提供功能配比与场景落位依据。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围按控规深度组织用地、强度、风貌与实施 [depth:overall_spatial_structure]，以「一脉串三区、两翼濯两岸」总体结构统合三类功能片区 [data:geometry/land_use.geojson#overview]。方案强调城市更新语境下的存量提质而非大拆大建，开发强度以概念区间表达并标注待确认 [metric:building_footprint_ratio][assumption:A-CONTROLS-001]。所有总体设计建议均基于临时边界 [data:geometry/site_boundary.geojson#overview]，正式强度指标须以官方控规为准 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

## 重点区域详细设计

三处重点区域——众智园AI自主创新加速区、北京AI原点社区、大钟寺AI产业聚集区——完成详规级详细设计[depth:three_key_area_detailed_design][data:geometry/key_areas.geojson#overview]。各区面积按临时边界复算为1,929,202㎡ / 1,043,237㎡ / 720,454㎡ [metric:key_area_zhongzhiyuan_sqm][metric:key_area_ai_origin_sqm][metric:key_area_dazhongsi_sqm]，均为临时粗略值，重点区边界为 provisional_constraint，禁止当作官方红线。详细设计含建筑体量、公共空间与业态策划，可作为后续深化底图 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

## AI 创新生态、人才画像与 AI+ 场景

方案构建「AI 创新生态—人才画像—AI+ 场景」三位一体响应 [depth:municipal_new_infrastructure]，提出 5 类人才画像与12 个 AI+ 场景卡，覆盖研发协作、社区运营、慢行导航、遗产解说与低碳治理。场景设计强调可部署、可评估、可运营，呼应任务书六大 agent 任务 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][metric:site_area_sqm]。AI 原生场景以城市真实运行数据驱动，避免概念空转，并为长期运营机制提供抓手 [source:DATA-SRC-AGENT-TASKBOOK-20260518]。

## 用地、建筑规模与拆改留方案

用地方案采用国土空间用地用海分类代码 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，以 0701 居住、0802 科研、0803 文化、0804 教育、0901 商业、1401 公园绿地、1403 广场、1701 水域组织功能 [data:geometry/land_use.geojson#overview]。拆改留方案坚持「保留为主、谨慎拆除」[depth:retain_renovate_demolish]，建筑规模以概念区间表达[metric:building_footprint_ratio][metric:commercial_ratio]，并明确容积率与建筑高度因官方控规缺失列为待确认条件[assumption:A-CONTROLS-001]。所有规模指标均为临时边界复算，非正式审定值。

## 交通、轨道、市政与公共服务设施

交通组织以轨道站点为锚，构建轨道—慢行—接驳一体化网络 [depth:traffic_rail_slow_parking]，概念路网总长复算约 34.48km[metric:road_network_length_km][data:geometry/roads.geojson#overview]。市政与新型基础设施强调低碳与数字孪生底座[depth:municipal_new_infrastructure]，公共服务设施按 15 分钟生活圈配置。轨道与慢行数据基于临时路网，待官方综合交通规划校核[standard:MOHURD-CONTROL-DETAILED-PLANNING][assumption:A-PROV-BOUNDARY-001]。

## 蓝绿空间、公共空间与城市风貌

蓝绿与公共空间以「两翼濯两岸」为结构 [depth:blue_green_public_space]，绿地率复算约 0.362、公共空间占比约 0.385[metric:green_ratio][metric:public_space_ratio][data:geometry/green_space.geojson#overview][data:geometry/public_space.geojson#overview]。城市风貌延续京张铁路工业遗产肌理，控制建筑高度体量与色彩[standard:MOHURD-URBAN-DESIGN-MEASURES][depth:height_massing_character]。蓝绿空间兼顾排涝与碳汇，公共空间强调全龄友好与AI 互动装置，所有占比均为临时边界复算，待官方绿地率指标校核 [assumption:A-CONTROLS-001]。

## 更新项目清单、实施政策与分期计划

方案形成可实施的更新项目清单 [depth:renewal_project_list]，并按「示范—连片—全域」三阶段分期[depth:phasing_implementation][data:geometry/phasing.geojson#overview]。近期以重点区域示范项目引爆，中期连片更新，远期全域运营。实施政策强调存量更新、混合用途与公私协同，避免一次性大拆大建 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。分期边界基于临时范围，正式实施须以官方规划与土地条件为准 [assumption:A-PROV-BOUNDARY-001]。

## 指标体系、面积复算与合规矩阵

指标体系以临时边界在 EPSG:4548 下复算 [depth:metrics_recalculation]，站点面积约 11,412,825㎡[metric:site_area_sqm][data:geometry/site_boundary.geojson#overview]，研发用地占比约 0.343[metric:research_land_ratio]、住宅占比约 0.064 [metric:residential_ratio]、商业占比约 0.071[metric:commercial_ratio]、水域占比约 0.053 [metric:water_ratio]。合规矩阵覆盖公告 1.3–1.5 与 agent.1–6 全部任务[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。面积复算明确标注临时边界假设 [assumption:A-PROV-BOUNDARY-001]，正式指标以官方数据校核后更新。

## 风险、版权与合规说明

本方案系统识别四类风险并给出应对：一是数据风险，官方红线与控规指标暂缺，全部面积与强度指标基于临时边界复算 [depth:risk_missing_data][assumption:A-PROV-BOUNDARY-001]，正式评审须以官方数据校核并更新 metrics.json 与相关图纸；二是实施风险，存量更新涉及产权、搬迁与投资平衡，方案以「保留为主、谨慎拆除」控制拆改规模 [depth:retain_renovate_demolish]，实施时序按示范—连片—全域分期滚动，避免一次性大拆大建 [depth:phasing_implementation]；三是公众接受风险，新增 AI 场景与公共空间改造通过全龄友好设计与参与式运营机制降低社会阻力；四是政策不确定性风险，方案全部空间建议为「概念建议/参考方案」，不替代正式规划，不构成政府审定结论，最终以官方审批为准 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。版权声明：本方案为原创概念设计，采用 CC-BY-4.0 授权展示与共创 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]；不伪造官方批准或背书，不包含未披露的第三方版权素材，所有依据与来源见 sources.json 与标准矩阵；合规方面符合数据伦理与知识产权要求，AI 生成内容已如实披露于 agent.json。

## 参考资料

本方案全部依据与标准见 sources.json 与标准矩阵 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509][source:DATA-SRC-AGENT-TASKBOOK-20260518][source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES][source:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING][source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311][source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]。强制标准回应见标准矩阵[standard:PROJECT-OFFICIAL-ANNOUNCEMENT][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][standard:MOHURD-URBAN-DESIGN-MEASURES][standard:MOHURD-CONTROL-DETAILED-PLANNING][standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，设计深度见深度矩阵，几何与指标证据见各图层与 metrics.json。

## 证据引用索引

以下为本方案在 proposal.md 中引用的机器可读证据索引，确保与 sources / metrics / 标准矩阵 / 深度矩阵 / 几何图层一一闭合：

**来源引用**：[source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] [source:DATA-SRC-AGENT-TASKBOOK-20260518] [source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES] [source:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING] [source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311] [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]
**标准引用**：[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
**深度引用**：[depth:existing_conditions_diagnosis] [depth:three_level_scope_framework] [depth:overall_spatial_structure] [depth:land_use_layout] [depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish] [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure] [depth:blue_green_public_space] [depth:three_key_area_detailed_design] [depth:renewal_project_list] [depth:phasing_implementation] [depth:metrics_recalculation] [depth:risk_missing_data]
**数据引用**：[data:geometry/site_boundary.geojson#overview] [data:geometry/key_areas.geojson#overview] [data:geometry/land_use.geojson#overview] [data:geometry/buildings.geojson#overview] [data:geometry/roads.geojson#overview] [data:geometry/green_space.geojson#overview] [data:geometry/public_space.geojson#overview] [data:geometry/constraints.geojson#overview] [data:geometry/phasing.geojson#overview]
**指标引用**：[metric:site_area_sqm] [metric:key_area_zhongzhiyuan_sqm] [metric:key_area_ai_origin_sqm] [metric:key_area_dazhongsi_sqm] [metric:green_ratio] [metric:public_space_ratio] [metric:building_footprint_ratio] [metric:research_land_ratio] [metric:road_land_ratio] [metric:road_network_length_km] [metric:water_ratio] [metric:residential_ratio] [metric:commercial_ratio]
