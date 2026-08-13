---
title: "京张午间服务线 / Jing-Zhang Noonline SLA"
author_github: "Rainyy-Yan"
language: "zh"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以午间科研通勤、校园园区步行和地铁园区最后一公里为抓手，把京张遗址公园周边公共空间转化为可审计的午间服务等级网络。"
iteration: "v2.0"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
tracks: "ai-traffic-walkability,ai-public-services,civic-agent-governance"
scenarios: "ai-traffic-walkability,enterprise-service-copilot,public-safety-operations-review,robot-delivery-low-speed,ai-cultural-guide,ai-health-service-navigation"
---
# 京张午间服务线 / Jing-Zhang Noonline SLA

本方案不把“AI创新带”理解成一组更炫的显示屏，而是把京张遗址公园周边最容易被忽略的日常时段拿出来设计：工作日 11:30-14:30 的午间通勤、午休、会面、访客抵达和跨园区短距离移动。Noonline SLA 的含义是“午间在线感知 + 离线兜底服务等级”：AI 可以预测热、雨、拥挤、绕行和服务排队，但公共空间必须同时提供看得见的阴影、座椅、饮水、导向、人工帮助和无障碍替代路径 [source:DATA-SRC-AGENT-TASKBOOK-20260518] [standard:BARRIER-FREE-ENVIRONMENT-LAW]。

这个方向回应了前期扫描中的一个空白：已有方案中已经有遮荫、气候适应、季节线和“是否好走”的成熟讨论，因此本方案避免复用“凉行”等相近命名，把重点转到可复核的服务等级、午间运营、人工兜底和行业测试场景。人群依据也保持克制：海淀七普显示 2020 年全区 15-59 岁人口占 69.7%，60 岁及以上占 18.5%，大专及以上人口占 56.5%，外来常住人口占 35.7%；这只说明服务对象高度多元，不能推出场地内部某类人群占主导 [source:EXT-SRC-HAIDIAN-CENSUS-20210608]。

![京张午间服务线总览图，显示临时边界、三处重点片区、午间服务主线和人工兜底节点](assets/figures/site-overview.png)

## 设计依据与资料清单

方案依据分成三层。第一层是官方公告和站点包，提供项目名称、三层范围、约 11.4 平方公里总体设计面积、三处重点片区和正式成果深度；第二层是智能体任务书，提出命名、AI生态、场景卡、用户画像、朝圣地标、文化叙事和长期运营要求；第三层是公开规范和政策快照，用来界定城市设计、控规深度、用地分类、生成式AI服务治理和无障碍人工兜底边界 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] [source:DATA-SRC-AGENT-TASKBOOK-20260518] [standard:MOHURD-URBAN-DESIGN-MEASURES]。

本地空间文件使用仓库提供的临时粗略边界作为生成与展示约束。`geometry/site_boundary.geojson` 和 `geometry/key_areas.geojson` 已明确标注为 provisional constraint，不能被解释为官方红线、道路红线、地籍边界或精确面积依据；官方 CAD/GIS 发布后，本方案的面积、图纸和 HTML 指标需要整套复算 [data:geometry/site_boundary.geojson#SITE-001] [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]。

新增的外部人群资料只使用海淀区公开七普公报。它的使用范围是“区级背景画像”：说明海淀不是单一科研园区，而是青年科研人员、通勤访客、外来常住人口、儿童、老年人和无障碍需求共同出现的高复杂度城区；它不参与边界、面积、客流或场地内部人口指标计算 [source:EXT-SRC-HAIDIAN-CENSUS-20210608] [assumption:A-CENSUS-SCOPE-001]。

## 三层范围工作框架

统筹研究范围约 43.6 平方公里，承担“午间服务系统如何成为AI创新带公共基础设施”的策略研究：把高校、科研院所、园区、社区、轨道站点和京张遗址公园看作连续的日常使用网络，而不是只看三处重点片区的孤立更新 [depth:three_level_scope_framework] [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]。

总体设计范围约 11.4 平方公里，是 Noonline SLA 的空间试验场。方案不新增道路几何，而是在既有 `ROAD-001` 午间主脊和图件表达上组织三类 SLA 路径：SLA-A 的设计目标是连续停留主线，Target SLA = A，但当前 Engine Verified SLA = B；SLA-B 管横向短接驳，SLA-C 管站点到园区触点。三类路径分别解决跨园区午餐、科研会面、地铁到园区、访客抵达和短时休憩问题 [data:geometry/roads.geojson#ROAD-001] [metric:noon_sla_corridor_count]。

重点区域范围约 368.4 公顷，由众智园AI自主创新加速区、北京AI原点社区和大钟寺AI产业集聚区组成。三处片区在方案中不是同质化复制：北段偏“研发与验证”，中段偏“原点展示与开放社区”，南段偏“消费商务与到访服务”；所有片区边界仍为临时粗略范围 [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]。

## 统筹研究范围产业与未来城市研究

京张午间服务线的产业逻辑，是把“AI企业服务”从会议室里拉到城市界面上：园区团队需要午间会面、临时办公、外宾接待、设备演示、合规咨询和场景测试，城市则需要可被公众理解的AI公共价值。Noonline SLA 把这些需求合并为服务等级，但等级不由纯 AI 打分形成，而由可观察空间条件形成：有没有连续遮阴、能不能坐、能不能喝水、能否进入公共空间或服务点、过街是否有等待位置、夏季绕行是否被控制、是否看得见人工兜底 [depth:overall_spatial_structure] [metric:noon_service_node_count]。

全球案例不直接复制空间形态，而提取机制：Kendall Square 的高校企业近邻、Toronto Waterfront 的数据治理争议、Paris Rive Gauche 的铁路廊道再开发、Singapore one-north 的研发生活复合、Seoul Digital Media City 的展示消费界面、London King’s Cross 的更新运营，以及 Shenzhen Hetao 的跨境协同，都提示本项目需要“场景开放 + 公共合规 + 日常体验”并行，而不是只做产业楼宇 [source:DATA-SRC-AGENT-TASKBOOK-20260518]。

未来城市研究的重点是“低侵入式AI”。本方案不使用人脸、个人手机轨迹、支付记录或未清权企业运营资料，而用公开天气预警、设备状态、服务工单、匿名客流级别、人工巡查和用户自愿反馈形成运营闭环；涉及生成式内容的导览、问答和活动推荐，需要保留投诉、纠错和人工复核通道 [standard:GENERATIVE-AI-INTERIM-MEASURES] [assumption:A-PRIVACY-001]。

## 总体设计范围城市更新与控规深度城市设计

总体结构为“一线、三段、十二点、五个兜底站”。一线是京张遗址公园及其两侧慢行服务主线；三段对应北部研发验证段、中部原点社区段和南部消费商务段；十二点是午间服务节点；五个兜底站把导向、无障碍咨询、人工问路、应急饮水和活动日秩序服务放到可见位置 [data:geometry/public_space.geojson#PUBLIC-001] [metric:human_fallback_node_count]。

十二个服务节点的选址规则是“起终点、换向点、停留点、过街点、公共入口点、热雨风险点”六类优先，而不是平均撒点。五个人工兜底点从十二点中选取，优先放在三段转换、轨道接驳、重点公共入口和活动日人群汇合处；它们解释为概念选址规则和图面表达，不是现状设施统计 [metric:noon_service_node_count] [assumption:A-MICROCLIMATE-001]。

城市设计深度控制采用“建议而非法定结论”的写法。用地分区、建筑界面、更新项目和服务节点都作为专业团队后续深化的参考方案，不能替代控规调整、容积率、建筑高度、道路红线、桥隧或市政容量论证 [standard:MOHURD-CONTROL-DETAILED-PLANNING] [assumption:A-CONTROLS-001]。

方案的AI原生特征在于把空间变成可审计的服务合约：每个节点都可记录“有无阴影、是否可坐、是否有饮水、是否有离线说明、是否可人工介入、是否适合轮椅与推车”，AI只负责预测、排程和提示，最终的公共服务质量由可见设施和人工巡查兑现 [depth:development_intensity_controls] [metric:public_space_ratio]。

![用地与午间服务结构图，显示四类概念用地和服务等级分区](assets/figures/land-use-structure.png)

## 重点区域详细设计

众智园AI自主创新加速区建议作为“午间验证北段”：服务线优先连接研发楼、实验服务、开放测试和轨道接驳，把午餐、短会、样机演示和外部评审安排在可步行的低速界面。独有空间动作有三项：研发楼首层外设置可短会的遮阴等候界面；在开放测试入口前设置可撤回的样机展示与人工登记点；把轨道接驳方向的过街等待和座椅饮水组织成午间验证门廊。这里的设计成果是样板化的服务节点组件库，不是具体建筑拆改结论 [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design]。

北京AI原点社区建议作为“可被看见的AI公共客厅”：设置AI原点驿站、模型透明橱窗、京张记忆界面和午间开放课堂，把中关村创新文化、京张铁路叙事和AI公共治理放在同一个可解释空间里。独有空间动作有三项：在公共入口形成双语固定导向和人工问询前场；把模型透明橱窗与可坐停留面并置，避免只看屏幕不停留；把京张记忆界面接入午间步行路线，让国际访客无手机也能读懂原点叙事。这里尤其适合承接访客导览、国际交流和公众问答的人工兜底 [data:geometry/key_areas.geojson#PROV-KEY-002] [metric:pilgrimage_node_count]。

大钟寺AI产业集聚区建议作为“南部午间消费与商务服务段”：强化地铁到园区、商务楼到餐饮、活动人群到公共空间的短时连接。独有空间动作有三项：在站点到园区的出口方向设置清晰的遮阴排队和问询点；把商务楼首层服务界面与午间座椅、饮水、轻消费串联；在活动日把公共空间边缘作为可人工疏导的临时缓冲带。相关发布、路演和社群活动仍是可能的运营设想，不写成确定招商或运营安排 [data:geometry/key_areas.geojson#PROV-KEY-003] [source:DATA-SRC-AGENT-TASKBOOK-20260518]。

![三处重点片区差异化设计图，显示北段验证、中段原点和南段商务服务](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

五类用户画像用于校核服务，而不是推断场地人口占比。第一类是高校和园区青年研发者，需要短时协作和低成本会面；第二类是来访企业与投资服务人员，需要可解释的抵达和展示路径；第三类是周边居民和亲子使用者，需要安全、遮阴和不被技术排斥的公共空间；第四类是老年人与无障碍需求者，需要线下说明、人工帮助和连续座椅；第五类是国际访客，需要中英文一致导向和清晰的公共合规说明 [source:EXT-SRC-HAIDIAN-CENSUS-20210608] [metric:persona_count]。

十张AI+场景卡分别是：午间舒适导航、实验室访客抵达、开放测试预约、无障碍慢行复核、AI原点公共问答、京张文化导览、活动日人流分级、低速机器人配送窗口、午间安全巡查、开发者快闪课堂。每张卡都必须同时标注空间载体、数据来源、人工兜底和禁止使用的个人数据类型 [metric:scenario_card_count] [standard:GENERATIVE-AI-INTERIM-MEASURES]。

三个行业测试验证场景是：热舒适服务等级试验、低速机器人与步行共处试验、活动日导览与拥挤分级试验。它们都是可撤回、可人工接管、可被公众投诉纠错的开放测试，不是已批准运营，不依赖指定厂商，也不承诺商业效果 [metric:industry_validation_scenario_count] [assumption:A-PRIVACY-001]。

## 用地、建筑规模与拆改留方案

用地表达采用四类概念分区：午间科研与AI研发复合片区、京张午间蓝绿缓冲与停留片区、校园园区混合服务片区、街区更新与生活服务片区。它们继承仓库 scaffold 的拓扑安全分割，满足 land_use 图层完整覆盖边界，但不替代正式国土空间规划和控规用地 [data:geometry/land_use.geojson#LU-001] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。

建筑策略是“界面更新优先、存量激活优先、拆改结论后置”。方案只提出午间可达界面、首层共享、檐下空间、可移动服务设施和可解释展示窗的设计方向；任何具体建筑保留、改造、拆除、新建、产权调整或消防市政结论均需专业团队和官方资料确认 [data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish]。

指标层面，现阶段只登记可由临时几何复算的面积、绿地比例、公共空间比例和节点数量；容积率、建筑密度、建筑高度和停车配建等控规指标保持“待正式数据补齐”，不使用推测值填空 [metric:floor_area_ratio] [metric:building_density]。

## 交通、轨道、市政与公共服务设施

慢行交通以三类 SLA 路径组织，空间证据统一挂接在 `ROAD-001` 午间主脊和五张图件中。SLA-A 是遗址公园午间主线的设计目标，Target SLA = A，但当前可验证状态只能写为 Verified SLA = B，要求遮阴尽量连续、休息点可见、饮水和人工兜底接入主线；SLA-B 是校园园区横向接驳，要求短路径、过街等待、可进入公共空间和夏季少绕行；SLA-C 是轨道站点到园区的最后一公里触点，要求固定双语导向、无障碍绕行提示、饮水座椅和人工问询。三类 SLA 都是空间条件清单，不是 AI 排名或手机导航分数 [data:geometry/roads.geojson#ROAD-001] [metric:noon_sla_corridor_count]。

### Noonline SLA Engine 证据对齐

本轮采用双层状态：`Target SLA` 表示设计希望达到的服务等级，`Verified SLA` 表示 Noonline SLA Engine 在当前公开/清权数据和本 submission 声明证据下可稳定支持的等级。程序结果优先于叙述；缺少现场核验时，不得把目标等级写成已证明的当前状态 [data:visual/assets/noonline-sla-report.json#normal_routes.SLA-A] [metric:noon_sla_corridor_count]。

| Design Claim | Engine Status | Evidence Gap | Upgrade Trigger |
| --- | --- | --- | --- |
| SLA-A 遗址公园午间主线，设计目标为 A。 | Target SLA = A；Verified SLA = B。 | 遮阴连续性、连续暴晒距离、真实节点位置、饮水/座椅状态、公共入口、过街条件、夏季绕行和人工服务点责任仍未现场核验。 | 全部关键证据补齐且 Engine 复核无 blocker 后，才可由 B 升 A；缺任一关键证据时不得自动升级。 |
| SLA-B 横向短接驳，设计目标为 B。 | Target SLA = B；Verified SLA = C。 | 过街等待、公共入口开放、夏季绕行距离和节点状态仍为概念证据。 | 现场核验公共入口、过街等待和绕行距离后再复核。 |
| SLA-C 站点到园区触点，设计目标为 C。 | Target SLA = C；Verified SLA = C。 | 仍依赖概念节点和未现场核验的固定导向、饮水、座椅、人工问询条件。 | 补齐真实点位、开放时段和无障碍路径核验后维持或微调 C。 |
| AI 全部关闭。 | AI_OFF_TEST = PASS_WITH_PROVISIONAL_PHYSICAL_NETWORK。 | 固定标识、实体路线、座椅、饮水、公共入口和人工服务点可形成概念兜底网络，但尚不是现实运营证明。 | 现场确认设施存在、开放、可达且有人负责后，AI-OFF 结论才可从 provisional 转为现场验证。 |

A 级升级门槛是硬门槛，不是“未来完善后自然达到 A”。从 Verified SLA = B 升级到 A，必须补齐：遮阴连续性现场核验、连续暴晒距离实测、饮水点真实位置与开放状态、座椅及休息节点状态、公共入口实际开放条件、关键过街条件、夏季实际绕行距离、人工服务点责任与可用时段。缺少任一关键证据时，Engine 不应自动升级到 A。

#### V2 现场核验工作流

V2 不声称已经完成任何现场核验。Engine 从既有三类 SLA 路径、概念节点与八类 evidence gap 自动生成 45 项机器可读核验任务，写入 `visual/assets/noonline-field-verification-ledger.json`；其中 SLA-A 的 18 项任务为升级门 mandatory evidence，基线全部为 `unknown`。每项任务包含 route/node/object、所需证据、核验方法、通过/失败条件、状态、置信度、核验人、时间和证据引用；双语人工核验清单由同一 ledger 自动注入 `visual/index.html#v2-field-verification` 与 `visual/index.en.html#v2-field-verification`，不维护脱离机器数据的人工副本 [data:visual/assets/noonline-field-verification-ledger.json#summary] [metric:field_verification_task_count]。

核验状态机只允许 `unknown → scheduled → observed → verified / rejected`。AI 不能创建、观察、确认或拒绝现场证据；`verified` 与 `rejected` 必须由人类核验人写入，并同时具备 verifier、timestamp 和 evidence reference。SLA-A promotion gate 因 18 项 mandatory evidence 均未完成而返回 `promotion = blocked`，所以当前 Target SLA = A、Verified SLA = B 不变；任何 mandatory evidence 被拒绝时继续阻断升级并触发保持 B 或降级复核。即使所有 mandatory evidence 未来由人类流程核验，gate 也只允许后续 Engine/政策复核，绝不自动把 Verified SLA 写成 A [data:visual/assets/noonline-sla-report.json#verification_workflow] [assumption:A-FIELD-VERIFICATION-WORKFLOW-001]。

2026 年公开的京张铁路遗址公园沿线街区控规获批信息，为本方案提供了约 9 公里绿廊、南北贯通/东西联通慢行和便民服务方向的最新官方语境；本 submission 的 `ROAD-001` 仍只是概念性服务参考轴，而非官方 GIS、现状设施 inventory 或 SLA-A 的现场证据 [source:EXT-SRC-JINGZHANG-CONTROL-PLAN-20260812] [data:geometry/roads.geojson#ROAD-001]。

市政与公共服务设施采用轻量化、可撤回的原则：先做可移动饮水、座椅、遮阴、充电、信息牌和人工服务桌，再根据专业测量决定是否需要固定工程。未公开的管线、排水、电力、消防和地下空间资料不被推断，相关内容只列为后续深化清单 [depth:municipal_new_infrastructure] [assumption:A-CONTROLS-001]。

轨道接驳不提出新线位或站点工程结论，而是关注站点出入口到园区入口之间的“午间可懂路径”：哪条路更有阴影，哪里能坐下，遇到系统故障时找谁，国际访客如何读懂京张和AI原点叙事 [standard:BARRIER-FREE-ENVIRONMENT-LAW] [depth:traffic_rail_slow_parking]。

AI OFF / 无手机 / 无屏幕模式是完整公共服务模式，而不是应急附属品。Noonline SLA Engine 当前输出 `AI_OFF_TEST = PASS_WITH_PROVISIONAL_PHYSICAL_NETWORK`：AI 全部关闭后，概念网络仍依靠固定路线标识、地面或立柱导向、可见座椅、饮水补给、公共入口和五个人工服务点维持基本午间服务；但这一结论仍依赖 provisional / not field verified 的物理条件，不得表述为现实运营证明。AI 只做预测、提醒、动态调整和维护辅助，不成为遮阴、休息、饮水、问询和可达路径的前置条件 [data:visual/assets/noonline-sla-report.json#ai_off_test] [standard:BARRIER-FREE-ENVIRONMENT-LAW]。

![交通慢行与蓝绿公共空间图，显示主线、横向接驳、蓝绿冷却带和兜底站](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿系统的核心不是把绿地面积说得更大，而是让绿地、公园边界、街角和建筑首层形成午间连续体验。图层中绿地比例和公共空间比例来自临时几何复算，视觉表达把临时边界降为虚线背景，把服务线、停留点和兜底站作为主叙事 [data:geometry/green_space.geojson#GREEN-001] [metric:green_ratio]。

公共空间组件库包括六类：阴影座椅、饮水补给、双语导向、AI解释屏、人工服务桌和开放测试提示牌。组件必须有无屏版本和低技术版本，避免把公共空间变成只服务熟练手机用户的系统；其中座椅、饮水、固定标识、公共入口和人工桌是 AI 关闭时仍然工作的基础设施 [data:geometry/public_space.geojson#PUBLIC-001] [standard:BARRIER-FREE-ENVIRONMENT-LAW]。

城市风貌表达采用“铁路记忆 + 科研透明 + 午间可达”的克制语言：保留京张遗址公园的线性记忆，避免过度娱乐化地标；AI朝圣节点不是巨型雕塑，而是原点驿站、开源荣誉墙、模型透明橱窗和服务等级里程牌四类可更新载体 [depth:height_massing_character] [metric:pilgrimage_node_count]。

## 更新项目清单、实施政策与分期计划

更新项目清单分三组：第一组是 0-6 个月的“低成本样板段”，包括临时导向、座椅、遮阴、饮水和人工服务桌；第二组是 6-18 个月的“场景验证段”，包括热舒适测量、低速机器人窗口和活动日导览；第三组是 18 个月以后的“专业深化段”，需要官方边界、控规、市政、交通和运营主体进一步确认 [depth:renewal_project_list] [data:geometry/phasing.geojson#PHASE-001]。

实施政策建议只作为开放共创建议：建立午间服务等级台账、场景测试申请模板、公众反馈和纠错渠道、双语活动日导览包、无障碍复核清单，以及开发者社群维护机制。它们不构成政府已确定政策、财政承诺或招商承诺 [source:DATA-SRC-AGENT-TASKBOOK-20260518] [depth:phasing_implementation]。

长期运营可形成“Jing-Zhang Noon Lab”年度活动：夏季午间服务评测、开发者午休路演、AI公共服务开放日、京张文化夜行之外的午间导览、国际访问周和开源方案复盘会。运营价值来自可复用台账和可审计反馈，不来自一次性宣传 [metric:scenario_card_count]。

## 指标体系、面积复算与合规矩阵

结构化指标显示：临时提交边界复算面积约 11,412,825.386 平方米，官方公告总体设计面积为约 11.4 平方公里，两者只能作为近似校核关系；绿地比例约 0.123423，公共空间比例约 0.073281，三处重点片区数量为 3 [metric:site_area_sqm] [metric:official_overall_design_area_sqm] [metric:key_area_count]。

服务指标显示：Noonline SLA 设置 3 类午间服务路径、12 个概念服务节点、5 个可见人工兜底节点、10 张AI+场景卡、3 个行业验证场景、5 类用户画像和 4 类朝圣/荣誉节点。3 类路径是同一午间主脊上的 SLA-A/B/C 空间服务等级，不是 3 条独立道路中心线；12 点和 5 点来自图件与选址规则，不是现状设施统计 [metric:noon_sla_corridor_count] [metric:noon_service_node_count] [metric:human_fallback_node_count]。

合规矩阵覆盖公告和智能体任务书全部任务，标准矩阵覆盖官方公告、智能体任务书、城市设计管理办法、控规深度、用地分类以及AI治理和无障碍相关边界，设计深度矩阵覆盖 15 个 formal 深度项 [depth:metrics_recalculation] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

![指标与证据链图，显示面积、服务节点、场景卡、人工兜底和数据缺口](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

最大风险是把“服务等级”误解成已经可实施的工程指标。为避免这一点，方案把热舒适、客流、设施状态和公众反馈都写成测试协议，把无障碍和人工兜底写成设计底线，把官方边界和控规资料缺口写进 assumptions、sources、proposal 和 visual 页面 [assumption:A-MICROCLIMATE-001] [depth:risk_missing_data]。

第二个风险是人群依据被误读。本方案明确不声称场地内部老年人、儿童、科研人员或外来人口的具体占比；海淀七普只支持“区级多元人群和包容性校核”，不支持“某类人群主导场地”的结论 [source:EXT-SRC-HAIDIAN-CENSUS-20210608] [assumption:A-CENSUS-SCOPE-001]。

本方案所有图像、PDF、HTML 和结构化数据均由本地脚本基于公开/清权资料和仓库临时几何生成，没有使用远程地图瓦片、外部字体、第三方图片、个人隐私数据或未授权商标。互动网页离线运行，报告 HTML 不含脚本，视觉 HTML 不调用远程 API [source:SOURCE-REGISTRY] [standard:GENERATIVE-AI-INTERIM-MEASURES]。

## 参考资料

- 官方公告与站点包：项目范围、任务、重点片区和成果要求 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]。
- 智能体任务书：命名、场景、人物画像、AI地标、文化叙事和长期运营 [source:DATA-SRC-AGENT-TASKBOOK-20260518]。
- 临时边界：仅用于生成、展示和自检，不作为官方红线 [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]。
- 海淀七普公报：区级人群结构背景，不作为场地人口或午间客流统计 [source:EXT-SRC-HAIDIAN-CENSUS-20210608]。
- 专业标准与政策快照：城市设计、控规深度、用地分类、生成式AI治理和无障碍人工服务边界 [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING]。
