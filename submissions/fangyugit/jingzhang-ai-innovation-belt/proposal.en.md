---
title: "100-Year Jingzhang Smart-Vein Living Belt -- Design Proposal (EN)"
author_github: "fangyugit"
language: "en"
translation_of: "proposal.md"
bilingual_contract_version: "1"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Centered on the 'Jingzhang Smart-Vein Living Belt' concept, delivering three positionings (100-Year Jingzhang Cultural Belt, Urban AI Living Experience Belt, AI Integration Innovation Belt), a 'One Belt, Three Cores, Multiple Scenarios, Blue-Green Slow Ring' spatial structure, plus 10 AI scenario cards, user personas, 3 test-validation scenarios, 4 AI pilgrimage landmarks and an annual activity system."
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "ai-origin-community"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v0.2"
---

# 100-Year Jingzhang Smart-Vein Living Belt -- Design Proposal (EN)
This is the English translation of `proposal.md` (Chinese). See the Chinese version for the authoritative Chinese narrative.
> This proposal is an AI-agent formal submission (AI assistant Operit / deepseek-v4-flash, under human guidance) to the 100-Year Jingzhang AI Innovation Belt Urban Design open solicitation. All spatial recommendations are concept suggestions and reference schemes for professional teams to develop; they do not replace formal planning or constitute government-approved conclusions.
## Design Basis and Source List

This proposal takes as its primary basis the 2026-05-09 eligibility announcement "International Design Solicitation for the 100-Year Jingzhang AI Innovation Belt Urban Design" by the Haidian Branch of Beijing Municipal Commission of Planning and Natural Resources, together with the agent-oriented design brief [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. The design is organized along the agent.1~agent.6 response hierarchy required by the taskbook: concept & naming → three positionings → regulatory-depth design → key-area detailed design → scenarios/personas/testing → cultural narrative & activity operations [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. All design decisions trace back to the repository site-package `brief/site-package/`, the public source registry `data/source_registry.json` and the processed fact-pack, as itemized in `sources.json` [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK].

**Key reference layers and data sources**: `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` define the scope boundaries [data:geometry/site_boundary.geojson#SITE-001] [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]; professional standard snapshots provide urban-design depth, regulatory-ordinance context and land-use classification semantics [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

**Boundary data status (mandatory disclosure)**: As of the proposal date the official redline and the three key-area official polygons are not yet public. This proposal uses the repository's provisional coarse boundary (`provisional_boundaries.geojson`, `official_boundary=false`) for generation, display and temporary self-check only; it is not an official redline, approval basis or exact-area basis, and must be recomputed, replaced and re-validated once official data are released. This organizer data gap does not block content scoring [source:BOUNDARY-SOURCE] [depth:risk_missing_data].

![Master Concept and Scope Framework](assets/figures/site-overview.png)

## Three-Level Scope Framework

The scope follows the scaffold three-level structure, propagated level by level without over-concluding across levels [depth:three_level_scope_framework]:

- **Coordinated research scope** (PROV-RESEARCH-001, ±43.6 km²): the cross-district research circle addressing industrial strategy and future-city form, including rail, municipal and ecological corridor links [source:OFFICIAL-ANNOUNCEMENT].
- **Overall design scope** (SITE-001, ±11.4 km²): the primary object of regulatory-depth design; all design layers (land use, buildings, roads, green space, public space, phasing) are generated within this scope [data:geometry/land_use.geojson#LU-001] [depth:overall_spatial_structure].
- **Key-area scope** (PROV-KEY-001/002/003, ±369.3 ha in total): the three key areas designed at refined depth per the integrated-planning urban-design standard [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design].

## Coordinated Research Area: Industry and Future City Research

At the coordinated research level, this proposal takes "from the zigzag railway to the smart-vein city" as the keynote, proposing the **"Jingzhang Smart-Vein Living Belt" master concept**: extending century-old engineering wisdom into an urban operating system for the intelligent era, where AI is no longer an add-on but an infrastructure carrying growth, channeling flows and igniting innovation. The concept is expressed as "One Belt, Three Cores, Multiple Scenarios, and a Blue-Green Slow Ring", supported by three systems—the "Two Cores, One Corridor" AI full-stack autonomy system, a world-class AI innovation ecosystem, and an AI governance discourse platform [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

**Future-city form fit for AI**: a "source-creation → piloting → transfer → listing" spatial relay spans the belt, building a chain from algorithms, compute and data to terminals and applications; the five core functions (innovation source-creation, industrial transfer, living experience, cultural narrative, governance demonstration) interlock along the belt into a self-reinforcing loop [source:AGENT-TASKBOOK].

### English Brand Name and Visual Identity Direction (agent.1)

- **Official English brand**: **Jingzhang Smart-Vein Living Belt** (Chinese: 京张智脉共生带), establishing an independent, extensible brand identity.
- **Logo and symbol rule**: derived from the "zigzag railway switchback" motif into an extensible **Smart-Vein symbol** (Z-switchback + arc data-flow), forming a unified visual language for the logo, wayfinding, honor wall and all figure series.
- **Visual identity (VI) direction**: dual-color system of "calm Jingzhang industrial-heritage base + AI tech blue"; geometric sans-serif typography aligned with a modern AI vocabulary; applied to charts, drawings, HTML and public-space wayfinding components.
- **Positioning coordination**: the three positionings (100-Year Jingzhang Cultural Belt / Urban AI Living Experience Belt / AI Integration Innovation Belt) — five functions — "three cores, two wings" coordination, visualized in `assets/figures/mobility-bluegreen.png` and HTML.

### Global AI Innovation-Ecosystem Cases (benchmark of 8, supporting differentiation)

The scheme benchmarks 8 global AI/innovation-ecosystem cases as differential references for ecosystem organization, public space and operations (all public background material, registered in `sources.json`) [source:PROCESSED-FACT-PACK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]:

| Case | Location | Borrowed dimension | Difference from this scheme |
|---|---|---|---|
| Silicon Valley (Stanford Research Park) | USA | university–industry–capital synergy | full-chain "open-source + pilot-transfer" closure |
| Kendall Square | Boston, USA | lab agglomeration, TOD station-city | 100-year rail heritage + blue-green systems |
| Station F | Paris | single large incubator + community ops | "one belt, three cores" distributed ecosystem |
| Tsukuba Science City | Japan | national R&D agglomeration, work-life | urban renewal + historic district preservation |
| one-north | Singapore | park-city, green slow mobility, industry-city | AI scenario services + public-safety experiments |
| Hangzhou Future Sci-Tech City / Zhijiang Lab | China | platform–lab–industry linkage | Jingzhang cultural narrative + AI governance |
| Zhongguancun Software Park / Science City | Beijing | open source, compute, unicorn incubation | links Haidian AI clusters and regional synergy |
| Seoul Digital Media City (DMC) | Korea | media content + tech cluster, cultural reach | AI culture-tourism + global developer community |

### Region–Industry–Space Mapping and Ecosystem Map

A six-factor guarantee mechanism "land–capital–talent–compute–data–scenario" supports the ecosystem [source:AGENT-TASKBOOK]: land (resilient "plug-in" module plots), capital (incubation fund + public platform), talent (university–enterprise–community), compute (pilot compute hub), data (open data interface), scenarios (operable SC-01~SC-10). The ecosystem map runs in a loop: "open-source source-creation (Zhongzhi Park) → pilot-transfer (AI Origin Community) → listing-transfer (Dazhongsi) → scenario operations (whole belt)".

### Regional Innovation Collaboration

The scheme forms coordination interfaces with Beiwitun Community, Future Science City, Huairou Science City, Economic-Technological Development Area and the Beijing–Tianjin–Hebei region [source:SOURCE-REGISTRY]: organizing the "Zhongguancun Sci-Tech Service Wing" (enterprise growth & transfer) and "Xiaohe Rue Scenario-Enabling Wing" (AI scenario landing & public benefit) along the Jingzhang corridor, linking external innovation nodes via rail and municipal corridors into a regional AI full-stack innovation network.

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The overall design scope is ±11.4 km², developed at regulatory-plan depth with an urban-renewal and urban-design view [depth:overall_spatial_structure] [depth:existing_conditions_diagnosis].

### Land Use, Building Scale, Retain-Renovate-Demolish

Six dominant land-use categories are defined across the overall scope per "innovation-led, life-composite, blue-green-weaved" principles (see `geometry/land_use.geojson`) [depth:land_use_layout] [data:geometry/land_use.geojson#LU-001]:

| Code | Dominant Function | Layout Point |
|---|---|---|
| 0701 (residential) | Talent housing, mixed communities | Around AI Origin Community, south clusters |
| 08 (public service) | Culture-commerce & community support | Dazhongsi cultural salon, community service rings |
| 05/0802 (commerce/research) | AI HQ, R&D, incubation, piloting, compute | Zhongzhi Park & AI Origin Community "source-transfer" |
| 1401 (green/open) | Heritage park, waterfront green, open plazas | Jingzhang heritage vitality belt |
| 1207 (transit/municipal) | Transit stations, slow corridors, energy | Three-tier mobility & utility corridor |

Roughly 49% innovation-productive (commerce+research), 39% residential+public-service, 8% green/open, 4% transit & utility, per recomputed `metrics.json` (EPSG:4549) [metric:site_area_sqm] [metric:building_footprint_area_sqm]. Building scale and retain-renovate-demolish follow "retain heritage, retrofit, weave new" principles; building types cover R&D, piloting, cultural landmark and talent housing (`geometry/buildings.geojson`) [depth:retain_renovate_demolish] [depth:development_intensity_controls].

![Land-Use Structure and Spatial Structure](assets/figures/land-use-structure.png)

### Transport, Rail, Municipal Infrastructure and Public Services

A three-tier mobility skeleton works in coordination with rail, municipal and public-service facilities [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure]:

- **Tier 1 (regional express)**: rail trunk + expressways, carrying city-level passenger flow (`geometry/roads.geojson`) [source:SOURCE-REGISTRY].
- **Tier 2 (intra-belt backbone)**: east-west rail branch and north-south smart-vein spine linking the three cores.
- **Tier 3 (slow micro-network)**: 15-min walk circles + blue-green slow ring covering all scenario points and public spaces (track: ai-traffic-walkability) [metric:public_space_ratio].

### Blue-Green Network and Public Space

Green ratio ≈ 13.96%; public space ratio ≈ 17.92% (EPSG:4549). The Jingzhang heritage park forms the green spine, north-south blue-green corridors the weave, and pocket parks the nodes: "one axis, two corridors, multi-node" (`geometry/green_space.geojson`, `public_space.geojson`) [metric:green_ratio] [depth:blue_green_public_space].

### Urban Character

With "smart-vein symbiosis" as the character theme, a three-segment pattern is formed (northern innovation-and-manufacturing, central vitality-and-mixed, southern culture-and-quality), extending the calm base tone of Jingzhang industrial heritage with glass, perforated panels and other modern AI vocabulary [source:PROCESSED-FACT-PACK].

## Detailed Design of Key Areas

Based on the `design_brief.json` key_areas and the three key areas in `geometry/key_areas.geojson`, each is designed at refined depth across five elements (land function, spatial form, public space, slow mobility, site indicators). See `geometry/land_use.geojson` and `design_depth_matrix.json` [depth:three_key_area_detailed_design] [depth:height_massing_character].

### PROV-KEY-001 Zhongzhi Park · Open-Source Source-Ecosystem Core (192.1 ha, north)

Positioned as the global open-source AI source hub and proof-of-concept center, led by commerce+research R&D offices and public technology platforms with an open-source community center, open code plaza and evaluation center; extending the historical axis of the Jingzhang locomotive depot to shape an "Open-Source Plaza — Source Tower — Shared Workshop" ceremonial innovation sequence (track: ai-origin-community). [data:geometry/key_areas.geojson#PROV-KEY-001]

### PROV-KEY-002 AI Origin Community · Pilot-to-Transfer Core (104.3 ha, mid)

Positioned as the pilot-maturing and talent community between "school-lab-market": pilot-maturing bases, compute hub, talent housing and commercial support combined; compact mixed blocks around the "AI Origin" station-city node, "residence-above / research-below" and job-housing balance. [data:geometry/key_areas.geojson#PROV-KEY-002]

### PROV-KEY-003 Dazhongsi · Cultural Salon Core (72.0 ha, south)

Positioned as the cultural salon and AI culture-tourism experience center: cultural display, immersive experience, commercial leisure and hotel services; the **Dazhongsi AI Star Hall** (L4) reshapes the south gateway image (track: jingzhang-heritage-narrative). [data:geometry/key_areas.geojson#PROV-KEY-003]

The three key areas total ±369.3 ha, about 32% of the overall scope, forming the spatial anchor of the "One Belt, Three Cores".

![Detailed Design of Three Key Areas](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### User Personas
Personas span university makers, AI engineers, industrial entrepreneurs, citizen families, and global visitors & developers, capturing their needs for open-source access, piloting, financing, everyday convenience and culture experience (P1~P5). [source:PROCESSED-FACT-PACK]

### Refined Personas and Inclusion Analysis (agent.3)

Beyond the five core personas, refined personas and a need–conflict analysis address public benefit and digital inclusion to avoid a digital divide [source:AGENT-TASKBOOK]:

| Refined persona | Core need | Potential conflict / risk | Response |
|---|---|---|---|
| Seniors (60+) | offline alternative, large-text/voice, accessible booking | AI self-service unclear, high barrier | SC-09 accessible guidance + offline counter fallback |
| Low-income residents | affordable public service access, jobs | paid scenario experience, exclusion | public scenarios free open, community jobs |
| Caregivers / families | family accessibility, care efficiency | fragmented scenarios, waiting cost | one-stop "family AI butler" booking |
| Non-smartphone users | reach without download | App dependence, digital-ID barrier | QR-code / phone / offline three channels |
| Existing community stakeholders | non-forced relocation, transparent resettlement | renewal impact on jobs & community | near-term retention, co-creation, feedback |

- **Equity / accessibility indicators**: each scenario sets three indicators—offline-alternative reach, digital-exclusion remedy, accessibility acceptance—into `design_depth_matrix.json` and operations review [depth:blue_green_public_space].
- **Human-centered governance boundary**: SC-07 public-safety reasoning serves only as **assistive prediction with human review**, not automated enforcement, with human final judgment and an appeal channel for credible human-centered governance [source:AGENT-TASKBOOK].

### AI Scenario Cards (10, including 3 industrial test-validation scenarios)

Each card covers scenario ID, location, served persona, AI capability, data reliance, related layers and validation indicator, spanning track/scenario combinations [source:AGENT-TASKBOOK]:

| ID | Scenario | Core AI Capability | Scenario |
|---|---|---|---|
| SC-01 | Open-Source Code Plaza | Collaborative-dev Copilot, contribution review | - |
| SC-02 | Smart-Building Energy Butler | Energy forecast, carbon-reduction dispatch | - |
| SC-03 | AI Commute Ask-and-Go | Multi-modal travel Agent | ai-traffic-walkability |
| SC-04 | Local-Life AI Assistant | Commerce recommendation, matchmaking | - |
| SC-05 | Immersive Railway Experience Hall | Generative-content culture guide | - |
| SC-06 | Full-Stack Achievement Hall | Tech-panorama visualization | enterprise-service-copilot |
| SC-07 | Public-Safety Reasoning Experiment | Risk prediction, incident reasoning | public-safety-operations-review |
| SC-08 | Enterprise-Service Sandbox | Document/approval office Agent | enterprise-service-copilot |
| SC-09 | Accessibility-Friendly AI Guide | Barrier-free planning, voice nav | ai-traffic-walkability |
| SC-10 | Youth AI Science Camp | Learning-path generation, venue linkage | - |

**Full scenario-card parameters (agent.3, refined)**—each card further specifies **data, privacy, human review, operations responsibility and evaluation baseline**; fully expanded for SC-07 (high-risk governance) and SC-03 (mobility):

| Parameter | SC-07 Public-Safety Reasoning | SC-03 AI Commute Ask-and-Go |
|---|---|---|
| Data reliance | de-identified event posture, authorized cameras | real-time traffic, rail, slow-network |
| Privacy impact | high (imagery); face-anonymized, minimized | medium (location); session-level masking |
| Human review | **required**: human final, no auto enforcement | optional: route suggestion, human editable |
| Operations owner | public-safety authority + independent evaluation | mobility platform + multi-modal operators |
| Failure mode / fallback | cascade to conventional monitoring + staffing | fallback to conventional navigation/guidance |
| Evaluation baseline | false-alarm, appeal response, human-fallback | travel satisfaction, on-time, reachability |

The remaining SC scenarios register data, precision, review and operations fields by the same template in `design_depth_matrix.json` and `compliance_matrix.json`. The **Xiaohe Rue Scenario-Enabling Wing** (public-benefit AI scenarios) and the **public experience route** (linking L1~L4) are mapped in the Blue-Green and Transport sections.

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Detailed in the "Overall Design Area" section; this item lists the six land-use codes, building-scale totals and retain-renovate-demolish strategy, all consistent with `geometry/land_use.geojson`, `geometry/buildings.geojson` and recomputation in `metrics.json`, and tied to the design-depth matrix's land-use layout and demolition elements [depth:land_use_layout], regulatory plot indicators [depth:development_intensity_controls], and recomputed building totals [metric:building_footprint_area_sqm]. Retain-renovate-demolish follows "retain heritage, retrofit, weave new" as implemented in `geometry/buildings.geojson` [depth:retain_renovate_demolish].

![Metrics Recalculation and Evidence Chain](assets/figures/metrics-evidence.png)

## Transport, Rail, Municipal Infrastructure, and Public Services

This layer implements the three-tier mobility skeleton coordinated with rail, municipal and public-service facilities supporting the slow-oriented structure of "One Belt, Three Cores, Multiple Scenarios, Blue-Green Slow Ring" (track: ai-traffic-walkability), as detailed in `geometry/roads.geojson` [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure].

- **Tier 1 (regional express)**: rail + expressway/arterial, constituting a 30-minute metropolitan accessibility circle [source:SOURCE-REGISTRY].
- **Tier 2 (intra-belt backbone)**: east-west rail branch and north-south smart-vein spine (secondary connections) linking the three cores.
- **Tier 3 (slow micro-network)**: 15-min walk circles + blue-green slow ring (greenway/pedestrian/cycleway) covering all scenario points and public spaces, with "rail + slow" seamless transfer at stations [metric:public_space_ratio].

Municipally, corridors are reserved for water supply/drainage, power and utility tunnels (`geometry/constraints.geojson`); public services fill education, culture, medical and sports service points within 15-minute living circles for balanced coverage. The slow ring also links the four landmarks, forming a "rail + cultural slow-tour" route.

## Blue-Green Network, Public Space, and Urban Character

### Blue-Green Network Skeleton

With the Jingzhang heritage park as the green axis, two north-south blue-green corridors as threads, and community pocket parks as nodes, a "one axis, two corridors, multiple nodes" skeleton is formed (`geometry/green_space.geojson`); green ratio ≈ 13.96% (EPSG:4549) via waterfront promenades, tree-lined avenues and plaza green corridors [metric:green_ratio] [depth:blue_green_public_space].

### Four AI Pilgrimage Landmarks (L1~L4)

- **L1 Jingzhang Smart-Vein Gate**: the north gateway, a "zigzag" steel structure interpreting railway memory merged with AI.
- **L2 Open-Source Plaza**: the Zhongzhi Park core, hosting the AI innovation contribution wall, annual flagship releases and open-source carnival.
- **L3 Full-Stack Achievement Hall**: an enterprise exhibition hall in AI Origin Community showcasing China's AI full-stack independent-innovation achievements.
- **L4 Dazhongsi AI Star Hall**: a south gateway cultural salon injecting immersive AI culture-tourism experiences.

### AI-Native New Business and Urban Character
Four categories—"open-source source creation, pilot transformation, culture experience, life service"—cultivate AI-native business to form a self-sustaining ecology; character follows the "smart-vein symbiosis" three-segment theme described above [depth:blue_green_public_space].

### Public-Space Component Library and Wayfinding (agent.4/agent.5)

- **Public-space component library**: centered on the Jingzhang heritage park, a reusable component library—paving (industrial-heritage brick + modern panels), tree pits/seating, accessible ramps/railings, light poles and info screens, canopy grey-space—registered in `design_depth_matrix.json` to support standardized delivery of street re-alignments, pocket parks and station-city nodes [depth:blue_green_public_space].
- **Wayfinding symbol system**: unify navigation signs, landmark plaques, honor walls and scenario-entrance wayfinding with the "Smart-Vein symbol" (zigzag switchback + arc data-flow), including accessible Braille and voice guidance.
- **Honor & display system**: an AI innovation contribution wall, open-source contributor honor system and open evaluation center recording every code submission, patch and scenario co-creation (L2 Open-Source Plaza hosts annual flagship releases and carnival).
- **Cultural resources & landmark anchors**: anchor on the Jingzhang heritage park, locomotive-depot axis, Dazhongsi heritage and rail memory to build a cultural-resource list and spatial hierarchy, avoiding simple abstract rectangles in place of real site information (anchors in `sources.json`) [source:PROCESSED-FACT-PACK].
- **International-communication copy direction**: differentiated outreach for global developers, enterprises and visitors around the "Jingzhang Smart-Vein Living Belt" brand ("from the zigzag railway to the smart-vein city" narrative + developer community + international AI week), delivered via `proposal.en.md` and the English figures/HTML.

![Transport, Slow Mobility and Blue-Green Public-Space Composite System](assets/figures/mobility-bluegreen.png)

## Renewal Projects, Implementation Policy, and Phasing

### Renewal Project List (JZ-01~JZ-06)

| Project | Content | Key Area |
|---|---|---|
| JZ-01 | Open-Source Plaza and Source Tower | Zhongzhi Park |
| JZ-02 | Pilot-Maturing Base and Compute Hub | AI Origin Community |
| JZ-03 | Full-Stack Achievement Hall | AI Origin Community |
| JZ-04 | Dazhongsi AI Star Hall and Cultural Salon | Dazhongsi |
| JZ-05 | Jingzhang Heritage Vitality Belt and Blue-Green Slow Ring | Whole belt |
| JZ-06 | Low-Capacity Smart Rail and Unmanned Delivery Corridor | Whole belt |

[depth:renewal_project_list] [source:AGENT-TASKBOOK]

### Implementation Policy and Phasing

- **Near term (2026—2027)**: deepen overall regulatory design and key-area concept design; launch JZ-01/JZ-05; start the slow-mobility and unmanned-delivery pilot.
- **Mid term (2028—2030)**: complete the Zhongzhi Park and AI Origin Community cores; open the L1~L4 landmarks; launch the annual GAIW flagship event.
- **Long term (2031— )**: full-scenario operation across the belt; mature the "One Belt, Three Cores"; sustainable AI innovation ecosystem and brand effect. [depth:phasing_implementation]

### Long-Term Operations Framework (agent.6)

The scheme specifies the operations owners, mechanisms and appraisal that go beyond an "AI Innovation Week + slogans" [source:AGENT-TASKBOOK]:

- **Operations owners**: multi-party co-governance of a "Jingzhang Smart-Vein Belt Operating Company (proposed) + public platform (platform company/committee) + scenario operators (third-party/enterprise) + developer community"; responsibilities registered in `compliance_matrix.json` and `materials_ledger.md`.
- **Budget & resource types**: public fiscal guidance + scenario-operating revenue + incubation/fund returns + enterprise onboarding and developer-service fees, forming a sustainable funding loop.
- **Annual activity calendar**: GAIW (Grand AI Innovation Week) as the spine, layered with "four-season brand actions" (Spring open-source launch, Summer pilot acceleration, Autumn innovation showcase, Winter science education) plus ongoing hackathons, Open Days and Meetups.
- **Developer-community regime**: open code repositories, contribution wall, contributor honor system and open-source carnival, sustaining open-source operations.
- **Scenario opening & access/exit process**: scenarios follow "access appraisal (data/privacy/security) → sandbox pilot → production launch → periodic exit"; high-risk scenarios (e.g., SC-07) keep human review and an appeal channel.
- **Attract-and-convert funnel**: quantifiable project-attraction, incubation and conversion indicators along "open-source → incubation → piloting → transfer".
- **Maintenance responsibility & performance review**: specify maintenance owners for blue-green space, public space and facilities, with annual performance review and a data-feedback loop [depth:phasing_implementation] [metric:public_space_ratio].

## Metrics, Area Recalculation, and Compliance Matrix

Indicators fall into three categories, recomputed in `metrics.json` [depth:metrics_recalculation]:

- **Spatial**: site_area_sqm (≈11439314, EPSG:4549), building_footprint_area_sqm (≈807951), green_ratio (≈0.1396), public_space_ratio (≈0.1792), key_area_count=3 [metric:site_area_sqm], with building total at [metric:building_footprint_area_sqm], green/public ratios at [metric:green_ratio] and [metric:public_space_ratio], and key-area count at [metric:key_area_count]. Floor_area_ratio is declared unknown absent an approved FAR control [metric:floor_area_ratio], to be recomputed once official regulatory data are released.
- **Regulatory**: land-use structural ratios, development-intensity gradients, transport and blue-green controls, in `compliance_matrix.json`, `standard_matrix.json`.
- **Performance**: scenario count (10), personas (5), test scenarios (3), landmarks (4), projects (6), etc.

The compliance matrix covers announcement 1.3/1.4/1.5 (17 items) and agent.1~agent.6 (6 items); the standard matrix covers 6 professional standards; the design-depth matrix covers 15 depth items (`design_depth_matrix.json`) [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Risk, Copyright, and Compliance

- **Boundary compliance**: boundaries and areas are based on provisional data (`official_boundary=false`) and are not statutory conclusions; all layers must be recomputed and replaced once official polygons are released [depth:risk_missing_data].
- **Copyright and display**: community-display nature (license=COMMUNITY-DISPLAY-ONLY); materials and indicators are registered in `sources.json`; no unauthorized third-party copyrighted works are referenced.
- **Risk exposure**: official SITE_BOUNDARY, KEY_AREA, approved FAR and surveyed terrain are not yet available—the largest current data gap, disclosed truthfully in the missing-data checklist and `assumptions.json`; this does not block content scoring [source:ASSUMPTIONS].

## References

- The 2026-05-09 eligibility announcement and the organizer-issued `design_brief.json`, `allowed_design_space.json`, `agent_task_requirements.csv` [source:OFFICIAL-ANNOUNCEMENT].
- The `brief/site-package/` provisional boundaries, key areas, enums, metrics and source list; `data/source_registry.json`, `data/processed/agent_fact_pack.md` [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK].
- The organizer's agent.1~agent.6 taskbook and scoring requirements [source:AGENT-TASKBOOK].