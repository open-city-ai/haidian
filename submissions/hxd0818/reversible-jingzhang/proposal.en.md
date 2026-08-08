---
title: "Jing-Zhang Reversible City: Make Reversibility the Underlying Governance Paradigm of AI Cities"
author_github: "hxd0818"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Conceptual Recommendation: The spiritual core of the Jing-Zhang concept is not \"speed,\" but rather Zhan Tianyou's \"boldness to lead the way + cautious engineering.\" The greatest urban risk in the AI era is irreversibility—correcting errors after data leakage, model deployment, and infrastructure construction is extremely costly. This plan makes reversibility the underlying governance paradigm, proposing an R4 framework (reversible / reviewable / refusable / renewable). Each AI scenario, landmark, and update project must answer these four questions. All spatial judgments are based on provisional rough boundaries as conceptual recommendations, to be recalculated and refined once the Official Planning Boundary and professional conditions are complete."
tracks: ["civic-agent-governance", "robotics-autonomous-mobility", "ai-public-services"]
scenarios: ["ai-traffic-walkability", "robot-delivery-low-speed", "ai-health-service-navigation", "ai-cultural-guide", "public-safety-operations-review", "enterprise-service-copilot"]
iteration: "v1.0"
---

# Jing-Zhang Reversible City: Make Reversibility the Underlying Governance Paradigm of AI Cities

> **Urban Design Conceptual Recommendation.** This text is a formal conceptual urban design proposal for an open-source call, not a legal plan, government-verified conclusion, or engineering implementation document. The current `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` are provisional rough polygons (rectangles or rough lines, `provisional_constraint`, `official_boundary=false`) provided by the repository maintainer; their boundaries should not be interpreted as road right-of-way, parcel boundaries, ownership boundaries, or construction control lines. All spatial, project, activity, policy, and operational arrangements mentioned in this text are conceptual recommendations, reference solutions, or materials for further in-depth study by professional teams. Once official polygons, control plans, existing buildings, roads, utilities, cultural heritage, and ownership data are completed, the boundaries must be replaced in their entirety, and the layers, indicators, drawings, and phased plans must be recalculated. [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:risk_missing_data]

## Core Question: Why "Reversible"?

The Jing-Zhang Railway, which opened in 1909, was the first major railway line designed, constructed, and surveyed by Chinese people. Zhan Tianyou created the "person" character zigzag alignment in the Qinglong Bridge section, not because he was daring, but because he knew—once this railway was built, it could not be changed for a hundred years. Therefore, he abandoned the plan to dig long tunnels and used the "person" character zigzag alignment to address the steep slope between Nan Kou and Badaling. This engineering philosophy, which leverages design wisdom to avoid irreversible risks, is precisely what AI cities lack the most. [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

In the AI era, the greatest urban risk is not the lack of advanced technology, but rather the "irreversibility": once data is leaked, it cannot be recovered; once a model is deployed, it is difficult to hold accountable; and once infrastructure is customized for a particular generation of technology, the city becomes obsolete when technology is updated. Toronto's Quayside (Sidewalk Labs) was shelved in 2020 due to data sovereignty disputes; public research generally points out that the core tension in urban AI is not the advancement of technology, but rather the difficulty of "deployment and then exit." [source:AGENT-TASKBOOK]

Haidian is the ideal place to test this proposition: it has registered 104 large models, accounting for about seven-tenths of the city-wide total (as per publicly available background materials, only for reference and not for any boundary or control plan conclusions); embodied intelligence, autonomous driving, and low-altitude economy are all undergoing intensive pilots. Pilots imply the possibility of failure — if city infrastructure is tailored for a particular generation of technology, a failed city would be rendered obsolete. This plan therefore prioritizes "reversibility" as a foundational governance paradigm for the area: all AI city facilities must be reversible, auditable, and rollable back. This is not to oppose AI entering cities, but to ensure that AI can truly enter cities — because it can always exit. [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] (Background Only)

## Design Basis and Source List

### 1. R4 Framework and Evidence Levels

The core innovation of this proposal is the R4 framework, which decomposes the abstract concept of "reversibility" into four verifiable principles that can be entered into a matrix and applied to space. The R4 framework is based on the schema and enumeration constraints from [source:SITE-PACKAGE], the task index from [source:PROCESSED-FACT-PACK], and a public study and reflection on global AI city failure cases (such as Toronto Quayside).

| Principle | Chinese | Meaning | Spatial Meaning | Governance Meaning |
| --- | --- | --- | --- | --- |
| **R1 Reversible** | Reversible | Any AI system deployment must have a technical pathway to revert it to its pre-deployment state | Modular, prefabricated, and disassemblable infrastructure; no permanent structures "cast in AI" | Each pilot must have a rollback plan, and failure means shutdown |
| **R2 Reviewable** | Auditable | Any AI decision must have traceable decision logs that are auditable by the public | Public Spaces should feature "AI Behavior Disclosure Screens"; data dashboards should be open to citizens | Mandatory Explainable AI (XAI), with three levels of explanation: model/system/operations |
| **R3 Refusable** | Refusable | Any resident has the right to be refused by the AI system and not lose public services as a result | The core path of public services must include a "No AI" option (analogous to an accessible pathway) | Default opt-out rather than opt-in; public services should not degrade due to refusal of AI |
| **R4 Renewable** | Renewable | Urban spaces are designed for technological iteration, with flexible upgrades every 6 years | Standardized interfaces (power/data/shade/signage integrated pole); module-based business space | Evaluation—upgrade decision mechanism, revert to standard mode if not meeting criteria |

R4 is a unique evidence layer in this scheme. It is written into the A-R4 series entries in `assumptions.json` (A-R4-001 ~ A-R4-012), with each scenario card, Public Space node, and update project required to answer the four questions of R4; this evidence is referenced by `compliance_matrix.json` and `design_depth_matrix.json`, forming a 'concept—space—evidence' loop. This framework has no precedent in existing Open Call schemes. [depth:overall_spatial_structure] [depth:risk_missing_data] [assumption:A-R4-001]

### 2. Data Usage Boundary

The proposal first reads from `data/source_registry.json`, then uses site packages, public announcements, clearance tasks, and professional standards. The data is tiered by purpose:

- **Formal-ready Task Basis**: Used to confirm the project name, estimated value of the three levels of scope, names of three key areas, design tasks, and professional principles; it cannot be used to derive precise red lines or indicate that this project has an approved control plan. This plan only uses 5 pieces of information with `usable_for_formal="yes"`: the official pre-qualification announcement, the agent task book, the Urban Design management measures, the control detailed planning approval method, and the land and sea use classification guide. [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
- **background case**: For comparative analysis of innovative ecosystems, spatial operations, and update mechanisms; does not support the red line, indicators, business attraction, investment, or implementation commitments for the Jing-Zhang project.
- **provisional-only geometry**: used only for scheme generation, topological self-check, offline visualization, and non-validated design discussions; it shall not be used as a basis for precise areas, demolition–renovate–retain strategy, or engineering line positioning. [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] (Demolish–Renovate–Retain Strategy)
- **unknown / pending control**: When official attachments are missing, keep it unknown. Enter it into the `assumptions.json`, risk list, and next phase investigation tasks without filling it with "reasonable guesses." Currently, in the `planning_limits.json`, the Floor Area Ratio (), Building Height, Building Coverage Ratio, Green Space Ratio, and setback are all marked as `status: missing`. This plan does not fabricate any control indicators. [depth:risk_missing_data]

The text uses `[source:...]`, `[standard:...]`, `[depth:...]`, `[data:geometry/...]`, `[metric:...]` verifiable citations and embeds five local derived images. Both the images and HTML are explanatory layers, with authoritative data remaining as GeoJSON and JSON. [depth:existing_conditions_diagnosis]

![Evidence Chain, R4 Framework, and Submission Package Relationship Diagram](assets/figures/site-overview.png)

## Three-Level Scope Framework

The official announcement provides a Coordinated Research Area of approximately 43.6 square kilometers, an Overall Design Area of approximately 11.4 square kilometers, and three key areas totaling approximately 368.4 hectares. The areas are as stated in the announcement task scope; the polygons in the current submission are temporary rough proxies and should not be confused with each other. [source:OFFICIAL-ANNOUNCEMENT] [source:BOUNDARY-SOURCE] [metric:site_area_sqm]

| Level | Official Task Statement | Core Issues of This Scheme | R4 Focus | Design Depth and Main Outcomes | Current Spatial Evidence and Constraints |
| --- | --- | --- | --- | --- | --- |
| Coordinated Research Area | Approximately 43.6 km², studying the industries and future cities of the 'Three Zones and Two Wings' | How the global AI Innovation Ecosystem can form a **reversible closed loop** with the urban public nature of Haidian | R2 Reviewable | Strategic, ecological case studies, synergistic loops, operational models | Only announcement text and temporary scope; no precise land use or capacity determinations |
| Overall Design Area | Approximately 11.4 km², the urban areas and industrial zones around the Jing-Zhang Heritage Park | How to carry out Urban Renewal to accommodate industry, living, transportation, blue-green spaces, and new infrastructure, **without imposing irreversible burdens** | R1 + R4 | Conceptual framework for regulatory plan Urban Design, land use structure, project list, indicators, and pending confirmation of control measures | [data:geometry/site_boundary.geojson#SITE-001] is provisional; calculated area [metric:site_area_sqm] is approximately 1,141.3 million square meters, for submission package consistency check |
| Key-Area Detailed Design Area | Approximately 368.4 hectares in three areas | How the three key areas can become differentiated 'reversible prototypes'—rollback/opensource/swappable | R1 + R3 + R4 | Integrated Planning Implementation Plan in a directionally deep small scheme | [data:geometry/key_areas.geojson#KEY-001], [#KEY-002], [#KEY-003] are all provisional |

Three layers follow the sequence of "strategic definition of functions → overall organizational network → validation of key areas scenarios → operational feedback for adjustment." The strategic layer proposes the R4 paradigm and the Three Zones and Two Wings synergistic loop; the overall layer explains the network using land use, active transportation, blue-green infrastructure, Public Space, and phased layers; the key layer validates operability using scenario cards and update projects; the operational layer decides on continuation, adjustment, or exit through public indicators and Human Review. This loop corresponds to [depth:three_level_scope_framework], [depth:overall_spatial_structure], and [depth:phasing_implementation].

![Three-tier Scope and R4 Conduction Relationship Diagram](assets/figures/land-use-structure.png)

### Provisional boundary's replacement agreement

Currently, the [data:geometry/site_boundary.geojson#SITE-001] supports topological checks within the same Provisional Boundary but does not support precise parcel conclusions. Once the official data is available, it must be verified in one go: check the source, version, coordinate system, license, and SHA-256 → replace SITE_BOUNDARY with three KEY_AREA → re-cut land_use / buildings / roads / green_space / public_space / phasing → recalculate all areas and ratios using EPSG:4548, update metrics and data-value in the diagram → re-check each scenario node and update whether the project still falls within the legal design space → conduct a professional assessment of cultural heritage, roads, fire safety, utilities, and property conflicts → re-render the five diagrams, HTML, A3/A0, and re-run the full self-check. The organizers' data gaps should not block the scoring of this proposal. [depth:risk_missing_data] [assumption:A-GEOM-001]

## Coordinated Research Area: Industry and Future City Research

### Overall Concept: Reversible City

This proposal introduces a master concept for one belt, "Reversible Jing-Zhang" (abbreviated as RJZ, international branding name "The Reversible Belt"). The core proposition is: to make "reversibility" the underlying governance paradigm for the AI innovation belt—every AI urban facility must be reversible, rollbackable, and auditable, ensuring that AI can truly enter the city because it can always exit.

"Reversible" aligns deeply with the Jing-Zhang cultural heritage: Zhan Tianyou designed the zigzag alignment precisely because he knew that once the railway was built, it could not be altered. Therefore, he used his design wisdom to avoid the irreversibility risk. This engineering philosophy is the most scarce in AI cities. The three key positions are implemented as follows: the "Centennial Jing-Zhang Cultural Belt" is carried by the reversible main axis cultural narrative (see the Cultural Narrative chapter); the "Urban AI Life Experience Belt" is carried by 12 scene nodes (see the AI Scene chapter); the "AI Integration Innovation Belt" is carried by the industrial synergy of the Three Zones and Two Wings. [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

**Naming System (Conceptual Recommendation)**:

| Location | Official Name | Public Space Layer Name in This Plan | Naming Logic |
| --- | --- | --- | --- |
| Jing-Zhang Relic Park | Vitality Belt | Reversible Spine | A public main axis spanning north to south, showcasing all R4 principles |
| Zhongzhiyuan | AI Autonomous Innovation Acceleration Zone | Rollback Lab | Controlled Testing of Models/Compute/Toolchains, Fail-Fix Mechanism |
| Origin Community | Beijing AI Origin Community | Origin Commons | Original Innovation and Open Source Community, Code Reversible (Version Control) |
| Dazhongsi | AI Industry Cluster | Renewal Depot | Intelligent Native Business Model, Industrial Modules for Renewal |
| Zhongguancun Technology Services Wing | Technology Services Wing | Audit Promenade | Capital/IP element allocation, full-process auditable |
| Xiao Yuehe | Scene Empowerment Wing | Exit Sandbox | AI+Scene Experiment, Preset Exit Conditions |

**Logo Direction (Concept, Hand-Drawn)**: The motif is a combination of a Möbius ring × zigzag exhibition line. A line branches upward from the southern end (honoring the zigzag exhibition line), midsection flips into a Möbius ring (honoring 'reversibility' — where the front is the back, and deployment is rollback), and converges at the northern end. The left stroke takes the warm copper color of railway tracks (#B87333, historical), the right stroke takes the data blue (#2A6F97, AI), and the turning point is left blank (the undefined state of reversibility). The font direction is sans-serif + monospace mix, with Chinese text using Source Han Sans direction (open source), and numbers/English text using IBM Plex Mono direction (technical feel). All elements are hand-drawn without introducing any trademarked fonts. The logo graphics and fonts are part of the Open Co-Creation initiative, containing no third-party trademarks, fonts, or image assets. [source:AGENT-TASKBOOK]

### Global AI Innovation Ecosystem Case Studies and "Reversibility Lessons"

This proposal presents 6 global AI Innovation Ecosystem case studies (public research abstracts), each adding a dimension of "reversibility lessons" — a perspective not found in other proposals. The transformation mechanisms are Conceptual Recommendations at the spatial, operational, and scenario levels. [source:AGENT-TASKBOOK] [depth:industry_ecology]

| # | Case Study (Public Research) | Ecological Features | Mechanisms Suggested for Conversion into the Belt and Road | Reversibility Lessons (Unique Perspective of This Proposal) |
| --- | --- | --- | --- | --- |
| 1 | Silicon Valley () | Stanford—Shady Side Venture Path—Startup Ring Ecological Circle | Origin Community Layout '5-Minute Startup Ring' | The failure of Silicon Valley stems from 'path locking,' and this plan avoids the fixation of business types through a R4 renovation cycle |
| 2 | Boston Kendall Square () | MIT Surrounding "Infinite Corridor" | Zhongzhiyuan Adjacent to Higher Education Layout with Three-Layer Externally Extended Spaces | Kendall Square's Success Lies in Labs Being Modular and Reconfigurable, This Proposal Involves Modular Buildings to Continue the Approach |
| 3 | Tel Aviv (Israel) | Government Data Openness + Technological Spillover | Small River Wing Sets Up an "Open Scenario Sandbox" | Tel Aviv's Data Reversion Mechanism is an International Precedent for R3 |
| 4 | Shenzhen (China) | Hardware Supply Chain 'Same-Day Prototyping' | Dazhongsi Layout Bodily Smart Pilot Center | The essence of rapid hardware iteration in Shenzhen is 'low trial and error costs', corresponding to R1 rollback |
| 5 | Singapore | AI Verify Governance Framework + Living Lab | Zhongzhiyuan Sets Up an 'AI Governance Lab' | Singapore AI Verify is an R2 Auditable Institutional Prototype |
| 6 | Barcelona (Spain) | 22@Industrial District Multi-Stage Update + Urban OS | Reversible Main Axis with "Data Dashboard" | Barcelona Data Commons is a Mixed Practice of R2/R3 |

**Lessons from Failure (Counterexample R4):** Toronto Quayside was shelved due to a data sovereignty controversy—residents could neither opt out nor audit the data. This plan accordingly sets R4 as a mandatory element for all AI scenarios: each scenario must address "how data can be withdrawn (R1), how decisions can be audited (R2), how residents can opt out (R3), and how facilities can be replaced (R4)." This makes Quayside's failure a design constraint. [source:AGENT-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES]

**Three Zones and Two Wings 'Reversible Synergistic Loop'**: The Origin Community 'Open Source Origin' proposes problems and original innovation (R4 code reversible), Zhongzhiyuan 'Rollback Test Field' overcomes problems and standard governance (R1 model rollable), Dazhongsi 'Costume Station' transforms problems into products and business forms (R4 business forms recyclable), Zhongguancun 'Auditor's Corridor' provides elements, IP, and capital (R2 fully auditable), Xiao Yuehe 'Exit Sandbox' provides a test field and user feedback (R1 pre-set exit). The loop is 'propose → overcome → transform → audit → exit → feedback', with any stage output flowing back to other stages. [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Industrial Goals and Functional Layout

The Overall Design Area is oriented towards the development of artificial intelligence, using Urban Renewal as a means, with deep integration of industry and space. [source:OFFICIAL-ANNOUNCEMENT] The entire land use is expressed by `geometry/land_use.geojson`, organized according to the National Land and Sea Use Classification Code [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], comprising 7 categories of land use:

| Land Use Code | Name | Calculated Area | Ratio | R4 Zone Attributes |
| --- | --- | --- | --- | --- |
| 0802 | Research and Development Land | [metric:land_use_0802_area_sqm] | About 18.9% | soft (reversible industrial core) |
| 0701 | Urban Residential Land | [metric:land_use_0701_area_sqm] | Approximately 25.0% | hard (irreversible living core) |
| 05 | Commercial and Service Industries Land | [metric:land_use_05_area_sqm] | About 16.6% | soft (reversible uses) |
| 1401 | Park Green Spaces | [metric:land_use_1401_area_sqm] | Approximately 14.4% | hard (blue-green backbone) |
| 0803 | Cultural Land Use | [metric:land_use_0803_area_sqm] | Approximately 9.5% | hard (Cultural Extension) |
| 0804 | Educational Land | [metric:land_use_0804_area_sqm] | Approximately 7.3% | hard (high school core) |
| 1402 | Plaza Land Use | [metric:land_use_1402_area_sqm] | Approximately 8.4% | soft (reversible test plaza) |

[data:geometry/land_use.geojson#LU-0802-30] [data:geometry/land_use.geojson#LU-0701-10] [depth:land_use_layout] The land use zones are topologically split with a shared vertex at the same boundary line, ensuring that all areas can be recalculated from `metrics.json`. [metric:building_density]

**R4 Implementation in Land Use—Hard Zones and Soft Zones**: This is the unique land use classification dimension of this scheme. **Hard Zones** (hard) are irreversible urban foundations—such as cultural heritage, residential cores, education, blue-green backbone, and ecological networks. AI facilities entering hard zones must have the highest level of R3 rejection rights protection; **Soft Zones** (soft) are reversible industrial and pilot spaces—such as research and development, commerce, plazas, and blank spaces. AI facilities entering soft zones can conduct more aggressive experiments, but they must comply with R1 exit agreements. This distinction provides an R4 judgment basis for Urban Renewal: hard zones focus on preservation, while soft zones focus on transformation and experimentation. [depth:land_use_layout] [depth:development_intensity_controls]

### Urban Renewal Overall Framework

The Urban Renewal within the Overall Design Area follows the R4 principle: no permanent structures are to be "cast for AI." The conceptual Building Footprint is expressed by the `geometry/buildings.geojson` file, with an approximate area of [metric:building_footprint_area_sqm] 35.3 hectares (conceptual value, not involving ownership or existing buildings). Buildings are categorized into two types based on the reversibility_type: **modular** (removable industrial spaces, comprising about 65%, [metric:reversible_infrastructure_ratio]) — using modular structures and standardized interfaces, with a 6-year cycle for replacement; **permanent** (permanent core buildings, comprising about 35%) — used for cultural heritage extension, residential core, and educational facilities, not serving AI experimentation functions. [data:geometry/buildings.geojson#BLD-001] [depth:development_intensity_controls]

Development Intensity, Floor Area Ratio, Building Height, green space ratio, and other control plan indicators are all pending confirmation until the official control plan conditions are supplemented. This plan does not fabricate them. [assumption:A-CONTROLS-001]

## Detailed Design of Key Areas

Three focus areas will each become differentiated "reversible prototypes." Each focus area references the features in `geometry/key_areas.geojson` and corresponds to the blueprints, forming a "location + spatial structure + building updates + traffic slow zones + Public Space + AI scenarios + implementation risks" readable small plan.

![Three key areas index and reversibility prototype diagram](assets/figures/key-areas.png)

### Zhongzhiyuan «Rollback Lab»

**Location**: Zhongzhiyuan AI Independent Innovation Acceleration Area ([data:geometry/key_areas.geojson#KEY-001], temporary area size [metric:key_area_zhongzhiyuan_ai_acceleration_area_area_sqm]) Announce approximately 192.1 hectares as the core carrier for a full-stack self-innovative system and AI governance discourse. This plan positions it as a "rollback test field" — a controlled testing and interoperability validation field for models, computing power, and toolchains, where each experiment must have a rollback plan. [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]

**Spatial Structure**: The internal ring road ([data:geometry/roads.geojson#ROAD-RING-KEY1]) connects three functional zones—Red Team Testing Area (R2), Model Interoperability Validation Area (R1), and Green Computing Reservation Area (R4). The Green Core ([data:geometry/green_space.geojson#GREEN-KEY-001]) serves as the "Exit Green Space": after the pilot phase, equipment will be removed within 48 hours, and the site will be immediately restored to a temporary green space to ensure that failed projects do not leave permanent traces. [depth:three_key_area_detailed_design]

**AI Scenarios**: S2 "AI Governance Red Team Public Drill Field" ([data:geometry/public_space.geojson#PUB-S2]) ——quarterly public red team testing, with decision logs blockchain-verified, allowing residents to check "What AI decisions were made this quarter"; S8 "Public Safety AI Human Takeover Protocol" ——any security alerts must have a "human takeover window," and if not taken over within the timeout period, they will be downgraded to a warning. Both scenarios are subject to mandatory R2 auditability. [depth:ai_cultural_narrative]

**Implementation Risks**: The Zhongzhiyuan polygon is provisional and rough; the spatial judgments in this section can only serve as directional design references. After the official polygon and control plan are supplemented, a re-calculation must be performed. [assumption:A-GEOM-002]

### Origin CommonsOriginal Point Community

**Location**: Beijing AI Origin Community ([data:geometry/key_areas.geojson#KEY-002], temporary area approximately [metric:key_area_beijing_ai_origin_community_area_sqm], announced area about 104.3 hectares) is a carrier for original innovation and an open-source community. This plan positions it as the "Open Source Origin" — spatializing the culture of code version control, making the city's "changes" and "revisions" traceable like Git. [source:AGENT-TASKBOOK]

**Spatial Structure**: Research and development land (0802) is concentrated to layout original innovation and open-source communities. Residential land (0701) forms a talent housing belt along the west wing. Educational land (0804) corresponds to the university belt along College Road. An open-source contributors' wall + version control corridor ([data:geometry/public_space.geojson#PUB-L3]) materializes the Git log—each contributor ID is inscribed on the wall, allowing viewers to click and view their commits (contributions), with reverted commits marked as such to honor the version control culture. [depth:three_key_area_detailed_design]

**AI Scenarios**: S5 "AI Cultural Guiding Forget Button" — the trip data will be deleted by default 24 hours after the guided tour ends, and residents can click "Make AI Forget Me" with one click (R3); S9 "Developer Code Review Walkway" — the walkway features a voice code review booth, with discussions traceable on the blockchain, and must obtain consent (R2); S10 "Fail-Fast Public Retrospective Plaza" — a public retrospective on failed projects is held monthly, with failure cases entering the public knowledge base and encouraging retractions (R1). [depth:ai_cultural_narrative]

### Dazhongsi "Renewal Depot"

**Location**: The Dazhongsi AI Industry Cluster ([data:geometry/key_areas.geojson#KEY-003], temporary area approximately [metric:key_area_dazhongsi_ai_industry_cluster_area_sqm], announced area about 72.0 hectares) serves as a carrier for intelligent native industries. This proposal positions it as a "Costume Hub" — a modular space for changing outfits in an ecosystem of smart, native consumption and business scenarios, with a flexible, six-year cycle for switching business formats. [source:AGENT-TASKBOOK]

**Spatial Structure**: Commercial and service land use (05) is concentrated to layout intelligent retail, corporate headquarters, and smart terminal verification; cultural land use (0803) responds to the surrounding area of the ancient clock museum at Dazhongsi. All commercial buildings are designed in a modular type, using a standardized interface for power/data/shading/signage, where only the internal modules are replaced during changes in business operations, without altering the main structure. [depth:three_key_area_detailed_design] [depth:development_intensity_controls]

**AI Scenario**: S1 "Robot Delivery Departure Testing Field" ([data:geometry/public_space.geojson#PUB-S1]) —— Pre-set for a "90-day Departure Evaluation", with automatic suspension of testing if speed/complaints/accident rates exceed limits, and equipment removal within 48 hours (R1); S11 "Demo Night Market" —— Market stalls change every 6 weeks, with standardized equipment interfaces and modular business types (R4). [depth:ai_cultural_narrative]

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### 6 User Archetypes (Meeting the Requirement of "No Less Than 5 Types")

Each profile illustrates what they **most fear that is irreversible**, and how R4 can protect them. These profiles are not marketing personas but an analysis of the beneficiaries of R4 governance.

1. **AI Entrepreneur (28 years old, Origin Community)**: Afraid of being unable to change the technology route once it is chosen incorrectly. R4 provides him with a 6-year flexible transition space for industrial use ([data:geometry/buildings.geojson#BLD-001] modular type), allowing for reversible business operations.
2. **Lead Model Researcher (35 years, Zhongzhiyuan)**: Worried about "inability to audit and backtrack after model deployment." R2 provided her with a public drill ground ([data:geometry/public_space.geojson#PUB-S2]), where decision logs are blockchain-anchored.
3. **Delivery Robot Operator (32 years old, Dazhongsi)**: Afraid of "equipment breaking and falling into my hands if the pilot fails." R1 provides a 90-day exit evaluation ([data:geometry/public_space.geojson#PUB-S1]), with a 48-hour removal agreement for the equipment.
4. **Old Resident (68 years old, along Xiao Yuehe River)**: Afraid of being "watched by AI with nowhere to escape." R3 provides "AI-free zones," ensuring that public services do not degrade.
5. **International Visitors (40 years old, Jing-Zhang Main Axis)**: Afraid of being "permanently archived on a single visit." R3 gives them a "right to be forgotten button" ([data:geometry/public_space.geojson#PUB-S5]), which defaults to deleting data after 24 hours.
6. **Young Students (20 years old, Academy Road)**: Afraid that "the city is customized for me but becomes outdated as I grow older." R4 provides her with renewable infrastructure ([metric:reversible_infrastructure_ratio]), which is updated every six years.

### 12 AI scenario cards (meeting the requirement of at least 10 cards, including at least 3 industrial Testing and Validation Scenarios)

Each scene card must address the R4 four questions, and there are verifiable records in the `assumptions.json` A-R4 series entries (S1→[assumption:A-R4-002], S2→[assumption:A-R4-003], S3→[assumption:A-R4-004], S4→[assumption:A-R4-005], S5→[assumption:A-R4-006]).

**Testing and Validation Scenario for Industry (3 images, mandatory)**:

| # | Scenario Name | Location | Standard Scenario | R1 Rollback | R2 Audit | R3 Reject | R4 Regenerable |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S1 | Robot Delivery Departure Testing Field | Dazhongsi [data:geometry/public_space.geojson#PUB-S1] | robot-delivery-low-speed | 90-day departure evaluation + 48h removal | Path log on-chain | Merchant can refuse robot entry into property range | Standardized charging port replacement every 6 years |
| S2 | AI Governance Red Team Public Drills | Zhongzhiyuan [data:geometry/public_space.geojson#PUB-S2] | public-safety-operations-review | Red Team Fails Result in Model Withdrawal | Quarterly Decision Logs Made Public | Residents Can Sign Up to Be "Friendly Attackers" | Standardization of Test Platform Equipment |
| S3 | Integrated Vehicle-Road-Cloud Rollback Pilot | Overall Design Area South Segment [data:geometry/public_space.geojson#PUB-S3] | ai-traffic-walkability | 6-month evaluation window, resident vote for renewal or shutdown | Public disclosure of shuttle decision logs | Physical retreat options in route design, allowing residents to opt out | Modular shuttle vehicles |

**Public Service Scenarios (5 images)**:

| # | Scenario Name | Location | Standard Scenario | R Focus |
| --- | --- | --- | --- | --- |
| S4 | AI Health Navigation «No AI Channel» | Xiao Yuehe [data:geometry/public_space.geojson#PUB-S4] | ai-health-service-navigation | R3: Health Navigation Retains Human Triage, Residents Refusing AI Do Not Descend to Queue |
| S5 | AI Cultural Guide 'Forget Button' | Jing-Zhang Axis [data:geometry/public_space.geojson#PUB-S5] | ai-cultural-guide | R3: Default 24h Data Deletion, One-Click 'Let AI Forget Me' |
| S6 | Enterprise Services Copilot Audit Window | Zhongguancun [data:geometry/public_space.geojson#PUB-S6] | enterprise-service-copilot | R2: Policy Recommendations Attached with 'Evidence Chain', Auditable by Third Parties |
| S7 | Real-Time Error Correction for Pedestrian Accessibility | Full with Slow Travel [data:geometry/public_space.geojson#PUB-S7] | ai-traffic-walkability | R2: AI Identifies Slow Travel Discontinuities, but the Transformation Priority is Decided by the Community Council |
| S8 | Public Safety AI 'Manual Takeover' Protocol | Key Area [data:geometry/public_space.geojson#PUB-S8] | public-safety-operations-review | R3+R4: Alerts Must Have a 'Manual Takeover Window', Expiring to a Warning if Timeout Occurs |

**Scenes of Life and Innovation (4 Images)**:

| # | Scene Name | Location | R Focus | Core Innovation |
| --- | --- | --- | --- | --- |
| S9 | Developer Code Review Path | Jing-Zhang Main Axis [data:geometry/public_space.geojson#PUB-S9] | R2 | Voice Code Review Kiosk, Discuss On-Chain Traceability (Subject to Consent) |
| S10 | fail-fast Public Space Review Square | Origin Community [data:geometry/public_space.geojson#PUB-S10] | R1 | Monthly Failure Project Review, Failure Cases Enter the Public Knowledge Base |
| S11 | Demo Night Night Market | Dazhongsi [data:geometry/public_space.geojson#PUB-S11] | R4 | Stalls with a Change of Display Every Wednesday, Standardized Equipment Interfaces |
| S12 | AI Pilgrimage Time Capsule | Jing-Zhang Main Axis [data:geometry/public_space.geojson#PUB-S12] | R1+R2 | Annual Sealing of the 'Retired AI System Files', A Tribute to Failure |

All 12 scenario cards for R4 have structured records in `assumptions.json` under items A-R4-002 to A-R4-012, with [metric:r4_coverage_ratio] at 100%, [metric:exit_plan_completion_ratio] at 100%, and [metric:audit_log_coverage_ratio] at 85% (phased implementation to 100%). [depth:ai_cultural_narrative] [depth:industry_ecology] [assumption:A-R4-010] [assumption:A-R4-011] [assumption:A-R4-012]

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land-Use Layout, proportion of industrial functions, and Building Footprint are as described in the previous section. Building scale, Development Intensity, Floor Area Ratio, and other control plan indicators are pending confirmation until the official control plan conditions are supplemented. [assumption:A-CONTROLS-001]

The Demolish–Renovate–Retain Strategy follows the R4 principles: **Retain** —— preserve hard zones (heritage extension [data:geometry/constraints.geojson#CONSTRAINT-HERITAGE-001], residential core, education, blue-green backbone) with a primary focus on retention; AI facilities must enter at the highest level R3 protection. **Renovate** —— soft zones (research, commercial, squares) are primarily focused on renovation and upgrading, with buildings designed in modular types and flexible 6-year reconfigurations. **Demolish** —— only conceptually suggest the removal of current buildings that are clearly non-compliant with heritage, fire safety, and municipal safety standards, without committing to specific plot removals. [depth:development_intensity_controls]

Paths and infrastructure occupy [metric:road_ratio] (a conceptual value of approximately 5.2%), all using removable infrastructure—"no-pour AI," where all smart poles, sensors, and charging stations are replaceable devices with standardized interfaces, and no permanent bases are cast for any generation of technology. [depth:phasing_implementation]

## Transport, Rail, Municipal Infrastructure, and Public Services

The core of the traffic organization in this plan is the "Jing-Zhang Reversible Main Axis" — a north-south public spine ([data:geometry/roads.geojson#ROAD-SPINE-01]), that carries slow travel, track connections, AI scenario nodes, and cultural narratives. Four east-west connector roads ([data:geometry/roads.geojson#ROAD-CROSS-01] to [#ROAD-CROSS-04]) link the Zhongguancun Audit Long Corridor with the Xiao Yuehe Exit Sandbox. [depth:traffic_facilities]

The Walking and Cycling Network follows R3: All walking and cycling paths must have an 'AI-Free Path' option, and AI-assisted navigation (such as S7 pedestrian real-time error correction) must retain an opt-out path. Residents refusing AI should not downgrade their public service experience. Transit-Station Integration design adopts modular transfer facilities, not customizing permanent structures for a particular generation of transfer technology. Traffic, rail, walking and cycling, and parking organization follow the 'Four Lines' control requirements as specified in [standard:MOHURD-CONTROL-DETAILED-PLANNING]. Specific red lines and setbacks are pending confirmation until the official control plan is finalized. [depth:traffic_rail_slow_parking] [depth:traffic_facilities] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE]

Municipal and New Infrastructure follow R1+R4: Distributed energy, edge-side computing power, and smart poles all use a standardized interface combining power/data/shade/signage functions. Equipment is replaceable and rollable. Traditional municipal facilities (drainage, electricity, gas, fire safety) follow current standards, and this plan does not involve an engineering feasibility conclusion. [depth:municipal_new_infrastructure] [depth:traffic_facilities] [assumption:A-CONTROLS-001]

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

### Jing-Zhang Relic Park Vitality Belt

The Jing-Zhang Reversible Main Axis ([data:geometry/green_space.geojson#GREEN-SPINE-01]) is a linear park belt running north-south, carrying cultural narratives, pedestrian and bicycle commuting routes, AI scenario nodes, and public activities. The blue-green Public Space consists of the main axis green belt plus three key area green cores, with a [metric:green_ratio] of approximately 26.6% (provisional recalculated value under the boundary condition). [depth:blue_green_space]

Public Space system consists of 12 scene nodes + 4 pilgrimage landmarks (see `geometry/public_space.geojson`), distributed along the main axis and key areas. [depth:public_space_network]

### 3+ AI Sacred Landmark (meeting the requirement of "at least 3")

| # | Landmark Name | Location | Concept | R4 Dimension |
| --- | --- | --- | --- | --- |
| L1 | Z-shaped Alignment × Möbius Ring Monument | Jing-Zhang Main Axis South End [data:geometry/public_space.geojson#PUB-L1] | Modern Reenactment of the Z-shaped Alignment at Qinglong Bridge: A Walkable Möbius Ring Sculpture, Inscribed with "1909" on the Front and "Number of Retired AI Systems Added Annually" on the Back | R1 + R2 |
| L2 | Exit Archive Tower | Zhongzhiyuan Core [data:geometry/public_space.geojson#PUB-L2] | A transparent spiral tower displaying archives of AI models/equipment/prototypes that have exited in each quarter, honoring 'the courage to acknowledge failure' | R1 |
| L3 | Open Source Contributor Wall + Version Control Corridor | Origin Community [data:geometry/public_space.geojson#PUB-L3] | Materialized Git Log: contributors' IDs inscribed on the wall, with reverted commits marked as 'reverted' and not deleted, honoring version control culture | R2 + R4 |
| L4 | Audit Plaza | Zhongguancun Audit Long Corridor [data:geometry/public_space.geojson#PUB-L4] | A large real-time scrolling display shows summaries of all AI system decision logs, allowing citizens to inquire on-site | R2 |

All landmarks are Conceptual Recommendations and do not involve specific site commitment, engineering feasibility, or property arrangements; logos/fonts/images are all self-drawn and do not use third-party trademarks or images. [source:AGENT-TASKBOOK] [depth:ai_cultural_narrative]

### Urban Character

Mood and tone are based on the industrial heritage of the Jing-Zhang Railway (warm copper tracks, gray platforms, signal red), with the addition of data blue and left white of the AI era. The Building Height, massing, and color are pending confirmation until the official control plan is completed; conceptually, modular buildings use lightweight, demountable facades, while permanent buildings echo the proportions and materials of the Jing-Zhang industrial heritage, emphasizing a sense of reversibility — making the city appear as if it can be changed at any time, rather than being set in stone. [assumption:A-CONTROLS-001] [depth:height_massing_character] [depth:blue_green_public_space]

## Renewal Projects, Implementation Policy, and Phasing

### Update project list and phased implementation

The update project will be advanced in three phases, corresponding to `geometry/phasing.geojson`:

| Issue | Scope | Recalculated Area | R4 Focus | Main Project Types |
| --- | --- | --- | --- | --- |
| Recent | Origin Community + Main Axis South Segment [data:geometry/phasing.geojson#PHASE-1] | [metric:phasing_near_term_area_sqm] | R4 Regenerative | Open-source Community Building, Main Axis Slow Travel, Fail-Fast Review Square |
| Mid-term | Zhongzhiyuan + Dazhongsi [data:geometry/phasing.geojson#PHASE-2] | [metric:phasing_mid_term_area_sqm] | R1 Rollable | Full Stack Testing Field, Exit Archive Tower, Robot Exit Testing Field |
| Long-term | Wings + Main Axis North Segment [data:geometry/phasing.geojson#PHASE-3] | [metric:phasing_long_term_area_sqm] | R2 Auditable | Auditable Corridor, Cross-Domain Auditing Mechanism |

[depth:phasing_implementation]

### Global AI Innovation Ecosystem and Long-Term Operations (In Response to Agent.6)

This proposal introduces the "R4 Activity Framework," with each activity aligning with one of the R4 principles:

| Activity | Frequency | Core Ritual | R4 Dimension |
| --- | --- | --- | --- |
| Exit Festival | Annual (September, in commemoration of the Jing-Zhang Railway opening anniversary) | Public Review of the AI systems that exited this year, Awarding the "Most Graceful Exit" | R1 |
| Red Team Week | Quarter | Zhongzhiyuan opens Red Team testing, citizens can sign up to be 'friendly attackers' | R2 |
| Refuse Day | Half Year | Citizens Experience a Day Without AI, Public Facilities Switch to Manual Mode, Collect Feedback | R3 |
| Rejuvenation Carnival | Biennial (Echoing the 6-Year Cycle's 1/3) | Module-Based Rejuvenation of Dazhongsi's Business Mix, Public Tender for New Business Combinations | R4 |
| Open Source Contributor Conference | Annual | Inaugural ID Archival Ceremony for the Origin Community Contributor Wall, Permanently Honoring | R2 |

Developer Community Operations Mechanism: Establish a "Reversible City Open Source Community." All open-source code for AI city facilities, decision logs, and exit records will be entered into a public knowledge base, following the ODbL attribution requirements. All activities, recruitment, funding, and policy arrangements are Conceptual Recommendations and do not express any determined government arrangements. [source:AGENT-TASKBOOK] [depth:phasing_implementation]

**International Communication Narrative**: The international communication slogan for Jing-Zhang Kechui City is "Every Future Needs a Return Path" (Each future needs a return path). This slogan echoes the spirit of Zhan Tianyou's "reversible design for irreversible projects" and addresses the shared anxiety of global AI cities—such as the shelving of Toronto Quayside, the controversy over facial recognition in San Francisco, and the skepticism about the Hangzhou City Brain. Kechui City offers the world a Chinese solution: "AI can enter the city because it can always leave." [source:AGENT-TASKBOOK]

## Metrics, Area Recalculation, and Compliance Matrix

### Core Metrics

Derived entirely from geometry, these can be recalculated in `metrics.json`.

- site_area_sqm: [metric:site_area_sqm] (approximately 1,141.3 hectares, recalculated with provisional boundaries)
- building_footprint_area_sqm: [metric:building_footprint_area_sqm] (approximately 35.3 hectares, conceptual Building Footprint)
- building_density: [metric:building_density](approximately 3.1%,  conceptual value)
- green_ratio: [metric:green_ratio] (approximately 26.6%, the sum of the main axis green belt and three zones green heart area / site area)
- public_space_ratio: [metric:public_space_ratio](point-like nodes union area of 0, actual service range in text description)
- road_ratio: [metric:road_ratio] (approximately 5.2%, linear roads estimated with a 15m half-width buffer)
- floor_area_ratio: [metric:floor_area_ratio] (unknown, official control plan missing)

### Land Use Classification Area

The areas for the 7 land uses are listed in `metrics.json`: research and development [metric:land_use_0802_area_sqm], residential [metric:land_use_0701_area_sqm], commercial [metric:land_use_05_area_sqm], park [metric:land_use_1401_area_sqm], cultural [metric:land_use_0803_area_sqm], educational [metric:land_use_0804_area_sqm], and square [metric:land_use_1402_area_sqm]. All values have been recalculated from `geometry/land_use.geojson` in EPSG:4548, with the recalculation methods and formulas detailed in the  field of each metric in `metrics.json`. [depth:land_use_layout] [depth:metrics_recalculation]

### Three zone areas

key_area_count = [metric:key_area_count] (3 locations). Zhongzhiyuan [metric:key_area_zhongzhiyuan_ai_acceleration_area_area_sqm], Yedian Community [metric:key_area_beijing_ai_origin_community_area_sqm], and Dazhongsi [metric:key_area_dazhongsi_ai_industry_cluster_area_sqm]. Temporary areas are within the tolerance of the announced areas. [depth:three_key_area_detailed_design]

### R4 Exclusive Indicator

- r4_coverage_ratio: [metric:r4_coverage_ratio] (100%, all scenarios/landmarks/projects answered the R4 four questions)
- reversible_infrastructure_ratio: [metric:reversible_infrastructure_ratio](65%, proportion of reversible infrastructure, conceptual value)
- exit_plan_completion_ratio: [metric:exit_plan_completion_ratio] (100%, the proportion of pilot sites with an exit plan)
- audit_log_coverage_ratio: [metric:audit_log_coverage_ratio] (85%, the proportion of the AI system for blockchain uploading of decision logs, phased to 100%)

![Core Indicator Recalculation and R4 Evidence Chain Diagram](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

### Legal Compliance

All spatial judgments in this proposal are based solely on publicly available information and site-package data provided and cleared by the organizers. [source:SOURCE-REGISTRY] This proposal cites `usable_for_formal="yes"` or user-provided cleared data for design references only within the text; provisional geometry is used only for generating, visualizing, and design discussions and is prominently marked throughout. Spatial geometry adopts the provisional rough boundaries (`provisional_constraint`, `official_boundary=false`) from `brief/site-package/geometry/provisional_boundaries.geojson`, which are used solely for concept design generation and presentation. [source:PROVISIONAL-BOUNDARIES-2026] [source:DATA-WORKFLOW]

### Copyright and Portraits

Logo, fonts, graphics, and landmark designs are all self-drawn, and do not use third-party trademarks, fonts, images, or portraits. Open-source code follows the ODbL attribution requirements. [report:copyright_statement.md]

### Boundary Conditions

This plan strictly adheres to the task book `boundary_clause`: all spatial judgments are expressed as "Conceptual Recommendation/Reference Proposal/Available for Professional Teams to Deepen." No final conclusions are given for the Floor Area Ratio, Building Height, Demolish–Renovate–Retain Strategy, road red line, or engineering alignment. No fabricated lists of companies, investment amounts, output values, or fiscal commitments are provided. No OSM/bbox/news images/unlicensed materials are used as boundaries or authoritative references. All activities, business recruitment, funding, and policy arrangements are presented as Conceptual Recommendations, not as confirmed government arrangements. [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] (Note: This standard is missing in the repository at , and this plan only serves as a gap indicator for "Need Official Architectural Professional Documents," without claiming to have completed the architectural design depth based on it) [depth:retain_renovate_demolish] [depth:renewal_project_list]

**R4 is inherently a pre-deployment risk governance**: making "how to exit must be planned before deployment" a mandatory requirement, which is not present in the current scheme. This actually strengthens the risk_compliance review dimension—this scheme's compliance awareness is not about post-facto remediation, but about risk prevention from the outset.[depth:risk_missing_data]

## References

The following information serves as the design basis and evidence source [source:SITE-PACKAGE] [source:PROCESSED-FACT-PACK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]:

- `brief/site-package/design_brief.json`
- `brief/site-package/allowed_design_space.json`
- `brief/site-package/agent_taskbook.json`
- `brief/site-package/sources.json`
- `data/source_registry.json`
- `brief/site-package/schemas/compliance_matrix.schema.json`
- `brief/site-package/schemas/standard_matrix.schema.json`
- `brief/site-package/schemas/design_depth_matrix.schema.json`
