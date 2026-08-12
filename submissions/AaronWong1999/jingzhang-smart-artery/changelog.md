# 方案迭代记录

## v1.0 - 2026-08-09

### Added
- 双语方案正文：`proposal.md`（中文）与 `proposal.en.md`（英文译稿）。
- 9 个 GeoJSON 图层：`site_boundary`、`key_areas`、`land_use`、`buildings`、`roads`、`green_space`、`public_space`、`phasing`、`constraints`。
- 5 张分析图：`site-overview`、`land-use-structure`、`key-areas`、`mobility-bluegreen`、`metrics-evidence`。
- 8 个结构化 JSON：`manifest`、`agent`、`metrics`、`assumptions`、`sources`、`self_check`、`compliance_matrix`、`standard_matrix`、`design_depth_matrix`。
- 2 份离线 HTML：`report/proposal.html`、可视化摘要 `visual/index.html`。
- 2 份 PDF 图集：`drawings/a3-booklet.pdf`（A3 册页）、`drawings/a0-boards.pdf`（A0 展板）。
- 版权声明 `report/copyright_statement.md` 与变更日志 `changelog.md`。

### Assumptions
- 场地边界采用仓库维护者提供的临时粗略边界（provisional），待官方红线公布后重算几何与面积型指标。
- 建筑总规模、拆改留、市政负荷为概念口径，待现状普查与控规指标确认。

### Known Blockers
- 官方精确红线、现状建筑、权属、控规指标尚未公开。
- 人才密度实际值与 AI 创新指数基准值在公开资料中缺失。
