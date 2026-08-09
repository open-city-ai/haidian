---
title: "Jing-Zhang Rail Handoff — One Rail, a Century of Handoffs"
author_github: "wuguangde20"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Urban design proposal for the Centennial Jingzhang AI Innovation Belt built around the rail 'locomotive routing (机车交路)' institution — one main handoff rail, four relay segments, three handoff points, and two relay wings. A formal concept proposal based on provisional boundaries, with precision caveats to be recalculated once official data is published."
tracks: ["ai-origin-community", "jingzhang-heritage-narrative", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "ai-health-service-navigation", "ai-cultural-guide", "enterprise-service-copilot"]
---

# Jing-Zhang Rail Handoff — One Rail, a Century of Handoffs

> A century ago, the Jingzhang Railway ran China's first self-designed trunk line on the rail "locomotive routing" (机车交路) institution: crews did not run the whole way but handed off at routing points, relay by relay, signing off each segment. A century later, this corridor needs a similar "relay routing" — organizing AI innovation from seed to delivery into relay segments, with results, talent, and scenarios handed off, signed, and traced at each handoff point. This proposal, built on the concept of the **Jing-Zhang Rail Handoff Belt (京张·接力交路)**, answers how the Jingzhang Railway Heritage Park can be translated into an AI innovation belt for the next hundred years.

## Design Basis and Source List

This formal proposal takes the *Centennial Jingzhang AI Innovation Belt Urban Design International Solicitation Prequalification Announcement* issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources as its primary basis [source:OFFICIAL-ANNOUNCEMENT], and the provisional boundaries, key areas, enums, metrics, and source lists registered under `brief/site-package/` as its machine-readable basis [source:SITE-PACKAGE]. The agent reads `design_brief.json`, `allowed_design_space.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json` [source:SOURCE-REGISTRY] and `data/processed/agent_fact_pack.md` [source:PROCESSED-FACT-PACK], and builds task, scope, source-use, and data-gap lists from `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, and `missing_data_checklist.csv`. The announcement requires the plan to reach the urban-design depth of a regulatory detailed plan and of an integrated implementation plan [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], so narrative text alone cannot replace GeoJSON, metric tables, A3 booklets, A0 boards, or the HTML presentation.

This proposal uses `PROV-SITE-001` and `PROV-KEY-001/002/003` from `brief/site-package/geometry/provisional_boundaries.geojson` as temporary boundaries [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE], corresponding to [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#PROV-KEY-001]. The current registry summary: 5 formal-usable sources, 0 background-only sources, 1 provisional-only source [source:SOURCE-REGISTRY]. Provisional-only material must never be upgraded into official boundaries, statutory controls, formal scoring evidence, or government implementation commitments; every spatial claim in this proposal is labeled "temporary boundary, to be recalculated after official redline replacement". This organizer data gap does not block content scoring.

![Overview map and three-level scope relationships](assets/figures/site-overview.png)

The readable interpretation of the boundary and key areas maps to [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#PROV-KEY-001]; area recalculation is reported by [metric:site_area_sqm] and [metric:key_area_count]. The deep-diagnosis method is governed by [depth:existing_conditions_diagnosis]; the current diagnosis relies on public data and provisional boundaries, and the missing existing-building, ownership, and utility data is logged as a pending data gap.

## Three-Level Scope Framework

The plan is organized by the three levels announced: the coordinated research area (about 43.6 km²) covers AI industry ecology, strategic positioning, the innovation chain, and future urban form; the overall design area (about 11.4 km²) covers urban-renewal master framing, industrial-spatial layout, transport/municipal support, and urban character for the 1–2 km band around the Jingzhang Heritage Park; and the key detailed-design area (about 368.4 ha) focuses on the three areas: Zhongzhiyuan AI Independent Innovation Acceleration Zone, Beijing AI Origin Community, and Dazhongsi AI Industry Cluster [source:PROCESSED-FACT-PACK]. The three levels are mapped one-by-one in `compliance_matrix.json`, so every mandatory task in announcement sections 1.3, 1.4, 1.5 and agent.1–agent.6 has chapter, layer, metric, drawing, and HTML evidence.

The depth of the three-level framework is constrained by [depth:three_level_scope_framework] and [depth:overall_spatial_structure]; spatial evidence follows [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#PROV-KEY-001]; the scope index follows the three-level table in `project_scope_summary.csv` under [source:PROCESSED-FACT-PACK]. Coordinated research decides industry-chain and urban-form judgments; overall design lands them in renewal projects, spatial structure, and facility capacity; key-area design verifies implementability at parcel, building, transport, public-space, and AI-scenario level. The agent first locks the provisional boundary and constraints, then generates land use, buildings, roads, green space, public space, phasing, and AI service nodes, and finally recalculates metrics from these layers [metric:site_area_sqm], explaining which conclusions remain limited by the provisional boundary.

![Three-level scope and spatial working framework](assets/figures/land-use-structure.png)

| Level | Design question | Plan answer | Data anchor |
| --- | --- | --- | --- |
| Coordinated research area | How to organize AI industry ecology and future urban form | A four-segment relay innovation chain of "seed—transfer—accelerate—deliver" | compliance_matrix.json, standard_matrix.json |
| Overall design area | How to map industrial space, renewal, transport, municipal, and character | One main handoff rail · four relay segments · three handoff points · two relay wings expressed across land use, buildings, roads, green, public space, and phasing layers | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key detailed-design area | How the three areas reach detailed-design depth | Positioning, spatial moves, AI scenarios, and implementation dependencies per area | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

## Coordinated Research Area: Industry and Future City Research

The core task of the coordinated research area is to build a world-class AI innovation ecosystem. Responding to the "three positionings", "five functions", and "three areas + two wings" coordination required by the agent open-call taskbook [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], this proposal organizes the three positionings — Centennial Jingzhang Culture Belt, Urban AI Living Experience Belt, and AI Integration Innovation Belt — together with the five functions — AI full-stack independent innovation, world-class AI innovation ecology, a new AI+ scenario-enabling paradigm, an intelligent energetic AI city, and global voice in AI governance — into a "one main handoff rail, four relay segments, three handoff points, two relay wings" spatial coordination loop:

- **One main handoff rail:** the Jingzhang railway corridor as the central relay-routing line — heritage park on the ground, high-speed rail underground, and a compute/data backbone along the way; the physical reading of the Centennial Jingzhang Culture Belt and the AI Integration Innovation Belt, and the running track along which innovation travels from seed to delivery.
- **Four relay segments:** the innovation journey is organized as "seed (departure) — transfer (transit) — accelerate (speed-up) — deliver (arrival)", mapping successively from the coordinated research area through the overall design area to the key areas.
- **Three handoff points:** the three key areas serve as relay-handoff nodes — AI Origin Community = "transfer handoff" (results translation, talent handoff), Zhongzhiyuan = "accelerate handoff" (full-stack innovation, standards governance), Dazhongsi = "deliver handoff" (smart economy, international exchange).
- **Two relay wings:** the Zhongguancun technology-service wing (factor allocation, IP, capital) and the Xiaoyuehe scenario-enabling wing (scenario trials and public experience) act as feeder branches that bring innovation factors into the main handoff rail.

Coordinated research is reconciled through the urban-design management measures that govern city character, public space, and building layout [standard:MOHURD-URBAN-DESIGN-MEASURES], anchoring back to [data:geometry/land_use.geojson#LU-001], [data:geometry/public_space.geojson#PUBLIC-001], and [depth:overall_spatial_structure] to show that the industry strategy lands in a visible, reviewable spatial structure. The naming and logo design (see agent.1) serve overall distinctiveness, connecting to the industry ecology, public space, and cultural resources rather than remaining a slogan.

The taskbook also asks for "5–8 global AI innovation ecosystem cases" [source:AGENT-TASKBOOK]. This proposal selects 8 cases and extracts transferable mechanisms: London King's Cross Central (railway heritage land → knowledge quarter; a "knowledge neighborhood" mechanism, closest to the Jingzhang context); Boston Kendall Square (university-anchored innovation district; a "lab—incubator—anchor" gradient); Singapore one-north (government-led, campus-city integrated "city as campus"); Paris Station F (single-campus operation + event-driven "operation as brand"); Shanghai Zhangjiang Science City (major-facility + park urbanization); Shenzhen Nanshan (hardware test beds and rapid iteration); Hangzhou Yunqi Town (annual conference leveraging developer ecology); and Zhongguancun itself (as a reference frame for this district's differentiation). Each case only extracts a transferable mechanism; no investment figures, company lists, or policy promises are invented.

### agent.1 Overall Concept and Functional Coordination (Naming, Logo, and Visual Identity)

Responding to taskbook agent.1 — "overall concept, primary name, English name and naming system; visual identity and Logo direction" [source:AGENT-TASKBOOK] — this proposal puts forward:

- **Primary name: Jing-Zhang Rail Handoff (京张·接力交路)**, English **Jing-Zhang Rail Handoff Belt**, short form "Rail Handoff". Etymology: 京 = centennial culture, 张 = open tension, 接力交路 = from the railway "locomotive routing" (机车交路) institution — crews do not run the whole route but hand off, sign, and trace each relay segment at routing points, turning a long haul into handoff-able, traceable, reversible short relays. This maps directly onto the innovation chain from seed to delivery: innovation is not done in one pass but relayed at handoff points.
- **Naming system:** belt brand "Jing-Zhang Rail Handoff"; four relay segments "Seed (策源段)", "Transfer (转化段)", "Accelerate (加速段)", "Deliver (交付段)"; three handoff points "Transfer Point·Origin Community", "Accelerate Point·Zhongzhiyuan", "Deliver Point·Dazhongsi"; two relay wings "Zhongguancun Technology Service Wing", "Xiaoyuehe Scenario Empowerment Wing".
- **Motto:** 「一支交路，百年接力」/ "One Rail, a Century of Handoffs".
- **Logo direction:** the "handoff" as the visual motif — two rails crossing at a handoff point forming a handoff/transfer gesture (like a passing hand or a delivery), with the handoff point marked by a "spike/milepost" (道钉/刻度); the repeating unit is a "handoff mileage mark" (echoing the wayfinding system).
- **Visual-identity direction:** palette = heritage gold #c79838, AI indigo #4f46e5, eco green #15803d, deep navy #172235; type and layout serve technical diagrams, maps, and evidence panels — no comics, social cards, or atmospheric illustration as core deliverables.

This naming and visual identity serve overall distinctiveness (the "brand identity" review dimension) and agree with the three positionings, five functions, and three-areas-two-wings spatial organization [data:geometry/site_boundary.geojson#SITE-001]. All brand, font, and imagery must have cleared sources; no city, park, or enterprise names are copied.

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The overall design area must reach the urban-design depth of a regulatory detailed plan. The proposal sets out an overall urban-renewal spatial structure, identification of inefficient space, a renewal project list, implementation-policy recommendations, industrial function ratios, spatial organization patterns, total building scale, and capacity assessment. `geometry/land_use.geojson` fully covers the design boundary without overlap [data:geometry/land_use.geojson#LU-001], `geometry/buildings.geojson` expresses conceptual building footprints [data:geometry/buildings.geojson#BLDG-001], `geometry/roads.geojson` expresses micro-circulation, slow-mobility, and rail connection [data:geometry/roads.geojson#ROAD-001], and `metrics.json` recalculates core areas, ratios, and layer counts.

Following the regulatory-detailed-plan measures [standard:MOHURD-CONTROL-DETAILED-PLANNING], this section is decomposed into reviewable objects: [data:geometry/land_use.geojson#LU-001] for land-use structure, [data:geometry/buildings.geojson#BLDG-001] for building footprints, [metric:building_footprint_area_sqm] for footprint area verification, and [depth:land_use_layout] and [depth:development_intensity_controls] for depth constraints. The overall design also supports transport, rail, municipal, and supporting facilities: spatial layout and implementation paths around station integration, road micro-circulation, non-motorized parking, innovation service platforms, talent living services, new infrastructure, distributed energy, and edge compute [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure].

Because official control conditions are not yet published, all building-height, development-intensity, road-redline, setback, and facility-standard content is treated as "to be confirmed by official regulatory conditions"; this proposal never passes agent-inferred values off as approved indicators. For example, [metric:floor_area_ratio] and [metric:building_height_m] in `metrics.json` are explicitly marked `unknown` / `required_for_formal_submission`; no floor-area-ratio or building-height conclusion is drawn from them.

## Detailed Design of Key Areas

Key-area detailed design is mandatory, checked by [depth:three_key_area_detailed_design] for integrated-implementation-plan depth. The three key areas are expressed in `geometry/key_areas.geojson` as `provisional_constraint` [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] and must be recalculated when official polygons arrive. Positioning (all worded as "conceptual suggestion / reference scheme / to be deepened by professional teams"):

| Key area | Positioning | Spatial moves | AI industry & operations scenarios | Evidence |
| --- | --- | --- | --- | --- |
| Zhongzhiyuan AI Independent Innovation Acceleration Zone | Accelerate handoff point · full-stack independent innovation (Accelerate segment) | Strengthen Qinghe interface, industry display, low-carbon innovation exchange, external transport; green space hosts open testing and standards-governance display | Model red-team testing, standards workshops, safety-governance display, low-carbon compute experience | [data:geometry/key_areas.geojson#PROV-KEY-001], [metric:key_area_area_zhongzhiyuan_ai_acceleration_area_sqm] |
| Beijing AI Origin Community | Transfer handoff point · results translation and talent handoff (Transfer segment) | Slow-mobility stitching of campus, park, and block; complete publication, talent services, living, and open-source collaboration | Open-source publishing hall, results publishing, talent-zone services, campus-adjacent incubation | [data:geometry/key_areas.geojson#PROV-KEY-002], [metric:key_area_area_beijing_ai_origin_community_sqm] |
| Dazhongsi AI Industry Cluster | Deliver handoff point · smart economy and international exchange (Deliver segment) | Dazhongsi station integration, four-quadrant pedestrian connectivity, commercial services, public-environment renewal around anchor enterprises | Agent and smart-terminal display, content consumption, data factors, international roadshows | [data:geometry/key_areas.geojson#PROV-KEY-003], [metric:key_area_area_dazhongsi_ai_industry_cluster_sqm] |

Measured provisional areas are about 192.9 ha (Zhongzhiyuan), 104.3 ha (AI Origin), and 72.0 ha (Dazhongsi), all within 0.5% of the announced values; this is disclosed in [metric:key_area_area_zhongzhiyuan_ai_acceleration_area_sqm], [metric:key_area_area_beijing_ai_origin_community_sqm], and [metric:key_area_area_dazhongsi_ai_industry_cluster_sqm] and measured from the provisional boundary. `compliance_matrix.json` covers announcement tasks 1.5.3.1, 1.5.3.2, 1.5.3.3 respectively.

**Functional zoning and spatial intent per key area** (zoning is shown in the analysis diagram of `assets/figures/key-areas.png`; all are conceptual suggestions):

| Key area | Functional-zoning structure | Spatial intent | Implementation dependencies |
| --- | --- | --- | --- |
| Zhongzhiyuan · Accelerate Handoff Point | "Qinghe low-carbon interface + AI R&D core + standards-governance hall + industry-service street + main-handoff-rail greenway through" | Garden-type full-stack innovation block: greenway as axis, R&D core centered, standards lighthouse as landmark closure, industry services along the street | North-5th-Ring node, Qinghe blue line, external transport organization [depth:three_key_area_detailed_design] |
| AI Origin Community · Transfer Handoff Point | "Handoff plaza + translation core + campus-adjacent edge + talent community + slow-mobility stitching axes" | Campus-adjacent open-source origin: Origin Plaza as publishing origin, stitching east to campus, embedding talent community west | Campus boundary, ownership, station integration [data:geometry/key_areas.geojson#PROV-KEY-002] |
| Dazhongsi · Deliver Handoff Point | "Smart-economy core + twin industry-R&D wings + four-quadrant plaza + composite green" | Urban smart economy: Dazhongsi station as hub, four-quadrant pedestrian connectivity, smart lighthouse as landmark closure | Station, intersections, municipal utilities [data:geometry/key_areas.geojson#PROV-KEY-003] |

![Three key-area index and design task map](assets/figures/key-areas.png)

The `key-areas.png` board uses a three-layer expression — "functional-zoning analysis plan + axonometric intent concept sketch + AI-scenario/circulation annotations". The zoning derives from this proposal's `geometry/land_use.geojson`; the intent sketch is an original axonometric concept (no external imagery); the pilgrimage landmarks (▲), AI scenario nodes (●), and slow-mobility/transport flows (→) correspond to the scenario nodes in `geometry/constraints.geojson`.

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

The plan builds spatial demand personas for AI talent and enterprises, covering R&D office, open-source collaboration, results publishing, enterprise services, talent housing, social learning, consumption, sports/recreation, and international exchange. The taskbook requires at least 10 AI scenario cards, at least 3 industry test/validation scenarios, and at least 5 user personas [source:AGENT-TASKBOOK]. This proposal provides 12 scenario cards, 4 industry test/validation scenarios, and 6 user personas, all anchored to spatial and governance boundaries.

**User personas (6)**

| Persona | Typical needs | Spatial response | Self-check boundary |
| --- | --- | --- | --- |
| Open-source developer | Publish, collaborate, test, community reputation | Origin Community open-source hall, public code wall, night collaboration space | No personal behavior tracking; activity data aggregated only |
| Startup team | Low-cost office, compute entry, product test field | Zhongzhiyuan shared test field, edge-compute service points, standards-governance consultation | Compute and data services require separate authorization |
| Anchor-enterprise visitor | Display, business, international reception, recruiting | Dazhongsi international roadshow hall, station connection, public space around anchors | Enterprise marks and cases must be cleared |
| Nearby resident | Commute, leisure, community services, low-disruption renewal | Heritage Park slow-mobility loop, embedded community services, graded night lighting/events | Resident profiles not used for commercial recommendation |
| University student/faculty | Translation, cross-campus collaboration, daily slow mobility | Campus-park slow stitching, translation stations, AI education experience points | Campus data and research require authorization |
| International visitor | Exhibiting, roadshows, experience, city cognition | Dazhongsi international roadshow hall, bilingual wayfinding, pilgrimage route | Visitor data minimized and anonymized |

**AI scenario cards (12, incl. 4 industry test/validation scenarios)**

| Card | Spatial carrier | Type | Design note |
| --- | --- | --- | --- |
| 01 Model red-team test field | Zhongzhiyuan | Industry test/validation | Open test field for safety evaluation; human review + red-team mechanism [depth:risk_missing_data] |
| 02 Standards-governance sandbox | Zhongzhiyuan | Industry test/validation | Reservable collaboration node for standards, safety evaluation, model alignment |
| 03 Edge-compute measurement point | Overall-design nodes | Industry test/validation | Prototype combining edge compute and low-carbon energy, to be deepened |
| 04 Safety-governance display gallery | Zhongzhiyuan Qinghe interface | Industry test/validation | Translates governance rules into a visitable, supervised public interface |
| 05 Open-source publishing hall | Beijing AI Origin Community | Public service | Results publishing, code-contribution display, small roadshows |
| 06 Campus-enterprise translation lounge | Beijing AI Origin Community | Public service | Incubation, legal, IP, and financing services |
| 07 Talent living steward | Origin Community talent apartments | Living service | Integrated entry for relocation, commuting, community services |
| 08 Dazhongsi international roadshow lounge | Dazhongsi AI Industry Cluster | Public service | Display and negotiation for agent, terminal, and content-consumption firms |
| 09 Data-factor theater | Dazhongsi area | Public service | Compliant, authorized, auditable data-factor circulation interface |
| 10 AI slow-mobility navigation | Heritage Park vitality belt | Public service | Explainable wayfinding and low-intrusion sensing for gaps and crowds |
| 11 Qinghe low-carbon innovation gallery | Zhongzhiyuan riverside interface | Public service | Green space, stormwater, cycling, and AI display combined |
| 12 Global AI event-week route | Belt public-space system | Public service | Walkable route from heritage culture, open source, industry display, to international roadshow |

AI scenarios must land on spatial and governance boundaries: public-space scenarios cite [data:geometry/public_space.geojson#PUBLIC-001], slow-mobility/transport scenarios cite [data:geometry/roads.geojson#ROAD-001], and open-space scenarios cite [data:geometry/green_space.geojson#GREEN-001] together with [metric:public_space_ratio] and [metric:green_ratio]. The 12 scenario nodes are entered into [data:geometry/constraints.geojson#SCENARIO-001] and counted by [metric:scenario_node_count]. AI governance follows data minimization, public sources, explainability, and human review; city agents must not replace planning approval, output unauthorized personal profiles, or claim official implementation commitments [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

**The Rail Handoff Protocol as scenario governance.** This proposal makes "innovation handoff" the unified mechanism for AI-scenario governance: before entering public trial, each scenario must pass three handoff gates in sequence — "seed handoff" (data provenance and clearance), "transfer handoff" (human review and reversibility), and "deliver handoff" (operations ledger and accountable ownership); a scenario may not enter the next segment before the previous one passes. This is isomorphic with the Jingzhang Railway's "relay routing, segment-by-segment signoff" operating discipline, writing traceability into scenario operations — a stance that distinguishes this proposal from approaches that stop at spatial structure.

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The land-use plan follows the national land-space classification [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] and forms a complete, closed, seamless partition (coverage equals [metric:site_area_sqm] with no gaps or overlaps). The structure is framed by "one main handoff rail": the main-handoff-rail greenway and buffers use park green (1401) and protective green (1402) [data:geometry/green_space.geojson#GREEN-001]; the three handoff points use research land (0802) as the core with commercial services (05) and plazas (1403) [data:geometry/public_space.geojson#PUBLIC-001]; residential (0701) and community-service (0702) talent communities sit on both flanks, with education (0804) and culture (0803) nodes embedded at block scale. Every parcel in `land_use.geojson` carries a `land_use_code` consistent with the national classification terminology.

The building plan distinguishes retain / renovate / renew / new-build / to-be-confirmed objects and defines recommended levels of footprint, function, scale, character, roof, massing, and height [depth:height_massing_character] [depth:retain_renovate_demolish]. This proposal's conceptual [metric:building_footprint_area_sqm] is about 398,000 m² with a conceptual building density of about 3.5% [metric:building_density] — a conceptual spatial-supply estimate, not a regulatory conclusion; where existing buildings, ownership, regulatory plans, and engineering conditions are missing, only methods and a to-be-calibrated list are offered, with no fabricated retain-renovate-demolish conclusions. Building types use `enums/building_types.json` (ai_r_and_d, lab, incubator, office, mixed_use, talent_apartment, community_service, retail, cultural, education, existing_retained); example [data:geometry/buildings.geojson#BLDG-001].

## Transport, Rail, Municipal Infrastructure, and Public Services

The transport plan responds to the announcement's requirements on station integration, road micro-circulation, slow-mobility gaps, external transport, parking, non-motorized parking, and green transport [depth:traffic_rail_slow_parking]. This proposal builds a "main-handoff-rail greenway + three-station connection + pedestrian stitching axes" composite network: the main-handoff-rail greenway runs north–south along the heritage corridor ([data:geometry/roads.geojson#ROAD-001]); three rail connections at Wudaokou, Qinghua East Road West, and Dazhongsi stations are expressed as `transit_connection` ([data:geometry/constraints.geojson#CONST-RAIL-001]); and key areas are stitched with `pedestrian` and `cycleway` links across campus, park, and block. Total road mileage is about 15.6 km [metric:road_length_m]. The North 5th Ring interface is shown as an existing arterial [data:geometry/constraints.geojson#CONST-ROAD-001] with no new engineering conclusions.

Municipal and public-service facilities cover AI industry services, innovation service platforms, talent living services, new infrastructure, distributed energy, edge compute, and integration with conventional utilities [depth:municipal_new_infrastructure]. Where pipeline, energy, drainage, flood-control, and fire-protection data are missing, they are listed as prerequisites for formal deepening via `missing_data_checklist.csv` under [source:PROCESSED-FACT-PACK]. If the submitted boundary is provisional, transport conclusions remain temporary design discussion only.

![Composite system of slow mobility, blue-green space and public space](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

The blue-green plan uses the Jingzhang Heritage Park vitality belt as the spine, coordinating Qinghe, Xiaoyuehe, universities, enterprises, and community mobility to propose a north–south-through and east–west-connected network of paths, cycleways, and green space [depth:blue_green_public_space]. This proposal's green and open space is about 4.12 million m² with a green ratio of about 36.1% [metric:green_space_area_sqm] [metric:green_ratio], and public space about 248,000 m² with a public-space ratio of about 2.2% [metric:public_space_area_sqm] [metric:public_space_ratio]. The main-handoff-rail greenway (1401) plus protective green (1402) [data:geometry/green_space.geojson#GREEN-001] and plazas (1403) [data:geometry/public_space.geojson#PUBLIC-001] form a slow-mobility composite loop, identifying gaps, overpass nodes, and park north/south landscape nodes, with composite-use strategies for parking, sports, innovation exchange, tech testing, application display, and public services. Urban-design management measures require coordinating landscape character, public space, and building controls [standard:MOHURD-URBAN-DESIGN-MEASURES].

Urban character fuses Jingzhang railway history, Zhongguancun innovation culture, and AI new culture, drawing on cultural resources such as Qinghuayuan Railway Station, to propose city tone, building character, roof form, massing, interface, and public-art guidance [depth:height_massing_character]. Character controls separate official control from design suggestion and to-be-confirmed conditions; no pseudo-precise control lines are drawn without heritage or regulatory basis.

### agent.4 AI Public Space, Native Smart Formats, and Pilgrimage Landmarks

Responding to taskbook agent.4 — "AI public space, native smart formats, pilgrimage landmarks (at least 3), and honor-display system" [source:AGENT-TASKBOOK] — this proposal offers 4 "Rail-Handoff pilgrimage landmarks" and an honor-display system, all worded as conceptual suggestions:

| Landmark | Key area | Design direction | Honor/display function |
| --- | --- | --- | --- |
| Qinghuayuan Station heritage · Departure origin | AI Origin Community | Station heritage as the seed origin, linking century-old rail and century-old AI | Century Jingzhang memory exhibition; tribute node to Zhan Tianyou and herringbone track |
| Rail-Handoff Plaza | AI Origin Community | Public plaza at the transfer handoff point for results handoff; handoff-gesture sculpture | Developer contribution column, handoff-signoff wall, annual contributor inscriptions |
| Dazhongsi Smart Lighthouse | Dazhongsi AI Industry Cluster | Deliver-handoff-point smart-economy display lighthouse facing the city and rail node | Annual agent/terminal releases and honor display |
| Qinghe Low-Carbon Lounge | Zhongzhiyuan AI Independent Innovation Acceleration Zone | Accelerate-handoff-point low-carbon innovation exchange interface by the Qinghe | Open-source results gallery; standards-governance public-review node |

Landmarks and the honor system map to [data:geometry/constraints.geojson#SCENARIO-001] scenario nodes and [metric:landmark_count] / [metric:scenario_node_count], and are part of the [depth:blue_green_public_space] public-space component library. The honor system keeps public, traceable, updatable contribution records, avoids over-entertainment or internet-viralization, and all memorial content must be copyright-cleared. The Dazhongsi area layers in "native smart formats": smart-terminal display, content consumption, data factors, and international roadshows — all as conceptual suggestions.

### agent.5 Narrative: Jingzhang Railway, Zhongguancun, and AI New Culture

Responding to taskbook agent.5 — "Jingzhang railway historical resources; Zhongguancun innovation culture and AI new-culture narrative; wayfinding, signage, and symbol system; city character and international communication narrative" [source:AGENT-TASKBOOK] — this proposal organizes a "three-source narrative": the **railway source** (1909, Zhan Tianyou's self-built railway and herringbone track, engineering independence) plus the **Zhongguancun source** (from electronics street to science city, market-driven innovation) plus the **AI new-culture source** (open source, co-governance, human-machine collaboration). The three sources are threaded by the "main handoff rail" to form a public narrative from "locomotive routing to innovation handoff" — the railway completed its haul by relay routing, and today's AI innovation completes seed-to-delivery by relay handoff — avoiding culture-as-decoration.

- **Wayfinding direction:** the "handoff mileage" system — bilingual, landmark-style wayfinding placed at historical mileages along the main-handoff-rail greenway, combined with screen-free tactile markers and accessible signage for domestic, international, and disabled visitors.
- **Spatial cultural carriers:** the departure, transfer, accelerate, and deliver segments tell the story in sequence; Qinghuayuan Station is the departure origin, the Rail-Handoff Plaza the transfer origin, and the Dazhongsi Smart Lighthouse the delivery origin.
- **International communication narrative:** unified under "One Rail, a Century of Handoffs", foregrounding the world-rare combination of "railway relay × AI innovation handoff" to serve the international-communication review dimension.

The narrative and signage system must be positioned separately from the agent.1 belt Logo/visual system (cultural signage ≠ belt brand), and must respect heritage and copyright boundaries.

## Renewal Projects, Implementation Policy, and Phasing

The implementation plan forms a reviewable renewal project list covering location, type, function, responsible party, dependencies, phasing, risk, and evaluation metrics [depth:renewal_project_list]. `geometry/phasing.geojson` expresses three phases [data:geometry/phasing.geojson#PHASE-001]: near-term pilot about 6.53 million m² [metric:phase_1_area_sqm] (three handoff points + main-handoff-rail spine; light facilities, operations, and service platforms start first); mid-term linkage about 0.97 million m² [metric:phase_2_area_sqm]; long-term depth about 3.91 million m² [metric:phase_3_area_sqm]. Phasing depth is governed by [depth:phasing_implementation].

| No. | Project | Type | Main dependencies | Evidence |
| --- | --- | --- | --- | --- |
| JZ-01 | Heritage Park slow-mobility gap stitching | Public space/transport | Road redlines, underpass space, transport review | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Zhongzhiyuan Qinghe innovation interface | Blue-green/industry display | River blue lines, ecology, flood control | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | Origin Community campus translation street | Renewal/industry services | Campus boundary, ownership, ground-floor uses | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | Dazhongsi station four-quadrant pedestrian connectivity | Rail integration/slow mobility | Station, intersections, utilities | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI public services and edge-compute nodes | New infrastructure/public services | Energy, compute, safety, operator | [data:geometry/constraints.geojson#CONST-RAIL-001] |
| JZ-06 | Global AI event-week public route | Operations/brand | Public-space permits, event safety, copyright | [data:geometry/phasing.geojson#PHASE-001] |

Policy recommendations cover coordinated renewal implementation, spatial supply, operations mechanisms, industry services, public participation, data governance, and property coordination. If ownership, funding, implementing parties, or approval paths are missing, a project is written as an implementation risk, not a commitment.

### agent.6 Global AI Innovation Event System and Long-Term Operations

Responding to taskbook agent.6 — "annual event system; event brand and communication visuals; developer-community operations; AI scenario-open operations; public experience and landmark operations; international communication and attraction-to-conversion mechanisms" [source:AGENT-TASKBOOK] — this proposal answers with a "Rail-Handoff operations" mechanism (all conceptual, no government commitments or fixed arrangements):

- **Annual event system:** the Jing-Zhang Relay Handoff Festival (flagship, themed "one rail per year"), Scenario Open Days (periodic), Developer Week (annual), and the International Rail-Handoff Prize (annual, honoring teams that successfully hand off innovation to the next leg); routes follow the [data:geometry/phasing.geojson#PHASE-001] public-space system.
- **Event brand and communication visuals:** reuse the agent.1 visual system for a consistent event–communication–landmark language; bilingual content to serve international communication.
- **Developer-community operations:** organize collaboration around "handoff" — code/results are submitted, merged, and handed off at handoff points (the agent.4 handoff-signoff wall), contributor honor points, public hosting of data and code assets, agent sandbox open testing — a "submit—handoff—merge" loop.
- **AI scenario-open operations:** open the model red-team field and standards sandbox via "public testing + appointment-based sandbox" [data:geometry/constraints.geojson#SCENARIO-001], with clear data boundaries, human review, and exit mechanisms.
- **Public experience and landmark operations:** landmarks and the main-handoff-rail greenway start with light facilities, events, and service platforms (the near-term pilot of [metric:phase_1_area_sqm]).
- **International communication and attraction-to-conversion:** a "pilot → procurement → settlement" path for international enterprises, developers, and talent, with clear conversion metrics and risk disclosure — no exaggerated outcomes, no written promises on investment attraction, policy, or funding.

This operations system, together with the renewal project list and phasing, forms the reviewable evidence for agent.6, checked for implementation boundaries by [depth:phasing_implementation] and [depth:risk_missing_data].

## Metrics, Area Recalculation, and Compliance Matrix

The metrics system at minimum covers overall-design area, key-area areas, green and public-space ratios, building footprints, renewal-project count, AI scenario nodes, slow-mobility indicators, industrial-space indicators, talent-service indicators, and self-check status [depth:metrics_recalculation]. All known metrics must be recalculable from GeoJSON or trusted sources; unknown metrics must state a reason and formal prerequisites. The results of `scripts/spatial_review.py` and `scripts/visual_review.py` are key formal self-check evidence.

The overall-design area, green and public-space ratios, building footprints, key-area areas, and phase areas are all recomputed from the geometry in EPSG:4548 ([data:geometry/site_boundary.geojson#SITE-001]). The full metric-to-evidence table follows; individual chapters also cite the relevant metrics in place:

| Metric | Evidence source |
| --- | --- |
| Overall design area | [metric:site_area_sqm] · [data:geometry/site_boundary.geojson#SITE-001] |
| Key-area count | [metric:key_area_count] · [data:geometry/key_areas.geojson#PROV-KEY-001] |
| Green & open space | [metric:green_space_area_sqm] · [metric:green_ratio] · [data:geometry/green_space.geojson#GREEN-001] |
| Public space | [metric:public_space_area_sqm] · [metric:public_space_ratio] · [data:geometry/public_space.geojson#PUBLIC-001] |
| Building footprint | [metric:building_footprint_area_sqm] · [metric:building_density] · [data:geometry/buildings.geojson#BLDG-001] |
| Road/greenway mileage | [metric:road_length_m] · [data:geometry/roads.geojson#ROAD-001] |
| Zhongzhiyuan area | [metric:key_area_area_zhongzhiyuan_ai_acceleration_area_sqm] |
| AI Origin Community area | [metric:key_area_area_beijing_ai_origin_community_sqm] |
| Dazhongsi area | [metric:key_area_area_dazhongsi_ai_industry_cluster_sqm] |
| Near-term pilot | [metric:phase_1_area_sqm] |
| Mid-term linkage | [metric:phase_2_area_sqm] |
| Long-term depth | [metric:phase_3_area_sqm] |
| AI scenario nodes | [metric:scenario_node_count] |
| Pilgrimage landmarks | [metric:landmark_count] |

![Core metrics recalculation and evidence chain](assets/figures/metrics-evidence.png)

The compliance matrix is the master file for task responsiveness: `compliance_matrix.json` covers all 17 announcement tasks in sections 1.3, 1.4, 1.5 and the six agent tasks agent.1–agent.6, each mapped to report sections, layers, metrics, drawings, HTML sections, sources, assumptions, and self-checks. A plan missing any mandatory task cannot enter formal professional scoring. On formal deepening, metrics are split into three classes: spatial metrics directly recomputed from submitted geometry; control metrics requiring official regulatory-plan support (FAR, height, density, setback, redlines, facility standards); and performance metrics requiring operations data (innovation index, talent density, event participation, scenario usage), entered into `metrics.json`, `assumptions.json`, and `compliance_matrix.json` respectively.

## Risk, Copyright, and Compliance

The primary file is Chinese, with `proposal.en.md` as a full counterpart translation (a missing translation is a non-blocking warning only). Risk and missing-data lists are governed by [depth:risk_missing_data] and cross-checked against [data:geometry/constraints.geojson#CONST-RAIL-001], [source:SITE-PACKAGE], [source:PROCESSED-FACT-PACK], and [standard:MOHURD-CONTROL-DETAILED-PLANNING]. The official boundary, key-area, regulatory, road, parcel, building, municipal, heritage, and public-service gaps listed in `missing_data_checklist.csv` have been entered into `assumptions.json` and the self-check risk section. Any conclusion missing official regulatory plans, road redlines, ownership, municipal, fire, or heritage conditions is downgraded to a to-be-confirmed item and does not constitute an implementation commitment.

All images, drawings, icons, data, and code assets in this proposal state source, license, and authorization in `report/copyright_statement.md`. The HTML pages (`visual/index.html`, `report/proposal.html`) load no remote scripts, remote map tiles, remote fonts, iframes, forms, or external APIs, and do not track reviewers. This proposal does not claim official approval, approved regulatory plans, final land ownership, final construction scale, or guaranteed implementation; the AI agent is responsible for facts, sources, copyright, spatial data, metrics, and expression.

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/agent_taskbook.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- brief/site-package/geometry/provisional_boundaries.geojson
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- data/processed/agent_task_requirements.csv
- data/processed/source_use_matrix.csv
- data/processed/missing_data_checklist.csv
- docs/terminology-glossary.md
- Machine-readable reference index (full evidence chain lives in `sources.json`, `standard_matrix.json`, `design_depth_matrix.json`, and `metrics.json`):
  - Primary basis: announcement [source:OFFICIAL-ANNOUNCEMENT] and taskbook [source:AGENT-TASKBOOK]
  - Site package & registry: [source:SITE-PACKAGE] · [source:SOURCE-REGISTRY] · [source:PROCESSED-FACT-PACK]
  - Boundary & key areas: [source:BOUNDARY-SOURCE] · [source:KEY-AREA-SOURCE]
  - Professional standards: [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] · [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] · [standard:MOHURD-URBAN-DESIGN-MEASURES]
  - More standards: [standard:MOHURD-CONTROL-DETAILED-PLANNING] · [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] · [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]
  - Depth & metrics: [depth:metrics_recalculation] · [data:geometry/site_boundary.geojson#SITE-001] · [metric:site_area_sqm]
