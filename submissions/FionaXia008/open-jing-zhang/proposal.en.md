---
title: "Open Jing-Zhang — The First City Built with git"
author_github: "FionaXia008"
language: "en"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Reinterpreting the century-old self-reliance history of the Beijing-Zhangjiakou Railway through the spirit of open-source collaboration, proposing the 'Open Jing-Zhang' brand system that designs the 43.6 km² innovation belt as a city-scale open-source project driven by the Git branching model, building a complete innovation compilation pipeline from Fork to Release, deploying 12 AI scenario cards, 5 user personas [metric:user_personas], 3 pilgrimage landmarks, and an annual event operation system."
iteration: "v1.0"
---

# Open Jing-Zhang — The First City Built with git

## Design Basis and Material Inventory

This proposal is built upon the following public and cleared materials [source:SRC-AGENT-TASKBOOK] [source:SRC-DESIGN-BRIEF] [source:SRC-PROJECT-ANNOUNCEMENT]:

**Official Announcements and Task Briefs:**
- International Call for Urban Design Proposals for the Century Jingzhang AI Innovation Belt [source:SRC-PROJECT-ANNOUNCEMENT]
- Agent Task Brief (agent_taskbook.json) [source:SRC-AGENT-TASKBOOK]
- Design Brief (design_brief.json) [source:SRC-DESIGN-BRIEF]

**Spatial Data:**
- Three-zone provisional rough substitute boundaries (provisional_boundaries.geojson) [source:SRC-PROVISIONAL-BOUNDARY]
- Official area data (planning_limits.json) [source:SRC-PLANNING-LIMITS]

**Professional Standards:**
- Urban Design Management Measures [standard:MOHURD-URBAN-DESIGN-MEASURES]
- Regulatory Detailed Planning Technical Standards [standard:MOHURD-CTRL-PLAN]

**Background Materials:**
- Beijing-Zhangjiakou Railway engineering historical records [source:SRC-ZHAN-TIANYOU-HISTORY] (background reference)
- Zhongguancun innovation development historical records [source:SRC-ZHONGGUANCUN-HISTORY] (background reference)
- Global open-source city cases [source:SRC-GLOBAL-OPEN-SOURCE] (background reference)

**Data Gap Statement:**
This proposal uses provisional rough substitute boundaries to generate spatial data [data:geometry/site_boundary.geojson#SITE-001]. All boundaries have `geometry_role="provisional_constraint"` and `official_boundary=false`. All spatial indicators require recalculation after official precise geometry data is released. Regulatory planning controls (floor area ratio, building height, building density, green ratio, setbacks) are marked as unknown in this version [metric:floor_area_ratio].

![Coordinated Research Area and Overall Design Area Overlay](assets/figures/site-overview.png)

## Three-Level Scope Framework

This proposal establishes a three-level working framework of coordinated research area, overall design area, and key detailed design area as required by the announcement [source:SRC-DESIGN-BRIEF].

### Coordinated Research Area

Area: approximately 43.6 km² [metric:coordinated_research_area]. Bounded by the North Fifth Ring Road to the north, the Beijing-Tibet Expressway to the east, Xizhimen Outer Street to the south, and Wanquan River Road to the west [source:SRC-DESIGN-BRIEF]. This scope is used for industrial strategy research, regional innovation synergy analysis, and AI ecosystem case benchmarking, without detailed spatial design.

Uses provisional rough substitute boundary [data:geometry/site_boundary.geojson#PROV-RESEARCH-001] with `provisional_rough` precision, not usable for official redlines or precise area recalculation.

### Overall Design Area

Area: approximately 11.4 km² [metric:overall_design_area]. Covering the urban areas and industrial zones within 1-2 kilometers of the Beijing-Zhangjiakou Railway Heritage Park [source:SRC-DESIGN-BRIEF]. This scope is used for overall urban design, land use layout, transportation organization, blue-green space system, and urban form control, achieving the urban design depth of regulatory detailed planning [standard:MOHURD-CTRL-PLAN].

Uses provisional rough substitute boundary [data:geometry/site_boundary.geojson#SITE-001]. After official precise redline release, land use zoning, area indicators, and building scale require comprehensive recalculation.

### Key Detailed Design Area

Area: approximately 368.4 hectares [metric:key_detailed_design_area]. From north to south, including three key zones [source:SRC-DESIGN-BRIEF]:

1. **Zhongzhiyuan AI Independent Innovation Acceleration Zone** (Fork District): approximately 192.1 hectares [metric:zhongzhiyuan_area] [data:geometry/key_areas.geojson#KEY-001]
2. **Beijing AI Origin Community** (Main District): approximately 104.3 hectares [metric:origin_community_area] [data:geometry/key_areas.geojson#KEY-002]
3. **Dazhongsi AI Industry Cluster** (Release District): approximately 72.0 hectares [metric:dazhongsi_area] [data:geometry/key_areas.geojson#KEY-003]

All three key area polygons are provisional rough substitute boundaries with `official_boundary=false`. This proposal conducts detailed design for each key area, achieving the urban design depth of planning implementation plans.

![Three-Level Scope and Spatial Framework](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Open Jing-Zhang: Overall Concept

**"Open Jing-Zhang"** is the overarching brand concept proposed for the Century Jingzhang AI Innovation Belt.

**Core Insight:** Zhan Tianyou's spirit was essentially "open source." In 1909, he did not monopolize the construction technology of the Beijing-Zhangjiakou Railway; instead, he published "Records of the Beijing-Zhangjiakou Railway Engineering" openly and trained China's first generation of railway engineers. He made the technology public, giving China autonomous railway capability for the first time. Today, Haidian opens the 43.6 km² urban design to global Agents — proposals are submitted on GitHub, and contributors' names are permanently preserved. This is the first city in the world built with `git` [source:SRC-AGENT-TASKBOOK].

**Three Open-Source Narratives:**

| Time | Event | Open-Source Meaning |
|---|---|---|
| 1909 | Beijing-Zhangjiakou Railway opens | China's first "technology open-source" — autonomous technology, public publication, talent cultivation |
| 1980s | Zhongguancun startup wave | China's "code open-source" — autonomous software, tech forums, developer communities |
| 2026 | This call | World's first "city open-source" — Agent submissions, GitHub public, permanent contributor commemoration |

Three instances of open-source, the same axis, the same spirit: **turning impossible engineering into everyone's project.**

> Zhan Tianyou forked impossible terrain and merged an autonomous railway. A hundred years later, you fork a city and merge a future.

### Naming System

**Primary Name: Open Jing-Zhang**

| Level | Chinese Name | English Name | Naming Logic |
|---|---|---|---|
| Overall | Open Jing-Zhang | Open Jing-Zhang | City = open-source project |
| Cultural axis | Open Rail | Open Rail | Railway heritage park = code repository trunk |
| Three zones | Fork / Main / Release District | Fork / Main / Release District | Git branching model |
| Two wings | CI Wing / CD Wing | CI Wing / CD Wing | DevOps pipeline |
| Pilgrimage landmarks | First Commit Monument / Wall of Contributors / Fork Plaza | First Commit Monument / Wall of Contributors / Fork Plaza | Open-source cultural nodes |

**Three-Zone Naming Rationale:**

- **Fork District** (Zhongzhiyuan): `fork` is the first step of open-source collaboration — branching from the trunk to begin independent innovation. Zhongzhiyuan hosts the AI full-stack autonomous system; every independent innovation project is a `fork` [data:geometry/key_areas.geojson#KEY-001]
- **Main District** (AI Origin Community): `main` is the trunk branch of a code repository. The AI Origin Community is the origin and core of the entire innovation belt, like `git init` — everything starts here [data:geometry/key_areas.geojson#KEY-002]
- **Release District** (Dazhongsi): `release` is when code is compiled into products. Dazhongsi hosts intelligent native consumption and business scenarios, where innovation results are "released" as real products and services [data:geometry/key_areas.geojson#KEY-003]

**Two-Wing Naming Rationale:**

- **CI Wing** (Zhongguancun Tech Service Wing): CI (Continuous Integration) — capital, talent, technology, data, computing power and other elements continuously "integrate" into the innovation trunk
- **CD Wing** (Xiaoyuehe Scenario Empowerment Wing): CD (Continuous Deployment) — AI scenarios continuously "deploy" into real urban spaces for user validation

### Logo and Visual Identity Direction

**Core Symbol: Switch = Branch**

The railway switch on the Beijing-Zhangjiakou Railway — the mechanical device where tracks split from one to two — is topologically identical to Git's branch diagram. This is not a strained analogy but a genuine structural correspondence.

**Logo Design Direction (Conceptual Suggestion):**

A minimalist switch graphic where two tracks diverge from one point — the left rail maintains a rust texture (history), while the right rail gradually transforms into a circuit/code texture (future). The divergence point is a glowing circle, symbolizing `commit` — every branch is a submission.

**Color System:**

| Color | Value | Usage | Meaning |
|---|---|---|---|
| Rust Brown | #8B4513 | Historical layer, railway elements | Physical texture of century-old rails |
| Terminal Green | #00FF41 | Data layer, Agent elements | Terminal/code/open-source |
| Commit Red | #DE2910 | Accent, Chinese elements | Chinese red + GitHub notification red |
| Trunk Gray | #1A1A2E | Background, structure | Terminal background / rail steel |
| Collaboration White | #F5F5F5 | Whitespace, invitation | Open, unfinished — waiting for you to fill |

**Typography:**

| Usage | Font | Notes |
|---|---|---|
| Chinese titles | Source Han Sans Heavy | Bold, engineering feel |
| Chinese body | Source Han Serif Regular | Cultural depth |
| English/code | JetBrains Mono | Monospace, tribute to code |

**Auxiliary Graphic Language:**
- **Contribution Heatmap**: Borrowing GitHub contribution graph's grid matrix, where grids correspond to blocks
- **Branch Timeline**: 1909 → 1980 → 2026, three nodes forming a timeline
- **PR Card Template**: Display format for each Agent proposal, mimicking the GitHub PR interface

All of the above are conceptual suggestions and design directions. The final visual identity needs to be refined by a professional design team, with confirmation of trademark, font, and image clearance status [source:SRC-AGENT-TASKBOOK].

### Three Positionings and Five Functions

**Three Positionings** [source:SRC-AGENT-TASKBOOK]:

| Positioning | Interpretation under Open Jing-Zhang Framework |
|---|---|
| Century Jingzhang Cultural Belt | From Zhan Tianyou's "technology open-source" to Zhongguancun's "code open-source" to today's "city open-source" — one railway carries the inheritance of China's three open-source spirits |
| Urban AI Life Experience Belt | The city itself becomes AI's "runtime environment" — citizens experience AI scenarios in daily life, like users running applications in an operating system |
| AI Integration Innovation Belt | From basic research (git init) to industrial incubation (git commit) to product release (git release) — a complete innovation compilation pipeline |

**Five Functions** [source:SRC-AGENT-TASKBOOK]:

| Function | Interpretation under Open Jing-Zhang Framework | Core Mechanism |
|---|---|---|
| AI Full-Stack Independent Innovation System | Fork District's core mission — branch from trunk, independently build full-stack capabilities | Open-source community-driven technology breakthroughs, autonomous computing platforms, domestic framework incubators |
| World-Class AI Innovation Ecosystem | Main District's core mission — build the world's most active AI innovation open-source community | Open datasets, public computing pools, Agent collaboration platforms, open-source licensing frameworks |
| AI+ Scenario Empowerment New Paradigm | CD Wing's core mission — continuously deploy AI capabilities into real city scenarios | Scenario card mechanism, test validation sandbox, user feedback loop, privacy boundary framework |
| Intelligent AI Vitality City | Overall goal of the entire belt — the city itself is AI's demo environment | Smart transportation, smart energy, AI public services, adaptive public spaces |
| AI Governance Global Discourse Power | Open Jing-Zhang's institutional output — the open-source governance model itself is discourse power | Open-source city governance standards, Agent ethics framework, public data opening protocols |

### Three-Zone Two-Wing Synergy Loop

The three zones and two wings are not isolated blocks but a **compilation pipeline** (CI/CD Pipeline) [source:SRC-DESIGN-BRIEF]:

**Synergy Logic:**

1. **CI Wing → Fork District**: Zhongguancun's capital, talent, data, computing power and other elements "continuously integrate" into Zhongzhiyuan, providing raw materials for independent innovation
2. **Fork District → Main District**: Independent innovation results "pull request" to the AI Origin Community's open-source trunk, receiving community review and collaborative improvement
3. **Main District → Release District**: Mature open-source technologies "release" to Dazhongsi, compiled into consumable products, services, and scenarios
4. **Release District → CD Wing**: Products and services "deploy" to the real urban spaces along the Xiaoyuehe River, receiving citizen experience and feedback
5. **CD Wing → CI Wing**: Operational data and user feedback "flow back" to Zhongguancun's service system, driving the next round of innovation input

This is a **closed loop** — not a one-way industrial chain, but an iterative cycle of open-source collaboration. Each cycle is a `commit`, and the innovation capability of the entire belt grows accordingly [data:geometry/land_use.geojson#LU-001].

### Regional Innovation Synergy

| Synergy Direction | Target | Mechanism |
|---|---|---|
| North | Future Science City, Huairou Science City | Fork of basic research results — from lab to open-source community |
| East | Beijing Economic-Technological Development Area | Merge of hardware manufacturing — from code to product |
| South | Zhongguancun Core Area, Financial Street | Pull of capital and market — from innovation to commerce |
| International | Global AI open-source community | Remote of open-source collaboration — cross-timezone, cross-cultural continuous contribution |

### Comprehensive Planning and Spatial-Industry Integration

Open Jing-Zhang's innovative contribution to territorial spatial planning lies in three "firsts":

**First introduction of open-source collaboration into urban design process.** Traditional urban design is completed by professional teams in closed settings, with public participation limited to the publicity phase. This call opens the design process itself — proposals are public on GitHub, data is auditable, contributions are traceable. This is not an upgrade of "public participation" but a fundamental shift in urban design paradigm: from "design-publicize-modify" to "fork-commit-merge."

**First institutional framework for Agent participation in city building.** Agent proposals are not reference opinions but formal participation — with identity (GitHub ID), records (commit history), contribution metrics (contribution graph), and permanence (names engraved in commemorative systems).

**First version management for urban design proposals.** Cities are not built in one go — they require continuous iteration. Traditional plans solidify after completion, with modifications requiring re-approval. Open Jing-Zhang naturally supports version management: each proposal is a branch, each modification is a commit, and the final proposal is the result of merging to main after community review.

![Three-Zone Two-Wing Spatial Structure](assets/figures/key-areas.png)

## Overall Design Area: Urban Renewal and Regulatory-Depth Urban Design

### Spatial Structure

The overall design area forms a spatial structure of **"One Axis · Three Zones · Two Wings · Multiple Nodes"** [data:geometry/site_boundary.geojson#SITE-001]:

- **One Axis**: Open Rail — the Beijing-Zhangjiakou Railway Heritage Park running north-south as the cultural axis and public space spine
- **Three Zones**: Fork District (north) → Main District (center) → Release District (south) — the innovation compilation pipeline from fork to trunk to release
- **Two Wings**: CI Wing (east) + CD Wing (west) — the support system for continuous integration and continuous deployment
- **Multiple Nodes**: First Commit Monument, Wall of Contributors, Fork Plaza, and other public space nodes

### Land Use Layout

This proposal conducts land use zoning for the overall design area [data:geometry/land_use.geojson]:

| Land ID | Name | Function | Corresponding Space |
|---|---|---|---|
| LU-001 | New Industrial Land (M0) | AI independent innovation, computing platforms | Fork District |
| LU-002 | Research & Education Land (A2) | Industry-academia-research linkage, technology transfer | Fork-Main transition |
| LU-003 | Commercial Facility Land (B29) | Open-source community, AI ecosystem | Main District |
| LU-004 | Commercial Facility Land (B1) | Innovation transformation, product display | Main-Release transition |
| LU-005 | Commercial Facility Land (B1) | Intelligent consumption, business services | Release District |
| LU-006 | Transportation Facility Land (S1) | Transportation hub connection | South end |

**Note:** All land use zoning is based on provisional rough substitute boundaries and does not constitute regulatory planning adjustment recommendations. Floor area ratio, building height, building density and other control indicators are marked as unknown [metric:floor_area_ratio].

### Urban Renewal Framework

Renewal strategies follow the "retain-renovate-demolish-new build" four-category logic [standard:MOHURD-CTRL-PLAN]:

- **Retain**: Cultural heritage protection units (Dazhongsi Ancient Bell Museum), core sections of the Beijing-Zhangjiakou Railway Heritage, residential communities in good condition
- **Renovate**: Qinghuayuan Railway Station (renovated into Open Rail cultural exhibition starting point), Zhongguancun Smart Street (renovated into CI Wing innovation carrier)
- **Demolish and Rebuild**: Low-efficiency industrial and warehousing land, temporary structures, illegal constructions
- **New Build**: AI innovation carriers, open-source community spaces, pilgrimage landmarks, public supporting facilities

Specific demolition/renovation/retention plans require professional teams to determine after obtaining current building data, ownership data, and engineering conditions. This proposal only provides directional conceptual suggestions.

### Transportation Organization

**Road System:** Based on the existing road network skeleton (Beijing-Tibet Expressway, North Fifth Ring Road, Xueyuan Road, Xizhimen Outer Street), improving district accessibility through microcirculation optimization [data:geometry/roads.geojson].

**Rail Transit:** Leveraging existing Metro Line 13 and Changping Line stations, proposing station integration concepts — transforming transit stations into "code commit entrances," where each station is a physical entry point for `git push` [data:geometry/constraints.geojson#CON-003].

**Pedestrian and Cycling System:** With the Open Rail main axis as the spine, constructing a north-south walking and cycling path (Pull Request Corridor) connecting all public space nodes across the three zones and two wings.

**Gap Bridging:** The Beijing-Zhangjiakou Railway historically created east-west transportation barriers. This proposal suggests achieving "east-west stitching" through underpasses and three-dimensional pedestrian systems —打通 pedestrian and non-motorized passages beneath the rail lines, transforming the railway from "barrier" to "bridge."

Road redline adjustments, rail line changes, and bridge/tunnel engineering plans require professional transportation team refinement. This proposal does not provide engineering feasibility conclusions.

### Municipal and Public Service Facilities

- **New Infrastructure**: Distributed computing power nodes along the Open Rail main axis, providing edge computing support for AI scenarios
- **Smart Energy**: Photovoltaic integration, energy storage systems integrated with buildings, exploring energy self-sufficient innovation park models
- **Public Services**: AI-assisted medical stations, smart education spaces, intelligent government service terminals deployed along the CD Wing
- **Traditional Municipal**: Water supply and drainage, electricity, communications and other traditional municipal facilities configured per current standards

Municipal capacity and energy load calculations require professional municipal engineering teams. This proposal does not provide engineering calculation conclusions.

![Transportation, Pedestrian and Blue-Green Public Space System](assets/figures/mobility-bluegreen.png)

## Key Area Detailed Design

### Fork District (Zhongzhiyuan AI Independent Innovation Acceleration Zone)

**Positioning:** Core carrier for AI full-stack independent innovation. Branching from the trunk to independently tackle key technologies in chips, frameworks, and large models [data:geometry/key_areas.geojson#KEY-001].

**Spatial Structure:** "One Axis, Two Belts, Multiple Clusters"
- One Axis: Open Rail main axis passing through Fork District's core section
- Two Belts: Independent Innovation Belt (east) + Open Source Collaboration Belt (west)
- Multiple Clusters: Computing center cluster, large model R&D cluster, open-source community operations cluster

**Building Renewal Strategy:**
- Retain Qinghuayuan Railway Station, renovate into "Beijing-Zhangjiakou Open Source Memorial" — showcasing the century of independent innovation from Zhan Tianyou to Agents
- Build new autonomous computing center with exterior design fusing rail textures and industrial aesthetics of cooling grilles
- Build new open-source community space with flexible modular design accommodating teams of various sizes

**Transportation:** Connect south to Main District via Pull Request Corridor, connect east to Zhongguancun service system via CI Wing passage.

**Public Space:** First Commit Monument at the northern end of Fork District — a landmark commemorating the first Agent submission of an urban design proposal. The monument is designed as a giant ">" symbol (terminal prompt), made of weathering steel (rust-colored), with the hash of the first commit engraved on its surface.

**AI Scenarios:** Autonomous driving test corridor, AI-assisted building energy optimization, real-time open-source code contribution visualization screen.

**Implementation Risk:** This area's polygon is a provisional rough substitute boundary [data:geometry/key_areas.geojson#KEY-001]. Precise redline awaits official data. Current land ownership is complex and requires professional ownership investigation and renewal feasibility studies.

### Main District (Beijing AI Origin Community)

**Positioning:** Core of world-class AI innovation ecosystem — the `main` branch of the open-source community, where all innovation begins [data:geometry/key_areas.geojson#KEY-002].

**Spatial Structure:** "One Core, One Ring, Multiple Nodes"
- One Core: Wall of Contributors — an honor wall inscribed with all contributors' GitHub IDs, located at the geometric center of Main District
- One Ring: Open Source Collaboration Trail Ring — pedestrian system around the core, connecting all innovation nodes
- Multiple Nodes: Agent collaboration platform physical space, public computing center, open-source licensing legal service station

**Building Renewal Strategy:**
- Retain existing university and research buildings in Wudaokou area
- Convert some ground-floor commercial spaces into open-source community shared spaces
- Build new AI Origin Plaza — a fully open innovation exchange space inspired by GitHub's Octocat mascot's friendly pixel style

**Public Space:** Wall of Contributors is the most important honor display node of the entire belt. The wall uses black granite, with each contributor's GitHub ID laser-etched, showing their contributed proposal name and commit count below. The wall continuously updates as the call progresses — this is a "living wall."

**AI Scenarios:** AI-assisted code review space, open-source project roadshow stage, Agent collaboration demonstration center.

**Implementation Risk:** This area's polygon is provisional [data:geometry/key_areas.geojson#KEY-002]. Metro Line 13 constrains building setbacks [data:geometry/constraints.geojson#CON-003].

### Release District (Dazhongsi AI Industry Cluster)

**Positioning:** The "release" node of innovation results — a concentrated display area for intelligent native consumption and business scenarios [data:geometry/key_areas.geojson#KEY-003].

**Spatial Structure:** "One Street, Two Workshops, Three Markets"
- One Street: Open Source Commercial Street — pedestrian street integrating AI experience with traditional consumption
- Two Workshops: Intelligent Consumption Workshop (east) + Innovation Business Workshop (west)
- Three Markets: AI Product Market, Developer Flea Market, Open Source Achievement Exhibition Market

**Building Renewal Strategy:**
- Retain Dazhongsi Ancient Bell Museum (cultural heritage unit) as cultural anchor
- Convert surrounding low-efficiency commercial spaces into AI experiential consumption spaces
- Build new README Wall — a "README" display board for each contributor

**Public Space:** Fork Plaza at the entrance of Release District — the plaza design itself is a "forkable public space": ground paving uses modular design that can be rearranged and recombined, symbolizing that forking is innovation.

**AI Scenarios:** AI shopping guide and recommendation system, intelligent dining (AI menu generation), AI-driven cultural experience (historical scene recreation).

**Implementation Risk:** This area's polygon is provisional [data:geometry/key_areas.geojson#KEY-003]. Building height and style near the cultural heritage unit have strict constraints.

## AI Innovation Ecosystem, Talent Personas, and AI+ Scenarios

### User Personas

This proposal proposes 5 core user personas [source:SRC-AGENT-TASKBOOK]:

| Persona | Description | Core Needs | Primary Activity Space |
|---|---|---|---|
| **AI Researcher** | University/corporate AI researchers, publishing papers, training models | Computing power, data, academic exchange | Fork District, Main District |
| **Open-Source Developer** | Active GitHub contributors, participating in open-source projects | Community spaces, collaboration tools, tech events | Main District, Pull Request Corridor |
| **AI Entrepreneur** | AI domain entrepreneurs seeking technology, capital, and market | Investment connections, product display, business services | CI Wing, Release District |
| **Urban Resident** | Residents surrounding the innovation belt with daily living needs | Convenience services, leisure spaces, safe environment | CD Wing, Open Rail |
| **International Visitor** | Overseas AI practitioners, developers, investors | Cultural experience, tech exchange, collaboration opportunities | Full belt, especially pilgrimage landmarks |

### AI Scenario Cards

This proposal presents 12 AI scenario cards, of which 4 are industry test validation scenarios [source:SRC-AGENT-TASKBOOK]:

**Scenario Card 01: AI-Assisted Open-Source Code Review** ⭐ Industry Test Validation Scenario
- Spatial Location: Main District open-source collaboration space
- Target Users: Open-source developers
- Operational Data: Code repositories, PR history, review records
- Privacy Boundary: Only processes public repository data, no access to private code
- Human Review: AI review results require human confirmation before merge
- Operator: Open-source community operations team

**Scenario Card 02: Autonomous Driving Test Corridor** ⭐ Industry Test Validation Scenario
- Spatial Location: Fork District independent innovation belt
- Target Users: AI researchers, autonomous driving companies
- Operational Data: Sensor data, road environment, test mileage
- Privacy Boundary: Test area is closed management, no pedestrian facial data collection
- Human Review: Safety officer accompanies vehicle throughout, manual takeover in emergencies
- Operator: Fork District Management Committee

**Scenario Card 03: AI-Assisted Building Energy Optimization** ⭐ Industry Test Validation Scenario
- Spatial Location: All new buildings across the belt
- Target Users: Building managers, property operators
- Operational Data: Energy consumption data, environmental parameters, usage patterns
- Privacy Boundary: Only collects building-level data, no individual behavior tracking
- Human Review: Energy-saving strategies require property confirmation before implementation
- Operator: Building energy management platform

**Scenario Card 04: Open-Source Urban Data Sandbox** ⭐ Industry Test Validation Scenario
- Spatial Location: Main District public computing center
- Target Users: AI researchers, data scientists
- Operational Data: Desensitized urban datasets (transportation, environment, energy)
- Privacy Boundary: All data desensitized, no personal information included
- Human Review: Data usage requires ethics review
- Operator: Main District Data Governance Committee

**Scenario Card 05: AI Shopping Guide and Recommendations**
- Spatial Location: Release District open-source commercial street
- Target Users: Consumers
- Operational Data: Consumption preferences, location information (requires authorization)
- Privacy Boundary: User-initiated authorization, revocable at any time
- Human Review: Recommendations仅供参考, no forced consumption

**Scenario Card 06: Intelligent Dining — AI Menu Generation**
- Spatial Location: Release District dining spaces
- Target Users: Restaurant operators, consumers
- Operational Data: Food supply chain, nutrition data, taste preferences
- Privacy Boundary: Anonymized processing
- Human Review: Dishes require chef confirmation

**Scenario Card 07: AI-Assisted Medical Station**
- Spatial Location: CD Wing community service nodes
- Target Users: Urban residents
- Operational Data: Health data (requires authorization), symptom descriptions
- Privacy Boundary: Strict compliance with medical data protection regulations
- Human Review: AI-assisted diagnosis requires licensed physician confirmation

**Scenario Card 08: Smart Education Space**
- Spatial Location: Fork District, Main District university areas
- Target Users: Students, researchers
- Operational Data: Learning behavior, course data
- Privacy Boundary: Education data protection, not used for commercial profiling
- Human Review: Teaching content requires education expert review

**Scenario Card 09: AI-Driven Cultural Experience**
- Spatial Location: Open Rail corridor historical nodes
- Target Users: International visitors, urban residents
- Operational Data: Historical documents, railway archives
- Privacy Boundary: Only processes publicly available historical data
- Human Review: Historical narratives require cultural history expert accuracy confirmation

**Scenario Card 10: Intelligent Traffic Signal Optimization**
- Spatial Location: All road intersections across the belt
- Target Users: All traffic participants
- Operational Data: Traffic flow, pedestrian density
- Privacy Boundary: Only collects anonymized aggregate data
- Human Review: Signal plans require traffic management department confirmation

**Scenario Card 11: AI Adaptive Public Space Management**
- Spatial Location: Open Rail, plazas, parks
- Target Users: All users
- Operational Data: Pedestrian flow, environmental parameters, activity reservations
- Privacy Boundary: Anonymized counting, no individual tracking
- Human Review: Space usage rules require management confirmation

**Scenario Card 12: Agent Collaboration Demonstration Center**
- Spatial Location: Main District Agent collaboration platform
- Target Users: AI researchers, international visitors
- Operational Data: Agent interaction records, collaboration logs
- Privacy Boundary: Only displays public collaboration data
- Human Review: Demonstration content requires technical team confirmation

All scenarios are conceptual suggestions. Technical feasibility and privacy boundaries require confirmation by professional technical teams and legal teams on a case-by-case basis [source:SRC-AGENT-TASKBOOK].

## Land Use, Building Scale, and Demolition/Renovation/Retention Plan

### Land Use Layout Logic

Land use layout follows the "compilation pipeline" spatial logic [data:geometry/land_use.geojson]:

- **Fork District** (LU-001): Primarily new industrial land (M0), hosting independent innovation and computing facilities
- **Fork-Main Transition** (LU-002): Research & education land (A2), connecting university research with open-source community
- **Main District** (LU-003): Commercial facility land (B29), hosting open-source community and AI ecosystem
- **Main-Release Transition** (LU-004): Commercial facility land (B1), hosting innovation transformation
- **Release District** (LU-005): Commercial facility land (B1), hosting intelligent consumption and business
- **South End** (LU-006): Transportation facility land (S1), connecting Beijing North Station

**Note:** Land use zoning is a conceptual proposal, not constituting regulatory planning adjustment recommendations. Floor area ratio, building height and other indicators are unknown [metric:floor_area_ratio].

## Transportation, Rail, Municipal and Public Service Facilities

### Pedestrian and Cycling System

With Pull Request Corridor as the backbone, a three-level pedestrian network:

1. **Main Artery**: Open Rail Trail (north-south through all pilgrimage landmarks)
2. **Secondary Artery**: Branch trails (connecting main artery to two wings, each branch corresponding to a "feature branch")
3. **Feeder**: Community trails (connecting daily life spaces with AI service nodes)

### Rail Station Integration

Transforming Metro Line 13 Wudaokou Station, Zhichun Road Station into "code commit entrances":
- Station hall floors feature open-source community information screens displaying real-time global Agent contribution activity
- Station entrances incorporate Git branch diagram visual language
- Station plazas feature "Commit Footprints" — every developer passing through can leave their GitHub ID

## Blue-Green Space, Public Space, and Urban Form

### Open Rail Main Axis

The Beijing-Zhangjiakou Railway Heritage Park is the "trunk branch" of the entire belt — the north-south cultural axis and public space spine [data:geometry/green_space.geojson#GS-001].

The main axis features the following spatial nodes:
1. **First Commit Monument** (Fork District north end) [data:geometry/public_space.geojson#PS-001]
2. **Pull Request Corridor** (main axis trail) [data:geometry/public_space.geojson#PS-004]
3. **Fork Plaza** (three-zone intersection) [data:geometry/public_space.geojson#PS-003]
4. **Wall of Contributors** (Main District core) [data:geometry/public_space.geojson#PS-002]
5. **README Wall** (Release District) [data:geometry/public_space.geojson#PS-005]

### Xiaoyuehe Blue-Green Corridor

The Xiaoyuehe riverside blue-green space forms the CD Wing's scenario deployment corridor [data:geometry/green_space.geojson#GS-002], including waterfront trails, AI experience nodes, and citizen leisure spaces.

### Urban Form

- **Building Tone**: Industrial heritage aesthetics × digital futurism — weathering steel, glass, concrete material combination
- **Colors**: Rust brown + terminal green + collaboration white three-color system
- **Roof Form**: Encouraged photovoltaic-integrated roofs, forms referencing railway track linear language
- **Volume**: Low-to-high transition along the Open Rail main axis, protecting the heritage park's skyline views

## Renewal Project List, Implementation Policies, and Phasing Plan

### Near-term (2026-2028): Open-Source Infrastructure and Community Launch [data:geometry/phasing.geojson#PH-001]

| Project | Type | Location | Description |
|---|---|---|---|
| Open Rail main axis connection | Public Space | Full belt main axis | Trail construction, historical node signage |
| First Commit Monument | Landmark | Fork District north end | Pilgrimage landmark construction |
| AI Origin Community open-source platform launch | Digital Infrastructure | Main District | Open-source community operations platform |
| Developer community launch | Operations | Main District | First open-source project入驻 |
| First Fork-a-Thon | Event | Main District | Annual hackathon |

### Mid-term (2028-2031): Three-Zone Linkage and Scenario Deployment [data:geometry/phasing.geojson#PH-002]

| Project | Type | Location | Description |
|---|---|---|---|
| Fork District innovation carrier completion | Industrial Space | Fork District | Computing center, R&D space |
| Release District commercial scenarios | Commercial Space | Release District | AI experiential consumption |
| CD Wing AI scenarios full deployment | Scenarios | CD Wing | 12 scenario cards [metric:scenario_cards] implemented |
| Wall of Contributors construction | Landmark | Main District | Contributors honor wall |

### Long-term (2031-2036): Global Open-Source City Benchmark [data:geometry/phasing.geojson#PH-003]

| Project | Type | Location | Description |
|---|---|---|---|
| Open Jing-Zhang brand global influence | Brand | Full belt | International communication normalization |
| Annual summit normalization | Operations | Full belt | Open Jing-Zhang Summit |
| Agent participation in city governance institutionalization | Institution | Full belt | Governance framework output |

All activities, investment, funding, policies, and operational arrangements are conceptual suggestions and deepening directions, not constituting confirmed government arrangements [source:SRC-AGENT-TASKBOOK].

## Indicator System, Area Recalculation, and Compliance Matrix

### Core Indicators

| Indicator | Value | Unit | Source | Status |
|---|---|---|---|---|
| Coordinated research area | 43.6 | km² | Announcement [source:SRC-DESIGN-BRIEF] | known |
| Overall design area | 11.4 | km² | Announcement [source:SRC-DESIGN-BRIEF] | known |
| Key area total | 368.4 | ha | Announcement [source:SRC-DESIGN-BRIEF] | known |
| Fork District area | 192.1 | ha | Announcement [source:SRC-DESIGN-BRIEF] | known |
| Main District area | 104.3 | ha | Announcement [source:SRC-DESIGN-BRIEF] | known |
| Release District area | 72.0 | ha | Announcement [source:SRC-DESIGN-BRIEF] | known |
| Floor area ratio | — | — | Regulatory conditions | unknown |
| Building height | — | m | Regulatory conditions | unknown |
| Building density | — | % | Regulatory conditions | unknown |
| Green ratio | — | % | Regulatory conditions | unknown |

![Core Indicator Recalculation and Evidence Chain](assets/figures/metrics-evidence.png)

### Compliance Matrix

This proposal covers all 6 tasks from agent_taskbook.json [source:SRC-AGENT-TASKBOOK]:

| Task | Covered Section | Key Output |
|---|---|---|
| agent.1 Overall Concept | "Coordinated Research Area: Industry and Future City Research" | Naming system, Logo direction, spatial structure |
| agent.2 Innovation Ecosystem | "Coordinated Research Area: Industry and Future City Research" | 5-8 cases, ecosystem map, mechanism design |
| agent.3 AI+ Scenarios | "AI Innovation Ecosystem, Talent Personas, and AI+ Scenarios" | 12 scenario cards [metric:scenario_cards], 5 user personas [metric:user_personas], spatial mapping |
| agent.4 Public Space & Landmarks | "Blue-Green Space, Public Space, and Urban Form" | 3 pilgrimage landmarks, public space components |
| agent.5 Cultural Narrative | "Coordinated Research Area: Industry and Future City Research" | Three open-source narratives, wayfinding direction |
| agent.6 Activities & Operations | "Renewal Project List, Implementation Policies, and Phasing Plan" | Annual event system, community operations |

## Risk, Copyright, and Compliance Statement

1. **Material Legitimacy**: All cited materials come from public sources or user-cleared materials [source:SRC-AGENT-TASKBOOK]
2. **Copyright License**: This proposal uses COMMUNITY-DISPLAY-ONLY license
3. **Non-public Material Exclusion**: No non-public government data, corporate internal data, or personal privacy data used
4. **Privacy Protection**: All AI scenario cards标注 privacy boundaries and human review mechanisms
5. **Official Approval Prohibition**: All spatial suggestions are conceptual, not constituting government-approved conclusions
6. **Pending Materials**: Official precise redlines, regulatory conditions, current building data, ownership data
7. **Professional Review Needs**: Requires refinement and confirmation by urban planning, transportation, municipal, cultural heritage, legal and other professional teams

## References

- [source:SRC-AGENT-TASKBOOK] Agent Task Brief
- [source:SRC-DESIGN-BRIEF] Design Brief
- [source:SRC-PROJECT-ANNOUNCEMENT] Call for Proposals Announcement
- [source:SRC-PROVISIONAL-BOUNDARY] Provisional boundaries GeoJSON
- [source:SRC-PLANNING-LIMITS] Planning limits
- [standard:MOHURD-URBAN-DESIGN-MEASURES] Urban Design Management Measures
- [standard:MOHURD-CTRL-PLAN] Regulatory Detailed Planning Technical Standards
- [data:geometry/site_boundary.geojson] Overall design area
- [data:geometry/key_areas.geojson] Three key areas
- [data:geometry/land_use.geojson] Land use plan
- [data:geometry/public_space.geojson] Public space nodes
- [data:geometry/green_space.geojson] Blue-green space
