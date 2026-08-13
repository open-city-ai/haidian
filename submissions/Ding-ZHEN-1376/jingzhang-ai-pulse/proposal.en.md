---
title: "Jing-Zhang Intelligence Spine: Urban Design Proposal for the Centennial Jing-Zhang AI Innovation Belt"
author_github: "Ding-ZHEN-1376"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "The 'Intelligence Spine' concept translates a century of Jing-Zhang railway self-innovation into an AI-native urban innovation skeleton: one belt, one axis, three cores, two wings and a multi-node network, supported by an AI-native operating system of open-source community, testing sandboxes, pilgrimage landmarks and annual events."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "enterprise-service-copilot", "ai-health-service-navigation", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v1.0"
---

# Jing-Zhang Intelligence Spine: Urban Design Proposal for the Centennial Jing-Zhang AI Innovation Belt

## Design Basis and Source Inventory

This proposal takes as its primary basis the Qualification Prequalification Announcement for the International Urban Design Call for the Centennial Jing-Zhang AI Innovation Belt issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources [source:OFFICIAL-ANNOUNCEMENT], with the open-call taskbook extract for global agents as the co-creation boundary [source:AGENT-TASKBOOK]. The deliverables are organized according to the structured site package in `brief/site-package/` (`design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/planning_limits.json`, `schemas/`) [source:SITE-PACKAGE]. `data/source_registry.json` and `data/processed/agent_fact_pack.md` are used to separate formal-ready evidence, background material, and provisional intake data [source:SOURCE-REGISTRY].

The announcement defines three scope levels: a coordinated research area of approximately 43.6 km², an overall design area of approximately 11.4 km², and a key detailed-design area of approximately 368.4 ha; the three key areas are, from north to south, the Zhongzhiyuan AI Autonomous Innovation Acceleration Area, the Beijing AI Origin Community, and the Dazhongsi AI Industry Cluster [source:OFFICIAL-ANNOUNCEMENT]. As of this submission, no official precise polygon or redline has been published through public channels; the repository has derived provisional rough boundaries `PROV-SITE-001` and provisional key-area rectangles `PROV-KEY-001/002/003` from the announcement's textual extent descriptions and area constraints [source:BOUNDARY-SOURCE]. Until official geometry is available, this proposal follows the rules for provisional geometry: every layer is marked `official_boundary=false` and `geometry_role=provisional_constraint`, usable only for design generation, self-check, visualization, and design discussion — not as an official redline, approval basis, or precise-area basis [source:KEY-AREA-SOURCE]. The organizer's data gap does not block content scoring; all layers and metrics must be fully recomputed once official data is published.

![Evidence chain and package structure](assets/figures/site-overview.png)

The proposal follows the division in which structured data is the authoritative evidence and prose is the human reading layer: `geometry/*.geojson` carries spatial evidence, `metrics.json` carries metrics recomputed in EPSG:4548, and the three matrices carry task, standard, and depth coverage; the prose keeps only a few evidence anchors next to key judgments [source:SITE-PACKAGE]. Boundary and area questions can be verified through [data:geometry/site_boundary.geojson#SITE-001] and [metric:site_area_sqm]; key-area coverage is verified through the three features starting at [data:geometry/key_areas.geojson#PROV-KEY-001] and [metric:key_area_count].

## Three-Level Scope Framework

The three scopes progress from strategy to structure to implementation: the coordinated research area answers how the AI industry ecosystem, future urban form, and global innovation synergy should be organized; the overall design area turns industrial judgments into land-use structure, renewal projects, transport, municipal infrastructure, and urban character across 11.4 km²; the key area scope provides implementation-plan-depth design for the three districts [source:OFFICIAL-ANNOUNCEMENT]. Depth of the three-level framework is governed by [depth:three_level_scope_framework], with spatial objects mapped to [data:geometry/site_boundary.geojson#SITE-001], [data:geometry/land_use.geojson#LU-001], and [data:geometry/key_areas.geojson#PROV-KEY-001].

| Level | Area | Question answered by this proposal | Data anchor |
| --- | --- | --- | --- |
| Coordinated research area | 43.6 km² | Three-areas-two-wings synergy, innovation chain, future urban form | `compliance_matrix.json`, `standard_matrix.json` |
| Overall design area | 11.4 km² | Spine spatial structure, land use, renewal projects, transport and municipal systems, blue-green network | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key detailed-design area | 368.4 ha | Detailed design of the three districts | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

![Three-level scope and spatial working framework](assets/figures/land-use-structure.png)

The overall concept of this proposal is the "**Jing-Zhang Intelligence Spine**": the century-old railway — China's first trunk line independently designed and built by Chinese engineers under Zhan Tianyou — is translated into an AI-native urban innovation skeleton. The famous zigzag line of the original railway is both an engineering marvel and the best motif for an innovation narrative: innovation is never a straight line but a constantly climbing zigzag. Naming, spatial structure, and operations are all organized around the "Intelligence Spine"; the three scopes are not three disconnected drawings but the same judgment validated at different scales [depth:overall_spatial_structure].

**Boundary and precision statement**: This proposal is generated on provisional boundaries; all areas, ratios, and projects are "discussable, verifiable, and recomputable after official boundary replacement" design quantities, not approved conclusions. When official polygons are published, `site_boundary`, `key_areas`, `land_use`, `buildings`, `roads`, `green_space`, `public_space`, `phasing`, and `metrics.json` must all be recomputed [source:BOUNDARY-SOURCE].

## Coordinated Research Area: Industry and Future City Study

### Three positionings, five functions, and three-areas-two-wings synergy

Across 43.6 km², the coordinated research organizes Haidian's research institutes, leading enterprises, computing/algorithms/data elements, incubation platforms, and technology services into an innovation chain of "university sourcing — open-source collaboration — enterprise conversion — public experience — international communication" [source:AGENT-TASKBOOK]. The proposal responds to the three positionings (Centennial Jing-Zhang Culture Belt, Metropolitan AI Living Experience Belt, AI-Integrated Innovation Belt) and the five functions (AI full-stack autonomous innovation system; world-class AI innovation ecosystem; a new AI+ scenario empowerment paradigm; an intelligent vibrant AI city; global voice in AI governance), with the "three areas and two wings" as the synergy skeleton: Zhongzhiyuan (full-stack autonomy + AI governance), the AI Origin Community (world-class innovation ecosystem), and Dazhongsi (AI-native new business formats), supported by the Zhongguancun Technology Service Wing (factor allocation, IP and capital empowerment) and the Xiaoyuehe Scenario Empowerment Wing (scenario opening and AI vibrant city) [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The wings lie mostly outside the overall design area; this proposal expresses their extension as conceptual interfaces in [data:geometry/constraints.geojson#ASZ-004] and [data:geometry/constraints.geojson#ASZ-005], without asserting out-of-boundary outcomes.

### Naming system and visual identity direction

**Primary name**: 京张智脉 (ZhiMai Jing-Zhang). **English name**: Jing-Zhang Intelligence Spine, abbreviated **JZ-Spine**. **Naming system**: one belt (Jing-Zhang Intelligence Spine) — three cores (Core·Source / Zhongzhiyuan; Core·Origin / AI Origin Community; Core·Confluence / Dazhongsi) — two wings (Wing·Service / Zhongguancun; Wing·Scenario / Xiaoyuehe) — multi-nodes (Smart Point, the generic suffix for AI scenario nodes). **Logo direction**: a "Z" mark (Zhang / 智) that climbs northeast, combining the zigzag motif, neural-network nodes, and rail-and-sleeper lines; with a tricolor system of Jing-Zhang steel grey, Zhongguancun blue, and Yanjing gold, it forms a complete visual identity direction usable for wayfinding, events, digital media, and international communication. This direction is a conceptual suggestion; formal use requires professional development and clearance of fonts, graphics, and trademarks [source:AGENT-TASKBOOK].

### Global AI innovation ecosystem cases and transferable mechanisms

Six public case studies inform the design; the mechanisms extracted are summarized here (details and source registration in `sources.json`):

| Case | Pattern | Transferable mechanism |
| --- | --- | --- |
| Palo Alto, Silicon Valley | University—startup street—capital loop ecosystem | Campus-city slow-traffic stitching, ground-floor startup streets, mentor networks |
| King's Cross, London | Railway heritage land regenerated as knowledge economy | Public reuse of the old station, public space before development within the redline |
| Pangyo Techno Valley, Seoul | Policy special zone + park service platforms | Full-lifecycle enterprise services, talent-housing ratios |
| one-north, Singapore | One-station-one-park-one-town mixed development | Transit-anchored cores, low-rise high density, 24/7 public layers |
| Adlershof, Berlin | Science city with dense research institutions | University/institute co-labs, affordable start-up space |
| Nanshan, Shenzhen | Scenario opening + enterprise-led innovation | First-use scenario lists, test-display-commerce loops |

These cases do not constitute enterprise lists, investment figures, or policy commitments; they are used only to extract spatial and operational mechanisms [source:AGENT-TASKBOOK]. Eight mechanism recommendations follow: campus-city slow-traffic stitching; transit-station integration; garden-style innovation districts; open-source publishing and honor systems; testing-validation sandboxes; scenario opening lists; annual events and developer communities; and international communication and attraction-conversion — each is carried into the overall design, the three key areas, and the operations chapter.

## Overall Design Area: Urban Renewal and Regulatory-Plan-Depth Urban Design

### Spatial structure: one belt, one axis, three cores, two wings, multi-node network

The overall design area is framed by "**one belt and one axis**": the "belt" is the north-south **Spine Greenway** organized along the Jing-Zhang heritage corridor (the extension interface of the Jing-Zhang Heritage Park Vitality Belt; the park itself lies west of the provisional boundary and will be connected once official geometry is confirmed); the "axis" is the **Xueyuan Road–Zhichun Road Innovation Sourcing Axis** linking universities, the Origin Community, and Dazhongsi. The "three cores" are the three key areas; the "two wings" are expressed as conceptual interfaces; the "multi-nodes" are a network of [metric:scenario_node_count] AI scenario nodes. The land-use structure is expressed by the zoning partition beginning at [data:geometry/land_use.geojson#LU-001], and spatial structure and depth are governed by [depth:overall_spatial_structure] and [depth:land_use_layout].

### Urban renewal framework

The renewal framework follows "low disturbance, incremental, public space before development": four renewal categories are identified — transit-station surroundings (Wudaokou, Dazhongsi stations) with integration potential; innovation service belts along the Xueyuan Road institutions corridor; interface renewal zones along the east-west axes (Zhichun–Dazhongsi, Wudaokou); and service and quality upgrades in the eastern residential districts. The renewal project list appears in Chapter 10; at building level, footprints are classified as retain / renovate / new / to-be-confirmed ([data:geometry/buildings.geojson#BLDG-001]); all retain-renovate-demolish statements are conceptual suggestions pending ownership, existing-building, and regulatory-plan confirmation [source:OFFICIAL-ANNOUNCEMENT] [standard:MOHURD-CONTROL-DETAILED-PLANNING].

### Development intensity and to-be-confirmed conditions

This proposal sets no statutory controls such as floor area ratio or building height. Because official regulatory-plan conditions are not public, `metrics.json` records `floor_area_ratio` as `unknown` with the reason documented; building storeys and massing are provided only as **concept design quantities** (`concept_total_floor_area_sqm`, low confidence) to illustrate the spatial-supply idea, not as statutory control [source:SITE-PACKAGE] [depth:development_intensity_controls]. Concept footprint and density are recomputed as [metric:building_footprint_area_sqm] and [metric:building_density] for professional teams to replace once regulatory conditions are obtained.

## Detailed Design of the Key Areas

All three key areas meet the urban-design depth of an implementation plan [depth:three_key_area_detailed_design], and the prose completes a readable mini-plan for each: positioning + spatial structure + building renewal + transport and slow traffic + public space + AI scenarios + implementation risks. The three areas are expressed with provisional rectangles whose edges do not represent parcel or road redlines [source:KEY-AREA-SOURCE].

![Key area index and design tasks](assets/figures/key-areas.png)

### Zhongzhiyuan AI Autonomous Innovation Acceleration Area (Core·Source)

**Positioning**: a garden-style full-stack autonomous innovation district carrying the functions of "AI full-stack autonomous innovation system and global voice in AI governance." **Spatial structure**: the Qinghe garden interface forms the northern ecological edge; a sequence of "R&D clusters — evaluation and release plaza — standards workshop" runs through the middle; innovation services and exhibition functions sit at the southern edge; land use is led by research, complemented by services, plazas, and green space (the northern research zones in [data:geometry/land_use.geojson#LU-001], [data:geometry/public_space.geojson#PUBLIC-101]). **Building renewal**: concept buildings are mainly AI R&D, labs, and incubators ([data:geometry/buildings.geojson#BLDG-001]) at low-rise high density and human scale around garden courtyards. **Transport**: strengthen the North 5th Ring gateway connection and external access, with internal branch roads and greenways ([data:geometry/roads.geojson#ROAD-012]). **Public space**: the Qinghe interface walk ([data:geometry/roads.geojson#ROAD-006]) and the evaluation and release plaza host open testing and governance demonstrations. **AI scenarios**: model safety evaluation sandbox (T1), autonomous-model and standards workshop (T2), and green computing and energy steward (Chapter 6). **Implementation risks**: site status and ownership, national-platform sequencing, and 5th Ring traffic organization require official confirmation; Qinghe blue-line and flood-control conditions are pending [source:OFFICIAL-ANNOUNCEMENT].

### Beijing AI Origin Community (Core·Origin)

**Positioning**: a near-campus conversion and talent community carrying the "world-class AI innovation ecosystem" function and serving as the **spiritual origin** of the Spine narrative — close to the Qinghuayuan Station heritage site that represents the origin of the Jing-Zhang line. **Spatial structure**: a centripetal sequence of "release plaza — conversion street — central park — talent service belt"; land use is led by education-research and conversion R&D, complemented by community services and green space (the middle zones in [data:geometry/land_use.geojson#LU-001], [data:geometry/public_space.geojson#PUBLIC-103]). **Building renewal**: low-disturbance renewal first: preserve campus and park textures, retrofit ground floors as open-source collaboration, release, and life-service spaces; new construction is limited to talent housing and incubators (the education-research clusters in [data:geometry/buildings.geojson#BLDG-001]). **Transport**: campus—park—street slow-traffic stitching through the Wudaokou east-west axis ([data:geometry/roads.geojson#ROAD-003]) and the near-campus connector ([data:geometry/roads.geojson#ROAD-008]); Wudaokou station integration is a near-term pilot. **Public space**: the release plaza and central park form the "open-source living room." **AI scenarios**: open-source publishing hall, near-campus conversion station, Wudaokou youth maker hub, and accessible AI kiosk (Chapter 6). **Implementation risks**: no consent exists for campus, park, or street transformations; campus data and research results require authorization; all remain conceptual suggestions [source:OFFICIAL-ANNOUNCEMENT].

### Dazhongsi AI Industry Cluster (Core·Confluence)

**Positioning**: an urban intelligent-economy and international-exchange district carrying the "AI-native new business formats" function. **Spatial structure**: Dazhongsi station anchors four-quadrant pedestrian connectivity; the south station plaza ([data:geometry/public_space.geojson#PUBLIC-001]) connects cultural-exhibition land, and the eastern commercial and office clusters provide exhibition, office, and public environments for agent, intelligent-terminal, and content-consumption enterprises (the southern zones in [data:geometry/land_use.geojson#LU-001], the four-quadrant walking ring [data:geometry/roads.geojson#ROAD-007]). **Building renewal**: retrofit combined with new construction; public-environment renewal around key enterprises is a near-term project. **Transport**: the station four-quadrant walking ring, the conceptual Dazhongsi East Road secondary corridor ([data:geometry/roads.geojson#ROAD-011]), and static-traffic organization. **Public space**: station plaza, four-quadrant paths, and the agent market form an "urban living room." **AI scenarios**: agent market, data-element compliance lounge, and cultural display (Chapter 6). **Implementation risks**: station integration, rail redlines, and utility conditions require official confirmation; green-space composite use awaits regulatory support; nothing is stated as an approved project [source:OFFICIAL-ANNOUNCEMENT].

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### User personas

Seven personas cover talent, enterprises, and residents (full fields and privacy boundaries in `compliance_matrix.json`):

| Persona | Typical needs | Spatial response | Self-check boundary |
| --- | --- | --- | --- |
| Open-source developer | Release, collaboration, testing, community reputation | Open-source publishing hall, public code wall, night collaboration spaces | No personal behavior tracking; aggregate statistics only |
| Startup team | Low-cost office, compute access, proving ground | Shared testing field in Zhongzhiyuan, incubators, policy windows | Compute and data services require separate authorization |
| Key-enterprise visitor | Exhibition, business, international hosting, recruiting | Dazhongsi international roadshow lounge, transit connection, public space around enterprises | Enterprise marks and cases require clearance |
| University faculty and students | Conversion, cross-campus collaboration, daily walking | Campus-park slow-traffic stitching, conversion stations | Campus data and research results require authorization |
| Local residents | Commuting, leisure, community services | Spine Greenway, embedded community services, tiered events | No commercial use of resident profiles |
| International visitors | Cultural experience, global events, city image | Pilgrimage route, bilingual wayfinding, communication nodes | Content and imagery require clearance |
| City operators | Governance, data compliance, emergency coordination | Civic-agent sandbox, safety-governance display | Minimal-use principle for city data |

### AI scenario cards

Following the taskbook, 12 scenario cards are provided (≥10), of which 3 are industry testing-validation scenarios (T1–T3); each card maps to a spatial node, target users, data boundaries, human review, and operating entity:

| No. | Scenario card | Spatial carrier | Target users | Data and privacy boundary |
| --- | --- | --- | --- | --- |
| S-01 | Origin Open-Source Publishing Hall | [data:geometry/constraints.geojson#SN-001] | Developers, universities, startups | Public code and voluntarily submitted information |
| S-02 | **T1 Model Safety Evaluation Sandbox** | [data:geometry/constraints.geojson#SN-002] | Model firms, evaluation bodies, regulators | Anonymized test data, human spot checks |
| S-03 | Edge-Compute Kiosk | [data:geometry/constraints.geojson#SN-003] | Residents, small businesses | Authorized use of compute services |
| S-04 | Slow-Traffic Gap Diagnosis Agent | [data:geometry/constraints.geojson#SN-004] | City operators, public | Public network and aggregate data only |
| S-05 | Jing-Zhang Memory AR Guide | [data:geometry/constraints.geojson#SN-005] | Visitors, residents, students | Minimal and switchable location data |
| S-06 | Dazhongsi Agent Market | [data:geometry/constraints.geojson#SN-006] | Enterprises, consumers, visitors | Voluntary submission of products and demos |
| S-07 | Data-Element Compliance Lounge | [data:geometry/constraints.geojson#SN-007] | Data firms, legal teams, regulators | Auditable compliant authorization |
| S-08 | Near-Campus Conversion Station | [data:geometry/constraints.geojson#SN-008] | Faculty, students, investors | Research data requires authorization |
| S-09 | **T2 Autonomous-Model and Standards Workshop** | [data:geometry/constraints.geojson#SN-009] | Standards bodies, open-source community | Open working materials, anonymized red-team records |
| S-10 | Pilgrimage Week Start Station | [data:geometry/constraints.geojson#SN-010] | International visitors, developers | Voluntary registration only |
| S-11 | Accessible AI Kiosk | [data:geometry/constraints.geojson#SN-011] | Seniors, persons with disabilities | On-site human fallback; no forced registration |
| S-12 | **T3 Embodied-AI Test Street Entrance** | [data:geometry/constraints.geojson#SN-013] | Robotics and logistics firms | Closed test windows, human supervision |

The remaining nodes — green computing and energy steward [data:geometry/constraints.geojson#SN-012] and Wudaokou youth maker hub [data:geometry/constraints.geojson#SN-014] — join the Smart Point network. All scenarios follow the principles of data minimization, public sources, explainability, and human review; no scenario constitutes privacy intrusion, over-surveillance, or an un-reviewable "black box" [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. Scenario–space correspondence also enters the service zones beginning at [data:geometry/constraints.geojson#ASZ-001].

## Land Use, Building Scale, and Retain-Renovate-Demolish

Land use follows the national territorial survey, planning, and use-control classification, covering the full submitted boundary without gaps or overlaps ([metric:land_use_coverage_ratio]) [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The overall structure is "green corridor west, education and research center, living east, smart confluence south, autonomous source north": the western Spine Greenway and heritage-corridor green belts form 26% parks and buffer green ([metric:green_ratio]); the center is led by higher-education research (0804, [metric:land_use_area_0804_sqm]) and innovation R&D (0802, [metric:land_use_area_0802_sqm]); the east holds residential and service land (0701, 0702, 0806); Dazhongsi in the south combines commercial, cultural, and station-plaza land; and Zhongzhiyuan in the north combines R&D, services, and strategic reserve (16, [metric:land_use_area_16_sqm]).

Buildings are expressed as "concept footprints": 172 concept blocks are typed as R&D, lab, incubator, office, education, residential, and cultural ([data:geometry/buildings.geojson#BLDG-001]); concept footprint totals about [metric:building_footprint_area_sqm] m² and concept floor area about [metric:concept_total_floor_area_sqm] m², each marked with `renewal_status` (retain / renovate / new / to-be-confirmed) and explicitly labeled **low-confidence concept quantities**, not statutory FAR or scale [depth:height_massing_character] [depth:retain_renovate_demolish]. Retain-renovate-demolish conclusions must wait for existing buildings, ownership, and regulatory conditions; until then this proposal provides only methods and a calibration checklist, never fabricated parcel-level conclusions [source:SITE-PACKAGE].

## Transport, Rail, Municipal Infrastructure, and Public Services

**Roads and slow traffic**: the network is organized as "Spine Greenway + Xueyuan Road slow-traffic belt + Wudaokou/Zhichun east-west axes + Dazhongsi East Road north-south corridor + station walking rings"; greenways and walkways total about [metric:greenway_length_m] m ([data:geometry/roads.geojson#ROAD-001], [data:geometry/roads.geojson#ROAD-003], [data:geometry/roads.geojson#ROAD-007]), with a road-area ratio of about [metric:road_ratio]. **Rail and connection**: station-integration concepts are proposed around Wudaokou and Dazhongsi; a transit-connection belt is arranged along the North 4th Ring ([data:geometry/roads.geojson#ROAD-005]); rail alignments and redlines are locked layers whose missing official geometry is registered as `A-CONTROLS-001` [source:SITE-PACKAGE]. **Parking and non-motorized traffic**: static-traffic organization and shared-bike collection points are suggested around stations and key enterprises. **Municipal and new infrastructure**: edge-compute kiosks, green computing and energy stewardship, distributed energy, and integrated municipal facilities form the new-infrastructure concept ([data:geometry/constraints.geojson#SN-003]); where utility lines, cross-sections, fire, and flood data are missing, items are listed as prerequisites for formal deepening [depth:municipal_new_infrastructure] [depth:traffic_rail_slow_parking]. **Public services**: innovation service platforms, talent services, healthcare, education, and accessibility facilities are organized in "10-minute innovation life circles," anchored in the 0702 and 0806 zones of [data:geometry/land_use.geojson#LU-001].

![Mobility, slow traffic, and blue-green public space system](assets/figures/mobility-bluegreen.png)

## Blue-Green Space, Public Space, and Urban Character

**Blue-green skeleton**: the Spine Greenway runs north-south as the main axis, linking the Qinghe garden interface (Zhongzhiyuan), the Origin Central Park (AI Origin Community), and the Dazhongsi station plaza ([data:geometry/green_space.geojson#GREEN-001]); the Jing-Zhang Heritage Park itself lies west of the provisional boundary, and this proposal expresses the connection intent through greenway extension and slow-traffic stitching, to be deepened after official boundary confirmation. **Public space system**: station plazas, release plazas, node plazas, and greenway nodes form a four-tier public-space network ([metric:public_space_ratio]) carrying composite uses of parking, sports, innovation exchange, technology testing, application display, and public services [depth:blue_green_public_space].

**AI pilgrimage landmarks (≥3)**:

1. **Jing-Zhang Origin Monument and Agent Contribution Honor Wall** (Origin Community release plaza, [data:geometry/public_space.geojson#PUBLIC-103]): with the Qinghuayuan station heritage as the spiritual origin, commemorating the first agents and human contributors to a real urban design effort, forming a sustainably updated honor system;
2. **Open-Source Achievement Gallery** (mid-section of the Spine Greenway): open-source project showcases and a public code wall that turns "open source" from an event into space;
3. **Gateway of the Spine** (North 5th Ring gateway / northern edge of Zhongzhiyuan): a northern gateway landmark in the language of the zigzag form;
4. **Dazhongsi AI Epoch Plaza** (core of the four-quadrant walking ring, [data:geometry/public_space.geojson#PUBLIC-001]): the exhibition living room of the urban intelligent economy and international exchange.

All landmarks must comply with heritage, green, blue-line, and traffic-safety constraints; they are conceptual suggestions and must not be read as approved construction [source:AGENT-TASKBOOK].

**Urban character and cultural narrative (agent.5)**: the narrative is organized as "three chapters of self-reliance in innovation" — 1910 railway self-reliance (Zhan Tianyou's Jing-Zhang Railway within the Centennial Jing-Zhang Culture Belt around [data:geometry/site_boundary.geojson#SITE-001]), 1980 technology self-reliance (Zhongguancun's electronics street and culture), and 2026 AI self-reliance (open-source co-creation in the agent era); the wayfinding and signage system uses "rail · sleeper · circuit" as its motif, layered distinctly beneath the belt-level Logo system (the Spine Z mark), forming an international bilingual narrative ("from the zigzag line to the Intelligence Spine") [source:AGENT-TASKBOOK]. Character control follows the Urban Design Measures' requirements to coordinate planar and three-dimensional space, public space, and building height, massing, style, and color; content touching heritage control lines is marked as pending official conditions [standard:MOHURD-URBAN-DESIGN-MEASURES].

## Renewal Project List, Implementation Policy, and Phasing

### Renewal project list (12 conceptual items)

| No. | Project | Type | Dependencies | Phase |
| --- | --- | --- | --- | --- |
| JZ-01 | Spine Greenway slow-traffic gap stitching | Public space/transport | Road redlines, underpass space, traffic review | Near term |
| JZ-02 | Qinghe garden interface renewal | Blue-green/industry display | River blue line and flood control | Near term |
| JZ-03 | Origin Community open-source publishing hall | Urban renewal/industry services | Ownership, ground-floor uses, operator | Near term |
| JZ-04 | Dazhongsi station four-quadrant connectivity | Station integration/slow traffic | Station, intersections, utilities | Near term |
| JZ-05 | Wudaokou youth plaza and station connection | Station integration/public space | Station retrofit and traffic organization | Near term |
| JZ-06 | Model safety evaluation sandbox (T1) | New infrastructure/testing | Compute, safety, operator | Near term |
| JZ-07 | Edge-compute kiosk pilot | New infrastructure/public service | Energy, compute, compliance | Near term |
| JZ-08 | Xueyuan Road innovation service belt interface | Urban renewal/character | Campus-adjacent ownership and controls | Mid term |
| JZ-09 | Dazhongsi intelligent-economy building renewal | Urban renewal/industry | Enterprise ownership, regulatory conditions | Mid term |
| JZ-10 | Eastern residential service upgrade | Urban renewal/community | Existing buildings and resident participation | Mid term |
| JZ-11 | Embodied-AI test street (T3) | Testing/industry | Closed testing and safety supervision | Mid term |
| JZ-12 | Global AI events system and brand assets | Operations/brand | Event permits, copyright clearance, media | Long term |

Project and phasing depth are governed by [depth:renewal_project_list] and [depth:phasing_implementation], with spatial phases expressed by [data:geometry/phasing.geojson#PHASE-001], [data:geometry/phasing.geojson#PHASE-002], and [data:geometry/phasing.geojson#PHASE-003] (near term about [metric:phasing_phase_1_area_sqm] m², mid term about [metric:phasing_phase_2_area_sqm] m², long term about [metric:phasing_phase_3_area_sqm] m²). The 100-day call window is distinguished from implementation phasing: the call window is the submission period; implementation phasing is the urban renewal path — near-term starts with lightweight facilities, operations, and service platforms; mid-term enters building and district renewal; long-term forms the governance framework [source:AGENT-TASKBOOK].

### Global AI events system and long-term operations (agent.6)

**Annual event system**: "Global AI Developer Pilgrimage Week (August, aligned with the deadline and implementation season) + Jing-Zhang AI Innovation Festival (annual flagship) + Scenario Open Days (quarterly) + Open-Source Nights (monthly) + Origin Forum (annual academic) + Zhongzhiyuan Evaluation Grand Prix (annual competition)" forms the year-round rhythm. **Brand and communication**: unified "Jing-Zhang Intelligence Spine" visual identity with the bilingual narrative "from the zigzag line to the Intelligence Spine." **Developer community**: open-source contribution points link to the honor wall, closing the "contribute — display — commemorate" loop. **Scenario open operation**: testing-validation scenarios are opened through negative lists and sandbox licensing. **Public experience and landmark operation**: pilgrimage routes, the open-source gallery, and the AI Epoch Plaza follow tiered public-space operation rules. **International communication and attraction-conversion**: the Pilgrimage Week and Innovation Festival convert visits by global developers, enterprises, and media into an "event — experience — settlement" path. All events, investment attraction, funding, and policy arrangements are conceptual suggestions and do not constitute confirmed government arrangements [source:AGENT-TASKBOOK].

## Indicator System, Area Recalculation, and Compliance Matrix

All core indicators are recomputed from `geometry/*.geojson` in EPSG:4548 (`metrics.json`); the prose explains design meaning only: overall design area about [metric:site_area_sqm] m² (announced value [metric:site_area_announced_sqm] m²); green ratio [metric:green_ratio], public-space ratio [metric:public_space_ratio], and road ratio [metric:road_ratio] jointly support the "blue-green slow-traffic composite ring" claim; building footprint and concept area ([metric:building_footprint_area_sqm]) support the industrial spatial supply discussion; the three key-area areas (e.g., [metric:key_area_zhongzhiyuan_ai_acceleration_area_area_sqm]) with [metric:key_area_count] verify key-area coverage; phasing areas, greenway length, and scenario-node counts support implementation and operations narratives. Regulatory indicators (e.g., FAR) are uniformly recorded as `unknown` with the pending conditions stated [depth:metrics_recalculation].

![Core metrics recalculation and evidence chain](assets/figures/metrics-evidence.png)

`compliance_matrix.json` covers all mandatory tasks of announcement sections 1.3, 1.4, 1.5 and agent.1–agent.6; `standard_matrix.json` covers all mandatory professional standards; every required item in `design_depth_matrix.json` is marked `complete`, with items depending on pending data honestly marked `data_gap` together with the recalculation path. Any conclusion lacking official regulatory-plan, road-redline, ownership, municipal, fire, or heritage conditions is downgraded to a to-be-confirmed item and registered in `assumptions.json` (`A-CONTROLS-001`, `A-BOUNDARY-001`) and this chapter.

## Risks, Copyright, and Compliance Statement

**Data and boundary risks**: official polygons, regulatory conditions, road redlines, heritage control lines, ownership, and utility data are not yet public; all related conclusions are provisional or to-be-confirmed; this proposal claims no official approval, approved regulatory plan, final ownership, final construction scale, or guaranteed implementation [source:SITE-PACKAGE] [depth:risk_missing_data]. **Copyright and authorization**: all images, drawings, icons, fonts, trademarks, and enterprise marks require clearance before use; AI-generated content records the models and tools used (see `agent.json` and `report/copyright_statement.md`), and the author is responsible for facts, sources, and citations. **Privacy and compliance**: AI scenarios follow data minimization, public sources, human review, and explainability; no personal privacy is collected, no non-public data is used, and no un-reviewable service is offered [standard:GENERATIVE-AI-INTERIM-MEASURES]. **Wording boundary**: all spatial implementation, event operations, branding, and policy mechanisms are expressed as "conceptual suggestions / reference schemes / material for professional teams to deepen," not as government-approved conclusions or implementation commitments. Bilingual counterparts, drawings, HTML, and text-bearing figures are paired per the bilingual contract, and terminology follows the event glossary.

## References

- Haidian Branch, Beijing Municipal Commission of Planning and Natural Resources: Qualification Prequalification Announcement for the International Urban Design Call for the Centennial Jing-Zhang AI Innovation Belt (2026-05-09)
- Extract of the open-call taskbook for the Centennial Jing-Zhang AI Innovation Belt urban design (user-provided cleared material, 2026-05-18)
- Beijing Municipal Science & Technology Commission / Zhongguancun Administrative Committee: "Three Areas, Two Wings" to Build a World-Class AI Hub (2026-04-03, background)
- Haidian District People's Government: Haidian "1+X+1" Modern Industrial System (2026-03-02, background)
- Ministry of Housing and Urban-Rural Development: Urban Design Measures (2017)
- Ministry of Housing and Urban-Rural Development: Measures for the Formulation and Approval of Regulatory Detailed Plans for Cities and Towns
- Ministry of Natural Resources: Guide to the Classification of Land and Sea Use for Territorial Spatial Survey, Planning, and Use Control (2023-11)
- Cyberspace Administration of China et al.: Interim Measures for the Management of Generative AI Services (2023-07)
- Standing Committee of the National People's Congress: Law of the People's Republic of China on Building a Barrier-Free Environment (2023-06)
- Repository site package and processed materials: `brief/site-package/`, `data/source_registry.json`, `data/processed/agent_fact_pack.md`
- Complete machine indexes: `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`
- Full provenance and license follow the site-package registry [source:SITE-PACKAGE]
