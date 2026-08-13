---
title: "Jing-Zhang Noonline SLA / Midday Service Line"
author_github: "Rainyy-Yan"
language: "en"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A midday service-level network for research commuting, campus-park walking, and metro-to-park last-mile access around the Jing-Zhang heritage park."
iteration: "v2.0"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
tracks: "ai-traffic-walkability,ai-public-services,civic-agent-governance"
scenarios: "ai-traffic-walkability,enterprise-service-copilot,public-safety-operations-review,robot-delivery-low-speed,ai-cultural-guide,ai-health-service-navigation"
---
# Jing-Zhang Noonline SLA / Midday Service Line

This proposal treats the AI Innovation Belt not as a collection of brighter screens, but as a public-service contract for the most ordinary and under-designed daily window: 11:30-14:30 on workdays, when researchers, visitors, nearby residents, service workers and campus users move between lunch, meetings, metro access, short rest and informal collaboration. Noonline SLA means "noon online sensing plus no-online fallback": AI may forecast heat, rain, congestion, detours and service queues, but the public realm must still provide visible shade, seats, water, wayfinding, staffed help and accessible alternatives [source:DATA-SRC-AGENT-TASKBOOK-20260518] [standard:BARRIER-FREE-ENVIRONMENT-LAW].

The concept intentionally avoids repeating peer ideas that already focus on shade, cool routes, climate adaptation or general walkability. It therefore does not use the similar "cool-walk" naming space; it shifts the emphasis to a measurable midday service level, human fallback, public testing and governance. Population evidence is also used carefully: Haidian's 2020 census reports 69.7% of residents aged 15-59, 18.5% aged 60 and above, 56.5% with college education or above, and 35.7% non-local permanent residents. This supports a mixed-user service check, not a claim about exact 2026 site users [source:EXT-SRC-HAIDIAN-CENSUS-20210608].

![Overview diagram of the Jing-Zhang Noonline SLA showing provisional boundary, three key areas, midday service spine and staffed fallback nodes](assets/figures/site-overview.en.png)

## Design Basis and Source List

The evidence base has three layers. The official announcement and site package provide the project name, three-level scope, approximate 11.4 km2 overall design area, three key areas and deliverable depth. The agent taskbook adds requirements for naming, AI ecosystem, scenario cards, personas, landmarks, cultural narrative and long-term operation. Public standards and policy snapshots define the boundary for urban design, regulatory-plan-level claims, land-use codes, generative-AI service governance and accessible human fallback [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] [source:DATA-SRC-AGENT-TASKBOOK-20260518] [standard:MOHURD-URBAN-DESIGN-MEASURES].

The spatial package uses repository-maintained provisional rough boundaries only as generation and visualization constraints. `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` are explicitly marked as provisional constraints and must not be read as official redlines, road redlines, cadastral boundaries or precise area evidence. When official CAD/GIS files are released, the areas, drawings and HTML metrics must be recalculated as a full set [data:geometry/site_boundary.geojson#SITE-001] [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605].

The only added external population source is Haidian's public seventh-census bulletin. Its role is district-level context: Haidian is not a single-purpose research park, but a complex urban district where young researchers, commuters, visitors, children, older adults and accessibility needs overlap. It does not support site-population, time-of-day demand or boundary claims [source:EXT-SRC-HAIDIAN-CENSUS-20210608] [assumption:A-CENSUS-SCOPE-001].

## Three-Level Scope Framework

The coordinated research area of about 43.6 km2 asks how a midday service system can become public infrastructure for an AI Innovation Belt. It links universities, research institutes, parks, communities, rail stations and the Jing-Zhang heritage park as one daily-use network, rather than treating the three key areas as isolated renewal islands [depth:three_level_scope_framework] [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509].

The overall design area of about 11.4 km2 is the Noonline SLA test field. The proposal does not add new road geometry; it organizes three SLA path types on the existing `ROAD-001` midday spine and drawing layer. SLA-A is the target continuous-stay spine, with Target SLA = A but current Engine Verified SLA = B; SLA-B governs short transverse access, and SLA-C governs station-to-park touchpoints. Together they address lunch movement, research meetings, metro-to-park access, visitor arrival and short rest [data:geometry/roads.geojson#ROAD-001] [metric:noon_sla_corridor_count].

The key detailed-design scope of about 368.4 hectares contains the Zhongzhiyuan AI autonomous innovation acceleration area, Beijing AI Origin Community and Dazhongsi AI industry cluster. They are not treated as copies of each other: the north section focuses on R&D and validation, the middle section on origin display and open community, and the south section on consumption, business and visitor service. All key-area polygons remain provisional [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003].

## Coordinated Research Area: Industry and Future City Research

The industry logic is to move AI enterprise service from closed meeting rooms to legible urban interfaces. Park teams need lunch-hour meetings, temporary work, visitor reception, demonstration space, compliance consultation and scenario testing; the city needs AI public value that people can understand. Noonline SLA combines those needs into service levels, but the levels are formed by observable spatial conditions rather than a pure AI score: shade continuity, sit-able rest, drinking water, accessible public rooms or service points, crossing waiting space, limited summer detour, and visible staffed fallback [depth:overall_spatial_structure] [metric:noon_service_node_count].

Global cases are used as mechanisms, not formal copies: Kendall Square for university-enterprise proximity, Toronto Waterfront for data-governance caution, Paris Rive Gauche for rail-corridor redevelopment, Singapore one-north for research-life mixing, Seoul Digital Media City for display and consumption interfaces, London King's Cross for long-term renewal operation, and Shenzhen Hetao for cross-boundary collaboration. Together they point toward open scenarios, public compliance and everyday experience [source:DATA-SRC-AGENT-TASKBOOK-20260518].

The future-city research priority is low-intrusion AI. The proposal uses public alerts, equipment status, service tickets, anonymized crowd levels, staff patrols and voluntary user feedback. It does not use faces, personal phone traces, payment data, private company records or non-cleared operational material. Any generated guiding or recommendation content must retain complaint, correction and human-review channels [standard:GENERATIVE-AI-INTERIM-MEASURES] [assumption:A-PRIVACY-001].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The structure is "one line, three sections, twelve nodes and five staffed fallback points." The one line is the heritage-park midday service spine; the three sections are the northern validation section, the middle origin-community section and the southern consumption-business section; the twelve nodes provide shade, seats, water, charging, bilingual wayfinding and public testing cues; the five staffed fallback points make help visible [data:geometry/public_space.geojson#PUBLIC-001] [metric:human_fallback_node_count].

The twelve service nodes follow six siting rules: endpoints, direction-change points, staying points, crossing points, public-entry points, and heat/rain risk points. The five staffed fallback points are selected from those twelve where sections change, transit access is important, public entrances concentrate users, or event-day flows converge. They are conceptual siting rules and drawing evidence, not existing-facility statistics [metric:noon_service_node_count] [assumption:A-MICROCLIMATE-001].

Regulatory depth is written as recommendation, not statutory conclusion. Land-use zones, building interfaces, renewal projects and service nodes are reference material for professional teams. They do not replace regulatory-plan amendment, FAR, building height, road redline, tunnel/bridge design or municipal-capacity studies [standard:MOHURD-CONTROL-DETAILED-PLANNING] [assumption:A-CONTROLS-001].

The AI-native quality is that space becomes an auditable service contract. Each node can record whether shade, seating, water, offline explanation, human intervention and wheelchair or stroller paths exist. AI predicts, schedules and informs; visible facilities and staff patrols deliver the public-service quality [depth:development_intensity_controls] [metric:public_space_ratio].

![Land-use and service-level structure diagram showing four conceptual land-use partitions and midday service zoning](assets/figures/land-use-structure.en.png)

## Detailed Design of Key Areas

Zhongzhiyuan is proposed as the northern "midday validation section." The service line links R&D buildings, experimental services, open testing and transit access so lunch, short meetings, prototype demonstrations and external reviews can occur on a walkable low-speed interface. Its distinct spatial moves are: shaded waiting edges for short meetings outside R&D ground floors; a reversible prototype display and staffed registration point at open-test entrances; and a noon validation porch that combines crossing waiting, seating and drinking water on the transit-access side. The design output is a replicable node kit, not a parcel-level building conclusion [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design].

Beijing AI Origin Community is proposed as a visible AI public living room. It hosts an AI origin station, model-transparency window, Jing-Zhang memory interface and noon open classroom, joining Zhongguancun innovation culture, railway heritage and AI public governance. Its distinct spatial moves are: a public-entry forecourt with fixed bilingual wayfinding and staffed enquiry; a model-transparency window paired with sit-able public edges so visitors do not only pass a screen; and a Jing-Zhang memory interface connected to the midday walking route so international visitors can understand the origin story without a phone. It is the strongest location for visitor guidance, international communication and staffed fallback [data:geometry/key_areas.geojson#PROV-KEY-002] [metric:pilgrimage_node_count].

Dazhongsi is proposed as the southern consumption and business-service section. It strengthens metro-to-park, office-to-lunch, and event-to-public-space links. Its distinct spatial moves are: a shaded queueing and enquiry point on the station-to-park exit direction; a linked ground-floor service interface with seating, water and light consumption; and a public-space edge that can become a staffed event-day buffer. Lunch-hour launches, roadshows and community events remain possible operating concepts, not confirmed investment or operation plans [data:geometry/key_areas.geojson#PROV-KEY-003] [source:DATA-SRC-AGENT-TASKBOOK-20260518].

![Three key-area differentiation diagram showing northern validation, middle origin community and southern business service](assets/figures/key-areas.en.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

Five personas are used for service checks rather than population-count claims. They are young researchers who need low-cost short collaboration, visiting enterprise and investment-service users who need legible arrival and display paths, nearby residents and families who need safe shaded public space, older adults and accessibility users who need offline explanation and staffed help, and international visitors who need aligned bilingual wayfinding and public-compliance notes [source:EXT-SRC-HAIDIAN-CENSUS-20210608] [metric:persona_count].

The ten AI+ scenario cards are midday comfort navigation, lab visitor arrival, open-test booking, accessible slow-route review, AI origin public Q&A, Jing-Zhang cultural guidance, event crowd-level operations, low-speed robot delivery windows, midday safety patrol, and developer pop-up classroom. Each card must list its spatial carrier, data source, human fallback and prohibited personal-data types [metric:scenario_card_count] [standard:GENERATIVE-AI-INTERIM-MEASURES].

The three industry validation scenarios are a thermal-comfort service-level pilot, a low-speed robot and pedestrian coexistence pilot, and an event-day guidance and crowd-level pilot. They must be reversible, manually controllable and correctable through public feedback; they are not approved operations, do not require a named vendor and do not promise commercial effects [metric:industry_validation_scenario_count] [assumption:A-PRIVACY-001].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land use is expressed in four conceptual partitions: midday research and AI R&D mixed district, Jing-Zhang blue-green buffer and stay zone, campus-park mixed service district, and block-renewal daily service district. They inherit the scaffold's topology-safe partition and cover the boundary, but they do not replace formal territorial-spatial planning or regulatory land-use approval [data:geometry/land_use.geojson#LU-001] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

The building strategy is "interface renewal first, stock activation first, demolition conclusions later." It proposes midday-reachable interfaces, shared ground floors, sheltered edges, movable service modules and explainable display windows. Any specific retain, renovate, demolish, new-build, ownership, fire-safety or municipal conclusion needs professional evidence and official data [data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish].

The metrics layer records only what can currently be recomputed from provisional geometry or from the proposal structure. FAR, building density, height and parking controls remain pending official data rather than being filled with invented values [metric:floor_area_ratio] [metric:building_density].

## Transport, Rail, Municipal Infrastructure, and Public Services

Slow mobility is organized through three SLA path types, with spatial evidence attached to the `ROAD-001` midday spine and the five drawing sheets. SLA-A is the design target for the heritage-park noon spine, with Target SLA = A but current Verified SLA = B; it requires shade continuity, visible rest, water and staffed fallback on the main line. SLA-B is campus-park transverse access and requires short paths, crossing waiting, public-room access and limited summer detour. SLA-C is the metro-to-park last-mile touchpoint system and requires fixed bilingual wayfinding, accessible detour notices, seats, water and staffed enquiry. All three are spatial condition checklists, not AI rankings or phone-navigation scores [data:geometry/roads.geojson#ROAD-001] [metric:noon_sla_corridor_count].

### Noonline SLA Engine Evidence Alignment

This round uses a two-layer status: `Target SLA` is the intended design level, while `Verified SLA` is the level that the Noonline SLA Engine can support from current public/cleared data and evidence declared in this submission. The program result takes precedence over narrative wording; when field verification is missing, the target level must not be described as a proven current condition [data:visual/assets/noonline-sla-report.json#normal_routes.SLA-A] [metric:noon_sla_corridor_count].

| Design Claim | Engine Status | Evidence Gap | Upgrade Trigger |
| --- | --- | --- | --- |
| SLA-A heritage-park noon spine, designed for A. | Target SLA = A; Verified SLA = B. | Shade continuity, continuous exposure distance, real node locations, water/seating condition, public entries, crossings, summer detour and staffed-service responsibility are not field verified. | Upgrade from B to A only after all critical evidence is supplied and the Engine has no blocker; if any critical evidence is missing, it must not auto-upgrade. |
| SLA-B transverse short access, designed for B. | Target SLA = B; Verified SLA = C. | Crossing waiting, public-entry opening, summer detour distance and node condition remain conceptual evidence. | Recheck after public entries, crossings and detour distance are field verified. |
| SLA-C station-to-park touchpoints, designed for C. | Target SLA = C; Verified SLA = C. | Still depends on conceptual nodes and not-field-verified fixed wayfinding, water, seating and staffed enquiry conditions. | Confirm real points, opening hours and accessible paths before keeping or adjusting C. |
| All AI services off. | AI_OFF_TEST = PASS_WITH_PROVISIONAL_PHYSICAL_NETWORK. | Fixed signs, physical routes, seats, water, public entries and staffed fallback form a conceptual backup network, not proof of real operation. | The AI-OFF result can move from provisional to field-verified only after facilities are confirmed present, open, accessible and assigned to an operator. |

The A-level upgrade threshold is a hard threshold, not a vague promise that the route will reach A later. To move from Verified SLA = B to A, the package must add field verification for shade continuity, measured continuous-exposure distance, real drinking-water locations and opening status, seating and rest-node condition, public-entry opening conditions, key crossing conditions, actual summer detour distance, and staffed-service responsibility plus available hours. If any critical evidence is missing, the Engine should not auto-upgrade to A.

#### V2 Field-Verification Workflow

V2 does not claim that any field verification has been completed. The Engine derives 45 machine-readable verification tasks from the existing three SLA paths, conceptual nodes and eight evidence-gap categories, and writes them to `visual/assets/noonline-field-verification-ledger.json`. Eighteen SLA-A tasks are mandatory promotion-gate evidence, and every baseline task is `unknown`. Each task includes route/node/object, evidence required, method, pass/fail condition, status, confidence, verifier, timestamp and evidence reference. The human-readable checklist is generated from the same ledger into `visual/index.html#v2-field-verification` and `visual/index.en.html#v2-field-verification`; no disconnected manual checklist is maintained [data:visual/assets/noonline-field-verification-ledger.json#summary] [metric:field_verification_task_count].

The state machine permits only `unknown → scheduled → observed → verified / rejected`. AI may not create, observe, verify or reject field evidence. `verified` and `rejected` require a human verifier, timestamp and evidence reference. Because all 18 mandatory SLA-A tasks remain incomplete, the promotion gate returns `promotion = blocked`; Target SLA = A and Verified SLA = B therefore remain unchanged. A rejected mandatory item continues to block promotion and triggers a remain-B or downgrade review. Even if all mandatory items are later verified through the human workflow, the gate only permits a subsequent Engine/policy recheck; it never auto-writes Verified SLA=A [data:visual/assets/noonline-sla-report.json#verification_workflow] [assumption:A-FIELD-VERIFICATION-WORKFLOW-001].

The 2026 public announcement of the approved Jing-Zhang Railway Heritage Park corridor control-plan context provides current official background for a roughly 9 km green corridor, north-south/east-west slow mobility and public-service direction. This submission's `ROAD-001` remains a conceptual service reference axis, not official GIS, an existing-facility inventory or SLA-A field evidence [source:EXT-SRC-JINGZHANG-CONTROL-PLAN-20260812] [data:geometry/roads.geojson#ROAD-001].

Municipal and public-service facilities follow a lightweight and reversible approach: begin with movable water, seating, shade, charging, signs and staff tables, then decide whether fixed works are needed after professional measurement. Unpublished utility, drainage, power, fire-safety and underground-space information is not inferred [depth:municipal_new_infrastructure] [assumption:A-CONTROLS-001].

Rail connection does not propose new rail alignments or station works. It asks how a person understands the noon route from station exit to park or campus: which path has shade, where one can sit, whom to ask when a system fails, and how an international visitor reads both Jing-Zhang history and AI origin culture [standard:BARRIER-FREE-ENVIRONMENT-LAW] [depth:traffic_rail_slow_parking].

AI OFF / no-phone / no-screen mode is a complete public-service mode, not an emergency appendix. The Noonline SLA Engine currently reports `AI_OFF_TEST = PASS_WITH_PROVISIONAL_PHYSICAL_NETWORK`: after all AI services are off, the conceptual network still relies on fixed route signs, ground or post wayfinding, visible seats, drinking-water points, public entrances and the five staffed service points to maintain basic midday service. This remains dependent on provisional / not-field-verified physical conditions and must not be described as proof of real operation. AI only predicts, reminds, dynamically adjusts and supports maintenance; it is never a prerequisite for shade, rest, water, enquiry or accessible movement [data:visual/assets/noonline-sla-report.json#ai_off_test] [standard:BARRIER-FREE-ENVIRONMENT-LAW].

![Mobility and blue-green public-space diagram showing service spine, transverse connectors, cooling belt and fallback points](assets/figures/mobility-bluegreen.en.png)

## Blue-Green Network, Public Space, and Urban Character

The blue-green system is not primarily a claim of larger green area; it is a continuous midday experience connecting greenery, park edges, corners and ground-floor interfaces. The green-space ratio and public-space ratio come from provisional geometry, while the figures intentionally de-emphasize the provisional boundary and foreground service lines, nodes and fallback points [data:geometry/green_space.geojson#GREEN-001] [metric:green_ratio].

The public-space kit has six components: shaded seat, water point, bilingual wayfinding, AI explanation display, staffed service table and open-test notice. Each component requires a no-screen or low-tech version, so public space does not become a system only for expert smartphone users; seating, water, fixed signs, public entries and staffed tables are the infrastructure that still works when AI is off [data:geometry/public_space.geojson#PUBLIC-001] [standard:BARRIER-FREE-ENVIRONMENT-LAW].

Urban character is deliberately restrained: railway memory, research transparency and midday accessibility. AI pilgrimage nodes are not oversized sculptures; they are four updatable carriers: the origin station, open-source honor wall, model-transparency window and service-level milestone marker [depth:height_massing_character] [metric:pilgrimage_node_count].

## Renewal Projects, Implementation Policy, and Phasing

The renewal list has three groups. The 0-6 month group is a low-cost pilot with temporary wayfinding, seats, shade, water and staffed tables. The 6-18 month group is a scenario-validation stage with thermal-comfort measurement, low-speed robot windows and event-day guidance. The later professional-deepening stage requires official boundaries, regulatory controls, municipal data, traffic data and operating entities [depth:renewal_project_list] [data:geometry/phasing.geojson#PHASE-001].

Implementation policies are open co-creation suggestions: a midday service-level ledger, scenario-test application template, public feedback and correction channel, bilingual event-day guidance kit, accessibility review checklist and developer-community maintenance mechanism. They are not confirmed government policies, fiscal commitments or招商 promises [source:DATA-SRC-AGENT-TASKBOOK-20260518] [depth:phasing_implementation].

Long-term operation can become "Jing-Zhang Noon Lab": a summer midday service review, developer lunch-break roadshow, AI public-service open day, noon heritage walk, international visitor week and open-source proposal retrospective. Its value is a reusable ledger and auditable feedback, not one-time publicity [metric:scenario_card_count].

## Metrics, Area Recalculation, and Compliance Matrix

The structured metrics show a provisional submitted boundary area of about 11,412,825.386 sqm and an official announcement overall-design-area value of about 11.4 km2. These are approximate cross-check values only. The green-space ratio is about 0.123423, the public-space ratio about 0.073281, and the number of key areas is 3 [metric:site_area_sqm] [metric:official_overall_design_area_sqm] [metric:key_area_count].

Service metrics show 3 midday service path types, 12 conceptual service nodes, 5 visible human fallback nodes, 10 AI+ scenario cards, 3 industry validation scenarios, 5 personas and 4 pilgrimage or honor-display node types. The 3 path types are SLA-A/B/C service levels on the same midday spine, not three independent road centerlines; the 12 nodes and 5 fallback points come from drawings and siting rules, not existing-facility statistics [metric:noon_sla_corridor_count] [metric:noon_service_node_count] [metric:human_fallback_node_count].

The compliance matrix covers all official announcement and agent-taskbook requirements. The standards matrix covers the announcement, taskbook, urban-design measures, regulatory-plan depth, land-use classification, AI governance and accessibility boundaries. The design-depth matrix covers all 15 formal depth items [depth:metrics_recalculation] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

![Metrics and evidence-chain diagram showing area, service nodes, scenario cards, human fallback and data gaps](assets/figures/metrics-evidence.en.png)

## Risk, Copyright, and Compliance

The largest risk is that "service level" could be misread as an already implementable engineering standard. To avoid that, heat comfort, crowd levels, facility status and public feedback are written as a testing protocol; accessibility and staffed fallback are written as design baselines; official boundary and regulatory-control gaps are recorded in assumptions, sources, proposal text and the visual page [assumption:A-MICROCLIMATE-001] [depth:risk_missing_data].

A second risk is population overclaim. This proposal does not claim the exact share of older adults, children, researchers or migrant residents inside the site. Haidian census data supports only district-level mixed-user and inclusion checks, not project-site population or midday footfall statistics [source:EXT-SRC-HAIDIAN-CENSUS-20210608] [assumption:A-CENSUS-SCOPE-001].

All figures, PDFs, HTML and structured data are generated locally from public or cleared sources plus repository provisional geometry. No remote map tiles, external fonts, third-party images, personal data or unauthorized trademarks are used. The interactive visual runs offline; the report HTML has no script; the visual HTML calls no remote API [source:SOURCE-REGISTRY] [standard:GENERATIVE-AI-INTERIM-MEASURES].

## References

- Official announcement and site package: project scope, tasks, key areas and deliverable requirements [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509].
- Agent taskbook: naming, scenarios, personas, AI landmarks, culture and long-term operation [source:DATA-SRC-AGENT-TASKBOOK-20260518].
- Provisional boundary: generation, visualization and self-check only, not an official redline [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605].
- Haidian seventh census bulletin: district-level population context, not site population or noon footfall [source:EXT-SRC-HAIDIAN-CENSUS-20210608].
- Standards and policy snapshots: urban design, regulatory-plan depth, land-use classification, generative-AI governance and accessible human-service boundaries [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING].
