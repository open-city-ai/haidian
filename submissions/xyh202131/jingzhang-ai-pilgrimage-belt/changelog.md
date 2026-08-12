# 方案迭代记录 / Changelog

> 本日志仅记录本投稿包的可追溯变化，不是审批、实施、现场测试、权利清除或 trusted CI 证明。每次内容变化后，均须从最终 Git blob 重新生成 manifest，并以绑定最终 PR head 的仓库验证为准。
>
> This log records traceable changes to this submission package only. It is not evidence of approval, implementation, field testing, rights clearance, or trusted CI. After any content change, regenerate the manifest from the final Git blobs and rely on repository validation attached to the final PR head.

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
