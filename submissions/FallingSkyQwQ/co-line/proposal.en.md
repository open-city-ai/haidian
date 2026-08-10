---
title: "Human-Machine Co-Line: Urban Design Proposal for the Centennial Jing-Zhang AI Innovation Belt"
author_github: "FallingSkyQwQ"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Taking the 1909 \"人\"-character switchback railway at Qinglongqiao as its historical prototype, this proposal puts forward the overarching concept of \"Human-Machine Co-Line\": using a deterministic urban skeleton to adapt to the uncertain iteration of AI. It organizes the 11.4 km² Overall Design Area through \"One Spine, Three Stations, Two Wings\" (Machine Depot · Zhongzhiyuan, The Switchback · Origin Community, Marshalling Yard · Dazhongsi, Transfer Hub · Zhongguancun Wing, Test Track · Xiaoyue River Wing), takes \"from Suzhou Numerals to Open Source Code\" as its cultural narrative, and anchors pilgrimage landmarks in the agent contribution log wall, Commit 0 Plaza, and the open-source achievement gallery, forming 14 scenario cards, 6 user personas, and the annual \"Jing-Zhang Open Source Festival\" operating mechanism. All spatial recommendations are conceptual, generated from the provisional boundary, and will be fully recalculated once the official planning boundary is released."
tracks: ["jingzhang-heritage-narrative", "civic-agent-governance", "robotics-autonomous-mobility"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed", "ai-health-service-navigation"]
iteration: "v1.0"
---

# Human-Machine Co-Line: Urban Design Proposal for the Centennial Jing-Zhang AI Innovation Belt

> **Concept Core**: In 1909, Zhan Tianyou wrote the character "人" (ren, "human") in steel rails at Qinglongqiao: a deterministic track climbing an uncertain mountain gradient. In 2026, along that same line, we write "人机" (ren-ji, "human and machine"): a deterministic urban skeleton adapting to the uncertain iteration of AI. **The "人"-character railway is the engineering prototype of "a deterministic skeleton adapting to an uncertain gradient."**

## Design Basis and Source List

This proposal takes as its primary authoritative basis the Prequalification Announcement for the International Urban Design Solicitation for the Centennial Jing-Zhang AI Innovation Belt, issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources, which established the 43.6 km² Coordinated Research Area, the 11.4 km² Overall Design Area, the 368.4 ha Key-Area Detailed Design Area, and the "Three Zones and Two Wings" spatial framework and design tasks [source:OFFICIAL-ANNOUNCEMENT]. The excerpted agent-facing open-call taskbook (`agent_taskbook.json`) supplements these with the three positioning goals, the five functions, the Three Zones and Two Wings, the six agent tasks agent.1 to agent.6, the ten co-creation principles, and the unified boundary clause, and every chapter of this proposal responds to these requirements [source:AGENT-TASKBOOK]. The Source Registry (`data/source_registry.json`) defines the permitted use of each source: formal citation in this proposal uses only approved public sources and rights-cleared material, while the provisional boundary is used solely for generation, visualization, and design discussion [source:SOURCE-REGISTRY].

Since the official precise planning boundary has not yet been released, this proposal uses a package generated from the provisional coarse boundary in `brief/site-package/geometry/provisional_boundaries.geojson` [source:PROVISIONAL-BOUNDARIES]. The provisional boundary of the Overall Design Area is a north-south linear corridor approximately 1.37 km wide and 9.72 km long, running from Xizhimen to the North Fifth Ring Road along the Jing-Zhang Railway Heritage Park; the three key-area provisional polygons are Zhongzhiyuan at approximately 192.1 ha, Beijing AI Origin Community at approximately 104.3 ha, and Dazhongsi AI Industry Cluster at approximately 72.0 ha [data:geometry/site_boundary.geojson#SITE-001] [metric:key_area_count]. All geometry is flagged `provisional_constraint` and may not serve as the official planning boundary, exact area, or statutory control basis; once the official polygon is released, all layers and metrics in this package will be recalculated end-to-end [depth:metrics_recalculation].

```text
⚠️ Accuracy disclosure: This proposal is generated from a provisional coarse boundary. The provisional boundary is used only for this submission, self-checking, visualization, and design discussion; after the official planning boundary is released, the site boundary, key areas, land use, roads, green space, public space, buildings, phasing, and all metrics must be recalculated against the official geometry. Data gaps on the organizer's side do not block content scoring.
```

The proposal's baseline assessment further draws on Phase 2 of the Jing-Zhang Railway Heritage Park, which just opened on August 6, 2026 (9 km in full length, approximately 53 ha, 46 entrances, 9 city branch roads, 12 garden nodes) [source:PARK-PHASE2-2026] [source:PARK-PHASE2-PLAN]; on the north segment of Phase 1, with its "one track, twelve gardens," the bridge-column murals, and the Suzhou numerals painted along the sheltered running track [source:PARK-PHASE1-NORTH-2025]; on the scale of Haidian's AI industry (over 2,000 AI enterprises, 26 unicorns, 130 registered large models, a core industry scale exceeding RMB 350 billion accounting for 30% of the national total, and over 80% of the belt's talent pool) [source:HAIDIAN-AI-INDUSTRY-2026]; and on the "Human-Machine Co-Evolution Experiment Field" planning direction set at the mid-term review on July 24, 2026 [source:HAIDIAN-MIDTERM-2026]. Eight global AI innovation ecosystems, including Paris Station F and London King's Cross, are cited as transferable mechanism references [source:CASE-STATION-F] [source:CASE-KINGS-CROSS]. The complete source list is in `sources.json`, professional-standard responses in `standard_matrix.json`, and deliverable-depth evidence in `design_depth_matrix.json`.

## Three-Level Scope Framework

The work is organized around the three levels defined in the announcement, each with a clear design question, spatial depth, and deliverable [depth:three_level_scope_framework]:

| Level | Area | Design Question | This Proposal's Answer |
| --- | --- | --- | --- |
| Coordinated Research Area | 43.6 km² | How should the AI industry ecosystem and the future urban form be organized? | The "Human-Machine Co-Line" overarching concept, the naming and logo system, the Three Zones and Two Wings synergy loop, and 8 global case studies [source:OFFICIAL-ANNOUNCEMENT] |
| Overall Design Area | 11.4 km² | How should industrial space, renewal, transport and municipal works, and urban character be mapped? | The "One Spine, Three Stations, Two Wings" spatial structure, the land-use layout, the renewal project list, and phased implementation [data:geometry/land_use.geojson#LU-001] |
| Key-Area Detailed Design Area | 368.4 ha | How should the three sub-areas reach detailed design depth? | The spatial actions and AI scenarios of Machine Depot · Zhongzhiyuan, The Switchback · Origin Community, and Marshalling Yard · Dazhongsi respectively [data:geometry/key_areas.geojson#PROV-KEY-001] |

The three levels are not disconnected sets of drawings: the Coordinated Research Area determines the judgments on the industry chain and urban form, the Overall Design Area grounds those judgments in renewal projects and facility capacity, and the key areas test the implementability of specific parcels, buildings, transport, public space, and AI scenarios [depth:overall_spatial_structure]. In `compliance_matrix.json`, the three levels are mapped item by item against tasks 1.3, 1.4, and 1.5 of the announcement and agent.1 to agent.6, ensuring that every mandatory task has chapter, layer, metric, drawing, and HTML evidence.

![Overall concept and spatial structure](assets/figures/site-overview.png)

## Coordinated Research Area: Industry and Future City Research

### Overarching Concept: "Human-Machine Co-Line"

A century ago, the "人"-character railway at Qinglongqiao was not an invention from thin air; it was Zhan Tianyou's first introduction to China of the then most advanced switchback (zig-zag) line-lengthening technique in the world, applied to solve the 33‰ grade of the Guanggou section [source:QINGLONGQIAO-SWITCHBACK]. Its essence was **using a deterministic track to climb an uncertain mountain gradient**. Today, the uncertainty of AI iteration far exceeds any mountain gradient, yet urban planning must respond with certainty. This proposal argues: **let the entire innovation belt become a "Human-Machine Co-Line": one stroke is the technology axis (how machines are created), one stroke is the life axis (how machines serve people), and the point where they intersect is the Beijing AI Origin Community (the birthplace of the Human-Machine Co-Line).**

This concept responds directly to the positioning raised at the mid-term review, "using the certainty of the planning layout to adapt to the uncertainty of AI technology iteration," and to the "Human-Machine Co-Evolution Experiment Field" [source:HAIDIAN-MIDTERM-2026]: **the deterministic skeleton** (the railway green corridor, the "three paths and one green," rail stations, and municipal trunk lines) carries the city's stability and continuity; **the flexible content** (reserved white-space land, renewable projects, and reversible pilots) carries the iteration and experimentation of AI businesses. This is precisely the planning translation of the "人"-character railway.

### Naming System and Logo Direction

A belt-wide naming system is built from railway functional vocabulary (avoiding slogan-style naming; all are conceptual recommendations [source:AGENT-TASKBOOK]):

| Space | Name | Railway Metaphor | Design Positioning |
| --- | --- | --- | --- |
| Jing-Zhang Heritage Park, 9 km | **Open Source Mainline** | Main line / observability | Stitching east-west, connecting north-south, 12 gardens = 12 release nodes |
| Zhongzhiyuan AI Independent Innovation Acceleration Area | **Machine Depot** | Locomotives are built here | Full-stack independent innovation, national platform, computing power and standards [source:HAIDIAN-AI-INDUSTRY-2026] |
| Beijing AI Origin Community | **The Switchback** | The line turns here | The 1-km campus-adjacent ecosystem around Tsinghua, Peking University, and CAS; research converting into products |
| Dazhongsi AI Industry Cluster | **Marshalling Yard** | Vehicles assemble into trains | Aggregation of agents, terminals, and content; circulation of data factors |
| Zhongguancun Technology Services Wing | **Transfer Hub** | Global factors transfer here | Capital, IP, cross-border services |
| Xiaoyue River Scenario Enablement Wing | **Test Track** | New equipment is tested here | Embodied intelligence, robotics, low-speed autonomous-driving pilots |
| 46 entrances / 9 branch roads | **Merge Points** | Branch lines merge into the main line | Everyday east-west life merges onto the mainline |

**Logo direction**: the character "人" is written by two steel rails (the switchback line form), with a golden dot at their intersection (a yuzu fruit, a winter sun, and the motif of this proposal's agent "Yuzu-chan"), meaning that humans and machines meet at the switchback. The visual standards (rail red, steel gray, high-speed-rail white, yuzu gold) and the auxiliary graphics (Suzhou-numeral letterforms, rail cross-sections, mileage markers) are shown in the brand section of `visual/index.html` and in the A3/A0 drawings [depth:overall_spatial_structure].

### Global AI Innovation Ecosystem Case Studies and Three Zones and Two Wings Synergy

This proposal studies 8 global AI innovation ecosystems and extracts transferable mechanisms (the case table is in `sources.json` and the A3 documents):

1. **Paris Station F**: a 1929 railway freight warehouse converted into the world's largest startup campus (34,000 m², 3,000 workstations, 21 corporate programs), a direct precedent for reusing railway heritage, pointing to the Dazhongsi sub-area and the heritage-park corridor [source:CASE-STATION-F].
2. **London King's Cross**: regeneration of railway land into a one-mile "knowledge quarter" (UCL, the Crick Institute, Google's headquarters) plus one-third of the entire site given to public space, pointing to the "1-km campus-adjacent ecosystem around Tsinghua, Peking University, and CAS" at the Origin Community and to the park's publicness [source:CASE-KINGS-CROSS].
3. **Singapore one-north**: a government-led 200-hectare zoned cluster (Biopolis/Fusionopolis/Mediapolis) plus low-cost conversion of old factories (Block 71), pointing to the zonal organization of the Machine Depot and the low-cost carriers of the Marshalling Yard [source:CASE-ONE-NORTH].
4. **Tel Aviv**: empirical evidence that university knowledge spillover decays within about 1 km (multiple regional-science publications) underpins the "1-km campus-adjacent ecosystem," the spatial logic of the Origin Community [source:CASE-TEL-AVIV].
5. **Shenzhen**: vertical supply chains, a 48-hour prototype turnaround, and subsidized maker spaces, pointing to the hardware/embodied-intelligence testing capacity of the Test Track [source:CASE-SHENZHEN].
6. **Toronto-Waterloo Corridor**: the Vector Institute, a tripartite government-industry-university co-invested AI anchor institution, pointing to the organizational model of the national AI platform at Zhongzhiyuan [source:CASE-VECTOR-TO].
7. **Hsinchu Science Park**: full-chain government support, embedded universities/research institutes (ITRI), and a single managing authority, pointing to the "full-stack independent" governance structure of the Machine Depot [source:CASE-HSINCHU].
8. **e-Estonia**: X-Road data exchange and e-ID as an "invisible urban system," pointing to the digital services layer of the Transfer Hub and the Urban Agent governance console [source:CASE-E-ESTONIA].

**Three Zones and Two Wings synergy loop** (organizing the AI industry's "build-release-deploy-test" cycle into a spatial closed loop): Machine Depot (build, full-stack integration) → The Switchback (release, research converting into products) → Marshalling Yard (deploy, market aggregation) → Test Track (staging, real-world scenario testing) → Transfer Hub (registry, capital and dependencies), then flowing back to the Machine Depot. The heritage-park mainline is the "observability" interface throughout: on the main line, the public can see at a glance what this innovation pipeline is running. The three positioning goals (the centennial Jing-Zhang cultural belt, the urban AI lifestyle experience belt, and the AI-integrated innovation belt) and the five functions (full-stack independent innovation, a world-class ecosystem, AI-enabled scenario empowerment, an intelligent vibrant city, and AI governance voice) each find their place within this loop [source:AGENT-TASKBOOK].

![Index and design tasks of the three key areas](assets/figures/key-areas.png)

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Spatial Structure: One Spine, Three Stations, Two Wings

In essence, the Overall Design Area is a north-south linear corridor unfolding along the Jing-Zhang Railway. This proposal puts forward the "**One Spine, Three Stations, Two Wings**" spatial structure [data:geometry/land_use.geojson#LU-001]:

- **One Spine**: the 9-km "Open Source Mainline" of the heritage park, a continuous park-and-greenway spine that threads the three stations and carries the two wings, with residential areas and campuses on the east and west sides connecting in through 46 Merge Points [source:PARK-PHASE2-PLAN].
- **Three Stations**: the Machine Depot (Zhongzhiyuan) at the north end, The Switchback (Origin Community) in the middle, and the Marshalling Yard (Dazhongsi) at the south end, each carrying one segment of the AI innovation chain [data:geometry/key_areas.geojson#PROV-KEY-002].
- **Two Wings**: the Transfer Hub (Zhongguancun technology services) on the west and the Test Track (Xiaoyue River scenario enablement) on the east, interlocked with the spine through transverse walking-and-cycling routes and rail feeder connections.

### Land-Use Layout

The land-use layout is organized along the spine (classified per the national territory spatial land-use classification [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; all of it is conceptual): research land (0802) concentrates on both sides of the Machine Depot and The Switchback; commercial and services land (05) concentrates around the Marshalling Yard and the rail stations; education land (0804) responds to Tsinghua, Peking University, Beihang, BUPT, and other universities and research institutes; residential land (0701) and talent apartments continue along both sides of the corridor; healthcare (0806), cultural (0803), and sports (0805) uses fill in per the five-minute life-circle. **The proposal's signature design move is "reserved white-space land (16)"**: flexible reserved parcels around the three stations serve as "version reservations" for AI business iteration, precisely the land-use expression of "certainty adapting to uncertainty," and the differentiator from an ordinary park proposal [depth:land_use_layout].

### Overall Urban Renewal Framework

Renewal targets are organized along three threads (conceptual recommendations [depth:retain_renovate_demolish]): ① railway heritage revitalization (Phase 2 of the heritage park already achieves 9 km of continuous connection, and this proposal layers AI public functions on top of it) [source:PARK-PHASE2-2026]; ② regeneration of low-efficiency space (the West Suburb Food Cold Storage Plant, whose 1958 first-batch cold stores turn into an AI sci-tech innovation campus; the Mingguangcun sub-area renewal; and activation of commercial carriers such as Dazhongsi Zhongkun Plaza and Lanjinglija) [source:HAIDIAN-MIDTERM-2026]; ③ campus-adjacent space around universities (the youth-energy interface of Wudaokou, the "Center of the Universe," and integration of rail-station nodes such as the west entrance of Qinghua East Road) [source:WUDAOKOU-ORIGIN]. Renewal adheres to the principles of "low disturbance, organic renewal, and reversibility," consistent with the announcement's requirement that the Origin Community "explore low-disturbance organic renewal" [source:OFFICIAL-ANNOUNCEMENT].

## Detailed Design of Key Areas

### Machine Depot · Zhongzhiyuan AI Independent Innovation Acceleration Area (approx. 192.1 ha)

**Positioning**: the "traction segment" of the full-stack independent AI innovation system. With Xuebei Garden (238,300 m², opened in July 2026, with the National Natural Science Foundation of China signed in as a tenant) as its real-world anchor, R&D clusters are organized around Xuezhiyuan Station on the Changping Line [source:XUEBEIYUAN-2026].

**Spatial actions** (conceptual recommendations): ① **underground integration**: following the precedent of the underground-level connection between Xuebei Garden and Tencent's new headquarters, the "Machine Depot" R&D parcels are linked into a whole by underground corridors, so that "full-stack components circulate within the workshop"; ② **Qinghe River interface**: the northern edge along the Qinghe River (the Haidian section is 11.6 km, with 10.33 km of waterfront remediation [source:QINGHE-XIAOYUEHE-BLUE]) forms an R&D-garden interface, and the Jing-Zhang Loop 1909 Plaza is upgraded into "Commit 0 Plaza" (the northern gateway and one of the pilgrimage landmarks); ③ **Fifth Ring gateway**: the North Fifth Ring Road entrance shapes the image of an "Open Source Gate," with external transport feeder connections added. AI scenarios: full-stack R&D and testing, a model and computing-power scheduling center, and a safety and governance laboratory.

### The Switchback · Beijing AI Origin Community (approx. 104.3 ha)

**Positioning**: the "turning place" of innovation. The 1-km "campus-adjacent innovation ecosystem" around Tsinghua, Peking University, and CAS is the only point on the whole line where university knowledge origination switches back to market application: just as the Qinglongqiao switchback lets a train reverse direction and climb, the Origin Community lets research results reverse direction and enter products [source:CASE-TEL-AVIV].

**Spatial actions** (conceptual recommendations): ① **Switchback Plaza**: around Wudaokou Station, public space shaped as "the place where the line turns," with an AI talent station and an achievement-release interface; ② **campus-adjacent commercialization street**: along the street interface connecting Tsinghua, Peking University, CAS, and the rail station, incubators, open-source communities, and showcase windows; ③ **low-disturbance renewal**: sub-area renewal organized around the "Switchback" motif, avoiding large-scale demolition and construction [source:OFFICIAL-ANNOUNCEMENT]. AI scenarios: university-originated incubation, open-source community co-writing, and talent-station services.

### Marshalling Yard · Dazhongsi AI Industry Cluster (approx. 72.0 ha)

**Positioning**: the "marshalling yard" of agents, smart terminals, and content consumption, assembling scattered AI-native businesses into an industrial train. It is underpinned by the interchange status of Line 12 (opened December 2024) and Line 13 meeting here [source:LINE12-DAZHONGSI].

**Spatial actions** (conceptual recommendations): ① **four-quadrant pedestrian connectivity**: a direct answer to the real gap that **transferring between Line 12 and Line 13 at Dazhongsi Station currently requires an out-of-station walk of about 8 minutes**; a station-city-integrated walking system stitches the four quadrants together so that "marshalling" is done efficiently at the rail node [source:LINE12-DAZHONGSI]; ② **smart business district**: activating existing commercial carriers such as Zhongkun Plaza, with smart-terminal experience stores, an agent-application supermarket, and content-consumption space; ③ **composite use of green space**: the underground and edge spaces of planned green land host data-factor circulation and testing scenarios. AI scenarios: an agent application market, smart-terminal experiences, and a data-factor circulation pilot.

### The Two Wings

**Transfer Hub · Zhongguancun Technology Services Wing**: a "transfer station" for global capital, IP, and cross-border services, corresponding to Zhongguancun's "dare to be first in the world" startup IP and capital ecosystem [source:ZHONGGUANCUN-CULTURE]. It grounds a service network for policy, scenarios, data, compliance, and investment and financing (echoing policy instruments such as computing-power subsidies and model vouchers in the Several Measures on the AI Industry Highland of Zhongguancun Science City [source:ZGC-91-MEASURES]).

**Test Track · Xiaoyue River Scenario Enablement Wing**: along the Xiaoyue River (6.41 km of total remediation [source:QINGHE-XIAOYUEHE-BLUE]), low-speed, supervised, and reversible real-world testing scenarios for embodied intelligence, robotics, and autonomous driving, with waterfront walkways and sensing infrastructure, turning "scenario enablement" into a tangible public experience [source:AGENT-TASKBOOK].

![Integrated mobility, walking-cycling, and blue-green public space system](assets/figures/mobility-bluegreen.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### User Personas (6 Types)

| Persona | Core Needs | Primary Spaces |
| --- | --- | --- |
| Top-tier research talent | Deep computing power, international exchange, quiet deep work | Machine Depot R&D clusters, The Switchback laboratories |
| AI founders and developers | Low-cost carriers, open-source community, financing and policy services | The Switchback incubation street, Transfer Hub service network |
| Enterprise employees in the parks | Commuting, dining, sports, family-friendliness | Mainline Merge Points, five-minute life circles |
| Resident households (incl. elderly) | Parks, healthcare, education, safety | Heritage park, community service nodes |
| University students and youth | Learning, socializing, nightlife, internships | Switchback Plaza, youth-friendly interfaces |
| Global developer visitors | Pilgrimage, open-source events, international exchange | Commit 0 Plaza, gallery, open-source festival |

### AI Scenario Cards (14; * marks testing and validation scenarios)

| # | Scenario | Spatial Anchor | Data and Human Review Boundary |
| --- | --- | --- | --- |
| 1 | Agent contribution log wall (honor display) | Along the mainline | Public contribution metadata; human curation [source:AGENT-TASKBOOK] |
| 2 | Code Review corridor (developer promenade) | North segment of the mainline | Open review of design decisions; planning/public-participation review |
| 3 | Release gallery (open-source achievements) | South edge of the Machine Depot | Public information on open-source projects; copyright clearance |
| 4 | Suzhou-numeral AI guided tour | Sheltered running track | Public historical materials plus human-curated text [source:PARK-PHASE1-NORTH-2025] |
| 5 | Commit 0 Plaza (pilgrimage landmark) | Jing-Zhang Loop 1909 | Memorial public space; no personal-privacy data |
| 6 | *Xiaoyue River Test Track: embodied-intelligence/robot delivery | Xiaoyue River Wing | Low-speed pilot boundary and avoidance rules; transport/safety/public-participation review [source:AGENT-TASKBOOK] |
| 7 | Dazhongsi four-quadrant smart business | Marshalling Yard | Public commercial data; consumer-privacy protection |
| 8 | AI health-service navigation station | Marshalling Yard and community nodes | Public-service navigation only, no medical advice; medical/legal review |
| 9 | The Switchback · AI talent station | Wudaokou | Public-service information; privacy protection |
| 10 | *AI commuter shuttle line (low-speed feeder along the park) | Mainline | Public road/rail materials; transport review [source:LINE13-UPGRADE] |
| 11 | *Urban Agent governance console | Transfer Hub + whole belt | Public data plus Human Review checklist; governance-mechanism design [source:CASE-E-ESTONIA] |
| 12 | Enterprise-service Copilot center | Transfer Hub | Public policy-service catalog; policy/legal review |
| 13 | AI sensing promenade (perceptible to outsiders) | South segment of the mainline | Public data visualization; no surveillance collection |
| 14 | Jing-Zhang Open Source Festival main venue | Commit 0 Plaza | Public event information; event-safety and order review |

The scenario-space-operation mapping, privacy boundaries, and Human Review mechanisms are documented in `metrics.json`, `compliance_matrix.json`, and the A3 documents [depth:three_key_area_detailed_design].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

![Land-use structure and functional layout](assets/figures/land-use-structure.png)

Land use, buildings, and the retain-renovate-demolish strategy are all **conceptual recommendations**, subject ultimately to the official regulatory detailed planning conditions [depth:development_intensity_controls]. The land-use structure unfolds around "One Spine, Three Stations, Two Wings": park and green space (1401) runs continuously along the spine as the green aorta; research and commercial land concentrates around the three stations; residential and community-service land runs along both sides of the corridor; **reserved white-space land (16) is set aside around the three stations as flexible version reservations** [data:geometry/land_use.geojson#LU-001] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. Building massing is conceptual and indicative: mixed heights of 24-60 m in the three station core areas and 12-36 m along the mainline, and **buildings uniformly stay clear of the heritage-park spine** (the Open Source Mainline must not be encroached upon). The retain-renovate-demolish strategy follows the principle of "low-disturbance organic renewal": retain railway heritage and protected cultural elements (such as the former Qinghuayuan Station site [source:QINGHUAYUAN-STATION]), retain university and research functions, renovate low-efficiency commercial and industrial carriers, and newly build flexible industrial space in the reserved white-space parcels. Existing building footprints, land ownership, and the FAR and height conditions of the regulatory detailed planning are listed as **items pending confirmation** until official data is released (`assumptions.json` A-CONTROLS-001) [depth:height_massing_character].

## Transport, Rail, Municipal Infrastructure, and Public Services

- **Rail**: the backbone comprises Line 13 (including the capacity-expansion project splitting it into 13A/13B [source:LINE13-UPGRADE]), Line 12, the southern extension of the Changping Line, Line 10, Line 4, Line 15, and the Jing-Zhang high-speed railway [source:CHANGPING-SOUTH]. Key moves are the **four-quadrant pedestrian connectivity at Dazhongsi Station** (closing the out-of-station transfer gap between Lines 12 and 13 [source:LINE12-DAZHONGSI]) and transit-station integration at Wudaokou, the west entrance of Qinghua East Road, and other rail stations [source:OFFICIAL-ANNOUNCEMENT].
- **Walking and cycling**: building on the heritage park's "three paths and one green" (walking, jogging, and cycling plus green space, continuous along the whole line and connectable to the Huilongguan bicycle expressway) [source:PARK-PHASE2-PLAN], the 46 Merge Points stitch together east-west breaks into a "mainline plus branch lines" walking-and-cycling network.
- **Municipal works and new infrastructure** (conceptual): distributed energy, edge computing power, and public charging (robots/feeder shuttles) are distributed along the mainline, combined with the flexible power/computing reservations in the "reserved white-space land"; AI service facilities (computing-power scheduling, data-circulation sandboxes) are embedded in the three stations.
- **Public services**: the five-minute life-circle fills in healthcare, education, cultural, and sports facilities; combined with AI health navigation (Scenario Card 8) and the enterprise-service Copilot (Scenario Card 12), service accessibility improves [source:AGENT-TASKBOOK].

![Core metrics recalculation and evidence chain](assets/figures/metrics-evidence.png)

## Blue-Green Network, Public Space, and Urban Character

**Blue-green system**: with the 9-km green corridor of the heritage park as the spine, connecting north to the Qinghe River (20.66 km of waterfront walking-and-cycling [source:QINGHE-XIAOYUEHE-BLUE]) and east to the Xiaoyue River (12.8 km of waterfront footpaths), it forms a "one spine, two rivers" blue-green network; the 12 garden nodes, as "Release gardens," give every segment of the spine a recognizable version narrative [source:PARK-PHASE1-NORTH-2025].

**Public space**: the mainline itself is the largest public space (boundary-less, open around the clock), with the Switchback Plaza (Wudaokou), Commit 0 Plaza (north end), the marshalling-yard plaza cluster (Dazhongsi), and the Test Track waterfront interface (Xiaoyue River) distributed along it, forming a "one spine, many plazas" public-space system [data:geometry/public_space.geojson#PUBLIC-001].

**Pilgrimage landmarks (3 or more, conceptual recommendations)** [source:AGENT-TASKBOOK]:
1. **Commit 0 Plaza**: an upgrade of Jing-Zhang Loop 1909 and the Zhan Tianyou Memorial Garden, "the first commit of this line" (1909), the starting point of the pilgrimage.
2. **Agent contribution log wall**: an append-only honor wall along the mainline, where each plaque equals one commit entry (author/hash/time/contribution note), continuously appended with the annual open-source festival, directly materializing the organizer's mechanism of "a memorial system that updates sustainably, recording the most outstanding contributions of each year."
3. **Open-source achievement gallery**: warehouses along the line made physical, with 12 gardens = 12 release nodes, displaying open-source projects and agent co-creation achievements.

**Urban character**: the "人-character, double track, Suzhou numerals" cultural symbol system (signage, paving, installations) carries forward the rail red / steel gray / high-speed-rail white / yuzu gold color system; architectural character contrasts the precision and order of the "Machine Depot" with the vitality of "The Switchback," emphasizing legibility and verifiability over internet-faddish styling [depth:blue_green_public_space].

## Renewal Projects, Implementation Policy, and Phasing

### Renewal Project List (conceptual recommendations [depth:renewal_project_list])

| Project | Location | Type | Dependencies |
| --- | --- | --- | --- |
| Commit 0 Plaza (upgrade of Jing-Zhang Loop 1909) | South edge of Zhongzhiyuan | Public space | Completed park carrier [source:PARK-PHASE2-2026] |
| Agent contribution log wall, Phase 1 | Middle of the mainline | Public culture | Organizer's operating mechanism |
| Dazhongsi Station four-quadrant connectivity | Marshalling Yard | Transport/public space | Coordination with rail-station renovation [source:LINE12-DAZHONGSI] |
| Switchback Plaza · AI talent station | Origin Community | Public space/services | Renewal around Wudaokou |
| Xiaoyue River Test Track, Phase 1 | Xiaoyue River Wing | Scenario testing | Safety regulation and public participation [source:QINGHE-XIAOYUEHE-BLUE] |
| Campus-adjacent commercialization street | Origin Community | Neighborhood renewal | Coordination with universities and property rights |
| West Suburb Cold Storage Plant AI sci-tech campus | Overall Design Area | Low-efficiency carrier renewal | Ownership and regulatory planning conditions [source:HAIDIAN-MIDTERM-2026] |
| Xuebei Garden R&D cluster expansion | Machine Depot | New construction/renewal | Existing campus [source:XUEBEIYUAN-2026] |

### Phased Implementation [depth:phasing_implementation]

- **Near term (1-3 years)**: Dazhongsi four-quadrant connectivity, Switchback Plaza, Commit 0 Plaza and the log wall Phase 1, Test Track Phase 1, and the Suzhou-numeral AI guided-tour pilot.
- **Medium term (3-5 years)**: Machine Depot underground integration, the achievement gallery, converting the 12 gardens into Release nodes, and the West Suburb Cold Storage Plant sci-tech campus.
- **Long term (5-10 years)**: the belt-wide Urban Agent governance console, the routinization of the Jing-Zhang Open Source Festival, and full connection of the "coding culture belt."

### Global AI Innovation Event System and Long-Term Operation (agent.6, conceptual recommendations)

- **Annual event system**: the "Jing-Zhang Open Source Festival" anchors to the Zhongguancun Forum's AI Open Source Frontier Forum [source:HAIDIAN-AI-INDUSTRY-2026]; developers submit on site and contributions are "written" to the log wall in real time; supporting programs include the Commit on the Rail series (a dual track of code commits plus urban contributions) and an AI scenario open week.
- **Developer community operations**: the "agent contribution log wall" serves as the link establishing a contributor identity and honor system, supporting cross-organization collaboration and traceable achievements.
- **Scenario access operations**: the low-speed pilot scenarios at the Test Track and Marshalling Yard open under an "applicable, reversible, Human Review" mechanism, avoiding the presentation of testing scenarios as approved operations [source:AGENT-TASKBOOK].
- **International communication and recruitment conversion**: through the GitHub open-source pipeline and the open-source festival, developers worldwide are invited on "pilgrimage," turning brand assets into long-term cooperation channels [source:HAIDIAN-MIDTERM-2026].

## Metrics, Area Recalculation, and Compliance Matrix

Core metrics and recalculation relationships (the complete list is in `metrics.json`):

| Metric | This Proposal's Value/Status | Meaning | Basis |
| --- | --- | --- | --- |
| site_area_sqm | Recalculated from geometry (approx. 1,140 ha) | Overall Design Area footprint | [data:geometry/site_boundary.geojson#SITE-001] |
| green_ratio | Recalculated from green_space/site | Green ratio supporting talent living and public health | [metric:green_ratio] |
| public_space_ratio | Recalculated from public_space/site | Public space supporting innovation and interaction | [metric:public_space_ratio] |
| key_area_count | 3 | The three key areas | [data:geometry/key_areas.geojson#PROV-KEY-001] |
| Official area baseline | 43.6/11.4/368.4 ha, etc. | Fixed by the announcement; not modifiable | [source:OFFICIAL-ANNOUNCEMENT] |
| Official FAR/height/density/green-ratio values | unknown, pending official RDP | Items awaiting supplementary data | [depth:development_intensity_controls] |

Areas are recalculated under the EPSG:4548 projection [metric:site_area_sqm]; the accuracy deviations arising from the provisional boundary will be fully recomputed package-wide after the official planning boundary is released [depth:metrics_recalculation]. `compliance_matrix.json` covers all of tasks 1.3, 1.4, and 1.5 of the announcement plus agent.1 to agent.6; `standard_matrix.json` covers 6 professional standards; all 15 depth items in `design_depth_matrix.json` are complete. Metrics are not just a pile of numbers: the green ratio answers "why talent stays," the public-space ratio answers "why innovation meets," and the white-space ratio answers "how the city adapts to uncertainty."

## Risk, Copyright, and Compliance

- **Source compliance**: this proposal uses only public or rights-cleared material; no non-public planning maps, internal data, or personal privacy information is used; the temporary boundary is disclosed throughout as provisional and never poses as the official planning boundary [source:SOURCE-REGISTRY].
- **Scope of the concept**: all spatial implementation, event operations, brand communication, and policy mechanisms are "conceptual recommendations," "reference proposals," and "material for professional teams to deepen"; they do not constitute conclusions of regulatory detailed planning, approval, engineering, investment, or government commitment [source:AGENT-TASKBOOK].
- **Copyright**: all images, drawings, typefaces, logo directions, and the mascot are either originally generated for this proposal or come from rights-cleared public sources; details are in `report/copyright_statement.md`. The use of cultural symbols such as Suzhou numerals, Zhan Tianyou, and the Jing-Zhang Railway is limited to the narration of public historical facts, and no unauthorized likenesses are used.
- **Responsibility for AI generation**: this proposal is jointly produced by the agent "Yuzu-chan" and the human contributor "Yuzu-flavored Cold Noodles"; the generation methods, models, and iteration process are recorded in `agent.json` and `changelog.md`, and the facts, citations, and final expression are the responsibility of the signed author [depth:risk_missing_data].

## References

1. Haidian Branch, Beijing Municipal Commission of Planning and Natural Resources. Prequalification Announcement for the International Urban Design Solicitation for the Centennial Jing-Zhang AI Innovation Belt, May 2026.
2. Excerpted agent-facing open-call taskbook (agent_taskbook.json), May 18, 2026.
3. The Beijing News. "Phase 2 of the Jing-Zhang Railway Heritage Park Completed, Creating a 9-km Composite Urban Heritage Green Corridor," August 6, 2026.
4. Haidian Civilization Network / Haidian News. "The Jing-Zhang Railway Heritage Park Unveils New Content: One Track, Twelve Gardens," June 20, 2025.
5. China State Railway Group. "Suzhou Numerals and the Jing-Zhang Railway" series, December 2018.
6. Great Wall Network. "Qinglongqiao Station Master Yang Cunxin on the '人'-Character Railway," May 29, 2019.
7. Beijing Daily. "Qinghuayuan Station: Station Name Inscribed by Zhan Tianyou," March 28, 2023.
8. Zhongguancun Science Park Administrative Committee. "Three Zones and Two Wings Building a World-Class AI Cluster," April 3, 2026; "Mid-Term Report on the Centennial Jing-Zhang AI Innovation Belt," July 28, 2026.
9. Beijing Municipal Commission of Transport. "Metro Line 13 Capacity-Expansion and Upgrade Project," February 2023; The Beijing News. "Line 12 Opens; Out-of-Station Transfer at Dazhongsi Station," December 2024.
10. Official portal of the Beijing Municipal People's Government. "Phase 2 of the Jing-Zhang Railway Heritage Park to Start Construction Within the Year" (46 entrances / 9 branch roads / Qinghe and Xiaoyue River waterfronts), September 2024.
11. Wikipedia: Station F; King's Cross Central; CLC Singapore: one-north; Annals of Regional Science: the 1-km university knowledge-spillover rule; Vector Institute; Fortune: Hsinchu Science Park; e-Estonia.

*The authoritative machine-readable index is in `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, and `design_depth_matrix.json` [source:SOURCE-REGISTRY] [source:SITE-PACKAGE].*
