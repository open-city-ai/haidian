---
title: "Jingzhang AI Track: From the Herringbone Track to the Intelligence Track"
author_github: "koishi70"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.md"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "An AI belt urban design proposal along the 'From Herringbone Track to Intelligence Track' narrative: one green spine, three innovation cores, two wings, and a blue-green mobility loop."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# Jingzhang AI Track: From the Herringbone Track to the Intelligence Track

## 1. Design Basis and Source List

This proposal is grounded in the *Pre-qualification Announcement of the Centennial Jingzhang AI Innovation Belt International Urban Design Solicitation* published by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources [source:OFFICIAL-ANNOUNCEMENT], and uses the machine-readable design brief [source:SITE-PACKAGE], the Agent Open Call Taskbook [source:AGENT-TASKBOOK], the Allowed Design Space [source:ALLOWED-DESIGN-SPACE], and the provisional boundaries [source:BOUNDARY-SOURCE] registered in `brief/site-package/`.

Three non-negotiable principles:

1. **Public-source boundary**: all spatial data derives from publicly published provisional boundaries and public materials; no fabricated official redlines, regulatory controls, ownership, or engineering conclusions [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].
2. **Concept-advisory nature**: all Agent spatial proposals are conceptual suggestions and reference plans; they do not replace statutory planning or constitute government-approved conclusions [source:AGENT-TASKBOOK].
3. **Traceability and reproducibility**: every design judgment maps to a source, metric, layer, and assumption, following the `[source:]`, `[standard:]`, `[depth:]`, `[data:]`, `[metric:]` citation contract [depth:metrics_recalculation].

![Site Overview](assets/figures/site-overview.en.png)

This submission uses the provisional boundary (`geometry/site_boundary.geojson#SITE-001`), whose precision is low and which is used only for design generation, self-check, visualization, and design discussion [data:geometry/site_boundary.geojson#SITE-001]. All layers and metrics must be recalculated when the official polygon is published.

## 2. Overall Concept: Jingzhang AI Track

### 2.1 Core Narrative: From Herringbone Track to Intelligence Track

In 1909, Zhan Tianyou's herringbone (zig-zag) alignment carried trains over the Badaling mountain pass, marking the origin of China's autonomous engineering innovation. More than 110 years later, on the same land, AI is weaving a new "intelligence-shaped" network—data flows, compute flows, and talent flows converging in urban space, letting innovation climb new peaks again.

**Primary name: Jingzhang AI Track (京张智轨)**

- **"Jingzhang"**: anchors the geography and historical memory of the century-old railway;
- **"AI Track"**: an intelligent track—the track on which agents, data flows, and algorithms run in space—and a contemporary expression of the "rail track" metaphor: innovation needs a track; tracks carry speed and direction.

**Naming system**: One Belt (Jingzhang AI Track spine), Three Cores (Zhongzhiyuan · Compute Hub / AI Origin Community · Origin Field / Dazhongsi · Scenario Station), Two Wings (Zhongguancun Technology Service Wing / Xiaoyuehe Scenario Empowerment Wing), and a Blue-Green Mobility Loop.

**Logo direction**: a herringbone rail track isomorphic with a neural-network node—two herringbone rails crossing at a glowing node, symbolizing human intelligence and machine intelligence converging on the herringbone track. Palette: Jingzhang railway blue-grey (heritage) + AI electric blue (future). Extended graphics may draw from rail cross-sections, signal lights, and switch symbols [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### 2.2 Three Positionings and Five Functions

The proposal responds to the taskbook's three positionings and five functions [source:AGENT-TASKBOOK]:

| Positioning | Proposal response |
| --- | --- |
| Centennial Jingzhang culture belt | Greenbelt spine, Tsinghua Garden Station heritage narrative, Jingzhang Culture Narrative Hall |
| Urban AI life experience belt | 10 AI scenario cards, three-core public spaces, Xiaoyuehe Wing |
| AI-integrated innovation belt | Zhongzhiyuan full-stack system, Origin Community open-source ecosystem, Dazhongsi intelligent-native formats |

Five-function mapping: AI full-stack autonomous innovation system (Zhongzhiyuan); world-class AI innovation ecosystem (Origin Community + Zhongguancun Wing); AI+ scenario empowerment paradigm (Xiaoyuehe Wing + scenario cards); intelligent AI-vibrant city (three-core public spaces + mobility loop); global voice in AI governance (Jingzhang AI Forum + developer community).

### 2.3 Spatial Structure: One Belt, Three Cores, Two Wings, Blue-Green Loop

![Land-use Structure](assets/figures/land-use-structure.en.png)

- **One Belt**: the Jingzhang heritage park greenbelt spine, running north-south, linking the three cores; the main ridge of heritage and public space [data:geometry/land_use.geojson#LU-004].
- **Three Cores**: Zhongzhiyuan AI Acceleration Area (compute hub), Beijing AI Origin Community (origin field), Dazhongsi AI Industry Cluster (scenario station) [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003].
- **Two Wings**: Zhongguancun Technology Service Wing (global allocation of factors, IP and capital enablement); Xiaoyuehe Scenario Empowerment Wing (scenario opening and urban vitality) [data:geometry/land_use.geojson#LU-005].
- **Blue-Green Mobility Loop**: the greenbelt as spine linking three-core pocket parks and the Xiaoyuehe green corridor into a composite loop for walking, cycling, and public activity [data:geometry/roads.geojson#ROAD-004].

## 3. Three-Level Scope Framework

The proposal organizes work at the three announcement levels [source:OFFICIAL-ANNOUNCEMENT]:

| Level | Area | Design focus | Data anchor |
| --- | --- | --- | --- |
| Coordinated research area | 43.6 km² | AI industry ecosystem, innovation chain, future urban form | compliance_matrix.json, standard_matrix.json |
| Overall design area | 11.4 km² | Land use, roads, green space, public space, phasing | [data:geometry/land_use.geojson#LU-001] [data:geometry/roads.geojson#ROAD-001] |
| Key detailed design area | 368.4 ha | Detailed design of the three cores | [data:geometry/key_areas.geojson#PROV-KEY-001] |

The research area addresses the "university origin—open-source collaboration—enterprise conversion—public experience—international communication" innovation chain; the overall design area implements land use and spatial structure; the key area conducts detailed design of the three cores [depth:three_level_scope_framework] [depth:overall_spatial_structure].

## 4. Coordinated Research Area: Industry and Future City Research — AI Full-Stack Autonomous Innovation System and World-Class AI Innovation Ecosystem

### 4.1 Global AI Ecosystem Case Studies (6)

| Case | Location | Transferable mechanism |
| --- | --- | --- |
| Palo Alto R&D corridor | USA | University origin—venture capital—enterprise conversion along a corridor |
| Kendall Square, Boston | USA | Research-anchored innovation community, MIT+industry symbiosis |
| Nanshan Science Park, Shenzhen | China | Hardware innovation + supply chain + rapid scenario iteration |
| One North, Singapore | Singapore | Government-led test beds and scenario-open system |
| Station F, Paris | France | Open-source ecosystem housing 1,000 teams in one building |
| King's Cross, London | UK | Railway industrial heritage regenerated into an innovation quarter |

### 4.2 Innovation Ecosystem Map and Spatial Mapping

The ecosystem map is organized in four layers—foundation (compute/data/algorithm), platform (open-source/model/tools), application (scenarios/products/services), and governance (standards/evaluation/ethics) [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

Spatial mapping: Zhongzhiyuan hosts the foundation and platform layers (full-stack labs, compute hub); Origin Community hosts the platform and open-source ecosystem (open-source collaboration, education and research); Dazhongsi hosts application-layer scenario stations (intelligent-native commerce, test scenarios); the Zhongguancun Wing hosts the factor layer (capital, IP, talent services).

### 4.3 Factor Mechanism Recommendations

- **Land and space**: reserved blank land as innovation buffer [data:geometry/land_use.geojson#LU-006];
- **Industry and capital**: link to Zhongguancun Wing capital and IP mechanisms;
- **Talent**: talent apartments and talent-service complex (Dazhongsi core) [data:geometry/buildings.geojson#BLDG-012];
- **Compute and data**: Zhongzhiyuan full-stack lab cluster with public-data and scenario-open mechanisms;
- **Scenarios**: Xiaoyuehe Wing's scenario-open operation mechanism.

## 5. AI Innovation Ecosystem, Personas, and AI+ Scenarios — Empowerment Paradigm and Intelligent AI-Vibrant City

### 5.1 Ten AI Scenario Cards

| # | Scenario | Spatial anchor | User | Operation mechanism |
| --- | --- | --- | --- | --- |
| 1 | AI commute assistant | AI Track spine | Commuters | Real-time mobility + walking guidance |
| 2 | Intelligent tour guide | Jingzhang park greenbelt | Visitors | AI voice guide + AR heritage reconstruction |
| 3 | Open-source collaboration plaza | Origin co-creation plaza | Developers | Open-source community events + code showcase |
| 4 | Full-stack lab open day | Zhongzhiyuan | Researchers | Lab open days + results demo |
| 5 | Intelligent-native retail block | Dazhongsi | Consumers | AI recommendations + unmanned retail pilot |
| 6 | Scenario test ground | Xiaoyuehe Wing | Enterprises | Real-environment testing + data feedback |
| 7 | AI health station | Three-core communities | Residents | Health screening + chronic-care management |
| 8 | Smart parking and transfer | Transit stations | Commuters | Parking guidance + transfer dispatch |
| 9 | AI civic assistant | Community service centers | Residents | Policy Q&A + service guidance |
| 10 | Developer challenge stage | Dazhongsi plaza | Developers | Hackathons + demos + incubation matching |

### 5.2 Five User Personas

| # | Persona | Needs | Spatial response |
| --- | --- | --- | --- |
| 1 | Young developer | Low-cost workspace, open-source community, tech exchange | Origin open-source offices, co-creation plaza |
| 2 | Researcher | Labs, compute, interdisciplinary collaboration | Zhongzhiyuan full-stack lab cluster |
| 3 | Entrepreneur | Incubation, financing, scenario validation | Zhongzhiyuan incubators + Dazhongsi test scenarios |
| 4 | Resident | Parks, convenience, participation | Three-core pocket parks + community service centers |
| 5 | Global visitor | Landmark experience, cultural narrative, international exchange | Jingzhang Culture Narrative Hall + AI landmarks |

### 5.3 Privacy and Human-Centered Boundaries

All AI scenarios follow minimal collection, human review, and opt-out principles [standard:GENERATIVE-AI-INTERIM-MEASURES]; scenarios involving personal data require privacy assessment and human confirmation; no over-surveillance scenarios are deployed [standard:BARRIER-FREE-ENVIRONMENT-LAW].

## 6. Detailed Design of Key Areas — AI Public Space, Intelligent-Native Formats, and Pilgrimage Landmarks

### 6.1 Jingzhang Heritage Park AI Public Space

Greenbelt as skeleton, three cores as nodes, scenarios as veins: the greenbelt provides continuous walking and ecology; three-core plazas provide public interfaces for AI activities [data:geometry/public_space.geojson#PUBLIC-001]; scenario cards along the greenbelt form an experience path.

### 6.2 Three AI Pilgrimage Landmarks

| # | Landmark | Location | Concept |
| --- | --- | --- | --- |
| 1 | Bell of Origin | AI Origin Community | A glowing node sculpture where herringbone rail meets neural network; symbol of the innovation origin |
| 2 | AI Track Signal Tower | Zhongzhiyuan | A high-visibility structure modeled on railway signals displaying real-time compute/data flows |
| 3 | Eye of Scenarios | Dazhongsi | A public art installation in the intelligent-native retail block visualizing AI scenarios in real time |

### 6.3 Honor Display System and Public-Space Component Library

Honor system: developer honor wall (engraved GitHub IDs), AI scenario contributor board, annual innovator list, arranged along the greenbelt and three-core plazas. Component library: standardized smart seats, smart light poles, information screens, accessible signage, AI interaction terminals [standard:BARRIER-FREE-ENVIRONMENT-LAW].

## 7. Blue-Green Network, Public Space, and Urban Character — Cultural Narrative: Jingzhang, Zhongguancun, and AI New Culture

### 7.1 Narrative Thread

"From Herringbone Track to Intelligence Track": the Jingzhang herringbone alignment (origin of autonomous engineering) → Zhongguancun Electronics Street (origin of autonomous technology) → Jingzhang AI Innovation Belt (origin of autonomous intelligence). Three lines are spatially and temporally isomorphic, forming a "trilogy of China's autonomous innovation."

### 7.2 Spatial Culture System

- Tsinghua Garden Station heritage narrative [data:geometry/constraints.geojson#CONSTRAINTS-001];
- Jingzhang Culture Narrative Hall (greenbelt cultural node) [data:geometry/buildings.geojson#BLDG-013];
- Cultural stations and heritage markers along the greenbelt;
- Wayfinding system: rail-symbol-motif signage, bilingual, accessibility-compliant [standard:BARRIER-FREE-ENVIRONMENT-LAW].

### 7.3 International Communication Copy

**"From the Herringbone Track to the Intelligence Track"**—110 years of China's autonomous innovation. Supporting images: the three core figures (overview, land-use structure, landmarks).

## 8. Renewal Projects, Implementation Policy, and Phasing — Global AI Event System and Long-Term Operation Design

### 8.1 Annual Event System

| Frequency | Event | Venue |
| --- | --- | --- |
| Annual | Jingzhang AI Forum (global AI governance voice) | Zhongzhiyuan |
| Semi-annual | AI Scenario Open Day | Xiaoyuehe Wing |
| Quarterly | Developer challenge / hackathon | Dazhongsi plaza |
| Monthly | Open-source community meetup | Origin co-creation plaza |
| Weekly | Public AI experience day | Three-core public spaces |

### 8.2 Brand IP and Communication

The "Jingzhang AI Track" brand system: logo, mascot (herringbone signal-light sprite), annual theme, visual system. Channels: developer communities, social media, international tech media, academic conferences.

### 8.3 Developer Community Operation

- Open-source hosting and contribution incentives (GitHub organization);
- Developer honor wall and contributor certificates [data:geometry/buildings.geojson#BLDG-005];
- Regular meetups and workshops;
- Scenario-open APIs and sandbox test environments.

### 8.4 Scenario-Open Operation and Conversion Pathway

Scenario-open mechanism: enterprise application → sandbox testing → real-environment pilot → data feedback → results showcase. Conversion pathway: validated scenarios → Zhongguancun Wing capital and policy support → incubation → integration into the innovation ecosystem map. All activities require human confirmation; no exaggeration of government commitments [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## 9. Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design — Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

### 9.1 Land-Use Structure

AI industry land (research 0802 + education-research 0804 + commerce 05) ≈ 25.6%; green and open space ≈ 47.2% (greenbelt, pocket parks, green corridors); public-service, living-service, and reserved land constitute the remainder [metric:ai_industry_land_ratio] [metric:green_ratio]. Full layers in `geometry/land_use.geojson`, non-overlapping and fully covering (coverage 1.0) [metric:land_use_coverage_ratio].

### 9.2 Building Scale

13 conceptual building footprints across the three cores, total footprint ≈ 718k m² (6.3% of the overall area) [metric:building_footprint_ratio]. Types include AI R&D, labs, incubators, cultural halls, education, community services, retail, and mobility hubs [data:geometry/buildings.geojson]. FAR, height, density and other regulatory controls are missing and listed as pending [metric:floor_area_ratio].

### 9.3 Phasing

- **Phase 1**: Origin Community and Dazhongsi start first (linking existing urban regeneration for rapid results) [data:geometry/phasing.geojson#PHASE-001];
- **Phase 2**: Zhongzhiyuan full-stack autonomous acceleration area [data:geometry/phasing.geojson#PHASE-002];
- **Phase 3**: greenbelt full connectivity and long-term governance [data:geometry/phasing.geojson#PHASE-003].

## 10. Transport, Rail, Municipal Infrastructure, and Public Services — AI Track Spine and Blue-Green Space

### 10.1 Mobility Strategy

- North-south AI Track spine (greenbelt walking + innovation service corridor) [data:geometry/roads.geojson#ROAD-001];
- Three transverse connector roads linking the cores with east-west sides [data:geometry/roads.geojson#ROAD-002] [data:geometry/roads.geojson#ROAD-003];
- Blue-green mobility loop (cycling + walking) [data:geometry/roads.geojson#ROAD-004];
- Transit station transfer and Dazhongsi mobility hub [data:geometry/buildings.geojson#BLDG-011].

### 10.2 Blue-Green Space

Greenbelt spine + three-core pocket parks + Xiaoyuehe green corridor form the blue-green network [data:geometry/green_space.geojson#GREEN-001]. Existing rail/heritage control band [data:geometry/constraints.geojson#CONSTRAINTS-002] and Xiaoyuehe water blue line [data:geometry/constraints.geojson#CONSTRAINTS-003] are respected as constraints.

## 11. Metrics, Area Recalculation, and Compliance Matrix

Full indicators in `metrics.json`; compliance mapping in `compliance_matrix.json`. Key indicators: overall design area 11.41 km² [metric:site_area_sqm]; 3 key areas [metric:key_area_count]; green ratio 47.2% [metric:green_ratio]; public-space ratio 6.5% [metric:public_space_ratio]; AI industry land ratio 25.6% [metric:ai_industry_land_ratio]; 10 scenario cards [metric:scenario_card_count]; 5 personas [metric:persona_count]; 3 landmarks [metric:landmark_count]; 6 case studies [metric:case_study_count].

![Metrics Evidence](assets/figures/metrics-evidence.en.png)

## 12. Risks, Copyright, and Compliance

- All data derives from public or registered provisional sources; no fabricated official conclusions [source:ALLOWED-DESIGN-SPACE];
- Provisional-boundary precision limits are disclosed in the text and `assumptions.json`; recalculation required after official data release;
- Missing regulatory controls, road redlines, ownership, utilities, and heritage conditions are pending confirmation [assumption:A-CONTROLS-001];
- This proposal claims no official approval, approved regulatory plan, final ownership, or guaranteed implementation;
- All figures are AI-agent-generated originals with no third-party font/icon copyright risk; see `report/copyright_statement.md`.

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- brief/site-package/geometry/provisional_boundaries.geojson
- Full machine index: sources.json, metrics.json, compliance_matrix.json, standard_matrix.json, design_depth_matrix.json
