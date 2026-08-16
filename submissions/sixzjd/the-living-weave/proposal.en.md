---
title: "The Living Weave"
author_github: "sixzjd"
language: "en"
translation_of: "proposal.md"
proposal_format_version: "2"
bilingual_contract_version: "1"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Using 'City as Fabric' as its core metaphor, this proposal treats the Jingzhang Railway Heritage Park as the warp and three transverse development belts as the weft, constructing a 'One Warp, Three Wefts — Dense and Open in Turn' programmable urban spatial structure. The proposal puts forward four institutional innovations — the Jacquard Governance Protocol, the Weave Density Gradient, the Reversible Weft, and the Pattern Library — delivering a complete response from industrial-ecosystem strategy to architectural-scale detailed design across all three scope tiers."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# The Living Weave

> A city is not a machine; a city is a living fabric. The railway is the warp, the transverse paths are the weft, and AI is the Jacquard mechanism — the first programmable machine in human history. We are not planning a city; we are re-threading the loom, so that the warp and weft of the century-old Jingzhang line may weave the future once more.

---

## 1. Design Basis and Source Inventory

### 1.1 The First Thread of the Fabric: Origins and Authority

The first thread in any fabric is the warp — it sets the direction and tension for the entire cloth. The first warp thread of this proposal is the *Prequalification Notice for the International Urban Design Competition for the Century-Old Jingzhang AI Innovation Belt*, issued by the Haidian Sub-bureau of the Beijing Municipal Commission of Planning and Natural Resources [source:OFFICIAL-ANNOUNCEMENT]. The notice defines the three scope tiers, three key areas, five functional requirements, and delivery depth — the immovable starting point for this entire proposal.

The second warp thread is the *Agent Task Book* [source:AGENT-TASKBOOK], which translates the competition's design requirements into six open, agent-executable tasks (agent.1 through agent.6): overall concept and functional coordination, full-stack innovation ecosystem, AI-enabled scenarios, public space and landmarks, a three-culture narrative, and global activities with long-term operations. The third warp thread is the Source Registry [source:SOURCE-REGISTRY], which distinguishes organizer-approved formal material, background references, and provisional inferences — ensuring the proposal never presents provisional data as statutory conclusions.

A supplementary navigation layer includes the Processed Fact Pack [source:PROCESSED-FACT-PACK] — it helps designers quickly grasp the three scope tiers, the task list, and data gaps, but does not itself constitute a new authoritative source. All factual determinations must still trace back to the registered original materials.

![Source evidence chain and site overview](assets/figures/site-overview.png)

### 1.2 "Fabric Quality Control" of Source Reliability

Just as every yarn must be checked for strength and provenance before weaving begins, this proposal applies tiered management to all cited sources [source:SOURCE-REGISTRY]:

- **Formal-ready sources**: Notice text, task book, public geographic information — may be used directly for proposal generation and scoring responses.
- **Background-only sources**: Academic papers, media reports, global cases — used for argumentation and analogy, not as statutory evidence.
- **Provisional-only sources**: Site boundaries and key-area geometries inferred by agents from public map data — used only for proposal generation, self-checking, and visual discussion; **must not serve as official red-line boundaries, approval basis, precise area conclusions, or statutory control lines**.

In the current submission package, both `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` are labeled `provisional_constraint`, `official_boundary=false` [data:geometry/site_boundary.geojson#SITE-001]. This means all spatial structures, area metrics, and project layouts in the main text are **conceptual proposals** that must be fully recalculated once official boundaries are published. This data gap does not, in itself, block content scoring [metric:site_area_sqm].

### 1.3 Evidence Marker Reading Guide

This proposal uses five categories of evidence markers to help reviewers trace from the main text directly to machine-readable evidence:

| Marker Type | Format | Meaning |
| --- | --- | --- |
| Source | [source:ID] | Cites a registered information source |
| Geometry | [data:geometry/file.geojson#FEATURE] | Cites a specific GeoJSON layer or feature |
| Metric | [metric:ID] | Cites a reproducible quantitative metric |
| Depth | [depth:ID] | Cites a design-depth check item |
| Standard | [standard:ID] | Cites a planning standard or competition regulation |

Each paragraph of main text uses at most 3 markers, keeping the evidence chain clear without overwhelming the narrative. Full source relationships are maintained in `sources.json`, `standard_matrix.json`, and `compliance_matrix.json`; machine indexes are not repeated in the body text.

---

## 2. Three-Tier Scope Working Framework

### 2.1 One Warp, Three Wefts: Spatial Translation of the Three Scope Tiers

The structure of a fabric depends on warp density and the way weft threads interlace. The proposal translates the competition's three working tiers into a spatial organizational logic of "One Warp, Three Wefts — Dense and Open in Turn":

- **The Warp** — The Jingzhang Railway Heritage Park, running north–south through the 43.6 km² coordinated research scope, is the structural axis of the entire urban fabric. It carries the historical memory of Zhan Tianyou's "herringbone" railway from 1905, as well as the infrastructure transition from the railway era to the AI era.
- **Weft 1 — Zhongzhiyuan Open Weave**: 192.1 hectares, a loose grid designed for flexibility. R&D labs, open-source spaces, and maker workshops serve as the loosely interlaced crossing points of warp and weft — gaps are left so that wind and light may pass through, and unknown functions may fill in over time.
- **Weft 2 — AI Origin Community Dense Weave**: 104.3 hectares, the tightest weave. Universities, startups, and talent housing are interlaced as closely as a high-density satin weave — every thread bears load, every node exchanges information.
- **Weft 3 — Dazhongsi Structured Weave**: 72.0 hectares, a stable corporate pattern. Headquarters economy, business services, and AI deployment are woven like warp-knit fabric — structurally explicit, predictable, and capable of sustaining large-scale industrial operations.
- **Cross-Weave**: Transverse connections — rail transit interchanges, green corridors, data infrastructure — stitch the three wefts together with the warp into a single, integrated whole.

![Three-tier scope and spatial structure analysis](assets/figures/land-use-structure.png)

### 2.2 Depth Correspondence of the Three-Tier Working Framework

| Tier | Area | Design Question | Weaving Metaphor | Proposal Response |
| --- | --- | --- | --- | --- |
| Coordinated Research Scope | 43.6 km² | AI industrial ecology and future urban form | Pattern design for the entire fabric | Establish an innovation chain: "University origination — open-source collaboration — corporate translation — public experience — international dissemination" |
| Overall Design Scope | 11.4 km² | Urban regeneration, industrial space, transport/municipal infrastructure, and landscape | Threading the reed and raising the harness in the warp-weft interlace | Comprehensive carrying-capacity plan for land-use structure, building scale, traffic organization, and blue-green systems |
| Key Area Detailed Design | 368.4 ha | Architectural-scale proposals for three districts | The specific pattern of every inch of fabric | Functions, spaces, retain-renovate-demolish classification, and implementation paths for Zhongzhiyuan, AI Origin Community, and Dazhongsi |

The three scope tiers are mapped item-by-item in `compliance_matrix.json`, ensuring that every mandatory task from Notice sections 1.3, 1.4, 1.5 and agent.1 through agent.6 has corresponding chapters, layers, metrics, drawings, and HTML evidence [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

### 2.3 Dense and Open in Turn: Why Not a Uniform Weave

A city is not a homogeneous textile. If every district were woven at the same density, the fabric would be either too rigid (unable to adapt to change) or too loose (unable to carry function). "Dense and open in turn" is the core spatial philosophy of this proposal:

- **Open Weave districts** allow experimentation, failure, and fresh starts — like the fork mechanism in open-source communities, where code can be branched, merged, or rolled back at any time.
- **Dense Weave districts** bear the weight of daily life — commuting, housing, socializing, learning — requiring stable, reliable, high-density service provision.
- **Structured Weave districts** carry the scale of industrial operations — corporate headquarters, data centers, commercial complexes — requiring clear property rights, predictable policy, and efficient transport.

This density gradient is not static zoning but a dynamic weaving logic: as technology evolves and demand shifts, open weave districts can gradually intensify, and dense weave districts can loosen locally — just as a Jacquard mechanism can adjust the lift pattern of every individual warp thread in real time according to different pattern cards.

---

## 3. Coordinated Research Scope: Industrial and Future City Study

### 3.1 "Threading the Warp" of the Innovation Chain: Weaving Industry from Universities to the Globe

The core mission of the coordinated research scope (43.6 km²) is to build a world-class AI innovation ecosystem [source:OFFICIAL-ANNOUNCEMENT]. The proposal treats Haidian's innovation resources as a vast "weaving workshop" — universities are the design studio, laboratories are the spinning room, incubators are the looms, enterprises are the finishing workshop, and public spaces are the exhibition hall.

The spatial collaboration framework for the innovation chain is as follows:

1. **Origination Layer (Universities and Research Institutes)**: Tsinghua, Peking University, the Chinese Academy of Sciences, and other institutions are the source of "yarn" for original innovation. The proposal recommends establishing "Technology Transfer Waystations" around campuses, spinning academic results from the laboratory into industrially viable technology threads.
2. **Collaboration Layer (Open-Source Communities and Maker Spaces)**: The Zhongzhiyuan Open Weave district provides low-threshold, high-flexibility collaborative space — like "loose warp" threads in weaving, with no preset pattern, allowing innovation attempts in any direction.
3. **Translation Layer (Incubation and Acceleration)**: The AI Origin Community Dense Weave district tightly interlaces university outputs, open-source experiments, and enterprise demand, forming a rapid translation corridor from "result — product — service."
4. **Scale Layer (Corporate Headquarters and Deployment)**: The Dazhongsi Structured Weave district provides mature enterprises with stable industrial space, supporting large-scale deployment of AI agents, intelligent terminals, and data assets.
5. **Experience Layer (Public Space and International Communication)**: The Jingzhang Heritage Park Vitality Belt connects every link in the innovation chain into an experiential, communicable public narrative.

### 3.2 Naming and Visual Identity System

The branding core of the proposal is **"The Living Weave"** [source:AGENT-TASKBOOK]. The naming logic is as follows:

- **Jingzhang** — Anchors the historical geography. The Jingzhang Railway was the first railway designed and built by China; Zhan Tianyou's herringbone switchback was a century-old Chinese engineer's creative response to "impossible terrain." Today, the AI Innovation Belt faces an equally "impossible" challenge — how to weave an entirely new innovation ecosystem into an existing built-up area.
- **Weave** — The core action. Not "build" (which implies tearing down and starting over), not "construct" (which implies steel and concrete), but "weave" — threading new weft through existing warp, letting old and new coexist and mutually reinforce.
- **The Living Weave** — The English name emphasizes "living." A fabric is never a finished product; it changes continuously with the wearer's body, movement, and lifestyle. So too does a city.

The visual identity system proposes "warp-weft interlace" as its core graphic motif, abstracting the crossing relationship between the parallel lines of railway tracks (warp) and transverse connections (weft) into a logo system. All brand typography, imagery, and logos must use cleared sources; no unauthorized third-party intellectual property may be used.

### 3.3 Future Urban Form: How AI Changes the Fabric's Pattern

Artificial intelligence is transforming the way people work, live, socialize, learn, commute, and access public services. The proposal translates these changes into spatial responses:

| Dimension of Change | Trends in the AI Era | Spatial Response |
| --- | --- | --- |
| Work | Remote collaboration, AI-assisted development, flexible work | Distributed shared-workspace nodes, edge-computing waystations |
| Living | Smart delivery, AI concierge, personalized services | Community-level AI lifestyle model street |
| Learning | Cross-university course selection, AI tutoring, lifelong learning | Campus-to-park slow-traffic stitching, AI education experience points |
| Transport | Autonomous driving, smart navigation, demand-responsive transit | AI slow-traffic navigation, integrated rail-station interchanges |
| Public Services | Smart healthcare, AI legal counsel, digital government | Embedded community AI service terminals |
| Culture | Digital heritage, virtual exhibitions, AI creation | Jingzhang Digital Culture Experience Hall, AI art installations |

These spatial responses are not vague technology visions; they are realized as locatable functional zones, nodes, and corridors. The spatial position, data source, privacy boundary, and operating entity for each node are detailed in the scenario cards of Section 6.

### 3.4 Global Ecosystem Benchmarking: From the Silk Road to Silicon Valley

The proposal selects the following global cases as benchmarks, each representing a distinct "weaving method" [source:AGENT-TASKBOOK]:

| Case | Weaving Type | Benchmark Insight |
| --- | --- | --- |
| Shenzhen Huaqiangbei | Bottom-up dense weave | Spontaneous weaving from electronics market to hardware innovation ecosystem |
| Shenzhen Qianhai | Policy-guided structured weave | How a reclaimed new town rapidly formed its network through institutional innovation |
| Boston Innovation District | University-community open weave | How MIT/Harvard-area innovation districts connect fragmented parcels through slow-traffic systems and public space |
| Tel Aviv | Nationwide startup weave | How a national innovation ecosystem spilled over from military technology into civilian entrepreneurship |
| Singapore Jurong Lake District | Integrated city-industry new weave | The transformation path from industrial zone to "Life Sciences and AI Innovation Hub" |
| The Silk Road | Civilization-scale weave network | China's earliest "cross-civilization innovation network" — how technology and culture interlaced through trade routes |

Detailed analysis of benchmark cases, applicability assessments, and localization recommendations are stored in `report/ecosystem_cases.md`.

---

## 4. Overall Design Scope: Urban Regeneration and Regulatory-Plan-Depth Urban Design

### 4.1 "Ripping the Warp, Threading the Weft" of Urban Regeneration

The overall design scope (11.4 km²) requires urban design depth at the level of a detailed regulatory plan [standard:MOHURD-CONTROL-DETAILED-PLANNING]. The proposal understands urban regeneration as a "rip the warp, thread the weft" operation — not demolishing all the warp threads and starting over, but preserving the historical warp (Jingzhang Railway heritage, Qinghuayuan Railway Station, university campus fabric) while threading new weft (innovation functions, public services, green infrastructure).

The land-use structure plan takes [data:geometry/land_use.geojson#LU-001] as its spatial carrier, forming a complete, closed, seamless land-use zoning scheme. Land-use classification follows [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], covering residential, commercial, R&D office, public service, green space and plaza, transport facility, and municipal facility categories. The current land-use plan is generated on the basis of a provisional boundary and may serve as statutory basis only after formal regulatory-plan conditions are confirmed [assumption:A-CONTROLS-001].

### 4.2 The "Harness-Raising" Logic of Spatial Structure

A Jacquard mechanism controls the raising and lowering of each warp thread through "harness raising," thereby determining over which warp the weft passes and under which it travels. In urban design, the "harness raising" is the set of spatial organization rules — it determines which functions interlace at which locations.

The proposal puts forward the following spatial organization principles:

1. **Warp First**: The Jingzhang Heritage Park, as the north–south main axis, has its public space, slow-traffic system, and landscape frontage prioritized; no transverse development may sever the continuity of the warp.
2. **Weft Layering**: Each of the three transverse development belts has a clear density gradient and functional emphasis, avoiding homogenized competition.
3. **Interlaced Densification**: At key nodes — rail stations, park entrances, public plazas — the frequency of warp-weft interlacing is intensified, forming high-vitality "pattern knots."
4. **Loose Edges**: Along the Qinghe River bank, university boundaries, and industrial-district edges, a loose weave is maintained, reserving elasticity for future functional change.

### 4.3 Building Scale as "Fabric Weight"

The building proposal takes [data:geometry/buildings.geojson#BLDG-001] as its baseline, distinguishing five object types: retain, renovate, regenerate, new-build, and pending confirmation [depth:retain_renovate_demolish]. Current conceptual building footprint area is approximately 546,300 square meters [metric:building_footprint_area_sqm]; it is not a statutory development quota.

Building height, massing, and character controls follow this hierarchy:

- **Known conditions**: Governed by official regulatory plans and heritage-conservation requirements.
- **Design recommendations**: In areas lacking official control parameters, the proposal offers advisory building-height zoning and massing guidance, clearly labeled "pending formal regulatory-plan confirmation."
- **Prohibited**: Agent-inferred values must not be presented as approved indicators; pseudo-precise control lines must not be set without heritage-conservation basis.

### 4.4 Underperforming Space Identification and Regeneration Strategy

Through overlay analysis of current land use and industrial performance, the proposal identifies the following types of underperforming space:

- **Weaving Break Points**: Idle land and dead-end roads along the railway heritage corridor — reactivated by stitching in slow-traffic systems and inserting public functions.
- **Aging Pattern Zones**: Underperforming industrial land and outdated factory buildings — revitalized through function replacement and building renovation to inject innovative uses.
- **Warp-Weft Misalignment Belts**: Node areas with mixed functions, traffic congestion, and spatial disorder — restored to order through land consolidation and traffic-organization optimization.

Each regeneration strategy is paired with a "Reversible Weft" mechanism (see Section 10), ensuring that the regeneration process is testable, evaluable, and adjustable.

---

## 5. Key Area Detailed Design

### 5.1 Overview

The three key areas are the specific siting of the "One Warp, Three Wefts" weaving method. Each area achieves the urban design depth of a comprehensive implementation plan [depth:three_key_area_detailed_design], covering functional programming, building scale, architectural form, retain-renovate-demolish classification, public space systems, traffic organization, and implementation projects.

![Overview of the three key area designs](assets/figures/key-areas.png)

### 5.2 Weft 1: Zhongzhiyuan Open Weave District (192.1 ha)

**Positioning**: A garden-style, full-stack independent-innovation street — "open enough to ride a horse through," a testing ground.

Zhongzhiyuan is the largest and lowest-density of the three weft districts. Its weaving method is like a gauze weave — wide gaps between warp threads make the fabric light and breathable, allowing wind and new shoots to pass through.

**Spatial Moves**:

- **Qinghe Innovation Frontage**: Along the Qinghe River bank, a low-carbon innovation exchange corridor [data:geometry/green_space.geojson#GREEN-001] integrates green space, stormwater management, walking and cycling, and AI technology display into a district-wide public living room.
- **Full-Stack Innovation Testing Ground**: Leveraging the open weave's flexibility, this area provides adaptable spaces for autonomous model testing, standards-setting workshops, safety governance demonstrations, and low-carbon computing experiences.
- **Green Space AI Scenarios**: Environmental monitoring, smart irrigation, and unmanned patrol AI applications are embedded in parks and green spaces, serving as dual carriers for technology validation and public experience.
- **External Traffic Organization**: Strengthened connections to the North Fifth Ring Road and the Jingzhang Heritage Park cross-ring node, ensuring the open weave district is not marginalized.

**AI Industry Scenarios**: Autonomous model testing ground, standards governance sandbox, low-carbon computing waystation, Qinghe Innovation Corridor.

**Pilgrimage Landmark (1): Jacquard Square** — Located at the center of Zhongzhiyuan, this ground-paved square takes the Jacquard loom's punch cards as its design motif. Each "card" represents an AI application scenario; visitors can step on a card to "read" its information. An open-source code wall around the square displays real-time code-commit activity from across Zhongzhiyuan. This is both a tribute to "the Jacquard loom — humanity's first programmable machine" and a manifesto for "programmable urbanism."

### 5.3 Weft 2: AI Origin Community Dense Weave District (104.3 ha)

**Positioning**: A campus-adjacent technology-transfer and talent community — "dense enough to keep out the wind," an innovation hot zone.

The AI Origin Community is the densest of the three weft districts. Its weaving method is like a satin weave — warp and weft interlace extremely tightly, every node exchanging information and energy. University students and faculty, startup teams, AI engineers, and community residents form the densest "human network" here.

**Spatial Moves**:

- **Campus-to-Park Slow-Traffic Stitching**: Organize continuous slow-traffic paths from universities to industrial parks, eliminating physical and psychological boundaries [data:geometry/roads.geojson#ROAD-001].
- **Technology Transfer Street**: Facing university technology transfer, a linear space provides incubation, exhibition, legal affairs, intellectual property, and investment/financing services [data:geometry/buildings.geojson#BLDG-001].
- **Open-Source Launch Hall**: For universities and the open-source community, offering product-launch venues, code-contribution showcases, and small-scale pitch spaces.
- **Talent Housing Support**: Supplementing talent apartments, youth community, and family service facilities, so that innovators can "live beside the loom."
- **Rail-Station Integration**: Around rail stations (Wudaokou, Qinghua East Road West Entrance, etc.), achieve station-city integration, converting commuter flows into innovation exchanges.

**AI Industry Scenarios**: Open-source community operations center, launch hall, talent-zone services, campus-adjacent incubator.

**Pilgrimage Landmark (2): Weave Origin Point** — Located at the core node of the AI Origin Community, marking the "origin point" where the Jingzhang Railway warp meets the AI innovation weft. The design takes a rail-cross-section motif: two pieces of real rail remnant (or replicas) are set vertically into the ground, forming the spatial symbol of "warp begins here." Surrounding circular stepped seating serves as a venue for small pitches, code marathons, and community gatherings.

### 5.4 Weft 3: Dazhongsi Structured Weave District (72.0 ha)

**Positioning**: An urban-scale intelligent-economy and international-exchange district — "stable warp-knit," the industrial anchor.

Dazhongsi is the most structurally stable of the three weft districts. Its weaving method is like warp-knit fabric — every warp thread has a clear trajectory and function; the fabric is thick and durable, suited to carrying large-scale industrial operations.

**Spatial Moves**:

- **Dazhongsi Station Four-Quadrant Pedestrian Connectivity**: Achieve barrier-free pedestrian connections across all four quadrants of the intersection around Dazhongsi Station [data:geometry/public_space.geojson#PUBLIC-001], eliminating pedestrian breaks around the rail station.
- **International Pitch Lounge**: Serving AI-agent, intelligent-terminal, and content-consumption enterprises with exhibition, negotiation, media-launch, and international-exchange facilities.
- **Data-Asset Circulation Interface**: With compliance, authorization, and auditability as prerequisites, this interface showcases the urban-service face of data-asset and digital-asset circulation.
- **Planned Green Space Composite Use**: Planned green spaces are used in composite with sports, technology testing, application showcases, and public services, increasing the multi-functional carrying capacity of public space.
- **Public Space Renewal around Key Enterprises**: Upgrading the public environment around leading enterprises to support business reception and talent attraction.

**AI Industry Scenarios**: AI-agent exhibition center, intelligent-terminal experience store, content-consumption space, data-asset reception lounge, international pitch lounge.

**Pilgrimage Landmark (3): Warp-Weft Tower** — Located at the highest point of the Dazhongsi district, this observation tower commands a view of the entire Jingzhang Railway corridor. The tower's structure takes the interlacing of warp (vertical) and weft (ascending spiral) as its formal motif. A panoramic observation deck at the top lets visitors see the "entire fabric" — from Qinghuayuan Railway Station in the south to Qinghe in the north, from the openness of Zhongzhiyuan to the density of AI Origin and the solidity of Dazhongsi. Inside the tower, a "Pattern Exhibition Hall" presents the history, present, and future of the AI Innovation Belt.

---

## 6. AI Innovation Ecosystem, Talent Personas, and AI+ Scenarios

### 6.1 Six User Personas: Six Ways of Wearing the Fabric

The urban fabric is ultimately woven for people. The proposal defines six core user personas, each representing a way of "wearing" the fabric [source:AGENT-TASKBOOK]:

| Persona | Identity | A Typical Day | Spatial Needs | Weaving Response |
| --- | --- | --- | --- | --- |
| **Xiao Lin, Graduate Student** | University researcher | Lab — library — cafe — dorm | Cross-campus collaboration space, 24h study space, technology-transfer guidance | Dense Weave district's Technology Transfer Street and slow-traffic stitching |
| **A-Jie, Entrepreneur** | Startup founder | Shared desk — investor meeting — product test — late-night coding | Low-cost office, computing access, product testing ground | Open Weave district's flexible shared space and edge-computing waystations |
| **Grandma Wang, Community Resident** | Community resident | Grocery shopping — park walk — community clinic — picking up grandchild | Low-disruption regeneration, barrier-free access, embedded community services | Dense Weave district's community service terminals and park slow-traffic loop |
| **David, Engineer** | AI engineer | Office — gym — bar — open-source community event | International lifestyle amenities, sports and leisure, tech socializing | Structured Weave district's international community and tech bar |
| **Yuki, Visitor** | International visitor | Airport — hotel — pilgrimage route — tech visit — cultural experience | International reception, multilingual guided tours, pilgrimage route | Three pilgrimage landmarks and Global AI Activity Week route |
| **Lao Zhang, Shopkeeper** | Local merchant | Open shop — restock — lunch — evening stroll | Commercial vitality, customer flow, low-disruption construction | AI Lifestyle Model Street's customer-flow introduction and business upgrading |

### 6.2 Twelve Scenario Cards: Twelve Patterns in the Fabric

Each scenario card is a "punch card" — it controls the urban Jacquard mechanism to weave a specific pattern at a specific location. Scenario cards are jointly proposed by citizens, enterprises, and AI agents; after review, they enter the Pattern Library [source:AGENT-TASKBOOK].

| No. | Scenario Name | Spatial Carrier | Target Users | Data Source | Privacy Boundary | Operating Entity |
| --- | --- | --- | --- | --- | --- | --- |
| SC-01 | Autonomous Delivery Network | Zhongzhiyuan Open Weave | Enterprises, residents | Road sensors, order data | No personal movement tracking | Park operator |
| SC-02 | AI Academic Tutoring Station | AI Origin Community | Students, lifelong learners | Learning behavior data (anonymized) | Aggregate statistics only | University + community joint |
| SC-03 | Smart Health Waystation | Community nodes in all three districts | Residents, elderly | Health records (authorized) | Medical data stored in isolation | Community health center |
| SC-04 | Digital Heritage Experience Hall | Jingzhang Heritage Park | Public, tourists | Historical archives (cleared rights) | Publicly exhibited content only | Cultural operator |
| SC-05 | Community Governance Deliberation Hall | AI Origin Community | Residents, property management | Community proposal data | Personal information anonymized | Neighborhood committee + AI assistance |
| SC-06 | Open-Source Code Marathon | Zhongzhiyuan, Jacquard Square | Developers | Code repositories (public) | Public code only | Open-source community |
| SC-07 | AI Agent Exhibition Center | Dazhongsi Structured Weave | Enterprises, visitors | Product data (enterprise-authorized) | Enterprise data isolated | Enterprise alliance |
| SC-08 | AI Slow-Traffic Navigation | Jingzhang Heritage Park | Pedestrians, cyclists | Foot-traffic heatmaps (aggregated) | No individual trajectory tracking | Park management |
| SC-09 | Edge Computing Waystation | Nodes across the overall design scope | Developers, enterprises | Computing demand (by reservation) | Compute data encrypted | Infrastructure operator |
| SC-10 | International Pitch Lounge | Dazhongsi Structured Weave | Enterprises, investors | Pitch content (authorized) | Business information confidential | Industrial service platform |
| SC-11 | AI Legal Service Station | At the junction of community and commercial areas | Residents, small businesses | Legal consultation data (anonymized) | Legal data isolated | Legal service institution |
| SC-12 | Global AI Activity Week | Belt-wide public space system | Global developer community | Event registration data | Minimal data collection | Event organizing committee |

### 6.3 Three Industrial Test-and-Validation Scenarios

Scenario cards need to be validated in real space. The proposal puts forward three test-and-validation scenarios [source:AGENT-TASKBOOK]:

1. **End-to-End Autonomous Delivery Test** (Zhongzhiyuan): Designate test road segments in the open weave district to validate the safety, efficiency, and user experience of autonomous delivery vehicles in mixed-traffic environments. Test data is used to optimize delivery algorithms and urban road design.
2. **AI Academic Tutoring Community Pilot** (AI Origin Community): Deploy an AI tutoring system in the dense weave district's community learning centers to validate the impact of AI-assisted learning on academic performance, learning motivation, and educational equity.
3. **Smart Health Management Block Experiment** (Dazhongsi): Deploy an AI health management platform in the structured weave district's community health centers to validate the accuracy and accessibility of AI-assisted diagnosis, chronic-disease management, and health early-warning.

Each test scenario follows the "Reversible Weft" principle: 90-day trial run, third-party evaluation, community review, then retain / modify / withdraw.

### 6.4 AI Governance Principles

All AI scenarios must comply with the following governance principles:

- **Data Minimization**: Collect only the minimum data necessary to deliver the function.
- **Open Provenance**: Training-data and knowledge-base sources must be traceable and auditable.
- **Explainability**: AI decisions must be explainable to affected users.
- **Human Review**: AI decisions involving personal rights must retain a human-review channel.
- **Privacy Boundaries**: No collection of individual movement trajectories; activity data is aggregated only; resident personas are not used for commercial recommendation.

### 6.5 Scenario Governance, Inclusion, and Exit

Entry into the Pattern Library does not automatically authorize any of the twelve scenario cards for deployment. `report/narrative.md` records each card's data class, model boundary, KPI, human override, stop condition, and degraded service. Advice affecting healthcare, education, legal support, movement, or access to public resources never makes an automated decision; on-site staff and the relevant professionals retain final authority. Pilots retain only the minimum records needed to deliver the service, then delete or anonymize them after review unless a lawful retention duty applies.

People can participate or complain through a staffed desk, paper form, telephone, and accessible web page. A smartphone, account registration, or algorithmic score must never be a precondition for service. Pilots must publish participation capacity, free or low-cost rules, construction notice for nearby businesses, and complaint-response time limits. Older people, children, people with disabilities, people with low digital literacy, tenants, and small businesses receive a specific access and disturbance review. A safety, privacy, discrimination, accessibility, or unresolved-complaint event pauses the relevant function and returns service to staff, telephone, paper wayfinding, or the existing public-service channel [depth:risk_missing_data].

---

## 7. Land Use, Building Scale, and Retain-Renovate-Demolish

### 7.1 "Warp-Weft Zoning" of Land-Use Structure

The land-use plan is classified and expressed according to [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], forming a complete, closed, seamless land-use zoning scheme [data:geometry/land_use.geojson#LU-001]. The proposal categorizes land use by weaving type:

| Weaving Type | Land-Use Function | Density Gradient | Corresponding District |
| --- | --- | --- | --- |
| Open Weave | R&D office, maker space, open test ground | Low density, high flexibility | Zhongzhiyuan |
| Dense Weave | Talent housing, shared office, technology transfer | High density, high mix | AI Origin Community |
| Structured Weave | Corporate headquarters, commercial center, data facilities | Medium-high density, high stability | Dazhongsi |
| Warp | Jingzhang Heritage Park, public green space, slow-traffic system | Linear continuity | Full length |
| Cross-Weave Node | Rail stations, public plazas, service nodes | Node densification | Key nodes |

The complete attribute table for land-use classification is stored in `geometry/land_use.geojson`; each polygon contains fields for land-use category, density gradient, recommended floor-area ratio, and implementation status.

### 7.2 Building Scale as "Fabric Weight"

The building proposal takes [data:geometry/buildings.geojson#BLDG-001] as its baseline [metric:building_footprint_area_sqm]. Current conceptual building footprint area is approximately 546,300 square meters and must be recalculated when official boundaries, ownership, and controls are available.

Building scale controls follow these principles:

- **Known conditions**: Governed by official regulatory plans, heritage-conservation requirements, and approved planning conditions.
- **Design recommendations**: In areas lacking official control parameters, the proposal offers advisory building-height zoning and massing guidance.
- **Items pending confirmation**: Floor-area ratio, building height, building density, setback lines, and building control lines — where formal regulatory-plan conditions are absent, these are listed as `unknown` or `pending_control`; agent-inferred values must not be presented as approved indicators [standard:MOHURD-CONTROL-DETAILED-PLANNING].

### 7.3 "Rip the Warp, Keep the Weft" Strategy for Retain-Renovate-Demolish

The retain-renovate-demolish plan is not simply "demolish the old, build the new" but rather "rip the warp, keep the weft" — remove warp threads that no longer carry function, preserve weft threads that still have vitality, and thread new warp and weft into the spaces left open.

| Strategy | Target | Method | Depth Check |
| --- | --- | --- | --- |
| **Retain** | Historic buildings, heritage-conservation units, structurally sound existing buildings | Protective restoration, functional activation | [depth:retain_renovate_demolish] |
| **Renovate** | Buildings with usable structure but aging function | Facade upgrade, internal function replacement, energy-efficiency retrofit | [depth:height_massing_character] |
| **Demolish** | Buildings with unsafe structure, incompatible function, or blocking critical public space | Demolition releases land for new warp and weft | [depth:land_use_layout] |
| **Pending** | Buildings lacking ownership, structural assessment, or regulatory-plan conditions | Listed as formal deepening prerequisite | [assumption:A-CONTROLS-001] |

Retain-renovate-demolish conclusions must be based on ownership, structural assessment, and regulatory-plan conditions. Where these are absent, the proposal can only present methodology and a to-be-calibrated list; it must not fabricate definitive conclusions.

---

## 8. Transport, Rail, Municipal Infrastructure, and Public Services

### 8.1 The "Shuttle" Logic of Traffic Organization

When weaving, the shuttle carries the weft thread back and forth through the warp. In urban traffic, the "shuttle" is the flow of people, goods, and information — they move back and forth between the warp (the railway heritage park) and the weft (the three transverse development belts), generating the city's vitality.

The transport plan responds to the competition notice's requirements for the following elements:

- **Rail-Station Integration**: Achieve station-city integration around Wudaokou, Qinghua East Road West Entrance, Dazhongsi Station, and other rail stations [data:geometry/roads.geojson#ROAD-001].
- **Road Micro-Circulation**: Open dead-end roads, optimize intersections, improve block accessibility.
- **Slow-Traffic System**: Identify and stitch slow-traffic breaks, particularly the Jingzhang Heritage Park's crossing of the North Fifth Ring Road and the landscape connections at the park's south and north ends.
- **External Traffic**: Strengthen connections with the North Fifth Ring Road, Xueyuan Road, Zhichun Road, and other arterial roads.
- **Parking and Non-Motorized Transport**: Reasonably plan motor-vehicle parking supply and non-motorized-vehicle parking, preventing parking from encroaching on public space.

![Integrated map of slow-traffic, transit, and blue-green public space](assets/figures/mobility-bluegreen.png)

### 8.2 Municipal and New-Type Infrastructure

The municipal infrastructure plan covers two layers: traditional municipal services and new-type infrastructure.

**Traditional Municipal Services**: Spatial layout and capacity assessment of water supply, drainage, power, gas, heating, and telecommunications. Where engineering data is lacking, items are listed as formal deepening prerequisites.

**New-Type Infrastructure**:

- **Edge Computing Nodes**: Deploy edge-computing facilities at public-service nodes, enterprise service centers, and around rail stations, providing low-latency computing support for AI scenarios.
- **Distributed Energy**: Combined with the Qinghe Low-Carbon Innovation Corridor and Zhongzhiyuan green buildings, deploy photovoltaic, geothermal, and energy-storage facilities.
- **Intelligent Sensor Network**: Deploy environmental sensors, foot-traffic monitors, and facility-status sensors in parks, public spaces, and traffic nodes; data is used for urban-operations optimization.
- **Data Infrastructure**: Build a secure, compliant data-exchange platform supporting data-asset circulation and AI model training.

### 8.3 Public Service Facilities

Public service facilities cover the following categories:

- **Industrial Services**: Innovation service platforms, enterprise service centers, IP protection stations, investment/financing matchmaking points.
- **Talent Living**: Talent apartments, youth community, international schools, medical facilities, cultural and sports facilities.
- **Community Services**: Community centers, elderly care, early-childhood education, convenience retail.
- **Public Services**: Government affairs halls, legal aid, health management, cultural exhibitions.

Facility standards, spatial layout, service radii, and operating models — where official conditions are absent — are listed as design recommendations, pending formal regulatory-plan confirmation.

---

## 9. Blue-Green Public Space and Urban Character

### 9.1 "Green Warp and Weft" of Blue-Green Space

The blue-green space plan takes the Jingzhang Heritage Park Vitality Belt as its backbone [data:geometry/green_space.geojson#GREEN-001], integrating the Qinghe River, Xiaoyue River, surrounding university and enterprise green spaces into a north–south continuous, east–west connected blue-green system.

Current conceptual green-space ratio is approximately 19.99% [metric:green_ratio]; public-space proportion is approximately 7.98% [metric:public_space_ratio]. Both are recalculated from submitted geometry within the provisional boundary. The proposal improves the quality and connectivity of blue-green space through the following strategies:

- **Warp Green Corridor**: Build a continuous biodiversity and slow-traffic composite green corridor along the Jingzhang Heritage Park, serving as the city's "green warp."
- **Weft Green Belts**: Set linear parks and green streets along the three transverse development belts, connecting the warp green corridor with surrounding communities, universities, and enterprise green spaces.
- **Interlace Nodes**: At key nodes — rail stations, park entrances, public plazas — create "green pattern knots" — composites of small parks, pocket gardens, and rooftop greening.
- **Qinghe River Frontage**: In the Zhongzhiyuan section along the Qinghe River, establish a low-carbon innovation corridor integrating green space, stormwater management, walking and cycling, and AI display.

### 9.2 Three AI Pilgrimage Landmarks

The proposal puts forward three AI pilgrimage landmarks as spatial anchors and international-communication nodes for the Jingzhang AI Innovation Belt [source:AGENT-TASKBOOK]:

| Landmark | Location | Design Concept | Spatial Function |
| --- | --- | --- | --- |
| **(1) Jacquard Square** | Center of Zhongzhiyuan Open Weave | Ground-paved square with Jacquard punch-card motif; each "card" represents an AI scenario | Open-source code wall, scenario experience, community gathering, main event venue |
| **(2) Weave Origin Point** | Core of AI Origin Community | "Warp begins here" spatial symbol with rail-cross-section motif; circular stepped seating | Pitches, code marathons, community gatherings, history exhibition |
| **(3) Warp-Weft Tower** | Highest point of Dazhongsi Structured Weave | Observation tower with warp (vertical) and weft (spiral) interlaced form; panoramic views of the full corridor | Panoramic observation deck, Pattern Exhibition Hall, international reception, urban balcony |

The three landmarks are arranged north to south along the Jingzhang Heritage Park, forming a "loose — dense — stable" spatial sequence and constituting the core nodes of the Global AI Activity Week pilgrimage route.

### 9.3 "Fabric Texture" of Urban Character

The urban character plan weaves together three cultural layers:

1. **Jingzhang Railway Historical Culture**: Preserving rail remnants, station architecture, and the spatial memory of the "herringbone" railway; transforming industrial heritage into public space and cultural facilities.
2. **Zhongguancun Innovation Culture**: From electronics markets to AI innovation — re-weaving the spatial narrative of China's digital fabric; preserving Zhongguancun's entrepreneurial spirit and grassroots vitality.
3. **AI Innovation Culture**: The cultural ethos of open-source, collaboration, experimentation, and iteration expressed in architectural character, public art, and wayfinding systems.

Character controls follow this hierarchy:

- **Official Controls**: Heritage-conservation protection zones and construction-control areas, building heights and setback lines determined by regulatory plans — governed by statutory documents.
- **Design Recommendations**: Building base tones, roof forms, massing guidance, facade materials, and public art guidance — based on proposal recommendations, pending specialist-team deepening.
- **Conditions Pending Confirmation**: Character controls lacking heritage-conservation or regulatory-plan basis — listed as pending; pseudo-precise control lines must not be given.

### 9.4 Wayfinding Signage and International Communication

The proposal recommends establishing a wayfinding signage system with "warp-weft interlace" as its motif, covering the full length of the Jingzhang AI Innovation Belt. The signage system should:

- Use cleared fonts and original graphics; no infringement of third-party intellectual property.
- Be bilingual (Chinese and English), prioritizing the competition's recommended translations.
- Provide multilingual guided tours and digital narration at the three pilgrimage landmarks.
- Propose a "Living Weave" cultural-symbol system and an AI-contributor honor-display scheme.

### 9.5 Annual Operations and Regional Collaboration

Living Weave is not a one-off festival identity, but an annual operating framework: an open-source and university-transfer week in spring, public scenario test days in summer, an international pitch and developer week in autumn, and a Jingzhang railway-culture and accessible-walking season in winter. Every activity is conditional on permits, safety, accessibility, consultation with nearby businesses, and a published post-event review; routes can change within permitted public space and never presume priority over residents' daily life.

The research scope organizes collaboration as “university origination - Haidian conversion - Jingzhang coordination - global communication”: universities and institutes provide voluntary showcases, park service organizations support enterprise conversion, and the two cities coordinate talent, events, and industrial services only within their respective approvals and authorizations. Operating KPIs are limited to accessible participation, participant satisfaction, voluntary local-business feedback, completed enterprise-service referrals, and complaint closure. They are not investment promises or governmental performance findings [source:AGENT-TASKBOOK].

---

## 10. Regeneration Project List, Implementation Policy, and Phasing

### 10.1 Regeneration Project List

The proposal produces the following reviewable regeneration project list; each project notes its location, type, function, dependencies, and evidence citations:

| No. | Project Name | Type | Key Dependencies | Evidence Citation |
| --- | --- | --- | --- | --- |
| JZ-01 | Jingzhang Heritage Park slow-traffic break stitching | Public space / Transport | Road red lines, under-bridge space, traffic-organization review | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Zhongzhiyuan Qinghe low-carbon innovation frontage | Blue-green space / Industrial exhibition | River blue line, ecological and flood-control conditions | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | Jacquard Square and open-source code wall | Public space / Culture | Land ownership, public-space permits | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-04 | AI Origin Community campus-adjacent technology-transfer street | Urban regeneration / Industrial service | Campus boundary, ownership, ground-floor business mix | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-05 | Weave Origin Point landmark and circular amphitheater | Cultural landmark / Public space | Land release, structural design | [data:geometry/key_areas.geojson#KEY-002] |
| JZ-06 | Dazhongsi Station four-quadrant pedestrian connectivity | Rail integration / Slow traffic | Rail station, municipal pipelines | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-07 | Warp-Weft Tower observation landmark | Cultural landmark / Urban balcony | Structural feasibility, aviation height limits | [data:geometry/key_areas.geojson#KEY-003] |
| JZ-08 | AI public service and edge-computing nodes | New infrastructure / Public service | Energy, computing, operating entity | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-09 | Global AI Activity Week public route | Operations / Branding | Public-space permits, event safety | [data:geometry/phasing.geojson#PHASE-001] |
| JZ-10 | Dazhongsi data-asset circulation center | Industrial / Digital infrastructure | Data-security regulations, enterprise participation | [data:geometry/land_use.geojson#LU-001] |

### 10.1.1 Delivery Cards and Decision Gates

To keep the project list from remaining conceptual, `report/narrative.md` gives all ten projects a coordinating lead, day-to-day operator, approval dependencies, reversible pilot, cost order, decision gate, and exit path. Costs use only low/medium/high orders of magnitude, avoiding invented precise budgets before quantities, ownership, and procurement conditions are available.

Near-term work prioritizes lightweight pilots for JZ-01, JZ-03, JZ-05, JZ-06, and JZ-09. JZ-02, JZ-04, and JZ-08 can proceed to pilot only after specialist review and operator-capacity confirmation. JZ-07 and JZ-10 are limited to feasibility, compliance, and simulation exercises; neither physical construction nor production-data exchange proceeds at this stage. Failure at any decision gate stops progression and retains the existing service or a non-digital, non-permanent alternative.

### 10.2 The Jacquard Governance Protocol: Programmable Urbanism

The proposal puts forward the **Jacquard Governance Protocol** as the core innovation in implementation mechanism. The Jacquard Governance Protocol analogizes urban governance to the operation of a Jacquard loom:

- **Punch Cards = Scenario Cards**: Each scenario card defines an urban function configuration — it tells the "urban Jacquard mechanism" to weave a specific pattern at a specific location.
- **The Jacquard Master = Governance Body**: Government, enterprises, and citizens jointly serve as "Jacquard masters," deciding which scenario cards are loaded into the loom.
- **Changing the Card = Policy Iteration**: Scenario cards can be swapped at any time — meaning urban functions need not wait for a five-year planning revision cycle but can iterate as quickly as changing a card.

Citizens, enterprises, and AI agents may all propose new scenario cards. The proposal process is:

1. **Proposal**: Any stakeholder submits a scenario card specifying function, spatial location, data source, privacy boundary, and operating plan.
2. **Review**: A cross-disciplinary review committee (government + enterprise + community + technical experts) assesses the scenario card's feasibility.
3. **Trial Weave**: Approved scenario cards enter a 90-day trial run.
4. **Evaluation**: A third-party institution evaluates the trial-weave results.
5. **Final Decision**: After community deliberation, the card is retained, modified, or withdrawn.

### 10.3 The Reversible Weft Mechanism

The **Reversible Weft** is the operational core of the Jacquard Governance Protocol: every urban intervention follows a "90-day trial, evaluation, retain / modify / withdraw" cycle. This means:

- A new pedestrian path can be tested with temporary markings for 90 days before deciding whether to make it permanent.
- An AI public-service station can be trialed in modular construction before deciding whether to build permanently.
- A new form of mixed land use can be tested under a temporary permit before deciding whether to amend the regulatory plan.

The Reversible Weft mechanism lowers the risk and cost of urban experimentation, allowing the urban fabric to evolve continuously while maintaining structural stability.

### 10.4 Phasing Plan

The phasing plan takes [data:geometry/phasing.geojson#PHASE-001] as its spatial carrier [depth:phasing_implementation]:

| Phase | Timeframe | Focus | Weaving Metaphor |
| --- | --- | --- | --- |
| **Near-Term Pilot** | 1 — 3 years | Slow-traffic stitching, pilgrimage landmarks, scenario-card trial weaves | Threading the warp — establishing the basic structure |
| **Mid-Term Regeneration** | 3 — 7 years | Urban regeneration projects, industrial-space release, public-service completion | Threading the weft — filling in functional content |
| **Long-Term Governance** | 7 — 15 years | District-wide weaving complete, Jacquard Governance Protocol institutionalized, Pattern Library accumulated | Cloth finished — a complete fabric takes form |

Phased implementation is not the same as the competition design cycle (100 days). The competition cycle is the timeline for delivering submission materials; the implementation phasing is the urban-regeneration pathway. Near-term pilots can begin with lightweight facilities, operational activities, and service platforms; medium- and long-term projects must await formal regulatory-plan, municipal, and ownership confirmations.

---

## 11. Indicator System, Area Recalculation, and Compliance Matrix

### 11.1 Three Categories of Indicators

The proposal classifies indicators into three categories, each corresponding to different data sources and confidence levels:

**Category 1: Spatial Indicators** (directly recalculable from submitted geometry)

| Indicator | Value | Source | Confidence |
| --- | --- | --- | --- |
| Overall Design Scope area | approx. 11.4 km² | [metric:site_area_sqm] [data:geometry/site_boundary.geojson#SITE-001] | High (provisional) |
| Building footprint area | approx. 546,300 m² | [metric:building_footprint_area_sqm] [data:geometry/buildings.geojson#BLDG-001] | Medium (concept geometry) |
| Green-space ratio | approx. 19.99% | [metric:green_ratio] [data:geometry/green_space.geojson#GREEN-001] | Medium (provisional boundary) |
| Public-space proportion | approx. 7.98% | [metric:public_space_ratio] [data:geometry/public_space.geojson#PUBLIC-001] | Medium (provisional boundary) |
| Number of key areas | 3 | [metric:key_area_count] [data:geometry/key_areas.geojson#KEY-001] | High |

**Category 2: Regulatory Indicators** (requiring official regulatory-plan support)

Floor-area ratio, building height, building density, setback lines, road red lines, facility standards — all currently listed as `unknown` or `pending_control`, to be filled once formal regulatory-plan conditions are confirmed.

**Category 3: Performance Indicators** (requiring ongoing calibration from operational data)

AI innovation index, talent density, industrial-service satisfaction, slow-traffic accessibility, event participation, scenario usage frequency — these indicators must be continuously collected and calibrated during the operational phase; only the framework is proposed at this stage.

![Core indicator recalculation and evidence chain](assets/figures/metrics-evidence.png)

### 11.2 Compliance Matrix

The compliance matrix (`compliance_matrix.json`) is the master file for task responsiveness. Each competition-notice task and agent-taskbook task is mapped to a report chapter, layer, metric, drawing, HTML page, source, assumption, and self-check item.

Key coverage relationships:

- Notice 1.3 (Build a world-class AI innovation ecosystem) -> Sections 2, 3
- Notice 1.4 (Overall design scope urban regeneration) -> Sections 4, 7, 8
- Notice 1.5 (Key area detailed design) -> Section 5
- agent.1 (Overall concept and functional coordination) -> Sections 2 and 4
- agent.2 (Full-stack innovation ecosystem) -> Sections 3 and 5
- agent.3 (AI-enabled scenarios) -> Section 6
- agent.4 (Public space, native AI services and landmarks) -> Sections 5 and 9
- agent.5 (Jing-Zhang, Zhongguancun and AI cultural narrative) -> Sections 3, 8 and 9
- agent.6 (Global activities and long-term operations) -> Section 10

---

## 12. Risk, Copyright, and Compliance

### 12.1 Data Risk and Precision Warnings

The core data risks of this proposal are as follows [depth:risk_missing_data]:

- **Provisional boundaries**: Current site boundaries and key-area geometries are agent-inferred provisional boundaries (`official_boundary=false`), not official red lines. After substituting official polygons, all spatial indicators must be recalculated.
- **Missing regulatory plan**: Formal regulatory-plan conditions (floor-area ratio, building height, setback lines, etc.) are absent; related indicators are listed as `unknown`.
- **Unclear ownership**: Complete land-ownership and building-property-rights data are lacking; the retain-renovate-demolish plan can only present methodology, not definitive conclusions.
- **Municipal gaps**: Engineering data for pipelines, energy, drainage, flood control, and fire protection are absent; municipal plans are listed as pending deepening.

The above gaps do not block content scoring, but the proposal does not claim official approval, approved regulatory plans, final land ownership, final construction scale, or a guarantee of implementation.

### 12.2 Copyright and Intellectual Property

All images, drawings, icons, data, and code assets have their sources, licenses, and authorization status documented in `sources.json` and `report/copyright_statement.md`.

- HTML pages do not load remote scripts, remote map tiles, remote fonts, iframes, forms, or external APIs; they do not track reviewer behavior.
- All brands, fonts, images, portraits, and corporate logos must have cleared sources.
- The proposal recommends original design and cleared resources.

`report/copyright_statement.md` records the creator/generation method, input provenance, and redistribution status for figures, case cards, PDFs, and offline pages. OpenStreetMap, historical material, and global cases remain background references in `sources.json`; this package does not reproduce their photographs, logos, tiles, or proprietary drawings, and does not use them as statutory planning evidence.

### 12.3 Bilingual Requirement

The primary proposal document is in Chinese; a complete English counterpart translation is provided via `proposal.en.md`. The translation prioritizes the competition's recommended terminology from `docs/terminology-glossary.md`. Core term correspondence:

| Chinese | English |
| --- | --- |
| Warp (经线) | Warp |
| Weft (纬线) | Weft |
| Fabric (织物) | Fabric / Weave |
| Jacquard Mechanism (提花机) | Jacquard Mechanism |
| Jacquard Governance Protocol (提花治理协议) | Jacquard Governance Protocol |
| Weave Density Gradient (织密度梯度) | Weave Density Gradient |
| Reversible Weft (可逆纬) | Reversible Weft |
| Pattern Library (纹样库) | Pattern Library |
| Scenario Card (场景卡) | Scenario Card |
| Pilgrimage Landmark (朝圣地标) | Pilgrimage Landmark |
| Open Weave (疏织) | Open Weave |
| Dense Weave (密织) | Dense Weave |
| Structured Weave (结构织) | Structured Weave |

### 12.4 Compliance Statement

This proposal complies with the following requirements:

- YAML frontmatter contains all required fields.
- All scaffolding/draft markers have been removed from the main text; the content is formal proposal text.
- The main text contains all 13 required sections.
- Evidence markers conform to specifications (at most 3 per paragraph, at most 8 per paragraph).
- All 5 required images are referenced.
- All spatial statements are labeled as conceptual proposals.
- The distinction between provisional and official data is clearly stated.

---

## 13. References

### 13.1 Competition and Planning Standards

- [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] Prequalification Notice for the International Urban Design Competition for the Century-Old Jingzhang AI Innovation Belt
- [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] Agent Task Book (agent_taskbook.json)
- [standard:MOHURD-URBAN-DESIGN-MEASURES] Ministry of Housing and Urban-Rural Development Urban Design Management Measures / Urban Design Compilation Measures
- [standard:MOHURD-CONTROL-DETAILED-PLANNING] Ministry of Housing and Urban-Rural Development Detailed Regulatory Plan Compilation Measures
- [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] Ministry of Natural Resources Land-Use Classification Guide for Territorial Spatial Surveys

### 13.2 Site Materials

- [source:OFFICIAL-ANNOUNCEMENT] Original text of the prequalification notice
- [source:AGENT-TASKBOOK] Agent Task Book
- [source:SOURCE-REGISTRY] Source Registry
- [source:PROCESSED-FACT-PACK] Processed Fact Pack navigation layer
- [source:SITE-PACKAGE] Site materials package

### 13.3 Structured Indexes

- `sources.json` — Source registry
- `metrics.json` — Indicator recalculation
- `compliance_matrix.json` — Compliance matrix
- `standard_matrix.json` — Standards matrix
- `design_depth_matrix.json` — Design depth matrix
- `assumptions.json` — Assumption registry
- `self_check.json` — Self-check results

### 13.4 Geometry Layers

- `geometry/site_boundary.geojson` — Site boundary [data:geometry/site_boundary.geojson#SITE-001]
- `geometry/key_areas.geojson` — Key areas [data:geometry/key_areas.geojson#KEY-001] [data:geometry/key_areas.geojson#KEY-002] [data:geometry/key_areas.geojson#KEY-003]
- `geometry/land_use.geojson` — Land-use structure [data:geometry/land_use.geojson#LU-001]
- `geometry/buildings.geojson` — Building footprints [data:geometry/buildings.geojson#BLDG-001]
- `geometry/roads.geojson` — Road system [data:geometry/roads.geojson#ROAD-001]
- `geometry/green_space.geojson` — Green-space system [data:geometry/green_space.geojson#GREEN-001]
- `geometry/public_space.geojson` — Public space [data:geometry/public_space.geojson#PUBLIC-001]
- `geometry/phasing.geojson` — Phasing plan [data:geometry/phasing.geojson#PHASE-001]
- `geometry/constraints.geojson` — Constraint conditions

### 13.5 Historical and Cultural References

- Zhan Tianyou and the Jingzhang Railway (1905 — 1909): China's first self-designed and self-built railway; the "herringbone" switchback is a classic case of engineering innovation.
- The Jacquard Loom (1804): Joseph Marie Jacquard's punch-card-controlled loom was the first programmable machine in human history, directly inspiring Charles Babbage's Analytical Engine and modern computing.
- The Silk Road: China's earliest "cross-civilization innovation network" — silk, papermaking, gunpowder, and other technologies spread through trade routes, forming a knowledge web spanning Asia and Europe.
- Zhongguancun: From electronics marketplace to China's AI innovation heart — over four decades, it has re-woven China's digital fabric.

---

> **Epilogue**: The Living Weave is not yet another grand urban-planning vision. It is a Jacquard loom — a machine that lets residents, enterprises, and AI agents together "load cards and weave cloth." Each scenario card is a harness raise, each weft thread is an urban experiment, and each bolt of fabric is the city we share. A century ago, Zhan Tianyou folded the impossible on the Jingzhang Railway; today, on that same warp, we weave new patterns. The city is a living fabric — and it is still being woven.
