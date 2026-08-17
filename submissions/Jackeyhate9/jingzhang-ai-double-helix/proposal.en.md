---
title: "Jing-Zhang Intelligence Vein · Double Helix: An AI Innovation Double-Helix on the Centennial Railway"
author_github: "Jackeyhate9"
language: "en"
translation_of: "proposal.md"
proposal_format_version: "2"
bilingual_contract_version: "1"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Using the Jing-Zhang Heritage Park as a central green spine, this proposal weaves the centennial railway heritage strand and the AI innovation strand into a double helix, with three areas and two wings growing in synergy into a world-class AI industry highland and pilgrimage destination."
iteration: "v0.1"
---

# Jing-Zhang Intelligence Vein · Double Helix: An AI Innovation Double-Helix on the Centennial Railway

## Design Basis and Source List

This proposal takes the prequalification announcement for the "Centennial Jing-Zhang AI Innovation Belt Urban Design International Solicitation" issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources as its first authority, and the global agent-facing open-call taskbook as its task-response authority [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]. Machine-readable inputs come from `brief/site-package/` (design brief, enums, land-use classification, ranges, provisional geometry) and from the source-use registry `data/source_registry.json` [source:SOURCE-REGISTRY].

Because the organizer has not yet published a precise redline with a verifiable coordinate system (the qualification-package download remains password-protected), this proposal uses the repository-maintained provisional rough boundaries derived from the announcement text and area constraints, and keeps a "provisional constraint" label across every layer and metric. It must not be treated as an official redline, an approval basis, or a precise-area basis [source:BOUNDARY-SOURCE] [depth:existing_conditions_diagnosis]. This organizer data gap does not block content scoring; after official polygons arrive, boundaries, land use, buildings, roads, green space, public space, phasing and metrics must be recalculated.

Complete sources, standards, design-depth and task coverage live in `sources.json`, `standard_matrix.json`, `design_depth_matrix.json` and `compliance_matrix.json`; the narrative does not repeat machine indexes. Boundary interpretation is traceable to the site layer and area recalculation [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm].

![Evidence chain and package relationship](assets/figures/site-overview.png)

## Three-Level Scope Framework

The proposal follows the three announced scope levels: the coordinated research area (about 43.6 km²) addresses the AI industry ecosystem, strategic positioning and future-city form; the overall design area (about 11.4 km² around the Jing-Zhang Heritage Park) must reach regulatory-plan-level urban design depth; the key detailed-design area (about 368.4 ha) must reach comprehensive-implementation-plan depth [data:geometry/site_boundary.geojson#SITE-001] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

The overall spatial structure is "one spine, three nodes, three areas and two wings, a symbiotic double helix": the Jing-Zhang Heritage Park is the north-south cultural-green spine (one strand), the AI innovation corridor is the other strand, and the two intertwine at the three key areas (base-pair nodes), while the Zhongguancun tech-service wing and the Xiaoyuehe scenario wing extend east and west [data:geometry/land_use.geojson#LU-001] [depth:overall_spatial_structure].

The three levels are not separate drawing sets: coordinated research decides the industry chain and city form, overall design turns them into renewal projects and facility capacity, and key-area design verifies the implementability of specific parcels, buildings, transport and AI scenarios [depth:three_level_scope_framework]. The current structure is a conceptual suggestion for professional teams to deepen.

![Three-level scope and spatial framework](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

The core of the coordinated research area is building a world-class AI innovation ecosystem. The proposal translates the three positionings into spatial language: the Centennial Jing-Zhang Culture Belt is a cultural gene strand, the AI Convergence Innovation Belt is an innovation gene strand, and the Urban AI Life Experience Belt is the cross-link binding them into one "double helix" [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

**Naming system and logo direction (agent.1)**: the belt's primary name is "京张智脉" (Jing-Zhang Intelligence Vein, "ZhiMai"), fusing the Jing-Zhang railway's herringbone switchback with the DNA double-helix. The three areas and two wings are named: ZhiMai Hub · Zhongzhiyuan, ZhiMai Origin · Origin Community, ZhiMai Frontier · Dazhongsi, ZhiMai Service Wing · Zhongguancun, ZhiMai Scenario Wing · Xiaoyuehe. The logo motif is a "double-helix rail": two interweaving rising track curves — one ochre-red for centennial railway heritage, one tech-blue for AI innovation — winding into a DNA double helix whose nodes are the three key areas. The visual system uses ochre-red × tech-blue as the dual-tone base, extendable to wayfinding, event identity and international communication.

**Five to eight global AI ecosystem cases (agent.2)**, extracted for spatial and operational lessons:

| Case | Key lesson | Spatial translation for this belt |
| --- | --- | --- |
| Station F, Paris | A former freight depot becomes a world-class campus | "Depot-to-park" reuse along the heritage park |
| King's Cross, London | Railway heritage coexists with tech (DeepMind etc.) | Stitching heritage and international innovation community |
| Kendall Square, USA | University-anchored dense innovation ecosystem | Near-campus commercialization and the Origin Community |
| Silicon Valley (Stanford–Sand Hill) | Industry-academia and capital fusion | Capital and IP empowerment of the Zhongguancun wing |
| Toronto–Waterloo Corridor | Research-institute-led corridor ecosystem | Three areas and two wings in corridor synergy |
| Pangyo Techno Valley, Seoul | Government-driven digital industry new town | Zhongzhiyuan full-stack autonomous innovation |
| Nanshan, Shenzhen | Smart devices and content ecosystem | Dazhongsi AI-native new business formats |

These are design references, not statutory planning conclusions [source:AGENT-TASKBOOK] [depth:overall_spatial_structure].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The overall design area reaches regulatory-plan depth. The proposal uses the central green spine (Jing-Zhang Heritage Park, park green 1401) as the backbone; the west side is mainly research and tech-service land (0802) carrying the Zhongguancun wing; the east side is mainly life-service and scenario land (0904) carrying the Xiaoyuehe wing; the three key areas host business & finance (0902) and retail & commercial (0901) by position [data:geometry/land_use.geojson#LU-001] [standard:MOHURD-CONTROL-DETAILED-PLANNING].

Building footprints, road centerlines, green space and public space are recomputed from submitted geometry [data:geometry/buildings.geojson#B-001] [data:geometry/roads.geojson#R-001] [metric:building_footprint_area_sqm]. Because official regulatory controls, existing buildings, ownership and engineering conditions are missing, FAR, height, intensity and parcel-level retain/renovate/demolish are recorded as pending official data (`status=unknown`) rather than fabricated control values [depth:development_intensity_controls] [metric:floor_area_ratio].

The renewal framework is "retain-and-renew, progressive regeneration": first stitch slow-mobility gaps and activate the heritage-park interface and metro surroundings, then replace low-efficiency space functions [depth:land_use_layout] [depth:retain_renovate_demolish].

## Detailed Design of Key Areas

The three key areas are the three base-pair nodes of the double helix, each at comprehensive-implementation depth [depth:three_key_area_detailed_design].

**Zhongzhiyuan AI Acceleration Area (ZhiMai Hub)** is a garden-style full-stack autonomous-innovation district carrying the AI full-stack system and AI-governance global voice. Its spatial moves strengthen the Qinghe riverfront, build a low-carbon innovation-interaction ring and an industry display corridor, and host autonomous-model testing and standards-governance display in green space [data:geometry/key_areas.geojson#KEY-001].

**Beijing AI Origin Community (ZhiMai Origin)** is a near-campus commercialization and talent community carrying the world-class innovation ecosystem. Its spatial moves stitch campus, park and blocks with slow mobility, and add release, talent-service, open-source and residential space, plus the "Origin Code Monument" as an honor-display node [data:geometry/key_areas.geojson#KEY-002].

**Dazhongsi AI Industry Cluster (ZhiMai Frontier)** is an urban intelligent-economy and international-exchange district carrying AI-native new business formats. Its spatial moves organize four-quadrant pedestrian connection around Dazhongsi station, renew the public environment of key enterprises, and cultivate agent, smart-terminal, content-consumption and data-element scenarios [data:geometry/key_areas.geojson#KEY-003].

![Three key areas index](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

The agent taskbook requires no fewer than 10 scenario cards, 3 industry test-validation scenarios and 5 user personas (agent.3). Each card states the served users, spatial location, data source, privacy boundary, human review and operator [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

**Five personas**: open-source developers, startup teams, enterprise visitors, surrounding residents, and university faculty/students, mapped respectively to the Origin Community release hall, Zhongzhiyuan shared test field, Dazhongsi international roadshow lounge, the heritage-park slow-mobility ring, and the near-campus commercialization street [data:geometry/public_space.geojson#PS-001].

**Ten scenario cards**: open-source release hall, safety-governance sandbox, edge-computing station, AI slow-mobility wayfinding, Dazhongsi international roadshow lounge, Qinghe low-carbon innovation corridor, near-campus commercialization street, data-element lounge, AI life-service street, and the Global AI Week route, covering AI+ transport, healthcare, education, law, life services and public space [metric:public_space_ratio] [metric:green_ratio].

**Three industry test-validation scenarios** (with clearance and human review): the Zhongzhiyuan autonomous-model red-team test field, the Origin Community open-source collaboration sandbox, and the Dazhongsi smart-terminal accessibility/elderly-friendly live test field. All scenarios carry data-minimization, public-source, explainability and human-review boundaries and collect no unauthorized behavioral traces [data:geometry/roads.geojson#R-001].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The land-use partition follows the territorial land-use classification guide, forming a complete, closed, seamless partition [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]: the central green spine is park green (1401), the west is research and tech service (0802), the east is life service and scenarios (0904), and the key areas host business & finance (0902) and retail (0901), echoing the double-helix structure [data:geometry/land_use.geojson#LU-001].

Buildings are mainly AI R&D, talent apartments and AI-native offices, concentrated in the three key areas [data:geometry/buildings.geojson#B-001]. Building footprint area is recomputed from geometry [metric:building_footprint_area_sqm]. Retain/renovate/demolish is expressed as "method + pending-calibration list": retain the heritage-park cultural resources, renovate low-efficiency industry and ground-floor uses, and build new R&D, apartments and public facilities in the three key areas; parcel-level conclusions await official ownership, regulatory and engineering conditions [depth:retain_renovate_demolish] [depth:height_massing_character].

## Transport, Rail, Municipal Infrastructure, and Public Services

The transport plan addresses metro-station integration, road micro-circulation and slow-mobility gap stitching: a north-south greenway along the heritage park, cross secondary roads linking the three areas, and an eastern arterial with transit connections to achieve east-west stitching and north-south continuity [data:geometry/roads.geojson#R-001] [depth:traffic_rail_slow_parking].

Municipal and new-infrastructure strategies propose distributed energy, edge computing and smart-municipal integration serving the AI industry and talent life [depth:municipal_new_infrastructure]. Road redlines, utilities, fire and municipal conditions are written as pending official data, not as approved conditions [data:geometry/constraints.geojson#CONSTRAINTS].

![Mobility and blue-green network](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

The blue-green network uses the Jing-Zhang Heritage Park as its backbone, coordinates the Qinghe and Xiaoyuehe corridors, and forms a north-south continuous, east-west connected walking and cycling system with a public-space network [data:geometry/green_space.geojson#GS-001] [depth:blue_green_public_space]. Green and public-space ratios are recomputed from geometry; the narrative explains their design meaning: a continuous green spine supports innovation interaction, and three AI public plazas carry experienceable scenarios [metric:green_ratio] [metric:public_space_ratio].

**Three AI pilgrimage landmarks and an honor-display system (agent.4)**: first, "the Spine of the Jing-Zhang Intelligence Vein" — the heritage park itself, combining railway relics with AI public art as the pilgrimage axis; second, the "Origin Code Monument" in the Origin Community, expressing AI origin commemoration through an open-source contributors' honor wall and the first-line-of-code motif; third, the "Dazhongsi Bell-Sound Plaza", pairing the ancient bell with an AI soundscape as an international-exchange and launch landmark. All landmarks, wayfinding, fonts and images must be rights-cleared, and no conceptual landmark is written as approved construction [data:geometry/public_space.geojson#PS-001].

## Renewal Projects, Implementation Policy, and Phasing

Renewal is phased as near-term (Zhongzhiyuan), mid-term (Origin Community) and long-term (Dazhongsi), with public space and slow-mobility networks delivered in each phase [data:geometry/phasing.geojson#P1] [depth:phasing_implementation]. The project list covers slow-mobility gap stitching, the Qinghe innovation interface, the near-campus commercialization street, Dazhongsi station pedestrian connection, edge-computing nodes and the Global AI Week route [depth:renewal_project_list].

**Long-term operation design (agent.6)**: an annual event system — the "Jing-Zhang AI Summit" (global industry agenda), the "ZhiMai Open-Source Hackathon" (developer community) and the "Jing-Zhang Developers Festival" (public experience) — plus developer-community operation, scenario-open operation and a recruitment-and-conversion pathway, forming an "event–community–scenario–conversion" loop. All events, investment, funding and policy arrangements are expressed as conceptual suggestions, not confirmed government arrangements.

## Metrics, Area Recalculation, and Compliance Matrix

Core metrics are recomputed from submitted geometry: overall area, green ratio, public-space ratio, building footprint area, building density and key-area count [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio]. FAR and height, which depend on unpublished official controls, are recorded as pending official data [metric:floor_area_ratio] [depth:metrics_recalculation].

Metrics are managed in three classes — spatial metrics recomputable from geometry, control metrics requiring official regulatory support, and performance metrics requiring ongoing calibration — stored respectively in `metrics.json`, `assumptions.json` and `compliance_matrix.json`. All mandatory announcement tasks 1.3/1.4/1.5 and agent tasks agent.1–agent.6 are mapped to sections, layers, metrics and drawings in the compliance matrix.

![Core metrics recalculation](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

This is a bilingual package: the Chinese primary text and `proposal.en.md` are equivalent translations, with language counterparts for the A3/A0 PDFs, HTML and figures. All text, geometry, drawings and static HTML are generated by the declared agent or use cleared public sources; copyright and licenses are recorded in `report/copyright_statement.md` and `sources.json` [source:SITE-PACKAGE].

This proposal does not claim official approval, approved regulatory control, final land ownership, final construction scale or guaranteed implementation; all spatial suggestions are conceptual suggestions and reference schemes for professional teams to deepen, and do not replace formal planning or constitute government approval [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS].

## References

- Prequalification announcement for the Centennial Jing-Zhang AI Innovation Belt Urban Design International Solicitation (Haidian Branch, Beijing Municipal Commission of Planning and Natural Resources)
- Global agent-facing open-call taskbook excerpt for the Centennial Jing-Zhang AI Innovation Belt
- Urban Design Management Measures (Ministry of Housing and Urban-Rural Development)
- Measures for the Preparation and Approval of Regulatory Detailed Plans (MOHURD)
- Guide for Territorial Land-Sea Use Classification (Ministry of Natural Resources)
- Site-package provisional rough boundaries (provisional_boundaries.geojson)
- Complete machine indexes in `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json` and `design_depth_matrix.json` [source:SITE-PACKAGE]
