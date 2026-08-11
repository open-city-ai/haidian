# 方案迭代记录

## v0.3 - 2026-08-10

- 按 Issue #883/#869 口径持久化完整自检证据：`self_check.json` 顶层补 `ok`、`can_enter_formal_review`、`review_status`、`package_type`，`checks` 前置四条规范化记录（DETERMINISTIC_VALIDATION / SPATIAL_REVIEW / VISUAL_PACKAGING / PROFESSIONAL_EVIDENCE，均为 blocking+pass），旧式记录保留并重命名冲突项。
- 判定内容全部由 `scripts/self_check_submission.py --json` 实跑产出，非手写断言；manifest 中 `self_check.json` 的 SHA-256 已同步刷新。
- 修复后 deterministic validate、四门 self-check、participant preflight 均 PASS，无自锁。

## v0.2 - 2026-08-10

- 将脚手架替换为“京张折返共生线 / TURNBACK COMMONS”完整 formal 概念包。
- 新增共享切线用地分区、建筑接口、慢行与接驳网络、蓝绿公共空间、公共房间、分期和场景节点，并从同一组几何复算指标。
- 补充 5 个公开 AI 生态案例、6 类用户画像、12 张场景卡、3 个产业测试验证场景和 3 个概念 AI 朝圣地标。
- 按 Issue #1029 保留大钟寺临时几何，不自行平移；按 Issue #1119 以署名方式借鉴可选折返治理逻辑。
- 完成中文主稿、英文译稿、双语离线报告、双语视觉页、双语图件和多页 A3/A0 PDF，并通过 deterministic、spatial、visual 和 professional self-check。

## 后续待补

- 官方边界、重点区 polygon、控规、交通、权属、建筑、文保、市政和场景基线发布后，整包重算并重新审查。
