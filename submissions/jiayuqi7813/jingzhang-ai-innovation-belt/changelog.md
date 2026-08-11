# 方案迭代记录

## v1.1 - 2026-08-10

- 按评审 147228 的交叉回读意见补齐「测试场景逐场景可回读记录」证据链：
  - 新增 `visual/assets/scenario_test_records.json`，为 SC-04/SC-05/SC-06（T1/T2/T3）各建一条 `{status, value}` 记录，覆盖四组必填字段：baseline、观察对象、样本与时间窗；成功条件与停止条件；人工等价路径与责任角色；复核周期、异议入口与删除证明。
  - 未知字段一律标注「授权前冻结 / 未采集 / 待责任主体确认 / 待确认」，不预设数值；阈值仅作参考方向。
  - 新增离线确定性检查器 `check_scenario_records.py`：证明字段不漏项、状态枚举合法、无编造数值；结果作为 `self_check.json` 的第 7 项 `SCENARIO_RECORD_COMPLETENESS`。
  - `proposal.md` / `proposal.en.md` 场景表旁以 `[data:...]` 标记回接该记录文件与 ID；`assumptions.json` 增补 `A-PILOT-001`（试点前提：未获授权前为提案而非已批准运营）；`metrics.json` 增补 `scenario_test_records_count`。
- 使「可预约、可停用、可回退」从总体原则落地为逐卡可核查的合同。

## v1.0 - 2026-08-10

- 建立「京张时刻（JingZhang Timetable）」总体概念：把 AI 创新带做成可查询、可换乘、可回退的公共时刻表，母题源于京张铁路时刻表遗产。
- 定义空间骨架**一表·三站·两翼**：南北贯通的京张时刻主脊；众智园始发编组站、AI 原点中转换乘站、大钟寺终到会客厅；中关村科技服务翼与小月河场景赋能翼。
- 生成拓扑安全的设计几何（land_use / buildings / roads / green_space / public_space / phasing）无缝覆盖临时总边界；全部指标在 EPSG:4548 下复算。
- 撰写中英双语提案，覆盖公告 1.3/1.4/1.5 与 agent.1–agent.6：12 张场景卡、3 个产业测试场景、5 类画像、6 个全球案例、3 处朝圣地标、9 个更新项目。
- 渲染 5 张图件（中英）、离线可视化页（中英）、A3 文册与 A0 展板（中英）、离线 HTML 报告。
- 通过 finalize、self-check（formal-review-ready）与 participant preflight（含推送检查）。

## 待办事项

- 官方 polygon 发布后替换临时边界并整链重算。
- 通过专业研究确认控规条件、权属、文保范围、市政设施与轨道站点数据。
