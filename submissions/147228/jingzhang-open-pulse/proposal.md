---
title: "京张开源脉冲：一条可验证的 AI 创新公共带"
author_github: "147228"
language: "zh"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "基于 provisional boundary 和结构化自检要求生成的 formal AI 城市设计方案包；保留精度警示和复算要求，但组织方数据缺口不阻断内容评分。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张开源脉冲：一条可验证的 AI 创新公共带

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

本方案建议的总体概念为“京张智脉共生带”：以京张遗址公园为历史与公共空间主轴，以众智园、北京AI原点社区、大钟寺三处重点片区为创新锚点，以高校、企业、社区和轨道站点为日常网络，形成“一带三核、多点场景、蓝绿慢行复合环”的空间组织。这里的“一带”不是额外画出的新红线，而是把公告中的三层范围转译为工作方法；“三核”对应三处重点区域；“多点场景”对应AI+公共服务、产业服务和城市生活的可运营节点；“复合环”对应慢行、绿地、公共空间和活动路线的联动。

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

交通评估的核心判断是“轨道资源较丰富，最后 300—800 米连续性不足的风险更高”。以临时范围和 800 米分析缓冲进行 OSM 背景筛查，识别到 16 个去重轨道站名、189 个已标注 crossing 节点；已标注步行支持线、cycleway 和主要道路中心线密度分别约为 16.53、1.06 和 5.47 km/km²。这些低置信度结果只用于确定现场调查优先级，不代表官方站口、道路红线、连续骑行品质或容量结论。[source:OSM-TRANSPORT-CONTEXT] [metric:osm_mapped_station_names_within_800m_count] [metric:osm_mapped_crossing_count]

本轮已纠正上一版空间证据的方向性错误：原 `ROAD-001` 仅为约 1.1 公里的东西向线，无法支撑 9 公里级南北创新带。v1.3 将其改为约 9.60 公里的南北公共慢行主轴，并在众智园、AI 原点、大钟寺形成 3 条东西缝合支线，概念网络总长约 13.01 公里。[source:JINGZHANG-FUTURE-BELT-2026] [source:BEIJING-SLOW-MOBILITY] [data:geometry/roads.geojson#ROAD-001] [data:geometry/roads.geojson#ROAD-002] [data:geometry/roads.geojson#ROAD-003] [data:geometry/roads.geojson#ROAD-004] [metric:design_north_south_spine_length_m] [metric:design_east_west_connector_count] [metric:design_slow_mobility_network_length_m]

主轴和支线表达网络关系，不是新道路、红线或工程线位。北五环/清河、校区—园区—社区界面、大钟寺站四象限、北三环—京包路—知春路等节点必须分开做交通、权属、无障碍和工程论证。官方公众参与材料已证明沿线立交类型与用地条件存在复杂事实，不允许用一张概念图替代专业判断。[source:JINGZHANG-PUBLIC-FEEDBACK] [depth:traffic_rail_slow_parking]

居民交通体验以步行连续、过街安全、骑行舒适、轨道换乘、夜间舒适和 15 分钟日常服务六项评价。当前缺少本地基线，因此满意度指标保持 unknown；只有分层问卷达到 80/100、居民组没有明显落后，且慢行/活动日测试通过后，试点才可继续深化。[source:BEIJING-15-MINUTE-LIFE-CIRCLE] [metric:resident_transport_satisfaction_index]

公园名录显示其 24 小时开放且无对外停车场地，本方案不以新增核心停车场作为吸引活动的前提，优先轨道、步行骑行、无障碍接驳、外围共享停车与预约管理。完整评估协议、样本、阈值和失败回退规则见 `report/narrative.md`。[source:JINGZHANG-PARK-CATALOG]

交通和市政专业深度分别由 [depth:traffic_rail_slow_parking] 与 [depth:municipal_new_infrastructure] 约束；公共空间证据引用 [data:geometry/public_space.geojson#PUBLIC-001] 和 [data:geometry/constraints.geojson#CONSTRAINTS]。道路红线、站口、管线、消防、停车和事件日承载均列为待补条件，不把策略写成审定结论。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

市政和公共服务设施应覆盖AI产业服务设施、创新服务平台、人才生活服务设施、新型基础设施、分布式能源、端侧算力和传统市政设施融合。方案应说明设施标准、空间布局、服务半径、运营模式和分期实施逻辑。缺少管线、能源、排水、防洪、消防等工程资料时，应列为正式深化前置条件。

## 城市韧性、具身智能与全生命周期迭代 v1.3

本轮把未来城市视为“人—环境—机器—资产”的耦合系统，而不是科技设施清单。北京适应气候变化行动方案明确指出，高温、极端降水、内涝、干旱会影响公共健康、交通、能源、供排水和城市生命线；北京市气象数据平台已经提供海淀 1991—2020 气候标准值目录及通风、热岛、内涝等城市气候服务，但下载文件需要平台 user key，当前提交不引用尚未取得的数值。[source:BEIJING-CLIMATE-ADAPTATION-2024] [source:BEIJING-METEOROLOGICAL-OPEN-DATA] [assumption:A-METEOROLOGICAL-DATA-001]

因素清单覆盖八组相互作用：气候灾害（热浪、寒潮、强降雨、干旱、雷暴、积雪冻融）；空气与微气候（通风、热岛、遮阴、PM2.5、扬尘、过敏原）；水与生态（地形、管网、土壤入渗、地下水、水质、生物多样性、鸟撞和暗天空）；人的体验（老幼残孕、夜班劳动者、噪声、照明、认知负担、服务可达和归属感）；具身智能（混行、急停、遥操作、充电消防、信息安全、申诉和责任）；生命线（电、水、排水、热、通信、消防和应急）；建造与资源（保留再用、材料、能源、碳和垃圾）；长期运营（资产所有者、巡检、清疏、备件、预算、技能、工单、更新和退出）。[source:RESILIENT-CITY-INFRASTRUCTURE-2024] [source:BEIJING-ACCESSIBILITY-REGULATION] [source:BEIJING-BIRD-BIODIVERSITY-2024] [assumption:A-BIODIVERSITY-LIGHT-001]

### 1. 选择不是“每项最高”，而是最低后悔

本轮比较五种明确取向：S0 最小改变、S1 技术密集、S2 生态密集、S3 活动容量密集、S4 均衡适应。模型使用 11 个指标（热舒适、雨洪、空气、人的体验、机器人、隐私、生物多样性、维护、碳、灵活性、成本效率）、5 类权重画像（居民、气候、创新、运营、均衡）和 8 个压力情景；以固定种子 147228 运行 50,000 次蒙特卡洛抽样，并对权重和指标响应加入显式不确定性。[assumption:A-RESILIENCE-MCDA-001] [metric:resilience_v13_candidate_count] [metric:resilience_v13_monte_carlo_draws]

| 方案 | 主要优势 | 主要代价 | 平均稳健分 | 5%分位 | 获胜率 |
| --- | --- | --- | ---: | ---: | ---: |
| S0 最小改变 | 资本强度低、复用较多 | 雨洪、维护、人机混行与热舒适不足 | 42.559 | 40.365 | 0% |
| S1 技术密集 | 机器人测试和数字基础较强 | 隐私、生态、运维复杂度和断网退化较弱 | 54.090 | 50.613 | 0% |
| S2 生态密集 | 雨洪、生物多样性、热与碳表现最好 | 活动容量、人机分隔和日常维护压力较高 | 70.242 | 66.812 | 21.138% |
| S3 活动容量密集 | 大型活动与物流吞吐较高 | 硬化、噪声、热、排水和生境代价明显 | 46.579 | 42.994 | 0% |
| **S4 均衡适应** | **人本、机器人安全、维护、隐私和灵活性同时过门槛** | **资本强度较高，纯气候权重下不如 S2** | **72.518** | **70.252** | **78.862%** |

S4 的平均后悔值仅 0.314 分，八类压力中最低设计分 67.194；它通过五个预设筛查门槛：核心指标最低分不低于60、压力最低分不低于55、资本强度不高于85、隐私不低于80、人类体验不低于75。气候优先画像仍由 S2 获胜，这个反例很重要：S4 是跨群体的稳健折中，而不是每个单项都最强。[metric:resilience_v13_selected_mean_score] [metric:resilience_v13_selected_p05_score] [metric:resilience_v13_selected_win_rate] [metric:resilience_v13_selected_mean_regret] [metric:resilience_v13_selected_min_stress_score] [metric:resilience_v13_hard_gates_passed]

所有分数是归一化的比较模型，不是现场绩效。+2°C 热浪、+20% 云暴、灌溉供水减少30%、断网24小时、机器人数量增至3倍、活动客流突增、维护能力减少20%和冬季冻融均是设计压力测试，不是气象预测或批准标准。正式深化必须用季节 CFD、实测风速/温湿度/平均辐射温度、地形与管网模型、土壤入渗、水质、声光环境、生态本底、能耗、资产成本和真实用户测试替换归一化输入。[assumption:A-CLIMATE-STRESS-001] [assumption:A-AIR-WIND-001] [assumption:A-DRAINAGE-SYSTEM-001]

### 2. S4 均衡适应的空间操作系统

1. **风—热—空气：**主轴与三支线保留季节性通风连接，不以连续建筑、屏幕或密植形成固定风墙；遮阴由乔木、可穿透廊架和可移动构件共同提供。任何树冠、建筑和活动设施定型前，必须比较有叶/无叶、典型风向、静风污染和热浪工况。北京总体规划中的通风网络只支撑城市级原则，本项目不能自称官方通风廊道。[source:BEIJING-VENTILATION-NETWORK-2035] [source:BEIJING-METEOROLOGICAL-OPEN-DATA]
2. **雨洪—排水：**采用“源头减排—就地滞蓄—管网衔接—超标行泄—雨后恢复”五段链。海淀公开规划的年径流总量控制率 75%—80%只作为筛查范围，最终指标必须由具体分区、地形、土壤、管网、出水口与地下空间条件确认；任何地下空间不作为暴雨避险通道。[source:HAIDIAN-SPONGE-CITY-PLAN] [source:BEIJING-FLOOD-PLAN-2021-2025]
3. **人的身体优先：**连续无障碍主链、热浪避暑链和夜间安静链优先于展演、配送和机器人充电。老人、儿童、轮椅/盲杖/导盲犬使用者、婴儿车、骑行者和夜班劳动者必须参加路线测试；高分模型不能否决真实不适和投诉。[source:BEIJING-ACCESSIBILITY-REGULATION] [source:WHO-HEAT-HEALTH-2026] [assumption:A-HUMAN-EXPERIENCE-001]
4. **具身智能分级开放：**遵循“世界模型仿真—封闭场地—低速定时地理围栏—有限公开测试”的顺序；保持人先行、可见身份、可急停、可人工接管、可申诉、可撤出。物理安全和 GB/T 45502-2025 信息安全同时审查，绝不把居民和残障人士变成机器人的免费训练数据。[source:BEIJING-EMBODIED-INTELLIGENCE-2025-2027] [source:SERVICE-ROBOT-INFOSEC-GB45502] [source:ISO-TR-4448-PUBLIC-MOBILE-ROBOTS] [assumption:A-EMBODIED-AI-SAFETY-001]
5. **生态与夜间：**使用乡土、多层次、耐旱的生境结构，设置不连续但可连接的生态“踏脚石”；玻璃界面进行鸟撞审查，生态敏感段采用暗天空、低眩光、分时照明。没有本底调查前，不宣称物种增加或生态净增益。[source:BEIJING-BIRD-BIODIVERSITY-2024] [source:BEIJING-LIGHTING-GUIDE-2025] [assumption:A-BIODIVERSITY-LIGHT-001]
6. **维护即设计：**每个树池、雨水口、透水铺装、座椅、照明、导视、传感器和机器人停靠点必须在建设前拥有资产 ID、责任主体、巡检触发、备件、维修窗口、人工降级和退出路径。连续两次工单逾期或无法获得备件，优先删除复杂设备，改用被动、标准化、可替换构件。[source:ASSET-MANAGEMENT-GBT33172] [source:RESILIENT-CITY-INFRASTRUCTURE-2024] [assumption:A-LIFECYCLE-MAINTENANCE-001]

### 3. 三处重点区的差异化压力测试

- **众智园：**把清河界面作为风、水、低碳构件和具身智能封闭测试的共同实验场；先验证排水、冬季防滑、机器人失效和数据安全，再开放展示。
- **AI 原点：**以近校街区的遮阴、夜间学习、低噪声、步行骑行和日常服务为核心；机器人只在不挤占无障碍链的时段和空间运行。
- **大钟寺：**优先解决站点四象限、云暴积水、活动客流、网约车/配送、夜间噪声和活动后恢复；大型活动容量服从居民归家、消防和雨洪行泄。

方案不预测一个确定不变的2035，而是设置触发器：高温预警降低活动并开放避暑点；强降雨预警清空低点、预检雨水口并启动超标行泄；断网后机器人停止自主移动且公共设施维持人工模式；一次不可接管、一次阻断无障碍主链或严重近失事件即暂停机器人场景；关键资产无责任人或连续两次维护逾期即不得扩容。这些触发器把未来变化转化为可执行的回退，而不是一张科幻效果图。

### 更严格的蒙特卡洛稳健性校核

为避免固定权重把方案“算得过好”，另设 S0—S4 五个设计原型，在五类利益相关者权重、八类压力状态和评分噪声下进行 50,000 次确定性蒙特卡洛抽样，随机种子为 147228。S4 均衡自适应方案在各候选中胜率约 78.862%、平均遗憾 0.314 分，但稳健平均分为 72.518、P05 为 70.252、八类压力中的最低项为 67.194；这意味着它是当前低遗憾候选，却还没有满足“所有不确定性指标均≥90”的更高目标。[metric:resilience_v13_candidate_count] [metric:resilience_v13_monte_carlo_draws] [metric:resilience_v13_selected_mean_score] [metric:resilience_v13_selected_p05_score] [metric:resilience_v13_selected_win_rate] [metric:resilience_v13_selected_mean_regret] [metric:resilience_v13_selected_min_stress_score] [metric:resilience_v13_hard_gates_passed]

这次校核将下一轮优化方向锁定为：增加被动遮阴和可维修雨洪储存、降低高传感器依赖、提高离线运行和人工接管、让活动容量与安静空间脱钩、建立资产冗余与替换件标准。北京公开气象目录可作为后续气候校准入口，但 Haidian 下载文件目前需要平台用户密钥，因此没有把未取得的温度、降雨、风速或湿度写成事实。[source:BEIJING-METEOROLOGICAL-OPEN-DATA] [assumption:A-METEOROLOGICAL-DATA-001]

排水目标还需衔接海淀海绵城市规划的公开背景范围；通风网络只能作为城市尺度的背景方向，不得将临时主轴直接叫作官方通风廊道。[source:HAIDIAN-SPONGE-CITY-PLAN] [source:BEIJING-VENTILATION-NETWORK-2035] [assumption:A-DRAINAGE-SYSTEM-001] [assumption:A-AIR-WIND-001]

具身智能的下一轮验证将同时覆盖北京具身智能行动计划、服务机器人信息安全标准和智能市政基础设施全生命周期要求；机器人不能只通过物理避障，还必须通过数据安全、断网运行、人工接管和责任追溯测试。[source:BEIJING-EMBODIED-INTELLIGENCE-2025-2027] [source:SERVICE-ROBOT-INFOSEC-GB45502] [source:RESILIENT-CITY-INFRASTRUCTURE-2024] [assumption:A-EMBODIED-AI-SAFETY-001]

维护与生态部分采用资产管理、鸟类友好和北京夜景照明资料作为校核入口：关键设施需要责任链和寿命档案，树木、玻璃和照明需要鸟类与暗夜基线；本方案没有把任何物种、玻璃碰撞率或夜间照度写成现状结论。[source:ASSET-MANAGEMENT-GBT33172] [source:BEIJING-BIRD-BIODIVERSITY-2024] [source:BEIJING-LIGHTING-GUIDE-2025] [assumption:A-LIFECYCLE-MAINTENANCE-001] [assumption:A-BIODIVERSITY-LIGHT-001]

补充的交叉证据把“高分”绑定到人的健康、公共参与和可持续运营：WHO 将空气污染、噪声、热岛、蓝绿空间、移动安全和心理健康视为城市规划的联动风险；IPCC 把热浪、极端降水、热岛和基础设施相互依赖列为城市适应压力；NIST 与 UN-Habitat 的人本智能框架要求可解释、参与、数字权利、公平、互操作、预算和持续监测。因此，方案的居民问卷、无障碍路线测试、投诉/申诉和年度复盘不得被“机器人效率”替代。[source:WHO-URBAN-HEALTH-AND-GREEN] [source:IPCC-AR6-URBAN-RISK] [source:NIST-HUMAN-CENTERED-AI] [source:UN-HABITAT-PEOPLE-CENTRED-SMART-CITIES]

北京步行骑行标准为连续性、公共空间和街道维护复核提供本地接口；水务工作报告要求预报预警、调蓄、雨前清疏、混接改造和应急调度；道路养护范围则把巡查、设施台账、汛期响应、桥隧设备维修和应急处置写入运维闭环。[source:BEIJING-WALK-CYCLE-DB11-1761] [source:BEIJING-WATER-REPORT-2024] [source:BEIJING-ROAD-MAINTENANCE-2026]

具身智能的边界同时参考 ISO 13482 的移动/辅助机器人危险降低原则与 ISO 55001:2024 的资产全生命周期管理要求：前者用于测试边界和急停、接管、人与机的物理风险，后者用于资产绩效、风险、支出、运行、维护和持续改进；二者都不等同于本项目的部署许可或本地采购标准。[source:ISO-13482-SERVICE-ROBOT-SAFETY] [source:ISO-55001-2024]

## v1.5 全状态城市操作系统：从效果图到可回退的真实体验

v1.5 在上一轮“低后悔”压力测试上扩展为 97 条原子证据记录，见 [data:visual/assets/evidence-ledger.json#climate-risk-baseline]、[data:visual/assets/evidence-ledger.json#cfd-validation] 和 [data:visual/assets/evidence-ledger.json#commitment-register]。这些记录不是把所有指标强行涂成 90 分，而是把 90 设为设计门槛，把每个门槛拆成输入、公式、人工复核、责任人和停止条件；当前均标记为 `design_target`，不得误读为现状实测值。[metric:resilience_v13_selected_mean_score] [source:IPCC-AR6-URBAN-RISK]

全状态矩阵先看人，再看设备：晴天与雨天分别检验遮阴、风环境、空气质量、雨水路径、无障碍主链、夜间安全和人的休息；断网、断电、传感器漂移、机器人无法接管时，导视、急停、照明、求助和人工值守必须保持最低服务。具身智能只在 `edge-compute`、`embodied-ai-governance`、`privacy-minimization` 和 `model-card` 四道门同时通过后小规模试点，不能以“自治率”替代公共性。[source:NIST-HUMAN-CENTERED-AI] [source:ISO-13482-SERVICE-ROBOT-SAFETY]

气候与水系统按“源头渗透—就地调蓄—管网排放—超标行泄”组织；风环境只作为候选网络并等待专业模拟，排水目标只作为背景基准并等待水务、道路、管线资料。树木根域、冬季防滑、材料可拆解、微电网降级、维护欠账、资产责任和年度故障演练被放进同一运维循环，避免把一张新图交给没有人维护的未来。[source:BEIJING-FLOOD-PLAN-2021-2025] [source:BEIJING-WATER-REPORT-2024] [source:ISO-55001-2024]

评价看板将状态分为 `known`、`design_target`、`unknown`、`blocked` 四类；无障碍主链被占用、暴雨时低点无法回退、机器人无法急停、隐私边界不清或维护连续逾期时，方案自动降级为人工模式并停止扩容。公平账本同时报告老幼、残障、夜间劳动者、居民、开发者和访客的可达性、热舒适、风险和服务差异，不用平均数掩盖最弱体验。[source:WHO-URBAN-HEALTH-AND-GREEN] [source:BEIJING-ACCESSIBILITY-REGULATION]

三十秒短片不再只拍“城市很聪明”：镜头一从清晨的风和树影开始，镜头二跟随雨水从铺装边缘进入雨洪花园，镜头三在站点四象限让行给老人和配送人员，镜头四在断网时切换为人工导视与机器人急停，镜头五以夜间贡献档案、维护工单和居民复盘收束。每个镜头都对应账本记录、空间图层、声音线索和回退动作，传播层不能替代工程证明。[data:visual/assets/evidence-ledger.json#film-storyboard]

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

## 风险、版权与合规说明

### 本方案的空间承诺：以“可验证的公共性”替代“AI 装置秀”

本方案将“京张开源脉冲（Jing-Zhang Open Pulse）”定义为一条以遗址公园为公共底板、以三处重点区为创新锚点、以可审计的场景开放为运营机制的城市协作带；本次提交为 v1.3，新增可复算交通网络、居民体验门槛、气候—雨洪—具身智能—维护压力测试和可逆试点协议，并继续以“数据约束想象力”的证据型展板系统表达空间主张。Logo 方向为“并行双线与开放节点”：两条不等宽的线对应百年铁路与持续迭代的数字协作，三个节点对应众智园、AI 原点和大钟寺；仅作为概念视觉系统，后续应由专业团队完成商标、字体和无障碍识别审查。[source:AGENT-TASKBOOK] [data:geometry/roads.geojson#ROAD-001]

空间上采用“一轴、三站、两张网”：一轴是京张文化与日常慢行轴；三站是众智园的可信研发与测试、AI 原点的开源转化与人才生活、大钟寺的产业发布与国际会客；两张网分别是串联绿地和公共空间的“慢行交往网”，以及串联场景卡、人工复核和数据最小化的“公共服务网”。它不提出新的法定道路、容积率、拆改留或工程结论，而是给专业团队一套可随官方边界、控规与权属资料到位后复算的空间—运营接口。[depth:overall_spatial_structure] [metric:green_ratio]

### 三处重点区的可深化设计动作

**众智园：可信研发花园。** 建议将临清河的开放空间组织为“测试可见、数据不可见”的研发花园：公共界面展示模型评测方法、标准工作坊与低碳算力科普；涉及模型、数据与设备的测试留在预约、脱敏、人工复核的封闭环节。沿线以雨洪花园、骑行驿站和小尺度讨论空间连接，而非以大体量新建为前提。该动作依托临时重点区形状提出，需以蓝线、生态、防洪、交通和权属资料校正。[data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design]

**AI 原点：开源转化街区。** 建议把近校慢行界面作为成果“从论文到公共问题”的转译带：设置可预约的开源发布厅、知识产权与合规咨询桌、校企项目橱窗和晚间学习共享空间。建筑保留、改造、更新或新建均为待调查的分类方法，不以本方案替代现状测绘、权属核验或审批判断；首层公共性和步行连续性是后续深化优先审查项。[data:geometry/key_areas.geojson#PROV-KEY-002] [depth:retain_renovate_demolish]

**大钟寺：城市级展示与会客厅。** 建议把站点周边的步行连通、无障碍换乘、智能终端体验和国际路演组织为连续街区体验，强调可步行抵达的服务、短时展示和多语种导视，不把“站城一体化”表述为工程承诺。四象限连通、活动时段、消防疏散、商业及交通承载均待官方和运营资料复核。[data:geometry/key_areas.geojson#PROV-KEY-003] [depth:traffic_rail_slow_parking]

### 十张场景卡与治理边界

| 场景 | 所在空间 | 服务对象与公共价值 | 数据与人工边界 |
| --- | --- | --- | --- |
| 开源发布厅 | AI 原点 | 开发者与高校成果公开交流 | 仅上传授权材料，活动记录默认不采集 |
| 可信评测沙盒（测试） | 众智园 | 初创团队进行模型安全评测 | 脱敏样本、预约准入、专家复核 |
| 无障碍慢行诊断（测试） | 遗址公园轴 | 老幼与行动不便者优化出行 | 公开观察与人工巡查，不追踪个人 |
| 低碳算力驿站（测试） | 众智园—原点节点 | 解释能源、端侧算力和服务设施关系 | 不接入真实生产系统，工程条件待核 |
| 校企转化客厅 | AI 原点 | 项目路演、知识产权与合规咨询 | 合同与成果不进入公共系统 |
| AI 医疗导览 | 社区服务节点 | 提供就医流程的非诊断引导 | 不采集病历，人工人员在场 |
| AI 教育共创课 | 高校—社区界面 | 面向居民的可解释 AI 素养活动 | 未成年人信息由监护人与机构管理 |
| 法律与政务导航 | 公共服务节点 | 提供公开程序和材料清单 | 明示非法律意见，人工窗口兜底 |
| 数据要素会客厅 | 大钟寺 | 展示合规数据流通的流程 | 只使用公开或清权的演示数据 |
| 全球 AI 活动周路线 | 三站一轴 | 串联文化、开源、产业和公共体验 | 活动另行审批，拥挤与安全人工管理 |

五类画像为开源开发者、初创团队、产业访客、周边居民和高校师生；它们不是基于个人画像的自动决策对象，而是公共服务和空间供给的设计视角。所有测试场景均为概念建议，须经过专业、安全、隐私与运营审查后方可试点。[source:AGENT-TASKBOOK] [depth:risk_missing_data]

### 文化叙事、地标与长期运营

文化叙事不是把铁路当作科技背景板，而是把“工程求证—开放协作—公共回馈”作为三段式体验：京张铁路的工程理性、中关村的自主创新、AI 时代的可验证公共性。建议设置三类非炫耀性地标：**百年工程问题墙**（以清权史料讲述问题与求解）、**开源贡献档案廊**（展示可公开验证的项目记录）、**城市智能体责任台**（展示场景数据边界、申诉与人工复核路径）。它们均为概念节点，需在文保、公共艺术、管理与版权审查后深化。[source:AGENT-TASKBOOK] [data:geometry/public_space.geojson#PUBLIC-001]

运营上建议形成“春季问题征集、夏季场景开放、秋季开发者周、冬季证据复盘”的年度闭环；每次活动留存开放议题、证据链接、公众反馈和人工复盘，而不以到场人数或招商金额制造绩效。开发者社区以公开议题库、可复现实验、贡献署名和问题申诉为核心；场景开放以小规模预约测试—第三方复核—公开复盘为核心。这是供组织方、专业团队与社区协商的运营原型，不代表已确定的活动、资金、政策或招引承诺。[source:AGENT-TASKBOOK] [depth:phasing_implementation]

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
- 机器可读引用索引：[source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SITE-PACKAGE]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]、[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[depth:metrics_recalculation]、[data:geometry/site_boundary.geojson#SITE-001]、[metric:site_area_sqm]
