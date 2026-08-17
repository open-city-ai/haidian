---
title: "Jing-Zhang Intellima Belt: A Dual-Axis Rail-to-Optics Urban Design for the Centennial AI Innovation Belt"
author_github: "Wang-Lvjing"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "The proposal advances a 'Rail to Optics' dual-axis concept: the Jing-Zhang railway heritage corridor serves as the historic 'rail' axis and the AI innovation belt as the contemporary 'optical-fiber' axis, fused along one north-south 'Intellima Green Spine'. The spine links the Zhongzhiyuan AI Acceleration Area, the Beijing AI Origin Community, and the Dazhongsi AI Industry Cluster, flanked by the Zhongguancun Technology-Service and the Xiaoyuehe Scenario-Empowerment wings, shaping a world-class AI innovation ecosystem within a centennial cultural narrative."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "ai-traffic-walkability"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "enterprise-service-copilot"]
iteration: "v0.2"
---

# Jing-Zhang Intellima Belt: A Dual-Axis Rail-to-Optics Urban Design for the Centennial AI Innovation Belt

## 1 Design Basis and Source List

This proposal is primarily grounded in the *Prequalification Announcement for the International Urban Design Open Call of the Centennial Jing-Zhang AI Innovation Belt* issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources [source:OFFICIAL-ANNOUNCEMENT]. It uses the machine-readable basis in `brief/site-package/` — the design brief, allowed design space, source list, enums, planning-limit ranges, professional-standard snapshots, and provisional boundary geometry [source:SITE-PACKAGE]. The Agent-facing open-call taskbook [source:AGENT-TASKBOOK] adds three positionings, five functions, the three-areas/two-wings framework, six agent tasks, co-creation principles, and a unified boundary clause. All spatial suggestions are framed as conceptual proposals, reference schemes, or material for professional teams to deepen; they do not replace statutory planning or constitute an approved government conclusion.

Source-use boundaries follow the public source registry [source:SOURCE-REGISTRY]: the announcement, taskbook, and professional standards serve as formal task basis; the provisional boundaries [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] are used only for generation, self-check, visualization, and design discussion. `data/processed/agent_fact_pack.md` is a reading navigation layer, not a new authority source [source:PROCESSED-FACT-PACK].

![Site overview and evidence-chain diagram](assets/figures/site-overview.png)

The proposal currently uses the repository's **provisional constraint** boundary. No official precise polygon has been published publicly; the announcement's textual extents and approximate areas were used for calibration, but rectangular edges do not represent road redlines, parcel boundaries, or ownership boundaries [data:geometry/site_boundary.geojson#SITE-001] [standard:MOHURD-CONTROL-DETAILED-PLANNING]. Once official or cleared CAD/GIS/PDF boundaries are published, the site boundary, key areas, land use, roads, green space, public space, buildings, phasing, and all area-based metrics must be recalculated; this recalculation trigger is registered in `assumptions.json`.

## 2 Three-Level Scope Framework

The work is organized by the three scopes defined in the announcement, following the progression "research defines the ecosystem → overall design defines space → key areas define depth" [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]:

- **Coordinated research area (≈43.6 km²)**: north to the Fifth Ring Road, east to the Jingzang Expressway, south to Xizhimen Outer Street, west to Wanquanhe Road. It examines the AI industry ecosystem, three-areas/two-wings synergy, future urban form, and global communication narrative — answering how Haidian can become a world-class AI innovation hub and pilgrimage site.
- **Overall design area (≈11.4 km²)**: a corridor of 1–2 km around the Jing-Zhang Heritage Park, organizing the overall urban-renewal framework, industrial space layout, transport/municipal support, and urban character [metric:site_area_sqm].
- **Key detailed-design area (≈368.4 ha)**: from north to south, the Zhongzhiyuan AI Acceleration Area, the Beijing AI Origin Community, and the Dazhongsi AI Industry Cluster, designed at regulatory-implementation plan depth [metric:key_area_count] [data:geometry/key_areas.geojson#PROV-KEY-001].

![Three-level scope and spatial framework](assets/figures/land-use-structure.png)

All three scopes are supported by the same geometric evidence: the site boundary defines the design extent [data:geometry/site_boundary.geojson#SITE-001]; the land-use partition covers the full boundary without gaps or overlaps [data:geometry/land_use.geojson#LU-EW]; and the three key areas are expressed as a dedicated layer [data:geometry/key_areas.geojson#PROV-KEY-002]. Any area, ratio, scale, or project count that cannot be recomputed from structured data is not stated as a formal conclusion [depth:three_level_scope_framework].

## 3 Coordinated Research Area: Industry and Future City

### 3.1 Overall Concept: JingZhang Intellima (Rail → Optics)

The overall concept is **"JingZhang Intellima"**, with the English primary name **JingZhang Intellima Belt** and the subtitle **From Rail to Light**. The core metaphor converts the century-old "rail" spine of the Jing-Zhang Railway into an "optical-fiber" spine carrying AI innovation: the rail once carried steam and passengers; the optical fiber carries data, models, and ideas. Both are fused on the same corridor so that heritage lineage and contemporary technology share a dual axis [source:AGENT-TASKBOOK].

The three positionings unify into one "Intellima narrative": the **Centennial Jing-Zhang Culture Belt** is the spirit of the vein, the **AI-Fused Innovation Belt** is its trunk, and the **Urban AI Lifestyle Experience Belt** is its flow — what people perceive and live [source:OFFICIAL-ANNOUNCEMENT]. The five functions form a loop: AI full-stack self-reliant innovation system, world-class AI innovation ecosystem, AI+ scenario-empowerment paradigm, intelligent AI vital city, and global voice in AI governance [source:AGENT-TASKBOOK].

### 3.2 Naming System and Logo Direction

The naming system uses the "vein-core-wing-node" hierarchy drawn from one image: one belt (JingZhang Intellima), three cores (Zhongzhiyuan "Source-Core", the AI Origin Community "Origin", Dazhongsi "Bell-Convergence"), two wings (Zhongguancun Technology-Service Wing "Zhongguan", Xiaoyuehe Scenario-Empowerment Wing "Yuehe"), and multiple nodes named with "Station, Hall, Corridor, Gate".

The logo direction combines the **1435 mm railway gauge with an optical-pulse signal**: a gradient light band traveling along the rail ties forms a symbol that reads as both "rail + optical fiber" and a "pulse/vein", with a horizontal stroke hinting at "JZ" and the infinity symbol "∞" [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The identity contrasts tech blue-green with the rust red of Jing-Zhang heritage; open-source Chinese fonts are preferred, and the final identity must be deepened by a professional brand team with font rights cleared.

### 3.3 Five Functions and the Three-Areas/Two-Wings Loop

The three-areas/two-wings synergy loop is: **university origination → open-source collaboration → enterprise translation → public experience → international dissemination**. The Beijing AI Origin Community receives origination innovation from Tsinghua, Beihang, and open-source communities [data:geometry/key_areas.geojson#PROV-KEY-002]; Zhongzhiyuan translates origin results into full-stack self-reliant products, standards, and governance capacity [data:geometry/key_areas.geojson#PROV-KEY-001]; Dazhongsi grounds leading enterprises and agent-native businesses into scenario implementation and consumption experience [data:geometry/key_areas.geojson#PROV-KEY-003]; the western Zhongguancun Technology-Service Wing provides global factor allocation, Zhongguancun IP, and capital empowerment [data:geometry/land_use.geojson#LU-BW]; the eastern Xiaoyuehe Scenario-Empowerment Wing provides AI scenario testing and a vital-city laboratory [data:geometry/land_use.geojson#LU-DE].

### 3.4 Global AI Innovation Ecosystem Case Studies (5–8)

Eight global cases are studied to answer how a world-class AI ecosystem is organized, with transferable mechanisms extracted [source:AGENT-TASKBOOK]:

| # | Case | Core mechanism | Transferable spatial/operational move |
| --- | --- | --- | --- |
| 1 | Silicon Valley / Stanford Research Park | University–park–capital loop | Origin-community campus-to-commercialization street |
| 2 | Boston / Kendall Square | Density effect of life-science + AI clusters | Zhongzhiyuan dense R&D blocks |
| 3 | Seattle / South Lake Union | Anchor-enterprise ecosystem | Dazhongsi leading-enterprise anchor |
| 4 | Singapore / one-north | Transit-oriented, live-work-play mix | Transit-station integrated living rooms |
| 5 | Shenzhen / Nanshan | Hardware + manufacturing synergy | Edge-compute stations and test fields |
| 6 | Helsinki / Marinstadi | Open innovation and public data | Data-element living room, open-source release hall |
| 7 | Berlin / Simmering | Creative-industry blocks in urban renewal | Progressive renewal of underused space |
| 8 | Tel Aviv / Sarona | Global talent and cross-national community | International developer community and talent services |

All transfers are conceptual suggestions and imply no investment or recruitment commitment to any enterprise.

## 4 Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The overall design area is organized at regulatory-plan urban-design depth. The spatial structure is **"one belt linking three cores, two wings stitching, blue-green composite, multi-node scenarios"** [depth:overall_spatial_structure]:

- **One belt**: the north-south JingZhang Intellima Green Spine — both a heritage corridor and an AI innovation corridor [data:geometry/green_space.geojson#GREEN-LU-AS1].
- **Three cores**: Zhongzhiyuan, the Origin Community, and Dazhongsi — full-stack innovation, result translation, and intelligent economy [metric:key_area_count].
- **Two wings**: the Zhongguancun Technology-Service Wing (west) and the Xiaoyuehe Scenario-Empowerment Wing (east), stitched by seven transversal connector roads [data:geometry/roads.geojson#ROAD-005].
- **Blue-green composite**: the green spine as the backbone linking the Qinghe and Xiaoyuehe ecological veins [data:geometry/green_space.geojson#GREEN-LU-ES1].
- **Multi-node scenarios**: a network of AI scenario nodes named by "Station, Hall, Corridor, Gate" [data:geometry/public_space.geojson#PUBLIC-P-2].

The land-use layout follows the national territorial land-use classification and covers the boundary without gaps or overlaps [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]: business/finance and headquarters services ≈305.2 ha (26.7%) [data:geometry/land_use.geojson#LU-EW], talent residential ≈254.3 ha (22.3%) [data:geometry/land_use.geojson#LU-DE], green spine ≈147.3 ha (12.9%) [data:geometry/land_use.geojson#LU-ES1], AI R&D ≈117.6 ha (10.3%) [data:geometry/land_use.geojson#LU-CW], industry services ≈114.3 ha, education/research ≈72.2 ha, commercial consumption ≈70.6 ha, and public plazas ≈59.9 ha [metric:land_use_zone_count].

Development intensity and building height depend on unpublished official regulatory conditions. The proposal sets no FAR or height statutory indicators; they remain `unknown` and are registered as pending data [metric:floor_area_ratio] [depth:development_intensity_controls]. Conceptual massing is used only to communicate spatial relations and does not equal approved control values [depth:height_massing_character].

## 5 Detailed Design of Key Areas

### 5.1 Zhongzhiyuan AI Acceleration Area (≈192.1 ha)

**Positioning**: a garden-style full-stack self-reliant innovation block focused on the AI full-stack system and global voice in AI governance. **Spatial moves**: strengthen the Qinghe interface and build an industry-display interface toward the Fifth Ring Road; lay out dense R&D blocks, a green innovation plaza, and low-carbon compute stations [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/land_use.geojson#LU-AW]. **AI scenarios**: autonomous model testing, standards workshops, safety-governance display, low-carbon compute experience. **Implementation dependencies**: Fifth Ring connection, Qinghe blue-line, and municipal conditions to be confirmed [depth:three_key_area_detailed_design].

### 5.2 Beijing AI Origin Community (≈104.3 ha)

**Positioning**: a campus-adjacent result-translation and talent community anchoring the "AI Origin" concept, receiving origination innovation from Tsinghua and Beihang. **Spatial moves**: organize campus–park–block slow-traffic stitching; lay out the origin-community innovation buildings, an open-source release plaza, and a result-translation street [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/public_space.geojson#PUBLIC-P-3]. **AI scenarios**: open-source community, result release, talent-zone services, campus-adjacent incubation. **Implementation dependencies**: campus boundaries, ownership, and ground-floor programs to be deepened by professional teams.

### 5.3 Dazhongsi AI Industry Cluster (≈72.0 ha)

**Positioning**: an urban intelligent-economy and international-exchange block anchored on leading enterprises, agent-native businesses, and intelligent-terminal new formats. **Spatial moves**: integrate around Dazhongsi Station, organize four-quadrant pedestrian connectivity and an intelligent commercial block [data:geometry/key_areas.geojson#PROV-KEY-003] [data:geometry/land_use.geojson#LU-EE]. **AI scenarios**: agent and intelligent-terminal display, content consumption, a data-element living room, and an international roadshow living room [data:geometry/public_space.geojson#PUBLIC-P-1]. **Implementation dependencies**: transit station, road intersections, and municipal conditions to be confirmed.

![Key areas index and design tasks](assets/figures/key-areas.png)

Programs, building scale, retain/renovate/demolish classification, public-space connectivity, and transport organization of the three key areas are developed at regulatory-implementation depth. Given the lack of existing-building, ownership, and regulatory data, all retain/renovate/demolish conclusions are expressed as methods and a to-be-calibrated list for professional teams [depth:retain_renovate_demolish]; no parcel-level conclusion is fabricated.

## 6 AI Innovation Ecosystem, Personas, and AI+ Scenarios

### 6.1 User Personas (6 types)

| Persona | Typical needs | Spatial response |
| --- | --- | --- |
| Open-source developer | Release, collaborate, test, community reputation | Origin open-source release hall, public code wall, night collaboration space |
| Startup team | Low-cost office, compute access, product test field | Zhongzhiyuan shared test field, edge-compute stations, standards/governance consulting |
| Head-enterprise visitor | Display, business, international reception, hiring | Dazhongsi international roadshow living room, transit-station transfer |
| Local resident | Commute, leisure, community services, low-disturbance renewal | Intellima Green Spine slow ring, embedded community services, graded night activities |
| University faculty/students | Result translation, cross-campus collaboration, daily walking | Campus–park slow stitching, translation stations, AI education experience points |
| International developer | Visa/housing services, cross-national collaboration, belonging | Talent-zone services, international developer community, Global AI Open Week |

Persona data serve only design-needs analysis; no personal behavioral tracking is collected [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### 6.2 AI Scenario Cards (12, incl. 4 industry test/validation scenarios)

| Card | Spatial carrier | Type | Data and privacy boundary | Human review |
| --- | --- | --- | --- | --- |
| SC-01 Open-source release hall | Origin Community | Public experience | Aggregated statistics, no personal tracking | Platform admin |
| SC-02 Safety-governance sandbox | Zhongzhiyuan | **Industry test/validation** | Isolated, desensitized test data | Safety assessor |
| SC-03 Edge-compute station | Overall-area nodes | Public experience | Energy data; personal end devices need consent | Operator |
| SC-04 AI slow-traffic navigation | Intellima Green Spine | Public experience | Read-only public maps, no identity tracking | Manual annotation review |
| SC-05 Dazhongsi international roadshow | Dazhongsi | Public experience | Event imagery needs consent | Media review |
| SC-06 Qinghe low-carbon innovation corridor | Zhongzhiyuan riverfront | Public experience | Aggregated environmental sensing | Environment management |
| SC-07 Campus result-translation street | Origin Community | Public experience | Research data needs consent | Institutional compliance |
| SC-08 Data-element living room | Dazhongsi | **Industry test/validation** | Compliant, authorized, auditable | Data-governance committee |
| SC-09 AI lifestyle sample street | Community junctions | Public experience | Minimal service data | Human service fallback |
| SC-10 Global AI Open Week route | Belt public spaces | Public experience | Registration/on-site data per event authorization | Event operations |
| SC-11 Intellima AI display pod | Intellima Green Spine | **Industry test/validation** | Desensitized demo data | Display review |
| SC-12 Xiaoyuehe intelligent-transport test field | Xiaoyuehe wing | **Industry test/validation** | Desensitized transport data, no individual tracking | Traffic-management review |

Each scenario states its service object, spatial location, data source, privacy boundary, human review, and operating entity [depth:traffic_rail_slow_parking]; scenario nodes enter `compliance_matrix.json` and the AI-scenario section of `visual/index.html`. Immature technologies are not described as ready for full deployment [source:AGENT-TASKBOOK].

## 7 Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The land-use plan follows Section 4 and covers the full submitted boundary; parcels share edge coordinates without gaps or overlaps [data:geometry/land_use.geojson#LU-DW] [depth:land_use_layout]. The building plan distinguishes conceptual new massing from retained existing massing: AI R&D clusters in Zhongzhiyuan and the Origin Community [data:geometry/buildings.geojson#BLDG-ZZY-W-0101], business and intelligent commercial blocks in Dazhongsi [data:geometry/buildings.geojson#BLDG-DZS-E-0101], and retained residential blocks in the eastern existing areas [data:geometry/buildings.geojson#BLDG-RET-E-0101].

Building-footprint area is recomputed directly from submitted geometry [metric:building_footprint_area_sqm]; the conceptual coverage of ≈20% [metric:building_density_ratio] is for design discussion only and is not statutory building intensity. The retain/renovate/demolish strategy is registered as "to be deepened by professional teams" given the lack of existing-building and ownership data; no parcel-level conclusion is given [depth:retain_renovate_demolish].

## 8 Transport, Rail, Municipal Infrastructure, and Public Services

Transport is organized around the **Intellima Green Spine as the north-south slow-traffic backbone + seven transversal connector roads stitching the two wings + transit-station integrated transfer** [depth:traffic_rail_slow_parking]: the greenway carries walking, cycling, and AI scenario display [data:geometry/roads.geojson#ROAD-001]; transversal roads connect the Zhongguancun and Xiaoyuehe wings [data:geometry/roads.geojson#ROAD-005]; and Dazhongsi Station, Wudaokou, and Qinghua East Road West organize integrated station-city public living rooms [data:geometry/public_space.geojson#PUBLIC-P-1] [data:geometry/public_space.geojson#PUBLIC-P-2]. The greenway network totals ≈15.5 km [metric:road_network_length_m].

The municipal and new-infrastructure strategy covers edge compute, distributed energy, and public-service integration; however, pipeline, energy, drainage, flood, and fire engineering conditions are missing and are listed as preconditions for formal deepening [depth:municipal_new_infrastructure]. Road alignments, rail alignments, bridges/tunnels, and municipal pipelines are conceptual suggestions, not engineering plans.

![Mobility and blue-green composite system](assets/figures/mobility-bluegreen.png)

## 9 Blue-Green Network, Public Space, and Urban Character

### 9.1 Blue-Green System

The Jing-Zhang Heritage Park vitality belt is the backbone, forming the north-south Intellima Green Spine (≈147.3 ha of green spine) [data:geometry/green_space.geojson#GREEN-LU-DS1], linking the Qinghe and Xiaoyuehe ecological veins. Four AI public living rooms anchored at Dazhongsi Station, Wudaokou, the Origin Community, and Zhongzhiyuan (≈59.9 ha) [data:geometry/public_space.geojson#PUBLIC-P-4] carry slow traffic, sports, innovation exchange, and technology-testing compound functions [metric:green_ratio] [metric:public_space_ratio].

### 9.2 Urban Character and Cultural Narrative

The urban character fuses Jing-Zhang railway heritage, Zhongguancun innovation culture, and AI new culture [depth:blue_green_public_space]. The **cultural narrative line** is "self-reliance, pioneering, open-source for good": the Jing-Zhang Railway was China's first domestically designed and built trunk line, and its spirit of independent innovation is the origin of the AI era; Zhongguancun continues industry-academia-research integration and pioneering; AI new culture emphasizes open source, collaboration, and human values. The three unfold as a sequence of spatial events along the Intellima Green Spine: **Origin (Zhan Tianyou spirit coordinate) → Heritage (Zhongguancun innovation nodes) → Evolution (AI milestone corridor) → Outlook (Gate of Pilgrimage)** [standard:MOHURD-URBAN-DESIGN-MEASURES].

### 9.3 AI Pilgrimage Landmarks and Honor-Display System (3+)

Three candidate AI pilgrimage landmarks are proposed [source:AGENT-TASKBOOK]:

1. **Jing-Zhang Origin · Zhan Tianyou Spirit Coordinate** (Origin Community): a memorial installation themed on rail spikes and ties, carrying the "origin of independent innovation" narrative.
2. **Gate of Rail-Light · Intellima Portal** (Zhongzhiyuan north entrance): an entrance landmark combining the 1435 mm gauge with optical pulses, establishing belt identity toward the Fifth Ring Road.
3. **Digital Bell-Drum · Dazhongsi Intelligent Landmark**: echoing Dazhongsi's historic bell culture with an interactive digital soundscape and AI content display as a new bell-drum of the intelligent era.

The honor-display system includes a public code wall, contributor wall, AI milestone corridor, and an annual "Intellima Prize", distributed along the green spine and public living rooms, supported by a wayfinding and signage system with accessibility design. All landmarks and brand elements are conceptual directions requiring professional deepening and rights clearing; they do not constitute approved construction [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## 10 Renewal Projects, Implementation Policy, and Phasing

### 10.1 Renewal Project List (conceptual)

| Code | Project | Type | Key dependencies | Phase |
| --- | --- | --- | --- | --- |
| JZ-01 | Dazhongsi station-city public living room | Public space / transit | Transit station, intersections, municipal pipelines | Phase 1 |
| JZ-02 | Origin open-source release plaza | Public space / industry | Campus boundaries, ownership, ground-floor programs | Phase 1 |
| JZ-03 | Zhongzhiyuan Qinghe innovation interface | Blue-green / industry | River blue line, ecology, flood conditions | Phase 1 |
| JZ-04 | Intellima Green Spine gap stitching | Public space / transport | Road redlines, under-bridge space, traffic review | Phase 2 |
| JZ-05 | Xiaoyuehe intelligent-transport test field | New infrastructure / transport | Energy, compute, safety, operator | Phase 2 |
| JZ-06 | Global AI Open Week public route | Operations / brand | Public-space permits, event safety, rights clearing | Phase 2 |

### 10.2 Phasing

Implementation is expressed in two phases [data:geometry/phasing.geojson#PHASE-001]: **Phase 1 (three-core kickoff and station AI living rooms)** covers the southern Dazhongsi and Origin nodes, ≈626.4 ha [metric:phase_1_area_sqm]; **Phase 2 (spine completion and two-wing stitching)** covers Zhongzhiyuan, the northern Intellima Green Spine, and the Xiaoyuehe wing, ≈514.9 ha [data:geometry/phasing.geojson#PHASE-002] [metric:phase_2_area_sqm]. Phasing expresses a conceptual advancement path only and does not constitute an approval sequence.

### 10.3 Global AI Innovation Event System and Long-Term Operations

The Agent taskbook requires an annual event system, brand IP, developer-community operations, scenario-open operations, and international communication/recruitment conversion [source:AGENT-TASKBOOK]. The proposal advances a conceptual operations framework [depth:phasing_implementation]:

- **Annual event system**: Developer Festival (spring), Global AI Open Week (summer), monthly Scenario Open Days, Intellima Roadshow Season (autumn), and the annual Intellima Prize release (winter).
- **Brand IP and communication**: a "Rail → Optics" visual core, event brand identity, international communication narrative, and content matrix.
- **Developer-community operations**: continuous operation of the open-source release hall, updated contributor wall and public code wall, and talent conversion linking talent-zone services.
- **Scenario-open operations**: an "apply–review–test–release" mechanism opens the industry test/validation scenarios [data:geometry/public_space.geojson#PUBLIC-P-2].
- **International communication and recruitment conversion**: the Open Week becomes the experiential entry for global developers visiting Beijing, linking enterprise landing and talent services.

All events, recruitment, funding, and policy arrangements are conceptual suggestions or deepening directions and must not be treated as confirmed government arrangements or implementation commitments [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## 11 Metrics, Area Recalculation, and Compliance Matrix

The indicator system is recomputed directly from submitted geometry and is consistent with `metrics.json` [depth:metrics_recalculation]: overall design area ≈11.41 km² [metric:site_area_sqm], green ratio 12.9% [metric:green_ratio], public-space ratio 5.2% [metric:public_space_ratio], and building footprint ≈228.6 ha [metric:building_footprint_area_sqm]. The three key-area areas and the Intellima Green Spine network length are given by their corresponding metrics [metric:zhongzhiyuan_area_sqm] [metric:road_network_length_m]. Indicators dependent on unpublished official regulatory conditions, such as FAR and height, remain `unknown` with a stated reason [metric:floor_area_ratio].

The compliance matrix covers all tasks in announcement sections 1.3, 1.4, and 1.5 and agent tasks agent.1–agent.6 [depth:metrics_recalculation]. Professional-standard coverage and design-depth coverage are recorded in `standard_matrix.json` and `design_depth_matrix.json`, not duplicated in prose.

![Core metrics recalculation and evidence chain](assets/figures/metrics-evidence.png)

## 12 Risk, Copyright, and Compliance

The proposal carries the following main risks and data gaps [depth:risk_missing_data]:

- **Missing official boundary**: the current geometry is a provisional constraint and cannot serve as an official redline, approval basis, or precise-area basis; full-chain recalculation is required once official polygons are published [data:geometry/constraints.geojson#CONSTRAINTS].
- **Missing regulatory and engineering data**: FAR, height, road redlines, municipal pipelines, ownership, heritage, and fire conditions await official data; related conclusions are downgraded to pending confirmation [standard:MOHURD-CONTROL-DETAILED-PLANNING].
- **Data and copyright boundaries**: all text, geometry, diagrams, HTML, and drawings are generated by the declared AI agent or use cleared public sources; provenance and licenses are recorded in `sources.json` and `report/copyright_statement.md`; no secret maps, non-public tables, or unauthorized materials are used [source:SITE-PACKAGE].
- **Language requirement**: this proposal is a bilingual package; the Chinese counterpart is `proposal.md`; the A3/A0 drawings, HTML, and text-bearing figures provide corresponding language copies.

The proposal claims no official approval, approved regulatory plan, final land ownership, final construction scale, or guaranteed implementation; the AI agent is responsible for facts, sources, copyright, spatial data, metrics, and expression [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

## 13 References

1. *Prequalification Announcement for the International Urban Design Open Call of the Centennial Jing-Zhang AI Innovation Belt*, Haidian Branch of Beijing Municipal Commission of Planning and Natural Resources, 2026-05-09. https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/tzgg/hd/202605/t20260509_4643047.html
2. *Excerpt of the Agent-Facing Open Call Taskbook for the Centennial Jing-Zhang AI Innovation Belt*, user-provided cleared material, 2026-05-18.
3. *"Three Areas, Two Wings" toward a World-Class AI Hub*, Beijing Municipal Science and Technology Commission / Zhongguancun Science Park Administrative Committee, 2026-04-03. https://kw.beijing.gov.cn/xwdt/kcyx/xwdtcyfz/202604/t20260403_4573808.html
4. *Haidian District "1+X+1" Modern Industrial System Layout*, Haidian District People's Government, 2026-03-02.
5. *Measures for the Administration of Urban Design*, Ministry of Housing and Urban-Rural Development, 2017.
6. *Measures for the Compilation and Approval of Regulatory Detailed Plans for Cities and Towns*, Ministry of Housing and Urban-Rural Development.
7. *Guidance for Land Use Classification in Territorial Spatial Survey, Planning, and Use Control*, Ministry of Natural Resources, 2023.
8. Provisional rough boundaries and the three key-area polygons, registered by repository maintainers, 2026-06-05.
9. Machine-readable basis in `brief/site-package/`, `data/source_registry.json`, and `data/processed/agent_fact_pack.md`; complete indexes in `sources.json` and the three matrix files [source:SITE-PACKAGE] [source:OFFICIAL-ANNOUNCEMENT].
