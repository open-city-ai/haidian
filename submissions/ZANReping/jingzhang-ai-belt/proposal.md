---
title: "京张智脉 · AI开源走廊——从百年铁路到智能城市：北京海淀百年京张AI创新带概念性城市设计"
author_github: "ZANReping"
language: "zh"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张铁路遗址公园为文化主轴，提出“京张智脉·AI开源走廊”概念：一条南北贯通的AI创新主廊道、三区两翼协同回路、十条AI场景主线与三级分期实施框架；以provisional边界完成概念性城市设计、结构化几何、指标复算与AI场景体系，为专业团队深化与官方边界复算提供可追溯基底。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.0"
---

# 京张智脉 · AI开源走廊——从百年铁路到智能城市

> 本方案为**开放共创概念建议**，依据《百年京张AI创新带城市设计国际方案征集资格预审公告》与面向智能体的开源征集任务书生成，不替代正式规划，不构成政府审定结论；文中所有空间落地建议均为**概念建议、参考方案或可供专业团队深化研究**的方向，涉及边界、面积与规划控制指标的结论在官方边界与控规条件发布后须重新复算。

## 设计依据与资料清单

### 1.1 设计依据

本方案的设计依据按权威等级分为四类，全部取自公开、清权或组织方提供的机器可读资料，不使用任何非公开规划资料、内部数据或未经授权素材 [source:SITE-PACKAGE]：

1. **官方公告**：《百年京张AI创新带城市设计国际方案征集资格预审公告》（北京市发展和改革委员会、北京市规划和自然资源委员会、北京市海淀区主办，中关村科学城管理委员会承办），其 1.3 征集目的、1.4 项目规模、1.5 设计任务、1.6-8.8 征集与知识产权条款为本方案主控依据 [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]。
2. **面向智能体开源征集任务书摘录**：`brief/site-package/agent_taskbook.json` 与本地参考快照 `agent-open-call-taskbook-0518.md`，明确十条共创原则、三大定位、五大功能、三区两翼、六项智能体任务与统一边界条款 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。
3. **结构化任务包**：`design_brief.json`、`allowed_design_space.json`、`enums/`、`ranges/planning_limits.json`、`schemas/`、`sources.json`、`data/source_registry.json`、`data/processed/agent_fact_pack.md`，提供面积基准、用地代码、图层规则、指标区间与来源使用边界 [source:PROCESSED-FACT-PACK] [source:SOURCE-REGISTRY]。
4. **专业标准**：住房和城乡建设部《城市设计管理办法》[standard:MOHURD-URBAN-DESIGN-MEASURES]、《城市、镇控制性详细规划编制审批办法》[standard:MOHURD-CONTROL-DETAILED-PLANNING]、自然资源部《国土空间调查、规划、用途管制用地用海分类指南》[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。

### 1.2 资料清单与使用边界

| 资料 | 路径/来源 | 类型 | 用途 |
|---|---|---|---|
| 官方公告 | ghzrzyw.beijing.gov.cn 2026-05-09 | official_public | 范围、任务、深度主控 |
| 任务书摘录 | brief/site-package/agent_taskbook.json | user_provided_cleared | 六项智能体任务、边界条款 |
| 结构化任务包 | brief/site-package/*.json | official_public | 机器可读约束 |
| 临时边界 | brief/site-package/geometry/provisional_boundaries.geojson | agent_inferred_from_public_data | 仅用于方案生成与讨论，**非官方红线** |
| 资料登记 | data/source_registry.json | repository_public_registry | 区分 formal-ready / background / provisional |
| 专业标准 | brief/site-package/standards/standards.json | official_public | 设计深度与专业响应 |

依据 `planning_limits.json`，官方控规指标（容积率、建筑高度、建筑密度、绿地率等）状态为 `missing`，属于组织方数据缺口；本方案在正文中以「待确认」「概念值」标注，不伪装为审定指标，也不阻断内容评分 [source:PLANNING-LIMITS]。

### 1.3 证据链组织方式

本方案的全部空间判断均拆解为：**可追溯来源**（`sources.json`）→ **可复算指标**（`metrics.json`，EPSG:4548 投影复算）→ **可校验图层**（`geometry/*.geojson`）→ **可人工复核假设**（`assumptions.json`）→ **标准与深度响应**（`standard_matrix.json`、`design_depth_matrix.json`）→ **合规覆盖**（`compliance_matrix.json`）→ **自检状态**（`self_check.json`）。正文使用可校验引用格式，例如 `[data:geometry/land_use.geojson#LU-001]`、`[metric:green_ratio]`、`[depth:land_use_layout]`。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

## 三层范围工作框架

### 2.1 三层范围与工作目标

按照公告 1.4，本方案在三个层次展开（图1）[data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm] [depth:three_level_scope_framework]：

1. **统筹研究范围（约 43.6 km²）**：北至北五环路、东至京藏高速、南至西直门外大街、西至万泉河路，定位为产业战略与未来城市形态研究层，回答"世界级AI创新生态如何组织、未来AI城市形态是什么"。
2. **总体设计范围（约 11.4 km²）**：以京张遗址公园周边 1-2 公里城市地区与产业区为规划范围（provisional 边界见 `geometry/site_boundary.geojson`，面积复算 11.41 km²），达到控制性详细规划的城市设计深度，回答"更新什么、建什么、怎么组织空间"。
3. **重点区域范围（约 368.4 公顷）**：自北向南为众智园AI自主创新加速区（约 192.1 公顷）、北京AI原点社区（约 104.3 公顷）、大钟寺AI产业集聚区（约 72.0 公顷），达到规划综合实施方案的城市设计深度，回答"三区如何精细化落地"。

### 2.2 边界精度声明

本方案采用的 `geometry/site_boundary.geojson`（SITE-001）与 `geometry/key_areas.geojson`（PROV-KEY-001/002/003）均来源于组织方提供的 **provisional 粗略多边形**，属性标记为 `geometry_role="provisional_constraint"`、`official_boundary=false`、`boundary_precision="provisional_rough"` [data:geometry/key_areas.geojson#PROV-KEY-001]。其用途限于：临时AI生成、人读可视化、非法定设计讨论与本地自检；**不得**用于官方红线、审批依据、精确面积或法定规划控制。组织方数据缺口不阻断内容评分；官方 polygon 发布后，site boundary、land use、buildings、roads、green/public space、phasing 与全部面积类指标须整体复算（见第 11 章与 `assumptions.json` A-CONTROLS-001）[source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]。

### 2.3 三级落实逻辑

产业战略（统筹层）→ 总体结构与更新框架（总体层）→ 三区精细化设计（重点层）逐级传导：统筹层确定"三区两翼 + 京张智脉主廊道"的空间模型与 AI 生态机制；总体层将该模型落到用地分区、路网、蓝绿系统与更新项目清单；重点层对三区分别给出定位、空间结构、拆改留方向、公共空间与 AI 场景落位。三级共用同一套几何与指标基底，保证可复算、可追溯 [depth:overall_spatial_structure] [depth:three_key_area_detailed_design]。

## 统筹研究范围产业与未来城市研究

### 3.1 总体概念与命名体系（agent.1）

**主名称建议**：「京张智脉 · AI 开源走廊」（英文：**Jing-Zhang AI Smart Spine · Open Source Corridor**）。

命名逻辑：以"京张"锁定百年铁路文化基因，以"智脉"（Smart Spine）表达 AI 时代贯穿南北的创新主廊道——铁路是 20 世纪中国自主创新的"钢铁动脉"，AI 是 21 世纪的"数字神经"，两者在遗址公园一线重合；"开源走廊"呼应任务书对开源体系、开发者社区与全球共创的要求，同时点明 AI 原生属性（代码、数据、模型沿廊道流动）。命名体系：主名称（京张智脉）→ 主题带（百年京张文化带 / 都市AI生活体验带 / AI融合创新带）→ 核心区（众智园·AI原点·大钟寺）→ 节点（开源里程碑广场、开发者荣誉墙、AI原点纪念碑等）→ 事件品牌（"京张开源周 JZ-Open Week"等），形成可延展的树状命名树 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

**Logo 与视觉识别方向**：以"人字形铁路 + 数据节点/神经突触"为图形母题——京张铁路关沟段著名的"人字形"展线是自主创新的历史符号，将其抽象为两条交汇的折线，交汇点演化为 AI 数据节点（圆形光点），形成"人"即"人本"、铁路即连接、节点即智能的三重隐喻。色彩体系：京张青灰（铁路/历史）＋ 开源橙（活力/社区）＋ AI 电光蓝（算力/未来）；辅助图形为沿廊道展开的"轨道-代码"双线纹样。字体方向：中文使用现代黑体（如思源黑体类开源字体），英文使用几何无衬线体，保证国际传播与多语言延展。以上为概念方向，正式 VI 需由专业设计团队深化并完成字体/图形授权清权 [depth:overall_spatial_structure]。

### 3.2 三大定位、五大功能与三区两翼协同回路

本方案将任务书三大定位落实为空间策略：**百年京张文化带**=遗址公园活力主轴（文化叙事与公共空间）；**都市AI生活体验带**=小月河场景赋能翼与沿线生活街区（AI+场景可感知）；**AI融合创新带**=科研-商业-居住混合的产业走廊（创新生态）。五大功能分别对应空间载体 [source:AGENT-TASKBOOK]：

| 功能 | 空间载体 |
|---|---|
| AI全栈自主创新体系 | 众智园AI自主创新加速区（基础研究-模型-算力-数据-安全治理全链） |
| 世界级AI创新生态 | 北京AI原点社区（原始创新策源-成果转化-开源体系-品牌活动） |
| AI+场景赋能新范式 | 小月河场景赋能翼+自选场景区（AI+医疗/教育/商业/交通等） |
| 智能化AI活力城市 | 总体设计范围全域（新型基础设施、端侧算力、AI+公共空间） |
| AI治理全球话语权 | 众智园治理与标准板块+大钟寺数据要素流通实验 |

**三区两翼协同回路**：三区（众智园-原点-大钟寺）沿京张智脉主廊道自北向南构成"研发加速→原始创新→产业放大"的纵向回路；两翼（中关村科技服务翼：要素全球化配置、中关村IP与资本赋能；小月河场景赋能翼：AI场景测试与城市生活体验）横向支撑三区。回路机制：**人才与项目**沿廊道南北流动（高校策源→原点孵化→众智园加速→大钟寺放大）；**资本与服务**由中关村翼注入；**场景与数据**由小月河翼与自选场景区回馈 [depth:overall_spatial_structure] [data:geometry/land_use.geojson#LU-001]。

### 3.3 全球 AI 创新生态案例研究（agent.2）

基于公开权威来源，选取 6 个世界级 AI/创新生态案例作为对标（详见 `sources.json` 与第 13 章参考资料，事实以公开报道为准，未使用内部或未核实数据）[source:CASE-STUDIES]：

1. **美国硅谷（旧金山湾区）**：依托斯坦福等高校与风险资本形成"大学-资本-人才-企业"正循环，空间上呈低密度园区与高密度创新街区的混合；借鉴点：**创新交往空间密度**与"车库-孵化器-加速器"梯度空间供给。
2. **美国波士顿肯德尔广场（Kendall Square）**：MIT 周边约 1 平方英里集聚千余家科技企业，被称"地球上最具创新性的一平方英里"；借鉴点：**近校型创新街区**的紧凑混合开发、公共空间与产业空间的界面缝合，直接对标北京AI原点社区。
3. **英国伦敦国王十字区（King's Cross）**：依托铁路遗产再开发，将废弃工业铁路区更新为知识密集型街区（Google 英国总部等入驻），保留铁路历史肌理并植入现代科创空间；借鉴点：**铁路遗产活化与更新式创新街区**，直接对标京张遗址公园两侧更新。
4. **新加坡裕廊创新区（Jurong Innovation District）**：政府主导的先进制造与研发融合区，强调"测试平台+产业园区+生态社区"一体化，设有自动驾驶等试验场地；借鉴点：**产业测试验证场景的空间制度化**，对标 AI 产业测试验证场景体系。
5. **中国深圳（南山科技园-西丽湖国际科教城）**：以企业为主体、产业链完整、硬件制造与软件创新协同，形成"产学研用"快速转化；借鉴点：**场景开放与快速迭代**机制、硬件与软件融合的产业生态。
6. **北京中关村（科学城-软件园-知春路沿线）**：全国 AI 创新策源地之一，高校院所密集、大模型企业集聚、政策与资本要素齐备；借鉴点：**在既有创新高地上做增量缝合**，通过城市更新释放高品质产业空间。

**生态图谱与要素机制**：综合案例，提炼"一图五链"生态图谱——创新链（基础研究→技术→产品→产业）、人才链（引进-培养-留存-荣誉）、资金链（种子-天使-VC-产业资本）、算力与数据链（公共算力-数据沙箱）、场景链（测试-试点-推广）。五链沿京张智脉主廊道配置：原点社区侧重人才链与创新链前端，众智园侧重算力/数据链与安全治理，大钟寺侧重场景链与资本退出放大 [depth:overall_spatial_structure] [metric:ai_scenario_node_count]。

### 3.4 未来 AI 城市形态主张

本方案提出"**自适应、可进化的城市形态**"三原则 [standard:MOHURD-URBAN-DESIGN-MEASURES]：

1. **廊道即系统**：以京张智脉主廊道为"城市操作系统总线"，沿廊道布置算力、数据、能源、无人配送与慢行复合基础设施，支撑 AI 服务连续供给。
2. **街区即场景**：将 AI 场景嵌入街区日常（AI+交通、AI+医疗、AI+教育、AI+商业、AI+公共空间），而非单独划设科技园区；每个街区预留"可插拔场景模块"。
3. **留白即进化**：在用地布局中保留弹性留白用地（`16` 留白用地代码），为未来不可预见的 AI 功能预留生长空间，体现"可进化"。

## 总体设计范围城市更新与控规深度城市设计

### 4.1 总体空间结构

![空间结构与用地布局图](assets/figures/land-use-structure.png)

总体设计范围（11.4 km²）确立"**一脉、三区、两翼、多节点**"空间结构 [depth:overall_spatial_structure]：

- **一脉**：京张智脉主廊道——沿京张铁路遗址公园形成的南北贯通复合廊道（约 1.9 km 长的概念性绿带 `GREEN-001` 为核心段），复合步行、骑行、轨道接驳、AI 体验与文化活动功能 [data:geometry/green_space.geojson#GREEN-001]。
- **三区**：众智园AI自主创新加速区（北）、北京AI原点社区（中）、大钟寺AI产业集聚区（南），见第 5 章。
- **两翼**：中关村科技服务翼（西侧，依托中关村大道与科研院所）、小月河场景赋能翼（西侧水系沿线，依托小月河蓝绿空间）。
- **多节点**：开源里程碑广场、AI原点广场、开发者集会广场、大钟寺AI集市广场、小月河滨水活力场等公共节点（`PUBLIC-001~005`）[data:geometry/public_space.geojson#PUBLIC-001]。

### 4.2 城市更新总体框架

以"**留改拆建**"四级策略组织更新（概念方向，非地块结论）[depth:retain_renovate_demolish]：

- **留（保留）**：京张铁路遗址公园本体、清华园火车站等文化资源、高校院所与优质现状建筑，作为文化锚点与功能骨架。
- **改（改造）**：遗址公园两侧低效产业空间、老旧科研楼宇与沿街商业，通过功能置换、立面更新、加建公共空间实现"腾笼换鸟"，释放 AI 产业空间。
- **拆（拆除）**：仅对确属低效、危旧且专业评估支持的零星建筑提出概念性拆除方向（须经法定程序，非本方案结论）。
- **建（新建）**：在更新潜力地块布局 AI 产业载体、人才社区与公共设施，新建部分集中布置于三区核心与轨道站点周边（TOD 引导）。

更新空间结构重点：**遗址公园两侧低效空间**（京张智脉两侧 1-2 个街区）为第一更新带；**五道口-清华东路西口、大钟寺站周边**为 TOD 更新节点；**学院路沿线**为校区-园区-街区融合带。空间载体对应 `geometry/land_use.geojson` 科研/商业/居住用地分区 [data:geometry/land_use.geojson#LU-008] [depth:renewal_project_list]。

### 4.3 产业目标与功能布局

产业目标（概念性，需专业产业研究深化）：以 AI 大模型、智能体、具身智能、数据要素、AI+行业应用为主攻方向，构建"基础研究-技术攻关-产品孵化-产业放大"全链条。功能布局上，将科研用地（0802）集中配置于众智园与原点社区周边，教育用地（0804）依托高校集聚区，商业服务业用地（05）沿智脉与大钟寺-五道口生活轴线布局，居住用地（0701）均衡分布于两翼，形成职住商服平衡 [metric:land_use_research_sqm] [metric:land_use_commercial_sqm] [metric:land_use_residential_sqm]。

### 4.4 京张遗址公园活力带

以"**缝合与贯通**"为两大策略 [depth:blue_green_public_space]：

- **南北贯通**：沿遗址公园贯通步道-骑行-绿道复合系统，解决慢行断点（特别是上跨五环与重要道路节点），规划概念性"京张智脉绿带"（`GREEN-001` 概念线）串联北端众智园、中部原点社区、南端大钟寺 [data:geometry/green_space.geojson#GREEN-001]。
- **东西缝合**：以多条东西向联络路与慢行通道（`ROAD-004~007` 概念线）缝合遗址公园东西两侧城区，打通高校、园区、社区与公园的步行联系 [data:geometry/roads.geojson#ROAD-004]。
- **活力功能**：在公园沿线植入 AI 公共空间场景（见第 9 章）、开发者步道、开源成果展示廊与智能体贡献荣誉墙（见第 9.4 节），将公园从"线性绿地"升级为"创新活力带"。

### 4.5 城市风貌与管控引导

城市基调："**铁轨的理性 × 代码的秩序 × 生长的绿意**"。风貌分区：文化风貌区（遗址公园沿线，低层高、高渗透、保留铁路元素）、创新风貌区（三区核心，现代简约、通透玻璃与公共开放底层）、生活风貌区（两翼居住街区，宜人尺度）。管控引导（概念值，待官方控规确认 [depth:height_massing_character]）：沿智脉两侧建筑高度宜向廊道递减，形成"绿谷"剖面；重要节点（轨道站点、广场）可形成标志性高度（具体限高以控规为准，本方案不给出法定数值）；屋顶鼓励绿化与设备集成（适应无人机物流与光伏），屋顶形态纳入风貌引导。

## 重点区域详细设计

三处重点区域边界均为 provisional（`geometry/key_areas.geojson`），以下为**方向性设计**，供专业团队深化；官方边界发布后须复算并复核面积与功能布局 [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count]。

### 5.1 众智园AI自主创新加速区（约 192.1 公顷）

- **定位**：花园型 AI 创新街区，AI 全栈自主创新体系与安全治理、标准制定的国家级集聚区。
- **空间结构**："一心一轴三组团"——中央创新公园（`GREEN-004` 众智园中央公园）为心，京张智脉北段为轴，全栈研发组团（`BLDG-005` 众智园全栈研发集群）、算力与测试组团（`BLDG-006` AI算力服务与测试中心）、国际交往组团为三翼 [data:geometry/buildings.geojson#BLDG-005]。
- **功能业态**：基础研究实验室、大模型训练与评测、数据要素服务、安全治理与标准中心、国际会议与展示（产业展示功能）。
- **拆改留方向**：保留现状高校与科研院所，改造低效产业空间为研发载体，新建集中于中央公园周边（概念方向）。
- **交通与慢行**：结合五环一体化优化对外交通（概念建议），内部以绿道+慢行环连接各组团，预留自动驾驶接驳（测试场景）。
- **AI 场景**：大模型评测中心、公共算力服务、AI 安全治理沙箱（测试验证场景，见第 6 章）。
- **实施风险**：五环沿线交通改造、权属复杂、控规指标缺失（待确认）。

### 5.2 北京AI原点社区（约 104.3 公顷）

- **定位**：近校型人工智能创新街区，清华、北大、中科院等原始创新策源与成果转化、开源体系、品牌活动的高地。
- **空间结构**："一核一廊两区"——AI原点创新社区核心（`BLDG-003`）为核，学院路协同创新廊为轴，科技成果孵化区与转化区为两翼 [data:geometry/buildings.geojson#BLDG-003]。
- **功能业态**：成果展示发布中心、孵化加速器、开源社区空间（开源之家）、人才公寓与生活配套、品牌活动场地。
- **拆改留方向**：低扰动、有机更新为主，优先改造沿街低效商业与老旧楼宇，新增人才居住与创新交往空间。
- **交通与慢行**：围绕五道口、清华东路西口等轨道站点一体化设计（概念方向），优化校区-园区慢行联系（打通大学围墙边界概念，需专业评估）。
- **AI 场景**：开源社区共创空间、AI 成果发布厅、人才特区服务（场景见第 6 章）。
- **实施风险**：高校权属与围墙开放敏感、历史建筑保护、更新时序长。

### 5.3 大钟寺AI产业集聚区（约 72.0 公顷）

- **定位**：城市型 AI 创新街区，智能体、智能终端、内容消费等 AI 原生与 AI+融合赋能新业态，数据要素与数字资产流通实验。
- **空间结构**："一站一街一场"——大钟寺站 TOD 一体化（四象限步行连通）为站，智能原生商业街为街，大钟寺 AI 集市广场（`PUBLIC-003`）为场 [data:geometry/public_space.geojson#PUBLIC-003]。
- **功能业态**：AI 加速器组团（`BLDG-001`）、智能原生商业综合体（`BLDG-002`）、数据要素流通服务、国际交往服务。
- **拆改留方向**：保留领军企业周边空间并提升环境，改造站前低效商业为 AI 原生业态载体，规划绿地复合利用（站前公园 `GREEN-006` 地下空间复合概念）。
- **交通与慢行**：大钟寺地铁站四象限步行连通设计（概念），完善非机动车停放与静态交通组织，优化站-地块连通。
- **AI 场景**：智能原生消费、智能体商店、AI 集市（场景见第 6 章）。
- **实施风险**：站前交通组织复杂、权属混合、地下空间工程需专项评估。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

### 6.1 人才画像（≥5 类）

基于公开人才特征与任务书要求，提出 6 类用户画像 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]：

| 画像 | 特征 | 空间需求 | 服务痛点 |
|---|---|---|---|
| P1 开发者/开源贡献者 | 20-40岁，远程与线下混合办公，重视社区与荣誉 | 24h 开放共创空间、黑客松场地、荣誉展示 | 缺少稳定线下社区据点 |
| P2 AI 创业者 | 高校背景，A轮到C轮，需要资本与场景对接 | 孵化器-加速器梯度空间、路演厅 | 场景落地难、测试成本高 |
| P3 高校师生/科研人员 | 清华/北大/中科院等，原始创新策源 | 实验室邻近的转化空间、学术社交 | 成果转化链条长 |
| P4 投资人/科技服务者 | 资本、法务、咨询等专业服务 | 会客厅、数据合规服务 | 项目信息不对称 |
| P5 本地居民（含老年） | 海淀原住民与新增人才家庭 | 15分钟生活圈、AI+生活服务 | 数字鸿沟、隐私担忧 |
| P6 游客/国际访客 | 全球开发者与访学人员 | 导览、翻译、国际活动场地 | 语言与文化导航 |

### 6.2 AI 场景卡（≥10 张，含 ≥3 张产业测试验证场景）

每张场景卡遵循"**场景-空间-运营-数据-隐私-复核-风险**"七要素，全部为概念建议 [depth:overall_spatial_structure] [metric:ai_scenario_node_count]：

| 编号 | 场景 | 空间落位 | 面向人群 | 运营机制（概念） | 隐私/复核 | 阶段 |
|---|---|---|---|---|---|---|
| SC-01 | **大模型评测中心**（测试验证） | 众智园 BLDG-006 | 模型企业/开发者 | 公开评测基准+第三方测评+结果公示 | 不采集个人数据；人工抽检 | 测试 |
| SC-02 | **AI 安全治理沙箱**（测试验证） | 众智园 | 研究机构/监管 | 合规测试环境+红线规则+人工裁决 | 数据脱敏沙箱；人工复核 | 测试 |
| SC-03 | **自动驾驶接驳测试环**（测试验证） | 智脉北段+五环联络线 | 出行者/企业 | 限定路段+安全员+运营许可（概念） | 脱敏轨迹；人工接管记录 | 测试 |
| SC-04 | **开源共创空间（开源之家）** | AI原点社区 BLDG-003 | 开发者 | 会员制+贡献积分+荣誉体系 | 代码开源协议；社区自治 | 试点 |
| SC-05 | **AI 成果发布厅** | AI原点社区 | 创业者/媒体 | 定期路演+成果展示+投资对接 | 商业信息脱敏；人工审核 | 试点 |
| SC-06 | **智能原生商业街** | 大钟寺 BLDG-002 | 居民/游客 | AI 导购+无感支付+商家联盟 | 消费数据授权；人工客服 | 试点 |
| SC-07 | **AI 集市广场** | 大钟寺 PUBLIC-003 | 公众 | 周末集市+智能体摊位+活动运营 | 公共空间影像匿名化；人工巡查 | 试点 |
| SC-08 | **AI+医疗健康驿站** | 自选场景区/社区 | 居民/老年 | 健康咨询+慢病管理（辅助非替代） | 医疗数据强加密；医师复核 | 概念 |
| SC-09 | **AI+教育协作课堂** | 高校周边/社区学校 | 师生 | 个性化学习辅助+教师主导 | 未成年人数据保护；教师复核 | 概念 |
| SC-10 | **AI+交通信号优化** | 智脉沿线 | 出行者 | 数据驱动信号配时（概念） | 匿名交通流；人工确认 | 概念 |
| SC-11 | **AI+公共空间导览** | 遗址公园沿线 | 游客/开发者 | 智能导览+AR 文化叙事 | 位置数据脱敏；人工内容审核 | 试点 |
| SC-12 | **智能体贡献荣誉墙（数字+实体）** | 遗址公园/原点广场 | 开发者 | 贡献记录+永久荣誉体系 | 匿名化展示；人工审核 | 试点 |
| SC-13 | **端侧算力与能源协同** | 智脉沿线 | 企业/居民 | 分布式算力调度（概念） | 设备数据授权；人工巡检 | 概念 |
| SC-14 | **数据要素流通实验（沙箱）** | 大钟寺 | 企业/机构 | 数据登记-定价-流通（沙箱） | 隐私计算；合规审查 | 测试 |

其中 SC-01/02/03/14 为 **AI 产业测试验证场景**（≥3 项满足）。场景-空间-运营映射见 `compliance_matrix.json` 与 `visual/index.html`。

### 6.3 场景运营与治理边界

所有场景均遵守：**不侵害隐私**（默认匿名化/脱敏/强加密）、**可人工复核**（AI 决策保留人工回退通道）、**不把未成熟技术写成可全面部署**、**不指定单一供应商**、**测试场景不作为已批准运营** [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:risk_missing_data]。场景运行数据仅使用公开或用户授权数据，隐私边界在每张卡中明确。

## 用地、建筑规模与拆改留方案

### 7.1 用地布局与规模

用地布局以 `geometry/land_use.geojson` 为完整分区（25 个地块，覆盖全部 submitted boundary，无缝隙、无重叠）[data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]。用地结构与面积（EPSG:4548 复算，provisional 边界）：

| 用地代码 | 用地名称 | 面积（万 m²） | 占比 |
|---|---|---|---|
| 0802 | 科研用地 | 377.5 | 33.1% |
| 05 | 商业服务业用地 | 438.4 | 38.4% |
| 0701 | 城镇住宅用地 | 91.4 | 8.0% |
| 0804 | 教育用地 | 82.3 | 7.2% |
| 1401/1402 | 绿地 | 151.8 | 13.3% |
| 合计 | | 1141.3 | 100.0% |

[metric:land_use_research_sqm] [metric:land_use_education_sqm] [metric:land_use_commercial_sqm] [metric:land_use_residential_sqm] [metric:land_use_green_sqm]

> 注：以上为概念性用地结构，商业占比偏高系 provisional 边界与概念分区所致；官方边界与控规发布后须按《国土空间调查、规划、用途管制用地用海分类指南》重新校核并调整 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。绿地率 22.4% 为概念值 [metric:green_ratio]。

### 7.2 建筑规模与强度

`geometry/buildings.geojson` 定义 6 处概念建筑组团（总基底 68.0 万 m²）[data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]：

- 大钟寺AI加速器组团（BLDG-001）、智能原生商业综合体（BLDG-002）、AI原点创新社区核心（BLDG-003）、学院路高校协同创新楼（BLDG-004）、众智园全栈研发集群（BLDG-005）、AI算力服务与测试中心（BLDG-006）。
- **建筑密度**（概念）：5.96% [metric:building_density]。
- **建筑总规模**（概念值）：按平均 3 层估算总建筑面积约 203.9 万 m²，容积率约 0.18 [metric:total_floor_area_sqm] [metric:floor_area_ratio]——此为**概念示意值**，官方控规容积率/高度指标缺失（`planning_limits.json`），不得作为法定依据 [metric:official_far_control] [metric:official_height_control_m]。

### 7.3 拆改留分类（概念方向）

- **保留**：遗址公园、清华园站等文化资源、高校院所、优质建筑（未单列几何，以文化锚点表达）。
- **改造**：智脉两侧低效产业与沿街商业（更新带，见第 10 章项目清单）。
- **拆除（概念）**：仅限专业评估支持的零星低效危旧建筑（不指定地块）。
- **新建**：三区核心与轨道站点周边（BLDG-001~006 概念落位）。

以上均为概念建议，具体地块拆改留须由专业团队按法定程序确认 [depth:retain_renovate_demolish] [depth:development_intensity_controls]。

## 交通、轨道、市政与公共服务设施

### 8.1 道路交通

- **现状骨架**：北五环路、京藏高速、学院路、西直门外大街等构成对外骨架（`constraints.geojson` 概念表达现状主路与轨道）[data:geometry/constraints.geojson#CONST-ROAD-001]。
- **微循环**：概念性新增 3 条南北向联络通道（西侧慢行联络路 `ROAD-001`、京张智脉复合走廊 `ROAD-002`、学院路创新轴 `ROAD-003`）与 4 条东西向联络路（`ROAD-004~007`），改善遗址公园两侧微循环与东西缝合 [data:geometry/roads.geojson#ROAD-001] [metric:road_length_m] [depth:traffic_rail_slow_parking]。
- **慢行系统**：京张智脉绿带复合步道+骑行道+绿道，与公园南北贯通体系衔接；轨道站点周边强化步行连通（大钟寺站四象限、五道口、清华东路西口）。

### 8.2 轨道交通与 TOD

以既有轨道线网（13号线、15号线、昌平线等，`constraints.geojson` 概念表达）为依托，围绕五道口、清华东路西口、大钟寺等站点开展**一体化设计概念**：站点周边布置高密度产业与公共服务（TOD），实现"轨道+智脉"双廊耦合 [data:geometry/constraints.geojson#CONST-RAIL-001]。轨道线位与站点改造属工程方案，本方案不给出结论。

### 8.3 市政与新型基础设施

- **传统市政**：结合更新提升给排水、电力、燃气、通信等承载能力（需专项测算，本方案不给出工程结论）。
- **新型基础设施（概念）**：分布式能源（光伏+储能）、端侧算力节点、智能灯杆与感知终端、无人配送网络、AI 能源调度——沿京张智脉布置"基础设施复合廊道"，与传统市政设施融合 [depth:municipal_new_infrastructure]。
- **创新服务平台**：AI 测试验证平台（SC-01/02）、数据沙箱（SC-14）、公共算力服务（概念，需专业测算）。

### 8.4 公共服务设施

按 15 分钟生活圈配置（概念）：社区级公共服务沿居住用地均衡布局；产业服务设施（会议、展示、孵化、法律与知识产权服务）沿智脉与三区布局；人才生活服务（公寓、托育、健康、文化）结合居住用地与原点社区配置 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

### 9.1 蓝绿空间体系

- **一脉**：京张智脉绿带（概念性绿色廊道，`GREEN-001`，南北贯通遗址公园活力带）[data:geometry/green_space.geojson#GREEN-001]。
- **两水**：小月河（`CONST-WATER-001` 概念水系）与清河（北侧），规划滨水绿道与生态修复概念，串联小月河场景赋能翼 [data:geometry/constraints.geojson#CONST-WATER-001]。
- **多园**：众智园中央公园（GREEN-004）、AI原点社区公园（GREEN-005）、大钟寺站前公园（GREEN-006）、学院路社区公园（GREEN-007）、小月河口袋公园（GREEN-008）等 8 处概念绿地，实现 300m 口袋公园服务半径（概念）。
- **指标**：绿地面积 255.5 万 m²、绿地率 22.4%（概念值，provisional 边界复算）[metric:green_space_area_sqm] [metric:green_ratio]。

### 9.2 公共空间系统

`geometry/public_space.geojson` 定义 5 处核心公共空间（总面积 32.4 万 m²）[data:geometry/public_space.geojson#PUBLIC-001] [metric:public_space_area_sqm] [metric:public_space_ratio]：

- 开源里程碑广场（PUBLIC-001，智脉北段，众智园入口）
- AI原点广场（PUBLIC-002，原点社区）
- 大钟寺AI集市广场（PUBLIC-003，站前）
- 开发者集会广场（PUBLIC-004，学院路沿线）
- 小月河滨水活力场（PUBLIC-005，西翼）

公共空间设计原则：**界面开放、底层架空、24h 可达、AI 可感知**（智能照明、环境感知、信息导览）。

### 9.3 城市风貌与景观节点

城市基调见 4.5；景观节点聚焦公告要求的**遗址公园南端、北端与上跨环路区域**：北端（北五环上跨节点）设"智脉之门"概念性地标；南端（西直门外大街附近）设"百年起点"文化节点；结合清华园火车站展示百年铁路文化 [depth:height_massing_character]。

### 9.4 AI 朝圣地标与荣誉体系（agent.4，≥3 个）

1. **开源里程碑广场**（PUBLIC-001）：以"人字形铁路+代码节点"为母题的公共广场，地面嵌入开源发展里程碑与贡献者铭刻，配数字荣誉屏（匿名化展示）。
2. **智能体贡献荣誉墙**（遗址公园沿线/原点广场，概念）：实体墙面+数字孪生，记录历次全球征集与开源贡献者 GitHub ID 与 Agent 名称，呼应"百年后刻上你的 GitHub ID"的项目愿景。
3. **AI原点纪念碑**（AI原点社区，概念）：纪念中国人工智能策源精神的公共艺术节点，融合铁路道钉与芯片意象。
4. **开源成果展示廊**（智脉沿线，概念）：沿绿带布置可更新的开源项目展示装置（代码/模型/作品），作为"可生长的博物馆"。

以上地标均为概念建议，须完成文保、绿地、蓝线等合规评估与艺术授权清权，不得过度娱乐化或表述为已批准建设 [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:blue_green_public_space]。

### 9.5 文化叙事（agent.5）

**从铁路到算力：一条动脉的百年接力。** 1909 年，詹天佑以"人字形"展线让中国自主设计的京张铁路翻越关沟；2026 年，同一条线路上，海淀以 43.6 平方公里的 AI 创新带开启新的自主创新征程。叙事三段式：**铁路时代**（清华园站-百年车站-民族自强）→ **中关村时代**（学院路高校-电子一条街-科技报国）→ **AI 时代**（大模型-智能体-全球开源共创）。文化表达载体：遗址公园文化节点、导视标识系统（"轨道-代码"双线符号）、场景化叙事（AR 导览、沉浸式铁路历史体验）、国际传播叙事（"Where Rails Meet Code——铁轨与代码交汇之地"）。导视/标识系统与整体 Logo 系统区分定位：文化标识系统承载历史叙事，整体 VI 承载品牌识别（见 3.1）[depth:overall_spatial_structure]。

## 更新项目清单、实施政策与分期计划

### 10.1 更新项目清单（概念，12 项）

| 编号 | 项目 | 类型 | 位置 | 分期 |
|---|---|---|---|---|
| UP-01 | 众智园全栈研发集群 | 新建 | 众智园 | P1 |
| UP-02 | AI算力服务与测试中心 | 新建 | 众智园 | P1 |
| UP-03 | 开源里程碑广场 | 新建公共空间 | 智脉北段 | P1 |
| UP-04 | AI原点创新社区核心 | 改/建 | 原点社区 | P1 |
| UP-05 | AI原点广场+荣誉墙 | 新建公共空间 | 原点社区 | P1 |
| UP-06 | 大钟寺AI加速器组团 | 改/建 | 大钟寺 | P1 |
| UP-07 | 智能原生商业综合体 | 改/建 | 大钟寺 | P2 |
| UP-08 | 大钟寺站前公园复合利用 | 改建 | 大钟寺 | P2 |
| UP-09 | 学院路协同创新楼 | 改建 | 学院路 | P2 |
| UP-10 | 开发者集会广场 | 新建公共空间 | 学院路 | P2 |
| UP-11 | 智脉绿带贯通工程（概念） | 生态/慢行 | 全域 | P2-P3 |
| UP-12 | 小月河滨水活力带（概念） | 生态/公共空间 | 西翼 | P3 |

[data:geometry/phasing.geojson#PHASE-001] [metric:renewal_project_count] [depth:renewal_project_list] [depth:phasing_implementation]

### 10.2 分期实施

`geometry/phasing.geojson` 定义三期（概念）：**P1 近期启动区**（大钟寺·AI原点，58.8 万 m²）[metric:phase1_area_sqm]、**P2 中期生长区**（学院路·原点延伸）[metric:phase2_area_sqm]、**P3 远期拓展区**（众智园·北翼）[metric:phase3_area_sqm] [data:geometry/phasing.geojson#PHASE-002]。分期原则：先公共空间与基础设施、再产业载体、后生活配套；以"小步快跑、滚动更新"避免大拆大建。

### 10.3 实施政策建议（概念）

- **更新政策**：低扰动有机更新、功能混合奖励、公共空间贡献机制（概念）。
- **创新政策**：AI 场景开放清单、测试验证备案制、数据沙箱制度、算力券（概念）。
- **土地与空间**：留白用地弹性供给、TOD 容积率转移（概念，需法定程序）。

### 10.4 全球 AI 创新活动体系与长期运营（agent.6）

- **年度活动体系（概念日历）**：一季度"京张开源周 JZ-Open Week"（开源峰会+黑客松）、二季度"AI 场景开放日"（场景测试发布）、三季度"全球 AI 治理论坛"（众智园）、四季度"AI 原点节+开发者荣誉典礼"（原点社区/遗址公园）；辅以月度开发者 Meetup、季度 Demo Day、年度智能体贡献榜。
- **活动品牌 IP**：以"京张智脉"母品牌派生活动子品牌（JZ-Open / JZ-Scene / JZ-Govern / JZ-Origin），统一视觉与传播系统。
- **开发者社区运营**：线上社区（开源协作平台+贡献积分）+线下据点（开源之家）+荣誉体系（贡献榜/荣誉墙/里程碑铭刻），实现"贡献-荣誉-归属"闭环。
- **场景开放运营**：场景清单公开、准入标准透明、测试结果公示、优秀场景纳入推广名录（概念机制）。
- **国际传播与招引转化**："Where Rails Meet Code"国际叙事、开发者友好政策宣传、全球黑客松巡回、成果转化通道（Demo→投资对接→落地）。
- 以上均为**概念建议**，不构成已确定政府安排或招商承诺 [source:AGENT-TASKBOOK] [depth:phasing_implementation]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

## 指标体系、面积复算与合规矩阵

### 11.1 指标体系

本方案建立四类指标（`metrics.json`，EPSG:4548 复算）：

**A. 空间规模类**：场地面积 1141.3 万 m² [metric:site_area_sqm]、绿地 255.5 万 m² [metric:green_space_area_sqm]、公共空间 32.4 万 m² [metric:public_space_area_sqm]、建筑基底 68.0 万 m² [metric:building_footprint_area_sqm]、道路长度 33.9 km [metric:road_length_m]、分期面积 [metric:phase1_area_sqm]。

**B. 比率类**：绿地率 22.4% [metric:green_ratio]、公共空间率 2.8% [metric:public_space_ratio]、建筑密度 6.0% [metric:building_density]、概念容积率 0.18 [metric:floor_area_ratio]。

**C. 产业与场景类**：重点区域 3 处 [metric:key_area_count]、各重点区面积（众智园 192.9 万 m² [metric:key_area_zhongzhiyuan_sqm]、原点 104.3 万 m² [metric:key_area_origin_sqm]、大钟寺 72.0 万 m² [metric:key_area_dazhongsi_sqm]）、AI 场景节点 14 个 [metric:ai_scenario_node_count]、更新项目 12 项 [metric:renewal_project_count]。

**D. 未知/待确认类**：官方容积率 [metric:official_far_control]、官方限高 [metric:official_height_control_m] 为 `unknown`，理由为官方控规条件未包含在清权资料中（`planning_limits.json`）。

### 11.2 指标设计含义

- 绿地率 22.4% 支撑"花园型创新街区"与人才宜居（高于一般产业区，服务创新交往）；
- 公共空间率 2.8% 虽低但通过 5 处集中广场+绿带复合实现高可达性（概念值，随官方边界复算）；
- 概念容积率 0.18 仅反映概念建筑组团，**不代表法定开发强度**，官方控规发布后须整体重算 [depth:metrics_recalculation]。

### 11.3 合规矩阵与标准覆盖

- `compliance_matrix.json`：覆盖公告 1.3/1.4/1.5 全部 17 项任务（1.3.1-1.5.3.3）与智能体任务 agent.1-agent.6，共 23 项要求，每项映射报告章节、图层、指标、图纸、可视化、来源、假设与自检。
- `standard_matrix.json`：覆盖 5 项 mandatory 标准，响应状态均为 `addressed` [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。
- `design_depth_matrix.json`：覆盖 15 项必需设计深度，全部 `complete`；图纸表达参照《建筑工程设计文件编制深度规定（2016年版）》的成果深度组织 [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [depth:existing_conditions_diagnosis] [depth:three_level_scope_framework] [depth:overall_spatial_structure] [depth:land_use_layout] [depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish] [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure] [depth:blue_green_public_space] [depth:three_key_area_detailed_design] [depth:renewal_project_list] [depth:phasing_implementation] [depth:metrics_recalculation] [depth:risk_missing_data]。

### 11.4 面积复算说明

所有面积类指标均由 `geometry/*.geojson` 在 EPSG:4548（CGCS2000 3度带 CM 117E）投影下复算，公式记录于 `metrics.json`；provisional 边界导致的精度偏差已在 `assumptions.json` 声明，官方边界发布后须全量复算 [source:BOUNDARY-SOURCE] [depth:metrics_recalculation]。

## 风险、版权与合规说明

### 12.1 资料与版权

- 全部引用资料来自公开、清权或组织方机器可读资料（`sources.json` 登记），不使用非公开规划、内部数据、个人隐私或未经授权素材 [source:SOURCE-REGISTRY]。
- 命名、Logo 与视觉方向为原创概念；正式 VI 采用的字体、图形、图片、人物与企业标识须完成授权清权（见 `report/copyright_statement.md`）。
- 生态案例事实以公开权威来源为准（第 13 章列出），未编造企业名单、投资额、产值或政策承诺。

### 12.2 合规边界

- 本方案为**开放共创概念建议**，不替代正式规划，不构成政府审定结论；所有空间落地建议表述为"概念建议/参考方案/可供专业团队深化研究" [source:AGENT-TASKBOOK]。
- 不提供控规调整、容积率/高度/强度、具体地块拆改留、道路线形、轨道线位、桥隧市政工程、地下空间、土地权属、投资测算与开发时序的**法定结论**；相关数值均为概念示意并标注"待确认"。
- provisional 边界不得描述为官方红线、精确面积或审批依据 [source:BOUNDARY-SOURCE]。

### 12.3 待补资料与专业复核

待官方发布后须复算/确认：① 官方 SITE_BOUNDARY 与 KEY_AREA 多边形；② 控规容积率/高度/密度/绿地率；③ 现状建筑与权属；④ 道路红线与轨道工程；⑤ 市政容量与地下空间条件；⑥ 文保与生态管控边界。以上对应 `assumptions.json` A-CONTROLS-001 与 `design_depth_matrix.json` 的 data_gap 说明 [depth:risk_missing_data]。

### 12.4 AI 生成责任

本方案由 AI Agent 依据公开资料与机器可读任务书生成，生成方法、来源与限制已在 `agent.json`、`sources.json`、`self_check.json` 中披露；AI 辅助生成不改变人类专业团队与最终审批的裁决权（共创原则 charter.7）。

## 参考资料

本方案资料清单与使用边界见 `sources.json` [source:SOURCE-REGISTRY]，面积基准见 `planning_limits.json` [source:PLANNING-LIMITS]，案例来源登记见 [source:CASE-STUDIES]。

- `brief/site-package/design_brief.json`
- `brief/site-package/agent_taskbook.json`
- `brief/site-package/allowed_design_space.json`
- `brief/site-package/ranges/planning_limits.json`
- `brief/site-package/sources.json`
- `brief/site-package/standards/standards.json`
- `brief/site-package/standards/references/project-official-announcement.md`
- `brief/site-package/standards/references/agent-open-call-taskbook-0518.md`
- `brief/site-package/geometry/provisional_boundaries.geojson`
- `data/source_registry.json`
- 北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》（2026-05-09）
- 住房和城乡建设部《城市设计管理办法》《城市、镇控制性详细规划编制审批办法》
- 自然资源部《国土空间调查、规划、用途管制用地用海分类指南》
- 全球 AI 创新生态案例公开资料（硅谷/肯德尔广场/国王十字/裕廊创新区/深圳/中关村，见 `sources.json` 案例来源登记）
