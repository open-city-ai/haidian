---
title: "京张智脉 · AI 创新带城市设计提案"
author_github: "chenxuan999"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以“智脉”为空间主线，把京张铁路遗产公园绿廊作为南北贯通的创新脊，串联众智园加速区、北京 AI 原点社区、大钟寺产业聚集区三处重点区，并以中关村科技服务翼、小月河场景赋能翼形成东西协同；面向全球 AI 人才与开发者提出可体验、可感知、可运营的 AI 城市方案。"
iteration: "v0.1"
---

# 京张智脉 · AI 创新带城市设计提案

> 本方案为面向“百年京张 AI 创新带城市设计国际方案征集”的开源共创建议。所有空间落地建议均为概念建议、参考方案或可供专业团队深化研究，不替代正式规划，不构成政府审定结论 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

## 设计依据与资料清单

本方案依据已清权与公开资料构建：官方资格预审公告明确了三层范围、三处重点区域、设计任务与成果语境 [source:SITE-PACKAGE]；面向智能体任务书补充了三条共创原则、六项任务与统一边界条款 [source:AGENT-TASKBOOK]；城市设计管理办法、控规编制审批办法、国土空间用地分类指南作为专业标准响应依据 [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。

资料使用遵循 `data/source_registry.json` 的权限分级：官方公告与清权任务书为 `usable_for_formal="yes"`；临时边界 `provisional_boundaries.geojson` 仅为 `provisional_only`，用于智能体生成、展示与临时自检，不得升级为官方红线或精确面积依据 [source:PROVISIONAL-BOUNDARIES]。所有控规条件（容积率、建筑高度、建筑密度、绿地率、退线）在清权资料包中缺失，列为待正式数据补齐事项 [metric:floor_area_ratio]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

方案在统筹研究范围（约 43.6 km²）、总体设计范围（约 11.4 km²）、重点区域范围（约 368.4 ha）三级逐级落实 [source:SITE-PACKAGE]。本次生成使用维护者提供的临时粗略边界 `PROV-SITE-001` 作为总体设计范围代理 polygon，其面积在 EPSG:4548 下校核为约 11.41 km²，与公告约 11.4 km² 一致；该 polygon 仅用于生成与展示，不得作为官方红线或精确面积复算依据 [data:geometry/site_boundary.geojson#PROV-SITE-001]。

三处重点区域（众智园 192.1 ha、北京 AI 原点社区 104.3 ha、大钟寺 72.0 ha）使用临时 `PROV-KEY-001/002/003` 表达，待官方 CAD/GIS 红线到达后，相关图层与面积指标需重算 [data:geometry/key_areas.geojson#PROV-KEY-002]。三层范围的设计深度由产业战略（研究范围）、总体城市设计（设计范围）到规划综合实施方案（重点区域）依次加深 [depth:regulatory_planning_depth]。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

**总体概念与主名称。** 方案定名“京张智脉 · AI 创新带”。“智脉”取京张铁路这条中国人自建的第一条干线铁路之“脉”意象，喻其从历史交通命脉转为 AI 时代创新命脉；英文 Jingzhang Zhimai · AI Innovation Belt [depth:overall_concept_naming]。命名体系为“三脉—三区—两翼”：三脉对应三大定位（文化脉＝百年京张文化带、生活脉＝都市 AI 生活体验带、创新脉＝AI 融合创新带）；三区即三处重点区域；两翼为东西协同翼。

**视觉识别与 Logo 方向。** Logo 以詹天佑“人字形”铁路折返线为母题，由实体铁轨渐变为数据节点网络，象征从工业遗产走向 AI 原生城市；标识采用单色线构、可黑白反相、可延展为导视系统与活动主视觉，避免使用任何未授权字体、商标或人物肖像 [depth:visual_identity_logo]。

**三大定位、五大功能与三区两翼协同回路。** 三大定位已由征集设定；五大功能为 AI 全栈自主创新体系、世界级 AI 创新生态、AI+场景赋能新范式、智能化 AI 活力城市、AI 治理全球话语权 [source:AGENT-TASKBOOK]。空间上，众智园承接全栈自主与治理话语权，AI 原点社区承接世界级生态与人才生活，大钟寺承接智能原生新业态；中关村科技服务翼负责要素全球化配置与资本赋能，小月河场景赋能翼负责 AI 场景落地与活力营造，三区两翼通过“智脉”绿廊与轨道站点形成闭环协同 [depth:three_areas_two_wings_synergy]。

**全球 AI 创新生态案例（7 例，供空间与运营转化参考）。**

| 案例 | 区位 | 可转化经验 |
| --- | --- | --- |
| 河套深港科创合作区 | 深圳 | 跨境规则衔接与“白名单”场景开放机制 |
| 张江科学城 | 上海 | 大科学装置＋产业集群的园区城市一体化 |
| 之江实验室／未来科技城 | 杭州 | 新型研发机构与城西科创大走廊 |
| 合肥声谷／量子中心 | 合肥 | 单点技术突破带动产业链集聚 |
| Mila 集群 | 蒙特利尔 | 大学—企业—政府三元创新社群 |
| 剑桥 AI 集群 | 英国 | 大学衍生企业与低密度高品质建成环境 |
| AI Singapore／One-North | 新加坡 | 国家平台＋热带滨水公共空间运营 |

上述案例仅作背景参考，不构成任何招商或政策承诺 [depth:ai_ecosystem_cases]。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围采用“一脊三区两翼”空间结构：南北向“智脉”绿廊为创新脊，串联三处重点区；东西两翼延展服务功能 [depth:spatial_structure]。城市更新以保留为主、改造提质、审慎新建为原则，具体拆改留分类见第七章，凡涉及现状权属与工程条件者均列为待确认 [depth:regulatory_planning_depth]。

创新指标体系建议包含 AI 企业密度、人才密度、算力可达性、场景可感知度、慢行连通度与绿地／公共空间占比；其中绿地率、公共空间率由本方案几何复算给出方向值，法定指标待控规条件补齐 [metric:green_ratio] [metric:public_space_ratio]。交通上以轨道站点一体化＋路网微循环＋京张遗址公园慢行主轴组织；市政上提出分布式算力与光伏、储能融合的新型基础设施方向，容量以概念建议表述，不做工程测算 [depth:infrastructure_strategy]。

## 重点区域详细设计

**众智园 AI 自主创新加速区（北，约 192.1 ha）。** 定位全栈自主创新与 AI 治理话语权承载区。空间结构为“一核多院”：开放创新核＋若干研发院与算力共享中心；建筑以保留科研院所载体改造为主，新建少量中低密度研发组团；公共空间以智脉北门户广场与开放创新核串联；AI 场景突出算力共享与开源社区 [data:geometry/key_areas.geojson#PROV-KEY-001]。结论为方向性，待官方 polygon 到达后重算。

**北京 AI 原点社区（中，约 104.3 ha）。** 定位世界级 AI 创新生态与人才生活社区。以“AI 原点广场”为精神核心，混合科研、人才公寓、教育、医疗与商业；强调 15 分钟创新生活圈与全龄友好；慢行主轴在此与轨道站点一体化 [data:geometry/key_areas.geojson#PROV-KEY-002]。该区为“AI 朝圣地标”的主要承载地（见第九章）。

**大钟寺 AI 产业聚集区（南，约 72.0 ha）。** 定位智能原生新业态与商务服务。以智能原生消费、AI 商务、机器人展示交易为主；保留大钟寺地区商业与商务载体，植入 AI 体验店与无人商业测试段；公共空间以寺前广场与智脉南门户组织 [data:geometry/key_areas.geojson#PROV-KEY-003]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

**用户画像（6 类）。** ①AI 研究员／科学家；②AI 创业者／创始人；③开发者／工程师；④高校学生／青年人才；⑤社区居民／长者；⑥城市运营者。每类画像对应差异化的空间、场景与隐私边界需求 [depth:persona_definition]。

**AI 场景卡（12 张，含 4 张产业测试验证场景）。** 下表为可读摘要，完整映射（空间位置、服务对象、运行数据、隐私边界、人工复核、运营主体、图层、风险）见 `compliance_matrix.json` 与 `metrics.json` [depth:scenario_cards]。

| # | 场景卡 | 类型 | 空间落点 | 隐私／人工复核 |
| --- | --- | --- | --- | --- |
| 1 | 智脉绿廊 AI 导览 | 体验 | 遗产公园主轴 | 匿名位置，可关闭 |
| 2 | AI 无障碍出行 | 体验 | 慢行＋轨道接驳 | 本地推理，人工复核 |
| 3 | 社区 AI 助老 | 体验 | 原点社区 | 授权数据，家属复核 |
| 4 | 个性化 AI 学习 | 体验 | 教育用地 | 未成年人保护 |
| 5 | 社区 AI 健康站 | 体验 | 医疗用地 | 脱敏，医生复核 |
| 6 | 公交智能调度 | 体验 | 交通节点 | 聚合数据 |
| 7 | 园区能源管家 | 体验 | 新型基建 | 设备级数据 |
| 8 | AI 公共空间安全 | 体验 | 公共空间 | 仅异常告警，不识别个人 |
| 9 | 开发者沙盒 | 测试 | 开放创新核 | 沙盒隔离 |
| 10 | 自动驾驶接驳测试段 | **测试** | 智脉北段 | 封闭测试，安全员 |
| 11 | 端侧大模型推理测试场 | **测试** | 算力共享中心 | 性能基准，人工评测 |
| 12 | 城市治理数字孪生沙盘 | **测试** | 运营中心 | 仿真，不接入实时个人数据 |

测试验证场景均表述为概念建议与深化方向，非已批准运营 [depth:test_validation_scenarios]。

## 用地、建筑规模与拆改留方案

用地布局由 `geometry/land_use.geojson` 完整分区表达，覆盖全部总体设计范围、无空隙无重叠；代码采用国土空间用地分类（科研 0802、商务金融 0902、商业 0901、城镇住宅 0701、教育 0804、医疗 0806、工业 1001、道路 1207、公园绿地 1401、广场 1403、河流水面 1701）[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。各代码面积由几何复算，汇总等于 site 面积 [metric:land_use_area_by_code]。

建筑规模与开发强度按分区概念赋值：重点区以中低密度研发与混合功能为主，FAR 方向值约 1.0–1.8（待控规条件确认）[metric:floor_area_ratio]；建筑密度方向值约 10%–15% [metric:building_density]。拆改留分类原则：保留科研院所与轨道载体，改造低效存量，审慎新建研发与公共空间组团；具体地块与权属待正式资料补齐 [depth:retain_renovate_demolish_new]。

## 交通、轨道、市政与公共服务设施

以轨道站点一体化（知春路、五道口、大钟寺等）＋路网微循环＋京张遗址公园慢行主轴组织机动与非机动交通；慢行断点打通与接驳组织形成连续体验路径 [depth:traffic_mobility]。市政提出分布式算力、光伏与储能融合的新型基础设施方向，与传统市政统筹；容量、负荷与管线均不作工程测算，列为待专业深化 [depth:infrastructure_strategy]。公共服务以人才生活服务（公寓、教育、医疗）与创新服务平台（算力共享、开源社区、测试场）为主。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

京张遗址公园活力带为南北贯通的蓝绿与公共空间主轴；小月河／清河蓝绿廊道与智脉交织，形成连续步道—骑行—活动网络 [depth:blue_green_public_space]。城市风貌以理性、克制、科技感为基调，建筑体量宜中低层为主、局部地标，屋顶与立面鼓励低碳与可识别性，避免网红化与过度娱乐化。

**AI 朝圣地标与荣誉展示节点（4 处）。** ①AI 原点碑（原点社区核心，标记中国 AI 生态发端）；②人字铁路精神塔（智脉北门户，致敬詹天佑）；③AI 荣誉长廊（沿遗产公园，展示全球 AI 贡献与开源英雄）；④开发者圣火台（年度活动点火节点）。地标均为概念方案，权属、形态与建设需专业与文物保护复核，不表述为已批准 [depth:ai_pilgrimage_landmarks] [depth:honor_display_system]。

**百年京张—中关村—AI 新文化融合叙事（agent.5）。** 叙事主线为“从第一条中国人自建铁路，到第一个中国人自主 AI 创新带”：1909 京张铁路（詹天佑）代表自力更生的工业精神，1980 年代以来中关村代表科技产业化，2026“百年京张”代表 AI 原生城市文明。空间文化系统以智脉为叙事轴，串联铁路遗产、创新遗址与 AI 新地标；导视与符号系统在整体 Logo 体系下延展，区分文化标识与一带主 Logo，避免混淆 [depth:culture_narrative] [depth:signage_system]。

## 更新项目清单、实施政策与分期计划

更新项目分三期：近期（智脉主轴＋原点社区公共空间＋开放创新核）、中期（众智园研发组团改造＋大钟寺智能原生业态）、长期（两翼协同与全域场景运营）[data:geometry/phasing.geojson#PHASE-1]。实施主体为政府平台＋专业团队＋运营机构；政策建议含场景白名单、数据授权与开源贡献激励，均为概念建议 [depth:phasing_plan]。

**全球 AI 创新活动体系与长期运营（agent.6）。** 年度活动体系：京张 AI 创新节、开发者大会、全球 AI 场景挑战赛、AI 朝圣周；活动品牌与主视觉由 Logo 体系延展；开发者社区以开源贡献与黑客松运营；场景开放运营依托城市级 AI 场景开放平台；国际传播以双语直播与全球开发者招募为主，并设人才—企业—开发者转化路径。所有活动、招商、资金与政策均表述为概念建议或深化方向，非已确定政府安排 [depth:annual_event_system] [depth:developer_community_operation] [depth:conversion_pathway]。

## 指标体系、面积复算与合规矩阵

核心指标由几何复算：site 面积 [metric:site_area]、绿地率 [metric:green_ratio]、公共空间率 [metric:public_space_ratio]，均由用地与绿地图层直接得出。

道路率 [metric:road_ratio]、建筑密度 [metric:building_density]、总建筑规模 [metric:total_floor_area] 反映微观路网密度与产业空间供给。

FAR 为方向性设计值 [metric:floor_area_ratio]；其中重点区与分期面积见 [metric:key_area_areas] 与 [metric:phasing_area]。

指标含义：绿地率支撑人才生活品质，公共空间率支撑创新交往 [depth:metrics_explained]。合规、标准、设计深度三项矩阵覆盖公告章节、六项 agent 任务与全部强制专业标准 [depth:compliance_matrix]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

本方案严格遵循开源征集任务书与社区展示许可（COMMUNITY-DISPLAY-ONLY）[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。资料合规：所有引用的规划公告、agent 任务书、政策报道与用地分类指南均来自公开或已清权来源，未使用任何涉密地图、非公开行政表格或伪造的官方背书；维护者提供的临时粗略边界 `PROV-SITE-001 / PROV-KEY-*` 仅为智能体生成与展示用途，明确标注为 provisional，不得升级为官方红线或精确面积依据 [source:PROVISIONAL-BOUNDARIES]。版权：本方案文本、Logo 与示意图像均由智能体自绘或基于清权素材生成，未嵌入任何未授权商标、人物肖像或受版权保护的论文图像；示意所用字体与图标均为开源或系统自带资源。隐私与数据治理：全部 AI 场景以匿名化、本地推理、人工复核为基本原则，不采集或使用个人敏感信息，不绑定特定商业供应商；涉及未成年人、医疗与健康的内容均设有脱敏与人工复核机制 [depth:risk_copyright_compliance]。官方批准与实施承诺禁用：所有空间布局、建筑规模、运营活动与政策建议均为概念性共创方案，不构成政府审定结论、批准文件或实施承诺，须待正式控规条件与专业机构复核后方可深化。几何与指标不确定性：绿地率、公共空间率等由概念用地图层复算，属于方向值；法定容积率、建筑高度、建筑密度、绿地率、退线等指标在清权资料包中缺失，已在 `metrics.json` 中标记为 unknown 并列为待补事项 [metric:floor_area_ratio]。上述所有数据缺口与待确认事项统一记录在 `assumptions.json`。

## 参考资料

1. 北京市规划和自然资源委员会海淀分局．百年京张 AI 创新带城市设计国际方案征集资格预审公告（2026-05-09）[source:SITE-PACKAGE]。
2. 面向全球智能体开展百年京张 AI 创新带城市设计开源征集任务书摘录（2026-05-18）[source:AGENT-TASKBOOK]。
3. 北京市科委、中关村管委会．“三区两翼”打造世界级 AI 集聚地（2026-04-03）[source:HAIDIAN-1X1]。
4. 住房城乡建设部．城市设计管理办法（2017）[standard:MOHURD-URBAN-DESIGN-MEASURES]。
5. 自然资源部．国土空间调查、规划、用途管制用地用海分类指南（2023）[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。
6. 维护者提供的临时粗略边界 `provisional_boundaries.geojson`（2026-06-05）[source:PROVISIONAL-BOUNDARIES]。
