# 方案迭代记录

本文件记录"智轨百年·京张新脉"方案的版本迭代、依据变更与待办事项。所有空间主张均为概念建议；官方精确红线与管控指标到位后，将重算全部几何与面积指标并更新本记录。

## v0.1 - 2026-08-08

- 首次生成 formal 方案包：完成 proposal.md 中文主稿与 proposal.en.md 对照译文。
- 基于仓库 `brief/site-package/geometry/provisional_boundaries.geojson` 的 PROV-SITE-001 与 PROV-KEY-001/002/003 生成提交边界与三个重点片区，全部标注 `provisional_constraint`、`official_boundary=false`、`boundary_precision=provisional_rough`。
- 生成用地、建筑基底、道路、绿地、公共空间、分期、约束共七类设计图层；用地分区满足全覆盖、无重叠拓扑，面积在 EPSG:4548 投影下复算并写入 metrics.json。
- 建立 compliance_matrix（公告 1.3/1.4/1.5 + agent.1-6）、standard_matrix（六项专业标准）、design_depth_matrix（15 项深度全部 complete）。
- 产出 12 张场景卡（含 3 张产业测试验证场景）、5 类用户画像、3+1 处 AI 朝圣地标、7 个全球案例、三期实施框架。
- 已知缺口：官方容积率、建筑高度、建筑密度、绿地率、退线指标缺失，metrics.json 以 unknown 标记；官方精确红线缺失，待补齐后重算。
- 待办：根据维护者与社区反馈迭代场景卡运营机制与分期时序；补充 A3/A0 图纸与离线 visual 展示的细节校核。
