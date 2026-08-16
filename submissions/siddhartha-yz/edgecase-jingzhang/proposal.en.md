---
title: "EDGECASE JINGZHANG — An Urban AI Training and Co-Testing Belt for Long-Tail Conditions"
author_github: "siddhartha-yz"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
iteration: "v1.26"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Turn the Centennial Jing-Zhang corridor from an AI showcase into civic infrastructure for exposing, co-testing, learning from, and repairing long-tail conditions before systems scale."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "robot-delivery-low-speed", "enterprise-service-copilot", "ai-health-service-navigation", "public-safety-operations-review", "ai-cultural-guide"]
---

# EDGECASE JINGZHANG

**Expose limits before scale.**

EDGECASE JINGZHANG does not define an AI innovation district as a showcase where systems are asked to succeed under ideal conditions. It treats the conditions usually lost in averages as a strategic urban resource: wheelchairs and canes, older residents without new devices, children and guardians, multilingual visitors, night and rain, crowding, weak connectivity, conflicting sensors, mixed robot-pedestrian movement, and failed handoffs between multiple agents. The spatial system therefore forms a three-step exposure gradient: **T1 controlled testing, T2 community co-testing, and T3 everyday open environments**. The Jing-Zhang heritage park becomes an Edgecase Mile, while the three required key areas specialize in technical, human, and market boundaries respectively. [source:AGENT-TASKBOOK] [depth:overall_spatial_structure]

![EDGECASE overview evidence diagram](assets/figures/site-overview.en.png)

## Design Basis and Source List

The formal basis is the official competition announcement and the repository Agent taskbook. The announcement defines the 43.6 km² coordinated research scope, the 11.4 km² overall design scope, the three detailed-design areas totaling about 368.4 ha, and the expected professional deliverables. The taskbook translates the three strategic positionings, five functions, two wings, three areas, and agent.1-agent.6 into an explicit machine-readable brief. [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] The proposal also reads the allowed design space, planning limits, source registry, and missing-data checklist, which make clear that the currently supplied polygons are organizer-maintained provisional rough geometry rather than official redlines. [source:BOUNDARY-SOURCE] [source:SOURCE-REGISTRY]

Two evidence rules follow. First, spatial constraints and participant design are separated: the submitted site and key-area polygons remain provisional constraints, while land use, buildings, roads, green space, public space, and phasing are explicitly participant-generated design proposals and are recalculated in EPSG:4548. [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm] Second, unknown controls stay unknown. FAR, height, density, road redlines, ownership, utilities, heritage controls, and fire-engineering conditions are not filled with invented precision; they remain in assumptions and professional-confirmation items. [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:risk_missing_data]

Five international references are used as mechanism studies, not as forms to copy. Singapore's Punggol Digital District demonstrates precinct-scale real-world testing linked to digital infrastructure [source:CASE-PDD]; Toyota Woven City demonstrates a city-like living laboratory with resident feedback [source:CASE-WOVEN]; Seoul AI Hub links startup incubation, R&D infrastructure, open innovation and business validation [source:CASE-SEOUL-AI-HUB]; Mila links research talent to venture creation [source:CASE-MILA]; Vector Institute connects research, industry adoption and responsible deployment [source:CASE-VECTOR]. Jing-Zhang's distinct contribution is to make **edge-case coverage** an explicit shared performance of urban space and operations.

## Three-Level Scope Framework

The three levels are not repetitions at different map scales. At coordinated-research scale, the proposal asks why Haidian needs a long-tail testing belt: competition in AI increasingly depends on what happens between a capable model and reliable real-world adoption, where interoperability, uneven environments, human differences, accountability, fallback and public acceptance become decisive. At overall-design scale, that thesis becomes a continuous public spine, three exposure tiers, cross-corridor slow-mobility stitches, and reversible prototypes. At key-area scale, the three boundary types are assigned to Zhongzhiyuan (technical), AI Origin Community (human), and Dazhongsi (market). [source:AGENT-TASKBOOK] [depth:three_level_scope_framework]

| Level | EDGECASE question | Spatial response | Evidence |
| --- | --- | --- | --- |
| 43.6 km² coordinated research | What differentiated capability can a world-class AI ecosystem build? | A loop from long-tail evaluation to field exposure, product repair, and public return | sources / compliance / cases |
| 11.4 km² overall design | How can testing enter a city without turning the city into an involuntary experiment? | T1-T2-T3 exposure gradient + Edgecase Mile + six slow links | [data:geometry/land_use.geojson#LU-001] [metric:slow_mobility_link_count] |
| Three key areas | How should industry, communities and everyday markets carry different test burdens? | Controlled Edge Lab / Human Edge Commons / Market Edge Street | [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count] |

The three tiers describe exposure and participation, not statutory zoning or safety certification. T1 allows frequent failure but only in controlled settings. T2 introduces real participants only with informed participation, exit rights, a non-AI route and human takeover. T3 is for low-risk capabilities that have already passed the earlier tiers; normal urban users must remain able to complete the core task without being forced into an experiment. This turns failure from an incident hidden after deployment into an R&D input that can be found earlier and handled more safely. [metric:edgecase_test_tier_count]

![Three-tier exposure gradient and land-use structure](assets/figures/land-use-structure.en.png)

## Coordinated Research Area: Industry and Future City Research

The proposed industrial identity is **Urban Edgecase Infrastructure**. Rather than competing on raw compute or model size, Jing-Zhang can specialize in the expensive last mile between algorithms, robots, agents and dependable urban adoption: sensor disagreement, discontinuous pedestrian networks, multilingual use, accessibility, weak connectivity, device interoperability, responsibility transfer, human fallback and recoverable failure. For companies, this is a real-condition stress environment; for universities, a source of reproducible research problems; for government and communities, a transparent pre-scaling boundary; for the public, an explicit right to understand, refuse and reach a person.

The taskbook's three areas and two wings become one testing value chain. Zhongzhiyuan hosts controlled full-stack autonomy, robotics and governance evaluation. AI Origin Community connects universities, open-source communities and residents for human-factors, accessibility and multilingual co-testing. Dazhongsi focuses on agentic commerce, terminal interoperability, content and high-turnover everyday services. The Zhongguancun service wing supports standards, legal, IP, capital and evaluation services; the Xiaoyuehe scenario wing supplies environmental variation, maintenance, ecology and community use. [source:AGENT-TASKBOOK]

The five cases provide transferable mechanisms. PDD demonstrates infrastructure that can host experiments [source:CASE-PDD]. Woven City demonstrates feedback inside daily life [source:CASE-WOVEN]. Seoul AI Hub places business validation next to company growth support [source:CASE-SEOUL-AI-HUB]. Mila creates a continuous research-to-founder path [source:CASE-MILA]. Vector connects frontier research with adoption and responsible implementation [source:CASE-VECTOR]. EDGECASE JINGZHANG adds a different KPI: not how much AI has been deployed, but how many material limitations were exposed before scaling, how many have a usable human fallback, and how many lessons can be reproduced by the next team.

The identity system uses `EDGECASE JINGZHANG` and the statement **Expose limits before scale**. A graphic language derived from railway mileage ticks and programming brackets `[ ]` makes conditions explicit rather than mystical. T1/T2/T3 are encoded with stable shapes and labels, avoiding a generic cyberpunk aesthetic. The brand can work simultaneously for industry challenges, public explanation, annual events, and professional review.

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The overall structure is **one spine, three fields, six stitches, twelve edge nodes**. The Edgecase Mile is a continuous public landscape and slow-mobility evidence spine along the Jing-Zhang heritage corridor. The three fields are the key-area prototypes. The six slow links consist of one longitudinal greenway, four east-west pedestrian stitches, and one replay cycle route. Twelve movable scenario nodes host the edge cards. The aim is not to transform all 11.4 km² into a test campus, but to create a minimal and reversible interface system embedded in an ordinary city. [data:geometry/roads.geojson#ROAD-001] [metric:slow_mobility_link_count]

The land-use layer is a complete, non-overlapping conceptual partition using the repository subset of national land-use codes: research, education, community service, commercial service and park green space. Its continuous center spine has a recalculated design ratio, but that number is explicitly not a statutory green-space control. [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001] [metric:green_ratio] Six small building footprints demonstrate only the spatial scale of reversible Edge Lab, Human Override House and Market Edge Forum prototypes. They are not existing buildings, demolition targets, approved footprints, or floor-area commitments. [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]

Urban renewal follows **operate before hardening**. Early actions can use signage, temporary access management, movable furniture, booked tests, staffed fallback points and public result boards. Medium-term changes can adjust ground-floor interfaces, slow-mobility links and enterprise services in response to evidence. Permanent redevelopment should only be discussed after official regulatory, ownership, utility, heritage and traffic information is available. This turns rapid AI iteration into a cautious urban-renewal method rather than a justification for permanent forms generated without survey. [depth:phasing_implementation] [data:geometry/phasing.geojson#PHASE-001]

## Detailed Design of Key Areas

**Zhongzhiyuan / Controlled Edge Lab (T1)** is where robots, multimodal perception, multi-agent scheduling, edge compute and governance tools are allowed to fail frequently inside controlled conditions. Spatial components include reconfigurable test courts, varied paving and slopes, adjustable light and obstruction conditions, mock access-control interfaces, emergency-stop points and a failure-review wall. Flagship tests include low-speed delivery in mixed movement, night/rain/occlusion perception, and conflict between multiple facility agents. Any dimensions derived from the provisional key polygon are conceptual only. [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/public_space.geojson#PUBLIC-001]

**AI Origin Community / Human Edge Commons (T2)** asks whether systems remain usable for people who are not average users. Its advantages are university-origin innovation and everyday community life. Proposed interfaces include a staffed Human Override House, an accessibility co-test loop, multilingual wayfinding trials, a no-smartphone route for older residents, child-guardian ambiguity cases, and a community-service copilot desk. Participation is opt-in; every service must expose an AI route, a human route, and an offline/no-account route. Spatially the emphasis is on campus-park-community walking connections, open ground floors and small release/review spaces rather than spectacle. [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/public_space.geojson#PUBLIC-002]

**Dazhongsi / Market Edge Street (T3)** tests low-risk capabilities that have passed T1 and T2 in ordinary commerce and high-turnover public settings: agent handoffs, device compatibility, trustworthy generated information, queues, weak connectivity and staffed after-sales service. The key metric is handoff quality, not autonomy. When a merchant agent, navigation service, payment terminal, public-service entry or content generator disagrees, users must know who is accountable and how to reach a person. Repository issue #1029 questions the current provisional KEY-003 location, so this proposal does not derive precise station radii, quadrant geometry or TOD intensity from that polygon. Those items must be recalculated from official geometry. [source:REPO-ISSUE-KEY003] [data:geometry/key_areas.geojson#PROV-KEY-003]

![Key areas and T1/T2/T3 roles](assets/figures/key-areas.en.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

Six personas define the test boundary: robotics/agent developers need controlled real failures; academic researchers need reproducible problems; older residents and caregivers need a route that does not assume a new device; wheelchair and low-vision users need continuous access and human alternatives; international students and researchers need multilingual and non-local-account paths; small merchants and frontline operators need clear limits, handoffs and support. Talent infrastructure therefore includes not only housing, offices and events, but a full chain from real problem library to test environment, professional review, venture support and first field scenario.

The twelve scenario cards are:

| ID | Edge condition | Main setting | Human fallback / stop rule |
| --- | --- | --- | --- |
| EDGE-01 | Wheelchair/cane + AI walkability | T2 + Mile | staffed guidance; stop if accessible path is discontinuous |
| EDGE-02 | Older user without smartphone | T2 | desk/phone/paper route must remain equally reachable |
| EDGE-03 | Multilingual visitor | T2/T3 | human translation; abstain on low confidence |
| EDGE-04 | Child-guardian ambiguity | T2 | no automatic identity decision; transfer to staff |
| EDGE-05 | Night, rain, glare perception | T1→T3 | controlled replay before any open pilot |
| EDGE-06 | Event crowd and queue stress | T3 | capacity trigger switches to staffed operations |
| EDGE-07 | Low-speed delivery robot mixing | T1→T2 | e-stop, teleoperation, speed limit |
| EDGE-08 | Conflicting sensor evidence | T1 | surface disagreement instead of forcing one answer |
| EDGE-09 | Weak network / location drift | all | offline-first wayfinding and staffed fallback |
| EDGE-10 | Health/public-service navigation | T2 | navigation only, no diagnosis; handoff to professionals |
| EDGE-11 | Merchant agent cross-system handoff | T3 | accountable operator + staffed after-sales path |
| EDGE-12 | Extreme-heat route advice | T2/T3 | human-issued safety rules override optimization |

Three become flagship industry validation scenarios. **E1 Embodied Edge** evaluates robots across paving, access, crowding and human mixing. **E2 Civic Service Edge** evaluates multilingual, accessible and age-inclusive service agents using both task success and human-takeover performance. **E3 Agent Interop Edge** evaluates merchant services, terminals and public-service agents for responsibility-preserving handoffs. The deliverable is not a zero-failure demo; it is a reproducible failure category, test condition, takeover moment, repair version and retest result. [metric:edgecase_scenario_count] [metric:human_override_court_count]

Three pilgrimage landmarks are knowledge interfaces rather than oversized icons: **Mile Zero** records the categories added each year; **Human Override House** makes the human right to take over visible in architecture; **Long-tail Atlas** displays de-identified failure patterns, fixes and contributing teams. An annual `EDGECASE WEEK` can combine open accessibility walks, field challenges, controlled night/rain testing, developer review sessions, public explanation and next-year problem setting. [source:AGENT-TASKBOOK]

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The land-use layer demonstrates that the EDGECASE mechanism can be spatially accommodated without pretending to be a statutory plan. Nine partition cells fully cover the provisional site. The center cells are park green space; the north leans toward research, the middle toward education/community service, and the south toward commercial service, expressing a conceptual gradient from controlled R&D to ordinary market use. [data:geometry/land_use.geojson#LU-001] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] These are recommended functional tendencies only; they do not change existing land rights or official land-use designation.

The building layer intentionally contains only six small reversible prototype footprints, two per key area, so they can be moved, resized or deleted once official parcels and ownership are known. Zhongzhiyuan prototypes use laboratory functions, Origin Community prototypes use community-service/human-fallback functions, and Dazhongsi prototypes use mixed-use forum functions. `building_footprint_area_sqm` is the sum of these conceptual footprints, not an existing-building measure or an approved development figure. [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]

The retain-renovate-demolish rule is deliberately conservative: **no survey, no demolition claim**. Existing building data, title, structural condition, heritage value, fire condition and current use are absent. A professional follow-on team should first establish a surveyed inventory before classifying heritage/high-value retention, adaptive reuse, underused but reusable stock, and necessary renewal. Height, FAR, density and setbacks remain unknown. At this stage the performance goals are accessible ground floors, shade, legible entry, reversible interfaces and maintainability, not invented regulatory numbers. [depth:retain_renovate_demolish] [depth:height_massing_character]

## Transport, Rail, Municipal Infrastructure, and Public Services

Transport begins with test accessibility rather than autonomous mobility. The roads layer contains a longitudinal Edgecase Mile, four east-west pedestrian stitches and a replay cycle route, all marked as conceptual slow-mobility connections rather than road redlines. [data:geometry/roads.geojson#ROAD-001] [metric:slow_mobility_link_count] The east-west stitches prevent the corridor from becoming a purely longitudinal attraction; communities, campuses and workplaces on both sides need ordinary access to the same public-service and test interfaces. Every scenario must retain non-AI base wayfinding so that a failed intelligent service never traps a user inside the experiment.

Rail integration is a method awaiting data. Station entrances, public space and test nodes should be reviewed for continuous accessibility, lighting, weather protection, bicycle conflict, crowd capacity and clear staffed fallback. Exact station geometry, junctions, parking and transfer parameters require official transport layers. The Dazhongsi proposal especially avoids deriving a precise TOD circle from disputed KEY-003 provisional geometry. [source:REPO-ISSUE-KEY003] [depth:traffic_rail_slow_parking]

New infrastructure is conceived as plug-in and fail-safe. T1 needs isolatable networks, edge compute and physical emergency stops. T2 needs local logs, clear consent/privacy notices and direct human communication. T3 needs public status display, graceful degradation and offline service. Sensing should be purpose-limited and minimal, preferring environment counts and equipment status over personally identifiable tracking. Utilities, energy, drainage, flood, fire and communications redundancy remain professional prerequisites rather than invented engineering specifications. [depth:municipal_new_infrastructure]

![Slow mobility, blue-green structure, and human fallback](assets/figures/mobility-bluegreen.en.png)

## Blue-Green Network, Public Space, and Urban Character

The continuous center green spine is first a park and mobility landscape, and only second a test interface. Trees, rainwater, walking, cycling, rest, sport and railway heritage experience must dominate over screens and devices. The three public co-test courts occupy only a small design share of the provisional boundary and host booked tests, explanation, staffed fallback and review; ordinary public-space use remains the default elsewhere. [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001] [metric:public_space_ratio]

The character language comes from measurement, maintenance and dispatch rather than generic cyberpunk imagery: durable tick marks, high-contrast information, tactile details, mechanical-style status panels, mileage numbers and replaceable parts. A node explains what a system is doing, what it does not know, how to leave, and who is responsible before it advertises capability. Night lighting uses the minimum necessary level, while shape and text provide redundancy for visual and cognitive differences. Public art prioritizes repair histories, failure categories, contributors and railway engineering culture, creating an aesthetic in which technology is powerful precisely because its limits can be seen and maintained. [depth:blue_green_public_space] [standard:MOHURD-URBAN-DESIGN-MEASURES]

The heritage narrative is intentionally methodological rather than pseudo-historical. The proposal does not invent unverified technical facts about the old railway. It uses a general public-infrastructure lesson: systems that matter to everyday life require clear routes, status, responsibility, maintenance, review and human intervention. Urban AI needs the same civic legibility. Mile Zero, Human Override House and Long-tail Atlas therefore behave as public infrastructure before they behave as photo landmarks.

## Renewal Projects, Implementation Policy, and Phasing

The first portfolio is small, reversible and testable:

| ID | Project | Proposed accountable role | Independent verification role | First output and acceptance evidence | Gate before expansion |
| --- | --- | --- | --- | --- | --- |
| EC-01 | Edgecase Mile + six slow links | public-space operator | transport/accessibility professionals and user representatives | non-AI continuous base route; blind-walk records and barrier register | professional traffic/accessibility acceptance, with failures entered in a correction register |
| EC-02 | Controlled Edge Court | pilot technology provider and site operator, jointly accountable | independent safety assessor | E1 robotics/multimodal testing; emergency-stop drill, incident log and retest version | written acceptance of incident response and emergency stop |
| EC-03 | Human Override House | civic-service operator | community representatives plus privacy and accessibility advisers | E2 civic-service co-test; consent record, takeover latency and non-AI route audit | consent, data minimization, staffed fallback and exit route ready |
| EC-04 | Market Edge Forum | merchant-service operator | merchant representatives and consumer-rights adviser | E3 agent/terminal handoff; accountability-chain drill and staffed-support reachability record | official KEY-003 geometry checked, merchant permission and accountability chain signed off |
| EC-05 | Long-tail Atlas | accountable data custodian and publisher | independent reproduction team and copyright reviewer | failure types, fixes and retest log; reproducible sample and publication register | de-identification, copyright and cross-team reproduction accepted |
| EC-06 | EDGECASE WEEK | event operator | public-safety, community and accessibility observers | annual open walks, challenges and reviews; issue-closure rate and exit-route audit | event permit and public-safety plan complete; unresolved issues returned to EC-02–05 |

These are **accountability roles** suitable for a future procurement or pilot brief, not appointments of existing organizations. Before work begins, each role must be resolved to a named accountable body, named verifier, evidence repository and sign-off date; the same body must not both deliver a pilot and perform its final independent verification.

Implementation policy should not create a regulatory exemption zone. It should create a stricter deployment gate. Every pilot needs an accountable owner, test question, data boundary, success/failure measures, human takeover, stop rule, retest version and exit plan. Completion of T1 is a prerequisite for T2; evidence from T2 is a prerequisite for T3. Ordinary public-space rights remain intact, and entering the park never counts as consent to participate. Companies receive higher-quality field evidence, not weaker public protections.

| Current tier | Permitted activity | Evidence required before release or continued operation | If unmet |
| --- | --- | --- | --- |
| T1 controlled testing | controlled replay, equipment and sensor conflicts, emergency-stop drills | failure conditions are reproducible; stop or power isolation works; records support review | do not enter the community; repair and repeat controlled testing |
| T2 community co-testing | informed accessibility, multilingual, public-service and robot co-tests | exit and non-AI routes are equally reachable; staffed takeover is available; data are minimized | return to desks, paper wayfinding or staffed guidance; pause the co-test |
| T3 everyday open environments | everyday navigation, crowd operations and agent-handoff pilots | an accountable operator is named; capacity and low-confidence triggers work; staffed after-sales support is reachable | switch to staffed operation or take the service offline; log the issue and return to T1/T2 |

This table is a minimum evidence checklist for accountable operators, not an automatic promotion system, deployment approval or safety certification. T3 has no undefined “next tier”; its third column is the gate for continued operation.

The phasing geometry provides a machine-checkable three-part partition, but the real implementation sequence is mechanism-first. In years 0-1, establish governance, the problem library, base slow mobility and three movable prototypes. In years 1-3, expand scenarios, company services and ground-floor interfaces based on evidence. Only after official controls are available should permanent redevelopment be studied. Any AI pilot can be removed while the underlying space continues as ordinary park, community service or event space; reversibility is a design requirement. [data:geometry/phasing.geojson#PHASE-001] [depth:renewal_project_list]

## Metrics, Area Recalculation, and Compliance Matrix

Metrics are grouped into three classes. **Spatial recalculation metrics** come directly from GeoJSON: provisional site area, design green ratio, co-test public-space ratio, six prototype footprints, six slow links and three key areas. [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio] **Design-structure metrics** record the three exposure tiers, twelve scenario cards and three human-override courts, verifying that the core idea exists as countable objects rather than rhetoric. [metric:edgecase_test_tier_count] [metric:edgecase_scenario_count] [metric:human_override_court_count] **Statutory and engineering metrics** such as FAR, height, density, road redlines and utility capacity remain unknown until official data arrive.

Long-term operational KPIs are defined without pretending to have baseline data: `edgecase_coverage` compares tested material conditions with an annual target set; `human_handoff_success` measures successful staffed takeovers among triggered takeovers; `reproducible_failure_rate` measures how many published failures another team can reproduce; `public_exit_integrity` audits whether core public routes remain usable without AI; `fix-to-retest_cycle` measures time from failure discovery to repaired retest. These become real metrics only after operation generates auditable data.

`compliance_matrix.json` maps official requirements 1.3, 1.4, 1.5 and agent.1-agent.6. `standard_matrix.json` maps the five currently usable primary professional standards. `design_depth_matrix.json` tracks diagnosis, land use, buildings, traffic, municipal systems, blue-green space, key areas, implementation and risks. Figures, HTML, PDFs and narrative must remain derivatives of the same GeoJSON and metrics rather than a separate visual story. [depth:metrics_recalculation]

![Metrics, failure evidence, and retest loop](assets/figures/metrics-evidence.en.png)

## Risk, Copyright, and Compliance

The first risk is geometry authority. The overall boundary and all key-area polygons are provisional rough geometry; repository issue #1029 adds a material warning for KEY-003. Every area-derived number in this package supports internal consistency and content review only. Official polygons must trigger a full regeneration of spatial layers, metrics, figures, HTML and PDFs. [source:BOUNDARY-SOURCE] [source:REPO-ISSUE-KEY003] The second risk is professional data absence: parcels, ownership, buildings, road redlines, utilities, fire, heritage and engineering data are missing, so the package makes no demolition, intensity or approval commitment. [depth:risk_missing_data]

The third risk is AI governance. A poorly designed living test environment can turn vulnerable users into free test data. EDGECASE therefore requires opt-in participatory tests, data minimization, preference for aggregated/environment data, abstention under low confidence, staffed takeover, visible exit routes, stop rules and de-identified reporting. Health scenarios are navigation rather than diagnosis; child-guardian ambiguity does not trigger automatic identity decisions; public-safety agents do not replace the accountable event operator; commercial agents must expose the responsible service provider. Higher-risk uses require independent legal, ethical, safety and domain review before any deployment.

The fourth risk is copyright and representation. The five figures are generated from the submission's own GeoJSON and procedural graphics; no commercial map tiles, third-party brand graphics or unlicensed photography are embedded. External cases are summarized from official public pages and recorded in `sources.json`. The full statement is in `report/copyright_statement.md`. This proposal does not claim government adoption, official approval, exact redlines or implemented projects. All spatial moves are conceptual recommendations for professional follow-on work.

## References

- Beijing Haidian official competition announcement. [source:OFFICIAL-ANNOUNCEMENT]
- Repository Agent taskbook. [source:AGENT-TASKBOOK]
- Organizer provisional rough boundaries. [source:BOUNDARY-SOURCE]
- Source registry and processed fact pack. [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]
- JTC Punggol Digital District / SIT precinct-scale test-bed. [source:CASE-PDD]
- Toyota Woven City Living Laboratory. [source:CASE-WOVEN]
- Seoul Metropolitan Government Seoul AI Hub. [source:CASE-SEOUL-AI-HUB]
- Mila Ventures research-to-venture ecosystem. [source:CASE-MILA]
- Vector Institute research-to-adoption ecosystem. [source:CASE-VECTOR]
The machine-readable evidence index for this package is:

- `metrics.json`, `assumptions.json`, `compliance_matrix.json`, `standard_matrix.json`, and `design_depth_matrix.json`
