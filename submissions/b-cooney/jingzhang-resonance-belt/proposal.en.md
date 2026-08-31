---
title: "Jing-Zhang Resonance Belt 京张·共鸣带"
author_github: "b-cooney"
co_authors: ["PBC"]
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A belt-wide urban design for the Centennial Jing-Zhang AI Innovation Belt whose signature public infrastructure is a city-scale generative, adaptive soundscape — always unique, relaxing, and responsive to non-personal aggregate signals. It covers all six agent tasks (agent.1–agent.6) and anchors the three key areas with three Resonance Node landmarks (Prelude / Chorus / Coda). Built on provisional geometry with precision disclaimers and a recalculation commitment; organizer data gaps do not block content scoring."
tracks: ["youth-friendly-public-space", "ai-public-services", "jingzhang-heritage-narrative"]
scenarios: ["ai-health-service-navigation", "ai-cultural-guide", "ai-traffic-walkability"]
---

# Jing-Zhang Resonance Belt 京张·共鸣带

**Authors｜b-cooney · PBC**

> One-line concept: let a living urban sound be the first thing people *hear* of the Centennial Jing-Zhang AI Innovation Belt — always unique, relaxing, adapting to crowds and time of day — turning AI from an algorithm behind a screen into a public experience everyone can feel.

## Design Basis and Source List

This formal package takes as its first authority the *Pre-qualification Announcement for the International Urban Design Solicitation of the Centennial Jing-Zhang AI Innovation Belt*, issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources, and takes the maintainer-registered provisional boundary, key areas, enums, metrics, and source list in `brief/site-package/` as its machine-readable basis [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]. Before generation we read `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/planning_limits.json`, `schemas/`, and `data/source_registry.json`, and built the task, three-level scope, source-use, and data-gap lists. Every design judgment is decomposed into a traceable source, a recomputable metric, a checkable layer, and a human-reviewable assumption. Because the announcement requires the depth of regulatory detailed planning and of a comprehensive implementation plan, prose does not replace the GeoJSON, metric tables, A3 booklet, A0 boards, or HTML exhibition [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:existing_conditions_diagnosis].

The signature content of this proposal is a **city-scale generative, adaptive soundscape system**: not background muzak, but public infrastructure designed at the same level as lighting, seating, and greenery. The soundscape continuously generates never-repeating, relaxing music at night-gathering places, transit halls, and the heritage-park slow-mobility band, adapting to **non-personal aggregate signals such as time of day, crowd density, weather, and rail arrival/departure rhythm**. It serves the announced "Urban AI Life-Experience Belt" positioning and extends the public value of AI from an efficiency narrative to **wellbeing, social encounter, and civic belonging**.

Source-registry usage boundaries [source:SOURCE-REGISTRY]:

- `data/source_registry.json` registers the usage limits of public, cleared, and provisional materials; this proposal's newly added health evidence, global cases, and generation-tool provenance are logged in this package's `sources.json`.
- The agent must not upgrade `background_only` or `provisional_only` materials into official boundaries, statutory controls, formal-scoring evidence, or government implementation commitments.
- Soundscape health-benefit evidence is used as "background and design basis" only, never as a statutory control metric; any sensing scenario follows data minimization, aggregation, and human review.

`data/processed/agent_fact_pack.md` is a reading-navigation layer, not a new authority [source:PROCESSED-FACT-PACK]; factual judgments return to registered primary materials [source:OFFICIAL-ANNOUNCEMENT], with the full source relations held in `sources.json`.

![Source evidence chain and submission package relationship](assets/figures/site-overview.png)

While the official `SITE_BOUNDARY` and the three `KEY_AREA` polygons are not public, `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` are labeled `provisional_constraint`, `official_boundary=false`, usable only for generation, self-check, visualization, and design discussion — never as an official redline, approval basis, precise-area basis, or statutory conclusion [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001]. This organizer data gap alone does not block content scoring; once official polygons are supplied, land use, roads, green space, public space, buildings, phasing, and metrics — and the soundscape node placement — are all recalculated. Boundary interpretation returns to the overall-area recomputation [metric:site_area_sqm], and key-area count is checked by an independent metric [metric:key_area_count].

## Three-Level Scope Framework

Work is organized by the announcement's three levels: the **coordinated research area** (~43.6 km²) addresses the AI industry ecosystem, strategic positioning, innovation chains, and future urban form; the **overall design area** (~11.4 km², the urban districts and industrial areas within 1–2 km of Jing-Zhang Heritage Park) requires an urban-renewal framework, industrial-space layout, transport/municipal support, and urban-character control; the **key detailed-design area** (~368.4 ha across three zones) requires clear functions, building scale, retain-renovate-demolish classification, public-space connectivity, and traffic organization [depth:three_level_scope_framework]. Each level is mapped item by item in `compliance_matrix.json`, ensuring announcement tasks 1.3, 1.4, 1.5 and agent.1–agent.6 all have chapter, layer, metric, drawing, and HTML evidence.

![Three-level scope and spatial work framework](assets/figures/land-use-structure.png)

The overall concept is the **Jing-Zhang Resonance Belt**: the Jing-Zhang Heritage Park as the historical and public-space main axis (the "resonance spine"); Zhongzhiyuan, the Beijing AI Origin Community, and Dazhongsi as the three innovation anchors; universities, enterprises, communities, and rail stations as the everyday network — forming a spatial organization of "one spine, three nodes, many scenario points, and a composite blue-green slow-mobility loop" [depth:overall_spatial_structure] [data:geometry/land_use.geojson#LU-001]. The "spine" is not a new redline but a translation of the three scope levels into a public axis that can be heard and walked; the "three nodes" are the three AI pilgrimage landmarks below; "scenario points" are operable AI+ public-service, industry-service, and city-life nodes; the "loop" is the linkage of slow mobility, greenery, public space, and event routes.

The naming system uses "Resonance" as the mother-motif, extending in three directions: acoustic (urban sound), social (people sharing space and meeting), and historical (a century of Jing-Zhang echoing into an AI future). "Belt" answers the announced "AI Innovation Belt" and carries international recognizability. The three key areas keep their official names and add movement-style sub-names to form an extensible signage and operations vocabulary: Zhongzhiyuan · **Prelude**, AI Origin Community · **Chorus**, Dazhongsi · **Coda**.

| Level | Design question | Answer | Data anchor |
| --- | --- | --- | --- |
| Coordinated research | How to organize the AI ecosystem and future urban form | A "campus origination – open-source collaboration – enterprise translation – public experience – international communication" chain, with the soundscape as the public-experience entry point | compliance_matrix.json, standard_matrix.json |
| Overall design | How to map industrial space, renewal, transport/municipal, and character | Expressed jointly by land use, buildings, roads, green space, public space, and phasing layers | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key areas | How the three zones reach detailed-design depth | Distinct positioning, spatial moves, AI scenarios, and Resonance Nodes | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

## Coordinated Research Area: Industry and Future City Research

The core task here is to build a world-class AI innovation ecosystem and answer the "three positionings, five functions, three areas and two wings" synergy [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The proposal surveys Haidian's universities and institutes, leading enterprises, compute/algorithm/data factors, incubation platforms, and technology-service resources, and proposes a spatial synergy framework for the AI innovation, industry, talent, and city-service chains. Naming and Logo direction serve the overall recognizability of the "Centennial Jing-Zhang Culture Belt, Urban AI Life-Experience Belt, AI Fusion Innovation Belt": the visual motif overlays "sound wave – rail – link" into a continuous ripple — at once a visualization of the soundscape and an abstraction of the Jing-Zhang rail trace and innovation chain — extensible to signage, lighting, public art, and event key visuals. All of the above are concept suggestions for professional teams to deepen, not statutory or trademark conclusions.

Coordinated research adds no pseudo-precise redlines; through the coordination of urban character, public space, and building layout it returns to a visible, checkable spatial structure [standard:MOHURD-URBAN-DESIGN-MEASURES] [data:geometry/public_space.geojson#PUBLIC-001] [depth:overall_spatial_structure].

**Global case studies (5–8, as design reference and background basis)** [source:CASE-STUDIES]:

| # | Case | Relevance | Lesson |
| --- | --- | --- | --- |
| C1 | Brian Eno — generative / ambient functional music (*Music for Airports*) | The "functional, non-intrusive, never-repeating" soundscape paradigm | Generate rules, not fixed tracks; serve ambience, not performance |
| C2 | Oodi Central Library, Helsinki — civic third place | The Chorus node as a youth-friendly public living room | Open, free, lingerable, collaborative publicness |
| C3 | Barcelona Superblocks | Slow-mobility-first, health-oriented street reallocation | Evaluate space change by health and encounter metrics |
| C4 | Sónar Barcelona (music + technology festival) | agent.6 annual event system and international communication | Industry–art–city event IP |
| C5 | Ars Electronica, Linz (AI art + open lab) | Developer-community operations and AI-culture narrative | Standing lab + annual festival + honor system |
| C6 | Singapore Smart Nation public services | AI+ public service and governance boundary | Lead with public service; emphasize people and trust |
| C7 | teamLab / immersive public art | Multimodal, accessible experience at the nodes | Balance interaction with accessibility and static fallback |
| C8 | Sidewalk Labs Toronto (cautionary) | Data governance and privacy lessons | Avoid surveillance disputes via minimization and human review |

Future-urban-form research answers how AI changes work, life, socializing, learning, transport, and public services: AI transport, continuous green space, innovation-service facilities, and an international live-work atmosphere are grounded as locatable districts, nodes, corridors, and scenarios rather than vague technology visions. The soundscape acts as a "perceptible public AI layer," turning abstract compute and models into a daily urban experience people can hear, linger in, and take part in. Industrial-strategy metrics, AI innovation index, talent density, and AI+ priority areas enter the metric system, distinguishing official, design-suggested, and to-be-calibrated values; all events, open scenarios, and pilgrimage routes are stated as "concept suggestions / reference schemes / material for professional deepening."

### Three Areas, Two Wings & Regional Synergy

The three areas and two wings form a synergy loop under the "Resonance Belt" framework: **Zhongzhiyuan · Prelude** carries full-stack independent innovation and standard governance; the **AI Origin Community · Chorus (合鸣·夜话)** carries near-campus translation and a youth community; **Dazhongsi · Coda** carries the intelligent-native economy and international exchange. The **Zhongguancun Technology-Service Wing** supplies IP, capital, and global factor sourcing; the **Xiaoyuehe Scenario-Empowerment Wing** delivers scenario enablement and urban vitality. Externally it coordinates with **Future Science City, Huairou Science City, the Beijing Economic-Technological Development Area, and the Jing-Jin-Ji region**, around six factor flows — talent, technology, compute, capital, scenario-validation, and international communication [source:AGENT-TASKBOOK] [depth:overall_spatial_structure] [data:geometry/public_space.geojson#PUBLIC-001]. All external collaboration is a conceptual synergy mechanism for professional deepening; unauthorized collaborations are notional, not settled arrangements.

![Three Areas, Two Wings & Regional Synergy](assets/figures/regional-synergy.png)

| Unit | Role | Main factor flows | Spatial carrier |
| --- | --- | --- | --- |
| Zhongzhiyuan · Prelude | Full-stack innovation / standards | talent, compute, standards | acceleration R&D band + Prelude node |
| AI Origin Community · Chorus | Near-campus translation / youth community | results, talent, open-source | service core + night commons |
| Dazhongsi · Coda | Intelligent-native economy / exchange | capital, content, data factors | transit commerce + Coda hall |
| Zhongguancun Tech-Service Wing | IP / capital / global sourcing | capital, IP, factors | technology-service frontage |
| Xiaoyuehe Scenario-Empowerment Wing | Scenario enablement / vitality | scenarios, compute, experience | scenario waterfront band |
| Regional synergy (Future/Huairou Science City, BDA, Jing-Jin-Ji) | Research–industry–validation–comms | tech, scenario-validation, comms | conceptual collaboration channels |

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The overall design area requires the urban-design depth of regulatory detailed planning: an overall renewal spatial structure, identification of underused space, a renewal-project list, implementation-policy proposals, and industrial-function organization and spatial modes [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout]. `geometry/land_use.geojson` fully covers the design boundary with no gaps or overlaps (coverage recomputes to ~1.0), `geometry/buildings.geojson` expresses indicative renewal/retained footprints, `geometry/roads.geojson` expresses the slow-mobility spine and stitching connectors, and `metrics.json` recomputes core areas, ratios, and layer counts [data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm].

Land-use structure is organized along the resonance spine: the mid-band is the Jing-Zhang heritage linear green spine and public-space network, and the two sides host research co-creation, community service, and smart-commerce frontages per the three-areas/two-wings layout — a section logic of "green spine at center, functions along the edge, scenarios along the spine" [depth:development_intensity_controls]. Wherever building height, development intensity, road redline, setback, or facility standards lack official controls, they are written as "pending confirmed regulatory conditions" rather than passed off as approved figures with agent-estimated values.

## Detailed Design of Key Areas

Detailed design of the three key areas is mandatory; each carries one "Resonance Node" AI pilgrimage landmark [depth:three_key_area_detailed_design] [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002]:

- **Zhongzhiyuan AI Acceleration Area · Prelude**: a garden-type full-stack independent-innovation district. Strengthen the Qinghe frontage, industry display, low-carbon exchange, and external transport; the "Prelude" node themes its soundscape on the rhythm of early-morning work, organizing standard-setting, safety evaluation, and compute experience into a visitable, bookable open display band.
- **Beijing AI Origin Community · Chorus**: a near-campus translation and youth-friendly community. Stitch campus–park–block slow mobility and add result-release, talent-service, residential, and open-source collaboration space; the "Chorus" node is a night-gathering public living room — this is where the proposal's core answer to "night-time gathering, play, and encounter" lands, with the soundscape generating relaxing music at night that encourages people to stay and talk.
- **Dazhongsi AI Industry Cluster · Coda**: an urban-type smart-economy and international-exchange district. Focus on Dazhongsi Station integration, four-quadrant pedestrian connectivity, and commercial renewal; the "Coda" node sits in the transit hall, using a calm arrival/departure soundscape to ease commuting stress and raise accessibility and a sense of safety.

![Key-area index and Resonance Node design](assets/figures/key-areas.png)

All three areas are `provisional_constraint` in `geometry/key_areas.geojson`; the prose, HTML, `sources.json`, `assumptions.json`, and `self_check.json` all state they cannot be a formal-scoring or approval basis; `compliance_matrix.json` covers announcement 1.5.3.1, 1.5.3.2, 1.5.3.3 respectively. Design expression includes functions, indicative building scale, public-space systems, traffic organization, slow-mobility connectivity, and implementation projects; the HTML can switch among the three areas, and the A3/A0 include area masterplans, Resonance Node details, and metric notes.

| Key area | Positioning | Spatial moves | AI industry & operations | Resonance Node | Evidence |
| --- | --- | --- | --- | --- | --- |
| Zhongzhiyuan AI Acceleration Area | Garden-type full-stack innovation district | Qinghe frontage, industry display, low-carbon exchange, external transport | Independent-model testing, standards workshops, safety-governance display | Prelude | [data:geometry/key_areas.geojson#PROV-KEY-001] |
| Beijing AI Origin Community | Near-campus translation & youth-friendly community | Campus–park–block slow-mobility stitching, night public living room | Open-source release, talent zone, near-campus incubation, night encounter | Chorus | [data:geometry/key_areas.geojson#PROV-KEY-002] |
| Dazhongsi AI Industry Cluster | Urban-type smart-economy district | Dazhongsi Station integration, four-quadrant pedestrian links, commercial renewal | Smart-terminal display, content consumption, data factors, international roadshow | Coda | [data:geometry/key_areas.geojson#PROV-KEY-003] |

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

The proposal builds space-demand personas for AI talent and enterprises and organizes the announcement's transport, service, consumption, healthcare, education, legal, and life-service directions into industry-development and AI-enabled city-function scenarios. Each scenario states its users, spatial location, data source, privacy boundary, human-review mechanism, and operator; any sensing scenario follows data minimization and aggregation, and the soundscape reads only **non-personal aggregate environmental signals** (time band, weather, aggregate crowd density, rail rhythm), never personal identity or behavioral trajectory [data:geometry/public_space.geojson#PUBLIC-001] [metric:public_space_ratio] [metric:green_ratio].

The soundscape design rests on peer-reviewed health evidence but uses a strictly defensible framing: **research suggests that thoughtfully designed soundscapes can support psychological restoration, reduce perceived stress and negative affect, influence physiological stress recovery, and improve people's experience of public environments**; the evidence is strongest for stress, mood, restoration, and environmental experience rather than long-term clinical outcomes, so the proposal makes no clinical "music improves health" claim [source:HEALTH-EVIDENCE]. Accordingly, the three Resonance Nodes and the "Chorus" night commons adopt five soundscape design criteria — naturalness, sound-level control, source legibility, subjective soundscape assessment, and "sensescape coherence" (the HeReS framework) — operated with aggregate, human-reviewable signals; wellbeing benefits are treated as a design goal and post-evaluation metric (e.g., night-lingering duration, self-reported stress), never as a statutory control.

The generative sound engine follows the ISO 12913 soundscape framework and organizes sound by environmental **state**, not tracks: functional states (RESTORE / FOCUS / SOCIAL / VITALIZE / BUFFER / TRANSITION / NIGHT) expressed as continuous parameter vectors (arousal, density, brightness, pulse, novelty, …). A SENSE → INTERPRET → TARGET → COMPOSE → RENDER → LISTEN → ADAPT loop adapts slowly to time of day, aggregate crowd density, ambient sound level, and rail rhythm; recent-history suppression guarantees no audible repetition (randomness makes variation, **memory makes non-repetition**, constraints make identity). The three Resonance Nodes share one "sonic grammar" but weight the states differently for Prelude / Chorus / Coda. All state→feeling mappings are treated as site-validated design hypotheses, and the acoustic environment must respect zone level ceilings and night-time quiet requirements [source:SOUND-FRAMEWORK].

**Personas (≥5)**:

| Persona | Typical need | Spatial response | Self-check boundary |
| --- | --- | --- | --- |
| Night-gathering youth & residents | Relaxation, encounter, low-stress lingering, safety | Chorus living room, heritage-park slow band, tiered night lighting and calming soundscape | Only aggregate crowd & time drive the soundscape; no personal profiling or commercial recommendation |
| Open-source developers | Release, collaboration, testing, community reputation | Origin-community release hall, public code wall, contribution echo wall | Activity data aggregated only; no behavioral tracking |
| Startups | Low-cost office, compute access, test ground | Zhongzhiyuan shared test ground, edge-compute station, standards/governance advisory | Compute & data services require separate authorization |
| Commuters & visitors | Transfer, wayfinding, stress relief, accessibility | Coda hall calming soundscape, four-quadrant links, AI slow-mobility navigation | Navigation is explainable and low-intrusion; no personal tracking |
| Residents, faculty & students | Commute, leisure, community service, daily slow mobility | Campus–park slow-mobility stitching, embedded community service, soundscape park | Campus & resident data require authorization; not for commercial recommendation |

**AI scenario cards (≥10, including ≥3 industry test/validation scenarios, marked ★)**:

| Scenario card | Spatial carrier | Description |
| --- | --- | --- |
| 01 Chorus community resonance living room | AI Origin Community (Chorus) | Generates relaxing, never-repeating soundscape at night to encourage lingering and conversation; adapts to aggregate crowd & time |
| 02 Coda transit calming soundscape | Dazhongsi Station (Coda) | Adjusts to rail rhythm; eases commuting stress and raises safety and accessibility |
| 03 Prelude work-rhythm soundscape | Zhongzhiyuan (Prelude) | Low-intensity morning rhythm for focus and low-carbon exchange |
| 04 ★ Independent-model test & red-team sandbox | Zhongzhiyuan | Turns model evaluation, safety red-teaming, and standard-setting into a visitable, bookable, supervisable validation scenario |
| 05 ★ Edge-compute & low-carbon energy station | Overall-area node | New-infrastructure prototype validating edge inference and distributed-energy coordination (to deepen) |
| 06 ★ Data-factor compliance parlor | Dazhongsi | Validates the city-service interface for data factors and digital assets under authorization and auditability |
| 07 Open-source release hall & contribution echo wall | AI Origin Community | Result release, code-contribution display, and small roadshows; contributor names accrue as an "echo wall" honor |
| 08 AI slow-mobility & accessible navigation | Heritage-park band | Explainable signage + low-intrusion sensing to find slow-mobility gaps, congestion, and accessibility needs |
| 09 AI health-service navigation | Community & hub | Combines soundscape relaxation with navigation to nearby health and life services (maps to ai-health-service-navigation) |
| 10 Jing-Zhang AI cultural guide | Heritage park & stations | Narrates the Jing-Zhang railway and the new AI-culture story (maps to ai-cultural-guide) |
| 11 Generative-soundscape open-API day | Belt public space | Developers contribute compliant generation rules for different nodes, published after human review |
| 12 Global AI Week experience route | Belt public-space system | A walkable route from heritage culture and open-source community through industry display to international roadshow |

AI-governance proposals follow data minimization, public sources, explainability, and human review: civic agents may help identify slow-mobility gaps, public-space heat, facility maintenance, and event-safety risk, but never replace planning approval, output unauthorized personal profiles, or claim official implementation commitments. All AI scenario nodes enter structured layers or the compliance matrix so reviewers can see their relationship to industry, space, and the public interest [data:geometry/roads.geojson#ROAD-001] [data:geometry/green_space.geojson#GREEN-001].

**Accessibility & inclusion**: the three Resonance Nodes and soundscape public spaces provide **quiet / low-stimulation windows and silent zones**, giving hearing-sensitive and neurodiverse people a low-arousal environment they can opt out of at any time; hearing-impaired visitors get **visual and tactile alternatives** (light rhythm, haptic seating, captioned signage); older adults and children get **clear, slowed, predictable** soundscapes and nearby rest; every AI navigation/service keeps a **traditional human and in-person channel** and is never the only entry point. Accessibility standards and field testing must be validated with professional teams and users in the deepening phase; machine checks do not certify accessibility compliance [source:HEALTH-EVIDENCE] [data:geometry/public_space.geojson#PUBLIC-001].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land use is expressed under the territorial-space use-control classification, forming a complete, closed, seamless partition [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001]. Buildings distinguish retain, renovate, renew, new-build, or to-be-confirmed objects, with an advisory hierarchy for footprint, function, scale, and character [depth:height_massing_character] [depth:retain_renovate_demolish] [data:geometry/buildings.geojson#BLDG-001]. Where existing-building, tenure, regulatory, or engineering conditions are missing, the proposal offers only methods and a to-be-calibrated list, never fabricated retain-renovate-demolish conclusions.

Building-scale and intensity metrics are consistent with `metrics.json` and the layers, with building-design depth referencing the architectural design-document depth requirements [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [metric:building_footprint_area_sqm]. Total building scale, FAR, height, density, green ratio, setbacks, and control lines use `status=unknown` where official conditions are absent, with `reason`/`assumptions` stating the pending conditions and the recomputation path once official data arrives — never fixed numbers to manufacture false precision. The soundscape's physical carriers (light-pole speaker arrays, seating, pergolas) are light public facilities included in renewal projects, changing no tenured building and involving no structural or fire-safety approval conclusions.

## Transport, Rail, Municipal Infrastructure, and Public Services

Transport answers the announcement's requirements on station integration, road micro-circulation, slow-mobility gaps, external transport, parking, and green transport, focusing on the North 5th Ring, the heritage-park ring-road crossing nodes, Wudaokou, Qinghua East Road West Entrance, Dazhongsi Station, and key-enterprise surroundings [depth:traffic_rail_slow_parking] [data:geometry/roads.geojson#ROAD-001]. Road and slow-mobility layers stay within the submitted boundary and cross-check with public space, greenery, industry nodes, and key areas; while the boundary is provisional, transport conclusions are provisional design discussion only. The Coda transit hall's calming soundscape is a "transport–health" cross scenario, easing commuting stress with non-personal signals and improving the station-city walking experience.

Municipal and public-service facilities cover AI industry-service facilities, innovation-service platforms, talent life services, new infrastructure, distributed energy, and edge-compute fusion [depth:municipal_new_infrastructure] [data:geometry/constraints.geojson#CON-001]. The proposal states facility standards, spatial layout, service radius, operating mode, and phasing; where pipeline, energy, drainage, flood-control, and fire data are missing, they are listed as prerequisites for formal deepening.

![Mobility and blue-green public-space composite system](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

The blue-green network uses the Jing-Zhang Heritage Park vitality band as skeleton (the resonance spine), coordinating Qinghe, Xiaoyuehe, and surrounding campus/enterprise/community travel to propose a north-south through, east-west connected system of paths, cycleways, and green space; the design-model green ratio is ~0.25 and public-space ratio ~0.05, both recomputable provisional design-model outputs [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]. The proposal identifies slow-mobility gaps, ring-road crossing nodes, and park end landmarks, and treats the three Resonance Nodes as anchors of the public-space network. Full recomputation of green and public-space ratios is held in `metrics.json` [metric:green_ratio] [metric:public_space_ratio].

Urban character fuses Jing-Zhang railway history, Zhongguancun innovation culture, and AI innovation culture, drawing on cultural resources such as Qinghuayuan Railway Station, and proposes city tone, building character, frontage, and public-art guidance [standard:MOHURD-URBAN-DESIGN-MEASURES]. Signage, cultural symbols, and AI pilgrimage landmarks (Resonance Nodes, contribution echo wall, honor-display system) form an extensible cultural-identity system, tiered and distinguished from the belt-wide Logo system; all brands, fonts, images, portraits, and enterprise marks require cleared sources, and character control gives no pseudo-precise control lines without heritage or regulatory basis.

## Renewal Projects, Implementation Policy, and Phasing

Implementation forms an auditable renewal-project list stating location, type, function, responsible actor, dependencies, stage, risk, and evaluation metrics [depth:renewal_project_list] [depth:phasing_implementation] [data:geometry/phasing.geojson#PHASE-001]. `geometry/phasing.geojson` expresses near/mid/long phasing, and `compliance_matrix.json` ties each task to phase and drawing.

| ID | Project | Type | Key dependencies | Evidence |
| --- | --- | --- | --- | --- |
| JZ-01 | Heritage-park slow-mobility gap stitching (resonance spine) | Public space / transport | Road redline, under-bridge space, traffic review | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Zhongzhiyuan Qinghe innovation frontage (Prelude) | Blue-green / industry display | River blue line, ecology and flood control | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | Origin-community Chorus resonance living room | Renewal / youth public space | Tiered night lighting, event permits, sound-environment assessment | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-04 | Dazhongsi Station four-quadrant pedestrian links (Coda) | Rail integration / slow mobility | Rail station, intersections, municipal pipelines | [data:geometry/key_areas.geojson#PROV-KEY-003] |
| JZ-05 | Generative-soundscape public facilities & edge-compute nodes | New infra / public service | Sound environment, energy, compute, safety, operator | [data:geometry/constraints.geojson#CON-001] |
| JZ-06 | Global AI Week public route | Operations / brand | Public-space permits, event safety, rights clearance | [data:geometry/phasing.geojson#PHASE-001] |

Phasing distinguishes the 100-day solicitation cycle from implementation rollout: near-term launches the "Chorus" living-room pilot with light soundscape facilities, operations, and open API; mid-term stitches the slow-mobility spine and connects the Origin Community; long-term deepens Zhongzhiyuan and the governance framework. **agent.6 long-term operations**: with "Resonance Belt" as brand IP, an annual event system — the annual **Resonance Week** (open-source hackathon + generative-soundscape co-creation + international roadshow), quarterly **Soundscape Open Days**, a standing **developer community and contribution echo wall** honor mechanism, and compliant operation of the **soundscape open API** (community-contributed generation rules → human review → publish). Operations state audience, frequency, responsibility boundary, conversion path, and risk, never written as settled arrangements.

## Metrics, Area Recalculation, and Compliance Matrix

The metric system includes overall-design-area area, key-area count, green and public-space ratios, building footprint, land-use coverage, Resonance Node count, and self-check state; all `known` metrics are recomputable from GeoJSON, and `unknown` metrics give a reason and prerequisites [depth:metrics_recalculation] [metric:site_area_sqm] [data:geometry/green_space.geojson#GREEN-001]. The results of `scripts/spatial_review.py` and `scripts/visual_review.py` are important formal-self-check evidence (this package's spatial review is PASS, retaining only provisional notices).

![Core-metric recomputation and evidence chain](assets/figures/metrics-evidence.png)

The compliance matrix is the master file of task responsiveness: each announcement and taskbook task maps to a report section, layer, metric, drawing, HTML page, source, assumption, and self-check item; a proposal not covering any mandatory task of announcement 1.3, 1.4, 1.5 or agent.1–agent.6 must not enter formal professional scoring. In deepening, metrics split into three classes entering `metrics.json`, `assumptions.json`, and `compliance_matrix.json`: spatial metrics recomputable from geometry, control metrics needing official regulatory support, and performance metrics needing operational calibration (such as soundscape use frequency, night-lingering duration, slow-mobility accessibility, and event participation).

## Risk, Copyright, and Compliance

**Bilingual is required.** The primary file is Chinese, with `proposal.en.md` providing the full parallel translation; the A3/A0, report HTML, visual HTML, and text-bearing figures all provide `.en` counterparts, preferring the recommended translations in `docs/terminology-glossary.md`. HTML pages load no remote scripts, remote map tiles, remote fonts, iframes, forms, or external APIs and do not track reviewers; audio and 3D interaction are bundled locally, never autoplay, and provide captions/text and static fallback.

Risk and missing-data lists are cross-checked by the risk depth item, constraint layer, and site package [depth:risk_missing_data] [data:geometry/constraints.geojson#CON-001] [source:SITE-PACKAGE]. Gaps in official boundary, key area, regulatory controls, roads, parcels, buildings, municipal, heritage, and public service all enter `assumptions.json`, self-check, and this risk section; any conclusion lacking official regulatory, road-redline, tenure, municipal, fire, or heritage conditions is downgraded to a pending item. Soundscape compliance essentials: use only non-personal aggregate signals; never autoplay and use tiered volume; respect the acoustic environment and quiet requirements at night; produce all music by declared generation tools with recorded provenance and rights boundaries; and require human review of community-contributed rules.

This proposal claims no official approval, approved regulatory plan, final land tenure, final construction scale, or guaranteed implementation; all spatial suggestions are "concept suggestions / reference schemes / material for professional deepening." The AI agent is responsible for facts, sources, copyright, spatial data, metrics, and expression; maintainers and professional reviewers may require revision or rejection based on self-check, spatial review, and the compliance matrix.

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/ranges/planning_limits.json
- brief/site-package/agent_taskbook.json
- data/processed/agent_fact_pack.md
- Full machine index: see `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, and `design_depth_matrix.json`
- This bibliography entry follows the site package and this package's `sources.json`; full provenance and licenses are in the structured source list [source:SITE-PACKAGE] [source:CASE-STUDIES]
