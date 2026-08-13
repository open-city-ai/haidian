---
title: "JINGZHANG PULSE — Urban Design Proposal for the Centennial Jingzhang AI Innovation Belt"
author_github: "bryceliu919-hue"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
source_file: "proposal.md"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A comprehensive urban design proposal for the Centennial Jingzhang AI Innovation Belt built on the core concept of 'JINGZHANG PULSE (人字形智脉)': inspired by Zhan Tianyou's zigzag railway alignment, it proposes a human-first governance skeleton, a zigzag-spiral innovation-culture relay, and a pulse-like perceivable AI city-service protocol, covering all six agent tasks, three key areas, 12 renewal projects and 10 AI scenario cards. Generated on the provisional boundary; precision caveat retained pending recalculation with official data."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# JINGZHANG PULSE — Urban Design Proposal for the Centennial Jingzhang AI Innovation Belt

## 1 Proposal Overview and Core Concept

### 1.1 One-sentence positioning

This proposal translates the spirit of indigenous innovation embodied by the Centennial Jingzhang Railway into a **perceivable, operable, and recalculable** AI innovation belt: taking Zhan Tianyou's "zigzag (人字形)" railway alignment as its genetic code, it forms the "**JINGZHANG PULSE**" — a human-first governance skeleton, a zigzag-spiral innovation-culture relay, and a pulse-like perceivable AI city-service protocol [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK].

### 1.2 Core concept: JINGZHANG PULSE (人字形智脉)

The concept is decomposed into three layers, each anchored to locatable spaces and recalculable layers:

| Layer | Meaning | Spatial anchor | Evidence |
| --- | --- | --- | --- |
| **Human-first** | Human-centred governance: AI services are explainable, reviewable, and never replace statutory planning approval | Three key areas and the public-space system | [data:geometry/public_space.geojson#PUBLIC-001] [depth:civic_agent_governance] |
| **Zigzag** | Zigzag-spiral upward innovation: the self-reliant innovation relay symbolised by the Jingzhang zigzag (railway—computing—open source—AI) | Master spatial structure "one belt, three cores, multiple scenarios, blue-green slow-traffic loop" | [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm] |
| **Pulse** | Pulse-like perception: an AI service protocol providing real-time, auditable city services via low-intrusion sensing and public data | 12 scenario nodes and 5 AI service zones | [data:compliance_matrix.json] [metric:scenario_node_count] [metric:ai_service_zone_count] |

JINGZHANG PULSE is not an additional new redline; it translates the three tiers of scope from the announcement into a working method: the strategic research tier answers "how an AI city is organised", the master design tier answers "how it is mapped", and the key-area tier answers "how it is implemented". The naming and visual identity emphasise the dual heritage of railway legacy (zigzag alignment, Qinghuayuan Station) and AI innovation (open source, compute, agents) [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

### 1.3 Submission scope and deliverables

This package is a comprehensive proposal covering all mandatory tasks agent.1–agent.6, comprising: this document and `proposal.md` (Chinese master), 11 GeoJSON layers, the `metrics.json` recalculation, the `compliance_matrix.json`, five presentation figures (`assets/figures/`), an A3 booklet and A0 boards (`drawings/`), and an offline HTML exhibit (`visual/index.html`).

![Site overview and spatial structure](assets/figures/site-overview.png)

## 2 Design Basis and Source List

This proposal takes the "Call for Qualification — International Urban Design Solicitation for the Centennial Jingzhang AI Innovation Belt" issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources as its primary basis, and the machine-readable materials registered by the repository maintainers in `brief/site-package/` as its data basis [source:OFFICIAL-ANNOUNCEMENT] [source:SITE-PACKAGE]. Before generation, the agent read `design_brief.json`, `allowed_design_space.json`, `sources.json`, `agent_taskbook.json` and `data/processed/agent_fact_pack.md`, and built the task—scope—data—gap checklist from `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv` and `missing_data_checklist.csv` [source:PROCESSED-FACT-PACK].

**Boundary caveat (important)**: the official precise boundary and key-area polygons were not published with the public materials; this package uses `brief/site-package/geometry/provisional_boundaries.geojson` to generate a provisional formal package. `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` are both flagged `provisional_constraint` / `official_boundary=false`; area and ratio metrics are provisional (medium confidence) and may only be used for design discussion and visualisation — not for approval, precise-area claims or statutory conclusions [source:SOURCE-REGISTRY] [metric:site_area_sqm]. Once official polygons are released, site boundary, key areas, land use, roads, buildings, phasing and metrics must be fully recalculated and re-checked — never replace a single file only. This organiser-side data gap does not block content scoring [data:geometry/key_areas.geojson#PROV-KEY-001].

## 3 Three-Level Scope Framework and Master Spatial Structure

The proposal is organised by the three tiers of scope defined in the announcement [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]:

| Tier | Scope | Design question | Proposal answer | Data anchor |
| --- | --- | --- | --- | --- |
| Strategic research | 43.6 km² | How the AI industry ecosystem and future city form are organised | "University ideation—open-source collaboration—enterprise conversion—public experience—global dissemination" innovation chain | standard_matrix.json, compliance_matrix.json |
| Master design | 11.4 km² | How industrial space, urban renewal, transport and municipal infrastructure are mapped | Six layers: land use / buildings / roads / green space / public space / phasing | [data:geometry/land_use.geojson#LU-001] [data:geometry/roads.geojson#ROAD-001] |
| Key areas | 368.4 ha | How the three districts reach detailed-design depth | District-specific positioning, spatial actions, AI scenarios and implementation dependencies | [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] |

The master spatial structure is "**one belt, three cores, multiple scenarios, blue-green slow-traffic loop**" [depth:overall_spatial_structure]:

- **One belt**: the cultural belt along the Jingzhang Railway Heritage Park as the historical and public-space spine, linking railway-heritage nodes such as Qinghuayuan Station;
- **Three cores**: the three key districts — Zhongzhiyuan AI Independent-Innovation Accelerator, Beijing AI Origin Community, and Dazhongsi AI Industry Cluster;
- **Multiple scenarios**: 12 scenario nodes and 5 AI service zones hosting AI + public service, industry service and urban-life scenarios [metric:scenario_node_count] [metric:ai_service_zone_count];
- **Blue-green slow-traffic loop**: a north–south through, east–west connected network anchored by the heritage-park active belt and linking the Qinghe, Xiaoyue rivers and university/enterprise/community trips [data:geometry/green_space.geojson#GREEN-001].

![Three-tier scope and spatial structure](assets/figures/land-use-structure.png)

## 4 Coordinated Research Area: Industry and Future City Research

The strategic tier answers two questions: how a world-class AI innovation ecosystem is organised, and how AI changes urban life. The proposal maps Haidian's universities and institutes, leading enterprises, compute/algorithm/data factors, incubators and tech-service resources into the "university ideation—open-source collaboration—enterprise conversion—public experience—global dissemination" innovation chain, and responds to the "five functions" and "three zones, two wings" coordination requirements [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

The future-city study concretises AI mobility, continuous green space, innovation-service facilities and an international living-working atmosphere into locatable functional zones, nodes, corridors and scenarios: 5 AI service zones carry the industry-service protocol, 12 scenario nodes carry public experience, and the heritage-park composite loop carries slow traffic and sociability [metric:ai_service_zone_count] [data:compliance_matrix.json]. Expressions such as the Global AI Week, developer community and pilgrimage routes are stated as "conceptual suggestions / reference schemes / open for professional deepening" — not confirmed government events or implementation arrangements [depth:overall_spatial_structure].

## 5 Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The master design tier is organised at the urban-design depth of a regulatory detailed plan (控制性详细规划), with the six seamless, non-overlapping GeoJSON layers as core evidence [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout]. The design scope covers 1141.3 ha (provisional), using `geometry/site_boundary.geojson` as the submitted boundary [metric:site_area_sqm]. Six layer types fully cover the design boundary: land use, buildings, roads, green space, public space and phasing — seamlessly tessellated with no overlaps, suitable as a base map for spatial recalculation and approval verification [data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLDG-001] [depth:land_use_layout].

The master design method follows three principles: first, land-use classification as the base, expressing 8 national-standard categories for alignment with approval procedures [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; second, conceptual building footprints for quantity, generating 645 footprints (with retain/renovate/renew/new/pending attributes), with floor area as concept quantity only [metric:building_count] [metric:building_footprint_area_sqm]; third, phasing as sequence, expressing near-term pilots (3.862 million m²), mid-term renewal (5.715 million m²) and long-term governance (1.836 million m²) [data:geometry/phasing.geojson#PHASE-001] [metric:phasing_area_sqm]. FAR, building height and density are statutory regulatory-plan conditions absent from the public site package, uniformly marked `status=unknown` with no pseudo-precise assignment [metric:floor_area_ratio] [depth:development_intensity_controls]. Retain/renovate/demolish is presented only as a method with a pending-calibration checklist, never fabricating ownership conclusions [depth:retain_renovate_demolish].

## 6 Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

- **Land use**: `geometry/land_use.geojson` fully covers the design boundary with 8 national-standard land-use categories, seamlessly tessellated [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001];
- **Buildings**: `geometry/buildings.geojson` generates 645 conceptual footprints (with retain/renovate/renew/new/pending attributes); footprint area 1.962 million m²; conceptual total floor area 7.765 million m² (concept quantity only, not a statutory figure) [data:geometry/buildings.geojson#BLDG-001] [metric:building_count] [metric:concept_total_floor_area_sqm];
- **Intensity-control boundary**: FAR, building height and density are statutory regulatory-plan conditions; the public site package contains no approved regulatory plan, so `metrics.json` uniformly marks them `status=unknown` and this proposal makes no pseudo-precise assignments; recalculation follows when official conditions are published [metric:floor_area_ratio] [metric:building_height_m] [depth:development_intensity_controls]. Retain/renovate/demolish is presented only as a method with a pending-calibration checklist, never fabricating ownership conclusions [depth:retain_renovate_demolish].

## 7 Transport, Rail, Municipal Infrastructure, and Public Services

- **Roads and slow traffic**: `geometry/roads.geojson` expresses rail interchange, road micro-circulation and slow-traffic links, 58.7 km in total [data:geometry/roads.geojson#ROAD-001] [metric:road_length_m];
- The transport and municipal chapters respond to rail-station integration, road micro-circulation, bicycle parking, parking supply, innovation-service platforms, distributed energy and edge-compute requirements, covering the North 5th Ring Road, heritage-park crossing nodes, Wudaokou, Qinghua East Road West and Dazhongsi station [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure]. Where road redlines, utility lines and fire-safety conditions are missing, they are registered in `assumptions.json` as pending, never presented as approved conditions [data:geometry/constraints.geojson#CONSTRAINTS].

![Mobility, slow traffic and blue-green public-space system](assets/figures/mobility-bluegreen.png)

## 8 Blue-Green Space, Public Space, and Urban Landscape

- **Green and public space**: `geometry/green_space.geojson` (2.453 million m²; green ratio 21.5%) and `geometry/public_space.geojson` (0.737 million m²; public-space ratio 6.5%) [data:geometry/public_space.geojson#PUBLIC-001] [metric:green_ratio] [metric:public_space_ratio];
- The blue-green slow-traffic loop is anchored by the heritage-park active belt, linking the Qinghe and Xiaoyue rivers with university/enterprise/community trips to form a north-south through, east-west connected public-space system [data:geometry/green_space.geojson#GREEN-001] [depth:blue_green_public_space].

## 9 Detailed Design of Key Areas

The three key areas are mandatory detailed-design objects, organised at the depth of a planning-and-implementation comprehensive plan (规划综合实施方案) [depth:three_key_area_detailed_design] [source:AGENT-TASKBOOK]. Each district is defined by positioning, spatial actions, AI scenarios and implementation dependencies, anchored to its own layer and metrics.

![Three key-area index and design tasks](assets/figures/key-areas.png)

| Key district | Design positioning | Spatial actions | AI industry and operation scenarios | Evidence |
| --- | --- | --- | --- | --- |
| Zhongzhiyuan AI Independent-Innovation Accelerator (192.9 ha) | Garden-type full-stack independent-innovation district | Strengthen the Qinghe riverfront, industry showcase, low-carbon innovation exchange and external transport; green space hosts open testing and standards-governance showcase | Independent model testing, standards workshops, safety-governance showcase, low-carbon compute experience | [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_area_sqm] |
| Beijing AI Origin Community (104.3 ha) | Campus-adjacent conversion and talent community | Suture campus–district–block slow traffic; add release, talent-service, residential-living and open-source collaboration space | Open-source community, achievement release, talent-special-zone service, campus-adjacent incubation | [data:geometry/key_areas.geojson#PROV-KEY-002] [source:AGENT-TASKBOOK] |
| Dazhongsi AI Industry Cluster (72.0 ha) | Urban smart-economy and international-exchange district | Integrate Dazhongsi station, four-quadrant pedestrian connectivity, commercial service and public-environment renewal around anchor enterprises | Agent and smart-terminal showcase, content consumption, data factors and international roadshows | [data:geometry/key_areas.geojson#PROV-KEY-003] [metric:key_area_count] |

Key-area areas derive from provisional polygon recalculation (192.9/104.3/72.0 ha); where they differ from the announcement's 368.4 ha aggregate, the announcement figure is the reference and layer recalculation is the evidence, with the `provisional_constraint` flag retained [metric:key_area_area_sqm] [data:geometry/key_areas.geojson#PROV-KEY-001]. Key-area design covers function/format, building scale, building form, retain/renovate/demolish classification, public-space system, transport organisation, slow-traffic connectivity and implementation projects; the HTML exhibit allows switching between the three districts, and the A3/A0 drawings include district master plans and metric notes.

## 10 AI Innovation Ecosystem, Personas, and AI+ Scenarios

### 7.1 Five user personas

The proposal builds spatial-demand personas for AI talent and enterprises, covering R&D office, open-source collaboration, achievement release, enterprise service, talent housing, social learning, consumption, sports/leisure and international exchange, with explicit privacy boundaries [depth:civic_agent_governance]:

| Persona | Typical needs | Spatial response | Self-check boundary |
| --- | --- | --- | --- |
| Open-source developer | Release, collaboration, testing, community reputation | Origin-community open-source release hall, public code wall, night collaboration space | No personal behaviour tracking; event data aggregated only |
| Startup team | Low-cost office, compute access, product testbed | Zhongzhiyuan shared test ground, edge-compute service points, standards-governance advisory | Compute and data services require separate authorisation |
| Anchor-enterprise visitor | Showcase, business, international reception, recruiting | Dazhongsi international roadshow hall, rail interchange, public space around enterprises | Enterprise marks and case studies must be rights-cleared |
| Surrounding resident | Commuting, leisure, community services, low-disruption renewal | Heritage-park slow-traffic loop, embedded community services, graded night-time activities | Resident personas never used for commercial recommendation |
| University faculty and students | Achievement conversion, cross-campus collaboration, daily slow traffic | Campus–district slow-traffic suture, conversion hubs, AI education experience points | Campus data and research outcomes require authorisation |

### 7.2 Ten AI scenario cards

Scenarios cover the announcement's mobility, service, consumption, healthcare, education, legal and lifestyle directions; each card states its spatial carrier and design note, anchored to the 12 scenario nodes [data:compliance_matrix.json] [metric:scenario_node_count]:

| Card | Spatial carrier | Design note |
| --- | --- | --- |
| 01 Open-source release hall | Beijing AI Origin Community | Release, code-contribution showcase and small roadshow space for universities, communities and startups |
| 02 Safety-governance sandbox | Zhongzhiyuan | Translates standards setting, safety evaluation and model red-teaming into a visitable, bookable, monitorable showcase/collaboration node |
| 03 Edge-compute station | Master-design nodes | A pending-deepening new-infrastructure prototype combined with public service, enterprise service and low-carbon energy |
| 04 AI slow-traffic navigation | Heritage-park active belt | Explainable signage and low-intrusion sensing to identify slow-traffic gaps, congestion and accessibility needs |
| 05 Dazhongsi international roadshow hall | Dazhongsi AI Industry Cluster | Showcase, negotiation, press release and international exchange for agent, smart-terminal and content-consumption firms |
| 06 Qinghe low-carbon innovation corridor | Zhongzhiyuan riverfront | Combines green space, stormwater, walking/cycling and AI showcase as the district's public living room |
| 07 Campus-adjacent conversion street | Beijing AI Origin Community | Incubation, showcase, legal, IP and financing services for university achievement conversion |
| 08 Data-factor salon | Dazhongsi | A compliant, authorised, auditable urban-service interface demonstrating data-factor and digital-asset circulation |
| 09 AI lifestyle pilot block | Community–commerce interface | Brings AI+ healthcare, education, legal and lifestyle services into an operable small-scale block |
| 10 Global AI Week route | One-belt public-space system | A walkable, shareable experience route from heritage culture, open-source community and industry showcase to international roadshow |

### 7.3 Governance principles

All AI scenarios follow the principles of data minimisation, public sources, explainability and human review [depth:civic_agent_governance] [standard:PROJECT-CIVIC-AGENT-GOVERNANCE]: city agents may help identify slow-traffic gaps, public-space heatmaps, facility maintenance, enterprise-service demand and event-safety risk, but must not replace planning approval, output unauthorised personal profiles, or claim official implementation commitments. All AI scenarios are recorded in `scenario_nodes.geojson` or `compliance_matrix.json` so reviewers can audit their relationship with industry, space and public interest.

## 11 Renewal Project List, Implementation Policy, and Phasing Plan

### 8.1 Renewal project list (12 projects)

The project list is a reviewable conceptual menu for professional deepening, not an implementation commitment [depth:renewal_project_list] [metric:renewal_project_count]:

| No. | Project | Type | Key dependencies | Evidence |
| --- | --- | --- | --- | --- |
| JZ-01 | Heritage-park slow-traffic gap suture | Public space / mobility | Road redlines, underpass space, transport review | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Zhongzhiyuan Qinghe innovation riverfront | Blue-green / industry showcase | River blue line, ecology and flood conditions | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | Origin-community campus-adjacent conversion street | Urban renewal / industry service | Campus boundary, ownership, ground-floor uses | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | Dazhongsi four-quadrant pedestrian connectivity | Rail integration / slow traffic | Station, intersections, utility lines | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI public service and edge-compute node | New infrastructure / public service | Energy, compute, security, operator | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | Global AI Week public route | Operations / brand | Public-space permits, event safety, rights clearance | [data:geometry/phasing.geojson#PHASE-001] |
| JZ-07 | Wudaokou station–Origin Community slow-traffic suture | Slow traffic / rail interchange | Station entrances, micro-circulation | [data:geometry/roads.geojson#ROAD-001] |
| JZ-08 | Heritage-park north-5th-ring crossing node | Blue-green / mobility | Bridge/tunnel structure, transport, landscape | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-09 | Dazhongsi data-factor salon | Industry service / public space | Building ownership, data compliance, operations | [data:compliance_matrix.json] |
| JZ-10 | Zhongzhiyuan low-carbon compute experience station | New infrastructure / showcase | Energy and compute network, safety evaluation | [data:compliance_matrix.json] |
| JZ-11 | Origin-community open-source release hall | Industry service / public space | Space ownership, event operations, rights clearance | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-12 | Blue-green loop cycling connection | Blue-green / slow traffic | River blue line, underpass space, slow-traffic standards | [data:geometry/public_space.geojson#PUBLIC-001] |

### 8.2 Phasing and implementation policy

Phasing is expressed in three bands: near-term pilots (3.862 million m²), mid-term renewal (5.715 million m²) and long-term governance (1.836 million m²) [data:geometry/phasing.geojson#PHASE-001] [metric:phasing_area_sqm]. The 100-day solicitation cycle is a submission-timeframe requirement, clearly distinguished from the implementation phasing of urban renewal [depth:phasing_implementation]. Near-term starts with lightweight facilities, operational events and service platforms (slow-traffic sutures, scenario-card pilots); mid-term advances block renewal and industrial space; long-term enters the overall governance framework. Projects lacking ownership, funding, implementation entity or approval path are explicitly flagged as implementation risk, never promised. Policy recommendations cover coordinated urban-renewal implementation, space supply, operations mechanisms, industry services, public participation, data governance and property-rights coordination.

## 12 Metrics System, Area Recalculation, and Compliance Matrix

Indicator recalculation is uniformly based on the GeoJSON layers [depth:metrics_recalculation]; complete values, formulas, source files and confidence levels are stored in `metrics.json`; this section explains design meaning only. Key results [metric:site_area_sqm] [metric:green_ratio] [metric:building_density]:

| Indicator | Value | Status | Note |
| --- | --- | --- | --- |
| Master-design scope area | 1141.3 ha | known (provisional) | Recalculated from submitted boundary; recalc after official boundary release |
| Green ratio | 21.5% | known (provisional) | 2.453M m² / 1141.3 ha |
| Public-space ratio | 6.5% | known (provisional) | 0.737M m² / 1141.3 ha |
| Building footprint area | 1.962M m² | known (provisional) | 645 conceptual footprints; density 17.2% |
| Conceptual total floor area | 7.765M m² | known (low confidence) | Concept quantity, not an approved figure |
| Road length | 58.7 km | known (provisional) | Conceptual network clipped to submitted boundary |
| Key areas count / area | 3 / 369.2 ha | known (provisional) | 192.9/104.3/72.0 ha |
| Scenario nodes / AI service zones | 12 / 5 | known | Design nodes mapped by scenario cards |
| Renewal projects | 12 | known | Conceptual menu for professional deepening |
| FAR / building height | — | **unknown** | Pending official regulatory-plan conditions; no pseudo-precise assignment |

![Core-metric recalculation and evidence chain](assets/figures/metrics-evidence.png)

Indicators are managed in three classes: **spatial indicators** (directly recalculable from submitted geometry, e.g. areas, ratios), **regulatory indicators** (requiring official regulatory-plan support, e.g. FAR, height, setbacks — currently unknown), and **performance indicators** (requiring operational data calibration, e.g. innovation index, talent density, event participation), stored respectively in `metrics.json`, `assumptions.json` and `compliance_matrix.json`, so operational visions are never written as approved planning conditions.

## 13 Risk, Copyright, and Compliance Notes

**Bilingual contract**: this file is the English translation; `proposal.md` is the Chinese master, with sections aligned one-to-one (bilingual_contract_version: "1"). A3/A0 and HTML provide bilingual annotation, with terminology preferring `docs/terminology-glossary.md` recommended translations.

**Data and precision risk**: official boundary, key-area polygons, regulatory-plan conditions, road redlines, ownership, municipal, heritage and public-service data are missing; related conclusions are downgraded to pending items and registered in `assumptions.json` and `self_check.json` [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS]. Area and ratio indicators must be fully recalculated after official polygon release.

**Copyright and compliance**: all GeoJSON, figures, PDFs and HTML generated in this package are original agent work; the provenance and licence status of all images, icons, data and code assets are documented in `sources.json` and `report/copyright_statement.md`. The HTML page loads no remote scripts, map tiles, fonts, iframes, forms or external APIs, and tracks no reviewer behaviour. This proposal claims no official approval, approved regulatory plan, final ownership, final construction scale or guaranteed implementation; the AI agent is responsible for facts, sources, copyright, spatial data, indicators and expression, and maintainers and professional reviewers may request revision or rejection based on self-checks, spatial review and the compliance matrix.

## 14 References

- brief/public-brief.md; brief/site-package/design_brief.json, agent_taskbook.json, allowed_design_space.json
- brief/site-package/enums/, ranges/planning_limits.json, schemas/, data/source_registry.json
- data/processed/agent_fact_pack.md, project_scope_summary.csv, agent_task_requirements.csv, source_use_matrix.csv, missing_data_checklist.csv
- Full machine index: sources.json, metrics.json, compliance_matrix.json, standard_matrix.json, design_depth_matrix.json [source:SITE-PACKAGE] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]
