# 方案迭代记录

## v2.6 - 2026-08-22

- 新增可选 SEB v0.5.0 字段对照，把三处空间接口的普通服务、人工接管、P0/P1/P2 公共基线阶段、运行模式和责任角色接到 `ai_off_path`、`human_handoff`、`gate_id`、`operating_mode`、`responsible_role`。
- 新增中英双语图板、source-of-record 证据回读和 5 个负向 fixture；3/3 正例与 5/5 负例通过。
- 明确这是 component-level opt-in，不新增仓库硬门、正式评分项、服务覆盖或现场成效主张；保持 HOLD、0 授权、0 现场观察、unknown 基线和无官方分数主张。

## v2.5 - 2026-08-22

- 重做中文离线视觉页，使 v2.2–v2.4 的连续性回执、空间选项、接口原型、公共基线、责任移交与发布链进入同一条评审阅读路径，并保留五张主图、指标状态和 provisional/HOLD 边界。
- 在英文视觉页补齐对应双语图板与证据边界说明；所有链接仍指向包内本地 JSON、runner、GeoJSON 或图件，不加载远程资源。
- 本轮只改善可读性和审阅导航，不新增现场事实、授权、容量、权属、许可、绩效或官方评分主张。

## v2.4 - 2026-08-21

- Added a bilingual system-level spatial-options board comparing four alternatives: unmanaged peak, ground-first multimodal, air-first feeder and extreme-weather ground fallback.
- Added five review scales from `1:5000` to `1:50`, five public-rights rows and five hard-gate results; S1 advances only to professional design review while the package remains `HOLD`.
- Added a deterministic runner with one positive control and six fail-closed negative fixtures; no numeric construction dimensions, authorization, field claims or performance results were added.

## v2.3 - 2026-08-21

- Added three bilingual spatial interface prototypes: Zhongzhiyuan arrival/loading forecourt, AI Origin care/human-continuity loop, and Dazhongsi rail-to-curb transfer porch.
- Added a `1:500` concept to `1:50` handoff board and a machine-readable contract with ordinary-service-first, named-owner, dated-evidence and stop/return gates.
- Added positive and fail-closed negative fixtures; kept numeric dimensions null, authorization and field observations at 0, performance null and decision HOLD.

## v2.2 - 2026-08-21

- Added a fail-closed first-168-hour receipt and first-12-week delivery contract with proposed receivers, evidence, stop conditions and ordinary fallbacks.
- Added a seven-dimension reviewer evidence map and a bilingual release-chain board connecting the three spatial interfaces to the HOLD/repair/withdrawal decision.
- Added a deterministic supplemental runner with a positive control plus four negative fixtures; it proves contract completeness only and does not create field authorization, baseline or performance.

## v2.0 - 2026-08-21

- Closed the responsibility-transfer coverage gap identified in the previous Mobility review: seven resource units now declare explicit mappings to eight affected groups.
- Hardened the supplemental contract audit against duplicate, empty, unknown and unmapped group IDs, and added four deterministic negative fixtures.
- Kept this audit separate from the four formal self-check gates; a PASS proves contract completeness only, not field coverage, authorization, user observation or transport performance.

## v2.1 - 2026-08-21

- Added three key-area public-baseline prototypes with explicit BASE, BOOST, BLACKOUT and BEQUEST states.
- Added a five-stage P0–P4 sequence and offline negative-fixture runner so the package records what ordinary mobility and maintainable public assets remain after AI withdrawal.
- Kept every state design-only: authorization and field observations remain zero, baseline unknown, performance null and decision HOLD.

## v1.9 - 2026-08-21

- Added a bilingual four-window continuity receipt for weekday arrival, daily access, evening return, and outage/weather fallback.
- Added four handoff seams, twelve receipt fields, four positive controls and six negative HOLD fixtures with an offline regression runner.
- Kept ordinary rail/bus/human/paper service first; AI remains limited to grouped demand, conflict explanation and rollback preparation.
- Kept authorization and field observations at 0, local baseline unknown, result `not_run`, and performance results null.

## v1.8.1 - 2026-08-21

- Added a bilingual route-service atlas for the three key areas, with spatial interfaces, denominators, non-AI equivalents, refusal rules and fallbacks.
- Added an offline checker for the three-node chain, five gates and field-status boundary; it keeps authorization and real observations at zero.
- Kept the atlas as design-only evidence and did not turn provisional geometry, synthetic inputs or role labels into current operations.

## v1.7 - 2026-08-09

- Added a bilingual one-page executive brief at the top of both readable proposals.
- Bound one ordinary-person door-to-door chain to choice, request, takeover, fail-closed exit and independent replay.
- Kept the M-09 evidence explicitly synthetic/offline with `performance_results=null` and `operational_status=not_authorized_not_run`.

## v1.6 - 2026-08-09

- Added a minimum offline tabletop for the existing M-09 storm/network-outage fallback scenario.
- Added a machine-readable contract, deterministic replay runner and evidence output for four synthetic service requests, six checks and five rollback steps.
- Kept `performance_results=null` and `operational_status=not_authorized_not_run`; the tabletop does not claim staffing, accessibility performance, public acceptance, safety or implementation.

## v1.5 - 2026-08-09

- Added a bilingual implementation–operation contract that makes phase, participating roles, acceptance metrics, human fallback and stop/withdrawal conditions explicit at the start of the phasing section.
- Kept all role labels conceptual and all local baselines `unknown`; no institution, contract, funding, permit or achieved outcome is claimed.

## v1.0 - 2026-08-09

- Created an independent enterprise–resident mobility submission package.
- Replaced autonomy-first narrative with demand ledger, curb states, rail/bus feeder logic and four service levels.
- Added Beijing transport and Haidian parking-service evidence, employer TDM and curb-management research.
- Regenerated bilingual figures, offline visual pages and A3/A0 boards.

## v1.2 - 2026-08-09

- Added an explicit multi-agent queue/network sandbox for residents, enterprise employees, carers/children, visitors, logistics, night workers, metro trains, buses, bicycles, cars, walking/wheelchair flows and the gated air candidate.
- Added synthetic, clearly non-local readouts for queues, station load, transfer wait and curb service, with a calibration list for dated OD, headways, capacity, signals, conflicts and accessibility.
- Refreshed the simulation and evidence boards and added bilingual model-object diagrams with readable units, thresholds, status gates and source notes.

## v1.3 - 2026-08-09

- Added inspectable trip-leg templates for external enterprise commuting, resident services, shuttle transfers, logistics windows and ground-first air fallback.
- Added a dependency-free deterministic runner at `visual/assets/run-mobility-simulation.js`; it recalculates grouped mode shares, service supply, one-minute queues and calibration fields without network access.
- Added activity/agent-based multimodal and grouped accessibility method references; formal calibration now calls for mode share, road/curb volume, door-to-door time, distance and distributional access checks rather than a single efficiency score.

## v1.4 - 2026-08-09

- Added machine-readable `model_family` and `model_detail` disclosure fields while retaining the legacy `model` field for compatibility.
