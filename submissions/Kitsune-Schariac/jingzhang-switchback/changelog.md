# 方案迭代记录

## v0.1 - 2026-08-10

### 改动摘要

- 完成「京张折返带 THE SWITCHBACK」formal 方案包并提交 PR #1176。
- 核心概念：人字形折返铁路 × 反向传播算法；空间结构「一廊三折两翼」+ 回传闭环（BACKPROP LOOP）治理机制。
- 交付：proposal.md / proposal.en.md（v2 双语契约）、9 个 GeoJSON 概念图层（provisional，EPSG:4548 复算）、28 项指标、11 条来源、9 项假设、23 条任务覆盖矩阵、6 条标准响应、15 项设计深度、5+5 张设计图、A3/A0 中英 PDF、离线双语展示页。
- 本地自检 PASS（deterministic / spatial / visual / professional 四关），review_status=formal-review-ready。

### 采纳反馈

- 暂无，首版提交。已在方案中披露 OSM 背景核对不确定性（Issue #846）与全部 provisional 边界限制。

### 暂未采纳或待复核事项

- 官方 polygon / KEY_AREA 发布后需整包重算（geometry、metrics、figures、HTML、PDF）。
- 控规条件（容积率/高度/密度/绿地率）补齐后更新指标；现状建筑底数、权属、市政、文保范围待官方数据。
- 所有空间与活动建议为概念建议，待专业团队深化。

### 公开资料与合规说明

- 本版本仅使用公开任务书、官方公告、专业标准与仓库 provisional 资料，不包含个人隐私、涉密资料、内部图件或未审定规划控制指标。
