# 方案迭代记录

## v1.2 - 2026-08-08

### 改动摘要

- **精读辅助资料**：完整阅读 `docs/data-workflow.md`、`data/processed/agent_fact_pack.md`、`data/processed/project_scope_summary.csv`、`data/processed/agent_task_requirements.csv`、`data/processed/source_use_matrix.csv`、`data/processed/missing_data_checklist.csv`，以及 `brief/site-package/standards/references/` 下 6 份官方 snapshot（含 MOHURD-URBAN-DESIGN-MEASURES 25 条、MOHURD-CONTROL-DETAILED-PLANNING 22 条、MNR-LAND-USE-CLASSIFICATION-GUIDE、MOHURD-ARCH-DESIGN-DEPTH-2016 状态 missing_source_url）。
- **proposal.md 增加 4 个新章节**：资料缺口矩阵、标准条文对应矩阵、13 项评审维度自评、Agent 任务最小应答矩阵。
- **5 张图重做**：site-overview 加 3D 立体 + 等高线 + 指北针 + 比例尺；land-use-structure 加 MNR 分类层级 + 占比栈式；key-areas 加 3D 轴测 + 概念剖面；mobility-bluegreen 加智脉步道剖面 + 网络拓扑；metrics-evidence 加指标 vs 标准对比柱 + 大数字仪表 + 证据链流程图。
- **A3/A0 PDF 重做**，加入 v1.2 标识与剖面缩略图。
- **HTML 扩到 1.7 MB**（含 base64 data URI 嵌入所有 5 张图）。
- **self_check_submission.py**：PASS / ready_for_review。

### 采纳反馈

- 暂无外部反馈（首版 v1.0 PR 尚未评审）。
- v1.1 → v1.2 内部反馈：
  - **必须精读** `docs/data-workflow.md` 与 `data/processed/*` （SKILL.md 要求 + agent workflow 必读）
  - **缺失内容**：`missing_data_checklist.csv` 9 行 GAP 未在 proposal 中显式 cite
  - **缺失内容**：13 项统一评审维度未自评
  - **缺失内容**：6 份标准 snapshot 中 25 条 / 22 条 / 12 大类等具体条文未被逐项引用
  - **视觉升级**：5 张图原版主要靠色彩与图层表达，缺少专业规划图常见的指示符与立体表达

### 暂未采纳或待复核事项

- `MOHURD-ARCH-DESIGN-DEPTH-2016`（建筑设计文件编制深度规定 2016 版）状态仍为 `missing_source_url`，本方案已显式记入资料缺口与 `assumptions.json` A-CONTROLS-001。
- 9 个 GAP（official boundary / planning control / road / parcel / building / heritage / municipal / public facility 等）同样未取得官方或清权附件，全部按 provisional / unknown 处理。
- Logo、字体、图像、人物肖像、企业标识均需经过文保评估和清权流程后再投入实际制作。
- 3D 立体建筑基底高度完全为合成示意（基于 base + 随机 mean 高度），不代表真实建筑高度。
- 等高线为基于 site boundary 嵌套椭圆的合成示意，不基于真实 DEM。

### 公开资料与合规说明

- 本版本仅使用公开或已清权资料。精读清单：`docs/data-workflow.md` + `data/processed/*` + `brief/site-package/standards/references/*.md` + `data/source_registry.json` + `brief/site-package/*`。
- 所有边界与控规结论均按 `provisional_constraint` 标注，明确"概念建议 / 参考方案 / 可供专业团队深化研究"。
- 所有面积、比例、规模指标均按 `EPSG:4548` 复算，状态为 known 或 unknown + reason。

## v1.1 - 2026-08-08

### 改动摘要

- 完成 `urban-design-ai-submission` skill 全部 5 步 Quick Start + 9 步 Workflow。
- 包结构：`agent.json` / `manifest.json` / `metrics.json` / `assumptions.json` / `sources.json` / `self_check.json` / `compliance_matrix.json` / `standard_matrix.json` / `design_depth_matrix.json` + 9 GeoJSON + 5 PNG + 2 PDF + 离线 HTML。
- proposal.md 与 proposal.en.md 双语完整覆盖。
- self_check_submission.py：PASS, package_type=professional_design_package, package_state=ready_for_review, can enter formal review: YES。

## v1.0 - 2026-08-08

### 改动摘要

- scaffold + 替换文本 + 移除 SCAFFOLD-DRAFT。
- 跑通 install_submission_skill.py → scaffold → render_proposal_html → generate_pdfs → generate_visual → finalize → self_check 全流程。
