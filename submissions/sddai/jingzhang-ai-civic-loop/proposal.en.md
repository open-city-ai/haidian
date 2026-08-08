---
title: "Jing-Zhang Smart Ring 2.0: Urban Verifiable Protocol"
author_github: "sddai"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With Jing-Zhang Relic Park as the public knowledge spine, integrate Zhongzhiyuan's research and development, the translation of the AI Origin community, and the urban validation organization of Dazhongsi into a traceable, exitable, and replayable city protocol."
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "robot-delivery-low-speed", "enterprise-service-copilot"]
iteration: "v0.2"
---

# Jing-Zhang Smart Ring 2.0: Urban Verifiable Protocol

> **Jingzhang Civic Model Commons** — not to blanket the city with AI, but to transform the city into a validated model that the public can understand, professional teams can verify, and from which failures can safely exit.

## Design Basis and Source List

This proposal confirms the project name, three-story scope, approximate area, and design tasks based on the official announcement; confirms six agent tasks, three positioning, five functions, scenarios, and operational requirements based on the smart body task book; establishes the Urban Design, control boundary, and land classification language based on the local professional standard snapshot. [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

The authoritative order of the submission package is GeoJSON → metrics → matrices → manifest/assumptions → proposal → figures/PDF/HTML. Images are responsible for explaining the design, not for manufacturing precision. [source:PROCESSED-FACT-PACK] [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm] [depth:metrics_recalculation]

Currently, official precise redlines, three key areas with official polygons, control plan indicators, road redlines, ownership, existing buildings, cultural heritage, and municipal data are still lacking. The boundaries are provisionally defined using warehouse geometry, which is only for intake, visualization, and conceptual discussions; it should not be considered as an official redline, approval basis, or precise area reference. [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] [depth:risk_missing_data]

![Figure 01: Evidence of Co-Emergent Space and Urban Protocol Stack](assets/figures/site-overview.png)

## Three-Level Scope Framework

### Rewrite "space hierarchy" as "evidence resolution"

| Level | Announcement Scope | Questions Addressed by This Plan | Verifiable Outputs |
| --- | ---: | --- | --- |
| Coordinated Research Area | Approximately 43.6 km² | How the AI ecosystem spans across universities, parks, communities, and the two wings | mechanisms, roles, case translations, annual loop |
| Overall Design Area | Approximately 11.4 km² | How public knowledge spines organize land use, slow travel, blue-green, and renewal | topology-safe layers, metrics, phased approach |
| Three Key Areas | Approximately 368.4 ha | What spaces and governance are required for R&D, translational, and validation activities | Three Sets of Differentiated Task Books, Scene Passports |

The three levels of scope are not three proportional master plans, but three evidence resolutions: the closer to the key areas, the more one must clarify "who uses the data, what data is used, who reviews, and how to withdraw." [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework] [metric:key_area_count]

### One Ridge Three Fields Two Wings

"The One Spine" is the public knowledge spine of the Jing-Zhang Heritage Park; "Three Fields" are the training field of Zhongzhiyuan, the translation field of the AI Origin community, and the city validation field of Dazhongsi; "Two Wings" are the Zhongguancun Technology Services Wing and the Xiaoyue River Scenario Enablement Wing. The three fields are not the same type of park, but rather a complete loop: **TRAIN → TRANSLATE → TEST → PUBLIC LEARNING**.[data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/roads.geojson#ROAD-001] [depth:overall_spatial_structure]

## Coordinated Research Area: Industry and Future City Research

### Naming and Visual Identity: The Loop is not a Form, but a Responsibility Loop

Keep the Chinese name as "Jingzhang Zhihuan," and upgrade the English promotional name to **Jingzhang Civic Model Commons**. The logo direction takes the form of "railway switch + a pair of curly braces": the switch represents the choice and replay of different paths, while the curly braces represent open-source protocols and readable rules; do not use a corporate logo, personal portraits, or unauthorized fonts. [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] (Jing-Zhang)

The visual system uses only four semantic colors: black represents the public base, Qinghe Green represents blue-green and everyday elements, signal orange represents actions to be verified, and vermilion marks data gaps or exit conditions. The Provisional Boundary always appears as low-contrast dashed lines and does not become part of the main visual composition.

### Seven cases, not replicating landmarks but translating mechanisms

| Case Study Lens | Translatable Mechanism | Jing-Zhang Corresponding Action | Clearly Not Translating |
| --- | --- | --- | --- |
| Kendall Square | Nearest Walkable Neighborhood to Universities—Companies—Capital | AI Origin Community Setting Translated into an Entry Hall | Avoid Replicating Intensive Development |
| Station F | Concentrate Startup Services but Maintain Open Interfaces | Share Legal Services, Evaluation Services, and Customer Testimonials | Avoid Replicating Super-Sized Monoliths |
| Toronto MaRS | Professional Translation for Healthcare and Technology | Synthetic Case Studies + Expert Review Lab | Not for Real Diagnosis |
| Seoul DMC | Content Industry Public Display | Dazhongsi Content Safety Theater | No Excessive Large-Screen Display |
| Singapore one-north | Research and Development with Living | 24-hour Time-Segment Reuse | No Fabrication of Land Approval |
| Paris-Saclay | Campus-City Integration and Open Research | Active Transport + Open Lecture Series | Not Replicating Suburban Campus Models |
| Shenzhen Nanshan | Hardware Iteration and Productization | Zhongzhiyuan Edge-side Prototype Courtyard | Avoid Fabricating Corporate/Supply Chain Commitments |

These cases are provided merely as mechanisms for study and do not constitute project facts or recruitment promises. [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]

### Six Cutting-Edge but Auditable Urban Protocols

1. **Scene Passport**: Each AI scene must be associated with a location, target audience, data type, Human Review, operational responsibility, and exit conditions.
2. **Fallback for Zero Data**: Even when authorization is denied, there is no phone, or the system is offline, public services can still be completed through manual means and physical facilities.
3. **Sunset Clause**: Testing with a clear review cycle; exit when public value, risk is uncontrollable, or maintenance costs are disproportionate.
4. **Public Value Redirection**: The use of Public Space in the scenario should redirect to open hours, knowledge sharing, accessible services, or public debriefing.
5. **LoRA-Style Micro-Updates**: Adjust existing buildings with low-parameter actions such as first-floor openness, breakpoints stitching, and prototype slots, without defaulting to large-scale demolition and reconstruction.
6. **Right to Repurpose Time Slots:** The same space serves research and development, commuting, community activities, learning, and events on a 24/7 schedule to avoid premature functional zoning.

All of the above are Conceptual Recommendations, which are intended to guide professional teams in further research and development, and do not replace formal planning or government approval. [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:overall_spatial_structure]

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### LoRA Urbanism: Fewer Parameter Adjustments, More Preservation of Urban Memory

Overall updates employ four low-parameter actions: ground-level open access, slow-moving connectivity breakpoints, replaceable prototype slots, and temporal spatial reuse. `land_use.geojson` is a complete conceptual partition; `buildings.geojson` only provides a conceptual building evidence layer, not representing a full inventory of existing buildings; `constraints.geojson` is empty, explicitly indicating that formal control lines have not been obtained for inclusion, rather than "no constraints." [data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLDG-001] [data:geometry/constraints.geojson#CONSTRAINTS-PENDING] [depth:land_use_layout] [depth:retain_renovate_demolish]

![Figure 02: Conceptual Land Use Skeleton, Reversible Plugins, and 24-Hour Time-Slice Reuse](assets/figures/land-use-structure.png)

### Control language forward, retreat false values backward

Before the official control plan, ownership, road, municipal, fire safety, and cultural heritage documents are in place, this plan only proposes control intentions such as public interface, continuous pedestrian access, blue-green permeability, reversible testing, and human review. The Floor Area Ratio, Building Height, Building Coverage Ratio, development scale, and parking supply remain unknown and are not determined by rendering images. [metric:floor_area_ratio] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [depth:development_intensity_controls] [depth:height_massing_character]

### Transportation, Utilities, and Public Services: Connect First, Then Accommodate, and Finally Expand

Prioritize the repair of pedestrian/bicycle discontinuities, non-motorized vehicle order, and wayfinding in the short term; study station integration and the opening of the first floor in the existing buildings in the medium term; and only assess edge computing, distributed energy, charging and swapping, and underground space in the long term after clarity on capacity and ownership is achieved. Any horizontal connections, station renovations, and equipment layout are conceptual organizations and are not engineering lines. [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure]

## Detailed Design of Key Areas

![Figure 03: Value Chain of Models at Three Key Areas for Training, Translation, and Validation](assets/figures/key-areas.png)

### 01 Zhongzhiyuan: TRAIN / Full Stack R&D Garden

Organize space around quiet research courtyards, end-side prototype courtyards, low-speed robot loops, and safety governance tables. Testing uses public benchmarks or synthetic samples; low-speed equipment is taken over by safety officers; the Qinghe and green space interfaces maintain low disturbance. The pilot project is the first-level open space, test reservation rules, and check-out procedures, not additional construction scale. [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design]

### 02 Beijing AI Origin Community: TRANSLATE / near-school transliteration living room

Make the intermediate steps from research to public value explicit: result translation lobby, synthesis case laboratory, talent night school, professional review desk. Community residents are not merely display audiences but problem posers and exit rights holders. Any university, park, or residential function adjustments are contingent upon confirmation of ownership, fire safety, noise, and traffic conditions. [data:geometry/key_areas.geojson#PROV-KEY-002] [depth:three_key_area_detailed_design]

### 03 Dazhongsi: TEST / Urban Validation Showcase

Test AI-Native activities with terminal experience streets, metro quadrants for slow travel, content safety theaters, and zero-data service stations. Each terminal must provide human service, no mobile phone paths, and a fail-safe exit. Site connectivity, static transportation, and nighttime activities are reference solutions; await traffic specialty and operational review. [data:geometry/key_areas.geojson#PROV-KEY-003] [depth:three_key_area_detailed_design]

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### Six categories of users, not covered by "AI Talent" for all.

| User | Primary Need | Corresponding Space | Non-Negotiable Boundary |
| --- | --- | --- | --- |
| Baseline Researchers | Quiet Collaboration, Evaluation, and Compliance Data | Zhongzhiyuan Research Courtyard | Not Disturbing Research with Open Display |
| Product Engineer | Prototype and Edge Side Debugging, Rapid Commuting | Prototype Courtyard and Pedestrian Loop | Safety Personnel Can Take Over Instantly |
| Startup Team | Workstations, Legal, Customer Trial | Translated Foyer | Does Not Imply Financial/Courts Commitment |
| Neighboring residents | Reliable Daily Services and Right to Exit | Public Knowledge Spine | placeholder_for_no_data |
| Youth and Elderly | Understandable, Low-threshold, No Mobile Phone Pathway | Learning Points and Service Stations | Artificial Entrance Always Visible |
| International Visitors/Developers | Bilingual Guided Tours, Events, and Urban Culture | Three Rotating Routes | Source and Copyright Tracable |

Machine metrics still record the minimum scope of 5 types of persona as per the task book; the main text actively expands to 6 types to single out adolescents and seniors, which are easily averaged out. [metric:persona_count]

### Ten "Scene Passports"

| # | Scenario / Type | Space | Minimum Data | Human Review | Exit Criteria |
| --- | --- | --- | --- | --- | --- |
| 01 | Model Evaluation Open Day / TEST | Zhongzhiyuan | Public Benchmarks, Synthetic Samples | Professional Review | Benchmarks Untraceable Shall Be Suspended |
| 02 | Slow-Moving Delivery Robots / TEST | Public Knowledge Spine | Local Obstacle Avoidance | On-Site Safety Officer | Stop at Peak Hours, Faults, or Complaints |
| 03 | Side Perception Streetlights / TEST | Dazhongsi | Anonymous Environmental Data | Maintenance Personnel | Switch Back to Routine Lighting |
| 04 | Medical Translation Simulation | AI Origin | Synthetic Case | Medical Expert | Does Not Enter Real Clinical Diagnosis |
| 05 | Education Mentor Pavilion | Community Learning Point | Local Selection Question | Teacher/Counselor | Content Appeal or Deviation Results in Removal |
| 06 | Entrepreneurship Compliance Hub | Translational Foyer | User-Initiated Input | Legal/Tax Professionals | Prohibit Automatic Final Opinion |
| 07 | Urban Operation Dashboard | Public Exhibition Hall | Aggregate Indicators | Administrator | Small Sample or Re-identification Risk is Hidden |
| 08 | Jing-Zhang Historical Tour | Site Nodes | No Personal Data | Historical Editing | Source Controversy to Be Marked/Withdrawn |
| 09 | Developer City Week | Three Rotating Sessions | Minimum Registration Fields | Activity Operations | Security and Traffic Unconfirmed to be Reduced |
| 10 | Accessible Travel Assistant | Slow Travel Nodes | Optional Destinations | Human Information | Always Retain No-Phone Route |

01–03 For at least 3 industrial Testing and Validation Scenarios; each passport complies with the principles of minimization, Human Review, revocability, and sunset provisions. [source:AGENT-TASKBOOK] [metric:scenario_card_count]

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

`land_use.geojson` uses formal classification subsets to express research, green spaces and open areas, commercial services, and community services, and fully covers the temporary overall boundary without serving as a legal land adjustment. [data:geometry/land_use.geojson#LU-002] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]

Provide services for quiet R&D, flexible entrepreneurship, prototype validation, public activities, and talent living as five product categories. The demolish–renovate–retain () strategy judgment order is: safety → ownership → public value → carbon cost → connectivity contribution; if any item is missing, prioritize retention and micro-updates. Building Footprint recalculation is a conceptual evidence and cannot replace surveying. [metric:building_footprint_area_sqm] [depth:retain_renovate_demolish] (Demolish–Renovate–Retain Strategy)

## Transport, Rail, Municipal Infrastructure, and Public Services

Preserve the north-south alignment along the Public Knowledge Spine, and connect the east-west direction through three types of stitching actions linking universities, communities, and sites: direct implementable guided tours/non-motorized traffic organization, reversible corner/first-floor openings, and site/cross-road works that require specialized justification. These three actions must be represented with different line types on the diagram to avoid conflating conceptual bridges and tunnels with established projects. [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]

Adopt the fail-safe principle of "ordinary functions first": smart lights initially serve as qualified streetlights, service kiosks start with human windows, robotic pathways function as accessible sidewalks, and digital signboards remain functional even when closed, still retaining paper wayfinding. [depth:municipal_new_infrastructure]

![Figure 04: Slow-Travel, Blue-Green, Public Knowledge, and Four-Level Failure-Safe Network](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

`green_space.geojson` and `public_space.geojson` express conceptual supply and do not replace green lines, blue lines, park implementation boundaries, or cultural heritage controls. A four-tier safety spine for public knowledge is set: no mobile phones, no authorization, no network, and system exit; each tier maintains basic service continuity. [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001] [metric:green_ratio] [metric:public_space_ratio] [depth:blue_green_public_space]

Three sacred sites do not feature giant technological sculptures but rather serve as accumulative public knowledge infrastructures: **Jing-Zhang Centennial Algorithm Station** records the history of engineering and model-making; **Open Contribution Index** showcases authorized code, papers, and public service contributions; **City Prototype Theater** publicly displays how scenarios are tested, questioned, corrected, and withdrawn. The value of the landmarks lies in their continuous editing, not in their cost or screen area. [source:AGENT-TASKBOOK]

Aesthetic control focuses on "restraint, readability, and maintainability": the first floor emphasizes openness and shading; nightscapes should not default to screen-based lighting; equipment should be replaceable, cables maintainable, and interfaces restorable; historical narratives and community daily life should take precedence over a technological atmosphere.[standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:height_massing_character]

## Renewal Projects, Implementation Policy, and Phasing

| Time Period | Lead Projects | Allowed Evidence | Exit/Upgrade Conditions |
| --- | --- | --- | --- |
| 0–18 months | Guided Tour, Non-Motorized Traffic Organization, Scene Passport, Zero Data Service | Observation, Interviews, Public Records | Complaints/Safety/Maintenance Issues Require Immediate Rectification |
| 18–48 months | First Floor Open, Shared Testing, Site Interface Study | Specialized Survey, Title Review and Fire Safety Verification | Permanent Status Only if Conditions Are Met |
| 48 months later | Mixed-use development, new infrastructure, permanent activity facilities | official polygons, control plan, urban planning, cultural heritage documents | legally enter professional and approval processes |

`phasing.geojson` only expresses the conceptual scope for Phase 1. Implementation strategies follow the principle of " reversible interim measures, evidence for permanence": temporary projects are not of low quality but are intended to earn the right to make further decisions based on genuine use evidence. [data:geometry/phasing.geojson#PHASE-001] [depth:renewal_project_list] [depth:phasing_implementation]

Annual operations should not rely on a single "Grand Conference" to solve all issues, but rather form a quarterly review: Spring Open Source Toolchain Week, Summer City Testing Season, Autumn International Developer City Week, Winter Public Value Audit Exhibition. Each season should leave behind publicly accessible issues, exit records, and the next round of assumptions; all activities are Conceptual Recommendations and do not constitute government schedules, funding, or investment commitments. [source:AGENT-TASKBOOK]

## Metrics, Area Recalculation, and Compliance Matrix

![Figure 05: Evidence Chain from GeoJSON to Indicators, HTML, PDF, and Self-Inspection](assets/figures/metrics-evidence.png)

| Indicator | Current Value | Formula/Source | Explanation Boundary |
| --- | ---: | --- | --- |
| site_area_sqm | 11,412,825.386 ㎡ | provisional site polygon | non-precise official area |
| green_ratio | 12.3423% | green / site | Conceptual layer, does not replace the green space ratio control |
| public_space_ratio | 7.3281% | public / site | Conceptual level, does not replace statutory indicators |
| key_area_count | 3 | count(key areas) | polygons are provisional |
| scenario_card_count | 10 | Readable Passport | Operational Concept, Not Yet Approved |
| persona_count | 5 (minimum machine caliber) | Task Statement Self-Check | Expand the Main Body into 6 Categories |

Floor Area Ratio, Building Height, Building Coverage Ratio, road redline, and municipal capacity are explicitly marked as unknown, rather than 0. [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio] [metric:key_area_count] [metric:scenario_card_count] [metric:persona_count] [depth:metrics_recalculation]

Align the grid system to cover announcements 1.3, 1.4, 1.5, and agent.1–agent.6; standard matrices cover project announcements, clear title assignments, Urban Design, control plans, and land classification; fifteen design depths each have text, layers, drawings, sources, assumptions, and self-inspection evidence.

## Risk, Copyright, and Compliance

1. **Spatial Precision**: After the official polygons are in place, it is necessary to uniformly replace the sites/key areas, redo the partitioning, area calculations, drawings, and generate the HTML and PDF files.
2. **Implementation Rights**: Before clarifying the title, control plan, roads, utilities, fire safety, and cultural heritage protections, no specific conclusions regarding the Demolish–Renovate–Retain Strategy, intensity, alignment, or sequence will be formed.
3. **AI Governance**: Privacy, bias, explainability, accessibility, and maintenance cost reviews for each scenario; the public retains the right to opt out in favor of an artificial alternative pathway.
4. **Public Interest**: The Public Space test must demonstrate public benefit; failure to do so triggers the sunset clause.
5. **Copyright**: The charts are programatically generated using local GeoJSON/JSON, with no external maps, images, trademarks, people, or remote fonts; see `report/copyright_statement.md`. [source:SOURCE-REGISTRY] [depth:risk_missing_data]

All spatial design recommendations are conceptual suggestions, references, or materials for further in-depth study by professional teams. They do not replace formal planning, nor do they constitute government approval, engineering feasibility, investment, business attraction, or event commitments. (Open Co-Creation) (Conceptual Recommendation)

## References

- `brief/site-package/design_brief.json`
- `brief/site-package/agent_taskbook.json`
- `brief/site-package/allowed_design_space.json`
- `brief/site-package/standards/standards.json`
- `brief/site-package/standards/references/*.md`
- `data/source_registry.json`
- `data/processed/agent_fact_pack.md`

Core Evidence Entries: [source:SITE-PACKAGE] [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SOURCE-REGISTRY] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
