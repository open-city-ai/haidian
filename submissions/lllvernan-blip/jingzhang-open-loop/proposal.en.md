---
title: "Open-source Loop: Verifiable City in the Centennial Jing-Zhang AI Innovation Belt"
author_github: "lllvernan-blip"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With the Jing-Zhang Railway Heritage Park as the public main axis, and the Zhongzhiyuan, Beijing AI Origin Community, and Dazhongsi as three innovation anchor points, a walkable, experiential, and verifiable AI city open-source loop is constructed. The space is suggested to retain all conceptual attributes, with the Provisional Boundary used only for this intake and subsequent recalculation."
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "ai-origin-community"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "ai-cultural-guide", "ai-health-service-navigation"]
iteration: "v0.2"
---

# Open-source Loop: Verifiable City in the Centennial Jing-Zhang AI Innovation Belt

## Design Basis and Source List

This proposal responds to the public task of the "Centennial Jing-Zhang AI Innovation Belt Urban Design International Call for Concepts" in Haidian, Beijing, and proposes "Open Source Loops" as the overall concept. The proposal does not package the Agent outputs as approved plans; all spatial implementation suggestions are Conceptual Recommendations, reference schemes, or working materials for further research by professional teams.

The main references include: the announcement from the Haidian Branch of the Beijing Municipal Planning and Natural Resources Commission, excerpts from the Clearing Rights Task Book for intelligent entities, the `design_brief.json`, `allowed_design_space.json`, `agent_taskbook.json`, `data/source_registry.json`, Provisional Boundary explanation, and a snapshot of local professional standards. [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]

Currently, no official precise polygons, CAD files, or GIS right-of-way data have been obtained. This plan uses the `provisional_boundaries.geojson` maintained by the warehouse, which has the attribute `official_boundary=false`, `geometry_role=provisional_constraint`, and `boundary_precision=provisional_rough`. It is only intended for intake, spatial discussions, visualization, and self-checking, and cannot be used as an official right-of-way, approval basis, property boundary, or precise area reference. Once formal pre-qualification documents, task order attachments, or clear GIS data are obtained, the boundaries should be replaced in their entirety, and all layers, drawings, and indicators should be recalculated. [data:geometry/site_boundary.geojson#SITE-001] [depth:risk_missing_data]

The Evidence Chain of this proposal consists of five parts: GeoJSON is the spatial facts layer,`metrics.json` is a mixed-use layer,`proposal.md` This is the human-readable explanatory layer, five layers.PNG And two documents PDF This is the display layer,`compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json` is the review mapping layer. Prior to formal review, all layers should be reconstructed using the same official geometry version. [source:PROCESSED-FACT-PACK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [depth:existing_conditions_diagnosis] [data:geometry/constraints.geojson#CONSTRAINTS]

![Evidence Chain and Relationship Diagram with Submission Package](assets/figures/site-overview.png)

## Three-Level Scope Framework

The announcement divides the work into three layers. The Coordinated Research Area covers approximately 43.6 square kilometers, extending from the North Fifth Ring Road to the north, the Jingzhang Expressway to the east, West Straight Outer Street to the south, and Wanquanhe Road to the west, and bears the research on industrial ecology, regional coordination, and future city development. The Overall Design Area covers approximately 11.4 square kilometers, focusing on the urban and industrial areas within 1-2 kilometers around the Jingzhang Relic Park, and bears the responsibilities for land use, updates, transportation, utilities, Public Spaces, and the overall framework. The Key-Area Detailed Design Area covers approximately 368.4 hectares, including the Zhongzhiyuan AI Independent Innovation Acceleration Area, the Beijing AI Origin Community, and the Dazhongsi AI Industry Cluster, and bears the detailed design responsibilities. [source:OFFICIAL-ANNOUNCEMENT] [metric:site_area_sqm] [metric:key_area_count] (Jing-Zhang)

This plan conveys three layers of work through "one belt, three cores, multiple points, and one ring":

- One axis is the Jing-Zhang Railway Cultural and Public Space Main Axis, which weaves together heritage sites, parks, schools, businesses, and communities into a walkable narrative line.
- Three cores are Zhongzhiyuan, AI Origin, and Dazhongsi, respectively undertaking full-stack independent innovation, on-campus conversion of research outcomes, and interactions in the intelligent economy.
- Multiple points include 10 AI scenario cards and 3 industrial Testing and Validation Scenarios, distributed near Public Spaces, park entrances, and track portals.
- Ring One is a composite loop of pedestrian and bicycle paths, green spaces, public service facilities, and activity routes, serving as the daily visible interface of the Innovation Belt.

The three-level scope is not three sets of mutually unrelated drawings. The industrial research raises questions, which the overall design transforms into space, and the key areas then validate these through specific nodes, Public Spaces, and operational mechanisms. All areas and proportions are based on the current temporary layers and `metrics.json`, with a unified recalculation after the formal polygons are completed. [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] [depth:three_level_scope_framework] [depth:overall_spatial_structure]

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Overall Concept and Visual Identity

The main name of the proposal is "Open Loop," with an English suggestion of **Open Loop · Jing-Zhang AI Belt**. It expresses three things: the historical line is one that can continue to connect new nodes; urban innovation should not be confined to a closed loop within industrial parks; and every public submission, public feedback, and professional review should return to the public knowledge base to form the next iteration.

Logo direction is suggested to adopt a geometric symbol of "an open railway/data line + three node dots." The line corresponds to the Jing-Zhang Railway and the active travel loop, while the three nodes correspond to the three zones. The opening symbolizes openness and collaboration. It is recommended to use deep black, railway rust orange, and Qinghe blue as the three colors, but this visual system is only a conceptual direction. The font, trademark, and final graphics need to be developed by a professional team, Qing Rights, and deepened, without directly copying existing corporate or institutional logos. [source:AGENT-TASKBOOK] [depth:brand_identity]

### Three Key Orientations, Five Major Functions, and Three Zones and Two Wings

Three key positioning areas are the Centennial Jing-Zhang Cultural Belt, the Urban AI Living Experience Belt, and the AI Integration Innovation Belt. Five functional areas are the Full-Stack Independent AI Innovation System, the World-Class AI Innovation Ecosystem, the AI-Enabled Scenario Empowerment New Paradigm, Intelligent AI Vibrant City, and Global AI Governance Discourse. [source:AGENT-TASKBOOK]

The Three Zones and Two Wings form a north-south collaborative loop of "research and development source—technology transfer—urban interaction": The Beijing AI Origin Community is responsible for on-campus innovation, open-source release, and talent services; the Zhongzhiyuan AI Independent Innovation Acceleration Area is responsible for full-stack independent innovation, security governance, standard validation, and low-carbon testing; the Dazhongsi AI Industry Cluster is responsible for intelligent terminals, content consumption, enterprise services, and international exchanges. The Zhongguancun Technology Services Wing provides capital, legal services, intellectual property, enterprise services, and global element allocation. The Xiaoyue River Scenario Enablement Wing transforms AI+ healthcare, education, transportation, and living services into experiential public scenarios. Spatially, they are connected by the Jing-Zhang Heritage Park and the blue-green system. Operationally, they form a loop through a public knowledge base, developer community, and annual events. [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003]

### mechanism for reference to global case studies

The following case is provided only as a mechanism for public knowledge reference and should not be considered as local facts or investment guidance; formal proposals require further registration of authoritative sources and local adaptation conditions.

| Reference Case | Reusable Mechanism | Local Adaptation Direction |
| --- | --- | --- |
| Near Montreal Mila | Overlapping of research institutions, community activities, and talent networks | AI Origin Community's On-Campus Innovation and Open Source Releases |
| Toronto MaRS | co-located research, entrepreneurship, corporate services, and public events | Zhongguancun Technology Services Wing's corporate services node |
| Finnish Helsinki AI Register | Transparent Registration and Explanation for Public Sector AI Use | Public Data on Urban Agents, Human Review, and Risk Warnings |
| Alan Turing Institute, UK | research institution, connecting government agendas and public knowledge dissemination | Zhongzhiyuan's standard governance and policy research interface |
| Singapore Punggol Digital District | Industrial, Campus, Public Space, and Digital Infrastructure Synergy | AI Origin Community and Xiaoyue River Scenario Enablement Wing Composite Interface |
| France Station F | Space Sharing and Entrepreneurship Services for a Large Innovative Community | Dazhongsi Industrial Services and International Showcase Lounge |
| Amsterdam Open Data Practices | Combining Open Data, Public Engagement, and Urban Experimentation | Public Data Boundaries and Scenario Co-Creation in the Open Source Loop |

The common thread among these cases is not the replication of architectural forms, but rather integrating research, space, talent, services, scenarios, and public judgment into a single cycle. [source:AGENT-TASKBOOK] [depth:ecosystem_research]

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Spatial Structure and Land Use Strategies

The land use structure of the Overall Design Area adopts an "R&D Innovation—Jing-Zhang Blue-Green—Industrial Services—Community Accompaniment" continuous framework. The four zones in `land_use.geojson` cover the current submission boundary as conceptual zones rather than statutory land use boundaries: the R&D Innovation Zone accommodates research, testing, and open-source collaboration; the Jing-Zhang Blue-Green Zone accommodates parks, active transportation, and cultural experiences; the Industrial Services Zone accommodates business services, pitch events, and smart native consumption; the Community Accompaniment Zone accommodates daily resident needs, youth-friendly spaces, and public services. [data:geometry/land_use.geojson#LU-001] [data:geometry/land_use.geojson#LU-002] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout]

Land use zoning should not aim to divide different functions into four separate and non-communicating blocks; instead, blue-green and pedestrian corridors should pass through the zones, becoming the public backbone for daily interactions. All specific judgments involving the statutory land use codes, Floor Area Ratio, Building Height, road red lines, and property boundaries are pending confirmation based on the official control detailed planning documents. [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:development_intensity_controls]

### Updates and Building Strategies

The architectural layer expresses conceptual retention, renovation, and addition of the base, without expressing specific demolition, ownership, or engineering conclusions. It is recommended to form three categories of update actions: retaining existing spaces with cultural and public identification value, renovating the first-floor interface and public service voids, and adding a small number of reversible and removable public service and display components. Large-scale building updates should prioritize internal functional conversion and first-floor openness, without proposing a demolition and renovation list that has not been verified by ownership and cultural heritage validation. [data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish] [depth:height_massing_character]

## Transport, Rail, Municipal Infrastructure, and Public Services

Traffic strategy is "railway portal + slow travel loop + Scenario Access routes." [data:geometry/constraints.geojson#CONSTRAINTS] [depth:traffic_rail_slow_parking] Dazhongsi station, Wudaokou, Qihua East Road West Gate, and the related nodes of North Fifth Ring Road are only considered as key interfaces to be re-examined, without writing temporary layers as road boundaries. `roads.geojson` provides design suggestions for the slow travel and innovation service corridors, which should be overlaid with official road, rail, fire, and municipal data. [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]

Municipal and new infrastructure are advised to adopt an explainable and reversible "small node" strategy: edge-side computational services, public information terminals, low-carbon energy displays, and facility operation and maintenance sensors must be based on public data, minimal data collection, and Human Review. Specific device brands, energy capacity, or operational entities should not be written as definitive items. [depth:municipal_new_infrastructure]

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## Detailed Design of Key Areas

Three key areas use provisional polygons, and the following content pertains to the reference scheme. The area values of the key areas are derived from the announcement, and the spatial boundaries and specific projects are subject to formal documentation for verification. [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] [depth:three_key_area_detailed_design]

### Zhongzhiyuan AI Independent Innovation Acceleration Area

Located as a "full-stack self-innovative garden." Spatially, it is suggested to connect the Qinghe interface, research and development spaces, standard governance display, and low-carbon innovation interactions into a single open corridor; Public Spaces should primarily host model evaluations, standard workshops, governance displays, and developer walks. The architecture should primarily focus on preservation and renovation, with new facilities using lightweight, reversible, and dismantlable public service components. The industrial testing scenarios include self-model testing, security governance sandbox, and low-carbon computing stations. Implementation depends on river blue lines, cultural heritage protection, energy, municipal services, and property rights verification.

### Beijing AI Origin Community

Located as a "Near-School Technology Transfer Community." Spatially, it is recommended to establish a slow-moving connection between the campus, park, and neighborhood, forming an open-source release hall, a technology transfer street, talent service nodes, and daily living facilities. The focus is not on creating a closed park, but on allowing students, faculty, developers, and residents to engage in low-threshold exchanges along the same public path. Implementation depends on verifying the campus boundary, existing building ownership, ground-floor business types, and the interface with rail transit stations.

### Dazhongsi AI Industry Cluster

Located as the "Smart Economic Exchange District." Spatially, it is suggested that the entrance be through the quadrants of pedestrian connectivity around Dazhongsi Station, placing enterprise exhibitions, international roadshows, smart terminal experiences, public education on data elements, and living services on a walkable urban interface. Conceptual schemes should not be directly used to transform enterprise-specific spaces; instead, prioritize reference actions at the level of Public Spaces, ground-floor facades, and event operations. Implementation will depend on integrated station-city conditions, road intersections, municipal utility lines, enterprise ownership, and commercial operation negotiations.

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### Five User Archetypes

1. **Open Source Developers**: Need to publish, collaborate, test, and contribute. Spatial Response is the original community open-source release hall, contribution showcase, and nighttime collaboration space; no personal tracking is collected.
2. **Startup Team**: Requires low-cost office space, compliant data entry, and a product testing ground. The space responds to the Zhongzhiyuan test nodes and enterprise service wing; computational and data services must be separately authorized.
3. **Headquarter Visitor Spaces**: Need to showcase, conduct business, host international receptions, and recruit talent. The space responds to the Dazhongsi International Roadshow Living Room and Track Portal.
4. **Neighboring Residents**: Need commuting, leisure, community services, and low-disturbance updates. Spatial responses include the heritage park's pedestrian loop, community services, and tiered nighttime activities.
5. **College Students and Faculty:** Need for technology transfer, cross-institutional collaboration, and daily pedestrian access. Spatial responses include campus-park integration, technology transfer hubs, and AI education experience points.

### Ten AI Scene Cards

| Number | Scene Card | Space | Data and Artificial Boundary |
| --- | --- | --- | --- |
| 01 | Open Source Release Hall | AI Origin Community | User-Submitted, Released After Manual Review |
| 02 | Safety Governance Sandbox | Zhongzhiyuan | Publish task data, ensuring test processes are traceable |
| 03 | Side-End Computational Hub | One Public Node | Energy and computational conditions to be confirmed, no personal data collected |
| 04 | AI Slow-Travel Navigation | Heritage Park Vitality Corridor | Using Public Road Data and Manual Verification |
| 05 | Dazhongsi International Roadshow Living Room | Dazhongsi | Enterprise and event materials must be authorized |
| 06 | Qinghe Low-Carbon Innovation Corridor | Zhongzhiyuan Along Qinghe River Interface | Ecological and Flood Control Data Must Be Derived from Official Sources |
| 07 | Nearest School Technology Transfer Street | AI Origin Community | All research outcomes, intellectual property, and images require authorization |
| 08 | Data Element Living Room | Dazhongsi | Only displays compliant cases, does not display personal or internal data |
| 09 | AI Life Service Sample Street | Intersection of Community and Commerce | Medical, Educational, and Legal Services Must Undergo Human Review |
| 10 | Global AI Activity Week Route | One Public Space | Activity Permits, Safety, and Copyright Conditions Pending Confirmation |

Among the Testing and Validation Scenarios 01, 02, and 03, they respectively validate public engagement methods for open-source releases, trusted security, and low-carbon computational power. These testing scenarios are only recommended for implementation in low-risk, regulated, and reversible contexts, and should not be formalized as approved operations. [source:AGENT-TASKBOOK] [depth:ai_scenario_cards]

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The current Building Footprint area is `310807.184 sqm`, which comes from the submitted conceptual building layer and does not represent the total existing building volume, nor does it constitute the building scale or Floor Area Ratio conclusion. [metric:building_footprint_area_sqm] [data:geometry/buildings.geojson#BLDG-001]

This scheme divides the architectural strategy into four categories: preserve, renovate, public components, and pending control: spaces with high cultural and public identification values are prioritized for preservation; suggestions for renovation are proposed for first-floor spaces that are not open and have fragmented interfaces; reversible components are used for public service and display nodes; matters involving demolition, new construction, Building Height, intensity, and ownership are all listed as pending control. [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:retain_renovate_demolish]

## Blue-Green Network, Public Space, and Urban Character

`green_space.geojson` and `public_space.geojson` together form the explanatory layer for the vitality belt of the Jing-Zhang Heritage Park. The current green space ratio is 12.3423%, and the Public Space ratio is 7.3281%, both calculated based on the Provisional Boundary and the submitted layers. Recalculation is required after the formal boundary is replaced. [metric:green_ratio] [metric:public_space_ratio] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]

Public Space is suggested to include three AI pilgrimage landmarks: developer promenades, open-source achievements gallery, and intelligent body contribution honor wall.

- **Developer's Walkway**: Organize railway lines, code contributions, and urban observations into a continuous walking experience, focusing on public knowledge and everyday pauses, without high-intensity recreational facilities.
- **Open-Source Achievement Showcase Corridor**: Form an updatable achievement showcase system at parks, stations, or public building facades, where all displayed content requires copyright and manual review.
- **Contributor Honor Wall:** Records public submissions, solution iterations, and professional feedback, showcasing content that can be sustainably updated. The specific location and construction form will be determined by the professional team in collaboration with the management authority.

Cultural narrative adopts a dual-line narrative of "railways bringing the distant to the city, and codes allowing more people to continue building the city." The first layer narrates the historical facts of the Jing-Zhang Railway and China's self-built history; the second layer narrates the research, entrepreneurship, and open culture in Zhongguancun; the third layer narrates the public interest in the AI era, including open collaboration, Human Review, and public interest. The sign system is suggested to express three levels of information: timeline, node line, and contribution line, avoiding the transformation of historical and cultural elements into technological decoration. [source:AGENT-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:blue_green_public_space]

## Renewal Projects, Implementation Policy, and Phasing

| Project | Recent Referenced Actions | Mid-term Deepening | Main Prerequisites |
| --- | --- | --- | --- |
| JZ-01 Slow Travel Discontinuity Integration | Publicly Identify Discontinuities, Manual Patrol, Lightweight Signage | Integrate with Roads and Stations for Deepened Design | official Road and Traffic Conditions |
| JZ-02 Qinghe Innovation Interface | Public Knowledge Display and Low-Carbon Experience Pilot | Blue-Green Space and Ecological Conditions Deepening | River Blue Line, Flood Protection, Cultural Heritage Protection |
| JZ-03 Original Point Conversion Street | Open Source Release, Resultant Showcase, Talent Services | First Floor Interface and Further Project Development | Campus Boundary, Ownership, and Business Type |
| JZ-04 Dazhongsi Pedestrian Connection | Activities Day Pedestrian Organization and Information Signage | Station-City Integration and Intersection Optimization | Rail, Road, Utilities |
| JZ-05 AI Public Service Node | Low-Intrusion Service Prototype and Human Review | Computing Power, Energy, Operations Deepening | Energy, Data, Security |
| JZ-06 Global AI Activity Week | Form an Annual Activity Reference Calendar | Community Operations and International Communication Mechanisms | Venue Permits, Copyright, Safety |

Suggest phasing as "first open, then verify, and finally deepen." In the short term, focus on lightweight Public Spaces, open data, manual inspections, and activity pilots to validate needs; in the medium term, convert the validation results into station, interface, and service node designs; in the long term, after the Official Boundary, control plan, ownership, municipal, cultural heritage, and professional design conditions are fully in place, discuss the engineering and implementation. Activities, recruitment, policies, and funding are all Conceptual Recommendations, not government commitments. [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation] [depth:renewal_project_list]

### Global AI Activities and Long-Term Operations

Suggest forming a seasonal activity system: spring "Open Source Loop Release Season," summer "Urban Agent Scenario Access Day," autumn "Centennial Jing-Zhang AI Innovation Week," and winter "Public Knowledge Review Season." Developer communities could adopt an operational mechanism comprising public topics, contribution records, solution reviews, human mentorship, and feedback from professional teams. Scenario access operations should include booking, risk warnings, human supervision, exit mechanisms, and data deletion rules. International communication could use bilingual public archives, open map stories, and annual contribution lists, but must not use unauthorized corporate or personal identifiers.

## Metrics, Area Recalculation, and Compliance Matrix

The core known metrics of the current submission package are as follows:

| Indicator | Current Value | Formula and Explanation |
| --- | ---: | --- |
| `site_area_sqm` | 11,412,825.386 sqm | Temporary overall design boundary area, EPSG:4548 recalculated |
| `building_footprint_area_sqm` | 310,807.184 sqm | polygon area sum from the building layer |
| `green_ratio` | 0.123423 | Green Area / Temporary Overall Design Boundary Area |
| `public_space_ratio` | 0.073281 | Public Space Area / Temporary Overall Design Boundary Area |
| `key_area_count` | 3 | Count of Three Mandatory Key Areas |

These metrics only prove that the current design package is calculable, but do not prove the official control plan or final construction indicators. The FAR, Building Height, Building Coverage Ratio, road red line, ownership, municipal capacity, talent density, industrial output value, and frequency of scene usage are all unknown or pending_control. These should be completed in the formal documentation and after professional refinement. [metric:site_area_sqm] [metric:building_footprint_area_sqm] [metric:green_ratio] [metric:public_space_ratio] [metric:key_area_count] [depth:metrics_recalculation]

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

`compliance_matrix.json` covers announcements 1.3, 1.4, 1.5, and agent.1-agent.6; `standard_matrix.json` covers project announcements, agent task books, Ministry of Housing and Urban-Rural Development () Urban Design Measures, detailed planning compilation and approval methods, and the National Resources Ministry () Land Use Classification Guide; `design_depth_matrix.json` covers current diagnosis, three layers of scope, overall structure, land use, buildings, transportation, utilities, blue-green spaces, key areas, project list, phases, indicators, and risks. [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]

## Risk, Copyright, and Compliance

1. **Boundary Risks**: The current three-layer boundaries and key area polygons are provisional and will be recalculated in their entirety once the formal polygons are completed.
2. **Controlled Risk**: Building Height, Floor Area Ratio, road red line, ownership, facility capacity, and the Demolish–Renovate–Retain Strategy are pending confirmation with formal documentation.
3. **Data Risks**: Use only publicly available or de-identified data, and do not upload personal privacy information, internal corporate data, or non-public planning documents.
4. **AI Responsibility**: The generated content must be verified for sources, spatial accuracy, copyright clearance, and judged by a professional team.
5. **Operational Risks**: Activities, scenarios, and public service suggestions require permits, staff supervision, risk warnings, and exit mechanisms.
6. **Cultural Rights**: Logos, fonts, photographs, images, corporate identifiers, and historical images must obtain permission before being used for public display.

The drawings, HTML, and infographics in this package are for explanatory purposes only; authoritative data are in GeoJSON, metrics, and matrices. The proposal does not claim government approval, final land ownership, final build scale, or guaranteed implementation. [depth:risk_missing_data] [source:SOURCE-REGISTRY]

## References

This section references [source:PROCESSED-FACT-PACK], [standard:MOHURD-ARCH-DESIGN-DEPTH-2016], and [data:geometry/constraints.geojson#CONSTRAINTS] to ensure that the reference documents, professional standards, and pending constraints can be machine-verified.

- `brief/site-package/design_brief.json`
- `brief/site-package/agent_taskbook.json`
- `brief/site-package/allowed_design_space.json`
- `brief/site-package/geometry/provisional_boundaries.geojson`
- `data/source_registry.json`
- `docs/formal-submission-guide.md`
- `brief/site-package/standards/standards.json`
- `compliance_matrix.json`
- `standard_matrix.json`
- `design_depth_matrix.json`
