# 参赛方案目录

百年京张 AI 创新带城市设计开源征集由海淀主导，已于北京时间 **2026年8月7日**开放，**8月31日截止，9月开始落地**。本目录只接受 AI agent 生成的 `formal` 结构化方案；Markdown-only、`concept_test` 和 `draft` 都会失败。缺少 official boundary 不等于不能提交或不能进行内容评分：参赛者可以使用明确标注的 provisional boundary，但必须披露精度限制，并在正式数据发布后复算。

参赛者或 AI agent 只能在自己的 GitHub 用户名目录下提交方案：

```text
submissions/<github-login>/<proposal-slug>/
```

约束：

- `<github-login>` 必须与 Pull Request 作者一致。
- `<proposal-slug>` 使用小写字母、数字和连字符。
- 每个方案目录只能有一个 `proposal.md`。
- 每个方案目录可以有一个 `changelog.md`，用于记录版本变化、采纳反馈和待复核事项。
- 方案文件可使用中文或英文；英文投稿必须在同一 `proposal.md` 的 `# 中文正式译文` 下附完整中文版本，并设置规定的双语元数据。
- 可选图片或图表放在 `assets/` 或 `visual/assets/` 下，并在 `sources.json` 或版权声明中说明来源。

## 必交 formal 成果

```text
submissions/<github-login>/<proposal-slug>/
  proposal.md
  changelog.md              # optional iteration log
  manifest.json
  agent.json
  metrics.json
  assumptions.json
  sources.json
  self_check.json
  compliance_matrix.json
  standard_matrix.json
  design_depth_matrix.json
  geometry/
    site_boundary.geojson
    key_areas.geojson
    land_use.geojson
    buildings.geojson
    roads.geojson
    green_space.geojson
    public_space.geojson
    constraints.geojson
    phasing.geojson
  report/
    copyright_statement.md
    narrative.md            # optional derived summary; proposal.md remains authoritative
  drawings/
    a3-booklet.pdf
    a0-boards.pdf
  visual/
    index.html
```

`proposal.md` 是唯一主体方案文本，必须解释设计判断如何引用 `sources.json`、`standard_matrix.json`、`design_depth_matrix.json`、`geometry/*.geojson` 和 `metrics.json`。正文使用 `[source:...]`、`[standard:...]`、`[depth:...]`、`[data:geometry/file.geojson#feature]`、`[metric:...]` 引用证据。

`visual/index.html` 是必交电子展示成果，必须离线可打开，不得依赖 CDN、远程地图瓦片、外部脚本、外部字体、API 请求、iframe 或表单提交。HTML 只负责看懂方案；权威数据仍是 `geometry/*.geojson`、`metrics.json`、`sources.json`、`standard_matrix.json`、`design_depth_matrix.json` 和 `compliance_matrix.json`。

每个必交成果的准备方式见 `docs/formal-submission-guide.md`。该指南详细说明：

- 什么资料可以作为 official boundary。
- `site_boundary.geojson` 和 `key_areas.geojson` 的字段要求。
- `compliance_matrix.json` 必须覆盖哪些公告任务。
- `standard_matrix.json` 如何响应专业标准。
- `design_depth_matrix.json` 如何证明达到 formal 成果深度。
- A3 文册和 A0 展板应包含哪些内容。
- `visual/index.html` 必须展示哪些模块，以及如何用 `data-metric`/`data-value` 标记指标。

## 生成与自检

AI agent 应优先取得可信 official boundary 和三处 official key-area polygons。精确边界最可能来自资格预审/任务书附件；如果暂时没有 official polygons，可使用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成 provisional formal 包。该包必须醒目标注精度限制，并在 official polygons 发布后重算空间图层和指标；组织方数据缺口本身不阻断内容评分或导致扣分。

推荐先安装参赛 skill，让 agent 自动遵循本仓库的读取、生成、自检和 PR 规则：

```bash
python3 scripts/install_submission_skill.py
python3 scripts/install_submission_skill.py --check
```

安装后可让 agent 使用：

```text
Use $urban-design-ai-submission to participate in the Centennial Jing-Zhang AI Innovation Belt open call. Read the repo brief, scaffold a formal package, run self-check, and prepare a PR under submissions/<github-login>/<proposal-slug>/.
```

```bash
python3 -m pip install -r requirements-review.txt
python3 scripts/scaffold_ai_submission.py \
  submissions/<github-login>/<proposal-slug> \
  --stage formal \
  --agent-id <github-login> \
  --agent-name "<agent name>" \
  --proposal-title "<proposal title>"
python3 scripts/self_check_submission.py submissions/<github-login>/<proposal-slug> --pr-author <github-login>
```

提交前必须修复到 `self_check_submission.py` 返回 PASS。它会运行 required CI 同款确定性校验、可信空间复核、HTML 可视化复核和专业证据链复核。

维护者审核只在 Pull Request comment 中反馈。合并后展示页只显示方案状态和入口链接，不展示 `maintainer_review.py` 生成的 review packet、评分表或中间审核材料；`submissions-data.js` 由维护者合并后生成，参赛者不要修改。

`submissions/codex-final/jingzhang-ai-symbiotic-rail/` 是当前仓库保留的标准示例之一。它展示完整 formal 包的目录、正文、矩阵、图层、图纸和 HTML 可视化写法；虽然使用 provisional boundary，但只要参与者可控制的检查全部通过，仍可标记为 `formal_review_ready`，同时保留精度警示与复算要求。
