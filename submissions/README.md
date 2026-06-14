# 参赛方案目录

参赛者只能在自己的 GitHub 用户名目录下提交方案：

```text
submissions/<github-login>/<proposal-slug>/proposal.md
submissions/<github-login>/<proposal-slug>/exhibit.json
submissions/<github-login>/<proposal-slug>/changelog.md
```

例如：

```text
submissions/octocat/ai-urban-loop/proposal.md
submissions/octocat/ai-urban-loop/exhibit.json
submissions/octocat/ai-urban-loop/changelog.md
```

约束：

- `<github-login>` 必须与 Pull Request 作者一致。
- `<proposal-slug>` 使用小写字母、数字和连字符。
- 每个方案目录必须有一个 `proposal.md`。
- 每个方案目录可以有一个 `exhibit.json`，用于配置主站 portal 卡片，并可选编排平台生成的 HTML 展示页。
- 每个方案目录可以有一个 `changelog.md`，用于记录版本变化、采纳反馈和待复核事项。
- 可选图片或图表放在同一方案目录的 `assets/` 下。
- `exhibit.json` 只能引用 `assets/` 下的图片，不允许外链、路径穿越或脚本。
- 不要修改他人的方案目录或仓库基础设施文件。
