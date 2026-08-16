# 方案迭代记录

## v1.0 - 2026-08-14

- 初始化 formal 投稿包：scaffold 后替换全部占位内容。
- 总体概念：京张双轨带 JINGZHANG DUAL TRACK（文化轨+创新轨、道岔节点、三处站场、两翼、公里标驿站）。
- 生成空间数据：站点边界剖分（40 用地单元、12 类官方代码）、建筑概念基底、双轨主脊与四道岔缝合线、七座地标广场、三期实施分区；全部由提交 GeoJSON 在 EPSG:4548 下复算。
- 双语正文（proposal.md / proposal.en.md）、五张图（zh/en）、A3 文册与 A0 展板（zh/en）、离线 visual 展示页（zh/en）、report HTML（zh/en）。
- 覆盖矩阵：公告 1.3.1–1.5.3.3 与 agent.1–agent.6 全部映射；5 项强制标准 addressed；15 项设计深度 complete。
- 资料边界：沿用上游临时几何（PROV-SITE-001 / PROV-KEY-001/002/003），披露大钟寺临时几何位置偏差（Issue #1029，见假设 A-KEY003-OFFSET-001 与 sources.json#ISSUE-1029）；官方几何发布后统一重算。

## 待办 / Next

- 官方边界与控规条件发布后：统一重算 geometry/metrics/图件/HTML/图纸并更新 manifest 哈希。
- 大钟寺站锚定几何发布后：按批次重算该片区图层、指标与叙事锚点。
