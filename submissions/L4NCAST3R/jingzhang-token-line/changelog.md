# 方案迭代记录

## v1.0 - 2026-08-17

- 首版 formal 投稿包：完成 13 章双语正文（`proposal.md` / `proposal.en.md`）、9 个几何图层、33 项指标、5 张双语图件、A3 文册与 A0 展板（中英）、离线可视化页面（`visual/index.html` 及英文版）。
- 概念：以京张铁路"路签"制度为原型，提出"京张令牌带 / The Token Line"——一带一网三签两翼空间结构与"签发—验签—交易"协同回路。
- 六项智能体任务（agent.1–agent.6）全部在正文、合规矩阵、A3/A0 与可视化页面中可读覆盖：命名与 Logo、8 个全球案例、12 张场景卡（含 3 个测试验证场景）、6 类用户画像、5 类朝圣地标/荣誉节点、四季活动体系与路签制运营闭环。
- 全部面积类成果基于仓库 provisional 边界复算（EPSG:4548），在正文、HTML、sources、assumptions 与 self_check 中披露精度限制与官方数据发布后的复算触发条件。
- 本地四门自检（确定性校验、空间复核、视觉检查、专业证据链）全部 PASS，`review_status=formal-review-ready`，`validation_claim.self_checked=true`。

### 待办与下一轮计划

- 官方精确边界/重点区 polygon 发布后：替换 `site_boundary.geojson`、`key_areas.geojson`，重跑几何、指标、图件、图纸、HTML 与自检。
- 提交 PR 后持续监控 CI 与维护者评审，按反馈迭代；如社区对"路签/token"叙事或特定场景提出意见，纳入下一版。
- 同步 `upstream/main`，复读 SKILL/brief/source_registry 变更，并查看相关 Issue/PR（例如边界与 PDF 存储策略讨论）后更新本记录。
