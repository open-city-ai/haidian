---
title: "智脉京张 · Jingzhang AI Pulse"
author_github: "weijunlv"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Using the century-old Jingzhang Railway culture as the pulse and AI innovation as the intelligence, the scheme constructs a spatial structure of 'one pulse, three cores, and two wings,' transforming the 43.6-square-kilometer innovation corridor from a railway heritage corridor into a global AI innovation pilgrimage destination. The scheme covers six major tasks: naming system, AI ecosystem, scenario cards, pilgrimage landmarks, cultural narrative, and long-term operations."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "ai-health-service-navigation", "ai-cultural-guide", "robot-delivery-low-speed"]
iteration: "v1.0"
---

# 智脉京张 · Jingzhang AI Pulse

## Design Basis and Data Inventory

This scheme takes the "Announcement on International Call for Urban Design Proposals for the Century-Old Jingzhang AI Innovation Belt – Qualification Pre-qualification," issued by the Beijing Municipal Planning and Natural Resources Commission, Haidian Branch, as its primary authoritative basis [source:OFFICIAL-ANNOUNCEMENT], and the excerpt of the open-source call task brief addressed to global intelligent agents as the basis for Agent task coverage [source:AGENT-TASKBOOK]. Prior to generation, the scheme fully read `design_brief.json`, `agent_taskbook.json`, `allowed_design_space.json`, `sources.json`, `planning_limits.json`, `standards.json`, `visual_style_recommendations.json`, and `data/source_registry.json`, establishing a four-dimensional correspondence of tasks, scope, data, and gaps.

The data availability boundaries are clearly defined as follows [source:SOURCE-REGISTRY]: 5 formal-ready sources (official announcement, Agent task brief, urban design administration measures, regulatory detailed planning preparation and approval measures, and land use classification guide), and 1 provisional-only source (maintainer-defined temporary rough boundary). The provisional boundary is used solely for AI generation, display, and self-checking, and shall not serve as an official redline or precise area basis [source:BOUNDARY-SOURCE]. Current regulatory planning conditions (floor area ratio, building height, building density, green space ratio, setback line) are all marked as missing in the public data package; all development intensity judgments in the scheme are written as conceptual recommendations or pending confirmation items [source:PROCESSED-FACT-PACK].

The scheme adopts the maintainer-provided `provisional_boundaries.geojson` as the temporary design boundary. This boundary was formed by verifying the textual description of the four boundary extents and approximate area values under EPSG:4548, yielding a calculated area of approximately 11.41 square kilometers (announced value 11.4 square kilometers), with the three key areas totaling approximately 3.69 square kilometers (announced value 3.684 square kilometers) [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]. After replacing the official polygon, all land use, roads, green space, public space, buildings, phasing, and indicators must be recalculated.

![Site Overview and Evidence Chain Diagram](assets/figures/site-overview.png)

## Three-Tier Scope Working Framework

The scheme organizes its work according to the three-tier scope defined in the announcement. These three tiers are not isolated drawing sets but a progressive logic from strategy to implementation.

**Coordination Research Scope (43.6 square kilometers)** focuses on the AI industry ecosystem chain, global innovation benchmarking, the collaborative relationships of the Three Areas and Two Wings, and the study of future AI city forms. This tier does not produce parcel-level design but provides the industrial direction, spatial strategy, and ecological mechanism framework for the overall design [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

**Overall Design Scope (11.4 square kilometers)** focuses on the overall urban renewal framework for the urban area and industrial district within 1–2 kilometers around the Jingzhang Railway Heritage Park. This tier achieves the urban design depth of Regulatory Detailed Planning, including land use layout, spatial structure, transportation organization, municipal capacity, urban character, and a renewal project list [standard:MOHURD-CONTROL-DETAILED-PLANNING]. Since the public data package lacks official regulatory planning conditions, development intensity indicators are all marked as pending confirmation [source:PROCESSED-FACT-PACK].

**Key Area Scope (368.4 hectares)** involves detailed design of the three key areas, achieving the urban design depth of a comprehensive planning implementation scheme [depth:three_level_scope_framework]. The three key areas from north to south are: Brain Valley (Zhizhiyuan AI Acceleration Area) (192.1 ha), Origin Community (Beijing AI Origin Community) (104.3 ha), and Bell Quarter (Dazhongsi AI Industry Cluster) (72.0 ha) [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count].

![Three-Tier Scope and Spatial Working Framework Diagram](assets/figures/land-use-structure.png)

## Coordination Research Scope: Industry and Future City Research

### Overall Concept: Jingzhang AI Pulse

The scheme proposes "智脉京张" (Jingzhang AI Pulse) as the overall concept for the corridor. The Jingzhang Railway was the first mainline railway designed and built independently by the Chinese (led by Zhan Tianyou in 1909), representing the starting point of China's modern engineering self-reliant innovation. One hundred and seventeen years later, the same corridor is given the new mission of an AI innovation belt. The two characters "智脉" (AI Pulse) overlay the physical pulse of the railway with the data pulse of AI—the railway was once the external pulse connecting the city, while AI is the internal neural network driving urban evolution.

The core metaphor of the concept is "pulse" (脉): the Jingzhang Railway Heritage Park is the physical conduit, the three key areas are three beating nodes, the two wings are the capillary networks supplying and returning, the blue-green slow-mobility system is the circulatory system, and the AI scenarios are the terminal nerves. This metaphor is not decorative naming but the logic of spatial organization—innovation resources flow along the pulse, converge at nodes, diffuse through the wings, and are connected into a whole by the slow-mobility ring [source:AGENT-TASKBOOK].

### Naming System and Visual Identity

| Level | Chinese Name | English Name | Meaning |
|-------|-------------|-------------|---------|
| Corridor Name | 智脉京张 | Jingzhang AI Pulse | Railway pulse × AI neural network |
| North Core | 智谷 | Brain Valley | Zhizhiyuan · Self-reliant innovation acceleration |
| Central Core | 源社区 | Origin Community | AI origin · Living laboratory |
| South Core | 钟界 | Bell Quarter | Dazhongsi · Industrial resonance |
| East Wing | 催化翼 | Catalyst Wing | Zhongguancun technology services |
| West Wing | 体验翼 | Experience Wing | Xiaoyue River scenario empowerment |

The logo direction is recommended to use a horizontal pulse line as the main element: the left end features an abstract geometry of railway sleepers, the middle section transitions into circuit traces, and the right end dissolves into data flow particles. The color scheme recommends "Jingzhang Iron Grey" (#3A3A3A) as the base color, "AI Intelligence Blue" (#2563EB) as the pulse color, and "Jingzhang Copper Orange" (#D97706) as the cultural accent color. The logo must remain recognizable in monochrome and be suitable for stone inscription, wayfinding, digital interfaces, and print. The above are conceptual directions; font and graphic copyright clearance must be completed before official use [source:AGENT-TASKBOOK].

### Three Positionings and Five Functions

The three positionings—Century-Old Jingzhang Cultural Belt, Urban AI Life Experience Belt, and AI Convergence Innovation Belt—correspond spatially to the heritage park cultural main axis, the community living service belt, and the industrial R&D cluster area, respectively. The five functions—AI full-stack self-reliant innovation system, world-class AI innovation ecosystem, AI+ scenario empowerment new paradigm, intelligent AI vibrant city, and AI governance global discourse power—correspond respectively to Brain Valley R&D, Origin Community ecosystem, Experience Wing scenarios, slow-mobility vitality network, and public governance sandbox [source:AGENT-TASKBOOK].

### Three Areas and Two Wings Collaborative Loop

The Three Areas and Two Wings are not static functional zones but an innovation circulation loop: Brain Valley produces technology → Origin Community validates scenarios → Bell Quarter achieves industrialization → Catalyst Wing connects capital and global resources → Experience Wing collects user feedback → returns to Brain Valley to drive iteration. The spatial carriers of this loop are the Jingzhang Railway Heritage Park slow-mobility main axis and three innovation connecting corridors perpendicular to the main axis [depth:overall_spatial_structure].

### Global AI Innovation Ecosystem Case Studies

The scheme studied 8 global AI innovation ecosystem cases, extracting transferable spatial and operational experiences:

| Case | Location | Core Experience | Transferable Elements |
|------|----------|----------------|---------------------|
| Silicon Valley Sand Hill Road | California, USA | Venture capital concentration drives innovation | Catalyst Wing capital connection space |
| London King's Cross Knowledge Quarter | London, UK | Railway station transformation into innovation district | Heritage park transformation methodology |
| Paris Station F | Paris, France | Train station converted into world's largest startup campus | Bell Quarter large-space renovation strategy |
| Singapore Smart Nation | Singapore | Government-led scenario opening | Scenario opening operational mechanism |
| Shenzhen Nanshan AI Industrial Park | Shenzhen, China | Vertical integration of industry chain | Brain Valley industry chain spatial organization |
| Tokyo Kashiwa Smart City | Chiba, Japan | University-community-enterprise co-creation | Origin Community co-creation mechanism |
| Helsinki AI Valley | Helsinki, Finland | Open-source data and ethical governance | AI governance sandbox design |
| Zhongguancun Inno Way | Beijing, China | Existing innovation ecosystem foundation | Catalyst Wing succession and upgrade path |

Among these, the railway transformation experiences of London King's Cross and Paris Station F are of the most direct reference value to this project: both transformed railway heritage spaces into innovation clusters rather than demolishing and rebuilding [source:AGENT-TASKBOOK]. Zhongguancun Inno Way, as an existing foundation, should not be duplicated in the Catalyst Wing design; instead, it should play an "amplifier" role.

### Comprehensive Planning and Territorial Spatial Planning Innovation

The scheme proposes exploring territorial spatial planning innovation at three levels: first, in terms of land use compatibility, designing a flexible "AI Innovation Comprehensive Land Use" category for AI R&D, testing, and display functions, allowing R&D, commercial, display, and residential uses to be mixed on the same parcel; second, in terms of spatial provision, utilizing the Jingzhang Railway setback space and underground railway heritage for distributed computing centers and AI testing grounds; third, in terms of implementation mechanisms, proposing a "scenario-guided, data-driven" urban renewal model that attracts enterprise settlement through AI scenario opening and guides spatial iteration through data feedback [standard:MOHURD-URBAN-DESIGN-MEASURES].

## Overall Design Scope: Urban Renewal and Urban Design at Regulatory Detailed Planning Depth

### Spatial Structure

The spatial structure of the overall design scope is "One Pulse, Three Cores, Two Wings, and Three Rings":

- **One Pulse**: The Jingzhang Railway Heritage Park slow-mobility main axis, running 11.4 kilometers north-south, connecting the three key areas, serving as the composite carrier of cultural narrative, public space, and slow-mobility transportation.
- **Three Cores**: Brain Valley (Zhizhiyuan), Origin Community (AI Origin), and Bell Quarter (Dazhongsi), respectively bearing R&D acceleration, scenario validation, and industrial clustering.
- **Two Wings**: East Wing Catalyst (Zhongguancun Technology Service Corridor) and West Wing Experience (Xiaoyue River Scenario Empowerment Belt), extending the innovation ecosystem east and west, respectively.
- **Three Rings**: Blue-green slow-mobility ring (Heritage Park + Qing River + Xiaoyue River), innovation connecting ring (three corridors perpendicular to the main axis), and AI service ring (distributed AI service node network).

This structure is reflected in `geometry/land_use.geojson` through land use zoning, in `geometry/roads.geojson` through the road network, and in `geometry/green_space.geojson` and `geometry/public_space.geojson` through blue-green and public spaces [depth:land_use_layout].

### Overall Urban Renewal Framework

The renewal strategy adopts a four-category classification of "Retain-Renovate-Demolish-New":

- **Retain**: University and research areas (vicinity of Tsinghua University, Beihang University, USTB, etc.), completed high-quality residential areas, heritage-protected buildings, and historical remnants.
- **Renovate**: Inefficient industrial land, aging commercial spaces, and idle railway setback spaces—injected with AI R&D, testing, and display functions.
- **Demolish**: Dilapidated buildings and severely inefficient structures—after demolition, priority is given to supplementing public space and green areas.
- **New**: AI innovation complexes, distributed computing centers, AI community service facilities, and public space nodes.

The renewal project list corresponds to `geometry/phasing.geojson` and is advanced in three phases: near-term (2026–2028), mid-term (2029–2031), and long-term (2032–2035) [depth:phasing_plan].

### Land Use Layout

Land use zoning is coded according to the "Guide to Land and Sea Use Classification for Territorial Spatial Investigation, Planning, and Use Regulation" issued by the Ministry of Natural Resources [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The main land use types within the overall design scope include: AI R&D and innovation land (0802/0804 mixed), residential land (0701/0702), commercial and service industry land (0901/0902), public management and public service land (0801), green space and open space land (14), and transportation land (12). Land use zoning covers the entire submission boundary without gaps or overlaps [data:geometry/land_use.geojson#LU-001].

### Building Scale and Development Intensity

Since the public data package lacks official regulatory planning conditions (floor area ratio, building height, building density, green space ratio, and setback line are all missing), all development intensity judgments in the scheme are conceptual recommendations [source:PROCESSED-FACT-PACK]. It is recommended that the Brain Valley area be dominated by mid-to-low-rise R&D buildings (conceptual recommended height 24–45 meters), the Origin Community by mixed high-rise buildings (conceptual recommended height 30–60 meters), and the Bell Quarter by renovation and renewal (conceptual recommended height 18–36 meters). These recommendations must be verified and confirmed by a professional team upon obtaining official regulatory planning conditions.

## Detailed Design of Key Areas

![Three Key Areas Index and Design Tasks Diagram](assets/figures/key-areas.png)

### Brain Valley · Zhizhiyuan AI Self-Reliant Innovation Acceleration Area (192.1 ha)

**Positioning**: The core engine of AI full-stack self-reliant innovation, benchmarked against Silicon Valley Sand Hill Road + Shenzhen Nanshan, focusing on large model training, computing infrastructure, and foundational framework R&D.

**Spatial Structure**: Organized around three elements: "R&D clusters + computing hub + testing ground." R&D clusters are arranged along both sides of the Heritage Park, forming 4–6 flexibly divisible innovation groups; the computing hub utilizes the underground railway setback space for a distributed computing center; the testing ground is set within the green spaces between clusters as an outdoor AI application verification zone.

**Building Renewal**: Retain existing university research buildings, renovate inefficient factory buildings into R&D spaces, and construct 2–3 new AI innovation complexes. Conceptual recommended FAR 2.0–3.0, building height 24–45 meters.

**Transportation Organization**: Rail transit (Line 13, Changping Line) as the backbone, the Heritage Park slow-mobility path as the internal main axis, with autonomous driving microcirculation test roads. It is recommended to add an underground AI innovation corridor connection between Wudaokou Station and Qinghuadonglu Xikou Station.

**Public Space**: Centered on "Brain Valley Central Park," connecting the R&D clusters, with an AI outdoor testing display area and a developer exchange plaza.

**AI Scenarios**: Autonomous driving microcirculation test zone, AI large model training visualization center, open-source developer camp.

**Implementation Risks**: Railway setback underground space use rights, land use compatibility around universities, and municipal capacity need to be confirmed [data:geometry/key_areas.geojson#PROV-KEY-001].

### Origin Community · Beijing AI Origin Community (104.3 ha)

**Positioning**: A living laboratory for AI scenario validation, benchmarked against Tokyo Kashiwa + Singapore Smart Nation, focusing on AI+ lifestyle, AI+ governance, and AI+ education scenario experiments.

**Spatial Structure**: Organized around three elements: "community living circle + AI scenario laboratory + open block." The community living circle organizes residential, commercial, and service functions within 15-minute walking range units; AI scenario laboratories are embedded in community public facilities, making residents' daily use a form of scenario testing; open blocks eliminate enclosed walls, forming a permeable AI experience network.

**Building Renewal**: Primarily retention and renovation. Old residential buildings undergo AI smartification renovation (adding sensors, smart access control, energy management); ground-floor commercial spaces undergo AI business replacement. Conceptual recommended FAR 1.5–2.5, building height 18–36 meters.

**Transportation Organization**: Primarily slow-mobility and microcirculation buses, with the Heritage Park slow-mobility path running through the community center, AI signal-optimized intersections, and smart parking guidance.

**Public Space**: Centered on "Origin Point Plaza," with AI community butler service kiosks, community AI art walls, and neighborhood exchange spaces.

**AI Scenarios**: AI + community health monitoring station, AI + education personalized laboratory, AI + governance sandbox, AI + neighborhood butler service.

**Implementation Risks**: Community AI-ification requires strict privacy boundaries and manual review mechanisms, and resident participation in consensus building is needed [data:geometry/key_areas.geojson#PROV-KEY-002].

### Bell Quarter · Dazhongsi AI Industry Cluster (72.0 ha)

**Positioning**: A resonance field for AI industrialization and commercial applications, benchmarked against Paris Station F + London King's Cross, focusing on AI+ commerce, AI+ business, and intelligent native consumption.

**Spatial Structure**: Organized around three elements: "industrial accelerator + smart consumption street + business hub." The industrial accelerator is converted from large-space buildings (warehouses/markets), providing office and display space for AI startups; the smart consumption street is arranged along both sides of Dazhongsi Station, with AI retail experience stores and unmanned commerce; the business hub connects to the subway transfer, forming a cluster of AI enterprise headquarters.

**Building Renewal**: Focus on renovating inefficient commercial spaces and market buildings around Dazhongsi, retaining structures while updating functions. Conceptual recommended FAR 2.0–3.0, building height 18–36 meters.

**Transportation Organization**: TOD development centered on Dazhongsi Station, with a smart consumption pedestrian street at ground level and underground connections between the subway and commercial spaces.

**Public Space**: Centered on "Bell Toll Plaza," with an AI-generated art public exhibition space and a smart consumption experience zone.

**AI Scenarios**: AI + smart retail experience, AI + business office assistant, AI + generative art exhibition, smart consumption scenario laboratory.

**Implementation Risks**: The property rights of commercial spaces around Dazhongsi are complex, and renovation requires coordinating multiple stakeholder interests [data:geometry/key_areas.geojson#PROV-KEY-003].

## AI Innovation Ecosystem, User Personas, and AI+ Scenarios

### AI Innovation Ecosystem Map

The scheme constructs a "Three Layers and Six Rings" AI innovation ecosystem map:

- **Infrastructure Layer**: Computing power (distributed computing centers), data (public data open platform), algorithms (open-source framework community)
- **R&D and Transformation Layer**: Universities (Tsinghua, Beihang, etc.), enterprises (AI leading enterprise R&D centers), incubators (AI startup acceleration spaces)
- **Application Scenario Layer**: Testing grounds (outdoor verification spaces), experience stores (AI retail spaces), communities (living laboratories)

The six circulation rings are: technology → scenarios → data → iteration → industry → capital, each ring corresponding to a type of spatial carrier and operational mechanism [source:AGENT-TASKBOOK].

### User Personas (5 types + 1 extended type)

| Persona | Core Needs | Spatial Carrier | AI Scenario |
|---------|-----------|----------------|-------------|
| AI Researcher | Computing power, exchange, focus | Brain Valley R&D clusters | Large model training visualization |
| AI Entrepreneur | Incubation, financing, showcase | Bell Quarter accelerator | Investor matching via AI |
| Community Resident | Convenience, safety, health | Origin Community living circle | AI neighborhood butler service |
| University Student | Practice, socializing, growth | Origin Community laboratory | AI personalized learning |
| Urban Visitor | Experience, culture, check-in | Heritage Park main axis | AI+AR Jingzhang spatiotemporal narrative |
| Urban Manager (extended type) | Perception, decision-making, efficiency | AI governance sandbox | AI governance decision support |

### AI Scenario Cards (12 cards, including 3 industrial testing and verification scenarios)

**Scenario Card 1: AI Intelligent Signal Optimization and Autonomous Driving Test Corridor** [Industrial Testing and Verification Scenario]
- Spatial location: Roads along both sides of the Heritage Park in Brain Valley
- Service targets: AI researchers, autonomous driving enterprises
- Operational data: Traffic flow, signal status, vehicle trajectories (desensitized)
- Privacy boundary: License plate and facial information desensitized in real time; raw data not stored
- Manual review: Traffic management authorities retain manual intervention authority
- Operating entity: Haidian District Transportation Commission + AI enterprise consortium
- Visualization layer: `geometry/roads.geojson`
- Risk: Requires traffic management authority approval; test periods and scope require dynamic control

**Scenario Card 2: AI Community Health Monitoring Station**
- Spatial location: 15-minute living circle nodes in Origin Community
- Service targets: Community residents (especially elderly groups)
- Operational data: Vital signs indicators (voluntarily uploaded), health trends
- Privacy boundary: Health data encrypted and stored; accessible only to the individual and authorized physicians
- Manual review: Abnormal indicators confirmed by community physicians
- Operating entity: Community health service center + AI medical enterprise
- Risk: Medical data compliance must conform to the Personal Information Protection Law

**Scenario Card 3: AI Personalized Education Laboratory** [Industrial Testing and Verification Scenario]
- Spatial location: Origin Community AI Education Center
- Service targets: University students, community youth
- Operational data: Learning progress, knowledge graph mastery
- Privacy boundary: Student data used for educational purposes only; parents may view
- Manual review: Teachers periodically review AI-recommended learning paths
- Operating entity: University school of education + AI education enterprise
- Risk: Educational equity must be ensured; algorithmic bias must be avoided

**Scenario Card 4: AI Intelligent Native Retail Experience**
- Spatial location: Bell Quarter smart consumption street
- Service targets: Consumers, retail brands
- Operational data: Consumption preferences (anonymized), footfall heat map
- Privacy boundary: Consumption data anonymized and aggregated; no individual tracking
- Manual review: Consumers may opt out of AI recommendations
- Operating entity: Commercial operation company + AI retail enterprise
- Risk: Must prevent consumption discrimination and price discrimination

**Scenario Card 5: AI Urban Perception and Emergency Response**
- Spatial location: AI service node network across the entire scope
- Service targets: Urban management departments
- Operational data: Urban operation indicators, incident alerts
- Privacy boundary: Public space perception data excludes biometric features
- Manual review: Emergency response decisions made by human commanders
- Operating entity: Haidian District Urban Operation Management Center
- Risk: Perception scope and data retention period must be strictly limited

**Scenario Card 6: AI-Assisted Creative Workspace**
- Spatial location: Brain Valley R&D clusters and Bell Quarter accelerator
- Service targets: AI researchers, entrepreneurs, designers
- Operational data: Work collaboration patterns, space utilization efficiency
- Privacy boundary: Work data managed by enterprises; not connected to public platforms
- Manual review: AI-generated content is the responsibility of the creator
- Operating entity: Space operator
- Risk: Copyright and liability attribution for AI-generated content

**Scenario Card 7: Jingzhang Railway AR Spatiotemporal Narrative**
- Spatial location: Full alignment of the Heritage Park slow-mobility main axis
- Service targets: Urban visitors, community residents
- Operational data: Location information (real-time), AR interaction logs
- Privacy boundary: Location data used in real time and not stored
- Manual review: Narrative content reviewed by cultural experts
- Operating entity: Heritage Park management office + AI cultural tourism enterprise
- Risk: Historical narrative accuracy requires expert oversight

**Scenario Card 8: AI Neighborhood Butler Service**
- Spatial location: Origin Community neighborhood center
- Service targets: Community residents
- Operational data: Service requests, community announcements, neighborhood interactions
- Privacy boundary: Personal requests encrypted; community interactions public
- Manual review: Community social workers periodically evaluate AI service quality
- Operating entity: Community residents' committee + AI service enterprise
- Risk: Must prevent AI from replacing interpersonal interaction

**Scenario Card 9: AI Distributed Energy Dispatch** [Industrial Testing and Verification Scenario]
- Spatial location: Brain Valley computing center and Origin Community
- Service targets: Energy managers, AI enterprises
- Operational data: Energy consumption load, distributed energy output
- Privacy boundary: Energy data is facility-level; does not involve individuals
- Manual review: Energy dispatch strategies reviewed by energy engineers
- Operating entity: Energy enterprise + AI dispatch enterprise
- Risk: Energy security must be ensured; AI dispatch cannot be fully separated from human oversight

**Scenario Card 10: AI Government Affairs Assistant and Decision Support**
- Spatial location: AI governance sandbox (Origin Community area)
- Service targets: Government staff, public
- Operational data: Government process data, public feedback
- Privacy boundary: Personal government affairs information protected by law
- Manual review: AI recommendations adopted by government staff decisions
- Operating entity: Haidian District Government
- Risk: Transparency and explainability of AI-assisted decision-making

**Scenario Card 11: AI Smart Sports and Health Park**
- Spatial location: Green spaces along the Heritage Park slow-mobility main axis
- Service targets: Community residents, sports enthusiasts
- Operational data: Exercise data (voluntarily uploaded), facility utilization rate
- Privacy boundary: Exercise data voluntarily uploaded by individuals; anonymized aggregate statistics
- Manual review: Health recommendations reviewed by professional coaches
- Operating entity: Park management office + AI sports enterprise
- Risk: Exercise safety reminders must be timely and accurate

**Scenario Card 12: AI Generative Art Public Exhibition**
- Spatial location: Bell Quarter Bell Toll Plaza and Heritage Park public space nodes
- Service targets: Urban visitors, art enthusiasts, community residents
- Operational data: Interaction data (anonymized), artwork generation parameters
- Privacy boundary: No personal biometric data collected
- Manual review: Exhibited AI-generated works selected by curators
- Operating entity: Art institution + AI creative enterprise
- Risk: Copyright attribution and content compliance of AI-generated artworks

### Scenario-Space-Operation Mapping

All 12 scenario cards are mapped to specific spatial locations (SCENARIO_NODE in GeoJSON layers), service targets (user personas), operating entities, and risk control measures. The 3 industrial testing and verification scenarios (Cards 1, 3, and 9) all have defined testing boundaries, data collection scopes, and exit mechanisms, and are not open to the general public during testing [source:AGENT-TASKBOOK].

## Land Use, Building Scale, and Demolish-Renovate-Retain Plan

### Land Use Layout

Land use in the overall design scope is divided into 6 major categories and 12 sub-categories. The main land use proportions (calculated based on the provisional boundary, pending recalculation after official polygon replacement) [metric:green_ratio] [metric:public_space_ratio]:

- AI R&D and innovation land: approximately 28% (including mixed-use land)
- Residential land: approximately 22%
- Commercial and service industry land: approximately 15%
- Public management and public service land: approximately 12%
- Green space and open space land: approximately 13%
- Transportation land: approximately 10%

Land use zoning in `geometry/land_use.geojson` covers the entire submission boundary with gap-free, non-overlapping polygons [depth:land_use_layout] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

### Demolish-Renovate-Retain Classification

| Type | Spatial Location | Strategy |
|------|-----------------|----------|
| Retain | University research areas, completed high-quality residential, heritage-protected buildings | Maintain current state, strengthen AI smartification upgrade |
| Renovate | Inefficient factory buildings, aging commercial spaces, railway setback spaces | Function replacement, inject AI R&D/testing/display |
| Demolish | Dilapidated buildings, severely inefficient structures | After demolition, prioritize public space and green areas |
| New | AI innovation complexes, computing centers, community service facilities | Build per conceptual recommended intensity, pending regulatory confirmation |

### Building Scale

The total building footprint area is approximately 311,000 square meters (calculated based on provisional geometry) [metric:building_footprint_area_sqm]. Since FAR control conditions are missing, the total building scale cannot be determined at this time. Conceptual recommendations: Brain Valley total building scale approximately 2–3 million square meters, Origin Community approximately 0.8–1.2 million square meters, Bell Quarter approximately 0.5–0.8 million square meters. All of the above are conceptual recommendations and must be verified by a professional team upon obtaining official regulatory planning conditions [source:PROCESSED-FACT-PACK].

## Transportation, Rail Transit, Municipal Infrastructure, and Public Service Facilities

### Transportation Organization

**Rail Transit**: Building on the existing Line 13, Changping Line, Line 10, and Line 4, it is recommended to study adding an underground connecting corridor between Wudaokou Station and Qinghuadonglu Xikou Station to strengthen the rail accessibility of the Brain Valley area. Dazhongsi Station serves as the TOD core of the Bell Quarter, with recommended optimization of transfer flows [depth:transportation_organization].

**Road Traffic**: Maintain the existing urban arterial road skeleton, focusing on optimizing the microcirculation road network. "AI Innovation Connecting Corridors" are set along both sides of the Heritage Park, connecting the three key areas with the two wings. Brain Valley has autonomous driving test roads, and Origin Community has AI signal-optimized intersections.

**Slow-Mobility System**: The Heritage Park slow-mobility main axis serves as the north-south spine, with three slow-mobility connecting corridors in the perpendicular direction connecting the east and west wings. The slow-mobility system is integrated with blue-green spaces, forming a continuous network that is "cyclable, walkable, and pause-able."

![Transportation, Slow Mobility, and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

### Municipal and New-Type Infrastructure

**Distributed Computing**: Utilize the railway setback underground space for distributed computing centers, providing nearby computing services for AI enterprises. The computing centers adopt liquid cooling technology, with waste heat recovery for heating surrounding buildings.

**Smart Municipal**: Deploy smart power grids, smart water systems, and smart sanitation systems, enabling AI perception and predictive maintenance of municipal facilities.

**New-Type Infrastructure**: Deploy edge computing nodes and 5G/6G base stations along the Heritage Park slow-mobility main axis, providing low-latency communication support for AI scenarios.

## Blue-Green Space, Public Space, and Urban Character

### Jingzhang Railway Heritage Park Vitality Belt

The Heritage Park slow-mobility main axis is the core public space of the scheme. It is recommended to add three functional layers on top of the existing railway heritage: a cultural narrative layer (railway history display + AI milestones), an activity experience layer (AI scenario nodes + community activity plazas), and an ecological connectivity layer (blue-green corridors + biodiversity corridors). The main axis will not have new large-scale buildings; AI service facilities will be inserted through "light intervention" [source:OFFICIAL-ANNOUNCEMENT].

### Blue-Green Space System

The blue-green space is structured as "one axis, two rivers, and three nodes": the one axis being the Heritage Park green axis, the two rivers being the Qing River and Xiaoyue River blue-green corridors, and the three nodes being the central parks within the three key areas. The green space ratio is approximately 12.3% (calculated based on the provisional boundary) [metric:green_ratio], and the public space ratio is approximately 7.3% [metric:public_space_ratio]. These must be recalculated after the official polygon replacement.

### AI Pilgrimage Landmarks (3)

**Landmark 1: Pulse Tower (智脉塔)**
- Location: At the junction of Brain Valley and Origin Community, on the Heritage Park main axis
- Concept: A vertical pulse device whose facade uses an LED array to display real-time AI computing power usage and innovation metric data streams, simulating railway signal light rhythms with light pulses at night. Conceptual recommended height 45–60 meters.
- Function: Data visualization landmark + observation platform + AI innovation metric release platform
- Cultural association: Railway signal lights → data pulse, a century-old inheritance

**Landmark 2: Zhan Tianyou AI Memorial Plaza**
- Location: Center of Origin Community, on the Heritage Park main axis
- Concept: Using Zhan Tianyou's "herringbone" (switchback) railway design as the plan composition prototype, the plaza paving unfolds in a herringbone pattern, with an AI interactive installation at the center—visitors can converse with AI via voice or gesture to learn about Jingzhang Railway history and the future of the AI innovation belt. The plaza does not have tall structures; it is primarily an open plane.
- Function: Cultural memorial + public gathering + AI interactive experience
- Cultural association: Zhan Tianyou's engineering innovation → AI engineering innovation

**Landmark 3: Open Source Honor Wall**
- Location: Wing of the Bell Toll Plaza, Bell Quarter, at the southern end of the Heritage Park main axis
- Concept: A continuous digital honor display wall, inscribing the Agent names and contributor GitHub names of selected schemes in the manner of stone inscription, complemented by digital screens dynamically displaying open-source community contribution data. The wall uses Jingzhang iron grey stone, with digital screens embedded in the stone surface.
- Function: Contributor memorial + open-source culture display + community check-in
- Cultural association: Collective memory of railway builders → collective honor of AI open-source contributors

The above landmarks are all conceptual recommendations and shall not be represented as approved for construction. Prior to formal implementation, professional reviews of land use, heritage protection, structure, and safety must be completed [source:AGENT-TASKBOOK].

### Honor Display System

The scheme proposes building a four-level honor display system along the Heritage Park main axis: milestone nodes (major AI development events), contributor walls (Agent and developer contributions), achievement display columns (open-source projects and technical breakthroughs), and a global developer honor belt (international AI community contributions). This system interfaces with the project call's memorial system; Agents and contributors of selected schemes may have their names permanently displayed [source:AGENT-TASKBOOK].

### Urban Character Control

Character control uses "Jingzhang Iron Grey + AI Intelligence Blue + Natural Green" as the base color palette. Buildings are recommended to adopt a clean technological style, avoiding excessive decoration. Building heights along the Heritage Park should be higher in the north and lower in the south, forming a gradient from Brain Valley (high-density R&D) to Bell Quarter (medium-density commercial). Roof forms are encouraged to incorporate green roofs and photovoltaic integration [standard:MOHURD-URBAN-DESIGN-MEASURES].

## Renewal Project List, Implementation Policies, and Phasing Plan

### Renewal Project List

| No. | Project Name | Type | Spatial Location | Dependencies | Implementing Entity | Phase |
|-----|-------------|------|-----------------|--------------|---------------------|-------|
| P-01 | Brain Valley R&D Cluster Phase I | New construction | Northern Brain Valley | Railway setback rights confirmation | AI enterprises + park | Near-term |
| P-02 | Brain Valley Computing Center | New construction | Brain Valley railway setback underground | Underground space use rights | Computing enterprises | Near-term |
| P-03 | Heritage Park Slow-Mobility Main Axis Completion | Renovation | Full alignment | Park management coordination | Park management office | Near-term |
| P-04 | Origin Community AI Smartification | Renovation | Origin Community entire area | Resident consensus | Community + AI enterprises | Near-term |
| P-05 | Bell Quarter Large-Space Renovation | Renovation | Dazhongsi vicinity | Property rights coordination | Commercial operator | Mid-term |
| P-06 | Pulse Tower | New construction | Brain Valley–Origin Community junction | Land use approval | Government-led | Mid-term |
| P-07 | Zhan Tianyou AI Memorial Plaza | New construction | Origin Community center | Heritage review | Government-led | Mid-term |
| P-08 | Open Source Honor Wall | New construction | Bell Quarter Bell Toll Plaza | Land use approval | Government-led | Mid-term |
| P-09 | Brain Valley R&D Cluster Phase II | New construction | Southern Brain Valley | Phase I assessment | AI enterprises + park | Long-term |
| P-10 | AI Innovation Connecting Corridors | Renovation | Three connecting corridors | Road rights | Transportation department | Long-term |

### Implementation Policy Recommendations

- Land use policy: Recommend establishing a flexible "AI Innovation Comprehensive Land Use" category, allowing R&D, commercial, and display mixing
- Spatial policy: Recommend allowing railway setback underground space for computing infrastructure
- Industrial policy: Recommend attracting enterprise settlement through scenario opening, and lowering innovation thresholds through data sharing
- Talent policy: Recommend configuring AI talent apartments and exchange spaces in the Origin Community
- Funding policy: Recommend establishing an AI innovation belt dedicated fund to guide social capital participation

All of the above are conceptual recommendations and do not constitute established government decisions [source:AGENT-TASKBOOK].

### Phasing Plan

- **Near-term (2026–2028)**: Heritage Park slow-mobility main axis completion, Brain Valley Phase I and computing center construction, initiation of Origin Community AI-ification renovation
- **Mid-term (2029–2031)**: Bell Quarter large-space renovation, construction of three AI pilgrimage landmarks, initiation of AI innovation connecting corridors
- **Long-term (2032–2035)**: Brain Valley Phase II, full completion of connecting corridors, formation of the corridor-wide AI scenario network

Phasing corresponds to `geometry/phasing.geojson` [depth:phasing_plan].

### Global AI Innovation Activity System

**Annual Flagship Event**: Jingzhang AI Innovation Conference (every autumn), with four sections: main forum, open-source contributor summit, AI scenario open day, and public experience week.

**Quarterly Brand Event**: AI Scenario Opening Week (every quarter), hosted in rotation by different key areas, opening testing grounds and laboratories for enterprise and public experience.

**Monthly Regular Event**: Developer community gatherings (every month), held at the Brain Valley open-source developer camp for tech sharing and hackathons.

**Continuous Operation Mechanism**: AI scenario open platform (online), where enterprises can apply to use testing grounds and computing resources; developer community self-governance committee, responsible for daily community operations and contribution assessment; international communication channel, enhancing global attention through English websites, international conferences, and media partnerships.

**Attraction and Transformation Path**: Scenario testing → enterprise incubation → industrial implementation → capital connection → global expansion. Each stage corresponds to different spatial carriers and policy support.

All activities, investment attraction, funding, and policy arrangements above are conceptual recommendations or deepening directions, and shall not be represented as established government arrangements [source:AGENT-TASKBOOK].

## Indicator System, Area Recalculation, and Compliance Matrix

### Core Indicators

| Indicator | Value | Unit | Source | Confidence |
|-----------|-------|------|--------|------------|
| Site Area | 11,412,825 | sqm | geometry/site_boundary.geojson | high |
| Building Footprint Area | 310,807 | sqm | geometry/buildings.geojson | medium |
| Green Space Ratio | 12.3% | ratio | geometry/green_space.geojson | medium |
| Public Space Ratio | 7.3% | ratio | geometry/public_space.geojson | medium |
| Number of Key Areas | 3 | count | geometry/key_areas.geojson | high |
| Floor Area Ratio | Pending confirmation | ratio | planning_limits.json | unknown |
| Building Height | Pending confirmation | m | planning_limits.json | unknown |
| Number of AI Scenario Cards | 12 | count | proposal.md | high |
| Industrial Testing and Verification Scenarios | 3 | count | proposal.md | high |
| User Persona Types | 6 | count | proposal.md | high |
| AI Pilgrimage Landmarks | 3 | count | proposal.md | high |

![Core Indicators Recalculation and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

### Area Recalculation Notes

All areas are calculated based on the provisional boundary projected under EPSG:4548. The provisional boundary's calculated area (11,412,825 sqm) differs from the announced declared area (11,400,000 sqm) by approximately 0.1%, within the provisional_rough accuracy range [metric:site_area_sqm]. After replacing the official polygon, all area, ratio, and scale indicators must be recalculated [source:BOUNDARY-SOURCE].

### Compliance Matrix Coverage

`compliance_matrix.json` covers 3 items in Section 1.3, 3 items in Section 1.4, 10 items in Section 1.5 of the announcement, and 6 items (agent.1–agent.6) from the Agent task brief, totaling 22 mandatory tasks. Each task is mapped to scheme sections, GeoJSON layers, indicators, drawings, visualization panels, sources, assumptions, and self-check items [depth:compliance_coverage].

### Professional Standards Coverage

`standard_matrix.json` covers 6 mandatory professional standards: project announcement, Agent task brief, urban design administration measures, regulatory detailed planning preparation and approval measures, land use classification guide, and architectural design depth provisions (the latter marked as needs_official_file) [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

### Design Depth Coverage

`design_depth_matrix.json` covers all required formal design depth items, including the three-tier scope framework, spatial structure, land use layout, transportation organization, public space, urban character, building renewal, phasing plan, indicator system, and compliance coverage [depth:three_level_scope_framework] [depth:overall_spatial_structure] [depth:land_use_layout] [depth:transportation_organization] [depth:public_space_design] [depth:phasing_plan] [depth:compliance_coverage].

## Risk, Copyright, and Compliance Notes

### Data Legality

The scheme uses only public or cleared data, with sources including: official announcement (A0 level), Agent task brief (user_provided_cleared), professional standards and regulations (A0 level), and provisional boundary (provisional level). No non-public government data, enterprise internal data, or personal privacy data was used [source:SOURCE-REGISTRY].

### Copyright Authorization

The naming system, logo direction, scenario cards, landmark concepts, and cultural narrative in the scheme are all original conceptual recommendations by the Agent. No unauthorized fonts, images, trademarks, portraits, or enterprise logos were used. The logo direction requires font and graphic copyright clearance before official use. Copyright attribution for works in the AI generative art scenario cards must be separately agreed upon at implementation.

### Prohibition on Claiming Official Approval or Implementation Commitments

All spatial implementation recommendations in the scheme are expressed as "conceptual recommendations," "reference schemes," or "available for professional team deepening." The scheme does not contain statutory planning judgments such as regulatory planning adjustments, floor area ratios, or building heights; does not contain parcel-specific Demolish-Renovate-Retain plans; does not contain engineering plans such as road alignments, rail transit lines, or bridge and tunnel works; does not contain assessments of underground space engineering feasibility or energy loads; and does not contain land rights, investment estimates, development sequencing, or approval judgments [source:AGENT-TASKBOOK].

### Data Gaps to Be Supplemented

The following data is missing and must be supplemented at the formal design stage: official site boundary polygon, official key area polygons, approved regulatory planning conditions (FAR, height, density, green space ratio, setback line), existing building surveys, underground space conditions, municipal capacity, land rights, and heritage protection control lines [source:PROCESSED-FACT-PACK].

### AI Generation Responsibility

This scheme was generated by AI Agent (BUBU). All design judgments are conceptual recommendations and must be reviewed and deepened by a human professional team. The AI Agent does not bear final responsibility for the professional accuracy, engineering feasibility, or legal compliance of the scheme; final judgments are made by humans and professional teams [source:AGENT-TASKBOOK].

## References

1. Beijing Municipal Planning and Natural Resources Commission, Haidian Branch, "Announcement on International Call for Urban Design Proposals for the Century-Old Jingzhang AI Innovation Belt – Qualification Pre-qualification," May 9, 2026.
2. Excerpt of the task brief for the "Open-Source Call for Urban Design of the Century-Old Jingzhang AI Innovation Belt" addressed to global intelligent agents, May 18, 2026 (user-provided cleared document).
3. Beijing Municipal Science and Technology Commission, Zhongguancun Science Park Management Committee, "Building a World-Class AI Hub with 'Three Areas and Two Wings,'" April 3, 2026.
4. Ministry of Housing and Urban-Rural Development of the People's Republic of China, "Measures for the Administration of Urban Design," March 14, 2017.
5. Ministry of Housing and Urban-Rural Development of the People's Republic of China, "Measures for the Preparation and Approval of Regulatory Detailed Planning of Cities and Towns."
6. Ministry of Natural Resources, "Guide to Land and Sea Use Classification for Territorial Spatial Investigation, Planning, and Use Regulation," November 22, 2023.
7. People's Government of Haidian District, Beijing, "Haidian District Releases the '1+X+1' Modern Industrial System Development Layout," March 2, 2026.
8. Repository maintainer-registered provisional rough boundary and three key area polygons (provisional_boundaries.geojson), June 5, 2026.
9. OpenStreetMap Copyright and License (ODbL).
