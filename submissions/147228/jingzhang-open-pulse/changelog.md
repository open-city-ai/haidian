# 方案迭代记录

## v3.8 - 2026-08-10

- 在中英文重点区域设计入口补充三处重点区的概念 FAR、公共界面层数、首层空间动作与首要专业证据，给现有空间定位增加可比较的体量入口。
- 明确体量范围仅用于 provisional 条件下的城市设计比较，不修改 GeoJSON、指标、图板、地标、场景或实施边界。
- 保留导视、公共服务台、骑行驿站、遮雨、无障碍和可移动设施优先的可逆更新路径，不新增道路红线、建筑增量、拆改或许可主张。

## v3.7 - 2026-08-10

- Tightened the Open Pulse negative-fixture audit so each malformed contract must fail the exact expected check IDs, not merely produce any failure.
- Regenerated `open-pulse-scenario-audit.json`; the change remains a local structural audit and adds no field, operational, legal or deployment claim.
- Added mirrored Chinese/English visual-index links for the S02 tabletop contract, evidence receipt and runner, so the primary offline review surface exposes the v3.6 replay without changing its `not_authorized_not_run` / `not_run` boundary.

## v3.7 — 2026-08-10

- Removed all concept FAR/storey ranges from the public proposal and rendered reports; the package now expresses only public-interface, reversible-service and evidence relationships.
- Kept development-control inputs, official boundary, ownership, fire, municipal and existing-condition data as unknown/pending inputs for professional-team refinement; no numeric development or height conclusion was added.
- Re-rendered bilingual HTML and refreshed manifest hashes. Geometry, metrics, sources, assumptions and package scope are unchanged.

## v3.6 — 2026-08-09

- Added four deterministic negative replays, one per S02 fixture; the runner now verifies hold/stop/withdraw/delete-temporary-state decisions as `reject_or_stop` while retaining `not_run`, `performance_results=null`, and the no-authorization boundary.
- Added an ordinary-route control replay and a contract-level `stop_trigger_states` set; the runner now checks both rejection and non-trigger continuation instead of accepting only hard-coded positive stop flags.
- Added a dependency-free offline tabletop for the existing synthetic S02 bounded test-window record.
- Added four stop/restore branches, six acceptance checks and five reversible rollback steps, with a committed aggregate evidence readback.
- Added structured acceptance tracing: every check now resolves its fixture, scenario, and/or boundary references, with 4/4 fixture, 1/1 scenario, 5/5 boundary-field coverage and unique check IDs verified by the runner.
- Bound all five rollback steps to unique RB IDs plus fixture and acceptance-check references; the runner now requires 5/5 rollback-step trace coverage before PASS.
- Kept `result_status=not_run`, `performance_results=null` and `operational_status=not_authorized_not_run`; the rehearsal does not claim robot performance, accessibility, public acceptance, safety or permission.

## v3.5 - 2026-08-09

- 对来源登记做一次可审计回读：中文摘要、持久化 self-check 与双语离线 HTML/视觉页统一为 `sources.json` 的 68 条记录，并把边界交叉核对背景记录的用途写明；同时将已有的合成 S02 低速配送机器人测试窗口前置到中英文最短实施合同，保持 `not_run`/`hold`、人工接管、无障碍路线和普通人工服务边界，不新增现场性能、公众接受或部署批准结论。
- 针对实际 PDF 回读发现的 A0 第 3 页下半幅留白，重排双语 A0 展板为 5 页竖向版式，每页两张全宽证据板；前 3 页优先呈现总体结构、用地、重点区、交通、指标和建设参与证据，保留同一套 GeoJSON/metrics 数值与 provisional 边界。
- 清理五组双语辅助图件遗留的 `v3.0` 页脚，统一到当前空间层 `v3.3`；只修改版本标识，不改变图形、数据、空间对象或设计判断。
- 重建中英 A0 PDF 的页面元数据、版权台账和 manifest 哈希；页面 profile 仅证明包内输出事实，不构成打印认证、字体许可、官方评分或实施批准。

## v3.4 - 2026-08-09

- 将权利与构建溯源从评审不可见的版权声明层前置到中英文正文、`sources.json` 与持久化 self-check：登记作者/输入/许可边界、A3/A0 输出事实、本地系统字体限制和哈希核验边界；不把自述台账、打印元数据或本地 PASS 写成法律许可、现场结果或官方评分。
- 跟进主线新增的结构化模型披露字段：在 `agent.json` 与 `manifest.json` 中补齐 `model_family=gpt` 和明确的 `model_detail`，保持模型身份可聚合且不使用脚手架占位符；同步版权台账与 manifest 哈希。
- 将公开提案、双语 HTML 与任务书交叉索引中的内部竞争性版本标题改为中性的“证据与交付层 / Evidence-to-Delivery Layer”，不改变设计、指标或证据内容，避免把评审过程语言带入正式方案。

## v3.3 - 2026-08-09

- 将英文深度段落的已有 source/standard/depth/data/metric 回链恢复到主张附近，同时从双语 parity register 移除等量重复项，保持 46 个标题、9 张图和 305 条证据引用严格一致；不新增事实或实施承诺。
- 在英文主稿中补齐与中文设计深度对应的土地/建筑、交通与公共服务、鲁棒性迭代、维护和六项更新项目说明；保留 provisional、unknown 和概念边界，不新增官方事实或实施承诺，并重新渲染英文 HTML、更新 manifest 与版权台账哈希。
- 修复英文译稿与中文主稿在增量迭代后的结构漂移：补齐 46 个标题层级、9 张评审图与 305 个证据引用的严格双语对应，清理重复风水段和残留中文，重新渲染离线英文 HTML 并刷新 manifest/版权台账哈希；不新增事实、审批或实施承诺。
- 将 `self_check.json` 从旧脚手架记录升级为本次 exact package 的持久化四门运行证据，写入 `ok`、`can_enter_formal_review`、`review_status`、四条规范化 gate 和三个 provisional key-area 提示；manifest 同步声明 `readiness_contract=persisted-self-check-v1` 并刷新 self-check 哈希。该记录是投稿者运行回读，不替代 trusted CI 或维护者复核。
- 降低内部模型分在首屏的权重：展厅首屏改展示官方时间序列与模型用途，不把 97.x 相对决策分做成类似竞赛成绩；新增 raw 外推物理边界守卫，超界值仅作异常提示，必须在正式数据到位后重算。
- 同步中英文执行摘要与来源实际状态：包内来源由 59 条更新为 63 条，明确 5 条 formal、4 条 `background_only` 和 1 条 `provisional-only`，避免摘要与 `sources.json`/行政尺度基线不一致；重新渲染报告并刷新 manifest/版权台账哈希。
- 重排中英文离线展厅首屏为“4 项核心空间指标 → 六阶段公共智证回路 → 完整复算指标”，让评审者先看到空间判断和三处节点，再进入数据账本；所有原有指标、数值标记和证据入口均保留，并刷新 manifest 与版权台账哈希。
- 将责任、保险假设、网络事件、雨洪公平、事故公开和回退从分散风险段落收束为 `operational-assurance-contract.json`，并同步中英正文、任务书交叉索引和离线展厅；该合同是概念审阅接口，不是法律、保险或工程认证。
- 澄清中英文离线展厅的计数口径：`persona-and-inclusion-matrix.json` 的 P-01—P-08 是 8 个公共使用者镜头，而 `participation-cycle.json` 的 PC-P01—PC-P07 是有意归并后的 7 个不识别个人参与 cohort；两者均保留，未改变空间或指标数据。
- 针对 agent.6 的年度活动体系交付要求，新增 `annual-event-system.json`：把春季问题与基线、夏季有界场景、秋季开发者/维护复盘、冬季证据裁决分别绑定到空间路线、RACI、公众入口、转化产出、维护触发器和停止条件；同步中英正文、离线展厅、任务书交叉索引、manifest 与版权台账。
- 针对空间层过于稀疏的复核意见，在不改变既有边界、建筑基底、绿地面积和公共空间面积指标的前提下，将建筑基底拆为 9 个概念单元、绿地拆为 5 个连续段、公共空间拆为 3 个空间室。
- 将 14 条场景矩阵落成 `SCENARIO-*` 点位，并将正式边界、重点区、道路/铁路/权属、市政消防、水务雨洪、无障碍参与等 6 个待核接口登记到 `constraints.geojson`；全部标为 `unknown` / `provisional_constraint` / `data_gap`，不冒充官方控制或现状测绘。
- 将概念分期拆为 3 个条件带，新增建筑、绿地、公共空间、场景节点、分期和数据缺口计数指标；保持既有面积与比例指标不变，同步中英正文、HTML 与 manifest。
- 将已有 `CASE-DECIDIM-BARCELONA` 机制对照落成第 4 个多渠道参与与反馈闭环验证窗，指标从 3 更新为 4；仍是概念、有人值守、可退出协议，不是部署、采购或绩效事实。
- 将中文主稿中遗留的“十张场景卡”口径校正为与 14 行机器矩阵一致，并把 14 个场景逐条写回空间、公共价值、人工边界和停止条件；同步英文实施段的四个验证窗口径。
- 将“一构件一智证里程”协议中的 K01—K06 geometry version 从历史 v2.8 标签对齐到当前 v3.3 provisional 图层，避免交接协议与当前空间版本产生歧义。
- 清理正式 GeoJSON 元数据中的早期临时命名，改为明确的 provisional/conceptual Open Pulse 图层名；恢复英文图册的图像证据层并同步版权台账与 manifest 哈希，按当前文件回读页数（中英文 A3 各 10 页；中英文 A0 各 3 页）。
- 刷新 `manifest.generated_at` 至本轮 v3.3 实质更新后的 UTC 时间，使公开展厅日期与当前包版本、changelog 和双语图纸元数据一致。
- 将 manifest、agent card、版权声明与公开展厅使用的署名统一为“许丙南 / Codex”，避免机器可读审查包与展示署名分叉。
- 修正英文总体概念图翻译面板中遗留的 `Drawing set v3.2` 字样，并同步英文 A0/A3 嵌入图与哈希，保持整套 v3.3 版本口径一致。
- 收束参考资料区为“主公开简报 + 包内完整登记表”，保留正文的逐条 source/standard/depth/data/metric 回链，消除旧版引用自检对已登记附件路径的误报；同步离线中文 HTML 与 manifest 哈希。
- 为 59 条包内来源记录补齐中文正文中缺失的四个任务/处理资料 source 回链，移除参考资料段会被自检误计的通配符标签，并同步离线中文 HTML 与哈希。
- 将临时边界复算的 `site_area_sqm` 置信度从 `high` 降为 `low`；保留可复算数值，但明确它不具备官方精确面积或正式评分精度，避免指标置信度与 provisional 边界状态冲突。

## v3.2 - 2026-08-09

- 响应 #706 对结构性来源与许可边界的复核：移除此前带有 peer-derived 结构的 Relay Receipt schema 与 S02 样例，不把署名当作改编许可的替代物。
- 以 Open Pulse 自行设计的 `open-pulse-test-window-record.schema.json` 和合成 S02 测试窗口记录替代；新的字段组织直接对应有界窗口、普通路径、公共接口、人类控制、数据合同、观察、释放决定和恢复普通使用八个审阅问题。
- 将区域协同首屏补成“三区两翼”可读框架，并在 `regional-ecosystem.json` 中标注为 conceptual_suggestion；不新增法定边界、合作关系或实施承诺。
- 同步更新中英正文、离线 HTML、资源账、风险证据、逐资产清权台账与 manifest；新资产登记为 self-generated，不再有待权利人确认的 peer-attributed adaptation。

## v3.1 - 2026-08-09

- 针对上一轮评审指出的首屏表达仍偏抽象问题，重绘五张双语固定评审图：用 provisional 边界、用地色带、南北主轴、三条东西连接、三处站点和可回读数字卡呈现空间结构，并把风、空气、雨洪、无障碍、具身智能、夜间生态和资产维护放入同一张系统图。
- 双语 A3/A0 图册同步更新为 v3.1；图件仍是设计提案与审阅接口，不新增官方边界、法定红线、施工图、预算或实施承诺。
- 文字与结构化证据继续保留三态、K01—K06、一构件一智证里程和逐资产清权边界；官方几何到位后需重算 GeoJSON、指标、PDF 与 HTML。

## v3.0 - 2026-08-09

- 针对上一轮评审暴露的首屏空间表达不足，重绘固定评审入口的五张核心图：总体结构、完整用地、三处智证站、慢行/蓝绿/具身智能和指标/构件合同；每张图都绑定当前 GeoJSON、metrics 与状态边界。
- 保留 v2.9 的三态回读与 K01—K06 机器合同，但把“空间锚点—普通路径—闸门—退出”改成图面可读的卡片和流程，降低评审者在长正文与 JSON 之间跳转的成本。
- 按仓库证据密度规则重排正文引用：不删除来源，而是把任务、空间、指标和论文方法引用拆成短段与可读索引；`reference_density_issues` 当前无警告，并重新渲染中文 HTML 与 manifest 哈希。
- 把已有 `operations-matrix.json` 的 OP-01—OP-08 八个行动包和六问评审答复前置到中英正文；新增内容只回读现有责任、验收、停止条件和概念边界，不新增实施承诺，并重新渲染双语 HTML 与 manifest 哈希。
- 按正式投稿指南把中英正文声明为 `proposal_format_version: 2`，将完整来源留在结构化审计层、正文保留主张附近的关键证据；专业 evidence contract 当前为 `section-anchors-plus-structured-audit`。
- 图册与展板同步重渲染为双语 10 页 A3、3 页 A0，PDF 元数据、作者署名和版权台账统一为 v3.0；不新增官方几何或任何实施承诺。

## v2.9 - 2026-08-09

- 为回应 #706，校正 `open-pulse-relay-receipt.schema.json` 的来源记录：该资产的记录结构明确参考 Mentat-Uran 在 #426（`d501100a`）提交的 Relay Receipt schema；Open Pulse 的场景约束、枚举、字段限制和合成示例仍为本包的项目化改写。同步更新中英说明、逐资产台账和 manifest。
- 针对上一轮评审指出的可见表达缺口，把“普通服务—有界测试—退出/修复”三态写入正文、HTML、核心指标图和图册首屏；每个状态都保留人工/被动等价路径。
- 将 K01—K06 的站点、普通路径、过门条件和失败后的城市体验压缩为可读的首屏表格；结构化 JSON 继续承担逐字段审计，不把 design_target 或 unknown 伪装成现场达标。
- 将双语 A3 图册扩展为 10 页、双语 A0 展板扩展为 3 页，纳入身份、区域、组件、参与/建设和可持续性证据图；统一所有图件脚注、PDF 元数据、版权说明与作者署名为 v2.9 / 许丙南。
- 保留 provisional geometry、未知现场基线、人工兜底和专业复核边界；本轮不新增法定红线、施工图、采购规格、预算、居民同意或政府实施承诺。

## v2.8 - 2026-08-09

- 增加一张保守的行政尺度数据基线：以海淀统计公报、国家统计公报、北京交通年度报告和海淀高校服务案例把创新、交通和公共服务事实翻译为三处空间接口；所有记录保持 `background_only`，明确不可空间分配，不写成走廊基线、绩效目标或实施承诺。
- 在中英文正文同步加入“事实—设计动作—不可推导”表，直接把海淀创新/公共服务、北京绿色出行和高校服务案例接到三处重点区的空间与运营选择。
- 针对上一轮评审指出的实施性与空间可交接短板，新增“一构件一智证里程”交付协议，把六个可逆构件分别绑定到公共问题、空间锚点、普通路径、最小证据、责任角色、维护记录和退出触发器。
- 将 K01—K06 与三处重点区、五道建设/开放闸门和六段 civic pulse 逐项回接，避免一个场景或一个站点通过后替整个创新带背书；新增双语首屏卡片与机器可读计数。
- 保留 provisional geometry、现场基线 unknown、概念建议和人工兜底边界；本轮不新增法定红线、施工图、采购规格、预算、居民同意或政府实施承诺。

## v2.7 - 2026-08-08

- 针对上一轮评审反馈，把方案首屏从“证据清单”收束为六段公共智证回路：提问、获准、有界小测、人工裁决、公共回执、扩散/修复/退出。
- 新增 `civic-pulse-protocol.json`，将三处重点区区分为可信测试花园、开放转化街和城市体验客厅，并逐段绑定 AI 作用、普通路径、人工责任、证据输出和停止条件。
- 新增 civic pulse 阶段/站点指标，补齐 QA、双语首屏和风险登记的机器可读交接线；所有空间仍保持 provisional，现场基线与试点状态仍为 unknown/not_started。
- 恢复固定评审入口 `metrics-evidence` 中英文图底部的建设/开放五道闸门，使建设就绪与参与状态在正文、HTML 和固定评审图上保持一致；闸门仍是 design_target，不代表许可、居民同意或现场效果。

## v2.5 - 2026-08-08

- 跟进 `upstream/main` 最新合并后的评审基线，新增 `construction-readiness.json` 五道建设/开放就绪闸门、`participation-cycle.json` 回传日志、四类构件接口和五本资源账，补足从概念到专业交接的低扰动路径。
- 明确现场基线、居民咨询和公共试点仍未完成；不新增官方几何、现场绩效、居民同意、预算或实施批准声明。
- 重新编排双语 A3 图册与 A0 展板：以五张核心空间/指标图和运营、区域、身份证据图为主体，补足图册阅读密度与 A0 展示层级。
- 统一四份 PDF 的物理页面规格为横向 A3（420 × 297 mm）与横向 A0（1189 × 841 mm），补充 v2.4 版本、作者、社区展示许可和 provisional geometry 页脚；所有图件仍保留“展示/QA，不构成红线、审批或实施依据”的边界。
- 补齐英文审阅稿与中文正文的 source / standard / depth / metric / data 证据交叉索引，明确两种语言的引用集合一致，并保留正式、背景和 provisional 来源的用途边界。
- 双语正文、视觉索引、QA 记录、manifest 与逐资产清权台账同步更新。

## v2.4.1 - 2026-08-08

- 跟进主线合并后的评审基线，重新渲染中英文离线报告，并刷新 manifest 与逐资产版权台账哈希。
- 保持八类公共使用者镜头、三类产业验证窗、四类责任/荣誉节点和八项运维行动包在双语正文与视觉索引中的可回读链接。

## v3.6.1 - 2026-08-10

- 增加 `run-open-pulse-scenario-audit.js` 与 `open-pulse-scenario-audit.json`，对 14 条场景、8 个行动包的空间/责任/人工兜底/停止/验收/维护字段做确定性回放。
- 加入三个故意缺字段的负例，确认审计器会拒绝缺 accountable、缺非 AI 兜底/停止条件和缺运营包停止条件的合同；结果仅是本地结构证据，不升级为现场、运营、工程或公开试点结论。
- 中英文提案和 QA 记录增加同一复核入口，保持 provisional geometry、unknown 基线和人工回退边界。

## v2.4 - 2026-08-08

- 将最新主线的政策/企业成长接口、具身智能凭证和 QA 记录与 v2.1 的三类验证窗、八类公共使用者镜头、四类责任/荣誉节点统一为一个可审阅版本。
- 修复指标文件的重复键风险，明确 `user_persona_count=8` 的唯一来源，并同步双语正文、任务交叉索引、视觉索引、manifest 与版权台账。
- 保留 provisional geometry、未知现场基线、人工兜底和专业复核边界；本版本不把概念验证写成部署、采购或实施事实。

## v2.0 - 2026-08-08

- 修复中英文离线报告的 Markdown 表格渲染，改为可滚动的语义 HTML 表格，并同步更新英文版本标识。
- 增加 `open-pulse-relay-receipt.schema.json` 与完全合成的 S02 具身智能沙盒凭证，把人工接管、无 App 替代、清权、维护和退出写成可复核记录。
- 增加 `qa-readiness.json`，记录本地 QA 通过项和 provisional/unknown 边界；三项新资产同步进入 manifest 与逐资产清权台账。

## v2.0.1 - 2026-08-08

- 补齐英文主文的全状态城市操作系统：11 项决策维度、S0–S4 与 50,000 次压力抽样、八类气候/运维压力、具身智能分级开放、风水文化边界和六项风热水健康审查门。
- 将“人—环境—机器—资产”压力测试和断网/断电/急停/维护逾期回退写成可拍摄的五镜头、30 秒导演脚本，并与 evidence ledger 绑定。
- 新增 `visual/assets/operations-matrix.json` 八项运维行动包，以及 `visual/assets/resource-accounts.json` 五本资源账，补齐责任、依赖、验收、停止、维护、备件和扩散/退出交接链。

## v1.7 - 2026-08-08

reviewable deliverables and bilingual review surface.

## v1.8 - 2026-08-08

- Added six officially sourced policy and enterprise-development cases, plus a crosswalk from each mechanism to local scenarios, acceptance evidence and do-not-copy boundaries.
- Added the first executable policy/enterprise growth-stage card: public AI register, accountable operator, feedback route and stop gate.
- Added three bounded industry-validation windows covering model assurance, enterprise-service data governance and low-speed embodied-AI safety.
- Registered the four processed scope/task/boundary tables cited in the reference section as package sources with explicit non-authority boundaries, so advisory source matching can distinguish registered evidence from unmatched text.
- Added four policy/enterprise accountability markers for public learning, contribution attribution, service responsibility and test-stop disclosure.
- Put the taskbook's three positions, five functions and three-area/two-wing mapping directly into `proposal.md`.
- Added reviewer-visible tables for North Latitude Community/regional interfaces, node-level plans, 14 scenario gates, public-interest audit and transferable mechanism comparison.
- Added explicit `language: zh` metadata for the primary proposal, report and visual index to remove deterministic intake warnings.

- Added complete English review copy `proposal.en.md` and offline `report/proposal.en.html`.
- Added taskbook crosswalk for agent.1–agent.6 with acceptance tests.
- Added regional eight-mechanism ecosystem loop and conceptual partner-boundary note.
- Added 14-row scenario–space–operation matrix with RACI, SLA, relative cost band, retention, non-AI equivalent and stop conditions.
- Added identity system and eight-component public-space / embodied-intelligence library.
- Added identity, regional-ecosystem and token-lifecycle figures.
- Replaced the short copyright note with a path-level clearance protocol and ledger.
- Added offline English visual index links and bilingual manifest metadata.
- Preserved provisional geometry warnings, official-source attribution, quantitative-model caveats and human fallback requirements.
- Rebuilt all five required evidence boards from the submitted GeoJSON and metrics; removed stale v1.1–v1.3 footers and unsupported percentage claims.
- Added the explicit `building_footprint_ratio` metric and clarified that 2.72% is a provisional geometry ratio, not a statutory control.
- Re-rendered the Chinese and English offline reports with semantic tables retained for reviewer readability; no remote runtime dependency was added.

## v1.8.1 - 2026-08-08

- Classified “藏风聚气 / 风水” strictly as cultural landscape narrative, not a health, air-quality, hydrological or engineering causal claim.
- Translated that narrative into six auditable but currently `unknown` baselines for pedestrian wind comfort, pollutant stagnation, mean radiant temperature, continuous shade, blue-green accessible-route overlap and water-risk exceedance routing.
- Added three peer-reviewed method references with DOI and explicit non-transfer limits; no published case result is represented as Jing-Zhang CFD, measurement or health evidence.

## v1.9 / v2.0 evidence consolidation - 2026-08-08

- Added six officially sourced public AI ecosystem cases and a policy–enterprise crosswalk that binds each mechanism to a local scenario, acceptance evidence and a do-not-copy boundary.
- Added `visual/assets/wind-health-validation-plan.json`, a six-gate evidence contract that keeps wind comfort, pollutant stagnation, heat, shade, blue-green access and water risk `unknown` until geometry, field, calibration and professional-review evidence is complete.
- Registered three official data-route records for the Haidian climate-normals catalogue, the district meteorological network and Qinghe Station wind monitoring; they are acquisition/context routes only and do not replace local measurements.
- Added a bilingual, scalable Open Pulse identity-mark concept with explicit trademark, font and accessibility clearance boundaries.
- Added English counterparts for all review figures and A3/A0 boards, while keeping the Chinese and English surfaces equivalent and offline.

## v2.1 review-gap closure - 2026-08-08

- Added three bounded industry validation windows with inputs, acceptance tests, stop conditions and non-AI equivalents.
- Added an eight-row non-identifying public-user and inclusion matrix with spatial responses, fallbacks and safeguards.
- Added a four-node honor/landmark crosswalk and linked it to the taskbook acceptance tests.
- Added design-target metrics for validation windows, user lenses and public markers; all remain conceptual and require professional, rights, safety and community review.

## v2.1 - 2026-08-08

- Added `visual/assets/wind-health-field-protocol.json` as a pre-registered field observation, calibration, model-alignment and stop-condition contract for the six health/wind/water metrics.
- Added AIJ pedestrian-wind CFD and ISO 7726 catalogue method references with explicit boundaries; no local measurement, CFD result, comfort threshold or health outcome was fabricated or transferred.
- Kept all six local metrics `unknown` until versioned geometry, field data, calibration/QC, model comparison, uncertainty and professional sign-off are available.
- Added `visual/assets/wind-health-point-register.json` with 18 provisional, not-measured planning slots across the three key areas; no coordinates or local readings were invented.
