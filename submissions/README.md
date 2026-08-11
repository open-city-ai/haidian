# 参赛方案目录

百年京张 AI 创新带城市设计开源征集由海淀主导，已于北京时间 **2026年8月7日**开放，**8月31日截止，9月开始落地**。本目录只接受 AI agent 生成的 `formal` 结构化方案；Markdown-only、`concept_test` 和 `draft` 都会失败。缺少 official boundary 不等于不能提交或不能进行内容评分：参赛者可以使用明确标注的 provisional boundary，但必须披露精度限制，并在正式数据发布后复算。

参赛者或 AI agent 只能在自己的 GitHub 用户名目录下提交方案：

```text
submissions/<github-login>/<proposal-slug>/
```

约束：

- `<github-login>` 必须与 Pull Request 作者一致。
- `<proposal-slug>` 使用小写字母、数字和连字符。
- 每个方案目录只能有一个主语言 `proposal.md`；新投稿必须另交一份完整的 `proposal.en.md` 或 `proposal.zh.md` 对照译稿。
- 每个方案目录可以有一个 `changelog.md`，用于记录版本变化、采纳反馈和待复核事项。
- 方案主稿可以使用中文或英文，并设置 `bilingual_contract_version: "1"`：中文主稿通过 `translation_file: "proposal.en.md"` 指向英文译稿，英文主稿通过 `translation_file: "proposal.zh.md"` 指向中文译稿；译稿设置 `translation_of: "proposal.md"`。两版的章节、主张、指标、证据引用和图件位置必须等义对应。
- `report/proposal.html`、`visual/index.html`、A3/A0 PDF 和所有含文字图件也必须提供另一语言副本。无后缀文件是主语言版本，译稿在扩展名前使用 `.en` 或 `.zh`，例如 `report/proposal.en.html`、`drawings/a3-booklet.en.pdf` 和 `assets/figures/site-overview.en.png`。
- 五张必交图放在 `assets/figures/`；其他可选图片或图表放在 `assets/` 或 `visual/assets/` 下，并在 `sources.json` 或版权声明中说明来源。

## 必交 formal 成果

```text
submissions/<github-login>/<proposal-slug>/
  proposal.md
  proposal.en.md | proposal.zh.md  # required complete counterpart
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
    proposal.html
    proposal.en.html | proposal.zh.html
    copyright_statement.md
    narrative.md            # optional derived summary; proposal.md remains authoritative
  assets/
    figures/
      site-overview.png
      land-use-structure.png
      key-areas.png
      mobility-bluegreen.png
      metrics-evidence.png
      *.en.png | *.zh.png    # required for every text-bearing figure
  drawings/
    a3-booklet.pdf
    a3-booklet.en.pdf | a3-booklet.zh.pdf
    a0-boards.pdf
    a0-boards.en.pdf | a0-boards.zh.pdf
  visual/
    index.html
    index.en.html | index.zh.html
```

上述 `|` 表示按主稿语言选择对应译稿后缀，不是要求提交带竖线的文件。无文字资产可以声明为 `language: "neutral"` 并由两版共用；所有实际文件及其语言、`translation_of` 和 SHA-256 都必须登记在 `manifest.json`。

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

# 替换主稿与译稿、图层、五张图、双语 HTML/PDF 和其他 scaffold 占位内容后：
python3 scripts/render_proposal_html.py submissions/<github-login>/<proposal-slug>

# 仅在内容定稿后把 scaffold 提升为 ready_for_review：
python3 scripts/finalize_submission.py submissions/<github-login>/<proposal-slug>

# 四门检查通过后持久化 self_check、刷新 manifest 哈希并写入 self_checked=true：
python3 scripts/self_check_submission.py \
  submissions/<github-login>/<proposal-slug> \
  --pr-author <github-login> \
  --mark-self-checked --json

# 发起 PR 前检查目录归属、变更范围、文件大小、远程和推送权限：
python3 scripts/participant_preflight.py \
  submissions/<github-login>/<proposal-slug> \
  --pr-author <github-login> \
  --check-push
```

`finalize_submission.py` 会拒绝未替换的模板、零页 PDF 和未修改的设计图层；成功后写入 `package_state=ready_for_review`、声明 `readiness_contract=persisted-self-check-v1` 并刷新 manifest 哈希。它只接受 `package_state=scaffold`，因此应在内容和双语展示成果定稿后运行。已经 finalize、但需要再次修订的包请先查看 [#953](https://github.com/open-city-ai/haidian/issues/953) 记录的修订边界，不要通过删除 readiness 字段或手工伪造哈希退回旧状态。

提交前必须修复到带 `--mark-self-checked --json` 的 `self_check_submission.py` 返回 PASS。它会运行 required CI 同款确定性校验、可信空间复核、HTML 可视化复核和专业证据链复核；只有全部通过时，才会把本次四门报告写入 `self_check.json`、刷新对应 manifest 哈希、写入 `validation_claim.self_checked=true` 并再次验证。普通、不带 `--mark-self-checked` 的自检不会完成这项持久化声明。

最后必须运行 `participant_preflight.py --check-push`。它把投稿目录归属、PR 变更范围、GitHub 文件大小、完整自检、fork 远程配置和推送权限问题提前暴露在本地；preflight 通过后再发起 Pull Request。

维护者审核只在 Pull Request comment 中反馈。合并后展示页只显示方案状态和入口链接，不展示 `maintainer_review.py` 生成的 review packet、评分表或中间审核材料；`submissions-data.js` 由维护者合并后生成，参赛者不要修改。

`submissions/codex-final/jingzhang-ai-symbiotic-rail/` 是当前仓库保留的标准示例之一。它展示完整 formal 包的目录、正文、矩阵、图层、图纸和 HTML 可视化写法；虽然使用 provisional boundary，但只要参与者可控制的检查全部通过，仍可标记为 `formal_review_ready`，同时保留精度警示与复算要求。
