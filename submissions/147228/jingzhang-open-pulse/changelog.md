# 方案迭代记录

## v2.4 - 2026-08-12

- 固定评审首图同时呈现整带关系和 S-02 当前状态。本地合成桌面回放为 PASS，有限现场窗口保持 HOLD、未授权、未运行，图面不把离线夹具结果写成机器人性能、安全、许可或部署结论。
- 新增可复跑的双语首图与交通图构建脚本，直接读取 `open-pulse-tabletop-evidence.json` 和 `example-s02-embodied-test-window.json`；若回放状态或现场窗口边界改变，脚本停止生成并要求人工复核。
- 重绘双语交通图，修复底部指标与边界说明裁切。普通步行、人工服务和手推车保持可用，S-02 仅在路线、无障碍、安全、许可、维护责任和人工接管证据齐备后进入下一道复核。

## v2.3 - 2026-08-12

- 重绘双语重点区图：把三处临时范围改写为居民可走完的日常任务，逐段显示人工责任、专业前置、停止条件与恢复普通使用的路径；同步把等义说明放到双语正文的首轮审阅位置。图面不新增地块、道路红线、权属、许可、建设或现场绩效主张。
- 以历史 Review Agent 94/100 对应的 exact head `62e043024266e148ccdb2a7f78b43a7ece741cba` 为核心稿面，并保留 v2.2 的双语评审入口改进；本版本尚未获得新的维护者评分，94 分仅用于标明恢复基线。
- 主干后续增加的城市 API 能源治理、人本缓冲、公共利益立场、情景审计、40 项证据门禁及其复算脚本继续保留，作为二级证据档案，不替代 `proposal.md`、A3/A0 图册和离线视觉页构成的首轮审阅路径。
- 恢复过程不删除主干既有文件；manifest 采用“核心条目优先、后续资产补录”的并集，并在完整自检中重算哈希。新增档案不被表述为已测绩效、已确认合作或新增法定控制条件。
- 视觉抽检发现中文 A0 第 4 页左侧内容越界；改用同内容的 A3 矢量页等比替换，保持 5 页、A0 幅面、文案和指标不变，并重新检查四套 PDF。

## v2.2 - 2026-08-12

- 把“一轴三站两翼、区域协同接口、六步公共智证回路”前置为双语评审入口；区域名称仍是任务书接口，不写成已确认合作。
- 重建双语总览图，并将其设为 A3、A0 和离线视觉页首屏；不新增空间对象、指标、伙伴关系或实施承诺。
- 重做双语 A3/A0：两类文件均为 5 页，分别采用真实 A3/A0 横向页幅，消除空白首屏和错误页幅。
- 将 97.x 内部决策实验移出多模态首屏，避免与官方 Review Agent 分数或现场绩效混淆；原模型边界和可复算资产仍保留在后续页面。

## v2.0 - 2026-08-08

- 修复中英文离线报告的 Markdown 表格渲染，改为可滚动的语义 HTML 表格，并同步更新英文版本标识。
- 增加 `open-pulse-relay-receipt.schema.json` 与完全合成的 S02 具身智能沙盒凭证，把人工接管、无 App 替代、清权、维护和退出写成可复核记录。
- 增加 `qa-readiness.json`，记录本地 QA 通过项和 provisional/unknown 边界；三项新资产同步进入 manifest 与逐资产清权台账。

## v1.7 - 2026-08-08

reviewable deliverables and bilingual review surface.

## v1.8 - 2026-08-08

- Added six officially sourced policy and enterprise-development cases, plus a crosswalk from each mechanism to local scenarios, acceptance evidence and do-not-copy boundaries.
- Added the first executable policy/enterprise growth-stage card: public AI register, accountable operator, feedback route and stop gate.
- Added three bounded industry-validation windows covering model assurance, enterprise-service data governance and low-speed embodied-AI safety.
- Registered the four processed scope/task/boundary tables cited in the reference section as package sources with explicit non-authority boundaries, so advisory source matching can distinguish registered evidence from unmatched text.
- Added four policy/enterprise accountability markers for public learning, contribution attribution, service responsibility and test-stop disclosure.
- Put the taskbook's three positions, five functions and three-area/two-wing mapping directly into `proposal.md`.
- Added reviewer-visible tables for North Latitude Community/regional interfaces, node-level plans, 14 scenario gates, public-interest audit and transferable mechanism comparison.
- Added explicit `language: zh` metadata for the primary proposal, report and visual index to remove deterministic intake warnings.

- Added complete English review copy `proposal.en.md` and offline `report/proposal.en.html`.
- Added taskbook crosswalk for agent.1–agent.6 with acceptance tests.
- Added regional eight-mechanism ecosystem loop and conceptual partner-boundary note.
- Added 14-row scenario–space–operation matrix with RACI, SLA, relative cost band, retention, non-AI equivalent and stop conditions.
- Added identity system and eight-component public-space / embodied-intelligence library.
- Added identity, regional-ecosystem and token-lifecycle figures.
- Replaced the short copyright note with a path-level clearance protocol and ledger.
- Added offline English visual index links and bilingual manifest metadata.
- Preserved provisional geometry warnings, official-source attribution, quantitative-model caveats and human fallback requirements.
- Rebuilt all five required evidence boards from the submitted GeoJSON and metrics; removed stale v1.1–v1.3 footers and unsupported percentage claims.
- Added the explicit `building_footprint_ratio` metric and clarified that 2.72% is a provisional geometry ratio, not a statutory control.
- Re-rendered the Chinese and English offline reports with semantic tables retained for reviewer readability; no remote runtime dependency was added.

## v1.8.1 - 2026-08-08

- Classified “藏风聚气 / 风水” strictly as cultural landscape narrative, not a health, air-quality, hydrological or engineering causal claim.
- Translated that narrative into six auditable but currently `unknown` baselines for pedestrian wind comfort, pollutant stagnation, mean radiant temperature, continuous shade, blue-green accessible-route overlap and water-risk exceedance routing.
- Added three peer-reviewed method references with DOI and explicit non-transfer limits; no published case result is represented as Jing-Zhang CFD, measurement or health evidence.

## v1.9 / v2.0 evidence consolidation - 2026-08-08

- Added six officially sourced public AI ecosystem cases and a policy–enterprise crosswalk that binds each mechanism to a local scenario, acceptance evidence and a do-not-copy boundary.
- Added `visual/assets/wind-health-validation-plan.json`, a six-gate evidence contract that keeps wind comfort, pollutant stagnation, heat, shade, blue-green access and water risk `unknown` until geometry, field, calibration and professional-review evidence is complete.
- Registered three official data-route records for the Haidian climate-normals catalogue, the district meteorological network and Qinghe Station wind monitoring; they are acquisition/context routes only and do not replace local measurements.
- Added a bilingual, scalable Open Pulse identity-mark concept with explicit trademark, font and accessibility clearance boundaries.
- Added English counterparts for all review figures and A3/A0 boards, while keeping the Chinese and English surfaces equivalent and offline.

## v2.1 - 2026-08-08

- Added `visual/assets/wind-health-field-protocol.json` as a pre-registered field observation, calibration, model-alignment and stop-condition contract for the six health/wind/water metrics.
- Added AIJ pedestrian-wind CFD and ISO 7726 catalogue method references with explicit boundaries; no local measurement, CFD result, comfort threshold or health outcome was fabricated or transferred.
- Kept all six local metrics `unknown` until versioned geometry, field data, calibration/QC, model comparison, uncertainty and professional sign-off are available.
- Added `visual/assets/wind-health-point-register.json` with 18 provisional, not-measured planning slots across the three key areas; no coordinates or local readings were invented.
