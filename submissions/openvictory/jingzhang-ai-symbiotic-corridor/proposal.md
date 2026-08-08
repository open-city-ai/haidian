---
title: "京张AI共生走廊——百年铁路遗产上的智能体城市"
title_en: "Jing-Zhang AI Symbiotic Corridor — An Agent City on Centennial Railway Heritage"
author_github: "openvictory"
language: "zh"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路遗址公园为主轴，围绕众智园、北京AI原点社区、大钟寺三处重点片区，提出'一带三核、多点场景、蓝绿慢行复合环'的AI共生城市设计方案。覆盖10张场景卡、5类用户画像、3个AI地标、6项更新项目。全部面积基于provisional boundary以EPSG:4548投影复算；正式边界发布后需全面重算。自检PASS，formal-review-ready。"
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "civic-agent-governance"]
scenarios: ["ai-cultural-guide", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v0.2"
---

# 京张AI共生走廊——百年铁路遗产上的智能体城市

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

### agent.1 命名、标识与视觉识别系统

方案英文名称为 **"Jing-Zhang AI Symbiotic Corridor — An Agent City on Centennial Railway Heritage"**，简称 **JZ-AI-SC**。

**Logo 概念方案**：取京张铁路"人"字形轨道（1909年詹天佑设计）的几何骨架，叠合 AI 神经网络的三层回路——
- 底层：人字形轨道 + 京张遗址公园 L 形绿带（符号：百年传承）
- 中层：AI 数据流线条 + 三节点（符号：众智园/原点社区/大钟寺）
- 顶层：慢行环 + 全球 AI 活动周无限回环（符号：开放循环）

**品牌色板**：
| 色彩 | 色值 | 语义 |
| --- | --- | --- |
| 京张铁锈红 | #B5592A | 铁路遗产与历史厚度 |
| 中关村蓝 | #1A56DB | 科教底蕴与企业信任 |
| AI 荧光绿 | #10B981 | 创新生态与未来活力 |
| 旧址金 | #C79838 | 文化记忆与荣誉体系 |
| 城市深灰 | #1E293B | 建筑基底、基础设施 |

**扩展视觉资产**：导视符号系统（铁轨=文化线/芯片=产业线/人群=生活线）、中英文双语标牌规范、A3/A0 排版主色/辅助色层、数字界面（离线可视化/展板/路演）三套模板。所有字体（SimHei/Source Han Sans 候选）和 icon 来源见 [source:SITE-PACKAGE] 和 `report/copyright_statement.md`。

**中文名称体系**：
| 层级 | 中文命名 | 英文 |
| --- | --- | --- |
| 总体品牌 | 京张AI共生走廊 | Jing-Zhang AI Symbiotic Corridor |
| 文化线 | 百年京张文化带 | Centennial Heritage Belt |
| 体验线 | 都市AI生活体验带 | Urban AI Living Strip |
| 创新线 | AI融合创新带 | AI Convergence Innovation Zone |
| 北核 | 众智园 | Zhongzhiyuan AI Accelerator |
| 中核 | AI原点社区（五道口） | AI Origin Community @ Wudaokou |
| 南核 | 大钟寺智谷 | Dazhongsi AI Valley |

证据引用：[source:AGENT-TASKBOOK agent.1]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[depth:overall_spatial_structure]。

### agent.2 全球AI创新生态案例与生态机制图谱

**7个全球对标案例**：
| # | 案例 | 区位 | 核心借鉴 | 与京张的映射 |
| --- | --- | --- | --- | --- |
| 1 | Station F (Paris) | 巴黎旧货运站改造 | 历史车站转全球最大创业园区；"Flat"开放空间+"Founders Program"孵化体系 | 清华园车站转原点社区近校成果街 |
| 2 | One-North (Singapore) | 新加坡纬壹科技城 | 产研居娱高度混合；"Work-Live-Play-Learn"四象限；Fusionopolis+Biopolis双核驱动 | 众智园(研发)+原点社区(转化)+大钟寺(总部)的三核互补 |
| 3 | Mission Bay (SF) | UCSF生物医学+Uber总部 | 高校+企业共生的滨水更新区；公共空间贯通+多模式交通 | 小月河+清河滨水慢行系统连接三区两翼 |
| 4 | 深圳南山科技园 | 深圳大学城周边 | 从"加工区"到"创新区"的渐进更新；TOD+创新走廊 | 北五环轨道节点一体化+京张遗址公园创新走廊 |
| 5 | Eindhoven HTCE | 飞利浦废弃研发园 | 开放创新2.0：共享实验设施转跨界企业入驻；"社交催化"空间设计 | 众智园开放实验室+安全治理沙盒的设施共享模式 |
| 6 | 东京涩谷再开发 | 涩谷站周边TOD | 垂直城市+立体慢行+夜间经济；文化内容+科技企业混合街区 | 大钟寺站四象限一体化的地下/地面/二层连通 |
| 7 | 波士顿海港区 | GE总部迁入后更新 | 棕色地带转混合创新区的产城更新；公共滨水+创新服务+人才公寓 | 众智园清河界面+原点社区人才公寓的模式参考 |

参考文献待深化：Station F (Halle Freyssinet, 2017)、JTC One-North Master Plan、UCSF Mission Bay Plan、Shenzhen Nanshan Innovation Corridor Plan。当前阶段为概念参考，正式方案需补充详细比较研究和可迁移机制分析。

**AI创新生态机制图谱（6层）**：
```
[土地与空间] 4类用地分区 x 3区差异化供给
     |
[产业与创新] 基础研究(高校) -> 应用研发(企业Lab) -> 中试(众智园) -> 转化(原点) -> 总部(大钟寺)
     |
[人才与资本] 5类人才画像 x 种子/天使/VC/PE/上市梯度 x 人才特区政策包
     |
[算力与数据] 端侧算力驿站(分布式) + 中心算力通道(光纤/5G/6G) + 数据要素合规流通平台
     |
[场景与运营] 10张场景卡 x 3产业验证场景 x 开放测试日/沙盒预约/公共体验路线
     |
[治理与国际] 年度活动周 x 标准制定工作组 x 安全治理沙盒 x 中英文传播中心
```
每层机制与空间地图形成交叉对应：算力站点预留于 [data:geometry/constraints.geojson] 概念约束层，数据要素平台对应 [data:geometry/key_areas.geojson#PROV-KEY-003]。

**区域协同连接**：本方案"三区两翼"的空间框架向北通过 G6/京张高铁连接北纬社区与未来科学城，向东通过地铁15号线连接怀柔科学城，向南连接经开区，向西通过地铁16号线连接中关村核心区。具体协同机制建议为"四个共享"：算力共享（端侧节点标准互认）、场景共享（场景卡模板可跨区部署）、人才共享（驿站与公寓通用积分体系）、品牌共享（京张AI共生走廊品牌带动北翼协同区命名联动）。当前因缺区域规划底图，协同机制仅作为概念建议 [source:AGENT-TASKBOOK agent.2]。

证据引用：[source:AGENT-TASKBOOK agent.2]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、[depth:overall_spatial_structure]、[data:geometry/key_areas.geojson#PROV-KEY-003]。


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

### 场景-空间-数据-运营 详细矩阵（agent.3 补充证据）

将10张场景卡的简要描述扩展为可复核的六列矩阵：

| 场景卡 | 空间节点 | 数据源/类型 | 模型/智能体能力 | 运营主体(建议) | 人工复核与KPI |
| --- | --- | --- | --- | --- | --- |
| 01 开源发布厅 | AI原点社区 (PROV-KEY-002) | 开源仓库元数据(公开)、社区贡献统计 | 智能展示面板+代码贡献实时可视化 | 中关村开源创新联盟(拟)+高校开源社 | 人工审核发布内容合规；月活跃贡献者>200 |
| 02 安全治理沙盒 | 众智园 (PROV-KEY-001) | 公开模型评估数据集、标准文本 | 红队测试协调器+合规检查引擎 | 海淀AI安全治理中心(拟)+标准工作组 | 人工确认评估结论；沙盒预约周转化>5次 |
| 03 端侧算力驿站 | 总体设计范围节点 | 能源消费数据(聚合)、算力调度日志 | 低碳调度智能体+需求预测模型 | 区属科技平台公司(拟)+能源服务商 | 人工审核算力定价与公平接入；覆盖率>3节点/片区 |
| 04 AI慢行导航 | 京张遗址公园活力带 | 公开道路topology(OSM)、慢行计数(聚合) | 拥挤识别+断点检测+无障碍推荐 | 区园林/交通部门(拟)+智能体运营商 | 人工审批导视方案；慢行可达性提升>15% |
| 05 国际路演客厅 | 大钟寺 (PROV-KEY-003) | 企业展示素材(已清权)、会议日程 | 多语言实时翻译+智能匹配调度 | 大钟寺运营管理公司(拟)+国际活动机构 | 人工审核展示版权；季度路演>4场 |
| 06 清河低碳创新廊 | 众智园临河 | 环境传感器(温度/湿度/AQI)、步道计数 | 低碳效能展示+环境舒适度评估 | 区水务/生态部门(拟) | 人工确认环境数据校准；节假日活动>12次/年 |
| 07 近校成果转化街 | 原点社区 (PROV-KEY-002) | 高校技术转移公开数据、知识产权检索 | 专利匹配+转化路径推荐 | 区科委+技术转移中心(拟)+高校转移办 | 法务与知识产权人工复审；年度转化签约>20项 |
| 08 数据要素会客厅 | 大钟寺 (PROV-KEY-003) | 经授权的数据产品描述、交易目录 | 数据合规审查辅助+供需匹配 | 北京大数据交易所(参考)+数据合规机构 | 人工审查交易合规；季度撮合交易>10宗 |
| 09 AI生活服务样板街 | 社区与商业交汇节点 | 公共服务目录(公开)、商户信息(已授权) | 服务推荐+问询回答(可解释) | 街区运营机构+区商务/卫健委(拟) | 人工审核推荐内容；服务满意度>80% |
| 10 全球AI活动周路线 | 一带公共空间系统 | 活动报名信息(已授权)、空间容量模型 | 人流预测+安全风险预警+路线优化 | 区文旅局(拟)+专业展会公司 | 公安/消防人工审批；活动周总接待>5000人次 |

**3个产业测试验证场景**：
- **T-01 自主模型推理性能测试场**（众智园）：在受控隔离环境中运行公开评测基准，测量算力效率与推理延迟。空间载体：[data:geometry/green_space.geojson#GREEN-001] 预留绿色空间内可隔离测试区。
- **T-02 多智能体物流协同无人配送试验区**（小月河东翼）：低速机器人配送在公园与社区界面运行（限速15km/h），设置人工接管与紧急停止机制。空间载体：[data:geometry/roads.geojson#ROAD-001] 路段。
- **T-03 CIM+AI城市规划推演平台**（原点社区展示馆）：基于公开路网、绿地与边界数据构建轻量CIM，允许设计师输入更新方案后计算慢行可达性与服务半径变化。空间载体：[data:geometry/buildings.geojson#BLDG-003]。

证据引用：[source:AGENT-TASKBOOK agent.3]、[depth:blue_green_public_space]、[data:geometry/roads.geojson#ROAD-001]、[metric:scenario_card_count]。


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

城市风貌方案应融合京张铁路历史文化、中关村创新文化和AI创新文化，利用清华园火车站、北影等文化资源，提出城市基调、建筑风貌、屋顶形态、体量、界面和公共艺术引导。agent 还应提出导视标识、文化符号、国际传播叙事、AI朝圣地标、贡献墙或荣誉展示体系

### agent.4 三大AI朝圣地标与荣誉体系

**三大AI朝圣地标**：
| 地标 | 位置 | 设计概念 | 空间特征 | 数据落点 |
| --- | --- | --- | --- | --- |
| 京张智脉塔 (Z-J Tower) | 众智园滨河高地 | 以京张铁路"百年纵贯"为意象，塔身呈三段渐升钢结构，顶设公众观景平台+AI行业动态展示屏。日间显示算力与创新热度指数，晚间以光效回溯京张文化时间线。 | 高度约45m（建议值，待控规确认），与清河绿化结合，底部设AI开源贡献墙。 | [data:geometry/buildings.geojson#BLDG-002] 毗邻区域 |
| 原点开源广场 (Origin OSS Plaza) | AI原点社区核心 | 以"开源社区的公共代码库"作为广场铺装纹样（按实际开源项目贡献者网络生成的可读拓扑图案），设环形座椅+投影交互墙，每季度更新一次"贡献者图谱"。 | 约2000m²硬质广场+500m²遮荫绿化，与成果转化街步行连通。 | [data:geometry/public_space.geojson#PUBLIC-001] |
| 大钟寺AI之眼 (Dazhongsi Eye) | 大钟寺站上盖空间 | 利用大钟寺站一体化开发的上盖公共平台，设计环形LED数据雕塑"AI之眼"，实时渲染AI产业活跃度、人才流动趋势、公共服务满意度等城市指标（全部基于公开/聚合数据，不涉及个人隐私）。 | 直径约12m环形体量，可步行穿行，夜间为片区地标光源。 | [data:geometry/key_areas.geojson#PROV-KEY-003] |

**荣誉与贡献体系**：
- **"百年京张AI贡献者墙"**（京张遗址公园沿线3处站点）：年度在AI开源、安全治理、场景落地和公共服务方面做出突出贡献的开发者、团队、社区和企业，经社区提名和公开评审后刻录（实体+数字版）——强调公开性与社区治理，避免变成商业排名榜。
- **"开源代码胶囊"时间档案馆**（原点开源广场地下）：每隔1年封存一个"代码胶囊"（包含该年度关键开源项目的代码/文档/社区讨论记录归档），形成可参观的"开源考古"公共展项。
- **组件库**：将三大地标的视觉元素（智脉塔/开源广场/AI之眼符号）拆解为可复用组件（PNG/SVG/模型文件），供社区二次创作、参展和区域协同推广使用。所有组件标注"概念设计/仅供展示"标签。

证据引用：[source:AGENT-TASKBOOK agent.4]、[data:geometry/buildings.geojson#BLDG-002]、[data:geometry/public_space.geojson#PUBLIC-001]、[metric:ai_landmark_count]。

### agent.5 文化叙事与数字导览系统

**三层叙事结构**：
- **Layer 1 — 京张铁路的历史层**：由清华园车站旧址（全国重点文保）为起点，沿京张遗址公园设置8处"历史切片"信息节点（1909通车/1923/1949/1956清华大学东迁/1996清河站改造/2016京张高铁开通/2022/2026）。每个节点由耐候钢板+数字屏组成，触控可查看历史照片+音频讲述（离线缓存）。
- **Layer 2 — 中关村的创新层**：沿学院路—知春路—五道口设置5处"创新里程碑"节点（联想/百度/字节等企业注册成立地+国家图书馆+中关村创业大街），聚焦"从电子一条街到世界AI高地"的转型叙事。
- **Layer 3 — 未来AI的想象层**：在三大地标处设置"AI对话站"——公众可用自然语言向本地大模型提问"未来城市是什么样"，模型基于公开的城市设计原则和本方案概念生成声光互动回应。每次互动标注"概念展示，不构成规划承诺"。

**导视符号系统（京张AI导视规范）**：
| 符号类别 | 图形语言 | 颜色编码 | 应用场景 |
| --- | --- | --- | --- |
| 文化路径 | 铁轨双线+箭头 | 铁锈红 #B5592A | 京张铁路遗址公园沿线导览 |
| 产业路径 | 芯片纹样+箭头 | 中关村蓝 #1A56DB | AI企业/孵化器/实验室方向指引 |
| 生活路径 | 人群剪影+箭头 | 城市深灰 #1E293B | 公共服务/商业/居住指引 |
| 活动路径 | 环形无限符号+箭头 | AI荧光绿 #10B981 | 临时活动/节日/路演引导 |

**国际传播机制（概念建议）**：
- 双年活动："京张AI共生走廊国际设计周"（每两年一次，聚焦城市设计+AI场景跨界对话）。
- 数字孪生展示馆（原点社区）：基于 `visual/index.html` 的离线可视化升级为常设大屏版，用于接待海外代表团。
- 中英双语传播资料包：包括 Logo 文件、核心方案摘要（中英2页）、场景卡英文版和三大地标展示板。

证据引用：[source:AGENT-TASKBOOK agent.5]、[standard:MOHURD-URBAN-DESIGN-MEASURES]、[data:geometry/phasing.geojson#PHASE-001]。

### agent.6 长期运营与开发者社区机制

**年度活动日历（概念建议）**：
| 时间 | 活动 | 地点 | 频率 | 预期参与 |
| --- | --- | --- | --- | --- |
| 3月 | 京张AI开学季·开源黑客松 | 原点开源广场 | 1次/年 | 开发者300-500人 |
| 5月 | AI安全治理公开日 | 众智园沙盒展示厅 | 2次/年 | 专家+企业80-120人 |
| 7月 | 京张遗址公园夏季AI公共体验节 | 一带公共空间 | 1次/年 | 公众3000+人 |
| 9月 | 全球AI创新路演·京张站 | 大钟寺路演客厅 | 1次/年 | 国际创业团队30-50个 |
| 10月 | 场景开放日（政企对接） | 三区轮流 | 4次/年 | 企业+政府部门 |
| 12月 | 年度AI贡献者颁奖+代码胶囊封存 | 原点社区 | 1次/年 | 社区提名+公开评审 |

**开发者社区治理架构（概念建议）**：
- **"京张AI走廊社区理事会"**：由开发者代表（不少于40%）、企业代表（不超过30%）、高校代表和公共部门代表组成，每季度召开线上/线下会议，决策场景开放清单、活动预算分配和社区规则修订。
- **场景开放机制**：企业或团队可通过理事会申请使用具体场景卡对应空间，提交测试方案 -> 社区评审 -> 缴纳保证金 -> 按KPI考核 -> 退出恢复（全流程不超过90天）。
- **"AI共生走廊贡献积分"**：基于 GitHub commit + 场景测试报告 + 活动志愿服务等综合计量，积分可兑换共享办公、算力券和优先场景使用资格。

**人才与企业的招引转化漏斗（概念建议）**：
```
公众参与(体验节/参观) -> 感兴趣开发者(黑客松) -> 初创团队(场景开放测试)
-> 正式入驻(孵化器/加速器) -> 安家(人才公寓/社区服务) -> 总部落地(大钟寺)
```
每阶段设置阶段转化率目标和专属服务包。

**运营风险控制**：所有活动须经公安/消防/市政审批，重大活动采用"低噪声时段（白天09:00-21:00）+分级音压"控制扰民；场景测试须购买公众责任保险；AI对话站内容须有"一键标记不当内容 -> 人工审查 -> 下架"机制。所有运营安排均为概念建议，不构成政府承诺或实施计划。

证据引用：[source:AGENT-TASKBOOK agent.6]、[metric:renewal_project_count]、[data:geometry/phasing.geojson#PHASE-001]。

，但所有品牌、字体、图像、肖像和企业标识都必须有清权来源。风貌控制应分清官方管控、设计建议和待确认条件，严禁在没有文保或控规依据时给出伪精确控制线。

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

指标复算深度由 [depth:metrics_recalculation] 管理。本方案正文显式引用 [metric:site_area_sqm]、[metric:key_area_count]、[metric:building_footprint_area_sqm]、[metric:green_ratio]、[metric:public_space_ratio]、[metric:building_count]、[metric:road_segment_count]、[metric:scenario_card_count]、[metric:user_persona_count]、[metric:ai_landmark_count]、[metric:renewal_project_count]，并说明这些值来自 [data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/buildings.geojson#BLDG-001]、[data:geometry/green_space.geojson#GREEN-001] 和 [data:geometry/public_space.geojson#PUBLIC-001]。

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
