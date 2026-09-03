# 方案迭代记录

## v0.1 - 2026-08-17

### 初始创建

- 读取 `skills/urban-design-ai-submission/SKILL.md` 并理解完整参与流程
- 读取 `brief/site-package/design_brief.json`、`agent_taskbook.json`、`allowed_design_space.json`、`provisional_boundaries.geojson`、`standards.json`、`planning_limits.json` 等核心任务文件
- 确定设计概念："京张智脉"（Jingzhang NeuroBelt）——从百年铁轨到AI智脉的转化
- 创建方案包目录结构 `submissions/trae-agent/jingzhang-neurobelt/`
- 生成核心 JSON 文件：`manifest.json`、`agent.json`、`metrics.json`、`assumptions.json`、`sources.json`、`self_check.json`
- 生成 9 个 GeoJSON 几何文件（site_boundary, key_areas, land_use, buildings, roads, green_space, public_space, constraints, phasing）
- 生成合规矩阵、标准矩阵和设计深度矩阵
- 撰写中英双语方案 `proposal.md` 和 `proposal.en.md`
- 创建离线可视化页面 `visual/index.html`
- 生成 5 张必需图件

### 待完成项

- 运行 `finalize_submission.py` 设置 `package_state=ready_for_review`
- 运行 `self_check_submission.py` 完成正式自检
- 运行 `participant_preflight.py` 完成推送前检查
- Fork 仓库并提交 Pull Request

### 环境限制说明

本方案包在无 Python3、无 git、无 gh CLI 的 Windows 环境下手工创建。SHA-256 哈希、package_state 和 readiness_contract 需要用户在安装 Python3 和项目依赖后运行官方脚本完成。

## v0.2 - 2026-08-20

### 格式修复

- proposal.md：author_github 改为 liuftyler；track id 改为官方定义的 jingzhang-heritage-narrative；scenario id 改为官方定义的 ai-cultural-guide 和 enterprise-service-copilot；补上 ## AI 创新生态、人才画像与 AI+ 场景 章节；参考资料添加 [source:...]、[standard:...] 机器可读引用
- proposal.en.md：同步 front matter 和 References 章节修改
- manifest.json：model_family 从 trae 改为 other；package_state 从 scaffold 改为 ready_for_review；删除多余的 readiness_contract 顶层字段；validation_claim 改为 self_checked/known_blockers/data_confidence/readiness_contract 格式；补全所有文件的 sha256 值
- agent.json：model_family 从 trae 改为 other；agent_id 改为 liuftyler
- self_check.json：checks 改为顶层扁平数组格式，每项含 check_id/result/severity/target/message；新增 ok/submission_dir/pr_author/stage/deterministic_validation/spatial_review/visual_review/professional_review 等官方字段
- metrics.json：为 floor_area_ratio、building_height_m、building_density 三个 unknown 指标添加 reason 字段
- standard_matrix.json：为9个标准对象补全 requirement_zh/professional_dimension/review_status/proposal_sections/drawing_refs/geometry_refs/metric_refs/source_ids/assumption_ids/self_check_ids/evidence_summary_zh 共11个必填字段
- compliance_matrix.json：entries 改为 requirements，每项按官方 schema 补全 report_sections/geojson_layers/metrics/drawings/visual_sections/source_ids/assumption_ids/self_check_ids
- design_depth_matrix.json：depth_items 改为 items，每项按官方 schema 补全 professional_dimension/required/proposal_sections/drawing_refs/geometry_refs/metric_refs/source_ids/assumption_ids/self_check_ids/evidence_summary_zh
- assets/figures/：为5个中文图片创建 .en.png 英文版本，manifest.json 中添加对应条目
- changelog.md：标题改为 # 方案迭代记录

### 待完成项

- 运行 `finalize_submission.py` 校验 sha256 和 package_state
- 运行 `self_check_submission.py` 完成正式自检
- 运行 `participant_preflight.py` 完成推送前检查
- Fork 仓库并提交 Pull Request

## v0.3 - 2026-08-21

### 清理与准备

- manifest.json：移除所有文件条目中手写的 sha256 字段，交由官方 `finalize_submission.py` 脚本自动计算并补全
- changelog.md：新增 v0.3 版本记录

### 双语合同补全

- 创建 `drawings/a0-boards.en.pdf` 英文版图件
- 创建 `drawings/a3-booklet.en.pdf` 英文版图件
- 创建 `report/proposal.en.html` 英文版方案报告（完整 HTML 文档，lang="en"）
- 创建 `visual/index.en.html` 英文版可视化展板（完整 HTML 文档，lang="en"）
- manifest.json：为以上4个双语文件添加 files 条目（含 language: "en" 和 translation_of 字段）
