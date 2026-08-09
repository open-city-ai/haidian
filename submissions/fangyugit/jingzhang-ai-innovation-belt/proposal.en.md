---
title: "100-Year Jingzhang Smart-Vein Living Belt -- Design Proposal (EN)"
author_github: "fangyugit"
language: "en"
translation_of: "proposal.md"
bilingual_contract_version: "1"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Centered on the 'Jingzhang Smart-Vein Living Belt' concept, delivering three positionings (100-Year Jingzhang Cultural Belt, Urban AI Living Experience Belt, AI Integration Innovation Belt), a 'One Belt, Three Cores, Multiple Scenarios, Blue-Green Slow Ring' spatial structure, plus 10 AI scenario cards, user personas, 3 test-validation scenarios, 4 AI pilgrimage landmarks and an annual activity system."
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "ai-origin-community"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v0.2"
---

# 100-Year Jingzhang Smart-Vein Living Belt -- Design Proposal (EN)

This is the English translation of `proposal.md` (Chinese). See the Chinese version for the authoritative Chinese narrative.

## Design Basis and Source List

This proposal takes as its primary basis the 2026-05-09 eligibility announcement "International Design Solicitation for the 100-Year Jingzhang AI Innovation Belt Urban Design" by the Haidian Branch of Beijing Municipal Commission of Planning and Natural Resources, together with the agent-oriented design brief [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. The design is organized along the agent.1~agent.6 response hierarchy required by the taskbook: concept & naming → three positionings → regulatory-depth design → key-area detailed design → scenarios/personas/testing → cultural narrative & activity operations [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. All design decisions trace back to the repository site-package `brief/site-package/`, the public source registry `data/source_registry.json` and the processed fact-pack, as itemized in `sources.json` [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK].

**Key reference layers and data sources**: `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` define the scope boundaries [data:geometry/site_boundary.geojson#SITE-001] [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]; professional standard snapshots provide urban-design depth, regulatory-ordinance context and land-use classification semantics [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

**Boundary data status (mandatory disclosure)**: As of the proposal date the official redline and the three key-area official polygons are not yet public. This proposal uses the repository's provisional coarse boundary (`provisional_boundaries.geojson`, `official_boundary=false`) for generation, display and temporary self-check only; it is not an official redline, approval basis or exact-area basis, and must be recomputed, replaced and re-validated once official data are released. This organizer data gap does not block content scoring [source:BOUNDARY-SOURCE] [depth:risk_missing_data].

![Master Concept and Scope Framework](assets/figures/site-overview.png)

## Three-Level Scope Framework

The scope follows the scaffold three-level structure, propagated level by level without over-concluding across levels [depth:three_level_scope_framework]:

- **Coordinated research scope** (PROV-RESEARCH-001, ±43.6 km²): the cross-district research circle addressing industrial strategy and future-city form, including rail, municipal and ecological corridor links [source:OFFICIAL-ANNOUNCEMENT].
- **Overall design scope** (SITE-001, ±11.4 km²): the primary object of regulatory-depth design; all design layers (land use, buildings, roads, green space, public space, phasing) are generated within this scope [data:geometry/land_use.geojson#LU-001] [depth:overall_spatial_structure].
- **Key-area scope** (PROV-KEY-001/002/003, ±369.3 ha in total): the three key areas designed at refined depth per the integrated-planning urban-design standard [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design].

## Coordinated Research Area: Industry and Future City Research

At the coordinated research level, this proposal takes "from the zigzag railway to the smart-vein city" as the keynote, proposing the **"Jingzhang Smart-Vein Living Belt" master concept**: extending century-old engineering wisdom into an urban operating system for the intelligent era, where AI is no longer an add-on but an infrastructure carrying growth, channeling flows and igniting innovation. The concept is expressed as "One Belt, Three Cores, Multiple Scenarios, and a Blue-Green Slow Ring", supported by three systems—the "Two Cores, One Corridor" AI full-stack autonomy system, a world-class AI innovation ecosystem, and an AI governance discourse platform [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

**Future-city form fit for AI**: a "source-creation → piloting → transfer → listing" spatial relay spans the belt, building a chain from algorithms, compute and data to terminals and applications; the five core functions (innovation source-creation, industrial transfer, living experience, cultural narrative, governance demonstration) interlock along the belt into a self-reinforcing loop [source:AGENT-TASKBOOK].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The overall design scope is ±11.4 km², developed at regulatory-plan depth with an urban-renewal and urban-design view [depth:overall_spatial_structure] [depth:existing_conditions_diagnosis].

### Land Use, Building Scale, Retain-Renovate-Demolish

Six dominant land-use categories are defined across the overall scope per "innovation-led, life-composite, blue-green-weaved" principles (see `geometry/land_use.geojson`) [depth:land_use_layout] [data:geometry/land_use.geojson#LU-001]:

| Code | Dominant Function | Layout Point |
|---|---|---|
| 0701 (residential) | Talent housing, mixed communities | Around AI Origin Community, south clusters |
| 08 (public service) | Culture-commerce & community support | Dazhongsi cultural salon, community service rings |
| 05/0802 (commerce/research) | AI HQ, R&D, incubation, piloting, compute | Zhongzhi Park & AI Origin Community "source-transfer" |
| 1401 (green/open) | Heritage park, waterfront green, open plazas | Jingzhang heritage vitality belt |
| 1207 (transit/municipal) | Transit stations, slow corridors, energy | Three-tier mobility & utility corridor |

Roughly 45% innovation-productive (commerce+research), 35% residential+support, 12% green/open, 8% transit & utility, per recomputed `metrics.json` [metric:site_area_sqm] [metric:building_footprint_area_sqm]. Building scale and retain-renovate-demolish follow "retain heritage, retrofit, weave new" principles; building types cover R&D, piloting, cultural landmark and talent housing (`geometry/buildings.geojson`) [depth:retain_renovate_demolish] [depth:development_intensity_controls].

![Land-Use Structure and Spatial Structure](assets/figures/land-use-structure.png)

### Transport, Rail, Municipal Infrastructure and Public Services

A three-tier mobility skeleton works in coordination with rail, municipal and public-service facilities [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure]:

- **Tier 1 (regional express)**: rail trunk + expressways, carrying city-level passenger flow (`geometry/roads.geojson`) [source:SOURCE-REGISTRY].
- **Tier 2 (intra-belt backbone)**: east-west rail branch and north-south smart-vein spine linking the three cores.
- **Tier 3 (slow micro-network)**: 15-min walk circles + blue-green slow ring covering all scenario points and public spaces (track: ai-traffic-walkability) [metric:public_space_ratio].

### Blue-Green Network and Public Space

Green ratio ≈ 12.3%; public space ratio ≈ 7.3%. The Jingzhang heritage park forms the green spine, north-south blue-green corridors the weave, and pocket parks the nodes: "one axis, two corridors, multi-node" (`geometry/green_space.geojson`, `public_space.geojson`) [metric:green_ratio] [depth:blue_green_public_space].

### Urban Character

With "smart-vein symbiosis" as the character theme, a three-segment pattern is formed (northern innovation-and-manufacturing, central vitality-and-mixed, southern culture-and-quality), extending the calm base tone of Jingzhang industrial heritage with glass, perforated panels and other modern AI vocabulary [source:PROCESSED-FACT-PACK].

## Detailed Design of Key Areas

Based on the `design_brief.json` key_areas and the three key areas in `geometry/key_areas.geojson`, each is designed at refined depth across five elements (land function, spatial form, public space, slow mobility, site indicators). See `geometry/land_use.geojson` and `design_depth_matrix.json` [depth:three_key_area_detailed_design] [depth:height_massing_character].

### PROV-KEY-001 Zhongzhi Park · Open-Source Source-Ecosystem Core (192.1 ha, north)

Positioned as the global open-source AI source hub and proof-of-concept center, led by commerce+research R&D offices and public technology platforms with an open-source community center, open code plaza and evaluation center; extending the historical axis of the Jingzhang locomotive depot to shape an "Open-Source Plaza — Source Tower — Shared Workshop" ceremonial innovation sequence (track: ai-origin-community). [data:geometry/key_areas.geojson#PROV-KEY-001]

### PROV-KEY-002 AI Origin Community · Pilot-to-Transfer Core (104.3 ha, mid)

Positioned as the pilot-maturing and talent community between "school-lab-market": pilot-maturing bases, compute hub, talent housing and commercial support combined; compact mixed blocks around the "AI Origin" station-city node, "residence-above / research-below" and job-housing balance. [data:geometry/key_areas.geojson#PROV-KEY-002]

### PROV-KEY-003 Dazhongsi · Cultural Salon Core (72.0 ha, south)

Positioned as the cultural salon and AI culture-tourism experience center: cultural display, immersive experience, commercial leisure and hotel services; the **Dazhongsi AI Star Hall** (L4) reshapes the south gateway image (track: jingzhang-heritage-narrative). [data:geometry/key_areas.geojson#PROV-KEY-003]

The three key areas total ±369.3 ha, about 32% of the overall scope, forming the spatial anchor of the "One Belt, Three Cores".

![Detailed Design of Three Key Areas](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### User Personas

Personas span university makers, AI engineers, industrial entrepreneurs, citizen families, and global visitors & developers, capturing their needs for open-source access, piloting, financing, everyday convenience and culture experience (P1~P5). [source:PROCESSED-FACT-PACK]

### AI Scenario Cards (10, including 3 industrial test-validation scenarios)

Each card covers scenario ID, location, served persona, AI capability, data reliance, related layers and validation indicator, spanning track/scenario combinations [source:AGENT-TASKBOOK]:

| ID | Scenario | Core AI Capability | Scenario |
|---|---|---|---|
| SC-01 | Open-Source Code Plaza | Collaborative-dev Copilot, contribution review | - |
| SC-02 | Smart-Building Energy Butler | Energy forecast, carbon-reduction dispatch | - |
| SC-03 | AI Commute Ask-and-Go | Multi-modal travel Agent | ai-traffic-walkability |
| SC-04 | Local-Life AI Assistant | Commerce recommendation, matchmaking | - |
| SC-05 | Immersive Railway Experience Hall | Generative-content culture guide | - |
| SC-06 | Full-Stack Achievement Hall | Tech-panorama visualization | enterprise-service-copilot |
| SC-07 | Public-Safety Reasoning Experiment | Risk prediction, incident reasoning | public-safety-operations-review |
| SC-08 | Enterprise-Service Sandbox | Document/approval office Agent | enterprise-service-copilot |
| SC-09 | Accessibility-Friendly AI Guide | Barrier-free planning, voice nav | ai-traffic-walkability |
| SC-10 | Youth AI Science Camp | Learning-path generation, venue linkage | - |

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Detailed in the "Overall Design Area" section; this item lists the six land-use codes, building-scale totals and retain-renovate-demolish strategy, all consistent with `geometry/land_use.geojson`, `geometry/buildings.geojson` and recomputation in `metrics.json`, and tied to the design-depth matrix's land-use layout and demolition elements [depth:land_use_layout], regulatory plot indicators [depth:development_intensity_controls], and recomputed building totals [metric:building_footprint_area_sqm]. Retain-renovate-demolish follows "retain heritage, retrofit, weave new" as implemented in `geometry/buildings.geojson` [depth:retain_renovate_demolish].

![Metrics Recalculation and Evidence Chain](assets/figures/metrics-evidence.png)

## Transport, Rail, Municipal Infrastructure, and Public Services

This layer implements the three-tier mobility skeleton coordinated with rail, municipal and public-service facilities supporting the slow-oriented structure of "One Belt, Three Cores, Multiple Scenarios, Blue-Green Slow Ring" (track: ai-traffic-walkability), as detailed in `geometry/roads.geojson` [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure].

- **Tier 1 (regional express)**: rail + expressway/arterial, constituting a 30-minute metropolitan accessibility circle [source:SOURCE-REGISTRY].
- **Tier 2 (intra-belt backbone)**: east-west rail branch and north-south smart-vein spine (secondary connections) linking the three cores.
- **Tier 3 (slow micro-network)**: 15-min walk circles + blue-green slow ring (greenway/pedestrian/cycleway) covering all scenario points and public spaces, with "rail + slow" seamless transfer at stations [metric:public_space_ratio].

Municipally, corridors are reserved for water supply/drainage, power and utility tunnels (`geometry/constraints.geojson`); public services fill education, culture, medical and sports service points within 15-minute living circles for balanced coverage. The slow ring also links the four landmarks, forming a "rail + cultural slow-tour" route.

## Blue-Green Network, Public Space, and Urban Character

### Blue-Green Network Skeleton

With the Jingzhang heritage park as the green axis, two north-south blue-green corridors as threads, and community pocket parks as nodes, a "one axis, two corridors, multiple nodes" skeleton is formed (`geometry/green_space.geojson`); green ratio ≈ 12.3% via waterfront promenades, tree-lined avenues and plaza green corridors [metric:green_ratio] [depth:blue_green_public_space].

### Four AI Pilgrimage Landmarks (L1~L4)

- **L1 Jingzhang Smart-Vein Gate**: the north gateway, a "zigzag" steel structure interpreting railway memory merged with AI.
- **L2 Open-Source Plaza**: the Zhongzhi Park core, hosting the AI innovation contribution wall, annual flagship releases and open-source carnival.
- **L3 Full-Stack Achievement Hall**: an enterprise exhibition hall in AI Origin Community showcasing China's AI full-stack independent-innovation achievements.
- **L4 Dazhongsi AI Star Hall**: a south gateway cultural salon injecting immersive AI culture-tourism experiences.

### AI-Native New Business and Urban Character

Four categories—"open-source source creation, pilot transformation, culture experience, life service"—cultivate AI-native business to form a self-sustaining ecology; character follows the "smart-vein symbiosis" three-segment theme described above [depth:blue_green_public_space].

![Transport, Slow Mobility and Blue-Green Public-Space Composite System](assets/figures/mobility-bluegreen.png)

## Renewal Projects, Implementation Policy, and Phasing

### Renewal Project List (JZ-01~JZ-06)

| Project | Content | Key Area |
|---|---|---|
| JZ-01 | Open-Source Plaza and Source Tower | Zhongzhi Park |
| JZ-02 | Pilot-Maturing Base and Compute Hub | AI Origin Community |
| JZ-03 | Full-Stack Achievement Hall | AI Origin Community |
| JZ-04 | Dazhongsi AI Star Hall and Cultural Salon | Dazhongsi |
| JZ-05 | Jingzhang Heritage Vitality Belt and Blue-Green Slow Ring | Whole belt |
| JZ-06 | Low-Capacity Smart Rail and Unmanned Delivery Corridor | Whole belt |

[depth:renewal_project_list] [source:AGENT-TASKBOOK]

### Implementation Policy and Phasing

- **Near term (2026—2027)**: deepen overall regulatory design and key-area concept design; launch JZ-01/JZ-05; start the slow-mobility and unmanned-delivery pilot.
- **Mid term (2028—2030)**: complete the Zhongzhi Park and AI Origin Community cores; open the L1~L4 landmarks; launch the annual GAIW flagship event.
- **Long term (2031— )**: full-scenario operation across the belt; mature the "One Belt, Three Cores"; sustainable AI innovation ecosystem and brand effect. [depth:phasing_implementation]

## Metrics, Area Recalculation, and Compliance Matrix

Indicators fall into three categories, recomputed in `metrics.json` [depth:metrics_recalculation]:

- **Spatial**: site_area_sqm (±11412825), building_footprint_area_sqm (±310807), green_ratio (±0.1234), public_space_ratio (±0.0733), key_area_count=3 [metric:site_area_sqm], with building total at [metric:building_footprint_area_sqm], green/public ratios at [metric:green_ratio] and [metric:public_space_ratio], and key-area count at [metric:key_area_count]. Floor_area_ratio is declared unknown absent an approved FAR control [metric:floor_area_ratio], to be recomputed once official regulatory data are released.
- **Regulatory**: land-use structural ratios, development-intensity gradients, transport and blue-green controls, in `compliance_matrix.json`, `standard_matrix.json`.
- **Performance**: scenario count (10), personas (5), test scenarios (3), landmarks (4), projects (6), etc.

The compliance matrix covers announcement 1.3/1.4/1.5 (17 items) and agent.1~agent.6 (6 items); the standard matrix covers 6 professional standards; the design-depth matrix covers 15 depth items (`design_depth_matrix.json`) [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Risk, Copyright, and Compliance

- **Boundary compliance**: boundaries and areas are based on provisional data (`official_boundary=false`) and are not statutory conclusions; all layers must be recomputed and replaced once official polygons are released [depth:risk_missing_data].
- **Copyright and display**: community-display nature (license=COMMUNITY-DISPLAY-ONLY); materials and indicators are registered in `sources.json`; no unauthorized third-party copyrighted works are referenced.
- **Risk exposure**: official SITE_BOUNDARY, KEY_AREA, approved FAR and surveyed terrain are not yet available—the largest current data gap, disclosed truthfully in the missing-data checklist and `assumptions.json`; this does not block content scoring [source:ASSUMPTIONS].

## References

- The 2026-05-09 eligibility announcement and the organizer-issued `design_brief.json`, `allowed_design_space.json`, `agent_task_requirements.csv` [source:OFFICIAL-ANNOUNCEMENT].
- The `brief/site-package/` provisional boundaries, key areas, enums, metrics and source list; `data/source_registry.json`, `data/processed/agent_fact_pack.md` [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK].
- The organizer's agent.1~agent.6 taskbook and scoring requirements [source:AGENT-TASKBOOK].