---
title: "Jing-Zhang Smart Spine: Conceptual Overall Design of the Centennial Jing-Zhang AI Innovation Belt"
author_github: "Happy2Git"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A formal AI Urban Design package generated based on the provisional boundary and structured self-inspection requirements; retain accuracy warnings and recalculation requirements, but ensure that data gaps in the sponsor's data do not block content scoring."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# Jing-Zhang Smart Spine: Conceptual Overall Design of the Centennial Jing-Zhang AI Innovation Belt

## Design Basis and Source List

This plan is based on the qualification pre-review announcement for the international scheme solicitation of the "Centennial Jing-Zhang AI Innovation Belt Urban Design" issued by the Haidian Branch of the Beijing Municipal Commission of Urban Planning and Natural Resources, and the global intelligent body open solicitation task document. It is an **Open Co-Creation Conceptual Recommendation** submitted by the AI intelligent body, which does not replace the formal plan and does not constitute the government's review conclusion. The plan is based on the machine-readable basis (design task document, design spatial boundary, source list, enumeration, indicator range, standard snapshot) registered in the `brief/site-package/` and the public source registration in `data/source_registry.json`. The current repository does not provide official precise boundaries and key area polygons. This package generates temporary geometry using `brief/site-package/geometry/provisional_boundaries.geojson` (with `official_boundary=false`, `geometry_role="provisional_constraint"`, and `boundary_precision="provisional_rough"`), which is only for generating proposals, self-checking, visualization, and non-regulatory design discussions. The lack of organizational data does not block content scoring; all area-sensitive metrics must be recalculated according to this document's risk section upon the official polygons' release.

This section of the Evidence Chain cites [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE], [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] and [depth:existing_conditions_diagnosis].

Source boundary: [source:SOURCE-REGISTRY] Distinguish between formal available, background_only, provisional_only, and unavailable categories; this plan uses only formal available data for formal conclusions, and all provisional geometries are annotated with accuracy limitations. All spatial recommendations in the proposal should be expressed as "Conceptual Recommendation, Reference Proposal, or for Further Research by Professional Teams," and should not be expressed as statutory planning, approved for implementation, investment commitments, or conclusions regarding the Demolish–Renovate–Retain Strategy.

![Overall Scheme Evidence Chain and Submission Package Relationship Diagram](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal is organized into three levels as per the announcement: **Coordinated Research Area** (43.6 square kilometers, north to the North Fifth Ring Road, east to the Jingzhang Expressway, south to West Straight Street, west to Wanquan River Road) addressing AI industry ecology and future urban form; **Overall Design Area** (11.4 square kilometers, the urban and industrial areas within 1-2 kilometers around the Jingzhang Site Park) implementing the overall framework of Urban Renewal, industrial space, transportation infrastructure, and urban form control; **Key-Area Detailed Design Area** (368.4 hectares) for detailed design of the Zhongzhiyuan AI Independent Innovation Acceleration Area (192.1 hectares), Beijing AI Origin Community (104.3 hectares), and the Dazhongsi AI Industry Cluster Area (72.0 hectares). Each of the three areas is mapped to [source:OFFICIAL-ANNOUNCEMENT] 1.3, 1.4, 1.5, and the tasks in agent.1-agent.6, with the coverage shown in `compliance_matrix.json`. (Jing-Zhang)

| Level | Design Issue | This Solution Addresses | Data Focus |
| --- | --- | --- | --- |
| Coordinated Research Area | AI Industry Ecosystem and Future Urban Form Integration | Innovation Chain "University Pioneering - Open Source Collaboration - Enterprise Transformation - Public Experience - International Promotion" and Synergistic Loop with Three Zones and Two Wings | compliance_matrix.json, standard_matrix.json |
| Overall Design Area | Industrial Space, Urban Renewal, Transportation and Utilities, how to be represented on the map | "One Belt, Three Cores, Two Wings, Four Rings, Multiple Points of Scenery" Spatial Structure | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-Area Detailed Design Area | How to Achieve Detailed Design Depth for Three Areas | Propose positioning, spatial actions, AI scenarios, implementation dependencies, and the Demolish–Renovate–Retain Strategy for each | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

Three layers are not three isolated drawings: integrated research determines the industrial chain and urban form, and overall design translates these judgments into the implementation of update projects and facilities. The detailed design of key areas verifies the feasibility of functions, buildings, transportation, Public Space, and AI scenarios. All area, proportion, and scale conclusions are recalculated based on [data:geometry/site_boundary.geojson#SITE-001] and derived layers under EPSG:4548 projection (see [metric:site_area_sqm]), with all unrecalculable indicators marked as unknown. The work depth is constrained by [depth:three_level_scope_framework] and [depth:overall_spatial_structure], and the task organization is guided by [source:PROCESSED-FACT-PACK] (this file is not an authoritative source but helps organize the three-layer scope, key areas, and task lists).

![Three-level scope and spatial structure work framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Naming System and Visual Identity (Task agent.1)

The main name is suggested to be **"Jingzhang AI Spine"**, with the English name **Jingzhang AI Ribbon** ("Ribbon" echoes the ribbon-like heritage of the railway and the innovative belt form, "Spine" can serve as a secondary level name AI Spine). Naming logic: **Jingzhang** anchors the original point of a century of independent innovation history (Jian Tianyuo led, China's first independently designed mainline railway), **AI Spine** takes the meaning of "wisdom spine" — just as the tracks are the backbone infrastructure of the industrial era, the AI Innovation Belt should serve as the backbone for urban functions and industrial ecosystems in the intelligent era, and "Spine" echoes the ribbon-like spatial form of the heritage park. Name system is tiered into three levels: (Jing-Zhang)

- **Main Name of the Initiative**: Jing-Zhang AI Ribbon
- **Core Names**:
Zhongzhiyuan AI Independent Innovation Acceleration Area → "Huiyuan Valley" (Full Stack Independent Innovation Source); Beijing AI Origin Community → "Yuandili" (Near-School Technology Transfer and Open Source Community); Dazhongsi AI Industry Cluster Area → "Huisijie" (Intelligent Natively Consumptive Business and Social Interaction).
- **Names of the Wings**: Zhongguancun Technology Services Wing → "Smart Service Wing"; Xiaoyue River Scenario Enablement Wing → "Smart Life Wing"

Visual Identity (Logo) Concept Direction: Taking the Jing-Zhang Railway's iconic "person" shaped alignment (the Qinglong Bridge person-shaped turnaround line) as the theme, the "person" is deconstructed into two intersecting light paths, one representing the century-old railway heritage (rusty iron color) and the other representing AI data flow (a gradient of cyan), with the intersection forming a "wisdom core" node, symbolizing the intersection of human-machine collaboration and the convergence of history and the future. The logo is provided as a directional Conceptual Recommendation; formal use must be developed by professional designers and clear the font and graphic elements. [agent.1 Compliance evidence can be found in compliance_matrix.json; no reference to Floor Area Ratio, height, Demolish–Renovate–Retain Strategy, or red line conclusions]

### Global AI Innovation Ecosystem Case Studies (Task agent.2, 5-8)

This plan selects 6 real case studies, all of which are publicly verifiable completed or ongoing innovative ecological practices, to extract spatial-ecological mechanisms for Haidian to emulate:

| # | Case | Public Facts (Not Speculated for This Proposal) | Lessons for Haidian |
| --- | --- | --- | --- |
| 1 | Boston Kendall Square,  | Anchored by MIT and Harvard, with biotech and AI companies clustering, a "waterfront park-metro station-shared lab building" walkable structure | Near-school transformation must include campus-parkway slow-moving integration (mapping to the original community) |
| 2 | Singapore One-North | Government-led park district, integrating Biopolis/Fusionopolis with the One-North Technology City station, promoting a "work-live-study-play" integrated approach | Transit-Station Integration and mixed-use organization (aligned with Dazhongsi station) |
| 3 | London King's Cross | Railway industrial heritage redevelopment, with Central Saint Martins and tech companies co-located, Public Space as a leading update sequence | Industrial heritage revitalization + cultural institution-driven update (mirroring Jing-Zhang Heritage Park) |
| 4 | Shenzhen Nan Mountain High-Tech Park | Market-driven hardware innovation, high mixing of industry-residential-commercial uses, high density of metro station nodes | High-density mixed innovation district with metro integration (mirroring the Dazhongsi area) |
| 5 | Hangzhou Future Technology City (Dream Town) | E-commerce and Innovation Incubation, Townhouse-style Low-Rise Blocks + Open Green Network | Open Blocks, Low-Cost Startup Space Supply (Referencing Zhongzhiyuan) |
| 6 | Japan Toshima Smart City | A collaborative urban experiment field involving government, industry, academia, and community, with pilot initiatives for publicizing energy, transportation, and health data | Public data open sandbox and experimental district operation (mapping industrial Testing and Validation Scenarios) |

The above cases are provided for reference purposes only and do not constitute a binding statement regarding the current status of any city or enterprise. [agent.2 Evidence: case_study_table see this section's table, ecosystem_map see [data:geometry/land_use.geojson#LU-001], industry_space_mapping see grid matrix]

### Haidian AI Innovation Ecosystem Map and Three Zones and Two Wings Synergistic Loop

The ecological map is organized by elements: **talent** (Haidian universities and global developers), **computing power** (national artificial intelligence platforms and edge computing nodes), **data** (open public data and compliant data circulation), **scenarios** (AI+ vertical application openness), **capital** (Zhongguancun venture capital and Zhongguancun Technology Services Wing), and **governance** (standard setting and security governance display). The Three Zones and Two Wings work in a coordinated loop: Zhongzhiyuan (Huiyuan Valley) takes on full-stack independent innovation and governance authority — Zhongguancun Technology Services Wing takes on global element configuration and capital empowerment — Yuanlili takes on technology transfer and talent special zone — Huisijie takes on intelligent native new business models and international exchanges — Xiaoyue River Scenario Enablement Wing takes on the landing of AI life scenarios — the loop is connected through the Public Space of Jing-Zhang Heritage Park to form a "innovation-transformation-landing-display-dissemination" loop. This loop is a Conceptual Recommendation for professional teams to deepen, and is not expressed as an approved layout.

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

Overall Design Area (11.4 square kilometers) requires the depth of Urban Design as per the Regulatory Detailed Planning: identifying inefficient spaces, forming an overall update framework, and implementing industrial space layout and facility capacity. The scheme organizes the spatial structure with "one belt, three cores, two wings, four rings, and multiple points of scenarios" — "one belt" is the Jing-Zhang Heritage Park Vitality Belt (a north-south axis of historical, ecological, and innovative significance, connecting the Tsinghua Garden Station, various segments of the heritage park, and Dazhongsi Station); "three cores" correspond to three key areas (Huiyuan Valley, Yuandianli, and Huishijie); "two wings" are the Hui Service Wing towards Zhongguancun and the Hui Life Wing towards Xiaoyuhe; "four rings" are two slow travel green rings (Qinghe and Xiaoyuhe) and two functional rings (pedestrian ring around the rail station, innovation interaction ring); "multiple points of scenarios" are anchored at nodes corresponding to AI scenario cards. The spatial structure intention is constrained by [depth:overall_spatial_structure], while the Land-Use Layout and development intensity methods are constrained by [depth:land_use_layout] and [depth:development_intensity_controls]. Structure falls to layer evidence as seen in [data:geometry/land_use.geojson#LU-001] and [data:geometry/roads.geojson#ROAD-001], with scale verification in [metric:site_area_sqm]. Data gaps: Official zoning plans, road right-of-way, and property ownership have not been released, with all intensity values treated as unknown (see [metric:floor_area_ratio]), to be recalculated upon formal conditions confirmation.

### Spatial Structure: "One Belt, Three Cores, Two Wings, Four Rings, and Multiple Points of Scenery"

- **One Belt**: Jing-Zhang Relic Park Vitality Belt, a historical-ecological-innovative main axis running north-south, connecting the Jing-Zhang Railway Station, various segments of the Jing-Zhang Relic Park, and Dazhongsi Station.
- **Three Core Areas**: Huiyuan Valley (Zhongzhiyuan), Yuanchian Li (Original Community), and Huishijie (Dazhongsi), corresponding to three key areas.
- **Wings**: Smart Service Wing (Tech Services towards Zhongguancun) and Smart Life Wing (Scene Empowerment towards Xiaoyuhe).
- **Quadruple Ring**: Two slow travel green rings (the North Ring around Qinghe and the South Ring around Xiaoyuehe) and two functional rings (the Walkable Ring around the Rail Station and the Innovation Interaction Ring).
- **Multiple Scenarios**: AI scene cards correspond to nodes, see the scenarios chapter.

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

### Site, Building, and Demolish–Renovate–Retain Strategy

The land-use structure is expressed according to the [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], with `geometry/land_use.geojson` fully covering the submission boundary without any gaps or overlaps (see [data:geometry/land_use.geojson#LU-001]). This plan does not provide any conclusions at the plot level for the demolish–renovate–retain strategy; instead, it proposes a **classification method and principles** for the **[depth:retain_renovate_demolish]**: railway heritage and cultural protection elements (such as the Tsinghua Garden Station) should be retained as a priority; inefficient industrial spaces should be primarily renovated (through functional integration and activation of the ground floor); and new construction should only be used for clear Public Spaces and service gaps that require innovation (such as edge-side computing service stations and honor display nodes), and must await confirmation of formal control plans and ownership conditions. The depth of the Land-Use Layout is constrained by [depth:land_use_layout], while the Development Intensity and control methods are constrained by [depth:development_intensity_controls] (this plan does not set any intensity values, which will be determined by the formal control plan). (Demolish–Renovate–Retain Strategy) The Building Footprint is expressed in [data:geometry/buildings.geojson#BLDG-001], and scale review is available in [metric:building_footprint_area_sqm]; the Floor Area Ratio, height, setback values, and other control metrics are all marked as unknown (see [metric:floor_area_ratio]), and are listed as formal preconditions for further development.

## Transport, Rail, Municipal Infrastructure, and Public Services

### Traffic, Transit, Infrastructure, and Public Services Strategies

Traffic strategies revolve around five key actions:
1. **Transit-Station Integration** —— Develop "exit-to-innovation" connection interfaces at stations such as Dazhongsi, Qichun Donglu Xikou, Wodao Kou, etc.;
2. **North-South Throughway** —— Cross-ring road pedestrian nodes and east-west connection tunnels (Conceptual Recommendation, bridge and tunnel schemes require professional evaluation) for the Jing-Zhang Heritage Park;
3. **Road Micro-Circulation** —— Intensify internal branch roads within industrial districts and open pedestrian zones;
4. **Parking and Slow Travel** —— Non-motorized vehicle parking and public bicycle networks are linked along the heritage park;
5. **External Transportation** —— Innovate district identification and connections in the north towards the Fifth Ring Road and the Jingzhang Expressway. Layer information is available at [data:geometry/roads.geojson#ROAD-001]. Municipal and new infrastructure facilities (distributed energy, edge-side computing, public data nodes) are expressed with the "service node + pipeline belt" concept at [data:geometry/constraints.geojson#CONSTRAINTS], with all engineering capacities, loads, and pipeline conditions listed as pending confirmation. [depth:traffic_rail_slow_parking], [depth:municipal_new_infrastructure]

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## Detailed Design of Key Areas

### Zhongzhiyuan AI Independent Innovation Acceleration Area (Huiyuan Valley, PROV-KEY-001)

**Location**: Garden-type Full-stack Autonomous Innovation District. **Spatial Actions**: Strengthen the Qinghe interface (blue-green waterfront + low-carbon interaction space), organize the industrial display axis, open the test field and standard governance display area, and optimize external traffic organization. **AI Scenarios**: Autonomous model test field, standard setting workshop, safe governance exhibition hall, low-carbon computing power experience point. **Implementation Dependencies**: Qinghe Blue Line and flood control conditions, national artificial intelligence platform open rules, ownership and control plan conditions. [depth:three_key_area_detailed_design]

### Beijing AI Origin Community (Origin Lane, PROV-KEY-002)

**Location**: School-based Type of Technology Transfer and Talent Community. **Spatial Actions**: Campus-Park-Street Slow Travel Integration (Echoing Kendall Square Mechanism), Supplementing Technology Transfer Exhibition Hall, Talent Special Zone Services, Living Accommodations, and Open Source Collaboration Spaces; Propose a Preservation/Remodeling Classification Method for Buildings, Without Reaching a Conclusion on Demolition or Renovation. **AI Scenarios**: Open Source Community Exhibition Hall, On-Campus Incubator, Technology Transfer Service Station, AI Education Experience Points. **Implementation Dependencies**: Campus Boundary and Ownership, Technology Transfer Policy Alignment. [depth:three_key_area_detailed_design]

### Dazhongsi AI Industry Cluster (Huisijie, PROV-KEY-003)

**Location**: Urban-type Smart Economy and International Exchange District.
**Spatial Actions**: Integrated development of Dazhongsi Station, quadrants of pedestrian connectivity at the intersection, public environment updates around key enterprises, and revitalization of commercial services along the street.
**AI Scenarios**: Display stores for intelligent bodies and smart terminals, content consumption scenarios, data element salon, and international roadshow salon.
**Implementation Dependencies**: Engineering conditions of the rail transit station, municipal pipeline conditions at the intersection, and the willingness of enterprises to participate (Conceptual Recommendation, no commitment to renovate enterprise buildings). [depth:three_key_area_detailed_design]

![Index Map for Three Key Areas Detailed Design](assets/figures/key-areas.png)

## AI Innovation Ecosystem, talent profiling, and AI-Enabled Scenario (Task agent.3)

### User Profiles (at least 5 categories, this plan includes 6 categories)

The organizational framework for characterizing and scenario development is guided by [source:PROCESSED-FACT-PACK]. Scenario cards must meet the quantitative requirements specified in [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] for "at least 10 scenario cards, at least 3 Testing and Validation Scenarios, and at least 5 user profile categories." The spatial locations are defined in [data:geometry/public_space.geojson#PUBLIC-001].

| Image | Typical Needs | Spatial Response | Privacy and Review Boundaries |
| --- | --- | --- | --- |
| Open Source Developer | Release, Collaborate, Test, Community Reputation | Open Source Release Hall, Public Code Wall, Nighttime Collaboration Space | No Personal Behavior Tracking, Activity Data Only Aggregated and Statistically Summarized |
| Startup Team | Low-Cost Office, Computing Power Entry Point, Product Test Bed | Wisdom Valley Shared Test Bed, Edge Side Computing Power Station | Computing Power and Data Services Require Separate Authorization |
| Lead Corporate Visitors | Exhibitions, Business, International Reception, Talent Recruitment | Shuiseji International Roadshow Living Room, Track Transfer, Corporate Adjacent Public Spaces | Corporate Identity and Case Studies Must Clear Rights |
| College Students and Faculty | Technology Transfer, Cross-Institutional Collaboration, Daily Active Transportation | Campus-Area Integration, Technology Transfer Hub, AI Education Experience Points | Campus Data and Research Results Must Be Authorized |
| Surrounding Residents | Commuting, Leisure, Community Services, Low-Impact Updates | Heritage Park Pedestrian Loop, Embedded Community Services, Activity Tiered Management | Do Not Use Resident Profiles for Commercial Recommendations |
| International Visitors/Participants | Cultural Experience, Guiding, and Event Participation | Jing-Zhang Cultural Guiding Route, AI Pilgrimage Route, Event Week Venue | Guiding Data Anonymized, Human Review |

### AI Scenarios Cards (at least 10 cards, this proposal includes 12 cards)

| # | Scenario Card | Spatial Carrier | Service Target | Data/Privacy Boundary | Operational Subject Concept |
| --- | --- | --- | --- | --- | --- |
| 01 | Open Source Release Hall | Origin Park (PROV-KEY-002) | Developers, Higher Education Institutions | Code Open, No Collection of Personal Trajectories | Open Source Community + Park Operator |
| 02 | Safety Governance Sandbox | Huiyuan Valley (PROV-KEY-001) | Model developers, standard institutions | Test data desensitization, manually reviewed by red team. | Research Institution+Governance Display Team |
| 03 | End-Side Computing Hub | Overall Design Area Node | Entrepreneurs, Residents | On-Demand Authorization, Transparent Metering | New Infrastructure Operation Entity (To Be Deepened) |
| 04 | AI Slow Travel Signage | Heritage Park Vitality Corridor | Pedestrians, Cyclists | Low-Intrusion Sensors, Aggregating Flow Data | Park Operator |
| 05 | International Roadshow Living Room | Wisdom Market (PROV-KEY-003) | Enterprises, Investors | Content Cleared for Distribution | Exhibition Operator |
| 06 | Qinghe Low-Carbon Innovation Corridor | Wisdom Valley along the Qinghe River Interface | Park, Public | Environmental data open, no personal data | Park+Water Management Collaboration |
| 07 | Neighborhood Conversion Street for University Research Results | Origin Point | Students, Start-up Teams | Display Only After Research Results are Authorized | University Science Park + Street |
| 08 | Data Element Living Room | Wisdom Market | Data Enterprises, Regulatory Bodies | Compliance, Authorization, Auditable | Data Exchange Node (Concept) |
| 09 | AI Life Service Model Street | Smart Living Wing (Xiaoyuehe Alongline) | residents, office workers | Service records localized, human appeal channel | streets+service enterprises |
| 10 | AI Education Experience Point | At the Origin and Midsection of the Park | Students, Families | Educational Data Remains Within the School | School + Scientific Institution |
| 11 | Industrial Testing Validation District | Wisdom Source Valley Open Testing Field | Enterprises, Research Institutes | Test Data Isolation, Scenario Compliance Approval | Park + Industry Institutions (See Next Section) |
| 12 | Global AI Activity Week Route | One Belt Public Space System | Global Participants | Public Promotion, Event Reporting | Competition Organizing Committee (Concept) |

### Testing and Validation Scenario for Industry (at least 3 scenarios)

This proposal corresponds to the `tracks` and presents 3 Testing and Validation Scenarios:
1. **AI Traffic and Walkability** (ai-traffic-walkability) — deploy a test for pedestrian flow and signal prioritization along the heritage park to verify the reliability of AI wayfinding and traffic organization, with test data desensitized and access to Human Review;
2. **Enterprise Service Copilot** (enterprise-service-copilot) — establish a pilot for an intelligent enterprise service agent at Huiyuan Valley, covering non-confidential services such as policy matching, space reservation, and compute application, with results subject to human review before being made public;
3. **Public Safety Operations Review** (public-safety-operations-review) — intelligent agents for predicting crowd density and emergency response during event weeks and high-traffic nodes, with predictive conclusions serving only as a reference, and final decision-making always made by humans.
All three scenarios are **testing and validation suggestions** and are not expressed as approved operations or mature deployments. [agent.3 Evidence: scenario_cards see above table, persona_table see portrait table, privacy_and_human_review_boundary see boundary columns in respective tables]

## AI Public Space, Intelligent Natively Generated New Business Models and Pilgrimage Landmark (Task agent.4)

### Jing-Zhang Relic Park AI Public Space with East-West Integration and North-South Connectivity

Construct a "Park as an Innovation Living Room" centered around the relic park: the southern segment (near Dazhongsi) will carry the functions of showcasing and international exchanges, the middle segment will focus on open-source and honor displays, and the northern segment (near Zhongzhiyuan) will be dedicated to testing and low-carbon experiences; the east-west direction will be connected through the concept of overpasses and underpasses, with the bridge and tunnel solutions requiring professional argumentation (this solution is only for conceptual direction); the north-south direction will be seamlessly integrated with pedestrian, cycling, and tour routes. Public Space component library (concept): smart resting pavilions (solar-powered + edge-side computing), buried signposts, modular detachable devices, and accessible information columns, all of which will be designed using open-source protocols, allowing professional teams to select and refine them.

### Smart Native New Business Model (Smart Market)

Organize new business models around intelligent agents, smart terminals, content consumption, and data elements: smart terminal experience collection stores, AI content creation workshops, data element compliance lounges, and international roadshow and media release spaces. These business models are Conceptual Recommendations and do not guarantee enterprise occupancy.

### AI Sacred Landmark (at least 3, this plan includes 4)

1. **Tsinghua Yuan Railway Station·Digital Time Axis**: Ground-level embedded light bands forming a digital time axis centered on the century-old railway station, commemorating the "1896 Planning-1909 Operation-2026 AI Year" timeline, honoring Zhan Tianyou and China's first self-built mainline railway; 2. **Wisdom Spine Open Source Honor Wall**: An open-source contributor honor display wall and list of intelligent entities' contributions are set in the middle segment of the ruins park (responding to the tender's "Intelligent Entity Honor Wall"), with content to be publicly disclosed after review; 3. **Wisdom Core Square (North Side of Dazhongsi Station)**: A public art landmark and AI milestone with the "person" shape as the thematic element; 4. **Wisdom Vein Stele (Entrance of Zhongzhiyuan)**: Inscribed with the selected schemes and annual outstanding contributors. All landmarks are designed with the principles of being lightweight, reversible, and non-intrusive to cultural heritage conservation, without large-scale structures. [agent.4 Evidence: landmark_catalog, honor_display_system see this section and the Code Compliance Matrix]

## Cultural Narrative: Jing-Zhang × Zhongguancun × AI New Culture (Task agent.5)

**Narrative Mainline**: "A Railway Witnessing Three Jumps of Chinese Autonomous Innovation" —— the Jing-Zhang Railway in 1909 (self-designed engineering), the Zhongguancun Electronic Street in the 1980s (tech entrepreneurship), and the AI Innovation Belt starting from 2026 (intelligent native). Three narrative lines correspond to three spatial cultural carriers: the Railway Cultural Line (site park track remnants, Tsinghua Garden Station, wye track symbol), the Zhongguancun Cultural Line (Academy Road - Zhongguancun Tech Innovation Memory Points), and the AI New Cultural Line (open-source honor wall, code monument, digital timeline). **Signage Symbol System**: Derive a super-symbol from the wye track, and develop three subsystems: directional signs, node signs, and activity signs. **International Communication Narrative**: The English narrative focuses on "Where the first Chinese railroad meets the first AI city" (conceptual slogan), spreading to global developers and urban innovators. [agent.5 evidence: spatial_storyline mentioned in this section, signage_system_direction discussed in the signage paragraph; cultural symbol system and the One-Belt logo system are clearly layered and not confused.]

## Global AI Innovation Ecosystem and Long-Term Operations (Task agent.6)

**Annual Activity System** (Conceptual Recommendation, Non-Determined Schedule): The annual flagship event will be the **"Jing-Zhang AI Week"** (every May, commemorating the 1909 opening), complemented by quarterly developer days, monthly open-source night talks, and regular open testing days. **Brand IP System**: The "Smart Spine Pinyin Mark" will be at the core of developing the visual system for activities. **Developer Community Operations**: The open-source release hall, honor wall, and contribution monument will form a "contribution-recognition-memorial" loop, encouraging multi-agent collaboration (echoing the co-creation charter in the tender document). **Scenario Access Operations**: Scenario cards will be tiered for access during "testing phase-operation phase," with regular announcements of compliance and privacy review results. **Public Experience and Landmark Operations**: Guided routes, honor displays, and landmark maintenance will be included in the park's daily operations. **International Promotion and Conversion Pathway**: The annual traffic entry point will be the activity week, with project negotiations facilitated by the pitch room, leading to a "participation-inspection-consultation for settlement" conversion path (the conversion mechanism is a concept recommendation, not a recruitment commitment). [agent.6 Evidence: annual_event_system, conversion_pathway, see this section]

## Blue-Green Network, Public Space, and Urban Character

The blue-green system is based on the Jing-Zhang Heritage Park Vitality Belt, which connects Qinghe (north) and Xiaoyuehe (south) with an internal green network, forming a "one belt, two rivers, multiple rings" structure; green spaces and Public Spaces are expressed in [data:geometry/green_space.geojson#GREEN-001] and [data:geometry/public_space.geojson#PUBLIC-001], respectively, with proportionality reviewed in [metric:green_ratio] (0.123) and [metric:public_space_ratio] (0.073, provisional geometrically for discussion). A three-tiered aesthetic control is proposed: official control (conservation, green spaces, blue lines, subject to formal conditions), design guidance (color, roof, facade material suggestions), and pending confirmation (height and massing control), with height and massing guidance constrained by [depth:height_massing_character] (without pseudo-precise values). Public art is unified under the "human character" theme, prohibiting vulgar or trending expressions. [depth:blue_green_public_space], [standard:MOHURD-URBAN-DESIGN-MEASURES]

## Renewal Projects, Implementation Policy, and Phasing

| Project Number | Project Name | Type | Phased Suggestion | Main Dependencies | Evidence Reference |
| --- | --- | --- | --- | --- | --- |
| JZ-01 | Heritage Park Pedestrian Connectivity | Public Space/Transport | Recent Pilot | Road Right-of-Way, Bridge Underbelly Space, Traffic Organization Review | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Zhongzhiyuan Qinghe Innovation Interface | Blue-Green Space/Industrial Display | Recent-Medium Term | Beijing Qinghe Blue Line, Flood Control Conditions | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | Origin Point Near School Technology Transfer Street | Urban Renewal/Industrial Services | Mid-term | campus boundaries, ownership, first-floor uses | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | Dazhongsi Station Quadrant Four Pedestrian Connectivity | Integrated Railways/Active Transportation | Mid-term-Far-term | railway infrastructure, intersection utilities | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI Public Services and Edge Computing Nodes | New Infrastructure/Public Services | Recent pilot projects | Energy, computing power, security, operational entity | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | Jing-Zhang AI Zhou Public Route | Operations/Brand | Recent Pilot | Public Space Permits, Activity Safety, Copyright Clearance | [data:geometry/phasing.geojson#PHASE-001] |

Phasing Principle: **Near-term** (1-3 years) focus on lightweight facilities, event operations, and service platforms (JZ-01/05/06); **mid-term** (3-5 years) proceed with the Urban Renewal project as per the control plan and ownership conditions (JZ-02/03); **long-term** (5 years and beyond) complete the integrated rail and structural transformation (JZ-04). Implementation Policy Recommendation: Urban renewal should be coordinated, Public Spaces should be managed by a proxy operator, Scenario Access should be tiered and approved, and contributions should be recognized with honors (Conceptual Recommendation, all requiring further elaboration by professionals and government departments). The phased spatial expression is found in [data:geometry/phasing.geojson#PHASE-001]. [depth:renewal_project_list], [depth:phasing_implementation]

## Metrics, Area Recalculation, and Compliance Matrix

Core indicators: Overall Design Area of 11.41 square kilometers (provisional geometric recalculated, [metric:site_area_sqm]), 3 key areas (provisional accuracy, for discussion, [metric:key_area_count]), green space ratio of 12.3%, Public Space ratio of 7.3% (provisional precision, for discussion), Building Footprint area of 31.08 hectares (provisional geometric recalculated, [metric:building_footprint_area_sqm]); Floor Area Ratio and other control indicators marked as unknown (provisional geometric recalculated, [metric:floor_area_ratio]). Indicators are managed in three categories: spatial indicators that can be submitted for geometric recalculations, control indicators that require official master plan support, and performance indicators that require ongoing calibration with operational data, which are to be entered into `metrics.json`, `assumptions.json`, and `compliance_matrix.json`. The compliance matrix covers all mandatory tasks in announcements 1.3/1.4/1.5 and agents.1-agent.6. [depth:metrics_recalculation]

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

Main Risks and Gaps: 1. **Official Boundary and Missing Key Polygons** (provisional geometric accuracy risk, all area indicators must be recalculated after the official data release); 2. **Control Plan, Road Red Lines, Ownership, Municipal, and Cultural Heritage Conditions Missing** (all control indicators are unknown); 3. **Feasibility of Bridges, Tunnels, Underground Spaces, and Engineering** Not Argued (only conceptual direction); 4. **Enterprise, Events, and Investment Descriptions Are Conceptual Recommendations** and No Commitments Are Made. Risk and Data Management are constrained by [depth:risk_missing_data], and the architectural expression depth follows [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] (only for reference, not constituting an engineering commitment). Copyright: All images, charts, data, and code in this plan are either self-generated or sourced from registered public sources, with reference and clearance status recorded in `sources.json` and `report/copyright_statement.md`; the plan is open for community display only under COMMUNITY-DISPLAY-ONLY license. HTML visualization (`visual/index.html`) is a fully offline static page that does not load remote resources. This proposal does not claim official approval, final zoning, ultimate ownership, scale of development, or implementation guarantees; the final judgment will be made by humans and professional teams.

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/agent_taskbook.json
- brief/site-package/allowed_design_space.json
- brief/site-package/geometry/provisional_boundaries.geojson
- data/source_registry.json
- Machine-readable citation index: [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [depth:three_key_area_detailed_design], [data:geometry/site_boundary.geojson#SITE-001], [metric:site_area_sqm]
## Revision Record

- 20260808-144006 rev: Update land use zoning topology, recalculate indicators, revise drawings and visualizations; all design content is a Conceptual Recommendation.
