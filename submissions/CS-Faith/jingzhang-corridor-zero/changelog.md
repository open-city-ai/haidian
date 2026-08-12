# 方案迭代记录

## v1.0 - 2026-08-10

### 改动摘要

- 首次正式提交「京张零号带 Corridor Zero」方案：一带三核两翼、蓝绿复合环空间结构；Zero Forge/Origin/Street 三核子品牌；12 张 AI 场景卡（含 3 个产业测试验证场景与三层沙盒机制）、5 类用户画像、5 处朝圣地标组件、全球活动运营体系（概念建议）。
- 双语交付：proposal.zh/en、9 层 GeoJSON（EPSG:4548 复算）、28 项指标、三矩阵全覆盖、5 图×双语、A3/A0 图纸×双语、离线 HTML×双语。
- 本地校验：deterministic / spatial / visual / professional evidence 四项全部 PASS；participant_preflight PASS（40 文件 5.4 MiB）。

### 采纳反馈

- 暂无（首次提交）。2026-08-10 CI run 31397425872 为 Actions 调度失败（jobs=0），维护者提示推送 no-op commit 触发新运行；本 changelog 即为该 no-op 提交。

### 暂未采纳或待复核事项

- 官方 SITE_BOUNDARY / KEY_AREA 多边形发布后，全部几何与指标需按 EPSG:4548 全链重算。
- 容积率、建筑高度、建筑密度、绿地率、退线等控规条件待正式资料确认（metrics.json 中标注 unknown）。
- 建筑基底为概念布局，正式数值须以现状建筑调查与权属资料为准。

### 公开资料与合规说明

- 本版本仅使用公开任务书、官方公告与已清权资料；全部空间主张为概念建议，不构成政府审定结论；provisional 边界全程标注，不用于精确面积或审批依据；不包含个人隐私、涉密资料、内部图件或未审定规划控制指标。
