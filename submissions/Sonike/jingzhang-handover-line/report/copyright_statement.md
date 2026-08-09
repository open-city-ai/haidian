# 版权、来源与生成声明 / Copyright, Sources and Generation Statement

本方案文字、命名、Logo方向、图形符号、地图表达、版式、GeoJSON设计图层、离线HTML和PDF均为本次投稿原创，或由 `sources.json` 登记且允许使用的仓库公开/清权资料程序化派生。提交者为 Sonike；Codex（GPT-5）负责本轮审计、结构化数据、确定性制图与校验，用户操作的 Claude Opus 5 参与此前多轮方案编辑。不同轮次的智能体协作均不替代人类评审与专业团队的最终判断。

全部中英文对应图均由提交几何、`metrics.json` 与本方案数据在本地确定性渲染，没有使用外部底图、遥感截图、摄影、人物肖像、企业Logo、第三方插画、远程字体、CDN、地图瓦片或生成式图像素材。A3图册和A0展板只嵌入上述原创图件与本方案文字。

v1.6 新增的 `visual/assets/governance/shift-ledger.schema.json` 为本方案原创的 JSON Schema Draft 2020-12 机器契约；`example-scn05-shift-ledger.json` 是合成、未执行且角色未授权的沙盒结构样例，不含个人数据，也不连接真实导航、政务、维护或告警服务。`validation-report.json` 仅记录 Schema 元模式与样例结构校验，不能据此声称路线、性能、安全、无障碍质量、法律合规、公众接受度或现场运行已经验证。

v1.6 引用的三部法律法规与政策文件（《生成式人工智能服务管理暂行办法》《中华人民共和国无障碍环境建设法》、国办发〔2020〕45号）均为国家机关依法公开发布的文本。本包只引用条款要义并标注条号与施行日期，不复制全文、不再分发附件，也不构成法律意见；条款适用与个案认定由主管部门和具备资质的法律专业人员负责。海淀区2025年国民经济和社会发展统计公报为区级政府网站公开发布的 HTML 页面，未见明确开放数据许可，因此本包只摘录事实数值并保留发布者、标题与原始链接，不复制页面全文；每项数值的原文表述、采集方法、单位换算与可用/不可用边界逐条记录在 `sources.json`。

**关于一次已撤回的生成式图像。** v1.6.2 与 v1.6.3 曾在 `assets/figures/handover-scene.jpg` 放入一张由 gpt-image-2 生成的概念表现图并逐项披露。自 v1.6.4 起该资产已撤回：同名文件的内容已整体替换为本方案程序化绘制的《交接断面》图件（PIL，1600×1000，与其余图件同一色板与版式规则），包内不再包含任何生成式图像素材，上一段的声明对当前包成立。文件路径之所以保留而非删除，是因为参赛者 PR 目前无法删除文件——`scripts/github_pr_validation.py` 的 `validation_paths_for()` 仅对维护者豁免 `status == "removed"`，被删路径仍进入校验清单却不会下载到 PR 工作区，确定性校验必然报缺文件。该限制已提 Issue #647，修复 PR #668 / #671 尚未合并；合并后本包将删除该路径。

六个国际案例只根据机构官网或城市官方报告转述组织机制；未复制网页文字长段、照片、地图、商标、品牌视觉或受保护图表。案例URL、发布者、检索日期、用途和局限均记录在 `sources.json`。京张铁路与中关村文化叙事采用概念性公共叙事，不主张未核实历史细节。

场地与重点区域采用仓库 `provisional_boundaries.geojson`，明确保留 `official_boundary=false`、`provisional_constraint` 和低置信度；它们不构成官方红线、法定规划、权属或工程依据。官方几何和专业条件可用后，全部派生图层、指标、图件与图纸应重新生成。

本包授权标识为 `COMMUNITY-DISPLAY-ONLY`，用于本次开源征集的公共展示、评审和知识沉淀。任何第三方进一步使用应遵守上游仓库规则、逐项核验来源权利，并不得把概念建议表述为政府批准、专业审定或实施承诺。

---

All text, naming, identity direction, diagrams, map language, layouts, design GeoJSON, offline HTML and PDFs are original to this submission or programmatically derived from public/cleared repository inputs registered in `sources.json`. Sonike submits the work; Codex (GPT-5) carried out the current audit, structured-data authoring, deterministic graphics and validation, while user-operated Claude Opus 5 contributed to earlier editing rounds. All bilingual figures use no remote map, photography, portrait, company mark, third-party illustration, remote font, CDN, tile service or generative-image asset. Human and professional review retains final judgment.

The v1.6 `visual/assets/governance/shift-ledger.schema.json` is an original Draft 2020-12 JSON Schema data contract. `example-scn05-shift-ledger.json` is a synthetic, unexecuted and unauthorised-role sandbox fixture containing no personal data and touching no live navigation, government, maintenance or alert service. `validation-report.json` records schema and instance conformance only; it is not evidence of route quality, performance, safety, accessibility, legal compliance, public acceptance or field operation.

The three statutory and policy instruments cited in v1.6 (the Interim Measures for the Management of Generative AI Services, the Law on the Construction of a Barrier-Free Environment, and State Council General Office Document No. 45 of 2020) are texts published by state organs under law. This package cites the substance of specific articles with article numbers and commencement dates; it reproduces no full text, redistributes no attachment, and offers no legal opinion — application of any provision rests with the competent authorities and qualified legal professionals. The Haidian District 2025 Statistical Communiqué is a public HTML page on a district government site with no explicit open-data licence found, so this package extracts factual values only while preserving publisher, title and original link, and reproduces no page text; the original wording, collection method, unit conversion and usable / not-usable boundary of every value are recorded item by item in `sources.json`.

**On one withdrawn generative image.** v1.6.2 and v1.6.3 placed a gpt-image-2 concept rendering at `assets/figures/handover-scene.jpg` with itemised disclosure. From v1.6.4 that asset is withdrawn: the content of that same path has been wholly replaced by an original programmatically drawn section figure (PIL, 1600×1000, sharing the palette and layout rules of the rest of the set), so the package again contains no generative-image asset and the statement above holds for the current package. The path is retained rather than deleted because a participant pull request currently cannot delete a file — `validation_paths_for()` in `scripts/github_pr_validation.py` exempts `status == "removed"` only for maintainers, so a removed path stays in the validation list while never being downloaded into the PR worktree and deterministic validation reports a missing file. Raised as issue #647; fix PRs #668 / #671 are not yet merged, and the path will be deleted once they are.

The six global cases are paraphrased from institutional pages or official city material; no protected image, map, trademark, branded layout or long passage is reproduced. The provisional site and key-area geometry explicitly remain non-official. This package is marked `COMMUNITY-DISPLAY-ONLY` for open-call review, public display and knowledge capture; it must not be represented as statutory approval or a professional implementation decision.
