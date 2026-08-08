---
title: "Centennial Jing-Zhang REN BELT: A People-Centric AI Innovation Belt"
author_github: "caulif"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Turning the Qinglongqiao 'ren-shaped' railway—a symbol of China's self-reliant innovation—into a people-centric AI city structure: one spine (the 9-km Jing-Zhang Heritage Park), three stations (Zhongzhiyuan / AI Origin Community / Dazhongsi), the ren-shaped twin wings (Zhongguancun technology-services wing × Xiaoyue River scenario wing) and four milestones (1905/1949/2019/2026)."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "youth-friendly-public-space"]
iteration: "v1.0"
---

# Centennial Jing-Zhang REN BELT: A People-Centric AI Innovation Belt

## Design Basis and Source List

This formal proposal takes as its primary basis the Qualification Prequalification Announcement of the Centennial Jing-Zhang AI Innovation Belt Urban Design International Call by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources [source:OFFICIAL-ANNOUNCEMENT]; the machine-readable basis comes from the provisional boundary, key areas, enums, metrics and source inventory maintained under `brief/site-package/` [source:SITE-PACKAGE]; the agent task basis comes from the open call taskbook addressed to global AI agents [source:AGENT-TASKBOOK]. Source usability is distinguished by `data/source_registry.json` into formal-ready, background-only and provisional-only [source:SOURCE-REGISTRY]. `data/processed/agent_fact_pack.md` is a reading-navigation layer, not a new authority [source:PROCESSED-FACT-PACK]. The overall design boundary and the three key areas derive from the repository provisional rough polygons [source:BOUNDARY-SOURCE][source:KEY-AREA-SOURCE]; their derivation, precision limits and replacement rules are documented in `provisional_boundaries_basis.md`.

The proposal supplements verified public facts: the Jing-Zhang Railway Heritage Park phase 1 opened in June 2023 (Tsinghua East Rd–Zhichun Rd, ~2.4–2.5 km, 16.8 ha), phase 2 was approved in 2024 and the full line opened in August 2026 as a 9-km green corridor from Beijing North Station to the Fifth Ring Road, serving about 70 communities and roughly 450,000 residents [source:PUBLIC-JINGZHANG-PARK-2026]; Haidian in 2025 had a resident population of 3.111 million, an area of 430 km², GDP of 1369.14 billion CNY, 37 universities, 92 national key laboratories, 96 national research institutes, 692 academicians (36.23% of the national total) and a talent pool of 2.0058 million [source:PUBLIC-HAIDIAN-PROFILE-2025]; Haidian hosts 1,300+ AI enterprises, 74 registered foundation models and an AI core industry exceeding 350 billion CNY [source:PUBLIC-HAIDIAN-AI-2026]; the Jing-Zhang high-speed railway opened on 30 December 2019 and the old line section from Xueyuan South Rd to the Fifth Ring was placed underground, releasing ground space for the heritage park [source:PUBLIC-JINGZHANG-HISTORY-2026]; Beijing's AI origin-stronghold implementation plan (Jingzhengfa [2023] No. 14) supports a City Brain 2.0 and an AI public computing center in Haidian [source:PUBLIC-BEIJING-AI-POLICY]; Metro Line 13 runs parallel along the old Jing-Zhang corridor and the Changping Line south extension phase 1 (Qinghe–West Tucheng, February 2023) serves the Xueyuan Road innovation belt [source:PUBLIC-RAIL-LINES-2026].

The proposal responds to [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] for the three scope levels, design tasks and deliverable depth; to [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] for the three positioning statements, five functions, three areas and two wings and tasks agent.1–agent.6; to [standard:MOHURD-URBAN-DESIGN-MEASURES] for public space, building character and urban identity; to [standard:MOHURD-CONTROL-DETAILED-PLANNING] for distinguishing known controls, design suggestions and pending confirmation; to [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] for consistent land-use terminology; and to [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] as a registered pending architectural-depth item. Depth is checked by [depth:existing_conditions_diagnosis].

Boundary status: no official precise polygon is publicly available, so the proposal keeps the repository provisional boundary and the three rough key-area rectangles, all labelled `provisional_constraint` with `official_boundary=false`. They are for generation, display and self-check only, not for official redline, approval or precise-area use. The organizer data gap does not block content scoring; once official geometry is supplied the whole package must be recalculated [data:geometry/site_boundary.geojson#SITE-001][data:geometry/key_areas.geojson#PROV-KEY-001][metric:site_area_sqm][metric:key_area_count].

![Evidence-chain and package relationship](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal is organized by the announcement's three levels: the coordinated research area (about 43.6 km², bounded north by the Fifth Ring, east by the Jing-Zang Expressway, south by Xizhimen Outer Street and west by Wanquanhe Rd) covers the AI industry ecosystem, three-areas-two-wings synergy, future city form and international branding; the overall design area (about 11.4 km², the 1–2 km ring around the Jing-Zhang Heritage Park) covers the urban-renewal framework, land-use structure, transport and municipal support and urban character at regulatory-plan-level urban design depth; and the key detailed-design area (about 368.4 ha: Zhongzhiyuan AI Self-Reliant Innovation Acceleration Area ~192.1 ha, Beijing AI Origin Community ~104.3 ha and Dazhongsi AI Industry Cluster ~72.0 ha) covers detailed design of the three key areas at integrated-implementation-plan depth [source:OFFICIAL-ANNOUNCEMENT][source:PROCESSED-FACT-PACK].

The three levels transmit decisions downward: coordinated research answers "where the industry chain and city form should go", the overall design answers "how renewal projects and spatial structure land", and the key areas answer "how specific parcels and public space are refined" [depth:three_level_scope_framework]. The three levels map to the mandatory tasks of announcement sections 1.3, 1.4 and 1.5 and agent.1–agent.6 in `compliance_matrix.json` [depth:overall_spatial_structure]. The core spatial structure is "**one spine, three stations, ren-shaped twin wings, four milestones**":

- **One spine**: the 9-km Jing-Zhang Heritage Park corridor as the historical, ecological and slow-mobility backbone [data:geometry/green_space.geojson#GREEN-001];
- **Three stations**: Zhongzhiyuan (north, self-reliant full-stack station), Beijing AI Origin Community (middle, the ren-intersection origin station) and Dazhongsi (south, native-intelligence station), corresponding to the three key areas [data:geometry/key_areas.geojson#PROV-KEY-001][data:geometry/key_areas.geojson#PROV-KEY-002][data:geometry/key_areas.geojson#PROV-KEY-003];
- **Ren-shaped twin wings**: the two strokes of the Chinese character "人" (person) inspired by the Qinglongqiao ren-shaped railway—the left stroke is the Xiaoyue River scenario-empowerment wing (AI+ life, scenarios, public experience) and the right stroke is the Zhongguancun technology-services wing (capital, IP, global factor allocation), intersecting at the Beijing AI Origin Community to symbolize the meeting of people and ideas [depth:overall_spatial_structure];
- **Four milestones**: along the spine, 1905/1909 (construction and opening of the railway), 1949 (the Central Committee's "journey to take the exam" arrived via Tsinghuayuan station), 2019 (Jing-Zhang smart high-speed railway opening and old-line undergrounding) and 2026 (the Centennial Jing-Zhang AI Innovation Belt), turning a century of history into a walkable timeline [source:PUBLIC-JINGZHANG-HISTORY-2026].

The three levels are not disjoint drawing sets: coordinated-research judgments land on overall-design layers, and key areas are reviewable through the key_areas layer and the detailed-design chapter. Any area, ratio, scale or project count that cannot be recomputed from structured data is not written as a formal conclusion.

![Three-level scope and spatial framework](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

The coordinated research area follows the double mainline of "a world-class AI innovation ecosystem + a new city form fit for AI new-quality productive forces" [source:OFFICIAL-ANNOUNCEMENT][source:AGENT-TASKBOOK].

**Industry judgment.** Haidian has built the "1+X+1" modern industrial system with AI as the first "1"; by end-2025 the district had 265 listed companies, 49 unicorns, close to 10,000 national high-tech enterprises and 599.05 high-value invention patents per 10,000 people (37.4× the national average) [source:PUBLIC-HAIDIAN-PROFILE-2025]. At the AI level, Haidian hosts 1,300+ AI enterprises, 74 registered foundation models and an AI core industry exceeding 350 billion CNY, about 30% of the national total [source:PUBLIC-HAIDIAN-AI-2026]. This proposal suggests organizing the coordinated research area around the innovation chain "university source—open-source collaboration—enterprise conversion—scenario validation—international communication", linking the Beiwei Community (an OPC one-person-company AI entrepreneurship community), Future Science City, Huairou Science City, the Economic-Technological Development Area and Beijing–Tianjin–Hebei innovation resources [source:PUBLIC-HAIDIAN-AI-2026].

**Mechanism transfer from global cases.** Six global AI innovation-ecosystem cases are reviewed as mechanism references only (all based on public reporting or institutional facts, not commitments): Palo Alto's "park-city-integrated" venture-capital streets, Canada's Vector Institute university–industry joint-lab model, Korea's Pangyo Techno Valley rail-station-driven vertical innovation belt, Singapore's one-north "30-minute innovation circle with digital twin", Munich's digital-factory plus public-school cooperation, and Shenzhen Bay's hardware-street open-source ecosystem. Four transferable mechanisms are drawn: rail-hub-driven innovation agglomeration (Line 13, Changping Line south extension), campus-park-district integration (37 universities adjacent), public space hosting open-source collaboration and launch events (the heritage park), and scenario opening with test validation (Haidian's "super AI testing ground") [source:PUBLIC-JINGZHANG-PARK-2026][source:PUBLIC-BEIJING-AI-POLICY].

**Naming and brand.** The overall concept is "**Centennial Jing-Zhang REN BELT**": REN puns on both the Chinese word for person (人) and "rail", meaning "a people-centric century-old rail belt". The logo direction uses the ren-shaped track—two rails forming the character "人" meeting at an origin node with a luminous center—honoring the Qinglongqiao ren-shaped railway while expressing "meeting of people brings innovation". The naming system is "one belt, three stations, twin wings, four milestones", with sub-name "Jing-Zhang Origin Belt / People-Centric AI Belt". [depth:overall_spatial_structure][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

![Key-areas index and design tasks](assets/figures/key-areas.png)

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The overall design area requires regulatory-plan-level urban design depth, using urban renewal to deeply integrate industry and space [source:OFFICIAL-ANNOUNCEMENT]. The proposal proposes a "**one spine, three east-west stitches, four renewal clusters**" overall structure:

- **One spine**: the 9-km heritage-park green corridor stitching both sides of the railway and connecting north–south, the vertical stroke of the REN belt [data:geometry/green_space.geojson#GREEN-001][metric:green_ratio];
- **Three east-west stitches**: cross-corridor connections (slow mobility plus roads) at the Zhongzhiyuan, AI Origin and Dazhongsi latitudinal interfaces, echoing the opening of the Line 13 under-viaduct space and road-level improvements after the rail went underground [data:geometry/roads.geojson#ROAD-002][data:geometry/roads.geojson#ROAD-003][data:geometry/roads.geojson#ROAD-004][source:PUBLIC-JINGZHANG-PARK-2026];
- **Four renewal clusters**: the northern Jing-Zhang section (Qinghe gateway near the Fifth Ring), the AI Origin surroundings (near-campus conversion), the Dazhongsi industry cluster, and the Xizhimen–Xueyuan comprehensive district, expressed through `land_use.geojson` [data:geometry/land_use.geojson#LU-001] and phased through `phasing.geojson` [data:geometry/phasing.geojson#PHASE-001].

Land use follows [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] with unified codes: research (0802, AI R&D and conversion), park green (1401, heritage park and blue-green open space), commercial services (05, native-intelligence consumption and business), education (0804, education and talent services) and residential (0701, community living and life services) [data:geometry/land_use.geojson#LU-001][metric:land_use_research_ratio][metric:land_use_green_ratio]. Under this conceptual partition the overall design area is about 22% research/innovation, 20% green open space and 26% residential/community, all conceptual suggestions pending official regulatory conditions [depth:land_use_layout][metric:land_use_residential_ratio].

The renewal framework follows the four-category coordination of Beijing's Urban Renewal Regulation (residential, industrial, facility, public space), with a clear retain/renovate/rebuild/new-build grading and no fabricated demolition conclusions [depth:retain_renovate_demolish]. Floor area ratio, building height, density, setbacks and facility standards are listed as "pending official regulatory conditions" because official controls are not public, never substituting agent-inferred values for approved indicators [standard:MOHURD-CONTROL-DETAILED-PLANNING][depth:development_intensity_controls][depth:height_massing_character].

## Detailed Design of Key Areas

The three key areas are developed with the seven-element structure "positioning—spatial structure—building renewal—transport and slow mobility—public space—AI scenarios—implementation risk", each referencing its `key_areas.geojson` feature [data:geometry/key_areas.geojson#PROV-KEY-001][data:geometry/key_areas.geojson#PROV-KEY-002][data:geometry/key_areas.geojson#PROV-KEY-003][depth:three_key_area_detailed_design].

**1) Zhongzhiyuan AI Self-Reliant Innovation Acceleration Area (~192.1 ha, north, self-reliant full-stack station).** Positioning: a garden-type, smart, future-facing AI full-stack innovation street. Spatial moves: strengthen the Qinghe interface and riverside green wedge; arrange an innovation plaza around "national platform, standards, safety governance and industrial display" [data:geometry/public_space.geojson#PUBLIC-002]; optimize external transport with the Fifth Ring integration [data:geometry/roads.geojson#ROAD-002]; and use green space to host open testing, low-carbon computing and safety-governance display [depth:traffic_rail_slow_parking]. AI scenarios: self-reliant model test yard, standards-governance workshop, low-carbon computing experience, Qinghe culture gallery.

**2) Beijing AI Origin Community (~104.3 ha, middle, ren-intersection origin station).** Positioning: a near-campus AI innovation street attractive to talent with strong result-conversion ability. Spatial moves: make the ren-shaped plaza the spiritual origin [data:geometry/public_space.geojson#PUBLIC-003], stitch campus-park-street slow mobility, integrate around the Qinghua East Rd West and Wudaokou rail stations [data:geometry/roads.geojson#ROAD-003]; add launch-and-display, open-source collaboration, talent living services and residential support under a low-disturbance, organic-renewal model [depth:retain_renovate_demolish]. AI scenarios: open-source launch hall, campus-enterprise conversion lounge, AI education experience, and the "road to take the exam" cultural node at Tsinghuayuan station [source:PUBLIC-JINGZHANG-HISTORY-2026].

**3) Dazhongsi AI Industry Cluster (~72.0 ha, south, native-intelligence station).** Positioning: a city-type, internationally influential native-intelligence and intelligent-economy street. Spatial moves: integrate around Dazhongsi station with four-quadrant pedestrian connectivity [data:geometry/public_space.geojson#PUBLIC-004][data:geometry/roads.geojson#ROAD-004], improve the public environment around key enterprises and promote composite use of planned green land [depth:blue_green_public_space]; draw on the Dazhongsi Ancient Bell Museum and Juesheng Temple heritage for a "bell awakening intelligence" cultural landmark narrative [source:PUBLIC-JINGZHANG-HISTORY-2026]. AI scenarios: agent and intelligent-terminal display, content consumption, data-element circulation and an international roadshow lounge.

All three key-area polygons are provisional; the conclusions above are directional design for professional teams to deepen, not precise boundaries or approval basis [depth:risk_missing_data].

![Transport, slow mobility and blue-green composite system](assets/figures/mobility-bluegreen.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

The proposal builds spatial-need personas for four groups—AI talent, enterprises, residents and public governance—forming at least five persona types:

| Persona | Typical needs | Spatial response | Review boundary |
| --- | --- | --- | --- |
| Open-source developer | Release, collaboration, testing, community reputation | Origin open-source launch hall, public code wall, night collaboration space | No personal behavior tracking; aggregate statistics only |
| Startup / OPC team | Low-cost office, compute access, product test bed | Zhongzhiyuan shared test yard, Beiwei linkage, edge-compute service point | Compute and data services require separate authorization |
| Anchor enterprise & international visitor | Display, business, international reception, recruiting | Dazhongsi international roadshow lounge, station access, public space around key firms | Corporate marks and cases require clearance |
| Local residents (incl. elders & children) | Commuting, leisure, community services, low-disturbance renewal | Heritage park slow loop, embedded community services, elder/child-friendly facilities | No commercial profiling of residents |
| University staff & researchers | Conversion, cross-campus collaboration, daily walking | Campus-park slow stitching, conversion station, AI education experience | Campus data and research output require authorization |

**AI scenario cards (12+).** 01 Open-source launch hall (Origin Community); 02 Safety-governance sandbox (Zhongzhiyuan); 03 Edge-compute station (overall-area nodes); 04 AI slow-mobility navigation (heritage park); 05 Dazhongsi international roadshow lounge; 06 Qinghe low-carbon innovation corridor (Zhongzhiyuan riverside); 07 Near-campus conversion street (Origin Community); 08 Data-element lounge (Dazhongsi); 09 AI life-service sample street (community-commercial interface); 10 Global AI event week route (public-space system); 11 "Journey to take the exam" cultural digital guide (Tsinghuayuan station–heritage park); 12 ren-shaped plaza intelligent public art (Origin Community). All cards enter `compliance_matrix.json` and the indicator system [metric:ai_scenario_node_count].

**Industrial test-validation scenarios (3+, all human-reviewable, rollback-capable and appealable).** T1 autonomous delivery and robot last-mile logistics testing (limited Dazhongsi–Origin segment); T2 city-governance agent sandbox (Zhongzhiyuan, testing traffic/service/operations agents in controlled public space); T3 multimodal environmental sensing and Qinghe water-quality demonstration (Qinghe–Xiaoyue River blue-green corridor). All are stated as "conceptual suggestion / reference scheme / material for professional teams to deepen", never as approved operations, and follow data minimization, open sources, explainability and human review [source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. AI scenario nodes enter structured layers or the compliance matrix for reviewability.

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land use follows [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] as a complete, closed, seamless partition; `geometry/land_use.geojson` covers the submitted boundary with no gaps or overlaps [data:geometry/land_use.geojson#LU-001][metric:land_use_coverage_area_sqm]. The schematic building footprint in the overall design area is about 722,600 m² [metric:building_footprint_area_sqm], distributed across industrial, commercial, education and residential clusters; `geometry/buildings.geojson` expresses the retain/renovate/rebuild/new-build grading [data:geometry/buildings.geojson#BLDG-001][depth:retain_renovate_demolish].

The retain/renovate/demolish classification follows "protect culture first, add functions second, talk intensity last": the railway heritage, Tsinghuayuan station, Dazhongsi (Juesheng Temple) and other heritage resources and cultural-protection requirements take priority for retention; current low-efficiency industrial space and aging facilities mainly follow low-disturbance organic renewal; parcel-level demolition conclusions await official existing-building, ownership and regulatory conditions for professional teams to deepen, and this proposal gives no parcel-level judgment [depth:retain_renovate_demolish][depth:risk_missing_data].

Building scale and intensity indicators use a "known/pending" double track: area metrics (land area, green area, public-space area, building footprint, road length) are recomputed from this proposal's geometry; intensity metrics (floor area ratio, building height, density, setback) are listed as unknown because official controls are absent, with reasons in metrics.json [metric:floor_area_ratio][metric:building_height_m][standard:MOHURD-CONTROL-DETAILED-PLANNING][depth:development_intensity_controls][depth:height_massing_character].

## Transport, Rail, Municipal Infrastructure, and Public Services

The transport strategy centers on rail-station integration and slow-mobility priority [depth:traffic_rail_slow_parking]. The proposal uses established facts: Metro Line 13 runs parallel along the old Jing-Zhang corridor and its under-viaduct space is part of the park [source:PUBLIC-JINGZHANG-PARK-2026]; the Changping Line south extension phase 1 (Qinghe–West Tucheng, February 2023) set up Xuezhixi, Liudaokou, Xueyuanqiao and West Tucheng stations directly serving the Xueyuan Road innovation belt [source:PUBLIC-RAIL-LINES-2026]. The proposal suggests organizing "rail + slow mobility + innovation service" composite nodes around the Line 13 stations (Dazhongsi, Zhichun Rd, Wudaokou) and Changping south-extension stations, improving existing slow-mobility gaps at Wudaokou and Qinghua East Rd West [data:geometry/roads.geojson#ROAD-001][depth:traffic_rail_slow_parking][metric:road_greenway_length_km].

Municipal and public services cover AI industry-service facilities, innovation-platform services, talent life services, new infrastructure, distributed energy, edge computing and integration with traditional utilities [depth:municipal_new_infrastructure]. Municipal projects such as "City Brain 2.0" and "AI public computing center" are treated as policy directions for new infrastructure allocation, not commitments [source:PUBLIC-BEIJING-AI-POLICY][data:geometry/constraints.geojson#CONSTRAINTS-RAIL][data:geometry/constraints.geojson#CONSTRAINTS-ROAD]. Missing road redlines, pipelines, fire and municipal conditions are recorded as pending items in assumptions and the risk chapter [depth:municipal_new_infrastructure].

## Blue-Green Network, Public Space, and Urban Character

The blue-green network uses the 9-km heritage-park spine as the backbone, coordinating the Qinghe (10.36 km of riverside improvement in Haidian), the Xiaoyue River scenario wing, the Wanquanhe and the northern moat to form a "one vertical, one horizontal" blue-green network [source:PUBLIC-JINGZHANG-PARK-2026][source:PUBLIC-HAIDIAN-PROFILE-2025]. Recomputed from this proposal's geometry, park green and open space in the overall design area is about 2,735,300 m² with a green ratio of about 24% [metric:green_ratio][metric:green_space_area_sqm][data:geometry/green_space.geojson#GREEN-001], public space is about 1,189,500 m² with a ratio of about 10.4% [metric:public_space_ratio][metric:public_space_area_sqm][data:geometry/public_space.geojson#PUBLIC-001], and the slow-mobility main corridor is about 13.6 km [metric:road_greenway_length_km].

The urban character blends Jing-Zhang railway history, Zhongguancun innovation culture and new AI culture under the keynote "**century of steel bones, new intelligent texture**": rail, sleepers, switches and platforms as landscape motifs, retaining old tracks and heritage station buildings [source:PUBLIC-JINGZHANG-HISTORY-2026], and implanting ren-shaped track paving and a luminous-origin public artwork at the Origin Community [data:geometry/public_space.geojson#PUBLIC-003]. The signage system separates the "belt-level logo system" from the "Jing-Zhang cultural identity system" to avoid confusion [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. Character control distinguishes official controls, design suggestions and pending items, without pseudo-precise control lines [depth:blue_green_public_space][standard:MOHURD-URBAN-DESIGN-MEASURES].

## Renewal Projects, Implementation Policy, and Phasing

The renewal project list (12 items) covers public space, industrial renewal, transport and slow mobility, new infrastructure and cultural operations, each with location, type, key dependencies and evidence references [depth:renewal_project_list][metric:renewal_project_count][data:geometry/phasing.geojson#PHASE-001]:

| No. | Project | Type | Key dependencies | Evidence |
| --- | --- | --- | --- | --- |
| JZ-01 | Heritage park slow-mobility gap stitching | Public space/transport | Road redline, under-viaduct space, traffic review | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Qinghe green wedge & low-carbon corridor | Blue-green/industry display | River blue line, ecology and flood conditions | [data:geometry/green_space.geojson#GREEN-002] |
| JZ-03 | Zhongzhiyuan national-platform display plaza | Industry display/public space | Platform positioning, display content clearance | [data:geometry/public_space.geojson#PUBLIC-002] |
| JZ-04 | Origin near-campus conversion street | Renewal/industry service | Campus boundary, ownership, ground-floor uses | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-05 | Ren-shaped plaza & origin public art | Public space/culture | Public-space permit, art copyright clearance | [data:geometry/public_space.geojson#PUBLIC-003] |
| JZ-06 | Tsinghuayuan station cultural digital guide | Culture/operations | Heritage requirements, red-resource exhibition | [source:PUBLIC-JINGZHANG-HISTORY-2026] |
| JZ-07 | Dazhongsi four-quadrant walking connectivity | Rail integration/slow mobility | Rail station, intersections, municipal pipelines | [data:geometry/public_space.geojson#PUBLIC-004] |
| JZ-08 | Native-intelligence consumption street renewal | Industry/commerce | Ownership, retail formats, environment | [data:geometry/land_use.geojson#LU-003] |
| JZ-09 | AI public service & edge-compute nodes | New infrastructure/public service | Energy, compute, safety, operator | [data:geometry/constraints.geojson#CONSTRAINTS-RAIL] |
| JZ-10 | Xueyuan Road green interface upgrade | Character/slow mobility | Road redline, interface treatment | [data:geometry/green_space.geojson#GREEN-005] |
| JZ-11 | Global AI event week public route | Operations/brand | Public-space permit, event safety, copyright | [data:geometry/phasing.geojson#PHASE-002] |
| JZ-12 | Whole-domain scenario governance sandbox | Governance/scenario | Policy authorization, data security, human review | [source:PUBLIC-BEIJING-AI-POLICY] |

Implementation policy suggests aligning renewal projects with the urban-renewal special plan and block regulatory plans, building a "public space—industrial space—cultural operations" coordinated implementation mechanism, and phasing into near (2026–2030), mid (2030–2035) and far (2035–2040) terms [depth:phasing_implementation][data:geometry/phasing.geojson#PHASE-002][data:geometry/phasing.geojson#PHASE-003]. The near term starts with light facilities, operations and service platforms (the three key-area cores and the park through-line), the mid term advances east-west stitching and cluster renewal, and the far term achieves north-south extension and whole-domain intelligent governance. Annual events, developer-community operations, scenario open days, public experience routes and international communication are all conceptual suggestions, not confirmed government arrangements [depth:phasing_implementation].

## Metrics, Area Recalculation, and Compliance Matrix

The indicator system has three classes, all in `metrics.json`: first, spatial metrics recomputable from submitted geometry—site area ~11,412,800 m² [metric:site_area_sqm][data:geometry/site_boundary.geojson#SITE-001], green-space area and ratio [metric:green_space_area_sqm][metric:green_ratio], public-space area and ratio [metric:public_space_area_sqm][metric:public_space_ratio], building footprint [metric:building_footprint_area_sqm], slow-mobility corridor length [metric:road_greenway_length_km], key-area count and areas [metric:key_area_count][metric:key_area_zhongzhiyuan_area_sqm][metric:key_area_origin_area_sqm][metric:key_area_dazhongsi_area_sqm], land-use coverage [metric:land_use_coverage_area_sqm] and land-use ratios [metric:land_use_research_ratio][metric:land_use_green_ratio][metric:land_use_residential_ratio]; second, control indicators requiring official regulatory plans or annexes—floor area ratio [metric:floor_area_ratio] and building height [metric:building_height_m]—listed as unknown with reasons; third, performance indicators needing operations and industry data calibration—AI innovation index, talent density, industry-service satisfaction, event participation—as deepening directions in the text [depth:metrics_recalculation].

Recalculation basis: all areas are recomputed from GeoJSON under EPSG:4548 via shapely, and `scripts/spatial_review.py` checks site area, green ratio and public-space ratio against geometry [depth:metrics_recalculation]. The compliance matrix covers 16 mandatory tasks of announcement sections 1.3, 1.4 and 1.5 and the six agent tasks agent.1–agent.6, each mapping to report sections, layers, metrics, drawings, HTML pages, sources, assumptions and self-checks [standard:PROJECT-OFFICIAL-ANNOUNCEMENT][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. `standard_matrix.json` covers six professional standards, and `design_depth_matrix.json` covers fifteen mandatory depth items, all complete [depth:risk_missing_data].

![Core metrics recalculation and evidence chain](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

Data compliance: the proposal uses only public or cleared materials and does not involve internal drawings, non-public spatial data, personal privacy or unapproved regulatory indicators [source:SITE-PACKAGE][source:SOURCE-REGISTRY]. The boundary and key areas are provisional, with precision limits disclosed in the text, HTML, sources, assumptions and self-check [source:BOUNDARY-SOURCE][source:KEY-AREA-SOURCE][depth:risk_missing_data]. All spatial suggestions are "conceptual suggestion / reference scheme / material for professional teams to deepen", not government conclusions, and no implementation is promised [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

Copyright: the original graphics, logo direction and text in this proposal are generated by an AI agent and licensed; historical facts are cited with sources [source:PUBLIC-JINGZHANG-HISTORY-2026][source:PUBLIC-JINGZHANG-PARK-2026]; no portrait, trademark, paper image or copyrighted material is used without authorization, and no official document is impersonated. Copyright and attribution details are in `report/copyright_statement.md`.

Pending materials: official precise boundary, official key-area polygons, block regulatory conditions (FAR, height, density, setback), existing buildings and ownership, road redlines, municipal pipelines, heritage control lines, and investment and implementation actors. These gaps are recorded in `assumptions.json` and `missing_data_checklist.csv` [depth:risk_missing_data][standard:MOHURD-CONTROL-DETAILED-PLANNING].

## References

This proposal references the public and cleared materials below; the machine-readable evidence chain is at [source:SITE-PACKAGE], [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SOURCE-REGISTRY], [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [depth:three_level_scope_framework] and [data:geometry/site_boundary.geojson#SITE-001]:

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/agent_taskbook.json
- brief/site-package/sources.json
- brief/site-package/geometry/provisional_boundaries.geojson
- brief/site-package/geometry/provisional_boundaries_basis.md
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- brief/site-package/standards/standards.json
- brief/site-package/standards/references/
- data/source_registry.json
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- data/processed/agent_task_requirements.csv
- data/processed/source_use_matrix.csv
- data/processed/missing_data_checklist.csv
- Beijing Municipal Government, "Haidian Overview" (2025 data, updated April 2026)
- Beijing Municipal Commission of Planning and Natural Resources, Jing-Zhang Heritage Park planning interpretation (December 2021)
- People's Daily / Beijing Daily coverage of the heritage park phase 1 opening and phase 2 completion (2023–2026)
- Beijing Municipality Implementation Plan for Building a Globally Influential AI Innovation Source (2023–2025), Jingzhengfa [2023] No. 14
- Beijing Municipal Science & Technology Commission / Zhongguancun Administrative Committee, "three areas and two wings" layout report (3 April 2026)
