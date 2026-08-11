---
title: "Jing-Zhang CityOS: An Open-Source, Version-Controlled Urban Intelligence Platform for the Centennial AI Innovation Belt"
author_github: "z3230442"
language: "en"
translation_of: "proposal.md"
proposal_format_version: "2"
bilingual_contract_version: "1"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Using 'City Operating System (CityOS)' as the core metaphor, this proposal constructs the Centennial Jing-Zhang AI Innovation Belt as a version-controlled, open-source, contribution-traceable urban intelligence platform. The three key areas and two wings function as six core service modules of CityOS; agent.1 through agent.6 tasks map to six OS subsystems; 12 AI scenario cards serve as pluggable service plugins, forming a complete tech stack from spatial planning to urban governance."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance", "open-source-urbanism", "ai-native-city"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "open-source-release", "city-agent-sandbox"]
iteration: "v1.0"
---

<!-- CityOS v1.0: Jing-Zhang CityOS — An Open-Source Urban Intelligence Platform -->

# Jing-Zhang CityOS: An Open-Source, Version-Controlled Urban Intelligence Platform for the Centennial AI Innovation Belt

## Design Basis and Source Inventory

This proposal is based primarily on the public announcement for the Centennial Jing-Zhang AI Innovation Belt urban design international proposal solicitation [source:OFFICIAL-ANNOUNCEMENT], and on the structured taskbook [source:AGENT-TASKBOOK], site package [source:SITE-PACKAGE], public source registry [source:SOURCE-REGISTRY], and provisional boundary [source:BOUNDARY-SOURCE] in `brief/site-package/`. Core standards include [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], and [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

Source usage boundaries follow `data/source_registry.json` [source:SOURCE-REGISTRY]: formal authoritative conclusions rely only on sources with `usable_for_formal="yes"`; background sources support mechanisms and narratives only; provisional sources support generation and discussion only. No non-public data, personal privacy data, or unauthorized materials were used.

**Key boundary statement:** As of the public data review date, official precise SITE_BOUNDARY and KEY_AREA polygons have not been published. This proposal uses provisional boundaries from `brief/site-package/geometry/provisional_boundaries.geojson` [source:BOUNDARY-SOURCE], marked as `geometry_role=provisional_constraint`, `official_boundary=false`, `boundary_precision=provisional_rough` in `geometry/site_boundary.geojson#SITE-001` and `geometry/key_areas.geojson#PROV-KEY-001`. Provisional boundaries are for generation, self-check, visualization, and design discussion only — not as official redline, approval basis, or precise area basis. Organizer data gaps do not block content scoring [depth:risk_missing_data]. Upon official data release, all layers and metrics must be recalculated.

![Evidence Chain and CityOS Submission Package Diagram](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal organizes work across three levels per the announcement [source:OFFICIAL-ANNOUNCEMENT]: the coordinated research scope (~43.6 km²) addresses AI industry ecosystem, strategic positioning, and future city forms; the overall design scope (~11.4 km²) addresses urban renewal, industrial space, transportation/municipal infrastructure, and character control; the key area scope (~368.4 ha) addresses detailed design of three key districts. All three levels map to announcement sections 1.3, 1.4, 1.5 and agent.1 through agent.6 in `compliance_matrix.json` [depth:three_level_scope_framework].

![Three-Level Scope and CityOS Service Architecture](assets/figures/land-use-structure.png)

| Level | Area | CityOS Layer | Proposal Response | Data Anchor |
| --- | --- | --- | --- | --- |
| Coordinated research | 43.6 km² | Strategy / OS Kernel | Five-segment innovation chain: university sourcing → open-source collaboration → enterprise transfer → public experience → international communication | [depth:overall_spatial_structure] |
| Overall design | 11.4 km² | System / Service Orchestration | Six districts, twelve services: three areas, two wings, plus elastic buffer zones as microservice urban space | [data:geometry/land_use.geojson#LU-001] |
| Key area | 368.4 ha | Application / Scenario Plugins | Detailed design and scenario card deployment for three core services | [data:geometry/key_areas.geojson#PROV-KEY-001] |

Area recalculation evidence: [metric:site_area_sqm], [metric:key_area_count], [metric:zhongzhiyuan_ai_acceleration_area_area_sqm], [metric:beijing_ai_origin_community_area_sqm], [metric:dazhongsi_ai_industry_cluster_area_sqm].

## CityOS Core Concept: City as Operating System

### 2.1 Naming System and Logo

Main name: **"Jing-Zhang CityOS" (京张城市操作系统)**, abbreviation **JZ-OS**, tagline: "**One Century, One Rail, One Open-Source City**" (百年一轨，开源一座城).

Naming logic: The Jing-Zhang Railway is the centennial origin of China's autonomous engineering spirit, while "operating system" is the most fundamental, open, and iterative platform metaphor of the digital age. Combining them means building the belt as a **city infrastructure platform that is installable, upgradable, contribution-traceable, and auditable** — like Linux for servers or Android for phones, JZ-OS for the city.

Logo direction: **"Rail Hexagonal Node"** — outer ring of Jing-Zhang railway dual rails (brown), inner ring of six orthogonal sectors (three areas, two wings, governance kernel), center as open-source symbol (∞). Color system: railway brown-gray (#7A5C3E), electric blue (#2563EB), greenway green (#16A34A). Extended to wayfinding, version badges, contributor walls, and digital interfaces [source:AGENT-TASKBOOK].

### 2.2 CityOS Architecture: Six-Layer Tech Stack

| Layer | Analogy | Jing-Zhang Mapping | Spatial Carrier |
| --- | --- | --- | --- |
| **L6 Application** | App Store / Plugins | 12 AI scenario cards, Global AI Week | Public space, commercial streets, community nodes |
| **L5 Service** | Microservices | Three areas, two wings — six service modules | Key districts, tech service wing, scenario wing |
| **L4 Platform** | API Gateway / Data Hub | Open-source contribution platform, data exchange | AI Origin Community, Zhongzhiyuan |
| **L3 Network** | Infrastructure Network | Jing-Zhang smart axis + blue-green smart ring + rail | Heritage Park, Qinghe River, Xiaoyue River |
| **L2 Compute** | New Infrastructure | Edge compute stations, low-carbon compute network | Zhongzhiyuan municipal nodes |
| **L1 Hardware** | Physical Space | Land use, buildings, roads, green space | Full boundary GeoJSON |

Each layer follows open-source principles: open interfaces, public protocols, traceable contributions, rollback-able versions. Urban renewal is not demolition-and-rebuild but **version iteration** — from v1.0 (concept design) to v2.0 (regulatory plan deepening) to v3.0 (implementation operation), each with changelog, PR records, and contributor wall.

### 2.3 Five Functions and Three Areas, Two Wings Mapped to CityOS

Three positioning statements [source:AGENT-TASKBOOK]:
- **Centennial Jing-Zhang Cultural Belt** → CityOS "open-source protocol layer": the century of autonomous engineering IS the original open-source protocol —詹天佑's human-character line, China's first autonomous standard gauge.
- **Urban AI Life Experience Belt** → CityOS "user experience layer": AI scenarios are not tech exhibitions but daily city service patches.
- **AI Integration Innovation Belt** → CityOS "development toolchain": universities, enterprises, communities as developers participate via open APIs.

Five functions:
- AI full-stack independent innovation → L4 Platform (Zhongzhiyuan)
- World-class AI innovation ecosystem → L5 Service (AI Origin Community)
- AI+ scenario empowerment paradigm → L6 Application (Xiaoyue River wing)
- Smart AI vitality city → L3 Network (Jing-Zhang smart axis)
- AI governance global voice → L4 Platform (AI Governance Hall)

Three areas, two wings:
- Zhongzhiyuan = `os-core` kernel module (full-stack innovation + AI governance)
- AI Origin Community = `dev-hub` developer module (open-source ecosystem + transfer)
- Dazhongsi = `app-market` application module (smart-native economy + international exchange)
- Zhongguancun Tech Service Wing = `sdk` development toolkit (factor allocation + capital)
- Xiaoyue River Scenario Wing = `sandbox` testing environment (scenario testing + youth vitality)

![CityOS Six-Layer Architecture and Three Areas, Two Wings](assets/figures/key-areas.png)

## Global AI Innovation Ecosystem Cases (6 Background Cases)

| Case | Key Mechanism | CityOS Transferable Content |
| --- | --- | --- |
| London King's Cross | Former railway yard → knowledge-intensive mixed-use community | Public space first, railway narrative, open-source community |
| Singapore Jurong Innovation District | Testbeds and living labs for autonomous driving | Scenario open application, human review, test-display-operation loop |
| Paris Station F | Large startup campus + developer community + open days | Public display interface, annual events, contributor honor system |
| Korea Bangho Tech Valley | Park-residence-commerce mix with rail commute | Transit-oriented development, talent living support, service network |
| Toronto Quayside | Smart city data governance and public controversy | Data minimization, public participation, exit mechanism, human review |
| MIT Media Lab Boston | University-industry-community triple-helix innovation | Near-campus transfer, open-source hardware, cross-disciplinary collaboration |

Six design principles: **public space first, scenario openness, testbed-driven, developer community, transparent data governance, transit-oriented integration** [source:AGENT-TASKBOOK].

## Overall Design: Urban Renewal at Regulatory Plan Depth

### 3.1 Urban Renewal: Version Control, Not Demolition

Four-level version control method: **Retain → Refactor → Rebuild → TBD** [depth:retain_renovate_demolish]. Analogous to CRUD operations:

| Operation | Urban Renewal | Design Principle |
| --- | --- | --- |
| Read (Retain) | Historic, educational, public facility values | Protective reading, no modification |
| Update (Refactor) | Industrial buildings, park environments, community interfaces | Incremental update, preserve data |
| Create (Rebuild) | Axis nodes, greenway stations, new infrastructure prototypes | New features, API design required |
| Delete (TBD) | Items involving ownership, regulatory plans, engineering | No deletion, pending review |

Land use organized per [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], covering full boundary without gaps or overlaps [data:geometry/land_use.geojson#LU-001].

### 3.2 Regulatory Depth and Pending Conditions

All content organized at regulatory detailed planning urban design depth [standard:MOHURD-CONTROL-DETAILED-PLANNING]. Official FAR, building height, density, green ratio, setbacks, and road redlines are not yet published — all listed as pending data [depth:development_intensity_controls].

## Key Area Detailed Design

### 4.1 Zhongzhiyuan = `os-core` Kernel Module

**Positioning**: Garden-type full-stack independent innovation district [source:OFFICIAL-ANNOUNCEMENT].

**CityOS Role**: OS kernel — full-stack independent innovation + AI governance global voice.

**Spatial actions**: Research, compute, testing, and standards governance around national platforms; Qinghe River interface as low-carbon public living room; agent sandbox, low-carbon compute station, and AI governance hall as reservable, displayable, exitable public test nodes [data:geometry/key_areas.geojson#PROV-KEY-001].

### 4.2 AI Origin Community = `dev-hub` Developer Module

**Positioning**: Near-campus technology transfer and talent community [source:AGENT-TASKBOOK].

**CityOS Role**: Developer hub — world-class AI innovation ecosystem, open-source collaboration, talent aggregation.

**Spatial actions**: Campus-park-street slow-traffic stitching; open-source release hall, university-enterprise transfer living room, talent services; transit-oriented public plaza [data:geometry/key_areas.geojson#PROV-KEY-002].

### 4.3 Dazhongsi = `app-market` Application Module

**Positioning**: Urban-type intelligent economy and international exchange district [source:OFFICIAL-ANNOUNCEMENT].

**CityOS Role**: App market — smart-native business display, transfer, international exchange.

**Spatial actions**: Four-quadrant pedestrian connectivity around Dazhongsi Station; smart terminal commercial street, data exchange theater, international roadshow living room; green space for public experience [data:geometry/key_areas.geojson#PROV-KEY-003].

![Three Key Areas and CityOS Roles](assets/figures/key-areas.png)

## AI Innovation Ecosystem, User Personas, and AI+ Scenarios

### 5.1 Six User Personas (with CityOS Developer Roles)

| Persona | CityOS Role | Needs | Spatial Response | Data Boundary |
| --- | --- | --- | --- | --- |
| University researchers | Researcher | Transfer, cross-campus collaboration | Near-campus transfer street | Campus data requires authorization |
| Open-source developers | Contributor | Release, collaboration, testing, reputation | Release hall, public code wall | No individual behavior tracking |
| Startups | Startup | Low-cost office, compute access | Shared test field, edge compute | Compute/data services require authorization |
| Enterprise visitors | Enterprise | Display, business, international接待 | Roadshow living room, transit | Corporate branding requires clearance |
| Residents & youth | Citizen | Commute, leisure, community service | Heritage park slow-traffic ring | Not for commercial recommendation |
| AI Agents | Agent | Sensing, decision support, scenario service | Agent sandbox, data interface | Data minimization + human review |

### 5.2 Twelve AI Scenario Cards (CityOS Pluggable Service Plugins)

| # | Scenario | Plugin | Carrier | Test | Human Review |
| --- | --- | --- | --- | --- | --- |
| 01 | Open-Source Release Hall | `release-plugin` | AI Origin Community | No | Community ops committee |
| 02 | Urban Agent Sandbox | `agent-sandbox` | Zhongzhiyuan test street | **Yes** | Test admission + human review |
| 03 | Low-Carbon Compute Station | `compute-node` | Zhongzhiyuan municipal node | **Yes** | Platform service provider |
| 04 | AI Slow-Traffic Navigation | `mobility-ai` | Jing-Zhang smart axis | No | Ops + public feedback |
| 05 | Data Exchange Theater | `data-exchange` | Dazhongsi data plaza | **Yes** | Compliance audit node |
| 06 | AI Governance Hall | `governance-hub` | Zhongzhiyuan governance square | No | Governance roundtable |
| 07 | University-Enterprise Transfer Hub | `transfer-hub` | Origin Community innovation street | No | Transfer service center |
| 08 | Smart Terminal Commercial Street | `device-market` | Dazhongsi commercial street | No | Merchants + platform |
| 09 | Youth Life Lab | `youth-lab` | Xiaoyue River scenario wing | No | Public service ops |
| 10 | Global AI Open Week Route | `event-route` | Blue-green smart ring | No | Event committee |
| 11 | AI Education Experience Point | `edu-ai` | University-adjacent community | No | Education institution + PTA |
| 12 | Urban Digital Twin Cockpit | `digital-twin` | Control center | No | Data compliance + human review |

Scenarios 02, 03, 05 are AI industry test/validation scenarios [source:AGENT-TASKBOOK], each with four constraints: public source, data minimization, human review, exit mechanism.

### 5.3 Privacy and Human Review Boundaries

No scenario may infringe privacy, over-monitor, or claim immature technology as fully deployed. Urban agents assist in identifying slow-traffic breakpoints, facility maintenance, event safety, and enterprise service needs, but final judgment rests with humans and professional teams. AI-generated content must disclose generation method and source [source:PROCESSED-FACT-PACK].

## Land Use, Building Scale, and Retain/Refactor/Rebuild

Land use per [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], full boundary coverage, no gaps or overlaps [data:geometry/land_use.geojson#LU-001]. Building footprint is conceptual design layer [data:geometry/buildings.geojson#BLDG-001]. Specific FAR, building height, and setbacks pending official regulatory conditions [depth:development_intensity_controls].

## Transportation, Rail, Municipal, and Public Services

Transportation: "axis + ring + connection" [depth:traffic_rail_slow_parking]. Jing-Zhang smart axis greenway for north-south slow traffic, blue-green smart ring for district cycling [data:geometry/roads.geojson#ROAD-001].

Municipal: "traditional pipeline renewal + new infrastructure embedding" [depth:municipal_new_infrastructure]. Distributed energy, edge compute, smart poles, environmental sensing, data interfaces [data:geometry/public_space.geojson#PUBLIC-001].

![Mobility, Slow-Traffic, and Blue-Green Public Space System](assets/figures/mobility-bluegreen.png)

## Blue-Green Space, Public Space, and Urban Character

Blue-green system: Jing-Zhang Heritage Park vitality belt as main axis, Qinghe and Xiaoyue rivers as branches, community parks as nodes — continuous blue-green smart ring [data:geometry/green_space.geojson#GREEN-001].

### Three AI Pilgrimage Landmarks (CityOS Milestone Monuments)

1. **"Human-Character Node" Open-Source Monument**: At the intersection of Jing-Zhang Heritage Park and AI Origin Community. Inspired by詹天佑's human-character line, dual rails converging into open-source symbol (∞), with contributor honor wall.
2. **"Open-Source Origin Tower" Developer Milestone**: At AI Origin Community release plaza. Tower-shaped installation displaying open-source contributor roster, model cards, and annual best contributions.
3. **"Dazhongsi Smart Echo Ring" Application Milestone**: At Dazhongsi Station plaza. Bell and data soundscape as imagery, commemorating China's new intelligent economy culture.

### Urban Character

Per [standard:MOHURD-URBAN-DESIGN-MEASURES]: railway memory materials (gray brick, rail, sleeper elements), AI blue nodes, greenway green base — three-tone character.

## Renewal Project List, Policies, and Phasing

| Project | CityOS Version | Type | Key Dependencies |
| --- | --- | --- | --- |
| JZ-01 Jing-Zhang Smart Axis Greenway | v1.0-alpha | Public space/slow-traffic | Official boundary, ownership, heritage |
| JZ-02 Open-Source Release Plaza + Origin Tower | v1.0-beta | Public space/culture | Transit integration, land conditions |
| JZ-03 Urban Agent Sandbox Street | v1.0-rc | Test/new infrastructure | Test permit, data compliance |
| JZ-04 Low-Carbon Compute Station | v1.0-rc | New infrastructure | Energy, compute, municipal access |
| JZ-05 AI Governance Hall | v1.0 | Public service/governance | Standards organization cooperation |
| JZ-06 University-Enterprise Transfer Hub | v1.1 | Industry service | University transfer mechanism |
| JZ-07 Data Exchange Theater | v1.1 | Display/compliance | Data compliance and audit |
| JZ-08 Dazhongsi Four-Quadrant Connectivity | v1.1 | Transit integration | Station, intersection |
| JZ-09 Youth Life Lab | v1.2 | Community/youth | Public service operations |
| JZ-10 Global AI Open Week | v2.0 | Operations/brand | Public space permit, safety |

Phasing: Near-term (v1.0, lightweight facilities + operations first), Mid-term (v2.0, regulatory deepening + key projects), Long-term (v3.0, governance framework + international communication).

## AI Public Space, Cultural Narrative, and Long-Term Operations

### Cultural Fusion Narrative

Jing-Zhang Railway history (century of autonomous engineering) → Zhongguancun innovation culture (open collaboration) → AI new culture (open-source governance). CityOS encodes three cultures as three versions of an open-source protocol: v0.0 (Jing-Zhang: China's first "open-source" autonomous engineering) → v1.0 (Zhongguancun: knowledge sharing and industry collaboration) → v2.0 (AI era: multi-agent urban governance).

### Wayfinding and Signage

CityOS visual language: version badges (v1.0/v2.0/v3.0), open-source contributor walls, Git-style changelog columns, open-source protocol plaques.

### Long-Term Operations: Global AI Event System

- **Annual**: Global AI Open Week (JZ-OS Week), Open-Source Contributor Conference
- **Quarterly**: AI scenario test-day release, Developer Hackathon
- **Monthly**: Open-source community meetup, AI governance roundtable
- **Continuous**: CityOS GitHub repository contributions, Digital Twin Cockpit access

Operations: developer community points system, contributor honor display, scenario open application platform, international communication matrix.

## Metrics, Area Recalculation, and Compliance Matrix

![Core Metrics Recalculation and Evidence Chain](assets/figures/metrics-evidence.png)

Metrics cover spatial indicators (boundary area, green ratio, public space ratio, building footprint), regulatory indicators (pending official conditions), and performance indicators (AI innovation index, talent density, event participation). All known metrics verifiable from GeoJSON [metric:site_area_sqm], [metric:green_ratio], [metric:public_space_ratio], [metric:scenario_node_count].

Compliance matrix is the master task-response file. Every announcement task and agent_taskbook task maps to report chapters, layers, metrics, drawings, HTML pages, sources, assumptions, and self-check items [depth:metrics_recalculation].

## Risk, Copyright, and Compliance

**Bilingual requirement**: Primary file in Chinese (`language: "zh"`), complete English translation in `proposal.en.md` [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

Risk and data gap inventory per [depth:risk_missing_data], [data:geometry/constraints.geojson#CONSTRAINTS], [source:SITE-PACKAGE]. Official boundary, key area, regulatory plan, road, parcel, building, municipal, heritage, and public service gaps must enter `assumptions.json`, self-check, and risk chapters.

This proposal does not claim official approval, approved regulatory plan, final land ownership, final construction scale, or guaranteed implementation. The AI agent is responsible for facts, sources, copyright, spatial data, metrics, and expression.

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/agent_taskbook.json
- brief/site-package/allowed_design_space.json
- brief/site-package/standards/standards.json
- data/source_registry.json
- Full machine index: `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`