---
title: "JINGZHANG DIGITAL ARTERY — Reading the Century-Old Railway as a City Artery Carrying Compute, Models, and Talent"
author_github: "xiaopi668"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With the overall concept of the JINGZHANG DIGITAL ARTERY (JZDA), the corridor first opened by the self-built 1909 Beijing-Zhangjiakou Railway is re-read as a contemporary city artery carrying compute, models, data, talent, and scenarios. A one-artery, three-core, two-wing structure organizes 11.4 km² of overall design with detailed design for the Zhongzhiyuan, AI Origin Community, and Dazhongsi key areas; all spatial proposals are concept suggestions generated on the repository-registered provisional boundary and will be fully recalculated after the official redline is released."
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "ai-cultural-guide", "ai-health-service-navigation", "robot-delivery-low-speed"]
iteration: "v1.0"
---

# JINGZHANG DIGITAL ARTERY — Reading the Century-Old Railway as a City Artery Carrying Compute, Models, and Talent

> **JINGZHANG DIGITAL ARTERY (JZDA)**｜In 1909, the Beijing-Zhangjiakou Railway let China open the Jing-Zhang corridor with its own engineering power for the first time — it was the nation's industrial artery. In 2019, the high-speed rail moved into the Qinghuayuan Tunnel, freeing a nine-kilometer heritage park above ground — it became the city's public artery. This proposal proposes a third revitalization: reading this century-old corridor as a **digital artery** that, like blood vessels, delivers compute, models, data, talent, and scenarios to every cell of the city. The task of urban design is to make the artery's **pumping stations** (three key areas), **valves** (east-west stitching gates), and **capillaries** (slow-mobility and community networks) each work, and to make the artery's **pulse** (operational status) visible, verifiable, and participatory for the public.

All spatial, activity, policy, investment-attraction, and phasing content in this proposal is **an open co-creation concept suggestion, reference scheme, or material for professional teams to deepen**; it does not replace formal planning, constitute government review conclusions, or make any parcel-level demolition/renovation, road redline, rail alignment, or engineering implementation conclusions [source:AGENT-TASKBOOK]. Until the official precise redline is released, all geometry is generated on the repository-registered provisional rough boundary; every boundary is a provisional constraint with `official_boundary=false`, used only for generation, display, discussion, and in-package self-check [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]. After official polygons are published, the boundary and key-area polygons must be replaced and the entire chain — land use, buildings, roads, blue-green space, phasing, metrics, five figures, HTML, and PDFs — recalculated; this recalculation trigger is recorded in the assumptions register [depth:metrics_recalculation] [depth:risk_missing_data].

> **Executive summary (seven lines)**
> 1. Core thesis: the third revitalization of the Jing-Zhang corridor — from industrial artery and public artery to digital artery; "artery grammar" lets innovation flow through the city like blood.
> 2. Spatial structure: one artery, three cores, two wings — artery, pumping stations, and capillaries; the heritage-park slow artery runs north-south, three key areas act as pumping stations, two wings act as supply loops, and slow-mobility and community networks act as capillaries.
> 3. Overall concept and naming: JINGZHANG DIGITAL ARTERY (JZDA); logo direction is "twin rails and pulse waveform" — two rail lines fading into undulating digital pulses, in rust red and electric blue.
> 4. Institutional core: the "Artery Protocol" — every deployment of compute, data, and scenarios must be paired with an equivalent public return (experience, employment, governance transparency); no taking without giving back.
> 5. Evidence status: all geometry is generated on the repository-registered provisional boundary (11,412,825 m² recalculated in EPSG:4548, consistent with the announced 11.4 km²); every spatial metric is reproducible from the in-package GeoJSON [metric:site_area_sqm].
> 6. Key disclosure: the overall boundary and three key areas are provisional constraints; the package will be fully recalculated after official polygons are released; regulatory-plan conditions (FAR, height) are missing and registered as pending.
> 7. Decision boundary: all conclusions are concept suggestions; regulatory-plan condition gaps are registered and not disguised as approved indicators [depth:risk_missing_data].

## Design Basis and Source List

This formal proposal takes the Pre-Qualification Announcement for the International Urban Design Solicitation for the Centennial Jing-Zhang AI Innovation Belt as its primary basis [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], the open-call taskbook excerpt for global AI agents as its second basis [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], and the design brief, allowed design space, land-use codes, planning limits, standards snapshots, and schemas registered under `brief/site-package/` as machine-readable bases [source:SITE-PACKAGE]. The public source registry distinguishes formal-ready, background-only, and provisional-only materials [source:SOURCE-REGISTRY]; the processed fact pack serves only as a reading navigation layer, not a new authority [source:PROCESSED-FACT-PACK].

Beyond the repository materials, this proposal adds two sets of verified public background materials, all registered in `sources.json` with background-only limits: existing roads, water, rail, and heritage points from OpenStreetMap under ODbL attribution [source:OSM-CONTEXT]; the public fact that the Beijing-Zhangjiakou High-Speed Rail opened on 2019-12-30 is used for narrative background [source:JZ-HSR-OPENING]; the public fact that Phase 1 of the Jing-Zhang Railway Heritage Park (about 2.5 km) has opened is used for the existing-condition judgment [source:JZ-PARK-PHASE1]. These materials support narrative and mechanism design only and are not upgraded to boundary, regulatory, or scoring evidence.

Every standard cited by this package corresponds to a locally readable snapshot in the repository: the announcement snapshot defines the three scope levels, the names and areas of the three key areas, and the announced street bounds [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]; the agent taskbook snapshot defines the required responses and forbidden statements for agent.1–agent.6 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]; the land-use classification guide snapshot defines the use of codes such as 05, 0701, 0802, 0803, 0804, and 1401 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; the regulatory-plan depth snapshot defines the wording boundary that "traffic and municipal capacity must be professionally calculated" [standard:MOHURD-CONTROL-DETAILED-PLANNING]; the urban design measures snapshot defines the depth of urban character and public space. The official text of the Construction Engineering Design File Preparation Depth Regulation is not in the repository and is registered only as a pending reference for building depth. The compliance boundary of AI scenarios follows the Generative AI interim measures and the Barrier-Free Environment Law snapshots.

The authority order of this package is: GeoJSON → metrics → three matrices → manifest/sources/assumptions/self_check → proposal.md → figures → HTML → PDF. Every spatial judgment in the prose can trace back to a layer and metric: scope at [data:geometry/site_boundary.geojson#SITE-001], key areas at [data:geometry/key_areas.geojson#PROV-KEY-001], existing constraints at [data:geometry/constraints.geojson#EX-RAIL-JZ]; the existing-condition diagnosis and data gaps are detailed in the assumptions register [depth:existing_conditions_diagnosis].

![Overall concept figure: twin rails fading into digital pulses and the one-artery-three-core-two-wing structure](assets/figures/site-overview.png)

## Three-Level Scope Framework

The **coordinated research area (about 43.6 km²)** handles the strategic layer: it answers how the "three areas and two wings" coordinate with Zhongguancun, the Beiwei community, Future Science City, Huairou Science City, the economic development zone, and the Beijing-Tianjin-Hebei region, and outputs the world-class AI innovation ecosystem, the future city form, and naming/brand direction [metric:site_area_sqm]. The **overall design area (about 11.4 km²)** delivers regulatory-plan-depth urban design: land use layout, renewal framework, transport and municipal support, the heritage-park vitality belt, and urban character guidance. The **key detailed-design area (about 368.4 ha)** delivers planning-integrated-implementation-scheme depth for Zhongzhiyuan, the AI Origin Community, and Dazhongsi [metric:key_area_count] [metric:key_area_total_sqm]. The three levels cascade: corridor strategy sets the position, overall design sets the structure, key areas set implementation [depth:three_level_scope_framework].

The overall boundary adopts the repository-registered provisional rough polygon `PROV-SITE-001`, and the three key areas adopt the provisional polygons `PROV-KEY-001/002/003` (recalculated areas in EPSG:4548 are 192.9, 104.3, and 72.0 ha respectively, essentially consistent with the announced 192.1, 104.3, and 72.0 ha) [data:geometry/site_boundary.geojson#SITE-001]. Key-area area metrics are at [metric:key_area_zhongzhiyuan_sqm] and related key-area metrics.. Two points must be stressed: first, these boundaries are provisional constraints and must not be used for approval, ownership, or precise-area claims; second, after official polygons are released, the site boundary, key areas, land use, roads, green space, public space, buildings, phasing, and all metrics must be recalculated [assumption:A-BOUNDARY-PROVISIONAL].

![Three-level scope and land-use structure figure: the artery spine runs through all three levels, with full-coverage land-use partition](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Study

### 3.1 Reading the corridor as an artery: the industrial geography of the JZDA

Haidian already has world-class AI factor density, but the **flow** between factors lacks spatial expression. The strategic judgment of this proposal is: **the value of the Jing-Zhang corridor lies not in any single segment but in its being the carrier of China's first self-built mainline railway** — in 1909 it proved the nation could build an artery autonomously; in 2019 the rail went underground and the surface became a public artery; today's task is to turn this corridor into a digital artery carrying **compute, models, data, talent, and scenarios**. Green power and compute from the Zhangjiakou direction and models and talent from the Haidian direction are exactly the two ends of this artery's "blood" [source:JZ-HSR-OPENING] [source:OSM-CONTEXT]. The digital artery does not mean turning the corridor into a server-farm belt; it means making "flow" itself the organizing grammar of urban space — main artery, pumping stations, valves, and capillaries each do their job, and every segment has an experienceable public interface.

**Why "artery" fits these 11.4 km² better than "corridor"**: a corridor is a linear connector; an artery is a living system — with pumping stations (innovation concentration points), valves (east-west stitching gates that control two-way flow), capillaries (block and community networks), and a pulse (visible operational status). The three key areas form exactly three pumping stations: Zhongzhiyuan is the **compute pumping station** (full-stack autonomous innovation acceleration), the AI Origin Community is the **model pumping station** (AI origin ecosystem and talent), and Dazhongsi is the **scenario pumping station** (AI-native business). The two wings — the Zhongguancun technology-service wing and the Xiaoyuehe scenario-empowerment wing — are supply loops that return factors, capital, and scenarios to the artery. This structure directly answers the announcement's 1.5(1) requirements on the world-class AI innovation ecosystem, three areas and two wings, and the future AI city form [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:overall_spatial_structure].

### 3.2 Naming system, visual identity, and logo direction

**Primary name**: 京张数字动脉 (JINGZHANG DIGITAL ARTERY, abbreviated JZDA); **subtitle**: 百年动脉 · 数字脉搏 (A Century-Old Artery, A Digital Pulse). The naming system unfolds at five levels: belt (JZDA) → three pumping stations (compute/model/scenario) → two wings (technology-service/scenario-empowerment) → nine gates (east-west stitching valve nodes) → capillaries (community AI service stations). **Logo direction**: twin rails and pulse waveform — two parallel rail lines fading from solid (Beijing end) into undulating digital pulses (Zhangjiakou end), symbolizing the evolution from engineering artery to digital artery; the palette uses **rust red** (century-old rails) and **electric blue** (digital pulse), with an extension system including a waveform auxiliary graphic and a "1/0 sleeper" dot matrix texture [depth:overall_spatial_structure]. All typefaces and graphics are self-generated concept directions involving no third-party copyrighted material [assumption:A-CULTURE-CLEARANCE].

**Logo and visual-identity direction (for brand teams to deepen)**: 1) Standard composition — twin-rail pulse-wave mark with Chinese and English wordmarks; minimum use width suggested ≥24 mm. 2) Standard colors — rust red #B0413E, electric blue #1F6FEB, cream #F7F3EC; no other high-saturation color as primary. 3) Type — sans-serif Chinese (hei) and geometric sans-serif Latin as the direction; the final typeface list is locked after font-license confirmation. 4) Prohibited uses — no stretching/distortion, no low-contrast placement, no combination with unrelated graphics. 5) Signage layering — the cultural identity system (Jing-Zhang Railway / Zhongguancun narratives) is used separately from the belt master logo. 6) Mock-up directions — station signs, light boxes, ground paving, and digital screens await deepening. This specification is a brand direction; typefaces and graphics are not released until the rights ledger is confirmed [assumption:A-CULTURE-CLEARANCE] [source:AGENT-TASKBOOK].

### 3.3 World-class AI innovation ecosystem: transferable lessons from five to eight global cases

- **Silicon Valley / Palo Alto (US)**: venture capital and university neighborhoods within walking distance create "serendipity density" — translated into the Origin Community's **five-minute innovation interaction circles**, where public space rather than office towers carries encounters.
- **Tel Aviv (Israel)**: national start-up incubation and military-technology spillover — translated into the **relay-acceleration spatial organization** of Zhongzhiyuan's full-stack autonomous innovation chain (chip-framework-model-application).
- **One-North, Singapore**: park-as-city, with public layers (transit-mall greenery) vertically mixed with industry — translated into Dazhongsi's **AI-native consumption complex** and the vertical-layering grammar of transit-oriented mixed development.
- **King's Cross, London**: a railway heritage area renewed as a knowledge-economy quarter with historic station buildings as public living rooms — translated into the **heritage living-room strategy** of the Jing-Zhang Heritage Park, with stations and gates as public anchors.
- **Yunqi Town, Hangzhou**: an annual developer conference feeding back into park operations and scenario opening — translated into this proposal's **annual event system** and scenario-open operation mechanism.
- **Bengaluru (India)**: talent pool and IT services ecosystem — translated into the **persona-space-service matching logic** embedded in the five user personas.

Each case's translation lands on concrete layers and scenario nodes: serendipity density on the plaza layout of `geometry/public_space.geojson`, vertical mixing on the land-use code combinations of the key areas (05 adjacent to 0802), and conference feedback on the phasing plan and operation mechanism [source:AGENT-TASKBOOK] [depth:three_key_area_detailed_design]. All cases serve as deepenable material and constitute no investment-attraction or investment facts [assumption:A-SCENARIO-OPERATION].

### 3.4 Regional synergy: the three areas, two wings, and the Beijing-Tianjin-Hebei innovation loop

This proposal places the announced "three areas and two wings" within the two-end relationship of the Jing-Zhang corridor: the Zhongguancun technology-service wing carries global factor allocation, Zhongguancun IP, and capital empowerment (along the eastern Xueyuan Road–Xitucheng Road direction), the Xiaoyuehe scenario-empowerment wing carries AI scenario empowerment and a vibrant AI city (along the Xiaoyuehe blue-green space), and the three pumping stations are linked north-south by the heritage-park artery [source:AGENT-TASKBOOK]. Coordination with the Beiwei community, Future Science City, Huairou Science City, and the economic development zone is expressed as a direction — "the corridor links Beiwei to the east, connects Future Science City and Huairou Science City to the north, and inherits the manufacturing loop of the economic development zone to the south" — all as concept suggestions, not confirmed arrangements [assumption:A-SCENARIO-OPERATION].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Depth Urban Design

### 4.1 Spatial structure: one artery, three cores, two wings — artery, pumping stations, capillaries

The overall design is organized by **one digital artery spine** (the Jing-Zhang Heritage Park slow-mobility and culture belt, running roughly nine kilometers north-south), **three pumping stations** (the three key areas), **two wings** (the Zhongguancun technology-service wing and the Xiaoyuehe scenario-empowerment wing), and a **capillary network** (community AI service stations and slow-mobility branch roads) [depth:overall_spatial_structure]. Its layer expression: `land_use.geojson` uses 108 full-coverage parcels for research, residential, commercial, cultural, and educational land, with the central green artery (about 2.10 million m² of park land, green ratio 18.4%) implementing the heritage-park artery [data:geometry/land_use.geojson#LU-001] [metric:green_ratio]; `roads.geojson` implements the capillary skeleton with east-west secondary roads and north-south slow greenways [data:geometry/roads.geojson#ROAD-001] [metric:road_length_m]; `public_space.geojson` implements the valve nodes with five AI plazas [metric:public_space_ratio]. Industrial goals and functional layout are carried by the "north-research, middle-innovation, south-scenario" spatial division: the northern Zhongzhiyuan concentrates research and full-stack innovation, the central Origin Community concentrates the model ecosystem and talent community, and the southern Dazhongsi concentrates AI-native consumption and scenario experience [source:OFFICIAL-ANNOUNCEMENT] [depth:land_use_layout].

### 4.2 Urban renewal framework and innovation indicator system

The renewal framework follows "artery through-connection, pumping-station reinforcement, capillary renewal": artery through-connection means the continuity of the heritage-park slow-mobility and culture belt; pumping-station reinforcement means functional mixing and intensity uplift (conceptual) at the three key areas; capillary renewal means micro-renewal of existing communities and blocks. The innovation indicator system is suggested in five families: **factor flow** (compute scale, open data volume, model releases), **ecosystem density** (innovator density, developer-community scale, funding density), **scenario count** (verifiable scenarios, test mileage), **talent attraction** (talent density, youth retention), and **public return** (public experience node count, governance transparency index). The spatially reproducible parts (green ratio, public-space ratio, research-land share, slow-mobility mileage) are implemented in `metrics.json` [metric:land_use_research_ratio] [metric:road_length_m]; non-spatial indicators are marked pending professional statistics [depth:metrics_recalculation]. Regulatory-plan conditions (FAR, height, density, setbacks) are missing from public materials and are all registered as pending, not disguised as approved indicators [assumption:A-CONTROLS-PENDING].

### 4.3 Renewal projects, transport and rail, municipal works, and urban character

- **Renewal projects**: listed in three groups — "artery through-connection, pumping-station reinforcement, capillary" (detailed in the phasing chapter and `phasing.geojson`) [data:geometry/phasing.geojson#PHASE-001].
- **Transport and rail**: building on the existing Qinghuayuan Tunnel and surrounding transit stations, integrated station connection and east-west stitching gate design is suggested; east-west secondary roads link the three pumping stations and the north-south greenway runs the artery through; parking and non-motorized traffic strategies follow regulatory-plan depth, without alignment or engineering conclusions [source:OSM-CONTEXT] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:traffic_rail_slow_parking].
- **Municipal works and new infrastructure**: distributed energy, edge-compute nodes, smart poles, and slow-mobility charging facilities are suggested for integration with municipal facilities; capacity calculations are left to professional teams [depth:municipal_new_infrastructure].
- **Urban character**: the rust-red/electric-blue dual palette and waveform auxiliary graphics establish the urban tone; concept massing and roof-form directions are given for the key areas, not architectural-design depth [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:height_massing_character].

![Key-area index and design-task figure: the division of labor and linkage of the three pumping stations](assets/figures/key-areas.png)

## Detailed Design of Key Areas

### 5.1 Zhongzhiyuan AI Autonomous Innovation Acceleration Area (compute pumping station)

- **Positioning**: AI full-stack autonomous innovation acceleration area — "relay acceleration" space from chip, framework, and model to application [source:AGENT-TASKBOOK].
- **Spatial structure**: a central research core (0802) flanked by talent housing (0701) and education/research support (0804), with the green artery and plaza as the public interface [data:geometry/key_areas.geojson#PROV-KEY-001].
- **Building renewal**: conceptual massing is research-cluster based; replacement of existing universities and research institutes takes priority; demolition is limited to inefficient temporary buildings (concept suggestion, not a parcel-level conclusion).
- **Transport and slow mobility**: the greenway artery passes along the west, and secondary roads connect station-level transfers.
- **Public space**: the Compute Plaza (PUBLIC-002) carries full-stack achievement display and honor display.
- **AI scenarios**: full-stack autonomous test line, compute-scheduling visualization, and a developer-residency program.
- **Implementation risk**: research-land intensity is limited by regulatory controls; recalculate after official conditions are complete [assumption:A-CONTROLS-PENDING].

### 5.2 Beijing AI Origin Community (model pumping station)

- **Positioning**: world-class AI innovation ecosystem and talent community — "model ecosystem + talent life" on two wheels.
- **Spatial structure**: research and model ecosystem (0802) at the center, commercial services (05) along the east, culture (0803) along the west, and residential (0701) on the outer ring, forming five-minute innovation interaction circles [data:geometry/key_areas.geojson#PROV-KEY-002].
- **Building renewal**: mixed-use and existing-stock renewal with community service facilities (0702) added.
- **Transport and slow mobility**: the Origin Community AI Plaza (PUBLIC-001) connects directly with the greenway artery, with full barrier-free coverage [standard:BARRIER-FREE-ENVIRONMENT-LAW].
- **Public space**: the Origin Plaza carries open-source releases, model display, and developer markets.
- **AI scenarios**: open model-evaluation field, AI cultural guide, developer-community space, AI health-service navigation, and more (see scenario cards).
- **Implementation risk**: the mixed residential-research land boundary needs confirmation under regulatory planning.

### 5.3 Dazhongsi AI Industry Cluster (scenario pumping station)

- **Positioning**: AI-native business and scenario experience area — a vertically mixed "AI+consumption + AI+business" quarter [source:AGENT-TASKBOOK].
- **Spatial structure**: commercial services (05) as the main body with culture (0803) and residential (0701) support; the Scenario Plaza (PUBLIC-003) is a station-level node [data:geometry/key_areas.geojson#PROV-KEY-003].
- **Building renewal**: transit-oriented mixed development and existing commercial renewal, with vertical layering (public-industry-residential).
- **Transport and slow mobility**: integrated station connection, with the slow artery stitching through the commercial streets.
- **Public space**: the Scenario Plaza carries AI-native consumption experience and nighttime vitality.
- **AI scenarios**: smart retail, unmanned-delivery pilot, AI exhibitions, and more (see scenario cards).
- **Implementation risk**: commercial intensity and transit-over-development conditions await official confirmation.

The three key areas correspond to `PROV-KEY-001/002/003` in `geometry/key_areas.geojson`; area recalculation is at [metric:key_area_zhongzhiyuan_sqm] [metric:key_area_origin_sqm] [metric:key_area_dazhongsi_sqm]. All detailed design is directional concept design; parcel-level conclusions under the provisional boundary await recalculation after official polygons and regulatory conditions are released [assumption:A-BOUNDARY-PROVISIONAL] [depth:three_key_area_detailed_design].

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### 6.1 Five user personas

1. **AI founders/technical founders**: need accelerator space, test environments, and investor serendipity density.
2. **AI engineers and researchers**: need compute convenience, academic exchange, and commute efficiency.
3. **Developer-community members/open-source contributors**: need resident workspaces, release space, and offline events.
4. **Urban residents and families**: need barrier-free public space, smart living services, and nighttime vitality.
5. **Corporate and government visitors/international delegations**: need verifiable scenario display, honor display, and international reception.

### 6.2 AI+ scenario cards (12 cards, of which 3 are industry test/validation scenarios)

1. **Scenario Card 01 AI+transport and slow mobility**: barrier-free navigation and transit-connection prompts on the artery greenway (transport/slow mobility) [standard:BARRIER-FREE-ENVIRONMENT-LAW].
2. **Scenario Card 02 Enterprise-service copilot**: AI government-affairs and policy-matching assistant at the Origin Community enterprise-service hall (enterprise services).
3. **Scenario Card 03 AI cultural guide**: AR historical guide of the heritage park covering the Jing-Zhang Railway and Zhongguancun narratives (culture).
4. **Scenario Card 04 AI health-service navigation**: community health screening and medical navigation (life services).
5. **Scenario Card 05 Low-speed unmanned-delivery pilot (industry test/validation scenario 1)**: delivery testing on restricted routes in the Dazhongsi scenario quarter, with human review.
6. **Scenario Card 06 Full-stack autonomous test line (industry test/validation scenario 2)**: a chip-framework-model-application chain test environment in Zhongzhiyuan.
7. **Scenario Card 07 Open model-evaluation field (industry test/validation scenario 3)**: an open model-evaluation and benchmark-dataset field in the Origin Community.
8. **Scenario Card 08 Smart retail and unmanned stores**: AI-native consumption experience in Dazhongsi.
9. **Scenario Card 09 Developer residency and open-source release space**: developer-community operations in the Origin Community.
10. **Scenario Card 10 Smart poles and edge-compute public services**: public-service nodes of the capillary network.
11. **Scenario Card 11 Barrier-free and age-friendly AI services**: voice and barrier-free interaction for elderly residents [standard:BARRIER-FREE-ENVIRONMENT-LAW].
12. **Scenario Card 12 Public experience route and pilgrimage check-in**: the heritage-park public experience route with digital keepsakes.

Each card maps spatial location, served users, operating data, privacy boundary, human review, operating entity, visualization layer, and risk to `compliance_matrix.json` and `sources.json` while remaining readable in the prose; AI service operation follows the generative-AI service management requirements, with privacy boundaries and human-review mechanisms stated per card [standard:GENERATIVE-AI-INTERIM-MEASURES] [depth:blue_green_public_space]. All scenarios are concept suggestions and do not constitute approved operations [assumption:A-SCENARIO-OPERATION].

#### Scenario card operating-requirement matrix (concept, for professional teams to deepen)

| Card | Served users | Operating data (minimal fields) | Privacy boundary | Human review | Suggested operator | Location | Suggested service-level target |
|---|---|---|---|---|---|---|---|
| 01 AI+transport | Pedestrians/cyclists/visually impaired | Location, route, accessibility status | Anonymized, no trajectory storage | Volunteer spot checks | Subdistrict + transport dept | Artery greenway | Detour rate ≤5%, response <10s |
| 02 Enterprise copilot | Companies/founders | Policy texts, inquiries | No trade secrets collected | Clerk review | Park operator | Origin service hall | One-stop rate ≥70% |
| 03 AI cultural guide | Visitors/developers | Visit preferences (opt-out) | No default recording | Historian review of copy | Park operator | Heritage park | Accuracy ≥95% |
| 04 AI health navigation | Residents/elderly | Self-reported health, referrals | Minimal, local | Community doctor review | Community health center | Community stations | Error rate <1% |
| 05 Low-speed delivery* | Residents/merchants | Delivery orders, routes | Restricted block, no personal imagery | Safety officer on site | Pilot company + subdistrict | Dazhongsi block | Zero accidents, complaints <1/1000 |
| 06 Full-stack test line* | Research bodies/companies | Test parameters, results | Tiered dataset authorization | Expert committee | Park operator | Zhongzhiyuan | Throughput target, reproducible reports |
| 07 Open evaluation field* | Developers/evaluators | Model inputs/outputs | Per-benchmark authorization | Community review | Community council | Origin Community | Reproducibility ≥90% |
| 08 Smart retail | Consumers | Products, orders | Anonymous payment | Merchant complaint channel | Merchant alliance | Dazhongsi | Complaints <0.5% |
| 09 Developer residency | Developers | Desk booking, events | No code monitoring | Community admins | Developer community | Origin Community | Occupancy ≥60% |
| 10 Smart-pole services | Public | Aggregated environment/traffic | No individual identification | Platform disclosure | Municipal + operator | Capillary nodes | Uptime ≥99% |
| 11 Barrier-free AI | Elderly/disabled | Voice interaction, requests | Minimal, deletable | Family + social worker | Subdistrict + NGOs | Community stations | Usability ≥95% |
| 12 Experience route | Public | Check-in records (deletable) | Anonymous by default | Operator disclosure | Park operator | Heritage park route | Check-in success ≥98% |

Every card includes an exit mechanism: data deletable, service human-overridable, scenario rollback possible; cards 05, 06, 07 are the industry test/validation scenarios with restricted scope, time windows, and named review responsibility [assumption:A-SCENARIO-OPERATION].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land use follows the 108 full-coverage parcels in `geometry/land_use.geojson`: research land (0802) about 20.3%, residential (0701) about 53.1%, commercial services (05) about 18.3%, culture (0803) about 5.4%, and education (0804) about 2.8% of the overall area (recalculated in EPSG:4548) [metric:land_use_research_ratio]. Building footprints are conceptual massing (about 1.51 million m², building density 13.2%), serving only as spatial-supply indication, not approved building plans [metric:building_footprint_area_sqm] [assumption:A-BUILDINGS-CONCEPTUAL]. The retain/renovate/demolish/new-build classification is expressed as concept suggestions: retain (university and research institutes, historic station buildings, quality existing stock), renovate (inefficient research buildings and commercial stock), demolish (only inefficient temporary buildings; no parcel-level conclusion), and new-build (infill around the three pumping stations); parcel-level conclusions await ownership and regulatory-plan confirmation [depth:retain_renovate_demolish] [assumption:A-CONTROLS-PENDING].

## Transport, Rail, Municipal Infrastructure, and Public Services

- **Road microcirculation**: east-west secondary roads connect the three pumping stations, north-south slow greenways run the artery through, and branch roads densify the capillary network [data:geometry/roads.geojson#ROAD-001].
- **Transit-station integration**: integrated connection and station-city integration around the Qinghuayuan Tunnel and surrounding stations (concept direction) [data:geometry/constraints.geojson#EX-RAIL-JZ].
- **Slow-mobility gap stitching**: valve gates stitch the two sides of the heritage park, making walking and cycling continuous [metric:road_length_m].
- **Parking and non-motorized traffic**: concentrated parking near transit stations and shared-bike tidal management, proposed at regulatory-plan depth.
- **Innovation service platforms**: Origin Community enterprise-service hall, Zhongzhiyuan test platform, and Dazhongsi scenario-open platform.
- **New infrastructure**: edge compute, distributed energy, smart poles, and municipal facilities integrated; capacity calculations are left to professional teams [depth:municipal_new_infrastructure].

![Mobility, slow-mobility, and blue-green public-space composite system figure: connections between artery, capillaries, and pumping stations](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

The blue-green system takes the **heritage-park central green artery** as the main artery (about 2.10 million m², green ratio 18.4%), the Xiaoyuehe blue-green space as the western capillary, and five AI plazas (PUBLIC-001~005, public-space ratio 0.33%) as valve nodes [metric:green_ratio] [metric:public_space_ratio] [data:geometry/green_space.geojson#GREEN-001]. Public space and pilgrimage landmarks form a "three temples and one living room" system: the **Compute Temple** (Zhongzhiyuan full-stack achievement honor display), the **Model Temple** (Origin Community model releases and honor wall), the **Scenario Temple** (Dazhongsi AI-native experience), plus the **Heritage Living Room** (station-level public anchor of the heritage park), answering agent.4's requirement of no fewer than three AI pilgrimage landmarks [source:AGENT-TASKBOOK]. The honor-display system and public-space component library (waveform paving, rust-red sleeper seating, 1/0 dot-matrix lighting) are proposed as concept directions. Urban character is established with the rust-red/electric-blue dual palette, waveform auxiliary graphics, and a "Jing-Zhang twin-rail" facade vocabulary; character conclusions are all guiding concepts [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:blue_green_public_space].

## Renewal Projects, Implementation Policy, and Phasing

Renewal projects are listed in three groups: **artery through-connection** (heritage-park continuity, valve gates, heritage living room), **pumping-station reinforcement** (functional mixing and intensity uplift at the three pumping stations), and **capillary** (community AI service stations and micro-renewal). The phasing plan is implemented in `geometry/phasing.geojson` in three phases: **near term** (phase_1, about 5.12 million m²) starts the Dazhongsi scenario core to form an experienceable prototype [data:geometry/phasing.geojson#PHASE-001]; **mid term** (phase_2, about 2.85 million m²) delivers the Origin Community model core and middle-segment stitching [data:geometry/phasing.geojson#PHASE-002]; **long term** (phase_3, about 3.45 million m²) delivers the Zhongzhiyuan compute core and north-segment through-connection [data:geometry/phasing.geojson#PHASE-003] [metric:phase_1_area_sqm]. Suggested implementation policies (concept): scenario-open filing, pilot-testing exemption zone application, and a developer-community operation fund; the annual event system includes the "JZDA Developer Conference," "Open-Source Release Day," and "Pilgrimage Check-in Season," all as concept suggestions that do not constitute confirmed government arrangements [assumption:A-SCENARIO-OPERATION] [depth:renewal_project_list] [depth:phasing_implementation].

#### Three minimum viable pilots (concept)

| MVP | Location | Suggested actors | Preconditions | 6-month milestone | 12-month milestone | 24-month milestone | Suggested KPIs | Risk gate | Human override / exit |
|---|---|---|---|---|---|---|---|---|---|
| MVP-1 Low-speed delivery block | Dazhongsi Scenario Plaza + 500 m | Pilot company, subdistrict, merchant alliance, safety officer | Filing passed, restricted route map, insurance | Restricted-route trial | Expand to 3 routes | Regular operation review | Zero accidents, complaints <1/1000 | Stop on any accident | Safety officer can take over anytime |
| MVP-2 Open model-evaluation field | Origin Community Plaza | Evaluators, developer community, universities | Benchmark dataset authorization, compute lease | First 3 benchmarks live | 10+ benchmarks open | Annual evaluation report | Reproducibility ≥90% | Double-blind review on disputes | Data withdrawable, results human-reviewed |
| MVP-3 Full-stack test line phase 1 | Zhongzhiyuan research core 0802 | Park operator, research bodies, test companies | Site agreement, equipment list | Single-layer (model) testing | Chip-framework-model chain | Application-layer joint test | Throughput target, reproducible reports | Key equipment failure | Test tasks rollbackable |

All three MVPs set 6/12/24-month milestones, cost magnitude (conceptual, pending professional calculation), exit conditions, and human takeover mechanisms as functional pilots for the three pumping stations [depth:phasing_implementation] [assumption:A-SCENARIO-OPERATION].

## Metrics, Area Recalculation, and Compliance Matrix

Core indicators and recalculation basis (EPSG:4548): overall area 11,412,825 m² [metric:site_area_sqm]. Green ratio is 18.4% (green space 2,099,904 m²) [metric:green_ratio]; public-space ratio is 0.33% (five plazas, 37,944 m²) [metric:public_space_ratio]. Building density is 13.2% (conceptual massing 1,511,831 m²) [metric:building_density]; the slow-mobility and road network is 45.7 km [metric:road_length_m]; key-area areas are recalculated at 192.9/104.3/72.0 ha [metric:key_area_total_sqm]. FAR and height controls are marked unknown because statutory conditions are missing and will be recalculated after official data arrives [assumption:A-CONTROLS-PENDING].

All announcement tasks 1.3, 1.4, and 1.5 and the six agent tasks agent.1–agent.6 are covered item by item in `compliance_matrix.json`; 8 mandatory professional standards are covered in `standard_matrix.json`; 15 design-depth items are all `complete` in `design_depth_matrix.json` [depth:metrics_recalculation]. Indicators are not just numbers: the green ratio supports talent living quality and capillary ecosystem services, the public-space ratio supports innovation serendipity and scenario display, and the research-land share supports the spatial supply of the compute and model ecosystems [metric:land_use_research_ratio].

![Core-metric recalculation and evidence-chain figure: metric-layer-source-standard relationships](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance


- **Material legality**: all materials are public or cleared sources; sources, licenses, retrieval dates, and limits are registered in `sources.json` [source:SOURCE-REGISTRY].

- **Provisional-boundary risk**: the overall boundary and three key areas are provisional constraints and must not be used for approval, ownership, or precise-area claims; the package will be fully recalculated after official polygons are released [assumption:A-BOUNDARY-PROVISIONAL].

- **Copyright clearance**: all figures and the logo direction in this package are agent-generated and contain no unauthorized third-party assets; OSM data is used under ODbL attribution [source:OSM-CONTEXT] [assumption:A-CULTURE-CLEARANCE].

- **Rights ledger (concept statement, pending license files)**: package assets are registered in four classes — 1) self-generated graphics (five figures, logo direction, waveform auxiliary) with no third-party fonts/images/trademarks/portraits; 2) official policy and standard citations (announcement, taskbook, classification guide, measures, interim measures, barrier-free law) cited per official use; 3) OSM background data under ODbL attribution (OpenStreetMap contributors); 4) public news facts (HSR opening, park phase-1) as background narrative only. Typeface list, image-generation chain, and license files for any derivative assets will be added to `sources.json` and the copyright statement before formal release [assumption:A-CULTURE-CLEARANCE] [source:SOURCE-REGISTRY].

- **Privacy protection**: personal data in the scenario cards is designed for minimal collection and human review [standard:GENERATIVE-AI-INTERIM-MEASURES].

- **AI-generation responsibility**: this package is generated by an AI agent; important judgments rely on public sources and reproducible metrics, and professional review is completed by humans and professional teams [source:AGENT-TASKBOOK].

- **Forbidden statements**: this package contains no official approval, approved regulatory plan, land ownership, engineering feasibility, or government implementation commitment statements.

- **Pending materials**: official polygons, regulatory-plan conditions, ownership, and municipal capacity are all registered as pending [depth:risk_missing_data].

## References

This section lists only the main human-readable materials that influenced the proposal; the complete machine index is in `sources.json` and the three matrix files [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

1. Pre-Qualification Announcement for the International Urban Design Solicitation for the Centennial Jing-Zhang AI Innovation Belt (Beijing Municipal Commission of Planning and Natural Resources Haidian Branch, 2026-05-09).
2. Excerpt of the Open-Call Taskbook for Global AI Agents on the Centennial Jing-Zhang AI Innovation Belt Urban Design (organizer-cleared document, 2026-05-18).
3. Ministry of Natural Resources, Guide to Land-Use and Sea-Use Classification for Spatial Survey, Planning, and Use Control (November 2023).
4. Ministry of Housing and Urban-Rural Development, Measures for the Administration of Urban Design.
5. Ministry of Housing and Urban-Rural Development, Measures for the Compilation and Approval of Regulatory Detailed Plans for Cities and Towns.
6. Interim Measures for the Management of Generative AI Services.
7. Barrier-Free Environment Law of the People's Republic of China.
8. OpenStreetMap reference for existing roads, water, and rail (ODbL).
9. Public information on the opening of the Beijing-Zhangjiakou High-Speed Rail on 2019-12-30.
10. Public reports on the opening of Phase 1 (about 2.5 km) of the Jing-Zhang Railway Heritage Park.
