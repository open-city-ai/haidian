---
title: "京张智脉：JINGZHANG AI COMMONS"
author_github: "EmotionLLL"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "基于 provisional boundary 和结构化自检要求生成的 formal AI 城市设计方案包；保留精度警示和复算要求，但组织方数据缺口不阻断内容评分。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张智脉：JINGZHANG AI COMMONS

## 设计依据与资料清单

本 formal 方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，并以 `brief/site-package/` 中经维护者登记的临时粗略边界、重点区域、枚举、指标和来源清单为机器可读依据。AI agent 在生成方案前必须读取 `design_brief.json`、`allowed_design_space.json`、`sources.json`、`enums/`、`ranges/`、`schemas/`、`data/source_registry.json` 和 `data/processed/agent_fact_pack.md`，并用 `project_scope_summary.csv`、`agent_task_requirements.csv`、`source_use_matrix.csv`、`missing_data_checklist.csv` 建立任务、范围、资料用途和缺口清单。所有设计判断都要拆分为可追溯来源、可复算指标、可校验图层和可人工复核假设。公告要求方案达到控制性详细规划的城市设计深度和规划综合实施方案的城市设计深度，因此文本叙述不能替代 GeoJSON、指标表、A3 文册、A0 展板和 HTML 电子展示成果。

本节证据链引用 [source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SITE-PACKAGE]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]、[source:BOUNDARY-SOURCE]、[source:KEY-AREA-SOURCE]、[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[standard:MOHURD-ARCH-DESIGN-DEPTH-2016] 和 [depth:existing_conditions_diagnosis]，用于说明方案不是独立愿景文本，而是从公告、面向智能体任务书、标准、边界、处理资料包和资料清单出发组织成果。

资料登记表的使用边界如下：

- data/source_registry.json 登记公开、清权与临时资料的用途边界。
- 当前登记摘要：formal 可用资料 5 条，背景资料 0 条，provisional-only 资料 1 条。
- agent 不得把 background_only 或 provisional_only 资料升级为 official boundary、法定控规、正式评分依据或政府实施承诺。

`data/processed/agent_fact_pack.md` 是本方案的阅读导航层，不是新的权威来源。[source:PROCESSED-FACT-PACK] 只帮助 agent 把三层范围、三处重点区、公告任务、agent.1-agent.6、资料可用性和缺资料事项组织成可读方案；所有事实判断仍回到 [source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SOURCE-REGISTRY]、[source:BOUNDARY-SOURCE] 与 [source:KEY-AREA-SOURCE]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

本脚手架在官方 `SITE_BOUNDARY` 或三处 `KEY_AREA` 尚未取得时，使用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成临时 formal 包。提交包中的 `geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均必须标注为 `provisional_constraint`、`official_boundary=false`，只能用于方案生成、自检、可视化和设计讨论，不能作为 official redline、审批依据、精确面积依据或法定控制结论。该组织方数据缺口本身不阻断内容评分；替换 official polygons 后，site boundary、key areas、land use、roads、green space、public space、buildings、phasing 和 metrics 均需重算。

本次脚手架生成的可评分状态为：**临时边界，保留精度警示并待正式数据发布后复算；不阻断内容评分**。因此，正文中的空间结构、场景、项目和指标均按“可讨论、可复核、可替换官方边界后重算”的原则写入；当官方边界和重点区 polygon 更新后，agent 必须重新运行脚手架、自检和图纸/HTML生成，不能只替换单个文件。

边界和重点区域的可读解释对应 [data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#PROV-KEY-001] 和 [metric:site_area_sqm]、[metric:key_area_count]。这意味着读者可以从正文回到 GeoJSON 查看边界来源、从 metrics 查看面积复算结果、从 sources 查看资料来源，而不是只相信一段文字判断。

## 三层范围工作框架

方案按照公告确定的三个层次组织工作：统筹研究范围关注 43.6 平方公里的AI产业生态、战略定位、创新链和未来城市形态；总体设计范围关注 11.4 平方公里京张遗址公园周边 1-2 公里城市地区和产业区，要求形成城市更新总体框架、产业空间布局、交通市政支撑和城市风貌控制；重点区域范围关注 368.4 公顷三处详细设计地区，要求明确功能业态、建筑规模、拆改留分类、公共空间连通和交通组织。三层范围在 `compliance_matrix.json` 中逐条映射，保证公告 1.3、1.4、1.5 与 agent.1-agent.6 的必选任务都有章节、图层、指标、图纸和 HTML 证据。

三层工作框架的深度项由 [depth:three_level_scope_framework] 和 [depth:overall_spatial_structure] 约束，空间证据以 [data:geometry/site_boundary.geojson#SITE-001] 与 [data:geometry/key_areas.geojson#PROV-KEY-001] 为准，任务依据以 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 为准，范围索引以 [source:PROCESSED-FACT-PACK] 中 `project_scope_summary.csv` 的三层范围表为导航。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

三层工作不是互相割裂的图纸集合。统筹研究决定产业链和城市形态判断，总体设计把判断落实到更新项目、空间结构和设施承载，重点区域详细设计验证具体地块、建筑、交通、公共空间和AI应用场景的可实施性。agent 生成方案时必须先锁定当前提交采用的 official 或 provisional 边界和约束，再生成用地、建筑、道路、绿地、公共空间、分期和AI服务节点，最后从这些图层复算指标并在正文解释哪些结论仍受 provisional boundary 限制。任何无法从结构化数据复算的面积、比例、规模或项目数量，不得写入正式结论。

本方案建议的总体概念为“京张智脉 · JINGZHANG AI COMMONS”：以京张遗址公园为历史与公共空间主轴，以众智园、北京AI原点社区、大钟寺三处重点片区为创新锚点，以高校、企业、社区和轨道站点为日常网络，形成“一脉三核、两翼协同、十景体验、百年时间廊”的空间组织。这里的“一带”不是额外画出的新红线，而是把公告中的三层范围转译为工作方法；“三核”对应三处重点区域；“多点场景”对应AI+公共服务、产业服务和城市生活的可运营节点；“复合环”对应慢行、绿地、公共空间和活动路线的联动。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI产业生态和未来城市形态如何组织 | 建立“高校策源-开源协作-企业转化-公共体验-国际传播”的创新链 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 产业空间、城市更新、交通市政和风貌如何落图 | 用地、建筑、道路、绿地、公共空间和分期图层共同表达 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出定位、空间动作、AI场景和实施依赖 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

## 统筹研究范围产业与未来城市研究

统筹研究范围的核心任务是构建世界级 AI 创新生态体系。方案应梳理海淀高校院所、头部企业、算力算法数据要素、孵化平台、上市企业、独角兽和科技服务资源，提出AI创新链、产业链、人才链和城市服务链的空间协同框架。命名方案和 logo 设计应服务于“百年京张文化带、都市AI生活体验带、AI融合创新带”的整体辨识度，不能只停留在口号，应说明与产业生态、公共空间和文化资源的关联。面向智能体任务书还要求回应“五大功能”和“三区两翼”协同，形成可继续深化的命名系统、视觉识别、总体空间结构图、场景开放和运营机制；本节必须用 [source:AGENT-TASKBOOK] 与 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 标注这些要求来自 agent 开源征集任务，而不是法定规划控制。

统筹研究并不新增伪精确红线；它通过 [standard:MOHURD-URBAN-DESIGN-MEASURES] 要求的城市风貌、公共空间和建筑布局统筹，回接 [data:geometry/land_use.geojson#LU-001]、[data:geometry/public_space.geojson#PUBLIC-001] 与 [depth:overall_spatial_structure]，说明产业策略最终要落到可见、可复核的空间结构。

未来城市形态研究应回答人工智能如何改变工作、生活、社交、学习、交通和公共服务。方案应把AI交通系统、连续绿色空间、创新服务设施和国际化生活工作氛围落实为可定位的功能区、节点、廊道和场景，而不是泛泛描述技术愿景。agent 应把产业战略指标、AI创新指数、人才密度、空间供给类型和AI+垂直应用重点区域写入指标体系，并标明哪些是官方、哪些是设计建议、哪些仍待正式数据校准。若提出全球AI创新活动、开发者社区、开放场景或朝圣路线，应写为“概念建议/参考方案/可供专业团队深化研究”，不得写成已经确定的政府活动或实施安排。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围要求达到控制性详细规划的城市设计深度。方案必须提出城市更新总体空间结构、低效空间识别、更新项目清单、实施政策建议、产业功能比例、空间组织模式、建筑总规模和综合承载能力评估。`geometry/land_use.geojson` 应完整覆盖设计边界且无重叠，`geometry/buildings.geojson` 应表达更新建筑基底或保留建筑基底，`geometry/roads.geojson` 应表达微循环、慢行和轨道接驳关系，`metrics.json` 应复算核心面积、比例和图层数量。

本节按照 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 把控规深度内容拆成可审查对象：[data:geometry/land_use.geojson#LU-001] 表达用地结构，[data:geometry/buildings.geojson#BLDG-001] 表达建筑基底，[data:geometry/roads.geojson#ROAD-001] 表达交通组织，[metric:building_footprint_area_sqm] 用于复核建筑基底面积，[depth:land_use_layout] 与 [depth:development_intensity_controls] 约束成果深度。

总体设计还必须支撑交通、轨道、市政和配套设施。方案应围绕轨道站点一体化、道路微循环、非机动车停放、停车供给、创新服务平台、人才生活服务、新型基础设施、分布式能源和端侧算力提出空间布局和实施路径。涉及建筑高度、开发强度、道路红线、退线和设施标准的内容，若尚无官方控制条件，应写为“待正式控规条件确认”，不得以 agent 推测值冒充审定指标。

## 重点区域详细设计

重点区域详细设计是必选项。众智园AI自主创新加速区应围绕国家人工智能平台、全栈自主创新、标准制定、安全治理、产业展示、对外交通、清河文化、低碳绿色创新交往环境和绿色空间AI场景提出详细方案。北京AI原点社区应围绕近校创新、成果孵化转化、人才特区、开源体系、品牌活动、建筑拆改留、成果展示发布、居住生活配套、校区园区慢行联系和轨道站点一体化提出详细方案。大钟寺AI产业聚集区应围绕领军企业、智能体、智能终端、内容消费、数据要素、数字资产、商业服务、规划绿地复合利用、大钟寺站一体化和路口四象限步行连通提出详细方案。

三处重点区域详细设计必须引用 [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003]，并由 [depth:three_key_area_detailed_design] 检查是否达到规划综合实施方案深度。若只描述“打造示范区”而没有功能、建筑、交通、公共空间和实施项目证据，应被视为未完成。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

三处重点区域必须在 `geometry/key_areas.geojson` 中出现。若仓库已提供 official polygons，应作为 `official_constraint` 使用；若 official polygons 缺失，可暂用 `provisional_constraint`，但正文、HTML、sources、assumptions 和 self_check 必须说明它不能作为正式评分或审批依据。`compliance_matrix.json` 应分别覆盖公告 1.5.3.1、1.5.3.2、1.5.3.3。设计表达应包含功能业态、建筑规模、建筑形态、拆改留分类、公共空间系统、交通组织、慢行连通和实施项目。HTML 页面应能切换查看三处重点区域，A3 文册和 A0 展板应至少包含重点片区总图、局部详图和指标说明。

| 重点片区 | 设计定位 | 空间动作 | AI产业与运营场景 | 证据引用 |
| --- | --- | --- | --- | --- |
| 众智园AI自主创新加速区 | 花园型全栈自主创新街区 | 强化清河界面、产业展示、低碳创新交往和对外交通组织；以绿色空间承载开放测试与标准治理展示 | 自主模型测试、标准制定工作坊、安全治理展示、低碳算力体验 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[depth:three_key_area_detailed_design] |
| 北京AI原点社区 | 近校型成果转化与人才社区 | 组织校区、园区、街区慢行缝合；补足成果发布、人才服务、居住生活和开源协作空间 | 开源社区、成果发布、人才特区服务、近校孵化 | [data:geometry/key_areas.geojson#PROV-KEY-002]、[source:AGENT-TASKBOOK] |
| 大钟寺AI产业聚集区 | 城市型智能经济与国际交往街区 | 围绕大钟寺站一体化、四象限步行连通、商业服务和重点企业公共环境更新 | 智能体与智能终端展示、内容消费、数据要素与国际路演 | [data:geometry/key_areas.geojson#PROV-KEY-003]、[metric:key_area_count] |

## AI 创新生态、人才画像与 AI+ 场景

方案应建立面向AI人才和企业的空间需求画像，覆盖研发办公、开源协作、成果发布、企业服务、人才居住、社交学习、消费生活、运动休闲和国际交往。AI+场景应围绕公告提出的交通、服务、消费、医疗、教育、法律、生活服务等方向，形成产业发展场景和AI赋能城市功能场景。每个场景应说明服务对象、空间位置、数据来源、隐私边界、人工复核机制和运营主体。

AI 场景必须落到空间和治理边界：公共空间场景引用 [data:geometry/public_space.geojson#PUBLIC-001]，慢行与交通场景引用 [data:geometry/roads.geojson#ROAD-001]，开放空间场景引用 [data:geometry/green_space.geojson#GREEN-001] 和 [metric:public_space_ratio]、[metric:green_ratio]。这些引用让评审者知道场景不是口号，而是位于具体图层和指标中的设计对象。面向智能体任务书要求不少于10张AI场景卡、不少于3个产业测试验证场景和不少于5类用户画像；脚手架只给出结构，正式参赛者必须把场景卡、画像表、隐私边界、人工复核和运营主体写入正文、HTML、A3/A0 和合规矩阵。

| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 原点社区开源发布厅、公共代码墙、夜间协作空间 | 不采集个人行为轨迹；活动数据只做聚合统计 |
| 初创团队 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力服务点、标准治理咨询 | 算力和数据服务需另行授权 |
| 头部企业访客 | 展示、商务、国际接待、人才招聘 | 大钟寺国际路演客厅、轨道站点接驳、重点企业周边公共空间 | 企业标识和案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 京张遗址公园慢行环、社区服务嵌入、夜间照明和活动分级 | 不将居民画像用于商业推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 校区-园区慢行缝合、成果转化驿站、AI教育体验点 | 校园数据和科研成果需授权 |

| 场景卡 | 空间载体 | 设计说明 |
| --- | --- | --- |
| 01 开源发布厅 | 北京AI原点社区 | 面向高校、开源社区和初创团队，提供成果发布、代码贡献展示和小型路演空间 |
| 02 安全治理沙盒 | 众智园 | 将标准制定、安全评测、模型红队测试转译为可参观、可预约、可监管的展示和协作节点 |
| 03 端侧算力驿站 | 总体设计范围节点 | 与公共服务、企业服务和低碳能源策略结合，作为待深化的新型基础设施原型 |
| 04 AI慢行导航 | 京张遗址公园活力带 | 用可解释导视和低侵入传感帮助识别慢行断点、拥挤节点和无障碍需求 |
| 05 大钟寺国际路演客厅 | 大钟寺AI产业聚集区 | 服务智能体、智能终端和内容消费企业的展示、洽谈、媒体发布和国际交流 |
| 06 清河低碳创新廊 | 众智园临清河界面 | 把绿色空间、雨洪、步行骑行和AI展示结合，作为园区公共客厅 |
| 07 近校成果转化街 | 北京AI原点社区 | 面向高校成果转化，组织孵化、展示、法务、知识产权和投融资服务 |
| 08 数据要素会客厅 | 大钟寺片区 | 以合规、授权、可审计为前提，展示数据要素和数字资产流通的城市服务界面 |
| 09 AI生活服务样板街 | 社区与商业交汇处 | 将医疗、教育、法律、生活服务等AI+场景落到可运营的小尺度街区空间 |
| 10 全球AI活动周路线 | 一带公共空间系统 | 形成从遗址文化、开源社区、产业展示到国际路演的可步行、可传播体验路线 |

agent 生成的AI治理建议必须遵守数据最小化、公开来源、可解释和人工复核原则。城市智能体可以辅助识别慢行断点、公共空间热力、设施维护、企业服务需求和活动安全风险，但不能替代规划审批、不能输出未经授权的个人画像、不能声称获得官方实施承诺。所有AI场景节点应进入结构化图层或合规矩阵，便于评审者看到它们与产业、空间和公共利益之间的关系。

## 用地、建筑规模与拆改留方案

用地方案应依据国土空间调查、规划、用途管制分类等公开标准表达，形成完整、闭合、无缝的用地分区。建筑方案应区分保留、改造、更新、新建或待确认对象，明确建筑基底、功能、规模、风貌、屋顶、体量和高度控制的建议层级。若缺少现状建筑、权属、控规和工程条件，方案只能提出方法和待校准清单，不能编造拆改留结论。

用地分类依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，建筑高度、体量、界面和风貌控制由 [depth:height_massing_character] 管理，拆改留方法由 [depth:retain_renovate_demolish] 管理。用地和建筑的主要证据是 [data:geometry/land_use.geojson#LU-001]、[data:geometry/buildings.geojson#BLDG-001] 和 [metric:building_footprint_area_sqm]。

建筑规模和强度指标必须与 `metrics.json` 和图层一致。若总建筑规模、容积率、建筑高度、建筑密度、绿地率、退线和建筑控制线缺少官方条件，应在指标体系中列为 unknown 或 pending_control，不得用固定数值制造精确感。A3 文册应给出更新项目清单和指标复核表，A0 展板应把关键空间结构和重点片区表达清楚，HTML 页面应提供指标和图层联动查看。

## 交通、轨道、市政与公共服务设施

交通方案应回应公告对轨道站点一体化、道路微循环、慢行断点、对外交通、停车、非机动车停放和绿色交通系统的要求。重点应覆盖北五环、京张遗址公园跨环路节点、五道口、清华东路西口、大钟寺站及重点企业周边交通联系。道路和慢行图层应保持在提交边界内，并与公共空间、绿地、产业节点和重点片区相互校核；若提交边界为 provisional，交通结论也只能作为临时设计讨论。

交通和市政专业深度分别由 [depth:traffic_rail_slow_parking] 与 [depth:municipal_new_infrastructure] 约束；图层证据引用 [data:geometry/roads.geojson#ROAD-001]、[data:geometry/public_space.geojson#PUBLIC-001] 和 [data:geometry/constraints.geojson#CONSTRAINTS]。当道路红线、管线、消防和市政条件缺失时，应通过 assumptions 说明待补，而不是把策略写成审定条件。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

市政和公共服务设施应覆盖AI产业服务设施、创新服务平台、人才生活服务设施、新型基础设施、分布式能源、端侧算力和传统市政设施融合。方案应说明设施标准、空间布局、服务半径、运营模式和分期实施逻辑。缺少管线、能源、排水、防洪、消防等工程资料时，应列为正式深化前置条件。

## 蓝绿空间、公共空间与城市风貌

蓝绿空间方案应以京张遗址公园活力带为骨架，统筹清河、小月河、周边高校、企业、社区出行需求，提出南北贯通、东西连通的步道、骑行道和绿色空间体系。方案应识别慢行断点、上跨环路节点、公园南端和北端景观节点，提出停车、体育、创新交往、科技测试、应用展示和公共服务复合利用策略。

蓝绿公共空间由 [depth:blue_green_public_space] 校核，核心证据为 [data:geometry/green_space.geojson#GREEN-001]、[data:geometry/public_space.geojson#PUBLIC-001]、[metric:green_ratio] 和 [metric:public_space_ratio]。城市设计管理办法要求统筹景观风貌、公共空间和建筑控制，因此本节同时引用 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

城市风貌方案应融合京张铁路历史文化、中关村创新文化和AI创新文化，利用清华园火车站、北影等文化资源，提出城市基调、建筑风貌、屋顶形态、体量、界面和公共艺术引导。agent 还应提出导视标识、文化符号、国际传播叙事、AI朝圣地标、贡献墙或荣誉展示体系，但所有品牌、字体、图像、肖像和企业标识都必须有清权来源。风貌控制应分清官方管控、设计建议和待确认条件，严禁在没有文保或控规依据时给出伪精确控制线。

## 更新项目清单、实施政策与分期计划

实施方案应形成可审查的更新项目清单，说明项目位置、类型、功能、责任主体、依赖条件、实施阶段、风险和评估指标。政策建议应覆盖城市更新统筹实施、空间供给、运营机制、产业服务、公共参与、数据治理和产权协同。`geometry/phasing.geojson` 应表达分期范围，`compliance_matrix.json` 应把每个任务与分期和图纸挂接。

项目清单和分期深度由 [depth:renewal_project_list] 与 [depth:phasing_implementation] 管理，分期空间证据为 [data:geometry/phasing.geojson#PHASE-001]。如果没有权属、资金、实施主体和审批路径，方案必须把它写成实施风险，而不是承诺落地。

| 项目编号 | 项目名称 | 类型 | 主要依赖 | 证据引用 |
| --- | --- | --- | --- | --- |
| JZ-01 | 京张遗址公园慢行断点缝合 | 公共空间/交通 | 道路红线、桥下空间、交通组织复核 | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | 众智园清河创新界面 | 蓝绿空间/产业展示 | 河道蓝线、生态和防洪条件 | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | 原点社区近校成果转化街 | 城市更新/产业服务 | 校区边界、权属、首层业态 | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 轨道站点、道路交叉口、市政管线 | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI公共服务与端侧算力节点 | 新基建/公共服务 | 能源、算力、安全和运营主体 | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | 全球AI活动周公共路线 | 运营/品牌 | 公共空间许可、活动安全、版权清权 | [data:geometry/phasing.geojson#PHASE-001] |

分期应与 100 天征集设计周期形成区分：征集周期是提交成果的时间要求，实施分期是城市更新和项目建设的推进路径。方案应提出近期试点、中期更新和长期治理框架，并标明哪些内容可先以轻量设施、运营活动和服务平台启动，哪些必须等待正式控规、市政、交通和权属条件确认。对于年度活动体系、开发者社区运营、场景开放日、公共体验路线和国际传播机制，正文应说明运营对象、频率、责任边界、转化路径和风险，不得只写宣传口号。

## 指标体系、面积复算与合规矩阵

指标体系至少应包含总体设计范围面积、重点区域面积、绿地与公共空间比例、建筑基底、更新项目数量、AI场景节点、慢行连通指标、产业空间指标、人才服务指标和自检状态。所有 known 指标必须能从 GeoJSON 或可信来源复算；unknown 指标必须给出原因和正式提交前置条件。`scripts/spatial_review.py` 和 `scripts/visual_review.py` 的结果是 formal 自检的重要证据。

指标复算深度由 [depth:metrics_recalculation] 管理。本方案正文显式引用 [metric:site_area_sqm]、[metric:key_area_count]、[metric:building_footprint_area_sqm]、[metric:green_ratio]、[metric:public_space_ratio]，并说明这些值来自 [data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/buildings.geojson#BLDG-001]、[data:geometry/green_space.geojson#GREEN-001] 和 [data:geometry/public_space.geojson#PUBLIC-001]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

合规矩阵是任务响应性的主控文件。每条公告任务和 agent_taskbook 任务必须对应到报告章节、图层、指标、图纸、HTML 页面、来源、假设和自检项。未能覆盖公告 1.3、1.4、1.5 或 agent.1-agent.6 的任一必选任务，方案不得进入 formal professional scoring。

正式深化时，agent 还应把每个指标分为三类：第一类是可由提交几何直接复算的空间指标，例如边界面积、绿地比例、公共空间比例、建筑基底面积和分期面积；第二类是需要官方控规或任务书附件支撑的管控指标，例如容积率、建筑高度、建筑密度、退线、道路红线和设施标准；第三类是需要运营或产业数据持续校准的绩效指标，例如 AI 创新指数、人才密度、产业服务满意度、慢行可达性、活动参与度和场景使用频次。三类指标应分别进入 `metrics.json`、`assumptions.json` 和 `compliance_matrix.json`，避免把运营愿景误写成审定规划条件。

## 六项城市建设深化任务包

### 01 总体概念、命名体系与视觉规范

总体概念定名为 **“京张智脉”**，英文名 **JINGZHANG AI COMMONS**。其中“京张”锚定不可替代的铁路历史与地理身份，“智脉”同时指铁路脉络、知识流动和城市生命线，“Commons”强调开源、共享、公共利益和共同治理，而不是封闭园区。空间口号为“**百年轨道，开放智脉**”，国际传播短句为“**Where railway heritage meets open intelligence**”。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:overall_spatial_structure]

命名采用“一总名、三核名、两翼名、十景名”的层级体系：总名统一对外品牌；众智园称“全栈验证核”，AI原点社区称“开源策源核”，大钟寺称“智能经济核”；中关村科技服务翼与小月河场景赋能翼保留任务书名称；十个公共体验节点采用“功能词+空间词”的直白命名，如开源发布厅、低碳算力驿站、数据会客厅，避免以企业名称或短期技术热点命名。

视觉母题不是具象机器人，而是“**双轨形成开放括号，中间一枚流动节点**”：两条轨线代表铁路遗产与未来智能，开放括号代表接纳全球贡献，中间节点代表人始终处于技术系统中心。标志应使用自行绘制的几何线条，不调用未清权字体、企业标识或人物图像。

| 规范项 | 建议值 | 空间应用 |
| --- | --- | --- |
| 主色“智脉青” | `#52E0C4` | 创新节点、慢行主线、数字界面高亮信息 |
| 辅色“铁路金” | `#F2B84B` | 历史节点、轨迹线、重要编号和荣誉信息 |
| 底色“深轨蓝” | `#07151F` | 导视底板、夜间界面、数字展陈背景 |
| 字体方向 | 中文使用合法开源黑体，英文使用合法开源无衬线体 | 先保证识别与无障碍，再追求科技感 |
| 图形语法 | 双轨、节点、时间刻度、开放括号 | 标牌、地面铺装、网页、活动证件与展陈统一延展 |
| 无障碍规则 | 正文对比度不低于 WCAG AA；信息不只依赖颜色 | 导视配合文字、编号、触觉和语音入口 |

### 02 全球案例与海淀AI创新生态链

案例研究只用于机制借鉴，不作为规划控制或空间边界证据。MIT Kendall Square说明高校、研究空间、企业、住房、零售和公共开放空间的近距离混合有助于合作；STATION F以多类加速计划、投资人和共享校园形成从创意到规模化的密集入口；Vector Institute将前沿研究、人才培养、产业采用、医疗应用和治理连接；AI Singapore把基础研究、应用挑战、企业共创、人才培养、开源工具和标准治理纳入同一国家级计划；Hub71设置从构想到MVP、再进入增长计划的分阶段通道；伦敦Knowledge Quarter与Alan Turing Institute展示文化知识机构和可信AI公共对话的结合。[source:SOURCE-REGISTRY]

| 案例 | 可转化机制 | 对海淀的启示 | 不照搬内容 |
| --- | --- | --- | --- |
| MIT Kendall Square | 研究、企业、生活与公共空间混合；以共同空间制造偶遇 | 原点社区补足开放协作、成果发布与人才日常服务 | 不复制高强度开发指标 |
| Toronto Vector Institute | 研究、人才、产业采用、健康数据治理并行 | 形成“研究课题—验证协议—行业应用—治理复盘”链 | 不引入未经授权健康数据 |
| Paris STATION F | 多计划共驻、统一入口、投资人与服务网络集中 | 大钟寺建设“一站式创新服务前台”概念 | 不复制运营规模和企业名单 |
| AI Singapore | 基础研究、国家挑战、企业共创、人才和开源产品联动 | 众智园建立全栈验证与公共问题征集双通道 | 不照搬政府资助承诺 |
| Abu Dhabi Hub71 | 构想、MVP、增长阶段衔接，配套软着陆服务 | 为国际团队设置短期驻留、验证和本地伙伴对接路径 | 不承诺牌照、资金或免费空间 |
| London Knowledge Quarter | 科研、图书馆、文化机构和公众AI素养活动协同 | 把铁路遗产、公园和可信AI教育纳入创新生态 | 不将文化空间工具化为商业展示 |

由此提出海淀的“**七站式创新流水线**”：

1. **基础研究站**：高校院所和开放课题库提出长期问题，输出论文、数据说明和可复现实验。
2. **开源协作站**：AI原点社区提供代码、模型、数据文档和贡献者协作界面，建立清权与安全检查。
3. **原型孵化站**：共享产品工作室支持用户研究、原型开发、知识产权与合规咨询。
4. **全栈验证站**：众智园设置模型评测、软硬协同、可信AI、安全红队和行业沙盒等概念性验证环境。
5. **场景试用站**：小月河场景赋能翼和公共服务节点开展小范围、可退出、可人工接管的场景试用。
6. **资本与企业服务站**：中关村科技服务翼和大钟寺提供路演、法务、财务、人才、市场与国际软着陆接口。
7. **规模传播站**：形成标准案例、开源成果、公共反馈和国际活动内容，再把真实问题回送基础研究站。

每个项目使用一张“创新护照”贯穿七站，记录来源、版本、知识产权、风险等级、验证结果、公众反馈和退出条件。空间上以AI原点社区承担1—3站，众智园承担4站，小月河与沿线街区承担5站，中关村服务翼和大钟寺承担6—7站；这是一套运营与空间映射建议，不构成确定机构设置或财政安排。[data:geometry/key_areas.geojson#PROV-KEY-001] [depth:industry_function_layout]

### 03 AI+未来生活场景落位

未来生活场景采用“**一间前台、一段试用街、一个后台协议**”的通用结构：前台让市民知道AI正在做什么并能选择退出；试用街提供小范围真实环境验证；后台协议限定数据、权限、人工复核和事故处置。场景不以持续身份识别或居民画像交易为基础。[data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/roads.geojson#ROAD-001]

| 场景 | 具体街区与空间组件 | 运行细节 | 人工与数据边界 |
| --- | --- | --- | --- |
| AI+医疗“社区健康导航站” | AI原点社区居住服务界面；设置咨询小间、远程协作屏和转诊信息台 | 只做科普、流程导航、预约辅助和随访提醒；高风险信息立即转人工 | 不做自动诊断；健康数据本地最小化处理并经明确同意 |
| AI+教育“开放学习工坊” | 原点社区近校界面与铁路公园研学节点；可变教室、模型实验桌、教师控制台 | 白天服务学校课程，晚间服务公众AI素养；项目成果进入开源展示 | 未成年人数据不用于商业训练；教师掌握最终教学权 |
| AI+商业“可解释消费街” | 大钟寺站与商业界面；智能导购台、无障碍导航、数字商品护照 | 提供多语言、无障碍与商品信息解释，商户可低成本接入 | 禁止人脸追踪定价；推荐理由可见且可关闭 |
| AI+交通“慢行守护线” | 京张遗址公园及轨道接驳断点；电子墨水牌、无障碍按钮、拥挤提示 | 聚合感知拥挤、积水和设施故障，给出步行骑行替代路线 | 不记录连续个人轨迹；交通处置由人工确认 |
| AI+政务“企业服务协作台” | 中关村科技服务翼与大钟寺路演客厅 | 解释办事材料、匹配公开政策、形成待办清单和转人工接口 | 不代替审批，不承诺政策和资金，不接触非公开材料 |
| AI+文化“百年智轨导览” | 清华园站、遗址公园及十景节点；实体编号、音频和可下载离线包 | 同一路线提供儿童、无障碍、专业和国际访客版本 | 历史事实需来源审核；生成内容醒目标注 |

三个产业验证场景分别为：众智园“模型与芯片软硬协同验证舱”、众智园“可信AI红队与治理沙盒”、大钟寺“智能终端和智能体互操作试验店”。均采用预约、隔离环境、风险分级、日志留存、人工终止和结果公开摘要机制，只表述为可供专业团队论证的测试方案。[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:municipal_new_infrastructure]

### 04 京张遗址公园公共空间与AI地标

公园采用“**一条开发者散步道、两类公共客厅、三座核心地标、十个轻量节点**”的结构。开发者散步道沿既有公共空间与慢行系统组织，不预设桥隧或改变文保边界；每500—800米概念性设置休息、饮水、充电、遮阴、无障碍和小型讨论设施，形成可散步讨论的“户外走廊”。[data:geometry/green_space.geojson#GREEN-001] [metric:green_ratio]

三座核心地标不是大型纪念雕塑，而是可使用、可更新的公共知识设施：

- **开源成果展示廊**：采用可替换模块和电子墨水界面，展示项目问题、版本、贡献者、许可证、验证结果和城市反馈；保留实体档案，避免内容因平台关闭而消失。
- **智能体贡献荣誉墙**：荣誉单位不是“最强模型”，而是可核查贡献事件。分为公共利益、开源工具、城市问题解决、可信治理、教育传播五类；人类团队、机构和AI工具分别署名，禁止AI冒充作者。
- **百年未来门**：以双轨开放括号构成可穿行框架，一侧是铁路时间刻度，另一侧是AI发展与海淀创新事件；年度新增内容必须经历史与技术双重审核。

十个轻量节点包括遗产序厅、无障碍导航点、开源发布厅、低碳算力驿站、治理沙盒、近校转化街、AI生活样板街、数据会客厅、国际路演客厅和百年未来门。节点统一使用可逆安装、低眩光、离线可读、夜间静音和易维护构造；具体基础、供电、消防、文保和绿地条件需专项论证。[depth:blue_green_public_space]

### 05 三种文化融合叙事与导览路线

文化叙事题为“**从钢轨上的现代化，到代码里的共同创造**”。第一层“铁路开路”讲京张铁路所代表的自主工程、连接与现代城市形成；第二层“中关村开窗”讲科学教育、电子一条街、创业与开放协作；第三层“AI开源”讲模型、算力、数据、智能体与负责任创新。三者的共同价值不是“技术崇拜”，而是自主探索、知识共享、公共服务和面向未来。[source:OFFICIAL-ANNOUNCEMENT] [standard:MOHURD-URBAN-DESIGN-MEASURES]

文化导览分为三条可叠加路线：

| 路线 | 时长 | 节点序列 | 主要受众 |
| --- | --- | --- | --- |
| 百年铁路线 | 约90分钟概念路线 | 遗产序厅—铁路设施观察点—清华园站相关文化节点—百年未来门 | 市民、学生、国际访客 |
| 中关村创新线 | 半日概念路线 | 原点社区—近校转化街—开源发布厅—科技服务翼 | 创业者、高校师生、投资与服务机构 |
| AI共同体线 | 一日活动路线 | 众智园验证—治理沙盒—公园荣誉墙—大钟寺路演客厅 | 开发者、企业、专业机构、媒体 |

每个节点设置“看、听、做、议”四层内容：看实体遗存与图文，听多语言口述与无障碍音频，做一个可带走的轻量实验，议一个仍无标准答案的技术治理问题。内容版本、史料来源、版权和更新时间公开显示；生成式讲解必须标注，涉及争议历史或专业判断时转入经审核文本。[depth:height_massing_character]

### 06 全球AI活动体系与长期运营闭环

年度体系采用“一季一主题、全年有社区、项目有转化”的节律，所有活动均为概念建议：

| 季度 | 主活动 | 空间 | 核心产出 |
| --- | --- | --- | --- |
| 春季 | 京张开源季 | AI原点社区+线上仓库 | 城市问题清单、开源项目、贡献者入门、教育课程 |
| 夏季 | 城市测试季 | 众智园+小月河场景赋能翼 | 受控原型、测试报告、风险清单、公众反馈 |
| 秋季 | 全球AI Commons周 | 遗址公园+三核 | 国际论坛、开发者大会、成果导览、城市挑战赛 |
| 冬季 | 可信AI与标准论坛 | 众智园+大钟寺 | 治理案例、互操作建议、年度透明度报告 |

全年运营设置五个常态机制：每周开发者散步与开放办公时段；每月场景评审会；每季度国际项目软着陆批次；半年一次公共利益挑战；每年一次贡献荣誉更新。运营主体采用“公共目标牵引+专业运营+高校企业共建+社区监督”的建议架构，并设置居民、无障碍、伦理、历史文化和青少年代表参与的公共顾问席位。

运营闭环为：**公开征题 → 伦理与来源筛查 → 团队匹配 → 小范围原型 → 安全验证 → 公共试用 → 人工评审 → 开源或转化 → 影响复盘 → 进入荣誉与档案系统**。项目是否继续不以曝光量决定，而以公共价值、技术可靠性、使用公平性、可维护性和真实转化为判断维度。建议跟踪活跃贡献者、跨机构项目、公开问题解决率、测试转化率、公众参与多样性、无障碍完成率、事件与退出数量、开源资产复用等指标；不得把招商额、投资额或参与人数写成政府承诺。[data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation]

六项任务最终形成同一个飞轮：品牌让人识别并进入，生态链让项目获得资源，街区场景让技术接受真实检验，公共空间让创新被公众看见，文化叙事赋予长期意义，年度运营再把问题、人才和成果送回生态链。所有空间落地建议均为概念建议、参考方案或可供专业团队深化研究，不替代正式规划，不构成政府审定结论。

## 风险、版权与合规说明

方案文件可使用中文或英文；英文为主语言时，必须在同一 `proposal.md` 中附完整中文正式译文，并设置双语元数据。所有图片、图纸、图标、数据和代码资产必须在 `sources.json` 或 `report/copyright_statement.md` 中说明来源、许可和授权状态。HTML 页面不得加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API，不得跟踪评审者行为。

风险和缺资料清单由 [depth:risk_missing_data] 管理，并与 [data:geometry/constraints.geojson#CONSTRAINTS]、[source:SITE-PACKAGE]、[source:PROCESSED-FACT-PACK] 和 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 相互校核。`missing_data_checklist.csv` 中列出的 official boundary、key area、控规、道路、地块、建筑、市政、文保和公共服务缺口，必须进入 `assumptions.json`、自检和正文风险章节。任何缺少官方控规、道路红线、权属、市政、消防或文保条件的结论，都必须降级为待确认事项。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。AI agent 对事实、来源、版权、空间数据、指标和表达负责；维护者和专业评审可依据自检结果、空间复核和合规矩阵要求返修或拒绝。

## 参考资料

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- data/processed/agent_task_requirements.csv
- data/processed/source_use_matrix.csv
- data/processed/missing_data_checklist.csv
- 全球案例背景研究：MIT Kendall Square Initiative（https://kendallsquare.mit.edu/）
- 全球案例背景研究：Vector Institute Strategy（https://vectorinstitute.ai/unveiling-the-vector-institutes-new-three-year-strategy/）
- 全球案例背景研究：STATION F Programs（https://stationf.co/）
- 全球案例背景研究：AI Singapore Programmes（https://aisingapore.org/）
- 全球案例背景研究：Hub71 Initiate（https://www.hub71.com/program/initiate）
- 全球案例背景研究：Alan Turing Institute / Knowledge Quarter public dialogue（https://www.turing.ac.uk/news/new-turing-lecture-series-explores-deepfakes-trustworthy-ai-and-future-democracy）
- 上述全球案例仅用于机制对标，不作为本项目边界、法定控制、面积指标或政府承诺依据。
- 机器可读引用索引：[source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SITE-PACKAGE]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]、[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[depth:metrics_recalculation]、[data:geometry/site_boundary.geojson#SITE-001]、[metric:site_area_sqm]


## 方案原创深化：京张智脉的四个设计动作

1. **把铁路遗产从背景变成时间基础设施。** 以“百年时间廊”组织导视、口述史、工业遗存、开源贡献和未来原型展示，让历史信息、当代创新和公众日常在同一条连续体验链上叠合。[standard:MOHURD-URBAN-DESIGN-MEASURES] [data:geometry/public_space.geojson#PUBLIC-001]
2. **把三处重点区从孤岛变成研发闭环。** AI原点社区负责开源策源，众智园负责全栈验证，大钟寺负责智能经济与国际传播，两翼提供科技服务与城市场景反馈。[source:AGENT-TASKBOOK] [depth:overall_spatial_structure]
3. **把AI场景从设备清单变成公共服务协议。** 十类场景均采用数据最小化、用途限定、人工复核、可退出和影响评估原则；三项产业验证场景只作为受控测试建议，不表述为已批准运营。[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]
4. **把年度活动从节庆变成长效转化机制。** 形成“春季开源季、夏季城市测试季、秋季全球AI周、冬季治理与标准论坛”的概念性节律，并以项目进入沙盒、公共反馈、专业复核和成果归档为闭环。[depth:phasing_implementation]

上述动作均为开放共创建议，不替代正式规划，不构成政府审定结论；所有空间落地内容可供专业团队在官方边界、控规、权属和工程条件补齐后深化研究。
