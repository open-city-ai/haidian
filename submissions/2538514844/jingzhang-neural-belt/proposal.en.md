---
title: "Jing-Zhang Smart Vein: With the theme of a learnable urban nervous system, reimagining the Centennial Jing-Zhang AI Innovation Belt"
author_github: "2538514844"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With the overall concept of the \"Jing-Zhang Neural Belt,\" a one-vein-two-wings-three-synapses spatial structure and neural circuit innovation ecosystem is proposed: a smart green vein running north-south along the Jing-Zhang Heritage Park, with the Zhongguancun Technology Services Wing and the Xiaoyue River Scenario Enablement Wing working in tandem east-west. The Zhongzhiyuan, AI Origin community, and Dazhongsi serve as three synapse nodes, carrying full-stack autonomous, open-source transformation, and intelligent native new business models. The proposal is based on publicly available and clear-right documentation. All spatial suggestions are Conceptual Recommendations and will be recalculated once the official boundaries and control plan conditions are released. (Official Boundary)"
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "ai-origin-community"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "ai-health-service-navigation", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v0.1"
---

# Jing-Zhang Smart Vein: With the theme of a learnable urban nervous system, reimagining the Centennial Jing-Zhang AI Innovation Belt

## Design Basis and Source List

This scheme is prepared for the international Urban Design call for proposals titled "Centennial Jing-Zhang AI Innovation Belt." The primary basis is the Qualification Pre-Review Announcement and task requirements issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources. The announcement defines three layers of work frameworks: the Coordinated Research Area (43.6 square kilometers), the Overall Design Area (11.4 square kilometers), and the Key-Area Detailed Design Area (368.4 hectares), and outlines tasks such as a world-class AI Innovation Ecosystem, new urban forms, Jing-Zhang Heritage Park vitality belt, transportation and municipal infrastructure, and detailed design for key areas [source:OFFICIAL-ANNOUNCEMENT]. The agent task book for intelligent body open source further clarifies three major orientations, five functional areas, a three-zone and two-wings collaborative loop, and six mandatory tasks (agent.1–agent.6) [source:AGENT-TASKBOOK]. This scheme fully expresses spatial suggestions as Conceptual Recommendations, reference proposals, or materials for professional teams to deepen research, without constituting a government review conclusion. (Three Zones and Two Wings)

Machine-readable references are derived from the site package provided in the repository `brief/site-package/`: design brief, allowable design space, land use classification enumeration, layer enumeration, planning control limits, standard list, deliverable depth list, and validation rules [source:SITE-PACKAGE]. The proposal reads from `data/source_registry.json` before generation, distinguishing between formal-ready, background-only, provisional-only, and needs-review categories of data usage [source:SOURCE-REGISTRY], and uses `data/processed/agent_fact_pack.md` as a navigation layer. The three ranges, key areas, task lists, and missing data lists all enter through this processing package [source:PROCESSED-FACT-PACK], but it is not a new authoritative source.

As of the submission of this draft, the official `SITE_BOUNDARY` and three `KEY_AREA` precise polygons have not yet been released with the public site package. The scheme adopts the temporary rough boundary provided by the warehouse [source:BOUNDARY-SOURCE] and the temporary key area polygons [source:KEY-AREA-SOURCE], all marked as `official_boundary=false`, `geometry_role=provisional_constraint`, `boundary_precision=provisional_rough`, for use only in scheme generation, visualization, and self-inspection, and not for official planning boundaries, approval references, or precise area conclusions. The organization's data gaps do not block content scoring. (Official Planning Boundary) After the official polygon release, all the metrics including the site boundary [data:geometry/site_boundary.geojson#SITE-001], key areas [data:geometry/key_areas.geojson#PROV-KEY-001], land use, buildings, roads, green spaces, Public Spaces, phased and overall indicators, need to be recalculated [metric:site_area_sqm] [depth:existing_conditions_diagnosis].

The professional standards referenced in the proposal include: the Urban Design Measures for the overall requirements of implementing urban design, guiding architecture, and shaping the urban form [standard:MOHURD-URBAN-DESIGN-MEASURES]; the depth requirements for the preparation of Regulatory Detailed Planning [standard:MOHURD-CONTROL-DETAILED-PLANNING]; the land use classification requirements for national land surveys and use control [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; the depth regulations for the preparation of architectural design documents [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]; and the official announcement and the task book for the agent open call [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. All these standards are referenced from local reference snapshots and are not considered evidence based solely on the `source_url`.

![Evidence Chain and Relationship Diagram with Submission Package](assets/figures/site-overview.png)

## Three-Level Scope Framework

The three layers of scope are a work framework for progressively implementing industrial strategies, overall Urban Design, and detailed design for key areas, corresponding to the three-tier tasks specified in the standard [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework].

**Coordinated Research Area** (bounded by the North Fifth Ring Road to the north, Jingzhang Expressway to the east, Xizhimen Outer Street to the south, and Wanshuanghe Road to the west, covering approximately 43.6 square kilometers) addresses the question of "how AI industry ecology and future urban form should be organized," producing an innovation chain, coordinated Three Zones and Two Wings, brand naming, and future urban form research, serving as the industrial and strategic input for the overall design. **Overall Design Area** (covering approximately 11.4 square kilometers) translates strategic judgments into the overall framework of Urban Renewal, land use structure, transportation and utilities, Jingzhang Heritage Park vitality belt, and Urban Character, achieving the depth of Regulatory Detailed Planning in Urban Design [depth:overall_spatial_structure]. **Key-Area Detailed Design Area** (covering approximately 368.4 hectares) conducts detailed design for the Zhongzhiyuan, Beijing AI Origin Community, and Dazhongsi areas, achieving the depth of integrated planning implementation in urban design [depth:three_key_area_detailed_design]. (Integrated Planning Implementation Plan) (Jing-Zhang)

The three layers correspond to different levels of analysis and depth of indicators: the comprehensive study is based on [data:geometry/site_boundary.geojson#SITE-001] as the analytical foundation; the overall design is expressed by the land use zones [data:geometry/land_use.geojson#LU-001], the transportation backbone [data:geometry/roads.geojson#ROAD-001], and the blue-green system [data:geometry/green_space.geojson#GREEN-001] as spatial evidence. Focus areas are detailed design objects [metric:key_area_count] comprising the three polygons [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], and [data:geometry/key_areas.geojson#PROV-KEY-003].

The overall concept proposed in this plan is the **Jing-Zhang Neural Belt**: transforming the Jing-Zhang Railway, which is a historical artery of China's self-innovative efforts, into an "urban neural" for the era of artificial intelligence — a smart green vein (one pulse) running north to south through the site park, carrying data, scenarios, and talent flows; three key areas serve as "synaptic nodes" (three synapses) responsible for signal amplification, transformation, and output; the Zhongguancun Technology Services Wing and the Xiaoyue River Scenario Enablement Wing (two wings) provide element configuration and scenario supply, forming a learnable urban neural circuit. The three layers of scope and the correspondence with "one pulse, two wings, and three synapses" are mapped out in `compliance_matrix.json`, ensuring that tasks 1.3, 1.4, and 1.5 in the announcement, as well as agent.1–agent.6, have corresponding chapters, layers, indicators, and evidence in the drawings.

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

The Coordinated Research Area addresses three questions: how the world-class AI Innovation Ecosystem is constituted, how the Three Zones and Two Wings coordinate, and how the future AI city form can be imagined [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Name and Visual Identity (agent.1)

Main name is set to "**Jing-Zhang Neural Belt**". Naming logic: The Jing-Zhang Railway was the first major railway line designed and built by the Chinese, with the "reversed 'person' shape" railway demonstrating innovation that broke geographical and engineering constraints. In the AI era, urban innovation also requires the efficient transmission of "computing power, data, scenarios, and talent" along a main neural pathway, similar to how neural signals are transmitted. The English name "Neural Belt" emphasizes the dual meaning of "neural network + industrial belt," avoiding the use of existing terms like "Corridor/Valley," and enhancing international recognition. The naming system is divided into three levels: the first-level overall brand "Jing-Zhang Neural Belt," the second-level sub-brand (Zhi Mai Synapse · Zhongzhiyuan / Zhi Mai Synapse · Origin Community / Zhi Mai Synapse · Dazhongsi), and the third-level service brand (Zhi Mai Rest Stop, Zhi Mai Plaza, etc.). The logo direction is "abstracting the 'reversed 'person' shape' railway track as a neural synapse": two intersecting lines form the 'reversed 'person' shape,' with the intersection extending into branch nodes, resembling a neuron synapse. The color scheme takes the rust red of the Jing-Zhang Railway and the electric blue of AI, with a gradient transition, which can be extended for signage, icons, and activity visual systems. The logo is a conceptual direction, with original design fonts and graphics that do not involve unauthorized trademarks or fonts [depth:overall_spatial_structure].

### Five Functional Zones and Three Zones and Two Wings Synergistic Loop (agent.1/agent.2)

Five Functional Areas——Full-Stack Independent AI Innovation System, World-Class AI Innovation Ecosystem, AI-Enabled Scenario Empowering New Paradigms, Intelligent AI Vibrant City, AI Governance Global Discourse——in space correspond to the Three Zones and Two Wings:

| Spatial Unit | Functional Role | Synergistic Mechanism |
| --- | --- | --- |
| Zhongzhiyuan AI Independent Innovation Acceleration Area | Full-Stack Independent AI Innovation System, AI Governance Global Discourse | Autonomous Models, Standards, and Security Governance Outputs |
| Beijing AI Origin Community | World-Class AI Innovation Ecosystem | University Pioneering, Open Source Collaboration, Technology Transfer |
| Dazhongsi AI Industry Cluster | Smart Natively Generated New Business Forms | Leading Enterprises, Agents, and Consumption of Data Elements |
| Zhongguancun Technology Services Wing | Global Configuration of Elements | Zhongguancun IP, Capital, Policy, and Cross-Border Services |
| Xiaoyue River Scenario Enablement Wing | AI Scenario Enablement and Vibrant City | Testing and Validation, Life Services, and Public Experience |

The Three Zones and Two Wings are not static divisions but a closed loop: the Origin Community converts the ideas of universities and open-source communities into prototypes, Zhongzhiyuan accelerates these prototypes into full-stack autonomous products and standards, while Dazhongsi integrates the products into intelligent native consumption and industrial service markets. The Two Wings provide the "blood supply" for elements and scenarios, and finally, through AI governance, experiences are sedimented into replicable public knowledge [source:AGENT-TASKBOOK]. This "signal—enhancement—output—feedback" loop is the industrial core of the "Wisdom Vein" concept.

### Global AI Innovation Ecosystem Case (agent.2)

The proposal selects five real and public global case studies as references (Background Only: not constituting a factual commitment):

1. **Silicon Valley-Stanford Research Park ()**: University-Industry-Capital Adjacency Loop, with venture capital clustering around the campus. Transformation Experience: The origin community should place university innovation at a radius of 10-minute walk, using a technology transfer hub to facilitate patent disclosure.
2. **One-North (Singapore)**: Biomedical, information and communications technology (), and media clusters share the "Knowledge Hill" public core. Transformative experience: Zhongzhiyuan can be configured with a dual cluster of "full-stack autonomy + secure governance" to co-construct a public innovation core, sharing testing and demonstration facilities.
3. **Tel Aviv-Weizmann Science Corridor (Israel)**: Driven by defense R&D spillovers and a culture of startup competitions, it features high-frequency pitch sessions by small teams. Conversion experience: Dazhongsi could host an international pitch lounge and a data element lounge, accommodating high-frequency, small-scale, and fast-paced presentations and transactions.
4. **Shenzhen Nanshan Yuhai Street (China)**: Led by leading companies, the hardware and smart terminal value chain is developed. Integration of park and street. Transformative experience: The smart original consumption scenarios of Dazhongsi require a public interface by leading companies and district-level exhibition spaces.
5. **Hangzhou Future Science City (China)**: Platform economy and developer ecosystems are integrated, with the Dream Town attracting startups through low-cost spaces. Conversion experience: the Origin Community should provide a one-stop "publish-collaborate-test" developer space, lowering the barrier for open-source contributions.

All examples were distilled from public reports and publicly available sources, used to derive spatial organization mechanisms, and do not cite any unauthorized or unpublicized information. They do not constitute statements of fact regarding the list of companies, investment amounts, or output values [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Future AI City Form

The proposal suggests a new urban form oriented towards AI new-quality productivity, organizing "people-intelligent bodies-Public Space-infrastructure" into a learnable, evolvable, and human-reviewed urban system: AI slow-moving navigation assists in accessibility and breakpoint identification, edge-side computing stations integrate into public service facilities, intelligent bodies collaborate to support public space maintenance and activity safety, but all AI decisions retain a Human Review and appeal channel, adhering to the principle of data minimization. These judgments are realized in the land use organization of [data:geometry/land_use.geojson#LU-001], the public space nodes of [data:geometry/public_space.geojson#PUBLIC-001], and the railway context clues of [data:geometry/constraints.geojson#CONST-RAIL-001], and are incorporated into the scenario cards and indicator system.

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The Overall Design Area requires the depth of Regulatory Detailed Planning in Urban Design, incorporating the industrial judgment into the spatial structure and update targets [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout].

### Spatial Structure: "One Pulse with Two Wings and Three Synapses"

- **One Pulse (Intelligent Green Pulse)**: A north-south public spine formed along the Jing-Zhang Heritage Park, connecting the heritage culture, Walking and Cycling Network, and AI public experience, by [data:geometry/land_use.geojson#LU-001] Middle `1401 公园绿地` Include with [data:geometry/green_space.geojson#GREEN-001] Green spaces System collectively expresses [metric:green_space_area_sqm].
- **Two Wings (Collaborative Wings)**: The West Wing will organize service elements along Zhongguancun's technological service resources to collaborate with universities, while the East Wing will organize scenarios and empower smart living services along Xiaoyuehe River. Both are respectively guided by:[data:geometry/land_use.geojson#LU-001] Middle `0802 科研用地` With `05 商业服务业用地` Carry forward.
- **Three Synaptic Nodes (Key Areas)**: The Zhongzhiyuan, Yedian Community, and Dazhongsi areas serve as signal amplification nodes, responsible for full-stack autonomous, open-source transformation, and intelligent native new business models [metric:key_area_count].

### Urban Renewal Overall Framework

Overall design follows the principles of "preserving texture, renovating inefficient spaces, integrating multiple uses, and progressive updating": preserve the Jing-Zhang Railway Heritage Park and the current community texture along the route; for inefficient industrial spaces and existing buildings, focus on functional integration and vertical expansion; for traffic discontinuities and Public Space gaps, prioritize seam-like updates; avoid large-scale demolition and construction. All conclusions regarding the demolish–renovate–retain strategy are marked as Conceptual Recommendations, pending confirmation of the current building conditions, ownership, and control plan [depth:retain_renovate_demolish]. (Demolish–Renovate–Retain Strategy) Land use zoning is expressed through a complete, closed, and seamless gridded zoning system.[data:geometry/land_use.geojson#LU-001], In accordance with [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] Classification of Land Uses, covering `0701 城镇住宅用地`, `0702 城镇社区服务设施用地`, `0802 科研用地`, `0803 文化用地`, `0804 教育用地`, `05 商业服务业用地`, `1401 公园绿地` With `16 留白用地`, the areas of various land uses are as follows:[metric:land_use_area_sqm_0701], [metric:land_use_area_sqm_0802], [metric:land_use_area_sqm_05], [metric:land_use_area_sqm_1401], [metric:land_use_area_sqm_16] etc. indicators.

### Development Intensity and Form

The plan does not fictionalize the control indicators: the Floor Area Ratio, Building Height, Building Coverage Ratio, Green Space Ratio, and setback distances, which are missing in the site package and are all listed as to be confirmed [depth:development_intensity_controls]. This document only provides conceptual form suggestions—three synaptic nodes are suggested for high to medium intensity compact development to strengthen signal concentration, while the green veins and community interfaces are developed with medium to low intensity permeability to ensure public access. The architectural form is indicated by [depth:height_massing_character] through massing, façade, and roof vocabulary, without specifying exact height limits. The Building Footprint is expressed in [data:geometry/buildings.geojson#BLDG-001], and the total building scale is estimated in terms of floor area [metric:total_floor_area_sqm_est], with the Building Coverage Ratio and Building Footprint Area given in [metric:building_density] and [metric:building_footprint_area_sqm].

## Detailed Design of Key Areas

Three key areas have reached the depth of the Integrated Planning Implementation Plan in Urban Design, with each area detailing "positioning + spatial structure + building renewal + traffic and pedestrian facilities + Public Space + AI scenarios + implementation risks" [depth:three_key_area_detailed_design] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

### Zhongzhiyuan AI Independent Innovation Acceleration Area (North, approximately 192.1 hectares)

**Location**: Garden-type full-stack independent AI innovation district, a carrier area for the Full-Stack Independent AI Innovation System and AI governance global discourse power [data:geometry/key_areas.geojson#PROV-KEY-001].

**Space Structure**: Organize a low-carbon innovation interaction belt along the Qinghe interface, with internal spaces consisting of "R&D Clusters-Testing Fields-Standard Governance Living Room-Industrial Display Corridor" forming a full-stack loop. **Building Update**: Primarily focused on research and development land use [metric:land_use_area_sqm_0802], retain existing garden buildings that are amenable to renovation, and encourage vertical expansion and shared laboratories; **Traffic and Pedestrian Access**: Connect to external traffic on the North Fifth Ring Road and integrate with rail transit [data:geometry/roads.geojson#ROAD-001], set up cycling greenways along the Qinghe River; **Public Space**: Accelerate the square activities of the Zhongzhiyuan Public Space with [data:geometry/public_space.geojson#PUBLIC-001]; **AI Scenarios**: Autonomous model test field, safety governance sandbox, standard setting workshop, and low-carbon computing experience (refer to scenario card 02/08). **Implementation Risks**: External traffic, Qinghe Blue Line, and current land ownership rights require professional argumentation; this document is for conceptual direction only.

### Beijing AI Origin Community (China, approximately 104.3 hectares)

**Location**: On-Campus Type Technology Transfer and Talent Community, a Pivotal Node of the World-Class AI Innovation Ecosystem [data:geometry/key_areas.geojson#PROV-KEY-002].

**Space Structure**: Organize a "campus-park-district" three-tiered slow-moving seam, with the university innovation source circle, technology transfer circle, and talent living circle connected by the [data:geometry/roads.geojson#ROAD-001] slow-moving backbone. **Building Update**: Focus on research and educational land use [metric:land_use_area_sqm_0802] and [metric:land_use_area_sqm_0804], supplementing with technology transfer exhibition halls, talent apartments, and open-source collaboration spaces. The demolish–renovate–retain strategy focuses on preservation and renovation [depth:retain_renovate_demolish]. **Public Space**: The AI Origin Cultural Living Room (cultural land use 0803) and exchange square form the community public core [metric:land_use_area_sqm_0803]. **AI Scenarios**: Open-source release hall, technology transfer street near the campus, and edge-side computing service station (scene card 01/03/07). **Implementation Risks**: Involves university property rights and campus data authorization. All campus-related recommendations require the university's approval, and this document does not pre-judge the demolish–renovate–retain strategy. (Demolish–Renovate–Retain Strategy)

### Dazhongsi AI Industry Cluster (South, approximately 72.0 hectares)

**Location**: Urban-type intelligent economy and international exchange district, a carrier for new business forms born from intelligence and the circulation of data elements [data:geometry/key_areas.geojson#PROV-KEY-003].

**Space Structure**: Organize a quadrilateral pedestrian connection around the Dazhongsi rail station, with commercial service strips responding to industrial service strips in the north-south direction. **Building Update**: Focus on commercial and service land use [metric:land_use_area_sqm_05], integrating smart body displays, smart terminal retail, content consumption, and data element services. **Traffic Slow Travel**: Integrated access at the station and four-quadrant barrier-free connections at the intersection [data:geometry/roads.geojson#ROAD-001]. **Public Space**: Combine the Dazhongsi AI Square and planned green spaces for composite use [data:geometry/public_space.geojson#PUBLIC-001]. **AI Scenario**: International Roadshow Living Room, Data Element Living Room, smart body and smart terminal displays (scene card 05/08). **Implementation Risk**: The composite use of the station's four quadrants and green spaces involves approval for both the rail and green spaces, requiring professional argumentation. This document is a Conceptual Recommendation.

The design tasks for the three key areas and the references to the evidence are summarized in the following table, and can be located in `compliance_matrix.json`:

| Key Areas | Positioning | Spatial Actions | AI Scenarios | Evidence |
| --- | --- | --- | --- | --- |
| Zhongzhiyuan | Full-stack Autonomous Innovation | Research and Development Cluster + Standard Governance Living Room | Model Testing, Governance Sandbox | [data:geometry/key_areas.geojson#PROV-KEY-001] |
| Origin Community | Outcome Conversion Fount | Three Circles Layered Slow Travel Integration | Open Source Release, Near-School Conversion | [data:geometry/key_areas.geojson#PROV-KEY-002] |
| Dazhongsi | Intelligent Natively Originated New Business Forms | Four Quadrant Station-City Integration | International Roadshows, Data Elements | [data:geometry/key_areas.geojson#PROV-KEY-003] |

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

The agent task book requires at least 10 AI scenario cards, at least 3 industrial Testing and Validation Scenarios, and at least 5 user profile categories. The scenario cards must be located in spatial positions, serve specific targets, include operational data, define privacy boundaries, and undergo Human Review with the operational entity [source:AGENT-TASKBOOK] [depth:traffic_rail_slow_parking].

### Five User Archetypes

| Image | Typical Needs | Spatial Response | Privacy and Review Boundaries |
| --- | --- | --- | --- |
| Open Source Developer | Release, Collaborate, Test, Community Reputation | Origin Community Open Source Release Hall, Public Code Wall, Nighttime Collaboration Space | No personal behavior tracking, activity data is only aggregated for statistical purposes |
| Startup and Small/Medium Teams | Affordable Office Space, Computing Power Entry Point, Product Testing Ground | Zhongzhiyuan Shared Testing Ground, Edge Computing Power Station, Compliance Consultation Point | Computing Power and Data Services Require Separate Authorization |
| Headquarter Companies and International Visitors | Exhibitions, Business, International Reception, Talent Recruitment | Dazhongsi International Roadshow Living Room, Station Shuttle, Key Enterprise Public Interface | Corporate Identity and Case Studies Must Clear Rights |
| Surrounding Residents | Commuting, Leisure, Community Services, Low-Impact Updates | Jing-Zhang Heritage Park Slow-Travel Loop, Community Pocket Squares, Tiered Activities | Do Not Use Resident Profiles for Commercial Recommendations |
| College Students and Faculty | Result Transfer, Cross-Institution Collaboration, Daily Slow Travel | Campus-Park Slow Travel Integration, Result Transfer Hub, AI Education Experience Point | Campus Data and Research Results Must Be Authorized |

### Ten AI Scenario Cards (including 3 Industry Testing and Validation Scenarios)

| # | Scenario Card | Spatial Carrier | Type | Service Target | Operational Data | Privacy Boundary | Human Review | Operating Entity |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | Open Source Release Hall | AI Origin Community | Display | Developers/Universities | Event Reservation, Contribution Records | No Collection of Personal Behavior | Content Manual Review | Community Operations + Developer Autonomy |
| 02 | Safety Governance Sandbox | Zhongzhiyuan | **Industrial Testing Validation** | Enterprises/Research Institutions | Model Red Team Testing, Standard Evaluation | Test Data Isolation Desensitization | Expert Committee Review | Governance Body + Third-Party Evaluation |
| 03 | Edge Side Computing Hub | Overall Design Area Node | New Infrastructure | Residents/Developers | Computing Power Scheduling, Energy Consumption | Service Authorization System | Operational Maintenance Manual Inspection | Operator+Community |
| 04 | AI Pedestrian Navigation | Jing-Zhang Site Park | AI+Transportation | All citizens | Aggregate Anonymous Trajectories | Do not save individual trajectories | Manual Verification of Breakpoints | Park operator |
| 05 | Dazhongsi International Roadshow Living Room | Dazhongsi AI Industry Cluster | Display/Engage | Corporate/International Visitors | Appointment for Pitch Presentation, Media Release | Commercial Information Authorization | Content Review | operator of the industry |
| 06 | **Low-Speed Autonomous Delivery Test Street** | Xiaoyue River Scenario Enablement Wing | **Industrial Testing Validation** | Merchant/Resident | Order delivery identifiers redacted | facial-obscuring, path-anonymity | Safety officer on-site review | Test operator+traffic management |
| 07 | Near-School Technology Transfer Street | AI Origin Community | Services | Higher Education/Startups | Patent Disclosure, Investment and Financing Matching | Research Outcome Licensing | Review by Transfer Specialist | University + Incubation Platform |
| 08 | Data Element Living Room | Dazhongsi Area | Industrial Services | Enterprises/Data Institutions | Data Asset Registration | Compliance Authorization, Auditable | Compliance Review | Data Trading Institution |
| 09 | AI-Life Service Sample Street | Intersection of Community and Commerce | AI+Life | Residents | Service Booking Desensitization | Minimal Data Collection | Community Manual Confirmation | Property Management + Service Providers |
| 10 | **Urban Agent Operations Testing Field** | Public Space Node | **Industrial Testing and Validation** | Enterprise/Government | Operations Work Orders, Inspection Records | Public Data Transparency | Work Order Manual Closure | City Operator + Enterprise |

Three Testing and Validation Scenarios (02/06/10) are all marked as "Testing Scenario" and are not considered approved for operation; all scenarios adhere to the principles of data minimization, public sources, explainability, and Human Review, and do not output unauthorized personal profiles, nor do they claim official implementation commitments [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The scenario-space-operation mapping is entered into `compliance_matrix.json` and visualized HTML, with spatial carriers referencing [data:geometry/public_space.geojson#PUBLIC-001], [data:geometry/roads.geojson#ROAD-001], and [data:geometry/green_space.geojson#GREEN-001].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The zoning areas adopt the "Intelligent Vein Grid": seven functional belts are divided along the longitudinal lines (West Bank Talent Community Belt, Community Service Belt, Higher Education Synergy Belt, Jing-Zhang Intelligent Green Vein, AI R&D Innovation Belt, Scenario Commercial Service Belt, and Mass Intelligence Industry Acceleration Belt), and seven segments are divided along the latitudinal lines. Form a seamless grid [depth:land_use_layout] that fully covers [data:geometry/site_boundary.geojson#SITE-001]. Land use classification follows [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] and reserve `16 留白用地` As a future intelligent-native space for development [metric:land_use_area_sqm_16].

The architectural proposal distinguishes between conceptual and confirmatory levels: this document provides an estimate of the Building Footprint (clustered blocks) and floor levels, forming the total architectural scale [metric:total_floor_area_sqm_est], number of buildings [metric:building_count], and Building Coverage Ratio [metric:building_density]; while the official Floor Area Ratio, Building Height, setback, and control plan conditions are all listed as confirmatory [depth:development_intensity_controls]. The Demolish–Renovate–Retain Strategy follows a "retain-renovate-combine-new" logic, retaining the Jing-Zhang Heritage Park and the current community fabric, renovating inefficient industrial spaces, combining AI scenarios, and only proposing new construction concepts for clearly inefficient plots, without pre-judging specific retain-renovate-demolish conclusions [depth:retain_renovate_demolish]. The building footprint layer is available at [data:geometry/buildings.geojson#BLDG-001], with form vocabulary constrained by [depth:height_massing_character].

## Transport, Rail, Municipal Infrastructure, and Public Services

The traffic strategy is centered around the core judgment that "there is an abundance of rail resources, but a lack of continuity and accessibility within the last 300 to 800 meters." [depth:traffic_rail_slow_parking] The plan organizes road micro-circulation with the main north-south axis and three east-west stitching branch lines [data:geometry/roads.geojson#ROAD-001]. It addresses the rail end solutions through integrated station access, repair of pedestrian discontinuities, accessible paths, and low-speed connections [metric:road_centerline_length_m]. Road area is estimated using a conceptual buffer [metric:road_area_sqm_est]. Road red lines, station entrances, utility lines, fire safety, parking, and event day capacity are all listed as conditions to be addressed, without forming a definitive policy conclusion.

Municipal and New Infrastructure [depth:municipal_new_infrastructure]: Innovative service platforms and talent living service facilities are laid out along the wisdom veins, green veins, and synaptic nodes. Distributed energy, edge-side computing power, and public service facilities are integrated to form the prototype of "computing waystations." Traditional municipal facilities (drainage, energy, communication) are to be implemented in phases in conjunction with Urban Renewal. Those lacking pipeline and engineering data are listed as formal deepening prerequisites. Public service facility service radii are organized according to the concept of a 15-minute living circle, with specific facility standards to be confirmed by official documentation. (Phased Implementation)

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

The blue-green system uses the Jing-Zhang Relic Park as the "green spine," connecting the Qinghe (Zhongzhiyuan interface) and Xiaoyuehe (scene empowerment wing) water systems [data:geometry/green_space.geojson#GREEN-001], forming a continuous network for walking and cycling [metric:green_ratio]. The Public Space system is structured as "three squares plus multiple pockets plus walking nodes": the Zhongzhiyuan Acceleration Square, Origin Community Exchange Square, and Dazhongsi AI Square as the three key square nodes [data:geometry/public_space.geojson#PUBLIC-001], with community pocket squares and the Wisdom Vein View Platform added [metric:public_space_ratio]. The Urban Character is based on "Intelligent Vein Rusty Red + AI Electric Blue," with architectural roof vocabulary and massing controlled by [depth:height_massing_character], and the overall character is coordinated according to [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:blue_green_public_space].

### AI Pilgrimage Site and Honor Display (agent.4)

The proposal suggests three AI landmarks (all Conceptual Recommendations, not predicated on construction):

1. **Intelligence Vein Human Character Ridge View Platform** (Jing-Zhang Heritage Park North Segment): Inspired by Zhan Tianyou's "human character-shaped railway," this project translates historical innovative spirit into a public memorial space for the AI era, serving as the spiritual origin point of the Belt.
2. **AI Origin Open Source Sanctuary** (AI Origin Community Cultural Lounge): A ceremonial scene for open-source collaboration and result release, with an honor wall showcasing developers and community contributors, forming a developer pilgrimage node.
3. **Dazhongsi Zigu Living Room** (Dazhongsi International Roadshow Living Room): This space is designed as a venue for international roadshows, data element displays, and demonstrations of smart terminals, with an honor display system open to both enterprises and city contributors.

Three landmarks are interconnected with the Jing-Zhang Heritage Park, innovation culture in Zhongguancun, developer communities, and Public Space system, forming a "pilgrimage route" concept [source:AGENT-TASKBOOK]; all landmark names, fonts, images, and signage are based on original concepts and do not involve unauthorized portraits, trademarks, or copyrighted materials [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Renewal Projects, Implementation Policy, and Phasing

Update projects are organized into four categories: "Synapse Strengthening, Green Vein Seaming, Scene Embedding, and Municipal Gap Filling." A project list is formed (see `compliance_matrix.json` and the A3 brochure), with each category providing an explanation of spatial location, dependency conditions, and the concept of the implementing entity [depth:renewal_project_list].

Phased Implementation is organized into three time periods [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation]:

- **Near Term (1-2 Years)**: Demonstration of the Dazhongsi node and mid-segment green pulse, prioritizing the completion of operational pilots for station connectivity, square, and scene cards 01/05/09 [metric:phasing_area_sqm_near].
- **Mid-term (3-5 Years)**: Urban Renewal of the Origin Community and Mid-term Urban Area, advancing the integration of the three concentric circles for pedestrian-friendly connections, the Transformation Results Street, and Scene Card 02/07/08 [metric:phasing_area_sqm_mid];
- **Long-term (6-10 years)**: The full-stack innovation belt of Zhongzhiyuan and its two wings will be fully formed, advancing the Testing and Validation Scenario 06/10 and deepening the pilgrimage site [metric:phasing_area_sqm_long].

Implement policies within the boundary of the "Conceptual Recommendation": propose updates to project and policy direction (Scenario Access, computational subsidy, data compliance, developer community incentives, event brand operation), with all policies and funding arrangements serving as deepening directions and not expressing them as determined government arrangements [source:AGENT-TASKBOOK]. Long-term operations will be handled by the activity system of agent.6: three major events annually, including the "Jing-Zhang AI Developer Festival," "Scenario Access Day," and the "International AI Pitch Week," combined with developer community operations, scenario access operations, public experience routes, and international dissemination and attraction mechanisms [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Metrics, Area Recalculation, and Compliance Matrix

The indicator system covers nine categories of indicators, all of which can be recalculated from structured data or clearly marked as unknown [depth:metrics_recalculation]:

1. **Area Categories**: Site Area [metric:site_area_sqm], Provisional Temporary Area for Key Zones [metric:key_area_zhongzhiyuan_ai_acceleration_area_sqm_provisional], [metric:key_area_beijing_ai_origin_community_sqm_provisional], [metric:key_area_dazhongsi_ai_industry_cluster_sqm_provisional];
2. **Land Use Structure Category**: areas of various land uses [metric:land_use_area_sqm_0702], [metric:land_use_area_sqm_0804];
3. **Building Type**: Building Footprint Area [metric:building_footprint_area_sqm], Building Count [metric:building_count], Building Coverage Ratio [metric:building_density], Estimated Total Building Floor Area [metric:total_floor_area_sqm_est];
4. **Green Space Category**: Green space area [metric:green_space_area_sqm] and green space ratio [metric:green_ratio];
5. **Public Space Category**: Public space area [metric:public_space_area_sqm] and proportion [metric:public_space_ratio];
6. **Transportation Category**: Road centerline length [metric:road_centerline_length_m] and estimated road area [metric:road_area_sqm_est].
7. **Phasing Categories**: Near/Mid/Long-Term Phasing Areas [metric:phasing_area_sqm_near], [metric:phasing_area_sqm_mid], [metric:phasing_area_sqm_long];
8. **Key Area Category**: Number of key areas [metric:key_area_count];
9. **Pending Confirmation Category**: Official Floor Area Ratio, Building Height, Building Coverage Ratio, Green Space Ratio, and setback controls are missing in `planning_limits.json`, all listed as unknown, and no fictional values are assigned [depth:development_intensity_controls].

All areas and proportions have been recalculated in the EPSG:4548 projection from GeoJSON as per the announcement requirements, with the formulas, sources, and confidence levels recorded in `metrics.json`. The compliance matrix `compliance_matrix.json` covers items 1.3.1—1.5.3 and agent.1—agent.6; the standard matrix `standard_matrix.json` covers the six mandatory standards; and the design depth matrix `design_depth_matrix.json` covers 15 optional depth items, each declared as complete and linked to the text, drawings, layers, metrics, and sources [depth:risk_missing_data].

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

**Data and Boundary Risks**: The official boundaries and the polygon for the key area are missing. This document uses provisional geometry, which is subject to limitations in accuracy. All layers and metrics will need to be recalculated upon the release of official data. Control plan conditions, such as the Floor Area Ratio (), height restrictions, setback distances, and green space ratios, are also missing. Therefore, the related conclusions are all Conceptual Recommendations [depth:risk_missing_data]. **Copyright and Authorization**: This plan only uses publicly available and cleared materials, and does not use any unauthorized planning maps, data, images, trademarks, fonts, or copyrighted materials. All cited materials are registered in `sources.json` and `report/copyright_statement.md`. **Privacy and AI Responsibility**: All AI scenarios adhere to the principles of data minimization, public sources, explainability, and Human Review. Personal behavior trajectories are not collected, and no unauthorized personal profiles are generated. **Compliance Boundaries**: All spatial recommendations in this plan are Conceptual Recommendations, reference proposals, or materials for professional teams to deepen their research. They do not replace formal planning, nor do they constitute government approval conclusions, investment commitments, engineering feasibility assessments, or conclusions on the Demolish–Renovate–Retain Strategy at the plot level. (Official Boundary) The content involving specific building density, Building Height, road alignment, and ownership should be clearly marked as Conceptual Recommendations rather than official approved results. **Pending Additional Information List**: Official Boundary and key area polygons, control plan conditions, current buildings and ownership, road right-of-way, utility infrastructure, rail station engineering data, Qinghe/Xiaoyuehe blue lines and cultural heritage protection areas, are all formal pre-deepening prerequisites [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

## References

- `brief/site-package/design_brief.json` [source:SITE-PACKAGE]
- `brief/site-package/agent_taskbook.json` [source:AGENT-TASKBOOK]
- `brief/site-package/allowed_design_space.json` [source:SITE-PACKAGE]
- `brief/site-package/ranges/planning_limits.json` [source:SITE-PACKAGE]
- `brief/site-package/standards/standards.json` and `references/` snapshot [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]
- `data/source_registry.json` [source:SOURCE-REGISTRY]
- `data/processed/agent_fact_pack.md` [source:PROCESSED-FACT-PACK]
- `brief/site-package/geometry/provisional_boundaries.geojson` [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]
- `brief/site-package/schemas/compliance_matrix.schema.json`
- `brief/site-package/schemas/standard_matrix.schema.json`
- `brief/site-package/schemas/design_depth_matrix.schema.json`
- `brief/site-package/schemas/metrics.schema.json`
- `data/processed/project_scope_summary.csv` (processed package navigation)
- `data/processed/agent_task_requirements.csv` (processed package navigation)
- `data/processed/missing_data_checklist.csv` (Handling Procedures)
