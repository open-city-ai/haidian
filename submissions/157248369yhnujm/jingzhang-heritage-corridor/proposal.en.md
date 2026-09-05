---
title: "Centennial Jing-Zhang Heritage Corridor"
title_zh: "百年京张文化走廊"
author_github: "157248369yhnujm"
language: "en"
translation_of: "proposal.md"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A 9-kilometer main spine along the Jing-Zhang Railway Heritage Park, overlaid with three corridors, three key areas and two wings. It binds centennial Jing-Zhang heritage, the metropolitan AI living experience belt and the AI integration innovation belt to a re-usable spatial structure, operational AI scenarios and a sustainable commemoration system."
tracks:
  - "ai-traffic-walkability"
  - "enterprise-services-ecosystem"
  - "civic-agent-governance"
  - "ai-heritage-public-space"
scenarios:
  - "ai-cultural-guide"
  - "ai-traffic-walkability"
  - "enterprise-service-copilot"
  - "public-safety-operations-review"
  - "robot-delivery-low-speed"
iteration: "v0.3"
agent_model: "claude-fable-5 (Cursor IDE)"
---

# Centennial Jing-Zhang Heritage Corridor

> A 9-kilometer main spine along the Jing-Zhang Railway Heritage Park, complemented by three corridors, three key areas and two wings. It binds centennial Jing-Zhang heritage, the metropolitan AI living experience belt and the AI integration innovation belt to a re-usable spatial structure, operational AI scenarios and a sustainable commemoration system.

## Design Evidence and Source Inventory

This formal package is anchored on the **Prequalification Notice for the Centennial Jing-Zhang AI Innovation Belt Urban Design International Solicitation** issued by the Beijing Municipal Bureau of Planning and Natural Resources, Haidian Branch [source:OFFICIAL-ANNOUNCEMENT]. The maintainer-curated agent-facing task book `brief/site-package/agent_taskbook.json` defines the agent tasks [source:AGENT-TASKBOOK]. Reading material, judgments and references come from `brief/site-package/`, `data/source_registry.json`, `data/processed/agent_fact_pack.md`, `brief/site-package/standards/references/` and `docs/terminology-glossary.md`. The provisional boundary is taken from `brief/site-package/geometry/provisional_boundaries.geojson` and is explicitly labelled `provisional_constraint`.

`data/source_registry.json` registers five sources as `usable_for_formal="yes"` (the notice, the agent task book, MOHURD urban design measures, MOHURD control detailed planning regulation, and the MNR land-use classification guide), one source as `provisional_only` (provisional boundaries), and the rest as background or navigation only [source:SOURCE-REGISTRY]. The package never promotes provisional material into official boundary, statutory control or formal scoring evidence; the missing official inputs are listed in `assumptions.json`.

The submission uses `package_type="professional_design_package"`, `package_state="ready_for_review"` and `bilingual_contract_version="1"`. The primary Chinese narrative `proposal.md` and the English counterpart `proposal.en.md` align section by section, claim by claim, metric by metric, evidence by evidence and figure by figure. The v2 reference tokens (`[source:...]`, `[standard:...]`, `[depth:...]`, `[data:...]`, `[metric:...]`) appear at least once in every required section; at most three tokens are chained per sentence, and every sentence remains readable after tokens are removed.

![Evidence chain and submission relationship diagram](assets/figures/site-overview.png)

## Three-Level Scope Framework

The package operates at the three scope levels defined by the notice:

- **CRA — Coordinated Research Area (43.6 km²)**: AI innovation ecosystem, strategic positioning, future city form.
- **ODA — Overall Design Area (11.4 km²)**: urban renewal around the Jing-Zhang Railway Heritage Park, 1–2 km city and industry belt, transport and municipal support, city character and the Jing-Zhang Heritage Park vitality belt.
- **KDA — Key Detailed-design Area (368.4 ha)**: Zhongzhiyuan, Beijing AI Origin Community and Dazhongsi, three required detailed-design areas.

Each level is mapped to proposal sections, GeoJSON layers, metrics, drawings, HTML pages and self-check entries inside `compliance_matrix.json`.

The package is named **Centennial Jing-Zhang Heritage Corridor / 百年京张文化走廊** with the tagline **From the first Chinese-built railway to the first AI-native neighborhood**. The logo concept layers a 1 435 mm railway gauge and neural-network nodes to combine the railway heritage and the AI ecosystem; final vector design is reserved to the maintainer [assumption:A-BRAND-006].

The spatial concept is **Three Corridors, Three Areas, Two Wings** (3-3-2). Three corridors — Jing-Zhang Main Spine Slow-Mobility Innovation Corridor, AI Scenario Lab Corridor and Intelligent Consumption Experience Corridor — stitch the three key areas together. Two wings — Zhongguancun Technology Services Wing and Xiaoyue River Scenario Enablement Wing — extend the innovation and operation reach. Spatial nodes are tracked in `spatial.json` and corroborated by `land_use.geojson` and `roads.geojson` [data:geometry/land_use.geojson#LU-001] [data:geometry/roads.geojson#ROAD-001] [depth:three_level_scope_framework].

![Land-use structure · Three Corridors, Three Areas, Two Wings](assets/figures/land-use-structure.png)

| Level | Question | Answer | Evidence anchor |
| --- | --- | --- | --- |
| CRA | Innovation ecosystem and future city form | Five-stage chain: university origination → open-source collaboration → enterprise translation → public experience → international broadcasting | spatial.json / compliance_matrix.json |
| ODA | Renewal, land use, transport, character | 4 land-use polygons + 5 public-space polygons + 4 green-space polygons + 5 corridors | [data:geometry/land_use.geojson#LU-001] … [data:geometry/roads.geojson#ROAD-005] |
| KDA | Three key detailed designs | Each area has a position, spatial moves, AI scenarios and implementation dependencies | [data:geometry/key_areas.geojson#PROV-KEY-001] … [data:geometry/key_areas.geojson#PROV-KEY-003] |

Because official `SITE_BOUNDARY` and the three `KEY_AREA` polygons are not yet published, the package uses provisional geometry. After the official polygon release, the package must recompute `site_boundary.geojson`, `key_areas.geojson`, `land_use.geojson`, `roads.geojson`, `green_space.geojson`, `public_space.geojson`, `buildings.geojson`, `phasing.geojson` and `metrics.json`. The current compliance state is "provisional intake: readable, queryable, reproducible, replaceable".

## Coordinated Research Area — Innovation Ecosystem and Future City Form

The CRA focuses on building a world-class AI innovation ecosystem. We trace the innovation chain through Beijing-Haidian universities, leading enterprises, incubators, unicorns and open-source communities, and organise it as **university origination → open-source collaboration → enterprise translation → public experience → international broadcasting** [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. Each stage maps to a spatial anchor:

- University origination — Zhongzhiyuan (PROV-KEY-001)
- Open-source collaboration — Beijing AI Origin Community (PROV-KEY-002)
- Enterprise translation — Dazhongsi (PROV-KEY-003)
- Public experience — Jing-Zhang main spine
- International broadcasting — AI pilgrimage landmark candidates (PUBLIC-002 / PUBLIC-003 / PUBLIC-001)

The brand identity uses the maintainer's recommended terminology [source:TERMS]; the visual identity is a 1 435 mm railway gauge overlaid with neural-network nodes. Logos, fonts and partner marks at the participant sketch stage do not constitute final brand decisions [assumption:A-BRAND-006].

Eight comparable cases inform the package: Station F (open-source incubator + public living room), Block 71 / One-North (university-to-capital pipeline), Kendall Square (basic research + application), Kista (ICT cluster + talent), Yokohama MM21 (public living room + international exhibition), Zhongguancun Science City (enterprise + university + public), Haidian AI Origin (Tsinghua, PKU, Beihang, BUPT close-to-school collaboration), and the Greater Bay Area digital economy (data elements + international cooperation). Each case provides one transferable mechanism [depth:overall_spatial_structure].

Future city form is operationalised as two superimposed experience paths: the **AI Living Experience Belt** along the main spine (continuous open space and everyday services between communities, campuses and stations) and the **AI Integration Innovation Belt** along the corridors (compute, data, models, enterprises and developer communities).

## Overall Design Area — Renewal at Regulatory-Detailed-Planning Depth

The ODA package reaches control-detailed-planning depth. Four land-use polygons fully cover the provisional boundary (LU-001 AI R&D 23.43%, LU-002 Park Green 22.69%, LU-003 Industrial/Commercial Service 29.49%, LU-004 Community Service 24.38%); adjacent polygons share their boundary coordinates [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]. Building footprint of 1 738 678.815 m² is recomputed from `buildings.geojson`; green and public-space ratios are recomputed from `green_space.geojson` and `public_space.geojson` (green_ratio = 0.3036, public_space_ratio = 0.054008) [metric:green_ratio] [metric:public_space_ratio].

The renewal project list JZ-01 to JZ-06 maps one-to-one to the three phases in `phasing.geojson`:

- JZ-01 Jing-Zhang Main Spine slow-mobility gap stitching
- JZ-02 Zhongzhiyuan Qinghe Innovation Edge
- JZ-03 AI Origin near-school translation street
- JZ-04 Dazhongsi four-quadrant pedestrian continuity
- JZ-05 AI public-service + edge-compute node
- JZ-06 Global AI Activity Week public route

[data:geometry/phasing.geojson#PHASE-001] [depth:renewal_project_list]

Regulatory-depth conclusions are explicitly classified as **known control / design suggestion / pending confirmation**. `floor_area_ratio` and `building_height_max_m` are marked `status: unknown` with recompute prerequisites. Road redlines, ownership, municipal capacity, fire safety and heritage boundaries all remain in `assumptions.json` [assumption:A-CONTROLS-001] [standard:MOHURD-CONTROL-DETAILED-PLANNING].

## Three Key Areas Detailed Design

The three key areas follow the notice order and the provisional polygons.

- **Zhongzhiyuan AI Independent Innovation Acceleration Area (PROV-KEY-001, approx. 192.1 ha)** — a garden-style independent innovation block. Focus: national AI platform, full-stack autonomy, standards and governance, low-carbon innovation. Spatial moves: Qinghe riverside interface, low-carbon corridor, national AI platform cluster [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design].
- **Beijing AI Origin Community (PROV-KEY-002, approx. 104.3 ha)** — a campus-adjacent translation and talent community. Focus: campus / park / block stitching, open-source hall, talent services, lifestyle. BLDG-001 / BLDG-002 / PUBLIC-002 / PUBLIC-003 anchor the open-source living room and developer community [data:geometry/key_areas.geojson#PROV-KEY-002].
- **Dazhongsi AI Industry Cluster (PROV-KEY-003, approx. 72.0 ha)** — an urban intelligent economy and international exchange block. Focus: leading enterprises, agents, smart terminals, data-element salon, four-quadrant pedestrian continuity around Dazhongsi Station [assumption:A-RAIL-TRANSIT-004]. BLDG-003 international roadshow living room, BLDG-005 smart-terminal experience pavilion, PUBLIC-004 four-quadrant living room and ROAD-005 pedestrian ring form the Dazhongsi core skeleton [data:geometry/key_areas.geojson#PROV-KEY-003].

![Three key areas index](assets/figures/key-areas.png)

| Key Area | Position | Spatial move | AI scenarios and operations |
| --- | --- | --- | --- |
| Zhongzhiyuan (north) | Full-stack independent innovation garden block | Qinghe riverside + low-carbon corridor + national AI platform cluster | National platform showcase, standards sandbox, low-carbon compute |
| AI Origin Community (mid) | Campus-adjacent open-source + talent community | Campus stitch, open-source hall, developer living room | Open-source release hall, AI governance plaza, translation street |
| Dazhongsi (south) | Intelligent economy + international exchange block | Four-quadrant pedestrian ring around Dazhongsi Station, smart-terminal experience pavilion | International roadshow living room, data-element salon, robot delivery |

Each area has a parallel narrative in `proposal.en.md` and an isolated switch card in `visual/index.html`.

## Innovation Ecosystem, Personas and AI+ Scenarios

### Personas (5)

| Persona | Need | Spatial response | Privacy / review |
| --- | --- | --- | --- |
| Open-source developer | Publish, collaborate, test, community reputation | Open-source hall, AI Governance Plaza, night co-working node | Aggregate statistics only; no personal trajectory |
| Early-stage team | Low-cost office, compute entry, product test | Zhongzhiyuan shared test ground, edge-compute kiosk | Compute and data need explicit consent |
| Leading enterprise visitor | Showcase, business, international reception, talent recruitment | Dazhongsi international roadshow living room, station integration | Enterprise marks and cases need cleared rights |
| Local resident | Commute, leisure, community service, low-disturbance renewal | Jing-Zhang main spine slow mobility, community service, night grading | No commercial recommendation on residents |
| Faculty and student | Translation, cross-campus collaboration, daily slow mobility | Campus / park stitch, AI education experience node | Campus data and academic imagery need clearance |

### Scenario Cards (≥10, including 3 AI Industry Test/Validation Scenarios)

| # | Scenario Card | Spatial Anchor | Key Operation |
| --- | --- | --- | --- |
| 01 | Open-source release hall | AI Origin BLDG-002 / PUBLIC-002 | Faculty, open-source community, early-stage release [data:geometry/buildings.geojson#BLDG-002] |
| 02 | AI governance sandbox (TVS) | Zhongzhiyuan + AI Origin | Standards setting, trustworthy evaluation, model red-team; ethics review required [assumption:A-AI-TESTING-005] |
| 03 | AI slow-mobility diagnosis | Main spine ROAD-001 / public_space.geojson | Explainable public data identifies slow-mobility gaps; no personal trajectory [data:geometry/roads.geojson#ROAD-001] |
| 04 | Edge-compute kiosk (TVS) | Service nodes along the belt | Edge inference + low-carbon energy; small-scale pilot before expansion [data:geometry/land_use.geojson#LU-003] |
| 05 | Dazhongsi international roadshow living room | Dazhongsi BLDG-003 / PUBLIC-004 | Agents / smart-terminals / content consumption showcase [data:geometry/buildings.geojson#BLDG-003] |
| 06 | Qinghe low-carbon innovation corridor | Zhongzhiyuan Qinghe edge GREEN-004 | Stormwater, walking, AI showcase [data:geometry/green_space.geojson#GREEN-004] |
| 07 | Near-school translation street | AI Origin | Incubator / showcase / legal / IP / investment |
| 08 | Data-element salon (TVS) | Dazhongsi | Open datasets, compliant licensing, audit; pilot operator only [assumption:A-AI-TESTING-005] |
| 09 | AI lifestyle prototype street | Community / commercial cross-street | AI + healthcare, education, legal, lifestyle at small block scale |
| 10 | Global AI Activity Week route | Belt-wide public-space system | Annual "JZ-AI Week" combining developer festival, scenario open-day, roadshows [depth:phasing_implementation] |

![Mobility slow-mobility + blue-green public-space compound system](assets/figures/mobility-bluegreen.png)

### AI Pilgrimage Landmark Candidates (≥3)

- **AI Governance Plaza (PUBLIC-002)** — mid-AI Origin, showcases standards setting, trustworthy evaluation and safety governance.
- **Open-source Contribution Wall (PUBLIC-003)** — records agent and developer contributions, paired with JZ-AI Week.
- **Agent Contribution Pillars (PUBLIC-001)** — the Tsingyuan end node of the main spine, a "century-origin → AI-endpoint" memorial structure.

## Land Use, Building Scale and Retain / Renovate / Demolish

Land use follows MNR land-use classification (codes 0802 / 1401 / 05 / 0702) [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. Four land-use polygons cover the provisional boundary without gaps or overlaps. Building footprint of 1 738 678.815 m² is recomputed from six sample footprints; it is a concept illustration, not a parcel-level retain / renovate / demolish conclusion [data:geometry/buildings.geojson#BLDG-001] [depth:retain_renovate_demolish].

The Jing-Zhang Railway blue-line and the Tsingyuan Station buffer are explicitly expressed in `constraints.geojson` (CONST-001 / CONST-002); any renovation must follow the cultural-relics authority review [assumption:A-HERITAGE-003] [data:geometry/constraints.geojson#CONST-001]. Retain / renovate / demolish conclusions remain concept suggestions pending official regulatory plan, ownership, heritage and engineering input.

## Transport, Rail, Municipal and Public-Service Facilities

Five corridors (ROAD-001 main spine slow-mobility, ROAD-002 scenario lab, ROAD-003 intelligent consumption, ROAD-004 east-west blue-green stitch, ROAD-005 Dazhongsi four-quadrant ring) cover three areas and two wings [data:geometry/roads.geojson#ROAD-001] [data:geometry/roads.geojson#ROAD-005]. Key nodes include Dazhongsi four-quadrant (CONST-003) and North Fifth Ring under-bridge (CONST-004). Municipal and new-infrastructure strategy is captured by scenario cards 03, 04, 08 as concept suggestions; concrete energy, compute, flood-control and fire-safety indices remain `unknown` pending official input [assumption:A-AI-TESTING-005] [depth:municipal_new_infrastructure].

## Blue-Green Space, Public Space and City Character

Blue-green space is expressed by four `green_space.geojson` polygons (GREEN-001 main spine continuous belt, GREEN-002 Qinghe-Xiaoyue River interface, GREEN-003 Dazhongsi entrance pocket, GREEN-004 Zhongzhiyuan Qinghe low-carbon corridor). Public space is expressed by five `public_space.geojson` polygons (PUBLIC-001 central activity interface, PUBLIC-002 AI Governance Plaza, PUBLIC-003 open-source contribution wall, PUBLIC-004 Dazhongsi four-quadrant living room, PUBLIC-005 Zhongzhiyuan low-carbon innovation living room) [data:geometry/public_space.geojson#PUBLIC-001] [depth:blue_green_public_space].

City character integrates Jing-Zhang railway heritage, Zhongguancun innovation culture and AI new culture. Wayfinding and logo concepts use the gauge-and-network symbol; all fonts, imagery, portraits and partner marks at the participant sketch stage do not constitute final brand decisions [assumption:A-BRAND-006]. Building height and massing remain `building_height_max_m: unknown` and require official regulatory-plan attachment [metric:building_height_max_m].

## Renewal Project List, Implementation Policy and Phasing

JZ-01 to JZ-06 are recorded in the proposal and the renewal-projects module of `visual/index.html`. The three `phasing.geojson` polygons cover the near-term (AI Origin main spine 2026-2027), mid-term (Dazhongsi international roadshow living room 2027-2028) and long-term (Zhongzhiyuan national AI platform cluster 2028-2030) [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation].

The annual event system is designed as **JZ-AI Week**: developer festival, scenario open-day, contest roadshow, urban experience route and public art festival. Developer community operation is anchored on an open-source collaboration committee + annual contribution wall + monthly public evaluation. International dissemination links the Zhongguancun Forum, the Haidian Science Week and overseas partner channels [assumption:A-PROVISIONAL-AREA-007].

| Project | Phase | Lead (suggested) | Main dependency |
| --- | --- | --- | --- |
| JZ-01 Jing-Zhang main spine slow-mobility stitching | Near | Haidian District + sub-district | Road redline, under-bridge space, traffic organisation |
| JZ-02 Zhongzhiyuan Qinghe innovation edge | Long | Haidian + park platform | River blue-line, ecology, flood control |
| JZ-03 AI Origin near-school translation street | Near | Haidian + universities + Zhongguancun | Campus boundaries, ownership, ground-floor mix |
| JZ-04 Dazhongsi four-quadrant pedestrian ring | Mid | Haidian + Beijing Metro | Station integration, municipal pipes |
| JZ-05 AI public-service + edge-compute node | Mid | Haidian + platform company | Energy, compute, secure operation |
| JZ-06 Global AI Activity Week public route | Near | Zhongguancun + Haidian | Public-space permit, event safety, copyright |

## Metrics, Area Recompute and Compliance Matrix

The metrics system is partitioned into three groups. The first group — directly recomputed from geometry — includes `site_area_sqm = 11 412 825.386`, `green_ratio = 0.3036`, `public_space_ratio = 0.054008`, `land_use_total_area_sqm`, and the four `land_use_0xxx_ratio` entries (23.43% / 22.69% / 29.49% / 24.38%). The second group — requiring official regulatory-plan attachments — includes `floor_area_ratio` and `building_height_max_m` (both `status: unknown` with reasons). The third group — operational or industry KPIs — includes `scenario_card_count = 10`, `scenario_test_validation_count = 3`, `user_persona_count = 5`, `ai_pilgrimage_landmark_count = 3` and `key_area_count = 3`.

`compliance_matrix.json` covers 22 requirements (1.3 / 1.4 / 1.5 and agent.1–agent.6). `standard_matrix.json` covers five mandatory standards (PROJECT-OFFICIAL-ANNOUNCEMENT, PROJECT-AGENT-OPEN-CALL-TASKBOOK, MOHURD-URBAN-DESIGN-MEASURES, MOHURD-CONTROL-DETAILED-PLANNING, MNR-LAND-USE-CLASSIFICATION-GUIDE). `design_depth_matrix.json` covers 14 core depth items, all `status: complete` [depth:metrics_recalculation].

![Metrics recomputation and evidence chain](assets/figures/metrics-evidence.png)

## Risk, Copyright and Compliance

**Bilingual contract.** The primary narrative is Chinese; the English counterpart `proposal.en.md` mirrors it section by section, claim by claim, metric by metric, evidence by evidence and figure by figure. HTML, A3/A0 and text-bearing figures use a `.zh` / `.en` naming convention. Terminology follows `docs/terminology-glossary.md`. The package declares `bilingual_contract_version="1"` and `proposal_format_version="2"`; sentences remain readable after v2 tokens are removed.

All spatial recommendations are written as **concept suggestion / reference scheme / open for professional elaboration**, never as formal planning or government approval. Known control (provisional boundary and notice text four-bounds), design suggestion (land use, scenarios, public space) and pending confirmation (official polygon, FAR, height, regulatory plan, heritage, ownership, municipal, fire) are separated into `metrics.json`, `assumptions.json` and `compliance_matrix.json` [depth:risk_missing_data].

The risk matrix `risk.json` covers eight 1-5 items (data gap, privacy, heritage, implementation, policy, technology maturity, equity, branding). Copyright and font registration are recorded in `report/copyright_statement.md`. HTML and PDF are fully offline: no CDN, no remote tiles, no external scripts, no external fonts, no iframes, no forms, no API calls and no tracking.

## References

- Beijing Municipal Bureau of Planning and Natural Resources, Haidian Branch. **Prequalification Notice for the Centennial Jing-Zhang AI Innovation Belt Urban Design International Solicitation** (2026-05-09, public). [source:OFFICIAL-ANNOUNCEMENT]
- Haidian / open-city.ai curated. **Centennial Jing-Zhang AI Innovation Belt Open Call for AI Agents — Agent Task Book Excerpts** (2026-05-18, cleared). [source:AGENT-TASKBOOK]
- Ministry of Housing and Urban-Rural Development, PRC. **Urban Design Management Measures**. [standard:MOHURD-URBAN-DESIGN-MEASURES]
- Ministry of Housing and Urban-Rural Development, PRC. **Regulation on Compilation and Approval of Urban and Town Control Detailed Planning**. [standard:MOHURD-CONTROL-DETAILED-PLANNING]
- Ministry of Natural Resources, PRC. **Territorial Space Survey, Planning and Use-Control Land-Sea Classification Guide**. [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
- Maintainer-curated `brief/site-package/geometry/provisional_boundaries.geojson` (provisional intake boundary).
- Machine indices: `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`, `risk.json`, `spatial.json`.