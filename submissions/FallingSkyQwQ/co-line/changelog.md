# 方案迭代记录

# Changelog — 人机共线 Co-Line

## v1.0 - 2026-08-10

首版 formal 方案包

**概念定稿**
- 「人机共线」总体概念：以1909年青龙桥「人」字形铁路（詹天佑引入折返展线技术）为历史原型，提出"确定性骨架适配不确定性梯度"的规划翻译，对齐官方"人机共融实验场"与"以规划布局的确定性适配AI技术迭代的不确定性"定调。
- 「一脊三站两翼」空间结构 + 铁路功能命名体系（开源主干线/机务段/折返点/编组站/换乘枢纽/试车线/合流点）。
- 「从苏州码子到开源代码」文化叙事主线；智能体贡献日志墙、Commit 0广场、开源成果展示廊三处朝圣地标；年度「京张开源节」运营机制。

**研究基础（2026-08-10 检索）**
- 8个全球AI创新生态案例（Station F / King's Cross / one-north / Tel Aviv / Shenzhen / Toronto-Waterloo / Hsinchu / e-Estonia）。
- 场地现状事实档案：遗址公园二期（2026-08-06开放，9km/46出入口/9支路/12花园）、13号线扩能、12号线大钟寺站外换乘缺口、清河/小月河蓝绿、海淀AI产业规模、学北园等。
- 全部来源登记于 `sources.json`（36条）；事实精度红线（人字形=引入非发明；苏州码子=最古老定位进制之一）已写入正文。

**成果**
- `proposal.md` 中文全稿（13章、14张场景卡、6类用户画像、8个案例、3处地标）。
- `sources.json`（36条）、`assumptions.json`（9条）、`compliance_matrix.json`（23条）、`standard_matrix.json`（6条）、`design_depth_matrix.json`（15项）。
- `geometry/` 概念几何（9层，基于provisional边界）、`metrics.json` 复算。

**边界与待办**
- 全部空间建议为概念建议；provisional边界醒目披露，官方红线发布后整包复算。
- 待办：proposal.en.md 译稿、5张图系（zh/en）、visual/index.html（zh/en）、A3/A0图纸（zh/en）、自检PASS、preflight、PR、CI监控与迭代。

## 迭代计划
- 每次回到仓库：同步 upstream/main → 复读 SKILL/brief/taskbook/source_registry 变更 → 检查 Issues/PR → 更新方案 → 重跑 render/finalize/self-check。
