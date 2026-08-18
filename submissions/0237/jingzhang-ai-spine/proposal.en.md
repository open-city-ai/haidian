---
title: "Jing-Zhang AI Spine · Centennial Jing-Zhang AI Innovation Belt Urban Design"
author_github: "0237"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
translation_file: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A formal AI urban-design submission generated from the provisional boundary and the structured self-check requirements. Precision caveats and recalculation requirements are preserved; the organizer data gap does not block content scoring."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# Jing-Zhang AI Spine · Centennial Jing-Zhang AI Innovation Belt Urban Design

## Design Basis and Source Index

This formal proposal takes as its first basis the *Pre-Qualification Announcement for the International Scheme Solicitation of the Centennial Jing-Zhang AI Innovation Belt Urban Design* issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources. Its machine-readable basis is the maintained provisional coarse boundary, key areas, enumerations, metrics, and source registry in `brief/site-package/`. Before generating the proposal, the AI agent must read `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json`, and `data/processed/agent_fact_pack.md`, and use `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, and `missing_data_checklist.csv` to establish the task, scope, source usage, and gap inventory. Every design judgement must be decomposed into traceable sources, recalculable metrics, verifiable layers, and human-reviewable assumptions. The announcement requires the proposal to reach the urban-design depth of a regulatory plan and the urban-design depth of a comprehensive implementation plan; therefore narrative text cannot substitute for GeoJSON, the metrics table, the A3 booklet, the A0 boards, and the HTML electronic deliverables [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]. The complete source and standard coverage is preserved in `sources.json`, `standard_matrix.json`, and `design_depth_matrix.json`; the machine index is not repeated in the body.

The usage boundaries of the source registry are as follows [source:SOURCE-REGISTRY]:

- data/source_registry.json registers the usage boundaries of public, cleared, and provisional-only materials.
- Current registration summary: 7 formal-ready materials, 1 background material, 1 provisional-only material. (Synced with the organizer's updated shared registry; the earlier "5/0/1" was a stale static count.)
- The agent must not upgrade background_only or provisional_only materials into official boundary, statutory regulatory plan, formal scoring basis, or government implementation commitment.

`data/processed/agent_fact_pack.md` is the reading-navigation layer of this proposal, not a new authoritative source [source:PROCESSED-FACT-PACK]. It helps the agent organize the three-tier scope, three key areas, announcement tasks, agent.1-agent.6, source usability, and missing-data items into a readable proposal; factual judgements must still return to the registered original materials [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK], and the full source relationships are preserved in `sources.json`.

![Source evidence chain and submission package relationship](assets/figures/site-overview.png)

When the official `SITE_BOUNDARY` or the three `KEY_AREA` polygons are not yet available, this scaffold generates a provisional formal package from `brief/site-package/geometry/provisional_boundaries.geojson`. The `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` in the submission package must both be marked `provisional_constraint`, `official_boundary=false`, and may only be used for scheme generation, self-check, visualization, and design discussion; they cannot serve as official redline, approval basis, precise-area basis, or statutory control conclusion. This organizer data gap does not block content scoring; after the official polygons are replaced, site boundary, key areas, land use, roads, green space, public space, buildings, phasing, and metrics must all be recalculated.

The interpretable boundary is revisited through the overall-range layer and area recalculation [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]. The three key areas are checked against an independent layer and a count metric [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count]. This lets readers enter the evidence from the body without first reading a string of machine codes.

## Three-Tier Scope Working Framework

The proposal organizes its work according to the three tiers defined by the announcement: the coordinating-study scope addresses the AI industry ecosystem, strategic positioning, innovation chain, and future urban form across 43.6 km²; the overall-design scope addresses the urban district and industry zone within 1-2 km around the Jing-Zhang Heritage Park across 11.4 km², requiring an urban-renewal framework, industry spatial layout, mobility/municipal support, and urban-character control; the key-area scope addresses the three detailed-design districts of 368.4 ha, requiring explicit function, building scale, retain/renovate/demolish classification, public-space connectivity, and mobility organization. The three tiers are mapped tier-by-tier in `compliance_matrix.json`, ensuring every required task from announcement 1.3, 1.4, 1.5 and agent.1-agent.6 has chapter, layer, metric, drawing, and HTML evidence.

The depth items of the three-tier framework are constrained by [depth:three_level_scope_framework] and [depth:overall_spatial_structure]; the spatial evidence is [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#PROV-KEY-001]; the task basis is [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]; the scope index is navigated by the three-tier scope table in `project_scope_summary.csv` inside [source:PROCESSED-FACT-PACK].

![Three-tier scope and spatial working framework](assets/figures/land-use-structure.png)

The three tiers are not isolated sets of drawings. The coordinating study decides the industry-chain and urban-form judgements; the overall design turns those judgements into renewal projects, spatial structure, and facility capacity; the key-area detailed design validates the implementability of specific parcels, buildings, mobility, public space, and AI application scenarios. The agent must first lock the official or provisional boundary and constraints adopted by the current submission, then generate land use, buildings, roads, green space, public space, phasing, and AI service nodes, and finally recalculate metrics from these layers and explain in the body which conclusions remain limited by the provisional boundary. Any area, ratio, scale, or project count that cannot be recalculated from structured data must not be written into a formal conclusion.

The overall concept proposed here is the "Jing-Zhang AI Spine Symbiosis Belt": with the Jing-Zhang Heritage Park as the historical and public-space main axis, the three key areas — Zhongzhi Park, Beijing AI Origin Community, and Dazhongsi — as innovation anchors, and universities, enterprises, communities, and rail stations as the daily network, forming a spatial organization of "one belt, three cores, multi-point scenarios, and a blue-green slow-mobility composite ring." The "one belt" is not an extra redline drawn anew; it translates the three tiers into a working method. The "three cores" correspond to the three key areas. The "multi-point scenarios" correspond to operable nodes of AI+ public services, industry services, and urban life. The "composite ring" corresponds to the linkage of slow mobility, green space, public space, and activity routes.

| Tier | Design question | Proposal answer | Data anchor |
| --- | --- | --- | --- |
| Coordinating-study scope | How to organize the AI industry ecosystem and future urban form | Build an innovation chain of "university origination - open-source collaboration - enterprise transformation - public experience - international communication" | compliance_matrix.json, standard_matrix.json |
| Overall-design scope | How to put industry space, urban renewal, mobility, and municipal services on the map | Land use, buildings, roads, green space, public space, and phasing layers jointly express the structure | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-area scope | How to reach detailed-design depth in the three districts | Propose positioning, spatial moves, AI scenarios, and implementation dependencies respectively | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

## Coordinating-Study Scope: Industry and Future-City Research

The core task of the coordinating-study scope is to build a world-class AI innovation ecosystem. The proposal should map Haidian's universities and research institutes, leading enterprises, computing/algorithm/data factors, incubation platforms, listed companies, unicorns, and tech-service resources, and propose a spatial-collaboration framework for the AI innovation chain, industry chain, talent chain, and city-service chain. Naming and logo design should serve the overall identity of "Centennial Jing-Zhang Cultural Belt, Urban AI Living-Experience Belt, AI Fusion Innovation Belt"; they must not stop at slogans but explain their relationship to the industry ecosystem, public space, and cultural resources. The agent open-call taskbook also requires responses to the "five major functions" and "three zones, two wings" coordination, forming a naming system, visual identity, overall spatial-structure diagram, scenario opening, and operation mechanism that can be deepened further; this section must mark these requirements as coming from the agent open call, not from statutory planning control, using [source:AGENT-TASKBOOK] and [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

The coordinating study does not add pseudo-precise redlines; through the urban character, public space, and building-layout coordination required by [standard:MOHURD-URBAN-DESIGN-MEASURES], it connects back to [data:geometry/land_use.geojson#LU-001], [data:geometry/public_space.geojson#PUBLIC-001], and [depth:overall_spatial_structure], explaining that industry strategy must finally land on a visible, verifiable spatial structure.

Future urban-form research should answer how artificial intelligence changes work, life, socializing, learning, mobility, and public services. The proposal should turn AI mobility systems, continuous green space, innovation-service facilities, and an international living-working atmosphere into locatable functional zones, nodes, corridors, and scenarios, rather than vague technological visions. The agent should write industry-strategy metrics, AI innovation index, talent density, spatial-supply typology, and AI+ vertical-application key areas into the metric system, marking which are official, which are design suggestions, and which still await formal-data calibration. If global AI innovation events, developer communities, open scenarios, or pilgrimage routes are proposed, they must be written as "concept suggestion / reference scheme / for professional teams to deepen," never as already-decided government activities or implementation arrangements.

## Overall-Design Scope: Urban Renewal and Regulatory-Depth Urban Design

The overall-design scope must reach the urban-design depth of a regulatory detailed plan. The proposal must propose the overall urban-renewal spatial structure, low-efficiency-space identification, renewal-project list, implementation-policy suggestions, industry-function ratio, spatial-organization pattern, total building scale, and comprehensive carrying-capacity assessment. `geometry/land_use.geojson` should completely cover the design boundary with no overlap; `geometry/buildings.geojson` should express renewal or retained building footprints; `geometry/roads.geojson` should express micro-circulation, slow mobility, and rail-interchange relationships; `metrics.json` should recalculate core areas, ratios, and layer counts.

This section decomposes the regulatory-depth content per [standard:MOHURD-CONTROL-DETAILED-PLANNING] into reviewable objects: [data:geometry/land_use.geojson#LU-001] expresses the land-use structure, [data:geometry/buildings.geojson#BLDG-001] expresses building footprints, [data:geometry/roads.geojson#ROAD-001] expresses mobility organization, [metric:building_footprint_area_sqm] is used to verify building footprint area, and [depth:land_use_layout] and [depth:development_intensity_controls] constrain the deliverable depth.

The overall design must also support mobility, rail, municipal, and supporting facilities. The proposal should propose spatial layout and implementation paths around rail-station integration, road micro-circulation, non-motorized parking, parking supply, innovation-service platforms, talent living services, new infrastructure, distributed energy, and edge computing. For building height, development intensity, road redline, setback, and facility standards where official control conditions are not yet available, write "pending confirmation of formal regulatory conditions" — never present agent-estimated values as approved metrics.

## Key-Area Detailed Design

Key-area detailed design is mandatory. The Zhongzhi Park AI Autonomous-Innovation Accelerator should propose a detailed scheme around the national AI platform, full-stack autonomous innovation, standard-setting, safety governance, industry showcase, external transport, Qinghe culture, low-carbon green innovation interaction space, and green-space AI scenarios. The Beijing AI Origin Community should propose a detailed scheme around near-campus innovation, achievement incubation and transformation, talent zone, open-source system, brand activities, building retain/renovate/demolish, achievement showcase and release, living-support amenities, campus-park slow-mobility connection, and rail-station integration. The Dazhongsi AI Industry Cluster should propose a detailed scheme around leading enterprises, agents, intelligent terminals, content consumption, data factors, digital assets, commercial services, planned-green-space composite use, Dazhongsi-station integration, and four-quadrant pedestrian connectivity at intersections.

The three key-area detailed designs must reference [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003], and are checked by [depth:three_key_area_detailed_design] for whether they reach the depth of a comprehensive implementation plan. If only "build a demonstration zone" is described without evidence of function, buildings, mobility, public space, and implementation projects, it should be considered incomplete.

![Three key-area index and design-task diagram](assets/figures/key-areas.png)

The three key areas must appear in `geometry/key_areas.geojson`. If the repository provides official polygons, use them as `official_constraint`; if official polygons are missing, provisional_constraint may be used temporarily, but the body, HTML, sources, assumptions, and self_check must state that it cannot serve as formal scoring or approval basis. `compliance_matrix.json` should cover announcement 1.5.3.1, 1.5.3.2, and 1.5.3.3 respectively. The design expression should include function, building scale, building form, retain/renovate/demolish classification, public-space system, mobility organization, slow-mobility connectivity, and implementation projects. The HTML page should be able to switch among the three key areas; the A3 booklet and A0 boards should include at least the key-area master plan, partial details, and metric notes.

| Key district | Design positioning | Spatial move | AI industry & operation scenario | Evidence |
| --- | --- | --- | --- | --- |
| Zhongzhi Park AI Autonomous-Innovation Accelerator | Garden-type full-stack autonomous-innovation block | Strengthen Qinghe interface, industry showcase, low-carbon innovation interaction, external-transport organization; carry open testing and standard-governance showcase with green space | Autonomous-model testing, standard-setting workshop, safety-governance showcase, low-carbon computing experience | [data:geometry/key_areas.geojson#PROV-KEY-001], [depth:three_key_area_detailed_design] |
| Beijing AI Origin Community | Near-campus achievement-transformation and talent community | Organize campus-park-block slow-mobility stitching; supplement achievement release, talent services, living amenities, and open-source collaboration space | Open-source community, achievement release, talent-zone services, near-campus incubation | [data:geometry/key_areas.geojson#PROV-KEY-002], [source:AGENT-TASKBOOK] |
| Dazhongsi AI Industry Cluster | Urban-type intelligent economy and international-exchange block | Around Dazhongsi-station integration, four-quadrant pedestrian connectivity, commercial services, and key-enterprise public-environment renewal | Agent and intelligent-terminal showcase, content consumption, data factors, and international roadshow | [data:geometry/key_areas.geojson#PROV-KEY-003], [metric:key_area_count] |

## AI Innovation Ecosystem, Talent Personas, and AI+ Scenarios

The proposal should establish spatial-demand personas for AI talent and enterprises, covering R&D office, open-source collaboration, achievement release, enterprise services, talent living, social learning, consumption life, sports leisure, and international exchange. AI+ scenarios should form industry-development scenarios and AI-enabled urban-function scenarios around the directions proposed by the announcement — mobility, services, consumption, healthcare, education, law, living services. Each scenario should state its service target, spatial location, data source, privacy boundary, human-review mechanism, and operation subject.

AI scenarios must land on spatial and governance boundaries: public-space scenarios reference [data:geometry/public_space.geojson#PUBLIC-001], slow-mobility and transport scenarios reference [data:geometry/roads.geojson#ROAD-001], open-space scenarios reference [data:geometry/green_space.geojson#GREEN-001] and [metric:public_space_ratio], [metric:green_ratio]. These references let reviewers know scenarios are not slogans but design objects located in specific layers and metrics. The agent open-call taskbook requires no fewer than 10 AI scenario cards, no fewer than 3 industry test-validation scenarios, and no fewer than 5 user personas; the scaffold gives only the structure, and formal participants must write the scenario cards, persona tables, privacy boundaries, human review, and operation subjects into the body, HTML, A3/A0, and compliance matrix.

| User persona | Typical need | Spatial response | Self-check boundary |
| --- | --- | --- | --- |
| Open-source developer | Release, collaboration, testing, community reputation | Origin Community open-release hall, public code wall, night collaboration space | No collection of personal behavior trajectories; activity data only aggregated |
| Startup team | Low-cost office, computing entry, product test-bed | Zhongzhi Park shared test field, edge-computing service point, standard-governance consulting | Computing and data services require separate authorization |
| Leading-enterprise visitor | Showcase, business, international reception, talent recruitment | Dazhongsi international roadshow lounge, rail-station transfer, key-enterprise public space | Enterprise logos and cases must be rights-cleared |
| Nearby resident | Commute, leisure, community services, low-disturbance renewal | Jing-Zhang Heritage Park slow ring, embedded community services, graded night lighting and activities | Resident personas not used for commercial recommendation |
| University faculty and students | Achievement transformation, cross-campus collaboration, daily slow mobility | Campus-park slow-mobility stitching, achievement-transfer station, AI-education experience point | Campus data and research results require authorization |

| Scenario card | Spatial carrier | Design note |
| --- | --- | --- |
| 01 Open-source Release Hall | Beijing AI Origin Community | For universities, open-source communities, and startups: achievement release, code-contribution showcase, small roadshow space |
| 02 Safety-Governance Sandbox | Zhongzhi Park | Translate standard-setting, safety evaluation, and model red-team testing into visitable, bookable, supervised showcase and collaboration nodes |
| 03 Edge-Computing Station | Overall-design-scope nodes | Combined with public services, enterprise services, and low-carbon energy strategy as a new-infrastructure prototype pending deepening |
| 04 AI Slow-Mobility Navigation | Jing-Zhang Heritage Park vitality belt | Use interpretable wayfinding and low-intrusion sensing to identify slow-mobility breakpoints, crowding nodes, and accessibility needs |
| 05 Dazhongsi International Roadshow Lounge | Dazhongsi AI Industry Cluster | Serve agents, intelligent terminals, and content-consumption enterprises with showcase, negotiation, media release, and international exchange |
| 06 Qinghe Low-Carbon Innovation Corridor | Zhongzhi Park Qinghe interface | Combine green space, storm-water, walking/cycling, and AI showcase as the district's public living room |
| 07 Near-Campus Achievement-Transformation Street | Beijing AI Origin Community | For university achievement transformation: incubation, showcase, legal, IP, and investment-financing services |
| 08 Data-Factor Reception Lounge | Dazhongsi district | A city-service interface showing data-factor and digital-asset circulation under compliance, authorization, and auditability |
| 09 AI Living-Service Model Street | Community-commercial interface | Put AI+ scenarios of healthcare, education, law, and living services into operable small-scale block space |
| 10 Global AI-Activity-Week Route | One-belt public-space system | A walkable, communicable experience route from heritage culture, open-source community, industry showcase, to international roadshow |
| 11 Accessibility & Analog-Fallback Hub | Community-station interface | Front-desk human service, voice and large-print wayfinding, accessible shuttles, and a low-digital-literacy hotline secure reachability for older adults, persons with disabilities, children, and caregivers, preventing agent exclusion |
| 12 Community Co-creation & Feedback Node | The three key areas | Resident co-design workshops, feedback screens, and open deliberation channels put public co-creation, complaint handling, and benefit-sharing into space and operation, covering accessibility and equity that machine vision cannot certify |

AI governance suggestions generated by the agent must follow the principles of data minimization, open sources, interpretability, and human review. City agents may assist in identifying slow-mobility breakpoints, public-space heat, facility maintenance, enterprise-service demand, and activity-safety risk, but cannot replace planning approval, cannot output unauthorized personal personas, and cannot claim official implementation commitments. All AI scenario nodes should enter structured layers or the compliance matrix, so reviewers see their relationship to industry, space, and public interest.

## Land Use, Building Scale, and Retain/Renovate/Demolish Scheme

The land-use scheme should be expressed according to public standards such as territorial spatial survey, planning, and use-control classification, forming a complete, closed, seamless land-use partition. The building scheme should distinguish retained, renovated, renewed, newly built, or to-be-confirmed objects, clarifying building footprint, function, scale, character, roof, massing, and height-control suggestion tiers. Where existing buildings, ownership, regulatory plan, and engineering conditions are missing, the scheme can only propose methods and a to-be-calibrated list, not fabricate retain/renovate/demolish conclusions.

The land-use classification follows [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; building height, massing, interface, and character control are managed by [depth:height_massing_character]; the retain/renovate/demolish method is managed by [depth:retain_renovate_demolish]. The main evidence for land use and buildings is [data:geometry/land_use.geojson#LU-001], [data:geometry/buildings.geojson#BLDG-001], and [metric:building_footprint_area_sqm].

Building-scale and intensity metrics must be consistent with `metrics.json` and the layers. Where total building scale, floor-area ratio, building height, building density, green ratio, setback, and building control line lack official conditions, uniformly use `status=unknown`, and explain the pending conditions, current assumptions, and recalculation path after formal data arrives in `reason` / `assumptions`; never use fixed numbers to create a false sense of precision. The A3 booklet should give the renewal-project list and metric-verification table; the A0 boards should express the key spatial structure and key districts clearly; the HTML page should provide linked viewing of metrics and layers.

## Mobility, Rail, Municipal, and Public-Service Facilities

The mobility scheme should respond to the announcement's requirements for rail-station integration, road micro-circulation, slow-mobility breakpoints, external transport, parking, non-motorized parking, and green-transport systems. It should cover the North 5th Ring Road, the Jing-Zhang Heritage Park cross-ring nodes, Wudaokou, Tsinghua East Road West Exit, Dazhongsi Station, and the transport connections around key enterprises. Road and slow-mobility layers should stay within the submission boundary and cross-check with public space, green space, industry nodes, and key districts; if the submission boundary is provisional, transport conclusions can only serve as provisional design discussion.

The professional depth of mobility and municipal is constrained by [depth:traffic_rail_slow_parking] and [depth:municipal_new_infrastructure]; layer evidence references [data:geometry/roads.geojson#ROAD-001], [data:geometry/public_space.geojson#PUBLIC-001], and [data:geometry/constraints.geojson#CONSTRAINTS]. Where road redlines, pipelines, fire protection, and municipal conditions are missing, state the pending items through assumptions rather than writing strategies as approved conditions.

![Transport slow-mobility and blue-green public-space composite system](assets/figures/mobility-bluegreen.png)

Municipal and public-service facilities should cover AI industry-service facilities, innovation-service platforms, talent living-service facilities, new infrastructure, distributed energy, edge computing, and traditional municipal-facility fusion. The proposal should state facility standards, spatial layout, service radius, operation model, and phasing logic. Where pipeline, energy, drainage, flood control, and fire engineering data are missing, list them as prerequisites for formal deepening.

## Blue-Green Space, Public Space, and Urban Character

The blue-green-space scheme should take the Jing-Zhang Heritage Park vitality belt as the backbone, coordinate the Qinghe River, Xiaoyue River, and surrounding universities, enterprises, and community travel demand, and propose a north-south through, east-west connected system of walkways, cycleways, and green-space. It should identify slow-mobility breakpoints, over-ring nodes, park south and north landscape nodes, and propose strategies for parking, sports, innovation interaction, technology testing, application showcase, and public-space composite use.

Blue-green public space is jointly checked by the design-depth items and the green-space and public-space layers [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]. The green-space and public-space ratios are explained for design significance in the body; the full recalculation is preserved in `metrics.json`; the coordination of urban character, public space, and building control returns to the professional standard matrix [standard:MOHURD-URBAN-DESIGN-MEASURES].

The urban-character scheme should fuse the Jing-Zhang railway historical culture, Zhongguancun innovation culture, and AI innovation culture, using cultural resources such as the Tsinghua Garden railway station and Beijing Film Academy to propose urban tone, building character, roof form, massing, interface, and public-art guidance. The agent should also propose wayfinding, cultural symbols, international-communication narrative, AI-pilgrimage landmarks, contribution wall, or honor-display systems, but all branding, fonts, images, portraits, and enterprise logos must have rights-cleared sources. Character control should distinguish official control, design suggestion, and to-be-confirmed conditions; never give pseudo-precise control lines without heritage or regulatory-plan basis.

### AI Pilgrimage Landmark Catalog (conceptual)

The following 4 pilgrimage nodes and honor-display systems are conceptual spatial suggestions, not built or approved projects; formal implementation requires deepening with heritage, ownership, and regulatory-plan conditions, and all branding, fonts, images, and logos must have rights-cleared sources.

| ID | Landmark | Spatial carrier | Concept |
| --- | --- | --- | --- |
| L1 | Jing-Zhang Railway AI Time Station | Jing-Zhang Heritage Park (old station retrofit) | Retrofit railway heritage into a showcase merging AI and railway culture: museum, origin plaza, activity lounge |
| L2 | AI Origin Monument / Open-Source Contribution Wall | Beijing AI Origin Community | Records key figures in China's AI development, open-source projects, benchmarks, and community contributions |
| L3 | Dazhongsi Intelligent-Native Cluster | Dazhongsi AI Industry Cluster | A city living room featuring intelligent-native commerce, unmanned delivery, and generative experiences |
| L4 | Honor-Display System | Public space & digital interface | Annual contribution board, open-source star, scenario pioneer, and young-innovator honor nodes |

### Brand Identity System (conceptual)

The proposal establishes an original vector brand identity: the mark takes the centennial Jing-Zhang railway heritage as the "spine" linking the three key-area nodes (Wisdom Garden · Beijing AI Origin · Dazhongsi), with a diamond node representing the AI-agent accelerator. Palette: Spine Blue #2E6BE6, Vitality Teal #00B4A6, Innovation Purple #7C5CFC, accent Amber #F2A93B, neutral Ink #16222E and Rock Grey #C2CCD8; type scale led by Noto Sans SC for consistent CN/EN delivery. All graphics are original vector with rights-cleared sources, applied to board title bands, web header, report cover, and the honor-display system.

## Renewal Project List, Implementation Policy, and Phasing Plan

The implementation scheme should form a reviewable renewal-project list, stating project location, type, function, responsible subject, dependency conditions, implementation phase, risk, and evaluation metrics. Policy suggestions should cover urban-renewal coordinated implementation, spatial supply, operation mechanism, industry services, public participation, data governance, and property-right coordination. `geometry/phasing.geojson` should express the phasing scope; `compliance_matrix.json` should tie each task to phasing and drawings.

The project list and phasing depth are managed by [depth:renewal_project_list] and [depth:phasing_implementation]; the phasing spatial evidence is [data:geometry/phasing.geojson#PHASE-001]. Where ownership, funding, implementation subject, and approval path are missing, the proposal must write it as an implementation risk, not a landing commitment.

| Project ID | Project name | Type | Main dependency | Evidence |
| --- | --- | --- | --- | --- |
| JZ-01 | Jing-Zhang Heritage Park slow-mobility breakpoint stitching | Public space / mobility | Road redline, under-bridge space, mobility reorganization review | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Zhongzhi Park Qinghe innovation interface | Blue-green space / industry showcase | River blue line, ecology and flood-control conditions | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | Origin Community near-campus achievement-transformation street | Urban renewal / industry service | Campus boundary, ownership, ground-floor formats | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | Dazhongsi Station four-quadrant pedestrian connectivity | Rail integration / slow mobility | Rail station, road intersection, municipal pipeline | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI public service and edge-computing nodes | New infrastructure / public service | Energy, computing, security, operation subject | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | Global AI-Activity-Week public route | Operation / branding | Public-space permit, activity safety, copyright clearance | [data:geometry/phasing.geojson#PHASE-001] |

Phasing should be distinguished from the 100-day solicitation design cycle: the solicitation cycle is the time requirement for submitting deliverables, while the implementation phasing is the advancement path of urban renewal and project construction. The proposal should propose near-term pilot, mid-term renewal, and long-term governance framework, marking which content can start first with lightweight facilities, operation activities, and service platforms, and which must wait for formal regulatory, municipal, mobility, and ownership conditions. For the annual activity system, developer-community operation, scenario open days, public-experience routes, and international-communication mechanism, the body should state operation target, frequency, responsibility boundary, transformation path, and risk; never only write promotional slogans.

## Metrics System, Area Recalculation, and Compliance Matrix

The metrics system should at least include overall-design-scope area, key-area area, green and public-space ratios, building footprint, renewal-project count, AI scenario nodes, slow-mobility connectivity metrics, industry-space metrics, talent-service metrics, and self-check status. All known metrics must be recalculable from GeoJSON or trusted sources; unknown metrics must give the reason and the prerequisite for formal submission. The results of `scripts/spatial_review.py` and `scripts/visual_review.py` are important evidence for formal self-check.

Metric recalculation follows the unified design-depth requirement [depth:metrics_recalculation]. The body mainly explains the design meaning of metrics — for example, how the overall scope constrains spatial allocation, how blue-green and public-space ratios support daily interaction; the complete values, formulas, source files, and confidence are preserved in `metrics.json`. Example key metrics can be re-verified by the overall scope and green-space data [metric:site_area_sqm] [data:geometry/green_space.geojson#GREEN-001].

![Core metric recalculation and evidence-chain diagram](assets/figures/metrics-evidence.png)

The compliance matrix is the master file for task responsiveness. Every announcement task and agent_taskbook task must correspond to a report section, layer, metric, drawing, HTML page, source, assumption, and self-check item. Failure to cover any mandatory task in announcement 1.3, 1.4, 1.5 or agent.1-agent.6 means the proposal cannot enter formal professional scoring.

For formal deepening, the agent should also divide each metric into three classes: the first class is spatial metrics directly recalculable from submitted geometry, such as boundary area, green ratio, public-space ratio, building footprint area, and phasing area; the second class is control metrics needing official regulatory-plan or taskbook attachments, such as floor-area ratio, building height, building density, setback, road redline, and facility standards; the third class is performance metrics needing continuous calibration by operation or industry data, such as AI innovation index, talent density, industry-service satisfaction, slow-mobility accessibility, activity participation, and scenario usage frequency. The three classes should enter `metrics.json`, `assumptions.json`, and `compliance_matrix.json` respectively, avoiding the mistake of writing operational vision as approved planning conditions.

## Risk, Copyright, and Compliance Statement

**Bilingual contract required.** The primary proposal file may use Chinese or English, but a complete counterpart translation must be provided through `proposal.en.md` or `proposal.zh.md`; A3/A0, HTML, and text-bearing figures must also provide corresponding-language copies, preferably using the event-recommended translations in `docs/terminology-glossary.md`. A v2 package missing any required translation, language mapping, or valid file will be blocked by finalize and CI. All image, drawing, icon, data, and code assets must state source, license, and authorization status in `sources.json` or `report/copyright_statement.md`. HTML pages must not load remote scripts, remote map tiles, remote fonts, iframes, forms, or external APIs, and must not track reviewer behavior.

Risk and missing-data inventory are jointly checked by the risk depth item, the constraint layer, and the site package [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS] [source:SITE-PACKAGE]. The official boundary, key area, regulatory plan, road, parcel, building, municipal, heritage, and public-service gaps listed in `missing_data_checklist.csv` must enter `assumptions.json`, self-check, and the body risk section. Any conclusion lacking official regulatory plan, road redline, ownership, municipal, fire-protection, or heritage conditions must be downgraded to a to-be-confirmed item; the full professional cross-check is preserved in the standard matrix.

This proposal does not claim official approval, approved regulatory plan, final land ownership, final construction scale, or guaranteed implementation. The AI agent is responsible for facts, sources, copyright, spatial data, metrics, and expression; maintainers and professional reviewers may require rework or rejection based on self-check results, spatial review, and compliance matrix.

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
- Complete machine index: see `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, and `design_depth_matrix.json`
- This section's bibliography entries are based on the site-package registry; full provenance and licenses are in the structured source list [source:SITE-PACKAGE]
