---
title: "Centennial Jingzhang AI Symbiosis Belt — A Trinity Proposal for Rail Heritage, AI Foundation, and Haidian's Future City"
author_github: "yushi-xxh"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A formal AI urban design submission for the Centennial Jingzhang AI Innovation Belt. Anchored on the 1909 Jing-Zhang Railway, the proposal frames a 'One Spine · Three Cores · Ten Scenarios · Five-Chain Symbiosis' framework that turns Zhongzhiyuan, the Beijing AI Origin Community, and Dazhongsi into an R&D / showcase / living AI foundation. All boundary, key-area, and regulatory conclusions are marked as provisional_constraint. v1.5 adds a 10-field project governance matrix for the six renewal projects and a 9-block spatial specificity matrix across the three key areas. v1.6 adds 6 English figure counterparts, 2 English PDF counterparts, 1 English visual HTML, 4 bilingual-contract known metrics, and refactors evidence-marker-dense paragraphs to address non-blocking warnings. v1.9 upgrades the three key areas into item-verifiable spatial evidence packages (12 INTERVENTION + 3 DESIGN_SECTION features), rewrites JZ-01..06 as role-class + minimum-pilot + baseline-driven feasibility matrices, and makes design-depth and standards evidence item-specific."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.9"
---

# Centennial Jingzhang AI Symbiosis Belt — A Trinity Proposal for Rail Heritage, AI Foundation, and Haidian's Future City

> This is the English counterpart of `proposal.md`. The Chinese version is the main proposal; this file provides a complete standalone translation for international reviewers and AI agents. Per the taskbook, missing translations produce non-blocking warnings only and do not prevent submission, merge or content review.

## Concept, Naming and Visual Identity

The name **Centennial Jingzhang AI Symbiosis Belt (JSB)** combines the historic Jing-Zhang Railway, AI knowledge and service flows, and the co-evolution of heritage, industry and everyday life. The original mark overlays a switchback rail stroke with a five-node neural connection. The identity system separates four levels: primary belt mark, monochrome wayfinding mark, annual event submark, and independent honour plaque. It must not be combined with government identifiers or enterprise trademarks.

![Jingzhang Symbiosis Belt concept identity board](assets/figures/brand-identity.png)

The board provides a primary mark, monochrome and dark variants, clear-space guidance and a 24 px test. It is an original concept asset generated locally without third-party icons. Trademark search, final font substitution, graphic-rights review and formal adoption remain pending under A-LOGO-001.

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

### Regional innovation collaboration loop (concept)

None of the following is presented as an existing agreement. Each link is activated only after the named evidence, operator and permission path are confirmed.

| Potential collaborator | Proposed exchange | Jingzhang carrier | Review and exit condition |
| --- | --- | --- | --- |
| Beiwei Community | Anonymous service needs and accessibility test reports | Public-service nodes along the heritage park | Pause if offline alternatives, consent or appeal channels are absent |
| Future Science City | Cleared technical requirements and reproducible validation reports | Zhongzhiyuan safety-governance sandbox | Exit when authorization, safety or reproducibility conditions fail |
| Huairou Science City | Public science content and cleared exhibition packages | Origin Community release hall | Remove any content without confirmed rights |
| Beijing E-Town | Public interface specifications, synthetic test sets and validation reports | Dazhongsi terminal showcase | No procurement or investment commitment; stop pilots that miss safety/KPI gates |
| Beijing-Tianjin-Hebei innovation nodes | Open-source code, licensed scenario templates and event reviews | Activity-week route and public repository | Do not start without a responsible operator and cross-region data permission |

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
| Older people and caregivers | Legible wayfinding, rest, low-threshold service and human assistance | Continuous seating, accessible toilets, staffed desk and paper route | No smartphone or facial-recognition requirement; retain offline service |
| Disabled people | Continuous accessible travel, understandable information and appeal | Ramp/lift links, tactile and audio wayfinding, accessibility test day | Professional accessibility review and digitally accessible service required |
| Night workers and non-Chinese speakers | Night safety, interchange and concise multilingual information | Graded lighting, night waiting point, pictorial Chinese-English signs and staffed hotline | No predictive profiling; a human confirms high-risk notices |

| Scenario / place | Users and minimum data | Model boundary and human review | Operator, failure mode and KPI |
| --- | --- | --- | --- |
| 01 Open-source release hall / Origin Community | Developers; authorized project metadata and public licences | Retrieval and summary only; maintainer and rights reviewer approve publication | Community operator; remove misattribution; KPI=verified-project and accessible-event rates |
| 02 Safety-governance sandbox★ / Zhongzhiyuan | Test teams; synthetic/authorized test sets and model cards | No production connection; safety lead approves tests and reports | Sandbox operator; isolate unauthorized calls; KPI=reproducibility and closure time |
| 03 Edge-compute station★ / overall nodes | Startups; authorized jobs and minimum device telemetry | No unauthorized personal data; duty engineer approves capacity and energy | Infrastructure operator; degrade on capacity/energy failure; KPI=availability and energy/job |
| 04 AI slow-traffic navigation / heritage park | Residents, older and disabled users; public network, manual audit and aggregate counts | Route advice only; transport/accessibility officer confirms high-risk alerts | Public-space operator; switch to staffed notice on closure/error; KPI=breakpoint closure and accessible reach |
| 05 International roadshow salon / Dazhongsi | Visitors; authorized agenda and self-declared enterprise material | No investment/policy claims; host and legal reviewer approve copy | Venue operator; retract false claims; KPI=rights-cleared material and feedback rate |
| 06 Qinghe low-carbon corridor★ / Zhongzhiyuan | Park users; public weather, authorized environmental sensors and manual inspections | Display and maintenance advice only; facility staff decide action | Park operator; sensor failure triggers manual inspection; KPI=data availability and work-order closure |
| 07 Near-campus translation street / Origin Community | University teams; authorized abstracts and service requests | No research-truth judgement or legal replacement; technology manager/lawyer review | Translation service; suspend disputed rights; KPI=clearance and response time |
| 08 Data-factor reception hall / Dazhongsi | Compliance users; public catalogues, synthetic samples and audit logs | No real sensitive-data trading; DPO approves demos | Authorized data operator; reject unknown provenance; KPI=traceability and audit closure |
| 09 AI living-service street / community interface | Residents/caregivers; active input and public service catalogue | No final medical/legal/education decision; licensed professional review | Service provider; human takeover and appeal; KPI=takeover rate and appeal time |
| 10 Global AI activity route / public-space system | Public/international visitors; public event and accessibility data | Multilingual guidance only; editor and safety lead publish | Event consortium; disable on crowd/permit change; KPI=route availability and multilingual/offline coverage |

★ marks the three AI industry test-and-validation scenarios. Every card requires notice and opt-out, human takeover, logs, appeal, pilot thresholds and periodic impact review under A-DATA-001.

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

The implementation plan provides a reviewable renewal project list that explains project location, type, function, responsible body, dependency conditions, implementation phase, risk and evaluation indicators; the full field structure appears in the Project Governance and Implementation Matrix below. Policy suggestions cover urban-renewal coordination, space supply, operation mechanism, industry service, public participation, data governance and property-rights coordination. `geometry/phasing.geojson` expresses the phasing scope; `compliance_matrix.json` hooks every task to phasing and drawing.

The project list and phasing depth is governed by `[depth:renewal_project_list]` and `[depth:phasing_implementation]`. Phasing spatial evidence is `[data:geometry/phasing.geojson#PHASE-001]`. When ownership, funding, implementing body or approval path are missing, the proposal treats them as implementation risks with trigger thresholds and exit conditions rather than implementation commitments; constraint A-PROJ-001.

### Project Governance & Implementation Matrix (JZ-01 to JZ-06)

To upgrade the v1.4 project list into a governance object that maintainers and professional teams can review, the following table expands the six projects into ten fields: lead, co-lead, permit, resource tier, cost tier, trigger threshold, 12-month KPI, failure mode, exit condition and annual review. All amounts, time limits, KPI thresholds and headcounts are concept-grade initial estimates; a formal launch must be backed by a dedicated feasibility study and official control conditions. Any missing field or unmet threshold is mapped to a "trigger threshold" or "exit condition" in the table. The matrix corresponds to `[metric:project_governance_field_count]` and `[metric:project_exit_clause_count]` known indicators, constraint A-PROJ-001.

| Project | Lead body | Co-lead & oversight | Required permit / clearance | Resource tier | Cost tier (concept CNY) | Trigger threshold | 12-month KPI | Failure mode | Exit condition | Annual review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **JZ-01** Jing-Zhang Heritage Park slow-traffic breakpoint connection | Haidian Transport Commission + Haidian Sub-bureau | Jing-Zhang Heritage Park administration + adjacent sub-districts + heritage authority | Road redline, under-bridge use permit, traffic review, night-lighting permit | Medium (sub-district + park + design unit) | 20M–80M | Road redline confirmed + under-bridge use right + heritage review non-objection + ≥1 sub-district in writing | Breakpoint closure ≥85%; accessible reach 100%; work-order closure ≤7 days; night-lighting complaints ≤2 / 100 m / month | Under-bridge conflict, pedestrian flow conflict, night-safety risk, heritage veto | KPI misses two consecutive quarters or heritage veto → concept-only retention | Haidian Transport Commission + Jing-Zhang Heritage Park joint review, public minutes |
| **JZ-02** Zhongzhiyuan Qinghe innovation interface | Haidian Water Authority + Haidian Sub-bureau | Zhongzhiyuan operating company + Qinghe River authority + ecological assessor | River blue line, ecological review, flood-control review, heritage red line, waterfront path ownership | High (water + ecology + heritage + river) | 80M–200M | River blue line verified + flood-control passed + heritage red line non-impact + green-power/low-carbon review passed | Waterfront reach ≥80%; storm-water compliance 100%; ecological monitoring stable; showcase energy on green power | Flood risk, ecological damage, heritage conflict, green-power miss | Flood or ecological failure, or heritage veto → pause, downgrade to "awaiting data" | Haidian Water Authority + Haidian Sub-bureau + ecological assessor joint review |
| **JZ-03** Origin community near-campus achievement translation street | Haidian Science & Technology Commission + Zhongguancun Science City | Tsinghua, Peking U, Zhongguancun College + sub-district + park + legal | Campus boundary agreement, ownership confirmation, ground-floor business permit, open-source licence clearance | Medium (campus + sub-district + park + legal) | 50M–150M | ≥2 universities in writing + ownership confirmed + ground-floor pilot permit + translation office set up | Translation projects ≥5 / year; talent-service complaint rate ≤5%; new open-source contributors ≥100; rights-cleared material 100% | Campus conflict, ownership dispute, talent loss, copyright dispute | Any university exit or unresolved ownership dispute within 6 months → freeze | Haidian S&T Commission + three universities + Zhongguancun College joint review, public translation list |
| **JZ-04** Dazhongsi station four-quadrant pedestrian connection | Beijing Major Project Office + Beijing Transport Commission + BII | Haidian + Haidian Sub-bureau + rail-design institute + utility integration unit | Rail-station planning permit, intersection engineering permit, utility integration, slow-traffic acceptance | High (municipal rail + utility + transport) | 150M–400M | Station red line + intersection red line + utility composite map + accessibility review passed + safety review passed | Pedestrian coverage 100%; accessible ramp 100%; non-motorised parking 100%; crossing-signal failure ≤0.5% | Utility conflict, rail restriction, ownership dispute, safety miss | Any prerequisite fails or major utility conflict → defer | BII + Haidian Sub-bureau + Beijing Transport Commission joint review |
| **JZ-05** AI public service and edge-compute nodes | Haidian S&T Commission + Zhongguancun Science City | State-owned compute provider + data-compliance reviewer + third-party security auditor | Energy assessment, compute compliance, data-security assessment, operator filing, human-review system | Medium (S&T + state-owned + third-party) | 30M–120M | Energy capacity assessment passed + data-compliance review passed + third-party security review passed + human-review system live | Service availability ≥99.5%; per-job energy on green power; false-positive ≤0.5%; human takeover ≤0.2%; rights-cleared material 100% | Compliance failure, energy overrun, model false-positive, takeover overrun | Any pilot severe failure or compliance veto → stop, publish post-mortem | Haidian S&T + third-party security + data-compliance joint review |
| **JZ-06** Global AI activity-week public route | Haidian District Propaganda + Haidian Culture & Tourism | Sub-district + park + open-source community + public security + emergency | Public-event permit, security plan, emergency plan, copyright clearance, participant insurance | Low–Medium (event-led + multi-party coordination) | 5M–20M | Event permit + security plan + emergency plan + copyright clearance + public-security filing | Route availability ≥95%; multilingual and offline coverage 100%; satisfaction ≥85%; major safety incidents 0 | Security miss, copyright dispute, public-sentiment, emergency fail | Security miss or major copyright dispute → cancel, publish statement | Haidian Culture & Tourism + public security + emergency + sub-district joint review |

> Resource tier and cost tier are concept estimates and must be re-anchored to dedicated feasibility studies and regulatory plans. All permits and clearances are interlocked with `assumptions.json` A-ROAD-001 / A-PARCEL-001 / A-BUILDING-001 / A-HERITAGE-001 / A-MUNICIPAL-001 / A-DATA-001 / A-OPS-001 / A-PROJ-001; any release condition unmet means the corresponding KPI cannot enter a formal scoring basis. The field structure of the matrix references [source:CN-MOHURD-URBAN-RENEWAL-2021] (public concept reference, field naming only); the activity safety and permit language references [source:BJ-EVENT-PERMIT-GUIDE-2019] (public concept reference, event-plan wording only). The matrix is recomputable as: [metric:project_governance_field_count] = 60 (6 projects × 10 fields), [metric:project_trigger_threshold_count] = 6, [metric:project_exit_clause_count] = 6, [metric:project_annual_review_count] = 6.

### Three Key Areas Spatial Specificity Matrix (K1 / K2 / K3)

To address the maintainer's request for stronger spatial specificity, the following table expands the three key areas from "concept districts" into recognisable concept blocks with block ID, dominant function, conceptual building type, ground-floor public-space component, external connection point, and adjacency. The matrix is cross-checked with `[data:geometry/key_areas.geojson#PROV-KEY-001/002/003]` and corresponds to `[metric:spatial_specificity_block_count]` known indicator, constraint A-BOUNDARY-001.

| District | Concept block ID | Dominant function | Conceptual building type | Ground-floor public-space component | External connection | Adjacency | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **K1 Zhongzhiyuan** | K1-A Qinghe waterfront belt | Waterfront low-carbon showcase | Waterfront exhibition hall + green-power O&M centre | Low-carbon innovation corridor + riverbank path | North 5th Ring slow-traffic bridge, north/south banks of Qinghe | Adjacent to Qinghe blue line, north of 5th Ring, east of Zhongzhiyuan core | [data:geometry/key_areas.geojson#PROV-KEY-001] |
| K1 Zhongzhiyuan | K1-B Self-model testing park | Standard-setting and red-team testing | Modular sandbox + safety exhibition hall | AI safety sandbox gallery + testing ground | Wudaokou → Qinghe innovation corridor | Indirectly connected to Tsinghua/Peking U translation street | Same as above |
| K1 Zhongzhiyuan | K1-C International exchange salon | International roadshow + leading-enterprise handover | International conference building + pop-up roadshow hall | Mini international roadshow salon + Symbiosis Promenade | Metro Line 13, North 5th Ring | 200 m buffer between K1-A and K1-B | Same as above |
| **K2 Beijing AI Origin Community** | K2-A Tsinghua-garden origin | Campus history + open-source release | Tsinghua-garden station original-site memorial park + open-source release hall | LM-01 Jingzhang Zero Monument + open-source release hall | Wudaokou station, Tsinghua East Road West station | Adjacent to Tsinghua campus, linked to K2-B via Xueqing Road | [data:geometry/key_areas.geojson#PROV-KEY-002] |
| K2 Beijing AI Origin Community | K2-B Near-campus translation street | Translation + talent apartment | Incubator + co-working + talent apartment | Translation street + AI living-service showcase street | Tsinghua East Road West station, Xueqing Road | 5–10 min walk to Tsinghua and Peking U | Same as above |
| K2 Beijing AI Origin Community | K2-C AI Origin Plaza | Contributor wall + public plaza | Digital screen + plaque area + temporary stage | LM-02 AI Origin Plaza + Symbiosis Promenade | Chengfu Road, Tsinghua-garden Road | 300 m buffer between K2-A and K2-B | Same as above |
| **K3 Dazhongsi AI Industry Cluster** | K3-A Dazhongsi station core | Rail integration + international roadshow | International roadshow salon + agent theatre | LM-03 Dazhongsi international roadshow salon + Symbiosis Promenade | Dazhongsi station, Zhichun Road | Directly adjacent to K3-B and K3-C | [data:geometry/key_areas.geojson#PROV-KEY-003] |
| K3 Dazhongsi AI Industry Cluster | K3-B Data-factor reception hall | Data factors + compliance showcase | Data showcase centre + compliance studio | Data-factor reception hall + Symbiosis Promenade | Dazhongsi station, four-quadrant pedestrian loop | 150 m buffer between K3-A and K3-C | Same as above |
| K3 Dazhongsi AI Industry Cluster | K3-C Smart-terminal block | Smart terminals + content consumption | Experience centre + content stores | Smart-terminal gallery + corner plaza | Zhichun Road, North 4th Ring frontage road | 150 m buffer between K3-A and K3-B | Same as above |

> The concept block IDs, dominant functions, conceptual building types and ground-floor public-space components are concept-grade. Professional teams must re-check ownership, ground-floor business mix, rail red line, fire setback and heritage control for every block during deepening. After clearance, the matrix can be used for A3/A0 detail sheets, HTML switching views, and metric recomputation.

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

Indicator recomputation depth is governed by `[depth:metrics_recalculation]`. This proposal explicitly references 5 core known metrics and 5 geometry layers below.

- Spatial metrics: `[metric:site_area_sqm]`, `[metric:key_area_count]`, `[metric:building_footprint_area_sqm]`
- Spatial ratios: `[metric:green_ratio]`, `[metric:public_space_ratio]`

These values come from the following 5 geometry layers:

- Boundary: `[data:geometry/site_boundary.geojson#SITE-001]`
- Key area: `[data:geometry/key_areas.geojson#PROV-KEY-001]`
- Building footprint: `[data:geometry/buildings.geojson#BLDG-001]`
- Green space: `[data:geometry/green_space.geojson#GREEN-001]`
- Public space: `[data:geometry/public_space.geojson#PUBLIC-001]`

![Core indicator recomputation and evidence chain](assets/figures/metrics-evidence.png)

The compliance matrix is the master file of task responsiveness. Every announcement task and agent taskbook task must correspond to a report section, layer, metric, drawing, HTML page, source, assumption and self-check. Failing to cover any required task in announcement sections 1.3, 1.4, 1.5 or agent.1-agent.6 means the package cannot enter formal professional scoring.

In formal deepening, the agent should divide every indicator into three categories:

1. **Spatial indicators** directly recomputable from submitted geometry, e.g., boundary area, green ratio, public-space ratio, building footprint area, phasing area.
2. **Control indicators** requiring official regulatory plan or taskbook annex support, e.g., FAR, building height, building density, setback, road redline, facility standards.
3. **Performance indicators** that need ongoing operational or industry-data calibration, e.g., AI innovation index, talent density, industry-service satisfaction, slow-traffic accessibility, event participation, scenario usage frequency.

The three categories should enter `metrics.json`, `assumptions.json` and `compliance_matrix.json` respectively, to avoid mistaking an operational vision for an approved planning condition.

### Recomputed metric summary

- Site: 11,412,825.386 sqm; land-use partition: 11,412,837.696 sqm; topology gap ratio: 1.078618e-6.
- Submitted provisional key-area geometry: 3,692,893.005 sqm = 369.3 ha. The announcement's approximate scope is 368.4 ha; the 0.24% difference is a provisional-geometry precision limitation, not a design target.
- Green ratio: 0.309644 = 31.0%; public-space ratio: 0.041935 = 4.2%; building footprint: 1,008,405.877 sqm.
- `phase_coverage_ratio=1.0` means only that concept phasing polygons cover the submitted boundary; it does not prove funding, ownership, approvals or engineering feasibility.
- The eight personas include older people/caregivers, disabled people, night workers and non-Chinese speakers in addition to the original five groups.

## Risk, Copyright and Compliance Statement

The main proposal may use Chinese or English, and should provide a complete standalone counterpart as `proposal.en.md` or `proposal.zh.md`; missing translation only produces non-blocking warnings and does not prevent submission, merge or content review. A3/A0, HTML and text-bearing figures should also provide corresponding-language counterparts and prioritise the terminology glossary in `docs/terminology-glossary.md`. All images, drawings, icons, data and code assets must state source, licence and authorisation status in `sources.json` or `report/copyright_statement.md`. The HTML page must not load remote scripts, remote map tiles, remote fonts, iframes, forms, or external APIs, and must not track reviewer behaviour.

Risk and missing-data lists are governed by `[depth:risk_missing_data]` and cross-check the following four evidence groups:

- Constraint layer: `[data:geometry/constraints.geojson#CONSTRAINTS]`
- Repository sources: `[source:SITE-PACKAGE]`, `[source:PROCESSED-FACT-PACK]`
- Regulatory-plan standard: `[standard:MOHURD-CONTROL-DETAILED-PLANNING]`

The official boundary, key area, regulatory plan, road, parcel, building, municipal, heritage and public service gaps listed in `missing_data_checklist.csv` must enter `assumptions.json`, self-check and the prose risk section. Any conclusion missing official regulatory plan, road redline, ownership, municipal, fire-control or heritage conditions must be downgraded to a to-be-confirmed item.

This proposal does not claim official approval, approved regulatory plan, final land ownership, final building scale or implementation guarantee. The AI agent is responsible for facts, sources, copyright, spatial data, indicators and expression; maintainers and professional reviewers can require rework or reject based on self-check results, spatial review and compliance matrix.

## References

Grouped reference list (v1.6):

### Brief and package

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/agent_taskbook.json

### Source registry

- brief/site-package/sources.json
- data/source_registry.json

### Schemas

- brief/site-package/schemas/compliance_matrix.schema.json
- brief/site-package/schemas/standard_matrix.schema.json
- brief/site-package/schemas/design_depth_matrix.schema.json

### Reference index

- Machine-readable reference index: [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE]
- Cross-reference: [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK]
- Standards: [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]
- Example evidence: [depth:metrics_recalculation], [data:geometry/site_boundary.geojson#SITE-001], [metric:site_area_sqm]
