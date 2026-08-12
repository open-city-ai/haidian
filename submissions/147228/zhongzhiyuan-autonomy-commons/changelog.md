# 方案迭代记录

## v3.9 - 2026-08-12

- 把评审首屏重构为“一条普通路线、三座公共证明庭、六个自动驾驶机制、一个可撤回年度循环”，并把 P0 七环完整路线回执前置；图面仍为 provisional 概念约束，不表达道路批准、车辆部署或现场成绩。
- 将六个泛 AI 治理案例替换为北京、新加坡、英国、伦敦、日本永平寺和美国 NHTSA 的官方自动驾驶机制；每例同时登记可迁移动作与禁止推断，不迁移许可、伙伴、责任或运营结果。
- 重做双语 A0/A3 首屏以消除原 A3 的原始 Markdown 表格和代码感，保留原页数与页面规格；新增确定性构建证据和检查入口。
- 同步双语正文、任务书交叉索引、离线报告与 manifest；现场基线、官方边界、许可和绩效继续保持 `unknown`、`false` 或 `not_authorized_not_run`。

## v3.8 - 2026-08-10

- 新增公共路线连续性契约、示例记录、无依赖 checker 和 10 个确定性 fixture；四类复核者、非 AI 等价路线、caution 限值和重开/两轮清除规则均保持为设计闸门，不升级为现场绩效或运营许可。
- 新增 P1—P9 用户/责任角色矩阵、三项公共地标目录、四季活动与长期运营节奏、14 行场景运营合同及其 fail-closed checker；正文明确区分 12 张 AV 场景卡与 14 行运营矩阵。
- 新增任务书 63 项逐条覆盖与五条勘误记录；修复 Autonomy 包内残留的 Open Pulse 身份文字，使身份不变量回到普通路线连续线、三座试验庭和两条人本安全弧。
- 将未随包提供独立复算输入的历史 OSM 计数与 resilience v1.3 模型值降为 `unknown`/`not_applicable`，避免历史数字被误读为当前 Autonomy 已知事实。

## v3.7 - 2026-08-10

- 增加包根 `risk.json`，把八个标准风险维度、缓解动作与人工复核入口结构化；明确它不是现场风险评估、许可或运营安全结论。
- 修复任务书成果唯一索引中的断头章节锚点、`Token Pulse` 概念漂移和风热健康验证计划的错误包身份；所有锚点现在回到本包现有正文。
- 同步双语正文，保留自动驾驶 tabletop 的 `not_authorized_not_run`、现场基线 unknown 和 provisional 几何边界。

## v3.6 - 2026-08-10

- 在中英文自动驾驶设计依据入口前置六层证据等级表，把任务/监管路径、临时空间、包内读数、合成回放、论文方法和阻断责任记录分开。
- 为每层同时列出可支持与禁用结论，明确 `known`、`design_target`、`unknown`、`blocked` 和本地 PASS 不代表现场绩效、专业批准、P1/P2 授权或官方评分。
- 重新生成双语 proposal report，并刷新 manifest 与清权台账哈希；不改变 provisional geometry、自动驾驶指标、运行边界或实施承诺。

## v3.5 - 2026-08-10

- Added a bilingual node-interface plan and schematic that make the three autonomy nodes spatially legible as ordinary route → public status/consent → bounded service → human handover/stop → ordinary route.
- Kept the new register concept-only and functional-bands-only: dimensions, capacity, speed, right-of-way, permits, operators and performance remain null or unknown; no road section, redline, or field result was added.
- Regenerated both bilingual reports and manifest/copyright hashes after the scoped visual and narrative addition.

## v3.4 - 2026-08-10

- 将三座试验庭的体量表改为公共界面与可逆服务关系，删除未有本地控规、权属、测绘或工程资料支持的 FAR、层数和高度范围；开发控制与工程尺度继续保持待专业团队确定。
- 同步中英文 proposal 与离线 HTML，保留自动驾驶路缘、人工接管、无障碍连续、可回退和 provisional geometry 边界；不新增道路、许可、运营或性能主张。

## v3.3 - 2026-08-10

- 在中英文“路缘先于车道”入口增加典型路缘断面，把连续人行/无障碍带、路缘服务带、换乘求助节点和维护/应急回退带翻译成可见空间动作；不补写工程尺寸、道路红线、车辆速度或许可。
- 为六张核心图件增加图注式设计主张，说明它们分别回答公共轴、重点区界面、回退系统、阶段门、准备度和用地分层问题；图件仍不代表现状测量或部署结果。
- 保留 `unknown`、`design_target`、`not_authorized_not_run` 和 provisional 几何边界。

## v3.2 - 2026-08-10

- 在中英文重点区域入口补充三座试验庭的概念 FAR、公共界面层数、自动化服务与人本路径的空间分层，以及首要专业证据。
- 明确这些体量范围只用于城市设计比较，不改变 `autonomy_nodes.json`、几何、指标、场景、许可和部署边界。
- 保留可撤回设施、人工接管、provisional 几何和未知现场基线；不新增道路、建筑、拆改或社会道路运营主张。

## v3.1 - 2026-08-10

- Aligned the Chinese AV-T03 rollback-gate status with `visual/assets/curbside-test-gates.json`: `baseline: unknown` now renders as `UNKNOWN`, rather than visually upgrading an unmeasured weather/network outcome to a design target.
- Refreshed matching manifest and copyright-ledger hashes for the changed visual index, figures and changelog; no gate register value, performance result, permit, deployment or official-score claim changed.

## v3.0 - 2026-08-10

- Corrected the bilingual autonomy-readiness data plate and its visual-index captions from four candidate nodes to three, matching `visual/assets/autonomy_nodes.json` (`AUTO-NODE-001` through `AUTO-NODE-003`).
- Revalidated the 2400 × 1700 figures after a surgical presentation edit; the register, scenario count, gate count and metric status are unchanged.
- This is a figure-integrity correction only; it adds no road, permit, deployment, performance or official-score claim.

## v2.9 - 2026-08-09

- Added bilingual acceptance-trace quick maps so reviewers can follow each check to its gate, fixture, scenario or boundary field without searching the contract; the maps are reading aids only and the runner remains the source of structural validation.
- Added a bilingual first-screen executive brief with a five-step ordinary-person acceptance chain: choose, request, take over, rollback and independently replay/exit.
- Bound each step to visible space/service, retained evidence and a fail-closed action; preserved the existing synthetic-only boundary and did not add field, permit, deployment or performance claims.
- Regenerated both offline reports after the narrative addition; no geometry, public gallery artifact or official score was changed.

## v2.8 - 2026-08-09

- Clarified the bilingual first-screen acceptance brief as target design only: planned service interfaces and stop controls are not deployed, authorized or independently verified. No geometry, metric, permit, deployment or performance claim changed.

- Added structural trace checks to the curbside tabletop runner: acceptance checks now bind to concrete fixtures, gates and scenario-matrix rows, while artifact identifiers, counts, boundary fields and rollback declarations reconcile before a local PASS is emitted. This remains an offline synthetic consistency check; it adds no field, permit, performance or deployment claim.
- Added four deterministic synthetic negative replays, one per stop-if fixture; the runner now records and verifies `reject_or_stop` while retaining `not_run`, `performance_results=null`, and the no-authorization boundary.

- Added a bilingual, offline synthetic curbside tabletop bound to AV-T01—T03 and S01—S03, with four fixtures, seven acceptance checks, five rollback steps and an executable network-free runner.
- Kept the evidence boundary explicit: `not_authorized_not_run`, no field data, `performance_results: null`, and unknown baselines; the tabletop proves control wiring only and does not claim a permit, deployment, safety assessment or performance result.
- Regenerated the bilingual reports and manifest after adding the contract, receipt and runner; no geometry, official score or public-gallery artifact was changed.

## v2.7 - 2026-08-09

- Removed the stale duplicated Chinese proposal tail left after the v2 readable surface and reduced both bilingual reference sections to a pointer to `sources.json` with claim-adjacent anchors only.
- Regenerated both offline reports after the cleanup; no geometry, metric status, permit, deployment or ranking claim changed.

## v2.6 - 2026-08-09

- Aligned `manifest.validation_claim.self_checked` with the package's recorded passing deterministic, spatial, visual, and professional self-checks; this is a local package claim, not an official Review Agent score or deployment approval.

## v2.5 - 2026-08-09

- Reworked the Chinese and English review surfaces into proposal-format v2: claim-adjacent evidence anchors remain readable while the complete source, standard, depth and metric indexes stay in the structured package files.
- Removed dense inline evidence dumps from the narrative and regenerated both offline reports; no source registration, geometry, metric status, permit claim or deployment claim changed.

## v1.7–v2.0 — 2026-08-08 · evidence and package baseline

- Consolidated the formal package's bilingual review surface, official-source attribution, provisional geometry warnings and quantitative-model caveats.
- Added climate and public-interest validation protocols as reusable method contracts; they keep local wind, heat, water, ecology and health baselines `unknown` until lawful data, field measurement, calibration and professional review exist.
- Added the regional ecosystem crosswalk, 14 supporting cross-domain rows and a self-generated identity direction. These are package-level research aids, not Open Pulse branding, operating commitments or local performance results.
- Added English review copies and offline figures while preserving one-to-one Chinese/English claim boundaries.

## v2.1 - 2026-08-08

- Created a distinct autonomous-mobility proposal: “智行京张：自动驾驶普及后的公共带”, rather than renaming the earlier Jing-Zhang package.
- Added three provisional autonomy test yards, one human-first audit route, 12 machine-readable scenario cards, three curbside test gates and an evidence crosswalk.
- Added explicit boundary language for Beijing AV testing policy: designated roads, safety assessment, qualified subjects and human fallback are prerequisites; no local road, permit, operator or vehicle is claimed.
- Rebuilt the five primary figures and bilingual A3/A0 boards around human continuity, curb states, stop conditions and evidence gates.
- Added autonomous-mobility coverage to the compliance, standards and design-depth matrices; unknown baselines remain unknown until field and professional review evidence exists.

## v2.2 - 2026-08-08

- Corrected `autonomy_metric_count` from 9 to 11 so the metric ledger matches the 11 autonomy-specific keys in `metrics.json` (4 known, 7 unknown).
- Added bilingual responsive evidence-ledger dashboards with a status ring, exact spatial ratios and a clear rule that unknown is not pass.
- Updated visualization and metrics hashes in `manifest.json`; no performance claim, permit claim or local road-opening claim was added.

## v2.3 - 2026-08-08

- Replaced the coral “known coverage 36.36%” bar with “unknown share 63.64%” (`7 ÷ 11`) in both languages.
- Aligned the ring, status cards, ratio bar and legend so coral consistently means pending field evidence.
- Confirmed the dashboard hierarchy at tablet and 390-pixel mobile widths; no metric value or project claim changed.

## v2.4 - 2026-08-09

- Added a bilingual 2400 × 1700 autonomy-readiness data plate, rendered from the package's machine-readable metrics, scenario, node, field-gate and evidence-route registers.
- Made the chart compute the autonomy-only status mix from the 11 named metric keys (4 `known`, 7 `unknown`) and localized all three stop conditions; no performance, permit or deployment claim was added.
- Embedded the Chinese and English plates in both proposals, rendered reports and visual evidence ledgers, and corrected the English proposal/report to use the existing English figure variants.
- Refreshed `generated_at` only after this substantive package update and regenerated the manifest and copyright-ledger hashes.
