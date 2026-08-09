---
title: "Jing-Zhang Smart Vein: Overall Concept and Scenario Operation Plan for the Centennial Jing-Zhang AI Innovation Belt"
author_github: "Steph-kss"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With Jing-Zhang Railway's century-old spirit of independent innovation as the vertical axis and AI full-stack innovation ecosystem as the horizontal axis, propose an overall structure of 'One Belt and Three Cores Two Wings', a naming system of 'Wisdom Source·Wisdom Confluence·Wisdom Sharing', 12 AI scenario cards, and four holy sites with a global AI innovation activity operational system; based on the provisional boundary generated, retain the precision alert and recalculate after official data release."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# Jing-Zhang Smart Vein: Overall Concept and Scenario Operation Plan for the Centennial Jing-Zhang AI Innovation Belt

## Design Basis and Source List

The formal proposal is based on the first reference to the announcement issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources titled "Qualification Pre-Review Announcement for the International Scheme of the Centennial Jing-Zhang AI Innovation Belt Urban Design" [source:OFFICIAL-ANNOUNCEMENT], and the excerpt from the task book for conducting the "Centennial Jing-Zhang AI Innovation Belt Urban Design Open Call for Urban Design" for global intelligent entities [source:AGENT-TASKBOOK]. Machine-readable references include the design task book, allowable design space, source list, enumerations, planning limits, standards, and schema from the `brief/site-package/` directory [source:SITE-PACKAGE], as well as the public data usage registration form [source:SOURCE-REGISTRY] and the processed fact navigation package [source:PROCESSED-FACT-PACK]. (Centennial Jing-Zhang AI Innovation Belt Open Call for Urban Design) The boundaries and three key areas are geometrically derived from the temporary rough boundaries recorded by the warehouse maintainers [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE], and are not to be considered as official redlines.

This plan adheres to the announcement requirements, achieving the Urban Design depth for both the Regulatory Detailed Planning and the Integrated Planning Implementation Plan. Therefore, the textual narrative does not replace the GeoJSON, criteria tables, A3 manuals, A0 exhibition boards, and HTML electronic display outcomes. This section of the Evidence Chain cites [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], [standard:MOHURD-ARCH-DESIGN-DEPTH-2016], and [depth:existing_conditions_diagnosis], to demonstrate that the proposal is organized from the announcement, Agent Task Book, professional standards, boundaries, and data package, rather than from an independent vision document.

Data usage boundary: `data/source_registry.json` records formal available, background, provisional-only, and pending review data [source:SOURCE-REGISTRY]; the Agent may not upgrade background_only or provisional_only data to official boundaries, legal zoning, formal scoring criteria, or government implementation commitments. The submitted boundary is a provisional rough boundary (`provisional_constraint`, `official_boundary=false`, `boundary_precision="provisional_rough"`), which can only be used for generating, displaying, self-checking, and design discussions; the organization's data gaps do not block content scoring, and a full recalculation must be performed after the official polygon is released [data:geometry/site_boundary.geojson#SITE-001].

![Overview of the Proposal: One Belt, Three Cores, Two Wings Structure Diagram](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal is organized according to the three layers of the defined scope: the Coordinated Research Area focuses on the AI industry ecosystem, strategic positioning, and future urban form over 43.6 square kilometers; the Overall Design Area addresses the 11.4 square kilometers surrounding the Jing-Zhang Heritage Park, forming an overall framework for Urban Renewal, industrial space layout, traffic and municipal infrastructure support, and aesthetic control; the Key-Area Detailed Design Area focuses on three areas covering 368.4 hectares for detailed design [source:OFFICIAL-ANNOUNCEMENT]. The three layers are mapped to `compliance_matrix.json` to ensure that the required tasks specified in the announcement, 1.3, 1.4, and 1.5, and the agent.1–agent.6, are covered by chapters, layers, indicators, drawings, and HTML evidence [source:PROCESSED-FACT-PACK].

The depth of the three-layer framework is constrained by [depth:three_level_scope_framework] and [depth:overall_spatial_structure], with spatial evidence based on [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#PROV-KEY-001], and task guidelines based on [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. The overall concept of this plan is "AI Pulse of Jing-Zhang": with the Jing-Zhang Heritage Park as the main axis of history and Public Space, and Zhongzhiyuan, Beijing AI Origin Community, and Dazhongsi as three innovation anchor points, and Zhongguancun Technology Services Wing and Xiaoyue River Scenario Enablement Wing as two wings, forming a "one belt, three cores, and two wings, blue-green slow travel composite ring" spatial organization [data:geometry/land_use.geojson#LU-001]. Here, "one belt" is not a new red line drawn, but rather translates the three-layer scope into a set of work methods; "three cores" correspond to three key areas; and "two wings" correspond to the "Three Zones and Two Wings" in the task book, specifically referring to the Zhongguancun Technology Services Wing and the Xiaoyue River Scenario Enablement Wing [source:AGENT-TASKBOOK].

| Level | Design Issue | Solution Approach | Data Focus |
| --- | --- | --- | --- |
| Coordinated Research Area | How can AI industry ecosystems and future urban forms be organized? | Innovation Chain: Campus Innovation Source—Open Source Collaboration—Corporate Transformation—Public Experience—International Promotion | compliance_matrix.json, standard_matrix.json |
| Overall Design Area | How should industrial spaces, updates, transportation, urban infrastructure, and aesthetic features be represented on the map? | Land use, buildings, roads, green spaces, Public Spaces, and phased layers are expressed together. | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-Area Detailed Design Area | How to Achieve Detailed Design Depth for Three Districts | Sub-item Positioning, Spatial Actions, and AI Scenarios for the Smart Source Core, Smart Convergence Core, and Smart Enjoyment Core | [data:geometry/key_areas.geojson#PROV-KEY-001] |

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Overall Concept, Naming System, and Visual Identity Direction (agent.1)

This scheme suggests a main name for the project as "**Jing-Zhang Smart Vein**" (in English **AI Pulse of Jing-Zhang**, abbreviated as **JZ-Pulse**), with the following naming system, all of which are Conceptual Recommendations for professional teams to further develop:

| Level | Suggested Name | English | Corresponding Scope | Design Rationale |
| --- | --- | --- | --- | --- |
| one-belt | Jing-Zhang Smart Vein | AI Pulse of Jing-Zhang (JZ-Pulse) | Overall Design Area | "Vein" simultaneously expresses the railway line, data flow, innovative bloodline, and urban pulse, bridging the century-old Jing-Zhang and AI dual meanings. |
| North Core | Wisdom Core · Zhongzhiyuan | Origin · Zhongzhiyuan | Zhongzhiyuan AI Independent Innovation Acceleration Area | Source of Full Stack Independent Innovation and Standard Governance |
| Core | Confluence · Origin Community | Confluence · Origin Community | Beijing AI Origin Community | Higher Education, Open Source, Capital, and Talent Convergence |
| Core South | Smart Core · Dazhongsi | Exchange · Dazhongsi | Dazhongsi AI Industry Cluster | Intelligent Native Consumption, Data Elements, and International Exchange |
| West Wing | Smart Services Wing·Zhongguancun Technology Services Wing | Service Wing | Zhongguancun Technology Services Wing | Global Configuration of Elements and Empowerment through Technology Services |
| East Wing | Smart Realm Wing · Xiaoyue River Scenario Enablement Wing | Scenario Wing | Xiaoyue River Scenario Enablement Wing | AI Scenario Access and Vibrant City Experience |

Logo and Visual Identity Direction: The core theme is the intersection of the Jing-Zhang Railway tracks in perspective (historical axis) and pulse waveforms (AI axis), complemented by the "JZ" letter combination and the brushstroke imagery of the Chinese character for "wisdom" (zhì). The primary colors are based on Jing-Zhang Blue-Grey (railway and industrial memory), Haidian Technology Blue (innovation and computational power), and signal light green (Public Space and vitality). This direction aligns with the "one belt overall concept, naming system, visual identity, and logo direction" specified in the task book [source:AGENT-TASKBOOK]. Visual assets must be cleared for use, and this section only provides the design direction, not the final brand approval [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

Three Key Orientations (Centennial Jing-Zhang Cultural Belt, Urban AI Living Experience Belt, AI Integration Innovation Belt), Five Major Functions (Full-Stack Independent AI Innovation System, World-Class AI Innovation Ecosystem, AI-Enabled Scenario Empowerment New Paradigm, Intelligent AI Vibrant City, AI Governance Global Discourse Power) and "Three Zones and Two Wings" are mapped in a coordinated loop in `compliance_matrix.json` [source:AGENT-TASKBOOK].

### Global AI Innovation Ecosystem Case (agent.2)

In response to the intelligent body task statement, provide 5–8 global AI Innovation Ecosystem cases; this proposal selects 7 cases that are comparable to the Haidian context as references (all based on publicly available materials, used as conceptual references rather than direct copies).

| Case | Location | Model | Insights for the Jing-Zhang Smart Vein |
| --- | --- | --- | --- |
| Kendall Square | United States Boston | MIT near-school innovation district, AI and life sciences cluster, redevelopment of existing spaces | Origin Community "On-Campus Technology Transfer" spatial organization reference |
| King's Cross | London, United Kingdom | Railway freight yard heritage updated into a tech district, Public Space lead | Jing-Zhang Relic Park "Heritage Revitalization + Tech Office" Most Comparable Model |
| Station F | France Paris | Railway Freight Station Redeveloped into the World's Largest Startup Incubator | Heritage Space for the Reuse Path of AI Innovation Ecosystem |
| one-north | Singapore One-North | Research Park + Living + Public Space Integration | "Research—Living—Scene" Integrated Street |
| Shenzhen Bay Technology Ecological Park | Shenzhen, China | Integration of Industry and City, Headquarters + Services + Ecological Integration | Proportional Reference for Industrial Space and Service Accompaniments |
| Hangzhou Future Science City | China Hangzhou | Special Talent Zone+Scenario Access | Human Resources Policies and Scenario Access Mechanisms |
| Tokyo Marunouchi | Tokyo, Japan | long-term brand operation for rail+business+cultural operations | Reference for Long-term Branding and Event Operations Along the Belt |

Ecological Atlas (Concept): Higher education and research institutions as the source → Open-source community collaboration → Platform enterprise transformation → Public experience display → International dissemination feedback, forming a loop; `land_use.geojson` contains the spectrum of 0802 AI research and innovation land use and 1101 education and research land use on either side [data:geometry/land_use.geojson#LU-001] [data:geometry/land_use.geojson#LU-002].

### Zhongzhiyuan Full Stack Autonomous Innovation System and Elements Mechanism

Zhongzhiyuan organizes space around the "model—computing power—data—standard—security" full-stack chain: research and development land accommodates model training and evaluation, Public Spaces host standard-setting workshops and security governance demonstrations, and green spaces feature low-carbon computing power experiences [data:geometry/green_space.geojson#GREEN-001]. The elements mechanism (land, space, industry, capital, talent, computing power, data, scenarios) is proposed in a Conceptual Recommendation format, which does not constitute a recruitment or fiscal commitment [source:AGENT-TASKBOOK]. The AI Origin community builds an "near-campus innovation—technology transfer—talent special zone—open-source system" ecosystem [data:geometry/key_areas.geojson#PROV-KEY-002].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The Overall Design Area requires the depth of Regulatory Detailed Planning in Urban Design: this scheme proposes an "one belt, three cores, two wings" overall spatial structure, identifies inefficient spaces along the archaeological park line, forming an update project list and implementation policy recommendations [depth:land_use_layout] [depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish]. `geometry/land_use.geojson` is used to topologically cover the submission boundary with no gaps or overlaps [data:geometry/land_use.geojson#LU-001], `geometry/buildings.geojson` represents the conceptual base for the update objects surrounding the three cores [data:geometry/buildings.geojson#BLDG-001], `geometry/roads.geojson` expresses the north-south main axis and east-west stitching [data:geometry/roads.geojson#ROAD-001], and `metrics.json` recalculates the core area and proportions [metric:site_area_sqm] [metric:land_use_patch_count].

Land use classification based on [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]: AI R&D and Innovation Land Use (0802) is arranged around the Intelligence Source Core and the Intelligence Cluster Core, while Industrial Services and Commercial Land Use (05) is arranged around the Intelligence Enjoyment Core and the Seam Line. Residential communities and supporting land use (0702) are located on the west side, and park green spaces (1401) form the main axis of the heritage park [data:geometry/land_use.geojson#LU-001]. The management of Building Height, massing, facade, and architectural style is handled by [depth:height_massing_character], and the Demolish–Renovate–Retain Strategy is managed by [depth:retain_renovate_demolish]. Due to the absence of official control plans, road red lines, ownership data, and current building information, this plan does not provide Floor Area Ratio, building height, or Demolish–Renovate–Retain Strategy conclusions; all are listed as pending confirmation items for the formal control plan [metric:floor_area_ratio]. Building Footprint Area [metric:building_footprint_area_sqm] and quantity [metric:building_count] are concept indicative values with a confidence level of low.

Transport, rail, municipal, and supporting facilities: Around the Jing-Zhang Heritage Park ring road node, Wudaokou, Qinghua East Road West Mouth, Dazhongsi Station, and the vicinity of key enterprises, propose strategies for Transit-Station Integration, road micro-circulation, connectivity of pedestrian gaps, and concepts for parking and New Infrastructure [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure]; maintain the road and pedestrian layers within the submission boundary [data:geometry/roads.geojson#ROAD-001] [data:geometry/public_space.geojson#PUBLIC-001], and consider all road red lines, pipelines, and municipal capacities as conditions to be confirmed.

## Detailed Design of Key Areas

Three key areas have reached the level of detailed design, differentiated by their positioning as the "Wisdom Core—Wisdom Hub—Wisdom Sharing Core" [depth:three_key_area_detailed_design], with spatial evidence references [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] (Provisional Boundary; official polygon to be replaced upon release).

| Key Area | Design Positioning | Spatial Actions (Conceptual Recommendation) | AI Industry and Operational Scenarios |
| --- | --- | --- | --- |
| Smart Core · Zhongzhiyuan AI Independent Innovation Acceleration Area | Garden-Type Full-Stack Independent Innovation Street District | Strengthening Qinghe Interface and Promoting Low-Carbon Innovative Interaction; Green Spaces for Open Testing and Standards Governance Display [data:geometry/green_space.geojson#GREEN-001] | Autonomous Model Evaluation Sandbox, Standards Development Workshop, Security Governance Display, Low-Carbon Computing Experience |
| Smart Hub · Beijing AI Origin Community | On-Campus Type Conversion and Talent Community | Campus—Park—Street Slow Travel Integration; Complementing Result Release, Talent Services, and Open Source Collaboration Spaces [data:geometry/buildings.geojson#BLDG-003] | Open Source Community, Result Release Hall, Talent Special Zone Services, On-Campus Incubation |
| Smart Core · Dazhongsi AI Industry Cluster | Urban-Type Intelligent Economy and International Exchange District | Dazhongsi Station Integration, Quadrant-Based Pedestrian Connectivity, and Update of Public Spaces Around Key Enterprises and Commercial Services [data:geometry/public_space.geojson#PUBLIC-003] | Intelligent Bodies and Intelligent Terminal Display, Content Consumption, Data Elements, and International Roadshows |

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

Three key areas' public nodes are located at Wisdom Square [data:geometry/public_space.geojson#PUBLIC-001], Wisdom Integration Square [data:geometry/public_space.geojson#PUBLIC-002], and Wisdom Enjoyment Square [data:geometry/public_space.geojson#PUBLIC-003], and are cross-referenced with phased developments [data:geometry/phasing.geojson#PHASE-001] and conceptual buildings [data:geometry/buildings.geojson#BLDG-001]. The HTML page allows for switching views to see the three key areas, while the A3 booklet and A0 panels include the overall plan, detailed drawings, and performance indicators for the key areas.

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### User Profiles (agent.3, at least 5 categories)

| User Profile | Typical Needs | Spatial Response | Self-Check Boundary |
| --- | --- | --- | --- |
| Open Source Developer | Release, Collaborate, Test, Community Reputation | Origin Community Open Source Release Hall, Public Code Wall, Nighttime Collaboration Space | No personal behavior tracking; activity data only used for aggregate statistics |
| Founding Team | Low-Cost Office, Computing Power Entry Point, Product Test Bed | Zhongzhiyuan Shared Testing Ground, Edge Computing Power Service Point, Standard Governance Consultation | Computing Power and Data Services Require Separate Authorization |
| Key Corporate Visitors | Exhibitions, Business, International Reception, Talent Recruitment | Dazhongsi International Roadshow Living Room, Trackside Station Connections, Corporate Surrounding Public Spaces | Clear Rights for Corporate Identifiers and Case Studies |
| Surrounding Residents | Commuting, Leisure, Community Services, Low-Impact Updates | Jing-Zhang Heritage Park Pedestrian Loop, Community Services Embedded, Tiered Nighttime Lighting | Do Not Use Resident Profiles for Commercial Recommendations |
| College Students and Faculty | Technology Transfer, Cross-Institutional Collaboration, Daily Active Transportation | Campus-to-Parkway Active Transportation Linkage, Technology Transfer Kiosks, AI Education Experience Points | Campus Data and Research Results Require Authorization |
| International Visitors and Developer Community | Global Events, Urban Experiences, Content Dissemination | SmartMesh Route Guidance, Multilingual Information, Public Routes for the Festival Week | Foreigner Information Handling Complies with Data Outbound and Privacy Rules |

### AI Scenario Cards (agent.3, at least 10 cards; this proposal includes 12 cards)

| Scenario Card | Spatial Carrier | Design Description |
| --- | --- | --- |
| 01 Open Source Release Hall | Beijing AI Origin Community [data:geometry/public_space.geojson#PUBLIC-002] | Result Presentation, Code Contribution Display, and Small Scale Pitch Session |
| 02 Safety Governance Sandbox | Zhongzhiyuan · Zhizyuan Core | A Visitable Collaboration Node for Standard Development, Safety Assessment, and Model Red Team Testing |
| 03 Edge Side Computing Kiosks | Overall Design Area Node | Prototype of New Infrastructure Combining Public Services + Low-Carbon Energy + Edge Side Computing (To Be Deepened) |
| 04 AI Slow Travel Navigation | Jing-Zhang Relic Park Vitality Belt | Explainable Signage and Low-Intrusion Sensing to Identify Slow Travel Discontinuities and Accessibility Needs |
| 05 Dazhongsi International Roadshow Living Room | Smart Core · Dazhongsi | Display, Negotiation, and International Exchange for Smart Bodies, Smart Terminals, and Content Consumption Enterprises |
| 06 Qinghe Low-Carbon Innovation Corridor | Zhongzhiyuan Along Qinghe River [data:geometry/green_space.geojson#GREEN-001] | Green Space, Rainwater Management, Pedestrian and Bicycle Paths, and AI Demonstration Composite |
| 07 Near-School Conversion Street | Beijing AI Origin Community | Incubation, Exhibition, Legal, Intellectual Property, and Financing and Investment Services |
| 08 Data Elements Living Room | Smart Core · Dazhongsi | A data element circulation service interface premised on compliance, authorization, and auditability |
| 09 AI-Enabled Living Services Sample Street | Intersection of Community and Commerce | Small-Scale Neighborhood Street for AI-Enabled Scenarios in Healthcare, Education, Legal Services, and Living Services |
| 10 Global AI Activity Week Route | Public Space System | A Walkable Experience Route from Heritage Culture → Open Source Community → Industry Display → International Pitching Event |
| 11 Demonstration Line for Low-Speed Robot Delivery | Smart Enjoyment Core Block and Xiaoyue River Scenario Enablement Wing | Street for Co-Existence of Autonomous Delivery and Low-Speed Robots (Testing and Validation Scenario) |
| 12 Smart Native Consumption Pop-Up Spaces | Dazhongsi Station Area | Quarterly Pop-Up and Permanent Experiences for Smart Terminal and Content Consumption |

### Testing and Validation Scenario for Industry (agent.3, at least 3 instances)

| Test Scenario | Location (Concept) | Verification Content | Boundaries and Human Review |
| --- | --- | --- | --- |
| T-01 Model Evaluation and Standard Sandbox | Zhongzhiyuan | Model Capability Evaluation, Security Red Team, Standard Workshops | Public Data, Human Review; Does Not Involve Unauthorized Data |
| T-02 Low-Speed Delivery and Robot Co-Existence | Smart Core · Dazhongsi and Xiaoyuehe Wing | Low-Speed Autonomous Delivery, Robot Co-Existence, Obstacle Avoidance, and Scheduling | Closed or Gradually Opened Road Segments, Safety Officer Verification |
| T-03 Traffic Slow Travel AI Assessment | Jing-Zhang Heritage Park Alongline | Identification of Slow Travel Discontinuities, Transfer Inconveniences, and Accessibility Gaps | Data Minimization, No Output of Personal Profiles [source:AGENT-TASKBOOK] |

AI scenarios applied to spatial and governance boundaries: the Public Space scenario references [data:geometry/public_space.geojson#PUBLIC-001], the active transportation and traffic scenario references [data:geometry/roads.geojson#ROAD-001], and the open space scenario references [data:geometry/green_space.geojson#GREEN-001] and [metric:public_space_ratio] and [metric:green_ratio]. The scenario-space-operation mapping, privacy boundaries, and Human Review mechanisms are written into `compliance_matrix.json`. Do not write immature technologies as fully deployable, and do not write test scenarios as approved operations [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land-Use Plan based on [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], forming a complete, closed, and seamless land-use zoning [data:geometry/land_use.geojson#LU-001]. The architectural plan distinguishes between retained, renovated, updated, and new construction, as well as pending objects, at the conceptual hierarchy level, clarifying the suggested levels for the base, function, appearance, and mass control [data:geometry/buildings.geojson#BLDG-001]; due to the lack of current buildings, ownership, control plans, and engineering conditions, this plan does not formulate a conclusion for the Demolish–Renovate–Retain Strategy [depth:retain_renovate_demolish], but only proposes methods and a list for calibration.

The building scale and intensity metrics are consistent with those in `metrics.json`: the conceptual Building Footprint area [metric:building_footprint_area_sqm] and quantity [metric:building_count] are indicative values; the Floor Area Ratio, Building Height, Building Coverage Ratio, and setback with respect to the road red line are listed as unknown or pending_control [metric:floor_area_ratio], and should not be given fixed values to create a precise impression [standard:MOHURD-CONTROL-DETAILED-PLANNING]. The A3 document provides an updated project list and metric review table, while the A0 board expresses the key spatial structure and focus areas, with HTML providing the linkage between metrics and layers.

## Transport, Rail, Municipal Infrastructure, and Public Services

The traffic plan responds to the requirements for Transit-Station Integration, road micro-circulation, pedestrian and bicycle connectivity gaps, external traffic, parking, non-motorized vehicle parking, and the green transportation system [source:OFFICIAL-ANNOUNCEMENT]. The focus covers the areas north of the Fifth Ring Road, the Jing-Zhang Heritage Park ring-road crossing node, Wudaokou, the west end of Qinghua Donglu, Dazhongsi station, and the surrounding traffic connections of key enterprises [depth:traffic_rail_slow_parking]. Conceptual road networks express the "north-south connectivity and east-west integration" framework [metric:road_centerline_length_m] through two north-south main axes (West Line Slow Travel Convergence Axis [data:geometry/roads.geojson#ROAD-001] and East Line Rail Convergence and Industrial Service Axis [data:geometry/roads.geojson#ROAD-002]) and three east-west integration lines (North Integration Line [data:geometry/roads.geojson#ROAD-003], Central Integration Line [data:geometry/roads.geojson#ROAD-004], and South Integration Line [data:geometry/roads.geojson#ROAD-005]). The road and pedestrian layers are kept within the submission boundary and are cross-referenced with Public Spaces, green spaces, and industrial nodes. When the boundaries are submitted as provisional, the traffic conclusions are only for temporary design discussion [data:geometry/constraints.geojson#CONSTRAINTS-001].

Municipal and public service facilities cover AI industry service facilities, innovation service platforms, talent living service facilities, New Infrastructure, distributed energy, edge-side computing power, and the integration with traditional municipal facilities [depth:municipal_new_infrastructure]. When pipeline, energy, drainage, flood control, fire protection, and other engineering data are missing, they should be listed as formal deepening prerequisites and written into the `assumptions.json` and risk chapter.

## Blue-Green Network, Public Space, and Urban Character

Blue-Green Spaces are structured around the Jing-Zhang Heritage Park Vitality Belt: `green_space.geojson` expresses the three-axis green corridor for the northern segment (Intelligence Source Core), middle segment (Intelligence Convergence Core), and southern segment (Intelligence Enjoyment Core) [data:geometry/green_space.geojson#GREEN-001] [data:geometry/green_space.geojson#GREEN-002] [data:geometry/green_space.geojson#GREEN-003], addressing the travel needs of Qinghe, Xiaoyuehe, universities, and enterprises, and proposing a network of pedestrian and cycling paths integrated with green spaces [depth:blue_green_public_space]. Urban Design core evidence for blue-green Public Spaces includes [metric:green_ratio] and [metric:public_space_ratio], with green space area [metric:green_space_area_sqm] and public space area [metric:public_space_area_sqm] calculable geometrically. The urban design management requirements mandate a holistic approach to landscape appearance, public space, and building control [standard:MOHURD-URBAN-DESIGN-MEASURES].

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

### AI Pilgrimage Landmarks and Honor Display System (agent.4, at least 3 instances)

| Landmark | Location (Concept) | Design Intent | Boundaries |
| --- | --- | --- | --- |
| AI Origin Monument | Tsinghua Garden Station and Ruins Park North Segment | Public Memorial and Experience Node for the Confluence of a Centennial Railway and AI Origin | Professional Reconciliation Required When Involving Cultural Heritage and Aesthetic Control |
| Smart Pulse Bridge/Light Corridor | Jing-Zhang Heritage Park Ring Road Node | North-South Through Pedestrian Landscape Bridge with AI Light and Shadow Public Art | Bridge and Tunnel and Engineering Feasibility Are Not Within the Scope of This Solution |
| Full-stack Innovation Beacon | Wisdom Source Core · Zhongzhiyuan | Model Evaluation and Standard Release Display and Honor Node | No Fictional Operating Entity |
| Smart Enjoyment Living Room | Smart Enjoyment Core · Dazhongsi | An International Exchange Living Room for Intelligent Native Consumption and Data Element Display | Corporate Identifiers and Data Display Must Clarify Rights |

Honor Display System (Concept): Contributor Wall, Open Source Code Wall, AI Pilgrimage Passport (a participatory public experience with stamping stations), and a Public Space Component Library (standard components for signage, seating, lamp posts, information screens, and accessibility features), as open materials that can be further developed by professional teams [depth:blue_green_public_space]; no over-entertaining or vulgar landmark is to be created [source:AGENT-TASKBOOK].

## Cultural Narratives, Signage Systems, and International Communication (agent.5)

A century of Jing-Zhang culture, Zhongguancun culture, and AI new culture form a tripartite narrative of integration: **Jing-Zhang Railway** (the spirit of independent innovation carried by the Jing-Zhang Railway when it opened in 1909) → **Zhongguancun** (the innovative relay from the Electronic Street to the AI innovation hub) → **AI New Culture** (the open-source, co-creation, and human-machine collaboration era), corresponding to the "Intelligence Vein" in terms of temporal depth, spatial depth, and cultural depth [source:AGENT-TASKBOOK]. The spatial cultural system takes the site park as the main axis of the narrative, with three cores as chapter nodes, forming a story line that is walkable and transmissible; the sign and symbol system evolves from rail track symbols (historical), pulse lines (AI), and "Intelligence" symbols (integration) in three levels, clearly distinguishing itself from the overall logo system of the "Intelligence Vein" —— the cultural identification system serves the narrative of the place, while the logo serves the "Intelligence Vein" brand [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. All historical narratives are based on publicly verifiable materials, without distorting historical facts. Portraits, trademarks, paper images, and copyright materials shall not be used without authorization [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

Conceptual Recommendation suggests an international communication narrative centered on "a city of independent innovation in 1909 that is becoming a global AI pulse source in 2026," as the main external line. This should be complemented by multilingual guided tours, developer community content, and urban diplomacy activities to form a continuing source of communication assets (Conceptual Recommendation, not a communication commitment) [depth:risk_missing_data].

## Renewal Projects, Implementation Policy, and Phasing

### Update Project List (Conceptual Recommendation)

| Project Number | Project Name | Type | Main Dependencies | Evidence Reference |
| --- | --- | --- | --- | --- |
| JZ-01 | Jing-Zhang Site Park Pedestrian Connectivity Gap | Public Space/Transport | Road Right-of-Way, Underbridge Space, Traffic Organization Review | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Smart Pulse Bridge and North-South Through Node | Public Space/Landmark | Cross-Ring Road Node Project and Heritage Conditions | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | Smart Source Core · Zhongzhiyuan Qinghe Innovation Interface | Blue-Green Space/Industrial Display | river blue line, ecological and flood protection conditions | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-04 | SmartHub Core · Origin Community Near-School Conversion Street | Urban Renewal/Industrial Services | campus boundaries, ownership, first-floor uses | [data:geometry/buildings.geojson#BLDG-003] |
| JZ-05 | Smart Core·Dazhongsi Station Quadrant Walkway Connectivity | Transit-Oriented Development/Slow Mobility | Rail Station, Road Intersection, Utility Infrastructure | [data:geometry/public_space.geojson#PUBLIC-003] |
| JZ-06 | Smart Pulse Plaza System (Three Public Nodes) | Public Space | Ownership and Public Space Permit | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-07 | Model Evaluation and Standard Sandbox | New Infrastructure/Industrial Services | Computing Power, Data Compliance, Operating Entity | [data:geometry/constraints.geojson#CONSTRAINTS-001] |
| JZ-08 | Demonstration Line for Low-Speed Delivery and Co-Existence with Robots | New Infrastructure/Scenario Testing | traffic regulations, safety operation mechanisms | [data:geometry/roads.geojson#ROAD-005] |
| JZ-09 | AI Living Service Sample Street | Urban Renewal/Public Services | Business Type, Property Rights, Operating Entity | [data:geometry/land_use.geojson#LU-001] |
| JZ-10 | Global AI Activity Week Public Route | Operations/Brand | Public Space Permits, Event Safety, Copyright Clearance | [data:geometry/phasing.geojson#PHASE-001] |
| JZ-11 | Honor Display and Contributors Wall | Public Space/Brand | Content Review and Portrait Authorization | [data:geometry/public_space.geojson#PUBLIC-002] |
| JZ-12 | End-Side Computational Power and Low-Carbon Energy Service Point | New Infrastructure | Energy, Computational Power, Security, and Operational Subject | [data:geometry/constraints.geojson#CONSTRAINTS-001] |

### Global AI Innovation Ecosystem and Long-Term Operations (agent.6)

Annual Activity Framework (Conceptual Recommendation): Global AI Innovation Week (including Developer Conference, Model Evaluation Open Competition, Scenario Access Day), Quarterly Scenario Access Day, Wisdom Pulse Pilgrimage Cycling/Running, Monthly Open Source Community Meetup, and Regular International Roadshows and Urban Diplomacy Events, forming a "week-month-quarter-year" rhythm; the activity brand and communication visual system are unified with the "One Belt, One Road" logo system, without writing the envisioned activities as confirmed arrangements [source:AGENT-TASKBOOK]. Developer Community Operations Mechanism: Open Source Collaboration Space (formerly known as Origin Community Annexe), Hackathons and Contributor Honor System, Multilingual Content and Remote Participation Channels, aligning with the requirements of the "Global AI Innovation Activity Framework, Developer Community Operations, and Long-term Brand Asset Mechanisms." Scenario Access Operations Mechanism: Operate test scenarios in a sandboxed, tiered, and auditable manner, clearly defining the operational entity, responsibility boundaries, Human Review, and exit mechanisms; public experience and urban landmark operations are based on the activity week route and pilgrimage passport. International promotion and attraction conversion paths through a "content—activity—service—landing" funnel to engage global developers and talent [depth:renewal_project_list] [depth:phasing_implementation].

Phasing Plan: `geometry/phasing.geojson` for the near-term activation area (Northern Heritage Park + Core of Wisdom Sources) [data:geometry/phasing.geojson#PHASE-001], mid-term update area (Core of Wisdom Convergence and Central Seam) [data:geometry/phasing.geojson#PHASE-002], Conceptual Recommendation for the Long-term Deepening Area (Intelligence Enjoyment Core and Two Wings) [data:geometry/phasing.geojson#PHASE-003] expresses the concept in phases [metric:phase_near_area_sqm]; implementation in phases is a recommendation, pending confirmation of ownership, funding, approvals, and engineering conditions [depth:phasing_implementation]. The design period (100-day design cycle) is clearly distinguished from the implementation phases. Initially, lightweight facilities, operational activities, and service platforms will be launched, with substantial asset updates awaiting the formal control plan and municipal conditions.

## Metrics, Area Recalculation, and Compliance Matrix

The metric system covers the Overall Design Area area [metric:site_area_sqm], the number of key areas [metric:key_area_count], the ratio of green spaces and Public Spaces [metric:green_ratio] [metric:public_space_ratio], the Building Footprint [metric:building_footprint_area_sqm], the number of update projects, the slow travel connectivity metrics [metric:road_centerline_length_m], the ratio of industrial spaces and phased metrics [metric:phase_near_area_sqm], and the self-inspection status. All known metrics can be recalculated from GeoJSON under EPSG:4548 [depth:metrics_recalculation]; unknown metrics provide the reasons and formal submission prerequisites [metric:floor_area_ratio]. The results of `scripts/spatial_review.py` and `scripts/visual_review.py` are important evidence for the formal self-review.

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

The rule-based matrix is the task-responsive master control file: each of the mandatory tasks listed in Announcements 1.3, 1.4, and 1.5, as well as agents.1–agents.6, corresponds to a report chapter, layer, metric, drawing, HTML, source, assumptions, and self-check items (see `compliance_matrix.json`). Any missing mandatory task will prevent entry into formal professional scoring [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. Metrics are categorized into three types: those that can be recalculated directly from the submitted geometry; those that require official master plan controls or supporting attachments from the task book (such as Floor Area Ratio, Building Height, setbacks, etc., all marked as unknown/pending). Performance metrics that require ongoing calibration with operational or industrial data (such as activity participation rates and talent density) should be entered into `metrics.json`, `assumptions.json`, and `compliance_matrix.json` respectively, rather than writing the operational vision as approval planning conditions [depth:metrics_recalculation].

## Risk, Copyright, and Compliance

This scheme does not claim official approval, final zoning plan, ultimate land ownership, final construction scale, or guarantee implementation; all spatial implementation suggestions are "Conceptual Recommendations" and "Reference Plans" for "Further Research by Professional Teams" [source:AGENT-TASKBOOK]. The risk and missing data list is managed by [depth:risk_missing_data], cross-referenced with [data:geometry/constraints.geojson#CONSTRAINTS-001], [source:SITE-PACKAGE], [source:PROCESSED-FACT-PACK], and [standard:MOHURD-CONTROL-DETAILED-PLANNING]; official boundaries, key area polygons, zoning plans, roads, parcels, buildings, utilities, cultural heritage, and public service gaps are all included in `assumptions.json`, self-inspection, and risk chapters. Conclusions lacking official conditions are downgraded to pending confirmation items.

All images, drawings, icons, data, and code assets should be preserved.`sources.json` With `report/copyright_statement.md` Describe the source, license, and authorization status;HTML The page does not load remote scripts, remote map tiles, remote fonts, iframes, forms, or external API, do not track the reviewers' behavior [source:SITE-PACKAGE]. AI agent is responsible for the facts, sources, copyright, spatial data, indicators, and expressions; maintainers and professional reviewers may reject or require revisions based on self-inspection results, spatial review, and grid matrix requirements [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/agent_taskbook.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- brief/site-package/standards/standards.json
- brief/site-package/standards/references/
- brief/site-package/geometry/provisional_boundaries.geojson
- data/source_registry.json
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- data/processed/agent_task_requirements.csv
- data/processed/source_use_matrix.csv
- data/processed/missing_data_checklist.csv
- Machine-readable citation index: [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE], [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016], [depth:metrics_recalculation], [data:geometry/site_boundary.geojson#SITE-001], [metric:site_area_sqm]
