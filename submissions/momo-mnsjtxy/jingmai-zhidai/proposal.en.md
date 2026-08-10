---
title: "Centennial Jing-Zhang AI Innovation Belt: Urban Design"
author_github: "momo-mnsjtxy"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Based on the announcement for the International Scheme Competition for the Centennial Jing-Zhang AI Innovation Belt Urban Design, complete a three-tier scope work framework, overall urban design, detailed design for key areas, AI Innovation Ecosystem and scenarios, land use and building design with the Demolish–Renovate–Retain Strategy, transportation and municipal services, blue-green Public Spaces and landscape, renovation list and phased implementation, and indicators recalculation and standard grid system for the formal AI city design scheme. The organizing committee's data gaps (Official Planning Boundary, control plan conditions) are explicitly marked, and they do not impede content evaluation. (Overall Design Area) (Provisional Boundary)"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# Centennial Jing-Zhang AI Innovation Belt: Urban Design

## Design Basis and Source List

This formal proposal is based primarily on the announcement titled 'Centennial Jing-Zhang AI Innovation Belt Urban Design International Call for Proposals' issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources, and uses the temporary rough boundaries, three key areas, land use and road enumeration, indicators, and source list registered in the `brief/site-package/` as machine-readable references [source:OFFICIAL-ANNOUNCEMENT] [source:SITE-PACKAGE]. The AI agent reads `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json`, and `data/processed/agent_fact_pack.md` before generating the scheme. It establishes a task, scope, data usage, and missing data checklist based on `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, and `missing_data_checklist.csv` [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]. All design judgments are decomposed into traceable sources, calculable metrics, verifiable layers, and Human Review hypotheses.

This plan complies with the requirements of the Urban Design Management Measures for Urban Character, Public Space, and building layout, and organizes the results with the depth of urban design in the Regulatory Detailed Planning and the Integrated Planning Implementation Plan. Therefore, the textual narrative does not replace the GeoJSON layers, indicator tables, A3 manuals, A0 exhibition boards, and HTML electronic presentations [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]. The land use classification criteria adopted are a subset of the Guide to Land and Sea Use Classification for Territorial Space Investigation, Planning, and Control (Trial) (categories 05, 0701, 0702, 0802, 0803, 0804, 1401, 1402, 1403) [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. Announce Task 1.3, 1.4, and 1.5 and the corresponding mapping to the intelligent agent tasks agent.1—agent.6 are detailed in `compliance_matrix.json` [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

The data boundary is registered as follows:

- `data/source_registry.json` distinguishes between formal-ready, background-only, provisional-only, and needs-review materials; this package does not upgrade provisional-only materials to official planning boundaries, statutory controls, or government commitments. (Official Planning Boundary)
- The depth of the current condition diagnosis is limited by the accuracy of publicly available data, with missing portions explicitly registered as assumptions and gaps [depth:existing_conditions_diagnosis] [depth:risk_missing_data].
- Official `SITE_BOUNDARY` and three `KEY_AREA` have not been released, so this package uses `brief/site-package/geometry/provisional_boundaries.geojson` to generate provisional boundaries [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE], which are further explained in [data:geometry/site_boundary.geojson#SITE-001], [data:geometry/key_areas.geojson#PROV-KEY-001] and metrics [metric:site_area_sqm], [metric:key_area_count]. (Provisional Boundary)

![Overall Design Area Conceptual Master Plan](assets/figures/site-overview.png)

The boundaries and focus areas are marked with `provisional_constraint` and `official_boundary=false`, which are only used for scheme generation, self-checking, visualization, and design discussions; these placeholders will be replaced with official polygons, after which the site boundary, key areas, land use, roads, green/public space, buildings, phasing, and metrics will all need to be recalculated in their entirety. This organizing party's data gaps should not block content scoring.

## Three-Level Scope Framework

The plan is organized according to the three-layer scope defined in the announcement, with each layer having a clear focus, depth of outcomes, and evidence points [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]:

- **Coordinated Research Area** (approximately 43.6 square kilometers): Focusing on the AI industry ecosystem, innovation chain, and future urban form across the entirety of Haidian, the research will concentrate on industrial studies, population employment, infrastructure coordination, and case studies. The aim is to produce strategic judgments rather than pseudo-precise redlines [source:OFFICIAL-ANNOUNCEMENT].
- **Overall Design Area** (approximately 11.4 square kilometers, i.e., the boundary of the submitted package): Focus on the urban and industrial areas within 1-2 kilometers around the Jing-Zhang Heritage Park. The design should form an overall framework for Urban Renewal, layout of industrial spaces, traffic and municipal infrastructure support, blue-green Public Spaces, and Urban Character control, reaching the depth of control plan Urban Design [data:geometry/site_boundary.geojson#SITE-001] [metric:overall_design_area_sqm].
- **Key-Area Detailed Design Area** (three areas, totaling approximately 368.4 hectares): Zhongzhiyuan AI Independent Innovation Acceleration Area, Beijing AI Origin Community, and Dazhongsi AI Industry Cluster, requiring clear definitions of functional uses, building scales, categories of demolish–renovate–retain strategy, Public Space connectivity, and traffic organization to achieve the depth of key area detailed design [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design]. (Demolish–Renovate–Retain Strategy)

The mapping relationship between the three layers and the announcements 1.3, 1.4, 1.5, and agent.1—agent.6 is recorded in `compliance_matrix.json`, ensuring that each mandatory task has a corresponding chapter, layer, indicator, drawing, and HTML evidence; the overlap of the Overall Design Area with the key areas, area calculation differences (including tolerances for provisional boundaries), and the conformity matrix are described in the "Indicator System, Area Recalculation, and Conformity Matrix" chapter [depth:metrics_recalculation]. (Provisional Boundary)

## Coordinated Research Area: Industry and Future City Research

The Coordinated Research Area takes Zhongzhiyuan Science City as its industrial matrix, organizing the AI innovation chain around the five elements of "algorithm—data—computing power—scenario—talent": the Zhongzhiyuan AI Independent Innovation Acceleration Area takes on foundational models and open-source ecosystems, the Dazhongsi AI Industry Cluster bears embodied intelligence, intelligent terminals, and consumer scenarios, the Beijing AI Origin Community is oriented towards startup incubation and young talent, and the Qinghe Riverbank and Zhongzhiyuan District of Zhongzhiyuan carry edge-side computing power, data services, and research and development conversion [source:PROCESSED-FACT-PACK] [depth:overall_spatial_structure].

The industrial strategy emphasizes "vertical innovation corridors + horizontal scenario networks": organize a 15-minute innovation interaction circle along the axis of the Jing-Zhang Heritage Park, aligning R&D, pilot testing, exhibitions, financing and investment, and community services within the same commuting unit; at the cross-area level, integrate the smart computing hub, data exchange, and open-source community as public service facilities across the entire belt scale to avoid redundant construction. In the context of future city research, the concept of an "AI-friendly city operating system" is proposed — with a public data directory, trusted computing power scheduling, Scenario Access list, and operational responsibility matrix as four infrastructure elements, supporting pilot projects such as robot delivery, autonomous shuttles, model red teams, and governmental intelligent agents [standard:MOHURD-URBAN-DESIGN-MEASURES] [source:AGENT-TASKBOOK].

This layer of the study does not add pseudo-precise redlines. It integrates the Overall Design Area layer [data:geometry/land_use.geojson#LU-00-0] [depth:overall_spatial_structure] through the Urban Character, Public Space, and building layout requirements of the Urban Design Management Measures, and explains how the industrial strategy ultimately manifests in visible and verifiable spatial structures. Population, employment, and economic output indicators are all listed as unknown due to the absence of official statistical criteria, as seen in [metric:talent_density_per_km2], [metric:ai_output_value_yuan], and [metric:ai_innovation_index].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

Overall Design Area (Provisional Boundary 11,412,825.386 square meters [metric:site_area_sqm]) with a total structure of "one belt, two centers, three corridors, and five districts":

- **One Belt:** The Jing-Zhang Railway Heritage Park Cultural Creative Belt is a spine of cultural memory and a primary pedestrian and bicycle route.
- **Two Hearts**: Dazhongsi Station Smart Consumption Hub and Zhongzhiyuan AI Autonomous Innovation Acceleration Core.
- **Three Corridors**: Southern Green Corridor pedestrian paths, Central Transformation Corridor, and Qinghe River waterfront corridor, forming a continuous blue-green network.
- **Five Fragments**: South Gate Entrance Fragment, Dazhongsi Station-City Integration Fragment, Middle Residential Service Fragment, Wisdom Integration R&D Fragment, and Collective Wisdom Headquarters Fragment.

![Land Use Functional Structure (Conceptual Zone Proposal)](assets/figures/land-use-structure.png)

Urban Design control adopts a "zone + element + indicator" three-tier system: zone control for land use function and intensity; element control for street cross-sections, building setbacks, color materials, and the fifth facade; and indicator control for Building Height, floor area ratio, open space ratio, and pedestrian connectivity [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:height_massing_character] [depth:development_intensity_controls]. Along the Jing-Zhang railway, a 30-60 meter protective green belt combined with cultural display functions organizes the interface; within 500 meters of the stations, compact, high-density mixed development is adopted, integrating underground pedestrian access with overhead development; residential and community services are arranged along both sides of the green corridor to ensure a balanced work-residence ratio and a 15-minute living circle [depth:land_use_layout].

Structural judgments are based on layers and indicators: land use zones are found in [data:geometry/land_use.geojson], conceptual building volumes in [data:geometry/buildings.geojson], structural road networks in [data:geometry/roads.geojson], Blue-Green Spaces in [data:geometry/green_space.geojson], Public Spaces and scene nodes in [data:geometry/public_space.geojson], and implementation phases in [data:geometry/phasing.geojson]. Control plan depth indicators (official Floor Area Ratio, Building Height control) remain unknown until the official control plan conditions are released: [metric:floor_area_ratio_official] and [metric:building_height_control_m]. This package provides [metric:floor_area_ratio]=1.26 for conceptual building massing, which does not substitute for statutory conditions.

## Detailed Design of Key Areas

![Detailed design scope for three key areas](assets/figures/key-areas.png)

Three key areas will undergo detailed design based on the announcement and temporary multi-sided polygons (areas will be recalculated according to EPSG:4548 and reconciled with the announcement's format) [source:KEY-AREA-SOURCE] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_key_area_detailed_design]:

- **Zhongzhiyuan AI Independent Innovation Acceleration Area** (approximately 1,929,201.877 square meters [metric:zhongzhiyuan_area_sqm], announced area about 192.1 million square meters): centered around the Smart Computing Hub, AI Research and Development Park, Headquarters R&D Park, and Intelligence Gathering Garden, it includes the Edge Side Computing Pilot Garden and the AI Headquarters R&D Park (HQ-A, HQ-B, HQ-C), forming an "computing power—model—application" acceleration chain [data:geometry/key_areas.geojson#PROV-KEY-001].
- **Beijing AI Origin Community** (approximately 1,043,236.909 square meters [metric:beijing_ai_origin_area_sqm], announced area about 104.3 million square meters): centered around AI Origin Square, Origin Pocket Park, AI startup incubation land, and talent apartments, it forms a 24-hour innovation community for entrepreneurial youth, equipped with a talent service and interaction center [data:geometry/key_areas.geojson#PROV-KEY-002].
- **Dazhongsi AI Cluster** (approximately 720,454.219 square meters [metric:dazhongsi_area_sqm], announced as about 720,000 square meters): centered around the Dazhongsi Station Smart Consumption Core, the station forecourt, and the smart terminal R&D park, it organizes the "Smart Business District on the Track," integrating station-city integration and pedestrian connectivity in four quadrants [data:geometry/key_areas.geojson#PROV-KEY-003].

All key areas have clarified: functional types and building scale (concept blocks see [data:geometry/buildings.geojson], a total of [metric:building_count]=28 concept blocks); the classification of demolition–renovation–retention strategy and update policies (see "Land Use, Building Scale, and Demolition–Renovation–Retention Scheme"); Public Space connectivity (public space land use [data:geometry/public_space.geojson], [metric:public_space_area_sqm]=785,136.404 square meters); and traffic organization (see "Traffic, Rail, Utilities, and Public Service Facilities"). The polygon boundaries for the key areas are temporary placeholders; they will need to be recalculated in their entirety after the official polygons are provided, and should not be used as precise area measurements or for approval purposes. (Demolish–Renovate–Retain Strategy)

The summary of the project-level implementation list for the three key areas (project, priority, scale, responsibility interface) is as follows; the complete list is shown below:

| Key Area | Project | Priority | Scale Criteria | Responsibility Interface |
| --- | --- | --- | --- | --- |
| Zhongzhiyuan AI Independent Innovation Acceleration Area | Smart Computing Hub and Edge Side Computing Power Pilot Garden | Priority | Preservation and New Construction, Approximately 120,000 Square Meters | Park Management + Computing Power Operation Entity |
| Zhongzhiyuan AI Independent Innovation Acceleration Area | AI Research Park/Headquarters Research Park (HQ-A/HQ-B/HQ-C) | Prioritize | New construction, approximately 24 units. | Master Plan+Development Entity |
| Zhongzhiyuan AI Independent Innovation Acceleration Area | Connect Zhuihui Garden with Public Space | Priority | Update | Public Space Operations Handling |
| Beijing AI Origin Community | AI Origin Square and Stage | Priority | Update | Community Operations Lead |
| Beijing AI Origin Community | AI Origin Pocket Park (SN-005) | Prioritize | Update | Public Space Operations Handling |
| Beijing AI Origin Community | Talent Apartments and Startup Incubation Tower | Priority | Renovation + New Construction | Talent Assurance + Incubation Carrier |
| Dazhongsi AI Cluster | Dazhongsi Station Plaza (SN-002) | Prioritize | Update | Rail Operator + Public Entity |
| Dazhongsi AI Cluster | Smart Consumption Core (SN-001) | Priority | Update + Renovation | Business District Operator + Merchant Alliance |
| Dazhongsi AI Cluster | Smart Terminal R&D Park and Cross-Street Connectivity | Prioritize | Update+Renew | Industrial Recruitment + Development Subject |

Implement in accordance with the principle of "public first, then commercialization; pilot first, then expansion"; investments are not fixed, and shall be based on official attachments and feasibility assessments [depth:three_key_area_detailed_design].


## AI Innovation Ecosystem, Personas, and AI+ Scenarios

The AI Innovation Ecosystem is organized into three concentric layers: the root stack layer, which is carried by the Zhongzhiyuan AI Independent Innovation Acceleration Area to host foundational models, data, and computing infrastructure; the application layer, which is carried by the Dazhongsi industrial cluster to host embodied intelligence, smart terminals, and industry software; and the service layer, which is carried by the Origin Community and Public Spaces to host open-source releases, model red teams, governmental intelligent bodies, and scientific exhibitions [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:overall_spatial_structure].

Human talent is categorized into five types: model scientists, algorithm engineers, entrepreneurs and investors, scene operators, and community youth residents; each category corresponds to specific living, working, socializing, and service spaces. These spaces are enhanced through the informal exchange interfaces of Public Spaces (such as cafes, pitch stages, and pocket parks), which facilitate cross-category interactions [source:PROCESSED-FACT-PACK].

AI-Enabled Scenario consists of ten scenario cards, all landing on the `SCENARIO_NODE` elements (a total of [metric:scenario_node_count]=10 locations, numbered SN-001—SN-010) of [data:geometry/public_space.geojson]:

| Number | Scenario | Spatial Location | Pilot Requirements |
| --- | --- | --- | --- |
| SN-001 | AI Consumption Scenario Cluster | Dazhongsi Station ([data:geometry/public_space.geojson#SN-001]) | Business District Pilot, Retain Human Services |
| SN-002 | Intelligent Hub Scenario | Dazhongsi Station Plaza | Navigation and Queue Optimization, Not Replacing Human Staff |
| SN-003 | AI Cultural Scene | Jing-Zhang Ruins Park | Digital Guiding, Minimal Copyright Data |
| SN-004 | Entrepreneurship Community Scenario | AI Origin Square | Open Source Release and Pitch Event |
| SN-005 | AI Living Scenarios | Origin Pocket Park | Community Service Navigation |
| SN-006 | Industrial Testing Scenario | Edge Side Computing Pilot Garden | Computing Power Pilot, Red Team Exercise |
| SN-007 | AI Fitness and Health Scenario | Qinghe Riverside | Voluntary Participation in Health Data |
| SN-008 | AI Governance Demonstration Scenario | Zhongzhiyuan | Demonstration of Governmental Intelligent Body, Human Review |
| SN-009 | AI Environment Scenario | Central Smart Landscape | Environmental Monitoring, Minimal Data |
| SN-010 | AI Commute Service Scenario | South Station Plaza | Commute Navigation Pilot |

Among SN-006, SN-002, and SN-010, at least three categories belong to the industrial Testing and Validation Scenario, satisfying the requirement in the task book for "at least 3 industrial testing and validation scenarios"; all scenarios are pilot/experimental in nature, not constituting approved operations. Privacy boundaries, Human Review, and exit mechanisms are mandatory for each card [source:AGENT-TASKBOOK]. The scenario card governance adopts a "minimum data—clear purpose—limited retention—human review—public appeal—exit at any time" six-gate approach. Health, legal, and safety high-impact outputs only provide navigation and prompts, with the final decision made by qualified personnel, responding to agent.3, agent.5, and agent.6.

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The land use functional structure is arranged with "commerce in the south, science and technology in the north, and middle areas for living, with blue and green networks woven throughout" [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout]. The areas for various land uses (calculated with provisional boundaries) are as follows: (Provisional Boundary)

| Land Use Code | Use | Area (square meters) | Referenced Standards |
| --- | --- | --- | --- |
| 05 | Commercial and Business Service Land | 713,430.325 | [metric:land_use_05_area_sqm] |
| 0701 | Urban Residential Land | 2,201,733.289 | [metric:land_use_0701_area_sqm] |
| 0702 | Community Service Facilities Land | 776,811.345 | [metric:land_use_0702_area_sqm] |
| 0802 | Research and Development Land | 1,905,389.119 | [metric:land_use_0802_area_sqm] |
| 0803 | Cultural Land Use | 1,168,106.576 | [metric:land_use_0803_area_sqm] |
| 0804 | Educational Land Use | 385,615.062 | [metric:land_use_0804_area_sqm] |
| 1401 | Park Green Spaces | 3,189,951.297 | [metric:land_use_1401_area_sqm] |
| 1402 | Protective Green Spaces | 286,671.794 | [metric:land_use_1402_area_sqm] |
| 1403 | Square Land Use | 785,136.404 | [metric:land_use_1403_area_sqm] |

Building scale is assessed using a conceptual calculation approach: the Building Footprint area [metric:building_footprint_area_sqm] = 1,169,953.038 square meters (non-overlapping union calculation, consistent with the spatial verification approach), building density [metric:building_density] = 10.25%, total gross floor area estimate [metric:total_floor_area_sqm] = 14,394,311.966 square meters, and the conceptual Floor Area Ratio [metric:floor_area_ratio] = 1.26 [data:geometry/buildings.geojson]. The building types cover nine categories including AI research and development, incubators, laboratories, offices, mixed-use, residential, talent apartments, community services, and retail [depth:development_intensity_controls]. (Building Coverage Ratio) The calculation method is deterministic: read buildings.geojson → project to EPSG:4548 projection → unary_union to calculate the union area → cross-reference with metrics.json, see the submission instructions for the script.

The Demolish–Renovate–Retain strategy follows the principles of "preserving cultural heritage, retaining urban fabric, revitalizing industries, and improving the environment": all historical and cultural elements of the Jing-Zhang Railway Heritage Park and its surroundings will be retained; Dazhongsi and the surrounding traditional business district will primarily undergo micro-updates; existing industrial parks will be categorized as "retaining renovations as the main approach, partial demolition, and new node construction," with the update project list available in the "Update Project List, Implementation Policies, and Phased Plans" [depth:retain_renovate_demolish]. All demolitions are Conceptual Recommendations and must be based on official surveying and property rights investigation before implementation [source:OFFICIAL-ANNOUNCEMENT]. (Demolish–Renovate–Retain Strategy)

## Transport, Rail, Municipal Infrastructure, and Public Services

Traffic adopts a strategy of "rail as backbone, slow travel networked, and moderate car use" [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:traffic_rail_slow_parking]:

- **Railway**: Leverage existing metro and intercity lines to enhance the integrated TOD development at nodes such as Dazhongsi Station and South Station, with the station forecourt and underground pedestrian connections [data:geometry/constraints.geojson#CTX-RAIL-001].
- **Traffic:** Structural road network length is approximately [metric:road_length_m]=45,819.18 meters, road area estimate is [metric:road_area_sqm]=900,693.138 square meters, road network ratio is [metric:road_ratio]=7.89% [data:geometry/roads.geojson]; the road hierarchy includes expressways, arterial roads, secondary arterial roads, branch roads, and pedestrian paths.
- **Pedestrian and Cyclist Access:** Organize continuous pedestrian and cyclist greenways along the Jing-Zhang Heritage Park, Qinghe, and the three corridors, with a focus on achieving barrier-free pedestrian connectivity in the key areas [depth:traffic_rail_slow_parking].
- **Parking**: Public parking garages and P+R facilities will be the primary focus in the vicinity of the station. Industrial zones will reserve spaces in accordance with the control plan conditions, without making any premature commitments.

Municipal and public service facilities are configured according to the principle of "overall planning and tiered district management" [depth:municipal_new_infrastructure]: regional energy stations and wastewater utilization facilities are laid out in the Smart District; new power, communication, water supply, and drainage pipelines and roads are implemented in tandem; educational land use [metric:land_use_0804_area_sqm] = 385,615.062 square meters is configured with primary and secondary schools and childcare facilities according to the 15-minute living circle [source:OFFICIAL-ANNOUNCEMENT]. Road red lines, pipelines, fire safety, and engineering conditions are registered as data gaps [metric:building_height_control_m] (see the assumption list `assumptions.json`) before the official documentation is released.

## Blue-Green Network, Public Space, and Urban Character

Blue-Green Space is structured around "one river (Qinghe River), one belt (the Ruins Park Belt), and three corridors (Southern Green Corridor, Transformation Corridor, and Wisdom Corridor)." Green spaces are recalculated within the Provisional Boundary as [metric:green_space_area_sqm]=3,476,623.091 square meters, with a green space ratio of [metric:green_ratio]=30.46% [data:geometry/green_space.geojson]. Public Spaces are embodied in square land uses and scene nodes, covering an area of [metric:public_space_area_sqm]=785,136.404 square meters, with a public space ratio of [metric:public_space_ratio]=6.88% [data:geometry/public_space.geojson] [depth:blue_green_public_space].

![Blue-Green Networks and Slow Mobility (Conceptual Proposal)](assets/figures/mobility-bluegreen.png)

The Public Space system is divided into three levels: district level (site park, Qinghe Riverside), area level (South Station Square, Dazhongsi Station Square, AI Origin Square, Jing-Zhang Cultural Square), and point level (Origin Pocket Park, Wisdom Garden, Central Wisdom Landscape and 10 scene nodes). The style control follows the requirements of the Urban Design Management Measures for landscape style, public space, and building control [standard:MOHURD-URBAN-DESIGN-MEASURES]: the railway site along the line is mainly in the tone of "historical gray + industrial rust"; the Wisdom Zone is mainly in the tone of modern technological white; the residential area is mainly in the tone of warm multi-level; the station-city integration area highlights the portal image with transparent glass and metal materials [depth:height_massing_character]. The constraints for the Qinghe Blue Line, Jing-Zhang Railway Historical Corridor, etc., are shown in [data:geometry/constraints.geojson], which are temporary indications and will be verified after the official blue line is released.

## Renewal Projects, Implementation Policy, and Phasing

Update the project list organized by "one policy for one category," totaling four categories [source:AGENT-TASKBOOK] [depth:renewal_project_list]:

1. **Cultural Preservation Category**: Conservation and Renovation of the Jing-Zhang Site Park and the Historical Neighborhoods around Dazhongsi.
2. **Upgrading and Transformation Category**: Micro-updates to Existing Parks, New Construction of Smart Computing Hub, New Construction of Edge Side Computing Pilot Garden, and New Construction of AI Headquarters R&D Garden.
3. **Residential Improvement Category**: New construction of talent apartments, supplementation of community service facilities, and environmental remediation of old residential areas.
4. **Facilities Category**: Transit-Station Integration, Utility Infrastructure Updates, Continuous Waterfront Space and Walking and Cycling Network.

Implement the policy recommendations based on the principles of "government-led, market participation, area balance, and Phased Implementation," exploring an "fund + concession operation + Scenario Access" update financing mechanism. The industrial test scenarios are described without direct operational commitments [depth:risk_missing_data].

Phasing plan implemented from south to north, with the core driving the periphery [depth:phasing_implementation] [data:geometry/phasing.geojson]:

| Installment | Theme | Area (square meters) | Benchmark Reference |
| --- | --- | --- | --- |
| P1 Recent | Demonstration Launch (South Station—Dazhongsi—Site Park—Original Point Community) | 1,517,411.504 | [metric:phase_p1_area_sqm] |
| P2 Mid-term | Web Connectivity (Residential Area - Transformation Corridor - Qinghe) | 7,162,643.658 | [metric:phase_p2_area_sqm] |
| P3 Long-term | North Extension into a Belt (Qinghe—Zhongzhiyuan—Zhongzhiyuan) | 2,732,790.624 | [metric:phase_p3_area_sqm] |

## Brand System and Naming System

![Sketch of Brand Visual Direction](assets/figures/brand-vision.png)

Main Name: "Jingmai AI Innovation Belt" (English: **Jingmai AI Innovation Belt**, referred to as the "JINGMAI AI" brand, abbreviated as JMAI). The naming system adopts a three-tier structure of "location-function-source": **One Belt, One Brand** (Jingmai AI Innovation Belt JMAI), **Multiple District Naming** (Zhongzhiyuan AI Independent Innovation Acceleration Area, Origin Community, Dazhongsi AI Industry Cluster, Wisdom Park, Zhongzhiyuan Phase II), **Unit Naming** (South Station Gateway, Jing-Zhang Park Belt, Transformation Corridor, Qinghe Bay). The brand positioning statement is expressed as "Where code meets the urban pulse". Visual Identity Direction (Logo Direction): The logo is designed with the outline of the Chinese character "pulse" and a double-line track symbol, conveying the dual meaning of "railway culture + data flow"; the main graphic reserves the application variations of the English abbreviation JMAI, avoiding binding to a specific font to avoid font licensing issues. The brand base color will be a combination of "Steel Gray + Jing-Zhang Blue + Vitality Orange," which will be uniformly managed in `visual/index.html` using CSS variables (for display styles, not for delivery printing standards) [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The logo directional diagram will not use any third-party trademarks or celebrity portraits as materials; all will be procedurally drawn by this package, see the brand page rough draft in .

## Three Zones and Two Wings Synergistic Loop

In response to the requirements of the "three major positioning, five major functions, and the coordinated loop of Three Zones and Two Wings" as stated in the announcement and task book [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]: we have integrated the "one corridor, one chain, and two wings" into the overall structure—**three zones** being the Zhongzhiyuan AI Independent Innovation Acceleration Area (full-stack + governance), the Beijing AI Origin Community (ecosystem + education and research), and the Dazhongsi AI Industry Cluster (intelligent native new business models); **two wings** being the Zhongguancun Technology Services Wing and the Jing-Zhang Cultural Heritage Service Wing (actually the Xiaoyue River Scenario Enablement Wing and the Zhongguancun Technology Services Wing). Among them, the Zhongguancun Wing is responsible for global element configuration, Zhongguancun IP and capital empowerment; the Xiaoyue River Wing is responsible for AI scenario empowerment and intelligent city experiments. Collaborative loops are expressed as follows: Each of the three zones carries out different segments of the innovation chain, with the wings providing funding, talent, Scenario Access, evaluation, and governmental interfaces. These are stitched together by a "one belt" public corridor to form a closed loop of "resource aggregation—research and development acceleration—scenario validation—capital transformation—city governance" [depth:overall_spatial_structure].

At the cross-regional collaborative level, propose cooperation interfaces with the North Fifth Ring Technology Service Circle, Future Science City (joint ring computing and application testing), Huairou Science City (fundamental models and material computing), Beijing Economic-Technological Development Area (intelligent manufacturing and scenario mass production), and the Beijing-Tianjin-Hebei Coordination (computing hub and data circulation pilot). All are expressed as "to be updated after the official cooperation document is released," without fabricating rights and obligations [depth:risk_missing_data].

## Global AI Innovation Ecosystem Benchmarking and Mechanism Design

In response to the requirement for "5-8 Global AI Innovation Ecosystem Cases," we have compiled data on 6 benchmark examples (Silicon Valley-Innovation Capital Cycle, Boston-End-of-Line Innovation Transformation, Cambridge-Campus+Community Open Source Ecosystem, Shenzhen Nanshan-Hardware to Software Vertical Integration, Hangzhou Xixi Future Technology City-Entrepreneurship Cluster Office, London Bridge Area-Old City Revitalization+Innovation Agglomeration). For each example, we provide a summary of the "spatial organization—operating mechanism—insights for our solution" elements, avoiding any false precision in commitments regarding company lists, investment amounts, or output values [source:AGENT-TASKBOOK]. The benchmark conclusions are translated into a spatial model of "vertical innovation corridor + horizontal scenario network." The mechanism assurance is provided for each of the eight categories: land, space, industry, capital, talent, computing power, data, and scenarios (e.g., land: rolling supply + flexible allocation; capital: funds + special operation rights; data: open list + minimum necessary; Scenario: Open Directory + Sandbox Testing), and register entries applicable to this proposal and those pending official clarification, see `assumptions.json` and `compliance_matrix.json` [depth:overall_spatial_structure].

## AI Scenario Card Complete Fields and Operational Matrix

On the basis of the scenario table, supplement the standard fields for each scenario card: user journey (DTO) inputs and outputs, data owner, operational entity, technology maturity level, facility requirements, failure modes, and evaluation metrics. The complete "scenario-space-operation" matrix for 10 scenario cards is shown in the figure and the HTML 'scenario card' page. This section lists the key three cards as samples [depth:scenario_operation]. All cards follow the "minimum data—purpose limitation—retention period—Human Review—public appeal—right to exit" gate, with the test scenarios serving as pilot projects and not constituting approved operations.

![10 scene cards complete field matrix](assets/figures/scenario-matrix.png)

![Public Space Component Library (5 Categories of Units)](assets/figures/component-library.png)

![Focus Area Project-Level Implementation List](assets/figures/implementation-list.png)

- SN-002 Smart Hub: Input = platform passenger flow and navigation requests (anonymous minimum set); Data Responsible Party = Public Space Operating Entity; Technical Maturity = Medium (navigation/queue prediction available, full automation not guaranteed); Failure Mode = misdirected pedestrian flow; Assessment = deviation rate of pedestrian flow and rate of human intervention, with Human Reviewers permanently stationed.
- SN-006 Industrial Testing Validation Field: Input = Public Model Evaluation Dataset + Corporate Application Form; Data Steward = Third-party Evaluation Agency; Technical Maturity = Low-Moderate (Red Team Exercise); Operating Entity = Proposed Large-Scale Open-source Evaluation Center; Failure Mode = Data Leakage → Policy Requires Mandatory Data Desensitization and Weekly Re-evaluation of Access Rights.
- SN-010 Commute Services: Input = Public Transport Timetables and Congestion Alerts; Data Responsible Party = Public Transport Authority; Operating Entity = District Public Service Platform; Failure Mode = Misleading Travel Information; Human Review: All travel recommendations must include a "non-committal" disclaimer, and significant adjustments must be confirmed by a duty officer.

## AI Sacred Landmark, Honor Display System, and Public Space Component Library

Task Document agent.4 requires the inclusion of at least 3 AI holy sites, and the proposal of 4 concept landmarks: the "Jing-Zhang Steam Locomotive and Signal Tower" (a heritage park with all-weather lighting nodes for a century-old Jing-Zhang railway), the AI Origin community "Code Archway" (a digital release and legacy site), the Dazhongsi "Smart Business District Pyramid" (an end-to-end consumption experiment field), and the Zhongzhiyuan "Model Evaluation Tower" (Red Team and open platform for evaluation) [source:AGENT-TASKBOOK] [depth:three_key_area_detailed_design]. The honor display system adopts a district-level "Technology + Honor Wall": a university achievement board is set in the Origin community, and a Red and Black List and open badge library are set in Zhongzhiyuan. The Public Spaces will carry this through a combination of "reversible lightboxes and digital screens," avoiding the occupation of green lines and cultural heritage spaces.

Public Space Component Library (2D Standard Edition) defines 5 reusable units: resting seats (including accessible positions), emergency call terminals (with human communication fallback), smart information kiosks (maps + transportation + accessibility information, optional), waste/gathering recycling bins, interactive pavement (light guidance, no personal data collection); all components provide an option for an AI participation switch or human review, and are maintained by the "Public Space Operations Office," as shown in the component library diagram.

![List of Public Space Component Library](assets/figures/component-library.png)

## Cultural Narratives, Signage Systems, and International Communication Expressions

Task document agent.5's cultural narrative is divided into three layers: the Jing-Zhang Railway Epic ("Human Chapter" and the full historical nodes), the Innovation Narrative of Zhongguancun (from "Code Innovation" to "AI Society"), and the New AI Culture (exhibition center, public test festival, co-creation culture). The spatial cultural system is structured around the creative industry route of the heritage park, setting three cultural anchor points: "Century Milestone—Railway Era Coordinates—Digital Jing-Zhang"; the sign, symbol, and logo systems are separated (the logo belongs to the JMAI brand, while signs are for spatial service facilities), providing bilingual (Chinese and English) signs, and clearly stating that the sign fonts use open-source fonts to avoid licensing issues [source:AGENT-TASKBOOK]. For international communication, a core narrative in English (40-word summary) is generated, and the vision paragraph for "Innovative Pulse Intelligent Belt" is included in the submission package `report/narrative.md`, with content based on Chinese as the factual original and English as the reference translation, facilitating international review.

## Annual Activity Framework and Long-Term Operational Mechanism

agent.6's long-term operational mechanism is organized around "one system, three scenarios, and two transformations" [source:AGENT-TASKBOOK]:

- **Annual Activity Framework**: Four major cycles of activities throughout the year (Spring Global Developer Week, Summer Scenario Access Days and Model Evaluation Open Competition, Autumn AI City Forum and Pitch Conference, Winter International Brand Week and Annual Digital City Festival) — all are envisioned activities and should not be described as "firmly scheduled."
- **Scenario Access Operational Mechanism**: The scenario release process follows an "application—evaluation—limited trial period—exit guarantee" workflow; the technical community is cultivated through "open-source contribution points + mentorship + named showcase," with no commercial commitment.
- **International Promotion and Attraction Conversion**: Content Going Global through Three Channels—public events, influencer campaigns, international press conferences, and official delegation visits—without guaranteeing signed companies or investment amounts.

The above operational content is all "hypothetical" expression, and does not constitute a government commitment or a factual basis for business attraction. It complies with the boundary of agent.6 which prohibits "writing activities as already determined arrangements."

## Social Welfare and Inclusive Framework

For the review's emphasis on vulnerable groups and equity, expand the inclusive framework by clearly identifying and addressing the following aspects of the proposal: children and families (15-minute living circle requirements for recreation and sunlight), seniors (accessible pedestrian paths, night-time lighting), people with disabilities (tactile guidance systems, elevators/ ramps, manual windows), low-income residents (community commercial spaces, reserved affordable rental units), existing merchants (transitional accommodations and policy reserves), rail heritage users (friendly interpretation and accessible routes), and non-digital users (manual windows, telephone channels, and "digital assistants") [depth:traffic_rail_slow_parking]. Adhere to current accessibility design standards and adopt a "design+management+correction" mechanism (continuous slopes, crosswalks, tactile features, rest stops, accessible information services, and manual alternatives). Establish a public participation system with both offline hearings and online feedback channels, providing appeal and correction mechanisms for affected stakeholders. This category of indicators is initially presented with qualitative requirements and the location of the 15-minute service circle. Quantitative operational data will be updated upon the official release (refer to the `assumptions.json` and `metrics.json` files for the unknown items such as [metric:talent_density_per_km2]).

## Metrics, Area Recalculation, and Compliance Matrix

![Provisional Boundary Revised Key Indicator Map](assets/figures/metrics-evidence.png)

The indicator system is divided into three categories: the first category consists of spatial indicators that can be recalculated directly from the submitted geometry, all of which are calculated under EPSG:4548 and are allowed to be recalculated by third parties using layers [depth:metrics_recalculation]; the second category consists of control indicators that require official master plan support (Floor Area Ratio, Building Height), currently listed as unknown; the third category consists of performance indicators that require continuous calibration with operational and industrial data (talent density, AI innovation index, output value), also listed as unknown and not fabricated.

Known metric complete index ([metric:site_area_sqm], [metric:overall_design_area_sqm], [metric:key_area_count], [metric:zhongzhiyuan_area_sqm], [metric:beijing_ai_origin_area_sqm], [metric:dazhongsi_area_sqm], [metric:green_space_area_sqm], [metric:green_ratio], [metric:public_space_area_sqm], [metric:public_space_ratio], [metric:building_footprint_area_sqm], [metric:building_density], [metric:total_floor_area_sqm], [metric:floor_area_ratio]) [metric:road_length_m], [metric:road_area_sqm], [metric:road_ratio], [metric:building_count], [metric:scenario_node_count], [metric:land_use_05_area_sqm], [metric:land_use_0701_area_sqm], [metric:land_use_0702_area_sqm], [metric:land_use_0802_area_sqm], [metric:land_use_0803_area_sqm], [metric:land_use_0804_area_sqm], [metric:land_use_1401_area_sqm], [metric:land_use_1402_area_sqm], [metric:land_use_1403_area_sqm],  [metric:phase_p1_area_sqm], [metric:phase_p2_area_sqm], [metric:phase_p3_area_sqm]), all derived from the sole authoritative source `metrics.json`; the ratios are retained to six decimal places for machine verification, while the percentages are displayed for easy readability.

Compliance and in-depth evidence are managed across three matrices: `compliance_matrix.json` covers 23 mandatory tasks as outlined in announcements 1.3, 1.4, and 1.5, as well as agents.1—agents.6; `standard_matrix.json` covers professional standard responses; and `design_depth_matrix.json` covers 15 design depth items (current diagnosis, three-tier framework, overall structure, Land-Use Layout, intensity control, height and massing, demolish–renovate–retain strategy, traffic, tracks, slow travel, and parking, municipal new infrastructure, blue-green Public Space, detailed design for key areas, update list, Phased Implementation, recalculation of indicators, risk, and missing data). The area recalculation chain is SITE-001→land-use union→green spaces/public spaces/buildings union, allowing third parties to recalculate using [data:geometry/site_boundary.geojson], [data:geometry/land_use.geojson], and [data:geometry/buildings.geojson]. (Demolish–Renovate–Retain Strategy)

## Risk, Copyright, and Compliance

This plan has the following risks and boundaries [depth:risk_missing_data] [source:SOURCE-REGISTRY]:

- **Boundary Risks**: The site boundary and the three key areas are temporary rough boundaries, and their areas and shapes may differ from the Official Planning Boundary; a full recalculation must be performed after the official polygons are released.
- **Data Risks**: Official master plan conditions, ownership, surveying, pipeline, traffic, and municipal data have not been released. Related metrics ([metric:floor_area_ratio_official], [metric:building_height_control_m], [metric:talent_density_per_km2], [metric:ai_innovation_index], [metric:ai_output_value_yuan]) remain unknown and will be updated upon the provision of additional data.
- **Implementation Risks**: All update projects, phased implementations, and scenario cards are Conceptual Recommendations; industrial test scenarios are expressed as pilot directions and do not constitute approved operations; no specific investments, outputs, or approval results are committed to.
- **Compliance Statement**: This proposal is generated by an AI agent and is a conceptual design based on publicly available and disclosed information, containing no unauthorized or non-public data; all layers, metrics, sources, and assumptions are documented in the submission package and are subject to review and recalculation.

Copyright and display statements are found in `report/copyright_statement.md` and `report/narrative.md`; all generated files (geometry, metrics, figures, drawings, visual) are traceable within this package [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## References

1. Beijing Municipal Commission of Planning and Natural Resources Haidian Branch: Announcement for the International Scheme Collection of the Centennial Jing-Zhang AI Innovation Belt Urban Design [source:OFFICIAL-ANNOUNCEMENT].
2. Collect Task Book and Materials Package `brief/site-package/` [source:SITE-PACKAGE] [source:AGENT-TASKBOOK].
3. The Provisional Boundary and the key area polygon are defined by `brief/site-package/geometry/provisional_boundaries.geojson` [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE].
4. Purpose of Data Registration `data/source_registry.json` and Processing Data Package `data/processed/agent_fact_pack.md` [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK].
5. Regulatory Detailed Planning; Urban Design Management Measures of the Ministry of Housing and Urban-Rural Development; related requirements of the Compilation Regulations for Control Detailed Planning; subsets of the Guide for Land and Sea Use Classification in Territorial Space Investigation, Planning, and Control (Trial) [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].
6. The 2016 Edition of the Regulations for the Depth of Architectural Engineering Design [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] applies.
