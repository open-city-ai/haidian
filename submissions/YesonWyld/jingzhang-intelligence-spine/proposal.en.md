---
title: "Jing-Zhang Intelligence Spine"
author_github: "YesonWyld"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "An Urban Design concept proposal with Jing-Zhang Relic Park as the main axis for historical and Public Space, Zhongzhiyuan—AI Origin community—Dazhongsi as three key focus areas for innovation anchor points, and the Smart Spine as the north-south connecting thread for pedestrian and innovation service corridors; all spatial conclusions are based on provisional rough boundaries and are expressed as Conceptual Recommendations and reference schemes. The overall calculation will be recalculated once the official polygon is completed."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.0"
---

# Jing-Zhang Intelligence Spine

> This proposal is for the submission to the Centennial Jing-Zhang AI Innovation Belt Urban Design Open Call. All spatial design recommendations are provided as **conceptual suggestions / reference proposals / for further in-depth study by professional teams**, and do not replace formal planning, nor constitute government approval or engineering implementation commitments [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The area and proportion indicators are based on rough boundaries published by the organizing party, and the boundary accuracy is limited, and should not be used as official planning boundaries or precise area references [metric:site_area_sqm]. (Centennial Jing-Zhang AI Innovation Belt Open Call for Urban Design) (Conceptual Recommendation) (Official Planning Boundary)

## Design Basis and Source List

The formal proposal is based primarily on the qualification pre-review announcement for the international Urban Design call for the Centennial Jing-Zhang AI Innovation Belt issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], and on machine-readable criteria including provisional boundaries, key areas, enumerations, indicators, and source lists as maintained in the `brief/site-package/` directory [source:SITE-PACKAGE]. The tasks for the agents are derived from the task book for the open call for the urban design of the Centennial Jing-Zhang AI Innovation Belt for global agents [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. (Centennial Jing-Zhang AI Innovation Belt Open Call for Urban Design) (Provisional Boundary)

The availability of the data is determined based on `data/source_registry.json` [source:SOURCE-REGISTRY], and is referenced in the navigation summary of the scope, tasks, data boundaries, and list of missing data in `data/processed/agent_fact_pack.md` [source:PROCESSED-FACT-PACK]: formal-ready data are used as the basis for formal scoring, while background_only / provisional_only data are only for background or temporary intake leads and shall not be upgraded to official boundary, statutory land use control, or government implementation commitments [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. (Background Only) The boundaries and focus areas used in this scheme are from `brief/site-package/geometry/provisional_boundaries.geojson`, annotated as `provisional_constraint` and `official_boundary=false` [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE].

The Evidence Chain relationship for the submission package is as follows: `proposal.md` (this document) is the sole principal proposal text; `geometry/*.geojson` and `metrics.json` are authoritative spatial and metric data; `compliance_matrix.json`, `standard_matrix.json`, and `design_depth_matrix.json` are itemized coverage evidence; `sources.json`, `assumptions.json`, and `self_check.json` are records of sources and assumptions; `assets/figures/*.png`, `report/proposal.html`, `visual/index.html`, and `drawings/*.pdf` are human-readable explanatory layers, which cannot replace the authoritative status of JSON/GeoJSON [depth:existing_conditions_diagnosis].

![Evidence Chain and Relationship Diagram with Submission Package](assets/figures/site-overview.png)

**Accuracy and Omission Statement**: The current official `SITE_BOUNDARY` and three `KEY_AREA` precise polygons are missing. The proposal generates the boundary provisionally [data:geometry/site_boundary.geojson#PROV-SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001]. Floor Area Ratio, Building Height, Building Coverage Ratio, and Green Space Ratio, among other statutory control indicators, are missing in the Rights-Cleared Material provided by the organizing party and are marked as `unknown` to be completed in the annexes of the control plan [metric:official_floor_area_ratio_control]. The organizers' data gaps do not block content scoring, but after replacing the official polygons, `land_use`, `roads`, `green_space`, `public_space`, `buildings`, `phasing`, and all metrics must be recalculated in their entirety [depth:metrics_recalculation].

## Three-Level Scope Framework

The proposal is organized into work at the three levels determined by the announcement [depth:three_level_scope_framework]:

- **Coordinated Research Area (43.6 km²)**: Extending north to the North Fifth Ring Road, east to the Jingzhang Expressway, south to West Straight Gate Avenue, and west to Wanquanhe Road. Focusing on an AI Innovation Ecosystem, supply chain coordination, and the future AI city form [source:OFFICIAL-ANNOUNCEMENT].
- **Overall Design Area (11.4 km²)**: The design scope is centered around the Jing-Zhang Heritage Park, encompassing the surrounding urban and industrial areas within a 1–2 kilometer radius. The design should establish an overall framework for Urban Renewal, layout of industrial spaces, traffic and municipal infrastructure support, and control of Urban Character, achieving the depth of a control plan [data:geometry/site_boundary.geojson#PROV-SITE-001] [metric:site_area_sqm]. (Urban Design)
- **Key-Area Detailed Design Area (368.4 ha)**: From north to south, it consists of the Zhongzhiyuan AI Independent Innovation Acceleration Area (192.1 ha), the Beijing AI Origin Community (104.3 ha), and the Dazhongsi AI Industry Cluster Area (72.0 ha) [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003].

The three-tier scope is implemented from forward-looking strategies down to the parcel scale: comprehensive research determines the innovation chain and urban form assessment; overall design translates the assessment into update projects, spatial structure, and facility bearing; key areas verify the implementability of specific parcels, buildings, transportation, Public Space, and AI scenarios [depth:overall_spatial_structure]. This plan proposes an overall concept of **"Jing-Zhang Smart Spine"** — with the Jing-Zhang Heritage Park as the historical and public space axis (Smart Spine), three key areas as innovation anchor points (Three Cores), and universities, enterprises, communities, and rail stations as daily networks (Multiple Points), forming a spatial organization of "One Axis, Three Cores, Corridor Connectivity, and a Composite Blue-Green Slow Travel System" [depth:overall_spatial_structure].

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

| Level | Design Issue | Solution Approach | Data Focus |
| --- | --- | --- | --- |
| Coordinated Research Area | How can AI industry ecosystems and future urban forms be organized? | Establish an "academic source—open-source collaboration—enterprise transformation—public experience—international dissemination" innovation chain | compliance_matrix.json, standard_matrix.json |
| Overall Design Area | Industrial Space, Urban Renewal, Transportation and Utilities, and Appearance How to Be Depicted on the Plan | Land Use, Buildings, Roads, Green Spaces, Public Space, and Phased Layers Expressed Together | [data:geometry/land_use.geojson#LU-001] [data:geometry/roads.geojson#ROAD-SPINE] |
| Key-Area Detailed Design Area | How to Achieve Detailed Design Depth for Three Areas | Propose Positioning, Spatial Actions, AI Scenarios, and Implementation Dependencies | [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] |

## Coordinated Research Area: Industry and Future City Research

The core task of the Coordinated Research Area is to construct a world-class AI Innovation Ecosystem, in response to the requirements of the "Three Zones and Two Wings" and the future AI city form [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. This plan proposes **three key positioning, five functional areas, and a coordinated loop for the three zones and two wings**:

- **Three Key Orientations**: Jing-Zhang Centennial Cultural Belt, Urban AI Living Experience Belt, AI Integration Innovation Belt [source:AGENT-TASKBOOK].
- **Five Functional Areas**: Full-Stack Independent AI Innovation System, World-Class AI Innovation Ecosystem, AI-Enabled Scenario Empowerment Paradigm, Intelligent AI Vibrant City, AI Governance Global Discourse [source:AGENT-TASKBOOK].
- **Three Zones and Two Wings**: Three key areas (AI Origin Community, Zhongzhiyuan AI Independent Innovation Acceleration Area, Dazhongsi AI Industry Agglomeration Zone) serve as the innovation entities; the Zhongguancun Technology Services Wing (factor global configuration, IP and capital empowerment) and the Xiaoyue River Scenario Enablement Wing (AI scenario empowerment and vibrant city) are the two wings working in tandem [source:AGENT-TASKBOOK].

**Naming System and Visual Identity Direction (agent.1)**: Main name "Jingzhang Intelligence Spine /  Jingzhang Intelligence Spine," where "spine" conveys the idea of the Jing-Zhang Railway Heritage Park serving as the city's historical and public space axis, and the term "spine" also echoes the north-south corridor of the Intelligent Spine. Under the naming system, three sub-names for key areas are suggested (Zhongzhiyuan · Full Stack Acceleration Core, Origin Community · AI Living Core, Dazhongsi · Intelligent Nativation Core) and twelve scene node names (refer to the Blue-Green Public Space chapter). The logo direction is suggested as "a longitudinal spine abstracted from railway ties as neural network nodes + three anchor points," using clear geometric shapes and system fonts, without any copyrighted fonts, images, trademarks, or corporate logos; this direction is only a Conceptual Recommendation for visual identity, and the final logo will be refined by a professional team and brand owner [standard:MOHURD-URBAN-DESIGN-MEASURES].

**5–8  AI Innovation Ecosystem  (agent.2)**: 1. San Francisco Bay Area,  (Industrial–Academic–Research Collaboration—Capital—High Density of Talent); 2. Cambridge, UK (University IP Conversion and Technology Services Wing); 3. Montreal, Canada (Public AI R&D and Open Ecosystem with Francophone Community); 4. Munich, Germany (Industrial AI and Engineering Culture); 5. Singapore (City-Level AI Governance and Test Beds); 6. Masdar, United Arab Emirates (Zero-Carbon Future City Form); 7. Tokyo, Japan (Robots + Urban Living Scenarios); 8. Shenzhen, China (Hardware Supply Chain and Rapid Transformation). Experiences can be translated into spatial mechanisms as follows: the "University IP—Enterprise—Capital" triad in Cambridge corresponds to the Zhongguancun Technology Services Wing; the "Test Beds + Sandbox" in Singapore corresponds to the Xiaoyue River Scenario Enablement Wing; and the "Zero-Carbon Form" in Masdar corresponds to the Blue-Green Composite Ring [source:AGENT-TASKBOOK]. The above is a readable summary of public cases and does not constitute a commitment to recruitment, investment, or policy.

**Element Assurance Mechanism**: Corresponding to the eight elements in the task document—land, space, industry, capital, talent, computing power, data, and scenarios—the scheme reserves a map layer for a mixed supply of research and development (0802), commercial (05), residential (07), and community service (0702) uses [data:geometry/land_use.geojson#LU-001]. The scenarios nodes will carry the display of computing power scheduling, open data, and public experience. The phased map layer will match the implementation rhythm [data:geometry/phasing.geojson#PHASE-001]. The specific land proportions, capital, and talent policies are expressed as deepening directions and will be confirmed with the control plan and operational scheme.

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The Overall Design Area requires the depth of Urban Design to meet the Regulatory Detailed Planning [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout]. This scheme provides the following spatial structure judgments (all of which are Conceptual Recommendations) based on the provisional boundaries as a temporary reference.

- **Spatial Structure**: With the Intelligent Spine Corridor (ROAD-SPINE) as the north-south main axis, it connects twelve scene nodes; with the horizontal pedestrian and bicycle connection streets (ROAD-X01…X15) organizing the east-west connections; and with the vertical traffic connections (ROAD-V16/V17) linking the northern Fifth Ring Road and the Jingzhang Expressway [data:geometry/roads.geojson#ROAD-SPINE] [data:geometry/roads.geojson#ROAD-X01].
- **Functional Layout**: The northern segment is focused on research and community services, the central segment on residential and community living, and the southern segment on commercial services and industrial clustering, reflecting a mix of "residential—research—commerce" and balanced employment and residence [data:geometry/land_use.geojson#LU-001].
- **Update Framework**: The existing Building Footprints (BLDG-001...) serve as the update objects. The concept of preservation, renovation, demolition, and new construction is proposed through a logical classification (refer to the Demolish–Renovate–Retain Strategy section). The update project is organized in phased layers [data:geometry/buildings.geojson#BLDG-001] [data:geometry/phasing.geojson#PHASE-001].
- **Public Space and Aesthetic Character**: With the Jing-Zhang Heritage Park Vitality Belt as the aesthetic character mainline, overlay park green spaces (1401), protective green spaces (1402), and squares (1403) to form a continuous blue-green network [data:geometry/green_space.geojson#GREEN-001].

When control plan conditions (Floor Area Ratio, height, density, green space ratio) are missing, this scheme does not provide specific values but instead indicates the spatial supply direction with a Building Footprint ratio of 0.115 and a concept total floor area of 10.48 million square meters (low confidence) [metric:building_footprint_ratio] [metric:proposed_total_floor_area_sqm] [metric:official_floor_area_ratio_control]. Related statutory indicators will be recalculated after the control plan attachments are supplemented.

## Detailed Design of Key Areas

Three key areas were based on the generation of multi-sided polygons for the provisional focus zones, with the conclusions serving as directional design [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] [depth:three_key_area_detailed_design].

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

**Zhongzhiyuan AI Independent Innovation Acceleration Area (North Segment, 192.1 ha)**: positioned as the core carrier for a full-stack independent innovation system and global voice in AI governance. The spatial structure is primarily composed of research and development land uses (0802), with nodes such as the computational theater and collaborative cloud hall arranged along the Smart Spine. The buildings focus on AI research and pilot testing, retaining the existing main structures, renovating inefficient factories, and constructing shared experimental platforms. Traffic organized with slow-moving corridors integrated with Transit-Station Integration; Public Space emphasizes open-source collaboration and developer meetups; AI scenarios focus on full-stack autonomous technology testing and governance sandbox; implementation risks are subject to ownership and engineering conditions for review, requiring a professional team to deepen [metric:key_area_zhongzhiyuan_sqm].

**Item 2: Beijing AI Origin Community (Middle Segment, 104.3 ha)**: Located as the core of "World-Class AI Innovation Ecosystem" for living and experience. The spatial structure primarily mixes residential (07) and community services (0702), with "Origin Eye" serving as an AI holy site; buildings are mainly renovated and improved, adding community childcare, health, and lifelong learning facilities; transportation emphasizes the 15-minute living circle and seamless connectivity; Public Spaces highlight AI living experiences and public education; AI scenarios focus on AI+ healthcare, education, and living services; implementation risks include resident negotiation and property rights coordination for community renewal [metric:key_area_origin_community_sqm].

**\[3\] Dazhongsi AI Industry Agglomeration Zone (South Segment, 72.0 ha)**: Located as a cluster for smart-native new business models. The spatial structure primarily mixes commercial services (05) with research (0802), catering to smart-native consumption and business scenarios; buildings are mainly focused on renovating existing commercial carriers and constructing experiential flagship spaces; traffic is enhanced with connections to Xizhimenwai Avenue and rail transit stations; Public Spaces emphasize smart-native consumption and display; AI scenarios focus on AI+ commerce, cultural consumption, and industrial testing; implementation risks are market risks for commercial vitality and business model updates [metric:key_area_dazhongsi_sqm].

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

This plan establishes a demand profile for four categories of subjects—AI talent, enterprises, residents, and public governance—and proposes operable, perceivable, and displayable AI-Enabled Scenarios (agent.3) [depth:overall_spatial_structure].

**At least 5 user persona categories**: P1 AI Researcher (requires computational power scheduling, open data, and collaborative space); P2 AI Engineer/Developer (requires open-source community, test beds, and a showcase stage); P3 Tech Companies and Entrepreneurs (requires capital, IP, and channels for scenario transformation); P4 Community Residents (requires AI+ healthcare, education, life services, and trustworthy governance); P5 City Administrators and Operators (requires Public Space management, event systems, and international communication tools).

**At least 10 AI Scenario Cards (including at least 3 Industry Testing and Validation Scenarios)**:

| ID | Scenario Card | Type | Spatial Location | Service Target | Operational Data | Privacy Boundary | Human Review | Operating Entity |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SC-01 | Smart Spine Pedestrian Navigation and Congestion Warning | Experience | Smart Spine Corridor | P4/P5 | Pedestrian Flow Density | No face recognition, only heat map aggregation | Traffic Dispatcher Review | District Operations Company |
| SC-02 | Open Source Model Community Showcase Pavilion | Living Experience | Open Source Square | P2/P3 | Model Demonstration Usage | Public Demonstration Data | Community Volunteers | Developer Community |
| SC-03 | AI+ Community Health Hub | Living Experience | AI Origin Community | P4 | Appointment and Follow-up Records | Desensitized Health Data, Local Storage | Medical Review | Community Health Center |
| SC-04 | AI+ Adaptive Learning Corner | Living Experience | Origin's Eye | P4 | Learning Trajectory (Anonymized) | Minimize Data of Minors | Teacher Review | Community Education Alliance |
| SC-05 | Intelligent Native Retail Experience Store | Industry/Life | Dazhongsi | P3/P4 | Interaction and Flow | No Personal Identity Involvement | Merchant Self-Inspection | Business Operator |
| SC-06 | Digital Twin Guided Tour of Heritage Park | Cultural Experience | Railway Memory Station | P4/P5 | Visitor Flow | Anonymous Aggregation | Conservator Review | Park Management Office |
| SC-07 | Developer Market and Pitch Stage | Community Operations | Developer Market | P2/P3 | Event Registration and Exposure | Public Materials | Community Operations | Developer Community |
| SC-08 | Urban Event Command Simulation Platform | Governance | Collaborative Cloud Hall | P5 | Event and Resource Scheduling | Intranet Isolation for Government | Commander Review | Urban Operations Center |
| **SC-09** | **Full-stack Autonomous Technology Test Bed (Validation)** | **Industrial Testing** | Zhongzhiyuan | P2/P3 | Model Accuracy/Delay | Synthetic Data Dominant | Technical Committee | Test Laboratory |
| **SC-10** | **Edge Side Computing Power Scheduling Sandbox (Validation)** | **Industrial Testing** | Computing Power Theater | P1/P2 | Computing Power Utilization | Without Personal Data | Operations Review | Computing Power Platform |
| **SC-11** | **AI Governance Compliance Sandbox (Validation)** | **Industrial Testing** | Zhongzhiyuan/Co-creation Cloud Hall | P5 | Compliance Metrics | Government Isolation | Governance Committee | Governance Institution |
| SC-12 | Public Art and Algorithmic Garden | Cultural Experience | Algorithmic Garden | P4 | Interactive Counting | No Personal Data Collection | Curator | Cultural Operations |

All scenarios adhere to the boundaries of "privacy minimization, data localization, Human Review, and shutdown capability": no over-monitoring is deployed, no non-public or personal privacy data is used, no single supplier is designated as a necessity, and test scenarios are not described as approved operations [source:AGENT-TASKBOOK]. The scenario—space—operation mapping is continuously visible in `compliance_matrix.json` and `visual/index.html`.

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The Land-Use Layout is generated based on the gridded land-use zones within the provisional boundaries, ensuring seamless full-coverage with no overlaps [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The main land-use components (based on re-calculated EPSG:4548 projection) are:

- Research and Development Land (0802): approximately 139.8 hectares; Residential Land (07): approximately 136.6 hectares; Urban Community Service Facilities (0702): approximately 40.8 hectares;
- Commercial and Service Facilities (05): approximately 65.2 hectares; Culture (0803): approximately 2.8 hectares; Education (0804): approximately 12.6 hectares;
- Town and Village Roads (1207): approximately 259.2 hectares; Parks and Green Spaces (1401): approximately 238.8 hectares; Protective Green Spaces (1402): approximately 73.0 hectares; Squares (1403): approximately 163.4 hectares;
- Empty plot (16): approximately 9.2 million sqm [metric:land_use_research_0802_sqm] [metric:land_use_residential_07_sqm].

Green spaces and squares together form the blue-green public base, with a green space ratio of approximately 0.416 and a Public Space ratio of approximately 0.143 [metric:green_ratio] [metric:public_space_ratio]. The buildings are expressed in the form of a conceptual group base: the base area is about 131.3 million square meters (base rate 0.115), and the conceptual total building scale is about 1048 million square meters (low confidence, only indicative direction) [metric:building_footprint_area_sqm] [metric:proposed_total_floor_area_sqm].

**Classification Logic for Demolish–Renovate–Retain Strategy (Conceptual Recommendation, Not Site Conclusion)** [depth:retain_renovate_demolish]: 1. Retain —— structurally sound and harmonious with the current architectural character; 2. Renovate —— existing carriers with functional mismatches but structurally viable, to be transformed into AI research, community, or experiential spaces; 3. Demolish —— inefficient buildings with severe vacancy, safety hazards, or conflicting architectural styles (merely a direction, subject to engineering and ownership verification); 4. New Construction —— supplementary buildings serving Public Spaces, scenario displays, and shared platforms. Regarding the control of Development Intensity, Building Height/size, and other parameters, this plan only provides a conceptual indication at the low, medium, and high levels for the key areas. Specific Floor Area Ratio, height, density, and green space ratio, among other statutory indicators, will be further detailed in the design phase [depth:development_intensity_controls] and [depth:height_massing_character], and do not constitute an implementation commitment [standard:MOHURD-CONTROL-DETAILED-PLANNING].

## Transport, Rail, Municipal Infrastructure, and Public Services

Traffic organization is based on the principles of "corridor connectivity, east-west integration, rail integration, and prioritizing pedestrian and cycling" [depth:traffic_rail_slow_parking] [standard:MOHURD-URBAN-DESIGN-MEASURES]:

- **Smart Spine Corridor**: A north-south oriented pedestrian and innovative service green corridor (ROAD-SPINE) that connects twelve scene nodes, serving walking, cycling, and low-speed transit [data:geometry/roads.geojson#ROAD-SPINE].
- **Horizontal Connectivity**: Several east-west oriented pedestrian and bicycle connectivity streets (ROAD-X01…X15) stitch together the adjacent blocks, addressing pedestrian and bicycle connectivity gaps [data:geometry/roads.geojson#ROAD-X01].
- **Vertical Integration**: Vertical traffic connections (ROAD-V16/V17) align with the North Fifth Ring Road (CONST-N5) and the Jingzhang Expressway (CONST-JZ) among the existing major roads. Refer to the constraints [data:geometry/constraints.geojson#CONST-N5] [data:geometry/constraints.geojson#CONST-JZ].
- **Transit-Station Integration**: The proposal puts forward a Conceptual Recommendation for the integration of pedestrian access and Public Space, specifically regarding the line positions and depth of integration which need to be coordinated with the rail transit planning. No engineering conclusions are given.
- **Urban and New Infrastructure**: Propose a direction for the integration of distributed energy, edge-side computational nodes, and traditional municipal infrastructure. Specific loads, capacities, and pipeline details are subject to professional calculations [depth:municipal_new_infrastructure] [metric:road_network_length_m].
- **Public Services**: To carry talent life services and New Infrastructure, including community services (0702), education (0804), and cultural (0803) land uses, emphasize the accessibility of AI+ public services.

The road network length is approximately 42.7 km (based on recalculated projections of the ROAD-SPINE and connecting streets), serving as a conceptual network and not replacing the right-of-way [metric:road_network_length_m].

## Blue-Green Network, Public Space, and Urban Character

Blue-Green Space is centered around the Jing-Zhang Relic Park Vitality Axis, overlaying park green spaces (1401), protective green spaces (1402), and squares (1403), forming a continuous green network and public activity network [data:geometry/green_space.geojson#GREEN-001] [depth:blue_green_public_space]. The Xiaoyue River Scenario Enablement Wing, with AI scenario enablement and vibrant city as its role, takes on the public experience path [source:AGENT-TASKBOOK].

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

**East-West Seam and North-South Throughfare (agent.4)**: Achieve north-south throughfare with the Smart Spine Corridor, and east-west seam with a horizontal pedestrian connection street. Connect three key areas, rail transit stations, communities, and the heritage park into a continuous Public Space system, avoiding being fragmented by the existing road network and ownership boundaries.

**At least 3 AI Sacred Sites (agent.4 / agent.5)**, all located at Public Space nodes, expressed as conceptual landmarks, not using copyrighted materials, and not written as approved constructions:
1. **Intelligent Spine Portal** (North End · Beside the Railway Memory Station): A portal landmark that embodies the imagery of the starting point of the Jing-Zhang Railway site, carrying the narrative of the century-old Jing-Zhang cultural belt [data:geometry/public_space.geojson#SCN-01].
2. **AI Origin Eye** (Midsection·AI Origin Community): A symbolic concave circular landmark representing an observatory and gathering place for "AI Origin Beijing," carrying the urban AI living experience [data:geometry/public_space.geojson#SCN-06].
3. **AI Pilgrimage Marker** (Along the Ridge · Algorithmic Garden—Between the Collaborative Cloud Hall): A landmark of honor to recognize contributors and open-source achievements, bearing witness to the AI Fusion Innovation Belt and global discourse authority [data:geometry/public_space.geojson#SCN-10].

**Honors Display System and Public Space Component Library (agent.4)**: The honors display system consists of "Contributor Wall, Open Source Achievements Exhibition, and Annual Honor Nodes"; the public space component library includes replicable modular waystations, variable-color signage, algorithmic garden planting modules, and low-speed docking platforms, for professional teams to standardize and deepen.

**Cultural Narrative (agent.5)**: Integrate the historical and cultural heritage of the Jing-Zhang Railway (CONST-RAIL), the innovation culture of Zhongguancun, and the new culture of AI to form a spatial cultural system that transitions from historical rail to an intelligent spine [data:geometry/constraints.geojson#CONST-RAIL]. The wayfinding, signage, and symbol system are independent of the overall logo system to avoid confusion; the urban character is based on a tone of "restraint, technology, and humanity," with the international communication narrative organized around the theme of "a Spine That Thinks."

## Renewal Projects, Implementation Policy, and Phasing

Update the project to organize phases by layer, with near, medium, and long-term phases [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation] [depth:renewal_project_list]. The following 18 categories of projects are conceptual items (renewal_project_count=18), all expressed as development directions, not government-determined arrangements [metric:renewal_project_count]:

- **Phase One (Intelligence Spine North Segment, Approximately 255.5 Thousand Square Meters)**: Zhongzhiyuan Full Stack Acceleration Core Launch, Intelligence Spine Portal and Railway Memory Station, Computational Theater and Collaborative Cloud Hall, Full Stack Autonomous Test Bed, Open Source Community Showcase Pavilion, North Segment Pedestrian and Cyclist Connectivity [data:geometry/phasing.geojson#PHASE-001].
- **Phase Two (Intelligent Spine Middle Segment, Approximately 416.1 million sqm)**: AI Origin Community Living Circle, AI Origin Eye, AI+ Health Kiosk and Learning Corner, Community Renovation and Improvement, Middle Segment Pedestrian and Public Space [data:geometry/phasing.geojson#PHASE-002].
- **Phase  (Intelligent Spine South Segment, approximately 469.6 million sqm)**: Dazhongsi Intelligent Originating Agglomeration, Developer Market, Intelligent Originating Retail Experience, South Segment Pedestrian and Commercial Revitalization [data:geometry/phasing.geojson#PHASE-003].

**Policy and Operations (agent.6)**: Propose an annual activity framework (Spring Developer Conference, Summer Open Source Week, Autumn AI Living Festival, Winter Governance Forum), activity brand and communication visual system, developer community operation mechanism, AI Scenario Access operation mechanism, public experience and urban landmark operation mechanism, and international communication and attraction conversion mechanism. All activities, recruitment, funding, and policies are presented as Conceptual Recommendations and do not constitute a determined government arrangement or commitment [source:AGENT-TASKBOOK].

## Metrics, Area Recalculation, and Compliance Matrix

Core indicators were recalculated from GeoJSON projections (EPSG:4548), with the key indicator meanings as follows [depth:metrics_recalculation]:

- **site_area_sqm≈1141.3 million ㎡**: Based on the provisional boundaries, the area will be recalculated in official polygons [metric:site_area_sqm].
- **green_ratio≈0.416**: The blue-green base supports talent living and low-carbon city districts; **public_space_ratio≈0.143**: Public Space supports innovation in social interactions and activity hosting [metric:green_ratio] [metric:public_space_ratio].
- **building_footprint_ratio≈0.115**: The Building Footprint ratio responds to the spatial supply for industry and living, not a Development Intensity conclusion [metric:building_footprint_ratio].
- **road_network_length_m≈42.7 km**: conceptual road network, not replacing the road redline [metric:road_network_length_m].
- **scenario_node_count = 12, ai_landmark_count = 3, renewal_project_count = 18**: The number of scenarios, landmarks, and renewal projects [metric:scenario_node_count] [metric:ai_landmark_count] [metric:renewal_project_count].

Complete Metrics Quick Reference (metrics.json, EPSG:4548 Recalculated): site_area_sqm [metric:site_area_sqm]; key_area_count [metric:key_area_count]; key_area_total_sqm [metric:key_area_total_sqm]; key_area_zhongzhiyuan_sqm [metric:key_area_zhongzhiyuan_sqm]; key_area_origin_community_sqm [metric:key_area_origin_community_sqm]; key_area_dazhongsi_sqm [metric:key_area_dazhongsi_sqm]; green_space_area_sqm [metric:green_space_area_sqm]; public_space_area_sqm [metric:public_space_area_sqm]; green_ratio [metric:green_ratio]; public_space_ratio [metric:public_space_ratio]; building_footprint_area_sqm [metric:building_footprint_area_sqm]; building_footprint_ratio [metric:building_footprint_ratio]; proposed_total_floor_area_sqm [metric:proposed_total_floor_area_sqm]; road_network_length_m [metric:road_network_length_m]; phase1_area_sqm [metric:phase1_area_sqm];  phase2_area_sqm [metric:phase2_area_sqm]; phase3_area_sqm [metric:phase3_area_sqm]; land_use_commercial_05_sqm [metric:land_use_commercial_05_sqm]; land_use_residential_07_sqm [metric:land_use_residential_07_sqm]; land_use_community_service_0702_sqm [metric:land_use_community_service_0702_sqm]; land_use_research_0802_sqm [metric:land_use_research_0802_sqm]; land_use_culture_0803_sqm [metric:land_use_culture_0803_sqm];  land_use_education_0804_sqm [metric:land_use_education_0804_sqm]; land_use_road_1207_sqm [metric:land_use_road_1207_sqm]; land_use_park_green_1401_sqm [metric:land_use_park_green_1401_sqm]; land_use_protective_green_1402_sqm [metric:land_use_protective_green_1402_sqm]; land_use_plaza_1403_sqm [metric:land_use_plaza_1403_sqm]; land_use_reserved_16_sqm [metric:land_use_reserved_16_sqm];  scenario_node_count [metric:scenario_node_count]; ai_landmark_count [metric:ai_landmark_count]; renewal_project_count [metric:renewal_project_count].

Coverage: `compliance_matrix.json` maps item-by-item the announcements 1.3, 1.4, and 1.5 to agents.1–agents.6; `standard_matrix.json` covers 6 professional standards (MOHURD-ARCH-DESIGN-DEPTH-2016 as data_gap); `design_depth_matrix.json` includes 16 depth entries, all complete [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

- **Legality of the Materials**: Only publicly available or Rights-Cleared Materials are used; non-public government data, corporate internal data, and personal privacy data are not included in the proposal [source:SOURCE-REGISTRY].
- **Copyright Authorization**: The logo and signage are based on the geometric concept of Qing Rights, not using any copyrighted fonts, images, trademarks, individuals, or company logos; landmarks, images, and symbols are conceptual expressions [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].
- **AI Generation Responsibility**: This proposal is generated by an AI agent and presented as an Open Co-Creation initiative. The final judgment will be made by human professionals and teams [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].
- **Official Approval/Implementation Commitment Prohibited**: All spatial implementation suggestions should be expressed as Conceptual Recommendations or reference solutions, and do not constitute government approval conclusions, engineering feasibility conclusions, or investment commitments [depth:risk_missing_data].
- **Additional Information**: Official Boundary with precise polygon of the key area, control plan statutory indicators (Floor Area Ratio/Height/Density/Green Space Ratio), existing buildings and ownership, engineering and municipal conditions [metric:official_floor_area_ratio_control] [metric:official_building_height_control_m].
- **Professional Review Requirements**: The scheme must be reviewed and recalculated as a whole by professional teams in planning, architecture, transportation, urban infrastructure, and cultural heritage preservation after the official data is in place. See `report/copyright_statement.md`.

## References

- `brief/site-package/design_brief.json` [source:SITE-PACKAGE]
- `brief/site-package/agent_taskbook.json` [source:AGENT-TASKBOOK]
- `brief/site-package/allowed_design_space.json` [source:SITE-PACKAGE]
- `brief/site-package/sources.json` [source:SITE-PACKAGE]
- `data/source_registry.json` [source:SOURCE-REGISTRY]
- `data/processed/agent_fact_pack.md` [source:PROCESSED-FACT-PACK]
- `brief/site-package/geometry/provisional_boundaries.geojson` [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]
- `brief/site-package/standards/standards.json` [source:SITE-PACKAGE]
- `brief/site-package/schemas/*.json` [source:SITE-PACKAGE]
- This submission package: `proposal.md`, `geometry/*.geojson`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`, `sources.json`, `assumptions.json`, `self_check.json`
