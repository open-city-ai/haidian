## 投稿信息

> 百年京张 AI 创新带城市设计开源征集由海淀主导，已于北京时间 2026年8月7日开放；8月31日截止，9月开始落地。

- GitHub 用户名：
- 方案路径：`submissions/<github-login>/<proposal-slug>/`
- 方案标题：
- 提交级别：`formal`

## Intake 成果清单（必填）

- [ ] **要求双语言：** `proposal.md` 已设置 `bilingual_contract_version: "1"` 和 `translation_file`，并附 `proposal.en.md` 或 `proposal.zh.md` 完整译稿；缺失时 CI 会阻断合并
- [ ] HTML、A3/A0 和含文字图件已提供对应语言副本，章节、主张、指标、证据和图件位置保持一致，翻译优先采用 `docs/terminology-glossary.md` 推荐译法
- [ ] `manifest.json` 中 `package_type` 为 `professional_design_package`、`package_state` 为 `ready_for_review`（`submission_stage` 仅为旧版兼容）
- [ ] 已提交 `agent.json`、`metrics.json`、`assumptions.json`、`sources.json`、`self_check.json`
- [ ] 已提交 `compliance_matrix.json`，覆盖公告 1.3、1.4、1.5 和 `agent_taskbook.json` 的 `agent.1`-`agent.6` 必选任务
- [ ] 已提交 `standard_matrix.json`，说明专业标准、图纸、图层、指标、来源和自检证据
- [ ] 已提交 `design_depth_matrix.json`，核心成果深度项均为 `complete`
- [ ] `proposal.md` 是主语言主体方案，语言副本保持等义，并使用 `[source:...]`、`[standard:...]`、`[depth:...]`、`[data:...]`、`[metric:...]` 引用证据
- [ ] `proposal.md` 可读展开了命名/Logo、5-8 个生态案例、10 张以上场景卡、3 个以上测试验证场景、5 类以上用户画像、3 个以上朝圣地标、文化叙事和长期运营机制
- [ ] 已运行 `scripts/render_proposal_html.py`，并提交 `report/proposal.html` 作为离线阅读版
- [ ] 已替换 scaffold 正文、设计图层、五张图和 A3/A0 占位文件，移除 `SCAFFOLD-DRAFT`，并运行 `scripts/finalize_submission.py`
- [ ] 已提交 `geometry/site_boundary.geojson`；如使用 provisional 边界，已说明其不是官方红线或精确面积依据，并列出正式数据发布后的复算项
- [ ] 已提交 `geometry/key_areas.geojson`，覆盖三处重点详细设计区域
- [ ] 已提交核心设计图层：用地、建筑、道路、绿地、公共空间、约束、分期
- [ ] 已提交 `report/copyright_statement.md`；`report/narrative.md` 如有提交仅作为派生摘要，不替代 `proposal.md`
- [ ] 已提交 `drawings/a3-booklet.pdf` 和 `drawings/a0-boards.pdf`
- [ ] 已提交可离线打开的 `visual/index.html`
- [ ] 如使用外部视觉生成 skill，已参考 `docs/visual-style-recommendations.md`，并在来源/版权说明中记录工具与资产来源
- [ ] 若使用 provisional boundary/key areas，已醒目标注精度限制；我理解组织方数据缺口不会单独阻断内容评分或导致扣分

## Formal scoring readiness（可选，未满足也可作为 intake 提交）

- [ ] `geometry/site_boundary.geojson` 使用可信 official boundary，且 `official_boundary=true`
- [ ] `geometry/key_areas.geojson` 使用三处可信 official key-area polygons，且 `official_boundary=true`
- [ ] `manifest.validation_claim.known_blockers` 为空
- [ ] `self_check_submission.py --mark-self-checked` 输出 `can_enter_formal_review=true`，并将 `manifest.validation_claim.readiness_contract` 写为 `persisted-self-check-v1`、`self_checked` 写为 `true`
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
- [ ] 本 PR 不修改 `gallery-publication.json` 或 `submissions-data.js`；已合并方案自动进入展示页，首页精选由维护者决定
- [ ] 本 PR 不修改 `.github/`、`brief/`、`schema/`、`scripts/`、`README.md` 或他人方案目录

## 简要说明

请用 3-5 句话说明你的方案核心、官方边界来源、三处重点区域设计主张和 AI 场景。

## 本地自检

提交前必须运行：

```bash
python3 -m pip install -r requirements-review.txt
python3 scripts/render_proposal_html.py submissions/<my-github-login>/<proposal-slug>
python3 scripts/finalize_submission.py submissions/<my-github-login>/<proposal-slug>
python3 scripts/self_check_submission.py submissions/<my-github-login>/<proposal-slug> --pr-author <my-github-login> --mark-self-checked --json
python3 scripts/participant_preflight.py submissions/<my-github-login>/<proposal-slug> --pr-author <my-github-login> --check-push
```

- [ ] 一键自检 `self_check_submission.py --mark-self-checked` 已通过
- [ ] 投稿预检 `participant_preflight.py --check-push` 已通过，目录归属、变更范围、文件大小和远程推送均无 blocker
- [ ] deterministic validation、spatial review、visual packaging check、professional evidence review 均为 PASS
- [ ] 已记录 `package_type` 与派生的 `review_status`，且未把包类型误写为评审决定

## 提交后跟进（必填）

- [ ] 我会持续监控本 PR 的 CI、评审评论和合并状态；上传完成不等于任务结束
- [ ] 如遇排队，会通过 GitHub 通知或定时复查继续跟进，不会用空评论催促或高频轮询
- [ ] 如检查失败或收到修改要求，会阅读完整反馈、修复、重跑本地自检、推送并继续监控，直至合并或明确记录外部 blocker
