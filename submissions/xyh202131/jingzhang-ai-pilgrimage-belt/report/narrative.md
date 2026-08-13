# 投稿包内验收参考 / Package-local acceptance reference

> 本文件只服务于 `submissions/xyh202131/jingzhang-ai-pilgrimage-belt/`，是投稿内可复制参考，不是仓库级 reusable template、公共 PR template 或维护者规范。复制到其他提交或后续 PR 时，不得继承任何 `[x]`。
>
> This file applies only to `submissions/xyh202131/jingzhang-ai-pilgrimage-belt/`. It is a package-local copy reference, not a repository-level reusable template, public PR template, or maintainer policy. No `[x]` may be inherited when it is copied into another submission or later PR.

## Round 18 public signal interface and readable civic timetable / 第 18 轮公共信号界面与可读时刻表

第 18 轮在第 17 轮 PR #2369 合并并进入 `origin/main@5a284d177c9c6a7719378711d67514ac6c709f76` 后开始；开始编辑前，同一投稿包没有开放竞争 PR，GitHub 与 Git 作者身份均为 `xyh202131`。本轮不增加新品牌、场景、项目或规划方向，只把既有入口、时段、状态、人工、来源、退出六类城市信号，落实为三座换轨场在普通、验证、故障、恢复四态下的公共界面。

Round 18 began after Round 17 PR #2369 merged into `origin/main@5a284d177c9c6a7719378711d67514ac6c709f76`. Before editing, no open PR competed for this package, and both GitHub and Git author identities were `xyh202131`. The round adds no brand, scene, project or planning direction. It turns the inherited entry, time, state, human, source and exit signals into a public interface for ordinary, proof, failure and recovery at the three switchyards.

三处载体保持不可互换：众智园的连续观察绕行始终成立，设备与验证只在隔离边旁侧出现，故障只隔离验证边，恢复先核绕行；原点社区的一街两院保持居民日常，一次只候选一个可撤回节点，故障和恢复只落到受影响节点；大钟寺的四向步行保持通勤连续，一厅一台退到流线旁侧，故障关闭服务支线而不关闭步行交叉，恢复先核通勤。这里的载体、入口和状态都是设计关系，不是既建设施、现状街院、车站锚点、精确位置或场地批准。

The carriers remain non-interchangeable. Zhongzhiyuan keeps the continuous observation bypass while equipment and proof stay at an isolated side edge; failure isolates that edge and recovery checks the bypass first. Origin keeps one street and two courts for resident daily life; only one withdrawable node may become a candidate, and failure/recovery stay with the affected node. Dazhongsi protects four-way commuting while the hall and desk remain off-route; failure closes the service siding rather than the walking crossing, and recovery checks commuting first. These carriers, entrances and states are design relationships—not built facilities, existing street/court records, station anchors, exact locations or site approvals.

双语离线 visual 在 `#public-signal-interface` 提供三处 × 四态的选择器，但 JavaScript 只从同页 12 行静态 HTML 表读取六个字段，不联网、不存储、不采集、不调用 AI。选择器使用原生按钮；状态同时用编号、文字和线型表达，颜色只辅助。禁用 JavaScript 后，默认六问和 12 行合同仍全部可读。该可访问性和交互只是包内表达意图，不是独立认证、人工在线或运营系统。

The bilingual offline visual provides a three-place × four-state selector at `#public-signal-interface`, but JavaScript only reads six fields from the same twelve-row static HTML table. It makes no network request, stores and collects nothing, and calls no AI. Native buttons are used; numbers, words and line styles carry state while colour is supplementary. Without JavaScript, the default six questions and all twelve rows remain readable. This accessibility and interaction work is package-level presentation intent, not independent certification, staffed presence or an operating system.

结构化闭环位于 `visual/assets/key-area-evidence-matrix.json#public_signal_interface_round18` 与 `visual/assets/site-grounding-register.json#public_signal_interface_round18`，并回链非 AI 同权、全年运营、失败治理、可逆恢复和三框场地读取。真实起止时段、班次、位置、尺寸、责任接受与表现保持 `unknown`；人工在线、已确认窗口、现场测试、现实事故、恢复验收、批准与 GO 决定均为 0。geometry、`metrics.json`、12 场景、8 项目、3 重点区、全部 G0、临时边界、NO-GO 与 `not_fully_cleared` 均未改变。

Structured closure sits in `visual/assets/key-area-evidence-matrix.json#public_signal_interface_round18` and `visual/assets/site-grounding-register.json#public_signal_interface_round18`, backlinking non-AI parity, year-round operations, failure governance, reversible restoration and three-frame site reading. Real times, rosters, locations, dimensions, accepted duties and performance remain `unknown`; staffed presence, confirmed windows, field tests, real incidents, restoration acceptances, approvals and GO decisions are all 0. Geometry, `metrics.json`, 12 scenes, 8 projects, 3 key areas, all-G0 status, provisional boundaries, NO-GO and `not_fully_cleared` do not change.

四份出版物在两个新 Python 进程中用固定顺序、固定元数据、`invariant=1`、页压缩和同一静态字体参数重建，逐文件字节一致。中英文 A3 各 14 页、A0 各 8 页，共 44 页；第 18 轮公共信号图进入一页 A3 和最终 A0 公共信号/专业交接板。manifest、逐文件权利台账和实际文件集合目标为 140/140/140；独立逐文件清权仍为 0。确定性与版面 PASS 只证明当前文件可复核，不证明现场、专业、批准、运营、G1 或权利许可。

Two fresh Python processes rebuilt all four publications with fixed order, fixed metadata, `invariant=1`, page compression and the same static-font parameters; every file was byte-identical. Each language retains fourteen A3 pages and eight A0 pages, 44 total. The Round 18 signal figure enters one A3 page and the final A0 public-signal/professional-handoff board. Manifest, file-rights and actual-file sets target 140/140/140, with 0 completed independent file-level rights audits. Determinism and layout PASS prove only that current files can be reviewed; they prove no field condition, professional acceptance, approval, operation, G1 status or rights licence.

| 文件 / File | 页数与版式 / Pages and format | SHA-256 |
|---|---:|---|
| `drawings/a3-booklet.pdf` | 14 / A3 landscape | `1fd03fbdaae9946d908facd2215e6c164ca237015b250a1fd8bf5d05cbca0013` |
| `drawings/a3-booklet.en.pdf` | 14 / A3 landscape | `3941565853498f0a909e22e4bbde08fff97f67d84d0b6921c98b2bebafdc767f` |
| `drawings/a0-boards.pdf` | 8 / A0 landscape | `6b093ff0b1bcb7cafae8f4fa888a91b3f0ae8ea8e66eb96ccd904d73d5204c02` |
| `drawings/a0-boards.en.pdf` | 8 / A0 landscape | `49b7a49ebd14e2cbc2110f801d9f85038ec0c9140875f67f4c45ee15a58bdf79` |

## Round 17 site grounding and expression reduction / 第 17 轮场地锚定与表达减重

第 17 轮只重组评审阅读和证据责任，不改变方案实体。前台现在按“公开背景定位—临时设计容器—可深化设计关系”三框分读，禁止套准成一张现实总图：背景只说明报道方向，`PROV-SITE-001` / `PROV-KEY-*` 只组织资料接收与概念关系，双轨只表达普通任务、旁侧验证、人工交接、停止、恢复和退出。Issue #846 记录的 OSM 背景 0% 相交／约 412.5m 差异只作为复核报警，不是几何平移依据；Issue #1029 尚未证明 `PROV-KEY-003` 的大钟寺车站、道路、地块或建筑锚点，因此图中“四向”只表示服务与移动关系。geometry、`metrics.json`、12 个场景、8 个项目、三处重点区、G0、公共权利与 `not_fully_cleared` 均不变；现场资料、现场结果、GO、批准和新增责任接受均为 0。

Round 17 reorganizes jury reading and evidence responsibility only; it changes no plan entity. The front stage now separates published background orientation, the provisional design container, and design relationships, and forbids their co-registration as one site-truth map. Background supports reported orientation only; `PROV-SITE-001` / `PROV-KEY-*` organize intake and conceptual relationships only; Twin-Track expresses ordinary tasks, adjacent proof, staffed handover, stop, recovery and exit only. The Issue #846 OSM-background discrepancy—0% overlap and approximately 412.5m—remains a review alarm, not a geometry-shift instruction. Issue #1029 does not establish a Dazhongsi station, road, parcel or building anchor for `PROV-KEY-003`; “four-way” therefore denotes service and movement relationships only. Geometry, `metrics.json`, 12 scenes, 8 projects, three key areas, G0, public rights and `not_fully_cleared` remain unchanged; field inputs, field results, GO, approval and newly accepted duties remain 0.

双语 visual 入口采用 30 秒／3 分钟／15 分钟漏斗；无锚点打开不再自动写入 `#step-1` 或跳过首屏，六项主导航位于入口后，完整证据库折叠保留。五组重建核心图分别承担三框场地读取、36 个功能信封／三类空间责任、三处不可互换原型、普通慢行与维护净空、包内计数与现实零状态；15 组包内自编双语 SVG 源和 1 组仓库临时衍生 SVG 源均保留，PNG 只作离线显示导出。移动端在图内横向浏览，并由紧邻三框卡片提供等价文字读法；表格可键盘聚焦并显式声明列标题。上述可访问性措施是设计意图，不是独立认证。

The bilingual visual entry uses a 30-second / 3-minute / 15-minute funnel. An unanchored load no longer writes `#step-1` or skips the first view; six primary links follow the entry, while the full evidence library remains expandable. Five rebuilt core figures carry distinct duties: three-frame site reading; 36 functional envelopes and three spatial duties; three non-interchangeable prototypes; ordinary movement and maintenance clearance; and package counts versus reality-zero evidence. Fifteen package-authored bilingual SVG pairs and one repository-provisional pair remain checked in, with PNG used only as offline display exports. Small screens scroll within the figure and receive an adjacent equivalent three-card text reading; tables are keyboard-focusable with explicit column headers. These accessibility measures are design intent, not independent certification.

四份出版物由两个新 Python 进程以固定输入顺序、固定元数据、`invariant=1`、页压缩和本机 `NotoSansSC-VF.ttf` 静态 500/700 字重重建，逐文件字节一致。中英文 A3 各 14 页、A0 各 8 页，共 44 页；PyMuPDF 全页检查得到空白页 0、替换字形 0、越界文本块 0，四份 PDF 的可搜索文字跨度仅使用 `NotoSansSC-Medium` / `NotoSansSC-Bold`。本地联系表和关键页视觉复核未见裁切；出版 QA 只证明文件可读和当前环境可复现，不证明现场、批准、建设、运营、G1 或清权。

Two fresh Python processes rebuilt all four publications with fixed input order, fixed metadata, `invariant=1`, page compression, and static 500/700 weights from local `NotoSansSC-VF.ttf`; every file was byte-identical across runs. Each language has a 14-page A3 booklet and an 8-page A0 set, for 44 pages total. Full PyMuPDF inspection found 0 blank pages, 0 replacement glyphs, and 0 out-of-page text blocks; searchable spans in all four PDFs use only `NotoSansSC-Medium` / `NotoSansSC-Bold`. Local contact sheets and targeted page renders showed no clipping. Publication QA proves file readability and current-environment reproducibility only; it proves no field condition, approval, construction, operation, G1 status or rights clearance.

`visual/assets/site-grounding-register.json#jury_reading_contract.package_validation_contract` 固化当前包的专项回归期望：10 个 geometry／metrics 输入哈希、389 个唯一空间 ID、12 场景／8 项目／3 重点区、44 页出版、双语浏览器与无 JavaScript 降级、140 项清单／权利路径和 T02 精确回放。它可供最终提交或后续轮次重放，只验证投稿文件和表达合同；即使全部通过，现场调查、专业验收、批准、运营和清权仍为 0 或未完成。

`visual/assets/site-grounding-register.json#jury_reading_contract.package_validation_contract` freezes current-package regression expectations: ten geometry/metrics input hashes; 389 unique spatial IDs; 12 scenes, eight projects and three key areas; 44 publication pages; bilingual browser and no-JavaScript fallback behavior; 140 manifest/rights paths; and exact T02 replay. It can be replayed against the final commit or a later round, but validates package files and presentation contracts only. A complete PASS still leaves fieldwork, professional acceptance, approval, operation and rights clearance at 0 or incomplete.

| 文件 / File | 页数与版式 / Pages and format | SHA-256 |
|---|---:|---|
| `drawings/a3-booklet.pdf` | 14 / A3 landscape | `44541e0ae62faad8dd0e5180f92c6197788ced3f885c043283bb1b90cef98eb9` |
| `drawings/a3-booklet.en.pdf` | 14 / A3 landscape | `0ae1b081157bc940933b04dd24cbfe3782ad4b7a93f7f9e1ad6e9254c4307d5c` |
| `drawings/a0-boards.pdf` | 8 / A0 landscape | `66a325709cfc36de7a9e8c86c7beafce645dca630b94dcd0d1f4e0ce4316c0e4` |
| `drawings/a0-boards.en.pdf` | 8 / A0 landscape | `103918c52bed55325c1fa8c98de803afafaa86ca5fcaaac23bd59758791c33b3` |

## 方案叙事摘要 / Narrative summary

AI 朝圣·铁轨新生带当前方案将百年京张定义为一条可审计的 AI 公共创新生产线。小月河场景赋能翼提出真实问题，AI 原点社区共创，众智园验证，大钟寺发布与服务，中关村科技服务翼提供建议性的合规与转化支持，公众反馈和失败证据回流下一年度。

第 2 轮不另起一套规划，而把三处重点区深化为不可机械复制的公共空间原型：众智园以平行验证庭、实体设备隔离和维护/急停边保护公众观察；原点社区以一街两院四节点、无屏共学和同意撤回保护居民日常；大钟寺以四向步行、一厅一台、来源纠错和人工同任务服务保护通勤。平面、关系剖面、首层界面、连续非 AI / 无障碍意图线、四步旅程、可拆构件、普通—验证—故障—恢复四态和场所恢复验收回链同一结构化合同。全部节点仍处于 G0；临时 geometry、字段覆盖、本地 PASS 与生成记录均不构成审批、现场结果或清权证明。

Round 2 adds no competing plan. It deepens the three key areas into public-space prototypes that cannot be mechanically copied. Zhongzhiyuan protects public observation through a parallel proof court, physical equipment isolation, and a service/stop edge. Origin Community protects resident daily life through one street, two courts, four nodes, screen-free learning, and consent withdrawal. Dazhongsi protects commuting through four-way walking, one hall/one desk, source correction, and same-task staffed service. Plans, relationship sections, ground-floor interfaces, continuous non-AI/accessibility intent, four-step journeys, removable components, ordinary–proof–fault–recovery states, and place-restoration acceptance link to one structured contract. Every node remains G0; provisional geometry, field coverage, local PASS results, and generation records are not approval, field performance, or rights-clearance evidence.

## 第 12 轮普通生活空间场景册 / Round 12 ordinary-life spatial scenes

第 12 轮不增加场景、项目、几何或治理合同，而为三处既有原型增加一层普通人可直接理解的人尺度入口。一张无文字合成三联图把众智园的普通旁路与平行验证庭、原点社区的无屏居民街与两院、大钟寺的连续通勤与旁侧人工服务并置；技术、活动、围挡、桌椅和人工窗口均不得封闭连续日常路径。中英文正文、离线 visual、双语长描述和 `ordinary-life-media-register.json` 以同一顺序解释普通—验证—故障—恢复：普通任务先独立成立，未来验证只作路径外、限时、有人负责的可拆叠层；故障时停叠层、保旁路；恢复先还场，独立复核未闭合就保持 G0、停止或退役。

Round 12 adds no scene, project, geometry, or governance contract. It gives the three existing prototypes a human-scale entry that an ordinary viewer can understand directly. One text-free synthetic triptych aligns Zhongzhiyuan’s ordinary bypass and parallel proof court, Origin Community’s screen-free resident street and two courts, and Dazhongsi’s continuous commute and off-route staffed service. Technology, activities, enclosure, furniture, and staffed points never close the continuous daily path. The bilingual proposals, offline visual, long description, and `ordinary-life-media-register.json` use the same ordinary–proof–fault–recovery order: the ordinary task works independently first; a future proof layer is off-route, time-bounded, accountable, and removable; a fault stops the overlay and retains the bypass; recovery restores the place first, and remains at G0, stopped, or retired if independent review does not close.

该图由 OpenAI 内置图像生成工具于 2026-08-13 从本包自编文本提示生成，未输入现场照片、地图截图、私人图像、可识别人物、Logo 或第三方视觉；选定输出只用 Pillow 转为 WebP，没有构图编辑，检查时无 EXIF/GPS。图中人物为不可识别合成角色，不代表真实参与、同意或调研。真实照片、确认视点、现场观察、获批构件、运营交互、确认无障碍结果和确认恢复结果均为 0；位置、比例、尺寸、材料、消防、铁路保护、市政、班次、建设、运行和审批不能从图像推断。完整模型输出条款和独立逐文件权利审计未完成，权利继续 `not_fully_cleared`，公共或专业复用继续阻断。

The image was generated on 13 August 2026 with the OpenAI built-in image-generation tool from a package-authored text prompt. No site photograph, map screenshot, private image, identifiable person, logo, or third-party visual was supplied. Pillow only converted the selected output to WebP without compositional editing; no EXIF/GPS was present at inspection. The people are non-identifiable synthetic figures and represent no real participation, consent, or research. Real photographs, confirmed viewpoints, field observations, approved components, operational interactions, confirmed accessibility results, and confirmed restoration results remain 0. No location, scale, dimension, material, fire, railway-protection, municipal, shift, construction, operation, or approval conclusion may be inferred. Complete model-output terms and independent file-level rights review remain incomplete; rights stay `not_fully_cleared`, and public or professional reuse remains blocked.

出版固定点由两个新的 Python 进程重建，四份 PDF 逐文件字节一致：中文/英文 A3 为 68/72 页，中英文 A0 各 17 页，共 174 页；全页检查得到空白页 0、替换字形 0、越界文本块 0，并在四份出版物中定位到普通生活场景入口。SHA-256：中文 A3 `6ea3fe812ab02fac3390f1fd7d5699ff92d3f64c945cbb9eb72d95f1a622be86`，英文 A3 `ee4f5a69d105af65ed9a79c731c920453d55a4021c8c3d7b51da3595fa1706af`，中文 A0 `d15aa4a4ed2b4a4d9a9c1047b7e85eb0807eec4a7bfd62529a793149ad43f3cf`，英文 A0 `ca1304e2df189ac9b29ddc9d2b9e2717ca93bf5159b9138fc223d99d049fb8e4`。出版 QA 只证明文件可读和可复现，不证明现场、批准、建设、运营、G1 或清权。

Two fresh Python processes produced file-identical four-PDF sets. The Chinese/English A3 booklets contain 68/72 pages, and both A0 sets contain 17 pages, for 174 pages total. Full-page QA found 0 blank pages, 0 replacement glyphs, and 0 out-of-page text blocks, and located the ordinary-life scene entry in all four publications. SHA-256: Chinese A3 `6ea3fe812ab02fac3390f1fd7d5699ff92d3f64c945cbb9eb72d95f1a622be86`; English A3 `ee4f5a69d105af65ed9a79c731c920453d55a4021c8c3d7b51da3595fa1706af`; Chinese A0 `d15aa4a4ed2b4a4d9a9c1047b7e85eb0807eec4a7bfd62529a793149ad43f3cf`; English A0 `ca1304e2df189ac9b29ddc9d2b9e2717ca93bf5159b9138fc223d99d049fb8e4`. Publication QA proves file readability and reproducibility only; it proves no field condition, approval, construction, operation, G1 status, or rights clearance.

## 第 2 轮三座换轨场增量 / Round 2 three-switchyard increment

本轮选择六个内聚工作包：众智园平行验证庭与设备隔离、原点社区一街两院四节点与无屏撤回、大钟寺四象限步行与一厅一台、三处连续非 AI / 无障碍意图线与人工交接、差异化可拆构件与夜间静音、四态与场所恢复验收及证据回链。`key-areas` 现在承担普通状态平面、首层公共界面和四步旅程，`key-area-sections` 承担三种关系剖面、四态和恢复门；两组均有中英文 SVG 可编辑源和 PNG 展示导出。`visual/assets/key-area-evidence-matrix.json#round2_spatial_deepening` 逐处记录唯一规划问题、连续路径、人工交接、可拆构件、不可复制组件、未知决策字段和恢复检查。

Round 2 selects six cohesive work packages: Zhongzhiyuan’s parallel proof court and equipment isolation; Origin Community’s one street, two courts, four nodes, and screen-free withdrawal; Dazhongsi’s four-quadrant walk and one hall/one desk; continuous non-AI/accessibility intent and staffed handoff across all three; area-specific removable components and night-time quiet; and four states, place-restoration acceptance, and evidence backlinks. `key-areas` now carries ordinary-state plans, ground-floor public interfaces, and four-step journeys, while `key-area-sections` carries three relationship sections, four states, and recovery gates; both retain bilingual editable SVG and PNG display counterparts. `visual/assets/key-area-evidence-matrix.json#round2_spatial_deepening` records one planning question, continuous path, staffed handoff, removable components, non-copyable elements, unknown decision fields, and restoration checks for each place.

反证边界保持显式：图中体量只是关系原型，不是现状建筑；大钟寺四向只表示待核到达关系，`PROV-KEY-003` 不构成车站、道路、铁路边界或首层锚点；绿色路径是无障碍设计意图，不是现场合格证明；恢复验收是未来责任角色的概念检查表，不是场地批准。geometry、场景编号和 metrics 均不因本轮图面深化而改变，所有现场依赖值保持 `unknown`，权利继续 `not_fully_cleared`。

The counter-evidence boundary remains explicit: massing is a relationship prototype, not an existing-building record; Dazhongsi’s four directions are pending-verification arrival relations, and `PROV-KEY-003` is not a station, road, railway-boundary, or ground-floor anchor; the green route is accessibility design intent, not proof of field compliance; and restoration acceptance is a future accountable-role checklist, not site approval. Geometry, scene IDs, and metrics do not change because of this drawing refinement, all field-dependent values remain `unknown`, and rights remain `not_fully_cleared`.

## 第 4 轮非 AI 优先增量 / Round 4 non-AI-first increment

第 4 轮把非 AI 从故障备用升级为前台公共空间与服务主路径。`JZ-NON-AI-PARITY-V2` 固定七项未来服务窗口不得删除的设计权利：无需账户或扫码、完整非 AI 路径、连续无障碍意图、人工服务与交接、同意可撤回、申诉与纠正、无屏与安静。主路径是纸面/口头任务—无屏等候—双入口人工台—同一基本任务—投诉/撤回/纠正—不依赖技术离开；AI 仅在易懂披露和单独自愿同意后作为可选支线，并汇入同一结果、费用规则、责任队列和停止恢复链。“永久”不表示三处当前已有服务点、开放时段、人员或批准。

Round 4 promotes non-AI from a failure fallback to the primary front-stage public-space and service route. `JZ-NON-AI-PARITY-V2` fixes seven design rights that cannot be removed from a future offered service window: no account or QR code, a complete non-AI path, continuous accessibility intent, staffed service and handoff, consent withdrawal, appeal and correction, and screen-free quiet. The primary route is paper/oral task–screen-free waiting–dual-entry staffed desk–same basic task–complaint/withdrawal/correction–technology-free exit. AI is an optional branch only after plain-language disclosure and separate voluntary consent, and rejoins the same outcome, cost rule, accountable queue, and stop/recovery chain. “Permanent” does not claim that any of the three places currently has a service point, opening window, staff assignment, or approval.

三处服务接口不机械复制：众智园把连续绕行、实体状态、人工接管和设备隔离连成恢复链；原点社区把连续日常街、无屏等候、纸面/口头问题与撤回、居民日常恢复连成服务链；大钟寺把四向步行、实体来源状态、双入口人工台和来源/队列纠错连成通勤旁侧服务链。老年人、残障与行动不便者、低数字素养者、无账户或无智能设备者分别建立未来分母、记录字段、未知阈值和停止信号，不得被总体平均掩盖。确认运营主体、确认人员、现实服务交互、已知群体结果、现实批准和运营均为 0；现场点位、时段、无障碍合规、样本、阈值、投诉与还场表现均保持 unknown。geometry 和 SCENE/JZ/T 主编号不变，全部场景保持 G0，权利保持 `not_fully_cleared`。

The three service interfaces are not mechanical copies. Zhongzhiyuan links a continuous bypass, physical status, staffed takeover, and equipment isolation into one recovery chain. Origin links the continuous daily street, screen-free waiting, paper/oral issue and withdrawal, and restoration of resident daily use. Dazhongsi links four-way walking, physical source status, a dual-entry staffed desk, and source/queue correction beside commuting. Older people, disabled and reduced-mobility users, low-digital-literacy users, and people without an account or smart device each receive a future denominator, record fields, unknown thresholds, and stop signals; no overall average may hide exclusion. Confirmed operators, confirmed staff, real service interactions, known group results, real approvals, and operations all remain 0. Service points, windows, accessibility compliance, samples, thresholds, complaint performance, and place restoration remain unknown. Geometry and primary SCENE/JZ/T IDs are unchanged, every scene remains G0, and rights remain `not_fully_cleared`.

## 第 5 轮 AI 城市代谢增量 / Round 5 AI urban-metabolism increment

第 5 轮为既有十二场景建立 `JZ-URBAN-METABOLISM-V1`，不新增场景、项目、几何或成熟度。每本资源护照同时保留算力、能源、设备材料、数据、人工复核、供应商依赖、失败与退出成本，并把服务器、边缘、网络、终端、传感/显示/固定件、人工与非 AI 对照、场所无障碍/安静/恢复纳入完整系统边界。众智园、原点社区和大钟寺分别显示设备隔离、居民撤回和通勤/来源维护等不同负担；七类字段只复用审计语法，三处不复制同一退出动作。

Round 5 establishes `JZ-URBAN-METABOLISM-V1` for the twelve existing scenes without adding a scene, project, geometry, or maturity. Each resource passport keeps compute, energy, equipment/material, data, human review, vendor dependency, and failure/exit cost together, and extends the whole-system boundary across server, edge, network, end device, sensing/display/fixings, staffed and non-AI comparisons, and place accessibility/quiet/restoration. Zhongzhiyuan, Origin Community, and Dazhongsi expose different equipment-isolation, resident-withdrawal, and commute/source-maintenance burdens. The seven fields reuse an audit grammar; the three places do not copy one exit action.

五类显式状态为 `not_applicable`、`not_measured`、`external_confirmation_required`、`not_yet_authorized` 和 `not_fully_cleared`。任何强度比较前必须关闭任务分母和完整边界；任何继续决定前还必须关闭来源、责任、同任务非 AI 基线、供应商导出/维修/退出、组件与数据去向、普通场所恢复和独立复核。12/12 场景与 7/7 资源只表示设计字段覆盖；当前有效任务分母、实测能源、实测算力、确认设备生命周期、实测人工分钟、确认供应商、现实批准与运行均为 0。未来 `PASS` 也不等于部署授权、场地批准、采购批准、成熟度升级、清权或环境收益。

The five explicit states are `not_applicable`, `not_measured`, `external_confirmation_required`, `not_yet_authorized`, and `not_fully_cleared`. Any intensity comparison first closes the task denominator and whole-system boundary. Any continue decision also closes sources, responsibility, the same-task non-AI baseline, vendor export/repair/exit, component and data destinations, restoration of the ordinary place, and independent retest. 12/12 scenes and 7/7 resources mean design-field coverage only. Valid task denominators, measured energy, measured compute, confirmed equipment lifecycle, measured human minutes, confirmed vendors, real approvals, and operations all remain 0. A future `PASS` is still not deployment authorization, site approval, procurement approval, maturity advancement, rights clearance, or environmental benefit.

本轮新增一份结构化账本与双语 SVG/PNG 图对，因此最终 manifest/逐文件台账应为 79 个路径、78 个非 manifest 内容文件；独立逐文件清权完成数仍为 0。双语 HTML 从最终 Markdown 重生；四份 PDF 在两个新的 Python 进程中逐文件字节一致。中文/英文 A3 为 13/16 页，中英文 A0 各 10 页；全 49 页渲染检查得到空白页 0、替换字形 0、对象越界 0。当前 SHA-256：中文 A3 `6bb41b03900d9c42b6e0e1f88afc31c796669c6b40371c99cb3fcc8ed492396f`，英文 A3 `8916464c4bb3feda1af94bc3684f569e95cda0fae38aedfab33a22456755b77a`，中文 A0 `dfa94776307117de43c8e6f20f0686694639ec73bf8c7bc0a4d85cee24d79029`，英文 A0 `9fac1efad90c3b3a0a444589cccfc34a78dd85bb45232a28b143381eca914b92`。出版固定点不证明现场测量、环境绩效、批准、G1 或清权。

This round adds one structured ledger and a bilingual SVG/PNG figure pair, so the final manifest/file ledger should contain 79 paths and 78 non-manifest files; completed independent file-level rights audits remain 0. Both HTML reports were rebuilt from final Markdown. Two fresh Python processes produced byte-identical four-PDF sets. The Chinese/English A3 booklets have 13/16 pages, and both A0 sets have 10 pages. Full rendering of all 49 pages found 0 blank pages, 0 replacement glyphs, and 0 out-of-page objects. Current SHA-256 values are: Chinese A3 `6bb41b03900d9c42b6e0e1f88afc31c796669c6b40371c99cb3fcc8ed492396f`; English A3 `8916464c4bb3feda1af94bc3684f569e95cda0fae38aedfab33a22456755b77a`; Chinese A0 `dfa94776307117de43c8e6f20f0686694639ec73bf8c7bc0a4d85cee24d79029`; English A0 `9fac1efad90c3b3a0a444589cccfc34a78dd85bb45232a28b143381eca914b92`. This publication fixed point proves no field measurement, environmental performance, approval, G1 status, or rights clearance.

## 第 6 轮反脆弱失败治理增量 / Round 6 antifragile failure-governance increment

第 6 轮不重复既有失败侧线，而把六类失败、八类人工责任、场景护照—公共时刻表—证据矩阵三载体回写、运行/成熟度/授权/服务四轴、申诉影响决策、追加式版本、独立复测和主动退役接入既有 JZ-AIOS。暂停、复核、恢复、撤回和退役均要求同一事件三份回写；缺失或冲突时向最保守状态 fail-closed，成熟度与授权不因恢复普通使用自动变化。

Round 6 does not duplicate the existing failure siding. It connects six failure classes, eight human role types, scene-passport–civic-timetable–evidence-matrix writeback, separate runtime/maturity/authorization/service axes, decision-changing appeals, append-only versions, independent retest, and active retirement to existing JZ-AIOS. Pause, review, recovery, withdrawal, and retirement require three writebacks for the same event. Missing or conflicting carriers fail closed to the conservative state; restoring ordinary use changes neither maturity nor authorization by itself.

T-02 的 `STOP-STALE-SOURCE` 仅作为合成故事板：发现边界、停止、人工交接、三载体回写、追加纠正、独立复测、恢复或退役。回放继续 deterministic、无个人信息、无模型/API/现实服务调用和 fail-closed，不是现实事故、服务成绩或现场恢复。现实失败、确认停止权限、公开纠正、现实独立复测、退役和批准重启均为 0；停止到人工交接与普通使用恢复时间保持 unknown。

T-02 `STOP-STALE-SOURCE` is used only as a synthetic storyboard: detect a limit, stop, staffed handoff, write three carriers, append a correction, independently retest, and restore or retire. The replay remains deterministic, PII-free, free of model/API/real-service calls, and fail-closed. It is not a real incident, service result, or field recovery. Real failures, confirmed stop authorities, public corrections, real independent retests, retirements, and approved restarts remain 0; stop-to-handoff and ordinary-use-recovery times remain unknown.

常驻边界为：文件检查、合成回放、机器 PASS、独立复测或恢复验收只对明确对象、判断主体、证据、范围和限制有效，不授权试用、采购、建设、部署、成熟度升级、场地/专业批准、权利清除或现实成效。geometry、既有 SCENE/JZ/T 编号、G0 与 `not_fully_cleared` 均不变。

The permanent boundary is: a file check, synthetic replay, machine PASS, independent retest, or restoration acceptance applies only to its named object, decision-maker, evidence, scope, and limitations. It authorizes no trial, procurement, construction, deployment, maturity advancement, site/professional approval, rights clearance, or real-world outcome. Geometry, existing SCENE/JZ/T IDs, G0, and `not_fully_cleared` remain unchanged.

本轮新增一份结构化失败治理登记册与双语 SVG/PNG 图对，因此最终 manifest/逐文件台账为 84 个路径、83 个非 manifest 内容文件；独立逐文件清权完成数仍为 0。双语 HTML 从最终 Markdown 重生；四份 PDF 在两个新的 Python 进程中逐文件字节一致。中文/英文 A3 为 14/17 页，中英文 A0 各 11 页；全 53 页渲染检查得到空白页 0、替换字形 0、对象越界 0。当前 SHA-256：中文 A3 `b4511a418e7144f133d0e005264d7786688e7ee78fad36a89e33ca36bdd653c2`，英文 A3 `e32593612b01688fb85b5eaa6385ec5be9757781d7c7e195f9d3a01ecaadc5db`，中文 A0 `40d62076801177f8445768b96ce3888d2e76c98b7f4004249d0ab50b6ef22cc3`，英文 A0 `16fa45c69ce1445ae8c58759c0371128ffcccac49545bd0d2bc1deeea720c35f`。出版固定点不证明现实失败、恢复、复测、退役、授权、审批、G1 或清权。

This round adds one structured failure-governance register and a bilingual SVG/PNG figure pair, so the final manifest/file ledger contains 84 paths and 83 non-manifest files; completed independent file-level rights audits remain 0. Both HTML reports were rebuilt from final Markdown. Two fresh Python processes produced byte-identical four-PDF sets. The Chinese/English A3 booklets have 14/17 pages, and both A0 sets have 11 pages. Full rendering of all 53 pages found 0 blank pages, 0 replacement glyphs, and 0 out-of-page objects. Current SHA-256 values are: Chinese A3 `b4511a418e7144f133d0e005264d7786688e7ee78fad36a89e33ca36bdd653c2`; English A3 `e32593612b01688fb85b5eaa6385ec5be9757781d7c7e195f9d3a01ecaadc5db`; Chinese A0 `40d62076801177f8445768b96ce3888d2e76c98b7f4004249d0ab50b6ef22cc3`; English A0 `16fa45c69ce1445ae8c58759c0371128ffcccac49545bd0d2bc1deeea720c35f`. This publication fixed point proves no real failure, recovery, retest, retirement, authorization, approval, G1 status, or rights clearance.

## 第 7 轮气候韧性增量 / Round 7 climate-resilience increment

第 7 轮把既有蓝绿网络、普通遮阴/休息需求、人工巡检、雨洪与生态维护、同任务提示对照、极端天气停止和设备退出组织为一条 G0 气候韧性验证走廊。六个内聚工作包共用一个典型剖面：普通蓝绿路径和静态非 AI 服务先完整；雨洪/生态维护净空不被设备、排队或活动侵占；AI 辅助提示与小月河观察翼只可能作为未来获批的间歇、可拒绝、可停止、可拆服务边。维护工单、资源账本、失败三载体回写和公共权利系统被继承而未被重建。

Round 7 organises the existing blue-green network, ordinary shade/rest needs, manual inspection, stormwater and ecological maintenance, same-task prompt comparison, extreme-weather stop, and device exit as one G0 climate-resilience proof corridor. Six cohesive work packages share one typical section: the ordinary blue-green route and static non-AI service remain complete first; equipment, queues, and activities cannot occupy the stormwater/ecological-maintenance clear zone; and AI-assisted prompting plus the Xiaoyue River observation wing can only be a future approved, intermittent, refusible, stoppable, removable service edge. Maintenance work orders, the resource ledger, three-carrier failure writeback, and public-rights systems are inherited rather than rebuilt.

静态非 AI 与可选 AI 支线固定为同一任务、同一人工确认、同一行动词汇、普通路径、人工交接、申诉和退出。来源过期、支线冲突、无人确认、输出不可达、能源/网络不可用、权利事件、极端天气、普通路径受损或雨洪/维护冲突均 fail-closed。老年人与行动不便者的普通—可选辅助—极端天气停止—恢复四态旅程不要求账户、扫码、屏幕、传感器或 AI；恢复先验收普通场所，可选层继续关闭，G0 与授权不自动变化。

Static non-AI and optional AI branches are fixed to the same task, human confirmation, action vocabulary, ordinary route, staffed handoff, appeal, and exit. Stale source, branch conflict, missing confirmation, inaccessible output, power/network loss, rights event, extreme weather, damage to ordinary movement, or a stormwater/maintenance conflict fails closed. The ordinary–optional assistance–extreme-weather stop–recovery journey for older and reduced-mobility users requires no account, QR, screen, sensor, or AI. Recovery accepts the ordinary place first, keeps the optional layer off, and changes neither G0 nor authorization automatically.

七项未来实测对象均有类型化锚点、分母和证明上限：连续遮阴、可达休息、人工巡检、提示误报漏报、雨洪维护、停止时间及设备/场所退出。现实测量、现实提示事件、已安装接口、确认责任和还场回执均为 0，指标值保持 unknown；绿地率、图面覆盖、概念节点、设备数量和合成 PASS 不能证明热舒适、预警准确、水文/海绵、无障碍或恢复绩效。图件只表达概念关系，不声明精确河岸、现状建筑、法定退界、消防/铁路/市政条件或已建设施。

Seven future measurement objects each have a typed anchor, denominator, and proof limit: continuous shade, reachable rest, manual inspection, warning error, stormwater maintenance, stop time, and device/place exit. Real measurements, public warning events, installed interfaces, confirmed duties, and restoration receipts remain 0, with values unknown. Green ratio, drawing coverage, concept nodes, device counts, and synthetic PASS cannot prove thermal comfort, warning accuracy, hydraulic/sponge performance, accessibility, or restoration performance. The drawing states a concept relationship only; it claims no exact riverbank, existing building, statutory setback, fire/rail/municipal condition, or built facility.

本轮新增一份结构化气候合同与双语 SVG/PNG 图对，因此最终 manifest/逐文件台账应为 89 个路径、88 个非 manifest 内容文件；独立逐文件清权完成数仍为 0。双语 HTML 从最终 Markdown 重生；四份 PDF 在两个新的 Python 进程中逐文件字节一致。中文/英文 A3 为 15/18 页，中英文 A0 各 12 页；全 57 页渲染检查得到空白页 0、替换字形 0、对象越界 0。当前 SHA-256：中文 A3 `ccda6705564dd44e4e3ab859ebdceec38448f89ea05364becfe299d2127324f4`，英文 A3 `c24cbf055b835e02f3e7f92fe276dd53a76ab180221ac5ecade78a687f6f73a7`，中文 A0 `25b02b20a485b45019896fc51ace2c28e6704a4c501926a58ed2b368bd1bd9f3`，英文 A0 `f3cf28899551041cfc6efa745cbc99230f32f3f7b7b3a76dcbba48d4789335c3`。出版固定点不证明现场气候、水文、无障碍、提示、设备、责任、批准、G1 或清权。

This round adds one structured climate contract and a bilingual SVG/PNG figure pair, so the final manifest/file ledger should contain 89 paths and 88 non-manifest files; completed independent file-level rights audits remain 0. Both HTML reports were rebuilt from final Markdown. Two fresh Python processes produced byte-identical four-PDF sets. The Chinese/English A3 booklets have 15/18 pages, and both A0 sets have 12 pages. Full rendering of all 57 pages found 0 blank pages, 0 replacement glyphs, and 0 out-of-page objects. Current SHA-256 values are: Chinese A3 `ccda6705564dd44e4e3ab859ebdceec38448f89ea05364becfe299d2127324f4`; English A3 `c24cbf055b835e02f3e7f92fe276dd53a76ab180221ac5ecade78a687f6f73a7`; Chinese A0 `25b02b20a485b45019896fc51ace2c28e6704a4c501926a58ed2b368bd1bd9f3`; English A0 `f3cf28899551041cfc6efa745cbc99230f32f3f7b7b3a76dcbba48d4789335c3`. This publication fixed point proves no field climate, hydraulic, accessibility, prompt, device, duty, approval, G1, or rights result.

## 第 8—9 轮与跨轮闭环 / Rounds 8–9 and cross-round closure

第 8 轮用 `JZ-TIME-MUSEUM-G0-V1` 把铁路史实、包内登记来源、待档案复核史实、生成内容与未来口述史分级，形成双轨时间图谱、争议停止—下架—纠错—版本保留—恢复链和无需账号/扫码/AI 的无屏节点链。第 9 轮用 `JZ-MISSION-ECONOMY-G0-V1` 把公共任务质量门、公平准入、离线原型、独立复测、结果回流和退出退役连接到同一失败治理与公共权利内核，并把运行、成熟度、授权和服务四轴分开。两轮都不宣称馆藏、口述史采集、现实任务、企业伙伴、采购、投资、部署或运营已经发生。

Round 8 uses `JZ-TIME-MUSEUM-G0-V1` to distinguish public historical facts, registered in-package sources, archive-pending facts, generated content, and future oral history. It adds a twin-track time atlas, a stop–takedown–correct–retain–recover dispute chain, and a screen-free node chain requiring no account, QR code, or AI. Round 9 uses `JZ-MISSION-ECONOMY-G0-V1` to link problem-quality gates, fair entry, offline prototypes, independent retest, result reflow, and exit/retirement to the same failure-governance and public-rights kernel, while separating runtime, maturity, authorization, and service states. Neither round claims that archives, oral-history collection, real tasks, enterprise partners, procurement, investment, deployment, or operation exist.

本次跨轮修补没有新增场景、项目、几何、边界、伙伴或成熟度，而是关闭第 8—9 轮在第 7 轮固定点之后留下的出版与审计缺口：双语视觉入口拆除错误嵌套链接；两组英文图修复标题、状态条、卡片、恢复链和页脚裁切；manifest 与逐文件权利台账从 89/88 扩至 99/98；35 条 `sources.json` 来源全部有 schema 约束的反向权利证据；第 8—9 轮包内来源删除未经证实的开放许可和展示权表述；四份 A3/A0 从最终双语内容重生并纳入百年时间与公共任务经济图件。结构闭环只证明路径、摘要和披露可核验，独立逐文件清权仍为 0，公共或专业复用继续阻断。

This cross-round repair adds no scene, project, geometry, boundary, partner, or maturity. It closes publication and audit gaps left after the Round 7 fixed point: malformed nested bilingual navigation is corrected; title, status-bar, card, recovery-flow, and footer clipping is repaired in the two English figures; the manifest and file-level rights ledger expand from 89/88 to 99/98; all 35 `sources.json` records now reverse-link to schema-constrained rights evidence; unsupported open-license and exhibition-right statements are removed from the Round 8–9 in-package sources; and all four A3/A0 publications are regenerated from final bilingual content with the century-time and mission-economy figures included. Structural closure proves auditable paths, digests, and disclosure only. Independent file-level rights audits remain 0, and public or professional reuse remains blocked.

最终出版固定点在两个新的 Python 进程中逐文件字节一致。中文/英文 A3 为 58/62 页，每种语言包含 14 组图件、每组 3 个 620×892 裁片，裁片相邻重叠 30px 并以 245mm 宽进入 A3 细节页；中英文 A0 各 14 页，按固定顺序保留整板。四份 PDF 共 148 页；PyMuPDF 检查页面尺寸、可搜索文字、替换字形与对象边界，并逐页渲染接触表，空白页、替换字形、越界文本块均为 0。SHA-256：中文 A3 `628a5c3441a57d5cf50ef058511262c21b967140bd01f5953ca644e38a4d1d63`，英文 A3 `6b8d2b774c843f6719f0cc80ad0d3d3c0622b924da6957f349bfc8a7b31a1ad8`，中文 A0 `2d663fabf42adcf0d63b363341037476de6b1952d8a0b64ba7fd4ffefa9021b9`，英文 A0 `565c93d8d233801835cc79a227f5f2ed8354a3d7ab79f1921ed840925c68a8a0`。出版 QA 不证明现场、馆藏、任务、伙伴、采购、部署、审批、G1 或清权。

The final publication fixed point is byte-identical file by file across two fresh Python processes. The Chinese/English A3 booklets contain 58/62 pages. Each language includes 14 figure sets, each split into three 620×892 crops with 30px overlap and placed at 245mm width on A3 detail pages. Both A0 sets contain 14 whole-board pages in a fixed order. Across all 148 pages, PyMuPDF checked page sizes, searchable text, replacement glyphs, and text-block bounds and rendered every page into contact sheets; blank pages, replacement glyphs, and out-of-page text blocks are all 0. SHA-256: Chinese A3 `628a5c3441a57d5cf50ef058511262c21b967140bd01f5953ca644e38a4d1d63`; English A3 `6b8d2b774c843f6719f0cc80ad0d3d3c0622b924da6957f349bfc8a7b31a1ad8`; Chinese A0 `2d663fabf42adcf0d63b363341037476de6b1952d8a0b64ba7fd4ffefa9021b9`; English A0 `565c93d8d233801835cc79a227f5f2ed8354a3d7ab79f1921ed840925c68a8a0`. Publication QA proves no field condition, archive, task, partner, procurement, deployment, approval, G1 status, or rights clearance.

## 第 10 轮长期公共运营集成与十轮审计 / Round 10 long-term civic-operations integration and ten-round audit

### 串行门与范围 / Serial gate and scope

第 10 轮只在第 9 轮 PR #2016 于 `2026-08-12T07:38:05Z` 合并后开始；合并提交 `0443856fc04709a6c6d6b52e0f134417a9b5531e` 已验证为本轮基线 `origin/main@905b8be6ed6b9eb9e84307ef2dbf565fe96dc6f0` 的祖先。开始编辑前，全部开放 PR 的文件范围扫描未发现同一投稿包的竞争变更。本轮串行编号为 10，方案 ID 为 `JZ-FUTURE-09`；两者没有被混写，也没有新增 `SCENE-*`、`JZ-*`、`T-*`、项目或 geometry。

Round 10 began only after Round 9 PR #2016 merged at `2026-08-12T07:38:05Z`. Merge commit `0443856fc04709a6c6d6b52e0f134417a9b5531e` was verified as an ancestor of this round's base, `origin/main@905b8be6ed6b9eb9e84307ef2dbf565fe96dc6f0`. A file-scope scan of every open PR found no competing change to this submission package before editing began. The serial number is 10 and the plan ID is `JZ-FUTURE-09`; they are not conflated, and no `SCENE-*`, `JZ-*`, `T-*`, project, or geometry is added.

`JZ-CIVIC-OPERATIONS-G0-V1` 选择六个相互依赖的运营集成工作包：全年普通日与无活动日；四个未排期条件季节；同一居民公共任务的昼间、夜间／低人员、故障、恢复四窗；八类角色与劳动披露；第 6 轮三载体状态回写；社区议程、失败公开、国际复测边界和年度去留。它继承第 3—9 轮已经建立的维护、公共权利、资源、失败、气候、文化和任务经济合同，只负责把这些机制接进全年普通使用与年度决策，不以新活动品牌覆盖旧治理内核。

`JZ-CIVIC-OPERATIONS-G0-V1` selects six interdependent integration work packages: year-round ordinary/no-event days; four unscheduled conditional seasons; the same resident public task across day, night/low staffing, failure and recovery; eight role types plus labour disclosure; Round 6 three-carrier state writeback; and community agenda, failure disclosure, international-retest boundaries and annual disposition. It inherits the Round 3–9 maintenance, public-rights, resource, failure, climate, cultural and mission-economy contracts. Its job is to connect those mechanisms to ordinary year-round use and annual decisions, not to cover the governance kernel with another event brand.

### 全年协议与四窗连续旅程 / Year-round protocol and four-window continuous journey

全年底板是普通公共日：连续日常轨、无需账户／扫码、同一基本任务的非 AI 完整路径、无屏双语信息、可见的维护与投诉入口。无活动日必须保留，但现实日期为 0。问题季、开源季、城市 Beta 季和 Proof Week 只作为未来条件窗口，当前均 `not_scheduled`；城市 Beta 季另为 `not_authorized`。任何季节都不得占用普通路径、取消安静时段或把参与热度当公共价值。

Ordinary public days form the all-year base: the continuous daily track, no account or QR requirement, a complete non-AI path to the same basic task, bilingual screen-free information, and visible maintenance and complaint entry. No-event days must remain, but confirmed real dates are 0. Question Season, Open-source Season, Urban Beta Season and Proof Week are future conditional windows only and all remain `not_scheduled`; Urban Beta Season is also `not_authorized`. No season may occupy the ordinary path, cancel quiet periods, or treat participation heat as public value.

既有公共时刻表中的 `07:00–22:00` 与 `22:00–07:00` 已被明确标注为继承的 G0 设计窗口，而非现实开放时间、班次、夜班、噪声或照度承诺。每个时段都新增现实窗口、人工在线和责任确认状态；它们保持 `unknown`。夜间／低人员窗口关闭验证、活动、扩声和屏幕，却不能用 AI 冒充人工。发生概念故障时，先隔离验证叠层、保留普通非 AI 绕行并向场景护照—公共时刻表—证据矩阵保守回写；恢复先还普通路径、无屏与静音，再闭合根因、责任、复测和还场，不自动升级 G0 或授权重启。

The existing public timetable's `07:00–22:00` and `22:00–07:00` entries are now explicitly inherited G0 design windows rather than real opening hours, shifts, night rosters, noise, or lighting promises. Every window now records real-window, human-availability and duty-confirmation states, all of which remain `unknown`. The night/low-staffing window closes validation, events, amplification and screens, but AI cannot impersonate staff. Under a conceptual failure, isolate the proof overlay, retain the ordinary non-AI detour, and conservatively write back to the scenario passport, public timetable and evidence matrix. Recovery restores the ordinary path, screen-free information and quiet first, then closes root cause, duty, retest and reinstatement; it neither advances G0 nor authorizes restart.

四窗不变的公共权利是：无需账户／扫码进入、非 AI 完整同任务、无障碍连续意图待现场核验、人工状态如实显示、可撤回、可申诉、无屏安静。现实排班、人员编制、事故值班、志愿劳动投入、预算、活动、国际伙伴、投诉数据、恢复时长和运行成绩都不从概念时刻表推出。

Rights that remain constant across all four windows are: entry without account/QR; a complete non-AI path to the same task; continuous accessibility intent pending field verification; truthful human-status display; withdrawal; appeal; and screen-free quiet. Real rosters, staffing levels, incident duty, volunteer input, budgets, events, international partners, complaint data, recovery duration and operating performance cannot be inferred from the concept timetable.

### 角色、三载体与年度决策 / Roles, three carriers and annual decision

八类角色是普通服务、社区议程、事故接收、停止权限、维护与退役、证据回写、权利复核和独立复核。每类只定义责任类型、触发条件、交接与不可替代的公共义务，不虚构人员、班次或机构。无偿志愿劳动不能作为隐藏运营底盘：来源、工作内容、时长、补偿、拒绝权和替代安排缺一即不得把该劳动计入可持续运营。

The eight role types are ordinary service, community agenda, incident intake, stop authority, maintenance and retirement, evidence writeback, rights review, and independent review. Each defines a duty type, trigger, handover and non-substitutable public obligation without inventing people, shifts or institutions. Unpaid volunteer labour cannot be a hidden operating base: source, task, hours, compensation, refusal right and replacement arrangement must all be disclosed before such labour can count toward sustainable operation.

三处重点区继续保持不可机械复制：众智园以平行验证庭、设备隔离、人工接管和恢复验收为主；原点社区以一街两院四节点、无屏共学、同意撤回和居民日常为主；大钟寺以四象限步行、一厅一台、通勤连续和人工服务为主。三处共享普通路径优先和三载体回写，但不共享同一平面构图、设备布局或活动模板。

The three key areas remain non-mechanically-copyable. Zhongzhiyuan centres on a parallel proof court, equipment separation, staffed takeover and restoration acceptance. Origin Community centres on one street, two courts, four nodes, screen-free co-learning, consent withdrawal and resident routine. Dazhongsi centres on four-quadrant walking, one hall and one desk, commute continuity and staffed service. They share ordinary-path priority and three-carrier writeback, but not one plan composition, equipment layout or event template.

社区议程允许口头、纸面和现场输入；必须给理由回执，并公开进入、暂缓、合并、拒绝或转交的决定。年度公开不得只报成功，必须同时列出普通／无活动使用、失败、投诉、纠错、责任空缺、劳动投入、维护／退役缺口、独立复测、本地公共收益和不同意见。国际远程复测只有改善本地公共决定、无障碍、维护、安全或普通服务才计收益；传播与伙伴数量不计。年度决定只有保持、修正、扩展、退役四类；扩展需要新现实证据与独立书面授权，退役需要普通服务连续、组件去向、数据处置、场所恢复和责任关闭五类回执。

Community agenda can enter orally, on paper or in person. It requires a reasoned receipt and a published enter, defer, merge, reject or refer decision. Annual disclosure cannot publish successes alone; it must include ordinary/no-event use, failures, complaints, corrections, duty gaps, labour, maintenance/retirement gaps, independent retest, local public benefit and dissent. International remote retest counts only when it improves local decisions, accessibility, maintenance, safety or ordinary service; publicity and partner count do not count. Annual disposition has only four outcomes: keep, correct, expand or retire. Expansion requires new real evidence and separate written authorization. Retirement requires five receipts covering ordinary-service continuity, component destination, data disposition, place reinstatement and duty closure.

### 十轮一致性结论 / Ten-round consistency conclusion

| 轮次 | 保持的核心增量 | 第 10 轮审计结论 |
|---|---|---|
| 1 | 双轨京张前台总纲 | 连续日常轨、间歇验证轨、三换轨场、失败侧线和公共时刻表仍为唯一前台语法 |
| 2 | 三处差异化空间原型 | 验证庭、居民共学街院、通勤发布服务仍不可互换 |
| 3 | 维护型城市 | 既有优先、人工维护、恢复验收和退役责任被运营合同调用而未重造 |
| 4 | 非 AI 优先公共权利 | 无账户／扫码、同任务非 AI、无屏、人工和申诉在四窗保持不变 |
| 5 | 完整系统城市代谢 | 资源输入、维护劳动、外部成本和退出去向继续使用原账本 |
| 6 | 反脆弱失败治理 | 三载体原子回写、四轴分离、停止、复测和主动退役进入全年时刻表 |
| 7 | 气候韧性验证走廊 | 蓝绿普通基线、静态提示、维护净空和脆弱群体四态未被活动覆盖 |
| 8 | 百年时间博物馆 | 来源分级、生成标识、纠错下架和无屏教育链保留 |
| 9 | 公共任务经济 | 问题质量门、公平准入、采购/IP 边界和公共收益回流保留 |
| 10 | 长期公共运营集成 | 把前九轮接入全年普通使用、失败公开和年度去留，不新增治理品牌 |

| Round | Retained core increment | Round 10 audit conclusion |
|---|---|---|
| 1 | Twin-track front-stage master plan | The continuous daily track, intermittent proof track, three switchyards, failure siding and public timetable remain the only front-stage grammar |
| 2 | Three differentiated spatial prototypes | Proof court, resident-learning street/courts and commuter publication/service remain non-interchangeable |
| 3 | Maintenance urbanism | Existing-first, human maintenance, restoration acceptance and retirement duties are called rather than reinvented |
| 4 | Non-AI-first public rights | No account/QR, same-task non-AI, screen-free, human and appeal rights remain constant across four windows |
| 5 | Whole-system urban metabolism | Resource inputs, maintenance labour, external costs and exit destinations remain in the inherited ledger |
| 6 | Antifragile failure governance | Atomic three-carrier writeback, four axes, stopping, retest and active retirement enter the year-round timetable |
| 7 | Climate-resilience proof corridor | The ordinary blue-green base, static notice, maintenance clearance and vulnerable-group four states are not displaced by events |
| 8 | Century-Time Museum | Source grading, generated-content labels, correction/takedown and screen-free education chain remain intact |
| 9 | Mission economy | Problem-quality gate, fair entry, procurement/IP boundary and public-benefit reflow remain intact |
| 10 | Long-term civic-operations integration | The first nine rounds connect to ordinary year-round use, failure disclosure and annual disposition without a new governance brand |

总体审计固定为 12 个场景、8 个项目、3 个重点区，geometry 与临时边界零变化；中英文正文、离线 HTML、运营合同和双语图件使用相同的普通日、四季状态、四窗、角色、三载体、年度去留与 0/unknown 现实边界。所有场景仍为 G0，权利仍为 `not_fully_cleared`，独立逐文件清权审计完成数仍为 0。继续值得做的只有：在取得官方边界、现场无障碍／维护／气候数据、明确责任主体、预算、排班和书面授权后，按既有证据门逐项关闭 unknown。应停止的方向是：继续增加品牌、节庆、季节、场景、设备、精确位置、无证据 KPI、伙伴名单或成熟度叙事；用活动热度、机器 PASS、图面覆盖或传播量冒充公共价值；在普通路径、静音、无屏、非 AI、申诉或退役责任上退让。

The overall audit fixes 12 scenes, eight projects and three key areas, with zero geometry or provisional-boundary change. Both proposal languages, offline HTML, the operations contract and bilingual figure use the same ordinary-day base, four conditional-season states, four windows, roles, three carriers, annual disposition and 0/unknown reality boundary. Every scene remains G0; rights remain `not_fully_cleared`; completed independent file-level rights audits remain 0. The only worthwhile continuation is to close existing unknowns through the inherited evidence gates after official boundaries, field accessibility/maintenance/climate data, accountable operators, budgets, rosters and written authorization exist. Work that should stop includes adding brands, festivals, seasons, scenes, devices, exact locations, unsupported KPIs, partner lists or maturity narratives; presenting event heat, machine PASS, drawing coverage or publicity as public value; or weakening ordinary-path, quiet, screen-free, non-AI, appeal or retirement duties.

### 出版固定点 / Publication fixed point

双语 `year-round-civic-operations.{svg,png}` 采用相同 1800×1100 画布、面板、坐标与状态语法；中文与英文 PNG 均由本机离线 headless Chrome 从可编辑 SVG 导出，未加载远程资源。四份 PDF 从最终双语 Markdown 和 15 组图件以两个新 Python 进程连续重生，逐文件字节一致。中文／英文 A3 为 63／67 页，单一 A3 纵向尺寸；中英文 A0 各 15 页，单一 A0 横向尺寸。PyMuPDF 检查全部 160 页的可搜索文字、图像对象、空白页、替换字形和文本边界；Poppler 对双语封面、第 12 张运营整板及 A3 运营细节裁片作视觉渲染复核。空白页、替换字形、越界文本块均为 0。

The bilingual `year-round-civic-operations.{svg,png}` pair uses the same 1800×1100 canvas, panels, coordinates and state grammar. Both PNGs were exported from editable SVG sources by a local offline headless Chrome session without remote resources. All four PDFs were regenerated twice in fresh Python processes from the final bilingual Markdown and 15 figure sets and are byte-identical file by file. The Chinese/English A3 booklets contain 63/67 pages at one portrait A3 size; both A0 sets contain 15 pages at one landscape A0 size. PyMuPDF checked searchable text, image objects, blank pages, replacement glyphs and text bounds across all 160 pages. Poppler visually rendered both covers, both board 12 operations boards, and representative A3 operations detail crops. Blank pages, replacement glyphs and out-of-page text blocks are all 0.

| PDF | Pages / format | SHA-256 |
|---|---|---|
| `drawings/a3-booklet.pdf` | 63 / A3 portrait | `e707883c9663945910d3496905461367e78a5fe40283b46423802b164cec59a1` |
| `drawings/a3-booklet.en.pdf` | 67 / A3 portrait | `5f4f4abc6867e1419347a38b4c86dc246bb02881fe248aca7161796d11acce18` |
| `drawings/a0-boards.pdf` | 15 / A0 landscape | `16754aff1b6fd81a2db3fdc40b42ab76c93a2cd2fd6c3c61cc65cdc031e7a6f9` |
| `drawings/a0-boards.en.pdf` | 15 / A0 landscape | `ff7f7a57eed59d2ae0edbff2fceea7257c25ee1a4f7d1d74fb77ee44e4f40b82` |

该出版固定点只证明当前包内字节和版式可复核，不证明活动、开放、排班、人员、预算、伙伴、投诉、事故、恢复时长、年度决定、运营成绩、批准、G1 或清权。

This publication fixed point proves only that the current in-package bytes and layout are reviewable. It proves no event, opening, roster, staff, budget, partner, complaint, incident, recovery duration, annual decision, operating result, approval, G1 status or rights clearance.

## 第 11 轮评审收束与专业深化交接 / Round 11 review synthesis and professional handoff

### 串行门与工作包 / Serial gate and work package

第 11 轮只在第 10 轮 PR #2101 合并并进入最新 `main`、同一投稿包无开放竞争 PR、GitHub 与 Git 身份均为 `xyh202131` 后开始。工作包只深化既有 `implementation-handoff-matrix.json`，增加双语评审/交接总图和对应正文入口；不修改 geometry、metrics、12 个场景、8 个项目、3 个重点区、G0、临时边界或 `not_fully_cleared`。

Round 11 began only after Round 10 PR #2101 merged into the latest `main`, no open PR competed for the same package, and both GitHub and Git identities were verified as `xyh202131`. The work package deepens only the existing `implementation-handoff-matrix.json`, adding a bilingual review/handoff figure and corresponding reading entry. It changes no geometry, metrics, twelve scenes, eight projects, three key areas, G0 status, provisional boundary, or `not_fully_cleared` rights state.

### 评审收束 / Review synthesis

评审顺序固定为四问：普通生活是否先于验证成立；三处是否不可互换；后台是否能停止、回写和退场；哪些内容冻结、哪些必须被现实资料替换。一个前台概念是“双轨京张”，三处原型分别是众智园平行验证庭、原点社区一街两院四节点、大钟寺四象限步行与一厅一台，一个后台内核是 JZ-AIOS + G0—G3 + 证据门 + 权利边界。六项 Agent 任务各绑定一个评审问题、现有证据、专业接手动作和禁止推断，完整覆盖仍由 `compliance_matrix.json` 承担。

The review order is fixed to four questions: does ordinary life work before proof; are the three places non-interchangeable; can the back-stage system stop, write back and exit; and what is frozen versus replaced by real evidence. The single front-stage concept is Twin-track Jing-Zhang; the prototypes are Zhongzhiyuan's parallel proof court, Origin Community's one street/two courts/four nodes, and Dazhongsi's four-quadrant walking plus one hall/one desk; the single back-stage kernel is JZ-AIOS + G0–G3 + evidence gates + rights boundaries. Each of the six Agent duties now binds one review question, current evidence, professional next action and prohibited inference, while `compliance_matrix.json` remains the exhaustive coverage ledger.

### 官方资料替换与七专业停止线 / Authoritative-data replacement and seven-discipline stop line

八类替换包 D01—D08 分别覆盖官方几何、现状测绘、控规权属、无障碍/同任务共测、交通高峰、专项约束、责任运营和权利复用。每份新材料必须带来源、版本、日期、空间/时间范围与使用权限，并触发“冻结—替换—复算—复核—必要时退役”的完整下游更新。规划城市设计、景观/无障碍、交通、建筑/公共界面、专项安全、数据/AI/权利、运营/社区七类专业只对其证据范围负责；概念图、绿线、OSM、体量原型、完整模板、合成 PASS 和活动日历均不能代替相应专业判断。

Eight replacement packs D01–D08 cover official geometry, existing-condition survey, controls/title, accessibility and same-task co-test, peak movement, specialist constraints, responsibility/operation, and rights/reuse. Every new input must retain source, version, date, spatial/temporal scope and use permission, triggering a full downstream sequence of freeze, replace, recalculate, verify and—when required—retire. Seven disciplines—planning/urban design, landscape/accessibility, transport, architecture/public interface, specialist safety, data/AI/rights, and operations/community—judge only within their evidence scope. Concept diagrams, green lines, OSM, massing prototypes, complete templates, synthetic PASS, and event calendars cannot replace those judgements.

当前权威替换材料 0、专业责任接受 0、99 槽提交 0、批准 0、现场测试 0、GO 0。任一重大缺口继续 NO-GO；先保护普通公共权利、停止受影响验证叠层，再修正或退役。`review-professional-handoff.{svg,png}` 双语总图只是一张 G0 评审与专业交接索引，不是现实资料、专业意见、责任接受、审批或实施结果。

Current authoritative replacement inputs are 0; accepted professional duties 0; submitted artifacts across 99 slots 0; approvals 0; field tests 0; GO decisions 0. Any material gap remains NO-GO: protect ordinary public rights first, stop the affected proof overlay, then revise or retire. The bilingual `review-professional-handoff.{svg,png}` is only a G0 review and professional-handoff index, not real evidence, professional opinion, accepted duty, approval, or implementation result.

### 第 11 轮出版固定点 / Round 11 publication fixed point

最终投稿包为 108 个 manifest 路径、107 个非 manifest 内容文件、41 条来源和 108 条逐文件权利记录；独立逐文件清权仍为 0。双语 HTML 从最终 Markdown 重生，新增双语评审交接图作为中英文 A0 首板和 A3 封面。两个新的 Python 进程所得四份 PDF 逐文件字节一致：中文/英文 A3 为 67/71 页，中英文 A0 各 16 页，共 170 页；全页检查得到空白页 0、替换字形 0。SHA-256：中文 A3 `8f5835af07cf0e1640728cb5860b4cff91b6238304c00994385ad4484b779029`，英文 A3 `7c6c9e63da74c65bc650ffc388d25aef322d2c265107a78435825c873ff2fc6a`，中文 A0 `4dd45f6c8a34acd80f30db9361560ea95689eef2bfe2fc6feae3bba8103824ad`，英文 A0 `4222709be163478b9bc5e0d1025d068c9bd50ef30b5c364e5d7da9387f139acd`。该固定点只证明包内字节、版式和交接索引可复核，不证明现实资料、专业接受、审批、现场测试、GO、实施或清权。

The final package contains 108 manifest paths, 107 non-manifest content files, 41 sources, and 108 file-level rights records; completed independent file-level rights audits remain 0. Both HTML reports were rebuilt from final Markdown, and the new bilingual review/handoff figure is the first A0 board and A3 cover in each language. Two fresh Python processes produced byte-identical files: the Chinese/English A3 booklets contain 67/71 pages, both A0 sets contain 16 pages, and all four PDFs total 170 pages; full-page checks found 0 blank pages and 0 replacement glyphs. SHA-256: Chinese A3 `8f5835af07cf0e1640728cb5860b4cff91b6238304c00994385ad4484b779029`; English A3 `7c6c9e63da74c65bc650ffc388d25aef322d2c265107a78435825c873ff2fc6a`; Chinese A0 `4dd45f6c8a34acd80f30db9361560ea95689eef2bfe2fc6feae3bba8103824ad`; English A0 `4222709be163478b9bc5e0d1025d068c9bd50ef30b5c364e5d7da9387f139acd`. This fixed point proves only reviewable in-package bytes, layout, and handoff indexing—not real evidence, professional acceptance, approval, field testing, GO, implementation, or rights clearance.

## 双轨前台增量 / Twin-track frontend increment

本轮把“双轨京张”建立为前台空间总纲：连续日常轨承载普通公共生活，间歇验证轨只在自愿、公告、限域、有责任人的时段出现；原点社区、众智园、大钟寺分别作为共创、验证、发布换轨场；失败侧线承载停止、人工接管、绕行、申诉和恢复；入口、时段、状态、人工、来源、退出六类信号共同组成公共时刻表。人工站房、无屏节点和非 AI 完整路径不依赖注册、扫码或 AI。`visual/assets/key-area-evidence-matrix.json#twin_track_frontend_contract` 记录同一套双轨、三换轨场、四态、旅程和后台治理回链，并把所有现实运行结果保持为 0 或 unknown。主图 `site-overview` 的双语 PNG 与新增双语 SVG 可编辑源只表达关系，不改 geometry、不新增场景编号，也不把验证轨升级为连续占地或已建设施。

This round makes Twin-track Jing-Zhang the front-stage spatial master plan: the continuous civic track carries ordinary public life, while the intermittent proof track appears only in voluntary, announced, bounded, accountable windows. Origin Community, Zhongzhiyuan, and Dazhongsi serve as co-creation, verification, and publication switchyards; the failure siding supports stopping, staffed takeover, detour, appeal, and recovery; and entry, time, state, human, source, and exit signals form a civic timetable. Staffed stations, screen-free nodes, and a complete non-AI path do not require registration, a QR code, or AI. `visual/assets/key-area-evidence-matrix.json#twin_track_frontend_contract` records the same tracks, three switchyards, four states, journey, and governance backlinks while keeping all real operating results at 0 or unknown. The bilingual `site-overview` PNGs and newly added bilingual editable SVG sources express relationships only: geometry is unchanged, no scene ID is added, and the proof track is not promoted into a continuous footprint or an existing facility.

V2.12 对双语人类评审层做第二次全量对齐。中英文离线视觉首页现在使用同序的 16 个章节、15 个导航目标、8 个双语图件角色、14 个同键同值指标卡，以及相同规模的现实基线、重点区、12 场景、阶段和检查表；不再出现“文件成对但英文删减范围、建筑、任务覆盖或来源章节”的情况。双语正文把既有 99 个关闭槽压成七组可读移交包，并把七类使用场景明确分为 1 类披露评审、2 类待确认和 4 类阻断/待审计阻断。`submission-use-rights-matrix.json` 增加同一计数摘要，`BILINGUAL_VISUAL_PARITY` 成为第 22 项包内检查。以上改动不新增空间项目、场景、坐标、伙伴、审批、测试或现实成绩。

V2.12 performs a second full alignment of the bilingual human-review layer. The Chinese and English offline dashboards now use the same ordered 16 sections, 15 navigation targets, eight bilingual figure roles, fourteen metric cards with identical keys and values, and equal-sized built-baseline, key-area, twelve-scene, phase, and check tables. The package no longer treats paired files as sufficient while the English dashboard omits scope, building, task-coverage, or source sections. Both proposal languages compress the existing 99 closure slots into seven readable handoff packs and separate seven use contexts into one disclosed-review context, two confirmation-dependent contexts, and four blocked or audit-dependent contexts. `submission-use-rights-matrix.json` adds the same count summary, and `BILINGUAL_VISUAL_PARITY` becomes the twenty-second package check. No spatial project, scene, coordinate, partner, approval, test, or real-world result is added.

V2.6 只增加“来源—资产—权利”审计闭环，不改变方案、指标或任何坐标。29 条来源各有反向权利证据 ID；10 个仓库来源固定到当前审计 HEAD 的 Git blob/tree，4 个网页只固定到包外 Firecrawl 抓取摘要，另 15 个网页明确没有内容摘要。120 个 OSM way 均在 `geometry/constraints.geojson` 内补入 `source_id=OSM-CONTEXT`，但固定查询和快照摘要仍未知。62 条逐文件资产记录把来源、父资产、工具、嵌入组件、生成配方状态、复核状态和未决项串联到 manifest。该闭环的效果是 `audit_ready_not_cleared`，不是许可升级。

V2.6 adds only the source–asset–rights audit loop; it changes no design, metric, or coordinate. Each of the 29 sources has a reverse rights-evidence ID. Ten repository sources are fixed to Git blob/tree objects at the audited HEAD, four web records are fixed only to external Firecrawl capture digests, and 15 web records explicitly have no content digest. All 120 OSM ways now carry `source_id=OSM-CONTEXT` in `geometry/constraints.geojson`, while the fixed query and snapshot digest remain unknown. Sixty-two file-level asset records connect sources, parent assets, tools, embedded components, recipe state, review state, and open items to the manifest. The effect is `audit_ready_not_cleared`, not a license upgrade.

V2.7 只把 T-02 的 G0 离线基线升级为严格、可执行、可复核的**合成治理回放合同**。零依赖 Node.js 22.x 回放器默认只读，只有显式 `--write` 才刷新结果；10 个无个人信息合成样例覆盖过期、冲突、正式办理、禁采数据、人工路径不可用、未知请求、停止与恢复，10/10 决策精确匹配。4/4 个不同的声明停止事件均精确映射到各自恢复动作；13/13 负向变异控制验证样例/冻结合同未知字段、枚举与回答模式漂移、完整来源闭包、禁采数据优先级、canonical RACI 闭包、现实服务授权和摘要计数篡改均 fail-closed。该 1 次合成回放不生成实质回答，不调用模型、API 或现实服务，也不确认审批、责任主体、现实独立复测或 G1 结果；所有这些现实指标仍为 0 或 unknown，门级仍为 G0。

V2.7 upgrades only the T-02 G0 offline baseline into a strict, executable, reviewable **synthetic governance-replay contract**. The zero-dependency Node.js 22.x runner is read-only by default and refreshes the result only with explicit `--write`. Ten PII-free synthetic fixtures cover stale and conflicting sources, formal procedures, prohibited-data flags, unavailable human paths, unknown requests, stops, and recovery; all 10/10 decisions exactly match. All four distinct declared stop events map to their exact recovery actions. Thirteen of thirteen negative mutation controls show that unknown fixture/frozen-contract fields, enum and answer-mode drift, full source closure, prohibited-data precedence, canonical RACI closure, real-service authorization, and summary-count tampering fail closed. This one synthetic replay produces no substantive answer, invokes no model, API, or real service, and confirms no approval, accountable party, real independent retest, or G1 outcome. All such real-world indicators remain 0 or unknown, and the gate remains G0.

V2.7 的四份出版物已用两个新的 Python 进程连续生成；中英文 A3 在两次生成中逐文件字节一致，随后与保持不变的双语 A0 一起通过 85 页 QA。当前中文/英文 A3 SHA-256 分别为 `981a2b8221fa35321f212f0868e742925d7d76c512e946be59e2d37eace82a4e` 与 `fe5dffd516ac17cc6156cdeb2d7a85144d69794fcc3e829a5fdd15a255c8ea11`；中文/英文 A0 仍分别为 `77bcce2d7b1a17bc6db289358e63db228681eebc3ec4ea9288f4bf5af69e7d5e` 与 `53ac76d1cc51f1eb19e8c4f9fa4b96acc3046c3c0db4f4e8f7c8c4034328c384`。QA 未发现裁切、越界、空白页、错序或缺失的可搜索正文块；这些出版检查不证明现实服务、现场结果或权利清除。本段取代下方 V2.6 段落中的旧 A3 字节身份。

The four V2.7 publications were generated in two fresh Python processes. Both bilingual A3 files were byte-identical across the two passes and then passed an 85-page QA together with the unchanged bilingual A0 files. The current Chinese and English A3 SHA-256 values are `981a2b8221fa35321f212f0868e742925d7d76c512e946be59e2d37eace82a4e` and `fe5dffd516ac17cc6156cdeb2d7a85144d69794fcc3e829a5fdd15a255c8ea11`; the Chinese and English A0 values remain `77bcce2d7b1a17bc6db289358e63db228681eebc3ec4ea9288f4bf5af69e7d5e` and `53ac76d1cc51f1eb19e8c4f9fa4b96acc3046c3c0db4f4e8f7c8c4034328c384`. QA found no clipping, overflow, blank page, wrong order, or missing searchable narrative block. Publication QA proves no real service, field result, or rights clearance. This paragraph supersedes the former A3 byte identities in the historical V2.6 section below.

V2.11 对整个投稿包做一致性与可移交性扫描，不新增空间项目、场景、坐标、现实审批或成绩。`implementation-handoff-matrix.json` 将 8 个既有项目、3 个既有试点和 12 个预注册场景连到 7 组移交包、9 类关闭材料和 99 个稳定材料 ID；所有材料仍未提交，11 项仍 NO-GO。`submission-use-rights-matrix.json` 把公告 8.1 与仓库评审、主办方项目内使用、投稿人对外展示、跨项目复用和第三方组件分开决策，并明确公告与本次开源 Agent 征集的适用关系仍待确认。双语正文的高密度证据索引被拆成可读单项，完整索引仍保留在结构化文件中；三份矩阵此前引用但自检缺失的 `RISK_AND_SOURCE_BOUNDARIES` 也补成显式检查。

V2.11 performs a package-wide consistency and transferability audit without adding a spatial project, scene, coordinate, real-world approval, or result. `implementation-handoff-matrix.json` connects the eight existing projects, three existing protocols, and twelve preregistration scenes to seven handoff packs, nine closure categories, and 99 stable artifact IDs; no artifact has been submitted and all eleven items remain NO-GO. `submission-use-rights-matrix.json` separates announcement clause 8.1 from repository review, organizer project use, entrant external display, cross-project reuse, and third-party components, while keeping applicability to this open Agent call pending confirmation. Dense bilingual evidence indexes are split into readable units while exhaustive indexes remain in structured files, and the previously referenced but absent `RISK_AND_SOURCE_BOUNDARIES` self-check is made explicit.

## 第 7 轮历史增量状态 / Historical Round 7 increment status

> 本节只保留第 7 轮当时的固定点，不是第 9 轮修补后的当前状态；当前 99/98 路径、148 页出版与 35 条来源闭环以本报告上方“第 7—9 轮跨轮闭环修补”段落为准。
>
> This section preserves the Round 7 fixed point only and is not the current post-repair state. The current 99/98 paths, 148-page publication set, and 35-source closure are governed by the “Rounds 7–9 cross-round closure repair” section above.

> 本节从最新 `main@cf263740…` 重新开始；第 6 轮合并 SHA `2f6dfc53…` 已验证为其祖先。本节不继承前一 PR 的 `[x]`、PDF、manifest 或可信 check；最终 PR head 的可信 `submission-validation` 才能关闭最后一项。
>
> This section restarts from latest `main@cf263740…`; Round 6 merge SHA `2f6dfc53…` was verified as its ancestor. It inherits no `[x]`, PDF, manifest, or trusted check from the prior PR. Only trusted `submission-validation` on the final PR head can close the last item.

- [x] 六个气候工作包共用一个普通基线优先剖面，不重建维护、代谢、失败或权利系统，不新增场景/项目编号。
- [x] 静态非 AI 与可选 AI 固定为同任务、同人工确认、同申诉与退出；无需账户、扫码、屏幕、传感器或 AI。
- [x] 雨洪/生态维护净空、极端天气停止、人工巡检、可拆组件和普通场所恢复进入同一可读旅程。
- [x] 七项未来测量均有类型化锚点、分母和证明上限；现实测量、提示、设备、责任和还场均为 0 或 unknown。
- [x] geometry、既有 SCENE/JZ/T 编号和八个项目未变；全部场景仍 G0，临时边界与现实成熟度未升级。
- [x] 中英文 proposal、report、visual、SVG/PNG 与 A3/A0 同步；57 页 PDF 空白、替换字形和越界对象均为 0，四文件两次生成字节一致。
- [x] 89 条 manifest、5 个兼容组与 89 条 rights ledger 记录严格等集；`not_fully_cleared`、0 独立逐文件审计和公共/专业复用 blocked 不变。
- [x] strict、deterministic、spatial、visual、professional、self-check、T-02、双语结构和 participant preflight 全部通过最终字节。
- [ ] 最终 PR head 的可信 `submission-validation` 为 `SUCCESS`。

- [x] Six climate work packages share one ordinary-first section without rebuilding maintenance, metabolism, failure, or rights systems or adding scene/project IDs.
- [x] Static non-AI and optional AI share one task, human confirmation, appeal, and exit; no account, QR, screen, sensor, or AI is required.
- [x] Stormwater/ecological clear zones, extreme-weather stop, manual inspection, removable components, and ordinary-place recovery share one readable journey.
- [x] Seven future measurements each have a typed anchor, denominator, and proof limit; real measures, prompts, devices, duties, and restoration remain 0 or unknown.
- [x] Geometry, existing SCENE/JZ/T IDs, and eight projects are unchanged; every scene remains G0, with provisional boundaries and real maturity unchanged.
- [x] Bilingual proposals, reports, visual pages, SVG/PNG, and A3/A0 outputs align; 57 PDF pages contain no blank page, replacement glyph, or out-of-page object, and both generation passes are byte-identical.
- [x] The 89 manifest paths, five compatibility groups, and 89 rights-ledger records were exact sets at the Round 7 fixed point; `not_fully_cleared`, zero independent file-level audits, and blocked public/professional reuse remained unchanged.
- [x] Strict, deterministic, spatial, visual, professional, self-check, T-02, bilingual structure, and participant preflight all pass on final bytes.
- [ ] Trusted `submission-validation` on the final PR head reports `SUCCESS`.

## 权利证据审计 / Rights-evidence audit

审计以 `visual/assets/source-rights-evidence.schema.json`、`visual/assets/source-rights-evidence.json`、`visual/assets/submission-use-rights-matrix.json`、`visual/assets/rights-clearance-ledger.json`、`agent.json` 与 `manifest.json` 为一组，不把任一结构 PASS 解释为法律清权。最低语义断言为：35 条来源与证据记录一一对应；120 个 OSM way 与 element lineage 一一对应；manifest、5 个兼容组和 99 条逐文件记录路径严格等集；除 manifest 与 ledger 两个不可自引用项外，每条资产摘要与 manifest 相等；工具 ID 均能解析到 `agent.json`；`audit_records=[]`；公告 8.1 适用关系仍待确认；P0 01/02/03 仍 open；公共或专业复用仍 blocked。

The audit treats `visual/assets/source-rights-evidence.schema.json`, `visual/assets/source-rights-evidence.json`, `visual/assets/submission-use-rights-matrix.json`, `visual/assets/rights-clearance-ledger.json`, `agent.json`, and `manifest.json` as one contract. No structural PASS is interpreted as legal clearance. Minimum semantic assertions are: one evidence record per each of 35 sources; one element-lineage record per each of 120 OSM ways; strict path equality among the manifest, five compatibility groups, and 99 file-level records; digest equality for every asset except the two explicit self-reference cases (manifest and ledger); every tool ID resolves in `agent.json`; `audit_records=[]`; announcement clause 8.1 applicability remains pending confirmation; P0 01/02/03 stay open; and public or professional reuse stays blocked.

```powershell
$pkg = 'submissions/xyh202131/jingzhang-ai-pilgrimage-belt'
$env:JZ_RIGHTS_PACKAGE = (Resolve-Path $pkg).Path
$env:JZ_RIGHTS_REPO = (Resolve-Path .).Path
@'
import hashlib, json, os
from pathlib import Path
import jsonschema

base = Path(os.environ["JZ_RIGHTS_PACKAGE"])
repo = Path(os.environ["JZ_RIGHTS_REPO"])
load = lambda path: json.loads((base / path).read_text(encoding="utf-8"))
manifest = load("manifest.json")
ledger = load("visual/assets/rights-clearance-ledger.json")
evidence = load("visual/assets/source-rights-evidence.json")
schema = load("visual/assets/source-rights-evidence.schema.json")
sources = load("sources.json")
constraints = load("geometry/constraints.geojson")
agent = load("agent.json")
metrics = load("metrics.json")
handoff = load("visual/assets/implementation-handoff-matrix.json")
closure = load("visual/assets/readiness-closure-contract.json")
use_rights = load("visual/assets/submission-use-rights-matrix.json")

jsonschema.Draft202012Validator.check_schema(schema)
errors = list(jsonschema.Draft202012Validator(schema).iter_errors(evidence))
assert not errors, errors[:3]

actual = {p.relative_to(base).as_posix() for p in base.rglob("*") if p.is_file()}
manifest_paths = [row["path"] for row in manifest["files"]]
asset_paths = [row["path"] for row in ledger["asset_records"]]
group_paths = [path for group in ledger["file_coverage"]["asset_groups"] for path in group["paths"]]
assert actual == set(manifest_paths) == set(asset_paths) == set(group_paths)
assert len(manifest_paths) == len(asset_paths) == len(group_paths) == len(set(manifest_paths))

sha = lambda path: hashlib.sha256((base / path).read_bytes()).hexdigest()
manifest_by_path = {row["path"]: row for row in manifest["files"]}
for row in manifest["files"]:
    if row["path"] != "manifest.json":
        assert row["sha256"] == sha(row["path"]), row["path"]
for row in ledger["asset_records"]:
    path = row["path"]
    digest = row["content_identity"]["digest"]
    if path in {"manifest.json", "visual/assets/rights-clearance-ledger.json"}:
        assert digest is None
    else:
        assert digest == sha(path) == manifest_by_path[path]["sha256"], path

source_ids = {row["id"] for row in sources["sources"]}
evidence_ids = {row["source_id"] for row in evidence["source_records"]}
assert source_ids == evidence_ids and len(source_ids) == 29
assert {row["rights_evidence_id"] for row in sources["sources"]} == {row["evidence_id"] for row in evidence["source_records"]}

osm = [row for row in constraints["features"] if row.get("properties", {}).get("osm_way_id") is not None]
assert len(osm) == 120 and all(row["properties"].get("source_id") == "OSM-CONTEXT" for row in osm)
assert {str(row["properties"]["osm_way_id"]) for row in osm} == {str(row["element_id"]) for row in evidence["osm_element_lineage"]}

tool_ids = {row["tool_id"] for row in agent["toolchain"]}
tool_refs = {tool for row in ledger["asset_records"] for tool in row["tool_ids"]}
tool_refs |= {tool for row in agent["output_provenance"] for tool in row["tool_ids"]}
assert tool_refs <= tool_ids and tool_ids <= tool_refs

assets = {row["path"]: row for row in ledger["asset_records"]}
for row in ledger["asset_records"]:
    assert set(row["source_lineage"]["parent_asset_refs"]) <= set(assets), row["path"]
metric_internal_sources = {
    source
    for metric in metrics["metrics"].values()
    for source in metric.get("source_files", [])
    if (base / source).is_file()
}
assert metric_internal_sources <= set(assets["metrics.json"]["source_lineage"]["parent_asset_refs"])
for source in {
    source
    for metric in metrics["metrics"].values()
    for source in metric.get("source_files", [])
    if not (base / source).is_file()
}:
    assert (repo / source).is_file(), source

closure_records = {row["closure_record_id"]: row for row in closure["records"]}
required_artifact_ids = [artifact for row in closure["records"] for artifact in row["required_artifact_ids"]]
assert len(required_artifact_ids) == len(set(required_artifact_ids)) == 99
assert all(not row["submitted_evidence_by_category"] for row in closure["records"])
assert all(row["decision"] == "NO-GO" for row in closure["records"])
prereg_refs = {f"G1-PREREG-{index:03d}" for index in range(1, 13)}
assert {row["preregistration_ref"] for row in handoff["scenario_crosswalk"]} == prereg_refs
assert len(handoff["item_handoffs"]) == 11
assert all(not row["submitted_artifact_refs"] and row["decision"] == "NO-GO" for row in handoff["item_handoffs"])
assert handoff["summary"]["required_item_category_slot_count"] == 99
assert handoff["summary"]["submitted_real_world_artifact_count"] == 0

assert use_rights["status"] == "not_fully_cleared"
assert use_rights["applicability_boundary"]["status"] == "needs_maintainer_or_organizer_confirmation"
assert len(use_rights["clause_register"]) == 7 and len(use_rights["use_decisions"]) == 7
assert use_rights["release_gate"]["public_or_professional_reuse"] == "blocked_pending_terms_and_audit"
assert use_rights["release_gate"]["completed_written_applicability_confirmations"] == 0

assert ledger["clearance_claim"]["status"] == "not_fully_cleared"
assert ledger["clearance_claim"]["completed_independent_file_level_clearance_audits"] == 0
assert ledger["audit_records"] == []
assert {"RIGHTS-OPEN-01", "RIGHTS-OPEN-02", "RIGHTS-OPEN-03"} <= set(manifest["rights_claim"]["open_p0_items"])
assert manifest["release_claim"]["public_or_professional_reuse"] == "blocked_pending_terms_and_audit"
assert {"RIGHTS-OPEN-01", "RIGHTS-OPEN-02", "RIGHTS-OPEN-03"} <= {
    item.split(":", 1)[0]
    for item in manifest["release_claim"]["known_blockers"]
    if ":" in item
}
assert len(manifest["release_claim"]["next_actions"]) == 3
print(json.dumps({"ok": True, "schema_errors": 0, "paths": len(actual), "sources": len(source_ids), "osm": len(osm), "hash_mismatches": 0, "independent_audits": 0, "reuse": "blocked_pending_terms_and_audit"}, ensure_ascii=False))
'@ | python -
Remove-Item Env:JZ_RIGHTS_PACKAGE
Remove-Item Env:JZ_RIGHTS_REPO
python scripts/score_submission.py "$pkg/proposal.md" --strict --json
python scripts/spatial_review.py $pkg --stage formal --json
python scripts/visual_review.py $pkg --json
python scripts/professional_review.py $pkg --json
python scripts/self_check_submission.py $pkg --pr-author xyh202131 --json
python scripts/participant_preflight.py $pkg --pr-author xyh202131 --json
git diff --check
```

## 当前 PDF 固定点与历史重生记录 / Current PDF fixed point and historical regeneration record

V6.0 在六类失败、三载体回写、四轴分离、申诉改判、追加式证据、独立复测与主动退役固定后重生四份出版物。中文/英文 A3 分别为 14/17 页，均为 A3 纵向；中英文 A0 各 11 页，均为 A0 横向，失败治理图为第 8 板。两个新的 Python 进程生成的四份 PDF 逐文件字节一致；PyMuPDF 对最终 53 页检查文本、页面对象边界、空白页与替代字形，四项异常计数均为 0；四份逐页联系表已视觉复查。该固定点只证明出版身份和版面检查，不证明现实失败、停止权限、恢复、复测、退役、审批、G1 授权或清权。

V6.0 regenerated all four publications after fixing six failure classes, three-carrier writeback, four separate axes, decision-changing appeals, append-only evidence, independent retest, and active retirement. The Chinese/English A3 booklets contain 14/17 A3 portrait pages; both A0 sets contain 11 A0 landscape pages, with the failure-governance figure as board 8. Two fresh Python processes produced file-identical four-PDF sets. PyMuPDF checked text, page-object bounds, blank pages, and replacement glyphs across all 53 pages, with zero findings in every category; all four contact sheets were visually reviewed. This fixed point proves publication identity and layout QA only—not a real failure, confirmed stop authority, recovery, retest, retirement, approval, G1 authorization, or rights clearance.

| PDF | Pages / format | SHA-256 |
|---|---|---|
| `drawings/a3-booklet.pdf` | 14 / A3 portrait | `b4511a418e7144f133d0e005264d7786688e7ee78fad36a89e33ca36bdd653c2` |
| `drawings/a3-booklet.en.pdf` | 17 / A3 portrait | `e32593612b01688fb85b5eaa6385ec5be9757781d7c7e195f9d3a01ecaadc5db` |
| `drawings/a0-boards.pdf` | 11 / A0 landscape | `40d62076801177f8445768b96ce3888d2e76c98b7f4004249d0ab50b6ef22cc3` |
| `drawings/a0-boards.en.pdf` | 11 / A0 landscape | `16fa45c69ce1445ae8c58759c0371128ffcccac49545bd0d2bc1deeea720c35f` |

本固定点的基线为 `origin/main@651f3cc430d3ca3f44414e7d3e3e5c9b373100fb`。临时逐页 QA 输出位于包外；新增图件以本地无头浏览器从包内 SVG 确定性导出 PNG。四份 PDF 与全部新增资产继续受总体 `not_fully_cleared` 权利门约束。

The base for this fixed point is `origin/main@651f3cc430d3ca3f44414e7d3e3e5c9b373100fb`. Temporary page-QA outputs remain outside the package; the new PNG figures were deterministically exported from package-authored SVGs using a local headless browser. All four PDFs and every new asset remain governed by the package-wide `not_fully_cleared` rights gate.

V4.0 在七项永久公共设计权利、同任务双路径、三处差异化服务接口、四类群体验收和双语 `non-ai-service-blueprint` 固定后重生四份出版物。中文/英文 A3 分别为 13/15 页，均为 297×420mm 纵向；中文/英文 A0 各 9 页，均为 1189×841mm 横向，新服务蓝图位于 A0 首板。PyMuPDF 对最终 46 页执行文本提取、页面尺寸、嵌入图像、空白页、替代字形和文本对象边界检查：A3 各含 10 个图像对象，A0 各含 9 个整板图像对象，空白页、替代字符和越界文本对象均为 0。四份最终 PDF 已重新渲染为逐页联系表并逐页视觉复查，未见裁切、重叠、错序或不可读字形。关闭字体时间戳重算并启用 ReportLab invariant 模式后，两个全新 Python 进程生成的四份 PDF 逐文件字节一致。该固定点只证明出版身份和版面检查，不证明现场服务、场地批准、无障碍合规、G1 授权或权利清除。

V4.0 regenerated all four publications after fixing the seven permanent public design rights, two paths to the same task, three differentiated service interfaces, four group-specific acceptance structures, and bilingual `non-ai-service-blueprint`. The Chinese and English A3 booklets are 13/15 pages at 297 × 420 mm portrait; each A0 set is nine pages at 1189 × 841 mm landscape, with the service blueprint on the first board. PyMuPDF checked searchable text, page size, embedded images, blank pages, replacement glyphs, and text-object bounds across the final 46 pages. Each A3 contains ten image objects and each A0 contains nine whole-board image objects; blank pages, replacement characters, and out-of-page text objects are all zero. All final PDF pages were rerendered to contact sheets and visually reviewed with no clipping, overlap, wrong order, or unreadable glyph. After disabling font timestamp recalculation and enabling ReportLab invariant mode, two fresh Python processes produced file-identical outputs for all four PDFs. This fixed point proves publication identity and layout QA only—not real service, site approval, accessibility compliance, G1 authorization, or rights clearance.

| PDF | Pages / format | SHA-256 |
|---|---|---|
| `drawings/a3-booklet.pdf` | 13 / A3 portrait | `1e0db09e230cd79ee8c20bd5ee0c7021945de293b1522de5e941cbef9a9cd0c5` |
| `drawings/a3-booklet.en.pdf` | 15 / A3 portrait | `83e65d4b7bb2b01043ad6f9030345f3bf39387f9c88a9800233ef3a56e28a506` |
| `drawings/a0-boards.pdf` | 9 / A0 landscape | `8aadc2742a6c31d6dcbb11be25cc76d7a3b995a1df8ed9bfd4320ad623450d8e` |
| `drawings/a0-boards.en.pdf` | 9 / A0 landscape | `584fab7e277becb545aaf26eb5617a3e91dce0e05e5774643e62f02480f177fa` |

本固定点的重生环境为 Python 3.13.12、ReportLab 5.0.0、fontTools 4.63.0、PyMuPDF 1.27.2.3 与 Pillow 12.2.0；本机 `NotoSansSC-VF.ttf` 在临时目录中实例化 400/700 字重，关闭时间戳重算，且不随包分发。A0 顺序固定为非 AI 服务蓝图、双轨总体、重点区平面、重点区剖面、JZ-AIOS、维护闭环、用地、慢行蓝绿、指标证据。基线为 `origin/main@6273ad9c69b6185e05ae4ab6893da45480c202dd`；临时图像 QA 输出留在包外。四份 PDF 继续受总体 `not_fully_cleared` 权利门约束。

Reproduction basis for this fixed point: Python 3.13.12, ReportLab 5.0.0, fontTools 4.63.0, PyMuPDF 1.27.2.3, and Pillow 12.2.0. The local `NotoSansSC-VF.ttf` source was instantiated at weights 400/700 in a temporary directory with timestamp recalculation disabled and is not distributed in the package. The fixed A0 order is non-AI service blueprint, twin-track overview, key-area plans, key-area sections, JZ-AIOS, maintenance loop, land use, mobility/blue-green, and metrics/evidence. The base is `origin/main@6273ad9c69b6185e05ae4ab6893da45480c202dd`; temporary image-QA outputs remain outside the package. All four PDFs remain subject to the package-wide `not_fully_cleared` rights gate.

V2.14 在三座换轨场的双语概念平面、关系剖面、首层界面、公共旅程与四态恢复门固定后重生四份出版物。中文/英文 A3 分别为 13/15 页，均为 297×420mm 纵向；中文/英文 A0 各 8 页，均为 1189×841mm 横向。PyMuPDF 对全部 44 页执行文本提取、页面尺寸、嵌入图像、空白页、替代字形和页面对象边界检查：四份 PDF 各含 8 个图像对象，空白页、替代字符和越界对象均为 0。四份逐页联系表与四张 1800×1100 最终重点区图件均完成视觉复查，`not_fully_cleared`、`geometry/*.geojson` 与 `self_check.json` 等关键标识可搜索且未被格式清理损坏。可重复生成测试曾捕获静态字体 `head.modified` 时间戳漂移；固定 `recalcTimestamp=False` 后，400/700 字重和四份最终 PDF 均在两个新进程中逐文件字节一致。以下固定点只证明出版物身份与版面检查，不证明现场执行、场地批准、G1 授权、专业合规或权利清除。

Round 3 regenerated all four publications after the final bilingual maintenance-urbanism contract, corrected 12-scene semantic crosswalk, maintenance visual entrance, and paired `implementation-roadmap` figures were fixed. The Chinese and English A3 booklets are 13/15 pages at 297 × 420 mm portrait; each A0 set is eight pages at 1189 × 841 mm landscape. PyMuPDF checked searchable text, page size, expected images, blank pages, replacement glyphs, and object bounds across all 44 pages: each PDF contains eight image objects, with zero blank pages, replacement characters, or out-of-page objects. Temporary contact sheets remain outside the package. The HTML and PDF regeneration is offline and two fresh PDF passes produced identical SHA-256 values. This fixed point proves only publication identity and layout QA—not field execution, site approval, G1 authorization, professional compliance, or rights clearance.

| PDF | Pages / format | SHA-256 |
|---|---|---|
| `drawings/a3-booklet.pdf` | 13 / A3 portrait | `2d8b78ab73bbf270dc03f0f3a81631ceca8e3a95883634a278331b188847e488` |
| `drawings/a3-booklet.en.pdf` | 15 / A3 portrait | `0e74342162b3dce1af82ca95923afb3c8f6def4e39c8ec40bb873ec556fb7414` |
| `drawings/a0-boards.pdf` | 8 / A0 landscape | `ce77074e9d98a936d5eafa31506dd5718f22c648b1f3f74d4ab191122ddb4952` |
| `drawings/a0-boards.en.pdf` | 8 / A0 landscape | `c118b3adcf099062343e3c307f222a1f32715af0e5a7ff210e23d89b2bedaa71` |

本固定点的重生环境为 Python 3.13.12、ReportLab 5.0.0、fontTools 4.63.0、PyMuPDF 1.27.2.3 与 Pillow 12.2.0；本机 `NotoSansSC-VF.ttf` 在内存中以 400/700 字重实例化，关闭时间戳重算并以 `reorderTables=False` 保存临时字体。A3 固定宽度嵌入八组完整图件，A0 固定为场地总览、用地、重点区、重点区剖面、公共连接、指标、治理内核、维护型城市实施图顺序。本轮使用 `origin/main@5570019dac023af8eb1726c1dc648a96098dd259` 为基线、在 `e855a8fb010fcb34da14229c6bac83392fec1f6b` 复基的工作树执行。投稿包不分发源字体，四份 PDF 继续受总体权利门约束。

Reproduction basis for this fixed point: Python 3.13.12, ReportLab 5.0.0, fontTools 4.63.0, PyMuPDF 1.27.2.3, and Pillow 12.2.0. The local `NotoSansSC-VF.ttf` source was instantiated in memory at weights 400/700, timestamp recalculation was disabled, and temporary fonts were saved with `reorderTables=False`. A3 uses fixed-width full-figure placement; A0 uses the order site overview, land use, key areas, key-area sections, mobility, metrics, innovation, and the maintenance-urbanism implementation figure. This run uses base `origin/main@5570019dac023af8eb1726c1dc648a96098dd259` in a worktree rebased at `e855a8fb010fcb34da14229c6bac83392fec1f6b`. No source font is shipped, and all four PDFs remain inside the package-wide rights gate.

V2.13 在双轨前台增量、最终双语正文、HTML 与双语 `site-overview` 图件完成后重生四份出版物。当前中文/英文 A3 分别为 11/12 页，均为 297×420mm 纵向；中文/英文 A0 各 8 页，均为 1189×841mm 横向。PyMuPDF 已对四份 PDF 全页执行文本提取、页面尺寸和嵌入图像计数，并以 0.20 倍矩阵逐页渲染；四份页面均有可搜索正文，A3 各含 8 个图像对象，A0 各含 8 个整板图像对象。针对首屏、双轨图件所在页和 A0 首板的 1.20 倍视觉抽查未见裁切或越界；双轨总体图位于 A0 首板，A3 中英文均可回查双轨正文与图件。以下字节身份对应本轮最终 PDF，不证明现场执行、审批、G1 授权或权利清除。

V2.13 regenerated all four publications after the twin-track frontend increment, final bilingual narratives, HTML, and bilingual `site-overview` figures were complete. The Chinese and English A3 booklets are 11/12 pages at 297 x 420 mm portrait; each A0 set is eight pages at 1189 x 841 mm landscape. PyMuPDF ran full-page text extraction, page-size checks, embedded-image counts, and a 0.20-scale render over all four PDFs; every page has searchable text, each A3 contains eight image objects, and each A0 contains eight whole-board image objects. Targeted 1.20-scale visual checks of the first pages, twin-track figure pages, and A0 first boards found no clipping or overflow in the inspected pages; the twin-track overview is the first A0 board, and both A3 languages contain the twin-track narrative and figure. The byte identities below are publication evidence only and do not prove field execution, approval, G1 authorization, or rights clearance.

| PDF | Pages / format | SHA-256 |
|---|---|---|
| `drawings/a3-booklet.pdf` | 11 / A3 portrait | `2f179a380d47c31e1e96246e106cab2909287a5485d48f0a1e28433f917c8b6f` |
| `drawings/a3-booklet.en.pdf` | 12 / A3 portrait | `dd1911f195605e1ebc7bc89b23979a839064de32123d15d486d3ee16b6a14261` |
| `drawings/a0-boards.pdf` | 8 / A0 landscape | `b0da4c89620d9e0bfbe6b74f2b23b78a5b316a4539b989a8875eb8f0f6665690` |
| `drawings/a0-boards.en.pdf` | 8 / A0 landscape | `3e1ca93e8f9b2fe04cda8789b32a24dc870de011d318843274db1ad4310eb806` |

该历史固定点的重生环境为 Python 3.13.12、ReportLab 5.0.0、fontTools 4.63.0、PyMuPDF 1.27.2.3、Pillow 12.2.0，以及在内存中以 400/700 字重实例化的本机 `NotoSansSC-VF.ttf`。A3 采用固定宽度完整图件，A0 顺序为双轨总体、用地、重点区、重点区剖面、公共连接、指标、治理内核和阶段恢复。四份 PDF 保持包级权利边界，且不分发源字体文件。

Reproduction basis for this fixed point: Python 3.13.12, ReportLab 5.0.0, fontTools 4.63.0, PyMuPDF 1.27.2.3, Pillow 12.2.0, and the local `NotoSansSC-VF.ttf` source instantiated at weights 400/700 in memory. A3 uses fixed-width full-figure placement; A0 uses the order site overview, land use, key areas, key-area sections, mobility, metrics, innovation, and implementation. All four PDFs retain the package rights boundary and no source font binary is shipped.

V2.12 在双语正文加入七组移交包和七类权利使用决策表，并压缩一段既有矩阵说明以避免英文表格在分页临界点制造孤立尾页。两个新的 Python 进程所得中英文 A3 分别逐文件一致；A0 输入没有变化，锁定的两份 A0 未被安装流程重写。最终候选 85 页 QA 为 PASS：中文/英文 A3 SHA-256 为 `3c9d26af21cff6af7eb023f51c34f72b39fb06ae17b9e82ff5740ec4f1169667` 与 `5fdf32d0991a2460847373406b30564bcd75414ddd6f4bdd21b62d9825cf37f8`，中文/英文 A0 继续为 `64291f10c05b33905ff97934eb58c6a491d7bcaedb0d2189d531e352a6837cd0` 与 `2866a3d8b0eed5de7f1ddb9c65eac3c133b9eb9aca764b5ce2dbd8484ef28da3`。中文/英文 A3 仍为 33/36 页，各语言 504/504 个正文逻辑块可搜索；所有 live text 不小于 9pt，栅格证据有效最小文字指标为 10.865pt/9.185pt。逐页渲染未见裁切、重叠、空白页、孤立尾页、错误分页或不可读字形；出版检查不证明现场、审批、G1 授权或权利清除。

V2.12 adds seven handoff packs and seven rights-use decision rows to both proposal languages, while shortening one existing matrix explanation to prevent an isolated English tail page at a table-pagination boundary. Two fresh Python processes produced file-identical Chinese and English A3 outputs respectively. A0 inputs did not change, and the two locked A0 files were not overwritten during installation. Final-candidate 85-page QA returned PASS. The Chinese and English A3 SHA-256 values are `3c9d26af21cff6af7eb023f51c34f72b39fb06ae17b9e82ff5740ec4f1169667` and `5fdf32d0991a2460847373406b30564bcd75414ddd6f4bdd21b62d9825cf37f8`; the Chinese and English A0 values remain `64291f10c05b33905ff97934eb58c6a491d7bcaedb0d2189d531e352a6837cd0` and `2866a3d8b0eed5de7f1ddb9c65eac3c133b9eb9aca764b5ce2dbd8484ef28da3`. The A3 booklets remain 33/36 pages, with 504/504 searchable narrative logical blocks in each language; all live text is at least 9pt and the effective raster-evidence minimums remain 10.865pt/9.185pt. Page rendering found no clipping, overlap, blank page, isolated tail page, bad pagination, or unreadable glyph. Publication checks prove no field action, approval, G1 authorization, or rights clearance.

V2.11 的双语正文各新增一段实施移交说明、扩展权利边界并拆分证据密集列表，因此中英文 A3 从最终内容重生；A0 的八组图件输入未变，继续保留 V2.9 字节。两个新的 Python 进程所得四份生成结果逐文件一致；仅将两份新 A3 安装进包，锁定 A0 未被重写。85 页 QA 为 PASS：中文/英文 A3 SHA-256 为 `0080af21c528ea76638773fec3c766ecbde5765fc0a7b9f6dd129ff9da89fa92` 与 `910163ee5a90db0d122b36d1996275247bb105a3b40da518715b8ffcc1be150a`，中文/英文 A0 为 `64291f10c05b33905ff97934eb58c6a491d7bcaedb0d2189d531e352a6837cd0` 与 `2866a3d8b0eed5de7f1ddb9c65eac3c133b9eb9aca764b5ce2dbd8484ef28da3`。中文/英文 A3 仍为 33/36 页，各语言 446/446 个正文逻辑块可搜索；所有 live text 不小于 9pt，栅格证据有效最小文字指标为 10.865pt/9.185pt。逐页渲染抽查未见裁切、重叠、空白页、错误分页或不可读字形；这些出版检查不构成现场、审批、G1 授权或清权证据。

V2.11 adds one implementation-handoff paragraph to each language, expands the rights boundary, and splits dense evidence lists, so both A3 booklets were regenerated from final content. The eight A0 figure inputs did not change, and the V2.9 A0 bytes remain locked. Two fresh Python processes produced file-identical four-PDF generations; only the two new A3 files were installed, while the locked A0 files were not overwritten. Full 85-page QA returned PASS. The Chinese and English A3 SHA-256 values are `0080af21c528ea76638773fec3c766ecbde5765fc0a7b9f6dd129ff9da89fa92` and `910163ee5a90db0d122b36d1996275247bb105a3b40da518715b8ffcc1be150a`; the Chinese and English A0 values remain `64291f10c05b33905ff97934eb58c6a491d7bcaedb0d2189d531e352a6837cd0` and `2866a3d8b0eed5de7f1ddb9c65eac3c133b9eb9aca764b5ce2dbd8484ef28da3`. The A3 files remain 33/36 pages, with 446/446 searchable narrative logical blocks in each language; all live text is at least 9pt and the effective raster-evidence minimums are 10.865pt/9.185pt. Page-render inspection found no clipping, overlap, blank page, bad pagination, or unreadable glyph. These publication checks prove no field action, approval, G1 authorization, or rights clearance.

V2.10 新增既有 11 个项目/试点的九类可行性证据关闭合同，并使双语正文各新增一段，因此中英文 A3 从最终内容重新生成；A0 图件输入未变，保持 V2.9 字节。两个新的 Python 进程所得四份 PDF 逐文件字节一致；85 页全量 QA 为 PASS。当前中文/英文 A3 SHA-256 为 `f07197214040f55e991c06bd7d86da4e694062cb492fb7523d165ab49aca9ab6` 与 `1fe6fdde25a154be0dc41b136255981e27a47fca31a965b765e6750d762e4bce`，中文/英文 A0 为 `64291f10c05b33905ff97934eb58c6a491d7bcaedb0d2189d531e352a6837cd0` 与 `2866a3d8b0eed5de7f1ddb9c65eac3c133b9eb9aca764b5ce2dbd8484ef28da3`。中文/英文 A3 仍为 33/36 页，中英文 A0 各 8 页；445/445 个正文逻辑块可搜索，所有 live text 不小于 9pt，中文/英文栅格证据有效最小文字指标为 10.865pt/9.185pt。该固定点取代本节以下历史 PR 的旧字节身份，但不构成现场、审批、开工、G1 授权或清权证据。

V2.10 adds a nine-category feasibility evidence-closure contract for the 11 existing projects/pilots and one paragraph to each language narrative, so both A3 booklets were regenerated from final content. A0 figure inputs did not change and retain their V2.9 bytes. Two fresh Python processes produced byte-identical files, and full 85-page QA returned PASS. The current Chinese and English A3 SHA-256 values are `f07197214040f55e991c06bd7d86da4e694062cb492fb7523d165ab49aca9ab6` and `1fe6fdde25a154be0dc41b136255981e27a47fca31a965b765e6750d762e4bce`; the Chinese and English A0 values are `64291f10c05b33905ff97934eb58c6a491d7bcaedb0d2189d531e352a6837cd0` and `2866a3d8b0eed5de7f1ddb9c65eac3c133b9eb9aca764b5ce2dbd8484ef28da3`. The A3 booklets remain 33/36 pages and both A0 sets remain eight pages; 445/445 narrative logical blocks are searchable, all live text is at least 9pt, and the effective Chinese/English raster-evidence minimums are 10.865pt/9.185pt. This fixed point supersedes the historical PR byte identities below without proving field work, approval, construction readiness, G1 authorization, or rights clearance.

本次权利证据 PR 为同步最终 `62/61` 文件计数，重新生成了中英文 A3；A0 输入未变，因此两版 A0 字节保持不变。当前四份 PDF 已在两个新的 Python 进程中连续生成，逐文件 SHA-256 完全相同；随后同一 QA 脚本复核 85 页，结果为 PASS。当前中文/英文 A3 SHA-256 分别为 `dcd1b8749eedddd72ec0b57aa6fc0af44eee3e0f3c2b2ec2094850a5cfc73d24` 与 `1d7234f55c9efe312a815ba0566ea3f4224a22b601f6df410b1b3dd3f3ab6441`；中英文 A0 仍分别为 `77bcce2d7b1a17bc6db289358e63db228681eebc3ec4ea9288f4bf5af69e7d5e` 与 `53ac76d1cc51f1eb19e8c4f9fa4b96acc3046c3c0db4f4e8f7c8c4034328c384`。本 PR 仅为 120 个既有 OSM 要素增加来源 ID，constraints 坐标规范摘要仍为 `1b5c797d29e8476d2bad8200dfa8c43b84d2651723da93190166e3694d5f634b`；其他 geometry 与 `metrics.json` 不变。下两段所列 03:31/03:35 窗口是 #1090 可读性重生的历史过程证据，其旧 A3 字节身份已由本段当前固定点取代。

This rights-evidence PR regenerated both A3 booklets to synchronize the final `62/61` file counts. A0 inputs did not change, so both A0 files remain byte-identical to the prior versions. Two fresh Python processes generated the current four PDFs with identical file-by-file SHA-256 values, after which the same QA script rechecked all 85 pages and returned PASS. The current Chinese and English A3 SHA-256 values are `dcd1b8749eedddd72ec0b57aa6fc0af44eee3e0f3c2b2ec2094850a5cfc73d24` and `1d7234f55c9efe312a815ba0566ea3f4224a22b601f6df410b1b3dd3f3ab6441`; the Chinese and English A0 values remain `77bcce2d7b1a17bc6db289358e63db228681eebc3ec4ea9288f4bf5af69e7d5e` and `53ac76d1cc51f1eb19e8c4f9fa4b96acc3046c3c0db4f4e8f7c8c4034328c384`. This PR adds a source ID to 120 existing OSM features only; the canonical constraints-coordinate digest remains `1b5c797d29e8476d2bad8200dfa8c43b84d2651723da93190166e3694d5f634b`, and all other geometry plus `metrics.json` are unchanged. The 03:31/03:35 windows in the next two paragraphs are historical process evidence from the #1090 readability regeneration; their former A3 byte identity is superseded by the current fixed point above.

最终 pass A（含 QA）的实际窗口为 2026-08-10 03:31:52 +08:00 至 03:32:36 +08:00；独立 pass B 的窗口为 03:34:32 +08:00 至 03:35:26 +08:00。两个 pass 均在全新的 Python 进程中运行，四份包内 PDF 与 pass A 逐文件字节相同，pass A 与 pass B 也逐文件字节相同。中文 A3 为 33 页、英文 A3 为 36 页，均为 297×420mm 纵向。八组 1800×1100 图件在每种语言 A3 中各自按 `[0,168,620,1060]`、`[590,168,1210,1060]`、`[1180,168,1800,1060]` 拆成三个 620×892 裁片，每片以 245mm 宽独占细节页，相邻裁片重叠 30px；因此每种语言为 8 组/24 个裁片，不再在 A3 嵌入整张 1800×1100 图。中文/英文栅格证据的有效最小文字指标分别为 10.865pt 与 9.297pt，所有 live text 不小于 9pt，443/443 个逻辑块可搜索。中英文 A0 各 8 页、均为 1189×841mm 横向，继续按“场地总览—用地—重点区—重点区剖面—交通—指标—创新—实施”顺序将整图置于 1149mm 安全版心，原字节未变。PyMuPDF 以 1.6 倍渲染并检查全部 85 页；未发现裁切、越界、空白页、孤立标题、错序或不可读字形。生成与版式 QA 不证明现实执行；T-02 仍为 G0：1 次合成治理回放、0 回答输出、0 现场测试。

The final pass A window, including QA, was 2026-08-10 03:31:52 +08:00 to 03:32:36 +08:00; independent pass B ran from 03:34:32 +08:00 to 03:35:26 +08:00. Each pass ran in a fresh Python process. Every package PDF is byte-identical to pass A, and pass A is byte-identical to pass B file by file. The Chinese A3 booklet has 33 portrait 297 × 420 mm pages and the English booklet has 36. In each language, every one of the eight 1800 × 1100 figures is divided into crops `[0,168,620,1060]`, `[590,168,1210,1060]`, and `[1180,168,1800,1060]`; each 620 × 892 crop occupies a 245 mm-wide detail page, with 30 px overlap between adjacent panels. Each language therefore contains 8 sets/24 crops and no embedded 1800 × 1100 whole-board A3 image. The minimum effective raster-evidence text metrics are 10.865 pt for Chinese and 9.297 pt for English; all live text is at least 9 pt, and 443/443 logical blocks are searchable. Each language retains eight landscape 1189 × 841 mm A0 whole-board overview pages in the order site overview, land use, key areas, key-area sections, mobility, metrics, innovation, and implementation, inside the 1149 mm safe frame; those A0 bytes are unchanged. PyMuPDF rendered and checked all 85 pages at 1.6×; no clipping, media-box overflow, blank page, isolated heading, wrong order, or unreadable glyph was found. Generation and layout QA do not prove real-world execution. T-02 remains G0: one synthetic governance replay, 0 answer outputs, and 0 field tests.

| PDF | Pages / format | SHA-256 |
|---|---|---|
| `drawings/a3-booklet.pdf` | 33 / A3 portrait | `3c9d26af21cff6af7eb023f51c34f72b39fb06ae17b9e82ff5740ec4f1169667` |
| `drawings/a3-booklet.en.pdf` | 36 / A3 portrait | `5fdf32d0991a2460847373406b30564bcd75414ddd6f4bdd21b62d9825cf37f8` |
| `drawings/a0-boards.pdf` | 8 / A0 landscape | `64291f10c05b33905ff97934eb58c6a491d7bcaedb0d2189d531e352a6837cd0` |
| `drawings/a0-boards.en.pdf` | 8 / A0 landscape | `2866a3d8b0eed5de7f1ddb9c65eac3c133b9eb9aca764b5ce2dbd8484ef28da3` |

Reproduction basis: Python 3.13.12 (Anaconda build, 2026-02-24), ReportLab 5.0.0, fontTools 4.63.0, PyMuPDF 1.27.2.3, and Pillow 12.2.0 were used; Poppler was unavailable. ReportLab emitted compressed PDFs with `invariant=1`, fixed metadata, fixed input ordering, and the exact A3 crop boxes recorded above. `fontTools.varLib.instancer.instantiateVariableFont(..., optimize=True, updateFontNames=True, static=True)` instantiated in-memory 400/700 weights from `C:/Windows/Fonts/NotoSansSC-VF.ttf` (name-table version `2.04;241114210130;non-release`, SHA-256 `763146584cf0710223441356b4395e279021b0806c196614377a7a0174ae074a`, local name-table license SIL OFL 1.1). The source font binary and temporary static fonts are not shipped. Searchable final spans use only `NotoSansSC-Regular` and `NotoSansSC-Bold`; the A3 resource dictionaries retain an unused Helvetica declaration with zero Helvetica spans and no embedded Helvetica program. PyMuPDF and Pillow verified exact crop pixels, full x coverage, 30 px overlaps, 24 A3 crops/eight figure sets per language, zero whole-board A3 images, 504/504 searchable logical blocks, rendering, extraction, geometry, ordering, content bounds, and full-package contact sheets. Geometry and `metrics.json` remain unchanged. No repository script was changed. Future source or figure changes require regeneration, manifest refresh, and full validation; this record makes no trusted-CI, human-review, rights-clearance, G1-authorization, or field-success claim.

## 不可变验证证据 / Immutable validation evidence

| Field | Immutable value |
|---|---|
| `validated_commit` | `e71ff206800fbd154cbcb8a3b9b139e600f1bd97` |
| `validation_run_id` | `31273071020` |
| `validation_run_url` | [submission-validation Run 31273071020](https://github.com/open-city-ai/haidian/actions/runs/31273071020) |
| `validation_status` | `SUCCESS` |
| `validation_completed_at_utc` | `2026-08-08T18:55:03Z` |
| `validated_manifest_sha256` | `4b7fc901c06065872b496f8f481914ec9fc6044d23f248946793b17c3445f506` |
| `snapshot_generated_at_utc` | `2026-08-08T19:02:52Z` |

上述记录只证明 exact head `e71ff206…` 及其 manifest 原始 Git blob。任何后续提交都会使这些 `[x]` 对新 head 失去自动继承资格；新 head 是否通过，以 GitHub 上绑定该 head 的可信 check 为准。包内 Markdown 无法在不制造新提交的情况下自证“当前最终 commit”，因此这里保留上一份已完成验证的不可变指针，不把未来运行写成既成事实。

The record above validates only exact head `e71ff206…` and its raw manifest Git blob. A later commit cannot inherit these `[x]` automatically; the trusted GitHub check attached to that later head is authoritative. A package-local Markdown file cannot self-record its own final commit without creating another commit, so this section preserves the last completed immutable pointer and does not claim a future run as completed.

## 状态语义 / Status semantics

- `[x]`：已由上方 exact commit/run 快照或可复现命令验证，只适用于该不可变快照。
- `[ ]`：尚待人工决定、正式资料或现实测试；不自动等于本地 gate 失败。
- 任一内容文件变化后，必须把准备复制的所有 `[x]` 重置为 `[ ]`，重新核验 manifest 哈希并等待新 head 的可信验证。

- `[x]`: verified by the exact commit/run snapshot above or a reproducible command, and valid only for that immutable snapshot.
- `[ ]`: pending a human decision, official material, or real-world testing; it is not automatically a local-gate failure.
- After any content-file change, reset every checkbox intended for copying from `[x]` to `[ ]`, revalidate all manifest hashes, and wait for the trusted check on the new head.

## 已验证快照（仅对应 `e71ff206…`）/ Validated snapshot (`e71ff206…` only)

### 范围与完整性 / Scope and integrity

- [x] 变更只位于 `submissions/xyh202131/jingzhang-ai-pilgrimage-belt/`。
- [x] `package_type=professional_design_package` 且 `package_state=ready_for_review`。
- [x] manifest 登记 48 个路径，47 个非自引用内容文件均有 SHA-256。
- [x] 权利台账覆盖 48 个 manifest 路径，无漏项、未知路径或重复归组。
- [x] 中文主稿、英文展示稿及对应离线 HTML 的关键数字与边界一致。

- [x] Changes stay inside `submissions/xyh202131/jingzhang-ai-pilgrimage-belt/`.
- [x] `package_type=professional_design_package` and `package_state=ready_for_review`.
- [x] The manifest declares 48 paths and SHA-256 values for all 47 non-self-referential content files.
- [x] The rights ledger covers all 48 manifest paths with no missing, unknown, or duplicate grouping.
- [x] Key numbers and boundaries align across the Chinese report, English display copy, and paired offline HTML.

### 自动化 gate / Automated gates

- [x] 严格 advisory score 为 8/8，`needs-work=0`、`missing=0`。
- [x] deterministic、spatial、visual 与 professional review 均为 PASS。
- [x] 综合 self-check 为 `ok=true`、`review_status=formal-review-ready`。
- [x] participant preflight 无目录外文件和内容 blocker。
- [x] 47 个内容文件哈希与暂存/提交 Git blob 逐项一致。
- [x] `git diff --check` 无空白错误。

- [x] Strict advisory score is 8/8 with `needs-work=0` and `missing=0`.
- [x] Deterministic, spatial, visual, and professional review gates pass.
- [x] Combined self-check reports `ok=true` and `review_status=formal-review-ready`.
- [x] Participant preflight reports no out-of-scope file or content blocker.
- [x] All 47 content hashes match staged/committed Git blobs.
- [x] `git diff --check` reports no whitespace error.

### 证据边界 / Evidence boundaries

- [x] 场地与三处重点区保持 provisional，不冒充官方红线或精确面积依据。
- [x] 25 条来源均记录可用与禁用范围；已完成刷新审计数保持为 0。
- [x] 全部 AI 场景保持 G0，不声明已批准、已建设、已运行或已获机构承诺。
- [x] 非 AI 通道、人工兜底、申诉、停止与退役字段只证明设计覆盖，不冒充现场效果。
- [x] 权利总体状态保持 `not_fully_cleared`，独立逐文件清权审计完成数为 0。

- [x] The site and three key areas remain provisional and are not represented as official redlines or precise-area evidence.
- [x] All 25 sources record permitted and prohibited uses; completed refresh audits remain at 0.
- [x] Every AI scenario remains at G0, with no claim of approval, construction, operation, or institutional commitment.
- [x] Non-AI access, human fallback, grievance, stop, and retirement fields prove design coverage only, not field performance.
- [x] Overall rights status remains `not_fully_cleared`, with 0 completed independent file-level clearance audits.

## 仍需人工或外部完成 / Human or external completion still required

- [ ] 维护者完成人工内容、视觉与版权判断并决定是否合并/发布。
- [ ] 正式边界、控规和现状资料到位后完成差异比对与全量复算。
- [ ] 完成许可条款、字体、OSM 衍生数据库、工具输出、Logo/商标和可编辑源的独立权利审计。
- [ ] 完成适用的规划、建筑、交通、市政、景观、消防、铁路安全、无障碍、数据安全和法律审查。
- [ ] 在获批、限时、限域和有责任主体的条件下完成现场或受控测试。

- [ ] Maintainers complete human content, visual, and rights judgment and decide whether to merge or publish.
- [ ] After official geometry, controls, and existing-condition material arrive, complete difference analysis and full recalculation.
- [ ] Complete independent review of license terms, fonts, OSM-derived databases, tool outputs, logo/trademarks, and editable sources.
- [ ] Complete applicable planning, architecture, transport, municipal, landscape, fire, railway-safety, accessibility, data-security, and legal review.
- [ ] Complete field or controlled testing only under approved, time-bounded, place-bounded, and accountable conditions.

## 下次 PR 可复制模板 / Copyable checklist for the next PR

> 以下项目故意保持未勾选。开始下一次增量时，只复制本节并保持全部 `[ ]`；不得复制或继承上方任何 `[x]`、commit、run、manifest SHA 或生成时间。完成一项再勾选一项。
>
> The items below are intentionally unchecked. For the next increment, copy only this section and keep every item at `[ ]`. Do not copy or inherit any `[x]`, commit, run, manifest SHA, or timestamp above. Check each item only after completion.

- [ ] 从最新 `origin/main` 创建独立分支，确认前一个投稿 PR 已合并或关闭。
- [ ] 只实现一个可命名、可验证的小增量，只修改自己的投稿目录。
- [ ] 同步中文主稿、英文展示稿和对应离线 HTML。
- [ ] 不新增虚构审批、合作方、资金、建设、运行、测试或清权结果。
- [ ] 内容先暂存；从暂存 Git blob 计算 SHA-256；manifest 最后暂存。
- [ ] 运行 strict score、deterministic、spatial、visual、professional、self-check 与 participant preflight。
- [ ] 提交后复核 committed Git blob 哈希；fork 推送 dry-run 通过。
- [ ] 创建 Ready PR（非 Draft），确认文件范围、无冲突和可信 `submission-validation`。

- [ ] Branch from the latest `origin/main` after the previous submission PR is merged or closed.
- [ ] Implement one named, verifiable increment and modify only the contributor-owned package.
- [ ] Synchronize the Chinese report, English display copy, and paired offline HTML.
- [ ] Add no fabricated approval, partner, funding, construction, operation, test, or rights-clearance result.
- [ ] Stage content first, calculate SHA-256 from staged Git blobs, and stage the manifest last.
- [ ] Run strict score, deterministic, spatial, visual, professional, self-check, and participant preflight gates.
- [ ] Reverify committed Git blob hashes and pass the fork push dry-run.
- [ ] Open a Ready PR (not Draft) and confirm file scope, mergeability, and trusted `submission-validation`.

## 复现命令 / Reproduction commands

```powershell
$pkg = 'submissions/xyh202131/jingzhang-ai-pilgrimage-belt'
node "$pkg/visual/assets/run_t02_g0_g1_replay.js" --check
node "$pkg/visual/assets/run_t02_g0_g1_replay.js" --check
python scripts/score_submission.py "$pkg/proposal.md" --strict --json
python scripts/spatial_review.py $pkg --stage formal --json
python scripts/visual_review.py $pkg --json
python scripts/professional_review.py $pkg --json
python scripts/self_check_submission.py $pkg --pr-author xyh202131 --json
python scripts/participant_preflight.py $pkg --pr-author xyh202131 --json
git diff --check
```

若 `origin` 指向只读公共仓库，对可写 fork 另行执行 `git push --dry-run fork HEAD:<branch>`。

If `origin` is the read-only canonical repository, separately run `git push --dry-run fork HEAD:<branch>` against the writable fork.

## 第 13 轮增量 / Round 13 increment

- 新增三处可逆构件与恢复装配册、六阶段生命周期和 D01—D08 / H01—H07 回链；三处构图不可机械复制。
- Added three non-copyable reversible assembly/restoration packs, a six-stage lifecycle, and D01–D08 / H01–H07 backlinks.
- 类型、尺寸、材料、连接、专项核验、位置、安装方法和恢复时长均为 unknown；现实安装、批准、责任、检查、拆除与验收均为 0。
- Type, dimension, material, connection, specialist clearance, location, installation method and restoration duration remain unknown; real installation, approval, duty, inspection, removal and acceptance counts remain 0.


## Round 14 accessible offline review walk / 第14轮可访问离线评审漫游

`visual/index.html#accessible-review-walk` and its `.en.html` counterpart provide a five-step, fully local review route. Static semantic HTML contains the complete argument and evidence boundaries; dependency-free JavaScript only adds hash and keyboard navigation. There are 0 remote dependencies, accounts, QR codes, forms, trackers, autoplay or AI requirements. This is a presentation route, not evidence or accessibility certification. The fourteen-round audit retains Twin-track Jing-Zhang, the three differentiated prototypes, JZ-AIOS/G0–G3/evidence gates/rights boundary, 12 scenes, 8 projects, 3 key areas, 99 closure slots, provisional geometry, all-G0 status, NO-GO and `not_fully_cleared`.

### Round 14 final publication evidence

Two fresh deterministic builds produced the same four SHA-256 values. Page-size, blank-page, replacement-glyph and out-of-media-box checks are rerun separately; presentation PASS does not change G0 or rights state.

- `a0-boards.en.pdf`: 18 pages; SHA-256 `6c07229b92eefc79604a9a4c4cf15b672fb4640637b50ba193e79f35d4887a02`
- `a0-boards.pdf`: 18 pages; SHA-256 `32d9f5e9c0eec2140d8057b58c68ce92bb74e6710a28a0318ff9833804a7712f`
- `a3-booklet.en.pdf`: 73 pages; SHA-256 `0e4bc3aae048eddbeb39aaa9211e7a4a3158396405cc52b3d4d7630b76022932`
- `a3-booklet.pdf`: 69 pages; SHA-256 `d225e095cf5c95a2ccdd83c37d5f8ecba30a8fb647f74ddd902673d975bbafd5`

## Round 15 field-evidence intake / 第15轮现场证据采集与替换

第15轮只把既有 D01—D08 与 H01—H07 转成空白资料包、保管链、最低质量门和专业处置状态。八包均为 `not_collected`、材料 0、现场值 `null`、接收用于复算 0、批准 0；三处未来采集路线完成数 0。众智园针对隔离、停止和还场；原点针对同意撤回、保障和居民日常；大钟寺针对高峰连续、来源版本和纠错。模板、字段覆盖、文件 PASS、PR 审查或合并都不是现场证据、专业接受或 G1 授权。

Round 15 turns existing D01-D08 and H01-H07 into empty packets, custody, minimum-quality gates and professional dispositions only. All eight packets remain `not_collected`, with 0 artifacts, `null` field values, 0 acceptances for recalculation and 0 approvals; completed future route walks remain 0. Zhongzhiyuan focuses on isolation, stop and restoration; Origin on consent withdrawal, safeguarding and resident daily life; Dazhongsi on peak continuity, source version and correction. A template, field coverage, file PASS, PR review or merge is not field evidence, professional acceptance or G1 authorization.

[source:SOURCE-JZ-COMMONS-LOOP-METHOD-R15] PR #2266 contributes public disposition semantics only. The package normalizes them into retaining the ordinary baseline, returning a packet, applying NO-GO/conflict hold, and restoring ordinary use or retiring an overlay. No Commons Loop brand, composition, geometry, metric, figure, media or claim is imported.

The final publications were built twice in fresh Python processes with a fixed font timestamp and produced identical file bytes. Layout QA must still be read together with the G0 and rights boundaries; publication determinism proves no field fact.

| PDF | Pages / format | SHA-256 |
|---|---|---|
| `drawings/a3-booklet.pdf` | 66 / A3 portrait | `8f6b8bea4f9c2b458876a99a4642660e1954dd8d8b45291801db137b2c20a035` |
| `drawings/a3-booklet.en.pdf` | 71 / A3 portrait | `524d6ca44aaa9820658855c256aa4152dce18e9694536a4bcc6364a62edaa7e4` |
| `drawings/a0-boards.pdf` | 18 / A0 landscape | `686a2524d9d6f72486d32fbc3e13da3feb1e3f1d5e7f298c6ba9ce89559d47aa` |
| `drawings/a0-boards.en.pdf` | 18 / A0 landscape | `540a4da7756ee2ff4ccf5cf6f55013c03a12ef7a7caf4ba796bde1f2694e490f` |

本轮新增 1 个双语图对、1 个结构化合同和 1 个基线哈希记录；12 场景、8 项目、3 重点区、99 槽、geometry、metrics、全部 G0、临时边界、NO-GO 与 `not_fully_cleared` 不变。基线记录证明文件字节冻结，不证明其中空间信息已成为官方或现实真值。

This round adds one bilingual figure pair, one structured contract and one baseline-hash record. Twelve scenes, eight projects, three key areas, 99 slots, geometry, metrics, all-G0 status, provisional boundaries, NO-GO and `not_fully_cleared` remain unchanged. The baseline record freezes file bytes; it does not make their spatial content official or true in the field.
