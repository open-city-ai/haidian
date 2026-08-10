---
title: "Jing-Zhang Smart Link: A Century-long AI Open-source Innovation Belt"
author_github: "0x-focus"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With the century-old Jing-Zhang Railway site as the cultural axis, propose an \"one track, three cores, two wings, and one ring\" AI-Native urban structure: the Jing-Zhang Smart Connection axis connects the Zhongzhiyuan, AI Origin community, and Dazhongsi three key areas. The Zhongguancun Technology Services Wing and Xiaoyue River Scenario Enablement Wing are located on the east and west sides, respectively. The Blue-Green Smart Connection Ring links 10 AI scenario nodes. All spaces are suggested as conceptual schemes for professional teams to further develop."
tracks: ["ai-traffic-walkability", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.0"
---

# Jing-Zhang Smart Link: A Century-long AI Open-source Innovation Belt

## Design Basis and Source List

This proposal is based primarily on the qualification pre-review announcement for the international Urban Design competition of the Centennial Jing-Zhang AI Innovation Belt issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources [source:OFFICIAL-ANNOUNCEMENT], and it also draws from the agent task book [source:AGENT-TASKBOOK], structured task package [source:SITE-PACKAGE], Source Registry of publicly available materials [source:SOURCE-REGISTRY], processed fact package [source:PROCESSED-FACT-PACK], source of provisional boundaries [source:BOUNDARY-SOURCE], and sources for three key areas [source:KEY-AREA-SOURCE]. (Provisional Boundary) Design judgments shall follow an "announcement task—machine-readable data—body explanation—drawings and HTML" Evidence Chain, with core standards including [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], and [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]. The depth of the results includes [depth:existing_conditions_diagnosis], [depth:three_level_scope_framework], [depth:overall_spatial_structure], [depth:land_use_layout], [depth:development_intensity_controls], [depth:height_massing_character], [depth:retain_renovate_demolish], [depth:traffic_rail_slow_parking], [depth:municipal_new_infrastructure], [depth:blue_green_public_space], [depth:three_key_area_detailed_design], [depth:renewal_project_list], [depth:phasing_implementation], [depth:metrics_recalculation] and [depth:risk_missing_data] constraints.

As of the review date for public documentation, the official precise polygon, CAD, or GIS red lines have not been publicly released: the announcement provides three layers of area and textual boundary descriptions, but the pre-qualification document package requires a download password, and the repository provides `provisional_boundaries.geojson` for the provisional rough boundaries [source:BOUNDARY-SOURCE]. This proposal therefore uses `geometry/site_boundary.geojson#SITE-001` and `geometry/key_areas.geojson#PROV-KEY-001` as provisional boundaries, and continues to annotate them throughout the text, HTML, sources, assumptions, and self-checks: the provisional boundaries can only be used for generation, display, and discussion, but not as official planning boundaries, approval references, or precise area references; the organization's data gaps do not block content scoring, and all layers and indicators must be recalculated after the official data release [depth:risk_missing_data]. (Provisional Boundary) (Official Planning Boundary)

The data usage boundaries are from `data/source_registry.json` [source:SOURCE-REGISTRY]: formal authoritative conclusions can only come from sources with `usable_for_formal="yes"`; background information only supports mechanisms and narratives; provisional data only supports generation and discussion. This plan does not use non-public data, personal privacy data, or unauthorized materials; all areas, proportions, layer counts, and distances can be recalculated from `geometry/*.geojson` and `metrics.json` [metric:site_area_sqm].

![Evidence Chain and Relationship Diagram with Submission Package](assets/figures/site-overview.png)

## Three-Level Scope Framework

The announcement defines three work levels [source:OFFICIAL-ANNOUNCEMENT]: the Coordinated Research Area covers approximately 43.6 square kilometers, the Overall Design Area covers approximately 11.4 square kilometers, and the Key-Area Detailed Design Area covers approximately 368.4 hectares. The plan establishes an "strategic layer—overall layer—key layer" progressive framework: the strategic layer addresses the AI Innovation Ecosystem, the Three Zones and Two Wings, and the future urban form; the overall layer translates the strategic vision into land use, transportation, blue-green spaces, urban appearance, and renewal projects; the key layer conducts detailed design for Zhongzhiyuan, the AI Origin community, and Dazhongsi [depth:three_level_scope_framework]. These three areas are not three separate and isolated maps, but a continuous Evidence Chain from industrial strategy to specific spatial actions. The `compliance_matrix.json` maps the announcement sections 1.3, 1.4, and 1.5, as well as agent.1-agent.6, to chapters, layers, indicators, drawings, and HTML [source:SITE-PACKAGE].

| Level | Area/Announcement | Core Issue | This Plan Answers | Data Anchoring |
| --- | --- | --- | --- | --- |
| Coordinated Research Area | 43.6 km² | How is a World-Class AI Ecosystem Organized | Five Segments of Innovation Chain—Academic Pioneering—Open Source Collaboration—Enterprise Transformation—Public Experience—International Promotion | [data:geometry/site_boundary.geojson#SITE-001], [depth:overall_spatial_structure] |
| Overall Design Area | 11.4 km² | How industry, space, transportation, and utilities are to be plotted | One Track, Three Cores, Two Wings, One Ring; Complete Zoning of Land Use, Roads, and Blue-Green Ring | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-Area Detailed Design Area | 368.4 ha | How to achieve detailed design depth for three areas | Triple-core positioning, spatial actions, scenarios, and implementation dependencies | [data:geometry/key_areas.geojson#PROV-KEY-002], [depth:three_key_area_detailed_design] |

The boundaries and area calculations of the three-layer work framework are evidenced by [metric:site_area_sqm], [metric:key_area_count], [metric:zhongzhiyuan_ai_acceleration_area_area_sqm], [metric:beijing_ai_origin_community_area_sqm], and [metric:dazhongsi_ai_industry_cluster_area_sqm]. provisional The boundary is marked in [data:geometry/site_boundary.geojson#SITE-001] with `geometry_role=provisional_constraint`, `official_boundary=false`, and `boundary_precision=provisional_rough`. Recalculate all area metrics and drawings [depth:metrics_recalculation] after replacing the official polygon.

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Overall Concept, Naming System, and Logo Direction for One Belt

This proposal introduces the main name "Jing-Zhang AI Link Belt" (Jing-Zhang AI Link Belt, abbreviated as JZ-Link), with the positioning phrase "One Century, One Rail, AI Link." The naming logic combines the "Jing-Zhang" (Jing-Zhang) century-old autonomous engineering history with the "AI Link" open intelligent network: the belt is not a new administrative line, but an organization of railway heritage sites, universities, enterprises, communities, and track stations into a perceivable AI innovation public system. The logo direction is "Two Rails, One Knot" (Two Rails, One Knot): two parallel lines represent the Jing-Zhang Railway and the human-machine data track, which intersect in the middle of the belt to form an open hexagonal node, symbolizing the open connections of data, talent, capital, scenarios, and public value; the visual system uses railway brown-gray, electric induction blue, and greenway green colors, with Chinese using modern black font and English using geometric sans-serif font, extending to signage, station name numbering, event visuals, honor walls, and digital interfaces [source:AGENT-TASKBOOK].

### Three Key Orientations, Five Major Functions, and Three Zones and Two Wings

The plan responds to the three key positioning goals of "Century Jing-Zhang Cultural Belt, Urban AI Life Experience Belt, and AI Integration Innovation Belt," and focuses on five major functions: the Full-Stack Independent AI Innovation System, a World-Class AI Innovation Ecosystem, AI-Enabled Scenario Empowerment New Paradigm, Intelligent AI Vibrant City, and AI Governance Global Discourse [source:AGENT-TASKBOOK]. Spatially, the plan adopts the "Three Zones and Two Wings" layout: the Zhongzhiyuan AI Independent Innovation Acceleration Area is responsible for full-stack independent innovation and AI governance discourse; the Beijing AI Origin Community is responsible for a world-class AI innovation ecosystem; the Dazhongsi AI Industry Cluster bears intelligent natively new business models; the Zhongguancun Technology Services Wing provides global element configuration, IP, and capital services; the Xiaoyue River Scenario Enablement Wing bears AI+ transportation, AI+ public services, and youth vitality scenarios [source:OFFICIAL-ANNOUNCEMENT].

### Global AI Innovation Ecosystem Case Studies (6 Background Cases)

To convert the "World-Class AI Innovation Ecosystem" into a transferable mechanism, this plan compiles the following public background cases (case facts must be verified with official sources during the deepening phase, and are provided for mechanism reference [depth:risk_missing_data]):

| Case | Key Mechanisms | Transformable Content |
| --- | --- | --- |
| King's Cross, London | Overall Update of the Old Railway Yard into a Knowledge-Based Mixed-Use Community | Public Space First, Railway Heritage Narrative, Mix of Educational and Technology Enterprises |
| Singapore Jurong Innovation District JID | Organized scenarios for autonomous vehicles, robotics, etc., using test beds and living labs | Scenario Access Application, Human Review, Testing—Display—Operation Closed Loop |
| Paris Station F | Large Startup Campus and Operations for Open Days and Developer Community | Public Display Interface, Annual Events, Community Points and Honors |
| Korea Banqiao Tech Valley | Mixed-use Development—Residential—Commercial Integration with Rail Transit Connectivity | Station-City Integration, Talent Living Accompaniment, Industrial Service Network |
| Toronto Quayside Experiment | Intelligent City Data Governance and Public Controversy | Data Minimization, Public Engagement, Exit Mechanisms, Human Review |
| Tokyo Shibuya/Marunouchi | Integration of Rail Station and City with Diverse Consumption, Cultural, and Corporate Interfaces | Quadrant-Based Pedestrian Connectivity, Multi-Stakeholder Governance, and International Exchange Interface |

The above mechanisms will be translated into six action principles: "Public Space First, Scenario Access, Test Bed, Developer Community, Data Governance, and Station-City Integration" [source:AGENT-TASKBOOK], and will be mapped to the overall structure, key areas, blue-green system, and long-term operation chapters [depth:overall_spatial_structure].

### Future Urban Form Research

Future AI city form is not a stack of technological devices, but rather a "verifiable public intelligent environment": the city transforms perception, computation, services, and governance into explainable, reviewable, and exitable public facilities. This proposal outlines three categories of spatial responses at the overall level: AI service zones (such as nodes [data:geometry/public_space.geojson#PUBLIC-001]), continuous blue-green Public Spaces (nodes [data:geometry/green_space.geojson#GREEN-001]), and open scenario test networks (with [metric:scenario_node_count] nodes). The targets for industrial and talent density are not fictionalized here; official statistical and recruitment data will fill in the formal talent, output value, and investment indicators [depth:risk_missing_data].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Overall spatial structure: One Track, Three Cores, Two Wings, One Ring

The overall design adopts a "one track, three cores, two wings, and one ring" structure [depth:overall_spatial_structure]:

- One Axis: Jing-Zhang Smart Connection Axis, running from Zhongzhiyuan through the AI Origin Community to Dazhongsi, is a composite main axis for heritage park, greenway, pedestrian and bicycle paths, and AI scenario sequence, corresponding to [data:geometry/roads.geojson#ROAD-001] and [data:geometry/constraints.geojson#CON-001].
- Three cores: Zhongzhiyuan = Full-stack Autonomous Innovation Acceleration Core; AI Origin Community = Open Source Ecosystem Origin Core; Dazhongsi = Intelligent Native Economic Core, corresponding to [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003].
- Two Wings: The West Wing, Zhongguancun Technology Services Wing, and the East Wing, Xiaoyue River Scenario Enablement Wing, corresponding to the research and development, community, education, and commercial zones on either side of [data:geometry/land_use.geojson#LU-001].
- Ring One: Blue-Green Intelligence Ring, organize park green spaces, waterfront corridors, and cycling paths along the inner side of the overall boundary, corresponding to [data:geometry/roads.geojson#ROAD-008] and [data:geometry/green_space.geojson#GREEN-001].

### Urban Renewal Overall Framework

Urban Renewal does not preclude the conclusion of large-scale demolition and construction but instead establishes a "preserve—renovate—rebuild—await confirmation" four-tier method framework [depth:retain_renovate_demolish]: preserve historical, educational, and public facility objects with high value; renovate industrial buildings, park environments, and community service interfaces; rebuild main axes, ring roads, station plazas, and prototypes of New Infrastructure; and list objects involving property rights, control plans, and engineering conditions as awaiting confirmation [data:geometry/buildings.geojson#BLDG-001]. Land use structure is organized according to [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], with research and development, commercial, residential, educational, road, green space, and blank spaces fully covering the boundary and without overlap [data:geometry/land_use.geojson#LU-001], with specific areas detailed in the indicators chapter.

### Control Plan Depth and Pending Confirmation Control Conditions

The scheme is organized according to the depth of Urban Design in the Regulatory Detailed Planning [standard:MOHURD-CONTROL-DETAILED-PLANNING], but the official Floor Area Ratio, Building Height, Building Coverage Ratio, Green Space Ratio, setback distances, and road red lines are not provided in the public task package [source:SITE-PACKAGE], so all are listed as pending data [depth:development_intensity_controls]. This scheme only provides the spatial structure, functional zoning, and update logic, without specifying the speculative values as definitive indicators; these must be recalculated after the formal control plan conditions are released [metric:floor_area_ratio], [metric:building_height_m], and [metric:total_floor_area_sqm].

## Detailed Design of Key Areas

### Zhongzhiyuan AI Independent Innovation Acceleration Area

Zhongzhiyuan is positioned as a "Garden-Type Full-Stack Autonomous Innovation Street District" [source:OFFICIAL-ANNOUNCEMENT], with spatial actions including: organizing R&D, computing power, testing, and standard governance functions around the national platform; strengthening the Qinghe interface to form a low-carbon public living room; organizing external transportation and the park entrance; and arranging the intelligent body sandbox, low-carbon computing power station, and AI governance deliberation hall as public test nodes that are bookable, displayable, and exitable [data:geometry/key_areas.geojson#PROV-KEY-001]. The architectural proposal suggests a primary focus on research and development land with commercial accompaniments as a secondary feature, with a facade style based on "railway brown + electric blue" as the base tone; specific demolition–renovate–retain strategies and engineering plans are pending official land, ownership, and control plan documentation [depth:three_key_area_detailed_design]. (Demolish–Renovate–Retain Strategy)

### Beijing AI Origin Community

The AI Origin community is positioned as an "On-Campus Type Conversion and Talent Community" [source:AGENT-TASKBOOK], with spatial actions including: organizing a seamless connection between campus, park, and street; supplementing open-source release halls, enterprise conversion lounges, and talent service and living facilities; organizing integrated transfers and public squares around transit stations; and placing open-source release halls, slow travel breakpoints, and Global AI Week route nodes within Public Spaces [data:geometry/key_areas.geojson#PROV-KEY-002]. This area emphasizes the "origin" narrative: university innovation, open-source collaboration, result release, and talent aggregation forming an innovation loop [metric:scenario_card_count].

### Dazhongsi AI Industry Cluster

Dazhongsi is positioned as an "Urban-Type Intelligent Economy and International Exchange District" [source:OFFICIAL-ANNOUNCEMENT], with spatial actions including: organizing a quadrilateral pedestrian connection around the Dazhongsi station; laying out an intelligent terminal commercial street, a data element theater, and an international roadshow living room; utilizing planned green spaces to comprehensively carry public experiences; and combining existing commercial and industrial spaces to propose a tiered approach for retention, renovation, and new construction [data:geometry/key_areas.geojson#PROV-KEY-003]. This area serves as a display and transformation interface for "intelligent-native new business forms," and is also a key node for the Global AI Activity Week [source:AGENT-TASKBOOK].

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### Five User Archetypes

The plan establishes five user profiles [source:AGENT-TASKBOOK]: university students and faculty with research staff (technology transfer, cross-institution collaboration, daily slow mobility); open-source developers and independent teams (publishing, collaboration, testing, community reputation); start-ups and growing enterprises (cost-effective office space, access to computing power, product test beds); leading enterprises and international visitors (exhibition, business, international hospitality, talent recruitment); and nearby residents and young talent (commuting, leisure, community services, low-impact updates). The spatial responses for these profiles are mapped to research and development land, commercial and service industries, residential communities, educational land, and Public Spaces [data:geometry/land_use.geojson#LU-001].

### Ten AI Scene Cards

| ID | Scenario Card | Spatial Carrier | Service Target | Data and Privacy Boundaries | Human Review/Operating Entity |
| --- | --- | --- | --- | --- | --- |
| 01 | Open Source Release Hall | AI Origin Community Release Square | Developers, Higher Education Institutions, Enterprises | Code and outcomes must be authorized for display; personal behavior tracking is not collected | Community Operations Committee |
| 02 | Urban Agent Sandbox | Zhongzhiyuan Test Block | Urban Agent Team, Transportation Operator | Test Data Desensitization; Limited Space and Time | Test Access + Human Review |
| 03 | Slow Travel Discontinuity Diagnosis | Jing-Zhang Smart Axis | Residents, Visitors, Operators | Aggregates Flow Heat; Does Not Identify Individuals | Operator+Public Feedback |
| 04 | Low-Carbon Computing Hub | Zhongzhiyuan Municipal Node | Startup team, developers | Minimize computational load; do not create commercial profiles. | Platform Service Provider |
| 05 | AI Governance Forum | Zhongzhiyuan Governance Plaza | Standard Organizations, Enterprises, Public | Public Agenda; Unauthorized Evaluation Data Not Disclosed | Governance Roundtable Meeting |
| 06 | Conversion Lounge | Origin Point Community Innovation Street | Universities, Enterprises, Investment Parties | Authorization of Research Achievements and Legal Information Usage | Conversion Service Center |
| 07 | Data Element Theater | Dazhongsi Data Square | Data Service Providers, Public | Display compliance and audit information; do not display personal privacy data | Compliance Audit Node |
| 08 | Smart Terminal Business Street | Dazhongsi Business District | Consumers, Enterprises | No Unconsented Personalized Tracking | Merchant+Platform Co-Governance |
| 09 | Youth Living Laboratory | Xiaoyue River Scenario Enablement Wing | Youth, Residents | Health/Education Data Localization and Authorization | Operator of Public Services |
| 10 | Global AI Open Week Route | Blue-Green Smart Connection Ring | Global Developers, Public | Activity Data Aggregation; Honors Display With Individual Consent | Activity Organizing Committee |

Among the Testing and Validation Scenarios, 02 Urban Agent Sandbox, 04 Low-Carbon Computing Kiosks, and 07 Data Element Theater are AI industry testing and validation scenarios [source:AGENT-TASKBOOK], all of which are subject to four constraints: "public sources, data minimization, Human Review, and the ability to opt out" [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The scenario nodes are located at [data:geometry/public_space.geojson#PUBLIC-001] and [metric:scenario_node_count].

### Privacy and Human Review Boundary

All scenarios must not infringe on privacy, must not involve excessive surveillance, must not present immature technologies as fully deployed, and must not misrepresent test scenarios as approved operations [source:AGENT-TASKBOOK]. Urban Agents can assist in identifying pedestrian bottlenecks, facility maintenance, event safety, and business service needs, but the final judgment must be made by humans and professional teams; AI-generated content must disclose its generation method and source [source:PROCESSED-FACT-PACK].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The land use structure is based on [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] and is completely divided by a single provisional boundary, with `geometry/land_use.geojson` covering the entire boundary, non-overlapping, and sharing edges [data:geometry/land_use.geojson#LU-001]. Current calculations: Research and development land approximately 233.20 hectares, commercial and service land approximately 293.83 hectares, residential and community service land approximately 133.60 hectares, education land approximately 14.88 hectares, road land approximately 74.03 hectares, green space approximately 331.47 hectares, and reserved land approximately 60.28 hectares [metric:research_area_sqm] [metric:commercial_area_sqm] [metric:residential_area_sqm] [metric:education_area_sqm] [metric:road_area_sqm] [metric:green_space_area_sqm] [metric:reserve_area_sqm].

The Building Footprint is the conceptual design layer [data:geometry/buildings.geojson#BLDG-001], organized by research and development, office, incubator, education, residential, community services, commercial, cultural, and transportation nodes, with a total area of approximately 38.73 hectares, a Building Coverage Ratio of about 3.39% [metric:building_footprint_area_sqm], and [metric:building_density]. The demolish–renovate–retain strategy is implemented in a tiered approach [depth:retain_renovate_demolish]: retain buildings and public facilities with high current quality or cultural value; renovate industrial buildings, park environments, and community interfaces; construct main axis nodes, greenway stations, station plazas, and prototypes of New Infrastructure; specific plot demolish–renovate–retain, Floor Area Ratio, Building Height, and setback must be confirmed based on official control plans, ownership, and engineering documentation [depth:development_intensity_controls], and this plan does not make a legal conclusion. (Demolish–Renovate–Retain Strategy)

## Transport, Rail, Municipal Infrastructure, and Public Services

### Pedestrian and Rail Access

Traffic strategies are organized around the "main axis + ring line + connections" approach [depth:traffic_rail_slow_parking]: the Jing-Zhang Intelligent Axis Greenway bears the north-south slow travel and scene sequence, the Blue-Green Intelligent Ring Line handles cycling within the district, while the Central Intelligent Connecting Street and the two wings' feeder roads manage micro-circulation [data:geometry/roads.geojson#ROAD-001], [data:geometry/roads.geojson#ROAD-002]. The Zhongzhiyuan, AI Origin community, and Dazhongsi each have concept connection lines laid out, with the Dazhongsi Station Quadrant Pedestrian Connection being a key node [data:geometry/roads.geojson#ROAD-007]. The total road network length is approximately 52.74 kilometers [metric:road_network_length_m]. Parking and non-motorized vehicle organization, barrier-free paths, and traffic control for event days are to be further developed and incorporated into [depth:traffic_rail_slow_parking].

### Municipal and New Infrastructure

Municipal facilities adopt the approach of "traditional pipeline updates + embedding New Infrastructure" [depth:municipal_new_infrastructure]: distributed energy, edge computing capacity, smart street poles, environmental sensing, and data interfaces are integrated with public service facilities [data:geometry/public_space.geojson#PUBLIC-001]; low-carbon computing hubs are proposed as prototypes for new infrastructure that require further development [source:AGENT-TASKBOOK]. Professional teams must complete calculations for pipeline capacity, energy loads, fire safety, and flood prevention, as this plan does not provide engineering conclusions [depth:risk_missing_data].

## Blue-Green Network, Public Space, and Urban Character

### Blue-Green Smart Integration Loop and Public Plaza

The blue-green system is centered around the Jing-Zhang Relic Park Vitality Axis, with the Qinghe and Xiaoyuehe Corridors as tributaries, and community parks as nodes, forming a continuous blue-green smart connection loop [data:geometry/green_space.geojson#GREEN-001] [data:geometry/constraints.geojson#CON-002] [data:geometry/constraints.geojson#CON-003]; the green space ratio is approximately 29.04%, and the Public Space ratio is approximately 3.77% [metric:green_ratio] [metric:public_space_ratio]. Three public squares include the Open Source Release Square, AI Governance Deliberation Square, and Dazhongsi Resonance Square [data:geometry/public_space.geojson#PUBLIC-001].

### Three AI Pilgrimage Sites and Honor Display System

According to [source:AGENT-TASKBOOK], the proposal puts forward three conceptual landmarks (which can be further developed as public art/memorial installations without pre-setting engineering conclusions):

1. "Person-shaped Node" Smart-Linked Monument: Located at the intersection of the Jing-Zhang Heritage Park and the AI Origin Community, inspired by Zhan Tianyou's person-shaped railway line, the dual tracks intersect to form a knot, combined with a contribution honor wall.
2. "AI Origin Tower": Located at the AI Origin community release plaza, the tower-shaped installation showcases the list of open-source contributors, model cards, and the annual best contributions.
3. "Dazhongsi Smart Echo Ring": Located in front of the Dazhongsi station square, this design takes the imagery of bell sounds and data soundscapes to commemorate China's new culture of smart economy.

The honor display system includes a contributors wall, engraved GitHub IDs, annual honor releases, open-source achievement display nodes, and Public Space component libraries (seating, signage, lamp posts, paving, and device interfaces), all utilizing an updateable, licensable, and maintainable design logic [source:AGENT-TASKBOOK].

### Urban Character

Morphological Control Criteria [standard:MOHURD-URBAN-DESIGN-MEASURES]: Rail memory materials (grey bricks, steel tracks, sleeper elements), AI blue nodes, and greenway green base form the three primary tones; building massing, roof forms, facades, and nightscapes are refined in accordance with the control plan and design guidelines [depth:height_massing_character]. Provisional boundaries and current water systems are presented as background references only and do not represent the blue line, red line, or purple line [data:geometry/constraints.geojson#CON-007]. (Background Only)

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## Renewal Projects, Implementation Policy, and Phasing

### Project List (Concept)

| Number | Project | Spatial Location | Type | Dependent Conditions |
| --- | --- | --- | --- | --- |
| R-01 | Jing-Zhang Smart Axis Greenway Through | Along the Ruins Park | Public Space/Slow Travel | Official Boundary, Ownership, Cultural Heritage Protection |
| R-02 | Open Source Plaza and AI Origin Tower | AI Origin Community | Public Space/Culture | Site Integration and Land Conditions |
| R-03 | Sandbox Street for Urban Agent | Zhongzhiyuan | Testing and Validation/New Infrastructure | Testing Permits and Data Compliance |
| R-04 | Low-Carbon Computing Hub | Zhongzhiyuan Municipal Node | New Infrastructure | Energy, Computing Power, and Municipal Access |
| R-05 | AI Governance Forum | Zhongzhiyuan Governance Plaza | Public Services/Governance | Standard Organization Collaboration |
| R-06 | School-Enterprise Transformation Living Room | Origin Point Community Innovation Street | Industrial Services | University and Transformation Mechanism for Results |
| R-07 | Data Element Theater | Dazhongsi Data Square | Display/Compliance Services | Data Compliance and Audit Mechanisms |
| R-08 | Smart Terminal Business Street | Dazhongsi Business District | Commercial Revitalization | Merchant Engagement, Consumption Scenarios |
| R-09 | Xiao Yuehe Youth Living Lab | East Wing Scenario Empowerment Belt | Public Services/Experimental Scenario | Public Services Operation Mechanism |
| R-10 | Blue-Green Smart Integration Cycling Path | Within the Overall Boundary | Slow Travel/Blue-Green | Road and Green Space Conditions |

### Phased Implementation

Phased implementation using "three cores activation—main axis ring line—two wings weaving" [depth:phasing_implementation]: Phase 1 focuses on three key areas, approximately 369.29 hectares [metric:phasing_area_phase_1_sqm]; Phase 2 connects the main axis with the Blue-Green Intelligence Ring, approximately 184.79 hectares [metric:phasing_area_phase_2_sqm]; Phase 3 completes the weaving of the two wings and the area, approximately 587.20 hectares [metric:phasing_area_phase_3_sqm]. Phased data can be found at [data:geometry/phasing.geojson#PHASE-1].

### Long-term Operation and Global AI Innovation Activity System

Corresponding to [source:AGENT-TASKBOOK] agent.6, the proposal puts forward a conceptual operational mechanism: an annual activity system comprising Q1 Open Source Contribution Season, Q2 Scenario Access Day, Q3 Developer Conference and Competition, and Q4 Jing-Zhang AI Week and Annual Honors Release; the developer community will build long-term assets through code hosting, joint topic creation, maintainer programs, points, and honor walls; the scenario access will follow a "apply—review—test—display—exit" process; public experience routes will connect heritage culture, open-source community, industry showcases, and international roadshows into a "Jing-Zhang Smart Link Pilgrimage Route" that is walkable and shareable; international dissemination will be advanced through multilingual content, developer ambassadors, and open-source activities. All activities, recruitment, policies, funding, and operational arrangements are Conceptual Recommendations and are not considered as confirmed government arrangements [depth:risk_missing_data].

## Metrics, Area Recalculation, and Compliance Matrix

The metric framework is unified in `metrics.json`, with all areas and ratios recalculated geometrically under EPSG:4548 [depth:metrics_recalculation]. The HTML displayed values are consistent with those in `metrics.json` [metric:site_area_sqm], [metric:green_ratio], [metric:public_space_ratio]. The core metrics are as follows:

| Indicator | Value | Formula/Source |
| --- | --- | --- |
| Overall Design Area | 1141.28 ha | polygon_area(site_boundary) |
| Three Key Areas | 192.92 / 104.32 / 72.05 ha | polygon_area(PROV-KEY-001/002/003) |
| Research and Development Land | 233.20 ha | sum(land_use_area(0802)) |
| Commercial and Business Services | 293.83 ha | sum(land_use_area(05)) |
| Housing and Community Services | 133.60 ha | sum(land_use_area(0701,0702)) |
| Education Land Use | 14.88 ha | sum(land_use_area(0804)) |
| Road Land Use | 74.03 ha | sum(land_use_area(1207)) |
| Green Space | 331.47 ha | sum(polygon_area(green_space)) |
| Public Space | 42.98 ha | sum(polygon_area(public_space)) |
| Building Footprint | 38.73 ha | sum(polygon_area(buildings)) |
| Green Space Ratio / Public Space Ratio / Road Ratio | 29.04% / 3.77% / 6.49% | Area Ratio |
| Road Network Length | 52.74 km | sum(linestring_length(roads)) |
| AI Scenario Node | 10 | count(SCENARIO_NODE) |
| Scenario Card | 10 (including 3 for testing and validation) | count(proposal.md Scenario Card) |
| Phasing Area | 369.29 / 184.79 / 587.20 ha | sum(phasing area) |

Complete metric references: [metric:site_area_sqm], [metric:key_area_count], [metric:zhongzhiyuan_ai_acceleration_area_area_sqm], [metric:beijing_ai_origin_community_area_sqm], [metric:dazhongsi_ai_industry_cluster_area_sqm], [metric:research_area_sqm], [metric:commercial_area_sqm], [metric:residential_area_sqm], [metric:education_area_sqm], [metric:road_area_sqm], [metric:green_space_area_sqm], [metric:public_space_area_sqm], [metric:building_footprint_area_sqm], [metric:green_ratio], [metric:public_space_ratio], [metric:road_ratio], [metric:building_density], [metric:land_use_parcel_count], [metric:road_network_length_m], [metric:scenario_node_count], [metric:scenario_card_count], [metric:phasing_area_phase_1_sqm], [metric:phasing_area_phase_2_sqm], [metric:phasing_area_phase_3_sqm], [metric:heritage_corridor_length_m].

`compliance_matrix.json` covers announcements 1.3.1-1.3.3, 1.4.1-1.4.3, and 1.5.1-1.5.3 with agent.1-agent.6; `standard_matrix.json` covers all mandatory standards; `design_depth_matrix.json` covers 15 mandatory depth items [source:SITE-PACKAGE]. The three key areas cover approximately the same area as the announced values (with a deviation of less than 3%), see [data:geometry/key_areas.geojson#PROV-KEY-001].

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

### Data and Spatial Risks

The greatest risk is the Official Boundary with missing control conditions [depth:risk_missing_data]: the current geometry is entirely based on provisional boundaries [source:BOUNDARY-SOURCE], which can only be used for generation, display, and discussion; official polygons released afterward must be used to recalculate land use, buildings, roads, green/public space, phasing, constraints, and all metrics [depth:metrics_recalculation]. Control plan conditions, ownership, municipal, cultural heritage, and engineering data are listed as pending; Floor Area Ratio, Building Height, and total building scale are unknown [metric:floor_area_ratio], [metric:building_height_m], [metric:total_floor_area_sqm].

### Scenarios and Operational Risks

AI scenarios and operational mechanisms involve technical maturity, public acceptance, operational costs, and policy uncertainty risks [source:AGENT-TASKBOOK]: all scenarios must adhere to the principles of public source availability, data minimization, Human Review, and the right to exit; they must not present Conceptual Recommendations, activity hypotheses, or policy mechanism suggestions as determined government decisions or implementation arrangements [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Copyright and Compliance

This entire document, including text, geometry, charts, PDF, and HTML, was generated or used by an AI agent with authorized public sources [source:SOURCE-REGISTRY], and does not use non-public data, personal privacy data, or unauthorized materials; `report/copyright_statement.md` is the copyright statement [source:SITE-PACKAGE]. Global case studies are provided for background reference, and specific facts must be verified with official sources. The submission is made with `COMMUNITY-DISPLAY-ONLY` permissions, and no claim is made to the use of unauthorized materials.

## References

- `brief/site-package/design_brief.json`, `allowed_design_space.json`, `agent_taskbook.json`, `sources.json`
- `brief/site-package/geometry/provisional_boundaries.geojson` and `provisional_boundaries_basis.md`
- `brief/site-package/standards/standards.json` and `references/` local snapshot
- `data/source_registry.json` and `data/processed/agent_fact_pack.md` along with the same directory CSV
- `docs/formal-submission-guide.md`, `docs/visual-style-recommendations.md`
- `templates/proposal.md`, `brief/site-package/schemas/*.json`

Evidence Index (for machine verification, naturally cited in the text): [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE], [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK]; [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], [standard:MOHURD-ARCH-DESIGN-DEPTH-2016];  [depth:existing_conditions_diagnosis], [depth:three_level_scope_framework], [depth:overall_spatial_structure], [depth:land_use_layout], [depth:development_intensity_controls], [depth:height_massing_character], [depth:retain_renovate_demolish], [depth:traffic_rail_slow_parking], [depth:municipal_new_infrastructure], [depth:blue_green_public_space], [depth:three_key_area_detailed_design], [depth:renewal_project_list],  [depth:phasing_implementation], [depth:metrics_recalculation], [depth:risk_missing_data];  [data:geometry/site_boundary.geojson#SITE-001], [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003], [data:geometry/land_use.geojson#LU-001], [data:geometry/buildings.geojson#BLDG-001], [data:geometry/roads.geojson#ROAD-001], [data:geometry/roads.geojson#ROAD-002], [data:geometry/roads.geojson#ROAD-007],  [data:geometry/roads.geojson#ROAD-008], [data:geometry/green_space.geojson#GREEN-001], [data:geometry/public_space.geojson#PUBLIC-001], [data:geometry/constraints.geojson#CON-001], [data:geometry/constraints.geojson#CON-002], [data:geometry/constraints.geojson#CON-003], [data:geometry/constraints.geojson#CON-007], [data:geometry/phasing.geojson#PHASE-1].
