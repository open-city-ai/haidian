---
title: "Jing-Zhang Bell Code · Resonating the Centennial AI Innovation Belt"
author_github: "zxymiku"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Using the bell as an institutional symbol: three bells for three key areas (Ringing Bell / Tuning Bell / Return Bell), one bell-rope corridor (the Jing-Zhang Railway Ruins Park belt), a Bell Registry protocol and Quiet Hours, organizing the steam whistle of the century-old railway, the Yongle Bell of Dazhongsi and AI resonance into a verifiable, reviewable, and long-term operable urban design concept, supported by three themed tour lines, twelve governance-detailed scenario cards and an eight-dimension risk matrix."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "youth-friendly-public-space"]
scenarios: ["ai-cultural-guide", "ai-health-service-navigation", "ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v0.7"
---

# Jing-Zhang Bell Code · Resonating the Centennial AI Innovation Belt

## Design Basis and Source List

The primary basis of this proposal is the Qualification Pre-announcement of the Centennial Jing-Zhang AI Innovation Belt International Urban Design Open Call, published on 2026-05-09 by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources [source:OFFICIAL-ANNOUNCEMENT]. The task basis is the Excerpt of the Open-Call Taskbook for Global AI Agents (user-provided, rights-cleared) [source:AGENT-TASKBOOK]. Site data, enums, indicator ranges and the source list come from the maintainer-registered content in `brief/site-package/` [source:SITE-PACKAGE], and use boundaries are defined in `data/source_registry.json` [source:SOURCE-REGISTRY]: eight formal-ready sources (the pre-announcement, the taskbook excerpt, MOHURD Urban Design Measures, MOHURD Measures for the Compilation and Approval of Regulatory Detailed Plans, the MNR Land-Use and Sea-Use Classification Guide, the Interim Measures for Generative AI Services, the Barrier-Free Environment Law, and State Council Document [2020] No. 45), one background source (OSM license registration), and one provisional boundary source. Standard texts are always cited from the local snapshots under `brief/site-package/standards/references/` [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]; the machine index lives in `sources.json` and the three matrices rather than being repeated here.

**Boundary status and recomputation commitment**: as of this draft, no coordinate-bearing official redline is publicly available. All spatial data in this package is generated from `provisional_boundaries.geojson` [source:PROVISIONAL-BOUNDARIES] [data:geometry/site_boundary.geojson#SITE-001] [assumption:A-BOUNDARY-001]. The provisional boundary deviates from the announced text areas by 0.02%–0.43% and must not be treated as an official redline, an approval basis, or a statutory control conclusion. One thing to state plainly: the PROV-KEY key-area polygons are coarse-precision schematics, and this proposal infers no district-level statutory control indicators from them. When official geometry is released, all area-based layers and metrics must be recalculated as a whole; this gap originates from the organizer's data, not from anything participants control, so it does not block content scoring [metric:site_area_sqm].

![Evidence chain and submission package diagram](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal follows the three-level scope defined in the announcement [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. The coordinated research area (43.6 km², bounded by the North Fifth Ring Road to the north, Jingzang Expressway to the east, Xizhimen Outer Street to the south, and Wanquanhe Road to the west) answers the strategic question of a world-class AI innovation ecosystem and future urban form [depth:three_level_scope_framework]; the overall design area (11.4 km², the urban and industrial districts 1–2 km around the Jing-Zhang Railway Ruins Park) answers the spatial question of urban renewal at regulatory-plan depth [depth:overall_spatial_structure]; and the key detailed design area (368.4 ha in three districts) answers the implementation question at comprehensive implementation plan depth [depth:three_key_area_detailed_design]. From north to south the three key areas are the Zhongzhiyuan AI Autonomous Innovation Acceleration Area (approx. 192.1 ha), the Beijing AI Origin Community (approx. 104.3 ha), and the Dazhongsi AI Industry Cluster (approx. 72.0 ha) [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003].

The three levels are not three sets of drawings done in isolation. The coordinated research level decides the "bell" as an institutional symbol and shapes the three-district/two-wing circuit; the overall design level turns it into a spatial structure of "one bell-rope, three bells, quiet hours"; and the key-area level tests whether each bell node holds up at the scale of plots, stations, public spaces and AI scenarios. The full mapping is recorded in `compliance_matrix.json`, so every mandatory task in announcement sections 1.3/1.4/1.5 and agent.1–agent.6 has a corresponding section, layer, metric and drawing [depth:three_level_scope_framework].

![Three-level scope and spatial framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Overall concept: Jing-Zhang Bell Code

The Jing-Zhang Railway was the first trunk railway designed and built by Chinese engineers themselves; more than a century ago its steam whistle opened China's railway era. The Yongle Bell kept at Dazhongsi in Haidian is what the public hears of a "vessel of the state". Today the AI innovation belt has to gather scattered computing power, data, talent and use-cases into a "resonant" ecosystem [source:AGENT-TASKBOOK]. That is where the overall concept comes from — **Jing-Zhang Bell Code · Resonating the Centennial AI Innovation Belt**: the bell becomes the belt's institutional symbol, and the railway whistle, the Yongle Bell and AI resonance are strung into one continuous urban narrative.

The naming works in two layers, a "master brand plus cultural sub-brand" [depth:brand_identity_system]: the master brand "Mingzhong Jing-Zhang / Jing-Zhang Bell Code" carries the belt's identity and international communication, while the three sub-brands — "Whistle 1909" (railway culture), "Voice of Yongle" (Dazhongsi culture) and "Resonance" (AI culture) — each run their own narrative and wayfinding and stay separate from the belt-wide logo system [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The logo direction is a bell silhouette overlaid with concentric sound-wave rings in three colors — Yongle bell bronze, railway steel gray and AI electric blue — extensible into wayfinding, paving, shelters and lighting. All brand graphics are conceptual; fonts, images and marks require rights clearance before use.

**What sets this proposal apart**: the bell here is built as a **verifiable institutional mechanism**, not a symbol. The Bell Registry protocol (traceable registration of major releases and milestones) and Quiet Hours (a public institution on the human-machine boundary) form an operable, reviewable rhythm framework. Clock/timetable-style mechanisms supply a time-basis service, and switchback/turnout-style mechanisms speak the language of operations — neither covers the ritualized governance structure of "public ringing–registration–silence" that is open to every resident. A naming deduplication scan (run 2026-08-11 against 507 merged proposals and open PR titles) found no "bell-ringing/registry-protocol" mechanism naming among merged proposals; the open PR title "Echo Bell Court" (#1381) uses bell imagery as a place name, which does not conflict with this proposal's institutional positioning [assumption:A-BELL-001].

### Three positionings, five functions, and the three-district/two-wing circuit

The proposal builds on the three positionings (Centennial Jing-Zhang Culture Belt, Urban AI Life Experience Belt, AI-Integrated Innovation Belt) and five functions (AI full-stack autonomous innovation system, world-class AI innovation ecosystem, new paradigm of AI+ scenario enablement, intelligent AI vitality city, and global discourse power in AI governance) confirmed by the announcement and taskbook [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], and puts forward a "three bells, two wings, one rope" circuit:

- **Three bells**: Zhongzhiyuan is the **Ringing Bell** (morning bell) — the first sound of autonomous innovation, where the AI full-stack system departs; the AI Origin Community is the **Tuning Bell**, which sets and reviews the tone for open source, standards and evaluation; Dazhongsi is the **Return Bell** (evening bell) — market echo and convergence, receiving agents, content consumption and data elements back into the loop.
- **Two wings**: the Zhongguancun Technology Services Wing runs the **resonance circuit** of capital and IP for global allocation of factors; the Xiaoyuehe Scenario Enablement Wing runs the **sound-test and validation circuit** for open AI scenarios and city-scale testing.
- **One rope**: the Jing-Zhang Railway Ruins Park vitality belt is the **bell-rope**, linking the three bells and two wings as the shared spatial, cultural and operational main line.

### Global AI innovation ecosystem cases (5–8 readable summaries)

These international cases were studied to extract lessons that can actually be turned into Haidian's spatial and operational arrangements [source:AGENT-TASKBOOK]:

1. **Silicon Valley (USA)**: venture capital, universities and talent packed at high density — a lesson in "near-campus" ecosystem organization and distributing venture capital along an innovation corridor [source:CASE-SILICON-VALLEY].
2. **Kendall Square, Boston (USA)**: a block-scale innovation district anchored by MIT — worth borrowing for "campus–park" interface design and slow-traffic innovation corridors [source:CASE-KENDALL-SQUARE].
3. **Tel Aviv Innovation District (Israel)**: a high-density startup ecology grown in compact space, with civil-military fusion — showing that low-disruption renewal can still carry high startup density [source:CASE-TEL-AVIV].
4. **one-north, Singapore**: a government-led industrial park turning into a "livable innovation community" — pointing to full-lifecycle spatial provision that balances work, residence, commerce and services [source:CASE-ONE-NORTH].
5. **King's Cross, London (UK)**: the classic case of activating a former railway yard into an innovation quarter, and the closest analog to the Jing-Zhang ruins park — its method for translating railway heritage into innovation public space transfers directly [source:CASE-KINGS-CROSS].
6. **Station F, Paris (France)**: a single flagship incubator plus an open-operation ecosystem — supporting the flagship-anchor thinking for Dazhongsi's AI-native business types [source:CASE-STATION-F].
7. **Zhongguancun Software Park / Dongsheng Science Park (China, Haidian)**: a locally proven park–block integration model that dovetails with the "1+X+1" industrial system [source:OFFICIAL-ANNOUNCEMENT] [source:CASE-ZGC-SOFTWARE-PARK].
8. **Zhangjiang Science City "15-minute innovation circle" (China)**: innovation factors reachable within five minutes — a hint for organizing the connection between bell nodes and rail stations [source:CASE-ZHANGJIANG].

The common threads translate into four Haidian mechanisms: **near-campus** (anchor on university origination), **rail-adjacent** (organize innovation corridors along the bell-rope and rail), **reserve** (keep elastic space for national platforms and data elements), and **ring the bell** (establish a verifiable operational rhythm through ceremony and registry). Each case's public source (official website or government portal, verified 2026-08-11) is registered in `sources.json` (CASE-* entries); task mapping is in `compliance_matrix.json` (agent.2).

### Industrial ecosystem and indicator directions

Aligned with Haidian's "1+X+1" industrial system [source:OFFICIAL-ANNOUNCEMENT], industry priorities are organized in three segments — full-stack autonomy (Zhongzhiyuan), original innovation and open source (AI Origin Community), and AI-native/content consumption (Dazhongsi) — supported by indicators such as an AI innovation index, talent density, output scale and industrial space scale (see the Metrics chapter). Industrial space uses 0802 research land as the core carrier, 05 commercial services land for consumption and conversion, and 0804 education land for near-campus synergy [data:geometry/land_use.geojson#LU-BG-M1] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], with no codes from outside the classification guide.

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The spatial structure of the overall design area (11.4 km²) is "**one bell-rope, three bells for three areas, two-wing circuits, multiple scenario nodes**". The bell-rope is the Jing-Zhang Railway Ruins Park vitality belt, shown schematically at approx. 9.7 km in this package [metric:corridor_length_m]; it is the east-west stitching and north-south connection spine and the slow-traffic backbone at the same time. The three bell nodes anchor the three key areas; the two wings organize factor circuits along the Zhongguancun and Xueyuan Road–Xiaoyuehe sides; AI scenario nodes sit along the bell-rope in a "guide–display–test–consume" sequence [depth:overall_spatial_structure].

**Renewal framework**: urban renewal is the main path, under the principle of "low-disruption, organic renewal", prioritizing low-efficiency space in Zhongzhiyuan and the Origin Community for AI industrial space provision [source:OFFICIAL-ANNOUNCEMENT]. Renewal targets are identified in four categories — AI industrial space, talent living facilities, public-space gaps, and station-area integration — which form the renewal project list (see the Renewal Projects chapter). FAR, building height and other regulatory conditions stay as pending-confirmation items until official data arrives; this proposal gives no statutory intensity conclusions [metric:floor_area_ratio].

**Functional layout**: a north-south division along the bell-rope of "north R&D (0802) — middle education/incubation (0804/0802) — south consumption/conversion (05)" [data:geometry/land_use.geojson#LU-ZHONGZHIYUAN-R1] [data:geometry/land_use.geojson#LU-BEIJING-R1-W] [data:geometry/land_use.geojson#LU-DAZHONGSI-R1-W], supplemented by talent housing (0701), culture (0803), health (0806) and reserved land (16) for new AI-era function mixes. All land-use categories follow the unified classification guide [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

**Jing-Zhang Railway Ruins Park vitality belt**: the bell-rope is the spatial translation of the park belt, organized as a composite greenway-cycleway-pedestrian section [data:geometry/roads.geojson#RD-BELT]. Landmark landscape nodes go at the southern end (Guizhong Plaza, Dazhongsi), the northern end (Wudaokou–Qinghe, Qizhong Platform) and the ring-road crossing areas, matching the announcement's task to "create landmark urban landscape nodes at the southern and northern ends of the park and at road-crossing segments" [source:OFFICIAL-ANNOUNCEMENT] [depth:blue_green_public_space].

**Urban character**: a three-color narrative of "centennial railway memory – Zhongguancun innovation – AI new culture" sets the urban tone [depth:height_massing_character], making full use of cultural resources such as the Qinghuayuan Railway Station site and artistic resources such as the Beijing Film Academy [source:OFFICIAL-ANNOUNCEMENT]. Architectural character guidance works around the bell-rope: near it, cultural display and public frontages are encouraged; in key segments, massing rhythm and rooflines are controlled. This guidance is a design recommendation, not statutory control [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:height_massing_character].

## Detailed Design of Key Areas

### Zhongzhiyuan AI Autonomous Innovation Acceleration Area (Ringing Bell · approx. 192.1 ha) [data:geometry/key_areas.geojson#PROV-KEY-001]

This area is positioned as a garden-type AI innovation block [source:OFFICIAL-ANNOUNCEMENT], the core of the AI full-stack autonomous innovation system, and where standard-setting and safety governance platforms sit. Spatially it is anchored by the Qizhong Platform (Qinghe waterfront landmark) and organized in four rings around the national platform function: an R&D core (0802), an innovation-service commercial belt (05), a reserved platform zone (16) and talent housing (0701) [data:geometry/land_use.geojson#LU-ZHONGZHIYUAN-R1] [data:geometry/land_use.geojson#LU-ZHONGZHIYUAN-R2-W]. The building stock is research clusters (conceptual fabric, see [data:geometry/buildings.geojson#BLD-000]), exploring low-disruption renewal and garden-style low-rise high-density forms; transport optimization directions coordinate with the Fifth Ring Road (conceptual) [source:OFFICIAL-ANNOUNCEMENT]. The Qinghe waterfront green belt [data:geometry/green_space.geojson#GS-QH] hosts "green-space services for AI functions"; the Qizhong Platform doubles as a launch-ceremony venue, with robot patrol and campus shuttles as test-validation scenarios. One honest caveat on implementation: the Fifth Ring connection and Qinghe culture development need professional deepening, statutory intensity indicators are missing, so building scale can only be expressed as conceptual design quantities.

### Beijing AI Origin Community (Tuning Bell · approx. 104.3 ha) [data:geometry/key_areas.geojson#PROV-KEY-002]

This area is positioned as a near-campus AI innovation block [source:OFFICIAL-ANNOUNCEMENT], the conversion and open-source core for original innovation originating from Tsinghua, Peking University and CAS institutes. Spatially it is anchored by the Jiaoyin Platform (Wudaokou) and organized into a near-campus education/R&D belt (0804), an incubation-conversion zone (0802), the Wudaokou vitality commercial belt (05) and an innovation talent community (0701) [data:geometry/land_use.geojson#LU-BEIJING-R1-W] [data:geometry/land_use.geojson#LU-BEIJING-R2-W]. Integrated design wraps around Wudaokou, Qinghua East Road West and other rail stations [source:OFFICIAL-ANNOUNCEMENT]; the Jiaoyin Platform doubles as station connection and open-source launch space, and Wudaokou's "center of the universe" urban narrative becomes a youth-friendly vitality public space (conceptual narrative, not an official designation). Renewal follows low-disruption, organic principles [source:OFFICIAL-ANNOUNCEMENT], prioritizing campus–park–block integration. AI scenarios include AI+education (Qinghuayuan study tours), enterprise service copilot and smart talent-apartment communities; the open-source gallery sits in the middle of the bell-rope. On implementation: heritage (Qinghuayuan Station site [data:geometry/constraints.geojson#EX-HER-001]) and university ownership are sensitive, retain/renovate/demolish conclusions await official basemaps, and only directions are given here [assumption:A-HERITAGE-001].

### Dazhongsi AI Industry Cluster (Return Bell · approx. 72.0 ha) [data:geometry/key_areas.geojson#PROV-KEY-003]

This area is positioned as an urban AI innovation block [source:OFFICIAL-ANNOUNCEMENT], where leading enterprises pull AI-native and AI+ enabled business in agents, intelligent terminals and content consumption. Spatially it is anchored by the Guizhong Plaza (four-quadrant pedestrian connection at Dazhongsi station) [source:OFFICIAL-ANNOUNCEMENT], organizing an AI-native consumption corridor (05), an agent R&D zone (0802), a station-city integrated commercial belt (05) and the Juesheng Temple cultural coordination zone (0803) [data:geometry/land_use.geojson#LU-DAZHONGSI-R1-W]. Culturally, Juesheng Temple (home of the Yongle Bell; location schematic [data:geometry/constraints.geojson#EX-HER-002]) faces the Guizhong Plaza across time, carrying the "Return Bell – echo" narrative (cultural facts are cited only after verification against public heritage records). AI scenarios include a low-speed robot delivery pilot, flagship content-consumption experiences, data-element circulation services (mechanisms are conceptual) and AI health service facilities (0806). On implementation: station-city integration and four-quadrant connectivity need professional transport deepening, and static traffic is organized with non-motorized priority.

Key-area indicators and drawing indexes are recorded in `design_depth_matrix.json` ([depth:three_key_area_detailed_design]); area recomputation is in metrics ([metric:key_area_zhongzhiyuan_sqm] etc.).

![Key areas index and design tasks](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### User personas (6 types) [source:AGENT-TASKBOOK]

| Persona | Needs | Main spatial anchor |
|---|---|---|
| AI founder | funding, scenarios, compliance, showcase | incubation-conversion zones, enterprise-service nodes |
| University researcher | technology transfer, near-campus commute, quiet research | near-campus education/R&D belt, labs |
| Developer / open-source contributor | open resources, community, recognition | open-source gallery, honor wall, developer walk |
| Young resident | night vitality, sports and socializing, third places | Wudaokou vitality belt, bell-rope slow routes |
| Business visitor / investor | meetings, experience, efficiency | Guizhong Plaza, enterprise-service belt |
| Elderly and low-digital-literacy residents | human service, accessibility, health | community services, health navigation with human channel [standard:BARRIER-FREE-ENVIRONMENT-LAW] |

### AI scenario cards (12)

| # | Scenario card | Type | Spatial anchor | Related standard card |
|---|---|---|---|---|
| 1 | AI guide · Whistle 1909 | culture | southern bell-rope | ai-cultural-guide |
| 2 | Developer walk intelligent narration | culture+education | middle bell-rope | ai-cultural-guide |
| 3 | Health service navigation (human channel) | public service | A2 community | ai-health-service-navigation |
| 4 | Slow-traffic gap detection and optimization | mobility | entire belt | ai-traffic-walkability |
| 5 | Enterprise service copilot | industry service | A1/A2 | enterprise-service-copilot |
| 6 | Event-safety human review | governance | entire belt | public-safety-operations-review |
| 7 | Low-speed robot delivery pilot* | robotics | A3 | robot-delivery-low-speed |
| 8 | Autonomous shuttle loop pilot* | autonomous mobility | A1→A2→A3 | extended |
| 9 | AI+education (Qinghuayuan study tours)* | education | A2 | extended |
| 10 | Smart talent-apartment community | housing | A2 | extended |
| 11 | Open-source gallery (Bell Registry) | culture+industry | bell-rope | extended |
| 12 | Agent contribution honor wall (AR) | governance+culture | bell-rope nodes | extended |

Items marked * are **AI industry test-validation scenarios** — three types (low-speed robot delivery, autonomous shuttle, AI education study tours) plus one low-speed test segment. Each card's spatial anchor, served personas, operating data, privacy boundary, human review, operator and risks are registered card by card in this package's `visual/assets/scenario_cards.json` (all 12 cards, with data-boundary, human-handoff, stop-condition, public-return and operating-status fields [data:visual/assets/scenario_cards.json]), with task mapping in `compliance_matrix.json` (agent.3). Privacy and the human-machine boundary follow two uniform rules: **Quiet Hours** — deep night, exam seasons and memorial days degrade AI services to human service — and the **human-review baseline** — generative AI content must be reviewable and withdrawable [standard:GENERATIVE-AI-INTERIM-MEASURES] [source:AGENT-TASKBOOK].

**Three-tier admission gates for test-validation scenarios (conceptual)**: borrowing the bell language, three gates are set — **Sound-Test Gate (V0.5 prototype) → Tuning Gate (V1.0 bounded deployment) → Ringing Gate (V2.0 scaling)**. Inside the Sound-Test Gate only paper, offline or closed-site prototypes are allowed; passing the Tuning Gate requires meeting the candidate acceptance gates plus site and data permits before bounded temporary operation; the Ringing Gate (scaling and normalization) is only discussed once cross-season operating evidence, maintenance funding and exit-cost arrangements exist. Each of the three test scenarios pre-registers candidate acceptance gates, with measured values recorded as null until permits and baseline collection are complete: for low-speed robot delivery (A3) the gates are "zero intrusion into pedestrian priority lanes in mixed-traffic segments; 100% success in emergency-stop drills", and failure sends the scenario back to closed-site drills; for the autonomous shuttle loop (A1→A2→A3) they are "a safety officer on every trip; no boundary intrusion under injected positioning drift", and failure downgrades the service to a fixed-route human-driven shuttle; for AI education study tours (A2) they are "all generated content human-reviewed; zero personal-data collection from minors", and failure returns the tour to static interpretation mode. Candidate gates and measured results are registered separately; any single hard-gate failure triggers a downgrade and cannot be offset by average scores.

**Ordinary baselines and the scenario–space–operation–evidence binding**: every scenario card first answers "how the task gets done without AI" (ordinary-baseline field), then "what the city keeps after AI leaves" (exit-condition and evidence-output fields), so that no scenario degrades into a demo installation. The binding matrix for the 12 cards:

| Scenario card | Spatial anchor | Operator (suggested) | Public evidence output |
|---|---|---|---|
| 1 AI guide · Whistle 1909 | southern bell-rope | park operator + heritage review | service records, source catalog, correction ledger |
| 2 Developer walk narration | middle bell-rope | developer community + Origin operator | review logs, revision history, narration corpus |
| 3 Health service navigation | A2 community facilities | community service center + health window | catalog updates, human-channel inspections |
| 4 Slow-traffic gap detection | entire belt | district transport dept + subdistricts | gap list, adopt/decline decision records |
| 5 Enterprise service copilot | A1/A2 | park operator | policy knowledge base, handoff-rate stats |
| 6 Event-safety human review | event sites belt-wide | organizer + local emergency dept | debrief reports, false/missed-alarm logs |
| 7 Low-speed robot delivery* | A3 low-speed segment | pilot operator + traffic filing | operating reports, takeover logs, incident reviews |
| 8 Autonomous shuttle loop* | A1→A2→A3 | pilot operator + traffic filing | operating data, takeover and downgrade records |
| 9 AI+education study tours* | A2 Qinghuayuan site | education dept + schools + volunteers | lesson-plan revisions, consent/withdrawal logs |
| 10 Smart talent-apartment community | A2 talent community | housing platform + property operator | operating rules, data-minimization audits |
| 11 Open-source gallery | middle bell-rope | open operator + developer community | Bell Registry ledger, takedown/correction logs |
| 12 Honor wall (AR) | bell-rope nodes | memorial operator + developer community | registration review logs, entry withdrawal records |

The full text of ordinary baselines, exit conditions (including site restoration) and evidence outputs is registered card by card in `visual/assets/scenario_cards.json` [data:visual/assets/scenario_cards.json].

### Agent taskbook responses (agent.4/agent.5/agent.6 summary)

- **Pilgrimage landmarks (4)**: Guizhong Plaza (Dazhongsi station four quadrants), Qizhong Platform (Zhongzhiyuan, Qinghe waterfront), Jiaoyin Platform (Wudaokou), and the agent-contribution honor wall [data:geometry/public_space.geojson#PS-GZ] [metric:bell_node_count]. On the counting: the 5 bell-node public spaces consist of 4 pilgrimage landmarks plus the open-source gallery as an operations node; the 9 bell-node anchor buildings are conceptual supporting volumes [metric:buildings_count].
- **Cultural narrative**: a three-layer narrative — Whistle 1909 (railway autonomy and the spirit of self-reliance) → Voice of Yongle (Dazhongsi's "vessel of the state" and public resonance) → Resonance (AI-era collaborative resonance) — with wayfinding, symbols and bilingual international communication copy (conceptual directions).
- **Guided tour lines** (conceptual): three themed lines along the bell-rope. ① **Whistle 1909 line**: Qinghe–Qinghuayuan Station site–Beijing Film Academy–Wudaokou, approx. 4.5 km, 90–120 min by walking/cycling, interpretation stops at Qizhong Platform, railway-heritage points and Qinghuayuan Station. ② **Voice of Yongle line**: middle bell-rope–Dazhongsi four quadrants–Juesheng Temple cultural coordination zone, approx. 3 km, 60–90 min, stops at Guizhong Plaza and the open-source gallery. ③ **Resonance line**: an AI scenario experience loop — Origin Community open-source showcase, Dazhongsi content-consumption flagship, honor-wall AR nodes — connected to the autonomous shuttle loop and open to segment-based participation. All three lines share the "Bell Registry" interpretation system and bilingual wayfinding; start/end points, durations and stops are conceptual and subject to field verification during implementation.
- **Long-term operations**: an annual "Bell Ringing Release" event system (spring release ring; autumn innovation fair return), developer community operations, tiered open scenario operations (pilot–expansion–normalization), and an international communication and attraction-conversion pathway (see the Renewal Projects chapter).

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land use covers the whole overall design area without gaps or overlaps [data:geometry/land_use.geojson] [depth:land_use_layout]: research (0802) approx. 16%, commercial services (05) approx. 30%, education (0804) approx. 17%, green (1401+1402) approx. 15%, reserved (16) approx. 16%, residential (0701) approx. 3%, culture (0803) approx. 2%, health (0806) approx. 0.4%, and standalone road land (1207) approx. 0.2% — summing to approx. 100% (ratios recomputed on the provisional boundary [metric:land_use_research_ratio] [metric:land_use_road_ratio]). The road network itself is expressed as line features in `roads.geojson` (60.5 km, recomputed in metrics); the 1207 polygons record only standalone road land and do not convert linear alignments into land-use ratios. Building footprints are conceptual fabric (139 blocks, including 9 bell-node anchor buildings [metric:buildings_count], approx. 402,000 m² [metric:building_footprint_area_sqm]) that expresses spatial relations only, not the existing building inventory [assumption:A-BUILDINGS-001]. FAR, building height and retain/renovate/demolish classifications are recorded as **pending confirmation** until official regulatory plans, existing building and ownership data are available [metric:floor_area_ratio] [assumption:A-CONTROLS-001]; the conceptual volumes offered here are low-confidence design quantities, not statutory control values [standard:MOHURD-CONTROL-DETAILED-PLANNING].

## Transport, Rail, Municipal Infrastructure, and Public Services

- **Road microcirculation**: the bell-rope greenway is the main spine, overlaid with secondary, branch and station-connection networks [data:geometry/roads.geojson], with composite greenway/cycleway/pedestrian sections through all three areas [metric:road_network_length_m] [assumption:A-ROADS-001].
- **Station-area integration**: integrated design around Dazhongsi (four-quadrant), Wudaokou and Qinghua East Road West stations [source:OFFICIAL-ANNOUNCEMENT], coupling the 500 m station catchment with bell-node functions [data:geometry/roads.geojson#TR-DZ].
- **Parking and non-motorized traffic**: static traffic in key areas is organized with non-motorized priority (conceptual).
- **New infrastructure**: exploring a "resonance power" concept that fuses distributed energy and edge computing with conventional municipal facilities (edge computing co-located with consumption, waste-heat reuse as a deepening direction) [source:OFFICIAL-ANNOUNCEMENT]; charging, delivery and robot pilots reserve composite utility corridors (conceptual).
- **Public services**: AI industrial services, innovation platforms and talent living services are arranged in a "bell node + community" two-tier system, implementing the Article 39 human-service baseline of the Barrier-Free Environment Law [standard:BARRIER-FREE-ENVIRONMENT-LAW].

![Mobility and blue-green composite system](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

The bell-rope park belt runs approx. 9.7 km through the whole area [metric:corridor_length_m], forming a "one rope, two rivers" blue-green skeleton with the Qinghe waterfront green belt [data:geometry/green_space.geojson#GS-QH] and the Xiaoyuehe waterfront green belt [data:geometry/green_space.geojson#GS-XH]. Public space is anchored by the three bell nodes (Guizhong Plaza, Jiaoyin Platform, Qizhong Platform) [data:geometry/public_space.geojson]. The green ratio is approx. 23% [metric:green_ratio] — the green_space layer includes the Qinghe and Xiaoyuehe waterfront green belts, which span other land-use categories, with overlapping polygons deduplicated via unary_union; the excess over the approx. 15% 1401+1402 land-use figure is exactly that waterfront overlay. Urban character is organized by the three-color narrative of "railway memory – innovation interface – AI new culture" [depth:height_massing_character]; character guidance (massing, rooflines, colors) is a design recommendation, not statutory control [standard:MOHURD-URBAN-DESIGN-MEASURES].

## Renewal Projects, Implementation Policy, and Phasing

**Renewal project list (examples, conceptual)**: ①Guizhong Plaza station-city integration (Dazhongsi four quadrants) ②Jiaoyin Platform and Wudaokou station-area renewal ③Open-source gallery and honor wall (middle bell-rope) ④Zhongzhiyuan R&D core renewal and Qinghe waterfront connection ⑤Low-speed robot/shuttle test loop ⑥Talent apartments and community service upgrades. Types, locations, dependencies, suggested operators and policy suggestions are registered item by item in `compliance_matrix.json` (agent.6 and announcement 1.5(2) renewal tasks) [source:OFFICIAL-ANNOUNCEMENT]; the suggested operators are conceptual responsibility-allocation directions only and constitute no confirmed government arrangement or procurement commitment. Per-project cost and exit arrangements for the six projects (conceptual ranges for deepening reference; professional estimation is needed at implementation):

| Project | Suggested operator | Annual maintenance magnitude | Funding-source direction | Exit-cost arrangement |
|---|---|---|---|---|
| ① Guizhong Plaza station-city integration | district-owned platform + rail operator | tens of millions CNY/yr | renewal-unit pooled funds + station retail reinvestment | restoration reserve; reversible, phased contracts |
| ② Jiaoyin Platform & Wudaokou station area | subdistrict + university asset owners + co-governance platform | millions CNY/yr | block-renewal funds + university co-building | reversible installations first, minimal hard construction |
| ③ Open-source gallery & honor wall | open operator + developer community | millions CNY/yr | operating revenue + developer-ecosystem sponsorship | content takedown, ledger archived, demountable fixtures |
| ④ Zhongzhiyuan R&D core & Qinghe waterfront | park operator + district science commission | tens of millions CNY/yr | park operating funds + waterfront programs | ecology-first restoration, phased exit possible |
| ⑤ Low-speed robot/shuttle test loop | pilot operator + traffic filing | millions CNY/yr | operator self-funded + testing service fees | permit lapse triggers withdrawal and right-of-way restoration |
| ⑥ Talent apartments & community services | affordable-housing platform + community centers | millions CNY/yr | housing operating funds + community service budgets | system exit never degrades human service standards |

All magnitudes and funding directions are conceptual suggestions and constitute no fiscal commitment or procurement arrangement.

**Phasing (see the phasing layer)** [data:geometry/phasing.geojson] [depth:phasing_implementation]:

| Phase | Period (suggested) | Content | Area (recomputed) |
|---|---|---|---|
| Pilot | 2026–2028 | Guizhong Plaza + Wudaokou + southern bell-rope (low-speed test segment first) | approx. 4.43 km² [metric:phase_1_area_sqm] |
| Expansion | 2028–2030 | Full Origin Community renewal + middle bell-rope + enterprise-service network | approx. 3.19 km² [metric:phase_2_area_sqm] |
| Normalization | 2030– | Zhongzhiyuan full-stack system + northern bell-rope + belt-wide scenario operations | approx. 2.80 km² [metric:phase_3_area_sqm] |

The three phases total approx. 10.4 km²; the remaining approx. 1.0 km² consists of linear spaces such as the bell-rope green belt and roads, which proceed as linear works and are not counted in plot-based phasing areas.

**Long-term operations (agent.6)**: the annual "Bell Ringing Release" event system (spring ring for open-source releases; autumn return for the innovation fair), the Quiet Hours public institution (human-machine boundary), the Bell Registry protocol (numbered, verifiable registration of major releases and milestones, directly linked to the open-source showcase task), and developer community and tiered open scenario operations. International communication and attraction-conversion are materialized as two annual public outputs: the spring ring publishes a bilingual Annual Open-Source Achievement Register (directly linked to Bell Registry numbers), and the autumn return publishes a bilingual Record of Scenario Opening and Exit Decisions (including adopt/revise/stop decisions for each test scenario and reusable protocol templates). Attraction and conversion rest on the register and decision record as evidence; no undetermined investment outcomes are promised. All events, investment, funding and policy statements are **conceptual suggestions/deepening directions**, not confirmed government arrangements [source:AGENT-TASKBOOK].

**Institutional tabletop exercise (fictional input, not evidence of effectiveness)**: to show how the Bell Registry protocol makes decisions, imagine a fictional event — a team applies to stage a "large-model nighttime drone light show" at Guizhong Plaza and requests bell registration. The flow: registration number assigned → Quiet Hours check (nighttime triggers degradation) → event-safety human review (crowd density exceeds the candidate gate) → decision: registration retained, downgraded to a small daytime demonstration, and recorded in the public archive. The exercise only illustrates the decision path of "register–check–degrade–record"; it involves no real actors or measured results.

**Operations ledgers (three public books)**: long-term operations keep exit discipline through three public ledgers. The **scenario equipment ledger** registers every device's maintainer, response time, shutdown mode and exit cost, so no installation idles as a "demo"; the **data-minimization ledger** registers each scenario's data controller, minimal fields, retention period, deletion and appeal process; the **public-value ledger** records ordinary-baseline repairs, human labor hours, complaint handling, failures and exits, continuously answering "what the city keeps after AI leaves". All three ledgers are published annually with the autumn Record of Scenario Opening and Exit Decisions.

## Metrics, Area Recalculation, and Compliance Matrix

Core metrics (27 in total, see `metrics.json`; 23 known, 4 unknown): site area 11.41 km² [metric:site_area_sqm], bell-rope length approx. 9.7 km [metric:corridor_length_m], key-area areas [metric:key_area_zhongzhiyuan_sqm], green ratio 23% [metric:green_ratio], public-space ratio 1.1%, building footprint approx. 402,000 m² [metric:building_footprint_area_sqm], road network 60.5 km [metric:road_network_length_m], bell nodes 5 [metric:bell_node_count]. All metrics are recomputed from the submitted GeoJSON in EPSG:4548, with formulas and source files registered item by item [assumption:A-METRICS-001]; statutory intensity metrics (FAR [metric:floor_area_ratio] etc.) are status=unknown, marked pending official control data [assumption:A-CONTROLS-001].

Each metric has a purpose: the green ratio underpins talent life and ecological experience, the public-space ratio underpins innovation-interaction density, and the research-land ratio underpins the industrial-space supply commitment. Task coverage and standard responses are evidenced by `compliance_matrix.json` (full mapping of announcement 1.3/1.4/1.5 + agent.1–6), `standard_matrix.json` (item-by-item response to nine standards) and `design_depth_matrix.json` (all core depth items complete) [depth:metrics_recalculation]. This package has passed the four-gate self-check — deterministic validation, spatial review, visual review and professional evidence review [self_check:DETERMINISTIC_VALIDATION] [self_check:SPATIAL_REVIEW] [self_check:VISUAL_PACKAGING] [self_check:PROFESSIONAL_EVIDENCE].

### Planning indicator system (conceptual framing, pending official calibration)

Announcement section 1.5(2) asks for an indicator system including an AI innovation index, AI talent density and industry output scale [source:OFFICIAL-ANNOUNCEMENT]. The following **conceptual framing** is offered here; all of it is design claims pending official data and professional calibration, with status recorded as unknown [metric:ai_innovation_index] [metric:ai_talent_density] [metric:ai_industry_output]:

| Indicator | Proposed definition | Data dependency |
|---|---|---|
| AI Innovation Index | Composite of innovation output (papers/patents/open-source contributions), innovation actors (unicorns/AI-enterprise density) and factors (compute/data/capital), normalized to Haidian public statistics | Haidian public statistics, public open-source platforms |
| AI Talent Density | AI practitioners/R&D personnel per 10,000 residents ("AI-industry talent / resident population") | Public census and employment statistics |
| Industry Output Scale | Value added and share of AI core and AI+-enabled industries | Statistical yearbooks and public industry data |

Spatially: the innovation index maps to the Origin Community (open source and conversion), talent density to talent housing (0701), and output scale to the three areas' industrial land (0802/05). Once official data arrives, all indicators are recomputed under a unified definition and constitute neither statutory nor assessment conclusions.

![Core metrics and evidence chain](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

- **Sources and copyright**: all citations are registered in `sources.json`; standard texts rely on local snapshots; AI-generated content (text, figures, HTML) is the responsibility of the participating agent and contributors for facts and expression; third-party assets (fonts, images, logos) require clearance before use; the copyright statement is in `report/copyright_statement.md`.
- **Privacy and human-machine boundary**: AI scenarios do not collect personal privacy or set up excessive surveillance, and generated content is reviewable and withdrawable [standard:GENERATIVE-AI-INTERIM-MEASURES]; Quiet Hours protect the peace of daily life; a human-service channel remains available for elderly and low-digital-literacy residents [standard:BARRIER-FREE-ENVIRONMENT-LAW] [standard:ELDERLY-SMART-TECH-PLAN-2020-45].
- **Capability red lines (negative list)**: all AI scenarios here commit to no facial recognition, no emotion recognition, no health diagnosis or credit scoring, no account registration as a precondition for public services, and no sensor deployment to expand surveillance; together with the Generative AI Interim Measures this forms a positive-plus-negative double checklist [standard:GENERATIVE-AI-INTERIM-MEASURES].
- **Compliance boundary**: this proposal does not claim to use non-public planning drawings, internal indicators or unauthorized data; it does not present regulatory-plan adjustments, FAR, building heights, retain/renovate/demolish, road redlines, engineering alignments, investment estimates, development sequencing, event arrangements or government commitments as established conclusions [source:AGENT-TASKBOOK] [standard:MOHURD-CONTROL-DETAILED-PLANNING].
- **Boundary risk**: provisional boundaries are used for generation and discussion only; the whole package is recalculated once official polygons are released [assumption:A-BOUNDARY-001] (GAP list in `visual/assets/missing_data_checklist.json`).
- **Operations and narrative boundary**: the Bell Code naming system, events, investment, funding and policy statements are all conceptual suggestions/deepening directions, not confirmed government arrangements [assumption:A-BELL-001].
- **Pending data**: official redlines, regulatory intensity, existing buildings, ownership, heritage control lines and municipal utilities (see `assumptions.json` and `visual/assets/missing_data_checklist.json`).

## References

1. Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources, Qualification Pre-announcement of the Centennial Jing-Zhang AI Innovation Belt International Urban Design Open Call (2026-05-09) [source:OFFICIAL-ANNOUNCEMENT].
2. Excerpt of the Open-Call Taskbook for Global AI Agents (user-provided, rights-cleared, 2026-05-18) [source:AGENT-TASKBOOK].
3. MOHURD, Measures for Urban Design Administration.
4. MOHURD, Measures for the Compilation and Approval of Regulatory Detailed Plans for Cities and Towns.
5. MNR, Guidelines for the Classification of Land and Sea Use in Territorial Spatial Surveys, Planning and Use Control.
6. CAC and six other agencies, Interim Measures for the Management of Generative AI Services.
7. NPC Standing Committee, Law on the Construction of a Barrier-Free Environment.
8. State Council General Office, Implementation Plan for Solving the Difficulties of the Elderly in Using Intelligent Technologies (Guobanfa [2020] No. 45).
9. Public materials and site package of the Centennial Jing-Zhang AI Innovation Belt open-call repository (open-city-ai/haidian).
10. Public sources for the global innovation-ecosystem cases: official websites or government portals of Silicon Valley (Joint Venture), Kendall Square, Tel Aviv, one-north (JTC), King's Cross, Station F, Zhongguancun Software Park and Zhangjiang Science City (verified 2026-08-11; entries in sources.json CASE-*).

