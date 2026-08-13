# 方案迭代记录

本文件记录「智链京张」（JZ-AI Link）方案的迭代过程、反馈与待办事项。所有几何与指标均可在仓库内复现。

## v0.1 - 2026-06-14

### 本版内容
- 建立完整方案包：front matter、三层范围工作框架、总体概念「智链京张」与三区两翼协同设计、13 个正式章节正文、`proposal.en.md` 完整对照译文。
- 提交 9 个 GeoJSON 图层（临时边界 site_boundary、重点片区 key_areas、用地 land_use、建筑 buildings、道路 roads、绿地 green_space、公共空间 public_space、约束 constraints、分期 phasing），全部以 EPSG:4548 复算面积，覆盖无缝隙、无重叠。
- 指标体系 metrics.json（16 项 known + 2 项 unknown）、来源登记 sources.json（21 条）、假设 assumptions.json（10 条）、自检 self_check.json（16 项全部 pass）。
- 合规矩阵 compliance_matrix.json（公告 1.3/1.4/1.5 与 agent.1-agent.6 共 23 项）、标准矩阵 standard_matrix.json（6 项）、设计深度矩阵 design_depth_matrix.json（15 项）。
- 视觉展示 visual/index.html（含中英对照 index.en.html）、报告 report/proposal.html 与 report/proposal.en.html、图册 drawings/a3-booklet.pdf 与展板 drawings/a0-boards.pdf（中英各一）。
- 5 张演示图（总览、用地结构、重点片区、交通蓝绿、指标证据）中英双语版本共 10 张。

### 关键决策与事实
- 边界全部为临时边界（provisional constraint，official_boundary=false），面积偏差相对公告约值介于 +0.02% 与 +0.43% 之间，已在正文与自检中声明限制。
- 概念建筑基底 396 个（约 60.0 公顷）、用地地块 469 个、道路中心线约 37.7 公里、概念绿地率 0.289609、公共空间率 0.008078。
- 容积率、建筑高度等管控指标因官方控规未随公开资料包提供，统一列为 unknown 并给出前置条件，不以推测值冒充审定指标。

### 待办与待补资料
- 官方边界 polygon 与重点片区 polygon 发布后，全图层与全部指标需整体复算。
- 官方控规条件（容积率、高度、密度、退线、道路红线、设施标准）到位后补齐管控指标。
- 现状建筑、权属、市政管线与文保控制线资料到位后校准拆改留分类。
- `proposal.en.md` 与英文图件、A3/A0 英文版图纸已随本版提供，后续迭代保持双语同步。
