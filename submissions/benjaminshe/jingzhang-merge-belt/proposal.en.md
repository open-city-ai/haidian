---
title: "Jingzhang Merge Belt — One Railway, One Open-Source City"
author_github: "benjaminshe"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Using the Git merge as the organizing metaphor, this proposal translates the confluence spirit of the century-old Jing-Zhang Railway into an open-source urban co-creation mechanism: Upstream (Zhongzhiyuan) releases openly, the Maintainer Community (AI Origin Community) converts research into products, and the Release District (Dazhongsi) distributes scenarios; the Jing-Zhang corridor is the mainline, the Zhongguancun Technology Services Wing is infrastructure, and the Xiaoyue River Scenario Enablement Wing is integration testing. Merging is a choice, not a mandate: tributary paths (manual, offline, account-free) remain fully usable, and the Review Chamber embodies final human judgment."
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "ai-origin-community"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "enterprise-service-copilot"]
---

# Jingzhang Merge Belt — One Railway, One Open-Source City

> Slogan: **Advance in a zigzag; reach far through openness.** The zigzag is how the railway conquered the steepest grade with the least resources; openness is how every tributary contribution flows into the mainline and leaves its name.
> Core judgment: the sophistication of a future city is not measured by how many sensors it deploys, but by **how many tributaries are willing and able to merge into the mainline** — merging must be a choice, not a mandate; it must be reviewable, rejectable, and rollback-able, and **complete tributary paths (manual, offline, account-free) must remain available**.

**The Merge Belt system (this proposal's named concept)**: the operating discipline of the railway — single-line token block, meeting-and-yielding, tributary joining, station interchange — is translated into a protocol for urban AI governance and public-space operation: the mainline is the everyday city, public and pedestrian-first; tributaries are AI experiments that can be reviewed, rejected, and rolled back. Three layers interlock: the **spatial layer** (the three-zone/two-wing confluence loop and six confluence-node plazas), the **temporal layer** (the Merge Timeslot: morning market / study market / night market plus [metric:quiet_hours_per_day] quiet hours), and the **governance layer** (the six-step Merge Protocol, Merge Token, Return Budget, and contributor ladder). Differentiating claim in one sentence: **merging is a choice, not a mandate; tributaries are never degraded; the return is budgeted** — the city does not stuff AI into its streets; it tells AI "yes, with conditions; no, with an exit".

**Merge Belt mechanism overview (one screen)**: the table below concentrates the three-layer mechanisms, their one-line functions, and evidence locations — the differentiator is not the metaphor but this mechanism combination (timeslot interlock, two-credential closed loop, return budget, tributary parity):

| Layer | Mechanism | One-line function | Evidence location |
| --- | --- | --- | --- |
| Space | Three-zone, two-wing merge circuit | Upstream (Zhongzhiyuan) releases → Maintainers (Origin Community) convert → Release (Dazhongsi) distributes; issue signals loop back upstream | Three-Level Scope chapter, [assets/media/merge-circuit.webp](assets/media/merge-circuit.webp) |
| Space | Six merge-node plazas | East-west stitching, north-south connection; public interface for time-of-day handover | Blue-green/public space chapter, geometry/constraints.geojson |
| Time | Merge Timeslot | 6 reservable slot types per segment per day: morning care / day R&D / evening co-study / night culture / quiet window / merge-day drill; schedule public | This table, [assets/media/merge-timeslot.webp](assets/media/merge-timeslot.webp), visual/assets/merge-timeslot.json |
| Time | Merge Token interlock | One token per segment per slot; forced return on expiry; no silent permanent occupation | Merge Token section, visual/assets/merge-protocol.json |
| Time | Cross-segment timeslot coordination | Handover at boundaries: downstream presumes upstream on time; lateness cascades publicly | This table, visual/assets/merge-timeslot.json |
| Governance | Six-step Merge Protocol | Declare → staging queue (off-site trial) → verify → post → run → review → exit; stage first, then merge | Merge Protocol section, [assets/media/merge-protocol.webp](assets/media/merge-protocol.webp), visual/assets/merge-protocol.json |
| Governance | Two-credential closed loop | Entry credential (Merge Token) + exit credential (Merge Exit Voucher); both constitute a complete merge | Merge Token section, visual/assets/merge-protocol.json |
| Governance | Return budget | Space/operations/data responsibility + teardown drill + annual Undo drill; failures enter the review archive | This table, visual/assets/return-budget.json |
| Governance | Four-type public receipt | Adopted / partly adopted / rejected / pending; each with reason, owner, review node, appeal channel | Review step, governance chapter |
| Governance | Tributary ledger & parity | Human/offline/account-free channels run equal to the mainline; tributary_parity_index measures service parity gap | Tributary assurance section, [assets/media/tributary-assurance.webp](assets/media/tributary-assurance.webp) |

![Jingzhang Merge Belt conceptual cover (conceptual illustration; not a site view or an approval)](assets/media/cover.webp)

Unlike proposals that use the Git metaphor only for "reversibility", the Merge Belt translates the railway's operating discipline — single-line token block, meeting-and-yielding — into an **executable admission protocol and public-space institution**: the difference lies not in the slogan but in the combination of the six-step Merge Protocol, the Merge Token, the Return Budget, and the Tributary Ledger. Contrast with common "open-source / PR metaphor" proposals:

| Dimension | Common "open-source / PR metaphor" proposals | This proposal: Merge Belt |
| --- | --- | --- |
| Semantic core | Urban renewal as code merge: mergeable and rollback-able | Merging is a **choice**, not a mandate: the mainline never fails, tributaries are never degraded |
| Tributary status | All contributions are expected to merge into the mainline | Manual / offline / account-free paths run **equivalently** and are registered in the Tributary Ledger |
| Exit mechanism | Roll back a technical version | **Return Budget**: space / operations / data responsible parties + teardown drill + annual Undo drill |
| Time dimension | One-off or batch merges | **Merge Timeslot**: morning / study / night markets + quiet window + Merge-Day drill, tokens locked "one segment, one slot" |

## Design Basis and Source Inventory

This proposal takes the *Prequalification Announcement for the International Open Call for the Centennial Jing-Zhang AI Innovation Belt Urban Design*, published on 2026-05-09 by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources, as its primary basis [source:OFFICIAL-ANNOUNCEMENT], and the maintainer-registered provisional boundaries, key areas, enums, metrics, and source inventory under `brief/site-package/` as its machine-readable basis [source:SITE-PACKAGE]. Before generation, the agent read `design_brief.json`, `allowed_design_space.json`, `agent_taskbook.json`, `sources.json`, `ranges/planning_limits.json`, `schemas/`, and `data/source_registry.json`, and used `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, and `missing_data_checklist.csv` under `data/processed/` to build task, scope, source-use, and data-gap checklists. Every design judgment is decomposed into traceable sources, recomputable metrics, verifiable layers, and human-reviewable assumptions.

The evidence chain of this section uses [source:OFFICIAL-ANNOUNCEMENT] as its entry, [standard:MOHURD-URBAN-DESIGN-MEASURES] as the professional standard, and [depth:existing_conditions_diagnosis] for baseline diagnosis and data gaps; the full source and standard index lives in sources.json, compliance_matrix.json, standard_matrix.json, and design_depth_matrix.json.

Source registry boundaries: materials with `usable_for_formal="yes"` in `data/source_registry.json` may support formal evidence; `provisional_only` materials are used for generation, visualization, and intake self-check only. This proposal **does not** use any non-public planning drawings, non-public spatial data, or personal private information.

As of 2026-08-08 the official `SITE_BOUNDARY` and three `KEY_AREA` polygons have not been released (prequalification files require a password; no verifiable redline is publicly available [source:SOURCE-REGISTRY]). This proposal therefore uses the provisional boundaries in `brief/site-package/geometry/provisional_boundaries.geojson`: `geometry/site_boundary.geojson#SITE-001` is marked `official_boundary=false`, `geometry_role="provisional_constraint"`, `boundary_precision="provisional_rough"`; the three key areas carry the same marking. These provisional boundaries are used only for generation, self-check, visualization, and design discussion — they are **not** an official redline, an approval basis, or a precise-area basis. When official polygons are published, land use, buildings, roads, green space, public space, phasing, and all area metrics must be recomputed with the same scripts rather than by editing a single file. The organizer's data gap does not affect this package's eligibility for intake and structural review; formal professional scoring and acceptance are decided by the maintainers on the basis of complete data.

A point-specific disclosure is also required: public issue #1029 reports that the centroid of the provisional key area `PROV-KEY-003` (Dazhongsi AI Industry Cluster) falls near Beijing North Railway Station, roughly 2.26 km from Dazhongsi Station — a reproducible positional offset. This proposal uses that polygon only as a conceptual anchor for the Release District (Dazhongsi) and its scenario discussion, marked `geometry_role="provisional_constraint"`; it makes no claim of precise siting, area, or implementation boundary. When official polygons are published, the positioning, area, and related metrics of this key area are corrected together through the full-chain recalculation pipeline.

![Evidence chain and submission package relationships](assets/figures/site-overview.png)

## Task Response Matrix (announcement and taskbook, item by item)

The table below maps the six agent tasks of the repository taskbook to this proposal's sections and evidence for quick verification [standard:PROJECT-OFFICIAL-ANNOUNCEMENT][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]:

| Task | Response in this proposal | Evidence location |
| --- | --- | --- |
| agent.1 Belt-wide concept and functional coordination | "Merge Belt" naming system, Logo direction, three positions / five functions / three-zone two-wing confluence loop, overall structure diagram; no FAR/height/demolish-retain conclusions | Executive summary and Three-Level Scope sections, `assets/figures/site-overview.png`, compliance_matrix |
| agent.2 Full-stack independent AI innovation system and world-class ecosystem | 6 global ecosystem cases (mechanism-only, no form copying), upstream open-source release → maintainer conversion → release distribution ecosystem map, eight-factor mechanisms | "AI Innovation Ecosystem, Talent Profiles, and AI-Enabled Scenarios" section, compliance_matrix |
| agent.3 AI-enabled scenario empowerment and smart lively city | 16 scenario cards (≥10), 3 industry testing/validation scenarios, 6 persona types, scenario-space-operation mapping, privacy and human-review boundaries | Scenario card table and [data:geometry/constraints.geojson#SCENE-01], persona table |
| agent.4 AI public space, AI-native new formats, pilgrimage landmarks | Heritage-park AI public space, east-west stitching and north-south threading, Dazhongsi AI-native consumption, 4 pilgrimage landmarks, honor display system and component library | Blue-Green/Public Space sections, landmark catalog, `assets/figures/mobility-bluegreen.png` |
| agent.5 Jing-Zhang heritage, Zhongguancun culture, and AI new-culture narrative | Three-layer narrative (railway heritage—Zhongguancun innovation—AI new culture), signage and symbol system, international communication copy | Culture narrative and public space sections |
| agent.6 Global AI activity system and long-term operation | Annual activity system (monthly log / quarterly actions / annual Merge Day), developer community operation, scenario-access operation, international outreach and attraction | "Renewal Project List, Implementation Policy, and Phasing" section, metrics |

The table above responds item by item to the announcement and the taskbook; its source chain [source:AGENT-TASKBOOK][source:OFFICIAL-ANNOUNCEMENT] aligns with the repository taskbook originals.

## Three-Level Scope Framework

The three levels follow a "**watershed — mainline — merge node**" progression rather than scaling up one master plan [depth:overall_spatial_structure][depth:three_level_scope_framework]:

- **Coordinated Research Area (43.6 km², watershed layer):** answers how the AI industry chain, talent chain, public service chain, and cultural communication chain originate, diverge, and converge in Haidian; defines the three-zone/two-wing merge loop and factor mechanisms.
- **Overall Design Area (11.4 km², mainline layer):** treats the Jing-Zhang heritage corridor as the **Mainline**, and carries the merge relationships into land use, slow mobility, blue-green, renewal, and public service frameworks; east–west tributaries join the mainline here [data:geometry/land_use.geojson#LU-001].
- **Key-Area Detailed Design Area (368.4 ha, merge-node layer):** Zhongzhiyuan = Upstream, AI Origin Community = Maintainers, Dazhongsi = Release, using operable space prototypes to test whether R&D, conversion, exchange, and daily life can coexist [data:geometry/key_areas.geojson#PROV-KEY-001].

All three levels share one baseline: **merging is rejectable**. Any AI service merge must satisfy "reviewable before commit, divertible during operation, rollback-able on exit, and non-degrading for tributaries"; governance is therefore part of the overall structure, not an appendix.

The submitted geometry yields an overall design area of approximately 11,412,825 square meters [metric:site_area_sqm] and 3 key areas [metric:key_area_count]; because the boundary is provisional, confidence is medium and no new statutory conclusion is drawn [depth:metrics_recalculation].

![Three-level scope and spatial working framework](assets/figures/land-use-structure.png)

![Three-zone/two-wing merge loop (conceptual illustration)](assets/media/merge-circuit.webp)

## Coordinated Research Area: Industry and Future-City Research

**Overall concept and naming system (agent.1):** this proposal names the belt "**京张合流带 / Jingzhang Merge Belt (JZ-MB)**", using Git-workflow semantics as a complete, extensible, internationally communicable naming system:

| Space / Object | Name | Semantics |
| --- | --- | --- |
| Belt | Jingzhang Merge Belt | the urban mainline into which all tributaries merge |
| Coordinated Research Area | Watershed Scope | 43.6 km² strategy layer |
| Overall Design Area | Mainline Scope | 11.4 km² structure layer |
| Jing-Zhang heritage corridor | Mainline | north–south spine, east–west stitching |
| Zhongzhiyuan | Upstream | models, compute, standards, safety governance |
| AI Origin Community | Maintainers | university-origin innovation and conversion |
| Dazhongsi | Release | agents, content consumption, distribution |
| Zhongguancun Technology Services Wing | Infra | capital, IP, factor allocation |
| Xiaoyue River Scenario Enablement Wing | Integration | scenario validation and integration testing |
| Renewal projects | Merge Requests | reviewable, rejectable, rollback-able |
| Public participation | Public Merge Review | citizens review city proposals like PRs |

**Logo direction:** two tributaries (blue = AI technology flow, green = open-source humanities flow) converge into one mainline (orange = urban public line), simultaneously evoking a railway switch and a `git merge` branch union; a zigzag corner mark pays tribute to the Qinglongqiao switchback. Three-color system: Upstream Blue / Open Green / Human Amber. Naming and identity serve the three positioning statements — Centennial Jing-Zhang Cultural Belt, Urban AI Life Experience Belt, and AI-Integrated Innovation Belt [source:AGENT-TASKBOOK].

![Logo concept sketch (self-drawn, no copyright risk)](assets/figures/logo-concept.png)

**Three-zone/two-wing merge loop (agent.1/agent.2):** `Upstream (Zhongzhiyuan) open-source release → Maintainers (AI Origin Community) maintain and convert → Release (Dazhongsi) scenario distribution → demand signals (issues) feed back upstream`, forming an iterative loop; the Zhongguancun Technology Services Wing (Infra: capital/IP/global factor allocation) and the Xiaoyue River Scenario Enablement Wing (Integration: scenario integration-test environment) keep the loop running. The five functions (full-stack independent AI innovation system, world-class AI innovation ecosystem, AI-enabled scenario empowerment paradigm, intelligent vibrant AI city, and global AI governance discourse) land on the upstream, maintainer, release, tributary, and adjudication stages respectively [source:AGENT-TASKBOOK].

**Six ecosystem cases (mechanisms only, not copied forms):** [source:LINUX-FOUNDATION] (open-source governance and long-term maintenance), [source:APACHE-FOUNDATION] (community self-governance and contributor ladders), [source:HUGGINGFACE] (model commons and governance), [source:MOZILLA] (public digital infrastructure), [source:SINGAPORE-AI-VERIFY] (repeatable pre-deployment evaluation), [source:PUBLIC-PARTICIPATION-CASES] (conflict negotiation and adjudication in urban renewal). These are background research only; the proposal does not claim these institutions are adopted, and limitations are recorded as A-CASES-001 in assumptions.json.

**Regional synergy (agent.2, merging is not confined to the belt):** merging "emits" outward to the wider region rather than annexing it, consistent with the belt's "source and origin" role (Conceptual Recommendation [depth:existing_conditions_diagnosis]): the Beiwu community and education–science corridor (Beihang, BUPT, etc.) open their interfaces and share the university-origin innovation chain with the Origin Community — the university loop of "upstream release"; Future Science City and Huairou Science City receive basic-research and talent output from the Upstream (Zhongzhiyuan), forming "upstream open-source release → science-city amplification"; the Economic-Technological Development Area receives pilot and manufacturing conversion, forming "maintainer conversion → manufacturing landing"; Beijing–Tianjin–Hebei receives scenarios, standards, and governance experience, forming "release distribution → nationwide adoption". These four gradients mirror the three zones and two wings: Upstream release, Maintainer conversion, and Release distribution each have one regional outlet, so the mainline is not a closed loop but an open system that keeps merging outward.

The future city form is not a dense-sensor landscape but "**mainline never fails, tributaries are never forced**": the ground plane prioritizes continuous walking, cycling, shade, and human service; the optional intelligence layer enters through Public Merge Review; the operations layer records model versions, service interruptions, human takeovers, rejections, and rollbacks. Industry performance is judged on three public outcomes: merge throughput (how contributions enter the mainline), conflict resolution rate (how disagreements are adjudicated), and tributary availability (whether those who do not merge receive equal service); the latter two remain unknown until operating samples exist [depth:risk_missing_data].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Depth Urban Design

The overall structure treats the narrow Jing-Zhang corridor as a **merge mainline**: north–south through-connection is the mainline; east–west blocks, green corridors, and transit stations are tributaries that join at six "merge nodes" (corresponding to scenario and public-service anchors). Land-use zones are partitioned directly within the provisional site polygon, fully covering it without gaps or overlaps [data:geometry/land_use.geojson#LU-001]; codes come from the permitted set of the site package [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], governed by [depth:land_use_layout].

The building layer uses "**reversible capacity testing**" rather than baseline conclusions: capacity blocks only test how public space, slow mobility, and mixed use support each other [data:geometry/buildings.geojson#BLDG-001], with `intervention_status=capacity_test_only` and `demolition_decision=false`; the combined footprint is [metric:building_footprint_area_sqm]. FAR, building height, building density, and setbacks remain unknown, recorded by [depth:development_intensity_controls] and [depth:height_massing_character] as "depth responded, conclusions pending regulatory data", responding to [standard:MOHURD-URBAN-DESIGN-MEASURES] and [standard:MOHURD-CONTROL-DETAILED-PLANNING].

The renewal method is "**small units, reversible, public first then construction**": first test merge nodes with ground markings, wayfinding, tree rows, and movable human-service counters; then advance ground-floor publicness, slow-mobility gaps, and service facilities in the three key areas; only then decide building implementation based on official regulatory, mobility, municipal, fire, heritage, and ownership conditions. Each renewal unit is a "merge request": reviewed, rejectable, and rollback-able [depth:retain_renovate_demolish].

![Land-use zoning, functional structure, and reversible capacity tests](assets/figures/land-use-structure.png)

## Key-Area Detailed Design

The three key areas are designed directionally on the provisional key-area polygons [depth:three_key_area_detailed_design], each organized by a seven-element format — **positioning — spatial structure — building renewal — mobility & slow access — public space — AI scenarios — implementation risks**; because the boundaries are provisional estimates, all conclusions are Conceptual Recommendations for professional teams to deepen, not parcel-level statutory determinations.

**Zhongzhiyuan = Upstream (approx. 192.1 ha)** [data:geometry/key_areas.geojson#PROV-KEY-001]
- **Positioning**: garden-type full-stack innovation and validation district hosting model evaluation, standard setting, compute services, and safety governance;
- **Spatial structure**: full-stack R&D belt on the west (evaluation yard / standards workshops / compute services / Upstream Release Hall), Qing River green valley spine in the middle, international talent community and strategic reserve on the east [data:geometry/land_use.geojson#LU-003];
- **Building renewal**: replacement of low-efficiency space with R&D carriers while retaining the existing skeleton, demo blocks Zhongzhi Accel Tower [data:geometry/buildings.geojson#BLDG-001] and Upstream Release Hall [data:geometry/buildings.geojson#BLDG-002], `capacity_test_only`, no demolish–renovate–retain conclusions;
- **Mobility**: continuous shade and sensor-free tributary path along the Qing River, merge-choice threshold, and the Zigzag Viewing Bridge at the north overpass node (see landmarks);
- **Public space**: Upstream Release Plaza and merge-threshold markers, industrial display along the spine;
- **AI scenarios**: Integration Yard, low-speed robot shared-road test, Upstream evaluation yard, Public Merge Review Station (SCENE-01/02/03/04);
- **Implementation risks**: Fifth Ring link and Qing River blue-line scope unconfirmed; related suggestions are conceptual only.

**AI Origin Community = Maintainers (approx. 104.3 ha)** [data:geometry/key_areas.geojson#PROV-KEY-002]
- **Positioning**: near-campus conversion district building an "open-source release—conversion—service" ecology around university original innovation;
- **Spatial structure**: conversion belt on the west (Open-Source Conversion Lab [data:geometry/buildings.geojson#BLDG-003]), "street-level lab" in the middle, innovation consumption and community services on the east;
- **Building renewal**: campus–park interface opening first with low-disturbance renewal, demo blocks Open-Source Conversion Lab and Quiet Commons Hall [data:geometry/buildings.geojson#BLDG-004];
- **Mobility**: around-the-clock walking and cycling stitching campus–park–community, with transit-station walking/cycling/accessibility gap improvement (MR-05);
- **Public space**: **Quiet Commons Hall** — paper reservations, human inquiry, and account-free service, testing whether technology aids collaboration without turning participation into "install an app"; open-source lawn;
- **AI scenarios**: AI-enabled cultural guide, enterprise service copilot (SCENE-06/08);
- **Implementation risks**: university land ownership and heritage scope unconfirmed; interface opening requires negotiated agreements.

**Dazhongsi = Release (approx. 72.0 ha)** [data:geometry/key_areas.geojson#PROV-KEY-003]
- **Positioning**: city-level intelligent-product living room hosting agents, content consumption, international exchange, and distribution;
- **Spatial structure**: intelligent-native consumption zone on the west (Dazhongsi Smart Living Room [data:geometry/buildings.geojson#BLDG-005]), enterprise display and roadshows on the east, cultural display belt at the south;
- **Building renewal**: upgrading existing commercial carriers, demo blocks Dazhongsi Smart Living Room and Merge Review Center [data:geometry/buildings.geojson#BLDG-006], no block-level demolish–renovate–retain conclusions;
- **Mobility**: four-quadrant walking continuity in front of the station, direct connection to key parcels, retaining ordinary ticketing and human channels;
- **Public space**: **First-Merge Stone** and **Merge Monument** in front of the station; any personalized explanation is optional; **Review Chamber** (southern end of the heritage park, see landmarks);
- **AI scenarios**: Annual Merge Day drill, unmanned last-mile delivery (SCENE-12/16);
- **Implementation risks**: heritage scope and station boundary not obtained; four-quadrant connectivity is conceptual.

The three prototypes answer function, building interface, mobility and slow access, blue-green public space, AI scenarios, human takeover, implementation dependencies, and exit routes, connected via the mainline [data:geometry/roads.geojson#ROAD-001] and east–west public tributaries; all drawings carry provisional labels to prevent rectangular temporary ranges from being read as blocks or redlines.

![Three spatial prototypes: Zhongzhiyuan, Origin Community, Dazhongsi](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Talent Profiles, and AI-Enabled Scenarios

Six persona profiles [metric:persona_count] describe no specific individuals: upstream contributors (R&D/algorithms) need bookable testing and quiet focus; AI founders need low-cost compliance, compute, and a first city customer; maintainers (university faculty/students) need cross-campus collaboration, release, and daily slow mobility; tributary residents need low-disturbance leisure, community services, and clear complaint channels; frontline operators need explainable tickets, offline manual operation, and clear accountability; international visitors need multilingual wayfinding, ordinary ticketing, and human service. Personas serve spatial needs only, not behavior tracking or commercial recommendation.

Sixteen scenario cards [metric:scenario_card_count] are registered in [data:geometry/constraints.geojson#SCENE-01] through SCENE-16, each annotating spatial location, service audience, type, and data-privacy boundary — including [metric:scenario_health_navigation] AI+health, [metric:scenario_education] AI+education, [metric:scenario_autonomous] autonomous-driving, and [metric:scenario_lastmile] unmanned-delivery scenarios, covering the AI-application directions named by the taskbook (AI+traffic/health/education, robotics, autonomous driving, unmanned delivery).

| # | Scenario | Location | Service audience | Type | Data & privacy boundary · Human review |
| --- | --- | --- | --- | --- | --- |
| 01 | Integration Yard (integration-test environment) | Upstream reserve [SCENE-01] | Industry teams | ★ Industry test/validation | Public time window/equipment scope/exit route; human review before access |
| 02 | Low-speed robot-delivery shared-road test | Mid-corridor tributary [SCENE-02] | Industry teams | ★ Industry test/validation | Time/speed limited; on-site stoppers; full event replay review |
| 03 | Upstream Evaluation Yard (open model/safety/standard evaluation) | Zhongzhiyuan west [SCENE-03] | Developers/regulators | ★ Industry test/validation | Anonymous inputs; results published desensitized; evaluation list human-approved |
| 04 | Public Merge Review Station (citizens submit merge requests, human review) | Upstream [SCENE-04] | Citizens/co-creators | Public service | Only public issues and opinion summaries, no personal tracking; adoption decided by humans |
| 05 | Review Chamber open day (multi-party negotiation and arbitration drill) | Heritage park south [SCENE-05] | Multi-party stakeholders | Public service | Footage managed per rules; rulings made at the human final-adjudication desk |
| 06 | AI-enabled cultural guide (immersive Jing-Zhang memory tour) | Landmarks along the belt [SCENE-06] | Visitors | Urban experience | Anonymous interaction, no conversation retention; scripts human-reviewed |
| 07 | AI-enabled traffic and walkability assessment (gap diagnosis) | Mainline slow network [SCENE-07] | Residents/planners | Urban experience | Aggregate statistics only, no personal tracking; results human-reviewed |
| 08 | Enterprise service copilot | Origin Community [SCENE-08] | Enterprises | Industrial service | Identity data by two-way authorization; disputed transactions human-reviewed |
| 09 | Quiet Commons Hall (account-free, human-counter fallback) | Origin Community [SCENE-09] | All public | Tributary guarantee | Usable without an account; minimal paper records; human-counter fallback |
| 10 | Night quiet-window monitoring | Whole corridor [SCENE-10] | Residents along the belt | Urban operation | Environmental aggregates only (e.g. decibels), no voiceprint; alerts human-confirmed |
| 11 | Accessibility routing (tributary-first) | Full slow network [SCENE-11] | People with disabilities | Tributary guarantee | Opt-in, on-device first; human customer-service fallback |
| 12 | Annual Merge Day drill (city-wide "non-merge" operation test) | Whole belt [SCENE-12] | All public | Urban operation | After switching off non-essential AI, verify ordinary wayfinding/human service/emergency; results publicly reviewed |
| 13 | AI+health · community health navigation | Origin Community [SCENE-13] | Residents/patients | Public service | Navigation only, no diagnosis; no health-data collection; human handover to hospitals/clinics |
| 14 | AI+education · open-source classroom | Origin Community [SCENE-14] | Students/teachers | Public service | No profiling of minors; curricula human-reviewed; parents may opt out |
| 15 | Autonomous driving · main-spine shuttle test | Main-spine restricted segment [SCENE-15] | Visitors/commuters | ★ Industry test/validation | Human safety officer on board; time- and segment-limited; manual takeover on anomaly |
| 16 | Unmanned delivery · last-mile hub | Dazhongsi [SCENE-16] | Residents/merchants | Urban experience | ID-based pickup at hub; delivery routes time-limited; anomaly stop with manual handling |

Every merge (scenario admission) must pass the "**Merge Protocol**" in six steps before entering open operation [depth:municipal_new_infrastructure]: ① **Declare** — the operator submits a Merge Application: public purpose, minimal data, responsible party, test environment, human alternative, appeal channel, stop threshold, maintenance budget, and exit date; those passing the initial review enter the **staging queue**, first running in a restricted environment or off-site (without occupying a public timeslot), publishing trial results and submitting them to Public Merge Review before applying for a formal timeslot — **stage first, merge second**; no AI city service may go live without a trial run; ② **Verify** — first pass the **evidence-level gate**: data is graded into [metric:evidence_gate_level_count] levels by source and basis — official redlines / rights-cleared official data may drive build and operate actions; provisional boundaries, aggregate estimates, and medium-confidence data only trigger on-site verification and recalculation, never a build or management action; missing data stays unknown and is registered. After the gate, five acceptance checks on evidence, safety, user, operation, and public return (mapping the Five Merge Checks: Visible, Usable, Debatable, Accountable, Revertable); ③ **Post** — on-site signage states purpose, inputs, outputs, risks, responsible party, operating status, and sunset date; ④ **Run** — Merge-Token mutual exclusion, public timetable, and an equivalent non-digital channel with accessible route in place ("tributaries are not degraded"); ⑤ **Review** — objection channels, Public Merge Review, and the **four-type public receipt** (adopted / partially adopted / not adopted / pending verification, each with reasons, responsible person, review node, and appeal channel); human final adjudication, emergency stop, and a sunset clause (pilots do not auto-renew); ⑥ **Exit** — token return on expiry, teardown time window, data-deletion evidence, and an annual Undo drill; failed cases enter the review archive wall. In addition to the five elements above, each card adds five fields — "admission gate — pause threshold — exit condition — baseline source — failure disclosure" — all governed by the Merge Protocol and the Return Budget: **baseline source** names the comparison basis (e.g. "no worse than the current four-week aggregated baseline on average delay"); a scenario without a baseline does not constitute an evaluable merge; **failure disclosure** requires publishing failed thresholds, causes, and improvement plans into the Public Merge Review and the review archive wall — a wall that shows only successes is a billboard, not governance.

Temporary AI occupation of public space follows "**Merge Token**" booking interlocking (borrowed from single-track railway token block): a token grants a named operator one segment, one time window, with data boundaries and human review points, forcibly returned on expiry; only one token per segment at a time; no booking may fence off a whole station plaza or run all day continuously; objections suspend the booking pending human review, preventing an "open zone" from silently becoming permanent. Merges run as a **two-credential closed loop**: the Merge Token is the **entry credential** and the **Merge Exit Voucher** is the **exit credential** — within the teardown window the operator must return the token and close the loop by presenting the Exit Voucher (data-deletion proof + site-restoration confirmation + zero unresolved appeals), with the voucher archived publicly; only a service holding both entry and exit credentials constitutes a complete merge, preventing "occupy on entry, vanish without trace".

![Six-step Merge Protocol (conceptual illustration)](assets/media/merge-protocol.webp)

**Merge Timeslot** (time layer, Conceptual Recommendation): design "when to merge" as rigorously as "where to merge" — each segment offers [metric:merge_timeslot_count] bookable slot types per day: morning care, daytime R&D, evening co-learning, night culture, quiet window, and the Merge-Day drill; tokens lock "one segment, one slot", with the timetable publicly posted and published. Hour-of-the-day handover unfolds along the three key areas: morning care centers on Upstream (morning market), evening co-learning on the Origin Community (study market), and night culture on Dazhongsi (night market); boundary periods are set by adjacent segments through Public Merge Review as "shift handover", with the merge-node plazas as the public interface of the hour handover. No activity interrupts ordinary passage; equivalent service exists without smart devices; the end time, responsible party, and restoration method are announced before it begins. Tributary safeguards require at least [metric:quiet_hours_per_day] hours of quiet window per day, when non-essential AI runs in quiet mode and ordinary passage and services are unaffected; once official boundaries and regulatory conditions are available, the timeslot table is recalculated against actual operation and approval conditions. Timeslot allocation follows **three fairness principles** (a direct answer to the question "whose time?"): first, **ordinary passage and tributary residents' hours take precedence** — public slots such as morning care and the quiet window cannot be squeezed out by reservations; second, **open queueing, first-come-first-served, with major public uses prioritized** — no segment may be continuously monopolized, and no-shows or overdue teardowns automatically return the slot and are publicly recorded; third, **yielding is fairness** — boundary "shift handovers" are settled by adjacent segments through Public Merge Review, and no AI experiment may occupy others' time by extending its own slot; objections may suspend a reservation pending human review. **Cross-segment timeslot coordination**: adjacent segments link at the "shift handover" — the downstream window presumes the upstream runs on time, lateness cascades and is publicly recorded, making "when to merge" predictable and accountable along the whole line (the temporal and spatial layers interlock at the merge-node plazas).

![Merge Timeslot (conceptual illustration)](assets/media/merge-timeslot.webp)

Each card shares a "three-part proof": **Before** — before cameras, QR scans, or accounts, ground markings state data type, purpose, duration, and the ordinary path; **During** — the running system, model/operator, human-counter location, and emergency stop are visible; **After** — exit, deletion, correction, or recovery receipts are provided. If the tributary path is clearly worse in wait time, price, or accessibility than the mainline, it does not count as "mergeable"; the `tributary_parity_index` measures the normalized service-parity gap during operation and remains unknown for lack of operating samples. Scenario depth and risks are constrained by [depth:municipal_new_infrastructure] and [depth:risk_missing_data].

![Tributary assurance (conceptual illustration)](assets/media/tributary-assurance.webp)

## Land Use, Building Scale, and Demolish–Renovate–Retain

Land use forms a topologically complete partition of [metric:land_use_zone_count] conceptual zones fully covering the overall design scope without gaps or overlaps (verified by spatial review) [data:geometry/land_use.geojson#LU-001]; every zone uses a statutory land-use code from the permitted set [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] rather than self-invented categories.

Composition (recalculated in EPSG:4548):
- Research approx. [metric:landuse_research_area_sqm] m²
- Residential and community services approx. [metric:landuse_residential_area_sqm] m²
- Commercial approx. [metric:landuse_commercial_area_sqm] m²
- Education approx. [metric:landuse_education_area_sqm] m²
- Culture approx. [metric:landuse_culture_area_sqm] m²
- Park/green approx. [metric:landuse_green_open_area_sqm] m²
- Strategic reserve approx. [metric:landuse_reserved_white_area_sqm] m²

Layout logic: continuous spine (park/green through the belt), research strong at both cores, jobs–housing interlocking (mid-corridor and east), consumption at the Release district, and reservable growth (annual Public Merge Review roll-out). The current land use is a conceptual partition and does not change existing ownership or use; formal deepening must overlay official parcels, current use, and regulatory-plan maps, then propose block-by-block "retain, minor renewal, functional conversion, comprehensive renewal, or reserve" suggestions with recorded basis and approval paths.

Demolish–renovate–retain applies a "**four-gate merge-request**" process: gate 1 ownership and baseline survey; gate 2 structural, fire, energy, and heritage-value assessment; gate 3 public interest and whole-life carbon comparison; gate 4 statutory procedure and Public Merge Review. No block enters a demolition list without all four gates [depth:retain_renovate_demolish]. Therefore the seven demo blocks express a reversible catalyst package for testing block openness, not approved construction scale — [data:geometry/buildings.geojson#BLDG-001] through BLDG-007 are `capacity_test_only` with `demolition_decision=false`, combined footprint [metric:building_footprint_area_sqm], demo count [metric:catalyst_building_count]; the assumed-floors estimate (A-DEMO-FLOORS-001) expresses only "catalyst package" intensity, not total district floor area.

Character control emphasizes "**railway scale, quiet interfaces, legible technology**": ground floors prioritize continuous eaves, openable public rooms, and human service; sensor states are expressed with low-glare, understandable markers; masses facing the heritage park and green corridors remain segmented and transparent. Specific heights, setback rates, spacing, and skyline await official regulatory planning, view corridors, heritage, and sunlight analysis [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

## Mobility, Rail, Municipal, and Public Service Facilities

The mobility system is organized as **mainline–tributary**: the mainline provides a slow-mobility-priority north–south continuous corridor with transit integration, with a network concept length of [metric:road_network_length_m]; tributaries provide ordinary paths into each block; six merge nodes are placed before data collection, not after users enter a sensing zone [data:geometry/roads.geojson#ROAD-001]. Transit stations and key intersections implement a continuous "arrival–crossing–parking–entrance–human counter" chain; bicycle parking is close to entrances without occupying tactile paving; low-speed robots are time-limited, speed-limited, pedestrian-first, and staffed with on-site stoppers. Because complete passenger flow, entrances/exits, parking, and network models are missing, this proposal writes no road-redline widths, parking requirements, or capacity values [depth:traffic_rail_slow_parking].

Municipal and new infrastructure follows the "**safe when disconnected**" principle: lighting, stormwater, energy, charging, edge computing, and facility inspection all require local manual modes, visible failures, data minimization, and clear operators; public services provide human counters, telephone/paper channels, ordinary payment, and accessibility alternatives. Community health scenarios only navigate and refer, not auto-diagnose; legal/IP scenarios only assist with materials; public-safety scenarios only aggregate information and do not make disposition decisions automatically. Facilities are located at [data:geometry/constraints.geojson#SCENE-06] and [data:geometry/constraints.geojson#SCENE-10], deepened under [depth:municipal_new_infrastructure].

Spatial form follows a "**tributary-scale**" design code (Conceptual Recommendation, to be recalculated to the same formula once official road networks and regulatory-plan conditions arrive [depth:traffic_rail_slow_parking]): the mainline keeps a slow-mobility-first continuous public interface; tributary lanes are suggested at 11–18 m, frontage ratio ≥70% (≥85% in key areas), no continuous walls over 30 m, and at least one 24-hour public through-passage per block — street density supports "serendipity density", so merging happens at human scale, not only at the data layer.

![Mainline-tributary, blue-green network, and merge thresholds](assets/figures/mobility-bluegreen.png)

## Blue-Green Space, Public Space, and Urban Character

The blue-green structure comprises the Jing-Zhang continuous park, the Qing River low-carbon garden, the Origin Community open-source lawn, and the Dazhongsi stormwater quiet garden; combined conceptual area [metric:green_space_area_sqm] and ratio [metric:green_ratio] (estimates relative to the provisional total scope, not statutory green ratio) [data:geometry/green_space.geojson#GREEN-001]. Public space consists of the mainline corridor, six merge-node plazas, and three shared halls [data:geometry/public_space.geojson#PUBLIC-001], with combined conceptual area [metric:public_space_area_sqm] and ratio [metric:public_space_ratio]; every location has continuous shade, seating, drinking water, restroom wayfinding, accessibility information, and human help, and AI installations must be bypassable, switchable-off, and explainable. A night "quiet window" reduces screens, announcements, and testing frequency.

**AI pilgrimage landmarks (agent.4, [metric:pilgrimage_landmark_count]):**
1. **Merge Monument** — a sculpture and stele of tributaries merging into the mainline, inscribing all contributors' GitHub names (echoing the organizer's "NAME IN STONE"; scanning shows merge history);
2. **First-Merge Stone** — in front of Dazhongsi station, commemorating the city's "first merge commit";
3. **Review Chamber** — at the southern end of the heritage park: multi-party negotiation room + human final-adjudication desk + adjudication archive wall; the spatialization of "final human judgment" and the anchor of "global AI governance discourse";
4. **Zigzag Viewing Bridge** — an overpass node paying tribute to the Qinglongqiao switchback, overlooking the full confluence.

City character is recognized not by glowing screens but by the "merge" language: mainline = continuous public interface, tributaries = block scale, nodes = switch-like convergence. **Upstream Blue / Open Green / Human Amber** run through wayfinding, ground markers, and installations; all key drawings show legends, sources, and provisional hints so that cropped images cannot be taken out of context [depth:blue_green_public_space].

## Renewal Project List, Implementation Policy, and Phasing

Renewal forms [metric:merge_request_count] "merge-request" work packages, each listing its main dependencies:

| # | Work package | Location | Main dependencies |
| --- | --- | --- | --- |
| MR-01 | Mainline ground markings and ordinary wayfinding | Whole corridor | Alignment with existing park implementation scope |
| MR-02 | Six merge nodes and human-service counters | Corridor nodes | Public-space operator confirmed |
| MR-03 | Ground-floor public-interface micro-renewal in the three key areas | Three key areas | Land-use and regulatory-plan conditions |
| MR-04 | Qing River–Jing-Zhang continuous blue-green repair | North to mid section | Qing River blue-line scope confirmed |
| MR-05 | Transit-station walking, cycling, and accessibility gap improvement | Wudaokou/Dazhongsi stations | Station and junction retrofit conditions |
| MR-06 | Three industry-validation scenarios (Integration Yard / delivery shared road / Upstream evaluation) | Upstream reserve | Test authorization and supervisory body |
| MR-07 | Public registry pages and on-site notices for algorithms/devices/services | Whole belt | Data-policy alignment |
| MR-08 | Annual Merge Day (city-wide non-merge operation test) | Whole belt | Annual operating budget and contingency plan |

Locations map to [data:geometry/phasing.geojson#PHASE-001], checked by [depth:renewal_project_list].

The three-phase strategy [metric:phase_count] is not a fixed construction commitment: the near term runs reversible public facilities, tributary-baseline census, paper/human channels, and two-route markings; the mid term advances public interfaces, mobility gaps, stormwater, and industrial services across the three key areas, with Public Merge Review deciding which intelligence to keep; the long term forms annual operations, model/device updates, parity audits, and spatial adaptive renovation. Each phase starts only after the relevant official boundary, regulatory-plan, ownership, mobility, municipal, fire, and heritage conditions are met [depth:phasing_implementation].

Long-term operation (agent.6) follows "**one monthly merge log, four quarterly actions, one annual merge day**": the monthly log publishes merge/reject/rollback records, human-takeover counts, service interruptions, complaints, and tributary availability; Q1 audits scenario contracts, Q2 walks accessibility and service parity, Q3 runs public events and industrial tests, Q4 reviews model/device renewals; the annual "Merge Day" switches off non-essential AI to verify that ordinary wayfinding, human service, and emergency mechanisms run independently — if tributaries fail, fix the baseline before extending the mainline. The governance toolbox adds four more mechanisms: **Public Receipt** — every Public Merge Review opinion generates an "adopted / partially adopted / not adopted / pending verification" receipt with reasons, responsible person, review node, and appeal channel; **Return Budget** — before a temporary installation is approved, it must register its space/operations/data triad of responsible parties (site restoration, daily duty and scheduling, data boundary and deletion), annual maintenance cost, shutdown method, teardown time window, data-deletion evidence, human-replacement capability, and unresolved appeals; no budget, no pilot; **Failure Retrospective Night** — monthly public review of merge/reject/rollback cases, with the Review Chamber's adjudication archive wall updated in parallel — rejected cases go on the wall too ("rejectable" is not failure; it is routine governance); **Tributary Ledger** — every AI device registers its responsible party, energy use, offline behavior, human replacement, and retirement date, publishing "why it stopped, who was affected, how it was fixed". The annual **Merge Day** is upgraded to "non-merge operation verification + Undo drill": switch off non-essential AI and actually drill service degradation, data deletion, version rollback, equipment teardown, and spatial restoration, then decide to continue / adjust / retire — if tributaries fail, fix the baseline before extending the mainline. Supporting mechanisms include the **Contributor Ladder** ([metric:contribution_ladder_stage_count] stages: visitor → contributor → maintainer → core maintainer, mapping the talent attraction–growth–settlement path) and a **Code of Conduct** (public-space etiquette + AI service compact): governance precedes technology.

## Indicator System, Area Recalculation, and Compliance Matrix

Indicators fall into three groups.

**Spatial-known group** computed directly from current GeoJSON:
- Scope [metric:site_area_sqm]
- Green area [metric:green_space_area_sqm] and ratio [metric:green_ratio]
- Public-space area [metric:public_space_area_sqm] and ratio [metric:public_space_ratio]
- Building capacity footprint [metric:building_footprint_area_sqm]
- Key-area count [metric:key_area_count]
- Use-segregated areas: research [metric:landuse_research_area_sqm], etc.
- Three-phase areas: [metric:phase1_area_sqm]/[metric:phase2_area_sqm]/[metric:phase3_area_sqm]
- Road length [metric:road_network_length_m]
- Demo count [metric:catalyst_building_count]
- Scenario cards [metric:scenario_card_count]
- Personas [metric:persona_count] and phases [metric:phase_count]

**Design-count group** from structured artifacts: work packages [metric:merge_request_count], contributor-ladder stages [metric:contribution_ladder_stage_count], evidence-level gate count [metric:evidence_gate_level_count].

**Statutory-or-operations-unknown group** stays null, including FAR [metric:floor_area_ratio], height, density, setback, approved demolition, total floor area, and tributary parity gap.

Every known value has source_files, formula, confidence, and assumptions; every unknown value has a reason.

Recalculation order ([depth:metrics_recalculation]): verify the source roles of site and key areas → project to EPSG:4548 → check full coverage and overlaps of land use → union green, public, and building areas → length of centerlines → write results back into metrics and HTML data attributes. The boundary area is approximately 11,412,825 square meters with medium confidence, not written as an exact official statistic.

**Official-data recalculation pipeline (implementation commitment)**: all area, ratio, and layer indicators are recomputed by deterministic repository scripts from GeoJSON (see source_files/formula and the recalculation basis in metrics.json). Once the official `SITE_BOUNDARY`/`KEY_AREA` polygons or regulatory conditions are published, the same script chain recomputes land use, buildings, roads, green space, public space, phasing, and all area indicators in one pass and replaces them wholesale — no manual single-file edits; the results ship with the next iteration and re-pass all four gates and review. The organizer's data gap therefore does not become an implementation loss; it becomes an executable update pipeline.

The compliance chain is covered by `compliance_matrix.json` (announcement sections 1.3, 1.4, 1.5 and agent.1–agent.6), `standard_matrix.json` (six professional standards), and `design_depth_matrix.json` (fifteen professional depth items). Reviewers can trace any conclusion in the text back to geometry, metrics, sources, assumptions, self-check, the A3 booklet, the A0 boards, and the offline HTML, avoiding "images only, no verification".

![Core metric recalculation and evidence chain](assets/figures/metrics-evidence.png)

## Public Interest and Inclusion

The proposal states, for six groups, the benefit mechanisms and inclusive measures [source:AGENT-TASKBOOK]:

- **Residents**: everyday services do not depend on digital devices (tributaries not degraded, quiet hours, human fallback); renewal projects provide public receipts and appeal channels; confluence nodes keep ordinary payment and human service desks;
- **Young talent**: the contributor ladder (visitor → contributor → maintainer → core maintainer) and talent services (SCENE-04), open-source workshops (SCENE-14), and university-industry living rooms (SCENE-06) carry the growth path;
- **Enterprises**: testing/validation scenarios (SCENE-02/15) provide controlled experiment space; Merge Applications and the four-type public receipt make the process predictable and outcomes appealable;
- **Universities**: the upstream open-source release → Origin Community conversion chain (agent.2) receives source innovation; co-built open-source classrooms (SCENE-14) support curricula and training;
- **Visitors**: the Jing-Zhang memory route (SCENE-09), 4 pilgrimage landmarks, bilingual signage, and accessible tributaries (SCENE-11) ensure accessibility;
- **Vulnerable groups**: accessible tributaries first, human customer-service fallback, free public space; high-impact services (health/law/public safety) are never decided by models alone.

Inclusion baseline: no AI service may reduce the accessibility of existing public services (the "tributaries are not degraded" principle), subject to maintainer and public review; benefit and impact data enter the annual Merge log for public audit [depth:public_space_quality].

## Risks, Copyright, and Compliance

Six main risks. First, provisional boundaries may cause area and location misreading, so every drawing repeats the provisional label. Second, missing regulatory-plan and building-by-building data may cause implementation misreading, so buildings are capacity tests only and statutory indicators stay unknown. Third, merging may create implicit coercion, so pre-merge diversion, tributary paths, ordinary payment, and human service are provided. Fourth, algorithm errors and device outages may affect safety, so human takeover, stop authority, and offline manual modes remain. Fifth, operating costs may degrade tributaries, so parity in outcomes, time, price, and accessibility is audited continuously. Sixth, display and branding materials may raise copyright issues, so all charts are generated by this proposal and cases are mechanism-only text research. Assumptions and gaps are numbered in assumptions.json (A-BOUNDARY-001, A-CONTROLS-001, A-BUILDING-001, A-MOBILITY-001, A-PARITY-001, A-CASES-001) [depth:risk_missing_data].

This proposal does not claim approval, land ownership, construction scale, or implementation commitments; all spatial actions are "Conceptual Recommendations / reference schemes / material for professional teams to deepen". Privacy follows minimum-necessary, stated-purpose, short-retention, on-site notice, revocability, and human review; high-impact services involving health, law, public safety, and accessibility must not be decided by models alone. Text, GeoJSON, charts, offline HTML, and PDFs are generated by the declared AI agent for this open call under CC-BY-4.0 [source:SOURCE-REGISTRY]; facts and standards remain with their publishers; charts are typeset locally with no remote resources; pages contain no external scripts, remote maps, trackers, forms, or network calls. Details are in `report/copyright_statement.md`.

## References

Core entry citations are [source:OFFICIAL-ANNOUNCEMENT] and [source:AGENT-TASKBOOK]; the machine-readable source index (official announcement, taskbook, site-package, and background research such as open-source governance and AI evaluation) lives in sources.json; prose keeps only claim-adjacent anchors.

Professional standards index (announcement, taskbook, MOHURD urban-design and control-detailed-planning measures, land-use classification, architectural design depth) lives in standard_matrix.json.

Spatial data index (boundary, key areas, land use, buildings, roads, green, public space, scenario constraints, phasing) lives in the geometry/ directory and constraints.geojson; prose keeps only claim-adjacent anchors.

Design-depth index (baseline diagnosis, three-level framework, spatial structure, land use, intensity, character, retain-renovate-demolish, mobility, municipal, blue-green, key areas, renewal projects, phasing, metrics recalculation, risk gaps) lives in design_depth_matrix.json; prose keeps only claim-adjacent anchors.

This proposal also reads `brief/site-package/design_brief.json`, `allowed_design_space.json`, `agent_taskbook.json`, `ranges/planning_limits.json`, `standards/standards.json`, `data/source_registry.json`, `data/processed/agent_fact_pack.md`, and `docs/terminology-glossary.md`. Final deliverables include proposal.md (with the en counterpart), nine GeoJSON layers, metrics/assumptions/sources and three matrices, self-check, five core figures, the A3 booklet, the A0 boards, the offline report, and the offline overview page.
