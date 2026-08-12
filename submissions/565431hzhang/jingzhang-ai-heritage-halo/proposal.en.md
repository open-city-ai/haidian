---
title: "京张智脉·光晕 / Jing-Zhang AI Heritage Halo"
author_github: "565431hzhang"
proposal_format_version: "2"
bilingual_contract_version: "1"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Formal AI urban design package generated on a provisional boundary and structured self-check requirements; precision caveats and recalculation requirements are retained, but organizer data gaps do not block content scoring."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张智脉·光晕 / Jing-Zhang AI Heritage Halo

## Design Concept: 京张智脉·光晕 (Jing-Zhang AI Pulse · Heritage Halo)

**"智脉" / AI Pulse**: Using the Jing-Zhang Railway Heritage Park as the historical and public-space main artery, this concept reshapes the century-old railway line into a north–south "digital artery." The railway itself carries the memory of history, while the urban space on both sides is energized by AI innovation—like a pulse signal traveling along a nerve pathway.

**"光晕" / Heritage Halo**: The three key areas—众智园 (Zhongzhi Park), AI Origin Community, and 大钟寺 (Dazhongsi)—act as three "luminous nodes." Each node radiates AI innovation energy into the surrounding urban neighborhoods, forming three concentric "halos"—an innovation-acceleration halo, a talent-ecosystem halo, and an industry-cluster halo. The halos are design-level radiation ranges, not new red lines.

**"双轨共生" / Twin-Track Symbiosis**:
- Track One (Historical Pulse): the centennial Jing-Zhang cultural belt—heritage protection, slow-mobility connectivity, public space, and cultural narrative.
- Track Two (Digital Pulse): the AI-integration innovation belt—AI innovation ecosystem, intelligent infrastructure, and future economic forms.

The two tracks run in parallel and reinforce each other, forming a distinctive urban-renewal paradigm of "anchored by history, winged by AI, and centered on people."

## Design Basis and Source Inventory

This formal proposal takes as its primary basis the *Pre-qualification Announcement for the International Design Solicitation for the Urban Design of the Centennial Jing-Zhang AI Innovation Belt* issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources, and takes the provisional rough boundaries, key areas, enums, metrics, and source inventory registered by maintainers in `brief/site-package/` as machine-readable bases. Before generating a proposal, an AI agent must read `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json`, and `data/processed/agent_fact_pack.md`, and use `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, and `missing_data_checklist.csv` to build the task, scope, source-use, and data-gap lists. All design judgments must be decomposed into traceable sources, recomputable metrics, verifiable layers, and manually reviewable assumptions. The announcement requires the proposal to reach the urban design depth of a regulatory detailed plan and the urban design depth of a comprehensive planning implementation plan, so narrative text cannot replace the GeoJSON, metric tables, A3 booklet, A0 boards, and HTML e-display deliverables.

The proposal is not a standalone vision document; it organizes deliverables from the announcement, the agent-facing taskbook, and the site materials. This section only places the most critical evidence beside the judgment it supports [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]. Complete source and standard coverage is preserved respectively in `sources.json`, `standard_matrix.json`, and `design_depth_matrix.json`, and the machine index is not repeated in the narrative.

The usage boundaries of the source inventory are as follows [source:SOURCE-REGISTRY]:

- `data/source_registry.json` registers the permitted-use boundaries of public, cleared, and provisional materials.
- Current registry summary: 7 formal-ready sources, 1 background-only source, and 1 provisional-only source.
- An agent must not upgrade `background_only` or `provisional_only` materials into official boundaries, statutory regulatory controls, formal scoring evidence, or government implementation commitments.

`data/processed/agent_fact_pack.md` is the reading navigation layer for this proposal, not a new authoritative source [source:PROCESSED-FACT-PACK]. It helps the agent organize the three scope levels, three key areas, announcement tasks, agent.1–agent.6, source availability, and missing-data matters into a readable proposal; factual judgments must still return to the registered primary materials [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK], and the complete source relationships are preserved in `sources.json`.

![Evidence chain and submission package relationship](assets/figures/site-overview.png)

Where the official `SITE_BOUNDARY` or the three `KEY_AREA` polygons are not yet available, this scaffold uses `brief/site-package/geometry/provisional_boundaries.geojson` to generate a temporary formal package. Both `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` in the package must be labeled `provisional_constraint` and `official_boundary=false`; they may only be used for proposal generation, self-check, visualization, and design discussion, and may not serve as an official redline, approval basis, precise-area basis, or statutory control conclusion. This organizer data gap does not itself block content scoring; after official polygons are substituted, the site boundary, key areas, land use, roads, green space, public space, buildings, phasing, and metrics must all be recalculated.

The reviewable status generated by this scaffold is: **temporary boundary, precision caveat retained, subject to recalculation once official data is published; not blocking content scoring.** Accordingly, the spatial structure, scenarios, projects, and metrics in the narrative are written on the principle of "discussable, reviewable, and recomputable after substitution of the official boundary." When official boundary and key-area polygons are updated, the agent must rerun the scaffold, self-check, and drawing/HTML generation, not merely replace a single file.

Boundary interpretation can return to the overall scope layer and area recalculation [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]. The three key areas are cross-checked by standalone layers and count metrics [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count]. This means a reader can move from the narrative into the evidence without first reading a string of machine identifiers.

## Three-Level Scope Working Framework

Following the three levels established in the announcement, the proposal is organized as follows: the coordinated research scope addresses the AI industry ecosystem, strategic positioning, innovation chain, and future urban form across 43.6 km²; the overall design scope addresses the 1–2 km urban and industrial belt around the 11.4 km² Jing-Zhang Heritage Park, and requires an overall urban-renewal framework, industrial spatial layout, transport and municipal support, and urban-character control; the key-area scope addresses 368.4 ha across three detailed-design areas, and requires clarification of functional formats, building scale, retain/renovate/demolish/new-build classification, public-space connectivity, and transport organization. The three scope levels are mapped one-by-one in `compliance_matrix.json` to guarantee that the mandatory tasks in announcement sections 1.3, 1.4, and 1.5 and agent.1–agent.6 all have chapter, layer, metric, drawing, and HTML evidence.

The depth items of the three-level framework are governed by [depth:three_level_scope_framework] and [depth:overall_spatial_structure]; the spatial evidence is based on [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#PROV-KEY-001]; the task basis is [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]; and the scope index is navigated by the three-level scope table in `project_scope_summary.csv` within [source:PROCESSED-FACT-PACK].

![Three-level scope and spatial working framework](assets/figures/land-use-structure.png)

The three levels are not a disconnected set of drawings. The coordinated research determines the industry-chain and urban-form judgment; the overall design translates that judgment into renewal projects, spatial structure, and facility capacity; and the key-area detailed design verifies the implementability of specific parcels, buildings, transport, public space, and AI application scenarios. When generating a proposal, the agent must first lock the official or provisional boundary and constraints adopted by the current submission, then generate land use, buildings, roads, green space, public space, phasing, and AI service nodes, and finally recalculate metrics from these layers and explain in the narrative which conclusions remain limited by the provisional boundary. Any area, ratio, scale, or project count that cannot be recalculated from structured data must not be written into a formal conclusion.

The overall concept proposed by this package is the "Jing-Zhang AI Pulse Symbiotic Belt": with the Jing-Zhang Heritage Park as the historical and public-space main axis, the three key areas—众智园 (Zhongzhi Park), Beijing AI Origin Community, and 大钟寺 (Dazhongsi)—as innovation anchors, and universities, enterprises, communities, and rail stations as the daily network, it forms a spatial organization of "one belt, three cores, multiple scenario nodes, and a blue-green slow-mobility composite ring." Here the "belt" is not an additionally drawn red line but a translation of the three scope levels in the announcement into a working method; the "three cores" correspond to the three key areas; the "multiple scenario nodes" correspond to operable AI+ public-service, industry-service, and urban-life nodes; and the "composite ring" corresponds to the linkage of slow mobility, green space, public space, and activity routes.

| Level | Design question | Proposal response | Data location |
| --- | --- | --- | --- |
| Coordinated research scope | How to organize the AI industry ecosystem and future urban form | Build the innovation chain of "university origination–open-source collaboration–enterprise transformation–public experience–international dissemination" | compliance_matrix.json, standard_matrix.json |
| Overall design scope | How to put industrial space, urban renewal, transport/municipal, and character on the map | Expressed jointly by land-use, building, road, green-space, public-space, and phasing layers | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-area scope | How to bring the three areas to detailed-design depth | Propose positioning, spatial moves, AI scenarios, and implementation dependencies for each | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

## Coordinated Research Scope: Industry and Future-City Study

The core task of the coordinated research scope is to build a world-class AI innovation ecosystem. The proposal should survey Haidian's university research institutes, leading enterprises, computing-power/algorithm/data factors, incubation platforms, listed companies, unicorns, and technology-service resources, and propose a spatial coordination framework for the AI innovation chain, industry chain, talent chain, and urban-service chain. The naming scheme and logo design should serve the overall identity of the "Centennial Jing-Zhang Cultural Belt, Urban AI Lifestyle Experience Belt, and AI Integration Innovation Belt," and must not remain at the slogan level; the connection to the industry ecosystem, public space, and cultural resources must be explained. The agent-facing taskbook also requires responses to the "five functions" and "three-zone two-wing" coordination, forming a naming system, visual identity, overall spatial structure diagram, scenario-opening, and operation mechanism that can be further deepened. This section must use [source:AGENT-TASKBOOK] and [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] to mark these requirements as originating from the agent open-call taskbook, not as statutory planning controls.

The coordinated research does not add falsely precise red lines; it coordinates urban character, public space, and building layout as required by [standard:MOHURD-URBAN-DESIGN-MEASURES], and connects back to [data:geometry/land_use.geojson#LU-001], [data:geometry/public_space.geojson#PUBLIC-001], and [depth:overall_spatial_structure], demonstrating that the industry strategy ultimately lands on visible, verifiable spatial structure.

The future-city form study should address how artificial intelligence transforms work, life, social interaction, learning, transport, and public services. The proposal should translate AI transport systems, continuous green space, innovation-service facilities, and an internationalized work-life atmosphere into locatable functional zones, nodes, corridors, and scenarios, rather than generically describing a technological vision. The agent should enter industry-strategy metrics, AI innovation indices, talent density, spatial-supply typologies, and AI+ vertical application priorities into the metric system, and mark which are official, which are design suggestions, and which still await formal data calibration. If global AI innovation activities, developer communities, open scenarios, or pilgrimage routes are proposed, they must be worded as "conceptual suggestions / reference schemes subject to further study by professional teams," and must not be presented as confirmed government activities or implementation arrangements.

## Overall Design Scope: Urban Renewal at Regulatory-Detailed-Plan Urban Design Depth

The overall design scope must reach the urban design depth of a regulatory detailed plan. The proposal must present an overall urban-renewal spatial structure, inefficient-space identification, a renewal project list, implementation policy recommendations, industrial-function ratios, spatial organization models, total building scale, and comprehensive carrying-capacity assessment. `geometry/land_use.geojson` must fully cover the design boundary without gaps, `geometry/buildings.geojson` must express the renewal or retained building footprints, `geometry/roads.geojson` must express micro-circulation, slow mobility, and rail-station feeder relationships, and `metrics.json` must recalculate core areas, ratios, and layer counts.

This section follows [standard:MOHURD-CONTROL-DETAILED-PLANNING], breaking the regulatory-depth content into reviewable objects: [data:geometry/land_use.geojson#LU-001] expresses the land-use structure, [data:geometry/buildings.geojson#BLDG-001] expresses building footprints, [data:geometry/roads.geojson#ROAD-001] expresses transport organization, [metric:building_footprint_area_sqm] is used to verify building footprint area, and [depth:land_use_layout] and [depth:development_intensity_controls] govern the depth of deliverables.

The overall design must also support transport, rail, municipal services, and supporting facilities. The proposal should propose spatial layouts and implementation pathways around rail-station TOD integration, road micro-circulation, bicycle parking, parking supply, innovation-service platforms, talent-life services, new infrastructure, distributed energy, and edge computing. Where official control conditions for building height, development intensity, road red lines, setbacks, and facility standards are not yet available, they must be stated as "pending official regulatory-plan conditions" and must not be used to substitute an agent's estimated values for approved indicators.

## Key-Area Detailed Design

Key-area detailed design is mandatory. 众智园 (Zhongzhi Park) AI Independent Innovation Acceleration Area should provide a detailed plan around national AI platforms, full-stack independent innovation, standard-setting, security governance, industry exhibition, external transport, Qinghe River culture, low-carbon green innovation interaction environment, and AI scenarios in green space. Beijing AI Origin Community should provide a detailed plan around university-adjacent innovation, achievement incubation and transformation, a talent special zone, open-source systems, brand events, building retain/renovate/demolish classification, achievement display and release, residential living support, campus–park slow-mobility linkage, and rail-station TOD integration. 大钟寺 (Dazhongsi) AI Industry Cluster should provide a detailed plan around leading enterprises, intelligent agents, smart terminals, content consumption, data factors, digital assets, commercial services, composite use of planned green space, Dazhongsi Station TOD integration, and four-quadrant pedestrian connectivity at the intersection.

Detailed design for the three key areas must reference [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], and [data:geometry/key_areas.geojson#PROV-KEY-003], and be checked by [depth:three_key_area_detailed_design] to confirm whether it reaches the depth of a comprehensive planning implementation plan. If only "build a demonstration zone" is described without evidence of functions, buildings, transport, public space, and implementation projects, it should be considered incomplete.

![Three key areas index and design task map](assets/figures/key-areas.png)

The three key areas must appear in `geometry/key_areas.geojson`. If the repository has provided official polygons, they should be used as `official_constraint`; if official polygons are missing, `provisional_constraint` may be used temporarily, but the narrative, HTML, sources, assumptions, and self_check must state that they cannot serve as formal scoring or approval basis. `compliance_matrix.json` should cover announcement sections 1.5.3.1, 1.5.3.2, and 1.5.3.3 respectively. Design expression should include functional formats, building scale, building form, retain/renovate/demolish classification, public-space system, transport organization, slow-mobility connectivity, and implementation projects. The HTML page should allow switching between the three key areas, and the A3 booklet and A0 boards should include at least the key-area master plan, local detail drawings, and metric annotations.

### Zhongzhiyuan AI Acceleration Area (192.92 ha)

**Design positioning**: Garden-style full-stack independent innovation district, anchored by national AI platforms, building the chip—framework—platform—application innovation chain.

**Buildings & program mix**: ~80-100 buildings, with AI R&D office (60%), pilot laboratories (15%), industry exhibition & exchange (10%), and supporting commercial & services (15%). 2-3 signature R&D headquarters along the Qinghe River frontage, height 60-80m; inner blocks dominated by 4-6 story low-rise garden-style R&D buildings. Retain (~35%), renovate (~40%), new build (~25%).

**Public space & blue-green system**: "Qinghe Innovation Corridor" — 1.5km continuous slow-mobility waterfront + industry exhibition nodes + ecological rain gardens. Core green axis extends south from Qinghe River, connecting the low-carbon innovation plaza, AI testing garden, and standards governance zone. Target green ratio ≥ 40%.

**Transport & slow mobility**: Main vehicle entrances on the north and west arterials; internal slow-mobility priority shared streets. 2 transit/rail feeder points, internal slow-mobility coverage ≥ 90%. External connection via northern expressway to Shangdi, Xierqi tech parks.

**AI scenarios**:
- Independent model testing ground (west of core green axis, ~12,000 m²)
- Standards & security governance workshop (central exhibition center)
- Low-carbon computing experience pavilion (Qinghe River frontage)
- Innovation achievement exhibition hall (main entrance plaza)

**Implementation projects**:
| Project | Scale | Phase | Dependencies |
| --- | --- | --- | --- |
| Qinghe Innovation Corridor | 1.5km | I 2026-2028 | River blue line, flood control |
| Model testing ground | 12,000 m² | I 2026-2028 | Land use confirmation |
| Low-carbon computing pavilion | 5,000 m² | II 2028-2030 | Energy & compute access |
| Standards governance center | 8,000 m² | II 2028-2030 | Operator identification |

Evidence: [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/buildings.geojson#BLDG-001], [depth:three_key_area_detailed_design]

### Beijing AI Origin Community (104.32 ha)

**Design positioning**: University-adjacent achievement transformation and talent community, building a "university sourcing—open-source collaboration—achievement transformation—talent services" closed loop.

**Buildings & program mix**: ~40-50 buildings, with achievement incubation office (45%), talent housing (25%), open-source collaboration & exhibition (15%), and supporting services (15%). Low-rise 3-5 story buildings near the university edge; 6-8 story mixed-use along main roads with ground-floor retail. Retain (~50%), renovate (~30%), new build (~20%).

**Public space & blue-green system**: "Origin Square" — the core public space at the community center, facing the open-source release hall and achievement exhibition center, capacity 500+ people. "Knowledge Sharing Corridor" — 800m along the campus-community boundary, connecting campus entrances, incubators, talent apartments, and community services. Target green ratio ≥ 35%, primarily pocket parks and linear green spaces.

**Transport & slow mobility**: 3 campus-park slow-mobility connection corridors, achieving 15-min walking accessibility. Rail station TOD: shuttle bus and bike-sharing hub at the nearest station, community interior pedestrian-only. TOD mixed-use within 200m of the station, ground-floor public functions.

**AI scenarios**:
- Open-source community release hall (north of Origin Square, supporting live-streaming + in-person)
- Achievement incubation gallery (along Knowledge Sharing Corridor)
- Talent zone service center (community center, integrating talent policy, housing, and education services)
- Nighttime collaboration space (24h, for open-source developers)

**Implementation projects**:
| Project | Scale | Phase | Dependencies |
| --- | --- | --- | --- |
| Origin Square & release hall | 3,000 m² | I 2026-2028 | Land consolidation, university coordination |
| Knowledge Sharing Corridor | 800m | I 2026-2028 | Campus boundary, road right-of-way |
| Campus-park slow-mobility corridors | 3 crossings | I 2026-2028 | University coordination, traffic review |
| Talent apartment renovation | ~20,000 m² | II 2028-2030 | Property rights, residential standards |

Evidence: [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/roads.geojson#ROAD-001], [source:AGENT-TASKBOOK]

### Dazhongsi AI Industry Cluster (72.05 ha)

**Design positioning**: Urban smart economy and international exchange district, with leading enterprises as the engine, creating a hub for intelligent agents, smart terminals, data factors, and content consumption.

**Buildings & program mix**: ~30-40 buildings, with HQ offices (50%), agent & terminal exhibition (20%), commercial services & culture (20%), and data factor & digital asset services (10%). TOD high-density development within 200m of Dazhongsi Station, building height 80-100m; outer areas transition to 6-8 story mixed-use. Preserve the Dazhongsi heritage building and surrounding character area (~15%), renovate (~35%), new build (~50%).

**Public space & blue-green system**: "Four-Quadrant Pedestrian Connectivity System" — centered on the rail station, connecting four quadrants via underground passages and ground-level greenways. Planned green space composite use: integrating street-side green buffers with commercial outdoor seating, cultural displays, and tech experience zones. Target green ratio ≥ 30%, emphasizing vertical greening and rooftop gardens in the high-density urban context.

**Transport & slow mobility**: Dazhongsi Station TOD — station exits directly connect to underground levels of each block, achieving complete pedestrian-vehicle separation. Slow-mobility priority traffic signals and raised crosswalks at the four-quadrant intersection. 2 bike-sharing hubs and 1 taxi/ride-hailing drop-off zone.

**AI scenarios**:
- Intelligent agent interoperability test field (four-quadrant connection level, cross-vendor collaboration testing)
- Data factor salon (SW quadrant, compliant data circulation and digital asset display)
- International roadshow center (NE quadrant, for the global AI community)
- AI+ consumer experience street (SE quadrant, featuring smart terminals and content consumption)

**Implementation projects**:
| Project | Scale | Phase | Dependencies |
| --- | --- | --- | --- |
| Dazhongsi Station TOD | 200m radius | I 2026-2028 | Rail station, property rights, traffic review |
| Four-quadrant pedestrian system | 4 crossings | I 2026-2028 | Road right-of-way, underground utilities, municipal coordination |
| Agent interoperability test field | 2,000 m² | II 2028-2030 | Operator, data security protocols |
| International roadshow center | 5,000 m² | II 2028-2030 | Operator confirmed, brand rights clearance |

Evidence: [data:geometry/key_areas.geojson#PROV-KEY-003], [data:geometry/public_space.geojson#PUBLIC-001], [metric:key_area_count]

## AI Innovation Ecosystem, Talent Profile, and AI+ Scenarios

The proposal should establish spatial demand profiles for AI talent and enterprises, covering R&D office, open-source collaboration, achievement release, enterprise services, talent housing, social learning, consumer lifestyle, sports and recreation, and international exchange. AI+ scenarios should be organized around the directions proposed in the announcement—transport, services, consumption, healthcare, education, law, lifestyle services, etc.—to form industry-development scenarios and AI-empowered urban-function scenarios. Each scenario should specify the target user, spatial location, data source, privacy boundary, manual-review mechanism, and operating entity.

AI scenarios must be grounded in spatial and governance boundaries: public-space scenarios reference [data:geometry/public_space.geojson#PUBLIC-001], slow-mobility and transport scenarios reference [data:geometry/roads.geojson#ROAD-001], and open-space scenarios reference [data:geometry/green_space.geojson#GREEN-001], [metric:public_space_ratio], and [metric:green_ratio]. These references allow reviewers to see that scenarios are not slogans but design objects located in specific layers and metrics. The agent-facing taskbook requires no fewer than 10 AI scenario cards, no fewer than 3 industry test/validation scenarios, and no fewer than 5 user persona types. The scaffold provides only the structure; formal participants must write the scenario cards, persona tables, privacy boundaries, manual-review mechanisms, and operating entities into the narrative, HTML, A3/A0, and compliance matrix.

| User persona | Typical needs | Spatial response | Self-check boundary |
| --- | --- | --- | --- |
| Open-source developer | Release, collaborate, test, community reputation | Origin Community open-source release hall, public code wall, nighttime collaboration space | No personal behavioral tracking; activity data in aggregate only |
| Startup team | Low-cost office, compute access, product testing ground | Zhongzhi Park shared testing ground, edge-compute service point, standards and governance consulting | Compute and data services require separate authorization |
| Enterprise visitor | Exhibition, business, international reception, talent recruitment | Dazhongsi international roadshow hall, rail-station feeder, public space around key enterprises | Corporate logos and cases must be rights-cleared |
| Local resident | Commute, leisure, community services, low-disruption renewal | Jing-Zhang Heritage Park slow-mobility loop, embedded community services, nighttime lighting and activity zoning | Resident profiles not used for commercial recommendations |
| University faculty and students | Achievement transformation, cross-campus collaboration, daily slow mobility | Campus–park slow-mobility stitching, achievement transformation station, AI education experience points | Campus data and research output require authorization |

| Scenario card | Spatial carrier | User group | Design description | Data source | Human review | Suggested operator | Suggested KPI |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01 Open-Source Release Hall | Beijing AI Origin Community | University students, developers | Achievement release, code contribution display, and small-scale roadshow space | Public repo data + submitter authorization | Code review + content audit | Community co-governance committee | Monthly events, contribution count, exhibiting teams |
| 02 Security Governance Sandbox | Zhongzhi Park | Enterprises, standards bodies | Translate standard-setting, security evaluation, and model red-teaming into visitable, bookable, auditable nodes | Public test output + participant self-report | Independent security audit + multi-party review | Standards governance consortium | Test tasks, pass rate, standards drafts |
| 03 Edge Compute Hub | Nodes within overall design scope | Startups, residents | Combined with public services, enterprise services, and low-carbon energy strategy | Anonymized aggregated usage statistics | Privacy impact assessment (quarterly) | Municipal + operator partnership | Usage count, avg response time |
| 04 AI Slow-Mobility Navigation | Jing-Zhang Heritage Park vitality corridor | All pedestrians | Explainable signage and low-intrusion sensing for mobility gaps, congestion, and accessibility needs | Anonymous sensor data (no personal tracking) | Accessibility walkthrough + user feedback mechanism | Public space operator | Slow-mobility connectivity rate, user satisfaction |
| 05 Dazhongsi International Roadshow Lounge | Dazhongsi AI Industry Cluster | Enterprise visitors, investors | Display, negotiation, media release, and international exchange | Enterprise self-report + public info | Content compliance review | Market-operated platform | Annual events, attending enterprises, conversion rate |
| 06 Qinghe Low-Carbon Innovation Corridor | Zhongzhi Park along Qinghe River | Residents, employees | Green space, stormwater, walking/cycling, and AI display as park public living room | Environmental sensors (temperature, humidity, water quality, usage) | Data not used for personal profiling | Zhongzhi Park operator | Usage count, estimated carbon reduction |
| 07 University-Adjacent Achievement Transformation Street | Beijing AI Origin Community | University students, entrepreneurs | Incubation, display, legal, IP, and investment/financing services | Authorized disclosure + public data | Ethics review + IP audit | University-partnered operator | Transformed projects, funding amount |
| 08 Data Factor Salon | Dazhongsi area | Enterprises, data providers | Compliance, authorization, auditable data-factor and digital-asset circulation | Only compliant data + auditable logs | Independent data compliance audit | Third-party data governance body | Transaction volume, compliance rate |
| 09 AI Lifestyle Service Model Street | Community–commerce intersections | Residents, community staff | AI+ healthcare, education, legal, lifestyle services in operable small-scale blocks | User-authorized data + public service data | Manual approval + service team code | Community + commercial joint operator | Service coverage, user feedback |
| 10 Global AI Activity Week Route | Belt-wide public-space system | Global participants, local residents | Walkable, shareable experiential route from heritage to international roadshow | Public venue info + participant self-report | Event safety review + cultural content audit | Event organizing committee | Participation, media coverage |

AI governance recommendations generated by the agent must follow the principles of data minimization, open-source attribution, explainability, and manual review. Urban intelligent agents can assist in identifying slow-mobility gaps, public-space heatmaps, facility maintenance, enterprise service needs, and activity safety risks, but they cannot replace planning approvals, output unauthorized personal profiles, or claim to have obtained official implementation commitments. All AI scenario nodes should be entered into the structured layers or compliance matrix to allow reviewers to see their relationship with industry, space, and public interest.

### Agent Task Responses

**Agent.1 — Naming and Brand Identity System**

The proposal is named "京张智脉·光晕 / Jing-Zhang AI Heritage Halo." The visual identity system uses the "twin track" as the core symbol—two parallel lines representing history and the future, converging at the three "halo" nodes to form a "one belt, three cores" brand architecture. The naming system corresponds to the three major positioning statements of "Centennial Jing-Zhang Cultural Belt, Urban AI Lifestyle Experience Belt, and AI Integration Innovation Belt."

**Logo Design (rendered)**: An actual logo file has been generated at `assets/logo.svg` (scalable vector) and `assets/logo.png` (bitmap preview). The logo blends the "∞" (infinity symbol) with the form of railway tracks. The dual-track lines represent the parallel evolution of history and the future. Three colored halo nodes correspond to the three key areas:

| Element | Color | Meaning |
| --- | --- | --- |
| Main axis | #1a5276 Deep Blue | Centennial Jing-Zhang heritage |
| Innovation Orange | #e07a5f | Zhongzhi Park · AI acceleration |
| Talent Blue | #3b82c4 | AI Origin · Talent ecosystem |
| Industry Green | #5fae6f | Dazhongsi · Industry cluster |

**VI Application Guidelines**:
- Brand typeface: Sans-serif (Chinese: WenQuanYi Micro Hei; English/figures: DejaVu Sans)
- Core symbol: Twin-track ∞ mark, usable standalone or with text
- Secondary graphics: Three parallel arcs (representing the "three belts"), halo diffusion rings (representing node radiation)
- Wayfinding: ∞ symbol as the base element for signage, integrated into road signs, slow-mobility guides, building entry markers, and information kiosks
- Color accessibility: Information conveyance does not rely on color alone

**Agent.2 — AI Full-Stack Independent Innovation System and World-Class AI Innovation Ecosystem (5–8 AI Ecosystem Cases)**

**Global AI Innovation Ecosystem Cases (research reference, not a commitment):** The following internationally reported AI innovation ecosystem cases are used to extract "institution–space–industry–governance" synergy mechanisms as transferable references for this project's conceptual proposal. Specific transferability must be verified case-by-case against local conditions; these are not templates to be copied.

| # | Case | Location | Core Mechanism | Inspiration for Jing-Zhang | Source |
| --- | --- | --- | --- | --- | --- |
| 1 | Toronto Waterfront Quayside (Sidewalk Labs concept) | Toronto, Canada | Digital twin + sensors + modular blocks, public data governance and privacy assessment (terminated, but left public data governance and benefit-sharing discussion) | Digital infrastructure must be co-designed with public data governance to avoid technology-first prioritization | [source:GLOBAL-CASE-TORONTO] |
| 2 | Punggol Digital District | Singapore | Smart industrial park + university + community integration, AI/robotics industry + open digital platform synergy | Industry–academia–residence–research integration can inform the Origin Community collaboration model | [source:GLOBAL-CASE-PUNGGOL] |
| 3 | Station F (incl. AI programs) | Paris, France | Single landmark aggregating incubators, accelerators, and corporate open innovation, AI projects matched with industry capital | International roadshow hub can borrow the "corporate–startup–capital" open-space model | [source:GLOBAL-CASE-STATIONF] |
| 4 | Here East / Queen Elizabeth Olympic Park | London, UK | Heritage venue conversion to digital creative and AI cluster, shared facilities among universities, enterprises, and community | Rail/industrial heritage reuse + digital creative cluster aligns with Jing-Zhang heritage renewal path | [source:GLOBAL-CASE-HEREEAST] |
| 5 | Smart Kalasatama | Helsinki, Finland | Open-data + AI urban living lab for residents, "time saved" as KPI | Public scenario open program and data minimization can reference the "living lab" methodology | [source:GLOBAL-CASE-KALASATAMA] |
| 6 | Shenzhen AI ecosystem | Shenzhen, China | Full-chain hardware–software–application synergy, government funds + leading enterprises driving SMEs | Full-stack independent innovation + government fund portfolio can serve as reference for Zhongzhi Park mechanism | [source:GLOBAL-CASE-SHENZHEN] |
| 7 | Seoul Digital Media City (DMC) | Seoul, South Korea | Dedicated plot + infrastructure integrated planning, digital content and AI enterprise cluster, cultural facilities driving public activity | "Cultural landmark + industry cluster + public activity" combination supports Dazhongsi international communication vision | [source:GLOBAL-CASE-SEOUL-DMC] |
| 8 | Tel Aviv–Be'er Sheva AI corridor | Israel | University–military R&D–startup–enterprise AI R&D corridor, talent and test-scenario linkage | Transit-anchored "R&D–test–commercialization" corridor concept supports the Jing-Zhang "one-belt three-core" structure | [source:GLOBAL-CASE-IL-AICORRIDOR] |

> The above case information comes from public reports and academic reviews and serves as research reference only. It does not indicate that the project has established cooperation or obtained authorization from the above entities. Transferability, quantitative indicators, and localization conditions must be verified case-by-case during the detailed design phase.

**Proposed AI Ecosystem Facilities (local transformation of the 5–8 AI ecosystem case requirement, conceptual proposal):**
1. Independent large-model training and evaluation platform (Zhongzhi Park)
2. AI security governance and standard-setting workshop (Zhongzhi Park)
3. Open-source community collaboration space (AI Origin Community)
4. Achievement transformation and incubation accelerator (AI Origin Community)
5. Intelligent agent and smart terminal exhibition center (Dazhongsi)
6. Data-factor circulation and digital-asset service platform (Dazhongsi)
7. AI education experience and science popularization base (along the Jing-Zhang Heritage Park corridor)
8. Global AI talent exchange and international roadshow center (Dazhongsi)

**Agent.3 — AI+ Scenario Empowerment Paradigm (10 Scenario Cards + 3 Industry Test/Validation Scenarios)**
The 10 scenario cards are listed in the "AI+ Scenarios" chapter table. The 3 industry test/validation scenarios:
1. Zhongzhi Park Security Governance Sandbox — AI model red-teaming and standard verification
2. AI Origin Community Open-Source Code Collaboration Platform — cross-institutional code contribution and joint testing
3. Dazhongsi Intelligent Agent Interoperability Test Field — cross-vendor agent collaboration testing in an urban environment

**Agent.4 — AI Public Space, AI-Native New Formats, and Pilgrimage Landmarks (3 Pilgrimage Landmarks + Public Space Component Library + Honor Display System)**

**3 AI Pilgrimage Landmarks:**
1. **Qinghuayuan Station · AI Origin Monument**: Establish an AI origin monument at the historic Qinghuayuan Station of the Jing-Zhang Railway, marking "the first kilometer of AI moving from the lab to the city."
2. **Zhongzhi Park · Full-Stack Innovation Lighthouse**: Set up an interactive AI innovation display lighthouse in the core area of Zhongzhi Park, showcasing independent innovation achievements in real time.
3. **Dazhongsi · Digital Bell Tower**: Combine the historical bell of Dazhongsi with AI-generated sound art to create a sound landmark where "every chime is a dialogue between history and the future."

**Public Space Component Library (conceptual design suggestions, to be verified during detailed design):**
| Component | Type | Applicable Location | Description |
| --- | --- | --- | --- |
| Smart Wayfinding Kiosk | Information device | Heritage park entrances, transit station exits | Slow-mobility navigation, scenario activity info, multilingual service; design consistent with Jing-Zhang Railway elements |
| Code Display Column | Public art | Zhongzhi Park, Origin Community, Dazhongsi | Transparent cylinder displaying open-source code snippets; QR code links to full repository |
| Data Flow Speed-Read Screen | Digital interface | Zhongzhi Park, Dazhongsi | Real-time anonymized public data flow (energy efficiency, usage heatmap, event count); no personal data displayed |
| Slow-Mobility Charging Post | Service facility | Heritage park trail | Integrated phone charging, Wi-Fi, environmental sensor; "smart sleeper" form factor |
| Community Notice Board | Information device | Community–commerce intersections | Non-digital service guarantee: paper-readable board + manual updates, no smart device dependency |
| Waterfront Rest Node | Spatial node | Qinghe and Xiaoyuehe banks | Combined stormwater management, ecological display, AI environmental interpretation, and seating |

**Honor Display System (conceptual design suggestions, subject to implementation plan):**
- **Public Data Contributor Honor Wall**: Physical honor wall in Zhongzhi Park core area, rotating display of individuals/organizations contributing to public datasets and AI scenario open programs (with authorization)
- **Open-Source Contributor Digital Display**: Digital screen in Origin Community open-source hall, showing open-source community code contributor leaderboard (from public repos, no personal privacy)
- **AI Governance Pioneer Board**: Exhibition area in Dazhongsi International Roadshow Hall, recording exemplary contributions to AI safety governance, standard-setting, and ethical review (with contributor authorization)
- **Annual AI Innovation Award**: Proposed for presentation during the annual Jing-Zhang AI Innovation Week, recognizing outstanding projects in AI urban applications, scenario openness, and public interest protection
- **Operating Principles**: All content requires authorization; no personal sensitive information; annual refresh; content reviewed by community governance committee

**Agent.5 — Integrated Narrative of Centennial Jing-Zhang Culture, Zhongguancun Culture, and AI New Culture**
Three-layer cultural integration narrative:
- **Foundation (Railway Heritage)**: Qinghuayuan Station, Jing-Zhang Railway Heritage Park, the memory of rails and sleepers.
- **Middle Layer (Zhongguancun Spirit)**: From "Electronics Street" to AI innovation source—stories of intellectuals and entrepreneurs.
- **Top Layer (AI New Culture)**: Open source, sharing, human–machine collaboration, global AI community—a city civilization for the future.

**International Communication Narrative (conceptual copy, for campaign and brand development):**
- **English brand line**: "From Iron Rails to Intelligent Trails — The Centennial Belt of AI Innovation"
- **Chinese brand line**: "京张智脉，光晕未来" (Jing-Zhang Heritage Halo — where rail memory meets the AI future)
- **Three communication themes**: ① "China's First AI Innovation Belt on a Century Rail"; ② "Where Heritage Meets Algorithm"; ③ "Open, Verified, Human-Centered AI"
- **International communication vehicles**: Global AI Open Day (autumn), international roadshow hall, multilingual wayfinding and scenario guides, multilingual AI Pilgrimage Path experience routes, open-source project international collaboration page
- **Authenticity principle**: All communication content must be based on verifiable public facts and authorized outcomes; no overstatement of implementation commitments; conceptual proposals must not be presented as completed facts

## Three-Zone/Two-Wing Synergy and Regional Collaboration Framework (conceptual framework)

**Three-zone/two-wing synergy loop (conceptual framework, pending industrial planning and spatial conditions):**
- **Core zone (three cores)**: Zhongzhi Park (full-stack innovation), AI Origin Community (achievement transformation), Dazhongsi (intelligent economy), connected by the Jing-Zhang Heritage Park vitality belt, forming an "R&D–validation–display" industrial closed loop
- **West wing (Zhongguancun Science & Technology Service Wing)**: extends south along Zhongguancun Avenue connecting the Zhongguancun Science City core, focusing on fintech, IP, standards/testing, and AI governance services; specific spatial nodes pending formal regulatory plan
- **East wing (Xiaoyuehe Scenario Empowerment Wing)**: extends north along the Xiaoyuehe ecological corridor connecting university and research clusters, deploying AI open scenario labs, public data marketplaces, and community AI experience stations; specific sites pending Xiaoyuehe waterfront survey and regulatory plan
- **Synergy mechanism**: the three cores are physically connected by the Jing-Zhang Heritage Park slow-mobility system, while the east/west wings form a "service–scenario" loop through industrial complementarity and data sharing; the specific operating architecture, responsible entities, and KPIs must be jointly determined during the detailed design phase

**Regional collaboration framework (conceptual directions, pending formal agreements):**
- **Beiwu Community**: AI hardware and compute collaboration with Shangdi Information Industry Base; Zhongzhi Park focuses on software and algorithms while Beiwu focuses on chips and compute infrastructure
- **Future Science City**: joint frontier AI research and talent training; Origin Community serves as the front-end for achievement transformation
- **Huairou Science City**: AI + scientific computing cross-research leveraging large-scale scientific facilities
- **Yizhuang (ETDZ)**: connect autonomous driving and smart manufacturing AI scenario testing needs; Dazhongsi test field can host city-level AI scenario validation for ETDZ enterprises
- **Beijing-Tianjin-Hebei collaboration**: conceptual direction to explore "R&D in Beijing, manufacturing in Tianjin-Hebei" AI industrial division model, requires dedicated industrial policy and spatial planning; not an implementation plan

> The above regional collaboration framework comprises conceptual directions based on public planning materials and industrial trend analysis, not confirmed cooperation or policy commitments. Specific mechanisms, partners, and implementation paths must be confirmed case-by-case during the detailed design phase.

## Land Use, Building Scale, and Retain/Renovate/Demolish Scheme

The land-use scheme should be expressed in accordance with public standards such as the national territorial-survey, planning, and land-use classification, forming a complete, closed, gapless land-use zoning. The building scheme should distinguish retained, renovated, renewed, new-build, or pending-confirmation objects, and clearly state the proposed hierarchy for building footprint, function, scale, character, roof form, massing, and height control. Where existing building, ownership, regulatory-plan, and engineering conditions are lacking, the proposal can only present methods and a pending-calibration checklist; it must not fabricate retain/renovate/demolish conclusions.

Land-use classification follows [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; building height, massing, interface, and character control are managed by [depth:height_massing_character]; the retain/renovate/demolish approach is managed by [depth:retain_renovate_demolish]. The primary evidence for land use and buildings is [data:geometry/land_use.geojson#LU-001], [data:geometry/buildings.geojson#BLDG-001], and [metric:building_footprint_area_sqm].

Building-scale and intensity metrics must be consistent with `metrics.json` and the layers. Where total building scale, FAR, building height, building density, green ratio, setbacks, and building control lines lack official conditions, they should be listed as `unknown` or `pending_control` in the metric system, and fixed values must not be used to create a false sense of precision. The A3 booklet should provide a renewal project list and metric verification table; the A0 boards should clearly express the key spatial structure and key areas; and the HTML page should provide linked viewing of metrics and layers.

## Transport, Rail, Municipal Services, and Public Facilities

The transport proposal should respond to the announcement's requirements for rail-station TOD integration, road micro-circulation, slow-mobility gaps, external transport, parking, bicycle parking, and green transport systems. The focus should cover the North Fifth Ring Road, Jing-Zhang Heritage Park crossing nodes at ring-road intersections, Wudaokou, Qinghuadonglu West Gate, Dazhongsi Station, and transport connections around key enterprises. Road and slow-mobility layers should remain within the submitted boundary and be cross-checked against public space, green space, industry nodes, and key areas. If the submitted boundary is provisional, transport conclusions can only be treated as temporary design discussion.

Professional depth for transport and municipal services is governed respectively by [depth:traffic_rail_slow_parking] and [depth:municipal_new_infrastructure]; layer evidence references [data:geometry/roads.geojson#ROAD-001], [data:geometry/public_space.geojson#PUBLIC-001], and [data:geometry/constraints.geojson#CONSTRAINTS]. Where road red lines, utility lines, fire-safety, and municipal conditions are missing, they should be noted via assumptions as pending, rather than presenting strategies as approved conditions.

![Slow-mobility and blue-green public-space composite system](assets/figures/mobility-bluegreen.png)

Municipal and public-service facilities should cover AI industry service facilities, innovation-service platforms, talent-life service facilities, new infrastructure, distributed energy, edge computing, and integration with traditional municipal facilities. The proposal should describe facility standards, spatial layout, service radius, operation model, and phased implementation logic. Where utility-line, energy, drainage, flood-control, and fire-safety engineering data are missing, they should be listed as prerequisites for formal deepening.

## Blue-Green Space, Public Space, and Urban Character

The blue-green space scheme should take the Jing-Zhang Heritage Park vitality corridor as the backbone, coordinate the Qinghe River, Xiaoyue River, and surrounding universities, enterprises, and community travel needs, and propose a north–south through, east–west connected pedestrian, cycling, and green-space system. The scheme should identify slow-mobility gaps, elevated ring-road crossing nodes, and landscape nodes at the southern and northern ends of the park, and propose composite-use strategies for parking, sports, innovation interaction, technology testing, application display, and public services.

Blue-green public space is jointly verified by the design depth item and the green-space and public-space layers [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]. The ratios of green space and public space are explained in the narrative for their design significance; the complete recalculation is preserved in `metrics.json`. The coordination of urban character, public space, and building control returns to the professional standards matrix [standard:MOHURD-URBAN-DESIGN-MEASURES].

The urban character scheme should integrate the historical culture of the Jing-Zhang Railway, the innovation culture of Zhongguancun, and AI new culture, utilize cultural resources such as Qinghuayuan Railway Station and the Beijing Film Academy, and propose guidance on urban tone, building character, roof form, massing, interface, and public art. The agent should also propose signage and wayfinding, cultural symbols, international communication narratives, AI pilgrimage landmarks, and a contribution wall or honor-display system. However, all brands, fonts, images, portraits, and corporate logos must have rights-cleared sources. Character controls should clearly distinguish official controls, design suggestions, and pending-confirmation conditions; falsely precise control lines must not be given without heritage-protection or regulatory-plan basis.

## Renewal Project List, Implementation Policies, and Phasing Plan

The implementation plan should form a reviewable renewal project list, specifying project location, type, function, responsible entity, dependency conditions, implementation phase, risks, and evaluation metrics. Policy recommendations should cover urban-renewal coordinated implementation, spatial supply, operation mechanisms, industry services, public participation, data governance, and property-rights coordination. `geometry/phasing.geojson` should express the phased scope, and `compliance_matrix.json` should link each task to the corresponding phase and drawing.

Project list and phasing depth are managed by [depth:renewal_project_list] and [depth:phasing_implementation]; the spatial evidence for phasing is [data:geometry/phasing.geojson#PHASE-001]. Where ownership, funding, implementing entity, and approval pathways are absent, the proposal must present them as implementation risks, not as committed deliverables.

| Project ID | Project name | Type | Key dependencies | Evidence reference |
| --- | --- | --- | --- | --- |
| JZ-01 | Jing-Zhang Heritage Park slow-mobility gap stitching | Public space / Transport | Road red lines, under-bridge space, transport organization review | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Zhongzhi Park Qinghe River Innovation Interface | Blue-green space / Industry display | River blue line, ecological and flood-control conditions | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | Origin Community University-Adjacent Achievement Transformation Street | Urban renewal / Industry services | Campus boundary, ownership, ground-floor formats | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | Dazhongsi Station Four-Quadrant Pedestrian Connectivity | Rail TOD / Slow mobility | Rail station, road intersection, municipal utilities | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI Public Service and Edge Computing Nodes | New infrastructure / Public services | Energy, computing, security, and operating entity | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | Global AI Activity Week Public Route | Operations / Brand | Public-space permits, event safety, rights clearance | [data:geometry/phasing.geojson#PHASE-001] |

Phasing should be distinguished from the 100-day solicitation design period: the solicitation period is the time requirement for submitting deliverables, while implementation phasing is the pathway for urban renewal and project construction. The proposal should propose near-term pilots, mid-term renewal, and long-term governance frameworks, and indicate which items can be initiated first with lightweight facilities, operational activities, and service platforms, and which must await formal regulatory-plan, municipal, transport, and ownership conditions. For the annual activity system, developer community operations, scenario open days, public experience routes, and international communication mechanisms, the narrative should describe the target audience, frequency, responsibility boundaries, conversion pathways, and risks, and must not merely write promotional slogans.

## Metrics, Area Recalculation, and Compliance Matrix

The metrics system should at minimum include the overall design scope area, key-area area, green-space and public-space ratios, building footprint, renewal project count, AI scenario nodes, slow-mobility connectivity indicators, industrial-space indicators, talent-service indicators, and self-check status. All known metrics must be recomputable from GeoJSON or trusted sources; unknown metrics must give the reason and prerequisites for formal submission. The results of `scripts/spatial_review.py` and `scripts/visual_review.py` are important evidence for formal self-check.

Metric recalculation follows the unified design depth requirement [depth:metrics_recalculation]. The narrative focuses on explaining the design significance of the metrics—for example, how the overall scope constrains spatial allocation, how blue-green and public-space ratios support daily interaction—while the complete values, formulas, source files, and confidence levels are preserved in `metrics.json`. Example key metrics can be verified by the overall scope and green-space data [metric:site_area_sqm] [data:geometry/green_space.geojson#GREEN-001].

![Core metric recalculation and evidence chain](assets/figures/metrics-evidence.png)

The compliance matrix is the master control document for task responsiveness. Each announcement task and agent_taskbook task must correspond to a report chapter, layer, metric, drawing, HTML page, source, assumption, and self-check item. If any mandatory task under announcement sections 1.3, 1.4, 1.5, or agent.1–agent.6 is not covered, the proposal must not enter formal professional scoring.

During formal deepening, the agent should also classify each metric into three categories: the first category comprises spatial metrics directly recomputable from submitted geometry, such as boundary area, green ratio, public-space ratio, building footprint area, and phased area; the second category comprises regulatory metrics requiring official regulatory-plan or taskbook attachments, such as FAR, building height, building density, setbacks, road red lines, and facility standards; the third category comprises performance metrics requiring continuous calibration from operational or industry data, such as AI innovation index, talent density, industry-service satisfaction, slow-mobility accessibility, event participation, and scenario usage frequency. The three categories should be entered respectively into `metrics.json`, `assumptions.json`, and `compliance_matrix.json`, avoiding the misrepresentation of operational visions as approved planning conditions.

## Risk, Copyright, and Compliance Statement

**Bilingual requirement.** The primary proposal file may use Chinese or English, but a complete counterpart translation must be provided via `proposal.en.md` or `proposal.zh.md`; the A3/A0, HTML, and text-bearing figures must also provide corresponding language copies, preferably using the event's recommended terminology from `docs/terminology-glossary.md`. A v2 package missing any required translation, language mapping, or valid file will be blocked by finalize and CI. All images, drawings, icons, data, and code assets must state their source, license, and authorization status in `sources.json` or `report/copyright_statement.md`. The HTML page must not load remote scripts, remote map tiles, remote fonts, iframes, forms, or external APIs, and must not track reviewer behavior.

Risk and missing-data lists are jointly verified by the risk depth item, constraint layer, and site package [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS] [source:SITE-PACKAGE]. The official boundary, key area, regulatory-plan, road, parcel, building, municipal, heritage-protection, and public-service gaps listed in `missing_data_checklist.csv` must be entered into `assumptions.json`, the self-check, and the risk section of the narrative. Any conclusion lacking official regulatory-plan, road red-line, ownership, municipal, fire-safety, or heritage-protection conditions must be downgraded to a pending-confirmation item; the complete professional review is preserved in the standards matrix.

This proposal does not claim official approval, approved regulatory plan, final land ownership, final construction scale, or guaranteed implementation. The AI agent is responsible for the facts, sources, copyright, spatial data, metrics, and expression; the maintainers and professional reviewers may request revision or rejection based on self-check results, spatial review, and compliance matrix requirements.

### Copyright Statement (Per-Asset)

| Asset | Path | Source | License | Notes |
| --- | --- | --- | --- | --- |
| Spatial Geometry | `geometry/*.geojson` | Derived from public satellite imagery & OSM | COMMUNITY-DISPLAY-ONLY | Provisional, subject to official replacement |
| Figures (PNG) | `assets/figures/*.png` | Self-generated | COMMUNITY-DISPLAY-ONLY | Bilingual versions independently generated |
| Boards (PDF) | `drawings/a0-boards*.pdf` | Self-generated | COMMUNITY-DISPLAY-ONLY | Chinese & English |
| Booklet (PDF) | `drawings/a3-booklet*.pdf` | Self-generated | COMMUNITY-DISPLAY-ONLY | Chinese & English |
| Brand Logo | `assets/logo.*` | Self-designed | COMMUNITY-DISPLAY-ONLY | Not for commercial use |
| Proposal Text | `proposal.md` / `proposal.en.md` | Self-written | COMMUNITY-DISPLAY-ONLY | External data sources in sources.json |
| Metrics Data | `metrics.json` | Geometry recomputation + brief | No independent copyright | Original data from SITE-PACKAGE |
| Visualization | `visual/*` | Self-generated | Self-owned | Static HTML, no external deps |
| Source Registry | `sources.json` | Collected from public sources | Per-entry license | See individual license fields |

### Accessibility & Inclusive Design

The proposal follows universal design principles to ensure accessibility for all ages and abilities:

**Pedestrian Accessibility:**
- Jing-Zhang Heritage Park trail maintains barrier-free slope (<=1:20), with tactile guide strips at key nodes
- All transit station entrances provide barrier-free connections to bus stops and bike-sharing points
- Signal-assisted crossing devices at intersections and key crossing points
- Bilingual + icon + braille composite signage for wayfinding

**Spatial Inclusivity:**
- Public seating, shading, and drinking fountains meet wheelchair accessibility requirements (>=900mm clearance)
- Accessible restrooms and nursing rooms at each key area
- Anti-glare lighting with high-contrast ground markings for visually impaired users
- Activity spaces for elderly (fitness, board games, shaded seating)

**Digital Inclusivity:**
- Free Wi-Fi at public spaces and pedestrian corridors
- Information kiosks support voice interaction and large-font display
- Multi-language and voice-assist options on civic agent interfaces
- Bridge digital divide: equal public services for residents unfamiliar with smart devices

### Operations & Conversion Path

Multi-phase operation strategy for the three key areas:

| Dimension | Zhongzhi Park AI Accelerator | AI Origin Community | Dazhongsi AI Cluster |
| --- | --- | --- | --- |
| Suggested Operator | Government-guided + market platform | University collaboration + community | Flagship enterprise-led + ecosystem alliance |
| Startup Funding | Government industry fund + policy loans | Tech transfer fund + social capital | Enterprise investment + industry fund |
| HR Requirement | Professional operations team 50-80 | Community operations team 20-30 | Enterprise services team 30-50 |
| Key KPIs | Enterprise count, tech transfer rate, patents | Open-source activity, partner universities, talent density | Revenue growth, innovation events, global influence |
| Risk Management | Tech iteration risk, policy compliance | Talent churn, community engagement | Industry cycle, market competition |
| Conversion Path | Incubation--acceleration--industrialization | Lab--prototype--market validation | Product--platform--ecosystem |

**Phasing:**
- Near-term (1-3 years): Infrastructure upgrade, pedestrian system connection, 1-2 flagship projects
- Mid-term (3-7 years): Three key areas substantially formed, AI innovation ecosystem initial scale
- Long-term (7-15 years): Complete AI industry chain, global AI innovation pilgrimage destination

**Governance:**
- "Jing-Zhang AI Innovation Belt" Joint Governance Committee (government + enterprise + community + academia)
- Community participation mechanism with regular public hearings and plan updates
- AI Ethics & Safety Oversight Committee for ethical AI application
- Digital twin operations management platform for real-time monitoring of space efficiency and service quality

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
- This section's bibliography entry is based on the site package registration; full provenance and licenses are in the structured source list [source:SITE-PACKAGE]
\* Concept phasing is a research assumption, subject to adjustment upon official regulatory plan, transit, funding, and property rights confirmation. Does not constitute an implementation commitment.
