---
title: "轨迹智环：百年京张 AI 创新公共脊"
author_github: "UPUP5013"
language: "zh"
license: "CC-BY-4.0"
summary: "以京张遗址公园为 AI 创新公共脊，联动众智园、AI 原点社区和大钟寺，形成可复核、可分期、可开源治理的城市设计方案。"
iteration: "v0.2"
---

# 轨迹智环：百年京张 AI 创新公共脊

![区域与边界示意：总体设计范围、研究范围与重点片区](assets/figures/site-overview.png)
![用地与空间结构示意：创新脊、慢行环与三类片区](assets/figures/land-use-structure.png)
![重点片区示意：众智园、AI 原点社区、大钟寺](assets/figures/key-areas.png)
![慢行蓝绿网络示意：京张遗址脊、东西补链与生态骨架](assets/figures/mobility-bluegreen.png)
![指标与分期示意：项目包、时序和关键数量指标](assets/figures/metrics-evidence.png)

本方案把百年京张从线性遗产空间升级为 AI 时代的公共创新基础设施。它不是把园区、社区和轨道站点简单串联，而是建立一条可步行、可骑行、可展示、可测试、可运营的城市公共脊，让 AI 产业、人才生活、遗产记忆、低碳市政和公共服务在同一套空间骨架中协同。方案中的面积、长度和数量均为设计目标，`metrics.json` 里给出可机器读取的指标，`self_check.json` 记录当前缺口，`proposal.md` 中所有几何引用都指向开源仓库临时边界，不把它解释为法定红线。[metric:research_area_sqm] [metric:overall_design_area_sqm] [metric:key_area_sqm] [depth:existing_conditions_diagnosis]

## 设计依据与资料清单
本方案依据 2026-05-09 的资格预审公告、open-city-ai/haidian 仓库的提交模板与官方临时边界文件整理而成。[source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] [source:DATA-SRC-OPEN-CITY-HAIDIAN] [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605] 目前公开包中没有官方 CAD/GIS/PDF 红线，也没有可直接用于报批的控规强度、高度、市政容量和产权边界，因此本稿把“可替换、可追溯、可复算”当成第一原则。文件清单包括 `metrics.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`、`self_check.json`、`geometry/*.geojson`、`report/proposal.html`、`report/narrative.md`、`report/copyright_statement.md`、`drawings/*.pdf` 和 `visual/index.html`。对应标准与任务覆盖已在矩阵中建立。[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

## 三层范围工作框架
统筹研究范围 43.6 平方公里，回答的是创新生态如何在更大城市系统中组织；总体设计范围 11.4 平方公里，回答的是京张遗址公园两侧如何形成连续公共界面；重点区域 368.4 公顷，回答的是三类样板片区如何落地。[metric:research_area_sqm] [metric:overall_design_area_sqm] [metric:key_area_sqm] [depth:three_level_scope_framework] 三层不是简单缩放，而是从战略、结构到项目包的证据链：研究层建立产业与未来城市的空间映射，设计层建立公共脊、慢行环和东西补链，实施层建立项目、政策和分期的耦合关系。[data:geometry/site_boundary.geojson#PROV-SITE-001]
在实际工作中，这意味着研究层必须先回答“谁来用、谁来投、谁来管”的问题，再回答空间排布；设计层必须先回答“哪里保留、哪里修补、哪里更新”的问题，再回答形态；实施层则必须把交通、公共服务、海绵设施、运营规则和资本节奏一起排进时间表。这样的框架让方案不只是一个视觉叙事，而是一个能被补充官方边界后继续推演的城市更新工具。[depth:land_use_layout]

## 统筹研究范围产业与未来城市研究
研究层采用“三心两翼一带”的组织逻辑：北部众智园承担全栈模型、基础软硬件和标准测试，中部 AI 原点社区承担高校成果转化和人才生活，南部大钟寺承担智能体经济、消费和国际路演；西翼联动高校院所，东翼联动成熟产业界面，一带则是贯通京张遗址的公共创新脊。[depth:overall_spatial_structure] 这个判断不是写概念，而是把研发、孵化、展示、服务和居住压到同一张图上，确保创新活动可以被公共空间承载、被轨道慢行支撑、被低碳设施服务、被治理规则解释。`visual/index.html` 的交互也按这一逻辑组织，点击节点即可看到不同阶段和功能。
为了让研究判断可复核，方案把研究范围拆成三种证据：一是临时边界和重点片区的几何证据，二是人群与产业的需求证据，三是公共空间和更新项目的实施证据。[data:geometry/buildings.geojson#BLDG-CONCEPT-001] [data:geometry/public_space.geojson#NET-RAIL-SPINE-001] 这些证据串起来以后，才知道是该增量开发、存量改造，还是先做公共界面与运营试点，而不是先画概念再补逻辑。

## 总体设计范围城市更新与控规深度城市设计
总体设计范围以京张遗址公园为主轴，重点解决遗产空间的连续性、站城联系和首层界面的公共性。[depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish] 沿遗址公园设置可步行、可骑行、可停留的公共脊，东西向通过补链消除线性空间割裂，并在轨道站点和校园边界上形成可进入、可停留、可运营的边缘空间。[data:geometry/roads.geojson#NET-SLOW-LOOP-001] 开发强度只作为目标管理，当前不替代法定 FAR 和高度控制；建筑群体用低层连续界面、中层共享平台和局部高点构成风貌节奏，而不是用单一塔楼定义场所。

## 重点区域详细设计
众智园 AI 自主创新加速区定位为全栈开源实验室，强调模型安全沙盒、标准测试、算力协同和开源发布；北京 AI 原点社区定位为近校成果转化街坊，强调小尺度更新、人才共享和低扰动界面；大钟寺 AI 产业集聚区定位为智能经济城市会客厅，强调站城一体、国际路演和夜间消费。[depth:three_key_area_detailed_design] [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] 三个片区之间不是并列拼贴，而是由公共脊串联成“源头研发-成果转化-城市应用”的闭环，功能互补、界面互见、运营互通。

## AI 创新生态、人才画像与 AI+ 场景
方案服务四类主要人群：模型研发与基础软件团队、校园成果转化团队、智能体和终端创业团队、周边居民与来访者。`metrics.json` 中的创新服务节点数量、AI 产业及服务建筑面积和人才居住容量只是能力目标，不是审批结论。[metric:innovation_service_nodes_count] [metric:ai_floor_area_sqm] [metric:talent_housing_units] AI+ 场景包括开放模型发布、算法安全评测、城市更新问答、智能慢行导航、低碳能源调度、遗产导览、适老服务和国际路演。节点不做成孤立展厅，而是嵌入首层街角、轨道口袋空间、公园驿站和园区共享大厅，让技术展示、公共服务和日常生活互相看见。[depth:blue_green_public_space]

## 用地、建筑规模与拆改留方案
用地结构采用 AI 混合创新、公共服务、人才居住、遗产公园和低碳市政五类复合方向。[data:geometry/land_use.geojson#PROV-KEY-003] 建筑规模目标为 AI 产业及服务约 180 万平方米、人才居住服务约 12000 套、优先活化更新约 68 公顷，但这些数值都应在官方边界和控规资料补齐后重新复算。[metric:ai_floor_area_sqm] [metric:talent_housing_units] 拆改留的原则是：沿京张遗址和成熟社区界面以保留修补为主，园区围墙和低效办公界面以混合改造为主，轨道节点具备条件的大地块以复合再开发为主，避免一次性大拆大建破坏创新生态和生活连续性。

## 交通、轨道、市政与公共服务设施
交通策略是“轨道到达、慢行组织、东西补链、停车减量”。京张遗产 AI 公共脊承担 10.8 公里南北慢行展示，人才慢行智环承担 16.2 公里日常通勤，十二条东西向补链缓解线性遗址对街区联系的切割。[metric:heritage_ai_spine_length_m] [metric:slow_loop_length_m] [metric:east_west_links_count] [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure] 市政与公共服务设施包括边缘算力驿站、低温余热回收、海绵铺装、共享会议厅、人才服务站、儿童友好和适老节点。轨道站点周边优先处理安全过街、非机动车秩序和首层连续性，让站城关系从“穿越式到达”转为“停留式到达”。[data:geometry/roads.geojson#NET-RAIL-SPINE-001]

## 蓝绿空间、公共空间与城市风貌
蓝绿策略以清河、京张遗址公园、口袋绿地和街道雨洪设施组成复合生态骨架。[data:geometry/green_space.geojson#PROV-RESEARCH-001] 公共空间分为遗产发布广场、AI 社区客厅、慢行驿站、站前共享界面和社区口袋花园五类，目标是让蓝绿空间不只是“绿化率”，而是可停留、可运营、可解释的城市公共性。[metric:blue_green_access_ratio] [depth:blue_green_public_space] 城市风貌避免单一科技园形象，采用低层连续界面、可停留首层、清晰导视、可夜间运营照明和尊重京张记忆的材料语言，让创新带同时具备首都 AI 产业雄心与海淀日常生活的烟火气。

## 更新项目清单、实施政策与分期计划
项目包分三期推进。[data:geometry/phasing.geojson#NODE-001] 0-2 年完成京张记忆发布广场、AI 原点成果街、众智园开源会客厅、大钟寺站慢行改善和可撤装 AI 公共服务设施；3-5 年推进重点更新地块、东西补链、清河低碳算力驿站和站城一体化；5-10 年形成完整南北公共脊、慢行智环和多主体运营平台。[depth:renewal_project_list] [depth:phasing_implementation] 政策上采用开源数据台账、公共收益清单、低扰动更新协议、首层开放激励和运营绩效回看，保证方案不是一次性图纸，而是可迭代治理工具。

## 指标体系、面积复算与合规矩阵
指标体系使用米和平方米作为机器可读单位，所有关键数值进入 `metrics.json` 并在自检中记录状态。[metric:adaptive_reuse_area_sqm] [metric:carbon_reduction_ratio] [depth:metrics_recalculation] 面积复算以临时边界给出示意值，正式提交前应替换官方红线并重新计算总体设计面积、重点片区面积、慢行长度、蓝绿可达率、建筑容量和市政承载。[data:geometry/constraints.geojson#PROV-SITE-001] 合规矩阵覆盖公告任务、Agent 开放征集任务和国家城市设计、控规与用地分类相关标准，并将缺失资料列入风险说明。[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]

## 风险、版权与合规说明
核心风险有三类：一是官方边界、控规强度和市政承载资料缺失，导致面积和容量不能作为审批依据；二是 AI 场景涉及数据隐私、算法安全和公共接受度，需要建立可解释、可关闭、可审计的城市服务机制；三是更新实施涉及产权、运营主体和阶段性资金，需要以低扰动试点逐步建立共识。[depth:risk_missing_data] 本包文字、图件和代码由 Agent 生成，未使用第三方图库；临时边界来源保留在 `sources.json`，版权声明见 `report/copyright_statement.md`。自检结论允许内容审阅，但不声称完成法定报批。
风险控制还包括两层合规动作：其一，所有现阶段图件必须显式标注为临时边界和设计目标，避免读者误把示意值当作审批值；其二，后续若补入官方资料，应优先替换边界、控规和市政承载，再重新计算面积、建筑规模和慢行网络长度。[data:geometry/buildings.geojson#BLDG-CONCEPT-001] [data:geometry/public_space.geojson#NET-RAIL-SPINE-001] 这也是 Agent 自检中把警告保留下来的原因。保留警告不是示弱，而是避免把不完整数据写成确定结论。

## 参考资料
参考资料包括 2026-05-09 北京市规划和自然资源委员会海淀分局公告、open-city-ai/haidian 仓库、仓库提交技能说明、临时边界文件和本地 validator 输出。[source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605] 方案响应所有任务编号，并在 `compliance_matrix.json`、`standard_matrix.json` 和 `design_depth_matrix.json` 中建立从任务、标准、深度、图纸、几何、指标到自检的交叉引用。所有引用均采用机器可检索标记，便于后续审查、增补官方资料和修订方案。

方案的实施原则是先公共后开发、先试点后固化、先数据台账后工程投资。每一项空间动作都对应一个可追踪文件：边界看 `geometry/site_boundary.geojson`，重点片区看 `geometry/key_areas.geojson`，用地和强度看 `geometry/land_use.geojson` 与 `metrics.json`，交通慢行看 `geometry/roads.geojson`，蓝绿公共空间看 `geometry/green_space.geojson` 和 `geometry/public_space.geojson`，分期看 `geometry/phasing.geojson`，风险看 `assumptions.json` 与 `self_check.json`。这样的文件组织方式使方案可以被人阅读，也可以被脚本审查。
