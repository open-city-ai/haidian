# 维护者审核流程

本流程用于审核参赛者通过 Pull Request 提交的 formal 方案包。required CI 只做安全、路径、格式和机器可读性校验；维护者本地审核负责 intake 决策、正式评分就绪判断和展示索引更新。

## 1. Checkout PR

先查看 PR diff，确认没有明显修改仓库基础设施、workflow、脚本或他人投稿目录。普通参赛者 PR 应只修改：

```text
submissions/<github-login>/<proposal-slug>/
```

参赛者不应修改 `submissions-data.js`。该文件由维护者在合并后生成。

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

## 4. 复制 PR 评论

把命令输出复制到 PR comment。maintainer review 的可见结果只在 PR comment 中展示，不进入 `submissions-data.js`、方案卡片或公开展示页。按建议状态处理：

- `request-changes`：要求参赛者修复后再审。
- `intake-provisional`：可合并展示和讨论，但不可进入正式专业评分。
- `formal-review-ready`：可进入正式专业评分。
- `reject`：触发强制拒绝条件，关闭或拒绝 PR。

`intake-provisional` 不是低质量通行证；它只表示结构化包、可读正文、HTML、拓扑和证据链基本可审，但官方 boundary/key areas 或其他正式评分条件仍未满足。

## 4A. 上线前模拟 PR 审核

公开前或大改审核流程后，维护者可用仓库内 provisional 样例模拟一次 PR 审核。预期建议状态必须是 `intake-provisional`，说明方案可展示讨论但不可正式专业评分：

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

若输出不是 `Recommendation: **intake-provisional**`，或 `prelaunch_check.py` 失败，应先修复审核逻辑、展示索引或公开文档，不要发布新的投稿入口。

## 5. 合并后更新展示索引

合并 PR 后，在主分支运行：

```bash
python3 scripts/generate_submissions_data.py
python3 scripts/generate_submissions_data.py --check
```

确认 `submissions-data.js` 已更新后，再提交展示索引变更。该提交应由维护者完成，不要求参赛者在 PR 中提供。

提交展示索引时，只提交 `submissions-data.js` 等展示页必要变更，不提交 `.maintainer-review/`、`docs/reviews/` 或任何 review packet。

## 6. 正式专业评分

只有 `maintainer_review.py` 返回 `formal-review-ready` 后，才运行正式评分表生成器：

```bash
python3 scripts/generate_formal_scorecard.py \
  submissions/<github-login>/<proposal-slug> \
  --pr-author <github-login>
```

该命令会复跑维护者 gate，并在 `.maintainer-review/<proposal-slug>/formal-scorecard/` 生成 `formal-scorecard.json` 和 `formal-scorecard-comment.md`。如果方案仍是 `intake-provisional`、`request-changes` 或 `reject`，命令会返回非零并把 `scoring_status` 标为 `blocked`，不得填写正式分数。

正式评分表使用 `brief/site-package/schemas/formal_scorecard.schema.json`，七维度按 0-5 分填写并折算为 100 分。评分 JSON、专家分歧和中间材料不提交到仓库；如需反馈参赛者，只复制最终整理后的 PR comment。

## 7. 可选人工/模型评审

`review-input.json` 和 `review-prompt.md` 可在本地交给独立专业评审或外部模型生成七维度评审意见。输出必须符合 `brief/site-package/schemas/advisory_review.schema.json`，其中 `pr_comment_markdown` 是唯一面向参赛者的可见文本。仓库 CI 不配置模型密钥，也不在 untrusted PR 中调用模型；评审意见如需反馈参赛者，仍只复制到 PR comment，不进入公开展示页。
