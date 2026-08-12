# 版权与合规声明 / Copyright and Compliance Statement

## 中文

### 资料来源（Data Sources）
本方案使用的资料分为三类：
- **官方任务资料**：百年京张AI创新带城市设计开源征集公告、智能体任务书（agent_taskbook.json）、场地资料包（brief/site-package）、临时边界（provisional_boundaries.geojson）。来源：open-city-ai/haidian 仓库。
- **公开服务案例**：爱沙尼亚 e-Residency/K-Health、新加坡 HealthHub/Smart Nation、杭州城市大脑·健康码、上海"随申办"、北京"京通"/"健康宝"、伦敦 NHS App、巴塞罗那超级街区等数字化公共服务的公开资料，仅作机制启示，均已标注公开来源。
- **专业规范**：《城市设计管理办法》（住建部）、《国土空间用地用海分类指南》（自然资源部），使用本地参考快照。

### 概念建议声明（Conceptual Recommendation Statement）
本方案所有空间落地建议、服务网点布局、活动设想和政策机制建议均为**概念建议 / 参考方案**，可供专业团队深化研究，不替代正式规划，不构成政府审定结论，不表述为已确定政府决策或实施安排。控规调整、容积率、建筑高度、拆改留、工程线位、投资测算、开发时序等均未作最终结论。

### 临时边界声明（Provisional Boundary Statement）
方案几何基于 brief/site-package/geometry/provisional_boundaries.geojson 的**临时粗略边界**（provisional boundary），非官方红线（official boundary = false）。官方精确红线发布后，所有面积指标与几何关系须重新复算并交专业团队深化。

### 生成方法披露（Generation Method Disclosure）
- 提案文字：由 AI 智能体（ZCode Agent, glm-latest）辅助生成并经设计者审核。
- 几何：以 Python + Shapely/pyproj 在 EPSG:4548 下复算面积；设计要素为概念建议。
- 图件：以 matplotlib 从本方案 GeoJSON 与 metrics.json 生成（中英双语各 5 张）。
- PDF 图纸：以 reportlab 生成（a3-booklet 与 a0-boards，中英双语）。
- 可视化板：纯静态离线 HTML，无 CDN/远程瓦片/外部脚本。

### 许可（License）
本方案采用 **COMMUNITY-DISPLAY-ONLY** 许可。未授权字体、图片、人物肖像、商标、论文图像不予使用。CJK 文字使用 reportlab 内置 STSong-Light CID 字体（无需外部字体文件，不涉及字体版权再分发）。

---

## English

### Data Sources
- **Official task materials**: the open-call announcement, the agent taskbook (agent_taskbook.json), the site package (brief/site-package), and the provisional boundaries (provisional_boundaries.geojson), all from the open-city-ai/haidian repository.
- **Public service cases**: public materials on digital public services — Estonia e-Residency/K-Health, Singapore HealthHub/Smart Nation, Hangzhou City Brain/Health Code, Shanghai "Suishenban", Beijing "Jingtong"/"Health Kit", London NHS App, and Barcelona superblocks — used only as transferable-mechanism references with public attribution.
- **Professional standards**: MOHURD Urban Design Measures and MNR Land-Use Classification Guide (local reference snapshots).

### Conceptual Recommendation Statement
All spatial outcomes, service-site layouts, activity ideas, and policy/mechanism suggestions in this proposal are **conceptual recommendations / reference schemes** for professional teams to further develop. They do not replace formal planning, do not constitute approved government conclusions, and are not stated as confirmed government decisions or implementation arrangements. No final conclusions are made on regulatory-plan adjustments, FAR, building height, retain-renovate-demolish, engineering alignments, investment estimates, or development phasing.

### Provisional Boundary Statement
All geometry is derived from the **provisional rough boundary** in brief/site-package/geometry/provisional_boundaries.geojson (official boundary = false). Once the official redline is published, all area indicators and geometric relationships must be recomputed and further developed by professional teams.

### Generation Method Disclosure
- Narrative: AI-assisted (ZCode Agent, glm-latest), reviewed by the designer.
- Geometry: areas recomputed in EPSG:4548 with Python + Shapely/pyproj; design elements are conceptual.
- Figures: generated with matplotlib from this package's GeoJSON and metrics.json (5 each in zh/en).
- Drawings: generated with reportlab (a3-booklet and a0-boards, zh/en).
- Visual boards: fully static, offline HTML — no CDN, remote tiles, external scripts, iframes, or web fonts.

### License
This proposal is released under **COMMUNITY-DISPLAY-ONLY**. No unauthorized fonts, images, portraits, trademarks, or paper figures are used. CJK text uses reportlab's built-in STSong-Light CID font (no external font file, no font-copyright redistribution).
