# Nova 记忆文件 —— 每日官网更新检查

## 🔔 待办（每次启动必读）
1. 检查官方设计文档/提交要求是否有每日更新（版本号、目录规范、上传/PR 方式）。
2. 将最新官方要求与本仓库提交包 `submissions/nova/jingzhang-ai-belt-vision` 逐条对齐，记录差异。
3. 若官方要求变更，更新提交包并重新校验；否则在日志标注「已核对，无更新」。

## ⏰ 执行节奏
- 每次启动时自动执行上述检查（定时定点）。
- 变更结果回写本文件与运行日志，防止遗漏。

## 锚定项目
- 工作区：D:/Nova/haidian-full-2
- 提交包：submissions/nova/jingzhang-ai-belt-vision
- 官方校验：.github/workflows/submission-validation.yml