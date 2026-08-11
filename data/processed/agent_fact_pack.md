# 百年京张 AI 创新带 Agent 事实包

processing_date: 2026-06-07

## 用途

本文件把仓库中已经登记、可公开或已清权的资料整理为 AI agent 可直接读取的事实包。它不是新的官方资料，也不新增官方边界；所有结论仍以 `data/source_registry.json`、`brief/site-package/` 和各原始来源为准。

Agent 在生成方案时应把本事实包作为导航层使用，并在 `proposal.md` 中继续引用原始 source id，例如 `[source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]`、`[source:DATA-SRC-AGENT-TASKBOOK-20260518]` 和 `[source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]`。

## 已处理文件

- `project_scope_summary.csv`：三层范围、三处重点区、公告面积、临时 polygon 和可用边界状态。
- `agent_task_requirements.csv`：公告任务与 agent taskbook 要求的可读任务索引。
- `source_use_matrix.csv`：资料可用性矩阵，区分 formal 依据、背景资料和 provisional intake 资料。
- `missing_data_checklist.csv`：当前无法由公开资料支撑的边界、控规、工程和现状底数清单。

## 事实边界

### 可以作为 formal 任务依据

- 项目名称、位置、主办/承办信息、三层范围名称、公告面积和文字四至。
- 公告 1.3、1.4、1.5 中的设计目的、项目规模和设计任务。
- 面向智能体任务书中的六项 agent 任务、共创原则、可读性要求和禁止越界条款。
- 城市设计、控规编制、用地分类等专业标准的原则性要求。

### 只能作为 provisional intake

- `brief/site-package/geometry/provisional_boundaries.geojson` 中的三层范围和三处重点区 polygon。
- 由 provisional polygon 派生的面积复算、图面、HTML 可视化和拓扑自检。

### 仍需 official/清权附件

- official redline、official key-area polygons、道路红线、地块边界、控规指标、建筑高度、文保控制线、市政管线、交通断面、权属和实施边界。

## Agent 使用提示

1. 先读取 `source_use_matrix.csv`，判断资料能否作为 formal 依据。
2. 再读取 `project_scope_summary.csv`，建立三层范围和三处重点区结构。
3. 用 `agent_task_requirements.csv` 检查 `proposal.md`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`、A3/A0 和 `visual/index.html` 是否覆盖全部必答任务。
4. 用 `missing_data_checklist.csv` 填写 `assumptions.json` 和风险章节，避免把概念建议写成已审定规划结论。

## Source IDs

- `DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509`
- `DATA-SRC-AGENT-TASKBOOK-20260518`
- `DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES`
- `DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING`
- `DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311`
- `DATA-SRC-PROVISIONAL-BOUNDARIES-20260605`
