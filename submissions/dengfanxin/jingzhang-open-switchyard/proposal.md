---
title: "京张开源站场：可切换的 AI 城市公共协议"
author_github: "dengfanxin"
language: "zh"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "把铁路道岔转译为可切换、可审计、可撤回的城市 AI 公共协议，以一条轨忆公共脊串联三座开放站场、两翼协同与十二个场景月台。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张开源站场：可切换的 AI 城市公共协议

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

本方案将总体概念命名为 **“京张开源站场 / Jingzhang Open Switchyard”**。铁路站场不是一条孤立直线，而是一组允许列车编组、分流、等待、检修和重新出发的道岔系统；AI 城市同样不应把技术锁死在单一路径上。方案因此以京张遗址公园为“轨忆公共脊”，把众智园、北京 AI 原点社区和大钟寺转化为“验证站、开源站、城市站”三座开放站场，以中关村科技服务翼配置资本、法务、人才与转化服务，以小月河场景赋能翼形成公众体验与反馈，构成 **“一脊、三站、两翼、十二月台”**。这些都是概念建议，不新增法定红线，不表达工程线位。[source:AGENT-TASKBOOK] [depth:overall_spatial_structure]

品牌识别只使用原创“道岔”几何：一条朱红主轨在中段分出青色支轨，三个空心圆代表三座开放站场。中文主名采用“京张开源站场”，英文统一为 “Jingzhang Open Switchyard”；三级命名依次为“带 / Belt—站 / Station—月台 / Platform”，让总体品牌、片区品牌和场景名称可以持续扩展。主色“信号朱”来自铁路信号的可见性，“道岔青”表示技术服务，“遗产铜”表示历史层，“公园绿”表示公共生态；不使用企业 Logo、未授权字体或人物图像。视觉标识不是规划审批标志，而是开放征集的参考方向。[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI产业生态和未来城市形态如何组织 | 建立“高校策源-开源协作-企业转化-公共体验-国际传播”的创新链 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 产业空间、城市更新、交通市政和风貌如何落图 | 用地、建筑、道路、绿地、公共空间和分期图层共同表达 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出定位、空间动作、AI场景和实施依赖 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

## 统筹研究范围产业与未来城市研究

统筹研究范围的核心任务是构建世界级 AI 创新生态体系。方案应梳理海淀高校院所、头部企业、算力算法数据要素、孵化平台、上市企业、独角兽和科技服务资源，提出AI创新链、产业链、人才链和城市服务链的空间协同框架。命名方案和 logo 设计应服务于“百年京张文化带、都市AI生活体验带、AI融合创新带”的整体辨识度，不能只停留在口号，应说明与产业生态、公共空间和文化资源的关联。面向智能体任务书还要求回应“五大功能”和“三区两翼”协同，形成可继续深化的命名系统、视觉识别、总体空间结构图、场景开放和运营机制；本节必须用 [source:AGENT-TASKBOOK] 与 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 标注这些要求来自 agent 开源征集任务，而不是法定规划控制。

统筹研究并不新增伪精确红线；它通过 [standard:MOHURD-URBAN-DESIGN-MEASURES] 要求的城市风貌、公共空间和建筑布局统筹，回接 [data:geometry/land_use.geojson#LU-001]、[data:geometry/public_space.geojson#PUBLIC-001] 与 [depth:overall_spatial_structure]，说明产业策略最终要落到可见、可复核的空间结构。

### 六个全球案例与可转化机制

下表只提炼各机构官方页面中可核实的空间或运营机制，作为背景比较，不把国外项目的规模、政策或实施条件搬到海淀，更不作为本项目红线和控规依据。六个案例均已登记于 `sources.json`。

| 案例 | 可核实机制 | 对“开源站场”的转化 | 不照搬的部分 |
| --- | --- | --- | --- |
| MIT Kendall Square | 混合研发、居住、零售、创新空间、开放空间与历史整合，社区参与塑造方案 [source:CASE-KENDALL-SQUARE] | 三站场都嵌入公共首层和可停留空间，不把研发园区变成封闭孤岛 | 不照搬土地开发强度和企业构成 |
| Paris STATION F | SHARE / CREATE / CHILL 形成共享资源、驻留创业和公众生活的分级空间 [source:CASE-STATION-F] | 场景月台分成公共体验、预约协作、隔离测试三级权限 | 不照搬单体巨构和准入制度 |
| Singapore one-north | 工作—生活—娱乐—学习混合，公园连接器与测试生态并置 [source:CASE-ONE-NORTH] | 把慢行蓝绿系统作为人才日常和城市测试的共同底盘 | 不照搬新城开发模式与治理结构 |
| Montréal Mila | 基础研究、创业支持、产业协作和公共利益 AI 政策相互联动 [source:CASE-MILA] | 众智园验证站设置“技术—政策—公众”三方议事与安全评估界面 | 不引用其机构规模作为海淀指标 |
| London Knowledge Quarter | 研究、文化、社区与包容增长通过跨机构网络协同 [source:CASE-KNOWLEDGE-QUARTER] | 京张历史文化与中关村创新文化共同进入活动、导视和贡献档案 | 不照搬一英里范围或英国政策工具 |
| Barcelona 22@ | 城市、经济和社会更新与创新用途协同，公共空间和居住同步讨论 [source:CASE-BARCELONA-22A] | 用“产业空间 + 社区服务 + 公园开放空间”完整分区约束更新叙事 | 不照搬用途转换比例和开发制度 |

六例共同指向一个可转化结论：创新生态不是企业名录，而是 **知识生产、测试验证、转化服务、人才日常、公众接触和治理纠错** 六个接口的连续性。“开源站场”据此提出六类运营票据：研究票据记录来源，测试票据写明边界，转化票据明确责任，人才票据保障可达，公众票据提供退出，治理票据公开修订。该框架对应三大定位和五大功能，但不声称具体机构已承诺参与。[source:AGENT-TASKBOOK]

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

**众智园“验证站场”参考方案。** 空间结构建议为“清河生态界面—公共验证花园—受控测试院落—标准议事厅”四层递进：公众可在外层理解测试目标和结果，企业与研究团队在预约层协作，高风险评测进入隔离层，最终由标准与伦理议事机制决定继续、修改或退出。建筑更新采用“先调查、再归类”的流程：现状价值、结构安全、能耗和权属未核实前，不对任何具体建筑下拆除结论；优先研究首层开放、连廊补接、屋顶能源和可逆内装。对外交通与清河界面只提出方向性节点，待五环、河道蓝线、防洪和道路条件复核。[source:OFFICIAL-ANNOUNCEMENT]

**AI 原点“开源站场”参考方案。** 以“学校门口的创新共同体”替代封闭孵化器：近校成果转化街把开源发布、知识产权、法务、伦理审查、人才居住与日常消费按步行顺序组织；贡献者档案馆保存项目版本、失败经验和可撤回署名；公共首层允许居民看到技术如何被验证，而不是只看到品牌广告。五道口、清华东路西口及校区—园区联系均属于概念性接驳关系，不表达站点工程、道路红线或校内实施承诺。[depth:retain_renovate_demolish]

**大钟寺“城市站场”参考方案。** 以“可比较、可退场的智能服务市场”回应智能体、智能终端与内容消费：智能体市集要求服务标注责任主体与人工出口；可信数据剧场只使用合成、公开或明确授权的数据；国际路演厅与夜间共创街共享后勤但分时运营。四象限步行缝合以连续遮荫、无障碍、非机动车停放和清晰导视为优先，任何地下、上跨或交通组织方案均需轨道、道路、市政、消防和权属专业论证后决定。[depth:traffic_rail_slow_parking]

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

| 场景卡 | 类型 / 空间载体 | 运行数据与人工出口 | 设计说明 |
| --- | --- | --- | --- |
| 01 开源发布厅 | 公共创新 / AI 原点社区 | 项目自愿提交；署名可撤回；争议由社区编辑复核 | 代码贡献、成果发布和小型路演共同使用的公共首层 |
| 02 安全治理沙盒 | **产业测试验证** / 众智园 | 合成或授权测试集；隔离环境；高风险结果由测试负责人签署 | 将红队测试、模型评测和标准共创转译为可参观但分权限的站场 |
| 03 端侧算力驿站 | **产业测试验证** / 总体设计节点 | 设备与能耗日志；不接个人敏感数据；异常立即人工停机 | 与低碳能源和企业服务结合的新型基础设施原型，容量待核 |
| 04 无障碍慢行助手 | 公共服务 / 轨忆公共脊 | 即时位置与障碍上报，用后删除；路线建议可拒绝 | 以触觉、声音和高对比导视补足传统导航，不形成个人轨迹 |
| 05 清河低碳创新廊 | 公共生态 / 众智园清河界面 | 聚合环境监测；专业养护人员判断 | 把雨洪、步行骑行、休憩和 AI 科普结合，边界待蓝线复核 |
| 06 近校成果转化街 | 企业服务 / AI 原点社区 | 项目授权材料；法务、伦理、知识产权人员复核 | 把孵化、展示、法务和转化服务排列成可步行的服务序列 |
| 07 可信数据剧场 | **产业测试验证** / 大钟寺 | 合成、公开或明确授权数据；访问审计；到期删除 | 让数据治理过程可见，但不公开企业秘密与个人信息 |
| 08 智能体市集 | 智能原生消费 / 大钟寺 | 服务评价与故障记录；明确责任主体；退款和申诉转人工 | 不同智能体在统一披露规则下接受比较体验 |
| 09 公共服务翻译台 | 医疗教育法律信息 / 社区服务点 | 用户主动输入；本地会话优先；关键建议转持证专业人员 | 解释流程和选项，不替代诊断、教学评价或法律决定 |
| 10 京张记忆索引 | 文化叙事 / 轨忆公共脊 | 公开史料与出处；争议条目由文化专业人员复核 | 以时间、地点和人物贡献组织历史，不用生成内容伪造史实 |
| 11 贡献者档案馆 | 荣誉展示 / AI 原点社区 | 自愿署名、可更正、可撤回；不做信用评分 | 记录代码、标准、公共服务与失败修订，让贡献跨年度可追溯 |
| 12 全球开源周路线 | 长期运营 / 三站场与公共脊 | 活动报名最小化；安全由人工统筹；活动后删除个人信息 | 把参观、协作、测试、路演和城市体验串成年度概念活动 |

十二张卡覆盖 5 类用户画像，并增加“国际访问者、公共服务人员、文化研究者”作为辅助角色。空间—运营映射采用统一四问：谁可以进入、可使用什么数据、谁承担结果责任、何时退出。对产业测试验证场景 02/03/07，须在专业团队深化时补充安全分级、测试协议、责任主体、应急停止和数据销毁证明；在此之前不得表述为已批准运营。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

agent 生成的AI治理建议必须遵守数据最小化、公开来源、可解释和人工复核原则。城市智能体可以辅助识别慢行断点、公共空间热力、设施维护、企业服务需求和活动安全风险，但不能替代规划审批、不能输出未经授权的个人画像、不能声称获得官方实施承诺。所有AI场景节点应进入结构化图层或合规矩阵，便于评审者看到它们与产业、空间和公共利益之间的关系。

## 用地、建筑规模与拆改留方案

用地方案应依据国土空间调查、规划、用途管制分类等公开标准表达，形成完整、闭合、无缝的用地分区。建筑方案应区分保留、改造、更新、新建或待确认对象，明确建筑基底、功能、规模、风貌、屋顶、体量和高度控制的建议层级。若缺少现状建筑、权属、控规和工程条件，方案只能提出方法和待校准清单，不能编造拆改留结论。

本提交把 provisional 总体设计边界完整划分为四类概念用地：科研用地 `0802` 约 267.46 万平方米（23.4%）、公园绿地 `1401` 约 258.93 万平方米（22.7%）、商业服务业用地 `05` 约 336.61 万平方米（29.5%）、社区服务设施用地 `0702` 约 278.28 万平方米（24.4%）。四者共享切割边，覆盖完整且无重叠；这些比例只说明“研究—开放—服务—日常”四类空间在概念模型中的相对关系，不是已批用途和供地比例。[data:geometry/land_use.geojson#LU-002] [data:geometry/land_use.geojson#LU-003] [data:geometry/land_use.geojson#LU-004]

建筑层只提交 31.08 万平方米的概念性基底样本 [metric:building_footprint_area_sqm]，用于检验建筑是否位于提交边界内以及图层—指标—图纸的一致性，不代表现状建筑或建设规模。拆改留采用四段式判断：先建立现状档案，再评估历史、结构、能耗与使用价值；随后与权属、控规、消防和市政条件交叉核对；最后才进入保留、修缮、适应性再用、新建或拆除论证。没有前两段资料时，任何对象保持“待调查”，这也是本方案对存量城市最重要的克制。[depth:development_intensity_controls]

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

文化叙事以“三次开源”组织：京张铁路把工程知识转化为国家公共能力；中关村把科研知识转化为产业协作；AI 新文化则要求模型、数据、评测和治理知识能够被解释、复核与继续贡献。导视不使用“未来感”装饰，而使用铁路运营语言：红色主轨指向公共文化与慢行，青色支轨指向技术服务，铜色铭牌记录历史来源，空心圆表示任何人可进入的公共节点，实心圆表示需预约或授权的测试空间。国际传播主句为 **“A century of rail. A city of open intelligence.”**，中文解释为“百年铁路，开放智能之城”。[source:AGENT-TASKBOOK]

三处 AI 朝圣与荣誉展示节点均为概念性公共空间组件：其一，众智园 **“可撤回试验塔”** 不展示炫技成果，而逐年陈列被暂停、修订和通过的测试协议，让安全治理成为可见贡献；其二，AI 原点 **“开源贡献档案馆”** 以自愿、可更正、可撤回方式记录代码、标准、课程和公共服务贡献，不生成信用分；其三，大钟寺 **“人机交接台”** 把每种智能服务的责任主体、人工出口和故障处置写在公众可见界面。沿轨忆公共脊布置的“百米史料钉”“道岔座椅”“夜间低照度信号灯”和“无障碍触觉索引”组成组件库；任何构筑物的位置、尺度和照明均须文保、绿地、交通和无障碍专业复核。[depth:blue_green_public_space]

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

“Switchyard Open Season” 年度活动体系按“提出问题—公开构建—受控测试—城市复盘”四季循环：春季发布公共问题单和数据可用边界；夏季举行开源构建营与小规模公众共创；秋季在众智园、大钟寺完成产业沙盒验证并组织全球开源周；冬季公开失败案例、人工复核记录和下一年度修订清单。该日历是运营概念，不代表主办方已经确认活动、经费或场地。

开发者社区采用“维护者轮值 + 市民观察员 + 专业责任人”三席机制：维护者管理版本和开放问题，市民观察员判断是否可理解、可退出，专业责任人对安全、规划、医疗、教育、法律等高风险领域作最终决定。场景从提案到长期运营必须依次通过资料登记、伦理筛查、限时试点、第三方复核、公众反馈和续期/退出六道闸门。国际传播不只展示成功项目，还发布双语 API/场景说明、复现材料、失败日志和城市体验路线；招引转化以“试验完成—证据公开—专业复核—合作意向”逐级推进，不把活动热度直接等同于招商成果。[source:AGENT-TASKBOOK] [depth:phasing_implementation]

## 指标体系、面积复算与合规矩阵

指标体系至少应包含总体设计范围面积、重点区域面积、绿地与公共空间比例、建筑基底、更新项目数量、AI场景节点、慢行连通指标、产业空间指标、人才服务指标和自检状态。所有 known 指标必须能从 GeoJSON 或可信来源复算；unknown 指标必须给出原因和正式提交前置条件。`scripts/spatial_review.py` 和 `scripts/visual_review.py` 的结果是 formal 自检的重要证据。

指标复算深度由 [depth:metrics_recalculation] 管理。本方案正文显式引用 [metric:site_area_sqm]、[metric:key_area_count]、[metric:building_footprint_area_sqm]、[metric:green_ratio]、[metric:public_space_ratio]，并说明这些值来自 [data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/buildings.geojson#BLDG-001]、[data:geometry/green_space.geojson#GREEN-001] 和 [data:geometry/public_space.geojson#PUBLIC-001]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

合规矩阵是任务响应性的主控文件。每条公告任务和 agent_taskbook 任务必须对应到报告章节、图层、指标、图纸、HTML 页面、来源、假设和自检项。未能覆盖公告 1.3、1.4、1.5 或 agent.1-agent.6 的任一必选任务，方案不得进入 formal professional scoring。

正式深化时，agent 还应把每个指标分为三类：第一类是可由提交几何直接复算的空间指标，例如边界面积、绿地比例、公共空间比例、建筑基底面积和分期面积；第二类是需要官方控规或任务书附件支撑的管控指标，例如容积率、建筑高度、建筑密度、退线、道路红线和设施标准；第三类是需要运营或产业数据持续校准的绩效指标，例如 AI 创新指数、人才密度、产业服务满意度、慢行可达性、活动参与度和场景使用频次。三类指标应分别进入 `metrics.json`、`assumptions.json` 和 `compliance_matrix.json`，避免把运营愿景误写成审定规划条件。

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
- 机器可读引用索引：[source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SITE-PACKAGE]、[source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]、[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[depth:metrics_recalculation]、[data:geometry/site_boundary.geojson#SITE-001]、[metric:site_area_sqm]
