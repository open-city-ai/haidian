# 方案迭代记录

## v0.4 - 2026-08-11

新增 OSM 公开实况独立交叉核验（路线：可核验数据边界）。

- 用 Overpass API 拉取京张铁路遗址公园（way/122348403）与大钟寺/五道口/清华东路西口/西直门站点实况，在 EPSG:4548 下量化临时边界偏差：遗址公园与 SITE-001 不相交（最近约 412.5 m）、与智脊绿道 RD-001 最近约 1051.6 m、大钟寺站界外约 82 m、五道口站距原点芯质心约 880 m。
- 新增来源 OSM-CROSSCHECK-20260811（ODbL 署名，标注仅作偏差核验、不升级正式依据）与假设 A-OSM-CHECK-001；self_check 新增 OSM_CROSSCHECK_DISCLOSED 项。
- 正文风险章（中英双语）新增可复现的核验披露段，与社区 Issue #846、#1029 的独立发现相互印证。

## v0.3 - 2026-08-11

12 张场景卡升级为「可开始、可停止、可复核」的可落地结构（中英双语同步）。

- 每张卡新增：运营主体、开始条件（准备度卡）、最小可用基线、停止条件、人工兜底、复盘证据六个字段，全部标注为供专业团队深化的概念设计值，不声称已获试点授权。
- 场景-空间-运营映射升级为「场景注册制」最小闭环：先登记、再开始、可停止、留证据，人工复核为默认前置条件。
- 响应社区「从可复核到可落地」的讨论方向，强化场景可感知度与可转化性维度。

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
