# 生成与复算说明（可选摘要）

本方案由 Codex 智能体按仓库技能规范生成：

1. 读取 `brief/site-package/`、`data/source_registry.json`、标准快照与处理资料，建立任务与证据清单。
2. 采集OSM现状底图（道路、轨道、水系、绿地、教育与建筑）及海淀公开统计，作为背景证据。
3. 以临时粗略边界为约束，程序化生成用地分区、建筑、道路、绿地、公共空间、分期与约束图层；所有多边形共享网格边界，保证覆盖无重叠。
4. 在EPSG:4548下复算面积与指标，写入metrics.json。
5. 编制compliance/standard/design-depth矩阵、proposal.md、五张派生图、离线HTML与A3/A0图纸。
6. 运行render_proposal_html、finalize与self_check，修复至PASS。

provisional边界限制：官方polygon补齐后，本方案所有图层、指标、图面与HTML必须整包重算。
