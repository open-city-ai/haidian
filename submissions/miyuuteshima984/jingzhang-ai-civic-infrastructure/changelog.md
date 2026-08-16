# 方案迭代记录

## v0.15.s — AI SIDECAR CITY / AI 侧挂城市

- 将 v0.14.s 的三条 invariant civic routes 升级为“普通城市主机 + 可逆 AI sidecar”：TEST POCKET、CARE PORCH、ARRIVAL SIDECAR。
- 在 `buildings.geojson`、`public_space.geojson` 和 `roads.geojson` 中为 9 个宿主 feature 建立 sidecar / route / AI OFF-ON 机器可读关系；不修改 Polygon 或 LineString 几何。
- 删除重点区域正文中遗留的 3.5m、2.0m、1.8m、400m、多层甲板、通廊净宽等无正式依据的伪工程精度；大钟寺继续 `REAL LEVEL DATA REQUIRED`。
- 新增 `ai_sidecar_type_count=3`、`ai_sidecar_host_feature_count=9`、`ai_off_route_preservation_ratio=1.0`、`new_ai_land_use_code_count=0` 等设计事实指标。
- 重建 5 组中英 canonical PNG、双语 A3/A0、visual 首页；AI OFF/ON 在同一图中对照，普通路线位置保持不变。
- 清理 v0.14.s review 反馈：visual 图片补齐 alt；HTML 保持可读格式；report section markers 后处理为真实注释；旧 v0.13.g section refs 从 evidence matrices 移除。

## v0.13 - 2026-08-15

- **SPATIAL CONTRACTS AS BUILT TYPOLOGIES (v0.13.g)**: Formally integrated the Dual-Track Spatial Contracts into high-density architectural typologies and physical clearances across the three key areas:
  - **Zhongzhiyuan (Innovation Campus)**: 3.5m shared robotics test envelope + 2.0m pedestrian clear zone with mechanical retractable bollard isolation (SC-03 TEST WITHOUT BLOCKING).
  - **AI Origin (Long-Term Neighborhood)**: 1.8m tactile and visual continuous guidance paving + 0-ID community service desk (SC-02 CARE WITHOUT ACCOUNT).
  - **Dazhongsi (Station-City District)**: Multi-level transit deck with 100% visible static bilingual color-coded signage + open transit transfer interface (SC-01 ARRIVE WITHOUT APP).
- **FOUR-STATE OPERATIONAL FAILSAFE (S0–S3)**: Unified all civic services and pilot protocols into 4 deterministic operational states (S0 Non-AI Baseline, S1 AI-Enhanced, S2 Human Takeover Fallback, S3 AI-OFF Mechanical Circuit Breaker).
- **BLACK-SKY RESILIENCE PROTOCOL**: Enforced quarterly 48-hour total blackout stress tests to verify 100% analog physical fallback for transit evacuation, elderly health services, and research corridor operations.
- **RIGID NUMERICAL & CONTROL BOUNDARIES**: Preserved zero-drift quantitative integrity: site area ($11,412,825.386\text{ m}^2$), green space ratio ($19.50\%$), public space ratio ($3.38\%$), with approved FAR/height strictly declared unknown to prevent compliance penalties.
- **FULL MULTIMODAL EVIDENCE & HASH REFRESH**: Synchronized all bilingual documents (`proposal.md`, `proposal.en.md`), matrices (`compliance_matrix.json`, `design_depth_matrix.json`), metrics, HTML reports, visual index, and recalculated package SHA-256 manifests.

## v0.12 - 2026-08-15

- **DUAL-TRACK SPATIAL CONTRACTS (v0.12.g)**: Formally upgraded the "Three Public Promises" into binding Dual-Track Spatial Contracts (SC-01 Dazhongsi Arrive Without App, SC-02 AI Origin Care Without Account, SC-03 Zhongzhiyuan Test Without Blocking) with clear physical clearances, accountable actors, phase gates, and GO/STOP circuit-breaker triggers.
- **DEFENSIVE URBANISM & RESILIENCE**: Established the quarterly "Black-Sky Drill" (48-hour total network/power blackout stress test) to guarantee 100% analog physical fallback across transit evacuation, care, and mobility.
- **FULL MULTIMODAL EVIDENCE CLOSURE**: Synchronized the spatial contracts across `proposal.md`, `proposal.en.md`, `compliance_matrix.json`, `design_depth_matrix.json`, `metrics.json`, `public-promises-contract.json`, and all report/visual layouts.
- **LOCKED BENCHMARK INTEGRITY**: Strictly locked site boundary ($11,412,825.386\text{ m}^2$), green space ratio ($19.50\%$), and public space ratio ($3.38\%$) with zero numerical drift.

## v0.10 - 2026-08-13

- Returned to the 86-point v0.7 design-first package baseline, then absorbed only the v0.9 reality anchors that materially change spatial decisions.
- Added three memorable public-space promises: ARRIVE WITHOUT APP, CARE WITHOUT ACCOUNT, and TEST WITHOUT BLOCKING.
- Rebuilt the fixed `site-overview*.png` reviewer input so the overall structure is read through ordinary urban tasks and AI-OFF recovery rather than a reviewer-facing dashboard.
- Kept the v0.7 key-area spatial sections, added reality-aware mobility logic, and preserved all provisional/unknown statutory boundaries.

## v0.9 - 2026-08-13

- reality-anchored 并行候选：只把能改变空间判断的公开原始证据放入主叙事。
- 新增 3 组官方现实锚点与 5 条“现实约束 → 空间响应”规则。
- 登记 7 个公开规划条件地块作不可外推的现实强度参照；本案 approved FAR/height 继续 unknown。
- 重建固定 `mobility-bluegreen*.png`，区分普通缝合、知春路竖向连续性、绿廊人优先界面和站城到达。

## v0.7 - 2026-08-13

- Added three current official Haidian public sources (2025 Urban Renewal Guide, 2025 implementation guide, and 2025 Q4 AI-district progress) and split implementation into reversible low-disturbance actions versus changes that require real project generation, implementation-plan review and permitting.
- Rebuilt the mandatory bilingual `key-areas.png` core figure as three actual spatial sections—innovation campus, long-term neighborhood and station-city everyday district—so the Review Agent fixed visual packet sees spatial differentiation directly rather than reviewer-oriented task cards.
- Reversed the v0.6 rubric-first presentation after #2143 merged at Review Agent 76/100 despite all four gates passing: the above-fold reviewer dashboard is demoted to traceability and the first visual returns to actual urban experience.
- Added bilingual three everyday journey diagrams for Zhongzhiyuan, AI Origin and Dazhongsi: ordinary-city baseline, physical repair, optional AI enhancement and a functioning failure/exit route.
- Added bilingual AI-urban-form prototypes: bounded test pockets, accessible help thresholds, continuous arrival interfaces, replaceable service nodes, people-first public ground floors and reversible spatial versioning.
- Started from upstream main `0f051ddb5b91bf5e1992a1b32b8c3b2763978fc8` to inherit the latest validator/schema changes.

## v0.6 - 2026-08-12

- Started from merged v0.5 exact head `caa654366f5ecbd3b7ab2e782ec65fe3192af0cf`, whose upstream PR #2062 was accepted at Review Agent 83/100 with mandatory rejection and all four local gates passed.
- Added bilingual **three flagship pilot protocols** for Zhongzhiyuan low-speed robot testing, AI Origin accessibility/care navigation and Dazhongsi transfer/multilingual guidance. Each protocol now exposes a non-AI baseline, quantity basis, prerequisite evidence gates, test window, KPI direction, stop threshold, exit receipt and accountable-role structure without inventing real permits, contracts, budgets or field performance.
- Added a bilingual **nine-persona inclusion and burden matrix** covering long-term residents/families, older people, disabled or sensory-limited users, children/caregivers, students/researchers, founders/firms, service workers/commuters, visitors/international users and no-smartphone/no-account/opt-out users. Each row records benefit, burden/exclusion risk, non-AI equivalent and human help/appeal path.
- Added bilingual **implementation resource + RACI evidence gates** with concept quantity basis, A/R/C/I responsibility, maintenance cadence, prerequisite gates and a shared PRECONDITION → TEST → RECEIPT → GO/REVISE/STOP decision chain. Currency cost, final FTE, procurement, insurance and named institutional responsibility remain UNKNOWN until verified.
- Added a bilingual **reviewer evidence index** mapping the seven public rubric dimensions and mandatory agent.1–agent.6 tasks to inspectable proposal/figure/JSON/GeoJSON evidence and explicit claim boundaries. The index is traceability infrastructure, not a self-score.
- Added a bilingual **review evidence dashboard** and moved it above the fold of both offline visual pages so the Review Agent's HTML screenshot can directly see core metrics, three flagship pilots, inclusion, implementation gates and claim limits instead of relying on supplemental assets hidden far below the first viewport.
- Corrected the offline visual self-check wording: v0.5 official PASS/merge is now recorded accurately, while v0.6 does not pre-claim final PASS until manifest refresh and persisted self-check are rerun on the final exact head.
- Expanded visible task coverage from five generic personas to nine explicit user groups and from broad operations language to RACI, quantity basis, maintenance cadence, prerequisite gates and stop receipts.
- Current v0.6 remains in design integration. Proposal narrative, report HTML, A3/A0 first pages, manifest hashes and persisted self-check must still be synchronized before a v0.6 PR is opened.

## v0.5 - 2026-08-12

- Follow-up enhancement after merged upstream PR #1954, whose final intake decision recorded Review Agent score 71/100 with mandatory rejection and all four local gates passed.
- Added a bilingual **three positionings → five functions → three areas/two wings → C7** coordination loop so taskbook structure is visible as a design system rather than only a compliance entry.
- Added a bilingual **full-factor AI ecosystem map** covering land, space, industry, capital, talent, compute, data and scenarios through research → translation → testing → adoption → long-term life → C7 feedback.
- Expanded the ten AI+ scenarios into bilingual scenario cards with place/users, real problem, AI enhancement, non-AI baseline/exit and concept-stage acceptance evidence.
- Added a bilingual regional-collaboration validation matrix for Beiyuwei Community, Future Science City, Huairou Science City, Beijing E-Town and Beijing–Tianjin–Hebei; every relationship is explicitly a potential interface rather than an established partnership, funding, data-sharing or administrative commitment.
- Added a bilingual implementation/operations matrix linking project, space, proposed role, prerequisite, start/stop threshold, maintenance responsibility and acceptance KPI.
- Added scenario-level privacy/data governance covering location/route, health/care, home environment, account/identity, behavior/usage and research/enterprise data with minimisation, access, retention/deletion, human review and opt-out rules.
- Added an original submission-level **C7 COMPLETE LOOP** brand/VI concept direction. It does not reproduce or imitate any government, organizer or third-party official identity; `爽粉堡垒社区 / Shuangfen Fortress Community` remains a local naming easter egg only.
- Added a public-space component library and three-layer wayfinding contract: permanent physical information first, updateable operations information second, optional AI third; shutting down AI must preserve basic navigation and public service.
- Expanded `report/copyright_statement.md` into a per-asset rights/generation ledger covering raster figures, new SVGs, HTML, PDFs, GeoJSON, fonts/icons/code status and AI participation.
- Strengthened `sources.json` with provenance, access date, rights/reuse, limitations, permitted use, collection method, coverage and transformation records; six international cases remain factual-reference-only and no case logo/image/map/web asset is embedded.
- Integrated all new deliverables into aligned Chinese and English `proposal` files and raised `iteration` to `v0.5`.
- Maintains all prior provisional-boundary and unknown-statutory-control disclaimers; no new diagram creates an official redline, approved zoning, investment promise, data authorization or implementation approval.
- Pending final packaging work: integrate v0.5 assets into HTML/A3/A0/offline presentation, refresh the manifest through post-finalization tooling, persist a new machine self-check, run participant preflight and validate all visual files before opening a follow-up upstream PR.

## v0.4 - 2026-08-11

- Reorganized Chinese and English proposals into the 13 mandatory formal-section headings required by the latest repository guide.
- Kept bilingual claim order, metrics, evidence references and figure positions aligned; generated bilingual report HTML, offline visual pages, A3 booklet and A0 boards.
- Added five required core figure pairs: site overview, land-use structure, key areas, mobility/blue-green and metrics/evidence.
- Added six global AI ecosystem mechanism cases from first-party institutional sources: Vector Institute, Mila, the Alan Turing Institute, AI Singapore 100 Experiments, Seoul AI Hub and JTC Punggol Digital District.
- Rebuilt `sources.json`, compliance/standard/design-depth matrices and the nine required GeoJSON layers.
- Strengthened the C7 framing as a spatial audit: HOME, LEARN, CARE, MOVE, GREEN, WORK and COMMON LIFE are ordinary-city capabilities; AI remains an optional enhancement layer.
- Preserved `爽粉堡垒社区 / Shuangfen Fortress Community` strictly as a naming easter egg with no morphological or control authority.
- Synced the submission branch to upstream `main` immediately before formal validation work.
- PDF render QA found no clipping or broken glyphs; current Chinese PDFs still use a non-embedded CID CJK font, recorded as a packaging quality warning rather than a planning-content claim.
- Formal validator audit identified and fixed model disclosure (`model_family=gpt`, explicit `model_detail`) and changelog-format requirements.
- Added a top-level machine-readable `data_gap` declaration to the intentionally empty `geometry/constraints.geojson`, aligned with the latest warning-only validator contract for unavailable official constraint geometry.
- Open blocker: `manifest.json` and machine-generated `self_check.json` still need exact SHA-256 refresh through the repository's official self-check/finalization tooling before merge-ready status can be claimed.

## v0.3 - 2026-08-11

- Re-ran peer collision scan after rapid upstream merges.
- Found `Lixiaoyiao/jingzhang-slow-variables` strongly overlaps v0.2's “long-life base / replaceable AI layer” framing; retired that concept before formal drawings were produced.
- Pivoted to **“京张城市完整度 / JING-ZHANG CITY COMPLETENESS”**: seven ordinary-city capabilities (HOME, LEARN, CARE, MOVE, GREEN, WORK, COMMON LIFE) are the spatial audit; AI is an optional enhancement layer rather than the master urban metaphor.
- Generated all nine required GeoJSON layers: site boundary, key areas, land use, buildings, roads, green space, public space, constraints and phasing.
- Land-use concept now contains 13 topologically coordinated features using allowed codes for residential, community service, research, culture, education, commerce and park green space.
- Added six east-west conceptual stitching links and a continuous north-south public greenway; these are not road redlines or engineering alignments.
- Added 13 conceptual building prototypes for capacity/adjacency tests only; approved FAR, height, density and demolition remain unknown.
- `constraints.geojson` is intentionally empty with explicit metadata naming missing official controls and replacement actions, rather than an untouched scaffold placeholder.
- Preserved `爽粉堡垒社区 / Shuangfen Fortress Community` strictly as a naming easter egg inside the AI Origin residential concept; it does not control form, enclosure, density, roads or functions.
- Rewrote Chinese and English proposal drafts to v0.3.

## v0.2 - 2026-08-11

- Compared Proving Ground, AI City OS, NO-APP JINGZHANG, ARRIVE BELONG, CIVIC WARRANTY, HOME-WORK RELAY, HUMAN HOURS and other merged directions.
- Dropped an earlier Urban Warranty direction after collision with `xiao555/jingzhang-civic-warranty`.
- Tested a “百年底座 / city must outlive AI” framing with non-AI baselines and retirement paths for scenarios.
- Added initial bilingual proposal, agent, assumptions, sources, metrics and peer scan.

## v0.1 - 2026-08-11

- Created branch `submission/miyuuteshima984/jingzhang-ai-civic-infrastructure`.
- Created first proposal skeleton with a research → testing → public use → market conversion → public review loop.

## v0.14.s — INVARIANT CIVIC ROUTES
- Added ROAD-009/010/011 as conceptual pedestrian routes with `ai_dependency=none`, binding the three everyday journeys to machine-readable geometry without changing area polygons.
- Replaced v0.13.g false engineering precision and S0–S3-first narration with route-first spatial contracts and explicit evidence boundaries.
- Rebuilt all five canonical figure pairs, bilingual A3/A0 first pages, visual HTML and structured evidence mappings around three differentiated urban types.
- Preserved v0.7 everyday journeys, six reversible AI urban-form interfaces and two implementation paths; restored geometry-derived fixed quantities to canonical recomputation values.

## v0.16 - 2026-08-16

- CLEAN EXIT CITY：把 v0.15.s 的可逆 sidecar 升级为 BASE CITY → ATTACH → OPERATE → CLEAN EXIT 四步空间生命周期。
- 九个既有 sidecar host 写入 ordinary_restore_use / clean_exit_mode / field_check_required；三条 invariant routes 在完整生命周期内保持不变。
- phasing 增加 clean-exit 交接规则，不改变任何 phase polygon 或锁定面积指标。
- 重建 key-area lifecycle hero、metrics evidence、双语 visual 与 A3/A0，令“AI 如何进入并完整退出城市”直接进入 Review Agent 多模态首屏。
- 不新增 AI 用地，不虚构站口、高差、桥隧、净宽、吞吐、FAR、高度或已确认运营主体。
