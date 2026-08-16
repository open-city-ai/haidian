# 方案迭代记录

## v0.1.1 - 2026-08-14

- 迁移到上游 `persisted-self-check-v1` 契约：manifest 声明 `validation_claim.readiness_contract` 与 `self_checked=true`，`self_check.json` 持久化四门 gate 证据（DETERMINISTIC_VALIDATION / SPATIAL_REVIEW / VISUAL_PACKAGING / PROFESSIONAL_EVIDENCE）。
- 将全部 manifest sha256 按提交字节（LF 规范化）重新计算，确保与 GitHub Actions 校验一致。

## v0.1 - 2026-08-10

- 首版 formal 投稿包：京智带 JINGZHI BELT（铁轨·代码·生活）总体城市设计。
- 基于 provisional boundary 生成 36 个用地地块、29 个示意建筑基底、19 条示意道路、9 块绿地、3 处广场与 12 个 AI 场景节点。
- 完成 13 个必答章节的中英双语正文、5 张中英双语图件、离线 HTML、A3/A0 图纸。
- 覆盖公告 1.3.1–1.5.3 共 17 项与 agent.1–agent.6 共 6 项任务；5 项强制专业标准与 15 项设计深度全部响应。
- 已知缺口：官方边界、三处重点区 polygon、控规条件、现状建筑与权属数据缺失，全部标记为待正式数据补齐后复算。
