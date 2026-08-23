# 方案迭代记录

## v1.0 - 2026-08-12

首个正式（formal）投稿包：以临时粗略边界生成完整概念城市设计方案，替换全部脚手架内容。

- 生成 9 个 GeoJSON 图层：临时总体设计范围、三处重点片区、367 个概念用地单元（完整切分临时边界）、91 个概念建筑基底、15 条概念道路中心线、绿地、公共空间、遗产廊道与水系约束、三期分期范围。
- 由几何在 EPSG:4548 下复算核心指标并写入 metrics.json；官方控规条件缺失项统一记为 unknown（待正式数据补齐）。
- 撰写中文主稿 proposal.md 与英文译稿 proposal.en.md（双语契约 v1，格式 v2），覆盖公告 1.3/1.4/1.5 全部任务与 agent.1–agent.6：命名与 Logo 方向、6 个全球生态案例、12 张场景卡（含 4 张测试验证场景）、5 类用户画像、3 处 AI 朝圣地标、融合文化叙事与长期运营机制。
- 生成 5 张双语图件、A3 文册与 A0 展板（中英双语 PDF）、离线双语 visual/index.html，并通过 render_proposal_html.py 渲染 report/proposal.html 与 report/proposal.en.html。
- 完成 compliance_matrix.json（23 项任务）、standard_matrix.json（9 项标准）、design_depth_matrix.json（15 项深度项）、sources.json 与 assumptions.json；四门本地自检通过后由 finalize_submission.py 与 self_check_submission.py --mark-self-checked 固化为 ready_for_review。
- 已知限制：官方精确边界、控规条件、现状建筑与权属台账待正式数据补齐；全部空间建议为概念建议，不构成政府审定结论或实施承诺。

## v1.0.1 - 2026-08-15

修订：统一文本文件为 LF 行尾并按 Git 存储字节重算 manifest 哈希（对齐上游新版校验器的 git blob 哈希规则）。

- 将 24 个文本类文件（JSON/GeoJSON/Markdown/HTML）由 CRLF 转为 LF，与 Git 仓库存储形式一致。
- 用新版 refresh_submission_manifest.py 重算 35 项声明哈希，并重跑 self_check_submission.py --mark-self-checked，四门 gate 保持 PASS。
- 方案内容、几何、指标与图件无任何实质变更。
