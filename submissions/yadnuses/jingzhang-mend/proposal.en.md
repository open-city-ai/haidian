---
title: "Jingzhang MEND Corridor: A Care-and-Mending Urban Design for the Centennial Jing-Zhang AI Innovation Belt"
author_github: "yadnuses"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Jingzhang MEND Corridor takes 'mending three fractures' as its master concept: a 120-meter-wide, roughly 9.66 km Jing-Zhang Green Spine care promenade stitches the east-west spaces split by the railway; the three cores — Zhongzhiyuan, the Beijing AI Origin Community, and Dazhongsi — plus two wings carry the full-stack independent hard-core narrative and care-technology scenarios respectively; and more than ten care scenario cards make the elderly, children, people with disabilities, and low-digital-literacy residents the first beneficiaries of the AI Innovation Belt. All spatial, policy, and investment statements are conceptual proposals; core metrics can be recalculated from the GeoJSON; regulatory-plan indicators remain unknown pending official data."
tracks: ["jingzhang-heritage-narrative", "ai-public-services", "ai-origin-community"]
scenarios: ["ai-cultural-guide", "ai-health-service-navigation", "ai-traffic-walkability", "robot-delivery-low-speed"]
iteration: "v0.2"
---

# Jingzhang MEND Corridor: A Care-and-Mending Urban Design for the Centennial Jing-Zhang AI Innovation Belt

## Opening: A Three-Minute Plain-Language Version for Residents

This section cites no machine-readable IDs and answers only three questions: **who does what for whom and when, whom to call when something goes wrong, and how to stop it.**

**What we propose.** A century ago, the Beijing-Zhangjiakou Railway repaired the confidence of the Chinese people in building on their own; today, three fractures torn open by speed along this belt need mending: the railway cuts the city into east and west halves (a spatial fracture); campuses, innovation parks, and neighborhoods barely interact (a social fracture); and the elderly, children, and low-digital-literacy residents are being left behind by the intelligent age (a digital fracture). This scheme proposes a care promenade along the Jing-Zhang Green Spine and a network of care stations in the AI Origin Community: helping seniors register for hospital appointments and accompanying them to visits during the day, picking up and hosting children after school in the early evening, and opening community repair workshops on weekends. Four east-west stitching corridors, each about 40 meters wide, reconnect the two halves split by the railway, and at each corridor mouth sits a plaza node of about 19,200 square meters, hosting markets, free clinics, and open-air film screenings.

**Whom to call.** Every AI service is written onto a scenario card in Section 6: users, operating body (proposed), data sources, privacy boundaries, and the human-review entry point correspond one to one. If something goes wrong, first contact the community operations specialist named on the scenario card, then the sub-district and district-level platforms. Every card retains human review; no AI judgment may directly become a disposition imposed on a resident.

**How to stop it.** Residents can, through the community council, demand that any scenario be taken offline for rectification. Data collection follows minimum necessity: no personal trajectory profiling, no use for commercial recommendation. It must be stressed that every arrangement in this section is a conceptual proposal, not an adopted government decision or implementation arrangement; the implementation path, responsible bodies, and exit mechanisms are in the implementability matrix in Section 10.

## Design Basis and Source List

The primary basis of this scheme is the Pre-Qualification Announcement of the Centennial Jing-Zhang AI Innovation Belt International Urban Design Open Call, issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources; its clauses 1.3, 1.4, and 1.5 define the project purpose, the three-level scopes, the three key areas, and the required deliverable depth [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. The second basis is the agent-oriented open-call taskbook, whose ten co-creation principles, six agent tasks, and unified boundary clauses constrain this scheme's narrative, scenario, and operations expressions [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. Together they form the task-level evidence; this scheme's 23 mandatory task responses are attached item by item in `compliance_matrix.json`.

Source credibility is graded in three tiers, following the usage boundaries of the repository source registry [source:SOURCE-REGISTRY]: formal-usable sources (the announcement, taskbook excerpts, and five regulations and standards with local snapshots) may directly support judgments in the text; background_only sources serve as background only and are never upgraded to a basis; provisional_only sources serve only as intake leads. The enumerations, limits, schemas, and provisional geometry in the site package are machine-readable bases [source:SITE-PACKAGE]; the depth requirements for the existing-conditions diagnosis and the missing-data list are governed by [depth:existing_conditions_diagnosis]. `data/processed/agent_fact_pack.md` is only a reading-navigation layer; every factual judgment returns to the original registered materials [source:PROCESSED-FACT-PACK].

![Overall concept of the Jingzhang MEND Corridor and the three-level scope evidence chain](assets/figures/site-overview.en.png)

The spatial basis must be stated frankly: the official SITE_BOUNDARY and the precise polygons of the three KEY_AREAs have not been released. Both `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` in this package derive from provisional boundaries provided by the maintainers [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]; the overall-scope anchor is [data:geometry/site_boundary.geojson#SITE-001] and the key-area anchor is [data:geometry/key_areas.geojson#PROV-KEY-001]. They may be used only for scheme generation, self-checking, visualization, and design discussion — never as an official redline, an approval basis, or a precise-area basis. The recalculated overall design area of 11412825.386 sqm [metric:site_area_sqm] and the key-area count of 3 [metric:key_area_count] are both scheme-recalculated values under the provisional boundary. The full inventory of sources, metrics, standards, design depths, and task coverage is kept in `sources.json`, `metrics.json`, `standard_matrix.json`, `design_depth_matrix.json`, and `compliance_matrix.json`; the body text does not duplicate the machine index.

## Three-Level Scope Framework

The three-level scopes established by the announcement are the working skeleton of this scheme [depth:three_level_scope_framework]: the Coordinated Research Area of about 43.6 square kilometers answers questions of AI industrial ecology and future urban form; the Overall Design Area of about 11.4 square kilometers (the urban area 1-2 kilometers around the Jing-Zhang Railway Heritage Park) carries the urban-renewal overall framework and regulatory-plan-level urban design; the Key-Area Detailed Design Area of about 368.4 hectares carries detailed design of the three sub-districts to the depth of an Integrated Planning Implementation Plan.

| Level | Announced area | Core question answered by this scheme | Data anchor |
| --- | --- | --- | --- |
| Coordinated Research Area | approx. 43600000 sqm | MEND industrial ecology, naming system, regional coordination loop | compliance_matrix.json, Section 3 |
| Overall Design Area | announced approx. 11400000 sqm; recalculated in this package 11412825.386 sqm | the one-spine / three-cores / two-wings / four-corridors spatial structure and renewal framework | [data:geometry/land_use.geojson#LU-001] |
| Key-Area Detailed Design Area | announced approx. 3684000 sqm; recalculated in this package 3692893.005 sqm | the positioning, scenarios, and implementation path of each of the three cores | [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_areas_total_area_sqm] |

**General statement on the provisional boundary.** The current geometry uses `brief/site-package/geometry/provisional_boundaries.geojson` (PROV-RESEARCH-001 / PROV-SITE-001 / PROV-KEY-SCOPE-001 / PROV-KEY-001/002/003), inferred from the announcement's textual boundary limits and approximate areas, with areas verified in EPSG:4548 [depth:overall_spatial_structure]. This geometry is used only for intake generation, visualization, and discussion; it must not serve as an official redline, an approval basis, a precise-area basis, or a formal scoring basis; the organizer's data gap itself neither blocks content scoring nor causes point deductions. Once the official boundary is released, the layers and metrics to be recalculated as a whole are the eight layers site_boundary, key_areas, land_use, buildings, roads, green_space, public_space, and phasing, plus every known metric in `metrics.json` — at that point the generation scripts, self-checks, and the drawings/HTML pipeline will be re-run; replacing a single file in isolation is not allowed.

**Proactive errata (a data erratum is itself a contribution).** This scheme confirms two repository-level data issues and designs around them: first, Issue #1029 notes that the centroid of the provisional key area PROV-KEY-003 (Dazhongsi) deviates about 2.26 kilometers from the location described in the announcement, so every spatial conclusion about the Dazhongsi area is expressed only directionally [source:ISSUE-1029-KEYAREA-CENTROID]; second, Issue #846 notes that the provisional Overall Design Area and the OSM-surveyed Jing-Zhang Railway Heritage Park are about 412.5 meters apart at the nearest and do not intersect, so the spatial relationship between the Green Spine and the Heritage Park is handled as "a conceptual corridor oriented toward the Heritage Park, with the exact interface pending confirmation of the official boundary" [source:ISSUE-846-SITE-PARK-GAP].

![The three-level scopes and the one-spine / three-cores / two-wings / four-corridors spatial framework](assets/figures/land-use-structure.en.png)

Within the three-level framework, the overall spatial structure of this scheme is "one spine, three cores, two wings, four corridors": **the spine** is the Jing-Zhang Green Spine, a 120-meter-wide, north-south care-promenade main axis; **the three cores**, from north to south, are Zhongzhiyuan (the full-stack independent hard-core narrative), the AI Origin Community (the main theater of care scenarios), and Dazhongsi (AI-native consumption); **the two wings** are the Zhongguancun Technology Services Wing on the west and the Xiaoyue River Scenario Enablement Wing on the east; **the four corridors** are four east-west stitching corridors, each carrying a 19,200 sqm plaza node. This structure lands as land use and layers in Section 4 and as key-area detailed design in Section 5.

## Coordinated Research Area: Industry and Future City Research

### Overall Concept: Jingzhang MEND

The one-sentence concept of the "Jingzhang MEND Corridor" (Chinese brand name 相护京张, "caring for Jing-Zhang together") is: a century ago, the Beijing-Zhangjiakou Railway repaired the confidence of the Chinese people in building on their own; a century later, this belt repairs the urban everyday torn apart by speed — the value of AI is not to be faster, but to care. MEND unfolds into four verbs: **Mend** stitches the spatial fracture, **Empower** stitches the social fracture, **Nurture** stitches the digital fracture, and **Develop** makes care technology itself an industry. The three official positionings fall naturally into place: the Centennial Jing-Zhang Culture Belt equals the mending narrative (from building a railway to mending a city); the Urban AI Life Experience Belt equals care scenarios; the AI Integration and Innovation Belt equals care technology and the full-stack independent industry. The coordination of naming, positioning, and functions follows the taskbook requirements and is a conceptual proposal, not an adopted arrangement [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Naming System and Logo Direction

The sub-brands derive from the four verbs, forming an extensible naming system: **Mend Lab** (Zhongzhiyuan — full-stack independence and standards governance), **Empower Hub** (Xiaoyue River wing — scenario testing and public-service enablement), **Nurture Station** (AI Origin Community — the care-service network), and **Develop Studio** (Dazhongsi — AI-native consumption and content business formats). The logo design direction is the "rail spike + stitch line" image: a rail spike from Zhan Tianyou's era, threaded by a walking line like a row of stitches — the spike commemorates independent construction, and the stitches symbolize mending and connection. The recommended palette is Jing-Zhang iron gray plus new-leaf green. This naming and logo are original concept directions; they use no unauthorized fonts, trademarks, portraits, or corporate logos, and rights clearance must be completed separately before detailed design.

### Three Zones and Two Wings: Synergy and the Regional Coordination Loop

The division of labor among the three zones and two wings is the spatial division of MEND: Zhongzhiyuan carries the "hard core" of full-stack independence, the Origin Community carries the "warmth" of care scenarios, Dazhongsi carries the "interface" of AI-native consumption, the Zhongguancun Technology Services Wing exports IP and capital enablement, and the Xiaoyue River Scenario Enablement Wing provides test scenarios and the blue-green base [depth:overall_spatial_structure]. Regional coordination is a common gap named by this review; this scheme responds with a dedicated sub-section (all are mechanism proposals):

- **The Beiwei community (toward Qinghe-Shangdi):** as the residential hinterland and commuting source for care scenarios, a northward extension of the Green Spine promenade is proposed to form daily ties with community canteens and childcare spots.
- **Future Science City:** the pilot-scale and industrialization hinterland for full-stack independent results; a "Zhongzhiyuan R&D — Future Science City pilot-scale" results-transfer shuttle mechanism is proposed.
- **Huairou Science City:** research-source coordination with major scientific facilities; jointly hosting an annual care-technology forum and sharing the list of test scenarios are proposed.
- **Beijing Economic-Technological Development Area (BDA):** manufacturing and verification coordination for care hardware such as rehabilitation robots and low-speed delivery robots; the testing-and-validation scenarios in Section 6 are proposed for mutual recognition with BDA's scenario-access mechanism.
- **Beijing-Tianjin-Hebei:** the Beijing-Zhangjiakou high-speed railway pulls Zhangjiakou into the one-hour circle; linking the "Jing-Zhang Sports, Culture and Tourism Belt" with MEND's winter care and ice-and-snow-season resilience testing is proposed, forming a cross-regional communication narrative.

### Global Case Studies (6 cases; common public knowledge; methodology reference only)

- **Japan's care-robot cluster (Tokyo):** insurance payment and product certification pulling the care-robot industry — transfer point: care technology needs payers and standards first; corresponds to Zhongzhiyuan's standards-governance narrative.
- **Denmark's care architecture and welfare design system (Copenhagen):** nursing homes designed as participants in urban public life — transfer point: care facilities can be part of an open block; corresponds to Nurture Station's street-facing interface.
- **Seoul's Cheonggyecheon restoration:** the political courage and the operations and maintenance behind removing an elevated highway and restoring a waterway — transfer point: stitching infrastructure divides requires phasing and operations together; corresponds to the four corridors' stage gates.
- **New York's High Line:** derelict rail infrastructure regenerated into a public corridor, maintained long-term by a "Friends" organization — transfer point: the Green Spine needs an independent long-term operating body; corresponds to the operations mechanism in Section 10.
- **Singapore's Seniors Go Digital programme:** national-level digital inclusion for the elderly while retaining non-digital channels — transfer point: care scenarios must keep a staffed window for low-digital-literacy users; corresponds to the privacy and human-review design in Section 6.
- **Boston's AgeLab industry-university-research network (MIT):** a university laboratory translating care research into products and policy — transfer point: the Origin Community's near-campus translation mechanism can introduce care-technology project topics.

The judgment on future urban form converges here: an AI city is not a faster city, but a city that cares better. This morphological judgment ultimately lands in the land-use and public-space structure [data:geometry/land_use.geojson#LU-001] [data:geometry/public_space.geojson#PUBLIC-001], and loops back through the urban-design standard's coordination requirements on character and public space [standard:MOHURD-URBAN-DESIGN-MEASURES].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The spatial structure of the Overall Design Area is "one spine, three cores, two wings, four corridors." Land use is generated by cutting a unified grid; adjacent cells share cutting boundaries, and measured pairwise overlap and coverage voids are both zero. Land-use classification adopts the project-subset coding of the national guide for land and sea use classification in territorial-space survey, planning, and use control [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout]. The total recalculated land-use area is 11412825.386 sqm, and its difference from the overall boundary area is 0 [metric:land_use_total_area_sqm].

| Code | Land use | Area (sqm) | Share | Design intent |
| --- | --- | ---: | ---: | --- |
| 0802 | Research land | 2525996.6 | 22.13% | Zhongzhiyuan core + middle segment of the Zhongguancun Technology Services Wing + east side of the Origin Community |
| 05 | Commercial and business services land | 2269228.0 | 19.88% | Dazhongsi core, Zhongzhiyuan east wing, inner ring of the services wing |
| 1402 | Protective green space | 1794307.8 | 15.72% | Xiaoyue River wing and edge buffer belts; blue-green base of the scenario enablement wing |
| 0701 | Urban residential land | 1600676.3 | 14.03% | South gateway and the Origin Community residential retention area (care hinterland) |
| 1401 | Park green space | 1089134.9 | 9.54% | Jing-Zhang Green Spine: the 120-meter-wide linear care-promenade main axis |
| 16 | Reserved (white-space) land | 854767.9 | 7.49% | Northern Green Spine segment and middle of the east wing: white space is the possibility of future mending |
| 0702 | Urban community-service facilities land | 660369.8 | 5.79% | Care-service support for the Origin Community and the middle segment |
| 0804 | Education land | 236984.0 | 2.08% | East side of the Origin Community, in the Wudaokou collegiate atmosphere |
| 1207 | Urban and rural road land | 168908.0 | 1.48% | 4 east-west stitching corridors (each about 40 meters wide) |
| 0803 | Cultural land | 135652.0 | 1.19% | Cultural-imagery area east of the Dazhongsi core |
| 1403 | Public square land | 76800.0 | 0.67% | 4 corridor x Green Spine crossing plaza nodes (19,200 sqm each) |

The urban-renewal overall framework is organized as "retention and darning first, corridor stitching prioritized, white space reserved for flexibility": 1401+1402 form a green base of 2883442.715 sqm [metric:green_space_area_sqm], 1207+1403 form the stitching system, and code-16 reserved land carries phasing flexibility. All land-use expressions are conceptual proposals. Following the measures for the formulation and approval of regulatory detailed plans, the text distinguishes three registers of language — "known control conditions, design recommendations, and matters pending confirmation" [standard:MOHURD-CONTROL-DETAILED-PLANNING]: this scheme does not hold approved regulatory-plan conditions, so floor area ratio, building height, building coverage, green-ratio requirements, and setbacks are uniformly recorded as pending confirmation of formal regulatory-plan conditions [depth:development_intensity_controls]; no speculative value is passed off as an approved indicator.

For industrial function layout, research and commercial services together carry about 42% of the land, bearing the AI full-stack and care-technology directions of the "1+X+1" industrial system. Industry-target indicators (AI innovation index, talent density, output scale) are directional recommendations that need continuous calibration with operating data; they are not written as approved conclusions — see the three-tier metric classification in Section 11.

## Detailed Design of Key Areas

All three key areas are provisional rectangular boundaries (see the errata in Section 2). The design below reaches "directional detailed design" depth: positioning, spatial moves, and scenarios are explicit; parcel-level conclusions will be deepened after official polygons are released [depth:three_key_area_detailed_design] [metric:key_area_count].

![Positioning differences and design tasks of the three key areas](assets/figures/key-areas.en.png)

### Zhongzhiyuan AI Independent Innovation Acceleration Area (Mend Lab)

Anchored to [data:geometry/key_areas.geojson#PROV-KEY-001] (area_id: zhongzhiyuan_ai_acceleration_area; announced approx. 1921000 sqm; provisional recalculation deviation +0.43%). Positioned as a garden-type full-stack independent-innovation neighborhood: code-0802 research land as the main body, with a low-carbon innovation and exchange corridor organized along the Qinghe River frontage. Mend Lab hosts model testing, standards-setting workshops, and safety-governance exhibits, turning "independent and controllable" from a slogan into a public narrative that can be visited, booked, and supervised. For external transport, conceptual optimization directions are proposed in connection with the regional integration of the Fifth Ring Road; exact alignments await engineering data.

### Beijing AI Origin Community (Nurture Station)

Anchored to [data:geometry/key_areas.geojson#PROV-KEY-002] (area_id: beijing_ai_origin_community; announced approx. 1043000 sqm; deviation +0.02%). Positioned as the campus-adjacent main theater of care scenarios: incubation and translation are organized around the original innovation of Tsinghua University, Peking University, and the Chinese Academy of Sciences — but the best street frontage is reserved for care. The Nurture Station care-station network embeds into 0702 community-service land, offering medical-visit accompaniment, childcare hosting, and digital-literacy classes. Campuses, parks, and blocks are stitched by low-disturbance walking and cycling; renewal is mainly retention and darning, and demolish-renovate-retain appears only as a conceptual classification (Section 7). Transit-station integration is conceptually organized around Wudaokou and Qinghua East Road West Crossing stations.

### Dazhongsi AI Industry Cluster (Develop Studio)

Anchored to [data:geometry/key_areas.geojson#PROV-KEY-003] (area_id: dazhongsi_ai_industry_cluster; announced approx. 720000 sqm; deviation +0.06%). Positioned as an urban-type AI-native consumption district: a Develop Studio business-format cluster organized around agents, smart terminals, and content consumption, with Dazhongsi Station integration and four-quadrant pedestrian connection at the intersection as the first public work (reference scheme). **Erratum notice:** Issue #1029 confirms that the PROV-KEY-003 centroid deviates about 2.26 kilometers [source:ISSUE-1029-KEYAREA-CENTROID]; therefore all spatial conclusions for this area are directional expressions only, and no parcel-level commitment is made before the official boundary is released.

| Key area | Positioning | First spatial move | Main scenarios | Implementation risk |
| --- | --- | --- | --- | --- |
| Zhongzhiyuan | full-stack independent hard-core narrative | low-carbon innovation corridor on the Qinghe frontage | independent model testing, standards-governance exhibits | external transport conditions of the Fifth Ring Road to be verified |
| AI Origin Community | main theater of care scenarios | embedding the care-station network | visit accompaniment, childcare, digital literacy | campus boundaries and ownership to be verified |
| Dazhongsi | AI-native consumption interface | four-quadrant pedestrian connection at the station | smart terminals and content consumption | centroid deviation (Issue #1029) |

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### User Personas (7 types; care-vulnerable groups first)

| Persona | A typical day | Core needs | Spatial response | Data boundary |
| --- | --- | --- | --- | --- |
| Children | home via the corridor plaza after school | safe pickup, after-school hosting, playable outdoors | safe school routes along stitching corridors, play corners at plazas | no trajectory collection of minors; parental authorization |
| Seniors | clinic in the morning, park in the afternoon | appointment registration and accompaniment, slow-walk rest stops, someone to talk to | accompaniment desks at care stations, age-friendly rest points on the Green Spine | no health-data collection; service referral only |
| People with disabilities | travel relying on accessible routes | continuous accessible paths, predictable road conditions | accessible-navigation scenario, flush corridor connections | anonymized road-condition data, never linked to personal identity |
| Low-digital-literacy residents | vendors and residents who do not use apps | staffed windows, cash accepted, slow-paced teaching | staffed service desks at stations, digital-literacy classes | minimal service records, deletable at any time |
| Caregivers (care workers and family members) | caregiving on workdays, anxiety at night | respite services, professional support, being seen | respite hosting spots, the Caregivers' Wall of Honor (Section 9) | scheduling data belongs to the institution; no personal profiling |
| Open-source developers | night collaboration, weekend hackathons | release, collaboration, testing, community reputation | open-source release hall at the Origin Community, public code wall | activity data only in aggregate statistics |
| Startup teams | looking for scenarios, compute, and funding | low-cost testbeds, compliance advice | shared testbed at Zhongzhiyuan, enterprise service desk | compute and data services authorized separately |

### AI+ Scenario Cards (12 cards, including 3 industrial testing-and-validation scenarios)

Each scenario card follows unified fields: users / context / data_inputs / public_value / risks / human_review. Every scenario retains a human-review entry and a resident stop channel; spatial carriers land on specific layers [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/roads.geojson#ROAD-001].

| # | Scenario card | Type | Spatial carrier | Service and human review |
| --- | --- | --- | --- | --- |
| 01 | AI medical-visit accompaniment and registration assistant | testing and validation T2 | Nurture Station care stations | refers to nearby hospital appointment slots and accompaniment volunteers; all medical advice is human-reviewed and never crosses into diagnosis |
| 02 | dementia anti-wandering guardian circle | service | Origin Community residential retention area | family-authorized geofence alerts; a community specialist confirms by human review before any response |
| 03 | accessible slow-mobility navigation | testing and validation T3 | Green Spine promenade and the four corridors [data:geometry/roads.geojson#ROAD-001] | crowdsourced road conditions plus low-intrusion sensing; route suggestions labeled "not an approved traffic scheme" |
| 04 | community field testing of rehabilitation robots | testing and validation T1 | route from the Zhongzhiyuan shared testbed to the stations | rehabilitation-assistive robots tested at limited speed in a real community; a safety officer accompanies throughout |
| 05 | community meal assistance and low-speed delivery | service | community canteen to residential units | low-speed delivery robots for meal assistance; speed limits and human takeover in mixed human-robot traffic |
| 06 | after-school childcare coordination | service | station hosting spots, safe school routes along corridors | pickup handoff and temporary hosting; parental authorization and social-worker review |
| 07 | Jing-Zhang culture AI guide | experience | Green Spine and memorial nodes [data:geometry/green_space.geojson#GREEN-001] | multilingual historical-fact guiding; facts reviewed by culture-and-history advisors; AI-generated content clearly labeled |
| 08 | enterprise services copilot | industry | Zhongguancun Technology Services Wing | policy and service-catalog navigation; explicitly does not replace professional legal advice |
| 09 | public-safety and event-operations review | governance | plaza nodes and event routes | assisted assessment of crowd flow and risk; any disposition decision is made by a human |
| 10 | community repair workshops | operations | Develop Studio and the stations | skill matching for fixing appliances, shoes, and code; offline operation |
| 11 | digital-literacy companionship classes | service | staffed service desks at the stations | one-on-one slow-paced teaching, open-source teaching materials; zero data collection |
| 12 | Dazhongsi AI-native consumption experience | consumption | Dazhongsi commercial and business services land | agent shopping guides and content consumption; AI-generated content explicitly disclosed |

### Scenario-Space-Operations Mapping and Privacy Boundaries

Scenarios are not slogans: experience and governance scenarios land on a public-space base of 2960242.715 sqm [metric:public_space_area_sqm]; service scenarios land on 0702 community-service land and the station network; testing-and-validation scenarios (T1-T3) run only within designated test routes and time windows, with mutual recognition proposed with scenario-access mechanisms such as those of the Beijing Economic-Technological Development Area. The public-space share of 0.259379 [metric:public_space_ratio] and the green-space share of 0.252649 [metric:green_ratio] are the physical capacity ceiling for care scenarios; scenario density must not bite back at the walking and rest experience.

Compliance boundaries are aligned item by item: generative-AI service rules are cited only within their applicability boundary of "providing generated content to the domestic public," and security-assessment obligations are understood within their own textual boundaries [standard:GENERATIVE-AI-INTERIM-MEASURES]; accessibility scenarios echo the "five simultaneities" of accessible facilities with the main works, tactile paving and audible crossing signals, and the information-accessibility clauses [standard:BARRIER-FREE-ENVIRONMENT-LAW]; the principle of running traditional services alongside smart innovation is cited as policy reference — its 2020-2022 phase goals have expired and it is not written as a legal obligation still executed in 2026 [standard:ELDERLY-SMART-TECH-PLAN-2020-45]. All scenarios are conceptual proposals; none is written as an approved operation.

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The land-use layout is in the structure table of Section 4; this section focuses on buildings and the demolish-renovate-retain strategy. The buildings layer expresses 423 schematic building footprints within 0701/0702/05/0802/0803/0804 cells, mapped to functional types by land use, with cell coverage capped at 10%-16% [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]. Footprints total 846000.0 sqm, and the scheme's footprint coverage ratio is 0.074127 [metric:design_site_coverage_ratio] — this value is a schematic design value, **not a regulatory building-coverage control**; the two are strictly distinguished.

The demolish-renovate-retain classification gives a method, not conclusions [depth:retain_renovate_demolish]: a four-level classification framework of "retain and reuse / renovate and upgrade / renew and rebuild / pending confirmation" is recommended for deepening. But existing building outlines, heights, uses, construction years, and parcel ownership are all missing (corresponding to GAP-BUILDING-001 and GAP-PARCEL-001), so no keep-or-demolish judgment on any specific building is made in this scheme. Building height, massing, roof form, and interface receive only directional character guidance [depth:height_massing_character].

All regulatory-plan-class indicators remain unknown: floor area ratio [metric:floor_area_ratio], building-height control [metric:building_height_control_m], and building-density control [metric:building_density_control] are marked missing in the public site package, and this scheme gives no numerical conclusion; they will be recalculated once formal regulatory-plan conditions are available [depth:development_intensity_controls].

## Transport, Rail, Municipal Infrastructure, and Public Services

The first question of transport organization is "stitching": the chronic severance caused by the railway is repaired by 4 east-west stitching corridors [metric:suture_corridor_count], each widening into a 120 x 160 meter plaza node where it crosses the Green Spine. The slow-mobility skeleton is "one spine, two side belts": the Green Spine greenway main axis has a recalculated length of 9663.5 m [metric:heritage_spine_greenway_length_m], accompanied by a west walking belt and an east cycling belt [data:geometry/roads.geojson#ROAD-001]; two rail-connection lines (toward Dazhongsi Station and Wudaokou Station) are tentative concepts. For slow-mobility breakpoints crossing the ring road and the railway, only conceptual countermeasures are offered (a directional comparison of overpass versus at-grade improvements) — no engineering alignment or construction-feasibility conclusions, because road redlines and cross-sections are missing (GAP-ROAD-001) [depth:traffic_rail_slow_parking].

![Composite system of mobility, slow traffic, and blue-green public space](assets/figures/mobility-bluegreen.en.png)

Municipal and new infrastructure are re-understood through "care load": edge-compute stations are co-located with community service points so that AI services infer locally and less data leaves the neighborhood; distributed energy and photovoltaic pergolas are arranged together with Green Spine rest points; non-motorized parking and static transport are organized around stations and plaza nodes. All of the above are system-level recommendations: municipal pipelines, fire protection, and flood-control and drainage conditions are missing (GAP-MUNICIPAL-001), so no pipeline-relocation or capacity-calculation conclusions are made [depth:municipal_new_infrastructure]. The indicative alignment of the old Jing-Zhang line and the indicative Xiaoyue River water system in the constraints layer are low-confidence existing-condition expressions, not survey results [data:geometry/constraints.geojson#CONSTRAINTS].

## Blue-Green Network, Public Space, and Urban Character

The blue-green system takes the Jing-Zhang Green Spine as its skeleton: a 120-meter-wide, 9663.5-meter-long park-green main axis runs north-south; with protective green space added, green space totals 2883442.715 sqm at a share of 0.252649 [metric:green_ratio]; with plaza nodes added, public space totals 2960242.715 sqm at a share of 0.259379 [metric:public_space_ratio] [data:geometry/green_space.geojson#GREEN-001]. The spatial language of the care promenade is age-friendly: continuous shade, ramp directions no steeper than 1:12, and a rest point with seating and drinking water every 300-500 meters (a conceptual standard, material for professional teams to deepen). The Qinghe River frontage carries Zhongzhiyuan's low-carbon narrative; the Xiaoyue River, as the east wing's blue-green base, is expressed as an indicative water system (not a survey result).

**AI pilgrimage landmarks (3+1, all conceptual proposals):** first, the **Zhan Tianyou Independent-Construction Memorial Node** — a cluster of rail-spike sculptures on the Green Spine with the herringbone "人"-shaped paving pattern, commemorating the first trunk railway built independently by the Chinese; second, the **Caregivers' Wall of Honor** — this scheme's most distinctive honor system: care workers, family caregivers, and care-technology developers are named side by side on the wall, supplemented annually, defining the "caregiver" as the hero of the AI era; third, the **AI Origin Open-Source Contribution Wall** — real contribution records of open-source projects displayed through programmable lighting (with project authorization); fourth, the reserve option: the Dazhongsi AI-native consumption living room, as the public's first interface for experiencing agents and smart terminals. Landmarks, wayfinding, and the logo system share the "rail spike + stitch" motif; all must be original and rights-cleared, using no unauthorized fonts, images, portraits, or corporate logos; no over-entertainment or internet-celebrity styling is allowed [standard:MOHURD-URBAN-DESIGN-MEASURES].

**Cultural narrative (agent.5 core):** the timeline of the Jing-Zhang spirit is "build the railway, build the trains, mend the city, cultivate the self" — building the railway in 1909 (the confidence of independent construction), building trains in the contemporary era (the industrial confidence of high-speed rail and intelligent equipment), mending the city today (stitching a city torn apart by speed), and finally cultivating the self (care ethics and civic cultivation in the AI era). The cultural-resource system takes the Jing-Zhang railway heritage corridor (tentative protection-control scope, provisional) as the first constraint [data:geometry/constraints.geojson#CONSTRAINTS], overlaid with narrative-node proposals for resources such as the old Tsinghua Yuan Station and the Beijing Film Academy; the wayfinding sign system extends the rail-spike motif into four levels (landmark, node, corridor, station). The international-communication narrative leads with one sentence: "The railway that taught China to build now teaches AI to care." The heritage-protection control scope is missing (GAP-HERITAGE-001), so all cultural and public-space design remains conservative [depth:blue_green_public_space].

## Renewal Projects, Implementation Policy, and Phasing

### Renewal Project List (8 items, conceptual proposals)

| ID | Project | Type | Main dependencies | Evidence |
| --- | --- | --- | --- | --- |
| JZ-01 | Jing-Zhang Green Spine care promenade, phase 1 | blue-green / slow mobility | Heritage Park interface, official boundary | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-02 | four stitching corridors and plaza nodes | transport / public space | road redlines, crossing engineering conditions | [data:geometry/roads.geojson#ROAD-001] |
| JZ-03 | Nurture Station care-station network | public service | 0702 land, operating body | [data:geometry/land_use.geojson#LU-001] |
| JZ-04 | four-quadrant pedestrian connection at Dazhongsi Station | transit-station integration | station conditions, municipal pipelines | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | Mend Lab and the Qinghe innovation frontage | industry / blue-green | river blue line, ecological flood-control conditions | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | Caregivers' Wall of Honor and wayfinding system | culture / branding | rights clearance, heritage verification | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-07 | edge-compute station pilot | new infrastructure | energy and operating authorization | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-08 | community repair workshops and event routes | operations | public-space use permits | [data:geometry/phasing.geojson#PHASE-001] |

### Implementability Matrix (targeted response to a gap named by the review)

| Project | Responsible body (proposed) | Permitting path (proposed) | Budget scale | Baseline | Stage gate | Exit mechanism |
| --- | --- | --- | --- | --- | --- | --- |
| JZ-01 care promenade | district landscaping authority + park operator | green-space renovation project approval | medium (to be estimated) | inventory of existing slow-mobility breakpoints | project initiation after official boundary confirmation | if the gate is not passed, fall back to maintenance-level promenade investment |
| JZ-02 stitching corridors | district transport and planning-and-resources authorities | road engineering project initiation | heavy (to be estimated) | measured east-west crossing times | redline and engineering conditions confirmed | at-grade improvements only; no grade-separated works |
| JZ-03 care stations | sub-district + social operating organizations | community-service facility filing | light (to be estimated) | base counts of the elderly and children (to be verified) | first station passes operating evaluation | if operations fall short, convert to general community rooms |
| JZ-06 Wall of Honor | culture-and-tourism authority + operating platform | public-art filing | light (to be estimated) | nomination and rights-clearance mechanism | heritage verification passed | move to indoor exhibition |
| JZ-07 compute stations | park platform company | new-infrastructure pilot application | medium (to be estimated) | community compute-demand survey | pilot-period energy and safety evaluation | if not renewed at term, equipment is removed |
| test scenarios T1-T3 | scenario operators + regulators | test-zone filing and insurance | light (to be estimated) | scenario-card baseline metrics | phased safety review | one-call stop, rectification within a deadline |

Note: budgets are only qualitative light/medium/heavy magnitudes; investment estimates await formal data; this scheme makes no implementation commitment that cannot be executed. Phasing corresponds to [data:geometry/phasing.geojson#PHASE-001]: Phase 1 is the Dazhongsi core plus the southern segment (light first: stations, Wall of Honor, wayfinding); Phase 2 is the Origin Community plus the middle segment (the care network takes shape); Phase 3 is the Zhongzhiyuan core plus the northern reserved land (hard-core industry and white-space activation) [depth:renewal_project_list] [depth:phasing_implementation].

### Annual Program and Long-Term Operations (agent.6; all conceptual proposals)

Annual events follow the four MEND verbs: the spring **Caregivers' Assembly** (Wall of Honor supplementation ceremony plus care-technology exhibition), the summer **Mending Workshops** (community repair day plus a joint university design week), the autumn **Developers' Open Day** (open-source contribution wall lighting plus scenario-test recruitment), and the winter **Winter Resilience Stress-Test Week** (care-dispatch drills under blizzard and extreme-cold scenarios, echoing the Jing-Zhang ice-and-snow narrative). For long-term operations, an independently operated "Friends of the Green Spine" mechanism is recommended (borrowing from the High Line experience), responsible for scenario-access approval, event scheduling, the annual data-governance report, and convening the residents' council. The developer community forms a conversion path through the contribution wall and scenario-testing credits; international communication is amplified through the care-technology forum and Beijing-Tianjin-Hebei linkage. All events, investment attraction, funding, and policy arrangements are proposals and are not expressed as adopted government arrangements [source:AGENT-TASKBOOK].

## Metrics, Area Recalculation, and Compliance Matrix

Metrics are managed in three tiers [depth:metrics_recalculation]: tier one can be recalculated directly from the submitted geometry (table below); tier two depends on official regulatory plans or taskbook annexes and remains unknown (floor area ratio, building-height control, building-density control; reasons in `metrics.json`); tier three needs continuous calibration with operating data (AI innovation index, talent density, scenario usage frequency, and the like) and serves only as directional recommendation.

| Metric | Value | Formula and source | Confidence |
| --- | ---: | --- | --- |
| site_area_sqm | 11412825.386 | polygon_area(site_boundary), EPSG:4548 | medium (provisional) |
| land_use_total_area_sqm | 11412825.386 | sum(land_use cells); difference from boundary is 0 | medium |
| green_space_area_sqm | 2883442.715 | union area of 1401+1402 | medium |
| green_ratio | 0.252649 | green_space_area_sqm / site_area_sqm | medium |
| public_space_area_sqm | 2960242.715 | union area of 1401+1402+1403 | medium |
| public_space_ratio | 0.259379 | public_space_area_sqm / site_area_sqm | medium |
| building_footprint_area_sqm | 846000.0 | union of 423 schematic footprints | medium (schematic) |
| design_site_coverage_ratio | 0.074127 | footprints / total area (not regulatory density) | medium |
| key_area_count | 3 | count of key areas | high |
| key_areas_total_area_sqm | 3692893.005 | sum of key areas (+0.24% deviation from the announced 3684000) | medium |
| heritage_spine_greenway_length_m | 9663.5 | Green Spine greenway centerline length | medium |
| suture_corridor_count | 4 | count of stitching corridors | medium |

![Core metric recalculation and evidence chain](assets/figures/metrics-evidence.en.png)

Recalculation method: coordinates are stored in EPSG:4326; areas and lengths are computed uniformly in EPSG:4548 (CGCS2000 3-degree Gauss-Kruger zone, central meridian 117E). Land use is generated by cutting a unified grid, and pairwise overlap is zero. The compliance matrix covers the announcement's 17 mandatory tasks and the agent taskbook's 6 tasks (23 in total), each linked to sections, layers, metrics, drawings, HTML blocks, sources, assumptions, and self-check items — see `compliance_matrix.json`. Standard responses and depth-item completion are in `standard_matrix.json` (9 standards, of which 1 is recorded as data_gap because the original text could not be obtained) and `design_depth_matrix.json` (all 15 core items complete). Unknown metrics must not be rendered as numbers by any drawing or HTML; before formal submission, official data triggers a full recalculation [source:SITE-PACKAGE].

## Risk, Copyright, and Compliance

**Four-part data-gap statements (gap, impact, acceptable source, discipline):** (1) The official polygons of the three-level scopes are missing (GAP-BOUNDARY-001/002) — spatial conclusions are conceptual proposals only; a full recalculation follows the release of the official planning boundary; the provisional boundary must never be written as an official_constraint. (2) Regulatory-plan conditions are missing (GAP-CONTROL-001) — intensity indicators remain unknown; no approved floor area ratio, building height, or construction scale may be given. (3) Road redlines and cross-sections are missing (GAP-ROAD-001) — corridors receive conceptual organization only; no engineering-alignment conclusions. (4) Parcel ownership is missing (GAP-PARCEL-001) — renewal projects state only conceptual zoning and conditions to be verified; no demolish-renovate-retain conclusion is assigned. (5) Existing building base data are missing (GAP-BUILDING-001) — the 423 buildings are a schematic layout; no heights or floor counts are fabricated. (6) The heritage-protection scope is missing (GAP-HERITAGE-001) — cultural and landmark design remains conservative and does not breach heritage, green-space, blue-line, or traffic-safety constraints. (7) Municipal conditions are missing (GAP-MUNICIPAL-001) — municipal strategy remains a system-level recommendation. (8) Public-service base data are missing (GAP-SERVICE-001) — no school, medical, or eldercare facility capacity is fabricated [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS].

**Proactive errata:** Issue #1029 (PROV-KEY-003 centroid deviation of about 2.26 kilometers) and Issue #846 (the overall scope and the surveyed Heritage Park do not intersect) were declared in Section 2, and the conclusion precision of the Dazhongsi area was downgraded in Section 5 [source:ISSUE-1029-KEYAREA-CENTROID] [source:ISSUE-846-SITE-PARK-GAP].

**Standards gap:** the original text of the Rules for the Depth of Preparation of Construction Engineering Design Documents (2016 edition) could not be obtained; this scheme lists it only as a pending-source item (data_gap), not as an authoritative basis already satisfied [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

**Copyright and responsibility:** all text, geometry, drawings, and HTML are generated by the declared AI agent or derived from registered rights-cleared sources; the itemized rights inventory of fonts, images, code, and data is in `report/copyright_statement.md`. This scheme represents no approval conclusion or endorsement by any government department and constitutes no investment, land-use, or implementation commitment; it uses no unauthorized enterprise data or personal-privacy data. The AI agent is responsible for facts, sources, copyright, and expression, and accepts rework requests from maintainers and professional reviewers based on self-check results [source:SITE-PACKAGE] [source:SOURCE-REGISTRY].

## References

1. Haidian Branch, Beijing Municipal Commission of Planning and Natural Resources: Pre-Qualification Announcement of the Centennial Jing-Zhang AI Innovation Belt International Urban Design Open Call, 2026-05-09.
2. open-city.ai: Centennial Jing-Zhang AI Innovation Belt — Agent-Oriented Open Call Taskbook (site-package excerpt), 2026-05-18.
3. Ministry of Housing and Urban-Rural Development: Measures for the Administration of Urban Design (MOHURD Order No. 35), 2017.
4. Ministry of Housing and Urban-Rural Development: Measures for the Formulation and Approval of Regulatory Detailed Plans for Cities and Towns (MOHURD Order No. 7), 2011.
5. Ministry of Natural Resources: Guide for Land and Sea Use Classification in Territorial-Space Survey, Planning, and Use Control (Zi Ran Zi Fa [2023] No. 234), 2023.
6. Standing Committee of the National People's Congress: Law of the People's Republic of China on the Construction of a Barrier-Free Environment, 2023.
7. General Office of the State Council: Implementation Plan on Effectively Solving the Difficulties of the Elderly in Using Smart Technologies (Guo Ban Fa [2020] No. 45), 2020.
8. Cyberspace Administration of China et al.: Interim Measures for the Management of Generative Artificial Intelligence Services, 2023.
9. Site package `brief/site-package/`: design brief, enumerations, limits, schemas, and provisional geometry.

The complete machine-readable index is governed by `sources.json` and the three matrix files; this section does not duplicate the file inventory. The registration and licensing boundaries of bibliography entries follow the site package and the source registry [source:SITE-PACKAGE] [source:SOURCE-REGISTRY].
