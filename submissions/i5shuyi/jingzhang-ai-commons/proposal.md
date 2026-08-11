---
title: "京张智脉：开放创新共同体城市设计"
author_github: "i5shuyi"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路遗产为公共创新主脊，构建“验证—策源—转化”三核价值链与十二个可预约、可复核、可撤场的 AI 场景站。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.0"
---

# 京张智脉：开放创新共同体城市设计

## 设计依据与资料清单

本 formal 方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，并以 `brief/site-package/` 中经维护者登记的临时粗略边界、重点区域、枚举、指标和来源清单为机器可读依据。AI agent 在生成方案前必须读取 `design_brief.json`、`allowed_design_space.json`、`sources.json`、`enums/`、`ranges/`、`schemas/`、`data/source_registry.json` 和 `data/processed/agent_fact_pack.md`，并用 `project_scope_summary.csv`、`agent_task_requirements.csv`、`source_use_matrix.csv`、`missing_data_checklist.csv` 建立任务、范围、资料用途和缺口清单。所有设计判断都要拆分为可追溯来源、可复算指标、可校验图层和可人工复核假设。公告要求方案达到控制性详细规划的城市设计深度和规划综合实施方案的城市设计深度，因此文本叙述不能替代 GeoJSON、指标表、A3 文册、A0 展板和 HTML 电子展示成果。

本节证据链引用 [source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SITE-PACKAGE]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]、[source:BOUNDARY-SOURCE]、[source:KEY-AREA-SOURCE]、[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[standard:MOHURD-CONTROL-DETAILED-PLANNING]、[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[standard:MOHURD-ARCH-DESIGN-DEPTH-2016] 和 [depth:existing_conditions_diagnosis]，用于说明方案不是独立愿景文本，而是从公告、面向智能体任务书、标准、边界、处理资料包和资料清单出发组织成果。

专业引用分别登记为 [source:URBAN-DESIGN-MEASURES]、[source:CONTROL-DETAILED-PLANNING] 与 [source:LAND-USE-GUIDE]。其中城市设计办法用于公共空间与风貌原则，控规办法用于严格区分设计建议与法定控制，用地分类指南用于 GeoJSON 分类术语；三者都不能证明本项目已有审定指标。

资料登记表的使用边界如下：

- data/source_registry.json 登记公开、清权与临时资料的用途边界。
- 当前登记摘要：formal 可用资料 5 条，背景资料 0 条，provisional-only 资料 1 条。
- agent 不得把 background_only 或 provisional_only 资料升级为 official boundary、法定控规、正式评分依据或政府实施承诺。

`data/processed/agent_fact_pack.md` 是本方案的阅读导航层，不是新的权威来源。[source:PROCESSED-FACT-PACK] 只帮助 agent 把三层范围、三处重点区、公告任务、agent.1-agent.6、资料可用性和缺资料事项组织成可读方案；所有事实判断仍回到 [source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SOURCE-REGISTRY]、[source:BOUNDARY-SOURCE] 与 [source:KEY-AREA-SOURCE]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

本提交在官方 `SITE_BOUNDARY` 或三处 `KEY_AREA` 尚未取得时，使用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成临时 formal 包。提交包中的 `geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均标注为 `provisional_constraint`、`official_boundary=false`，只能用于方案生成、自检、可视化和设计讨论，不能作为 official redline、审批依据、精确面积依据或法定控制结论。该组织方数据缺口本身不阻断内容评分；替换 official polygons 后，site boundary、key areas、land use、roads、green space、public space、buildings、phasing 和 metrics 均需重算。

本提交的可评分状态为：**临时边界，保留精度警示并待正式数据发布后复算；不阻断内容评分**。因此，正文中的空间结构、场景、项目和指标均按“可讨论、可复核、可替换官方边界后重算”的原则写入；当官方边界和重点区 polygon 更新后，必须重新生成全部设计层、指标、自检、图纸和 HTML，不能只替换单个文件。

边界和重点区域的可读解释对应 [data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#PROV-KEY-001] 和 [metric:site_area_sqm]、[metric:key_area_count]。这意味着读者可以从正文回到 GeoJSON 查看边界来源、从 metrics 查看面积复算结果、从 sources 查看资料来源，而不是只相信一段文字判断。

## 三层范围工作框架

方案按照公告确定的三个层次组织工作：统筹研究范围关注 43.6 平方公里的AI产业生态、战略定位、创新链和未来城市形态；总体设计范围关注 11.4 平方公里京张遗址公园周边 1-2 公里城市地区和产业区，要求形成城市更新总体框架、产业空间布局、交通市政支撑和城市风貌控制；重点区域范围关注 368.4 公顷三处详细设计地区，要求明确功能业态、建筑规模、拆改留分类、公共空间连通和交通组织。三层范围在 `compliance_matrix.json` 中逐条映射，保证公告 1.3、1.4、1.5 与 agent.1-agent.6 的必选任务都有章节、图层、指标、图纸和 HTML 证据。

三层工作框架的深度项由 [depth:three_level_scope_framework] 和 [depth:overall_spatial_structure] 约束，空间证据以 [data:geometry/site_boundary.geojson#SITE-001] 与 [data:geometry/key_areas.geojson#PROV-KEY-001] 为准，任务依据以 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 为准，范围索引以 [source:PROCESSED-FACT-PACK] 中 `project_scope_summary.csv` 的三层范围表为导航。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

三层工作不是互相割裂的图纸集合。统筹研究决定产业链和城市形态判断，总体设计把判断落实到更新项目、空间结构和设施承载，重点区域详细设计检验建筑载体、交通、公共空间和 AI 应用场景之间的关系。本提交先锁定 provisional 边界与已知约束，再从同一模型生成用地、建筑、道路、绿地、公共空间、分期和 AI 服务节点，最后在 EPSG:4548 中复算指标，并解释哪些结论仍受临时边界限制。任何无法从结构化数据复算的面积、比例、规模或项目数量，均不写成正式结论。

本方案的主名称是“京张智脉”，英文名为 **JINGZHANG AI COMMONS**。这里的 Commons 不是封闭园区，而是由公众、高校、企业、开发者与专业机构共同使用、共同纠错、共同维护的开放创新共同体。总体结构为“一脊三环·十二站”：一脊是京张记忆与公共创新主脊；三环是“策源—验证—转化”“工作—生活—学习”“技术—伦理—文化”三个协同回路；十二站是可预约、可复核、可撤场的 AI 场景节点。[data:geometry/public_space.geojson#SC-01] [metric:scenario_node_count]

Logo 方向采用“三轨汇一点”：铁锈红代表百年京张工程精神，智能蓝代表开放科学与全栈创新，公共绿代表人的尊严、生态与日常生活；三条平行线汇入一个开放圆点，既像铁路道岔，也像代码分支合并。标识只使用几何线段与系统字体，不借用企业商标、人物肖像或专有图形；可以延展为导视、场景牌、活动视觉和贡献档案，但与文化解释标识保持层级区分。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

三处重点区承担不同价值环节：众智园是 **VERIFY / 验证核**，把全栈技术、安全治理与开放测试转成可监督能力；北京 AI 原点社区是 **ORIGIN / 策源核**，把高校源头创新、开源协作和人才生活编织在一起；大钟寺是 **TRANSLATE / 转化核**，把智能体、智能终端和内容消费连接到国际交往与城市服务。它们通过京张公共主脊和三道东西知识缝合线互联，不再复制三个相似园区。[data:geometry/roads.geojson#ROAD-001] [data:geometry/roads.geojson#ROAD-003] [depth:overall_spatial_structure]

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI产业生态和未来城市形态如何组织 | 建立“高校策源-开源协作-企业转化-公共体验-国际传播”的创新链 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 产业空间、城市更新、交通市政和风貌如何落图 | 用地、建筑、道路、绿地、公共空间和分期图层共同表达 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出定位、空间动作、AI场景和实施依赖 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

## 统筹研究范围产业与未来城市研究

统筹研究范围的核心任务是构建世界级 AI 创新生态体系。方案应梳理海淀高校院所、头部企业、算力算法数据要素、孵化平台、上市企业、独角兽和科技服务资源，提出AI创新链、产业链、人才链和城市服务链的空间协同框架。命名方案和 logo 设计应服务于“百年京张文化带、都市AI生活体验带、AI融合创新带”的整体辨识度，不能只停留在口号，应说明与产业生态、公共空间和文化资源的关联。面向智能体任务书还要求回应“五大功能”和“三区两翼”协同，形成可继续深化的命名系统、视觉识别、总体空间结构图、场景开放和运营机制；本节必须用 [source:AGENT-TASKBOOK] 与 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 标注这些要求来自 agent 开源征集任务，而不是法定规划控制。

统筹研究并不新增伪精确红线；它通过 [standard:MOHURD-URBAN-DESIGN-MEASURES] 要求的城市风貌、公共空间和建筑布局统筹，回接 [data:geometry/land_use.geojson#LU-001]、[data:geometry/public_space.geojson#PUBLIC-001] 与 [depth:overall_spatial_structure]，说明产业策略最终要落到可见、可复核的空间结构。

### 六个全球案例与可转化机制

案例研究只采用各机构或城市的官方页面作为背景资料，不把案例规模、绩效、品牌或政策直接类比到海淀。Vector Institute 展示了独立研究机构如何把研究、人才和行业采用组织成连续链条 [source:CASE-VECTOR]；Mila 把大学联盟、开放科学、伦理与产业合作放在同一生态内 [source:CASE-MILA]；MIT Kendall Square 通过科研、住宅、零售、开放空间、博物馆和社区参与形成混合创新城区 [source:CASE-KENDALL]；STATION F 的 SHARE—CREATE—CHILL 分区说明创业空间需要公共服务、生产协作与日常生活同时存在 [source:CASE-STATIONF]；新加坡 LaunchPad @ one-north 体现了模块化空间与孵化器、加速器、资本网络的邻近效应 [source:CASE-ONENORTH]；Seoul AI Hub 把教育、初创支持、研发基础设施、算力和开放创新按成长阶段组织 [source:CASE-SEOULAI]。

| 案例 | 可转化机制 | 京张智脉的空间/运营回应 | 不直接复制 |
| --- | --- | --- | --- |
| Vector Institute，多伦多 | 研究—人才—行业采用桥梁 | 众智园验证工坊 + 原点转化站 + 大钟寺路演客厅 | 机构规模、伙伴名单、绩效数字 |
| Mila，蒙特利尔 | 大学联盟、开放科学、伦理治理 | 开源发布厅、模型卡、失败档案、公众纠错 | 品牌、组织结构、资助模式 |
| Kendall Square，剑桥 | 混合功能、开放空间、社区参与 | 六类用地共同体、公共会客厅、低扰动更新 | 土地开发强度和审批条件 |
| STATION F，巴黎 | SHARE—CREATE—CHILL 空间分层 | 公共服务前台—协作中台—生活后台 | 商业模式、入驻计划与品牌 |
| LaunchPad @ one-north，新加坡 | 模块化载体和多种加速器网络 | 可拆分工坊、共享评测、专业服务排班 | 租金、招商与政策安排 |
| Seoul AI Hub，首尔 | 教育、算力、孵化、开放创新分阶段支持 | 算力驿站—验证沙盒—成长档案—国际对接 | 投资额、面积与政府承诺 |

六个案例共同指向一条本地化原则：AI 生态不是一栋地标建筑，而是“开放问题—原始创新—可信验证—企业采用—公共体验—贡献回流”的循环。因而本方案把可共享的服务界面布置在主脊和十二站，而把高安全、高能耗或专业测试留在预约、分级、可审计的空间内；这是对 agent.2 的实质响应，不是简单贴上“AI 园区”标签。[depth:municipal_new_infrastructure] [metric:industry_test_scenario_count]

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

**众智园 / VERIFY。** 概念空间采用“一庭一廊两工坊”：可信模型验证庭面向模型安全、偏差、红队和评测解释；标准治理展示廊把专业流程转成公众可读界面；全栈验证工坊和开源算力驿站提供预约制、分级准入的测试载体。清河侧只布置低扰动步行、雨洪与环境感知原型，任何亲水、桥梁或设备基础须等待蓝线、防洪和文保复核。建筑只表达研发、实验和展示的载体类型 [data:geometry/buildings.geojson#BLDG-001]，不作现状拆建结论。[depth:three_key_area_detailed_design]

**北京 AI 原点社区 / ORIGIN。** 概念空间采用“一厅一街一环”：原点开源发布厅同步展示成果、模型卡和失败经验；近校成果转化街组织 IP、法务、标准、产品验证和企业服务；人才生活服务环连接居住、社交、运动和夜间学习。更新优先顺序是“开放首层—可逆内装—共享庭院—最后才讨论增量建设”，但没有权属和建筑调查前，不给出具体保留、改造或拆除名单 [data:geometry/buildings.geojson#BLDG-005]。[depth:retain_renovate_demolish]

**大钟寺 / TRANSLATE。** 概念空间采用“一厅一场四象限”：国际路演客厅承担双语发布、企业对接与全球活动接口；智能原生消费实验场验证智能终端与内容服务；四象限步行缝合只表达路径优先级、无障碍与非机动车组织问题，不画工程红线。贡献者荣誉索引放在公共主脊南端，记录版本、证据和复核状态，不把企业广告或个人流量置于公共价值之上 [data:geometry/public_space.geojson#SC-12]。[depth:traffic_rail_slow_parking]

## AI 创新生态、人才画像与 AI+ 场景

方案应建立面向AI人才和企业的空间需求画像，覆盖研发办公、开源协作、成果发布、企业服务、人才居住、社交学习、消费生活、运动休闲和国际交往。AI+场景应围绕公告提出的交通、服务、消费、医疗、教育、法律、生活服务等方向，形成产业发展场景和AI赋能城市功能场景。每个场景应说明服务对象、空间位置、数据来源、隐私边界、人工复核机制和运营主体。

AI 场景落到空间和治理边界：公共空间场景引用 [data:geometry/public_space.geojson#PUBLIC-001]，慢行与交通场景引用 [data:geometry/roads.geojson#ROAD-001]，开放空间场景引用 [data:geometry/green_space.geojson#GREEN-001] 和 [metric:public_space_ratio]、[metric:green_ratio]。下列 12 张场景卡、6 类用户画像、隐私边界、人工复核和运营责任已经同步进入正文、离线 HTML、A3/A0 与合规矩阵。

| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 原点社区开源发布厅、公共代码墙、夜间协作空间 | 不采集个人行为轨迹；活动数据只做聚合统计 |
| 初创团队 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力服务点、标准治理咨询 | 算力和数据服务需另行授权 |
| 头部企业访客 | 展示、商务、国际接待、人才招聘 | 大钟寺国际路演客厅、轨道站点接驳、重点企业周边公共空间 | 企业标识和案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 京张遗址公园慢行环、社区服务嵌入、夜间照明和活动分级 | 不将居民画像用于商业推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 校区-园区慢行缝合、成果转化驿站、AI教育体验点 | 校园数据和科研成果需授权 |
| 残障与高龄使用者 | 无障碍出行、清晰信息、人工协助 | 无障碍共创客厅、低认知负担导视、人工服务按钮 | 不以健康或残障特征做风险评分；允许匿名与退出 |

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
| 11 智能体城市沙盒（产业测试验证） | 大钟寺重点区概念节点 | 在限定时段、限定路线和人工监护下验证机器人与城市智能体，公开模型卡、事件记录和撤场条件 |
| 12 贡献者荣誉索引 | 京张公共主脊南端概念节点 | 用版本、证据链接和复核状态记录贡献，不以流量或商业影响力替代公共价值 |

三类产业测试验证场景分别是：众智园的“可信模型验证庭”测试模型安全、偏差和可解释性 [data:geometry/public_space.geojson#SC-02]；大钟寺的“智能体城市沙盒”测试具身智能在限定公共环境中的交互与撤场 [data:geometry/public_space.geojson#SC-10]；北端“开源算力驿站”测试端侧推理、能耗计量和模型交付流程 [data:geometry/public_space.geojson#SC-01]。三者共同采用预约、最小数据、人工在环、事件分级、公开复盘和一键停运六项闸门，数量由 [metric:industry_test_scenario_count] 复核。

| 治理闸门 | 最低要求 | 失败时动作 |
| --- | --- | --- |
| 数据最小化 | 优先聚合/匿名/自愿授权，不采集与任务无关数据 | 停止采集并删除非必要数据 |
| 人工复核 | 医疗、教育、法律、公共安全与规划判断必须由相应人员确认 | 明确显示“仅供参考”，转人工处理 |
| 可解释 | 展示模型卡、数据边界、版本和置信度 | 禁止对公众作自动不利决定 |
| 可撤场 | 设备、导视和数字服务可在不破坏场地条件下移除 | 触发人工停机与现场恢复 |
| 公共申诉 | 提供非数字渠道、纠错窗口和处理时限 | 进入事件复盘与版本回退 |

agent 生成的AI治理建议必须遵守数据最小化、公开来源、可解释和人工复核原则。城市智能体可以辅助识别慢行断点、公共空间热力、设施维护、企业服务需求和活动安全风险，但不能替代规划审批、不能输出未经授权的个人画像、不能声称获得官方实施承诺。所有AI场景节点应进入结构化图层或合规矩阵，便于评审者看到它们与产业、空间和公共利益之间的关系。

## 用地、建筑规模与拆改留方案

用地方案应依据国土空间调查、规划、用途管制分类等公开标准表达，形成完整、闭合、无缝的用地分区。建筑方案应区分保留、改造、更新、新建或待确认对象，明确建筑基底、功能、规模、风貌、屋顶、体量和高度控制的建议层级。若缺少现状建筑、权属、控规和工程条件，方案只能提出方法和待校准清单，不能编造拆改留结论。

用地分类依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，建筑高度、体量、界面和风貌控制由 [depth:height_massing_character] 管理，拆改留方法由 [depth:retain_renovate_demolish] 管理。用地和建筑的主要证据是 [data:geometry/land_use.geojson#LU-001]、[data:geometry/buildings.geojson#BLDG-001] 和 [metric:building_footprint_area_sqm]。

建筑规模和强度指标必须与 `metrics.json` 和图层一致。若总建筑规模、容积率、建筑高度、建筑密度、绿地率、退线和建筑控制线缺少官方条件，应在指标体系中列为 unknown 或 pending_control，不得用固定数值制造精确感。A3 文册应给出更新项目清单和指标复核表，A0 展板应把关键空间结构和重点片区表达清楚，HTML 页面应提供指标和图层联动查看。

本次概念分区以同一临时边界裁切为六个无缝多边形：AI 研发与开放科学约 138.35 万平方米 [metric:land_use_0802_sqm]；京张记忆公园与蓝绿脊约 206.79 万平方米 [metric:land_use_1401_sqm]；高校协同与成果转化约 207.15 万平方米 [metric:land_use_0804_sqm]；智能经济与企业服务约 207.15 万平方米 [metric:land_use_05_sqm]；人才社区与公共服务约 207.15 万平方米 [metric:land_use_0702_sqm]；公共会客与活动界面约 174.71 万平方米 [metric:land_use_1403_sqm]。六类合计 [metric:land_use_total_sqm] 与提交边界 [metric:site_area_sqm] 的极小差异仅来自逐项小数舍入，不代表精确法定用地。

十二个概念建筑载体的基底合计 10.80 万平方米 [metric:building_footprint_area_sqm]，对应设计研究基底比约 0.95% [metric:building_density_design_ratio]。低值是因为这些 footprint 只表达关键服务载体，而不是对全区现状或建设总量的模拟；总建筑面积 [metric:total_floor_area_sqm] 与容积率 [metric:floor_area_ratio] 保持 unknown，避免把缺失控规和建筑调查伪装成精确方案。

## 交通、轨道、市政与公共服务设施

交通方案应回应公告对轨道站点一体化、道路微循环、慢行断点、对外交通、停车、非机动车停放和绿色交通系统的要求。重点应覆盖北五环、京张遗址公园跨环路节点、五道口、清华东路西口、大钟寺站及重点企业周边交通联系。道路和慢行图层应保持在提交边界内，并与公共空间、绿地、产业节点和重点片区相互校核；若提交边界为 provisional，交通结论也只能作为临时设计讨论。

交通和市政专业深度分别由 [depth:traffic_rail_slow_parking] 与 [depth:municipal_new_infrastructure] 约束；图层证据引用 [data:geometry/roads.geojson#ROAD-001] 与 [data:geometry/public_space.geojson#PUBLIC-001]。`geometry/constraints.geojson` 有意保持空集合，因为当前没有清权的道路红线、管线、消防或市政控制；这些缺口通过 assumptions 说明，而不是伪造空间约束。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

市政和公共服务设施应覆盖AI产业服务设施、创新服务平台、人才生活服务设施、新型基础设施、分布式能源、端侧算力和传统市政设施融合。方案应说明设施标准、空间布局、服务半径、运营模式和分期实施逻辑。缺少管线、能源、排水、防洪、消防等工程资料时，应列为正式深化前置条件。

## 蓝绿空间、公共空间与城市风貌

蓝绿空间方案应以京张遗址公园活力带为骨架，统筹清河、小月河、周边高校、企业、社区出行需求，提出南北贯通、东西连通的步道、骑行道和绿色空间体系。方案应识别慢行断点、上跨环路节点、公园南端和北端景观节点，提出停车、体育、创新交往、科技测试、应用展示和公共服务复合利用策略。

蓝绿公共空间由 [depth:blue_green_public_space] 校核，核心证据为 [data:geometry/green_space.geojson#GREEN-001]、[data:geometry/public_space.geojson#PUBLIC-001]、[metric:green_ratio] 和 [metric:public_space_ratio]。城市设计管理办法要求统筹景观风貌、公共空间和建筑控制，因此本节同时引用 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

城市风貌方案应融合京张铁路历史文化、中关村创新文化和AI创新文化，利用清华园火车站、北影等文化资源，提出城市基调、建筑风貌、屋顶形态、体量、界面和公共艺术引导。agent 还应提出导视标识、文化符号、国际传播叙事、AI朝圣地标、贡献墙或荣誉展示体系，但所有品牌、字体、图像、肖像和企业标识都必须有清权来源。风貌控制应分清官方管控、设计建议和待确认条件，严禁在没有文保或控规依据时给出伪精确控制线。

文化叙事不把铁路当作科技装饰，而组织为三段连续时间：**“工程自主”**讲詹天佑与京张铁路所代表的自主建造精神；**“开放创新”**讲中关村从科研、试验到产业的协作文化；**“共同智能”**讲 AI 时代技术必须可解释、可纠错并服务人的尊严。导视采用“里程—版本—证据”三级信息：里程标识空间位置，版本标识内容更新时间，证据二维码只链接公开资料或本地方案证据；任何 AI 生成讲解都提供来源与纠错入口。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [depth:height_massing_character]

三类 AI 朝圣与荣誉节点均为低扰动、可逆的概念组件：

1. **开源原点零号里程碑**：在原点社区记录开放项目首次发布、模型卡和公众问题，不塑造个人神话。
2. **智能体贡献者荣誉索引**：在公共主脊南端按版本、证据与复核状态索引贡献，允许更正和撤回 [data:geometry/public_space.geojson#SC-12]。
3. **百年京张—AI 时间轨**：沿步行主脊把铁路工程、自主创新和负责任 AI 里程碑并置，采用可替换信息模块，不占用文保本体 [data:geometry/roads.geojson#ROAD-001]。

公共空间组件库包含四类：带手动开关与无障碍高度的“解释站”；只显示聚合数据、无摄像人脸识别的“城市仪表”；可拆卸的“开源长桌”；同时提供数字与纸面纠错方式的“人工复核台”。这些组件只有在文保、绿地、交通安全、夜景、维护和无障碍专项确认后才能确定位置与构造。[standard:MOHURD-URBAN-DESIGN-MEASURES] [metric:green_space_area_sqm] [metric:public_space_area_sqm]

## 更新项目清单、实施政策与分期计划

实施方案应形成可审查的更新项目清单，说明项目位置、类型、功能、责任主体、依赖条件、实施阶段、风险和评估指标。政策建议应覆盖城市更新统筹实施、空间供给、运营机制、产业服务、公共参与、数据治理和产权协同。`geometry/phasing.geojson` 应表达分期范围，`compliance_matrix.json` 应把每个任务与分期和图纸挂接。

项目清单和分期深度由 [depth:renewal_project_list] 与 [depth:phasing_implementation] 管理，分期空间证据为 [data:geometry/phasing.geojson#PHASE-001]。如果没有权属、资金、实施主体和审批路径，方案必须把它写成实施风险，而不是承诺落地。

| 项目编号 | 项目名称 | 类型 | 主要依赖 | 证据引用 |
| --- | --- | --- | --- | --- |
| JZ-01 | 京张遗址公园慢行断点缝合 | 公共空间/交通 | 道路红线、桥下空间、交通组织复核 | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | 众智园清河创新界面 | 蓝绿空间/产业展示 | 河道蓝线、生态和防洪条件 | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | 原点社区近校成果转化街 | 城市更新/产业服务 | 校区边界、权属、首层业态 | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 轨道站点、道路交叉口、市政管线 | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI公共服务与端侧算力节点 | 新基建/公共服务 | 能源、算力、安全和运营主体 | [data:geometry/public_space.geojson#SC-08] |
| JZ-06 | 全球AI活动周公共路线 | 运营/品牌 | 公共空间许可、活动安全、版权清权 | [data:geometry/phasing.geojson#PHASE-001] |

分期应与 100 天征集设计周期形成区分：征集周期是提交成果的时间要求，实施分期是城市更新和项目建设的推进路径。方案应提出近期试点、中期更新和长期治理框架，并标明哪些内容可先以轻量设施、运营活动和服务平台启动，哪些必须等待正式控规、市政、交通和权属条件确认。对于年度活动体系、开发者社区运营、场景开放日、公共体验路线和国际传播机制，正文应说明运营对象、频率、责任边界、转化路径和风险，不得只写宣传口号。

本方案把长期运营组织为一个可学习的年度循环，而不是一次性节庆：

| 周期 | 概念活动 | 空间载体 | 运营输出 | 转化与治理 |
| --- | --- | --- | --- | --- |
| Q1 开放问题季 | 居民、科研人员、企业和维护者共同提出城市问题 | 无障碍共创客厅、开发者散步道 | 问题清单、数据可用性表、场景白名单 | 不具备公共价值或数据条件的议题不进入试验 |
| Q2 城市智能体试验季 | 三类产业验证场景限时运行 | 众智园验证庭、算力驿站、大钟寺沙盒 | 模型卡、事件记录、失败档案、人工复核报告 | 通过公开门槛的成果进入下一阶段，不承诺采购 |
| Q3 Global AI Commons Week | 开源发布、公共体验、国际路演与京张文化路线 | 一脊十二站 | 双语议程、开放路线、合作线索 | 对接仅形成继续讨论的线索，不表述为招商成果 |
| Q4 贡献审计与年度回放 | 复核贡献、偏差、能耗、投诉和维护成本 | 荣誉索引、原点发布厅 | 可验证贡献索引、版本更正、下一年任务 | 人类评审决定保留、修订或撤场 |

运营角色建议采用“公共议题委员会—专业安全与伦理组—场景运营者—开源维护者—公众观察员”五方制衡。活动品牌延续“三轨汇一点”，但任何赞助、政策、资金、场地许可与时间表都需另行确认；国际传播只陈述已发生、可验证的成果。近期 [metric:phase_1_area_sqm] 以原点公共脊和可逆场景为主，中期 [metric:phase_2_area_sqm] 协同南北双端重点区，长期 [metric:phase_3_area_sqm] 才讨论全带适应性更新。[data:geometry/phasing.geojson#PHASE-001] [data:geometry/phasing.geojson#PHASE-002] [data:geometry/phasing.geojson#PHASE-003]

## 指标体系、面积复算与合规矩阵

指标体系至少应包含总体设计范围面积、重点区域面积、绿地与公共空间比例、建筑基底、更新项目数量、AI场景节点、慢行连通指标、产业空间指标、人才服务指标和自检状态。所有 known 指标必须能从 GeoJSON 或可信来源复算；unknown 指标必须给出原因和正式提交前置条件。`scripts/spatial_review.py` 和 `scripts/visual_review.py` 的结果是 formal 自检的重要证据。

指标复算深度由 [depth:metrics_recalculation] 管理。本方案正文显式引用 [metric:site_area_sqm]、[metric:key_area_count]、[metric:building_footprint_area_sqm]、[metric:green_ratio]、[metric:public_space_ratio]，并说明这些值来自 [data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/buildings.geojson#BLDG-001]、[data:geometry/green_space.geojson#GREEN-001] 和 [data:geometry/public_space.geojson#PUBLIC-001]。

提交边界面积为 1141.28 万平方米 [metric:site_area_sqm]，与公告“约 11.4 平方公里”同量级，但它仍是 provisional polygon 的 EPSG:4548 复算值，不是官方精确红线。绿色开放空间约 178.64 万平方米、设计比 15.65% [metric:green_space_area_sqm] [metric:green_ratio]；十二站公共会客空间约 12.66 万平方米、设计比 1.11% [metric:public_space_area_sqm] [metric:public_space_ratio]。公共会客比不等于全部街道公共活动界面，只计算提交的可定位 plaza polygons。

概念慢行与接驳中心线总长约 21.80 千米 [metric:road_network_length_m]；由于缺少道路红线和断面，道路用地面积 [metric:road_area_sqm] 保持 unknown。三处重点区域数量为 3 [metric:key_area_count]，公告约面积合计 368.4 万平方米 [metric:key_area_announced_total_sqm]；三处 provisional polygon 的形状只能用于概念索引。12 个场景节点和其中 3 个产业测试验证节点分别由 [metric:scenario_node_count] 与 [metric:industry_test_scenario_count] 复核。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

合规矩阵是任务响应性的主控文件。每条公告任务和 agent_taskbook 任务必须对应到报告章节、图层、指标、图纸、HTML 页面、来源、假设和自检项。未能覆盖公告 1.3、1.4、1.5 或 agent.1-agent.6 的任一必选任务，方案不得进入 formal professional scoring。

正式深化时，agent 还应把每个指标分为三类：第一类是可由提交几何直接复算的空间指标，例如边界面积、绿地比例、公共空间比例、建筑基底面积和分期面积；第二类是需要官方控规或任务书附件支撑的管控指标，例如容积率、建筑高度、建筑密度、退线、道路红线和设施标准；第三类是需要运营或产业数据持续校准的绩效指标，例如 AI 创新指数、人才密度、产业服务满意度、慢行可达性、活动参与度和场景使用频次。三类指标应分别进入 `metrics.json`、`assumptions.json` 和 `compliance_matrix.json`，避免把运营愿景误写成审定规划条件。

## 风险、版权与合规说明

方案文件可使用中文或英文；英文为主语言时，必须在同一 `proposal.md` 中附完整中文正式译文，并设置双语元数据。所有图片、图纸、图标、数据和代码资产必须在 `sources.json` 或 `report/copyright_statement.md` 中说明来源、许可和授权状态。HTML 页面不得加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API，不得跟踪评审者行为。

风险和缺资料清单由 [depth:risk_missing_data] 管理，并与 [source:SITE-PACKAGE]、[source:PROCESSED-FACT-PACK] 和 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 相互校核。证据索引 [data:geometry/constraints.geojson#CONSTRAINTS] 指向一个**空的 FeatureCollection 状态**，不表示存在名为 CONSTRAINTS 的空间要素；空集合本身就是“不伪造控制线”的证据。`missing_data_checklist.csv` 中列出的 official boundary、key area、控规、道路、地块、建筑、市政、文保和公共服务缺口均进入 `assumptions.json`、自检和正文风险章节。任何缺少官方控规、道路红线、权属、市政、消防或文保条件的结论，都降级为待确认事项。

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
