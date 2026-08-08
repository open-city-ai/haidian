---
title: "Centennial Station · Open Source Spine: Jing-Zhang Intelligent Body Co-Creation Corridor Urban Design Concept Proposal"
author_github: "weponusa"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With the overall concept of an \"Open Source Spine,\" translate the century-old Jing-Zhang Railway into a network of knowledge hubs and a co-creation protocol for intelligent entities, constructing a \"One Spine Three Hubs Two Corridors\" spatial structure. Propose a naming system, six intelligent body tasks, 12 AI scenario cards, and four holy sites; all spatial suggestions should be conceptual frameworks for professional teams to further develop."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "ai-health-service-navigation", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v1.0"
---

# Centennial Station · Open Source Spine: Jing-Zhang Intelligent Body Co-Creation Corridor Urban Design Concept Proposal

## Design Basis and Source List

This plan is based on the first task reference, the "Announcement for Qualification Pre-review of International Proposals for Urban Design of the Centennial Jing-Zhang AI Innovation Belt" issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. The plan confirms the project name, three levels of scope, three key areas, design tasks, and the context of the design outcomes. The open call task book excerpt facing intelligent entities supplements the three key positions, five major functions, Three Zones and Two Wings, six intelligent entity tasks, ten co-creation principles, and unified boundary clauses [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. This plan responds to each of them individually.

In terms of machine-readable materials, this plan reads from `brief/site-package/` the `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/planning_limits.json`, `schemas/`, and `standards/`, as the basis for generation, validation, and recalculation [source:SITE-PACKAGE]. The public task book draft `brief/public-brief.md` provides three categories of positioning, development vision, and scheme boundaries, which are also referenced as background information [source:PUBLIC-BRIEF]. The public data registration form `data/source_registry.json` is used to distinguish between formally available, background, temporary, and data that requires review [source:SOURCE-REGISTRY]. `data/processed/agent_fact_pack.md` and its CSV worksheet as the reading navigation layer [source:PROCESSED-FACT-PACK].

The boundary handling follows the following discipline: The warehouse currently does not provide official precise boundaries. This plan adopts the temporary rough boundaries from `brief/site-package/geometry/provisional_boundaries.geojson` (PROV-SITE-001 and three key areas) for generating, visualizing, and self-checking [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [data:geometry/site_boundary.geojson#SITE-001]. This boundary is marked as `official_boundary=false`, `geometry_role=provisional_constraint`, and `boundary_precision=provisional_rough`, and should not be used as an Official Planning Boundary, approval basis, or precise area recalculation basis. The official polygon must be recalculated in its entirety after its release [source:PROVISIONAL-BOUNDARIES-2026] [depth:three_level_scope_framework].

Professional standards are based on the Urban Design Management Measures [standard:MOHURD-URBAN-DESIGN-MEASURES], the Compilation and Approval Measures for Urban and Town Control Detailed Planning [standard:MOHURD-CONTROL-DETAILED-PLANNING], the Guide for Classification of Land Use and Sea Area Use in Territorial Space Investigation, Planning, and Control [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], and the Regulations for the Depth of Preparation of Architectural Engineering Design Documents [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]. Professional expressions are organized and distinguished into three categories of expression levels: "known control conditions, design recommendations, and pending confirmation items." OSM is used only as a background reference and complies with the ODbL attribution requirements [source:OSM-COPYRIGHT]. (Regulatory Detailed Planning)

![Overall Concept of the Proposal and Evidence Chain Organization Diagram](assets/figures/site-overview.png)

## Three-Level Scope Framework

According to the announcement, this project adopts a "Coordinated Research Area—Overall Design Area—Key-Area Detailed Design Area" three-tier progressive framework [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework].

**Coordinated Research Area (approximately 43.6 square kilometers)** covers a wide region from north of the Fifth Ring Road to Xizhimen Street, and from the Jingzhang Expressway to Wanshuihe Road. It undertakes tasks related to industrial strategy, regional coordination, and future city research, addressing the role of the "AI Innovation Belt" in Haidian and even the innovation map of the Beijing-Tianjin-Hebei region. This corresponds to the research on the world-class AI Innovation Ecosystem and the future AI city form [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

**Overall Design Area (approximately 11.4 square kilometers)** is the formal design boundary for this submission. The design boundary is expressed with a temporary rough boundary, SITE-001 [data:geometry/site_boundary.geojson#SITE-001], with a recalculated area of approximately 1,141.3 hectares [metric:site_area_sqm]. This area carries the overall Urban Design tasks for Urban Renewal and in-depth control and planning: Land-Use Layout, building scale, and the demolish–renovate–retain strategy, traffic and transit infrastructure, blue-green Public Spaces, Urban Character, and phased implementation, all supported by layers such as `geometry/land_use.geojson` [data:geometry/land_use.geojson#LU-001], `buildings.geojson`, `roads.geojson`, and `phasing.geojson` [data:geometry/phasing.geojson#PHASE-P1] [depth:overall_spatial_structure]. (Demolish–Renovate–Retain Strategy)

**Key-Area Detailed Design Area** (approximately 369.3 hectares), which includes three key detailed design areas: Zhongzhiyuan AI Independent Innovation Acceleration Area (approximately 192.9 hectares), Beijing AI Origin Community (approximately 104.3 hectares), and Dazhongsi AI Industry Cluster Area (approximately 72.1 hectares) [source:OFFICIAL-ANNOUNCEMENT], this plan expresses the three provisional polygons in `geometry/key_areas.geojson` [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count], and separately develops a readable small plan for "location + spatial structure + building updates + traffic and pedestrian facilities + Public Space + AI scenarios + implementation risks" [depth:three_key_area_detailed_design].

The logic for the placement between the layers is as follows: the industrial strategy determines the functional positioning of the key areas, the overall design provides the framework and general principles, and the key areas are detailed down to discussable building volumes, Public Spaces, and scene placements. Due to the current boundaries being provisional, all area values in this scheme are provisional reference values. After the official polygon is released, they must be recalculated [source:PROVISIONAL-BOUNDARIES-2026] [depth:metrics_recalculation].

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Overall Concept, Naming System, and Visual Identity Direction

This proposal introduces an overall concept of **"Open Source Spine"** : redefine the century-old Jing-Zhang Railway from a "transport line" to a "network and protocol for knowledge exchange and co-creation by intelligent agents" — the railway right-of-way is a physical spine, the open-source community is a set of collaborative protocols, and intelligent agents are new public participants. All three share the same logic: **mainline connectivity, station handover, and protocol convergence**.

Main Name: **Century Relay** (English: Century Relay, abbreviated CR; Subtitle: Open Spine / Open Source Spine). "Yi" (station) carries three layers of meaning: railway station (historical), knowledge relay (present), and intelligent body handover (future), aligning with the "Century Jing-Zhang Cultural Belt, Urban AI Life Experience Belt, and AI Fusion Innovation Belt" as its three key positioning [source:AGENT-TASKBOOK]. The naming system follows the "one spine, three relays, two corridors" framework:

- **One Spine**: Open Source Spine (Site Park Vitality Belt, Main Marker)
- **Three Stops**: Zhongzhiyuan Stop (Acceleration Zone), AI Origin Stop (AI Origin Community), Dazhongsi Stop (Industrial Agglomeration Zone)
- **Two Corridors**: Zhongguancun Science and Technology Service Corridor (Elements and Capital), Xiaoyuehe Scene Empowerment Corridor (Scene and Life)

Logo Direction: The logo is composed of dual tracks translating into the "Track—Data Track" graphic, with platforms symbolized as open nodes (fork symbol), and waystations representing contribution record units. The main colors are derived from the rust red of the Jing-Zhang Railway, the navy blue of Haidian, and the open-source leaf green, reflecting the visual theme of "tracks as the backbone, open-source as the protocol, and waystations as the handover points" [depth:overall_spatial_structure] [depth:retain_renovate_demolish]. The logo is a conceptual direction draft, and the fonts, graphics, and color schemes require further professional design and copyright verification. It does not constitute any authorization for the use of existing trademarks or fonts [source:AGENT-TASKBOOK].

### Five Functional Areas and the Three Zones and Two Wings Synergistic Loop

In response to the task book's "Full-Stack Independent AI Innovation System, World-Class AI Innovation Ecosystem, AI-Enabled Scenario Empowerment New Paradigm, Intelligent AI Vital City, and AI Governance Global Discourse" five functional areas [source:AGENT-TASKBOOK], this plan establishes a coordinated loop: **Zhongzhiyuan Yì produces autonomous technology foundations → Yuányuán Yì completes open-source co-creation and talent organization → Dazhongsi Yì transforms capabilities into consumable industrial and living scenarios → Zhongguancun Service Corridor provides computing power, capital, data, and global elements → Xiayuhe Scenario Corridor releases AI capabilities into citizen-perceivable public services → feedback signals travel along the open-source spine back to the original point to form an iterative loop**. The loop is represented on the map as a "I-shaped + circular feedback" network with a north-south main spine and two east-west corridors [depth:overall_spatial_structure].

### Global AI Innovation Ecosystem Case Studies (7 cases)

This scheme extracts 7 global cases that can be translated into mechanisms for Haidian, all of which are presented as background studies and do not constitute an implementation commitment to the case companies or parks.

1. **Silicon Valley/Stanford Research Park**: The university—venture capital—company triangle structure, transformed into the origin mechanism of the "Tsinghua—University of Science and Technology Beijing—University of Posts and Telecommunications Scientific Research Alliance + Haidian Venture Capital Network" [source:AGENT-TASKBOOK].
2. **United States Boston Kendall Square**: The density of life sciences + AI has been transformed into the layout logic of Zhongzhiyuan Yi "concentrated research and development land use, shared public services, and adjacent laboratories" [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout].
3. **King's Cross, London, UK**: Revitalization of a railway heritage site + knowledge economy, transforming it into a central segment that leverages a site park to stitch together the eastern and western districts, aligning with the Open Spine strategy [depth:blue_green_public_space].
4. **Singapore One-North**: testbed public platform, transformed into the concept of the "Dazhongsi Yì AI Testing Validation Corridor + Public Data Sandbox" [depth:traffic_rail_slow_parking].
5. **France Paris Station F**: Single giant accelerator + open activity public layer, transformed into a showcase corridor and activity node system of open-source outcomes along the open-source spine [depth:renewal_project_list].
6. **Lessons from Sidewalk / Quayside in Toronto, Canada**: Emphasize public data governance and public consent, translating into a hard constraint in this scheme that "scenario cards must include Human Review and privacy boundaries" [source:AGENT-TASKBOOK].
7. **China Hangzhou Yunti Town**: Exhibition + developer community + industrial ecosystem integrated operation, transformed into an annual operational model of "Jing-Zhang AI Innovation Week + developer community + industrial attraction" [depth:phasing_implementation].

The convertibility of the above case illustrates: Haidian's core difference is not replicating a specific park, but rather overlaying the linear narrative of railway heritage, the density of university research and development, the global collaboration of open-source communities, and intelligent entities as formal participants into an irreplicable "open-source backbone" asset [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Future AI City Form Research

Facing the new quality of productivity brought by AI, this proposal puts forward three types of new spatial forms (all as Conceptual Recommendations): **Protocol-Type Public Space** (integrating development interfaces, data sandboxes, and test fields as public goods into parks and squares), **Waystation-Type Neighborhoods** (each key area organized around a public layer with "reception—transfer—departure"), and **Perceptive Infrastructure** (overlaying environmental sensing and edge computing capabilities on Walking and Cycling Networks, streetlights, and greenways). These forms do not predefine specific engineering details but serve as directional guidelines for overall design. The specific implementation must be refined by professional teams in conjunction with control plans and engineering conditions [depth:development_intensity_controls] [depth:municipal_new_infrastructure].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Spatial Structure: One Ridge, Three Stations, Two Corridors

Overall design is centered around the **Jing-Zhang Heritage Park Vitality Belt** (open-source spine), running north-south; three key zones serve as three functional hubs; the Zhongguancun Science and Technology Service Corridor and Xiao Yuehe Scene Empowerment Corridor form the east-west two corridors [source:OFFICIAL-ANNOUNCEMENT] [depth:overall_spatial_structure]. The design geometrically reflects as: a central green vein in a continuous band (`geometry/green_space.geojson`, recalculated green space area of approximately 416.9 hectares, green space ratio of about 36.5% [metric:green_ratio] [data:geometry/green_space.geojson#GRN-001]), vertical roads supporting north-south connections, horizontal connecting roads weaving the network (`geometry/roads.geojson`, recalculated road network length of approximately 38.2 kilometers [metric:road_network_length_m] [data:geometry/roads.geojson#RD-001]).

### Land-Use Layout and Proportion to Industrial Functions

The land use was organized according to the coding in the Standard for Classification of Land Use and Sea Area Use in Territorial Space Investigation, Planning, and Control [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], with the geometry defined in `geometry/land_use.geojson` achieving full coverage of the Provisional Boundary without gaps or overlaps [data:geometry/land_use.geojson#LU-001] [metric:land_use_coverage_ratio], comprising 17 partition units that cover land use types such as research and development, commercial, residential, educational, cultural, sports, green spaces, and blank spaces. Design intent: Research and development land use (0802) is concentrated along Zhongzhiyuan and the northern segment, forming a knowledge production pole; commercial and service land use (05) forms a consumption and scenario pole along Dazhongsi and the central southern segment; green spaces (1401) are continuous along the open source spine; and blank spaces (16) serve as test sites and provide long-term flexibility [depth:land_use_layout].

Need to be noted: the current land use, ownership, and conditions of the already approved control plan were not provided with the public materials. The land zoning in this scheme is a conceptual proposal, and any area, ratio, and conclusions of the demolish–renovate–retain strategy must be recalculated after confirmation by the official control plan and current surveying data, and must not be regarded as legal references [source:PROVISIONAL-BOUNDARIES-2026] [depth:existing_conditions_diagnosis] [metric:floor_area_ratio]. (Demolish–Renovate–Retain Strategy)

### Urban Renewal Overall Framework and Demolish–Renovate–Retain Strategy Logic

The overall update framework follows the "**preserve as primary, renovate and enhance, prudently construct, and leave blank with flexibility**" four categories of operations [depth:retain_renovate_demolish]. The Building Footprint `geometry/buildings.geojson` includes 35 conceptual buildings, with a recalculated gross floor area of approximately 53.4 million square meters [metric:building_footprint_area_sqm] [data:geometry/buildings.geojson#BLD-0001]. Among these, the current universities, mature communities, and historical remnants are primarily preserved with functional replacement, while in the key areas, new industrial spaces are developed through a combination of existing updates and localized new construction. The specific demolish–renovate–retain strategy is expressed on a parcel-by-parcel basis in `geometry/phasing.geojson` [data:geometry/phasing.geojson#PHASE-P2] [depth:renewal_project_list]. (Demolish–Renovate–Retain Strategy) The proposal clearly does not pre-set the Floor Area Ratio or Building Height and other statutory indicators, with related control conditions listed as pending items [metric:building_height_m] [depth:development_intensity_controls].

### Industrial Objectives, Functional Layout, and Innovation Indicator System

The industrial goals focus on "full-stack autonomous technology foundation + open-source co-creation ecosystem + scenario-based industrial export," which spatially translates into the functional division of Sanyi and the two corridors as support. The innovative indicator system is detailed in the "Indicator System, Area Recalculation, and Standardized Array" chapter. The text elaborates on how the industrial intentions are materialized in calculable spaces through metrics such as [metric:ai_scenario_node_count] and [metric:renewal_project_count] [source:OFFICIAL-ANNOUNCEMENT] [depth:metrics_recalculation].

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

## Detailed Design of Key Areas

### Zhongzhiyuan Station: AI Autonomous Innovation Acceleration Zone (approximately 192.9 hectares, provisional)

**Location**: The "Acceleration Station" of the Full-Stack Independent AI Innovation System —— geared towards engineering acceleration for basic models, chips, frameworks, and edge-side computing power [source:AGENT-TASKBOOK].

**Spatial Structure**: Research and development land is the absolute subject, with the central square bearing public activities [data:geometry/public_space.geojson#PLZ-004]. The open-source spine greenway's northern segment runs through [data:geometry/green_space.geojson#GRN-001]. Low-speed robot delivery loops and station-city connection points are laid out in the core area [data:geometry/roads.geojson#RD-014] [data:geometry/constraints.geojson#SN-010].

**Building Update**: It is suggested to focus on three types of building categories, namely research buildings, pilot laboratories, and talent apartments (refer to `geometry/buildings.geojson`). Retain the existing research institutions, and new constructions should primarily rely on updating with existing land plots. The specific demolition–renovate–retain strategy will be determined after the ownership and control plan are confirmed [depth:retain_renovate_demolish]. (Demolish–Renovate–Retain Strategy)

**AI Scenario**: AI+Healthcare Testing and Validation Scenario (SN-011), Zhongzhiyuan Low-Speed Robot Delivery Loop (SN-010), AI+Transportation Slow Travel Assessment [depth:three_key_area_detailed_design].

**Implementation Risks**: Traffic accessibility along the Fifth Ring Road North, municipal bearing for large research facilities, and coordination with the current unit ownership are pending confirmation [depth:risk_missing_data].

### Origin Stop: Beijing AI Origin Community (approximately 104.3 hectares, provisional)

**Location**: The "Innovation Hub" of the world-class AI Innovation Ecosystem—the original point with the highest density of open-source communities, early-stage teams, and talent [source:AGENT-TASKBOOK].

**Spatial Structure**: Relying on the site of the Old Tsinghua Garden Station and its protection area [data:geometry/constraints.geojson#CON-HER-001], form a structure of "Origin Memorial Square + Community Center Square + Research and Cultural District"; the Tsinghua Garden Station Plaza (PLZ-002) and the Origin Community Center Square (PLZ-003) constitute a dual-square narrative [data:geometry/public_space.geojson#PLZ-002]; cultural land use (0803) accommodates the Origin Museum and Open Source Cultural Space [data:geometry/land_use.geojson#LU-009].

**Building Renovation**: Focus on research, culture, community services, and residential areas for talent. Emphasize small blocks, dense road networks, and pedestrian-friendly environments, while preserving universities and historical building clusters [depth:three_key_area_detailed_design] [depth:traffic_rail_slow_parking].

**AI Scenario**: AI Origin Monument (SN-006), Health Navigation Station (SN-007), Track Transfer Slow Travel Transfer Point (SN-008) [data:geometry/constraints.geojson#SN-006].

**Implementation Risks**: The constraints of the cultural heritage protection construction control zone, the boundaries of university property rights, and public participation in community renewal must be addressed with specialized depth [depth:risk_missing_data].

### Dazhongsi Station: AI Industry Agglomeration Zone (approximately 72.1 hectares, provisional)

**Location**: The "Application Hub" for Intelligent Natively Generated New Business Models — converting AI capabilities into consumable industrial, commercial, and testing scenarios [source:AGENT-TASKBOOK].

**Spatial Structure**: Commercial and service land uses are concentrated in layout. The Dazhongsi Hub Square (PLZ-001) serves as an anchor point for station-city integration [data:geometry/public_space.geojson#PLZ-001]. The AI test validation corridor connects transportation and commercial nodes (SN-001, SN-003) [data:geometry/constraints.geojson#SN-001]. The Dazhongsi commercial cluster land uses and reserved flexible land uses serve as interfaces for the test scenario [data:geometry/land_use.geojson#LU-001] [data:geometry/land_use.geojson#LU-008].

**Building Update**: Focus on commercial, mixed-use, and transit-oriented development, leveraging existing commercial facilities for upgrades to avoid large-scale demolition and reconstruction [depth:retain_renovate_demolish].

**AI Scenarios**: Smart Hub Test Site (SN-001), Smart Native Business Living Room (SN-002), Public Safety Activity Operations Review (SN-003), Enterprise Services Copilot Kiosk [data:geometry/constraints.geojson#SN-002].

**Implementation Risks**: Transit-Station Integration involves engineering conditions, coordination with existing commercial operations, and public safety approvals for test scenarios, all of which are listed as pending confirmation [depth:risk_missing_data].

Three key areas shall follow the same approach: all spatial suggestions should be conceptual and directional in nature, to be refined by a professional team once the official polygons, control plans, and engineering conditions are confirmed [source:PROVISIONAL-BOUNDARIES-2026] [depth:three_key_area_detailed_design].

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### AI Innovation Ecosystem Map

This proposal constructs an "**baselayer—engineering layer—application layer—service layer—governance layer**" five-layer ecological spectrum: the baselayer consists of research institutes and universities; the engineering layer comprises the full-stack autonomous system of Zhongzhiyuan (including chips, frameworks, models, and edge computing power); the application layer includes Dazhongsi and life scenarios (healthcare, education, commerce, transportation, public services); the service layer encompasses the Zhongguancun Science and Technology Service Corridor (computing vouchers, data sandboxes, funds, intellectual property rights, and global talent services); the governance layer involves the governance of city agents and global AI governance authority (open-source governance, standards, ethical review) [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]. Each layer is mapped to spatial nodes and scenario nodes [data:geometry/constraints.geojson#SN-009]. (Urban Agent)

### User Profiles (6 categories)

1. **AI Entrepreneurs/Early Teams**: Pursue low-cost trial and error, funding, and community networks at Anchor Point Station.
2. **Developers/Open Source Contributors**: Pursue open spaces, activity density, and remote collaboration facilities, anchoring along the open-source spine line.
3. **AI Company Employees**: Pursue a work-life balance, high-quality Public Spaces, and commuting efficiency, distributed across three stations.
4. **College Students/Researchers/Research Staff**: Pursue laboratory adjacency, academic exchange, and technology transfer, anchoring in university corridors.
5. **Neighboring Residents**: Seek convenience in public services and a green lifestyle, covering the residential clusters.
6. **Visitors/International Guests**: Seek cultural experiences and AI landmarks by exploring along the Open Source Spine and the Three Yards.

Each class of profile corresponds to a scenario-space-operation mapping as shown in the table and in `geometry/constraints.geojson` [data:geometry/constraints.geojson#SN-004].

### AI Scenario Card (12 cards, including 3 industrial Testing and Validation Scenario cards)

| ID | Scenario | Service Object | Placement Node | Data and Privacy Boundaries | Human Review |
|---|---|---|---|---|---|
| S01 | AI+Transport Slow Travel Assessment | Commuters/Residents | SN-001 | Using Public Transportation and Aggregated Sensor Data Only | Transportation Department Review |
| S02 | AI+ Healthcare Service Navigation | Residents/Elders | SN-007 | Does Not Collect Personal Medical Records, Only Guides | Medical Institutions Review |
| S03 | AI+ Cultural Tour Digital Kiosk | Visitors/Public | SN-004 | Public Cultural Information | Review of Cultural Heritage Sites |
| S04 | Enterprise Service Copilot Station | Enterprise/Entrepreneur | SN-009 | Enterprise Autonomous Selection of Data Boundaries | Enterprise Authorization |
| S05 | Public Safety Activity Operations Review | Operator/Public | SN-003 | Anonymized Activity Crowd Aggregation | Police/Operator Review |
| S06 | Low-Speed Delivery by Robots | Residents/Merchants | SN-010 | Only Anonymized Delivery Route Data | Review by Transportation/Operational Authorities |
| S07 | AI+ Education Open Classroom | Students/Developers | SN-005 | Anonymization of Learning Behavior Data | Educational Institution Review |
| S08 | AI+Commercial Intelligence Living Room | Consumers | SN-002 | Consumer Consent Form | Business Operations Review |
| S09 | Honor Wall for AI Contributions | Developer | SN-012 | Public Contribution Metadata Only | Community Autonomous Review |
| S10 | Track Transfer for Slow Mobility | Commuters | SN-008 | No Individual Trajectory Collection | Traffic Department Review |
| S11 | **Testing and Validation Scenario A: Dazhongsi AI Testing and Validation Corridor** | Enterprise/Developer | SN-001 | Public Data Sandbox, Desensitized and Compliant | Professional Institution Review |
| S12 | **Testing and Validation Scenario B: AI+Healthcare Testing and Validation** | Enterprise/Hospital | SN-011 | Prioritize Synthetic Data, Privacy Compliance Review | Medical Ethics Review |
| S13 | **Testing and Validation Scenario C: Public Safety Activity Review** | Operator/Government | SN-003/SN-005 | Anonymous Aggregation, Minimized Collection | Dual Human Review |

The above scenario cards cover the "at least 10 AI scenario cards and 3 industrial Testing and Validation Scenarios" required by the announcement and task book [source:AGENT-TASKBOOK] [depth:renewal_project_list]. All scenarios are conceptual designs: no specific suppliers are pre-set, no testing scenarios are written as approved operations, no personal privacy data is collected, and a Human Review step is included [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The scenario nodes are already expressed in `geometry/constraints.geojson` [data:geometry/constraints.geojson#SN-003] [metric:ai_scenario_node_count].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

### Land Use Structure

The 17 partition units in `geometry/land_use.geojson` constitute the overall land use structure: research and development land is distributed in clusters in Zhongzhiyuan and the northern segment; commercial and service land use is concentrated in Dazhongsi and the central southern segment; residential land use is laid out along the western side and around the peripheral clusters; educational land use is anchored by the existing university corridor; cultural land use is anchored at the original point station; sports land use is located in the northern portal; green spaces are arranged along the open source spine in a belt; and blank land use accommodates test sites and flexibility [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]. The land use zoning covers the Provisional Boundary with a 100% rate [metric:land_use_coverage_ratio], with no gaps or overlaps [depth:metrics_recalculation].

### Building Scale and Form

`geometry/buildings.geojson` provides data for 35 conceptual Building Footprints (totaling approximately 53.4 million square meters [metric:building_footprint_area_sqm]), covering types such as AI research and development, laboratories, incubators, offices, mixed-use, educational and research support, residential, talent apartments, community services, commercial services, and cultural and transportation facilities [data:geometry/buildings.geojson#BLD-0001]. The suggested building form: the research area should be composed of mid- to high-rise towers and podiums, the commercial area should be a block-style mixed-use complex, and the residential area should be dominated by multi-story buildings, forming an overall skyline direction of "north high, south low, cluster of stations, and open green spine"; the Building Height and Floor Area Ratio are pending confirmation, and this plan does not provide numerical values [metric:building_height_m] [metric:floor_area_ratio] [depth:height_massing_character].

### Preserve–Renovate–Retain Framework (Demolish–Renovate–Retain Strategy)

The "demolish–renovate–retain" strategy is expressed in four categories in the main text and `geometry/phasing.geojson`: retain the current state of universities, mature communities, historical remnants, and large research institutions; renovate and enhance the facades and Public Spaces of old buildings; redevelop inefficient industrial spaces into AI innovation carriers; and build new developments in vacant lands and key area increment sites [data:geometry/phasing.geojson#PHASE-P1] [depth:retain_renovate_demolish]. The plan is clear: the specific conclusions for each parcel's "demolish–renovate–retain" must be based on ownership surveys, current site measurements, and approved control plans, and this plan does not constitute any conclusions for demolition or reconstruction at the parcel level [source:AGENT-TASKBOOK] [depth:risk_missing_data]. (Demolish–Renovate–Retain Strategy)

## Transport, Rail, Municipal Infrastructure, and Public Services

### Transportation and Active Transportation

Traffic strategies are organized around the principles of "**station-city integration, prioritize pedestrian and cycling, and open spine through connection**" [depth:traffic_rail_slow_parking]. `geometry/roads.geojson` provides 15 conceptual road centerlines (recalculated to be approximately 38.2 kilometers [metric:road_network_length_m]): the open spine slow-moving main axis supports north-south connectivity; service secondary roads and multiple connecting lateral roads integrate the area; three rail station connection lines link the Dazhongsi, Origin Point, and Zhongzhiyuan rail nodes [data:geometry/roads.geojson#RD-001] [data:geometry/roads.geojson#RD-007].

Open-Source Spine Slow-Travel Axis (RD-001) as a slow-travel axis, the width and cross-section are pending for engineering refinement; it is suggested that it be primarily pedestrian and cyclist friendly, with waystations and scenario nodes along the route [data:geometry/constraints.geojson#SN-005]. In terms of integrated rail development, it is recommended that all three key areas focus on a station-city integration concept study around the existing rail stations, with specific alignments, entrances, and engineering feasibility to be refined by a professional team based on rail and municipal data [source:AGENT-TASKBOOK].

### Municipal and New Infrastructure

The municipal strategy emphasizes the **integration of traditional infrastructure + New Infrastructure** [depth:municipal_new_infrastructure]: distributed energy, edge computing, and sensing facilities are suggested to be integrated with streetlights, manhole covers, greenways, and other urban furniture. Data sandboxes and test fields are proposed as new public goods entering parks and squares. The 5G/edge computing network is to be laid along the open-source backbone lines. All municipal capacities, pipelines, and energy loads are pending confirmation and need to be calculated by a professional team based on current pipeline and load data [depth:risk_missing_data].

### public service facilities

Public services are configured in a three-tier system: city-level facilities anchor at Three Yee (Original Point Museum, Test Validation Corridor, Innovation Service Platform); district-level facilities are arranged along the Open Spine (talent apartments, community centers, health stations); and community-level facilities are embedded within residential clusters [depth:renewal_project_list]. Talent living services emphasize the "15-minute AI Talent Living Circle" concept: commuting, socializing, health, education, and commerce are all within walking distance [depth:traffic_rail_slow_parking].

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

### Open-source Green Spine and Blue-Green System

`geometry/green_space.geojson` expresses a continuous green belt along the site park (recalculated green space area of approximately 416.9 hectares [metric:green_space_area_sqm] and a green space ratio of about 36.5% [metric:green_ratio]), forming part of the "Green Spine + Blue Corridor" blue-green backbone with the small Yue River water system indication line (`geometry/constraints.geojson#CON-WTR-001`) [data:geometry/green_space.geojson#GRN-001] [data:geometry/constraints.geojson#CON-WTR-001]. Design strategy: **Green Spine Permeation** (north-south continuity without interruption), **Blue Corridor Integration** (connecting green spaces and pedestrian paths along the small Yue River), and **Estate Penetration** (green spaces extending into the internal areas of the estate) [depth:blue_green_public_space].

### Public Space and AI Public Goods

`geometry/public_space.geojson` provides six conceptual plazas: Dazhongsi Hub Plaza, Tsinghua Yuan Station Plaza, AI Origin Community Center Plaza, Zhongzhiyuan Central Plaza, North Gateway Waystation Plaza, and Developer Walkway Node [data:geometry/public_space.geojson#PLZ-001], recalculating the public space area to approximately 153.8 hectares [metric:public_space_area_sqm] and the public space ratio to approximately 13.5% [metric:public_space_ratio]. The AI Public Space Component Library (Concept): Open Source Results Gallery, Code Grid Paving, Data Sandbox Pavilion, Intelligent Agent Contribution Honor Wall, AI Milestone Landmark, and Interactive Greenway Signage [depth:blue_green_public_space] [depth:renewal_project_list].

### AI Pilgrimage Landmarks (4)

1. **Qinghua Yuan Station · AI Origin Monument** (SN-006): Establish an origin memorial space outside the boundary of the former Qinghua Yuan railway station to commemorate the intersection of China's autonomous railway development and the emergence of the new AI culture [data:geometry/constraints.geojson#SN-006] [data:geometry/constraints.geojson#CON-HER-001].
2. **Developer Walkway · Open Source Results Showcase Corridor** (SN-005): Set up long-term display nodes for open source project achievements along the midsection of the open source spine [data:geometry/constraints.geojson#SN-005].
3. **Honors Wall for Agent Contributions** (SN-012): Establish an honor display system at the North Portal to record the contributions of open-source contributors and agent contributions [data:geometry/constraints.geojson#SN-012].
4. **AI Milestone Timeline Nodes** (SN-012 Composite Node): Install an annual AI milestone device next to the Honor Wall of the North Gateway, forming an updateable "timeline landmark."

All of the landmarks mentioned are conceptual designs and do not preclude specific physical forms or scales. They do not occupy the conservation construction control zone. Visual and interactive forms must be confirmed by a professional team in collaboration with conservation and horticulture departments [source:AGENT-TASKBOOK] [depth:risk_missing_data].

### Urban Character

The Urban Design has a thematic tone of "**Translation of Tracks and Protocols**": with the primary color palette of rust red (history), dark blue (technology), and open-source leaf green (co-creation); the architectural style is suggested to respect the existing fabric of universities and historical street patterns, with a focus on modern simplicity and transparency in technical details; the green spine along the control interface should maintain continuity and openness [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:height_massing_character]. Specific height, massing, and stylistic controls must be based on the control plan and urban design guidelines; this proposal only outlines the direction [depth:development_intensity_controls].

## Renewal Projects, Implementation Policy, and Phasing

### Update Project List (18 Concept Projects)

This proposal presents 18 concept renewal projects, categorized as follows: heritage park revitalization (4 items), industrial carrier renewal (5 items), integrated station-city development (3 items), Public Space and greenway (3 items), AI scenarios and test facilities (3 items), corresponding to [metric:renewal_project_count]. The project list is based on the three-phase spaces in `geometry/phasing.geojson` and the scenario nodes in `geometry/constraints.geojson` [data:geometry/phasing.geojson#PHASE-P1] [depth:renewal_project_list].

Representative projects include: Open Source Spine Greenway Integration Project, Original Point Memorial Space at Tsinghua Yuan Station, Zhongzhiyuan Central Square and Research Cluster Update, Dazhongsi Test Validation Corridor, Developer Walkway Showcase Corridor, Intelligent Body Contribution Honor Wall, Three Station Town Integration Concept Study, Talent Apartments and Community Service Supplement Points, Xiao Yuehe Blue Corridor Patchwork, Public Data Sandbox Kiosks, Low-Speed Robot Delivery Loop Pilot, Enterprise Service Copilot Kiosk, Health Navigation Station, Cultural Tour Digital Kiosk, AI Innovation Week Infrastructure, North Gateway Station Plaza, South Gateway Application Demonstration Street, and Flexible Land Use Management Mechanism.

### Implementation Entity and Participation Mechanism (Concept)

The proposal suggests the collaborative advancement by three categories of implementation subjects: **government and planning departments** (overall coordination, planning and approval alignment, open access to public data), **professional teams and operational entities** (deepening Urban Design, engineering implementation, scenario and event operations), and **diverse stakeholders** (universities, enterprises, developer communities, residents, smart body contributors, and the public). Participation mechanisms are recommended to include annual public opinion consultations, co-creation by developer communities, recruitment of scenario pilot enterprises, and community advisory boards, all of which are conceptual design mechanisms. The specific subject arrangements and responsibility divisions must be confirmed by the organizing institution and relevant government departments [source:AGENT-TASKBOOK] [depth:phasing_implementation].

**Implementation Evaluation Criteria (Concept)**: In the short term (P1), the focus will be on the number of scenario nodes, the area of Public Space improvements, and public satisfaction; in the medium term (P2), the focus will be on the number of community renewal projects and the activity level of developer communities; in the long term (P3), the focus will be on the proportion of research and innovation carriers built, the number of enterprises that have moved in, and the open-source output indicators. These indicators are conceptual monitoring frameworks, and the formal evaluation criteria must be determined by the organizing body and professional teams [depth:phasing_implementation] [metric:renewal_project_count] [metric:ai_scenario_node_count].

### Implement Policy Recommendations (Concept)

Policy recommendations focus on four categories of tools: **spatial flexibility** (buffer zones and convertible uses), **elemental assurance** (computing vouchers, data sandboxes, talent housing), **Scenario Access** (public data openness and test site admission), and **governance coordination** (honors for intelligent body contributions and open-source governance). All policies are merely suggested directions and do not constitute government commitments, business attraction arrangements, or funding allocations [source:AGENT-TASKBOOK] [depth:phasing_implementation].

### Phased Plan

- **Recent Phase (P1, South)**: Develop the southern portal and integrate Dazhongsi — prioritize creating perceivable AI scenarios and Public Spaces to rapidly form a "Application Hub" demonstration [data:geometry/phasing.geojson#PHASE-P1].
- **Mid-term (P2, Mid-phase)**: Mid-segment of the Origin Hub and Open Spine — commemoration of the Origin, Open Display Corridor, community renewal [data:geometry/phasing.geojson#PHASE-P2].
- **Long-term (P3, Northern Area)**: Zhongzhiyuan Full-stack Innovation Hub —— complete formation of research and development carriers and testing and validation systems [data:geometry/phasing.geojson#PHASE-P3] [metric:phasing_zone_count].

### Global AI Innovation Ecosystem and Long-Term Operations (agent.6)

In response to Task Six of the task book [source:AGENT-TASKBOOK], this proposal puts forward: **Annual Activity System** (Jing-Zhang AI Innovation Week, Open Source Hackathon, Developer Conference, AI Governance Forum, Results Release Season), **Activity Brand and Communication System** (Open Source Spine VI Extension, Annual Theme Color, Bilingual Communication), **Developer Community Operations** (Dual-track Online Collaboration and Offline Hub, Honor Wall and Milestone Contribution Records), **Scenario Access Operations** (Appointment System for Test Sites, Public Data Sandbox, Enterprise Service Hub), **Public Experience Route** (Open Source Spine One-Day Tour: Origin Monument → Exhibition Corridor → Business Lounge → Test Corridor), **International Communication and Attraction Conversion** (Using Open Source Achievements and Competitions as a Catalyst, Establishing a Funnel from Community Participation to Corporate Implementation). All activities and operational arrangements are Conceptual Recommendations, not pre-setting government funding, timelines, or performance commitments [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:phasing_implementation].

## Metrics, Area Recalculation, and Compliance Matrix

### Indicator Framework

The core indicator system of this plan (all calculable from `geometry/*.geojson` and `metrics.json`):

| Indicator | Recalculated Value | Formula | Data File |
|---|---|---|---|
| Overall Design Area | Approximately 1,141.3 hectares | EPSG:4548 Polygon Area | site_boundary.geojson [metric:site_area_sqm] |
| Land Coverage Ratio | 100% | Union of Land Use Areas/Boundary Area | land_use.geojson [metric:land_use_coverage_ratio] |
| Green Space Ratio | Approximately 36.5% | Green Space Area / Boundary Area | green_space.geojson [metric:green_ratio] |
| Public Space Rate | Approximately 13.5% | Square Area/Border Area | public_space.geojson [metric:public_space_ratio] |
| Building Footprint Area | Approximately 53.4 hectares | Aggregate Base Area | buildings.geojson [metric:building_footprint_area_sqm] |
| Road Network Length | Approximately 38.2 kilometers | Line Element Length and | roads.geojson [metric:road_network_length_m] |
| Number of Key Areas | 3 | Count | key_areas.geojson [metric:key_area_count] |
| Number of Phasing Zones | 3 | Count | phasing.geojson [metric:phasing_zone_count] |
| AI Scenario Node | 12 | Count | constraints.geojson [metric:ai_scenario_node_count] |
| AI Sacred Landmark | 4 | Count | constraints.geojson [metric:ai_landmark_count] |
| Concept Update Project | 18 | Count | proposal.md [metric:renewal_project_count] |

Floor Area Ratio, Building Height, and other statutory indicators are in an unknown state, with the reasons and pending conditions as seen in [metric:floor_area_ratio] [metric:building_height_m] [depth:development_intensity_controls].

### Area Recalculation and Conformal Matrix

Area recalculation was unified under EPSG:4548, corresponding one-to-one with the pending items in `data/processed/missing_data_checklist.csv` [depth:metrics_recalculation]; the `compliance_matrix.json` covers all tasks from announcement 1.3/1.4/1.5 and the six tasks from agent.1-agent.6; the `standard_matrix.json` covers mandatory professional standards; and the `design_depth_matrix.json` covers all formal design depth items [depth:risk_missing_data]. Each item in the compliance matrix constitutes an Evidence Chain [source:OFFICIAL-ANNOUNCEMENT] with the article sections, geometric layers, indicators, drawings, visualization sections, and sources.

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

### Materials and Copyright Boundaries

This plan uses only the data registered as officially available, cleared, or provisional in `data/source_registry.json` [source:SOURCE-REGISTRY]; no unauthorized maps, undisclosed data, personal privacy data, or unauthorized trademarks/fonts/images/avatars are used. The logo and visual direction are concept drafts, and the referenced fonts, graphics, and case company names do not constitute authorized use; formal use must complete copyright and trademark verification [source:AGENT-TASKBOOK].

### Conceptual Recommendation Attribute Declaration

In accordance with the unified boundary terms of the task book [source:AGENT-TASKBOOK], this scheme includes all spatial arrangements, activity operations, policy, and brand suggestions as **Conceptual Recommendations or reference schemes** for further professional development. It does not replace formal planning, does not constitute the government's approval conclusion, and does not involve adjustments to the control detailed plan, Floor Area Ratio, Building Height, road red lines, engineering feasibility, investment estimates, development sequence, or approval judgments [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:risk_missing_data].

### List of Missing Materials

- Official precise redlines and three key area official polygons (currently provisional, to be recalculated in full upon publication) [source:PROVISIONAL-BOUNDARIES-2026].
- The Floor Area Ratio, height, density, green space ratio, and setback conditions [metric:floor_area_ratio] as approved in the existing control plan.
- Existing buildings, ownership, utility lines, rail line positions, and engineering conditions.
- Precise boundaries of the cultural heritage protection area and the construction control zone.

### AI-generated Responsibility

This proposal was generated by the AI agent (Cursor Grok 4.5), with the author and contributors (GitHub: weponusa) responsible for the facts, citations, copyright, and final expression; all citations are recorded in `sources.json`, assumptions are assumed to be registered in `assumptions.json`, and the self-check results are found in `self_check.json` [depth:risk_missing_data].

## References

1. Beijing Municipal Commission of Planning and Natural Resources Haidian Branch: Qualification Pre-Review Announcement for International Urban Design Proposals for the Centennial Jing-Zhang AI Innovation Belt (2026-05-09) [source:OFFICIAL-ANNOUNCEMENT]
2. The following text is an excerpt from the task book for the "Centennial Jing-Zhang AI Innovation Belt Urban Design Open Call" (users provide clear rights documentation, May 18, 2026) [source:AGENT-TASKBOOK] (Centennial Jing-Zhang AI Innovation Belt Open Call for Urban Design)
3. Beijing Municipal Science and Technology Commission, Beijing Zhongguancun Science and Technology Park Management Committee: "Three Zones and Two Wings in Building a World-Class AI Agglomeration Area" (2026-04-03)
4. Ministry of Housing and Urban-Rural Development:《 Urban Design management measures 》(2017)[standard:MOHURD-URBAN-DESIGN-MEASURES]
5. Ministry of Housing and Urban-Rural Development:《 cities, towns control detailed planning preparation and approval method 》[standard:MOHURD-CONTROL-DETAILED-PLANNING] Regulatory Detailed Planning
6. Ministry of Natural Resources: Land and Sea Use Classification Guide for Territorial Space Investigation, Planning, and Control (2023-11-22) [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
7. warehouse brief/site-package, brief/public-brief.md, data/source_registry.json, data/processed/processed-fact-pack [source:SITE-PACKAGE] [source:PUBLIC-BRIEF] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]
8. Provisional Rough Boundaries provisional_boundaries.geojson (2026-06-05) [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [source:PROVISIONAL-BOUNDARIES-2026]
9. OpenStreetMap Copyright and License (background reference, ODbL) [source:OSM-COPYRIGHT]
10. The geometry/*.geojson, metrics.json, compliance_matrix.json, standard_matrix.json, design_depth_matrix.json, self_check.json, report/proposal.html, drawings/*.pdf, visual/index.html
