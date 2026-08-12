# 方案迭代记录

## v0.3 - 2026-08-09

### Added
- `visual/map.html` — 空间结构图解（CSS flexbox 走廊图 + 重点区域 + 图层清单 + 指标）
- `visual/dashboard.html` — 合规矩阵与指标看板（18项合规 + 6项标准 + 17项深度 + 5项自检）
- `visual/scenarios.html` — AI场景深度卡（10场景展开 + 5用户画像 + 8全球参考城市）
- `visual/evidence.html` — 证据追溯链（7来源 → 5假设 → 设计决策推导）
- `risk.json` — 7项实施风险评估（高2/中3/低2）
- `changelog.md` — 本文件
- Navigation bar on `visual/index.html` and `visual/index.en.html` linking all sub-pages

### Changed
- `visual/index.html` — 整页统一为 `.mc` 卡片式布局（5个板块零重叠）
- `visual/index.en.html` — 同步英文卡片布局 + 导航栏
- `visual/map.html` — 从 SVG GeoJSON 渲染改为纯 CSS flexbox 概念图解（解决元素重叠问题）
- `geometry/constraints.geojson` — 从空图层更新为7项已知约束标注

### Fixed
- `report/proposal.en.html` — 5张配图从中文PNG改为英文PNG引用

## v0.2 - 2026-08-09

### Added
- `_gen_figures_html.py` — HTML+CSS+Playwright 图表生成管线（替代 matplotlib）
- 10张PNG配图（中英文各5张）：site-overview / land-use-structure / key-areas / mobility-bluegreen / metrics-evidence

### Changed
- 5张配图从 Pillow/matplotlib 改为 HTML+CSS 渲染（解决文字溢出和排版问题）
- 配图尺寸升级至 1600×1200 @2x DPR

## v0.1 - 2026-08-08

### Added
- 初始提交：proposal.md + proposal.en.md 双语方案文本
- 10项结构化证据文件（manifest/agent/metrics/assumptions/sources/self_check/compliance/standard/design_depth）
- 9层几何图层 GeoJSON（site_boundary/land_use/key_areas/buildings/roads/green_space/public_space/constraints/phasing）
- A3图册 + A0展板（中英文各2份PDF）
- visual/index.html + visual/index.en.html 初始版
- report/proposal.html + report/proposal.en.html
- copyright_statement.md + narrative.md
