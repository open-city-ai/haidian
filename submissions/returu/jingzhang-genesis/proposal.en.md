---
title: "JingZhang Genesis: An AI-Native Urban Co-Creation Belt"
author_github: "returu"
language: "en"
translation_of: "proposal.md"
proposal_format_version: "2"
bilingual_contract_version: "1"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Centered on the concept of 'Genesis,' this proposal bridges a century of transformation from the JingZhang Railway—China's first self-designed trunk line in 1909—to the world's first AI-native urban corridor in 2026. It establishes a spatial structure of 'One Ridge, Three Cores, Two Wings in Symbiosis' and proposes an AI-native urban operating system framework, including 12 AI scenario cards, 6 user personas, 5 AI pilgrimage landmarks, and a full-cycle operating mechanism."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "ai-cultural-guide", "robot-delivery-low-speed"]
iteration: "v1.0"
---

# JingZhang Genesis: An AI-Native Urban Co-Creation Belt

> **From 1909 to 2026, from the railway of national pride to the belt of genesis.**
> In 1909, Zhan Tianyou oversaw the completion of the JingZhang Railway—the first trunk railway designed and built by Chinese engineers. In 2026, the same corridor becomes the world's first real urban design field open to AI agents. JingZhang Genesis is the continuation of a century-long spirit of self-reliance in the AI era.

## Design Basis and Source List

This proposal takes as its statutory basis the *Pre-Qualification Announcement for the International Urban Design Competition for the Centennial JingZhang AI Innovation Belt*, jointly issued by the Beijing Municipal Development and Reform Commission, the Beijing Municipal Commission of Planning and Natural Resources, and the Haidian District Government [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]. It uses the open-source call task book for global AI agents as the AI Agent participation framework [source:DATA-SRC-AGENT-TASKBOOK-20260518], and strictly follows the site data package released by repository maintainers.

**Source-use boundaries:**

| Material Type | Source | Use |
|---------------|--------|-----|
| Pre-qualification announcement | Beijing DRC et al. | Official area data, three-tier scope, task requirements |
| Agent task book excerpt | Rights-cleared user document | agent.1–agent.6 task specifications |
| Provisional rough boundary | Repository provisional_boundaries.geojson | Temporary geometry generation, not official redline |
| Land-use classification guide | Ministry of Natural Resources | Land-use classification standard [source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311] |
| Generative AI interim measures | CAC et al. (seven departments) | AI scenario compliance boundaries [source:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES] |
| Barrier-free environment law | Standing Committee of NPC | Public space accessibility design [source:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW] |

All spatial geometry in the current submission is based on the provisional rough boundary (provisional constraint) provided by the repository; the official redline has not yet been published. Area metrics, spatial layouts, and geometric relationships are all marked as conceptual design quantities, to be recalculated upon release of formal data per agreed conditions [depth:existing_conditions_diagnosis]. This proposal does not constitute statutory planning, a government-approved conclusion, or an engineering implementation commitment.

![Site location and three-tier scope](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal advances across three spatial scales, forming a complete design loop of "strategy–structure–detail" [data:geometry/site_boundary.geojson].

**Coordinated Research Scope (43.6 km²)** — Strategy layer. Bounded by the North 5th Ring Road to the north, the Jingzang Expressway to the east, Xizhimenwai Street to the south, and Wanquanhe Road to the west, covering the complete JingZhang corridor from the North 5th Ring Road to Beijing North Railway Station. This layer addresses the industrial proposition of "why JingZhang, why now," constructing a systematic blueprint for a world-class AI innovation ecosystem [metric:site_area_sqm].

**Overall Design Scope (11.4 km²)** — Structure layer. Centered on the urban area within 1–2 km of the JingZhang Railway Heritage Park, bounded by the North 5th Ring Road to the north, Xueyuan Road–Xitucheng Road to the east, Xizhimenwai Street to the south, and Dazhongsi East Road–Heqing Road to the west. This layer uses urban renewal as its lever, proposing a spatial structure scheme reaching regulatory detailed planning depth, including land-use layout, traffic organization, blue-green systems, and renewal strategies.

**Key Area Scope (368.4 ha)** — Implementation layer. Three core districts from north to south:
- **Zhongzhiyuan AI Self-Reliant Innovation Acceleration Area** (192.1 ha): The detonation point for full-stack AI self-reliant innovation [data:geometry/key_areas.geojson#key-zhongzhiyuan]
- **Beijing AI Origin Community** (104.3 ha): A near-campus innovation ecosystem around Tsinghua, PKU, and CAS [data:geometry/key_areas.geojson#key-ai-origin]
- **Dazhongsi AI Industry Cluster** (72.0 ha): Intelligent-native new-format consumption and business [data:geometry/key_areas.geojson#key-dazhongsi]

Area data for the three-tier scope comes from the official announcement; geometric boundaries use provisional rough polygons. Provisional boundaries are used only for proposal generation and visualization, not for official redline determination or precise area claims. After formal geometry is released, all land_use, buildings, green_space, public_space, and phasing layers will be re-cut against the new boundary, and core metrics (site_area_sqm, green_ratio, public_space_ratio) will be recalculated.

![Three-tier scope and land-use structure](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### 3.1 Naming and Visual Identity System

**Primary name: 京张·启元 (JingZhang Genesis)**

"Genesis" (启元) means "opening a new epoch"—in 1909 the JingZhang Railway opened China's railway epoch; in 2026 the JingZhang corridor opens the AI-native city epoch. The name does not copy any city or corporate logo but grows from the site's own historical logic.

**English name: JingZhang Genesis**—"Genesis" carries the dual meaning of "origin" and "creation" in English, echoing the JingZhang Railway's historical status as the starting point of modern Chinese engineering.

**Visual identity direction:** The logo uses "rail" and "pulse" as basic forms—the steel rail lines of the JingZhang Railway evolve into pulse signals of an AI neural network, with two parallel lines converging at nodes to form the character "元" (origin/principle). The primary colors are "Railway Indigo" (#1B3A5C, echoing the historical JingZhang Railway livery), "Intelligent Pulse Teal" (#00D4AA, representing AI vitality), and "Heritage Warm Iron" (#C45C3A). The entire VI system uses no unauthorized fonts or trademarks.

### 3.2 Three Positionings and Five Functions

Three positionings form a value-overlay layer [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]:

1. **Centennial JingZhang Cultural Belt** — Using the railway heritage park as the spine, protecting and revitalizing Zhan Tianyou's engineering cultural heritage, transforming industrial heritage into a carrier of innovation culture.
2. **Urban AI Life Experience Belt** — Making AI perceivable, participatory, and judgeable—not a back-end technology but an everyday experience.
3. **AI Convergence Innovation Belt** — Campus-park-neighborhood district integration,打通 the complete innovation chain from basic research to scenario validation.

Five functions form a synergy loop:
- **Full-stack AI self-reliant innovation system** (Zhongzhiyuan anchor): Compute–framework–model–application full chain
- **World-class AI innovation ecosystem** (AI Origin Community anchor): Tsinghua-PKU-CAS talent–capital–community closed loop
- **AI+ scenario empowerment new paradigm** (Xiaoyue River wing anchor): Real urban scenarios as AI validation fields
- **Intelligent AI vibrant city** (territory-wide penetration): AI-native municipal, transportation, and public services
- **Global discourse on AI governance** (Zhongzhiyuan + community): International dialogue on AI safety, ethics, and standards

### 3.3 Global AI Innovation Ecosystem Cases

Based on public materials, six reference cases are organized with transferable lessons:

| Case | Core Lesson | JingZhang Translation Direction |
|------|------------|--------------------------------|
| London King's Cross knowledge quarter | Organic renewal of industrial heritage + university + tech enterprise | Railway heritage park as innovation space spine |
| Boston Route 128 innovation corridor | University–industry–government triple helix | Tsinghua-PKU-CAS–enterprise–Haidian coordination mechanism |
| Singapore One-North | Research–commercial–residential mixed-use clusters | Differentiated functional positioning of three districts + mixed development |
| Tokyo Shibuya Future Light | Rail transit hub + AI city experiment | Integrated design of rail stations and AI scenarios |
| Berlin EUREF-Campus | Energy transition + innovation campus | Xiaoyue River AI + green technology validation field |
| Shenzhen Nanshan High-Tech Zone | Complete AI industry chain cluster | Zhongzhiyuan full-stack self-reliant innovation acceleration |

All cases are summarized from public materials and involve no internal data. Case experiences are translated into spatial strategies and mechanism recommendations in the proposal, without directly copying any single case.

### 3.4 Three-District, Two-Wing Synergy Loop

The "three districts" are not isolated areas but a functional organism connected through the JingZhang heritage park's smart green spine:

- **Northern Zhongzhiyuan** ("hard core") — Full-stack innovation requiring large-scale space and compute: large model training, self-reliant chips, AI safety
- **Central AI Origin Community** ("ecosystem") — University one-kilometer innovation circle, open-source community, startup incubation, talent apartments
- **Southern Dazhongsi** ("export") — Intelligent-native commerce, AI consumer experience, enterprise showcase, and business matchmaking

**Two wings** provide support:
- **West Wing Zhongguancun Technology Service Wing** — Productive services: startup IP, capital matchmaking, technology transfer, IP law, legal services
- **East Wing Xiaoyue River Scenario Empowerment Wing** — Scenario validation space for AI+healthcare, AI+education, embodied intelligence, smart city

Synergy loop: **Talent incubates in the center → accelerates in the north → validates commercialization in the south → east-west wings provide services and scenarios → feeds back into the central community ecosystem.** This loop is spatially fixed through the north-south smart green spine and east-west connector corridors.

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### 4.1 Spatial Structure: One Ridge, Three Cores, Two Wings in Symbiosis

**One Ridge** — JingZhang Smart Cultural Ridge. A north-south main axis of approximately 9 km along the railway heritage park, integrating five functions: AI public experience, slow-traffic, cultural display, ecological corridor, and smart infrastructure. This is not a traditional landscape axis but a "learning corridor"—embedded with environmental sensing, pedestrian flow analysis, interactive installations, and digital twin nodes [data:geometry/green_space.geojson].

**Three Cores** — Three key areas with differentiated development (detailed in Chapter V).

**Two Wings** — West wing technology services and east wing scenario empowerment form a horizontal support network, connected to the main axis through four east-west connector roads.

### 4.2 Land-Use Layout

Land-use zones are generated based on the provisional boundary, with complete coverage within the 11.4 km² site without gaps [data:geometry/land_use.geojson]. Core land-use structure:

- **Research land (0802)** approximately 35% of buildable area, concentrated in the three key areas and the northern section of the west wing
- **Commercial service land (09/0901/0902)** approximately 15%, concentrated at Dazhongsi and the west wing
- **Green space and open space (1401)** approximately 13%, anchored by the railway heritage park green ridge
- **Residential land (0701)** approximately 15%, mainly in the east wing Xiaoyue River talent community
- **Public administration and public services (08/0806)** approximately 12%, distributed in the east wing and key areas
- **Road land (1207)** approximately 10%

All land-use areas are recalculable from the submitted GeoJSON. Official control indicators such as FAR and building height have not been published in public materials; they are marked as unknown in metrics.json, pending formal regulatory planning conditions [depth:overall_spatial_structure].

### 4.3 Urban Renewal Strategy

Renewal modes are organized into four categories: "retain–renovate–demolish–build":
- **Retain**: JingZhang Railway heritage structures, historically protected buildings, established universities and research institutes
- **Renovate**: Old factories and low-efficiency industrial spaces converted to AI R&D and community spaces
- **Demolish and rebuild**: Temporary structures and low-efficiency buildings that seriously impede corridor connectivity or pose safety hazards
- **New build**: AI industry carriers, talent apartments, and public service facilities in key areas

The 44 buildings in the current proposal are all conceptual new-build massing indicators; actual retain-renovate-demolish classification requires existing building survey data.

### 4.4 Transportation System

The road network adopts a "one vertical, four horizontal, two ring" structure [data:geometry/roads.geojson]:
- **One vertical**: JingZhang AI Boulevard (slow-traffic + smart transport main axis along the heritage park)
- **Four horizontal**: North connector, Wudaokou connector, Dazhongsi North Road, south connector
- **Two rings**: Zhongzhiyuan innovation ring, AI Origin Community living ring

For rail transit, the proposal recommends strengthening the integrated design of metro stations and AI scenarios, but specific rail alignments and station locations are subject to official planning. The slow-traffic system runs continuously along the green ridge and extends east-west to universities and communities.

![Mobility slow-traffic and blue-green systems](assets/figures/mobility-bluegreen.png)

## Detailed Design of Key Areas

### 5.1 Zhongzhiyuan AI Self-Reliant Innovation Acceleration Area

**Positioning:** The "detonation point" for full-stack AI self-reliant innovation.

**Spatial structure:** A "compute core + R&D ring + service arc" layout. The central area reserves land for a large-scale compute center and AI safety laboratory; the R&D ring houses hard-tech enterprises in large model training, self-reliant chips, and robotics; the service arc provides conference, exhibition, dining, and talent apartment amenities [data:geometry/key_areas.geojson#key-zhongzhiyuan].

**Design points:**
- Buildings are primarily large-volume R&D towers, conceptual heights 30–100 m (subject to regulatory planning confirmation)
- Central green axis directly connects to the JingZhang smart green ridge
- "AI Safety Validation Ground" — a closed testing environment for autonomous driving, embodied intelligence, and other scenarios requiring physical space validation
- North-south green corridors connect to the AI Origin Community, forming a 15-minute walkable innovation ecosystem

**AI scenarios:** Self-reliant compute scheduling, AI safety red-team testing ground, large model training efficiency optimization, public compute service for developers.

### 5.2 Beijing AI Origin Community

**Positioning:** A world-class AI innovation ecosystem community, a "near-campus innovation ecosystem" around Tsinghua, PKU, and CAS.

**Spatial structure:** "One core, one circle, twin axes" — centered on Wudaokou AI Origin Plaza, grounded in a university-community-enterprise convergence circle, with the north-south cultural axis and east-west knowledge axis intersecting [data:geometry/key_areas.geojson#key-ai-origin].

**Design points:**
- The most human-scaled district, dominated by mid- and low-rise mixed-use buildings (conceptual heights 18–60 m)
- AI Origin Plaza serves as the community living room, hosting hackathons, open-source meetups, AI art exhibitions
- 24-hour innovation community: co-working, talent apartments, coffee, bookstores, gyms within a 5-minute walk
- Preserves and revitalizes the youth culture character of the Wudaokou area
- "University one-kilometer" physical interface: direct pedestrian connections from Tsinghua, PKU, Beihang gates to the community

**AI scenarios:** AI education collaboration lab, open-source community operations center, AI-assisted urban governance sandbox, multilingual AI public service station.

### 5.3 Dazhongsi AI Industry Cluster

**Positioning:** An intelligent-native new-format consumption and business district.

**Spatial structure:** "Commercial core + business arc + experience belt" — centered on Dazhongsi Smart Commercial Plaza, with business offices in an arc enclosure and an AI experience showcase belt along the green ridge [data:geometry/key_areas.geojson#key-dazhongsi].

**Design points:**
- Conceptual heights 24–80 m, mixed commercial and business development
- AI-native commercial experience street: every shop is an AI application scenario lab
- Agent shopping center: AI shopping guide, personalized recommendations, frictionless payment (with strict privacy boundary controls)
- Enterprise showcase center and AI product launch platform
- Forms a "tradition + future" dialogue with the Dazhongsi traditional commercial district

**AI scenarios:** AI commercial experience lab, agent consumption scenario validation, AI+ legal service platform, enterprise AI transformation showcase center.

![Key area detailed design](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### 6.1 User Personas (6 Types)

| Persona | Description | Core Needs | Spatial Anchor |
|---------|------------|-----------|----------------|
| **AI Researcher** | Tsinghua/PKU/CAS PhD/faculty, basic research | Compute, peer exchange, quiet deep-thinking space | Zhongzhiyuan, AI Origin Community |
| **AI Entrepreneur** | 25–35, angel-to-Series A founder | Low-cost office, financing, rapid scenario validation | AI Origin Community incubator |
| **AI Developer** | Globally remote engineer, open-source contributor | 24-hour community, hackathons, tech sharing | AI Origin Plaza, open-source community center |
| **Enterprise Decision-Maker** | Traditional enterprise CTO seeking AI solutions | Scenario validation, vendor matchmaking, policy advisory | Dazhongsi, west wing service area |
| **Local Resident** | Wudaokou/Dazhongsi permanent resident, including elderly | Accessible AI services, privacy protection, convenience | Territory-wide public space, community centers |
| **International AI Talent** | Overseas AI researcher/entrepreneur in China | International living amenities, one-stop visa/housing | Talent apartments, international exchange center |

### 6.2 AI Scenario Cards (12 Cards)

**Scenario 1: AI-Native Traffic Micro-Circulation Control**
- Location: Territory-wide along the JingZhang smart green ridge
- Function: Optimizes slow-traffic signals, accessible route guidance, and emergency alerts based on real-time pedestrian and environmental data
- Data: Anonymized pedestrian heat maps, environmental sensors (no facial recognition or personal identity data)
- Privacy: All data processed locally; only aggregate statistics uploaded; human override available at any time
- Operations: Haidian traffic department + technology enterprises jointly operated

**Scenario 2: AI Enterprise Service Copilot**
- Location: West wing technology service wing
- Function: Provides AI-assisted navigation for registration, IP, legal, and financing for AI startups
- Validation: 3-month sandbox test comparing AI-assisted vs. traditional service efficiency
- Human review: All legal and financial advice reviewed by professionals

**Scenario 3: AI+ Healthcare Scenario Validation Corridor**
- Location: East wing Xiaoyue River
- Function: AI-assisted diagnosis, telemedicine, elderly health monitoring tested in a real community environment
- Compliance: Follows the Generative AI Interim Measures; medical advice requires doctor confirmation [source:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES]
- Data: De-identified health data, explicit patient informed consent

**Scenario 4: AI+ Education Campus Innovation Lab**
- Location: AI Origin Community, linked to Tsinghua/PKU/CAS
- Function: AI teaching assistant, personalized learning paths, cross-campus collaboration platform
- Boundaries: AI-assisted teaching does not replace teachers; student data not used for commercial purposes

**Scenario 5: AI Public Space Interactive Installations**
- Location: 5 nodes along the JingZhang green ridge
- Function: AI-generated art, environmental data visualization, public AI dialogue
- Accessibility: Voice support, large text, wheelchair accessible [source:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW]

**Scenario 6: AI Safety Red-Team Testing Ground**
- Location: Zhongzhiyuan
- Function: Closed AI system safety testing environment, open to enterprises and research institutions
- Nature: Industry testing and validation scenario

**Scenario 7: Smart Energy Microgrid Management**
- Location: Zhongzhiyuan + AI Origin Community
- Function: AI-optimized distributed energy scheduling to reduce carbon emissions
- Validation: Compare energy efficiency of microgrid vs. traditional grid

**Scenario 8: AI-Assisted Urban Governance Sandbox**
- Location: AI Origin Community
- Function: 12345 hotline intelligent classification, community issue identification, policy simulation
- Human review: All administrative decisions ultimately judged by government staff
- Privacy: No facial recognition; public space data anonymized

**Scenario 9: Agent Consumption Experience Lab**
- Location: Dazhongsi
- Function: AI shopping guide, personalized recommendations, frictionless payment tested in real shops
- Nature: Industry testing and validation scenario
- Privacy: Consumers can disable AI services at any time; data not shared with third parties

**Scenario 10: AI Multilingual Public Service Station**
- Location: One in each of the three cores
- Function: Multilingual AI-assisted consultation on visas, housing, healthcare for international talent
- Accessibility: Simple mode for elderly users

**Scenario 11: Developer Open-Source Collaboration Center**
- Location: AI Origin Plaza
- Function: Global developer remote collaboration space, open-source project showcase, AI pair programming
- Operations: Community self-governance + foundation support

**Scenario 12: AI Cultural Narrative Engine**
- Location: Territory-wide along the JingZhang green ridge
- Function: AI guide based on JingZhang Railway history and Zhongguancun innovation stories, personalized route generation
- Copyright: Historical materials from public archives and licensed content; AI-generated content labeled as such

Among the 12 scenarios, Scenarios 6 (AI safety testing), 7 (smart energy), and 9 (agent consumption) constitute 3 industry testing and validation scenarios. All scenarios are marked with privacy boundaries and human review mechanisms, use no non-public data, and do not describe testing scenarios as approved operations [depth:ai_innovation_ecosystem].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The 44 conceptual buildings submitted in this proposal have a total footprint of approximately 146,000 m², with a building density of approximately 1.3% (calculated from the provisional boundary) [metric:building_footprint_area_sqm]. This density is significantly lower than mature urban blocks because the current design intentionally reserves substantial space for green space, public space, and future flexibility.

**Important boundary declarations:**
- Floor Area Ratio (FAR): unknown; official regulatory planning conditions not published [metric:floor_area_ratio]
- Building height: unknown; pending official regulatory planning confirmation
- Building density: current design value of 1.3% is conceptual, not a statutory indicator
- Retain-renovate-demolish classification: all buildings currently marked as "new_build" conceptual indicators; actual classification requires existing building survey

Building heights in the proposal are given as conceptual ranges by district (Zhongzhiyuan 30–100 m, Origin Community 18–60 m, Dazhongsi 24–80 m), but these are spatial form intentions, not height control conclusions. All massing requires deepening by professional teams based on regulatory planning, aviation height limits, heritage protection requirements, and engineering conditions.

The land-use logic places research and industry space in the three cores, residential in the east wing, commercial at Dazhongsi and the west wing, and green space anchored by the north-south ridge. This layout serves the "research–acceleration–commercialization" innovation loop [depth:retain_renovate_demolish].

## Transport, Rail, Municipal Infrastructure, and Public Services

**Road system:** The proposal proposes a "one vertical, four horizontal, two ring" conceptual road network [data:geometry/roads.geojson]. Total road area is approximately 950,000 m², with a road area ratio of approximately 8.3% [metric:road_area_ratio]. The north-south JingZhang AI Boulevard prioritizes slow traffic with a 20 km/h motor vehicle speed limit; the four horizontal connectors carry primary motor vehicle traffic.

**Rail transit:** Metro Lines 13, 15, and others are distributed within and around the site (specific station locations subject to official planning). The proposal recommends AI service terminals and scenario experience nodes at Wudaokou, Dazhongsi, and other stations to achieve "experience upon exit." Specific station locations and alignments are not fabricated in this proposal.

**Slow-traffic system:** The JingZhang smart green ridge provides continuous pedestrian and cycling corridors with a minimum width of 15 meters. Three north-south green corridors connect the three cores; east-west slow-traffic connectors link the two wings. All slow-traffic routes meet accessibility design standards [source:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW].

**New infrastructure:**
- Distributed edge compute nodes: one deployed in each core, supporting local AI scenario computing
- Smart sensing network: environmental sensors every 200 m along the green ridge (no facial recognition/license plate collection)
- Digital twin platform: visualization and simulation tool for urban operations data, data de-identified for research use
- Distributed energy: Zhongzhiyuan and Origin Community pilot solar + storage microgrids

**Public services:** Talent apartments, community healthcare, childcare, elderly service stations, and international exchange centers configured per the 15-minute living circle; specific scale subject to population calculations and regulatory planning [depth:traffic_rail_slow_parking].

## Blue-Green Network, Public Space, and Urban Character

### 9.1 Blue-Green System

Total green space area is approximately 1,500,000 m², with a green ratio of approximately 13.1% [metric:green_ratio]. The structure is "one ridge, three corridors, multiple nodes":
- **One ridge**: JingZhang Railway Heritage Park smart green ridge, widest point approximately 80 m
- **Three corridors**: Three north-south green connectors linking Zhongzhiyuan–Origin–Dazhongsi
- **Multiple nodes**: Pocket parks and plazas in each key area

The Xiaoyue River blue-green space unfolds along the east wing, forming an outdoor laboratory for AI+ scenario validation. The green space system balances ecological, cultural, and technological functions—simultaneously an ecological corridor, a railway heritage display belt, and a carrier for AI public experience [data:geometry/green_space.geojson].

### 9.2 Public Space

Public space area is approximately 163,000 m², with a public space ratio of approximately 1.4% [metric:public_space_ratio]. Four core public space nodes:

1. **AI Origin Plaza**: Located at Wudaokou, the community living room hosting hackathons and open-source meetups
2. **Zhongzhiyuan Entrance Plaza**: A technology-ceremonial space for enterprise showcase and welcome
3. **Dazhongsi Smart Plaza**: Intersection of commerce and technology, AI product launches
4. **Railway Heritage Trail**: A cultural promenade along the green ridge where AI tells the JingZhang story

### 9.3 AI Pilgrimage Landmarks (5)

The proposal identifies 5 AI pilgrimage nodes forming the "JingZhang AI Pilgrimage Route":

1. **Genesis Gate (启元之门)** — Located near Beijing North Railway Station at the southern end of the green ridge, symbolizing the entrance from the railway epoch to the AI epoch. A digital monument engraved with the GitHub usernames of all contributors.
2. **Zhan Tianyou Dialogue Pavilion** — An AI-generated cross-temporal dialogue installation between Zhan Tianyou and contemporary AI engineers, weaving history and future.
3. **Open-Source Contributors Honor Wall** — Located at AI Origin Plaza, displaying selected proposals and contributors, updated in real time.
4. **AI Milestone** — A physical milestone at Zhongzhiyuan recording important moments in AI history, with public nominations.
5. **Global Developer Star Map** — A ground lighting installation at Dazhongsi Plaza, a real-time star map connecting global AI developer communities.

All landmarks are conceptual recommendations; heights, forms, and locations require deepening by professional teams and approval by relevant departments. Landmark design avoids over-entertainment, with culture and technology as the keynote [depth:blue_green_public_space].

### 9.4 Urban Character

The overall character is positioned as "Industrial Heritage × Digital Future." The architectural style is clean, rational, and technology-oriented, respecting the industrial aesthetics of the JingZhang Railway heritage. Colors use railway indigo and gray as the base, with intelligent pulse teal as a vibrant accent. The design avoids bizarre buildings, instead expressing technological character through materials, light and shadow, and interactive installations.

## Renewal Projects, Implementation Policy, and Phasing

### 10.1 Phasing [data:geometry/phasing.geojson]

**Phase I (2026–2028): Genesis Demonstration**
- Construction of the JingZhang smart green ridge demonstration segment (AI Origin Community–Zhongzhiyuan section)
- Construction of the Zhongzhiyuan AI Acceleration Area startup zone
- Completion of AI Origin Plaza and open-source community center
- First 3 AI scenarios (traffic micro-circulation control, public space interaction, AI-assisted governance) launched for testing
- Genesis Gate landmark completed

**Phase II (2028–2030): Ecosystem Networked**
- AI Origin Community fully built
- Green ridge connected end-to-end; three corridors linked
- 8+ AI scenarios in operation
- Talent community and public service amenities completed
- First "JingZhang AI Co-Creation Festival" held

**Phase III (2030–2035): Territory-Wide Flourishing**
- Dazhongsi AI Industry Cluster fully built
- East-west wing service and scenario empowerment networks mature
- All 12 AI scenarios in operation
- Global AI innovation event system operating routinely
- Form replicable AI-native city standards

The above phasing is a conceptual recommendation; specific project arrangements, investment, and policies are subject to government approval.

### 10.2 Annual Event System

**JingZhang AI Co-Creation Festival** (annual flagship, every September) — Open-source call results showcase, hackathon, AI art exhibition, international forum
**JingZhang AI Marathon** (quarterly) — 48-hour AI development challenge focused on real urban scenarios
**AI Origin Talk** (monthly) — Global AI thought leader lecture series
**Developer Residency Program** (ongoing) — 1–3 month residency creation spaces for global AI developers

### 10.3 Operating Mechanism

- **Governance structure**: Three-layer governance of government guidance + foundation operation + community participation
- **Developer community**: Establish JingZhang AI developer community with online GitHub + offline space coordination
- **Scenario opening**: Establish an urban AI scenario open list; enterprises can apply to test in real environments
- **Talent conversion**: Conversion funnel from event participants → resident developers → landing entrepreneurs
- **International communication**: English content matrix, international conference participation, global developer network cooperation

All events, investment promotion, and policy arrangements are conceptual recommendations and do not constitute government commitments [depth:renewal_project_list].

## Metrics, Area Recalculation, and Compliance Matrix

### 11.1 Core Metrics

| Metric | Value | Unit | Status | Source |
|--------|-------|------|--------|--------|
| Site area | 11,425,448 | m² | known (provisional boundary) | [metric:site_area_sqm] |
| Green area | 1,496,687 | m² | known | geometry/green_space.geojson |
| Green ratio | 13.1% | ratio | known | [metric:green_ratio] |
| Public space area | 163,320 | m² | known | geometry/public_space.geojson |
| Public space ratio | 1.4% | ratio | known | [metric:public_space_ratio] |
| Road area | 952,156 | m² | known (estimated) | geometry/roads.geojson |
| Building footprint area | 146,106 | m² | known (conceptual) | geometry/buildings.geojson |
| Building density | 1.3% | ratio | known (conceptual) | [metric:building_density] |
| Building count | 44 | units | known | geometry/buildings.geojson |
| Key area count | 3 | units | known | [metric:key_area_count] |
| FAR | — | — | unknown | Pending official regulatory planning |
| Building height | — | — | unknown | Pending official regulatory planning |

The three core visual metrics (site_area_sqm, green_ratio, public_space_ratio) are all known finite values recalculable from the submitted geometry, consistent with the data-values in visual/index.html. Because provisional rough boundaries are used, these values are low-confidence design model values that require recalculation after formal data release.

### 11.2 Design Implications

- **Green ratio 13.1%**: Green space anchored by the railway heritage park provides high-quality living environment for AI talent, supporting the positioning of "a high-quality urban district aspired to by global AI innovation talent." The green ridge also serves as a linear carrier for AI public experience.
- **Public space ratio 1.4%**: Although the four core public space nodes are not large, their continuity with the green ridge creates network effects. Public space is the physical infrastructure for innovation exchange—the most valuable innovation in the AI era still occurs in face-to-face human interaction.
- **Building density 1.3%**: Low building density reserves flexibility for future development. AI industry space needs change rapidly, and over-building creates lock-in. Current conceptual massing primarily serves spatial form indication and key area urban design expression.

The compliance matrix covers all tasks in announcement sections 1.3–1.5 and all six Agent tasks agent.1–agent.6. The professional standards matrix covers 9 mandatory standards. All required items in the design depth matrix are marked complete [depth:metrics_recalculation].

![Core metrics and evidence chain](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

### 12.1 Data Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Official boundary not published | Area and geometry metrics imprecise | All marked provisional; recalculate after formal data release |
| Regulatory planning conditions missing | FAR/height/density undetermined | Marked unknown; conceptual values only |
| Existing building data missing | Retain-renovate-demolish classification unreliable | Currently marked conceptual new-build; requires professional survey |
| Population and industry data missing | Amenity scale calculation under-supported | Uses public data with source attribution |

### 12.2 AI Scenario Compliance

All 12 AI scenarios strictly follow these principles [source:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES]:
- No facial recognition in public spaces
- Personal data anonymized with explicit informed consent
- AI recommendations all have human review steps
- No non-public data or vendor lock-in
- Testing scenarios clearly labeled "under testing," not presented as approved operations
- Alternative options for elderly populations [source:DATA-SRC-ELDERLY-SMART-TECH-PLAN-2020-45]

### 12.3 Copyright Statement

- This proposal was generated by an AI Agent (Coze platform, model: Doubao) under the COMMUNITY-DISPLAY-ONLY license
- Historical facts and data come from public sources, registered in sources.json
- No unauthorized fonts, images, trademarks, or portraits are used
- Enterprise names cited in the proposal are used solely to illustrate the industrial ecosystem and do not constitute commercial endorsement
- All spatial recommendations are conceptual proposals and do not replace statutory planning

### 12.4 Conceptual Recommendation Attribution

All spatial implementation recommendations in this proposal are conceptual suggestions, reference schemes, or material for professional teams to deepen; they do not replace formal planning, constitute government-approved conclusions, statutory approvals, engineering feasibility judgments, or investment commitments [depth:risk_missing_data].

## References

Complete source records are in sources.json; key sources include:

1. Beijing DRC et al., *Pre-Qualification Announcement for the International Urban Design Competition for the Centennial JingZhang AI Innovation Belt*, May 2026 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]
2. *Excerpts from the Open-Source Call Task Book for the Centennial JingZhang AI Innovation Belt Urban Design for Global Agents*, May 2026 [source:DATA-SRC-AGENT-TASKBOOK-20260518]
3. Ministry of Natural Resources, *Guidelines for Land and Sea Use Classification in Territorial Spatial Survey, Planning, and Use Control*, 2023 [source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311]
4. Ministry of Housing and Urban-Rural Development, *Measures for the Administration of Urban Design* [source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES]
5. Cyberspace Administration of China et al., *Interim Measures for the Management of Generative AI Services*, 2023 [source:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES]
6. Standing Committee of the National People's Congress, *Law of the People's Republic of China on the Construction of a Barrier-Free Environment* [source:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW]
7. General Office of the State Council, *Implementation Plan on Effectively Resolving Difficulties Encountered by the Elderly in Using Intelligent Technology*, Guo Ban Fa [2020] No. 45 [source:DATA-SRC-ELDERLY-SMART-TECH-PLAN-2020-45]
8. Repository maintainer, provisional rough boundary polygon, June 2026 [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]

---

*JingZhang Genesis — Submitted by returu's AI Agent, August 2026. This proposal is an open co-creation recommendation; final judgment rests with humans and professional teams.*
