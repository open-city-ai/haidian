# 生成叙事报告（Formal Narrative）

本报告说明 `szsnzz/jingzhang-ren-rail` 提交包的生成方法、复算路径与边界声明，供专业评审追溯证据链。

## 1. 参与流程

本提交由 ZCode CLI Agent（模型：DeepSeek V4 Flash）按 `skills/urban-design-ai-submission` 工作流生成：

1. 读取 `brief/site-package/` 任务书（`design_brief.json`、`agent_taskbook.json`、`allowed_design_space.json`、`enums/`、`ranges/planning_limits.json`、`schemas/`）与 `data/source_registry.json`、`data/processed/agent_fact_pack.md`，建立任务、范围与资料缺口清单；
2. 生成 `proposal.md`（中文主文件）与 `proposal.en.md`（英文翻译，双语合同版本 1）；
3. 由提交几何在 EPSG:4548 下复算全部空间指标（`metrics.json`），编制合规矩阵（`compliance_matrix.json`，23 项全覆盖）、标准矩阵（`standard_matrix.json`）、设计深度矩阵（`design_depth_matrix.json`）与来源清单（`sources.json`）；
4. 生成 5 张概念图（`assets/figures/*.png`）、A3 手册与 A0 展板（`drawings/*.pdf`）、离线双语 HTML 报告（`report/proposal.html`）与离线可视化页（`visual/index.html`）；
5. 运行 `finalize_submission.py`、`self_check_submission.py`（四门自检）与 `participant_preflight.py` 完成收尾。

## 2. 复算路径

- 空间指标：全部由 `geometry/*.geojson` 在 EPSG:4548 下以 `polygon_area` / `sum(line_length)` 复算，公式与置信度记录于 `metrics.json`；
- 用地分类：按 `enums/land_use_codes.json` 注册编码归类，未发明新类别；
- 控制类指标（容积率、建筑高度、密度、退线、道路红线）：官方未提供审定条件，统一 `status=unknown`，待正式控规数据补齐后复算；
- 合规矩阵：公告 1.3/1.4/1.5 与 agent.1–agent.6 逐条映射到章节、图层、指标、图纸与 HTML 证据，无强制任务遗漏。

## 3. 边界声明

- 所有空间结论基于 `brief/site-package/geometry/provisional_boundaries.geojson` 的临时边界（`official_boundary=false`），仅用于方案生成、自检与讨论，不构成官方红线或法定控制依据；官方多边形发布后必须全量重算；
- 本包为 AI 生成的开源共创建议，不替代正式规划，不构成政府批准结论；全部建议以"概念建议 / 参考方案 / 供专业团队深化"措辞表达；
- 全球案例仅引用机制，未使用未经授权的图片、商标或肖像；HTML 为纯离线静态页，不加载任何远程资源。

## 4. 指标速览

| 指标 | 值 | 状态 |
| --- | --- | --- |
| site_area_sqm | 11,412,825.386 | known |
| green_ratio | 0.363746 | known |
| public_space_ratio | 0.155755 | known |
| building_density_ratio | 0.042081 | known |
| road_centerline_length_km | 12.681 | known（低置信，概念示意） |
| floor_area_ratio | unknown | 待官方条件 |

完整公式、来源文件与置信度见 `metrics.json`。