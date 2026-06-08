## 投稿信息

- GitHub 用户名：
- 方案路径：`submissions/<github-login>/<proposal-slug>/`
- 方案标题：
- 提交级别：`formal`

## Intake 成果清单（必填）

- [ ] `proposal.md` 使用中文书写，覆盖 formal 必填章节
- [ ] `manifest.json` 中 `submission_stage` 为 `formal`
- [ ] 已提交 `agent.json`、`metrics.json`、`assumptions.json`、`sources.json`、`self_check.json`
- [ ] 已提交 `compliance_matrix.json`，覆盖公告 1.3、1.4、1.5 和 `agent_taskbook.json` 的 `agent.1`-`agent.6` 必选任务
- [ ] 已提交 `standard_matrix.json`，说明专业标准、图纸、图层、指标、来源和自检证据
- [ ] 已提交 `design_depth_matrix.json`，核心成果深度项均为 `complete`
- [ ] `proposal.md` 是唯一主体方案文本，并使用 `[source:...]`、`[standard:...]`、`[depth:...]`、`[data:...]`、`[metric:...]` 引用证据
- [ ] `proposal.md` 可读展开了命名/Logo、5-8 个生态案例、10 张以上场景卡、3 个以上测试验证场景、5 类以上用户画像、3 个以上朝圣地标、文化叙事和长期运营机制
- [ ] 已运行 `scripts/render_proposal_html.py`，并提交 `report/proposal.html` 作为离线阅读版
- [ ] 已提交 `geometry/site_boundary.geojson`；如使用 provisional 边界，已在正文、HTML、sources、assumptions 和 self-check 中说明不可进入正式专业评分
- [ ] 已提交 `geometry/key_areas.geojson`，覆盖三处重点详细设计区域
- [ ] 已提交核心设计图层：用地、建筑、道路、绿地、公共空间、约束、分期
- [ ] 已提交 `report/copyright_statement.md`；`report/narrative.md` 如有提交仅作为派生摘要，不替代 `proposal.md`
- [ ] 已提交 `drawings/a3-booklet.pdf` 和 `drawings/a0-boards.pdf`
- [ ] 已提交可离线打开的 `visual/index.html`
- [ ] 如使用外部视觉生成 skill，已参考 `docs/visual-style-recommendations.md`，并在来源/版权说明中记录工具与资产来源
- [ ] 若使用 provisional boundary/key areas，已在正文、HTML、sources、assumptions 和 self-check 中醒目标注“可进入 intake 展示/讨论，但不可进入正式专业评分”

## Formal scoring readiness（可选，未满足也可作为 intake 提交）

- [ ] `geometry/site_boundary.geojson` 使用可信 official boundary，且 `official_boundary=true`
- [ ] `geometry/key_areas.geojson` 使用三处可信 official key-area polygons，且 `official_boundary=true`
- [ ] `manifest.validation_claim.known_blockers` 为空
- [ ] `self_check_submission.py` 输出 `can_enter_formal_review=true`
- [ ] 没有 blocking self-check、空间复核、视觉复核或专业证据链缺口

## 原创与版权声明

- [ ] 方案为本人/本团队原创或已获得授权
- [ ] 图片、图表、数据、代码和 HTML 资产均有来源或版权说明
- [ ] 未提交涉密、内部、个人隐私或非公开空间数据
- [ ] 未伪造官方背书、审批结论、控规结论或实施承诺
- [ ] 空间落地、活动运营、品牌传播和政策机制均写成概念建议、参考方案或可供专业团队深化研究
- [ ] HTML 页面不依赖 CDN、远程地图瓦片、外部脚本、外部字体、API 请求、iframe 或表单提交

## 变更范围

- [ ] 本 PR 只修改 `submissions/<my-github-login>/` 下的内容
- [ ] 本 PR 不修改 `submissions-data.js`；展示索引由维护者合并后生成
- [ ] 本 PR 不修改 `.github/`、`brief/`、`schema/`、`scripts/`、`README.md` 或他人方案目录

## 简要说明

请用 3-5 句话说明你的方案核心、官方边界来源、三处重点区域设计主张和 AI 场景。

## 本地自检

提交前必须运行：

```bash
python3 -m pip install -r requirements-review.txt
python3 scripts/render_proposal_html.py submissions/<my-github-login>/<proposal-slug>
python3 scripts/self_check_submission.py submissions/<my-github-login>/<proposal-slug> --pr-author <my-github-login>
```

- [ ] 一键自检 `self_check_submission.py` 已通过
- [ ] deterministic validation、spatial review、visual review、professional evidence review 均为 PASS
- [ ] 已记录自检结论；如 `can_enter_formal_review=false`，本 PR 仅申请 intake 展示/讨论，不申请正式专业评分
