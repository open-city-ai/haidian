---
title: "京张人本城市操作系统：从 AI 展台到 AI 时代人的城"
author_github: "147228"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
iteration: "v0.2"
summary: "以人的尊严为底座、以机器可调用为增量、以能源气候和治理为硬约束的可回滚城市版本；v0.2 将 16 个场景接入三段发布门、人工兜底与退出证据，所有空间数值仍从临时几何重算，社会与能源绩效无实测则保持 unknown。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张人本城市操作系统

> 从 AI 展台，到 AI 时代人的城。AI 不应成为城市的主角，而应成为居民、劳动者、创业者和公共机构可审计、可拒绝、可回滚的基础能力。

## v0.2：把城市版本做成可否决的发布门

本次 v0.2 是一轮实质性证据升级，而不是对空间数值或公共排序的包装：在不改变临时边界坐标、设计面积和既有 `known` 指标的前提下，新增 16 张“空间—责任—人工兜底—资料边界—停止条件”场景卡、三段城市发布门台账，以及可访问性与用户公平审计。它把原先的“可回滚”主张落到谁可以启动研究、需要什么证据、何时必须暂停的可审阅问题上；仍只是概念建议，供专业团队深化研究。[data:geometry/phasing.geojson#PHASE-V02] [metric:version_release_count]

| 发布门 | 进入前必须先补齐 | 可核验证据 | 暂停或回滚条件 |
| --- | --- | --- | --- |
| v0.1 观察、基线与公众共识 | 资料边界、人工服务底线、异议入口 | 可理解性走读、问题与缺口台账 | 未经同意使用资料、无人工通道或排斥风险 |
| v0.2 可逆试点与独立评估 | 地点/时间/数据/责任四限定、人工接管、专业授权 | 事件复盘、授权/计量/校准资料、独立评价 | 安全事件、未授权数据、无障碍障碍或证据不足 |
| v1.0 经审查后扩展与标准外溢 | 前一版本证据、异议处理、公共利益审查 | 年度体检、release note、可复核协议草案 | 证据不可复核、权益受损或基础条件变化 |

发布门台账与每张场景卡均明确不构成许可、工程方案、投资承诺或实施结论；官方边界、权属、控规、道路、市政、蓝线和现状资料一旦补齐，须先全量重算再讨论下一版本。

## 核心概念与四项运行机制

核心概念是“人本城市操作系统”（Human City OS）：把城市空间、公共服务与 AI 代理组织成一套可观察、可拒绝、可回滚的发布系统。它不是把 AI 变成地标，也不是用自动化替代人的判断，而是把每个城市能力拆成四项可审计机制：人类优先机制保证人工服务、无障碍和拒绝权；证据发布机制把地点、时间、数据、责任和版本门绑定；空间—服务接口机制把城市 API、慢行网络、公共空间和场景卡连成可复核的服务链；退出与修复机制要求停机、撤除、数据删除、异议处理和独立复盘同时存在。[depth:phasing_implementation] [metric:version_release_count]

四项机制共同把“从 AI 展台到人的城”从价值宣言变成空间—治理—运营协议：每个试点必须回答谁能启动、谁负最终责任、公众如何拒绝、什么证据才能扩展，以及失败后如何恢复。任何未知指标继续保留 `unknown`，不由模型或案例类比补齐；任何设计分区仍是概念建议，不提升为法定用地、官方边界或实施承诺。

## 设计依据与资料清单

本方案首先服从征集公告确定的三层范围、三处重点区域与设计任务，并以面向智能体任务书的六项任务作为成果覆盖清单。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] 仓库 `source_registry` 中五项正式可用资料只支撑其允许用途；临时边界只用于生成、展示与 intake 自检，不能被提升为官方红线、精确面积或法定控制。[source:SOURCE-REGISTRY] [data:geometry/site_boundary.geojson#SITE-001]

当前公开资料缺少官方 polygon、控规指标、道路红线、权属、现状建筑、文保控制线、市政与公共服务底数。因此，方案把土地功能、建筑、道路、低空层、海绵设施和项目分期都写成“概念建议/待专业团队深化”，并把全部限制登记到 `assumptions.json`。由临时边界复算出的 11,412,825.386 平方米只用于内部一致性核验，不作为官方面积结论。[metric:site_area_sqm] [depth:existing_conditions_diagnosis]

本方案新增的就业、人才与能源事实均使用可核验一手来源。IMF 的结论是全球近 40% 就业受到 AI 暴露、发达经济体约 60%，这里的“暴露”同时包括替代与增强，不能写成失业预测；WEF 2025 雇主调查中 41% 受访雇主预计因 AI 能力扩展而缩减人员，也不是海淀本地预测。[source:IMF-AI-JOBS-2024] [source:WEF-FUTURE-JOBS-2025] 当前可核验的海淀公开口径是“约 9 万名 AI 人才”，不是 9.5 万；本方案仅把它作为身心健康与夜间服务的量级提醒，不据此推算场地人口或设施容量。[source:HD-AI-TALENT-2026]

算电口径也按现行官方文本校正：北京 2024 算力基础设施方案对新建和改扩建智算中心的表述是 PUE 一般不超过 1.25，大规模先进智算中心一般不超过 1.15；2026 年起，对超过适用 1.35 限值的数据中心执行差别电价。30% 是北京存量数据中心相应 PUE 区间的绿电使用目标，可作为本方案的设计基线，但不能冒充“新建中心法定最低比例”。[source:BJ-COMPUTE-2024] [source:BJ-DATACENTER-2024]

![总体命题与四条价值链](assets/figures/site-overview.png)

## 三层范围工作框架

43.6 平方公里统筹研究范围回答“海淀的创新势能如何外溢”；约 11.4 平方公里总体设计范围回答“人本服务、城市 API 与硬约束如何共同落入空间”；约 368.4 公顷重点区域回答“在众智园、AI 原点社区和大钟寺分别先试什么”。三层不是三套互不相干的图，而是从战略、空间到验证的同一条证据链。[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]

| 层级 | 主问题 | 本方案交付 | 不越界条件 |
| --- | --- | --- | --- |
| 统筹研究范围 | 如何形成技术、标准与知识外溢 | 六个全球案例、京津冀协同、OPC 与国际服务机制 | 不编造企业、投资额和产值 |
| 总体设计范围 | 如何从 AI 展台转为人的城市 | A/B/C/D 四条价值链、六层空间操作系统、人机双通行网络 | 不把功能带当作法定用地或道路红线 |
| 三处重点区域 | 如何以可逆试点验证 | 16 个场景节点、6 个测试验证场景、3 个版本阶段 | 未获授权不得运营，不得越过文保、交通和数据规则 |

A 组“人的尊严”包括社区保留、就业转型、数字包容和身心健康；B 组“机器可用”包括城市 API、硅基通行权、数字孪生和可逆留白；C 组把算电、气候、监管沙盒、公共数据授权与城市版本治理设为硬门槛；D 组把技术、标准、知识、OPC 与国际服务组织成势能外溢。四组分别进入场景节点、道路/绿地/用地/公共空间和可复算指标，不靠口号完成任务。[data:geometry/constraints.geojson#SC-A01] [metric:scenario_node_count]

空间关系采用“一条历史公共脊、两套通行网络、三处验证场、四条价值链、六层功能带”。京张铁路遗址公园只作为历史与公共空间叙事骨架；临时边界在图中保持低对比虚线。任何官方边界更新都触发所有设计层、图件、HTML 和指标的全量重算，而不是局部替换。[data:geometry/phasing.geojson#PHASE-V01] [depth:overall_spatial_structure]

## 统筹研究范围产业与未来城市研究

方案不把“聚集大企业”当作唯一生态答案，而把创新生态拆成六种能力：源头研究、可负担试验、可信数据、人才转型、社会接受和国际服务。大团队可以承担基础模型与平台，小团队和一人公司通过共享实验室、模型/算力服务、法务与数据授权支持进入场景；被 AI 改变岗位的劳动者通过技能再造走廊进入机器人运维、数据质量、场景运营、无障碍服务和事故复盘等新角色。[source:HD-OPC-2026] [depth:overall_spatial_structure]

六个全球案例只提炼机制，不照搬空间形态。新加坡榜鹅数字园区说明城市 API 与数字孪生可以成为可调用的区级基础设施；赫尔辛基 Kalasatama 说明真实社区、居民参与和敏捷小试比一次性“智慧城市交付”更可持续；巴塞罗那 22@ 的更新经验提醒创新区必须同步处理住房和社区关系；首尔 AI Hub 展示教育、孵化、研究与公共组织的组合；釜山 Eco Delta 把 living lab、监管沙盒、开放数据和机器人城市并列；多伦多 Quayside 的数据治理讨论则提示独立治理、责任数据使用和公共利益必须先于传感器铺设。[source:CASE-PUNGGOL] [source:CASE-KALASATAMA] [source:CASE-QUAYSIDE]

| 案例 | 可转译机制 | 京张转译 | 必须补上的护栏 |
| --- | --- | --- | --- |
| Punggol Digital District | 开放平台、API、数字孪生 | 城市 API 交换站 | 数据目录、权限、日志、退出机制 |
| Smart Kalasatama | 居民参与、敏捷试点 | v0.1-v0.2 可逆试点 | 公共问题先行，不以技术找场景 |
| Barcelona 22@ | 创新区与居住/社区并置 | 社区保留账本与小商户回迁 | 基线、资格、租约和反搬迁审计 |
| Seoul AI Hub | 教育、孵化、R&D 支撑 | 技能再造走廊与共享实验室 | 就业结果跟踪而非培训人次宣传 |
| Busan Eco Delta | living lab、沙盒、开放数据 | 小月河翼具身测试与气候模拟 | 保险、事故处置、人工接管 |
| Toronto Quayside | 独立数据治理 | 公共数据授权样板间 | 公益优先、隐私保护、第三方评估 |

外溢机制不是简单“招商”。技术外溢通过京津冀制造和应用伙伴把海淀研发形成测试接口；标准外溢把路权、数据授权、无障碍和事故复盘模板沉淀为可复用规范；知识外溢以 15 分钟碰撞圈、公开问题清单、年度 release note 和跨校社群形成可追溯知识资产。国际化服务集中于语言、医疗导航、知识产权、合规和生活支持，不虚构国际学校、医院或机构名单。[source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]

## 总体设计范围城市更新与控规深度城市设计

总体设计不是用一个巨型 AI 园区替代现有城市，而是在临时设计边界内建立六层功能操作系统：社区保留与服务、国际/OPC 服务、技能再造与公共数据学习、可逆留白、城市 API 与具身研发、无屏绿地与气候韧性。六个多边形完整覆盖提交边界且无重叠，面积和比例由同一 GeoJSON 在 EPSG:4548 下重算。[data:geometry/land_use.geojson#LU-H01] [metric:design_partition_area_sqm] [depth:land_use_layout]

社区保留支撑分区占临时边界约 18.3%，可逆留白分区占约 15.1%。这两个值是设计分区的空间代理，不是居民保留率或法定留白率；真实社区保留率必须以清权家庭基线、资格规则和后续登记计算，因此目前保持 unknown。[metric:community_retention_support_area_ratio] [metric:reversible_space_ratio] [metric:resident_retention_rate]

城市 API 层采用“目录-授权-调用-日志-审计-退出”六步协议。市政设施 Agent 只能调用最小化、分级授权的接口；涉及供水、供电、供热、交通和公共数据的调用必须保留人工接管和事故追溯。北京现行公共数据授权运营办法要求依法合规、公益优先、安全可控并设置评价与退出，本方案据此把数据要素城区从展示厅变成可审计的制度样板。[source:BJ-PUBLIC-DATA-2026] [data:geometry/constraints.geojson#ZONE-B-API]

可逆设计用模块化构件、可拆服务舱、短周期租约和 meanwhile use 化解“AI 三个月迭代、城市十年建设周期”的错配。每个试点在立项时同时提交撤除、复原与数据删除计划；v0.2 试点没有独立评估与公众复核，不得进入 v1.0 扩展。建筑高度、开发强度、拆改留和工程容量因缺官方条件全部留待专业深化。[standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:development_intensity_controls]

![六层空间操作系统](assets/figures/land-use-structure.png)

## 重点区域详细设计

众智园、AI 原点社区和大钟寺使用仓库提供的临时粗略范围，仅用于定位设计议题，不解释矩形边界。三处区域共同遵循“公共问题-受控测试-独立评价-可回滚扩展”的流程，但承担不同首要任务。[data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count] [depth:three_key_area_detailed_design]

| 重点区域 | 首要命题 | 首批空间动作 | 评价门槛 |
| --- | --- | --- | --- |
| 众智园 | 给机器用的城市能否安全进入公共环境 | 硅基通行权测试、具身智能公共测试仓、算电余热审计、标准外溢工作室 | 责任主体、保险、人工接管、能耗计量、事故公开复盘 |
| AI 原点社区 | 创新密度能否同时保护人的转型与日常生活 | 技能再造接力站、城市 API 交换站、代际共学、城市版本发布室 | 就业转化、人工服务保留、隐私最小化、居民表决 |
| 大钟寺 | 数据与国际服务能否形成可信城市接口 | 公共数据授权样板间、国际服务客厅、OPC 共享服务 | 数据授权、退出机制、无障碍、语言与合规服务审计 |

众智园的具身测试不预设自动驾驶或机器人“天然有路权”。测试路径采用与行人速度、时段、任务和风险等级绑定的临时许可；低空物流只是一条高度分层概念廊，必须在空域、噪声、坠落风险、隐私、消防与保险审查后才可能进入试点。[data:geometry/roads.geojson#ROAD-B-SILICON] [metric:silicon_right_of_way_length_m]

AI 原点社区把被替代风险劳动者而非“明星人才”放入创新链：从能力盘点、带薪培训、真实岗位试做，到机器人运维、数据质量、场景运营和人工复核，形成一条可跟踪的技能再造走廊。大钟寺则以公共数据和国际服务降低小团队合规成本；任何政策补贴或企业支持均引用现行文件，不扩写为承诺。[data:geometry/roads.geojson#ROAD-A-SKILL] [metric:skill_transition_corridor_length_m]

![三处重点区域的差异化落地](assets/figures/key-areas.png)

## AI 创新生态、人才画像与 AI+ 场景

用户画像至少覆盖六类人，并把“可拒绝 AI”视为服务权利：老住户/老人需要人工通道、熟人网络与低扰动更新；被替代风险劳动者需要可验证的岗位转型；AI 研发者需要夜间交通、24 小时基础服务和无屏恢复空间；小团队/OPC 需要按需实验室、算力与合规支持；公共服务人员需要可解释工单和人工复核；国际访客需要语言、医疗导航、知识产权和生活服务。[source:HD-AI-TALENT-2026] [depth:municipal_new_infrastructure]

| 用户画像 | 不能被牺牲的权利 | 空间/服务响应 | 验证方式 |
| --- | --- | --- | --- |
| 原住民与老人 | 留居、人工办理、隐私与熟悉关系 | 社区保留议事厅、人工柜台、代际共学 | 真实保留率待基线；人工通道可用性抽测 |
| 被替代风险劳动者 | 有收入的转型期与真实岗位路径 | 技能再造走廊、试岗工坊 | 入训-试岗-稳定就业纵向跟踪 |
| AI 从业者 | 安全夜归、健康、非屏幕休息 | 夜间安心接驳、24 小时补给、无屏绿地 | 夜间服务覆盖与匿名满意度 |
| OPC/小团队 | 低门槛设施与公平测试机会 | 共享实验室、模型/算力服务、法务数据支持 | 开放申请、冲突披露、资源使用审计 |
| 公共服务人员 | 人工最终责任与可解释工具 | 城市 API 控制台、事故复盘庭 | 人工接管演练与日志审计 |
| 国际访客/团队 | 语言、医疗、合规和生活可达 | 一站式国际服务客厅 | 多语无障碍走查，不虚构服务机构 |

16 张场景卡均写入 `constraints.geojson`，其中 A、B 各 4 项，C 5 项，D 3 项；6 项标记为测试验证场景，超过任务书最低要求。[data:geometry/constraints.geojson#SC-B01] [metric:human_first_scenario_count] [metric:machine_city_scenario_count]

v0.2 将这 16 项从目录升级为可审阅场景卡：每张卡都连接其空间锚点、建议服务对象、人工替代、资料边界、验收所需证据与停止条件。测试类场景额外执行地点、时间、数据、责任“四限定”；这不代表已具备运行条件，而是把“还缺什么”放在扩展之前。[data:geometry/constraints.geojson#SC-C03] [metric:test_validation_scenario_count]

| 卡片 | 主题 | 场景 | 空间载体 | 人工/制度护栏 |
| --- | --- | --- | --- | --- |
| SC-A01 | A | 社区保留账本 | 社区保留服务区 | 清权基线、居民同意、不得商业画像 |
| SC-A02 | A | 技能再造接力站 | 技能再造走廊 | 带薪培训与岗位结果跟踪 |
| SC-A03 | A | 人工通道与代际共学 | 公共服务厅 | 人工窗口永久保留，不强制扫码 |
| SC-A04 | A | 24 小时身心健康补给站 | 夜间接驳与无屏绿地 | 匿名使用，不采集情绪画像 |
| SC-B01 | B/测试 | 城市 API 交换站 | API 授权运行区 | 最小权限、日志、人工接管、退出 |
| SC-B02 | B/测试 | 硅基通行权测试场 | 小月河翼受控路径 | 分时限速、保险、事故处置 |
| SC-B03 | B | 可逆构件库 | 留白与 meanwhile use 区 | 同步提交撤除与复原方案 |
| SC-B04 | B/测试 | 数字孪生公共试验台 | 城市 API 区 | 合成/匿名数据优先，虚实结果校验 |
| SC-C01 | C/测试 | 算电余热审计站 | 概念建筑节点 | PUE、绿电、余热均需计量 |
| SC-C02 | C/测试 | 内涝与海绵模拟场 | 小月河翼韧性带 | 先补水文、蓝线与排水资料 |
| SC-C03 | C/测试 | 监管沙盒与事故复盘庭 | 公共治理空间 | 责任、保险、停机与公开复盘 |
| SC-C04 | C | 公共数据授权样板间 | 大钟寺数据服务区 | 公益优先、隐私保护、第三方评估 |
| SC-C05 | C | 城市版本发布室 | 原点社区公共厅 | 年度体检、公众 issue、release note |
| SC-D01 | D | OPC 共享实验室 | 共享实验与服务节点 | 开放申请，不指定供应商 |
| SC-D02 | D | 标准外溢工作室 | 众智园协作节点 | 输出可复核协议，不声称国家标准 |
| SC-D03 | D | 国际服务一站式客厅 | 大钟寺公共空间 | 多语、无障碍、合规边界 |

六个测试场景都采用“限定范围-限定时间-限定数据-限定责任”的四限定协议。测试成功不是展示效果，而是事故率、人工接管、能源、无障碍、公众接受和撤除能力共同达标；任何单一技术指标都不能自动触发扩区。[metric:test_validation_scenario_count] [depth:risk_missing_data]

## 用地、建筑规模与拆改留方案

六层功能分区采用国家用地分类子集表达，但它们仍是设计建议，不是已批用地。社区保留带使用 0702，国际与小团队服务使用 05，技能学习使用 0804，可逆留白使用 16，城市 API/研发使用 0802，无屏与韧性空间使用 1401。六个面共享边界、完整覆盖临时 SITE_BOUNDARY，无缝无叠。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-B01]

八个建筑基底只定位程序原型：社区保留服务站、技能再造工坊、适老人工通道站、城市 API 交换站、具身测试仓、算电余热审计站、OPC 共享实验室和国际服务客厅。其合计基底面积 44,160 平方米由概念 geometry 复算，但由于缺现状建筑、权属和控规，该值不能转化为建设规模或拆改留清单。[data:geometry/buildings.geojson#BLDG-A-01] [metric:building_footprint_area_sqm]

拆改留采用“先调查、再分级、后决定”：历史和社区价值高且安全可用者优先保留；可通过无障碍、节能和功能嵌入解决者优先改造；确有结构与公共安全问题者才进入专业论证；新建必须证明现有空间无法满足且可逆试点已验证。当前所有概念建筑属性均为 `pending_existing_building_survey`，不对任何真实建筑给出拆除结论。[depth:retain_renovate_demolish] [depth:height_massing_character]

反士绅化工具箱包含四件制度构件：社区保留率登记协议、小商户回迁优先顺序、施工期临时经营空间、公共收益回流社区服务。真实保留率与回迁率必须在合法、知情同意的基线上计算；本包只提交空间支撑比例，不把空间代理包装成社会结果。[metric:resident_retention_rate] [depth:development_intensity_controls]

## 交通、轨道、市政与公共服务设施

交通系统把人和机器视为两类权利主体，但人的生命安全、无障碍和拒绝权优先。人本网络包括技能再造走廊、夜间安心接驳、适老连续步行和无屏绿地；机器网络包括硅基通行权测试廊、低空物流概念分层、城市 API 节点与具身测试场。两类网络在交叉点设置可视状态、低速区、人工接管和事故停机，不以“效率最优”压倒步行者。[data:geometry/roads.geojson#ROAD-A-NIGHT] [depth:traffic_rail_slow_parking]

低空概念廊长度由 geometry 复算，但没有空域、净空、噪声、隐私、消防和航线审批资料，因此只能作为需研究的垂直功能层。硅基通行权同样不是道路权利授予，而是一个受控测试协议。任何线路都不得被图纸读成工程线位或既定运营路线。[metric:low_altitude_concept_corridor_length_m] [metric:silicon_right_of_way_length_m]

算电协同是空间设计前置门槛，不是后置机电优化。新建/改扩建智算设施需先对照北京现行 PUE 要求；本方案建议绿电占比以 30% 为初始设计基线，并用购电凭证与计量核验，但明确它不是项目法定值；余热只有在热品位、季节需求、供热管网与经济性成立时，才可接入社区能源系统。[source:BJ-COMPUTE-2024] [metric:operational_pue] [metric:green_electricity_share]

公共服务采用“双通道”：AI 辅助可以提供翻译、排队、无障碍导航和工单建议，但人工柜台、电话和现场服务持续存在。市政 Agent 只能建议，不能自行形成规划许可、停水停电、执法或个人权益决定。接口日志、权限撤销和灾备演练是设施验收内容。[source:BJ-PUBLIC-DATA-2026] [depth:municipal_new_infrastructure]

![人机双通行网络与蓝绿韧性](assets/figures/mobility-bluegreen.png)

## 蓝绿空间、公共空间与城市风貌

蓝绿系统不是 AI 展示背景，而是热浪、暴雨、心理恢复和日常交往的基础设施。小月河翼海绵韧性概念带连接模拟、巡检和公众避险信息；三个无屏静心花园要求不设置强制交互屏、广告推荐或情绪识别，给高强度脑力劳动者、老人、儿童和居民保留不被计算的空间。[data:geometry/green_space.geojson#GREEN-C-SPONGE] [metric:no_screen_green_area_sqm]

绿地总面积约 1,269,256.687 平方米、占临时边界约 11.12%；公共空间约 121,447.158 平方米、占约 1.06%。这些都是设计图层值，不是法定绿地率或公园实施面积；取得官方边界、蓝线、文保和现状绿地后必须重新生成。[metric:green_ratio] [metric:public_space_ratio] [depth:blue_green_public_space]

城市风貌以“钢轨-时间-接口”为语法：钢轨代表百年京张的连续历史，时间刻度对应城市版本，接口节点对应中关村开源文化。建筑和公共设施采用可拆、可修、可识别的构件逻辑，避免把屏幕、发光立面和企业标识当作 AI 风貌。历史资源、清华园车站旧址和公园范围在缺正式保护资料时保持保守退让。[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:height_massing_character]

三个“朝圣地标”分别是：人的版本大厅——公开城市 issue、变更与撤回；轨道接口钟——以铁路时间与算法版本并置，展示谁在何时改变了城市；无屏恢复灯塔——以树荫、风、声音和夜间安全构成非屏幕公共地标。它们均为原创概念，不使用企业商标、人物肖像或受限图像。[source:AGENT-TASKBOOK] [depth:risk_missing_data]

## 更新项目清单、实施政策与分期计划

项目采用三次城市 release，而不是一次建成：v0.1 建立基线、公众问题清单和人工服务底线；v0.2 开展可逆小试、独立评估和事故演练；v1.0 只扩展通过公共利益、能源、气候、无障碍和可回滚审查的项目。三个阶段完整覆盖临时边界，用于治理责任分区而非开发时序承诺。[data:geometry/phasing.geojson#PHASE-V02] [metric:version_release_count] [depth:phasing_implementation]

| 项目 | 版本 | 前置条件 | 停止/回滚条件 |
| --- | --- | --- | --- |
| 社区保留基线与回迁协议 | v0.1 | 居民同意、资格和隐私规则 | 无法形成可信基线则不发布比例 |
| 技能再造接力站 | v0.1 | 用工伙伴、带薪机制、岗位跟踪 | 只有培训人次、无岗位路径则整改 |
| 人工服务与代际共学 | v0.1 | 人工人员与无障碍走查 | 人工渠道不可用则停止数字迁移 |
| 无屏静心花园 | v0.1 | 绿地/文保边界核验 | 出现强制采集或广告推荐则撤除 |
| 城市 API 交换站 | v0.2 | 数据目录、权限、日志、退出 | 越权、不可解释或无人工接管则停机 |
| 硅基通行权测试 | v0.2 | 交通审查、保险、事故预案 | 安全阈值或公众接受度不达标则撤场 |
| 内涝与海绵模拟 | v0.2 | 水文、蓝线、排水和模型校准 | 未经真实事件/演练校准不得扩展 |
| 算电余热审计 | v0.2 | IT 负荷、PUE、绿电、热需求 | 无计量或无热用户则不宣称社区供热 |
| 公共数据授权样板间 | v0.2 | 依法授权、公益优先、第三方评估 | 隐私、商业秘密或退出机制不满足则关闭 |
| OPC 共享实验室 | v0.2 | 公平申请、冲突披露、资源审计 | 变成指定供应商或封闭会所则重设 |
| 标准外溢工作室 | v1.0 | 公开协议、跨区复核 | 未经验证不得称国家/行业标准 |
| 国际服务客厅 | v1.0 | 多语、医疗导航、合规服务走查 | 无实际服务能力则不得以品牌替代 |

版本治理的核心文件是 release note：列出新增、改变、撤回、事故、公众异议、数据权限和下一版本门槛。年度体检既看空间，也看居民保留、岗位转型、能源、气候、数据和人工通道。公众可以提交 issue，维护团队必须回复“接受、试验、拒绝或待资料”并说明证据。[depth:renewal_project_list] [depth:phasing_implementation]

为避免“展示即升级”，本次 v0.2 将三处概念分期面补入进入门、推进门、退出门，并把完整台账和 16 张场景卡作为离线结构化附件。它们要求把人工接管、授权、保险、计量、校准、无障碍和公众复核写成前提，而不是把任何单一技术效果当作扩区理由。[data:geometry/phasing.geojson#PHASE-V02] [standard:MOHURD-URBAN-DESIGN-MEASURES]

![v0.2 城市发布门与场景退出证据](assets/figures/release-gates.png)

长期运营形成四季节奏：春季“城市问题开源周”收集居民与服务人员问题；夏季“城市 API 与具身测试月”只做受控验证；秋季“工作转型与 OPC 共创季”连接岗位、技能和小团队；冬季“城市版本大会”发布年度体检和 release note。活动仅为概念运营机制，尚未取得任何政府审批、资金或场地承诺。[source:AGENT-TASKBOOK] [depth:renewal_project_list]

品牌名称为“Jingzhang Human City OS / 京张人本城市操作系统”。Logo 方向是一个开放括号包住一段轨道与一个人工确认点：括号代表 API 可调用，轨道代表历史连续，确认点代表人拥有最终决定权。视觉只用原创几何与系统字体，不使用企业标识或未经授权字体。[source:AGENT-TASKBOOK] [depth:risk_missing_data]

## 指标体系、面积复算与合规矩阵

所有 `known` 指标均从本包 GeoJSON 投影到 EPSG:4548 后复算；proposal、五张图、HTML 和 PDF 使用同一 `metrics.json`。空间指标的低置信度来自临时边界，并不因小数位多而提高精度。[metric:site_area_sqm] [depth:metrics_recalculation]

v0.2 的指标审计明确区分“本轮不变的空间复算值”和“仍不能替代实测的社会/运行结果”。发布门和场景证据不改变任一面积、比例、线长或 unknown 指标；后续一旦改动 geometry，必须同时重算 `metrics.json`、图件、HTML 与 PDF，不能用叙述覆盖数据。[metric:green_ratio] [metric:operational_pue]

| 指标 | 当前值 | 证据 | 解释边界 |
| --- | ---: | --- | --- |
| 临时总体设计面积 | 11,412,825.386 sqm | site_boundary | 非官方精确面积 |
| 绿地设计面积/比例 | 1,269,256.687 sqm / 11.12% | green_space | 非法定绿地率 |
| 公共空间面积/比例 | 121,447.158 sqm / 1.06% | public_space | 非实施边界 |
| 社区保留支撑分区比例 | 18.28% | land_use LU-H01 | 不是居民保留率 |
| 可逆留白比例 | 15.09% | land_use LU-B01 | 不是已批留白用地 |
| 技能再造走廊 | 由 roads 几何复算 | ROAD-A-SKILL | 非工程线位 |
| 人本/机器场景数 | 4 / 4 | constraints | 内容覆盖计数 |
| 测试验证场景数 | 6 | constraints | 不等于获批运营 |
| 城市版本数 | 3 | phasing | 治理阶段，不是建设承诺 |

居民保留率、运行 PUE、绿电占比和余热回收量保持 `unknown`：它们分别需要家庭基线、实际设施能耗、绿电凭证和热网计量。把 unknown 留在机器文件中，是为了阻止愿景被误读成绩效。[metric:operational_pue] [metric:recovered_heat_mwh]

`compliance_matrix.json` 覆盖公告 1.3、1.4、1.5 和 agent.1-agent.6 共 23 项；`standard_matrix.json` 覆盖公告、任务书与三项可正式使用的专业标准；`design_depth_matrix.json` 覆盖 15 项深度；`self_check.json` 记录四类门禁。v0.2 另附场景、发布门、用户公平、执行责任、指标复算、权利、双语与可访问性台账，便于专业团队复核而不把附表误当作实施证明。[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:metrics_recalculation]

![指标、未知与证据链](assets/figures/metrics-evidence.png)

## 风险、版权与合规说明

最大空间风险是临时边界可能改变全部面积、线路和节点位置；最大社会风险是“创新区”抬升租金并挤出居民和小商户；最大技术风险是机器路权、数据和数字孪生越过人工控制；最大能源风险是把政策目标当成实测结果；最大气候风险是没有水文资料却作行洪承诺。每项风险都有对应 assumption、停止条件和复算触发器。[source:BOUNDARY-SOURCE] [depth:risk_missing_data]

| 风险 | 当前控制 | 仍需资料/授权 |
| --- | --- | --- |
| 空间与权属 | 临时边界低对比、概念建筑不下拆改留结论 | 官方 polygon、宗地、权属、现状建筑 |
| 社区挤出 | 社区保留协议、小商户回迁、施工期临时经营 | 清权基线、租约与长期跟踪 |
| 就业转型 | 以稳定岗位而非培训人次评价 | 用工伙伴、工资和持续就业数据 |
| 机器安全 | 四限定、保险、人工接管、事故复盘 | 交通/空域/消防审查与许可 |
| 数据与隐私 | 最小权限、日志、退出、第三方评价 | 授权目录、影响评估、运营主体 |
| 算电与余热 | PUE 门槛、绿电凭证、热需求先行 | IT 负荷、节能审查、热网与计量 |
| 气候韧性 | 模拟先于工程，保持概念状态 | 河道蓝线、水文、排水、防洪资料 |

五张核心图、双语 HTML 和四份 PDF 均由本包几何与指标生成；不加载远程脚本、字体、地图瓦片、iframe、表单或跟踪。图中地图是抽象证据图，不是测绘底图。原创文字、图形、代码与布局按 `COMMUNITY-DISPLAY-ONLY` 用于本征集公共展示；官方资料和全球案例版权仍归原权利人，仅作事实引用。[source:SITE-PACKAGE] [depth:risk_missing_data]

本方案不伪造官方背书、企业名单、投资额、产值、建设规模或标准条文；不把概念节点写成获批项目；不把 PUE、绿电、保留率和就业结果写成已实现。所有需要政府、专业团队、居民或运营主体决定的事项均保留为下一版本的公开问题。[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:risk_missing_data]

## 参考资料

正式任务与空间边界以仓库本地快照和 `sources.json` 为准：官方征集公告、清权智能体任务书、城市设计管理办法、控规编制审批办法、国土空间用地分类指南，以及临时边界说明。[source:SITE-PACKAGE] [standard:MOHURD-CONTROL-DETAILED-PLANNING]

就业转型背景使用 IMF 2024 AI 与就业分析、WEF Future of Jobs 2025；算电使用北京市算力基础设施建设实施方案和存量数据中心优化工作方案；公共数据使用北京市 2026 公共数据资源授权运营管理办法；OPC 与人才量级使用海淀现行公开信息。具体 URL、访问日期、允许用途和限制全部登记在 `sources.json`。[source:IMF-AI-JOBS-2024] [source:BJ-PUBLIC-DATA-2026]

全球案例包括 JTC Punggol Digital District、Forum Virium Helsinki Smart Kalasatama、Barcelona City Council 22@、Seoul AI Hub、Korea Smart City Busan Eco Delta、Waterfront Toronto Quayside。案例只用于机制比较，不证明京张具备相同条件。[source:CASE-BARCELONA22] [source:CASE-SEOUL-AI-HUB] [source:CASE-BUSAN-EDC]

结构化证据入口：`metrics.json`（复算指标）、`assumptions.json`（未知与置信度）、`sources.json`（来源边界）、`geometry/`（空间证据）、三项矩阵（任务/标准/深度）和 `self_check.json`（四类门禁）。当官方数据更新时，城市版本发布室应将差异写入 release note，并重新运行 render、finalize 与 self-check。[data:geometry/phasing.geojson#PHASE-V10] [depth:metrics_recalculation]
