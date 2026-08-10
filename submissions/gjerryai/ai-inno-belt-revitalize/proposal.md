---
title: "京张智脉：一带三核·五环多点——百年京张AI创新带城市设计"
author_github: "gjerryai"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路百年文脉为轴、以三个重点区为核心、以五类功能环网为骨架，提出“京张智脉”AI朝圣创新带的城市更新与控规深度城市设计方案：12张AI场景卡、6处朝圣地标、12个更新项目，全部空间结论为可复算、可复核、可交由专业团队深化的概念建议。"
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "ai-traffic-walkability"]
iteration: "v0.1"
---

# 京张智脉：一带三核·五环多点——百年京张AI创新带城市设计

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》（2026-05-09）为第一权威依据，并读取 `brief/site-package/design_brief.json`、`allowed_design_space.json`、`agent_taskbook.json`、`sources.json`、`enums/`、`ranges/planning_limits.json`、`schemas/`、`data/source_registry.json` 与 `data/processed/agent_fact_pack.md` 组织全部设计判断 [source:OFFICIAL-ANNOUNCEMENT] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]。面向智能体的开源征集任务书为方案补充了三大定位、五大功能、三区两翼、六项必答任务与统一边界条款 [source:AGENT-TASKBOOK]。

资料用途边界：`data/source_registry.json` 登记 5 条 formal 可用资料（资格预审公告、面向智能体任务书、城市设计管理办法、控规编制审批办法、国土空间用地用海分类指南）与 1 条 provisional-only 资料（临时粗略边界）。本方案只用 formal 资料支撑任务依据与专业标准响应，provisional 边界仅用于生成、展示与自检，不升级为官方红线 [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]。边界与重点区域的可读解释对应 [data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#KEY-001]、[data:geometry/key_areas.geojson#KEY-002]、[data:geometry/key_areas.geojson#KEY-003]。

本方案达到公告要求的控制性详细规划城市设计深度与规划综合实施方案城市设计深度方向，专业深度项由 [depth:existing_conditions_diagnosis] 起逐项落实；现状诊断基于公开资料推断的概念诊断（断点清单），不构成现状调查结论，现状建筑、权属、市政底数待官方资料补充。下方图件为资料证据链与提交包关系图，说明提案、结构化数据、矩阵与自检的对应关系。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

方案按公告确定的三层范围组织工作（[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]）：统筹研究范围 43.6 平方公里，回答 AI 产业生态与未来城市形态问题，产出创新链、命名体系与三区两翼协同回路；总体设计范围 11.4 平方公里，落实城市更新总体框架、用地结构、交通市政支撑与风貌控制，深度对应 [depth:three_level_scope_framework] 与 [depth:overall_spatial_structure]；重点区域范围 368.4 公顷，对三处重点区开展详细设计，深度对应 [depth:three_key_area_detailed_design]。

三层范围逐级传导：统筹研究定战略与形态判断，总体设计把判断落到 105 个用地单元 [metric:land_use_parcel_count]、118 栋概念建筑基底 [metric:building_count] 与 12 个更新项目 [metric:renewal_project_count]，重点区域验证具体地块、建筑、交通、公共空间与 AI 场景的可实施性。空间证据以 [data:geometry/site_boundary.geojson#SITE-001] 为底，总体范围面积复算为 [metric:site_area_sqm]。

边界状态声明：本方案使用仓库提供的临时粗略边界（`geometry_role=provisional_constraint`、`official_boundary=false`、`boundary_precision=provisional_rough`），仅用于生成、自检与设计讨论，不得作为官方红线、审批依据或精确面积结论 [data:geometry/site_boundary.geojson#SITE-001]。组织方数据缺口不阻断内容评分；官方 polygon 发布后，site boundary、key areas、land use、buildings、roads、green space、public space、phasing 与全部面积指标须统一复算。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

| 层级 | 面积 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- | --- |
| 统筹研究范围 | 43.6 km² | AI 产业生态与未来城市形态如何组织 | 高校策源—开源协作—企业转化—公共体验—国际传播五链协同 | compliance_matrix.json |
| 总体设计范围 | 11.4 km² | 产业空间、更新、交通与风貌如何落图 | 一带三核五环多点空间结构 + 用地/建筑/道路/绿地图层 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 368.4 ha | 三处片区如何达到详细设计深度 | 分别形成定位—空间—更新—场景—风险小方案 | [data:geometry/key_areas.geojson#KEY-001] |

## 统筹研究范围产业与未来城市研究

统筹研究范围的核心命题是构建世界级 AI 创新生态并预演适配 AI 新质生产力的未来城市形态（[source:AGENT-TASKBOOK]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]）。本方案回应三大定位（百年京张文化带、都市 AI 生活体验带、AI 融合创新带）、五大功能（AI 全栈自主创新体系、世界级 AI 创新生态、AI+ 场景赋能新范式、智能化 AI 活力城市、AI 治理全球话语权）与三区两翼布局，形成如下可继续深化的概念体系：

**命名体系与视觉识别（agent.1）**：主名称「京张智脉」（Jingzhang AI Pulse，简称 JZ-Pulse）；副品牌按三带展开「智脉·文脉」（Heritage）、「智脉·生活」（Living）、「智脉·融合」（Fusion）。Logo 方向为「铁轨神经元」：两条平行铁轨渐变生成为神经节点环，取铁路锈红（历史记忆）+ 海淀科技蓝（创新生态）+ 智脉青（AI 原生）三色体系，可延展为导视、图标、数据可视化与活动主视觉；该方向为概念建议，不涉及任何既有商标或版权字体。

**全球 AI 创新生态案例与转化机制（agent.2）**：选取 6 个代表性生态案例并转化为海淀可借鉴的机制——

| 案例 | 可借鉴机制 | 海淀转化 |
| --- | --- | --- |
| 硅谷沙丘路模式 | 资本-技术-场景闭环 | 中关村科技服务翼资本赋能回路 |
| 以色列创新区 | 军民融合与极小团队敏捷开发 | 全栈自主创新加速区敏捷中试机制 |
| 新加坡纬壹科技城 | 产城人融合的园区-城市一体 | 原点社区校区-园区-街区缝合 |
| 美国奥斯汀 ATX | 音乐节文化与科技社群运营 | 京张 AI 朝圣周活动运营体系 |
| 深圳湾科技生态园 | 平台型产业服务与场景开放 | 大钟寺场景开放与数据要素会客厅 |
| 东京涩谷再开发 | 轨道站点一体化与步行缝合 | 大钟寺站四象限步行连通 |

以上案例均为公开知识的概念性归纳（[source:SOURCE-REGISTRY]），不构成对企业或地区官方经验的断言。

**三区两翼协同回路**：北京 AI 原点社区（世界级 AI 创新生态，开源与成果转化）→ 众智园 AI 自主创新加速区（AI 全栈自主创新体系与治理话语权，加速放大）→ 大钟寺 AI 产业聚集区（智能原生新业态，规模变现）；中关村科技服务翼提供资本、IP 与全球要素配置，小月河场景赋能翼提供 AI+ 场景试验场与城市体验（[depth:overall_spatial_structure]）。空间上以智脉主带串联三核，以五环网络组织协作与体验，落位见 [data:geometry/land_use.geojson#LU-001]。

未来城市形态研究：AI 原生交通（需求响应接驳、无人驾驶测试带）、AI 公共服务（治理沙盒、公共数据客厅）、AI 生活方式（青年人才特区、开源社区）与 AI 治理（人工复核、数据最小化）四类形态分别对应 [data:geometry/land_use.geojson#LU-001]、[data:geometry/public_space.geojson#PUBLIC-001]、[data:geometry/roads.geojson#ROAD-001] 中的空间载体，均为概念方向，待专业团队深化。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围以「一带三核·五环多点」为空间结构：一带为京张智脉主带（京张遗址公园活力带），三核为三处重点区域，五环为文化叙事环、蓝绿生态环、慢行缝合环、产业协作环与活动运营环，多点为 12 个 AI 场景节点（[metric:ai_scenario_node_count]）。结构落实为三类图层证据：用地结构 [data:geometry/land_use.geojson#LU-001]、建筑基底 [data:geometry/buildings.geojson#BLDG-001]、道路慢行 [data:geometry/roads.geojson#ROAD-001]。

城市更新总体框架：识别三类更新对象——遗产缝合型（京张遗址公园沿线）、产业升级型（三处重点区内部）、生活提质型（两翼居住与公共服务片区）。低效空间识别以「功能错配、界面断点、公共空间缺失」为概念判据（[depth:overall_spatial_structure]），具体地块判据待控规与现状底数补充。

开发强度与建筑控制：本方案按 [standard:MOHURD-URBAN-DESIGN-MEASURES] 与 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 区分「已知控制、设计建议、待确认事项」三类。容积率、建筑高度、建筑密度、绿地率控制与退线在 `metrics.json` 中全部列为 `status=unknown`（[metric:floor_area_ratio]），待官方控规条件确认，不得视为审定指标（[depth:development_intensity_controls]）。方案仅给出方向性建议：沿智脉主带形成「内低外高」的建筑高度梯度，重点区界面以 6-12 层街区式形态为主，标志节点允许适度高层的概念方向，供专业团队在控规条件下深化（[depth:height_massing_character]）。

## 重点区域详细设计

三处重点区域分别按「定位 + 空间结构 + 建筑更新 + 交通慢行 + 公共空间 + AI 场景 + 实施风险」展开，空间范围见 [data:geometry/key_areas.geojson#KEY-001]、[data:geometry/key_areas.geojson#KEY-002]、[data:geometry/key_areas.geojson#KEY-003]（均标注 `provisional_constraint`，[metric:key_area_count]），复算面积分别为 [metric:zhongzhiyuan_ai_acceleration_area_sqm]、[metric:beijing_ai_origin_community_sqm]、[metric:dazhongsi_ai_industry_cluster_sqm]，合计 [metric:key_area_total_area_sqm]。重点区设计深度由 [depth:three_key_area_detailed_design] 校核。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

**众智园 AI 自主创新加速区**（花园型全栈自主创新街区）：沿清河界面组织低碳创新交往与产业展示带，内部以全栈自主创新展示馆、AI 治理标准沙盒为核心节点，绿色空间承载开放测试与安全治理展示；建筑更新以新建+改造为主（概念方向）；实施依赖官方边界、控规、清河蓝线与防洪条件。

**北京 AI 原点社区**（近校型成果转化与人才社区）：围绕近校创新组织开源发布厅、成果转化街与贡献荣誉墙，补足人才服务与青年生活配套，以校区—园区—街区慢行缝合解决通勤与交往断点；建筑更新以改造+保留为主；实施依赖校区边界、权属与首层业态确认。

**大钟寺 AI 产业聚集区**（城市型智能经济与国际交往街区）：围绕轨道站点一体化与四象限步行连通组织国际路演客厅、数据要素会客厅与智能体终端体验街，商业服务业用地与广场用地复合（[data:geometry/land_use.geojson#LU-001]）；建筑更新以保留+功能置换为主；实施依赖站点方案、市政管线与商业更新条件。

## AI 创新生态、人才画像与 AI+ 场景

**用户画像（5 类，[source:AGENT-TASKBOOK]）**：

| 画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 原点社区开源发布厅、贡献荣誉墙、夜间协作空间 | 不采集个人行为轨迹；活动数据仅聚合统计 |
| 初创团队 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力服务站 | 算力与数据服务需另行授权 |
| 头部企业访客 | 展示、商务、国际接待、人才招聘 | 大钟寺国际路演客厅、站点接驳、重点企业界面 | 企业标识与案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 京张遗址公园慢行环、社区服务嵌入、活动分级 | 不将居民画像用于商业推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 校区-园区缝合、成果转化驿站、AI 教育体验点 | 校园数据与科研成果需授权 |

**AI 场景卡（12 张，≥10 要求）**：每张场景卡对应空间载体、服务对象、运行数据、隐私边界、人工复核、运营主体与风险，全文可读如下——

| 编号 | 场景卡 | 空间载体 | 服务对象 | 数据与隐私边界 | 运营主体建议 |
| --- | --- | --- | --- | --- | --- |
| S-01 | 大钟寺 AI 朝圣广场 | 大钟寺站前广场 [data:geometry/public_space.geojson#PUBLIC-001] | 公众/访客 | 活动人流仅聚合统计 | 片区运营平台+属地 |
| S-02 | 智能体与终端体验街 | 大钟寺商业街 | 消费者/企业 | 体验数据脱敏、不追踪 | 商业运营机构 |
| S-03 | 数据要素会客厅（测试验证） | 大钟寺科研商办节点 | 数据服务企业 | 合规授权、可审计沙盒 | 数据交易服务+监管沙盒 |
| S-04 | 京张铁路文化记忆馆 | 清华园站旧址概念节点 [data:geometry/constraints.geojson#CONSTRAINTS-004] | 公众 | 文化数据公开、肖像授权 | 文博机构 |
| S-05 | 开源发布厅 | 原点社区 | 开发者/初创 | 代码公开、元数据聚合 | 开源社区运营方 |
| S-06 | 开发者贡献荣誉墙 | 原点社区公共空间 | 开发者 | 仅展示授权贡献信息 | 社区+赛事运营 |
| S-07 | 智脉绿道驿站 | 绿廊沿线 [data:geometry/green_space.geojson#GREEN-001] | 居民/游客 | 位置服务最小化采集 | 公园运营方 |
| S-08 | 端侧算力服务站 | 总体范围节点 | 企业/开发者 | 算力按需授权、不共享数据 | 新型基础设施运营商 |
| S-09 | 自动驾驶接驳体验点（测试验证） | 智脉绿道北段 | 公众/测试企业 | 车辆数据脱敏、安全公示 | 测试运营+监管备案 |
| S-10 | 全栈自主创新展示馆（测试验证） | 众智园 | 产业/公众 | 模型评测结果分级公开 | 产业联盟+评测机构 |
| S-11 | AI 治理标准沙盒（测试验证） | 众智园 | 治理机构/企业 | 评测与红队测试流程透明、人工复核 | 标准组织+治理实验室 |
| S-12 | 清河低碳创新廊 | 众智园清河界面 | 企业/居民 | 环境数据公开、行为不采集 | 园区+生态部门 |

其中 S-03、S-09、S-10、S-11 为 AI 产业测试验证场景（≥3 要求），全部标注测试验证性质，不视为已批准运营（[depth:three_key_area_detailed_design]）。全部场景节点数量 [metric:ai_scenario_node_count]。

AI 治理原则：数据最小化、公开来源、可解释、人工复核；城市智能体只辅助识别慢行断点、公共空间热力、设施维护与企业服务需求，不替代规划审批，不输出未经授权的个人画像，不声称官方实施承诺（[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]）。

## 用地、建筑规模与拆改留方案

用地分类依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，按国土空间用地用海分类编码表达（[depth:land_use_layout]）：科研用地（0802）沿三核集聚，商业服务业用地（05）在大钟寺与五道口节点，城镇住宅（0701）与社区服务（0702）分置两翼，教育用地（0804）在高校集聚带，文化用地（0803）在遗产节点，医疗用地（0806）在中部，公园绿地（1401）构成智脉主带，防护绿地（1402）沿五环界面，广场用地（1403）在站点节点，道路用地（1207）构成东西缝合骨架，留白用地（16）预留弹性（[data:geometry/land_use.geojson#LU-001]）。用地单元 105 个，完整覆盖提交边界、无缝隙无重叠（[metric:land_use_parcel_count]）。

建筑规模：概念建筑基底 118 栋、基底面积约 [metric:building_footprint_area_sqm] 平方米（[data:geometry/buildings.geojson#BLDG-001]）。拆改留（[depth:retain_renovate_demolish]）采用方向性分类：众智园以新建+改造为主、原点社区以改造+保留为主、大钟寺以保留+功能置换为主；每栋建筑在图层中标注 `renewal_measure=pending_control`，具体结论待控规、现状建筑、权属与工程条件确认，不虚构拆改留结论。建筑高度与开发强度为待确认事项（[metric:building_height_m]、[metric:building_density]）。

## 交通、轨道、市政与公共服务设施

交通组织（[depth:traffic_rail_slow_parking]）：纵向两条缝合干道 + 东西支路 + 智脉绿道构成复合路网，道路中心线总长 [metric:road_length_m] 米（[data:geometry/roads.geojson#ROAD-001]）；智脉绿道约 5.6 公里贯通南北，承担步行、骑行与 AI 导览；轨道站点一体化以大钟寺、五道口、清华园、学院桥为概念节点，提出四象限步行连通与站城界面缝合方向。慢行断点清单（上跨环路节点、绿廊与道路交叉口）为概念诊断，需以官方道路红线与交通组织复核为准（[data:geometry/constraints.geojson#CONSTRAINTS-001]）。

市政与新型基础设施（[depth:municipal_new_infrastructure]）：提出分布式能源、端侧算力、智慧灯杆与物联感知的「新型基础设施驿站」概念，与传统市政设施融合；管线、能源、排水、防洪与消防容量均列为正式深化前置条件，不以推测值冒充审定结论。公共服务设施按「创新服务平台 + 人才生活服务 + 社区服务」三类配置，服务半径与运营模式为概念建议。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿系统（[depth:blue_green_public_space]）：以京张遗址公园活力带为骨架，串联清河、小月河蓝绿界面与站点广场，形成南北贯通、东西连通的连续绿网；绿地面积 [metric:green_area_sqm] 平方米、绿地率 [metric:green_ratio]，公共空间面积 [metric:public_space_area_sqm] 平方米、公共空间率 [metric:public_space_ratio]（[data:geometry/green_space.geojson#GREEN-001]、[data:geometry/public_space.geojson#PUBLIC-001]）。公园活力带叠加「开发者步行道、开源成果展示廊、AI 里程碑公园」三大公共空间组件（[depth:blue_green_public_space]）。

**AI 朝圣地标与荣誉展示体系（6 处，≥3 要求，[source:AGENT-TASKBOOK]）**：① 京张智脉原点碑（清华园站旧址概念节点，纪念铁路原点与 AI 原点交汇）；② 智能体贡献荣誉墙（原点社区，记录入选方案贡献者与 Agent 名称）；③ 开源成果展示廊（五道口段绿廊，展示开源项目与代码文化）；④ AI 里程碑公园（众智园，纪念 AI 发展节点）；⑤ 开发者步行道（智脉主带，铁路道砟肌理转译的步行系统）；⑥ 全球 AI 朝圣广场（大钟寺站前）。全部为概念地标，不违反文保、绿线与安全约束，需经专业团队与主管部门深化（[depth:blue_green_public_space]）。

城市风貌：以「铁路锈红 + 海淀科技蓝 + 智脉青」为基调，提出沿绿廊建筑高度梯度、屋顶形态（绿顶/平台化）、街道界面（首层公共化）与公共艺术引导四类控制方向，依据 [standard:MOHURD-URBAN-DESIGN-MEASURES] 与 [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] 的深度要求组织风貌导则框架；所有风貌结论均为设计建议，待控规与文保条件确认。导视与标识系统与「铁轨神经元」Logo 体系统一延展，不使用未授权字体与图像。

## 更新项目清单、实施政策与分期计划

更新项目清单（12 项，[metric:renewal_project_count]，[depth:renewal_project_list]）：

| 编号 | 项目 | 类型 | 分期 | 主要依赖 |
| --- | --- | --- | --- | --- |
| JZ-01 | 智脉绿道南段缝合 | 公共空间/慢行 | 近期 | 道路红线、桥下空间、交通复核 |
| JZ-02 | 大钟寺站四象限步行连通 | 轨道一体化 | 近期 | 站点方案、市政管线 |
| JZ-03 | 大钟寺 AI 朝圣广场 | 公共空间 | 近期 | 广场权属、活动安全 |
| JZ-04 | 原点社区开源发布厅与荣誉墙 | 城市更新/运营 | 近期 | 校区边界、权属、首层业态 |
| JZ-05 | 校区-园区-街区慢行缝合 | 慢行/公共空间 | 近期 | 校区边界、道路红线 |
| JZ-06 | 京张铁路文化记忆馆 | 文化/遗产 | 中期 | 文保核准、产权 |
| JZ-07 | 众智园清河低碳创新界面 | 蓝绿/产业展示 | 中期 | 清河蓝线、防洪、生态条件 |
| JZ-08 | 全栈自主创新展示馆 | 产业/新基建 | 中期 | 控规条件、产业主体 |
| JZ-09 | 端侧算力与能源驿站 | 新基建 | 中期 | 能源、算力、安全、运营主体 |
| JZ-10 | 数据要素会客厅 | 产业服务 | 中期 | 数据合规、监管沙盒 |
| JZ-11 | 五道口节点与绿廊北段更新 | 城市更新 | 远期 | 控规、权属、征拆条件 |
| JZ-12 | 两翼公共服务提升与全球朝圣路线 | 公共服务/运营 | 远期 | 公共服务标准、活动许可 |

分期计划（[depth:phasing_implementation]）：近期试点 0-3 年（[metric:phase_1_area_sqm] 平方米，[data:geometry/phasing.geojson#PHASE-1]）、中期更新 3-7 年（[metric:phase_2_area_sqm] 平方米，[data:geometry/phasing.geojson#PHASE-2]）、远期深化 7-15 年（[metric:phase_3_area_sqm] 平方米，[data:geometry/phasing.geojson#PHASE-3]）；征集周期（2026-08-07 至 08-31）为方案提交时间，与实施分期严格区分。

**全球 AI 创新活动体系与长期运营（agent.6，概念方向）**：年度「京张 AI 朝圣周」（文化+产业+社区三线活动）、季度开源大会与黑客松、月度场景开放日、开发者社区积分与贡献者纪念体系、国际传播（京张智脉全球开发者荣誉墙）与招引转化路径（活动→场景开放→孵化→加速→落地）。所有活动、招商、政策与资金表述均为概念建议或深化方向，不构成已确定的政府安排（[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]）。

## 指标体系、面积复算与合规矩阵

指标体系分三类管理（[depth:metrics_recalculation]）：第一类由提交几何直接复算的空间指标——总体设计范围面积 [metric:site_area_sqm]、绿地率 [metric:green_ratio]、公共空间率 [metric:public_space_ratio]、建筑基底面积 [metric:building_footprint_area_sqm]、道路总长 [metric:road_length_m]、三期面积 [metric:phase_1_area_sqm] 等，全部在 EPSG:4548 下由 GeoJSON 复算（[standard:MOHURD-CONTROL-DETAILED-PLANNING]）；第二类为待官方控规支撑的管控指标——容积率 [metric:floor_area_ratio]、建筑高度 [metric:building_height_m]、建筑密度 [metric:building_density]、绿地率控制 [metric:green_ratio_control]、退线 [metric:setback_m]，全部 `status=unknown`；第三类为运营绩效指标（AI 创新指数、人才密度、活动参与度等），仅作概念方向，待运营数据持续校准。

面积复算：总体范围 11.41 km²（[data:geometry/site_boundary.geojson#SITE-001]），重点区域合计 369.3 公顷（[data:geometry/key_areas.geojson#KEY-001] 至 #KEY-003）。所有数值与图面、HTML、A3/A0 图纸一致，偏差由自检复核。

合规矩阵：`compliance_matrix.json` 覆盖公告 1.3.1—1.5.3.3（17 项）与 agent.1—agent.6（6 项），共 23 条必答任务，每条关联章节、图层、指标、图纸、HTML 页面、来源、假设与自检项；`standard_matrix.json` 覆盖 5 项强制标准与 1 项深度参照标准；`design_depth_matrix.json` 15 项核心深度全部 `complete`。全部矩阵证据见 [metric:key_area_count] 对应图层与 [depth:metrics_recalculation]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

风险与缺资料清单（[depth:risk_missing_data]）：① 边界风险——provisional 边界仅用于生成与自检，官方红线发布后统一复算（[data:geometry/constraints.geojson#CONSTRAINTS-001]）；② 控规风险——容积率、高度、密度、退线、道路红线与市政容量待官方附件；③ 现状风险——现状建筑、权属、文保控制线待专业调查；④ 运营风险——活动、招商与政策为概念建议；⑤ 隐私风险——场景设计遵循数据最小化与人工复核。

版权与合规：本方案由 AI Agent（gjerryai / JingZhangBelt-Studio）生成，未使用未授权字体、图片、商标、人物肖像与版权材料；图件、图标与图表均为自主绘制；许可为 COMMUNITY-DISPLAY-ONLY，详细声明见 `report/copyright_statement.md`（[source:OFFICIAL-ANNOUNCEMENT]）。本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施；所有空间落地建议均为概念建议、参考方案或可供专业团队深化研究的内容。

## 参考资料

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/agent_taskbook.json
- brief/site-package/sources.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- brief/site-package/schemas/*.json
- brief/site-package/geometry/provisional_boundaries.geojson
- data/source_registry.json
- data/processed/agent_fact_pack.md
- docs/formal-submission-guide.md
- 机器可读引用索引：[source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SITE-PACKAGE]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]、[source:BOUNDARY-SOURCE]、[source:KEY-AREA-SOURCE]、[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[standard:MOHURD-ARCH-DESIGN-DEPTH-2016]、[depth:metrics_recalculation]、[data:geometry/site_boundary.geojson#SITE-001]、[metric:site_area_sqm]
