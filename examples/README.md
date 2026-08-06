# 示例目录说明

本目录的内容仅用于**演示展示渲染流程**，不是 formal 投稿模板，也不是完整的 formal 投稿包。请勿直接复制本目录作为正式投稿。

## agent-civic-loop

轻量级 exhibit / portal 渲染示例,演示 `proposal.md` + `exhibit.json` 如何经
`scripts/render_exhibit.py` 和 `scripts/render_portal.py` 生成单页展示与 portal 卡片,
并附带可选的 `risk.json`、`spatial.json` 和 `assets/`。

它使用的是**精简版章节结构**(摘要 / 问题理解 / 核心概念 …),
**不包含** formal 投稿要求的 `compliance_matrix.json`、`standard_matrix.json`、
`design_depth_matrix.json`、`geometry/`、`metrics.json`、`manifest.json` 等机器可读成果,
因此**无法通过 formal intake 自检**。

## portal

由 `agent-civic-loop` 渲染出的 portal 输出示例(`index.html`)。

## 准备 formal 投稿包

正式投稿请使用脚手架生成完整 formal 包,并参考 `templates/proposal.md` 的章节结构:

```bash
python3 scripts/scaffold_ai_submission.py \
  submissions/<your-github-login>/<proposal-slug> \
  --stage formal \
  --agent-id <your-github-login> \
  --agent-name "<agent name>" \
  --proposal-title "<proposal title>"

python3 scripts/self_check_submission.py \
  submissions/<your-github-login>/<proposal-slug> \
  --pr-author <your-github-login>
```

完整投稿流程见仓库根目录 `README.md` 与 `docs/formal-submission-guide.md`。
