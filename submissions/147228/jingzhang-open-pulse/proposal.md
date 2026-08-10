---
title: "京张开源脉冲：一条可验证的 AI 创新公共带"
author_github: "147228"
language: "zh"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "以京张遗址公园为公共底板、三处重点区为创新节点，把每个 AI 场景变成可质询、可退出、可复算的一构件一智证里程；空间建议、普通服务和实施闸门均保留专业复核边界。"
translation_file: "proposal.en.md"
proposal_format_version: "2"
bilingual_contract_version: "1"
iteration: "v3.7"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

> **包版本说明：** 本包迭代为 v3.6；v3.3 仅指本包沿用的空间对象与图纸导出层。v3.6 延续 v3.5 的双语、版权、临时边界交接和来源边界，并把既有 S02 合成测试窗口压成可离线复演的停止—恢复演练；不改变空间对象、指标、来源等级或实施边界。

# 京张开源脉冲：一条可验证的 AI 创新公共带

> **核心判断：** 京张开源脉冲不是把 AI 装置串成展示轴，而是把京张遗址公园变成一条公共回路：三处重点区分别承担可信测试、开放转化和城市体验；每个构件都必须有普通等价服务、人工责任、正负证据、公众回执和退出决定。正文给出空间判断，GeoJSON、metrics、矩阵和 40 个闸门登记复算与审计接口；当前 gate 均为 `design_target`，只有明确标为 `PASS` 的本地 runner 才代表完成了包内结构回放。

## 一页执行摘要：公共回路与一构件一智证里程

| 评审问题 | 本方案的可读回答 | 首要核验入口 |
| --- | --- | --- |
| 任务书相关性 | 服务任务书提出的“全球人工智能产业高地”与“AI 朝圣地”目标；三层范围、三处重点区、三区两翼、三大定位、五大功能与 agent.1—agent.6 再由同一条“公共带—三核—场景—运营”链落位，区域接口保持概念建议，不写成合作承诺。[source:AGENT-TASKBOOK] | compliance_matrix.json、taskbook-crosswalk.json、regional-ecosystem.json、三层正文 |
| 原创性 | “公共回路 + 一构件一智证里程”：每个场景都要有普通等价路径、责任人、正负证据、回执与退出决定；一个构件通过不替代整条带通过。 | civic-pulse-protocol.json、proof-mile-delivery.json |
| AI 与规划创新 | AI 只做问题整理、可解释辅助和证据回传，不替代规划/采购/医疗/法律裁决；空间动作落到三站、慢行链、公共空间和受控测试窗。 | scenario-operation-matrix.json、key-area-node-plans.json |
| 可实施性 | 按“普通服务基座 → 有界样机 → 有人值守窗口 → 扩散/修复/退出”推进，八个行动包各有责任、依赖、验收和停止条件；运营保障合同把责任、保险假设、网络事件、雨洪公平和事故回退收束到同一张放行记录。 | operations-matrix.json、construction-readiness.json、visual/assets/operational-assurance-contract.json、分期章节 |
| 公共利益 | 居民、老幼残障、照护者、夜班劳动者、游客、商户、开发者和维护者都有普通路径；纸面、人工、无账号服务不可被 AI 替代。 | persona-and-inclusion-matrix.json、public-interest-audit.json |
| 风险与合规 | provisional 边界、unknown 基线、设计目标和背景论文不升级为官方红线、现状事实或审批结论；权属、消防、文保、隐私、维护、保险、网络隔离、雨洪公平或接管证据不足就停在概念层。 | sources.json、risk.json、visual/assets/operational-assurance-contract.json、v2-evidence-gate-index.json |
| 表达完整度 | 中文主稿、英文译稿、五张固定评审图、A3/A0、离线 HTML、可复算指标和三张矩阵保持同一空间/版本口径；v3.3 在不改变既有面积指标的前提下，把建筑、绿地、公共空间、场景节点、分期和待核约束拆成可回读对象。 | manifest.json、metrics.json、geometry/*.geojson、qa-readiness.json |
| 资料登记完整度 | 正文 68 个唯一 source ID 与包内 `sources.json` 的 68 条记录一一对应；其中 formal 可用 5 条、background_only 4 条、provisional-only 1 条，另有 4 条 package build-toolchain 记录和 1 条边界交叉核对背景记录，其余为仓库导航/案例/标准记录；每条记录均补齐标题、发布者/登记主体、URL/path、访问日期、authority、可用范围与禁用范围。`data/source_registry.json` 仍是 formal/provisional 用途边界，包内登记不会把 provisional 或 background 资料升级为 formal 证据。 | sources.json、data/source_registry.json、visual/assets/evidence-ledger.json、visual/assets/territorial-data-baseline.json |

## v3.3 三处重点区：空间动作先于技术名词

| 片区 | 空间问题 | 设计动作与可感知成果 | 放行边界 |
| --- | --- | --- | --- |
| 众智园 AI 自主创新加速区 | 清河界面、低碳交往、对外交通和具身智能测试不能互相挤占。 | 可信测试花园：把绿色空间、标准工作坊、产业展示、低速封闭测试庭和急停节点串成一条可回到公园的低扰动链。 | 先过排水、冬季防滑、消防、权属、数据安全和人工接管；不以 provisional polygon 代替地块条件。 |
| 北京 AI 原点社区 | 近校成果转化、人才生活、开源发布和日常安静使用需要共存。 | 开放转化街：校区—园区—社区慢行缝合，设置开源发布厅、成果/版权咨询、树荫服务湾和纸面回执点。 | 先保证无障碍、夜间安静、生活服务和人工窗口，再开放小规模活动或 AI 辅助。 |
| 大钟寺 AI 产业聚集区 | 轨道站点四象限、企业交往、商业活动与居民归家存在冲突。 | 城市体验客厅：用站城步行、四象限过街、安静链、短展和可降容国际路线组成可恢复的公共界面。 | 消防、客流、噪声、雨洪和轨道/道路协调未确认前，不承诺活动容量或实施时序。 |

三处片区分别对应 PROV-KEY-001、PROV-KEY-002、PROV-KEY-003；这些是 provisional 设计约束，不是官方红线。上述动作是概念建议，供专业团队在正式边界、权属、控规、消防、文保和市政条件到位后深化。

## v3.3 最短实施合同：每一步都有普通路径和退出

1. **复核：**锁定官方/临时几何版本、现场基线、权利与责任人；缺任一关键输入就保持 unknown。
2. **基座：**先提供实体导视、纸面地图、人工窗口、座椅/遮阴、饮水、排水和无账号求助；普通路径不能等待模型恢复。
3. **小测：**只在有人值守、限时、低速、有急停和人工接管的窗口运行；记录正面、负面、近失、投诉和分组差异。
4. **裁决：**由独立复核者比较是否保留、改造、扩散或退出；任何场景结果都不能继承给另一构件。
5. **回执：**公开版本、来源、限制、删除/撤回和维护记录；失败时冻结扩散并恢复被动服务。

**首个 90 天的建议顺序（不是已确定的实施时序）：**第 0—30 天只做 CR-01 资料/场地锁定、现场基线和权利责任清单；第 31—60 天在 CR-01 通过后做 CR-02 被动构件样机与 CR-03 风热水/生命线协调；第 61—90 天只有 CR-01—CR-03 全部通过、权利记录齐全且有人值守兜底时，才可考虑一个 CR-04 有界窗口。任一关键条件缺失，回到复核、返修或普通公共服务，不进入扩容。

**首个可复核切片：S02 低速配送机器人合成演练（只展示合同，不声称已运行）：**锚定 `geometry/roads.geojson#ROAD-001` 的 provisional 路段，单设备、单人工观察员、一个标记回位湾，明确不做真实配送、不开放公共道路；无障碍路线必须始终保持，任何行人冲突、路线阻断、急停失效、观察员失去视线或回位湾不可用都立即停止。纸面告知、可见停止状态、无数字解释和手推车/人工配送等价路径是放行前置条件；只记录合成 run ID、路线窗口、让行/急停/回位事件，不收集个人数据，当前 `result_status=not_run`、`release_decision=hold`。完整字段见 `visual/assets/example-s02-embodied-test-window.json`；它把一个可审查的空间窗口、人工权力、数据最小化和归还普通服务压缩成一条可复核记录，不代表机器人性能、公众接受或部署许可。

为避免上述记录停留在“可读合同”，本轮新增 `visual/assets/open-pulse-tabletop-contract.json`、`open-pulse-tabletop-evidence.json` 和无依赖 runner。`node visual/assets/run-open-pulse-tabletop.js --check` 只读取包内的合成 S02 记录与 4 条分支 fixture：临时路线未被专业确认、行人冲突/路宽收窄、观察员或急停不可用、以及没有现场结果的复核结束；它复演 6 项检查和 5 个回滚步骤，要求保留纸面/人工/手推车等普通等价服务、清空无障碍路线、发布 hold/withdrawal 并只删除临时 fixture 状态。为避免 runner 只查总体字符串，6 个 acceptance check 现在逐项绑定 `fixture_ids`、`scenario_ids` 或 `boundary_fields`，五个回滚步骤也各自绑定唯一 `RB` ID、fixture 和 acceptance check；runner 要求 4/4 fixtures、1/1 scenario、5/5 boundary fields、5/5 rollback steps 和唯一的 6 个 check ID 全部回接；同时把四个 fixture 状态送入确定性负回放，分别得到 hold、stop、withdraw 或 delete-temporary-state 的 `decision_class=reject_or_stop`，并加入一个普通开放路线 control replay，确认非触发输入保持 `continue_ordinary_route`，不会误拒绝。当前 evidence 为 `4/4`、`6/6`、`5/5`、`5/5`、负回放 `4/4` 和 control replay `continue`，但 `result_status=not_run`、`performance_results=null`、`operational_status=not_authorized_not_run`，所以 PASS 只证明停止、退出、恢复与非触发判别逻辑可检查，不证明机器人性能、无障碍、公众接受、值守、安全或许可 [data:visual/assets/open-pulse-tabletop-contract.json] [data:visual/assets/open-pulse-tabletop-evidence.json] [data:visual/assets/run-open-pulse-tabletop.js]。

这一协议包含 [metric:civic_pulse_stage_count] 个阶段、[metric:civic_pulse_station_count] 个站点和 [metric:proof_mile_component_count] 个构件。

它还登记 [metric:proof_mile_station_handoff_count] 个站点交接与 [metric:risk_class_count] 个风险维度；这些数量是包内记录数，不是现场绩效或审批结论。

正文按设计依据、三层范围、重点区、生态与场景、用地交通、市政蓝绿、实施、指标、风险和参考资料展开；结构化附件承载完整来源、标准、深度、数据和停止条件，正文则先说明空间判断及其可感知后果。

## 设计依据与资料清单

本 formal 方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据，并以 `brief/site-package/` 中维护的临时边界、重点区域、指标和来源清单为设计边界。任务目标、智能体任务和允许的空间动作分别回到 [source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK] 和 [source:SITE-PACKAGE]；资料用途与处理限制回到 [source:SOURCE-REGISTRY]、[source:PROCESSED-FACT-PACK]；空间边界与重点区回到 [source:BOUNDARY-SOURCE] 和 [source:KEY-AREA-SOURCE]。公告要求达到控规城市设计和综合实施方案深度，因此每个空间判断同时给出可追溯来源、可复算指标、可校验图层和可人工复核假设，而不是停留在愿景叙述。

任务与成果深度由 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]、[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 和 [standard:MOHURD-URBAN-DESIGN-MEASURES] 共同约束；控规内容回到 [standard:MOHURD-CONTROL-DETAILED-PLANNING]，用地与建筑深度回到 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]、[standard:MOHURD-ARCH-DESIGN-DEPTH-2016] 和 [depth:existing_conditions_diagnosis]。这些入口共同把文字、GeoJSON、指标、图册和 HTML 组织成一套可继续深化的空间交付。

### 1. 证据等级与决策边界

本包先判断“资料能支持什么”，再判断“空间可以怎么设计”。“已登记”只表示能够回到来源记录，不等于该资料可以支撑 formal 空间、工程或实施结论；每一层都必须同时读“可以支持”和“不能支持”。

| 证据层级 | 本包实例 | 可以支持 | 不能支持 |
| --- | --- | --- | --- |
| 任务与专业标准（formal） | 官方公告、清权任务书、规划与控规标准快照 | 任务要求、成果深度、专业原则和审阅问题 | official polygon、权属、工程条件、审批或政府承诺 |
| 已清权的来源登记 | `sources.json`、`data/source_registry.json`、公开案例与标准登记 | 来源用途、机制对照、资料责任和禁用范围 | 把案例绩效、背景统计或登记记录升级为海淀实施事实 |
| 临时空间依据（provisional） | `site_boundary.geojson`、`key_areas.geojson`、`constraints.geojson` | 概念生成、拓扑自检、相对关系和替换后的整体复算触发器 | 法定红线、地块权属、精确面积、道路红线或控规指标 |
| 包内派生设计数据 | GeoJSON、`metrics.json`、场景/分期/责任矩阵 | 可复算的概念结构、数量关系、节点动作、分期依赖和审计接口 | 现状测绘、设施容量、现场性能、居民接受度或建设许可 |
| 行政统计与开放背景 | 统计公报、交通资料、OSM/Overpass 背景筛查 | 校准问题、确定走廊级补采优先级和说明不确定性 | 走廊客流、站点 OD、需求容量、正式边界、选址或绩效目标 |
| 合成场景与论文/方法 | S02 合成桌面回放、MCDA/鲁棒性方法、行业案例机制 | 测试协议、假设、负例、人工接管和后续验证设计 | 已运行现场结果、工程安全、采购依据、预测保证或官方评分 |

审阅判定规则是：formal 结论必须回到相应的 formal 来源；provisional、background_only、design_target 和 `not_run` 只能保留原状态。包内 runner 的 `PASS` 只证明结构合同可回放，不把本地自检变成现场证据、专业签章、政府审定或竞赛分数。

资料登记表的使用边界如下：

- data/source_registry.json 登记公开、清权与临时资料的用途边界。
- 当前登记摘要：formal 可用资料 5 条，background_only 资料 4 条，provisional-only 资料 1 条，package build-toolchain 记录 4 条，另有 1 条边界交叉核对背景记录；包内 sources.json 共登记 68 条来源。
- agent 不得把 background_only 或 provisional_only 资料升级为 official boundary、法定控规、正式评分依据或政府实施承诺。

### 行政尺度数据基线：只校准问题，不分配空间

为避免“有完整审计、却没有现实问题锚点”，本版补充四条官方公开背景来源。它们全部标记为 `background_only`，只把行政尺度事实翻译成服务接口和走廊级补采问题；不进入 `metrics.json` 的空间控制、不替代现场基线，也不构成项目目标。[source:HAIDIAN-2025-STATISTICAL-BULLETIN] [source:NBS-2025-STATISTICAL-COMMUNIQUE]

交通和高校服务记录另行作为接口校准，不把市级出行比例或单次活动人数转写为空间容量、客流或参与承诺。[source:BJTRC-2026-TRANSPORT-REPORT] [source:HAIDIAN-37-UNIVERSITIES-SERVICE-NEEDS] [data:visual/assets/territorial-data-baseline.json#baseline-01-haidian-innovation-and-service]

| 事实尺度与公开观察 | 对方案的空间/运营翻译 | 明确不能推导 |
| --- | --- | --- |
| 海淀 2025 年有 92 家在区全国重点实验室、123 款备案上线大模型、每万人 599 件高价值发明专利、5.79 万项技术合同和 4053.1 亿元成交额；医疗卫生机构 1456 个、社区卫生服务中心（站）239 个。[source:HAIDIAN-2025-STATISTICAL-BULLETIN] | 三核不做泛孵化展厅：众智园优先标准/模型安全验证，AI 原点优先成果转化、权利/IP 和公共服务门诊，大钟寺优先可退出的城市体验与公开回执。 | 不证明这些资源位于京张走廊、会参与方案、形成客流或可确定设施容量；医疗数据不用于诊断或设施选址。 |
| 全国 2025 年每万人高价值发明专利 16 件、技术合同成交额 75734 亿元、研发经费 39262 亿元。[source:NBS-2025-STATISTICAL-COMMUNIQUE] | 只作为创新叙事的数量级对照，把评价重点放在验证质量、权责、负面证据和复用转化，而不是排名或增长承诺。 | 行政层级、机构归属和统计口径不可假定完全可比，不生成海淀或京张绩效目标。 |
| 北京中心城区 2025 年工作日出行约 3924 万人次，绿色出行 76.5%，轨道/公交/自行车占比分别为 15.0%/8.9%/22.3%。[source:BJTRC-2026-TRANSPORT-REPORT] | 将轨道接驳、步行和骑行放在公共界面第一位；先对最后 300—800 米做小规模、分时、有人值守和可停止测试，再考虑活动或路线扩展。 | 不提供京张站点 OD、交叉口安全、停车需求、容量或道路工程结论；OSM 与市级统计仍须由走廊实测替换。 |
| 海淀一次公开高校服务活动涉及 37 所驻区高校、约 130 名参与者。[source:HAIDIAN-37-UNIVERSITIES-SERVICE-NEEDS] | AI 原点设置预约式成果转化门诊，先覆盖实验室/特种设备安全、知识产权、资产运营和成果转化的人工与纸面接口。 | 单次活动不证明 37 所高校需求相同、已同意参与、存在固定合作关系或定义服务规模。 |

四条记录的原始链接、访问日期、统计范围、观察值、转换方式和禁用推断见 `sources.json` 与 `visual/assets/territorial-data-baseline.json`；它们把“背景事实—设计动作—数据缺口”连成可回读链，而不把行政统计伪装成空间现状。[data:visual/assets/territorial-data-baseline.json#baseline-03-transport-context]

`data/processed/agent_fact_pack.md` 是本方案的阅读导航层，不是新的权威来源。[source:PROCESSED-FACT-PACK] 只帮助 agent 组织三层范围、三处重点区和缺资料事项。

所有事实判断仍回到 [source:OFFICIAL-ANNOUNCEMENT]、[source:AGENT-TASKBOOK]、[source:SOURCE-REGISTRY]。

空间边界证据回到 [source:BOUNDARY-SOURCE] 与 [source:KEY-AREA-SOURCE]。

![总体概念与空间结构几何证据图](assets/figures/site-overview.png)

由于官方 `SITE_BOUNDARY` 或三处 `KEY_AREA` 尚未取得，本方案使用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成临时 formal 包。提交包中的 `geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均标注为 `provisional_constraint`、`official_boundary=false`，只能用于方案生成、自检、可视化和设计讨论，不能作为 official redline、审批依据、精确面积依据或法定控制结论。该组织方数据缺口本身不阻断内容评分；替换 official polygons 后，site boundary、key areas、land use、roads、green space、public space、buildings、phasing 和 metrics 均需重算。

### 临时边界交叉核对：把偏差保留为风险，不把它偷偷修成红线

仓库几何基础记录的 2026-08-08 OSM 背景核对显示：已测绘的京张铁路遗址公园与当前 `PROV-SITE-001` 相交面积为 0.00 ha、最近距离约 412.5 m，而更大的统筹研究范围覆盖该 OSM 片段。[source:PROVISIONAL-BOUNDARY-CROSSCHECK-OSM-20260808] 这不是“OSM 证明边界错误”：OSM 可能只覆盖已建段，当前 polygon 也只是按公告文字推定；因此本方案不移动边界、不把 OSM 升级为正式来源，只把差异登记为 [assumption:A-PROVISIONAL-BOUNDARY-CROSSCHECK-001] 的官方 polygon 交接风险。正式 polygon 到位后，公园关系、交通筛查、所有空间图层与指标必须整体重算。

本方案的当前可评分状态为：**临时边界，保留精度警示并待正式数据发布后复算；不阻断内容评分**。因此，正文中的空间结构、场景、项目和指标均按“可讨论、可复核、可替换官方边界后重算”的原则写入；当官方边界和重点区 polygon 更新后，必须重新生成相关空间层、指标、图纸和 HTML，不能只替换单个文件。

边界和重点区域的可读解释对应 [data:geometry/site_boundary.geojson#SITE-001] 与 [data:geometry/key_areas.geojson#PROV-KEY-001]。

面积复算回到 [metric:site_area_sqm] 与 [metric:key_area_count]；读者可以从正文回到 GeoJSON、metrics 和 sources，而不是只相信一段文字判断。

## 三层范围工作框架

方案按照公告确定的三个层次组织工作：统筹研究范围关注 43.6 平方公里的AI产业生态、战略定位、创新链和未来城市形态；总体设计范围关注 11.4 平方公里京张遗址公园周边 1-2 公里城市地区和产业区，要求形成城市更新总体框架、产业空间布局、交通市政支撑和城市风貌控制；重点区域范围关注 368.4 公顷三处详细设计地区，要求明确功能业态、建筑规模、拆改留分类、公共空间连通和交通组织。三层范围在 `compliance_matrix.json` 中逐条映射，保证公告 1.3、1.4、1.5 与 agent.1-agent.6 的必选任务都有章节、图层、指标、图纸和 HTML 证据。

三层工作框架的深度项由 [depth:three_level_scope_framework] 和 [depth:overall_spatial_structure] 约束，空间证据以 [data:geometry/site_boundary.geojson#SITE-001] 为准。

重点区回看 [data:geometry/key_areas.geojson#PROV-KEY-001]；任务依据以 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 为准，范围索引以 [source:PROCESSED-FACT-PACK] 的三层范围表为导航。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

三层工作不是互相割裂的图纸集合。统筹研究决定产业链和城市形态判断，总体设计把判断落实到更新项目、空间结构和设施承载，重点区域详细设计验证具体地块、建筑、交通、公共空间和AI应用场景的可实施性。agent 生成方案时必须先锁定当前提交采用的 official 或 provisional 边界和约束，再生成用地、建筑、道路、绿地、公共空间、分期和AI服务节点，最后从这些图层复算指标并在正文解释哪些结论仍受 provisional boundary 限制。任何无法从结构化数据复算的面积、比例、规模或项目数量，不得写入正式结论。

本方案的总体空间概念为“京张开源脉冲”：以京张遗址公园为历史与公共空间主轴，以众智园、北京AI原点社区、大钟寺三处重点片区为创新锚点，以高校、企业、社区和轨道站点为日常网络，形成“一带三核、多点场景、蓝绿慢行复合环”的空间组织。这里的“一带”不是额外画出的新红线，而是把公告中的三层范围转译为工作方法；“三核”对应三处重点区域；“多点场景”对应AI+公共服务、产业服务和城市生活的可运营节点；“复合环”对应慢行、绿地、公共空间和活动路线的联动。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI产业生态和未来城市形态如何组织 | 建立“高校策源-开源协作-企业转化-公共体验-国际传播”的创新链 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 产业空间、城市更新、交通市政和风貌如何落图 | 用地、建筑、道路、绿地、公共空间和分期图层共同表达 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出定位、空间动作、AI场景和实施依赖 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

## 统筹研究范围产业与未来城市研究

本方案把统筹研究范围组织为“高校策源—开源协作—企业转化—公共体验—国际传播”的创新链，并在 `compliance_matrix.json`、`regional-ecosystem.json` 和 `taskbook-crosswalk.json` 中把高校院所、企业、算力算法数据要素、孵化平台、科技服务、五大功能与“三区两翼”逐项挂接。命名与 logo 采用“京张开源脉冲”及并行双线、开放节点的概念系统，把百年铁路、公共空间和 AI 协作放在同一识别语法中；它是设计建议，不是商标、活动或政府背书。场景开放、视觉识别、总体空间结构和运营机制已分别落到五张评审图、场景矩阵和运营附件。本节用 [source:AGENT-TASKBOOK] 与 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 标明这些要求来自 agent 开源征集任务，而不是法定规划控制。

统筹研究并不新增伪精确红线；它通过 [standard:MOHURD-URBAN-DESIGN-MEASURES] 统筹城市风貌、公共空间和建筑布局。

产业策略回接 [data:geometry/land_use.geojson#LU-001]、[data:geometry/public_space.geojson#PUBLIC-001] 与 [depth:overall_spatial_structure]，最终落到可见、可复核的空间结构。

本方案把人工智能对工作、生活、社交、学习、交通和公共服务的影响落到可定位的功能区、节点、廊道和场景：交通与慢行落到 `roads.geojson` 和三处节点，连续绿色空间落到 `green_space.geojson`，创新服务和国际交往落到场景卡、用户画像与 `scenario-operation-matrix.json`。产业战略指标、AI 创新指数、人才密度、空间供给和 AI+ 垂直应用分别在 `metrics.json`、`assumptions.json` 和 `compliance_matrix.json` 中区分为已知、设计目标或待校准项。全球 AI 活动、开发者社区、开放场景和朝圣路线均登记为概念建议/参考方案；正文不把它们写成已确定的政府活动或实施安排。

## 总体设计范围城市更新与控规深度城市设计

本次提交按控制性详细规划的城市设计深度组织总体范围：用地层表达 [metric:land_use_polygon_count] 个不重叠的临时设计多边形，建筑层细化为 [metric:building_unit_count] 个概念单元，绿地层细化为 [metric:green_segment_count] 个连续段，公共空间层表达 [metric:public_space_polygon_count] 个公共空间室和 [metric:public_scenario_node_count] 个场景锚点；roads、constraints 和 [data:geometry/phasing.geojson#PHASE-001] 共同表达微循环、慢行、待核专业接口和分期关系。既有建筑基底、绿地率和公共空间率保持不变；更新项目清单、实施政策建议、产业功能和承载力边界则在正文与矩阵中逐项说明。`metrics.json` 从这些图层复算面积、比例、数量和版本，不把 provisional 几何升级为法定控制。

本节按照 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 把控规深度内容拆成可审查对象：[data:geometry/land_use.geojson#LU-001] 表达用地结构，[data:geometry/buildings.geojson#BLDG-001] 表达建筑基底。

[data:geometry/roads.geojson#ROAD-001] 表达交通组织，[metric:building_footprint_area_sqm] 用于复核建筑基底面积。

[depth:land_use_layout] 与 [depth:development_intensity_controls] 约束成果深度。

总体设计把轨道站点一体化、道路微循环、非机动车停放、外围停车、创新服务平台、人才生活、新型基础设施、分布式能源和端侧算力组织为可深化的空间—运营接口，并在 `constraints.geojson`、`operations-matrix.json` 和 `construction-readiness.json` 中登记责任与依赖。建筑高度、开发强度、道路红线、退线和设施标准目前均标为待正式控规条件确认；本方案不以 agent 推测值冒充审定指标。

## 重点区域详细设计

三处重点区已分别形成空间定位、节点动作、AI 场景和放行边界：众智园承担可信研发、标准治理、产业展示和低速封闭测试；AI 原点社区承担近校成果转化、开源发布、人才生活和人工服务；大钟寺承担智能终端/内容消费展示、数据要素会客和站点四象限步行连通。`key-area-node-plans.json`、五张评审图和下表共同表达功能、交通、公共空间与实施依赖；它们仍是 provisional 条件下的可深化设计，不是已批准工程方案。

三处重点区域详细设计必须引用 [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002] 和 [data:geometry/key_areas.geojson#PROV-KEY-003]。

[depth:three_key_area_detailed_design] 检查是否达到规划综合实施方案深度；若只描述“打造示范区”而没有功能、建筑、交通、公共空间和实施项目证据，应被视为未完成。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

三处重点区域必须在 `geometry/key_areas.geojson` 中出现。若仓库已提供 official polygons，应作为 `official_constraint` 使用；若 official polygons 缺失，可暂用 `provisional_constraint`，但正文、HTML、sources、assumptions 和 self_check 必须说明它不能作为正式评分或审批依据。`compliance_matrix.json` 应分别覆盖公告 1.5.3.1、1.5.3.2、1.5.3.3。设计表达应包含功能业态、建筑规模、建筑形态、拆改留分类、公共空间系统、交通组织、慢行连通和实施项目。HTML 页面应能切换查看三处重点区域，A3 文册和 A0 展板应至少包含重点片区总图、局部详图和指标说明。

| 重点片区 | 设计定位 | 空间动作 | AI产业与运营场景 | 证据引用 |
| --- | --- | --- | --- | --- |
| 众智园AI自主创新加速区 | 花园型全栈自主创新街区 | 强化清河界面、产业展示、低碳创新交往和对外交通组织；以绿色空间承载开放测试与标准治理展示 | 自主模型测试、标准制定工作坊、安全治理展示、低碳算力体验 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[depth:three_key_area_detailed_design] |
| 北京AI原点社区 | 近校型成果转化与人才社区 | 组织校区、园区、街区慢行缝合；补足成果发布、人才服务、居住生活和开源协作空间 | 开源社区、成果发布、人才特区服务、近校孵化 | [data:geometry/key_areas.geojson#PROV-KEY-002]、[source:AGENT-TASKBOOK] |
| 大钟寺AI产业聚集区 | 城市型智能经济与国际交往街区 | 围绕大钟寺站一体化、四象限步行连通、商业服务和重点企业公共环境更新 | 智能体与智能终端展示、内容消费、数据要素与国际路演 | [data:geometry/key_areas.geojson#PROV-KEY-003]、[metric:key_area_count] |

### 三处重点区的公共界面与可逆关系

三处重点区已有功能和空间动作，但普通路径、人工服务与设备后场仍需要一个能被专业团队复核的比较入口。下表只提供公共界面与可逆服务关系，不修改现有几何，不把临时重点区写成控规条件。

| 重点区 | 首层公共界面选择 | 可逆服务关系 | 首先补齐的专业证据 |
| --- | --- | --- | --- |
| 众智园 AI 自主创新加速区 | 清河开放空间、研发展示、骑行驿站与封闭测试服务分层，公共界面不暴露模型和个人数据 | 公众观察席与人工前台相邻；设备、维护和测试后场可关闭，不切断慢行主链 | 现状建筑、权属、蓝线/防洪、消防、能源和企业 OD |
| 北京 AI 原点社区 | 校区—园区—社区慢行缝合，开源发布、人才服务和人工公共入口位于可到达首层 | 纸面、电话和人工入口朝向普通路径；测试组件可拆、可暂停，居民服务不依赖数字账号 | 无障碍走查、居民/师生服务基线、权属、照护和夜间安全 |
| 大钟寺 AI 产业聚集区 | 轨道站点、四象限步行、国际路演和商业服务分区，数据展示与居民安静界面脱开 | 轨道到达、安静链和服务前台分流；活动与数据展示可撤回，不占用居民日常通行 | 站口客流、道路与路缘、消防、市政、产权和活动日组织 |

上述关系只回答先比较哪些公共性与可逆性，不回答哪里可以建设、谁拥有空间或最终空间控制参数。正式方案须在控规、测绘、产权、消防、结构、市政、交通和公众参与证据到位后由专业团队确定 [depth:height_massing_character] [depth:development_intensity_controls]。

在此之前，空间更新仍优先采用导视、公共服务台、骑行驿站、遮雨座椅、无障碍坡道和可移动设施；不据此新增道路红线、建筑增量或拆改结论 [standard:MOHURD-CONTROL-DETAILED-PLANNING]。

## AI 创新生态、人才画像与 AI+ 场景

本方案已用 `persona-and-inclusion-matrix.json` 建立 AI 人才、企业、居民、师生、游客和维护者的空间需求画像，覆盖研发办公、开源协作、成果发布、企业服务、人才居住、社交学习、消费生活、运动休闲和国际交往。十四张 AI+ 场景卡覆盖交通、服务、消费、医疗、教育、法律、公共安全、活动运营和蓝绿维护，并在 `scenario-operation-matrix.json` 中逐项登记服务对象、空间位置、数据来源、隐私边界、人工复核和运营主体。

AI 场景必须落到空间和治理边界：公共空间场景引用 [data:geometry/public_space.geojson#PUBLIC-001]，慢行与交通场景引用 [data:geometry/roads.geojson#ROAD-001]。

开放空间场景引用 [data:geometry/green_space.geojson#GREEN-001]、[metric:public_space_ratio] 和 [metric:green_ratio]。这些引用让评审者知道场景位于具体图层和指标中；场景卡、产业测试场景和用户画像另由正文与合规矩阵承接。

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

agent 生成的AI治理建议必须遵守数据最小化、公开来源、可解释和人工复核原则。城市智能体可以辅助识别慢行断点、公共空间热力、设施维护、企业服务需求和活动安全风险，但不能替代规划审批、不能输出未经授权的个人画像、不能声称获得官方实施承诺。所有AI场景节点应进入结构化图层或合规矩阵，便于评审者看到它们与产业、空间和公共利益之间的关系。

## 用地、建筑规模与拆改留方案

本次用地层依据公开分类标准形成完整、闭合、无重叠的八类临时设计分区；建筑层区分可讨论的保留、改造、更新、新建和待确认对象，并把建筑基底、功能、风貌、体量和高度控制的建议层级写入矩阵。现状建筑、权属、控规和工程条件尚不完整，因此拆改留只登记方法与待校准清单，不编造确定结论。

用地分类依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]，建筑高度、体量、界面和风貌控制由 [depth:height_massing_character] 管理，拆改留方法由 [depth:retain_renovate_demolish] 管理。

用地和建筑的主要证据是 [data:geometry/land_use.geojson#LU-001]、[data:geometry/buildings.geojson#BLDG-001] 和 [metric:building_footprint_area_sqm]。

开发控制指标必须与 `metrics.json` 和图层一致；总建筑规模、密度、退线和建筑控制线因缺少官方条件，已在指标体系中列为 unknown 或 pending_control，没有用固定数值制造精确感。随包提交的 A3 文册包含更新项目清单和指标复核表，A0 展板突出关键空间结构与重点片区，离线 HTML 提供指标和图层联动入口。

## 交通、轨道、市政与公共服务设施

交通评估的核心判断是“轨道资源较丰富，最后 300—800 米连续性不足的风险更高”。以临时范围和 800 米分析缓冲进行 OSM 背景筛查，识别到 16 个去重轨道站名、189 个已标注 crossing 节点；已标注步行支持线、cycleway 和主要道路中心线密度分别约为 16.53、1.06 和 5.47 km/km²。这些低置信度结果只用于确定现场调查优先级，不代表官方站口、道路红线、连续骑行品质或容量结论。[source:OSM-TRANSPORT-CONTEXT] [metric:osm_mapped_station_names_within_800m_count] [metric:osm_mapped_crossing_count]

本轮已纠正上一版空间证据的方向性错误：原 `ROAD-001` 仅为约 1.1 公里的东西向线，无法支撑 9 公里级南北创新带。v1.3 将其改为约 9.60 公里的南北公共慢行主轴，并在三处重点区形成东西缝合支线。[source:JINGZHANG-FUTURE-BELT-2026] [source:BEIJING-SLOW-MOBILITY] [data:geometry/roads.geojson#ROAD-001]

支线与长度复核回到 [data:geometry/roads.geojson#ROAD-002]、[data:geometry/roads.geojson#ROAD-003]、[data:geometry/roads.geojson#ROAD-004]；概念网络指标见 [metric:design_north_south_spine_length_m]、[metric:design_east_west_connector_count] 和 [metric:design_slow_mobility_network_length_m]。

主轴和支线表达网络关系，不是新道路、红线或工程线位。北五环/清河、校区—园区—社区界面、大钟寺站四象限、北三环—京包路—知春路等节点必须分开做交通、权属、无障碍和工程论证。官方公众参与材料已证明沿线立交类型与用地条件存在复杂事实，不允许用一张概念图替代专业判断。[source:JINGZHANG-PUBLIC-FEEDBACK] [depth:traffic_rail_slow_parking]

居民交通体验以步行连续、过街安全、骑行舒适、轨道换乘、夜间舒适和 15 分钟日常服务六项评价。当前缺少本地基线，因此满意度指标保持 unknown；只有分层问卷达到 80/100、居民组没有明显落后，且慢行/活动日测试通过后，试点才可继续深化。[source:BEIJING-15-MINUTE-LIFE-CIRCLE] [metric:resident_transport_satisfaction_index]

公园名录显示其 24 小时开放且无对外停车场地，本方案不以新增核心停车场作为吸引活动的前提，优先轨道、步行骑行、无障碍接驳、外围共享停车与预约管理。完整评估协议、样本、阈值和失败回退规则见 `report/narrative.md`。[source:JINGZHANG-PARK-CATALOG]

交通和市政专业深度分别由 [depth:traffic_rail_slow_parking] 与 [depth:municipal_new_infrastructure] 约束；公共空间证据引用 [data:geometry/public_space.geojson#PUBLIC-001]。

[data:geometry/constraints.geojson#CONSTRAINTS] 记录约束条件；道路红线、站口、管线、消防、停车和事件日承载均为待补条件，不把策略写成审定结论。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

本方案把 AI 产业服务、创新服务、人才生活、新型基础设施、分布式能源、端侧算力与传统市政设施放进同一运营矩阵，并为每类接口登记空间位置、服务对象、责任主体、服务半径和分期依赖。管线、能源、排水、防洪、消防等资料尚未齐备，已被列为正式深化前置条件；因此正文只给出可回退的服务接口，不作工程承诺。

## 城市韧性、具身智能与全生命周期迭代 v1.3

本轮把未来城市视为“人—环境—机器—资产”的耦合系统，而不是科技设施清单。北京适应气候变化行动方案明确指出，高温、极端降水、内涝、干旱会影响公共健康、交通、能源、供排水和城市生命线；北京市气象数据平台已经提供海淀 1991—2020 气候标准值目录及通风、热岛、内涝等城市气候服务，但下载文件需要平台 user key，当前提交不引用尚未取得的数值。[source:BEIJING-CLIMATE-ADAPTATION-2024] [source:BEIJING-METEOROLOGICAL-OPEN-DATA] [assumption:A-METEOROLOGICAL-DATA-001]

因素清单覆盖八组相互作用：气候灾害（热浪、寒潮、强降雨、干旱、雷暴、积雪冻融）；空气与微气候（通风、热岛、遮阴、PM2.5、扬尘、过敏原）；水与生态（地形、管网、土壤入渗、地下水、水质、生物多样性、鸟撞和暗天空）；人的体验（老幼残孕、夜班劳动者、噪声、照明、认知负担、服务可达和归属感）；具身智能（混行、急停、遥操作、充电消防、信息安全、申诉和责任）；生命线（电、水、排水、热、通信、消防和应急）；建造与资源（保留再用、材料、能源、碳和垃圾）；长期运营（资产所有者、巡检、清疏、备件、预算、技能、工单、更新和退出）。[source:RESILIENT-CITY-INFRASTRUCTURE-2024] [source:BEIJING-ACCESSIBILITY-REGULATION] [source:BEIJING-BIRD-BIODIVERSITY-2024] [assumption:A-BIODIVERSITY-LIGHT-001]

### 1. 选择不是“每项最高”，而是最低后悔

本轮比较五种明确取向：S0 最小改变、S1 技术密集、S2 生态密集、S3 活动容量密集、S4 均衡适应。模型使用 11 个指标（热舒适、雨洪、空气、人的体验、机器人、隐私、生物多样性、维护、碳、灵活性、成本效率）、5 类权重画像（居民、气候、创新、运营、均衡）和 8 个压力情景；以固定种子 147228 运行 50,000 次蒙特卡洛抽样，并对权重和指标响应加入显式不确定性。[assumption:A-RESILIENCE-MCDA-001] [metric:resilience_v13_candidate_count] [metric:resilience_v13_monte_carlo_draws]

| 方案 | 主要优势 | 主要代价 | 平均稳健分 | 5%分位 | 获胜率 |
| --- | --- | --- | ---: | ---: | ---: |
| S0 最小改变 | 资本强度低、复用较多 | 雨洪、维护、人机混行与热舒适不足 | 42.559 | 40.365 | 0% |
| S1 技术密集 | 机器人测试和数字基础较强 | 隐私、生态、运维复杂度和断网退化较弱 | 54.090 | 50.613 | 0% |
| S2 生态密集 | 雨洪、生物多样性、热与碳表现最好 | 活动容量、人机分隔和日常维护压力较高 | 70.242 | 66.812 | 21.138% |
| S3 活动容量密集 | 大型活动与物流吞吐较高 | 硬化、噪声、热、排水和生境代价明显 | 46.579 | 42.994 | 0% |
| **S4 均衡适应** | **人本、机器人安全、维护、隐私和灵活性同时过门槛** | **资本强度较高，纯气候权重下不如 S2** | **72.518** | **70.252** | **78.862%** |

S4 的平均后悔值仅 0.314 分，八类压力中最低设计分 67.194；它通过五个预设筛查门槛。S4 是跨群体的稳健折中，而不是每个单项都最强。[metric:resilience_v13_selected_mean_score] [metric:resilience_v13_selected_p05_score] [metric:resilience_v13_selected_win_rate]

平均遗憾、最低压力项和门槛状态见 [metric:resilience_v13_selected_mean_regret]、[metric:resilience_v13_selected_min_stress_score] 和 [metric:resilience_v13_hard_gates_passed]；气候优先画像仍由 S2 获胜。

所有分数是归一化的比较模型，不是现场绩效。+2°C 热浪、+20% 云暴、灌溉供水减少30%、断网24小时、机器人数量增至3倍、活动客流突增、维护能力减少20%和冬季冻融均是设计压力测试，不是气象预测或批准标准。正式深化必须用季节 CFD、实测风速/温湿度/平均辐射温度、地形与管网模型、土壤入渗、水质、声光环境、生态本底、能耗、资产成本和真实用户测试替换归一化输入。[assumption:A-CLIMATE-STRESS-001] [assumption:A-AIR-WIND-001] [assumption:A-DRAINAGE-SYSTEM-001]

### 2. S4 均衡适应的空间操作系统

1. **风—热—空气：**主轴与三支线保留季节性通风连接，不以连续建筑、屏幕或密植形成固定风墙；遮阴由乔木、可穿透廊架和可移动构件共同提供。任何树冠、建筑和活动设施定型前，必须比较有叶/无叶、典型风向、静风污染和热浪工况。北京总体规划中的通风网络只支撑城市级原则，本项目不能自称官方通风廊道。[source:BEIJING-VENTILATION-NETWORK-2035] [source:BEIJING-METEOROLOGICAL-OPEN-DATA]
2. **雨洪—排水：**采用“源头减排—就地滞蓄—管网衔接—超标行泄—雨后恢复”五段链。海淀公开规划的年径流总量控制率 75%—80%只作为筛查范围，最终指标必须由具体分区、地形、土壤、管网、出水口与地下空间条件确认；任何地下空间不作为暴雨避险通道。[source:HAIDIAN-SPONGE-CITY-PLAN] [source:BEIJING-FLOOD-PLAN-2021-2025]
3. **人的身体优先：**连续无障碍主链、热浪避暑链和夜间安静链优先于展演、配送和机器人充电。老人、儿童、轮椅/盲杖/导盲犬使用者、婴儿车、骑行者和夜班劳动者必须参加路线测试；高分模型不能否决真实不适和投诉。[source:BEIJING-ACCESSIBILITY-REGULATION] [source:WHO-HEAT-HEALTH-2026] [assumption:A-HUMAN-EXPERIENCE-001]
4. **具身智能分级开放：**遵循“世界模型仿真—封闭场地—低速定时地理围栏—有限公开测试”的顺序；保持人先行、可见身份、可急停、可人工接管、可申诉、可撤出。物理安全和 GB/T 45502-2025 信息安全同时审查，绝不把居民和残障人士变成机器人的免费训练数据。[source:BEIJING-EMBODIED-INTELLIGENCE-2025-2027] [source:SERVICE-ROBOT-INFOSEC-GB45502] [source:ISO-TR-4448-PUBLIC-MOBILE-ROBOTS] [assumption:A-EMBODIED-AI-SAFETY-001]
5. **生态与夜间：**使用乡土、多层次、耐旱的生境结构，设置不连续但可连接的生态“踏脚石”；玻璃界面进行鸟撞审查，生态敏感段采用暗天空、低眩光、分时照明。没有本底调查前，不宣称物种增加或生态净增益。[source:BEIJING-BIRD-BIODIVERSITY-2024] [source:BEIJING-LIGHTING-GUIDE-2025] [assumption:A-BIODIVERSITY-LIGHT-001]
6. **维护即设计：**每个树池、雨水口、透水铺装、座椅、照明、导视、传感器和机器人停靠点必须在建设前拥有资产 ID、责任主体、巡检触发、备件、维修窗口、人工降级和退出路径。连续两次工单逾期或无法获得备件，优先删除复杂设备，改用被动、标准化、可替换构件。[source:ASSET-MANAGEMENT-GBT33172] [source:RESILIENT-CITY-INFRASTRUCTURE-2024] [assumption:A-LIFECYCLE-MAINTENANCE-001]

### 2.1 “藏风聚气 / 风水”的文化边界与工程转译

本方案允许“藏风聚气”“风水”作为京张沿线传统空间感知、地名记忆和景观叙事的文化词汇，但不把它们当作医学结论、公共健康因果、空气质量证明、水文规律、工程模型或审批依据。任何对健康气流的判断，都必须拆成可复核的风、热、污染、遮阴、蓝绿空间和水风险问题；在资料未到位前维持 `unknown`，不得用文化语言填补证据空白。[assumption:A-AIR-WIND-001] [assumption:A-DRAINAGE-SYSTEM-001]

- **行人层风舒适：**设计目标是避免连续风墙、危险强风和大面积静风区；当前可接受面积比例为 `unknown`。正式验证需使用经专业确认的舒适准则，对冬夏典型风向、静风、有叶/无叶及不同人群活动时段开展行人层 CFD，并以现场风速风向校准。[metric:pedestrian_wind_comfort_acceptable_area_ratio] [source:LIU-URBAN-VENTILATION-2017]
**污染滞留与稀释：**设计目标是识别交通、施工、活动和街谷界面的滞留热点，而不是笼统宣称“风带来健康”。当前热点数量为 `unknown`；后续需明确排放源、背景浓度、风边界条件，以空气龄或经专业确认的通风效率指标结合 PM2.5 监测复核。[metric:pollutant_stagnation_hotspot_count]

通风方法边界由 [source:LIU-URBAN-VENTILATION-2017] 提供，不能替代本地实测。

三个论文案例只提供方法与权衡提示，不能移植其百分比或结论。[source:MENG-WIND-HEAT-PM25-2022] [source:NOSEK-STREET-CANYON-2025]
- **热暴露与遮阴：**设计目标是让连续无障碍主链在高温时段拥有可用遮阴、饮水、停歇与避暑节点；当前平均辐射温度基线和连续遮阴比例均为 `unknown`。后续以分季节、分时段的太阳辐射/树冠模型、MRT 实测和弱势人群陪行共同验证，不以树木数量代替热舒适。[metric:mean_radiant_temperature_baseline_c] [metric:continuous_shaded_accessible_route_ratio]
- **蓝绿空间与健康：**绿地和公共空间图层只表达概念性设计供给；与无障碍主链的有效重合比例仍为 `unknown`。后续需现场确认入口、坡度、连续性、安全、水质和维护，再评估可达性与实际使用；本方案不从“临水/近绿”直接推出身体或心理健康改善。[metric:green_ratio] [metric:blue_green_accessible_route_overlap_ratio] [source:WHO-URBAN-HEALTH-AND-GREEN]
- **水风险：**雨水花园、调蓄和超标行泄是 `design_target`，但关键无障碍路线避开危险水深/流速的核验比例为 `unknown`。正式深化需用 DEM、管网、出水口、土壤、地下水、水质、设计暴雨及二维地表模型验证；在此之前不作“无内涝”“聚水生财”或健康收益承诺。[metric:water_risk_exceedance_route_verified_ratio] [assumption:A-DRAINAGE-SYSTEM-001]

这里的状态规则是：`visual/assets/evidence-ledger.json` 中的 `design_target` 只说明未来要达到的审查门；`metrics.json` 中上述六项 `unknown` 才是当前证据状态。只有模拟输入、校准记录、现场观测、公式、误差和专业责任人齐全后，才能更新为 `known`，且仍需分开报告舒适、污染、热和水风险，不能合并成一个“风水健康分”。

为避免把“以后再测”写成空泛承诺，本轮增加 `visual/assets/wind-health-validation-plan.json` 作为证据合同：它把六项指标分别绑定到几何版本、风热边界、排放源、现场采样、校准误差、责任人和停止条件，并规定缺任何一项时继续保持 `unknown`。该文件是验证协议，不是海淀现场数据、CFD 结果、健康结论或工程/审批文件；三篇风环境论文只用于方法边界，不迁移个案数值。

本轮进一步增加 `visual/assets/wind-health-field-protocol.json`，把“现场再测”变成可预注册的工作包：每个点固定 `point_id`、`geometry_version`、时间、仪器、测高、风速/风向、PM2.5、热环境、树冠状态和质控标记；风、污染和热测量分别规定校准/共址、背景与排放时序、模型—现场同点对齐及误差报告。点数、重复次数和最终舒适阈值必须在看数据前由专业团队登记并签字，不能用方便步行代替代表性样本。几何版本缺失、校准缺失、现场不安全、排放源或检出限缺失，或把“藏风聚气/风水”重新写成因果证据时，协议要求停止解释并维持 `unknown`。[source:AIJ-CFD-PEDESTRIAN-WIND-2008] [source:AIJ-CFD-GUIDEBOOK] [source:ISO-7726-INSTRUMENTS-2025]

数据入口也单独登记为“已识别、未下载”：北京市公共数据平台已登记海淀地面气候标准值数据集，海淀政府公开材料描述了 `1+21+65+100` 气象监测网络，清河站区公开材料说明站区微型站监测风向风力。它们只能作为合法取数、责任协调和附近监测背景的入口，不能替代京张三处重点区的现场观测或 CFD 校准；在取得并审查版本化数据前，六项本地指标继续保持 `unknown`。[source:HAIDIAN-CLIMATE-NORMS-DATASET-2025] [source:HAIDIAN-METEOROLOGICAL-NETWORK-2023] [source:QINGHE-STATION-WIND-MONITORING-2021]

### 3. 三处重点区的差异化压力测试

- **众智园：**把清河界面作为风、水、低碳构件和具身智能封闭测试的共同实验场；先验证排水、冬季防滑、机器人失效和数据安全，再开放展示。
- **AI 原点：**以近校街区的遮阴、夜间学习、低噪声、步行骑行和日常服务为核心；机器人只在不挤占无障碍链的时段和空间运行。
- **大钟寺：**优先解决站点四象限、云暴积水、活动客流、网约车/配送、夜间噪声和活动后恢复；大型活动容量服从居民归家、消防和雨洪行泄。

方案不预测一个确定不变的2035，而是设置触发器：高温预警降低活动并开放避暑点；强降雨预警清空低点、预检雨水口并启动超标行泄；断网后机器人停止自主移动且公共设施维持人工模式；一次不可接管、一次阻断无障碍主链或严重近失事件即暂停机器人场景；关键资产无责任人或连续两次维护逾期即不得扩容。这些触发器把未来变化转化为可执行的回退，而不是一张科幻效果图。

### 更严格的蒙特卡洛稳健性校核

为避免固定权重把方案“算得过好”，另设 S0—S4 五个设计原型，声明在五类利益相关者权重、八类压力状态和评分噪声下进行 50,000 次确定性蒙特卡洛抽样，随机种子为 147228。[metric:resilience_v13_candidate_count] [metric:resilience_v13_monte_carlo_draws]

S4 均衡自适应方案胜率约 78.862%、平均遗憾 0.314 分，稳健平均分为 72.518、P05 为 70.252；这些是方案比较，不是现场绩效。[metric:resilience_v13_selected_mean_score] [metric:resilience_v13_selected_p05_score] [metric:resilience_v13_selected_win_rate]

八类压力中的最低项和门槛状态见 [metric:resilience_v13_selected_mean_regret]、[metric:resilience_v13_selected_min_stress_score]、[metric:resilience_v13_hard_gates_passed]；它仍需用现场数据校准。

这里的 MCDA 数值是已声明的方案比较结果，不是本包内已经独立复算的指标。包内没有随附逐抽样输入、五类权重、八类压力增量、响应函数或 runner，因此这些抽样数及其派生结果暂列为“待输入与 runner 补齐后复演”；只有 GATE-04 通过并能从登记输入复演到同一数值后，才可升级为已知指标。

这次校核将下一轮优化方向锁定为：增加被动遮阴和可维修雨洪储存、降低高传感器依赖、提高离线运行和人工接管、让活动容量与安静空间脱钩、建立资产冗余与替换件标准。北京公开气象目录可作为后续气候校准入口，但 Haidian 下载文件目前需要平台用户密钥，因此没有把未取得的温度、降雨、风速或湿度写成事实。[source:BEIJING-METEOROLOGICAL-OPEN-DATA] [assumption:A-METEOROLOGICAL-DATA-001]

排水目标还需衔接海淀海绵城市规划的公开背景范围；通风网络只能作为城市尺度的背景方向，不得将临时主轴直接叫作官方通风廊道。[source:HAIDIAN-SPONGE-CITY-PLAN] [source:BEIJING-VENTILATION-NETWORK-2035] [assumption:A-DRAINAGE-SYSTEM-001] [assumption:A-AIR-WIND-001]

具身智能的下一轮验证将同时覆盖北京具身智能行动计划、服务机器人信息安全标准和智能市政基础设施全生命周期要求；机器人不能只通过物理避障，还必须通过数据安全、断网运行、人工接管和责任追溯测试。[source:BEIJING-EMBODIED-INTELLIGENCE-2025-2027] [source:SERVICE-ROBOT-INFOSEC-GB45502] [source:RESILIENT-CITY-INFRASTRUCTURE-2024] [assumption:A-EMBODIED-AI-SAFETY-001]

维护与生态部分采用资产管理、鸟类友好和北京夜景照明资料作为校核入口：关键设施需要责任链和寿命档案，树木、玻璃和照明需要鸟类与暗夜基线；本方案没有把任何物种、玻璃碰撞率或夜间照度写成现状结论。[source:ASSET-MANAGEMENT-GBT33172] [source:BEIJING-BIRD-BIODIVERSITY-2024] [source:BEIJING-LIGHTING-GUIDE-2025] [assumption:A-LIFECYCLE-MAINTENANCE-001] [assumption:A-BIODIVERSITY-LIGHT-001]

补充的交叉证据把人的健康、公共参与和可持续运营放在同一张风险表中：WHO 与 IPCC 说明空气、噪声、热、蓝绿空间、移动安全和极端降水需要联动校核。[source:WHO-URBAN-HEALTH-AND-GREEN] [source:IPCC-AR6-URBAN-RISK]

NIST 与 UN-Habitat 的人本智能框架强调可解释、参与、数字权利、公平、互操作、预算和持续监测；居民问卷、无障碍路线测试、投诉/申诉和年度复盘不得被机器人效率替代。[source:NIST-HUMAN-CENTERED-AI] [source:UN-HABITAT-PEOPLE-CENTRED-SMART-CITIES]

北京步行骑行标准为连续性、公共空间和街道维护复核提供本地接口；水务工作报告要求预报预警、调蓄、雨前清疏、混接改造和应急调度；道路养护范围则把巡查、设施台账、汛期响应、桥隧设备维修和应急处置写入运维闭环。[source:BEIJING-WALK-CYCLE-DB11-1761] [source:BEIJING-WATER-REPORT-2024] [source:BEIJING-ROAD-MAINTENANCE-2026]

具身智能的边界同时参考 ISO 13482 的移动/辅助机器人危险降低原则与 ISO 55001:2024 的资产全生命周期管理要求：前者用于测试边界和急停、接管、人与机的物理风险，后者用于资产绩效、风险、支出、运行、维护和持续改进；二者都不等同于本项目的部署许可或本地采购标准。[source:ISO-13482-SERVICE-ROBOT-SAFETY] [source:ISO-55001-2024]

## v1.5 全状态城市操作系统：从效果图到可回退的真实体验

v1.5 在上一轮“低后悔”压力测试上扩展为 97 条原子证据记录，见 [data:visual/assets/evidence-ledger.json#climate-risk-baseline]、[data:visual/assets/evidence-ledger.json#cfd-validation] 和 [data:visual/assets/evidence-ledger.json#commitment-register]。

这些记录把 90 设为设计门槛，并拆成输入、公式、人工复核、责任人和停止条件；当前均标记为 `design_target`，不得误读为现状实测值。[metric:resilience_v13_selected_mean_score] [source:IPCC-AR6-URBAN-RISK]

全状态矩阵先看人，再看设备：晴天与雨天分别检验遮阴、风环境、空气质量、雨水路径、无障碍主链、夜间安全和人的休息；断网、断电、传感器漂移、机器人无法接管时，导视、急停、照明、求助和人工值守必须保持最低服务。具身智能只在 `edge-compute`、`embodied-ai-governance`、`privacy-minimization` 和 `model-card` 四道门同时通过后小规模试点，不能以“自治率”替代公共性。[source:NIST-HUMAN-CENTERED-AI] [source:ISO-13482-SERVICE-ROBOT-SAFETY]

气候与水系统按“源头渗透—就地调蓄—管网排放—超标行泄”组织；风环境只作为候选网络并等待专业模拟，排水目标只作为背景基准并等待水务、道路、管线资料。树木根域、冬季防滑、材料可拆解、微电网降级、维护欠账、资产责任和年度故障演练被放进同一运维循环，避免把一张新图交给没有人维护的未来。[source:BEIJING-FLOOD-PLAN-2021-2025] [source:BEIJING-WATER-REPORT-2024] [source:ISO-55001-2024]

评价看板将状态分为 `known`、`design_target`、`unknown`、`blocked` 四类；无障碍主链被占用、暴雨时低点无法回退、机器人无法急停、隐私边界不清或维护连续逾期时，方案自动降级为人工模式并停止扩容。公平账本同时报告老幼、残障、夜间劳动者、居民、开发者和访客的可达性、热舒适、风险和服务差异，不用平均数掩盖最弱体验。[source:WHO-URBAN-HEALTH-AND-GREEN] [source:BEIJING-ACCESSIBILITY-REGULATION]

为避免“有责任人”仍停留在口号，本轮新增 `visual/assets/operational-assurance-contract.json`：每个测试窗必须先登记场景与几何版本、运营/资产/应急责任、普通等价服务、网络隔离与补丁联系人、责任与保险假设、补偿/申诉路径、雨洪公平检查、独立复核和事故公开摘要。具身智能、活动公共空间、蓝绿排水和数据/模型四条保障轨道分别规定证据、停止条件与回退；它是概念审阅合同，不是保险单、法律意见、施工许可、实测雨洪模型或网络安全认证。任何 unknown 或 blocked 项都不能放行。[data:visual/assets/operational-assurance-contract.json]

三十秒短片不再只拍“城市很聪明”：镜头一从清晨的风和树影开始，镜头二跟随雨水从铺装边缘进入雨洪花园，镜头三在站点四象限让行给老人和配送人员，镜头四在断网时切换为人工导视与机器人急停，镜头五以夜间贡献档案、维护工单和居民复盘收束。每个镜头都对应账本记录、空间图层、声音线索和回退动作，传播层不能替代工程证明。[data:visual/assets/evidence-ledger.json#film-storyboard]

## 蓝绿空间、公共空间与城市风貌

本方案以京张遗址公园活力带为骨架，把清河、小月河、高校、企业和社区需求转译为南北主轴、东西缝合支线、步行/骑行节点和绿色公共空间；`mobility-bluegreen.png`、roads/green_space/public_space 图层和六个更新项目共同标出慢行断点、上跨环路、公园南北端、停车、体育、创新交往、科技测试、应用展示与公共服务接口。绿地被拆为五个连续概念段，公共空间被拆为三个空间室，并由十四个场景节点把场景矩阵落到可检查的位置；这些对象仍是设计提案，不是现状调查。

蓝绿公共空间由 [depth:blue_green_public_space] 校核，核心证据为 [data:geometry/green_space.geojson#GREEN-001]、[data:geometry/public_space.geojson#PUBLIC-001]。

[metric:green_ratio] 和 [metric:public_space_ratio] 与 [standard:MOHURD-URBAN-DESIGN-MEASURES] 一起说明本节如何统筹景观风貌、公共空间和建筑控制。

本方案把京张铁路历史、中关村创新和 AI 创新转译为“并行双线—开放节点”的识别系统、三处 AI 地标、贡献墙/荣誉展示、导视和国际传播叙事，并在图册与 `landmark-honor-crosswalk.json` 中表达其空间接口。建筑体量、屋顶、界面和公共艺术均分为设计建议与待确认条件；品牌、字体、图像、肖像和企业标识必须经过版权登记，未取得文保或控规依据时不画伪精确控制线。

## 更新项目清单、实施政策与分期计划

本次提交已形成六项更新项目清单，并在 `operations-matrix.json`、`construction-readiness.json` 和 `compliance_matrix.json` 中登记项目位置、类型、功能、责任主体、依赖、阶段、风险、评估指标、分期范围和图纸挂接。空间上把 [metric:phase_count] 个条件分期带与 [metric:constraint_gate_count] 个数据缺口闸门分开登记：前者表达何时具备进入下一窗口的条件，后者表达仍需由正式边界、权属、道路铁路、水务、消防和无障碍专业资料确认的接口。政策接口覆盖城市更新统筹、空间供给、运营、产业服务、公共参与、数据治理和产权协同；`phasing.geojson` 只表达概念分期，不表达已批准建设时序。

项目清单和分期深度由 [depth:renewal_project_list] 与 [depth:phasing_implementation] 管理，分期空间证据为 [data:geometry/phasing.geojson#PHASE-001]。如果没有权属、资金、实施主体和审批路径，方案必须把它写成实施风险，而不是承诺落地。

| 项目编号 | 项目名称 | 类型 | 主要依赖 | 证据引用 |
| --- | --- | --- | --- | --- |
| JZ-01 | 京张遗址公园慢行断点缝合 | 公共空间/交通 | 道路红线、桥下空间、交通组织复核 | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | 众智园清河创新界面 | 蓝绿空间/产业展示 | 河道蓝线、生态和防洪条件 | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | 原点社区近校成果转化街 | 城市更新/产业服务 | 校区边界、权属、首层业态 | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 轨道站点、道路交叉口、市政管线 | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI公共服务与端侧算力节点 | 新基建/公共服务 | 能源、算力、安全和运营主体 | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | 全球AI活动周公共路线 | 运营/品牌 | 公共空间许可、活动安全、版权清权 | [data:geometry/phasing.geojson#PHASE-001] |

本方案把 100 天征集设计周期与城市更新实施分期明确分开：90 天建议顺序只用于资料锁定、基座、被动样机和一个有界测试窗的条件编排，不是政府时序。近期可先做实体导视、纸面地图、人工窗口和低扰动公共服务；中长期更新、活动路线、开发者社区和国际传播必须等待正式控规、市政、交通、权属、许可和责任人确认。`operations-matrix.json` 已为运营对象、频率、责任边界、转化路径、风险和退出规则留出核验位。

## 指标体系、面积复算与合规矩阵

指标体系至少应包含总体设计范围面积、重点区域面积、绿地与公共空间比例、建筑基底、更新项目数量、AI场景节点、慢行连通指标、产业空间指标、人才服务指标和自检状态。所有 known 指标必须能从 GeoJSON 或可信来源复算；unknown 指标必须给出原因和正式提交前置条件。`scripts/spatial_review.py` 和 `scripts/visual_review.py` 的结果是 formal 自检的重要证据。

指标复算深度由 [depth:metrics_recalculation] 管理。本方案正文显式引用 [metric:site_area_sqm]、[metric:key_area_count] 和 [metric:building_footprint_area_sqm]。建筑单元与绿地段的结构回读见 [metric:building_unit_count] 和 [metric:green_segment_count]。

空间对象计数另回到 [metric:public_space_polygon_count] 和 [metric:public_scenario_node_count]。分期带与数据缺口接口回到 [metric:phase_count] 和 [metric:constraint_gate_count]；这些计数描述提交包的可回读结构，不代表现状设施或审批数量。

页面上可见的 9 个结构化数字另登记在 `visual/assets/claim-provenance.json`。每条记录同时给出 `metrics.json` 的原始值路径、来源文件、对应图件和中英文指标标记，`run-open-pulse-claim-provenance.js` 会逐条复核这些关系。OSM 筛查、临时几何和候选方案仍按各自状态保留为背景记录、概念结构或设计实验；这张表只改善回读路径，不改变证据等级。[data:visual/assets/claim-provenance.json]

[metric:building_footprint_ratio]、[metric:green_ratio] 和 [metric:public_space_ratio] 来自结构化空间层；其边界证据是 [data:geometry/site_boundary.geojson#SITE-001]、[data:geometry/key_areas.geojson#PROV-KEY-001] 和 [data:geometry/buildings.geojson#BLDG-001]。

绿地与公共空间回看 [data:geometry/green_space.geojson#GREEN-001] 和 [data:geometry/public_space.geojson#PUBLIC-001]。图面中的建筑基底 2.72% 只指提交几何的 building_footprint_ratio，不等于法定建筑密度或控规指标。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

合规矩阵是任务响应性的主控文件。每条公告任务和 agent_taskbook 任务必须对应到报告章节、图层、指标、图纸、HTML 页面、来源、假设和自检项。未能覆盖公告 1.3、1.4、1.5 或 agent.1-agent.6 的任一必选任务，方案不得进入 formal professional scoring。

指标体系已按证据状态分成三类：边界面积、绿地比例、公共空间比例、建筑基底和分期面积由提交几何直接复算；开发控制参数、密度、退线、道路红线和设施标准等待官方控规或任务书附件；AI 创新指数、人才密度、服务满意度、慢行可达性、活动参与度和场景频次保持待校准。三类指标分别回到 `metrics.json`、`assumptions.json` 和 `compliance_matrix.json`，运营愿景不会被写成审定规划条件。

## 风险、版权与合规说明

### 本方案的空间承诺：以“可验证的公共性”替代“AI 装置秀”

本方案将“京张开源脉冲（Jing-Zhang Open Pulse）”定义为一条以遗址公园为公共底板、以三处重点区为创新锚点、以可审计的场景开放为运营机制的城市协作带；本包的空间设计层为 v3.3，v3.5 在继承 v3.4 公开元数据口径的基础上修复双语 A0 展板版式、辅助图件版本标识并披露临时边界交接风险；v3.3 在 v3.2 的空间首屏基础上把建筑、绿地、公共空间、场景节点、分期和待核约束细化为可回读对象，同时保持既有面积指标不变；不新增官方几何、法定红线或实施承诺。Logo 方向为“并行双线与开放节点”：两条不等宽的线对应百年铁路与持续迭代的数字协作，三个节点对应众智园、AI 原点和大钟寺；仅作为概念视觉系统，后续应由专业团队完成商标、字体和无障碍识别审查。[source:AGENT-TASKBOOK] [data:geometry/land_use.geojson#LU-001]

空间上采用“一轴、三站、两张网”：一轴是京张文化与日常慢行轴；三站是众智园的可信研发与测试、AI 原点的开源转化与人才生活、大钟寺的产业发布与国际会客；两张网分别是串联绿地和公共空间的“慢行交往网”，以及串联场景卡、人工复核和数据最小化的“公共服务网”。它不提出新的法定道路、开发控制、拆改清单或工程结论，而是给专业团队一套可随官方边界、控规与权属资料到位后复算的空间—运营接口。[depth:overall_spatial_structure] [metric:green_ratio]

### 三处重点区的可深化设计动作

**众智园：可信研发花园。** 建议将临清河的开放空间组织为“测试可见、数据不可见”的研发花园：公共界面展示模型评测方法、标准工作坊与低碳算力科普；涉及模型、数据与设备的测试留在预约、脱敏、人工复核的封闭环节。沿线以雨洪花园、骑行驿站和小尺度讨论空间连接，而非以大体量新建为前提。该动作依托临时重点区形状提出，需以蓝线、生态、防洪、交通和权属资料校正。[data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design]

**AI 原点：开源转化街区。** 建议把近校慢行界面作为成果“从论文到公共问题”的转译带：设置可预约的开源发布厅、知识产权与合规咨询桌、校企项目橱窗和晚间学习共享空间。建筑保留、改造、更新或新建均为待调查的分类方法，不以本方案替代现状测绘、权属核验或审批判断；首层公共性和步行连续性是后续深化优先审查项。[data:geometry/key_areas.geojson#PROV-KEY-002] [depth:retain_renovate_demolish]

**大钟寺：城市级展示与会客厅。** 建议把站点周边的步行连通、无障碍换乘、智能终端体验和国际路演组织为连续街区体验，强调可步行抵达的服务、短时展示和多语种导视，不把“站城一体化”表述为工程承诺。四象限连通、活动时段、消防疏散、商业及交通承载均待官方和运营资料复核。[data:geometry/key_areas.geojson#PROV-KEY-003] [depth:traffic_rail_slow_parking]

### 从公共脉冲到城市 API：人本保障层与算电协同合同

本轮的主张不是再添一座 AI 展台，而是把“人先行、机器可调用、失败可回退”写成三处重点区共享的概念接口。`human-first-buffer.json` 将原住民/老人、被替代风险劳动者、数字包容使用者和夜间 AI 从业者作为四个不识别个人的设计镜头；它们不代表人口统计，四项社会指标均为 `unknown`。[data:visual/assets/human-first-buffer.json] [metric:resident_continuity_retention_rate] [metric:skills_retraining_corridor_completion_rate]

**人本缓冲的空间动作。** AI 原点设置居民连续性与小商户回迁的人工规则桌，把“被替代→再培训→机器人运维/数据标注/场景运营”串成技能再造走廊；大钟寺把人工通道、代际共学、夜间换乘和无屏幕绿地放在公共界面；众智园的测试可见但数据不可见。IMF 约 40% 全球就业、发达经济体约 60% 处于 AI 暴露范围，WEF 调查中 41% 雇主预计因 AI 复制岗位而缩减人员，这些只说明再培训值得被纳入设计，不推断海淀岗位、裁员或安置结果。[source:IMF-GENAI-WORK-2024] [source:WEF-FUTURE-OF-JOBS-2025] [data:geometry/key_areas.geojson#PROV-KEY-002]

**给机器用的城市 API。** `city-api-energy-contract.json` 将 `asset_id / geometry_version / current_state / uncertainty / responsible_role / human_fallback / stop_condition / release_note` 设为最小字段。节点 001 是城市 API 观测台与算电证据交接，节点 002 是公共数据授权与技能再造，节点 003 是人机混行和国际公共服务；任何字段缺失都不放行，API 不等于市政接口已建成。[data:visual/assets/city-api-energy-contract.json] [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design]

**算电协同只作为硬约束，不作为设施背书。** 北京官方节能审查规则提供新建/扩建数据中心 PUE 分档、可再生能源方案、监测和余热利用的政策依据；既有数据中心 PUE>1.35 的差别电价与分档绿电目标是政策语境/目标，不能写成所有新智算中心统一的 30% 法定最低值。余热进市政供暖只做概念交接，须先核验热源、管网、责任、安全和计量；本走廊没有本地数据中心、能源合同或热网证据，`compute_energy_evidence_completeness` 与 `recovered_heat_handoff_status` 保持 unknown。[source:BEIJING-DATACENTER-ENERGY-REVIEW-2023] [source:BEIJING-STOCK-DATACENTER-OPTIMIZATION-2024-2027] [source:BEIJING-NEW-ENERGY-HEATING-2023]

**硅基通行权与城市版本化。** 小月河翼只登记为具身智能公共测试的候选概念区；人行/无障碍主链优先，机器人须低速、可见身份、有人观察、可急停、可人工接管，低空物流仅是待审批、地面接驳优先的接口，不给高度、航线或许可结论。年度体检、公众回执和 release note 记录 geometry version、证据状态、异议、责任与保留/修复/退役；unknown、申诉无回执或人工回退失效即冻结并恢复普通服务。[data:visual/assets/city-api-energy-contract.json] [data:geometry/key_areas.geojson#PROV-KEY-003] [metric:versioned_governance_release_note_rate]

空间建议、技能走廊、API、算电和硅基通行一律是概念建议/参考方案，供专业团队在官方边界、权属、能源、交通、消防、隐私、保险和公众参与资料到位后深化研究；不得据此推断现状、政策已定、工程可行或实施承诺。

### 十四张场景卡与治理边界

| 场景 | 所在空间 | 服务对象与公共价值 | 数据与人工边界 |
| --- | --- | --- | --- |
| 预约式慢行断点诊断 | roads / public_space | 通勤者与无障碍使用者识别慢行断点 | 人工计数、障碍记录和人工巡查；主链断裂即暂停扩容 |
| 低速配送机器人验证 | roads / constraints | 供应商在有界窗口证明与公共路线安全共存 | 围栏、急停、安全员和事件日志；严重冲突或急停失败即退出 |
| 自主慢行辅助评估 | roads / public_space | 老年人和行动不便者获得可解释、可退出的辅助 | 匿名流量、障碍记录和人工复核；无障碍链被占即切人工 |
| 模型安全红队沙盒 | constraints / public_space | 初创团队或供应商验证来源、人工审查和回退 | 清权样本、模型卡和评测日志；来源不明或审计缺失即拒绝令牌 |
| 开源发布厅 | public_space | 开发者、高校和居民公开交流与贡献 | 仅上传授权材料；撤回或清权失败即下架并转人工窗口 |
| 京张文化导视 | green_space / public_space | 访客理解铁路工程、社区和 AI 新文化 | 清权史料、盲文/高对比/语音导视；来源无法核验即下架 |
| AI 医疗服务导航 | public_space | 居民获得非诊断的就医流程引导 | 公开流程、人工人员和最小数据；出现诊断/处方输出即停止 |
| 企业服务协同柜台 | public_space | 中小企业获得公开流程和合规材料辅助 | 授权材料、人工复核和公开记录；材料来源不明即转人工 |
| 数据要素会客厅 | 大钟寺公共服务节点 | 以可审计方式展示数据治理和要素流通 | 仅使用公开或清权演示数据；隐私或责任边界不清即停止 |
| 智能原生零售街 | 大钟寺商业/公共空间 | 小商户和访客体验低扰动的智能服务 | 只用聚合客流和公开规则；拥挤、消防或服务不公平即降级 |
| 公共安全与活动复盘 | 三处重点区公共空间 | 公开事件与负面证据，支持人工责任追踪和场景修复 | 仅用聚合或授权事件记录；安全责任不清、隐私泄露或阈值超标即停 |
| 全球 AI 周步行路线 | 三站一轴公共空间系统 | 串联文化、开源、产业和国际公共体验 | 内容、版权、消防和无障碍审查；活动容量可降为零并回到普通使用 |
| 雨洪与树池维护演练 | 清河界面与绿地段 | 复核入渗、树池和排水维护，减少积水与维护欠账 | 雨前雨后人工巡检并等待水务确认；排水闸门逾期即冻结扩容 |
| 夜间低照度与安静链 | 公园—社区慢行界面 | 为夜班者、老人和敏感人群提供低扰动、可退出路径 | 人工照度/噪声巡检；眩光、噪声或安全阈值失守即回退 |

五类画像为开源开发者、初创团队、产业访客、周边居民和高校师生；它们不是基于个人画像的自动决策对象，而是公共服务和空间供给的设计视角。所有测试场景均为概念建议，须经过专业、安全、隐私与运营审查后方可试点。[source:AGENT-TASKBOOK] [depth:risk_missing_data]

五类产业画像之外，方案用八个不识别个人的公共使用者镜头检查谁能进入、使用、投诉和退出：周边/老年居民、轮椅/盲杖/导盲犬使用者、照护者与儿童、夜班劳动者、游客/首次到访者、小商户/社区服务者、开发者/初创团队/高校师生、维护人员/运营责任人。八类镜头的设计目标计数为 [metric:user_persona_count]，不是人口统计，也不生成个体资格；每类都有空间响应、无数字兜底、测试和隐私/安全闸门，见 [data:visual/assets/persona-and-inclusion-matrix.json#P-01]—[data:visual/assets/persona-and-inclusion-matrix.json#P-08]。方案禁止人脸识别、个体轨迹留存、生物识别和商业画像；官方边界和基线未知时，先做知情、可退出、可补偿的参与审计。

| 公共使用者镜头 | 空间与服务回应 | 无数字兜底/停止条件 |
| --- | --- | --- |
| 周边/老年居民；轮椅、盲杖与导盲犬使用者 | 连续无障碍主链、安静座椅、盲文/高对比/语音、可见急停 | 陪行、实体导视与人工问询；路线清空或障碍复核失败即停 |
| 照护者与儿童；夜班劳动者 | 照护停留与低速边界；低照度主链、安静座椅、夜间值守 | 人工广播、固定照明和人工值守；照度/噪声配对不合格即调整或撤回 |
| 游客/首次到访者；小商户/社区服务者 | 双语导视、工程问题墙、责任台；企业服务柜台、公开规则、人工申诉 | 纸质地图、人工讲解和纸面流程；关键材料不可核验即不启用 AI 辅助 |
| 开发者/初创团队/高校师生；维护人员/运营责任人 | 开源发布厅、评测沙盒、贡献档案廊；资产台账、责任台、实体检修口 | 专家评审、静态模型卡、纸面巡检和人工派单；清权、接管、维护或撤回演练失败即停 |

### 四个产业测试验证场：先证据，后采购或扩容

为把“政策工具”真正接到企业发展，而不是停留在案例罗列，`visual/assets/industry-validation-cases.json` 设置四个可撤回的验证窗。它们是面向组织方、企业和公共服务团队的概念测试协议，不是采购批准、部署事实、投资承诺或本地企业绩效证明。每个验证窗都要求企业问题、政策接口、验收证据、停止条件和非 AI 等价服务同时出现：

| 验证场 | 企业发展问题 | 政策接口 | 关键验收与停止条件 |
| --- | --- | --- | --- |
| 模型安全与透明度验证窗 | 初创团队或供应商能否在扩容前提交可复现的安全、数据来源、人工复核和回退证据 | 采购前 assurance record：模型/数据边界、红队结果、责任审查人、非 AI 方案和停止决定 | 两名独立审查人可复现测试记录；权属不清、缺少人工审查人或接管演练失败即停止。对应 S04、众智园。 |
| 企业服务与数据要素合规验证窗 | 企业服务团队能否缩短公开流程，同时不暴露未授权数据、不把 AI 答复变成行政决定 | 服务 preflight record：公开来源、授权材料、人工决策责任人、更正路径、留存期限和人工柜台等价路径 | AI 辅助与人工路径都能走通，关键答复均有来源和人工更正路由；材料不可核验、隐私泄露、歧视性分流或缺少人工柜台即停止。对应 S08/S09、原点社区/大钟寺。 |
| 低速具身智能安全与运营验证窗 | 机器人或具身智能供应商能否在任何规模化部署或采购决定前证明与无障碍公共路线安全共存 | 公共测试许可包：路线、速度/优先规则、急停、人工接管、事件日志、隐私边界、维护责任和撤回触发器 | 现场演练完成急停、人工接管、清空路线和恢复普通公共使用；阻断无障碍链、严重险情或维护逾期即停止。对应 S02/S03、众智园—京张公园界面。 |
| 多渠道参与与反馈闭环验证窗 | 公共服务团队或 civic-tech 供应方能否在不把账号、设备或数字熟练度变成门槛的情况下，合并数字、纸面、现场和多语反馈 | 参与等价记录：议题、渠道、无障碍支持、责任复核人、响应期限、未解决问题和退出路径 | 一名无账号/无设备参与者与另一名参与者通过不同渠道提交同一问题；人工合并记录并发布回应或不改原因；数字独占、无人工归并或无法退出即停止。对应 S05/S08、原点社区—大钟寺公共界面。 |

四类验证场都先走小规模、有人值守、可复盘的测试窗，再决定扩容、改设计或退出；任何“成功”只表示验收证据完整，不表示产品效果、投资回报或政府采购已经成立。[metric:industry_validation_case_count]、[metric:scenario_card_count] 和 [metric:user_persona_count] 是机器可读计数。

任务边界回看 [source:AGENT-TASKBOOK]，资料缺口回看 [depth:risk_missing_data]。

### 文化叙事、地标与长期运营

文化叙事不是把铁路当作科技背景板，而是把“工程求证—开放协作—公共回馈”作为三段式体验：京张铁路的工程理性、中关村的自主创新、AI 时代的可验证公共性。建议设置四类非炫耀性地标/荣誉节点：**百年工程问题墙**（以清权史料讲述问题与求解）、**开源贡献档案廊**（展示可公开验证的项目记录）、**城市智能体责任台**（展示场景数据边界、申诉与人工复核路径）、**企业安全治理责任台**（展示企业测试的安全证据、停止理由和恢复普通公共使用的条件）。四个节点的政策与企业价值、验收测试、关联图层和清权边界见 `visual/assets/landmark-honor-crosswalk.json`；机器可读节点计数为 [metric:ai_landmark_count]。它们均为概念节点，需在文保、公共艺术、管理与版权审查后深化，不构成机构背书或企业广告位。[source:AGENT-TASKBOOK] [data:geometry/public_space.geojson#PUBLIC-001]

运营上建议形成“春季问题征集、夏季场景开放、秋季开发者周、冬季证据复盘”的年度闭环；`visual/assets/annual-event-system.json` 将四季的空间路线、责任角色、前置证据、公众接口、企业/公共服务转化产出、验收测试和停止条件逐季登记。每次活动留存开放议题、证据链接、公众反馈和人工复盘，而不以到场人数或招商金额制造绩效。开发者社区以公开议题库、可复现实验、贡献署名和问题申诉为核心；场景开放以小规模预约测试—第三方复核—公开复盘为核心。这是供组织方、专业团队与社区协商的运营原型，不代表已确定的活动、资金、政策或招引承诺。[source:AGENT-TASKBOOK] [depth:phasing_implementation]

本包以中文 `proposal.md` 为主稿，以 `proposal.en.md` 提供完整英文对照译文；HTML、图纸和含文字图件也按 manifest 的语言映射提供对应副本。所有图片、图纸、图标、数据和代码资产必须在 `sources.json` 或 `report/copyright_statement.md` 中说明来源、许可和授权状态。HTML 页面不得加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API，不得跟踪评审者行为。

风险和缺资料清单由 [depth:risk_missing_data] 管理，并与 [data:geometry/constraints.geojson#CONSTRAINTS]、[source:SITE-PACKAGE] 和 [source:PROCESSED-FACT-PACK] 相互校核。

控规深度再回看 [standard:MOHURD-CONTROL-DETAILED-PLANNING]；official boundary、key area、道路、权属、市政、文保和公共服务缺口必须进入 assumptions、自检和正文风险章节，并降级为待确认事项。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。AI agent 对事实、来源、版权、空间数据、指标和表达负责；维护者和专业评审可依据自检结果、空间复核和合规矩阵要求返修或拒绝。

## v1.6 官方统计时间序列与低遗憾方案

本轮新增一套可复核的量化层，署名许丙南。海淀区 2014—2023 年人口、GDP、财政、零售、居民收入、教育和卫生序列来自《2024北京区域统计年鉴》[source:REGIONAL-YEARBOOK-2024-2]；北京市能源、水、污水、PM2.5、绿化和公共交通序列来自《北京统计年鉴2024》[source:BEIJING-YEARBOOK-2024]。

2024、2025 市级统计公报仅用于新鲜度背景 [source:BEIJING-BULLETIN-2024] [source:BEIJING-BULLETIN-2025]，不混入区级模型；原始与派生序列、来源和修订边界见 `visual/assets/sustainability-timeseries.json`。

样本只有 10 个年度点，采用 5—95 分位稳健归一化、经济活力/资源效率/生态健康/社会韧性四维等权、Theil—Sen 斜率和滚动起点线性—朴素基线回测；不使用高阶 ARIMA 或黑箱深度模型。主观测指标优先级由完整度 30%、稳定性 25%、回测技能 25%、决策相关性 20%构成，结果见 `visual/assets/indicator-selection.json`。0—100 是相对决策分，不是官方评分；城市级环境数据也不等同于海淀区实测。

以当前趋势作为诊断性外推到 2030，并用明确标注为“设计阈值”的资源强度、空气、污水、绿化和公共服务目标做压力实验。baseline、adaptive、regenerative、stress 四情景中，`adaptive` 是内部决策实验的优先候选；相对分数只用于比较低遗憾取向，不是竞赛评分、因果收益、工程造价或政府承诺。情景原始值、目标、回测和回退动作见 `visual/assets/model-backtest.json`；其中率类超出 0—100 或强度类低于 0 的 raw 外推仅作为模型异常提示，不作为展示目标、现状事实或评分输入。扩初前必须用海淀实测风热、雨洪、交通、居民体验和资产工单替换设计旋钮。

量化图表已加入 HTML 展板 `visual/index.html`；固定资产投资在 2018 年发生水平/增长速度口径切换，COD 2023 年为初步核算值，人口和经济历史数据可能因普查/经济普查修订，均不进入不当的精确承诺。

## v1.7 证据与交付层：从概念到可审阅成果

本节把任务书覆盖、区域协同与生态图谱、身份系统、节点级空间动作、具身智能组件、场景运营责任、版权清权和双语审阅组织成一条证据与交付链：每个判断都绑定到一个可打开、可复算、可停止或可追责的位置。

### 1. 任务书唯一索引与区域协同

`visual/assets/taskbook-crosswalk.json` 将 agent.1—agent.6 的每一条要求绑定到唯一正文段落、图件、机器可读成果和 acceptance test。评审者可以从任务直接跳到证据，不必在叙事中猜测是否覆盖。

区域协同不写成未经确认的招商名单，而是写成八要素能力回路：**土地、空间、产业、资本、人才、算力、数据、场景**。海淀高校/社区负责提出问题和人才回流，怀柔科学城对应上游科研，未来科学城对应工程与低碳验证，北京经开区对应规模化转化，京津冀网络负责比较与扩散，京张带只承担公开、可撤回、可审计的城市验证界面。全部关系标为 `conceptual_suggestion`，不声称合作、资金、供地或政府承诺。

![区域协同生态回路](assets/figures/regional-ecosystem.png)

机器可读的边界、输入、输出、责任和回流路径见 `visual/assets/regional-ecosystem.json`；图中“originate—engineer—book—test—publish evidence—scale or retire”是运营建议，不是已签署的组织架构。

为补齐 agent.2 要求的 5—8 个 AI 生态案例，`visual/assets/case-mechanism-matrix.json` 把六个官方公开案例与六种可迁移机制分开记录。案例只回答“官方页面公开展示了什么政策或企业发展机制”，不把外部城市的成绩、法律制度或合作关系移植到海淀：

| 案例 | 政策/企业机制 | 京张接口 | 不照搬边界 |
| --- | --- | --- | --- |
| Helsinki AI Register | 城市 AI 系统登记、详情页与反馈入口 | 试点卡写明目的、数据边界、责任人、状态和投诉路由 | 登记不能替代安全、无障碍、采购和居民同意审查 [source:CASE-HELSINKI-AI-REGISTER] |
| Amsterdam Algorithm Register | 公开说明城市算法用于什么服务 | 测试前发布说明，连接审查、停止和补救路径 | 不把外部登记机制当作中国法律合规 [source:CASE-AMSTERDAM-ALGORITHM-REGISTER] |
| Singapore AI Verify | 标准化 AI 测试、开源协作与 assurance sandbox | 为初创团队提供预约、人工主导的测试窗口、模型卡和回滚记录 | 工具包不是认证、采购批准或无同意测试许可 [source:CASE-SINGAPORE-AI-VERIFY] |
| Decidim Barcelona | 可追溯的线上与线下参与基础设施 | 贡献墙同时提供纸面、窗口和多语种渠道，公开意见如何改变决定 | 数字参与不能替代无账号、无设备或需要线下支持的人 [source:CASE-DECIDIM-BARCELONA] |
| UK ATRS | 标准化公开记录说明算法为何、如何使用 | 形成 purpose、owner、data、human review、alternatives、limits、incident、update 记录 | 不是北京地方强制要求，仍需本地法律和采购审查 [source:CASE-UK-ATRS] |
| Seoul AI Foundation | 串联研究、公共服务、人才和全球协作的机构能力 | 以责任明确的接口连接高校策源、企业服务、公共验证和交流 | 不暗示首尔合作、资金、机构授权或京张实施承诺 [source:CASE-SEOUL-AI-FOUNDATION] |

政策工具与企业发展接口进一步写入 `visual/assets/case-policy-enterprise-crosswalk.json`：每个案例绑定一个政策工具、一个企业发展问题、本地场景、验收证据和不照搬边界。`visual/assets/policy-enterprise-playbook.json` 再把接口拆成 42 张可执行的成长阶段卡 [metric:policy_enterprise_playbook_card_count]，先落一张公共 AI 登记与反馈卡；`visual/assets/industry-validation-cases.json` 补出模型安全、企业服务数据合规、低速具身智能和多渠道参与反馈闭环四条产业测试验证窗；`visual/assets/landmark-honor-crosswalk.json` 把责任台、贡献档案和安全治理节点绑定到政策与企业接口。六种模式仍保留在 `case-mechanism-matrix.json` 的 `rows` 中，案例来源、访问日期和用途边界回到 `sources.json`。

`visual/assets/operations-matrix.json` 将后续工作拆成八个有责任人的行动包：官方边界替换、现场基线、风热水验证、具身智能窗口、开源清权、活动降容复原、雨洪/安静链维护，以及年度扩散/重做/退出复盘；`visual/assets/resource-accounts.json` 为五类前置资源记账：空间权属、气候水务生态、算力模型与数据权利、人类体验参与、资产备件维护。这些是释放窗口前的审查条件，不是预算、资金或采购承诺。

### 2. 十四条场景—空间—运营矩阵

新增的 `visual/assets/scenario-operation-matrix.json` 将原有十张场景卡扩展为 14 行，并为每行补齐空间载体、触发器、最小数据、RACI、SLA、相对成本带、留存期限、非 AI 等价服务、停止条件、成功指标和阶段。场景包括慢行断点诊断、低速配送机器人、自主慢行辅助、模型安全红队、开源发布厅、京张文化导视、AI 医疗导航、企业服务柜台、数据要素会客厅、智能原生零售街、公共安全复盘、全球 AI 周路线、雨洪树池维护和夜间低照度安静链。

每个场景都保留五道公共性门槛：不以数字设备作为服务前提；人工复核不可移除；无障碍主链不断；状态、投诉和责任人可被公众看到；停止与回滚已经演练。矩阵中的 `low/medium/high` 是相对规划类别，不是预算或采购估算；SLA 是待运营方确认的设计门槛，不是法定服务标准。

为了让“场景卡”可以被复核而不是只被阅读，本包新增独立设计的 `visual/assets/open-pulse-test-window-record.schema.json` 与 `visual/assets/example-s02-embodied-test-window.json`。后者是一个完全合成的 S02 低速配送机器人沙盒测试窗口记录：它把临时道路引用、无 App 人工替代、最小字段、急停与人类观察员、公众申诉、维护责任和退出资产计划放在同一条记录里；结果状态保持 `not_run`，不把记录格式冒充为机器人性能或现场验收。任何真实试点都必须重新建立记录并由无障碍、安全、维护和公众代表共同过门。

为回应 #706 暴露的结构性来源与许可边界，本版本移除此前带有 peer-derived 结构的 Relay Receipt 文件，改用 Open Pulse 独立设计的“有界测试窗口记录”。新记录围绕 `window`、`place_window`、`public_interface`、`human_control`、`data_contract`、`observation`、`release_decision` 和 `restoration` 组织，不复用 #426 的 schema 骨架；该文件仍是概念性审阅接口，不代表部署许可或现场结果。

![一枚令牌的生命周期](assets/figures/component-operations.png)

### 3.1 节点级概念计划与公共利益审计

三处重点区不再只停留在定位口号。`visual/assets/key-area-node-plans.json` 把众智园、AI 原点和大钟寺分别拆成到达—公共状态板—空间组件—运营窗口—普通公共使用的连续序列，并为每处写出组件、专业前置闸门和 acceptance test。它仍是 `provisional_concept_for_professional_refinement`，不替代官方地块、权属、道路、消防、生态、文保或市政条件。

`visual/assets/public-interest-audit.json` 明确不填造假基线：老年人、残障者、照护者、夜班者、儿童及监护人、访客、小商户和维护人员均列为待参与群体；无障碍连续、无 App 服务、投诉响应、分组影响差异、夜间照度/噪声均先做 baseline survey，再进入试点。参与必须有纸面、人工和多语种通道，冲突时先暂停场景、展示争议数据、给出非 AI 等价服务并公开补救或撤回。

### 3. 身份系统、公共空间组件与具身智能

身份系统把“百年铁路—开源协作—公共回馈”压缩成两条平行线、三个开放节点和两个切换菱形：众智园、AI 原点、大钟寺是公共节点，东西两翼可以接入不同的试点，但不改变普通公共使用。`visual/assets/identity-system.json` 和 `assets/figures/identity-system.png` 给出构造规则、色板、导视、盲文/高对比/语音替代和清权边界；当前只是概念方向，不是注册商标或 VI 定稿。

本轮把身份方向落实为一个可评估的矢量标记 `assets/identity/open-pulse-mark.svg`：两条并行线、三个开放节点、两个切换菱形与中英文命名均可缩放，旁边的 kilometre ticks、站点牌、盲文/高对比/语音替代遵循同一构造规则。它是许丙南 / Codex 的概念资产，不是注册商标、政府标识或已完成的 VI 定稿；正式使用前仍需商标、字体、无障碍和公共传播审查。

`visual/assets/component-library.json` 给出八个实体组件：双线身份标、令牌入口板、缝合阈、雨水树池单元、安静链座椅、低照度呼吸灯、开放贡献墙和可撤回停靠位。每个组件都能离线服务人类、写明维护频率和故障触发，并要求机器人断网或传感器失效时不破坏排水、无障碍和安全。具身智能只能在有界窗口低速运行，急停、消防隔离和人工接管可见；组件不是产品认证、施工图或采购承诺。

![京张开源脉冲身份系统与公共组件构造规则图](assets/figures/identity-system.png)
![京张开源脉冲矢量标记概念](assets/identity/open-pulse-mark.svg)

### 4. 版权、隐私与公共利益清权

`report/copyright_statement.md` 从短声明升级为可审计协议，`visual/assets/copyright-ledger.json` 逐项记录路径、作者、生成方式、输入来源、第三方材料、许可、归属、字体处理和 SHA-256。文本、几何、图件、离线 HTML 和 JSON 由许丙南 / Codex 在提交工作树中创作或派生；官方统计资料保留来源署名；不嵌入第三方图片、地图、远程字体或运行时外链。未来新增素材必须先登记授权和哈希；该台账是提交证据，不是法律意见。

#### 4.1 权利与构建溯源：逐项可核验

这份清权和构建记录把可复核事实写入正文、`sources.json` 与逐资产台账。资产级作者、输入、许可边界和 SHA-256 回到 `[source:BUILD-PROVENANCE-OPEN-PULSE]`；它是自述的包内溯源，不是第三方授权或法律意见。

- **图纸输出：** `drawings/a3-booklet.pdf` 实测为 10 页 A3，`drawings/a0-boards.pdf` 为 5 页 A0 竖向展板；两者的作者元数据指向本包，未声明打印认证、字体许可或政府出版批准。[source:PDF-OUTPUT-PROFILE-OPEN-PULSE]
- **字体边界：** CJK 文本仅由渲染环境的本地系统字体服务，本包不再分发字体文件或把本地字体写成已取得的字体许可；正式出版前仍需重新核验字体嵌入、阅读器显示和获授权字体。[source:FONT-RENDERING-BOUNDARY-OPEN-PULSE]
- **生成与复核：** 文字、GeoJSON、指标、图件、离线 HTML 和 PDF 是本提交工作树中作者/派生产物；manifest 与台账的哈希可由包内文件直接复算，`self_check.json` 只记录包完整性，不声称随包提供生成脚本、现场结果或官方评分。[source:VALIDATION-TRACE-OPEN-PULSE]

隐私和公共性不靠一句“以人为本”收尾：场景不做人脸识别或个体轨迹留存，医疗导航不诊断，数据展示留在沙盒，公共状态板给出人工等价服务和投诉入口；老人、照护者、夜班者、残障者、访客和维护人员均有不依赖 App 的路径。发生安全、清权、排水、无障碍或居民影响闸门失败时，场景转人工或撤回。

### 5. 双语审阅与版本复核

`proposal.en.md` 是完整英文审阅译本，`report/proposal.en.html` 和 `visual/index.en.html` 是离线审阅入口；中文正文保留既有指标、来源、风险和 v1.6 量化实验。`changelog.md` 记录本次版本变更，manifest 将双语文件和新证据资产逐项登记。英文译本不增加中文正文没有的法定事实；区域伙伴、成本带、SLA 和空间边界均明确标为概念或待正式数据确认。

本版的可见 QA 记录在 `visual/assets/qa-readiness.json`：报告表格已语义化、双语图件和 A3/A0 成果均为本地资源、离线页面无远程运行依赖；同时把临时边界和现场基线未知作为已知限制，不将本地预检误写成现场、无障碍或专业批准。

审阅路径固定为：任务 → 章节 → 图件/JSON → 指标/来源 → acceptance test → 停止或回滚。官方边界和控规资料发布后，仍需重算面积、连通、雨洪、交通、维护和量化指标，再进入专业深化。

实施交接由 `operations-matrix.json`、`resource-accounts.json`、十四条场景矩阵和 Open Pulse 测试窗口记录一起呈现：每个行动包都有责任、依赖、验收、停止、维护和相对成本带；每本资源账都说明释放窗口前必须补齐的资料与能力。

### 6. 建设就绪与连续参与

本包进一步把“可以讨论”与“可以建设/开放”分开。`visual/assets/construction-readiness.json` 设置五道闸门：资料与场地锁定、公共路径与被动构件样机、风热水与生命线协调、有界有人限时开放窗口、保留/改造/退出决策。[metric:construction_readiness_gate_count] 每道闸门都有进入证据、交付物、通过条件、停止条件、普通非 AI 基线和维护响应；文件明确不构成施工图、法定规划、采购规格、造价或实施批准。

`visual/assets/participation-cycle.json` 把回传循环写成可读日志：同步输入—重读变化—比较同类—验证包体—发布可审阅草案—建立现场与公共基线—有人值守窗口—回传负面和分布差异—保留、改造或退出。八个公共使用者镜头有意归并为七个不识别个人的参与 cohort；两套计数分别对应 persona matrix 与 participation cycle，均提供纸面、人工、多语种或无 App 路径。[metric:participation_lens_count] 本包目前只把主干同步、本地校验和同类比较记为已知的审阅活动；现场基线、居民咨询和公共试点仍为 `unknown` 或 `not_started`，不推断居民同意、微气候结果或健康收益。

## v1.8 评审可见证据层：定位、功能、节点与公共性一页回读

v1.7 的机器可读资产保留不变；v1.8 把最影响内容评分的证据直接写回 `proposal.md`，让不打开附加 JSON 的评审者也能逐项复核。这一节只复述任务书和本方案的概念接口，不把设计建议升级为政府决策或法定规划条件。[source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

### 1. 三大定位、五大功能、三区两翼的硬映射

| 任务书定位 | 本方案的空间/运营回答 | 可审阅证据 |
| --- | --- | --- |
| 百年京张文化带 | 双线身份系统、工程问题墙、清权文化导视、三站一轴 | `identity-system.json`、文化叙事段、身份图 |
| 都市 AI 生活体验带 | 无 App 服务、AI 医疗非诊断导航、公共状态板、蓝绿慢行与安静链 | 14 条场景矩阵、公共利益审计、`public_space.geojson` |
| AI 融合创新带 | 研发—开源—企业转化—公共测试—证据发布—扩散/退出 | 区域八要素回路、场景 RACI/SLA、分期表 |

| 五大功能（原文任务） | 方案落地接口 | 不是的东西 |
| --- | --- | --- |
| AI 全栈自主创新体系 | 众智园的预约测试、模型卡、红队沙盒、标准工作坊 | 不是未经安全审查的生产系统 |
| 世界级 AI 创新生态 | AI 原点的开源发布厅、北纬社区需求入口、区域协同回路 | 不是已签署招商或合作协议 |
| AI+ 场景赋能新范式 | 14 条触发—运行—复盘—归还场景卡 | 不是“装置越多越智能” |
| 智能化 AI 活力城市 | 大钟寺站城公共序列、低速具身智能、公共服务人工等价 | 不是以算法取代公共服务 |
| AI 治理全球话语权 | 安全红队、责任台、开源贡献与可撤回令牌的公开规则 | 不是国际组织背书或政策承诺 |

| 三区两翼 | 角色与接口 | 主要空间证据 |
| --- | --- | --- |
| AI 原点社区 | 世界级生态、近校转化、人才生活 | `PROV-KEY-002`、NODE-02 |
| 众智园 AI 自主创新加速区 | 全栈创新与治理话语权、可信研发花园 | `PROV-KEY-001`、NODE-01 |
| 大钟寺 AI 产业集聚区 | 智能原生新业态、国际会客厅 | `PROV-KEY-003`、NODE-03 |
| 中关村科技服务翼 | 要素全球配置、中关村 IP 与资本赋能 | 北纬社区/高校—企业—服务接口；概念建议 |
| 小月河场景赋能翼 | AI 场景、蓝绿系统、智能化日常城市 | 小月河—清河蓝绿慢行与雨洪维护接口；概念建议 |

### 2. 区域协同不是名单，而是可回流的责任链

| 区域接口 | 输入 | 京张带输出 | 需确认的责任/证据 |
| --- | --- | --- | --- |
| 北纬社区与海淀高校院所 | 居民问题、人才、开源议题 | 公开场景题、参与反馈、可复现实验 | 社区授权、参与补偿、隐私边界 |
| 怀柔科学城 | 上游科学、设施能力 | 面向公众的解释性展示与验证问题 | 科研设施运营方同意、数据清权 |
| 未来科学城 | 材料、能源、工程测试 | 低碳构件、排水、机器人接口小试 | 工程安全、生态和市政校核 |
| 北京经开区 | 制造、产业化和规模部署 | 经过安全门的公共验证证据 | 企业/园区合作、采购与责任边界 |
| 京津冀协同网络 | 多样城市场景与比较反馈 | 方案扩散、复用或退出记录 | 区域主管部门和运营方确认 |

每一条区域关系均为 `conceptual_suggestion`；不声称供地、投资、招商、数据共享或政府承诺。它的可实施单位是“一个问题、一个令牌窗口、一个责任人、一个公开复盘、一次扩散或退出”。这比把区域名词排列在地图上更能被运营团队接续。[source:AGENT-TASKBOOK]

### 3. 三处重点区的节点级计划

| 节点 | 体验序列（人可读） | 组件/具身智能边界 | 专业闸门与验收 |
| --- | --- | --- | --- |
| 众智园可信研发花园 | 到达 → 公共状态板 → 缝合阈 → 雨水树池 → 预约测试 → 回到公园 | 低速机器人仅在有界窗口；急停不占无障碍链 | 清河/防洪/交通/权属/消防确认；居民可无账号阅读、跨越、离开 |
| AI 原点开源转化街区 | 校园边界 → 开源发布厅 → 清权桌 → 贡献墙 → 学习共享 → 安静居住边 | 贡献可署名、撤回；数据不离沙盒；纸面与人工服务常在 | 校园/地块/文保/搬迁影响确认；贡献记录能追溯且可撤回 |
| 大钟寺城市级会客厅 | 轨道到达 → 四象限过街 → 安静座椅 → 短展 → 国际路线 → 日常商业 | 活动可降容为零；设备停靠、消防隔离、人工广播可见 | 轨道/道路/消防/客流/商业承载确认；活动结束后回到普通使用 |

这些不是控规地块、建筑施工图或工程量承诺；`visual/assets/key-area-node-plans.json` 记录每处的空间载体、组件、前置资料和 acceptance test。[data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]

### 4. 十四条场景的最低运营合同

| 场景组 | 空间载体 | 触发/最小数据 | 责任与 SLA | 非 AI 等价/退出 |
| --- | --- | --- | --- | --- |
| 慢行断点诊断、无障碍辅助 | 道路、公共空间 | 人工计数、障碍记录、无障碍路线 | 交通/无障碍负责人；季检/投诉 7–14 日响应 | 人工引导和实体导视；主链断裂即停 |
| 低速配送机器人 | 道路约束、可撤回停靠位 | 围栏、急停、现场安全员、事件日志 | 运营方负责，安全负责人问责；每次运行后 24 小时复盘 | 人工配送/手推车；严重冲突或急停失败即退出 |
| 模型红队与数据沙盒 | 受控测试房、公共状态板 | 清权样本、模型卡、评测日志 | 评测团队负责，实验室运营者问责；窗口结束发布摘要 | 纸面评测/专家会；来源不明即拒绝令牌 |
| 开源发布、企业服务、数据会客厅 | AI 原点/服务节点 | 授权材料、公开流程、审计日志 | 社区/服务负责人；活动 7 日记录，材料 2 工作日更正 | 人工柜台和公告栏；授权撤回即熔断 |
| 医疗导航与文化导视 | 社区服务节点、绿地 | 非诊断流程、清权史料、盲文/高对比 | 服务/园区负责人；人工窗口全时，导视损坏 48 小时替换 | 人工讲解、纸本、语音；误诊/史料不明即下架 |
| 智能原生零售、全球 AI 周 | 大钟寺商业/一轴三站 | 聚合客流、消防、安静区、活动内容 | 活动控制室/文化负责人；活动后 30 分钟恢复日常、14 日复盘 | 普通商业/公园开放；消防、噪声或居民主链超阈值即降容/取消 |
| 雨洪树池、夜间安静链 | 绿地、排水、公共空间 | 雨前后积水点、照度/噪声、人工巡查 | 资产负责人；雨前 24 小时、雨后 48 小时闭环，夜间每夜巡查 | 人工清疏、实体导向；关键雨水口逾期或照度/噪声超阈值即冻结 |

完整 14 行（含 data retention、relative cost band、success metric）见 `scenario-operation-matrix.json`。以上 SLA 是设计合同草案，不是法定标准；所有窗口结束后归还普通公共使用。

本轮增加 `visual/assets/run-open-pulse-scenario-audit.js` 与其回读结果 `open-pulse-scenario-audit.json`。它只读取包内的 14 条场景和 8 个行动包，确定性检查空间载体、触发器、最小数据、RACI、人工等价路径、停止/成功条件、验收、维护和 provisional 边界；同时把“缺 accountable”“缺非 AI 兜底/停止条件”“缺行动包停止条件”三个负例故意打坏，确认审计会拒绝它们。`node visual/assets/run-open-pulse-scenario-audit.js --check` 通过只表示结构合同可复现，不表示现场可达、运营 SLA、模型安全、工程批准或公开试点已通过。

### 5. 公共利益、参与和公平：先测再承诺

| 审计项 | 当前状态 | 试点前证据 | 冲突处置 |
| --- | --- | --- | --- |
| 无障碍连续与夜间可达 | 未知，不填造假基线 | 日/夜配对步行审计、照度/声音记录 | 暂停场景，给人工路线并公开修复 |
| 无 App 获得服务 | 未知，列入服务盘点 | 纸面、人工、语音、多语种路径测试 | 保留人工窗口，数字层不得成为前提 |
| 分组影响差异 | 未知，分组调查 | 老人、残障、照护、夜班、儿童、访客、小商户、维护人员参与 | 公开分歧，不以平均数掩盖差异 |
| 投诉与回应 | 未知，建立公共状态板 | 每案确认/修复时钟与责任人 | 7–14 日回应；无法修复则撤回 |
| 隐私与清权 | 仅最小数据、无个体轨迹 | 来源、授权、留存、哈希逐项核验 | 授权撤回/越权访问即熔断 |

参与原则是公开问题—给时间和渠道—返回决定及理由—记录异议—补救或退出。`public-interest-audit.json` 把这些要求变成可复核的指标和方法；它不把“待测”写成“已达标”。

### 6. 迁移机制和长期运营

本方案比较六种可迁移机制，而不是无来源地宣称“全球案例”：站点公共客厅、有界城市实验室、蓝绿服务街、开发者公共库、夜间安静网络、文化作为方法。每种机制都列出可借鉴、不可照搬、京张测试接口和正式引用前的证据。四季运营为春季问题征集、夏季场景开放、秋季开发者周、冬季证据复盘；每一季的 RACI、清权、维护、投诉和退出记录必须进入公共知识库。它可被专业、运营和传播团队继续深化，但不代表活动已经获批或已获资金。

v1.8 的验收不是“方案写得更长”，而是 13 个任务书评审维度均能回到一句可核验的话：目标/功能有映射，品牌有构造规则，区域有责任链，产业有测试门，场景有空间和感知路径，节点有闸门，公共性有基线计划，版权有逐路径证据，国际传播有双语入口，长期运营有 RACI/SLA 和退出。官方边界、控规、权属、市政、文保、交通、气象、雨洪和实测体验到位后，全部结果必须重算。

## 参考资料

完整的任务、范围、枚举、指标、数据、标准、深度、合规和停止条件登记见 `sources.json`、`standard_matrix.json`、`design_depth_matrix.json`、`compliance_matrix.json`、`data/source_registry.json`、`brief/site-package/design_brief.json`、`brief/site-package/allowed_design_space.json`、`brief/site-package/enums/`、`brief/site-package/ranges/planning_limits.json`、`data/processed/agent_fact_pack.md`、`data/processed/project_scope_summary.csv`、`data/processed/agent_task_requirements.csv`、`data/processed/source_use_matrix.csv` 和 `data/processed/missing_data_checklist.csv`。任务与处理资料的正文回链包括 [source:AGENT-TASK-REQUIREMENTS] 与 [source:MISSING-DATA-CHECKLIST]。

项目范围与来源用途的正文回链包括 [source:PROJECT-SCOPE-SUMMARY] 与 [source:SOURCE-USE-MATRIX]；正文中的证据标签按 `source:*`、`standard:*`、`depth:*`、`data:*` 与 `metric:*` 分别回到这些机器可读登记。临时几何、设计目标和未来实施建议仍按前文的证据边界解释，不替代官方红线或已批准的实施承诺。
空间复算入口是 [data:geometry/site_boundary.geojson#SITE-001]，总体设计范围面积对应 [metric:site_area_sqm]；这是机器可读审计入口，不是独立来源条目。
