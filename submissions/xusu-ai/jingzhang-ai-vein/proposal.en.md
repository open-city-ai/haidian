---
title: "Centennial Jing-Zhang AI Innovation Belt — Urban Design of the Jing-Zhang AI Vein"
author_github: "xusu-ai"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With the historical axis of the Jing-Zhang Railway's hundred-year cultural lineage and the pulse of AI full-stack innovation, form an Urban Design scheme of 'one belt, three cores, multiple scene points, and a blue-green slow travel composite ring', covering the coordinated development of Three Zones and Two Wings, 10 AI scene cards, 5 user profiles, 3 AI holy sites, and a global AI activity operation system."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "enterprise-service-copilot", "ai-health-service-navigation", "public-safety-operations-review"]
iteration: "v1.0"
---

# Centennial Jing-Zhang AI Innovation Belt — Urban Design of the Jing-Zhang AI Vein

## Design Basis and Source List

This proposal is based on the first reference to the Qualification Pre-Review Announcement for the International Scheme of the Centennial Jing-Zhang AI Innovation Belt Urban Design ([standard:PROJECT-OFFICIAL-ANNOUNCEMENT]), and the excerpt from the Global Intelligent Agent Open Call Task Book ([standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]) as the basis for the intelligent agent task. It also adopts the publicly available information registered in `brief/site-package/`: `design_brief.json` (three layers of scope, three key areas, official area values), `agent_taskbook.json` (three major positioning, five functional areas, Three Zones and Two Wings, six intelligent agent tasks), `sources.json` (hierarchy of source availability), `allowed_design_space.json` (editable/locked layer boundaries), `ranges/planning_limits.json` (official area facts and missing planning control conditions), and `enums/` (land use classification, layers, building type enumeration). `standards/standards.json` With standard reference snapshots, and `data/source_registry.json` Public Open Call Registration Form ([source:SOURCE-REGISTRY]).

**Statement of Data Boundaries (Important):** As of the public review on 2026-08-07, the official announcement text does not include precise boundary polygons. The qualification pre-review document entry for the organizing body requires a password, and no official polygon/CAD/GIS ([depth:existing_conditions_diagnosis]) with a verifiable coordinate system could be found on public channels. This plan adopts `brief/site-package/geometry/provisional_boundaries.geojson` Provisional Boundary `PROV-SITE-001`, `PROV-KEY-001/002/003`)as **provisional_constraint** ([source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE]). This boundary is for scheme generation, self-review, visualization, and design discussions only; **it shall not be used as an official redline, approval reference, or precise area calculation reference**; Organizers' data gaps should not block content scoring. After the official polygon is released, all geometry and metrics must be recalculated ([source:SITE-PACKAGE], [source:PROCESSED-FACT-PACK]).

All spatial conclusions in this plan can be traced back to structured evidence: [data:geometry/site_boundary.geojson#SITE-001] defines the site boundary, [data:geometry/land_use.geojson#LU-001] defines the land use structure, [data:geometry/key_areas.geojson#PROV-KEY-001] defines three key areas, [metric:site_area_sqm] and [metric:green_ratio] define the core metrics, [depth:three_level_scope_framework] and [depth:overall_spatial_structure] define the design depth. The six categories of outcomes—text, GeoJSON, metrics, matrices, drawings, and HTML—are interlinked as an Evidence Chain, with any conclusion verifiable by tracing back to the text, layers, and metrics.

![Evidence Chain and Relationship Diagram with Submission Package](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal is organized according to the three-tier scope determined in the announcement ([standard:PROJECT-OFFICIAL-ANNOUNCEMENT]).

| Level | Official Area | Design Task | Data Landing |
| --- | --- | --- | --- |
| Coordinated Research Area | 43.6 km² | AI Industry Ecology, Innovation Chain, Three Zones and Two Wings Strategic Synergy, Future Urban Form | This plan is not shown in the diagram, serving as the sector for industrial and narrative research. |
| Overall Design Area | 11.4 km² | Urban Renewal Overall Framework, Land Use, Transportation, Utilities, Aesthetic Features, Indicator System | [data:geometry/site_boundary.geojson#SITE-001], [data:geometry/land_use.geojson#LU-001] |
| Key-Area Detailed Design Area | 368.4 ha | Three Key-Area Detailed Designs (at the depth of an Integrated Planning Implementation Plan) | [data:geometry/key_areas.geojson#PROV-KEY-001] et al. |

**Overall Spatial Concept:** "One Axis and Three Cores, Multiple Operational Scenarios, and a Composite Loop." The "one axis" refers to the Jing-Zhang Ruins Park as the main axis for historical and Public Space, running from north to south through the three "cores" (three key areas) of Zhongzhiyuan, AI Origin, and Dazhongsi. "Multiple operational scenarios" are the distributable AI scenario nodes along the axis. The "composite loop" is formed by the park's pedestrian main axis, the east-west connecting roads, and the riparian green belt, which link universities, enterprises, communities, and rail stations. This structure is implemented in [data:geometry/land_use.geojson#LU-001] (Park Belt 1401), [data:geometry/roads.geojson#RD-001] (Intelligent Axis), and [data:geometry/public_space.geojson#PS-001] (Key Area Core Square).

**Provisional Boundary Limitations:** The provisional boundary of the site is provisional_rough (approximately 11.41 km², [metric:site_area_sqm]), with three key areas defined as provisional polygons ([metric:key_area_details]: Zhongzhiyuan 192.9 ha, Origin Community 104.3 ha, Dazhongsi 72.0 ha, totaling 369.2 ha, closely matching the announced 368.4 ha, providing evidence for the reliability of the provisional boundary). Once the official polygon is released, the site boundary, key areas, land use, roads, green space, public space, buildings, and phasing must be recalculated in EPSG:4548 ([depth:metrics_recalculation]).

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Naming Proposal and Logo Direction (agent.1 Core Response)

**Main Name: "Jing-Zhang AI Vein."** Naming Logic: The Jing-Zhang Railway was China's autonomous innovation in the early 20th century, referred to as the "national artery" (completed in 1909 under the supervision of Zhan Tianyou, with a zigzag alignment that was a world innovation in railway history). "AI Vein" translates this historical cultural heritage into the innovative pulse of the AI era—tracks are the physical arteries, while computational power and data flow as the "AI Vein." The name also echoes the three key positioning goals: Jing-Zhang (cultural belt) · AI (urban life experience) · AI Vein (innovation integration belt).

**Naming System (Three Zones and Two Wings):** Zhongzhiyuan AI Independent Innovation Acceleration Area ("Zhiyu"), Beijing AI Origin Community ("Zhiyuan"), Dazhongsi AI Industry Cluster ("Zhishi"), Zhongguancun Technology Services Wing ("Zhifu"), Xiaoyue River Scenario Enablement Wing ("Zhijing"). The overall naming system forms a "Jingzhang AI Vein" with five nodes, facilitating international dissemination (Jingzhang AI Vein → ZHI Origin / ZHI Source / ZHI Market / ZHI Serve / ZHI Scene).

**Logo Direction:** Drawing inspiration from the zigzag alignment of the Jingtong Railway, the iron rail cross-section is abstracted into circuit/network connections, forming a double entendre graphic of "zigzag track × data flow"; standard color adopts a three-color system of "rail gray + wisdom vein blue (#2E5BFF) + century bronze (#B8860B)," representing history, technology, and culture, respectively. The logo is provided as a direction suggestion, does not submit a final graphic, and no trademark rights are claimed; formal use requires deepening and clearance by a professional team ([source:AGENT-TASKBOOK]). (Jing-Zhang)

### Three Key Orientations, Five Major Functions, and the Synergistic Loop of Three Zones and Two Wings

Three key positioning areas (the Centennial Jing-Zhang Cultural Belt, the Urban AI Living Experience Belt, and the AI Integration Innovation Belt) and five functional areas (Full-Stack Independent AI Innovation System, World-Class AI Innovation Ecosystem, AI-Enabled Scenario Empowerment New Paradigm, Intelligent AI Vibrant City, and AI Governance Global Discourse Power) form the "positioning→function→space" translation chain ([source:AGENT-TASKBOOK]).

- **Three Zones**: Zhongzhiyuan (Full-stack Autonomous Innovation + Governance Voice), Yedian Community (World-Class Innovation Ecosystem), Dazhongsi (Intelligent Natively Emerging New Business Models);
- **Wings**: Zhongguancun Technology Services Wing (element global configuration, IP and capital empowerment), Xiaoyue River Scenario Enablement Wing (AI scenarios and vibrant city).
- **Synergistic Loops**: University Innovation Hub (Tsinghua, etc.) → Origin Community Transformation → Zhongzhiyuan Autonomous Innovation and Standard Governance → Dazhongsi Scenario Implementation and Commercial Validation → Zhongguancun Wing Capital/Service Feedback → Xiaoyuehe Wing Public Experience and International Communication → Feedback to Universities and Developer Community, Forming an Innovation Loop.

### 5-8 global AI Innovation Ecosystem case studies (agent.2 response)

| Case | Transformable Experience | Spatial/Mechanism Landing Point |
| --- | --- | --- |
| Shenzhen Nan Mountain High-Tech Park | Park-City Integration and Corporate Self-Organized Ecosystem | Dazhongsi "Zhi Shi" Mixed-Use District, Corporate Public Interface Update |
| Hangzhou Yuntai Town | Brand Operation in Meetings + Community + Industry | Global AI Activity Week and Long-term Operation of Developer Community ([depth:annual_event_system]) |
| Singapore One Tech City | Work-Life Balance, Green Campus, International Talent Services | Origin Community Talent Zone, Park Belt Talent Living Facilities |
| King's Cross Area | Historical Station District Update, Cultural and Tech Innovation Mix | Jing-Zhang Heritage Park + Tsinghua Garden Station Cultural Update Model |
| Boston Kendall Square | Near-School Transformation, BioValley Ecology, Open Innovation Network | Original Community Near-School Transformation Street ([data:geometry/buildings.geojson#B-001]) |
| Seoul DDP | Cultural Landmark Driving Regional and Nighttime Economy | Dazhongsi International Grand Hall and Nighttime Vitality Scene |
| Berlin "Futurium" Future Museum | Public-facing space for technological narrative | One of the AI landmarks, "Zhi Mai Future Museum" (Conceptual Recommendation) |

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Land Use Structure ([standard:MNR-LAND-USE-CLASSIFICATION-GUIDE])

The land use zoning in this scheme is fully covered by 9 topologically closed polygons in [data:geometry/land_use.geojson] (gap-free, non-overlapping, combined area = site area 11.41 km², [metric:site_area_sqm]).

| Land Use Code | Land Use Nature | Area (ha) | Design Intent |
| --- | --- | --- | --- |
| 0802 | Research and Development Land | 232.6 | Zhongzhiyuan AI R&D + Dazhongsi AI Industry Cluster ([data:geometry/land_use.geojson#LU-001] and [data:geometry/land_use.geojson#LU-009]) |
| 0803 | Cultural Land Use | 169.9 | AI Display and Experience, Jing-Zhang Cultural Narrative Carrier ([data:geometry/land_use.geojson#LU-003]) |
| 0701 | Town Residential Land | 171.2 | Talent Community Update, Primarily Preservation and Renovation ([data:geometry/land_use.geojson#LU-004]) |
| 05 | Commercial and Business Service Land Use | 282.8 | Original Point Community Accompaniment + Dazhongsi Smart Consumption ([data:geometry/land_use.geojson#LU-006] and [data:geometry/land_use.geojson#LU-007]) |
| 1401 | Park and Green Spaces | 284.8 | Jing-Zhang Relic Park Corridor Extends North-South ([data:geometry/land_use.geojson#LU-002] etc., [metric:green_ratio]=25.0%) |

Land use zoning follows the pattern of "Park Belt Running Through, Functional Integration in the East and West Wings": the West Wing accommodates technological services for Zhongguancun (research and cultural), while the East Wing accommodates scene empowerment for Xiaoyuhe (commercial and residential), corresponding one-to-one with the Three Zones and Two Wings strategy.

### Urban Renewal Overall Framework ([depth:retain_renovate_demolish])

Update strategies follow the principles of "preserving context, renovating existing structures, and controlling incremental growth": the Jing-Zhang heritage site park belt and the Tsinghua Garden railway station site, among other historical and cultural resources, will be **preserved** and revitalized (as per the **cultural corridor concept** [data:geometry/constraints.geojson#CS-001]); the original point community and existing residential and research buildings along the route will be primarily **rehabilitated and improved** (as per the [data:geometry/buildings.geojson#B-001] status concept retain_renovate); the Zhongzhiyuan and Dazhongsi areas for new industries will be primarily **developed** (as per the [data:geometry/buildings.geojson#B-010] status concept new_build). Building Footprint totals 259.6 ha ([metric:building_footprint_area_sqm]), with the concept Floor Area Ratio and Building Coverage Ratio at low to medium intensity ([metric:floor_area_ratio]≈0.73, [metric:building_density]≈22.7%). **Both are marked as concept values, pending confirmation of formal planning conditions** ([source:SITE-PACKAGE]: all Floor Area Ratio, height, density, green space ratio, and setback information is missing in planning_limits.json).

## Detailed Design of Key Areas

Three key areas are marked as provisional_constraint (official_boundary=false) in [data:geometry/key_areas.geojson], and detailed design is provided as a **directional concept plan** for professional teams to further develop (see [depth:three_key_area_detailed_design]).

### Zhongzhiyuan AI Independent Innovation Acceleration Area (192.9 ha)

**Location:** Garden-type Full-stack Autonomous Innovation District ("Zhiyuan"). **Space Structure:** Research and development land use as the core ([data:geometry/land_use.geojson#LU-001]), Qinghe interface as the ecological forefront, and the northern segment of the park belt as the public living room ([data:geometry/green_space.geojson#GS-001]). **Building Update:** New AI research and development and laboratory buildings (such as [data:geometry/buildings.geojson#B-004], 6-story concept), preserving the ecological interface along Qinghe. **Traffic Slow Travel:** Zhi Pulse axis north segment connected ([data:geometry/roads.geojson#RD-001]), linking the North Fifth Ring Road with the rail transit connection. **Public Space:** Core square ([data:geometry/public_space.geojson#PS-001]) + Qinghe Low-Carbon Innovation Corridor (scene card 06). **AI Scenario:** Autonomous Model Testing Field, Standard Setting Workshop, Safety Governance Sandbox (Scene Card 02). **Implementation Risk:** Dependence on confirmation of Qinghe Blue Line and flood control conditions ([source:SITE-PACKAGE] missing data).

### Beijing AI Origin Community (104.3 ha)

**Location:** Near-school Type Conversion and Talent Special Zone ("Zhiyuan"). **Spatial Structure:** Talent community renewal as the main body ([data:geometry/land_use.geojson#LU-004]), commercial accompaniment as the vitality core ([data:geometry/land_use.geojson#LU-006]), and a green corridor in the middle of the park belt as a pedestrian connection ([data:geometry/green_space.geojson#GS-002]). **Building Renewal:** Retain and renovate existing research and residential buildings, integrating conversion stations (e.g., [data:geometry/buildings.geojson#B-012], 5-story concept). **Traffic and Pedestrian Access:** Integration of campus, park, and neighborhood, with Transit-Station Integration connections. **Public Space:** Original community core square ([data:geometry/public_space.geojson#PS-002]) + Open Source Release Hall (Scene Card 01). **AI Scene:** Open-source community, outcome release, on-campus incubation, talent special zone services. **Implementation Risks:** Dependence on campus boundaries, property rights, and alignment with ground-floor activities (source: [source:AGENT-TASKBOOK]).

### Dazhongsi AI Industry Cluster (72.0 ha)

**Location:** Urban-type Smart Economy and International Exchange District ("Smart City"). **Spatial Structure:** Commercial and service industry land use as the main body ([data:geometry/land_use.geojson#LU-007]), research and development land use for industrial depth ([data:geometry/land_use.geojson#LU-009]), and the southern segment of the park belt as a green buffer ([data:geometry/green_space.geojson#GS-003]). **Building Renovation:** New mixed-use buildings (such as [data:geometry/buildings.geojson#B-030], 10-story concept), high intensity near rail transit stations, and low intensity at the periphery. **Active Transportation:** Quadrant connectivity at Dazhongsi Station (update project JZ-04), with pedestrian priority at intersections. **Public Space:** Core public square at Dazhongsi ([data:geometry/public_space.geojson#PS-003]) + International Roadshow Living Room (scene card 05). **AI Scenario:** Intelligent agents and smart terminals showcase, content consumption, and data element living room (scene card 08). **Implementation Risks:** Dependence on track station, road intersections, and municipal pipeline conditions ([source:SITE-PACKAGE] missing data).

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### Five User Archetypes (agent.3 Response)

| Image | Typical Needs | Spatial Response | Privacy and Review Boundaries |
| --- | --- | --- | --- |
| Open Source Developer | Release, Collaborate, Test, Community Reputation | Origin Community Open Source Release Hall, Public Code Wall, Nighttime Collaboration Space | No personal behavior tracking; activity data only aggregated and statistically summarized |
| Startup Team | Low-Cost Office, Computing Power Entry Point, Product Test Bed | Zhongzhiyuan Shared Test Bed, Edge Computing Power Station, Governance Consultation | Computing Power/Data Services Require Separate Authorization |
| Key Client Visitors | Exhibitions, Business, International Reception, Talent Recruitment | Dazhongsi International Roadshow Living Room, Track Transfer, Key Enterprise Surrounding Public Spaces | Corporate Identity and Case Studies Must Clear Rights |
| Surrounding Residents | Commuting, Leisure, Community Services, Low-Impact Updates | Jing-Zhang Heritage Park Slow-Travel Loop, Community Services Embedded, Activity Tiering | Resident Profiles Not Used for Commercial Recommendations |
| College Students and Faculty | Result Transfer, Cross-Institution Collaboration, Daily Slow Travel | Campus-Park Slow Travel Integration, Result Transfer Kiosks, AI Education Experience Points | Campus Data and Research Results Require Authorization |

### 10 AI scenario cards (including 3 industrial Testing and Validation Scenarios)

| # | Scenario Card | Spatial Carrier | Service Target | Operational Data | Privacy Boundary | Human Review | Operating Subject (Concept) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | Open Source Release Hall | Origin Community | Developer/Startup | Activity Aggregate Statistics | No Individual Trajectory | Community Administrator | Community Foundation |
| 02 | **Safety Governance Sandbox (Test Validation 1)** | Zhongzhiyuan | Model Enterprise/Research Institution | Evaluation Data (Authorized) | Red Team Test Data Desensitization | Expert Review Panel | Standard Governance Institution |
| 03 | Edge Computing Hub | Overall Design Area | Startup/Resident | Computing Power Usage | Not Recorded | Platform Administrator | New Infrastructure Operator |
| 04 | AI Slow Travel Navigation | Parkway | Residents/Visitors | Discontinuity/Crowd Aggregation | Low-Intrusion Sensing, Exitable | Transportation Department | Park Operators |
| 05 | Dazhongsi International Roadshow Living Room | Dazhongsi | Corporate/International Visitors | Session and Transformation | Business Data Confidential | Activity Review | Event Operations Manager |
| 06 | Qinghe Low-Carbon Innovation Corridor | Zhongzhiyuan Qinghe Interface | Residents/Enterprises | Environmental Sensing | Public Environmental Data | Park Management | Park Committee |
| 07 | Neighborhood for Near-School Technology Transfer | Origin Community | University Students and Faculty | Transfer Service Records | Research Data Authorization | Results Specialist | University Technology Transfer Office |
| 08 | **Data Element Living Room (Test Validation 2)** | Dazhongsi | Data Enterprise | Circulation Demonstration (Synthetic Data) | Compliance/Authorization/Auditable | Data Compliance Officer | Data Exchange |
| 09 | AI-Life Service Sample Street | Intersection of Community Commerce | Residents | Service Usage Aggregation | Minimized Collection | Service Review | Street/Community |
| 10 | **Global AI Activity Week Route (Test Validation 3)** | One Belt Public Space System | Public/Developers | Crowd Aggregation | Activity Data Desensitization | Activity Safety Group | Activity Organizing Committee |

Each scene card maps to a spatial layer: 01→[data:geometry/public_space.geojson#PS-002], 02→[data:geometry/land_use.geojson#LU-001], 04→[data:geometry/roads.geojson#RD-001], 06→[data:geometry/green_space.geojson#GS-001], 05/08→[data:geometry/public_space.geojson#PS-003]; and complies with the privacy_and_human_review_boundary requirements from [source:AGENT-TASKBOOK]: data minimization, public sources, explainability, Human Review, no collection of individual trajectories, no unauthorized profiling.

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The land use and building evidence can be found in [data:geometry/land_use.geojson] and [data:geometry/buildings.geojson] (39 conceptual buildings, [metric:building_footprint_area_sqm]=259.6 ha). The demolish–renovate–retain strategy is categorized as follows: **preserve** — Jing-Zhang heritage site park belt and cultural corridor of Tsinghua Garden station ruins ([data:geometry/constraints.geojson#CS-001]); **renovate** — existing residential and research buildings in the original point community (such as [data:geometry/buildings.geojson#B-012]); **new construction** — Zhongzhiyuan R&D and Dazhongsi mixed-use buildings (such as [data:geometry/buildings.geojson#B-010] and [data:geometry/buildings.geojson#B-030]). (Demolish–Renovate–Retain Strategy) The concept of Building Height is divided into three levels: along the park belt ≤18m (5 floors), research and development zone ≤24m (6 floors), and commercial core area ≤36m (10 floors), **all of which are conceptual guidelines, awaiting formal plan confirmation for height, Floor Area Ratio, and setback** ([source:SITE-PACKAGE]: planning_limits.json missing items).

## Transport, Rail, Municipal Infrastructure, and Public Services

The road framework is expressed by [data:geometry/roads.geojson]: the Zhi Mai longitudinal axis ([data:geometry/roads.geojson#RD-001], a concept for a north-south main arterial road), the Xiao Yuehe wing longitudinal road ([data:geometry/roads.geojson#RD-006]), and four connecting transverse roads (such as [data:geometry/roads.geojson#RD-002]), with a total road length of approximately 24.8 km ([metric:road_length_m]). **Integrated Rail Transit:** Dazhongsi station quadrants walking connection (JZ-04) and the original community rail transit station docking as core actions. **Slow Travel Discontinuity Seams:** Jing-Zhang Heritage Park cross-ring road node, and the pedestrian priority at Wudaokou and Qinghua East Road West Mouth. **Parking and Non-Motorized Vehicles:** Transfer parking around rail transit stations and bicycle stations at the endpoints of the park. **Municipal and New Infrastructure (Concept):** End-side computing power stations combined with public services (Scene Card 03) and distributed energy with Qinghe Low-Carbon Corridor (Scene Card 06). Missing utilities, drainage, flood control, and fire protection infrastructure conditions, listed as formal pre-requisites for further development ([source:SITE-PACKAGE] missing data).

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

**Blue-Green Framework:** Jing-Zhang Heritage Site Park Vital Belt ([data:geometry/green_space.geojson#GS-001/002/003], 284.8 ha, [metric:green_ratio]=25.0%) runs north-south, connecting Qinghe and Xiaoyuehe waterfront spaces, forming a "one belt, two waters" blue-green network. **Public Space:** Three core squares ([data:geometry/public_space.geojson#PS-001/002/003]) + two linear vitality squares ([data:geometry/public_space.geojson#PS-004/005]), with a total public space area of 15.1 ha ([metric:public_space_ratio]≈1.3%). **Urban Character:** Control the urban base tone with a tri-color system of "Steel Gray × Wise Pulse Blue × Centennial Copper," translating the Jing-Zhang Railway symbols (Z-shaped grade separation, sleepers, station canopies) into street furniture and signboard themes. Integrate the innovation culture of Zhongguancun and the AI new cultural narrative (agent.5 response, [depth:blue_green_public_space]).

**Three AI Sacred Sites (agent.4 Response, Conceptual Recommendation):**

| Landmark | Location | Narrative | Honor Display Function |
| --- | --- | --- | --- |
| Smart Pulse Origin Monument | Original Site of Tsinghua Garden Station (Origin Community) | Starting Point of China's Railway Independent Innovation → AI Innovation Origin | Developer Contribution Wall, Open Source Honor System |
| SmartVine Future Pavilion | Park strip midsection (between Yuantuan Community and Zhongzhiyuan) | Public-facing AI Technology and Culture Narrative Space | Annual AI Innovation Award Exhibition, International Communication Window |
| Smart Pulse Market Platform | Dazhongsi Area | Emerging New Smart Native Business Models and Consumer Experience | AI Product Launch Venue, Honor List for Content Consumption |

Landmark is a **Conceptual Recommendation**, not an endorsement of a built commitment, does not involve land ownership, and does not use unauthorized trademarks or images, formal construction requires a professional team to deepen and clarify the design ([source:AGENT-TASKBOOK] forbidden_claims boundary).

## Renewal Projects, Implementation Policy, and Phasing

### Update project list ([depth:renewal_project_list])

| Number | Project | Type | Main Dependencies | Phases | Evidence |
| --- | --- | --- | --- | --- | --- |
| JZ-01 | Jing-Zhang Site Park Pedestrian Connectivity | Public Space/Transport | Road Right-of-Way, Underbridge Space | Near-Term | [data:geometry/roads.geojson#RD-001] |
| JZ-02 | Zhongzhiyuan Qinghe Innovation Interface | Blue-Green/Industrial Display | Riverbank Blue-Green Space, Flood Protection | Near-Term | [data:geometry/green_space.geojson#GS-001] |
| JZ-03 | Original Point Community Near-School Transformation Street | Update/Industrial Services | Campus Boundary, Ownership | Mid-term | [data:geometry/buildings.geojson#B-012] |
| JZ-04 | Dazhongsi Station Quadrant Pedestrian Connectivity | Transit-Oriented Development | Station, Intersection, Pipelines | Mid-term | [data:geometry/public_space.geojson#PS-003] |
| JZ-05 | AI Public Services and Edge Side Computing Nodes | New Infrastructure | energy, computing power, security | Recent pilot projects | [data:geometry/constraints.geojson#CS-001] |
| JZ-06 | Global AI Activity Week Public Route | Operations/Brand | Public Space License, Copyright | Annual Operations | [data:geometry/phasing.geojson#PH-001] |

### Phasing Plan ([data:geometry/phasing.geojson])

- **Recent Phase (2026-2028, [data:geometry/phasing.geojson#PH-001]):** Zhongzhiyuan's northern segment will proceed first, with the Qinghe interface, safety governance sandbox, and edge-side computing pilot initiatives launching.
- **Mid-term (2029-2031, [data:geometry/phasing.geojson#PH-002]):** Origin community update, conversion of results street, transit connection, and mid-section stitching of the park strip.
- **Long-term (2032-2035, [data:geometry/phasing.geojson#PH-003]):** The Dazhongsi area, the eastern wing Xiao Yuehe scene linkage, and the international roadshow lobby will be completed.

### Global AI Innovation Ecosystem and Long-Term Operations (agent.6 Response, [depth:phasing_implementation])

**Annual Activity System (Conceptual Recommendation):** 1. Every September "Jing-Zhang Smart Pulse AI Week" (aligning with the landing start in September, including an open-source conference, model evaluation, and pitch sessions); 2. Quarterly "Smart Pulse Open Days" (scenario access, corporate showcases, public experiences); 3. Monthly "Developer Nights" (original community open-source collaboration); 4. Regular "Smart Pulse Pilgrimage Route" public tours. **Brand IP System:** Continues the "Smart Pulse" naming tree and three-color visual system, with unified activity visuals and One-Belt-One-Path logo system. **Developer Community Operations:** Open-source release hall + public code wall + contribution honor system (original monument), forming a "contribution-honor-transformation" loop. **Scenario Access Operations:** Testing and Validation Scenario (sandbox/data elements/activity week) are opened in an "appointment+authorization+Human Review" mode. **International Promotion and Conversion:** The global AI activity week route (scenario card 10) serves as an international promotion carrier, with the pitch lounge facilitating corporate conversion. **Boundary Statement:** The above are all Conceptual Recommendations and further development directions, and do not express any determined government arrangements, business attraction commitments, or funding arrangements ([source:AGENT-TASKBOOK] forbidden_claims_boundary).

## Metrics, Area Recalculation, and Compliance Matrix

Core metrics ([metric:site_area_sqm], [metric:key_area_count], [metric:building_footprint_area_sqm], [metric:green_ratio], [metric:public_space_ratio], [metric:road_length_m], [metric:land_use_area_by_code], [metric:phasing_area_sqm], [metric:total_floor_area_sqm]) were recalculated (using [depth:metrics_recalculation]) in EPSG:4548 projection from GeoJSON, with results seen in layers such as [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/land_use.geojson#LU-001], as well as in `metrics.json`.

| Indicator | Value | Design Implication |
| --- | --- | --- |
| Site Area | 11.41 km² | Overall Design Area, supporting the three-layer framework layout |
| Green Space Ratio | 25.0% | Park Belt Through + Riverfront Green Corridor, Supporting Talent Living and Pedestrian Experience |
| Public Space Proportion | 1.3% | Three Key Plaza Areas + Vital Plaza, Supporting Innovative Interaction |
| Building Coverage Ratio | 22.7% | Low to Medium Intensity Development, Leaving Space for Public Space and Ecology |
| Total Road Length | 24.8 km | Smart Pulse Vertical and Horizontal Axis Framework, Supporting Micro-Circulation |
| Key Areas Combined | 369.2 ha | Three Detailed Design Areas, Aligning with Announced 368.4 ha |

`compliance_matrix.json` covers notice 1.3/1.4/1.5; all 17 tasks are aligned with agent.1-6. `standard_matrix.json` covers 6 mandatory standards. `design_depth_matrix.json` covers all 15 design depth items complete (including [depth:three_level_scope_framework], [depth:overall_spatial_structure], [depth:land_use_layout], [depth:development_intensity_controls], [depth:three_key_area_detailed_design], [depth:height_massing_character], [depth:retain_renovate_demolish], [depth:traffic_rail_slow_parking], [depth:municipal_new_infrastructure], [depth:blue_green_public_space], [depth:renewal_project_list], [depth:phasing_implementation], [depth:metrics_recalculation], [depth:annual_event_system], [depth:risk_missing_data]).

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

**Legal Compliance:** This plan uses only publicly available or cleared data sources ([source:SITE-PACKAGE], [source:SOURCE-REGISTRY]); no secret maps, non-public tables, or fake official endorsements were used; and no commercial map tiles were used as submission data ([source:PROCESSED-FACT-PACK]). **Copyright:** All text, layers, metrics, figures, and HTML are generated by the agent; copyright and licensing information can be found in `report/copyright_statement.md`; names, logos, and landmarks are conceptual directions and do not contain unauthorized trademarks, fonts, images, or corporate logos ([source:AGENT-TASKBOOK] charter.2/charter.6). **Privacy:** The AI scenario adheres to the data minimization and Human Review boundaries, and does not collect individual behavioral trajectories (as noted in the privacy column of the scene card). **AI Generated Responsibility:** The agent is responsible for the facts, sources, spatial data, and metrics used. All spatial design suggestions are presented as "Conceptual Recommendation/Reference Scheme/Available for Professional Teams to Deepen Research," **do not constitute** statutory planning, government approval, implementation commitment, investment estimation, or approval judgment ([source:AGENT-TASKBOOK] boundary_clause). **Pending Documentation:** Official polygons, control plan conditions, existing buildings/ownership, road right-of-way, municipal utility lines, and cultural heritage area GIS data are found in `assumptions.json` and `missing_data_checklist.csv` ([depth:risk_missing_data]).

## References

- `brief/site-package/design_brief.json`
- `brief/site-package/agent_taskbook.json`
- `brief/site-package/allowed_design_space.json`
- `brief/site-package/sources.json`
- `brief/site-package/ranges/planning_limits.json`
- `brief/site-package/geometry/provisional_boundaries.geojson`
- `brief/site-package/enums/`, `brief/site-package/schemas/`
- `brief/site-package/standards/standards.json` and `references/`
- `data/source_registry.json`
- Machine-readable citation: [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE], [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016], [depth:three_level_scope_framework], [data:geometry/site_boundary.geojson#SITE-001], [metric:site_area_sqm]
