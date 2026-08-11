---
title: "海淀三元·AI 一日城"
title_en: "Haidian Trinary AI City"
author_github: "DFreeMind"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "方向 B — 海淀三元·AI 一日城。把 11.4 km² 总体设计区组织为 MAKE / LIVE / BUILD 三个连续的城市阶段，对位大钟寺 / 北京 AI 原点社区 / 众智园三个重点区；小月河场景赋能翼与中关村科技服务翼承担五大功能。所有图层与指标由 GeoJSON 复算，所有空间建议均为概念方案，不替代官方控规或政府审定结论。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 海淀三元·AI 一日城

> **方向 B · Direction B** — 把 11.4 km² 总体设计区想成一个 AI 人才"一天 24 小时"的城市生活实验场。三个重点片区不是三块割裂的园区，而是同一天里**造物 → 客厅 → 前沿**的三个连续阶段：清晨从大钟寺首发与制造端出门，白天在 AI 原点做协作与公共生活，傍晚回到众智园做 R&D、治理与低碳。两侧分别由小月河场景赋能翼（西）与中关村科技服务翼（东）承担"AI+ 场景"与"要素全球化"两套支撑。

## 设计依据与资料清单

本 formal 方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据 [source:OFFICIAL-ANNOUNCEMENT]，以 `brief/site-package/` 内的 `design_brief.json`、`agent_taskbook.json`、`allowed_design_space.json`、`sources.json`、`enums/`、`ranges/`、`schemas/`、`data/source_registry.json` 与 `data/processed/agent_fact_pack.md` 为机器可读依据 [source:SITE-PACKAGE]。

登记在 `data/source_registry.json` 中的来源共 8 条（formal 7 条，background 1 条，provisional 1 条）[source:SOURCE-REGISTRY]。本方案使用 `official_public` 与 `user_provided_cleared` 类作为正式依据，使用 `provisional_repository_data` 类作为临时边界与几何依据。任何 background_only、provisional_only 与 needs_official_file 的材料都不进入正式结论 [source:SOURCE-REGISTRY]。

公告与任务书分别要求达到"控制性详细规划的城市设计深度"与"规划综合实施方案的城市设计深度" [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。本方案以"概念方案 / 参考方案 / 可供专业团队深化研究"作为统一表述边界，不替代正式规划、不构成政府审定、不越过法定审批 [standard:CHARTER-CONCEPT-BOUNDARY]。

正文在关键判断后使用可校验引用格式。同一处连续引用通常不超过 3 条，删除引用标记后句子仍自然可读。所有指标、深度、任务覆盖与来源完整索引在 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` 中维护。

![总览：三区两翼 + 铁路主轴](assets/figures/site-overview.png)

## 三层范围工作框架

公告把 43.6 km² 划为**统筹研究范围**，11.4 km² 划为**总体设计范围**（本方案主图层所在），368.4 ha 划为**重点区域范围**（三处详细设计片区）[depth:three_level_scope_framework]。

三处重点片区以 provisional polygon 进入本方案，必须明确标注为"待正式数据补齐"。其临时边界在 `geometry/key_areas.geojson` 中以 `PROV-KEY-001/002/003` 标识 [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]。场地面积与重点区数量从 `geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 直接复算 [metric:site_area_sqm] [metric:key_area_count]。

边界与数据状态：脚手架生成的可评分状态为"临时边界，保留精度警示并待正式数据发布后复算；不阻断内容评分"。当官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` polygon 发布后，site boundary、key areas、land use、buildings、roads、green space、public space、phasing 和 metrics 均需按 `scripts/scaffold_ai_submission.py` 重新跑一遍，不得只替换单个文件 [data:geometry/site_boundary.geojson#SITE-001] [depth:overall_spatial_structure]。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

## 统筹研究范围产业与未来城市研究

本节同时回应公告 1.5（1）关于世界级 AI 创新生态、产业链协同、三区两翼、未来 AI 城市形态、AI 文化/社会/城市、AI+ 交通与连续绿色空间体系的要求 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]，并回应任务书 `agent.1`（一带总体概念与功能统筹）与 `agent.2`（全栈自主创新 + 5-8 个全球生态案例）[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

### 三大定位

| 定位 | 在三元中的落点 |
| --- | --- |
| 百年京张文化带 | 沿京张遗址公园主轴贯穿全境，构成"百年前工业首线 → 当下 AI 创新首线"的连续叙事 |
| 都市 AI 生活体验带 | LIVE 客厅（AI 原点）24h 公共客厅 + 两翼场景节点构成"日常可体验的 AI" |
| AI 融合创新带 | BUILD 前沿（众智园）全栈自主创新 + MAKE 起点（大钟寺）智能原生新业态共同形成"产业可发力的 AI" |

### 五大功能

- **AI 全栈自主创新体系** → BUILD 前沿（众智园）。
- **世界级 AI 创新生态** → LIVE 客厅（AI 原点社区）。
- **AI+ 场景赋能新范式** → 小月河场景赋能翼（西）+ 跨三区节点。
- **智能化 AI 活力城市** → LIVE 客厅（24h 公共客厅）+ 周边社区服务。
- **AI 治理全球话语权** → BUILD 前沿（众智之塔 + AI 安全治理廊）。

### 三区两翼协同回路

| 节点 | 角色 | 核心动作 | 证据 |
| --- | --- | --- | --- |
| 众智园（192.1 ha） | BUILD 前沿 · 全栈自主 + 治理 | R&D 街区、清河低碳界面、众智之塔 | [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design] |
| 北京 AI 原点（104.3 ha） | LIVE 客厅 · 世界级生态 | 24h 公共客厅、开源发布厅、近校转化 | [data:geometry/key_areas.geojson#PROV-KEY-002] [source:AGENT-TASKBOOK] |
| 大钟寺（72.0 ha） | MAKE 起点 · 智能原生新业态 | 智造首发街、智能终端市集、四象限客厅 | [data:geometry/key_areas.geojson#PROV-KEY-003] [metric:key_area_count] |
| 小月河翼（西） | 场景与活力城市 | AI+ 街区试点、低碳能源、慢行缝合 | [data:geometry/green_space.geojson#GREEN-001] [data:geometry/roads.geojson#ROAD-WING-W] |
| 中关村翼（东） | 要素与资本 | 资本 / IP / 人才 / 数据要素的协议治理 | [data:geometry/roads.geojson#ROAD-WING-E] [data:geometry/public_space.geojson#PUBLIC-LIVE-02] |

![用地结构：四类设计用地 + 中央主轴](assets/figures/land-use-structure.png)

## 总体设计范围城市更新与控规深度城市设计

总体设计范围（11.4 km²）以"连续性"作为更新原则，不靠"拆改留单点结论"取胜 [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:land_use_layout] [depth:retain_renovate_demolish]。

总体空间结构有三条主轴：(1) 中央主轴 = 京张遗址公园，从 1909 钢轨（铁路记忆）到 AI 公共客厅（智源立方），南北贯通；(2) 两翼 = 场景 + 服务，西翼小月河以"AI+ 街区"做场景试点，东翼中关村以"IP + 资本 + 人才"做要素配置；(3) 三区 = 三种节奏，MAKE 是首发与制造端（最快），LIVE 是 24h 公共客厅（温和），BUILD 是 R&D 与治理（最慢），通过"早 → 中 → 晚"动线把同一天串起来。

用地分区覆盖完整边界且无重叠 [data:geometry/land_use.geojson#LU-MAKE-01] [data:geometry/land_use.geojson#LU-LIVE-01] [data:geometry/land_use.geojson#LU-BUILD-01]。建筑基底按"保留 + 改造 + 试点新建"分级 [data:geometry/buildings.geojson#BLDG-MAKE-01] [data:geometry/buildings.geojson#BLDG-LIVE-01] [data:geometry/buildings.geojson#BLDG-BUILD-01]。  ，   [depth:height_massing_character]。

交通以京张主轴 + 两翼 + 跨三区慢行为骨架 [data:geometry/roads.geojson#ROAD-SPINE] [data:geometry/roads.geojson#ROAD-WING-W] [data:geometry/roads.geojson#ROAD-WING-E]。  ，   [depth:traffic_rail_slow_parking]。市政与公共服务按"公共空间先行、轻量设施启动、正式工程前置"的原则 [data:geometry/constraints.geojson#CONSTRAINTS] [depth:municipal_new_infrastructure]。

![交通慢行 + 蓝绿公共空间：铁路主轴 + 两翼](assets/figures/mobility-bluegreen.png)

## 重点区域详细设计

三处重点片区在同一份"三元叙事"里承担不同节奏 [depth:three_key_area_detailed_design]。

### 大钟寺 AI 产业聚集区 — MAKE 起点

定位：智能原生新业态首发场。设计动作：大钟寺站四象限步行连通；站前公共客厅作为首发活动的可重复使用场地；与重点企业公共环境更新同步推进 [data:geometry/public_space.geojson#PUBLIC-MAKE-01] [data:geometry/buildings.geojson#BLDG-MAKE-01]。AI 场景：智造首发街、智能终端市集、数据要素剧场、大钟寺站四象限公共客厅（场景卡 01、02）。实施依赖：轨道站点一体化、道路交叉口、市政管线 [data:geometry/constraints.geojson#CONSTRAINTS]。风险：站点周边权属与商业界面复杂，试点应"先轻后重"，避免一次性大改造。

### 北京 AI 原点社区 — LIVE 客厅

定位：世界级 AI 创新生态的 24h 公共客厅。设计动作：智源立方作为 24h 开放的公共客厅；近校成果转化街把校区、园区、街区慢行缝合；AI 生活服务样板街把 AI+ 公共服务落到街区尺度 [data:geometry/public_space.geojson#PUBLIC-LIVE-01] [data:geometry/public_space.geojson#PUBLIC-LIVE-02] [data:geometry/buildings.geojson#BLDG-LIVE-01]。  ，   [data:geometry/buildings.geojson#BLDG-LIVE-02]。AI 场景：24h 公共客厅、开源发布厅、人才生活管家、近校成果转化、AI 生活服务样板街（场景卡 03、04、05、07）。实施依赖：校区边界、权属、首层业态。风险：生活型街区对"过度监控 / 过度商业化"敏感，所有场景必须保留人工办理与无障碍兜底 [standard:ELDERLY-SMART-TECH-PLAN-2020-45] [standard:BARRIER-FREE-ENVIRONMENT-LAW] [standard:GENERATIVE-AI-INTERIM-MEASURES]。

### 众智园 AI 自主创新加速区 — BUILD 前沿

定位：全栈自主创新 + AI 治理全球话语权。设计动作：R&D 街区 + 众智之塔作为治理展示与协作节点；清河低碳创新界面承载低碳、分布式能源与端侧算力驿站；与清河界面协同做生态与防洪条件复核 [data:geometry/public_space.geojson#PUBLIC-BUILD-01] [data:geometry/buildings.geojson#BLDG-BUILD-01] [data:geometry/buildings.geojson#BLDG-BUILD-02]。  ，   [data:geometry/green_space.geojson#GREEN-004]。AI 场景：城市智能体沙盒、AI 安全治理廊、低碳算力驿站（场景卡 06、08、11）。实施依赖：河道蓝线、能源、算力、运营主体。风险：治理话语权叙事容易"口号化"，必须以"标准制定 + 安全评测 + 模型红队"的可参观、可预约、可监管节点为载体。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

本节回应任务书 `agent.2`（全栈自主 + 5-8 个全球生态案例）与 `agent.3`（10 张场景卡 / 3 产业测试场景 / 5 类用户画像）[source:AGENT-TASKBOOK]。

### 全球案例转译

| 案例 | 地理 | 焦点 | 给海淀三元的转译 |
| --- | --- | --- | --- |
| 硅谷-斯坦福走廊 | 美国旧金山湾区 | 高校策源-资本-企业-公共监管连续转化 | 三区两翼的协议治理，避免"事后监管" |
| 波士顿 Kendall Square | 美国马萨诸塞州剑桥市 | 高校-实验室-初创-公共空间四元混合 | LIVE 客厅的 24h 公共客厅 |
| 伦敦 Knowledge Quarter | 英国伦敦 Bloomsbury–Kings Cross | 高校+文化+初创+公共空间协议治理 | 中关村科技服务翼的协议治理 |
| 特拉维夫 Startup Nation | 以色列特拉维夫 | 国防技术外溢 + 跨境资本 + 国际人才 | LIVE 与 BUILD 的人才签证与跨境要素 |
| 首尔江南 Gangnam SandBox | 韩国首尔江南区 | 区政府主导的产业测试场景 + 公共空间 | MAKE 起点（智造首发街）+ LIVE 产业测试 |
| 深圳南山-福田-罗湖 AI+ 链 | 中国深圳 | 制造-场景-政策链式部署 | MAKE 起点的制造-场景链条 |
| 班加罗尔 Whitefield IT 走廊 | 印度班加罗尔 | 跨国企业外包到本地生态的渐进式转型 | 三元叙事的渐进式分期 |
| 多伦多 MaRS Discovery District | 加拿大多伦多 | 医院+大学+初创+公共空间四方协作 | AI+ 公共健康场景的"可首发"模式 |

[depth:ecosystem_case_studies]

### 用户画像（5 类）

| 画像 | 主要需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 智源立方 24h 公共客厅、开源发布厅、夜间协作空间 | 不采集个人行为轨迹；活动数据只做聚合统计 [standard:GENERATIVE-AI-INTERIM-MEASURES] |
| 初创团队 | 低成本办公、算力入口、产品试验场 | 智造首发街、众智园 R&D 街区、端侧算力驿站 | 算力和数据服务需另行授权；财务 / 政策需另行清权 |
| 头部企业访客 | 展示、商务、国际接待、人才招聘 | 大钟寺智能终端市集、中关村科技服务翼国际路演 | 企业标识、案例、活动数据须清权 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 近校成果转化街、校区-园区慢行缝合、AI 教育体验点 | 校园数据与科研成果需授权；商业化路径需另行设计 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 京张遗址公园慢行环、社区服务嵌入、夜间分级活动 | 不将居民画像用于商业推荐；保留人工办理 [standard:ELDERLY-SMART-TECH-PLAN-2020-45] [standard:BARRIER-FREE-ENVIRONMENT-LAW] |

[depth:persona_table]

### AI 场景卡（10 张）

| # | 场景 | 区 | 空间载体 | 设计说明 |
| --- | --- | --- | --- | --- |
| 01 | 智造首发街 | MAKE | 大钟寺智造首发环 | 面向智能体、智能终端、内容消费企业的首发、首店、首展 [data:geometry/public_space.geojson#PUBLIC-MAKE-01] [data:geometry/buildings.geojson#BLDG-MAKE-01] |
| 02 | 智能终端市集 | MAKE | 大钟寺站四象限公共客厅 | 把首发环与日常消费、媒体路演、文化活动连成一片 [data:geometry/roads.geojson#ROAD-MAKE-01] |
| 03 | AI 原点 24h 公共客厅 | LIVE | 智源立方 | 24h 开放，可切换近校办公、开源协作、人才生活、街区展览 [data:geometry/buildings.geojson#BLDG-LIVE-01] [data:geometry/public_space.geojson#PUBLIC-LIVE-01] |
| 04 | 开源发布厅 | LIVE | 近校成果转化街 | 高校 + 开源 + 初创的成果发布、模型评测、小型路演 [data:geometry/buildings.geojson#BLDG-LIVE-02] |
| 05 | 人才生活管家 | LIVE | AI 生活服务样板街 | 医疗 / 教育 / 法律 / 生活缴费 AI+ 街区化，保留人工兜底 |
| 06 | 城市智能体沙盒 | BUILD | 众智园 R&D 街区 | 交通、运维、服务智能体可控测试；数据可审计、过程可中断 [data:geometry/buildings.geojson#BLDG-BUILD-01] |
| 07 | 近校成果转化 | LIVE | 近校成果转化街 | 孵化 / 展示 / 法务 / 知识产权 / 投融资 [data:geometry/public_space.geojson#PUBLIC-LIVE-02] |
| 08 | AI 安全治理廊 | BUILD | 众智之塔 | 标准制定 + 安全评测 + 模型红队的可参观、可预约节点 [data:geometry/buildings.geojson#BLDG-BUILD-01] [data:geometry/public_space.geojson#PUBLIC-BUILD-01] |
| 09 | 清河低碳创新界面 | BUILD | 清河低碳界面 + 蓝线 | 分布式能源 + 端侧算力 + 公共服务复合 [data:geometry/green_space.geojson#GREEN-004] |
| 10 | 全球 AI 活动周 | X | 一带公共空间系统 | 跨三区的可步行、可传播体验路线；具体活动以运营方年度计划为准 |

[depth:scenario_cards]

### 产业测试验证场景（3 个）

| # | 场景 | 锚点 | 数据 / 边界 | 运营主体 |
| --- | --- | --- | --- | --- |
| TS-1 | 城市智能体沙盒 | 众智园 R&D 街区 | 公开数据 + 临时授权；不接入个人隐私 | 众智园 R&D 街区运营方（待定） |
| TS-2 | AI+ 首发场景验证 | 智造首发街 | 现场采集 + 商家授权；用户匿名 | 大钟寺站四象限运营方（待定） |
| TS-3 | AI 生活服务街区 | AI 生活服务样板街 | 授权服务数据 + 监管日志 | 街区运营方（待定） |

[depth:industry_test_scenarios]

## 用地、建筑规模与拆改留方案

### 用地

用地分类依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 选取 0802 / 0702 / 1401 等代码，覆盖完整边界且无重叠 [depth:land_use_layout]。

7 个 land_use 多边形覆盖 11.4 km² 总体设计范围：3 个重点片区（LU-MAKE-01 / LU-LIVE-01 / LU-BUILD-01）+ 4 个 context 横条带（LU-CONTEXT-S-01 / LU-CONTEXT-M-01 / LU-CONTEXT-N-01 / LU-CONTEXT-T-01）[data:geometry/land_use.geojson#LU-MAKE-01] [data:geometry/land_use.geojson#LU-LIVE-01] [data:geometry/land_use.geojson#LU-BUILD-01]。

### 建筑规模与拆改留

建筑方案区分"保留 / 改造 / 试点新建"三级，不主张一次性大拆大建 [depth:retain_renovate_demolish]。

建筑基底面积由 `metrics.json` 复算 [metric:building_footprint_area_sqm] [data:geometry/buildings.geojson#BLDG-MAKE-01] [data:geometry/buildings.geojson#BLDG-LIVE-01]。  ，   [data:geometry/buildings.geojson#BLDG-LIVE-02] [data:geometry/buildings.geojson#BLDG-BUILD-01] [data:geometry/buildings.geojson#BLDG-BUILD-02]。

容积率、建筑高度、建筑密度、退线和建筑控制线等管控指标按 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 标注 `status=unknown`，待官方条件提供后复算 [metric:floor_area_ratio] [depth:development_intensity_controls]。

## 交通、轨道、市政与公共服务设施

### 交通

交通组织围绕"京张主轴 + 两翼 + 跨三区慢行"展开 [depth:traffic_rail_slow_parking]。

主轴 ROAD-SPINE 与两翼 ROAD-WING-W / ROAD-WING-E 构成骨架 [data:geometry/roads.geojson#ROAD-SPINE] [data:geometry/roads.geojson#ROAD-WING-W] [data:geometry/roads.geojson#ROAD-WING-E]。停车与非机动车按"轨道站点优先 + 公共空间嵌入式"原则；具体供给量待官方条件。

### 市政与公共服务

市政、新型基础设施、分布式能源、端侧算力与传统公共服务融合，按"轻量、可审计、可中断"原则试点 [depth:municipal_new_infrastructure]。管线、能源、排水、防洪、消防等工程资料均按 A-CONTROLS-001 登记为待补 [data:geometry/constraints.geojson#CONSTRAINTS]。

## 蓝绿空间、公共空间与城市风貌

### 蓝绿与公共空间

蓝绿空间以京张遗址公园主轴为骨架，叠加三处重点区内的社区公园与公共客厅 [depth:blue_green_public_space] [metric:green_ratio] [data:geometry/green_space.geojson#GREEN-001]。  ，   [data:geometry/green_space.geojson#GREEN-002] [data:geometry/green_space.geojson#GREEN-003] [data:geometry/green_space.geojson#GREEN-004]。

公共空间按"24h 公共客厅 + 首发环 + 治理广场"三档分级 [metric:public_space_ratio] [data:geometry/public_space.geojson#PUBLIC-MAKE-01] [data:geometry/public_space.geojson#PUBLIC-LIVE-01]。  ，   [data:geometry/public_space.geojson#PUBLIC-LIVE-02] [data:geometry/public_space.geojson#PUBLIC-BUILD-01]。

### 城市风貌与朝圣地标

城市风貌融合京张铁路历史文化 + 中关村创新文化 + AI 新文化 [depth:city_character] [depth:cultural_narrative]。3 个 AI 朝圣地标：

1. **智源立方**（LIVE）— 24h 公共客厅与 AI 原点社区客厅 [data:geometry/buildings.geojson#BLDG-LIVE-01] [data:geometry/public_space.geojson#PUBLIC-LIVE-01]。
2. **大钟寺智造环**（MAKE）— 首发环与四象限公共客厅 [data:geometry/public_space.geojson#PUBLIC-MAKE-01] [data:geometry/buildings.geojson#BLDG-MAKE-01]。
3. **众智之塔**（BUILD）— R&D 街区与 AI 安全治理廊 [data:geometry/buildings.geojson#BLDG-BUILD-01] [data:geometry/public_space.geojson#PUBLIC-BUILD-01]。

所有品牌、字体、图像、肖像、企业标识必须有清权来源 [standard:COPYRIGHT-CLEARANCE]。

## 更新项目清单、实施政策与分期计划

### 更新项目清单

| # | 项目 | 类型 | 主要依赖 | 证据 |
| --- | --- | --- | --- | --- |
| JZ-01 | 京张遗址公园慢行断点缝合 | 公共空间 / 交通 | 道路红线、桥下空间 | [data:geometry/roads.geojson#ROAD-SPINE] |
| JZ-02 | 众智园清河创新界面 | 蓝绿 / 产业展示 | 河道蓝线、生态、防洪 | [data:geometry/green_space.geojson#GREEN-004] |
| JZ-03 | AI 原点近校成果转化街 | 城市更新 / 产业服务 | 校区边界、权属、首层业态 | [data:geometry/buildings.geojson#BLDG-LIVE-02] |
| JZ-04 | 大钟寺站四象限步行连通 | 轨道一体化 / 慢行 | 轨道站点、道路交叉口、市政 | [data:geometry/public_space.geojson#PUBLIC-MAKE-01] |
| JZ-05 | AI 公共服务 + 端侧算力节点 | 新基建 / 公共服务 | 能源、算力、安全、运营 | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | 全球 AI 活动周公共路线 | 运营 / 品牌 | 公共空间许可、活动安全、版权 | [data:geometry/phasing.geojson#PHASE-001] |

### 分期与长期运营

分期策略以"先轻后重"为统一原则 [depth:phasing_implementation]：

- **PHASE-001（MAKE 启动 + 试点）** [data:geometry/phasing.geojson#PHASE-001]：大钟寺智造首发街 + 端侧算力试点 + 全球 AI 活动周路线（2026-2027 试点）。
- **PHASE-002（LIVE 客厅 + 中段缝合）** [data:geometry/phasing.geojson#PHASE-002]：智源立方 24h 公共客厅 + 近校成果转化街 + 京张主轴中段缝合（2027-2029 中段）。
- **PHASE-003（BUILD 前沿 + 北延）** [data:geometry/phasing.geojson#PHASE-003]：众智园 R&D 街区 + 众智之塔 + 清河低碳创新界面（2029+ 北延）。

长期运营回应任务书 `agent.6` [source:AGENT-TASKBOOK] [depth:long_term_operation]：年度活动体系包括全球 AI 活动周、开发者节、场景开放日、产业首发季 [data:geometry/phasing.geojson#PHASE-001]。品牌词以"三元 + 京张 + AI"三套系统持续运营 [depth:cultural_narrative]。开发者社区以开源发布厅 + 模型评测 + 公共数据 sandbox 承载 [data:geometry/public_space.geojson#PUBLIC-LIVE-02] [depth:developer_community]。场景开放季度轮换：智造首发 / 智能体沙盒 / 生活服务样板 [depth:scenario_open_operation]。转化路径为公共客厅 → 公共活动 → 产业测试 → 正式运营 [depth:conversion_pathway]。

运营对象、频率、责任边界、转化路径、风险均在表内；任何"政府承诺 / 已确定活动 / 已确定投资"叙事均不写入正式结论 [standard:CHARTER-CONCEPT-BOUNDARY]。

## 指标体系、面积复算与合规矩阵

![核心指标 + 证据链](assets/figures/metrics-evidence.png)

指标分三类 [depth:metrics_recalculation]：

- 第一类 = 可由提交几何直接复算的空间指标：边界面积、绿地比例、公共空间比例、建筑基底面积、分期面积、重点区数量。**全部从 GeoJSON 复算** [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio]。  ，   [metric:building_footprint_area_sqm] [metric:key_area_count]。
- 第二类 = 需官方控规或任务书附件支撑的管控指标：容积率、建筑高度、建筑密度、退线、道路红线、设施标准。**全部 `status=unknown`** [metric:floor_area_ratio] [depth:development_intensity_controls]。
- 第三类 = 需运营或产业数据持续校准的绩效指标：AI 创新指数、人才密度、产业服务满意度、慢行可达性、活动参与度、场景使用频次。**留给运营方与专业团队**。

合规矩阵覆盖公告 1.3、1.4、1.5 与 `agent_taskbook.json` 中 `agent.1`–`agent.6` 的所有必选任务 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。本节作为正文汇总，完整映射见 `compliance_matrix.json`；标准覆盖见 `standard_matrix.json`；设计深度见 `design_depth_matrix.json`。

## 风险、版权与合规说明

- **官方数据缺口**：本方案在官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` polygon 发布前，使用 `provisional_boundaries.geojson`；不得作为正式专业评分或审批依据。详见 [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002]。  ，   [data:geometry/key_areas.geojson#PROV-KEY-003] [depth:risk_missing_data]。


- **概念方案边界**：所有空间落地建议均表述为"概念建议 / 参考方案 / 可供专业团队深化研究"，不替代正式规划、不越过政府审定和法定审批 [standard:CHARTER-CONCEPT-BOUNDARY]。
- **数据合规**：公共空间场景严格遵守 [standard:GENERATIVE-AI-INTERIM-MEASURES] [standard:BARRIER-FREE-ENVIRONMENT-LAW] [standard:ELDERLY-SMART-TECH-PLAN-2020-45]；不采集个人行为轨迹；不将居民画像用于商业推荐。
- **版权与清权**：所有图片、字体、商标、肖像、企业标识、论文图像均需清权 [standard:COPYRIGHT-CLEARANCE]。
- **HTML 离线要求**：`visual/index.html` 与 `report/proposal.html` 不得加载 CDN、远程地图瓦片、外部脚本、外部字体、iframe、表单或外部 API。
- **多模态边界**：可选视频、音频、Three.js 体验属于解释层；不得冒充现场、居民意见、官方边界或实测证据。

## 参考资料

- [source:OFFICIAL-ANNOUNCEMENT] 北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》（2026-05-09）。
- [source:AGENT-TASKBOOK] `brief/site-package/agent_taskbook.json`（2026-05-18 摘录）。
- [source:SITE-PACKAGE] `brief/site-package/`（design_brief / agent_taskbook / allowed_design_space / sources / enums / ranges / schemas / standards）。
- [source:SOURCE-REGISTRY] `data/source_registry.json`（2026-08-09 维护）。
- [source:PROCESSED-FACT-PACK] `data/processed/agent_fact_pack.md`（已登记的阅读导航层）。
- 完整机器索引：`sources.json` / `metrics.json` / `compliance_matrix.json` / `standard_matrix.json` / `design_depth_matrix.json` / `self_check.json` / `geometry/*.geojson`。
