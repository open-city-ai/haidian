---
title: "Jing-Zhang Intelligence Pulse: Conceptual Urban Design for the Centennial Jing-Zhang AI Innovation Belt"
author_github: "Fork8-dev93"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Under the overall concept 'From the herringbone track to the intelligence pulse', the proposal builds a 'one spine, three cores, two wings, two rings' spatial structure along the Jing-Zhang Railway Heritage Park, with a naming system, AI ecosystem, scenario cards, pilgrimage landmarks, cultural narrative, and long-term operation mechanisms. All spatial proposals are conceptual suggestions based on provisional constraints, offered for professional teams to deepen."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "youth-friendly-public-space"]
scenarios: ["ai-cultural-guide", "ai-health-service-navigation", "ai-traffic-walkability", "enterprise-service-copilot", "robot-delivery-low-speed"]
iteration: "v0.1"
---

# Jing-Zhang Intelligence Pulse: Conceptual Urban Design for the Centennial Jing-Zhang AI Innovation Belt

## Design Basis and Source List

This proposal is an AI-agent conceptual design for the "Centennial Jing-Zhang AI Innovation Belt International Urban Design Open Call". It is an open co-creation suggestion; it does not replace statutory planning and does not constitute an approved government conclusion. The design relies primarily on cleared public materials in the repository: the qualification pre-announcement by Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources (three scope levels, announced areas, and design tasks) [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]; the agent-facing taskbook excerpt (three positionings, five functions, three areas and two wings, and six agent tasks) [source:DATA-SRC-AGENT-TASKBOOK-20260518]; the repository-maintained provisional rough polygons for the three scope levels and three key areas [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]; and local snapshots of professional standards including the Urban Design Administrative Measures, the Regulatory Detailed Planning Measures, and the Land Use Classification Guide [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

The boundaries used here are **provisional constraints**: the announcement does not release an exact redline, so the repository derived rough polygons from the textual four limits and announced areas, checked in EPSG:4548. They are used only for generation, visualization, and intake self-check; they must not be treated as an official redline, approval basis, or precise-area basis. When official polygons arrive, all area-bearing layers and metrics must be recalculated [data:geometry/site_boundary.geojson#PROV-SITE-001] [depth:three_level_scope_framework]. Data gaps (statutory controls, existing building stock, ownership boundaries) are recorded in the assumptions and risk sections rather than presented as confirmed conclusions. Complete source, metric, standard, depth, and task coverage indexes live in `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, and `design_depth_matrix.json`.

![Site overview (provisional boundary shown as dashed line)](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal implements the announcement's three scope levels with graduated design depth: the **coordinated research area (about 43.6 km²)** carries industry strategy and future-city research, answering "why build and what ecosystem"; the **overall design area (about 11.4 km²)** carries regulatory-plan-level urban renewal design, answering "how space is organized and renewal advanced"; the **key detailed-design area (about 368.4 ha total across three key areas)** carries detailed design, answering "what the three cores look like and how scenarios land" [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] [metric:overall_design_area_announced_sqm] [depth:three_level_scope_framework].

The three levels are connected by "structural transmission": the "one spine, three cores, two wings, two rings" structure defined at the research level is realized in the overall design area as land-use zones, the green spine, and the road network [data:geometry/land_use.geojson], then in the key areas as building massing, public space, and AI scenario nodes [data:geometry/key_areas.geojson] [depth:three_level_scope_framework]. All three levels use provisional constraints here: announced values are cited for areas [metric:coordinated_research_area_announced_sqm] [metric:key_detailed_design_area_announced_sqm], and recomputed geometry values serve display and self-check only. After official polygons are released, `site_boundary.geojson`, `land_use.geojson`, and all area metrics must be fully recalculated [depth:metrics_recalculation] [depth:land_use_layout].

![Three-level scope and spatial structure framework](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Overall Concept and Naming System (agent.1)

The proposal introduces **"Jing-Zhang Intelligence Pulse" (JZ-Pulse)** as the overall concept for the belt: it translates the autonomous-innovation spirit of Zhan Tianyou's herringbone ("人"-shaped) line conquering Badaling a century ago into the intelligence pulse flowing along the Jing-Zhang railway today — data, compute, talent, and capital flowing again along the historic track [source:DATA-SRC-AGENT-TASKBOOK-20260518] [depth:overall_spatial_structure]. The naming system uses "智脉 / Pulse" as a common root:

| Level | Name | English | Space |
|---|---|---|---|
| Belt | 智脉京张 | Jing-Zhang Intelligence Pulse | Coordinated research area |
| Core | 智脉·加速 | JZ-Pulse Acceleration | Zhongzhiyuan AI Acceleration Area |
| Core | 智脉·原点 | JZ-Pulse Origin | Beijing AI Origin Community |
| Core | 智脉·聚场 | JZ-Pulse Hub | Dazhongsi AI Industry Cluster |
| Wing | 智脉·服务翼 | JZ-Pulse Service Wing | Zhongguancun Technology Service Wing |
| Wing | 智脉·场景翼 | JZ-Pulse Scenario Wing | Xiaoyuehe Scenario Empowerment Wing |

Logo direction: a graphic mark combining the herringbone track and pulse waveform — two pulse lines diverge forward from the historic origin (Qinghuayuan Station) to form a "人" shape, echoing both the herringbone railway and people-centered governance [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]; a dual-color system of "Jing-Zhang blue (heritage) + pulse orange (AI vitality)" accompanies the bilingual logotype and grid specification as a basis for professional deepening [depth:ai_ecosystem_scenarios].

### Industrial Ecosystem and Five Functions (agent.2)

Within the "three areas, two wings" industrial framework [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS], the proposal maps the taskbook's five functions into spatial function circles [source:DATA-SRC-AGENT-TASKBOOK-20260518]:

1. **AI full-stack independent innovation system** → Zhongzhiyuan acceleration area: foundation models, compute centers, open-source platforms, and full-stack toolchains [data:geometry/key_areas.geojson#PROV-KEY-001];
2. **World-class AI innovation ecosystem** → Origin community: startup incubation, venture capital, talent housing, and international exchange [data:geometry/key_areas.geojson#PROV-KEY-002];
3. **AI+ scenario empowerment paradigm** → Xiaoyuehe scenario wing: open testing of healthcare, education, and mobility scenarios [data:geometry/land_use.geojson];
4. **Intelligent AI vital city** → Dazhongsi cluster: AI-native consumption, business, and exhibitions [data:geometry/key_areas.geojson#PROV-KEY-003];
5. **Global voice in AI governance** → Zhongguancun service wing: standards, evaluation, ethics governance, and international organizations [depth:ai_ecosystem_scenarios].

Global AI ecosystem cases (7 readable summaries, all public): **Sand Hill Road–Stanford corridor** (research-capital-startup integration); **Zhongguancun Science City** (major platforms, facilities, and models); **Nanshan Science Park, Shenzhen** (fast hardware and scenario iteration); **Hangzhou West Science and Innovation Corridor** (ecosystem and scenario opening); **King's Cross regeneration, London** (railway heritage renewed as a knowledge-economy district); **Hudson Yards, New York** (dense mixed use and public-space operation); **one-north, Singapore** (industry-city integration and governance standards) [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS]. Their transferable mechanisms — "heritage renewal + scenario opening + community operation" — directly underpin this proposal's spatial structure and operation design [depth:ai_ecosystem_scenarios].

![Three key areas: index and design tasks](assets/figures/key-areas.png)

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Spatial Structure: One Spine, Three Cores, Two Wings, Two Rings

The overall design area proposes a **"one spine, three cores, two wings, two rings"** structure [depth:overall_spatial_structure]:

- **One spine**: the **Intelligence Pulse Green Belt** along the Jing-Zhang Railway Heritage Park, running north–south through the belt as a composite main line of culture, slow mobility, public space, and AI scenarios [data:geometry/green_space.geojson] [metric:green_space_area_sqm];
- **Three cores**: the Zhongzhiyuan acceleration core, the Origin community, and the Dazhongsi hub, carrying the detailed design of the three key areas [data:geometry/key_areas.geojson];
- **Two wings**: the Zhongguancun service wing (west) and the Xiaoyuehe scenario wing (east), forming a finger-like "main line + wings" structure with the green belt;
- **Two rings**: the northern Qinghe innovation ring (Zhongzhiyuan–North 5th Ring industrial synergy) and the southern Xizhimen vitality ring (Dazhongsi–urban services), organized by cross connectors [data:geometry/roads.geojson].

Land use follows a "green belt — innovation band — living band" layout (conceptual) [data:geometry/land_use.geojson]: the Intelligence Pulse Green Belt is green and open space (about 139.6 ha; green ratio about 12.2%) [metric:green_ratio]; within 280 m of the belt is a research-innovation band (about 287.1 ha) [metric:land_use_0802_area_sqm]; at 280–450 m, innovation mixed commerce (about 343.3 ha) [metric:land_use_05_area_sqm]; outer areas hold residential and public services (residential and community services about 267.3 ha, public services about 70.1 ha, culture about 33.9 ha) [metric:land_use_07_area_sqm] [metric:land_use_0804_area_sqm] [metric:land_use_0803_area_sqm]. These ratios are conceptual results, not statutory land balance [depth:land_use_layout].

### Urban Renewal Framework and Building Scale

Urban renewal follows "retain first, incremental renewal, AI-scenario leverage" (conceptual) [depth:retain_renovate_demolish]: along the green belt, environmental improvement and functional renewal dominate, preserving historic buildings and community fabric; the innovation band relies on functional replacement and moderate new build; the three cores act as renewal engines activating stock space through AI scenarios. Building scale is expressed as conceptual footprints (about 103.4 ha with a conceptual average of about 12 storeys) [metric:building_footprint_area_sqm] [metric:total_floor_area_concept_sqm]; statutory controls such as FAR and building height are pending official regulatory conditions and no approved values are given [metric:floor_area_ratio] [metric:building_height_m].

## Detailed Design of Key Areas

All three key areas are provisional constraints; the positioning, structure, and projects below are directional conceptual designs for professional teams to deepen [data:geometry/key_areas.geojson] [depth:three_key_area_detailed_design].

### Zhongzhiyuan AI Acceleration Area (JZ-Pulse Acceleration, about 192.1 ha)

Positioning: the **"accelerator and test ground" of the AI full-stack independent innovation system**. Structure: "one core, two belts" — a core of full-stack R&D and open-source platform clusters (research core) [data:geometry/land_use.geojson], surrounded by a service-support belt (community services and commerce) and a waterfront ecology belt. Renewal strategy: functional replacement and new R&D carriers (conceptual). AI scenarios: model training, evaluation, and embodied-intelligence testing [depth:ai_ecosystem_scenarios]. Risk: complex existing industries and ownership; requires stock surveys and official regulatory conditions before gradual implementation.

### Beijing AI Origin Community (JZ-Pulse Origin, about 104.3 ha)

Positioning: the **"startup origin and talent community" of a world-class AI innovation ecosystem**. Structure: "mixed blocks + talent ring" — a core of incubation and exchange mixed blocks (commercial mixed), surrounded by talent apartments and innovation communities [data:geometry/land_use.geojson]. Renewal strategy: stock building renewal, shared offices, and scenario activation (conceptual). AI scenarios: startup roadshows, open-source collaboration, and talent services. Risk: renewal near universities requires coordination with education/research institutions and traffic relief.

### Dazhongsi AI Industry Cluster (JZ-Pulse Hub, about 72.0 ha)

Positioning: the **"urban living room and consumption test bed" for AI-native new business forms**. Structure: "commerce core + culture band" — a core of intelligent business and consumption scenarios (commercial services), surrounded by culture display and smart-experience spaces [data:geometry/land_use.geojson]. Renewal strategy: commercial upgrade and cultural space additions (conceptual). AI scenarios: smart consumption, exhibitions, and public experiences. Risk: adjacent to a transit hub; requires balancing passenger flows and public-space quality.

![Mobility, slow-traffic, and blue-green public space system](assets/figures/mobility-bluegreen.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### User Personas (6 types)

1. **AI researchers** (academics): need large facilities, data, and academic exchange spaces;
2. **AI founders** (startup teams): need low-cost offices, capital matching, and scenario testing;
3. **Developers and open-source contributors**: need open workstations, code-collaboration spaces, and honor systems;
4. **AI enterprise employees**: need commute shuttles, talent housing, and daily services;
5. **Community residents** (including elderly and families): need accessible public services with parallel human channels [standard:BARRIER-FREE-ENVIRONMENT-LAW];
6. **Global visitors and developer pilgrims**: need cultural guides, pilgrimage landmarks, and event participation [source:DATA-SRC-AGENT-TASKBOOK-20260518] [depth:ai_ecosystem_scenarios].

### AI Scenario Cards (12, including 4 industry test-and-validate scenarios)

| ID | Scenario | Location | Users | Data boundary | Human review | Operator |
|---|---|---|---|---|---|---|
| SC01 | Pulse Developer Promenade (AI guide + contribution codes) | Green belt | Developers/visitors | Public guide info only | Content review | Park operator + community |
| SC02 | Open-source showcase gallery | Origin community | Public | Public project metadata | Display review | Community operator |
| SC03 | Agent contribution honor wall | Green belt node | Developers | Authorized contributor info | Honor review | Organizing committee |
| SC04 | AI health station (medical navigation + human fallback) | Public service band | Residents/elderly | De-identified health queries | On-site human service | Medical + community [standard:BARRIER-FREE-ENVIRONMENT-LAW] |
| SC05 | AI co-learning classroom (education support) | Education land | Students/teachers | Minimized education data | Teacher final review | Education institutions |
| SC06 | Pulse mall smart consumption (AR shopping) | Dazhongsi | Citizens/tourists | Anonymous behavior data | Product info review | Mall operator |
| SC07 | Pulse shuttle ring (autonomous shuttle) | Two rings | Commuters | De-identified travel data | Safety-officer oversight | Transport operator |
| SC08 | Robot last-mile delivery corridor | Innovation/living bands | Residents/enterprises | Minimized delivery data | Manual pickup fallback | Logistics firms |
| SC09 | **Civic-agent governance test bed (test/validate)** | Zhongzhiyuan | Government/enterprises | Sandbox data isolation | Human final review | Governance lab |
| SC10 | **AI model safety evaluation sandbox (test/validate)** | Zhongzhiyuan | Model developers | Authorized evaluation data | Expert re-review | Evaluation body |
| SC11 | **Embodied-intelligence training ground (test/validate)** | North wing | Robotics firms | De-identified site data | Safety officer on duty | Operating body |
| SC12 | **Open data sandbox (test/validate)** | Origin community | Data developers | Tiered authorization | Data governance committee | Open-source community |

All scenarios follow common boundaries: no privacy infringement, no excessive surveillance, human review and fallback channels retained, and test scenarios are never presented as approved operations [standard:GENERATIVE-AI-INTERIM-MEASURES] [assumption:A-SCENARIO-004]; the scenario-space-operation mapping is detailed in `compliance_matrix.json` and the spatial chapters [depth:ai_ecosystem_scenarios].

![Core metrics recalculation and evidence chain](assets/figures/metrics-evidence.png)

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The land-use layout (conceptual) follows the "three-band" structure above, with 55 land-use units covering the full overall design area (recomputed coverage 100%, no overlaps or gaps) [data:geometry/land_use.geojson] [depth:land_use_layout]. Building scale is conceptual: footprints about 103.4 ha and a conceptual total floor area of about 12.41 million m² (average 12-storey assumption) [metric:building_footprint_area_sqm] [metric:total_floor_area_concept_sqm]; these are design quantities, not statutory controls [assumption:A-BUILDINGS-003].

Four retain/renovate/demolish/new strategies (conceptual) [depth:retain_renovate_demolish]: **retain** — Jing-Zhang railway heritage, well-maintained communities, and public facilities; **renovate** — facades, public space, and slow-mobility environments along the green belt; **renew** — functional replacement in the innovation band, industrial-carrier upgrades, and commercial upgrades; **new-build** — the three core engine projects and new infrastructure carriers. Parcel-level retain/renovate/demolish conclusions require stock-building surveys and ownership data and are not made here (pending official data) [metric:floor_area_ratio] [depth:development_intensity_controls].

## Transport, Rail, Municipal Infrastructure, and Public Services

Transport organization (conceptual) [depth:traffic_rail_slow_parking]: the **Pulse Greenway** forms the north–south slow-mobility main line (conceptual alignment about 9.7 km) [data:geometry/roads.geojson] [metric:road_network_length_m]; cross connectors organize the two rings for vehicle circulation; transit-station interchange anchors bus and slow-mode transfers. Municipal and new infrastructure (conceptual) [depth:municipal_new_infrastructure]: distributed energy and edge-compute nodes in Zhongzhiyuan and the north wing, integrating utility corridors, smart poles, and sensing facilities; municipal capacity and load calculations await professional conditions. Public services are arranged along the public-service band (about 70.1 ha) [metric:land_use_0804_area_sqm], retaining human service and accessible channels [standard:BARRIER-FREE-ENVIRONMENT-LAW].

## Blue-Green Network, Public Space, and Urban Character

The **Intelligence Pulse Green Belt** is the core of the blue-green system: the Jing-Zhang Railway Heritage Park forms the skeleton linking the three cores and two wings into a "string of pearls" green network (about 139.6 ha; green ratio about 12.2%) [metric:green_space_area_sqm] [metric:green_ratio]. Public space is anchored by three key-area plazas (about 24.1 ha total) [metric:public_space_area_sqm] [metric:public_space_ratio], with plaza locations in the public-space layer [data:geometry/public_space.geojson].

**AI pilgrimage landmarks (4, conceptual)** [depth:ai_ecosystem_scenarios]: 1) **Qinghuayuan Station · Origin Scale** — a 1909 timeline and zero-point coordinate honoring the railway origin; 2) **Herringbone Mark · Developer Promenade Node** — a "人"-shaped installation honoring autonomous innovation; 3) **Pulse Wall · Open-Source Showcase Gallery** — dynamic data visualization of open-source contributions; 4) **Centennial Stele · Agent Contribution Honor Wall** — a global honor-display system linked to long-term operation [source:DATA-SRC-AGENT-TASKBOOK-20260518]. Urban character (conceptual): a "low-rise, high-density, transparent interface" heritage section along the green belt; a "medium massing + green roofs" tech section in the innovation band; a "commercial vitality + night economy" urban section in Dazhongsi [standard:MOHURD-URBAN-DESIGN-MEASURES].

## Renewal Projects, Implementation Policy, and Phasing

Renewal projects are organized as "three engines" (conceptual) [depth:renewal_project_list]: **green-belt type** (heritage park activation, slow-mobility connections, node plazas; near term); **core type** (three-core industrial carriers and scenario facilities; near term); **district type** (innovation-band renewal, residential environment improvement, municipal upgrades; mid-to-long term). Policy suggestions: a "scenario-opening list + contribution points" mechanism, exchanging AI scenario testing for renewal progress, and community protocols for developer participation in public-space operation (all conceptual; not confirmed government arrangements) [source:DATA-SRC-AGENT-TASKBOOK-20260518].

Phasing matches the three phases in `phasing.geojson` (conceptual) [data:geometry/phasing.geojson]: **near term (2026–2028)** — the three cores and the green belt first (about 501.1 ha) [metric:phase1_area_sqm]; **mid term (2028–2031)** — innovation band and residential renewal (about 627.7 ha) [metric:phase2_area_sqm]; **long term (2031–2035)** — southern smart commerce completion (about 12.5 ha) [metric:phase3_area_sqm] [depth:phasing_implementation].

**Global AI events and long-term operation (agent.6)** (conceptual) [depth:ai_ecosystem_scenarios]: annual events — **JZ-Pulse Summit** (autumn; global AI and cities forum), **Open Source Contribution Week** (April), **AI Marathon** (quarterly), and **Developer Pilgrimage Season** (year-round cultural tours); brand IP — the "Pulse Starline" honor system (annual contributors enter the honor wall); developer community operation — contribution points, scenario-opening applications, and review mechanisms; international communication — bilingual content, global developer invitations, and conversion pathways. All event, investment, and policy wording is directional and not confirmed government arrangements [assumption:A-SCENARIO-004].

## Metrics, Area Recalculation, and Compliance Matrix

Core metrics (all recomputed from geometry in EPSG:4548; see `metrics.json`) [depth:metrics_recalculation]:

| Metric | Value | Unit | Meaning |
|---|---|---|---|
| Overall design area (recomputed) | 11412825 | sqm | Provisional boundary recomputation [metric:site_area_sqm] |
| Coordinated research area (announced) | 43600000 | sqm | Announced value [metric:coordinated_research_area_announced_sqm] |
| Key detailed-design area (announced) | 3684000 | sqm | Announced value [metric:key_detailed_design_area_announced_sqm] |
| Zhongzhiyuan/Origin/Dazhongsi | 192.1/104.3/72.0 | ha | Announced values [metric:zhongzhiyuan_ai_acceleration_area_sqm] [metric:beijing_ai_origin_community_sqm] [metric:dazhongsi_ai_industry_cluster_sqm] |
| Green ratio | 12.2 | % | Conceptual recomputation [metric:green_ratio] |
| Public-space ratio | 2.1 | % | Conceptual recomputation [metric:public_space_ratio] |
| Building footprints | 103.4 | ha | Conceptual generation [metric:building_footprint_area_sqm] |
| FAR / building height | pending official data | — | Regulatory conditions missing [metric:floor_area_ratio] |

Compliance coverage: `compliance_matrix.json` covers announcement tasks 1.3 (ecosystem/form/talent), 1.4 (three scope levels), 1.5 (all research/overall/key-area tasks), and agent.1–agent.6 — 23 mandatory tasks in total [depth:existing_conditions_diagnosis]; `standard_matrix.json` covers 9 professional-standard responses; all 16 core depth items in `design_depth_matrix.json` are complete [depth:risk_missing_data]. The metric chain — GeoJSON → EPSG:4548 areas → metrics.json → figures and HTML display — is single-sourced and consistent.

## Risk, Copyright, and Compliance

**Data and boundaries**: boundaries are provisional constraints, not an official redline or precise-area basis; recalculation is required when official polygons are released (see `assumptions.json` A-BOUNDARY-001) [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]. **Regulatory gaps**: FAR, height, density, and green ratio await official conditions (A-CONTROLS-002); all related wording is conceptual [metric:floor_area_ratio]. **Copyright and generation disclosure**: generated by an AI agent (deepseek-v4-flash); geometry produced with a Python/Shapely grid-partition method; all cited materials come from repository-cleared sources and official public channels; methods, provenance, and rights are detailed in `report/copyright_statement.md` [depth:risk_missing_data]; no unauthorized fonts, trademarks, portraits, or copyrighted materials are used. **Privacy and compliance**: AI scenarios collect no sensitive personal data, retain human review and fallback, and respect the applicable scope of the Interim Measures on Generative AI Services [standard:GENERATIVE-AI-INTERIM-MEASURES]. **Disclaimer**: all spatial implementation, event operation, and policy mechanisms are conceptual suggestions, reference schemes, or material for professional teams to deepen; they do not constitute approved government conclusions or confirmed implementation arrangements [source:DATA-SRC-AGENT-TASKBOOK-20260518].

## References

The full machine index of the bibliography and sources lives in `sources.json`; the primary bases are the qualification pre-announcement and the agent taskbook [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] [source:DATA-SRC-AGENT-TASKBOOK-20260518].

1. Haidian Branch, Beijing Municipal Commission of Planning and Natural Resources: Qualification Pre-announcement for the Centennial Jing-Zhang AI Innovation Belt International Urban Design Open Call (2026-05-09).
2. Excerpt of the agent-facing taskbook "Centennial Jing-Zhang AI Innovation Belt Urban Design Open Call" (user-provided cleared document, 2026-05-18).
3. Beijing Municipal Science & Technology Commission, Zhongguancun Administrative Committee: "Three Areas, Two Wings: Building a World-Class AI Cluster" (2026-04-03).
4. Haidian District People's Government: "Haidian Releases the '1+X+1' Modern Industrial System Layout" (2026-03-02).
5. Ministry of Housing and Urban-Rural Development: Urban Design Administrative Measures (2017).
6. Ministry of Housing and Urban-Rural Development: Measures for Compiling and Approving Regulatory Detailed Plans for Cities and Towns.
7. Ministry of Natural Resources: Guidelines for Land and Sea Use Classification in Territorial Spatial Survey, Planning, and Use Control (2023).
8. Standing Committee of the National People's Congress: Law of the People's Republic of China on Barrier-Free Environment Construction (2023).
9. Cyberspace Administration of China et al.: Interim Measures for the Management of Generative AI Services (2023).
10. General Office of the State Council: Implementation Plan for Effectively Solving Difficulties of the Elderly in Using Smart Technologies (Guobanfa [2020] No. 45).
11. open-city-ai/haidian repository package: `brief/site-package/`, `data/source_registry.json` (accessed 2026-08-11).
12. Repository maintainers: Provisional Rough Polygons for the Three Scope Levels and Three Key Areas of the Centennial Jing-Zhang AI Innovation Belt (2026-06-05).
