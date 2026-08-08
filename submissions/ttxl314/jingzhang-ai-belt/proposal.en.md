---
title: "New Civilization on Rails: A Three-Time-Line Urban Operating System —— Centennial Jing-Zhang AI Innovation Belt Urban Design Scheme"
author_github: "ttxl314"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With the overall concept of \"RAIL+ New Civilization,\" the century-old Jing-Zhang Railway, four decades of Zhongguancun, and the new era of AI are organized into a perceivable urban operating system: one belt, three cores, dual wings, five nodes, and a blue-green slow travel composite loop. The RAIL+ naming and visual system, seven AI Innovation Ecosystem mechanisms, 12 scene cards, six user profiles, five pilgrimage landmarks, a series of ten Guanjou Memory Bridges (including the Hailai River seven-arch steel truss bridge and the Jing-Zhang typical Y-shaped bridge, etc.), three-line cultural narratives, and an annual activity operation loop are proposed. All spatial suggestions are conceptual plans for professional teams to deepen their research."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "enterprise-service-copilot", "robot-delivery-low-speed"]
iteration: "v1.0"
---

# New Civilization on Rails: A Three-Time-Line Urban Operating System —— Centennial Jing-Zhang AI Innovation Belt Urban Design Scheme

> One hundred years ago, Zhan Tianyou drew the first autonomous railway line among the towering mountains and hills; forty years ago, the first line of commercial code in Zhongguancun altered the trajectory of an entire country's industrial landscape; today, this track line named 'Jing-Zhang' is to be trained into the world's first AI-driven urban neural backbone.
>
> This proposal is **conceptual, forward-looking, and open to discussion**. All spatial design recommendations are presented as **conceptual suggestions** and **reference plans**, intended for further in-depth research by professional teams. This does not replace formal planning nor constitute the government's review conclusion [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. (Urban Design) (Conceptual Recommendation)

## Design Basis and Source List

This formal proposal is based primarily on the qualification pre-review announcement issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources for the Centennial Jing-Zhang AI Innovation Belt Urban Design International Scheme Competition [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], and it fully reads the structured task book maintained by the maintainer in the `brief/site-package/`: `design_brief.json` (three layers of scope, three key areas, design tasks, and coordinate system policies), `agent_taskbook.json` (three positioning, five functions, Three Zones and Two Wings, six intelligent body tasks, and ten co-creation principles), `allowed_design_space.json` (editable layers and prohibited claims), `sources.json`, `enums/`, `ranges/planning_limits.json` (official area values and pending confirmed planning limits) and `schemas/` (validation structure) [source:SITE-PACKAGE] [standard:MOHURD-CONTROL-DETAILED-PLANNING].

Public data boundaries are to be executed according to the `data/source_registry.json` registration table [source:SOURCE-REGISTRY]: formal conclusions are only drawn from officially available sources; background and provisional materials can only support discussions and generation but cannot be upgraded to Official Planning Boundaries, statutory control plans, or government commitments. The `brief/public-brief.md` public task brief and `brief/README.md` data boundary description are to be included as foundational public materials for this project, based on the task and boundary. (Official Planning Boundary) `data/processed/agent_fact_pack.md` and `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, and `missing_data_checklist.csv` are navigation layers that help the agent organize tasks and gaps, with the main text still referencing the original source_id [source:PROCESSED-FACT-PACK].

**Boundary Status Statement**: The official precise planning boundary has not yet been released for three key areas, and the polygon. This plan uses the temporary rough boundary (`PROV-SITE-001` and `PROV-KEY-001/002/003`) generated from `brief/site-package/geometry/provisional_boundaries.geojson` for geometry and metrics [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]. These are all marked as `geometry_role="provisional_constraint"`, `official_boundary=false`, and `boundary_precision="provisional_rough"`, and are only for the purpose of plan generation, self-check, display, and design discussion. They shall not be used as the Official Planning Boundary, approval basis, or for precise area recalculation. After the official polygon is released, the package must recalculate the `geometry/*.geojson` and `metrics.json` in their entirety. This organizational data gap should not block content scoring [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm].

**Standard References**: This plan responds to the *Urban Design Management Measures* (Regulatory Detailed Planning of architectural layout, Public Space, and Urban Character) [standard:MOHURD-URBAN-DESIGN-MEASURES], the *Regulations on the Preparation and Approval of Urban and Town Control Detailed Planning* (Differentiating known control conditions, design recommendations, and pending confirmations) [standard:MOHURD-CONTROL-DETAILED-PLANNING], the *Guidelines for the Classification of Land Use and Sea Area Use in Territorial Space Investigation, Planning, and Control* (Land use codes are verifiable) [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], and references the *Regulations on the Depth of Architectural Engineering Design Documents (2016 Edition)* for depth reference — this standard `reference_fetch_status=missing_source_url` is only recorded as pending documentation and is not considered a satisfied authoritative reference [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

This plan corresponds to `sources.json` (7 sources), `assumptions.json` (5 assumptions), `compliance_matrix.json` (23 task responses), `standard_matrix.json` (6 standard responses), and `design_depth_matrix.json` (15 depth items).

![Evidence Chain and Relationship Diagram with Submission Package](assets/figures/site-overview.png)

## Three-Level Scope Framework

The plan is organized according to the three-level scope determined by the announcement [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]:

| Level | Scope and Area | Work Objectives | Design Depth | Outcome Expression |
| --- | --- | --- | --- | --- |
| Coordinated Research Area | Approximately 43.6 km² (North Fifth Ring Road—West Straight Street—Jingzhang Expressway—Wanquan River Road) | AI industry ecosystem, future city form, Three Zones and Two Wings coordination, brand and narrative | Strategic and Industrial Research | Industrial ecosystem, naming system, cultural narrative, activity system |
| Overall Design Area | Approximately 11.4 km² (1-2 km urban area surrounding the site park) | Urban Renewal Overall Framework, Land Use and Appearance, Transportation and Utilities, Vitality Corridors | Master Plan Depth Urban Design | land_use / buildings / roads / green / public / phasing layers |
| Key-Area Detailed Design Area | Approximately 368.4 hectares (Zhongzhiyuan 192.1 ha, AI Origin Community 104.3 ha, Dazhongsi 72.0 ha) | Detailed design of functional, architectural, Public Space, transportation, and AI scenarios for three areas | Depth of Integrated Planning Implementation Plan | key_areas layer + separate small plans for each area |

Three-tier logic of propagation: The strategic layer addresses "What is this belt, who does it serve, and why is it globally renowned?"; the overall layer grounds the answers in "What to update, how to layout, and what to support with"; the key layer validates "How can specific parcels and scenarios be combined for implementation." This plan completes the full division of 24 conceptual map patches within [data:geometry/site_boundary.geojson#SITE-001] (covering an area of [metric:land_use_cover_sqm], with a coverage rate of 100%, no overlaps, [metric:land_use_coverage]), with all design layers derived from the same boundary to ensure topological consistency [depth:land_use_layout].

Area values for the official site (43.6 km² / 11.4 km² / 368.4 ha and the three key areas) come from the announcement text [metric:key_area_count] [metric:key_area_zhongzhiyuan_area_sqm] [metric:key_area_origin_area_sqm] [metric:key_area_dazhongsi_area_sqm], and are within an acceptable tolerance of the provisional geometric recalculated values; they must be recalculated after precise redlining is completed. The spatial depth item [depth:overall_spatial_structure] constrains the overall structural expression, while [depth:three_key_area_detailed_design] constrains the depth of the key areas.

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Overall Concept: RAIL+ (Railway Plus)

**Concept**: Define the "Jing-Zhang AI Innovation Belt" as a city operating system running on physical tracks—`Railway as an Operating System`. A century ago, railways transported people and goods; today, this belt will transport data, models, talent, and civilizational consensus. Three timelines overlap in the same geographic space: **Track Line** (Jian Tianhou's autonomous railway in 1905), **Innovation Line** (Zhongguancun Electronic Street in the 1980s), and **Code Line** (the AI era). The intersection is the "New Civilizational Track."

**Main Name**: Centennial Jing-Zhang AI Innovation Belt (project formal name); **Brand Name**: RAIL+ (read as "Rail Plus," connoting the first letters of rail/track and AI, with the suffix «+» expressing openness and overlay: industry+, scenario+, community+, global+); **English Full Name**: Centennial Jing-Zhang AI Innovation Belt · RAIL+ Beijing [source:AGENT-TASKBOOK] [depth:overall_spatial_structure].

**Naming System** (extendable, registrable trademark, avoid confusion with existing park names [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]):

- Three thematic belts: **Heritage Belt** (RAIL+Heritage), **Living Belt** (RAIL+Life), and **Innovation Belt** (RAIL+Inno). (Jing-Zhang)
- Three core areas: **Zhongzhiyuan = BrainNode** (full-stack self-innovative autonomy), **AI Origin Community = OriginNode** (innovation ecosystem origin), **Dazhongsi = PendulumNode** (city's 'pendulum' for new intelligent native business models).
- Two Wings: **Zhongguancun Technology Services Wing**, **Xiaoyue River Scenario Enablement Wing**;
- Five portal nodes: Qinghe Portal, Wudao Kou Rail Transit Transfer, Yuan Dian Square, Zhongzhiyuan Innovation Plaza, Dazhongsi Intelligent Life Plaza;
- Bridge Series: **RAIL+Bridge (Bridge Series)** (street-crossing themed pedestrian bridges named after "Train No. ××");
- Activities and Product Branding: **RAIL+Fest** (annual conference), **RAIL+Dev** (developer week), **RAIL+Pilgrimage** (AI pilgrimage route), **Rail Pass** (pilgrimage passport).

**Logo and Visual Identity Direction** (Concept Proposal, all copyright materials are self-originated, no third-party trademarks or fonts are referenced): dual parallel tracks + central ascending node, the graphic reads as both '∞' (infinity) and '01' (binary), with the track nodes representing the starting point of numbers; Chinese text uses an original sans-serif script 'Railway New Civilization' on the tracks, and the English text is RAIL+. Visual norm three-color system: **Ballast Gray** (#4A4A46, history and tracks), **ZPark Blue** (#0057B8, innovation and rationality), **Academy Red** (#C8102E, vitality and humanities); the auxiliary graphical language is 'track lines' — all signage, paving, bridge structures, and interfaces are expressed with parallel lines and nodes [agent.1 response, see compliance_matrix.json].

**Three Key Positions × Five Major Functions × Synergistic Loop of Three Zones and Two Wings**: The three key positions (Centennial Jing-Zhang Cultural Belt, Urban AI Life Experience Belt, AI Integration Innovation Belt) are not merely parallel decorations, but rather three layers of the same space—Cultural Belt as the 'foundation' (cultural heritage and Public Space), Life Belt as the 'experience layer' (scenarios and consumption), and Innovation Belt as the 'energy layer' (industry and elements). The five major functions (Full-Stack Independent AI Innovation System, World-Class AI Innovation Ecosystem, AI-Enabled Scenario Empowerment New Paradigm, Intelligent AI Vibrant City, AI Governance Global Discourse Power) form a closed loop through the 'three zones and two wings': Origin community produces innovation (Origin→), Zhongzhiyuan accelerates transformation (→Brain), Dazhongsi receives business operations (→Pendulum), the Zhongguancun wing configures elements (capital, services, IP), and Xiaoyuehe wing provides scenarios (testing, experience, data) [agent.1] [agent.2].

### Global AI Innovation Ecosystem Case Studies and Haidian Transformation Mechanism (agent.2 Core Response)

This plan studies 7 global AI Innovation Ecosystem cases, extracting experiences that can be converted into spatial, operational, and scenario mechanisms [source:AGENT-TASKBOOK]:

| # | Case | Key Mechanism | Transformation for Haidian |
| --- | --- | --- | --- |
| 1 | Silicon Valley (Stanford—Sand Hill Road Capital Corridor) | University Spur—Alumni Network—Venture Capital Loop | Strengthen the 'university—angel investment alliance—alumni association' in-place loop, and layout angel investment street corners in the original community |
| 2 | One-North Singapore | Biomedical//Media Tri-Cluster + Shared Labs | Zhongzhiyuan Organizes a Full-Stack Autonomous Innovation Cluster with 'Large Installations + Shared Labs + Standard Bases' |
| 3 | King's Cross in London, UK | Railway Heritage Area Revitalization: Preserving the Railway Fabric, Integrating Tech Office Spaces and Public Spaces | Jing-Zhang Heritage Park Update: Direct Benchmark for Railway Heritage Sites as Assets Rather Than Burdens |
| 4 | Tel Aviv, Israel | Talent Density and Startup Density Mutual Support, Military Service Network | 'Talent Zone' Policy Experiment: Visa Facilitation, Youth Apartments, Global Developer Hub |
| 5 | French Paris Station F | Largest Global Startup Campus + Event Operations (Demo Day, Mentorship) | Dazhongsi "Intelligent Native New Business Model" Operation Mechanism: Permanent Demo Day and Incubator |
| 6 | China Hangzhou Future Science City/Zhijiang Laboratory | Large Science Facilities + Scenario Access List | Zhongzhiyuan Scenario Access Mechanism: Provide a sandbox of real-scenario data for model testing. |
| 7 | China Shenzhen Huatou Deep-Guangdong Hong Kong Innovation and Technology Cooperation Zone | Cross-Border Factor Allocation and Rule Alignment | Zhongguancun Technology Services Wing's 'Global Factor Allocation' Mechanism: International Rule Sandbox |

**Haidian Innovation Ecosystem Map** (Concept): University and research institution innovation (Peking University, Tsinghua University, North University of China, University of Science and Technology of China, Chinese Academy of Sciences system) → Open-source community and model layer → Zhongzhiyuan full-stack independent innovation (computing power, algorithms, data, standards, security) → Dazhongsi business model adaptation (intelligent bodies, intelligent terminals, content consumption, data elements) → Zhongguancun wing capital and technology services (venture capital, patents, legal, transactions) → Xiaoyuehe wing scenario validation (testing, experience, public services) → Global promotion (events, pilgrimage, talent return). The mechanism covers eight elements: land, space, industry, capital, talent, computing power, data, and scenarios [agent.2]. All enterprise lists, investment amounts, and output values are case study references and not Haidian commitments, and do not constitute investment and policy facts [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Future Urban Form Research

AI will transform work (distributed creation), life (on-demand services), learning (lifelong smart adaptation), transportation (shared autonomous driving), and governance (human-machine collaborative decision-making). This plan operationalizes these transformations into locatable spatial actions: **innovative work** is anchored in Zhongzhiyuan and the original point community district; **on-demand life** is anchored in the Dazhongsi intelligent original consumption district and community service stations; **smart adaptation learning** is anchored in the Jing-Zhang study and travel path and university open classrooms; **AI transportation** is anchored in the smart rail shuttle test corridor; and **human-machine collaborative governance** is anchored in the city agent government service hall. The spatial evidence for industrial strategic judgments can be found in [data:geometry/land_use.geojson#LU-001], [data:geometry/public_space.geojson#PUBLIC-000], and [depth:overall_spatial_structure]; these strategies are ultimately realized through land use, Public Space, traffic and pedestrian systems, AI scenario nodes, indicators, and drawings. (Urban Agent)

### Regional Synergy and Element Linkage (agent.2 Extended Response)

This scheme embeds the one belt within the AI innovation network of the Beijing-Tianjin-Hebei region, forming a division of labor (concept): "Haidian defines the scenario, collaborative areas provide elements, and the Beijing-Tianjin-Hebei region serves as the hinterland." Specifically, **Future Science City** provides energy and advanced manufacturing elements, **Huairou Science City** provides basic research and large scientific facilities, **Binhai Economic-Technological Development Area** () takes on intelligent manufacturing equipment and mid-trial production, and the **Beijing-Tianjin-Hebei hinterland** provides application scenarios and industrial support. Collaborative mechanisms (concept): cross-regional allocation of computing power (Haidian's computing network and Huairou's supercomputer interconnect), joint list of data elements "one region publishes, multiple regions reuse," cross-regional sharing of scenario openness lists (test sites and sandbox mutual recognition), and linkage of youth talent commuting and talent apartments. The content of regional collaboration is a Conceptual Recommendation and does not constitute a cross-regional planning, investment, or policy commitment [source:AGENT-TASKBOOK] [agent.2]. (Scenario Access)

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Spatial Structure: One Belt, Three Cores, Dual Wings, Five Nodes, and a Blue-Green Slow-Travel Composite Ring

Overall Design Area (approximately 11.4 km²) adopts the structure of "one belt, three cores, two wings, five nodes, and a blue-green slow travel composite loop" [depth:overall_spatial_structure]:

- **One Belt:** Jing-Zhang Pedestrian Innovation Main Corridor (ROAD-001, conceptual length approximately 9.6 km [metric:corridor_pedestrian_length_m]), running north-south through the site park and connecting all core scenes.
- **Three Cores**: Zhongzhiyuan Brain Core, AI Origin Community Core, Dazhongsi Pendulum Core (see detailed design for key areas chapter).
- **Wings**: West side Zhongguancun Technology Services Wing (knowledge services, capital, law), East side Xiaoyue River Scenario Enablement Wing (blue-green ecology, robot delivery, scenario testing);
- **Five Nodes**: Qinghe Gateway, Wodao Kou Rail Transit Transfer, Origin Square, Zhongzhiyuan Innovation Plaza, Dazhongsi Intelligent Living Plaza;
- **Bridge Series**: 10 conceptual pedestrian bridges (RAIL+Bridge Series: Bridge Spectrum of Bridge Memory along the Viaduct) to stitch the highway discontinuities and connect the eastern and western park areas (see the "Railway Bridge Series" section) [metric:bridge_count];
- **Blue-Green Slow-Travel Composite Loop**: Jing-Zhang Green Corridor (GREEN-001/002/003) + Xiao Yuehe Blue Ribbon (GREEN-004) + College Area Pocket Park (GREEN-005) + Origin Green Heart (GREEN-006) are overlaid with the slow travel loop to form a Public Space network that is "walkable, sittable, and playworthy" [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-000].

### Urban Renewal Overall Framework

The update logic follows the three principles of **Preserve the Cultural Thread, Activate the Existing Stock, and Insert New Growth** [depth:existing_conditions_diagnosis]:
Preserve the Cultural Thread—preserving the railway site, the old Tsinghua Garden station site, the academic boundary texture, and the old community layout as immovable assets [data:geometry/constraints.geojson#CON-001];
Activate the Existing Stock—rehabilitating and repurposing old buildings and underperforming industrial parks as the main approach, with functional transformations for innovative services and talent housing [data:geometry/buildings.geojson#BLDG-001];
Insert New Growth—concentrating new construction along the nodes of research and innovation land use, with a focus on updating the existing stock, combining new construction with rehabilitation, and controlling the scale of individual developments. The Building Footprint concept area covers approximately 142.5 million m² (occupying 12.5% of the area, [metric:building_footprint_area_sqm]), with the Demolish–Renovate–Retain Strategy categorized by conceptual indication [depth:retain_renovate_demolish]. The specific conclusions for each plot must be based on the current surveying, ownership, and official detailed planning conditions. This plan does not make any plot-level Demolish–Renovate–Retain conclusions [standard:MOHURD-CONTROL-DETAILED-PLANNING].

### Functional Layout and Industrial Proportions (Concept)

24 concepts are categorized into three types of concept land use codes [data:geometry/land_use.geojson#LU-001] [metric:land_use_parcel_count]: AI R&D and Innovation Land Use (Zhongzhiyuan, Origin Community, and Jing-Zhang Innovation Corridor,  category), Research and Education and University Synergy Land Use ( category), and Life Service and Urban-Rural Integration Land Use ( category) — the Dazhongsi area concept land use mainly focuses on research, community services, and corridor integrated land use. The land use code for intelligent native commercial and service functions will be determined by the professional team during the detailed planning phase. The land use code follows the expression logic of the "Guidelines for the Classification of Land and Sea Use in Land Space Investigation, Planning, and Control" [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The proportion of industrial functions is based on the actual measurement of the concept land use code: AI R&D and Innovation and Corridor Integrated ( category) at approximately 45%, Life Service and Urban-Rural Integration ( category) at approximately 28%, and Research and Education ( category) at approximately 27%, which are all concept target values, serving as a reference for the professional team to deepen the planning, but do not constitute planning indicators.

### Statement of Control and Regulation Depth Conditions

The Floor Area Ratio, Building Height, Building Coverage Ratio, Green Space Ratio, and setback distances, which are control conditions listed as `missing` in the official control plan `planning_limits.json`, are not inferred or fabricated in this scheme [source:SITE-PACKAGE]. All intensity classifications in the proposal are expressed as "Conceptual Density Indications" (such as Building Footprint ratios, block scale, height-to-volume massing character [depth:height_massing_character]), and include as confirmed conditions `assumptions.json`(A-CONTROLS-001) And `design_depth_matrix.json` The [depth:development_intensity_controls] Section. **No strength of conclusion in the main text shall be understood as approved zoning plan**.

## Detailed Design of Key Areas

Three key areas will undergo conceptually detailed design based on provisional boundaries, achieving a depth of understanding for the 'location + spatial structure + building renewal + traffic slow zones + Public Space + AI scenarios + implementation risks' seven elements [depth:three_key_area_detailed_design] [source:KEY-AREA-SOURCE] [data:geometry/key_areas.geojson#PROV-KEY-001].

### Zhongzhiyuan AI Independent Innovation Acceleration Area (BrainNode, approximately 192.1 ha)

- **Location**: Full-Stack Independent AI Innovation System and AI Governance as a Global Discourse Carrier: The Complete Chain of Computational Power—Algorithms—Data—Standards—Security—Industrial Display [agent.2].
- **Spatial Structure**: With the Jing-Zhang Corridor as the spine, the west side is laid out with large-scale installations and clusters of shared laboratories, while the east side is laid out with innovation enterprise parks; a Innovation Plaza (PUBLIC-002) is situated at the northern end [data:geometry/public_space.geojson#PUBLIC-002], connecting to Qinghe Gateway.
- **Building Update**: Conceptually focused on "renovating existing buildings + minimal new test facilities", the building cluster is organized along Innovation Avenue (ROAD-007/008) [data:geometry/buildings.geojson#BLDG-022]; the educational and research land use buildings are retained (action_class=retain) [depth:retain_renovate_demolish].
- **Traffic Slow Zone**: Smart Track Shuttle Pilot Section + Jing-Zhang Corridor Pedestrian Path; 'Badaling Arch' Memorial Bridge (BRIDGE-005) spans the corridor connecting the east and west garden areas; 'Huailai River No. 7' Seven-Arch Steel Truss Pedestrian Bridge (BRIDGE-009) spans the street corridor over North Fourth Ring Road/Concept Jing-Zhang High-Speed Railway Alignment, stitching the garden area with the northern city district; it connects with the 13th Line and Changping Line Extension Track Stations (Concept Node CON-005) [data:geometry/roads.geojson#BRIDGE-005].
- **Public Space**: Zhongzhiyuan Innovation Plaza, Honor Wall Memorial Square (PUBLIC-006) and Qinghe Blue-Green Belt [data:geometry/green_space.geojson#GREEN-001].
- **AI Scenario**: Shared Lab Open Day, Model Evaluation Competition, Safety Governance Sandbox (SC-09 related).
- **Implementation Risks**: The location of large-scale facilities and their energy/calculation load requirements need professional calculations and are currently listed as pending confirmation [depth:risk_missing_data].

### Beijing AI Origin Community (AI Origin, approximately 104.3 ha)

- **Location**: The "origin" of a World-Class AI Innovation Ecosystem: On-campus Innovation, Result Incubation and Conversion, Open Source Framework, and Talent Special Zone [agent.2].
- **Spatial Structure**: With the Original Square (PUBLIC-001) as the heart, connect the site of the Former Tsinghua Garden Railway Station (CON-001 Cultural Heritage Concept Point), the Open Source Achievements Display Corridor, and the Developer's Welcome Station; the pedestrian connection between the campus and the park forms the backbone [data:geometry/public_space.geojson#PUBLIC-001].
- **Building Update**: Conceptual retention of the old community for railway workers and the campus texture, transforming inefficient buildings into incubators and youth apartments, with minimal new construction of a release center [data:geometry/buildings.geojson#BLDG-031].
- **Traffic Slow Zones**: The original point community's east-west slow zone (ROAD-004) aligns perpendicularly with the corridor, while the 'Guan Gou Echo' site memorial bridge (BRIDGE-004) spans the corridor to connect the east and west areas. The 'Qing Long Bridge · Zigzag' hub memorial bridge (BRIDGE-010) integrates in a zigzag formation mid-way along the corridor, merging into the original point square. The Wudaokou station (CON-004) integrates [data:geometry/roads.geojson#BRIDGE-004] [data:geometry/roads.geojson#BRIDGE-010].
- **Public Space**: Origin Square and Release Square, Origin Green Heart Park (GREEN-006) [data:geometry/green_space.geojson#GREEN-006].
- **AI Scenarios**: Urban Agent Government Service Hall (SC-06), Global Developer Hub (SC-12), Open Source Night.
- **Implementation Risks**: Strict controls are in place for the conservation area, and any new structures (including bridge elements) must undergo review for cultural relics and aesthetic integrity. The conceptual location may be adjusted [agent.4 Boundary Clause].

### Dazhongsi AI Industry Cluster (PendulumNode, approximately 72.0 ha)

- **Location**: Smart Nativized New Business Models Anchoring Core: The "Urban Pendulum" of intelligent entities, smart terminals, content consumption, data elements, and digital assets [agent.2].
- **Spatial Structure**: Centered around the Intelligent Life Plaza (PUBLIC-003), the commercial interface unfolds along the southern segment corridor; the integration of Dazhongsi Station (CON-006) with pedestrian connectivity through the four quadrants at the intersection is a key action [data:geometry/public_space.geojson#PUBLIC-003].
- **Building Update**: The concept focuses on façade and functional renovation, incorporating an intelligent native consumption street (SC-03), while preserving commercial volume and not adding large-scale new construction [data:geometry/buildings.geojson#BLDG-012].
- **Traffic Slow Zone**: The South Segment Connecting Road (ROAD-002) connects with the corridor, and the Dazhongsi Bridge (BRIDGE-003) stitches the commercial district with the station area, forming a pedestrian network for station-city integration [data:geometry/roads.geojson#BRIDGE-003].
- **Public Space**: Smart Life Plaza, Planned Green Space Composite Utilization (GREEN-003 South Segment).
- **AI Scenarios**: Intelligent Agent Concierge, Data Element Circulation Test Node (SC-09), Digital Asset Showcase.
- **Implementation Risks**: The alignment between commercial renewal and subway construction schedules is high, and close coordination with the operating authority of Line 12 of the metro is required.

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### Six User Archetypes (agent.3 Core Response)

| ID | Profile | Needs | Corresponding Spaces and Scenarios |
| --- | --- | --- | --- |
| P1 | Open Source Developers (25-40 years, global) | Low-cost Entry, Community Belonging, Results Display, Computational Power Support | Developer Hub, GitWall, RAIL+Dev |
| P2 | AI Scientists/Researchers (Academic Institutions) | Large Facilities, Data, Peer Exchange | Shared Lab, Zhongzhiyuan, AI Milestone Pathway |
| P3 | AI Entrepreneurs/Managerial Leaders | Financing, Talent, Scenario, Policy Certainty | Angel Investment Alley, Demo Day, Scenario Access Platform |
| P4 | University Students (from , , Peking University, Tsinghua University, etc.) | Internships, Competitions, Low-Cost Living | Study-Travel Pathways, Public Classes, Student Dormitories |
| P5 | Original Residents and Railway Worker Families | Convenience of Life, Cultural Memory, Employment | Community Service Station, Centennial Railway Memory Museum, Updated Employment Opportunities |
| P6 | International Visitors/AI Pilgrims | Guiding, Experiencing, Commemorating, Exchanging | Rail Pass Passport, AI Pilgrimage Site, Bridge Series Check-in, International Promotion |

### 12 AI scene cards (agent.3 core response)

Each scene card includes: scene location, spatial placement, service target, operational data boundaries, privacy, and Human Review. The following is a readable summary card (number, theme, placement, and core mechanism, see visual/index.html scene chapter); service target, operational subject, and data boundaries, among other complete fields, will be expanded card-by-card with the detailed design of the scene during the deepening phase.

| ID | Scenario | Spatial Location | Type |
| --- | --- | --- | --- |
| SC-01 | Smart Health Street Corner (AI Initial Screening + Doctor Review) | Zhongzhiyuan South Side Community Strip | AI+Healthcare |
| SC-02 | Jing-Zhang Study Pathway (University AI Open Classroom) | North Segment of the Corridor—Campus Area | AI+Education |
| SC-03 | Dazhongsi Intelligent Native Consumption District (AI Body Sales Guide, Digital Asset Showcase) | Dazhongsi | AI+Commerce |
| SC-04 | **Jing-Zhang Smart Track Shuttle Pilot** (Low-Speed Autonomous Shuttle + Human Assurance) | ROAD-001 Middle Segment | **Testing and Validation** |
| SC-05 | Large Model City Tour 'Zhan Xiaoyou' | Full Lineway Sign Nodes and Bridge Structures | AI+Public Space |
| SC-06 | Urban Agent Government Service Hall (One-stop + Human Review Desk) | Original Community | AI+Governance |
| SC-07 | AI Legal Technology Street (Compliance Sandbox) | Zhongguancun Technology Services Wing | AI+Law |
| SC-08 | Open Source Results Showcase Corridor GitWall (Public Code Wall) | Section of Wudaokou | AI + Developers |
| SC-09 | **Data Element Circulation Experiment Node** (Privacy Computing Sandbox) | Dazhongsi | **Testing and Validation** |
| SC-10 | **Low-Speed Robot Delivery Test Lane** (Isolated Operation from Non-Motorized Lane) | Xiao Yuehe Wing | **Testing and Validation** |
| SC-11 | Jing-Zhang Centennial AR Revisit (Digital Twin Guided Tour) | Ruins Park Throughout and Bridge Structures | AI+Culture |
| SC-12 | Global Developer Hub (Talent Apartments + Co-Creation Space) | Origin Community | AI + Talent |

**Testing and Validation Scenario Compliance Statement**: SC-04/09/10 is a concept testing and validation scenario for the industry, which is to be tested only on closed or controlled road segments/sandbox environments. It requires the approval of the relevant authorities, third-party safety assessment, and human supervision. It must not be described as approved for operation [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. All scenarios adhere to privacy boundaries: no personal sensitive information is collected, visual data is anonymized, and all outputs retain Human Review and appeal channels [agent.3 Boundary Clause].

**Scenes—Spaces—Operational Mapping**: 12 scene cards mapped to 5 categories of layers (corridor nodes, key area blocks, community belts, wings, and station surroundings), with operational subject concepts divided into government platforms (governance category), state-owned asset operation companies (Public Space category), market-based entities (commercial category), and developer communities (open-source category), and configured with open access and exit mechanisms [agent.3].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

- **Land-Use Layout**: The 24 concepts are fully covered by map patches within the design boundary (100% coverage with no overlap, [metric:land_use_coverage]), with three categories of land use codes organized along both sides of the corridor: research and innovation to the west, living services to the east, education and research safeguarding the campus perimeter, and commercial service functions clustering around Dazhongsi (conceptual blocks primarily focused on research and community services, with the commercial service land use ratio to be determined in the detailed control plan phase) [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout].
- **Scale of the Building (Concept)**: Building Footprint 142.5 million m², representing 12.5% [metric:building_footprint_area_sqm] [metric:building_footprint_ratio]. Conceptual building blocks: 84 units ([metric:building_block_count]), with street block dimensions primarily ranging from 80-160 m (approximately one-third measure 160-180 m), overall conforming to the scale of TOD pedestrian districts. Building Height, Floor Area Ratio, density are pending confirmation items (A-CONTROLS-001) [depth:development_intensity_controls].
- **Dismantle-Renovate-Retain (Concept)**: Retain approximately 26% of the area for categories such as university research, cultural heritage, and the fabric of old communities; renovate approximately 27% of the area for categories such as functional replacement in inefficient buildings; and construct approximately 47% of the area for research and development innovation land nodes — as expressed by the area measured for each building cluster using the action_class field [data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish]. **This classification is a conceptual indication and does not constitute any conclusion regarding the dismantling, renovation, and retention of specific parcels**. Such determinations must be verified against the official control and detailed planning [standard:MOHURD-CONTROL-DETAILED-PLANNING]. (Demolish–Renovate–Retain Strategy)
- **Space Supply and Operations**: Innovative Space "Essential+Flexible": Dual-track supply of security-type (government platform holding 20%) and market-type spaces (80%), with flexible spaces convertible for meeting, exhibition, or testing purposes.

## Transport, Rail, Municipal Infrastructure, and Public Services

- **Micro-Circulation of Roads**: Conceptual Road Network = 1 Slow Travel Main Corridor (ROAD-001) + 7 East-West Connecting Roads (ROAD-002 to 008) + 10 Pedestrian Bridges (RAIL+Bridge: Memory Bridge Series of Gou Gou) [data:geometry/roads.geojson#ROAD-001] [metric:bridge_count], with a total line length of approximately 19.7 km [metric:road_centerline_length_m] (including about 3.0 km [metric:bridge_length_m] for the bridge series); all are conceptual line positions, not road red lines [depth:traffic_rail_slow_parking].
- **Transit-Station Integration** (Concept Node): Wudaokou (Line 13), Xitucheng/Zhi Chun Lu (Lines 10 and Changping Line South Extension), Dazhongsi (Line 12), Qinghe (Line 13 and Jing-Zhang High-Speed Rail) —— organized around the principles of "station-city integration and prioritizing last-mile pedestrian and cycling access" [data:geometry/constraints.geojson#CON-004].
- **Pedestrian Discontinuity Seams and Cross-Street Bridges**: With the corridor as the spine, the connecting paths are densified to cross the streets; cross-street themed bridge corridors (BRIDGE-001 'Academy Number', BRIDGE-002 'Xitucheng Number', BRIDGE-003 'Dazhongsi Number') cross the north-south arterial roads at pedestrian level, spanning Academy Road, Xitucheng Road, and Dazhongsi East Road, resewing the green corridors and blocks that are cut by the arterial roads, allowing pedestrians to experience an immersive "train passing through the street" perspective [data:geometry/roads.geojson#BRIDGE-001]; non-motorized vehicle parking is configured according to a 300 m radius around the station.
- **Municipal and New Infrastructure (Concept)**: Distributed energy (photovoltaic canopies, geothermal heat pump experiments), edge-side computational nodes (edge boxes deployed along corridors), integration of traditional municipal pipelines with digital twin networks; professional calculations for municipal capacity and energy load are pending confirmation (A-MUNI-001) [depth:municipal_new_infrastructure].
- **Public Service Facilities**: Tiered configuration including innovative service platforms (shared laboratories, pilot test bases), talent living services (waystations, youth apartments, childcare), and cultural public facilities (Railway Memory Museum, release center).

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

### Blue-green Public Space System (agent.4 Core Response)

- **Jing-Zhang Relic Park Vitality Belt**: The green corridor consists of three segments (GREEN-001 North Segment, GREEN-002 Middle Segment, GREEN-003 South Segment) with a combined green space area of approximately 8.9% (area [metric:green_space_area_sqm], patch count [metric:green_space_patch_count], green space ratio [metric:green_ratio]). The slow-moving activity belt (PUBLIC-000, area [metric:public_space_area_sqm], node count [metric:public_space_node_count]) is nested with the green spaces [data:geometry/green_space.geojson#GREEN-002] [data:geometry/public_space.geojson#PUBLIC-000].
- **Xia Yuehe Blue Ribbon** (GREEN-004): Ecological Restoration + Waterfront Path + Corridor for Testing Robot Delivery Paths;
- **Public Space Component Library** (Concept): Paving module (1.5 m sleeper module), signage components (track line graphic language), seating/shade/charging integrated furniture, mobile pavilions, and temporary test enclosures, forming a reusable 'RAIL+ Public Space Component Library' [agent.4].

### Universal Age-Friendly and Digital Inclusion (agent.4 Extended Response)

- **Accessibility and Age-Friendly Design** (Concept): All bridge systems are equipped with accessible ramps and elevators (including the HuaLa River Bridge and Academy Bridge), with the slope, clear width, handrails, and tactile paths conforming to the current accessibility design standards [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]; bench seats with handrails, signboards with large characters, and voice announcements, as well as park lighting, are designed according to the standards for nighttime pedestrian safety; the height of the bridge railings and fall prevention design are included in the professional refinement.
- **Closing the Digital Divide**: All AI scenarios adhere to the principle of "human service never missing" — the Urban Agent Government Service Hall (SC-06) retains Human Review stations and green channels, the Large Model Tour (SC-05) offers an alternative path with human explanations, the smart consumption district retains cash and offline payment channels, and the data element sandbox opens a "transparent review window" for public access.
- **Resident Engagement and Employment Transition**: Along the line, in older communities, establish "Track Living Rooms" as resident engagement points. Any updates to the project plan must be publicly disclosed and presented to residents for hearing. Rail workers' families will be given priority in obtaining transition training positions (such as AI operations, tour guide services, community management, and bridge maintenance), which are included in the human-centric indicators of the P1 pilot project package [agent.4].

### Rail Bridge Series: Gguigou Memory Bridge Spectrum (RAIL+Bridge, agent.4 Expanded Response)

**Design Concept**: The bridges are a spatial declaration of the 'Railway on New Civilizations' — themed around the 'Guan-Gou Memory Bridge Series', which re-enacts the typical bridge forms of the Jingtong Railway's Guan-Gou section (Nanshou to Badaling): the **Huilai River Seven-Arch Steel Truss Bridge** (the longest bridge on the entire Jingtong Railway, approximately 213 m long, with each arch about 30.5 m, built in 1908, later discontinued due to the rerouting of the Guanting Reservoir), the **Guan-Gou Stone Arch Bridge** (locally sourced materials, with a maximum span of about 12.2 m), the **Warren Truss Bridge** (the largest span of steel bridges on the entire line, approximately 33.5 m), the **Wide Flange I-Beam Bridge** (the standard form of most bridges on the entire line, with a span of about 6.1 m), and the **Qinglong Bridge 'Person' Shaped Return Line** (constructed in 1909). All are re-enactments of the forms, not engineering reproductions, allowing for a unique experience of 'walking on bridges in the park' along the route; bridges are no longer merely connecting elements but are living exhibits of railway culture and the carrier interface for AI scenarios [data:geometry/roads.geojson#BRIDGE-004] [agent.4]. (Jing-Zhang)

**Ten Conceptual Bridges (BRIDGE-001 to 010, Conceptual Total Length Approximately 3.0 km [metric:bridge_length_m]) —— Guan Gou Memory Bridge Spectrum Series Four Groups**

**A. Street Crossing Viaduct Group (4 structures, unified 'Train Through Street' language)**: The bridge structure is designed like a cross-section of a train carriage, with the underside retaining the image of trusses or steel beams. Platform viewing areas are set at the bridge heads, resembling train station platforms. Pedestrians can experience the perspective of watching the flow of traffic as if a train were passing overhead, re-sewing the green corridors and blocks that are severed by major roads in three dimensions:

| Bridge | Name | Location | Form and Experience |
| --- | --- | --- | --- |
| BRIDGE-001 | **College Road Viaduct** | Spanning College Road (Wudaokou Segment) | Victorian Steel Truss Imagery: Bridge Deck Preserves Truss Structure Outline, Bridge Head Platform with Scenic Viewing Platform, Integrating AI Guided Screens and Charging Seats |
| BRIDGE-002 | **West Tucheng Bridge Street Corridor Bridge** | Spanning West Tucheng Road | Wide I-beam Group Imagery: Bridge deck width of 6-9 m (conceptual), steel beams with a rhythmic pattern like train carriages, aligning with the concourse of Line 13 station |
| BRIDGE-003 | **Dazhongsi Numbered Overstreet Pedestrian Bridge** | Spanning Dazhongsi East Road | Truss+Swing Icon: The bridge body uses swing rhythm for lighting, connecting the commercial district with the station area, in response to the "Urban Swing" core |
| BRIDGE-009 | **Huilai River Bridge Overstreet Gallery Bridge** | Across North 4th Ring Road/Concept Line of Jing-Zhang High-Speed Railway | Re-presenting the Seven-Hole Steel Truss Bridge of Huilai River: The bridge deck's seven segments of truss rhythm correspond to the seven-span hundred-foot steel truss, a spatial tribute to the 'vanished first bridge of Jing-Zhang', the largest scale overstreet bridge in the lineage |

**B. Ruins Memorial Bridge Group (3 Bridges)**: Inspired by the arches of the Guan Gou section and the turnaround line, this group of bridges will serve as a cultural narrative and pilgrimage node.

| Bridge | Name | Location | Form and Experience |
| --- | --- | --- | --- |
| BRIDGE-004 | **Guan Gou Echoes Ruins Memorial Bridge** | Former Tsinghua Garden Station South Side Green Corridor | Reenact the Stone Arch Bridges of the Guan Gou Section: Arch Vault Shape + Tie Beam Paving, a Three-Dimensional Exhibit of Railway Memory |
| BRIDGE-005 | **Badaling Arch of Remembrance Bridge** | Zhongzhiyuan Green Corridor | Truss Beam Imagery: Bridge deck embedded model evaluation/open-source display screen, bike passage under the bridge |
| BRIDGE-010 | **Qinglong Bridge·Human-Railway Intersection Memorial Bridge** | Hub in the middle of the corridor (near the old site of the Huáquān Yuán station) | Hourglass Plan: The arms extend east and west from the arcade intersection, with the bridge surface inscribed with the history of the 1909 Qinglong Bridge turnaround line, serving as the three-dimensional intersection point for the red, blue, and gold line tour. |

**C. Park Connector Bridge Set (2 Bridges)**:

| Bridge | Name | Location | Form and Experience |
| --- | --- | --- | --- |
| BRIDGE-006 | **Timber Trestle Walkway·South** | Ruins Park South Segment | Low-profile Connecting Bridge, Wide Flange I-Beam + Timber Decking + Rail Handrail, Connecting the East and West Street Blocks of the Green Corridor |
| BRIDGE-007 | **Timber Walkway·North** | Ruins Park North Segment | As before, aligns with the visual connection to the Tramway Shuttle Test Section (SC-04) |

**D. Waterfront Bridge Group (1 Unit)**:

| Bridge | Name | Location | Form and Experience |
| --- | --- | --- | --- |
| BRIDGE-008 | **Little Moon River Bridge** | spans Little Moon River | waterfront I-beam bridge, shared corridor with a waterfront promenade and a robot delivery test path, with milestone plaques embedded in the bridge railing |

**Reserved Bridge Locations** (Phased Implementation, No New Bridge Structures): At the southern end, a reserved bridge location for the "Wu Gui Tou" imagery is left in Dazhongsi (between the arch bridge section of Guigou Valley and the tunnel connection segment). At the northern end, the Guigou arch bridge cluster imagery bridge location is reserved for the Qinghe Gateway—acting as an elastic node for professional deepening and Phased Implementation.

The relationship between bridges and systems: The street corridor bridges are the aerial segments of the "Developer's Walking Path," reconnecting the corridor in three dimensions that are severed by major roads [depth:traffic_rail_slow_parking]; memorial bridges and connection bridges are the three-dimensional nodes of the pilgrimage route and the blue-green network [depth:blue_green_public_space]; the bridge bodies also serve as the hardware carriers for AI-guided scenarios such as SC-05/SC-11 (e.g., guide screens, AR markers). The bridge locations, spans, structures, and designs are conceptual proposals and require professional bridge design, cultural heritage, and aesthetic review and approval for further development [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Five AI Sacred Sites and Honor Display System (agent.4 Core Response)

| ID | Landmark | Location | Function |
| --- | --- | --- | --- |
| L1 | **Agent Honor Wall** | Zhongzhiyuan North Segment (PUBLIC-006) | Memorial Inscription System: Agent Name, GitHub ID, Selected Proposal Name, Updated Annually |
| L2 | **Developer Promenade** | Jing-Zhang Corridor Throughout (Including the Bridge Section Above) | 9.6 km Walking Pilgrimage Path, With Ballast Inscriptions Recording Open Source Milestones |
| L3 | **Open Source Achievements Gallery GitWall** | Public-005 Segment (PUBLIC-005) | Public Code Wall: Visualize Contributions and Release Open Source Projects |
| L4 | **AI Milestone Walk** | Mid-Walkway | Mark the history of AI development with milestone nodes (models, standards, events) |
| L5 | **AI Origin Plaza** | AI Origin Community Center (PUBLIC-001) | 'AI Origin' Memorial Landmark + Launch Plaza |

Honor display system and project "Intelligent Entity Honor Wall, Artificial Intelligence Milestones, Open Source Achievement Nodes, Global Developer Honor Wall" commemorate narrative alignment [source:AGENT-TASKBOOK] [agent.4]; landmarks are conceptual proposals, and their locations, forms, and physical inscriptions are subject to professional refinement and approval, and do not constitute approved construction projects; avoid entertainment or influencer-style expressions [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Cultural Narrative: Confluence of Three Lines (agent.5 Core Response)

**Narrative Axis**: "Confluence of Three Lines, New Civilization on the Rails." The rail line — the independent spirit of Zhan Tianyou's "human" shaped track (1905-); the innovation line — the pioneering spirit of Zhongguancun evolving from a street of electronic goods to a global innovation hub (1980-); the code line — AI open-source collaboration reshaping urban civilization (2016-). These three lines are spatially represented by the Jing-Zhang Heritage Park, the Zhongguancun Technology Services Wing, and the AI Origin community, forming a "readable cultural narrative."

**Cultural Guiding Route** (Concept): Red Line (Centennial Railway Line: Qinghe—Old Site of Huaqiao University Station—Wudao Kou—Dazhongsi Ruins Narrative), Blue Line (Innovation Line: Zhongguancun Wing—Origin Community—Zhongzhiyuan), Gold Line (AI New Civilization Line: GitWall—Landmark Path—Honor Wall), with the three lines intersecting at the Origin Square; the bridge system is the three-dimensional intersection point of the guiding lines—cross-street corridor bridge serving as the "crossing street" segment between the Red Line and the Gold Line. The sign/identifier/symbol system adopts the RAIL+ track line graphic language, distinguishing hierarchical levels from the cultural identifier system (railway culture, Zhongguancun culture) without mixing [agent.5 Boundary Clause].

**International Communication Narrative** (Concept): "One Century of Rails, One New Civilization" (One century of rail tracks, one new civilization); communication assets: RAIL+ brand, Rail Pass passport, AI Pilgrimage Program, annual contributors list, bridge series stamping points (Rail Bridge Stamp) [agent.5].

## Renewal Projects, Implementation Policy, and Phasing

### 15 Concept Update Projects

| # | Project | Type | Phases | Dependent Conditions |
| --- | --- | --- | --- | --- |
| 1 | Jing-Zhang Site Park North Segment Unification | Public Space | P1 | On-site Verification, Cultural Heritage Review |
| 2 | Former Tsinghua Garden Railway Station Cultural Node | Cultural | P1 | Approved by Cultural Relics Department |
| 3 | Developers' Walkway South Segment (including the 'Guan Gou Echo' Memorial Bridge) | Public Space | P1 | Corridor Through Conditions, Review of Bridge Aesthetics |
| 4 | Origin Square and Publication Center | Public Space | P1 | Title Confirmation |
| 5 | AI Origin Community Talent Hub | Building Renovation | P1 | Renovation Feasibility |
| 6 | Open Source Results Display Corridor GitWall | Public Space | P2 | Digital Content Compliance |
| 7 | Zhongzhiyuan Innovation Plaza (Including the 'Badaling Arch' Memorial Bridge) | Public Space | P2 | Large Installation Site Selection |
| 8 | Smart Track Shuttle Pilot Segment | Traffic Testing | P2 | Permit and Safety Assessment |
| 9 | Dazhongsi Smart Living Plaza (Including the "Dazhongsi" Cross-Street Pedestrian Bridge) | Public Space | P2 | Track Construction Coordination, Cross-Street Bridge Approval |
| 10 | Xiaoyuehe Blue-Green Belt Restoration (Including Xiaoyuehe Bridge) | Ecological | P2 | River Blue Line Verification |
| 11 | Dazhongsi Smart Native Consumption Block Renovation | Building Renovation | P3 | Commercial Update Sequence |
| 12 | Zhongguancun Wing AI Legal Street | Industrial Space | P3 | Policy Pilot |
| 13 | Honor Wall Memorial Square | Cultural Memorial | P3 | Approval of Inscription Scheme |
| 14 | Integration of Wudaoku Station (Including the "Xueyuan Hao" Cross-Street Pedestrian Bridge) | Transportation | P3 | Subway Operation Coordination, Cross-Street Bridge Approval |
| 15 | Urban-wide Walking and Cycling Loop Integration (Including the "Xitucity" Footbridge and Trestle Walkway) | Walking and Cycling Network | P3 | Cross-Road Facility Coordination |

**Responsible Parties and Funding Matrix (Concept)**: The following is a conceptual division of responsibilities and investment scale range for reference only; it does not constitute an investment commitment. Specific details will be based on professional calculations, business attraction, and approval processes [source:AGENT-TASKBOOK] [depth:renewal_project_list]:

| # | Project | Initiating Entity (Concept) | Investment Entity (Concept) | Operating Entity (Concept) | Investment Scale (Concept) |
| --- | --- | --- | --- | --- | --- |
| 1 | Jing-Zhang Site Park Northern Segment Connectivity | Haidian District Government Platform | Government Special Project + Municipal Funds | State-Owned Asset Operation Company | 100-200 Million Yuan |
| 2 | Former Tsinghua Garden Railway Station Cultural Node | District Cultural and Tourism and Cultural Heritage Departments | Government Special Fund | Cultural Operation Institution | 0.5-1 Billion Yuan |
| 3 | Developers' Walk South Segment (including the 'Guan Gou Echo' Memorial Bridge) | Government Platform | Government + Urban Renewal Fund | State-owned Asset Operation Company | 1.5-3 Hundred Million Yuan |
| 4 | Origin Square and Launch Center | Government Platform | Government + Private Capital | State-owned Asset Operation Company | 20-40 Million Yuan |
| 5 | AI Origin Community Talent Hub | Government Platform | Government + Market | Professional Long-Term Rental Operations | 100-200 Million  |
| 6 | Open Source Results Exhibition Corridor GitWall | Developer Community + Open Source Platform | Government Subsidies + Corporate Sponsorship | Community Autonomy + Platform | 0.3-0.8 million yuan |
| 7 | Zhongzhiyuan Innovation Plaza (Including the 'Badaling Arch' Memorial Bridge) | Government Platform | Government + Science and Technology Fund | State-owned Asset Operation Company | 200-300 Million  |
| 8 | Smart Track Shuttle Pilot Segment | District Transportation Department | Government Pilot + Auto Manufacturer | Special Permit Operation + Human Support | 1-2 Hundred Million  |
| 9 | Dazhongsi Intelligent Living Plaza (Including the "Dazhongsi" Skybridge) | Government Platform | Government + Commercial Entity | Commercial Operation Company | 200-400 Million Yuan |
| 10 | Renovation of Xiao Yuehe Blue-Green Belt (Including Xiao Yuehe Bridge) | District Water and Landscape Departments | Government Special Fund | State-Owned Asset Operation Company | 100-200 Million Yuan |
| 11 | Dazhongsi Intelligent Native Consumption Street Transformation | Business Subject + District Government | Market-Oriented | Commercial Operation Company | 300-600 Million Yuan |
| 12 | Zhongguancun Wing AI Legal Street | Government Platform | Government + Legal Tech Enterprises | Industrial Operation Institution | 100-200 Million  |
| 13 | Honor Wall Memorial Square | Government Platform + Developer Community | Government + Open Source Fund | Community Self-Governance | 0.3-0.6 billion yuan |
| 14 | Renovation of Wudaochi Station (Including the 'Xueyuan Hao' Skybridge) | District Transportation Department + Metro Company | Metro + Government | Metro Commercial Operation | 300-500 Million  |
| 15 | Urban Renewal Ringline Integration (Including the "Xitucity" Bridge and Tie Beam Walkway) | Government Platform | Government + Urban Renewal Fund | State-owned Operation Company | 200-400 Million Yuan |

**Lead Project Package (P1 Seed, Concept)**: It is suggested that the first wave of the lead project consists of three projects: "Developer Walkway South Segment (including the Echo of Guan Gou Memorial Bridge) + Origin Square + AI Test Segment of Tram Integration." These three projects are intended to separately validate three types of mechanisms—Public Space, station-city integration, and AI test scenarios—forming a "replicable unit" that can be rolled out to P2/P3 phases [depth:phasing_implementation].

Corresponding to `geometry/phasing.geojson` three-phase conceptual zoning [data:geometry/phasing.geojson#PHASE-001] [metric:phasing_count] [depth:phasing_implementation]: **P1 Near-Term Activation Zone (2026-2028)** = Origin Community + Vitality Belt of the Ruins Park; **P2 Mid-Term Expansion Zone (2028-2031)** = Zhongzhiyuan + Through Corridor from North to South; **P3 Long-Term Integration Zone (2031-2035)** = New Dynamics of Dazhongsi + Overall Integration of the Wings. The phased zones are Conceptual Recommendations and not conclusions on development timelines; the phased layers currently correspond to the spatial boundaries of the three key areas (conceptual indication), while the boundaries between the wings and the rest of the areas will be defined by the professional team during the deepening phase. [depth:renewal_project_list].

### Global AI Innovation Ecosystem and Long-Term Operations (agent.6 Core Response)

**Annual Activity Framework (12 items, conceptual)**: RAIL+Fest Annual Conference (in August, coinciding with the release announcement to mark "August as the Jing-Zhang Month"), RAIL+Dev Developer Week (in May), AI Open Source Night (in January), Spring Hackathon in the Park (in April), Fall Demo Day (in October), Agent Competition Season (June-July), AI Pilgrimage Season (September-October), Annual Developer Honor Gala (in December), International AI Governance Forum (in November), Campus AI Open Course Season (March and September), Data Element Open Week (in July), Year-End Review Exhibition (in December).

**Developer Community Operations Mechanism**: Agent Credit contribution points (accumulated through open-source PRs, scenario testing, and review participation, which can be redeemed for computational power and space usage rights), Open Source Contributor Program (annual leaderboard), and Developer Ambassador Network (over 30 city nodes globally, concept). **Scenario Access Operations Mechanism**: Scenario Access Platform (data sandbox + test channel + admission evaluation + Human Review Committee), requiring certification for testing scenarios. **Public Experience and Landmark Operations**: Rail Pass passport stamping, app guided tours, annual unveiling ceremony for honor walls, and bridge series stamping (one 'bridge stamp' per bridge). **International Promotion and Conversion Mechanism**: activities → scenario trial use → enterprise residency → incubation acceleration → capital connection → policy access, forming a "pilgrimage—trial use—rooting" conversion funnel [agent.6].

All activities, recruitment, funding, policies, and operational arrangements are provided as **Conceptual Recommendation** and do not represent confirmed government activities or implementation arrangements [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Metrics, Area Recalculation, and Compliance Matrix

Core Metrics and Their Design Implications (See the Full 27 Metrics in `metrics.json` [metric:site_area_sqm]):

| Indicator | Value | Unit | Design Implication |
| --- | --- | --- | --- |
| site_area_sqm | 11,412,825 | m² | Overall Design Area Conceptual Area (provisional) |
| land_use_coverage | 1.0000 | Ratio | Completeness of Land Use Allocation: 24 Parcels Seamless and Non-Overlapping [depth:land_use_layout] |
| green_ratio | 0.0891 | ratio | concept green space ratio: designed with a 500 m walkable circle in mind (concept, accessibility analysis to be verified in the refinement stage) |
| public_space_ratio | 0.0211 | Ratio | Conceptual Public Space Ratio: The material carrier for innovative interactions and pilgrimage activities [metric:public_space_ratio] |
| building_footprint_area_sqm | 1,425,185 | m² | Conceptual Building Footprint: Indicative Upper Limit of Industrial Space Supply Scale |
| corridor_pedestrian_length_m | 9,557 | m | Jing-Zhang pedestrian corridor length: the "urban spine" connecting all core scenes |
| bridge_count | 10 | Seat | RAIL+ Concept Bridge (4-span Street + 3-memorial + 2-connection + 1-waterfront, replicating the typical Jing-Zhang Guan Gou bridge types) |
| bridge_length_m | 3,036 | m | The total bridge length (span and structure to be professionally refined) |
| key_area_count | 3 | | Three key areas (mandatory)[metric:key_area_count] |
| ai_scenario_card_count | 12 | pieces | Number of Scenario Cards (requirement ≥10, including 3 for testing and validation) [metric:ai_scenario_card_count] |
| ai_pilgrimage_landmark_count | 5 | instances | pilgrimage landmarks/honored display nodes (requirement ≥3) [metric:ai_pilgrimage_landmark_count] |
| user_persona_count | 6 | Type | User Persona (Requirement ≥ 5) [metric:user_persona_count] |
| renewal_project_count | 15 | | List of Conceptual Renewal Projects [metric:renewal_project_count] |
| annual_event_count | 12 | items | annual event system (concept) [metric:annual_event_count] |

Area recomputation shall be conducted under EPSG:4548 (see coordinate system policy in design_brief.json); the official polygon must be recomputed in its entirety after its release.

**Monitoring Mechanism (Concept)**: 27 core indicators are monitored in a three-tier system of "built—operational—annual" —**Built Monitoring** (measured at project acceptance, responsibility subject: implementing unit, data source: as-built survey and completion data), **Operational Monitoring** (annual operational data, responsibility subject: operating company, data source: scene platform and sandbox operation data), **Planning Recalculation** (re-calculated after the official polygon release, responsibility subject: professional team, data source: official planning documents). Monitoring results are publicly disclosed annually and serve as input for scheme iteration, activity scheduling, and selection for the next phase of pilot projects [depth:metrics_recalculation].

Compliance Coverage: `compliance_matrix.json` covers all 17 tasks of announcements 1.3.1-1.3.3, 1.4.1-1.4.3, and 1.5.1.1-1.5.3.3, as well as six tasks (out of 23, with each task providing a chapter, layer, indicator, drawing, HTML, and source evidence) for agent.1-agent.6 [depth:metrics_recalculation]; `standard_matrix.json` covers six professional standards; `design_depth_matrix.json` has all 15 depth items marked as `complete` (with three items containing pending confirmation conditions, which do not reduce the response's integrity).

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

- **Compliance with Documentation**: All design judgments are based on publicly available official documents, registered clear title documents, and provisional boundaries; no use has been made of, nor is any claim made to the use of, non-public planning documents, internal metrics, or personal data [source:SOURCE-REGISTRY].
- **Copyright Authorization**: This package includes text, charts, logo direction, and visual guidelines that are original creations by agent; references to standards and announcements are official public documents cited according to the prescribed source attribution; no third-party trademarks, fonts, images, or likenesses are referenced [source:AGENT-TASKBOOK]. For more details, see `report/copyright_statement.md`.
- **AI Generated Responsibility**: This proposal was generated by an AI agent, and the author is responsible for the facts, citations, copyright, and final expression; the generation method has been disclosed (agent.json).
- **No Commitments to Promises**: This plan does not contain any official approvals, implemented arrangements, investment timelines, or development sequence commitments; all "Pending Confirmation" items (planning indicators, municipal capacity, cultural heritage approvals, ownership, bridge structure engineering) are recorded in assumptions.json.
- **Professional Review Requirements**: The spatial geometry, area, Demolish–Renovate–Retain Strategy classification, traffic line positions, bridge body design, and operational activities require review by a professional planning and bridge team; a re-calculation will be conducted after the Official Boundary is released [depth:risk_missing_data].
- **Risk Matrix**: The eight-dimensional risks—data privacy, implementation complexity, public acceptance, operational costs, policy uncertainty, spatial disputes, technological maturity, and equity inclusiveness—are assessed on a scale of 1-5 (conceptually), as detailed in the Risk Description chapter appendix and visual/index.html.

## References

- Public Brief `brief/public-brief.md` (Draft Public Brief for the Centennial Jing-Zhang AI Innovation Belt) and Data Boundary Description `brief/README.md`
- Structured delivery of the open call (a subset of `brief/public-brief.md` for the Agent to directly read): `brief/site-package/design_brief.json` (three layers of scope, key areas, design tasks, coordinate system policies), `agent_taskbook.json` (three major positioning, five major functions, Three Zones and Two Wings, six tasks, co-creation principles), `allowed_design_space.json` (editable/locked layers, prohibited claims), `sources.json`, `enums/`, `ranges/planning_limits.json` (official areas and pending confirmation planning indicators), `standards/` (local snapshot of professional standards), `schemas/` (validation structure)
- Public Task Document Geometric Data (Same Public Nature as `brief/public-brief.md` and Its Boundary Description): `brief/site-package/geometry/provisional_boundaries.geojson` (provisional boundaries, used for generation and display before the official polygon is released)
- Public Documentation Registry and Navigation Layer (Publicity as per `brief/README.md` boundaries): `data/source_registry.json` (registry of documentation), `data/processed/agent_fact_pack.md` and the associated CSV files (navigation layer)
- Public repository instructions and structure files (publicly the same as `brief/README.md`): `docs/formal-submission-guide.md` (submission instructions), `templates/proposal.md`, `schemas/*.schema.json` (structure and validation), `tracks.json`, `scenarios/` (track and standard scenario registration)
- The package file list and hashes are found in `manifest.json`; area and metric recalculation evidence is found in [metric:site_area_sqm] and [data:geometry/site_boundary.geojson#SITE-001]; professional standard responses are found in [standard:MOHURD-CONTROL-DETAILED-PLANNING]; in-depth item evidence is found in [depth:metrics_recalculation] (based on publicly available materials, with the same level of transparency as `brief/public-brief.md`).
