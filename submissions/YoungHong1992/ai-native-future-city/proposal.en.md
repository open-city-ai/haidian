---
title: "Jing-Zhang Intelligence Vein · AI-Native Future City — Centennial Jing-Zhang AI Innovation Belt Urban Design Conceptual Proposal"
author_github: "YoungHong1992"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With the Jing-Zhang Railway Heritage Park as the north-south cultural green axis, and the Zhongzhiyuan/AI Origin community and Dazhongsi as three key innovation anchor points, we propose the overall concept, naming, and visual direction of the \"Jing-Zhang Wisdom Vein · AI-Native Future City.\" This includes more than 10 AI scenario cards, five user profiles, three AI holy sites, and a global AI activity operational mechanism. All spatial conclusions are based on provisional boundaries, with accuracy alerts retained and to be recalculated upon the release of official data."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.0"
---

# Jing-Zhang Intelligence Vein · AI-Native Future City — Centennial Jing-Zhang AI Innovation Belt Urban Design Conceptual Proposal

> **Concept in a Sentence**: Let the Jing-Zhang Railway Heritage Park extend from "China's first mainline railway autonomously designed by Chinese people a century ago" to "the first urban smart vein co-created by humans and intelligent entities in the AI era" — with a north-south axis connecting three cores, blue-green slow-moving woven scenes, and open-source pilgrimage establishing milestones.
>
> **English Name:** Jing-Zhang Neural Spine · AI-Native Future City (Abbreviation **JZ-Spine**).
>
> **Compliance Statement**: This proposal is an **Open Co-Creation Conceptual Recommendation** for the intelligent body open call, and does not replace formal planning, nor constitute a government approval conclusion. It does not contain judgments on Floor Area Ratio, Building Height, Demolish–Renovate–Retain Strategy, road red lines, or engineering implementation. All spatial implementation statements are conceptual recommendations/reference schemes/available for professional teams to deepen their research. [source:AGENT-TASKBOOK]

## Design Basis and Source List

This proposal is based on the qualification pre-review announcement for the international scheme of the Centennial Jing-Zhang AI Innovation Belt Urban Design and the open-source call for tasks directed at intelligent entities. The machine-readable references are found in the `brief/site-package/` directory, including `design_brief.json`, `agent_taskbook.json`, `allowed_design_space.json`, `enums/`, `ranges/planning_limits.json`, `schemas/`, `sources.json`, and `data/source_registry.json`. Before the design process, all these files were fully read, and four lists were established: 'task', 'scope', 'data usage', and 'gap'. Each design judgment was broken down into traceable sources, calculable indicators, verifiable layers, and Human Review assumptions. [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:existing_conditions_diagnosis]

**Data Availability Boundary** (as per `data/source_registry.json`): formal available data 5 items, provisional-only data 1 item. Official precise red lines, planning indicators (Floor Area Ratio/Building Height/Building Coverage Ratio/green space ratio), road red lines, parcel ownership, existing buildings, cultural protection blue lines, etc., are all **data gaps**. This plan registers them as `missing / pending_control` in `brief/site-package/ranges/planning_limits.json`, and never substitutes agent estimated values for confirmed indicators. [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [standard:MOHURD-CONTROL-DETAILED-PLANNING]

**Boundary Nature**: The official `SITE_BOUNDARY` and three `KEY_AREA` polygons have not yet been publicly disclosed. This plan uses the provisional boundaries generated from `brief/site-package/geometry/provisional_boundaries.geojson`. Both `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` are marked with `official_boundary=false` and `geometry_role=provisional_constraint`, **for conceptual generation, self-check, visualization, and design discussions only, not as official planning boundaries, approval references, or precise area calculation references**. Once official data is released, the boundaries, land use, roads, green spaces, Public Spaces, buildings, phased development, and all indicators must be recalculated. This data gap itself does not block content scoring. (Official Planning Boundary) [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]

File correspondences:
Design Judgments → `proposal.md`; Spatial Evidence → `geometry/*.geojson`; Quantitative Recalculation → `metrics.json`; Task Response → `compliance_matrix.json`; Professional Standards → `standard_matrix.json`; Depth of Results → `design_depth_matrix.json`; Source References → `sources.json`; Assumptions to Be Confirmed → `assumptions.json`; Self-Inspection Conclusions → `self_check.json`. For navigation layer reference, see [source:PROCESSED-FACT-PACK] (`data/processed/agent_fact_pack.md`, for navigation only, not authoritative source).

![Evidence Chain and Relationship Diagram with Submission Package](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal is organized according to the three layers specified in the announcement, and it addresses the design issues for each layer as outlined in the announcement.

| Level | Area | Design Issue | Solution Provided | Data Focus |
| --- | --- | --- | --- | --- |
| Coordinated Research Area | 43.6 km² | How can AI industry ecosystems and future urban forms be organized? | Establish an innovation chain of "high school innovation source → open-source collaboration → enterprise transformation → public experience → international dissemination," and overlay three thematic belts. | compliance_matrix.json, standard_matrix.json |
| Overall Design Area | 11.4 km² | Industrial Space, Urban Renewal, Transportation and Utilities, and Aesthetic Features | 'One Axis and Three Cores·Blue-Green Slow Travel Composite Ring' spatial structure, 15 land use zones | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-Area Detailed Design Area | 368.4 ha | How to Achieve Detailed Design Depth for Three Areas | Provide Positioning + Spatial Actions + AI Scenarios + Implementation Dependencies | [data:geometry/key_areas.geojson#PROV-KEY-001] and the other two areas |

Three levels are not separate drawings: a comprehensive study determines the industrial chain and urban form; overall design translates the determination into update projects, spatial structure, and facility bearing; detailed design for key areas verifies the feasibility of the block, building, traffic, Public Space, and AI applications. [depth:three_level_scope_framework] [depth:overall_spatial_structure] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]

**Overall Concept 'Jing-Zhang Wisdom Vein':** The spatial translation of the concept is based on the Jing-Zhang Heritage Park as the **North-South Cultural Green Axis (Wisdom Vein Main Axis)**. The **Three Zones and Two Wings** are represented by the Zhongzhiyuan (North), Beijing AI Origin Community (Middle), and Dazhongsi (South) as the **Three Cores**, with the Qinghe and Xiaoyuehe rivers as the **Two Wings Suture Lines**. The **Daily Scene Network** is formed by universities, enterprises, communities, and rail transit stations. This concept forms a **One Axis, Three Cores, Two Wings Suture, Multiple Points, and a Composite Ring of Blue-Green Slow Travel**. Here, 'axis', 'core', and 'wing' are the **translation of the working methods** for the three zones and two wings, not the addition of new legal redlines. [data:geometry/green_space.geojson#GREEN-001] [data:geometry/key_areas.geojson#PROV-KEY-001]

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Three Key Positions × Five Functional Areas × Synergistic Loop of Three Zones and Two Wings

This plan responds to the three major positioning requirements (century-old Jing-Zhang Cultural Belt / Urban AI Life Experience Belt / AI Integration Innovation Belt) and five functional areas (Full-Stack Independent AI Innovation System / World-Class AI Innovation Ecosystem / AI-Enabled Scenario Enablement New Paradigm / Intelligent AI Vibrant City / AI Governance Global Discourse Power). The synergistic loop design is as follows: **Zhongzhiyuan** bears 'Full-Stack Independent AI Innovation System + AI Governance Global Discourse Power' → **AI Origin Community** bears 'World-Class AI Innovation Ecosystem' → **Dazhongsi** bears 'Intelligent Nativized New Business Models' → **Zhongguancun Technology Services Wing** provides global element configuration and capital empowerment → **Xiaoyue River Scenario Enablement Wing** transforms results into perceivable urban living scenarios, forming a 'Innovation Source—Incubation—Transformation—Service—Experience' loop. [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:overall_spatial_structure]

### Naming System and Logo/Visual Identity Direction (agent.1)

- **Total Name**: Jing-Zhang Smart Vein·AI-Native Future City; **English**: Jing-Zhang Neural Spine (JZ-Spine). Naming Logic: "Jing-Zhang" honors the century-old railway's spirit of independent innovation, while "Smart Vein" refers to the neural network of the AI era, corresponding to the north-south main axis of the heritage park site—history's "Iron Vein" is upgraded to the intelligent "Smart Vein".
- **Naming System Extension**: The three cores are named respectively as 'Wisdom Vein·Origin' (AI Origin Community, Origin), 'Wisdom Vein·Core' (Zhongzhiyuan, Core), and 'Wisdom Vein·Hub' (Dazhongsi, Hub); the two wings are named 'Wisdom Vein·Network' (Zhongguancun Technology Services Wing) and 'Wisdom Vein·Scenario' (Xiaoyue River Scenario Enablement Wing). The activity brand is 'Wisdom Vein Open Week (Neural Spine Open Week)'.
- **Logo Direction**: The main symbol is a "north-south curve evolving from railway tracks to neural synapses," with ballast nodes gradually transforming into glowing nodes, symbolizing "century-old iron veins → AI wisdom veins." The primary colors are "Jing-Zhang Blue (railway steel blue #2B4A5A) + Wisdom Vein Orange (traffic light orange #F0662E) + Open Source Green (#3A8A5A)." All fonts, images, and corporate logos must be cleared, and the use of city, park, or company names, as well as unauthorized fonts and trademarks, is prohibited. [source:AGENT-TASKBOOK] (forbidden_claims: no slogan-style naming, no name duplication, no unauthorized symbols)

### 5-8 global AI Innovation Ecosystem case studies (agent.2)

| # | Case | Core Mechanism | Experiences Translatable to Jing-Zhang |
| --- | --- | --- | --- |
| 1 | Silicon Valley (Stanford—Shady Lane—Entrepreneurship Belt) | Pioneering Top Universities + Venture Capital Density + Talent Rotation | Build a "Campus-Adjacent Conversion Street" and Talent Zone with North China University of Aeronautics and Astronautics () and North University of Science and Technology () as the Pioneering Source |
| 2 | Boston Kendall Square (adjacent to MIT) | University—Pharmaceutical—Startup High-Density Mixed-Use District | AI Origin Community as a "Campus-adjacent Mixed-Use District," Compressing Physical Distances for Technology Transfer |
| 3 | King's Cross (Railway Brownfield Regeneration) | Abandoned Railway Yard → Tech and Culture District (Google/ Central Saint Martin) | **Direct Benchmark**: Jing-Zhang Heritage Corridor's Railway Brownfield Cultural Update Model |
| 4 | Shenzhen Nan Mountain/Yuehai Street | Supply Chain Clusters + Hardware Iteration Speed | Dazhongsi Smart Terminal and Content Consumption's 'Rapid Test Bed' |
| 5 | Helsinki Maria 01 | Government-led Startup Campus + Open Data | Scenario Access Operations + City Open Data Sandbox Mechanism |
| 6 | Shenzhen/Hangzhou Open Source Community Practice | Accumulate Public Knowledge Assets through Open Collaboration | SmartVessel Open Source Week + Honor Wall for Intelligent Body Contributions |
| 7 | Singapore One-North | Research—Industry—Residence—Park Integrated Campus City | "One Axis and Three Cores" Work-Live-Green Integrated and Blue-Green Pedestrian and Cycling Network Loop |

**Innovation Ecosystem Map**: Land (Supply of Existing Urban Renewal) → Space (Research/Residential/Commercial Mixed Use) → Industry (Division of Labor in Three Zones and Two Wings) → Capital (Capital Empowerment of Zhongguancun Technology Services Wing) → Talent (Special Zone Near the School + International Reception) → Computing Power (Edge Computing Powerway, Concept) → Data (Compliant Data Elements Living Room) → Scenarios (10+ Scenario Cards Open Operation). All mechanisms are Conceptual Recommendations. No lists of companies, investment amounts, output values, or fiscal commitments will be fabricated. [source:AGENT-TASKBOOK]

### Future Urban Form

AI how it can transform work/life/learning/transportation/public services, translated into locatable functional zones, nodes, corridors, and scenarios, rather than just technical slogans: a north-south oriented heritage park pedestrian main axis (developer promenade) that carries commuting + leisure + exhibition; mixed-use three-core areas to reduce residential and employment separation; edge-side computing and distributed energy as a concept prototype for New Infrastructure **concept prototype** (to be further developed). Indicators for industrial strategy, AI innovation index, talent density, etc., are included in the indicator system and marked as design recommendations or pending performance metrics. [data:geometry/public_space.geojson#PUBLIC-001] [depth:overall_spatial_structure] [standard:MOHURD-URBAN-DESIGN-MEASURES]

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The Overall Design Area (11.4 km²) reaches the depth of Regulatory Detailed Planning through Urban Design. The spatial structure is defined as "one axis and three cores with a blue-green slow-moving composite ring":

- **Land Use Structure**: `geometry/land_use.geojson` divides the boundaries into a complete, seamless, and non-overlapping set of 15 land use zones([metric:land_use_polygon_count] = 15). The central north-south band is entirely park green space(1401, corresponding to the heritage park green axis); the western and eastern construction bands are divided by latitude — the southern segment for commercial and service land use(05, Dazhongsi Intelligent Economy); the middle segment for urban residential land use(0701, AI Community and Talent Living Area); and the northern segment for research and development land use(0802, Zhongzhiyuan/AI Origin R&D). [data:geometry/land_use.geojson#LU-001] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout]
- **Urban Renewal Framework**: Identify underutilized spaces along the railway and around stations to form six conceptual renewal projects (see the list below). The updates are to be carried out according to the principles of "small-scale, incremental, and activity-led."
- **Development Intensity and Building Footprint**: `geometry/buildings.geojson` expresses 6 representative updated building footprints([metric:building_footprint_area_sqm]), distinguishing between retained, renovated, and newly constructed. **Floor Area Ratio, Building Height, and Building Coverage Ratio are recorded as unknown/pending_control** due to the lack of official control plans, and no pseudo-precise values are given. [depth:development_intensity_controls] [data:geometry/buildings.geojson#BLDG-001]
- **Transportation Urban Infrastructure**: Propose layouts around Transit-Station Integration, road micro-circulation, pedestrian connectivity, end-side computing, and distributed energy (see the transportation chapter for details). Wherever red lines, setback distances, or pipeline capacities are involved, write them as "pending formal master plan confirmation."

## Detailed Design of Key Areas

The detailed design for the three key areas shall reach the depth of the Integrated Planning Implementation Plan for Urban Design. It shall cite the provisional key_area polygons and state that the conclusions are merely directionally designed. [depth:three_key_area_detailed_design]

| Key Areas | Positioning (Name) | Spatial Actions | AI Industry and Operational Scenarios | Implementation Dependencies/Risks | Evidence |
| --- | --- | --- | --- | --- | --- |
| Zhongzhiyuan AI Independent Innovation Acceleration Area | Zhimai·Core: Garden-Type Full-Stack Independent Innovation Street | Enhance Qinghe interface, industrial display, and low-carbon innovative interaction; green spaces for open testing and demonstration of standard governance | Autonomous model testing, standard-setting workshops, safe governance sandbox, low-carbon computing experience | Qinghe Blue Line/Ecological conditions pending confirmation | [data:geometry/key_areas.geojson#PROV-KEY-001] |
| Beijing AI Origin Community | Smart Pulse · Origin: On-Campus Type Conversion and Talent Community | Campus—Park—Downtown Pedestrian Integration; Supplementing Result Release, Talent Services, Residential Amenities, and Open Source Collaboration Spaces | Open Source Release Hall, Conversion Street, Talent Special Zone Services, AI Living Model Street | Campus Boundary/Ownership/First Floor Business Types Pending Confirmation | [data:geometry/key_areas.geojson#PROV-KEY-002] |
| Dazhongsi AI Industry Cluster | Zhi Mai·Hui: Urban Intelligent Economy and International Exchange District | Integration at Dazhongsi Station, Quadrant Pedestrian Connectivity at Intersections, Update of Commercial Services and Public Environment of Key Enterprises | International Roadshow Living Room, Data Element Living Room, Intelligent Consumption Complex, Main Stage of Activity Weeks | Track Station/Intersection/Pipeline to be Confirmed | [data:geometry/key_areas.geojson#PROV-KEY-003] |

Three areas can be separately viewed in the HTML visualization. The A3 booklet and A0 poster include the overall plan and indicator explanations for each area. If only "Demonstration Area" is written without functional, architectural, traffic, Public Space, project evidence, it will be considered incomplete — this plan provides the seven elements of "positioning + spatial structure + architectural renewal + traffic and pedestrian facilities + public space + AI scenarios + implementation risks" for each area. [standard:MOHURD-URBAN-DESIGN-MEASURES]

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

## AI Innovation Ecosystem, talent profiling, and AI-Enabled Scenario (agent.3)

### 5 User Persona Categories

| User Profile | Typical Needs | Spatial Response | Privacy/Review Boundary |
| --- | --- | --- | --- |
| Open Source Developer | Release, Collaborate, Test, Community Reputation | Origin Community Open Source Release Hall, Public Code Wall, Nighttime Collaboration Space | No personal behavior tracking; activity data only aggregated and statistically summarized |
| Founding Team | Low-Cost Office, Computing Power Entry Point, Product Test Bed | Zhongzhiyuan Shared Test Bed, Edge Computing Power Station, Standard Governance Consultation | Computing Power/Data Services Require Separate Authorization |
| Key Corporate Visitors | Exhibitions, Business, International Reception, Recruitment | Dazhongsi International Roadshow Living Room, Track Transfer, Corporate Surrounding Public Spaces | Clear Rights for Corporate Identifiers and Case Studies |
| Surrounding Residents | Commuting, Leisure, Community Services, Low-Impact Updates | Heritage Park Pedestrian Loop, Embedded Community Services, Activity and Lighting Hierarchies | Do Not Use Resident Profiles for Commercial Recommendations |
| College Students and Faculty | Technology Transfer, Cross-Institutional Collaboration, Daily Active Transportation | Campus-to-Parkway Active Transportation Linkage, Technology Transfer Kiosks, AI Education Experience Points | Campus Data and Research Results Require Authorization |

### 10 AI scenario cards (among which 3 are industrial Testing and Validation Scenarios, marked with a ★)

Each scene card maps to a spatial location, service target, data source, privacy boundaries, Human Review, and operational entity, and corresponds to `geometry/scenario_nodes.geojson` nodes ([metric:scenario_node_count] = 10).

| # | Scenario Card | Spatial Carrier/Node | Service Target | Data and Privacy Boundaries | Human Review/Operation |
| --- | --- | --- | --- | --- | --- |
| 01 | Open Source Release Hall | AI Origin Community SCN-003 | Higher Education/Open Source Community/Start-up | Only Public Outputs and Aggregated Event Data | Community Operator + Manual Review |
| 02 ★ | Safety Governance Sandbox | Zhongzhiyuan SCN-001 | Model Team/Regulation | Test Data Authorization Isolation, Auditable | Standard Institution + Expert Review |
| 03 ★ | Side-End Computing Hub | Xiao Yuehe SCN-007 | Startup/Researcher | Desensitized Computing Usage Statistics | Operator+Energy Consumption Monitoring |
| 04 | AI Slow Travel Navigation | Heritage Park SCN-008 | Residents/Visitors/Developers | Low-Intrusion Sensors, No Facial Recognition | Public Space Management |
| 05 | Dazhongsi International Roadshow Living Room | Dazhongsi SCN-005 | Leading Corporate/Media/International | Case Study and Brand Clearing | Event Operator |
| 06 | Qinghe Low-Carbon Innovation Corridor | Zhongzhiyuan by Qinghe | Residential/Industrial Park | Environmental Data Transparency | Park+Ecological Management |
| 07 | Near-School Technology Transfer Street | AI Origin Community SCN-004 | Higher Education/Incubation/Financing and Investment | Technology Transfer and Intellectual Property Licensing | Technology Transfer Service Platform |
| 08 ★ | Data Elements Living Room | Dazhongsi SCN-006 | Enterprise/Data Service Provider | compliant authorization, auditable, minimized | Data Transaction Compliance Party + Human Review |
| 09 | AI-Living Services Sample Street | Community Commercial Intersection SCN-009 | Residents | Healthcare/Education/Legal Data Authorization | Government + Professional Institution Verification |
| 10 | Global AI Activity Week Route | One Public Space SCN-010 | Global Developers/Public | Activity Data Aggregation | Brand Operator |

All AI governance recommendations adhere to the principles of **data minimization, public sources, transparency, and Human Review**: Urban Agents can assist in identifying pedestrian bottlenecks, Public Space heat maps, facility maintenance, and activity safety, but **do not replace planning approvals, do not output unauthorized personal profiles, and do not claim official implementation commitments**. Prohibit privacy infringement, over-monitoring, premature deployment of immature technologies, and misrepresenting test scenarios as approved operations. [source:AGENT-TASKBOOK] [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/roads.geojson#ROAD-001] [metric:public_space_ratio] [metric:green_ratio]

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land use based on the classification expressed in the National Spatial Planning Land Use Control Guide ([standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]), the 15 zones fully and seamlessly cover the site ([data:geometry/land_use.geojson#LU-001]). Building zones are divided into **preserve/renovate/new construction**: BLDG-004 (near school neighborhood) for preserve renovation, BLDG-002/006 for renovation, and BLDG-001/003/005 for new construction concepts. The demolish–renovate–retain method is managed by [depth:retain_renovate_demolish]; Building Height/bulk/interface control is managed by [depth:height_massing_character]. Due to the lack of current building and control plan data, only the methods and pending calibration list are provided, without fabricating the demolish–renovate–retain conclusions. [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm] (Demolish–Renovate–Retain Strategy)

Building scale and intensity metrics are consistent with those in `metrics.json` and the layers; the total building scale, Floor Area Ratio (), Building Height, Building Coverage Ratio, and green space ratio are recorded as unknown/pending_control in `metrics.json` and `assumptions.json` because official conditions are missing. Therefore, no fixed values are used to create a sense of precision.

## Transport, Rail, Municipal Infrastructure, and Public Services

Traffic Structure: **North-South Archaeological Park Developer Pedestrian Path** ([data:geometry/roads.geojson#ROAD-001], slow travel main axis, connecting the three cores) + **3 East-West Sewing Pedestrian Paths** (corresponding to the three zones, addressing the east-west discontinuities caused by the ring road/railway). The focus is on North Fifth Ring Road, the archaeological park's ring road node, Wudaokou, the west end of Qinghua East Road, Dazhongsi Station, and the surrounding areas of key enterprises. Both the road and pedestrian layers are within the submission boundary, cross-referenced with Public Spaces, green spaces, and industrial nodes; as the boundary is provisional, the traffic conclusions are for temporary design discussions. [depth:traffic_rail_slow_parking] [data:geometry/constraints.geojson#CONSTRAINTS-001]

Municipal and Public Services: AI industry service facilities, innovation service platforms, talent living services, New Infrastructure (edge-side computing stations SCN-007), and distributed energy are all conceptual layouts. All content involving road red lines, pipelines, fire safety, and municipal capacity should be registered as pending for supplementation in `assumptions.json` and not written as final conditions. [depth:municipal_new_infrastructure]

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## Blue-Green Space, Public Space, and Urban Character (agent.4 + agent.5)

### Blue-green and Public Space

With the Jing-Zhang Heritage Park Vitality Belt as the backbone ([data:geometry/green_space.geojson#GREEN-001], green space area [metric:green_space_area_sqm] approximately 2,627,987 ㎡, green_ratio = [metric:green_ratio] approximately 0.23), overlaying the Qinghe (GREEN-002) and Xiaoyuehe (GREEN-003) two east-west blue-green corridors, achieving **north-south connectivity and east-west integration**. Public Space area [metric:public_space_area_sqm] approximately 491,701 ㎡, public space rate [metric:public_space_ratio] approximately 0.043. Building unit design depth referenced [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] (this plan only reaches the Urban Design depth, units are indicative). [depth:blue_green_public_space] [standard:MOHURD-URBAN-DESIGN-MEASURES]

### 3 AI Sacred Sites / Honor Display Nodes (agent.4)

In response to the call for submissions for the 'Steles/Permanent Memorial System', propose 3+1 sacred sites (all Conceptual Recommendations, not yet approved for construction, and not overly entertainment-oriented):

1. **Agent Contribution Honor Plaza** (PUBLIC-001, Zhongzhiyuan) —— Along the promenade, set up a sustainable and updateable plaque wall listing contributors/Agent names, recording the most outstanding open-source contributions each year.
2. **Public Showcase Plaza** (PUBLIC-002, AI Origin Community) —— showcase open-source achievements, milestone models, and papers as a public exhibition corridor.
3. **AI Milestone Memorial Square** (PUBLIC-003, Dazhongsi Station City) —— the "Artificial Intelligence Milestone" main monument, integrated with Dazhongsi Station, serving as an international arrival portal.
4. **Developer Walkway Hub** (PUBLIC-004, Xiao Yuehe) —— a narrative node that juxtaposes the histories of "Zhan Tianyou's Design of the Jing-Zhang Railway" and "Agent Participation in Urban Design."

### Urban Character and Cultural Narrative (agent.5)

**Triple Cultural Narrative** converges into a single thread: **Centennial Jing-Zhang (Innovative Railway Heritage) → Zhongguancun (China's Innovation and Technology Hub) → AI New Culture (Collaborative Intelligence of Humans and Machines)**. Utilizing cultural resources such as Tsinghua Garden Railway Station and the Beijing Film Academy, propose urban tone, architectural style, and guidance for roofs and facades. The sign/identifier/symbol system is unified under the theme of "rail tie → synapse," and is layered with the overall logo system of the Belt and Road Initiative (Cultural identifiers ≠ Brand logos, to avoid confusion). International communication narrative: *"A century ago, a Chinese engineer designed this railway. Today, humans and AI agents design this city together."* All portraits, trademarks, academic images, and fonts must be cleared, ensuring no distortion of history and no use of culture as a decorative element for technology. [source:AGENT-TASKBOOK]

## Update project list, implementation policies, and phased plans (agent.6)

### Concept Update Project List ([metric:renewal_project_count] = 6)

| Number | Project | Type | Main Dependency | Evidence |
| --- | --- | --- | --- | --- |
| JZ-01 | Jing-Zhang Site Park Pedestrian Connectivity Gap | Public Space/Transport | Road Right-of-Way, Underbridge Space, Traffic Organization Review | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Zhongzhiyuan Qinghe Innovation Interface | Blue/Green/Industrial Showcase | river blue line, ecological flood protection conditions | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | Origin Community Near-School Conversion Street | Urban Renewal/Industrial Services | campus boundaries, ownership, first-floor uses | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | Dazhongsi Station Quadrant Pedestrian Connectivity | Transit-Oriented Development/Slow Zone | Transit Station, Intersection, Pipelines | [data:geometry/public_space.geojson#PUBLIC-003] |
| JZ-05 | AI Public Services and Edge Computing Nodes | New Infrastructure/Public Services | Energy, Computing Power, Security, Operating Entity | [data:geometry/constraints.geojson#CONSTRAINTS-001] |
| JZ-06 | Global AI Activity Week Public Route | Operations/Brand | Public Space Permits, Event Safety, Copyright Clearance | [data:geometry/phasing.geojson#PHASE-001] |

### Phases (Concept, Distinct from 100-Day Submission Cycle)

`geometry/phasing.geojson` Phase : **Near-term** (PHASE-001, Dazhongsi Station City and AI Origin Community Initiation Area) → **Mid-term** (PHASE-002, AI Origin—Talent Living Area Update) → **Long-term** (PHASE-003, Zhongzhiyuan Full-stack Autonomous Innovation Zone). 'Activity First, Light Start': Initiate with light assets such as honor walls, activity weeks, and service platforms, with heavy asset updates pending official control plan/infrastructure/transportation/ownership confirmation. [depth:renewal_project_list] [depth:phasing_implementation]

### Global AI Innovation Ecosystem and Long-Term Operations (agent.6)

- **Annual Activity Framework**: "IntelliVein Open Source Week" is the flagship event (open source release + hackathon + standards forum + pilgrimage route), complemented by quarterly Scenario Access days and monthly developer night talks.
- **Brand IP System**: JZ-Spine Brand + Intelligent Body Contribution Honor Wall IP + Artificial Intelligence Milestone IP, for sustainable updates that record annual contributions.
- **Developer Community Operations**: GitHub open-source collaboration + honor wall engravings + outcome conversion connections, forming a "contribution is memorable" loop.
- **Scenario Access Operations**: 10 scenario cards are tieredly open for access (public/developer/enterprise), subject to compliance authorization and Human Review.
- **Path of Attraction and Transformation**: International Roadshow Living Room → Talent Special Zone → Technology Transfer Street → Enterprise Landing, forming a traceable funnel of transformation.

All activities, recruitment, funding, and policy arrangements are presented as **Conceptual Recommendation or Further Development Directions**, not as confirmed government arrangements, and do not overstate commitments or merely write slogans. [source:AGENT-TASKBOOK]

## Metrics, Area Recalculation, and Compliance Matrix

Core indicators have been recomputed from EPSG:4548 projected geometry (`scripts/spatial_review.py` review PASS):

| Indicator | Value | Unit | Recalculation Formula/Source | Status |
| --- | --- | --- | --- | --- |
| [metric:site_area_sqm] | 11,412,825 | ㎡ | polygon_area(site_boundary) | known(provisional boundary) |
| [metric:green_ratio] | ≈0.230 | ratio | green_area / site_area | known |
| [metric:public_space_ratio] | ≈0.043 | ratio | public_area / site_area | known |
| [metric:building_footprint_area_sqm] | approximately 163,893 | ㎡ | Sum of building footprints | known (indicative) |
| [metric:land_use_polygon_count] | 15 | count | count(land_use) | known |
| [metric:scenario_node_count] | 10 | count | count(SCENARIO_NODE) | known |
| [metric:key_area_count] | 3 | count | count(key areas) | known |
| floor_area_ratio / Building Height / Building Coverage Ratio | null | — | No official control plan | **unknown/pending_control** |

Indicators are managed in three categories: 1) those that can be recalculated directly from geometry (area, ratio, count); 2) those that require official zoning plan support (Floor Area Ratio/height/density/setback/red line, all unknown); 3) those that require calibration with operational data (AI innovation index, talent density, participation rate, etc., listed as pending calibration). Each category enters `metrics.json`, `assumptions.json`, and `compliance_matrix.json`, respectively, to avoid miswriting operational vision as approval conditions. [depth:metrics_recalculation]

Proper alignment is the task response master control file: Announcement 1.3/1.4/1.5, with each task mapping to sections, layers, indicators, drawings, HTML, sources, assumptions, and check items (see `compliance_matrix.json`).

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

- **Legal Status of Materials**: All materials used are either publicly available or rights-cleared, with sources registered in `sources.json` and `report/copyright_statement.md`; no personal privacy data, non-public planning information, or unauthorized data is included. (Rights-Cleared Material)
- **Data Gaps/To Be Confirmed**: Official Boundary, three key area precise polygons, control planning indicators, road red lines, land parcel ownership, existing buildings, municipal/fire safety/heritage conditions are all recorded in `assumptions.json`, with corresponding conclusions downgraded to to be confirmed. [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS-001] [standard:MOHURD-CONTROL-DETAILED-PLANNING]
- **Official Boundary Limitations**: All provisional conclusions must be recalculated upon the release of official data and shall not be used as the Official Planning Boundary, approval, or precise area reference.
- **AI Generation Responsibility**: This plan was generated by an AI agent (Claude, Opus 4.8, via Claude Code) under the supervision of contributor YoungHong1992. The AI agent is responsible for the facts, sources, copyright, spatial data, metrics, and expressions. Maintainers and professional reviewers may request revisions or rejection based on self-inspection, spatial verification, and conformity to the grid matrix requirements.
- **Disclaimer**: This plan does not claim official approval, final zoning approval, ultimate land tenure, final scale of development, or any guarantee of implementation. It is an Open Co-Creation Conceptual Recommendation.

## References

- brief/site-package/design_brief.json, agent_taskbook.json, allowed_design_space.json, sources.json
- brief/site-package/enums/, ranges/planning_limits.json, schemas/, standards/standards.json
- data/source_registry.json
- Machine-readable citation index: [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], [depth:metrics_recalculation], [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]
