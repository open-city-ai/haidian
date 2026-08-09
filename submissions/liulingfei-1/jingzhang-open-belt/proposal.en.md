---
title: "Jingzhang Open Belt, Bringing a Nine-Kilometre Park into Everyday Life"
author_github: "liulingfei-1"
language: "en"
license: "CC-BY-4.0"
summary: "First make the Jing-Zhang Railway Heritage Park easy to walk. Then add three courtyards for testing, public service, and exchange."
tracks: ["ai-public-services", "youth-friendly-public-space", "civic-agent-governance"]
scenarios: ["ai-cultural-guide", "ai-health-service-navigation", "ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v2.1"
version: "2.1.0"
translation_of: "proposal.md"
---

# Jingzhang Open Belt, Bringing a Nine-Kilometre Park into Everyday Life

I began by putting Phase I of Jingzhang Park, the Phase II plan, the project south of Qinghua East Road, the Xiaoyue River works, and the heritage controls for Qinghuayuan Station on one map. Parts of the park are already open. Several east-west links have been approved, and the waterfront has its own programme of work. The task here is to join these live projects carefully.

The proposal starts with the walk. The nine-kilometre public spine should be continuous, with shade, toilets, and places to sit along the route. Each of the three focus areas takes on a distinct job. Zhongzhiyuan provides a bounded testing yard. AI Origin puts public services and shared learning on the street. Dazhongsi brings together the station, the park, and evening activity.

I call this spatial structure One Line, Three Yards, and Six Courts. The Line follows the former railway north and south. The three Yards sit in the northern, central, and southern sections. The Six Courts are small places people can use every day, including rain gardens and seats under trees, a service desk, and a shared-learning walk. Technology sits behind these ordinary spaces. If the equipment stops, the route still works. If an answer is wrong, a member of staff is close by.

This study does not include a site survey or an official planning boundary. The boundaries, areas, and building prototypes shown in the drawings are working material. Public sources establish project status and regulatory requirements. Junctions, ownership, utilities, and heritage-control lines still require checks by the relevant authorities and professional teams.

![Existing projects, published plans, and the proposed spatial structure](assets/figures/site-overview.en.png)

## Design Basis and Source Inventory

I sorted the material into four layers. The announcement and task book establish the call boundary and submission requirements [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] [source:DATA-SRC-AGENT-TASKBOOK-20260518]. Government pages show which park sections are open, which connections are approved, and where water-management and heritage requirements apply [source:JZ-PARK-PHASE2-20240920] [source:QINGHUA-EAST-SOUTH-20260602] [source:XIAOYUEHE-PROJECT-20240305] [source:QINGHUAYUAN-HERITAGE-CONTROL-20260214].

OSM supplies the existing context for roads, paths, railways, stations, waterways, and public facilities [source:OSM-OVERPASS-20260808]. It may contain gaps or outdated records, so the drawings use it only to read broad spatial relationships. Area calculations use the repository's provisional boundary and the GeoJSON in this package [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]. They support comparison at the concept stage and will be replaced in full when an official boundary becomes available.

The photograph of Qinghuayuan Station comes from Wikimedia Commons. It was taken by N509FZ and is licensed under CC BY-SA 4.0 [source:WIKIMEDIA-QINGHUAYUAN-20240331]. The new image of the three Yards is a concept visual. It conveys spatial atmosphere and does not serve as evidence of existing conditions or engineering feasibility.

The planning method responds to [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], and [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. A verifiable copy of the architectural design-depth standard is still missing, so [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] remains an outstanding source.

Three approaches were tested. A technology-exhibition belt would have a clear identity, though exhibits could crowd out everyday use. A single linear park would be calmer, with little room for the industrial trials requested in the task book. The chosen Everyday Railway Commons uses the existing park as its ground and adds only the space needed at three Yards.[depth:existing_conditions_diagnosis]

## Three-Level Scope Framework

The announcement identifies a coordinated research area of about 43.6 square kilometres, an overall design area of about 11.4 square kilometres, and key areas totalling about 368.4 hectares [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]. This proposal retains the three scales and does not redraw the boundary of the first. The overall design uses the provisional polygon in [data:geometry/site_boundary.geojson#SITE-001]. The three key areas use [data:geometry/key_areas.geojson#KEY-001], [data:geometry/key_areas.geojson#KEY-002], and [data:geometry/key_areas.geojson#KEY-003].

The 43.6-square-kilometre study reads the relationships among universities, neighbourhoods, research institutes, and public services. The 11.4-square-kilometre design asks how the park can remain continuous and how crossings can work. The key areas bring the work down to an everyday dimension of 80 to 150 metres, where wheelchair turning, shade, and night lighting can be judged.[depth:three_level_scope_framework] [depth:overall_spatial_structure]

The working site area is recorded by [metric:site_area_sqm], and the continuous land-use area by [metric:land_use_partition_area_sqm]. Their equality shows only that the concept partition covers the provisional site in full. The number and working area of the key areas are recorded by [metric:key_area_count], [metric:key_area_zhongzhiyuan_area_sqm], [metric:key_area_ai_origin_area_sqm], and [metric:key_area_dazhongsi_area_sqm].

## Industry and Future-City Research for the Coordinated Research Area

An official account published in 2021 describes a Jing-Zhang Railway Heritage Park about nine kilometres long, serving nine subdistricts and towns. Placing roughly six kilometres of high-speed railway underground released land at the surface, though difficult crossings and coordination among many parties remain [source:JZ-PARK-CO-CREATION-20211216]. This shifted the proposal's priorities. New buildings move into the background. Crossings, station access, maintenance, and opening hours come first.

Haidian's 2025 statistical bulletin records 92 national key laboratories and 123 registered large models in service [source:HAIDIAN-STATS-20260410]. These are district-wide figures and cannot be distributed across the site by ratio. Beijing's agent policy calls for application validation, trusted testing, and access to public-service settings [source:BEIJING-AGENT-POLICY-20260723]. The proposal assigns those tasks to three places. Zhongzhiyuan hosts bounded testing, AI Origin provides staffed public services, and Dazhongsi supports presentations and exchange.

Eight international cases each offer one useful lesson. Helsinki 3D contributes open formats [source:CASE-HELSINKI-3D], while Punggol shows how testing can be graded [source:CASE-PUNGGOL-PDD]. King's Cross demonstrates the long-term stewardship of railway heritage and public space [source:CASE-KINGS-CROSS], and Decidim makes public proposals traceable [source:CASE-BARCELONA-DECIDIM]. Amsterdam's Algorithm Register stresses accountable time limits [source:CASE-AMSTERDAM-ALGORITHM], and the Paris fifteen-minute city supports checks of everyday access [source:CASE-PARIS-15M]. MK Smart offers organisational experience for urban trials [source:CASE-MILTON-KEYNES]. Toronto Quayside shows the cost of weak data governance and an unclear right to exit [source:CASE-TORONTO-QUAYSIDE]. The number of cases is recorded by [metric:global_case_count].

Regional coordination begins with named interfaces. Beiwei Community connects to services for young professionals. Future Science City and Huairou Science City connect to research and evaluation, and the Beijing Economic-Technological Development Area to intelligent hardware. On the Xiaoyue River side, the first interface is the existing water programme [source:XIAOYUEHE-WATERFRONT-20260112]. These are items for the next round of discussion. No cross-regional commitment has been made.

![Research, testing, and public services meet in the three Yards](assets/figures/ecosystem-space.en.png)

## Urban Renewal and Regulatory-Plan-Level Urban Design for the Overall Design Area

Jingzhang Park is already part of daily life. Public sources describe an open Phase I section of about 2.4 to 2.5 kilometres. Phase II plans include a ginkgo walk of roughly six kilometres, nine local streets, and community activity spaces [source:JZ-PARK-PHASE2-20240920] [source:JZ-PARK-AXIS-20260330]. The revised plan distinguishes what is open, what has been published, and what this proposal adds, so every line has a clear origin.

The continuous route, three Yards, and six kinds of small Court form a spatial network. The Courts follow people's routes and create a renewal pattern that can be repaired one section at a time. The north focuses on testing, the centre on service, and the south on exchange. Each setting has its own entrance, ordinary route, and maintenance team.

The overall plan first secures north-south continuity. The park route passes through the three Yards, with six kinds of small Court providing shade, rainwater management, and places to pause. East-west links give priority to the project south of Qinghua East Road and the local streets in Phase II. The southern project has been approved. Its published scheme includes the removal of about 1,200 metres of fencing, five non-motorised parking areas, six gardens, and four spaces for all ages [source:QINGHUA-EAST-SOUTH-20260602]. This proposal adds connecting signs, an accessibility review, and post-opening evaluation.

Urban renewal begins with a survey. The Beijing Urban Renewal Regulation requires public participation and oversight. Haidian's implementation guide calls for checks of ownership, buildings, utilities, fire safety, history, and operations [source:BEIJING-URBAN-RENEWAL-REGULATION-20221206] [source:HAIDIAN-URBAN-RENEWAL-GUIDE-20250716]. At this stage, the 11 functional units [data:geometry/land_use.geojson#LU-001] and nine building prototypes [data:geometry/buildings.geojson#BLDG-RD-1] are used only to test spatial relationships. Floor area ratio, height, and any retain, renovate, or demolish decision remain open.[depth:retain_renovate_demolish] [depth:land_use_layout] [depth:development_intensity_controls] [depth:height_massing_character]

![Land use across the northern, central, and southern sections, with three spatial scales](assets/figures/land-use-structure.en.png)

## Detailed Design of the Key Areas

The three key areas use the same drawing scale. Each plan shows its entrances, ordinary routes, and removable installations. Sections include trees, canopies, seating, and building edges. A 90-day trial addresses one small problem. Its value is reviewed after a year.

At Zhongzhiyuan, the low-speed test strip stays within the Testing Yard. The ordinary path runs beside it. Staff supervise the entrance, and the manual stop button is visible to the team on site. The first trial covers only multi-agent right-of-way and remote stopping. If equipment crosses the boundary or staff cannot take over, testing ends that day.

At AI Origin, the Co-Learning Street Yard sits beside a staffed service desk. Public information states that the mobile talent-service station already offers 17 services in five categories and keeps nearby in-person support [source:AI-ORIGIN-TALENT-STATION-20260722]. The design adds an accessible ramp, quiet waiting space, and a direct handoff when an automated answer is wrong. The former Qinghuayuan Station is subject to Category I and V construction controls. New elements remain low and removable, with siting to be checked by the heritage authority [source:QINGHUAYUAN-HERITAGE-CONTROL-20260214].

At Dazhongsi, the Urban Exchange Yard occupies the meeting point of station, street, and park. Commuters and nearby shops can use it by day. A small class or exhibition can run in the evening. Furniture returns to storage after an event, and the space reverts to ordinary circulation during quiet hours. If complaints continue, the operator shortens the programme or removes it.

![Plans, sections, and 90-day trials for the three Yards at a common scale](assets/figures/key-areas.en.png)

![Concept view of everyday life in the three Yards](assets/figures/three-courtyards-concept.png)

Each Yard keeps an ordinary route that requires neither login nor tracking. The three-year review has three possible outcomes. Useful parts stay. Awkward parts are changed. A full pilot can also be removed.[depth:three_key_area_detailed_design]

## AI Innovation Ecosystem, Personas, and AI-Enabled Scenarios

On this site, AI supports public-service handoff and bounded tests. During the day, service staff take over a wrong answer. At night, on-site staff supervise robot tests. Technology changes operating hours and equipment interfaces. Tests avoid commuter peaks. Sensors and low-speed devices can be removed while public space remains in use. Pedestrian counts, thermal conditions, and accessibility records enter the next design round only after a person checks them.

Eight groups take part in co-design. Research teams need reliable test conditions, and students and teachers need places to learn together. Older people, families with children, and disabled people are more concerned with whether the route is easy to use. Night maintenance staff know where lighting and call points are missing. Shopkeepers, buyers, and city operators connect trials to ordinary management. The number of personas is recorded by [metric:persona_count]. They do not represent real individuals, and no personal trajectories are collected.

Fourteen scenarios unfold through a day. The morning focuses on station connections and an accessible main route. At midday, the service desk supports public services, shared learning, and handoff to a person. In the late afternoon, spaces under the trees serve walking, care, and railway interpretation. Enclosed testing opens at night, when the on-site safety officer holds the stop control. Locations, responsible organisations, and stop conditions are listed in `visual/assets/open-belt-program.json`. The count is recorded by [metric:scenario_count]. The number of fields in each service record is given by [metric:service_passport_field_count].

Six industrial tests cover robot interlocks, service handoff, offline fallback, accessibility challenges, tracking-free service, and timed energy use. Each begins with a named responsible organisation and a working non-digital route, followed by a frozen test set. A project that misses its threshold stays inside the Yard and does not enter the public spine. The count is recorded by [metric:test_scenario_count].[depth:municipal_new_infrastructure]

![Four moments in the day, from morning to night](assets/figures/scenario-operations.en.png)

The roles of Agent.1 to Agent.6 remain in the task appendix [source:DATA-SRC-AGENT-TASKBOOK-20260518]. The main drawings show only the people on site, what they do, and who takes over when something fails.

## Land Use, Building Scale, and the Demolish, Renovate, Retain Approach

The provisional site was partitioned in EPSG 4548 and transformed back to EPSG 4326. Adjacent units share boundaries and currently do not overlap. The areas of the 11 units are recalculated through [metric:land_use_unit_count] and the individual land-use metrics.

The working area for research land is about 340.1 hectares [metric:land_use_0802_area_sqm], and park green space about 258.8 hectares [metric:land_use_1401_area_sqm]. Urban residential land covers about 176.9 hectares [metric:land_use_0701_area_sqm], and education about 117.1 hectares [metric:land_use_0804_area_sqm]. Commercial and business services cover about 87.2 hectares [metric:land_use_05_area_sqm], culture about 83.4 hectares [metric:land_use_0803_area_sqm], and community-service facilities about 77.7 hectares [metric:land_use_0702_area_sqm]. Code 0902 does not appear in the submitted data and remains not applicable.

The combined base area of the nine building prototypes is recorded by [metric:building_footprint_area_sqm] and [metric:building_footprint_ratio]. This ratio measures only the share of the provisional site occupied by prototype footprints. Statutory building coverage remains unknown. Once surveys of existing buildings, ownership, structure, fire safety, and utilities are complete, professional teams can assess each building for retention, repair, or removal [source:HAIDIAN-URBAN-RENEWAL-GUIDE-20250716].

## Transport, Rail, Municipal Infrastructure, and Public-Service Facilities

The transport drawing places roads, railways, stations, and waterways on the base layer, then adds the park spine and three east-west connections [data:geometry/roads.geojson#ROAD-TRUNK]. The total working centreline length is recorded by [metric:road_centerline_length_m]. It does not represent a road boundary.

The project south of Qinghua East Road provides the clearest east-west connection. It links the Jing-Zhang corridor in the west with the Xiaoyue River in the east and plans roughly 1,900 non-motorised parking spaces [source:QINGHUA-EAST-SOUTH-20260602]. The revised walking and cycling plan starts from this project and marks each junction and alternative route that still needs checking.

Detailed walking and cycling design follows DB11/1761-2020 [source:BEIJING-WALK-CYCLE-STANDARD-20201223]. The greenway guide recommends a service radius of no more than about 500 metres [source:BEIJING-GREENWAY-GUIDE-20250725]. This figure is used to check the spacing of rest points, drinking water, and toilets. The greenway management measures require a clear designation for walking, cycling, or shared use, as well as routine maintenance and emergency arrangements [source:BEIJING-GREENWAY-MANAGEMENT-20260429].

The municipal drawing marks interfaces only. Drinking water, toilets, lighting, drainage, and fire safety require a site inventory. Energy, network, and cooling loads can be calculated only when the equipment scheme is defined. Current gaps are recorded by [data:geometry/constraints.geojson#GAP-ROAD] and [data:geometry/constraints.geojson#GAP-MUNICIPAL].[depth:traffic_rail_slow_parking]

## Blue-Green Space, Public Space, and Urban Character

The published Xiaoyue River works include 6.41 kilometres of river improvement, 4.94 kilometres of hard-bank works, 19.50 hectares of green space, 14 bridges, and five public toilets [source:XIAOYUEHE-PROJECT-20240305]. A separate 2026 plan lists 11.4 kilometres of waterfront paths and 11 hectares of planting [source:XIAOYUEHE-WATERFRONT-20260112]. The two length figures use different scopes and are kept separate in the drawings.

The park spine serves six everyday needs through shade, rain gardens, shared learning, public service, testing, and exchange. New components sit mainly on hard edges and near existing service points, leaving continuous space for lawns and the waterfront. The green-space and public-space geometry is recorded in [data:geometry/green_space.geojson#GREEN-TRUNK] and [data:geometry/public_space.geojson#PUBLIC-PLAZA-ORIGIN]. Working values are given by [metric:green_space_area_sqm], [metric:green_ratio], [metric:public_space_area_sqm], and [metric:public_space_ratio].[depth:blue_green_public_space]

Typical sections first secure a clear walking width of at least two metres, then place seating, planting, and equipment. Fixed signs and staffed support remain available. New elements near Qinghuayuan avoid the heritage fabric and continue the grey-red palette already found in brick, steel, timber, and railway remains.[depth:blue_green_open_space] [depth:public_space_quality]

![Sections through crossings, shade, the waterfront, and accessible routes](assets/figures/mobility-bluegreen.en.png)

Four low-intervention landmarks support arrival, pausing, reading, and exchange. Their count is recorded by [metric:landmark_count]. Railway interpretation will be evaluated after opening for accessibility and comprehension, drawing on post-occupancy research into railway-built heritage [source:HERITAGE-POE-20241106].

## Renewal Project List, Implementation Policy, and Phasing Plan

Nine projects begin with a small piece that can be removed. P01 tests a continuous walking section, and P02 addresses one real east-west break. P03 encloses the low-speed Testing Yard at Zhongzhiyuan. P04 adds a service desk and accessible waiting at AI Origin. P05 builds a short waterfront rain garden, while P06 trials an evening class at Dazhongsi. P07 prepares four railway-interpretation points. P08 records how places work after opening, and P09 conducts the annual review. The number of projects is recorded by [metric:renewal_project_count].[depth:renewal_project_list]

Only reversible elements are installed during the first 90 days. The responsible organisation records use conflicts and maintenance problems each day, then publishes a short result at the end of each month. After one year, pedestrian use, accessibility, thermal comfort, and complaints are measured again. The three-year review decides which projects can enter long-term construction.

The community, maintenance team, and relevant public departments confirm responsibility in writing before a trial starts. Each follow-up uses the same indicators, so the next team can see why a project stayed, changed, or was removed.

The phasing drawing uses four states, beginning with [data:geometry/phasing.geojson#PHASE-01]. Missing evidence triggers further survey. A pilot starts only when a responsible organisation is named. A project moves into implementation preparation after professional review and can become long term only when its operating record is stable. The four working areas are recorded by [metric:phase_01_area_sqm], [metric:phase_02_area_sqm], [metric:phase_03_area_sqm], and [metric:phase_04_area_sqm], with total coverage given by [metric:phasing_area_sqm]. These states do not correspond to fixed calendar years.[source:BEIJING-URBAN-RENEWAL-REGULATION-20221206] [depth:phasing_implementation]

![Eight public components and the locations of nine projects](assets/figures/components-phasing.en.png)

## Metrics, Area Recalculation, and Compliance Matrices

Site and land-use areas come from the submitted GeoJSON. Core working values include [metric:site_area_sqm], [metric:land_use_partition_area_sqm], [metric:building_footprint_area_sqm], [metric:green_space_area_sqm], [metric:public_space_area_sqm], and [metric:road_centerline_length_m]. Areas are calculated in EPSG 4548, while exchange files remain in EPSG 4326.

The proposal also records three key areas [metric:key_area_count], 14 scenarios [metric:scenario_count], six tests [metric:test_scenario_count], eight co-design groups [metric:persona_count], and nine projects [metric:renewal_project_count]. Formulae, source files, and confidence levels are stored in `metrics.json`. Task coverage and design depth are recorded in `compliance_matrix.json`, `standard_matrix.json`, and `design_depth_matrix.json`.[source:SITE-PACKAGE] [depth:metrics_recalculation]

![Options, evidence limits, and recalculable metrics](assets/figures/metrics-evidence.en.png)

## Risk, Copyright, and Compliance

The risk note is short because its job is to show the next team where to begin. Public information has limits of use, personal services must protect privacy, and third-party images and data retain their copyright and licence terms. Heritage, ownership, and utilities require checks by the relevant authorities. Areas must be recalculated when an official boundary is available. High-impact services keep a staffed counter and a route for appeal, and critical OSM junctions require field verification.[depth:risk_missing_data]

Original text, design layers, HTML, and PDFs use CC BY 4.0. The Qinghuayuan photograph uses CC BY-SA 4.0, and OSM-derived context uses ODbL 1.0. The Three Yards concept image conveys design intent only; its production method and limits of use are recorded in `report/copyright_statement.md`.

The website loads no remote scripts, map tiles, fonts, images, or tracking code. Assumptions and trigger conditions are listed in `assumptions.json` and `risk.json`.

## References

Task and standards material includes the official announcement [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509], the public task book `brief/public-brief.md` [source:PUBLIC-BRIEF], the Agent task book [source:DATA-SRC-AGENT-TASKBOOK-20260518], the site package [source:SITE-PACKAGE], and standards issued by housing, urban-rural development, and natural-resources authorities [source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES] [source:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING] [source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311].

Site evidence includes the official account of co-creation for Jingzhang Park [source:JZ-PARK-CO-CREATION-20211216], information on Phase II and overall progress [source:JZ-PARK-PHASE2-20240920] [source:JZ-PARK-AXIS-20260330], the project south of Qinghua East Road [source:QINGHUA-EAST-SOUTH-20260602], Xiaoyue River works [source:XIAOYUEHE-PROJECT-20240305] [source:XIAOYUEHE-WATERFRONT-20260112], Qinghuayuan heritage controls [source:QINGHUAYUAN-HERITAGE-CONTROL-20260214], walking and greenway documents [source:BEIJING-WALK-CYCLE-STANDARD-20201223] [source:BEIJING-GREENWAY-GUIDE-20250725] [source:BEIJING-GREENWAY-MANAGEMENT-20260429], urban-renewal documents [source:BEIJING-URBAN-RENEWAL-REGULATION-20221206] [source:HAIDIAN-URBAN-RENEWAL-GUIDE-20250716], and the public-service account [source:AI-ORIGIN-TALENT-STATION-20260722].

Open data and research methods include OSM [source:OSM-OVERPASS-20260808], the photograph of Qinghuayuan Station [source:WIKIMEDIA-QINGHUAYUAN-20240331], Haidian's statistical bulletin [source:HAIDIAN-STATS-20260410], Beijing's agent policy [source:BEIJING-AGENT-POLICY-20260723], and post-occupancy research on railway-built heritage [source:HERITAGE-POE-20241106]. The source registry and processed fact pack are stored in [source:SOURCE-REGISTRY] and [source:PROCESSED-FACT-PACK]. Background references include [source:JINGZHANG-HISTORY-NRA], [source:JINGZHANG-PARK-BJGH], [source:ZHONGGUANCUN-ZGC], [source:TSINGHUAYUAN-HERITAGE], [source:WCAG22], [source:PIPL], [source:NIST-AI-RMF], and [source:UNESCO-AI-ETHICS].
