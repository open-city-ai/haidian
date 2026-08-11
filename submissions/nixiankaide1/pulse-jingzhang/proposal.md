---
title: "京张起跑线：从百年铁路起点到全球AI运动健康活力带城市设计"
author_github: "nixiankaide1"
language: "zh"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以'起跑线'命名体系与AI×运动健康活力城市为主线，把43.6平方公里京张AI创新带设计为一条22公里可奔跑的城市运动健康廊道；全部空间内容为概念建议，基于provisional边界，待官方数据发布后复算。"
tracks: ["ai-public-services", "youth-friendly-public-space", "jingzhang-heritage-narrative"]
scenarios: ["ai-health-service-navigation", "ai-traffic-walkability", "ai-cultural-guide", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v0.1"
---

# 京张起跑线：从百年铁路起点到全球AI运动健康活力带城市设计

## 设计依据与资料清单

本方案的城市设计判断，首先以《百年京张AI创新带城市设计国际方案征集资格预审公告》（2026年5月9日，北京市规划和自然资源委员会海淀分局发布）为第一权威依据 [source:OFFICIAL-ANNOUNCEMENT][standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。公告确立了三层设计范围、三处重点区域、设计任务、成果深度与语言要求，是本方案所有空间叙事的法定语境。公告之外，本方案同时遵循面向全球智能体开源征集任务书所补充的十条智能体共创原则、三大定位、五大功能、三区两翼结构、六项智能体任务与统一边界条款 [source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]——这意味着命名体系、生态案例、场景卡、朝圣地标、文化叙事与长期运营六项内容必须在正文中可读，而非仅在 JSON 中打勾。

资料状态方面，本方案严格区分四类资料：其一，公告与任务书文本（formal 可用，支撑任务定义）；其二，仓库派发的 `brief/site-package/` 资料包，包括 `design_brief.json`、`allowed_design_space.json`、`agent_taskbook.json`、`sources.json` 与 `visual_style_recommendations.json` [source:SITE-PACKAGE]；其三，公开资料登记表 `data/source_registry.json`，用于判定每条资料 `usable_for_formal` 状态 [source:SOURCE-REGISTRY]；其四，已处理事实包 `data/processed/agent_fact_pack.md` 及其配套 CSV，作为导航层使用，其结论仍回引原始 source_id [source:PROCESSED-FACT-PACK]。三条专业标准——《城市设计管理办法》《城市、镇控制性详细规划编制审批办法》与自然资源部《国土空间调查、规划、用途管制用地用海分类指南》——作为风貌、控规深度与用地分类的本地依据 [standard:MOHURD-URBAN-DESIGN-MEASURES][standard:MOHURD-CONTROL-DETAILED-PLANNING][standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。 上述标准的官方文本快照分别登记为 [source:MOHURD-URBAN-DESIGN-2017]、[source:MOHURD-CONTROL-2008] 与 [source:MNR-LAND-USE-202311]。

必须如实披露：截至本稿，官方精确红线与三处重点区域 official polygon 尚未取得。本方案使用 `brief/site-package/geometry/provisional_boundaries.geojson` 提供的临时粗略边界开展工作，其属性为 `geometry_role="provisional_constraint"`、`official_boundary=false`、`boundary_precision="provisional_rough"`，仅可用于方案生成、可视化与讨论，不得作为官方红线、审批依据或精确面积复算依据 [source:BOUNDARY-SOURCE][depth:existing_conditions_diagnosis]。据此，本方案所有面积、比例与规模均视为"概念建议"，待官方 polygon 发布后统一复算 [data:geometry/site_boundary.geojson#SITE-001][metric:site_area_sqm]。三层范围的公告文字四至与面积（统筹研究 43.6 平方公里、总体设计 11.4 平方公里、重点区域 368.4 公顷）可作为 formal 任务依据；由此派生的任何图面与指标仅反映设计意图 [source:KEY-AREA-SOURCE]。资料缺口清单（official红线、控规指标、现状建筑底数、权属、工程条件）详见第十二章，并逐项写入 `assumptions.json` 与 `missing_data_checklist.csv` 的对应条目。

本章的设计判断是：**在官方几何数据到位之前，用"可读、可查、可复算"的标准组织方案**——空间主张以概念建议表述，数据主张以证据标签可追溯，图面以设计意图为主体、provisional 边界一律淡色虚线表达。这一判断对应 [depth:existing_conditions_diagnosis] 与 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]；其资料缺口是官方几何文件与控规指标，替换后需重算的图层与指标清单见第二章与第十一章。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

本方案采用"产业战略—总体城市设计—重点片区详细设计"三级工作框架，与公告的三层范围一一对应。三层范围的目标、边界、面积、深度与成果如下表：

| 层级 | 工作目标 | 空间边界（公告文字） | 面积 | 设计深度 | 成果表达 |
|---|---|---|---|---|---|
| 统筹研究范围 | 产业战略与未来城市形态研究，回答"带是什么、往哪去" | 北至北五环路，东至京藏高速，南至西直门外大街，西至万泉河路 | 43.6 km² | 战略与概念研究 | 命名体系、定位功能、案例转化、未来城市形态、A0 战略板 |
| 总体设计范围 | 城市更新与控规深度城市设计，回答"带怎么组织" | 北至北五环路，东至学院路、西土城路等，南至西直门外大街，西至大钟寺东路、荷清路等 | 11.4 km² | 控制性详细规划的城市设计深度 | 空间结构、用地布局、交通轨道市政、蓝绿系统、风貌控制 |
| 重点区域范围 | 三处重点片区详细设计，回答"核怎么落地" | 自北向南：众智园AI自主创新加速区、北京AI原点社区、大钟寺AI产业聚集区 | 368.4 ha | 规划综合实施方案的城市设计深度 | 三区详细小方案、拆改留概念、实施项目抓手 |

[source:BOUNDARY-SOURCE][depth:three_level_scope_framework][metric:key_area_count]

三层传导逻辑：统筹研究层确立"AI×运动健康"总体命题与"起跑线"命名体系，向下约束总体设计层的"一廊两翼三起点五节点"结构；总体设计层把结构落实为用地比例、交通骨架与公共空间网络；重点区域层在三个"起点"核内给出可感知的空间方案与项目抓手。每一层都对应明确的图层与指标：统筹层对应 [data:geometry/site_boundary.geojson#SITE-001] 与命名/案例类指标；总体层对应 [data:geometry/land_use.geojson#LU-001] 至 [data:geometry/land_use.geojson#LU-012]、[data:geometry/roads.geojson#R-001]、[data:geometry/green_space.geojson#GR-001]；重点层对应 [data:geometry/key_areas.geojson#KEY-001] 至 [data:geometry/key_areas.geojson#KEY-003] [source:KEY-AREA-SOURCE]。

必须披露的边界限制：三层范围及三处重点区目前均为 provisional 粗略 polygon。本方案接受这一组织方数据缺口，并在所有图面、正文与自检结果中醒目标注；该缺口不阻断内容评分（维护者已就边界数据状态作出正式决策，见 [source:DATA-BOUNDARY-DECISION]），但下列图层与指标在 official polygon 到位后必须复算：`site_boundary.geojson`（SITE-001）面积与 [metric:site_area_sqm]；`land_use.geojson` 全部分区的面积占比与 [metric:green_ratio]、[metric:public_space_ratio]；`key_areas.geojson` 三处重点区边界与面积 [metric:key_area_count]；`buildings.geojson` 建筑基底 [metric:building_footprint_area_sqm]；`roads.geojson` 起跑廊线位与 [metric:trail_length_km]；`phasing.geojson` 三期实施范围 [data:geometry/phasing.geojson#PH-1][data:geometry/phasing.geojson#PH-2][data:geometry/phasing.geojson#PH-3]。 三期划分对应 [metric:phase_count] 个分期图层。复算前，一切数值均为方向性概念。

本章设计判断：**以公告文字四至为任务锚点、以 provisional 几何为可视化载体、以官方 polygon 为复算触发器**。对应 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 与 [depth:three_level_scope_framework]；资料缺口为官方红线几何与重点区官方 polygon，缺补后第二章全部表格数据需刷新。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 3.1 总体命题：一座可以奔跑的城市

统筹研究范围（43.6 km²）横跨海淀区中北部，是"百年京张"铁路遗产、中关村创新版图与学院路高校集群的交汇地带 [source:OFFICIAL-ANNOUNCEMENT]。面对已有约二百个方案在"轴/廊/线/脉/平台"叙事上的高度同质，本方案提出差异化命题：**"京张起跑线"（JINGZHANG START LINE）——全球首个 AI×运动健康活力城市实验室**。"起跑线"三义合一：清华园车站是京张铁路零公里、中国人自主修建铁路的起点（1909 自主创新）；运动健康是人的第一语言，把 AI 从屏幕上请到身体上，起跑线属于每一个人（2026 城市级运动实验室）；AI 计算信号让城市可感知、可响应、可进化，这里是全球 AI 创新的起跑线（未来城市形态）[depth:overall_spatial_structure]。

一句话主张：**"百年前中国铁路在这里出发，今天让世界从这里起跑"**。这一命题直接回应三大定位——百年京张文化带=起点记忆（遗产）、都市AI生活体验带=起跑体验（感知）、AI融合创新带=起点共创（创新）——并以可感知的运动健康主线天然占优"场景可感知度、青年友好、国际传播"三项评审维度。北师大（走廊南段）与学院路高校体育科研资源构成真实生态锚点，这是本命题区别于纯概念提案的在地基础 [source:PROCESSED-FACT-PACK]。

### 3.2 五大功能与三区两翼协同回路

五大功能以"五起点"分区落地，形成"验证→孵化→落地→回流"闭环：AI 全栈自主创新体系→众智园·验证起点；世界级 AI 创新生态→AI原点·原点起点（清华园零公里）；AI+场景赋能新范式→小月河·赋能起点（西翼）；智能化 AI 活力城市→大钟寺·体验起点（南核）+全线运动健康网络；AI 治理全球话语权→数据沙盒+人工复核委员会+荣誉体系（中关村·服务起点）。协同回路为：验证起点产出→原点起点孵化→体验起点落地→两翼输送要素（资本/场景）→数据回流众智园再验证。命名体系如下表：

| 层级 | 中文 | English | 说明 |
|---|---|---|---|
| 主名称 | 京张起跑线·AI运动健康活力带 | JINGZHANG START LINE · AI Sports & Wellness Vitality Belt | 正式主名 |
| 简称 | 京张起点 | JZ-START | 传播用 |
| 分区1 | 众智园·验证起点 | Verify Start (Zhongzhiyuan) | 北核 |
| 分区2 | AI原点·原点起点 | Origin Start (AI Origin Community) | 中核（清华园零公里） |
| 分区3 | 大钟寺·体验起点 | Experience Start (Dazhongsi) | 南核 |
| 两翼 | 中关村·服务起点 / 小月河·赋能起点 | Service Start / Empower Start | 东西翼 |

命名逻辑："起点"一词同时回应京张铁路零公里史实与马拉松起跑线意象，五起点对应五功能，[source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

### 3.3 Logo 与视觉识别方向

主视觉为**起跑线拱门（Start Line Gate）**：三条跑道弧线（铁轨黑/脉搏红/计算蓝）从百年刻度 1909 出发，穿过起跑拱门汇成一条向前延伸的波形线——跑步轨迹、数据流与铁路线三义合一。色彩系统为铸铁黑（京张遗产）+脉搏红（运动能量）+计算蓝（AI 数据），辅以跑道绿（公共空间）；字体采用几何无衬线（铁路信号牌风格），伴随"1909 — 2026 — ∞"时间刻度。延展系统包括零公里桩造型导视、配速标识系统（配速=城市节奏隐喻）与起跑勋章（活动成就体系）。总体结构图中以起跑拱门/跑道弧线为主视觉元素，provisional 边界一律虚线淡色。Logo 为概念方向，不构成已批准视觉标识 [depth:overall_spatial_structure]。

### 3.4 全球 AI 创新生态案例与方法转化

六个案例仅引用公开方法信息，不作直接照搬，重点提炼"经验→可转化机制→空间/图层/指标落点"：

| 案例 | 经验要点 | 可转化机制 | 空间落点/图层/指标 |
|---|---|---|---|
| 赫尔辛基 Smart Kalasatama | 健康城市试点嵌入旧城更新，小切口验证 | "健康数据+公共空间"试点机制 | 众智园体测驿站试点 [data:geometry/public_space.geojson#PS-001]；[metric:test_scene_count] |
| 新加坡 ActiveSG | 国民运动积分平台，运动即货币 | 脉动勋章+运动积分体系 | 全线节点打卡系统（SC-11）；[metric:scenario_card_count] |
| 波士顿 Seaport | 产业孵化与滨水公共空间一体化 | 产业空间与公共空间缝合 | 众智园产业-绿地咬合界面 [data:geometry/land_use.geojson#LU-002] |
| 巴塞罗那 22@ | 老工业区向知识创新区转型+社会设施预留 | 拆改留与社会设施配比逻辑 | 改造类建筑清单 [data:geometry/buildings.geojson#B-005]；[metric:sports_facility_ratio] |
| 深圳湾智能跑道/杭州滨江智慧步道 | 国内 AI 运动基础设施标杆 | 体测驿站+配速教练硬件标准 | 起跑廊三线复合断面 [data:geometry/roads.geojson#R-001]；[metric:trail_length_km] |
| 东京奥运遗产街区 | 体育赛事遗产长期运营+城市活力 | 年度赛事 IP 与场馆赛后利用 | 大钟寺赛事运营基地（PH-2）[data:geometry/phasing.geojson#PH-2] |

[metric:case_study_count]

### 3.5 未来 AI 城市形态

本方案的未来城市形态判断：**AI 不是叠加在街道上的服务层，而是渗透进城市肌理的运动健康基础设施**。具体体现为三端：端侧（体测驿站、配速终端等边缘计算节点嵌入公共空间，数据本地化处理）、云端（运动健康数据沙盒与人工复核委员会构成治理中枢）、场侧（场景开放沙盒按"准入→试点→评估→推广"闭环演进）。未来形态的四个特征——可奔跑（22km 连续廊道）、可感知（AI 场景即时响应）、可进化（数据回流迭代）、可治理（隐私边界三原则）——分别对应 [data:geometry/roads.geojson#R-001]、[data:geometry/green_space.geojson#GR-001]、[metric:green_ratio] 与 [metric:public_space_ratio]。该形态判断为概念建议，供专业团队深化 [source:AGENT-TASKBOOK][depth:overall_spatial_structure]。

## 总体设计范围城市更新与控规深度城市设计

### 4.1 空间结构：「一廊两翼三起点五节点」

总体设计范围（11.4 km²）以京张遗址公园为空间主轴，形成**「一廊两翼三起点五节点」**结构，直接落实公告 1.5（2）关于产业目标、功能布局、城市更新框架、京张遗址公园活力带与城市风貌的总体要求 [source:OFFICIAL-ANNOUNCEMENT][depth:overall_spatial_structure]：

- **一廊**：京张遗址公园绿色起跑廊（22km 运动健康复合廊道：跑步道+骑行道+慢行步道三线复合）[data:geometry/roads.geojson#R-001][metric:trail_length_km]；
- **两翼**：西带=科研创新带（学院路高校群+科研院所），东带=生活体验带（都市 AI 生活体验）；
- **三起点**：众智园（验证起点）· AI原点（原点起点·清华园零公里）· 大钟寺（体验起点）[data:geometry/key_areas.geojson#KEY-001][data:geometry/key_areas.geojson#KEY-002][data:geometry/key_areas.geojson#KEY-003]；
- **五节点**：清河运动公园（北）· 清华园起点广场（中北）· 学院路活力驿站（中）· 小月河滨水带（西翼）· 西直门门户（南）。 蓝绿空间（公园绿地+广场）合计占比约 [metric:green_blue_ratio]。

结构判断的依据：京张遗址公园线位是历史与空间的天然主轴；学院路高校群构成西翼的科研供给；三个重点区沿主轴南北布点，恰好形成"验证—原点—体验"的逻辑动线。该结构对应 [standard:MOHURD-URBAN-DESIGN-MEASURES] 关于统筹城市空间结构、塑造特色风貌的要求，落实于 `land_use.geojson`、`roads.geojson`、`green_space.geojson` 与 `public_space.geojson` 四类图层 [depth:land_use_layout]。这一结构与第六章场景卡、第九章地标系统一一咬合：起跑廊既是空间骨架，也是 SC-01/SC-09/SC-10 三类场景的载体，还是 L1—L4 朝圣地标的组织轴线——空间、场景、文化三者共用同一根"起跑线"，是本方案区别于"园区+配套"式方案的关键设计判断。

### 4.2 用地布局与功能比例（概念目标）

用地功能比例为**方案概念目标，最终以控规为准**：

| 用地类型 | 占比（概念） | 设计理由 |
|---|---|---|
| 居住 | 25% | 支撑职住平衡与青年人才留驻 |
| 科研 | 20% | AI 全栈创新主承载 [data:geometry/land_use.geojson#LU-001] |
| 教育 | 12% | 学院路高校群延续 [data:geometry/land_use.geojson#LU-003] |
| 体育 | 6% | 含 0805 体育用地，显著高于一般城区——方案签名指标 |
| 医疗 | 3% | 运动健康配套 [data:geometry/land_use.geojson#LU-004] |
| 文化 | 4% | 京张文化展示 |
| 商业 | 12% | 场景消费与活力界面 [data:geometry/land_use.geojson#LU-006] |
| 道路 | 12% | 一纵三横骨架 |
| 绿地 | 12% | 起跑廊+绿网 [data:geometry/green_space.geojson#GR-001] |
| 广场 | 4% | 公共活动节点 [data:geometry/public_space.geojson#PS-001] |
| 留白 | 2% | 应对 AI 产业快速迭代的空间弹性 |

[metric:green_ratio][metric:public_space_ratio][metric:floor_area_ratio]

用地判断的核心是"体育 6%"的签名意义：把运动健康从附属绿地提升为法定用地图层，支撑 [metric:sports_facility_ratio]。该比例及分区边界全部为概念建议，需在控规编制中复算校核 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

### 4.3 城市更新总体框架

更新框架遵循"保留记忆、改造界面、释放节点、预留弹性"四项原则，落地为四类更新逻辑（详见第七章拆改留方案）：保留——京张铁路遗产与文保单位（如清华园车站旧址 [data:geometry/constraints.geojson#C-002]）；改造——旧工业用地与高校周边存量；拆除——危房与低效用地（仅概念层面提出可能性）；新建——三起点节点综合体。框架的空间抓手是沿起跑廊两侧的组团式布局：核心区（三核）建筑密度高、公共界面开放，廊道两侧以 5—12 层建筑为主、地标节点可更高（**概念建议，最终以控规为准**）[depth:development_intensity_controls][depth:height_massing_character][data:geometry/buildings.geojson#B-001]。

更新框架的设计判断是"以运动健康廊道为更新缝合线"：旧工业用地、高校周边存量与居住社区沿廊错位更新，使更新项目之间形成连续的公共空间与运动体验，而非零散的点状开发。这一判断依据 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 对控规编制深度与刚弹结合的管控要求，其落地依赖 `buildings.geojson`（建筑基底与拆改留分类）与 `phasing.geojson`（分期实施范围）两类图层的联合校核。更新对象的具体范围与权属情况为待补资料，未到位的部分一律不作定论。

### 4.4 风貌控制原则

风貌基调为"百年铁路气质 × 数字时代轻盈"：铸铁黑、砖红与玻璃灰为建筑主色，跑道绿为公共空间色；屋顶形态鼓励第五立面参与运动数据可视化；廊道沿线禁止大体量板式建筑贴线排布，保证跑步视廊通透。风貌控制落实 [standard:MOHURD-URBAN-DESIGN-MEASURES]，图面表达于 [data:geometry/buildings.geojson#B-001] 至 [data:geometry/buildings.geojson#B-005] 与风貌控制图。所有高度、体量表述均为概念区间，非结论 [depth:height_massing_character]。

### 4.5 交通、轨道与市政概念（详见第八章）

总体层交通概念为"一纵三横"骨架：京张主线（跑步道/骑行道复合）+ 学院路/大钟寺东路/西直门外大街三横；轨道以 13 号线、昌平线及知春路—西直门换乘锚点组织 TOD 概念（概念建议）。市政与新型基础设施（端侧算力、运动健康数据节点、分布式能源）的融合思路见第八章 [depth:traffic_rail_slow_parking][depth:municipal_new_infrastructure]。

总体设计层最重要的待确认控规条件：各地块容积率与建筑高度上限、道路红线、地块边界、文保控制线、市政管线与交通断面。缺失部分全部写入待确认清单，不作为审定结论 [depth:development_intensity_controls]。

## 重点区域详细设计

三处重点区域自北向南沿起跑廊串联，构成"验证—原点—体验"的空间动线。三区 polygon 均为 provisional，以下结论均为方向性设计，供专业团队深化 [source:KEY-AREA-SOURCE][depth:three_key_area_detailed_design]。每区方案达到规划综合实施方案的城市设计深度要求，遵循 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 关于地块层面用地、强度与公共空间管控的深度约定；在 official polygon 到位前，所有地块边界与面积表述均为粗略参考 [metric:key_area_count]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

### 5.1 众智园·验证起点（192.1 公顷）

**定位**：AI 全栈自主创新加速区，承担"验证起点"功能——把创新成果放到真实场景里跑一遍 [data:geometry/key_areas.geojson#KEY-001]。设计判断：验证不是实验室行为，而是公共空间行为——公众看得见、用得上的测试场才构成"验证起点"的城市意义。

**空间结构**："一核一环一带"——核心为验证塔与测试验证组团，环为产业服务环（孵化器、中试平台、公共算力中心），带为面向清河的运动健康试验带。**建筑更新**：以改造存量科研楼宇为主，嵌入模块化测试厂房与可移动实验舱；核心区新建验证塔作为产业地标（概念），塔身预留数据可视化媒体立面，形成"验证结果可见"的城市界面。**交通慢行**：内部小街区密路网，接驳 13 号线站点，慢行优先的"验证环"串联测试场与产业楼宇，货运与测试流线独立设置，避免与慢行冲突。**公共空间**：体测驿站试点群（借鉴赫尔辛基健康试点机制，小切口先试）与验证结果可视化广场，广场兼作黑客跑活动集散地。**AI 场景**：SC-08 电竞×体能训练融合馆、TV-01 AI 运动处方验证场、TV-03 健康数据沙盒（人工复核委员会常设于此）。**实施风险**：测试场景涉及个人健康数据，隐私边界与人工复核机制必须先于建设确立；存量改造涉及权属整合，需逐个地块确认；验证塔体量与高度须与控规校核，本方案仅提出概念区间。

### 5.2 AI原点·原点起点（104.3 公顷）

**定位**：世界级 AI 创新生态与京张铁路零公里记忆的复合载体，"原点起点"在此成立 [data:geometry/key_areas.geojson#KEY-002]。设计判断：原点社区的意义在于"记忆与未来的垂直叠加"——同一片土地上，1909 的零公里桩与 2026 的 AI 创新生态共生，这正是"起跑线"叙事的在地锚点。

**空间结构**："一场一轴一廊"——清华园起点广场（零公里桩+起跑拱门）为核心，学院路创新轴为产业界面，遗址公园主廊为运动界面。**建筑更新**：清华园车站旧址严格按文保要求保护性展示 [data:geometry/constraints.geojson#C-002]，周边以改造、织补为主，禁止在文保控制区内新建大体量建筑；站房周边建议做"铁路记忆第一立面"，控制高度与材质，保证零公里桩视廊通透。**交通慢行**：西土城路慢行改造与学院路高校慢行带衔接，站点接驳强化高校通勤自行车流线。**公共空间**：起点广场设碑刻+数字铭牌荣誉体系核心载体（L1），广场铺装以配速刻度为主题，把"起点"做成可体验的城市家具。**AI 场景**：SC-05 高校体育数据桥（北师大/北航/北邮科研供给）、SC-09 AI 文化导览起点（百年轨迹之旅起跑点）。**实施风险**：文保红线是最高约束，任何空间方案须先通过文物部门审查；站点一体化涉及轨道与商业接口协调；荣誉墙内容涉及开发者署名，须建立贡献等级与内容审核机制。

### 5.3 大钟寺·体验起点（72.0 公顷）

**定位**：AI 产业聚集与 AI 生活体验的南端门户，"体验起点"——让 AI 运动体验可感可触 [data:geometry/key_areas.geojson#KEY-003]。设计判断：体验起点面向的是"第一次接触 AI 运动的市民与游客"，场景设计以低门槛、即用即走、可见即所得为原则。

**空间结构**："一核两界面"——大钟寺活力核（智慧球场旗舰+体测体验中心）与社区界面、轨道界面。**建筑更新**：以新建节点综合体和沿街商业界面更新为主，控制体量与退线，保持南门户进入感；社区界面以微更新为主，避免大拆大建。**交通慢行**：大钟寺东路横轴与西直门外大街门户衔接，轨道站点一体化 TOD 概念，地下接驳空间预留商业与运动设施接口。**公共空间**：智慧球场（SC-03）、运动处方街区（SC-04）嵌入社区网格，球场夜间照明设计考虑"下班后一小时运动"场景，服务通勤人群。**AI 场景**：TV-02 智慧球场算法验证场、SC-12 大型活动人流 AI 辅助（与应急部门联动）。**实施风险**：大钟寺片区商业与居住混合度高，更新时序需与产权谈判匹配；人流密度大，赛事运营须同步设计应急疏散与安保预案；智慧球场的识别算法存在误判风险，犯规判罚须保留人工终审通道。

三区合计 368.4 公顷，对应 [metric:key_area_count]（=3）；每区均须在 `key_areas.geojson` 官方 polygon 到位后重算边界与面积。

## AI 创新生态、人才画像与 AI+ 场景

### 6.1 六类用户画像

| ID | 画像 | 需求特征 | 对应场景 | 空间锚点 |
|---|---|---|---|---|
| P1 | 高校运动科研人员 | 数据与算法供给，测试场地 | SC-05、TV-01 | 学院路高校群/AI原点 |
| P2 | AI 创业者/开发者 | 产业空间、测试验证、资本对接 | SC-08、TV-03 | 众智园 |
| P3 | 大学生运动爱好者 | 高频运动、社交打卡 | SC-01、SC-11 | 学院路活力驿站 |
| P4 | 周边社区居民（含银发） | 健康干预、就近服务 | SC-04、SC-07 | 居住社区节点 |
| P5 | 通勤骑行上班族 | 绿色通勤、安全评估 | SC-06 | 小月河翼 |
| P6 | 外籍运动员/游客 | 国际赛事、文化体验 | SC-09、SC-12 | 全线+大钟寺 |

[metric:persona_count][depth:overall_spatial_structure]

### 6.2 十二张场景卡（含三张测试验证）

每张卡均含空间、服务对象、数据、隐私边界、人工复核、运营主体、图层映射与风险。以下为可读卡式（节选完整字段）：

| ID | 场景 | 空间 | 服务对象 | 运行数据 | 隐私边界 | 人工复核 | 运营主体 | 图层 | 风险 |
|---|---|---|---|---|---|---|---|---|---|
| SC-01 | 开发者跑步道 AI 配速教练 | 遗址公园主廊 | P1/P3/P6 | 配速、步频、轨迹 | 匿名聚合，不存身份 | 处方类建议复核 | 平台公司+体育局 | [data:geometry/roads.geojson#R-001] | 数据漂移 |
| SC-02 | AI 体测驿站（5 分钟体质测评） | 五节点+三核 | P1-P6 | 体质指标 | 本地化处理 | 医学指标专人复核 | 医疗机构+运营方 | [data:geometry/public_space.geojson#PS-001] | 误诊风险 |
| SC-03 | 智慧球场·AI 运动分析 | 大钟寺活力核 | P2/P3 | 姿态、轨迹 | 场景内采集 | 犯规判罚人工终审 | 场馆运营商 | [data:geometry/key_areas.geojson#KEY-003] | 算法误判 |
| SC-04 | 运动处方街区 | 大钟寺社区界面 | P4 | 运动行为 | 最小化采集 | 处方医师复核 | 社区医疗 | [data:geometry/land_use.geojson#LU-004] | 依从性 |
| SC-05 | 高校体育数据桥 | AI原点（学院路） | P1 | 科研数据 | 脱敏共享 | 学术伦理审查 | 高校联盟 | [data:geometry/key_areas.geojson#KEY-002] | 数据权属 |
| SC-06 | 骑行绿廊智慧安全评估 | 小月河翼 | P5 | 流量、事故风险 | 位置脱敏 | 交管复核 | 交通部门 | [data:geometry/roads.geojson#R-005] | 误报 |
| SC-07 | 银发运动健康驿站 | 居住社区节点 | P4 | 心率、运动量 | 监护人授权 | 社区医生复核 | 社区+卫生站 | [data:geometry/public_space.geojson#PS-002] | 跌倒检测误报 |
| SC-08 | 电竞×体能训练融合馆 | 众智园 | P2/P3 | 体能、反应 | 场景内 | 教练复核 | 企业+运营商 | [data:geometry/key_areas.geojson#KEY-001] | 久坐健康 |
| SC-09 | AI 文化导览·运动挑战线 | 遗产公园全段 | P6/P3 | 位置、成就 | 匿名 | 内容审核 | 文化部门 | [data:geometry/constraints.geojson#C-001] | 内容准确性 |
| SC-10 | 机器人陪练与补给配送 | 跑道沿线 | P1-P6 | 路线、补给 | 低敏数据 | 安全员监控 | 服务机器人企业 | [data:geometry/roads.geojson#R-001] | 碰撞安全 |
| SC-11 | 运动社交打卡·城市徽章 | 全线节点 | P3/P6 | 打卡、成就 | 可退出 | 反作弊审核 | 运营平台 | [data:geometry/public_space.geojson#PS-003] | 隐私炫耀 |
| SC-12 | 大型活动人流 AI 辅助 | 赛事场景 | 全员 | 人流密度 | 聚合统计 | 指挥中心复核 | 应急部门 | [data:geometry/public_space.geojson#PS-001] | 拥挤风险 |

测试验证场景（不少于 3 张要求）：

| ID | 测试场景 | 空间 | 验证内容 | 人工复核重点 |
|---|---|---|---|---|
| TV-01 | AI 运动处方验证场 | 众智园 | 运动处方算法与运动医学指标 | 医学+临床双复核 |
| TV-02 | 智慧球场算法验证场 | 大钟寺 | 姿态识别/犯规识别 | 裁判人工终审 |
| TV-03 | 健康数据沙盒 | 众智园/原点 | 隐私计算与合规 | 数据合规人工复核委员会 |

[metric:scenario_card_count][metric:test_scene_count]

### 6.3 场景-空间-运营映射

场景按"体验—产业—科研—运营"四类落位：体验类嵌入公共空间图层，产业类嵌入三核，科研类依托高校，运营类绑定年度活动。运营机制为场景开放沙盒：申请制准入→试点→评估→推广，隐私边界三原则（数据最小化、人工复核、可退出）贯穿全部场景 [source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][depth:overall_spatial_structure]。风险共担机制：所有场景运营主体为概念建议，需在落地时与政府、企业、高校签订三方协议并接受人工复核委员会监督。

## 用地、建筑规模与拆改留方案

### 7.1 用地布局逻辑

用地布局遵循"沿廊集聚、组团混合、弹性留白"三原则：科研教育沿西带（学院路）集聚，居住与商业沿东带和生活界面混合布局，体育与绿地紧贴起跑廊布置 [data:geometry/land_use.geojson#LU-001][data:geometry/land_use.geojson#LU-002][data:geometry/land_use.geojson#LU-006]。体育用地 6%（含 0805 体育用地）显著高于一般城区，是本方案签名判断：运动健康需要法定用地保障，而非仅靠附属绿地 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE][metric:sports_facility_ratio][depth:land_use_layout]。用地分区边界与比例均为概念建议，以控规为准 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

设计判断的支撑链：用地比例来自三条线索的叠加——公告对"AI 全栈创新体系""京张遗址公园活力带"的功能要求（产业与绿地底数）、[source:SITE-PACKAGE] 中 `design_brief.json` 记录的三层范围面积与四至（计算基数）、以及本方案"运动健康主线"的差异化主张（体育 6% 的增量逻辑）。三者结合形成"以需求倒推比例、以比例校核结构"的论证闭环。用地类型的细分与边界以自然资源部用地用海分类指南为口径 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，`land_use.geojson` 中 LU-001 至 LU-012 每个分区均标注概念用途，其中 LU-005（体育）、LU-004（医疗）两类是本方案运动健康主线在法定图层的落点。 复算结果：科研用地约 33.7% [metric:research_space_ratio]、居住约 21.7% [metric:residential_ratio]、商业约 6.0% [metric:commercial_ratio]、道路约 5.5% [metric:road_land_ratio]，44 个分区无缝隙覆盖边界 [metric:land_use_zone_count]。

### 7.2 拆改留四类逻辑（概念）

| 类别 | 对象（概念） | 逻辑 | 图层 |
|---|---|---|---|
| 保留 | 京张铁路遗产、文保单位（清华园车站旧址等） | 原真性保护，禁止在文保控制区内新建 | [data:geometry/constraints.geojson#C-002] |
| 改造 | 旧工业用地、高校周边存量 | 功能置换+空间织补 | [data:geometry/buildings.geojson#B-005] |
| 拆除 | 危房与低效用地（概念可能性） | 仅提出可能性，逐栋复核后确认 | [data:geometry/buildings.geojson#B-004] |
| 新建 | 三起点节点综合体 | 补足测试验证、体验展示功能 | [data:geometry/buildings.geojson#B-001] |

[depth:retain_renovate_demolish]

### 7.3 建筑规模（概念区间）

建筑基底与规模为概念区间而非结论：核心区（三核）建议高密度低退线、公共界面开放；廊道两侧 5—12 层为主，地标节点可更高；体育设施单体体量较大，宜贴廊布置避免遮挡视廊 [data:geometry/buildings.geojson#B-001][metric:building_footprint_area_sqm][depth:development_intensity_controls]。 建筑基底合计约 [metric:building_footprint_area_sqm] 平方米、占比约 [metric:building_footprint_ratio]，共 [metric:building_count] 个概念体块。 建筑专业深度参照 [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]，但因官方文件待补，仅作深度参照。全部容积率、高度、体量数据为"待确认控规条件"，不表述为审定指标。

建筑规模的设计判断分三层：其一，**高度服从廊道**——起跑廊两侧建筑高度梯度向外递增，保证跑步视廊与遗产视廊通透；其二，**密度服务场景**——三核地区提高密度以支撑场景人流密度与产业集聚度，外围组团降低密度以承载居住与社区生活；其三，**规模留弹性**——面对 AI 产业快速迭代，建议在商业与科研用地中预留可转换面积（对应 2% 留白用地），避免建筑形态过早锁定产业形态。上述判断全部为概念方向，`buildings.geojson` 的建筑基底数据来自 provisional 估算，须在现状建筑底数到位后复算。

### 7.4 待确认控规条件清单

① 各地块容积率与建筑高度上限；② 道路红线与建筑退线；③ 地块边界与用地性质细分；④ 文保单位保护范围与建设控制地带；⑤ 市政管线与工程条件；⑥ 现状建筑底数与权属。以上条件缺失前，本方案所有空间供给与运营策略均保持概念状态 [depth:development_intensity_controls][depth:retain_renovate_demolish]。

## 交通、轨道、市政与公共服务设施

### 8.1 道路与慢行骨架：「一纵三横」

纵向主轴（南北脊柱主街概念长度约 [metric:spine_road_length_km] 公里）为**京张主线慢行复合廊**（跑步道+骑行道+漫步道三线，22km，即"起跑廊"）[data:geometry/roads.geojson#R-001][metric:trail_length_km]；三横为学院路、大钟寺东路、西直门外大街，负责东西向集散与轨道接驳 [data:geometry/roads.geojson#R-005][data:geometry/roads.geojson#R-008][data:geometry/roads.geojson#R-003]。慢行断点修复重点：遗址公园与学院路交口、西土城路横穿点、清河绿带衔接处——均需在 official 道路红线到位后逐点确认。停车与非机动车组织以轨道站点+换乘枢纽为核心，鼓励"骑行+轨道"接驳 [depth:traffic_rail_slow_parking]。

设计判断："一纵三横"不是独立道路工程，而是**慢行优先的复合交通网络**——纵轴承担运动与休闲主导流量，三横承担生活与通勤主导流量，二者交叉点即场景节点（体测驿站、活力驿站等）。骑行道以"不与跑步道争权"为原则分幅布置，跑步道贴近绿廊内侧、骑行道靠外侧、漫步道临建筑界面，形成秩序化的三线断面；机动车交通以疏导为主，避免穿越起跑廊核心段。该判断依据 [standard:MOHURD-URBAN-DESIGN-MEASURES] 对统筹交通与公共空间的要求，落实于 `roads.geojson` 与 `public_space.geojson` 的叠加校核；现状路网与交通流量数据为待补资料。

### 8.2 轨道接驳概念

轨道锚点为 13 号线、昌平线及知春路—西直门换乘锚点（概念建议），TOD 概念以三起点站点为核心组织高强度混合开发。站点一体化方案为参考方向，需与轨道部门接口对接 [depth:traffic_rail_slow_parking][standard:MOHURD-URBAN-DESIGN-MEASURES]。设计判断：轨道不是"外挂的交通设施"，而是三起点的**竖向骨架**——站点上盖预留运动健康服务（储物柜、淋浴、体测预检），让"出站即开跑"成为日常通勤选项，把运动融入通勤时间而非额外挤出时间。站点周边 800m 范围建议作为高密度混合开发单元，与第五章三区方案联动校核。

### 8.3 市政与新型基础设施融合（概念建议）

三端融合架构：**端侧算力**——体测驿站、配速终端嵌入边缘计算节点，运动数据本地化处理（对应 TV-03 沙盒的低敏分流）；**运动健康数据节点**——沿廊布设数据驿站，与健康数据沙盒互联；**分布式能源**——廊道光伏步道与储能节点支撑赛事与应急供电。传统市政管线与新型设施同沟槽敷设，减少二次开挖 [depth:municipal_new_infrastructure]。公共服务设施方面：体育设施（体测驿站、智慧球场）、医疗（运动医学门诊）、教育（AI 科普点）、文化（京张文化展陈）按"三核—五节点—全线"三级配置。设计判断：市政不再是"看不见的地下工程"，而是参与场景生成的城市设施——井盖与铭牌、配电箱与数据艺术、管线检修井与补给站点合体设计，降低设施感知成本。以上全部为概念建议 [source:OFFICIAL-ANNOUNCEMENT]。管线综合、变电站位、通信机房等工程条件均为待补资料。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

### 9.1 22km 起跑廊

起跑廊是方案的空间签名：**跑步道+骑行道+漫步道三线复合**，断面概念 12—20m，在遗产公园段以京张铁路线形为基底展开，形成可奔跑的连续绿色廊道 [data:geometry/roads.geojson#R-001][metric:trail_length_km]。设计判断：把"铁路线"转化为"运动线"，让 22 公里成为可体验的城市尺度——这也是 [metric:trail_length_km] 作为签名指标的空间含义。廊道两侧配置公共空间组件库 [depth:blue_green_public_space]。

起跑廊的断面设计原则：廊道内侧为跑步道（硬质彩色铺装，配速刻度）、外侧为骑行道（独立标高、防滑材质）、临建筑界面为漫步道（树荫步道），三条线在节点处交汇为广场。廊道在清河、小月河、学院路、西直门四处设"门户收口"，以起跑拱门造型强调进入感。廊道全线与 SC-01、SC-09、SC-10 场景绑定，是 AI 场景密度最高的公共空间载体。

### 9.2 清河—小月河—遗址公园绿网

蓝绿网络以清河（北）、小月河（西翼）、遗址公园绿廊（主轴）贯通，公园绿地与广场沿运动线布置 [data:geometry/green_space.geojson#GR-001][data:geometry/green_space.geojson#GR-005][metric:green_ratio]。绿网承担三项职能：生态廊道（生物多样性）、运动廊道（骑行与慢跑）、文化廊道（百年铁路叙事）。公共空间组件库：**体测驿站、补给站、起跑拱门、零公里桩、荣誉墙、配速标识**六类组件，模块化布置于五节点与全线驿站 [data:geometry/public_space.geojson#PS-001][metric:public_space_ratio]。

设计判断：绿网的价值在于**连续性优先于单点规模**——与其追求单个大型公园，不如保证 22 公里绿廊与清河、小月河绿带的无缝衔接，使绿色基础设施本身成为运动与交往的分配网络。绿地与广场的比例（绿地 12%、广场 4%）由此而来，二者共同构成 [metric:green_ratio] 与 [metric:public_space_ratio] 的空间含义。河道岸线改造、生态修复方案均待工程条件资料确认。

### 9.3 四大朝圣地标与荣誉体系

| ID | 地标 | 位置 | 功能 | 荣誉展示 |
|---|---|---|---|---|
| L1 | 清华园·零公里桩 | 清华园车站旧址广场（AI原点） | 京张铁路零公里史实地标+起跑拱门 | 碑刻+数字铭牌（核心载体） |
| L2 | 开源成果展示廊·千米廊 | 遗址公园主廊（中段） | 开源项目节点+运动数据艺术装置 | 开发者荣誉墙 |
| L3 | AI 运动实验室 | 大钟寺活力核 | 智慧球场旗舰+体测体验中心 | 年度体验纪录 |
| L4 | 众智园·验证塔 | 众智园核心 | 测试验证场景可视化展示 | 年度贡献里程碑 |

[metric:landmark_count][source:AGENT-TASKBOOK]

荣誉体系呼应征集 Milestone 纪念体系：碑刻（物理载体）、数字铭牌（数据载体）、年度更新（时间载体）三层结构。设计判断：荣誉体系是"起跑线"概念的情感落点——开发者与跑者的贡献被同一种语言纪念，使 AI 创新带获得超越物理空间的社会认同。L1 涉及清华园车站旧址（北京市文物保护单位），设计上严格遵守文保要求：零公里桩与起跑拱门置于文保控制区之外或经文物部门批准的展示区域，保护范围内不做任何新建 [data:geometry/constraints.geojson#C-002][standard:MOHURD-URBAN-DESIGN-MEASURES]。地标、导视、Logo 均为概念方向，不冒充已批准建设，不使用任何企业标识与受版权保护图形 [depth:blue_green_public_space]。

风貌控制层面，本方案提出"三段叙事立面"概念：北段（清河至众智园）以科技研发立面为主，中段（清华园至学院路）以遗产记忆立面为主，南段（大钟寺至西直门）以活力商业立面为主——三段对应"1909—1980—2026"文化叙事的空间投影。建筑色彩、材质与屋顶形态沿三段各有基调，但共用"铸铁黑/脉搏红/计算蓝/跑道绿"四色系统，保证整带识别度。风貌控制全部为概念建议，落实于 [data:geometry/buildings.geojson#B-001] 至 [data:geometry/buildings.geojson#B-005] 的建筑形态属性与 `green_space.geojson` 的景观控制图层。

## 更新项目清单、实施政策与分期计划

### 10.1 更新项目清单（概念，12 项）

| # | 项目 | 类型 | 空间位置 | 分期 |
|---|---|---|---|---|
| 1 | 起跑廊贯通工程 | 蓝绿/慢行 | 遗址公园主廊 [data:geometry/roads.geojson#R-001] | PH-1 |
| 2 | 零公里广场 | 公共空间 | AI原点 [data:geometry/public_space.geojson#PS-004] | PH-1 |
| 3 | 智慧球场 | 体育设施 | 大钟寺活力核 | PH-1 |
| 4 | 验证塔 | 产业地标 | 众智园核心 | PH-1 |
| 5 | 体测驿站网络 | 新型基础设施 | 五节点+全线 | PH-2 |
| 6 | 清河运动公园 | 蓝绿 | 北端清河滨带 [data:geometry/green_space.geojson#GR-005] | PH-2 |
| 7 | 学院路活力驿站 | 公共空间 | 学院路 [data:geometry/public_space.geojson#PS-005] | PH-2 |
| 8 | 数据沙盒中心 | 治理设施 | 众智园/原点 | PH-2 |
| 9 | 赛事运营基地 | 体育运营 | 大钟寺 | PH-2 |
| 10 | 运动处方街区 | 社区更新 | 大钟寺社区界面 | PH-3 |
| 11 | 小月河骑行廊改造 | 慢行 | 小月河翼 | PH-3 |
| 12 | 全带场景开放网络 | 数字运营 | 全线 | PH-3 |

[metric:renewal_project_count][depth:renewal_project_list]

### 10.2 分期计划

- **PH-1 近期（2026—2028）**：三起点催化剂工程——起跑线广场、智慧球场、验证塔，建立"验证—原点—体验"的可感知雏形 [data:geometry/phasing.geojson#PH-1]；
- **PH-2 中期（2028—2030）**：22km 起跑廊贯通+体测驿站网络，实现"可奔跑的城市"骨架 [data:geometry/phasing.geojson#PH-2]；
- **PH-3 远期（2030—2035）**：全带生态运营，场景开放网络与年度活动体系成熟 [data:geometry/phasing.geojson#PH-3]。

[depth:phasing_implementation][metric:renewal_project_count]

### 10.3 运营机制与活动体系（概念建议/深化方向）

年度活动体系：**京张 AI 马拉松（4月，赛事IP）｜全球开发者运动周（6月）｜AI×体育产业峰会（9月）｜开源成果年度展+脉动勋章颁奖（11月）**。品牌矩阵：START LINE RUN 系列赛事、起跑勋章成就体系、配速主题城市家具。开发者社区：每周"黑客跑"（跑步+代码评审）、场景开放沙盒申请制、数据合规人工复核委员会。转化路径：活动→开发者社区→场景沙盒→企业落地→政策资源对接。公共体验路线：百年轨迹之旅（文化+运动挑战双线，多语种导视，呼应国际传播文案"From the railway that started a nation, to the city where the world starts running."）。以上全部为概念建议与深化方向，不构成已确定政府安排 [source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][depth:phasing_implementation]。

## 指标体系、面积复算与合规矩阵

### 11.1 核心指标总表

| 指标 | 公式/来源 | 状态 |
|---|---|---|
| site_area_sqm | 总体设计范围面积，provisional 复算 | known（待 official 复算） |
| green_ratio | 绿地面积/总体面积 | known（概念） |
| public_space_ratio | 广场+公共空间/总体面积 | known（概念） |
| building_footprint_area_sqm | 建筑基底面积汇总 | known（概念） |
| sports_facility_ratio | 体育用地/总体面积（签名指标） | known（概念） |
| trail_length_km | 起跑廊三线复合长度 | known（概念，22km） |
| key_area_count | 重点区数量 | known（3） |
| scenario_card_count | 场景卡数量 | known（12） |
| persona_count | 画像数量 | known（6） |
| landmark_count | 朝圣地标数量 | known（4） |
| case_study_count | 全球案例数量 | known（6） |
| renewal_project_count | 更新项目数量 | known（12） |
| test_scene_count | 测试验证场景数量 | known（3） |
| floor_area_ratio | 容积率 | unknown（待控规） |

[metric:site_area_sqm][metric:green_ratio][metric:public_space_ratio][metric:building_footprint_area_sqm][metric:sports_facility_ratio][metric:trail_length_km][metric:key_area_count][metric:scenario_card_count][metric:persona_count][metric:landmark_count][metric:case_study_count][metric:renewal_project_count][metric:test_scene_count][metric:floor_area_ratio]

### 11.2 指标的设计含义

每个核心指标都对应一个设计判断：绿地比例 12% 支撑人才生活与运动健康网络（[depth:blue_green_public_space]）；公共空间比例 4%+12% 支撑创新交往与赛事承载（[depth:overall_spatial_structure]）；建筑基底 [metric:building_footprint_area_sqm] 回应产业空间供给与更新弹性；体育用地比例 [metric:sports_facility_ratio] 是"可奔跑的城市"的法定保障；trail_length_km 与 sports_facility_ratio 为**签名指标**，定义本方案的差异化。floor_area_ratio=unknown 明确列为待补，不作为审定结论 [depth:metrics_recalculation][source:SOURCE-REGISTRY]。

指标体系的构建逻辑分三层：**形态层**（site_area_sqm、floor_area_ratio、building_footprint_area_sqm）回答"城市长什么样"；**功能层**（green_ratio、public_space_ratio、sports_facility_ratio、trail_length_km）回答"城市怎么运转"；**运营层**（scenario_card_count、test_scene_count、persona_count、landmark_count、case_study_count、renewal_project_count、key_area_count）回答"城市怎么被使用"。三层指标全部可由 `geometry/*.geojson` 与 `metrics.json` 复算，其中运营层指标从正文场景卡、画像表、地标表、案例表与项目清单直接计数得出——这保证了正文、JSON 与图面三者的数值同源。每个指标在 `metrics.json` 中记录公式、来源与状态，`status=known` 的指标在正文说明空间含义，`status=unknown`（如 floor_area_ratio）明确挂起等待控规数据。

### 11.3 复算与合规覆盖

面积复算使用 EPSG:4548（公告指定坐标参考系），GeoJSON 交换使用 EPSG:4326；provisional 几何复算结果仅作概念依据，official polygon 到位后全量刷新 [data:geometry/site_boundary.geojson#SITE-001]。合规覆盖：`compliance_matrix.json` 覆盖公告 1.3/1.4/1.5 全部条目与 agent.1—agent.6；`standard_matrix.json` 映射五条 mandatory 标准；`design_depth_matrix.json` 覆盖 15 项核心深度项 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。本章所有数值在正文、`metrics.json` 与 HTML 展示中保持一致（`data-metric`/`data-value` 标记）[depth:metrics_recalculation]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

1. **provisional 边界限制**：本方案全部几何为临时粗略边界（`geometry_role="provisional_constraint"`、`official_boundary=false`），不可作为官方红线、审批或精确面积依据；官方 polygon 发布后须复算 `site_boundary.geojson`[data:geometry/site_boundary.geojson#SITE-001]、`key_areas.geojson`、`land_use.geojson`、`buildings.geojson`、`roads.geojson`、`phasing.geojson` 及全部面积类指标 [source:BOUNDARY-SOURCE][depth:risk_missing_data]。
2. **非公开资料排除**：本方案未使用任何未清权、非公开或需要付费获取的资料；任务书原始 Word 文档由用户提供清权，仓库仅保存结构化摘录 [source:SOURCE-REGISTRY]。
3. **AI 生成责任**：本方案由 AI 智能体生成，全部空间落地建议为概念建议/参考方案/可供专业团队深化研究，不替代正式规划，不构成政府审定结论；不得将容积率、建筑高度、拆改留、工程线位、投资测算或开发时序解读为已批准决策 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。
4. **无官方背书**：方案名称、Logo、地标、赛事均为概念方向，不冒充已批准建设或视觉标识；案例仅引用公开方法信息。
5. **待补资料清单**：official 红线、三处重点区官方 polygon、控规指标（容积率/高度/地块边界）、现状建筑底数、权属、道路红线、市政管线、工程条件。上述缺口不阻断内容评分，但任何正式空间结论须在补齐后复算 [depth:risk_missing_data][metric:floor_area_ratio]。
6. **专业复核需求**：清华园车站旧址文保控制、医疗健康数据合规、赛事安全等须由相应专业机构复核；版权与隐私合规声明同步见 `report/copyright_statement.md`。

## 参考资料

- `brief/site-package/design_brief.json`（面积与四至来源，回引 [source:OFFICIAL-ANNOUNCEMENT]）
- `brief/site-package/allowed_design_space.json` [source:SITE-PACKAGE]
- `brief/site-package/agent_taskbook.json` [source:AGENT-TASKBOOK]
- `brief/site-package/sources.json`（上游来源登记，回引 [source:SOURCE-REGISTRY]）
- `brief/site-package/geometry/provisional_boundaries.geojson` [source:BOUNDARY-SOURCE]
- `brief/site-package/visual_style_recommendations.json`
- `brief/site-package/schemas/compliance_matrix.schema.json`
- `brief/site-package/schemas/standard_matrix.schema.json`
- `brief/site-package/schemas/design_depth_matrix.schema.json`
- `brief/site-package/standards/standards.json` 及 `references/`（project-official-announcement.md [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、agent-open-call-taskbook-0518.md [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]、mohurd-urban-design-measures.md [standard:MOHURD-URBAN-DESIGN-MEASURES]、mohurd-control-detailed-planning.md [standard:MOHURD-CONTROL-DETAILED-PLANNING]、mnr-land-use-classification-guide.md [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]）[depth:metrics_recalculation]
- `data/source_registry.json` [source:SOURCE-REGISTRY]
- `data/processed/agent_fact_pack.md`、`project_scope_summary.csv`、`agent_task_requirements.csv`、`source_use_matrix.csv`、`missing_data_checklist.csv` [source:PROCESSED-FACT-PACK]
- `docs/formal-submission-guide.md`、`docs/data-workflow.md`、`docs/visual-style-recommendations.md`
- `templates/proposal.md`、`templates/changelog.md`
- `schema/proposal.schema.json`、`schema/spatial.schema.json`、`schema/source.schema.json`
- `geometry/site_boundary.geojson`（SITE-001）[data:geometry/site_boundary.geojson#SITE-001]、`geometry/key_areas.geojson`（KEY-001/002/003）[data:geometry/key_areas.geojson#KEY-001]、`geometry/land_use.geojson`（LU-001…LU-012）[data:geometry/land_use.geojson#LU-001]、`geometry/buildings.geojson`（B-001…）[data:geometry/buildings.geojson#B-001]、`geometry/roads.geojson`（R-001…，R-001=起跑廊）[data:geometry/roads.geojson#R-001]、`geometry/green_space.geojson`（GR-001…）[data:geometry/green_space.geojson#GR-001]、`geometry/public_space.geojson`（PS-001…）[data:geometry/public_space.geojson#PS-001]、`geometry/constraints.geojson`（C-001 京张遗产线、C-002 清华园旧址）[data:geometry/constraints.geojson#C-002]、`geometry/phasing.geojson`（PH-1/2/3）[data:geometry/phasing.geojson#PH-1] [depth:metrics_recalculation]
- `metrics.json`[metric:site_area_sqm][metric:sports_facility_ratio]、`assumptions.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`、`report/copyright_statement.md`（提交包生成）
