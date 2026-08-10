# 方案迭代记录

## v0.1 - 2026-08-10

### 新增
- 完整 proposal.md 中英文双语方案（覆盖 agent.1-agent.6 全部任务）
- 英文翻译 proposal.en.md
- 9个 GeoJSON 几何文件（site_boundary, key_areas, land_use, buildings, roads, green_space, public_space, constraints, phasing）
- 5张专业图表（site-overview, land-use-structure, key-areas, mobility-bluegreen, metrics-evidence）
- metrics.json（17个指标）
- visual/index.html 离线可视化页面（25个 data-metric 属性，0个外部依赖）
- A3/A0 PDF 图纸
- sources.json（13个来源）
- assumptions.json（9个假设）

### 设计概念
- 命名：京张智脉共生带 / Jing-Zhang Intelligent Symbiosis Belt
- 结构：一带三核、多点场景、蓝绿慢行复合环
- 三核：众智园（AI自主创新）、北京AI原点社区（近校创新）、大钟寺（智能经济）

### 数据状态
- 场地边界：临时约束（provisional）
- 重点区域：临时约束（3处）
- 用地：概念设计（agent生成）
- 所有指标：从几何图层复算（EPSG:4548投影）
- 官方控制条件：待确认（容积率、建筑高度、密度、绿化率）
