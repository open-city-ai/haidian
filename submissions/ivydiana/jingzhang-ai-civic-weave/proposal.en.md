---
title: "JINGZHANG CIVIC WEAVE:  station—garden—school—river on the public engagement network (Jing-Zhang)"
author_github: "ivydiana"
language: "en"
translation_of: "proposal.md"
proposal_format_version: "2"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "On a true GIS scenario as the base map, organize reversible AI public service prototypes along Dazhongsi, Zhi Chun Road, Li Dao Kou, Xiao Yuehe, and Qinghe."
tracks: ["civic-agent-governance", "ai-traffic-walkability", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v2.0"
---

# JINGZHANG CIVIC WEAVE:  station—garden—school—river on the public engagement network (Jing-Zhang)

> First, observe where people walk every day, then decide where to place the technology.

This is not about drawing a future city on a blank sheet of paper. The proposal integrates Dazhongsi station, Zhi Chun Lu, Xi Tucheng, Qian Hu Dong Lu Xi Kou, Liudao Kou, three universities, Jing-Zhang Railway Heritage Park, Xiao Yue He Park, Qinghe and Guangji Bridge, into a single realistic base map. The proposal then arranges public services, verifies activities, and updates the sequence along real roads, tracks, and pedestrian relationships.

The site calibration version 2.6 writes verifiable OSM elements directly into the submitted geometry: buildings are to use the existing mapped outlines, with pedestrian and cross-street suggestions organized along the current road relationships; parks, water features, station names, and campus names serve as the basis for locating the twelve public prototypes; road rights-of-way that cannot be supported by public data, as well as the Demolish–Renovate–Retain Strategy and Development Intensity, are to remain blank.

![Overall structure based on a real GIS scenario](assets/figures/site-overview.png)

## Design Basis and Source List

The formal scope of work and three key areas are derived from the call for entries. Currently, there are no publicly verifiable official precise redlines; therefore, the overall scope and key areas still use the temporary constraints provided by the repository. The orange and yellow boundaries on the map only control the current conceptual proposals and do not represent approval redlines, property boundaries, or road boundaries. [source:OFFICIAL-ANNOUNCEMENT] [data:geometry/site_boundary.geojson#SITE-001]

The base map reflects the real-world scenario and is derived from OpenStreetMap open data, extracted via the Overpass API on August 8, 2026, including roads, tracks, waterways, building outlines, campuses, parks, stations, and some public facilities. Each element retains its OSM ID, source link, and ODbL attribution. The open map may have missing data, offsets, or be out of date, and is only intended for the identification of current conditions, reading the urban fabric, and as a design reference point. It should not be used as a substitute for surveying, control planning, ownership, or engineering investigation. [source:OSM-OVERPASS-20260808] [depth:existing_conditions_diagnosis]

Subsequent refinement must complete the Official Planning Boundary, control plan, road sections, building surveys, ownership, municipal services, flood protection, cultural heritage, and public service baseline data. Any conclusions involving permanent construction, demolition, bridge and tunnel construction, or station renovations must be re-evaluated after these documents and site inspections are in place.

## Three-Level Scope Framework

43.6 square kilometers of the Coordinated Research Area is used to understand the collaborative relationships among the Zhongguancun innovation resources, the academic cluster along University Avenue, the Jing-Zhang railway culture, transit stations, and surrounding residential areas; approximately 11.4 square kilometers of the Overall Design Area are used to organize pedestrian and bicycle paths, Public Spaces, land updates, and phased developments; three key areas are designated to implement specific scenarios for industry, education, community, and public governance. [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]

The overall structure has been revised from the original abstract axis to a "Station-Garden-School-River Public Engagement Chain":

1. **South Segment, Dazhongsi Station-City Interface**: Integrate rail transit connections, business services, community commuting, and the Jing-Zhang Railway Heritage Park.
2. **Midsection, Zhichun—Xitucheng—Liudaokou Campus-City Interface**: Connects three rail stations and the China University of Geosciences, China University of Mining and Technology, and Beijing University of Technology, forming a continuous interface for result translation, public learning, and service comparison.
3. **North Segment, Xiao Yuehe-Qinghe Ecological Interface**: Organize an environmental interpretation, resilience testing, and a century-scale engineering narrative around Xiao Yuehe Park, Qinghe, and Guangji Bridge.

A conceptual slow-moving chain links twelve real anchor points together; horizontal connections are discussed along existing roads such as Dazhongsi East Road, Zhi Chun Road, Qinghua East Road, University Road, Xitucheng Road, Qinghe Road, and the North Fifth Ring Road, focusing on crosswalks and connections rather than creating a separate urban network. [data:geometry/roads.geojson#ROAD-001] [depth:overall_spatial_structure]

## Coordinated Research Area: Industry and Future City Research

The industrial strategy is organized around "verify—translate—adopt." The northern segment focuses on model safety, urban resilience, and environmental validation. The middle segment leverages academic institutions to translate research findings into service descriptions that residents, businesses, and the public sector can understand. The southern segment publicly compares AI, human, and offline solutions before they enter the city, and clearly outlines responsibilities, appeals, and exit mechanisms.

Six international cases provide methodological references rather than space templates: Barcelona 22@ reminds that industrial renewal should respond to both the community and Public Space; STATION F showcases the combined operation of historical buildings and entrepreneurial services; Helsinki AI Register emphasizes the visibility and feedback of public AI; UK AI Security Institute emphasizes capability and risk testing; NIST AI RMF provides a lifecycle governance framework; Singapore AI Verify illustrates that technical testing and process checks need to be conducted concurrently. [source:CASE-22BARCELONA] [source:CASE-HELSINKI-AI-REGISTER] [source:CASE-NIST-AI-RMF]

Corresponding to the Jing-Zhang region, the industrial ecosystem requires five public capabilities: repeatable verification, understandable outcome descriptions, comparable service catalogs, accountable human responsibility, and accumulable failure records. The task of spatial design is not to promise a scale of investment attraction, but to provide places that are accessible, observable, and exitable for these capabilities.

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

![Overlay conceptual land uses of actual buildings, roads, campuses, and parks](assets/figures/land-use-structure.png)

Land-Use Plan first read.OSM Mapped campuses, parks, residential, commercial, and sports spaces, overlaid with the centerlines of existing major roads; the remaining spaces are completed into a topologically continuous conceptual zoning based on the functional relationships of the south, middle, and north segments. Land use codes follow national classification terminology, but colors only express the proposed recommendations for this round and do not represent the approved uses. [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]

The core of the overall design is not to add a new axis detached from the current context, but to patch the gaps in the existing network. The southern segment addresses the transfer from the rail to the street, accessibility, and the enterprise service interface around Dazhongsi station. The middle segment leverages the dense pedestrian flow between the three stations—Zhi Chun Lu, Xi Tucheng, and Liudao Kou—and the university gateways to organize walking, shared learning, and the translation of outcomes. The northern segment uses Xia Yuehe Park, Qinghe, and Guangji Bridge as the common foundation for ecological, resilient, and cultural narratives. Public Space is prioritized at existing entrances, road intersections, park edges, and open interfaces of the campus, avoiding the pre-setting of large buildings at locations without clear ownership. [data:geometry/roads.geojson#ROAD-001] [depth:overall_spatial_structure]

The control focus for this round is on public interfaces, pedestrian continuity, reversible facilities, and operational responsibilities, without proposing unsupported Floor Area Ratio, height, or building setbacks. The current road centerlines, building envelopes, and park boundaries come from public maps, suitable for identifying relationships but insufficient for engineering dimensions; formal zoning plans, road right-of-way lines, building surveys, and municipal documentation should be in place to reallocate land uses, verify facility capacities, and recalibrate all indicators. [depth:height_massing_character]

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The building outlines are all derived from OSM open mapping and clipped to the temporary scope, with no fictional buildings generated. Given that OSM is not a building survey and does not provide reliable information on floors, structure, age, or ownership, this plan adopts a default attitude of "retain first, verify on-site" for all buildings, without assigning individual demolition tags. [data:geometry/buildings.geojson#BLDG-0001] [depth:retain_renovate_demolish]

Update will proceed in three steps: first, using signage, seating, temporary exhibitions, and manual services to validate genuine needs; second, piloting at the ground floor of buildings with clear operational entities, fire safety conditions, and community support; and finally, discussing permanent renovations or additions with formal district plans, property rights, and structural assessments in place. The Floor Area Ratio, height, setback, and construction scale will remain pending until formal documentation is complete. [depth:development_intensity_controls]

## Detailed Design of Key Areas

![Three enlarged scenes of the key areas](assets/figures/key-areas.png)

### 5.1 Zhongzhiyuan: Xiao Yuehe—Qinghe Validation Area

The physical context includes the Liudao Kou station, Xiaoyuehe Park, Qinghe, Guangji Bridge, and surrounding university and research resources. It is recommended to make safety verification, resilience testing, and environmental interpretation into small-scale public courses that can be booked and observed, without first constructing a closed-off campus. Near the river and park facilities, use mobile components, with sensors defaulted to off. Any flood control, ecological, and cultural heritage requirements should be initially assessed by professional departments. [data:geometry/key_areas.geojson#PROV-KEY-001]

### 5.2 AI Origin: Zhi Spring—Xi Tucheng—Liu Dao Kou Transformation Area

The physical context includes Zhi Chun Lu Station, Xi Tu Cheng Station, Liu Dao Kou Station, and the China University of Geosciences, China University of Mining and Technology, and Beijing University of Technology. The design focus is on the continuity of pedestrian access between the campus gateways, station entrances, and community streets, and the placement of open-source outcome clinics, educational co-learning desks, and public service comparison tables in accessible ground-level spaces. University outcomes must be explained in plain language regarding their scope of applicability, failure scenarios, licenses, and revocation methods. [data:geometry/key_areas.geojson#PROV-KEY-002]

### 5.3 Dazhongsi: Station-City Integration District

The current base includes Dazhongsi Station, surrounding clusters of innovative enterprises, community commuting routes, and the southern segment of the Jing-Zhang Railway Heritage Park. The design addresses the barrier-free continuity from the station entrance to the street first, then uses a transparent comparison of temporary service stations to evaluate the time, cost, risks, and appeal processes for AI, human, and offline services. The spatial updates around the enterprises do not predefine brand collaborations or construction scale. [data:geometry/key_areas.geojson#PROV-KEY-003] [depth:three_key_area_detailed_design]

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

Six core user groups are: daily commuters and nearby residents, elderly and disabled users, university students and researchers, developers and startup teams, public service personnel, and park and campus operators. Each group requires the right to manual assistance, seamless access without an account, and resistance to uniform digital entry, rather than being forced to adapt to a single digital portal.

All twelve scenarios are tied to real locations or spatial relationships: [data:geometry/constraints.geojson#SCENARIO-01] [metric:scenario_node_count]

| Anchor Point | Public Prototype | Real-world Problem to be Addressed |
| --- | --- | --- |
| Dazhongsi Station | Barrier-Free Shuttle Review | Continuous Walk from Entrance to Block, Slope, Crosswalk, and Assistance |
| Dazhongsi Innovation Enterprise Cluster | Service Transparency Platform | Purpose of enterprise services, data usage, level of automation, and human responsibility |
| Jing-Zhang Railway Heritage Park | Model Explanation Gallery | Use plain language to showcase the scope, failed cases, and revocation methods |
| Zhongshan Road Station | Commuter Service Comparison Table | Are AI, Human, and Offline Commuter Services Truly Equally Accessible |
| Xitucheng Station | Manual Takeover Station | Who takes over, restores, and interprets in case of automation anomalies |
| East Mouth Station of Qinghua East Road | Educational Co-Learning Table | How Teachers, Students, and Parents Can Maintain Final Judgment |
| Sixdiaokou Station | Open Source Results Clinic | How Do University Results Get Understood, Reproduced, and Questioned by the Community |
| China University of Geosciences | Urban Safety Verification Course | Interdisciplinary Verification of Geologic, Subsurface Space, and Public Safety Issues |
| China University of Mining and Technology | Urban Resilience Testing Ground | Small-Scale Reversible Tests of Resilience in Energy, Materials, and Infrastructure |
| Beijing University of Technology | Material Circulation Experiment | Repairability, Recyclability, and Low-Impact Construction of Public Facilities |
| Xiao Yuehe Park | Environmental Evidence Window | Data Interpretation Cannot Replace Ecological, Flood Control, and Park Management Judgments |
| Guangji Bridge | Centennial Contribution Index | Simultaneously recording contributions, failures, revisions, and reversible public memories |

All scenarios shall comply with: no account available, Human Review equally accessible, data minimization, purpose transparency, human review, right to appeal, right to pause, and right to exit. Testing approval does not equate to absolute security and does not constitute administrative licensing.

## Transport, Rail, Municipal Infrastructure, and Public Services

![Slow travel suggestions organized along real roads, tracks, and waterways](assets/figures/mobility-bluegreen.png)

Traffic design prioritizes addressing four categories of real discontinuities: barrier-free transfers at rail station entrances; crossing conflicts at major intersections such as Zhichun Road, Qinghua Donglu, Xueyuan Road, Xitucheng Road, and the North Fifth Ring Road; continuity of greenway connections between the Jing-Zhang Railway Heritage Park, Xiaoyuehe Park, and Qinghe; and the organization of peak hour pedestrian flows and shared bicycles at university gateways. [source:OSM-OVERPASS-20260808] [depth:traffic_rail_slow_parking]

The blue line in the diagram represents a conceptual pedestrian link composed of real anchor points, while the orange line identifies crossing and connection improvement targets along the centerlines of OSM current roads. They do not represent the road redlines, bridge or tunnel locations, or construction alignment. Further steps should include a segment-by-segment field survey for pedestrian travel distances, conflict points, grades, shading, lighting, parking, and accessibility.

### Municipal and New Infrastructure

New Infrastructure does not equate to a proliferation of cameras. It is recommended to set up only four types of controllable interfaces: on-site end-side devices that can be turned off, data authorization terminals with public purposes and specified retention periods, service desks that can be taken over at any time, and tools for service recovery and exit. Any recording, location tracking, or environmental sensing must justify its necessity and prioritize methods that do not identify individuals. [depth:municipal_new_infrastructure]

There are no current supply and drainage, power supply, communication, fire safety, computational load, and flood capacity data; therefore, no capacity numbers are proposed. Temporary activities will prioritize the use of existing facilities and include a site clearance plan; permanent facilities must undergo evaluations by municipal authorities, fire safety, energy, cybersecurity, and operations and maintenance.

## Blue-Green Network, Public Space, and Urban Character

The blue-green system starts with the Jing-Zhang Railway Heritage Park, Xiao Yuehe Park, Qinghe, and Guangji Bridge, as mapped in OSM, and uses narrow, reversible green corridors to connect the stations and campuses. The current park boundaries are only recorded in public maps and still require verification with official blue and green lines, flood protection, and cultural heritage data. [data:geometry/green_space.geojson#GREEN-001] [depth:blue_green_public_space]

Public Space prototypes include movable seating, shading, paper instructions, human consultation, and closable display devices. Nighttime lighting prioritizes safety and resident tranquility, avoiding the creation of a "smart" appearance through continuous tracking. Urban Character continues the restrained structure of the railway project, the open learning atmosphere of University Road, and the readable interface of Zhongguancun, without replicating corporate trademarks.

Three types of cultural landmarks are: the model explanation corridor of the Jing-Zhang Railway Heritage Park, the service transparency desk at the station-city interface, and the century contribution index near Guangji Bridge. They do not occupy the heritage itself, do not rank individual credits, and allow for corrections, retractions, and supplements to failed records. [data:geometry/public_space.geojson#PUBLIC-003]

## Renewal Projects, Implementation Policy, and Phasing

Phasing based on real objects and field work organization, rather than abstract blocks: [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation]

| Stage | Real Object | Work Content | Release Criteria |
| --- | --- | --- | --- |
| Phase One | Dazhongsi Station and Surrounding Blocks | Barrier-Free Inspection, Service Transparency Booth, Temporary Public Seating | On-Site Verification, Operating Entity, Traffic Safety, Fire Safety, and Community Feedback |
| Second Stage | Zhi Chun Road—Xi Tucheng—Liu Dao Kou University Cluster | Open Source Results Clinic, Educational Co-Learning, Crosswalk Improvements | Campus Collaboration, Road Right-of-Way, Traffic Management, Ownership and Resident Feedback |
| Third Stage | Xia Yuehe Park—Qinghe—Guangji Bridge | Environmental Evidence Window, Resilience Test, and Contribution Index | Flood control, ecology, cultural heritage preservation, park management, and Official Boundary |

Annual operational recommendations include a spring call for urban issues, a summer public validation week, an autumn university open source festival, and a winter city service review meeting. For each event, responsibility, data rules, accessibility arrangements, alternative human arrangements, and exit conditions must be announced; pilot projects without long-term maintainers do not advance to the next phase. [depth:renewal_project_list]

## Metrics, Area Recalculation, and Compliance Matrix

![Real data, design recommendations, and pending official information](assets/figures/metrics-evidence.png)

Metrics are divided into three groups: a snapshot of real public data, metrics from the conceptual design based on this round's geometric recalculation, and metrics that must wait for official data. OSM building area only describes the mapped outlines of buildings in the publicly available maps that fall within the temporary scope, and does not equal the complete current building area; the conceptual slow-moving length only describes the length of this round's route; the temporary scope area cannot be upgraded to an Official Planning Boundary area. [metric:building_footprint_area_sqm] [metric:road_network_length_m] [depth:metrics_recalculation]

Floor Area Ratio, Building Height, formal road area, parking supply and demand, municipal capacity, and engineering costs are to be kept pending the formal data. The fine lines in the drawings do not alter these uncertainties.

## Brand, Cultural Narrative, and Long-Term Community

"Jing-Zhang Yi Zhi" refers to "yi" as public discussion and the ultimate human judgment, and "zhi" as weaving together railway heritage, campus knowledge, industrial services, community life, and Blue-Green Space into a walkable network. The identifiers use three offset vertical stripes: orange for questioning, cyan for collaboration, and blue for evidence; the graphic is composed of basic geometry and does not copy any corporate logo.

Cultural narrative begins with the autonomous engineering practice of the Jing-Zhang Railway, progresses through open learning on Academic Road and Zhongguancun, and extends to AI-era public technology that is understandable, comparable, appealable, and exitable. Long-term communities are not judged by traffic rankings but by contributions measured through reproducible problems, public failures, version maintenance, and interdisciplinary collaboration. [source:OFFICIAL-ANNOUNCEMENT]

Suggest hosting an annual "Jing-Zhang Urban Technology Public Week": one day of on-site walkthroughs, one day of university open courses, one day of industry validation, one day of resident evaluations, and one day of international case dialogues. All displays should clearly distinguish between "proposed, reviewed, piloted, and implemented," and not package conceptual proposals as realized outcomes.

## Risk, Copyright, and Compliance

The greatest risk is not that the drawings are not precise enough, but that incomplete public data is mistakenly taken as official facts. Temporary boundaries, OSM buildings, road centerlines, and park outlines must be clearly labeled with their respective levels in the legend and sources; once the official planning boundaries are in place, all zoning, areas, drawings, and implementation lists need to be recalibrated. [depth:risk_missing_data] (Provisional Boundary) (Official Planning Boundary)

The second category of risk involves skipping the site visit. The next step should be to invite residents, commuters, users with disabilities, college students and faculty, public service personnel, and park operators to complete a segment-by-segment walkthrough to verify issues at entrances, intersections, campus gateways, park waterways, and nighttime usage problems. Only nodes that have been verified through both on-site and professional review will enter the lightweight pilot phase.

OSM data is used under the ODbL and attribution is retained; graphics do not load commercial map tiles, do not use news images, person likenesses, or corporate trademarks. The proposal is an Urban Design concept proposal and does not replace formal planning, nor does it constitute government approval, investment commitment, or construction implementation.

## References

The factual basis of this plan is managed in three layers. The first layer is the call for proposals, which is used to confirm the project name, the three layers of scope, the three key areas, the tasks, and the depth of the deliverables; the announcement text and approximate area cannot replace precise GIS boundaries. [source:OFFICIAL-ANNOUNCEMENT]

The second layer is the extraction from the OpenStreetMap reality scene, used to identify relationships between roads, tracks, waterways, building outlines, campuses, parks, sites, and public facilities. The extraction files retain OSM ID, links, acquisition date, and ODbL license, supporting only site reading, naming verification, and design anchoring; any master planning, ownership, right-of-way, building surveying, or engineering judgments still require official documentation. [source:OSM-OVERPASS-20260808]

The third layer consists of the land use, pedestrian areas, green spaces, Public Spaces, scenarios, and phased plans generated in this round of design. These can recalculate the areas, lengths, and quantities within the proposal, but do not elevate the provisional boundaries to official facts. The precise locations, areas, and statutory controls of the three key areas and overall scope still require official GIS calibration. [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:risk_missing_data] (Provisional Boundary)

The case studies include Barcelona 22@, STATION F, Helsinki AI Register, UK AI Security Institute, NIST AI RMF, and Singapore AI Verify; they only provide updates, transparency, verification, and governance methods, without constituting policy, institutional, or investment commitments for the Beijing project. Complete bibliographies, access dates, licenses, permitted uses, prohibited uses, metric formulas, missing data, and professional reviews are preserved in structured source lists, metric tables, assumption tables, and professional matrices.
