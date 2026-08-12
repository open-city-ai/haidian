---
title: "JINGZHANG SPIKE — A Public Connection Layer That Nails AI into the Real City"
author_github: "chaos-cl"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Using the 'spike' as the master motif: a railway spike fixes the rail to the sleeper, while a software spike turns uncertainty into a verifiable prototype. This proposal translates the century-old Jing-Zhang spirit of indigenous engineering into a public connection layer for the AI Innovation Belt — one green corridor, three spikes, two wings of fasteners — so that every AI innovation first passes a city-scale spike test before being reliably nailed into the real city."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "robot-delivery-low-speed", "ai-cultural-guide", "enterprise-service-copilot", "public-safety-operations-review", "ai-health-service-navigation"]
iteration: "v0.1"
---

# JINGZHANG SPIKE — A Public Connection Layer That Nails AI into the Real City

## Design Basis and Source Inventory

This proposal takes the Prequalification Announcement of the Centennial Jing-Zhang AI Innovation Belt International Urban Design Solicitation issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources as its primary task basis [source:OFFICIAL-ANNOUNCEMENT], the cleared taskbook excerpt of the open call for intelligent agents as its co-creation constraints [source:AGENT-TASKBOOK], the structured site package under `brief/site-package/` (design_brief, allowed_design_space, enums, ranges, standards, schemas) as machine-readable basis, and `data/source_registry.json` to define material use boundaries [source:SOURCE-REGISTRY]. `data/processed/agent_fact_pack.md` serves only as a reading navigation layer and is not a new authoritative source [source:PROCESSED-FACT-PACK].

Material boundary rules: formal basis uses only the announcement, the taskbook, professional standards, and rights-cleared materials; public reports on the Jing-Zhang Railway Heritage Park, transit stations, and key districts serve only as background support and are registered one by one in `sources.json` with source, purpose, and restriction [source:SOURCE-REGISTRY] [depth:existing_conditions_diagnosis]. Because official redlines, regulatory-planning indicators, road alignments, and engineering conditions are not yet publicly available, all spatial conclusions in this proposal are conceptual recommendations under a provisional boundary; any area, ratio, and massing recalculation becomes invalid and must be recomputed when official data is released [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm].

![Evidence chain and submission package diagram](assets/figures/site-overview.png)

## Three-Level Scope Framework

The three levels correspond to three working depths: the Coordinated Research Area (43.6 km²) answers "how to organize the AI innovation ecosystem and future urban form"; the Overall Design Area (11.4 km²) answers "how to map urban renewal and regulatory-depth urban design"; the Key-Area Detailed Design Area (368.4 ha) answers "how to bring the three key districts to detailed design depth" [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]. This proposal uses the provisional rough polygons from `provisional_boundaries.geojson` with `official_boundary=false` and `geometry_role=provisional_constraint`, for generation, self-check, visualization, and design discussion only [data:geometry/site_boundary.geojson#SITE-001] [source:BOUNDARY-SOURCE].

| Level | Design question | Proposal answer | Data anchor |
| --- | --- | --- | --- |
| Coordinated Research Area | How to organize the AI industrial ecosystem and future urban form | Build a "century heritage — open protocol — urban agent" innovation chain | [data:geometry/land_use.geojson#LU-001], standard_matrix.json |
| Overall Design Area | How to map industry space, renewal, mobility, utilities, and character | One corridor, three spikes, two wings, slow-traffic stitching | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-Area Detailed Design | How to bring the three districts to detailed depth | Three detailed schemes: Forge, Origin Spike, Hub Spike | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

![Three-level scope and spatial framework](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future-City Study

### Overall Concept and Naming System (agent.1)

**Primary name: JINGZHANG SPIKE (THE SPIKE).** The motif comes from the railway spike — the smallest connector that nails the rail to the sleeper — and from the software-engineering term "spike," a rapid prototype built to test uncertainty. The pun expresses this proposal's core argument: **the AI Innovation Belt should become a public connection layer in which every AI innovation first passes a city-scale spike test and is then reliably, traceably nailed into the real city, just like a railway spike.** The name also echoes the moment when Zhan Tianyou answered the taunt that "no engineer to build this railway has yet been born in China" with indigenous engineering [source:JZ-RAILWAY-HISTORY], writing "self-reliance, verification, and connection" into the Belt's public memory.

The naming system follows a "spike family" structure: the Belt is named JINGZHANG SPIKE; the three zones are the Forge Spike (Zhongzhiyuan), the Origin Spike (Beijing AI Origin Community), and the Hub Spike (Dazhongsi); the two wings are the Service Fastener (Zhongguancun Technology Services Wing) and the Scenario Fastener (Xiaoyue River Scenario Enablement Wing); transit stations are "coupling spikes." Logo direction: the herringbone switchback (Zhan Tianyou's pioneering "人"-shaped railway) is composed with the side profile of a railway spike to form a "human-shaped spike" symbol — preserving the Jing-Zhang railway's memory fingerprint while expressing the governance stance that "AI serves people and humans and machines travel together" [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Five Functions and the Three Zones–Two Wings Feedback Loop (agent.1/agent.2)

The five functions form a spatial closed loop: the **Full-Stack Independent AI Innovation System** is anchored in the Zhongzhiyuan Forge (model training, standard setting, safety evaluation); the **World-Class AI Innovation Ecosystem** is jointly supported by the Origin Spike (basic innovation) and the Zhongguancun Services Wing (capital, compute, data, going-global services); the **New AI-Enabled Scenario Paradigm** is carried by the Xiaoyue River Scenario Wing; the **Intelligent AI Vitality City** is carried by the Jing-Zhang green corridor and public-space network; and **Global Discourse on AI Governance** is exported through open protocols, evaluation sandboxes, and the honor system [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The feedback loop: the Origin Spike produces basic innovation → the Forge Spike completes full-stack verification and standard setting → the Hub Spike converts AI-native business formats → the two wings supply factors and scenarios in return → the green corridor acts as the public interface where citizens and international visitors can perceive and participate.

### Global AI Innovation Ecosystem Cases (agent.2)

The proposal studies 5–8 global cases and distills transferable mechanisms [depth:ai_ecosystem_case_study]:

- **Stanford Research Park (USA):** In the 1950s the university and the City of Palo Alto annexed 700 acres of Stanford land, using long-term ground leases and alumni networks to sustain the research–industry loop that incubated HP, Tesla, and others [source:CASE-STANFORD].
- **one-north, Singapore:** A 200-hectare mixed-use estate; LaunchPad has supported over 2,400 startups since 2015, producing three unicorns: Carousell, PatSnap, and Nium [source:CASE-ONENORTH].
- **Station F, Paris:** Opened in 2017 as the world's largest startup campus; in the first half of 2026 resident companies raised €800 million, and one in five founders holds a PhD or higher [source:CASE-STATIONF].
- **King's Cross Knowledge Quarter, London:** A PPP-led renewal of 67 acres of brownfield; planning mandated 40% public space and allowed 20% flexible ground-floor use, attracting Google and Meta [source:CASE-KINGSCROSS].
- **Shenzhen Bay Science & Technology Ecological Park:** Total investment of about RMB 21.1 billion and 1.88 million m² of floor area; home to over 700 companies, with three park funds totaling over RMB 700 million [source:CASE-SHENZHENBAY].
- **Hangzhou Future Sci-Tech City:** Core-area corporate revenue grew from RMB 20.3 billion (2011) to RMB 624.2 billion (2019), driven by a "talent special zone plus platform institutions" model [source:CASE-HANGZHOU].
- **Zhongguancun Software Park (local benchmark):** 2.6 km² with 3.1 million m² of buildings; total output value of RMB 429.54 billion in 2021, using a "mentor-startup + campus-industry collaboration + scenario opening" model [source:CASE-ZPARK].

Distilled conclusions: **spatially**, "shallow-depth campuses adjacent to universities + high public-space ratio + flexible ground floors"; **mechanistically**, "patient capital + scenario opening + standards/evaluation infrastructure"; **culturally**, "pilgrimage-worthy public memory carriers." These are mapped respectively to the land-use partition, the scenario cards, and the landmark system [depth:overall_spatial_structure].

## Overall Design Area: Urban Renewal and Regulatory-Depth Urban Design

The spatial structure of the Overall Design Area is "**one corridor, three spikes, two wings**" [depth:overall_spatial_structure] [data:geometry/land_use.geojson#LU-001]:

- **One corridor:** the Jing-Zhang Railway Heritage Park green corridor (a 9-km linear public space) serves as the cultural spine and public connection layer, combining slow-traffic connectivity, historical narrative, and AI scenario display [source:JZ-PARK-PHASE2] [data:geometry/green_space.geojson#GS-001].
- **Three spikes:** the three key districts act as innovation anchors (see the Key-Area Detailed Design section).
- **Two wings:** the Zhongguancun Technology Services Wing (west, factor allocation) and the Xiaoyue River Scenario Enablement Wing (east, scenario opening) act as functional fasteners.
- **Coupling spikes:** transit stations — Wudaokou, East Qinghuadonglu, Dazhongsi, and Xuezhuyuan — act as station–city integration points [source:OFFICIAL-ANNOUNCEMENT].

The land-use layout follows the principles of "corridor first, shallow depth near campuses, station–city mix": parkland and public space along both sides of the corridor; research and incubation land around Tsinghua, Peking University, and CAS; business and AI-native formats around Dazhongsi Station and the North Third Ring; residential and community services retained in the east [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLD-001]. Massing follows a character-control recommendation of "low along the corridor, concentrated at nodes": low-rise public buildings within 200 m of the corridor, moderate concentration around stations; specific heights and intensities await official regulatory conditions and are never given statutory values in this document [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:height_massing_character] [depth:development_intensity_controls].

## Key-Area Detailed Design

All three key areas reference their corresponding features in `geometry/key_areas.geojson`; the design depth reaches the Integrated Planning Implementation Plan level [depth:three_key_area_detailed_design].

![Key areas index and design task diagram](assets/figures/key-areas.png)

### Zhongzhiyuan AI Independent Innovation Acceleration Area — Forge Spike [data:geometry/key_areas.geojson#PROV-KEY-001]

- **Positioning:** a garden-style AI innovation district that seizes the national AI platform opportunity to build a full-stack independent AI innovation system and safety-governance showcase [source:OFFICIAL-ANNOUNCEMENT].
- **Spatial structure:** with the Qinghe waterfront as the ecological backdrop, a "test loop—standards workshop—showcase gallery" trilogy; an external-transport optimization concept is proposed with the Fifth Ring integration [source:OFFICIAL-ANNOUNCEMENT].
- **AI scenarios:** indigenous model test loop (testing and validation), standards-setting workshops, safety-governance sandbox, low-carbon compute experience (see scenario cards SC-02, SC-03).
- **Implementation risks:** regulatory indicators, transit integration, and engineering conditions await official data; only directional design is offered under the provisional boundary.

### Beijing AI Origin Community — Origin Spike [data:geometry/key_areas.geojson#PROV-KEY-002]

- **Positioning:** a near-campus AI innovation district centered on basic innovation from Tsinghua, Peking University, and CAS, building a borderless "urban agent showroom" [source:OFFICIAL-ANNOUNCEMENT] [source:AI-ORIGIN-COMMUNITY].
- **Spatial structure:** anchored on Wudaokou Station and the former Qinghuayuan Station site, stitching campus–park–neighborhood slow-traffic links into a "publishing hall—incubation street—talent housing" near-campus innovation chain [source:JZ-TSINGHUA-STATION].
- **AI scenarios:** open-source publishing hall (SC-01), urban agent showroom (SC-04), AI education open classroom (SC-11).
- **Implementation risks:** campus boundaries, ownership, and ground-floor uses require professional confirmation; the existing operational base of "about 7,000 daily passersby/residents and over 120 annual events" can serve as a launch condition [source:AI-ORIGIN-COMMUNITY].

### Dazhongsi AI Industry Cluster — Hub Spike [data:geometry/key_areas.geojson#PROV-KEY-003]

- **Positioning:** an urban AI innovation district focused on AI-native and AI-enabled formats such as agents, intelligent terminals, and content consumption [source:OFFICIAL-ANNOUNCEMENT].
- **Spatial structure:** four-quadrant pedestrian connectivity and station–city integration around Dazhongsi Station; combined with renewal carriers such as Zhongkun Plaza to organize a "pitching lounge—AI-native commerce—data-factor parlor" chain [source:OFFICIAL-ANNOUNCEMENT] [source:DAZHONGSI-UPDATE].
- **AI scenarios:** four-quadrant pedestrian safety perception (SC-05, testing and validation), international pitching lounge (SC-06), data-factor parlor (SC-12).
- **Implementation risks:** the interchange passage, renewal progress, and property relations require professional confirmation; the current out-of-station transfer between Lines 12 and 13 is a near-term improvement entry point [source:DAZHONGSI-METRO].

## AI Innovation Ecosystem, Personas, and AI-Enabled Scenarios

### User Personas (≥5 types) [depth:user_persona]

| Persona | Typical needs | Spatial response | Privacy and compliance boundary |
| --- | --- | --- | --- |
| P1 Open-source developer | Publishing, collaboration, testing, community reputation | Origin publishing hall, public code wall, night collaboration space | No personal behavior tracking; activity data aggregated only |
| P2 Startup team | Low-cost office, compute access, product testbed | Zhongzhiyuan shared test field, edge-compute station | Compute and data services require separate authorization |
| P3 Enterprise visitor | Showcase, business, international reception, recruiting | Dazhongsi pitching lounge, transit connection | Corporate marks and cases must be rights-cleared |
| P4 Nearby resident | Commuting, leisure, community services, low-disruption renewal | Green-corridor slow loop, embedded community services | Resident profiles never used for commercial recommendation |
| P5 University faculty/students | Tech transfer, cross-campus collaboration, daily walking | Campus–park slow-traffic stitching, AI education classroom | Campus data and research outputs require authorization |
| P6 International visitor/developer | Culture, pilgrimage, international exchange | Landmark route, bilingual guide | Minimized collection of facial/trajectory data |

### AI Scenario Cards (12 cards, ≥10; including 4 testing and validation scenarios) [source:AGENT-TASKBOOK] [depth:scenario_card]

| ID | Scenario card | Spatial carrier | Type | Users | Privacy/review boundary |
| --- | --- | --- | --- | --- | --- |
| SC-01 | Open-source publishing hall | Origin community | Scenario | P1/P5 | Aggregated statistics; human review of published content |
| SC-02 | Indigenous model test loop | Zhongzhiyuan | **Testing & validation** | P2 | Test data desensitized; independent safety-evaluation review |
| SC-03 | Safety-governance sandbox | Zhongzhiyuan | **Testing & validation** | P1/P2 | Red-team testing in a controlled environment; human review of results |
| SC-04 | Urban agent showroom | Origin community | Scenario | P1/P5 | Public-data-driven, explainable, human-reviewed |
| SC-05 | Dazhongsi four-quadrant pedestrian perception | Dazhongsi Station | **Testing & validation** | P3/P4 | Pedestrian data anonymized; never used for individual identification |
| SC-06 | International pitching lounge | Dazhongsi | Scenario | P3 | By appointment; image release requires authorization |
| SC-07 | Green-corridor AI guide | Along the corridor | Scenario | P4/P6 | Public cultural materials only |
| SC-08 | Edge-compute station | Nodes across the area | Scenario | P2/P5 | Compute quota management; compliant log retention |
| SC-09 | Accessible AI public services | Communities/stations | Scenario | P4 | On-site human assistance as fallback (Art. 39 of the Barrier-Free Law) [standard:BARRIER-FREE-ENVIRONMENT-LAW] |
| SC-10 | Low-speed delivery test corridor | Xiaoyue River Wing | **Testing & validation** | P4 | Right-of-way application and safety-officer system; incident review |
| SC-11 | AI education open classroom | Origin community/corridor | Scenario | P5 | Minors' data protection; teaching-content review |
| SC-12 | Data-factor parlor | Dazhongsi | Scenario | P3 | Data authorization and audit trail; illegal trading prohibited |

Each scenario card maps to the registered scenarios under `scenarios/*.json`, spatial layers, and operating entities; the narrative keeps only readable summaries, and full fields are stored in the structured scenario registry and the compliance matrix [source:AGENT-TASKBOOK].

## Land Use, Building Scale, and Demolish–Renovate–Retain Strategy

The land-use plan partitions the provisional boundary completely and seamlessly, with no gaps or overlaps [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001]. Conceptual zones: green-corridor parkland, research/innovation land (near campuses), business/AI-native land (Dazhongsi), and residential/community-service land (east); ratios and areas are recomputed in `metrics.json` [metric:green_ratio] [metric:public_space_ratio]. Building footprints are conceptual illustrations, not existing conditions or approvals; the demolish–renovate–retain strategy follows a directional classification of "retain first, renovate second, new-build concentrated in renewal parcels," pending an existing-building survey and ownership confirmation [depth:retain_renovate_demolish] [data:geometry/buildings.geojson#BLD-001]. Regulatory indicators — FAR, building height, building density — are uniformly `status=unknown` and will be recomputed when official regulatory conditions are confirmed [depth:development_intensity_controls].

## Mobility, Transit, Municipal, and Public Service Facilities

The mobility strategy centers on "transit coupling, slow-traffic stitching, delivery separation" [depth:traffic_rail_slow_parking]:

- **Transit coupling:** integrated design around Wudaokou, East Qinghuadonglu, Dazhongsi, and Xuezhuyuan stations [source:OFFICIAL-ANNOUNCEMENT]; four-quadrant pedestrian connectivity at Dazhongsi Station and Line 12/13 transfer optimization are near-term priorities [source:DAZHONGSI-METRO].
- **Slow-traffic stitching:** the Jing-Zhang green corridor runs north–south as the main axis; Zhichun Road, Chengfu Road, and North Fourth Ring connectors stitch east–west and remove breaks [data:geometry/roads.geojson#ROAD-001] [data:geometry/public_space.geojson#PUB-001].
- **Delivery separation:** a low-speed delivery corridor is placed in the Xiaoyue River Wing, separated from main pedestrian flows [data:geometry/roads.geojson#ROAD-001].
- **Municipal and new infrastructure:** edge compute, distributed energy, and smart street furniture are integrated with public service nodes; specific utility routes and capacities await municipal conditions [depth:municipal_new_infrastructure] [data:geometry/constraints.geojson#CON-001].

![Mobility, slow traffic, and blue-green public-space system](assets/figures/mobility-bluegreen.png)

## Blue-Green Space, Public Space, and Urban Character

The Jing-Zhang green corridor is the "public connection layer" of the proposal [depth:blue_green_public_space] [data:geometry/green_space.geojson#GS-001] [data:geometry/public_space.geojson#PUB-001]: Phase One (16.8 ha) opened in 2023, and Phase Two opened in August 2026, forming a 9-km green corridor serving about 70 communities and 450,000 residents along the line [source:JZ-PARK-PHASE2]. On this basis the proposal adds three layers of public function: the **cultural layer** (memory of the old Jing-Zhang main line, the Qinghuayuan Station narrative), the **living layer** (slow traffic, sports, community services), and the **AI layer** (scenario display, test observation windows, honor system). Character control proposes a "low along the corridor, concentrated at nodes, human-shaped symbol" guideline, avoiding pseudo-precise control lines [standard:MOHURD-URBAN-DESIGN-MEASURES].

### AI Pilgrimage Landmarks and Honor System (agent.4, ≥3) [source:AGENT-TASKBOOK]

| ID | Landmark | Location | Meaning |
| --- | --- | --- | --- |
| L-01 | Origin Spike Monument | Near the former Qinghuayuan Station | Double commemoration: the "journey to Beijing for governance" first stop and the AI origin [source:JZ-TSINGHUA-STATION] |
| L-02 | Human-Shaped Spike Public Signal Tower | Wudaokou | Herringbone switchback symbol + public status display of AI services |
| L-03 | Agent Contribution Honor Wall | Mid-corridor | Permanent commemoration system: engraved GitHub IDs and agent names |
| L-04 | Jing-Zhang Ring 1909 Plaza | North corridor | Echoes the completed landmark; annual-event main venue [source:JZ-PARK-PHASE2] |

All landmarks are conceptual recommendations subject to heritage, landscape, and approval procedures; they must not be treated as approved construction [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Renewal Project List, Implementation Policy, and Phasing

| ID | Project | Type | Key dependencies | Evidence |
| --- | --- | --- | --- | --- |
| JZ-01 | Corridor slow-traffic break stitching | Public space/mobility | Road redlines, under-bridge space, traffic review | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Dazhongsi four-quadrant pedestrian connectivity | Transit integration/slow traffic | Station, intersections, utilities | [data:geometry/public_space.geojson#PUB-001] |
| JZ-03 | Origin near-campus tech-transfer street | Renewal/industry services | Campus boundaries, ownership, ground-floor uses | [data:geometry/buildings.geojson#BLD-001] |
| JZ-04 | Zhongzhiyuan test loop and standards workshop | Industry/new infrastructure | Regulatory plan, EIA, safety-evaluation qualifications | [data:geometry/key_areas.geojson#PROV-KEY-001] |
| JZ-05 | Edge-compute and public-service nodes | New infrastructure/public services | Energy, compute, security, operating entities | [data:geometry/constraints.geojson#CON-001] |
| JZ-06 | Pilgrimage landmarks and honor wall | Operation/brand | Public-space permits, heritage approval, rights clearance | [data:geometry/phasing.geojson#PH-001] |

Phasing: **near term (2026–2028)** starts with the Origin showroom, the southern corridor, and scenario open days — operations first, lightweight delivery; **mid term (2028–2030)** advances the Zhongzhiyuan test loop and Dazhongsi station–city integration; **long term (2030–2035)** completes the renewal list and area-wide character enhancement [data:geometry/phasing.geojson#PH-001] [depth:phasing_implementation]. Implementation-policy recommendations include a "scenario-opening list system," an "honor system and contribution record," and an "AI public-service human-review fallback" — all conceptual recommendations, not government commitments [source:AGENT-TASKBOOK].

### Global AI Event System and Long-Term Operation (agent.6)

The annual event system is branded around "**SPIKE DAY**": an "Origin Open-Source Week" in spring (publishing, collaboration, code contributions), a "Corridor Testing Season" in summer (scenario open days, low-speed delivery trials), a "Spike Forum" in autumn (international communication, attraction and conversion), and a "Honor Wall Update" in winter (annual contribution records and inscription ceremonies) [depth:operation_mechanism]. Developer-community operation uses "public data + reproducible evaluation + honor points"; scenario-opening operation follows a four-step "apply—sandbox—launch—review" process; international communication is carried by "pilgrimage routes + bilingual content + open-source showcase." All events, investment attraction, funding, and policy arrangements are conceptual recommendations or deepening directions and are not presented as confirmed arrangements [source:AGENT-TASKBOOK].

## Indicator System, Area Recalculation, and Compliance Matrix

Core indicators fall into three classes [depth:metrics_recalculation]:

1. **Spatial recalculation class** (recomputable from submitted geometry): Overall Design Area of 11,412,825 m² (provisional, matching the announced 11.4 km²) [metric:site_area_sqm]; the three key-area areas [metric:zhongzhiyuan_area_sqm][metric:ai_origin_area_sqm][metric:dazhongsi_area_sqm]; green ratio [metric:green_ratio]; public-space ratio [metric:public_space_ratio]; building-footprint ratio (conceptual) [metric:building_footprint_ratio].
2. **Control-pending class:** FAR, building height, building density, setbacks, road redlines — all `status=unknown`, see `assumptions.json` and `planning_limits.json`.
3. **Performance/operation class:** AI innovation index, talent density, event participation — see the operation mechanisms and `compliance_matrix.json`; never presented as approved indicators.

Area recalculation is performed uniformly under EPSG:4548 projection, with formulas and sources registered item by item in `metrics.json`; the compliance matrix covers all clauses 1.3/1.4/1.5 of the announcement and all tasks agent.1–agent.6, mapped to sections, layers, indicators, drawings, HTML, and self-check items [depth:compliance_mapping].

![Core metrics recalculation and evidence chain](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance Statement

All content in this proposal is a conceptual design recommendation generated by an AI agent from public or rights-cleared materials; it does not replace formal planning and does not constitute a government-approved conclusion [source:AGENT-TASKBOOK]. Key risks and responses:

- **Boundary risk:** the provisional boundary must not be presented as an official redline; all layers and indicators must be recomputed after official polygons are released [data:geometry/site_boundary.geojson#SITE-001].
- **Material risk:** all citations are registered with source and use boundaries; background materials only support, never upgrade to formal basis [source:SOURCE-REGISTRY].
- **Privacy and compliance risk:** AI scenarios follow data minimization, human review, and accessibility fallback principles [standard:GENERATIVE-AI-INTERIM-MEASURES] [standard:BARRIER-FREE-ENVIRONMENT-LAW].
- **Copyright risk:** no unauthorized graphics, fonts, logo directions, or corporate marks are used; license and asset inventories for generated content are in `report/copyright_statement.md` [depth:risk_missing_data].
- **Implementation risk:** renewal projects, events, and policy arrangements are subject to ownership, approval, funding, and engineering conditions; see `assumptions.json` and the phasing section.

## References

- Haidian Branch, Beijing Municipal Commission of Planning and Natural Resources: Prequalification Announcement of the Centennial Jing-Zhang AI Innovation Belt International Urban Design Solicitation (2026-05-09) [source:OFFICIAL-ANNOUNCEMENT]
- Cleared taskbook excerpt of the open call for global intelligent agents (2026-05-18) [source:AGENT-TASKBOOK]
- Beijing Municipal Forestry and Parks Bureau: Phase One of the Jing-Zhang Railway Heritage Park completed and opened (2023-06) [source:JZ-PARK-PHASE1]
- The Beijing News: Phase Two of the Jing-Zhang Railway Heritage public-space renovation opened (2026-08) [source:JZ-PARK-PHASE2]
- Beijing Municipal People's Government: Haidian AI Innovation Street release (2024-04) [source:AI-STREET-POLICY]
- The Beijing News: One year of change in the Wudaokou AI Origin Community (2026-06) [source:AI-ORIGIN-COMMUNITY]
- Beijing Municipal Government Information Office: Haidian AI development press conference (2025-09) [source:HAIDIAN-AI-DATA]
- Zhongguancun Science City: 2026 ZGC Forum release of the Centennial Jing-Zhang AI Innovation Belt (2026-04) [source:HAIDIAN-AI-BELT]
- Case sources: Stanford Research Park official site (700-acre research-industry model) [source:CASE-STANFORD]; JTC one-north (LaunchPad 2,400+ startups, three unicorns) [source:CASE-ONENORTH]; Station F official site (EUR 800m raised in H1 2026) [source:CASE-STATIONF].
- Case sources (continued): The Paper on King's Cross (40% public space, Google/Meta) [source:CASE-KINGSCROSS]; Shenzhen Municipal Industry and IT Bureau (RMB 21.1bn investment, 700+ firms) [source:CASE-SHENZHENBAY]; Zhejiang Government Services and People's Daily (Hangzhou revenue growth) [source:CASE-HANGZHOU]; Zhongguancun Software Park (2.6 km², RMB 429.54bn output) [source:CASE-ZPARK].
- Full machine-readable index: see `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, and `design_depth_matrix.json` [source:SITE-PACKAGE]
