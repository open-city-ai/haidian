---
title: "THE JINGZHANG SIGNAL: From Intelligent Train Control to a Three-Light City of Trustworthy AI"
author_github: "xiaopi668"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Using the century-long signal history of the Jing-Zhang Railway as a prototype — from the manual flag signals of the Zhan Tianyou era in 1909 to the autonomous train control of the world's first 350 km/h intelligent high-speed railway in 2019 — this proposal introduces a Three-Light Governance Protocol: every AI scenario on the innovation belt declares its own Green (autonomous), Amber (human review required), and Red (prohibited) state, forming a one-spine, three-station, five-line structure for a trustworthy AI city."
tracks: ["jingzhang-heritage-narrative", "civic-agent-governance", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "enterprise-service-copilot", "ai-health-service-navigation", "robot-delivery-low-speed", "public-safety-operations-review"]
iteration: "v1.0"
---

# THE JINGZHANG SIGNAL: From Intelligent Train Control to a Three-Light City of Trustworthy AI

> **SIGNAL.** The Jing-Zhang Railway has used signals to keep trains safe for more than a century: flags, semaphores, coloured lights, train control, and finally the autonomous train control that powered the world's first 350 km/h intelligent high-speed railway in 2019. This proposal translates "signals" into the governance language of the AI innovation belt — **every AI scenario shows its Red-Yellow-Green lights**: Green runs autonomously, Amber requires human review, Red is prohibited and exits. Signals do not restrict innovation; they make innovation trustworthy, take-over-able, and memorable.

## Executive Summary

The Jing-Zhang Railway was the first trunk line in China to be independently surveyed, designed, and built, opening in 1909; its famous "zigzag" (switchback) alignment remains an engineering classic. In 2019 the Jing-Zhang High-Speed Railway opened as the world's first 350 km/h intelligent high-speed railway with autonomous driving capability, where train control (CTCS) and intelligent dispatching evolved "signals" from manual flags into machine-readable, self-deciding protocols [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. This century-long signal evolution is the belt's most distinctive narrative resource and governance metaphor.

This proposal introduces the "**Three-Light Governance Protocol**" as the belt-wide master concept: AI urban scenarios are classified by risk and reviewability into three signal states — **Green** scenarios run autonomously within bounded space and data limits; **Amber** scenarios must keep a human review loop and the right to stop; **Red** scenarios (privacy intrusion, excessive surveillance, no human review possible) are prohibited outright or physically exited [standard:GENERATIVE-AI-INTERIM-MEASURES] [standard:BARRIER-FREE-ENVIRONMENT-LAW]. The three lights are not an approval form but a visible rule written into urban space: signal lights, signal stations, and signal loops let citizens see the governance mechanism, developers call it, and managers take it over.

The spatial implementation is a "**one spine, three stations, five lines**" structure [data:geometry/roads.geojson#RD-001] [metric:signal_node_count]:

- **One spine**: the Jing-Zhang Heritage Park slow-traffic signal spine, linking roughly 9.7 km of historical alignment and serving as the continuous carrier of cultural narrative and public life [data:geometry/constraints.geojson#CX-001] [data:geometry/green_space.geojson#GR-001].
- **Three stations**: the southern **Dazhongsi Scenario Application Station** (native-AI new businesses and experiences), the central **AI Origin Open-Source Exchange Station** (innovation ecosystem and talent community), and the northern **Zhongzhiyuan Full-Stack Test Station** (full-stack autonomous innovation and testing), corresponding to the three key areas and the five functions [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003].
- **Five lines**: four east-west weaving lines (North 3rd Ring, Zhichun Road, Chengfu Road, North 5th Ring) plus the Xueyuan Road technology-service axis, forming synergy loops with the Zhongguancun Technology-Service Wing and the Xiaoyuehe Scenario-Empowerment Wing [data:geometry/roads.geojson#RD-003] [data:geometry/roads.geojson#RD-004] [metric:road_network_length_m].

The proposal delivers 12 AI scenario cards (3 of which are industry test-and-validation scenarios), 5 user personas, 6 global AI ecosystem cases, and 3 AI pilgrimage landmarks, together with a "signal vocabulary" naming system and logo direction [metric:scenario_card_count] [metric:test_scenario_count] [metric:persona_count] [metric:ai_landmark_count]. All spatial proposals are conceptual suggestions for professional teams to deepen; they do not replace statutory planning and do not constitute government-approved conclusions [assumption:A-CONTROLS-001].

![Master concept: one spine, three stations, five lines and the Three-Light Governance Protocol](assets/figures/site-overview.png)

## Design Basis and Source List

The proposal builds judgments on four layers of evidence. The first layer is the call for proposals and the agent taskbook, defining the three scopes, three key areas, three positionings, five functions, three-areas-two-wings layout, and six tasks [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The second layer is public facts on railway heritage, park construction, and the AI industry published by Beijing and Haidian authorities, used to establish "what exists and why renewal is needed." The third layer is the repository site package and source registry: 7 formal-ready sources, 1 background source, and 1 provisional-only source; this proposal uses formal-ready sources only for formal judgments and labels the use boundary of everything else [source:SOURCE-REGISTRY]. The fourth layer is international cases and governance frameworks, from which only transferable mechanisms are taken; foreign institutional values are not transplanted [source:PROCESSED-FACT-PACK].

Data use boundaries:

| Source status | This proposal may | This proposal never | Evidence that triggers next version |
|---|---|---|---|
| Existing official public information | Judge the open sections of the corridor, railway heritage, renewal direction, and industrial background | Infer all current conditions, ownership, investment, or approvals | Official supplements and project files |
| Provisional scope and GeoJSON | Topological checks, conceptual zoning, area recalculation, and graphic relations | Official red lines, demolition, or engineering alignments | Official polygons and survey results |
| Conceptual buildings and components | Express preservation-first, public ground floors, reversible plug-ins | Building census, storey counts, heights, or demolition quantities | Building, ownership, structure, fire, heritage surveys |
| Scenario protocols and synthetic simulations | Check fields, failure paths, stop and recovery logic | On-site performance, public acceptance, or operation authorization | Named entities, permits, budgets, baselines |

Key areas are recalculated in EPSG:4548 from package geometry: the overall design area is about 11.41 km², consistent with the announced 11.4 km²; the three key areas recalculate to 192.9 ha, 104.3 ha, and 72.0 ha, matching the announced 192.1 ha, 104.3 ha, and 72.0 ha [metric:site_area_sqm] [metric:zhongzhiyuan_area_sqm] [metric:ai_origin_community_area_sqm] [metric:dazhongsi_area_sqm]. All geometry must be recalculated when official boundaries are released; every layer is labelled `provisional_constraint` [data:geometry/site_boundary.geojson#SITE-001].

![Land-use structure and the functional layout of the three stations](assets/figures/land-use-structure.png)

## Three-Level Scope Framework

**Coordinated Research Area** (about 43.6 km², bounded by the North 5th Ring to the north, Jingzang Expressway to the east, Xizhimen Outer Street to the south, and Wanquanhe Road to the west) carries industry strategy and regional synergy research: between the Jing-Zhang belt and the Zhongguancun Science City, Future Science City, Huairou Science City, and Beijing Economic-Technological Development Area, a "signal-interoperable" innovation synergy loop is established, focusing on how to organize the full-stack autonomous innovation system and the global innovation ecosystem [source:OFFICIAL-ANNOUNCEMENT]. This layer mainly produces an industry map, case comparisons, and functional zoning rather than parcel-level controls [depth:three_level_scope_framework].

**Overall Design Area** (about 11.41 km²) carries regulatory-plan-depth urban renewal design: the "one spine, three stations, five lines" structure is implemented, the four-way land ratio (research, commercial, green, community) is set, and the overall retain-renovate-new logic plus a renewal project list is proposed [depth:overall_spatial_structure] [depth:land_use_layout] [metric:research_land_ratio] [metric:commercial_land_ratio]. Because statutory controls such as FAR, building height, and density are missing, this layer provides only conceptual massing and functional ratios; all control metrics are recorded as `status=unknown` with a recalculation path [assumption:A-CONTROLS-001] [metric:floor_area_ratio].

**Key Detailed Design Area** (about 368.4 ha) carries planning-implementation-scheme depth: for Zhongzhiyuan, the AI Origin Community, and Dazhongsi, each gets a readable mini-scheme of "positioning + spatial structure + building renewal + traffic and slow mobility + public space + AI scenarios + implementation risks" [depth:three_key_area_detailed_design]. The three key-area polygons are provisional organizer boundaries, so the conclusions are directional only [data:geometry/key_areas.geojson#PROV-KEY-001].

## Coordinated Research Area: Industry and Future City Research

### Naming and Visual Identity Direction

The master name is "**京张信号**" (Jing-Zhang Signal), English name "**THE JINGZHANG SIGNAL**", short form "**JZ-SIGNAL**", tagline "One Hundred Years of Signals, Trustworthy AI". The naming system expands in railway signal vocabulary: the three stations are "Signal Station · Dazhongsi/Origin/Zhongzhiyuan"; the weaving lines are "Link Line · North 3rd Ring / Zhichun Road / Chengfu Road / North 5th Ring"; nodes are "Signal Light · number"; cultural landmarks are "Signal Tower", forming an extensible, enumerable, communicable system [depth:overall_spatial_structure].

Logo direction: a basic form of "three-colour signal lights + railway sleepers + zigzag pattern". Three coloured dots (red-yellow-green) are arranged along an abstract line of the Jing-Zhang "zigzag" alignment; the colours derive from railway colour-light signalling, the rail line derives from the historical alignment, and the mark extends across dark/light backgrounds, monochrome/colour, and static/motion states. This is a conceptual direction; the final logo requires professional visual design and font/graphic rights clearance [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Three Positionings, Five Functions, and Three Areas Two Wings

The three positionings — Centennial Jing-Zhang Cultural Belt, Metropolitan AI Life Experience Belt, and AI Integration Innovation Belt — correspond respectively to the spine's cultural narrative, the perceptible governance of the Three-Light Protocol, and the industry loop of three stations and five lines [source:OFFICIAL-ANNOUNCEMENT]. The five functions (full-stack autonomous innovation system, world-class AI innovation ecosystem, new AI+ scenario-empowerment paradigm, intelligent vital AI city, global voice in AI governance) anchor respectively to Zhongzhiyuan, AI Origin, Dazhongsi, and the two wings' concrete spaces and mechanisms [source:AGENT-TASKBOOK].

Three-areas-two-wings synergy loop: Zhongzhiyuan (full-stack autonomy + governance voice) produces verifiable technologies and standards → AI Origin (world-class ecosystem) open-sources, talents, and communities them → Dazhongsi (native-AI new businesses) scenarios and commercializes them → the Zhongguancun Technology-Service Wing feeds capital, IP, and global factor allocation back to the three stations → the Xiaoyuehe Scenario-Empowerment Wing opens urban life scenarios as test and experience fields, forming a "verify—open-source—apply—empower" loop [depth:overall_spatial_structure] [depth:renewal_project_list].

### Global AI Innovation Ecosystem Cases (6 transferable mechanisms)

| Case | Transferable mechanism | Jing-Zhang translation |
|---|---|---|
| Punggol Digital District, Singapore | Open platform, industry-academia-city mix, built-in test environment | Zhongzhiyuan test loop and mixed-use three stations [source:CASE-PUNGGOL] |
| Seoul Digital Media City (DMC) | Media content cluster + public display interface | Dazhongsi scenario station and Three-Light Plaza [source:CASE-SEOUL-DMC] |
| Boston Seaport Innovation District | Incremental renewal, public-space-first attraction order | Activate and weave first, then upgrade the core [source:CASE-BOSTON-SEAPORT] |
| King's Cross, London | Transit-hub renewal, knowledge-institution anchoring | Zhichun/Chengfu weaving lines and university anchors [source:CASE-KINGS-CROSS] |
| Kalasatama Smart District, Helsinki | Open data, citizen co-creation, phased scenario launch | Open Three-Light Protocol, phased scenario cards [source:CASE-HELSINKI-KALASATAMA] |
| Shenzhen Bay Science and Technology Park | Industry-service complex, full-lifecycle enterprise service | Enterprise service network of the Zhongguancun wing [source:CASE-SHENZHEN-BAY] |

The six cases contribute mechanisms only; foreign institutions, investments, and values are not transplanted [depth:metrics_recalculation].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Spatial Structure and Functional Layout

The "one spine, three stations, five lines" is implemented in the overall design area as: research land about 38.3%, commercial-services land about 20.8%, park green land about 23.0%, and community plus road corridor about 17.9% [metric:research_land_ratio] [metric:commercial_land_ratio] [metric:park_land_ratio] [data:geometry/land_use.geojson#LU-009]. The northern section takes Zhongzhiyuan's R&D-test-pilot-conversion axis; the central section centres on the AI Origin open-source community and the heritage park vitality belt; the southern section forms the Dazhongsi native-AI commercial and experience interface [data:geometry/land_use.geojson#LU-001].

### Urban Renewal Overall Framework

Renewal follows three principles — "**preserve first, public ground floor, reversible plug-in**": railway heritage, historic station buildings, mature communities, and university facilities are all preserved; public ground floors along the signal spine host innovation services and community functions; new massing uses reversible plug-ins to avoid one-off large-scale demolition [depth:retain_renovate_demolish] [depth:height_massing_character]. Because building census, ownership, fire, and heritage data are missing, no specific retain/renovate/demolish conclusions are given; only classification logic and conceptual massing are provided [assumption:A-CONTROLS-001].

### Renewal Project List and Indicator Framework

Nine conceptual renewal projects are proposed, three per phase (near/mid/far) — see the "Renewal Projects, Implementation Policy, and Phasing" chapter [metric:renewal_project_count]. Building scale and development intensity remain `unknown` until statutory controls are available, then recalculated from `geometry/*.geojson` [metric:building_footprint_area_sqm] [metric:floor_area_ratio].

## Detailed Design of Key Areas

### Dazhongsi AI Industry Cluster — Scenario Application Station (about 72.0 ha)

Positioning: gateway of "native-AI new businesses and experiences" [data:geometry/key_areas.geojson#PROV-KEY-003]. Spatial structure is "one station, two wings": the Juesheng Temple (Dazhongsi) heritage scope is the cultural anchor [data:geometry/constraints.geojson#CX-004]; along the North 3rd Ring weaving line a native-AI commercial interface is organized; to the north, AI innovation-service and research-mixed land extends [data:geometry/land_use.geojson#LU-002]. Core scenarios are AI+consumer experience, AI+health-service navigation, and AI+legal consultation as amber-review services, with the "Three-Light Plaza" as the governance-display and public-activity interface [data:geometry/public_space.geojson#PS-001] [depth:three_key_area_detailed_design].

### Beijing AI Origin Community — Open-Source Exchange Station (about 104.3 ha)

Positioning: talent and community hub of the "world-class AI innovation ecosystem" [data:geometry/key_areas.geojson#PROV-KEY-002]. Spatial structure is "research west, living east": the west concentrates open-source innovation land and the innovation tower [data:geometry/land_use.geojson#LU-005]; the east is youth-living and community-service land [data:geometry/land_use.geojson#LU-006]; the central Open-Source Plaza hosts developer gatherings, hackathons, and honour displays [data:geometry/public_space.geojson#PS-002]. The core mechanism is the Open-Source Exchange: code-hosting mirror, data sandbox, compute voucher, and developer station in one, serving AI talent and startups [depth:three_key_area_detailed_design].

### Zhongzhiyuan AI Autonomous Innovation Acceleration Area — Full-Stack Test Station (about 192.9 ha)

Positioning: validation field of the "AI full-stack autonomous innovation system and governance voice" [data:geometry/key_areas.geojson#PROV-KEY-001]. Spatial structure is "test west, convert east": the west full-stack innovation acceleration land embeds test loops for low-speed autonomous driving, robot delivery, and embodied AI [data:geometry/land_use.geojson#LU-009]; the east pilot-conversion commercial land links industrialization [data:geometry/land_use.geojson#LU-010]; the Test & Validation Plaza carries industry testing and display [data:geometry/public_space.geojson#PS-003]. This is the only key area hosting "red-light exit drills"; test scenarios must include physically interruptible stop mechanisms [depth:three_key_area_detailed_design] [depth:traffic_rail_slow_parking].

![Index and design tasks of the three key areas](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### User Personas (5)

| Persona | Profile | Core needs | Corresponding space |
|---|---|---|---|
| P1 Young AI founder/developer | 18-35, startup teams | Compute, data, incubation, gatherings | AI Origin Open-Source Plaza, Zhongzhiyuan test loop |
| P2 Researcher/university staff | University and institute researchers | Open-source collaboration, test conditions, international exchange | Xueyuan Road education-research land |
| P3 Community resident (incl. elderly) | Surrounding residents | Barrier-free service, human alternatives, daily convenience | Community-service land, spine greenway |
| P4 International visitor/attendee | Global developers and conference guests | Multilingual guides, cultural experience, convenient transit | Three-Light Plaza, Signal Museum |
| P5 City manager/operator | Government and operation teams | Reviewable dashboards, human takeover, risk handling | Three-Light Governance Dashboard, Test Plaza |

[metric:persona_count] [source:AGENT-TASKBOOK]

### AI Scenario Cards (12)

**Industry test-and-validation scenarios (3)**:

1. **SC-01 Zhongzhiyuan low-speed autonomous shuttle test loop** — test low-speed shuttles in enclosed and semi-open sections, with physical interruption and remote takeover; licensed test entities only, in limited windows [depth:traffic_rail_slow_parking] [data:geometry/public_space.geojson#PS-003].
2. **SC-02 Robot delivery and inspection coordinated test** — test delivery and inspection robots along the signal spine; amber state reviewed by operators; restricted and privacy zones are red-line prohibited [data:geometry/roads.geojson#RD-001].
3. **SC-03 City-scale adaptive signal and three-light linked test** — test AI signal-timing optimization at North 3rd Ring / Zhichun Road nodes; output takes effect only after traffic-authority review; manual signal priority is preserved [data:geometry/roads.geojson#RD-002] [data:geometry/roads.geojson#RD-003].

**Life and industry scenarios (9)**:

4. **SC-04 Centennial Signal Journey AI cultural guide** — narrate the history from 1909 manual signals to 2019 intelligent train control along the spine; amber scenario keeps human-guide backup [data:geometry/constraints.geojson#CX-001].
5. **SC-05 Barrier-free AI navigation with human alternative** — voice navigation for elderly/disabled users; purely automated channels without human backup are red-line prohibited [standard:BARRIER-FREE-ENVIRONMENT-LAW].
6. **SC-06 Open-Source Exchange and developer station** — code hosting, data sandbox, compute-voucher services with a human operations team as fallback [data:geometry/public_space.geojson#PS-002].
7. **SC-07 AI+health service navigation** — intelligent navigation of medical services in Dazhongsi; appointments and diagnostic conclusions must be human-reviewed (amber) [data:geometry/land_use.geojson#LU-002].
8. **SC-08 AI+legal consultation** — compliance Q&A for startup teams with a human-lawyer review channel (amber).
9. **SC-09 Youth startup incubation assistant** — business-plan, policy-matching, and financing-path suggestions; content involving funding commitments is red-line prohibited from auto-generation [standard:GENERATIVE-AI-INTERIM-MEASURES].
10. **SC-10 Multilingual international visitor assistant** — guides and translation for global developer-conference guests; collecting identity and itinerary data is red-line prohibited.
11. **SC-11 Public-space event recommendation and soundscape management** — event info along the spine; volume and hours are human-reviewed (amber).
12. **SC-12 Three-Light Governance Dashboard** — manager-facing overview of AI scenario states: full audit trail of red-list scenarios, amber review records, and green metrics, open to audit and public inspection [depth:civic_agent_governance].

[metric:scenario_card_count] [metric:test_scenario_count] [metric:three_light_protocol_scenarios]

### Scenario-Space-Operation Mapping and Privacy Boundaries

Each card binds a spatial layer, target users, operating data, privacy boundary, human review, operating entity, and risk level. General privacy boundary: no personally identifiable data collection, no continuous facial recognition in public spaces, and no automated decisions where no human backup exists; all red determinations are published on the Three-Light Governance Dashboard and subject to objection and appeal [standard:GENERATIVE-AI-INTERIM-MEASURES] [depth:risk_missing_data].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The land-use structure follows the "three stations, five lines" skeleton: research land 38.3% (mainly Zhongzhiyuan and AI Origin), commercial-services land 20.8% (mainly Dazhongsi and the conversion belt), park green land 23.0% (three green wedges of the spine), community services and road corridor 17.9% [metric:research_land_ratio] [metric:commercial_land_ratio] [metric:park_land_ratio] [data:geometry/land_use.geojson#LU-007]. All land-use polygons cover the overall design area seamlessly, without gaps or overlaps [data:geometry/land_use.geojson].

Building scale: only six conceptual massing anchors are provided, with a total footprint of about 882,000 m², all labelled "conceptual massing" [metric:building_footprint_area_sqm] [metric:building_count]. FAR, building height, and density are recorded as `unknown` because official regulatory conditions are missing; they are explicitly not statutory control values [metric:floor_area_ratio] [metric:building_height_m] [metric:building_density]. Retain-renovate-demolish is limited to classification logic (preserve heritage and mature communities, renovate public ground floors, add conceptual massing, no demolition conclusions) pending census and ownership data [depth:retain_renovate_demolish] [assumption:A-CONTROLS-001].

## Transport, Rail, Municipal Infrastructure, and Public Services

**Slow mobility and the signal spine**: the Jing-Zhang Heritage Park slow-traffic signal spine spans about 9.7 km; together with the Xiaoyuehe wing greenway, about 19.4 km of greenway [metric:greenway_length_m] [data:geometry/roads.geojson#RD-007]. **Road weaving**: four east-west lines (North 3rd Ring, Zhichun, Chengfu, North 5th Ring) connect east and west, feeding Line 13's Zhichunlu and Dazhongsi stations [data:geometry/roads.geojson#RD-008] [data:geometry/roads.geojson#RD-009]. **Rail integration**: weaving-node plazas double as station slow-mobility connectors and public-activity interfaces [data:geometry/public_space.geojson#PS-004]. **New infrastructure**: distributed energy, edge compute, and municipal facilities are integrated; test loops reserve power and communication redundancy [depth:municipal_new_infrastructure].

![Mobility, slow-traffic, and blue-green public-space composite system](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

**Blue-green skeleton**: the spine's three green wedges (southern buffer, central vitality belt, northern wedge) connect continuously; green and open space totals about 2.08 million m², a green ratio of about 18.3% [metric:green_space_area_sqm] [metric:green_ratio] [data:geometry/green_space.geojson#GR-001]. **Public space**: four plazas (Three-Light, Open-Source, Test & Validation, Weaving Node) total about 524,000 m², forming the public-space network [metric:public_space_area_sqm] [data:geometry/public_space.geojson#PS-001].

**AI pilgrimage landmarks (3)**:

1. **Dazhongsi Three-Light Plaza** — a three-colour signal-light public art installation and governance-rule display, symbolizing "signals make the city trustworthy" [data:geometry/public_space.geojson#PS-001] [metric:ai_landmark_count].
2. **AI Origin Open-Source Exchange** — developer gatherings, hackathons, honour displays, and an open-source achievement wall in one, becoming the "signal origin" for global developers [data:geometry/public_space.geojson#PS-002].
3. **Zhongzhiyuan Full-Stack Test Loop** — a ring space for both testing and display; the public can watch autonomous-driving tests from behind barriers and understand how AI is verified [data:geometry/public_space.geojson#PS-003].

**Urban character**: the colour palette is "rail grey, signal tri-colour, heritage red brick"; building massing and roof forms along the spine are controlled to keep view corridors of the historical alignment; the signage system uses signal vocabulary (Signal Tower, Signal Light, Link Line numbers), layered separately from the belt-wide logo system [depth:blue_green_public_space] [depth:height_massing_character].

## Renewal Projects, Implementation Policy, and Phasing

**Near term (2026-2028): weaving and activation**. Three projects: completion of the spine's southern greenway and the Three-Light Plaza, renovation of the Zhichun/North-3rd-Ring weaving nodes, and launch of the Dazhongsi native-AI commercial interface [data:geometry/phasing.geojson#PH-001] [depth:phasing_implementation]. **Mid term (2028-2031): core upgrade**. Three projects: the AI Origin Open-Source Exchange and Open-Source Plaza, the Signal Museum, and the Xueyuan Road education-research synergy upgrade [data:geometry/phasing.geojson#PH-002]. **Far term (2031-2035): northern acceleration**. Three projects: the Zhongzhiyuan full-stack test loop, the conversion belt, and the spine's northern green wedge [data:geometry/phasing.geojson#PH-003].

**Implementation policy suggestions**: "public ground floor + reversible plug-in" as the renewal permission orientation; the Three-Light Protocol as the access and exit standard for scenario opening; the Open-Source Exchange as the public sedimentation mechanism for scenario data and code [source:AGENT-TASKBOOK]. These are conceptual suggestions only, not confirmed government arrangements [assumption:A-CONTROLS-001].

**Global AI event system and long-term operations**: the annual event system includes the "Jing-Zhang Signal Festival" (spring developer conference), the "Three-Light Governance Forum" (autumn governance dialogue), the "Signal Spine Hackathon", and monthly "Open-Source Exchange Day"; the developer community operates with the Open-Source Exchange as its physical anchor; international communication uses "One Hundred Years of Signals" as the narrative line, with landmark check-ins and digital-twin guides; conversion is channelled through the Zhongguancun Technology-Service Wing [depth:renewal_project_list] [metric:renewal_project_count]. All events are conceptual suggestions; no effects are promised [source:AGENT-TASKBOOK].

## Metrics, Area Recalculation, and Compliance Matrix

Core metrics fall into four groups: **spatial** — overall design area 11.41 km², three key areas 192.9/104.3/72.0 ha, green ratio 18.3%, public-space share 4.6%, research land 38.3%, commercial land 20.8% [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio]; **network** — road network 30.5 km, greenway 19.4 km [metric:road_network_length_m] [metric:greenway_length_m]; **content** — 12 scenario cards, 3 test scenarios, 5 personas, 6 cases, 3 landmarks, 9 signal nodes, 9 renewal projects [metric:scenario_card_count] [metric:ai_ecosystem_case_count] [metric:signal_node_count]; **control** — FAR, height, and density are `unknown` pending official regulatory conditions [metric:floor_area_ratio] [metric:building_height_m].

Green-ratio rationale: 18.3% of green and open space along the spine gives AI talent a five-minute-walk environment for exchange and rest; the 4.6% public-space share corresponds to four plazas carrying scenario display and governance dialogue [depth:metrics_recalculation]. Compliance coverage is in `compliance_matrix.json` (all official 1.3/1.4/1.5 tasks and agent.1-6), `standard_matrix.json` (6 standards), and `design_depth_matrix.json` (15 design-depth items all complete) [depth:metrics_recalculation] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING].

![Core metrics recalculation and evidence chain](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

**Source compliance**: only public or rights-cleared sources are used; no unpublished maps, tables, or internal data; provisional boundaries and conceptual massing are labelled and never presented as official red lines or statutory controls [source:SOURCE-REGISTRY]. **Copyright**: all generated content (text, figures, geometry) is generated by this agent, with cited sources recorded in `sources.json`; the logo and fonts are conceptual directions requiring rights clearance before official use; see `report/copyright_statement.md`. **Privacy**: scenarios follow the minimum-data principle; red scenarios are explicitly prohibited. **Responsibility boundary**: this proposal is AI-generated conceptual advice; it is not a planning approval, government commitment, or engineering conclusion; professional teams must review and fill in regulatory, current-condition, ownership, heritage, and fire-safety data before deepening [depth:risk_missing_data] [assumption:A-CONTROLS-001].

## References

1. Haidian Branch, Beijing Municipal Commission of Planning and Natural Resources: *Call for International Urban Design Proposals for the Centennial Jing-Zhang AI Innovation Belt (Pre-qualification Announcement)* (2026-05-09).
2. *Excerpt from the Agent Open-Call Taskbook for the Centennial Jing-Zhang AI Innovation Belt Open-Source Urban Design Call* (2026-05-18).
3. Ministry of Housing and Urban-Rural Development: *Measures for the Administration of Urban Design*.
4. Ministry of Natural Resources: *Guidelines for Land Use Classification in Territorial Spatial Survey, Planning, and Use Control (Trial)*.
5. Cyberspace Administration of China et al.: *Interim Measures for the Management of Generative AI Services*.
6. Standing Committee of the National People's Congress: *Law of the People's Republic of China on Barrier-Free Environment Construction*.
7. General Office of the State Council: *Implementation Plan on Effectively Resolving Difficulties for the Elderly in Using Smart Technology* (Guobanfa [2020] No. 45).
8. Public reports on the intelligent train control and autonomous driving of the Jing-Zhang High-Speed Railway (opening 2019).
9. Public information on the Jing-Zhang Railway Heritage Park construction and Phase 1 opening.
10. Public case materials on Punggol Digital District, Seoul DMC, Boston Seaport, King's Cross London, Helsinki Kalasatama, and Shenzhen Bay Science and Technology Park.
