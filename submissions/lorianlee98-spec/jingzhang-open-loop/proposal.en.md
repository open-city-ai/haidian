---
title: "Jing-Zhang Proofline"
title_en: "Jing-Zhang Proofline"
author_github: "lorianlee98-spec"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Along the Jing-Zhang Railway Heritage Public Space, integrate research, constrained testing, daily public value, and traceable review into an open and trustworthy AI urban innovation protocol."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# Jing-Zhang Proofline

**Jing-Zhang Proofline**

> **Motto: Turn Research and Development into Evidence, Return Evidence to Daily Life.**
>
> *Turn research into proof; return proof to daily life.*

This proposal interprets the Jing-Zhang Railway Heritage Public Space as a "Common Witness Line": not by drawing a new red line, but by weaving research nodes, controlled testing, resident-perceivable services, and public debriefing into a walkable public path. Every time AI intervenes, it must answer five questions: why it is being done, what is the minimum required data, what to do without a digital system, who is responsible for the results, and when to accept complaints, exit, or stop. Thus, research no longer remains within the confines of the park, and public space is not treated as a technical showcase window, but becomes a field for questioning, testing, rejecting, and correcting as a shared evidence space.

**Design Status Statement.** This text is a conceptual and open reference proposal serving Urban Design research, public discussion, and subsequent elaboration by professional teams; it is not a statutory plan, Regulatory Detailed Planning, engineering feasibility study, confirmed implementation plan, investment commitment, approval conclusion, or any government commitment. The current `site_boundary.geojson` and `key_areas.geojson` are temporary rough boundaries, and all spatial judgments must be re-verified after obtaining official polygons, regulatory detailed planning, ownership, engineering, and cultural heritage documentation. Where there are no official conditions, the Floor Area Ratio, Building Height, density, road red lines, demolish–renovate–retain strategy, and municipal conclusions shall not be written as control indicators. (Demolish–Renovate–Retain Strategy)

## Design Basis and Source List

This proposal begins with the public announcement, project site package, documentation registry, and processing facts package, rather than with an imagined master plan. The project purpose, three layers of scope, and task boundaries are referenced from [source:OFFICIAL-ANNOUNCEMENT]; the agent co-creation requirements, three positioning principles, five functional areas, and six tasks are referenced from [source:AGENT-TASKBOOK]; the file and field boundaries are referenced from [source:SITE-PACKAGE] and [source:SOURCE-REGISTRY]; readable navigation is referenced from [source:PROCESSED-FACT-PACK]; the temporary overall boundaries and key area indexes are referenced from [source:BOUNDARY-SOURCE] and [source:KEY-AREA-SOURCE]. The additional global case studies are provided merely as background and transferable mechanisms for reference: [source:CASE-ONE-NORTH], [source:CASE-MILA], [source:CASE-VECTOR], [source:CASE-KNOWLEDGE-QUARTER], [source:CASE-KENDALL], [source:CASE-STATION-F].

The evidence structure follows [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], and [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]. Among these, the latter architectural depth standard is only provided as a deepening reminder before the site package is formally included, and does not generate a legal conclusion.

### How are the materials to be used?

| Layers of Information | Usage of This Plan | What We Are Not Doing |
| --- | --- | --- |
| Announcement and Terms of Reference | Confirm the purpose of the assignment, spatial hierarchy, names of the three key areas, and the responsibility for the outcomes | Do not write the conceptual terms of reference as a construction approval |
| Public/Clarity Rights Registration | Track the source, permits, and risks for each judgment | Do not upgrade background-only or provisional-only data to official control |
| Temporary Geometry | Organize Discussions, Scene Placement, Visualization, and Preliminary Recalculation | Not to be Used as Official Redline, Accurate Area, Approval, or Investment Basis |
| Global Open Call | Extract mechanisms for transferring "how to organize collaboration, testing, dissemination, and community interfaces" | This does not claim that the Jing-Zhang boundary, management rights, financing, or operations are determined |
| Known Metrics | To serve as a baseline for the submitted geometry, facilitating recalculation after official data is replaced | Do not substitute derived geometric values for planning conditions or performance outcomes |

### Current readable space evidence

This text sequentially references the existing nine GeoJSON files. Their file names and object IDs are readable indices, not assertions about spatial entitlements:

| File | Current Readable Object | Evidence Reference |
| --- | --- | --- |
| `geometry/site_boundary.geojson` | provisional Overall Design Area `SITE-001` | [data:geometry/site_boundary.geojson#SITE-001] |
| `geometry/key_areas.geojson` | three temporary key areas `PROV-KEY-001/002/003` | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |
| `geometry/land_use.geojson` | `LU-001` to `LU-004` Suggested Land Use Zones | [data:geometry/land_use.geojson#LU-001], [data:geometry/land_use.geojson#LU-002], [data:geometry/land_use.geojson#LU-003], [data:geometry/land_use.geojson#LU-004] |
| `geometry/buildings.geojson` | `BLDG-001` Building Footprint Suggestion | [data:geometry/buildings.geojson#BLDG-001] |
| `geometry/roads.geojson` | `ROAD-001` Suggested Pedestrian and Innovation Service Corridor | [data:geometry/roads.geojson#ROAD-001] |
| `geometry/green_space.geojson` | `GREEN-001` Continuous Park Green Space Suggestion | [data:geometry/green_space.geojson#GREEN-001] |
| `geometry/public_space.geojson` | `PUBLIC-001` Suggested Public Activity Interface | [data:geometry/public_space.geojson#PUBLIC-001] |
| `geometry/constraints.geojson` | currently an empty constraints layer, retain the `CONSTRAINTS` evidence bit | [data:geometry/constraints.geojson#CONSTRAINTS] |
| `geometry/phasing.geojson` | `PHASE-001` Phase 1 Discussion Scope | [data:geometry/phasing.geojson#PHASE-001] |

![Evidence Chain and Spatial Structure Indication for Station-City Integration: The Relationship between Boundaries, Three Fields, Two Wings, and Public Agreements](assets/figures/site-overview.png)

`SITE-001` and the `PROV-KEY` objects must retain their `official_boundary=false` and `provisional_constraint` attributes. Since the existing `constraints.geojson` has no features, it cannot replace the road right-of-way, utility lines, fire safety, or cultural heritage control lines. The recalculation sequence after the Official Boundary is in place should be documented in `assumptions.json`, without altering the geometry, metrics, or drawings in this content update.

## Three-Level Scope Framework

This proposal forms a "research—validation—daily" scale gradient through three layers: [depth:existing_conditions_diagnosis], [depth:three_level_scope_framework], and [depth:overall_spatial_structure] collectively constrain the current diagnosis, scope relationships, and overall structure.

| Level | Task Scale | Spatial Response to Co-Produced Lines | Evidence and Constraints |
| --- | --- | --- | --- |
| Coordinated Research Area | Approximately 43.6 square kilometers as described in the announcement, from the North Fifth Ring Road, Jingzhang Expressway, Xizhimenwai Avenue to Wancuihe Road | Form a research map for the creation of an innovative ecosystem, public value, and regional synergy, without drawing new legal boundaries | The task scope is based on [source:OFFICIAL-ANNOUNCEMENT] and [source:PROCESSED-FACT-PACK]; formal polygon to be added |
| Overall Design Area | Annexed to the notice, the design context for the approximately 11.4 hectares surrounding the Jing-Zhang Heritage Park, within 1-2 kilometers. | Along the Jing-Zhang Heritage Public Space, connect the three venues and the two wings; align land use, buildings, roads, blue-green spaces, and phased development. | Provisional Boundary see [data:geometry/site_boundary.geojson#SITE-001]; Area Baseline see [metric:site_area_sqm] |
| Key-Area Detailed Design Area | The three key areas as described in the announcement, covering approximately 368.4 hectares | Each of the three venues has an experiential public interface, bookable test facilities, and a replay community mechanism | All three polygons are provisional, see [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

Three layers are not three independent sets of outcomes. The research layer identifies questions and partners; the overall layer transforms these questions into paths, site components, service nodes, and phased thresholds; the focal area layer transforms these nodes into micro-experiments that are bookable, observable, and complaintable. Each item must be composed of "question—minimum data—human responsibility—public feedback—stop conditions" to be eligible for progression to the next scale. The existing site map layers provide the base maps for land use, buildings, roads, green spaces, Public Spaces, and phased discussions. Formal boundary replacements must be re-verified for topology and area.

![Three-tier scope and spatial work framework: evidence flow across the research level, overall level, and key area level](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Three key positioning and five major functions

Three key orientations are derived from the mandate, but in this proposal, they are reorganized through spatial experience:

1. **Jing-Zhang Cultural Belt**: Establish a walkable, readable, and pausable urban narrative line based on heritage tracks and public memory.
2. **Urban AI Living Experience Belt**: Transform AI into everyday services that are both rejectable and explainable, rather than just technology showcased in closed-off campuses.
3. **AI Integration Innovation Belt**: Incorporate university research, open-source collaboration, corporate transformation, scenario validation, and public review into a single feedback loop.

The five functional areas are handled by "spatial interfaces + responsible parties":

| Function | Translation of Co-Produced Lines | Main Interfaces |
| --- | --- | --- |
| Full-Stack Independent AI Innovation System | Public Methods, Limits, and Results in Restricted Test Space | Zhongzhiyuan's Trust & Test Garden |
| World-Class AI Innovation Ecosystem | Connecting research, open-source, translation, enterprise services, and talent living | AI Origin Community's Translation Commons |
| AI-Enabled Scenario Enablement Paradigm | Verified Public Value with Minimal Data, Non-Digital Substitutes, and Exit Mechanisms | Xiaoyue River Scenario Enablement Wing |
| Intelligent AI Vital City | Making Public Space, Active Transportation, Services, and Cultural Activities a Daily Experience | Jing-Zhang Line and the City Echo Platform |
| AI Governance Global Discourse | Make evidence cards, review records, complaints, and deactivation decisions transparent and archived | Annual Proofline Review |

The above task has been translated back to [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] and [source:AGENT-TASKBOOK]; this section does not claim that any industry, activity, management authority, or policy has been implemented.

### one line, three fields, two wings, one open agreement

- **Line 1 | Heritage Rail Public Space Spine**: Organize a continuous reading, slow travel, and pause along the Jing-Zhang heritage public space; it is the concept skeleton for public space and operations, not a new track, road right-of-way, or construction alignment.
- **Three Proof Spaces**:
  - **Zhongzhiyuan | Trust & Test Garden**: Convert the testing of models, standards, safety, and low-carbon computing power into garden-type verification sites that are bookable, observable, and revocable.
  - **AI Origin Community | Translation Commons**: Place academic papers, code, products, laws, and resident issues on the same "translation long table" to provide cross-disciplinary interpretation and conversion interfaces.
  - **Dazhongsi | Civic Interface Exchange**: Organize the commuter, business, consumption, and public feedback around the rail station into an evidence-based urban interface exchange.
- **Two Relays｜Two Relays**:
  - **Zhongguancun Technology Services Wing | resource relay**: A directory of referrals for computational power, intellectual property, legal, financing, and talent services; it only serves as a resource navigation and collaboration platform, making no promises regarding funding or access.
  - **Xiaoyue River Scenario Enablement Wing | Daily-life Scenario Relay**: Convert medical, educational, legal, living services, active transportation, and ecological issues into everyday scenarios that can be validated on a small scale; only use necessary aggregated data.
- **An Open Call Protocol**: Any scenario must be open about its purpose, minimum data required, non-digital alternatives, responsible party, complaint/exit/stop rules, version, and review date; residents, staff, and developers can request to view or challenge evidence cards.

This structure converts the district names into "work roles," without altering the scope of the announcement or interpreting the `PROV-KEY` polygon as a legal boundary. `[depth:overall_spatial_structure]` and `[data:geometry/key_areas.geojson#PROV-KEY-002]` together provide verifiable spatial anchors.

### Name, Logo, Color, and Wayfinding

- **Main Name**: Jing-Zhang·Common Evidence Line; **English**: Jing-Zhang Proofline; "Proofline" refers to both the track line, the Evidence Chain, and a traceable iterative path.
- **Slogan:** Turn R&D into evidence, and return the evidence to everyday life. Both the Chinese and English slogans promise an open and transparent verification process, not technical outcomes.
- **Logo Direction**: The logo uses two open parallel lines to represent the historical track and contemporary data chain. An "open box" is used in one place to form a station/evidence window; the blank space within the window represents where the public can insert questions, refuse to use, or request a review. The lines, boxes, and text are all original and do not call upon corporate trademarks, personal likenesses, unauthorized fonts, or old logos.
- **Original Color Palette**: `Rail Silver #7B8C93` (track and background lines), `Sleeper Ink #1D252A` (body text and nighttime background), `Qinghe Teal #197C78` (blue-green and sustainable actions), `Signal Orange #D96B38` (caution/stopping signals), `Paper Proof #F3EEE3` (paper evidence), `Commons Violet #695B8D` (translated and community activities). Orange is only used for actions and risks, not for decorative gradients; text contrast, color blindness readability, and large font sizes must be confirmed by subsequent accessibility review.
- **Signage Direction**: Each node uses a three-layer coding system of "line segment—station number—evidence card number"; color is used in conjunction with text, tactile lines, and graphics but not as the sole means of conveying information. Signage provides Chinese, English, pinyin/numbering, directions for wheelchair accessibility, quiet routes, and paper instructions; there are printed maps, manned information booths, and entry points for phone or on-site feedback at each node.

### Six global case studies and transferable mechanisms (for background reference only)

The following table strictly selects six cases; the corresponding public homepage is only used for understanding the organizational structure and transfer mechanisms, and does not support the boundaries, controls, list of companies, investment amounts, approvals, or government commitments of the Jing-Zhang.

| Case | Mechanisms That Can Be Drawn From Public Documentation | Actions to Convert to Co-Produced Lines | Usage Restrictions |
| --- | --- | --- | --- |
| **Singapore One-North** | Forming a composite interface of a creative district with research, industry, living, and Public Space | Organizing the referral of resources from research to daily life through "one line + two wings" rather than replicating its planning form | Background reference only; cannot be used to infer the development control or governance authority for Haidian; [source:CASE-ONE-NORTH] |
| **Mila** | Research institutions, talent communities, and open exchanges collectively form a visible research ecosystem | Publish problem definitions, test boundaries, and method descriptions in the Trust & Test Garden | Background reference only, no export of research institution relationships, operating entities, or performance commitments; [source:CASE-MILA] |
| **Vector Institute** | Translate the interface for trustworthy AI through research, talent, industry partners, and public discourse | Use Translation Commons to translate research language into evidence cards that residents, businesses, and service providers can verify | Background reference only, does not represent any partnership, authorization, or model capabilities; [source:CASE-VECTOR] |
| **Knowledge Quarter** | Cultural, knowledge institutions, and public activities can form a walkable urban knowledge network | Link heritage reading, open-source activities, and public debriefing through the Heritage Rail Public-Space Spine | Background reference only, does not prove the existence of equivalent organizations or boundaries in the Jing-Zhang area; [source:CASE-KNOWLEDGE-QUARTER] |
| **Kendall Square** | High-frequency interactions between research, enterprise, street life, and Public Space can support an innovation ecosystem | Configure a mixed interface for commuting, business, consumption, and public feedback at the Civic Interface Exchange | Background reference only, not used to infer land value, industrial scale, transportation capacity, or Development Intensity; [source:CASE-KENDALL] |
| **Station F** | By reducing the entry barriers to the innovation network through shared infrastructure, entrepreneur communities, and public events | Provided by the Zhongguancun Technology Services Wing with "resource relay" services, including appointment and clear eligibility conditions for service teams | Only background reference, does not indicate the adoption of its brand, operational model, investment relationships, or attraction outcomes; [source:CASE-STATION-F] |

Transfer is not a form of replication but a process of breaking down mechanisms into four checkable actions: **Common Problem List** (whose problem), **Minimum Test Package** (only what data), **Public Interface** (who can see/ask/reject), and **Annual Review** (when to continue/rewrite/stop). The public homepages of the six cases serve only as background research for agent.2 and do not become sources of facts or planning controls.

### Jing-Zhang—Zhongguancun—AI's Cultural Narrative

Public Space is divided into three acts to tell a story: In the first act, **railways bring knowledge and people together** — not commodifying railway heritage, but making the tracks, stations, underpasses, and along the route public spaces into layers of time to be slowly read; in the second act, **Zhongguancun transforms knowledge into collaboration** — universities, developers, enterprises, service providers, and residents each bring their problems to the translation table, not reducing "innovation" to a logo of a single company; in the third act, **AI transforms collaboration into quotable daily services** — each scene leaves behind purposes, data, human judgments, and deactivation records, making urban intelligence end with the dignity and choices of people.

Culture is expressed through three carriers: the **Timeline** along the tracks records verifiable public documentary sources; the **Contribution Scale** between the community and the park records the types of contributions such as code, research, maintenance, and resident feedback; and the **Review Scale** at service nodes records how a test was adopted, modified, or discontinued. Historical information must be verified by cultural heritage and documentary experts; characters, photos, trademarks, and images of papers do not enter the visual system until clearance is obtained.

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Implementation of Structure: From Spatial Zoning to Public Agreement

The overall design incorporates the "one line, three fields, two wings" into readable spatial zones but does not pretend to substitute the suggested zones for the control plan:

| Spatial Object | Design Action | Current Evidence | Pending Confirmation Control |
| --- | --- | --- | --- |
| `LU-001` AI Research and Development Innovation District | Allows research, open-source, testing, and demonstration forming the ground-floor public interface | [data:geometry/land_use.geojson#LU-001], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] | land_use_code, ownership, intensity and admission conditions |
| `LU-002` Public Parks and Open Spaces | Integrate evidence garden terraces, pedestrian and ecological education, without continuous surveillance | [data:geometry/land_use.geojson#LU-002], [data:geometry/green_space.geojson#GREEN-001] | Green spaces, blue lines, cultural heritage, fire safety, and flood control conditions |
| `LU-003` Industrial and Commercial Service Land Use | Continues the Dazhongsi Civic Interface Exchange and the resource relay of Zhongguancun | [data:geometry/land_use.geojson#LU-003] | Current Business Types, Ownership, Transportation Capacity, and Commercial Permits |
| `LU-004` Community Services and Accompanying Land Use | Accommodating Daily Life Scenarios, Artificial Services, and Accessible Rest Points | [data:geometry/land_use.geojson#LU-004] | Facility Baseline, Service Radius, Community Feedback, and Operational Entity |

The proposal follows the [standard:MOHURD-URBAN-DESIGN-MEASURES] approach of integrating plan with three-dimensional considerations, as well as the layered expression in [standard:MOHURD-CONTROL-DETAILED-PLANNING] for "known, proposed, to be confirmed." `[depth:land_use_layout]`, `[depth:development_intensity_controls]`, and `[depth:height_massing_character]` only describe the design logic; they do not input unverified FAR, Building Height, density, setbacks, or building control lines.

### Buildings and Demolish–Renovate–Retain Strategy

`BLDG-001` is the design suggestion layer for the AI R&D demonstration Building Footprint. The current `building_footprint_area_sqm` can only serve as a geometric baseline, as seen in [data:geometry/buildings.geojson#BLDG-001] and [metric:building_footprint_area_sqm]. In the absence of current survey data, construction era, number of floors, use, ownership, and cultural heritage investigation, all building objects are discussed under three "work tags" rather than making demolition decisions.

- **Preserve/Read**: Preserve readable tracks, streets, building edges, and community services, and supplement with accessibility and safety improvements; this does not equal confirming heritage status.
- **Reinterpret/Redevelop**: Transform existing spaces into collaborative platforms through ground-level public interfaces, reversible furniture, shared workstations, and exhibition areas; subject to confirmation by the owner and professional design.
- **Updated/To Be Confirmed**: Mark buildings that may require updates as to-be-confirmed objects. Conduct small-scale, reversible facilities and usage tests first. Once the surveying, control planning, fire safety, and property conditions are complete, then develop the engineering plan.

This method responds to [depth:retain_renovate_demolish], also implementing the "activate upon obtaining formal documents" restriction from [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]. Any words "demolish, construct, add height, expand" in this plan can only represent assumptions to be verified by professional teams.

### Three Faces and Two Wings Update Interface

- Zhongzhiyuan prioritizes forming a "garden—test room—evidence desk" low-disturbance gradient; technical testing is conducted in reservable, restricted spaces, with the public face only displaying methods, limitations, and desensitized results.
- AI Origin community forms a gradient of "quiet work—translation long table—results presentation—community daily activities"; the released content provides printed and manual explanations, without requiring the inclusion of campus, park, or resident data as necessary conditions.
- Dazhongsi forms a gradient from "station to street corner—Civic Interface Exchange—commercial services—urban echo chamber"; the focus is on accessibility, parking, inquiry, and exit, rather than large-scale architectural actions.
- The Zhongguancun Technology Services Wing acts as a resource relay: establish a public service directory and referral periods, recording types of needs rather than individual trajectories.
- The Xiaoyue River Scenario Enablement Wing will conduct daily scenario relay: entering through issues such as rainwater management, flood control, pedestrian access, education, health, and living services, and first conducting reversible validation before deciding whether to expand.

## Detailed Design of Key Areas

Three key areas are defined by temporary polygons as the current discussion "site envelope," rather than official boundaries; they are respectively referenced by [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], and [data:geometry/key_areas.geojson#PROV-KEY-003]. The design depth is verified by [depth:three_key_area_detailed_design], and each action is linked to Public Space, roads, green spaces, buildings, and phased evidence. (Official Boundary)

### Zhongzhiyuan | Trust & Test Garden

**Spatial Proposition: Test in the Garden, Explain in the Public Realm.** The northern field forms a low-threshold validation garden with continuous green spaces and a welcoming boundary: the inner area is a reservation-based, isolatable, and stoppable model and service test; the outer area is an evidence garden with paper explanations and non-digital experiences. The primary task is not to build new volumes but to make three cards that can be understood by passersby, detailing "test conditions—Human Review—result limitations."

- **Three Spatial Belts**: Quiet Study Belt, Observation Verification Belt, and Open Exchange Belt; the belts are distinguished by removable barriers, plantings, and signage, without relying on cameras.
- **Three Public Actions**:
- Weekly Safety Governance Sandbox Observation Session
- Monthly Public Interpretation of Low-Carbon/Rainfall Management and Pedestrian Data
- Quarterly Community Stop/Go Review
- **Industrial Interface**: The resource relay at Zhongguancun only provides service referrals; model safety, standards, and intellectual property issues are handled by the relevant professionals, with AI not replacing the approval process.
- **Verification Boundaries**: Only test cases submitted by scheduled teams, aggregated environmental data, and manual observations are permitted; prohibit the use of facial images, identifiable trajectories, and research materials without consent.

### AI Origin Community | Translation Commons

**Spatial Proposition: Place Different Languages at the Same Table.** The Yuandian community focuses on an on-campus interface that emphasizes research—translation—living: quiet research and open-source spaces facing the team, translation long tables facing residents and service personnel, a results hall facing public events, and a consultation desk set at the periphery that can be offline.

- **Transliterate Long Table** provides four layers of explanation in Chinese/English/graphics/tactile: any release simultaneously presents purpose, evidence, unknowns, and contentious items.
- **Near-School Technology Transfer Street** uses a reversible first-floor interface to accommodate intellectual property, legal services, entrepreneurship consulting, and public presentations; it does not pre-approve the transformation of universities, parks, blocks, or buildings.
- **Daily Support for Talent** should prioritize the provision of affordable rest areas, childcare/eldercare information, nighttime safety, accessible restrooms, and manned inquiries, to avoid reducing "talent" to high-intensity workers.
- **Exit Mechanism**: Teams can choose to publish in print or withdraw immature results; residents can opt not to provide data, instead participating in in-person interviews or reviewing public records.

### Dazhongsi | Civic Interface Exchange

**Spatial Proposition: Transform Busy Nodes into Questionable Urban Interfaces.** Dazhongsi focuses on the relationship between pedestrian continuity around the station, the readability of the four quadrants, public services, and commercial interfaces; it does not propose specific alignments for tracks, roads, underground spaces, or bridges.

- **Quadrant Four Stations** establish a walking experience with a sequence of "accessible entrance—short pause—direction confirmation—feedback counter"; each direction provides parallel information including stairs, ramps, quiet detours, and manned inquiries.
- **Intelligent Natively Generated Activities** employ small-scale, modular display tables, repair/learning/demonstration slots, and content consumption interfaces to serve a public explanation of smart body, terminal, and data governance, without treating corporate logos as public value.
- **City Echo Chamber** receives complaints from residents, commuters, and visitors regarding congestion, noise, accessibility, service misdirection, and privacy; paper cards, telephone calls, in-person oral reports, and online forms (if any in the future) are all equally effective.
- **Stop Triggering**: When misleading recommendations, unexplainable denial of service, accessibility barriers, or unauthorized data collection are detected, the on-site supervisor must first deactivate the scenario before conducting a public debriefing.

![Three key areas index and three field two wings design tasks: Zhongzhiyuan, Yedian Community, Dazhongsi](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

This section translates the innovative ecosystem into a "people-scenario-space-responsibility" readable protocol: tasks are based on [source:AGENT-TASKBOOK] and [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], spatial interfaces revert to [data:geometry/public_space.geojson#PUBLIC-001], and are constrained by their relationship with the three-dimensional scope within [depth:overall_spatial_structure].

### Seven Categories of Users and Responsibility Relationships

The image is not a monitoring template, nor does it require the collection of personal identifiers; it only describes the needs that the design aims to serve and the potential obstacles.

| Image | Key Needs | Potential Barriers | Countermeasure Responses |
| --- | --- | --- | --- |
| Open Source Developer | Low-barrier Release, Collaboration, Testing, and Contribution Tracking | Credential Thresholds, Expression Language, Nighttime Safety | Translation Commons, Print/Manual Release, Reversible Contributions |
| Founding Team | Explainable Testing, Resource Relays, and Legal Referrals | Costs, Data Authorization, Trial Risks | Trust & Test Garden, resource relay, appointment for a trial run |
| College Students and Faculty | Research Translation, Results Protection, Daily Slow Mobility | Research Ethics, Intellectual Property, Time Fragmentation | Translate Long Tables, Desensitize Evidence Cards, Near-School Rest Points |
| Lead Corporate Visitors | Public Display, Business Exchange, Talent Communication | Corporate Data and Brand Clearing | Civic Interface Exchange, Clear Authorization Release Window |
| Nearby Residents | Commuting, Leisure, Community Services, Quietness and Safety | Digital Thresholds, Noise, Privacy Concerns | Manual Inquiry, Paper Maps, City Echo System, Non-Digital Alternatives |
| Accessible Users | Continuous Accessibility, Clear Direction, Equal Feedback | Slopes/Steps, Low Contrast, Hearing/Visual Impairments | Accessible Route Review, Tactile Signage, Subtitles/Sign Language/Manual Accompaniment |
| Public Services and Maintenance Personnel | Operable Alerts, Work Orders, Responsibilities, and Disabling Rights | Ambiguity of Responsibility, System Illusions, Resource Shortages | Designated Responsible Party per Scenario, Dual Verification, Paper-Based Work Orders, and Stop Button |

### Scenographic Protocol

Scenarion cards are not allowed to simply state "use AI to increase efficiency." Each card must clearly specify six elements: purpose, minimum data, non-numeric alternatives, accountable human (Chinese responsible person), complaint/exit/stop rules, and a debrief date. The "testing/verification" in the table indicates a limited trial within the conceptual governance framework, not approval for deployment.

| Card | Type and Space | Purpose and Validation Questions | Minimum Data | Non-Digital Alternative | Responsible Party | Complaints / Exit / Stop Rules |
| --- | --- | --- | --- | --- | --- | --- |
| 01 Evidence Garden Navigation | **Testing/Validation**; Zhongzhiyuan Entrance | Verify whether visitors can find a quiet, barrier-free, and staffed route | Static routes, time periods, facility status; no human tracking | Paper maps, guided assistance, tactile paths | Site accessibility coordinator | Any route misdirection or blockage to be discontinued; on-site/paper card feedback, visitors can opt out of digital navigation |
| 02 Safety Governance Sandbox | **Testing/Validation**; Trust & Test Garden | Verify that the safety rules can be understood by the public and reviewed by humans | Schedule testing examples, rule versions, and manual judgments | Paper-based red team scripts and manual review meetings | Safety Evaluation Lead + Community Observer | Testing halted if results are unexplainable, examples are leaked, or if there is an unauthorized breach; the team can withdraw the example |
| 03 Low-Carbon and Rainfall Explanation Platform | **Testing/Validation**; Qinghe/Xiaoyuehe Public Interface | Validate whether environmental data can assist in daily choices without creating false precision | Aggregate temperature, humidity, rainfall, and green space conditions | Paper-based weather/advice for walking, on-site caretaker | Blue-Green Space Maintenance Supervisor | Data drift, warning misguidance, or human recognition issues halt operations; public participation is optional |
| 04 Pedestrian and Cyclist Connectivity Gaps Observation | **Testing/Validation**; Continuous Segment | Identify pedestrian/cyclist/wheelchair connectivity gaps, compare manual observation with low-intrusive tools | Anonymous counts, barrier points, time periods, and manual records | Paper-based audit, barrier-free walk-through | Traffic and Accessibility Auditor | Do not collect trajectories; if hazards are detected, remove equipment and revert to manual recording |
| 05 Original Results Translation | Translation Commons | Verify that the research abstract can be understood by residents and service personnel | Author-authorized abstract, charts, and version numbers | Paper abstract, verbal explanation, offline exhibit | Translation editor + Original author | Author can retract; removed and publicly corrected for mistranslation, copyright disputes, or missing citations |
| 06 Open Source Release Hall | AI Origin Community | Supports the open release of code/methods/issues, recording contributions rather than personal profiles | Authorizes release packages, licenses, and contact roles | Paper-based release binder, manual registration | Community Operator | Stops release if licenses are unclear or personal information is disclosed; anonymous contributions are allowed. |
| 07 Resource Relay Clinic | Zhongguancun Technology Services Wing | Verify that the team can obtain comprehensible referrals for legal, intellectual property, and computational power | Category of need, appointment time, service catalog | On-site clinic, phone, paper catalog | Technology Services Duty Officer | No automatic qualification determination; erroneous referrals can be complained about, and service provider can be suspended from the catalog |
| 08 Quadrant for Pedestrian Guidance | **Validation**; Conceptual Interface around Dazhongsi Station | Validate the direction information and short pause points to reduce disorientation/conflicts | Static intersections, ramps, construction notices, manual observation | Station entrance volunteers and signs | Station-city Interface Coordinator | No engineering interventions; remove signs upon information expiration and manually correct |
| 09 City Echo Platform | Dazhongsi Public Interface | Collecting Noise, Congestion, Service Misleading, Privacy, and Accessibility Feedback | Voluntary Description, Location Type, Time Period; No Mandatory Identity | Paper Cards, Phone, Face-to-Face Recording | Community Feedback Host | Complaints Can Be Anonymous; Sensitive Content Transferred to Manual Custody, Stop Scenario if Harm Signals Detected |
| 10 AI-Led Living Service Sample Street | Xiaoyue River Scenario Enablement Wing | Verify that the navigation for medical, educational, legal, and life services is understandable. | public service directory, useractively entered problem categories | customer service desk, paper directory, telephone referral | Public Services Coordinator | No diagnosis/lawful conclusion; deactivate if erroneous or unable to undergo Human Review. |
| 11 Quiet Routes at Night | Line with community service node | Verify that nighttime lighting, quietness, rest, and access to artificial assistance are available. | Static Lighting/Open Hours, Volunteer Patrol Records | Paper route, guided tour, phone assistance | Public Space Nighttime Duty Personnel | Do not perform facial/behavior recognition; suspend the route and announce if lighting fails or in case of a safety incident. |
| 12 Proofline Review | Three Rotations | Which Scenarios to Continue, Revise, or Terminate Annually | Evidence Card Version, Aggregated Usage/Complaints/Deactivation Counts | Public Meetings, Paper Opinion Boxes, Manual Reports | Annual Review Panel | Public Can Request Review; Shall Not Be Renewed if No Responsible Party or Non-Digital Alternative Exists |

### Scene Safety Baseline

- **Data Minimization**: Do not collect facial data, voiceprints, precise personal trajectories, health diagnostics, unauthorized research materials, or personal profiles; use static rules, aggregation counts, and manual observations instead of continuous sensing when possible.
- **Human Final Judgment**: AI only proposes prompts, classifications, or candidates; decisions regarding service denials, public safety, healthcare, education, legal matters, copyright, accessibility, and deactivation must be reviewed by named roles, with at least one Human Review record retained.
- **Exit and Non-Digital Alternatives**: All scenarios must provide paper-based, telephone, on-site staff, accessibility assistance, and opt-out options; scenarios without a non-digital alternative are not to enter P1.
- **Complaints and Suspension**: Scenario signs should indicate the responsible person, version, complaint channels, and suspension conditions. Staff have the right to immediately suspend the model without requiring a re-confirmation of the model.
- **Traceable:** Only aggregate statistics, rule versions, and debrief conclusions are publicly disclosed; original feedback is managed with minimum permissions and the shortest retention period, and this article does not establish a personal data system.

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

This section uses [depth:land_use_layout], [depth:development_intensity_controls], [depth:height_massing_character], and [depth:retain_renovate_demolish] as design depth indices. Land use is suggested to use the `land_use_code` and `geometry/land_use.geojson` of `LU-001` to `LU-004`, aligning with the "classifiable" direction in the [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], but does not equate to the planning uses having been approved.

### Layering of Building and Spatial Intensity

| Level | Suggestions That Can Be Made | Conclusions That Cannot Be Drawn | Next Steps for Evidence |
| --- | --- | --- | --- |
| Existing Geometry baseline | Compare Building Footprint, green spaces, Public Spaces, and frontage relationships | Cannot Infer Total Floor Area, Number of Stories, or Ownership from the Footprint | As-Built Survey, Building Inventory, Ownership List |
| Form Guide | Continuous first-floor public interface, reversible shading, roof equipment readable, nighttime low disturbance | Cannot specify exact height, setback, density, or character control lines. | Control Plans, Urban Design Guidelines, Cultural Heritage and Fire Safety Opinions |
| Demolish–Renovate–Retain Strategy Work Label | Retain/Read, Translate/Reuse, Update/Review | Do Not Specify Demolition, Acquisition, Expansion, or Investment | Property Rights, Cadastre, Building Safety, and Professional Design |

`floor_area_ratio` is currently unknown and cannot be inferred from the area table. The baseline for `building_footprint_area_sqm` is found in [metric:building_footprint_area_sqm] and [data:geometry/buildings.geojson#BLDG-001], representing only the suggested Building Footprint area for the submitted geometry. All intensity, Building Height, and massing conclusions are marked as "pending formal detailed planning conditions," in accordance with [standard:MOHURD-CONTROL-DETAILED-PLANNING].

## Transport, Rail, Municipal Infrastructure, and Public Services

Traffic strategies follow [depth:traffic_rail_slow_parking]: a hierarchy prioritizing walkability and bikeability with the arrival by rail/bus, complemented by a review of low-speed services and emergency lanes. `ROAD-001` only represents a conceptual slow-moving and innovative service corridor, see [data:geometry/roads.geojson#ROAD-001]. This plan does not draw engineering alignments, does not promise station-city integrated transformation, and does not approve the Dazhongsi quadrants as an engineering project.

### one-line mobility spine

1. **Platform Level:** Start by locating the customer service desk, paper maps, accessible entry, and quiet route signs or information from the station or bus drop-off area.
2. **Pedestrian/Cycle Layer**: Connect the three fields with continuous, pausable, lightable, and interpretable pedestrian/bicycle paths; conduct a human obstacle audit at each breakpoint to determine whether to set up removable signage.
3. **Public Services Layer**: Position resources, life services, and complaint desks in the visible first floor so that they are accessible without requiring the use of an app to obtain the services.
4. **Low-Speed Service Layer:** The timing and routes for maintenance, delivery, emergency, and accessibility services will be confirmed by professional teams in transportation, fire safety, and municipal services.

### Municipal and Public Services Interfaces

[depth:municipal_new_infrastructure] Conserve the conservative expression of the New Infrastructure. End-side computing, distributed energy, drainage, flood control, fire safety, pipelines, communication, and maintenance should be treated as a "list of systems to be verified": establish capacity and safety baselines first, then determine if testing is necessary. `geometry/constraints.geojson` currently has no features, hence the data gaps are recorded in [data:geometry/constraints.geojson#CONSTRAINTS], without fabricating pipeline or fire safety conclusions.

Public services are configured as "human-accessible + digital-assisted": human interpretation is provided at the side of the Evidence Garden Terrace; translation booths offer both paper-based and language assistance; the City Echoes station provides oral, telephone, and card services; and community nodes offer accessibility, drinking water, seating, restrooms, and nighttime assistance information. The locations and service radii of the facilities will be confirmed after the official public services baseline, fire safety, municipal, and accessibility audit are completed.

![A composite strategy of slow-moving areas, blue-green nodes, and public service interfaces](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

### Blue-Green and Mobility Strategy

The Blue-Green Strategy is not to treat the rivers as background, but to integrate Qinghe, Xiaoyuehe, Jing-Zhang Heritage Site Public Space, green spaces, and pedestrian issues into the same "verifiable daily infrastructure." Design actions include:

- **North-South Throughfare**: Form a continuous reading and pedestrian sequence along the heritage line; if encounters are made with roads, underpasses, tracks, or ownership obstacles, use paper-based signage, temporary seating, and manual guidance to validate needs, without pre-setting bridge or tunnel engineering.
- **East-West Seam**: Provide accessible interfaces from San Chang to the university, community, park, and Zhongguancun service wing; each interface must indicate ramps, stairs, quiet detours, resting points, and manned inquiries.
- **Blue-Green Calming:** Create a stayable buffer with planting, rain flood education, shading, benches, and low-brightness signage; `GREEN-001` is the suggested green space layer, see [data:geometry/green_space.geojson#GREEN-001].
- **Public Space Certificate**: `PUBLIC-001` demonstrates the public activity interface, see [data:geometry/public_space.geojson#PUBLIC-001]; all activities are reviewed individually for noise, lighting, accessibility, cultural heritage, blue line, and fire safety conditions.

The design depth for blue-green Public Spaces is [depth:blue_green_public_space], with the existing geometric baseline supported by [metric:green_ratio] and [metric:public_space_ratio]; they are not expressed as official green space ratios, public service ratios, or ecological performance metrics.

### three public landmarks/components

1. **Evidence Garden Deck**: Low Steps/Walkways alongside Public Seating and a Paper Evidence Wall, displaying the purpose, minimum data, human judgment, unknowns, and disabled status of a scenario; no mandatory cameras are installed, and the identity of the occupants is not recorded.
2. **Translation Table**: Translatable tables, tactile maps, and bilingual/graphic materials support researchers, residents, caretakers, and service providers in co-creating an evidence card; the tabletop provides paper, pens, and quiet seating, with a digital screen being an optional auxiliary feature.
3. **City Echo Stand | Civic Echo Stand**: A visible feedback station facing the site and community interface, receiving cards, oral comments, phone calls, and manual registrations; weekly updates on aggregated issues and processing status are published, without disclosing personal stories or unapproved recordings.

Three components are reversible, disassemblable, and relocatable concept components, not equivalent to permanent buildings or construction projects; their locations need to be combined with official boundaries, fire safety, cultural heritage protection, green spaces, and property rights verification.

### Atmosphere and Signage

The character and appearance are controlled by three principles: durability, community friendliness, and the explainability of AI. Durability corresponds to restrained materials and maintainable joints; community friendliness corresponds to paper-based elements, resting places, shading, and accessibility; and explainability corresponds to clear versions, evidence, and accountability. All historical narratives must be verified by public records and clear rights; no unauthorized old photographs, portraits, corporate fonts, or trademarks may be used. Signage will follow the functional division of Rail Silver, Sleeper Ink, Qinghe Teal, Signal Orange, Paper Proof, and Commons Violet, and will be expressed through text, numbering, graphics, and tactile elements.

## Renewal Projects, Implementation Policy, and Phasing

The project list follows the principle of " reversible verification first, professional review second, and final decision on permanentization last," corresponding to [depth:renewal_project_list], [depth:phasing_implementation], and [data:geometry/phasing.geojson#PHASE-001]. The project number is a work label for this scheme, not a project initiation or investment list.

| Number | Conceptual Project | Start with | Key Dependencies/Stopping Conditions |
| --- | --- | --- | --- |
| JZ-01 | Jing-Zhang Main Line Gap Evidence Visit | Paper and Pen Accessible/Secure/Noise-Free Visit, with Removable Signage Setup | Stop on-site setup upon encountering road red line, construction, or cultural heritage conflicts, and switch to desk research |
| JZ-02 | Zhongzhiyuan Evidence Garden Platform | Reservation-Safe Governance Sandbox and Public Explanation Platform | Cultural Heritage, Green Spaces, Fire Safety, and Operational Responsibility Parties Not Confirmed Will Not Open for Testing |
| JZ-03 | Origin Community Translation Long Table | Paper-based Outcome Translation, Open Source Release, and Manual Clinic | Intellectual Property, Campus/Institutional Boundary, Copyright Not Cleared, Not Released |
| JZ-04 | Dazhongsi Urban Echo Platform | Pilot of Paper Cards, Telephones, and Manual Feedback | Accessible Entry, Station Management, and Complaint Retention Mechanisms Not Clearly Defined and Not Collected |
| JZ-05 | Zhongguancun Science and Technology Service Resource Relay | Public Directory and Fixed Human Relay Period | No Automatic Eligibility Determination; Remove Service Directory if Inaccurate |
| JZ-06 | Xiao Yuehe Daily Scene Relay | Rain and Flood Management, Pedestrian Access, and Minimum Trial for Education/Service Facilities | Ecological, Flood Protection, Municipal, Privacy, or Responsibility Unknown Features Will Not Be Tested |
| JZ-07 | Annual Proofline Review | Public Evidence Cards, Complaints, Deactivation, and Decision for the Next Year | Renewal Not Allowed Without a Reviewable Baseline or Non-Digital Alternative |

### Reversible Route P0—P3

| Stage | Time Context | Allowed Actions | Evidence Threshold to Progress to Next Stage |
| --- | --- | --- | --- |
| **P0 Evidence Foundation** | 0—90 Days Concept Preparation Period | Verify official documentation checklist; paper visits; establish evidence cards, responsible parties, and complaint logs; create an accessibility baseline | All scene objectives, minimum data, non-numeric alternatives, responsible parties, and stop rules are in place; no reliance on personal data |
| **P1 Reversible Pilot** | Approximately 3—12 months of reference window | Reversible signage, mobile seating, in-person Human Review, paper-based release, appointment prototype testing | Obtain site/ownership/safety permits; continuously record human review, complaints, and exits; community evaluation as go or revise |
| **P2 Professional Deepening** | Reference Window of Approximately 12 to 36 Months | Research into fixed facilities or space updates can only occur after the Official Boundary, control plan, traffic, utilities, cultural heritage, fire safety, and accessibility audit have been completed | A conditions list signed by the professional team, baseline and post-baseline comparisons, public comment, and funding/responsibility boundaries; any missing items will remain at P1 or be halted |
| **P3 Review and Expansion** | Annual Rolling | Only replicate mechanisms that have been proven to have public value and are maintainable; retain records of deactivation and revocation | Proofline Review conclusions, risk reassessment, and resource commitments must be clear; do not infer universal applicability based on one-time success |

P0—P3 are reversible governance and learning rhythms, not construction timelines, investment timelines, or government decision-making. `PHASE-001` is merely a discussion scope within the submission package and cannot replace a complete phased plan.

### Annual Proofline Review and Community Engagement

Preserve the review as a renewal threshold once a year:

1. **Quarterly Evidence Update**: Each scenario lead updates the version, aggregated counts of usage/complaints/exit/stops, and unresolved issues; write "Not Collected and Reason" if there is no data.
2. **Semi-Annual Scenario Access Day**: Three sessions are rotated to provide paper-based, manual, closed captioning/sign language, or other reasonable accommodations; in-person feedback from those not participating is not collected.
3. **Annual Community Review**: A temporary review panel is composed of residents, individuals with disabilities, developers, maintenance personnel, representatives of site ownership/management, and professional advisors; member roles are public, and personal information is minimized.
4. **Public Decision:** Each scenario shall only `继续 / 修改 / 暂停 / 停止` Four outcomes, with evidence, responsible party, next date, and appeal entry; do not use "intelligentization" to cover unresolved risks.
5. **Knowledge Accumulation**: Only desensitized evidence cards, methods, versions, and mechanism experiences will be published for reuse by subsequent professional teams and communities; external cases will still be marked as background references.

## Metrics, Area Recalculation, and Compliance Matrix

Metrics should start with a baseline, and then goals can be discussed. The current known metrics are directly read from the submitted geometry and do not represent official area or urban performance; any formal recalculation must first verify the Official Boundary and geometry status. The depth of metric recalculation is [depth:metrics_recalculation], and spatial and layer evidence can be found in [data:geometry/site_boundary.geojson#SITE-001], [data:geometry/buildings.geojson#BLDG-001], [data:geometry/green_space.geojson#GREEN-001], [data:geometry/public_space.geojson#PUBLIC-001], and [data:geometry/key_areas.geojson#PROV-KEY-001].

### Current geometric baseline

| Indicator | Current Value/Status | Formula or Source | Usage Boundary |
| --- | --- | --- | --- |
| `site_area_sqm` | 11,412,825.386 sqm (known) | `polygon_area(submitted_site_boundary)`; [metric:site_area_sqm] | Provisional Boundary baseline, not the official site area |
| `building_footprint_area_sqm` | 216,031.334 sqm (known) | Sum of Building Footprint area; [metric:building_footprint_area_sqm] | Design-suggested footprint, not total built area or development volume |
| `green_ratio` | 0.137026(known) | green area / temporary overall boundary; [metric:green_ratio] | only submit geometric recalculation, not a legal green ratio |
| `public_space_ratio` | 0.018444 (known) | Public Space Area / Temporary Overall Boundary; [metric:public_space_ratio] | Only submitted geometric recalculation, not a measure of public service performance |
| `key_area_count` | 3 (known) | The count of three key area objects; [metric:key_area_count] | The name and count are useful for task indexing, polygon still provisional |
| `floor_area_ratio` | unknown | Total Floor Area / Official Site Area; [metric:floor_area_ratio] | FAR, Building Height, Density, Setbacks Pending Official Zoning |

To fully cover the geometric and metric contract, the area evidence includes: green space area of 1,563,854.557 sqm [metric:green_space_area_sqm] and Public Space area of 210,495.518 sqm [metric:public_space_area_sqm]. The six categories of conceptual land uses are respectively calculated by [metric:land_use_05_area_sqm], [metric:land_use_0702_area_sqm], [metric:land_use_0802_area_sqm], [metric:land_use_0804_area_sqm], [metric:land_use_1401_area_sqm], and [metric:land_use_1403_area_sqm]; they are merely a complete topological partition of the temporary submitted boundaries, not the confirmed land uses.

P1—P3 The areas for the three conceptual learning phases are [metric:phase_1_area_sqm], [metric:phase_2_area_sqm], and [metric:phase_3_area_sqm], respectively, which only indicate the submitted layers and do not represent the construction or investment timeline. The provisional areas for the three key areas are recorded by [metric:zhongzhiyuan_ai_acceleration_area_provisional_area_sqm], [metric:beijing_ai_origin_community_provisional_area_sqm], and [metric:dazhongsi_ai_industry_cluster_provisional_area_sqm]; the announced areas are still for reference, and the provisional calculations must not replace the official area. Once the official polygons are in place, they must be recalculated.

### baseline-first Run Metrics

The following are **suggested metrics** for the open call, not a fabricated addition to the existing `metrics.json`. P0 records the baseline, while P1 only compares changes within the same scenario over time; any target must be confirmed through an annual review.

| Indicator | baseline how to determine | P1/P2 checkable threshold | responsibility and frequency |
| --- | --- | --- | --- |
| Route Continuity | Record Breaks, Stairs, Ramps, Quiet Circumvention, and Rest Points During Manual Walkthroughs | Each Pilot Site Has a Route Map with Dates; Block Points Have Responsible Persons and Recheck Dates | Accessibility Reviewer, Quarterly |
| Non-Digital Service Coverage | Verify Each Scenario for Paper-Based, Telephonic, On-Site Manual, and No-Option Alternatives | Scenarios Without Non-Digital Alternatives Do Not Enter P1 | Scenario Lead, Enable Before/Each Update |
| Human Review Completion Rate | Record whether a named role has conducted a human review for each AI prompt | Ensure that no service denials, safety, legal/medical/educational advisories lack human documentation | Responsible Person, by Event |
| Complaint Response | Unified registration date and status for paper cards, phone calls, verbal reports, and online submissions (if applicable) | Each complaint has a receipt date, responsible party, processing status, and publicly disclosed de-identified conclusion | Community Feedback Host, Monthly |
| Exit and Deactivation Visibility | Record exit requests, deactivation frequency, and trigger causes | Provide an exit entry for each scenario; deactivate before reviewing after triggering | Operator, by event |
| Data Minimization | Inventory Input Fields, Storage Period, and Access Roles | Delete Unnecessary Fields; Do Not Collect Personal Trajectories/Biometrics | Data Protection Officer, Quarterly |
| Public Space Use | Conduct pre-tests through manual counting and anonymous time-of-day observations | Only publish aggregated changes, not individual profiles explaining the changes | Public Space Maintenance Staff, Monthly |
| Ecological/Comfortability | Public Sensing or Manual Recording of Temperature, Humidity, Shade, Post-Rain Accessibility, and Plant Maintenance | Address Safety and Maintenance Issues First, Then Discuss AI Effects | Blue-Green Maintain People, Seasonally |
| Evidence Card Comprehensibility | Conduct a paper-based understanding test by residents, maintenance staff, and developers | Key limitations and responsible parties should be repeatable; if not, rewrite and do not proceed to the next stage | Translated and edited versions, when updates are made |
| Annual Continuation Rate | Statistics on the number of scenarios involving continuation, modification, suspension, or termination and their reasons | Scenarios without evidence, responsibility, or alternative paths shall not be automatically renewed | Proofline Review, annually |

### Read in a grid pattern

Announcement tasks `1.3.1`, `1.3.2`, `1.3.3` correspond to innovative ecosystems, AI novel urban forms, and high-quality districts; `1.4.1`, `1.4.2`, `1.4.3` correspond to three-tier scopes; `1.5.1.1`, `1.5.1.2` correspond to integrated research and future cities; `1.5.2.1`—`1.5.2.5` correspond to functional layouts, updates, transportation infrastructure, Jing-Zhang vitality belts, and urban landscapes; `1.5.3.required`, `1.5.3.1`, `1.5.3.2`, `1.5.3.3` correspond to three key areas. The tasks for agent.1—agent.6 are respectively addressed by named/structured elements, case mechanisms, scenario cards, public landmarks, cultural signposts, and annual operations. Their evidence is not only in the text but also in nine readable GeoJSON files, baseline indicators, responsibility cards, and review processes.

Each conclusion is categorized into three types: **that can be recalculated from the current geometry** (e.g., the five known metrics mentioned above), **that requires official control conditions** (FAR, height, density, road setback, building setbacks, facility standards), and **that requires operational data** (service understanding, complaint response, accessibility, scenario usage). `[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]`, `[standard:MOHURD-CONTROL-DETAILED-PLANNING]`, [depth:metrics_recalculation], and [data:geometry/phasing.geojson#PHASE-001] together form the reading index; no single number should replace the Evidence Chain.

![core indicators, recalculation sequence, and public review loop](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

### Boundaries and Data Gaps

The following items must be completed with official attachments, clear rights GIS/CAD/PDF or professional surveys:

| Gap | Impact | Safety Measures Before Completion |
| --- | --- | --- |
| Three Levels of Scope and Three Key Areas | Impact Scope, Area, and Detailed Design Boundaries | Use provisional geometry for discussion only; recalculate in full after replacement |
| FAR,  Building Height, Building Density, Green Space Ratio, Setbacks and Building Control Lines | Influences Intensity, Massing, and Aesthetic | Only Write Referenced Guidelines and Pending Confirmation Conditions | (Building Coverage Ratio)
| Right-of-way, cross-sections, rail station interfaces, parking, and traffic organization data | Impact on pedestrian and bicycle mobility, station-town integration, and construction safety | Only conduct manual visits, conceptual routes, and temporary wayfinding, do not write engineering alignment |
| Current Site Boundaries and Ownership | Impact on Project List and Demolish–Renovate–Retain Strategy | No Specified Subject for Renovation, Demolition, Business Recruitment, or Construction |
| Site Building Survey (outline, height, use, date, structure) | Influences Preservation/Reuse/Update Decision | Design Layer Only for BLDG-001, Do Not Infer Total Floor Area or Cultural Preservation |
| Jing-Zhang heritage sites, parks, Tsinghua Garden railway station, etc. within the heritage control area | Influence narrative, landmarks, and spatial actions | Historical information clearance, cultural heritage professional review; use reversible components |
| Transportation/Traffic, Bus, Rail, and Active Transportation Operational Data | Impact on Accessibility and Service Times | Conducted through Anonymous Manual Observations; No Personal Trajectory Data Collected |
| Municipal, utility, drainage, flood control, fire protection, and emergency conditions | affect any engineering and safety conclusions | `constraints.geojson` remains empty; perform professional capacity checks first |
| Audit of Existing Public Service Facilities and Accessibility/Barrier-Free Access | Impact on Healthcare, Education, and Service Accessibility | Conduct Paper-Based/Manual Services and Barrier-Free Visits First, Target Baseline to be Set After |
| Operating Entity, Budget, Permits, and Maintenance Responsibilities | Impact on Project Sustainability | Only Write Roles and Decision Thresholds, Not Funding or Implementation Commitments |

Cross-check the aforementioned risks with [depth:risk_missing_data], [source:SITE-PACKAGE], [source:PROCESSED-FACT-PACK], [standard:MOHURD-CONTROL-DETAILED-PLANNING], and [data:geometry/constraints.geojson#CONSTRAINTS]. The formal plan must address and close or retain `GAP-BOUNDARY-001`, `GAP-BOUNDARY-002`, `GAP-CONTROL-001`, `GAP-ROAD-001`, `GAP-PARCEL-001`, `GAP-BUILDING-001`, `GAP-HERITAGE-001`, `GAP-MUNICIPAL-001`, and `GAP-SERVICE-001` individually as risks; accessibility audit should be conducted as a supplement, not to be replaced by the presence of signage as proof of accessibility.

### Privacy, Human Review, and stop rule

Any AI scenario is default "disabled" until the purpose statement, minimum data table, non-numeric alternatives, responsible party, and stop rules are completed for P0. Data is accessed within the trust boundary based on roles, with public reports using aggregated information. If unauthorized data access, misleading guidance, discriminatory results, barriers to accessibility, inability to be manually interpreted, public clear opposition, or the absence of the responsible party occurs, the on-site lead can and must immediately stop the scenario. Stop records are not hidden as failures but serve as primary evidence in annual reviews.

### Copyright, Generation Disclosure, and Open Boundaries

The Chinese text, names, evidence cards, scenario protocols, and visual directions are original concept statements for this declaration; external cases are only cited from publicly accessible pages registered in the `sources.json`, with access dates on 2026-08-07, and usage limitations noted in the corresponding entries. Spatial geometry, metrics, drawings, figures, visual elements, and manifests are existing files in the submission package; this update only modifies the narrative/evidence text and specified JSON, without claiming to alter their spatial, visual, or engineering meanings. Any historical images, fonts, trademarks, individuals, or company logos are not used without authorization; static HTML should not rely on remote assets.

This plan explicitly does not claim official approval, final master planning, ultimate land ownership, final construction scale, investment sources, event scheduling, or government implementation commitments; it is an open reference that can be questioned by the public, reviewed by professional teams, and recalculated after data is completed.

## References

### Files within the warehouse

- `brief/public-brief.md`
- `brief/site-package/`
- `data/source_registry.json`
- `data/processed/agent_fact_pack.md`
- `data/processed/project_scope_summary.csv`
- `data/processed/agent_task_requirements.csv`
- `data/processed/missing_data_checklist.csv`
- `geometry/site_boundary.geojson`, `geometry/key_areas.geojson`, `geometry/land_use.geojson`, `geometry/buildings.geojson`, `geometry/roads.geojson`, `geometry/green_space.geojson`, `geometry/public_space.geojson`, `geometry/constraints.geojson`, `geometry/phasing.geojson`

### Global Background Sources (Only Background/Transfer Mechanisms)

- [source:CASE-ONE-NORTH] Singapore one-north, https://knowledgehub.clc.gov.sg/publications-library/one-north-fostering-research-innovation-and-entrepreneurship/(accessed 2026-08-07)
- [source:CASE-MILA] Mila, https://mila.quebec/en(accessed 2026-08-07)
- [source:CASE-VECTOR] Vector Institute, https://vectorinstitute.ai/(accessed 2026-08-07)
- [source:CASE-KNOWLEDGE-QUARTER] Knowledge Quarter, https://knowledgequarter.london/(accessed 2026-08-07)
- [source:CASE-KENDALL] Kendall Square, https://kendallsquare.mit.edu/(accessed 2026-08-07)
- [source:CASE-STATION-F] Station F, https://stationf.co/(accessed 2026-08-07)

### Machine-readable evidence index

**Source IDs:** [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE], [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:CASE-ONE-NORTH], [source:CASE-MILA], [source:CASE-VECTOR], [source:CASE-KNOWLEDGE-QUARTER], [source:CASE-KENDALL], [source:CASE-STATION-F].

**Standard IDs:** [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

**Depth IDs:** [depth:existing_conditions_diagnosis], [depth:three_level_scope_framework], [depth:overall_spatial_structure], [depth:land_use_layout], [depth:development_intensity_controls], [depth:height_massing_character], [depth:retain_renovate_demolish], [depth:traffic_rail_slow_parking], [depth:municipal_new_infrastructure], [depth:blue_green_public_space], [depth:three_key_area_detailed_design], [depth:renewal_project_list] [depth:phasing_implementation], [depth:metrics_recalculation], [depth:risk_missing_data].

**Metric IDs:** [metric:site_area_sqm], [metric:building_footprint_area_sqm], [metric:green_ratio], [metric:public_space_ratio], [metric:floor_area_ratio], [metric:key_area_count].

**GeoJSON IDs: ** [data:geometry/site_boundary.geojson#SITE-001], [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003], [data:geometry/land_use.geojson#LU-001], [data:geometry/land_use.geojson#LU-002], [data:geometry/land_use.geojson#LU-003], [data:geometry/land_use.geojson#LU-004], [data:geometry/buildings.geojson#BLDG-001],  [data:geometry/roads.geojson#ROAD-001], [data:geometry/green_space.geojson#GREEN-001], [data:geometry/public_space.geojson#PUBLIC-001], [data:geometry/constraints.geojson#CONSTRAINTS], [data:geometry/phasing.geojson#PHASE-001].
