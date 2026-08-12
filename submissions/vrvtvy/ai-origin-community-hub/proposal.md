---
title: "原点服务台 ORIGIN SERVICE DESK：AI原点社区近校创新服务网络城市设计"
author_github: "vrvtvy"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以「原点服务台」为设计母题，把北京AI原点社区组织为面向全球AI科研团队、创业者与开发者的近校创新服务网络：一轴（原点服务街）三台（策源台/成长台/发布台）多窗口，让科研团队在步行一公里内完成从实验室到市场的每一步服务触达；所有空间为基于 provisional 边界的概念建议，指标可由 GeoJSON 在 EPSG:4548 下复算。"
tracks: ["ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["enterprise-service-copilot", "ai-cultural-guide", "ai-traffic-walkability"]
iteration: "v1.0"
---

# 原点服务台 ORIGIN SERVICE DESK：AI原点社区近校创新服务网络城市设计

本方案回应「百年京张AI创新带城市设计国际方案征集」，以北京AI原点社区为重点设计单元，联动众智园、大钟寺与两翼，提出面向AI产业生态的**近校创新服务网络**概念。核心判断是：世界级AI创新带的瓶颈不是缺少研发楼，而是缺少"服务"——高校科研成果在走出校门后，每一步（概念验证、产品化、融资合规、测试发布、场景落地）都需要有人接管的城市服务空间。本方案把这些服务从机构楼宇搬到街道，形成可步行、可体验、可运营的创新服务基础设施 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

所有空间、活动、政策和运营内容均为**开放共创建议 / 参考方案 / 可供专业团队深化研究的材料**，不替代正式规划，不构成政府审定、投资承诺或工程可行性结论 [depth:risk_missing_data]。

## 设计依据与资料清单

设计依据分三层：征集公告与智能体任务书确定目标和必答任务 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]；站点包、专业标准快照与公开资料登记表限定可用证据 [source:SITE-PACKAGE] [source:SOURCE-REGISTRY]；投稿自有 GeoJSON、指标、假设和矩阵构成可复算审计层 [metric:site_area_sqm] [depth:metrics_recalculation]。正文只保留与判断直接相关的锚点引用，完整来源、许可、公式和未决条件分别进入 `sources.json`、`metrics.json` 与 `assumptions.json`。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

当前官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 精确 polygon 尚未纳入公开资料包，本方案使用仓库登记的临时粗略边界（`provisional_boundaries.geojson`）生成几何与指标，所有边界标注为 `provisional_constraint`、`official_boundary=false` [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]。约 11.41 km² 的提交边界、重点区面积、绿地与公共空间比率均非官方红线或法定指标；官方几何到位后应整体替换边界、重算指标并同步重绘中英图件、HTML 与 PDF。该组织方数据缺口不阻断内容评分，但方案不得用临时数据制造精确实施结论 [depth:existing_conditions_diagnosis]。

`data/processed/agent_fact_pack.md` 作为阅读导航层，把三层范围、三处重点区、公告任务、agent.1–agent.6 和缺资料事项组织为可读索引 [source:PROCESSED-FACT-PACK]；`data/processed/missing_data_checklist.csv` 列出的 official boundary、控规、道路、权属、文保和市政缺口，统一进入 `assumptions.json` 与风险章节，不把概念建议写成审定条件 [source:SOURCE-REGISTRY]。

## 三层范围工作框架

三层范围对应三种决策尺度：43.6 km² 统筹研究范围回答产业生态与区域协同；约 11.4 km² 总体设计范围回答空间结构、城市更新与公共系统；368.4 公顷三处重点区域回答可体验场景与转化路径 [source:OFFICIAL-ANNOUNCEMENT]。本方案以北京AI原点社区（104.3 公顷，公告自北向南第二处）为主设计单元，同时为众智园、大钟寺定义可核查接口，避免把单点创意误写成整带战略 [source:AGENT-TASKBOOK] [depth:three_level_scope_framework]。

| 层级 | 核心判断 | 空间动作 | 可复核结果 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI 生态不能只靠园区招商，要靠服务链 | 建立"高校策源—服务台接管—场景验证—产业转化"链 | 服务链每环有责任主体、输入输出与退出条件 |
| 总体设计范围 | 产业、生活与遗产必须共用公共骨架 | 以遗址公园活力带、原点服务街与慢行网络组织用地与场景 | 图层可叠合、指标可重算、缺口可追踪 |
| 三处重点区 | 三个片区互补而非重复 | 众智园做全栈验证、原点社区做近校转化、大钟寺做需求验证 | 每区都有服务对象、门控指标和人工复核 |

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

### 三大定位与五大功能落地

三大定位（百年京张文化带、都市AI生活体验带、AI融合创新带）与五大功能（AI全栈自主创新体系、世界级AI创新生态、AI+场景赋能新范式、智能化AI活力城市、AI治理全球话语权）不是口号而是可交付链 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。本方案以"服务台"作为五大功能的统一交付界面：

| 官方功能 | 主要载体 | 服务台接口 | 试点验收门槛（建议） | 人工门控 |
| --- | --- | --- | --- | --- |
| AI 全栈自主创新体系 | 众智园 + 策源台 | 算力申请、测试沙盒预约、标准咨询 | 试验 100% 可复现并声明依赖许可 | 技术、伦理与安全联合复核 |
| 世界级 AI 创新生态 | 一轴三台 + 中关村科技服务翼 | 服务目录、要素台账、开放问题清单 | 每个项目明确人才、算力、数据、场景接口 | 利益冲突与来源审查 |
| AI+ 场景赋能新范式 | 原点社区 + 小月河场景赋能翼 | 场景准入、测试验证、人工复核窗口 | 每项有基线、KPI 与退出阈值 | 场景准入委员会 |
| 智能化 AI 活力城市 | 服务街、遗址公园、轨道微中心 | 24h 服务角、无障碍与多语导视 | 关键服务保留人工/离线替代 | 居民共设计与可达性测试 |
| AI 治理全球话语权 | 发布台 + 年度全球活动 | 公开规则、评测报告、申诉审计 | 高影响场景 100% 完成影响评估 | 独立伦理与公众监督席位 |

## 统筹研究范围产业与未来城市研究

### 三区两翼协同回路与命名体系

「三区两翼」采用双向回路：众智园输出工具链、标准与安全基线；原点社区把技术转译为可体验、可申诉的服务；大钟寺汇聚真实产业需求与智能原生业态测试。中关村科技服务翼输入人才、算力、专业服务与成果转化能力，小月河场景赋能翼把场景反馈、公共价值与运维问题送回三区，形成"研发—服务—验证—体验—转化—再评测"闭环 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]。

<!--AGENT1-->
命名体系：原创母品牌为「原点服务台 / ORIGIN SERVICE DESK」，下设三台子品牌 SOURCE（策源）、GROWTH（成长）、RELEASE（发布），服务窗口以编号命名（如 SD-01 总台、SD-07 算力窗口）。Logo 以"台"为母题：三条水平台面线象征实验室—服务台—市场三段旅程，叠加轨道断面的菱形符号致敬京张铁路；色彩为铁轨玄武灰、信号橙、数据青三色体系，与三台一一对应 [source:AGENT-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES]。整体品牌用于一带识别，文化导视使用独立的「轨迹—里程—时间」语法，避免把历史标识与商业品牌混为一谈。

### 8 个全球 AI 创新生态案例与本地转译

<!--AGENT2-->
案例仅提炼公开机制，不把品牌、政策、资金或绩效直接移植为本地承诺；事实范围与许可边界以 `sources.json` 为准。

| 案例 | 区位类型 | 可转译机制 | 本地落点 |
| --- | --- | --- | --- |
| 剑桥 Kendall Square（美国） | 高校周边创新区 | 园区—实验室—孵化器步行联动，转化服务前置到校门口 | 策源台近校接口、转化工坊 |
| 巴黎 Station F（法国） | 城市更新型创业园 | 一站式创业服务大厅、大企业结对、全年活动日历 | 原点服务台总台、年度活动体系 |
| 新加坡 one-north（新加坡） | 政府主导创新区 | 园区—地铁—住宅一体化，测试场与研发同区 | 服务街站点一体化、测试沙盒街 |
| 硅谷 Sand Hill Road（美国） | 风险资本集聚街 | 资本沿一条街集聚，缩短融资触达距离 | 成长台金融合规服务窗 |
| 柏林 Adlershof（德国） | 大学科技园 | 大学院所—企业—孵化器沿轴布局，共享中试设施 | 一轴三台结构、共享测试场 |
| 中关村软件园（中国北京） | 成熟科技园 | 企业服务网络、活动与人才服务成熟运营 | 服务目录与运营机制参照 |
| 清华科技园（中国北京） | 高校科技园 | 校—园联动、成果转化与创投服务 | 原点社区近校转化街 |
| 伦敦 Knowledge Quarter（英国） | 机构集聚知识区 | 机构开放日、公共讲座与公众参与机制 | 发布台开源发布与公共体验 |

### 未来城市形态：从"楼宇经济"到"服务界面"

AI 时代的新型城市形态判断：创新空间的密度不再以楼宇高度衡量，而以**服务界面的连续性与可达性**衡量。本方案在统筹研究层面提出"服务界面城市"假设——把政务、算力、数据、合规、融资、测试、展示、活动八类服务组织为沿街连续的服务界面，使创新者在步行 15 分钟内触达任意服务节点 [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]。该假设在总体设计与重点区域层面落实为服务街、三台与服务窗口网络，并以服务街长度、服务窗口数量等可复算指标进入 `metrics.json` [data:geometry/roads.geojson#ROAD-001] [data:geometry/buildings.geojson#BLDG-001]。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围达到控制性详细规划的城市设计深度，核心是"以服务功能牵引更新对象"：识别低效沿街空间与可改造建筑，把更新单元组织为服务台、服务窗口与服务庭院三类对象 [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout]。

`geometry/land_use.geojson` 完整覆盖设计边界且无重叠 [data:geometry/land_use.geojson#LU-001]：创新服务用地（0802）承载三台与高校科研带，商业服务业用地（05）承载服务街与学院路创新商业带，公园绿地（1401）承载遗址公园活力带与社区绿地，广场用地（1403）承载发布广场，居住与社区服务用地（0702/0701）承载配套生活，留白用地（16）标注待确认地块 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。`geometry/buildings.geojson` 以概念建筑基底表达服务台、工坊、服务窗与展示廊 [data:geometry/buildings.geojson#BLDG-001]，`metric:building_footprint_area_sqm` 复核建筑基底面积。

![用地结构：一轴三台的服务型用地组织](assets/figures/land-use-structure.png)

总体设计明确三个更新抓手 [depth:renewal_project_list]：
1. **沿街首层服务化**：把低效商业与闲置首层改造为服务窗口，投资轻、见效快、不涉及大规模拆改；
2. **院落织补**：利用高校与街区之间的半开放院落布置转化工坊与测试沙盒，保留既有肌理；
3. **站城服务接口**：围绕五道口站、清华东路西口组织轨道站点一体化服务。

涉及容积率、建筑高度、道路红线、退线与设施标准的内容，因官方控规条件未发布，统一记为 `status=unknown`，在 `assumptions.json` 说明待补条件与复算路径，不以 agent 推测值冒充审定指标 [depth:development_intensity_controls]。

## 重点区域详细设计

三处重点区域均须引用 `geometry/key_areas.geojson` 对应 feature 并达到规划综合实施方案的城市设计深度 [depth:three_key_area_detailed_design] [data:geometry/key_areas.geojson#PROV-KEY-001]。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

### 北京AI原点社区（主设计单元，PROV-KEY-002）

定位：**近校型成果转化与创新服务特区**。空间结构为「一轴三台多窗口」[data:geometry/key_areas.geojson#PROV-KEY-002] [depth:three_key_area_detailed_design]：

- **一轴（原点服务街）**：东西向步行服务主轴 [data:geometry/roads.geojson#ROAD-001]，串联西侧高校接口与东侧清华园车站遗址，沿街布置服务窗口，是"从校门到街区"的转化走廊；
- **策源台（SOURCE）**：西段，面向高校与科研院所，提供知识产权、实验室对接、算力申请与概念验证服务 [data:geometry/buildings.geojson#BLDG-001]；
- **成长台（GROWTH）**：中段，面向创业团队，提供孵化、融资、合规、数据与办公服务；
- **发布台（RELEASE）**：东段，面向成果发布，提供路演、开源发布、展示与场景测试，紧邻发布广场 [data:geometry/public_space.geojson#PUBLIC-001]。

### 众智园AI自主创新加速区（PROV-KEY-001）

定位：**花园型全栈自主创新街区**。以研发创新用地为主体 [data:geometry/land_use.geojson#LU-001]，强化清河界面与低碳交往环境，布置全栈测试沙盒、标准治理工作坊与安全展示节点，作为服务链的"验证端" [source:AGENT-TASKBOOK]。

### 大钟寺AI产业聚集区（PROV-KEY-003）

定位：**城市型智能经济与国际交往街区**。围绕大钟寺站组织服务枢纽与四象限步行连通 [data:geometry/public_space.geojson#PUBLIC-001]，承载智能体、智能终端、内容消费与数据要素服务，作为服务链的"需求端"。

三处重点区当前均为 provisional 粗略范围，正文结论仅作为方向性设计，官方 polygon 补齐后整包复算 [source:KEY-AREA-SOURCE] [depth:existing_conditions_diagnosis]。

## AI 创新生态、人才画像与 AI+ 场景

### 用户画像（5 类）

| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 高校科研团队 | 成果转化、专利、概念验证、算力 | 策源台近校接口、转化工坊、算力窗口 | 校园与科研数据需授权 |
| 创业团队 | 低成本办公、融资、合规、产品测试 | 成长台、金融合规窗口、测试沙盒街 | 财务与经营数据加密授权 |
| 开发者个人 | 开源协作、发布、社区声誉、夜间空间 | 发布台开源发布廊、24h 服务角 | 不采集个人行为轨迹 |
| 企业服务人员 | 场景对接、数据合规、招商展示 | 数据要素窗口、国际路演、展示廊 | 企业标识与案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 遗址公园慢行环、社区服务窗口 | 居民画像不用于商业推荐 |

### AI 场景卡（12 张，含 3 个产业测试验证场景）

| 场景卡 | 空间载体 | 服务对象 | 人工复核 | 运营主体（建议） |
| --- | --- | --- | --- | --- |
| 01 原点服务台总台 | 服务街 SD-01 | 全体 | 服务目录人工审核 | 联合运营公司 |
| 02 实验室对接窗口 | 策源台 | 高校科研团队 | 校方授权核验 | 高校技术转移中心 |
| 03 概念验证工坊 | 策源台转化庭院 | 科研团队 | 验证协议评审 | 孵化器 |
| 04 融资合规窗口 | 成长台 | 创业团队 | 资质人工复核 | 金融机构/律所 |
| 05 数据要素服务窗 | 成长台 | 企业 | 合规与授权审计 | 数据交易服务机构 |
| 06 开源发布穹顶 | 发布台 | 开发者 | 发布内容审核 | 开源社区基金会 |
| 07 测试沙盒街（测试验证场景） | 发布台东段 | 创业团队 | 测试准入与退出评审 | 测试运营机构 |
| 08 近校转化验证街（测试验证场景） | 服务街西段 | 科研团队 | 转化台账人工核验 | 成果转化中心 |
| 09 数据沙盒（测试验证场景） | 成长台数据窗 | 企业 | 数据脱敏审计 | 数据治理机构 |
| 10 AI 慢行导航 | 遗址公园活力带 | 居民/访客 | 导视可解释性复核 | 市政运营 |
| 11 24h 开发者角 | 服务街 | 开发者 | 门禁与安全复核 | 社区运营 |
| 12 场景准入智能体总台 | 发布台治理节点 | 全体 | 高影响场景人工终审 | 场景准入委员会 |

每个场景卡在正文可读，空间位置映射至 `geometry/` 图层 [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/buildings.geojson#BLDG-001]，隐私边界、人工复核与运营主体进入 `compliance_matrix.json` [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:risk_missing_data]。AI 治理遵守数据最小化、公开来源、可解释与人工复核原则，不输出未授权个人画像，不声称官方实施承诺。

## 用地、建筑规模与拆改留方案

用地分类依据国土空间用地分类公开标准表达为完整、闭合、无缝分区 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001]。建筑方案区分保留、改造、更新、新建与待确认对象 [depth:retain_renovate_demolish]：服务窗口以首层改造为主，服务台以更新+新建结合，转化工坊利用既有院落织补，不编造现状建筑拆改留结论 [data:geometry/buildings.geojson#BLDG-001]。

建筑规模与强度指标统一使用 `status=unknown` 并说明待补条件 [metric:floor_area_ratio]：官方控规、现状建筑、权属与工程条件缺失时，不得给出审定容积率、建筑高度或建设规模；可保留由本包几何复算的概念建筑基底量，但必须标注为概念建议/低置信度设计量 [depth:development_intensity_controls] [depth:height_massing_character]。

## 交通、轨道、市政与公共服务设施

交通方案回应轨道站点一体化、道路微循环、慢行断点与对外交通要求 [depth:traffic_rail_slow_parking]：原点服务街为步行主导服务主轴，慢行纵线连接三台与遗址公园绿道，南北主路维持对外交通，成府路/清华东路提供东西联络 [data:geometry/roads.geojson#ROAD-001]；五道口站（地铁13号线）与清华园车站（遗址）作为站点一体化节点 [data:geometry/public_space.geojson#PUBLIC-001]。道路红线、管线与市政条件缺失时列入假设，不把交通策略写成工程结论 [depth:municipal_new_infrastructure]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

公共服务设施以"服务界面"逻辑布局：创新服务设施沿服务街布置，人才生活服务设施嵌入社区服务用地，新型基础设施（端侧算力、分布式能源）作为待深化原型节点 [data:geometry/constraints.geojson#CONSTRAINTS]。

## 蓝绿空间、公共空间与城市风貌

蓝绿空间以京张遗址公园活力带为骨架，统筹清河、小月河与社区绿地，形成南北贯通、东西连通的步道骑行体系 [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001]；原点社区内部以服务街绿廊、社区公园与发布广场构成公共空间网络 [data:geometry/public_space.geojson#PUBLIC-001]，绿地率与公共空间率的设计意义是支撑创新交往与日常停留 [metric:green_ratio] [metric:public_space_ratio]。

<!--AGENT4-->
城市风貌融合京张铁路历史、中关村创新文化与AI新文化。本方案提出 **3 处 AI 朝圣地标与荣誉展示节点**（概念建议）[source:AGENT-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES]：
1. **原点服务台·发布穹顶**：开源发布、路演与成果首发场所，致敬清华园车站的启程意象；
2. **原点服务塔（策源灯塔）**：近校策源节点的垂直标识，象征"从论文到产品"的转化；
3. **开源贡献荣誉墙**：沿服务街设置开发者贡献展示与荣誉记录体系，纳入可持续纪念机制。

导视标识、Logo、字体、图像、人物与企业标识均须清权，不得过度娱乐化或把概念地标写成已批准建设 [depth:risk_missing_data]。

## 更新项目清单、实施政策与分期计划

更新项目清单与分期空间证据见 `geometry/phasing.geojson` [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation]：

| 项目编号 | 项目名称 | 类型 | 分期 | 主要依赖 |
| --- | --- | --- | --- | --- |
| JZ-01 | 原点服务街启动段与发布台 | 城市更新/产业服务 | 近期 2026-2028 | 首层业态、权属协调 |
| JZ-02 | 策源台与成长台起步 | 城市更新/产业服务 | 近期 2026-2028 | 高校接口、院落织补条件 |
| JZ-03 | 众智园服务节点 | 产业服务/新基建 | 中期 2028-2031 | 控规条件、算力设施 |
| JZ-04 | 大钟寺服务枢纽 | 轨道一体化/产业服务 | 中期 2028-2031 | 站点一体化、市政管线 |
| JZ-05 | 中段缝合与全域服务网络 | 蓝绿/交通/产业 | 远期 2031-2035 | 道路红线、跨环节点 |
| JZ-06 | 清河界面服务化 | 蓝绿空间/产业展示 | 远期 2031-2035 | 河道蓝线、防洪条件 |

<!--AGENT6-->
全球AI创新活动体系与长期运营（概念建议）[source:AGENT-TASKBOOK] [depth:risk_missing_data]：
- **年度活动体系**：原点开源周（发布台）、近校成果转化大会（策源台）、国际AI服务台论坛（成长台）、开发者马拉松（服务街）四类年度活动，叠加季度开放日；
- **开发者社区运营**：开源贡献墙、24h 开发者角、每周技术茶会，形成"发布—协作—荣誉"闭环；
- **场景开放运营**：测试沙盒街与数据沙盒按"准入—测试—评审—退出"机制开放，每项有责任主体与人工复核；
- **国际传播与招引转化**：以发布穹顶首发与国际路演为传播锚点，通过年度活动沉淀合作通道。
所有活动、招商、资金、政策与运营安排均表述为概念建议或深化方向，不得表述为已确定政府安排 [source:AGENT-TASKBOOK]。

## 指标体系、面积复算与合规矩阵

指标体系覆盖空间指标、管控指标与绩效指标三类 [depth:metrics_recalculation]：

| 指标 | 数值（EPSG:4548 复算） | 类型 | 来源 |
| --- | --- | --- | --- |
| 总体设计范围面积 | 11,412,825.4 m² | 空间（可复算） | [metric:site_area_sqm] |
| 绿地面积/绿地率 | 1,777,952.8 m² / 15.58% | 空间（可复算） | [metric:green_ratio] |
| 公共空间面积/公共空间率 | 306,741.7 m² / 2.69% | 空间（可复算） | [metric:public_space_ratio] |
| 概念建筑基底面积 | 608,534.9 m² | 空间（概念） | [metric:building_footprint_area_sqm] |
| 三处重点区面积 | 192.9/104.3/72.0 公顷 | 空间（provisional） | [metric:key_area_count] |
| 服务台数量 | 3 | 空间（可复算） | buildings.geojson |
| 服务窗口/场景卡 | 12 | 绩效（设计） | compliance_matrix.json |
| 容积率/建筑高度 | unknown | 管控（待官方） | [metric:floor_area_ratio] |

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

合规矩阵为任务响应性主控文件：公告 1.3、1.4、1.5 与 agent.1–agent.6 的每条必答任务均对应到章节、图层、指标、图纸、HTML、来源、假设与自检项 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。三类指标分别进入 `metrics.json`、`assumptions.json` 与 `compliance_matrix.json`，避免把运营愿景误写成审定规划条件。

## 风险、版权与合规说明

**双语言合同**：`proposal.md` 中文主稿，`proposal.en.md` 提供完整对照译文；A3/A0、HTML 与含文字图件均提供 .en 语言副本。所有图片、图纸、图标、数据与代码资产在 `sources.json` 与 `report/copyright_statement.md` 中说明来源、许可与授权状态；HTML 不加载远程脚本、远程瓦片、远程字体、iframe、表单或外部 API [depth:risk_missing_data]。

风险与缺资料清单覆盖 official boundary、key area、控规、道路、地块、建筑、文保与市政缺口（见 `missing_data_checklist.csv`），统一进入 `assumptions.json` 与自检 [source:SOURCE-REGISTRY]。本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施；AI agent 对事实、来源、版权、空间数据、指标与表达负责，维护者与专业评审可依据自检结果与合规矩阵要求返修或拒绝。

## 参考资料

1. 北京市规划和自然资源委员会海淀分局：《百年京张AI创新带城市设计国际方案征集资格预审公告》（2026-05-09）[source:OFFICIAL-ANNOUNCEMENT]
2. 中关村科学城管委会：《面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录》（2026-05-18）[source:AGENT-TASKBOOK]
3. 仓库站点包：`brief/site-package/`（design_brief、allowed_design_space、enums、ranges、schemas、provisional boundaries）[source:SITE-PACKAGE]
4. 仓库资料登记表：`data/source_registry.json` 与 `data/processed/` 事实包 [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]
5. 专业标准本地参考：`brief/site-package/standards/`（城市设计管理办法、控规编制办法、用地分类指南等）[standard:MOHURD-URBAN-DESIGN-MEASURES]
6. 全球案例公开资料：Kendall Square、Station F、one-north、Sand Hill Road、Adlershof、中关村软件园、清华科技园、Knowledge Quarter（来源与许可见 `sources.json`）
7. 完整机器索引：`sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`
