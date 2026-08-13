---
title: "Jing-Zhang AI Spine: Urban Design Proposal for the Centennial Jing-Zhang AI Innovation Belt"
author_github: "oppry12102"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A formal AI urban design package built on provisional boundaries and structured self-check requirements; precision caveats and recalculation requirements are preserved, and the organizer's data gaps do not block content scoring."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# Jing-Zhang AI Spine: Urban Design Proposal for the Centennial Jing-Zhang AI Innovation Belt

## Design Basis and Source List

This formal proposal takes the *Pre-qualification Announcement for the International Solicitation of Urban Design for the Centennial Jing-Zhang AI Innovation Belt*, issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources, as its primary basis, and uses the maintainer-registered provisional rough boundary, key areas, enums, metrics, and source list under `brief/site-package/` as its machine-readable basis. Before generating the proposal, the AI agent must read `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json`, and `data/processed/agent_fact_pack.md`, and use `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, and `missing_data_checklist.csv` to build the task, scope, source-use, and gap inventories. Every design judgment is decomposed into a traceable source, a recomputable metric, a verifiable layer, and a human-reviewable assumption. The announcement requires the proposal to reach regulatory-plan-level urban-design depth and comprehensive-implementation-scheme urban-design depth, so prose cannot replace GeoJSON, metric tables, the A3 booklet, the A0 boards, or the HTML electronic deliverable.

The proposal is not a standalone vision text; it organizes its output from the announcement, the agent taskbook, and the site package, placing only the most relevant evidence next to each judgment [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]. Complete source and standard coverage is kept in `sources.json`, `standard_matrix.json`, and `design_depth_matrix.json`, not duplicated as a machine index in the prose.

The usage boundary of the source registry is as follows [source:SOURCE-REGISTRY]:

- `data/source_registry.json` records the usage boundary of public, cleared, and provisional materials.
- Current registration summary: 7 formal-ready sources, 1 background source, and 1 provisional-only source.
- The agent must not upgrade background_only or provisional_only materials into an official boundary, statutory control, formal scoring basis, or a government implementation commitment.

`data/processed/agent_fact_pack.md` is a reading-navigation layer for this proposal, not a new authoritative source [source:PROCESSED-FACT-PACK]. It helps the agent organize the three-level scope, three key areas, announcement tasks, agent.1 through agent.6, source availability, and missing-data items into a readable proposal; factual judgments must still return to the registered original materials [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK], and complete source relations are kept in `sources.json`.

![Source evidence chain and submission package relationship diagram](assets/figures/site-overview.png)

Because the official `SITE_BOUNDARY` and the three `KEY_AREA` polygons are not yet available, this proposal uses `brief/site-package/geometry/provisional_boundaries.geojson` to produce a temporary formal package. `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` in the package must both be marked `provisional_constraint` and `official_boundary=false`; they may be used only for generation, self-check, visualization, and design discussion, and must not serve as an official redline, approval basis, precise-area basis, or statutory control conclusion. This organizer data gap does not itself block content scoring; after official polygons replace the provisional ones, the site boundary, key areas, land use, roads, green space, public space, buildings, phasing, and metrics must all be recalculated.

The scorable status of this proposal is: **provisional boundary, precision caveats preserved and recalculation deferred until official data is published; content scoring is not blocked**. Accordingly, spatial structure, scenarios, projects, and metrics in the prose are written under the principle of "discussable, reviewable, and recalculable after official boundary replacement." Once the official boundary and key-area polygons are updated, the agent must rerun the scaffold, self-check, and drawing/HTML generation rather than replacing a single file.

Boundary interpretation can return to the overall scope layer and area recalculation [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]. The three key areas are checked by their own layer and a count metric [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count]. The reader can therefore enter the evidence from the prose without first reading a run of machine identifiers.

## Three-Level Scope Framework

The proposal organizes work according to the three levels established by the announcement: the coordinated research area addresses the 43.6 km² AI industry ecosystem, strategic positioning, innovation chain, and future city form; the overall design area addresses the 11.4 km² urban area and industrial zone within 1–2 km of the Jing-Zhang heritage park, requiring an urban-renewal overall framework, industrial space layout, transport and municipal support, and urban character control; the key-area scope addresses 368.4 ha across three detailed-design zones, requiring clear function mix, building scale, retain-renovate-demolish classification, public-space connectivity, and transport organization. The three levels are mapped item by item in `compliance_matrix.json`, ensuring that every mandatory task in announcement 1.3, 1.4, 1.5 and agent.1 through agent.6 has a chapter, layer, metric, drawing, and HTML evidence.

The depth items for the three-level framework are governed by [depth:three_level_scope_framework] and [depth:overall_spatial_structure]; spatial evidence rests on [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#PROV-KEY-001]; the task basis rests on [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]; and the scope index is navigated by the three-level table in `project_scope_summary.csv` under [source:PROCESSED-FACT-PACK].

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

The three levels are not a set of disconnected drawings. The coordinated research determines industry-chain and city-form judgments; the overall design turns those judgments into renewal projects, spatial structure, and facility capacity; the key-area detailed design verifies the implementability of specific parcels, buildings, transport, public space, and AI application scenarios. When generating the proposal, the agent must first lock the official or provisional boundary and constraints adopted for this submission, then generate land use, buildings, roads, green space, public space, phasing, and AI service nodes, and finally recalculate metrics from those layers and explain in prose which conclusions remain limited by the provisional boundary. No area, ratio, scale, or project count that cannot be recomputed from structured data may be written as a formal conclusion.

The overall concept proposed here is the **Jing-Zhang AI Spine**: the Jing-Zhang heritage park serves as the historical and public-space spine; the three key areas — Zhongzhiyuan, the Beijing AI Origin Community, and Dazhongsi — serve as innovation anchors; universities, enterprises, communities, and rail stations serve as the daily network, forming a spatial organization of "one spine, three cores, multiple scenarios, and a blue-green slow-mobility composite loop." The "one spine" is not an additional drawn redline but a translation of the announcement's three levels into a working method; the "three cores" correspond to the three key areas; the "multiple scenarios" correspond to operable nodes for AI+ public services, industry services, and urban life; the "composite loop" corresponds to the linkage of slow mobility, green space, public space, and activity routes.

| Level | Design question | Proposal answer | Data anchor |
| --- | --- | --- | --- |
| Coordinated research area | How to organize the AI industry ecosystem and future city form | Build a "university-sourcing → open-source collaboration → enterprise transfer → public experience → international communication" innovation chain | compliance_matrix.json, standard_matrix.json |
| Overall design area | How to map industrial space, urban renewal, transport, municipal support, and character | Land use, buildings, roads, green space, public space, and phasing layers express it jointly | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-area scope | How the three zones reach detailed-design depth | Propose positioning, spatial moves, AI scenarios, and implementation dependencies separately | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

## Coordinated Research Area: Industry and Future City Research

The core task of the coordinated research area is to build a world-class AI innovation ecosystem. The proposal should inventory Haidian's universities and institutes, leading enterprises, computing/algorithm/data factors, incubation platforms, listed companies, unicorns, and technology-service resources, and propose a spatial coordination framework for the AI innovation chain, industry chain, talent chain, and urban service chain. The agent taskbook requires responding to the "five functions" and the "three areas, two wings" synergy, forming a naming system, visual identity, overall spatial-structure diagram, scenario opening, and operation mechanism that can be further deepened; this section uses [source:AGENT-TASKBOOK] and [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] to mark these requirements as coming from the agent open-call task, not from statutory planning control [depth:overall_spatial_structure].

**Industry-scale anchor (public data)**: Haidian generates more than a quarter of Beijing's GDP (over 1.3 trillion yuan, ~6.4% average annual growth during the 14th Five-Year period) on only ~2.6% of the city's land, with technology-related industries exceeding 70%; its AI core industry reached ~282.2 billion yuan in 2024 (nearly 80% of Beijing's total), hosting 1,900+ AI enterprises (~70% of the city) and 104 registered large models (~70% of the city), forming a full "chip–framework–model–application" chain [source:DATA-HAIDIAN-AI-INDUSTRY]. These public figures show the Jing-Zhang belt is not starting from zero: the design task is to convert the country's densest concentration of AI innovation factors into spatial synergy and public experience, rather than simply expanding R&D floor area. The proposal therefore focuses spatial supply on the interfaces where factors meet and results are transformed.

### Naming System and Visual Identity Direction

The overall concept of this proposal is **"京张智脊"**, in English **Jing-Zhang AI Spine**. "京张" (Jing-Zhang) anchors the historical continuity of the Jing-Zhang Railway and the Jing-Zhang heritage park; "智" (intelligence) anchors the theme of artificial intelligence; "脊" (spine) translates the Jing-Zhang heritage park — a historical and public-space axis — into the spatial image of a "city backbone": an open axis extending northward from Xizhimen and linking the three key areas [source:AGENT-TASKBOOK]. The name does not copy any existing city, park, or enterprise name, but names a new concept along geographic and cultural clues.

The extended naming system is organized as "one spine, three cores, two wings": the one spine is the Jing-Zhang AI Spine; the three cores are the Zhongzhiyuan Full-Stack Autonomous Core, the AI Origin Innovation-Sourcing Core, and the Dazhongsi AI-Native Core; the two wings are the Zhongguancun Technology Service Wing and the Xiaoyue River Scenario Empowerment Wing [source:AGENT-TASKBOOK]. This system translates the announcement's three positionings (Centennial Jing-Zhang Culture Belt, Urban AI Life Experience Belt, AI Integration and Innovation Belt) and five functions into names that can be used daily, marked on maps, and spread through activities, rather than a slogan overlay [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

The visual identity (logo) direction takes the "人"-shaped switchback line of the Jing-Zhang Railway designed by Zhan Tianyou as its graphic motif, superimposing it with the double imagery of neural-network nodes and railway gauge to form a symbol of "historical track × intelligent network." The color system uses "rail steel-gray + heritage-park vegetation-green + computing-blue," corresponding to memory, ecology, and intelligence respectively. This logo direction is only a conceptual proposal / reference scheme; formal application must be deepened by a professional design team with cleared fonts, trademarks, and imagery, and uncleared fonts or marks must not be used directly in this proposal [source:AGENT-TASKBOOK].

The coordinated research does not add pseudo-precise redlines; through the urban character, public space, and building-layout coordination required by [standard:MOHURD-URBAN-DESIGN-MEASURES], it links back to [data:geometry/land_use.geojson#LU-001], [data:geometry/public_space.geojson#PUBLIC-001], and [depth:overall_spatial_structure], showing that industrial strategy must ultimately land in a visible, reviewable spatial structure.

Future city-form research should answer how artificial intelligence changes work, life, social interaction, learning, transport, and public services. The proposal should materialize the AI transport system, continuous green space, innovation service facilities, and an internationalized live-work atmosphere into locatable functional zones, nodes, corridors, and scenarios, rather than describing a technology vision in generalities. The agent should write industry-strategy metrics, an AI innovation index, talent density, spatial supply types, and AI+ vertical-application key areas into the metric system, marking which are official, which are design proposals, and which still await official data calibration. Any proposed global AI innovation event, developer community, open scenario, or pilgrimage route must be written as a "conceptual proposal / reference scheme / for professional teams to deepen," not as an already-determined government activity or implementation arrangement.

### Global AI Innovation Ecosystem Cases

The agent taskbook requires 5–8 global AI innovation ecosystem cases to illustrate mechanisms that a "world-class AI innovation ecosystem" can borrow, rather than copying a list or fabricating enterprise, investment, or output data [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The following six cases come from publicly verifiable innovation-district research, focusing on borrowable points that can be converted into spatial and operational mechanisms:

| Case | Core mechanism | Borrowable conversion for this proposal |
| --- | --- | --- |
| Silicon Valley Sand Hill Road–Stanford corridor | University sourcing, venture capital, and a high-density talent network meet frequently at walking scale | Weave the "university–enterprise–public space" of the three cores into a walkable innovation network and strengthen informal interaction space [depth:overall_spatial_structure] |
| Shenzhen Nanshan–Yuehai Street | "Innovate upstairs, manufacture downstairs" rapid-iteration ecosystem plus government scenario opening | Set low-cost shared testbeds and edge-computing nodes in Zhongzhiyuan, opening test-and-validation scenarios as public goods [depth:land_use_layout] |
| London King's Cross | Knowledge campus merged with urban renewal; AI firms move into a historic industrial district | Compound the Jing-Zhang heritage park's industrial-heritage regeneration with industry space and public space, forming a "heritage–industry–life" renewal paradigm [depth:blue_green_public_space] |
| Toronto Vector Institute and MaRS District | Talent attraction, enterprise landing, and public research form a triangular synergy | Build a "near-campus incubation → talent special zone → result release" corridor in the AI Origin Community to complete result-transfer space [depth:three_key_area_detailed_design] |
| Singapore one-north | Government-led vertically mixed "work–live–learn" campus linked by public space | Link the three cores with a blue-green slow-mobility composite loop and organize mixed functions and public-space nodes around stations [depth:traffic_rail_slow_parking] |
| Munich Bavarian AI cluster | A strong manufacturing region layered with AI applications, opening scenarios to traditional industry | Rely on the Zhongguancun Technology Service Wing to direct AI scenario opening toward advanced manufacturing, content consumption, and urban governance [depth:overall_spatial_structure] |

These cases serve only as mechanism references and do not constitute an investment-attraction list, investment commitment, or policy conclusion; their realization depends on formal planning, property rights, and operational conditions [source:AGENT-TASKBOOK].

### Regional Coordination Mechanism (Three Areas, Two Wings, and Jing-Jin-Ji)

The agent taskbook requires responding to regional innovation coordination with the Beiwei Community, the Future Science City, the Huairou Science City, the Economic-Technological Development Area, and the broader Jing-Jin-Ji region [source:AGENT-TASKBOOK]. This proposal turns coordination from naming into executable mechanisms, nodes, and cooperation flows, avoiding a "three areas, two wings" that stops at slogans [depth:overall_spatial_structure]:

| Coordination partner | Coordination mechanism | Node / cooperation flow | Role for this belt |
| --- | --- | --- | --- |
| Zhongguancun Technology Service Wing (in-area) | Shared technology services | Legal, IP, investment, and computing services laid out along the Jing-Zhang slow-mobility belt | Turns R&D output into landed enterprises |
| Xiaoyue River Scenario Empowerment Wing (in-area) | Scenario-open enclave | Reservable test scenarios for urban governance, healthcare, and education | Provides AI+ scenario verification and display |
| Beiwei Community (Haidian) | Talent and living-support coordination | Job-housing balance, talent apartments, and community services linked | Stabilizes young innovation talent supply |
| Future Science City (Changping) | Basic research–transfer relay | Joint labs, pilot lines, and a result-transfer corridor | Receives source innovation and localizes it |
| Huairou Science City (Huairou) | Large science facilities + AI fusion | Computing and scientific-data docking, cross-domain research collaboration | Provides facility-grade computing and scientific problems |
| Economic-Technological Development Area (Yizhuang) | Advanced-manufacturing scenario feedback | Manufacturing scenario opening, edge-device testing | Directs AI scenarios toward physical manufacturing |
| Jing-Jin-Ji | Standard mutual recognition and activity linkage | Activity-week sub-venues, standard recognition, talent mobility | Raises the belt's international standing and radiation |

The above coordination items are all conceptual proposals / cooperation-mechanism directions requiring formal negotiation among the relevant parties; they do not constitute already-determined government arrangements or cooperation agreements [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### AI Innovation Ecosystem Map

The Haidian innovation ecosystem is organized along six rings — "sourcing–incubation–transfer–demonstration–governance–communication" — with each ring anchored to a locatable node [depth:overall_spatial_structure]:

| Ecosystem ring | Representative actor types | Spatial anchor | Carrier provided by this proposal |
| --- | --- | --- | --- |
| Sourcing | Universities, basic-research platforms | Around Tsinghua, Peking, Beihang, and BFA | Near-campus result-transfer street, open-source community |
| Incubation | Incubators, makerspaces | Origin Community, Zhongzhiyuan | Shared testbeds, incubation space |
| Transfer | Listed firms, unicorns, leading enterprises | Dazhongsi, Zhongguancun Technology Service Wing | International roadshow hall, result release |
| Demonstration | Scenario opening, pilot blocks | Jing-Zhang slow-mobility belt, communities | Sandbox, sample street, computing stations |
| Governance | Standards, safety, data factors | Zhongzhiyuan, data-factor reception hall | Governance sandbox, audit desk |
| Communication | Activities, brand, international exchange | One-spine public-space system | Activity week, pilgrimage landmarks, contribution wall |

This map turns the "world-class AI innovation ecosystem" from abstract description into a locatable, operable ecosystem layering [source:AGENT-TASKBOOK].

**Spatial base of the origin ring (public data)**: the ~9 km Jing-Zhang heritage-park green corridor runs straight through the densest cluster of universities and research institutes in China — Beijing Jiaotong University at the southern Xizhimen end; along Xueyuan Road in the middle, Beihang University, University of Science and Technology Beijing, China University of Geosciences (Beijing), China University of Mining and Technology (Beijing), Beijing Language and Culture University, Beijing Forestry University, and China Agricultural University (East Campus), plus CAS institutes (Research Center for Eco-Environmental Sciences, Institute of Semiconductors, Institute of Acoustics); and Tsinghua University and Peking University around Wudaokou in the north [source:DATA-ALONG-UNIVERSITIES]. This is not an abstract talent pool but a physical network that can be walked and cycled along the main spine. The "campus-adjacent innovation street" converts this existing institute chain into a continuous lab-to-prototype-to-market corridor via slow-mobility stitching and open-source community interfaces; Haidian's ~415,000 enrolled students, 181 primary/secondary schools, and 220 kindergartens [source:DATA-HAIDIAN-EDUCATION] underpin the daily service needs of the "university members" and "nearby residents" personas.

### Brand Board and Public-Space Component Library

The brand board (conceptual) takes the "Jing-Zhang AI Spine" master brand plus the "one spine, three cores, two wings" extended names as its skeleton, defining four kinds of reusable assets [source:AGENT-TASKBOOK]:

- **Logo motif**: the Jing-Zhang Railway's "人" (herringbone) switchback × neural-network nodes × double track-gauge imagery, with a steel-gray / vegetation-green / computing-blue three-color system.
- **Application specifications (concept)**: minimum specs for four application classes — signage, boards, event materials, and digital media (safe space, minimum type size, bilingual correspondence, color-usage boundary).
- **Public-space component library (concept)**: eight standardized components — seating, signage, lighting, shading, information screens, code wall, testbed enclosure, and accessibility facilities — for reuse across the three key areas and the slow-mobility belt.
- **International communication application**: bilingual naming, bilingual event-week visuals, and bilingual signage for the international roadshow hall, ensuring global recognizability.

All brands, fonts, images, portraits, and enterprise marks must be used only after clearance; this package provides only conceptual directions and contains no uncleared finished Logo image [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The overall design area must reach regulatory-plan-level urban-design depth. The proposal must propose an urban-renewal overall spatial structure, inefficient-space identification, a renewal project list, implementation policy suggestions, industry-function ratios, spatial organization models, total building scale, and a comprehensive carrying-capacity assessment. `geometry/land_use.geojson` should fully cover the design boundary without overlap; `geometry/buildings.geojson` should express renewed or retained building footprints; `geometry/roads.geojson` should express micro-circulation, slow mobility, and rail interchange relations; `metrics.json` should recalculate core areas, ratios, and layer counts.

This section decomposes regulatory-plan-depth content into reviewable objects under [standard:MOHURD-CONTROL-DETAILED-PLANNING]: [data:geometry/land_use.geojson#LU-001] expresses land-use structure, [data:geometry/buildings.geojson#BLDG-001] expresses building footprints, [data:geometry/roads.geojson#ROAD-001] expresses transport organization, [metric:building_footprint_area_sqm] is used to check building footprint area, and [depth:land_use_layout] and [depth:development_intensity_controls] govern output depth.

The overall design must also support transport, rail, municipal infrastructure, and supporting facilities. The proposal should propose spatial layouts and implementation paths around rail-station integration, road micro-circulation, non-motorized parking, parking supply, innovation service platforms, talent life services, new infrastructure, distributed energy, and edge computing. Where official control conditions for building height, development intensity, road redlines, setbacks, and facility standards are absent, they must be written as "pending official regulatory conditions," not passed off as approved indicators using agent guesses.

## Detailed Design of Key Areas

Detailed design of the key areas is mandatory. The Zhongzhiyuan AI Autonomous Acceleration Area should propose detailed schemes around the national AI platform, full-stack autonomous innovation, standard-setting, safety governance, industry display, external transport, Qinghe river culture, low-carbon green innovation interaction, and AI scenarios in green space. The Beijing AI Origin Community should propose detailed schemes around near-campus innovation, incubation and transfer of results, a talent special zone, the open-source system, brand activities, building retain-renovate-demolish, result display and release, living support, campus-park slow-mobility links, and rail-station integration. The Dazhongsi AI Industry Cluster should propose detailed schemes around leading enterprises, intelligent agents, intelligent terminals, content consumption, data factors, digital assets, commercial services, compound use of planned green space, Dazhongsi station integration, and four-quadrant pedestrian connectivity at the intersection.

The detailed design of the three key areas must cite [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], and [data:geometry/key_areas.geojson#PROV-KEY-003], and [depth:three_key_area_detailed_design] checks whether comprehensive-implementation-scheme depth is reached. If the scheme only describes "building a demonstration zone" without function, building, transport, public-space, and implementation-project evidence, it should be treated as incomplete.

![Three key areas index and design task diagram](assets/figures/key-areas.png)

The three key areas must appear in `geometry/key_areas.geojson`. If the repository provides official polygons, they should be used as `official_constraint`; if official polygons are missing, `provisional_constraint` may be used temporarily, but the prose, HTML, sources, assumptions, and self-check must state that it cannot serve as a formal scoring or approval basis. `compliance_matrix.json` should cover announcement 1.5.3.1, 1.5.3.2, and 1.5.3.3 respectively. The design expression should include function mix, building scale, building form, retain-renovate-demolish classification, the public-space system, transport organization, slow-mobility connectivity, and implementation projects. The HTML page should switch between the three key areas, and the A3 booklet and A0 boards should include at least a key-area master plan, local detail drawings, and metric explanations.

| Key area | Design positioning | Spatial moves | AI industry and operation scenarios | Evidence |
| --- | --- | --- | --- | --- |
| Zhongzhiyuan AI Autonomous Acceleration Area | Garden-style full-stack autonomous innovation district | Strengthen the Qinghe interface, industry display, low-carbon innovation interaction, and external transport; carry open testing and standard-governance display in green space | Autonomous model testing, standard-setting workshops, safety-governance display, low-carbon computing experience | [data:geometry/key_areas.geojson#PROV-KEY-001], [depth:three_key_area_detailed_design] |
| Beijing AI Origin Community | Near-campus result-transfer and talent community | Organize campus-park-district slow-mobility stitching; complete result release, talent services, living, and open-source collaboration space | Open-source community, result release, talent special-zone services, near-campus incubation | [data:geometry/key_areas.geojson#PROV-KEY-002], [source:AGENT-TASKBOOK] |
| Dazhongsi AI Industry Cluster | Urban-style intelligent-economy and international-exchange district | Around Dazhongsi station integration, four-quadrant pedestrian connectivity, commercial services, and public-environment renewal of key enterprises | Intelligent-agent and terminal display, content consumption, data factors, and international roadshows | [data:geometry/key_areas.geojson#PROV-KEY-003], [metric:key_area_count] |

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

The proposal should build spatial demand personas for AI talent and enterprises, covering R&D offices, open-source collaboration, result release, enterprise services, talent housing, social learning, consumption and life, sports and leisure, and international exchange. AI+ scenarios should follow the directions named in the announcement — transport, services, consumption, healthcare, education, law, and life services — forming industry-development scenarios and AI-enabled urban-function scenarios. Each scenario should state its service object, spatial location, data source, privacy boundary, human review mechanism, and operating entity.

AI scenarios must land on spatial and governance boundaries: public-space scenarios cite [data:geometry/public_space.geojson#PUBLIC-001], slow-mobility and transport scenarios cite [data:geometry/roads.geojson#ROAD-001], and open-space scenarios cite [data:geometry/green_space.geojson#GREEN-001] together with [metric:public_space_ratio] and [metric:green_ratio]. These citations let reviewers see that a scenario is not a slogan but a design object in a specific layer and metric. The agent taskbook requires at least 10 AI scenario cards, at least 3 industry test-and-validation scenarios, and at least 5 user personas; this proposal has written the scenario cards, persona table, privacy boundary, human review, and operating entities into the prose, HTML, A3/A0, and compliance matrix [source:AGENT-TASKBOOK].

| Persona | Typical needs | Spatial response | Self-check boundary |
| --- | --- | --- | --- |
| Open-source developer | Release, collaboration, testing, community reputation | Origin Community open-source release hall, public code wall, night collaboration space | No personal behavior tracking; activity data aggregated only |
| Startup team | Low-cost office, computing access, product testbed | Zhongzhiyuan shared testbed, edge-computing service point, standard-governance consultation | Computing and data services require separate authorization |
| Leading-enterprise visitor | Display, business, international reception, talent recruitment | Dazhongsi international roadshow hall, rail-station interchange, key-enterprise surrounding public space | Enterprise marks and cases must be cleared |
| Nearby resident | Commuting, leisure, community services, low-disturbance renewal | Jing-Zhang heritage park slow-mobility loop, embedded community services, night lighting and activity grading | Resident personas are not used for commercial recommendation |
| University student and faculty | Result transfer, cross-campus collaboration, daily slow mobility | Campus-park slow-mobility stitching, result-transfer stations, AI education experience points | Campus data and research results require authorization |

The proposal separately addresses vulnerable and digitally marginalized groups: older adults, children, people with disabilities, low-digital-literacy users, night workers, and low-income groups are not included in commercial profiling [depth:metrics_recalculation]. Public spaces and scenarios provide continuous accessible paths, non-intelligent human-service alternatives, low-cost usage options, and safe night lighting, and add "accessibility coverage, non-intelligent alternative reachability, and low-cost service-point count" to scenario KPIs to avoid digital exclusion [source:AGENT-TASKBOOK].

The table below expands the ten scenario cards into a "scenario–space–data–model–operation–governance" matrix, listing per card the data source and privacy boundary, AI input/output and model responsibility, operating entity, failure fallback and evaluation metrics, and spatial facility needs, so scenarios are operable objects rather than slogans [source:AGENT-TASKBOOK] [depth:metrics_recalculation].

| Scenario | Spatial carrier | Data source & privacy boundary | AI input/output & model responsibility | Operating entity | Fallback · KPI · spatial facilities |
| --- | --- | --- | --- | --- | --- |
| 01 Open-source release hall | Beijing AI Origin Community | Public code/contribution records, aggregated only, no individual tracking | Content display/retrieval, no personal profiling, human-reviewable output | Open-source community + park operator | Human review + takedown; KPI=release sessions/participants; facilities=hall + code wall |
| 02 Safety-governance sandbox | Zhongzhiyuan | Public evaluation samples, authorized red-teaming | Safety evaluation/red-teaming, sandbox isolation, failure rollback | Standards body + park operator | Sandbox isolation + rollback; KPI=evaluation sessions/pass rate; facilities=lab + display |
| 03 Edge-computing station | Overall-design-area nodes | Anonymous compute load, no personal data | Scheduling and energy optimization, degradable | Operator + energy authority | Degraded service + manual switch; KPI=utilization/energy; facilities=edge node + storage |
| 04 AI slow-mobility navigation | Jing-Zhang heritage park vitality belt | Low-intrusion sensing (anonymous), no identity capture | Gap/crowding identification, explainable output | Park operator | Manual signage fallback; KPI=continuity/accessibility coverage; facilities=signage + sensors |
| 05 Dazhongsi international roadshow hall | Dazhongsi AI Industry Cluster | Public enterprise display materials (after clearance) | Multilingual display, no commercial inference | Business operator | Content review + removal; KPI=roadshow count/international reception; facilities=hall + meeting |
| 06 Qinghe low-carbon innovation corridor | Zhongzhiyuan Qinghe interface | Public environmental monitoring data | Energy/stormwater analysis, alert output | Park operator + water authority | Flood alert + timed opening; KPI=waterfront reachability; facilities=walkway + station |
| 07 Near-campus result-transfer street | Beijing AI Origin Community | Public result catalog (after authorization) | Match recommendation, published after human review | Incubation operator | Human review + exit; KPI=transfer projects/occupancy; facilities=incubation + display |
| 08 Data-factor reception hall | Dazhongsi area | Compliant authorized data, de-identified | De-identification and audit, no raw-data output | Data operator | Audit + takedown; KPI=authorized transactions/compliance; facilities=hall + audit desk |
| 09 AI life-service sample street | Community-commercial intersection | Public service info, no resident profiling | AI+ service suggestions, human review | Community + service providers | Human service alternative; KPI=satisfaction/reachability; facilities=stations + accessibility |
| 10 Global AI activity-week route | One-spine public-space system | Activity reservations (aggregated), no individual tracking | Flow optimization, explainable | Brand operator | Reservation + safety plan; KPI=participation/international reach; facilities=signage + nodes |

AI governance suggestions generated by the agent must obey data minimization, public sources, explainability, and human review. Urban intelligent agents can help identify slow-mobility gaps, public-space heat, facility maintenance, enterprise service demand, and event safety risk, but they cannot replace planning approval, cannot output unauthorized personal profiling, and cannot claim an official implementation commitment. All AI scenario nodes should enter the structured layers or the compliance matrix so reviewers can see their relation to industry, space, and public interest.

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The land-use scheme should be expressed according to public standards such as territorial-space survey, planning, and use-control classification, forming a complete, closed, seamless land-use partition. The building scheme should distinguish retained, renovated, renewed, new, or pending objects, clarifying the suggested levels of building footprint, function, scale, character, roof, massing, and height control. Where current buildings, property rights, regulatory controls, and engineering conditions are missing, the proposal may only propose methods and a to-be-calibrated list, and must not fabricate retain-renovate-demolish conclusions.

Land-use classification follows [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; building height, massing, interface, and character control are governed by [depth:height_massing_character]; and the retain-renovate-demolish method is governed by [depth:retain_renovate_demolish]. The main evidence for land use and buildings is [data:geometry/land_use.geojson#LU-001], [data:geometry/buildings.geojson#BLDG-001], and [metric:building_footprint_area_sqm].

Building scale and intensity metrics must be consistent with `metrics.json` and the layers. Where total building scale, floor area ratio, building height, building density, green ratio, setbacks, and building control lines lack official conditions, they should uniformly use `status=unknown` and explain in `reason` / `assumptions` the pending conditions, current assumptions, and the recalculation path once official data arrives, rather than manufacturing a sense of precision with fixed numbers. The A3 booklet should give a renewal project list and metric-recheck table; the A0 boards should express the key spatial structure and key areas clearly; the HTML page should provide linked viewing of metrics and layers.

## Transport, Rail, Municipal Infrastructure, and Public Services

The transport scheme should respond to the announcement's requirements on rail-station integration, road micro-circulation, slow-mobility gaps, external transport, parking, non-motorized parking, and the green transport system. It should focus on the North Fifth Ring Road, the Jing-Zhang heritage park cross-ring node, Wudaokou, Tsinghua East Road West Station, Dazhongsi Station, and transport links around key enterprises. Road and slow-mobility layers should stay within the submission boundary and cross-check with public space, green space, industry nodes, and key areas; if the submission boundary is provisional, transport conclusions may only serve as temporary design discussion.

Transport and municipal professional depth are governed by [depth:traffic_rail_slow_parking] and [depth:municipal_new_infrastructure] respectively; layer evidence cites [data:geometry/roads.geojson#ROAD-001], [data:geometry/public_space.geojson#PUBLIC-001], and [data:geometry/constraints.geojson#CONSTRAINTS]. Where road redlines, pipelines, fire safety, and municipal conditions are missing, they should be stated as pending via assumptions, not written as approved conditions.

**Commuting base and scenario-KPI anchors (public data)**: Beijing's rail transit carried ~9.9 million trips/day network-wide in 2024 (~11.19 million on workdays); Metro Line 13, which runs through the belt, peaks at ~1.6 million trips/day — the city's most crowded northern commuter corridor — and is being split into Lines 13A/13B with ~19 new stations to add capacity [source:DATA-RAIL-METRO-RIDERSHIP]. Meanwhile the Beijing–Zhangjiakou HSR (opened 2019-12-30) has carried ~57.42 million cumulative passengers (to Jan 2025); its released ground segment between Beijing North and Qinghe became the heritage park, and Qinghe station is now a tri-rail hub (HSR + Line 13 + Changping Line) with holiday peaks of ~44,500 departures/day [source:DATA-JINGZHANG-HSR]. These ridership figures directly support two design judgments: station integration and slow-mobility gap repairs must serve high-intensity commuter flows, and the KPI baselines of scenarios such as "AI slow-mobility navigation" and the "Global AI Activity Week route" (e.g. slow-mobility continuity, event attendance) should be set against this commuting base rather than assumed arbitrarily.

![Transport, slow mobility, and blue-green public space composite system diagram](assets/figures/mobility-bluegreen.png)

Municipal and public-service facilities should cover AI industry service facilities, innovation service platforms, talent life-service facilities, new infrastructure, distributed energy, edge computing, and the integration of traditional municipal facilities. The proposal should state facility standards, spatial layout, service radius, operation model, and phasing logic. Where pipeline, energy, drainage, flood control, and fire safety engineering data are missing, they must be listed as formal-deepening preconditions.

## Blue-Green Network, Public Space, and Urban Character

The blue-green scheme should take the Jing-Zhang heritage park vitality belt as its skeleton, coordinate the travel needs of the Qinghe and Xiaoyue rivers and surrounding universities, enterprises, and communities, and propose a north-south continuous, east-west connected walking, cycling, and green-space system. The proposal should identify slow-mobility gaps, cross-ring nodes, and the southern and northern landscape nodes of the park, proposing compound use strategies for parking, sports, innovation interaction, technology testing, application display, and public services.

Blue-green public space is cross-checked by a design-depth item and the green-space and public-space layers [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]. The design meaning of green-space and public-space ratios is explained in prose, with full recalculation kept in `metrics.json`; the coordination of urban character, public space, and building control returns to the professional standard matrix [standard:MOHURD-URBAN-DESIGN-MEASURES].

The urban character scheme should fuse Jing-Zhang Railway historical culture, Zhongguancun innovation culture, and AI innovation culture, using cultural resources such as the Tsinghua Park Railway Station and the Beijing Film Academy area, and propose guidance on urban tone, building character, roof form, massing, interface, and public art. The agent should also propose signage, cultural symbols, an international communication narrative, AI pilgrimage landmarks, and a contribution wall or honor-display system, but all brands, fonts, images, portraits, and enterprise marks must have cleared sources. Character control should separate official control, design suggestions, and pending conditions, and must not produce pseudo-precise control lines without heritage-protection or regulatory evidence.

### AI Pilgrimage Landmarks and Honor-Display System

The agent taskbook requires at least 3 AI pilgrimage landmarks or honor-display nodes [source:AGENT-TASKBOOK]. This proposal offers three conceptual landmarks, all positioned as "open co-creation proposals / reference schemes" that require professional design deepening, heritage and green-space review, and font/image clearance before implementation, and do not constitute approved construction:

1. **Jing-Zhang Zero-Kilometer · AI Timeline** (southern public space of the Jing-Zhang heritage park): juxtaposes the industrial memory of the Jing-Zhang Railway's 1909 opening with the development of artificial intelligence as a walkable, reachable public narrative axis, serving as the pilgrimage starting point "from steam to intelligence" [data:geometry/public_space.geojson#PUBLIC-001] [depth:blue_green_public_space].
2. **Open-Source Contribution Wall** (Beijing AI Origin Community): publicly displays open-source community contributors, models, and code milestones in an updatable, clearable, human-auditable way, as the spiritual landmark of the developer community; displayed content must remove personal privacy and obtain attribution authorization [data:geometry/key_areas.geojson#PROV-KEY-002].
3. **Future City Testbed** (Zhongzhiyuan Qinghe interface): translates the testing process of full-stack autonomous innovation, standard-setting, and safety governance into a visitable, reservable, regulated public testbed, making "testing" itself a city-perceivable scene [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design].

The honor-display system shares one rule set with the three landmarks: the contribution wall, milestone wall, and annual lists record only public, verifiable, clearable content, do not collect personal behavior trajectories, do not output unauthorized personal profiles, and keep a human takedown and correction channel [source:AGENT-TASKBOOK]. All landmarks must not be over-entertained, sensationalized, or vulgarized, and must not violate heritage-protection, green-space, blue-line, or traffic-safety constraints [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Renewal Projects, Implementation Policy, and Phasing

The implementation scheme should form a reviewable renewal project list stating project location, type, function, responsible entity, dependencies, implementation stage, risks, and evaluation metrics. Policy suggestions should cover coordinated urban-renewal implementation, spatial supply, operation mechanisms, industry services, public participation, data governance, and property-right coordination. `geometry/phasing.geojson` should express phasing extents, and `compliance_matrix.json` should link every task to phasing and drawings.

The project list and phasing depth are governed by [depth:renewal_project_list] and [depth:phasing_implementation], with phasing spatial evidence at [data:geometry/phasing.geojson#PHASE-001]. Without property rights, funding, implementation entities, and approval paths, the proposal must write them as implementation risks, not as commitments to deliver.

The renewal project list is expanded along "lead/participating roles → prerequisites → cost level → time window → KPI → human fallback → long-term governance", so each project is not just a name and dependencies but an implementation skeleton that professional teams can deepen [depth:renewal_project_list]. Cost levels are relative magnitudes (low / low-mid / mid / mid-high), not investment estimates; time windows are post-solicitation advancement indications, not government scheduling commitments.

| Project code | Project name | Type | Lead / participating roles | Prerequisites | Cost · time window | KPI | Human fallback & governance |
| --- | --- | --- | --- | --- | --- | --- | --- |
| JZ-01 | Jing-Zhang heritage park slow-mobility gap stitching | Public space / transport | District housing + park operator + subdistrict | Road redline, under-bridge space, traffic review [data:geometry/roads.geojson#ROAD-001] | Low-mid · 1–2 yr | Continuity rate, gaps closed | Detour plan + temporary barriers + night lighting; park–transport joint meeting |
| JZ-02 | Zhongzhiyuan Qinghe innovation interface | Blue-green / industry display | Park operator + water authority | River blue line, ecology, flood control [data:geometry/green_space.geojson#GREEN-001] | Mid · 2–3 yr | Waterfront reachability, showcase count | Flood alert + timed opening; blue-line review |
| JZ-03 | Origin Community near-campus result-transfer street | Urban renewal / industry service | Campus + operator + subdistrict | Campus boundary, property rights, ground-floor mix [data:geometry/buildings.geojson#BLDG-001] | Mid · 2–5 yr | Transfer projects, occupancy | Professional review of existing buildings + phased opening |
| JZ-04 | Dazhongsi station four-quadrant pedestrian connectivity | Rail integration / slow mobility | Rail group + transport + subdistrict | Station, intersection, utilities [data:geometry/public_space.geojson#PUBLIC-001] | Mid-high · 3–5 yr | Quadrant connectivity, transfer time | Temporary underpass + signage; traffic review |
| JZ-05 | AI public services and edge-computing nodes | New infrastructure / public service | Operator + energy authority | Energy, compute, safety, operator [data:geometry/constraints.geojson#CONSTRAINTS] | Mid · phased | Compute utilization, service reach | Data minimization + human review; tiered sandbox opening |
| JZ-06 | Global AI activity-week public route | Operation / brand | Brand operator + public-space manager | Public-space permit, event safety, IP clearance [data:geometry/phasing.geojson#PHASE-001] | Low · annual | Participation, international reach | Reservation + safety plan; annual review |

Phasing must be distinguished from the 100-day solicitation design period: the solicitation period is a submission deadline, while implementation phasing is the advancement path of urban renewal and project construction. The proposal should propose a near-term pilot, mid-term renewal, and long-term governance framework, marking which content can start with lightweight facilities, operational activities, and service platforms, and which must await formal regulatory, municipal, transport, and property-right conditions. For the annual activity system, developer community operation, scenario open days, public experience routes, and international communication mechanisms, the prose should state the operating object, frequency, responsibility boundary, conversion path, and risk, not just promotional slogans.

### Global AI Innovation Activity System and Long-Term Operation

The agent taskbook requires responding to the annual activity system, activity brand, developer community operation, scenario open operation, public experience route, and international communication and attraction-conversion mechanism [source:AGENT-TASKBOOK]. The following arrangements are all conceptual proposals / for professional teams to deepen, not already-determined government activities or investment-attraction commitments [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

**Annual activity system** is organized as "four seasons, one theme each" to avoid one-off momentum without follow-up: spring is the "Open-Source Season," organizing open-source release and collaboration weeks for universities and developers; summer is the "Scenario-Opening Season," opening reservable test scenarios around urban governance, transport, healthcare, and education; autumn is the "International Release Season," holding result releases and international roadshows; winter is the "Governance and Standards Season," running public discussions on AI safety, standards, and governance. Each seasonal activity must state its operating object, frequency, responsibility boundary, and data boundary, not just the activity name [depth:phasing_implementation].

**Brand IP system** takes "Jing-Zhang AI Spine" as the master brand, extending activity visuals, signage, and communication templates; all fonts, images, and enterprise marks must be cleared, and brand assets settle into the belt's long-term knowledge base [source:AGENT-TASKBOOK].

**Developer community operation mechanism** relies on the AI Origin Community and the Open-Source Contribution Wall to build a "contribution–attribution–incentive–governance" community rule set; community data is aggregated only, no personal behavior trajectories are collected, and human review and exit mechanisms are retained [data:geometry/key_areas.geojson#PROV-KEY-002].

**AI scenario open-operation mechanism** turns the test-and-validation scenarios in the scenario cards into a reservable, regulated, auditable sandbox opening process, clarifying data minimization, public sources, explainability, and human review boundaries; test scenarios must not be written as approved operations [source:AGENT-TASKBOOK].

**Public experience route** organizes a "from Zero Kilometer to the Future City Testbed" pilgrimage route along the Jing-Zhang heritage park and the blue-green slow-mobility composite loop, linking the three cores and three landmarks for walking, cycling, and reserved visits [data:geometry/green_space.geojson#GREEN-001].

**International communication and attraction-conversion mechanism** turns brand attention into follow-up conversion paths for talent, enterprises, and projects through the international roadshow hall, result releases, and the developer community; whether conversion materializes depends on formal planning, policy, and property-right conditions, and must not be written as a definitive commitment [source:AGENT-TASKBOOK].

## AI Planning Method Workflow (Diagnose–Generate–Simulate–Review–Iterate)

The AI planning method here is not a one-shot generation but a reproducible five-step workflow [depth:metrics_recalculation]:

1. **Diagnose**: identify existing conditions, gaps, and limits from the provisional boundary, constraint layers, and the missing-data checklist [data:geometry/constraints.geojson#CONSTRAINTS].
2. **Generate**: generate land-use, building, road, green-space, public-space, and phasing layers from the three-level scope and three-core positioning.
3. **Simulate**: recalculate area, green ratio, public-space ratio, and building footprint under EPSG:4548.
4. **Review**: run the deterministic / spatial / visual / professional four-gate self-check and manually spot-check the figures.
5. **Iterate**: after official polygons replace the provisional ones, or after receiving review feedback, rerun the scaffold, self-check, and drawing/HTML generation.

This workflow ensures that every "diagnose–generate–simulate–review–iterate" step has traceable layer, metric, or self-check evidence [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Metrics, Area Recalculation, and Compliance Matrix

The metric system should at least include overall design area, key-area areas, green-space and public-space ratios, building footprints, renewal project count, AI scenario nodes, slow-mobility connectivity metrics, industry-space metrics, talent-service metrics, and self-check status. All `known` metrics must be recomputable from GeoJSON or trusted sources; `unknown` metrics must state the reason and the formal-submission precondition. The results of `scripts/spatial_review.py` and `scripts/visual_review.py` are important evidence for the formal self-check.

Metric recalculation follows the unified design-depth requirement [depth:metrics_recalculation]. The prose focuses on the design meaning of each metric — for example, how the overall scope constrains spatial allocation, and how blue-green and public-space ratios support daily interaction; complete values, formulas, source files, and confidence are kept in `metrics.json`. Example key metrics can be rechecked from the overall scope and green-space data [metric:site_area_sqm] [data:geometry/green_space.geojson#GREEN-001].

![Core metric recalculation and evidence chain diagram](assets/figures/metrics-evidence.png)

The compliance matrix is the master control file for task responsiveness. Every announcement task and agent taskbook task must map to a report chapter, layer, metric, drawing, HTML page, source, assumption, and self-check item. If any mandatory task in announcement 1.3, 1.4, 1.5 or agent.1 through agent.6 is uncovered, the proposal must not enter formal professional scoring.

For formal deepening, the agent should also split each metric into three classes: the first is spatial metrics directly recomputable from submission geometry, such as boundary area, green ratio, public-space ratio, building footprint area, and phasing area; the second is control metrics requiring official regulatory or taskbook-annex support, such as floor area ratio, building height, building density, setbacks, road redlines, and facility standards; the third is performance metrics requiring continuous operation or industry-data calibration, such as the AI innovation index, talent density, industry-service satisfaction, slow-mobility accessibility, activity participation, and scenario-use frequency. The three classes should enter `metrics.json`, `assumptions.json`, and `compliance_matrix.json` respectively, avoiding writing operation vision as approved planning conditions.

## Risk, Copyright, and Compliance

**Bilingual delivery is required.** The primary proposal may be in Chinese or English, but must provide a complete counterpart translation via `proposal.en.md` or `proposal.zh.md`; A3/A0, HTML, and text-bearing figures must also provide language counterparts, preferentially using the recommended translations in `docs/terminology-glossary.md`. A v2 package missing any required translation, language mapping, or valid file will be blocked by finalize and CI. All images, drawings, icons, data, and code assets must state their source, license, and authorization status in `sources.json` or `report/copyright_statement.md`. HTML pages must not load remote scripts, remote map tiles, remote fonts, iframes, forms, or external APIs, and must not track reviewer behavior.

The risk and missing-data list is cross-checked by the risk depth item, the constraints layer, and the site package [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS] [source:SITE-PACKAGE]. The official boundary, key area, regulatory, road, parcel, building, municipal, heritage, and public-service gaps listed in `missing_data_checklist.csv` must enter `assumptions.json`, the self-check, and the prose risk section. Any conclusion lacking official regulatory, road-redline, property-right, municipal, fire safety, or heritage conditions must be downgraded to a pending item; complete professional cross-checking is kept in the standard matrix.

This proposal claims no official approval, approved regulatory control, final land property rights, final construction scale, or guaranteed implementation. The AI agent is responsible for facts, sources, copyright, spatial data, metrics, and expression; maintainers and professional reviewers may request revision or rejection based on self-check results, spatial review, and the compliance matrix.

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- data/processed/agent_task_requirements.csv
- data/processed/source_use_matrix.csv
- data/processed/missing_data_checklist.csv
- Complete machine index: see `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, and `design_depth_matrix.json`
- Bibliographic entries are registered per the site package; full provenance and licenses are in the structured source list [source:SITE-PACKAGE]
