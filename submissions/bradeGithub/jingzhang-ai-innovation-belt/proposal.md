---
title: "原点引擎——百年京张AI创新带城市设计概念方案"
author_github: "bradeGithub"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以“原点引擎”为总体概念，依托京张铁路遗址公园构筑南北贯通活力轴，串联众智园AI自主创新加速区、北京AI原点社区与大钟寺AI产业集聚区三大重点区，形成一轴三核两翼、东西缝合、南北贯通的AI融合创新城市形态。"
tracks: ["jingzhang-heritage-narrative"]
scenarios: ["ai-cultural-guide"]
iteration: "v1.1"
---

# 原点引擎——百年京张AI创新带城市设计概念方案

## 一页执行摘要

| 评审问题 | 本方案的可读回答 | 首要核验入口 |
| --- | --- | --- |
| 任务书相关性 | 以"原点引擎"呼应三大定位与五大功能；三层范围、三区两翼与 agent.1-6 由"一轴三核两翼"同一链条落位；区域协同为概念接口，不写成合作承诺 | compliance_matrix.json、三层正文 |
| 原创性 | 把京张铁路百年之原与中关村AI之原合为同一动力轴；12张场景卡、4个朝圣地标与原点季运营形成可复核闭环 | 统筹研究章节、design_depth_matrix.json |
| AI 与规划创新 | AI场景均绑定空间节点、隐私边界、人工复核与非AI兜底；不替代规划、医疗、法律裁决 | AI场景章节、standard_matrix.json |
| 可实施性 | 三期实施 + 首个90天低后悔路径：先公共空间与普通服务基座，再受控测试，后扩展；每步有停止与退回 | phasing.geojson、实施章节 |
| 公共利益 | 五类画像均保留纸面、人工、无账号路径；银发群体无障碍服务亭设人工兜底 | 画像表、无障碍标准响应 |
| 风险与合规 | provisional边界与缺失控规指标不升级为官方红线或审批结论；全部空间建议为概念建议 | sources.json、assumptions.json、风险章节 |
| 表达完整度 | 中文主稿+英文译稿、五张评审图、A3/A0图纸、离线HTML、可复算指标与三矩阵同一口径 | manifest.json、metrics.json |

以上每项回答均可回到结构化文件复核：正文为主方案，机器证据见 GeoJSON、矩阵与自检结果 [source:SOURCE-REGISTRY] [depth:metrics_recalculation]。

## 设计依据与资料清单

本方案为面向"百年京张AI创新带城市设计国际方案征集"的AI智能体概念方案，属于开放共创建议，不替代正式规划，不构成政府审定结论 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]。所有空间落地建议均为概念建议、参考方案，可供专业团队深化研究；容积率、建筑高度、拆改留、道路红线等法定规划判断一律按"待正式数据补齐"处理，不作结论 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

设计依据包括四类：

- **官方公告与任务书**：资格预审公告（2026-05-09，北京市规划和自然资源委员会海淀分局）给出的项目名称、三层范围、面积值、三处重点区和设计任务；面向智能体开源征集任务书（2026-05-18）给出的三大定位、五大功能、三区两翼、六项必答任务和共创原则 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]。

- **专业标准**：住建部《城市设计管理办法》、控规编制办法、自然资源部用地分类指南、无障碍环境建设法、生成式人工智能服务管理暂行办法等本地快照 [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:BARRIER-FREE-ENVIRONMENT-LAW] [standard:GENERATIVE-AI-INTERIM-MEASURES]。

- **空间数据**：仓库维护的临时粗略边界 polygon（三层范围 + 三处重点区），按公告文字四至和面积约束在 EPSG:4548 下校核；标注为 `provisional_constraint`，不作为官方红线、审批依据或精确面积复算依据 [data:geometry/site_boundary.geojson#SITE-001] [source:BOUNDARY-SOURCE]。

- **衍生设计数据**：本方案基于临时边界生成的用地分区、建筑基底、路网、蓝绿空间、分期等设计图层，均可在 `geometry/*.geojson` 与 `metrics.json` 中复算 [depth:land_use_layout] [depth:metrics_recalculation]。

官方 polygon、控规指标、现状建筑与权属、文保线、道路红线等尚未在资料包中公开，作为数据缺口列入假设与风险章节，不阻碍内容评分，但精确面积和专业评分待官方数据补齐 [source:PROCESSED-FACT-PACK] [assumption:A-BOUNDARY-001]。

本方案先判断"资料能支持什么"，再判断"空间可以怎么设计"；每一类证据只承担与其权威程度相称的作用，不因登记完整而升级用途边界。

| 证据层级 | 本方案实例 | 可以支持 | 不能支持 |
| --- | --- | --- | --- |
| 任务与专业标准（formal） | 官方公告、清权任务书、规划与控规标准快照 | 任务要求、成果深度、专业原则与评审问题 | official polygon、权属、工程条件、审批或政府承诺 |
| 已清权来源登记 | `sources.json`、`data/source_registry.json` | 来源用途、机制对照、资料责任与禁用范围 | 把背景资料升级为海淀实施事实或空间结论 |
| 临时空间依据（provisional） | `site_boundary.geojson`、`key_areas.geojson`、`constraints.geojson` | 概念生成、拓扑自检、相对关系与官方数据替换触发器 | 法定红线、地块权属、精确面积、道路红线或控规指标 |
| 包内派生设计数据 | GeoJSON、`metrics.json`、三矩阵与自检 | 可复算的概念结构、数量关系、节点动作与分期依赖 | 现状测绘、设施容量、现场性能、居民接受度或建设许可 |

评审判定规则：formal 结论必须回到 formal 来源；provisional 与背景资料只能保留原状态，任何自检 PASS 不把本地校验变成现场证据、专业签章或审定结论 [source:SOURCE-REGISTRY] [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

本方案采用公告给定的三层工作框架，逐级落实产业战略、总体城市设计与重点片区详细设计 [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]：

1. **统筹研究范围（43.6 km²）**：北至北五环路、东至京藏高速、南至西直门外大街、西至万泉河路。研究AI产业生态、三区两翼区域协同、未来城市形态与全球创新网络；成果为产业地图、生态图谱与协同回路，不进法定图纸 [metric:coordinated_research_area_sqm]。

2. **总体设计范围（11.4 km²）**：本方案提交的 `site_boundary.geojson` 即此范围，按公告文字四至（北五环、学院路/西土城路、西直门外大街、大钟寺东路/荷清路）与约11.4 km²面积约束形成临时粗略边界 [data:geometry/site_boundary.geojson#SITE-001]。在此开展用地布局、更新框架、交通市政、蓝绿系统与风貌控制，达到控规深度城市设计的概念层次 [depth:overall_spatial_structure] [metric:site_area_sqm]。

3. **重点区域范围（368.4 ha）**：自北向南为众智园AI自主创新加速区、北京AI原点社区、大钟寺AI产业集聚区，本方案对三区逐一展开"定位+空间结构+建筑更新+交通慢行+公共空间+AI场景+实施风险"的详细设计 [metric:key_detailed_design_area_sqm] [metric:key_area_count] [depth:three_key_area_detailed_design]。三区面积分别见 [metric:zhongzhiyuan_ai_acceleration_area_sqm] [metric:beijing_ai_origin_community_sqm] [metric:dazhongsi_ai_industry_cluster_sqm]。

临时边界仅用于AI生成、可视化与讨论，不用于官方红线、审批与精确面积；官方 polygon 到位后，用地分区、建筑基底、指标与图件全部重算 [assumption:A-BOUNDARY-001]。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

### 总体概念："原点引擎"（Origin Engine）

百年京张铁路是中国自主设计建造的第一条铁路干线，是"中国近代工业之原"；中关村是中国高科技产业和人工智能的策源地，是"中国AI之原"。本方案以"原点引擎"为一带总体概念——**京张为原、AI为引擎**，主张百年京张的文化原点和中关村的创新原点在一条12公里长的城市带上叠加、互激，把铁路遗产的线性历史结构转化为AI时代的创新动力轴 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]。

- **主名称**：原点引擎 / Origin Engine（概念名，供主办方与专业团队评选）。
- **命名体系**：一带一名 "Origin Engine"，三区两翼采用 "Origin-X" 序列——众智园"Origin-Stack"（全栈）、AI原点社区"Origin-Core"（内核）、大钟寺"Origin-City"（城市级新业态）、中关村科技服务翼"Origin-Finance"（要素）、小月河场景赋能翼"Origin-Lab"（场景试验） [depth:brand_identity]。
- **Logo方向**：以京张铁路钢轨的"人"字形展线演化为两条平行轨线，中间以电路信号波形连接，形成"轨道×波形"组合标识；颜色采用铁路钢青灰与AI电光蓝的双色系统，延展为导视、地面铺装与公共家具模数 [depth:signage_system_direction]。

![Logo方向概念图（AI生成概念稿）](assets/figures/logo-direction.png)

### 三大定位与五大功能

三大定位：**百年京张文化带、都市AI生活体验带、AI融合创新带**；五大功能：**AI全栈自主创新体系、世界级AI创新生态、AI+场景赋能新范式、智能化AI活力城市、AI治理全球话语权**。五功能在三区两翼上分别有空间载体与运营机制（见重点区与运营章节） [source:AGENT-TASKBOOK]。

### 三区两翼协同回路

以京张遗址公园活力带为南北主轴，三处重点区为引擎节点，中关村科技服务翼（要素全球化配置、中关村IP与资本）与小月河场景赋能翼（AI场景与活力城市）为两翼支撑，形成"**原点—加速—集聚**"的产业递进回路与"**资本—场景—人才**"的要素回路 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]。

### 全球AI创新生态案例（5-8个）

1. **硅谷帕洛阿尔托（Palo Alto）**：大学-资本-人才的共生网络，启示高校与社区的无缝创新界面。
2. **英国剑桥科技园（Cambridge Science Park）**：大学实验室到企业孵化的走廊模式，启示"教育用地—科研用地—产业用地"的连续光谱。
3. **新加坡纬壹科技城（one-north）**：混合用地、步行可达、全天候活力街区，启示"工作+生活+交往"一体的公共空间密度。
4. **韩国板桥科技谷（Pangyo Techno Valley）**：政府引导的研发集群与测试环境协同，启示"测试验证场景"的制度化空间。
5. **美国奥斯汀（Austin, TX）**：文化节庆与科技人才吸引的结合，启示"活动体系即城市品牌"。
6. **深圳湾科技生态园**：产业园区向城市公共空间复合开放，启示园区界面的城市化。
7. **东京丸之内（Marunouchi）**：百年街区持续更新的运营机制，启示长期品牌资产与业主协同。
8. **上海西岸AI聚集区**：文化带与科创带并行的滨水更新，启示文化叙事与产业载体的耦合。

以上案例均来自公开知识，作为参考摘要用于设计推导，不作为投资或政策事实 [source:AGENT-TASKBOOK] [assumption:A-ECONOMIC-001]。

### 任务书→空间→验收物对照

六项智能体任务均落到"空间-运营-验收物"同一条链上，评审者可按行核验，而不是只读口号 [source:AGENT-TASKBOOK]。

| 任务书要求 | 本方案的空间—运营翻译 | 首期可验收物 |
| --- | --- | --- |
| agent.1 总体概念与功能统筹 | 原点引擎命名体系、Origin-X序列、轨道×波形Logo方向、一轴三核两翼结构 | 命名表、Logo概念图、总体结构图 |
| agent.2 全栈体系与创新生态 | 5-8个全球案例、六要素生态图谱、众智园全栈研发、中关村科技服务翼机制 | 案例表、生态图谱、产业空间映射 |
| agent.3 场景赋能与活力城市 | 12张场景卡、5类画像、场景-空间-运营矩阵、小月河场景翼 | 场景协议表、画像表、场景矩阵 |
| agent.4 公共空间与新业态 | 4个AI朝圣地标、公共空间组件、大钟寺智能原生消费 | 地标目录、公共节点图层、组件库 |
| agent.5 文化叙事 | 原点叙事串联百年京张、中关村与AI新文化；导视符号系统 | 文化叙事章节、导视方向、国际传播句 |
| agent.6 活动体系与长期运营 | 原点季四季活动、原点开发者俱乐部、场景开放"先试后转" | 活动体系、运营机制、转化路径 |

## 总体设计范围城市更新与控规深度城市设计

### 总体空间结构："一轴三核两翼，东西缝合、南北贯通"

- **一轴**：京张遗址公园活力带（南北主轴），由 `green_space.geojson` 表达，串联三核并承载慢行、蓝绿、文化展示与AI体验功能 [data:geometry/green_space.geojson#GREEN-001] [metric:green_ratio]。
- **三核**：众智园（北）、AI原点社区（中）、大钟寺（南），由 `key_areas.geojson` 表达 [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]。
- **两翼**：中关村科技服务翼（东，学院路沿线科创走廊）、小月河场景赋能翼（西，小月河滨水场景带）。
- **缝合贯通**：以公园带缝合京张铁路东西两侧城市，以南北向绿道+慢行系统贯通五道口至大钟寺，实现"东西缝合、南北贯通" [standard:MOHURD-URBAN-DESIGN-MEASURES]。

### 用地布局

用地分区由 `land_use.geojson` 拓扑分区得出（无缝隙、无重叠，union面积11,412,847 m² vs 场地11,412,825 m²）[data:geometry/land_use.geojson] [metric:land_use_total_area_sqm]：

| 用地代码 | 用途 | 面积（m²） | 占比 | 设计逻辑 |
|---|---|---|---|---|
| 1401 | 公园绿地（京张活力带） | 1,991,800 | 17.5% | 主轴线与缝合媒介 |
| 1402 | 防护绿地 | 136,108 | 1.2% | 北部门户绿楔 |
| 0802 | 科研用地（AI研发） | 3,355,987 | 29.4% | 三核产业主体 |
| 0804 | 教育用地 | 998,923 | 8.8% | 学院路高校走廊 |
| 05 | 商业服务业用地 | 2,078,777 | 18.2% | 大钟寺智能原生新业态 |
| 0701 | 城镇住宅用地 | 1,749,152 | 15.3% | 宜居社区与人才社区 |
| 0702 | 社区服务设施用地 | 1,102,095 | 9.7% | 15分钟生活圈配套 |

用地布局逻辑：**绿地主轴优先**（保证活力带连续贯通）、**产业沿轴集聚**（科研沿绿轴东侧展开，商业向南核集中）、**教育走廊保留强化**（学院路高校带）、**居住社区嵌入绿网**（西缘与东缘社区步行5分钟可达公园带）[depth:land_use_layout] [standard:MNR-LAND-USE-CLASSIFICATION]。

### 建筑规模与拆改留逻辑

- 建筑基底共262个街区级概念块，总基底面积1,070,482 m²，作为产业街区、社区与站点综合体的示意性布局 [data:geometry/buildings.geojson] [metric:building_footprint_area_sqm]。
- **拆改留原则（方向性概念）**：优先保留高校、科研院所、轨道交通站点与历史建筑；沿公园带两侧以"微更新+功能置换"为主；仅对低效产业空间与断头地块提出"改造升级"建议；任何地块级拆改留结论须以官方现状调查为准 [assumption:A-EXISTING-001]。
- 容积率、建筑高度等法定指标缺失，列为待确认事项，不给出数值结论 [metric:floor_area_ratio] [metric:building_height_m] [assumption:A-CONTROLS-001]。

### 城市更新框架与实施政策（概念建议）

更新对象分为三类：**产业功能更新**（科研用地内的低效楼宇功能置换）、**公共空间更新**（公园带节点、广场与慢行断点连通）、**社区品质更新**（老旧小区补公共服务设施）。政策建议包括更新项目清单管理、公共空间优先征询、AI场景先试后转等机制，均表述为深化方向，不构成已确定安排 [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:renewal_project_list]。

## 重点区域详细设计

### 1. 众智园AI自主创新加速区（北部，约192.1 ha）

- **定位**：AI全栈自主创新体系与AI治理全球话语权的核心承载区 [source:AGENT-TASKBOOK]。
- **空间结构**：以清河滨水绿楔为北界，形成"全栈创新核+测试场+青年社区"三组团，沿南北轴布置开放研发街区 [data:geometry/key_areas.geojson#PROV-KEY-001]。
- **建筑更新**：科研用地为主，概念基底沿绿轴东侧布置；建议保留既有科研院所与厂房轮廓，置换为全栈研发、算力服务与测试实验室 [depth:retain_renovate_demolish]。
- **交通慢行**：依托五环南侧联络线与清河绿道形成TOD慢行环 [data:geometry/roads.geojson#ROAD-004]。
- **AI场景**：全栈自主创新展示中心、AI治理实验室、开源大模型测试验证场（测试场景之一，见场景卡）。
- **实施风险**：清河滨水蓝线与防洪、五环交通影响需官方图件确认 [assumption:A-EXISTING-001]。

### 2. 北京AI原点社区（中部，约104.3 ha）

- **定位**：世界级AI创新生态的"内核社区"，五道口创新交往中心 [source:AGENT-TASKBOOK]。
- **空间结构**：以"原点广场"为心，形成"社区客厅+研发里坊+人才公寓+高校界面"四圈层 [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/public_space.geojson#PUBLIC-002]。
- **建筑更新**：以功能置换和立面微更新为主，保留高校周边既有肌理，增加24小时开放的首层创新界面。
- **交通慢行**：北四环联络线与慢行主廊道在此交汇，形成步行优先的"无车广场"概念 [data:geometry/roads.geojson#ROAD-006] [data:geometry/roads.geojson#ROAD-003]。
- **AI场景**：AI开发者之家、开源社区驿站、AI+教育实验室、AI人才服务港（见场景卡）。
- **实施风险**：高校权属与老社区更新协调复杂，需多主体协同与现状权属调查 [assumption:A-EXISTING-001]。

### 3. 大钟寺AI产业集聚区（南部，约72.0 ha）

- **定位**：智能原生新业态与AI消费商务目的地 [source:AGENT-TASKBOOK]。
- **空间结构**：以轨道交通大钟寺站为核，形成"站城一体商业核+AI消费街区+商务服务带" [data:geometry/key_areas.geojson#PROV-KEY-003]。
- **建筑更新**：商业服务业用地为主，概念上支持站点上盖与存量商业改造为"AI原生商业实验场"。
- **交通慢行**：知春路服务带与公园带南端在此交汇 [data:geometry/roads.geojson#ROAD-005]。
- **AI场景**：AI原生消费街区、机器人服务驿站、自动驾驶接驳测试场（测试场景之一，见场景卡）。
- **实施风险**：轨道站点一体化与既有商业权属改造需工程与权属论证 [assumption:A-CONTROLS-001]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

### 创新生态图谱（概念）

围绕"**数据—算法—算力—场景—人才—资本**"六要素构建生态图谱：数据（开源与公共数据专区）、算法（模型与开源社区）、算力（端侧与分布式算力节点）、场景（测试验证场景与AI场景卡）、人才（五类画像与人才服务港）、资本（中关村科技服务翼的投融资机制），在 `visual/index.html` 中以网络图表达 [source:AGENT-TASKBOOK] [depth:industry_space_mapping]。

### 五类用户画像

1. **AI研究者/开发者**：追求开源社区、算力、测试环境的青年科技人才。
2. **AI创业者/企业家**：需要孵化、资本、场景试验与国际化通道。
3. **高校师生**：需要教学科研与产业的无缝界面。
4. **周边居民与银发群体**：需要无障碍、人工兜底的公共服务与生活便利 [standard:BARRIER-FREE-ENVIRONMENT-LAW]。
5. **全球访客/国际人才**：需要文化叙事、活动体系与国际服务。

### 12张AI场景卡（含3张产业测试验证场景）

| # | 场景卡 | 位置 | 服务对象 | 数据与隐私边界 | 人工复核 | 运营主体建议 |
|---|---|---|---|---|---|---|
| 1 | 开源大模型测试验证场（产业测试） | 众智园 | 开发者/机构 | 脱敏公开数据；测试数据不出境 | 测试委员会复核 | 联合实验室 |
| 2 | 自动驾驶接驳测试场（产业测试） | 大钟寺至原点社区 | 运营商/居民 | 车载数据最小化；全程可关停 | 交管+运营双复核 | 测试运营联盟 |
| 3 | AI+医疗辅助诊断体验（产业测试） | 原点社区健康站 | 居民/医患 | 患者数据不出院区；需知情同意 | 执业医师复核 | 医院+企业联合体 |
| 4 | AI+教育个性化学习舱 | 高校界面 | 师生 | 学习数据本地化；家长可查询 | 教师确认 | 高校+企业 |
| 5 | AI+法律公共咨询亭 | 社区服务设施 | 居民 | 匿名化咨询；不存储个人信息 | 执业律师复核 | 司法所+律所 |
| 6 | AI+生活服务机器人驿站 | 大钟寺街区 | 居民/游客 | 视觉数据即时模糊处理 | 物业人工值守 | 物业+机器人服务商 |
| 7 | 无人配送与仓储微节点 | 众智园与社区 | 居民 | 路径数据脱敏 | 快递员兜底 | 配送平台 |
| 8 | AI城市大脑展示舱 | 原点广场 | 公众 | 仅展示聚合指标 | 运维人工审核 | 城市运营平台 |
| 9 | AI+文化导览（京张叙事） | 公园活力带 | 游客 | 位置数据即时弃用 | 内容审核 | 文旅公司 |
| 10 | AI无障碍服务亭（银发） | 全带公共节点 | 银发群体 | 无身份采集；语音优先 [standard:BARRIER-FREE-ENVIRONMENT-LAW] | 现场人工兜底 [standard:ELDERLY-SMART-TECH-PLAN] | 社区+志愿组织 |
| 11 | AI治理实验室与听证模拟 | 众智园 | 公众/机构 | 模拟数据；结论不具效力 | 治理委员会 | 高校+政府智库 |
| 12 | AI+运动健康监测跑道 | 小月河场景翼 | 居民/运动员 | 运动数据匿名聚合 | 运营巡检 | 体育运营方 |

所有场景卡遵循生成式AI服务合规底线：生成内容可溯源、违规内容及时处置、建立投诉渠道；不采集个人隐私、不搞过度监控、未经成熟验证的技术不表述为全面部署 [standard:GENERATIVE-AI-INTERIM-MEASURES] [assumption:A-AI-001]。场景-空间-运营映射见 `visual/index.html` 场景矩阵。

### 3个产业测试验证场景运行协议

三张产业测试卡升级为可暂停、可复现、可退出的运行协议：每项测试都绑定非AI对照路径、唯一主指标与不得协商的停止条件，当前均为概念协议、未执行，不代表已获批运营 [standard:GENERATIVE-AI-INTERIM-MEASURES]。

| 测试场景 | 同任务非AI对照 | 唯一主指标 | 不得协商的停止条件 | 当前状态 |
| --- | --- | --- | --- | --- |
| 开源大模型测试验证场 | 人工评审组对同一冻结问题集 | 有来源且边界正确的输出数 / 冻结问题数 | 输出无来源结论、数据越界或人工接管不可用即停止 | 概念协议，未执行 |
| 自动驾驶接驳测试场 | 同路线人工接驳或静态指引 | 无碰撞、无越界且可急停的任务数 / 获批受控任务数 | 任一碰撞、越界、急停失效或接管链断裂即停止 | 概念协议，未执行 |
| AI+医疗辅助诊断体验 | 同症状的人工分诊路径 | 建议与执业医师结论一致数 / 测试案例数 | 任何误诊信号、知情同意缺失或医师复核不可用即停止 | 概念协议，未执行 |

协议同时要求：测试前锁定非AI基线、时间窗、受影响人群与采样框；测试中保留纸面与人工等价路径；测试后公开版本、来源、限制与停止记录。任一关键条件缺失即回到普通服务，不进入扩容 [standard:BARRIER-FREE-ENVIRONMENT-LAW]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 用地、建筑规模与拆改留方案

用地结构与拆改留逻辑已在"总体设计"章节给出，此处补充指标链与设计意图：场地面积11,412,825 m²，绿地（1401+1402）合计2,127,908 m²、占比18.6%，科研（0802）3,355,987 m²、占比29.4%，商业（05）2,078,777 m²、占比18.2% [metric:site_area_sqm] [metric:green_ratio] [metric:land_use_area_1401_sqm]。教育（0804）998,923 m²、占比8.8%，居住（0701）1,749,152 m²、占比15.3%，社区服务（0702）1,102,095 m²、占比9.7%，上述逐项面积见 [metric:land_use_area_0802_sqm] [metric:land_use_area_0804_sqm] [metric:land_use_area_0701_sqm]，其余记录于 [metric:land_use_area_0702_sqm]。

全部比例可由 `land_use.geojson` 逐块复算，分区无缝隙、无重叠，各代码面积分别记录于 [metric:land_use_area_1402_sqm] [metric:land_use_area_05_sqm] [metric:land_use_area_0804_sqm]。其余代码见 [metric:land_use_area_0701_sqm] [metric:land_use_area_0702_sqm] [data:geometry/land_use.geojson]，设计深度记录见 [depth:land_use_layout]。

建筑规模以262个街区级概念基底表达，总基底1,070,482 m²，布局遵循"科研沿绿轴东侧、商业向南核集中、居住嵌入绿网"的原则；基底仅为空间供给示意，不代表法定建筑面积或容积率结论 [data:geometry/buildings.geojson] [metric:building_footprint_area_sqm]。拆改留为方向性分类：优先保留高校、科研院所、轨道交通站点与历史建筑，公园带两侧以"微更新+功能置换"为主，仅对低效产业空间提出改造升级方向；地块级拆改留结论必须依据官方现状调查与权属数据，本方案不作结论 [assumption:A-EXISTING-001]。

容积率、建筑高度、密度、绿地率与退线等法定控制指标在资料包中缺失，列为待正式数据补齐，不给出数值 [metric:floor_area_ratio] [metric:building_height_m] [assumption:A-CONTROLS-001]。

## 交通、轨道、市政与公共服务设施

- **道路与慢行**：三条南北向廊道（学院路科创走廊、活力轴服务路、公园慢行主廊道）+四条东西向联络线（清河绿道、知春路、北四环、众智园联络线），概念路网总长约34.5 km [data:geometry/roads.geojson] [metric:road_network_length_m]。慢行优先于公园带，采用无障碍连续断面 [standard:BARRIER-FREE-ENVIRONMENT-LAW]。
- **轨道与站点一体化**：以轨道站点（含大钟寺站等既有站点概念）为TOD节点，建议站点300-500米圈层混合布局，具体线位与站点改造待工程论证 [assumption:A-CONTROLS-001]。
- **市政与新型基础设施**：建议分布式能源、端侧算力与市政管线共建共廊、15分钟生活圈公共服务全覆盖，均为概念方向，不作工程可行性结论 [depth:municipal_new_infrastructure]。

## 蓝绿空间、公共空间与城市风貌

- **蓝绿系统**：京张遗址公园活力带为南北主轴（1401绿地1,991,800 m²，含北门户绿楔合计2,127,908 m²），清河滨水绿道、小月河场景翼为东西两翼，形成"一轴两翼"蓝绿骨架 [data:geometry/green_space.geojson] [data:geometry/roads.geojson#ROAD-004] [metric:green_space_area_sqm]。
- **公共空间节点**：京张AI北门户广场、AI原点社区中央广场、大钟寺AI消费广场、五道口创新交往节点四个概念广场 [data:geometry/public_space.geojson] [metric:public_space_area_sqm]。

- **AI朝圣地标（4个）**：
  1. **原点纪念碑**（AI原点社区）：京张铁路原点与AI原点同址叠合的纪念性公共艺术与荣誉墙 [depth:landmark_catalog]；
  2. **开源里程碑广场**（众智园）：记录中国AI重要开源节点的"贡献者之墙"与荣誉展示体系 [depth:honor_display_system]；
  3. **AI星辰大道**（公园活力带）：沿铁路线位设置的年度AI成果星光地砖与荣誉节点；
  4. **大钟寺AI消费穹顶**（大钟寺）：智能原生商业与展示的公共目的地。
  地标均为概念设计，不经文保、绿地、蓝线与交通安全约束确认不得建设，且避免过度娱乐化 [source:AGENT-TASKBOOK] [assumption:A-EXISTING-001]。
- **风貌控制**：以"钢轨灰×电光蓝"双色系统统一导视与公共家具，建筑沿轴采用连续界面与退台体量，风貌控制为概念建议 [depth:height_massing_character] [standard:MOHURD-URBAN-DESIGN-MEASURES]。

## 更新项目清单、实施政策与分期计划

### 更新项目清单（概念）

1. 京张遗址公园活力带贯通工程（一轴）；
2. 众智园全栈创新核组团（二期）；
3. AI原点社区客厅与广场（一期）；
4. 大钟寺站城一体商业核（一期）；
5. 学院路科创走廊界面更新（三期）；
6. 小月河场景赋能带（三期）；
7. 15分钟生活圈补短板工程（三期）。

### 分期计划

- **一期**（约704 ha，含原点社区与大钟寺先导区）：公共空间优先，先做"原点广场、消费广场、活力带中段"与AI测试场景 [data:geometry/phasing.geojson#PHASE-001] [metric:phasing_area_phase_1_sqm]。
- **二期**（约176 ha，众智园）：全栈研发组团与测试场 [data:geometry/phasing.geojson#PHASE-002] [metric:phasing_area_phase_2_sqm]。
- **三期**（约262 ha，东西两翼）：全域品质提升与运营深化 [data:geometry/phasing.geojson#PHASE-003] [metric:phasing_area_phase_3_sqm]。

三期合计覆盖全部场地 [metric:phasing_total_area_sqm]，与用地分区相互校验 [metric:land_use_total_area_sqm]。

### 首个90天低后悔路径（概念建议）

为避免"规划落地即大规模上线"，参考低成本试错逻辑提出首个90天建议顺序；它不是已确定的实施时序，任一关键条件缺失即退回普通公共服务 [assumption:A-ECONOMIC-001] [assumption:A-CONTROLS-001]。

1. **第0—30天：资料与场地锁定**。锁定官方/临时几何版本、现场基线、权利与责任人清单；缺任一关键输入就保持待正式数据补齐，不推进设计结论。
2. **第31—60天：普通服务基座**。先提供实体导视、纸面地图、人工窗口、座椅遮阴与无障碍连续任务链；普通路径不等待模型恢复 [standard:BARRIER-FREE-ENVIRONMENT-LAW]。
3. **第61—90天：受控测试窗口**。仅在基座证据齐备后，启动一个有人值守、限时、可急停、可人工接管的测试窗口；任一安全、权益或数据问题未闭环即停止并恢复被动服务 [standard:GENERATIVE-AI-INTERIM-MEASURES]。

### 全球AI创新活动体系与长期运营（概念建议）

- **年度活动体系**：建议以"原点季（Origin Season）"为品牌，形成春季开源大会、夏季AI嘉年华、秋季产业峰会、冬季开发者冬令营的四季活动节奏 [source:AGENT-TASKBOOK] [depth:annual_event_system]。
- **开发者社区运营**：建议设立"原点开发者俱乐部"，以开源贡献积分、共创Workshop、双周Demo Day形成持续社区运营 [depth:developer_community_operation]。
- **场景开放运营**：建议"场景开放清单+测试沙箱+先试后转"机制，企业按清单申请测试场景，运营委员会评审 [depth:scenario_open_operation]。
- **国际传播与招引转化**：建议以"Origin Engine"国际叙事、AI朝圣线路和开发者导览形成品牌资产；以上全部为运营机制建议，不构成已确定的政府安排或招商承诺 [assumption:A-ECONOMIC-001]。

## 指标体系、面积复算与合规矩阵

核心指标链如下（全部由 `metrics.json` 与 `geometry/*.geojson` 复算）[depth:metrics_recalculation]：

- **场地规模**：总体设计范围11,412,825 m²；统筹研究范围43.6 km²；重点区域合计368.4 ha [metric:site_area_sqm] [metric:coordinated_research_area_sqm] [metric:key_detailed_design_area_sqm]。

- **用地结构**：绿地比例18.6%（含防护绿楔），科研29.4%，教育8.8%，商业18.2%，居住15.3%，社区服务9.7% [metric:green_ratio] [metric:land_use_total_area_sqm]。

- **空间供给**：概念建筑基底107.0万 m²（262栋）；公共空间节点11.0万 m²、占场地1.0% [metric:building_footprint_area_sqm] [metric:public_space_area_sqm] [metric:public_space_ratio]；路网34.5 km [metric:road_network_length_m]。

- **任务覆盖**：12张场景卡（含3张测试验证）、5类用户画像、4个AI朝圣地标、6项Agent任务全覆盖，逐项记录于 `compliance_matrix.json` [metric:scenario_card_count] [metric:persona_class_count] [metric:ai_pilgrimage_landmark_count]。
- **标准与深度**：9项专业标准逐项响应于 `standard_matrix.json`；15项设计深度项全部 `complete` 于 `design_depth_matrix.json`。
- **待确认**：容积率、建筑高度、密度、绿地率、退线等法定控制指标，待官方控规条件 [metric:floor_area_ratio] [metric:building_height_m] [assumption:A-CONTROLS-001]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

- **资料合法性**：仅使用公告、任务书、公开标准快照与仓库提供/清权数据；不使用非公开图件、内部数据与个人隐私 [source:PROCESSED-FACT-PACK]。
- **版权**：本方案由AI生成，文本与原创概念（命名、Logo方向、结构示意）按仓库许可展示；不包含未经授权的商标、字体、图片、肖像或企业标识；完整声明见 `report/copyright_statement.md`。
- **AI生成责任**：生成方法（模型、版本、协作方式）已在 `agent.json` 披露；所有空间结论为概念建议，不构成审定结论 [assumption:A-AI-001]。
- **合规底线**：AI场景遵循生成式AI暂行办法与无障碍环境建设法适用范围；不搞过度监控、隐私侵害与无法人工复核的场景 [standard:GENERATIVE-AI-INTERIM-MEASURES] [standard:BARRIER-FREE-ENVIRONMENT-LAW]。
- **待补资料**：官方polygon、控规指标、现状建筑与权属、文保线与红线、市政工程条件；补齐后重算全部指标与图纸 [assumption:A-CONTROLS-001] [assumption:A-BOUNDARY-001]。
- **专业复核**：需城市规划、交通、市政、文保与AI合规专业团队深化复核 [depth:risk_missing_data]。

## 参考资料

主要材料（完整机器索引以 `sources.json`、`standard_matrix.json` 与 `design_depth_matrix.json` 为准，本清单为人类可读摘要，其合法性依据见 [source:SOURCE-REGISTRY]）：

1. 北京市规划和自然资源委员会海淀分局：《百年京张AI创新带城市设计国际方案征集》资格预审公告（2026-05-09）。
2. 主办方：《面向全球智能体开展百年京张AI创新带城市设计开源征集任务书》（2026-05-18，清权文本）。
3. 住房和城乡建设部：《城市设计管理办法》（2017）。
4. 住房和城乡建设部：《城市、镇控制性详细规划编制审批办法》及相关管理文件。
5. 自然资源部：《国土空间调查、规划、用途管制用地用海分类指南（试行）》（2023-11）。
6. 全国人大常委会：《中华人民共和国无障碍环境建设法》（2023-06-28通过，2023-09-01施行）。
7. 国家互联网信息办公室等：《生成式人工智能服务管理暂行办法》（2023-07-13发布）。
8. 国务院办公厅：《关于切实解决老年人运用智能技术困难实施方案的通知》（国办发〔2020〕45号）。
9. 仓库维护方：《百年京张AI创新带临时粗略边界及校核说明》（provisional_boundaries_basis.md，2026-06-05）。
10. 北京市、海淀区公开渠道关于京张铁路遗址公园、中关村与海淀AI产业发展的公开报道与资料（背景参考）。
