---
title: "京张岔口 · 人字脊"
author_github: "huyy2000"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以 provisional boundary 推进的 formal 城市设计方案；命名、Logo、朝圣地标、人物、生态案例、文化叙事与长期运营为原创差异化内容，边界待官方 polygon 发布后复算。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

<!-- 本方案基于 provisional boundary 生成；命名 / Logo / 朝圣地标 / 人物 / 生态案例 / 文化叙事 / 长期运营为原创差异化设计；边界为 provisional，待官方 polygon 发布后复算。 -->

# 京张岔口 · 人字脊

## 设计依据与资料清单

京张铁路从西直门修到张家口，翻军都山的那一段，詹天佑没有挖隧道，而是把线路折成一道"人字形"，在青龙桥让列车换向爬坡。这道折线的工程签名，是一百年前中国自主修铁路的证据。今天同一段廊道被划进"百年京张 AI 创新带"，本方案想做的事很具体：不复制中关村，而是把这道"人字形"原点翻译成 AI 时代自己的空间与治理语言。

判断的落点不在想象里。第一依据是北京市规划和自然资源委员会海淀分局发布的《百年京张 AI 创新带城市设计国际方案征集资格预审公告》；第二依据是 `brief/site-package/` 中维护者登记的临时边界、重点区域、枚举、指标与来源清单。凡涉及范围、重点区与管控条件的说法，都回到 `design_brief.json`、`allowed_design_space.json`、`sources.json` 与 `data/source_registry.json` 等已登记材料，并在 `compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` 中留痕 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]。

登记资料分公开、清权与临时三类。其中 background_only 与 provisional_only 两类只用于方案推演，不能当成法定控规、正式评分依据或政府实施承诺。当前登记摘要：formal 可用资料 7 条，背景资料 1 条，provisional-only 资料 1 条 [source:SOURCE-REGISTRY]。

`data/processed/agent_fact_pack.md` 是阅读导航，不是新的权威来源 [source:PROCESSED-FACT-PACK]；它把三层范围、三处重点区、公告任务、agent.1–agent.6、资料可用性与缺口组织成可读顺序，但事实判断仍要回已登记原始材料 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]，完整来源关系由 `sources.json` 保存。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

在官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 尚未发布前，本方案以 `brief/site-package/geometry/provisional_boundaries.geojson` 生成的临时边界推进。`geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均标注为 `provisional_constraint`、`official_boundary=false`，只用于方案生成、自检与可视化，不作为审批、精确面积或法定控制依据。待 official polygons 发布后，site boundary、key areas、land use、roads、green space、public space、buildings、phasing 与 metrics 一并重算。

边界解释回到总体范围图层与面积复算 [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]；三处重点区由独立图层与数量指标核对 [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count]。读者可以从正文进入证据，不必先读一串机器编号。

## 三层范围工作框架

公告把工作分成三层。统筹研究范围盯 43.6 平方公里的 AI 产业生态、战略定位、创新链与未来城市形态；总体设计范围盯京张遗址公园周边 1–2 公里、约 11.4 平方公里的城市地区与产业区，要形成城市更新总体框架、产业空间布局、交通市政支撑与城市风貌控制；重点区域范围盯 368.4 公顷的三处详细设计地区，要落实功能业态、建筑规模、拆改留分类、公共空间连通与交通组织。三层在 `compliance_matrix.json` 中逐条映射，保证公告 1.3、1.4、1.5 与 agent.1–agent.6 的必选任务都有章节、图层、指标、图纸与 HTML 证据。

深度项由 [depth:three_level_scope_framework] 与 [depth:overall_spatial_structure] 约束，空间证据以 [data:geometry/site_boundary.geojson#SITE-001] 与 [data:geometry/key_areas.geojson#PROV-KEY-001] 为准，任务依据以 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 为准，范围索引以 [source:PROCESSED-FACT-PACK] 中 `project_scope_summary.csv` 的三层范围表为导航。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

三层不是三套互不说话的图纸。统筹研究定产业链与城市形态的判断，总体设计把判断落到更新项目、空间结构与设施承载，重点区域详细设计去验证具体地块、建筑、交通、公共空间与 AI 应用场景能不能落地。生成顺序先锁定当前采用的 official 或 provisional 边界与约束，再生成用地、建筑、道路、绿地、公共空间、分期与 AI 服务节点，最后从这些图层复算指标，并在正文讲清哪些结论仍受 provisional boundary 限制。任何无法从结构化数据复算的面积、比例、规模或项目数量，不写进正式结论。

本方案的总论是：京张的价值不在再建一个中关村，而在把中国自主创新的"人字形"原点接进 AI 时代。百年前詹天佑用青龙桥人字展线送列车翻过军都山；今天这条带该以"人字脊（Y-Spine）"为空间与治理母题，在众智园（北岔）分叉出自主全栈创新，在 AI 原点社区（中源）汇流开源与人才，在大钟寺（南市）再分叉为产业与消费，沿小月河与中关村两翼循环回流。设计任务，是让这条铁路在算法时代重新通车。

### 命名体系与视觉识别（agent.1）

主名称定为京张岔口（Jingzhang Fork）。"岔"取自铁路道岔（switch / turnout），既是青龙桥人字展线的工程母题，也隐喻 AI 创新在分叉与汇流之间的路由。英文沿用 Jingzhang Fork。设计 DNA 与副题为人字脊（Y-Spine）：人字形百年原点，AI 时代再次通车。

命名体系按三区两翼展开。北岔是众智园 AI 自主创新加速区，中源是北京 AI 原点社区，南市是大钟寺 AI 产业聚集区；两翼为中关村资本与 IP 翼、小月河场景活力翼；活动与指标后缀统一为岔口仪式、岔口指数、朝圣动线。

Logo 方向以"人"字笔画为母题：一笔同时是铁轨岔分（道岔）与电路节点，负形构成一个向上开口的岔，象征 fork-and-merge。配色取自京张铁路意象：轨距钢蓝 `#1f4e79`、枕木暖木 `#b7791f`、长城灰 `#475569`，刻意避开通用的科技绿。标识可随实时算力、人才、资本流数据动态开合，作为 HTML 与展板的视觉母题。人字脊符号可派生导视、荣誉墙、朝圣印章与年度活动 IP，形成能跨语言传播的识别系统 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI产业生态和未来城市形态如何组织 | 建立"高校策源-开源协作-企业转化-公共体验-国际传播"的创新链 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 产业空间、城市更新、交通市政和风貌如何落图 | 用地、建筑、道路、绿地、公共空间和分期图层共同表达 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出定位、空间动作、AI场景和实施依赖 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

## 统筹研究范围产业与未来城市研究

统筹研究范围要回答的是：海淀的高校院所、头部企业、算力算法数据要素、孵化平台、上市企业、独角兽与科技服务资源，怎么织成一条有全球能见度的 AI 创新链、产业链、人才链与城市服务链。命名与 logo 要服务于"百年京张文化带、都市 AI 生活体验带、AI 融合创新带"的整体辨识度，不能停在口号，要讲清与产业生态、公共空间、文化资源的关联。面向智能体任务书还要求回应"五大功能"和"三区两翼"协同，形成可继续深化的命名系统、视觉识别、总体空间结构图、场景开放与运营机制；这些要求来自 agent 开源征集任务，不是法定规划控制，本节用 [source:AGENT-TASKBOOK] 与 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 标清来源。

统筹研究不新增伪精确红线。它通过 [standard:MOHURD-URBAN-DESIGN-MEASURES] 要求的城市风貌、公共空间与建筑布局统筹，回接 [data:geometry/land_use.geojson#LU-001]、[data:geometry/public_space.geojson#PUBLIC-001] 与 [depth:overall_spatial_structure]，说明产业策略最终要落到看得见、复核得了的空间结构。

未来城市形态研究要回答人工智能怎么改变工作、生活、社交、学习、交通与公共服务。方案把 AI 交通系统、连续绿色空间、创新服务设施、国际化生活工作氛围落实为可定位的功能区、节点、廊道与场景，而不是泛泛描述技术愿景。产业战略指标、AI 创新指数、人才密度、空间供给类型与 AI+ 垂直应用重点区域写进指标体系，并标明哪些是官方、哪些是设计建议、哪些仍待正式数据校准。涉及全球 AI 创新活动、开发者社区、开放场景或朝圣路线，一律写为概念建议或参考方案，供专业团队深化，不写成已经确定的政府活动或实施安排。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围要达到控制性详细规划的城市设计深度。方案提出城市更新总体空间结构、低效空间识别、更新项目清单、实施政策建议、产业功能比例、空间组织模式、建筑总规模与综合承载能力评估。`geometry/land_use.geojson` 完整覆盖设计边界且无重叠，`geometry/buildings.geojson` 表达更新或保留建筑基底，`geometry/roads.geojson` 表达微循环、慢行与轨道接驳关系，`metrics.json` 复算核心面积、比例与图层数量。

本节按 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 把控规深度内容拆成可审查对象：[data:geometry/land_use.geojson#LU-001] 表达用地结构，[data:geometry/buildings.geojson#BLDG-001] 表达建筑基底，[data:geometry/roads.geojson#ROAD-001] 表达交通组织，[metric:building_footprint_area_sqm] 复核建筑基底面积，[depth:land_use_layout] 与 [depth:development_intensity_controls] 约束成果深度。

总体设计还要托住交通、轨道、市政与配套设施。方案围绕轨道站点一体化、道路微循环、非机动车停放、停车供给、创新服务平台、人才生活服务、新型基础设施、分布式能源与端侧算力提出空间布局与实施路径。涉及建筑高度、开发强度、道路红线、退线与设施标准，若尚无官方控制条件，写为待正式控规条件确认，不以 agent 推测值冒充审定指标。

## 重点区域详细设计

重点区域详细设计是必选项。众智园 AI 自主创新加速区围绕国家人工智能平台、全栈自主创新、标准制定、安全治理、产业展示、对外交通、清河文化、低碳绿色创新交往环境与绿色空间 AI 场景展开。北京 AI 原点社区围绕近校创新、成果孵化转化、人才特区、开源体系、品牌活动、建筑拆改留、成果展示发布、居住生活配套、校区园区慢行联系与轨道站点一体化展开。大钟寺 AI 产业聚集区围绕领军企业、智能体、智能终端、内容消费、数据要素、数字资产、商业服务、规划绿地复合利用、大钟寺站一体化与路口四象限步行连通展开。

三处重点区域详细设计必须引用 [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003]，并由 [depth:three_key_area_detailed_design] 检查是否达到规划综合实施方案深度。只讲"打造示范区"而没有功能、建筑、交通、公共空间与实施项目证据，视为未完成。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

三处重点区域必须在 `geometry/key_areas.geojson` 中出现。仓库已提供 official polygons 的，作为 `official_constraint` 使用；缺失的暂用 `provisional_constraint`，但正文、HTML、sources、assumptions 与 self_check 必须说明它不能作正式评分或审批依据。`compliance_matrix.json` 分别覆盖公告 1.5.3.1、1.5.3.2、1.5.3.3。设计表达包含功能业态、建筑规模、建筑形态、拆改留分类、公共空间系统、交通组织、慢行连通与实施项目。HTML 页面应能切换查看三处重点区域，A3 文册与 A0 展板至少包含重点片区总图、局部详图与指标说明。

| 重点片区 | 设计定位 | 空间动作 | AI产业与运营场景 | 证据引用 |
| --- | --- | --- | --- | --- |
| 众智园AI自主创新加速区 | 花园型全栈自主创新街区 | 强化清河界面、产业展示、低碳创新交往和对外交通组织；以绿色空间承载开放测试与标准治理展示 | 自主模型测试、标准制定工作坊、安全治理展示、低碳算力体验 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[depth:three_key_area_detailed_design] |
| 北京AI原点社区 | 近校型成果转化与人才社区 | 组织校区、园区、街区慢行缝合；补足成果发布、人才服务、居住生活和开源协作空间 | 开源社区、成果发布、人才特区服务、近校孵化 | [data:geometry/key_areas.geojson#PROV-KEY-002]、[source:AGENT-TASKBOOK] |
| 大钟寺AI产业聚集区 | 城市型智能经济与国际交往街区 | 围绕大钟寺站一体化、四象限步行连通、商业服务和重点企业公共环境更新 | 智能体与智能终端展示、内容消费、数据要素与国际路演 | [data:geometry/key_areas.geojson#PROV-KEY-003]、[metric:key_area_count] |

## 全球AI创新生态体系与生态案例（agent.2）

面向智能体任务书要求的 5–8 个全球 AI 创新生态案例，本方案以海淀与北京真实创新资产为锚，避开"AI 咖啡、机器人展厅"这类套任意城市都成立的模板。下列为生态图谱与参考案例，均为公开或清权资料，不编造企业名单、投资额或产值，招商与政策支持均写为概念建议或参考方案 [source:AGENT-TASKBOOK] [source:OFFICIAL-ANNOUNCEMENT]。

| 生态案例 | 类型 | 与一带的协同 | 证据/边界 |
| --- | --- | --- | --- |
| 中关村科学城（清华/北大/中科院） | 源头策源 | 近校成果转化，feed 中源开源社区 | 公开高校资源；不编造合作承诺 |
| 智源研究院 | AI 原生基础研究 | 大模型开源与评测，feed 北岔标准治理 | 公开研究机构；非招商承诺 |
| 北京AI原点社区 | 生态锚点 | 人才特区与开源体系，中源核心 | [data:geometry/key_areas.geojson#PROV-KEY-002] |
| 众智园（全栈自主加速） | 自主模型/芯片/框架测试 | 北岔创新锚，标准与安全治理 | [data:geometry/key_areas.geojson#PROV-KEY-001] |
| 海淀城市大脑/自动驾驶示范区 | 场景赋能 | 真实道路测试与治理沙盒，南市-北岔联动 | 公开示范区；测试结论待授权 |
| 清河站TOD + 京张高铁枢纽 | 要素流通 | 站城一体与数据要素流通 | [data:geometry/key_areas.geojson#PROV-KEY-001] |
| 大钟寺智能原生消费区 | 新业态 | 智能体/智能终端/内容消费，南市核心 | [data:geometry/key_areas.geojson#PROV-KEY-003] |
| 中关村资本与IP服务翼 | 全球化配置 | 投融资、法务、IP 赋能两翼 | 写为机制建议，非确定承诺 |

生态图谱以"高校策源—开源协作—企业转化—公共体验—国际传播"为链，对应三区两翼协同回路 [depth:overall_spatial_structure]：北岔分叉自主全栈、中源汇流开源人才、南市再分叉产业消费、两翼循环回流。土地、空间、产业、资金、人才、算力、数据、场景八类机制在 `compliance_matrix.json` 与 `metrics.json` 中留痕。

## AI 创新生态、人才画像与 AI+ 场景

方案建立面向 AI 人才与企业的空间需求画像，覆盖研发办公、开源协作、成果发布、企业服务、人才居住、社交学习、消费生活、运动休闲与国际交往。AI+ 场景围绕公告提出的交通、服务、消费、医疗、教育、法律、生活服务等方向，形成产业发展场景与 AI 赋能城市功能场景。每个场景说明服务对象、空间位置、数据来源、隐私边界、人工复核机制与运营主体。

AI 场景必须落到空间与治理边界：公共空间场景引用 [data:geometry/public_space.geojson#PUBLIC-001]，慢行与交通场景引用 [data:geometry/roads.geojson#ROAD-001]，开放空间场景引用 [data:geometry/green_space.geojson#GREEN-001] 和 [metric:public_space_ratio]、[metric:green_ratio]。这些引用让评审者知道场景不是口号，而是落在具体图层与指标中的设计对象。面向智能体任务书要求不少于 10 张 AI 场景卡、不少于 3 个产业测试验证场景与不少于 5 类用户画像；脚手架只给结构，正式参赛者必须把场景卡、画像表、隐私边界、人工复核与运营主体写进正文、HTML、A3/A0 与合规矩阵。

| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 林知远，32岁，自动驾驶仿真工程师 | 真实世界 AI 测试场景、可授权数据共享、清河↔大钟寺通勤 | 北岔开放测试场、端侧算力驿站、安全治理沙盒 | 测试数据须另行授权；不输出个人驾驶轨迹 |
| 詹禾，28岁，铁路遗产研学导师 | 准确、非娱乐化的京张文脉叙事与青少年研学动线 | 人字碑时间锚、朝圣动线、遗址公园解说节点 | 不歪曲史实；不将遗产过度网红化 |
| Maya Okonkwo，39岁，访问 AI 研究员（清华） | 可步行 AI 社区、英文导视、国际协作接口 | 中源开源发布厅、双语导视、国际路演客厅 | 校园与科研数据需授权；英文信息须准确 |
| 周建国（老周），67岁，退休铁路职工/原住民 | 绿意、日常交往、尊严、不被驱离的更新 | 京张遗址公园慢行环、社区嵌入式服务、活动分级 | 不将居民画像用于商业推荐；更新低扰动 |
| 陈屿，24岁，北航 AI 创业者 | 廉价工位、算力入口、从实验室到市场的 demo 机会 | 中源孵化街、众智园共享测试场、场景开放日 | 算力与数据服务需授权；不承诺落地 |
| 苏晴，35岁，中关村技术转移经理 | 高效桥接 IP/资本与初创、匹配与路演 | 大钟寺国际路演客厅、数据要素会客厅 | 企业标识与案例须清权 [source:AGENT-TASKBOOK] |

| 场景卡 | 空间载体 | 设计说明 |
| --- | --- | --- |
| 01 人字碑时间锚 | 北岔·青龙桥节点 | 数字-实体纪念碑，叠加 1909/2019/2026 三层时间；AR 呈现原始人字展线 vs 当代 AI 重算，非工程结论 |
| 02 开源发布厅 | 北京AI原点社区 | 高校、开源社区与初创团队的成果发布、代码贡献与小型路演空间 |
| 03 安全治理沙盒 | 众智园（北岔） | 标准制定、安全评测、模型红队测试转译为可参观、可预约、可监管的协作节点 |
| 04 端侧算力驿站 | 总体设计范围节点 | 与公共服务、企业服务和低碳能源结合的新基建原型，待深化 |
| 05 AI慢行断点诊断 | 京张遗址公园活力带 | 可解释导视与低侵入传感识别慢行断点、拥挤与无障碍需求，人工复核 |
| 06 大钟寺国际路演客厅 | 大钟寺AI产业聚集区 | 智能体、智能终端与内容消费企业的展示、洽谈、媒体发布与国际交流 |
| 07 清河低碳创新廊 | 众智园临清河界面 | 绿色空间、雨洪、步行骑行与 AI 展示复合的园区公共客厅 |
| 08 近校成果转化街 | 北京AI原点社区 | 面向高校成果转化的孵化、展示、法务、知识产权与投融资服务 |
| 09 数据要素会客厅 | 大钟寺片区 | 以合规、授权、可审计为前提的数据要素与数字资产流通界面 |
| 10 岔口朝圣动线 | 小月河场景活力翼 | 串联三处朝圣地标的可步行、可传播体验路线，承载荣誉展示 |
| 11 全球AI活动周 | 一带公共空间系统 | 开发者节、场景开放日、竞赛路演与城市体验的年度聚合 [source:AGENT-TASKBOOK] |

其中 03 安全治理沙盒、04 端侧算力驿站、01 人字碑时间锚构成不少于 3 个 AI 产业/技术测试验证场景，均标注为概念建议、待专业团队深化 [source:AGENT-TASKBOOK]。

AI 治理建议遵守数据最小化、公开来源、可解释与人工复核原则。城市智能体可以辅助识别慢行断点、公共空间热力、设施维护、企业服务需求与活动安全风险，但不能替代规划审批、不能输出未经授权的个人画像、不能声称获得官方实施承诺。所有 AI 场景节点进入结构化图层或合规矩阵，方便评审者看到它们与产业、空间和公共利益之间的关系。

## 用地、建筑规模与拆改留方案

用地方案依据国土空间调查、规划、用途管制分类等公开标准表达，形成完整、闭合、无缝的用地分区。建筑方案区分保留、改造、更新、新建或待确认对象，明确建筑基底、功能、规模、风貌、屋顶、体量与高度控制的建议层级。缺少现状建筑、权属、控规与工程条件时，方案只提方法与待校准清单，不编造拆改留结论。

用地分类依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，建筑高度、体量、界面与风貌控制由 [depth:height_massing_character] 管理，拆改留方法由 [depth:retain_renovate_demolish] 管理。用地与建筑的主要证据是 [data:geometry/land_use.geojson#LU-001]、[data:geometry/buildings.geojson#BLDG-001] 和 [metric:building_footprint_area_sqm]。

建筑规模与强度指标必须和 `metrics.json` 及图层一致。总建筑规模、容积率、建筑高度、建筑密度、绿地率、退线与建筑控制线缺少官方条件时，统一用 `status=unknown`，并在 `reason` / `assumptions` 中说明待补条件、当前假设与正式数据到位后的复算路径，不拿固定数值制造精确感。A3 文册给出更新项目清单与指标复核表，A0 展板把关键空间结构与重点片区表达清楚，HTML 页面提供指标与图层联动查看。

## 交通、轨道、市政与公共服务设施

交通方案回应公告对轨道站点一体化、道路微循环、慢行断点、对外交通、停车、非机动车停放与绿色交通系统的要求。重点覆盖北五环、京张遗址公园跨环路节点、五道口、清华东路西口、大钟寺站及重点企业周边交通联系。道路与慢行图层保持在提交边界内，并与公共空间、绿地、产业节点与重点片区相互校核；提交边界为 provisional 时，交通结论只能作为临时设计讨论。

交通与市政专业深度分别由 [depth:traffic_rail_slow_parking] 与 [depth:municipal_new_infrastructure] 约束；图层证据引用 [data:geometry/roads.geojson#ROAD-001]、[data:geometry/public_space.geojson#PUBLIC-001] 与 [data:geometry/constraints.geojson#CONSTRAINTS]。道路红线、管线、消防与市政条件缺失时，通过 assumptions 说明待补，不把策略写成审定条件。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

市政与公共服务设施覆盖 AI 产业服务设施、创新服务平台、人才生活服务设施、新型基础设施、分布式能源、端侧算力与传统市政设施融合。方案说明设施标准、空间布局、服务半径、运营模式与分期实施逻辑。缺少管线、能源、排水、防洪、消防等工程资料时，列为正式深化前置条件。

## 蓝绿空间、公共空间与城市风貌

蓝绿空间方案以京张遗址公园活力带为骨架，统筹清河、小月河、周边高校、企业、社区出行需求，提出南北贯通、东西连通的步道、骑行道与绿色空间体系。方案识别慢行断点、上跨环路节点、公园南端与北端景观节点，提出停车、体育、创新交往、科技测试、应用展示与公共服务复合利用策略。

蓝绿公共空间由设计深度项与绿地、公共空间图层共同校核 [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]。绿地与公共空间比例在正文解释设计意义，完整复算保存在 `metrics.json`；城市风貌、公共空间与建筑控制的统筹回到专业标准矩阵 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

城市风貌方案融合京张铁路历史文化、中关村创新文化与 AI 创新文化，利用清华园火车站、北影等文化资源，提出城市基调、建筑风貌、屋顶形态、体量、界面与公共艺术引导。方案提出导视标识、文化符号、国际传播叙事、AI 朝圣地标、贡献墙或荣誉展示体系，但所有品牌、字体、图像、肖像与企业标识都必须有清权来源。风貌控制分清官方管控、设计建议与待确认条件，没有文保或控规依据时不给伪精确控制线。

## 更新项目清单、实施政策与分期计划

实施方案形成可审查的更新项目清单，说明项目位置、类型、功能、责任主体、依赖条件、实施阶段、风险与评估指标。政策建议覆盖城市更新统筹实施、空间供给、运营机制、产业服务、公共参与、数据治理与产权协同。`geometry/phasing.geojson` 表达分期范围，`compliance_matrix.json` 把每个任务与分期、图纸挂接。

项目清单与分期深度由 [depth:renewal_project_list] 与 [depth:phasing_implementation] 管理，分期空间证据为 [data:geometry/phasing.geojson#PHASE-001]。没有权属、资金、实施主体与审批路径时，写成实施风险，不承诺落地。

| 项目编号 | 项目名称 | 类型 | 主要依赖 | 证据引用 |
| --- | --- | --- | --- | --- |
| JZ-01 | 京张遗址公园慢行断点缝合 | 公共空间/交通 | 道路红线、桥下空间、交通组织复核 | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | 众智园清河创新界面 | 蓝绿空间/产业展示 | 河道蓝线、生态和防洪条件 | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | 原点社区近校成果转化街 | 城市更新/产业服务 | 校区边界、权属、首层业态 | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 轨道站点、道路交叉口、市政管线 | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI公共服务与端侧算力节点 | 新基建/公共服务 | 能源、算力、安全和运营主体 | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | 全球AI活动周公共路线 | 运营/品牌 | 公共空间许可、活动安全、版权清权 | [data:geometry/phasing.geojson#PHASE-001] |

分期要和 100 天征集设计周期区分开：征集周期是提交成果的时间要求，实施分期是城市更新与项目建设的推进路径。方案提近期试点、中期更新与长期治理框架，并标明哪些内容能先以轻量设施、运营活动与服务台启动，哪些必须等正式控规、市政、交通与权属条件确认。年度活动体系、开发者社区运营、场景开放日、公共体验路线与国际传播机制，正文说明运营对象、频率、责任边界、转化路径与风险，不只写宣传口号。

## AI公共空间、智能原生新业态与朝圣地标（agent.4/5）

京张遗址公园 AI 公共空间用"东西缝合、南北贯通"的策略：北岔强清河界面、中源织校区-园区慢行、南市围绕大钟寺站四象限步行连通；所有地标遵守文保、绿地、蓝线与交通安全约束，不擅自改造企业建筑或权属空间，不下工程化结论 [source:AGENT-TASKBOOK]。

不少于 3 个 AI 朝圣地标，均为概念建议：

1. 青龙桥·人字碑（Qinglongqiao Y-Monument）：北岔节点，数字-实体纪念碑，叠加 1909/2019/2026 三层时间；AR 呈现原始人字展线 vs 当代 AI 重算。纯概念性，非工程方案。
2. 原点钟亭（Origin Bell Pavilion）：中源节点，公共声光装置，每次开源贡献或朝圣打卡鸣钟，作为荣誉展示载体。
3. 岔口之眼（The Fork Eye）：南市节点，概念性公共观测/信号塔（非工程），实时可视化一带算力、人才、资本路由（data-flow 艺术）。
4. 小月河晨昏线（Xiaoyue Dusk Line）：动线，串联三地标，形成可步行朝圣路线，承载贡献墙与荣誉展示体系。

## 百年京张文化、中关村文化与AI新文化融合叙事（agent.5）

文化资源系统包括京张铁路（詹天佑、人字形、青龙桥、清华园站）、中关村创新文化（电子一条街、车库精神）与 AI 新文化（开源、可信、人本）。空间文化系统以人字脊为元符号，派生导视、标识与符号系统，避免把文化只当科技装饰或口号，不混淆文化标识与一带整体 Logo 系统 [source:AGENT-TASKBOOK]。国际传播文案示例：Jingzhang Fork — where the Y-shaped origin reopens to the AI age.

## 全球AI创新活动体系与长期运营（agent.6）

年度活动体系包括岔口仪式·全球 AI 活动周、开源发布季、朝圣开放日，均写为概念建议，非已确定安排。品牌 IP 系统包括岔口指数、人字脊勋章、朝圣印章。开发者社区运营以开源发布厅 + 夜间协作空间 + 代码墙组织，活动数据仅做聚合统计。AI 场景开放运营以场景开放日、预约制测试、公共体验路线组织。转化路径从人才到企业再到开发者形成漏斗，明确招引与转化机制，不把招商、政策、资金写成确定承诺 [source:AGENT-TASKBOOK]。

## 指标体系、面积复算与合规矩阵

指标体系至少包含总体设计范围面积、重点区域面积、绿地与公共空间比例、建筑基底、更新项目数量、AI 场景节点、慢行连通指标、产业空间指标、人才服务指标与自检状态。所有 known 指标必须能从 GeoJSON 或可信来源复算；unknown 指标给出原因与正式提交前置条件。`scripts/spatial_review.py` 与 `scripts/visual_review.py` 的结果是 formal 自检的重要证据。

指标复算遵循统一的设计深度要求 [depth:metrics_recalculation]。正文重点解释指标的设计含义，例如总体范围如何约束空间分配、蓝绿和公共空间比例如何支撑日常交往；完整数值、公式、来源文件与置信度保存在 `metrics.json`。示例关键指标由总体范围与绿地数据复核 [metric:site_area_sqm] [data:geometry/green_space.geojson#GREEN-001]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

合规矩阵是任务响应性的主控文件。每条公告任务与 agent_taskbook 任务必须对应到报告章节、图层、指标、图纸、HTML 页面、来源、假设与自检项。未能覆盖公告 1.3、1.4、1.5 或 agent.1–agent.6 的任一必选任务，方案不得进入 formal professional scoring。

正式深化时，把每个指标分三类。第一类可由提交几何直接复算，如边界面积、绿地比例、公共空间比例、建筑基底面积与分期面积；第二类需官方控规或任务书附件支撑，如容积率、建筑高度、建筑密度、退线、道路红线与设施标准；第三类需运营或产业数据持续校准，如 AI 创新指数、人才密度、产业服务满意度、慢行可达性、活动参与度与场景使用频次。三类指标分别进入 `metrics.json`、`assumptions.json` 与 `compliance_matrix.json`，避免把运营愿景误写成审定规划条件。

## 风险、版权与合规说明

方案主文件可用中文或英文，但必须通过 `proposal.en.md` 或 `proposal.zh.md` 提供完整对照译文；A3/A0、HTML 与含文字图件也必须提供对应语言副本，并优先使用 `docs/terminology-glossary.md` 的赛事推荐译法。v2 包缺少任一必需译稿、语言映射或有效文件时，finalize 与 CI 会阻断提交。所有图片、图纸、图标、数据与代码资产必须在 `sources.json` 或 `report/copyright_statement.md` 中说明来源、许可与授权状态。HTML 页面不得加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API，不得跟踪评审者行为。

风险与缺资料清单由风险深度项、约束图层与场地包共同校核 [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS] [source:SITE-PACKAGE]。`missing_data_checklist.csv` 中列出的 official boundary、key area、控规、道路、地块、建筑、市政、文保与公共服务缺口，必须进入 `assumptions.json`、自检与正文风险章节。任何缺少官方控规、道路红线、权属、市政、消防或文保条件的结论，都降级为待确认事项；完整专业核对保存在标准矩阵中。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。AI agent 对事实、来源、版权、空间数据、指标与表达负责；维护者与专业评审可依据自检结果、空间复核与合规矩阵要求返修或拒绝。

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
- 完整机器索引：见 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json`
- 本节书目入口依据场地包登记，完整出处和许可见结构化来源清单 [source:SITE-PACKAGE]
