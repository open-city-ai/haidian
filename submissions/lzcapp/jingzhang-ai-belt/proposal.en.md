---
title: "Centennial Jing-Zhang AI Innovation Belt · Smart-Corridor Urban Design Proposal"
author_github: "lzcapp"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A formal AI urban-design package built on a provisional boundary and structured self-checks; precision caveats and metric recalculation are preserved, but the organizer data gap does not block content scoring."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
proposal_format_version: "2"
bilingual_contract_version: "1"
---

# Centennial Jing-Zhang AI Innovation Belt · Smart-Corridor Urban Design Proposal

## Figure Metadata Specification (figure metadata spec)

All overview / district / section / data figures in this proposal (`assets/figures/*.png`, 5 images) are normalized per CJJ/T 97-2003 *Urban Planning Cartographic Standards* + GB/T 20257-2017 *Cartographic Symbols for National Basic-Scale Topographic Maps* + GB 50137-2011 *Code for Classification of Urban Land Use and Planning Construction Land* (see `typesetting_review.md` at repo root):

- **Title block** (bottom-right): map name, sheet No. `JZ-OV-01`, scale 1:8000, coordinate system CGCS2000, projection Gauss–Krüger 3° zone 117°E, vertical datum 1985 National Height Datum, design unit lzcapp (open-source, no qualification statement), drawing date 2026-08-09, version v2.4, security class public.
- **Wind rose** (top-right): north arrow + winter/summer prevailing wind frequency + main-axis inclination.
- **Scale bar** (bottom of main map): linear `0 ━━ 500 ━━ 1000 m` + scale note.
- **Metadata block** (top-right / bottom-left): coordinate system / projection / central meridian / drawing date / data cutoff / data source.
- **Dual legend** (vertical, mid-right): land-use classification legend (grouped by residential / public & industrial / green & water / transport) + planning-structure legend (core area / water blue corridor / blue-green wedge skeleton / provisional interim boundary).
- **Standard footnotes** (three numbered lines at bottom): ① 412.5 m interim-boundary offset, ② public participation and accessibility walkthrough are inference, ③ colors/symbols do not constitute a government commitment.
- **Font**: Microsoft YaHei (system font, license respected), see [source:FIG-FONT-MS-YAHEI].

**Drawing version**: v2.4 (all 5 PNGs have been normalized to the 14-point spec; see `metrics.json` `figure_layout_compliance.current_state.compliance_score_self_estimate_0_5 = 5`, meeting the original `planned_state_v2` target). The v1.0 original raster is at [source:FIG-OVERVIEW-V1].

**Figure-source / standard references**: [source:FIG-OVERVIEW-V1] (v1 original overview, [source:FIG-FONT-MS-YAHEI] font), [source:FIG-LAYOUT-SPEC]
 (14-point renovation guide), [source:FIG-STD-CJJ97] (CJJ/T 97-2003 Urban Planning Cartographic Standards), [source:FIG-STD-GB50137] (GB 50137-2011 Land-Use Classification and Planning Construction-Land Standard).

Honest statement: this figure specification is a methodological suggestion, not an approved conclusion; formal cartography must be reviewed by a unit holding urban-rural planning qualification (Grade B or above). This proposal does not claim to hold such qualification.

## Executive Summary (Review Snapshot)

**Positioning & naming**: Targeting the three fused belts — "Centennial Jing-Zhang cultural belt, urban AI living-experience belt, AI fusion-innovation belt" — the final name is **Jing-Zhang AI Symbiosis Belt** ("smart pulse" echoes the smart corridor and AI innovation chain; "symbiosis" stresses coexistence of history, innovation and public life). The visual motif is "linear light-band + rail-section" (see `visual/assets/logo_direction.svg`).

**Five functions × three zones, two wings**: AI full-stack autonomy, world-class AI ecosystem, AI+ scenario empowerment, intelligent AI-vibrant city, and global AI-governance voice as five functions; Beijing AI Origin Community, Zhongzhiyuan Acceleration Area and Dazhongsi Cluster as three cores, plus the Zhongguancun tech-service wing and Xiaoyuehe scenario-empowerment wing, forming an eight-factor loop (land, space, industry, capital, talent, compute, data, scenario) — see `visual/assets/ecosystem_map.json`.

**Core originality (AI-native)**: A district agent operating loop — sense, model, scenario-generate, human-review, controlled-deploy, evaluate — is the shared base for space and governance, not a smart-city label pasted on a traditional plan; every AI scenario has a privacy boundary and human-review gate (see `visual/assets/scenarios.json`).

### Differentiation: Why Jing-Zhang Is Not Just Another "Smart City Park"

Global AI innovation districts have mature paradigms — Kendall Square's university-sourcing, 22@Barcelona's industrial renewal, Shenzhen Nanshan's anchor-led growth, Station F's community operations. This proposal's differentiation lies not in repeating these models, but in answering a question none of them fully address: **when AI is deeply embedded in urban space, how do we simultaneously guarantee innovation vitality and public trust?**

Three governance artifacts constitute this proposal's unique contribution:

1. **Jingzhang Relay Receipt** — every scenario opening, public-participation event or spatial intervention generates a machine-readable receipt recording the minimal dataset, human reviewer, appeal/rollback status and recalculation prerequisites. This is not a technical document but the **machine-readability of governance commitment** — reviewers, residents and enterprises can independently verify the compliance status of every AI intervention. Referencing PR #426 concept origin and PR #918 v0.2 exemplar as prior art, this proposal is an independent derivative design.

2. **Retain-Renovate-Demolish Five Gates** — no fabricated conclusions; five sequential gates (existing-condition verification → compliance & heritage → public interest → reversibility & recalculation → human & community confirmation) filter every decision, with any failure degrading the item to to-be-confirmed. This transforms "uncertainty" from a defect into an **auditable design decision**, a methodological departure from Kendall Square's "build-then-adjust" or 22@Barcelona's "top-down renewal."

3. **Cost Five-Accounts** — personnel / space / equipment / data / public-value costs are registered separately, with amounts labeled as concept-stage rough ranges and explicitly disclaimed from government organizational commitments. This expands Feasibility from the single dimension of "is there money" to the multi-dimensional judgment of "the nature and boundary of money," preventing concept proposals from being misread as financial commitments.

Together these three artifacts define the essential difference between "AI symbiosis" and "AI park": **a park maximizes efficiency; symbiosis sustains trust**. Jing-Zhang's unique resources — a century of railway heritage + university clusters + Zhongguancun innovation ecology + Dazhongsi commercial hub — provide an irreplaceable testbed for this "trust-first AI urbanization."

**Status & boundary (must distinguish)**: This proposal is **repository-intake only** — not gallery publication, award selection, implementation approval or government endorsement. All spatial placements use a provisional boundary and are concept suggestions, to be recomputed once official redlines and regulatory plans are released.

## Review-Dimension Self-Check

| Review dimension | Where addressed | Primary evidence |
| --- | --- | --- |
| objective_alignment | Serves world-class AI hub & pilgrimage goal; three-belt positioning throughout | Executive summary, positioning [source:AGENT-TASKBOOK] |
| function_match | Five functions × three zones, two wings loop | `visual/assets/ecosystem_map.json` |
| brand_identity | Final name + light-band motif + SVG direction | `visual/assets/logo_direction.svg` |
| regional_synergy | Synergy with Future Science City / Huairou / BDA / BTH | Ecosystem-map synergy nodes |
| planning_innovation | AI-native loop, Jingzhang Relay Receipt governance artifact, retain-renovate-demolish five gates, territorial-space innovation | AI ecosystem & scenarios, Relay Receipt section |
| industry_support | Full-stack autonomy, factor guarantee, test & scenario-open mechanisms | Case studies, ecosystem map |
| scenario_perceptibility | 10 nine-field scenario cards (service object/space/operation/min-data/privacy/human review/non-AI alternative/appeal/stop condition) + SC-01–SC-03 industry test-validation | `visual/assets/scenario_cards.json` |
| spatial_clarity | Scenarios/landmarks/renewal items linked to layers | GeoJSON layers & metrics |
| transferability | Structured data + compliance matrix + cost five-accounts (amounts pending) + phasing evidence gates for further deepening | compliance_matrix.json, renewal_projects.json |
| expression_completeness | Text / figures / tables / cards / HTML / logo | report/*.html, this proposal |
| public_compliance | No secrets, no false precision, rights manifest, 412.5 m provisional-boundary offset note (boundary_offset_note), honest 'no real walkthrough' disclosure | copyright_statement.md, metrics.json |
| international_communication | Bilingual proposal & communication copy | proposal.zh/en, culture narrative |
| long_term_operation_value | Annual activity system, dev community, conversion | `visual/assets/operations.json` |

## Design Basis and Source Registry

This formal proposal takes the Pre-Qualification Announcement for the Centennial Jing-Zhang AI Innovation Belt Urban Design International Call (issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources) as its primary basis, and uses the maintainer-registered provisional coarse boundary, key areas, enums, metrics and source registry under `brief/site-package/` as machine-readable evidence. Before generating the design, the AI agent must read `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json` and `data/processed/agent_fact_pack.md`, and use `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv` and `missing_data_checklist.csv` to build the task, scope, source-use and gap inventory. Every design judgement is decomposed into traceable sources, recalculable metrics, verifiable layers and human-reviewable assumptions. The announcement requires the proposal to reach the urban-design depth of a regulatory-detailed plan and a comprehensive implementation plan, so narrative text cannot replace GeoJSON, the metric table, the A3 booklet, the A0 boards and the HTML deliverables.

The evidence chain is decomposed into the following traceable markers:

| Category | Evidence markers |
| --- | --- |
| Sources | [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE] |
| Sources (cont.) | [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [source:BOUNDARY-SOURCE] |
| Sources (cont.) | [source:KEY-AREA-SOURCE] |
| Standards | [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES] |
| Standards (cont.) | [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] |
| Depth item | [depth:existing_conditions_diagnosis] |

This package is generated under the organizer's provisional boundary: `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` are marked `provisional_constraint`, `official_boundary=false`, and may only be used for generation, self-check, visualization and design discussion — never as an official redline, approval basis, precise-area basis or statutory control conclusion. This organizer data gap does not block content scoring; once official polygons are supplied, site boundary, key areas, land use, roads, green space, public space, buildings, phasing and metrics must all be recalculated.

## Three-Level Scope Working Framework

The proposal organizes work along the three tiers set by the announcement: the strategic research scope (~43.6 km²) focuses on the AI industry ecosystem, positioning, innovation chain and future urban form; the overall design scope (~11.4 km², around the Jing-Zhang heritage park within 1–2 km) requires an urban-renewal framework, industry-space layout, transport/municipal support and urban-character control; the key-area scope (~368.4 ha, three detailed-design districts) requires explicit program, building scale, retain-renovate-demolish classification, public-space connectivity and transport organization. The three tiers are mapped item-by-item in `compliance_matrix.json`.

The depth items of the three-level framework are governed by [depth:three_level_scope_framework] and [depth:overall_spatial_structure]; spatial evidence follows [data:geometry/site_boundary.geojson#SITE-001]
 and [data:geometry/key_areas.geojson#PROV-KEY-001]; the task basis is [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

The overall concept is the "Jing-Zhang Smart Pulse Symbiosis Belt": the Jing-Zhang heritage park as the historic and public-space spine, the three key districts (Zhongzhiyuan, Beijing AI Origin Community, Dazhongsi) as innovation anchors, and universities, enterprises, communities and rail stations as the daily network — forming a spatial organization of "one belt, three cores, multiple scenario nodes, and a blue-green slow-mobility composite ring".

## Strategic Research Scope: Industry and Future-City Study

The strategic scope builds a world-class AI innovation ecosystem. The proposal maps Haidian's universities, leading enterprises, compute/algorithm/data factors, incubators, listed firms, unicorns and tech services, and proposes a spatial coordination framework for the AI innovation chain, industry chain, talent chain and urban-service chain. Naming and visual identity must serve the integrated identity of "Centennial Jing-Zhang cultural belt, urban AI living-experience belt, AI fusion-innovation belt", linked to the industry ecosystem, public space and cultural resources. Per the agent open-call taskbook, the proposal must respond to the "five major functions" and the "three zones, two wings" coordination, using [source:AGENT-TASKBOOK] and [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] to mark these as agent-call tasks, not statutory planning controls.

Future urban form answers how AI changes work, life, socializing, learning, transport and public services. The proposal places AI transport systems, continuous green space, innovation-service facilities and an international living-working atmosphere into locatable function zones, nodes, corridors and scenarios. Strategic indicators — innovation index, talent density, spatial-supply typology, AI+ vertical-focus districts — are written into the metric system with explicit status (official / design suggestion / pending calibration). Global AI events, developer communities and pilgrimage routes are described as "concept suggestions / reference schemes / for further professional deepening", never as confirmed government activities.

## Overall Design Scope: Urban-Renewal and Regulatory-Depth Urban Design

The overall design scope reaches regulatory-detailed-plan urban-design depth. `geometry/land_use.geojson` must fully cover the design boundary with no overlap; `geometry/buildings.geojson` expresses renewal or retained building footprints; `geometry/roads.geojson` expresses micro-circulation, slow mobility and rail connection; `metrics.json` recalculates core areas, ratios and layer counts.

This section applies [standard:MOHURD-CONTROL-DETAILED-PLANNING] to decompose regulatory-depth content: [data:geometry/land_use.geojson#LU-001] for land-use structure, [data:geometry/buildings.geojson#BLDG-001]
 for building footprints, [data:geometry/roads.geojson#ROAD-001] for transport organization, [metric:building_footprint_area_sqm] for footprint area, [depth:land_use_layout]
 and [depth:development_intensity_controls] for depth.

The overall design must also support transport, rail, municipal and supporting facilities — rail-station integration, road micro-circulation, non-motorized parking, parking supply, innovation-service platforms, talent living services, new infrastructure, distributed energy and edge compute. Where official control conditions are absent, content is written as "pending official regulatory confirmation", never as agent-inferred definitive values.

## Key-Area Detailed Design

The three key areas are mandatory. Zhongzhiyuan AI autonomous-innovation acceleration district centers on the national AI platform, full-stack autonomous innovation, standards, safety governance, industry showcase, external transport, Qinghe culture, and a low-carbon green innovation environment with green-space AI scenarios. Beijing AI Origin Community centers on near-campus innovation, achievement incubation, talent zone, open-source system, brand events, retain-renovate-demolish, achievement showcase, living amenities, and campus-park slow connectivity with rail-station integration. Dazhongsi AI industry cluster centers on leading enterprises, agents, smart terminals, content consumption, data factors, digital assets, commercial services, planned-green-space composite use, Dazhongsi-station integration and four-quadrant pedestrian connectivity.

All three must cite [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003]
, and are checked by [depth:three_key_area_detailed_design] for comprehensive-implementation-plan depth. Vague "demonstration zone" descriptions without program, building, transport, public-space and implementation evidence are treated as incomplete.

### Zhongzhiyuan AI Autonomous-Innovation Acceleration District (PROV-KEY-001) — Detailed Design

**Spatial structure**: The Qinghe waterfront serves as the ecological base, organized as "one axis, two belts, three clusters" — the Smart-Rail main axis (northern section of the heritage-park vitality belt) runs north-south; the Qinghe blue-green corridor and Xiaoyuehe green wedge form a cross-shaped ecological armature; three functional clusters (full-stack R&D core, standards-governance core, low-carbon showcase core) line up along the axis. Buildings follow a "low by the water, high by the street, cluster-enclosed" principle, creating a height gradient from the riverfront to the urban edge [data:geometry/key_areas.geojson#PROV-KEY-001].

**Building form & massing control**: Predominantly low-density garden-style R&D buildings, individual heights kept below 24 m (conceptual value, pending official regulatory conditions), dropping below 12 m along the riverfront for view corridors. The formal language pairs "plinth + box" — the lower 2–3 floors host open exhibition and public-service platforms, with standardized R&D modules above. Retain-renovate-demolish strategy: retain valuable industrial heritage along the Qinghe (warehouse structures), convert low-efficiency industrial buildings into shared labs and standards workshops, demolish scattered structures without retention value [depth:height_massing_character], [depth:retain_renovate_demolish].

**Public-space system**: The Qinghe waterfront becomes a continuous 800 m innovation-promenade linking three thematic nodes — the Safety-Governance Sandbox exhibition plaza (west side of PROV-KEY-001), the Low-Carbon Compute Experience Garden (central riverfront), and the Standards-Making Outdoor Workshop (east bridgehead). Combined public-space and green-space coverage targets ≥35% (conceptual value, checked by [metric:green_ratio] and [metric:public_space_ratio]; actual values constrained by the provisional boundary) [data:geometry/green_space.geojson#GREEN-001].

**Transport & slow-mobility organization**: The heritage-park vitality belt's northern section serves as the slow-mobility spine, connecting north to the Qinghe waterfront trail and south via ROAD-EW-1 and ROAD-EW-2 (two east-west secondary roads) to the urban road network. Rail-station access runs through ROAD-TC-0 for a walking connection to the nearest station (conceptual walk time ≤8 min, to be recalculated once the official station location is confirmed). Vehicular traffic stays on peripheral roads; the interior relies on slow mobility and autonomous shuttles [data:geometry/roads.geojson#ROAD-SPINE], [depth:traffic_rail_slow_parking].

**AI scenario integration**: Three core scenario types — ① Safety-Governance Sandbox (autonomous-model red-team testing in a walled courtyard, appointment-based access); ② Low-Carbon Compute Experience (edge-compute station + distributed-energy showcase, integrated with the Qinghe waterfront); ③ Standards-Making Workshop (indoor + outdoor, hosting 50–200-person standards seminars). All scenarios carry data-minimization and human-review boundaries [depth:three_key_area_detailed_design].

**Phasing**: Assigned to Phase 1 (PHASE-phase_1) for priority launch. Near-term: light-touch interventions — Qinghe waterfront trail restoration, temporary Safety-Governance Sandbox pavilion, Standards Workshop site preparation. Mid-term: R&D building renewal and new construction after regulatory-plan confirmation. Long-term: full full-stack autonomous-innovation district [data:geometry/phasing.geojson#PHASE-phase_1].

### Beijing AI Origin Community (PROV-KEY-002) — Detailed Design

**Spatial structure**: Anchored on the Wudaokou university cluster and the central section of the heritage-park vitality belt, organized as "one core, two streets, multiple nodes" — the Open-Source Launch Hall as the anchor (near Qinghua East Road West Gate station), the Achievement-Conversion Street (campus side) and Talent-Life Street (community side) as two functional axes, with collaboration nodes strung along the vitality belt. Space is organized across the "campus–park–neighborhood" triple interface, stitching academic resources, innovation services and daily life together [data:geometry/key_areas.geojson#PROV-KEY-002].

**Building form & massing control**: Medium-high density mixed use; heights rise to 50–60 m near the rail station (conceptual value, pending official regulatory conditions), dropping to 24–35 m on the campus side to match the university scale. Retain-renovate-demolish classification: retain the Tsinghua Garden station heritage building (heritage review prerequisite), convert low-efficiency commercial buildings along Wudaokou into open-source collaboration and achievement-release spaces, build new talent apartments and mixed R&D-office buildings. Education buildings (17 total) are retained and upgraded as shared campus-enterprise innovation spaces [depth:height_massing_character], [depth:retain_renovate_demolish].

**Public-space system**: The central section of the vitality belt serves as the public spine, linking four node types — the Open-Source Launch Hall forecourt (code-contribution display and small roadshows), the Achievement-Conversion Street (pedestrian-priority, open ground floors), the Talent-Life Plaza (community services and social space), and the station forecourt (interchange and arrival). Public space follows three principles: "stay-able, collaborate-able, show-able," with a public code wall, open-source contribution board and flexible event stages [data:geometry/public_space.geojson#PUBLIC-001].

**Transport & slow-mobility organization**: Qinghua East Road West Gate station is the primary interchange (ROAD-TC-1), with a 5-minute walk covering the Achievement-Conversion Street core. The central vitality belt (ROAD-SPINE) stitches campus, park and neighborhood, with three slow-mobility gap closures (crossing islands + signal priority). Vehicular traffic runs on ROAD-EW-3 and ROAD-EW-4 (two east-west secondary roads); interior blocks are pedestrian- and bicycle-priority [data:geometry/roads.geojson#ROAD-SPINE], [depth:traffic_rail_slow_parking].

**AI scenario integration**: Four core scenario types — ① Open-Source Launch Hall (code-contribution display, small roadshows, open-source community meetups; LM-01 landmark); ② Near-Campus Achievement Conversion (IP services, legal advice, investor matchmaking); ③ AI Life-Service Showcase (small-scale street-level pilots for AI+ medical, education, legal scenarios); ④ Night-Time Collaboration Space (24 h developer co-working and social venue). All scenarios carry privacy boundaries and non-digital alternatives [depth:three_key_area_detailed_design].

**Phasing**: Assigned to Phase 2 (PHASE-phase_2). Near-term: Open-Source Launch Hall site preparation and ground-floor tenant-mix renewal. Mid-term: full Achievement-Conversion Street renewal after campus-boundary and ownership confirmation. Long-term: complete near-campus innovation community [data:geometry/phasing.geojson#PHASE-phase_2].

### Dazhongsi AI Industry Cluster (PROV-KEY-003) — Detailed Design

**Spatial structure**: Centered on Dazhongsi station, organized as "one core, four quadrants, multiple corridors" — the station-city integrated hub as the core; four urban quadrants hosting smart-terminal showcase (NE), content consumption & digital assets (SE), commercial services & international roadshows (SW), and data-factor exchange (NW). Multiple pedestrian corridors radiate from the hub, linking the southern vitality-belt section and surrounding commercial areas [data:geometry/key_areas.geojson#PROV-KEY-003].

**Building form & massing control**: Mid-to-high-rise mixed use; the station-city integrated core reaches 60–80 m (conceptual value, pending official regulatory conditions), stepping down to 35–50 m at the periphery to meet the surrounding urban fabric. The formal language emphasizes a "gateway" character — the Dazhongsi Smart-Economy Gate (LM-03) as the signature structure, with surrounding buildings using clean volumes and dynamic facades (LED info screens, smart glass) to form a coherent "smart-economy district" image. Retain-renovate-demolish: retain buildings near the Dazhongsi cultural resource, convert low-efficiency commercial and office space into smart-terminal showcase and data-factor service space [depth:height_massing_character], [depth:retain_renovate_demolish].

**Public-space system**: The station forecourt is the primary public space (≥5,000 m² conceptual value); each quadrant gets a themed plaza — Smart-Terminal Showcase Plaza (NE), Content-Consumption Experience Plaza (SE), International Roadshow Plaza (SW), Data-Factor Exchange Courtyard (NW). Plazas are connected by shaded canopies and underground pedestrian passages, forming an all-weather walking network. Night lighting uses low-glare dynamic illumination to present the Smart-Economy Gate identity [data:geometry/public_space.geojson#PUBLIC-001].

**Transport & slow-mobility organization**: Dazhongsi station is the central hub (ROAD-TC-2); four-quadrant pedestrian connectivity is achieved via four crossing islands and two underground passages. The southern vitality-belt section (ROAD-SPINE) connects to the station forecourt, running north through ROAD-NS-0 and ROAD-NS-1 (two north-south branch roads) to the central section. Vehicular traffic uses ROAD-EW-4; the station area has drop-off bays and centralized bicycle parking [data:geometry/roads.geojson#ROAD-SPINE], [depth:traffic_rail_slow_parking].

**AI scenario integration**: Four core scenario types — ① Dazhongsi International Roadshow Hall (showcase, deal-making and international roadshows for agent and smart-terminal enterprises; LM-03 landmark); ② Data-Factor Exchange Hall (compliant, authorized, auditable data-factor and digital-asset circulation display); ③ Content-Consumption Experience Zone (AIGC, digital art, immersive-experience public-consumption space); ④ Smart-Terminal Showcase Center (product launches, tech demos, user testing). All scenarios carry enterprise-mark clearance and data-compliance boundaries [depth:three_key_area_detailed_design].

**Phasing**: Assigned to Phase 3 (PHASE-phase_3). Near-term: station-forecourt renovation and four-quadrant pedestrian connectivity. Mid-term: core-area renewal after utility and station-condition confirmation. Long-term: complete urban smart-economy district [data:geometry/phasing.geojson#PHASE-phase_3].

## AI Innovation Ecosystem, Personas and AI+ Scenarios

The proposal builds spatial-need personas for AI talent and enterprises — R&D office, open-source collaboration, achievement release, enterprise services, talent housing, social learning, consumption, sport, international exchange. AI+ scenarios follow the announcement's transport, service, consumption, medical, education, legal and living-service directions, forming industry-development and AI-enabled urban-function scenarios; each scenario states service object, location, data source, privacy boundary, human-review mechanism and operating entity.

AI scenarios are anchored to spatial and governance boundaries: public-space scenarios cite [data:geometry/public_space.geojson#PUBLIC-001], mobility/transport scenarios cite [data:geometry/roads.geojson#ROAD-001], open-space scenarios cite [data:geometry/green_space.geojson#GREEN-001]
 and [metric:public_space_ratio], [metric:green_ratio]. AI governance follows data-minimization, open-source, explainability and human-review; city agents may assist in identifying slow-mobility gaps, public-space heat, facility maintenance, enterprise-service demand and event-safety risk, but cannot replace planning approval, output unauthorized personal profiles, or claim official implementation commitments.

### District Agent Operating Loop (AI-native base)

To avoid "pasting an AI label onto a traditional plan", this proposal treats a **district agent operating loop** as the shared base for space and governance — AI as method, not decoration:

1. **Sense**: public layers (roads, green, public space, building footprints) and anonymized activity signals identify slow-mobility gaps, congestion nodes and facility shortages; no personal or non-public data.
2. **Model**: explainable models generate spatial and scenario hypotheses, each labeled with confidence and scope.
3. **Scenario**: hypotheses become experienceable, showable, operable nodes (see 10 scenario cards and 3 test-validation scenarios).
4. **Human-review**: every public-facing or enterprise-facing scenario has a human-review gate; sensitive conclusions need professional confirmation before proceeding (see the privacy & review boundary in `visual/assets/scenarios.json`).
5. **Controlled-deploy**: pilot only in public space and authorized scopes, with explicit exit mechanism and accountable operator.
6. **Evaluate**: close the loop on public interest, accessibility, inclusivity and safety, feeding the next Sense round.

This loop wires "AI ecosystem, scenario empowerment, public space, governance compliance" into one auditable, iterable spine — the core lever for planning innovation and AI×urban-planning innovation (concept suggestion, not an engineering conclusion) [source:SCENARIOS], [source:ECOSYSTEM-MAP].

## Land Use, Building Scale and Retain-Renovate-Demolish

Land use follows public standards for territorial spatial survey, planning and use regulation, forming a complete, closed, seamless partition. Buildings distinguish retained, renovated, renewed, new or to-be-confirmed objects, stating footprint, function, scale, character, roof, massing and height-control suggestion tiers. Where existing buildings, ownership, regulatory plan and engineering conditions are missing, only methods and a to-be-calibrated list may be proposed — no fabricated retain-renovate-demolish conclusions.

Land classification follows [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; height, massing, interface and character are governed by [depth:height_massing_character]; retain-renovate-demolish by [depth:retain_renovate_demolish]
. Primary evidence: [data:geometry/land_use.geojson#LU-001], [data:geometry/buildings.geojson#BLDG-001] and [metric:building_footprint_area_sqm]
.

Building scale and intensity must agree with `metrics.json` and layers. Where total floor area, FAR, height, building density, green ratio, setback and building-control lines lack official conditions, they are listed as to-be-calibrated or awaiting regulatory-plan conditions — never fixed numbers implying precision. The A3 booklet gives the renewal list and a metric recalculation table; the A0 boards show key spatial structure and key districts; the HTML page links metrics and layers.



### Retain-Renovate-Demolish Five Gates (method, not conclusion)



Retain-renovate-demolish draws no fabricated conclusions; it proceeds through five gates, each giving method, and any gate not passed downgrades to to-be-confirmed: ① status check (building footprint / ownership / as-built survey); ② compliance & heritage (regulatory plan, heritage and character constraints); ③ public interest & accessibility (whether it serves vulnerable groups and continuous accessibility); ④ reversibility & recalculation (whether reversible, whether area is geometrically recalculable); ⑤ human & community confirmation (operator and community co-decision). Gate output is a "deepening list", not an approved conclusion.

## Transport, Rail, Municipal and Public-Service Facilities

Transport responds to the announcement's requirements for rail-station integration, road micro-circulation, slow-mobility gaps, external transport, parking, non-motorized parking and green transport, covering the North 5th Ring Road, the Jing-Zhang heritage-park cross-ring node, Wudaokou, Qinghua East Road West Gate, Dazhongsi station and key-enterprise connections. Road and slow-mobility layers stay within the submission boundary and cross-check with public space, green space, industry nodes and key districts; under a provisional boundary, transport conclusions are temporary design discussion only.

Transport and municipal depth are governed by [depth:traffic_rail_slow_parking] and [depth:municipal_new_infrastructure]; layer evidence cites [data:geometry/roads.geojson#ROAD-001]
, [data:geometry/public_space.geojson#PUBLIC-001] and [data:geometry/constraints.geojson#CONSTRAINTS]. Where road redlines, pipelines, fire and municipal conditions are missing, assumptions state the gap rather than presenting strategy as approved conditions.

Municipal and public services cover AI industry-service facilities, innovation-service platforms, talent living services, new infrastructure, distributed energy, edge compute and traditional municipal fusion. Standards, layout, service radius, operating model and phasing must be stated; missing pipeline, energy, drainage, flood, fire engineering data are listed as formal-deepening prerequisites.

## Blue-Green Space, Public Space and Urban Character

Blue-green space takes the Jing-Zhang heritage-park vitality belt as the skeleton, coordinating the Qinghe and Xiaoyue rivers and the travel demand of surrounding universities, enterprises and communities, proposing a north-south through, east-west connected trail, cycleway and green-space system, identifying slow-mobility gaps, over-ring nodes, and north/south landscape nodes, with strategies for parking, sport, innovation exchange, tech testing, application showcase and public-service composite use.

Blue-green public space is checked by [depth:blue_green_public_space]; core evidence is [data:geometry/green_space.geojson#GREEN-001], [data:geometry/public_space.geojson#PUBLIC-001]
, [metric:green_ratio] and [metric:public_space_ratio]; the urban-design management measure [standard:MOHURD-URBAN-DESIGN-MEASURES]
 governs landscape, public space and building control.

Urban character fuses Jing-Zhang railway heritage, Zhongguancun innovation culture and AI innovation culture, using resources such as the Tsinghua Garden station and Beijing Film Academy, proposing urban tone, building character, roof form, massing, interface and public-art guidance. Wayfinding, cultural symbols, international narrative, AI pilgrimage landmarks and a contribution/honor wall are proposed, but all brands, fonts, images, portraits and enterprise marks must have cleared rights. Character control separates official control, design suggestion and to-be-confirmed conditions; no pseudo-precise control lines without heritage or regulatory basis.

## Renewal Project List, Implementation Policy and Phasing

The implementation forms a reviewable renewal project list — location, type, function, responsible entity, dependencies, phase, risk and evaluation indicators. Policy covers urban-renewal coordination, spatial supply, operating mechanism, industry service, public participation, data governance and property-right coordination. `geometry/phasing.geojson` expresses phasing; `compliance_matrix.json` links each task to phasing and drawings.

The table above is a positioning summary; the **full Feasibility fields** (owner type, near/mid/long-term phased milestones and deliverables, cost categories with concept estimates, effectiveness thresholds and target values) are in the structured data `visual/assets/renewal_projects.json` (JZ-01–JZ-06, including `geometry_area_note_zh` on the area-topology difference). All amounts are concept-stage rough ranges, not estimates/budgets; landing requires investment appraisal and must not be read as a government commitment.

### Renewal Project Feasibility Summary (JZ-01–JZ-06)

Key feasibility fields extracted from `renewal_projects.json`, covering cost estimates, implementation phases, effectiveness thresholds and risks for all six projects. All costs are concept-stage rough ranges based on comparable-project benchmarks — not estimates/budgets; formal investment requires appraisal.

| Project | Concept Cost Estimate (major categories) | Near-Term Deliverable | Mid-Term Deliverable | Key Effectiveness Threshold | Core Risk |
| --- | --- | --- | --- | --- | --- |
| **JZ-01** Heritage-Park Slow-Mobility Gap Closure | Slow-mobility facilities & paving 0.3–0.8 B CNY; underpass renovation & lighting 0.1–0.3 B CNY; annual O&M 3–6 M CNY/yr | Close 3–5 high-priority gaps, underpass demonstration segment (0–1 yr) | Full north-south slow-mobility connectivity, 5 transit/bus interchange nodes (1–3 yrs) | Slow-mobility connectivity ≥95% (within 3 yrs); high-priority gaps 100% closed (within 1 yr) | Cross-ring node coordination complexity |
| **JZ-02** Zhongzhiyuan Qinghe Innovation Interface | Waterfront eco-restoration & trail 0.5–1.2 B CNY; showcase facilities & lighting 0.2–0.5 B CNY; annual O&M 4–8 M CNY/yr | Qinghe waterfront demonstration trail + temporary Safety-Governance Sandbox pavilion (0–1 yr) | Full 800 m innovation promenade, 3 thematic nodes built (1–3 yrs) | Waterfront trail connectivity ≥90%; showcase node opening rate 100% (within 3 yrs) | River blue-line and flood-control conditions pending |
| **JZ-03** Origin Community Near-Campus Achievement-Conversion Street | Ground-floor tenant-mix renewal & facade renovation 0.4–0.9 B CNY; public space & wayfinding 0.1–0.3 B CNY; annual ops 2–5 M CNY/yr | Open-Source Launch Hall site prep + ground-floor tenant-mix renewal launch (0–1 yr) | Full Achievement-Conversion Street renewal, campus–park slow-mobility stitching complete (1–3 yrs) | Achievement-conversion space occupancy ≥80%; ground-floor openness ≥90% (within 3 yrs) | Campus boundary and ownership pending |
| **JZ-04** Dazhongsi Station Four-Quadrant Pedestrian Connectivity | Station forecourt renovation 0.6–1.5 B CNY; underground passages & canopies 0.3–0.8 B CNY; annual O&M 5–10 M CNY/yr | 4 crossing islands + 2 underground passages launched (0–1 yr) | Four-quadrant all-weather pedestrian network, station-city core renewal (1–3 yrs) | Four-quadrant pedestrian connectivity 100%; station forecourt opening rate 100% (within 3 yrs) | Rail-station and utility-pipeline conditions pending |
| **JZ-05** AI Public-Service & Edge-Compute Nodes | Edge-compute station construction 0.2–0.5 B CNY; distributed-energy facilities 0.3–0.6 B CNY; annual ops 3–6 M CNY/yr | 2 edge-compute station pilots (0–1 yr) | Compute & public-service network covering all three key areas (1–3 yrs) | Compute service availability ≥99%; public-service coverage ≥85% (within 3 yrs) | Energy & compute safety standards pending |
| **JZ-06** Global AI Event Week Public Route | Event planning & communication 0.1–0.3 B CNY/yr; venue rental & setup 0.1–0.2 B CNY/yr; annual ops 2–4 M CNY/yr | First AI Event Week route trial run (0–1 yr) | Annual event brand established, international communication mechanism regularized (1–3 yrs) | Event attendance ≥5,000/edition; media exposure ≥1M impressions (within 3 yrs) | Public-space permits and copyright clearance pending |

> **Honest disclaimer**: All cost estimates are concept-stage rough ranges derived from comparable-project benchmarks — not estimates/budgets; formal investment requires appraisal. Effectiveness threshold targets and baselines require calibration with formal operational/monitoring data. All implementing entities are conceptual RACI coordination roles, not government commitments or statutory implementing bodies.

Project list and phasing depth are governed by [depth:renewal_project_list] and [depth:phasing_implementation]; spatial evidence is [data:geometry/phasing.geojson#PHASE-001]. Without ownership, funding, implementing entity and approval path, the item is written as implementation risk, not a landing promise.

Phasing is distinct from the 100-day submission cycle: the cycle is a deliverable deadline; phasing is the urban-renewal and construction path — near-term pilots, mid-term renewal, long-term governance. Items that can start with light facilities, operating activities and service platforms are separated from those awaiting official regulatory, municipal, transport and ownership confirmation. Annual events, developer-community operation, scenario open days, public-experience routes and international communication are described with object, frequency, responsibility boundary, conversion path and risk.



### Cost Five-Accounts (amounts pending)



Renewal-project costs are registered under five accounts (personnel / space / equipment / data / public value); all amounts are pending at concept stage, not estimates/budgets, and require investment appraisal before landing — not to be read as a government commitment. The five accounts align with the pending control indicators in `metrics.json`, preventing them from being read as formal financial conclusions.



### Phasing Evidence Gates



Each phase (near-term pilot / mid-term renewal / long-term governance) has an evidence gate: advancing to the next phase requires prerequisite evidence — near-term pilot needs baseline, test sample and minimum success threshold; mid-term renewal needs official regulatory/ownership/municipal confirmation; long-term governance needs public-value recalculation and a public-adoption ledger. Failing a gate keeps the work in the current phase; no cross-phase promise.

## Metrics, Area Recalculation and Compliance Matrix

The metric system includes overall-design area, key-area area, green and public-space ratios, building footprint, renewal-project count, AI scenario nodes, slow-mobility connectivity, industry-space indicators, talent-service indicators and self-check status. All known metrics are recalculable from GeoJSON or trusted sources; pending metrics state reasons and formal-submission prerequisites. `scripts/spatial_review.py` and `scripts/visual_review.py` are key formal self-check evidence.

Metric recalculation depth is governed by [depth:metrics_recalculation]. All known metrics are cited in the Quick metrics table below with their recalculation sources; precision is limited by the provisional boundary and will be fully recalculated on the official redline.

Quick metrics (recalculated from submitted geometry in EPSG:4548; precision limited by the provisional boundary, to be fully recalculated on official redline):

| Metric | Recalculated value | Source layer |
| --- | --- | --- |
| [metric:site_area_sqm] Site area | 11.41 km² | [data:geometry/site_boundary.geojson#SITE-001] |
| [metric:green_space_area_sqm] Blue-green space | 2.12 km² | [data:geometry/green_space.geojson#GREEN-001] |
| [metric:public_space_area_sqm] Public space | 0.76 km² | [data:geometry/public_space.geojson#PUBLIC-001] |
| [metric:building_footprint_area_sqm] Building footprint | 3.11 km² | [data:geometry/buildings.geojson#BLDG-001] |
| [metric:green_ratio] Green ratio | 18.6% | [data:geometry/green_space.geojson#GREEN-001] |
| [metric:public_space_ratio] Public-space ratio | 6.7% | [data:geometry/public_space.geojson#PUBLIC-001] |
| [metric:building_density] Building density | 27.2% | [data:geometry/buildings.geojson#BLDG-001] |
| [metric:key_area_count] Key-area count | 3 | [data:geometry/key_areas.geojson#PROV-KEY-001] |
| [metric:key_area_total_area_sqm] Key-area total area | 3.69 km² | [data:geometry/key_areas.geojson#PROV-KEY-001] |
| [metric:phasing_area_sqm] Phasing total area | 11.41 km² | [data:geometry/site_boundary.geojson#SITE-001] |

FAR, building height and total floor area are marked pending in `metrics.json`, pending official regulatory support.

**Area-topology difference note (≈16.9 m²)**: the submitted-geometry `site_area_sqm` = 11,412,825.386 m² and `phasing_area_sqm` = 11,412,842.304 m² differ by **16.918 m² (≈16.9 m²)**, caused by floating-point rounding and topology tolerance when partitioning the provisional boundary (the two layers' outer boundaries are not perfectly aligned) — **not a real area error**. This difference is registered in `metrics.json`'s `geometry_topology_note` and `visual/assets/renewal_projects.json`'s `geometry_area_note_zh`. All area/ratio indicators recalculated from submitted geometry remain limited by the provisional boundary and must be fully recalculated on official redline ([metric:site_area_sqm], [metric:phasing_area_sqm]).

The compliance matrix is the master file for task responsiveness: every announcement task and agent_taskbook task maps to a report section, layer, metric, drawing, HTML page, source, assumption and self-check item. Failure to cover any mandatory task in announcement 1.3/1.4/1.5 or agent.1–agent.6 blocks formal professional scoring.



See also `metrics.json`'s `boundary_offset_note`: the submitted geometry (PROV-SITE-001, ~11.4 km²) is offset from the OSM-mapped Jing-Zhang railway heritage park by about **412.5 m** (upstream issue #846); all area and ratio indicators are recalculation values internal to the provisional boundary, not scaled to the real heritage park, and must not be used as formal regulatory or redline basis — to be fully recalculated and aligned on official redline.

## Risk, Copyright and Compliance

The main proposal may be Chinese or English, with a full counterpart via `proposal.en.md` or `proposal.zh.md`; a missing translation yields only a non-blocking warning. A3/A0, HTML and text-bearing drawings should provide corresponding-language copies, preferring the event's recommended terminology. All images, drawings, icons, data and code assets must state source, license and authorization status in `sources.json` or `report/copyright_statement.md`. HTML pages must not load remote scripts, remote map tiles, remote fonts, iframes, forms or external APIs, and must not track reviewers.

Risk and missing-data items are governed by [depth:risk_missing_data] and cross-checked with [data:geometry/constraints.geojson#CONSTRAINTS], [source:SITE-PACKAGE]
, [source:PROCESSED-FACT-PACK] and [standard:MOHURD-CONTROL-DETAILED-PLANNING]. The official-boundary, key-area, regulatory-plan, road, parcel, building, municipal, heritage and public-service gaps in `missing_data_checklist.csv` must enter `assumptions.json`, self-check and the risk section. Any conclusion lacking official regulatory plan, road redline, ownership, municipal, fire or heritage conditions is downgraded to to-be-confirmed.

This proposal does not claim official approval, finalized regulatory plan, final land ownership, final construction scale or guaranteed implementation. The AI agent is responsible for facts, sources, copyright, spatial data, metrics and expression; maintainers and professional reviewers may require revision or reject based on self-check results, spatial review and the compliance matrix.

## Brand, Naming and Visual-Identity Direction (agent.1)

Naming and logo must serve the integrated identity of "Centennial Jing-Zhang cultural belt, urban AI living-experience belt, AI fusion-innovation belt", linked to the industry ecosystem, public space and cultural resources. Final names:

- Chinese final name: **京张智脉共生带** ("smart pulse" echoes the smart corridor and AI innovation chain; "symbiosis" stresses the coexistence of history, innovation and public life).
- English final name: **Jing-Zhang AI Symbiosis Belt**.
- Subtitle: From a Century-Old Railway to an AI Symbiosis Belt.

### Brand Identity Deliverables

This proposal delivers a **reviewable brand-identity system**, not only a slogan (see `visual/assets/brand_system.svg` and structured `visual/assets/brand_system.json`, [source:BRAND-SYSTEM]): ① four logo lockups (horizontal primary / vertical / monochrome-reversed / safe-area); ② a six-color palette (Smart-Corridor Blue #1F8A9C, Smart-Corridor Teal #2FAE8F, Symbiosis Green #5FC26B, Key-Area Warm Red #D9534F, Ink #162033, Paper White #FFFFFF); ③ a Chinese–English typographic direction; ④ three application mockups (signage, contribution-wall chip, international-communication key visual). All marks, fonts and graphics are geometric concept drafts containing no copyrighted or trademarked imagery; trademark and name clearance plus official and rights-holder confirmation are required before public use.

### Cultural Symbol System

To strengthen the continuous identity of "Centennial Jing-Zhang — AI Symbiosis", the proposal establishes eight core cultural symbols (see `visual/assets/cultural_symbols.svg` and `visual/assets/cultural_symbols.json`, [source:CULTURAL-SYMBOLS]): ① Smart-Vein Band ② Rail Section ③ Core Node ④ Symbiosis Ring ⑤ Centennial Gear ⑥ Data-Minimization Lock ⑦ Accessible Wayfinding ⑧ Human Node; with a combination rule (Smart-Vein Band as the lead motif; wayfinding uniformly overlays data-minimization and accessibility notices) and a three-tier wayfinding hierarchy (direction/zone — scenario/facility — privacy & accessibility). Symbols are geometric concept drafts, no protected imagery [source:CULTURE].

### Recognizable Visuals of the Three AI Pilgrimage Landmarks

Beyond textual positioning, the three landmarks get **recognizable concept visuals** (see `visual/assets/landmarks_board.svg`, [source:LANDMARKS-BOARD]): LM-01 Open-Source Launch Lighthouse (top pulse light + base launch hall), LM-02 Rail Heritage AI Time Corridor (linear light band + rail sleepers), LM-03 Dazhongsi Smart-Economy Gate (station-city gate + dynamic info screen). Each notes low-glare nightscape, accessibility and copyright, complementing the textual positioning in `visual/assets/landmarks.json`.

### Finalized English Name & Bilingual Narrative

The finalized Chinese/English names and subtitle are in the Brand section above; the full bilingual communication copy, three-layer cultural fusion narrative and wayfinding system are in `report/narrative.md` ([source:CULTURE]). Trademark and name clearance plus official and rights-holder confirmation are required before external communication. Key lines (ZH–EN):

- 一带三核，智脉共生。 / One belt, three cores, an intelligent living vein.
- 让历史铁路成为未来城市的试验场。 / Let the historic railway become a testbed for the future city.
- 开源、可信、无障碍的 AI 公共生活。 / Open-source, trustworthy, accessible AI public life.

Visual-identity direction (concept, not final): a **linear light-band + rail-section** motif echoing "one belt, three cores, blue-green slow-mobility composite ring"; colors take the smart-corridor blue-green and key-area warm red; geometric, containing no copyrighted or trademarked imagery. Direction drafts are pure-geometry SVG under `visual/assets/logo_direction.svg` (generated locally, no external assets). All logos, fonts, images, portraits and enterprise marks require cleared rights before public use.



**Finalized international sentence**: A railway of shared intelligence—tested in public, translated with care, returned to the city.



**Reversible-component narrative**: all AI scenarios and spatial interventions are organized on the "reversible component" principle — any pilot can be exited via appeal/rollback, without locking in irreversible facilities or ownership changes; this aligns with the receipt's `appeal_rollback` field and the four-stage mechanism's "public adoption/rollback at closure", reflecting humble responsibility to the city and the public.

## Three Zones, Two Wings and Regional-Synergy Loop (agent.1)

The "five major functions × three zones, two wings" coordination mechanism (table below) responds to regional synergy with the North Latitude community, Future Science City, Huairou Science City, the Economic-Technological Development Area and the Beijing-Tianjin-Hebei region:

| Synergy direction | Role of this belt | Regional interface | Evidence / deliverable |
| --- | --- | --- | --- |
| University sourcing (Wudaokou / Tsinghua) | Open-source collaboration & achievement conversion source | Zhongguancun Science City, Haidian universities | [data:geometry/key_areas.geojson#PROV-KEY-002] |
| National platform (Zhongzhiyuan) | Full-stack autonomous innovation & standards governance | Future Science City, Huairou Science City | visual/assets/ecosystem_map.json |
| Enterprise conversion (Dazhongsi) | Smart terminals / content consumption / international roadshow | ETDZ, Beijing-Tianjin-Hebei industrial hinterland | [data:geometry/key_areas.geojson#PROV-KEY-003] |
| Beijing-Tianjin-Hebei synergy | Scenario & data-factor circulation node | BTH innovation network | visual/assets/operations.json (attraction pathway) |
| International communication | Brand & open-innovation gateway | Global AI innovation-district network | report/narrative.md |

Regional synergy is written as "concept suggestion / reference scheme", not a confirmed government arrangement; interfaces require official planning and negotiation.

## Global AI Innovation-Ecosystem Case Benchmarking (agent.2)

Eight global cases form a benchmarking library (see `visual/assets/case_studies.json`): Kendall Square, Station F, Toronto MaRS, Helsinki, Shenzhen Nanshan, Tsukuba, Singapore Punggol, Barcelona 22@. Common patterns: ① university / national-platform sourcing; ② rail-station TOD and pedestrian stitching; ③ open scenarios and test fields as conversion; ④ trusted data governance and human review; ⑤ annual events and international communication. This proposal builds the "university sourcing — open-source collaboration — enterprise conversion — public experience — international communication" innovation chain, with the three key districts each taking corresponding mechanisms (see ecosystem map).

| Case | City | Transferable mechanism | Local counterpart |
| --- | --- | --- | --- |
| Kendall Square | Boston | University sourcing + walkable network + rail link | Wudaokou / Qinghua East Road stitching |
| Station F | Paris | Stock station adaptive reuse + community ops | Dazhongsi station / railway-heritage renewal |
| MaRS | Toronto | Urban-challenge arena + scenario opening | AI+ scenario open day |
| Helsinki | Helsinki | Open public data + privacy by design | Data-factor salon |
| Shenzhen Nanshan | Shenzhen | Anchor-led + talent community + TOD | Dazhongsi industry cluster |
| Tsukuba | Tsukuba | National platform + standards showcase | Zhongzhiyuan acceleration district |
| Punggol | Singapore | Digital twin + low-carbon ops | Annual events & scenario open day |
| 22@Barcelona | Barcelona | Industrial renewal + public-space weave | Jing-Zhang heritage-park vitality belt |

## AI Innovation Ecosystem Map (agent.2)

An eight-element loop — land, space, industry, capital, talent, compute, data, scenario — expresses coordination (see `visual/assets/ecosystem_map.json`): talent→industry→capital→compute→scenario→space→talent is the daily innovation loop; data→scenario→space→talent→data is the trusted-data public-value loop; land→space→scenario→capital→industry→land is the renewal-investment loop. The three key districts take: Zhongzhiyuan (compute–industry–data), Origin Community (talent–scenario–space), Dazhongsi (industry–capital–scenario). This map is a conceptual model, not a statutory plan; scale and mix need official regulatory and operational calibration.

## AI Test & Verification Scenarios and Space-Operation Matrix (agent.3)

No fewer than three complete nine-field scenarios (service object / space / operation / min-data / privacy / human review / non-AI alternative / appeal / stop condition; see `visual/assets/scenario_cards.json`); SC-01–SC-03 are flagged as industry test-validation scenarios: ① autonomous-model red-team test field (Zhongzhiyuan safety-governance sandbox); ② edge-compute stress test (edge-compute station + slow-mobility ring); ③ accessible AI navigation pilot (heritage-park vitality belt + campus-park stitching). All scenarios set privacy boundaries (data minimization, no personal profiles, authorization & de-identification) and human review (machine scoring does not replace human judgement; machine vision does not certify color-vision or alt-text). The city agent only assists in identifying slow-mobility gaps, public-space heat and facility maintenance — it does not replace planning approval, output unauthorized personal profiles, or claim official implementation commitments.

### Scenario Card Spatial Anchors and Operating Models (SC-01—SC-10)

Each of the 10 scenario cards is anchored to specific spatial coordinates and operating models, with spatial anchors (linked to GeoJSON layers and key areas), data flows (input → processing → output), operating models (entity / frequency / cost category), and privacy & review boundaries.

**SC-01 Open-Source Launch Hall**: Spatial anchor at PROV-KEY-002 (AI Origin Community) core building, adjacent to ROAD-TC-1 transit connection, ground-floor area approx. 800–1,200 m² (conceptual value). Data flow: code contribution records (public repository APIs) → aggregated statistics → contribution wall visualization; no personal behavior tracking. Operating model: open-source community self-governance + venue operator coordination, 2–3 launch events per week, costs allocated to "space O&M" and "events & communication" accounts. Privacy boundary: contribution data limited to publicly available repository information, no real-identity linkage [source:SCENARIOS].

**SC-02 Safety-Governance Sandbox**: Spatial anchor at PROV-KEY-001 (Zhongzhiyuan) west-side walled courtyard, approx. 200 m from Qinghe waterfront trail, building scale approx. 1,500–2,000 m² (conceptual value). Data flow: test model versions → sandbox-isolated environment → safety evaluation report (published after human review); no production data access. Operating model: standards-setting body + safety evaluation team joint operation, appointment-based access (≤30 persons per session), costs allocated to "equipment" and "personnel" accounts. Review boundary: machine evaluation results do not replace human safety judgment [source:SCENARIOS].

**SC-03 Edge-Compute Station**: Spatial anchors at 3–5 distributed nodes within the overall design scope, prioritizing PROV-KEY-001 riverfront showcase belt and PROV-KEY-002 station forecourt. Data flow: user inference requests → edge-node processing → returned results (no personal data storage); energy-consumption data feeds low-carbon showcase. Operating model: new-infrastructure operator + public-service provider, 7×24 h availability, costs allocated to "equipment" and "data" accounts. Privacy boundary: inference requests are processed and immediately discarded, no user input retention [source:SCENARIOS].

**SC-04 AI Slow-Mobility Navigation**: Spatial anchor along the full heritage-park vitality belt (ROAD-SPINE), focusing on 3 slow-mobility gaps (one each in PROV-KEY-001/002/003). Data flow: low-intrusion sensors (pedestrian volume, speed) → explainable model → gap identification and navigation suggestions; no facial recognition or license-plate capture. Operating model: public-space operator + city-agent team, real-time operation, costs allocated to "data" and "space O&M" accounts. Privacy boundary: aggregated statistics only, no individual trajectory tracking [source:SCENARIOS].

**SC-05 Dazhongsi International Roadshow Hall**: Spatial anchor at PROV-KEY-003 (Dazhongsi) station forecourt east building, adjacent to ROAD-TC-2 hub, area approx. 2,000–3,000 m² (conceptual value). Data flow: enterprise showcase content → post-review publication → audience interaction data (anonymous statistics); enterprise marks must have cleared rights. Operating model: commercial operator + industry organization, 2–4 roadshows per month, costs allocated to "space O&M" and "events & communication" accounts. Review boundary: enterprise showcase content requires human review before publication [source:SCENARIOS].

**SC-06 Qinghe Low-Carbon Innovation Corridor**: Spatial anchor at PROV-KEY-001 Qinghe waterfront interface, overlapping GREEN-001 green-space layer, waterfront trail approx. 800 m. Data flow: environmental sensors (temperature, humidity, air quality) → low-carbon display screens → public education content; no personal data collection. Operating model: public-space operator + environmental organization, all-weather open access, costs allocated to "space O&M" and "equipment" accounts. Review boundary: environmental data for display only, not an official monitoring basis [source:SCENARIOS].

**SC-07 Near-Campus Achievement-Conversion Street**: Spatial anchor at PROV-KEY-002 Achievement-Conversion Street ground floors, connecting ROAD-TC-1 and campus boundary, approx. 400 m length. Data flow: achievement information release (human-reviewed) → matching recommendations → connection records; no commercial secrets collected. Operating model: achievement-conversion service agency + university technology-transfer center, weekday hours, costs allocated to "personnel" and "space O&M" accounts. Privacy boundary: achievement information published only after owner authorization [source:SCENARIOS].

**SC-08 Data-Factor Exchange Hall**: Spatial anchor at PROV-KEY-003 northwest quadrant independent building, approx. 300 m from Dazhongsi station, area approx. 1,000–1,500 m² (conceptual value). Data flow: compliant data-product showcase (de-identified) → transaction-matching records → audit logs; no raw personal data processing. Operating model: data-trading service agency + compliance review team, appointment-based access, costs allocated to "personnel" and "data" accounts. Review boundary: all data products require compliance review before display [source:SCENARIOS].

**SC-09 AI Life-Service Showcase Street**: Spatial anchor at the community-commercial intersection zone between PROV-KEY-002 and PROV-KEY-003, selecting a 200–300 m demonstration segment. Data flow: service requests (medical/education/legal consultation) → AI-assisted triage → human-service connection; no replacement of professional judgment. Operating model: community service provider + AI technology provider, 10 h daily operation, costs allocated to "personnel" and "space O&M" accounts. Privacy boundary: AI suggestions are advisory only; final decisions made by humans [source:SCENARIOS].

**SC-10 Global AI Event Week Route**: Spatial anchor along the public-space system connecting PROV-KEY-001/002/003, approx. 3 km total, passing LM-01/02/03 landmarks. Data flow: event registration → route guidance → participation statistics (anonymous); no personal location tracking. Operating model: event operator + node venue coordinators, annual event (Q3), costs allocated to "events & communication" and "space O&M" accounts. Review boundary: event content requires safety and copyright review [source:SCENARIOS].

> **Honest disclaimer**: All spatial anchors and area figures are conceptual values based on the provisional boundary and functional requirements; formal implementation requires official regulatory-plan, ownership and municipal-condition confirmation. Operating-model entities are conceptual RACI coordination roles, not confirmed implementing bodies. All data-flow designs follow data-minimization and human-review principles and do not constitute commitments to specific technical solutions.

## Personas, Vulnerable Groups and Non-Digital Alternatives (agent.3 / public interest)

Five core personas (open-source developers, startups, enterprise visitors, residents, students) are retained, with five vulnerable-group personas added (elderly, children, disabled, caregivers, low-income workers) and non-digital alternatives (see `visual/assets/persona_table.json`): offline service desks, large-print paper guides, braille/tactile maps, community assemblies, assisted walking. Public participation runs through community assemblies, dual-track disclosure, activity tiering and accessible channels; AI only assists aggregation, decisions are made by humans and the community. Machine-generated personas do not claim field research; real user research and human accessibility review are required before implementation.



### Four-Stage Public Participation Mechanism (public-interest closed loop)



Public participation is designed as an auditable four-stage closed loop (structured in `visual/assets/persona_table.json`'s `participation_stages`):



1. **Co-define before entry**: community council and dual-track notice, defining goals, boundaries, indicators and acceptable risk together with residents, disability orgs, and elderly/child representatives.

2. **Walkthrough before opening**: before nodes open, organize disability, elderly and non-smartphone users for accessibility and usability walkthroughs, validating the continuous accessibility path and equivalent non-digital alternatives.

3. **Feedback/appeal during operation**: on-site service desk and an anonymous online feedback/appeal channel; all inputs enter an adversarial review list, answered within 72h in adopt / partially-adopt / reject tri-state after human review.

4. **Public adoption/rollback at closure**: at activity or pilot closure, publish the ledger and adoption results; nodes that miss thresholds or cause risk are rolled back, with recalculation prerequisites stated.



**Continuous accessibility path**: a continuous accessible path linking the three key areas (Origin Community — Zhizhong Park — Dazhongsi) via the heritage-park vitality belt (even anti-slip surface, continuous tactile guidance, voice & large-print wayfinding, rest and assisted-walking points); every AI navigation node keeps braille/tactile maps, large-print paper guides and non-digital human service as equivalent alternatives.



> Honest disclaimer: the four-stage mechanism and continuous accessibility path are design reasoning, not field-study conclusions; no real public participation or disability walkthrough has occurred — real user research and human accessibility review are required before implementation, and it must not be presented as "verified inclusivity".



### Trustworthy Governance Artifact: Jingzhang Relay Receipt (prior art #426 / #918)



To make every claim of "AI innovation — public interest — heritage continuity" auditable and reversible, this proposal introduces the **Jingzhang Relay Receipt** — a machine-readable "minimum reproducible slice / credential protocol" artifact recording, for each scenario opening, public-participation node or spatial intervention: receipt ID, linked scenario/layer, minimum dataset, human reviewer, appeal & rollback status, recalculation prerequisite.



The design method cites the Relay Receipt conceptual origin **PR #426** and its v0.2 exemplar **PR #918** (top proposal #918 / Mentat-Uran) as prior art (see `sources.json`'s [source:PRIOR-ART-RELAY-RECEIPT-426] and [source:PRIOR-ART-RELAY-RECEIPT-918]); this proposal is an independent derivative — **method only, not a verbatim schema copy** — to avoid originality and attribution disputes (per upstream #706 review).



Minimum reproducible slice field draft (concept, not final schema): `receipt_id` / `scenario_ref` (SC-01..SC-10) / `min_dataset` (data minimization, authorization, anonymization) / `human_review` (reviewer/institution and conclusion) / `appeal_rollback` (appeal & rollback status) / `recalculation_prereq` (official redline / regulatory plan / ownership). The receipt, the nine-field scenario cards and the four-stage mechanism form a "claim—evidence—review—rollback" trust chain; the receipt is a method suggestion only, subject to formal governance confirmation before landing.

## AI Pilgrimage Landmarks and Public-Space Component Library (agent.4)

No fewer than three AI pilgrimage landmarks (see `visual/assets/landmarks.json`): ① Open-Source Launch Lighthouse (Origin Community); ② Rail Heritage AI Time Corridor (heritage-park vitality belt); ③ Dazhongsi Smart-Economy Gate (Dazhongsi four-quadrant). Each has positioning, form, nightscape (low-glare, dimmable), accessibility and copyright note. A public-space component library is given: modular seating, explainable wayfinding, shared charging node, slow-mobility node, blue-green module, flexible event stage; plus an open-source contribution wall and annual honor display (online + offline, no uncleared portraits or trademarks). Landmarks and components are concept directions; engineering design, heritage and mark clearance, and accessibility review are required before implementation. Recognizable concept visuals of the three landmarks are in `visual/assets/landmarks_board.svg` ([source:LANDMARKS-BOARD]).

## Centennial Jing-Zhang Cultural Narrative and Wayfinding (agent.5)

Fusing Jing-Zhang railway heritage, Zhongguancun innovation culture and AI innovation culture (see `report/narrative.md`): "Centennial Jing-Zhang — AI Symbiosis" as the main line, presented continuously across public space, events and wayfinding. Wayfinding uses a linear light-band + rail-section motif, multimodal (icon + Chinese + English + tactile), and uniformly labels AI scenario nodes with "data minimization / human review / no personal profiles". The finalized Chinese/English names and copy are in the Brand section and `report/narrative.md`; trademark and name clearance plus official and rights-holder confirmation are required before external communication.

## Annual Operations and Global AI Innovation Activity System (agent.6)

Annual activities by quarter (see `visual/assets/operations.json`): Q1 Open-Source Launch, Q2 Test & Verification, Q3 Scenario Open Day, Q4 International Communication; an activity brand and visual identity (unified light-band motif, self-generated graphics), developer-community operation (launch lighthouse + code wall + contribution board), AI scenario open days (free to public, human service desk, non-digital alternatives), public experience and landmark operation (low-glare night lighting, activity tiering), and an attraction pathway (talent / enterprise / developer conversion). Operating costs split into five categories (space O&M, events & communication, compute & data, human review & accessibility, security & emergency); primary risks are event safety, rights clearance, resident disturbance and data compliance, with human review and exit mechanisms. The operations mechanism is a concept scheme, not a government commitment.

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- data/processed/agent_task_requirements.csv
- data/processed/source_use_matrix.csv
- data/processed/missing_data_checklist.csv
**Machine-readable index** (traceable evidence markers used in this proposal):

| Type | Marker |
| --- | --- |
| Sources | [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE] |
| Sources (cont.) | [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK] |
| Standards | [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] |
| Depth item | [depth:metrics_recalculation] |
| Data layer | [data:geometry/site_boundary.geojson#SITE-001] |
| Metric | [metric:site_area_sqm] |
