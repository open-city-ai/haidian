# 导出版专家评审包

`scripts/export_review_packet.py` 用于把一个或多个投稿整理成专家可离线阅读的评审包。它只读取仓库内静态文件，不执行投稿代码，不调用模型，也不改变投稿目录。

默认输出位于 `.maintainer-review/` 下，该目录被 Git 忽略。评审包不应提交到仓库，也不进入公开 portal。

## 输出内容

每次导出会生成：

- `review-packet.md`：适合复制、批注和归档的 Markdown 评审包。
- `review-packet.html`：打印友好的离线 HTML，包含投稿状态、风险、资料、指标、关键文件和完整方案正文。
- `packet-manifest.json`：记录导出脚本、输出文件和包内方案。
- `review-packet.pdf`：仅在使用 `--pdf` 且本机安装 `wkhtmltopdf` 或 Chromium 时生成。

## 单方案导出

```bash
python3 scripts/export_review_packet.py \
  submissions/<github-login>/<proposal-slug>
```

默认输出：

```text
.maintainer-review/<proposal-slug>/review-packet/
```

## 多方案导出

```bash
python3 scripts/export_review_packet.py \
  submissions/alice/proposal-a \
  submissions/bob/proposal-b \
  --out .maintainer-review/review-packets/shortlist
```

导出全部已合并投稿：

```bash
python3 scripts/export_review_packet.py --all
```

## PDF 导出

PDF 不是 required CI 依赖。需要 PDF 时显式加 `--pdf`：

```bash
python3 scripts/export_review_packet.py \
  submissions/<github-login>/<proposal-slug> \
  --pdf
```

脚本会优先尝试 `wkhtmltopdf`，再尝试 Chromium/Chrome headless。若本机没有可用 PDF 引擎，脚本会返回错误；去掉 `--pdf` 仍可生成 Markdown 和 HTML。

## 阅读结构

评审包按以下顺序组织，避免专家先被长正文淹没：

1. 包内方案索引。
2. 快速判断：路径、作者、状态、版本、是否可进入正式评分。
3. 风险与待补条件：`risk.json`、`assumptions.json`、已知阻断项。
4. 自检与证据链：`self_check.json`、`sources.json`、`metrics.json`。
5. 离线材料索引：报告 HTML、视觉 HTML、A3/A0 图纸、矩阵文件。
6. 完整方案正文。

维护者可以把 HTML 或 PDF 发给专家离线阅读；如需反馈投稿者，仍应整理成 PR comment，而不是提交评审包。
