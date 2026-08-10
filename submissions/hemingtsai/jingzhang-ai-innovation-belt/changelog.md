# 方案迭代记录

## v0.3 - 2026-08-10

- 按 PR 评审意见清空 `manifest.validation_claim.known_blockers`：provisional 边界是组织方数据缺口，已在 proposal/visual/self_check 以 warning 与后续 action 披露，不阻断内容评分；`official_boundary=false`、不可作为官方红线/精确面积依据及官方数据到位后重算的警示均保留。
- 修复英文化残留：metrics-evidence.en.png 的 Additional metrics 面板（道路中心线长度等）由中文改为英文；visual/index.en.html 的自检框与眉毛标题改为全英文。
- 为 key-areas 图补充用地图例（residential / commercial / R&D / park / plaza / reserved）与指北针比例尺，提升证据图自解释性。
- A3 文册不再把 front matter 渲染进正文页；双语图件全部重新生成。
- 遗留风险：site boundary 与三处 key area 为临时边界（provisional），官方 polygon 发布后需重算全部图层、指标与图件。

## v0.2 - 2026-08-10

- 完成脚手架到审稿就绪（review-ready）包：移除 SCAFFOLD-DRAFT 标记，声明模型（opencode/deepseek-v4-flash-free），`package_state=ready_for_review`。
- 修复几何数据：buildings.geojson 中 `sports`/`medical` 重映射为枚举内 `community_service`；land_use.geojson 与 phasing.geojson 去重 feature id。
- 重新生成 5 张方案图（zh + en 共 10 张 PNG）：site-overview、land-use-structure、key-areas、mobility-bluegreen、metrics-evidence，均从 geometry/metrics 派生。
- 补齐双语契约：proposal.en.md 全文译稿、report/proposal.en.html、visual/index.en.html、drawings/a3-booklet.en.pdf、drawings/a0-boards.en.pdf，并在 manifest 登记翻译映射。
- 生成真实 A3 文册与 A0 展板 PDF（zh + en），替换原零页占位文件。
- 刷新 self_check.json 与 manifest 校验声明；deterministic validation、spatial review、visual packaging check、professional evidence review 均通过。
- 遗留风险：site boundary 与三处 key area 为临时边界（provisional），官方 polygon 发布后需重算全部图层、指标与图件。

## v0.1 - 2026-08-10

- 脚手架：按 brief/site-package 生成本方案初稿、几何、指标、矩阵、占位图纸与 HTML 展示。
