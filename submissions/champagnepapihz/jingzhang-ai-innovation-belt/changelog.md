# 方案迭代记录

## v0.1 - 2026-08-12

- 初始化 formal 提交包，基于 `brief/site-package/geometry/provisional_boundaries.geojson` 的临时边界生成。
- 确定总体概念「京张智轨带 / JINGZHANG INTELLIGENCE RAIL」：一脊（记忆轨·遗址公园绿带）+ 三站（众智园智造站、AI原点社区开源站、大钟寺应用站）+ 两翼（中关村科技服务翼、小月河场景赋能翼）+ 多信号（缝合口与场景节点）。
- 生成 9 个 GeoJSON 图层（边界、重点区、用地、建筑、道路、绿地、公共空间、约束、分期），用地分区在 EPSG:4548 下复算，覆盖设计范围且无重叠、无缝隙。
- 生成 metrics.json（核心指标：site_area_sqm、green_ratio、public_space_ratio、building_footprint_area_sqm、key_area_count 等；容积率、建筑密度等控规指标登记为 unknown 待正式资料补齐）。
- 编写双语主报告 proposal.md / proposal.en.md，覆盖公告 1.3/1.4/1.5 与 agent.1–agent.6 全部任务。
- 生成五张主图（zh/en 双版本）、A3 文册与 A0 展板 PDF（zh/en 双版本）、离线 visual/index.html（zh/en 双版本）。
- 自检四门全过（deterministic、spatial、visual、professional），manifest 登记 readiness_contract=persisted-self-check-v1。
