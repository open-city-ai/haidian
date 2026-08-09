---
title: "Jing-Zhang Blue-Green Smart Integration | Three Stations Seamlessly Integrated"
author_github: "kylin985ti"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With Qinghe—Xiaoyuehe—Jing-Zhang Railway Heritage Park as the blue-green cultural public base, and with the implementation nodes of North Segment Qinghe Co-Innovation Station, Wudaokou Nearby School Co-Creation Station, and Dazhongsi Urban Shared Station, form a reference plan for an AI innovation belt that is walkable, verifiable, and co-governable."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# Jing-Zhang Blue-Green Smart Integration | Three Stations Seamlessly Integrated

## JINGZHANG BLUE-GREEN LINK | THREE-NODE URBAN STITCH

> On a base of blue-green public benefits, organize space around genuine sites and cultural anchor points, and organize AI through controlled testing and human responsibility. All spatial recommendations are conceptual suggestions, reference proposals, or available for professional teams to deepen their research, and do not replace formal planning or constitute government approval conclusions. (Conceptual Recommendation)

## Executive Summary

The proposal outlines "a **blue-green public base, three station seams, two wings of specialized support, and twelve AI scenarios**." The blue-green public base connects Qinghe, Xiaoyue River, and the Jing-Zhang Railway Heritage Park through a cultural—ecological—Walking and Cycling Network. The three stations are the North Segment Qinghe Co-Innovation Station, the Nearby School Co-Creation Station at Wudaokou, and the Dazhongsi Urban Shared Station. The Zhongguancun Technology Services Wing provides capital, legal, intellectual property, talent, and international services, while the Xiaoyue River Scenario Enablement Wing offers urban issues, test environments, and public experiences.

The spatial judgment of the proposal comes from official announcements, clearance of rights task book, official project materials, public map markers, and 30 desktop observation points, rather than from functional imaginations detached from the site. At this stage, the three-layer task scale, key area names, point-of-interest nodes such as Wudaokou and Dazhongsi, Jing-Zhang Railway Heritage Park and related cultural resources, and project-level transportation issues can be confirmed. However, official precise polygons, control plans, ownership, road right-of-way, current buildings, municipal conditions, and on-site usage status cannot be confirmed. Therefore, the polygon shapes in the GeoJSON are used for directional modeling, and legal and engineering indicators remain unknown. [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:HAIDIAN-AI-ORIGIN-2026] [source:HAIDIAN-JZ-BELT-2026] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:existing_conditions_diagnosis]

![Overall Concept, True Anchors, and Three-Station Seam](assets/figures/site-overview.png)

## Design Basis and Source List

### Evidence Classification

| Level | Acceptable Judgments | Materials in This Proposal | Prohibited Upgrades To |
| --- | --- | --- | --- |
| A Task and Standards Basis | Project Name, Scope Approximation, Design Task, Professional Boundaries | Official Announcement, Clear Title Task Document, Ministry of Housing and Urban-Rural Development/Ministry of Natural Resources Standards | Specific Site and Engineering Approval |
| B Public Open Space Anchors | Actual Locations, Background of Public Projects, Cultural Resources, and Outstanding Issues | Official Project Documents, Cultural Heritage Records, OSM/Nominatim Location Anchors | Survey Red Lines, Complete List of Current Conditions |
| C Model Proposal | Functional relationships, pedestrian network, conceptual envelope, scenes, and implementation gates | This package includes GeoJSON, metrics, drawings, and HTML. | Current Conditions, Control Plan, Ownership, Construction Drawings |
| D To Be Reviewed | On-Site, Statutory, Engineering, Operational Conditions | `assumptions.json` and an Empty Control Line Layer | Determine Conclusions |

This package follows WGS84/EPSG:4326 for exchange, EPSG:4548 for area and distance recalculations; WGS84, GCJ-02, BD-09, and TianDiTu service coordinates must not be directly overlaid. [source:SOURCE-REGISTRY] [source:OSM-CONTEXT] [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]

### 30 Remote Reconnaissance Records and 12 Scheme Anchors

Place 10 desktop observation points in the north, center, and south, for a total of 30 points; record at each point.WGS84 Coordinates, target direction, source, observable facts, unknowns, and credibility, all `field_verified=false`. The complete 30-point checklist is included in [`report/narrative.md`](report/narrative.md#30点远程勘察登记), not just showing quantities on the map; Among the 12 anchor points that directly influence the structure of the proposal, they are listed in the following table. [metric:desk_observation_point_count]

| Paragraph | True Anchor | WGS84 | Verification Subject | Evidence Status |
| --- | --- | --- | --- | --- |
| North | Qinghe—Xiaoyuehe River Weir | 116.346724, 40.017303 | Blue-Green Continuity, Shoreline Accessibility, Flood Protection, and Nighttime Safety | Map Anchor; Not Field-Verified |
| North | Shangqingqiao/Jingzhang Expressway Interface | 116.347579, 40.021712 | High-Level Road Barrier, Detour, Slope, and Accessibility Issues | Map Anchor Point; Not Field-Verified |
| North | Xuezhiyuan Station | 116.345753, 40.013630 | Rail Access and Connection for Non-Motorized Vehicles and the Campus/Community | Map Anchor Point; Not Field-Verified |
| Chinese | Dongsheng Building | 116.327708, 39.992446 | AI Origin Public Center, Near School Services and Technology Transfer and Conversion | Official Text+Map; Not Site Boundaries |
| Chinese | Wudao Kou Station | 116.331702, 39.991478 | Quadrant Four Pedestrian and Bicycle Parking, Return at Night | Official Task+Map; Not Counted |
| EN | Jing-Zhang Railway Heritage Park Phase at Wudaokou | 116.331612, 39.994826 | heritage park continuity, cultural display, accessibility, and maintenance | Official Project Background+Map |
| Chinese | Qinghua Donglu Xi Kou | 116.339200, 40.000500 | Station Integration, Campus Boundary, and Transfer | Task Point Name + Directional Coordinates |
| Chinese | Former Tsinghua University Station | 116.328000, 39.994300 | Preservation Scope, I/V Class Control, Neighboring and Reversible Exhibition | Official Control Text; Coordinates Derived from Address |
| South | Dazhongsi Station | 116.339006, 39.965271 | Quadrant Four, Bus, Cycling, Station-City Shared | Official Task+Project Materials+Map |
| South | Dazhongsi Ancient Bell Museum | 116.331735, 39.968019 | Historical Cultural Resources and Protection Control | Official Cultural Relics Background; Control Line Missing |
| South | Behind Vanke Plaza/Lan Jing Li Jia | 116.335300, 39.966300 | Project Interface, Commercial Services, and Coordinated Upgrades | Official Project Documents; Implementation Status Pending Verification |
| South | 13th Line Noise Sensitive Interface | 116.340000, 39.961500 | Noise and Vibration, Quiet Rest, and Track Protection | Historical Remediation Materials; Current Monitoring Absent |

Public locations only confirm "where verification should take place," not the slope, flow, clear width, noise, barriers, opening times, or public perception. On-site refinement must be completed by observing workday morning and evening peak hours, weekends during the day and at night, along the northern line from Qinghe—Xuezhikyuan, the middle line from Dongsheng Building—Wudao Kou—Yanqi Park—Qinghua Donglu West Mouth, and the southern line from Dazhongsi Quadrant—Xueyuan Nanlu, covering elderly people, people with disabilities, students, entrepreneurs, residents, service workers, and operational staff. [source:AI-ORIGIN-AREA-2026] [source:DAZHONGSI-MICROCENTER-2026] [depth:risk_missing_data]

## Three-Level Scope Framework

Coordinated Research Area covers approximately 43.6 square kilometers and is responsible for industry, talent, computing power, data, scenarios, and regional coordination; Overall Design Area covers approximately 11.4 square kilometers and is responsible for the blue-green public base, Urban Renewal, pedestrian access, and the integration of industry and living spaces; three key areas cover a total of approximately 368.4 hectares and are responsible for node-level functions, Public Spaces, scenarios, and implementation levers. The three-layer transmission relationship is "regional mechanism—public framework—verifiable project package," not a mechanical enlargement of the same map. [source:SITE-PACKAGE] [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:three_level_scope_framework]

The overall design boundary of this package and the three key areas are all `provisional_constraint`. The polygons are based on the announced area and public anchor points, used only for design relationships, topology, and intake self-check; after the official polygons are in place, `site_boundary` and `key_areas` must be replaced and land use, buildings, roads, green space, public space, phasing, metrics, images, and drawings must be recalculated. [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count]

![Three levels of scope, functional zoning, and blue-green public base layer](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Name, English Name, and Visual Identity

"Jing-Zhang Blue-Green Link" overlays the century-old Jing-Zhang timeline with the ecological public axis of Qinghe—Xiaoyuehe—Remainder Park, and an AI collaborative network; "Three-Station Stitch" directly states that the proposal is not to build three closed campuses, but to patch urban discontinuities through stations, Public Spaces, and verifiable services. The English name is `JINGZHANG BLUE-GREEN LINK | THREE-NODE URBAN STITCH`. The logo features a continuous green curve, three ochre nodes, and two open interfaces: the curve represents the blue-green public base, the three points represent the North, Central, and South stations, and the open interfaces symbolize the two wings' collaboration and public access. All fonts, icons, and colors are generated from procedural geometric bases, without using corporate trademarks, personal likenesses, or unauthorized materials. [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

### Three Key Orientations, Five Major Functions, and Three Zones and Two Wings

Three key orientations are defined: railway culture that can be read, urban AI life that can be experienced, and integrated innovation that can be validated. Five functional areas are organized not by building segments but by shared capabilities: full-stack autonomous validation, world-class innovation ecosystem, AI+Scenario Access, intelligent vibrant city, and people-centric AI governance. The northern segment handles full-stack validation and governance, the middle segment manages nearby transformation and talent services, while the southern segment focuses on intelligent native business forms and urban experiences; the wings provide technological services and public scenarios. [depth:overall_spatial_structure]

### Six Mechanisms Translated from Six Cases

| Case | Verifiable Mechanism | Haidian Transliteration | Clearly Not Replicate |
| --- | --- | --- | --- |
| Beijing AI Origin Community | Near-School Innovation, Youth Co-Creation, and Talent Services | Midsection employs a progressive spatial supply of one desk—one room—one floor—one place public interface | Not treating the promotional radiation range as a competition red line |
| Shanghai Zhangjiang Science City | Research, Entrepreneurship, Living, Learning, Recreation, and Synergies with the Blue-Green Network | Viewing Public Services and Ecological Spaces as Innovation Infrastructure | No Transplanted Area and Development Intensity |
| Hong Kong-Zhuhai-Macao Science and Technology Innovation Cooperation Zone | Place equal emphasis on innovation and technology alongside professional services. | Establish standards, compliance, testing, and exit mechanisms for the northern segment. | Do not apply cross-border regime facilitation measures. |
| LaunchPad @ one-north | Startup Community Supporting a Controlled Testing Environment | Define Scope, Timeframe, Safety Officer, Logs, and Exit Strategy | Do Not Replicate Land and Testing Permissions |
| Kendall Square | Transitioning from an Innovation Campus to an Innovation Community | Focusing on Non-Research Hours, Service Amenities, and Community Impact | Not Measured by High Rents or Headquarters Count |
| Salford Rise | Respond to Physical Barriers with Walkable, Bikeable, and Public Spaces | Conduct a Barrier Audit and Establish a Detour Baseline First, Then Discuss Engineering | Case Does Not Prove Viability of Bridges or Tunnels |

The examples only provide methods for addressing the issues. Any enterprise, funding, site, policy, or program arrangements still require confirmation from the responsible party. [source:CASE-ZHANGJIANG] [source:CASE-HETAO] [source:CASE-ONE-NORTH] [source:CASE-KENDALL] [source:CASE-SALFORD-RISE]

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The overall design adopts a four-layer structure of "blue-green public backbone first—site and block integration—upgrading of existing space performance—data and responsibility loop." The first layer connects Qinghe, Xiaoyuehe, and the Jing-Zhang Railway Heritage Park, providing continuous walking, cycling, barrier-free access, rest, and cultural tours; the second layer connects Xuezhiyuan, Wudao Kou, Qinghua Donglu Xi Kou, and Dazhongsi, integrating tracks with park, campus, community, and park interfaces; the third layer uses performance units such as shared tables, project spaces, growth layers, and public interfaces to serve different growth stages; the fourth layer sets data minimization, human takeover, audit, complaints, and exit for each AI scenario. [data:geometry/roads.geojson#ROAD-001] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001] [standard:MOHURD-URBAN-DESIGN-MEASURES]

`land_use.geojson` is a performance zone classification derived from the same directional topology, fully covering and without overlap; `buildings.geojson` represents eight conceptual spatial envelopes, not reflecting existing buildings or approved new constructions; `constraints.geojson` remains an empty set and lists pending statutory controls to prevent AI from using inferred lines instead of planned regulations. [data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLDG-001] [data:geometry/constraints.geojson#pending-data-gaps] [depth:land_use_layout]

Development Intensity, total building scale, height, road area, and the Demolish–Renovate–Retain Strategy are kept unknown. Professional deepening adopts four levels of scrutiny: ownership and current condition survey, cultural and ecological conservation and public interest review, structural fire safety and municipal infrastructure evaluation, and operational and user impact argumentation; only after passing these can the preservation, restoration, adaptive reuse, reversible additions, or other treatments proceed. [metric:floor_area_ratio] [metric:total_floor_area_sqm] [metric:building_height_m] [metric:road_area_ratio] [depth:development_intensity_controls] [depth:retain_renovate_demolish]

## Detailed Design of Key Areas

### North Segment | Zhongzhiyuan Direction: Qinghe Co-Research Station

With Qinghe-Xiaoyue River Water Gates, Shangqing Bridge/Beijing-Zhangjiakou Expressway Interface, and Xuezhiyuan Station as reference points, form a directional structure of "one blue-green verification belt, two controlled test courtyards, and three shared service entrances." Address the issues of shoreline access, detours, park entrances, nighttime lighting, accessibility, and bicycle parking first. Then introduce three types of sandbox environments: toolchain interoperability, edge-side computational energy consumption, and low-speed robots. Cross-ring or high-grade road projects are not conditions for the scheme to be established and must undergo traffic, water management, landscaping, flood control, and safety specializations. [source:ZHONGZHIYUAN-UPDATE-2026] [source:OSM-CONTEXT] [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:zhongzhiyuan_key_area_sqm] [depth:three_key_area_detailed_design]

### Middle Segment | Beijing AI Origin Community: Wudaokou Near-School Co-Creation Station

Using Dongsheng Building, Wudaokou Station, Jing-Zhang Railway Heritage Park, the old site of Tsinghua Yuan Station, and the west end of Tsinghua East Road, form a verifiable proximity chain to the school. The spatial supply adopts the structure of "one shared desk—one project area—one layer of growth space—one public interface," integrating research prototypes, startup teams, talent families, and community services into a single pedestrian network. The campus and park boundaries only raise issues of gate zones, shared time periods, nighttime safety, and cycling organization, without assuming property consent. The Beijing Municipal Bureau of Cultural Relics has published the text requirements for the protection range and Class I and V construction control zones of the old site of Tsinghua Yuan Station; this plan adheres to these as hard constraints, but does not self-draw the statutory polygon until an accurate official map is obtained. The Jing-Zhang railway cultural nodes continue to use reversible exhibitions, low brightness, and verifiable historical facts. [source:AI-ORIGIN-AREA-2026] [source:JZ-PARK-WUDAOKOU-2019] [source:QINGHUAYUAN-HERITAGE-CONTROLS-2026] [data:geometry/key_areas.geojson#PROV-KEY-002] [metric:ai_origin_key_area_sqm]

### South Segment | Dazhongsi AI Industry Cluster: Dazhongsi Urban Shared Station

With Dazhongsi Station as the center, adopt the 300-meter integrated study scope from the official project documents as the project-level background, not interpreting it as the boundary of the solicitation focus area. Prioritize verification of the four quadrants, station entrances, bus stops, non-motorized vehicle clear width, pedestrian clear width, construction barriers, track protection, noise and vibration, and cultural resources. The relevant traffic report proposes two non-motorized vehicle parking areas totaling approximately 0.14 hectares, which information enters the implementation verification list but is not considered as new indicators for this plan. Spatially, propose performance requirements for continuous ground-level pedestrian paths, accessible shared levels, quiet resting interfaces, and youth nighttime services. Underground connections and alignment with the engineering line must be separately argued. [source:DAZHONGSI-MICROCENTER-2026] [source:DAZHONGSI-TRANSPORT-2026] [source:LINE13-NOISE-2020] [data:geometry/key_areas.geojson#PROV-KEY-003] [metric:dazhongsi_key_area_sqm] [depth:traffic_rail_slow_parking]

![Three key areas' actual anchor points, design actions, and professional thresholds](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### Six User Persona Categories

| User | True Needs | Spatial and Service Response |
| --- | --- | --- |
| Youth Researchers and Students | Low-Cost Experiments, Peer Exchange, Nighttime Safety | Shared Verification Kiosks, On-Site Service Circuits, Artificial Assistance Points |
| Startup Teams and Small/Medium Enterprises | Scalable Spaces, First Deals, Compliance, and Exit Strategies | One Table—One Room—One Floor Gradient, Scenario List, and Failed Exit |
| International Talent and Families | Dual-Language Services, Navigation for Education and Healthcare, Community Integration | Human Review Service Desk, Family-Friendly Space, Source-Verified |
| Residents, Seniors, and Persons with Disabilities | Quiet, Safe, Understandable, Rejectable | Non-Digital Pathways, Barrier-Free Continuity, Complaints and Corrections |
| Commuting, Delivery, Cleaning, and Maintenance Staff | Continuous Passage, Rest, Restocking, Washrooms | Bicycle Parking, Service Kiosks, Time-Slot Delivery, Manual Scheduling |
| Visitors and Railways Culture Enthusiasts | Trustworthy History, Clear Signage, Accessible Viewing | Offline Signage, Evidence Labels, Reversible Exhibits, Accessible Information |

[metric:persona_count]

### Twelve Scene Cards

| ID | Scenario | Space | Minimum Data | Human Responsibility |
| --- | --- | --- | --- | --- |
| SC-01 Testing | Open Source Toolchain Interoperability Platform | Controlled R&D Space for the North Section | Synthetic/Privilege Testing Suite | Expert Review; Failure to Exit |
| SC-02 Testing | Low-Speed Robot Co-Travel Test | Controllable Segments within the Park | No Facial Recognition; Only Event Logs Recorded | On-Site Safety Officer Takes Immediate Control |
| SC-03 Testing | Validation of Edge Computing Power and Energy Consumption | Shared Pilot Unit | Equipment Status and Energy Consumption | Third-Party Testing + Electrical and Fire Safety Review |
| SC-04 | Station Exit Pedestrian and Cycling Assistant | Transfer Points such as Wudaokou/Dazhongsi | Summarize Traffic Flows; Do Not Continuously Identify Identity | Prioritize Traffic Personnel; Transfer to Manual Assistance for Abnormal Situations |
| SC-05 | Accessibility Continuous Path Assistant | Park/Stations/Service Points | User Active Feedback | Parallel use of non-digital signage and manual inspection |
| SC-06 | Talent Service Navigation | AI Origin Service Node | Necessary Fields for Processing | Transfer Complex Matters to Manual; Refer for Verification |
| SC-07 | Railway Memory Tour | Ruins Park/Old Station Background | Offline Content Priority | Cultural Heritage, Historical Accuracy, and Copyright Review |
| SC-08 | Community Health Service Navigation | Community Service Kiosk | No Diagnosis; Only Navigation for Appointments | Emergency Situations Transfer to Live Operator/First Aid System |
| SC-09 | Teen AI Learning Companion | Public Learning Space | Minimize Minor Information | Teacher and Parent Controllable; Duration Limitation |
| SC-10 | Small and Medium Enterprise Compliance Assistant | Technology Service Wing | Necessary Materials Submitted by the Enterprise | Review by Legal and Financial Professionals |
| SC-11 | Public Space Operations Assistant | Park/Station/Facility Point | Environmental and Equipment Status | Alarm Classification, Manual Dispatch, Log Audit |
| SC-12 | Seasonal Comfort Coordination | Shade/Gathering/Stay Nodes | Humidification/Rainfall/Environmental Data | On-Site Calibration, Energy-Saving Thresholds, Manual Inspection |

Three priority sectors have been tested as SC-01, SC-02, and SC-03. Any sandbox must be clearly defined with the responsible unit, testing purpose, allowable data, storage period, model/rule version, human positions, insurance and emergency measures, appeal entry, shutdown threshold, and data deletion upon exit. [metric:scenario_node_count] [metric:sandbox_candidate_count]

Scenes within China follow the principles of clear purpose, minimum necessity, classification and grading, non-digital alternatives, and human final responsibility. Health, education, legal, public safety, and navigation purposes are supportive, not making automatic decisions that affect individual rights; specific systems still require project-level compliance assessments, procurement, registration, and security evaluations. [source:PIPL-2021] [source:DSL-2021] [source:GENAI-MEASURES-2023] [source:ACCESSIBILITY-LAW-2023]

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Conceptual land uses are organized into six categories: research and development/AI R&D, collaborative education and research, industrial and commercial services, talent living, community services, and park green spaces. They are coded using subsets of the classification system of the Ministry of Natural Resources. [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The functional zoning is a model of how "public infrastructure and innovative spaces support each other," and does not represent current land uses or planned adjustments. [data:geometry/land_use.geojson#LU-001]

Eight conceptual spaces envelop the relationships between shared validation, near-school incubation, talent services, cultural display, station-city sharing, and cycling services. Their combined gross floor area and model density are indicated by [metric:building_footprint_area_sqm] [metric:building_density]. The demolition–renovate–retain strategy is applied on a building-by-building basis, using a decision gate of "protection/retention priority—renovation and improvement—adaptive reuse—reversible additions—other specific considerations." This includes structural and fire safety, ownership, user impact, cultural value, and lifecycle carbon emissions. [data:geometry/buildings.geojson#BLDG-001] [depth:height_massing_character] (Demolish–Renovate–Retain Strategy)

## Transport, Rail, Municipal Infrastructure, and Public Services

Traffic follows the principle of "first continuity, then connections, and finally improvements": the blue-green slow-moving spine connects the north, central, and south areas, with three east-west stitching lines addressing the Qinghe/Xuezhigarden, Wudaokou/Xuetang East Road West Gate, and Dazhongsi quadrants respectively; the conceptual central line length is [metric:road_centerline_length_m]. There are no official records for road red lines, cross-sections, phases, station capacities, and underground spaces; all lines are network relationships. [data:geometry/roads.geojson#ROAD-001]

Municipal infrastructure and New Infrastructure adopt a model of "shared data centers, edge-side priority, tiered security, maintainability, and non-disruptive operations." Edge-side computing capacity is used to reduce data offloading and real-time control latency, but energy, communication, fire safety, flood protection, electrical capacity, rail protection, and cybersecurity must be separately calculated. Public services include restrooms, drinking water, seating, mother-baby facilities, accessibility, bicycle parking, nighttime human assistance, and non-digital service paths. [depth:municipal_new_infrastructure]

![Traffic Slow Zones, Blue-Green Public Spaces, and AI Governance Gates](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

Public Space is not a "landscape decoration," but rather an infrastructure that connects talent life, community equity, cultural memory, active transportation, and AI scenarios. The model green-blue public space envelope corresponds to the three station public space envelopes as shown in [metric:green_space_area_sqm] [metric:green_ratio] [metric:public_space_area_sqm] [metric:public_space_ratio]; these are directional model values, not current green space ratios, planned green space ratios, or implementation boundaries. [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001] [depth:blue_green_public_space]

Three sacred sites are marked with contributions and public service at their core: the northern segment, "Jing-Zhang Full Stack Open Source Gate," showcases validated tools, standards, and failure records; the central segment, "Century Time Station," juxtaposes the Jing-Zhang Railway, the history of innovation and AI culture in Zhongguancun, with a verifiable timeline; the southern segment, "Urban Smart Living Room," provides citizens with experiences, corporate premieres, human consultation, and quiet rest. Components are unified with reversible foundations, low-brightness materials, maintainable elements, accessible signages, and non-digital announcement faces, prohibiting corporate advertising and grandiose mega-screen displays. The urban color palette includes railway ochre, public leaf green, technology blue, and living water blue. [source:HAIDIAN-JZ-PARK-2023] [source:QINGHUAYUAN-HERITAGE-CONTROLS-2026] [standard:MOHURD-URBAN-DESIGN-MEASURES]

## Renewal Projects, Implementation Policy, and Phasing

| ID | Project Package | Location | Concept Action | Prerequisite | Stage |
| --- | --- | --- | --- | --- | --- |
| P1 | Three Stations Data and On-Site Verification | North, Central, South 30 Points | Standardize coordinates, direction, time, source, and credibility; complete on-site data supplementation for multiple time periods | Official Boundary Interface, On-Site Permissions | 0 to 6 Months Preparation Period |
| P2 | Blue-Green and Barrier Audit for the Northern Segment | Qinghe—Xiaoyuehe—5th Ring/ Jingzhang Expressway | Shoreline Accessibility, Circumnavigation, Entry Zone, Lighting, and Basic Accessibility; Prioritize Temporary Signage and Rest Area Pilot Projects | Water Management/Urban Forestry/Transportation Data | 0–12 Months Recommended |
| P3 | Full Stack Validation Sandbox for the Northern Segment | Controlled Space Type | Controlled Testing Protocols and Exit Mechanisms for Synthetic Data, Edge Devices, and Low-Speed Robots | Site Responsibility, Safety, and Fire Compliance | 6-18 Months Recommended |
| P4 | Near-School Public Innovation Ring in Wudaokou | Dongsheng Building—Wudaokou—Site Park—Tsinghua East Road West Entrance | Shared Services, Nighttime Lighting, Bike Parking, Accessibility and Public Learning Nodes | Station Entrance Road Campus Entry Verification | 0–18 Months Recommended |
| P5 | Centuries of Time and Public Knowledge | Background of the Ruins Park/Former Tsinghua Garden Station | Railways—Zhongguancun—AI Three-Layer Narrative, Traceable Contribution Archive, and Reversible Exhibition | Preservation Controls, Content, and Copyright Review | 6-24 Month Recommendation |
| P6 | Dazhongsi 300-Meter Shuttle Audit | Dazhongsi Station Project-Level Context | Quadrants, Station Exit, Bus Stop, Non-Motorized Vehicle, Pedestrian Net Width, and Construction Status Reconciliation | Project-Level Road at the Station + On-Site Counting | 0-6 Month Preparation Period |
| P7 | Lower Segment Shared Layer and Quiet Interface | Types of Space Around Rail Station Areas | Propose Shared Layer, Quiet Rest Area, and Youth Nighttime Services Performance Requirements | Noise and Vibration, Property Rights Fire Safety, and Rail Protection | 6-24 Months Suggested |
| P8 | Annual Open Scenario and Global Community | Three Zones and Two Wings Operations Network | Release Public Issues, Open Recruitment, Controlled Testing, Resident Reviews, Third-Party Audits, and Exit Reports | Procurement Ethical Data Rules | Continuous Operations Recommendations |

Phasing is not an engineering commitment, but a decision gate: Phase One will complete the evidence base and reversible pilot for three stations; Phase Two will form the blue-green network and controlled sandbox after responsibilities and specialized conditions are clarified; Phase Three will enter professional district deepening after the official base map, control plan, ownership, traffic, municipal, and other cultural resource control documentation, as well as the old Tsinghua Garden station control graphics and site data, are in place. [data:geometry/phasing.geojson#PHASE-001] [metric:phase_1_area_sqm] [metric:phase_2_area_sqm] [metric:phase_3_area_sqm] [depth:renewal_project_list] [depth:phasing_implementation]

Annual operations follow a "Four Seasons Accounting Book": Spring Open Source Co-Creation Week, Summer Urban Real Problem Challenge, Autumn Global AI Public Forum, Winter Annual Audit and Failure Case Exhibition; public issues, data boundaries, evaluations, complaints, and exit records are transparent. The talent and enterprise transformation pathway is "Visit—Problem Claiming—Small-Scale Testing—Third-Party Evaluation—Procurement or Marketization," with each step allowing for a stop. No commitment is made regarding the number of investments, investment amounts, policy funds, or event outcomes. [source:AGENT-TASKBOOK]

## Metrics, Area Recalculation, and Compliance Matrix

Metrics are divided into three categories: official announced approximate values are used to indicate the scale of the task; directional geometric model values are used to check the internal relationships within the scheme; and values lacking statutory or on-site evidence are kept as unknown. All geometric areas and lengths are recalculated in EPSG:4548, with HTML core metrics using `data-metric` and `data-value` corresponding to JSON. [depth:metrics_recalculation]

Key Area Relationships: The overall design model covers approximately 11.4 square kilometers; the three key areas are constrained by land use values of about 192.1, 104.3, and 72.0 hectares respectively; the ratio of model green spaces and Public Spaces is only used for comparing public interest investments and is not a planning indicator. The land use code area index, phased area, and node counts are all recalculable in `metrics.json`. Known complete index of indicators:

[metric:site_area_sqm] [metric:announced_site_area_sqm] [metric:building_footprint_area_sqm] [metric:building_density] [metric:green_space_area_sqm] [metric:green_ratio] [metric:public_space_area_sqm] [metric:public_space_ratio] [metric:road_centerline_length_m] [metric:key_area_count] [metric:zhongzhiyuan_key_area_sqm] [metric:ai_origin_key_area_sqm] [metric:dazhongsi_key_area_sqm] [metric:scenario_node_count] [metric:persona_count] [metric:sandbox_candidate_count] [metric:desk_observation_point_count] [metric:land_use_05_area_sqm] [metric:land_use_0701_area_sqm] [metric:land_use_0702_area_sqm] [metric:land_use_0802_area_sqm] [metric:land_use_0804_area_sqm] [metric:land_use_1401_area_sqm] [metric:phase_1_area_sqm] [metric:phase_2_area_sqm] [metric:phase_3_area_sqm]

![Core indicators, Evidence Chain, and task coverage](assets/figures/metrics-evidence.png)

This package covers 23 announcements and agent tasks, 5 mandatory local standards, and 15 design depths; `MOHURD-ARCH-DESIGN-DEPTH-2016` is noted as a reference gap due to the absence of official text and is not considered authoritative. [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

## Risk, Copyright, and Compliance

The current most critical professional criteria are: official three-layer scope and three key area polygons, control plans and parcels, existing buildings and ownership, roads and tracks, other cultural resource control data and park implementation lines, coordinate alignment of the official control graphics for the Tsinghua Garden Old Station, municipal fire safety and flood control, public service baselines, and three-line multi-time period on-site observations. Upon obtaining the data, it should be registered for source, license, version, coordinate system, and hash, and then the entire dataset should be replaced and recalculated, rather than merely modifying the graphics. [source:PROCESSED-FACT-PACK] [source:QINGHUAYUAN-HERITAGE-CONTROLS-2026] [depth:risk_missing_data]

This package includes five core images, HTML, and PDF that are programmatically generated from GeoJSON, metrics, matrices, and publicly available location anchor points, without embedding commercial map tiles, street view screenshots, media photos, corporate logos, or individual portraits. OpenStreetMap is used only for background anchoring and retains the ODbL attribution. Copyright and usage boundaries are detailed in `report/copyright_statement.md`.

## References and Machine Index

[source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK] [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:OSM-CONTEXT] [source:ZHONGZHIYUAN-UPDATE-2026] [source:AI-ORIGIN-AREA-2026] [source:JZ-PARK-WUDAOKOU-2019] [source:DAZHONGSI-MICROCENTER-2026] [source:DAZHONGSI-TRANSPORT-2026] [source:LINE13-NOISE-2020] [source:QINGHUAYUAN-HERITAGE-CONTROLS-2026] [source:ACCESSIBILITY-LAW-2023]

[standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

[depth:existing_conditions_diagnosis] [depth:three_level_scope_framework] [depth:overall_spatial_structure] [depth:land_use_layout] [depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish] [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure] [depth:blue_green_public_space] [depth:three_key_area_detailed_design] [depth:renewal_project_list] [depth:phasing_implementation] [depth:metrics_recalculation] [depth:risk_missing_data]

[data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] [data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLDG-001] [data:geometry/roads.geojson#ROAD-001] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/constraints.geojson#pending-data-gaps] [data:geometry/phasing.geojson#PHASE-001]
