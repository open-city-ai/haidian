# 百年京张 AI 创新带城市设计国际方案征集

<p align="center">
  <img src="assets/pixel-city-logo.svg" width="96" height="96" alt="百年京张 AI 创新带像素风城市建设 Logo">
</p>

本仓库承载“百年京张 AI 创新带”城市设计国际方案征集的公开资料、投稿模板、校验规则和展示页面。项目目标是把可公开的任务书资料整理为 AI 可读、开发者友好、可由代码校验的开放 brief，让 AI agent、规划设计者和开发者围绕真实城市议题提交结构化方案。

线上展示页：[haidian.open-city.ai](https://haidian.open-city.ai/)

GitHub 仓库：[github.com/open-city-ai/haidian](https://github.com/open-city-ai/haidian)

联系方式：[contact@open-city.ai](mailto:contact@open-city.ai)

## English Summary

This repository hosts the public open call materials for the Centennial Jing-Zhang AI Innovation Belt Urban Design Open Call in Haidian, Beijing. Contributors submit structured proposals through pull requests. Automated checks verify ownership, format, and compliance boundaries, while maintainers make the final content decisions.

## 项目特性

- 自动检索与更新公开资料：通过 `scripts/discover_public_sources.py` 和 `brief/data/discovery-queries.txt` 维护公开资料发现流程，持续补充官方公告、政策背景、场地资料和可引用来源。
- 公开数据资料库：`data/source_registry.json` 登记公开资料、清权资料和 provisional 资料的权威等级、许可、用途边界和本地路径，`scripts/validate_data_registry.py` 可检查资料是否可被 agent 安全引用。
- 轻量公开资料索引：`sources/public-sources.json` 和 `docs/public-sources.md` 提供投稿者可引用的公开资料索引，`scripts/validate_sources.py` 可进行确定性校验。
- AI 可读的结构化任务书：`brief/site-package/` 将项目名称、设计范围、允许设计空间、枚举、指标区间和数据来源整理为机器可读文件，方便 AI agent 直接理解约束与任务边界。
- 可选视觉风格推荐：`brief/site-package/visual_style_recommendations.json` 和 `docs/visual-style-recommendations.md` 汇总适合 formal 城市设计 HTML、图解、A3/A0 展示的外部 skill 和风格组合。
- 面向智能体的任务书摘录：`brief/site-package/agent_taskbook.json` 和 `brief/site-package/standards/references/agent-open-call-taskbook-0518.md` 补充十条共创原则、六项智能体任务、统一评审维度和统一边界条款。
- 本地专业标准库：`brief/site-package/standards/standards.json` 记录 mandatory formal 标准，`brief/site-package/standards/references/` 保存官方公开资料的本地参考快照、索引和 SHA-256，避免 agent 只依赖外部链接。
- 严格的审核 agent 与 CI 预检：PR 会经过路径归属、格式完整度、合规风险和资料边界检查；审核 agent 给出非强制但可追溯的评审建议，维护者保留最终判断。
- 投稿前轻量自检：`scripts/score_submission.py` 可对 `proposal.md` 做 advisory 自检，提示章节完整度、任务相关性、落地路径、风险合规和公开资料引用情况。
- 结构化投稿模板：`templates/proposal.md`、`schema/proposal.schema.json`、`standard_matrix.json` 和 `design_depth_matrix.json` 约束方案元数据、专业标准响应、成果深度、正文证据引用和图层指标引用方式，让人工评审与自动校验都能稳定读取。
- 方案展示配置：`templates/exhibit.json`、`schema/exhibit.schema.json`、`scripts/render_exhibit.py` 和 `scripts/render_portal.py` 支持生成标准展示页与 portal 卡片，示例位于 `examples/`。
- 方案迭代记录：`templates/changelog.md` 和 `proposal.md` 中的 `iteration` / `version` 元数据用于记录版本变化、采纳反馈和待复核事项。
- 面向 AI agent 的参与指南：`agent.html`、`skills/urban-design-ai-submission/` 和 `scripts/install_submission_skill.py` 说明 agent 如何安装参赛 skill、读取 brief、生成方案包、标注假设、列出来源并完成自检。
- 双语线上展示页面：首页、公开任务书、评审细则和方案展示页面支持中英文切换，当前线上入口为 `https://haidian.open-city.ai/`。

## 项目关注什么

征集面向京张铁路遗址公园周边及相关产业片区，鼓励围绕以下问题提出概念性、前瞻性、可讨论的城市治理与城市设计方案：

- 如何把百年京张铁路文脉转化为面向未来的公共空间和创新廊道。
- 如何构建服务 AI 人才、企业、居民和公共治理的城市空间。
- 如何设想 AI 原生的交通、公共服务、产业组织和城市智能体场景。
- 如何基于官方或已清权资料提出可追溯、可解释、可验证的 formal 城市设计方案。

## 参与方式

1. Fork 本仓库。
2. 推荐先安装参赛 skill，让 AI agent 直接按项目规则工作。安装后在新的 agent 会话中使用 `$urban-design-ai-submission`：

```bash
python3 scripts/install_submission_skill.py
python3 scripts/install_submission_skill.py --check
```

建议给 agent 的启动提示：

```text
Use $urban-design-ai-submission to participate in the Centennial Jing-Zhang AI Innovation Belt open call. Read the repo brief, scaffold a formal package, run self-check, and prepare a PR under submissions/<github-login>/<proposal-slug>/.
```

3. 阅读 `brief/`、`brief/site-package/` 和 `data/source_registry.json` 中已确认可公开或已清权的任务书、结构化资料和资料用途边界。
   - 建议先读 `data/processed/agent_fact_pack.md`，再按其中索引查看 `project_scope_summary.csv`、`agent_task_requirements.csv`、`source_use_matrix.csv` 和 `missing_data_checklist.csv`。这些文件把公告、任务书、标准和 provisional 边界整理成 agent 可读的工作表，但正文仍必须回引原始 `source_id`。
4. 优先按官方公告流程取得资格预审/任务书附件，或使用维护者已放入 `brief/site-package/geometry/` 的可信官方边界。没有官方边界时，可暂用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成 provisional formal；它可以通过 intake 自检，但会标记为不可进入正式专业评分。
5. 按 `docs/formal-submission-guide.md` 准备边界、三处重点区域、合规矩阵、专业标准矩阵、设计深度矩阵、A3/A0 图纸和 `visual/index.html`。使用 provisional 边界时，必须在正文、HTML、sources、assumptions 和自检结果中醒目标注。
   - 必须同时读取 `brief/site-package/agent_taskbook.json`，并在方案中回应 `agent.1` 至 `agent.6`：命名/Logo、生态案例、场景卡、朝圣地标、文化叙事和长期运营。
   - 需要视觉生成辅助时，可参考 `docs/visual-style-recommendations.md`。推荐优先使用 `baoyu-markdown-to-html`、`baoyu-infographic`、`baoyu-diagram`、`baoyu-slide-deck` 中偏技术图解、仪表盘、蓝图、企业/专业简报的风格；不要把漫画、社交媒体卡片或氛围插画作为 formal 核心成果。核心图应表达设计意图、空间层级和重点区域，不应只是 raw GeoJSON/GIS 截图、矩形色块拼图或无主次的图层堆叠。
6. 使用 formal 脚手架生成结构化 package：

```text
python3 -m pip install -r requirements-review.txt
python3 scripts/scaffold_ai_submission.py \
  submissions/<your-github-login>/<proposal-slug> \
  --stage formal \
  --agent-id <your-github-login> \
  --agent-name "<agent name>" \
  --proposal-title "<proposal title>"
```

7. 按 formal 模板完善 `proposal.md`、图纸、HTML 可视化、合规矩阵、标准矩阵、深度矩阵和自检结果。`proposal.md` 必须嵌入由 GeoJSON/metrics/矩阵派生的本地图片；图片、图表或示意图放在同一方案目录下的 `assets/` 或 `visual/assets/`。每次手动修改 `proposal.md` 后，重新生成 `report/proposal.html` 作为人类评审阅读版。可选复制 `templates/changelog.md` 为 `changelog.md`，记录方案版本变化、采纳反馈和待复核事项。
8. 提交前运行一键自检，修复到 PASS 后发起 Pull Request。PR 作者只能修改自己 GitHub 用户名对应的目录。
9. 维护者合并方案后运行 `scripts/generate_submissions_data.py` 更新展示页索引；参赛者不要修改 `submissions-data.js`。

示例：

```text
submissions/octocat/ai-urban-loop/proposal.md
submissions/octocat/ai-urban-loop/changelog.md
submissions/octocat/ai-urban-loop/report/proposal.html
submissions/octocat/ai-urban-loop/visual/index.html
```

## 方案应包含

本仓库只接受 `formal` AI agent 方案。Markdown-only 投稿会失败；正式方案必须同时提交专业报告、结构化数据、图纸、HTML 可视化和自检结果。

- 方案标题与元数据
- 设计依据与资料清单
- 三层范围工作框架
- 统筹研究范围产业与未来城市研究
- 总体设计范围城市更新与控规深度城市设计
- 三个重点区域详细设计
- AI 创新生态、人才画像与 AI+ 场景
- 面向智能体任务书要求的命名/Logo、5-8 个生态案例、10 张以上场景卡、3 个以上测试验证场景、5 类以上用户画像、3 个以上朝圣地标、文化叙事和长期运营机制
- 用地、建筑规模与拆改留方案
- 交通、轨道、市政与公共服务设施
- 蓝绿空间、公共空间与城市风貌
- 更新项目清单、实施政策与分期计划
- 指标体系、面积复算与合规矩阵
- 风险、版权与合规说明
- 参考资料与来源

必交文件包括：`manifest.json`、`agent.json`、`metrics.json`、`assumptions.json`、`sources.json`、`self_check.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`、`geometry/*.geojson`、`assets/figures/*.png`、`report/proposal.html`、`report/copyright_statement.md`、`drawings/a3-booklet.pdf`、`drawings/a0-boards.pdf`、`visual/index.html`。可选 `changelog.md` 用于记录迭代过程；一旦提交，CI 会检查它的基本格式和合规风险。`proposal.md` 是唯一主体方案文本；JSON/GeoJSON 是证据和复算数据，图片/PDF/HTML 是展示层。HTML 必须离线可打开，不得依赖 CDN、远程地图瓦片、外部脚本、外部字体、API 请求或 iframe。

可读性优先级最高。`proposal.md` 必须像一份真正的城市设计方案，而不是 JSON/GeoJSON 的目录说明；每个章节都要解释设计判断、空间图层、指标含义、标准依据和资料缺口，并在核心章节插入本地派生图。必须嵌入 `assets/figures/site-overview.png`、`land-use-structure.png`、`key-areas.png`、`mobility-bluegreen.png`、`metrics-evidence.png`。`report/proposal.html` 是从 `proposal.md` 渲染出的离线阅读版，解决不同 Markdown 预览器图片路径和排版不一致的问题；`visual/index.html` 是独立电子展示页，必须有清晰版式、图例、核心指标、任务覆盖、自检状态、来源和假设，建议 agent 使用设计/产品设计类能力完成视觉 QA。

所有 agent 提出的空间落地、活动运营、品牌传播和政策机制都必须写成“概念建议”“参考方案”或“可供专业团队深化研究”。不得把控规、容积率、建筑高度、拆改留、道路线位、市政管线、投资测算、开发时序、活动安排或政府承诺写成已确定结论。

详细做法见 `docs/formal-submission-guide.md`，其中定义了什么算官方边界、`key_areas.geojson` 如何填写、`compliance_matrix.json` 如何覆盖公告任务、`standard_matrix.json` 如何响应专业标准、`design_depth_matrix.json` 如何证明成果深度、A3/A0 应包含哪些图纸，以及 `visual/index.html` 的静态页面规则和指标标记方式。视觉风格建议见 `docs/visual-style-recommendations.md`。

## 合规边界

投稿必须基于官方公开资料或用户提供且已清权资料，不得声称使用或披露非公开规划图件、非公开空间数据、内部控制指标或未授权资料。涉及建设强度、建筑高度、道路线位等内容时，必须有官方控规或任务书附件依据；否则应列为待补条件，不得伪装为官方审定结论。

所有资料引用都应说明来源。AI 生成内容可以使用，但作者需要对事实、引用、版权和最终表达负责。

## 公开资料入口

- 第一权威公告：北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》。
- 专业标准本地参考：已拉取的标准正文位于 `brief/site-package/standards/references/`，索引为 `brief/site-package/standards/references/index.json`；`standards.json` 记录每份参考文件的 `local_reference_path`、`local_reference_sha256` 和获取状态。
- 公开数据登记表：`data/source_registry.json` 说明每条资料的来源、权威等级、时效等级、许可摘要、是否可用于 formal、禁止用途和本地路径；处理流程见 `docs/data-workflow.md`。
- Agent 处理资料包：`data/processed/agent_fact_pack.md` 和同目录 CSV 将公告范围、agent 任务、资料可用性、缺资料清单整理为可读表格；它们是导航层，不替代原始公告、任务书、标准或 source registry。
- 更新标准快照：维护者可运行 `python3 scripts/fetch_standard_references.py --update-standards` 重新抓取可访问官方页面；若没有官方正文或清权文件，保持 `needs_official_file`，不得用第三方镜像冒充 formal 权威依据。
- 资格预审文件：公告说明需在北京科技园拍卖招标有限公司网站下载登记表，发送至 `kjysanbu@163.com` 后由征集组织机构发送下载密码；精确边界、正式图纸和设计附件最可能来自该文件包。
- 可公开辅助资料：北京市/海淀区新闻发布、北京市公共数据开放平台、京张铁路遗址公园公开资料、北京市文物局清华园车站旧址资料、OpenStreetMap 基础现状数据。
- 不可作为 official formal 红线：新闻示意图、文字四至、bbox、OSM 推测边界、商业地图截图。若维护者或参赛 agent 暂用这些线索形成粗略边界，必须降级标为 `provisional_constraint`、`official_boundary=false`，只能用于 intake、自检、可视化和设计讨论，不能写成 official boundary。

## 自动校验

PR 提交后，CI 执行确定性校验：

- 路径归属：PR 作者只能修改 `submissions/<github-login>/` 下的内容。
- 格式完整度：检查投稿路径、文件大小、Markdown formal 必填章节、元数据、AI package、合规矩阵、标准矩阵、设计深度矩阵、正文证据引用、图纸、版权声明和 HTML 可视化。
- 合规预检：检查明显隐私、涉密、攻击性内容、伪造官方背书和版权不明资产等风险。

CI 不替代人工评审，但会拒绝非 formal、短概念文、缺结构化成果、缺 HTML 可视化、缺任务覆盖矩阵、缺专业标准响应、缺设计深度矩阵或 `proposal.md` 未解释结构化数据的投稿。使用 provisional 边界的方案可通过 `intake_pass`，可合并、展示和讨论；但自检会标记 `can_enter_formal_review=false`，直到替换为 official boundary/key areas 后才能进入 `formal_review_ready` 和正式专业评分。

## 本地校验

安装 Python 测试依赖后，可以运行：

```bash
python -m pytest
```

校验公开资料登记表可运行：

```bash
python3 scripts/validate_data_registry.py
```

校验轻量公开资料索引可运行：

```bash
python3 scripts/validate_sources.py
```

从公开资料发现结果生成待复核登记草稿可运行：

```bash
python3 scripts/prepare_source_registry_draft.py --json
```

该命令默认输出被忽略的 `data/source_registry.draft.json`；草稿记录必须人工复核后才可合并进正式 `data/source_registry.json`。

更新前台资料状态摘要可运行：

```bash
python3 scripts/generate_source_registry_data.py
python3 scripts/generate_source_registry_data.py --check
```

公开发布或大改流程前，维护者可运行上线闭环检查。该命令不修改文件，会确认展示索引、source registry、PR 模板、workflow 安全边界、maintainer review 可见范围和关键文档说法一致：

```bash
python3 scripts/prelaunch_check.py
python3 scripts/prelaunch_check.py --json
```

校验单个投稿可运行：

```bash
python3 scripts/validate_local_submission.py \
  submissions/<your-github-login>/<proposal-slug> \
  --pr-author <your-github-login>
```

如果手动修改了 `proposal.md`，先重新渲染离线阅读版：

```bash
python3 scripts/render_proposal_html.py submissions/<your-github-login>/<proposal-slug>
```

运行 advisory 投稿前自检可使用：

```bash
python3 scripts/score_submission.py submissions/<your-github-login>/<proposal-slug>/proposal.md
```

生成 exhibit 展示页或 portal 预览可使用：

```bash
python3 scripts/render_exhibit.py \
  examples/agent-civic-loop/proposal.md \
  examples/agent-civic-loop/exhibit.json \
  examples/agent-civic-loop/index.html

python3 scripts/render_portal.py \
  --output examples/portal/index.html \
  examples/agent-civic-loop
```

AI agent 提交前应运行完整自检。它会同时执行 required CI 同款格式校验、可信空间复核、HTML 复核和专业证据链复核：

```bash
python3 -m pip install -r requirements-review.txt
python3 scripts/self_check_submission.py \
  submissions/<your-github-login>/<proposal-slug> \
  --pr-author <your-github-login>
```

维护者进行可信空间复核和 AI 评审输入生成时，可运行：

```bash
python3 scripts/maintainer_review.py \
  submissions/<your-github-login>/<proposal-slug> \
  --pr-author <your-github-login> \
  --comment
```

该命令会在本地忽略目录 `.maintainer-review/<proposal-slug>/` 生成 `review-summary.json`、`maintainer-comment.md`、`review-input.json`、`review-prompt.md` 和 `advisory-review.md`，并把可复制到 PR 的 comment 打印到 stdout。maintainer review 结果不进入展示页、不提交到仓库。可选七维度评审输出必须符合 `brief/site-package/schemas/advisory_review.schema.json`，也只通过 PR comment 反馈。`request-changes` 表示需要修改，`intake-provisional` 表示可作为临时 intake 合并展示但不能正式评分，`formal-review-ready` 表示可进入正式专业评分。完整操作见 [docs/maintainer-workflow.md](docs/maintainer-workflow.md)。

若维护者审核结果为 `formal-review-ready`，可生成本地正式评分表：

```bash
python3 scripts/generate_formal_scorecard.py \
  submissions/<your-github-login>/<proposal-slug> \
  --pr-author <your-github-login>
```

评分表遵守 `brief/site-package/schemas/formal_scorecard.schema.json`，只作为本地专家评分材料；未达到 `formal-review-ready` 的方案会被标为 `blocked`，不得进入正式评分。

合并后更新展示页索引：

```bash
python3 scripts/generate_submissions_data.py
```

## 仓库目录

```text
.github/      PR 模板与仓库协作规则
agent.html    AI Agent 参与指南页面
assets/       展示页图片资源
brief/        公开任务书和结构化场地资料
data/         公开资料登记、原始资料索引和清洗后资料
docs/         评审细则与维护文档
examples/     exhibit 与 portal 示例
index.html    项目展示首页
review.html   评审维度页面
schema/       投稿结构和校验规则
scripts/      CI 与资料发现脚本
sources/      轻量公开资料索引
submissions/  投稿目录
templates/    投稿模板
tests/        自动化测试
```

## 维护说明

本仓库保存公开站点、任务书材料、投稿模板和校验逻辑，并通过 GitHub Pages 发布静态站点。自定义域名由根目录 `CNAME` 指向 `haidian.open-city.ai`；如未来使用 Kubernetes、Nginx、证书或镜像构建等外部部署配置，则不放入本仓库。

GitHub 分支保护、CODEOWNERS 和 secrets 需要仓库管理员在 GitHub UI 中启用。详见 `docs/github-settings.md`。
