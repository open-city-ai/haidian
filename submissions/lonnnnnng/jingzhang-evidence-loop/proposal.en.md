---
title: "Jing-Zhang Smart Pulse Coexistence Belt: Verifiable AI Urban Public Foundation"
author_github: "lonnnnnng"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Propose a set of verifiable and calculable AI urban public foundation prioritizing public interest, with Jing-Zhang Heritage Park as one spine, three key areas as three cores, and the wings as service networks; use provisional polygons, with a full recalculation to be done once the formal boundaries are released."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "civic-agent-governance"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "enterprise-service-copilot"]
iteration: "v0.1"
---

# Jing-Zhang Smart Pulse Coexistence Belt: Verifiable AI Urban Public Foundation

## Design Basis and Source List

This proposal is submitted in response to the current open Agent submission window for the warehouse, with the status file indicating that the submission opened on Beijing time August 7, 2026, and will close on August 31, 2026. The subsequent implementation and professional deepening timeline will be subject to the final arrangements by the organizers [source:OPEN-CALL-STATUS]. The urban design task is based on the first authoritative source, which is the Beijing Municipal Commission of Planning and Natural Resources Haidian Branch's "Qualification Preliminary Review Announcement for the International Urban Design Scheme of the Centennial Jing-Zhang AI Innovation Belt": the announcement provides a Coordinated Research Area of 43.6 square kilometers, an Overall Design Area of 11.4 square kilometers, a Key-Area Detailed Design Area of 368.4 hectares, and three key districts, but it does not publicly disclose the precise polygons [source:OFFICIAL-ANNOUNCEMENT][standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

Read the `brief/site-package/`, `data/source_registry.json`, `data/processed/agent_fact_pack.md`, and their scope/task/data use table [source:SITE-PACKAGE][source:SOURCE-REGISTRY][source:PROCESSED-FACT-PACK] before generating. The structured task book supplements the three major orientations "Centennial Jing-Zhang Cultural Belt, Urban AI Living Experience Belt, AI Integration Innovation Belt", five functions, the Three Zones and Two Wings, and agent.1-agent.6, and requires public data, generation methods, human final judgment, and copyright boundaries [source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

The current submission uses provisional boundaries and provisional key areas registered by the repository maintainer: `official_boundary=false`, `geometry_role=provisional_constraint`, `boundary_precision=provisional_rough` [source:BOUNDARY-SOURCE][source:KEY-AREA-SOURCE][data:geometry/site_boundary.geojson#SITE-001][data:geometry/key_areas.geojson#PROV-KEY-001]. They are only used for generating, self-checking, visualization, and design discussions and cannot be used as official redlines, precise areas, approval references, or legal control conclusions. After obtaining the formal CAD/GIS/PDF, all spatial layers, drawings, HTML, and metrics must be comprehensively replaced and recalculated. [depth:existing_conditions_diagnosis][depth:risk_missing_data][standard:MOHURD-CONTROL-DETAILED-PLANNING]

Urban Design, control detail plan depth, and land use classification refer to the Ministry of Housing and Urban-Rural Development's () Urban Design Management Measures, Control Detailed Planning Compilation and Approval Measures, and the Natural Resources Ministry's Land Use Classification Guide [standard:MOHURD-URBAN-DESIGN-MEASURES][standard:MOHURD-CONTROL-DETAILED-PLANNING][standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The architectural professional depth documents are marked in the repository as pending official documents, and this plan uses them as a reminder for subsequent deepening, not as authoritative references based on unofficial materials [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

![Evidence Chain: From public brief to spatial, metric, and display layers](assets/figures/site-overview.png)

All spatial implementations, activity operations, and policy mechanisms in this scheme are "Conceptual Recommendations or Reference Plans for Further Study by Professional Teams," and do not substitute for formal planning nor constitute the government's approval conclusions.

## Three-Level Scope Framework

The scheme adopts a three-tiered transmission of "coordinated research—overall design—key areas." The Coordinated Research Area covers approximately 43.6 square kilometers, responsible for AI industry ecology, talent/enterprise/community collaboration, the Three Zones and Two Wings, and the future urban form; the Overall Design Area covers approximately 11.4 square kilometers, responsible for Urban Renewal, land structure, transportation and utilities, Jing-Zhang heritage park vitality belt, and the overall appearance; the key areas cover approximately 368.4 hectares, responsible for the detailed design of three districts [source:OFFICIAL-ANNOUNCEMENT][depth:three_level_scope_framework][depth:overall_spatial_structure].

The spatial concept is not an additional administrative boundary, but a set of auditable organizational methods:

| Level | Design Main Question | "Intelligent Pulse Coexistence Belt" Response | Structured Touchpoints |
| --- | --- | --- | --- |
| Coordinated Research | How to Form a World-Class AI Innovation Ecosystem | University Pioneering—Open Source Collaboration—Corporate Transformation—Public Experience—International Promotion Five-Stage Innovation Chain | `compliance_matrix.json`, `standard_matrix.json` |
| Overall Design | How to Integrate Industry, Upgrading, Transportation, and Public Life into the Plan | One Spine, Two Wings, Four Rings, and Node-Based Services, Binding Spatial Actions with Operational Actions | [data:geometry/land_use.geojson#LU-001][data:geometry/roads.geojson#ROAD-001] |
| Key Areas | How the Three Zones Form Differentiated Approaches | Zhongzhihe focuses on comprehensive governance, Yuandianhe on near-school transformation, and Shangzhihe on urban-type intelligent economy | [data:geometry/key_areas.geojson#PROV-KEY-001][data:geometry/key_areas.geojson#PROV-KEY-002][data:geometry/key_areas.geojson#PROV-KEY-003] |

Overall structure: "one ridge, three cores, two wings, four rings, and twelve nodes":

- **One Spine:** The Jing-Zhang Heritage Park and its north-south slow travel/cultural spine, integrating walking, cycling, wayfinding, and public testing.
- **Three Core Areas**:
- Zhongzhiyuan AI Independent Innovation Acceleration Area (Zhongzhi Core)
- Beijing AI Origin Community (Origin Core)
- Dazhongsi AI Industry Cluster (Business Intelligence Core)
- **Wings**: Zhongguancun Technology Services Wing, which undertakes talent, capital, space, platforms, and global connections; Xiaoyue River Scenario Enablement Wing, which embeds AI-Enabled Scenarios into everyday life.
- **Quadruple Ring**: Slow Travel Ring, Life Service Ring, Evidence Governance Ring, Global Event Ring. The Quadruple Ring represents a composite relationship between operations and space, and does not denote a new legal alignment.
- **Twelve Nodes**: Corresponding to the 12 `SCENARIO_NODE` in `constraints.geojson`, covering publication, governance, computing power, accessibility, technology transfer, data elements, cultural tours, resident services, low-speed robot testing, developer community, global events, and public safety drills [data:geometry/constraints.geojson#NODE-001][data:geometry/constraints.geojson#NODE-012].

![Three layers, three cores and two wings, and four rings of radiation](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Overall Naming and Visual Identity (agent.1)

Main name: **"Jing-Zhang Evidence Loop"**.`智脉` Simultaneously representing the linear time of the railway, the flow of data/capital, and the public life's neural network.`共生` Emphasize that agents enhance human capabilities while ultimate judgment is made by humans. Logo direction uses original characters **`JZ//`** : `JZ` is the abbreviation for Jing-Zhang, with the double slashes resembling a dual track switch, also like the "input/review" gates in an Evidence Chain. Suggest colors of Rail Black (#172033), Jing Green (#2E7D62), Signal Amber (#D79B3B), and Open Blue (#2C6E91), without relying on third-party fonts or trademarks. Signage uses an "ID + Status" system: node ID, data status, Human Review status, and open hours are displayed simultaneously, enabling both the urban space and AI services to be understood and questioned [source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][depth:overall_spatial_structure].

### Five Functional Areas in Coordination with Three Zones and Two Wings

Five functions are translated into five observable loops: AI Full Stack Autonomous Innovation (Diverse Testing/Standard Nodes), World-Class AI Innovation Ecosystem (Original Nodes' Universities/Open Source/Transformation), AI-Enabled Scenario Empowering New Paradigms (Little Moon River Scenario Wing), Intelligent AI Vibrant City (Daily Services/Public Space), and AI Governance Global Discourse Power (Evidence Chamber, Public Evaluation, and International Exchange). The Three Zones and Two Wings are not a list of parallel parks, but rather a "Originating—Accelerating—Transforming—Experiencing—Governance" loop [source:AGENT-TASKBOOK][depth:overall_spatial_structure].

### Global Mechanism Case Studies (Background References, Not to be Taken as Facts or Control Guidelines for This Project)

| Case | Transformable Mechanism | Cautionary Translation in This Scheme |
| --- | --- | --- |
| MIND Milano Innovation District | research, business, living, and Public Space are integrated in a living-lab approach | operating with the method that "public space is also a testing ground" as the wisdom hub, without transplanting its investment or scale data [source:CASE-MIND-MILANO] |
| Keihanna Science City | Industry—University—Government—Resident Co-Creation and Public Road Validation | Establish a mechanism for Human Review and public playback for pedestrian, robot, and resident participation scenarios [source:CASE-KEIHANNA] |
| Jurong Innovation District | A Continuous Chain for R&D, Training, Manufacturing, and Green Infrastructure | Place edge computing, talent training, and scenario testing on the same service chain, without deriving local construction scale [source:CASE-JURONG-INNOVATION-DISTRICT] |
| IPAI CAMPUS | AI Theme Identification, Climate Awareness, and Walkable Public Spaces | Bind brand identification with the blue-green network to avoid just doing the façade of a science and technology park [source:CASE-IPAI-CAMPUS] |
| Agorai Innovation Hub | Basic Research, Applied Research, Open Academy, and Cross-Sector Partners Form a Closed Loop | Design the "Release—Verify—Train—Transform" Four-Stage Mechanism for the Core Hub [source:CASE-AGORAI-TRIESTE] |
| Marineterrein Amsterdam | Historical site as a reservable and replayable public testing platform | Make the Jing-Zhang site Public Space into a low-impact, time-specific, and reversible test site [source:CASE-MARINETERREIN] |

These cases only support mechanism inspiration, not the list of enterprises in Haidian, investment amounts, control plans, or implementation commitments [source:SOURCE-REGISTRY][source:AGENT-TASKBOOK].

### Future Urban Form

Future urban form is not about "adding a smart screen to every space," but rather equipping spaces with evolutionary service interfaces: workspaces connect to Public Spaces through open-source release and testing nodes; living spaces reduce information barriers through explainable signage and co-piloting services; learning spaces link universities and startup teams through proximity school transformation streets; and transportation spaces prioritize public interests through slow mobility diagnostics and rail connections [depth:overall_spatial_structure][data:geometry/public_space.geojson#PUBLIC-001][data:geometry/roads.geojson#ROAD-001].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Spatial Structure and Land Use

`land_use.geojson` is zoned adjacent to the same provisional SITE polygon, with five zones covering the boundary without overlap [data:geometry/land_use.geojson#LU-001][depth:land_use_layout][metric:land_use_coverage_ratio]. Research and development land use (0802) accommodates research and full-stack innovation, cultural land use (0803) accommodates the Jing-Zhang memory and open-source display, park and green space (1401) forms an archaeological vitality belt, commercial and service land use (05) accommodates intelligent native new business forms, and community service facilities land use (0702) accommodates talent living and public services [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

### Update Methods and Control Plan Boundaries

The architectural layer only expresses the conceptual "preserve—renovate—rebuild—test" approach, without incorporating any existing buildings, ownership, or land parcel judgments as facts [data:geometry/buildings.geojson#BLDG-001][depth:retain_renovate_demolish]. The Floor Area Ratio, Building Coverage Ratio, Building Height, setback requirements, road right-of-way, parking supply, and municipal capacity are all listed as unknown or to be confirmed; this is a respect for the control plan as a planning permit and implementation management reference, rather than using AI to fill in the gaps [standard:MOHURD-CONTROL-DETAILED-PLANNING][depth:development_intensity_controls][depth:height_massing_character][metric:floor_area_ratio][metric:building_density][metric:height_max_m][assumption:A-CONTROLS-001].

Suggest that the professional team calibrate subsequent updates with a "interface priority, minimal disturbance, and reversibility": prioritize the first floor for public services and visible innovation displays; prioritize renovation when the existing structure meets safety and functional requirements; and prioritize the addition of small-scale, modular, and testable nodes when new elements are needed. Any demolish–renovate–retain strategy, scale, and character control must await formal drawings, cultural heritage confirmation, property rights, and fire safety documentation [depth:retain_renovate_demolish][depth:height_massing_character][source:OFFICIAL-ANNOUNCEMENT]. (Demolish–Renovate–Retain Strategy)

### Three key areas' overall interface

The overall design ties the three key areas into a continuous chain of "early research—public validation—urban transformation" with one spine and two wings: the Wisdom Hub provides safety and standards, the Origin Hub provides talent and open-source resources, and the Business Wisdom Hub provides public consumption and international exchanges; the Zhongguancun Technology Services Wing provides element linking, and the Xiao Yuehe Scenic Wing offers daily testing and public experience [depth:overall_spatial_structure][data:geometry/key_areas.geojson#PROV-KEY-001][data:geometry/key_areas.geojson#PROV-KEY-002][data:geometry/key_areas.geojson#PROV-KEY-003].

## Detailed Design of Key Areas

Three key areas are currently provisional polygons; the following content is a conceptual detailed design to illustrate how functions, spaces, and operations integrate. Once the formal polygons, ownership, zoning plans, and traffic data are obtained, a comprehensive review will be necessary [source:KEY-AREA-SOURCE][depth:three_key_area_detailed_design][metric:key_detailed_design_area_sqm].

| District | Positioning and Spatial Actions | Building/Update Method | Transportation and Public Space | AI Scenario Interface |
| --- | --- | --- | --- | --- |
| **Zhongzhiyuan AI Independent Innovation Acceleration Area (Zhongzhi Core)** [data:geometry/key_areas.geojson#PROV-KEY-001] | Garden-style Full-stack Autonomous Innovation District; featuring "visible R&D" through the Qinghe interface and industrial display | Preserve reusable structures, transforming them into experimental, standard, and display spaces; construct new ones solely as reversible test kiosks. | Connect the main spine, cycling side branches, and external connections; green spaces become a public forecourt for safety assessments and low-carbon computing. | Safety Governance Sandbox, Edge Side Computing Hub, Low-Carbon Innovation Corridor, Public Safety Drill Platform |
| **Beijing AI Origin Community (AI Origin Core)** [data:geometry/key_areas.geojson#PROV-KEY-002] | university-based technology transfer and talent community; integrating university innovation, open-source release, and residential living | low-disturbance renovation of the first floor and idle spaces to form a technology transfer street; no pre-set ownership or demolition decisions | pedestrian/bicycle connection between campus, park, and street; nodes available for use at different times | open release hall, university-based technology transfer street, developer night school, resident co-driving services |
| **Dazhongsi AI Industry Cluster (Smart Intelligence Core)** [data:geometry/key_areas.geojson#PROV-KEY-003] | Urban-type Intelligent Economy and International Exchange District; focusing on intelligent bodies, intelligent terminals, and content consumption | Prioritize public environment around key enterprises, with mixed commercial services and displays; scale of updates to be confirmed by the control plan | Conceptual action based on the quadrants of Dazhongsi station, complementing non-motorized and short-stop transfers | Data Element Theater, Robot Low-Speed Delivery Testing, International Roadshow Living Room |

Each subdistrict is defined as the smallest implementation unit, comprising "one perceivable node + a walkable path + a set of Human Review procedures," to avoid reducing the AI solution to a hardware list [standard:MOHURD-URBAN-DESIGN-MEASURES][depth:three_key_area_detailed_design].

![Three Key Areas: Define Differences, Main Spine Interface, and Scenographic Nodes](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### Six User Persona Categories

| User | Primary Needs | Spatial/Operational Response | Privacy and Human Boundaries |
| --- | --- | --- | --- |
| Open Source Developer | Publish, Collaborate, Test, and Contribute Reputation | Origin Core Open Release Hall, Developer Night School, and Contribution Wall | Do not collect personal trajectory; only display voluntarily shared contribution information |
| University Students and Faculty | Cross-Institutional Collaboration, Technology Transfer, Low-Threshold Experiments | On-Campus Technology Transfer Street, Guided Routes, and Small Public Classrooms | Research Outcomes and Campus Data Must Be Authorized |
| Founding Team | Low-Cost Spaces, Computing Entry Points, and Product Validation | Wisdom Core Testing Kiosks, Edge Computing Hub, and Technology Service Wing | Data/Computing Services Opened According to Authorization and Audit Rules |
| Corporate Visitors | International Reception, Roadshows, Recruitment, and Public Image | Business Intelligence Nuclear International Roadshow Living Room, Track Access, and Public Environment | Corporate Identity and Case Studies Must Be Cleared for Rights, No Hidden Ranking |
| Surrounding Residents and Families | Commuting, Leisure, Community Services, and Sense of Safety | Park Pedestrian Loop, Resident Service Co-Driving and Shared-Time Activities | Resident Profiles Will Not Be Used for Commercial Recommendations or Individual Scoring |
| Global Visitors/Event Operators | cultural understanding, participation in activities, and international collaboration | Jing-Zhang Memory Tour, Global AI Week Route, and Multilingual Signage | Visitor data aggregation, minimization, deletability, and Human Review |

The corresponding metric is [metric:persona_count]; the design tool is not a current statistical snapshot or personal dataset [source:AGENT-TASKBOOK][assumption:A-PUBLIC-DATA-ONLY].

### Twelve AI Scene Cards

| Number | Scene Card | Spatial Carrier | Experiment/Service Boundary |
| --- | --- | --- | --- |
| 01 | Open Release Hall | Origin Core | Host open-source outcomes, display code contributions; aggregate and statistics of event data |
| 02 | Safety Governance Sandbox | Crowd Review | Model Safety, Red Team Testing, and Standard Discussions; Results by Human Review |
| 03 | End-Side Computing Hub | Spinal Node | Explain the interface between end-side computing and public services; energy and security conditions pending |
| 04 | Walkability Accessibility Diagnosis | Greenways and Horizontal Seam Lines | Using only the public road network/through manual observation, identify inaccessible breakpoints, no individual trajectory output |
| 05 | School Nearby Technology Transfer Street | Origin Core | Bringing research, legal affairs, intellectual property, incubation, and roadshows together in a short distance |
| 06 | Data Element Theater | Smart Intelligence Core | Visualize explanations for authorization, auditing, and revocation without displaying unauthorized data |
| 07 | Jing-Zhang Memory Tour | Jing-Zhang Ruins Park Main Axis | Primarily based on public records and manual interpretation, with AI providing explainable search functionality |
| 08 | Shared Driving for Residents | Community Service Lane | Booking, Q&A, and Feedback on Public Facilities, with Key Decisions Confirmed by Human Service Personnel |
| 09 | Robot Low-Speed Delivery Testing | Public Space | Only as a controlled industry validation scenario, must undergo traffic, safety, and operational approval |
| 10 | Developer Night School | Origin Core and Innovation Wing | Periodic courses, open-source maintenance, and cross-team reviews, representing tentative event arrangements |
| 11 | Global AI Weekly Route | One Spine—Three Hubs | Cultural Tour, Scenario Access, Pitch Sessions, and Public Discussions Form the Annual Suggested Route |
| 12 | Public Safety Drill Platform | Mass Intelligence Core/Public Node | Designed for emergency coordination and service process drills, always retains manual command and exit mechanisms |

Among scenarios 02, 03, 05, and 09, the number of industrial testing/validation scenarios exceeds the three required by the task book [metric:ai_scenario_card_count][metric:test_validation_scenario_count][source:AGENT-TASKBOOK][depth:municipal_new_infrastructure]. These scenarios collectively adhere to four bottom lines: data minimization, transparency/rights, explainability, and Human Review; they do not write unverified technologies as fully deployed, nor do they present scenario pilots as government-approved operations [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][assumption:A-OPERATIONS-CONCEPT].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The Overall Design Area is covered by the adjacent boundaries of the five land use zones `land_use.geojson` [data:geometry/land_use.geojson#LU-001][data:geometry/land_use.geojson#LU-005][metric:land_use_area_sqm][metric:land_use_coverage_ratio]. Green spaces and Public Spaces are calculated using a union operation to avoid duplicate counting.  The Building Footprint is used to observe the relationship between "node density and Public Space retention," and does not represent the current building survey [data:geometry/public_space.geojson#PUBLIC-001][data:geometry/green_space.geojson#GREEN-001][data:geometry/buildings.geojson#BLDG-001]. [metric:green_space_area_sqm][metric:public_space_area_sqm][metric:building_footprint_area_sqm].

The Demolish–Renovate–Retain Strategy employs a four-tier approach:

1. **Preserve**: Spaces with historical, structural, or community use value, prioritizing updates through signage, first-floor openness, and service interfaces.
2. **Redesign**: Convert existing reusable structures into laboratories, open releases, community services, or public displays, without precluding property rights consent.
3. **New Construction**: Propose small-scale, reversible node buildings only after a professional team confirms the control plan, cultural heritage, fire safety, energy, and ownership.
4. **Testing Kiosk**: As a phased, reversible experimental facility, it does not bear legal construction scale or permanent engineering commitments.

Therefore, `floor_area_ratio`, `building_density`, `height_max_m`, and `parking_supply_spaces` remain unknown [metric:floor_area_ratio][metric:building_density][metric:height_max_m][metric:parking_supply_spaces][depth:development_intensity_controls][depth:height_massing_character][depth:retain_renovate_demolish]. This is precisely the "known controls—design recommendations—to be confirmed conditions" hierarchy as required by [standard:MOHURD-CONTROL-DETAILED-PLANNING].

## Transport, Rail, Municipal Infrastructure, and Public Services

Traffic strategy is "pedestrian and cycling priority, rail transit integration, horizontal stitching, and low-speed validation": `ROAD-001` is the north-south spine, while `ROAD-002/003` are parallel cycling lanes. Three horizontal pedestrian corridors connect the focus area with the Public Space [data:geometry/roads.geojson#ROAD-001][data:geometry/roads.geojson#ROAD-006][metric:road_centerline_length_m][metric:heritage_spine_length_m][depth:traffic_rail_slow_parking]. Locations such as Wudaokou, the west end of Qinghua Donglu, Dazhongsi Station, and the North Fifth Ring Road crossing node are only indicated as interfaces for public tasks. The specific alignments, sections, and station-city integrated projects must be confirmed by professional teams based on official traffic data.

Municipal and new infrastructure adopt the "service nodes rather than large networks assumption": service node hubs such as edge computing stations, low-carbon innovation corridors, public safety drill platforms, and service co-driving nodes can initially be studied in a low-power, reversible manner; energy, drainage, flood control, fire safety, pipeline, cybersecurity, and capacity are all listed as prerequisites [depth:municipal_new_infrastructure][assumption:A-CONTROLS-001][data:geometry/constraints.geojson#CONSTRAINT-003]. Parking should not be filled with arbitrary numbers; the current supply and demand must be updated after a formal traffic survey [metric:parking_supply_spaces].

![The composite relationship between traffic calming, blue-green spine, and AI nodes](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

`GREEN-001` will merge the main ridge, two cycling lines, and key area pocket green spaces into a continuous blue-green base; `PUBLIC-001` to `PUBLIC-008` are time-shareable, reservable, and reversible public nodes [data:geometry/green_space.geojson#GREEN-001][data:geometry/public_space.geojson#PUBLIC-001][metric:green_ratio][metric:public_space_ratio][depth:blue_green_public_space]. The design actions for the park vitality belt are "north-south through + east-west stitching + node pause + public review," ensuring that temporary polygons are not mistakenly drawn as park implementation boundaries.

### Four AI Pilgrimage/Honor Nodes (Conceptual Recommendation)

1. **Zhan Tianyou Coordinates**: Provide a public historical narrative to elucidate the context of "self-designed and self-constructed" projects, with AI serving only for explainable retrieval and multilingual guided tours.
2. **Open Contribution Wall**: Display voluntary public contributions to GitHub/Agent, with annual update rules, retraction mechanisms, and attribution rights confirmed by both the operator and contributors.
3. **Transcend Public Living Room**: Transform the dual-track switching into a Public Space component that is sit-able, discuss-able, and display-able, connecting the Origin Core and the Business Intelligence Core.
4. **Evidence Court**: Make the indicators, sources, assumptions, and self-inspection status publicly readable to encourage public scrutiny of the design rather than just looking at renderings.

These nodes correspond to [metric:landmark_count], which are conceptual names and component directions; cultural heritage, green spaces, blue lines, traffic safety, construction, and ownership conditions require professional verification [source:AGENT-TASKBOOK][standard:MOHURD-URBAN-DESIGN-MEASURES][depth:height_massing_character].

### Cultural Narrative and Signage (agent.5)

The narrative is divided into three chapters: **Railway** (Jing-Zhang Railway's Autonomous Design and Public Memory) — **Campus** (Z Park's Open Innovation and On-Campus Innovation Hub) — **Intelligence** (Open, Verifiable, and Benevolent Future Collaboration). Signage combines `JZ//`, node numbers, historical years, data status, and Human Review identifiers; cultural identifiers are separated from the One-Belt-One-Path logo, and no unauthorized images, fonts, or paper images are used [source:AGENT-TASKBOOK][depth:blue_green_public_space][assumption:A-BRAND-ORIGINAL]. An international communication suggestion is "From a self-built railway to self-verifiable intelligence," which is the communication direction, not an official slogan.

## Renewal Projects, Implementation Policy, and Phasing

The following 8 projects are packages available for professional teams to delve into for further study, and are not a confirmed construction list:

| Number | Concept Project | Area/Layer | Precondition | Suggested Stage |
| --- | --- | --- | --- | --- |
| JZ-01 | Main Spine Pedestrian Disconnect Diagnosis and Seaming | [data:geometry/roads.geojson#ROAD-001] | Road Right-of-Way, Accessibility, Fire Safety, and Traffic Organization | Phase 1 |
| JZ-02 | Collective Wisdom Core Qinghe Low-Carbon Innovation Corridor | [data:geometry/green_space.geojson#GREEN-001] | River Blue Line, Ecology, Flood Control, and Energy Conditions | Phase I |
| JZ-03 | Original Core Near-School Conversion Street | [data:geometry/buildings.geojson#BLDG-006] | Campus boundary, ownership, first-floor activities and safety | Phase I/Phase II |
| JZ-04 | Smart Intelligence Hub Front Quadrant Pedestrian Connection | [data:geometry/public_space.geojson#PUBLIC-003] | Rail Station, Intersection, Non-Motorized Vehicles and Utility Pipelines | Phase II |
| JZ-05 | Evidence Courtyard and Open Indicator Wall | [data:geometry/constraints.geojson#NODE-012] | Data Authorization, Version Governance, and Public Engagement | Phase 1 |
| JZ-06 | End-Side Computational Power and Public Service Hub | [data:geometry/constraints.geojson#NODE-003] | Energy, Cybersecurity, Maintenance Stewardship and Capacity | Phase II |
| JZ-07 | Global AI Week Public Route | [data:geometry/phasing.geojson#PHASE-001] | Public Space Permits, Activity Safety, and Copyright Clearance | Phase 1/Long-term |
| JZ-08 | Annual Review and Space Minor Repair Fund Mechanism | [data:geometry/phasing.geojson#PHASE-003] | Operational Assessment, Professional Review, and Funding Sources | Long-term |

Phase the implementation with a rhythm of "service first, then space, and finally scale": Phase one will focus on developing public materials, low-impact nodes, pedestrian diagnostics, and co-creation with developers and residents; phase two will deepen the neighborhood renewal efforts after the control plan, property rights, municipal, and traffic conditions are clarified; in the long term, annual events, contribution memories, performance reviews, and reversible experiments will be incorporated into ongoing governance [depth:renewal_project_list][depth:phasing_implementation][metric:renewal_project_count][data:geometry/phasing.geojson#PHASE-001][data:geometry/phasing.geojson#PHASE-003].

### Global AI Activities and Long-Term Operations (agent.6)

Suggest forming a "Seasonal Cycle": Spring "Railway and Autonomous" Public Lecture Hall, Summer Developer Night School and Scenario Access Week, Autumn Global AI Week with Three-Core Route, Winter Evidence Recheck and Next Year's Topic Collection. Operations adopt a multi-role approach of "Public Space Operators + Higher Education/Corporate Co-Creators + Open Source Community + Professional Reviewers"; each event will publicly disclose the data scope, Human Reviewers, recall mechanism, and feedback results. Activities, recruitment, policy, and resource links are all Conceptual Recommendations, not representing confirmed arrangements [source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][assumption:A-OPERATIONS-CONCEPT].

## Metrics, Area Recalculation, and Compliance Matrix

All space areas are recomputed in `EPSG:4548`, while the GeoJSON exchange still uses `EPSG:4326`. The current core recomputed values are as follows:

| Indicator | Meaning | Status |
| --- | --- | --- |
| `site_area_sqm` | provisional overall design boundary area | known, replace with official polygon and recalculate |
| `land_use_coverage_ratio` | land use coverage ratio for the zoning boundary | known, target is 1.0 |
| `green_ratio` / `public_space_ratio` | The proportion of the blue-green base and public nodes in the submitted geometry | known, serving for spatial relationship judgment |
| `building_footprint_area_sqm` / `building_count` | Conceptual Building Footprint Area and Node Count | known, not equal to the existing building |
| `road_centerline_length_m` / `heritage_spine_length_m` | Slow-Travel Network and Heritage Spine Length | known, not equal to road centerline |
| `key_detailed_design_area_sqm` / `key_area_count` | three provisional key areas | known, formal polygons to be recalculated |
| `ai_scenario_card_count` / `test_validation_scenario_count` | Number of Scenario Cards and Industrial Test Scenarios | known, from the text and node list |
| `floor_area_ratio` / `building_density` / `height_max_m` / `parking_supply_spaces` | Statutory Master Plan, Building, and Transportation Controls | unknown, awaiting official/professional data |

Machine-readable metric index complete: [metric:site_area_sqm] [metric:land_use_area_sqm] [metric:land_use_coverage_ratio] [metric:green_space_area_sqm] [metric:green_ratio] [metric:public_space_area_sqm] [metric:public_space_ratio] [metric:building_footprint_area_sqm] [metric:building_count] [metric:road_centerline_length_m] [metric:public_node_count] [metric:scenario_node_count] [metric:phase_count] [metric:key_detailed_design_area_sqm] [metric:key_area_count] [metric:renewal_project_count] [metric:ai_scenario_card_count] [metric:test_validation_scenario_count] [metric:persona_count] [metric:landmark_count] [metric:heritage_spine_length_m]. The relationship between metrics, matrices, and drawings is maintained by `compliance_matrix.json`, `standard_matrix.json`, and `design_depth_matrix.json`. Each announcement task is associated with agent.1-agent.6, and includes sections, layers, metrics, drawings, HTML, sources, assumptions, and self-check items [depth:metrics_recalculation][source:SOURCE-REGISTRY][data:geometry/land_use.geojson][data:geometry/metrics.json].

![Recalculate indicators, evidence status, and pending confirmation conditions](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

**Data Risks**: Official precise boundaries, control plans, ownership, current buildings, traffic, utilities, cultural heritage, and public service data still need to be completed; all content that affects legal judgment is marked as pending/unknown [depth:risk_missing_data][source:BOUNDARY-SOURCE][assumption:A-CONTROLS-001].

**Privacy and Governance Risks**: The scenario only uses publicly available or de-identified data, adhering to principles of data minimization, explainability, Human Review, and reversibility; it does not perform individual behavior scoring, does not use resident profiles for commercial recommendations, and does not treat model outputs as approval decisions [source:AGENT-TASKBOOK][assumption:A-PUBLIC-DATA-ONLY].

**Copyright Risks**: Text, geometry, graphics,HTML and PDF Generated by this agent; external cases only cite the mechanism summary from official public pages; remote images, map tiles, third-party fonts, trademarks, portraits, or unauthorized corporate logos are not embedded. Specific declarations can be found in `report/copyright_statement.md` [source:CASE-MIND-MILANO][source:CASE-KEIHANNA][source:CASE-JURONG-INNOVATION-DISTRICT][source:CASE-IPAI-CAMPUS][source:CASE-AGORAI-TRIESTE] [source:CASE-MARINETERREIN].

**Implementation Boundaries**: The proposal is an Open Co-Creation initiative and cannot replace formal planning, engineering design, government approval, property negotiations, or event permits; professional teams should first replace the official polygon, then recalculate layers and indicators, and subsequently determine whether to proceed to a deeper phase [standard:MOHURD-CONTROL-DETAILED-PLANNING][depth:phasing_implementation][depth:risk_missing_data].

## References

- [source:OPEN-CALL-STATUS] `activity-status.json`: Current submission window and deadline for agents.
- [source:OFFICIAL-ANNOUNCEMENT] Haidian Branch of Beijing Planning and Natural Resources Commission Announcement.
- [source:AGENT-TASKBOOK] `brief/site-package/agent_taskbook.json`: six agent tasks, co-creation principles, and boundary clauses.
- [source:SITE-PACKAGE] `brief/site-package/`: Enumerate, schema, planning scope, and design constraints.
- [source:SOURCE-REGISTRY] `data/source_registry.json`: Purpose and licensing boundaries for public use.
- [source:PROCESSED-FACT-PACK] `data/processed/agent_fact_pack.md`: Task and Documentation Gap Navigation Layer.
- [source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE]: provisional rough boundaries and key area polygons.
- [source:CASE-MIND-MILANO], [source:CASE-KEIHANNA], [source:CASE-JURONG-INNOVATION-DISTRICT], [source:CASE-IPAI-CAMPUS], [source:CASE-AGORAI-TRIESTE], [source:CASE-MARINETERREIN]: Global background cases, only for mechanism reference.
- [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]: Professional and task standards.
- [depth:existing_conditions_diagnosis], [depth:three_level_scope_framework], [depth:overall_spatial_structure], [depth:land_use_layout], [depth:development_intensity_controls], [depth:height_massing_character], [depth:retain_renovate_demolish], [depth:traffic_rail_slow_parking], [depth:municipal_new_infrastructure], [depth:blue_green_public_space], [depth:three_key_area_detailed_design], [depth:renewal_project_list],  [depth:phasing_implementation], [depth:metrics_recalculation], [depth:risk_missing_data]: Depth of deliverables.

The structured data, drawings, and display pages in this package should be considered as a single verifiable design record; any future modifications should be synchronized to update the sources, assumptions, metrics, matrices, drawings, and self-inspection documents.
