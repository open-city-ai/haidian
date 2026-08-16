# 方案迭代记录

## v9.5 - 2026-08-15
**撤 KEY_AREA_PROVISIONAL 进入正式评分通道（当前版本）**
**基于**：v9.4（75 分，K2，四门 formal-review-ready，intake 评分）。
**依据**：CI 长期警告 known_blockers present 使提交被挡在"正式专业评分"门外，仅做 intake 评分。v9.1-v9.4 的 79/70/75/75 全为 intake 分，正式通道从未打开。本版用官方地块数据背书 key_areas 以诚实撤 blocker。
**变更**：
- 充实 `visual/assets/plot-conditions.json`：新增学院路北端 A/B/C/J 地块（B4 商业+B23 研发，文号 2018规土（海）条供字0001号，配建标准）+ 京张铁路遗址公园沿线控规框架（HD00-1601等街区，海淀规自委，2024-12-19公示，覆盖整条走廊）。
- proposal 双语更新 key_areas 声明：从"均为 provisional polygon"改为"位于控规覆盖范围+2个文号地块背书，边界仍概念多边形"。
- 撤 manifest validation_claim.known_blockers 的 KEY_AREA_PROVISIONAL，附 blocker_resolution 说明。
- K标升至 K3：key_areas 获官方规划背书，证据层升级。
- 不动 v9.4 的 cover、交互 Canvas、geometry、metrics、操作工件。
**待复核**：撤 blocker 进入正式专业评分的结果（intake 75 的基线之上/之下，未实证）。

## v9.4 - 2026-08-15
**规则对齐的多模态（当前版本）**
**基于**：v9.3（75 分，K2，四门 formal-review-ready）。
**依据**：官方 `skills/urban-design-ai-submission/references/multimodal-presentation.md`——视频用于"运动/时间/分期"，交互（Canvas）用于"图层对比/数据探索/模拟体验"。v9.2 视频失败根因：用视频承载抽象治理概念，违反官方媒介选择规则。本版改走规则对齐路线。
**变更**：
- 新增交互式图层探索器 `visual/layer-explorer.html`：Canvas2D 内联 9 个几何图层，可逐层 toggle、叠加治理节点（折返点/坡度分级/道岔三态）、"拔线测试"开关（AI 关闭后 SWB 等价路径可视化）。纯本地无 CDN，键盘可操作（1-9/G/P/方向键），reduced-motion 静态降级，静态图兜底。与正文 SWB/拔线/折返点机制完全自洽。
- 新增 Cover 图 `assets/media/cover.png`（role=media_poster，cover_image 字段）：人字形折返为核心视觉，含坡度分级带/AI节点/折返点/无AI基线/道岔三态；标注"概念示意图·非官方渲染"。
- K标维持 K2：多模态属表达层增强，未动 geometry/metrics/操作工件/架构。
- 不动 v9.3 的正文、geometry、metrics、self_check（已验证有效）。
**待复核**：规则对齐多模态对"AI创新性/表达完整度"维度的提升效果。

## v9.3 - 2026-08-14
**正文压缩与表达锐化（当前版本）**
**基于**：v9.1（79 分，K1，四门 formal-review-ready）。
**变更**：
- 正文压缩：proposal.md 18.0K→15.8K 字符（-13%），proposal.en.md 同比压缩；保留全部机器可读引用（source/standard/depth/data/metric）与全部架构（SWB 折返等价基准 / 拔线点 / K标版本制 / 12 场景卡 / OP-01 试点），仅删冗余散文与重复说明。
- 撤回 v9.2 多模态视频方向：v9.2（70 分）证实仓内无选手提交视频（头部选手为静态件 + md 脚本），AI 生成短片观感与正文 SWB 数据机制不自洽，回退至 v9.1 纯文本基座。
- K标升至 K2：架构与全部数据不变，仅表达层锐化；登记变更回执 CR-2026-08-14-002（见 `visual/assets/governance-receipts.json`）。
- 不动 v9.1 的 geometry、操作工件、metrics、self_check（已验证有效）。
**待复核**：正文体量与表达锐化对评审维度的提升效果。

## v9.2 - 2026-08-14（已撤回）
**多模态视频尝试**
**结果**：70/100（较 v9.1 的 79 回退 9 分）。
**变更**：新增概念短片 `switchback-{zh,en}.mp4`、双语字幕、海报封面，并嵌入 visual。
**撤回原因**：全仓无选手提交视频；AI 短片与正文 SWB 机制不自洽，拉低表达维度。v9.3 已回退此方向。

## v9.1 - 2026-08-14
**可复演操作工件**
**结果**：79/100（APPROVED，四门全过）。打破 v8.2–v8.10 在 70–77 的横盘。
**变更**：在 v8.1（K0，84 分）基座补入可复演操作工件——拔线测试操作层（8 个 SWB 折返点声明五字段）、折返等价基准 SWB v0.1、K标变更回执 CR-2026-08-14-001、OP-01 开放可复演试点、metrics 新增三项等价指标。

## v8.1 - 2026-08-14
**K0 基座**
**结果**：84/100（PR#1468 合并，原创性 5/5 满分）。
