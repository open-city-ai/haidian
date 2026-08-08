---
title: "京张·开源智轨带：城市级AI总线与智能体共治的城市设计建议"
author_github: "qian-123456"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路遗址公园为城市级AI总线（OPENRAIL），将铁轨转译为数字轨道、车站转译为算力与社区复合节点、三处重点区转译为三个可进化的AI试验场，构建一带三核两翼多节点的开源智轨城市结构，服务百年京张文化带、都市AI生活体验带与AI融合创新带三大定位。"
tracks: ["ai-origin-community", "jingzhang-heritage-narrative", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "ai-health-service-navigation", "ai-cultural-guide", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v0.1"
---

# 京张·开源智轨带：城市级AI总线与智能体共治的城市设计建议

> 本方案为面向百年京张AI创新带开源征集的**概念性城市设计建议**。所有空间落地建议均为概念建议、参考方案或可供专业团队深化研究的材料，不替代正式规划，不构成政府审定结论。官方边界与控规条件缺失期间，全部几何与面积以 `provisional` 标注并在官方数据到位后重算。

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [source:OFFICIAL-ANNOUNCEMENT]，以《面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录》为面向智能体的任务依据 [source:AGENT-TASKBOOK]，并读取 `brief/site-package/` 全部必读输入 [source:SITE-PACKAGE]、`data/source_registry.json` [source:SOURCE-REGISTRY] 与 `data/processed/agent_fact_pack.md` [source:PROCESSED-FACT-PACK] 建立来源与缺口清单。

边界与重点区使用仓库维护者登记的临时粗略 polygon [source:BOUNDARY-SOURCE][source:KEY-AREA-SOURCE]：`geometry/site_boundary.geojson#SITE-001` 为总体设计范围（公告约 11.4 平方公里，本包复算 [metric:site_area_sqm] 平方米），`geometry/key_areas.geojson#KEY-001`、`#KEY-002`、`#KEY-003` 为三处重点区。官方面积值以 `planning_limits.json` 为准 [source:PLANNING-LIMITS]，六项专业标准以仓库本地快照为强制依据 [source:STANDARDS-LIBRARY]，其中城市设计统筹依据 [standard:MOHURD-URBAN-DESIGN-MEASURES]、控规口径依据 [standard:MOHURD-CONTROL-DETAILED-PLANNING]、用地分类依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、设计深度依据 [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]，项目主控依据 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 与 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

- 资料边界：正式可用资料 5 条、背景 0 条、provisional-only 1 条（见 [source:SOURCE-REGISTRY] 摘要）。provisional 边界只用于生成、展示与临时自检，不得作为 official redline、审批依据或精确面积依据。
- 深度框架：现状诊断 [depth:existing_conditions_diagnosis]、三层范围 [depth:three_level_scope_framework]、总体空间结构 [depth:overall_spatial_structure]、用地布局 [depth:land_use_layout]、强度控制 [depth:development_intensity_controls]、风貌体量 [depth:height_massing_character]、拆改留 [depth:retain_renovate_demolish]、交通慢行 [depth:traffic_rail_slow_parking]、市政设施 [depth:municipal_new_infrastructure]、蓝绿公共空间 [depth:blue_green_public_space]、重点区详细设计 [depth:three_key_area_detailed_design]、项目清单 [depth:renewal_project_list]、分期实施 [depth:phasing_implementation]、指标复算 [depth:metrics_recalculation]、风险缺数据 [depth:risk_missing_data] 覆盖正式提交要求。
- 证据链：正文引用 `[source:]`、`[standard:]`、`[depth:]`、`[data:geometry/...]`、`[metric:指标名]` 五种机器可读引用，与 `sources.json`、`assumptions.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` 对应。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

公告确立统筹研究范围（约 43.6 平方公里）、总体设计范围（约 11.4 平方公里）与重点区域范围（约 368.4 公顷）三层工作框架 [source:OFFICIAL-ANNOUNCEMENT][standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。本方案按三级递进组织：

| 层级 | 官方约面积 | 本包表达 | 证据落点 |
| --- | ---: | --- | --- |
| 统筹研究范围 | 43.6 km² | 产业生态、三区两翼与未来城市形态研究 | [depth:overall_spatial_structure]、[metric:international_case_study_count] |
| 总体设计范围 | 11.4 km² | 一带三核两翼多节点总体结构与用地/交通/蓝绿 | [data:geometry/site_boundary.geojson#SITE-001]、[depth:land_use_layout] |
| 重点区域范围 | 368.4 ha | 众智园、AI原点社区、大钟寺详细设计 | [data:geometry/key_areas.geojson#KEY-001]、[metric:key_area_count] |

三层范围不是割裂图纸，而是“产业战略—总体城市设计—重点区详细设计”的逐级落实链 [depth:three_level_scope_framework]。当前全部范围 polygon 均为 provisional（[source:BOUNDARY-SOURCE][source:KEY-AREA-SOURCE]），面积复算仅用于讨论（[metric:zhongzhiyuan_area_sqm]、[metric:ai_origin_community_area_sqm]、[metric:dazhongsi_area_sqm]）；官方 polygon 到位后，site boundary、key areas、land use、buildings、roads、green/public space、phasing 与全部指标均需重算 [assumption:A-BOUNDARY-001][depth:metrics_recalculation]。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 总体概念：OPENRAIL 开源智轨带

本方案提出「京张·开源智轨带 OPENRAIL AI BELT」：把京张铁路遗址公园重构为**城市级 AI 总线**——铁轨是数据与场景流动的数字轨道，车站是算力与社区复合节点，三处重点区是三个可进化的 AI 试验场，两翼是生态服务翼。命名体系：OPEN（开源共创）＋ RAIL（京张铁路），中文「开源智轨」对应「开源生态 + 智能轨道」；Logo 方向为“双轨＋代码括号＋节点圆点”，并把「1909→2026→∞」百年时间线作为品牌延展基因 [source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。概念回应三大定位（百年京张文化带、都市AI生活体验带、AI融合创新带）与五大功能（AI全栈自主创新体系、世界级AI创新生态、AI+场景赋能新范式、智能化AI活力城市、AI治理全球话语权），并落实为总体空间结构 [depth:overall_spatial_structure]。

### 三区两翼协同回路

- **众智园（北）＝算力谷 Compute Valley**：AI 全栈自主创新与治理实验，承载开源模型基座、智算中心与 AI 治理实验室，对应 [data:geometry/key_areas.geojson#KEY-001]、[depth:three_key_area_detailed_design]。
- **AI 原点社区（中）＝原点站 Origin Station**：开源策源与开发者社区，清华园车站旧址为精神原点，对应 [data:geometry/key_areas.geojson#KEY-002]。
- **大钟寺（南）＝智感站 Sense Gateway**：智能原生新业态与消费体验试验场，对应 [data:geometry/key_areas.geojson#KEY-003]。
- **中关村科技服务翼**：资本、IP、数据要素与科技服务支撑，形成要素全球化配置回路。
- **小月河场景赋能翼**：AI+场景测试、公共体验与慢行网络，形成场景开放回路。

三区沿带串联、两翼东西支撑，形成“高校策源—开源协作—企业转化—公共体验—国际传播”的创新链 [source:AGENT-TASKBOOK]。

### 全球 AI 创新生态案例（6 个）

本方案从 6 个可公开核实的全球案例提炼可转化经验 [metric:international_case_study_count][depth:industry_space_mapping 对应本包 land_use 映射]：波士顿肯德尔广场（研究—孵化—资本同城闭环）、伦敦国王十字（交通枢纽与创新街区一体更新）、苏黎世智慧街区（公共空间承载创新交往）、新加坡榜鹅数字园区（开源数据与测试场景开放）、杭州云栖小镇（开发者社区驱动的产业集聚）与首尔数字媒体城（文化内容与科技融合）。经验转化路径写入 [metric:land_use_research_area_sqm] 对应的科研用地组织、公共空间网络与运营机制 [depth:overall_spatial_structure]。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围以「一带三核两翼多节点」为空间结构 [depth:overall_spatial_structure]：一带为京张活力带（数字总线＋蓝绿慢行主轴，[metric:rail_corridor_length_m] 米概念绿道）；三核为三处重点区；两翼为中关村科技服务翼与小月河场景赋能翼；多节点为轨道站复合节点、AI 场景节点与朝圣地标 [metric:ai_landmark_count]。总体设计覆盖用地布局 [depth:land_use_layout]、开发强度 [depth:development_intensity_controls]、风貌体量 [depth:height_massing_character] 与拆改留策略 [depth:retain_renovate_demolish]。

用地布局以 `geometry/land_use.geojson` 表达，共 [metric:land_use_polygon_count] 个概念分区，覆盖 [metric:site_area_sqm] 平方米全范围，无缝隙、无重叠 [data:geometry/land_use.geojson#LU-001]：科研用地 [metric:land_use_research_area_sqm] 平方米、居住用地 [metric:land_use_residential_area_sqm] 平方米、商业服务用地 [metric:land_use_commercial_area_sqm] 平方米、教育用地 [metric:land_use_education_area_sqm] 平方米、公园绿地 [metric:land_use_green_area_sqm] 平方米、道路用地 [metric:land_use_road_area_sqm] 平方米、留白用地 [metric:land_use_reserved_area_sqm] 平方米。留白用地用于未来算力与测试设施弹性供给。控规条件（容积率、高度、密度、绿地率、退线）因官方附件缺失而按 missing 处理 [source:PLANNING-LIMITS]，本方案不声明审定强度值，相关指标列于风险章节 [depth:development_intensity_controls][assumption:A-CONTROLS-001]。

建筑体量为概念体块 [data:geometry/buildings.geojson#B-0001]，建筑基底合计 [metric:building_footprint_area_sqm] 平方米、建筑密度 [metric:building_density]，用于讨论空间供给而不构成工程结论 [depth:height_massing_character]。

## 重点区域详细设计

三个重点区分别达到“定位＋空间结构＋建筑更新＋交通慢行＋公共空间＋AI场景＋实施风险”的可读小方案深度 [depth:three_key_area_detailed_design]，边界均标注 provisional（[source:KEY-AREA-SOURCE]）。

### 众智园 AI 自主创新加速区（约 [metric:zhongzhiyuan_area_sqm] 平方米）

定位「算力谷」：面向 AI 全栈自主创新与治理实验。空间结构为“智算核＋开源基座集群＋治理实验室环” [data:geometry/key_areas.geojson#KEY-001]；建筑更新以存量园区改造与新建试验场并重；交通依托北五环与清河侧接驳；公共空间以中央绿轴串联；AI 场景覆盖大模型训练合规沙箱、算力调度可视化、开源数据集市；实施风险为算力能耗、用电与审批依赖，列为待确认事项 [assumption:A-CONTROLS-001]。

### 北京 AI 原点社区（约 [metric:ai_origin_community_area_sqm] 平方米）

定位「原点站」：开源策源地与开发者社区，清华园车站旧址为精神原点 [data:geometry/key_areas.geojson#KEY-002][data:geometry/constraints.geojson#CONST-HER-01]。空间结构为“原点广场＋开源街巷＋社区客厅”；更新以微更新与功能置换为主；慢行强化五道口—清华东路步行联系；公共空间包括清华园车站AI原点广场 [data:geometry/public_space.geojson#PUBLIC-002] 与五道口开源之心广场 [data:geometry/public_space.geojson#PUBLIC-003]；场景覆盖开源社区活动、AI人才公寓配套与开发者日；风险为文保控制范围需官方图层确认 [depth:risk_missing_data]。

### 大钟寺 AI 产业聚集区（约 [metric:dazhongsi_area_sqm] 平方米）

定位「智感站」：智能原生新业态与消费体验试验场。空间结构为“智感综合体＋站城复合节点＋试验街区” [data:geometry/key_areas.geojson#KEY-003]；更新以功能升级与公共空间重塑为主；依托大钟寺站打造轨道—慢行—商业复合接驳 [data:geometry/roads.geojson#ROAD-001]；公共空间包括大钟寺智感广场 [data:geometry/public_space.geojson#PUBLIC-001]；场景覆盖无人配送试点、AI导览与智能零售；风险为商业活力与交通组织依赖后续专业评估。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

### 用户画像（5 类）

- 开发者与开源贡献者：需要低成本算力、社区空间与测试环境。
- AI 初创与科研团队：需要孵化、融资对接、场景开放与合规服务。
- 高校师生：需要产学研共研、实习实训与公共实验平台。
- 企业与机构员工：需要高品质公共空间、通勤慢行与生活配套。
- 居民与访客：需要可体验的 AI 服务、文化叙事与夜间活力。

画像对应 [metric:user_persona_count] 类，映射到公共空间、人才公寓、社区服务与场景节点 [depth:overall_spatial_structure]。

### AI 场景卡（12 张）

本方案提供 12 张 AI 场景卡 [metric:ai_scenario_card_count]，其中 3 张为产业测试验证场景 [metric:ai_industry_test_scenario_count]：

1. 开源算力预约平台（开发者）｜2. 大模型训练合规沙箱（产业测试）｜3. 算力调度可视化大屏（公共体验）｜4. 智能交通信号与慢行优先（AI+交通，对应 [data:geometry/roads.geojson#ROAD-001]）｜5. 医疗健康服务导航（AI+医疗）｜6. AI文化导览（京张铁路历史叙事，对应 [metric:rail_corridor_length_m] 绿道）｜7. 教育科研共研空间（AI+教育）｜8. 法律与政策问答助手（AI+法律）｜9. 生活服务超级应用（AI+生活服务）｜10. 机器人低速配送试点（产业测试，对应 [data:geometry/roads.geojson#ROAD-009]）｜11. 公共空间AI巡检与安全复核（产业测试）｜12. 智能零售与无人店（大钟寺智感站）。

每张场景卡均包含：空间位置（关键节点/片区）、服务对象（画像）、运行数据来源、隐私边界、人工复核机制、运营主体、可视化图层与风险说明 [source:AGENT-TASKBOOK][depth:blue_green_public_space]。场景不依赖任何非公开数据或指定供应商，测试场景明确为概念试点、非已批准运营 [assumption:A-OPS-001][depth:risk_missing_data]。

## 用地、建筑规模与拆改留方案

用地结构见 `geometry/land_use.geojson` 与图 land-use-structure [data:geometry/land_use.geojson#LU-002]。拆改留分类 [depth:retain_renovate_demolish]：

- **保留**：清华园车站旧址等文保对象 [data:geometry/constraints.geojson#CONST-HER-01]、现状高校与成熟社区；
- **改造**：存量园区（众智园）、社区配套与轨道站点周边；
- **拆除/新建**：仅以概念方式提出针对低效地块的更新试验场，须以官方现状与权属资料复核 [assumption:A-CONTROLS-001]。

建筑规模以概念体块表达（[metric:building_footprint_area_sqm] 平方米基底、[metric:building_density] 密度），总建筑面积与容积率因控规缺失列为 unknown（[metric:floor_area_ratio]、[metric:total_floor_area_sqm]、[metric:building_height_m] 均待官方数据）[source:PLANNING-LIMITS][depth:development_intensity_controls]。

## 交通、轨道、市政与公共服务设施

交通以“两纵干路＋横向连接＋绿道主轴＋站点接驳”组织 [data:geometry/roads.geojson#ROAD-001][depth:traffic_rail_slow_parking]：沿带设置东西两纵集散干路与片区横向连接，京张活力带绿道为主轴 [metric:road_length_m] 米道路中心线、[metric:rail_corridor_length_m] 米绿道。轨道站复合节点（清华园车站、五道口、大钟寺站）承担“轨道—慢行—社区—AI服务”一体化接驳。市政与新型基础设施提出分布式能源、端侧算力与感知网络融合的概念策略 [depth:municipal_new_infrastructure]；公共服务依托社区服务用地与公共空间组件库配置，具体承载需专业测算 [assumption:A-CONTROLS-001]。

## 蓝绿空间、公共空间与城市风貌

京张活力带为南北主轴，串联清河（北）与中段公园，形成 [metric:green_ratio] 的绿地率与 [metric:public_space_ratio] 的公共空间率（[metric:green_space_area_sqm] 平方米绿地、[metric:public_space_area_sqm] 平方米公共空间）[data:geometry/green_space.geojson#GS-006][data:geometry/public_space.geojson#PUBLIC-001][depth:blue_green_public_space]。公共空间组件库包含广场、街巷、社区客厅与测试展示场地四类 [source:AGENT-TASKBOOK]。

**AI 朝圣地标（4 个）** [metric:ai_landmark_count]：清华园车站AI原点（文保+开源精神原点）、五道口开源之心（开发者社区地标）、大钟寺智感场（智能原生消费地标）、清河智脉起点（全栈创新门户），各对应公共空间节点 [data:geometry/public_space.geojson#PUBLIC-004]。风貌控制沿“铁轨—街区—天际线”组织，以中低强度、通透街区与工业遗产语汇为基调 [depth:height_massing_character]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 更新项目清单、实施政策与分期计划

以 12 个概念更新项目组织实施 [metric:renewal_project_count]，覆盖：原点社区微更新、清华园车站文化活化、五道口站城一体化、开源开发者社区、智算中心选址预留、AI治理实验室、大钟寺站城复合改造、无人配送试点街区、绿道中段贯通、清河门户公园、社区客厅网络与算力人才公寓 [depth:renewal_project_list]。

分期实施以 `geometry/phasing.geojson` 表达 [data:geometry/phasing.geojson#P1][depth:phasing_implementation]：

- **P1 近期（2026–2028）**：AI原点社区与中段活力带示范，面积约 [metric:phasing_near_term_area_sqm] 平方米；
- **P2 中期（2029–2031）**：众智园全栈创新加速区与大钟寺试验场，面积约 [metric:phasing_mid_term_area_sqm] 平方米；
- **P3 远期（2032–2035）**：中段缝合与北段科教联动带，面积约 [metric:phasing_long_term_area_sqm] 平方米，共 [metric:phasing_phase_count] 期。

实施政策与长期运营：年度「开源智轨周」活动体系、开发者社区运营、AI场景开放机制、公共体验路线与国际传播招引转化机制均按概念建议与深化方向表述 [source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]，不构成已确定政府安排 [assumption:A-OPS-001]。

## 指标体系、面积复算与合规矩阵

全部面积与比例指标在 EPSG:4548 下从 geometry 复算 [depth:metrics_recalculation]。核心指标证据链：总体面积 [metric:site_area_sqm]；绿地 [metric:green_space_area_sqm] / [metric:green_ratio]；公共空间 [metric:public_space_area_sqm] / [metric:public_space_ratio]；建筑 [metric:building_footprint_area_sqm] / [metric:building_density]；道路 [metric:road_length_m]；绿道 [metric:rail_corridor_length_m]；用地分区 [metric:land_use_polygon_count] 且按代码统计科研 [metric:land_use_research_area_sqm]、居住 [metric:land_use_residential_area_sqm]、商业 [metric:land_use_commercial_area_sqm]、教育 [metric:land_use_education_area_sqm]、绿地 [metric:land_use_green_area_sqm]、道路 [metric:land_use_road_area_sqm]、留白 [metric:land_use_reserved_area_sqm]；重点区数量 [metric:key_area_count] 且三区面积 [metric:zhongzhiyuan_area_sqm]、[metric:ai_origin_community_area_sqm]、[metric:dazhongsi_area_sqm]；分期 [metric:phasing_phase_count] 期面积 [metric:phasing_near_term_area_sqm]、[metric:phasing_mid_term_area_sqm]、[metric:phasing_long_term_area_sqm]；主题成果计数：场景卡 [metric:ai_scenario_card_count]、测试场景 [metric:ai_industry_test_scenario_count]、画像 [metric:user_persona_count]、朝圣地标 [metric:ai_landmark_count]、更新项目 [metric:renewal_project_count]、国际案例 [metric:international_case_study_count]。控规类指标（[metric:floor_area_ratio]、[metric:total_floor_area_sqm]、[metric:building_height_m]）因官方条件缺失为 unknown。

合规覆盖见 `compliance_matrix.json`（公告 1.3–1.5 与 agent.1–agent.6 全部必答）、`standard_matrix.json`（六项标准）与 `design_depth_matrix.json`（15 项深度全 complete）；`visual/index.html` 展示值与 `metrics.json` 一致。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

- **数据与边界**：官方 polygon、控规、现状地块/建筑、交通市政底数缺失（详见 `brief/site-package/missing-data.md`），全部以 provisional/unknown 处理并在官方数据到位后重算 [assumption:A-CONTROLS-001][assumption:A-BOUNDARY-001][depth:risk_missing_data]。
- **版权与合规**：本包仅使用公开或清权来源（[source:OFFICIAL-ANNOUNCEMENT][source:AGENT-TASKBOOK] 等），不使用非公开资料、不虚构官方背书；Logo 与品牌方向为原创概念，未使用未授权字体、图片、商标或人物肖像；引用规范见 `report/copyright_statement.md`。
- **AI 生成责任**：本包由 AI 智能体基于公开材料生成，生成方法与限制在 `agent.json`、`assumptions.json` 与 `sources.json` 中披露；最终判断由人类与专业团队完成 [source:AGENT-TASKBOOK]。
- **禁止性表述**：方案不包含控规调整结论、具体地块拆改留法定判断、工程可行性测算、土地权属或投资承诺；所有活动、招商与政策内容均为概念建议 [assumption:A-OPS-001]。

## 参考资料

本方案依据的公开与清权来源、站点包与标准快照见 [source:OFFICIAL-ANNOUNCEMENT][source:AGENT-TASKBOOK][source:SITE-PACKAGE]，机器可读引用与矩阵文件一一对应 [depth:metrics_recalculation]。

- `brief/site-package/design_brief.json`、`agent_taskbook.json`、`allowed_design_space.json`、`sources.json`、`enums/`、`ranges/planning_limits.json`、`standards/standards.json`、`visual_style_recommendations.json`、`schemas/`、`geometry/provisional_boundaries.geojson`
- `data/source_registry.json`、`data/processed/agent_fact_pack.md`、`docs/data-workflow.md`
- `templates/proposal.md`、`docs/formal-submission-guide.md`
- 官方公告：[https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/tzgg/hd/202605/t20260509_4643047.html](https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/tzgg/hd/202605/t20260509_4643047.html)
- `report/copyright_statement.md`
