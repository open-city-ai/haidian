---
title: "Jing-Zhang Intelligence Vein · Rail Rebirth —— Centennial Jing-Zhang AI Innovation Belt Urban Design Scheme"
author_github: "weichenleeeee123"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With the overall concept of \"Jing-Zhang Intelligence Vein,\" along the Jing-Zhang Railway Heritage Park, we propose a \"one belt, three cores, two wings, and multiple points\" spatial structure. This will translate the century-old railway cultural vein into the main axis of an AI Innovation Ecosystem: Zhongzhiyuan will carry the full-stack autonomous innovation and governance voice, Beijing AI Origin Community will carry open-source and conversion of results, and Dazhongsi will carry intelligent native new business models. Accompanying this are 14 AI scenario cards, 6 user profiles, 4 holy sites, and an annual operational system. All spatial conclusions are Conceptual Recommendations based on provisional boundaries."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-cultural-guide", "ai-health-service-navigation", "ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v0.1"
---

# Jing-Zhang Intelligence Vein · Rail Rebirth —— Centennial Jing-Zhang AI Innovation Belt Urban Design Scheme

## 0. Summary of the Proposal

This plan presents the overall concept of the "Jing-Zhang AI Pulse" (Jing-Zhang AI Pulse, abbreviated as JZAI): translating the Jing-Zhang Railway, which was overseen by Zhan Tianyou a century ago, into an innovative pulse for the global AI era. Spatially, it forms a "one belt, three cores, two wings, and multiple points" structure—Jing-Zhang Railway Heritage Park as the main axis of vitality, Zhongzhiyuan AI Independent Innovation Acceleration Area, Beijing AI Origin Community, and Dazhongsi AI Industry Agglomeration Zone as three core areas, Zhongguancun Technology Services Wing and Xiaoyue River Scenario Enablement Wing as two wings, and 14 AI scenario nodes and four holy sites as multiple points. All spatial conclusions are Conceptual Recommendations, reference plans, or content for professional teams to deepen their research, and do not constitute government-verified conclusions [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

The proposal is based on the current provisional boundaries (PROV-SITE-001) provided by the warehouse to generate the formal intake package: the Overall Design Area recalculated is 11,412,825 m² [metric:site_area_sqm], the green space ratio (conceptual) is 30.8% [metric:green_ratio], the Public Space ratio (conceptual) is 0.56% [metric:public_space_ratio], and the main axis greenway of the heritage park is 9,558 m [metric:corridor_length_m]. All three key areas, land use zones, buildings, roads, green spaces, and public space layers are generated within the provisional constraints and retain accuracy warnings in the main text, sources, assumptions, and self_check. The Official Planning Boundary must be recalculated in its entirety after its release [source:BOUNDARY-SOURCE] [data:geometry/site_boundary.geojson#SITE-001] [depth:metrics_recalculation].

![Evidence Chain and Relationship Diagram with Submission Package](assets/figures/site-overview.png)

## 1. Design Basis and Reference Materials

### 1.1 According to Levels

This plan is based on the qualification pre-review announcement for the international design scheme of the Centennial Jing-Zhang AI Innovation Belt issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources. It defines three levels of scope, three key areas, a Coordinated Research Area of approximately 43.6 km², an Overall Design Area of approximately 11.4 km², and a Key-Area Detailed Design Area of about 368.4 hectares, as well as the requirements for "the depth of Urban Design in the Regulatory Detailed Planning" and "the depth of urban design in the Integrated Planning Implementation Plan" [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]. The machine-readable enumeration, indicators, allowable design space, and validation mode are derived from `brief/site-package/` [source:SITE-PACKAGE].

The second basis is the excerpt from the open-source call for proposals aimed at global agents, which supplements ten co-creation principles, three positioning statements, five functional objectives, the Three Zones and Two Wings, six agent tasks (agent.1–agent.6), and unified boundary conditions [source:AGENT-TASKBOOK]. This plan strictly distinguishes between "Conceptual Recommendation" and "Approved Conclusions": all content related to spatial implementation is expressed as "Conceptual Recommendation/reference proposal/available for in-depth study by professional teams."

The third criterion is the professional standard local reference library: the Urban Design Management Measures (MOHURD) are used to coordinate urban design, Public Space, and style control; the Detailed Planning Compilation and Approval Measures are used to distinguish known control conditions, design recommendations, and pending confirmations; the Land and Sea Use Classification Guide is used for land code and classification terminology [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The Building Engineering Design Document Preparation Depth Regulations (2016 Edition) are in this repository as `needs_official_file` status, merely registered as a reference for depth, and are not considered as an authoritative fulfillment [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [depth:existing_conditions_diagnosis].

### 1.2 Documentation Registration and Usage Boundaries

`data/source_registry.json` This is the master control file for boundary purposes: currently registered formal available data includes 5 records, and provisional-only data includes 1 record. This plan only uses the 'Pre-qualification Notice', 'Excerpt of the Assignment', 'Urban Design Management Measures', 'Control Plan Compilation and Approval Measures', and 'Land and Sea Use Classification Guide' as formal task and professional references. `brief/site-package/geometry/provisional_boundaries.geojson` is only for AI generation, visualization, self-checking, and design discussions and must not be used as an Official Planning Boundary or for approval purposes. Precise area based on official control conclusions [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK].

`data/processed/agent_fact_pack.md` and its four CSV files are the navigation layer for this proposal: `project_scope_summary.csv` is used to establish the three-tier scope structure, `agent_task_requirements.csv` is used to check the coverage of six agent tasks, `source_use_matrix.csv` is used to determine whether the data can support formal evidence, and `missing_data_checklist.csv` is used to fill in assumptions and risks. The data processing does not replace the original sources, and the text should always refer back to `source_registry.json` with the source_id [source:PROCESSED-FACT-PACK].

### 1.3 Boundary and Area Conditions

Current official precise redlines for the three key areas official polygons have not been obtained (corresponding to missing-data list GAP-BOUNDARY-001/002), therefore this plan uses the provisional rough boundaries provided by the repository maintainer. `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` are both annotated with `geometry_role="provisional_constraint"`, `official_boundary=false`, and `boundary_precision="provisional_rough"` [data:geometry/key_areas.geojson#PROV-KEY-001]. According to the project rules, this organizational data gap does not block content scoring and will not result in deductions. After the Official Planning Boundary is released, the site boundary, key areas, land use, roads, green space, public space, buildings, phasing, and all area category indicators must be recalculated [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [depth:risk_missing_data].

## 2. Three-Level Scope Work Framework

The proposal organizes its results according to the three layers defined in the announcement, with each layer addressing different design questions and mapping them individually in the `compliance_matrix.json`:

| Level | Design Issue | Solution Approach | Data Focus |
| --- | --- | --- | --- |
| Coordinated Research Area (approximately 43.6 km²) | Organization of AI Industry Ecosystem and Future Urban Form | Establish an "Academic Pioneering—Open Source Collaboration—Enterprise Transformation—Public Experience—International Promotion" innovation chain, implementing the coordinated loop of the Three Zones and Two Wings | `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json` |
| Overall Design Area (approximately 11.4 km²) | How industrial spaces, Urban Renewal, transportation infrastructure, and urban character are depicted | "One Belt, Three Cores, Two Wings, and Multiple Points" structure + 22 land use zones + 12 roads + 3 phases of implementation | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001], [data:geometry/phasing.geojson#PHASE-001] |
| Key-Area Detailed Design Area (approximately 368.4 ha) | How to Achieve Detailed Design Depth for the Three Areas | Zhongzhiyuan/Original Point Community/Dazhongsi each form "Location + Spatial Structure + Building Update + Traffic Slow Zones + Public Space + AI Scenarios + Implementation Risks" | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

The three layers are not disjointed sets of drawings: integrated research determines the judgment on industry and urban form, and overall design translates these judgments into land use, buildings, roads, blue-green spaces, and phased layers. Key areas validate the feasibility of specific zones. The design implications of spatial structure, land use zoning, and phased layers are elaborated in [depth:overall_spatial_structure], [depth:land_use_layout], and [depth:phasing_implementation], respectively.

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## 3. Coordinated Research Area Industry and Future City Research

### 3.1 Three Key Positions and Five Major Functions

The core task of the Coordinated Research Area is to translate the "three major orientations and five major functions" specified in the announcement and task statement into actionable spatial judgments:

- Three Key Orientations: Jing-Zhang Cultural Belt, Urban AI Living Experience Belt, AI Integration Innovation Belt.
- Five functional areas: Full-Stack Independent AI Innovation System, World-Class AI Innovation Ecosystem, AI-Enabled Scenario Empowerment New Paradigm, Intelligent AI Vibrant City, AI Governance Global Discourse Power.
- Three Zones and Two Wings: Zhongzhiyuan (Full-stack Autonomous + Governance Voice), Beijing AI Origin Community (World-class AI Innovation Ecosystem), Dazhongsi (Intelligent Nativized New Business Models), Zhongguancun Technology Services Wing (Element Globalization Configuration and Capital Empowerment), Xiaoyue River Scenario Enablement Wing (Scenario Empowerment and Vibrant City).

The collaborative loop of the Three Zones and Two Wings is as follows: initiation by higher education/research source → early incubation and open-source collaboration completed in the original community → Zhongzhiyuan takes on full-stack independent innovation and security governance → Dazhongsi completes industry clustering and commercial transformation → Zhongguancun Service Wing provides capital, compliance, data elements, and international services → Xiaoyuehe Scenario Wing opens scenarios to daily life, forming a "conception—incubation—acceleration—transformation—service—experience" loop [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:overall_spatial_structure]. (Scenario Access)

### 3.2 Overall Concept and Naming System for One Belt (agent.1)

**Main Name**: Jing-Zhang AI Pulse (JZAI).

**Naming Logic**: The Jing-Zhang Railway is "China's first independently constructed mainline railway," and its core spirit is self-innovation. In the AI era, self-innovation moves from "tracks" to "code." By using "Zhi Mai" (Intelligent Vein) to correspond to "bloodline/cultural vein/innovative thread," it both preserves the historical memory of the century-old railway and expresses the life sense and connectivity of the AI innovation vein.

**Naming System** (Conceptual Recommendation, to be refined by a professional branding team):

| Level | Name | Description |
| --- | --- | --- |
| Main Brand | Jing-Zhang Zhi Mai JZAI | Primary name and domain direction for global promotion |
| Cultural Sub-brand | Jing-Zhang Centennial · Wisdom Pulse Rebirth | Cultural Heritage Narrative Line |
| Sub-brand of Industry | Wisdom Vein Innovation Belt (JZAI Innovation Belt) | Narrative Line of Industry Ecology |
| Activity Brand | Jing-Zhang AI Open Week / Zhi Mai Marathon | Annual Activity Line |
| English Slogan Direction | From Rails to Codes — Jing-Zhang AI Pulse | International Communication Slogan |

**Logo/Visual Identity Direction** (Concept): 「Track·Trace·Signal」System —— The basic form is based on double railway tracks, with a moving signal dot superimposed along the track, expressing "century-old tracks" and "future intelligent pulses"; the standard colors are Jing-Zhang Qing Green (#0E7C66), AI Electric Blue (#2563EB), and Zhongguancun Warm Orange (#F59E0B); the graphics can be extended to station signs, wayfinding, APP, event materials, and Public Space paving. All fonts, graphics, and icons are original directions, and no unauthorized trademarks or character images are referenced [source:AGENT-TASKBOOK].

### 3.3 Global AI Innovation Ecosystem Case (agent.2)

To translate the "World-Class AI Innovation Ecosystem" into a transferable mechanism, this plan selects 8 global cases for comparative study. Case information comes from public reports and general industry knowledge, serving only as background reference and mechanism inspiration, not as formal planning guidance. The sources and limitations are recorded in the `sources.json` file under the `ECOSYSTEM-CASES-BACKGROUND` entry [source:ECOSYSTEM-CASES-BACKGROUND]:

| # | Case | Core Mechanism | Transposable Action |
| --- | --- | --- | --- |
| 1 | Silicon Valley/Palo Alto,  | Universities as Innovation Hubs + Venture Capital + Open Source Culture | University-Park Pedestrian Integration, Alumni Network Operations |
| 2 | Boston Cambridge Kendall Square | Cluster of Academia, Research, and Industry + Urban Renewal Innovation District | Track-Oriented Development (TOD) Innovation Community, Industrial Public Service |
| 3 | One-North Singapore | Government-led + Mixed Use + Talent Housing | Research-Residential-Commercial Mixed Zone |
| 4 | King's Cross, London, UK | Urban Renewal of Railway Heritage District | Ruins Park + Cultural and Technology Mixed Use |
| 5 | Shenzhen River Hong Kong-Taiwan Innovation and Technology Park | Cross-Border Factor Flow + Institutional Innovation | Data Elements and Compliance Service Window |
| 6 | Hangzhou Future Science City | Large Enterprise Ecosystem + Talent Policies | Enterprise Ecosystem Chain + Talent Service Accompaniment |
| 7 | Shanghai Zhangjiang Science City | Large Scientific Facilities + R&D Aggregation | Open Testing Fields and Public Pilot Platforms |
| 8 | Paris Station F | Station Renovation + Entrepreneurial Community | Transforming the Station into a Launch/Hatch Composite Space |

Mechanisms derived from case studies are mapped to this scheme: Site Integration (Dazhongsi/Qinghua Garden) draws from Kendall Square and Station F; heritage park mixed-use draws from King's Cross; mixed-use draws from one-north; data elements and compliance services draw from the Riverstone; open testing and pilot platforms draw from Zhangjiang; enterprise ecosystem and talent services draw from the Future Technology City. These mechanisms are applied to [data:geometry/buildings.geojson#BLDG-007], [data:geometry/public_space.geojson#PUBLIC-001] and [depth:renewal_project_list], becoming project levers for further deepening.

### 3.4 Future Urban Form Research

The Coordinated Research Area should also address how AI is changing cities: remote collaboration reducing the need for commuting but increasing the demand for "third spaces"; computational power and data becoming new infrastructure; governance moving from "control" to "explainable, verifiable, and participatory." This plan therefore proposes the concept of a "composite corridor" — overlaying four functional categories (transportation, ecology, culture, and scenarios) on the main axis of the heritage park, avoiding single-function corridors; and embedding end-side computational power, data compliance, and security evaluation services within the update projects [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure].

## 4. Overall Design Area Urban Renewal and Control Detailed Urban Design

### 4.1 Spatial Structure and Land-Use Layout

The Overall Design Area adopts a "one belt, three cores, two wings, and multiple points" structure. The land use zoning is derived seamlessly from the provisional boundary (22 zones, covering the entire boundary with no overlaps or gaps) [metric:land_use_feature_count] [data:geometry/land_use.geojson#LU-GREEN-001]:

| Land Use Code | District Name | Design Implication |
| --- | --- | --- |
| 0802 Research and Development Land | Zhongzhiyuan, Yedian Community R&D Street District, Xiao Yuehe East Wing | Supports Full Stack Autonomous Innovation, Open Source Collaboration, and Technology Transfer [data:geometry/land_use.geojson#LU-016] |
| 0804 Educational Land Use | Higher Education Zhiyuan Educational Research Belt | Connecting resources from universities such as North University of China and University of Posts and Telecommunications [data:geometry/land_use.geojson#LU-013] |
| 05 Commercial and Service Industries | Dazhongsi Intelligent Native Street District, Urban AI Life Experience Commercial Street | Featuring smart terminals, content consumption, and international showcases [data:geometry/land_use.geojson#LU-002] |
| 0701/0702 Residential and Community | Southern Talent Residential Belt, Community Services | Provide talent housing and living amenities [data:geometry/land_use.geojson#LU-001] |
| 1401 Park Green Space | Jing-Zhang Relic Park Vital Axis | Cultural-Ecological-Slow Travel-Scenario Composite Corridor [data:geometry/land_use.geojson#LU-GREEN-001] |
| 0803 Cultural Land Use | Cultural Nodes such as Tsinghua Garden | Holy Sites and Cultural Display |

The land use classification follows the terminological logic of the Land Use and Sea Use Classification Guide; the zoned purposes are merely Conceptual Recommendations; the land use nature at the plot level must be based on the statutory control plan [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout].

### 4.2 Urban Renewal Overall Framework and Demolish–Renovate–Retain Strategy

The update framework follows the principle of "preserve as the main focus, update as a supplement, and build new only to make up for deficiencies": preserve the existing universities, mature communities, and cultural heritage nodes; renovate inefficient industrial spaces, dilapidated commercial streets, and idle facilities; and build new only to complement Public Spaces and service deficiencies (18 conceptual Building Footprints) [metric:building_footprint_area_sqm] [data:geometry/buildings.geojson#BLDG-001]. Due to the absence of current building data, parcel ownership, and control plan conditions (GAP-PARCEL-001, GAP-BUILDING-001, GAP-CONTROL-001), the conclusions of the demolish–renovate–retain strategy are all listed as pending confirmation items, and no block-level demolition/retention judgments are given [depth:retain_renovate_demolish] [depth:development_intensity_controls]. (Demolish–Renovate–Retain Strategy)

Building Height, Floor Area Ratio, Building Coverage Ratio, green space ratio, and setback distances have no official control values: the status of `metrics.json` entries `floor_area_ratio` and `building_height_control_m` is `unknown`, awaiting official control plan conditions; any Development Intensity references are conceptual discussions and do not constitute approved metrics [depth:height_massing_character].

### 4.3 Transportation, Railways, Utilities, and Public Services

The traffic strategy for the Overall Design Area is "one spine and three transversals with multiple points of connection": a greenway spine runs north-south (9,558 m) [metric:corridor_length_m], connecting the two wings east and west [data:geometry/roads.geojson#ROAD-002]. Connections are made at the Dazhongsi station, the Tsinghua Yuan·Wudaokou direction, and the Qinghe station direction [data:geometry/roads.geojson#ROAD-008]. The Walking and Cycling Network includes a heritage park experience pedestrian path [data:geometry/roads.geojson#ROAD-012] and a Xiao Yuehe cycling loop [data:geometry/roads.geojson#ROAD-011].

Municipal and New Infrastructure propose three directions (concepts): an endpoint computing station and public service prototype integrated with low-carbon energy; a compliant service interface for open data and scenario testing; and a rain and flood organization system combining blue and green systems with sponge cities. Road red lines, track positions, municipal pipelines, sections, and fire safety conditions are pending confirmation from official sources (GAP-ROAD-001, GAP-MUNICIPAL-001) [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure].

## 5. Detailed Design for Key Areas

### 5.1 Zhongzhiyuan AI Independent Innovation Acceleration Area (provisional 192.1 ha)

**Location**: Garden-style Full-Stack Independent AI Innovation District, tasked with advancing the "Full-Stack Independent AI Innovation System" and securing "AI Governance Global Discourse."

**Spatial Structure**: Organize a low-carbon innovation corridor along the Qinghe interface, with a shared testing plaza in the middle, and the northern and southern segments respectively hosting research and development flagship facilities and talent apartments; green spaces will carry open testing and standards governance demonstrations [data:geometry/key_areas.geojson#PROV-KEY-001].

**Architecture and Update**: The conceptual Building Footprint includes the Full-Stack R&D Flagship Building (BLDG-001), Autonomous Model Evaluation Lab (BLDG-002), Full-Stack Innovation Accelerator (BLDG-003), Open Source Standards and Governance Center (BLDG-004), and Innovation Talent Apartment (BLDG-006); the Demolish–Renovate–Retain Strategy is pending confirmation of the site [data:geometry/buildings.geojson#BLDG-002].

**Traffic Slow Zone**: Utilize the green belt along Qinghe interface and the main axis of the relic park to form a slow traffic loop, setting up connecting side streets that link to Zhongzhiyuan via the secondary arterial road.

**AI Scenario**: Autonomous Model Testing Field (S2), Safety Governance Sandbox (S3), Shared Testing Plaza (PUBLIC-005) —— among which S2 and S3 are industrial Testing and Validation Scenarios.

**Implementation Risks**: The Qinghe Blue Line control, current industrial space ownership, and control plan conditions require professional verification; the current detailed design is merely a conceptual direction [depth:three_key_area_detailed_design].

### 5.2 Beijing AI Origin Community (provisional 104.3 ha)

**Location**: On-Campus Type Technology Transfer and Talent Community, Undertaking the Role of "AI Innovation Ecosystem".

**Spatial Structure**: Organize a triangular framework with the Old Tsinghua Garden Railway Station as the cultural origin, comprising the "Origin Incubator—Open Source Collaboration Tower—Results Release Complex"; the campus, park, and district are connected through a slow-traffic network [data:geometry/key_areas.geojson#PROV-KEY-002].

**Architecture and Upgrades**: Conceptual buildings include the AI Origin Incubator (BLDG-007), Results Release Complex (BLDG-008), Near-School Transformation Hub (BLDG-009), Open Source Collaboration Tower (BLDG-010), and Tsinghua Garden AI Origin Cultural Pavilion (BLDG-011).

**Traffic Slow-Moving**: Establish original community slow-moving connection lines (ROAD-007) with the Tsinghua Garden · Wudaokou Station connection line (ROAD-009); Transit-Station Integration is merely a conceptual direction.

**AI Scenarios**: Open Source Release Hall (S1), Nearest School Technology Transfer Street (S6), AI Education Experience Point (S11).

**Implementation Risks**: The Wenbao control area for the Old Tsinghua Garden Station site (CONSTRAINT-001) must be adhered to. No landmark or engineering concept may exceed the preservation, green space, blue line, and traffic safety constraints; no architectural renovations may alter the ownership space [data:geometry/constraints.geojson#CONSTRAINT-001].

### 5.3 Dazhongsi AI Industry Agglomeration Area (provisional 72.0 ha)

**Location**: Urban-type Smart Economy and International Exchange District, serving as a "Smart Natively Generated New Business Form."

**Spatial Structure**: Organize quadrants of pedestrian connectivity with Dazhongsi Station as the hub; arrange a Smart Plaza in front of the station, with the southern segment hosting a flagship smart terminal and headquarters of smart industry enterprises, forming a "station-street-village" hierarchy [data:geometry/key_areas.geojson#PROV-KEY-003].

**Architecture and Upgrades**: The conceptual architecture includes the Intelligent Terminal Flagship Building (BLDG-013), the Intelligent Body Corporate Headquarters (BLDG-014), the AI Consumer Experience Commercial (BLDG-015), and the Transfer Center (BLDG-016).

**Traffic Slow Zone**: The Dazhongsi station shuttle line (ROAD-008) and the transverse secondary road (ROAD-002) organize the separation of pedestrians and vehicles; the quadrants pedestrian connectivity is a Conceptual Recommendation, with engineering feasibility pending professional review [data:geometry/roads.geojson#ROAD-002].

**AI Scenarios**: Dazhongsi International Roadshow Living Room (S7) and Data Element Living Room (S8).

**Implementation Risks**: Site works, commercial updates, and data compliance mechanisms require confirmation by a professional team and relevant authorities; do not treat site redevelopment or commercial updates as fixed arrangements.

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

## 6. AI Innovation Ecosystem, Talent Profile, and AI-Enabled Scenario

### 6.1 Six Major User Profiles

| Image | Typical Needs | Spatial Response | Data and Privacy Boundaries |
| --- | --- | --- | --- |
| Open Source Developer | Release, Collaborate, Test, Community Reputation | Origin Open Source Release Hall, Public Code Wall, Nighttime Collaboration Space | Do not collect individual behavior trajectories, activity data only aggregated and statistically summarized [metric:persona_count] |
| Startup Team | Low-Cost Office, Computing Power Entry Point, Product Test Bed | Zhongzhiyuan Shared Test Bed, Edge Computing Power Station, Compliance Consultation | Computing Power and Data Services Require Separate Authorization |
| Key Corporate Visitors | Exhibitions, Business, International Reception, Talent Recruitment | Dazhongsi International Roadshow Living Room, Site Shuttle, Public Space | Corporate Identity and Case Studies Must Clear Rights |
| Surrounding Residents | Commuting, Leisure, Community Services, Low-Impact Updates | Heritage Park Pedestrian Loop, Embedded Community Services, Activity Tiering | Do Not Use Resident Profiles for Commercial Recommendations |
| College Students and Faculty | Result Transfer, Cross-Institution Collaboration, Daily Slow Travel | Campus-Park Slow Travel Integration, Result Transfer Kiosks, AI Education Experience Points | Campus Data and Research Results Require Authorization |
| International Talent | Language Services, International Community, Global Event Participation | Bilingual Signage, International Roadshows, Annual Open Week | International Communication Materials Require Authorization and Compliance Review |

### 6.2 14 scenario cards for AI (including 3 scenario cards for industrial testing and validation) (Testing and Validation Scenario)

Testing and Validation Scenario requirements call for at least 10 scenario cards, 3 industrial testing and validation scenarios, and 5 user profile categories; this solution provides 14 scenario cards, among which S2, S3, and S10 are industrial testing and validation scenarios [source:AGENT-TASKBOOK] [metric:ai_scenario_node_count] [metric:ai_test_scenario_count].

| ID | Scenario Card | Spatial Carrier | Service Target | Data and Verification Boundaries | Operational Subject Direction |
| --- | --- | --- | --- | --- | --- |
| S1 | Open Source Gallery | Origin Community [data:geometry/public_space.geojson#PUBLIC-002] | Developers/Startup Team | Aggregate Statistics; Manual Review of Content | Community Operations + Enterprise Co-construction |
| S2 | Autonomous Model Testing Field (TEST) | Zhongzhiyuan [data:geometry/public_space.geojson#PUBLIC-005] | Research Institutes/Enterprises | Authorized Use of Test Data; Results Subject to Verification | Professional Testing Institution + Park |
| S3 | Safety Governance Sandbox (TEST) | Zhongzhiyuan | Governance Institution/Enterprise | Red Team Testing Requires Authorization; Full Traceability | Governance Platform + Professional Team |
| S4 | Side-End Computing Hub | Along the Main Axis Node | Residents/Developers | Quota Management for Computing Power; No Collection of Personal Data | Operator+Community |
| S5 | AI Slow Travel Navigation | Heritage Park Main Axis | Residents/Visitors | Low-Intrusion Sensors; Does Not Track Individuals | Municipal Operations + Developers |
| S6 | Neighborhood for Near-School Technology Transfer | Origin Community | University Students and Faculty | Display of Research Results after Authorization | University Technology Transfer Office |
| S7 | Dazhongsi International Roadshow Living Room | Dazhongsi [data:geometry/public_space.geojson#PUBLIC-001] | Leading Enterprises/International Visitors | Content Compliance Review; Authorization for Event Records | Exhibition Operations + Park Management |
| S8 | Data Element Living Room | Dazhongsi | Data Enterprises/Law Firms | Compliance, Authorization, Auditable | Data Service Providers+Regulatory Collaboration |
| S9 | AI-Living Service Sample Street | Southern Living Zone | Residents | No Collection of Health/Location Profiles | Community Commerce + Service Providers |
| S10 | Robot Delivery Community Pilot (TEST) | Southern Community/Industrial Park | Residents/Enterprises | Speed and Area Limits, Manual Takeover, Event Tracing | Robot Operator + Community |
| S11 | AI Education Experience Point | Near Universities | Students/Public | Content Clarity; Protection of Minors | University + Non-Profit Organization |
| S12 | Honor Wall for Contributors | Heritage Park | Global Developers | Display Contributor Authorization Information | Foundation/Community |
| S13 | Smart Connected Shuttle Demonstration Line | Northern Segment of the Main Axis | Commuters | Safety Supervision; Data Desensitization | Traffic Operations + Auto Manufacturers |
| S14 | Jing-Zhang AI Open Week Route | A Public Space System | Global Participants | Activity Data Aggregation Statistics | Activity Operations Team |

### 6.3 Privacy and Human Review Boundary

All AI scenarios adhere to the principles of data minimization, public sources, transparency, and Human Review: they do not collect individual behavioral trajectories, do not create unauthorized individual profiles, and do not produce decisions that cannot be manually verified; test scenarios are written as "concept pilot/awaiting approval," and must not be written as approved operations [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:risk_missing_data].

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## 7. Land Use, Building Scale, and Demolish–Renovate–Retain Strategy

The Land-Use Plan has provided 22 zoning districts in Section 4.1; The built form is expressed as a conceptual base: a total building footprint area of 144,875 m² [metric:building_footprint_area_sqm], which includes research and development, laboratories, incubators, offices, mixed-use, education, residential, talent apartments, community services, commercial, and cultural spaces. Transit Integration 12 Conceptual Functions [data:geometry/buildings.geojson#BLDG-013]. Building Height, massing, roof form, and façade character are controlled in terms of [depth:height_massing_character] (with low profiles along the main axis of the heritage park and moderate landmarking at core nodes), but all numerical values are pending in the official control plan.

The Demolish–Renovate–Retain Strategy uses a "classified management+pending review list" approach: current universities, cultural heritage nodes, and mature communities are included in the retention candidates; inefficient industrial spaces and old commercial areas are included in the renovation candidates; nodes for supplementing public services are included in the new construction candidates; specific conclusions for each plot are based on the parcel, current baseline data, and control plan [depth:retain_renovate_demolish].

## 8. Transportation, Railways, Utilities, and Public Services Facilities

The design judgment for traffic organization is "one spine and three transversals with multiple points of connection": the Greenway Main Spine (ROAD-001) bears the north-south through function for pedestrian and scenario integration, corresponding to [data:geometry/roads.geojson#ROAD-001]; Dazhongsi Transversal Secondary Road (ROAD-002), Yuandian Community Transversal Secondary Road (ROAD-003), and Zhongzhiyuan Transversal Secondary Road (ROAD-004) connect the eastern and western wings to the main axis; the connection lines from Dazhongsi Station, Tsinghua Garden-Wudaokou direction, and Qinghe Station direction (ROAD-008/009/010) transform the rail transit stations into district gateways. The Eastern Xiao Yuehe Cycling Loop (ROAD-011) and the Site Park Experience Footpath (ROAD-012) form a closed loop for pedestrian traffic, serving three modes of travel: commuting, leisure, and activities [metric:road_feature_count] [depth:traffic_rail_slow_parking].

The design for tracks and pedestrian access is conceptual: station integration, quadrants of pedestrian connectivity, and transfer organization should be based on official road right-of-way, track specialty plans, and traffic sections; no engineering line positions or feasibility conclusions are provided. Parking and non-motorized vehicle organization is proposed in three directions: surrounding the station with compact arrangements, sharing within the block, and tiered management on activity days, with specific capacities to be determined through a traffic specialty calculation.

Municipal and New Infrastructure propose three conceptual directions: the first, edge-side computing hubs integrated with public services and low-carbon energy, serving as a "new infrastructure prototype" for deepened pilot testing; the second, a compliant service interface for open data and scenario testing, aligning with the data element salon (S8); the third, a combination of blue-green systems and sponge cities in rain and flood organization, coordinating with the heritage park green belt (GREEN-001) and Qinghe waterfront concept segment (GREEN-002) [data:geometry/green_space.geojson#GREEN-001]. Road pipelines, fire lanes, energy loads, and municipal capacities are all listed as pending supplementary materials (GAP-MUNICIPAL-001), with the plan only providing a system recommendation without conducting pipeline relocation or engineering conclusions [depth:municipal_new_infrastructure].

Public service facility system (concept) is arranged along the main axis, comprising five types of nodes: "publication—display—demonstration—experience—honors." Talent services, intellectual property, compliance consultation, and investment and financing connection windows are deployed in key areas. Due to the lack of baseline facilities (GAP-SERVICE-001), the facility capacity and location are only used as part of the service system and pending verification list, without fabricating capacities for schools, medical facilities, and elderly care facilities [depth:traffic_rail_slow_parking].

## 9. Blue-Green Space, Public Space, and Urban Character

### 9.1 Jing-Zhang Heritage Park Vitality Corridor

The vitality corridor is centered around the railway heritage park, forming a "culture-ecology-slow travel-scenario" quadruple composite corridor: the cultural layer expresses the century-old railway memory, the ecological layer organizes a continuous green belt (conceptual green space ratio 30.8%) [metric:green_ratio], the slow travel layer connects the main spine of greenways with experience trails, and the scenario layer embeds 14 AI scenario nodes [data:geometry/green_space.geojson#GREEN-001] [depth:blue_green_public_space].

### 9.2 Public Space System and Pilgrimage Landmarks (agent.4)

The proposal includes 4 AI pilgrimage landmark/display nodes, all of which are Conceptual Recommendations and await professional refinement and approval, without conflicting with cultural heritage protection, green spaces, blue line constraints, or traffic safety regulations:

| Number | Landmark/Node | Location | Design Concept | Display Content |
| --- | --- | --- | --- | --- |
| L1 | Tsinghua Garden·AI Origin Marker | Origin Community | With the railway station memory as the origin, the marker body incorporates elements of the tracks | Jing-Zhang Railway and AI Origin Narrative |
| L2 | Agent Contributions Honor Wall | Midsection of the Ruins Park | editable digital/physical twin wall | Each year, preserve global outstanding Agents and contributors (authorized) [metric:landmark_count] |
| L3 | Open Source Achievements Gallery | Origin Community—Zhongzhiyuan Connection Segment | Open Gallery Corridor | Display of Open Source Projects, White Papers, and Achievements |
| L4 | AI Milestone Tower | Main Axis North End/Dazhongsi Portal | Vertical Landmark and Public Viewing | Global AI Milestone and Annual Events |

Public Space Component Library (Concept): Honor Display Module, Code Wall Module, Release Stage Module, Rest and Socialize Module, Barrier-Free Slow Travel Module —— designed according to principles of combinability, upgradability, and maintainability to avoid one-time trendy installations [standard:MOHURD-URBAN-DESIGN-MEASURES].

### 9.3 Urban Character

The architectural style is based on "a technological expression of historical depth": the ruins park segment emphasizes low and gentle slopes, historical materials, and the narrative of the site; the key industrial zone emphasizes clear skyline and public interfaces; the living area emphasizes community scale and vibrant streets. The control values for Building Height, massing, color, and roof treatments are pending confirmation in the detailed plan [depth:height_massing_character].

## 10. Update the project list, implementation policies, and phased plan

### 10.1 Update Project List (12 Concept Items)

| Project | Type | Location | Stage | Prerequisites |
| --- | --- | --- | --- | --- |
| P1 Dazhongsi Station Integrated Transfer Center | Transportation + Commercial | Dazhongsi | Recent | Station Project, Ownership |
| P2 AI Living Service Sample Street | District Update | Southern Living Zone | Recent | Current Baseline, Commercial Operations |
| P3 Station Front Wisdom Plaza | Public Space | Dazhongsi | Recent | Square Land Use, Traffic Organization |
| P4 Near-School Transformation Street | District Revitalization | Original Point Community | Mid-Term | University Collaboration, Cultural Heritage Control |
| P5 Origin Incubator | Industrial Carrier | Origin Community | Mid-term | Ownership, Zoning Plan |
| P6 Open Source Collaborative Tower | Industrial Carrier | Origin Community | Mid-term | Ownership, Zoning Plan |
| P7 Results Release Integrated Complex | Culture + Industry | Origin Community | Mid-term | Cultural Heritage Area, Landscape |
| P8 Intelligent Body Contribution Honor Wall | Public Culture | Ruins Park | Mid-term | Park Design and Operating Entity |
| P9 Autonomous Model Evaluation Laboratory | Industrial Carrier | Zhongzhiyuan | Long-term | Control Detailed Plan, Safety Evaluation Mechanism |
| P10 Open Source Standard and Governance Center | Industrial Carrier | Zhongzhiyuan | Long-term | Governance System, Industry Synergy |
| P11 Shared Testing Plaza | Public Space | Zhongzhiyuan | Long-term | Safety and Operations Agreement |
| P12 North End Cultural Gallery | Public Culture | Main Axis North End | Long-Term | Qinghe Blue Line, Landscape |

The project list serves as a Conceptual Recommendation; the implementation entity, funding, and policy arrangements are pending confirmation by professional teams and relevant authorities [metric:renewal_project_count] [depth:renewal_project_list].

### 10.2 Implementation Policy Recommendations (Concept)

Propose four categories of policy directions for professional teams to deepen: Scenario Access mechanisms (test field reservations, data sandbox, compliance guidance); contributor incentive systems (honors wall, annual white paper, developer points); mixed-use guidance (research-residential-commercial compatibility); low-disruption update guidance (Phased Implementation, public engagement, community consultation). All policy recommendations do not constitute government commitment [source:AGENT-TASKBOOK].

### 10.3 Phased Plan

Corresponding to `geometry/phasing.geojson` three conceptual phases [data:geometry/phasing.geojson#PHASE-001] [data:geometry/phasing.geojson#PHASE-002] [data:geometry/phasing.geojson#PHASE-003]:

- Recent Period (2026–2028): Demonstration in the Dazhongsi Area and Southern Living Zone, Initiating Station Plaza, Living Showcase Street, and Access Optimization.
- Mid-term (2029–2031): The AI Origin community and site park mid-section are integrated into a network, with the implementation of an incubator, open-source collaboration tower, results release, and honor wall.
- Long-term (2032–2035): The Zhongzhiyuan Full-stack Innovation District and the northern cultural exhibition corridor will be fully developed to enhance testing, governance, and international engagement functions.

### 10.4 Global AI Innovation Activity System and Long-term Operation (agent.6)

**Annual Activity Framework** (Conceptual Recommendation): Jing-Zhang AI Open Week (annually in May, in response to the call for submissions); Global Smart Agent Marathon (Agent Hackathon, annually in October); Open Source Results Presentation (quarterly); Jing-Zhang Culture × AI Art Festival (annually in August); International Developer Summit (annually in December). All activities are conceptual recommendations and are not definitive arrangements.

**Developer Community Operations**: Establish the Jing-Zhang Zhi Mai Developer Community (GitHub organization + offline Meetup) to accumulate community assets through contributor points, honor wall nominations, and annual whitepapers; contributor information must be displayed with their authorization.

**Scenario Access Operations**: Open test scenarios with a "reservation system + Human Review + compliance authorization"; data sandboxes adhere to data minimization principles; the scenario operation entity is primarily composed of professional teams and operational institutions, with intelligent agents providing support.

**Public Experience and Landmark Operations**: Annual updates to the Honor Wall, quarterly rotation of tour routes, and tiered management of nighttime lighting for landmarks; operations and maintenance are integrated into the Public Space management system.

**International Communication and Attraction Transformation**: With the international narrative of "From Rails to Codes," form a transformation path from "event → project → testing → pilot → promotion" through an open week, white paper, and engagement with the international developer network; all activities related to attracting investment, policy, and funding arrangements are not written as definitive commitments [depth:phasing_implementation].

## 11. Indicator System, Area Recalculation, and Standardized Matrix

### 11.1 Core Metrics Table

All area-class metrics are recomputed in EPSG:4548 from `geometry/*.geojson`, with the formulas and sources detailed in `metrics.json` [depth:metrics_recalculation]:

| Indicator | Value | Formula | Status |
| --- | --- | --- | --- |
| site_area_sqm | 11,412,825 | polygon_area(site) | known [metric:site_area_sqm] |
| green_ratio | 0.308 | green_area/site_area | known [metric:green_ratio] |
| public_space_ratio | 0.006 | public_area/site_area | known [metric:public_space_ratio] |
| green_space_area_sqm | 3,519,138 | union(green_space) | known [metric:green_space_area_sqm] |
| public_space_area_sqm | 63,400 | union(public_space) | known [metric:public_space_area_sqm] |
| building_footprint_area_sqm | 144,875 | sum(buildings) | known [metric:building_footprint_area_sqm] |
| corridor_length_m | 9,558 | length(greenway) | known [metric:corridor_length_m] |
| key_area_count | 3 | count(KEY_AREA) | known [metric:key_area_count] |
| ai_scenario_node_count | 14 | count(scenario_cards) | known [metric:ai_scenario_node_count] |
| ai_test_scenario_count | 3 | count(test scenarios) | known [metric:ai_test_scenario_count] |
| persona_count | 6 | count(personas) | known [metric:persona_count] |
| landmark_count | 4 | count(landmarks) | known [metric:landmark_count] |
| renewal_project_count | 12 | count(projects) | known [metric:renewal_project_count] |
| land_use_feature_count | 22 | count(land_use) | known [metric:land_use_feature_count] |
| road_feature_count | 12 | count(roads) | known [metric:road_feature_count] |
| floor_area_ratio | — | total_floor/site_area | unknown(pending regulation) |
| building_height_control_m | — | approved_control | unknown(pending zoning plan) |

### 11.2 Conform to Regular Grid

`compliance_matrix.json` covers requirements 1.3.1–1.5.3.3 and includes 23 mandatory tasks for agent.1–agent.6; `standard_matrix.json` covers 6 professional standards; `design_depth_matrix.json` covers 15 deliverable depth items, with all core items marked as `complete`. Self-inspection results can be found at `self_check.json`, the four stages (deterministic validation, spatial review, visualization packaging, and professional Evidence Chain) are all PASS [source:SOURCE-REGISTRY].

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

## 12. Risk, Copyright, and Compliance Statements

**Legal Basis for Documentation**: Only publicly available or cleared data have been used; no non-public planning documents, non-public spatial data, or unauthorized data have been utilized. The use of provisional boundaries is restricted and disclosed in `sources.json`, `assumptions.json`, the main text, and this figure's notes [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE].

**Copyright**: This scheme text, charts, logo direction, and drawings are AI-generated original content; no unauthorized fonts, images, trademarks, or copyrighted materials have been used. `report/copyright_statement.md` contains the copyright notice. Case information is provided for background reference, and the citation boundaries are registered in `sources.json`.

**Privacy**: AI scenarios do not collect individual trajectories or create unauthorized profiles; scene cards include data and Human Review boundaries.

**AI Responsibility**: This proposal was generated and self-reviewed by the AI Agent (Codex Agent, weichenleeeee123); final judgment and professional refinement are the responsibility of human professional teams.

**Prohibition of Boundary Crossing**: This proposal does not claim official approval, statutory zoning, engineering feasibility, investment estimates, development timeline, or government commitment; all spatial, activity, and policy content is a Conceptual Recommendation [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

**List of Missing Documentation**: Official Planning Boundary with KEY_AREA polygon, planning conditions, road red lines and sections, parcel/ownership, current building stock, cultural heritage control line, Qinghe Blue Line, municipal pipelines, traffic sections, and public service facility stock. After replacing official polygons, all area-related indicators and drawings in this package need to be recalculated according to the process in `docs/formal-submission-guide.md` [depth:risk_missing_data].

## 13. References

The verifiable references and data boundaries for this proposal are found in `data/source_registry.json` [source:SOURCE-REGISTRY], `brief/site-package/sources.json` [source:SITE-PACKAGE], and `brief/site-package/agent_taskbook.json` [source:AGENT-TASKBOOK]; professional standards local snapshots are found in `brief/site-package/standards/standards.json` [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

- `brief/site-package/design_brief.json`
- `brief/site-package/agent_taskbook.json`
- `brief/site-package/allowed_design_space.json`
- `brief/site-package/sources.json`
- `brief/site-package/geometry/provisional_boundaries.geojson`
- `brief/site-package/standards/standards.json` and `standards/references/*`
- `brief/site-package/schemas/*.json`
- `data/source_registry.json`
- `data/processed/agent_fact_pack.md` and processed CSV
- `docs/formal-submission-guide.md`
- `docs/data-workflow.md`
