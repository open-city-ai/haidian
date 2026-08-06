# GitHub 仓库设置

这些设置需要仓库管理员在 GitHub UI 中开启，不能仅靠仓库文件自动生效。

## 公开前 checklist

- `main` 已开启 branch protection 或 ruleset。
- required status check 只要求 `submission-validation`；维护者本地 review 和 formal scorecard 不设为 required CI。
- `.github/CODEOWNERS` 指向真实维护团队，且维护团队有 write 权限。
- Actions 默认权限为 read-only；不允许 workflow 自动创建或批准 PR。
- fork PR 先人工查看 diff，再允许 `pull_request_target` workflow 读取 inert PR 文件。
- 普通参赛者 PR 只允许修改 `submissions/<github-login>/<proposal-slug>/`。
- 维护者审核结果只复制到 PR comment，不提交 `.maintainer-review/`、`docs/reviews/` 或 review packet。
- 合并后由维护者先在 `gallery-publication.json` 分别批准公开展示和首页精选，再运行 `python3 scripts/generate_submissions_data.py` 和 `python3 scripts/generate_submissions_data.py --check` 更新展示索引。
- 发布前运行 `python3 scripts/prelaunch_check.py`，确认公开资料、文档、workflow 和展示索引闭环一致。

## 分支保护

对 `main` 开启 branch protection 或 ruleset：

- Require a pull request before merging
- Require status checks to pass before merging
- Require review from Code Owners
- Block force pushes
- Block branch deletions
- Dismiss stale approvals when new commits are pushed

必选状态检查：

- `submission-validation`

## CODEOWNERS

`.github/CODEOWNERS` 当前使用 `@waken` 作为占位维护者。正式发布前请替换为真实维护团队，例如：

```text
* @your-org/haidian-ai-maintainers
```

维护团队需要对仓库有 write 权限，否则 GitHub 不会请求 code owner review。

## Actions 权限

建议仓库 Actions 默认权限设置为只读：

- Workflow permissions: Read repository contents permission
- 勾选或按需开启：Allow GitHub Actions to create and approve pull requests 不需要开启

本仓库的 `submission-validation` workflow 使用 `pull_request_target`，只 checkout base branch 的受信任脚本，并通过 GitHub API 读取 PR 文件内容；不要在该 workflow 中 checkout 或执行 PR 分支代码。

## AI 评审边界

required CI 不接入 AI，也不配置模型密钥。它只做确定性的路径、格式、文件类型、文件大小、提交阶段语义、基础 GeoJSON 字段和明显红线预检。

可信空间复核和 AI 评审 agent 应作为独立机器人或人工评审辅助运行，不能拥有自动 merge 权限，也不应替代 `submission-validation` 这个硬门禁。维护者审核 PR 时按固定流程运行；完整 SOP 见 [maintainer-workflow.md](maintainer-workflow.md)。

```bash
python3 -m pip install -r requirements-review.txt
python3 scripts/maintainer_review.py submissions/<login>/<slug> --pr-author <login> --comment
```

`maintainer_review.py` 会顺序运行 deterministic validation、空间复核、视觉复核和专业证据链复核，并在本地忽略目录 `.maintainer-review/<slug>/` 下生成 `review-summary.json`、`maintainer-comment.md`、`review-input.json`、`review-prompt.md` 和 `advisory-review.md`。`--comment` 会把可复制到 PR 的评论打印到 stdout；maintainer review 结果不提交到仓库，也不进入公开展示页。可选七维度评审输出必须符合 `brief/site-package/schemas/advisory_review.schema.json`，并通过其中的 `pr_comment_markdown` 反馈给 PR。

建议状态含义：

- `request-changes`：要求参赛者修复后再审。
- `intake-provisional`：历史兼容状态；不得仅因组织方缺少 official geometry 使用该状态或阻断内容评分。
- `formal-review-ready`：可进入正式专业评分。
- `reject`：触发强制拒绝条件，关闭或拒绝 PR。

合并后，维护者先编辑 `gallery-publication.json`：`published` 控制全部方案页，`featured` 控制首页精选；未登记投稿不公开。人工审核后用 `scripts/generate_submissions_data.py --package-sha <submission-dir>` 生成 `reviewed_package_sha256`，将批准绑定到具体稿件版本；文件变化后必须重新审核。然后更新静态展示索引：

```bash
python3 scripts/generate_submissions_data.py
```

参赛者不应修改 `gallery-publication.json` 或 `submissions-data.js`。`self_check_submission.py` 是参赛 agent 和维护者共用的提交前证据包；`review_submission.py` 仍只生成模型输入和 prompt，不在 GitHub Actions 中调用模型。

正式评分同样只在本地执行。维护者仅在 `maintainer_review.py` 返回 `formal-review-ready` 后运行：

```bash
python3 scripts/generate_formal_scorecard.py submissions/<login>/<slug> --pr-author <login>
```

该工具生成符合 `brief/site-package/schemas/formal_scorecard.schema.json` 的本地评分表；评分材料不提交到仓库，也不进入公开展示页。

## Fork PR

来自 fork 的 PR 可能需要维护者先查看 diff 后批准 workflow。维护者批准前，应重点检查是否试图修改 `.github/workflows/` 或仓库基础设施文件。
