# 方案迭代记录

## v2.3 - 2026-08-23

C-01/C-02/C-04 synthetic capacity admission envelope / 合成容量准入包络

- Baseline / 基线：从 `upstream/main` `d2fd993aff6f1afc1e21496581ae2de85779532a` 建立干净分支 `codex/data-coop-line-capacity-envelope-20260823`；启动时自己的旗舰与公共贡献开放 PR 均为 0。原工作树已有两份报告 HTML 改动，未读取为本轮成果、未覆盖、未暂存，本轮始终在隔离 worktree 内实施。
- Gap & users / 缺口与使用者：既有 C-01 用途票、C-02 无数据等价服务与 C-04 受控计算站写清了原则和停机边界，但真实容量正确保持 `null / unknown` 时，运营交接与规划评审仍缺少可独立复算的需求—服务单元—无数据预留—停止预留准入模型。新增证据服务于运营团队、规划评审者及选择无数据正线的人，不把合成数字冒充工程量。
- Canonical envelope / 单一事实源：在既有 `EXPIRING-DATA-TICKET-01` 内原位升级至 v1.1.0，并新增 `SCN06-C010204-SYNTHETIC-CAPACITY-01`；不新增近似载体。唯一 60 分钟投稿自有夹具含 12 个合成请求，全部资源使用“抽象并行服务单元”，明确排除实名或实数人员、硬件、供配电、散热、网络、场地、消防、成本、采购与审批推断。
- Recalculation / 复算：C-01 以 4 单元、15 分钟/请求复算容量 16、需求 12、余量 4；C-02 数据线与无数据线各保留不可互借的 2 单元，分别容量 10、需求 6、余量 4，无数据/数据容量比 1.0；C-04 在 4 单元中保护 1 单元只用于拆卸与恢复，以 3 单元复算容量 9、需求 6、余量 3。审计从服务时长、可用单元与需求重算 available、capacity、headroom 与 utilization，不信任手填合计。
- Fail-closed / 失败即停：4/4 资源闸门与 3/3 项目闸门通过；五个在内存执行的变体分别篡改计算、让需求超过 C-01、借走无数据单元、移除 C-04 停止预留及伪造现场确认，5/5 必须命中各自断言并失败。容量负例与既有 10 个数据票负例共同由同一只读运行器执行，不通过删减或跳过检查制造通过。
- Traceability & carriers / 追踪与载体：新增六项 `synthetic_contract_test`、低置信度指标和假设 `A-SYNTHETIC-CAPACITY-001`，同步 compliance、design-depth、standard matrix、中英正文、脚本派生报告与离线 visual；GeoJSON、来源、许可、证据快照、核心方向和现场包不变。视觉只复用既有组件，不新增图件；A3/A0 页面内容不重排。报告经当前 renderer 更新后继续执行既有派生修复：保留单一 `<h1>` 并恢复长代码令牌断行；中英 390 px 与 1440 px 视口均无页面横向溢出。
- Derived-chain recertification / 派生链重认证：完整 `metrics.json` 哈希变化使 planning-alignment 审计按预期 fail-closed；未缩窄校验，而是把 prior `9c27a7ff…` 更新为 current `d94a8b7b…`，登记六项非空间 E2 容量指标并重核九个 geometry 哈希与证据签名不变。规划 register 新 SHA-256 为 `daea14242a25926bebbe781d948571117e71c418304dc7a7c7951e49b37e2f7d`；双语 planning-alignment PNG 仅更新文本元数据且像素哈希不变，四份 PDF 仅等长替换证明令牌且 32 页低分辨率渲染哈希逐页不变。
- Evidence boundary / 证据边界：合成包络把容量主张从 E0 叙述提升为可复算 E2 准入证据；真实运营主体、人员、设备、工程、场地、成本、许可、采购、审批、专业确认和实际需求仍为 `null / unknown / not_observed`，现场状态固定为 `not_ready_for_field_operation`。它不构成 E3 现场、E4 主体/专业确认、E5 采用或实施承诺；`SCN-06-E3E4` 继续 `DEFERRED / DO_NOT_CONTACT / DO_NOT_REASK`。
- Verification / 验证：专项复核已取得 site evidence 18/18、field validation 215/215、drill 21/21 与 8/8 负向、review spine 94/94 与负向自测、planning alignment 131/131 与负向自测；ready-package 的 manifest refresh、完整 self-check、strict manifest、participant preflight 与 push dry-run 的最终状态只以本轮最终机器输出为准。

## v2.2 - 2026-08-22

P1-07 expiring data-ticket contract / 会到期、会撤回、会披露残余并回报公共价值的数据票

- Baseline / 基线：从 `upstream/main` `a8f150d86480f8efc0716069ece406edf013502b` 建立干净分支 `codex/data-coop-line-expiring-ticket-20260822`。发布前最后观察官方 main 为 `34dbff3f8b074cf333fc0539daadf952987cc795`（`2026-08-22T19:19:22.893+08:00`）；冻结点后的 33 个提交、164 个唯一文件只修改 7 个其他投稿，未触及本投稿、Skill、brief、schema、validator、helper、source registry、Gallery、公开页面或 required check，故保留冻结基线并避免无关派生物 churn。
- Gap & reason / 缺口与原因：既有方案阐明用途票、受控计算、撤回回执与无数据正线，却没有一份同时约束票生命周期、执行状态、唯一问责、到期/撤回 SLA、无数据等价容差、残余影响和公共回报的 canonical 契约；正文还把方案自拟“三定位/五功能”写成了任务书原项。该缺口直接影响 AI 规划创新、实施交接、公共利益与正式任务书对齐。
- Canonical contract / 单一事实源：新增唯一载体 `visual/assets/expiring-data-ticket-protocol.json`（`EXPIRING-DATA-TICKET-01`，`SCN-06 / PROV-KEY-001`）。治理状态为 `draft → co_decided → active → expired|withdrawn → residual_disclosed → return_accepted → closed`；执行状态新增 `stopping`，到期或撤回同刻禁新 query/output、仅允许 teardown，并在 60 秒内进入 `stopped`。9 类未分配角色组成 8 项 RACI、每项恰好一个 A，4 类角色保留单方停机权；12 类条件审计产物、10 项停止触发器与 8 项 Gate 2 阻断条件全部机器可读。
- Synthetic evidence / 合成证据：`CASE-NORMAL-EXPIRY-01` 与 `CASE-MIDSTREAM-WITHDRAWAL-01` 分别覆盖正常到期和存在不可彻底回滚残余的中途撤回。每线至少 30 次、时间差与比值双阈值、零价格溢价、失败率差、核心输出/安全、人工接管和 6 类任务 × 2 路线无障碍合成夹具均 fail-closed；观察用户数固定为 0，覆盖不等于可用性绩效。公共回报验收新增双语公共审计卡、独立复算价值、证据指针、验收范围和 `not_observed` 影响边界。`evidence-consistency.js` 实际复演票—执行耦合、单节点范围、两线任务、公共回报与条件证据。2/2 合成案例通过，10/10 独立负向变异被拒绝，证据等级严格保持 E2。
- Spatial & official crosswalk / 空间与任务书对齐：机器核对 `SCN-06` 位于临时 `PROV-KEY-001`，但不在 `BLDG-002` polygon 内，后者只写作 `conceptual_host_candidate`。协议明确为单节点 E2：不向 AI 原点或独立的大钟寺包传票、传数、移交角色或停机权；未来扩围必须另建版本化 handoff 并补 E3/E4。中英正文与视觉逐项恢复正式三定位（百年京张文化带、都市AI生活体验带、AI融合创新带）和正式五功能（AI全栈自主创新体系、世界级AI创新生态、AI+场景赋能新范式、智能化AI活力城市、AI治理全球话语权）；方案自拟表达明确降为设计响应。
- Carriers & scope / 载体与范围：唯一新增一个 canonical JSON；扩展既有审计脚本、metrics、assumptions、compliance matrix、双语正文与离线视觉；原位替换 `key-areas` 双语 2400×1500 技术图并由既有 A3/A0 版式复用，不新增近似图件。GeoJSON、来源、许可、媒体与既有证据签名不变；全部修改限于本投稿目录。
- Derived-chain recertification / 派生链重认证：新增五项非空间 E2 治理指标使 planning-alignment 对完整 `metrics.json` 的固定输入哈希按预期 fail-closed；未缩窄或绕过检查，而是把 `DATA-COOP-PLAN-ALIGNMENT-01` 升级为 schema 1.2.0，记录旧/新完整哈希与五项新增指标，并重新核验九个 GeoJSON 哈希和既有证据签名不变。新 register SHA-256 为 `59d5a1bf4ab30e5b3fc7216d2191e378881ec4af80ee0e902af8da64fa3657c9`。
- Offline accessibility repair / 离线无障碍修复：最终 Chromium `file://` 复核发现五项可复现缺口并原位修复：中英报告的长 SHA-256 可在 400 px 视口断行；双语 visual 增加 skip link、main 焦点目标、导航可访问名称和键盘焦点自动居中；`prefers-reduced-motion` 覆盖全页平滑滚动；canonical `experience.vtt` 的原始字节以 `data:text/vtt;base64` 精确内嵌到两份 visual，避免本地文件唯一源策略令 `<track>` 进入 error，同时继续保留独立 VTT 与文字稿供审计和下载；中英报告删除 renderer hero 后的同文重复 `<h1>`，恢复每页唯一一级标题。修复不改视频、字幕文本、核心协议、GeoJSON、metrics 或 PDF。
- Evidence boundary / 证据边界：所有阈值都是待 E3 授权现场测试与 E4 专业/运营主体确认的 E2 合成准入线，不是实测 SLA。没有采集现场、用户或利益相关方证据，没有确认主体、法律角色、场地、容量、许可、资金、无障碍绩效、公共影响或实施；停止不等于彻底抹除，合成交付一致性不等于公共影响，公共回报不购买同意，GitHub 合并也不等于实施。

## v2.1 - 2026-08-22

P2-04 offline experience and media / 离线体验与媒体：服务旅程短片、可键盘交互旅程与原创封面

- Baseline / 基线：从最新 `upstream/main` `58b8dd439e6ad519dc9b8ce70c04b6256232eca0`（最后观察 `2026-08-22T10:24:00+08:00`）建立干净分支 `codex/data-coop-line-p2-04-media-journey-20260822`。前次观察 2518132221（P2-06 合并点）至冻结点仅含 Anshengdesign/aplaybox 投稿变更，未触及本投稿、投稿 Skill、brief、schema、validator、helper 或门禁，判定无关。
- Reason / 原因：投稿 Skill 明确鼓励多模态表达；本包此前零媒体、零交互，是公开详情页与 Gallery 的最大表达缺口。仓库 proposal-view 原生支持 manifest 媒体条目（video/poster/caption/transcript 角色）与 `visual/index.html` 交互入口，闭环路径现成。
- Before → After / 修正前后：修订前 Gallery 卡片使用仓库生成的默认封面，公开页无视频、无交互；修订后新增 `assets/media/experience.mp4`（44 秒无声概念短片：正线生长 → 三站 → 六闸门 → 12+3 场景矩阵 → 证据封底，中英双语 VTT 字幕、文字稿与权利说明、海报帧齐全）、双语「服务旅程」交互区段（ARIA tablist、键盘 ←/→、reduced-motion 降级、无 JS 静态可读）与原创 `cover.webp`（经 `manifest.cover_image` 登记）。
- Rights & scope / 权利与范围：视频、海报与封面全部由包内设计语言逐帧原创绘制（Pillow + 本地 ffmpeg 编码），不含外部图片、音频、地图或人物素材；geometry、metrics、证据签名、许可与核心价值主张不变。
- Verification / 验证：视频逐场景抽帧 QA；交互区段桌面与移动视口、键盘操作与无 JS 回退检查；四门 self-check、六项专项审计与 preflight 全 PASS；manifest 五个新媒体条目角色与 sha256 齐全。

## v2.0 - 2026-08-22


P2-06 A3/A0 narrative rebuild / A3 与 A0 图纸叙事重构（兑现台账 P2-03「A3/A0 重构」待办项；该编号曾被评审脊柱轮占用，本轮以 P2-06 执行并消解）

- Baseline / 基线：从最新 `upstream/main` `704cdf5ed33b31ab4fcd115f20f715224e7fdbf5`（最后观察 `2026-08-22T08:39:00+08:00`，即 P1-06 合并点，零移动）建立干净分支 `codex/data-coop-line-p2-06-a3a0-narrative-20260822`。
- Reason / 原因：旧 A3（11 页）/A0（9 页）为逐轮追加的薄页，页面日期混乱（08-15/08-20 并存）、多数页无图件锚点、叙事不连贯，是评审体验最弱载体；台账 P2-03 要求详图、剖面、实施、复算关系与服务旅程形成连贯叙事且中英等价。
- Before → After / 修正前后：修订前为「脊柱图单页 + 7 张旧页 + 3 张追加页」的拼贴；修订后 A3 中英各 12 页（封面 KPI 与证据链 → 五分钟评审入口 → 场地范围 → 用地结构 → 三区两翼 → 慢行蓝绿 → 指标复算 → 大钟寺现场 → 演练失败测试 → 控规对齐 → 12+3 场景矩阵 → 实施与审计令牌封底），A0 中英各 4 板（总览 / 空间系统 / 证据运营 / 对齐治理）；每页统一页眉页码、冻结标识与临时边界声明，全部锚定包内既有图件与 metrics，中英逐页等价。
- Evidence integrity / 证据完整性：geometry、metrics、来源、许可、证据签名 `c880c438…`、核心价值主张与方案方向均不变；四份 PDF 的 Info 元数据与封底令牌页继续携带 SPINE/FIELD/DRILL/PLAN 全 ID 与哈希、证据签名、基线与冻结 SHA；`metrics-evidence` 图件在每份 PDF 中仍恰好嵌入一张当前 raster（evidence-consistency 的 PDF 像素审计硬约束，已逐份验证 count=1）。
- Verification / 验证：四份 PDF 共 32 页全部渲染逐页检查（封面 KPI、面板正文、场景矩阵、令牌页无丢字）；`refresh_submission_manifest.py` → 完整 self-check → 六项专项审计 → preflight 的完整门禁链复跑，结果以 `manifest.json` 与 `self_check.json` 为准。
- Scope & boundary / 范围与边界：仅修改 `submissions/dvd233/data-coop-line/` 下四份 drawings PDF 与本 changelog；不重渲染既有图件，不改任何 JSON/GeoJSON/HTML；已合并 PR 全部只读。

## v1.9 - 2026-08-22


P1-06 official-publication upgrade of plan alignment evidence / 控规官方公开版页面的证据层级升级

- Baseline / 基线：从最新 `upstream/main` `c79854e90b2e9a641d367c9e91f3f3031e20c127`（最后观察 `2026-08-22T06:44:00+08:00`）建立干净分支 `codex/data-coop-line-p1-06-official-plan-20260822`。前次观察 `5287a6299d77c7298bd56853097add81401bf0c6` 至冻结点仅含其他投稿合并，未触及本投稿、投稿 Skill、brief、schema、validator、helper 或门禁，判定与本轮无关，不重建基线。
- Reason / 原因：海淀区人民政府门户网站于 2026-08-17 发布《HD00—1601 等街区控制性详细规划（街区层面）（2024—2035 年）（公开版）》文本页，P1-05 中仅由媒体报道承载的范围、街区、面积与版本标签事实由此获得官方公开层级的可核验出处；这是主控预设的下一任务方向，不改变方案方向、许可或空间量即可单轮闭环。
- New evidence / 新证据：`JINGZHANG-PLAN-OFFICIAL-PUBLICATION-20260817`（`zyk.bjhd.gov.cn` 公开页，发布 2026-08-17，检索 2026-08-22，响应字节 SHA-256 `e669105c1f94081213740a44a899b2823aff9622e8b3f89a48fac7fce8073b86`，两次取回一致）。官方总则可逐字核验：2024—2035 版本标签、四至、HD00—1601 等九个街区编码、规划总面积 16.7 平方公里、75 个主导功能分区、规划成果均为法定审批文件。
- Before → After / 修正前后：修订前，四至、街区数、面积与版本标签仅停留在媒体报道层级，2022—2035 与 2024—2035 标签维持「未调和」；修订后，上述范围事实升级为官方公开层级，2024—2035 获批版本标签获官方文本确认（2022—2035 仍归属 2025 草案通告，不推断修编链）；唯一事实源 `visual/assets/planning-alignment-register.json`（Register ID `DATA-COOP-PLAN-ALIGNMENT-01`，SHA-256 `fa284ec31ae8fc68a88a3b73ef9b3eb2cf9278f597b9df55ae3f0d391d45adda`）升级为三层证据、7 条文本事实与新的版本差异状态。
- Remaining gaps / 仍未取得：官方批复文号与确切批复日期（公开页未载，不推断）；完整控规文本（全文 PDF 附件于 2026-08-22 检索返回 HTTP 404）；法定图纸/图则；清权 vector。报道面积口径（约 1668.2 公顷）与官方口径（16.7 平方公里）分别归因，均不进入 `metrics.json`；文字四至不绘制 polygon；`constraints.geojson` 保持 0 feature。
- Carriers & rights / 载体与权利：同步中英 proposal、脚本派生报告 HTML、双语离线 visual、来源/假设/版权说明、来源备注、changelog，重新生成 2400×1500 双语原创技术图（PNG tEXt 写入 Register ID、新哈希、冻结 SHA 与三条来源 ID），四份 PDF 的 P1-05 页原位替换为 P1-06 页并刷新 Info 元数据令牌。外部网页仅作最小事实引用与署名，不复制全文、附件、图纸、页面图片或长段原文。
- Verification / 验证：证据一致性复算 PASS，EPSG:4548 既有指标与证据签名 `c880c438924399d40267391551669d937dcfc5e144850eb511a45bbf024c4a52` 不变；planning alignment 审计（更新不变量后）与伪造“已取得官方批复文件”的负向自测 fail-closed 通过；site evidence、field operations、drill 与 reviewer spine 审计同步复跑；四份 HTML 与四份 PDF 逐页视觉 QA。
- Gate discipline / 门禁纪律：所有受影响载体完成后才执行 ready-package manifest refresh；refresh 清空 `self_checked` 后立即用冻结 main 的完整 self-check 重新取得状态，再运行 strict-manifest、普通 preflight 与 `--check-push`。不运行 finalize，不删除、跳过或弱化检查，最终状态以 `manifest.json` 与 `self_check.json` 为准。
- Scope & boundary / 范围与边界：只修改 `submissions/dvd233/data-coop-line/`；GeoJSON、metrics、证据签名、投稿许可、核心价值主张和方案方向不变。官方批复文件、完整控规文本、法定图则、规划 polygon 和真实实施条件仍是明确缺口；PR #2540、#2746 及其他已合并 PR 保持只读，不修改共享协议、工具、数据、仓库文档或 Gallery 生成物。

## v1.8 - 2026-08-22


P1-05 text-level alignment with the reported approved regulatory plan / 已获批街区控规的文本级对齐与证据边界

- Baseline / 基线：从最新 `upstream/main` `114f06a1d59b94aece4807747ac00e3d6a396d40`（最后观察 `2026-08-22T00:30:22+08:00`）建立干净分支 `codex/data-coop-line-p1-05-plan-alignment-20260822`。前次观察 `bfd1cff1d6db793f8dc52321b406e23ea830b6fd` 至冻结点只含 PR #3693 的另一投稿更新，未触及本投稿、投稿 Skill、brief、schema、validator、helper 或门禁，判定与本轮无关。
- Reason / 原因：既有包已闭合空间复算、场地证据、可演练 MVP、现场模板、失败测试和五分钟评审脊柱，但尚未把最新规划文本事实纳入设计依据。同行方案正强化规划对齐和实施证据；本轮选择不改变方向、许可或空间量即可单轮闭环的文本级校准，避免在缺少官方批复文件和清权 geometry 时制造伪法定图层。
- Evidence tiers / 证据分层：官方海淀分局 2025-02-08 公开参与采信通告仅证明 2022—2035 标签草案于 2024-12-19 至 2025-01-19 公示并记录意见研究与采纳；北京日报经人民网转载的 2026-08-12 报道称 2024—2035 版本获批，并报道文字四至、9 个街区、约 1668.2 公顷与“一带一轴、两心多点”。未取得官方批复文号、确切批复日期、完整控规文本、法定图则或清权 vector，两个年限标签分别归因，不静默合并；报道数字不进入 `metrics.json`，文字四至不绘制 polygon。
- Before → After / 修正前后：修订前，评审者无法在本包内区分“官方公开参与过程”与“媒体获批报道”，也无法核对这些信号是否漂移既有空间证据；修订后新增唯一事实源 `visual/assets/planning-alignment-register.json`（Register ID `DATA-COOP-PLAN-ALIGNMENT-01`，SHA-256 `a3d01d5cd3745ae753865ac076c363b585403bf61688b60fb23aae75e0262650`），固定 4 项文本事实、4 项方向不变的设计响应、来源用途边界，以及本轮开始时 `metrics.json` 和九个 GeoJSON 的哈希。
- Design calibration / 设计校准：规划报道只强化四个既有优先级——遗址公园线作为公共利益服务层、大钟寺作为单一演练焦点、南北/东西慢行与无数据正线优先、存量建筑先调查后适应性再利用并保持 test-fit 可逆；不把本方案结构说成官方采用，不确认站口、路权、真实建筑、产权、容量、无障碍绩效、实施时序、政府背书或合作承诺。
- Carriers & rights / 载体与权利：同步中英 proposal、脚本派生报告 HTML、双语离线 visual、来源/假设/合规/版权说明、2400×1500 双语原创技术图与四份 PDF。A0 中英各由 8→9 页、A3 中英各由 10→11 页；冻结版全部 36 个既有页面逐像素一致，只追加 P1-05 页。外部网页仅作最小事实转述和链接引用，不复制图片、页面视觉、附件、地图、vector 或长段原文。
- Verification / 验证：证据一致性复算 PASS，EPSG:4548 既有指标与证据签名 `c880c438924399d40267391551669d937dcfc5e144850eb511a45bbf024c4a52` 不变；site evidence 17/17、field operations 215/215、drill 21/21 与 8/8 负向夹具、reviewer spine 94/94 与负向自测、planning alignment 113/113 与伪造“已取得官方批复文件”的负向自测均通过。四份 HTML 在 1440×900 与 390×844 下均无坏图、远程资源、控制台错误或横向页面溢出；四份 PDF 共 40 页完成 contact-sheet 检查，新页全分辨率复核无裁切、重叠或乱码。
- Gate discipline / 门禁纪律：所有受影响载体完成后才执行 ready-package manifest refresh；refresh 清空 `self_checked` 后必须立即用冻结 main 的完整 self-check 重新取得状态，再运行 strict-manifest、普通 preflight、`--check-push` 与专项审计。不运行 finalize，不删除、跳过或弱化检查，最终状态以 `manifest.json` 与 `self_check.json` 为准。
- Scope & boundary / 范围与边界：只修改 `submissions/dvd233/data-coop-line/`；GeoJSON、metrics、证据签名、投稿许可、核心价值主张和方案方向不变。官方批复文件、完整控规、法定图则、规划 polygon 和真实实施条件仍是明确缺口；PR #2540、#2746 及其他已合并 PR 保持只读，不修改共享协议、工具、数据、仓库文档或 Gallery 生成物。

## v1.7 - 2026-08-21

P2-03 five-minute reviewer evidence spine / 五分钟评审证据脊柱

- Baseline / 基线：从最新 `upstream/main` `9782df83a8f2a58ebe79823fe8001f18d129b975`（最后观察 `2026-08-21T21:14:57+08:00`）建立干净投稿分支 `codex/data-coop-line-p2-03-evidence-spine-20260821`。前次主控观察点 `b52bb75d8a0caba420454633a6c975ca06d58e4e` 至冻结点的 12 个提交、121 个路径仅涉及其他投稿，未触及本投稿、投稿 Skill、brief、schema、validator、helper 或门禁，因此判定与本轮无关，不为其制造图件、PDF 或 manifest churn。
- Reason / 原因：PR #3676 已合并且 intake-only 评审为 86/100；P0 与 P1-01—P1-04 已闭环，但正文、结构化证据、离线 visual 和 PDF 的评审入口分散，主控 P2-03/G4 仍待完成。同行近期方案强化实施交接、角色和可审计证据，故本轮不改变方案方向，而把既有证据压缩为一条可在 300 秒内完成的可复核路径。
- Before → After / 修正前后：评审者原需自行跨正文、台账、审计脚本、图件与 PDF 拼接权威边界、空间复算、MVP、现场控制和 fail-closed 演练；现新增唯一事实源 `visual/assets/reviewer-evidence-spine.json`（Spine ID `DATA-COOP-REVIEW-SPINE-01`，SHA-256 `966cd7eed4227078342f4bcd5aacf039438f7720a1049fcebe9a67413411e7ee`），固定 R1—R5 五步、总计 300 秒、12 个载体引用与每步“已验证 / 未证明”边界。
- Verification spine / 评审脊柱：Node built-ins-only 只读审计 `visual/assets/reviewer-evidence-spine-audit.js` 同时核对五步时长、冻结 SHA、证据签名、空间指标、MVP 指标、现场包与演练台账哈希、manifest 登记、持久化自检状态及双语图尺寸；`--self-test` 删除末步后必须 fail-closed。脊柱审计与负向自测通过，证据一致性通过，site evidence 18/18、field operations 215/215、drill 21/21 及 8/8 负向夹具通过。
- Carriers / 载体：中英 proposal 各新增首屏评审入口，派生报告 HTML 用冻结基线的最新 renderer 重新生成；双语离线 visual 新增脊柱区段；新增 2400×1500 双语信息图，PNG tEXt 写入 Spine ID、完整 hash、冻结 SHA 与 300 秒契约。四份 PDF 仅在首页前置对应脊柱页并写入同一组 Info 元数据；A0 中英既有页各 7/7、A3 中英既有页各 9/9 与冻结版本逐像素一致，全部 36 个当前页面已渲染检查，无裁切、重叠或乱码。
- Gate discipline / 门禁纪律：所有载体完成后才执行 ready-package manifest refresh；refresh 清空 `self_checked` 后立即用冻结 main 的完整 self-check 重新取得状态，再运行 strict-manifest、preflight 与全部专项审计。最终状态以 `manifest.json` 与 `self_check.json` 为准，不回填旧结果、不运行 finalize。
- Scope & boundary / 范围与边界：只修改 `submissions/dvd233/data-coop-line/`；GeoJSON、既有 metrics、来源、许可、证据签名、核心价值主张与方案方向均不变。评审脊柱只降低核验摩擦，不把概念指标、未观测现场条件、未分配主体、未签署许可或合成测试提升为实施事实；Issue #3571 的政策判断仍是非硬门禁依赖。

## v1.6 - 2026-08-21

P1-04 Dazhongsi synthetic drill and failure tests / 大钟寺合成演练与失败测试

- Baseline / 基线：从 `upstream/main` `83c87354d35186a56cd3d2816a27da9acf844915`（2026-08-21T08:59:43Z）建立干净 worktree 与分支 `codex/data-coop-line-p1-04-drill-tests-20260821`；发布前再次观察 main 并核对相关路径。自 P1-03 冻结点以来的 main 窗口只含无关投稿与维护者工具；`docs/formal-submission-guide.md` 新增 simulation/评测基线一致性阻断规则（本包无 simulation.json / evaluation-baseline.json，不适用）、`scripts/front_matter.py` 解析修复（低险）与多模态参考图体积说明（本包远低于预算），未触及本投稿、brief、schema 与门禁脚本。
- Single source / 唯一事实源：新增 `visual/assets/dazhongsi-drill-tests.json`（Suite ID `DAZHONGSI-DRILL-01`，SHA-256 `86ebfa7655e4cc79fb9d155d22cb62c821a131ec5e4882d71153e7dd13bd5507`），锁定对 `DAZHONGSI-FIELD-OPS-01` 模板契约的 21 项合成用例与 8 个负向夹具；运行器 `visual/assets/dazhongsi-drill-test-runner.js` 仅用 Node 内置库、只读，双语载体以套件 ID 与台账哈希锁定一致性。
- Coverage / 覆盖：正例（三阶段链路、11 份回执、唯一 A）、负例（任一条件未 verified 即拒绝、空值纪律、not_observed ≠ 风险排除）、撤回（各阶段回执槽位 + 停机覆盖 + 回报非购买同意）、服务中断（六项触发器逐项停机并阻断推进）、恢复（四条件 + 三方签署 + 同口径复测）、无障碍任务测试（无数据等价与人工复核 3/3、离线正线与人工接管可定位）。
- Meta & fail-closed / 元检查与负向自测：用例 ID 全集钉死（含元检查自身），少跑一项即失败；`--self-test` 对 8 个变异夹具逐一证明运行器退出 1（删回执、填观测值、断证据链、重复 ID、删停止条件、加第二问责、删用例 ID、关闭无数据等价）。当前 21/21 通过、8/8 fail-closed。
- Carriers / 载体：中英 proposal 各增 P1-04 小节并嵌入新图；派生报告 HTML 由当前 main 渲染脚本重新生成；双语离线 visual 新增 drill 区段（4 项 drill 指标以 data-metric/data-value 登记并与 metrics.json 一致）；新增 2400×1500 双语技术信息图（PNG tEXt 含套件 ID、台账哈希、证据签名与基线）；四份 PDF 各追加一页 drill 证据页并以明文 Info 键 /P104DrillSuiteID、/P104DrillTestsSHA256、/P104SyntheticOnly 登记（修复 pypdf 6.16 默认八进制转义会隐藏连字符令牌的问题：monkey-patch TextStringObject 为规范合法明文字符串，生成器留在投稿包外）。
- Metrics / 指标：新增 `dazhongsi_drill_case_total`、`dazhongsi_drill_case_passed`、`dazhongsi_drill_negative_fixture_fail_closed_total`、`dazhongsi_drill_category_coverage_ratio`（metric_kind=synthetic_contract_test，confidence=low，可由台账与运行器复算）；1.5.3.3 合规矩阵与假设 `A-DAZHONGSI-DRILL-001` 同步。
- Verification boundary / 验证边界：套件为模板契约级合成验证；现场授权、站口、路线、实测绩效、主体、签署、许可与无障碍结论仍未观测；`not_observed` 不得解释为风险已排除。GeoJSON、既有 metrics 与证据签名 c880c438… 不变；PDF 仅追加页，既有页面逐字节保留。

## v1.5 - 2026-08-21

P1-03 Dazhongsi field-operations responsibility and evidence template / 大钟寺现场运营责任与证据模板

- Baseline / 基线：发布前 `upstream/main` 前进 20 个提交；核对 `8e3dad580fe1979b167742ee5a5029c94dacb3f5..a756675fa04d18aadfe606c89233f6efc0f19535` 后，当前投稿、Skill、brief、source registry、核心 render / manifest / self-check / preflight / validator / schema 路径均无变化，仅通用 source registry review helper 与其他投稿更新。分支以 `--ff-only` 迁移到冻结 `upstream/main` `a756675fa04d18aadfe606c89233f6efc0f19535` 并完整复验；只修改 `submissions/dvd233/data-coop-line/`，不触碰管理 DOCX、archive、历史基线或其他投稿。
- Single source / 唯一事实源：新增 `visual/assets/dazhongsi-field-validation-pack.json`，Pack ID `DAZHONGSI-FIELD-OPS-01`，对应 `DAZHONGSI-MVP-01`；发布载体以该 JSON 的完整 SHA-256 `4613343f7943bc81207db0fc3c8ad2a98bc97fb1e4f0442eb215f1e36a773a61` 锁定一致性。Node built-ins-only audit 对缺失载体逐项汇总失败，不因 ENOENT 提前崩溃，并核对空值纪律、状态、RACI 唯一 A、证据引用、签署位、Pack ID 与 hash。
- Unobserved discipline / 未观测纪律：这是待授权、待现场填写的责任与证据模板，不是地图、现场记录、正式空间证据、主体确认、许可或运营承诺。五个采集点、三条路线及其时间、失败、价格、无障碍、人工接管均保持 `null / unknown / not_observed`；六个角色未分配主体，十一份回执未采集，六个签署位未签署。
- Operating gates / 运营闸门：只有六项开始条件全部 `verified` 才能开始；任一六项停止触发器出现即暂停或停止；恢复需满足四项条件、按同一口径复测，并由场地运营责任主体、安全复核与现场负责人共同签署。模板不把 `not_observed` 解释为风险已排除。
- Carriers / 载体：中英 proposal 及其脚本派生 HTML、双语离线 visual、2400×1500 双语技术信息图与四份 PDF 均显示 Pack ID/hash 及 NOT OBSERVED 边界；PNG tEXt 与 PDF metadata 保留 ASCII hash。Manifest 登记 pack、audit 和双语图件的 canonical role/language/translation relationship。
- Verification boundary / 验证边界：专项审计只证明结构、跨载体一致性和既有 GeoJSON/metrics/P1-02 未漂移；HTML 静态审计与 PDF 逐页渲染只证明载体可访问、离线、可读且无明显裁切。它们不证明站口、路线、实测绩效、主体、签署、许可、无障碍或工程可行性。

## v1.4 - 2026-08-20

P1-02 Dazhongsi rehearsable MVP / 大钟寺可演练 MVP

- Baseline / 基线：从 `upstream/main` `0b9d540e8a2a56d525b56ab243d9d9e9764fba0e` 建立干净投稿分支 `codex/data-coop-line-key-area-mvp-20260820-v2`。此前冻结点 `d1ff9415abb4b0d916757f65658e7d77f5c91697` 之后的主线包含 `scripts/render_proposal_html.py` 及其测试，属于相关 helper，因此迁移到新基线并重跑生成与完整门禁；新旧 helper 生成的中英报告 SHA-256 完全一致，未为其他投稿变化重生成图件、PDF 或 manifest。
- Reason / 原因：上一轮 PR #3543 的维护者 intake 为 79/100，主要完成证据一致性；Issue #2955 要求城市设计不能停留在品牌叙事，同行 PR #3549 以可量测空间路径和演练逻辑获得 89/100。故本轮只选择一个能闭环的空间—运营样板，不扩展许可、数据使用或实施承诺。
- Before → After / 修正前后：正文把 `SCN-05` 归于大钟寺，但 GeoJSON 点位 `[116.3508, 40.013]` 实际落在北侧临时重点区且没有重点区和停机字段；现修正为 `[116.351, 39.946]`，位于 `PROV-KEY-003` 与 `BLDG-006` 概念测试基底内。`SCN-05 / 09 / 10` 统一挂接 `DAZHONGSI-MVP-01`，形成用途票、撤回回执、公共回报三阶段，并分别声明至少三项硬停止条件。
- Spatial evidence / 空间证据：EPSG:4548 复算得到临时重点区 `720,454.219 m²`、两处可逆房间测试基底 `13,361.508 m²`、公共回执空间 `32,739.258 m²`、临时范围内两条概念线网联合长度 `1,614.218 m`；3/3 节点具备人工复核与无数据等价字段，但这仍是设计目标而非已观测绩效。
- Carriers / 载体：同步 GeoJSON、metrics、设计深度/合规矩阵、假设、中英 Markdown 与派生报告 HTML；新增大钟寺“回执轨”双语离线段，以本地 Pillow/pypdf 构建步骤重绘双语重点区图，并只替换四份 PDF 中对应的重点区栅格。由于证据签名覆盖全部图层输入，十张 PNG 与四份 PDF 统一重签，其余八张图的像素内容不变；冻结 validator 不允许在 `visual/assets` 发布 Python，因此生成器不进入投稿包。
- Verification / 验证：故意在旧载体上刷新快照后，一致性审计精确报出 10 张图、4 份 PDF、2 份派生 HTML 和 manifest 过期；修正后证据签名为 `c880c438924399d40267391551669d937dcfc5e144850eb511a45bbf024c4a52`。最终 manifest、自检、preflight、PDF/HTML 视觉 QA 结果在发布前门禁完成后记录。
- Boundary / 边界：`geometry/key_areas.geojson` 与所有官方/共享文件不变；站口、路权、权属、现状建筑、文保、市政、消防、无障碍、运营主体与实际两线绩效仍待正式证据和实地演练，任一前置失败即迁移、缩减或停止原型。

## v1.3 - 2026-08-20

P0 source-hash correction / 场地证据源哈希纠偏

- Baseline / 基线：本轮从 `upstream/main` `fae639c40a0b51de971ed4cd98526351d07cbb74` 建立干净分支 `codex/data-coop-line-evidence-consistency-20260820`。后续 main 先后移动到 `b8ddfc8e10b27a3be9629d24e0317f4deaf5cfe1` 和 `58af9968147491c1b0f264890074f1235ceccdaa`；这两次相关路径核对均为 0。PR 创建时实际 base 为 `7019821bd606d020d0e8ca3b0120d2d312f1ab4d`，其中唯一相关路径是同行读取 helper `scripts/read_peer_proposals.py` 的异常 `Content-Length` 容错，不触及本稿、Skill、brief、schema、validator 或投稿门禁；其 2 项专项测试通过。因此不重建冻结点，也不生成无关图件或 PDF。
- Finding / 发现：P1-01 合并包的 `site-evidence-register.json`、`sources.json` 和 `constraints.geojson` 中四个 SHA-256 不对应其声称冻结的 `ce2c6bcee348accc3c354f585c9ad45e39ff2db7` Git blob。干净 sparse 工作树首先因未检出 `data/source_registry.json` 得到 13/17；补齐只读来源后证明四个哈希均错，而非上游内容后续漂移。
- Correction / 纠偏：直接对 `git show ce2c6b:<path>` 返回的原始 blob 字节计算 SHA-256，并同时确认这四个文件在 `ce2c6b` 与当前 main 字节相同。纠正后的公告快照、临时边界、边界依据与 source registry 哈希分别为 `158203872171…9cc3`、`0b9ae36bae6e…2306`、`295869f7aafe…4910` 和 `4784e80d2d36…1c66`。
- Scope / 范围：只同步机器台账、来源与约束缺口记录、中英正文哈希摘要、派生报告 HTML、changelog、manifest 和 self-check。冻结来源提交 `ce2c6b`、四组 geometry 映射、0 个 official-control feature、6 类缺口、许可边界、方案几何、指标、图件与 PDF 均不变。
- Boundary / 边界：这是证据完整性修复，不是官方精度提升，不新增来源、许可、数据用途、空间结论或实施承诺。

## v1.2 - 2026-08-20

P1-01 site provenance and verified control-data gap / 场地来源、许可与约束缺口可核验证据

- Baseline / 基线：场地证据最初冻结于 `upstream/main` `ce2c6bcee348accc3c354f585c9ad45e39ff2db7`，对应来源哈希仍逐项匹配。发布前发现 main 已移动且 `scripts/validate_submission.py` 新增双语同字节提示，因此从最新 `upstream/main` `fcaf7a9fccb7d9ca875a6fc37329fb1454e7b375` 重建干净 worktree 与新分支 `codex/data-coop-line-p1-02-site-evidence-20260820`，移植聚焦修改，并以 `fcaf7a9fc` 的门禁完整复验；未把证据快照 SHA 伪改成较新的代码基线。
- Reason / 原因：旧包在 `sources.json` 中列出场地来源，但缺少发布 / 获取日期、冻结源哈希、许可 / 署名、allowed / prohibited uses、精度与替换触发器；`constraints.geojson` 的空集虽诚实合法，却没有跨文件 fail-loud 证明。主控原先把“非空 constraints”当验收条件；冻结版 validator 明确没有可引用的官方 / 清权控制几何时空集合法且优于造线，最新同行 `kenshin-ai-101/openline-100` 即使补到已批街区控规公开文字也因无 parcel/redline polygon 保持空集。故本轮纠正验收口径，不复制临时范围制造假约束。
- Before → After / 修正前后：场地来源从简短 `path + usage` → 发布者、日期、冻结 SHA、源哈希、CRS、许可 / 用途边界与禁用项；临时总体范围和三处重点区从“相信同源” → 4/4 geometry 精确匹配冻结源；官方控制缺口从单文件说明 → 6 类 locked-layer 缺口、替换规则、禁止代填项、机器台账与审计。`constraints.geojson` 仍为 0 feature，含义是“缺口已核验”，不是现实中无控制。
- Machine evidence / 机器证据：新增 `visual/assets/site-evidence-register.json` 与 Node built-ins-only `site-evidence-audit.js`。审计固定公告快照、临时边界、依据说明与 source registry 四个 SHA-256，核对 4 组 geometry 映射、0 个 official-control feature、6 类缺口和三条核心来源的 allowed / prohibited uses；当前 18/18 PASS，任一漂移显式失败。
- Carriers / 载体：同步中英 Markdown、派生 HTML、离线 visual 的场地证据区、`site-overview` / `key-areas` 双语图页脚、四份 PDF 对应页面、来源 / 假设 / constraints、版权说明、manifest 与 self-check。空间面积、比例、场景、设计 geometry 与其余三组核心图不变，不制造无关载体 churn。
- Peer evidence / 同行证据：PR #2734 的 site-grounding register 与 PR #2736 的 machine-readable reviewer evidence 证明结构化交接的评审价值；`openline-100` 的控规文字 / 空 geometry 分线证明“文本获批不等于可写 polygon”。只借鉴证据分层与 fail-loud 思路，未复制任何同行文本、schema、图件、geometry 或媒体。
- Boundary / 边界：未新增外部来源、OSM geometry、许可或数据使用范围；brief 中 OSM 读数仍是背景，不进入本包控制 geometry。官方 / 清权控规、文保、道路红线、权属、轨道、蓝线或市政 geometry 到位后，先登记发布者、日期、版本、CRS、许可、转换与哈希，再整体重建 geometry → metrics → figures → HTML → PDFs。

## v1.1 - 2026-08-15

P0 evidence and scenario consistency / 指标与场景证据一致性

- Baseline / 基线：证据修订始于 `upstream/main` `683c627c4b2071c13ebc7f569cb4e56d2bc69aad`；发布前持续快进并最终核对至 `c55ef181cbfd1c636b04a644d17c64eaf464d656`。`c8f13bb…c55ef181` 的 7 个提交更新其他投稿并强化空 manifest 审计；目标投稿、Skill 与 brief 无 upstream 变化。强化后的校验器已纳入本轮复验，clean focused branch 为 `codex/data-coop-line-evidence-consistency-v4`。
- Reason / 原因：PR #2540 合并包中的 GeoJSON 与 `metrics.json` 已是新复算结果，但中英正文及其派生 HTML 仍保留旧指标；正文还把场景 01—03 标为产业测试，而 `public_space.geojson` 和离线展示均把 `SCN-04`—`SCN-06` 定义为产业测试。旧文本会让评审者得到与机器证据相反的结论。
- Single source / 单一事实源：投稿 `geometry/*.geojson` 是空间事实入口；面积统一投影到 EPSG:4548 后做多边形联合复算，`metrics.json` 保存派生指标，`visual/assets/evidence-snapshot.json` 保存输入哈希、复算结果、12 个场景注册表与跨载体签名。
- Before → After / 修正前后：
  - building footprint / 建筑基底：`310,807.184 m²` → `40,063.344 m²`;
  - green space / 绿地：`12.3423%` → `2,384,747.221 m² / 20.8953%`;
  - public space / 公共空间：`7.3281%` → `98,164.982 m² / 0.8601%`;
  - industry tests / 产业测试：narrative cards `01–03` → GeoJSON registry `SCN-04` Synthetic-Data Benchmark Cell, `SCN-05` Temporary-Use Licence Cell, and `SCN-06` Controlled-Compute Test Room.
- Carriers / 载体：同步中英 Markdown、派生 HTML、离线 visual 指标卡、双语指标图、A3/A0 PDF、manifest 和持久化 self-check；其余四组核心图视觉内容不变，只写入同一证据签名与发布核验基线以防漂移。双语报告另修复 390 px 下长路径代码造成的横向溢出。PDF 不只更新页脚：A0 第 5 页和 A3 第 6 页的内嵌指标栅格已逐像素替换为当前双语指标图。
- Verification / 验证：`visual/assets/evidence-consistency.js` 在旧载体上先失败，修复后 PASS；发布准备时按最新 main 重签为 `c880c438924399d40267391551669d937dcfc5e144850eb511a45bbf024c4a52`。EPSG:4548 联合面积复算、12 个场景注册表和全载体检查 PASS；审计器新增无额外仓库依赖的 PDF 内嵌 RGB 栅格校验，能阻止只更新 PDF 元数据而保留旧指标图。四份 PDF 共 24 页以 120 dpi 重渲染并逐页检查，双语标题、数值、页脚、留白和图面无裁切、重叠、乱码或旧 SHA；四份 HTML 在 1440 px 与 390 px 下无坏图、远程资源或横向页面溢出。
- Preflight / 预检：原工作区的管理 DOCX 和不可写远端问题通过新建 clean participant worktree、仅修改投稿目录、配置可写 fork 解决；不删除管理材料、不弱化 scope 检查。ready-package manifest refresh、持久化 self-check 四门、普通 preflight 与 `--check-push` 均 PASS；唯一警告是工作区并非 blobless partial clone，不影响投稿内容或上传权限。
- Remaining boundary / 剩余边界：所有数值仍是临时几何下的概念设计量；官方边界、控规、现状建筑、权属、道路、市政、文保与生态资料到位后必须整体重建拓扑并复算，不能把本次一致性修复理解为官方精度提升。
