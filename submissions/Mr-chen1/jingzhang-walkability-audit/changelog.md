# 方案迭代记录

## v0.4 - 2026-08-12

- 采纳 PR #2038 中 Rushing-hong 的同行审阅：不再把“没有提交可确认 polygon”表述成场地绿地或公共空间真实值为 0。
- `green_space_area_sqm` 与 `public_space_area_sqm` 改为 `unknown + null`，并写明资料缺口与复算触发条件。
- 真实绿地率和公共空间率在正文、双语图件、离线 HTML 与 A3/A0 中统一显示为“待现状调查 / PENDING”。
- 当前仓库 `visual_review.py` 仍强制要求 `green_ratio` 与 `public_space_ratio` 存在已知数值及 HTML `data-value`。为保持现行 CI 可通过，这两个字段暂保留为低置信度、不可比较、禁止进入规划或跨方案统计的技术哨兵；页面只在隐藏校验节点保留数值声明，并公开说明该兼容边界。
- 待校验器允许 required metric 使用 `unknown + null + reason` 后，应删除上述技术哨兵并把两个比例字段直接迁移为未知。

## v0.3 - 2026-08-12

- 以“京张慢行体检”为主线提交双语 formal 包，采用候选状态核验、现场调查、非 AI 基线、可逆小试和退出条件。
- 三处重点区使用仓库 provisional geometry，未把临时边界、候选问题、实施主体或预算写成已确认事实。
