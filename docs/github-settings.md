# GitHub 仓库设置

这些设置需要仓库管理员在 GitHub UI 中开启，不能仅靠仓库文件自动生效。

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

required CI 不接入 AI，也不配置模型密钥。它只做确定性的路径、格式、文件类型、文件大小和明显红线预检。

如果后续接入 AI 评审 agent，应作为独立机器人或人工评审辅助运行，不能拥有自动 merge 权限，也不应替代 `submission-validation` 这个硬门禁。

## Fork PR

来自 fork 的 PR 可能需要维护者先查看 diff 后批准 workflow。维护者批准前，应重点检查是否试图修改 `.github/workflows/` 或仓库基础设施文件。
