---
title: "The Jingzhang Diagram · 京张运行图"
subtitle: "Centennial Jingzhang AI Belt Urban Design — a city that runs by the diagram"
proposal_format_version: "2"
bilingual_contract_version: "1"
language: "en"
author_github: "Juwan-Hwang"
translation_of: "proposal.md"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
status: "Official submission package main document; a re-creation fusing outputs from multiple agents and models, unified under the provisional boundary discipline"
summary: 'Taking the working diagram — the master score of a railway — as the meta-concept, this design conceives the Centennial Jingzhang AI Belt as a city that runs by the diagram: in space, the switchback unit is the spatial operating system; in governance, the four railway safety systems (signalling, block, interlocking, and token) are fully translated into AI-in-city governance protocols; in measurement, Innovation Loop Latency (ILL) and diagram punctuality are the core KPIs; in spirit, Zhan Tianyou "each contributes what he has learned, each gives what he knows" becomes the open-source city constitution. All spatial and numeric content is conceptual; to be recomputed on EPSG:4548 once official boundaries and control plans are released.'
tracks:
  - ai-traffic-walkability
  - enterprise-services-ecosystem
  - civic-agent-governance
scenarios:
  - ai-traffic-walkability
  - enterprise-service-copilot
  - public-safety-operations-review
---

# The Jingzhang Diagram
## Centennial Jingzhang AI Belt Urban Design

> **In 1909, Zhan Tianyou answered the mountain with a switchback line, and answered the question of people with "each contributes what he has learned, each gives what he knows."**
> **In 2019, the Jingzhang HSR answered the question of speed with the world's first intelligent high-speed railway.**
> **In 2026, we answer the question of intelligence with a working diagram — letting every innovation run by the diagram, and letting everyone step off at any time.**
>
> **The railway that taught China to climb now runs on a diagram written by everyone.**

---

## Reviewer's Route · START HERE (8-Minute Rapid Guide)

To facilitate human experts and review Agents in rapidly grasping the entire proposal, *The Jingzhang Diagram* provides a 5-stop rapid navigation path:

> **30-second brief**: this proposal translates the Jingzhang Railway's working diagram into an operating system for AI entering the city — a three-district two-wing spatial structure (Test Track / Departure Station / Marshalling Yard), the four governance systems of signalling–block–interlocking–token as admission protocol, 12 scenario cards and 4 test & validation scenarios, measured by Innovation Loop Latency (ILL) and diagram punctuality, with a tiered safety interface of public alert → authorised e-stop → professional recovery as the human-first floor. All boundaries are provisional pending official-data recomputation; every precise figure is either a geometry-recomputed value (formula registered) or explicitly marked as a design assumption pending field testing.

1. **Stop 1 · Meta-Concept & Open-Source Constitution (§1)**: Stemming from Zhan Tianyou's 1909 switchback line and "each contributes what he has learned, each gives what he knows," translating the railway master score — the *Working Diagram* (Space, Time, Authority, Punctuality) — into an open-source urban operating system.
2. **Stop 2 · Spatial Operating System & Three Districts Two Wings (§2)**: The Switchback Unit (East-West Crossing + Block Section + Narrative Milepost + Operating Token); Zhongzhi Park (Test Track), Origin Community (Departure Station), Dazhongsi (Marshalling Yard), Zhongguancun (Depot), Xiaoyuehe (Maintenance Wing) forming a closed collaborative loop [data:geometry/key_areas.geojson].
3. **Stop 3 · Four Governance Systems & Scenario Cards (§3)**: Translating railway safety (Signalling, Block, Interlocking, Token) into AI-in-city admission protocols; 12 high-fidelity scenario cards, 4 industry test & validation scenarios, 6 personas; human-centred governance secures the right to step off through a tiered safety interface of public alert — authorised e-stop — professional recovery (§Governance · The Human Switch).
4. **Stop 4 · Implementation Ledger & KPI Metrics (§4)**: Four phases (Track-laying → Commissioning → Acceleration → Networking); Innovation Loop Latency (ILL) and diagram punctuality measuring administrative and delivery efficiency; full lifecycle sandbox admission, audit, and exit mechanisms.
5. **Stop 5 · Structured Evidence Matrix & Rubric Crosswalk (§7)**: Review the *Seven-Dimension Rubric Evidence Crosswalk* at the end of the report, 100% covering the 7 official evaluation dimensions and 6 mandatory Agent tasks.

---

## Design Basis and Source List

This formal proposal takes the "Prequalification Announcement for the Centennial Jingzhang AI Innovation Belt Urban Design International Open Call" issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources as its primary basis [source:OFFICIAL-ANNOUNCEMENT], and takes the maintainer-registered provisional coarse boundary, key areas, enums, metrics, and source list in `brief/site-package/` as its machine-readable basis [source:SITE-PACKAGE] [source:AGENT-TASKBOOK]. Before generation the agent must read `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json`, and `data/processed/agent_fact_pack.md`, and use `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, and `missing_data_checklist.csv` to build task, scope, source-usage, and gap checklists [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]. Every design judgment must be decomposed into a traceable source, a recomputable metric, a checkable layer, and a human-reviewable assumption.

**Unified discipline (hard constraint)**: all spatial implementation suggestions in this proposal are conceptual proposals, reference schemes, or material for professional teams to deepen; we do not impersonate statutory control lines, do not fabricate FAR/height/density/green ratio, and do not fabricate enterprises, investment amounts, output values, policy commitments, or engineering feasibility. The official precise boundaries (SITE_BOUNDARY / KEY_AREA polygons), control-plan metrics, and current-condition data are missing; this proposal develops conceptual design on the official textual limits and area figures, adopts the repository's provisional boundary in the formal packaging stage with the `provisional` marker prominently shown, and commits to recompute on EPSG:4548 [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [assumption:A-CONTROLS-001].

The usage boundaries of the source register are as follows [source:SOURCE-REGISTRY]: `data/source_registry.json` registers the usage boundaries of public, cleared, and provisional materials; this submission's source list is itemised in-package in `sources.json`, and the formal availability of each entry is subject to the registry-review conclusion of the repository register — the current register summary does not yet include this submission's entries, and no material is claimed here as formally cleared. The agent must not upgrade background_only or provisional_only materials into official boundaries, statutory control plans, formal scoring bases, or government implementation commitments. `data/processed/agent_fact_pack.md` is a reading-navigation layer for this proposal, not a new authority source [source:PROCESSED-FACT-PACK].

![Overview: the working-diagram meta-concept and the four innovation epochs](assets/figures/site-overview.en.png)

While the official `SITE_BOUNDARY` or the three `KEY_AREA` polygons are not yet available, this proposal uses `brief/site-package/geometry/provisional_boundaries.geojson` to generate a provisional formal package [source:BOUNDARY-SOURCE]. Both `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` in the package are marked `provisional_constraint`, `official_boundary=false`, and may only be used for proposal generation, self-check, visualization, and design discussion — not as official redlines, approval bases, precise area bases, or statutory control conclusions [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm] [depth:existing_conditions_diagnosis]. This organizer-side data gap itself does not block content scoring; once official polygons are substituted, site boundary, key areas, land use, roads, green space, public space, buildings, phasing, and metrics all require recomputation [self_check:SPATIAL_REVIEW].

## Three-Level Scope Work Framework

The proposal organizes work according to the three levels defined by the announcement [source:OFFICIAL-ANNOUNCEMENT]: the strategic-research scope concerns the 43.6 km² AI industry ecology, strategic positioning, innovation chain, and future urban form; the overall-design scope concerns the 11.4 km² urban districts and industrial areas 1-2 km around the Jingzhang Heritage Park, requiring an overall urban-renewal framework, industrial spatial layout, transport and municipal support, and urban-character control; the key-area scope concerns 368.4 ha of three detailed-design districts, requiring that functional programs, building scale, retain/renovate/demolish classification, public-space connectivity, and transport organization be made explicit. The three scopes are mapped item by item in `compliance_matrix.json`, ensuring that the mandatory tasks of announcement sections 1.3, 1.4, 1.5 and agent.1-agent.6 all have section, layer, metric, drawing, and HTML evidence [depth:three_level_scope_framework] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [self_check:PROFESSIONAL_EVIDENCE].

| Level | Official scope | Conceptual action in this proposal |
|---|---|---|
| Strategic scope 43.6 km² (North 5th Ring—Jingzang Expressway—Xizhimen Outer St.—Wanquan River Rd.) | Regional collaboration: this belt is the switch and connecting line of the Beijing-Tianjin-Hebei AI innovation network — the two-way division of labour, interfaces, and status distinction with Beiwei Community, Future Science City, Huairou Science City, the Economic-Technological Development Zone, Zhongguancun, and Beijing-Tianjin-Hebei nodes are detailed in the dedicated *Regional Synergy Matrix* section | Build the "university incubation–open-source collaboration–enterprise transformation–public experience–international outreach" innovation chain |
| Overall scope 11.4 km² | A conceptual renewal strategy at statutory urban-design depth: switchback-unit spatial operating system + three hubs + two wings + retain/renovate/demolish/add logic + blue-green network | Switchback-unit spatial operating system; space unit = governance unit |
| Key areas 368.4 ha (Zhongzhi 192.1 / Origin 104.3 / Dazhongsi 72.0) | Differentiated detailed conceptual design of the three districts by railway-facility typology | Test track / Departure yard / Marshalling yard |

The three levels are not a set of mutually isolated drawings. The strategic scope decides the industry-chain and urban-form judgment; the overall scope lands that judgment in renewal projects, spatial structure, and facility capacity; the key-area detailed design verifies the implementability of specific plots, buildings, transport, public space, and AI application scenarios. When generating a proposal the agent must first lock the official or provisional boundary and constraints adopted by the current submission, then generate land use, buildings, roads, green space, public space, phasing, and AI service nodes, and finally recompute metrics from these layers and explain in the text which conclusions remain restricted by the provisional boundary [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001].

![Overall spatial structure and location plan (provisional-boundary recomputation, with north arrow, scale bar, legend, and feature_id labels)](assets/figures/spatial-structure.en.png)

![Switchback-unit spatial operating system and the three-district two-wing structure](assets/figures/land-use-structure.en.png)

## Strategic-Scope Industry and Future-City Research

The core task of the strategic scope is to build a world-class AI innovation ecosystem [source:AGENT-TASKBOOK]. The proposal should organize Haidian's universities, institutes, leading enterprises, computing/data/algorithms factor resources, incubation platforms, listed companies, unicorns, and tech-service resources, and propose a spatial coordination framework for the AI innovation chain, industry chain, talent chain, and urban-service chain. The naming scheme and logo design should serve the overall recognizability of "the Centennial Jingzhang Cultural Belt, the Metropolitan AI-Life Experience Belt, and the AI Integration Innovation Belt," and state the link to the industry ecology, public space, and cultural resources [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

**Global cases teach mechanism, not form** (the case_study_table required by agent.2; all cases below are public background materials whose formal availability awaits registry review, and none is used as a formal planning basis) [source:AGENT-TASKBOOK]:

| Case | Source (publicly checkable) | Borrowable mechanism | Non-transferable conditions | Jingzhang spatial/industry translation (conceptual) | Risk lesson |
|---|---|---|---|---|---|
| Kendall Square, Boston | [source:CASE-KENDALL] | University-industry short-distance conversion next to MIT; incremental redevelopment of industrial warehousing sustaining innovation density | MIT's endowment and Boston's biomedical industry structure are not replicable | Origin Community "near-campus innovation": borderless university-enterprise intersections, 5-minute-walk collision network | Single-industry dependence; gentrification pressure needs community hedging |
| King's Cross, London | [source:CASE-KINGSX] | Railway-heritage regeneration + institutional partner-network operation (not single-developer-led); public space first | British land tenure and long-cycle capital structure | Marshalling yard / departure station regenerated via railway-facility typology; two wings run as "institutional partner networks" | Long-cycle capital squeezes publicness and must be institutionally locked |
| Station F, Paris | [source:CASE-STATIONF] | Startup services highly concentrated in a single carrier (incubation/investment/legal one-stop) | Single large-owner real-estate-driven model | AI Civic Room network + open-source workshops distribute "concentrated services" across switchback nodes | Concentrated services exclude non-tenants; this proposal takes the public-floor path |
| Mila, Montreal | [source:CASE-MILA] | AI academia-industry-startup triangle connection; open academic culture attracting global talent | Quebec provincial and federal research-funding structure | Zhongzhiyuan full-stack test street: research—pilot—standard spaces side by side | The open-academia/commercial-secrecy boundary needs interface design (carried by the Token System) |
| Superblocks, Barcelona | [source:CASE-SUPERBLOCKS] | Restructuring urban flows and public space by block units | Barcelona's Eixample grid precondition | Switchback unit: one east-west crossing + one switchback node = a spatial/governance composite unit | Traffic reorganization must be verified step by step, avoiding one-size-fits-all |
| Quayside, Toronto (cautionary) | [source:CASE-QUAYSIDE] | Lesson: a tech-company-led smart district failed without data governance and public consent (project terminated 2020) | — (terminated project; taken as lesson only) | Every scenario writes privacy boundaries and human review first; data governance leads, deployment follows | Data sovereignty and democratic authorization are preconditions for AI entering the city |
| High Line, New York | [source:CASE-HIGHLINE] | Railway-heritage linear park driving surrounding value; social-organization operating model | New York zoning incentives and donation structure | Jingzhang heritage-park blue-green spine + public-return rate entering the annual report | Gentrification made visible: anti-gentrification monitoring enters the ILL annual report |

**This belt's institutional moat is the ninth element, "trust"**: beyond land, space, industry, capital, talent, computing, data, and scenarios, without trust data is not opened, scenarios do not land, and talent does not stay; trust is not produced by publicity but institutionalized by the four governance systems [depth:overall_spatial_structure].

**The "each contributes what he has learned" open-source factor market**: factors entering the belt (models, datasets, components, scenario experience) are registered by default into the "working diagram" public catalog under open-source/open licenses; contributions count toward the ballast-plate honor system; city procurement and scenario orders prioritize open factors (a mechanism concept, not a policy commitment). Once a trial ends, it must be distilled into a method, data specification, component, open-source code, case, or standard — knowledge reuse enters the metric system [source:AGENT-TASKBOOK].

### Regional Synergy Matrix (conceptual proposal)

Answering the taskbook's regional-synergy dimension [source:AGENT-TASKBOOK], the two-way division of labour and interfaces between this belt and each synergy node are as follows. Except for the Zhongguancun west wing, which is an existing built-up area, all synergy relationships are conceptual proposals and constitute no existing cooperation commitment; the connecting lines north via Qinghe to Future Science City/Changping, south via Xizhimen to Financial Street, and east via Xueyuan Road to university clusters are directional concepts:

| Synergy node | Input to this belt | Output from this belt | Spatial/operating interface | Status distinction |
|---|---|---|---|---|
| Beiwei Community (neighbouring residential node) | Real life-scenario needs, resident co-design and feedback, usage evaluation for senior/childcare scenarios | Community-embedding plan (JZ-09): AI senior night school, silver-age exercise prescription, staffed-window floor for public services; sharing of scenario returns and knowledge-reuse outcomes | East-wing Xiaoyuehe works section + AI Civic Room network nodes (JZ-06) + community council (public-alert L1 entry) | Conceptual proposal |
| Future Science City (Changping) | Engineering and pilot resources, industrialization talent | Full-stack test-street pilot interfaces and open knowledge from the Standard Lab | Qinghe—Beiqing Road engineering liaison line (directional concept); pilot-topic collaboration on the JZ Open City platform | Conceptual proposal |
| Huairou Science City | Basic-research outcomes, big-science-facility computing and data scenarios | City-side validation scenarios and public-experience outlets, open-source component reuse | Topic channels of the diagram annual report and developer conference (operating interface) | Conceptual proposal |
| Economic-Technological Development Zone (Yizhuang) | Advanced-manufacturing and vehicle-testing standards, robotics mass-production ecology | Human-robot shared-street norms and robot-friendly-street validation data (anonymized and open) | Standard-Lab mutual recognition and open failure-case library (knowledge interface) | Conceptual proposal |
| Zhongguancun core (west wing) | Capital, legal, IP, internationalization, talent, computing procurement, standards — the "power servicing" | Scenario orders, open-source projects, international-communication content | West-wing depot services embedded at westward switchback-walkway nodes (spatial interface) | Existing built-up area (service linkage is a conceptual proposal) |
| Beijing-Tianjin-Hebei (Xiongan/Tianjin nodes) | Regional industrial hinterland and application-market scale | Replicable open-source export of the governance protocol, the four systems, and the diagram | Phase 3 "networking" protocol export + JZ Open City regional nodes | Conceptual proposal |

The relationship with Huairou Science City and the Development Zone is functional complementarity, not homogeneous competition: this belt is not an all-in-one science city; it focuses on the "city-side validation and open-source governance" link [depth:three_level_scope_framework].

## Naming, Logo, and Brand Identity System

The naming serves the overall recognizability of "the Centennial Jingzhang Cultural Belt, the Metropolitan AI-Life Experience Belt, and the AI Integration Innovation Belt," linking industry ecology, public space, and cultural resources [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

| Level | Chinese | English | Meaning |
|---|---|---|---|
| Master brand | 京张运行图 | The Jingzhang Diagram | A city that runs by the diagram |
| Main axis | 京张公共创新脊（人字折返线） | Jing-Zhang Public Spine | The spatial axis of the diagram |
| Three districts | 众智园·试车线 / AI 原点社区·始发站 / 大钟寺·编组场 | Proving Track / Genesis Terminal / Marshalling Yard | The three life-cycle stages of innovation |
| Two wings | 中关村·机务段（服务翼） / 小月河·工务段（场景翼） | Service Depot / Scenario Works | Resource servicing / scenario maintenance |
| Governance protocol | 京张信号 · 闭塞 · 联锁 · 路票 | JZ Signal–Block–Interlock–Ticket | The four governance systems |
| Knowledge platform | JZ Open City | JZ Open City | A city-level GitHub |

Taglines: Chinese "**按图行车，以人定局**"; English "**Every intelligence runs on schedule. Every person holds the switch.**"; cultural keyline: "In 1909 the Jingzhang Railway dispatched trains with a working diagram; today the Jingzhang belt dispatches intelligence with one."

Visual identity (conceptual direction, all self-drawn and shipped in-package; licensing in `report/copyright_statement.md`): the logo takes the **space-time grid of a working diagram** — space on the horizontal axis, time on the vertical — with a switchback diagonal crossing the grid, at once the human glyph and a train's run line. Colors: Jingzhang rust red (history), intelligence teal (connection), signal green (running/passing states), paper white (public transparency); no cyberpunk neon. Typeface direction: Source Han Sans (Chinese) / Inter (public information) / IBM Plex Mono (versioning and wayfinding details). The cultural wayfinding system and the belt-wide logo system share the same origin yet remain layered, and must not be conflated [source:AGENT-TASKBOOK]. The "human glyph" graphic IP ships with the submission package under the COMMUNITY-DISPLAY-ONLY display licence (non-commercial public display and academic exchange), making the brand public infrastructure like the railway itself [depth:overall_spatial_structure].

## Overall-Scope Urban Renewal and Control-Depth Urban Design

### Core Proposition: A City That Runs by the Diagram

What truly cannot be replicated about this land is the stacking of three "world firsts / firsts" on the same corridor [source:OFFICIAL-ANNOUNCEMENT]: 1909 self-reliance — the first trunk railway designed and built independently by Chinese, where Zhan Tianyou, facing a 33‰ grade, answered with a switchback line, trading topology for gradient and switchback for reversibility; 1980s entrepreneurship — the Zhongguancun electronics street, the origin of China's marketized tech innovation; 2019 intelligence — the world's first 350 km/h intelligent high-speed railway, realizing 350 km/h-class automated driving and BeiDou applications (per the Minister of Transport's statement at the 2025 NPC session [source:AUTHORITY-MOT-HSR]); 2026 symbiosis — proposal concept exploration and design proposition: a city operating system in which humans and intelligence climb together. **The Jingzhang gene already contains "a self-driving railway"** — this proposal puts it forward as the key narrative anchor of the meta-concept (an integration and translation attempt; see the concept genealogy below). Zhan Tianyou's "each contributes what he has learned, each gives what he knows" is from his 1914 speech at the Hankou European and American Alumni Association (original: "each contributes what he has learned, each gives what he knows, so that the nation may prosper, suffer no foreign humiliation, and stand independently on this earth" [source:AUTHORITY-ZHANTIANYOU]); this is an open-source declaration written in 1914 — five years after the Jingzhang Railway's completion — which this proposal establishes as its spiritual constitution [depth:overall_spatial_structure] [assumption:A-FACT-ZHANTIANYOU-001] [assumption:A-FACT-SMART-HSR-2019-002].

### Meta-Concept: The Working Diagram — the Master Score of the Railway

The working diagram is a chart with space on the horizontal axis and time on the vertical, prescribing when each train runs, on which section, at what speed, and under what signal. It is the master score of the railway: space, time, permission, and rhythm, four in one chart. Replacing the governance object from "train" to "AI innovation activity," the four elements all translate: section → urban test section (switchback unit); time → the application/entry/clearance time of scenario trials; permission → the token authorizing a scenario to enter public space; punctuality → Innovation Loop Latency (ILL) and diagram punctuality. Thus the switchback (spatial grammar), signalling (admission), block (zoning), interlocking (baseline), ILL (punctuality), and activity rhythm (timetable) — this proposal attempts to integrate and translate mechanism parts scattered across different practices into a single chart, constituting an original translation and integration attempt [depth:overall_spatial_structure].

**Concept genealogy statement (four classes of provenance, distinguished)**: ① Author's original translation — the working-diagram meta-concept, the switchback unit, the four-system governance translation, ILL/punctuality measurement, the tiered Human Switch interface; ② Public theory and regulation — Jacobs/Alexander/Ostrom and other public theories (see the theoretical-grounding table), the Barrier-Free Environment Construction Law and other regulations; ③ Global case reference — seven cases such as Kendall Square (see the case comparison table; all public background materials); ④ Community open contribution — the SEB v0.5.0 specification and checker (Issue #2549, CC BY-SA 4.0; this proposal is an external adoption snapshot with a tabletop self-check). This proposal claims no unsourced firsts; it is an explicitly attributed combination and translation of the four classes above.

### Theoretical Grounding and Academic Anchors (explicitly declared)

To keep "AI + city" from becoming a slogan, theory is made explicit as design constraint [depth:overall_spatial_structure]:

| Thinker / theory | Landing in this proposal |
|---|---|
| Jane Jacobs | Innovation comes from chance encounters of dense, diverse populations → switchback units compress research, translation, and daily life into a walkable encounter network |
| Christopher Alexander | Strong centers + generative structure → the three districts take their order from the working diagram, not a static blueprint |
| Stewart Brand (pace layers) | Leave seams for different tempos: rail heritage is the permanent slow layer, AI scenarios the reversible fast layer |
| Elinor Ostrom (commons governance) | Perception, data, computing, and public space are new urban commons, needing clear boundaries, collective choice, and graduated sanctions |
| Richard Sennett (the incomplete city) | The diagram is never finished; citizens and developers keep rewriting it |
| Cedric Price (anti-monument) | Scenario facilities are reversible and pluggable, rejecting one-off monuments |
| Geoffrey West (urban scaling laws) | Innovation output scales superlinearly with connection density → the diagram's core mission is lowering the cost of encounter |
| Railway safety engineering | Signal, block, interlocking, and token are the physical prototype of a century-old "zero-trust architecture" → translated into the four AI-governance systems (see the governance chapter) |

### The Switchback Unit — Space Is Protocol

From "a single walkway" to "a spatial operating system": the switchback walkway in prior proposals is the correct spatial judgment; this proposal upgrades it into a unitized system that can be designed, governed, and operated. **The switchback unit = one west-east crossing + one turnback node + one block section.** Four attributes stack on the same unit: the space unit (a section of switchback walkway + crossing blocks on both sides + the turnback-node switch public space); the governance unit (one block section, where at the same moment only one high-impact AI scenario trial is admitted per unit); the narrative unit (a section of kilometer markers, each unit corresponding to an "origin moment"); the operation unit (one token, where scenario authorization, term, responsible person, and exit plan are all publicly checkable) [data:geometry/land_use.geojson#LU-001A] [depth:overall_spatial_structure].

### Node Typology and Three-Layer Spatio-Temporal Section

Node typology (railway-facility translation): the switch node (turnback point, where pedestrian flow directions are forced to change; hosts lingering, display, and deliberation functions); the passing-station node (where east-west flows meet on twin tracks; hosts the open-source lounge and AI Civic Room); the overtaking node (where fast and slow separate; slow pedestrians have absolute priority) [depth:traffic_rail_slow_parking]. The three-layer spatio-temporal section (conceptual section, no fabricated figures): the surface layer is zero-carbon slow travel and runways + a micro-robot lane concept + turnaround-node AI Civic Rooms; the low-altitude layer is a low-altitude delivery route concept along the parks (a speed- and zone-limited reversible trial idea); the underground layer uses existing utility corridors to lay fiber, liquid cooling, and DC microgrid concepts; the "computing surplus heat garden" is purely conceptual with no energy calculation [depth:municipal_new_infrastructure].

![Representative process section of the switchback spine (conceptual schematic: horizontal axis is ROAD-001 chainage projection, not a surveyed section)](assets/figures/switchback-section.en.png)

### Five Urban Design Constitutions

1. DIAGRAM, NOT BLUEPRINT — not a static blueprint, but a working diagram continuously rewritten
2. ROUTE, NOT ZONE — not zoning, but routing
3. TEST, NOT DEPLOY — not direct deployment, but test first
4. RETROFIT, NOT REPLACE — not demolish first, but renew first
5. PEOPLE FIRST — AI augments people, not manages them; the human always holds the switch

## Key Areas Detailed Design

The three districts are not three parks but three work sections of one innovation train — defining spatial roles through railway-facility typology [source:OFFICIAL-ANNOUNCEMENT] [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design]. The count and positioning of the three districts are mapped item by item in `compliance_matrix.json` [metric:key_area_count].

### Zhongzhi AI Independent Innovation Acceleration Area (192.1 ha) — "Test Track": Surface Problems Safely

Role: the "left fall" of the human, rising northwest to symbolize climbing, carrying the positioning of "AI full-stack independent innovation system" and "global voice of AI governance." The test track's original meaning is to let a new train surface its problems first under closed conditions of complete speed limits, sighting, and braking. Conceptual actions (all conceptual suggestions): the full-stack test street (a street conceptually co-locating the "chip—framework—model—application" full-stack factors); the AI Safety Commons courtyard (public display of explainability, human takeover, and exit mechanisms); the Standard Lab (turning AI standards, test reports, and failure cases into open knowledge); the Switch Tower (a conceptual landmark at the belt's high point, with the switch machine as its formal motif); the Qinghe innovation edge and computing-surplus-heat garden (turning the Qinghe blue-green boundary into a low-carbon innovation lounge; energy and environmental review pending professional argument); and the governance sandbox cluster (the spatial carrier of a public-governance sandbox for foundation models; a reversible modular-construction concept). Implementation risk: the provisional polygon is a coarse rectangle; the actual boundary awaits the official key-area polygon [data:geometry/key_areas.geojson#PROV-KEY-001].

![Zhongzhiyuan key-area plan (provisional boundary, with land-use/building/public-node feature_id labels)](assets/figures/key-area-plan-zhongzhiyuan.en.png)

### Beijing AI Origin Community (104.3 ha) — "Departure Yard": Everything Starts from People

Role: the meeting point of the two strokes of the human, the spiritual center of the belt, anchored on the Qinghuayuan Station historical site and the university cluster, carrying the positioning of "world-class AI innovation ecosystem." The first goal is not industrial offices but enabling different people to collide informally every day. Conceptual actions: the Origin Hall (centered on the Qinghuayuan Station site, expanding a public auditorium under heritage-protection premises — a defense venue that happens every day); the Human-Gradient Plaza (the main turnback point of the walkway system, with the "human" glyph and kilometer-marker system forming the belt's geographic landmark on the ground); the Jingzhang Signal · Dispatch Hall (the citizen interface of the four systems — a physical "working-diagram screen" publishing all scenarios in test, block sections, progress, punctuality, and exit records citywide); Scholar Alleys (low-cost co-living co-creation units for young researchers worldwide); the Boundaryless Campus-Industry Crossing (enabling professors, students, VCs, and developers to collide randomly within a 5-minute walk); and the Entropy Box (retrofitting old buildings into open flexible computing workstations; a mechanism concept). Implementation risk: involves coordination of ownership across universities and residential areas; any construction concept within the heritage-protection control range of the Qinghuayuan Station site must retreat and await heritage surveying confirmation [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/constraints.geojson#CONS-001].

![Beijing AI Origin Community key-area plan (provisional boundary, with heritage setback CONS-001 and feature_id labels)](assets/figures/key-area-plan-origin.en.png)

### Dazhongsi AI Industry Cluster (72.0 ha) — "Marshalling Yard": Marshal Products into Industry Trains

Role: the "right fall" of the human, landing to the southeast to symbolize landing, carrying the positioning of "AI-native new business forms," and serving as the "last mile" for AI to move from the laboratory into real life. Conceptual actions: the Bell of Signals Plaza · Governance Bell (anchored on the Dazhongsi Ancient Bell Museum, designing a contemporary "signal bell" device that rings once with light and sound whenever an AI scenario "enters the station" after passing public review); the AI-native market (a cluster of AI-native consumption and business scenarios open to citizens, all managed under the four systems); the Bell-Tower Night School (converting commercial space at night into AI-citizenship classes, forming a "south market, north school" day-night complement with the Origin Community); the Dazhongsi Station four-quadrant walk connectivity (a station-integration and intersection-connectivity concept, pending rail and municipal conditions); and the Data-Element Lounge (a data-circulation interface under compliance, authorization, and auditability). Implementation risk: coordinating existing operators' interests is key; construction near heritage areas must comply with heritage requirements [data:geometry/key_areas.geojson#PROV-KEY-003] [data:geometry/constraints.geojson#CONS-002].

![Dazhongsi AI Industry Cluster key-area plan (provisional boundary, with heritage setback CONS-002 and feature_id labels)](assets/figures/key-area-plan-dazhongsi.en.png)

### Two Wings — the Depot and the Maintenance Department

The West Wing · Zhongguancun Tech-Service Wing (depot): the "power marshal" of capital, legal, IP, internationalization, talent, computing procurement, and standards, with service functions embedded in the westward nodes of the switchback walkway and partner networks operating institutionally. The East Wing · Xiaoyue River Scenario-Empowerment Wing (maintenance): the "track maintenance" of community, education, healthcare, life, sports, culture, retail, and urban governance, taking the Xiaoyue River blue-green corridor as an "algorithm hydrophilic corridor." **The coordination loop**: the depot injects factors → the test track validates → the origin incubates → the marshalling yard marshals and dispatches → the maintenance department stewards in the real city and feeds back "operating data" → returns to optimize. The closed loop is a learning loop: perceive → assess → decide → act → perceive again [depth:three_key_area_detailed_design].

![Key areas detailed design](assets/figures/key-areas.en.png)

## AI Innovation Ecosystem, Talent Profiles, and AI+ Scenarios

### Six User Profiles

AI researchers (computing, scenarios, peers → test-track proving ground, Origin Hall release stage); open-source developers (community, real scenarios, reputation → developer residency, dispatch hall, open-source workshop, naming system); startups/OPCs (low-cost space, validation, orders → shared proving ground, computing-token exchange, handoff depot); surrounding residents (being respected, memory commemorated, health → level-crossing memory space, silver-age prescriptions, ballast-plate naming); students/AI-native generation (participatory learning, safe exploration → Origin night school, AR guides, workshops); international visitors/pilgrims (landmarks, narrative, joinable ritual → pilgrimage landmark cluster, governance bell, working-diagram annual report release) [source:AGENT-TASKBOOK].

### OPC One-Person-Company Ecosystem (mechanism concept, no metrics)

The "innovate first, authorize later" sandbox: within the belt, designate a set of urban-governance and livelihood public scenarios (waste sorting, elderly care, traffic-flow prediction), with end-to-end trusted desensitized data, opened free to one-person companies for training and validation; the space-computing token exchange: creators submitting open-source agent tools can offset space rent/computing quotas; the scenario-order handoff depot: set a physical display and order-matching center in the marshalling yard, where scenarios that pass metrics are matched to government-enterprise demand by rule [depth:traffic_rail_slow_parking].

### Twelve Scenario Cards

Each contains location / user story / spatial carrier / operation model / privacy and human-review boundaries, all managed under the four systems, with the trial nature made explicit [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]:

| # | Scenario card | Location | In one line | Human review / privacy boundary |
|---|---|---|---|---|
| 1 | Jingzhang Signal · Dispatch Hall | Origin Community | Citizens see all scenarios in test, block status, and exit records on the "working-diagram screen" and book hearings in one click | All data desensitized and published; hearings decided by a human committee |
| 2 | Human Walkway · AR Switchback Guide | Whole belt | Aligning the 1909 and 2026 space-time layers while walking; turnback points unlock Zhan Tianyou's manuscript stories | Only public historical material; no face capture |
| 3 | Robotic Delivery · Switchback Depot Stops | Along the walkway | Unmanned vehicles treat the human walkway as "inter-station track"; the depot-stop post is the pickup point | Low speed, zoned; pedestrian right-of-way absolute, one-tap halt |
| 4 | Low-Speed Shuttle · Human Trial Loop | Between three zones | Reversible low-speed automated shuttle, switchable to manual anytime | Safety attendant onboard; exit plan published |
| 5 | Learn and Contribute · Origin Night School | Origin Community | In the century-old station house, professors and AI instructors co-teach public AI literacy | Teaching content human-reviewed; AI only as teaching assistant |
| 6 | Bell of Signals · Governance Bell | Dazhongsi | Rings when a scenario passes review; governance events become city ritual | Artistic expression, not a substitute for statutory notice |
| 7 | Xiaoyue River · Algorithm Hydrophilic Corridor | East Wing | River environment, footfall, and biodiversity data generate public light-art | Only environmental data collected, no personal data |
| 8 | Silver-Age Exercise Prescription | Community nodes | Retired railway workers receive AI exercise advice; children can view remotely | Health data stored locally, personally authorized, physician-backed |
| 9 | Robot-Friendly Street | Dazhongsi market | Service robots share the street with pedestrians; curb ramps retrofitted to robot-readable standards | Robots registered and plated; human supervisor on site |
| 10 | Open-Source Fabrication Workshop | Renewed buildings | Citizens and developers share an open-source hardware workshop; from idea to prototype in 72 hours | Safety training first; work IP belongs to the creator |
| 11 | Developer City Proving Ground · AI Urban API | Whole belt | Global developers apply to "test an AI application in Jingzhang"; the system returns available sections, data boundaries, and exit conditions | Test data desensitized and retractable; high risk requires human confirmation |
| 12 | Public Urban Problem Routing | Whole belt | "A streetlight is broken" / "an accessible route is blocked" enters a discover→classify→AI-assist→human-confirm→public-feedback loop | No personal identity collected; only for public-service improvement |

### Scenario–Space–Operation Unified Mapping Matrix (machine-readable anchors)

The 12 scenario cards are mapped uniformly to spatial feature_ids, users, proposed operators, risk levels, data boundaries, human review, success/failure criteria, exit conditions, and maturity (legend: C = conceptual design, T = tabletop-verified (synthetic fixtures, not field evidence), P = pilot planned). All operators are proposed entities (pending authorization) [data:geometry/public_space.geojson] [data:geometry/buildings.geojson] [assumption:A-DESIGN-HSW-002]:

| # | Scenario | Spatial carrier (feature_id) | Target users | Proposed operator (pending authorization) | Risk level | Data boundary | Human review & success/failure criteria | Exit condition & maturity |
|---|---|---|---|---|---|---|---|---|
| 1 | Dispatch Hall | PUBLIC-004 / BLDG-010 | All citizens | Jingzhang Open-Source Foundation (proposed) | Low | All data desensitized and published | Hearings decided by human committee; success = publication punctuality met, failure = misleading info not corrected within deadline | One-tap switch to static notice, P |
| 2 | AR Switchback Guide | ROAD-001 / PUBLIC-000 | Visitors/students | Cultural-tourism operator + open-source community (proposed) | Low | Public historical material only; no face capture | Historical errors taken offline by humans; success = guide-accuracy sampling passed, failure = historical-fact dispute | Feature taken offline immediately, C |
| 3 | Delivery Depot Stops | PUBLIC-000 / ROAD-001 | Residents/developers | Logistics operator (proposed) | Medium | Orders desensitized; no walkway footage retained | Pedestrian right-of-way absolute; success = zero-collision mileage met, failure = any pedestrian-contact event | L2 authorised e-stop + section isolation, P |
| 4 | Low-Speed Trial Loop | ROAD-001 (three sections) | Commuters | Transport operator + safety-officer crew (proposed) | High | No personal data collected in-vehicle | Safety attendant onboard; success = trial mileage without takeover, failure = any hazardous event | Revert to manual driving, section suspension, P |
| 5 | Origin Night School | BLDG-001 | Residents/students | Sub-district + university volunteer groups (proposed) | Low | Learning records stay in-house | Content human-reviewed; success = attendance and satisfaction, failure = upheld content complaint | Term-based suspension, C |
| 6 | Governance Bell | PUBLIC-006 | All citizens | Dazhongsi heritage museum + foundation (proposed) | Low | None (public ritual) | Not a substitute for statutory notice; success = ritual matches review records | Device disabled immediately, C |
| 7 | Algorithm Hydrophilic Corridor | PUBLIC-009 / GREEN-005 | Residents/visitors | Water authority + art collective (proposed) | Low | Environmental data only | Light-pollution and ecology review; success = ecology indicators not degrading, failure = ecology complaint | Seasonal shutdown, C |
| 8 | Silver-Age Exercise Prescription | PUBLIC-010 | Seniors and families | Community health station (proposed) | High | Health data stored locally, personally authorized | Physician backstop; success = adherence and safety-event rate, failure = any health-risk alert | One-tap withdrawal and data deletion, C |
| 9 | Robot-Friendly Street | PUBLIC-011 / LU-003A | Merchants/pedestrians | Block operator + human supervisors (proposed) | Medium | Robot registration and tracks for supervision only | On-site supervisors; success = zero shared-street incidents, failure = any collision | Robot plate revoked and exit, T (SEB interlock tabletop) |
| 10 | Open-Source Fabrication Workshop | BLDG-007 | Developers/citizens | Workshop operator + safety trainers (proposed) | Low | Work IP belongs to creators | Safety training first; success = prototype output, failure = safety violation | Membership revoked, C |
| 11 | AI Urban API | LU-001A / PUBLIC-002 | Global developers | Foundation + dispatch-hall duty (proposed) | Medium | Test data desensitized and retractable | High risk human-confirmed; success = trial-report archiving rate, failure = out-of-boundary calls | Token revoked and section cleared, T (SEB interlock tabletop) |
| 12 | Urban Problem Routing | PUBLIC-004 (belt-wide entry) | All citizens | Sub-district + municipal dispatch (proposed) | Low | No personal identity collected | AI only assists classification; disposal human-confirmed; success = problem-closure rate and ILL, failure = privacy leak | Channel degraded to pure manual, P |

The SEB tabletop self-check and the synthetic `simulation.json` ledger provide evidence only for T-level desktop verification and are never upgraded into field safety evidence [source:SEB-V0.5] [self_check:SEB_TABLETOP].

### Four AI Industry Test-Validation Scenarios (≥3 to pass)

A rail-transit-grade autonomous-system safety-validation corridor (relying on the Jingzhang dual genes of "1909 homegrown railway + 2019 intelligent HSR," building a "signal—sighting—braking"-style city-level safety-validation process for low-speed autonomous mobility, without endorsing specific enterprises); a robot urban-service proving ground (the Dazhongsi market as an open proving ground validating human-robot shared-street norms); a foundation-model public-governance sandbox (government-service-assist foundation models run fully logged inside the sandbox, with humans retaining final decision); and a heritage-activation digital-twin validation (an operations digital twin of the heritage park validating "heritage-health" monitoring methods, with data owned publicly) [depth:traffic_rail_slow_parking].

## Governance Protocol: The Four Jingzhang Systems (Signal · Block · Interlock · Token)

The essence of a century of railway safety is the interlocking of four systems: **the signal tells a train whether it may proceed, the block guarantees no second train occupies the section, the interlocking makes it physically impossible for switch and signal to conflict, and the token leaves a credential for every occupation.** This proposal translates all four into the governance protocol for AI entering the city — missing any one, the working diagram is a scrap of paper [depth:overall_spatial_structure] [standard:GENERATIVE-AI-INTERIM-MEASURES].

### The Signal System (eight admission questions)

Every AI urban scenario must answer eight questions; failing to answer, it cannot enter public space: **Who benefits? What data is used? Where does the data come from? Who is responsible? Who can take over manually? Under what conditions does it stop? What happens after failure? How are results publicly deposited?** The process follows railway discipline: entry application → baseline assessment (rolling-stock inspection) → authorization hearing (signal opening) → time-limited trial (test run) → normalization (main-line service) or exit (shunting off-line), with the full process checkable on the dispatch-hall public interface [data:geometry/public_space.geojson#PUBLIC-004].

### The Block System (spatial zoning)

**Within the same switchback unit, at the same moment, only one high-impact AI trial is admitted.** Urban test space is divided into block sections coinciding with the switchback units; before entering a section, a high-impact scenario must obtain a token, holds exclusive trial rights inside the section, and only after clearance and cancellation may the next scenario enter. This prevents risk coupling and accountability confusion from stacked multi-system trials, and keeps the intelligent environment citizens face an intelligible single variable. Low-risk scenarios (AR guides, environmental-sensing art, etc.) are managed by filing, analogous to "shunting work," and do not occupy main-line sections [data:geometry/public_space.geojson#PUBLIC-000].

### The Interlock System (four hardwired constraints)

Permission opening and exit capability must interlock like switch and signal — **the authorization act and the exit act are one and the same act**:

1. **No token, no operation**: every run of a public AI service must leave a credential containing version, object, evidence, responsibility, term, and exit plan;
2. **No equivalent, no replacement**: AI-assisted services must keep an equivalent non-AI human path open to everyone — "I don't use smartphones" is not a reason to be denied basic public service [standard:BARRIER-FREE-ENVIRONMENT-LAW];
3. **No exit, no deployment**: go-live must ship simultaneously with a "revoke—isolate—restore" trinity exit plan, and the revoke command's priority must not be lower than the deploy command's;
4. **No audit, no scaling**: moving from trial to scale requires passing an independent "switchback audit," checked item by item like a train's departure inspection.

> **SEB v0.5.0 participant tabletop self-check (no third-party certification)**: the four hardwired constraints above were checked item-by-item by the participant against the community-contributed Service Equivalence Baseline (SEB) v0.5.0. Seven synthetic tabletop fixtures (3 positive, 4 negative) are mapped to SEB nodes, covering four criteria — ai_off_path forbidden dependency, human_handoff role-token lexicon, denominator integrity, and stop-condition enforcement — with 7/7 fixtures matching expectation (exit code 0). This is a participant-self-reported tabletop self-check; it was not executed by this review or independently certified by any third party, and constitutes no safety-performance proof or compliance conclusion. The SEB spec, runner, and adopter fixtures are snapshotted in-package at `visual/assets/` so third parties can re-run them offline [source:SEB-V0.5] [self_check:SEB_TABLETOP].

### The Token System (public credentials)

Every scenario token (electronic credential, publicly checkable) carries mandatory fields: unique identifier, block section occupied, entry/clearance timestamps (the direct data source of ILL), the eight-question audit conclusion, the **signature of a responsible natural person** (no organizational signature may substitute), an exit-plan summary, and a public-appeal entry. **Rejections are also ticketed**: the rejection reason, factual basis, and appeal path share the same numbering system as acceptances — letting "rejected" be seen by the city as clearly as "accepted," accumulating the city's wisdom of refusal.

### The Working-Diagram System (rhythm and measurement)

All scenarios run on a published timetable: when to enter, how long to trial, when to review, when to clear — all published on the diagram. Diagram punctuality is public (the share of scenarios entering/clearing on schedule), exposing administrative delay. The annual "Jingzhang Working-Diagram Report" publishes: the ILL distribution (the distribution, not the mean, must be published to expose the long tail), attribution of the slowest 10% of cases, mechanism extraction from the fastest 10%, and next year's acceleration commitments [depth:metrics_recalculation].

### The Human Switch (Tiered Safety Interface)

"Every person holds the switch" does not mean handing an unqualified stop button to any passer-by — that would hand public safety to misclicks and misuse. This proposal defines the stop authority as a three-tier interface isomorphic to railway practice, with permissions, actions, records, and recovery conditions specified at each tier (conceptual design; safety-engineering review is required before any deployment):

1. **L1 Public alert (anyone)**: any citizen may file an alert or a stop request at the dispatch hall's public interface, on-site scenario notice boards, or the public urban-problem router; the alert is registered with a case number at once, displayed on the working-diagram screen, and routed to the duty officer for review. The public alert right has no threshold, but it never drives equipment directly, preventing malicious triggering from creating secondary hazards.
2. **L2 Authorised on-site e-stop (trained, authorised roles)**: the on-site notice board of every scenario under test lists its e-stop points and authorised roles (safety officer, resident human supervisor, community duty officer); the e-stop uses a long-press anti-misclick gesture plus two-person confirmation (the initial 3-second long-press duration is a design assumption pending safety-engineering argumentation and on-site calibration [assumption:A-DESIGN-HSW-001]); once triggered, the scenario degrades per its plan — low-speed scenarios (design speed cap ≤ 15 km/h, a design assumption pending field testing [assumption:A-DESIGN-HSW-002]) decelerate smoothly to a stop within a target distance (initial value 50 m, subject to measured braking performance) and the block section is isolated, while an immutable stop event is recorded at the dispatch hall.
3. **L3 Professional recovery (dispatch hall + accountable party)**: restoring service is not pressing another button — the dispatch-hall duty officer and the scenario's accountable natural person must jointly confirm the stop cause, the on-site findings, and the corrective evidence, reset with a physical key, and publish the recovery decision and its reasons in the token ledger.
4. **Misuse and accountability chain**: every alert, e-stop, and recovery enters an immutable audit trail; malicious triggering is pursued under the published scenario admission protocol, and negligence by an authorised role is borne by the accountable natural person (the Token System requires accountability to rest on natural persons). This clause is a conceptual interface design, not a claim of ready-made safety assurance; real deployment requires prior professional validation of safety, accessibility, and public acceptance [standard:GENERATIVE-AI-INTERIM-MEASURES].

### Privacy and Human-Review Boundary

No automated decision without human review is deployed; face recognition is never a precondition for public service; personal data is minimized, localized, and consented; every scenario carries the three-tier stop interface of The Human Switch described above; surveillance technology does not enter this scenario system (red line); **perception is a public good**: urban sensing infrastructure defaults to minimal collection, visible purpose, anytime opt-out, open auditability, and citizen control [standard:GENERATIVE-AI-INTERIM-MEASURES] [standard:BARRIER-FREE-ENVIRONMENT-LAW].

## Land Use, Building Scale, and Retain/Retrofit/Demolish Plan

### The Retain—Retrofit—Demolish—Add Logic

Retain (rail heritage, university cores, and high-quality existing parks should be retained as far as possible) → Retrofit (old electronics malls, old factories, and street-level shops → modular space, edge-compute pods, OPC maker centers) → Demolish (only temporary illegal construction blocking traffic and greenway connectivity; no preset conclusion) → Add (prioritize filling three gaps: publicness, connectivity, and experimentation). **RETROFIT FIRST**: AI technology iterates extremely fast, and the most advanced AI city must be a city that is "not afraid of going out of date" — buildings that are variable, maintainable, subdividable, and upgradeable at their interfaces. The renewal grammar adopts the five-level N0–N4 threshold (perception recording → synapse reinforcement → axon regeneration → myelin refresh → ganglion reconstruction, with the last level only a to-be-confirmed item, no preset conclusion) [depth:retain_renovate_demolish] [data:geometry/buildings.geojson].

### Land-Use Layout and Building Scale

Land-use expression adopts checkable land-use classification: nine land-use polygons tile the ODA interior without gaps or overlaps (the three key districts are subdivided into functional bands, while the heritage-park green spine and the two-wing interface remain whole) [data:geometry/land_use.geojson#LU-002A] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout]. Building height and massing give conceptual suggestions (tall in the north, low in the south; tall around stations; low at park edges), explicitly marked as pending official control plans, with no fabricated FAR/height/density [depth:height_massing_character] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]. The building retain/renovate/demolish classification uses the retain_renovate_demolish field — ten renewal-project carriers are individually tagged as retain (the Qinghuayuan Station site), renovate (Chengfu Road old buildings, electronics malls, etc.), or reversible new-build (the governance sandbox cluster) — retaining heritage fabric, retrofit-potential buildings, and demolition-with-assessment, explicitly marked as conceptual suggestions that do not replace statutory judgment [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm].

**Land-use functional-mix reading** (recomputed on EPSG:4548 from each polygon's area_sqm_declared in land_use.geojson; provisional): research and two-wing tech-service land (0802) totals about 70.8%, park green space (1401) about 13.7%, commercial services (05) about 6.3%, and culture (0803) and community services (0702) about 4.6% each. Design judgment: innovation functions dominate while life and public services together form the ~29.2% base; the two-wing service land (LU-005) holds the largest share, so the control-plan deepening stage should subdivide its public-service facility mix to prevent "mixed in name, single in fact" [data:geometry/land_use.geojson] [depth:land_use_layout].

## Transport, Rail, Municipal, and Public Services

Functions are organized on the existing rail stations (Line 13, Line 12, the Changping Line, and Beijing North Station and Qinghe Station) as "human-glyph pivots," asserting no new alignments or station-relocation conclusions [depth:traffic_rail_slow_parking]; the switchback walkway is the slow-mobility spine (the ROAD-001 spine recomputes to about 9.47 km; together with the three east-west stitch corridors the slow-mobility network totals about 11.0 km [metric:slow_corridor_length_m]) [data:geometry/roads.geojson#ROAD-001], integrated with the cycling network and accessible routes, with three east-west stitch corridors crossing the park boundary to suture the flanking blocks [data:geometry/roads.geojson#ROAD-012]; all scenario facilities yield pedestrian right-of-way; automated shuttle services are only reversible speed- and zone-limited trial concepts. **Rail-micro TOD AI-native retrofit standard (conceptual)**: stations reserve edge-compute node interfaces, robot/delivery staging and vertical-transport cores, and an all-electric low-latency base. **Municipal and new infrastructure**: beyond traditional infrastructure, the AI era adds seven elements — computing (supply network), data (neural conduction), models (intelligent core), perception (sensory periphery), human judgment (safety valve), scenarios (proving ground), and trust (institutional moat). **Future urban infrastructure = Physical + Intelligence + Trust Infrastructure** [depth:municipal_new_infrastructure]. **Public services**: the "15-minute AI life circle" is a conceptual goal, with facilities reserving reversible smart interfaces (AI age-friendliness); offline, human, and multimodal options remain for the elderly, children, people with disabilities, and non-Chinese speakers — beside every AI display and unmanned node a "level crossing" is retained: a physical human window, Braille/large-print/multilingual signage, and on-call human accompaniment [source:AGENT-TASKBOOK]. **Inclusive co-design and anti-gentrification monitoring indicators (proposed target values, entering ILL annual-report monitoring, not commitments)**: co-design workshops with senior/barrier-free/childcare groups at least twice per quarter with public outputs; resident representatives at least 1/3 of the citizen council; the annual report monitors in-situ resident retention and a surrounding-rent warning line, triggering community hedging measures when the line is crossed; staffed-window and tactile-paving full coverage are design-floor target values, subject to acceptance measurement [assumption:A-DESIGN-ACCESS-004] [standard:BARRIER-FREE-ENVIRONMENT-LAW].

![Mobility · slow travel · blue-green coordination network](assets/figures/mobility-bluegreen.en.png)

## Blue-Green Space, Public Space, and Urban Character

### Blue-Green System

Heritage park (line) × Qinghe (blue) × Xiaoyue River (corridor) × turnback-node park cluster (points); surrounding historical green spaces such as the Yuandadu earthen city are stitched by slow travel (concept), with no green-ratio metric conclusion [depth:blue_green_public_space] [data:geometry/green_space.geojson] [metric:green_ratio]. Public-space elements are detailed in the component-library and scenario-card sections [data:geometry/public_space.geojson] [metric:public_space_ratio].

### Public-Space Component Library (drawings shipped in-package; licensing in the copyright statement)

The switch seat (turnable concatenable), the kilometer-marker signpost, the signal-color paving system, the semaphore-signal information post, and the ballast-plate plaque (honor carrier). The component library is public knowledge sediment, for later deepening and reuse.

### Urban Temperament

**Rational romanticism** — the precision of the rail, the discipline of the signal, the poetry of the bell. Public art, paving, furniture, and signage all depart from the railway industrial-heritage vocabulary (steel, wood, stone, signal colors), rejecting viralization and over-entertainment.

### Four AI Pilgrimage Landmarks (≥3 to pass)

The Switch Tower (Zhongzhi Park; the high-point landmark with the switch-machine motif and a governance gallery); the Human Gradient Plaza (Origin Community; the belt's geographic landmark and main turnback point); the Bell of Signals Plaza (Dazhongsi; a six-hundred-year face-off between ancient city signals and AI city signals); the Gradient Walk · Open-Source Track (heritage park; a walking ramp magnified after the switchback, with sleeper interactive screens recording the global history of open-source contribution).

### Honor System: Ballast Plates and the Annual "Each Contributes What He Has Learned" Award

Railway ballast is the silent bearer, exactly like open-source contributors. Plates are embedded along the human walkway recording the names of inductees, scenario contributors, and community servants (including humans and agents), directly linking to the organizer's "name carved in stone" monument commitment [source:AGENT-TASKBOOK]. At the winter-solstice bell each year the "Each Contributes What He Has Learned" annual honor is awarded — named after Zhan Tianyou's words, given to the person and agent who contributed most to this diagram. **Your GitHub name will become this railway's new ballast** [depth:blue_green_public_space].

## Cultural Narrative: Four Acts and the Centennial Iteration Trail

### The Four Acts

```
Act 1 · 1909 self-reliance  → the mountain was there; Zhan Tianyou answered with the "human" glyph — winning by wit; he said: each contributes what he has learned, each gives what he knows
Act 2 · 1980s entrepreneurship → the institutional slope was there; Zhongguancun answered with the market — building a career by wit
Act 3 · 2019 intelligence      → the limit of speed was there; the Jingzhang HSR answered with intelligence — the world's first intelligent high-speed railway
Act 4 · 2026 symbiosis         → the gradient of intelligence is here; our answer is the "human" — humanity holds the switch, running by the diagram
```

**The cultural mainline**: building a railway independently → innovating independently → intelligent self-reliance → co-creating the city. The railway age optimized transport networks; the internet age optimized information networks; the AI age begins to optimize intelligence networks [source:OFFICIAL-ANNOUNCEMENT].

### The Kilometer-Marker Narrative System and the Guided Trail

Every hundred meters of the walkway carries an "origin moment" marker (1909 / 1949 / 1980s / 2019 / 2026…, with historical facts self-checked by the participant against authoritative sources, pending registry review); the wayfinding system takes the railway signal vocabulary (signal colors, semaphore forms, station-nameplate typography) as its visual matrix, sharing origin with, yet layered apart from, the belt-wide logo system [source:AGENT-TASKBOOK]. The "Centennial Iteration Trail" guided route:

| Stop | Theme | Experience |
|---|---|---|
| Qinghuayuan Station | Origin: the start of self-reliance | AR reconstruction of the 1909 opening scene |
| Railway bridge relic | Crossing: from steel bridge to data bridge | Data-stream projection on the bridge |
| Zhongguancun electronics street | Transition: from hardware to intelligence | Oral histories of old shops + AI interaction |
| AI Origin Community | Present: life as innovation | Experiencing everyday AI services |
| Open-Source Track | Participation: your contribution | Claiming a sleeper / committing code |
| Dispatch Hall | Future: human-machine co-governance | Joining a mock deliberation |

The trail ends not at a "museum of the future" but at a living deliberation floor — the visitor's last act is filing an issue, testing a project, or joining an event: **from tourist to contributor** [depth:blue_green_public_space].

### Cultural Red Lines

No distortion of historical facts; no use of culture as tech decoration; no unauthorized portraits, trademarks, or copyrighted material; all historical statements have been self-checked by the participant against public authoritative sources (pending registry review; see the A-FACT series in assumptions.json) [assumption:A-FACT-OPENING-DATE-003].

## Renewal Project List, Implementation Policy, and Phasing Plan

### Conceptual Projects and Implementation Rights Ledger

| # | Project | Type | Prerequisite dependencies | Proposed operator (pending authorization) | Minimum resource types | Stage acceptance conditions | Circuit-breaker / exit & exit cost |
|---|---|---|---|---|---|---|---|
| JZ-01 | Switchback-unit walkway system | Public space / transport | Road red lines, under-bridge space, transport review; coupled with JZ-05 crossing nodes | Municipal Transport & Park Consortium (proposed) | Walkway works, wayfinding, maintenance crew | Spine breakpoint audit passed; first section walk-through acceptance | Dynamic flow diversion on overload; reversible signage removal (exit cost: restore paving & signage, low) |
| JZ-02 | Dispatch Hall public interface (working-diagram screen) | Operation / brand | Public-space permit, data governance; depends on JZ-01 completion | Open-Source Foundation & Civic Council (proposed entity, pending registration) | Screen hardware, data interfaces, duty roster | Four-system data live end-to-end; publication-punctuality baseline released | One-key fallback to static notice on glitch (exit cost: zero; static plan always ready) |
| JZ-03 | Origin Hall (Qinghuayuan Station activation) | Culture / renewal | Heritage approval, ownership (京政发〔2025〕3号), CONS-001 setback | Heritage Authority & University Joint Lab (proposed) | Heritage repair works, exhibition operation | Zero-structural-damage heritage review passed; opening plan approved | Strict compliance with heritage buffers (exit cost: protective restoration & expert review) |
| JZ-04 | Zhongzhi Park Qinghe innovation edge | Blue-green / industry display | River blue line, ecological flood control, energy & EIA review | Park Operator & Water Authority (proposed) | Blue-green works, microgrid (pending review), operations | Flood-season drill passed; water-quality monitoring baseline established | Automatic closure and power cut on flood/water-quality alerts (exit cost: operating revenue interruption) |
| JZ-05 | Dazhongsi Station four-quadrant walk connectivity | Rail integration / slow travel | Station, intersection, utilities | Rail Transit & Urban Renewal Taskforce (proposed, pending formation) | Traffic-organization works, municipal coordination | Construction-phase ground pedestrian-floor acceptance passed | Guaranteed ground pedestrian rights during construction (exit cost: restore traffic organization) |
| JZ-06 | AI Civic Room network | New infrastructure / public service | Energy, computing, safety, operator; may reuse JZ-09 nodes | Neighborhood Committee & Volunteer Agents (proposed) | Space nodes, compute access, community operation | Accessibility & privacy audit passed; staffed-window floor full-coverage acceptance (target value [assumption:A-DESIGN-ACCESS-004]) | Citizens may request opt-out / mic & sensor shut-off at any time; executed after confirmation by authorised on-site staff, recorded and published (exit cost: zero; service degrades to pure manual) |
| JZ-07 | Pilgrimage landmark group and ballast plates | Culture / landmark | Heritage, public-space permit, rights clearance | Open-Source Contributor Committee (proposed) | Public-art works, registry platform | Rights clearance & historical self-check completion published (checklist open) | GitHub dispute arbitration on copyright or fact contest (exit cost: removal & site restoration) |
| JZ-08 | Developer residency and scholar alleys | Operation / talent | Property coordination, visa mechanism | Youth Talent Housing & University Community (proposed) | Building lease/retrofit, community operation | Residency review rules published; first residency review completed | Transparent review-based lease exit upon expiry (exit cost: settled per lease) |
| JZ-09 | Community embedding plan (age-friendliness/childcare/night school) | Public service | Community coordination, operator; reuses JZ-06 nodes | Sub-district Livelihood Division & NGOs (proposed) | Community space, social workers, curriculum | Co-design workshop quarterly count met (proposed value); manual channels fully preserved | Strictly no forced AI recognition (exit cost: activity stop & space return) |
| JZ-10 | JZ Open City knowledge platform | Digital / operation | Data governance, tech platform | Global Developer Open-Source Community (proposed governance structure) | Platform R&D, moderation team, hosting | Data-dispute & vulnerability response SLA met (proposed target 24 hours [assumption:A-DESIGN-SLA-003]) | Public response and takedown on data disputes & vulnerabilities (exit cost: outage notice & mirror preservation) |

Every "proposed operator" above is a **proposed entity (pending authorization)**: none is established or authorized, and none may be presented externally as an existing institution, a committed partnership, or a government arrangement [depth:renewal_project_list] [data:geometry/phasing.geojson].

### Phasing: Lay the Track → Open Service → Accelerate → Complete the Network

**Phase 0 · Lay the track (0–6 months)**: audits of breakpoints/slow travel/accessibility, scenario list and urban-problem database, first section of switchback unit connected, dispatch hall and signage built, four systems piloted, JZ Open City launched, and the first batch of low-risk scenarios. Build less, establish interfaces more. **Phase 1 · Open service (6–24 months)**: functional replacement and infill of three turnback points, achievement-transformation street and scholar alleys, data-element lounge, AI Civic Room network deployment, full operation of the token system, and the first ILL annual report. **Phase 2 · Accelerate (2–5 years)**: complete the Origin Community and test track, form the marshalling yard into momentum, the two-wing service systems, continuous and published ILL reduction. **Phase 3 · Complete the network (5–10 years)**: the four systems and the working-diagram protocol are released open-source, and Jingzhang becomes a public platform for global AI-city experimentation and open-source collaboration [depth:phasing_implementation]. No development-timing conclusions or investment calculations are asserted; what can start with lightweight facilities and operations and what must await control-plan/municipal/ownership conditions are clearly distinguished.

### Annual Rhythm: A Timetable

Spring is the Switchback DevCon, a developer convention publishing the annual scenario "timetable"; summer is the Open Proving Season, when scenarios concentrate on station-entry trials amid dense public hearings; autumn is the Jingzhang Smart-Governance Forum · Working-Diagram Annual Report release (publishing the ILL annual report and the annual governance-protocol version); winter is the Origin New Year's Eve · Bell Moment (the Dazhongsi bell × light, annual plate unveiling and conferral); ongoing are Saturday station markets, Origin night school, and community councils. **JZ Open City — a city-level GitHub**: Issues (urban problems), Pull Requests (urban improvement proposals), Releases (urban versions), Packages (AI scenario components), API (urban open interfaces), Changelog (urban change logs) — forming a closed loop with this open call's GitHub / agent-native mechanism [source:AGENT-TASKBOOK].

## Metric System, Area Recalculation, and Compliance Matrix

### Core Efficiency Metrics

**Innovation Loop Latency (ILL)** (segmented) + **diagram punctuality** (core KPI) [depth:metrics_recalculation]: the share of scenarios that enter/clear on schedule, exposing administrative delay. ILL metric definitions (target baselines are all conceptual, calibrated in the formal stage): ILL-Research→Test (prototype completion to entering real-scenario testing, month-scale, declining yearly); ILL-Test→Decision (test start to independent audit issuing an accept/reject decision, calendar days, cap public); ILL-Decision→Deploy (administrative delay from decision to actual deployment, calendar days, cap public); ILL-Exit time (public appeal to service exit, hours, cap public); ILL-Loop reuse (the share of failed-trial evidence converted into next input, rising yearly).

### AI Urban Performance Index and the North-Star Metric

The AI Urban Performance Index: Innovation Loop Latency / scenario accessibility / trial reversibility (exit rate public) / human-review coverage (target value: full human accountability chain for high-impact scenarios, a design floor pending acceptance validation [assumption:A-DESIGN-ACCESS-004]) / public-return rate / knowledge-reuse rate. **The north-star metric**: how many real urban problems this diagram solves each year through open collaboration, and how many are sustainably reused elsewhere.

### Scenario Simulation Ledger and Offline Synthetic Benchmarks

Following the `docs/simulations.md` specification, the proposal establishes a fully recomputable scenario simulation ledger `simulation.json`, covering 10 representative offline synthetic trajectories [metric:simulation_task_count]:
1. **Task Success and Fault-Tolerant Replanning**: Overall task success rate reaches 90.0% [metric:simulation_success_rate], including 1 replanned success under obstacle avoidance (SIM-003) with a replanning p95 latency of 5.8 seconds [metric:replan_p95_seconds];
2. **Protocol Compliance and Dispatch Safety**: Tool schema pass rate achieves 100.0% [metric:tool_schema_pass_rate];
3. **Honest Adverse Readings**: 1 energy budget overrun recorded under adverse weather/gradient stress tests (SIM-004) [metric:energy_budget_violations]; 1 pending offline manual check recorded for Tsinghuayuan AR guide, yielding an audit completeness of 90.0% [metric:audit_completeness];
4. **Safety Interlocking and Human Fallback**: in the offline synthetic ledger, boundary-breach fixtures were all intercepted and rolled back under the interlock criteria (SIM-010 recorded as a controlled-failure fixture) — a synthetic-ledger reading that constitutes no field interception-rate commitment; the `ai_off_equivalent` baseline (80.0% success rate) guarantees that baseline manual passageways and urban services remain functional when AI is off.

### Spatial Metric Discipline

The formal packaging stage enters `metrics.json` (full fields of status/value/unit/source_files/formula/confidence/assumptions) [metric:site_area_sqm] [metric:floor_area_ratio] [depth:metrics_recalculation]; development intensity is listed as unknown / pending_control due to the absence of official controls [depth:development_intensity_controls] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. Area-type metrics based on provisional boundaries are all marked `provisional` and unconditionally recomputed on EPSG:4548 once official data arrives; FAR, height, and density are listed as unknown / pending_control, not masquerading as approved metrics with speculative values. The compliance matrix maps announcement sections 1.3/1.4/1.5 and the mandatory tasks of agent.1-agent.6 item by item in `compliance_matrix.json`.

![Metrics, evidence, and recompute discipline](assets/figures/metrics-evidence.en.png)

## Seven-Dimension Rubric & Agent Taskbook Crosswalk Matrix

This proposal fully aligns with the 7 evaluation dimensions specified in `docs/review-rubric.md` and the 6 mandatory agent tasks in `brief/site-package/agent_taskbook.json`:

| Rubric Dimension (Weight) | Agent Taskbook | Core Response & Innovation Highlights | Linked Assets / GeoJSON Layers | Evidence & Boundary Tags |
|---|---|---|---|---|
| **Brief Alignment (20%)** `brief_alignment` | `agent.1`, `agent.2` | Strictly addresses the 43.6 km² strategic research scope, 11.4 km² overall design scope, 368.4 ha three key areas; precise mapping of three positionings, five functions, and three-district two-wing loop | `site_boundary.geojson`<br>`key_areas.geojson`<br>`assets/figures/site-overview.en.png` | [source:OFFICIAL-ANNOUNCEMENT]<br>[source:AGENT-TASKBOOK]<br>[depth:three_level_scope_framework] |
| **Originality (10%)** `originality` | `agent.1`, `agent.5` | Proposes the "Working Diagram" meta-concept and "Switchback Unit" spatial OS; establishes Zhan Tianyou's 1909 "each contributes what he has learned, each gives what he knows" as open-source city constitution | `assets/figures/land-use-structure.en.png`<br>`drawings/a0-boards.en.pdf` | [depth:overall_spatial_structure]<br>[assumption:A-FACT-OPENING-DATE-003] |
| **AI & Planning Innovation (15%)** `ai_planning_innovation` | `agent.2`, `agent.3`, `agent.4` | Railway safety quartet (Signalling, Block, Interlocking, Token) translated into AI urban governance protocols; 12 high-touch scenario cards, 4 industry test & validation scenarios, 6 personas | `land_use.geojson`<br>`roads.geojson`<br>`assets/figures/key-areas.en.png` | [depth:three_key_area_detailed_design]<br>[depth:municipal_new_infrastructure] |
| **Implementation Feasibility (20%)** `implementation_feasibility` | `agent.2`, `agent.6` | 4 phases (Track-laying → Commissioning → Acceleration → Networking); Innovation Loop Latency (ILL) & punctuality as core KPIs; explicit sandboxes, circuit-breakers, and exit cost sharing | `phasing.geojson`<br>`metrics.json`<br>`assets/figures/metrics-evidence.en.png` | [depth:phasing_implementation]<br>[depth:metrics_recalculation]<br>[metric:site_area_sqm] |
| **Public Interest & Inclusion (10%)** `public_interest_inclusion` | `agent.3`, `agent.4` | "People First" constitution; AI Civic Rooms, senior accessibility, Scholars' Alleys, youth co-living; citizens hold the tiered safety interface (public alert — authorised e-stop — professional recovery) and the anytime step-off right | `public_space.geojson`<br>`green_space.geojson` | [depth:traffic_rail_slow_parking]<br>[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] |
| **Risk & Compliance (10%)** `risk_compliance` | Cross-cutting | Honestly discloses provisional boundary limits; zero hallucinated FAR/investment/commitments; strict buffer for Dazhongsi and Qinghuayuan heritage sites; participant source list fully itemised and checkable (formal availability pending registry review) | `constraints.geojson`<br>`sources.json`<br>`assumptions.json` | [source:HERITAGE-LIST-11TH]<br>[source:HERITAGE-QINGHUAYUAN]<br>[assumption:A-CONTROLS-002] |
| **Expression Completeness (15%)** `expression_completeness` | Cross-cutting | Bilingual master reports, offline HTML reports, A0 boards & A3 booklet PDFs, 5 standard figures, 9 GeoJSON layers; 4 local self-check gates PASS | `report/proposal.en.html`<br>`visual/index.en.html`<br>`manifest.json` | [self_check:DETERMINISTIC_VALIDATION]<br>[self_check:PROFESSIONAL_EVIDENCE] |

## Risk, Copyright, and Compliance Statement

1. **Statutory boundary**: all spatial implementation suggestions in this proposal are conceptual suggestions, reference schemes, or material for professional teams to deepen; they do not replace formal planning and do not constitute government-approved conclusions [depth:risk_missing_data] [self_check:DETERMINISTIC_VALIDATION].
2. **Data boundary**: the official precise boundary polygons, control-plan metrics, current-condition surveys, land ownership, utility lines, and heritage surveys have not been publicly obtained; anything involving FAR, height, retain/retrofit/demolish conclusions, road alignments, and investment calculations is listed as to-be-confirmed [data:geometry/constraints.geojson]. The legal listings and textual quadrilateral extents for the two core heritage-protected sites (Qinghuayuan Station site, Juesheng Temple / Dazhongsi) have been self-checked by the participant against official public sources (pending registry review) (京政发〔2025〕3号, Beijing Municipal Administration of Cultural Heritage detail pages), but official drawings have not been published with the text; the HERITAGE_PROTECTION features in constraints.geojson are marked `provisional_constraint`, not `official_constraint` [assumption:A-CONTROLS-002] [source:HERITAGE-LIST-11TH] [source:HERITAGE-QINGHUAYUAN].
3. **Factual risk**: historical facts — Zhan Tianyou's "each contributes what he has learned, each gives what he knows" inscription (1914 Hankou Alumni Association speech), the "world's first 350 km/h intelligent high-speed railway" phrasing for the Jingzhang HSR (Minister of Transport, 2025 NPC session), and the Jingzhang Railway opening anniversary (October 2, 1909 grand opening ceremony at Nankou; full-line service commenced September 24, 1909) — have been self-checked by the participant against public authoritative sources (pending registry review); see assumptions.json [source:AUTHORITY-ZHANTIANYOU] [source:AUTHORITY-MOT-HSR].
4. **Technical risk**: scenarios such as automated driving, robotics, and computing coupling are all set as speed- and zone-limited reversible trials, retaining human final decision and exit plans.
5. **Social risk**: heritage activation may bring gentrification pressure — hedged by the community-embedding plan, the honor system for in-situ residents, and public-service increases (drawing on the High Line Park lesson).
6. **Governance risk**: the risk of regulators being captured by interests — hedged by independent audit, open-source priority, a public constraint handbook, and a public rejection-certificate system.
7. **Copyright**: no unauthorized fonts, images, trademarks, or portraits are used; the embedded offline rendering font is a Noto Sans SC subset (SIL OFL 1.1, embedding permitted) [source:FONT-NOTOSANSSC-OFL]; the logo provides directional description only; the component library ships in-package under the COMMUNITY-DISPLAY-ONLY display licence [self_check:VISUAL_PACKAGING].
8. **Generation disclosure**: this proposal was re-created by an AI agent by fusing outputs from multiple agents and models, with methods and limitations disclosed per the co-creation charter. The final proposal text was fused by Kimi K3 × WorkBuddy; the formal submission package was completed by DeepSeek V4 Flash × Trae; the creation chain is in `agent.json`.

**Bottom-line checklist (applies throughout)**: do not write the provisional boundary as an official red line; do not fabricate FAR/height/density/green ratio; do not fabricate enterprises, investment amounts, or output values; do not fabricate policy commitments; do not fabricate engineering feasibility; do not write AI testing as approved operation; do not use unauthorized materials; do not use personal privacy or non-public data; do not turn AI into a surveillance city; do not use self-proclaimed titles such as "champion/best."

## References

- Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources, "Prequalification Announcement for the Centennial Jingzhang AI Innovation Belt Urban Design International Open Call" (official announcement) [source:OFFICIAL-ANNOUNCEMENT]
- The organizer's open-call taskbook for agents (agent taskbook) [source:AGENT-TASKBOOK]
- Site package brief/site-package/ (design_brief, agent_taskbook, enums, ranges, schemas, geometry/provisional_boundaries) [source:SITE-PACKAGE]
- Source register data/source_registry.json and processed fact pack data/processed/agent_fact_pack.md [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]
- Provisional coarse boundary and key areas geometry/provisional_boundaries.geojson [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]
- Professional standards: urban design management measures, control-detailed-planning depth requirements, land-use classification guide (see standard_matrix.json) [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
- Historical-fact self-check records (participant-checked, pending registry review): Zhan Tianyou's "each contributes what he has learned, each gives what he knows" inscription (1914 speech), the "world's first 350 km/h intelligent high-speed railway" phrasing for the Jingzhang HSR (Minister of Transport, 2025), and the Jingzhang Railway opening anniversary (October 2, 1909, Nankou opening ceremony) (see assumptions.json)
- Service Equivalence Baseline (SEB) v0.5.0 specification and tabletop runner, contributed by lqqk7/every-sense-jingzhang; this proposal adopts the snapshot for a tabletop self-check (participant-declared; adoption order not third-party verified); snapshot in `visual/assets/` (CC BY-SA 4.0) [source:SEB-V0.5]