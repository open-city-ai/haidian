# 维护者审核流程

本流程用于审核参赛者通过 Pull Request 提交的 formal 方案包。required CI 只做安全、路径、格式和机器可读性校验；维护者本地审核负责 intake 决策、正式评分就绪判断和展示索引更新。

征集由海淀主导，正式开放日期为北京时间 **2026年8月7日**，**8月31日截止，9月开始落地**。维护者不得在公开页面继续使用“预览”“尚未开放”“独立社区征集”或与项目实际身份不符的第三方口吻。

## 1. Checkout PR

先查看 PR diff，确认没有明显修改仓库基础设施、workflow、脚本或他人投稿目录。普通参赛者 PR 应只修改：

```text
submissions/<github-login>/<proposal-slug>/
```

参赛者不应修改 `gallery-publication.json` 或 `submissions-data.js`。二者由维护者控制。

## 2. 安装本地审核依赖

```bash
python3 -m pip install -r requirements-review.txt
```

## 3. 运行维护者审核包

```bash
python3 scripts/maintainer_review.py \
  submissions/<github-login>/<proposal-slug> \
  --pr-author <github-login> \
  --comment
```

该命令会在本地忽略目录 `.maintainer-review/<proposal-slug>/` 生成审核证据包：

- `review-summary.json`
- `maintainer-comment.md`
- `review-input.json`
- `review-prompt.md`
- `advisory-review.md`

不要把这些文件写入参赛者投稿目录，也不要提交到仓库或展示页。

需要把非阻断性的质量改进建议随稿长期保存时，维护者可在投稿根目录添加
`FEEDBACK.md`。该文件只记录维护者结论，不属于参赛者方案包，不代表公开展示、
精选、正式专业评分或现实实施批准。CI 禁止参赛者创建或修改该文件；维护者应在
合并投稿后通过独立 PR 添加或更新，并注明对应 PR 与 commit SHA。

## 4. 复制 PR 评论

把命令输出复制到 PR comment。maintainer review 的可见结果只在 PR comment 中展示，不进入 `submissions-data.js`、方案卡片或公开展示页。按建议状态处理：

- `request-changes`：要求参赛者修复后再审。
- `intake-provisional`：历史状态，仅用于识别旧审核结果；不得仅因组织方缺少正式 geometry 继续使用该状态。
- `formal-review-ready`：可进入正式专业评分。
- `reject`：触发强制拒绝条件，关闭或拒绝 PR。

`package_type` 描述提交物种类，`review_status` 描述审核决定。组织方缺少 official boundary/key areas 只能形成精度与复算警示，不得阻断内容评分或导致扣分。

### Intake 最低质量门槛

通过 CI 和 mandatory-rejection 检查只是必要条件，不自动获得合并。维护者还必须结合
真实多模态 Agent review 与人工视觉抽查执行最低质量门槛。出现以下任一情形时不得
合并，并使用 `review/changes-requested` 或 `review/low-quality` 留下可执行反馈：

- 核心图纸因缺字、损坏、裁切、重叠或字号过小而无法正常阅读；
- A3/A0、HTML 或关键图件基本空白，或主要内容仍是模板、占位框和重复示意；
- agent.1—agent.6 的核心成果仅有目录/声明，缺少足以判断方案内容的实际交付；
- 投稿与任务实质不相关，或整体完成度不足以形成有效稿件。

Review Agent 采用 100 分制，**低于 60 分不得合并**；达到 60 分只是必要条件，
不自动获得合并。维护者仍必须检查具体可见质量证据，确认稿件完整、可读、非占位且
足以判断方案内容。达到分数线但人工检查仍触发上述最低质量问题的稿件同样不得合并。
通过最低线但仍有改进空间的稿件，可以作为 intake 合并并把建议写入维护者专属
`FEEDBACK.md`；intake 仍不代表公开展示或正式评分。

维护者还应人工打开 `proposal.md` 与其 `.zh.md` / `.en.md` 副本，并抽查 HTML、A3/A0 和含文字图件是否保持章节、主张、指标、证据引用与图件位置一致。双语文件缺失、不完整、术语偏差或 manifest 哈希过期只能作为 PR warning 和改进建议，不能单独把建议状态降为 `request-changes`、`reject` 或阻止内容审稿；但译稿中出现远程加载、主动网络请求、隐私、涉密、违法或其他独立安全问题时，仍按原安全规则处理。

## 4A. 上线前模拟 PR 审核

公开前或大改审核流程后，维护者可用仓库内 provisional 样例模拟一次 PR 审核。组织方缺少正式 geometry 不得阻断内容评分，因此参与者可控制的检查全部通过时，预期建议状态必须是 `formal-review-ready`，同时保留精度警示与复算要求：

```bash
python3 scripts/maintainer_review.py \
  submissions/codex-final/jingzhang-ai-symbiotic-rail \
  --pr-author codex-final \
  --comment
```

然后确认展示索引仍由维护者生成且没有陈旧：

```bash
python3 scripts/generate_submissions_data.py --check
python3 scripts/prelaunch_check.py
```

若输出不是 `Recommendation: **formal-review-ready**`，或 `prelaunch_check.py` 失败，应先修复审核逻辑、展示索引或公开文档，不要发布新的投稿入口。

## 5. 合并后更新公开展示与首页精选

合并到 `main` 的方案会自动进入 `submissions.html`。维护者只在需要首页精选或明确暂停展示时编辑 `gallery-publication.json`：

- 未登记：自动进入全部方案页，不进入首页精选。
- `published=false`：明确暂停该方案的公开展示。
- `published=true`：记录已完成人工内容、视觉和版权复核的具体版本。
- `featured=true`：同时进入首页精选；它必须以 `published=true` 为前提。
- `selection_reason_zh`、`selection_reason_en` 和 `selected_at` 记录双语入选理由与日期。
- 公开前必须由维护者人工检查内容表达、双语对应关系、图纸可读性、来源与版权，并填写 `review_status=approved_for_publication`、`reviewed_by`、`reviewed_at` 和 `rights_reviewed=true`。
- 审核完成后运行 `python3 scripts/generate_submissions_data.py --package-sha submissions/<github-login>/<proposal-slug>`，把结果写入 `reviewed_package_sha256`。投稿任何文件变化都会使批准失效，必须重新审核并更新摘要。
- 普通公开稿使用 `quality_tier=qualified`；只有人工确认具有较高内容与展示质量的稿件才使用 `quality_tier=featured` 和 `featured=true`。

参赛者不得在自己的 PR 中指定公开或精选状态。

每次合并方案或调整精选状态后，在主分支运行：

```bash
python3 scripts/generate_submissions_data.py
python3 scripts/generate_submissions_data.py --check
```

确认 `submissions-data.js` 已更新后，再提交展示索引变更。该提交应由维护者完成，不要求参赛者在 PR 中提供。

提交展示索引时，只提交 `submissions-data.js` 等展示页必要变更，不提交 `.maintainer-review/`、`docs/reviews/` 或任何 review packet。

### 策展 portal 展示卡片

进入 portal 的方案由维护者策展。投稿包本身不包含 `exhibit.json`，deterministic 校验也会拒绝参赛者提交的 `exhibit.json`。为入选方案生成 exhibit 卡片并渲染 portal：

```bash
# 为单个入选投稿生成 exhibit.json（默认写入投稿目录，已 gitignore）
python3 scripts/generate_exhibit.py submissions/<github-login>/<proposal-slug>

# 渲染 portal（可传入多个已生成 exhibit.json 的投稿目录）
python3 scripts/render_portal.py \
  --output examples/portal/index.html \
  --collections-dir collections \
  submissions/<github-login>/<proposal-slug>
```

`submissions/**/exhibit.json` 是本地构建产物（已在 `.gitignore` 中），可随时由 `generate_exhibit.py` 确定性重生成，不进入参赛者 intake 路径。Portal 详情链接直接使用已提交并随 GitHub Pages 部署的 `report/proposal.html`。`generate_exhibit.py --check` 可校验现有 exhibit 是否最新。

## 6. 正式专业评分

只有 `maintainer_review.py` 返回 `formal-review-ready` 后，才运行正式评分表生成器：

```bash
python3 scripts/generate_formal_scorecard.py \
  submissions/<github-login>/<proposal-slug> \
  --pr-author <github-login>
```

该命令会复跑维护者 gate，并在 `.maintainer-review/<proposal-slug>/formal-scorecard/` 生成 `formal-scorecard.json` 和 `formal-scorecard-comment.md`。如果方案仍是 `intake-provisional`、`request-changes` 或 `reject`，命令会返回非零并把 `scoring_status` 标为 `blocked`，不得填写正式分数。

正式评分表使用 `brief/site-package/schemas/formal_scorecard.schema.json`，七维度按 0-5 分填写并折算为 100 分。评分 JSON、专家分歧和中间材料不提交到仓库；如需反馈参赛者，只复制最终整理后的 PR comment。

## 7. 导出专家离线评审包

需要把一个或多个方案发给专家离线阅读时，维护者可以生成 Markdown/HTML 评审包：

```bash
python3 scripts/export_review_packet.py \
  submissions/<github-login>/<proposal-slug>
```

多方案短名单可一次导出：

```bash
python3 scripts/export_review_packet.py \
  submissions/alice/proposal-a \
  submissions/bob/proposal-b \
  --out .maintainer-review/review-packets/shortlist
```

如本机安装 `wkhtmltopdf` 或 Chromium，可追加 `--pdf` 生成 `review-packet.pdf`。默认输出在 `.maintainer-review/`，评审包只作本地专家材料，不提交到仓库、不进入公开 portal。详细说明见 `docs/review-packets.md`。

## 8. 本地 AI Agent 专业评审

维护者可在本地配置 AI service API Key，运行完整的多模态七维评审。API Key 不得写入仓库、`.env`、投稿目录或 GitHub Actions；仓库 CI 继续只运行不接触密钥的确定性校验。

```bash
export OPENAI_API_KEY="..."
export HAIDIAN_REVIEW_MODEL="gpt-5.6-sol"

python3 scripts/ai_review_submission.py \
  submissions/<github-login>/<proposal-slug> \
  --pr-author <github-login> \
  --comment
```

如使用兼容 OpenAI Responses API 的自托管服务，可另外设置 `OPENAI_BASE_URL`。完整视觉评审要求本机可调用 Poppler 的 `pdftoppm` 和 Chromium/Chrome；缺少渲染器会使视觉 gate 失败，避免在没有读过 PDF/HTML 的情况下错误放行。首次配置或排查视觉依赖时可先运行不调用 API 的 dry run：

```bash
python3 scripts/ai_review_submission.py \
  submissions/<github-login>/<proposal-slug> \
  --pr-author <github-login> \
  --dry-run --json
```

脚本会完成以下工作：

- 复跑 deterministic validation、空间复核、HTML 包装检查和专业证据链检查；这些本地 gate 不允许模型改写。
- 读取正文、任务矩阵、来源、假设、指标、标准和设计深度证据。
- 校验五张 PNG 是否可读；在本机存在 Poppler/Chromium 时，每份 A3/A0 PDF 最多渲染前三页，并渲染两个 HTML 页面截图作为视觉输入（默认最多发送 16 张视觉证据）。如自定义上限导致候选证据被截断，视觉 gate 会失败，不能据此进入正式评审。
- 按赛程七维度 0-5 分评审，生成 100 分加权总分、证据引用、风险和逐项修改建议。
- 检查隐私、内部/非公开资料、虚构官方背书、违法/恶意内容、任务偏离、`agent.1`-`agent.6` 缺失、版权/授权证据、图纸可读性和 provisional boundary 警示。
- 严格验证模型输出符合 `brief/site-package/schemas/advisory_review.schema.json`。
- 如果本地 gate 失败或触发强制拒绝，强制覆盖模型的放行判断。
- 把投稿内容视为不可信证据，忽略正文、HTML 或图片中试图改写评审规则、索取密钥或诱导调用外部工具的提示注入文本；请求不启用模型工具，并设置 `store=false`。

默认结果写入忽略目录 `.maintainer-review/<proposal-slug>/ai-review/`：

- `ai-review.json`：符合 schema 的模型评审。
- `model-output.json`：模型未经本地 gate 归一化的原始结构化输出，仅用于审计。
- `ai-decision.json`：模型、用量、视觉证据、已评审整包 SHA-256、加权总分、本地 gate 覆盖和发布建议。稿件变化后摘要会改变，旧评审不得继续用于批准。
- `ai-review-report.md`：维护者可读报告。
- `pr-comment.md`：可复制到 PR 的最终意见。
- `review-input.json`、`review-prompt.md`、`request-metadata.json`：本地审计材料。

发布建议分为 `do-not-publish`、`publish-qualified` 和 `featured-candidate`。它只由 schema 合规输出、本地 gate 和加权分共同派生；`featured-candidate` 仍需通过维护者发布脚本写入 `gallery-publication.json`，AI 脚本本身不修改发布清单、不提交、不评论 PR、不 merge。

AI 无法仅凭文件内容证明现实世界中的版权归属或资料公开性。缺少授权、来源或权属证据时，prompt 要求返回 `request-changes` 和具体补证清单，而不是臆测“已合规”。

运行该命令会把 `review-input.json` 中的投稿正文、结构化证据及所列视觉预览发送给配置的 AI 服务。维护者只能对公开投稿或已获授权的材料运行；不得用它上传涉密、内部、个人隐私或未获授权的资料。

## 9. 自动处理审核队列

100 个以上 PR 时，在受信任的维护者主机运行队列 worker。它不部署在
`pull_request_target`，不会执行投稿分支代码，也不会把模型密钥暴露给 fork PR：

```bash
export OPENAI_API_KEY="..."
export HAIDIAN_REVIEW_MODEL="gpt-5.6-sol"

# 先评审并生成审计材料，不修改 GitHub
python3 scripts/auto_review_queue.py --limit 10

# 正式回写 review/label；通过 60 分门槛和四项 gate 的 PR 自动合并
python3 scripts/auto_review_queue.py --limit 10 --concurrency 3 --apply --admin-merge
```

固定顺序为：required CI → 单一作者目录 → 固定 head SHA worktree → 本地四项 gate →
强制退件 → 多模态 100 分评审 → 决策前再次检查 head SHA/CI → review 与标签 →
合并前最后一次检查 head SHA/CI。低于 60 分标记 `review/low-quality`；CI 未成功的
PR 不调用模型；draft 不进入队列。合并仅表示仓库 intake，展示、精选、正式评分与
实施决定继续由 `gallery-publication.json` 的独立流程控制。
worker 每轮按 PR 编号从旧到新处理，避免持续新增投稿使早期稿件饥饿。
模型调用和本地视觉检查默认三路并行；worktree 创建/清理以及 GitHub review、标签、
SHA 复核和 merge 使用进程内锁串行执行，避免 Git 引用锁和 base-branch merge 竞态。

`submission-validation` 成功时会自动清除旧的 CI/修改/低质量标签并添加
`review/queued`；投稿人推送修订后无需维护者手动重新排队。CI 失败时 workflow
移除 queued 并添加 `review/ci-failed`，因此不会产生付费模型调用。

审计材料保存在 `.maintainer-review/queue/pr-<number>/<head-sha>/`，worktree 默认在
`.pr-worktree/auto-review/` 并在单稿完成后删除。建议用 launchd/systemd timer 每
5–10 分钟运行一次，并以进程锁保证同一时间只有一个 worker。执行账号应使用
fine-grained token 或 GitHub App，只授予本仓库 Contents/PR 所需权限；若 ruleset
限定管理员合并，则将该 App/账号加入 bypass list 后使用 `--admin-merge`。
