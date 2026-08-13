# 方案迭代记录 / Changelog

## v17.0 - 2026-08-13

**Site-grounded reading and editorial subtraction / 场地锚定阅读与表达减重**

- 新增 30 秒／3 分钟／15 分钟双语阅读漏斗，首屏先说明“公园已报告开放，本案只做不打断普通生活的可逆增量”，再展开双轨语法；完整证据仍保留在可展开的 15 分钟证据库中。
- Added a bilingual 30-second / 3-minute / 15-minute reading funnel. The first screen now states that the park is publicly reported open and the proposal addresses only reversible increments that do not interrupt ordinary life, before explaining the twin-track grammar; the full evidence remains available in the expandable 15-minute library.
- 把场地表达明确拆为三框：公开背景定位、仓库临时设计容器、方案设计关系。三者不得叠合成伪精确总图；既有 OSM 背景差异与 `PROV-KEY-003` 未锚定大钟寺站均保留为未裁决重算触发，本轮不平移 geometry。
- Split site representation into three explicit frames: published background orientation, the repository provisional design container, and proposal-defined design relationships. They must not be merged into a false-precision master map. The existing OSM background divergence and unanchored `PROV-KEY-003` remain unresolved recalculation triggers; this round does not shift geometry.
- 重绘五组中英文核心图：三框场地读取、36 概念单元的空间职责、三处不可互换换轨场、普通慢行与蓝绿维护净空、D01—D08 证据成熟度。每组同时保留 SVG 可编辑源与 1800×1100 PNG 展示导出。
- Redrew five bilingual core figure families: three-frame site reading, spatial duties of the 36 concept units, three non-interchangeable switchyards, ordinary mobility and blue-green maintenance clear zones, and D01–D08 evidence maturity. Each family retains editable SVG sources and 1800×1100 PNG display exports.
- 删除页首 V1/V2 版本复盘表和重复总图调用，统一 `Zhongzhiyuan`、一厅一人工台、公共任务经济及规划术语；评审主导航只显示六个高价值入口，其余合同进入可展开证据库。
- Removed the front-loaded V1/V2 retrospective table and a duplicate overview call, standardized `Zhongzhiyuan`, one hall plus one staffed desk, Public Mission Economy, and planning terms, and reduced the primary jury navigation to six high-value entries with the remaining contracts in an expandable evidence library.
- 修复无锚点打开时旧脚本自动写入 `#step-1`、跳过首屏的问题；主导航提前到 30 秒入口之后，新增中英文切换、键盘跳转、表格列语义和移动端图内横向阅读／等价三框文字卡片。以上是可访问性设计意图，不是认证。
- Fixed the legacy script that wrote `#step-1` and skipped the first view on unanchored loads. Primary navigation now follows the 30-second entry, with bilingual switching, keyboard skip, table-column semantics, and small-screen in-figure scrolling plus equivalent three-frame text cards. These are accessibility intentions, not certification.
- 将可见指标拆成包内对象计数、临时几何派生值和现实证据，移除会被误读为场地绩效的可见 HIGH；重建中英文 14 页 A3 和 8 页 A0，44 页全检为空白页 0、替换字形 0、越界文本块 0。最终投稿清单与逐文件权利台账目标同步为 134/134，独立清权仍为 0。
- Split visible metrics into package-object counts, provisional-geometry derivations, and reality evidence, removing visible HIGH labels that could be mistaken for site performance. Rebuilt 14-page A3 and 8-page A0 publications in both languages; all 44 pages have 0 blank pages, 0 replacement glyphs, and 0 out-of-page text blocks. The final manifest and file-rights ledger target 134/134 paths, while independent clearance remains 0.
- 新增 `A-SITE-READING-020` 与 `JZ-SITE-READING-R17` 结构化合同。12 场景、8 项目、3 重点区、36 概念用地单元、geometry、metrics、G0、NO-GO、现实结果 0 与 `not_fully_cleared` 均不变；图件、PDF、机器 PASS 或 PR 合并不构成现场、专业、规划、建设、运营或权利批准。
- Added the structured `A-SITE-READING-020` and `JZ-SITE-READING-R17` contracts. Twelve scenes, eight projects, three key areas, 36 concept land-use units, geometry, metrics, G0, NO-GO, zero real results, and `not_fully_cleared` remain unchanged. No figure, PDF, machine PASS, or PR merge creates site, professional, planning, construction, operating, or rights approval.
- 在 `JZ-SITE-READING-R17` 内固化 10 个 geometry／metrics 输入哈希、389 个唯一空间 ID、12／8／3 编号数量、44 页出版、双语浏览器、134 项清单／权利和 T02 回放的包级回归期望；该合同只阻止文件与表达倒退，不升级任何现实成熟度。
- Embedded package-level regression expectations in `JZ-SITE-READING-R17`: ten frozen geometry/metrics hashes; 389 unique spatial IDs; 12/8/3 identifier counts; 44 publication pages; bilingual browser behavior; 134 manifest/rights paths; and the T02 replay. This contract prevents file and presentation regressions only and upgrades no real-world maturity.

## v16.0 - 2026-08-13

**Jury-first convergence and trusted delivery migration / 评审收束与可信交付迁移**

- 将前台唯一身份收束为“双轨京张 / Twin-Track Jing-Zhang”，并把旧投稿名移出首屏；JZ-AIOS、G0—G3、证据门、权利边界仍为后台内核。页首元数据压缩为 3 条评审轨道和 6 个官方场景族，但 12 个结构化场景节点、8 个项目、3 个重点区及其编号全部保留。
- Converged the sole front-stage identity on Twin-Track Jing-Zhang and removed the legacy submission name from the first screen. JZ-AIOS, G0–G3, evidence gates and rights boundaries remain the back-stage kernel. Front-matter metadata is compressed to three review tracks and six official scenario families while all twelve structured scene nodes, eight projects, three key areas and identifiers remain intact.
- 新增用户启动、静音、48 秒的普通—验证—故障—恢复评审动态；无 JavaScript 时四张卡完整可读，减少动态时改为逐态按钮。动态不采集数据、不自动播放，也不构成现场事故、恢复时长、人员或运营证据。
- Added a user-started, silent 48-second ordinary–proof–failure–recovery review motion. All four cards remain complete without JavaScript, and reduced-motion mode advances discretely. It collects no data, never autoplays, and creates no field-incident, recovery-duration, staffing or operating evidence.
- 重建双语封面、14 页 A3 评审册和 8 张 A0 核心板：每个可见单元只承担一个判断，并在统一证据带中披露 12/12 文档覆盖、现场结果 0、GO/批准 0、G0、临时几何和 `not_fully_cleared`。长文 References 保持最后章节。
- Rebuilt the bilingual cover, fourteen-page A3 jury booklets and eight A0 core boards. Each visible unit carries one judgement and a shared evidence strip discloses 12/12 document coverage, zero field results, zero GO/approval, G0, provisional geometry and `not_fully_cleared`. References remain the final long-form section.
- 把 manifest 迁移到严格 0.2.x：非规范旧角色无损保存在 `role=other` + `role_detail`，旧翻译、校验、权利和发布声明移入带版本扩展；新增封面入口。迁移不改变权利阻断或现实成熟度。
- Migrated the manifest to strict 0.2.x: non-canonical legacy roles are preserved losslessly as `role=other` plus `role_detail`; legacy translation, validation, rights and release claims move into versioned extensions; the cover entry is added. Migration changes neither the rights gate nor real-world maturity.
- 现场采集、批准、GO、真实故障、恢复验收、人员、排班、预算、客流和逐文件独立清权仍为 0 或 unknown；临时边界与三项空间提示保持不变。
- Field collection, approvals, GO, real failures, restoration acceptances, staffing, rosters, budgets, footfall and independent file-level rights clearance remain 0 or unknown. Provisional boundaries and the three spatial notices remain unchanged.

## v15.0 - 2026-08-13

**Field evidence intake and replacement pack / 现场证据采集与替换包**

- 将既有 D01—D08 和 H01—H07 转成双语空白采集、保管链和专业处置合同；八包均为 `not_collected`、材料 0、现场值 `null`、接收用于复算 0、批准 0。模板完整不等于证据、批准或 G1 升级。
- Turned existing D01-D08 and H01-H07 into a bilingual empty collection, custody and professional-disposition contract. All eight packets remain `not_collected`, with 0 artifacts, `null` field values, 0 acceptances for recalculation and 0 approvals. Template completeness is not evidence, approval or a G1 upgrade.
- 新增三条不可互换的未来采集路：众智园核对设备隔离/停止/还场，原点核对同意撤回/居民日常/保障，大钟寺核对高峰连续/来源版本/纠错；完成走查均为 0。
- Added three non-interchangeable future routes: Zhongzhiyuan for equipment isolation/stop/restoration, Origin for consent withdrawal/daily life/safeguarding, and Dazhongsi for peak continuity/source version/correction. Completed route walks remain 0.
- #2266 只提供公众可读的保留/修改/暂停/归还处置方法，并被规范化到本包已有术语；未复制其品牌、空间构图、几何、指标、图件、媒体或现实结论。
- PR #2266 contributes public keep/modify/pause/return disposition method only, normalized into this package's existing vocabulary. No brand, spatial composition, geometry, metric, figure, media or real-world claim is copied.
- 追加当前态一致性审计：把正文、来源新鲜度策略和双语权利声明中的旧轮次计数统一为最终 125 个路径、50 条来源与 24 个 SVG；历史固定点仍作为带轮次标识的历史记录保留。
- Added a current-state consistency audit: synchronized stale round-era counts in the narrative, freshness policy and bilingual rights statement to the final 125 paths, 50 sources and 24 SVG files; explicitly versioned historical fixed points remain historical records.
- 12 场景、8 项目、3 重点区、99 槽、geometry、metrics、全部 G0、临时边界、NO-GO 和 `not_fully_cleared` 保持不变。
- Twelve scenes, eight projects, three key areas, 99 slots, geometry, metrics, all-G0 status, provisional boundaries, NO-GO and `not_fully_cleared` remain unchanged.

## v14.0 - 2026-08-13

**Accessible offline review walk and final convergence / 可访问离线评审漫游与终局收束**

- 新增双语五步离线评审入口与结构化路由合同，把双轨总纲、三种原型、普通非 AI 任务、故障恢复、D01—D08／H01—H07 专业交接压缩为一条可核查阅读路线；不新增机制或现实结论。
- Added a bilingual five-step offline review entry and structured route contract, compressing the twin-track master plan, three prototypes, ordinary non-AI task, failure/recovery and D01–D08/H01–H07 professional handoff into one auditable reading route without adding a mechanism or real-world conclusion.
- 核心内容不依赖 JavaScript；页面支持语义地标、跳转链接、可见焦点、原生 details、方向键/Home/End、减少动态和打印全展开。无账号、扫码、远程资源、表单、追踪、自动播放或 AI 依赖；这是可访问性意图，不声称认证。
- Core content requires no JavaScript; semantic landmarks, skip link, visible focus, native details, arrow/Home/End keys, reduced motion and print-all mode are provided. There is no account, QR, remote resource, form, tracker, autoplay or AI dependency; these are accessibility intentions, not certification.
- 第十四轮一致性审计保持一项核心概念、三处差异原型、12 场景、8 项目、3 重点区、99 槽、geometry、metrics、全部 G0、临时边界、NO-GO 与 `not_fully_cleared` 不变；文件或 PR 通过不构成审批、运营或权利许可。
- The fourteen-round consistency audit preserves one core concept, three differentiated prototypes, 12 scenes, 8 projects, 3 key areas, 99 slots, geometry, metrics, all-G0 status, provisional boundaries, NO-GO and `not_fully_cleared`; no file or PR PASS creates approval, operation or rights clearance.


> 本日志仅记录本投稿包的可追溯变化，不是审批、实施、现场测试、权利清除或 trusted CI 证明。每次内容变化后，均须从最终 Git blob 重新生成 manifest，并以绑定最终 PR head 的仓库验证为准。
>
> This log records traceable changes to this submission package only. It is not evidence of approval, implementation, field testing, rights clearance, or trusted CI. After any content change, regenerate the manifest from the final Git blobs and rely on repository validation attached to the final PR head.

## v13.0 - 2026-08-13

**Reversible assemblies and restoration / 可逆构件与恢复装配册**

- 新增三处不可机械复制的双语装配关系图与结构化登记：众智园为平行旁路—隔离—实体停止—恢复检查，原点为一街两院四个逐个撤回的无屏节点，大钟寺为四向通勤十字与旁侧来源纠错厅/双入口人工台。
- Added three non-copyable bilingual assembly relations and a structured register: Zhongzhiyuan parallel bypass/isolation/physical-stop/recovery check; Origin one street, two courts and four individually withdrawable screen-free nodes; Dazhongsi four-way commute cross with off-route source-correction hall and dual-entry staffed desk.
- 六阶段覆盖安装前、开放前、普通、停止隔离、拆除退场与恢复验收，逐项回链 D01—D08 和 H01—H07；专业团队可修改、拒绝或删除概念。
- Six stages cover before-install, pre-opening, ordinary use, stop/isolate, remove/exit, and restore/accept, with D01–D08 and H01–H07 backlinks; professionals may revise, reject or delete the concept.
- 类型、尺寸、材料、连接、专项核验、准确位置、安装方法和恢复时长均保持 unknown；现实安装、批准详图、责任接受、现场检查、拆除和恢复验收均为 0。
- Type, dimension, material, connection, specialist clearance, exact location, installation method and restoration duration remain unknown; real installations, approved details, accepted duties, inspections, removals and restoration acceptances remain 0.
- 12 场景、8 项目、3 重点区、99 槽、geometry、metrics、全部 G0、临时边界和 `not_fully_cleared` 不变；图件、PR 或合并不构成工程、场地或实施批准。
- Twelve scenes, eight projects, three key areas, 99 slots, geometry, metrics, all-G0 status, provisional boundaries and `not_fully_cleared` remain unchanged; drawings, PR review or merge create no engineering, site or implementation approval.

## v12.0 - 2026-08-13

**Ordinary-life spatial scenes / 普通生活空间场景册**

- 新增一张无文字、合成人尺度三联概念图：众智园普通旁路与平行验证庭、原点社区无屏居民街与两院、大钟寺连续通勤与旁侧人工服务。它把“先完成普通任务、AI 只作可选旁侧叠层”画进空间，不新增 Logo、场景、项目、几何或治理合同。
- Added one text-free synthetic human-scale triptych: Zhongzhiyuan ordinary bypass beside a parallel proof court, Origin Community screen-free resident street and two courts, and Dazhongsi continuous commuting beside staffed service. It spatializes “complete the ordinary task first; AI is only an optional side overlay” without adding a logo, scene, project, geometry, or governance contract.
- 新增双语长描述与 `ordinary-life-media-register.json`，逐处登记普通路径、可选验证、人工交接、故障绕行、恢复提示、禁止推断和普通—验证—故障—恢复四态；真实照片、确认视点、现场观察、获批构件、运营交互、无障碍结果与恢复结果均保持 0。
- Added a bilingual long description and `ordinary-life-media-register.json`, recording each ordinary path, optional proof layer, staffed handoff, fault bypass, restoration cue, prohibited inference, and ordinary–proof–fault–recovery reading. Real photographs, confirmed viewpoints, field observations, approved components, operational interactions, accessibility results, and restoration results remain 0.
- 双语正文、离线 visual、报告、四份出版物、来源/权利证据、manifest 和逐文件台账同步纳入该人类阅读入口。图像由 OpenAI 图像生成工具从本包自编文本提示生成，未输入外部图像；权利状态继续为 `not_fully_cleared`，公共或专业复用继续阻断。
- Synchronized the bilingual proposals, offline visual, reports, four publications, source/rights evidence, manifest, and file-level ledger with this human-reading entry. The OpenAI image-generation tool used a package-authored text prompt and no external image input; rights remain `not_fully_cleared`, with public or professional reuse still blocked.
- 12 场景、8 项目、3 重点区、geometry、metrics、99 个现实关闭槽、全部 G0 与临时边界保持不变；概念图、文件 PASS、PR 审查或合并均不构成现实位置、无障碍合规、获批设计、建设、运营或成熟度升级。
- Twelve scenes, eight projects, three key areas, geometry, metrics, 99 real-world closure slots, all-G0 status, and provisional boundaries remain unchanged. A concept image, file PASS, PR review, or merge creates no real location, accessibility compliance, approved design, construction, operation, or maturity advancement.

## v11.0 - 2026-08-12

**Review synthesis and professional handoff / 评审收束与专业深化交接**

- 不再新增品牌、场景、季节、项目或治理合同；把十轮成果收束为“一概念、三原型、一内核”的四步评审入口，并把任务书 agent.1—agent.6 各绑定到一个核心评审问题、现有证据、专业接手动作和禁止推断。
- Added no brand, scene, season, project, or governance contract. The ten-round package now converges into a four-step “one concept, three prototypes, one kernel” review entry, with each taskbook duty agent.1–agent.6 bound to one core review question, current evidence, professional next action, and prohibited inference.
- 深化既有 `implementation-handoff-matrix.json`，新增 D01—D08 八类现实资料替换登记、七专业接手矩阵和“冻结—替换—复算—复核—必要时退役”变更控制；正式资料冲突时先保护普通公共权利、停止验证叠层，不得修改官方或锁定图层迁就方案。
- Deepened the existing `implementation-handoff-matrix.json` with D01–D08 real-input replacement records, a seven-discipline handoff matrix, and freeze–replace–recalculate–verify–retire change control. When authoritative evidence conflicts, ordinary public rights prevail and the proof overlay stops; official or locked layers must never be altered to preserve the proposal.
- 新增双语 `review-professional-handoff.{svg,png}`，在一张评审面上组织六项任务、八类资料和七专业 NO-GO 停止线；双语正文、离线 visual、报告、合规回链及四份出版物同步纳入该入口。
- Added bilingual `review-professional-handoff.{svg,png}` to organize six duties, eight input replacements and a seven-discipline NO-GO stop line on one review surface; synchronized the bilingual proposals, offline visual, report, compliance backlinks and four publications.
- 当前权威替换材料、专业责任接受、99 槽现实材料、批准、现场测试和 GO 决定均为 0。12 场景、8 项目、3 重点区、geometry、metrics、全部 G0、临时边界和 `not_fully_cleared` 均保持不变；文件、机器或 PR 通过不构成任何现实授权。
- Authoritative replacement inputs, accepted professional duties, real artifacts across 99 slots, approvals, field tests and GO decisions all remain 0. Twelve scenes, eight projects, three key areas, geometry, metrics, all-G0 status, provisional boundaries and `not_fully_cleared` remain unchanged; no file, machine or PR PASS creates real-world authorization.

## v10.0 - 2026-08-12

**Long-term civic operations and ten-round audit / 长期公共共同体运营与十轮总审计**

- 以 `JZ-FUTURE-09` 完成串行第 10 轮，不重造第 3—9 轮的维护、权利、资源、失败、气候、文化和任务经济机制；新增一份 G0 运营集成合同，把全年普通日、无活动日、四个条件季节、同一居民任务的昼／夜／故障／恢复四窗、八类角色、三载体回写、失败公开和年度保持／修正／扩展／退役纳入同一公共运营协议。
- Completed serial Round 10 under plan ID `JZ-FUTURE-09` without reinventing the Round 3–9 maintenance, rights, resource, failure, climate, cultural, or mission-economy mechanisms. One G0 integration contract now joins year-round ordinary/no-event days, four conditional seasons, one resident task across day/night/failure/recovery, eight role types, three-carrier writeback, failure disclosure, and annual keep/correct/expand/retire decisions.
- 把既有 `07:00–22:00` 与 `22:00–07:00` 明确降回“继承的 G0 设计窗口”：不是现实开放时间、排班、夜班、噪声或照度承诺。问题季、开源季、城市 Beta 季和 Proof Week 均为 `not_scheduled`；活动、班次、预算、伙伴和确认运营成绩为 0 或 unknown，普通非 AI／无屏／无账户路径不得被活动占用。
- Explicitly bounded the inherited `07:00–22:00` and `22:00–07:00` entries as G0 design windows—not real opening hours, rosters, night shifts, noise or lighting promises. Question Season, Open-source Season, Urban Beta Season and Proof Week remain `not_scheduled`; events, shifts, budgets, partners and confirmed operating results remain 0 or unknown, and activities may not occupy the ordinary non-AI/screen-free/no-account path.
- 新增双语 `year-round-civic-operations.{svg,png}`，同构表达全年底板、四窗旅程、角色责任、场景护照—公共时刻表—证据矩阵回写、年度失败披露与去留决定；国际远程复测只有改善本地公共决定、无障碍、维护、安全或普通服务时才计公共收益，传播热度不计。
- Added the bilingual, isomorphic `year-round-civic-operations.{svg,png}` figure pair for the all-year base, four-window journey, role duties, scenario-passport/public-timetable/evidence-matrix writeback, annual failure disclosure and disposition. International remote retest counts only when it improves local public decisions, access, maintenance, safety, or ordinary service; publicity does not count.
- 十项运营决定指标全部保持 typed `unknown` / `null`，现实事故、活动、排班、预算、伙伴、投诉数据、国际复测、年度决定与退役回执均保持 0；结构化合同、总体证据矩阵、假设、指标、来源权利和逐文件权利台账形成可复核回链，但不把字段覆盖率写成运营绩效。
- All ten operating-decision metrics remain typed `unknown` / `null`; real incidents, events, rosters, budgets, partners, complaint data, international retests, annual decisions and retirement receipts remain 0. The structured contract, master evidence matrix, assumptions, metrics, source-rights records and file-level rights ledger form an auditable chain without turning field coverage into operating performance.
- 十轮一致性审计确认：前台总纲仍是“双轨京张”，后台内核仍是 JZ-AIOS + G0—G3 + 证据门 + 权利边界；众智园／原点社区／大钟寺仍为验证庭／居民共学街院／通勤发布服务三种不可互换原型；12 场景、8 项目、3 重点区、geometry、临时边界、全部 G0 和 `not_fully_cleared` 均未改变。后续只值得在新现场证据与明确授权下做收敛验证；应停止继续增加品牌、季节、场景、无证据指标或成熟度叙事。
- The ten-round consistency audit confirms that Twin-track Jing-Zhang remains the front-stage master plan and JZ-AIOS + G0–G3 + evidence gates + rights boundaries remain the backstage kernel. Zhongzhiyuan, Origin Community and Dazhongsi remain non-interchangeable proof-court, resident-learning street/courts, and commuter publication/service prototypes. Twelve scenes, eight projects, three key areas, geometry, provisional boundaries, all-G0 status and `not_fully_cleared` remain unchanged. Further work is worthwhile only as evidence-led convergence under explicit authorization; adding brands, seasons, scenes, unsupported metrics or maturity narratives should stop.
- 双语 Markdown/离线 HTML 与四份 PDF 同步更新；A3 中英文为 63/67 页，A0 中英文各 15 张整板。全部 PDF 为单一正确页面尺寸、无空白页、无替换字形、无越界文本块；新增运营图的中英文封面、A0 整板和 A3 细节裁片均完成视觉抽查。
- Synchronized bilingual Markdown/offline HTML and all four PDFs. Chinese/English A3 contain 63/67 pages; both A0 sets contain 15 whole boards. Every PDF has one correct page size, zero blank pages, replacement glyphs or out-of-page text blocks; the bilingual cover, A0 board and A3 detail crops for the new operations figure were visually inspected.

## v9.1 - 2026-08-12

**Rounds 7–9 cross-round closure / 第 7—9 轮跨轮闭环**

- 审计确认第 7 轮 G0、失败门、非 AI 连续路径与临时边界未被后两轮破坏；修补集中于第 8—9 轮新增内容未完整进入出版、来源权利证据和逐文件覆盖的问题，不新增场景、项目、几何、边界、伙伴、采购、审批、现场结果或成熟度。
- Audit confirmed that Round 7 G0 status, failure gates, continuous non-AI paths, and provisional boundaries remain intact. The repair is limited to Round 8–9 material missing from publication, source-rights evidence, and file-level coverage; it adds no scene, project, geometry, boundary, partner, procurement, approval, field result, or maturity.
- 修正双语视觉首页嵌套导航；重排两张英文图的标题、状态条、卡片、恢复链和页脚，并删除可见的内部证据 token；中文图同步删除内部 token。双语正文与离线 HTML 现在直接嵌入百年时间与公共任务经济图件。
- Corrected malformed nested bilingual navigation; repaired title, status-bar, card, recovery-flow, and footer layout in the two English figures and removed visible internal evidence tokens, with matching token cleanup in Chinese. Bilingual Markdown and offline HTML now embed both century-time and mission-economy figures directly.
- manifest/逐文件权利台账从 89/88 扩为 99/98，新增 10 个第 8—9 轮合同与图件记录；来源权利证据从 29 扩为 35，与 `sources.json` 一一对应。删除未经证明的 CC 许可与“可展览”表述，总体仍为 `not_fully_cleared`，独立逐文件审计 0，公共或专业复用继续阻断。
- Expanded manifest/file-level rights coverage from 89/88 to 99/98 with ten Round 8–9 contract/figure records. Source-rights evidence expands from 29 to 35 and is one-to-one with `sources.json`. Unsupported CC-license and exhibition-use statements are removed; overall rights remain `not_fully_cleared`, independent file-level audits remain 0, and public/professional reuse remains blocked.
- 四份 PDF 从最终双语内容确定性重生：中文/英文 A3 为 58/62 页，每种语言 14 组图件各拆 3 个带 30px 重叠的 620×892 细节裁片；中英文 A0 各 14 张整板。两个新进程逐文件一致，148 页 QA 的空白页、替换字形和越界文本块均为 0；摘要见 `report/narrative.md`。
- Deterministically regenerated all four PDFs from final bilingual content: Chinese/English A3 contain 58/62 pages with 14 figure sets per language, each split into three 620×892 detail crops with 30px overlap; both A0 sets contain 14 whole boards. Two fresh processes are file-identical, and all 148 pages return 0 blank pages, replacement glyphs, or out-of-page text blocks; hashes are recorded in `report/narrative.md`.

## v9.0 - 2026-08-12

**Mission Economy: 问题驱动的产业与人才转化 / Mission Economy: Problem-Led Industry and Talent Translation**

- 选择四个相互依赖的产业与人才机制工作包，把公共任务发布、问题质量门、小团队公平准入、离线原型、独立复测门、结果回流与退出退役组织为同一 G0 机制合同；不以虚构企业名单、投资额或招商承诺证明产业价值，验证通过不等于采购或部署授权；不重做公共权利、证据类型、失败治理或文化合同底座。
- Selected four mutually dependent industry-and-talent mechanism work packages, organizing public-task publication, problem-quality gate, fair small-team entry, offline prototyping, independent-retest gate, result reflow, and exit/retirement into one G0 mechanism contract; industry value is not proven by invented enterprise lists, investment amounts, or attraction promises, and passing a test is not a procurement or deployment authorization; does not rebuild public-rights, evidence-type, failure-governance, or cultural-contract foundations.
- 新增 `mission-economy-contract.json`（JZ-MISSION-ECONOMY-G0-V1）：公共任务生命周期七步、准入与退出（无账号门槛、同任务人工/非 AI 路径、退出不进人才排名）、采购与知识产权边界（原型≠采购≠部署、逐级独立书面授权、IP not_cleared）、公共收益回流（不依赖投资额、反馈仅作下一轮输入）、四轴分离、十项决定指标全部 unknown 或 0、八组风险预演、reality counters 全 0。
- Added `mission-economy-contract.json` (JZ-MISSION-ECONOMY-G0-V1): seven-step public-task lifecycle, entry and exit (no account barrier, manual/non-AI paths for the same task, exit records excluded from hiring ranking), procurement and IP boundary (prototype≠procurement≠deployment, separate written authorization per level, IP not_cleared), public-benefit reflow (independent of investment amounts, feedback only feeds the next round), four-axis separation, ten decision metrics all unknown or 0, eight risk rehearsals, all reality counters 0.
- 新增双语产业—公共价值状态图 `industry-public-value-state.{svg,png}`，A 公共任务生命周期/B 四轴分离/C 授权阶梯/D 公共收益回流，图面通过 QA（修正英文版卡片标题与正文溢出）。
- Added bilingual industry–public value state figure pair `industry-public-value-state.{svg,png}`, A public-task lifecycle / B four-axis separation / C authorization ladder / D public-benefit reflow; figure QA passed (fixed English card-title and body overflow).
- 为十项决定指标定义状态/分母/证明上限；没有现实数据时保持 unknown 或 0，不得用字段覆盖率、概念数量或机器 PASS 冒充现实成效：公共任务可验证度、小团队参与比例、独立复测覆盖、任务退出率、专业服务可达性、公共收益交付状态、高校课程真实参与状态、知识产权争议数、失败项目公开率、机构书面确认状态。
- Defined state/denominator/proof limits for ten decision metrics; without real data remain unknown or 0; field coverage, concept counts, or machine PASS cannot be presented as real-world outcomes: public-task verifiability rate, small-team participation ratio, independent-retest coverage, task exit rate, professional-service accessibility, public-benefit delivery status, university-course real participation, IP dispute count, failed-project publication rate, institution written-confirmation status.
- 外部机构、企业、高校和服务商均为建议角色或待确认角色，0 个书面确认；责任主体（发布、准入、复测、停止、恢复）均为角色待确认。geometry、既有 SCENE/JZ/T 编号、八个项目、全部 G0、临时边界和 `not_fully_cleared` 均不变；现实任务、小团队、复测、退出事件、采购与部署全部为 0。
- External institutions, enterprises, universities, and service providers remain suggested or pending-confirmation roles with 0 written confirmations; responsible roles (publication, entry, retest, stop, recovery) remain roles-to-be-confirmed. Geometry, existing SCENE/JZ/T IDs, eight projects, all G0 status, provisional boundaries, and `not_fully_cleared` remain unchanged; real tasks, small teams, retests, exit events, procurement, and deployment are all 0.

## v8.0 - 2026-08-12

**Century-Time Museum: 可核验·可纠错·无屏可达的城市时间教育线 / The Century-Time Museum: A Verifiable, Correctable, Screen-free Time Education Line**

- 选择十个相互依赖的文化内容工作包，把京张铁路勘测、通车、高铁、遗址公园与 AI 训练、验证、失败、纠错、退役并置为一条不崇拜技术的城市时间教育线；不重做公共权利、证据类型或失败治理底座。
- Selected ten mutually dependent cultural-content work packages, juxtaposing Jing-Zhang railway survey, opening, HSR, heritage park with AI training, validation, failure, correction, and retirement as a city time-education line that does not worship technology; does not rebuild public-rights, evidence-type, or failure-governance foundations.
- 新增 `century-time-museum-contract.json`（JZ-TIME-MUSEUM-G0-V1）：五史实对象、七级来源等级表、口述史同意模板（采集前）、争议纠错五步流（停/下架/纠错/版本保留/恢复）、无屏节点链（起点站牌→对照图谱牌→证据更新墙）、全部指标 unknown 或 0、reality counters 全 0。
- Added `century-time-museum-contract.json` (JZ-TIME-MUSEUM-G0-V1): five historical objects, seven-grade source-grade table, oral-history consent template (pre-collection), five-step dispute-correction flow (stop/takedown/correct/retain-recover), screen-free node chain (origin→atlas→evidence wall), all metrics unknown or 0, all reality counters 0.
- 新增双语百年时间图谱 `century-timeline.{svg,png}`，A 双轨对照图谱（铁路年代×AI 门级）/B 来源等级表（七级锚点）/C 争议纠错流程（五步+无屏链），图面通过 QA（修正英文图 C 区卡片宽度不足导致的文字裁切）。
- Added bilingual century-timeline figure pair `century-timeline.{svg,png}`, A twin-track atlas (railway chronology × AI gates) / B source-grade table (seven anchors) / C dispute-correction flow (five steps + screen-free chain); figure QA passed (fixed English version C-section text overflow from insufficient card width).
- 为十项文化指标定义状态/分母/证明上限；没有现场数据时保持 unknown 或设计字段覆盖，不得用字段覆盖率冒充现实成效：史实来源可核验率、未清权内容数量、生成内容标识覆盖、争议处理时间、口述史有效同意率、多语言概念一致性、无屏完成导览率、儿童理解度待测、年度退役内容数、独立史实复核状态。
- Defined state/denominator/proof limits for ten cultural metrics; without field data remain unknown or design-field coverage, cannot use field coverage as real-world outcome proxy: source verifiability rate, uncleared content count, generated-content label coverage, dispute-handling time, oral-history consent rate, multilingual concept consistency, screenless tour completion rate, child comprehension (pending), annual retired-content count, independent historical retest status.
- geometry、既有 SCENE/JZ/T 编号、八个项目、全部 G0、临时边界和 `not_fully_cleared` 均不变。官方馆藏、明确责任主体、独立复测、批准或运行结果仍为 0；图件不声称馆藏、精确档案位置、已运营展览或工程结论。
- Geometry, existing SCENE/JZ/T IDs, eight projects, all G0 status, provisional boundaries, and `not_fully_cleared` remain unchanged. Official archives, confirmed accountable operators, independent retests, approval, or operating results remain 0; figures do not claim existing archives, exact archive locations, operational exhibitions, or engineering conclusions.

## v7.0 - 2026-08-12

**Climate-resilience proof corridor / 气候韧性验证走廊**

- 选择六个相互依赖的气候空间工作包，把小月河观察翼概念关系、连续普通蓝绿路径、遮阴/可达休息意图、静态非 AI 提示、人工巡检、雨洪与生态维护净空、同任务 AI 辅助、脆弱群体四态旅程和可拆服务边组织为同一 G0 剖面语法；不重做维护、代谢、失败或权利系统。
- Selected six mutually dependent climate-spatial work packages, joining a conceptual Xiaoyue River observation edge, continuous ordinary blue-green route, shade/reachable-rest intent, static non-AI notice, manual inspection, stormwater/ecological-maintenance clear zone, same-task AI assistance, four-state vulnerable-group journey, and removable service edge in one G0 section grammar without rebuilding maintenance, metabolism, failure, or rights systems.
- 新增 `climate-resilience-contract.json` 与双语 SVG/PNG 图对，固定静态非 AI 与可选 AI 的同任务、同人工确认、同申诉和退出合同；来源过期、支线冲突、无人确认、不可达、极端天气、雨洪/维护冲突或普通路径受损均 fail-closed。
- Added `climate-resilience-contract.json` and a bilingual SVG/PNG figure pair. Static non-AI and optional AI now share one task, human confirmation, appeal, and exit contract; stale source, branch conflict, missing confirmation, inaccessible output, extreme weather, stormwater/maintenance conflict, or damage to ordinary movement fails closed.
- 为连续遮阴、可达休息、人工巡检、误报漏报、雨洪维护、停止时间和设备退出定义类型化现场锚点、分母与证明上限；七项现实值保持 unknown 或 0，不用绿地率、图面覆盖、概念节点、传感器数量或合成 PASS 冒充热舒适、准确率、水文、无障碍或恢复绩效。
- Defined typed field anchors, denominators, and proof limits for continuous shade, reachable rest, manual inspection, warning error, stormwater maintenance, stop time, and device exit. All real values remain unknown or 0; green ratio, drawing coverage, concept nodes, sensor count, and synthetic PASS cannot become comfort, accuracy, hydraulic, accessibility, or recovery performance.
- geometry、既有 SCENE/JZ/T 编号、八个项目、全部 G0、临时边界和 `not_fully_cleared` 均不变。现实测量、提示事件、设备、责任确认、还场回执和成熟度变化均为 0；图件不声称现状建筑、精确河岸、法定退界、消防/铁路/市政或已建设施。
- Geometry, existing SCENE/JZ/T IDs, eight projects, all G0 status, provisional boundaries, and `not_fully_cleared` remain unchanged. Real measurements, warning events, devices, confirmed duties, place-restoration receipts, and maturity changes remain 0; the figure claims no existing building, exact riverbank, statutory setback, fire/rail/municipal conclusion, or built facility.

## v6.0 - 2026-08-12

**Antifragile failure governance / 反脆弱失败治理**

- 在既有 JZ-AIOS 内新增一份 G0 失败治理登记，不另造治理品牌或重复失败侧线；六类失败、八类人工责任、运行/成熟度/授权/服务四轴、公众申诉、追加式版本、独立复测和主动退役进入同一合同。
- Added one G0 failure-governance register inside existing JZ-AIOS without a new brand or duplicate failure siding. Six failure classes, eight human role types, separate runtime/maturity/authorization/service axes, public appeal, append-only versions, independent retest, and active retirement now share one contract.
- 把暂停、复核、恢复、撤回和退役定义为场景护照—公共时刻表—证据矩阵三载体原子回写；任一缺失或矛盾即向更保守状态 fail-closed，旧证据不得被版本更新覆盖，申诉必须进入 go/no-go。
- Defined pause, review, recovery, withdrawal, and retirement as atomic writebacks across scene passport, civic timetable, and evidence matrix. Missing or conflicting carriers fail closed to the conservative state, version updates cannot overwrite prior evidence, and appeals must enter go/no-go.
- 新增双语治理图，空间化六类失败、T-02 过期来源合成故事板、三载体回写、四轴分离和退役回执；T-02 继续保持 deterministic、无个人信息、无模型/API/现实服务调用和 fail-closed，不写成现实事故或现场恢复。
- Added a bilingual governance figure spatialising six failure classes, the synthetic T-02 stale-source storyboard, three-carrier writeback, four separate axes, and retirement receipts. T-02 remains deterministic, PII-free, free of model/API/real-service calls, and fail-closed; it is not presented as a real incident or field recovery.
- 现实失败事件、确认停止权限、确认责任主体、公开纠正、现实独立复测、主动退役和批准重启均为 0；停止到人工交接时间与普通使用恢复时间保持 unknown。文件检查、合成 PASS、复测或恢复验收均不授权试用、采购、建设、部署、成熟度升级、场地/专业批准、清权或现实成效。
- Real failure events, confirmed stop authorities and accountable operators, public corrections, real independent retests, active retirements, and approved restarts remain 0. Stop-to-staffed-handoff and ordinary-use-recovery times remain unknown. A file check, synthetic PASS, retest, or restoration acceptance authorizes no trial, procurement, construction, deployment, maturity advance, site/professional approval, rights clearance, or real-world outcome.
- 未改 geometry、既有 SCENE/JZ/T 编号、G0、后续气候方向或临时边界；权利继续为 `not_fully_cleared`，独立逐文件清权审计完成数仍为 0。
- Geometry, existing SCENE/JZ/T IDs, G0, the later climate direction, and provisional boundaries are unchanged. Rights remain `not_fully_cleared`, with zero completed independent file-level clearance audits.

## v5.0 - 2026-08-12

**Whole-system AI urban metabolism / 完整系统 AI 城市代谢**

- 为既有 `SCENE-001`—`012` 建立十二本 G0 资源护照，在同一账本内覆盖算力、能源、设备材料、数据、人工复核、供应商依赖、失败与退出成本；核算边界从云/服务器扩展到边缘、网络、终端、传感/显示/固定件、人工和非 AI 基线、无障碍/安静与场所恢复。
- Added twelve G0 resource passports for the existing `SCENE-001`—`012`, covering compute, energy, equipment/material, data, human review, vendor dependency, and failure/exit cost in one ledger. The boundary extends from cloud/server to edge, network, end devices, sensing/display/fixings, staffed and non-AI baselines, accessibility/quiet, and place restoration.
- 新增双语城市代谢系统图与 visual 入口，按众智园设备/电池/接管、原点社区同意/共享设备/保障/清场、大钟寺来源/终端/人工台/通勤，分别显示不可复制的资源负担和退出焦点；三处只复用七类字段，不套用同一退出动作。
- Added a bilingual metabolism-system figure and visual entry. Zhongzhiyuan shows equipment/battery/takeover burdens; Origin shows consent/shared-kit/safeguarding/clearance burdens; Dazhongsi shows source/terminal/staffed-desk/commute burdens. The places share seven fields but not one copied exit action.
- 固定五类显式未知状态、七类组件退出去向和公共 NO-GO 门；任务分母、完整边界、来源、责任、非 AI 同任务基线、供应商导出维修退出、组件去向与独立复核必须全部关闭，未来 `PASS` 也不等于部署、场地、采购、成熟度、清权或环境收益授权。
- Fixed five typed unknown states, seven component-exit destinations, and a public NO-GO gate. Task denominator, whole boundary, sources, responsibility, same-task non-AI baseline, vendor export/repair/exit, component destinations, and independent retest must all close; even a future `PASS` is not deployment, site, procurement, maturity, rights, or environmental authorization.
- 12/12 与 7/7 仅为设计字段覆盖。有效任务分母、实测能源场景、实测算力场景、确认设备生命周期场景、实测人工分钟场景、确认供应商、现实批准与运行均为 0；总能源、总算力和总人工分钟保持 unknown。未改 geometry、既有 SCENE/JZ/T 编号、G0、后续失败治理或气候任务线，权利仍为 `not_fully_cleared`。
- 12/12 and 7/7 are design-field coverage only. Valid task denominators, measured-energy scenes, measured-compute scenes, confirmed equipment-lifecycle scenes, measured-human-minute scenes, confirmed vendors, real approvals, and real operations are all 0; total energy, compute, and human minutes remain unknown. Geometry, existing SCENE/JZ/T IDs, G0, later failure-governance and climate task lines are unchanged, and rights remain `not_fully_cleared`.

## v4.0 - 2026-08-11

**Non-AI-first public city / 非 AI 优先公共城市**

- 选择六个内聚工作包，把无需账户/扫码、完整非 AI、连续无障碍意图、人工交接、同意撤回、申诉纠正、无屏安静固化为七项未来服务窗口不得删除的公共设计权利；“永久”不表示当前已有服务点、窗口、人员或批准。
- Selected six cohesive work packages and fixed seven public design rights that cannot be removed from any future offered service window: no account/QR, complete non-AI path, continuous accessibility intent, staffed handoff, consent withdrawal, appeal/correction, and screen-free quiet. “Permanent” does not mean that a current service point, window, staff assignment, or approval exists.
- 将 `non-ai-parity-contract.json` 升级为 V2，以“纸面/口头任务—无屏等候—双入口人工台—同一基本任务—投诉/撤回/纠正—无技术离开”为主路径；AI 仅在易懂披露和单独自愿同意后作为可选支线，并汇入同一结果、费用规则、责任队列与恢复链。
- Upgraded `non-ai-parity-contract.json` to V2. The primary route is paper/oral task–screen-free waiting–dual-entry staffed desk–same basic task–complaint/withdrawal/correction–technology-free exit. AI is an optional branch only after plain-language disclosure and separate voluntary consent, and rejoins the same outcome, cost rule, accountable queue, and recovery chain.
- 新增双语服务蓝图和 `non_ai_first_public_city_contract`，分别空间化众智园设备隔离/接管恢复、原点社区无屏共学/口头纸面撤回、以及大钟寺四向通勤/来源纠错/双入口人工台；三处不套用同一构图或恢复动作。
- Added a bilingual service blueprint and `non_ai_first_public_city_contract`, spatialising Zhongzhiyuan equipment isolation/takeover recovery, Origin screen-free learning/oral-paper withdrawal, and Dazhongsi four-way commuting/source correction/dual-entry staffed service. The three places do not share one copied composition or recovery action.
- 老年人、残障与行动不便者、低数字素养者、无账户或无智能设备者分别建立分母、记录字段和未知阈值；总体平均不得掩盖排斥。投诉、撤回、纠正、停止、人工接管、临时叠层退出、独立复测与还场进入同一可审计闭环。
- Added separate denominators, record fields, and unknown thresholds for older people, disabled and reduced-mobility users, low-digital-literacy users, and people without an account or smart device; overall averages may not hide exclusion. Complaint, withdrawal, correction, stop, staffed takeover, overlay removal, independent retest, and place restoration form one auditable loop.
- 已确认运营主体 0、人员 0、现实服务交互 0、已知群体结果 0、现实批准与运营 0；全部场景仍为 G0，临时 geometry、既有 SCENE/JZ/T 编号、后续维护合同和 `not_fully_cleared` 权利状态不变。本轮不声称固定值班、满意度、完成率、现场测试或法律上普遍适用的服务义务。
- Confirmed operators, staff, real service interactions, known group results, and real approvals/operations all remain 0. Every scene remains G0; provisional geometry, existing SCENE/JZ/T IDs, the later maintenance contract, and `not_fully_cleared` rights status are unchanged. This round claims no fixed staffing, satisfaction, completion rate, field test, or generally applicable statutory service duty.

## v3.0 - 2026-08-11

**Maintenance-urbanism publication fixed point / 维护型城市发布固定点**

- 新增五类按用户目标命名的维护任务族、12 个既有场景至既有 `JZ-01`—`08` 项目的双语交叉表，以及“问题壳—工单壳—责任接受—人工工时—既有设施优先—独立复核—继续/纠正/停止—退役—回到普通基线”闭环；任务族不是新场景或项目。
- Added five user-goal maintenance task families, a bilingual crosswalk from the 12 existing scenes to existing `JZ-01`—`08` projects, and an issue-shell–work-order-shell–responsibility-acceptance–human-hours–existing-facility-first–independent-recheck–continue/correct/stop–retirement–ordinary-baseline loop. Task families are not new scenes or projects.
- `maintenance_urbanism_contract` 记录双语标签、全量场景交叉映射、全寿命与可维修字段、季度维护地图模板、重复失败/退役规则、证据回链和零/未知现实计数；未改 geometry、SCENE/JZ/T 主编号或成熟度。
- `maintenance_urbanism_contract` records bilingual labels, the full scene crosswalk, lifecycle and repairability fields, a quarterly maintenance-map template, repeated-failure/retirement rules, evidence backlinks, and zero/unknown reality counters. Geometry, primary SCENE/JZ/T IDs, and maturity are unchanged.
- 维护图与离线双语入口明确呈现维修缝、重复失败侧线、退役/普通基线恢复、既有设施优先阶梯、空白季度地图和 0/pending/unknown 限制；HTML、四份 PDF、台账、manifest 与标记自检均从最终包字节重建。当前包仍为 70 条 manifest 路径与 69 个非 manifest 内容文件。
- The maintenance figure and paired offline entry now make the repair seam, repeated-failure siding, retirement/ordinary-baseline restoration, existing-facility-first ladder, blank quarterly map, and 0/pending/unknown limits explicit. HTML, all four PDFs, the ledger, manifest, and marked self-check are rebuilt from final package bytes. The package remains 70 manifest paths with 69 non-manifest content files.
- 现实投诉、工单、预算、确认人员、工时、修复、独立复核、效果、批准和运营均未被声明为已发生：计数保持 0 或 unknown/pending；全部场景仍为 G0，临时边界与权利 `not_fully_cleared` 不变，独立逐文件清权审计完成数仍为 0。
- No real complaint, work order, budget, confirmed personnel, hours, repair, independent recheck, effect, approval, or operation is claimed: counts remain 0 or unknown/pending; all scenes remain G0, provisional boundaries and `not_fully_cleared` rights remain unchanged, and completed independent file-level clearance audits remain 0.

## v2.14 - 2026-08-11

**Three differentiated switchyard prototypes / 三座差异化换轨场原型**

- 选择六个内聚工作包，把众智园深化为“平行验证庭—设备隔离—人工接管—恢复验收”，把原点社区深化为“一街两院四节点—无屏共学—同意撤回—居民日常”，把大钟寺深化为“四象限步行—一厅一台—通勤连续—人工服务”，并以三处连续非 AI / 无障碍意图线、可拆构件、静音和四态证据合同贯通。
- Selected six cohesive work packages: Zhongzhiyuan as parallel proof court–equipment isolation–staffed takeover–restoration acceptance; Origin Community as one street/two courts/four nodes–screen-free learning–consent withdrawal–resident daily use; Dazhongsi as four-quadrant walking–one hall/one desk–commute continuity–staffed service; plus continuous non-AI/accessibility intent, removable components, quiet mode, and one four-state evidence contract across all three.
- 重构双语 `key-areas` 为普通状态优先的概念平面、首层公共界面和四步旅程，重构双语 `key-area-sections` 为三种关系剖面、普通—验证—故障—恢复四态与场所恢复门；每列只回答一个规划问题，并显式列出不可复制组件与未知资料。
- Rebuilt bilingual `key-areas` as ordinary-first concept plans, ground-floor public interfaces, and four-step journeys, and rebuilt bilingual `key-area-sections` as three relationship sections, ordinary–proof–fault–recovery states, and place-restoration gates. Each column answers one planning question and exposes non-copyable components and missing evidence.
- `key-area-evidence-matrix.json#round2_spatial_deepening` 新增逐处平面语法、首层界面、连续路径、人工交接、可拆构件、使用旅程、恢复检查、未知决策字段和反证自检；双语 proposal、report、visual 与设计深度矩阵回链同一合同。
- `key-area-evidence-matrix.json#round2_spatial_deepening` adds area-specific plan grammar, ground-floor interfaces, continuous paths, staffed handoff, removable components, user journeys, restoration checks, unknown decision fields, and counter-evidence self-audit. Bilingual proposals, reports, visual pages, and the design-depth matrix backlink to the same contract.
- 新增 `A-KEY-AREA-SPATIAL-011`，明确体量只是关系原型、大钟寺四向不是车站锚点、无障碍绿线不是现场合格证明、恢复验收不是批准。未改 geometry、场景编号或 metrics；全部场景仍为 G0，现实审计/责任确认/批准/测试/已知结果仍为 0，权利仍为 `not_fully_cleared`。
- Added `A-KEY-AREA-SPATIAL-011`: massing is relational only, Dazhongsi directions are not a station anchor, the green accessibility line is not field-compliance evidence, and restoration acceptance is not approval. Geometry, scene IDs, and metrics are unchanged; every scene remains G0, real audits/role confirmations/approvals/tests/known results remain 0, and rights remain `not_fully_cleared`.

## v2.13.1 - 2026-08-10

**Rights release-gate correction / 权利发布门口径修复**

- 根据 PR 评审，将 `PUBLIC_OR_PROFESSIONAL_REUSE_RIGHTS=unknown/major` 与 `RIGHTS-OPEN-01/02/03` 写入 `manifest.release_claim.known_blockers`，并把三项权利补全动作写入 `manifest.release_claim.next_actions`；结构审查的 `validation_claim.known_blockers` 保持为空，`release_claim.public_or_professional_reuse` 继续为 `blocked_pending_terms_and_audit`。
- Following review feedback, `PUBLIC_OR_PROFESSIONAL_REUSE_RIGHTS=unknown/major` and `RIGHTS-OPEN-01/02/03` are now explicit `manifest.release_claim.known_blockers`, with three rights-closure actions in `manifest.release_claim.next_actions`; structural review keeps `validation_claim.known_blockers` empty, while `release_claim.public_or_professional_reuse` remains `blocked_pending_terms_and_audit`.
- 双语验收叙事明确区分“结构/证据可审查”与“权利已清除”：仓库可以进行披露复核，但公共展示、专业深化和其他复用在完整条款、独立逐文件审计与 ODbL 判定完成前仍不可用；未改 geometry、metrics、G0 或任何场景编号。
- The bilingual acceptance narrative now separates auditable structure/evidence from rights clearance: repository disclosure review may proceed, while public display, professional deepening, and other reuse remain unavailable until complete terms, independent file-level audit, and ODbL determination are complete. Geometry, metrics, G0 status, and scene IDs are unchanged.

## v2.13 - 2026-08-10

**Twin-track front-stage spatial master plan / 双轨前台空间总纲**

- 将“双轨京张”建立为前台空间语法：连续日常轨、间歇验证轨、三座换轨场、失败侧线和公共时刻表；保留 JZ-AIOS、G0—G3、证据门和权利边界为后台治理内核。
- Made Twin-track Jing-Zhang the front-stage spatial syntax: the continuous civic track, intermittent proof track, three switchyards, failure siding, and civic timetable, while retaining JZ-AIOS, G0–G3, evidence gates, and rights boundaries as the back-stage governance kernel.
- 重构双语 `site-overview` PNG，并加入对应的双语可编辑 SVG 源；图面明确人工站房、无屏节点、非 AI 完整路径、普通—验证—故障—恢复四态和六类城市信号。验证轨以间歇、限域、可拆除叠层表达，不表示连续占地或已建设施。
- Reworked the bilingual `site-overview` PNGs and added their bilingual editable SVG sources. The drawings make staffed stations, screen-free nodes, the complete non-AI path, four public states, and six city signals explicit. The proof track is intermittent, bounded, and removable; it is not a continuous footprint or an existing facility.
- 双语主稿、叙事报告和离线 visual 首页增加核心概念、总体空间解释、可读使用旅程和结构化证据回链；`key-area-evidence-matrix.json#twin_track_frontend_contract` 只新增概念空间合同，不新增场景编号、geometry、伙伴、批准、现场测试或现实成绩。
- Added the core concept, overall spatial explanation, readable public journey, and structured evidence backlink to both proposals, the narrative report, and the offline visual homepages. `key-area-evidence-matrix.json#twin_track_frontend_contract` adds a conceptual spatial contract only; no scene ID, geometry, partner, approval, field test, or real-world result is added.
- 临时 geometry、全部场景 G0、字段覆盖不等于现场表现、权利状态 `not_fully_cleared`、非 AI 可用性和公众退出/人工接管边界保持不变；最终 manifest、权利台账、PDF 和全部验证必须从本轮最终字节重新生成。
- Provisional geometry, all-scene G0 status, the distinction between field coverage and performance, `not_fully_cleared` rights, non-AI availability, and public exit/staffed-takeover boundaries remain unchanged. The final manifest, rights ledger, PDFs, and all validations must be regenerated from this round's final bytes.
- 从最终双语正文和八组双语 PNG 重生四份 PDF：中文/英文 A3 为 11/12 页，双语 A0 各 8 页；四份均通过全页文本、页面尺寸、图像计数和 0.20 倍逐页渲染检查，双轨总体图置于 A0 首板。该出版 QA 仍不证明现场执行、审批、G1 授权或权利清除。
- Regenerated all four PDFs from the final bilingual narratives and eight bilingual PNG pairs: the Chinese/English A3 booklets are 11/12 pages and both A0 sets are eight pages. All four passed full-page text, page-size, image-count, and 0.20-scale rendering checks, with the twin-track overview first in the A0 sequence. Publication QA does not prove field execution, approval, G1 authorization, or rights clearance.

## v2.12 - 2026-08-10

**Bilingual review parity and readable handoff / 双语评审等价与可读移交**

- 对中英文离线视觉首页做结构级复核并修复“文件成对但内容层级不等价”：两版现统一为同序 16 个章节、15 个导航目标、8 个双语图件角色、14 个同键同值指标卡，以及 `[2,3,12,3,13]` 五组表格行合同；均无远程依赖。
- Audited the Chinese and English offline dashboards structurally and repaired paired-but-unequal review content. Both now share the same ordered 16 sections, 15 navigation targets, eight bilingual figure roles, fourteen metric cards with identical keys and values, and `[2,3,12,3,13]` five-table row contract, with no remote dependency.
- 将既有 99 个关闭槽压成 H01—H07 七组双语可读移交包，明确每组必须提交的现实材料、对应关闭类别和当前 `未提交 / NO-GO`；结构化 ID、九类关闭逻辑和 11 项决定均未改变。
- Compressed the existing 99 closure slots into seven bilingual H01–H07 handoff packs that state required real-world material, closure objects, and current `not submitted / NO-GO` status. Structured IDs, the nine-category logic, and all eleven decisions are unchanged.
- 把七类使用场景在双语正文中明确展示为 1 类披露评审、2 类待确认和 4 类阻断或待审计阻断，并在权利矩阵增加同一计数摘要；适用确认、书面同意和独立审计仍全部为 0。
- Exposed the seven use contexts in both proposal languages as one disclosed-review context, two confirmation-dependent contexts, and four blocked or audit-dependent contexts, and added the same count summary to the rights matrix. Applicability confirmations, written consents, and independent audits all remain 0.
- 增加 `BILINGUAL_VISUAL_PARITY` 为第 22 项包内检查，并清除一处把逐文件权利审计范围写死为旧数量的陈旧说明。未新增项目、场景、坐标、机构、批准、测试或现实成绩；geometry 与 metrics 保持不变。
- Added `BILINGUAL_VISUAL_PARITY` as the twenty-second package check and removed one stale hard-coded file count from the file-level rights-audit dependency. No project, scene, coordinate, institution, approval, test, or real-world result is added; geometry and metrics remain unchanged.

## v2.11 - 2026-08-10

**Comprehensive handoff and rights-boundary closure / 全面移交与权利边界闭环**

- 全包扫描 66 个既有文件后修正旧快照计数和矩阵—自检断链；新增两份结构化证据后，最终包为 68 个路径、67 个非 manifest 内容文件，逐文件台账与 manifest 必须严格等集。
- After scanning all 66 existing files, corrected stale snapshot counts and a matrix-to-self-check break. With two structured evidence files added, the final package contains 68 paths and 67 non-manifest content files; the file ledger and manifest must remain exact sets.
- 新增 `implementation-handoff-matrix.json`，把既有 8 个项目、3 个试点与 12 个预注册场景连接到当前阶段、空间对象、关闭记录、七组移交包和 99 个稳定材料 ID；现实提交材料、批准、运行、现场测试、已知结果与 GO 决定仍均为 0。
- Added `implementation-handoff-matrix.json`, connecting the existing eight projects, three protocols, and twelve preregistration scenes to the current phase, spatial objects, closure records, seven handoff packs, and 99 stable artifact IDs. Submitted real-world artifacts, approvals, operations, field tests, known results, and GO decisions all remain 0.
- 新增 `submission-use-rights-matrix.json`，逐条登记公告 8.1 与七类使用场景；仓库披露评审之外的主办方使用、投稿人对外展示、跨项目复用、翻译/专业深化和第三方组件发布均保留确认或阻断状态，不把公告文字、仓库可见性或机器 PASS 当作清权。
- Added `submission-use-rights-matrix.json`, separating announcement clause 8.1 from seven use contexts. Organizer use, entrant external display, cross-project reuse, translation/professional deepening, and third-party-component release beyond disclosed repository review remain pending or blocked; announcement text, repository visibility, and machine PASS do not constitute clearance.
- 为 11 项关闭记录补入 99 个唯一材料 ID 和显式空提交槽；同步双语正文、离线 HTML、展示页、版权声明、验收脚本与自检，并拆分高密度证据索引。未新增空间规划点、坐标、伙伴、批准或现实成绩，geometry 与 metrics 保持不变。
- Added 99 unique artifact IDs and explicit empty submission slots to the 11 closure records; synchronized bilingual prose, offline HTML, display pages, the copyright statement, acceptance audit, and self-check, while splitting dense evidence indexes. No spatial concept, coordinate, partner, approval, or real-world result is added; geometry and metrics remain unchanged.

## v2.10 - 2026-08-10

**Readiness evidence closure / 可行性证据关闭合同**

- 新增 `readiness-closure-contract.json`，不扩展 JZ-01—JZ-08 或 T-01—T-03 的内容，只把既有 RACI、审批、禁采数据、停机恢复、社区共测和独立复测要求统一为九类现实交付材料。
- Added `readiness-closure-contract.json` without expanding JZ-01—JZ-08 or T-01—T-03. It normalizes the existing RACI, approval, prohibited-data, stop/recovery, community co-test, and independent-retest requirements into nine real-world handoff categories.
- 固定“九类全部关闭才可讨论 G1、任一缺失即 NO-GO、停止条件优先于旧授权”的规则；11 项共 99 个关闭槽当前全部开放，已关闭 0，11 项决定均为 NO-GO，不把规范字段完整冒充现实可行性。
- Fixed the rule that all nine categories must close before G1 can be considered, any missing category means NO-GO, and active stop conditions override prior authorization. All 99 slots across 11 items remain open, 0 are closed, and all 11 decisions remain NO-GO; specification completeness is not presented as real-world feasibility.
- 同步双语正文、报告 HTML、离线展示、验收记录、A3、权利台账和 manifest；不新增规划点、场景、几何、伙伴、批准、现场测试或结果，`not_fully_cleared` 与临时边界保持不变。
- Synchronized bilingual prose, report HTML, offline visuals, acceptance records, A3, the rights ledger, and manifest. No planning point, scene, geometry, partner, approval, field test, or result is added; `not_fully_cleared` and provisional geometry remain unchanged.

## v2.9 - 2026-08-10

**Existing key-area mode alignment / 既有重点区模式对齐**

- 将 `key-areas` 平面图底部原先三列重复的通用四态，替换为 v2.8 已在剖面图、正文和 `key-area-evidence-matrix.json` 中确立的三组差异化名称与停止提示；空间结构、G1 前置、场景节点和几何均未改变。
- Replaced the three repeated generic four-mode rows in the `key-areas` plans with the area-specific names and stop cues already established in v2.8 sections, prose, and `key-area-evidence-matrix.json`. Spatial structures, G1 prerequisites, scene nodes, and geometry are unchanged.
- 同步中英文离线展示页的图像替代文字与四态对照说明，使平面、剖面、正文和机器矩阵使用同一术语；未新增规划点、指标、伙伴、批准、现场测试或运行结果。
- Synchronized bilingual offline-page alt text and mode crosswalk copy so plans, sections, prose, and the machine matrix use one vocabulary. No planning concept, metric, partner, approval, field test, or operating result is added.
- 继续保留临时边界、全部节点 G0、`not_fully_cleared`、0 现场审计、0 批准和 0 已知结果，并要求从最终包字节重新生成 PDF、权利台账和 manifest。
- Provisional geometry, all-G0 status, `not_fully_cleared`, zero field audits, zero approvals, and zero known results remain. PDFs, the rights ledger, and manifest must be regenerated from the final package bytes.

## v2.8 - 2026-08-10

**Differentiated key-area operating sections / 差异化重点区运行剖面**

- 重绘中英文重点区剖面，不再用同一骨架复刻三处重点区。众智园明确公众观察边、低风险测试花园环和维护/急停边；原点社区明确连续日常街、问题共创院、公共评议院和四个可撤节点；大钟寺明确四向步行、钟轨会客厅、人工服务台和静音休憩。
- Redrew the bilingual key-area sections so the three areas no longer repeat one generic skeleton. Zhongzhiyuan separates public observation, the low-risk test-garden loop, and the service/physical-stop edge; Origin Community separates the daily street, problem court, public-review court, and four removable nodes; Dazhongsi separates four-way walking, the Bell-Rail Commons, staffed desk, and quiet rest.
- 将每处的普通、验证、故障、恢复一套权威运行四态写入 `key-area-evidence-matrix.json`，共 3 组差异化剖面和 12 个 G0 概念状态；未来获批限域共测只作为进入验证态前的成熟度门，不另算运行态。每态记录日常基线、谁先让位、故障如何隔离、如何还场和重启门，不新增批准、现场测试、责任主体或运行成绩。
- Added one authoritative ordinary–verification–fault–recovery operating sequence per area to `key-area-evidence-matrix.json`: three differentiated sections and twelve G0 concept states. Any future approved bounded co-test is only a maturity gate before verification, not another operating state. Each state records the protected baseline, what yields first, fault isolation, restoration, and the restart gate; no approval, field test, accountable owner, or operating result is added.
- 同步双语主稿、指标、SVG/PNG、离线 HTML、A3/A0、manifest 与权利台账；临时边界、`not_fully_cleared`、0 现场核验和 0 已知结果边界保持不变。
- Synchronized the bilingual proposals, metrics, SVG/PNG, offline HTML, A3/A0, manifest, and rights ledger. Provisional geometry, `not_fully_cleared`, zero field checks, and zero known results remain unchanged.

## v2.7 - 2026-08-10

**T-02 G0 synthetic governance replay / T-02 G0 合成治理回放**

- 将既有 T-02 离线企业服务基线升级为严格机器合同，新增 10 个无个人信息合成夹具、零依赖 Node.js 22.x 回放器和确定性结果。默认与 `--check` 只读，只有显式 `--write` 写入结果；来源 ID 必须在冻结闭包内，未知字段、未知枚举和未知请求均 fail-closed。
- Upgraded the existing T-02 offline enterprise-service baseline into a strict machine contract with 10 PII-free synthetic fixtures, a zero-dependency Node.js 22.x runner, and a deterministic result. Default and `--check` modes are read-only; only explicit `--write` writes the result. Source IDs must remain in the frozen closure, and unknown fields, enums, and requests fail closed.
- 1 次合成治理回放取得 10/10 决策精确匹配；4/4 个不同的已声明停止事件均精确映射到各自恢复动作；13/13 负向变异控制覆盖样例/合同未知字段、枚举、合同回答模式漂移、来源闭包、禁采数据优先级、canonical RACI 闭包、现实服务授权与摘要计数篡改。该结果只证明 G0 合同逻辑可复放，不生成实质回答，也不调用模型、API 或现实服务。
- One synthetic governance replay produced 10/10 exact decision matches. All four distinct declared stop events map to their exact recovery actions, and 13/13 negative mutation controls cover unknown fixture/contract fields, enums, answer-mode drift, source closure, prohibited-data precedence, canonical RACI closure, real-service authorization, and summary-count tampering. The result proves only replayable G0 contract logic; it produces no substantive answer and calls no model, API, or real service.
- 回放证据同步至 G1-011、JZ-05/T-02、PARITY-002、假设、指标、矩阵、双语正文、离线 HTML、视觉首页、自检、agent 与权利披露。实质回答、模型/API/现实服务/现场交互、审批、已确认责任主体、现实独立复测、现实非 AI 同权与 G1 结果保持 0 或 unknown；当前门级仍为 G0，总体权利状态仍为 `not_fully_cleared`。
- Synchronized the replay evidence across G1-011, JZ-05/T-02, PARITY-002, assumptions, metrics, matrices, bilingual prose, offline HTML, visual homepages, self-check, agent provenance, and rights disclosures. Substantive answers, model/API/real-service/field interactions, approvals, confirmed accountable parties, real independent retests, real non-AI parity, and G1 outcomes remain 0 or unknown. The gate stays G0 and overall rights remain `not_fully_cleared`.

## v2.6 - 2026-08-10

**Source–asset–rights evidence loop / 来源—资产—权利证据闭环**

- 新增 `source-rights-evidence.schema.json` 与实例：29/29 条来源具有稳定反向指针，10 个仓库来源固定到审计 HEAD 的 Git object，4 个网页保留包外抓取摘要，15 个网页明确无内容摘要；缺失发布日期、原始格式或条款时保持 unknown，不以 URL 或文件名推断冒充核验。
- Added a schema and instance for source-rights evidence: all 29 sources have stable reverse pointers; 10 repository sources are fixed to Git objects at the audited HEAD, four web sources retain external capture digests, and 15 web sources explicitly have no content digest. Missing dates, original formats, or terms stay unknown rather than being promoted from locator inference.
- 仅对 `geometry/constraints.geojson` 的既有 120 个 OSM 要素补入 `source_id=OSM-CONTEXT`，不改坐标、图层、名称、way ID 或设计内容；element-level 记录保留署名，并明确固定查询与快照摘要缺失，`RIGHTS-OPEN-03` 继续为 P0 open。
- Added `source_id=OSM-CONTEXT` to the existing 120 OSM features in `geometry/constraints.geojson` without changing coordinates, layers, names, way IDs, or design content. Element-level records retain attribution and disclose the missing fixed query and snapshot digest; `RIGHTS-OPEN-03` remains P0 open.
- 保留原 5 个权利粗组作为兼容视图，并新增与最终 manifest 严格等集的 62 条逐文件记录，逐项串联来源、父资产、工具、嵌入组件、配方状态、审计状态、摘要与未决事项。manifest 和 ledger 两个不可自引用项使用 null + 原因，其余摘要必须等于最终 manifest。
- Retained the five coarse rights groups as a compatibility view and added 62 file-level records equal to the final manifest path set, linking sources, parents, tools, embedded components, recipe state, review state, digests, and open items. Manifest and ledger use null plus explicit self-reference reasons; every other digest must equal the final manifest.
- 补充稳定工具 ID 与输出映射；更正字体事实为“四份 PDF 内含 Noto 子集程序、A3 引用未嵌入 Helvetica、SVG 转 PNG 的实际解析字体未知”，不再把“未提供独立源字体文件”误写成“包内没有字体二进制”。
- Added stable tool IDs and output mappings. Corrected the font facts to embedded Noto subset programs in all four PDFs, unembedded Helvetica references in A3, and unknown concrete font resolution during SVG-to-PNG rasterization; no longer conflates absence of a standalone source-font file with absence of embedded font programs.
- 总体状态继续为 `not_fully_cleared`，独立逐文件清权审计完成数仍为 0，P0 `RIGHTS-OPEN-01/02/03` 全部 open，公共或专业复用继续 `blocked_pending_terms_and_audit`。任何 schema、路径覆盖或验证 PASS 只表示披露可审计，不表示许可已取得。
- Overall status remains `not_fully_cleared`, completed independent file-level clearance audits remain 0, P0 `RIGHTS-OPEN-01/02/03` all remain open, and public or professional reuse remains `blocked_pending_terms_and_audit`. Schema, path coverage, or validation PASS proves auditability only, not permission.

## v2.5 - 2026-08-10

**Key-area spatial-reading integration / 重点区空间读法整合**

- 新增中英文可编辑 SVG 与确定性 PNG，以既有 `PROV` / `PUBLIC` / `I-GATE` / `AI-ZONE` / `SCENE` ID 深化三处临时重点区，并展示三层关系、连续非 AI / 无障碍路径、人工交接、停止/恢复、可撤回叠层与四种模式。
- 在双语正文和离线视觉首页配对整合两组图件；每处重点区仅新增一段“图面读法 / 尚缺资料”，不重复完整矩阵。
- All bilingual editable SVG and deterministic PNG deepen the three provisional areas using only existing `PROV` / `PUBLIC` / `I-GATE` / `AI-ZONE` / `SCENE` IDs, with three-layer relationships, continuous non-AI / accessible routes, staffed handoff, stop/recovery, removable overlays, and four modes.
- Both figure pairs are integrated into the bilingual proposal and offline visual indexes; each key area gains only one reading/missing-evidence paragraph, without duplicating the complete matrix.
- 所有图面仍不按比例、临时且为 G0；批准、现场审计、测试执行和已知结果均为 0，权利状态仍为 `not_fully_cleared`。geometry、metrics 与规划内容未改；未新增项目、节点、路线、地块、伙伴、批准、现场或运营结果。
- All diagrams remain not to scale, provisional, and G0; approvals, field audits, test executions, and known results remain 0, and rights remain `not_fully_cleared`. Geometry, metrics, and planning content are unchanged; no projects, nodes, routes, parcels, partners, approvals, field results, or operating results are added.

**PDF and package-evidence integration / PDF 与包证据整合**

- 将八组双语 PNG 展示对（包含新增的重点区剖面展示对）与两组双语 SVG 可编辑源对纳入最终包合同；manifest 现覆盖 60 个路径/59 个非 manifest 内容文件，权利台账按相同路径集合逐项归组。新增 SVG 只补足两组重点区图件的可编辑源，不代表其他 PNG/PDF 已具有完整可编辑布局源，也不将 `not_fully_cleared` 或 0 次独立逐文件审计升级。
- Integrated eight bilingual PNG display pairs, including the new key-area-sections pair, plus two bilingual SVG editable-source pairs into the final package contract. The manifest now covers 60 paths / 59 non-manifest content files, and the rights ledger groups the identical path set once each. These SVGs provide editable sources only for the two key-area figure pairs; they do not complete editable-layout coverage for the other PNG/PDF outputs or upgrade `not_fully_cleared` and 0 independent file-level audits.
- 用最终正文和八组 1800×1100 图件离线重生四份 PDF：为避免整板缩放掩盖小字，中文/英文 A3 将每组图件拆为三个带 30px 重叠的 620×892 竖向细节页，分别为 33/36 页；双语 A0 各 8 页并保留整板总览。A3 两种语言各含 8 组/24 个裁片且不再嵌入 1800×1100 整图，有效最小文字指标分别为 10.865pt/9.297pt，live text 不低于 9pt，443/443 个逻辑块可搜索。最终 pass A 与独立 pass B 在新 Python 进程运行且四份 PDF 逐文件字节相同；SHA-256 分别为 `a1364afa…73d2`, `2ac3cc0c…e7dd`, `77bcce2d…`, `53ac76d1…`。生成工具为 Python 3.13.12、ReportLab 5.0.0、fontTools 4.63.0、PyMuPDF 1.27.2.3 与 Pillow 12.2.0；页面、顺序、字体、裁片覆盖和内容边界 QA 覆盖全部 85 页。
- Regenerated all four PDFs offline from the final narratives and eight 1800 × 1100 figure pairs. To prevent whole-board scaling from hiding small evidence text, every figure in the Chinese/English A3 booklet is split into three 620 × 892 portrait detail panels with 30 px overlap, producing 33/36 pages; both A0 languages retain eight whole-board overview pages. Each A3 language now contains 8 sets/24 crops and no embedded 1800 × 1100 whole-board image; the minimum effective text metrics are 10.865 pt/9.297 pt, live text stays at or above 9 pt, and 443/443 logical blocks are searchable. Final pass A and independent pass B ran in fresh Python processes and all four PDFs are byte-identical file by file; their SHA-256 values begin `a1364afa…73d2`, `2ac3cc0c…e7dd`, `77bcce2d…`, and `53ac76d1…`. The actual toolchain was Python 3.13.12, ReportLab 5.0.0, fontTools 4.63.0, PyMuPDF 1.27.2.3, and Pillow 12.2.0; page, order, font, crop-coverage, and content-bound QA covered all 85 pages.
- A3/PDF 文字由旧 Arial Unicode MS 路径替换为 `NotoSansSC-VF.ttf` 的确定性 400/700 内存实例与嵌入子集；记录源版本 `2.04;241114210130;non-release`、SHA-256 `76314658…074a` 和本地 name table 的 SIL OFL 1.1 声明，且不随包分发字体二进制。该元数据记录不等于独立许可合规结论。
- Replaced the prior Arial Unicode MS path with deterministic in-memory 400/700 instances and embedded subsets from `NotoSansSC-VF.ttf`; recorded source version `2.04;241114210130;non-release`, SHA-256 `76314658…074a`, and the local name table's SIL OFL 1.1 declaration, without shipping the font binary. This metadata record is not an independent license-compliance conclusion.
- 本轮只整合展示与包证据；只读 Git 对比确认 `geometry/*.geojson` 与 `metrics.json` 的 Git blobs 未变。最终 PR head 的 trusted CI 与维护者人工内容、视觉、版权审查仍未发生，不能由本日志预先勾选。
- This increment integrates presentation and package evidence only; a read-only Git comparison confirms that the Git blobs for `geometry/*.geojson` and `metrics.json` did not change. Trusted CI on the final PR head and maintainer human content, visual, and rights reviews have not occurred and are not pre-claimed here.

## v2.4 - 2026-08-09

**Skill contract alignment and publication QA / Skill 合同对齐与发布质量复核**

### 已采纳 / Accepted

- 将 #998 的三处重点区证据交叉表纳入同一完整增量；三条记录只证明映射字段齐全，不证明现场覆盖、责任主体确认、批准、测试或结果。
- 按最新投稿 skill 补齐必需指标族：九类用地代码面积、三期面积、三处临时重点区面积；建筑密度与道路比例因正式资料缺失而明确保持待补，不用体量原型或道路中心线代替。
- 同步主线 `provisional_boundaries_basis.md` 的空间不确定性：OSM 背景核查与临时总体范围的 0% 相交和约 412.5 m 最近距离不裁决边界正误，也不触发非官方改线。
- 将当时已有的双语主稿、HTML、视觉首页、A3/A0 和文字图件在 manifest 中全部标为必交；本轮新增重点区剖面 PNG 对与两组 SVG 可编辑源对后，最终合同为八组双语 PNG 展示对、两组双语 SVG 可编辑源对，中英文主张、指标和限制保持配对。
- 补齐来源采集方法、时空覆盖、复用边界、转换和已知限制；中央来源使用稳定 ID，来源新鲜度策略仍不把访问日期写成完成刷新审计。
- 重排中英文 A0，使每张 1800×1100 核心板图占据 A0 主要安全版心；图件放大不提升数据精度或现实成熟度。
- 刷新 agent/toolchain 披露和 checked-in `self_check.json`，消除旧包体积、旧指标数量和旧变更清单快照。

### 未采纳 / Not adopted

- 未新增第四套“全包总矩阵”；现有 compliance、standard、design-depth、pilot-readiness 与 key-area crosswalk 已分别承担任务、专业深度、交接门和重点区证据职责，重复矩阵会增加漂移风险。
- 未将同行方案的具体命名、代码、JSON 结构或图形资产复制进本包；只使用公开评审中可复述的抽象方法，并保留各自许可边界。
- 未把临时 geometry、公开背景、机器 PASS、字段覆盖率或本地生成记录写成官方红线、法定指标、合作承诺、现场成果或发布许可。

### 仍待外部完成 / Still external or pending

- 官方 polygon、现状测绘、权属、控规、道路/铁路/水务/文保/市政/消防条件到位后，完成差异比对与 EPSG:4548 全量复算。
- 责任主体、审批、参与者保护、场地时窗和独立复测条件成立后，才可执行 G1；当前全部场景仍为 G0，现实执行与已知结果均为 0。
- 权利状态继续为 `not_fully_cleared`；完整 `COMMUNITY-DISPLAY-ONLY` 条款、OSM ODbL 处理、PDF 字体与工具输出、Logo/商标和可编辑源仍需独立复核。
- 当前增量的本地门槛与最终 trusted `submission-validation` 必须在最终字节、最终 manifest 和最终 PR head 上重新运行；不得继承历史快照的勾选状态。

## English summary

- Consolidates the #998 key-area crosswalk into one complete increment without treating documentation coverage as field evidence.
- Completes required metric families while keeping unsupported density, road, statutory, and operational values pending.
- Carries the main-branch boundary cross-check as uncertainty evidence only; it neither proves an error nor authorizes a replacement boundary.
- Makes every bilingual counterpart required, normalizes source provenance, enlarges the A0 boards to a usable safe frame, and refreshes tool/self-check records.
- Adds no approval, partner, funding, construction, operation, test, rights-clearance, or trusted-CI result. All scenes remain G0 and public/professional reuse remains blocked pending the stated rights work.
