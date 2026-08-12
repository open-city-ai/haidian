# 方案迭代记录

## v0.1 - 2026-08-12

- 建立正式双语提交包：概念方案"京张联锁 JINGZHANG INTERLOCK"（一脉三核两翼、十二联锁单元、八处缝合口、双慢行环、四处朝圣地标）。
- 几何与指标：基于 provisional 边界生成拓扑干净的概念用地分区（23类）、三处重点区、116栋概念建筑体量、8条概念道路、6处公共空间、3期分区；EPSG:4548 复算 30 项指标并写入 metrics.json。
- 约束图层：将 12 个场景节点与 2 处 AI 服务翼并入 constraints.geojson（source_type/geometry_role 使用登记枚举），删除独立的 scenario_nodes.geojson 与 ai_service_zones.geojson。
- 文本与证据：proposal.md / proposal.en.md 按 v2 双语契约编写，全部必需章节匹配官方名称，证据标记密度收敛到每段 ≤8、连续 ≤3，并在结构化矩阵中保留完整索引。
- 可视化与图纸：visual/index.html 与 index.en.html 使用 metrics.json 精确数值并覆盖全部必需中文板块；A3 作品集与 A0 展板（中英）已渲染。
- 自检：deterministic / spatial / visual / professional 四道关卡在本版本运行通过并持久化 self_check.json。
- 已知限制：边界、重点区与用地均为 provisional 概念，不替代正式规划；容积率等法定指标为 unknown，待官方数据补齐后整包复算。
