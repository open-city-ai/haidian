# 方案迭代记录

本文件记录 `jingzhang-ai-belt`（京张回暖线 / THE WARM RETURN）提交包的版本变化、评审反馈处理与仍未关闭的问题。以下 v0.1 与 v1.0 在同一段连续工作会话内完成，因此日期相同：v0.1 为脚手架与规则摸底阶段的内部状态，v1.0 为首次进入正式评审的状态。

## v0.1 - 2026-08-10

初始骨架阶段，产出物均为占位内容，未用于评审。

- 建立提交目录 `submissions/ztkuaikuai/jingzhang-ai-belt/`，生成 `manifest.json`、`agent.json` 与全部数据文件骨架，`package_state` 为 `scaffold`。
- 逐条读取仓库根目录 `scripts/` 下的校验器，确认字数门槛、引用密度上限、双语对应关系、图纸与整包体积上限、离线展示页面禁用模式、版权声明前置检查等硬性规则。
- 明确本包的数据纪律：只使用公开或已确认许可的资料；指标一律来自 `metrics.json`；无法确认许可状态的资料按不引用处理。

## v1.0 - 2026-08-10

首次形成可进入正式评审的完整提交包。

设计内容

- 完成中文 `proposal.md` 与英文 `proposal.en.md` 全部 13 个必需章节，英文版为对照译本而非摘要，两版结论一致。
- 确立"张北绿电 → 海淀算力 → 城市余热"的能量回流主线，空间结构为一脊、十节点、三缝合、一处留白。
- 补齐用地与建筑规模、留改拆策略、交通与市政、蓝绿公共空间、更新项目与分期、指标与合规矩阵、风险与版权共七章正文。

数据与证据

- `metrics.json` 收录 57 项指标，其中 47 项为 `known`，10 项因缺少可引用官方依据保持非数值状态，不做估算填充。
- `sources.json` 逐条登记 33 条公开资料的发布方、URL、发布日期、访问日期、许可摘要、可用范围与用途禁区。
- `assumptions.json` 登记 12 条假设及其退出条件，其中含"量化结论阻断"与"法定用途阻断"两类严重级别。
- `self_check.json` 记录 21 项自检结论（v1.1 增补至 25 项）；`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json` 分别覆盖 23 项任务书要求、6 项标准与 15 项深度条目。

图件与展示

- 生成 5 张展示级图件的中英双语版本，共 10 个 PNG，全部由绘图脚本直接读取数据文件渲染，不存在人工抄录数值的环节。
- 生成 A3 文册与 A0 展板的中英双语 PDF 共 4 份，以及中英双语报告 HTML 与离线电子展示页面。
- 电子展示页面重写为 12 个板块，页面上每个数字都必须解析到 `metrics.json` 中状态为 `known` 的数值指标，非 `known` 指标只能以文字形式呈现且不携带数值属性；页面不加载任何远程资源，不采集评审者行为。
- 重写 `report/copyright_statement.md`，说明生成方式、明确未使用的第三方资产、外部资料引用方式、几何数据的临时地位、离线与隐私承诺，以及权利瑕疵处置承诺。

校验状态

- `package_state` 由 `scaffold` 切换为 `ready_for_review`，`known_blockers` 清空，40 个文件（含 10 个英文对照文件）的 sha256 全部刷新。
- 本地四道关卡均通过：确定性校验、空间校验、离线展示打包检查、专业证据审查，自检结论为可进入正式评审。

## v1.1 - 2026-08-10

响应 PR #1418 上 `anselasimov-web` 的 CHANGES_REQUESTED 评审：明确 formal-review-ready 门槛、统一数据置信度口径、保留 unknown 的诚实披露。

门槛与口径

- 在 `self_check.json` 新增 `FORMAL_READINESS_THRESHOLD`（info 级）写明门槛：`submission_stage` 为 `formal`、参赛者可控的四项复核（确定性校验、空间复核、视觉打包、专业证据链）均无 error、且不存在 `result` 为 `fail` 且 `severity` 为 `blocking` 的自检项。同时写明 `unknown` 不等于 `fail`：`unknown` 表示所依赖的外部条件尚未公布因而无法核验，`fail` 表示已核验且不合格。
- 两项 major 级 `unknown`（`CONSTRAINTS_DATA_GAP`、`OFFICIAL_DATA_RECOMPUTE_PLEDGE`）**保持不变**，不为凑齐"全项 pass"而改写。二者均由组织方几何缺口引起，其退出条件写在对应自检项的 `verification` 字段中。
- 新增 `DATA_CONFIDENCE_ALIGNMENT`（info 级）登记包级与字段级置信度的对应关系。

数据置信度与自检声明

- `manifest.validation_claim.data_confidence` 由 `high` 改为 `medium`，采用包级下限口径：57 项指标中 31 项为 `medium`、6 项为 `low`、10 项为 `unknown`，且 `site_area_sqm`、`green_ratio`、`public_space_ratio` 等 8 项 `known` 指标明示依赖临时粗略边界假设。字段级置信度仍以 `metrics.json` 每项 `confidence` 为准，10 项 `high` 均为不依赖临时边界的计数与公告口径值。
- `manifest.validation_claim.self_checked` 由 `false` 改为 `true`，对应四项复核已实际运行并全部通过，不再与 formal-review-ready 的状态自相矛盾。

结构合规修正

- 移除 `self_check.json` 顶层的 `self_check_policy` 与 `metrics.json` 顶层的 `recalculation_policy`，改写为 `self_check.json` 中的 `SELF_CHECK_POLICY` 与 `METRIC_CRS_PROTOCOL` 两条 info 级自检项，内容一字未减。二者原为顶层自定义键，违反 `brief/site-package/schemas/self_check.schema.json` 与 `metrics.schema.json` 的 `additionalProperties: false`；改写后 `manifest.json`、`self_check.json`、`metrics.json` 三者均通过对应 schema 校验。
- 自检项由 21 项增至 25 项（新增 4 条均为 info 级口径说明，不改变任何原有结论）。

同步更新

- `proposal.md` 与 `proposal.en.md` 第 12 章补写门槛定义与置信度口径两段，并把自检项数由 21 改为 25。
- 重跑图件、A3/A0 双语 PDF、双语离线展示页面与双语报告 HTML；图件与 PDF 的项数说明由脚本从数据文件动态派生，无人工抄录。
- 刷新 `manifest.json` 中 14 个文件的 sha256。

校验状态

- `scripts/validate_submission.py`、`scripts/self_check_submission.py`、`scripts/participant_preflight.py`（均带 `--pr-author ztkuaikuai`）复跑通过，自检结论仍为可进入正式评审。

## 仍未关闭的问题 / Open issues

- 几何为临时粗略边界，坐标交换使用 EPSG:4326，面积与长度复算使用 EPSG:4548。该几何不是官方红线，不能作为审批依据或精确面积依据；官方边界与重点区精确范围公布后，将重跑几何生成、指标复算、图纸与展示页面生成，并重跑全部校验脚本。
- 约束图层刻意保持为空要素集合：文保范围、控规控制线、道路红线与河道蓝线目前没有可引用的官方几何，绘制推测控制线会构成伪精确。
- 10 项指标（建筑密度、总建筑面积、容积率、建筑高度控制、绿地率控制值、退线控制、道路面积与占比、余热可回收比例、供热户数当量）仍缺少可引用依据，保持非数值状态，待官方控制条件或运营数据公布后补齐。
- 空间校验输出 3 条重点区临时性提示，属信息级，随官方精确范围公布一并消除。
- 全部空间内容均表述为概念建议与参考方案，供专业团队在取得官方控制条件后深化研究；本包未声称取得任何政府批准或背书。

## 评审反馈处理 / Review follow-up

- 2026-08-10 · PR #1418 · `anselasimov-web` · CHANGES_REQUESTED：指出 head 版本 `self_check.json` 含 2 项 major `unknown` 并非全 pass，`manifest.validation_claim.self_checked` 仍为 `false`、`data_confidence` 为 `high`，而依赖临时边界的 site/green/public 等指标为 `medium`，要求明确 formal-review-ready 的门槛与状态、保留 unknown 的诚实披露、并同步 `self_checked` 与数据置信度口径。
  - 处理：见 v1.1。门槛写入 `FORMAL_READINESS_THRESHOLD` 自检项与双语正文；`data_confidence` 改为 `medium`（包级下限口径，与字段级 31 medium / 6 low / 10 unknown 一致）；`self_checked` 改为 `true`；两项 `unknown` 按评审意见保留不改写。附带修正两处顶层自定义键导致的 schema 违规。
  - 未采纳的部分：无。评审未要求把 `unknown` 改为 `pass`，本包也不会这样改。
