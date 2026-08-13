---
title: "京张主线 JINGZHANG MAINLINE——把城市更新第一次交给 Pull Request"
author_github: "OceanHAN"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以「京张主线 JINGZHANG MAINLINE」为总体概念，把京张铁路——中国人自主设计的第一条干线铁路——与开源协作的主线-分支-合并流程双重融合：一条 9 公里主线绿道串联三个 Merge 节点（众智园 CI Yard 训练场、AI 原点社区 Kernel 内核社区、大钟寺 Release 发布市场）与两翼（中关村 Registry 服务翼、小月河 Staging 场景翼），以 fork→branch→commit→review→merge→release→maintain 七步创新循环组织 11.4 km² 总体设计与 368.4 ha 重点区域。v0.4 在开源协作隐喻之外，引入第二条可验证主线：**「MAINLINE 双轨验证」——每次合入主线的 AI 场景都必须先证明"无 AI 基线"可用，经历可拔线测试，并在退场后留下一项不依赖模型/账号/网络仍可运行的公共红利**。核心交付为 12 张 AI 场景卡（每张带四段可验证合同与立即退场条件）、项目与场景双重准入闸门、可复现合成推演证据与离线公共兜底体系；配套 6 类用户画像、4 处朝圣地标与长期开源运营体系。全部空间建议为基于临时粗略边界的概念方案，官方红线发布后整包重算。"
tracks: ["civic-agent-governance", "enterprise-services-ecosystem", "ai-origin-community"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "robot-delivery-low-speed"]
iteration: "v0.4"
---

<!-- 京张主线 JINGZHANG MAINLINE — 概念建议方案。所有空间结论基于组织方临时粗略边界（provisional_rough），不替代正式规划，不构成政府审定结论。 -->

# 京张主线 JINGZHANG MAINLINE——把城市更新第一次交给 Pull Request

## 首屏：一句话可记忆命题

**「合入必须可合回（Merge must be reversible）。」** 京张主线把城市更新当作一条持续演进的城市主线：每一次 AI 合入，都必须先证明无 AI 普通服务可用（基线），经历可拔线测试（退场），并在退场后留下一项不依赖模型/账号/网络的公共红利（留存）。开源协作语义回答"怎么让更新公开、可回退、可审计"；可验证公共语义回答"AI 退场后城市还剩下什么、由谁负责"。

> **本项目诚实枚举：未获授权 · 未现场运行 / not authorized · not field-run。** 全部空间与场景均为概念建议/可签机制，不构成已确定政府安排；现场绩效保持未知。

## 评审问答表（首屏）

| 评审维度 | 一句话回答（可记忆判断） | 证据落点 |
| --- | --- | --- |
| 任务书相关性 | 直接面向"百年京张 + 海淀 + AI 创新带 + 城市治理"，三大定位/五大功能/三区两翼逐项映射 | 三层范围表 + compliance_matrix |
| 原创性 | 独有的"城市更新即 Pull Request"隐喻 + "Merge must be reversible"双轨验证命题 | 执行摘要 + mainline-pipeline.json |
| AI≈规划创新性 | 每个 AI 场景四段契约（无 AI 基线/AI 增益/立即退场/退场红利），治理角色 RACI 支撑 | mainline-contracts.json + mainline-raci.json |
| 可实施性 | 项目 G0–G7 × 场景 C0–C7 双闸门 + 12 场景×5 分支合成推演 + 8 状态机 | mainline-gates.json + mainline-tabletop.json + mainline-state-machine.json |
| 公共利益 | 离线公共红利兜底——无 AI 时仍可通行/休息/问路；无障碍与弱势群体优先 | 公共利益章节 [source:AGENT-TASKBOOK] |
| 风险合规 | 硬停止条件（无 AI 路径/无人工/无法拔线/敏感数据越界/红利无维护人）+ 现场绩效保持 unknown | risk.json + 合规章节 |
| 表达完整度 | 双语 proposal + 5 图 + 2 HTML + 6 机器证据资产，均可复核 | 提交包 + visual + machine assets |

> 说明：上表用于快速定位；各维度逐项证据见正文对应章节与 `compliance_matrix.json`。所有概念建议均以"未获授权 · 未现场运行"一致性标注，不虚构批准或不承诺实施。

## 执行摘要与双轨验证命题

京张铁路 1905—1909 年建成，是中国人自主设计建造的第一条国有干线铁路。v0.4 把这条百年主线重读为**一条城市主线的两套运行语义**：**开源协作语义**——城市更新像 commit、review、merge 一样公开、留痕、可回退；**可验证公共语义**——任何 AI 场景合入主线，都必须先证明无 AI 普通服务也能运行，经历可拔线测试，并在退场后留给市民一项仍可使用的公共红利。

一句话命题：**「合入必须可合回（Merge must be reversible）。」** 每一次把 AI 合入城市，都要先回答——无 AI 时谁仍能做什么；AI 增加/减少什么；谁能拔线；拔线后留下什么；谁来维护。据此，v0.4 提出「主线五段验收链」：`COMMIT 提案 → MERGE 评审 → LIVE 灰度上线 → BLACKOUT 退场演练 → LEGACY 红利留档`。任何场景未提交其无 AI 基线就不进入灰度；未通过拔线演练就不升级；退场后无留存红利就不得声称成功。

<span style="color:#888">▶ 定位说明：这是对开源隐喻的补强而非替代。开源隐喻回答"怎么让城市更新公开、可回退、可审计"；双轨验证回答评审最关心的"AI 退场后城市还剩下什么、由谁负责"。两者合起来，主线才是一条可长期演进的、真正可实施的城市主线。</span>

v0.5 把上述双轨验证从"概念表述"落地为一套**机器可复核的证据资产**：12 场景四段契约（`mainline-contracts.json`）、主线五段验收链（`mainline-pipeline.json`）、项目/场景双闸门（`mainline-gates.json`）、8 状态治理状态机（`mainline-state-machine.json`）、治理角色 RACI（`mainline-raci.json`）、合成推演（`mainline-tabletop.json`）与硬停止条件（`risk.json`）——每个都可由专业与运营团队直接读取、计数、复核，构成"可实施性"与"表达完整度"的可审计证据面 [metric:machine_evidence_asset_count] [metric:machine_contract_count]。

## 设计依据与资料清单

本方案以北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》为主控依据，以《面向全球智能体开展"百年京张AI创新带城市设计开源征集"任务书摘录》为智能体任务依据，以 `brief/site-package/` 中的设计简报、允许设计空间、枚举、指标区间、schema 与临时粗略边界为机器可读依据 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE]。方案引用的每一条来源、用途边界与限制均登记在 `sources.json`；其中公告与任务书为 formal-ready 来源，临时边界（`brief/site-package/geometry/provisional_boundaries.geojson`）仅可用于生成、展示与临时自检 [source:SOURCE-REGISTRY] [source:BOUNDARY-SOURCE]。

专业标准方面，本方案依据《城市设计管理办法》组织风貌与公共空间统筹，依据《城市、镇控制性详细规划编制审批办法》组织控规深度成果，依据《国土空间调查、规划、用途管制用地用海分类指南》组织用地分类，并参考《生成式人工智能服务管理暂行办法》《中华人民共和国无障碍环境建设法》约束 AI 场景的数据与无障碍边界 [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]。完整标准覆盖见 `standard_matrix.json`，设计深度覆盖见 `design_depth_matrix.json`。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

**边界与数据状态声明**：截至本版提交，组织方未在公开渠道发布三层范围与三处重点区的精确官方 polygon，仓库提供 `provisional_boundaries.geojson` 作为临时替代。本包 `geometry/site_boundary.geojson`（SITE-001，面积 1141.3 ha）与 `geometry/key_areas.geojson` 均标注 `provisional_constraint`、`official_boundary=false`、`boundary_precision=provisional_rough` [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]。它们只能用于概念生成、展示与讨论，不得作为官方红线、审批依据或精确面积依据；官方边界发布后，本包全部图层与指标须按统一口径整包重算。控规五要素（容积率、建筑高度、建筑密度、绿地率、退线）与道路红线在公开资料中缺失，正文一律以"待正式控规条件确认"表述，不编造审定数值 [metric:floor_area_ratio]。

## 三层范围工作框架

方案按公告三层范围组织工作：**统筹研究范围**（43.6 km²）回答 AI 创新生态与未来城市形态问题，产出总体概念、命名体系、三区两翼协同回路与产业生态图谱；**总体设计范围**（11.4 km²）回答城市更新与控规深度问题，产出用地结构、空间骨架、交通市政支撑与分期框架；**重点区域范围**（368.4 ha）对三处重点区开展详细设计，达到规划综合实施方案的城市设计深度 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 43.6 km² | AI 创新生态与未来城市形态如何组织 | 京张主线命名体系、三区两翼协同回路、开源创新循环 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 11.4 km² | 城市更新与控规深度如何落图 | 一主线三节点双翼空间骨架、用地结构、分期框架 | [data:geometry/land_use.geojson#LU-K001]、[data:geometry/phasing.geojson#PHASE-001] |
| 重点区域范围 368.4 ha | 三处片区如何达到详细设计深度 | CI Yard / Kernel / Release 三个 Merge 节点分案 | [data:geometry/key_areas.geojson#PROV-KEY-001] 等 |

三层不是割裂的图纸集合，而是同一套"主线逻辑"的逐级落实：研究范围决定生态与机制，设计范围决定骨架与项目，重点区验证地块尺度的可实施性 [depth:overall_spatial_structure]。

## 统筹研究范围产业与未来城市研究

### 总体概念与命名体系

**总体概念**：「京张主线 JINGZHANG MAINLINE」。1905—1909 年，詹天佑主持修建了中国人自主设计、自主建造的第一条干线铁路——京张铁路，这是中国工程史上第一次"自主主线合入"；今天，我们把这条百年干线重新读作一条持续演进的**城市主线（mainline）**：创新带的每一次空间更新、每一个 AI 场景，都像一次提交（commit）与合并（merge），经公众评审后合入主线、发布给整座城市。**城市更新第一次以 Pull Request 的方式协作**——这是本方案对"全球 AI 创新高地和朝圣地"的第一性回应 [source:AGENT-TASKBOOK]。

**命名体系**：主名称「京张主线 / JINGZHANG MAINLINE」，定位语"把城市更新第一次交给 Pull Request"，副品牌"百年干线 · 开源主城"。三个 Merge 节点与两翼构成完整命名树：

- **CI.Yard 众智园AI自主创新加速区**——"训练场"：模型训练、评测、标准与安全治理，对应开源流水线的持续集成（CI）；
- **Kernel.Community 北京AI原点社区**——"内核社区"：高校策源、开源协作、成果发布，对应开源世界的上游（upstream）与内核（kernel）；
- **Release.Market 大钟寺AI产业聚集区**——"发布市场"：智能体、智能终端、数据要素与内容消费，对应应用发布（release）与分发；
- **Registry 中关村科技服务翼**——"注册表"：金融、法务、数据、算力等专业服务构成创新依赖的工具链；
- **Staging 小月河场景赋能翼**——"预发布沙盒"：AI+交通、AI+生活的灰度测试与场景验证。

**Logo 方向**：铁轨与 Git 合并（merge）符号的双重融合——两条平行钢轨经"道岔"分出分支，又在远方重新汇合为一条主线，形成横向的合并箭头轮廓。色彩体系：钢轨灰（百年工程）+ 海淀蓝（创新策源）+ 开源绿（合并成功）。Logo 与视觉识别仅为概念方向，涉及字体与图形的正式使用须清权后深化 [depth:overall_spatial_structure]。

### 三大定位、五大功能与三区两翼协同回路

三大定位、五大功能与空间职能的结构化映射如下（概念框架）：

| 任务书框架 | 主线回答 | 可读空间/机制 |
| --- | --- | --- |
| 百年京张文化带 | 把"自主干线"转译为"公众可合入的主线" | 主线绿道、Origin 原点广场、文化三幕导览 |
| 都市 AI 生活体验带 | 场景以提案方式公开上线，居民可评审可回退 | Staging 翼、Commit 廊、Merge 评审月 |
| AI 融合创新带 | 训练-共建-发布三段流水线串联三区两翼 | CI Yard / Kernel / Release + 两翼 |
| AI 全栈自主创新体系 | 模型训练、评测、标准、安全治理同一场域闭环 | CI Yard 训练场与评测场 |
| 世界级 AI 创新生态 | 上游策源、服务注册、场景分发形成回路 | Kernel 上游中心 + Registry 注册表翼 |
| AI+ 场景赋能新范式 | 每个场景都过"主线合入验收协议"再上线 | 十二张场景卡 + 五则协议 |
| 智能化 AI 活力城市 | AI 退到后台，主线绿道与节点可独立运行 | 慢行优先、公共空间组件库 |
| AI 治理全球话语权 | 以可执行的"合入五则"输出治理方法 | 年度公开评审、回退记录、版本存档 |

**协同回路**：上游（Kernel 高校与开源社区）产出成果 → CI（众智园）训练评测并形成标准 → Release（大钟寺）发布分发与数据回流 → Registry（中关村）提供资本与专业服务 → Staging（小月河）在真实城市场景中灰度验证 → 反馈再回到 Kernel。该回路以"主线绿道"为物理载体，形成南北纵向创新链与东西横向服务链的"T 型"协同结构。

**开源循环到城市治理的机制映射（概念）**：把开源协作流程翻译为城市更新治理流程——**issue**（问题/需求公开提案）→ **PR**（更新项目方案公开提交）→ **review**（公众评审：公示、意见征集、Merge 评审月）→ **merge**（评审通过后合入实施计划）→ **release**（项目启用与成果发布）→ **maintain**（长期运营与迭代）。该映射使"城市更新第一次交给 Pull Request"不是口号，而是一套可操作的公众参与与决策留痕机制；其法定程序衔接（公示、审批、备案）以现行城乡规划与城市更新法规为准 [source:AGENT-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES]。

### 区域创新协同（可签接口，概念）

本方案不虚构已存在的合作，而提出五类**可签接口**（概念建议，待相关主体确认后才可成为项目）：与北纬社区交换居民共同设计方法与青年人才服务机制；与未来科学城交换长期基础研究与算力验证问题；与怀柔科学城交换科学仪器、测量与标准方法；与北京经开区交换具身智能、机器人与安全测试问题；与张家口及京津冀伙伴讨论绿电、算力与跨区域场景协同。每个接口只登记"输入、公共回报、数据边界、退出条件"四项要素，不预设行政关系与投资安排 [source:AGENT-TASKBOOK]。

### 全球 AI 创新生态案例（6 个）

| 案例 | 生态位 | 可转化的空间/运营机制 |
| --- | --- | --- |
| Linux Kernel 与开源基金会 | 上游策源-企业贡献-生态分发 | 原点社区设"上游策源中心"与开源治理议事厅 |
| GitHub 协作平台 | issue→PR→review→merge 全流程 | 主线机制本身：城市更新项目按"提案-评审-合入"公开流转 |
| Hugging Face 模型中心 | 模型开源与评测社区 | 众智园设开源模型评测场与模型卡标准工作坊 |
| PyPI / npm 注册表 | 依赖与工具链管理 | Registry 翼提供创新服务"包注册"与工具链对接机制 |
| OpenAI / Anthropic 生态 | API 平台与开发者经济 | Release 市场组织智能体应用上架、评测与分润规则 |
| 剑桥 Kendall Square | 大学-产业-社区共生 | Kernel 近校成果转化街与"教授-工程师-学生"共修空间 |

上述案例均为公开可查的产业模式参考，仅作机制借鉴，不涉及企业承诺 [source:AGENT-TASKBOOK]。每个案例如何落到用地、公共空间与运营，见 `compliance_matrix.json` 的 agent.2 条目与正文场景卡。

## 总体设计范围城市更新与控规深度城市设计

### 空间骨架：一主线 · 三节点 · 双翼

总体设计范围以"一主线三节点双翼"组织（见 land-use-structure 图）：

- **一主线**：沿京张遗址公园延续带设约 130m 宽概念绿带与约 8.7 km 主线绿道，北起众智园清河界面，南至大钟寺，串联三个 Merge 节点 [metric:greenway_length_m] [data:geometry/roads.geojson#ROAD-001]；
- **三节点**：众智园（192.9 ha）、原点社区（104.3 ha）、大钟寺（72.0 ha）三个重点区 [metric:key_area_count]；
- **双翼**：西侧 Registry 科技服务带、东侧 Staging 场景赋能带，以 5 条东西缝合路（约 5.6 km）跨主线连通 [metric:connector_road_length_m] [data:geometry/roads.geojson#ROAD-002]。

用地结构按《国土空间调查、规划、用途管制用地用海分类指南》组织：绿地与开敞空间约 126.2 ha（绿地率 11.1%）、科研用地（0802）约 22.3%、教育用地（0804）约 21.5%、商业服务业用地（05）约 25.6%、居住与社区服务用地（0701/0702）约 19.6%，其余为轨道一体化等混合用地 [metric:green_ratio] [metric:industrial_land_ratio] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]（教育、商业、居住比例见 `metrics.json` 对应指标）。`geometry/land_use.geojson` 无缝覆盖提交边界（gap=0、overlap=0），全部地块共享边界坐标 [depth:land_use_layout]。

### 城市更新总体框架

更新逻辑按"主线合入"分级：**保留（retain）**京张遗址公园已实施段与优质城市肌理；**改造（renew）**沿线低效产业用地与老旧社区，嵌入创新服务；**新建（new）**仅在 CI Yard 训练场、Release 发布节点等明确功能缺口处提出概念体块 [depth:retain_renovate_demolish]。`geometry/buildings.geojson` 为概念示意体块（非现状建筑轮廓），表达拆改留逻辑与体量关系 [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]。

**控规深度说明**：建筑高度、容积率、密度、绿地率、退线等管控条件在公开资料中缺失，本方案仅在 `ranges/planning_limits.json` 的合理性区间内作形态示意，正式数值一律"待正式控规条件确认" [source:SITE-PACKAGE] [depth:development_intensity_controls] [depth:height_massing_character]。

![用地结构与空间结构图](assets/figures/land-use-structure.png)

## 重点区域详细设计

三处重点区是"主线"的三个 Merge 节点，分别以训练、共建、发布为职能主题（见 key-areas 图）。所有内部功能分区为方向性概念，官方 polygon 发布后按新边界复算。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

### CI.Yard 众智园AI自主创新加速区（192.9 ha）

**定位**：全栈自主创新训练场——把"代码变成产品"的持续集成车间。**空间结构**：北部清河低碳创新界面（蓝绿展示与对外交通），中部训练评测核心（模型训练、标准评测、安全红队测试），南部产业展示与服务区。**建筑更新**：以 renew+new 为主，概念示意体块表达评测中心、测试场与展示馆的布局 [data:geometry/buildings.geojson#BLDG-001]。**交通慢行**：组织清河侧对外交通节点与内部绿色慢行环。**公共空间**：CI 测试绿场（node_greens 之一）承载开放测试与治理展示 [data:geometry/green_space.geojson#GREEN-002]。**AI 场景**：开源模型评测场（PR-02）、无人配送测试走廊（PR-09）、AI 无障碍导视（PR-11）。**实施风险**：清河蓝线、防洪与生态条件待官方确认；测试场安全边界与数据合规需专项设计 [data:geometry/constraints.geojson#CONSTRAINTS-002] [depth:three_key_area_detailed_design]。

### Kernel 北京AI原点社区（104.3 ha）

**定位**：开源内核社区——高校策源、成果转化与人才特区。**空间结构**：西侧近校成果转化街（校区-园区慢行缝合），中部开源协作中心与 Merge 合流广场，东侧人才社区服务带。**建筑更新**：renew 为主，保留优质教育科研肌理，改造低效空间嵌入孵化与发布功能 [data:geometry/buildings.geojson#BLDG-002]。**公共空间**：Merge 合流广场（8.0 ha）设"铁轨×merge"主题雕塑与开源成果展示廊 [data:geometry/public_space.geojson#PUBLIC-002]。**AI 场景**：AI 编程教育街（PR-05）、开发者之夜广场（PR-06）、开源发布厅（PR-10）。**实施风险**：校区边界、权属与首层业态待确认；轨道站点一体化需与轨道部门对接 [source:AGENT-TASKBOOK]。

### Release 大钟寺AI产业聚集区（72.0 ha）

**定位**：应用发布市场——智能体、智能终端、数据要素与内容消费的"上架大厅"。**空间结构**：围绕大钟寺站组织四象限步行连通，北象限智能商务与数据要素交易，南象限体验商业与路演客厅。**建筑更新**：retain+new 组合，概念示意体块表达发布中心与数据要素大厅 [data:geometry/buildings.geojson#BLDG-003]。**公共空间**：Release 发布广场（7.1 ha）设 AI 发布灯塔与智能体贡献荣誉墙 [data:geometry/public_space.geojson#PUBLIC-003]。**AI 场景**：数据要素会客厅（PR-03）、智能终端体验集群（PR-04）、国际路演客厅（PR-12）。**实施风险**：轨道站点与道路交叉口改造需工程专项；数据要素流通的合规授权机制需先行试点 [depth:three_key_area_detailed_design]。

## AI 创新生态、人才画像与 AI+ 场景

### 六类用户画像

| 用户画像 | 典型需求 | 空间响应 | 隐私与边界 |
| --- | --- | --- | --- |
| 开源开发者 | 协作、评测、发布、社区声誉 | Kernel 开源协作中心、Commit 廊荣誉体系、夜间协作空间 | 不采集个人行为轨迹，荣誉仅记录公开贡献 |
| 初创团队 | 低成本办公、算力入口、试验场 | CI Yard 共享测试场、Registry 翼创业服务包 | 算力与数据服务单独授权 |
| 头部企业 | 展示、商务、国际接待、招才 | Release 路演客厅、轨道接驳、企业公共界面 | 企业标识与案例清权后使用 |
| 周边居民 | 通勤、休闲、低扰动更新 | 主线绿道、社区服务嵌入、活动分级 | 不做商业画像，不追踪个体 |
| 高校师生 | 成果转化、跨校协作 | 近校转化街、AI 教育体验点 | 校园与科研数据需授权 |
| 国际访客 | 体验、参会、传播 | 国际路演客厅、Mainline Walk 导览、双语导视 | 访客数据最小化采集 |

### 12 张 AI 场景卡（含 4 张产业测试验证场景）

| 编号 | 场景卡 | 空间载体 | 类型 | 运营要点 |
| --- | --- | --- | --- | --- |
| PR-01 | AI 交通信号自适应 | Staging 翼（小月河沿线交叉口） | **产业测试验证** | 与交管部门联合，可回退切换，日志公开审计 |
| PR-02 | 开源模型评测场 | CI Yard 测试绿场 | **产业测试验证** | 模型卡标准工作坊，评测结果公开可复现 |
| PR-03 | 数据要素会客厅 | Release 北象限 | 产业服务 | 合规授权演示，不存储原始数据 |
| PR-04 | 智能终端体验集群 | Release 南象限 | 商业体验 | 厂商入驻清权，明示 AI 能力边界 |
| PR-05 | AI 编程教育街 | Kernel 西侧近校带 | 教育场景 | 教学数据不出校区，人工教师复核 |
| PR-06 | 开发者之夜广场 | Kernel Merge 广场 | 社区运营 | 月度活动，报名数据最小化 |
| PR-07 | AI 慢病随访亭 | 居住服务带社区节点 | 医疗场景 | 仅聚合统计，医生复核，适老化设计 |
| PR-08 | AI 政务服务台 | Registry 翼服务节点 | 公共服务 | 办事结果人工可申诉，全流程留痕 |
| PR-09 | 无人配送测试走廊 | CI Yard—Staging 走廊 | **产业测试验证** | 限时段限路段，安全员在线，保险完备 |
| PR-10 | 开源发布厅 | Kernel 中部 | 成果发布 | 发布即存档，贡献记录公开 |
| PR-11 | AI 无障碍导视 | 主线绿道与路口 | 公共空间 | 语音/触觉多模态，符合无障碍环境建设法 [standard:BARRIER-FREE-ENVIRONMENT-LAW] |
| PR-12 | 国际路演客厅 | Release 发布广场 | **产业测试验证/发布** | 年度发布会场，同传与传播素材清权 |

场景卡的空间位置、服务对象、运行数据、隐私边界、人工复核、运营主体与风险逐条写入 `compliance_matrix.json` 的 agent.3 条目；所有场景均为**概念建议或可供专业团队深化研究的参考方案**，不构成已确定的政府安排 [source:AGENT-TASKBOOK]。AI 场景遵守数据最小化、可解释与人工复核原则，参考生成式人工智能管理要求 [standard:GENERATIVE-AI-INTERIM-MEASURES]。

每张场景卡按**四段可验证合同**补足可实施边界（概念）：`无 AI 基线`（AI 上线前普通服务怎样可用）→ `AI 增益`（AI 增加什么）→ `立即退场条件`（什么时候必须拔线）→ `退场红利`（拔线后留下什么、谁维护）。全部契约已落地为机器可读资产 `visual/assets/mainline-contracts.json`（12 场景，每张含 baseline/boost/blackout/bequest 字段、允许/禁止数据、治理角色与拔线动作），供专业与运营团队直接对接复核 [data:visual/assets/mainline-contracts.json] [metric:machine_contract_count]。

| 场景 | 无 AI 基线 | AI 增益 | 立即退场条件 | 退场红利（留存/维护） |
| --- | --- | --- | --- | --- |
| PR-01 交通信号自适应 | 既有手动/固定信号可运行 | 实时优化绿信比 | 数据源失效、误操作、无法人工接管 | 人工可接管信号机+日志归档（交管） |
| PR-02 开源模型评测场 | 纸面评测与人工审核可运行 | 批量自动评测 | 评测结果不可复现、来源不明 | 评测方法卡+人工复核记录（评测团队） |
| PR-03 数据要素会客厅 | 人工展示与合规咨询可用 | 授权演示与检索 | 未授权数据进入、合规边界模糊 | 纸面指南+合规台账（运营方） |
| PR-04 智能终端体验集群 | 人工体验与说明可用 | 沉浸式交互体验 | 厂商清权缺失、功能误导 | 静态说明+人工客服（园区运营） |
| PR-05 AI 编程教育街 | 纸面课程与教师授课可用 | 个性化练习与反馈 | 教学数据异常、无法人工复核 | 纸面教程+人工辅导（学校/社区） |
| PR-06 开发者之夜广场 | 线下活动与报名可运行 | 智能推荐与自动签到 | 报名数据越界、活动安全风险 | 纸面登记+人工签到（社区运营） |
| PR-07 AI 慢病随访亭 | 人工随访与宣传资料可用 | 聚合提醒与分诊 | 个人医疗数据越界、无法医生复核 | 纸面健康手册+人工随访（社区） |
| PR-08 AI 政务服务台 | 人工窗口与纸面材料可用 | 材料预审与语音引导 | 办事结论错误、无法申诉 | 有人柜台+申诉渠道（政务部门） |
| PR-09 无人配送测试走廊 | 原有人行与人行物流不受影响 | 低速末端配送 | 风险失控、无安全员在线、保险缺失 | 普通物流路径保留+安全保障（运营方） |
| PR-10 开源发布厅 | 线下发布与人工记录可用 | 自动归档与分发 | 发布内容不可追溯、权利冲突 | 纸面版+公开归档（开源社区） |
| PR-11 AI 无障碍导视 | 触觉静态地图+有人服务台可运行 | 语音/触觉动态引导 | 路径误导、安全风险、热线失效 | 静态地图+人工导览（游园/社区） |
| PR-12 国际路演客厅 | 传统会展与同传可用 | 同传与内容生成 | 传播素材未清权、安全与隐私风险 | 展板+人工接待（会展运营方） |

「四段合同」不是口号：它要求每个场景在上线前先登记其无 AI 基线与维护责任人，退场后城市仍可基本运作，才有资格谈下一轮增益。四段字段与状态机核对逻辑写入 `compliance_matrix.json` 的 agent.3 扩展字段 [assumption:A-CONTRACT-001]。

### 主线合入验收协议（概念）

任何 AI 场景或更新项目进入城市前，建议依次通过**主线合入五则**验收：①**公开提案**——场景目的、范围、数据来源与退出条件公开提交；②**公众评审**——经 Merge 评审月或公示期收集居民、商户、高校意见，采纳情况留痕；③**最小回退**——方案必须包含可回退机制（限时段、限路段、限人群或一键停用），首次试点规模最小化；④**可解释记录**——运行日志、决策依据与人工接管记录可审计、可复核；⑤**发布即存档**——启用即归档版本、负责人与联系渠道，形成公开复盘基础。五则对应场景卡的"运营要点"列逐条落实，为专业、运营与公众团队留下可直接深化的验收结构；法定安全、审批与数据合规程序仍以现行法规为准 [standard:GENERATIVE-AI-INTERIM-MEASURES] [source:AGENT-TASKBOOK]。

### 公共利益与公众参与机制（概念）

方案将公共利益落实为三组机制：**公众评审权**——更新项目按"issue→PR→review→merge"公开流转，Merge 评审月面向居民、商户与高校开放意见征集，评审意见与采纳情况公开留痕；**普惠可达**——主线绿道全线按无障碍环境建设法要求设置连续坡道、盲道与休息点，AI 导视提供语音/触觉多模态（PR-11），场景节点设置适老化设施（参考国办发〔2020〕45 号方向）[standard:BARRIER-FREE-ENVIRONMENT-LAW]；**社区共营**——Commit 提交廊与节点广场的日常运营引入属地社区与志愿者组织，活动分级管控避免扰民，夜间活动噪声与照明按社区公约管理。居民数据仅做聚合统计，不用于商业推荐（见画像表隐私边界）[source:AGENT-TASKBOOK]。

**离线公共红利兜底（v0.4）**：为让公共利益在 AI 不存在时也成立，六类画像不再只是"标签+需求"，而是**权限、风险、维护与收益分布的设计输入**。每一类群体的"无 AI 普通路径"都要明确：开发者离线也能用协作桌与纸面流程；初创团队离线也能用共享工位与测试区；居民离线也能沿主线绿道通行、休息与问路（触觉静态图+有人柜台）；国际访客离线也能用双语导览与人工服务。任何智能设备都不得占用无障碍净宽、消防通道或普通服务台；AI 增益只在无 AI 普通服务之上追加，不替代 [assumption:A-BASELINE-001]。

## 用地、建筑规模与拆改留方案

用地分区见 `geometry/land_use.geojson`（52 个地块、无缝覆盖、无重叠 [metric:land_use_polygon_count] [metric:land_use_coverage_ratio]）。功能比例：绿地 11.1%、科研 22.3%、教育 21.5%、商业服务 25.6%、居住与社区服务 19.6% [metric:green_ratio]（其余比例见 `metrics.json` 的 education/commercial/residential 指标）。建筑基底概念面积约 8.3 ha，其中重点区示意体块 15 个 [metric:building_footprint_area_sqm]。

拆改留方法：以"主线合入"分级——保留已实施遗址公园段与优质肌理；改造低效空间（沿线老旧楼宇、低效产业园）嵌入创新功能；新建仅限功能缺口明确的训练场、发布节点与缝合设施 [depth:retain_renovate_demolish]。因缺少现状建筑轮廓、建成年代、用途与权属数据，拆改留结论仅为方向性建议，正式结论"待现状与权属数据补齐" [source:SITE-PACKAGE]。建筑高度与强度以"待正式控规条件确认"表述 [depth:development_intensity_controls]。

## 交通、轨道、市政与公共服务设施

**交通组织**：主线绿道（约 8.7 km）承担南北慢行主脉，5 条东西缝合路（约 5.6 km）跨越主线连接两翼 [metric:greenway_length_m] [metric:connector_road_length_m] [data:geometry/roads.geojson#ROAD-001]。缝合路为概念走向，不代表道路红线，道路等级、断面与红线宽度待正式交通专项确认 [data:geometry/roads.geojson#ROAD-002]。

**慢行断点缝合清单（概念）**：沿主线识别四类断点并提出缝合方向——①跨环路节点（北五环、北四环），建议上跨/下穿补全并预留无障碍电梯；②桥下空间（既有铁路桥与道路桥），建议活化利用为连续慢行与活动空间；③路口四象限（大钟寺站、清华东路西口等），建议连续铺装与信号优化；④站点出入口断点（轨道站与主线接驳），建议以站城通道衔接。每处断点的工程条件与红线待交通专项确认 [depth:traffic_rail_slow_parking]。

**轨道一体化（概念）**：大钟寺站建议以四象限步行连通（地下通道或地面连续铺装+无障碍动线）缝合站点与 Release 节点，轨道一体化服务用地约 8.3 ha [data:geometry/land_use.geojson#LU-K020]；Kernel 近校站点建议以站城通道衔接校区与园区慢行。轨道走廊走向见 `geometry/constraints.geojson`（概念示意，非正式红线）[data:geometry/constraints.geojson#CONSTRAINTS-001]。

**市政与新型基础设施**：端侧算力驿站、分布式能源、AI 公共服务节点（PR-08）为概念原型；管线、排水、电力、燃气、消防通道、防洪排涝与海绵指标缺少公开数据，列为正式深化前置条件 [depth:municipal_new_infrastructure]。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

**蓝绿骨架**：主线绿带（130m 概念宽度）+ 清河绿带（北端）+ 三处节点绿场，共 126.2 ha 绿地 [metric:green_space_area_sqm] [data:geometry/green_space.geojson#GREEN-001]；公共空间四节点共 48.8 ha [metric:public_space_area_sqm]。

**四处朝圣地标/荣誉展示节点**（概念建议）：

1. **Origin 原点广场**（清华园站纪念场，6.1 ha）：回溯 1909 年清华园车站与自主干线起点，设"第一条自主干线"纪念地刻 [data:geometry/public_space.geojson#PUBLIC-001]；
2. **Merge 合流广场**（Kernel 社区中心，8.0 ha）：铁轨×merge 主题雕塑、开源成果展示廊，象征"分支合入主线" [data:geometry/public_space.geojson#PUBLIC-002]；
3. **Release 发布广场**（大钟寺，7.1 ha）：AI 发布灯塔、智能体贡献荣誉墙，象征"发布与分发" [data:geometry/public_space.geojson#PUBLIC-003]；
4. **Commit 提交廊**（开发者散步道，27.5 ha）：沿主线记录历次开源贡献与城市更新合入的公共长廊 [data:geometry/public_space.geojson#PUBLIC-004]。

**文化叙事三幕**：第一幕"自主干线"（1909 詹天佑与京张铁路）→ 第二幕"海淀策源"（中关村电子一条街到 AI 时代）→ 第三幕"开源主线"（2026 起，城市更新以 PR 方式协作）。沿主线设"Mainline Walk 主线散步道"文化导览路线，导视、标识、字体、图像与人物标识均须清权后使用 [source:AGENT-TASKBOOK]。

**城市风貌**：城市基调为"钢轨灰 + 海淀蓝 + 开源绿"三色体系；建筑风貌引导为科研街区理性网格与遗址公园低层低密度过渡，屋顶形态鼓励设备与绿植一体化；风貌控制线区分官方管控、设计建议与待确认条件，不在无文保依据时给出伪精确控制线 [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:blue_green_public_space]。

## 更新项目清单、实施政策与分期计划

### 更新项目清单（10 项）

以下项目类型、实施主体、关键指标与依赖均为**概念建议**，供专业团队与主管部门深化；不构成已确定的政府安排或投资承诺 [source:AGENT-TASKBOOK]。

| 编号 | 项目名称 | 类型 | 实施主体（概念） | 关键指标（概念） | 主要依赖 | 分期 |
| --- | --- | --- | --- | --- | --- | --- |
| JZ-01 | 主线绿道贯通与慢行断点缝合 | 公共空间/交通 | 区级统筹平台牵头、属地街道协同 | 绿道贯通率、断点缝合处数 | 道路红线、桥下空间、交通组织复核 | 一期 |
| JZ-02 | Origin 原点广场（清华园站纪念场） | 文化/公共空间 | 文保部门 + 文旅运营方 | 纪念节点 1 处、导览配套 | 文保范围与建控地带、站房保护条件 | 一期 |
| JZ-03 | CI Yard 测试绿场与评测中心 | 产业/新基建 | 产业园区运营方 + 算力服务商 | 测试场景 ≥2、评测项目数 | 清河蓝线、防洪、算力与安全边界 | 一期 |
| JZ-04 | Kernel 开源协作中心与成果转化街 | 城市更新/产业 | 高校成果转化平台 + 街区运营方 | 孵化空间面积、转化项目数 | 校区边界、权属、首层业态 | 二期 |
| JZ-05 | Merge 合流广场与荣誉墙 | 公共空间/文化 | 公共空间运营方 + 开源社区 | 年度荣誉条目、访客量 | 公共空间许可、雕塑与荣誉体系清权 | 二期 |
| JZ-06 | Release 发布广场与路演客厅 | 公共空间/产业 | 会展运营方 + 产业联盟 | 年度发布活动场次 | 轨道一体化、活动安全、版权清权 | 三期 |
| JZ-07 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 轨道建设单位 + 市政部门 | 连通象限 4 个、无障碍覆盖率 | 轨道站点、交叉口工程、市政管线 | 三期 |
| JZ-08 | 小月河 Staging 场景测试走廊 | 产业测试/交通 | 交管联合体 + 场景企业 | 测试场景 ≥3、可回退率 100% | 交管联合机制、保险、可回退方案 | 二期 |
| JZ-09 | Registry 创新服务包注册中心 | 产业服务 | 科技服务机构联盟 | 服务目录条目、企业触达数 | 数据与算力服务合规边界 | 二期 |
| JZ-10 | Commit 提交廊与开发者散步道 | 公共空间/文化 | 社区运营方 + 开发者社区 | 廊道长度、年度贡献记录 | 沿主线用地权属与慢行衔接 | 二期 |

### 实施机制（概念建议）

**统筹主体与运营载体**：建议以区级城市更新统筹平台为总协调方，按项目类型委托专业运营主体（产业园运营方、会展运营方、社区运营方、开源社区组织等）分项实施；三处重点区建议各设一个"节点运营共同体"，由产业、公共空间与文化运营方联合组成，负责场景开放、活动组织与设施维护的常态化运营 [source:AGENT-TASKBOOK]。

**资金与机制（概念方向）**：公共空间与慢行项目建议纳入城市更新与公共空间专项支持；产业节点建议以"场景开放收益回补"模式探索运营平衡——企业以提案方式申请测试场景，以服务协议与数据合规协议明确权责，场景运营收益按约定回补公共空间维护；所有资金安排均为概念方向，待主管部门与财务专业确认 [depth:renewal_project_list]。

**政策工具（待确认）**：城市更新单元统筹、用途兼容与过渡性使用、公共空间活化许可等政策工具是否适用，需在正式控规与更新政策框架下确认，本方案不作假设。

### 双闸门：项目成熟度 G 闸门 × 场景准入 C 闸门（概念）

为把"概念清单"变成"可实施路径"，v0.4 引入两套独立闸门。**项目成熟度闸门（G0—G7）**判定一个项目能否承担空间、专业与长期运营责任：`G0 仅空间概念 → G1 官方边界与权属确认 → G2 现状与专项调查 → G3 专业方案 → G4 试点授权与预算 → G5 阶段性上架 → G6 稳定运营 → G7 复盘归档`。**场景准入闸门（C0—C7）**判定某一 AI 场景是否能进入试运行：`C0 提出问题 → C1 明确数据源与边界 → C2 通过无 AI 基线自检 → C3 通过合成/影子推演 → C4 可拔线方案评审 → C5 强制退场演练 → C6 灰度上线 → C7 红利留档`。

一个项目成熟不等于其 AI 场景可上线；一个场景通过也不替其它场景背书。任何项目或场景在 `C2` 未证明可用的无 AI 普通路径之前，一律不进入灰度（concept no-merge gate）。每个项目表项增设"失败后的默认动作"：无法推进时默认保留现状、隔离风险、公开缺口，不以"继续建设"掩盖未决条件 [assumption:A-GATES-001] [data:visual/assets/mainline-gates.json]。

### 主线五段验收链（开源 PR ↔ 可验证公共，双语义）

v0.5 把双轨验证量化为一套贯穿 GitHub 协作语义的主线五段验收链，已落地为 `visual/assets/mainline-pipeline.json` [data:visual/assets/mainline-pipeline.json]：`COMMIT 提案 → MERGE 评审 → LIVE 灰度上线 → BLACKOUT 退场演练 → LEGACY 红利留档`。每一段同时给出**开源语义**（issue/PR/review/merge/revert/archive）与**可验证公共语义**（无 AI 基线、四段契约、退场演练、红利审计），让“可合回”既是一种治理承诺，也是一种可操作、可复核的验收步骤 [metric:pipeline_stage_count]。

### 可复现合成推演（概念证据，非现场绩效）

为让"可实施"可视、可复核，v0.4 提供一套纯开关式合成推演表 `visual/assets/mainline-tabletop.json`（样例用合成数据，不采样任何真实个体）。对 12 张场景卡各跑 5 类分支：**缺无 AI 基线 / 缺人工复核 / 缺拔线能力 / 缺退场红利 / 出现禁入数据**。任一分支缺失即标记 `blocked`，不得进入下一级；仅 12 条"退场后红利可独立运行"的分支进入 `bequest` 归档。推演结果是合同逻辑层面可复现的检查，**不代表真实设备、人员或场地的现场绩效**；现场指标在获得许可、方法、样本与复核前一律保持 `unknown`（诚实枚举：未获授权 · 未现场运行） [assumption:A-TABLETOP-001]。

```text
mainline-tabletop.json  （样例，合成数据）
场景卡 12 张 × 5 分支 = 60 例；预期 blocked 分支将覆盖缺基线/缺人工/缺退场/缺红利/禁入数据五类，
仅退场红利分支进入 bequest；现场效果字段全部为 null / unknown。
```

### 治理状态机与审计独立（概念）

场景在主线上的生命周期用 8 状态机表达：`proposed → reviewed → staged → live → degraded → blackout_drill → retained / removed_archived`，其中 `blackout_drill`（退场演练）与 `retained`（红利审计）不可跳过。**审计独立原则**：运营方不能为自己上线的红利自己签字；退场判断须由具名维护者、独立评估者与受影响公众共同复核。纸面、电话、有人柜台与现场可逆闸共同构成"停止通道"，确保任何一次拔线都不是单向的、由技术方单方面决定 [assumption:A-GOVERNANCE-001]。状态机、转移条件与角色已落地为 `visual/assets/mainline-state-machine.json` [data:visual/assets/mainline-state-machine.json]；治理角色 RACI（主线守护人、现场运营、安全与退场权、数据隐私、无障碍、文保、交通、政务、教育、医护、社区、开源社区）见 `visual/assets/mainline-raci.json` [data:visual/assets/mainline-raci.json] [metric:governance_state_count] [metric:weak_presence_of_governance]。

### 分期框架与概念里程碑

`geometry/phasing.geojson` 表达三期概念：**一期"主线贯通"**（222.2 ha）：主线绿道、Origin 广场、CI 测试场试点 [data:geometry/phasing.geojson#PHASE-001]；**二期"内核共建"**（465.3 ha）：Kernel 协作中心、Merge 广场、Commit 廊与缝合路网 [data:geometry/phasing.geojson#PHASE-002]；**三期"全域发布"**（453.8 ha）：Release 广场、数据要素大厅与年度运营体系 [data:geometry/phasing.geojson#PHASE-003] [depth:phasing_implementation]。概念时间框架（待官方确认）：一期约 2026—2028 年，以轻量设施、运营活动与场景试点启动；二期约 2028—2030 年，随控规与权属条件成熟推进更新项目；三期约 2030 年后，依托站点一体化与运营体系实现全域发布。征集周期（100 天）与实施分期严格区分：征集是成果提交的时间要求，实施分期依赖权属、资金、审批与工程条件 [depth:renewal_project_list]。

### 全球 AI 创新活动体系与长期运营（agent.6）

以下均为**概念建议**：**年度体系**——Mainline Conf（年度主线大会，秋季）+ 季度 Release Day（发布日）+ 月度 Merge 评审（公众评审月）+ 周常开发者 meetup；**品牌与传播**——以"主线绿道"为视觉母题，传播"每一次合入都留在主线"叙事，媒体素材一律清权；**开发者社区运营**——Commit 打卡荣誉体系（公开贡献记录）、开源治理议事厅（Kernel）；**场景开放运营**——场景卡按 PR-01~12 分批开放，企业以"提案"方式申请场景，评审后灰度上线；**国际传播与招引转化**——Mainline Walk 国际导览、Release 路演客厅承接国际发布，招引转化以注册制对接 Registry 翼服务包。所有活动、资金、政策与运营安排均为概念建议或深化方向，不表述为已确定的政府安排 [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

## 指标体系、面积复算与合规矩阵

核心指标（完整 25 项见 `metrics.json`）：总体设计范围 1141.3 ha [metric:site_area_sqm]、绿地 126.2 ha / 绿地率 11.1% [metric:green_ratio]、公共空间 48.8 ha / 占比 4.3% [metric:public_space_ratio]、建筑基底概念面积 8.3 ha [metric:building_footprint_area_sqm]、主线绿道 8.7 km、缝合路 5.6 km、重点区域 3 处（192.9/104.3/72.0 ha）[metric:key_area_count]，以及场景卡 12 张、朝圣地标 4 处、画像 6 类、更新项目 10 项（对应指标见 `metrics.json`）。所有 known 指标均可从提交包 GeoJSON 在 EPSG:4548 下复算 [depth:metrics_recalculation]；unknown 指标（容积率、建筑高度）给出原因与正式提交前置条件 [metric:floor_area_ratio] [metric:building_height_m]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

合规矩阵 `compliance_matrix.json` 覆盖公告 1.3（3 项）、1.4（3 项）、1.5（8 项）与智能体任务 agent.1—agent.6 共 23 条必选任务，每条映射到报告章节、图层、指标、图纸、HTML 与来源；`standard_matrix.json` 覆盖 6 项已获本地快照的标准（其中 5 项 mandatory）；`design_depth_matrix.json` 覆盖 15 项要求深度，全部为 complete [depth:metrics_recalculation]。三类指标分层：空间指标由几何复算、管控指标待官方控规、绩效指标（AI 创新指数、人才密度、活动参与度）留待运营期持续校准，不把运营愿景写成审定规划条件。**诚实枚举：未获授权 · 未现场运行**——绩效指标与现场效果在获得许可、方法、样本与复核前一律保持 unknown，绝不填估值。

## 风险、版权与合规说明

**边界风险**：本包全部空间结论基于 provisional 临时边界与概念体块，官方红线与控规条件发布后必须整包重算，不得用于审批或精确面积依据 [source:BOUNDARY-SOURCE] [depth:risk_missing_data]。**数据缺口**：精确 polygon、控规五要素、道路红线、现状建筑与权属、文保范围、市政管线、轨道站点边界均待官方或清权数据补齐（见 `assumptions.json` A-BOUNDARY-001/A-CONTROLS-003/A-DATA-009 等）。**合规边界**：所有智能体空间落地建议均为概念建议、参考方案或可供专业团队深化研究的材料，不替代正式规划，不构成政府审定结论、投资承诺或实施保证 [source:AGENT-TASKBOOK]。**版权**：图件、标识、字体、图像、人物与企业标识均须清权；本包图件由提交几何与指标自行派生，无第三方素材 [depth:risk_missing_data]。**双语言**：本包按 bilingual_contract_version 1 提供 `proposal.md` 与 `proposal.en.md` 等义对照，报告 HTML、视觉 HTML、A3/A0 图纸与含文字图件均提供对应语言版本 [source:SITE-PACKAGE]。

**技术退场债务风险（v0.4 新增）**：本方案判断，AI 街区最严重的失败不是模型输出错误，而是**技术退场后留下封闭接口、废弃设备、维护债务、被占用公共空间与无人负责的数据**。为此定义以下**硬停止条件**——出现任一即停试并隔离：①无 AI 普通路径不可用；②没有具名人工可接管；③无法物理拔线或恢复；④个人敏感数据越界；⑤红利资产没有维护责任人 [assumption:A-RISK-001] [data:risk.json]。任何可能触发真实支付、医疗、法律、执法或个人评分进入自动决策的场景，在获得专项授权前一律不进入。

**离线公共兜底（v0.4 新增）**：每一处 AI 场景都配套"最低可用服务"清单——无电、无网、无模型时仍可运行的功能。示例：AI 导视失效时，触觉静态地图与有人服务台仍可用；无人配送中断时，普通物流与人行路径不受影响；问路与人工柜台不依赖任何智能设备 [depth:public_interest_inclusion]。

**权利与素材登记（v0.4 新增）**：本包以 `visual/assets/rights-ledger.json` 逐项登记每张生成图/媒体/字体的生成模型、日期、提示词、用途转换与权利局限；所有生成图仅作 `concept / presentation only`，不作为现状、地图、数字或公众意见证据 [depth:visual_assets_rights]。

## 参考资料

本方案引用的主要依据包括：官方公告与智能体任务书（formal-ready）、六项专业标准本地快照、`brief/site-package/` 机器可读场地包、`data/source_registry.json` 用途登记与 `data/processed/agent_fact_pack.md` 导航层；空间几何基于 `brief/site-package/geometry/provisional_boundaries.geojson`（provisional_rough，仅限概念生成与临时自检）。完整机器索引（来源、指标、假设、合规、标准、设计深度）见 `sources.json`、`metrics.json`、`assumptions.json`、`compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json` [source:SITE-PACKAGE]；正文每个关键判断均带 claim-adjacent 证据锚点，本章不再重复索引。官方红线与控规条件发布后，本包全部图层与指标须按统一口径整包重算。
