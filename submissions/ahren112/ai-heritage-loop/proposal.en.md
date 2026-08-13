---
title: "AI Heritage Loop: Overall Concept and Spatial Strategy for the Centennial Jing-Zhang AI Innovation Belt"
author_github: "ahren112"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Centered on the Jing-Zhang Railway Heritage Park as a cultural spine, this proposal develops an 'AI Heritage Loop' spatial structure of one belt, three cores, two wings, multiple nodes and a blue-green composite loop; it organizes the three key areas around full-stack autonomous AI innovation, open-source incubation and AI-native business formats into an experiential, deepenable and evolvable urban design."
tracks: ["jingzhang-heritage-narrative", "youth-friendly-public-space", "ai-origin-community"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "enterprise-service-copilot", "robot-delivery-low-speed", "ai-health-service-navigation"]
iteration: "v0.2"
---

# AI Heritage Loop: Overall Concept and Spatial Strategy for the Centennial Jing-Zhang AI Innovation Belt

## Design Basis and Source List

This proposal takes as its primary basis the *Qualification Pre-announcement for the International Urban Design Open Call for the Centennial Jing-Zhang AI Innovation Belt* issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources, and as its structured basis the machine-readable site package under `brief/site-package/` (design brief, allowed design space, enums, ranges, and source list) [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]. All spatial propositions in this proposal are framed as **concept proposals, reference schemes, or directions for further professional deepening**; they do not replace statutory planning or constitute government-approved conclusions.

Source-use boundaries follow the registry in `data/source_registry.json`: 7 formal-usable sources, 1 background-only source, and 1 provisional-only source. Core judgments rely only on formal-usable sources. Until official polygons are published, the site boundary and the three key areas use the repository's registered provisional rough boundaries (`provisional_constraint`, `official_boundary=false`), used solely for generation, display, and design discussion — not as an official redline, approval basis, or basis for precise area claims [source:SOURCE-REGISTRY].

![Evidence chain and package relationship diagram](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal is organized along the three officially defined levels: the **coordinated research area** (about 43.6 km², bounded by the Fifth Ring Road to the north, Jingzang Expressway to the east, Xizhimen Outer Street to the south, and Wanquanhe Road to the west) answers "how the AI belt competes globally"; the **overall design area** (about 11.4 km², the urban and industrial area within 1–2 km around the Jing-Zhang Heritage Park) answers "how renewal and innovation are organized spatially"; and the **key detailed design area** (about 368.4 ha, the three key areas) answers "how refined design lands on the ground" [source:OFFICIAL-ANNOUNCEMENT] [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm].

The three levels form one evidence chain rather than three disconnected drawings: research sets the industrial strategy and urban-form judgment, overall design translates it into land-use, building, mobility, blue-green and phasing layers, and the key areas verify implementability at site scale. All geometry in this package is generated from provisional boundaries; the layers and metrics requiring recalculation after official boundaries are released are registered item by item in `assumptions.json` [depth:three_level_scope_framework].

![Three-level scope and spatial working framework](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Study

### Overall Concept and Naming System (agent.1)

The proposal advances the overall concept of the **"AI Heritage Loop"**, isomorphic to a walkable, experiential and evolvable urban public loop that aligns the centennial railway heritage with the contemporary AI innovation network. The naming system has three tiers:

- **Master name**: AI Heritage Loop, with the subtitle "Centennial Jing-Zhang, Innovation Together";
- **Three-belt translation**: the Centennial Jing-Zhang Culture Belt → the "Heritage Belt"; the Urban AI Living Experience Belt → the "Experience Belt"; the AI Integration Innovation Belt → the "Innovation Belt";
- **Functional units**: the three key areas adopt "Accelerator", "Origin" and "Energy Field" as spatial metaphors (detailed in the key-area chapter).

The logo direction uses a **dual-line track isomorphic with a neural network** as its motif: two parallel lines drawn from Jing-Zhang railway tracks and Git branch symbols, with nodes drawn from neurons and open-source commit marks; the palette pairs "Jing-Zhang grey, Haidian blue and AI gradient purple", preserving railway industrial memory while pointing to open collaboration in the intelligence age. This direction is a visual concept proposal; final typefaces, graphics and marks require cleared rights and professional deepening [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

**Spatial structure: "one belt, three cores, two wings, multiple nodes, blue-green composite loop."** The belt is the Jing-Zhang Heritage Park vitality spine (cultural main axis and public-space skeleton); the three cores are Zhongzhiyuan, the Beijing AI Origin Community and Dazhongsi; the two wings are the Zhongguancun Technology Service Wing (global factor allocation, Zhongguancun IP and capital enablement) and the Xiaoyuehe Scenario Empowerment Wing (AI scenario landing and a vibrant city); the multiple nodes are AI scenario points across the overall area; and the blue-green composite loop is the linked network of slow mobility, green space, public space and event routes [depth:overall_spatial_structure] [data:geometry/key_areas.geojson#PROV-KEY-001].

### AI Innovation Ecosystem and Global Cases (agent.2)

The coordinated research area focuses on building a full-stack autonomous innovation ecosystem of "university incubation — open-source collaboration — enterprise transformation — capital and standards enablement — public experience — international communication", corresponding to the taskbook's five functions (full-stack autonomous AI innovation; world-class AI innovation ecosystem; a new paradigm of AI+ scenario enablement; an intelligent vibrant AI city; and global voice in AI governance). The following six global cases serve as experience references, all verifiable from public sources; their lessons are translated into the proposal's spatial, operational and scenario mechanisms:

| Case | Key lesson | Translated mechanism |
| --- | --- | --- |
| Silicon Valley, US (Stanford + venture-capital network) | University-industry-capital loop; low-density campuses with high-intensity interaction | Origin-community incubation and transformation street; the Zhongguancun wing hosts capital services |
| Cambridge, Boston, US (MIT / Kendall Square) | Regeneration of an industrial district into "the most innovative square mile" | Zhongzhiyuan existing-park renewal and riverfront innovation interface |
| one-north, Singapore | National-strategy park integrating work-life-learning-play | "15-minute AI living circle" facility layout across the overall area |
| King's Cross, London, UK | Railway industrial heritage plus knowledge economy as an urban renewal model | Heritage Park vitality spine, cultural guide and creative-industry interface |
| Future Sci-Tech City / Yunqi Town, Hangzhou, China | Convention economy driving agglomeration; brand-led operation | Annual event system and open-call mechanism of the AI Innovation Belt |
| Nanshan / Shenzhen Bay, Shenzhen, China | Hardware-startup density, rapid prototyping, supply-chain synergy | Dazhongsi intelligent-terminal and robotics test blocks, low-speed pilots |

These cases are used only for method transfer and imply no commitment on company lists, investment amounts or output values [source:AGENT-TASKBOOK]. The ecosystem engages eight factor types — land, space, industry, capital, talent, compute, data and scenarios — whose mechanisms are detailed in the scenario and operation chapters and are all labeled as concept proposals.

## Overall Design Area: Urban Renewal and Regulatory-Depth Urban Design

The overall design area is addressed at regulatory-detailed-planning depth: the Heritage Park vitality spine is the renewal axis, with three renewal object types — **retain and strengthen** (railway heritage, protected cultural sites, universities and quality residential areas), **renovate and upgrade** (aging research institutes, industrial parks and street fronts), and **renew and build new** (underused land, transport nodes and public-space gaps) — forming an overall pattern of "axis activation, two-wing stitching, multi-node renewal" [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING].

The industry-function mix is framed as "about 48% innovation R&D and industry services, about 24% residential and community support, about 23% parks, green space and open space, and about 5% other" (recomputed from the land-use layers; see the indicators chapter) [data:geometry/land_use.geojson#LU-001] [metric:land_use_coverage]. Building renewal distinguishes retain, renovate, demolish and new-build categories, but **no plot-level retain/renovate/demolish conclusions are given** — pending official regulatory plans, existing-building and ownership data, such judgments are uniformly recorded as `status=unknown`; only concept massing recomputable from this package's geometry is retained, explicitly distinct from statutory control values [depth:retain_renovate_demolish].

Statutory control indicators — floor area ratio, building height, density, setbacks, road redlines and facility standards — are all stated as "pending official regulatory confirmation" until formal conditions are published, with no inferred values presented as approved [depth:development_intensity_controls] [assumption:A-CONTROLS-001].

## Key Areas: Detailed Design

The three key areas are each designed at the depth of a planning-implementation comprehensive scheme, with a complete sub-scheme of "positioning + spatial structure + building renewal + mobility + public space + AI scenarios + implementation risks". Because the key-area polygons are provisional, all areas, boundaries and placements below are directional; recalculation is required once official polygons are released [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design].

![Three key areas index and design task diagram](assets/figures/key-areas.png)

### Zhongzhiyuan AI Autonomous Innovation Acceleration Area (about 192.9 ha)

**Positioning**: a garden-style full-stack autonomous innovation acceleration area — the "Accelerator" for autonomous models, standards, safety governance and industry showcase. **Structure**: the Qinghe waterfront is the ecological green axis, organized as "riverside innovation showcase belt + central R&D and testing cluster + southern service support". **Building renewal**: predominantly renovation of existing industrial parks, with low-carbon green interaction interfaces and visitable test-and-showcase space along the Qinghe. **Mobility**: strengthen external transport and a continuous cycling/walking path along the Qinghe. **Public space**: a Qinghe low-carbon innovation corridor hosting autonomous-model testing, standards workshops and safety-governance showcases [source:AGENT-TASKBOOK]. **Risks**: river blue-line, ecological and flood-control conditions pending review; showcase functions depend on tenants' willingness to open scenarios.

### Beijing AI Origin Community (about 104.3 ha)

**Positioning**: a campus-adjacent transformation and open-source incubation community — the "Origin" serving universities, developers and startups. **Structure**: three circles of campus-park-street slow-mobility stitching, with strengthened rail connection toward Wudaokou. **Building renewal**: predominantly retain-and-renovate, supplementing release, talent-service and open-source collaboration space. **Public space**: an open-source release hall, public code wall and nighttime developer collaboration space forming a youth-friendly third-place network [source:AGENT-TASKBOOK] [track:youth-friendly-public-space]. **Risks**: campus boundaries, ownership and ground-floor uses pending confirmation; campus data and research output require authorization.

### Dazhongsi AI Industry Cluster (about 72.0 ha)

**Positioning**: an urban smart economy and AI-native business "Energy Field", organizing the ecosystem around leading enterprises, agents, intelligent terminals and content consumption. **Structure**: four-quadrant pedestrian connectivity around Dazhongsi station, strengthening junction slow mobility and commercial frontages. **Building renewal**: mainly commercial building and retail-space renovation, supplemented by data-factor and digital-asset service interfaces. **Public space**: a Dazhongsi AI energy-field node and data-factor parlor. **AI scenarios**: low-speed robot delivery pilots, intelligent-terminal showcases and an international roadshow parlor [source:AGENT-TASKBOOK] [data:geometry/key_areas.geojson#PROV-KEY-003]. **Risks**: station integration, municipal utilities and public-space renewal around leading enterprises require dedicated deepening.

## AI Innovation Ecosystem, Personas and AI+ Scenarios

### Five Personas (agent.3)

| Persona | Typical needs | Spatial response | Data and privacy boundary |
| --- | --- | --- | --- |
| Open-source developer | Release, collaboration, testing, community reputation | Origin-community release hall, code wall, nighttime collaboration space | No personal behavior tracking; aggregated statistics only |
| Startup team | Low-cost office, compute access, product testbed | Zhongzhiyuan shared test field, edge-compute stations | Compute and data services require separate authorization |
| Leading-enterprise talent | Showcase, business, international reception | Dazhongsi international roadshow parlor, rail connection | Enterprise marks and cases require cleared rights |
| Local resident | Commuting, leisure, community services | Heritage Park slow loop, embedded community services | No resident profiling for commercial recommendation |
| University faculty and students | Transformation, cross-campus collaboration | Campus-park stitching, transformation stations | Campus data and research output require authorization |

### Ten AI Scenario Cards

Each scenario card maps to spatial location, served personas, operating data, privacy boundaries, human review, operating entity and visualization layers; **TS-01, TS-02 and TS-03 are industry testing and validation scenarios** (low-speed, supervised, reviewable pilots; not described as approved operations) [source:AGENT-TASKBOOK] [depth:ai_scenario_definition]:

| No. | Scenario | Spatial carrier | Type | Privacy/review notes |
| --- | --- | --- | --- | --- |
| SC-01 | Open-source release hall | AI Origin Community | Public experience | Human review of released content |
| SC-02 | AI cultural heritage guide | Qinghuayuan Station + Heritage Park | Public experience | Cleared content; no historical distortion |
| SC-03 | Edge-compute station | Nodes across overall area | New infrastructure | Compute services require authorization |
| SC-04 | Data-factor parlor | Dazhongsi | Industry service | Compliance, authorization, auditability |
| SC-05 | Campus-adjacent transformation street | AI Origin Community | Industry service | IP protection |
| SC-06 | AI+health service navigation | Community-level nodes | Public service | Health data stays in domain; human review |
| SC-07 | Global AI event week route | Public-space system | Events | Event safety and public-space permits |
| SC-08 | Agent contribution honor wall | Jing-Zhang Heritage Park | Cultural display | Voluntary contribution information |
| SC-09 | Nighttime developer collaboration space | AI Origin Community | Youth-friendly | Space safety and noise management |
| SC-10 | Low-carbon compute experience pavilion | Zhongzhiyuan | Science communication | Aggregate energy metrics only |
| TS-01 | Full-stack model safety test field | Zhongzhiyuan | **Testing/validation** | Closed red-team runs; desensitized results |
| TS-02 | Low-speed robot delivery test block | Dazhongsi | **Testing/validation** | Restricted hours and routes; human supervision |
| TS-03 | AI mobility slow-traffic co-pilot section | Xiaoyuehe wing | **Testing/validation** | Minimized sensing; opt-out available |

### Three Testing & Validation Scenarios, Deepened (agent.3)

The three testing-and-validation scenarios are expanded along seven dimensions — spatial placement, phasing, actors, data boundaries, human review, operating mechanism and risk — all framed as concept proposals and pilot directions, not approved operations [source:AGENT-TASKBOOK].

**TS-01 Full-stack Model Safety Test Field (Zhongzhiyuan)**: a visitable testing node for autonomous models, red-team evaluation and standards development. Spatially it anchors on the central R&D cluster of Zhongzhiyuan, repurposing an existing testing space as a "safety-evaluation sandbox"; the near-term pilot is closed testing, opening to appointment-based observation in the mid-term. Actors are resident AI enterprises and standards bodies; operations follow the four-step application-assessment-pilot-review loop. Test data stays fully closed; results are desensitized and only aggregated reports are released, with human review as a precondition for release. The key risk is coordinating evaluation capacity with standards authority, requiring professional deepening [data:geometry/key_areas.geojson#PROV-KEY-001].

**TS-02 Low-speed Robot Delivery Test Block (Dazhongsi)**: building on the four-quadrant pedestrian connectivity at Dazhongsi station, a time-restricted, speed-limited corridor is selected as a low-speed delivery test lane. The near-term pilot involves a single operator with low-speed delivery vehicles and on-site human supervisors; extension is decided after mid-term evaluation. Only delivery trajectories and operational status are collected — no pedestrian identity; the lane's open hours are separated from pedestrian flow, with human review of abnormal events. The key risks are pedestrian-vehicle conflict and public acceptance, requiring dedicated transport, municipal and safety assessment [data:geometry/key_areas.geojson#PROV-KEY-003].

**TS-03 AI Slow-mobility Co-pilot Section (Xiaoyuehe wing)**: a section along the Xiaoyuehe slow-mobility belt is selected as a traffic slow-mobility co-pilot section, using low-intrusion sensing to help identify slow-mobility gaps, congestion and accessibility needs. Sensing data is minimized and anonymized, with opt-out available; signal-optimization suggestions are advisory only and implemented by professionals after human review. The near term focuses on data collection and problem identification; the mid-term pilots signal coordination. The key risk is privacy and data boundaries, governed by data-minimization and opt-out principles [data:geometry/roads.geojson#ROAD-001] [metric:scenario_node_count].

### Scenario-Space-Operation Mapping

Each scenario node maps to corresponding layers in `geometry/` (public space, green space, roads or key areas) and is registered in `compliance_matrix.json`; operations follow a four-step "application — assessment — pilot — review" mechanism, with human review as a mandatory step [data:geometry/public_space.geojson#PUBLIC-001] [metric:scenario_node_count]. All scenarios are concept proposals and pilot directions, not approved operating arrangements.

## Land Use, Building Scale and Retain/Renovate/Demolish

Land use follows national land-space classification logic as a complete, closed and seamless partition (geometry recomputation gap <0.001%) [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001] [metric:land_use_coverage]. Building footprint totals about 31.1 ha (about 2.7% of the overall area), expressed as concept footprints for AI R&D, industry-service and community-support types — a design quantity recomputable from geometry, not a statutory building scale [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm].

Statutory indicators — FAR, density, height, green ratio — are uniformly recorded as `status=unknown` pending official regulatory plans and existing-building data, with pending conditions and recalculation paths documented in `assumptions.json`; no retain/renovate/demolish conclusions are fabricated [depth:height_massing_character] [assumption:A-CONTROLS-001].

## Transport, Rail, Municipal Works and Public Services

The transport strategy targets four issues: **station integration** (Dazhongsi station; Wudaokou/Qinghua East Road West direction), **road micro-circulation and slow-mobility gaps** (Heritage Park grade-separation nodes and community-level gaps), **non-motorized and parking organization**, and **event-day transport management**. The slow-mobility system takes the Heritage Park vitality spine as its north-south axis, organizing a three-tier "park loop + community loop + station connection" network [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]. Where road redlines and engineering conditions are missing, conclusions are stated as pending confirmation.

Municipal and public services cover innovation service platforms, talent life services, new infrastructure (edge compute, distributed energy) integrated with conventional utilities; service radii, standards and phasing are explained in the indicators chapter and `metrics.json`. Missing pipeline, energy, drainage, flood-control and fire-safety engineering data are listed as preconditions for formal deepening [depth:municipal_new_infrastructure].

![Composite system of mobility, slow traffic and blue-green public space](assets/figures/mobility-bluegreen.png)

## Blue-Green Space, Public Space and Urban Character

The blue-green framework takes the Heritage Park vitality spine as its skeleton, coordinates the Qinghe, Xiaoyuehe and mobility needs of universities, enterprises and communities, and forms a north-south-through, east-west-stitching walking/cycling network with a continuous green system (green space about 12.3%, public space about 7.3%, recomputed from this package's geometry) [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001] [metric:green_ratio] [metric:public_space_ratio].

Urban character uses "Jing-Zhang grey, Haidian blue and AI purple" as its tone, fusing railway industrial memory, Zhongguancun innovation culture and AI new culture. **Three AI pilgrimage landmarks (agent.4)** are proposed as concept nodes, all framed as cultural concept proposals requiring cleared rights and deepening, not as approved construction [source:AGENT-TASKBOOK]:

- **L-01 Qinghuayuan Station · AI Origin Bell**: anchored at the century-old starting station, an "autonomous innovation timeline" public installation linking 1909 Jing-Zhang, 1980 Zhongguancun and today's open-source AI nodes, with an AI cultural-guide scenario;
- **L-02 Code & Track · Open-Source Contribution Honor Wall**: a track-and-Git-branch isomorphic honor interface recording open-source contributors and agent collaboration history, forming a sustainably updated contribution memorial system;
- **L-03 Dazhongsi · AI Energy Field**: a visual counterpoint of ancient-bell symbolism and compute pulses, shaping a public landmark and event stage for AI-native businesses.

## Renewal Project List, Implementation Policy and Phasing

The renewal project list follows a "discussable, reviewable, deepenable" principle (mapped to `geometry/phasing.geojson`) [data:geometry/phasing.geojson#PHASE-001] [depth:renewal_project_list]:

| No. | Project | Type | Phase | Key dependencies |
| --- | --- | --- | --- | --- |
| JZ-01 | Heritage Park slow-mobility gap stitching | Public space/transport | Near-term pilot | Road redlines, underpass review |
| JZ-02 | Zhongzhiyuan Qinghe low-carbon innovation corridor | Blue-green/industry showcase | Near-term pilot | River blue line, flood control |
| JZ-03 | Origin community campus-adjacent transformation street | Renewal/industry services | Mid-term renewal | Campus boundaries, ownership, ground-floor uses |
| JZ-04 | Dazhongsi station four-quadrant connectivity | Rail integration/slow mobility | Mid-term renewal | Station, junctions, utilities |
| JZ-05 | Edge-compute and public-service nodes | New infrastructure/public services | Mid-term renewal | Energy, compute, operating entity |
| JZ-06 | Open-source honor wall and pilgrimage landmarks | Culture/brand | Long-term governance | Heritage protection, permits, cleared rights |

### Global AI Event System and Long-Term Operation (agent.6)

**Annual event system** is organized by season, all framed as concept proposals and operational directions, not as confirmed government arrangements [source:AGENT-TASKBOOK]:

- **Spring (March)**: global AI scenario-open applications and test-block review;
- **Summer (June)**: Jing-Zhang Open-Source Developer Conference and hackathon (building on World AI Conference traffic);
- **Autumn (September)**: annual open-call results release and selected-proposal exhibition (aligned with the call cycle);
- **Winter (December)**: open-source honor-wall annual unveiling and contribution review, releasing the annual *AI Heritage Loop White Paper*.

**Developer-community operation** runs dual-track via GitHub open collaboration and offline workshops, with a conversion path of "scenario open — test feedback — code contribution — honor record"; **scenario-open operation** follows the four-step application-assessment-pilot-review; **international communication and attraction** uses the annual white paper, international roadshows and the developer honor system as channels to form a long-term "event — talent — enterprise — industry" conversion chain, with all business-attraction and policy arrangements labeled as concept proposals [depth:phasing_implementation].

## Indicators, Area Recalculation and Compliance Matrix

Indicators fall into three classes: **recomputable spatial indicators** (computed directly from this package's geometry, see table below), **indicators pending regulatory support** (FAR, height, density, etc., `status=unknown`), and **indicators requiring operational calibration** (talent density, event participation, etc., with methods and sources registered in `metrics.json`). Core recomputed spatial indicators [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio] [depth:metrics_recalculation]:

| Indicator | Recomputed value | Note |
| --- | --- | --- |
| Overall design area | 11,412,825 m² (11.41 km²) | Matches announced 11.4 km²; provisional precision |
| Total key-area area | 3,692,893 m² (369.3 ha) | Zhongzhiyuan 192.9 / Origin 104.3 / Dazhongsi 72.0 ha |
| Industry-function share | about 48% | Recomputed from land-use layers |
| Residential and community share | about 24% | Recomputed from land-use layers |
| Parks, green and open space | about 23% (1,408,601 m²) | Recomputed from green-space layer |
| Building footprint | about 2.7% (310,807 m²) | Concept footprint; not statutory scale |
| Public-space share | about 7.3% (836,346 m²) | Recomputed from public-space layer |
| AI scenario nodes | 13 (incl. 3 testing/validation) | Registered scenario cards |
| Renewal projects | 6 (with phasing) | Registered project list |

The compliance matrix in `compliance_matrix.json` maps every announcement task and the six agent tasks (agent.1–agent.6) to report sections, layers, indicators, drawings, sources and self-checks; professional-standard responses are in `standard_matrix.json` and design-depth responses in `design_depth_matrix.json` [source:AGENT-TASKBOOK].

![Core indicator recalculation and evidence chain](assets/figures/metrics-evidence.png)

## Risks, Copyright and Compliance

**Bilingual contract**: this file is the Chinese master; the full English translation is in `proposal.en.md`; the rendered report, visual HTML, A3/A0 drawings and text-bearing figures are provided bilingually. **Sources and copyright**: all referenced material comes from sources registered in `sources.json` or from this package's self-generated data; the provenance and licenses of images, drawings, icons and code assets are stated in `report/copyright_statement.md` [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS].

**Compliance commitment**: this proposal does not claim official approval, approved regulatory plans, final land ownership, confirmed construction scale, or guaranteed implementation; all spatial landing, event operations, brand communication and policy mechanisms are framed as "concept proposals", "reference schemes" or "available for professional deepening". The HTML visualization is fully offline — no remote scripts, tiles, fonts, iframes, forms or APIs, and no reviewer tracking [depth:risk_missing_data].

**Data gaps and recalculation triggers**: once official boundaries and key-area polygons are released, the site boundary, key areas, land use, roads, green space, public space, buildings, phasing and all spatial indicators must be recomputed; missing regulatory, road, ownership, municipal and heritage conditions are registered in `assumptions.json` and trigger professional review.

## References

- Haidian Branch, Beijing Municipal Commission of Planning and Natural Resources: *Qualification Pre-announcement for the International Urban Design Open Call for the Centennial Jing-Zhang AI Innovation Belt* (2026-05-09)
- *Excerpts from the Open-Call Taskbook for Global Agents on the Centennial Jing-Zhang AI Innovation Belt* (user-provided cleared summary, 2026-05-18)
- Ministry of Housing and Urban-Rural Development: *Urban Design Administration Measures* (2023); *Measures for Formulation and Approval of Regulatory Detailed Plans for Cities and Towns*
- Ministry of Natural Resources: *Guidelines for Land-Sea Classification in Territorial Spatial Survey, Planning, Use Control* (2023-11)
- CAC and six other departments: *Interim Measures for the Administration of Generative AI Services* (2023-07)
- Standing Committee of the National People's Congress: *Law of the PRC on Barrier-Free Environment Construction* (2023-06)
- General Office of the State Council: *Implementation Plan on Solving Difficulties for the Elderly in Using Intelligent Technology* (Guobanfa [2020] No. 45)
- Repository site package: `brief/site-package/design_brief.json`, `allowed_design_space.json`, `geometry/provisional_boundaries.geojson`, `data/source_registry.json`, `data/processed/agent_fact_pack.md`
- Full machine index: `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`
