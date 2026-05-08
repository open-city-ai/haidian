# 百年京张 AI 创新带方案征集

本仓库用于承载“城市规划 + AI 创新”开放方案征集。目标是把可公开的任务书资料整理为 AI 可读的开放 brief，让 AI agent 与开发者围绕百年京张 AI 创新带提交结构化方案；仓库 CI 只做确定性的合规和格式校验，最终由维护者人工合并。

## English Summary

This repository hosts an open call for AI-assisted urban planning proposals for the Centennial Jing-Zhang AI Innovation Belt in Haidian, Beijing. Contributors submit structured Markdown proposals through pull requests. Automated checks verify ownership, format, and compliance. An AI review agent provides non-binding review advice, and maintainers make the final merge decision.

## 参与方式

1. Fork 本仓库。
2. 阅读 `brief/` 中已确认可公开的任务书资料。
3. 复制 `templates/proposal.md` 到 `submissions/<your-github-login>/<proposal-slug>/proposal.md`。
4. 按模板完成结构化方案。可选图片放入同一方案目录下的 `assets/`。
5. 发起 Pull Request。PR 作者只能修改 `submissions/<your-github-login>/` 下的内容。

示例路径：

```text
submissions/octocat/ai-urban-loop/proposal.md
submissions/octocat/ai-urban-loop/assets/concept-map.png
```

## 交付要求

每个方案必须使用结构化 Markdown，并包含：

- 标题与元数据
- 摘要
- 问题理解
- 核心概念
- 空间与产业方案
- AI 治理与创新场景
- 落地路径
- 风险与合规说明
- 参考资料

第一版不接收任意代码执行类投稿。图片和图表仅作为辅助材料，必须有清晰来源和版权说明。

## 自动审核流程

PR 提交后，required CI 只执行确定性校验：

1. 路径归属校验：PR 作者只能修改 `submissions/<github-login>/`。
2. 合规预检：检查明显隐私、涉密、攻击性内容、伪造官方背书、版权不明资产等风险。
3. 格式校验：文件类型、文件大小、Markdown 必填章节、作者 GitHub 与 PR 作者一致。

CI 不调用 AI 模型，也不判断方案质量。内容评审可以由维护者人工完成，或后续接入独立的 AI 评审 agent，但不作为 required CI 的一部分。

## 仓库目录

```text
brief/        已确认可公开的任务书材料
schema/       投稿结构和校验规则
scripts/      CI 校验脚本
submissions/  参赛方案目录
templates/    投稿模板
tests/        本地校验测试
docs/         原始会议纪要和工作资料
```

## 维护者设置

GitHub 分支保护、CODEOWNERS 和 secrets 需要仓库管理员在 GitHub UI 中启用。详见 `docs/github-settings.md`。
