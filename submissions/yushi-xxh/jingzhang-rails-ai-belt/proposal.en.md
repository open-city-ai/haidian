---
title: "Centennial Jingzhang AI Symbiosis Belt — A Trinity Proposal for Rail Heritage, AI Foundation, and Haidian's Future City"
author_github: "MiniMax-agent"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A formal AI urban design submission for the Centennial Jingzhang AI Innovation Belt. Anchored on the 1909 Jing-Zhang Railway, the proposal frames a 'One Spine · Three Cores · Ten Scenarios · Five-Chain Symbiosis' framework that turns Zhongzhiyuan, the Beijing AI Origin Community, and Dazhongsi into an R&D / showcase / living AI foundation. All boundary, key-area, and regulatory conclusions are marked as provisional_constraint; the naming, logo direction, scenario cards, cultural narrative and long-term operation system are all traceable to GeoJSON, metrics, matrices and local figures."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.0"
---

# Centennial Jingzhang AI Symbiosis Belt — A Trinity Proposal for Rail Heritage, AI Foundation, and Haidian's Future City

> This is the English counterpart of `proposal.md`. The Chinese version is the main proposal; this file provides a complete standalone translation for international reviewers and AI agents. Per the taskbook, missing translations produce non-blocking warnings only and do not prevent submission, merge or content review.

## Source Inventory and Design Basis

This formal package takes the Beijing Municipal Commission of Planning and Natural Resources Haidian Sub-bureau's "Centennial Jingzhang AI Innovation Belt International Urban Design Open Call — Pre-qualification Announcement" (2026-05-09) as its primary official reference, and uses the maintainer-registered provisional boundaries, key areas, enums, ranges, sources and source-use matrix in `brief/site-package/` as machine-readable inputs. The agent reads `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json`, and `data/processed/agent_fact_pack.md` before any generation, and uses `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, and `missing_data_checklist.csv` to organise tasks, scope, source usability, and data gaps. Every design judgement is split into a traceable source, a recomputable metric, a verifiable layer and an assumption that can be reviewed by a human expert.

Source registry usage boundary:

- `data/source_registry.json` registers the use boundary of public, cleared and provisional sources.
- Current summary: 5 sources usable for formal; 0 background-only; 1 provisional-only.
- The agent must not promote background_only or provisional_only sources to official boundary, statutory planning control, formal scoring evidence, or confirmed government implementation commitments.

`data/processed/agent_fact_pack.md` is a navigation layer for reading this proposal; it is not a new authoritative source. `[source:PROCESSED-FACT-PACK]` only helps the agent organise the three scope levels, three key areas, public-call tasks `agent.1-agent.6`, source usability, and missing-data items into a readable package. All factual claims still come from `[source:OFFICIAL-ANNOUNCEMENT]`, `[source:AGENT-TASKBOOK]`, `[source:SOURCE-REGISTRY]`, `[source:BOUNDARY-SOURCE]` and `[source:KEY-AREA-SOURCE]`.

![Source evidence chain and submission package relationship](assets/figures/site-overview.png)

While the official `SITE_BOUNDARY` and three `KEY_AREA` polygons are not yet available, this scaffold uses the repository's `brief/site-package/geometry/provisional_boundaries.geojson` to generate a temporary formal package. The submitted `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` must be tagged `provisional_constraint`, `official_boundary=false`, and can only be used for generation, self-check, visualisation and design discussion — they are not an official redline, approval basis, precise area basis, or statutory control conclusion. The organiser-side data gap itself does not block content scoring. After replacement with official polygons, site boundary, key areas, land use, roads, green space, public space, buildings, phasing and metrics must be recomputed.

The reviewable state of this scaffold is: **temporary boundary, precision warnings retained, to be recomputed after official data release; does not block content scoring**. Therefore, the spatial structure, scenarios, projects and metrics in the main text are written on a "discussable · reviewable · recomputable after replacing the official boundary" basis; once the official boundary and key-area polygons are released, the agent must rerun the scaffold, self-check and figure / HTML generation. Replacing a single file is not allowed.

The readable interpretation of boundaries and key areas corresponds to `[data:geometry/site_boundary.geojson#SITE-001]`, `[data:geometry/key_areas.geojson#PROV-KEY-001]`, `[metric:site_area_sqm]`, and `[metric:key_area_count]`. This means the reader can move from prose to GeoJSON to see boundary provenance, from metrics to see recomputed areas, and from sources to see the original material — instead of trusting only a textual judgement.

## Three-Level Scope Working Framework

The package organises work according to the three levels announced in the official announcement:

- **Coordinated research area (43.6 km²)**: AI industrial ecosystem, strategic positioning, innovation chain and future city form.
- **Overall design area (11.4 km²)**: Urban-renewal spatial framework around a 1–2 km corridor of the Jing-Zhang Heritage Park, including industry space layout, transportation and municipal support, and city character control.
- **Key detailed-design area (368.4 ha)**: Three detailed-design districts — Zhongzhiyuan AI Acceleration Area, Beijing AI Origin Community, and Dazhongsi AI Industry Cluster.

The three-level framework is mapped in `compliance_matrix.json` for every required task in sections 1.3, 1.4, 1.5 and `agent.1-agent.6`, ensuring that each task has a section, layer, metric, drawing and HTML evidence.

The depth of the three-level framework is constrained by `[depth:three_level_scope_framework]` and `[depth:overall_spatial_structure]`. Spatial evidence is `[data:geometry/site_boundary.geojson#SITE-001]` and `[data:geometry/key_areas.geojson#PROV-KEY-001]`. Task basis is `[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]`. Scope index is the three-level table in `project_scope_summary.csv` under `[source:PROCESSED-FACT-PACK]`.

![Three-level scope and spatial working framework](assets/figures/land-use-structure.png)

The three levels are not isolated drawings. The coordinated research area decides the industry-chain and city-form judgement. The overall design area lands the judgement into renewal projects, spatial structure and facility capacity. The key-area detailed design validates the implementability of specific blocks, buildings, transport, public space and AI application scenarios. When the agent generates the package, it must first lock the official or provisional boundary and constraints, then generate land use, buildings, roads, green space, public space, phasing, and AI service node layers, then recompute the metrics from these layers and explain in the prose which conclusions are still constrained by the provisional boundary. Any area, ratio, scale or project count that cannot be recomputed from structured data must not be written into a formal conclusion.

The proposed overall concept is the **"Centennial Jingzhang AI Symbiosis Belt (JSB)"**: using the Jing-Zhang Heritage Park as the historic and public-space backbone, the three key districts as innovation anchors, and universities, enterprises, communities and rail stations as the daily network — a "one belt · three cores · multi-point scenarios · blue-green / slow-traffic composite loop" spatial organisation. The "one belt" is not an additional redline; it is a translation of the announcement's three levels into a working method. The "three cores" correspond to the three key areas. The "multi-point scenarios" correspond to AI+ public-service, industry-service and city-life operational nodes. The "composite loop" corresponds to slow-traffic, green space, public space and activity routes working together.

| Level | Design question | Answer | Where the data lands |
| --- | --- | --- | --- |
| Coordinated research | How to organise AI ecosystem and future city form | Build the "university-originated → open-source collaboration → enterprise translation → public experience → international communication" innovation chain | compliance_matrix.json, standard_matrix.json |
| Overall design | How to land industry space, urban renewal, transport / municipal and character | Use land-use, building, road, green-space, public-space and phasing layers together | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key detailed-design area | How to bring the three districts to detailed-design depth | Propose positioning, spatial moves, AI scenarios and implementation dependencies for each | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

## Coordinated Research Area: Industry and Future-City Research

The core task of the coordinated research area is to build a world-class AI innovation ecosystem. The proposal maps out Haidian's universities and research institutes, leading enterprises, compute / algorithm / data factor supply, incubation platforms, listed companies, unicorns, and technology service resources, and proposes a spatial-coordination framework for the AI innovation chain, industry chain, talent chain and city service chain. The naming and logo direction should serve the overall recognition of "百年京张文化带 / 都市AI生活体验带 / AI融合创新带 (Centennial Jingzhang Cultural Belt / Urban AI Living-Experience Belt / AI Convergence Innovation Belt)" and must explain how it connects to industry ecosystems, public space and cultural resources.

The agent open-call taskbook also requires responding to the "five functions" and "three areas + two wings" coordination, producing a usable naming system, visual identity direction, overall spatial structure diagram, scenario opening and operation mechanism. This section must use `[source:AGENT-TASKBOOK]` and `[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]` to label these requirements as coming from the agent open-call taskbook rather than from statutory planning control.

The coordinated research does not draw new pseudo-precise redlines; through the city character, public space, and building layout integration required by `[standard:MOHURD-URBAN-DESIGN-MEASURES]`, it loops back to `[data:geometry/land_use.geojson#LU-001]`, `[data:geometry/public_space.geojson#PUBLIC-001]` and `[depth:overall_spatial_structure]`, showing that industrial strategy must finally land on a visible, reviewable spatial structure.

Future-city form research should answer how AI changes work, life, socialising, learning, transport and public services. The proposal lands AI transport systems, continuous green space, innovation-service facilities and international living / working atmospheres into locatable functional zones, nodes, corridors and scenarios, rather than describing a generic technology vision. The agent writes industry-strategy indicators, AI innovation index, talent density, space-supply types and AI+ vertical application key areas into the indicator system, and labels which are official, which are design suggestions, and which are still pending formal calibration. Any global AI event, developer community, open scenario or pilgrimage route must be written as "concept suggestion / reference scheme / available for deeper professional study" and must not be presented as a confirmed government event or implementation commitment.

## Overall Design Area: Urban Renewal at Regulatory-Plan Urban-Design Depth

The overall design area is required to reach regulatory-plan urban-design depth. The proposal must propose the overall spatial structure, identification of inefficient space, renewal project list, implementation policy suggestions, industry-function ratio, spatial organisation model, total building scale and comprehensive capacity assessment. `geometry/land_use.geojson` must fully cover the design boundary without overlap; `geometry/buildings.geojson` must express renewal or retained building footprints; `geometry/roads.geojson` must express micro-circulation, slow-traffic and rail-connection relations; `metrics.json` must recompute core area, ratio and layer count.

This section uses `[standard:MOHURD-CONTROL-DETAILED-PLANNING]` to split regulatory-plan depth content into reviewable objects: `[data:geometry/land_use.geojson#LU-001]` expresses the land-use structure, `[data:geometry/buildings.geojson#BLDG-001]` expresses building footprints, `[data:geometry/roads.geojson#ROAD-001]` expresses traffic organisation, `[metric:building_footprint_area_sqm]` is used to review the building footprint area, and `[depth:land_use_layout]` and `[depth:development_intensity_controls]` constrain the deliverable depth.

The overall design must also support transportation, rail, municipal and supporting facilities. The proposal proposes spatial layout and implementation paths around rail-station integration, micro-circulation, non-motorised parking, parking supply, innovation service platforms, talent living services, new infrastructure, distributed energy and edge compute. Where building height, development intensity, road redline, setback or facility standards do not yet have official control conditions, they must be written as "pending confirmation of formal regulatory conditions" and must not be passed off as agent-derived approved indicators.

## Three Key Areas: Detailed Design

Detailed design for the three key areas is mandatory.

- **Zhongzhiyuan AI Innovation & Self-Reliance Acceleration Area** should revolve around the national AI platform, full-stack self-reliance, standard-setting, safety governance, industry showcase, external transport, Qinghe culture, low-carbon green innovation environment, and green-space AI scenarios.
- **Beijing AI Origin Community** should revolve around near-campus innovation, achievement translation, talent district, open-source system, brand activities, building retain/renovate/demolish decisions, achievement showcase, residential living services, campus-park slow-traffic connection and rail-station integration.
- **Dazhongsi AI Industry Cluster** should revolve around leading enterprises, agents, smart terminals, content consumption, data factors, digital assets, commercial services, planned green-space composite use, Dazhongsi station integration, and four-quadrant pedestrian connectivity at the intersection.

The three detailed designs must reference `[data:geometry/key_areas.geojson#PROV-KEY-001]`, `[data:geometry/key_areas.geojson#PROV-KEY-002]`, `[data:geometry/key_areas.geojson#PROV-KEY-003]`, and must be checked by `[depth:three_key_area_detailed_design]` to verify they reach the planning-implementation depth. Phrases like "build a demonstration area" without function, building, transport, public space and project evidence must be treated as incomplete.

![Three key areas index and design task map](assets/figures/key-areas.png)

| District | Positioning | Spatial moves | AI industry & operation scenarios | Evidence |
| --- | --- | --- | --- | --- |
| Zhongzhiyuan AI Acceleration Area | Garden-style full-stack self-reliance block | Strengthen Qinghe interface, industry showcase, low-carbon innovation interface and external transport; green space carries open testing and standard-governance showcase | Self-model testing, standard-setting workshop, safety governance showcase, low-carbon compute experience | [data:geometry/key_areas.geojson#PROV-KEY-001], [depth:three_key_area_detailed_design] |
| Beijing AI Origin Community | Near-campus achievement translation and talent community | Organise campus, park and block slow-traffic connection; fill achievement release, talent services, residential living and open-source collaboration | Open-source community, achievement release, talent district services, near-campus incubation | [data:geometry/key_areas.geojson#PROV-KEY-002], [source:AGENT-TASKBOOK] |
| Dazhongsi AI Industry Cluster | Urban-style smart-economy and international-exchange block | Dazhongsi station integration, four-quadrant pedestrian connectivity, commercial services and key-enterprise public-environment renewal | Agent & smart-terminal showcase, content consumption, data factor, international roadshow | [data:geometry/key_areas.geojson#PROV-KEY-003], [metric:key_area_count] |

## AI Innovation Ecosystem, Talent Profile and AI+ Scenarios

The proposal builds spatial-need profiles for AI talent and enterprises covering R&D office, open-source collaboration, achievement release, enterprise service, talent residence, social learning, consumption, sports and leisure, and international exchange. AI+ scenarios are organised around the announcement's transport, service, consumption, healthcare, education, legal, life-service and other directions, producing both industrial-development scenarios and AI-enabled city-function scenarios. Each scenario should explain the target audience, spatial location, data source, privacy boundary, human-review mechanism and operating entity.

AI scenarios must land on spatial and governance boundaries: public-space scenarios reference `[data:geometry/public_space.geojson#PUBLIC-001]`, slow-traffic / transport scenarios reference `[data:geometry/roads.geojson#ROAD-001]`, open-space scenarios reference `[data:geometry/green_space.geojson#GREEN-001]`, `[metric:public_space_ratio]` and `[metric:green_ratio]`. These references let reviewers see that a scenario is not a slogan but a design object inside a specific layer and metric.

| User persona | Typical need | Spatial response | Self-check boundary |
| --- | --- | --- | --- | --- |
| Open-source developer | Release, collaboration, testing, community reputation | Origin community open-source release hall, public code wall, late-night collaboration space | Do not collect individual behaviour traces; activity data only aggregated |
| Startup team | Low-cost office, compute access, product testing ground | Zhongzhiyuan shared testbed, edge compute service point, standard-governance consultation | Compute and data service requires separate authorisation |
| Leading-enterprise visitor | Showcase, business, international reception, talent recruitment | Dazhongsi international roadshow salon, rail-station connection, key-enterprise public space | Enterprise branding and case studies must be cleared |
| Nearby resident | Commute, leisure, community service, low-disturbance renewal | Jing-Zhang Heritage Park slow-traffic loop, embedded community service, night-time lighting and graded activities | Resident profiles must not be used for commercial recommendation |
| University faculty & student | Achievement translation, cross-campus collaboration, daily slow-traffic | Campus–park slow-traffic connection, achievement translation station, AI education experience point | Campus data and research results must be authorised |

| Scenario card | Spatial carrier | Description |
| --- | --- | --- |
| 01 Open-source release hall | Beijing AI Origin Community | For universities, open-source communities and startups; release, code-contribution showcase and small roadshow space |
| 02 Safety-governance sandbox | Zhongzhiyuan | Translate standard-setting, safety evaluation and model red-team testing into a visitable, bookable, regulator-friendly showcase |
| 03 Edge-compute station | Overall design area nodes | Combined with public service, enterprise service and low-carbon energy strategy; new infrastructure prototype awaiting deeper study |
| 04 AI slow-traffic navigation | Jing-Zhang Heritage Park active belt | Explainable wayfinding and low-intrusion sensors for slow-traffic breakpoints, congestion and accessibility needs |
| 05 Dazhongsi international roadshow salon | Dazhongsi AI Industry Cluster | For agents, smart terminals and content-consumption enterprises: showcase, negotiation, media release, international exchange |
| 06 Qinghe low-carbon innovation corridor | Zhongzhiyuan Qinghe interface | Green space, storm-water, walking & cycling and AI showcase combined as the park's public living room |
| 07 Near-campus achievement-translation street | Beijing AI Origin Community | Incubation, showcase, legal, IP and investment-finance services for university achievement translation |
| 08 Data-factor reception hall | Dazhongsi | With compliance, authorisation and auditability, showing data factor and digital-asset circulation service |
| 09 AI living-service showcase street | Community & commercial intersection | Healthcare, education, legal, life-service AI+ scenarios at small-scale, operable block level |
| 10 Global AI activity-week route | Belt-level public space system | A walkable, shareable experience route from heritage culture through open-source community and industry showcase to international roadshow |

The AI governance suggestions generated by the agent must respect data minimisation, public sources, explainability and human review. City agents may assist to identify slow-traffic breakpoints, public-space heatmaps, facility maintenance needs, enterprise service needs and activity safety risks, but they must not replace planning approval, must not produce unauthorised individual profiles, and must not claim official implementation commitments. All AI scenario nodes should enter the structured layers or the compliance matrix so reviewers can see their relationships to industry, space and public interest.

## Land Use, Building Scale and Retain / Renovate / Demolish / New-Build

The land-use plan is expressed according to public standards such as the MNR land-use classification guide, forming a complete, closed and seamless land-use partition. The building plan should distinguish retained, renovated, renewed, new-build or to-be-confirmed objects, and clarify the recommendation level of building footprint, function, scale, character, roof form, volume and height control. Where current buildings, ownership, regulatory plan or engineering conditions are missing, the proposal can only propose method and to-be-calibrated lists, not fabricate retain/renovate/demolish conclusions.

Land-use classification follows `[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]`. Building height, volume, interface and character control is governed by `[depth:height_massing_character]`. Retain/renovate/demolish method is governed by `[depth:retain_renovate_demolish]`. The main evidence for land use and buildings is `[data:geometry/land_use.geojson#LU-001]`, `[data:geometry/buildings.geojson#BLDG-001]` and `[metric:building_footprint_area_sqm]`.

Building-scale and intensity metrics must align with `metrics.json` and the layers. If total building scale, FAR, building height, building density, green ratio, setback or building control line lacks official conditions, they should be listed as `unknown` or `pending_control` in the indicator system, not given as fixed numbers to manufacture precision. The A3 booklet should provide a renewal project list and indicator review table, the A0 board should make the key spatial structure and key districts clear, and the HTML page should provide indicator-and-layer linked views.

## Transportation, Rail, Municipal and Public-Service Facilities

The transport plan responds to the announcement's requirements for rail-station integration, micro-circulation, slow-traffic breakpoints, external transport, parking, non-motorised parking and green transport systems. The focus should cover the North 5th Ring Road, the cross-ring nodes of the Jing-Zhang Heritage Park, Wudaokou, the west end of Tsinghua East Road, Dazhongsi Station, and transport connections around key enterprises. The road and slow-traffic layers should remain within the submission boundary and cross-check with public space, green space, industry nodes and key districts; if the submission boundary is provisional, transport conclusions can only be used as temporary design discussion.

Transport and municipal depth are constrained by `[depth:traffic_rail_slow_parking]` and `[depth:municipal_new_infrastructure]`. Layer evidence references `[data:geometry/roads.geojson#ROAD-001]`, `[data:geometry/public_space.geojson#PUBLIC-001]` and `[data:geometry/constraints.geojson#CONSTRAINTS]`. When road redlines, pipelines, fire-control and municipal conditions are missing, the assumption should list them as to-be-supplied rather than treat the strategy as an approved condition.

![Mobility, slow-traffic and blue-green public-space composite system](assets/figures/mobility-bluegreen.png)

Municipal and public-service facilities should cover AI industry service facilities, innovation service platforms, talent living-service facilities, new infrastructure, distributed energy, edge compute, and traditional municipal facility integration. The proposal should explain facility standards, spatial layout, service radius, operation mode and phased implementation logic. Where pipeline, energy, drainage, flood-control, fire-control and similar engineering data are missing, they should be listed as pre-conditions for formal deepening.

## Blue-Green Space, Public Space and City Character

The blue-green plan should use the Jing-Zhang Heritage Park active belt as its skeleton, coordinate the needs of Qinghe, Xiaoyue River and surrounding universities, enterprises and communities, and propose a step + cycle + green-space system that connects north-south and east-west. The plan should identify slow-traffic breakpoints, over-ring nodes, southern and northern park landscape nodes, and propose composite use strategies for parking, sports, innovation interface, technology testing, application showcase and public service.

Blue-green public space is reviewed by `[depth:blue_green_public_space]`. Core evidence is `[data:geometry/green_space.geojson#GREEN-001]`, `[data:geometry/public_space.geojson#PUBLIC-001]`, `[metric:green_ratio]` and `[metric:public_space_ratio]`. The urban design measures standard requires integrated landscape character, public space and building control; this section therefore also references `[standard:MOHURD-URBAN-DESIGN-MEASURES]`.

The city-character plan should integrate the Jing-Zhang Railway heritage, Zhongguancun innovation culture, and AI innovation culture. Using the Tsinghua Garden railway station, Beijing Film Academy and other cultural resources, it proposes city keynote, building character, roof form, volume, interface and public-art guidance. The agent also proposes wayfinding & signage, cultural symbols, international-communication narrative, AI pilgrimage landmarks, contributor walls and honour-display systems, but all branding, fonts, images, portraits and enterprise identifiers must have cleared sources. Character control must distinguish official control, design suggestion and to-be-confirmed conditions. No pseudo-precise control line can be given without heritage or regulatory basis.

### AI Pilgrimage Landmarks & Honour-Display System (≥3)

To respond to agent.4's requirement of at least 3 AI pilgrimage / honour-display nodes, this proposal offers three **concept-level** landmark nodes. They anchor on four real locations — the original site of the Tsinghua Garden railway station (1909 start of Jing-Zhang Railway), the Wudaokou–Tsinghua East Road West innovation corridor, and Dazhongsi Station — and overlay AI new-culture and open-collaboration symbols. All nodes are written under the "concept suggestion / available for deeper professional study" framing; heritage, ownership, construction and operation permits must be confirmed by the heritage evaluation and ownership confirmation; they are not approved-construction conclusions.

| Landmark ID | Name | Anchor | Culture–AI narrative | Public-space composition | Evidence |
| --- | --- | --- | --- | --- | --- |
| LM-01 | **Jingzhang Symbiosis Zero Monument** | Original Tsinghua Garden railway station site (1909 start of Jing-Zhang Railway) | A double-origin narrative ("a century's start" + "an AI's start") that overlays Zhan Tianyou's "人字形" switchback with the recursive connection of an AI neural network in the same memorial / interactive installation | Open plaza, memorial, interactive screen, touchable metal-fibre installation; venue for open-source release events and the annual AI Pilgrimage Day | [data:geometry/key_areas.geojson#PROV-KEY-002], [source:AGENT-TASKBOOK], [depth:three_key_area_detailed_design] |
| LM-02 | **AI Origin Plaza + Contributor Wall** | Beijing AI Origin Community central plaza | Five-actor contributor showcase: open-source contributors, startups, universities, enterprises, public sector; the wall uses a scrollable digital screen + physical plaque dual-layer structure, updated annually through community nomination | Central plaza, contributor wall, annual contributor plaque area, temporary open-source conference stage | [data:geometry/public_space.geojson#PUBLIC-001], [data:geometry/key_areas.geojson#PROV-KEY-002] |
| LM-03 | **Dazhongsi International Roadshow Salon & Agent Theatre** | Dazhongsi Station northern public space | Combines Dazhongsi station integration with four-quadrant pedestrian connectivity for an "international roadshow – agent theatre – content consumption" three-in-one urban living room | Outdoor mini-theatre, movable stage, agent demonstration pods, ground-floor international roadshow salon | [data:geometry/key_areas.geojson#PROV-KEY-003], [data:geometry/public_space.geojson#PUBLIC-001] |

### Public-Space Component Library

To avoid filling the entire belt with one-off designs, this proposal offers a graded "public-space component library" composed of 8 components:

1. **Symbiosis Promenade** — low-intrusion slow-traffic corridor connecting the three key districts, following the original Jing-Zhang Railway alignment.
2. **Zero Monument** — see LM-01; can serve as the entire belt's "origin marker".
3. **Open-Source Release Hall** — semi-indoor semi-outdoor space with basic AV, for open-source communities and startups.
4. **AI Safety Sandbox Gallery** — AI safety evaluation, red-team testing and model-governance work as a visitable, bookable showcase.
5. **Edge-Compute Station** — low-threshold compute access and basic debugging space; needs separate authorisation and energy assessment.
6. **Low-Carbon Innovation Corridor** — along the Qinghe interface: storm-water + green + walking & cycling + AI showcase composite corridor.
7. **Dazhongsi International Roadshow Salon** — see LM-03.
8. **AI Living-Service Showcase Street** — small-scale block that hosts operable tests for AI+ healthcare, education, legal, life-service scenarios.

The component library is only a prototype list; it does not designate specific construction sites or ownership adjustments. Professional deepening must re-check heritage, ownership, fire-control, energy and heritage control for each component.

## Renewal Project List, Implementation Policy and Phasing Plan

The implementation plan should form a reviewable renewal project list that explains project location, type, function, responsible body, dependency conditions, implementation phase, risk and evaluation indicators. Policy suggestions should cover urban-renewal coordination, space supply, operation mechanism, industry service, public participation, data governance and property-rights coordination. `geometry/phasing.geojson` should express the phasing scope; `compliance_matrix.json` should hook every task to phasing and drawing.

The project list and phasing depth is governed by `[depth:renewal_project_list]` and `[depth:phasing_implementation]`. Phasing spatial evidence is `[data:geometry/phasing.geojson#PHASE-001]`. If ownership, funding, implementing body and approval path are missing, the proposal must write them as implementation risks, not as implementation commitments.

| Project ID | Project name | Type | Main dependency | Evidence |
| --- | --- | --- | --- | --- |
| JZ-01 | Jing-Zhang Heritage Park slow-traffic breakpoint connection | Public space / transport | Road redline, under-bridge space, traffic organisation review | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Zhongzhiyuan Qinghe innovation interface | Blue-green / industry showcase | River blue line, ecological and flood-control conditions | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | Origin community near-campus achievement translation street | Urban renewal / industry service | Campus boundary, ownership, ground-floor business mix | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | Dazhongsi station four-quadrant pedestrian connection | Rail integration / slow-traffic | Station, intersection, municipal pipelines | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI public service and edge-compute nodes | New infrastructure / public service | Energy, compute, safety and operating entity | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | Global AI activity-week public route | Operation / brand | Public-space permits, activity safety, copyright clearance | [data:geometry/phasing.geojson#PHASE-001] |

Phasing must be distinguished from the 100-day open-call design cycle: the open-call cycle is the time requirement for submission, and the implementation phasing is the advancement path of urban renewal and project construction. The proposal should propose near-term pilots, medium-term renewal and long-term governance framework, and clarify which contents can be started with light-weight facilities, operations, and service platforms first, and which must wait for formal regulatory, municipal, transport and ownership conditions. For the annual event system, developer-community operation, scenario open day, public experience route and international-communication mechanism, the proposal should explain the operating object, frequency, responsibility boundary, conversion path and risk; it must not only write publicity slogans.

## Cultural Narrative, Wayfinding System and International Communication

To respond to agent.5's cultural narrative and wayfinding system requirements, this proposal translates the three layers of "百年京张文化—中关村创新文化—AI新文化" into an identifiable spatial narrative, wayfinding system and international communication leads. The narrative principle is the three-layer parallel — "history — present — future" — rather than treating AI as decoration or replacement of history.

### Three-layer cultural parallel narrative

- **Historical layer (Centennial Jing-Zhang)**: Tsinghua Garden station original site, Jing-Zhang Railway corridor, Zhan Tianyou's "人字形" switchback; wayfinding language prioritises "1909—2026" time anchors and "Jing-Zhang — Haidian — Beijing — China" geographic anchors.
- **Contemporary layer (Zhongguancun innovation)**: Universities, research institutes, startups, incubators, accelerators, leading enterprises; wayfinding language prioritises "open-source — collaboration — translation" action anchors.
- **Future layer (AI new culture)**: City agents, open-source community, contributor network, public-participation mechanism; wayfinding language prioritises "contribution — verification — symbiosis" value anchors.

The three layers are visually expressed through "vertical stacking": on each wayfinding pillar, the historical layer is at the bottom (dark), the contemporary layer in the middle (neutral), and the future layer on top (bright), forming a "three-layer wayfinding" that is readable, stackable, and shareable internationally. All fonts, icons and plaque content must pass the heritage evaluation and copyright clearance process before actual production.

### International communication leads

- **Main phrase**: "From rails to agents — a century of Beijing-Haidian innovation".
- **Sub-phrase**: "Open-source agents meet a 117-year-old railway".
- **Shareable assets**: map of the Jingzhang Symbiosis Belt, concept drafts of the 3 pilgrimage landmarks, contributor plaque mechanism, annual AI Pilgrimage Day.
- **Must avoid**: presenting a concept proposal as approved construction, confirmed government commitment, or confirmed financial arrangement; never use unauthorised portraits, trademarks or enterprise identifiers.

## Long-Term Operation, Annual Events and Developer Community

To respond to agent.6's global AI innovation event system and long-term operation requirements, this proposal proposes a four-layer mechanism: "annual events — developer community — scenario opening — conversion pathway". All operational content is written under the "concept suggestion / concept mechanism" framing; it does not replace government investment promotion, policy, funding or operation commitments.

### Annual event system (concept)

| Event name | Frequency | Host (concept) | Main participants | Key output |
| --- | --- | --- | --- | --- |
| AI Pilgrimage Day | Annual | Concept host (to be confirmed by professional team) | Global open-source contributors, researchers, young talent | Annual contributor plaque update, pilgrimage ceremony |
| Symbiosis Hackathon | Twice per year | Concept host + universities + community | University students, startups, enterprise R&D | Concept prototypes, community feedback, papers |
| Open Source Week | Annual | Concept host + open-source community | International open-source foundations, local developers | Collaboration roadmap, community consensus |
| Jing-Zhang AI Public Open Day | Quarterly | Concept host + sub-district + park | Nearby residents, enterprise employees, young students | Public experience feedback, community proposals |

> All events above are "concept suggestions" and do not constitute confirmed government or enterprise commitments. When professional teams deepen the work, they must first review event permits, safety, heritage, fire-control and participant health protection.

### Developer-community operation (concept mechanism)

- **Contributor plaques**: produced annually through community nomination + public voting + review committee three rounds; plaques appear simultaneously in the digital contributor wall and the physical plaque area.
- **Open-source code wall**: open-source projects are wall-mounted in downloadable, verifiable and auditable form, with project links, licences and contributor attribution.
- **Developer apartment & shared office**: combined with the "near-campus achievement-translation street", providing low-cost housing and shared space for universities and open-source communities.
- **Agent-governance sandbox**: a visitable, bookable, regulator-friendly showcase for AI safety evaluation, model red-team testing, and standard-setting work.

### Scenario open operation (concept mechanism)

- **Scenario open day**: monthly; low-threshold AI experience day for nearby residents and young students.
- **Scenario pilot funding (concept)**: under the "small amount – fast review – reproducible – publishable" principles, support 10–20 AI+ scenario pilots; results are published as downloadable data sets, runnable prototypes, and readable whitepapers.
- **Scenario operating entity**: a "scenario operation consortium" of professional teams, sub-districts, parks and open-source communities is suggested, avoiding a single investment-promotion entity monopolising operation rights.

### International communication and conversion pathway (concept mechanism)

- **International media cooperation**: build non-exclusive cooperation with open-source media, technology media, and urban research institutions.
- **Talent return channel**: through the open-source contributor plaque, annual AI Pilgrimage Day, and Symbiosis Hackathon, form a "see – join – return – symbiosis" chain.
- **Investment-promotion conversion**: a three-stage "contribute – verify – land" pathway, avoiding writing recruitment indicators as fulfilled commitments.

## Indicator System, Area Recomputation and Compliance Matrix

The indicator system should at least cover overall design area, key-area area, green and public-space ratio, building footprint, renewal project count, AI scenario nodes, slow-traffic connectivity, industry-space indicators, talent-service indicators and self-check status. All `known` indicators must be recomputable from GeoJSON or trusted sources; `unknown` indicators must give the reason and the formal-submission pre-condition. The output of `scripts/spatial_review.py` and `scripts/visual_review.py` is important evidence of formal self-check.

Indicator recomputation depth is governed by `[depth:metrics_recalculation]`. This proposal explicitly references `[metric:site_area_sqm]`, `[metric:key_area_count]`, `[metric:building_footprint_area_sqm]`, `[metric:green_ratio]`, `[metric:public_space_ratio]` and explains these values come from `[data:geometry/site_boundary.geojson#SITE-001]`, `[data:geometry/key_areas.geojson#PROV-KEY-001]`, `[data:geometry/buildings.geojson#BLDG-001]`, `[data:geometry/green_space.geojson#GREEN-001]` and `[data:geometry/public_space.geojson#PUBLIC-001]`.

![Core indicator recomputation and evidence chain](assets/figures/metrics-evidence.png)

The compliance matrix is the master file of task responsiveness. Every announcement task and agent taskbook task must correspond to a report section, layer, metric, drawing, HTML page, source, assumption and self-check. Failing to cover any required task in announcement sections 1.3, 1.4, 1.5 or agent.1-agent.6 means the package cannot enter formal professional scoring.

In formal deepening, the agent should divide every indicator into three categories:

1. **Spatial indicators** directly recomputable from submitted geometry, e.g., boundary area, green ratio, public-space ratio, building footprint area, phasing area.
2. **Control indicators** requiring official regulatory plan or taskbook annex support, e.g., FAR, building height, building density, setback, road redline, facility standards.
3. **Performance indicators** that need ongoing operational or industry-data calibration, e.g., AI innovation index, talent density, industry-service satisfaction, slow-traffic accessibility, event participation, scenario usage frequency.

The three categories should enter `metrics.json`, `assumptions.json` and `compliance_matrix.json` respectively, to avoid mistaking an operational vision for an approved planning condition.

## Risk, Copyright and Compliance Statement

The main proposal may use Chinese or English, and should provide a complete standalone counterpart as `proposal.en.md` or `proposal.zh.md`; missing translation only produces non-blocking warnings and does not prevent submission, merge or content review. A3/A0, HTML and text-bearing figures should also provide corresponding-language counterparts and prioritise the terminology glossary in `docs/terminology-glossary.md`. All images, drawings, icons, data and code assets must state source, licence and authorisation status in `sources.json` or `report/copyright_statement.md`. The HTML page must not load remote scripts, remote map tiles, remote fonts, iframes, forms, or external APIs, and must not track reviewer behaviour.

Risk and missing-data lists are governed by `[depth:risk_missing_data]` and cross-check `[data:geometry/constraints.geojson#CONSTRAINTS]`, `[source:SITE-PACKAGE]`, `[source:PROCESSED-FACT-PACK]` and `[standard:MOHURD-CONTROL-DETAILED-PLANNING]`. The official boundary, key area, regulatory plan, road, parcel, building, municipal, heritage and public service gaps listed in `missing_data_checklist.csv` must enter `assumptions.json`, self-check and the prose risk section. Any conclusion missing official regulatory plan, road redline, ownership, municipal, fire-control or heritage conditions must be downgraded to a to-be-confirmed item.

This proposal does not claim official approval, approved regulatory plan, final land ownership, final building scale or implementation guarantee. The AI agent is responsible for facts, sources, copyright, spatial data, indicators and expression; maintainers and professional reviewers can require rework or reject based on self-check results, spatial review and compliance matrix.

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/agent_taskbook.json
- brief/site-package/sources.json
- data/source_registry.json
- brief/site-package/schemas/compliance_matrix.schema.json
- brief/site-package/schemas/standard_matrix.schema.json
- brief/site-package/schemas/design_depth_matrix.schema.json
- Machine-readable reference index: [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [depth:metrics_recalculation], [data:geometry/site_boundary.geojson#SITE-001], [metric:site_area_sqm]
