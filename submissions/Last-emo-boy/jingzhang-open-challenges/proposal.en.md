---
title: "JING-ZHANG OPEN CHALLENGES: The City Poses, the World Co-solves, the Public Reviews"
author_github: "Last-emo-boy"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A public-problem governance and urban-design framework for the Centennial Jing-Zhang corridor: each question passes through rights and data clearance, global co-solving, staged validation, controlled field testing and public review before open archiving, iteration or exit, while everyday repair and care remain the test of whether AI improves urban life."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-cultural-guide", "enterprise-service-copilot", "robot-delivery-low-speed"]
iteration: "v1.0"
---

# JING-ZHANG OPEN CHALLENGES

**The City Poses. The World Co-solves. The Public Reviews.**

## Design Basis and Source List

The proposal begins with one design judgment: the Centennial Jing-Zhang AI Innovation Belt should not merely display AI products. It should prototype a public institution capable of posing urban questions openly, clearing rights and data, validating answers, receiving public comments, publishing failure and allowing exit. Urban design therefore carries two simultaneous lines of work. The vertical line is “the city poses → rights and data clearance → global co-solving → laboratory validation → controlled field testing → public review → open archiving, iteration or exit.” The horizontal line is everyday repair and care: shade, seating, crossings, accessibility, wayfinding, facility repair and the working conditions of frontline staff. The former makes innovation reviewable; the latter prevents the district from serving only major events and technology showcases. [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

Evidence is separated by permitted use:

| Evidence tier | Use in this proposal | Explicit prohibition |
| --- | --- | --- |
| Formal-ready sources | The announcement defines tasks, scope semantics and deliverable depth; the agent taskbook defines branding, ecosystem, scenario, culture and operation requirements; three public professional references inform urban design, regulatory boundaries and land-use classification. [source:MOHURD-URBAN-DESIGN-MEASURES] [source:MOHURD-CONTROL-DETAILED-PLANNING] [source:MNR-LAND-USE-CLASSIFICATION] | A general standard cannot establish project-specific parcel controls, engineering conditions or implementation decisions. |
| Provisional spatial data | Repository provisional polygons support generation, diagrams, self-check and concept discussion only. [source:PROVISIONAL-BOUNDARIES] [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001] | They are not an Official Planning Boundary and cannot support exact area, statutory control, approval or investment claims. |
| Background cases | Eight cases are compared only as mechanisms and are uniformly marked background_case_study in the source registry. | They do not support Jing-Zhang planning controls, government commitments, funding, investment attraction or engineering feasibility. |
| Pending standard | An official or rights-cleared architecture design-depth file is unavailable, so it remains a deepening checklist only. [source:ARCH-DESIGN-DEPTH-DATA-GAP] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] | No unofficial mirror is treated as formal authority. |

The current working base covers 11.41 km² [metric:site_area_sqm]. Twenty-four building prototypes occupy 10.16 ha [metric:building_footprint_area_sqm]. Green space covers about 114.45 ha, or 10.03% [metric:green_ratio]. Twelve public scenario spaces cover about 10.16 ha, or 0.89% [metric:public_space_ratio]. Three key areas are included [metric:key_area_count]. These values follow provisional polygons and are not official areas. [metric:floor_area_ratio] has no value because statutory controls and countable floor area are unavailable. Official boundaries, surveys, ownership, controls, roads, infrastructure, fire, heritage and public-service inventories must update the entire package when supplied. [depth:existing_conditions_diagnosis] [depth:risk_missing_data] [data:geometry/constraints.geojson]

| Known fact | Missing input | Effect on this design round | Data action |
| --- | --- | --- | --- |
| The announcement defines three work levels, three named key areas and required tasks. [source:OFFICIAL-ANNOUNCEMENT] | Official SITE and KEY_AREA polygons | The proposal shows spatial relationships but does not establish redlines, parcels or exact scale. | Replace SITE-001 and PROV-KEY-001–003 with official attachments and update every area and figure. |
| The repository provides provisional SITE-001 and three rough key areas. [source:PROVISIONAL-BOUNDARIES] | Cadastre, ownership, building survey and regulatory controls | Twenty-one land-use zones and twenty-four building objects remain design prototypes. | Overlay cadastre, survey, title and statutory controls, then review each retain, renovate or infill object. |
| The taskbook defines Three Zones and Two Wings, scenarios, talent, landmarks and operations. [source:AGENT-TASKBOOK] | User research, operators, budgets and permissions | Scenarios use staged testing, human takeover and exit conditions; none is promised as an open service. | Conduct co-design interviews, accessibility review, capacity checks and responsibility confirmation. |
| The constraints layer currently contains zero features. [metric:constraints_feature_count] | Heritage, water, trees, utilities, fire and municipal constraint geometry | No engineering alignment, height, shoreline or capacity conclusion is made. | Run layer-by-layer conflict review and update risk controls when formal data arrives. |

![Evidence relationship among sources, space and public review](assets/figures/site-overview.en.png)

## Three-Level Scope Framework

The three levels carry three different questions rather than enlarging the same rough boundary three times. The Coordinated Research Area asks which public problems merit global co-solving. The Overall Design Area asks how these questions enter everyday urban systems. The Key-Area Detailed Design Areas ask under what conditions a test can proceed, be reviewed or exit. The division follows the announcement and uses provisional spatial data as a replaceable working base. [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]

| Level | Design task | Open Challenges output | Data and gap |
| --- | --- | --- | --- |
| Coordinated Research Area | Industry ecosystem, future city and international collaboration | Public question catalogue, three positionings, five functions, case transfer and annual agenda | Strategic research adds no precise redline; industry, population and facility baselines remain missing. |
| Overall Design Area | Urban renewal, functions, transport, infrastructure and character | A conceptual structure of “question book + validation chain + everyday care network” | [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/land_use.geojson#LU-001] are provisional working layers; statutory controls remain pending. |
| Key-Area Detailed Design Area | Detailed design of three districts | Beijing AI Origin Community poses and convenes; Zhongzhiyuan validates; Dazhongsi hosts public review and adoption | The three areas are indexed by [data:geometry/key_areas.geojson#PROV-KEY-001] through PROV-KEY-003 and remain provisional. |

The spatial responsibility chain is explicit: **Beijing AI Origin Community (pose and convene) → Zhongzhiyuan (solve and validate) → Xiaoyue River Scenario Enablement Wing (low-risk trial) → Dazhongsi (review and adopt) → Zhongguancun Technology Services Wing (match intellectual property, talent, compute, data and professional services) → return a new version to the question catalogue.** An everyday care network runs laterally through communities, the heritage park, stations and campuses so that small repairs do not wait for major innovation projects. This is a Conceptual Recommendation, not a confirmed institutional division or government operation plan. [depth:overall_spatial_structure] [metric:key_area_count]

When official polygons arrive, [data:geometry/site_boundary.geojson#SITE-001] and all three KEY_AREA features must be replaced. Land use, buildings, roads, green space, public space, phasing and all area metrics must then be regenerated. Complete design depth does not mean complete official data.

![Three-level scope, validation responsibility chain and everyday care network](assets/figures/land-use-structure.en.png)

## Coordinated Research Area: Industry and Future City Research

### Brand and visual identity

The umbrella brand is **JING-ZHANG OPEN CHALLENGES｜京张开放题**. In Chinese, “开放题” means both an urban question without a single predetermined answer and a question whose conditions, evidence, public comments and failures should be open whenever rights allow. “Open Challenges” is used in English to stress sustained participation. Each specific governed object is an Open Question, so the system is not mistaken for a one-off competition.

The proposed logo uses **three open frames, two outward interfaces and one central public dot**. The frames encode the Three Zones, the interfaces encode the Two Wings, and the public occupies the centre of judgment; the negative space may suggest a question mark without copying a railway symbol, corporate mark or common neural-network motif. The state grammar is “? pose, { } co-solve, △ test, ○ review, ↺ iterate or exit.” Suggested colours are Jing-Zhang rust red, research indigo and Xiaoyue River cyan. Every state must also use text, shape and pattern rather than red/green alone. Titles should use open-licensed or system fonts, with actual font and embedding rights checked before final export. Logo, wayfinding and cultural interpretation form separate levels; a wall of corporate logos cannot substitute for public contribution records. [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

### Three positionings, five functions, Three Zones and Two Wings

| Taskbook element | Open Challenges translation | Spatial or operational expression |
| --- | --- | --- |
| Centennial Jing-Zhang cultural belt | Move from “how engineering problems were solved” to “how urban problems are jointly carried” | A Century Challenge Archive along the heritage park, oral histories and failure reviews |
| Metropolitan AI life-experience belt | Residents can pose questions, be informed, refuse, appeal and withdraw | Dazhongsi public trials, neighbourhood question clinics and the everyday care network |
| AI integrated innovation belt | Connect research, engineering, validation, adoption and open knowledge | The responsibility chain from Beijing AI Origin Community to Zhongzhiyuan, Xiaoyue River and Dazhongsi |
| Full-Stack Independent AI Innovation System | Evidence for models, data, compute, evaluation, safety and energy | T01, T03 and evidence publication in Zhongzhiyuan |
| World-class AI innovation ecosystem | Cross-university, cross-institution and international teams form around real questions | Open residencies and question workshops in Beijing AI Origin Community |
| New paradigm for AI-enabled scenarios | Clear rights first, stage maturity next, then enter a revocable real setting | Xiaoyue River Scenario Enablement Wing and G0–G4 gates |
| Vibrant AI-enabled city | Businesses, residents and visitors can try services under explainable conditions | Dazhongsi experience, service and public review |
| Global voice in AI governance | Publish methods, failures, stop reasons and public receipts | Belt-wide open question catalogue and annual review release |

The Three Zones are Zhongzhiyuan AI Independent Innovation Acceleration Area, Beijing AI Origin Community and Dazhongsi AI Industry Cluster. The Two Wings are Zhongguancun Technology Services Wing and Xiaoyue River Scenario Enablement Wing. The three districts are deliberately different: Zhongzhiyuan has the deepest technical work and the least public exposure; Beijing AI Origin Community has the highest density of knowledge exchange and talent; Dazhongsi has the strongest public contact and market feedback. The wings offer only conceptual mechanisms for matching resources and enabling low-risk trials. They promise no funding, investment attraction, data allocation, test permit or public operation. [data:geometry/key_areas.geojson#PROV-KEY-002] [depth:overall_spatial_structure]

### Eight background cases and transfer boundaries

| Case | Transferable mechanism | What cannot be copied |
| --- | --- | --- |
| AI Singapore 100 Experiments [source:CASE-AISINGAPORE-100E] | Organises problem definition, baseline, implementation and handover as a reviewable project while connecting engineering and training | Funding levels, programme duration and policy conditions |
| Mila [source:CASE-MILA] | Connects universities, open science, industry adoption and responsible AI through a nonprofit institute | A research institute does not carry urban-planning authority |
| Vector Institute [source:CASE-VECTOR-INSTITUTE] | Uses an independent intermediary to connect research, talent and industry adoption | Its partners, scale and funding do not become Jing-Zhang commitments |
| Punggol Digital District [source:CASE-PUNGGOL-DIGITAL-DISTRICT] | Co-location of industry, university and a digital operations platform informs the relationship among learning, operations and testing | Dense sensing cannot transfer without necessity, privacy and security review |
| Shanghai Model Speed Space [source:CASE-SHANGHAI-MOSU-SPACE] | Proximity among compute, open data, evaluation, finance and compliance services informs a full-stack service interface | Reported firms, financing and attraction figures are not future guarantees |
| Pittsburgh Robotics Network and CMU NREC [source:CASE-PITTSBURGH-ROBOTICS] | A regional industry network alongside applied robotics R&D informs embodied-AI supply chains and testing collaboration | Institution-reported size and investment are not used as local promises |
| Knowledge Quarter London [source:CASE-KNOWLEDGE-QUARTER-LONDON] | A multi-institution membership network near a major rail gateway organises knowledge exchange, public access and place stewardship | It is not an AI-specific district and has no single spatial governance model to copy |
| STATION F [source:CASE-STATION-F] | Dense shared programmes and common support services span startup stages | A startup campus is not a complete urban district; company and funding figures are not copied |

The shared lesson is not to reproduce another district, but to define responsibility among question owners, validators, users and affected publics. Missing local evidence includes actual Jing-Zhang industry actors, talent needs, spatial cost, service capacity and international-participation baselines. The cases support method discussion only, not local scale or control claims. [depth:existing_conditions_diagnosis]

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

Open Challenges is used as an organising method for renewal, not as a new statutory land-use category. The conceptual structure combines a public question and walking interface along Jing-Zhang Railway Heritage Park, the validation responsibility chain connecting the Three Zones and Two Wings, an everyday care network across communities, campuses and stations, and revocable temporary test points. Current land use, building, road, green, public-space and phasing layers jointly express the structure, all on a provisional boundary. [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:overall_spatial_structure]

Four types of urban-renewal action are proposed:

1. **Repair everyday interfaces first.** Identify crossing gaps, inaccessible segments, missing shade and seating, night wayfinding, bicycle parking, facility repair and frontline working conditions. These low-disturbance actions are also public-interest tests for S11 and S12.
2. **Embed shared functions next.** Conceptually place question clinics, open research, test booking, public review and talent services in existing buildings and public spaces, prioritising reversible adaptation.
3. **Discuss intensity only after evidence.** Land use, total floor area, Floor Area Ratio, Building Coverage Ratio, height and setbacks require official regulatory controls, ownership, surveys and engineering information. [metric:floor_area_ratio] remains unknown and receives no substitute value. [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:development_intensity_controls]
4. **Bind new facilities to exit conditions.** Every sensor, robot, digital sign or temporary structure needs a purpose, duration, human owner, incident procedure, restoration method and removal responsibility. “Experiment” cannot justify indefinite occupation of Public Space.

[data:geometry/land_use.geojson#LU-001] through LU-021 are twenty-one conceptual zones covering SITE-001, not approved uses. [data:geometry/buildings.geojson#BLDG-001] through BLDG-024 contain eight retain, eight renovate and eight infill prototypes; they do not determine real-parcel DRR. [data:geometry/roads.geojson#ROAD-001] through ROAD-013 show nine everyday cross-corridor stitches and four local supporting connections, not engineering alignments.

Missing inputs include the Official Boundary, parcels and ownership, existing-building condition, planning permission, road redlines, rail exits, municipal capacity, fire safety, heritage, trees and underground utilities. Relevant professional teams must deepen the work and follow statutory procedures once inputs arrive. The proposal is not government approval, investment or implementation commitment. [data:geometry/constraints.geojson] [depth:risk_missing_data]

## Detailed Design of Key Areas

Each key area is presented through positioning, spatial structure, building renewal, transport and active travel, Public Space, AI scenarios and implementation risk, while serving a distinct depth of responsibility. Every move below is a Conceptual Recommendation for professional deepening. All three polygons are provisional and cannot establish parcels, construction scale or Demolish–Renovate–Retain decisions. [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:three_key_area_detailed_design] [metric:key_area_count]

### Zhongzhiyuan AI Independent Innovation Acceleration Area

- **Positioning:** R&D, evaluation, safety and energy evidence for open models and embodied AI.
- **Spatial structure:** High-risk technical testing belongs indoors or in controlled areas; methods, failures and governance discussions belong on accessible outer interfaces. The Qinghe-related landscape supports low-carbon exchange and ecological learning but carries no unapproved engineering intervention.
- **Building renewal:** Reversible adaptation of existing R&D space should be assessed first. New construction, demolition, height and total scale await survey, ownership, control and structural evidence.
- **Transport and Public Space:** Staff, visitors, logistics, test equipment and public visits should be separated by time and zone, with conceptual walking, cycling and shuttle improvement.
- **Scenarios:** T01 Open Model Examination and T03 Building Energy Shadow Twin; Global Co-solving Forum is a functional node, not a confirmed building.
- **Risks:** Sensitive data, model attacks, equipment safety, energy use and confusing a test label with official certification.

The spatial index is [data:geometry/key_areas.geojson#PROV-KEY-001]. R&D and validation prototypes include [data:geometry/buildings.geojson#BLDG-007] and [data:geometry/buildings.geojson#BLDG-015]; scenario locations are [data:geometry/public_space.geojson#SCN-001] and [data:geometry/public_space.geojson#SCN-003]. Building footprint and green share are recorded by [metric:building_footprint_area_sqm] and [metric:green_ratio].

### Beijing AI Origin Community

- **Positioning:** Public question posing, open research, cross-institution teaming and international talent's everyday services.
- **Spatial structure:** Continuous ground-floor shared interfaces conceptually link the question clinic, open-source collaboration, release, intellectual-property and daily-life services. Walking and accessible connections join campuses, workplaces and neighbourhoods.
- **Building renewal:** Adaptable space is activated first while real users and frontline operations remain in place. Any DRR choice requires ownership, structural, fire, tenancy and community-impact evidence.
- **Transport and Public Space:** Short visits, daily commuting, night collaboration and residents' quiet needs are managed separately.
- **Scenarios:** S04 Source-Visible Research Assistant and S05 International Talent Landing Assistant. The Century Challenge Archive connects railway engineering history, Zhongguancun innovation culture and current questions.
- **Risks:** Research or personal data overreach, misleading talent services, activity nuisance and innovation narratives displacing community life.

The spatial index is [data:geometry/key_areas.geojson#PROV-KEY-002]. Public interfaces are represented by [data:geometry/public_space.geojson#SCN-004] and [data:geometry/public_space.geojson#SCN-005], while [metric:public_space_ratio] remains provisional.

### Dazhongsi AI Industry Cluster

- **Positioning:** Explainable AI-product experience, SME adoption, comparative public review and international exchange.
- **Spatial structure:** Low-barrier trials are conceptually organised around transit arrival, four-quadrant pedestrian connections and commercial Public Space. Every experience displays data source, Human Review, energy, duration and exit instructions.
- **Building renewal:** Time-sharing in existing commercial, office and public space comes before a large showcase building.
- **Transport and Public Space:** Peak commuting, events, delivery and neighbourhood active travel require separate assessment. No road work or station alteration is fixed here.
- **Scenarios:** S09 AI Product Disclosure-Card Market and S10 SME Content and Translation Studio. The Civic Review Forum provides trial, appeal and public receipts.
- **Risks:** Marketing presented as public certification, synthetic-content infringement, digital exclusion and events crowding out everyday services.

The spatial index is [data:geometry/key_areas.geojson#PROV-KEY-003]. Conceptual connections use [data:geometry/roads.geojson#ROAD-001], while public scenarios use [data:geometry/public_space.geojson#SCN-009] and [data:geometry/public_space.geojson#SCN-010]. Official station, road and flow data remain missing.

![Different responsibilities and implementation risks of the three key areas](assets/figures/key-areas.en.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

The ecosystem is not reduced to an abstract firm–talent–capital diagram. Every Open Question is mapped to real users, affected people, frontline operators, validators and an accountable human owner. Each Q-ID includes the question owner, beneficiaries, baseline, permitted data, rights status, risk class, test location, success and stop criteria, human owner, expiry date and licence for open outputs. [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

### Personas

| Persona | Primary need | Spatial and operational response | Boundary |
| --- | --- | --- | --- |
| Model researchers and open-source maintainers | Reproducibility, contribution reputation and cross-institution collaboration | Team in Beijing AI Origin Community, validate in Zhongzhiyuan, publish failure and versions | Non-public research data never enters the catalogue by default |
| Product, test and compliance staff in AI startups | Affordable validation, professional services and real feedback | T01–T03 staged testing and service matching through Zhongguancun Wing | A field test or match is not a permit, investment or procurement |
| Local residents and carers | Safety, quiet, accessibility, refusal and appeal | Question clinics, Civic Review Forum, offline channels and everyday care network | Resident behaviour is not used for marketing profiles |
| Merchants and frontline property, sanitation and landscape staff | Usable tools, manageable workload and accountable maintenance | Co-define S10–S12, retain Human Review, takeover and repair reporting | Automation cannot shift safety responsibility or hide added labour |
| Planning, legal, ethics, safety and civil-society reviewers | Traceable evidence, independent review and stop authority | G0–G4 gates, published opinions and dissent | One technical team cannot approve its own promotion |
| International talent, students and short-term visitors | Multilingual information, short participation and trustworthy service | S05, S07, open residency and an accessible experience route | No automated visa, employment, housing or eligibility decisions |

### Twelve scenario cards

| ID | Scenario and location | Data, Human Review and operational boundary | Failure and exit |
| --- | --- | --- | --- |
| **T01** | Zhongzhiyuan Open Model Examination: safety, bias, privacy, robustness and energy evaluation [data:geometry/public_space.geojson#SCN-001] | Public, rights-cleared or synthetic data only; methods and failed items are published; experts sign | Stop when baseline, rights or reproducibility fails; never issue “official certification” |
| **T02** | Xiaoyue River Embodied-AI Slow Test: delivery, inspection and accessibility robots in enclosed or time-limited settings [data:geometry/public_space.geojson#SCN-002] | Geofence, safety steward, emergency stop and explicit hours; public operation needs separate review | A near miss, unmanageable complaint or failed takeover returns the test to G1/G2 |
| **T03** | Zhongzhiyuan Building Energy Shadow Twin: prediction and scheduling tested in shadow mode [data:geometry/public_space.geojson#SCN-003] | Advice only by default; facility professionals separately approve real control | Stop and retain logs when evidence is weak, comfort is harmed or data rights fail |
| S04 | Beijing AI Origin Community Source-Visible Research Assistant [data:geometry/public_space.geojson#SCN-004] | Each answer displays sources and uncertainty and can transfer to a human librarian | Refuse when a source cannot be shown or material is unauthorised |
| S05 | Beijing AI Origin Community–Zhongguancun Wing International Talent Landing Assistant [data:geometry/public_space.geojson#SCN-005] | Explains public procedures and offers a human service point | Never decides visas, jobs, housing, subsidies or eligibility |
| S06 | Zhongguancun Wing Compute, Data and Professional-Service Navigator [data:geometry/public_space.geojson#SCN-006] | Transparently lists conditions and providers; a human confirms | Return “no match” rather than promise allocation or financing |
| S07 | Heritage Park Accessible Cultural Guide [data:geometry/public_space.geojson#SCN-007] | Voluntary; captions, audio, plain language and offline mode; no facial recognition | Correct errors on site and issue a version receipt |
| S08 | Xiaoyue River Biodiversity Citizen-Science Assistant [data:geometry/public_space.geojson#SCN-008] | Aggregated environmental data without personal trajectories | Reduce precision or stop publication if habitat or sensitive species are put at risk |
| S09 | Dazhongsi AI Product Disclosure-Card Market [data:geometry/public_space.geojson#SCN-009] | Displays data, energy, privacy, Human Review, validity and exit | Remove an exhibit when disclosure is incomplete, misleading or complaints remain unresolved |
| S10 | Dazhongsi SME Content and Translation Studio [data:geometry/public_space.geojson#SCN-010] | Human publication, copyright provenance and synthetic-content labels | Remove deceptive endorsement, discrimination or infringement and notify affected people |
| S11 | Belt-wide Public-Space Comfort Co-pilot [data:geometry/public_space.geojson#SCN-011] | Weather, facility condition and aggregated use data support shade, seating and activity suggestions; operators decide | Return to human co-design if maintenance burden or exclusion increases |
| S12 | Neighbourhood Urban-Question Triage and Co-design Assistant [data:geometry/public_space.geojson#SCN-012] | Explainable ranking, offline and human channels, and rights to appeal, correct and withdraw | Pause automated ranking and publish a revision if minority needs are systematically missed |

T01–T03 are explicit Testing and Validation Scenarios. All twelve share a maturity gate: **G0 paper review → G1 synthetic-data experiment → G2 enclosed field test → G3 supervised public Beta → G4 conditional replication or retirement**. Every promotion rechecks data rights, risk, human takeover, incident response, accessibility, maintenance capacity and expiry. G4 explicitly permits exit; growth is not the sole definition of success. [data:geometry/public_space.geojson#SCN-001] [data:geometry/roads.geojson#ROAD-001] [depth:risk_missing_data]

Public review is not a like button. Every comment receives a **public receipt** marked adopted, partly adopted, not adopted or pending verification, with reason, owner, next review point and appeal channel. The annual release covers passed, failed, voluntarily stopped and expired questions. Safely stopping an unsuitable trial counts as responsible contribution. User research, impact assessment and authorised operators remain missing, so all scenarios are Conceptual Recommendations.

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Statutory classification and Open Challenges operations are represented as separate layers. AI R&D, industry services, community services and park/open space retain verifiable land_use_code semantics. Question clinics, test booking and public review are operating overlays, not invented statutory land uses. [source:MNR-LAND-USE-CLASSIFICATION] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout]

[data:geometry/land_use.geojson#LU-001] through LU-021 divide SITE-001 into twenty-one conceptual zones with no gap or overlap; statutory planning must still confirm every use. [data:geometry/buildings.geojson#BLDG-001] through BLDG-024 occupy 101,646 m² [metric:building_footprint_area_sqm], while total floor area, FAR, BCR, height and development intensity require official controls and building-by-building surveys. [metric:floor_area_ratio] therefore has no current calculation basis. [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:development_intensity_controls]

DRR follows “survey first, classify second, decide last”:

| Category | Conceptual judgment | Evidence still required |
| --- | --- | --- |
| Retain | Prioritise assessment of buildings with heritage, public-service, continuing-use or embodied-carbon value | Heritage, title, structure, fire and actual use |
| Renovate | Prioritise reversible adaptation where space can support shared research, talent, community or care services with low disturbance | Lease, structure, systems, accessibility and maintenance |
| Demolish | Only a candidate after statutory confirmation of danger, conflict or lack of adaptation value; no parcel is selected here | Title, appraisal, compensation, social impact and approval |
| New build | Consider only if existing space cannot meet a demonstrated public need | Regulatory controls, transport, municipal, fire, energy and life-cycle cost |

Massing and character aim for continuous ground-floor access, accessible Public Space and a low-pressure relationship with the heritage park and waterways, without final height values. [depth:height_massing_character] [depth:retain_renovate_demolish] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]. Architecture deliverable topics are complete as a design-depth response, while the official architecture reference, survey and engineering data remain missing. Those are separate states.

## Transport, Rail, Municipal Infrastructure, and Public Services

The transport judgment is to repair the “last everyday segment” before planning event peaks or technical demonstrations. Conceptual recommendations include continuous walking and cycling among campus, workplace and neighbourhood; accessible links from rail exits to public interfaces; orderly bicycle parking; time separation for delivery and test equipment; temporary event-peak management; and retained human wayfinding. [data:geometry/roads.geojson#ROAD-001] expresses a relationship, not a road redline or engineering alignment. [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:traffic_rail_slow_parking]

Municipal infrastructure and New Infrastructure follow “minimum necessary, maintainable and removable”:

- Edge compute, networks and sensing are deployed only for a defined scenario, with data retention, maintenance and removal owners.
- T03 operates in shadow mode first; facility professionals separately approve any actual equipment control.
- Charging, energy, stormwater, water, drainage, fire and underground utility proposals require official capacity and engineering information.
- Public services retain telephone, counter, paper and human assistance; an app cannot become the sole route.
- Platforms exchange only the minimum fields required by a question; the proposal creates no purposeless belt-wide population surveillance.

Missing constraints are registered at file level in [data:geometry/constraints.geojson]; overall scope is indexed by [metric:site_area_sqm], and professional follow-up by [depth:municipal_new_infrastructure]. Rail exits, road hierarchy, traffic, parking, utilities, loads, fire, emergency and public-service capacity remain missing. All facility layouts are Conceptual Recommendations, not engineering conclusions or government construction plans.

![Transport, active travel, Blue-Green Space and low-risk scenarios](assets/figures/mobility-bluegreen.en.png)

## Blue-Green Network, Public Space, and Urban Character

Jing-Zhang railway heritage and spaces related to the Qinghe and Xiaoyue River are treated as a shared interface for public memory, everyday care and low-risk learning, not a backdrop for technical display. [data:geometry/green_space.geojson#GREEN-001] and [data:geometry/public_space.geojson#SCN-011] express the continuous green and public system, while [metric:green_ratio] and [metric:public_space_ratio] remain provisional. [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:blue_green_public_space]

The cultural narrative has three periods: **the Jing-Zhang Railway history of public engineering → Zhongguancun's problem-driven research and entrepreneurship → the AI era's redefinition of rights, failure and public responsibility.** It records not only winners but also residents who posed a problem, frontline maintainers, teams whose validation failed, reviewers who requested a stop and people who completed a retrospective. Historic photographs, biographies and archives remain titles only until provenance and display rights are cleared.

Three pilgrimage landmarks are functional Conceptual Recommendations:

1. **Century Challenge Archive｜百年难题档案馆:** suggested in Beijing AI Origin Community or a related heritage-park node, presenting historic challenges, current questions, evidence, failed attempts and version corrections.
2. **Global Co-solving Forum｜全球解题台:** suggested in Zhongzhiyuan, presenting questions, teams, G0–G4 status, test boundaries, stop reasons and reusable outputs.
3. **Civic Review Forum｜城市评议厅:** suggested in Dazhongsi, providing comparative trials, human explanation, comments, appeals and public receipts.

The everyday care network consists of small objects: shade, drinking water, seating, toilets, accessibility, lighting, crossings, quiet corners, child and older-person rest points, maintenance workstations and clear wayfinding. Questions, owners and handling status are published quarterly so spatial quality does not depend on an annual festival. Urban character favours durable, repairable and replaceable elements with legible state labels. It uses no uncleared image, third-party font file, corporate trademark or portrait and does not present a landmark as approved construction.

Missing evidence includes heritage assessment, water and ecological constraints, tree survey, accessibility audit, Public Space ownership, maintenance budget and actual-use research. No structure, bank, lighting or landscape engineering is fixed before these inputs.

## Renewal Projects, Implementation Policy, and Phasing

Projects are ordered by evidence readiness, low-disturbance prototypes, controlled validation, public review and conditional expansion or exit, not an unconfirmed construction schedule. [data:geometry/phasing.geojson#PHASE-001] is a conceptual phasing index rather than a government implementation plan. [depth:renewal_project_list] [depth:phasing_implementation]

| Project package | Conceptual content | Prerequisite and exit |
| --- | --- | --- |
| P01 Open Question Catalogue and Rights Desk | Q-ID, owner, beneficiary, data rights, risk, duration and licence | No lawful data or no public problem means no entry; withdrawal and reason are public |
| P02 Everyday Care Question Clinic | Offline question intake, repair, accessibility and frontline-work issues | Requires human handling, public receipt and maintenance owner |
| P03 Zhongzhiyuan Validation Environment | T01, T03, expert review and failure publication | Insufficient safety, data, energy or facility conditions trigger downgrade or stop |
| P04 Xiaoyue River Slow-Test Interface | T02, S08 and time-limited low-risk testing | No geofence, steward, emergency stop or ecological clearance means no opening |
| P05 Beijing AI Origin Open Research and Talent Services | S04, S05, residency, teaming and IP advice | No unauthorised research or personal data; service promises no eligibility |
| P06 Dazhongsi Public Review and SME Adoption | S09, S10, public receipts and human assistance | Misleading, infringing, unanswered complaints or loss of daily services triggers removal |
| P07 Three Landmarks and Contribution Archive | Archive, Forum, Review Forum and responsibility records | Reversible display first; no third-party asset without a rights record |
| P08 Evidence and Exit Archive | Annual changelog, incidents, appeals, failed and retired records | Success-only reporting is invalid; an expired item pauses without review |

Implementation uses three spatial packages, managed separately from the G0–G4 test level of an individual scenario. **PHASE-001 Open Question Posing and Reversible Repair** carries G0 paper review and G1 synthetic-data work. **PHASE-002 Closed Co-solving and Controlled Validation** carries G2 closed testing. **PHASE-003 Public Review and Adoption/Retirement** carries G3 supervised public beta and G4 conditional replication or retirement. [data:geometry/phasing.geojson#PHASE-001] [data:geometry/phasing.geojson#PHASE-002] [data:geometry/phasing.geojson#PHASE-003] are working envelopes, not fixed years, investment, acquisition or approval order.

The four-season annual operating concept is:

- **Spring — Pose and Clear:** residents, researchers, firms and operators submit questions; public interest, data rights and testability are checked first.
- **Summer — Global Co-solving:** interdisciplinary teams, developer residencies, mentoring clinics and open-method workshops.
- **Autumn — Controlled Field Testing:** projects enter distinct Zhongzhiyuan, Xiaoyue River and Dazhongsi settings under G0–G4 with Human Review and takeover.
- **Winter — JZ Open Challenges Review Week:** passed, failed, voluntarily stopped and expired projects are released with public receipts and the next year's questions.

Permanent operations include a monthly question clinic, test booking, incident and exit records, developer-community maintenance, public experience routes, international communication and follow-up. Attraction, procurement, investment, policy and events are not government commitments. Any 6/12-month follow-up period requires confirmation by a future operator.

## Metrics, Area Recalculation, and Compliance Matrix

Spatial areas, ratios and line lengths come from the nine GeoJSON files. Persona count comes from the proposal; case count comes from the proposal and sources.json. The main results are:

| Metric | Design meaning | Evidence and limit |
| --- | --- | --- |
| [metric:site_area_sqm] | Denominator for every area ratio | Recalculated from provisional [data:geometry/site_boundary.geojson#SITE-001]; not an official exact area |
| [metric:building_footprint_area_sqm] | Tests the relationship between spatial supply and open interface | Reflects design prototypes in [data:geometry/buildings.geojson#BLDG-001], not existing or approved total floor area |
| [metric:green_ratio] | Tests support for ecology, shade and everyday stay | Derived from [data:geometry/green_space.geojson#GREEN-001] and must be recalculated with official boundary and ecology data |
| [metric:public_space_ratio] | Tests spatial conditions for public review and daily interaction | Derived from [data:geometry/public_space.geojson#SCN-001] through SCN-012 and does not prove legal public access |
| [metric:key_area_count] | Confirms inclusion of the three mandatory key areas | Count is reviewable; boundaries and areas remain provisional |
| [metric:floor_area_ratio] | Tests development intensity | Not calculated without official controls and countable floor area |

| Land-use structure | Current quantity | Design use and limit |
| --- | --- | --- |
| Site and topology | 11,412,825 m² [metric:land_use_area_sqm]; coverage 1.0 [metric:land_use_coverage_ratio]; gap 0 m² [metric:land_use_gap_area_sqm]; overlap 0 m² [metric:land_use_overlap_area_sqm] | Twenty-one zones [metric:land_use_zone_count] and twelve use classes [metric:land_use_category_count] apply only to provisional SITE-001. |
| Commercial services | 164.12 ha [metric:land_use_area_sqm_05] | Supports Dazhongsi experience, civic review and SME services; it is not a development entitlement. |
| Residential | Urban 161.13 ha [metric:land_use_area_sqm_0701]; rural residential 137.20 ha [metric:land_use_area_sqm_0702] | Keeps everyday living and care interfaces; ownership and renewal method require survey. |
| Public services | Research 137.28 ha [metric:land_use_area_sqm_0802]; culture 54.30 ha [metric:land_use_area_sqm_0803]; education 126.05 ha [metric:land_use_area_sqm_0804]; sports 32.77 ha [metric:land_use_area_sqm_0805]; healthcare 68.71 ha [metric:land_use_area_sqm_0806] | Supports question posing, validation and public services without granting parcel permission. |
| Open space and reserve | Park 145.02 ha [metric:land_use_area_sqm_1401]; protective green 23.94 ha [metric:land_use_area_sqm_1402]; square 53.41 ha [metric:land_use_area_sqm_1403]; reserve 37.36 ha [metric:land_use_area_sqm_16] | Prioritises cross-corridor shade, stormwater, everyday stay and reversible trials. |

| Building prototypes | Current quantity | Use limit |
| --- | --- | --- |
| Footprint | 101,646 m² [metric:building_footprint_area_sqm], 0.8906% of SITE-001 [metric:building_footprint_ratio] | Twenty-four conceptual prototypes [metric:building_prototype_count], not an existing-building inventory. |
| Intervention | Retain 8 [metric:retain_prototype_count]; renovate 8 [metric:renovate_prototype_count]; infill 8 [metric:infill_prototype_count] | Each object still requires title, structure, fire, heritage and actual-use review. |

| Active travel, Blue-Green and Public Space | Current quantity | Design use and limit |
| --- | --- | --- |
| Green space | 1,144,469 m² [metric:green_space_area_sqm], 10.03% [metric:green_ratio]; cross-corridor and node space contributes about 94.51% | Prioritises cross-corridor shade, river buffers and pocket care space; not an approved green line. |
| Public scenario space | 101,648 m² [metric:public_space_area_sqm], 0.89% [metric:public_space_ratio] | Design envelopes for twelve scenarios; legal public access is not established. |
| Active-travel network | Total [metric:road_centerline_length_m]; cross-corridor stitches [metric:cross_corridor_slow_length_m]; local longitudinal supports [metric:longitudinal_slow_length_m] | Thirteen conceptual lines [metric:road_feature_count]: nine cross-corridor [metric:cross_corridor_count] and four local longitudinal [metric:longitudinal_line_count]. They are not road redlines or engineering design. |

| Three implementation packages | Current quantity | Relationship to scenario test levels |
| --- | --- | --- |
| PHASE-001 | [metric:phase_1_area_sqm], [metric:phase_1_ratio] | G0/G1: question posing, rights clearance, baseline and reversible repair. |
| PHASE-002 | [metric:phase_2_area_sqm], [metric:phase_2_ratio] | G2: closed co-solving and controlled validation. |
| PHASE-003 | [metric:phase_3_area_sqm], [metric:phase_3_ratio] | G3/G4: supervised review, adoption or retirement. |
| Overall | Three packages [metric:phase_count] cover SITE-001 [metric:phase_coverage_ratio] | Maturity envelopes, not a fixed development programme. |

| Tasks and key areas | Current quantity | Use limit |
| --- | --- | --- |
| Three key areas | Total [metric:key_area_total_sqm]; Zhongzhiyuan [metric:key_area_zhongzhiyuan_sqm], AI Origin [metric:key_area_ai_origin_sqm], Dazhongsi [metric:key_area_dazhongsi_sqm] | [metric:key_area_count] is 3; areas follow provisional_rough polygons. |
| Public programme | Twelve scenarios [metric:scenario_count], six personas [metric:persona_count], eight cases [metric:case_count], three landmarks [metric:landmark_count] | Counts describe proposal content, not approved operations. |
| Formal constraints | Zero current features [metric:constraints_feature_count] | This means constraint geometry is missing from the package, not absent in reality. |
| Pending official data | [metric:floor_area_ratio], [metric:gross_floor_area_sqm], [metric:road_area_sqm] | Require statutory controls, countable building area and official road polygons/redlines respectively. |

compliance_matrix.json maps 17 announcement tasks and agent.1–agent.6, 23 in total, to different sections, layers, metrics, drawings, sources and self-checks instead of a uniform payload. standard_matrix.json marks five available standards addressed while preserving the architecture design-depth reference as nonmandatory data_gap. All fifteen core items in design_depth_matrix.json are complete because the required deliverable chain has been fully expressed; each item separately records official_data_gap so complete never implies that official boundaries, controls, ownership, surveys or engineering evidence have been obtained. [depth:metrics_recalculation] [standard:MOHURD-CONTROL-DETAILED-PLANNING]

Polygon replacement, area recalculation, matrices and figures must share one version. If an official polygon arrives while any ratio, figure or reference retains a provisional result, the evidence package is inconsistent.

![Area, coverage relationships and delivery conditions](assets/figures/metrics-evidence.en.png)

## Risk, Copyright, and Compliance

| Risk | Control and exit |
| --- | --- |
| Provisional geometry mistaken for official control | Keep provisional labels visible; recalculate the package when official polygons arrive and archive the superseded version without continued use [source:PROVISIONAL-BOUNDARIES] |
| Ownership, DRR or engineering overclaim | Provide screening methods and Conceptual Recommendations only; no parcel conclusion without ownership, control, appraisal, municipal, fire and heritage evidence [depth:risk_missing_data] |
| AI data, privacy or safety event | Data minimisation, purpose limitation, human takeover, incident record, appeal and timed deletion; high-risk scenarios cannot skip gates |
| Commercial display presented as public certification | Show provider, method, validity and limitation; never use “certified” or “approved” without authority |
| Failure hidden from view | Publish failed, voluntarily stopped, complained-about, revised and retired items alongside success; no retrospective means no promotion |
| Digital exclusion and maintenance burden | Offline, human, telephone and paper channels remain; include residents and frontline operators and pause a tool that adds burden |
| Events displace everyday life | Everyday care takes priority; shrink, reschedule or cancel when noise, access, ecology or complaints cannot be controlled |
| Copyright and brand risk | The asset-by-asset rights ledger is in report/copyright_statement.md; no external image, third-party font file, corporate trademark or portrait is used |

The proposal text, VI direction and program-derived figures are original to this submission. Cases are cited by factual name and URL only; no website image, logo, layout or long text is copied. AI tools assist research, writing, structuring and derived expression but cannot assume legal or professional responsibility. The GitHub submitter remains responsible for sources, rights, data, translation, spatial and engineering review and the final submission. [source:ARCH-DESIGN-DEPTH-DATA-GAP] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

Every spatial, operational and policy item is a Conceptual Recommendation, reference scheme or material for professional teams to deepen. Nothing constitutes a government commitment, planning approval, precise regulatory control, ownership judgment, DRR decision, engineering feasibility conclusion, investment estimate, procurement, investment attraction, funding or confirmed event arrangement.

## References

- [source:OFFICIAL-ANNOUNCEMENT] Centennial Jing-Zhang AI Innovation Belt official prequalification announcement: formal tasks and scope semantics.
- [source:AGENT-TASKBOOK] Cleared agent-facing open-call taskbook excerpt: brand, ecosystem, scenarios, culture, operation and common boundary clause.
- [source:MOHURD-URBAN-DESIGN-MEASURES] Measures for the Administration of Urban Design, local official snapshot.
- [source:MOHURD-CONTROL-DETAILED-PLANNING] Measures for the Preparation and Approval of Regulatory Detailed Plans for Cities and Towns, local official snapshot.
- [source:MNR-LAND-USE-CLASSIFICATION] national territorial-spatial land and sea-use classification guide, local official snapshot.
- [source:PROVISIONAL-BOUNDARIES] repository provisional rough polygons, for generation, self-check, diagrams and discussion only.
- [source:ARCH-DESIGN-DEPTH-DATA-GAP] missing-official-file record for the 2016 architecture design-document depth provisions.
- [source:CASE-AISINGAPORE-100E], [source:CASE-MILA], [source:CASE-VECTOR-INSTITUTE], [source:CASE-PUNGGOL-DIGITAL-DISTRICT], [source:CASE-SHANGHAI-MOSU-SPACE], [source:CASE-PITTSBURGH-ROBOTICS], [source:CASE-KNOWLEDGE-QUARTER-LONDON] and [source:CASE-STATION-F]: eight background_case_study records, each accessed on 2026-08-08; URLs and permitted/prohibited uses are in sources.json.
- Professional response index: [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].
- Design-depth index: [depth:existing_conditions_diagnosis], [depth:three_level_scope_framework], [depth:overall_spatial_structure], [depth:land_use_layout], [depth:development_intensity_controls], [depth:height_massing_character], [depth:retain_renovate_demolish], [depth:traffic_rail_slow_parking], [depth:municipal_new_infrastructure], [depth:blue_green_public_space], [depth:three_key_area_detailed_design], [depth:renewal_project_list], [depth:phasing_implementation], [depth:metrics_recalculation], [depth:risk_missing_data].
