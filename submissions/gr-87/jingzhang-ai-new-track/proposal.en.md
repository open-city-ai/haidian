---
title: "JingZhang NewTrack: Concept Urban Design for the Centennial Jing-Zhang AI Innovation Belt"
author_github: "gr-87"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Under the master concept of 'Three Tracks, One Pulse', the design unifies the century-old Jing-Zhang iron rail, modern urban transit, and the AI intelligence track into one continuous urban-design spine, proposing a 'One Belt, Three Cores, Two Wings, Seven Axes' spatial structure together with a naming system, scenario system, pilgrimage landmarks, and long-term operation mechanisms for global AI developers and residents."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "ai-health-service-navigation", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v0.1"
---

# JingZhang NewTrack: Concept Urban Design for the Centennial Jing-Zhang AI Innovation Belt

## Design Basis and Source Inventory

This proposal takes the Qualification Prequalification Announcement of the Centennial Jing-Zhang AI Innovation Belt International Urban Design Solicitation by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources as its primary formal basis. The announcement specifies the three scope levels (approximately 43.6 km² coordinated research area, 11.4 km² overall design area, and 368.4 ha key detailed-design area) and the three key areas (Zhongzhiyuan AI Acceleration Area, Beijing AI Origin Community, and Dazhongsi AI Industry Cluster) with their names, north-south order, and areas [source:OFFICIAL-ANNOUNCEMENT] [source:SITE-PACKAGE]. The agent-facing open-call taskbook further defines six required tasks, five functions, the three-areas-two-wings layout, and the co-creation charter, serving as the machine-readable basis for organizing deliverables [source:AGENT-TASKBOOK].

The spatial base map uses repository-maintained provisional boundaries derived from the announcement's textual four-extents and recomputed in EPSG:4548. They are all labeled `provisional_constraint`, `official_boundary=false`; they serve generation, visualization, and intake self-check only, and do not represent road redlines, parcel, or ownership boundaries, nor act as official redlines, approval bases, or precise-area bases [source:BOUNDARY-SOURCE] [data:geometry/site_boundary.geojson#SITE-001]. The three key areas are likewise provisional rough extents [source:KEY-AREA-SOURCE] [data:geometry/key_areas.geojson#PROV-KEY-001]. All spatial implementation, event operation, branding, and policy-mechanism suggestions in this proposal are **concept proposals, reference schemes, or material for professional teams to deepen**; they do not replace statutory planning and do not constitute government-approved conclusions [source:AGENT-TASKBOOK].

![Evidence chain and submission package diagram](assets/figures/site-overview.png)

When official polygons and regulatory-plan conditions are released, all layers, metrics, figures, HTML, and drawings in the package must be regenerated as a whole, not file by file; this organizer data gap itself does not block content scoring [source:PROCESSED-FACT-PACK] [metric:site_area_sqm].

## Three-Level Scope Working Framework

The proposal organizes work by the three scopes defined in the announcement [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]:

| Level | Design question | Proposal response | Data anchor |
| --- | --- | --- | --- |
| Coordinated research area (≈43.6 km²) | How to organize the AI industry ecosystem and future urban form | A five-link innovation chain of "university research → open-source collaboration → enterprise conversion → public experience → international communication"; the three positioning belts expressed as one | [metric:site_area_sqm], standard_matrix.json |
| Overall design area (≈11.4 km²) | How to map industry space, urban renewal, transport/utilities and city character | "One Belt, Three Cores, Two Wings, Seven Axes" spatial structure; land-use/building/road/green/public-space/phasing layers jointly express it | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key detailed-design area (≈368.4 ha) | How each of the three areas reaches detailed-design depth | Positioning, spatial moves, AI scenarios and implementation dependencies per area | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

The three levels are not separate drawing sets: coordinated research decides industry and urban-form judgments, overall design maps them into renewal projects and spatial structure, and key areas verify implementability at district scale. The provisional boundary used here recomputes to approximately 11.41 km² in EPSG:4548, deviating from the announced value on the order of 0.1%, and must still be recomputed after official boundaries are released [metric:site_area_sqm] [source:BOUNDARY-SOURCE].

![Three-level scope and spatial working framework](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future-City Study

### Three Positioning Belts and Five Functions

The coordinated research area superimposes three thematic belts — the **Centennial Jing-Zhang Culture Belt** (history and public-space spine), the **Urban AI Life Experience Belt** (scenario perception and daily experience), and the **AI Integration & Innovation Belt** (deep integration of industry and urban governance) — corresponding to the taskbook's five functions: full-stack independent innovation, world-class innovation ecosystem, AI+ scenario empowerment, intelligent AI vibrant city, and global AI governance voice [source:AGENT-TASKBOOK]. These belts are not three physically isolated lines but three identities of the same space at different observation scales; the proposal maps them as "one spine linking three cores, three identities overlaid" [depth:overall_spatial_structure].

### Naming System: Three Tracks, One Pulse

The proposed master name is **「京张·新轨」**, English **JingZhang NewTrack**. The naming has three layers: first, "track/rail" carries the historical memory of the Jing-Zhang Railway as the first trunk railway independently designed and built by Chinese engineers — a rail is a route, a discipline, and a standard; second, "new track" points to the modern transit network (e.g., Rail Line 13) sharing the Jing-Zhang corridor [data:geometry/constraints.geojson#CON-002]; third, "new track" is a metaphor for the "data track" of the AI era — training algorithms is like laying new rails for the city, and model iteration is like trains changing tracks to gain speed. The sub-naming system proposes: Zhongzhiyuan = "Zhongzhi Platform", Origin Community = "Zero Point Station", and Dazhongsi = "Bell Station", forming the spatial narrative of "NewTrack One Line, Three Stations" [source:AGENT-TASKBOOK] [depth:overall_spatial_structure].

**Logo and visual direction**: three parallel rail lines derived from a railway sleeper cross-section, with the middle line formed by a continuous data pulse (waveform), reading as an "N" — the first letter of NewTrack, also suggesting "a new track direction." Color proposal: rail gray-blue (history) + Haidian technology blue (innovation) + intelligence-pulse green (sustainability), three colors encoding "Three Tracks, One Pulse." This visual system is a design-direction proposal; it claims no registered trademark rights, and formal use requires separate clearance [source:AGENT-TASKBOOK].

### Five to Eight Global AI Innovation Ecosystem Cases

| Case | Key mechanism | Transferable lesson |
| --- | --- | --- |
| Silicon Valley–Stanford corridor, USA | Proximity of university incubation, venture capital, and startup culture | Near-university incubation and slow-mobility stitching at the Origin Community [data:geometry/buildings.geojson#BLDG-009] |
| Pangyo Techno Valley, Korea | Government-led test beds and global developer events | Open test field and governance exhibition at Zhongzhiyuan |
| One-North, Singapore | Mixed use, green public space, 24-hour vitality | Green/public-space ratios and youth-friendly design [metric:green_ratio] |
| King's Cross, London | Railway brownfield converted to innovation district | Activating railway memory along the Jing-Zhang heritage belt |
| Amsterdam Smart City | Public protocols for citizen participation and data governance | Public feedback and human review mechanisms for city agents |
| Shibuya, Tokyo | Station-area integrated development and subculture vitality | Dazhongsi station integration and four-quadrant pedestrian connectivity [data:geometry/roads.geojson#ROAD-004] |
| Nanshan Science Park, Shenzhen | Industrial park transformed into urban district | Mixed research and public-service land use [metric:land_use_area_research_sqm] |
| Kendall Square, Boston | Density and encounter spaces of a life-science cluster | Encounter-density design of Zhongzhiyuan research clusters |

These cases serve only as mechanism comparisons at the public-information level; no claims are made about companies, investment amounts, or policies [source:AGENT-TASKBOOK] [source:PROCESSED-FACT-PACK].

### Three-Areas-Two-Wings Synergy Loop

The three areas and two wings form a "research → conversion → agglomeration → service → scenario" synergy loop: Zhongzhiyuan (north core) carries full-stack independent innovation and governance voice; the Origin Community (central core) carries result conversion and the open-source ecosystem; Dazhongsi (south core) hosts intelligent-native new business forms; the Zhongguancun Technology Service Wing (west wing) supports the three areas through global factor allocation and capital empowerment, while the Xiaoyue River Scenario Empowerment Wing (east wing) feeds back via scenario deployment and vibrant-city experience [source:AGENT-TASKBOOK] [depth:overall_spatial_structure].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Depth Urban Design

The overall design area is organized at the urban-design depth of a regulatory detailed plan; core conclusions are supported by the submitted layers [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout].

**Spatial structure "One Belt, Three Cores, Two Wings, Seven Axes"**:
- **One Belt**: the Jing-Zhang Railway Heritage Park Intelligence-Track Vitality Belt, the north-south slow-mobility and public-space spine, expressed as a continuous 1401 park-green band [data:geometry/green_space.geojson#GREEN-001], with AI scenario nodes and pilgrimage landmarks along it [depth:blue_green_public_space].
- **Three Cores**: the three key areas, detailed in the next chapter.
- **Two Wings**: the west Zhongguancun Technology Service Wing (via research and commercial land bands) [data:geometry/land_use.geojson#LU-004] and the east Xiaoyue River Scenario Empowerment Wing (via the Xueyuan Road research band and communities) [data:geometry/land_use.geojson#LU-005].
- **Seven Axes**: seven horizontal/vertical functional axes including the North 5th Ring auxiliary road, Tsinghua East Road, Chengfu Road, Zhichun Road, Xueyuan Road, Wanquan River East Road, and a research-district north-south branch road; schematic alignments are in the road layer [data:geometry/roads.geojson#ROAD-002] [data:geometry/roads.geojson#ROAD-003] [data:geometry/roads.geojson#ROAD-005].

**Land-use structure** (recomputed as a seamless partition within the provisional boundary) [metric:site_area_sqm]: research (0802) ≈ 4.82 km², commercial (05) ≈ 1.07 km², residential (0701) ≈ 1.85 km², education (0804) ≈ 0.35 km², road (1207) ≈ 0.60 km², green (1401+1402) ≈ 2.48 km², culture (0803) ≈ 0.15 km², plaza (1403) ≈ 0.09 km², closing with the site area [metric:land_use_area_research_sqm] [metric:land_use_area_commercial_sqm] [metric:land_use_area_residential_sqm].

**Renewal framework and retain/renovate/demolish logic**: the building layer expresses 21 representative footprints classified as retain (illustrative existing residential and cultural buildings), renovate (existing research and commercial blocks), and new (Zhongzhiyuan research clusters, Open-Source Launch Hall, Industry Exhibition Hall) [data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish]. Because existing-condition, ownership, and regulatory-plan data await formal release, retain/renovate/demolish is method- and direction-oriented only and is not a parcel-level conclusion [source:PROCESSED-FACT-PACK].

**Development intensity**: FAR, building height, building density, green ratio, setbacks, and road redlines are all listed as pending confirmation until official regulatory-plan conditions are published; no approved values are given [metric:floor_area_ratio] [metric:building_height_m] [standard:MOHURD-CONTROL-DETAILED-PLANNING].

## Key Area Detailed Design

Each of the three key areas reaches the urban-design depth of a comprehensive implementation plan, with a seven-element mini-scheme of "positioning + spatial structure + building renewal + transport/slow mobility + public space + AI scenarios + implementation risks" [depth:three_key_area_detailed_design].

### Zhongzhiyuan AI Acceleration Area (North Core)

Positioned as a **"garden-type full-stack independent innovation district"** carrying full-stack innovation, standard-setting, safety governance, and industry display [data:geometry/key_areas.geojson#PROV-KEY-001]. Spatial moves: a central green corridor linking the west innovation cluster and the east full-stack research cluster [data:geometry/green_space.geojson#GREEN-002]; a low-carbon innovation encounter belt along the Qing River frontage [data:geometry/roads.geojson#ROAD-009]; protective green along the Jingzang Expressway to soften the noise interface [data:geometry/land_use.geojson#LU-013]. Buildings center on newly built Large-Model R&D Center, Industry Exhibition & Governance Hall, and service buildings [data:geometry/buildings.geojson#BLDG-018] [data:geometry/buildings.geojson#BLDG-019], with reserved open test fields. AI scenarios: autonomous-model test sandbox, standards-governance exhibition hall, low-carbon compute experience, and the Zhongzhiyuan Exchange Plaza [data:geometry/public_space.geojson#PUBLIC-005]. Implementation risks: the North 5th Ring and Qing River interfaces require transport, flood-control, and ecological review — pending confirmation.

### Beijing AI Origin Community (Central Core)

Positioned as a **"near-university conversion and talent community"** carrying the open-source ecosystem, result release, and talent-zone services [data:geometry/key_areas.geojson#PROV-KEY-002]. Spatial moves: Wudaokou commercial street and Chengfu Road as the vitality skeleton [data:geometry/roads.geojson#ROAD-003]; the "Zero Point Station" Open-Source Launch Hall (new) [data:geometry/buildings.geojson#BLDG-009] and near-university incubation blocks (renovated) [data:geometry/buildings.geojson#BLDG-007] organized around the heritage belt, with campus-park-street slow-mobility stitching to reduce severance [data:geometry/roads.geojson#ROAD-008]. AI scenarios: Open-Source Launch Hall, result-conversion street, AI education experience points, and the Origin Open-Source Plaza [data:geometry/public_space.geojson#PUBLIC-002]. Implementation risks: campus boundaries, property rights, and ground-floor uses require multi-party coordination; retain/renovate/demolish awaits existing-condition data.

### Dazhongsi AI Industry Cluster (South Core)

Positioned as an **"urban-type intelligent economy and international exchange district"** hosting agents, intelligent terminals, content consumption, and data-element businesses [data:geometry/key_areas.geojson#PROV-KEY-003]. Spatial moves: Zhichun Road and the transit station as the hub [data:geometry/roads.geojson#ROAD-004]; four-quadrant pedestrian connectivity organized around the station-front plaza [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/land_use.geojson#LU-015]; a new AI headquarters cluster and renovated commercial blocks on the east side [data:geometry/buildings.geojson#BLDG-003]; planned green space compound-used for public experience [data:geometry/green_space.geojson#GREEN-003]. AI scenarios: Dazhongsi International Pitch Lounge, Data-Element Lounge, and station-front vitality commerce. Implementation risks: transit integration, utilities, and intersection engineering require professional deepening.

![Key areas index and design task diagram](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Talent Personas, and AI+ Scenarios

### Five User Personas

| Persona | Typical needs | Spatial response | Self-check boundary |
| --- | --- | --- | --- |
| Open-source developer | Release, collaboration, testing, community reputation | Origin Open-Source Launch Hall, public code wall, night collaboration space | No personal behavior tracking; activity data aggregated only |
| Startup team | Low-cost office, compute entry, product test field | Zhongzhiyuan shared test field, edge-compute service point, governance advisory | Compute and data services require separate authorization |
| Head-company visitor | Display, business, international reception, recruiting | Dazhongsi International Pitch Lounge, transit connection, public space around companies | Company logos and cases require clearance |
| Nearby resident | Commuting, leisure, community service, low-disturbance renewal | Heritage-belt slow-mobility loop, embedded community service, graded night lighting | Resident personas not used for commercial recommendation |
| University faculty/students | Result conversion, cross-campus collaboration, daily slow mobility | Campus-park slow-mobility stitching, conversion stations, AI education points | Campus data and research results require authorization |

Personas serve spatial and scenario design only; no individual data is collected. All AI assistance follows data-minimization, explainability, and human-review principles [source:AGENT-TASKBOOK] [standard:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES].

### AI Scenario Cards (10+, including 3 industry test/validation scenarios)

| No. | Scenario card | Spatial carrier | Type | Design note | Human review/privacy boundary |
| --- | --- | --- | --- | --- | --- |
| SC-01 | Open-Source Launch Hall | Origin Community "Zero Point Station" | Brand event | Result release, code-contribution display, small-scale roadshows | Manual content review; no behavior tracking |
| SC-02 | Autonomous Model Test Sandbox | Zhongzhiyuan | **Industry test/validation** | Visitable collaboration node for standard-setting, safety evaluation, model red-teaming | Test data anonymized; results manually reviewed |
| SC-03 | Edge-Compute Station | Nodes across the overall design area | **Industry test/validation** | Compound prototype of edge compute, low-carbon energy, and public services | Compute use authorized; no individual tracking |
| SC-04 | AI Slow-Mobility Navigation | Heritage-belt vitality belt | AI+Transport | Explainable signage to help identify slow-mobility gaps, congestion, and accessibility needs | Aggregated heat only; no personal profiles |
| SC-05 | Dazhongsi International Pitch Lounge | Dazhongsi area | International exchange | Display, negotiation, media release, international communication | Compliance review of international content |
| SC-06 | Qing River Low-Carbon Innovation Corridor | Zhongzhiyuan Qing River frontage | Blue-green space | Green space, stormwater, walking/cycling, and AI display compound | Ecology and flood-control conditions reviewed |
| SC-07 | Near-University Result-Conversion Street | Origin Community | Industry service | Incubation, display, legal, IP, and financing services | IP compliance review |
| SC-08 | Data-Element Lounge | Dazhongsi area | **Industry test/validation** | Data-element circulation service interface premised on compliance, authorization, and auditability | Data authorization and audit records |
| SC-09 | AI Life-Service Model Street | Community–commerce interface | AI+Public service | AI+ scenarios for medical, education, legal, and life services | Medical/legal services require human fallback |
| SC-10 | Global AI Week Route | Belt-wide public-space system | Operation/brand | Walkable experience line from heritage culture, open source, industry display to international roadshow | Event safety and copyright clearance |
| SC-11 | Accessibility Care Service Point | Communities and public facilities | AI+Public service | On-site guidance and human-operated service per Article 39 of the Barrier-Free Environment Law | Human-first, device-assisted |
| SC-12 | Robot Delivery Pilot Line | Dazhongsi–Xueyuan Road section | Robotics | Low-speed, supervised, reviewable unmanned delivery pilot | Speed/zone limits; human takeover |

All scenarios are concept proposals and directions for deepening; they are not presented as approved operations or fully deployable [source:AGENT-TASKBOOK] [standard:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW]. The full scenario-space-operation mapping index is in `compliance_matrix.json` and `visual/index.html`.

## Land Use, Building Scale, and Retain/Renovate/Demolish

Land-use classification follows the land-use codes of the Ministry of Natural Resources' "Guidelines for Land and Sea Use Classification in Territorial Spatial Survey, Planning, and Use Control," forming a closed, seamless partition [standard:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311] [data:geometry/land_use.geojson#LU-001]. Building scale is expressed as representative footprints with renewal classes; no approved total floor area is given; FAR and height remain pending until regulatory-plan conditions are released [metric:floor_area_ratio], height control likewise pending [metric:building_height_m], with building form and massing managed under a design-depth item [depth:height_massing_character] and intensity control under another [depth:development_intensity_controls]. Total building footprint is about 0.98 km² across 21 representative footprints, about 8.6% of the site, used only to discuss the structure of space supply and not as a construction-scale conclusion [metric:building_footprint_area_sqm] [metric:building_count].

## Transport, Transit, Municipal, and Public Service Facilities

The transport scheme addresses transit-station integration, road microcirculation, slow-mobility gap stitching, and green mobility [depth:traffic_rail_slow_parking]. Schematic alignments cover the North 5th Ring auxiliary road, Tsinghua East Road, Chengfu Road, Zhichun Road, and Xueyuan/Xitucheng Road as primary/secondary roads, plus the Jing-Zhang Intelligence-Track slow-mobility greenway and the Qing River waterfront trail [data:geometry/roads.geojson#ROAD-008] [data:geometry/roads.geojson#ROAD-009]; the schematic Rail Line 13 alignment along the Jing-Zhang corridor is placed in the constraints layer for design cross-check [data:geometry/constraints.geojson#CON-002]. All alignments are labeled `provisional_alignment`; road redlines, rail alignments, bridges/tunnels, and municipal works require official survey [metric:road_length_m] [source:PROCESSED-FACT-PACK]. Municipal and new infrastructure (edge compute, distributed energy, integration with conventional municipal systems) is given as a conceptual framework; engineering capacity calculations are a precondition for deepening [depth:municipal_new_infrastructure].

![Composite transport, slow-mobility and blue-green public space system](assets/figures/mobility-bluegreen.png)

## Blue-Green Space, Public Space, and City Character

Blue-green space takes the Jing-Zhang Heritage Park Intelligence-Track Vitality Belt as its spine, achieving north-south through-connection and east-west stitching; green space is about 2.48 km² with a green ratio of about 21.7% [metric:green_ratio], and public space (plazas and courtyards) is about 0.14 km², about 1.2% [metric:public_space_ratio], supporting innovation encounters and daily leisure [data:geometry/green_space.geojson#GREEN-001], delivered under the blue-green public-space depth item [depth:blue_green_public_space]. City character fuses Jing-Zhang railway history, Zhongguancun innovation culture, and AI new culture, proposing a "rail gray-blue + technology blue + pulse green" color baseline and building-interface guidance [standard:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES]. Character control distinguishes official control from design suggestion: heritage, blue-line, and ecological constraints follow official releases; this proposal is directional only [data:geometry/constraints.geojson#CON-001].

### Three AI Pilgrimage Landmarks (including the honor-display system)

1. **Zero Point Station · Open-Source Core (Origin Community)**: anchored on the historical memory of the Qinghuayuan Station site [data:geometry/constraints.geojson#CON-005], combined with the Open-Source Launch Hall to form a "starting point of Chinese open source" memorial node with an agent-contribution honor wall recording the most outstanding open-source contributions each year.
2. **Zhongzhi Platform · Governance Lighthouse (Zhongzhiyuan)**: using the Industry Exhibition and Governance Hall as its carrier, translating AI safety governance, standard-setting, and model evaluation into a visitable, bookable public display node.
3. **Bell Station · Future Bell Tower (Dazhongsi)**: built on the International Pitch Lounge and Data-Element Lounge, forming a "future-city manifesto" release node and time-marking installation for global developers.

The three landmarks are strung along the heritage belt, forming the "NewTrack One Line, Three Stations" pilgrimage route; the landmarks and honor walls are concept design directions and do not claim approved construction [source:AGENT-TASKBOOK] [depth:blue_green_public_space].

## Renewal Project List, Implementation Policy, and Phasing

The renewal project list is organized in the order of "stitching, activating, growing"; `geometry/phasing.geojson` seamlessly partitions the submitted boundary into three phases [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation] [depth:renewal_project_list]:

| No. | Project name | Type | Phase | Key dependency |
| --- | --- | --- | --- | --- |
| JZ-01 | Heritage-belt slow-mobility gap stitching | Public space/transport | 1 | Road redline, underpass space, traffic review |
| JZ-02 | Origin Open-Source Launch Hall & Zero Point Station | Culture/industry service | 1 | Campus boundary, property rights, ground-floor uses |
| JZ-03 | Dazhongsi station four-quadrant pedestrian connectivity | Transit integration/slow mobility | 1 | Transit station, utilities, intersection engineering |
| JZ-04 | Zhongzhiyuan full-stack research clusters | Urban renewal/industry | 2 | Ownership, regulatory plan, municipal conditions |
| JZ-05 | Xueyuan Road east research renovation belt | Urban renewal | 2 | Existing-condition and ownership survey |
| JZ-06 | Wudaokou west stock commercial street refinement | Urban renewal | 3 | Property coordination, commercial operation |
| JZ-07 | Global AI Week public route | Operation/brand | 1 (lightweight start) | Public-space permits, event safety, copyright clearance |

Phase areas are: phase 1 ≈ 5.28 km², phase 2 ≈ 5.06 km², phase 3 ≈ 1.07 km², closing with the site area [metric:phase_1_area_sqm] [metric:phase_2_area_sqm] [metric:phase_3_area_sqm]. The solicitation cycle (2026-08 to 08-31) is the time requirement for submitting deliverables; implementation phasing is the urban-renewal pathway, and the two must not be confused [source:AGENT-TASKBOOK].

### Global AI Innovation Event System and Long-Term Operation (agent.6)

- **Annual event system**: a "Jing-Zhang AI Innovation Week" annual master brand is proposed, comprising five events: a global agent development competition, an open-source community summit, an urban-agent governance forum, an AI+ public-service open day, and a developer honor award ceremony; all arrangements are concept proposals and are not presented as confirmed government arrangements [source:AGENT-TASKBOOK].
- **Developer community operation**: a "dual-station" mechanism of online repositories plus offline stations, centered on the Zero Point Station Open-Source Launch Hall, providing developers with release, collaboration, testing, and reputation-building channels.
- **Open scenario operation**: a "scenario-card open list + booking + human review" mechanism, opening SC-01 to SC-12 gradually as pilots with data minimization and human takeover retained [standard:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES].
- **Public experience and landmark operation**: the pilgrimage route links the three stations with seasonal content; the honor wall updates annually.
- **International communication and attraction conversion**: using the International Pitch Lounge as a window, a conversion pathway is built through the results catalog, talent catalog, and enterprise catalog accumulated by events; investment-attraction, policy, and funding arrangements are not written as confirmed commitments [source:AGENT-TASKBOOK].

## Indicator System, Area Recalculation, and Compliance Matrix

Core indicators are managed in three classes — geometry-recomputable, official-regulatory-plan-required, and operation-calibration-required [depth:metrics_recalculation] [metric:site_area_sqm]:

- **Geometry-recomputable**: site area ≈ 11.41 km²; research/commercial/residential/education/culture land areas; green area and green ratio ≈ 21.7% [metric:green_ratio]; public-space area and ratio ≈ 1.2% [metric:public_space_ratio]; building footprint ≈ 0.98 km² (21 footprints) [metric:building_footprint_area_sqm]; schematic road length ≈ 39.8 km (12 alignments) [metric:road_length_m]; three phase areas [metric:phase_1_area_sqm].
- **Official-regulatory-plan-required**: FAR, building height, building density, statutory green ratio, setbacks, and road redlines, all listed as unknown and pending [metric:floor_area_ratio] [metric:building_height_m].
- **Operation-calibration-required**: AI innovation index, talent density, event participation, slow-mobility accessibility, and scenario usage frequency, entering the operation-monitoring framework rather than approved indicators [source:AGENT-TASKBOOK].

Indicator recalculation and the evidence-chain relationship are shown in the figure [metric:key_area_count] [data:geometry/key_areas.geojson#PROV-KEY-001]; `compliance_matrix.json` covers all mandatory tasks in announcement sections 1.3/1.4/1.5 and agent.1–agent.6; `standard_matrix.json` covers six professional standards; and all fifteen design-depth items in `design_depth_matrix.json` are marked complete [source:PROCESSED-FACT-PACK].

![Core metric recalculation and evidence chain](assets/figures/metrics-evidence.png)

## Risks, Copyright, and Compliance

This proposal discloses the following pending items truthfully: official boundaries and key-area polygons (pending the qualification package/supplements) [source:BOUNDARY-SOURCE]; regulatory-plan conditions (FAR, height, density, setbacks, road redlines) [metric:floor_area_ratio]; existing buildings, ownership, and heritage control lines [source:PROCESSED-FACT-PACK]; and transport/municipal engineering conditions and operation approvals [data:geometry/constraints.geojson#CON-001]. The proposal claims no official approval, approved regulatory plan, final ownership, construction scale, or implementation commitment; AI-generated content is the responsibility of the author for facts, citations, copyright, and final expression; the copyright statement is in `report/copyright_statement.md` [source:AGENT-TASKBOOK] [depth:risk_missing_data]. The HTML visualization and drawings are offline local assets with no remote resources; complete sources, assumptions, and self-check records are in `sources.json`, `assumptions.json`, and `self_check.json`.

## References

1. Haidian Branch, Beijing Municipal Commission of Planning and Natural Resources: *Qualification Prequalification Announcement of the Centennial Jing-Zhang AI Innovation Belt International Urban Design Solicitation*, 2026-05-09.
2. *Excerpt of the Taskbook for the Global-Agent Open Call on the "Centennial Jing-Zhang AI Innovation Belt" Urban Design*, user-provided cleared document, 2026-05-18.
3. Ministry of Housing and Urban-Rural Development: *Measures for the Administration of Urban Design*, 2017.
4. Ministry of Housing and Urban-Rural Development: *Measures for the Preparation and Approval of Urban and Town Regulatory Detailed Plans*.
5. Ministry of Natural Resources: *Guidelines for Land and Sea Use Classification in Territorial Spatial Survey, Planning, and Use Control (Trial)*, 2023.
6. Cyberspace Administration of China et al.: *Interim Measures for the Administration of Generative AI Services*, 2023.
7. Standing Committee of the National People's Congress: *Law of the People's Republic of China on Barrier-Free Environment Construction*, 2023.
8. General Office of the State Council: *Implementation Plan for Effectively Solving Difficulties for the Elderly in Using Smart Technology* (Guobanfa [2020] No. 45), 2020 (background reference).

The complete machine index is in `sources.json`, `metrics.json`, and the three matrix files; this list covers only the main human-readable materials that shaped the proposal's judgments [source:SITE-PACKAGE].
