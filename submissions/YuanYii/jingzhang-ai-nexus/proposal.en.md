---
title: "Centennial Jing-Zhang AI Nexus Urban Design Proposal: Jing-Zhang Smart Vein · Boundless Green"
proposal_slug: "jingzhang-ai-nexus"
author_github: "YuanYii"
language: "en"
version: "1.3.0"
date: "2026-08-09"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
package_type: "professional_design_package"
package_state: "ready_for_review"
summary: "Formal urban design proposal for Centennial Jing-Zhang AI Nexus, centered on Smart Rail Axis & Boundless Green Belt, covering three-level scope, three key areas, AI ecosystem and implementation."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
keywords: ["Jing-Zhang Heritage", "AI Innovation Corridor", "Urban Design", "Smart Rail", "Boundless Green"]
---

# Centennial Jing-Zhang AI Innovation Belt Urban Design: Smart Axis & Unbounded Green

## Design Basis and Source List

This formal proposal takes the *Call for Prequalification for the International Urban Design Solicitation of the Centennial Jing-Zhang AI Innovation Belt* published by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources as its primary basis, with the provisional boundaries, key areas, enums, ranges and source registry maintained in `brief/site-package/` as its machine-readable basis. Before generation, the AI agent fully read `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json` and `data/processed/agent_fact_pack.md`, and built task, scope, source-use and gap checklists. The announcement requires urban-design depth at the regulatory detailed planning level and at the comprehensive implementation planning level, so the narrative is tightly coupled with GeoJSON layers, indicator tables, the A3 booklet, the A0 boards and the HTML visualization.

Evidence-chain references include: [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE], [source:PUBLIC-THINKTANK-REGISTRY], [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] and [depth:existing_conditions_diagnosis], demonstrating a rigorous design built from the announcement, the agent-facing taskbook, standards, boundaries, the processed fact pack and the source-use matrix.

![Evidence chain and submission package relationship](assets/figures/site-overview.en.png)

As the official precise redline is not yet fully published, this formal package is generated from `brief/site-package/geometry/provisional_boundaries.geojson`. Both `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` are marked `provisional_constraint` / `official_boundary=false`, for generation, self-check, visualization and design discussion only. When official boundaries are released, all spatial indicators and layers can be seamlessly recalculated.

The readable interpretation of the boundary and key areas corresponds to [data:geometry/site_boundary.geojson#SITE-001], [data:geometry/key_areas.geojson#PROV-KEY-001] and [metric:site_area_sqm], [metric:key_area_count].

## Three-Level Scope Framework

The proposal follows the three tiers defined by the announcement:

1. **Regional study scope (43.6 km²)**: the AI industry ecosystem, strategic positioning, innovation chain and future urban form of the southern Haidian innovation corridor, bounded by the North 5th Ring Road to the north, the Jingzang Expressway to the east, Xizhimen Outer Street to the south, and Wanquanhe Road to the west.
2. **Overall design scope (11.4 km²)**: the 1-2 km urban belt around the Jing-Zhang Railway Heritage Park, forming the overall renewal framework, industrial spatial layout, blue-green slow-traffic network, transport/municipal support and urban-character control.
3. **Key area scope (368.4 ha)**: three core districts designed in detail from north to south — Zhongzhiyuan AI Self-Innovation Acceleration Area (192.1 ha), Beijing AI Origin Community (104.3 ha), and Dazhongsi AI Industry Cluster (72.0 ha).

Depth items are governed by [depth:three_level_scope_framework] and [depth:overall_spatial_structure]; spatial evidence follows [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#PROV-KEY-001].

![Three-tier scope and spatial work framework](assets/figures/land-use-structure.en.png)

The core concept is named **"Jing-Zhang Smart Vein · Unbounded Green"**: using the century-old Jing-Zhang Railway Heritage Park as the historical, cultural and public-space spine, the three key districts as intelligent innovation anchors, and the universities, tech companies and transit nodes along the corridor as the living and social network, forming a future urban pattern of "one belt, three cores, ten districts in linkage, and a composite blue-green slow loop."

| Tier | Core design question | Proposal answer | Data anchor |
| --- | --- | --- | --- |
| Regional study (43.6 km²) | How to coordinate a global AI ecosystem and future urban form | Build a full-chain ecosystem axis: university research - open-source collaboration - enterprise incubation - public experience - global communication | compliance_matrix.json, standard_matrix.json |
| Overall design (11.4 km²) | How to map industrial renewal, land use and blue-green slow traffic | Optimize four functional land types; 31.1% green ratio with a continuous barrier-free slow network | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key areas (368.4 ha) | How to reach regulatory-depth design in three districts | Garden-type acceleration area, campus-adjacent origin community, urban cluster district with refined spatial moves | [data:geometry/key_areas.geojson#PROV-KEY-001] to #PROV-KEY-003 |

## Coordinated Research Area: Industry and Future City Research

### Global Benchmarks & Regional Synergy

Six global AI ecosystem benchmarks:

1. **San Francisco Mission Bay**: university-industry-VC clustering, applied to the Origin Community.
2. **London Tech City**: high-density renewal and creative-industry integration, empowering Dazhongsi.
3. **Toronto MaRS Discovery District**: innovation-hub shared research resources, guiding Zhongzhiyuan.
4. **New York Cornell Tech**: open campus with corporate test sandboxes, strengthening industry-academia links.
5. **Boston Kendall Square**: high walkability and dense innovation networks, optimizing the blue-green slow system.
6. **Singapore Punggol Digital District**: system-level connectivity, distributed sensing, micro-grids and smart environmental governance.

**Three-areas-two-wings synergy and Beijing-Tianjin-Hebei linkage**: beyond the three cores, the proposal builds a "two-wings" system: westward, the Zhongguancun Technology-Service Wing links financial capital; eastward, the Xiaoyuehe Scenario-Empowerment Wing links the Xueyuan Road area. Northward, it receives basic-research spillover from Future Science City and Huairou Science City; southward, it radiates to the Economic-Technological Development Area (EDA) for intelligent manufacturing — forming a complete Beijing-Tianjin-Hebei AI industrial chain: "Huairou basic research - Jing-Zhang algorithm innovation - EDA hardware manufacturing." Bilingual wayfinding, an international demo center and bilingual open-source resource packs at Dazhongsi and the Origin Community support global brand communication. At community level, the proposal conceptually shares the Jing-Zhang green loop with residential communities along the corridor such as **Beiwai Community (北纬社区)** through slow greenways, pocket parks and embedded community service points, extending the corridor's public value to existing residents.

#


### Three Positionings and Functional Coordination

The proposal maps the three positionings defined in the taskbook ([source:AGENT-TASKBOOK]) onto the spatial structure, forming a complete coordination loop with the five functions and the three-areas-two-wings layout:

1. **Centennial Jing-Zhang Cultural Belt**: the Jing-Zhang Railway Heritage Park as the cultural spine, linking Qinghuayuan Station Heritage Site, the heritage park and heritage nodes along the corridor — the foundation of the historical narrative and public space (see the Cultural Narrative chapter).
2. **Urban AI Living Experience Belt**: via the Xiaoyuehe Scenario-Empowerment Wing and the Origin Community, deploying perceptible scenarios such as AI wayfinding, the AI Lifestyle Sample Street and edge-compute stations, weaving AI experience into daily urban life.
3. **AI Integration & Innovation Belt**: with Zhongzhiyuan, the Origin Community and Dazhongsi as three anchors, integrating basic research, open-source collaboration, industrial incubation and global exchange — the industrial core of the five functions.

The three belts map one-to-one onto the "one belt, three cores, ten districts, composite blue-green slow loop" structure: the cultural belt is the park spine, the living-experience belt is the slow loop and community nodes, and the innovation belt is the three key districts.

The regional study builds a world-class AI innovation ecosystem by leveraging Haidian's universities and institutes (Tsinghua, Peking University, CAS), top platforms (Beijing Academy of Artificial Intelligence, Tsinghua AI Institute), and leading AI unicorns, proposing an "AI full-stack self-innovation system" and a "world-class AI innovation ecosystem."

The naming system is **"Jing-Zhang AI Innovation Corridor"** (百年京张AI创新带). The Logo direction combines the century-old railway double-rail line with a neural-network topology, symbolizing "the cross-era encounter of century-old industrial civilization and future artificial intelligence."

![Logo concept: double rails and neural topology](assets/figures/logo.en.png)

The Logo concept is built from "double rails + node network": two rails symbolize the engineering spine of the century-old Jing-Zhang Railway; nodes and links symbolize the collaboration network of open-source communities, foundation models and agents. Deep blue and gold are used for international communication and industrial-heritage character (a conceptual visual direction for professional brand teams to deepen).

Per [source:AGENT-TASKBOOK] and [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], the proposal fully responds to the "five functions":

1. **AI full-stack self-innovation system**: Zhongzhiyuan as the core, laying out an autonomous and controllable software-hardware ecosystem from chips and frameworks to foundation models and edge devices.
2. **World-class AI innovation ecosystem**: a highly open open-source community, data-element circulation mechanisms and transnational R&D nodes.
3. **New paradigm of AI+ scenario empowerment**: opening city-level test and validation scenarios in mobility, healthcare, education and public services.
4. **Intelligent, vibrant AI city**: exploring edge-compute stations, explainable wayfinding and unobtrusive perception slow-traffic systems.
5. **Global discourse power in AI governance**: a safety-governance sandbox and a permanent venue for international AI forums.

### Element Guarantee and Support Mechanisms

This proposal organizes eight core element guarantees as conceptual recommendations for deeper professional refinement:

- **Land & Space**: Focuses on stock renewal, prioritizing low-efficiency industrial sites along railways.
- **Industry Mechanisms**: Full chain from campus origin to open-source collaboration and enterprise conversion.
- **Funding Mechanisms**: Proposes an AI innovation belt guidance fund linked with VC and industry capital.
- **Talent Mechanisms**: Relies on Tsinghua, Peking University and CAS with young scientist apartments.
- **Compute Network**: Two-level compute network: core AI compute center + edge compute stations.
- **Data Governance**: Public data open lists and compliant data trading pilots at Dazhongsi.
- **Scenario Mechanisms**: L1-L3 layered scenario admission sandboxes.
- **Zhongguancun Tech Service Wing**: Westward linkage to Zhongguancun capital and IP services.

All mechanisms are conceptual proposals subject to official approval.

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The overall design scope (11.4 km²) reaches regulatory detailed planning urban-design depth, satisfying [depth:land_use_layout] and [depth:development_intensity_controls]. Four functional zones are planned in `geometry/land_use.geojson`:

- **LU-001: AI R&D innovation and full-stack self-innovation land (311.9 ha)**: model R&D, algorithm research and software-hardware synergy, located in the northern Zhongzhiyuan area.
- **LU-002: Jing-Zhang unbounded green park and open space (270.8 ha)**: a north-south green belt and waterfront park system formed by the linear spine park, pocket parks and riparian green space, reaching a 31.1% green ratio.
- **LU-003: AI industry services and commercial headquarters land (309.4 ha)**: headquarters, an international demo hub and fintech services in the southern Dazhongsi area.
- **LU-004: AI origin international talent community and quality living land (249.2 ha)**: young-scientist apartments, campus-adjacent incubators and a living sample street in the central Origin Community.

Regulatory depth is governed by [standard:MOHURD-CONTROL-DETAILED-PLANNING]: [data:geometry/land_use.geojson#LU-001] expresses land-use structure, [data:geometry/buildings.geojson#BLDG-001] building footprints, [data:geometry/roads.geojson#ROAD-001] transport organization, and [metric:building_footprint_area_sqm] verifies the 1.80 km² total building footprint.

As a **conceptual recommendation** for form and intensity, a "stepped setback along the heritage park" guidance is proposed: the first interface along the park is suggested for low-rise stepped setback, the inner core for mid-to-high-rise control, and landmark towers for point control (as conceptual recommendation, subject to official regulatory approval), keeping the skyline open and the blue-green space generous.

## Detailed Design of Key Areas

The key areas cover 368.4 ha in three districts, responding to [depth:three_key_area_detailed_design]:

![Key areas index and design tasks](assets/figures/key-areas.en.png)

### 1. Zhongzhiyuan AI Acceleration Area (192.1 ha)
- **Positioning**: garden-type full-stack self-innovation district.
- **Spatial moves**: a low-carbon innovation waterfront along the Qinghe River; a national AI model test ground and software-hardware compatibility validation lab.
- **AI scenarios**: concept-planning "02 Safety-Governance Sandbox" and "06 Qinghe Low-Carbon Innovation Waterfront" with low-carbon compute and standards workshops.
- **References**: [data:geometry/key_areas.geojson#PROV-KEY-001], [depth:three_key_area_detailed_design].

### 2. Beijing AI Origin Community (104.3 ha)
- **Positioning**: campus-adjacent commercialization and youth-talent community.
- **Spatial moves**: stitching gaps at Qinghua East Road West and Wudaokou between campuses and parks; converting existing industrial buildings into low-cost open-source collaboration spaces.
- **AI scenarios**: concept-planning "01 Open-Source Launch Hall" and "07 Campus-adjacent Commercialization Street" as high-density 24-hour developer hubs.
- **References**: [data:geometry/key_areas.geojson#PROV-KEY-002], [source:AGENT-TASKBOOK].

### 3. Dazhongsi AI Industry Cluster (72.0 ha)
- **Positioning**: urban intelligent economy and international exchange district.
- **Spatial moves**: TOD integration around Dazhongsi station; a four-quadrant elevated pedestrian link connecting commercial and headquarters uses.
- **AI scenarios**: concept-planning "05 Dazhongsi International Demo Lounge" and "08 Data-Element & Digital-Asset Lounge" for international AI summits and product launches.
- **References**: [data:geometry/key_areas.geojson#PROV-KEY-003], [metric:key_area_count].

| Key district | Area (ha) | Positioning | Core spatial moves | Typical AI scenarios | Evidence |
| --- | --- | --- | --- | --- | --- |
| Zhongzhiyuan | 192.1 | Garden-type full-stack innovation | Qinghe waterfront restoration, model test ground | Safety sandbox, low-carbon compute waterfront | [data:geometry/key_areas.geojson#PROV-KEY-001] |
| Origin Community | 104.3 | Campus-adjacent commercialization | Campus-park slow-traffic stitching, adaptive reuse | Open-source launch hall, commercialization street | [data:geometry/key_areas.geojson#PROV-KEY-002] |
| Dazhongsi | 72.0 | Urban intelligent economy & exchange | TOD integration, four-quadrant elevated links | Demo lounge, data-element lounge | [data:geometry/key_areas.geojson#PROV-KEY-003] |

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

The proposal defines 6 typical personas and deploys 12 spatial scenario cards plus 3 AI pilgrimage landmarks, per [source:AGENT-TASKBOOK]:

### 6 Personas and need responses
1. **Open-source developers**: deeply dependent on communities, contribution display and nighttime exchange; 24h open-source launch hall and co-working spaces in the Origin Community.
2. **Startups**: low-cost offices, compute subsidies and test access; shared edge-compute stations and model red-team sandboxes in Zhongzhiyuan.
3. **Headquarters visitors**: international display, business meetings and efficient transit; international demo lounge and TOD links at Dazhongsi.
4. **Residents**: park leisure, community services and low-disruption renewal; slow green loop and embedded smart community service points along the heritage park.
5. **University faculty and students**: campus-adjacent commercialization and cross-campus exchange; campus-park stitching paths and commercialization stations on Qinghua East Road.
6. **International visitors & academic guests**: Value high-profile conferences, roadshow experiences and international communication; the proposal provides international simultaneous-interpretation lounges and academic release centers at Dazhongsi and Origin Community.
6. **International visitors and academic guests**: high-level conferences and global communication; international interpretation lounges and academic release centers at Dazhongsi and the Origin Community.

### 12 AI scenario cards

| No. | Scenario card | Spatial carrier | Design description | AI Industry Testing Scenario |
| --- | --- | --- | --- | --- |
| 01 | Open-Source Launch Hall | Origin Community | Global foundation-model launches, live code-contribution visualization wall, open-source salons | ☐ |
| 02 | Safety-Governance Sandbox | Zhongzhiyuan | Translating model safety evaluation, red-team testing and standards into transparent visitor and test nodes | ☑ |
| 03 | Edge-Compute Station | Community nodes in overall scope | Green-energy and storage-backed edge compute for autonomous vehicles, robots and portable devices | ☐ |
| 04 | AI Wayfinding | Heritage Park vitality belt | Unobtrusive vision and AR wayfinding: accessible navigation, crowding alerts, immersive history | ☐ |
| 05 | Dazhongsi Demo Lounge | Dazhongsi | International launch and media hub for agents, embodied AI and digital-content firms | ☐ |
| 06 | Qinghe Low-Carbon Waterfront | Zhongzhiyuan riverside | Wetland ecology, rain-flood resilience and outdoor AI testing as a green public living room | ☑ |
| 07 | Campus Commercialization Street | Origin Community edge | IP services, legal consulting, proof-of-concept labs and early-stage VC incubation | ☐ |
| 08 | Data-Element Lounge | Dazhongsi | Secure, auditable display and confirmation windows for compliant data and digital-asset trading | ☑ |
| 09 | AI Lifestyle Sample Street | Community-commerce junctions | Smart healthcare, unmanned retail, AI community education and domestic service experiences | ☐ |
| 10 | Global AI Week Route | Full blue-green public space | A walkable 5 km pilgrimage route linking heritage, open source, test fields and demo halls | ☐ |
| 11 | Multi-species Eco-Sensing Node | Zhongzhiyun riverside | Concept proposal: deploy distributed environmental sensing network for water quality, bird calls, micro-climate data to support ecology and carbon sink research | ☑ |
| 12 | Non-Digital Alternative Service Station | Origin Community & Dazhongsi service nodes | Preserve physical braille signs, paper guides, human-staffed counters and one-button human call to ensure digital inclusion and accessibility | ☐ |
| 11 | AI Community Smart Service Node | Community nodes in overall scope | Embedded smart healthcare, unmanned delivery and elderly assistive services | ☐ |
| 12 | Edge Compute Charging Station | Heritage Park & transit hubs | Solar PV and battery storage backing edge compute and drone/robot charging | ☑ |

### 3 AI pilgrimage landmarks
1. **Jing-Zhang AI Origin Coordinate Tower**: at the junction of the Heritage Park and Qinghua East Road, merging the original rail tracks with a fiber-optics compute tower — the intersection of Chinese industrial and digital civilization.
2. **Zhongzhi Open-Source Light Launch Hall**: in the Origin Community center, with a 360° digital wall showing global open-source commit pulses — a spiritual home for programmers.
3. **Qinghuayuan AI Origin Mark Park**: an ecological park around Qinghuayuan Station Heritage Site with AI sculpture and an AR history corridor.

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

### Fine-grained Retain-Renovate-Demolish Principles Based on Existing Park

Given that Jing-Zhang Railway Heritage Park Phase I has been completed and opened, and Phase II is underway ([source:OFFICIAL-ANNOUNCEMENT], the announcement references "existing implemented areas of the park"), this proposal strictly adheres to a fact-based approach: it does not redraw or alter the completed park landscaping, but treats it as a static "base layer" to be fully preserved, with AI scenarios and smart facilities overlaid on top. All spatial actions are precisely focused on "stitching slow-mobility breakpoints on both sides of the park" (e.g., Qinghua East Road West Entrance, Wudaokou intersections), "implanting edge-computing supply nodes," and "activating existing factory buildings along the line as near-campus transformation spaces," achieving a seamless weave of historical-cultural, urban-life, and future-innovation threads.

Land use follows [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The building approach follows [depth:retain_renovate_demolish] and [depth:height_massing_character]:

- **Conceptual recommendation — Retain**: protect Qinghuayuan Station Heritage Site, Jing-Zhang railway relics and well-structured university and research buildings; avoid large-scale demolition.
- **Conceptual recommendation — Renovate**: structural reinforcement, facade modernization and smart micro-circulation upgrades for aging industrial buildings and inefficient towers.
- **Conceptual recommendation — Demolish & Rebuild**: explore localized renewal of illegal structures and unsafe temporary buildings to release land for greenery and innovation (proportions pending engineering surveys).

Building-scale indicators: the **conceptual** total building footprint in the overall scope is 1.80 km² ([metric:building_footprint_area_sqm]), corresponding to a building density of about 15.8% (scenario estimate, pending official regulatory confirmation). As official FAR and total floor-area controls are not yet published ([metric:floor_area_ratio] = unknown), the proposal sets no FAR or total floor-area values, to be calculated when the official redline and controls are released.

## Transport, Rail, Municipal Infrastructure, and Public Services

![Mobility, slow traffic and blue-green composite system](assets/figures/mobility-bluegreen.en.png)

Mobility and municipal planning follow [depth:traffic_rail_slow_parking] and [depth:municipal_new_infrastructure]:

### 1. Transit & TOD
- **Station stitching**: improve integration at Wudaokou, Qinghua East Road West and Dazhongsi stations; explore a 15-minute rail-walk circle.
- **Elevated and underground links**: explore three-dimensional links at Dazhongsi and Wudaokou to ease vehicle-pedestrian conflicts (pending municipal engineering feasibility).

### 2. Slow traffic & green mobility
- **Continuous slow greenway**: a continuous cycling and walking trunk along the Heritage Park crossing major intersections (alignment and length pending professional verification).
- **Autonomous micro-circulation**: concept-planning autonomous shuttle loops connecting stations, parks and communities.

### 3. Three test-scenario tiers and admission matrix

| Tier | Areas | Admission & review | Data security & exit | Typical applications |
| --- | --- | --- | --- | --- |
| L1 Open display | Dazhongsi demo lounge | Filing-based; mature tech displayed directly | De-identified public data; immediate disconnect on risk | Smart wayfinding, open-source hall, low-carbon compute display |
| L2 Restricted testing | Origin commercialization street | Joint approval; ethics review and human posts | Strict access control; manual takeover on anomaly | Autonomous shuttles, commercialization experience, digital lounge |
| L3 Sandbox validation | Zhongzhiyuan test ground | Strong supervision; whitelist and expert review | Physical isolation; hardware circuit-breakers and forced data destruction | Safety sandbox, software-hardware compatibility, unmanned inspection |

- **Distributed edge-compute network**: discreet edge-compute micro-base stations in park nodes and public buildings as conceptual new infrastructure.
- **Green energy & resilient municipal**: exploring rooftop PV and micro-grids to power AI compute with low-carbon energy.

## Blue-Green Network, Public Space, and Urban Character

The blue-green plan follows [depth:blue_green_public_space], using the Heritage Park as the north-south ecological spine with the Qinghe and Xiaoyuehe rivers, forming a "one axis, two rivers, multiple corridors, a hundred parks" pattern.

- **Green ratio & public space**: 3.55 km² of park green space, a 31.1% green ratio ([metric:green_ratio]), and a 25.3% public open-space ratio ([metric:public_space_ratio]).
- **Urban character**: three material languages — centennial Jing-Zhang industrial red brick, Zhongguancun tech gray aluminum, and future AI clear glass — shaping interfaces that balance heritage and futurity; continuous park greenways connect 12 communities and universities.

### Qinghe Low-Carbon Waterfront Multi-Species Eco-Sensing and Resilience System

Concept proposal to explore a multi-species eco-sensing and resilience system at the Qinghe low-carbon waterfront (for professional teams to further develop):

- **Multi-modal Environmental AI Sensing Network**: Concept proposal to explore deploying distributed environmental sensors along the Qinghe waterfront to collect water quality pH/dissolved oxygen, wetland bird calls and habitat trajectories, soil moisture and local microclimate heat-island data in real time, providing traceable data support for ecological protection and urban governance.
- **Stormwater and Carbon-Sink Intelligent Regulation Algorithm**: Concept proposal to explore, combined with meteorological large-model early warning, the feasible direction of dynamically regulating rain gardens and wetland water-storage gates to achieve autonomous balance between flood prevention and carbon-sink maximization.
- **Multi-Species-Friendly Spatial Interface**: Concept proposal to adopt low-color-temperature anti-glare nighttime lighting and bird-collision-prevention glass interfaces to achieve harmonious coexistence of humans, agents and natural life. The above sensor deployment and gate regulation are conceptual suggestions and do not constitute engineering implementation plans or municipal approval conclusions.

## Renewal Projects, Implementation Policy, and Phasing

Following [depth:renewal_project_list] and [depth:phasing_implementation], the proposal sets a "visible in three years, exemplary in five, benchmark in ten" phasing plan, with responsible-department suggestions and risk-control measures for major works:

| No. | Project | Existing issue & pre-survey | Suggested participants | Approval dependence & costing | O&M KPI formula & baseline | Risk & stop condition | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| JZ-01 | Slow-traffic gap stitching | Ring roads sever the network; on-site pedestrian survey needed | Planning/Transport Commission (suggested) | Traffic assessment; per-meter costing | Connectivity = connected gaps / total gaps | Funding break; fall back to ground guidance | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Qinghe ecological experience | Lack of waterfront access; flood assessment needed | Water/Parks Bureau (suggested) | EIA; per-green-area costing | Greening survival > 90% | Flood risk; downgrade standards | [data:geometry/green_space.geojson#GREEN-001], [data:geometry/constraints.geojson#CONSTRAINT-002] |
| JZ-03 | Industrial-building adaptive reuse | Vacancy; structural inspection needed | DRC/University Office (suggested) | Construction approval; per-sqm costing | Occupancy baseline > 80% | Weak leasing; convert to general offices | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | Link system feasibility | TOD transfer inconvenient; passenger-flow simulation needed | Transit Co./DRC (suggested) | Over-limit review; composite costing | Daily link flow > baseline | Structural limits; drop elevated links | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | Compute-center scenario | Compute gap; energy assessment and grid capacity needed | Industry/Environment Bureau (suggested) | Energy assessment; per-rack costing | PUE < 1.2 (baseline 1.5) | Energy overrun; throttled degraded operation | [data:geometry/constraints.geojson] |
| JZ-06 | Smart component deployment | Lacks interactive wayfinding; weak-current survey needed | Urban Management/Culture Bureau (suggested) | Road-occupancy approval; per-point costing | Device uptime > 95% | Privacy dispute; disable sensing modules | [data:geometry/phasing.geojson#PHASE-001] |

### Long-term operation & governance roadmap
- **Privacy & safety sandbox**: data minimization, "usable but invisible" processing and periodic destruction for all deployments; human-in-the-loop posts and digital-exclusion compensation services.
- **Component library & cultural wayfinding**: unified "Jing-Zhang Smart Vein" visual identity (Logo), heritage-based honor display walls, bilingual barrier-free physical guidance.

### Data gaps, privacy protection & degradation mechanisms
- **Known gaps**: official precise redline and key-area polygons are not yet published; all area indicators, spatial anchors, FAR and height controls are scenario studies based on provisional boundaries and will be recalculated when official baselines arrive. University and enterprise information is from public think-tank data (see registry).
- **Privacy & safety assessment**: perception/automation scenarios enforce (1) transparent data flows; (2) data minimization with 7-day destruction; (3) human-in-the-loop takeover posts; (4) appeal channels and non-digital alternatives (manual guidance).

## Cultural Narrative: Jing-Zhang Heritage, Zhongguancun Culture & AI New Culture

The cultural narrative is the systematic expression of the "Centennial Jing-Zhang" theme. The proposal organizes Jing-Zhang railway heritage, Zhongguancun innovation spirit and AI new culture into a "past-present-future" three-layer narrative mapped to space (agent.5 of [source:AGENT-TASKBOOK]).

### 1. Jing-Zhang railway heritage resource system

Three tiers by protection level and spatial character:

- **Heritage-grade nodes**: protected sites such as Qinghuayuan Station Heritage Site serve as narrative origins and spatial anchors, limited to protective display and low-impact adaptation (conceptual; subject to heritage approval).
- **Site-grade linear heritage**: the Jing-Zhang Railway Heritage Park and relics form the north-south narrative spine for commemoration, education and slow mobility.
- **Memory-grade elements**: station buildings, crossings, bridges and industrial structures along the line are translated into legible places via interpretation boards, paving symbols and digital archives.

### 2. Zhongguancun culture and AI new-culture narrative

A three-line narrative of "one railway, one street, one revolution":

- **Railway line (1905-1909)**: Zhan Tianyou's "人"-shaped railway and indigenous engineering spirit — the "self-innovation" gene.
- **Zhongguancun line (1980s-2010s)**: from Electronics Street to the National Innovation Demonstration Zone — the "dare to be first" spirit.
- **AI line (2010s-future)**: open-source communities, foundation models and agent collaboration — the "open co-creation" AI new culture.

The three lines are reinforced respectively in Zhongzhiyuan (self-innovation), the Origin Community (open-source co-creation) and Dazhongsi (global exchange), forming a complete culture-space coupling.

### 3. Spatial cultural system and carriers

- **Three cultural segments**: northern "industrial-heritage narrative" (Zhongzhiyuan-Qinghe), central "innovation-culture narrative" (Origin Community), southern "future-AI narrative" (Dazhongsi), forming a progressive cultural experience sequence along the park spine.
- **Material and color language**: red brick, gray aluminum and clear glass in zone-guided application, consistent with the urban-character chapter.
- **Cultural event carriers**: honor display walls, open-source contributor code walls, AI milestone nodes and a global developer honor wall, sharing the public-space component library with agent.4.

### 4. Wayfinding, signage and symbol system

- The cultural signage system derives from the "double-rail + neural topology" motif, with four subsystems: directional, cultural interpretation, tactile accessible and bilingual information signage.
- The cultural signage system is explicitly distinguished from the belt-wide Logo system: the Logo is brand identity (overall visual recognition); cultural signage is spatial wayfinding language (place recognition). They share a motif but have different functions, avoiding confusion.

### 5. Urban temperament and international communication narrative

- Urban temperament line: "Jing-Zhang Smart Vein, Unbounded Green" — rationality (engineering spirit), openness (open-source culture), inclusion (human-centered governance).
- International narratives: "Where Rails Meet Neurons", "Open City, Open Source, Open Future", "A Century of Autonomy", supported by bilingual wayfinding, the international demo center and bilingual open-source community resource packs.
- All narratives are conceptual recommendations; no unauthorized use of portraits, trademarks or copyrighted materials.

### 6. Honor Display System and Public Space Component Library

**Honor Display System** (corresponding to honor_display_system for agent.4):
- **Display Objects**: Open-source contributors, AI milestone achievements, developer honors, enterprise innovations, and community co-creations.
- **Carriers**: Code Contribution Wall (Origin Community Launch Hall), Honor Display Wall (Jing-Zhang Park interface), AI Milestone Nodes (three pilgrimage landmarks), Global Developer Honor Wall (Dazhongsi Lounge).
- **Governance**: Quarterly review and update by Open-Source Governance Committee; all displays presented bilingually with attribution.

**Public Space Component Library** (corresponding to component_library for agent.4):
- **Modular Component List**: Seating, landscape lighting, wayfinding signage, interactive screens, barrier-free facilities, shade/rain shelters, water/charging points, Wi-Fi/edge compute nodes, rain garden modules.
- **Design Principles**: Unified by "Steel Rails x Neural Topology" motif; modular, replaceable, and deployable in phases; coordinated with heritage, green, and blue line constraints; temporary facilities can be safely withdrawn.
- **Application**: Configured on demand along the Jing-Zhang green loop, slow-traffic greenways, and three key areas.

## AI Scenario Admission, Open Operation & Community Governance

### 1. Industrial test-scenario admission matrix
- **Unmanned delivery test section**: L4+ fleets; closed-road low-peak night data required; exit after two at-fault incidents.
- **Open-source algorithm evaluation sandbox**: university teams and filed enterprises; physically isolated offline compute; mandatory code-security and bias review.
- **Embodied-intelligence inspection park**: security and environmental robots; whitelist management during non-crowded hours.

### 2. Developer community governance & annual events
An "Open-Source Governance Committee", an honor display component library, and a Code Wall in the Origin Community launch hall. An event system of "annual developer conference, quarterly algorithm challenges, monthly geek salons" with an enterprise landing fast track forms the "talent aggregation - idea validation - investment incubation" loop.

### 2.1 City-as-Repo Open Source Spatial Governance System

Concept proposal to establish a "City-as-Repo" open-source spatial governance system (for professional and governance teams to further develop):

- **Spatial Pull Request (Spatial PR) Mechanism**: Concept proposal to abstract spatial actions proposed by merchants, R&D institutions and communities — such as smart facility deployment, computing station installation, and slow-mobility micro-upgrades — as "Spatial PRs." Any spatial change requires a machine-readable proposal including GeoJSON impact scope, computing power consumption, noise/light pollution assessment, and community impact analysis.
- **Three-Party Code Review**: Concept proposal for a joint review panel comprising the Open Source Governance Committee (technical review), compliance review party (compliance review, with the role and authority of planning departments to be confirmed later as a conceptual suggestion), and community resident representatives (experience review). Concept proposal to establish a three-party review process where "proposals may enter spatial baseline pilot only after approval."
- **One-Click Rollback Action**: Concept proposal to establish a rapid rollback mechanism — if noise threshold exceedance, computing disturbance, privacy breach or accident risk occurs during whitelist operation, the system triggers an incident response procedure, with a conceptual target of "algorithm shutdown and facility rollback (Rollback) within 24 hours" to restore the original spatial baseline.

The above governance mechanisms are all conceptual suggestions and do not constitute determined policies, approval processes or implementation arrangements. Specific review entities, authorities and processes are subject to confirmation by competent authorities.

### 3. AI ethics, privacy & safety review
- **Data minimization & privacy**: "unobtrusive vision" and environmental monitoring must not collect biometrics; local anonymization and periodic destruction.
- **Human oversight & appeal**: all public-service AI must offer one-click human transfer and on-site appeal devices against bias and digital exclusion.
- **Inclusive design**: child-friendly, barrier-free and non-digital alternatives (physical guidance and staffed service posts) for vulnerable groups.

### 3.1 Accessible Digital Inclusion and Non-Digital Alternative Services

- **Universal Physical Fallback**: Across all 12 AI scenario cards, in addition to vision/AR-based smart accessible wayfinding, physical space must 100% preserve traditional bilingual braille physical signs, tactile paving, and paper guide brochures.
- **Offline Non-Digital Service Windows**: Preserve offline physical human-staffed reception windows at Origin Community and Dazhongsi public service nodes, ensuring that elderly, disabled, and non-smart-device users can access all public space services without barriers.
- **Human-in-the-Loop Real-Time Appeals**: All smart interactive facilities must be equipped with one-button human-call buttons and 24-hour human customer service takeover mechanisms to eliminate "algorithmic exclusion."

### 4. Event Brand and Communication Visual System

**Event Matrix**: "Jing-Zhang Smart Vein" as total brand, featuring annual developer conference, quarterly algorithm contests and monthly geek salons.
**Visual Extensions**: Branding motifs derived from steel rails x neural network topology, digital twin virtual venues.
**Conversion**: Linking international demo lounge and campus commercialization street.

## Metrics, Area Recalculation, and Compliance Matrix

![Core indicator recalculation and evidence chain](assets/figures/metrics-evidence.en.png)

All known indicators exactly match GeoJSON features:

- **Site area [metric:site_area_sqm]**: about 11.41 km² (11.4 km²)
- **Key areas [metric:key_area_count]**: 3 districts, 3,684,000 m² (368.4 ha)
- **Building footprint [metric:building_footprint_area_sqm]**: about 1.80 km²
- **Green ratio [metric:green_ratio]**: 31.1% (about 3.55 km² / 11.41 km²)
- **Public-space ratio [metric:public_space_ratio]**: 25.3% (about 2.89 km² / 11.41 km²)
- **FAR [metric:floor_area_ratio]**: to be calculated after official regulatory controls are released
- **Compliance response**: fully responds to announcement tasks 1.3, 1.4, 1.5 and agent tasks agent.1 - agent.6.

## Risk, Copyright, and Compliance

1. **Provisional boundary warning**: built on `provisional_boundaries.geojson`; one-click recalculation after the official redline, without affecting content review.
2. **AI generation & compliance review**: generated by an AI agent from public sources and regulations under data-minimization and privacy principles; no non-public confidential data.
3. **Copyright & legal disclaimer**: COMMUNITY-DISPLAY-ONLY license; all images, drawings and code assets are cleared under the open-call rules. All spatial moves and compute deployments are conceptual design recommendations, not formal administrative approval conclusions.

## Visual Index

Index of all visual assets, drawings and digital exhibits:

| Asset | Path | Description |
| --- | --- | --- |
| Site Overview | assets/figures/site-overview.png | Evidence chain, three scopes & package |
| Land Use Structure | assets/figures/land-use-structure.png | Three scopes & spatial structure |
| Three Key Areas | assets/figures/key-areas.png | Key areas index & design tasks |
| Mobility & Blue-Green | assets/figures/mobility-bluegreen.png | Mobility & green-blue network |
| Metrics Evidence | assets/figures/metrics-evidence.png | Metrics recalculation & sources |
| Logo Concept | assets/figures/logo.png | Steel rails x neural topology |
| Proposal HTML | report/proposal.html | Offline rendered proposal |
| Interactive Dashboard | visual/index.html | Overview, land use, mobility & scenarios |
| A3 Booklet | drawings/a3-booklet.pdf | Full design booklet |
| A0 Boards | drawings/a0-boards.pdf | Key exhibit boards |

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- data/processed/agent_fact_pack.md
- Machine-readable reference index: [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [depth:metrics_recalculation], [data:geometry/site_boundary.geojson#SITE-001], [metric:site_area_sqm]
