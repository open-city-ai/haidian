# 方案迭代记录

## v0.1 - 2026-08-08

首次正式投稿（formal-review-ready）：

- 概念定位：提出「智轨·原点 Origin Rail」总体概念——以京张遗址公园为智轨绿脊，三处重点片区为三极，两翼为协同回路。
- 几何：基于 PROV-SITE-001 临时边界（official_boundary=false）生成拓扑闭合用地分区 8 块（投影坐标 1cm 网格清理，两两重叠 < 1 平米，覆盖缺口 22 平米 < 容差）；衍生绿地 4、公共空间 4、慢行中心线 7、建筑概念基底 8、分期 3。
- 指标：全部 known 指标在 EPSG:4548 下复算并写入 metrics.json；容积率/总建筑面积因官方控规条件缺失标记 unknown。
- 图件：5 张 presentation-quality 图（总体结构/用地结构/重点区域/蓝绿慢行/指标证据），A3 文册 7 页 + A0 展板 2 页（reportlab 原创绘制）。
- 展示：离线静态 visual/index.html（无外部资源，data-metric 标记与 metrics.json 一致）。
- 校验：deterministic / spatial / visual / professional-evidence 全部 PASS；review status = formal-review-ready。已知 minor：三处重点区为 provisional（组织方数据缺口，不阻断内容评分）。
- 待办（持续参与）：官方 polygon 发布后整包重算；补充英文对照材料（non-blocking）；跟踪 Issues/PRs 与 peer 方案。
