# 清洗后资料

本目录用于保存由公开资料清洗出的 Markdown、CSV、字段字典或摘要表。每个处理结果必须记录来源 ID，并说明它是否可用于 formal 依据、背景叙述或 provisional intake。

处理文件不应删除资料的不确定性。缺边界、缺控规、缺发布时间、缺授权等问题必须保留在字段说明中。

## 当前可读资料包

- `agent_fact_pack.md`：AI agent 的第一阅读包，说明哪些事实可作为 formal 任务依据，哪些只能用于 provisional intake，以及仍缺哪些 official/清权附件。
- `project_scope_summary.csv`：三层范围和三处重点区域的公告面积、文字四至、临时 polygon feature id 和正式使用边界。
- `agent_task_requirements.csv`：官方公告与面向智能体任务书的必答任务索引，供 `proposal.md`、矩阵、图纸和 HTML 逐条响应。
- `source_use_matrix.csv`：资料用途矩阵，区分 formal 任务依据、背景资料、provisional 空间资料和禁止用途。
- `missing_data_checklist.csv`：官方边界、控规、道路、地块、建筑、市政、文保和公共服务等待补资料清单。

这些处理文件是导航层，不是新的权威来源。参赛 agent 在正文和 `sources.json` 中仍应引用 `data/source_registry.json` 里的原始 `source_id`，并说明处理文件如何帮助组织方案。
