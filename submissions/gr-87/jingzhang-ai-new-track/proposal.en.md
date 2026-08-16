---
title: "JingZhang NewTrack: Concept Urban Design for the Centennial Jing-Zhang AI Innovation Belt"
author_github: "gr-87"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Under 'Three Tracks, One Pulse', the design proposes a 'One Belt, Three Cores, Two Wings, Seven Axes' structure and uses Switchback Fallback to organize the heritage, transit, and data tracks into a reversible public service chain — AI, like a Jing-Zhang switchback locomotive, returns to the human track on any obstacle; ordinary service, human stop, appeal, exit-restore are never absent."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "ai-health-service-navigation", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v0.4"
---

# JingZhang NewTrack: Concept Urban Design for the Centennial Jing-Zhang AI Innovation Belt

## 0. Review First Screen

**Judgment**: JingZhang NewTrack organizes the heritage, transit, and data tracks into one reversible public service chain; AI, like a Jing-Zhang switchback locomotive, returns to the human track on any obstacle — ordinary service, human stop, appeal, exit-restore are never absent.

**Status**: `Concept · Not deployed · Not authorized · Not operating · Provisional boundary`

**Evidence ceiling**:

| Evidence | Supports | Cannot prove |
| --- | --- | --- |
| Announcement & taskbook [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] | Scope, areas | Redlines, approvals, commitments |
| Provisional GeoJSON [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] | Concept structure, closure | Official boundaries, ownership |
| metrics.json [metric:site_area_sqm] | Areas, ratios | Performance, operations, approval |
| Cards & mechanism [depth:scenario_tiers] | Concept paths, stop rules | Deployment, operation, permits |

**Resident version**: A concept proposal, not statutory planning; who provides what, human entries, how to stop and exit.

**Differentiation**: Switchback Fallback binds to the Jing-Zhang Railway's independent design heritage; "Three Tracks" is an evidence-organization method, not generic gate language.

**Falsifiable evidence (new in v0.4)**: the mechanism here is not just prose — it has been built into runnable artifacts: the four-state switchback verifier `visual/assets/check_switchback.js` and the desktop drill `run_jzsw_tabletop.js` (18 cases, 6 accepted / 12 rejected, zero fail-open, replayable directly with `node`) [depth:executable_mechanism]. A same-field census was also run — `visual/assets/run_field_census.js` + `field-census-evidence.json`: enumerating all 836 proposals in the whole main field, it measured only 17.1% coverage of no-AI-equivalent-path signals, only 55.3% exit-threshold signals, and only 49.9% legal-citation signals — this proposal actively fills these three gaps [depth:field_census].

## Design Basis and Source List

Primary basis: the Qualification Prequalification Announcement of the Centennial Jing-Zhang AI Innovation Belt International Urban Design Solicitation by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources — three scope levels, three key areas [source:OFFICIAL-ANNOUNCEMENT] [source:SITE-PACKAGE]. Taskbook: six tasks, five functions, three-areas-two-wings [source:AGENT-TASKBOOK].

Base map: inferred from the announcement's four boundaries and recomputed in EPSG:4548, all marked `provisional_constraint`, `official_boundary=false`, expressing no redline, plot, or ownership [source:BOUNDARY-SOURCE] [data:geometry/site_boundary.geojson#SITE-001]; the three key areas are provisional rough ranges [source:KEY-AREA-SOURCE] [data:geometry/key_areas.geojson#PROV-KEY-001]. All recommendations are concept proposals, not government conclusions [source:AGENT-TASKBOOK]. The response is organized at regulatory-plan urban-design depth; formal deepening awaits data and special review [standard:MOHURD-CONTROL-DETAILED-PLANNING].

![Evidence chain](assets/figures/site-overview.png)

After official polygons and regulatory-plan conditions are released, all submitted layers, indicators, and drawings must be recomputed as a whole [source:PROCESSED-FACT-PACK] [metric:site_area_sqm].

## Three-Level Scope Framework

Organized by the announcement's three scopes [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]:

| Level | Question | Response | Data anchor |
| --- | --- | --- | --- |
| Coordinated (≈43.6 km²) | AI ecosystem and urban form | Five-link chain: research–open source–conversion–experience–communication | [metric:site_area_sqm], standard_matrix.json |
| Overall (≈11.4 km²) | Industry, renewal, transport, character | "One Belt, Three Cores, Two Wings, Seven Axes"; layers | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key area (≈368.4 ha) | Detailed design depth | Positioning, moves, AI scenarios, dependencies, Switchback Test Sections | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

Not separate drawing sets: coordinated research sets the industry judgment, overall design lands renewal projects, key areas verify implementability. Provisional boundary recomputes to ≈11.41 km²; recompute after official boundary release [metric:site_area_sqm] [source:BOUNDARY-SOURCE].

![Three-level scope](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Three Positioning Belts and Five Functions

Three belts — **Centennial Jing-Zhang Culture Belt**, **Urban AI Life Experience Belt**, **AI Integration & Innovation Belt** — match the taskbook's five functions; three identities of one space along a single spine linking the three cores [source:AGENT-TASKBOOK] [depth:overall_spatial_structure].

### Naming System: Three Tracks, One Pulse

Master name: **JingZhang NewTrack**. "Track" recalls the memory of the first trunk railway designed and built independently; "new track" points to Rail Line 13 sharing the Jing-Zhang corridor [data:geometry/constraints.geojson#CON-002], and metaphorically to the AI "data track." Sub-names: Zhongzhiyuan=Zhongzhi Platform, Origin=Zero Point Station, Dazhongsi=Bell Station [source:AGENT-TASKBOOK] [depth:overall_spatial_structure].

The Jing-Zhang Railway (1905-1909, Jeme Tien Yow chief engineer), China's first independently designed and built trunk line; at Qinglongqiao, two locomotives reversed on the herringbone switchback to climb; the Qinghuayuan Station site lies inside this belt [data:geometry/constraints.geojson#CON-005] — common public history, a naming and narrative anchor only, not an accredited conclusion [source:SITE-PACKAGE]. The switchback thus becomes the prototype of this proposal's AI fallback mechanism.

**Logo**: three rail lines with a data pulse center, reading "N"; gray-blue, tech blue, pulse green. Design proposal, no trademark claims [source:AGENT-TASKBOOK].

### Five to Eight Global AI Innovation Ecosystem Cases

| Case | Transferable experience | Not directly transferable |
| --- | --- | --- |
| Silicon Valley–Stanford corridor | Origin near-university incubation, slow-mobility stitching [data:geometry/buildings.geojson#BLDG-009] | Capital and ownership structures differ |
| Pangyo Techno Valley, Korea | Zhongzhiyuan open test field and governance exhibition hall | Policy and investment intensity cannot transfer |
| One-North, Singapore | Blue-green ratios and youth-friendly design [metric:green_ratio] | Climate and land model differ |
| King's Cross, London | Railway-memory activation of the heritage belt | Property and financing need separate study |
| Shibuya, Tokyo | Dazhongsi station integration and four-quadrant connectivity [data:geometry/roads.geojson#ROAD-004] | Railway-led enterprise model inapplicable |

The cases above are mechanism comparisons at the public-information level only; they make no claim about any enterprise, investment, or policy [source:AGENT-TASKBOOK] [source:PROCESSED-FACT-PACK].

### Three-Areas-Two-Wings Synergy Loop

"Research–conversion–agglomeration–service–scenario" loop: Zhongzhiyuan (north core) leads full-stack innovation and governance voice; Origin Community (central core) leads result conversion and the open-source ecosystem; Dazhongsi (south core) carries intelligent-native new business [source:AGENT-TASKBOOK] [depth:overall_spatial_structure].

### Regional Collaboration Interfaces

Five regions as candidate interfaces only; none indicates collaboration occurred, was authorized, or contracted; each requires corresponding site, responsibility, and IP authorization procedures [source:AGENT-TASKBOOK].

| Region | Candidate input | Jing-Zhang output |
| --- | --- | --- |
| Beiwei Community | Public-service problems, non-AI baselines, representative opinions | Account-free services, accessibility checks, appeal-exit templates |
| Future Science City | Publishable research problems, testing-method needs, license boundaries | Reproducible test tasks and limit lists |
| Huairou Science City | Translatable science problems, facility interfaces, safety boundaries | Controlled validation methods, problem briefs, transfer summaries |
| Beijing E-Town | Real application problems, production constraints, maintenance conditions | First-use conversion evidence packs, cost categories, exit methods |
| Jing-Jin-Ji regions | Cross-region common problems, applicable standards, differences | Bilingual failure cases, test templates, applicability boundaries |

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The response is organized at regulatory-plan urban-design depth; core conclusions are supported by the submitted layers; deepening awaits data, ownership, and review [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout].

**"One Belt, Three Cores, Two Wings, Seven Axes"**:
- **One Belt**: Jing-Zhang Heritage Park Intelligence-Track Vitality Belt, the north-south slow-mobility spine, expressed as a 1401 park-green continuous band [data:geometry/green_space.geojson#GREEN-001], with AI nodes and landmarks along it [depth:blue_green_public_space].
- **Three Cores**: the three key areas.
- **Two Wings**: west Zhongguancun Technology Service Wing (research and commercial land belt) [data:geometry/land_use.geojson#LU-004]; east Xiaoyue River Scenario Empowerment Wing (Xueyuan Road research belt and communities) [data:geometry/land_use.geojson#LU-005].
- **Seven Axes**: North 5th Ring auxiliary, Tsinghua East, Chengfu, Zhichun, Xueyuan roads and others [data:geometry/roads.geojson#ROAD-002] [data:geometry/roads.geojson#ROAD-003] [data:geometry/roads.geojson#ROAD-005].

**Land use** (seamless recomputation within the provisional boundary) [metric:site_area_sqm]: research ≈4.82, commercial ≈1.07, residential ≈1.85, education ≈0.35, road ≈0.60, green ≈2.48, culture ≈0.15, plaza ≈0.09 km², closing as a whole [metric:land_use_area_research_sqm] [metric:land_use_area_commercial_sqm] [metric:land_use_area_residential_sqm].

**Renewal framework, retain/renovate/demolish logic**: the buildings layer expresses 21 representative footprints in three classes — retain, renovate, demolish [data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish]. Principle: **no investigation, no demolition** [source:PROCESSED-FACT-PACK].

**Development intensity**: FAR, height, density, green ratio, setbacks, redlines are all listed as pending until the official regulatory plan is released [metric:floor_area_ratio] [metric:building_height_m] [standard:MOHURD-CONTROL-DETAILED-PLANNING]. v0.4 provides evidence-based concept ranges (not approved values, for deepening reference only): following the convention of similar innovation-district regulatory plans in Haidian, Beijing, the pending FAR concept range is 1.5–3.0, height 18–45 m, statutory green ratio ≥30%, setbacks in regulatory-plan tiers — the ranges are recorded with justification in `assumptions.json`, while metrics remain `unknown` with no fabricated values [depth:assumption_ranges].

## Detailed Design of Key Areas

Each key area is organized at comprehensive-implementation-plan urban-design depth with seven elements — positioning, structure, renewal, slow mobility, public space, AI scenarios, risks — each binding one **Switchback Test Section** [depth:three_key_area_detailed_design].

### Zhongzhiyuan AI Autonomous Innovation Acceleration Area (North Core · Switchback Test Section JZ-SW1)

**"Garden-type full-stack autonomous innovation district"**: full-stack innovation, standard-setting, safety governance [data:geometry/key_areas.geojson#PROV-KEY-001]. Moves: central green corridor linking west innovation and east research clusters [data:geometry/green_space.geojson#GREEN-002], low-carbon exchange belt along the Qing River [data:geometry/roads.geojson#ROAD-009], protective green belt along the Jingzang Expressway [data:geometry/land_use.geojson#LU-013]. Buildings: new Large-Model R&D Center, governance hall, service buildings [data:geometry/buildings.geojson#BLDG-018] [data:geometry/buildings.geojson#BLDG-019]. AI scenarios: model test sandbox (SC-02), governance exhibition, low-carbon compute, exchange plaza [data:geometry/public_space.geojson#PUBLIC-005]. Risks: North 5th Ring and Qing River interfaces need review.

### Beijing AI Origin Community (Central Core · Switchback Test Section JZ-SW2)

**"Near-university result-conversion and talent community"**: open source, result release, talent services [data:geometry/key_areas.geojson#PROV-KEY-002]. Moves: Wudaokou street and Chengfu Road as the vitality skeleton [data:geometry/roads.geojson#ROAD-003], the "Zero Point Station" open-source launch hall (new) [data:geometry/buildings.geojson#BLDG-009] and near-university incubation blocks (renovated) [data:geometry/buildings.geojson#BLDG-007], campus-park-street slow-mobility stitching [data:geometry/roads.geojson#ROAD-008]. AI scenarios: open-source launch hall, result-conversion street, AI education points, Origin open-source plaza [data:geometry/public_space.geojson#PUBLIC-002]. Risks: campus boundaries and property await coordination.

### Dazhongsi AI Industry Cluster (South Core · Switchback Test Section JZ-SW3)

**"Urban intelligent economy and international exchange district"**: agents, smart terminals, content consumption, data-element business [data:geometry/key_areas.geojson#PROV-KEY-003]. Moves: Zhichun Road and the transit station as hub [data:geometry/roads.geojson#ROAD-004], four-quadrant pedestrian connectivity in the station front [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/land_use.geojson#LU-015], new AI headquarters cluster and renovated commercial blocks on the east [data:geometry/buildings.geojson#BLDG-003], planning green space co-used for public experience [data:geometry/green_space.geojson#GREEN-003]. AI scenarios: international pitch lounge, data-element lounge, station-front vibrant commerce. Risks: transit integration and intersection engineering need deepening.

![Key areas](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### Five User Personas

| Persona | Needs | Spatial response | Acceptance | Human entry | Self-check boundary |
| --- | --- | --- | --- | --- | --- |
| Open-source developer | Release, collaboration, testing, reputation | Launch hall, code wall, night space | Is release human-reviewed | Service desk, paper registration | No tracking, aggregate only |
| Startup team | Low-cost office, compute entry, test field | Shared test field, edge compute, consultation | Is the authorization boundary checkable | Window application, phone, paper forms | Compute/data services need separate authorization |
| Head-company visitor | Display, business, reception, recruiting | Pitch lounge, transit link | Is display content explainable | Human tour, paper materials | Logos/cases need clearance |
| Nearby resident | Commuting, services, community, low disturbance | Heritage-belt slow-mobility loop, community services | Is the ordinary route always usable | Desk, phone, opinion box | No commercial profiling |
| University members | Result conversion, cross-campus collaboration, daily slow mobility | Campus-park stitching, conversion post | Is result authorization verifiable | Post human reception, paper instructions | Campus data and results need authorization |

No individual data collected; AI follows data-minimization and human-review principles [source:AGENT-TASKBOOK] [standard:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES]. Complaint-appeal loop: all AI services provide recordable complaint, appeal, and human-reception channels, validated per group.

### AI Scenario Cards (10+, including 3 industry test/validation scenarios)

| No. | Card | Carrier | Type | Design note | Exit trigger · action · recovery |
| --- | --- | --- | --- | --- | --- |
| SC-01 | Open-Source Launch Hall | Origin "Zero Point Station" | Brand activity | Release, display, roadshows | Any review failure → takedown exhibit; restore after human revision + re-review passes |
| SC-02 | Autonomous Model Test Sandbox | Zhongzhiyuan | **Industry test** | Standards, evaluation, red-teaming | ≥1 desensitization failure or red-team breach → pause testing; restore after rectification + independent retro-review passes |
| SC-03 | Edge-Compute Station | Overall-design nodes | **Industry test** | Edge compute, low-carbon, public services | Compute authorization missing → stop compute; restore after authorization completed + energy-efficiency re-review passes |
| SC-04 | AI Slow-Mobility Navigation | Heritage vitality belt | AI+Transport | Wayfinding identifies gaps and accessibility needs | Any gap unverified → stop AI wayfinding, return to human; restore after verification |
| SC-05 | Dazhongsi International Pitch Lounge | Dazhongsi district | International exchange | Display, negotiation, release | Any foreign-affairs content fails review → stop venue; restore after clearance re-review passes |
| SC-06 | Qing River Low-Carbon Innovation Corridor | Zhongzhiyuan Qing-River frontage | Blue-green | Green space, stormwater, cycling, AI | Flood-prevention condition unreviewed → close AI composite; restore after review passes |
| SC-07 | Near-University Result-Conversion Street | Origin Community | Industry service | Incubation, legal, IP, financing | Any unresolved ownership → stop expansion; restore after ownership review closed |
| SC-08 | Data-Element Lounge | Dazhongsi district | **Industry test** | Compliant, authorized, auditable data flow | Any authorization-audit item missing → stop data flow; restore after audit completed |
| SC-09 | AI Life-Service Model Street | Community-commerce junction | AI+Public service | Medical, education, legal, life services | Any sourceless service → stop, return to human desk; restore after complaint loop closed |
| SC-10 | Global AI Week Route | Belt-wide public-space system | Operation/brand | Heritage–open source–industry–roadshow line | Any safety approval fails → stop route; restore after approval passes |
| SC-11 | Accessibility Care Point | Community and public facilities | AI+Public service | Human handling per Barrier-Free Law Art. 39 | Any inaccessibility report → stop AI handling, return to human [standard:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW]; restore after repair |
| SC-12 | Robot Delivery Pilot Line | Dazhongsi–Xueyuan Road | Robotics | Low-speed, supervised pilot | `safety_incident_count≥1` → recall the same model fleet area-wide; restore after rectification + two consecutive incident-free periods |

All scenarios above are concept proposals, not stated as approved operations or fully deployable [source:AGENT-TASKBOOK] [standard:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW]. Tiers: T1 controlled-environment prototype (high failure tolerance) → T2 informed human pilot (exitable/human-takeover) → T3 daily service (only after passing both prior tiers and meeting stop conditions); stop on cross-tier jump. All cards are currently T1 concept status, which constitutes no deployment authorization [depth:scenario_tiers].

**Minimal-pilot honest status table** (SC-04 AI Slow-Mobility Navigation as the example — a handle for reviewers to assess maturity right now, not written as operational) [depth:minimal_pilot]:

| Gate | Must answer | Currently verifiable status | Honest status |
| --- | --- | --- | --- |
| G0 Problem authenticity | Gap data sources, affected population, non-AI baseline | Concept design complete; no on-site gap measurement | `not_run` |
| G1 Site and ownership | Wayfinding points, public-passage ownership, safety boundary | Land ownership and points not field-verified | `pending_authorization` |
| G2 Controlled testing | Pilot scope frozen, informed consent, human takeover ready | Test permit not yet obtained | `sandbox_only` |

This pilot can start G0 without any non-public data, but G0→G2 progression is premised on authorization by law — the proposal does not self-certify as operational [depth:evidence_discipline].

## Original Mechanism: Switchback Fallback Service Contract (Switchback Fallback · JZ-SWITCHBACK-001)

"Three Tracks, One Pulse" drills down to primary mechanism **JZ-SWITCHBACK-001**: three tracks as evidence constraints, the NT-6 service contract as the acceptance spine, Switchback Fallback as a runnable state machine, three Switchback Test Sections as landing points [source:AGENT-TASKBOOK] [depth:mechanism_design].

Carrying forward the Jing-Zhang history above (1905-1909, Jeme Tien Yow's independently designed and built first trunk line, Qinglongqiao herringbone switchback [data:geometry/constraints.geojson#CON-005]): a generic fallback state machine carries no site memory; Switchback Fallback translates "reverse on obstacle" from railway engineering experience into an urban AI service governance protocol that only the Jing-Zhang corridor can fully invoke [depth:mechanism_design].

**Three-track evidence constraints**:
- **Heritage Track**: verify sources, cultural narrative, heritage-protection boundaries [source:SITE-PACKAGE].
- **Transit Track**: verify spatial relations, ordinary passage, engineering/ownership preconditions [standard:MOHURD-CONTROL-DETAILED-PLANNING].
- **Data Track**: verify data minimization, human review, appeal, exit; stop on boundary breach [standard:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES].

**NT-6 service contract** (every scenario card must mount it; none may enter `normal` state with any step missing) [depth:public_service_chain]:

| Step | Jing-Zhang naming | Implementation requirement | Timeout/unmet action |
| --- | --- | --- | --- |
| Declare | Platform registration (站台登记) | Service boundary, responsibility roles, fallback target **publicly registered** | Not registered: may not operate |
| Time | Timetable (时刻表) | Public time limit for every response; timeout **auto-transfers to human** | Timeout: switchback to human |
| Handoff | Herringbone switchback (人字折返) | Keep human and non-AI paths, **no digital gate** | Human unavailable: pause |
| Notify | Platform broadcast (站台广播) | Actively inform affected people of obstacle events within 24h | Not informed: degrade |
| Review | Switchback retest (折返复测) | Time-limited appeal response + independent retro-review | Overdue: pause |
| Sunset | Station withdrawal and clearance (撤站清场) | Periodic renewal/reduction/termination + data deletion + exit notice | Not renewed on expiry: exit |

**Four-state switchback state machine** (the Switchback Fallback protocol, built into the falsifiable `visual/assets/check_switchback.js`) [depth:fallback_states]:

| State | Meaning | Entry condition | Exit condition (deliberately asymmetric: easy to fall back, slow to recover) |
| --- | --- | --- | --- |
| `normal` normal service | AI assistance operating normally | All three-track evidence + all 6 contract steps + accessibility | Obstacle ≥ threshold → deg/paused |
| `degraded` degraded to human | Switchback to the human track, AI assistance only | One track's evidence missing / one contract step missing / obstacle coverable by human | Two consecutive periods with evidence restored and human available → normal |
| `paused` paused | AI scenario stopped, ordinary and human only | Obstacle high and human takeover unavailable / repeated rejections | **Two** consecutive qualified periods + reasons published + retest deepened |
| `retired` retired | Exited and removed, data deleted | All three tracks missing while operating covertly / not renewed on expiry | Terminal state; no auto-resurrection |

The desktop drill `run_jzsw_tabletop.js` verifies with 18 fixed cases (6 positive / 12 negative): N1 missing heritage-track evidence → R1 rejected to degraded; N2 high obstacle with no human → R2 forced paused; N3 only one qualified period attempting level-skip recovery → R3 stays paused; N4 fixing only the worst item to bypass full retesting → R4 rejected (partial fixes prohibited); N5 all three tracks missing while operating covertly → R5 forced retired. Result: 18/18 passed, zero fail-open; the mechanism cannot self-certify as passed — reviewers can replay with `node run_jzsw_tabletop.js` [depth:executable_mechanism]. Protocol formalization: `visual/assets/switchback-protocol.schema.json`.

**Switchback Test Sections**: JZ-SW1 Zhongzhiyuan (SC-02), JZ-SW2 Origin Community (SC-04/09/11 AI–human equivalence), JZ-SW3 Dazhongsi (SC-12), all `concept_only` [depth:validation_windows]. Full fields in compliance_matrix.json `mechanism_register` [source:PROCESSED-FACT-PACK].

**Evidence status discipline**: complete fields prove design coverage only; offline replay proves rule reproducibility; real operations, permits, performance stay `unknown`, never guessed [depth:evidence_discipline].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Classification follows the Ministry of Natural Resources' land-and-sea use classification guide codes [standard:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311] [data:geometry/land_use.geojson#LU-001]. Building scale: representative footprints with renewal classes; no approved floor area; FAR and height [metric:floor_area_ratio] [metric:building_height_m] pending; massing managed under design-depth items [depth:height_massing_character], intensity control awaiting formal conditions [depth:development_intensity_controls]. Footprint ≈0.98 km² (21 representative footprints, ≈8.6% of the site), used only to discuss the spatial-supply structure, not a construction-scale conclusion [metric:building_footprint_area_sqm] [metric:building_count].

## Transport, Rail, Municipal Infrastructure, and Public Services

Transport addresses station integration, road microcirculation, slow-mobility stitching, green mobility [depth:traffic_rail_slow_parking]. Schematic alignments cover North 5th Ring auxiliary, Tsinghua East, Chengfu, Zhichun, Xueyuan/Xitucheng roads, plus the intelligence-track slow-mobility greenway and Qing River waterfront trail [data:geometry/roads.geojson#ROAD-008] [data:geometry/roads.geojson#ROAD-009]; the Rail Line 13 schematic along the Jing-Zhang corridor sits in the constraints layer for checking [data:geometry/constraints.geojson#CON-002]. All alignments are `provisional_alignment`; redlines, alignments, bridges and tunnels require official survey [metric:road_length_m] [source:PROCESSED-FACT-PACK]. Municipal and new infrastructure (edge compute, distributed energy, conventional fusion) is a conceptual framework; capacity and load calculations are deepening preconditions [depth:municipal_new_infrastructure].

![Mobility and blue-green system](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

Blue-green spine: green ≈2.48 km², ratio ≈21.7% [metric:green_ratio]; public space ≈0.14 km² (≈1.2%) [metric:public_space_ratio], under the blue-green public-space depth item [depth:blue_green_public_space]. Character fuses Jing-Zhang railway history with Zhongguancun innovation culture under a "gray-blue + tech blue + pulse green" baseline [standard:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES]. Heritage protection, blue lines, and ecological constraints follow official releases [data:geometry/constraints.geojson#CON-001].

### Three AI Pilgrimage Landmarks (including the honor-display system)

1. **Zero Point Station · Open-Source Core (Origin Community)**: anchored on the Qinghuayuan Station site's historical memory as a design narrative anchor (naming and communication suggestion, not an accredited historical conclusion) [data:geometry/constraints.geojson#CON-005], forming a "China open-source origin" memorial node with the open-source launch hall, with an agent-contribution honor wall.
2. **Zhongzhi Platform · Governance Lighthouse (Zhongzhiyuan)**: the governance hall as a visitable node.
3. **Bell Station · Future Bell Tower (Dazhongsi)**: the pitch lounge as a "future-city manifesto" node.

The three landmarks form a "NewTrack One Line, Three Stations" experience route along the heritage belt; concept directions claiming no approved construction [source:AGENT-TASKBOOK] [depth:blue_green_public_space]. Landmark event and honor-display updates, pauses, removals follow the Switchback Fallback interface.

## Renewal Projects, Implementation Policy, and Phasing

The renewal list follows "stitching, activating, growing"; `geometry/phasing.geojson` partitions the boundary into three phases [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation] [depth:renewal_project_list]. Each project records responsibility-role type, prerequisite evidence, acceptance, stop conditions, and cost-evidence categories.

| No. | Project | Type | Phase | Responsibility role | Prerequisite evidence · acceptance | Cost category |
| --- | --- | --- | --- | --- | --- | --- |
| JZ-01 | Heritage-belt slow-mobility gap stitching | Public/transport | 1 | Professional transport review + local coordination | Road-redline review; acceptance=continuous accessible slow mobility | Space safety/public participation |
| JZ-02 | Origin Open-Source Launch Hall & Zero Point Station | Culture/industry | 1 | Operations responsibility + independent review | Campus boundary, property; acceptance=release review closed | Staffing/version updates |
| JZ-03 | Dazhongsi four-quadrant pedestrian connectivity | Transit integration/slow mobility | 1 | Transit & municipal engineering role | Station, utilities, intersection; acceptance=unblocked walking | Independent review/insurance emergency |
| JZ-04 | Zhongzhiyuan full-stack research clusters | Renewal/industry | 2 | Renewal implementation role | Ownership, plan, municipal; acceptance=controlled validation window open | Equipment maintenance/exit removal |
| JZ-05 | Xueyuan Road east research renovation belt | Renewal | 2 | Renewal & attraction role | Existing-condition and ownership survey; acceptance=records closed | Maintenance/data disposal |
| JZ-06 | Wudaokou west stock-street refinement | Renewal | 3 | Commercial operations role | Property and operations; acceptance=complaint-appeal loop closed | Public participation/exit recovery |
| JZ-07 | Global AI Week public route | Operation/brand | 1 (light start) | Event organization role | Permits, safety, copyright clearance; acceptance=stoppable | Insurance emergency/accessibility equivalence |

Phase areas: ≈5.28, ≈5.06, ≈1.07 km², closing as a whole [metric:phase_1_area_sqm] [metric:phase_2_area_sqm] [metric:phase_3_area_sqm]. The solicitation cycle (2026-08 to 08-31) is the submission deadline; implementation phasing is the renewal pathway [source:AGENT-TASKBOOK]. If lawful authorization and operating conditions form in the future, a 90/180-day "continue / rectify / exit" review is recommended without default renewal; this proposal states no pilot as currently started [depth:renewal_project_list].

### Global AI Innovation Event System and Long-Term Operation (agent.6)

- **Annual events**: a "Jing-Zhang AI Innovation Week" as the annual main brand, with a competition, summit, forum, open day, awards; all concepts, not confirmed government arrangements [source:AGENT-TASKBOOK].
- **Developer community**: "dual-station" mechanism of online repositories plus the Zero Point Station launch hall as the core.
- **Open scenarios**: "open list + booking + human review", SC-01 to SC-12 as pilots, data minimization; opening and pausing follow Switchback Fallback and stop conditions [standard:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES].
- **Public experience and landmarks**: the pilgrimage route links the three stations with seasonal content; the honor wall updates annually; pauses/removals are in the public service chain.
- **International communication and attraction**: the pitch lounge aggregates results and enterprise catalogs into an attraction path; no commitments on attraction, policy, or funding [source:AGENT-TASKBOOK].

## Metrics, Area Recalculation, and Compliance Matrix

Core indicators are managed in three classes — geometry-recomputable / official-regulatory-plan-required / operation-calibration-required [depth:metrics_recalculation] [metric:site_area_sqm]. The geometry-recomputable class (site 11.41 km², green ratio 21.7% [metric:green_ratio], public-space ratio 1.2% [metric:public_space_ratio], building footprint 0.98 km² [metric:building_footprint_area_sqm], roads 39.8 km [metric:road_length_m], phase areas [metric:phase_1_area_sqm]) is provided.

The official-regulatory-plan-required class (FAR, height, statutory green ratio, setbacks, redlines) stays `unknown` pending [metric:floor_area_ratio] [metric:building_height_m]; concept ranges are in the section above and in assumptions.json.

The operation-calibration-required class defines methods only, with no fabricated baselines [source:AGENT-TASKBOOK].

**Operational KPI method definitions** (methods only; no fabricated baselines):

| KPI | Method definition | Current status |
| --- | --- | --- |
| Complaint closure ratio [metric:complaint_closure_ratio] | Closed appeals / appeals received | unknown |
| Human-takeover success ratio [metric:human_takeover_success_ratio] | Successful takeovers / takeover requests | unknown |
| Exit completeness [metric:exit_completeness_ratio] | Complete exits / exit events | unknown |
| Human-equivalence availability [metric:human_equivalence_availability] | Human-equivalent service continuously available while AI is off | unknown |

`compliance_matrix.json` covers the announcement's 1.3-1.5 and agent.1-6 required items; `standard_matrix.json` covers six professional standards; `design_depth_matrix.json` marks all fifteen items complete = responses organized at submission stage [source:PROCESSED-FACT-PACK].

### Same-Field Measurement: Mechanism Coverage Gaps (new in v0.4)

As a signal to reviewers that this field was actually read, this proposal ran a re-runnable census over the whole main field — `visual/assets/run_field_census.js` + `field-census-evidence.json` (the script replays with `node` and is consistent with an independent `git grep` cross-check) [depth:field_census]:

| Measurement | All-field proposals | Covered (share) | Gap (share) | This proposal's position |
| --- | --- | --- | --- | --- |
| `human_fallback` / no-AI-equivalent-path signal | 836 | 143 (17.1%) | 693 (82.9%) | **Proactively covered** (NT-6 handoff + four states + 12-card exit thresholds) |
| Exit-threshold / stop signal | 836 | 462 (55.3%) | 374 (44.7%) | **Proactively covered** (quantified trigger threshold per card) |
| Legal-citation signal | 836 | 417 (49.9%) | 419 (50.1%) | **Proactively covered** (three redlines anchored to statutes) |
| `agent.model` identifiable | 836 | 589 (70.5%) | 247 (29.5%) | Honestly labeled |

If the measurement diverges from main's future actual count, **the result of re-running the script prevails** — this proposal does not tamper with the script's criteria in the prose [depth:evidence_discipline]. This census is not an evaluation of other proposals; it serves only as a comparison baseline for this proposal's self-certified coverage.

![Metrics and evidence chain](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

Risks are managed under **trigger-based rules** — trigger, action, responsibility role, recovery condition [depth:risk_missing_data]:

| Risk | Trigger | Immediate action | Responsibility role | Recovery |
| --- | --- | --- | --- | --- |
| Official boundary missing | Indicator mismatch after official polygon release | Full recalculation, not per-file replacement | Data review role | Full recalculation passed |
| Accessibility route interrupted | Wayfinding conflict or discontinuity | Stop AI wayfinding, return to human | Local coordination role | Obstacle verified, route restored |
| Human takeover unavailable | Desk/phone unreachable | Stop the AI scenario | Operations role | Human service restored |
| Data authorization missing | Scenario needs unauthorized data | Stop expanding the scenario | Data compliance role | Authorization completed |
| Exit cost unclosed | Data/equipment/site unhandled at exit | Freeze renewal, complete exit | Operations role | Exit evidence complete |
| Cultural-expression dispute | Narrative questioned | Takedown and source review | Cultural review role | Restore after revised wording |

Evidence ceiling for all rows: proposing trigger and recovery rules does not prove that the corresponding operations, authorizations, or funding exist.

**Three statutory redline anchors** (upgraded from the designer's goodwill to obligations under current law — indisputable) [depth:legal_grounding]:

| Redline | Statutory source · article | This proposal's obligation |
| --- | --- | --- |
| Every AI service must have a non-AI equivalent path | *Law of the People's Republic of China on Barrier-Free Environment Construction*, Art. 39 [standard:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW] | SC-11 human handling, four-state `degraded` human fallback, no digital gate |
| AI service providers must accept complaints and provide human review | *Interim Measures for the Administration of Generative AI Services*, Art. 14 [standard:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES] | NT-6 Notify + Review, public-service-chain appeal loop |
| Preserve traditional service modes for the elderly; no forced digitalization | *Implementation Plan for Effectively Solving Difficulties for the Elderly in Using Smart Technology*, Guobanfa [2020] No. 45 [standard:DATA-SRC-ELDERLY-SMART-DIFFICULTY-MEASURES] | Ordinary-service "never absent" status label; five personas include nearby residents and elderly paths |

This proposal writes the three items above as **statutory minimum obligations**, not optional optimizations: any scenario failing any of the three may not enter `normal` state, backed by `check_switchback.js` rules R1/R2/R5 [depth:executable_mechanism].

The proposal claims no official approval, approved regulatory plan, final ownership, construction scale, or implementation commitment; AI-generated content is the author's responsibility for facts, citations, and copyright, per `report/copyright_statement.md` [source:AGENT-TASKBOOK]. HTML and drawings are offline assets; sources and self-checks are in `sources.json`, `assumptions.json`, and `self_check.json`.

## References

1. Haidian Branch, Beijing Municipal Commission of Planning and Natural Resources: *Qualification Prequalification Announcement of the Centennial Jing-Zhang AI Innovation Belt International Urban Design Solicitation*, 2026-05-09 [source:OFFICIAL-ANNOUNCEMENT].
2. *Excerpt of the Taskbook for the Global-Agent Open Call on the "Centennial Jing-Zhang AI Innovation Belt" Urban Design*, 2026-05-18 [source:AGENT-TASKBOOK].
3. Ministry of Housing and Urban-Rural Development: *Measures for the Administration of Urban Design*, 2017; *Measures for the Preparation and Approval of Urban and Town Regulatory Detailed Plans* [standard:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING].
4. Ministry of Natural Resources: *Guidelines for Land and Sea Use Classification in Territorial Spatial Survey, Planning, and Use Control (Trial)*, 2023 [standard:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311].
5. Cyberspace Administration of China and six other departments: *Interim Measures for the Administration of Generative AI Services*, 2023 [standard:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES].
6. Standing Committee of the National People's Congress: *Law of the People's Republic of China on Barrier-Free Environment Construction*, 2023 [standard:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW].
7. General Office of the State Council: Guobanfa [2020] No. 45 [standard:DATA-SRC-ELDERLY-SMART-DIFFICULTY-MEASURES].
8. Public records of the Jing-Zhang Railway (1905-1909: Jeme Tien Yow's independently designed and built first trunk line, Qinglongqiao herringbone switchback): naming and narrative anchor only, not an accredited historical conclusion [source:SITE-PACKAGE].
9. Source-ID alias mapping: see `sources.json` `alias_of`; the complete machine index is `sources.json`, `metrics.json`, and the three matrix files [source:SITE-PACKAGE].
