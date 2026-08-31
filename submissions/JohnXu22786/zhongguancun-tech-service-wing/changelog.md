## 2026-08-31 — 78-point CocoSgt expression repair (local Draft work)

- Re-exported five bilingual core figures with bounded title, legend, warning, footer and note safe zones; wrapped all side-panel copy.
- Rebuilt the English scenario-card sheet as a true localization with role, action and evidence fields.
- Rebuilt A0 boards and A3 booklets at true page dimensions and refreshed package previews.
- No PR push, Ready transition, or external review claim was made.

# 方案迭代记录

## v2.0.0 - 2026-08-27

- 修复 proposal_format_version=2 双语合同：proposal.en.md 设置 language=en、translation_of=proposal.md；proposal.md 增加 bilingual_contract_version=1 与 translation_file；中英文 5 图、logo、A0/A3 PDF、proposal HTML 与 visual 页面全部配对并在 manifest.json 登记（language/translation_of/required）。
- 中英实质等值已人工核对：proposal.md 与 proposal.en.md 的 13 节、数字、图位与证据锚点逐条对齐（proposal.en.md 约 25000 英文字母、无残留中文）。
- 由图件重绘：5 张中文图 + 5 张英文图（12×8 @150dpi），补入道路、轨道、站点、片区、公共空间与体验路径语境，含比例（示意）、指北针、图例与"临时概念边界·非官方红线·官方数据发布后复算"双语戳记；新增品牌 Logo（logo-zhilink.png / .en.png）；A0/A3 双语 PDF 重绘。
- 内容补齐：10 张场景卡、5 项有来源全球案例表、生态图谱、3 项 AI 技术测试协议、6 项年度活动品牌表、RACI 实施结构与停止条件、五类人才、荣誉体系、公共空间组件库、开发者社区、国际传播文案、区域协同回路（北纬/未来科学城/怀柔/经开区/京津冀）；provisional 指标降精度、比率与计数分轴。
- 合规与资产：新增 report/copyright_statement.md 资产权利登记（含品牌在先权利与使用边界、内部工作代号处理）；sources.json 扩充至 14 项（5 项可核验全球案例来源，均含 url/publisher/published_date/license）；metrics.json 计数对齐（global_case/card/test/annual/persona）。
- 表达与包装：report/proposal.html、report/proposal.en.html 由 render_proposal_html.py 生成并嵌入 Noto Sans SC 子集字体；visual/index.html 与 index.en.html 重建（含 14 项必需标记与核心指标）；self_check.json 附 figure_qc（机器 ink/edge-clip 实测，文本重叠 over fit 标注 not_verified）。
- 自检门禁：deterministic / spatial / visual / professional 四门全绿；validate_local_submission PASS；score_rubric 97.0，reviewer_gaps 清空，无强制拒收。

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for zhongguancun-tech-service-wing.
- Proposal drafted via DeepSeek Harness (dsh-x), session unknown; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).
