---
title: "京张·接力交路 —— 一支交路，百年接力"
author_github: "wuguangde20"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以铁路「机车交路」制度为原型，把百年京张AI创新带组织为「一支主交路、四段接力、三处交路点、两翼接续」的接力创新带；以「交路交接协议」作为贯穿全文的治理机制，成果、人才、场景在交路点交接、签认、可追溯。本方案为基于 provisional boundary 的 formal 概念方案，保留精度警示并待官方数据发布后复算。"
tracks: ["ai-origin-community", "jingzhang-heritage-narrative", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "ai-health-service-navigation", "ai-cultural-guide", "enterprise-service-copilot"]
---

# 京张·接力交路 —— 一支交路，百年接力

> 一百年前，京张铁路靠「机车交路」制度跑通中国自主设计的第一条干线：乘务组不跑完全程，而是在交路点接力、交接、签认，一段接一段地完成千里奔袭。一百年后，这条走廊需要一套同样的「接力交路」——把 AI 创新从策源到交付组织成四段接力，在交路点完成成果、人才与场景的交接、签认与追溯。本方案以「京张·接力交路（Jing-Zhang Rail Handoff Belt）」为总体概念，回答从京张铁路遗址公园到 AI 创新带的百年转译问题。

## 设计依据与资料清单

本 formal 方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [source:OFFICIAL-ANNOUNCEMENT]，以 `brief/site-package/` 中经维护者登记的临时粗略边界、重点区域、枚举、指标和来源清单为机器可读依据 [source:SITE-PACKAGE]。AI agent 在生成方案前读取 `design_brief.json`、`allowed_design_space.json`、`enums/`、`ranges/`、`schemas/`、`data/source_registry.json` [source:SOURCE-REGISTRY] 和 `data/processed/agent_fact_pack.md` [source:PROCESSED-FACT-PACK]，并用 `project_scope_summary.csv`、`agent_task_requirements.csv`、`source_use_matrix.csv`、`missing_data_checklist.csv` 建立任务、范围、资料用途和缺口清单。公告要求方案达到控制性详细规划的城市设计深度和规划综合实施方案的城市设计深度 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]，因此文本叙述不能替代 GeoJSON、指标表、A3 文册、A0 展板和 HTML 电子展示成果。

本方案采用 `brief/site-package/geometry/provisional_boundaries.geojson` 中 `PROV-SITE-001` 与 `PROV-KEY-001/002/003` 作为临时边界 [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]，对应 [data:geometry/site_boundary.geojson#SITE-001] 与 [data:geometry/key_areas.geojson#PROV-KEY-001]。当前登记摘要：formal 可用资料 5 条、背景资料 0 条、provisional-only 资料 1 条 [source:SOURCE-REGISTRY]。agent 不得把 provisional_only 资料升级为 official boundary、法定控规、正式评分依据或政府实施承诺；本方案所有空间落位均标注「临时边界、以 official 红线替换后复算」，该组织方数据缺口不阻断内容评分。

![总体设计方案总览地图与三层范围关系](assets/figures/site-overview.png)

本方案边界和重点区域的可读解释对应 [data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#PROV-KEY-001]，面积复算见 [metric:site_area_sqm] 与 [metric:key_area_count]。深层诊断方法由 [depth:existing_conditions_diagnosis] 管理；本次诊断以公开资料与 provisional 边界为主，缺失现状建筑、权属与管线数据，已列入缺资料清单待官方数据补充。

## 三层范围工作框架

方案按照公告确定的三层范围组织工作：统筹研究范围约 43.6 平方公里，关注 AI 产业生态、战略定位、创新链和未来城市形态；总体设计范围约 11.4 平方公里，关注京张遗址公园周边 1—2 公里城市地区和产业区的城市更新总体框架、产业空间布局、交通市政支撑和城市风貌控制；重点区域范围约 368.4 公顷，聚焦众智园AI自主创新加速区、北京AI原点社区、大钟寺AI产业聚集区三处详细设计地区 [source:PROCESSED-FACT-PACK]。三层范围在 `compliance_matrix.json` 中逐条映射，保证公告 1.3、1.4、1.5 与 agent.1—agent.6 的必选任务都有章节、图层、指标、图纸和 HTML 证据。

三层工作框架的深度项由 [depth:three_level_scope_framework] 与 [depth:overall_spatial_structure] 约束，空间证据以 [data:geometry/site_boundary.geojson#SITE-001] 与 [data:geometry/key_areas.geojson#PROV-KEY-001] 为准，范围索引以 [source:PROCESSED-FACT-PACK] 中 `project_scope_summary.csv` 的三层范围表为导航。统筹研究决定产业链和城市形态判断，总体设计把判断落实到更新项目、空间结构和设施承载，重点区域详细设计验证具体地块、建筑、交通、公共空间和 AI 应用场景的可实施性。agent 生成方案时先锁定 provisional 边界和约束，再生成用地、建筑、道路、绿地、公共空间、分期和 AI 服务节点，最后从这些图层复算指标 [metric:site_area_sqm]，并在正文解释哪些结论仍受 provisional boundary 限制。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI产业生态和未来城市形态如何组织 | 建立「策源—转化—加速—交付」四段交路接力创新链 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 产业空间、城市更新、交通市政和风貌如何落图 | 一支主交路·四段接力·三处交路点·两翼接续的用地、建筑、道路、绿地、公共空间和分期图层共同表达 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别作为交路段上的接续/转换/交付节点，提出定位、空间动作、AI场景和实施依赖 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

## 统筹研究范围产业与未来城市研究

统筹研究范围的核心是构建世界级 AI 创新生态体系。面向智能体任务书要求回应「三大定位」「五大功能」「三区两翼」协同 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]，本方案将「百年京张文化带、都市AI生活体验带、AI融合创新带」三大定位与「AI全栈自主创新体系、世界级AI创新生态、AI+场景赋能新范式、智能化AI活力城市、AI治理全球话语权」五大功能，组织为一个「**一支主交路、四段接力、三处交路点、两翼接续**」的空间协同回路：

- **一支主交路**：京张铁路遗址走廊作为贯穿南北的"接力交路主线"——地上是遗址公园公共空间、地下是京张高铁、沿线叠加算力/数据骨干网络，是百年京张文化带与 AI 融合创新带的物理读法，也是创新从策源到交付的运行轨道。
- **四段接力**：创新旅程按「策源（发车）—转化（换乘）—加速（提速）—交付（到达）」四段组织，对应统筹研究范围—总体设计范围—重点区域的逐级落实。
- **三处交路点**：三处重点区作为交路交接节点——AI原点社区＝「换乘交路点」（成果转化、人才交接）、众智园＝「提速交路点」（全栈自主创新、标准治理）、大钟寺＝「交付交路点」（智能经济、国际交往）。
- **两翼接续**：中关村科技服务翼（要素配置、IP 与资本）、小月河场景赋能翼（场景试验与公共体验）作为主交路两侧的"接续支线"，把创新要素接入主交路。

**治理机制「交路交接协议」（Rail Handoff Protocol）**是本方案贯穿全文的核心命题：借鉴铁路「机车交路」制度中乘务组在交路点交接、签认、可追溯、可回退的纪律，让 AI 创新带的成果、人才、场景在每一处交路点完成"交接—签认—台账"，未通过前一段验收不得进入下一段。这与铁路"闭塞/放行"精神一致，但聚焦在**创新交接的可追溯性**，是本方案区别于"信号/验证/开源"等其他铁路隐喻的差异化立场（详见 agent.3、agent.6 章节的落地）。

统筹研究通过 [standard:MOHURD-URBAN-DESIGN-MEASURES] 要求的城市风貌、公共空间和建筑布局统筹，回接 [data:geometry/land_use.geojson#LU-001]、[data:geometry/public_space.geojson#PUBLIC-001] 与 [depth:overall_spatial_structure]，说明产业策略最终落到可见、可复核的空间结构。命名方案和 logo 设计（详见 agent.1 章节）服务于整体辨识度，不只停留在口号，而说明与产业生态、公共空间和文化资源的关联。

面向智能体任务书还要求「5—8 个全球AI创新生态案例」[source:AGENT-TASKBOOK]。本方案选取 8 个案例并提取可转化机制：伦敦 King's Cross Central（铁路遗产地→知识城，校-园-城联动的「知识街区」机制，最贴合京张语境）；波士顿 Kendall Square（大学锚定的创新区，「实验室—孵化器—巨头」梯度）；新加坡纬壹科技城 one-north（政府主导、园区-城市一体的「城市即园区」机制）；巴黎 Station F（单一营地式运营+赛事活动的「运营即品牌」机制）；上海张江科学城（大科学设施+产业园区的「平台城市化」机制）；深圳南山（硬件测试+极速迭代的「测试床」机制）；杭州云栖小镇（以年度大会撬动开发者生态的「活动品牌」机制）；中关村自身（作为参照系说明本区差异化起点）。每个案例只提炼可转化机制，不编造投资额、企业名单或政策承诺。

### agent.1 一带总体概念与功能统筹方案（命名、Logo 与视觉识别方向）

针对任务书 agent.1「总体概念、主名称、英文名称和命名体系；视觉识别与 Logo 方向」[source:AGENT-TASKBOOK]，本方案提出：

- **主名称：京张·接力交路**（英文：**Jing-Zhang Rail Handoff Belt**，短名 "Rail Handoff"）。字义：京＝百年文脉，张＝开放张力，接力交路＝源自铁路「机车交路」制度——乘务组不跑全程、在交路点接力交接签认，把长途奔袭拆成可交接、可追溯、可回退的短段接力。这恰好对应 AI 创新带"从策源到交付"的创新链：创新不是一次性完成的，而是在交路点一次次交接接力。
- **命名体系**：一带品牌「京张·接力交路」；四段接力「策源段（Seed）」「转化段（Transfer）」「加速段（Accelerate）」「交付段（Deliver）」；三处交路点「换乘点·原点社区」「提速点·众智园」「交付点·大钟寺」；两翼「接续翼·中关村科技服务」「接续翼·小月河场景赋能」。
- **口号**：「一支交路，百年接力」/ "One Rail, a Century of Handoffs"。
- **Logo 方向**：以"交路交接"为视觉母题——两条钢轨在交路点交错形成"交接/传递"的动势符号（形如一只交接的手或一次递交），交接点以"道钉/刻度"标记；重复单元为「交路刻度」（呼应导视系统）。
- **视觉规范方向**：色板＝遗产金 #c79838、AI 靛蓝 #4f46e5、生态青绿 #15803d、深藏蓝 #172235；字体与版式服务于技术图解、地图和证据面板风格，不做漫画或氛围插画。

该命名与视觉服务于整体辨识度（评审维度「品牌识别度」），并与三大定位、五大功能、三区两翼及"交路交接协议"治理机制的空间组织一致 [data:geometry/site_boundary.geojson#SITE-001]。全部品牌、字体、图像须有清权来源，不得照搬城市、园区或企业名称。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围要求达到控制性详细规划的城市设计深度。方案提出城市更新总体空间结构、低效空间识别、更新项目清单、实施政策建议、产业功能比例、空间组织模式、建筑总规模和综合承载能力评估。`geometry/land_use.geojson` 完整覆盖设计边界且无重叠 [data:geometry/land_use.geojson#LU-001]，`geometry/buildings.geojson` 表达概念建筑基底 [data:geometry/buildings.geojson#BLDG-001]，`geometry/roads.geojson` 表达微循环、慢行和轨道接驳关系 [data:geometry/roads.geojson#ROAD-001]，`metrics.json` 复算核心面积、比例和图层数量。

本节按照 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 把控规深度内容拆成可审查对象：[data:geometry/land_use.geojson#LU-001] 表达用地结构，[data:geometry/buildings.geojson#BLDG-001] 表达建筑基底，[metric:building_footprint_area_sqm] 复核建筑基底面积，[depth:land_use_layout] 与 [depth:development_intensity_controls] 约束成果深度。总体设计还须支撑交通、轨道、市政和配套设施：围绕轨道站点一体化、道路微循环、非机动车停放、创新服务平台、人才生活服务、新型基础设施、分布式能源和端侧算力提出空间布局与实施路径 [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure]。

涉及建筑高度、开发强度、道路红线、退线和设施标准的内容，因尚无官方控制条件，统一按「待正式控规条件确认」处理，本方案不得以 agent 推测值冒充审定指标。例如 `metrics.json` 中 [metric:floor_area_ratio] 与 [metric:building_height_m] 均显式标记为 `unknown`/`required_for_formal_submission`，不得据此给出容积率或建筑高度结论。

## 重点区域详细设计

重点区域详细设计是必选项，由 [depth:three_key_area_detailed_design] 检查是否达到规划综合实施方案深度。三处重点区在 `geometry/key_areas.geojson` 中按 `provisional_constraint` 表达 [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]，官方 polygons 取得后需重算。三区设计定位如下（均为「概念建议/参考方案/可供专业团队深化研究」措辞）：

| 重点片区 | 交路定位 | 空间动作 | AI产业与运营场景 | 证据引用 |
| --- | --- | --- | --- | --- |
| 众智园AI自主创新加速区 | 提速交路点·全栈自主创新（加速段） | 强化清河界面、产业展示、低碳创新交往和对外交通组织；以绿色空间承载开放测试与标准治理展示 | 模型红队测试、标准制定工作坊、安全治理展示、低碳算力体验 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[metric:key_area_area_zhongzhiyuan_ai_acceleration_area_sqm] |
| 北京AI原点社区 | 换乘交路点·成果转化与人才交接（转化段） | 组织校区、园区、街区慢行缝合；补足成果发布、人才服务、居住生活和开源协作空间 | 开源发布厅、成果发布、人才特区服务、近校孵化 | [data:geometry/key_areas.geojson#PROV-KEY-002]、[metric:key_area_area_beijing_ai_origin_community_sqm] |
| 大钟寺AI产业聚集区 | 交付交路点·智能经济与国际交往（交付段） | 围绕大钟寺站一体化、四象限步行连通、商业服务和重点企业公共环境更新 | 智能体与智能终端展示、内容消费、数据要素与国际路演 | [data:geometry/key_areas.geojson#PROV-KEY-003]、[metric:key_area_area_dazhongsi_ai_industry_cluster_sqm] |

三处重点区实测面积（provisional）分别为众智园约 192.9 公顷、AI原点社区约 104.3 公顷、大钟寺约 72.0 公顷，与公告约值偏差均在 0.5% 以内，已在 [metric:key_area_area_zhongzhiyuan_ai_acceleration_area_sqm]、[metric:key_area_area_beijing_ai_origin_community_sqm]、[metric:key_area_area_dazhongsi_ai_industry_cluster_sqm] 中注明并以 provisional 边界实测为准。`compliance_matrix.json` 分别覆盖公告 1.5.3.1、1.5.3.2、1.5.3.3。

**三处重点区功能分区与意向分析**（功能分区见图纸 `assets/figures/key-areas.png` 分析图，均为概念建议）：

| 重点区 | 功能分区结构 | 空间意向 | 实施依赖 |
| --- | --- | --- | --- |
| 众智园·提速交路点 | 「清河低碳界面＋AI研发核心＋标准治理厅＋产业服务街＋主交路绿道贯穿」 | 全栈自主创新加速段：以主交路为轴，研发核心居中、标准灯塔标志性收口、产业服务沿街 | 五环路节点、清河蓝线、对外交通组织 [depth:three_key_area_detailed_design] |
| AI原点社区·换乘交路点 | 「原点广场＋成果转化核心＋高校协同边＋人才社区＋慢行缝合轴」 | 近校成果转化与人才交接：以原点广场为交接原点，向东缝合高校、向西嵌入人才社区 | 校区边界、权属、轨道站点一体化 [data:geometry/key_areas.geojson#PROV-KEY-002] |
| 大钟寺·交付交路点 | 「智能经济核心＋双翼产业研发＋四象限广场＋复合绿地」 | 城市型智能经济交付段：以大钟寺站为交付枢纽，四象限步行连通，智能灯塔标志性收口 | 轨道站点、交叉口、市政管线 [data:geometry/key_areas.geojson#PROV-KEY-003] |

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

图纸 `key-areas.png` 采用「功能分区分析图 + 意向示意草图 + AI场景/流线标注」三层次表达：功能分区基于本方案 `geometry/land_use.geojson` 派生，意向草图为原创轴测概念示意（非外部图片），朝圣地标（▲）、AI 场景节点（●）与慢行/交通流线（→）均与 `geometry/constraints.geojson` 场景节点对应。

## AI 创新生态、人才画像与 AI+ 场景

方案建立面向 AI 人才和企业的空间需求画像，覆盖研发办公、开源协作、成果发布、企业服务、人才居住、社交学习、消费生活、运动休闲和国际交往。面向智能体任务书要求不少于 10 张 AI 场景卡、不少于 3 个产业测试验证场景和不少于 5 类用户画像 [source:AGENT-TASKBOOK]。本方案给出 12 张场景卡、4 个产业测试验证场景、6 类用户画像，均落到空间与治理边界。

**用户画像（6 类）**

| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 原点社区开源发布厅、公共代码墙、夜间协作空间 | 不采集个人行为轨迹；活动数据只做聚合统计 |
| 初创团队 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力服务点、标准治理咨询 | 算力和数据服务需另行授权 |
| 头部企业访客 | 展示、商务、国际接待、人才招聘 | 大钟寺国际路演客厅、轨道站点接驳、重点企业周边公共空间 | 企业标识和案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 京张遗址公园慢行环、社区服务嵌入、夜间照明和活动分级 | 不将居民画像用于商业推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 校区-园区慢行缝合、成果转化驿站、AI教育体验点 | 校园数据和科研成果需授权 |
| 国际访客 | 参展、路演、体验、城市认知 | 大钟寺国际路演客厅、双语导视、朝圣路线 | 访客数据脱敏与最小化 |

**AI 场景卡（12 张，含 4 个产业测试验证场景）**

| 场景卡 | 空间载体 | 类型 | 设计说明 |
| --- | --- | --- | --- |
| 01 模型红队测试场 | 众智园 | 产业测试验证 | 面向安全评测的开放测试场，人工复核+红队机制 [depth:risk_missing_data] |
| 02 标准治理沙盒 | 众智园 | 产业测试验证 | 标准制定、安全评测、模型对齐的可预约协作节点 |
| 03 端侧算力实测点 | 总体设计范围节点 | 产业测试验证 | 端侧算力与低碳能源结合的待深化原型 |
| 04 安全治理展示廊 | 众智园清河界面 | 产业测试验证 | 把治理规则转译为可参观、可监督的公共界面 |
| 05 开源发布厅 | 北京AI原点社区 | 公共服务 | 成果发布、代码贡献展示和小型路演空间 |
| 06 校企转化客厅 | 北京AI原点社区 | 公共服务 | 孵化、法务、知识产权和投融资服务 |
| 07 人才生活管家 | 原点社区人才公寓 | 生活服务 | 人才安家、通勤、社区服务的集成入口 |
| 08 大钟寺国际路演客厅 | 大钟寺AI产业聚集区 | 公共服务 | 智能体、智能终端和内容消费企业的展示洽谈 |
| 09 数据要素剧场 | 大钟寺片区 | 公共服务 | 以合规、授权、可审计为前提的数据要素流通界面 |
| 10 AI慢行导航 | 京张遗址公园活力带 | 公共服务 | 可解释导视和低侵入传感识别慢行断点 |
| 11 清河低碳创新廊 | 众智园临清河界面 | 公共服务 | 绿色空间、雨洪、步行骑行和 AI 展示结合 |
| 12 全球AI活动周路线 | 一带公共空间系统 | 公共服务 | 从遗址文化、开源社区、产业展示到国际路演的可步行路线 |

AI 场景必须落到空间与治理边界：公共空间场景引用 [data:geometry/public_space.geojson#PUBLIC-001]，慢行与交通场景引用 [data:geometry/roads.geojson#ROAD-001]，开放空间场景引用 [data:geometry/green_space.geojson#GREEN-001] 和 [metric:public_space_ratio]、[metric:green_ratio]。12 个场景节点已进入 [data:geometry/constraints.geojson#SCENARIO-001]，计为 [metric:scenario_node_count]。AI 治理建议遵守数据最小化、公开来源、可解释和人工复核原则，城市智能体不得替代规划审批、不得输出未经授权的个人画像、不得声称获得官方实施承诺 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

**「交路交接协议」的场景治理落地（Rail Handoff Protocol）**：本方案把"创新交接"作为 AI 场景治理的统一机制——每个场景在进入公共试用前，须依次通过「策源交接→转化交接→交付交接」三段验收：策源段核验数据来源与清权、转化段核验人工复核与可退出、交付段核验运营台账与责任主体，未通过前一段不得进入下一段。这与京张铁路"交路接力、逐段签认"的行车纪律同构，把可追溯性写入场景运营，区别于仅停留在空间结构层面的同类方案。

## 用地、建筑规模与拆改留方案

用地方案依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 表达，形成完整、闭合、无缝的用地分区（[metric:site_area_sqm] 覆盖无缝隙/无重叠）。用地结构以「一支主交路」为骨架：主交路绿道及其缓冲以公园绿地（1401）与防护绿地（1402）[data:geometry/green_space.geojson#GREEN-001] 表达，三处交路点内部以科研用地（0802）为核心、商业服务（05）与广场（1403）[data:geometry/public_space.geojson#PUBLIC-001] 配套，两侧分布城镇住宅（0701）与社区服务（0702）人才社区，地块尺度嵌入教育（0804）与文化（0803）节点。`land_use.geojson` 的每个图斑带 `land_use_code`，与国土空间分类术语一致。

建筑方案区分保留、改造、更新、新建或待确认对象，明确建筑基底、功能、规模、风貌、体量和高度控制的建议层级 [depth:height_massing_character] [depth:retain_renovate_demolish]。本方案 [metric:building_footprint_area_sqm] 约 39.8 万平方米、概念建筑密度约 3.5% [metric:building_density]，属概念性空间供给测算，非控规结论；现状建筑、权属、控规和工程条件缺失时，只能提出方法和待校准清单，不编造拆改留结论。建筑类型使用 `enums/building_types.json`（ai_r_and_d、lab、incubator、office、mixed_use、talent_apartment、community_service、retail、cultural、education、existing_retained），示例 [data:geometry/buildings.geojson#BLDG-001]。

## 交通、轨道、市政与公共服务设施

交通方案回应公告对轨道站点一体化、道路微循环、慢行断点、对外交通、停车、非机动车停放和绿色交通系统的要求 [depth:traffic_rail_slow_parking]。本方案构建「主交路绿道 + 三站接驳 + 步行缝合轴」复合网络：主交路绿道沿遗址走廊南北贯通（[data:geometry/roads.geojson#ROAD-001]），五道口、清华东路西口、大钟寺站三处轨道接驳以 `transit_connection` 表达（[data:geometry/constraints.geojson#CONST-RAIL-001]），重点区内部以 `pedestrian` 与 `cycleway` 缝合校区、园区、街区。道路里程合计约 15.6 公里 [metric:road_length_m]。北五环界面以现状主干路示意 [data:geometry/constraints.geojson#CONST-ROAD-001]，不新增工程结论。

市政和公共服务设施覆盖 AI 产业服务、创新服务平台、人才生活服务、新型基础设施、分布式能源、端侧算力和传统市政设施融合 [depth:municipal_new_infrastructure]。缺少管线、能源、排水、防洪、消防等工程资料时，列为正式深化前置条件，通过 [source:PROCESSED-FACT-PACK] 的 `missing_data_checklist.csv` 登记。若提交边界为 provisional，交通结论也只能作为临时设计讨论。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿空间方案以京张遗址公园活力带为骨架，统筹清河、小月河、周边高校、企业、社区出行需求，提出南北贯通、东西连通的步道、骑行道和绿色空间体系 [depth:blue_green_public_space]。本方案绿地与开敞空间约 412 万平方米、绿地率约 36.1% [metric:green_space_area_sqm] [metric:green_ratio]，公共空间约 24.8 万平方米、公共空间率约 2.2% [metric:public_space_area_sqm] [metric:public_space_ratio]。主交路绿道（1401）+ 防护绿地（1402）[data:geometry/green_space.geojson#GREEN-001] 与广场（1403）[data:geometry/public_space.geojson#PUBLIC-001] 共同形成慢行复合环，识别慢行断点、上跨环路节点、公园南北景观节点，提出停车、体育、创新交往、科技测试、应用展示和公共服务复合利用策略。城市设计管理办法要求统筹景观风貌、公共空间和建筑控制 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

城市风貌融合京张铁路历史文化、中关村创新文化和 AI 创新文化，利用清华园火车站等文化资源，提出城市基调、建筑风貌、屋顶形态、体量、界面和公共艺术引导 [depth:height_massing_character]。风貌控制分清官方管控、设计建议和待确认条件，严禁在没有文保或控规依据时给出伪精确控制线。

### agent.4 AI 公共空间、智能原生新业态与朝圣地标

针对任务书 agent.4「AI公共空间、智能原生新业态与朝圣地标设计；不少于3个AI朝圣地标；荣誉展示体系」[source:AGENT-TASKBOOK]，本方案提出 4 处「交路朝圣地标」与「荣誉展示体系」，均以「概念建议/可供专业团队深化研究」措辞：

| 朝圣地标 | 所在重点区 | 设计方向 | 荣誉/展示功能 |
| --- | --- | --- | --- |
| 清华园车站旧址·发车原点 | AI原点社区 | 以车站旧址为策源起点，串联百年铁轨与百年AI的记忆起点 | 百年京张记忆展陈、詹天佑与人字轨致敬节点 |
| 交路交接广场 | AI原点社区 | 换乘交路点·成果交接的公共广场，交路交接动势雕塑 | 开发者贡献荣誉柱、交接签认墙、年度贡献者铭刻 |
| 大钟寺智能灯塔 | 大钟寺AI产业聚集区 | 交付交路点·面向城市与轨交节点的智能经济展示灯塔 | 智能体/智能终端年度发布与荣誉展示 |
| 清河低碳客厅 | 众智园AI自主创新加速区 | 提速交路点·临清河低碳创新交往界面 | 开源成果展示廊、标准治理公开评议节点 |

朝圣地标与荣誉体系对应 [data:geometry/constraints.geojson#SCENARIO-001] 场景节点与 [metric:landmark_count]、[metric:scenario_node_count]，并作为 [depth:blue_green_public_space] 公共空间组件库的一部分。荣誉体系纳入公开、可追溯、可更新的贡献记录，避免过度娱乐化或网红化；所有纪念内容须版权清权。大钟寺片区叠加「智能原生新业态」：智能终端展示、内容消费、数据要素与国际路演，均按概念建议表述。

### agent.5 百年京张文化、中关村文化与 AI 新文化融合叙事

针对任务书 agent.5「京张铁路历史文化资源系统；中关村创新文化与AI新文化叙事；导视、标识、符号系统；城市气质和国际传播叙事」[source:AGENT-TASKBOOK]，本方案组织「三源叙事」：**铁路源**（1909 詹天佑自主筑路与「人字轨」「机车交路」，工程自主与接力精神）＋**中关村源**（从电子一条街到科学城，创新市场化精神）＋**AI 新文化源**（开源、共治、人机协作）。三源在空间上由「主交路」贯通，形成「从机车交路到创新接力」的公共叙事主线——铁路靠交路制度跑完全程，今天的 AI 创新靠交路接力完成从策源到交付，避免把文化只当科技装饰或口号。

- **导视系统方向**：「交路刻度」里程碑体系——沿主交路绿道按历史里程设置双语交接刻度式导视，结合无屏触觉标记与无障碍标识，服务国内外访客与残障人群。
- **空间文化载体**：发车段、换乘段、加速段、交付段分段叙事；清华园车站旧址为发车原点，交路交接广场为换乘原点，大钟寺智能灯塔为交付原点。
- **国际传播叙事**：以「One Rail, a Century of Handoffs」统一对外传播，突出「铁路接力×AI 创新交接」的世界稀缺组合，服务国际传播力评审维度。

该叙事与标识系统须与 agent.1 的一带 Logo/视觉体系区分定位（文化标识系统 ≠ 一带品牌系统），并遵守文保与版权边界。

## 更新项目清单、实施政策与分期计划

实施方案形成可审查的更新项目清单，说明项目位置、类型、功能、责任主体、依赖条件、实施阶段、风险和评估指标 [depth:renewal_project_list]。`geometry/phasing.geojson` 表达三期分期 [data:geometry/phasing.geojson#PHASE-001]：近期试点约 652.6 万平方米 [metric:phase_1_area_sqm]（三处交路点+主交路主轴，轻量设施、运营活动与服务平台优先启动）；中期联动约 97.2 万平方米 [metric:phase_2_area_sqm]；远期纵深约 391.4 万平方米 [metric:phase_3_area_sqm]。分期深度由 [depth:phasing_implementation] 管理。

| 项目编号 | 项目名称 | 类型 | 主要依赖 | 证据引用 |
| --- | --- | --- | --- | --- |
| JZ-01 | 京张遗址公园慢行断点缝合 | 公共空间/交通 | 道路红线、桥下空间、交通组织复核 | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | 众智园清河创新界面 | 蓝绿空间/产业展示 | 河道蓝线、生态和防洪条件 | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | 原点社区近校成果转化街 | 城市更新/产业服务 | 校区边界、权属、首层业态 | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 轨道站点、道路交叉口、市政管线 | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI公共服务与端侧算力节点 | 新基建/公共服务 | 能源、算力、安全和运营主体 | [data:geometry/constraints.geojson#CONST-RAIL-001] |
| JZ-06 | 全球AI活动周公共路线 | 运营/品牌 | 公共空间许可、活动安全、版权清权 | [data:geometry/phasing.geojson#PHASE-001] |

政策建议覆盖城市更新统筹实施、空间供给、运营机制、产业服务、公共参与、数据治理和产权协同。若缺少权属、资金、实施主体和审批路径，项目必须写成实施风险，而不是承诺落地。

### agent.6 一带全球AI创新活动体系与长期运营设计

针对任务书 agent.6「年度活动体系；活动品牌与传播视觉系统；开发者社区运营机制；AI场景开放运营机制；公共体验和城市地标运营；国际传播和招引转化机制」[source:AGENT-TASKBOOK]，本方案以「交路运营」机制建议回应（均为概念建议，不构成政府承诺或已定安排）：

- **年度活动体系**：京张接力交路节（年度主活动，主题为"一年一交路"）、场景开放日（定期）、开发者周（年度）、国际交路奖（年度表彰，表彰"把创新成功交接给下一棒"的团队）；活动路线沿 [data:geometry/phasing.geojson#PHASE-001] 公共系统组织。
- **活动品牌与传播视觉**：复用 agent.1 视觉体系，形成「活动—传播—地标」一致的视觉语言；传播内容双语化，服务国际传播力。
- **开发者社区运营**：以"交接"为核心组织开发者协作——代码/成果在交路点提交、合并、交接（agent.4 交接签认墙）、贡献者荣誉积分、公开数据与代码资产托管、Agent 沙盒开放测试，形成「提交—交接—合并」闭环。
- **AI 场景开放运营**：以「公开测试 + 预约制沙盒」开放模型红队测试场、标准治理沙盒等 [data:geometry/constraints.geojson#SCENARIO-001]，以"交路交接协议"约束——场景未通过前一段验收不进入下一段，明确数据边界、人工复核与退出机制。
- **公共体验与地标运营**：朝圣地标与主交路绿道以轻量设施、活动与服务平台优先启动（对应 [metric:phase_1_area_sqm] 近期试点）。
- **国际传播与招引转化**：以「试点→交接→采购→落地」路径承接国际企业、开发者与人才，设置明确的转化指标与风险披露，不夸大活动效果，不把招商、政策、资金写成确定承诺。

该运营体系与更新项目清单、分期计划共同构成 agent.6 的可审查证据，并由 [depth:phasing_implementation] 与 [depth:risk_missing_data] 检查其落地边界。

## 指标体系、面积复算与合规矩阵

指标体系至少包含总体设计范围面积、重点区域面积、绿地与公共空间比例、建筑基底、更新项目数量、AI 场景节点、慢行连通指标、产业空间指标、人才服务指标和自检状态 [depth:metrics_recalculation]。所有 known 指标必须能从 GeoJSON 或可信来源复算；unknown 指标必须给出原因和正式提交前置条件。`scripts/spatial_review.py` 和 `scripts/visual_review.py` 的结果是 formal 自检的重要证据。

本方案的总体设计范围面积、绿地与公共空间率、建筑基底、重点区面积与分期面积等核心指标，均由 geometry 在 EPSG:4548 复算（[data:geometry/site_boundary.geojson#SITE-001]）。完整指标与证据对照如下表，正文各章节亦分点引用对应指标：

| 指标 | 证据来源 |
| --- | --- |
| 总体设计范围 | [metric:site_area_sqm] · [data:geometry/site_boundary.geojson#SITE-001] |
| 重点区域数量 | [metric:key_area_count] · [data:geometry/key_areas.geojson#PROV-KEY-001] |
| 绿地与开敞空间 | [metric:green_space_area_sqm] · [metric:green_ratio] · [data:geometry/green_space.geojson#GREEN-001] |
| 公共空间 | [metric:public_space_area_sqm] · [metric:public_space_ratio] · [data:geometry/public_space.geojson#PUBLIC-001] |
| 建筑基底 | [metric:building_footprint_area_sqm] · [metric:building_density] · [data:geometry/buildings.geojson#BLDG-001] |
| 道路/绿道里程 | [metric:road_length_m] · [data:geometry/roads.geojson#ROAD-001] |
| 众智园面积 | [metric:key_area_area_zhongzhiyuan_ai_acceleration_area_sqm] |
| AI原点社区面积 | [metric:key_area_area_beijing_ai_origin_community_sqm] |
| 大钟寺面积 | [metric:key_area_area_dazhongsi_ai_industry_cluster_sqm] |
| 近期试点 | [metric:phase_1_area_sqm] |
| 中期联动 | [metric:phase_2_area_sqm] |
| 远期纵深 | [metric:phase_3_area_sqm] |
| AI场景节点 | [metric:scenario_node_count] |
| 朝圣地标 | [metric:landmark_count] |

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

合规矩阵是任务响应性的主控文件，`compliance_matrix.json` 覆盖公告 1.3、1.4、1.5 全部 17 条任务与 agent.1—agent.6 六条智能体任务，每条映射到报告章节、图层、指标、图纸、HTML 页面、来源、假设和自检项。未能覆盖任一必选任务的方案不得进入 formal professional scoring。正式深化时把指标分为三类：可直接由提交几何复算的空间指标、需官方控规支撑的管控指标（容积率、建筑高度、密度、退线、红线、设施标准）、需运营数据持续校准的绩效指标（创新指数、人才密度、活动参与度、场景使用频次），分别进入 `metrics.json`、`assumptions.json` 与 `compliance_matrix.json`。

## 风险、版权与合规说明

本方案主文件为中文，并提供 `proposal.en.md` 完整对照译文（缺少译稿只产生 non-blocking warning）。风险与缺资料清单由 [depth:risk_missing_data] 管理，并以约束图层 [data:geometry/constraints.geojson#CONST-RAIL-001] 与任务包 [source:SITE-PACKAGE] 相互校核；公开资料登记 [source:PROCESSED-FACT-PACK] 与控规深度要求 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 亦纳入本风险章节。`missing_data_checklist.csv` 列出的 official boundary、key area、控规、道路、地块、建筑、市政、文保和公共服务缺口，已进入 `assumptions.json` 与自检风险章节。任何缺少官方控规、道路红线、权属、市政、消防或文保条件的结论，均降级为待确认事项，不构成实施承诺。

本方案所有图片、图纸、图标、数据和代码资产在 `report/copyright_statement.md` 中说明来源、许可和授权状态。HTML 页面（`visual/index.html`、`report/proposal.html`）不加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API，不跟踪评审者行为。本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施；AI agent 对事实、来源、版权、空间数据、指标和表达负责。

## 参考资料

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/agent_taskbook.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- brief/site-package/geometry/provisional_boundaries.geojson
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- data/processed/agent_task_requirements.csv
- data/processed/source_use_matrix.csv
- data/processed/missing_data_checklist.csv
- docs/terminology-glossary.md
- 机器可读引用索引（完整证据链见 `sources.json`、`standard_matrix.json`、`design_depth_matrix.json` 与 `metrics.json`）：
  - 首要依据：公告 [source:OFFICIAL-ANNOUNCEMENT] 与任务书 [source:AGENT-TASKBOOK]
  - 任务包与登记表：[source:SITE-PACKAGE] · [source:SOURCE-REGISTRY] · [source:PROCESSED-FACT-PACK]
  - 边界与重点区：[source:BOUNDARY-SOURCE] · [source:KEY-AREA-SOURCE]
  - 专业标准：[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] · [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] · [standard:MOHURD-URBAN-DESIGN-MEASURES] · [standard:MOHURD-CONTROL-DETAILED-PLANNING] · [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] · [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]
  - 深度与指标：[depth:metrics_recalculation] · [data:geometry/site_boundary.geojson#SITE-001] · [metric:site_area_sqm]
