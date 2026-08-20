---
title: "Jing-Zhang Intelligence Chain: An AI Innovation Corridor on the Centennial Railway Heritage"
author_github: "cddpkp9djp-png"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A north-south AI innovation corridor anchored on the Jing-Zhang Railway heritage park, linking three key areas—Zhongzhiyuan, Beijing AI Origin, and Dazhongsi—through a green spine and east-west wings, integrating cultural heritage, talent life, and AI innovation."
tracks: ["ai-traffic-walkability"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "enterprise-service-copilot"]
iteration: "v1.0"
---

# Jing-Zhang Intelligence Chain: An AI Innovation Corridor on the Centennial Railway Heritage

## Design Basis and Source Inventory

This proposal is grounded in the *Centennial Jing-Zhang AI Innovation Belt Urban Design International Competition Qualification Pre-Announcement* issued by the Beijing Municipal Commission of Planning and Natural Resources, Haidian Branch [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509], and the agent-facing taskbook excerpt provided in the repository [source:DATA-SRC-AGENT-TASKBOOK-20260518]. Professional depth and land-use classification follow the *Urban Design Management Measures* [standard:MOHURD-URBAN-DESIGN-MEASURES], the *Regulatory Detailed Planning Compilation and Approval Measures* [standard:MOHURD-CONTROL-DETAILED-PLANNING], and the *Land-Sea Use Classification Guide for Territorial Spatial Planning* [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

Spatial data use the repository-maintained `provisional_boundaries.geojson` [data:geometry/site_boundary.geojson#SITE-001], explicitly tagged as a `provisional_constraint`. It cannot substitute for an official redline, road redline, or precise-area basis [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]. Upon release of official CAD/GIS/PDF boundaries, all layers, metrics, and drawings must be regenerated.

Complete source records, metric formulas, compliance matrix, standard matrix, and design-depth matrix are in `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, and `design_depth_matrix.json`.

![Overall concept and spatial structure](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal adopts the three nested scopes required by the announcement [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]:

- **Coordinated research area (43.6 km²)**: Bounded by the North 5th Ring Road, Jingzang Expressway, Xizhiwai Street, and Wanquanhe Road. This layer frames the AI industrial ecosystem, three-areas-two-wings synergy, future urban form, and cultural narrative [depth:three_level_scope_framework].
- **Overall design area (11.4 km²)**: A 1–2 km belt around the Jing-Zhang Railway heritage park, bounded by the North 5th Ring Road, Xueyuan/Xitucheng Roads, Xizhiwai Street, and Dazhongsi East Road/Heqing Road. This layer carries regulatory-plan-depth urban renewal, spatial structure, land use, transport, utilities, blue-green systems, and a renewal project list [data:geometry/site_boundary.geojson#SITE-001].
- **Key detailed-design area (368.4 ha)**: Comprises the Zhongzhiyuan AI Autonomous Innovation Acceleration Area, Beijing AI Origin Community, and Dazhongsi AI Industry Cluster, from north to south [data:geometry/key_areas.geojson].

All three scopes use provisional polygons; their precision is provisional rough and intended only for AI generation, visualization, and self-check. Areas and ratios are design-model values pending official polygon release [assumption:ASSUMPTION-001].

![Three-level scope and land-use structure](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future-City Research

### Overall Concept

"Jing-Zhang Intelligence Chain" transforms the century-old Jing-Zhang Railway industrial heritage into a cultural spine, injects Zhongguancun's innovation DNA, and channels AI new-quality productive forces into a north-south, east-west-stitched AI innovation corridor. The three positionings respond to the taskbook [source:DATA-SRC-AGENT-TASKBOOK-20260518]:

- **Centennial Jing-Zhang Cultural Belt**: Preserve the linear memory of the railway heritage park and turn it into an innovation-culture landmark.
- **Urban AI Living Experience Belt**: Organize work, study, living, consumption, sports, and social spaces around a one-day talent-life circle.
- **AI Convergent Innovation Belt**: Integrate university-source innovation, enterprise full-stack R&D, scenario testing, and developer-community operations.

### Five Functions and Three-Areas-Two-Wings Synergy

The proposal implements the five functions in the taskbook [source:DATA-SRC-AGENT-TASKBOOK-20260518]:

1. **AI full-stack autonomous innovation system** (Zhongzhiyuan core): basic research, open-source frameworks, compute infrastructure, and governance standards.
2. **World-class AI innovation ecosystem** (Beijing AI Origin core): university technology transfer, talent zone, open-source community, and international cooperation.
3. **AI+ scenario-empowerment paradigm** (Xiaoyuehe scenario-empowerment wing): urban governance, transport, public services, and shared research instruments.
4. **Intelligent AI-vibrant city** (Dazhongsi core): AI-agent consumer services, smart terminals, and content creation.
5. **Global AI governance voice** (Zhongzhiyuan + Zhongguancun technology-service wing): safety evaluation, standards, international conferences, and policy dialogue.

The "three areas and two wings" form a closed loop: the cores provide industrial content and spatial carriers; the east wing supplies capital, IP, and professional services; the west wing hosts scenario testing and public experience [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS].

### Global Case References

The proposal draws on 5–8 global AI innovation districts, including Barcelona 22@, Toronto Waterfront/Sidewalk, Pittsburgh Robotics Row, Paris Station F, and Shenzhen Nanshan Science Park. Transferable lessons include preserving industrial heritage for spatial identity, using public platforms to lower innovation transaction costs, sustaining community vitality through annual events, and retaining talent through housing and public services [source:DATA-SRC-AGENT-TASKBOOK-20260518].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Spatial Structure

The overall design area follows a "one chain, three cores, two wings, six corridors" structure [data:geometry/land_use.geojson]:

- **One chain**: The Jing-Zhang Railway heritage park green spine, with a central pedestrian path and AI scenario nodes, flanked by park green space and cultural corridors.
- **Three cores**: The three key areas, from north to south, hosting full-stack autonomy, technology transfer, and intelligent economy.
- **Two wings**: The east Zhongguancun technology-service wing (business, finance, education, professional services) and the west Xiaoyuehe scenario-empowerment wing (research, living, testing scenarios).
- **Six corridors**: Six east-west slow-mobility connectors at the boundaries of the key areas to stitch together the urban fabric divided by the railway.

### Land-Use Layout

Land-use coding follows the national territorial-spatial classification standard [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. Within the 11.4 km² overall design area, the main uses are research (0802), education (0804), commercial and business services (09), residential (0701), park green space (1401), and plaza/public-space land (1403) [data:geometry/land_use.geojson]. Proportions and metrics are in `metrics.json` and Figure 5.

### Renewal Framework

Given the absence of existing-building, ownership, and regulatory-plan data, the proposal defines three conceptual strategies [depth:retain_renovate_demolish]:

- **Retain**: Universities, research institutes, and good-quality educational buildings; focus on functional insertion and public-space upgrading.
- **Renovate**: Industrial heritage, underperforming commercial, and community-service facilities; convert them into AI public services, talent housing, and incubators.
- **Demolish / New-build**: Structures with serious safety or functional mismatches; renew them into mixed-use buildings subject to official regulatory approval.

All retain/renovate/demolish judgments are conceptual suggestions, not statutory planning or engineering implementation conclusions [source:DATA-SRC-AGENT-TASKBOOK-20260518].

## Detailed Design of Key Areas

### Zhongzhiyuan AI Autonomous Innovation Acceleration Area

Positioned as a garden-type autonomous innovation district, hosting the AI full-stack autonomous innovation system and global AI governance voice [data:geometry/key_areas.geojson#KA-001].

- **Spatial strategy**: Zhongzhiyuan Wisdom-Source Plaza anchors the Open-Source Release Hall, AI Safety Governance Corridor, and University-Enterprise Transfer Living Room; research land on the west and education on the east.
- **Building renewal**: Low-to-mid-rise research buildings; retain university buildings and renovate selected underperforming spaces for exhibition and conferences.
- **Public space**: Wisdom-Source Plaza on the central spine and east-west slow-mobility links connecting both sides.
- **Implementation risk**: The provisional polygon has low precision; official boundaries require recalculation of functional layout and areas.

### Beijing AI Origin Community

Positioned as a campus-adjacent technology-transfer district, emphasizing university-source innovation, open-source community, and talent services [data:geometry/key_areas.geojson#KA-002].

- **Spatial strategy**: AI Origin Open-Source Plaza is the core, surrounded by education, research, and talent-apartment mixed uses; research-instrument sharing and testing scenarios on the west, education and international cooperation on the east.
- **Building renewal**: Low-disturbance renewal, prioritizing activation around campuses and transit stations.
- **Public space**: Open-Source Plaza as the daily gathering and release node; east-west corridors strengthen station integration.
- **Implementation risk**: University building ownership is complex; any renovation requires consent from property owners and management agencies.

### Dazhongsi AI Industry Cluster

Positioned as an urban intelligent-economy district, focusing on AI agents, smart terminals, content consumption, and business services [data:geometry/key_areas.geojson#KA-003].

- **Spatial strategy**: Dazhongsi Agent Plaza is the core; business-finance land on the west and commercial land on the east; the four quadrants around Dazhongsi Station are linked by underground/ground pedestrian systems (conceptual).
- **Building renewal**: Encourage vertical mixed development, with smart-native retail and exhibition at ground level and offices/talent apartments above.
- **Public space**: Agent Plaza for experience and launches; street-level low-carbon compute stations and data-factor theater.
- **Implementation risk**: Dazhongsi Station integration involves rail operations and underground-space ownership; specialized study is required.

![Detailed design index of the three key areas](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### User Personas

The proposal defines five core user types [source:DATA-SRC-AGENT-TASKBOOK-20260518]:

1. **Young researchers**: need labs, compute, academic exchange, and shared research instruments.
2. **Open-source developers**: need co-working spaces, release platforms, community events, and fast transit.
3. **Industry engineers**: need R&D centers, test fields, supply-chain services, and talent apartments.
4. **Local residents**: need living services, cultural facilities, accessible public spaces, and participation channels.
5. **International visitors**: need AI experience routes, multilingual wayfinding, cultural events, and transit connections.

### AI+ Scenario Cards

The proposal provides 13 AI scenario nodes, satisfying the requirement of at least 10 scenario cards and 3 industry test/validation scenarios [data:geometry/scenario_nodes.geojson]:

| ID | Scenario | Location | Users | Privacy & Review |
|---|---|---|---|---|
| SC-001 | Open-Source Release Hall | Zhongzhiyuan Wisdom-Source Plaza | Developers, enterprises, universities | Public events; manual copyright review |
| SC-002 | Urban Agent Sandbox | AI Origin Open-Source Plaza | Research institutes, enterprises | Bounded test domain; human takeover |
| SC-003 | Slow-Mobility Bottleneck Diagnosis | West wing | City managers, citizens | Anonymized data; manual review of retrofit proposals |
| SC-004 | Talent Life Concierge | East wing | Talent, residents | Minimal necessary data; human service fallback |
| SC-005 | AI Safety Governance Corridor | Zhongzhiyuan | Standards bodies, enterprises | Public evaluation; independent third-party review |
| SC-006 | University-Enterprise Transfer Living Room | West wing | Universities, enterprises, investors | Contract-bound; manual matchmaking |
| SC-007 | Data Factor Theater | Dazhongsi | Enterprises, public | Compliant data; anonymized display |
| SC-008 | Low-Carbon Compute Station | Dazhongsi West Plaza | Enterprises, public | Public energy data; manual inspection |
| SC-009 | Jing-Zhang Memory Route | Central spine | Tourists, citizens | Public cultural content; no personal privacy |
| SC-010 | Global AI Week Route | Central spine | Global developers | Public events; manual organization |
| SC-011 | Test scenario — AI traffic signals | East of Zhongzhiyuan | Traffic authorities, enterprises | Bounded intersection; police review |
| SC-012 | Test scenario — embodied delivery | Dazhongsi | Logistics, property | Bounded time/area; human monitoring |
| SC-013 | Test scenario — shared research instruments | West wing | Universities, institutes | Reservation system; institutional authorization |

Each scenario specifies data sources, privacy boundaries, human-review mechanisms, and operating entities, avoiding excessive surveillance or unreviewable automation [source:DATA-SRC-AGENT-TASKBOOK-20260518].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

### Land Areas

`geometry/land_use.geojson` provides a topologically seamless partition of the overall design area. Land-use types and areas are recorded in `metrics.json` and Figure 5. Key metrics include:

- Overall design area: 11.41 km² (recalculated from submitted boundary)
- Green ratio: approx. 11.3% [metric:green_ratio]
- Public-space ratio: approx. 9.9% [metric:public_space_ratio]

### Building Scale

Because official regulatory controls are missing, floor-area ratio, building density, and building height are marked `unknown` in this package [metric:floor_area_ratio]. Conceptual building footprints express spatial intention only, not real building layouts. The renewal strategy prioritizes retention, renovation, and limited new construction; specific conclusions require existing-building, ownership, and regulatory data [assumption:ASSUMPTION-002].

## Transport, Rail, Municipal Infrastructure, and Public Services

### Transport Strategy

The proposal follows a "transit-led, slow-mobility-first, east-west stitched" strategy [data:geometry/roads.geojson]:

- **Station integration**: Strengthen integration of Dazhongsi, Qinghua East Road West, and Wudao Stations with surrounding land, including vertical circulation and conceptual underground connectors.
- **Road microcirculation**: Retain existing arterial redlines (pending official data), densify local roads, and reduce through traffic in key areas.
- **Slow-mobility network**: A central spine pedestrian path and six east-west slow-mobility connectors form a "well-shaped" skeleton ensuring continuous access across the railway.
- **Parking and non-motorized transport**: Public bike/e-bike transfer points in key areas; parking integrated with underground space.

### Municipal and Public Services

The proposal integrates distributed energy, edge-compute stations, and sponge-city facilities, but specific utility lines, drainage, power, gas, and fire-access data are missing; current content is conceptual [assumption:ASSUMPTION-003]. Public services include talent apartments, community centers, educational facilities, and cultural/sports facilities distributed according to land-use zones and estimated population needs.

![Mobility, blue-green and public-space composite system](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

### Blue-Green System

The Jing-Zhang Railway heritage park is the core blue-green spine. The design transforms it from a linear barrier into a continuous park corridor and public-space sequence [data:geometry/green_space.geojson]:

- **Central pedestrian path**: A 50 m conceptual pedestrian path running north-south, hosting AI events, cultural display, and slow mobility.
- **Park green space**: Parkland on both sides retains industrial-heritage elements and adds rain gardens and sponge-city facilities.
- **East-west green connectors**: Six slow-mobility links also serve as ecological corridors penetrating greenery into both sides.

### Public Space

Public space comprises the central pedestrian path, three key-area plazas, east-west wing community living rooms, and six east-west connectors [data:geometry/public_space.geojson]. Total public space is approximately 112 ha, about 9.9% of the site. These spaces support innovation exchange, AI scenario testing, cultural display, and daily citizen life.

### AI Pilgrimage Landmarks

The proposal proposes three AI pilgrimage / honor-display nodes [source:DATA-SRC-AGENT-TASKBOOK-20260518]:

1. **Jing-Zhang Wisdom-Source Tower** at Zhongzhiyuan Wisdom-Source Plaza, displaying major AI breakthroughs, open-source contributors, and annual honorees.
2. **Open-Source Release Hall** at AI Origin Open-Source Plaza, an iconic space for global developers to release new models and frameworks.
3. **Agent Plaza** at Dazhongsi, displaying embodied intelligence, smart terminals, and urban agent applications.

These landmarks are conceptual designs that do not imply alteration of existing buildings; deepening requires ownership and management consent.

### Urban Character

Character guidance follows the *Urban Design Management Measures* on building height, massing, style, and color [standard:MOHURD-URBAN-DESIGN-MEASURES]:

- **Overall tone**: technological, humanistic, low-carbon, open.
- **Area differentiation**: Zhongzhiyuan emphasizes low-to-mid-rise garden research buildings; AI Origin emphasizes campus-adjacent mixed blocks; Dazhongsi emphasizes urban vertical mixed development.
- **Cultural heritage**: Railway remnants, bridges, and platforms are preserved through landscape and signage interpretation.

## Renewal Projects, Implementation Policy, and Phasing

### Phasing Strategy

`geometry/phasing.geojson` divides renewal into three phases:

- **Near term (PH-001)**: Jing-Zhang Intelligence Chain green spine and three-core catalyst areas, including the central pedestrian path, three plazas, first batch of AI scenario nodes, and basic infrastructure.
- **Mid term (PH-002)**: East-west wing industry and living-support renewal, including incremental transformation of research, education, commercial, and residential mixed uses.
- **Long term (PH-003)**: North-south gateways and regional synergy, including functional linkage with the wider urban system and brand export.

### Implementation Policy Directions

Policy directions include innovative mixed land use, existing-building functional conversion, talent housing set-asides, AI scenario open-test sandboxes, compliant data-factor circulation, and green low-carbon incentives. These are conceptual directions, not government commitments or approved arrangements [source:DATA-SRC-AGENT-TASKBOOK-20260518].

### Long-Term Operations

- **Annual event system**: Global AI Week, Developer Festival, Scenario Open Days, competitions, roadshows, and urban experience routes.
- **Developer community operation**: Sustained community through the Open-Source Release Hall, AI Origin Community, and online platforms.
- **Brand assets**: Jing-Zhang Intelligence Chain naming system, Logo direction, wayfinding system, and digital content library.
- **International communication**: Attract global talent and enterprises through the narrative of "centennial railway + AI future."

## Metrics, Area Recalculation, and Compliance Matrix

### Core Metrics

All known metrics in `metrics.json` are recalculated from submitted geometry. Key metrics include [metric:site_area_sqm][metric:green_ratio][metric:public_space_ratio]:

- Overall design area: 11,412,825 m²
- Green ratio: 11.33%
- Public-space ratio: 9.85%
- AI scenario nodes: 13
- Industry test/validation scenarios: 3

Metrics depending on official regulatory controls, such as FAR, building density, and building height, remain `unknown` with reasons [metric:floor_area_ratio].

### Compliance and Depth Matrices

`compliance_matrix.json` covers all announcement items 1.3, 1.4, 1.5 and agent tasks 1–6; `standard_matrix.json` covers the announcement, taskbook, Urban Design Management Measures, Regulatory Detailed Planning Measures, and Land-Sea Use Classification Guide; `design_depth_matrix.json` marks items such as existing-conditions diagnosis, three-level scope, overall structure, land-use layout, key-area detailed design, transport/blue-green, building renewal, metric recalculation, and risk/compliance as `complete`, noting limitations imposed by provisional boundaries and missing regulatory data [depth:metrics_recalculation].

![Core metrics recalculation and evidence chain](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

### Data and Planning Risks

Official precise boundaries, regulatory controls, existing buildings, ownership, municipal utilities, and heritage control lines are missing. All spatial conclusions are provisional design-model values [assumption:ASSUMPTION-001][assumption:ASSUMPTION-002][assumption:ASSUMPTION-003]. This proposal does not constitute statutory planning, approval, engineering feasibility, or government implementation commitment [source:DATA-SRC-AGENT-TASKBOOK-20260518].

### Copyright and Compliance

- All diagrams, HTML, GeoJSON, and text are generated by Kimi Code from public/cleared materials under human direction, without unauthorized fonts, trademarks, portraits, or corporate logos.
- Chinese characters use STHeiti, a macOS system font, under system license terms.
- Provisional boundary sources and official announcements are recorded in `sources.json` and `report/copyright_statement.md`.
- AI-generated content does not infringe personal privacy; scenario designs include human-review and privacy-boundary provisions.

The full copyright statement is in `report/copyright_statement.md`.

## References

1. Beijing Municipal Commission of Planning and Natural Resources, Haidian Branch, *Centennial Jing-Zhang AI Innovation Belt Urban Design International Competition Qualification Pre-Announcement*, 2026-05-09 [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509].
2. User-provided cleared taskbook, *Taskbook Excerpt for the Global Agent Open Call for the Centennial Jing-Zhang AI Innovation Belt*, 2026-05-18 [source:DATA-SRC-AGENT-TASKBOOK-20260518].
3. Ministry of Housing and Urban-Rural Development, *Urban Design Management Measures*, 2017 [standard:MOHURD-URBAN-DESIGN-MEASURES].
4. Ministry of Housing and Urban-Rural Development, *Regulatory Detailed Planning Compilation and Approval Measures* [standard:MOHURD-CONTROL-DETAILED-PLANNING].
5. Ministry of Natural Resources, *Land-Sea Use Classification Guide for Territorial Spatial Planning*, 2023 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].
6. Repository maintainers, *Provisional Polygons for the Three-Level Scope and Three Key Areas of the Centennial Jing-Zhang AI Innovation Belt*, 2026-06-05 [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605].
7. Beijing Municipal Science and Technology Commission & Zhongguancun Science Park Management Committee, *"Three Areas and Two Wings" Build a World-Class AI Cluster*, 2026-04-03 [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS].
8. Beijing Haidian District People's Government, *Haidian District Releases "1+X+1" Modern Industrial System Layout*, 2026-03-02 [source:SRC-2026-HAIDIAN-1X1].
