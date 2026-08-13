---
title: "JINGZHANG LEARNING VEIN: From Rail to Learning Rail — An AI Learning City Belt"
author_github: "Pluto-cn"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Re-reading the centennial Jing-Zhang railway's 'track' as a 'Learning Rail': the 9-km Jing-Zhang Heritage Park becomes the Learning Spine, while Zhongzhiyuan, the AI Origin Community and Dazhongsi become three stations of learning-by-making, learning-by-asking and learning-by-using. The Zhongguancun Technology Services Wing and the Xiaoyue River Scenario Enablement Wing organize an industry academy and a life academy, building a wall-less AI learning city. All spatial proposals are conceptual recommendations based on provisional boundaries and must be recalculated when official boundaries are released."
tracks: ["jingzhang-heritage-narrative", "youth-friendly-public-space", "ai-origin-community"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "ai-health-service-navigation"]
iteration: "v0.3"
---

# JINGZHANG LEARNING VEIN: From Rail to Learning Rail — An AI Learning City Belt

## Design Basis and Source List

This proposal takes the Qualification Prequalification Announcement for the Centennial Jing-Zhang AI Innovation Belt International Open Call for Urban Design, issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources, as its primary basis [source:OFFICIAL-ANNOUNCEMENT], the Agent open-call taskbook as its task basis [source:AGENT-TASKBOOK], and the provisional boundaries, key areas, enums, metrics and source inventory registered in the site package as its machine-readable basis [source:SITE-PACKAGE]. All spatial conclusions are recalculated from the submitted `geometry/*.geojson` under EPSG:4548 [metric:site_area_sqm]; existing-condition data and regulatory-plan conditions are listed item by item as pending confirmation according to `data/processed/missing_data_checklist.csv` [source:PROCESSED-FACT-PACK].

The core idea in one sentence: **re-read the centennial Jing-Zhang railway's "track" as a "Learning Rail"**. One hundred years ago, the rail carried industrial civilization and modern knowledge into Beijing; one hundred years later, this track should carry knowledge, train intelligence and cultivate talent. The 9-km Jing-Zhang Heritage Park thus becomes a "wall-less university", the three key areas become three "colleges", the two wings become two "academies", and the whole innovation belt becomes a lifelong learning city. Zhan Tianyou used a "switchback" alignment to let trains climb the Badaling mountain pass; this proposal uses the "Learning Rail" to let everyone climb the cognitive pass of the AI era — when the slope is steep, turn back and ascend. That is the essence of learning [source:OFFICIAL-ANNOUNCEMENT].

This proposal is an open co-creation conceptual recommendation. It does not replace formal planning and does not constitute a government-approved conclusion; all spatial recommendations are reference schemes for professional teams to deepen [source:AGENT-TASKBOOK]. Since official boundaries have not been released, the package uses the provisional boundaries provided by the repository, for generation, self-check and visualization only. They must not be treated as an official planning boundary, approval basis or precise-area basis; when official polygons are published, the whole package must be recalculated according to the checklist in `assumptions.json` [data:geometry/site_boundary.geojson#SITE-001].

![Jing-Zhang Learning Vein overview: from rail to learning rail](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal is organized according to the three scope levels defined in the announcement, which form a progressive chain of "industry strategy — overall design — detailed design" [depth:three_level_scope_framework].

| Level | Working objective | Area | Spatial answer of this proposal | Data anchor |
| --- | --- | --- | --- | --- |
| Coordinated Research Area | World-class AI innovation ecosystem, future city form, Three Zones and Two Wings synergy | approx. 43.6 km² | "One spine, three stations, two wings, multiple nodes" industrial-spatial structure: university origination — learning-by-making verification — learning-by-asking co-research — learning-by-using transformation — two-wing services [depth:overall_spatial_structure] | `compliance_matrix.json`, `standard_matrix.json` |
| Overall Design Area | Urban renewal and regulatory-plan-level urban design | approx. 11.4 km² | Learning-spine green corridor connects north and south; three stations concentrate functions; east-west links suture the two wings [data:geometry/land_use.geojson#LU-001] | `geometry/land_use.geojson`, `geometry/roads.geojson` |
| Key-Area Detailed Design Area | Detailed design of three key areas | approx. 368.4 ha | Zhongzhiyuan = learning-by-making verification station; AI Origin = learning-by-asking research station; Dazhongsi = learning-by-using application station [data:geometry/key_areas.geojson#PROV-KEY-001] | `geometry/key_areas.geojson`, `geometry/buildings.geojson` |

The three levels correspond one-to-one to tasks 1.4.1, 1.4.2 and 1.4.3 of the announcement, with chapter, layer, metric, drawing and HTML evidence given in `compliance_matrix.json` [source:OFFICIAL-ANNOUNCEMENT]. Spatial evidence is anchored at [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#PROV-KEY-001], and the task basis is [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. Layers and metrics that use provisional boundaries are marked in `sources.json` and `assumptions.json` as "pending recalculation when official data is released" [source:SOURCE-REGISTRY].

![Three-level scope and spatial structure](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

The Coordinated Research Area answers two questions: how to organize a world-class AI innovation ecosystem, and how the AI-era urban form should grow. This proposal puts forward a "**learning-based innovation ecosystem**": the innovation chain is organized as a learning chain — universities and research institutes are the source of "learning-by-asking", Zhongzhiyuan is the verification field of "learning-by-making", Dazhongsi is the market end of "learning-by-using", the Zhongguancun Technology Services Wing provides capital, data and global factor allocation, and the Xiaoyue River Scenario Enablement Wing brings AI scenarios into daily life [source:AGENT-TASKBOOK].

**Naming and visual identity**: the primary name is "京张学脉" (Jing-Zhang Learning Vein), in English **JINGZHANG LEARNING VEIN (JZ-LV)**. The naming logic: Jing-Zhang is the geographic origin of China's independent innovation, and "Learning Vein" carries the three images of 文脉 (cultural lineage), 血脉 (bloodline) and 脉络 (network) — the rail runs through the city like a bloodline, knowledge passes down like a cultural lineage, and AI scenarios extend into neighborhoods like a network [source:AGENT-TASKBOOK]. Logo direction: the rail cross-section as the base, overlaid with an open book and a data stream forming a "switchback" (人-shaped) fold in homage to Zhan Tianyou's Qinglongqiao switchback; the color system uses steel-grey, Tsinghua purple and data blue [depth:brand_identity]. The visual system corresponds directly to the three positioning themes — Centennial Jing-Zhang Culture Belt, Urban AI Life Experience Belt and AI Integration Innovation Belt — and does not introduce an unrelated cultural identity for the belt [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

**Mapping of the three positionings and five functions**:

| Positioning | Learning metaphor | Functional anchor |
| --- | --- | --- |
| Centennial Jing-Zhang Culture Belt | History course: read the origin of China's independent innovation | Heritage-park cultural narrative, First Lesson memorial at Qinghuayuan Station |
| Urban AI Life Experience Belt | Life course: learn to live with AI in the city | Xiaoyue River Scenario Enablement Wing, 12 learning scenario nodes |
| AI Integration Innovation Belt | Innovation course: turn AI into careers and industry | Three-station industrial agglomeration, Zhongguancun Technology Services Wing |
| Five functions | Learning mode | Spatial carrier |
| Full-stack independent AI innovation system | Learning by Making | Zhongzhiyuan verification station |
| World-class AI innovation ecosystem | Learning by Asking | AI Origin Community |
| New paradigm of AI-enabled scenarios | Learning by Using | Dazhongsi application station |
| Intelligent vibrant AI city | Learning by Living | Xiaoyue River life academy |
| Global voice in AI governance | Learning by Governing | Zhongguancun governance and standards wing |

**Seven global AI innovation ecosystem cases**: Stanford–Silicon Valley's university-origination and venture-capital flywheel; MIT Media Lab–Kendall Square's lab-and-neighborhood co-construction; TU Munich–Garching's industry-university-research campus; Singapore's Punggol Digital District organizing the district around lifelong learning and digital twins; Helsinki's open data and AI-literacy education shaping "city as learning"; Paris Station F clustering early teams in a super entrepreneur campus; and Hangzhou's Yunqi Town driving industrial agglomeration through developer communities and scenario access [source:AGENT-TASKBOOK]. The transferable lessons of these cases are recorded in `sources.json`: university origination corresponds to the AI Origin Community, verification-to-pilot corresponds to Zhongzhiyuan, scenario access corresponds to the Xiaoyue River wing, and global factor allocation corresponds to the Zhongguancun wing [depth:ai_innovation_ecosystem].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The Overall Design Area takes the "**Learning Spine**" as its spatial main axis: along the Jing-Zhang Heritage Park, a green, slow-mobility and public-learning corridor runs through from north to south, with functional agglomeration, urban renewal and urban-character control organized on both sides [depth:overall_spatial_structure]. The spatial structure is "one spine, three stations, two wings, multiple nodes":

- **One spine**: the Learning Spine green corridor, linking all learning scenario nodes and the three stations [data:geometry/green_space.geojson#GREEN-001];
- **Three stations**: Zhongzhiyuan (north), AI Origin Community (middle) and Dazhongsi (south), the three key areas, corresponding to learning-by-making, learning-by-asking and learning-by-using respectively [data:geometry/key_areas.geojson#PROV-KEY-001];
- **Two wings**: the Zhongguancun Technology Services Wing (west, technology services and capital factors) and the Xiaoyue River Scenario Enablement Wing (east, life and scenarios) [data:geometry/land_use.geojson#LU-001];
- **Multiple nodes**: 12 AI learning scenario nodes and public spaces along the spine and the wings [data:geometry/public_space.geojson#PUBLIC-001].

The land-use layout in `geometry/land_use.geojson` fully covers the submitted boundary with no gaps or overlaps, and the zoning follows the national territorial land-use classification logic [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]: research land (0802) carries the verification and transformation functions of Zhongzhiyuan and the Origin Community; education land (0804) supports university origination and lifelong learning; commercial services land (05) organizes the Dazhongsi smart-consumption experience; park green space (1401) forms the Learning Spine; and residential land (0701) organizes the life clusters of the two wings and the surroundings [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout].

Urban renewal follows a three-tier "**retain—renovate—new-build**" logic [depth:retain_renovate_demolish]: heritage elements in and around the park are mainly retained and activated; existing industrial buildings are mainly functionally renovated and spatially interwoven; and the incremental capacity of the key areas is mainly new research and public-service carriers. Building footprints are expressed as conceptual outlines in `geometry/buildings.geojson` [data:geometry/buildings.geojson#BLDG-001]. Regulatory conditions such as building height, FAR, density, setbacks and road red lines are all listed as "pending official regulatory-plan conditions" until official conditions are released; speculative values must not be presented as approved indicators [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:development_intensity_controls].

## Detailed Design of Key Areas

The three key areas are the three colleges on the "Learning Rail", designed to the depth of an integrated planning implementation plan [depth:three_key_area_detailed_design]:

**Zhongzhiyuan AI Independent Innovation Acceleration Area — Learning-by-Making Station**: positioned as the verification and pilot-production center of a full-stack independent AI innovation system. Spatial moves: organize a "verification—pilot—evaluation" functional belt with research land; arrange a low-carbon innovation exchange green corridor along the Qing River frontage; and provide conceptual carriers such as a full-stack innovation verification laboratory, an AI pilot-production and smart-manufacturing center, and a standards-governance and safety-evaluation building [data:geometry/buildings.geojson#BLDG-002]. AI scenarios: model evaluation workshop, standards-setting workshop, safety-governance sandbox and low-carbon computing experience [data:geometry/key_areas.geojson#PROV-KEY-001]. Implementation dependencies: Qing River blue-line, ecological and flood-control conditions, and an industry-access mechanism to be deepened by professional teams [source:SITE-PACKAGE].

**Beijing AI Origin Community — Learning-by-Asking Station**: positioned as the origin of university origination, open-source co-learning and research transformation. Spatial moves: organize a "university—co-learning—transformation" functional belt with education land; provide an open-source co-learning and AI-literacy college and a campus-adjacent transformation station; and stitch together campus, park and neighborhood slow mobility with transit-station integration [data:geometry/buildings.geojson#BLDG-004]. AI scenarios: open-source co-learning room, results release hall, AI-literacy night school and inter-campus co-learning festival [data:geometry/key_areas.geojson#PROV-KEY-002]. Implementation dependencies: campus boundaries, ownership and ground-floor use conditions to be confirmed [source:AGENT-TASKBOOK].

**Dazhongsi AI Industry Cluster — Learning-by-Using Station**: positioned as the market end of the smart economy, consumption experience and industrial application. Spatial moves: organize an "experience—roadshow—transformation" functional belt with commercial services and research land; provide a smart-consumption experience complex and a smart-terminal and data-factor building; and organize four-quadrant pedestrian connectivity and public-space stitching around Dazhongsi Station [data:geometry/buildings.geojson#BLDG-006]. AI scenarios: smart-consumption experience street, international roadshow lounge, data-factor lounge and agent display window [data:geometry/key_areas.geojson#PROV-KEY-003]. Implementation dependencies: transit-station integration, road intersections and utility conditions to be professionally reviewed [source:SITE-PACKAGE].

The three key areas are anchored at PROV-KEY-001/002/003 in `geometry/key_areas.geojson`; their land-use differences are reproducible in `geometry/land_use.geojson`; the detailed evidence chain is in `standard_matrix.json` and `design_depth_matrix.json` [metric:key_area_count].

![Detailed design of the three key areas](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

**User personas (5 types)**:

| Persona | Typical needs | Spatial response | Data and privacy boundary |
| --- | --- | --- | --- |
| University students and researchers | Inter-campus co-learning, research transformation, computing access | Origin Community co-learning college, campus-adjacent transformation station, train library | Campus data and research results require authorization |
| AI developers and open-source contributors | Collaboration, release, community reputation | Open-source co-learning room, code dojo, milestone honor wall | No personal behavioral tracking; aggregate statistics only |
| Startups and SMEs | Low-cost verification, roadshows, financing | Zhongzhiyuan shared verification field, Junction Pitch Stage, Zhongguancun wing capital services | Computing and data services require separate authorization |
| Residents and families | Commuting, leisure, lifelong learning, community services | Life academy community center, AI-literacy night school, spine slow loop | No resident profiling for commercial recommendation |
| International visitors and global talent | Cultural experience, international exchange, talent services | Dazhongsi international roadshow lounge, signal language corner, multilingual wayfinding | Minimal visitor data collection |

**AI+ scenario cards (12, of which 3 are testing-and-validation scenarios)**:

| ID | Scenario card | Spatial carrier | Learning mode | Operation and human review |
| --- | --- | --- | --- | --- |
| SC-01 | Platform Classroom | Old platform node on the spine | Open-air AI popular science | Co-run by schools and the park; lecturers human-reviewed |
| SC-02 | Open-Source Co-Learning Room | AI Origin Community | Open-source project collaborative learning | Community self-governance; contributions traceable |
| SC-03 | Code Dojo* | Zhongzhiyuan | Programming and algorithm training | TVS; evaluation trails retained |
| SC-04 | AI Literacy Night School | Xiaoyue River life academy | Lifelong learning for residents | Public-interest operation; content human-reviewed |
| SC-05 | Switchback Lab* | Zhongzhiyuan | Repeated AI model test-and-iterate | TVS; versions rollback-able |
| SC-06 | Signal Language Corner | Spine node | Language learning and AI translation | Multilingual volunteer operation |
| SC-07 | Train Library | Carriage node on the spine | Reading + AI book recommendation | Public-library operation; explainable recommendation |
| SC-08 | Maintenance Shed Workshop* | Zhongzhiyuan | Embodied intelligence and robotics | TVS; safety red-line management |
| SC-09 | Station Agent Desk | Public space of three stations | AI public-service wayfinding | Urban agent with human fallback review |
| SC-10 | Timetable Gallery | Qinghuayuan Station heritage site | Time and history perception | Cultural display; content heritage-reviewed |
| SC-11 | Junction Pitch Stage | Dazhongsi | Startup roadshow and results release | Platform operation; review trails retained |
| SC-12 | Terminus Graduation Plaza | South end of the spine | Honor display and graduation ceremony | Honor system; contributions verifiable |

SC-03, SC-05 and SC-08 (marked with *) are industrial testing-and-validation scenarios (TVS), satisfying the "no fewer than 3" requirement of the taskbook [source:AGENT-TASKBOOK]. All scenarios follow the four principles of data minimization, public sources, explainability and human review; they do not collect personal privacy or make automated decisions that cannot be human-reviewed [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. Scenario nodes enter the scenario layer of `visual/index.html` and are consistent with the `ai_scenario_node_count` metric in `metrics.json` [metric:ai_scenario_node_count].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The land-use layout takes "one spine, three stations, two wings, multiple nodes" as its skeleton; the 24 zones of `geometry/land_use.geojson` fully cover the submitted boundary [data:geometry/land_use.geojson#LU-001]. Functional proportions: research land (0802) is the core industrial space; education land (0804) supports the learning-city character; park green space (1401) forms the spine; commercial services land (05) serves the Dazhongsi market end; and residential land (0701) organizes life clusters [depth:land_use_layout].

Building scale is expressed by 10 conceptual building footprints in `geometry/buildings.geojson` [data:geometry/buildings.geojson#BLDG-001], with the total footprint area recalculated in `metrics.json` [metric:building_footprint_area_sqm]. The demolish-renovate-retain strategy is a directional classification: heritage elements in and around the park are mainly "retained and activated"; existing industrial buildings are mainly "functionally renovated"; and the incremental capacity of key areas is mainly "new-built" research and public-service carriers. Parcel-level demolish-renovate-retain conclusions must wait for official regulatory plans, ownership and existing-building surveys; this proposal gives no parcel-level conclusions [depth:retain_renovate_demolish] [standard:MOHURD-CONTROL-DETAILED-PLANNING]. FAR, building height, density, setbacks and road red lines are all listed as pending regulatory conditions [depth:development_intensity_controls].

## Transport, Rail, Municipal Infrastructure, and Public Services

The transport organization follows the principle of "**slow mobility first, transit connection, spine through-connection**" [depth:traffic_rail_slow_parking]: the Learning Spine green corridor is the main north-south walking and cycling artery [data:geometry/roads.geojson#ROAD-001]; three east-west links suture the two wings and the three stations [data:geometry/roads.geojson#ROAD-002]; and the Xiaoyue River wing arranges a blue-green slow loop [data:geometry/roads.geojson#ROAD-007]. Qinghuayuan, Wudaokou and Dazhongsi stations are the transit-anchor points organizing "rail + slow mobility + last mile" integrated interchange; these are conceptual recommendations whose alignment and station-integration schemes await deepening by professional teams and transport authorities [source:SITE-PACKAGE].

Municipal and new infrastructure emphasize "**AI facilities integrated with conventional municipal services**" [depth:municipal_new_infrastructure]: edge-computing nodes are co-located with public-service facilities; distributed energy is combined with low-carbon computing; sensing facilities follow minimization and privacy-protection principles. Utility conditions such as pipelines, energy load, fire safety and flood-control capacity await official data [source:PROCESSED-FACT-PACK]. Public-service facilities are configured at three levels — station level, node level and community level: station-level learning-and-industry service complexes, node-level public learning living rooms [data:geometry/public_space.geojson#PUBLIC-001], and community-level life-academy and AI-literacy services [data:geometry/buildings.geojson#BLDG-009].

![Mobility, slow network and blue-green public space](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

The blue-green network takes the Learning Spine green corridor as its skeleton and coordinates the Qing River and the Xiaoyue River systems, forming a system of "**one spine through north and south, two waters moistening east and west**" [depth:blue_green_public_space]: the spine corridor [data:geometry/green_space.geojson#GREEN-001], the Zhongzhiyuan knowledge pocket park, the Origin co-learning lawn, the Dazhongsi corner green space and the Xiaoyue River blue-green node together form the green network [data:geometry/green_space.geojson#GREEN-005]. The green ratio and public-space ratio are recalculated in `metrics.json` and their design meanings are explained in the narrative [metric:green_ratio] [metric:public_space_ratio].

Public space is organized as "three station plazas plus node living rooms": the Zhongzhiyuan learning-by-making verification plaza, the AI Origin learning-by-asking co-learning plaza and the Dazhongsi learning-by-using experience plaza [data:geometry/public_space.geojson#PUBLIC-001], plus a mid-spine public learning living room, forming a public-space network for lingering, learning and interaction [depth:public_space_system].

**AI public space, AI-native new business and pilgrimage landmarks (3)**:

| Landmark | Location | Content | Nature |
| --- | --- | --- | --- |
| First Lesson Monument | Qinghuayuan Station heritage site | Zhan Tianyou's engineering-education origin + AI-era "first lesson" narrative | Historical memorial and honor display |
| Switchback Spirit Tower | Middle of the spine | Public art and viewing tower inspired by the switchback alignment | AI pilgrimage landmark |
| Open-Source Milestone Wall | Zhongzhiyuan or Origin Community | Contributor honor display and open-source milestones | Honor display system |

The three landmarks satisfy the "no fewer than 3 AI pilgrimage landmarks" requirement of the taskbook [source:AGENT-TASKBOOK]; they are all associated with the public-space system, developer community and cultural narrative, and are conceptual public-art recommendations rather than approved construction projects [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The urban character uses "**steel-grey, Tsinghua purple and data blue**" as its tone; building mass steps down along the spine; roof forms encourage a fifth facade with photovoltaic integration; and character control follows the coordination requirements of the Measures for the Administration of Urban Design [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:height_massing_character].

## Renewal Projects, Implementation Policy, and Phasing

Renewal project list (near-term priorities):

| ID | Project | Type | Key dependencies | Phase |
| --- | --- | --- | --- | --- |
| JZ-01 | Learning Spine slow-mobility through-connection | Public space/transport | Road red lines, underpass review | Near |
| JZ-02 | Qinghuayuan "First Lesson" memorial activation | Culture/retain | Heritage conditions, ownership | Near |
| JZ-03 | Dazhongsi four-quadrant pedestrian connectivity | Transit integration/slow mobility | Station, junction, utility conditions | Near |
| JZ-04 | Zhongzhiyuan full-stack verification belt renewal | Industry/renewal | Industry access, ownership, blue line | Mid |
| JZ-05 | Origin open-source co-learning college | Education/new build | Campus boundary, regulatory conditions | Mid |
| JZ-06 | Junction Pitch Stage and smart-consumption street | Commercial/renewal | Commercial operators, data compliance | Mid |
| JZ-07 | Xiaoyue River life academy community center | Public/new build | Community participation, facility standards | Long |
| JZ-08 | Milestone honor wall and landmark cluster | Culture/public art | Public-art approval, copyright clearance | Long |

Phasing follows a "**near-term pilot — mid-term renewal — long-term governance**" logic [depth:phasing_implementation]: the near term starts the spine and experience stations with lightweight facilities, operational activities and service platforms; the mid term advances the renewal of industrial functional belts; and the long term completes the two wings and the governance framework [data:geometry/phasing.geojson#PHASE-001]. Implementation-policy recommendations — urban-renewal coordination, scenario access and data compliance, talent and computing-factor security, public participation and operation-maintenance mechanisms — are all conceptual recommendations and must not be presented as confirmed government arrangements [source:AGENT-TASKBOOK].

**Global AI innovation event system and long-term operation (agent.6)**: the annual "JZ Learning Festival" combines a developer day, open-source marathon, AI-literacy week, inter-campus co-learning festival and international roadshow [source:AGENT-TASKBOOK]. Long-term operation mechanisms include: developer-community operation (open-source co-learning room self-governance plus milestone honor system), scenario-access operation (tiered TVS access with rollback), public-experience operation (spine guided tours plus graduation-plaza ceremonies), and international communication with recruitment conversion (roadshow lounge, multilingual wayfinding, global talent services) [depth:long_term_operation]. All event and operation arrangements are conceptual recommendations to be deepened by professional operation teams [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

**Stakeholders and coordination mechanism**: the proposal's implementation depends on five types of stakeholders working in coordination [depth:phasing_implementation] — government and local departments (policy opening, regulatory and public-facility coordination), universities and research institutes (origination, co-learning and research transformation), technology enterprises and developer communities (verification co-construction, scenario access and open-source governance), professional design and operation teams (deepening, implementation and operations), and residents and visitors (participatory design, lifelong learning and experience feedback). On coordination, a "Learning Spine co-governance platform" is recommended as a standing coordination interface, bringing cross-stakeholder topics of policy, space, scenario and data compliance into unified deliberation to avoid single-point advancement [source:AGENT-TASKBOOK]. The above stakeholder roles and coordination mechanism are conceptual recommendations and do not constitute confirmed government arrangements.

**Pilot zones and target indicators**: in the near term, three pilots with low renovation dependency, rollback capability and observability will be launched [data:geometry/phasing.geojson#PHASE-001] — the Zhongzhiyuan SC-05 Switchback Lab (model testing and validation), the AI Origin SC-02 Open-Source Co-Learning Room (community co-learning), and the Dazhongsi SC-11 Junction Pitch Stage (research transformation). As conceptual operational targets (not approved indicators, not implementation commitments), a measurable, monitorable and feedback-oriented indicator system is recommended over a three-year observation period: learning scenario nodes activated in stages from 12 to 15 or more; the annual "JZ Learning Festival" aggregating ≥50 open-source projects and ≥20 inter-campus co-learning events; the AI-literacy night school reaching ≥100,000 person-times per year in surrounding communities; and cumulative TVS scenario-access evaluations reaching ≥100. These indicators are directional references to be assessed and calibrated by professional operation teams under actual conditions, and do not constitute government assessment indicators or implementation commitments [source:AGENT-TASKBOOK].

## Metrics, Area Recalculation, and Compliance Matrix

Core metrics are all recalculated from the submitted geometry under EPSG:4548 [depth:metrics_recalculation]:

| Metric | Value | Unit | Design meaning | Status |
| --- | --- | --- | --- | --- |
| Overall design area [metric:site_area_sqm] | 11,412,825 | sqm | Overall constraint on spatial allocation | known (provisional) |
| Green ratio [metric:green_ratio] | approx. 8.2% | ratio | Spine and blue-green network support daily interaction and health | known (provisional) |
| Public-space ratio [metric:public_space_ratio] | approx. 0.3% | ratio | Stay-ability of station plazas and node living rooms | known (provisional) |
| Building footprint area [metric:building_footprint_area_sqm] | 134,962 | sqm | Scale of conceptual industrial and public-service carriers | known (provisional) |
| Number of key areas [metric:key_area_count] | 3 | count | Spatial anchors of the three colleges | known |
| AI learning scenario nodes [metric:ai_scenario_node_count] | 12 | count | Quantity of scenario-space-operation mapping | known |
| Renewal projects | 8 | count | Project-based expression of the implementation path | known |
| FAR / building height / density | pending | — | Pending official regulatory conditions | unknown (pending official data) |

Formulas, source files and confidence of every metric are stored in `metrics.json`; pending regulatory indicators are listed in `unknown` status with their preconditions [source:SITE-PACKAGE]. `compliance_matrix.json` covers all tasks 1.3, 1.4 and 1.5 of the announcement and all tasks agent.1–agent.6, giving chapter, layer, metric, drawing, HTML, source, assumption and self-check evidence for each; `standard_matrix.json` covers all mandatory professional standards; `design_depth_matrix.json` covers all required design-depth items [depth:metrics_recalculation]. For formal deepening, the three indicator types (geometry-reproducible, official-regulatory-supported, and operation-data-calibrated) enter `metrics.json`, `assumptions.json` and `compliance_matrix.json` respectively, avoiding operational visions being written as approved planning conditions [standard:MOHURD-CONTROL-DETAILED-PLANNING].

![Core metric recalculation and evidence chain](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

**Bilingual contract**: this proposal uses Chinese as the primary language, with `proposal.en.md` as the complete equivalent translation; `report/proposal.html` and `report/proposal.en.html`, `visual/index.html` and `visual/index.en.html`, the A3/A0 drawings and text-bearing figures all provide Chinese-English bilingual versions, with terminology following the event glossary [source:SITE-PACKAGE].

**Materials and copyright**: this proposal uses only public or rights-cleared materials; sources, licenses and use boundaries are registered in `sources.json`; image, drawing, icon and data assets are described in `report/copyright_statement.md` [source:SOURCE-REGISTRY]. No non-public planning materials, personal privacy data or unauthorized commercial assets are used; place names, station names and institutional names are public information, and the logo direction is an original concept without trademark infringement [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

**Risks and pending materials**: official boundaries and key-area polygons, regulatory-plan indicators, road red lines, existing buildings, ownership, municipal and heritage conditions are all pending materials, listed in `assumptions.json` and the corresponding entries of `missing_data_checklist.csv` [source:PROCESSED-FACT-PACK]. Layers and metrics based on provisional boundaries require full recalculation when official data is released [data:geometry/site_boundary.geojson#SITE-001]. This proposal does not claim official approval, approved regulatory plans, final ownership or guaranteed implementation; AI-generated content is accountable for facts, sources, copyright and expression, and humans and professional teams retain final judgment [source:AGENT-TASKBOOK] [depth:risk_missing_data].

## References

1. Qualification Prequalification Announcement for the Centennial Jing-Zhang AI Innovation Belt International Open Call for Urban Design, Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources (2026-05-09).
2. Excerpt of the Agent open-call taskbook for the Centennial Jing-Zhang AI Innovation Belt open-source urban design call (user-provided, rights-cleared).
3. "Three Zones and Two Wings: Building a World-Class AI Agglomeration", Beijing Municipal Science & Technology Commission and Zhongguancun Administrative Committee (2026-04-03).
4. Haidian "1+X+1" modern industrial system public information (2026-03-02).
5. Measures for the Administration of Urban Design, Ministry of Housing and Urban-Rural Development (2017).
6. Measures for the Formulation and Approval of Regulatory Detailed Planning for Cities and Towns, MOHURD.
7. Guidelines for the Classification of Land for Territorial Spatial Survey, Planning, Use Control (2023), Ministry of Natural Resources.
8. All machine-readable files of the repository site package `brief/site-package/` and the fact pack in `data/processed/`.
9. OpenStreetMap base geographic data (ODbL license, background reference only).
10. Public cases of global AI innovation ecosystems (Stanford–Silicon Valley, Kendall Square, TU Munich, Punggol Digital District, Helsinki, Station F, Yunqi Town, etc.; see `sources.json`).

The complete machine index is in `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json` and `design_depth_matrix.json` [source:SITE-PACKAGE].
