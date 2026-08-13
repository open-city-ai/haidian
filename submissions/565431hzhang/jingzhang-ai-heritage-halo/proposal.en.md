---
title: "京张智脉·光晕 / Jing-Zhang AI Heritage Halo"
author_github: "565431hzhang"
proposal_format_version: "2"
bilingual_contract_version: "1"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Using the Jing-Zhang Railway's 'twin-track parallel' tradition as method: every AI city service must have a parallel non-AI track—human handoff, paper-completable, resident-exitable, no degradation when AI is off. City intelligence is measured by 'whether the city still works after the AI layer is removed.'"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张智脉·光晕 / Jing-Zhang AI Heritage Halo

## One-Page Executive Summary and Delivery Index

| Review Question | This Proposal's Answer | Verifiable Deliverable |
| --- | --- | --- |
| Core thesis | Twin-Track Reversible: the AI layer is a track that can be added to and removed from the city; every AI service must have a parallel non-AI path | "Design Concept" section below + `visual/index.html` |
| Spatial structure | One belt, three cores, two wings: Jing-Zhang Heritage Park links Zhongzhi Park, AI Origin Community, and Dazhongsi; Zhongguancun service wing and Xiaoyuehe scenario wing flank east-west | "Three-Level Scope Framework" + `geometry/key_areas.geojson` |
| How AI lands | 10 scenario cards, each with failure modes, human escalation paths, and exit conditions | "AI Innovation Ecosystem" section + `compliance_matrix.json` |
| Where implementation starts | 6 projects in near-term (1-3 years), light-weight pilots first | "Renewal Project List" + `geometry/phasing.geojson` |
| Evidence status | Provisional boundaries labeled, self-check passed, performance claims uniformly "unauthorized · not field-operational" | `self_check.json` + `assumptions.json` |

## Design Concept: Twin-Track Reversible

The Jing-Zhang Railway's original significance was two tracks running in parallel—one outbound, one return. This proposal translates that engineering tradition into an AI urban design rule [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]:

**Every AI city service must have a parallel non-AI track.**

"Parallel" means four checkable conditions; missing any one keeps the service `blocked`:

1. **Equivalent Path** — the same task can be completed without AI (paper, phone, human counter)
2. **Human Handoff** — when AI fails, there is a visible, reachable, accountable human interface
3. **Exit Right** — residents can choose not to use AI service without service degradation
4. **Retirement Record** — when AI service is retired, a public record explains why and what replaces it

**One-line test**: After removing all AI devices and smart services, can a person without a smartphone arrive, get help, complete a task, and leave safely? If not, that AI service should not go live. [standard:MOHURD-URBAN-DESIGN-MEASURES] (Assumption A-DUAL-TRACK-001)

"智脉" (AI Pulse) is the railway's new identity after being energized by AI—not one AI track replacing one heritage track, but two tracks running in parallel. "光晕" (Heritage Halo) is the design concept of three key areas radiating innovation energy into surrounding neighborhoods—halos are not new red lines, not development-volume commitments, only design-level influence-range annotations.

## Design Basis and Source Inventory

This formal proposal takes the "International Competition Prequalification Announcement for the Centennial Jing-Zhang AI Innovation Belt Urban Design" as its primary basis [source:OFFICIAL-ANNOUNCEMENT], and uses the provisional rough boundaries, key areas, enums, metrics, and source registry registered by maintainers in `brief/site-package/` as machine-readable basis [source:SITE-PACKAGE]. All design judgments are decomposed into traceable sources, recalculable metrics, verifiable layers, and human-reviewable assumptions.

Complete source and standard coverage is saved in `sources.json`, `standard_matrix.json`, and `design_depth_matrix.json`. Source-use boundaries follow [source:SOURCE-REGISTRY]:

- `data/source_registry.json` registers usage boundaries for public, licensed, and provisional materials; current formal-available sources: 7; background-only: 1; provisional-only: 1
- Background-only or provisional-only materials must not be elevated to official boundary, statutory regulatory plan, formal scoring basis, or government implementation commitment
- This proposal uses `brief/site-package/geometry/provisional_boundaries.geojson` to generate the provisional formal package; all geometry files are labeled `provisional_constraint`, `official_boundary=false`, usable only for generation, self-check, and design discussion—not as official redline or approval basis [depth:risk_missing_data]

As of the public-materials review date, the official precise polygon, CAD, or GIS redline has not been published. The announcement gives three-level scope areas and text descriptions of boundaries, but the prequalification package requires a download password. The repository provides provisional rough boundaries [source:BOUNDARY-SOURCE]. This proposal therefore uses `geometry/site_boundary.geojson#SITE-001` and `geometry/key_areas.geojson#PROV-KEY-001` as provisional boundaries, consistently labeled in text, HTML, sources, assumptions, and self-check: provisional boundaries can only be used for generation, display, and discussion—not as official redline, approval basis, or precise area calculation. Organizer data gaps do not block content scoring; all layers and metrics must be recalculated when official geometry is supplied [depth:metrics_recalculation].

![Source evidence chain and submission package relationship](assets/figures/site-overview.png)

### Implementation Confidence Table

Many parameters in this proposal are conceptual assumptions pending official regulatory plans, existing-building surveys, ownership, and engineering conditions. The table below grades each key parameter by evidence source [source:PROCESSED-MISSING-DATA-CHECKLIST]:

| Parameter | Phase | Evidence Level | Basis / Pending Condition |
|------|------|----------|----------------|
| Site area 11,412,825 m² | Overall | **A Structural Recalculation** | Recalculated from site_boundary+land_use [metric:site_area_sqm]; provisional boundary, recalculate after official redline |
| Green ratio 48.7%, public space ratio 2.5% | Overall | **A Structural Recalculation** | Recalculated from green_space / public_space layers |
| Building coverage 5.7%, roads 42.3km | Overall | **A Structural Recalculation** | Recalculated from buildings / roads layers |
| Three key areas 368.4 ha | Overall | **A Structural Recalculation** | Recalculated from key_areas layer [metric:key_area_count] |
| Building count/height/function ratio | Key area | **B Conceptual** | Pending existing-building survey and regulatory confirmation |
| Retain/renovate/demolish ratio | Key area | **B Conceptual** | Pending condition survey and structural safety assessment |
| Phasing years and funding channels | Implementation | **C Implementation Assumption** | Pending ownership, funding, and approval pathway confirmation |

**Grading rules**: **A** = recalculable from this package's structured GeoJSON/metrics; **B** = conceptual illustration, clearly labeled pending official confirmation; **C** = implementation and operational policy assumptions. No B/C-level parameters are written into formal conclusions [depth:extant_conditions_evidence].

## Overview: One Belt, Three Cores, Multi-Scenario Nodes, Blue-Green Slow-Mobility Composite Ring

### Spatial Framework

This proposal uses "**One Belt, Three Cores, Multi-Scenario Nodes, Blue-Green Slow-Mobility Composite Ring**" as the overall spatial organizing principle, transforming the 11.4 km² urban area along the Jing-Zhang Heritage Park into a perceivable, operable, and growing AI-native urban prototype.

| Spatial Level | Composition | Design Intent | Key Data |
|---------|------|---------|---------|
| **One Belt** | Jing-Zhang Heritage Park vitality belt (~9km) | Continuous carrier of historical memory + slow mobility + public space + AI experience | Area 11,412,825 m², slow-mobility connectivity target ≥90% |
| **Three Cores** | Zhongzhi Park AI Acceleration Zone (192.9ha), AI Origin Community (104.3ha), Dazhongsi AI Cluster (72.1ha) | Three innovation anchors, each radiating "halo" effect | Total key area 368.4 ha, covering all three key areas in the announcement |
| **Multi-Scenario Nodes** | 10 AI scenario cards + 3 industry test scenarios + 5 user profiles | Placing AI capabilities into operable, experienceable, measurable urban space nodes | See "Scenario Cards" table |
| **Composite Ring** | Slow-mobility + blue-green + activity route triple network | Connectivity, green ratio, public space ratio, activity route coverage | Green ratio 48.7%, slow-mobility roads ~42.3km, overlap ≥60% |

### Three-Zone/Two-Wing Synergy Loop

The three key areas are not isolated nodes but form a functional complement and resource-flow network through the "three zones, two wings" framework:

**Synergy mechanisms**:
- **Zhongzhi Park → Origin Community**: Technology output (full-stack self-innovation) → talent feedback (open source + tech transfer), forming a "technology-talent" positive loop
- **Origin Community → Dazhongsi**: Incubation results (startups + open source) → industry landing (anchor companies + international roadshow), forming an "innovation-industry" conversion chain
- **Dazhongsi → Zhongzhi Park**: Market feedback (data elements + scenario demand) → technology iteration (safety governance + standards), forming a "market-technology" loop
- **Zhongguancun Service Wing**: Provides talent supply, capital allocation, policy innovation, and international services
- **Xiaoyuehe Scenario Wing**: Carries AI scenario experience, public space, and activity routes

### Five-Function Closed Loop

| Five Functions | Spatial Anchor | Industry Mechanism | Governance Body | Implementation Project |
|---------|---------|---------|---------|---------|
| ① AI Full-Stack Self-Innovation | Zhongzhi Park + West Wing | Large model training, safety sandbox, standards | Standards governance consortium | Qinghe innovation interface |
| ② World-Class AI Innovation Ecosystem | Origin Community + East Wing | Open source, incubation, talent zone | Community co-building committee | Tech transfer street, open source hall |
| ③ AI+ Scenario Empowerment | Xiaoyuehe Scenario Wing + Belt | 10 scenario cards, 3 test scenarios | Public space operator | Dazhongsi pedestrian link |
| ④ Smart AI Vitality City | Composite ring system | Slow-mobility AI navigation, public space management | Public space operator + municipal | Heritage Park AI slow-mobility |
| ⑤ AI Governance Global Discourse | Zhongzhi Park + Dazhongsi | Safety sandbox, data elements, international activities | Standards consortium + intl. committee | Roadshow lounge, data parlor |

## Three-Level Scope Framework

The proposal organizes work across three levels as determined by the announcement [source:OFFICIAL-ANNOUNCEMENT]: coordinated research scope (43.6 km²) for AI industry ecosystem and strategic positioning; overall design scope (11.4 km²) for urban renewal framework, industrial spatial layout, and transport/municipal support; key area scope (368.4 ha) for detailed design of three districts. All three levels are mapped in `compliance_matrix.json`, ensuring every mandatory requirement of announcement 1.3, 1.4, 1.5 and agent.1-agent.6 has chapter, layer, metric, drawing, and HTML evidence [depth:three_level_scope_framework].

The three levels are not isolated drawing sets. Coordinated research determines industry-chain and urban-form judgments; overall design translates these into renewal projects and spatial structure; key-area detailed design validates implementability of specific parcels and AI scenarios. Any area, ratio, or project quantity that cannot be recalculated from structured data must not be written into formal conclusions [depth:overall_spatial_structure].

![Three-level scope and spatial working framework](assets/figures/land-use-structure.png)

| Level | Design Question | Proposal Answer | Data Landing |
| --- | --- | --- | --- |
| Coordinated Research | How to organize AI industry ecosystem and future urban form | "University sourcing—open source collaboration—enterprise conversion—public experience—international communication" innovation chain | compliance_matrix.json |
| Overall Design | How industry, renewal, transport, municipal land on maps | Land use, buildings, roads, green space, public space, phasing layers | [data:geometry/land_use.geojson#LU-001] |
| Key Area | How three districts reach detailed-design depth | Positioning, spatial actions, AI scenarios, implementation dependencies | [data:geometry/key_areas.geojson#PROV-KEY-001] |

## Coordinated Research Scope: Industry and Future-City Study

The brand name "Jing-Zhang AI Pulse" is both a public judgment and a working method. The logo fuses the "∞" (infinity) symbol with railway track morphology—twin rails representing the parallel evolution of history and future, with three colored halo nodes corresponding to Zhongzhi Park (orange · innovation acceleration), AI Origin Community (blue · talent ecosystem), and Dazhongsi (green · industry cluster).

The industry ecosystem is organized around "problem, verification, adoption, maintenance." Universities and research institutions propose methods; enterprises complete productization; Zhongzhi Park provides isolated testing; the scenario wing provides real tasks; the technology service wing handles IP, legal, and capital; public operations decide adoption. After adoption, each service retains named maintainers, human bypass, and public retirement records.

## Overall Design Scope: Urban Renewal at Regulatory-Detailed-Plan Urban Design Depth

The overall design scope forms a north-south continuous structure with complete functional land-use coverage. Six functional categories—industrial R&D, public services, living support, culture and education, green space, and transport—form the spatial organization. Along the Heritage Park, a slow-mobility and public-service main chain runs north-south; laterally, six task connections stitch together parks, campuses, communities, and rail-candidate entrances.

## Key-Area Detailed Design

### Zhongzhi Park AI Acceleration Zone (192.9 ha)

Positioning: Full-stack AI self-innovation base. Functions: large model training/evaluation, AI safety governance, chip-framework-algorithm collaboration, standards development. Spatial actions: Qinghe innovation interface, safety governance sandbox, shared test field, edge compute service points. Dependencies: river blue line, ecological and flood-control conditions, energy and compute infrastructure.

### AI Origin Community (104.3 ha)

Positioning: Talent ecosystem and open-source collaboration. Functions: open-source publishing, tech transfer, incubation acceleration, international community. Spatial actions: open-source publishing hall, campus-adjacent tech transfer street, public code wall, nighttime collaboration space. Dependencies: campus boundary, ownership, first-floor business format.

### Dazhongsi AI Industry Cluster (72.1 ha)

Positioning: Intelligent native new business. Functions: intelligent agent/terminal display, data element circulation, international roadshow, content consumption. Spatial actions: international roadshow lounge, data element parlor, station four-quadrant pedestrian connection. Dependencies: rail station, road intersection, municipal pipelines.

![Key areas detailed design](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Talent Profiles, and AI+ Scenarios

AI scenarios must land on spatial and governance boundaries: public space scenarios reference [data:geometry/public_space.geojson#PUBLIC-001], slow-mobility scenarios reference [data:geometry/roads.geojson#ROAD-001], open space scenarios reference [data:geometry/green_space.geojson#GREEN-001].

| User Profile | Typical Needs | Spatial Response | Self-Check Boundary |
| --- | --- | --- | --- |
| Open-source developer | Publishing, collaboration, testing, reputation | Origin Community open-source hall, code wall, night collab space | No personal behavioral tracking; aggregate statistics only |
| Startup team | Low-cost office, compute access, product testing | Zhongzhi Park shared test field, edge compute, standards consultation | Compute and data services require separate authorization |
| Anchor company visitor | Showcase, business, international reception, recruiting | Dazhongsi roadshow lounge, station access, company-adjacent public space | Company logos and cases must be cleared |
| Surrounding resident | Commuting, leisure, community services, low-disturbance renewal | Heritage Park slow-mobility ring, community service embedding | No resident profiling for commercial recommendation |
| University faculty/student | Tech transfer, cross-campus collaboration, daily slow-mobility | Campus-park slow-mobility stitching, tech transfer station, AI education points | Campus data and research results require authorization |

| Scenario Card | Spatial Carrier | Service Object | AI Capability | Failure Mode | Human Escalation | Data Source | Operator |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01 Open-Source Hall | AI Origin Community | Faculty, developers | Contribution heatmap, collaboration graph, PR classification | Classification error, graph omission | Admin review, community arbitration | GitHub public API + authorized | Community co-building committee |
| 02 Safety Sandbox | Zhongzhi Park | Enterprises, standards bodies | Model behavior analysis, adversarial testing, compliance | Adversarial bypass, false positive/negative | Independent safety audit + multi-party review | Test model public output | Standards governance consortium |
| 03 Edge Compute | Overall scope nodes | Startups, residents | Load prediction, energy scheduling, anomaly detection | Load deviation, node offline | Manual dispatch + inspection | Anonymous aggregate stats | Municipal + operator |
| 04 AI Walkability | Heritage Park belt | All pedestrians | Path recommendation, crowding prediction, accessibility routing | Sensor blind spots, prediction inaccuracy | Manual survey + accessibility walkthrough | Anonymous sensors (no personal tracking) | Public space operator |
| 05 Roadshow Lounge | Dazhongsi cluster | Company visitors, investors | Attendee matching, schedule recommendation, heat analysis | Recommendation bias, schedule conflict | Manual coordination + event planning | Self-reported + public info | Market-based platform |
| 06 Qinghe Low-Carbon | Zhongzhi Park waterfront | Residents, employees | Environmental prediction, usage pattern, carbon estimate | Sensor drift, model deviation | Manual inspection + calibration | Environmental sensors | Zhongzhi Park operator |
| 07 Tech Transfer Street | AI Origin Community | Faculty, entrepreneurs | Tech matching, patent graph, investment matching | Matching inaccuracy, patent graph gaps | Expert review + IP audit | Authorized disclosure + public | University partnership |
| 08 Data Parlor | Dazhongsi area | Enterprises, data providers | Data quality assessment, compliance check, transaction matching | Quality deviation, compliance omission | Independent data audit + manual review | Compliant data only + auditable log | Third-party data governance |
| 09 Life Service Street | Community/commercial junction | Residents, service staff | Demand prediction, resource matching, anomaly detection | Prediction deviation, allocation unfairness | Community team manual approval + follow-up | User-authorized + public service | Community + commercial joint |
| 10 Global AI Week | Belt public space | Global participants, locals | Flow prediction, multilingual guide, activity recommendation | Translation inaccuracy, flow prediction deviation | Safety review + cultural content audit | Venue public info + self-reported | Event committee |

### Agent Collaboration and Twin-Track Verification

The 10 scenario cards operate through a **three-layer collaboration**: L1 Spatial Perception (edge agents, anonymous aggregate environmental data) → L2 Scenario Service (10 scenario agents, each independently driven) → L3 City Coordination (scheduling, human-confirmed execution). All agent outputs maintain "advisory" status; on failure, service degrades to manual operation [source:AGENT-TASKBOOK].

Each scenario card must pass **Twin-Track Verification** (this proposal's core thesis) before going live: four conditions (equivalent path, human handoff, exit right, retirement record)—missing any one keeps it `blocked`. All 10 cards have labeled failure modes and human escalation paths, but structural completeness ≠ field pass—performance claims without field evidence are uniformly left blank.

**Data principle**: All agents process only the minimum dataset. No personal trajectory tracking, no personal profiling. Residents may opt out of any agent's data collection without service degradation.

**Technical base**: Digital Twin City OS provides a perception→data→model→application four-layer architecture, using open APIs and open-source components, progressive deployment, human-always-online. Specific technology selection pending detailed design phase [source:AGENT-TASKBOOK].

### Agent Task Responses

**Agent.1 — Naming and Brand**: "Jing-Zhang AI Pulse · Heritage Halo", with "Twin-Track ∞" as core symbol (`assets/logo.svg`), three-color halos for three cores.

**Agent.2 — AI Full-Stack Innovation and Ecosystem Cases**: 8 global cases (Toronto Quayside, Singapore Punggol, Paris Station F, London Here East, Helsinki Kalasatama, Shenzhen, Seoul DMC, Israel corridor) inform "institution—space—industry—governance" mechanisms. 8 local facilities: ① large model training platform ② safety governance workshop ③ open-source collaboration space ④ incubation accelerator ⑤ intelligent agent display center ⑥ data element platform ⑦ AI education base ⑧ international roadshow center. See `sources.json`.

**Agent.3 — AI+ Scenarios**: 10 scenario cards in table above; 3 industry test scenarios: ① Zhongzhi Park safety sandbox ② Origin Community open-source collaboration platform ③ Dazhongsi agent interoperability test field.

**Agent.4 — Public Space and Landmarks**: 3 landmarks (Qinghuayuan Station · AI Origin Monument, Zhongzhi Park · Innovation Beacon, Dazhongsi · Digital Bell Tower). 12 public space components (smart guide booth, code display column, data speed-read screen, slow-mobility charging post, community notice board, waterfront rest node, accessibility guide strip, AI Q&A booth, mileage marker, flexible event space, community planter, temporary exhibition frame), each with non-digital alternative. 5-dimension honor display system (data contribution / open source / governance / AI art / community), digital screens must provide paper alternatives.

**Agent.5 — Cultural Narrative**: Three cultural layers (railway heritage → Zhongguancun spirit → AI new culture). English tagline "From Iron Rails to Intelligent Trails", Chinese "京张智脉，光晕未来".

**Agent.6 — Activities and Operations**: Annual Jing-Zhang AI Innovation Week (spring) + Global AI Open Day (fall), monthly developer gatherings + quarterly scenario roadshows, "AI Pilgrimage Route" connecting three landmarks.

> All Agent task content is conceptual suggestion, not confirmed government activities or implementation arrangements.

## Three-Zone/Two-Wing Synergy and Regional Collaboration Framework

### Five-Function Closed Loop

| Five Functions | Spatial Anchor | Industry Mechanism | Governance Body | Implementation Project |
| --- | --- | --- | --- | --- |
| ① AI Full-Stack Self-Innovation | Zhongzhi Park + West Wing | Large model training, safety sandbox, standards | Standards governance consortium | Qinghe innovation interface, safety sandbox |
| ② World-Class AI Ecosystem | Origin Community + East Wing | Open source, incubation, talent, international community | Community co-building committee | Tech transfer street, open source hall |
| ③ AI+ Scenario Empowerment | Xiaoyuehe Wing + Belt | 10 scenario cards, 3 test scenarios | Public space operator | Dazhongsi pedestrian, edge compute |
| ④ Smart AI Vitality City | Composite ring | Slow-mobility AI nav, public space management | Public space operator + municipal | Heritage Park AI slow-mobility |
| ⑤ AI Governance Discourse | Zhongzhi Park + Dazhongsi | Safety sandbox, data elements, intl. activities | Standards consortium + intl. committee | Roadshow lounge, data parlor |

Regional collaboration transmits only desensitized task patterns, test protocols, and versioned service standards—not personal records or enterprise-restricted materials.

## Land Use, Building Scale, and Retain/Renovate/Demolish Scheme

Land use is organized by six functional categories: industrial R&D, public services, living support, culture and education, green space, and transport. Building scale follows the retain/renovate/demolish principle of "micro-update + node activation," avoiding large-scale demolition. All building-level parameters (height, density, function ratio) are B-level conceptual estimates pending official regulatory confirmation [depth:land_use_layout] [depth:retain_renovate_demolish].

## Transport, Rail, Municipal Services, and Public Facilities

The transport framework prioritizes slow-mobility connectivity (target ≥90%), rail station integration, and a blue-green composite ring. Road concept proposals are pending official road redline confirmation. AI slow-mobility navigation uses low-intrusion sensors and explainable wayfinding, with anonymous aggregate data only [depth:traffic_rail_slow_parking].

## Blue-Green Space, Public Space, and Urban Character

Green ratio 48.7%, public space ratio 2.5%, slow-mobility roads ~42.3km. The blue-green composite ring overlaps slow-mobility, ecological corridors, and activity routes at ≥60%. All figures are recalculable from structured GeoJSON [depth:blue_green_public_space] [metric:green_ratio] [data:geometry/green_space.geojson#GREEN-001].

![Mobility and blue-green system](assets/figures/mobility-bluegreen.png)

## Renewal Project List, Implementation Policies, and Phasing Plan

| Project ID | Name | Type | Main Dependency | Phase | Investment Level | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| JZ-01 | Heritage Park slow-mobility gap stitching | Public space/transport | Road redline, bridge space | Near-term (1-3y) | Small-medium | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Zhongzhi Park Qinghe innovation interface | Blue-green/industry | River blue line, flood control | Near-term (1-3y) | Small-medium | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | Origin Community tech transfer street | Urban renewal/industry | Campus boundary, ownership | Mid-term (3-7y) | Medium-large | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | Dazhongsi station pedestrian connection | Rail integration/slow-mobility | Rail station, intersection | Mid-term (3-7y) | Medium-large | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI public service + edge compute nodes | New infrastructure/public service | Energy, compute, safety, operator | Near-term pilot (1-3y) | Medium-large | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | Global AI Week public route | Operations/brand | Public space permit, safety, copyright | Near-term start (1y) | Small | [data:geometry/phasing.geojson#PHASE-001] |

> Investment estimates are concept-level (±50% precision). Formal estimates require professional cost consultancy. All projects can start with light-weight facilities, operational activities, or service platforms.

### Operations Governance and Implementation Policy

Four-layer operations governance: L1 Strategic (joint governance committee) → L2 District operations (market-based operator) → L3 Public governance (community + data governance committee) → L4 Technical compliance (independent safety audit). Operators are selected through public competition [depth:phasing_implementation].

**Phased implementation** (conceptual, pending ownership, funding, approval confirmation):
- **Near-term (1-3y) — Light-weight launch**: JZ-01, JZ-06, JZ-05 pilot. Operations activities and temporary facilities, controlled capital
- **Mid-term (3-7y) — Three zones take shape**: JZ-02, JZ-03, JZ-04. Urban renewal and public space
- **Long-term (7-15y) — Ecosystem and discourse**: Regional collaboration network, global AI landmark

Each phase has Go/No-Go checkpoints. All projects have light-weight pilot plans.

**Economic feasibility**: 6 projects total 10.4-21.6 billion RMB (±50%). Funding: fiscal guidance (20-30%), policy loans (15-25%), industry fund (15-25%), enterprise self-investment (20-30%), operations revenue (5-10%).

**Implementation risks**: 10 systematic risks (policy/ownership/funding/industry/technology/community/engineering/operations/compliance/climate) registered. Full risk register in `risk.json`.

## Metrics, Area Recalculation, and Compliance Matrix

The metric system includes site area, key area area, green and public space ratios, building footprint, renewal project count, AI scenario nodes, slow-mobility connectivity, industry space, talent service, and self-check status. All known metrics must be recalculable from GeoJSON or trusted sources; unknown metrics must state reasons and prerequisites. `scripts/spatial_review.py` and `scripts/visual_review.py` results are important self-check evidence.

Metric recalculation follows [depth:metrics_recalculation]. Full values, formulas, source files, and confidence in `metrics.json`. [metric:site_area_sqm] [data:geometry/green_space.geojson#GREEN-001].

![Metrics evidence and audit chain](assets/figures/metrics-evidence.png)

The compliance matrix is the master file for task responsiveness. Each announcement task and agent_taskbook task must correspond to report sections, layers, metrics, drawings, HTML pages, sources, assumptions, and self-check items. `compliance_matrix.json`.

## Risk, Copyright, and Compliance Statement

**Bilingual requirement.** The proposal main file and all derivative works (A3/A0, HTML, figures with text) must provide complete translations via `proposal.en.md` or `proposal.zh.md`. All images, drawings, icons, data, and code assets must state source, license, and authorization status in `sources.json` or `report/copyright_statement.md`. HTML pages must not load remote scripts, map tiles, fonts, iframes, forms, or external APIs, and must not track reviewer behavior.

**Copyright statement**: All visual assets are original vector graphics and program-generated. No enterprise trademarks, personal portraits, or third-party photos are used. Font licenses: WenQuanYi Micro Hei (open source), DejaVu Sans (open source). The logo is an original design combining the infinity symbol with railway track morphology.

**Assumption management**: All unverified parameters are registered in `assumptions.json` with status labels (pending_official_data, pending_professional_confirmation, concept_level, etc.). No B/C-level parameters are written into formal conclusions.

**Data privacy**: All AI scenarios follow data minimization—no personal trajectory tracking, no personal profiling, no commercial recommendation. All data flows are auditable and traceable. Residents may opt out of any AI service without degradation.

**Self-check**: The submission package has passed all four gates (deterministic validation, spatial review, visual packaging, professional evidence). Self-check results are in `self_check.json`. All boundaries and areas are labeled provisional; performance claims are uniformly "unauthorized · not field-operational."

## References

- [source:OFFICIAL-ANNOUNCEMENT] — Competition prequalification announcement
- [source:SITE-PACKAGE] — Machine-readable brief and boundary data
- [source:BOUNDARY-SOURCE] — Provisional boundary provenance
- [source:SOURCE-REGISTRY] — Source usage boundaries
- [source:AGENT-TASKBOOK] — Agent-oriented taskbook
- [source:PROCESSED-FACT-PACK] — Processed fact pack
- [source:PROCESSED-MISSING-DATA-CHECKLIST] — Missing data checklist
- [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] — Official announcement standards
- [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] — Agent open-call taskbook standards
- [standard:MOHURD-URBAN-DESIGN-MEASURES] — MOHURD urban design measures
- [standard:MOHURD-CONTROL-DETAILED-PLANNING] — MOHURD control detailed planning
- [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] — MNR land use classification
- [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] — MOHURD architectural design depth
