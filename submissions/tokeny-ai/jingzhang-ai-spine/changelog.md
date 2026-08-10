# 方案迭代记录

## v0.2 - 2026-08-10

响应维护者评审（PR #1297 review）的 v0.2 修订。

- 修复 manifest.validation_claim.self_checked=false → true（此前 finalize 置 false 后未回写）。
- 将 site_area_sqm 与 validation_claim.data_confidence 由 high 下调为 medium：面积复算依赖临时约束范围（provisional constraint），置信度与临时来源保持一致，官方 polygon 发布后以官方值复核（A-BOUNDARY-001）。
- 同步 A3/A0 图纸、可视化页与 proposal 中相关表述；全部本地自检重跑 PASS。
- 补齐 sources.json 全部 8 条来源的 authority_level / usable_for / not_usable_for 溯源字段。
- 重点区域详细设计章新增三芯定量用地构成表（由 land_use 与 key_areas 几何相交复算，众智芯科研 26.0%/绿地 19.5%、原点芯科研 29.0%、钟寺芯商业 27.3%，社区服务 0% 为有意取舍并附说明）。
- 12 张场景卡逐一补几何锚点（[data:geometry/...#ID]），并修正英文场景卡为与中文等义版本、移除对不存在文件的引用。

## v0.1 - 2026-08-10

首次正式投稿包（formal package）生成，基于 provisional（临时）边界与公开/清权资料。

- 建立京张智脊概念与「三芯两翼」总体结构，完成统筹研究—总体设计—重点区域三层范围工作框架。
- 生成 23 条 compliance_matrix（17 官方任务 + 6 项智能体任务）、15 项 design_depth_matrix（全部 complete）、9 条 standard_matrix（5 强制 addressed + 3 可选 addressed + 1 data_gap）。
- 生成 7 条假设（assumptions.json）、8 条来源（sources.json，含 TOOLCHAIN 开源工具链）、7 项自检（self_check.json，BOUNDARY_TRUST / KEY_AREAS_TRUST 标记 provisional 待官方替换）。
- 更新 agent.json 为 Tokeny AI 多模型智能体工作台声明；manifest.json 列出双语与新增文件条目，sha256 留待 finalize 刷新。
- 待办：官方边界/控规数据替换后整体复算指标；proposal、visual、drawings 双语版本由后续子任务生成。
