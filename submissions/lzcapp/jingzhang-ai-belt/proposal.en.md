---
title: "Centennial Jing-Zhang AI Innovation Belt · Smart-Corridor Urban Design Proposal"
author_github: "lzcapp"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A formal AI urban-design package built on a provisional boundary and structured self-checks; precision caveats and metric recalculation are preserved, but the organizer data gap does not block content scoring."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# Centennial Jing-Zhang AI Innovation Belt · Smart-Corridor Urban Design Proposal

## Design Basis and Source Registry

This formal proposal takes the Pre-Qualification Announcement for the Centennial Jing-Zhang AI Innovation Belt Urban Design International Call (issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources) as its primary basis, and uses the maintainer-registered provisional coarse boundary, key areas, enums, metrics and source registry under `brief/site-package/` as machine-readable evidence. Before generating the design, the AI agent must read `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json` and `data/processed/agent_fact_pack.md`, and use `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv` and `missing_data_checklist.csv` to build the task, scope, source-use and gap inventory. Every design judgement is decomposed into traceable sources, recalculable metrics, verifiable layers and human-reviewable assumptions. The announcement requires the proposal to reach the urban-design depth of a regulatory-detailed plan and a comprehensive implementation plan, so narrative text cannot replace GeoJSON, the metric table, the A3 booklet, the A0 boards and the HTML deliverables.

The evidence chain cites [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE], [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] and [depth:existing_conditions_diagnosis].

This package is generated under the organizer's provisional boundary: `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` are marked `provisional_constraint`, `official_boundary=false`, and may only be used for generation, self-check, visualization and design discussion — never as an official redline, approval basis, precise-area basis or statutory control conclusion. This organizer data gap does not block content scoring; once official polygons are supplied, site boundary, key areas, land use, roads, green space, public space, buildings, phasing and metrics must all be recalculated.

## Three-Level Scope Working Framework

The proposal organizes work along the three tiers set by the announcement: the strategic research scope (~43.6 km²) focuses on the AI industry ecosystem, positioning, innovation chain and future urban form; the overall design scope (~11.4 km², around the Jing-Zhang heritage park within 1–2 km) requires an urban-renewal framework, industry-space layout, transport/municipal support and urban-character control; the key-area scope (~368.4 ha, three detailed-design districts) requires explicit program, building scale, retain-renovate-demolish classification, public-space connectivity and transport organization. The three tiers are mapped item-by-item in `compliance_matrix.json`.

The depth items of the three-level framework are governed by [depth:three_level_scope_framework] and [depth:overall_spatial_structure]; spatial evidence follows [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#PROV-KEY-001]; the task basis is [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

The overall concept is the "Jing-Zhang Smart Pulse Symbiosis Belt": the Jing-Zhang heritage park as the historic and public-space spine, the three key districts (Zhongzhiyuan, Beijing AI Origin Community, Dazhongsi) as innovation anchors, and universities, enterprises, communities and rail stations as the daily network — forming a spatial organization of "one belt, three cores, multiple scenario nodes, and a blue-green slow-mobility composite ring".

## Strategic Research Scope: Industry and Future-City Study

The strategic scope builds a world-class AI innovation ecosystem. The proposal maps Haidian's universities, leading enterprises, compute/algorithm/data factors, incubators, listed firms, unicorns and tech services, and proposes a spatial coordination framework for the AI innovation chain, industry chain, talent chain and urban-service chain. Naming and visual identity must serve the integrated identity of "Centennial Jing-Zhang cultural belt, urban AI living-experience belt, AI fusion-innovation belt", linked to the industry ecosystem, public space and cultural resources. Per the agent open-call taskbook, the proposal must respond to the "five major functions" and the "three zones, two wings" coordination, using [source:AGENT-TASKBOOK] and [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] to mark these as agent-call tasks, not statutory planning controls.

Future urban form answers how AI changes work, life, socializing, learning, transport and public services. The proposal places AI transport systems, continuous green space, innovation-service facilities and an international living-working atmosphere into locatable function zones, nodes, corridors and scenarios. Strategic indicators — innovation index, talent density, spatial-supply typology, AI+ vertical-focus districts — are written into the metric system with explicit status (official / design suggestion / pending calibration). Global AI events, developer communities and pilgrimage routes are described as "concept suggestions / reference schemes / for further professional deepening", never as confirmed government activities.

## Overall Design Scope: Urban-Renewal and Regulatory-Depth Urban Design

The overall design scope reaches regulatory-detailed-plan urban-design depth. `geometry/land_use.geojson` must fully cover the design boundary with no overlap; `geometry/buildings.geojson` expresses renewal or retained building footprints; `geometry/roads.geojson` expresses micro-circulation, slow mobility and rail connection; `metrics.json` recalculates core areas, ratios and layer counts.

This section applies [standard:MOHURD-CONTROL-DETAILED-PLANNING] to decompose regulatory-depth content: [data:geometry/land_use.geojson#LU-001] for land-use structure, [data:geometry/buildings.geojson#BLDG-001] for building footprints, [data:geometry/roads.geojson#ROAD-001] for transport organization, [metric:building_footprint_area_sqm] for footprint area, [depth:land_use_layout] and [depth:development_intensity_controls] for depth.

The overall design must also support transport, rail, municipal and supporting facilities — rail-station integration, road micro-circulation, non-motorized parking, parking supply, innovation-service platforms, talent living services, new infrastructure, distributed energy and edge compute. Where official control conditions are absent, content is written as "pending official regulatory confirmation", never as agent-inferred definitive values.

## Key-Area Detailed Design

The three key areas are mandatory. Zhongzhiyuan AI autonomous-innovation acceleration district centers on the national AI platform, full-stack autonomous innovation, standards, safety governance, industry showcase, external transport, Qinghe culture, and a low-carbon green innovation environment with green-space AI scenarios. Beijing AI Origin Community centers on near-campus innovation, achievement incubation, talent zone, open-source system, brand events, retain-renovate-demolish, achievement showcase, living amenities, and campus-park slow connectivity with rail-station integration. Dazhongsi AI industry cluster centers on leading enterprises, agents, smart terminals, content consumption, data factors, digital assets, commercial services, planned-green-space composite use, Dazhongsi-station integration and four-quadrant pedestrian connectivity.

All three must cite [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003], and are checked by [depth:three_key_area_detailed_design] for comprehensive-implementation-plan depth. Vague "demonstration zone" descriptions without program, building, transport, public-space and implementation evidence are treated as incomplete.

## AI Innovation Ecosystem, Personas and AI+ Scenarios

The proposal builds spatial-need personas for AI talent and enterprises — R&D office, open-source collaboration, achievement release, enterprise services, talent housing, social learning, consumption, sport, international exchange. AI+ scenarios follow the announcement's transport, service, consumption, medical, education, legal and living-service directions, forming industry-development and AI-enabled urban-function scenarios; each scenario states service object, location, data source, privacy boundary, human-review mechanism and operating entity.

AI scenarios are anchored to spatial and governance boundaries: public-space scenarios cite [data:geometry/public_space.geojson#PUBLIC-001], mobility/transport scenarios cite [data:geometry/roads.geojson#ROAD-001], open-space scenarios cite [data:geometry/green_space.geojson#GREEN-001] and [metric:public_space_ratio], [metric:green_ratio]. AI governance follows data-minimization, open-source, explainability and human-review; city agents may assist in identifying slow-mobility gaps, public-space heat, facility maintenance, enterprise-service demand and event-safety risk, but cannot replace planning approval, output unauthorized personal profiles, or claim official implementation commitments.

## Land Use, Building Scale and Retain-Renovate-Demolish

Land use follows public standards for territorial spatial survey, planning and use regulation, forming a complete, closed, seamless partition. Buildings distinguish retained, renovated, renewed, new or to-be-confirmed objects, stating footprint, function, scale, character, roof, massing and height-control suggestion tiers. Where existing buildings, ownership, regulatory plan and engineering conditions are missing, only methods and a to-be-calibrated list may be proposed — no fabricated retain-renovate-demolish conclusions.

Land classification follows [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; height, massing, interface and character are governed by [depth:height_massing_character]; retain-renovate-demolish by [depth:retain_renovate_demolish]. Primary evidence: [data:geometry/land_use.geojson#LU-001], [data:geometry/buildings.geojson#BLDG-001] and [metric:building_footprint_area_sqm].

Building scale and intensity must agree with `metrics.json` and layers. Where total floor area, FAR, height, building density, green ratio, setback and building-control lines lack official conditions, they are listed as unknown or pending_control — never fixed numbers implying precision. The A3 booklet gives the renewal list and a metric recalculation table; the A0 boards show key spatial structure and key districts; the HTML page links metrics and layers.

## Transport, Rail, Municipal and Public-Service Facilities

Transport responds to the announcement's requirements for rail-station integration, road micro-circulation, slow-mobility gaps, external transport, parking, non-motorized parking and green transport, covering the North 5th Ring Road, the Jing-Zhang heritage-park cross-ring node, Wudaokou, Qinghua East Road West Gate, Dazhongsi station and key-enterprise connections. Road and slow-mobility layers stay within the submission boundary and cross-check with public space, green space, industry nodes and key districts; under a provisional boundary, transport conclusions are temporary design discussion only.

Transport and municipal depth are governed by [depth:traffic_rail_slow_parking] and [depth:municipal_new_infrastructure]; layer evidence cites [data:geometry/roads.geojson#ROAD-001], [data:geometry/public_space.geojson#PUBLIC-001] and [data:geometry/constraints.geojson#CONSTRAINTS]. Where road redlines, pipelines, fire and municipal conditions are missing, assumptions state the gap rather than presenting strategy as approved conditions.

Municipal and public services cover AI industry-service facilities, innovation-service platforms, talent living services, new infrastructure, distributed energy, edge compute and traditional municipal fusion. Standards, layout, service radius, operating model and phasing must be stated; missing pipeline, energy, drainage, flood, fire engineering data are listed as formal-deepening prerequisites.

## Blue-Green Space, Public Space and Urban Character

Blue-green space takes the Jing-Zhang heritage-park vitality belt as the skeleton, coordinating the Qinghe and Xiaoyue rivers and the travel demand of surrounding universities, enterprises and communities, proposing a north-south through, east-west connected trail, cycleway and green-space system, identifying slow-mobility gaps, over-ring nodes, and north/south landscape nodes, with strategies for parking, sport, innovation exchange, tech testing, application showcase and public-service composite use.

Blue-green public space is checked by [depth:blue_green_public_space]; core evidence is [data:geometry/green_space.geojson#GREEN-001], [data:geometry/public_space.geojson#PUBLIC-001], [metric:green_ratio] and [metric:public_space_ratio]; the urban-design management measure [standard:MOHURD-URBAN-DESIGN-MEASURES] governs landscape, public space and building control.

Urban character fuses Jing-Zhang railway heritage, Zhongguancun innovation culture and AI innovation culture, using resources such as the Tsinghua Garden station and Beijing Film Academy, proposing urban tone, building character, roof form, massing, interface and public-art guidance. Wayfinding, cultural symbols, international narrative, AI pilgrimage landmarks and a contribution/honor wall are proposed, but all brands, fonts, images, portraits and enterprise marks must have cleared rights. Character control separates official control, design suggestion and to-be-confirmed conditions; no pseudo-precise control lines without heritage or regulatory basis.

## Renewal Project List, Implementation Policy and Phasing

The implementation forms a reviewable renewal project list — location, type, function, responsible entity, dependencies, phase, risk and evaluation indicators. Policy covers urban-renewal coordination, spatial supply, operating mechanism, industry service, public participation, data governance and property-right coordination. `geometry/phasing.geojson` expresses phasing; `compliance_matrix.json` links each task to phasing and drawings.

Project list and phasing depth are governed by [depth:renewal_project_list] and [depth:phasing_implementation]; spatial evidence is [data:geometry/phasing.geojson#PHASE-001]. Without ownership, funding, implementing entity and approval path, the item is written as implementation risk, not a landing promise.

Phasing is distinct from the 100-day submission cycle: the cycle is a deliverable deadline; phasing is the urban-renewal and construction path — near-term pilots, mid-term renewal, long-term governance. Items that can start with light facilities, operating activities and service platforms are separated from those awaiting official regulatory, municipal, transport and ownership confirmation. Annual events, developer-community operation, scenario open days, public-experience routes and international communication are described with object, frequency, responsibility boundary, conversion path and risk.

## Metrics, Area Recalculation and Compliance Matrix

The metric system includes overall-design area, key-area area, green and public-space ratios, building footprint, renewal-project count, AI scenario nodes, slow-mobility connectivity, industry-space indicators, talent-service indicators and self-check status. All known metrics are recalculable from GeoJSON or trusted sources; unknown metrics state reasons and formal-submission prerequisites. `scripts/spatial_review.py` and `scripts/visual_review.py` are key formal self-check evidence.

Metric recalculation depth is governed by [depth:metrics_recalculation]. This proposal explicitly cites all ten known metrics: [metric:site_area_sqm], [metric:green_space_area_sqm], [metric:public_space_area_sqm], [metric:building_footprint_area_sqm], [metric:green_ratio], [metric:public_space_ratio], [metric:building_density], [metric:key_area_count], [metric:key_area_total_area_sqm], [metric:phasing_area_sqm], sourced from [data:geometry/site_boundary.geojson#SITE-001], [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/buildings.geojson#BLDG-001], [data:geometry/green_space.geojson#GREEN-001] and [data:geometry/public_space.geojson#PUBLIC-001].

Quick metrics (recalculated from submitted geometry in EPSG:4548; precision limited by the provisional boundary, to be fully recalculated on official redline): site area [metric:site_area_sqm] = 11.41 km²; blue-green space [metric:green_space_area_sqm] = 2.12 km²; public space [metric:public_space_area_sqm] = 0.76 km²; building footprint [metric:building_footprint_area_sqm] = 3.11 km²; green ratio [metric:green_ratio] = 18.6%; public-space ratio [metric:public_space_ratio] = 6.7%; building density [metric:building_density] = 27.2%; key-area count [metric:key_area_count] = 3; key-area total area [metric:key_area_total_area_sqm] = 3.69 km²; phasing total area [metric:phasing_area_sqm] = 11.41 km². FAR, building height and total floor area are marked unknown in `metrics.json`, pending official regulatory support.

The compliance matrix is the master file for task responsiveness: every announcement task and agent_taskbook task maps to a report section, layer, metric, drawing, HTML page, source, assumption and self-check item. Failure to cover any mandatory task in announcement 1.3/1.4/1.5 or agent.1–agent.6 blocks formal professional scoring.

## Risk, Copyright and Compliance

The main proposal may be Chinese or English, with a full counterpart via `proposal.en.md` or `proposal.zh.md`; a missing translation yields only a non-blocking warning. A3/A0, HTML and text-bearing drawings should provide corresponding-language copies, preferring the event's recommended terminology. All images, drawings, icons, data and code assets must state source, license and authorization status in `sources.json` or `report/copyright_statement.md`. HTML pages must not load remote scripts, remote map tiles, remote fonts, iframes, forms or external APIs, and must not track reviewers.

Risk and missing-data items are governed by [depth:risk_missing_data] and cross-checked with [data:geometry/constraints.geojson#CONSTRAINTS], [source:SITE-PACKAGE], [source:PROCESSED-FACT-PACK] and [standard:MOHURD-CONTROL-DETAILED-PLANNING]. The official-boundary, key-area, regulatory-plan, road, parcel, building, municipal, heritage and public-service gaps in `missing_data_checklist.csv` must enter `assumptions.json`, self-check and the risk section. Any conclusion lacking official regulatory plan, road redline, ownership, municipal, fire or heritage conditions is downgraded to to-be-confirmed.

This proposal does not claim official approval, finalized regulatory plan, final land ownership, final construction scale or guaranteed implementation. The AI agent is responsible for facts, sources, copyright, spatial data, metrics and expression; maintainers and professional reviewers may require revision or reject based on self-check results, spatial review and the compliance matrix.

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
- Machine-readable index: [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [depth:metrics_recalculation], [data:geometry/site_boundary.geojson#SITE-001], [metric:site_area_sqm]
