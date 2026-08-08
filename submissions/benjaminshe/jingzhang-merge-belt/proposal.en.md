---
title: "Jingzhang Merge Belt — One Railway, One Open-Source City"
author_github: "benjaminshe"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Using the Git merge as the organizing metaphor, this proposal translates the confluence spirit of the century-old Jing-Zhang Railway into an open-source urban co-creation mechanism: Upstream (Zhongzhiyuan) releases openly, the Maintainer Community (AI Origin Community) converts research into products, and the Release District (Dazhongsi) distributes scenarios; the Jing-Zhang corridor is the mainline, the Zhongguancun Technology Services Wing is infrastructure, and the Xiaoyue River Scenario Enablement Wing is integration testing. Merging is a choice, not a mandate: tributary paths (manual, offline, account-free) remain fully usable, and the Review Chamber embodies final human judgment."
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "ai-origin-community"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "enterprise-service-copilot"]
---

# Jingzhang Merge Belt — One Railway, One Open-Source City

> Slogan: **Advance in a zigzag; reach far through openness.** The zigzag is how the railway conquered the steepest grade with the least resources; openness is how every tributary contribution flows into the mainline and leaves its name.
> Core judgment: the sophistication of a future city is not measured by how many sensors it deploys, but by **how many tributaries are willing and able to merge into the mainline** — merging must be a choice, not a mandate; it must be reviewable, rejectable, and rollback-able, and **complete tributary paths (manual, offline, account-free) must remain available**.

## Design Basis and Source Inventory

This proposal takes the *Prequalification Announcement for the International Open Call for the Centennial Jing-Zhang AI Innovation Belt Urban Design*, published on 2026-05-09 by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources, as its primary basis [source:OFFICIAL-ANNOUNCEMENT], and the maintainer-registered provisional boundaries, key areas, enums, metrics, and source inventory under `brief/site-package/` as its machine-readable basis [source:SITE-PACKAGE]. Before generation, the agent read `design_brief.json`, `allowed_design_space.json`, `agent_taskbook.json`, `sources.json`, `ranges/planning_limits.json`, `schemas/`, and `data/source_registry.json`, and used `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, and `missing_data_checklist.csv` under `data/processed/` to build task, scope, source-use, and data-gap checklists. Every design judgment is decomposed into traceable sources, recomputable metrics, verifiable layers, and human-reviewable assumptions.

The evidence chain of this section cites [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE], and [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], [standard:MOHURD-ARCH-DESIGN-DEPTH-2016], checked by [depth:existing_conditions_diagnosis] for baseline diagnosis and data gaps.

Source registry boundaries: materials with `usable_for_formal="yes"` in `data/source_registry.json` may support formal evidence; `provisional_only` materials are used for generation, visualization, and intake self-check only. This proposal **does not** use any non-public planning drawings, non-public spatial data, or personal private information.

As of 2026-08-08 the official `SITE_BOUNDARY` and three `KEY_AREA` polygons have not been released (prequalification files require a password; no verifiable redline is publicly available [source:SOURCE-REGISTRY]). This proposal therefore uses the provisional boundaries in `brief/site-package/geometry/provisional_boundaries.geojson`: `geometry/site_boundary.geojson#SITE-001` is marked `official_boundary=false`, `geometry_role="provisional_constraint"`, `boundary_precision="provisional_rough"`; the three key areas carry the same marking. These provisional boundaries are used only for generation, self-check, visualization, and design discussion — they are **not** an official redline, an approval basis, or a precise-area basis. When official polygons are published, land use, buildings, roads, green space, public space, phasing, and all area metrics must be recomputed with the same scripts rather than by editing a single file. The organizer's data gap does not block content scoring.

![Evidence chain and submission package relationships](assets/figures/site-overview.png)

## Three-Level Scope Framework

The three levels follow a "**watershed — mainline — merge node**" progression rather than scaling up one master plan [depth:three_level_scope_framework]:

- **Coordinated Research Area (43.6 km², watershed layer):** answers how the AI industry chain, talent chain, public service chain, and cultural communication chain originate, diverge, and converge in Haidian; defines the three-zone/two-wing merge loop and factor mechanisms.
- **Overall Design Area (11.4 km², mainline layer):** treats the Jing-Zhang heritage corridor as the **Mainline**, and carries the merge relationships into land use, slow mobility, blue-green, renewal, and public service frameworks; east–west tributaries join the mainline here [data:geometry/land_use.geojson#LU-001].
- **Key-Area Detailed Design Area (368.4 ha, merge-node layer):** Zhongzhiyuan = Upstream, AI Origin Community = Maintainers, Dazhongsi = Release, using operable space prototypes to test whether R&D, conversion, exchange, and daily life can coexist [data:geometry/key_areas.geojson#PROV-KEY-001].

All three levels share one baseline: **merging is rejectable**. Any AI service merge must satisfy "reviewable before commit, divertible during operation, rollback-able on exit, and non-degrading for tributaries"; governance is therefore part of the overall structure, not an appendix.

The submitted geometry yields an overall design area of approximately 11,412,825 square meters [metric:site_area_sqm] and 3 key areas [metric:key_area_count]; because the boundary is provisional, confidence is medium and no new statutory conclusion is drawn [depth:metrics_recalculation].

![Three-level scope and spatial working framework](assets/figures/land-use-structure.png)

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

**Three-zone/two-wing merge loop (agent.1/agent.2):** `Upstream (Zhongzhiyuan) open-source release → Maintainers (AI Origin Community) maintain and convert → Release (Dazhongsi) scenario distribution → demand signals (issues) feed back upstream`, forming an iterative loop; the Zhongguancun Technology Services Wing (Infra: capital/IP/global factor allocation) and the Xiaoyue River Scenario Enablement Wing (Integration: scenario integration-test environment) keep the loop running. The five functions (full-stack independent AI innovation system, world-class AI innovation ecosystem, AI-enabled scenario empowerment paradigm, intelligent vibrant AI city, and global AI governance discourse) land on the upstream, maintainer, release, tributary, and adjudication stages respectively [source:AGENT-TASKBOOK].

**Six ecosystem cases (mechanisms only, not copied forms):** [source:LINUX-FOUNDATION] (open-source governance and long-term maintenance), [source:APACHE-FOUNDATION] (community self-governance and contributor ladders), [source:HUGGINGFACE] (model commons and governance), [source:MOZILLA] (public digital infrastructure), [source:SINGAPORE-AI-VERIFY] (repeatable pre-deployment evaluation), [source:PUBLIC-PARTICIPATION-CASES] (conflict negotiation and adjudication in urban renewal). These are background research only; the proposal does not claim these institutions are adopted, and limitations are recorded as A-CASES-001 in assumptions.json.

The future city form is not a dense-sensor landscape but "**mainline never fails, tributaries are never forced**": the ground plane prioritizes continuous walking, cycling, shade, and human service; the optional intelligence layer enters through Public Merge Review; the operations layer records model versions, service interruptions, human takeovers, rejections, and rollbacks. Industry performance is judged on three public outcomes: merge throughput (how contributions enter the mainline), conflict resolution rate (how disagreements are adjudicated), and tributary availability (whether those who do not merge receive equal service); the latter two remain unknown until operating samples exist [depth:risk_missing_data].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Depth Urban Design

The overall structure treats the narrow Jing-Zhang corridor as a **merge mainline**: north–south through-connection is the mainline; east–west blocks, green corridors, and transit stations are tributaries that join at six "merge nodes" (corresponding to scenario and public-service anchors). Land-use zones are partitioned directly within the provisional site polygon, fully covering it without gaps or overlaps [data:geometry/land_use.geojson#LU-001]; codes come from the permitted set of the site package [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], governed by [depth:land_use_layout].

The building layer uses "**reversible capacity testing**" rather than baseline conclusions: capacity blocks only test how public space, slow mobility, and mixed use support each other [data:geometry/buildings.geojson#BLDG-001], with `intervention_status=capacity_test_only` and `demolition_decision=false`; the combined footprint is [metric:building_footprint_area_sqm]. FAR, building height, building density, and setbacks remain unknown, recorded by [depth:development_intensity_controls] and [depth:height_massing_character] as "depth responded, conclusions pending regulatory data", responding to [standard:MOHURD-URBAN-DESIGN-MEASURES] and [standard:MOHURD-CONTROL-DETAILED-PLANNING].

The renewal method is "**small units, reversible, public first then construction**": first test merge nodes with ground markings, wayfinding, tree rows, and movable human-service counters; then advance ground-floor publicness, slow-mobility gaps, and service facilities in the three key areas; only then decide building implementation based on official regulatory, mobility, municipal, fire, heritage, and ownership conditions. Each renewal unit is a "merge request": reviewed, rejectable, and rollback-able [depth:retain_renovate_demolish].

![Land-use zoning, functional structure, and reversible capacity tests](assets/figures/land-use-structure.png)

## Key-Area Detailed Design

**Zhongzhiyuan = Upstream (source of full-stack validation):** continuous shade and a sensor-free tributary path along the Qing River; inland, model safety evaluation, standards workshops, compute services, and an "Upstream Release Hall". Industrial testing is not a closed demo: each test publishes its time window, equipment scope, exit route, and stop conditions; tributaries pass through continuously, and a merge-choice threshold appears before entering the upstream [data:geometry/key_areas.geojson#PROV-KEY-001].

**AI Origin Community = Maintainers (place of near-campus conversion):** campus–park–community are stitched together with around-the-clock walking and cycling; the ground floor organizes open-source release, conversion, IP, and enterprise services; the "Quiet Commons Hall" offers paper reservations, human inquiry, and account-free service. All open-source outputs are confirmed by the publisher, testing whether technology can aid collaboration without turning participation into "install an app" [data:geometry/key_areas.geojson#PROV-KEY-002].

**Dazhongsi = Release (city-level intelligent product living room):** around transit integration, four-quadrant walking continuity, enterprise display, content consumption, and international exchange, with public roadshows and permanent exhibitions while retaining clearly non-digital wayfinding, human ticketing, and ordinary consumption channels; the "First-Merge Stone" and "Merge Monument" sit in front of the station, and any personalized explanation is optional [data:geometry/key_areas.geojson#PROV-KEY-003].

The three prototypes are checked uniformly by [depth:three_key_area_detailed_design], each answering function, building interface, mobility and slow access, blue-green public space, AI scenarios, human takeover, implementation dependencies, and exit routes, connected via the mainline [data:geometry/roads.geojson#ROAD-001] and east–west public tributaries; all drawings carry provisional labels to prevent rectangular temporary ranges from being read as blocks or redlines.

![Three spatial prototypes: Zhongzhiyuan, Origin Community, Dazhongsi](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Talent Profiles, and AI-Enabled Scenarios

Six persona profiles [metric:persona_count] describe no specific individuals: upstream contributors (R&D/algorithms) need bookable testing and quiet focus; AI founders need low-cost compliance, compute, and a first city customer; maintainers (university faculty/students) need cross-campus collaboration, release, and daily slow mobility; tributary residents need low-disturbance leisure, community services, and clear complaint channels; frontline operators need explainable tickets, offline manual operation, and clear accountability; international visitors need multilingual wayfinding, ordinary ticketing, and human service. Personas serve spatial needs only, not behavior tracking or commercial recommendation.

Twelve scenario cards [metric:scenario_card_count] are registered in [data:geometry/constraints.geojson#SCENE-01] through SCENE-12:

| # | Scenario | Official track | Type |
| --- | --- | --- | --- |
| 01 | Integration Yard (integration-test environment) | — | ★ Industry test/validation |
| 02 | Low-speed robot-delivery shared-road test | `robot-delivery-low-speed` | ★ Industry test/validation |
| 03 | Upstream Evaluation Yard (open model/safety/standard evaluation) | — | ★ Industry test/validation |
| 04 | Public Merge Review Station (citizens submit merge requests, human review) | — | Public service |
| 05 | Review Chamber open day (multi-party negotiation and arbitration drill) | — | Public service |
| 06 | AI-enabled cultural guide (immersive Jing-Zhang memory tour) | `ai-cultural-guide` | Urban experience |
| 07 | AI-enabled traffic and walkability assessment (gap diagnosis) | `ai-traffic-walkability` | Urban experience |
| 08 | Enterprise service copilot | `enterprise-service-copilot` | Industrial service |
| 09 | Quiet Commons Hall (account-free, human-counter fallback) | — | Tributary guarantee |
| 10 | Night quiet-window monitoring | — | Urban operation |
| 11 | Accessibility routing (tributary-first) | — | Tributary guarantee |
| 12 | Annual Merge Day drill (city-wide "non-merge" operation test) | — | Urban operation |

Each card shares a "three-part proof": **Before** — before cameras, QR scans, or accounts, ground markings state data type, purpose, duration, and the ordinary path; **During** — the running system, model/operator, human-counter location, and emergency stop are visible; **After** — exit, deletion, correction, or recovery receipts are provided. If the tributary path is clearly worse in wait time, price, or accessibility than the mainline, it does not count as "mergeable"; the `tributary_parity_index` measures the normalized service-parity gap during operation and remains unknown for lack of operating samples. Scenario depth and risks are constrained by [depth:municipal_new_infrastructure] and [depth:risk_missing_data].

## Land Use, Building Scale, and Demolish–Renovate–Retain

Land use forms a mixed sequence of research, culture, education, residential, community service, commercial, park/green, and reserved space, with [metric:land_use_zone_count] conceptual zones [data:geometry/land_use.geojson#LU-001]; every zone uses a `land_use_code` rather than self-invented categories that bypass statutory classification interfaces [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The current land use is a conceptual partition and does not change existing ownership or use; formal deepening must overlay official parcels, current use, and regulatory-plan maps, then propose block-by-block "retain, minor renewal, functional conversion, comprehensive renewal, or reserve" suggestions with recorded basis and approval paths.

Demolish–renovate–retain applies a "**four-gate merge-request**" process: gate 1 ownership and baseline survey; gate 2 structural, fire, energy, and heritage-value assessment; gate 3 public interest and whole-life carbon comparison; gate 4 statutory procedure and Public Merge Review. No block enters a demolition list without all four gates [depth:retain_renovate_demolish]. Therefore [data:geometry/buildings.geojson#BLDG-001] expresses reversible capacity blocks for testing block openness, not approved construction scale; "completion" of the DRR item means "method and evidence gates are defined", not "block-by-block decisions are made".

Character control emphasizes "**railway scale, quiet interfaces, legible technology**": ground floors prioritize continuous eaves, openable public rooms, and human service; sensor states are expressed with low-glare, understandable markers; masses facing the heritage park and green corridors remain segmented and transparent. Specific heights, setback rates, spacing, and skyline await official regulatory planning, view corridors, heritage, and sunlight analysis [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

## Mobility, Rail, Municipal, and Public Service Facilities

The mobility system is organized as **mainline–tributary**: the mainline provides a slow-mobility-priority north–south continuous corridor with transit integration, with a network concept length of [metric:road_network_length_m]; tributaries provide ordinary paths into each block; six merge nodes are placed before data collection, not after users enter a sensing zone [data:geometry/roads.geojson#ROAD-001]. Transit stations and key intersections implement a continuous "arrival–crossing–parking–entrance–human counter" chain; bicycle parking is close to entrances without occupying tactile paving; low-speed robots are time-limited, speed-limited, pedestrian-first, and staffed with on-site stoppers. Because complete passenger flow, entrances/exits, parking, and network models are missing, this proposal writes no road-redline widths, parking requirements, or capacity values [depth:traffic_rail_slow_parking].

Municipal and new infrastructure follows the "**safe when disconnected**" principle: lighting, stormwater, energy, charging, edge computing, and facility inspection all require local manual modes, visible failures, data minimization, and clear operators; public services provide human counters, telephone/paper channels, ordinary payment, and accessibility alternatives. Community health scenarios only navigate and refer, not auto-diagnose; legal/IP scenarios only assist with materials; public-safety scenarios only aggregate information and do not make disposition decisions automatically. Facilities are located at [data:geometry/constraints.geojson#SCENE-06] and [data:geometry/constraints.geojson#SCENE-10], deepened under [depth:municipal_new_infrastructure].

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

Renewal forms [metric:merge_request_count] "merge-request" work packages: MR-01 mainline ground markings and ordinary wayfinding; MR-02 six merge nodes and human-service counters; MR-03 ground-floor public-interface micro-renewal in the three key areas; MR-04 Qing River–Jing-Zhang continuous blue-green repair; MR-05 transit-station walking, cycling, and accessibility gap improvement; MR-06 three industry-validation scenarios (Integration Yard / delivery shared road / Upstream evaluation); MR-07 public registry pages and on-site notices for algorithms/devices/services; MR-08 Annual Merge Day (city-wide non-merge operation test). Locations map to [data:geometry/phasing.geojson#PHASE-001], checked by [depth:renewal_project_list].

The three-phase strategy [metric:phase_count] is not a fixed construction commitment: the near term runs reversible public facilities, tributary-baseline census, paper/human channels, and two-route markings; the mid term advances public interfaces, mobility gaps, stormwater, and industrial services across the three key areas, with Public Merge Review deciding which intelligence to keep; the long term forms annual operations, model/device updates, parity audits, and spatial adaptive renovation. Each phase starts only after the relevant official boundary, regulatory-plan, ownership, mobility, municipal, fire, and heritage conditions are met [depth:phasing_implementation].

Long-term operation (agent.6) follows "**one monthly merge log, four quarterly actions, one annual merge day**": the monthly log publishes merge/reject/rollback records, human-takeover counts, service interruptions, complaints, and tributary availability; Q1 audits scenario contracts, Q2 walks accessibility and service parity, Q3 runs public events and industrial tests, Q4 reviews model/device renewals; the annual "Merge Day" switches off non-essential AI to verify that ordinary wayfinding, human service, and emergency mechanisms run independently — if tributaries fail, fix the baseline before extending the mainline. Supporting mechanisms include the **Contributor Ladder** ([metric:contribution_ladder_stage_count] stages: visitor → contributor → maintainer → core maintainer, mapping the talent attraction–growth–settlement path) and a **Code of Conduct** (public-space etiquette + AI service compact): governance precedes technology.

## Indicator System, Area Recalculation, and Compliance Matrix

Indicators fall into three groups. **Spatial-known group** computed directly from current GeoJSON: scope [metric:site_area_sqm], green [metric:green_ratio], public space [metric:public_space_ratio], building capacity footprint [metric:building_footprint_area_sqm], key-area count [metric:key_area_count], plus data-layer extensions for zones, road length, scenario cards [metric:scenario_card_count], personas [metric:persona_count], landmarks, and phases [metric:phase_count]; **design-count group** from structured artifacts; **statutory-or-operations-unknown group** stays null, including FAR [metric:floor_area_ratio], height, density, setback, approved demolition, total floor area, and tributary parity gap. Every known value has source_files, formula, confidence, and assumptions; every unknown value has a reason.

Recalculation order ([depth:metrics_recalculation]): verify the source roles of site and key areas → project to EPSG:4548 → check full coverage and overlaps of land use → union green, public, and building areas → length of centerlines → write results back into metrics and HTML data attributes. The boundary area is approximately 11,412,825 square meters with medium confidence, not written as an exact official statistic.

The compliance chain is covered by `compliance_matrix.json` (announcement sections 1.3, 1.4, 1.5 and agent.1–agent.6), `standard_matrix.json` (six professional standards), and `design_depth_matrix.json` (fifteen professional depth items). Reviewers can trace any conclusion in the text back to geometry, metrics, sources, assumptions, self-check, the A3 booklet, the A0 boards, and the offline HTML, avoiding "images only, no verification".

![Core metric recalculation and evidence chain](assets/figures/metrics-evidence.png)

## Risks, Copyright, and Compliance

Six main risks. First, provisional boundaries may cause area and location misreading, so every drawing repeats the provisional label. Second, missing regulatory-plan and building-by-building data may cause implementation misreading, so buildings are capacity tests only and statutory indicators stay unknown. Third, merging may create implicit coercion, so pre-merge diversion, tributary paths, ordinary payment, and human service are provided. Fourth, algorithm errors and device outages may affect safety, so human takeover, stop authority, and offline manual modes remain. Fifth, operating costs may degrade tributaries, so parity in outcomes, time, price, and accessibility is audited continuously. Sixth, display and branding materials may raise copyright issues, so all charts are generated by this proposal and cases are mechanism-only text research. Assumptions and gaps are numbered in assumptions.json (A-BOUNDARY-001, A-CONTROLS-001, A-BUILDING-001, A-MOBILITY-001, A-PARITY-001, A-CASES-001) [depth:risk_missing_data].

This proposal does not claim approval, land ownership, construction scale, or implementation commitments; all spatial actions are "Conceptual Recommendations / reference schemes / material for professional teams to deepen". Privacy follows minimum-necessary, stated-purpose, short-retention, on-site notice, revocability, and human review; high-impact services involving health, law, public safety, and accessibility must not be decided by models alone. Text, GeoJSON, charts, offline HTML, and PDFs are generated by the declared AI agent for this open call under CC-BY-4.0 [source:SOURCE-REGISTRY]; facts and standards remain with their publishers; charts are typeset locally with no remote resources; pages contain no external scripts, remote maps, trackers, forms, or network calls. Details are in `report/copyright_statement.md`.

## References

Machine-readable source index: [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE], [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:LINUX-FOUNDATION], [source:APACHE-FOUNDATION], [source:HUGGINGFACE], [source:MOZILLA], [source:SINGAPORE-AI-VERIFY], [source:PUBLIC-PARTICIPATION-CASES].

Professional standards index: [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

Spatial data index: [data:geometry/site_boundary.geojson#SITE-001], [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/land_use.geojson#LU-001], [data:geometry/buildings.geojson#BLDG-001], [data:geometry/roads.geojson#ROAD-001], [data:geometry/green_space.geojson#GREEN-001], [data:geometry/public_space.geojson#PUBLIC-001], [data:geometry/constraints.geojson#SCENE-01], [data:geometry/phasing.geojson#PHASE-001].

Design depth index: [depth:existing_conditions_diagnosis], [depth:three_level_scope_framework], [depth:overall_spatial_structure], [depth:land_use_layout], [depth:development_intensity_controls], [depth:height_massing_character], [depth:retain_renovate_demolish], [depth:traffic_rail_slow_parking], [depth:municipal_new_infrastructure], [depth:blue_green_public_space], [depth:three_key_area_detailed_design], [depth:renewal_project_list], [depth:phasing_implementation], [depth:metrics_recalculation], [depth:risk_missing_data].

This proposal also reads `brief/site-package/design_brief.json`, `allowed_design_space.json`, `agent_taskbook.json`, `ranges/planning_limits.json`, `standards/standards.json`, `data/source_registry.json`, `data/processed/agent_fact_pack.md`, and `docs/terminology-glossary.md`. Final deliverables include proposal.md (with the en counterpart), nine GeoJSON layers, metrics/assumptions/sources and three matrices, self-check, five core figures, the A3 booklet, the A0 boards, the offline report, and the offline overview page.
