---
title: "Jing-Zhang Smart Veneer: Centennial Jing-Zhang AI Innovation Belt Synergistic Coexistence Plan"
author_github: "Jack777-han"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With the Jing-Zhang Railway Heritage Park as the historical axis and the three key areas as innovation anchor points, propose a coordinated coexistence plan of one belt, three cores, and multiple points, integrated with a blue-green slow-moving composite loop, covering the announcement tasks and agent.1-agent.6."
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "ai-origin-community"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "enterprise-service-copilot"]
iteration: "v0.2"
---

# Jing-Zhang Smart Veneer: Centennial Jing-Zhang AI Innovation Belt Synergistic Coexistence Plan

## Design Basis and Source List

This plan is based primarily on the qualification pre-review announcement issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources for the Centennial Jing-Zhang AI Innovation Belt Urban Design International Scheme Competition [source:OFFICIAL-ANNOUNCEMENT], and on the structured brief, boundaries, enumerations, scope, and source list within the `brief/site-package/` for machine-readable reference [source:SITE-PACKAGE]. The agent reads `design_brief.json`, `allowed_design_space.json`, `agent_taskbook.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json`, and `standards.json` before generation, and strictly follows the ten co-creation principles and unified boundary conditions for the agent task book [source:AGENT-TASKBOOK] and [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

The documentation usage boundaries are defined by `data/source_registry.json`, distinguishing between formal-ready, background-only, provisional-only, and needs-review categories [source:SOURCE-REGISTRY]. This plan uses only the rough provisional boundary generated from the official announcement text area and the road boundaries, clearly marked as `provisional_constraint`, not as an official redline, and not as a precise area reference [source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE]. All design judgments are decomposed into traceable sources, recalculable metrics, verifiable layers, and human-reviewable assumptions [depth:metrics_recalculation]. (Human Review)

The public documentation boundaries determine the expression of this scheme: it is an Open Co-Creation Conceptual Recommendation and reference plan, not a substitute for formal planning, nor a basis for government approval [standard:MOHURD-CONTROL-DETAILED-PLANNING]. Urban Design depth must be integrated into the planning to guide architectural design, shape distinctive urban character, and coordinate Public Spaces [standard:MOHURD-URBAN-DESIGN-MEASURES]. Land use expression adopts the logic of the land and sea use classification in the national spatial planning and is based on a verifiable land_use_code [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

![Evidence Chain and Relationship Diagram with Submission Package](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal is organized in three progressive layers: the Coordinated Research Area covers 43.6 square kilometers, addressing the AI industry ecosystem, the integration of the Three Zones and Two Wings, and the future urban form [data:geometry/site_boundary.geojson#SITE-001]; the Overall Design Area covers 11.4 square kilometers of the surrounding 1 to 2 kilometers of the Jing-Zhang Heritage Park, forming the overall framework for Urban Renewal, the layout of industrial spaces, transportation and municipal support, and the control of urban appearance [depth:three_level_scope_framework]; the Key-Area Detailed Design Area covers 368.4 hectares of three detailed design regions, clarifying functional types, building scale, categories of the Demolish–Renovate–Retain Strategy, Public Space connectivity, and traffic organization [depth:three_key_area_detailed_design].

The three layers are not disjointed sets of drawings. Coordinated research determines the relationship between the industrial chain and urban form, with the overall design translating these judgments into updates for projects, spatial structures, and facility capacities. The key areas focus on the implementation feasibility of specific sites, buildings, transportation, Public Spaces, and AI scenarios in the Zhongzhiyuan AI Independent Innovation Acceleration Area, Beijing AI Origin Community, and Dazhongsi AI Industry Cluster [depth:overall_spatial_structure]. The three key areas are identified as follows: [data:geometry/key_areas.geojson#KA-001], [data:geometry/key_areas.geojson#KA-002], and [data:geometry/key_areas.geojson#KA-003].

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

The overall concept of this proposal is the "Jing-Zhang Synoikism Belt" (Jing-Zhang): with the Jing-Zhang Heritage Park as the main axis of historical and Public Space, three key areas as innovation anchor points, and universities, enterprises, communities, and rail stations forming the daily network, creating a spatial organization of one belt, three cores, multiple operational nodes, and a composite loop of blue-green slow travel. Here, "one belt" is not a new red line, but translating the three layers of the announced scope into a working method; "three cores" correspond to three key areas; "multiple operational nodes" correspond to AI-enabled public services, industrial services, and urban living nodes that are operable; and "composite loop" corresponds to the integrated connection of slow travel, green spaces, public spaces, and activity routes [depth:blue_green_public_space].

| Level | Design Issue | Solution Approach | Data Focus |
| --- | --- | --- | --- |
| Coordinated Research Area | AI Industry Ecology and Future Urban Form | innovation chain for university-led research, open-source collaboration, enterprise transformation, public experience, and international dissemination | compliance_matrix.json, standard_matrix.json |
| Overall Design Area | Industrial Space, Urban Renewal, Transportation and Utilities, Scenic Features | Land use, buildings, roads, green spaces, Public Spaces, and phased layering expressed together | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-Area Detailed Design Area | How to Achieve Detailed Design Depth for Three Areas | Location, Spatial Actions, AI Scenarios, Implementation Dependencies | [data:geometry/key_areas.geojson#KA-001], [data:geometry/key_areas.geojson#KA-002], [data:geometry/key_areas.geojson#KA-003] |

## Coordinated Research Area: Industry and Future City Research

The core task of the Coordinated Research Area is to construct a world-class AI Innovation Ecosystem while preserving the historical layers of the Jing-Zhang Railway and allowing space for the emergence of AI-Native urban forms. Here, a set of relationships that require a dialectical perspective exists: the static preservation of historical heritage versus the dynamic emergence of AI innovation, the concentration of global AI capital versus the balance with local community daily life, and the certainty of top-down planning versus the uncertainty of AI-Native bottom-up collaboration [depth:existing_conditions_diagnosis]. The approach to the scheme is not to eliminate tension but to transform it into spatial mechanisms: making the heritage park a living historical layer that can be lightly embedded by AI scenarios, anchoring the original community to attract talent and daily life to avoid gentrification, and positioning the overall scheme as a Conceptual Recommendation for professional teams to deepen [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

Conceptual Recommendation for the naming system is to adopt the main name "Jing-Zhang Synoikism Belt," with English as Jing-Zhang Synoikism Belt. It is accompanied by three secondary names (Centennial Jing-Zhang Cultural Belt, Urban AI Living Experience Belt, AI Fusion Innovation Belt) and three core node names (Synoikism Origin, Collective Intelligence Engine, Great Bell Confluence). The visual identity direction of the main name is a closed loop derived from the abstraction of a railway ring line, with the outer ring representing the Jing-Zhang Heritage Park Vitality Belt and the inner network representing the AI collaboration network, which can be extended as themes for signage, event visuals, and honor walls. This direction is only a conceptual recommendation; the formal logo, font, and corporate identity must be separately cleared for rights [depth:height_massing_character].

In response to the requirements of the intelligent body task book, address the five functional areas and the synergistic loop of the Three Zones and Two Wings [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]: AI Full-Stack Independent Innovation System, a world-class AI Innovation Ecosystem, a new paradigm of AI-Enabled Scenario empowerment, an intelligent AI vibrant city, and global discourse power in AI governance, respectively carried by Zhongzhiyuan, the Origin Community, and Dazhongsi, three cores, and are supported by the Zhongguancun Technology Services Wing (global configuration of elements, IP and capital empowerment) and the Xiaoyue River Scenario Enablement Wing (Scenario Access and intelligent AI vibrant city) [depth:overall_spatial_structure]. (Full-Stack Independent AI Innovation System)

Global AI Innovation Ecosystem Case Studies (7 examples, for transformation into spaces and operational mechanisms, not direct replication): Paris Station F (single large incubator and community operation), Toronto MaRS / Vector Institute (corridor from research to industry), Shenzhen Nanshan (hardware supply chain and mass production capacity), Boston Kendall Square (university and bio/AI crossover), Stockholm Kista (telecom and urban testbed), Tsukuba Science City (national laboratory and livable community), and Eindhoven Brainport (academic, research, industry, and community collaboration). Their shared experience is "physical aggregation + open access to testing + daily talent network + long-term operational entity," and this plan accordingly positions Scenario Access and developer community operations as long-term assets for the belt [depth:land_use_layout].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The Overall Design Area requires the depth of Urban Design to meet the requirements of Regulatory Detailed Planning. The proposal expresses the overall structure of Urban Renewal through land use zoning, Building Footprints, road micro-circulation, green spaces and Public Spaces, and phased layering [data:geometry/land_use.geojson#LU-001], [data:geometry/buildings.geojson#BLDG-001], [data:geometry/roads.geojson#ROAD-001]. Conclusions regarding Building Height, Development Intensity, road red lines, setbacks, and facility standards are to be listed as pending confirmation items when official control plans are not available, and should not be based on speculative values [depth:development_intensity_controls], [standard:MOHURD-CONTROL-DETAILED-PLANNING].

The overall structure is "one axis connecting three cores, a blue-green slow-moving composite ring": the Jing-Zhang Heritage Park Vitality Belt serves as the north-south main axis, connecting the Zhongzhiyuan, Origin Community, and Dazhongsi three innovation anchor points; the Little Moon River and Qinghe Blue-Green Corridor, urban slow-moving network, and Transit-Station Integration interfaces together form the composite ring [depth:traffic_rail_slow_parking]. Building updates focus primarily on preservation and renovation, with new constructions concentrated in industrial service and public experience nodes; the demolish–renovate–retain classification only provides methods and pending calibration lists when there are no existing buildings or ownership records, without fabricating conclusions [depth:retain_renovate_demolish]. (Demolish–Renovate–Retain Strategy)

Municipal and New Infrastructure strategies cover AI industry service facilities, innovation service platforms, talent living services, distributed energy, edge-side computing power, and their integration with traditional municipal infrastructure [depth:municipal_new_infrastructure]. When pipeline, energy, drainage, flood control, fire protection, and other engineering data are missing, these are listed as formal deepening prerequisites, and not as definitive conditions [depth:risk_missing_data].

## Detailed Design of Key Areas

Three key areas must reference [data:geometry/key_areas.geojson#KA-001], [data:geometry/key_areas.geojson#KA-002], and [data:geometry/key_areas.geojson#KA-003], and be verified by [depth:three_key_area_detailed_design] to ensure they meet the depth of the Integrated Planning Implementation Plan. Under the Provisional Boundary, conclusions can only serve as directional designs; they must be recalculated after replacing the official polygons.

Zhongzhiyuan AI Independent Innovation Acceleration Area (Garden-Type Full-Stack Independent Innovation Street District): Enhance the Qinghe interface, industrial display, low-carbon innovative interaction, and external traffic organization; green spaces will carry open testing and standards governance display [data:geometry/green_space.geojson#GREEN-001]. Spatial actions include a national platform exhibition hall, a safety governance sandbox, a low-carbon computing station, and a garden-type research and development cluster.

Beijing AI Origin Community (Near-School Type Conversion of Results and Talent Community): Organize the seamless integration of campus, park, and street areas; supplementing the release of results, talent services, residential life, and open-source collaboration spaces [data:geometry/public_space.geojson#PUBLIC-001]. Spatial actions include an open-source release hall, a near-school conversion results street, a talent life concierge, and nighttime collaboration spaces.

Dazhongsi AI Industry Cluster (Urban Type Intelligent Economy and International Exchange District): Around Dazhongsi Station, it integrates a unified design with a quadrants-based pedestrian connection, updating the commercial services and public environment of key enterprises [data:geometry/roads.geojson#ROAD-001]. Spatial actions include an international roadshow living room, intelligent body displays, a data element living room, and a combined use of green spaces.

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

Each focus area shall form a readable small plan that includes 'positioning + spatial structure + building renewal + traffic slow zones + Public Space + AI scenarios + implementation risks'. If the focus area polygon is temporary, it must be explained which conclusions can only serve as directionally designed [assumption_id:A-CONTROLS-001].

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

The plan establishes a spatial demand profile for AI talent and enterprises, covering research and development offices, open-source collaboration, results dissemination, corporate services, talent housing, social learning, consumption and living, sports and leisure, and international exchanges [depth:blue_green_public_space]. AI-Enabled Scenarios must be anchored within spatial and governance boundaries: the Public Space scenario references [data:geometry/public_space.geojson#PUBLIC-001], the pedestrian and traffic scenario references [data:geometry/roads.geojson#ROAD-001], and the open space scenario references [data:geometry/green_space.geojson#GREEN-001] with [metric:public_space_ratio] and [metric:green_ratio].

User Profiles (5 categories): Open Source Developers (publishing, collaboration, testing, community reputation), Startup Teams (affordable office space, compute access, product testing ground), Head Enterprise Visitors (exhibition, business, international guest hosting), Surrounding Residents (commuting, leisure, community services, low-impact updates), University Students and Faculty (research outcomes, cross-institution collaboration, daily slow travel). Each profile is designed with privacy boundaries: no personal behavior tracking, and activity data is only used for aggregated statistics.

Scenario Card (12 cards, including 3 Testing and Validation Scenario cards):
01 Open Source Exhibition Hall (Original Point Community, Node for Result Release and Model Evaluation)
02 Safety Governance Sandbox (Zhongzhiyuan, a visitable collaborative node for standard development, security evaluation, and red team testing)
03 Edge-side Computing Hub (Overall Scope Node, a prototype of New Infrastructure that integrates with public services and low-carbon energy, belonging to the Testing and Validation Scenario)
04 AI Slow Travel Navigation (Testing and Validation Scenario for heritage park vitality zone, including interpretable signposting and identification of slow travel breakpoints)
05 Dazhongsi International Showcase Lounge (Dazhongsi, showcasing intelligent bodies and business presentations, negotiations, and international roadshows)
06 Qinghe Low-Carbon Innovation Corridor (Zhongzhiyuan's Interface with Qinghe River, Greenway, Flood Management, Pedestrian and Bicycle Paths, and AI Demonstration Integrated)
07 School Nearby Conversion Results Street (formerly Point Community, Incubation, Legal Services, Intellectual Property, Financing and Investment Services)
08 Data Elements Living Room (Dazhongsi, a city interface for compliant, authorized, and auditable data flow, belonging to the Testing and Validation Scenario)
09 AI Living Service Sample Street (where community and commercial spaces intersect, with medical/educational/legal/living services integrated into small-scale street blocks)
10 Jing-Zhang Memory Route (Railway Cultural Heritage, Zhongguancun Innovation Culture, and AI New Culture Connected)
11 Urban Agent Inspection (public documentation review, facility maintenance, risk warning, requires Human Review)
12 Global AI Activity Week Route (A walkable and shareable experience route from site culture to international roadshow)

All scene nodes enter the structured layer or grid system, clearly defining the target audience, spatial location, data source, privacy boundaries, Human Review, and operational entity [depth:municipal_new_infrastructure]. Urban Agents can assist in identifying pedestrian discontinuities, Public Space heat maps, business service demands, and activity safety risks, but they cannot replace planning approval, cannot output unauthorized personal profiles, and cannot claim official implementation commitments [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The Land-Use Plan is based on the classification of land and sea use in the territorial space, forming a complete, closed, and seamless land-use zone [data:geometry/land_use.geojson#LU-001] and [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The architectural plan distinguishes between retained, renovated, updated, newly constructed, or to-be-confirmed elements, clearly defining the baseline, function, scale, appearance, roof, massing, and height control recommendations [depth:height_massing_character] and [data:geometry/buildings.geojson#BLDG-001]. When the current buildings, ownership, control plans, and engineering conditions are missing, only methods and a list for calibration are proposed [depth:retain_renovate_demolish].

The building scale and intensity metrics must be consistent with the metrics.json and layers. Total building scale, Floor Area Ratio, Building Height, Building Coverage Ratio, green space ratio, and setback distances should be listed as unknown or pending_control when official conditions are missing, without creating a precise sense [metric:building_footprint_area_sqm] [metric:floor_area_ratio]. The A3 booklet provides an updated project list and metric review table, while the A0 poster expresses the key spatial structure and focus areas, with HTML providing an interactive view of the metrics and layers.

## Transport, Rail, Municipal Infrastructure, and Public Services

Traffic solutions respond to Transit-Station Integration, road micro-circulation, pedestrian discontinuity, external traffic, parking, non-motorized vehicle parking, and the green transportation system [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]. The focus covers the North Fifth Ring Road, the Jing-Zhang Heritage Park ring-road crossing node, Wudaokou, the west end of Qinghua Donglu, Dazhongsi station, and the areas around key enterprises. The road and pedestrian layers remain within the submission boundary and are cross-referenced with Public Space, green spaces, industrial nodes, and key areas [data:geometry/public_space.geojson#PUBLIC-001].

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

Municipal and public service facilities cover AI industry service facilities, innovation service platforms, talent living services, New Infrastructure, distributed energy, edge-side computing power, and traditional municipal integration [depth:municipal_new_infrastructure]. The plan specifies facility standards, spatial layout, service radius, operational models, and phased logic; when lacking pipeline, energy, drainage, flood control, fire protection, and other engineering data, it is listed as a formal deepening prerequisite [data:geometry/constraints.geojson#CONSTRAINTS].

## Blue-Green Network, Public Space, and Urban Character

Blue-Green Space is structured around the Jing-Zhang Heritage Park Vitality Belt, integrating the travel needs of Qinghe, Xiaoyuehe, nearby universities, enterprises, and communities. It proposes a network of pedestrian and cycling paths and green spaces that are north-south connected and east-west linked [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001]. Identifying pedestrian and cycling discontinuities, overpass nodes, and landscape nodes at the southern and northern ends of the park, it proposes a composite utilization strategy for parking, sports, innovative interactions, technology testing, application demonstrations, and public services [metric:green_ratio].

Urban Character blends the historical and cultural heritage of the Jing-Zhang Railway, the innovation culture of Zhongguancun, and AI innovation culture, utilizing cultural resources such as the Tsinghua Garden Railway Station and the North Film Institute. Proposals must define the urban tone, architectural style, roof forms, massing, facades, and public art guidance [standard:MOHURD-URBAN-DESIGN-MEASURES]. Signage, cultural symbols, international communication narratives, AI pilgrimage sites, and contribution walls must be clarified, and no over-entertainment or conceptual landmarks should be approved without actual construction.

AI Sacred Landmark and Honor Display Nodes (4 locations): Wisdom Pulse Origin (Jing-Zhang Start Memorial Ring and Open Source Contribution Wall around Tsinghua Yuan Station), Zhongzhi Engine Tower (visible landmark and safety governance display of full-stack independent innovation in Zhongzhiyuan), Big Bell Convergence Hall (AI International Exchange and Demo Living Room at Dazhongsi), Site Honor Wall (permanent memorial system inscribing contributors' GitHub Names and Agent names along the Jing-Zhang Heritage Park). All landmarks, signage, logos, fonts, images, individuals, and corporate logos must be cleared for rights [depth:height_massing_character].

## Renewal Projects, Implementation Policy, and Phasing

Implementation plans form a reviewable list of renewal projects, detailing location, type, function, responsible parties, dependency conditions, implementation phases, risks, and evaluation indicators [depth:renewal_project_list]. Policy recommendations cover Urban Renewal integrated implementation, spatial supply, operational mechanisms, industrial services, public participation, data governance, and property rights coordination [data:geometry/phasing.geojson#PHASE-001].

Update Projects (6 items): JZ-01 Jing-Zhang Site Park Pedestrian Gap Closure (Public Space/Transportation, dependent on road boundary and underbridge space), JZ-02 Zhongzhiyuan Qinghe Innovation Interface (Blue-Green/Industrial Display, dependent on river blue line and flood control), JZ-03 Original Community Near-School Conversion Street (Urban Renewal/Industrial Services, dependent on campus boundary and first-floor operations), JZ-04 Dazhongsi Station Quadrant Pedestrian Connectivity (Integrated Rail/Slow Travel, dependent on station and municipal utility lines), JZ-05 AI Public Services and Edge Computing Nodes (New Infrastructure/Public Services, dependent on energy and operational entities), JZ-06 Global AI Activity Week Public Route (Operations/Branding, dependent on public space permits and copyright clearance).

Distinguish between phasing and the 100-day call for submissions: in the near term, initiate with lightweight facilities, operational activities, and service platforms; in the mid-term, advance the update projects; and in the long-term, form a governance framework [depth:phasing_implementation]. The annual activity system, developer community operations, Scenario Access days, public experience routes, and international communication mechanisms are all detailed with operational targets, frequency, responsibility boundaries, transformation pathways, and risk [depth:renewal_project_list].

## Metrics, Area Recalculation, and Compliance Matrix

The metric system includes the Overall Design Area area, the area of key regions, the ratio of green spaces and Public Spaces, Building Footprint, the number of update projects, AI scenario nodes, slow travel connectivity metrics, industrial space metrics, talent service metrics, and self-inspection status [metric:site_area_sqm] [metric:key_area_count]. All known metrics are recalculated from GeoJSON or reliable sources; unknown metrics provide the reason and formal submission prerequisites [depth:metrics_recalculation].

Core Metrics: [metric:site_area_sqm] recalculated by the Provisional Boundary projection, [metric:green_ratio] and [metric:public_space_ratio] recalculated by the green space and Public Space layers, [metric:building_footprint_area_sqm] recalculated by the Building Footprint layer, and [metric:key_area_count]=3 recalculated by the key areas layer. These values come from [data:geometry/site_boundary.geojson#SITE-001], [data:geometry/key_areas.geojson#KA-001], [data:geometry/buildings.geojson#BLDG-001], [data:geometry/green_space.geojson#GREEN-001], and [data:geometry/public_space.geojson#PUBLIC-001].

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

The Code Array is the main control file for task responsiveness. Each announcement task corresponds to a report chapter, layer, metric, drawing, HTML page, source, assumptions, and self-check items [depth:metrics_recalculation]. Metrics are categorized into three types: spatial metrics that can be recalculated from submitted geometry, control metrics that require official land use plans, and performance metrics that require operational data calibration, respectively entering metrics.json, assumptions.json, and compliance_matrix.json [standard:MOHURD-CONTROL-DETAILED-PLANNING].

## Risk, Copyright, and Compliance

The proposal documents can be submitted in Chinese or English. All images, drawings, icons, data, and code assets should be documented in sources.json or report/copyright_statement.md, including their sources, licenses, and authorization status [depth:risk_missing_data]. HTML The page does not load remote scripts, remote map tiles, remote fonts, iframes, forms, or external API, do not track the reviewers' behavior [data:geometry/constraints.geojson#CONSTRAINTS].

The risk and missing data list is managed by [depth:risk_missing_data] and cross-referenced with [source:SITE-PACKAGE]. Conclusions lacking official zoning, road right-of-way, ownership, municipal, fire safety, or cultural heritage conditions are downgraded to pending confirmation items. This plan does not claim official approval, final zoning, ultimate land ownership, final building scale, or guarantee of implementation; the AI agent is responsible for the facts, sources, copyright, spatial data, indicators, and expression [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

## Machine-readable citation index

- Source: [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE], [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK]
- Standards: [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]
- Depth: [depth:existing_conditions_diagnosis], [depth:three_level_scope_framework], [depth:overall_spatial_structure], [depth:land_use_layout], [depth:development_intensity_controls], [depth:height_massing_character], [depth:retain_renovate_demolish], [depth:traffic_rail_slow_parking], [depth:municipal_new_infrastructure], [depth:blue_green_public_space], [depth:three_key_area_detailed_design], [depth:renewal_project_list] [depth:phasing_implementation], [depth:metrics_recalculation], [depth:risk_missing_data]
- Data: [data:geometry/site_boundary.geojson#SITE-001], [data:geometry/key_areas.geojson#KA-001], [data:geometry/key_areas.geojson#KA-002], [data:geometry/key_areas.geojson#KA-003], [data:geometry/land_use.geojson#LU-001], [data:geometry/buildings.geojson#BLDG-001], [data:geometry/roads.geojson#ROAD-001], [data:geometry/green_space.geojson#GREEN-001], [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/constraints.geojson#CONSTRAINTS], [data:geometry/phasing.geojson#PHASE-001]
- Metrics: [metric:site_area_sqm], [metric:building_footprint_area_sqm], [metric:green_ratio], [metric:public_space_ratio], [metric:key_area_count], [metric:floor_area_ratio]

## References

This plan is based on the machine-readable data package located in `brief/site-package/` and `data/source_registry.json`, with the sources, licenses, and permissions registered according to [source:SITE-PACKAGE] and [source:SOURCE-REGISTRY] as per [source:OFFICIAL-ANNOUNCEMENT].

- brief/site-package/design_brief.json [source:SITE-PACKAGE]
- brief/site-package/allowed_design_space.json [source:SITE-PACKAGE]
- brief/site-package/agent_taskbook.json [source:AGENT-TASKBOOK]
- brief/site-package/sources.json [source:SITE-PACKAGE]
- data/source_registry.json [source:SOURCE-REGISTRY]
- brief/site-package/schemas/compliance_matrix.schema.json [source:SITE-PACKAGE]
- brief/site-package/schemas/standard_matrix.schema.json [source:SITE-PACKAGE]
- brief/site-package/schemas/design_depth_matrix.schema.json [source:SITE-PACKAGE]
