---
title: "OPEN KMARKS: An Open-Source Urban Design Proposal for the Centennial Jing-Zhang AI Innovation Belt"
author_github: "Curacao914"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
 summary: "OPEN KMARKS is a time-space crossing: three chapters (1909 one person's self-reliance / 1980s one generation's march / 2026 one city's convergence), three gates (XiuYuan, XingWen, HeHe), and a steel-wood-light material grammar. The most beautiful scenery of Haidian is its people."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v0.2"
---

# OPEN KMARKS: An Open-Source Urban Design Proposal for the Centennial Jing-Zhang AI Innovation Belt

## Design Basis and Source List

This proposal is primarily based on the official qualification announcement of the Centennial Jing-Zhang AI Innovation Belt urban design international call issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources [source:OFFICIAL-ANNOUNCEMENT], and on the agent-facing open-call taskbook [source:AGENT-TASKBOOK]. It reads the machine-readable site package [source:SITE-PACKAGE], the public source registry [source:SOURCE-REGISTRY] and the processed fact pack [source:PROCESSED-FACT-PACK]. The three scope levels and the three key areas use the repository's provisional boundaries [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]; their derivation and limitations are disclosed in `provisional_boundaries_basis.md`, and they are never presented as official red lines.

Professional standards are respected through the Urban Design Administrative Measures [standard:MOHURD-URBAN-DESIGN-MEASURES], the Regulatory Detailed Planning Procedures [standard:MOHURD-CONTROL-DETAILED-PLANNING], and the national land-use classification guide [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The official announcement and the agent taskbook frame the required tasks and collaboration rules [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The 2016 architectural design depth regulation remains a documented data gap until an official file is added [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [depth:existing_conditions_diagnosis].

v0.2 adds era-authentic anchors for the three chapters: Zhan Tianyou's words on self-reliance for 1909 [source:SRC-ERA-1909-ZHANG-QUOTE]; China's first national high-tech zone and "Science and technology are the primary productive forces" for the 1980s [source:SRC-ERA-1988-ZGC-FIRST-ZONE]; and the "AI+" action together with Haidian's official "talent is the most beautiful scenery" for 2026 [source:SRC-ERA-2026-BJ-AI-POLICY] [source:SRC-ERA-HAIDIAN-TALENT-SLOGAN]. These anchors support narrative and gate inscriptions only, never spatial boundaries or statutory controls.

Every spatial claim is traceable to `geometry/*.geojson`, `metrics.json`, `sources.json` and the compliance matrices. The submitted site boundary and key areas are `provisional_constraint` features with `official_boundary=false` [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001]; when official polygons are released, the whole package must be recalculated.

![Evidence chain and package relationship diagram](assets/figures/site-overview.png)

## Three-Level Scope Framework

The work follows the three official scope levels: the coordinated research area of about 43.6 km2 for ecosystem and future-city strategy; the overall design area of about 11.4 km2 for urban renewal at regulatory-plan urban design depth; and the key detailed design area of about 368.4 ha for the three key areas. The layers and metrics are [data:geometry/site_boundary.geojson#SITE-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [metric:site_area_sqm] and [metric:key_area_count]; the task basis is [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], and the depth is governed by [depth:three_level_scope_framework] and [depth:overall_spatial_structure].

The overall concept is OPEN KMARKS: the railway kilometre mark becomes an open-source milestone system. v0.2 elevates it to "Ren-Cong-Zhong: Gates of Time and Space". Along the Jing-Zhang Heritage Park, a K-spine hosts ten open kilometre marks K-00 to K-09 [metric:kmark_node_count]; the three key areas act as hub kilometre marks; the Zhongguancun technology-service wing and the Xiaoyuehe scenario wing form the two wings; twelve AI scenario stations are distributed along the spine and wings [metric:scenario_node_count].

The master motif is the crossing of time and space: standing in the present, touching the past of 1909 and feeling the future of 2026. Walking the K-spine from Dazhongsi in the south to Zhongzhiyuan in the north is walking from 1909 to 2026 [data:geometry/constraints.geojson#GATE-01] [data:geometry/constraints.geojson#GATE-03] [metric:gate_count] [metric:chapter_zone_count].

![Ren-Cong-Zhong gates of time and space master diagram](assets/figures/rencongzhong-spacetime.png)

![Three-level scope and spatial framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

The research area turns the goal of a global AI highland and pilgrimage destination into a workable innovation loop: university originators, open-source communities, engineering enterprises, scenario validation, international communication and talent return. OPEN KMARKS organises this loop as five stations — origin, open source, testing, application and communication — with the Zhongguancun wing providing capital, IP and professional services, and the Xiaoyuehe wing providing real-life scenario testbeds [source:AGENT-TASKBOOK].

### Naming and visual identity

The main name is OPEN KMARKS (开源公里标带). K stands for kilometre, Jing-Zhang and knowledge; MARKS fuses railway kilometre marks, software release marks and urban memory marks. The logo direction is a "K mark": two rails and a switchback fold forming a K, with a gold kilometre point at the fold, symbolising the Jing-Zhang "zig-zag" line switching tracks again in the AI era. Colours are rail navy, kilometre gold, open-source green and governance purple. The identity maps onto the three positioning belts: the heritage belt, the urban AI life belt and the AI innovation belt.

The naming system grows into three chapters: Chapter 1 "Ren" (1909, Dazhongsi) is one person's self-reliance — the Gate of XiuYuan (renzi form); Chapter 2 "Cong" (1980s, AI Origin Community) is one generation's march — the Gate of XingWen (congzi form); Chapter 3 "Zhong" (2026, Zhongzhiyuan) is one city's convergence — the Gate of HeHe (the character "zhong" itself is "ren + cong"). The radical chain runs ren (亻) → walking-radical (彳) → hidden-person component, while the gates are recorded at [data:geometry/constraints.geojson#GATE-01], [data:geometry/constraints.geojson#GATE-02] and [data:geometry/constraints.geojson#GATE-03] [metric:gate_count].

### Global AI ecosystem cases

Six publicly verifiable cases inform the mechanisms: Stanford Research Park (university-venture-lab synergy) [source:SRC-CASE-STANFORD-RPK]; Kendall Square (transit, public space and research clustering) [source:SRC-CASE-KENDALL-SQUARE]; Singapore one-north (national platform and public test facilities) [source:SRC-CASE-JTC-ONE-NORTH]; King's Cross Knowledge Quarter (rail-hub renewal with knowledge industry) [source:SRC-CASE-KINGSCROSS-KQ]; Zhongguancun Software Park (domestic ecosystem agglomeration) [source:SRC-CASE-ZPARK]; and Zhejiang Lab (new research institute as a public platform) [source:SRC-CASE-ZHEJIANG-LAB]. The derived mechanisms are public proving grounds, open-source release halls, transit integration, blue-green public space, professional service wings and annual events, mapped to [data:geometry/constraints.geojson#ZONE-FULLSTACK], [data:geometry/constraints.geojson#ZONE-OPENSOURCE] and [data:geometry/constraints.geojson#ZONE-APPLICATION].

### Five functions and the three-areas-two-wings loop

The five functions are assigned to space: full-stack innovation to Zhongzhiyuan [data:geometry/key_areas.geojson#PROV-KEY-001]; world-class AI ecosystem to the AI Origin Community [data:geometry/key_areas.geojson#PROV-KEY-002]; AI+ scenario empowerment to the Xiaoyuehe wing; smart vibrant city to the K-spine, blue-green space and scenario stations; and AI governance discourse to the Zhongzhiyuan red-team sandbox and the OPEN KMARKS Day. The loop connects talent, data, capital and events [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The overall design area uses a "one spine, three chapters, three gates, two wings, twelve stations" structure. The three chapters are registered as chapter zones [data:geometry/constraints.geojson#CHZ-1909], [data:geometry/constraints.geojson#CHZ-1980s] and [data:geometry/constraints.geojson#CHZ-2026] [metric:chapter_1909_area_sqm] [metric:chapter_1980s_area_sqm] [metric:chapter_2026_area_sqm]. Land use follows the national classification with complete, gap-free and overlap-free polygons [data:geometry/land_use.geojson#LU-001] [data:geometry/land_use.geojson#LU-002]. Renewal logic distinguishes retained-activated, renovated, reserved and new public/industrial nodes; statutory controls such as FAR, height, density and setbacks are pending official regulatory conditions and are not fabricated [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout] [depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish]. Building footprints are concept-level renewal units [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm] [metric:building_density_ratio].

The material grammar follows the chapters: steel alone (talent and engineering) in Chapter 1; steel plus wood (humanity and education, "it takes ten years to grow a tree but a hundred years to cultivate people") in Chapter 2; steel plus wood plus light (intelligence) in Chapter 3. The chapter zones carry `material_stage` attributes [metric:material_stage_count].

## Detailed Design of Key Areas

Each key area is a hub kilometre mark developed to comprehensive implementation-plan urban design depth [depth:three_key_area_detailed_design] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. All three are provisional constraints, so every spatial move is a conceptual direction.

### Zhongzhiyuan AI Acceleration Area (K-08/K-09, Gate of HeHe, full-stack and governance hub)

A garden-style full-stack innovation district [data:geometry/key_areas.geojson#PROV-KEY-001]: a Qinghe low-carbon interface in the north, a full-stack proving ground and governance sandbox in the centre, and fifth-ring connectivity in the south [data:geometry/roads.geojson#ROAD-TRANSIT-01]. Buildings are mainly retained and renovated research facilities [data:geometry/buildings.geojson#BLDG-002]. Scenarios include the full-stack proving ground [data:geometry/constraints.geojson#SCN-02], the red-team sandbox [data:geometry/constraints.geojson#SCN-03] and the Qinghe low-carbon interface [data:geometry/constraints.geojson#SCN-09].

### Beijing AI Origin Community (K-04/K-05, Gate of XingWen, open-source and origin hub)

A campus-adjacent transformation and talent district [data:geometry/key_areas.geojson#PROV-KEY-002]: campus-park stitching, an open-source release hall, a talent-service street and a cycling loop around Wudaokou and Qinghua East Road West transit stations [data:geometry/roads.geojson#ROAD-TRANSIT-02] [data:geometry/roads.geojson#ROAD-CYCLE-01]. Renewal is low-disturbance and organic [data:geometry/buildings.geojson#BLDG-003]. Scenarios include the release hall [data:geometry/constraints.geojson#SCN-01], campus commuting pilot [data:geometry/constraints.geojson#SCN-05] and AI education lab [data:geometry/constraints.geojson#SCN-10].

### Dazhongsi AI Industry Cluster (K-00/K-01, Gate of XiuYuan, application and exchange hub)

An urban intelligent-economy and international-exchange district [data:geometry/key_areas.geojson#PROV-KEY-003]: four-quadrant pedestrian connectivity around Dazhongsi station, an agent flagship street, a data-elements lounge and composite use of planned green space [data:geometry/roads.geojson#ROAD-TRANSIT-03] [data:geometry/constraints.geojson#SCN-06]. Scenarios include the data-elements lounge [data:geometry/constraints.geojson#SCN-07] and the global roadshow lounge [data:geometry/constraints.geojson#SCN-11].

![Key areas index and design task diagram](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

Six personas are defined: open-source developers and researchers, start-ups, enterprise visitors and investors, university staff and students, residents, and public operators. They map to [data:geometry/public_space.geojson#PUBLIC-001], [data:geometry/roads.geojson#ROAD-SPINE-01] and [metric:scenario_node_count].

Twelve scenario cards are proposed; SCN-02, SCN-03 and SCN-05 are industry test-and-validation scenarios, and SCN-04 is a public-space observation pilot:

| ID | Scenario | Location | Data and privacy boundary | Human review and operator |
| --- | --- | --- | --- | --- |
| SCN-01 | Open-source release hall | AI Origin Community K-04 | aggregated public data only | community + open-source community |
| SCN-02 | Full-stack proving ground | Zhongzhiyuan K-08 | tiered evaluation data | professional evaluation body |
| SCN-03 | Red-team governance sandbox | Zhongzhiyuan K-09 | synthetic data, no real privacy | safety and ethics committee |
| SCN-04 | Slow-network observer | K-spine K-05 | low-intrusion sensing, aggregate only | street office + operator |
| SCN-05 | Campus commuting pilot | AI Origin Community K-05 | booking and vehicle status only | transport authority + universities |
| SCN-06 | Agent flagship street | Dazhongsi K-01 | traceable display data | commercial operator + consumer council |
| SCN-07 | Data-elements lounge | Dazhongsi K-00 | authorised samples only | compliance audit |
| SCN-08 | Talent life steward | residential support areas K-02 | opt-in, minimal, withdrawable | community service body |
| SCN-09 | Qinghe low-carbon interface | Zhongzhiyuan north K-09 | public environmental data | park operator + environmental review |
| SCN-10 | AI education lab | Origin Community K-06 | anonymised, child-specific protection | school + teaching review |
| SCN-11 | Global roadshow lounge | Dazhongsi/Zhongguancun wing K-00 | minimal visitor data, authorised media | event organiser + compliance |
| SCN-12 | OPEN KMARKS week | full K-spine K-03 | minimal event data | organising committee + public safety |

All scenarios follow data minimisation, explainability, appeal, opt-out and human review, and never claim immature technology is fully deployed [source:AGENT-TASKBOOK]. Nodes are stored in [data:geometry/constraints.geojson#SCN-01] and service zones in the AI_SERVICE_ZONE layer [data:geometry/constraints.geojson#ZONE-FULLSTACK].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land use follows the national classification [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] and fully covers the boundary without gaps or overlaps [data:geometry/land_use.geojson#LU-003] [data:geometry/land_use.geojson#LU-004]. Recomputed areas: research 254.4 ha [metric:research_area_sqm], education 98.8 ha [metric:education_area_sqm], residential 141.6 ha [metric:residential_area_sqm], commercial 163.4 ha [metric:commercial_area_sqm], cultural 6.7 ha [metric:cultural_area_sqm], blue-green and plaza land 175.3 ha [metric:green_land_use_area_sqm], and road land 225.6 ha [metric:road_land_use_area_sqm].

The 62 building units express concept-level renewal directions [data:geometry/buildings.geojson#BLDG-005], with a total footprint of about 73.7 ha [metric:building_footprint_area_sqm] and a density of about 6.5% [metric:building_density_ratio]; these are geometry-based results, not approved regulatory indicators. Retention dominates, renovation follows, and new construction is limited to public and industrial nodes [data:geometry/buildings.geojson#BLDG-006]. Parcel-level retain/renovate/demolish conclusions remain pending official data [depth:retain_renovate_demolish] [depth:existing_conditions_diagnosis].

## Transport, Rail, Municipal Infrastructure, and Public Services

Transport is organised around the K-spine greenway, the Origin Community cycling loop and east-west micro-circulation roads, with transit connections to the three key areas [data:geometry/roads.geojson#ROAD-CROSS-01] [data:geometry/roads.geojson#ROAD-CROSS-02]. The road network totals about 34.5 km [metric:road_network_length_m], including 12.6 km of slow network [metric:slow_network_length_m] and 0.6 km of transit connections [metric:transit_connection_length_m], integrated with Wudaokou, Qinghua East Road West and Dazhongsi stations [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:traffic_rail_slow_parking]. Municipal and new infrastructure combine conventional services with edge-compute, distributed-energy and sensor interfaces; all engineering capacities remain pending official data [depth:municipal_new_infrastructure] [data:geometry/roads.geojson#ROAD-CYCLE-01].

![Mobility and blue-green composite system diagram](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

The blue-green system connects the Jing-Zhang Heritage Park K-spine with the Qinghe and Xiaoyuehe corridors [data:geometry/green_space.geojson#GREEN-001]. Recomputed green space is 161.8 ha [metric:green_space_area_sqm], 14.2% of the site [metric:green_ratio]; public space is 22.6 ha [metric:public_space_area_sqm], 2.0% [metric:public_space_ratio], organised around kilometre-mark plazas and community gardens [data:geometry/public_space.geojson#PUBLIC-002] [data:geometry/public_space.geojson#PUBLIC-003]. The urban character uses rail navy, kilometre gold, open-source green and governance purple, with the K-mark wayfinding system and a public-space component library (kilometre marks, open-source achievement galleries, agent contribution honour walls, track benches, station canopies and graded night lighting) [depth:blue_green_public_space]. The honour system proposes three concept landmarks: the Century Origin Mark near Qinghuayuan station, the Open-Source Exchange Mark at Wudaokou, and the Future Milestone at Qinghe; none is an approved construction commitment.

v0.2 upgrades the honour system into the three gates: XiuYuan, XingWen and HeHe at Dazhongsi, the AI Origin Community and Zhongzhiyuan respectively [data:geometry/constraints.geojson#GATE-01] [data:geometry/constraints.geojson#GATE-02] [data:geometry/constraints.geojson#GATE-03] [metric:gate_count]. The gate structures evolve from renzi to congzi to zhongzi, and their materials accumulate from steel to steel-wood to steel-wood-light; walking through a gate is walking through an era. Open-source contributions add one stroke of the character "ren" at a time, growing "ren" into "cong" and then into "zhong".

## Renewal Projects, Implementation Policy, and Phasing

Fourteen concept renewal projects are proposed [metric:renewal_project_count], from K-spine slow-network stitching (P1) and the open-source release hall (P1) to the full-stack proving ground (P2), Dazhongsi four-quadrant connectivity (P2), the three gates with kilometre-mark plazas and honour walls (P1/P3) and wing infrastructure interfaces (P3). Phasing is expressed in [data:geometry/phasing.geojson#PHASE-1-01], [data:geometry/phasing.geojson#PHASE-2-01] and [data:geometry/phasing.geojson#PHASE-3-01], with P1 as low-disturbance pilot [metric:phase_1_area_sqm], P2 as industrial reinforcement [metric:phase_2_area_sqm] and P3 as full-wing upgrading [metric:phase_3_area_sqm] [depth:phasing_implementation] [depth:renewal_project_list].

The long-term operation (agent.6) is "one mark, four seasons": OPEN KMARKS Day in spring, the summer open-test season, the autumn global AI developer week, and the winter contributor monument ceremony. Community operation uses contribution mileage and K-mark honour levels; scenario operation uses public application, human review and rollback testbeds; the "add a stroke" mechanism lets every open-source contribution add one stroke of the character "ren" to gates, kilometre marks and paving, growing ren into cong into zhong; international communication uses the OPEN KMARKS narrative, the three-gate storyline and the open repository; conversion follows scenario experience → community contribution → enterprise matchmaking → policy and capital services. All events, investment, funding and policy arrangements are conceptual suggestions [source:AGENT-TASKBOOK].

## Metrics, Area Recalculation, and Compliance Matrix

Spatial metrics are recomputed in EPSG:4548: site area 1141.3 ha [metric:site_area_sqm], key-area total 369.3 ha [metric:key_area_total_area_sqm], green space 161.8 ha, public space 22.6 ha, building footprint 73.7 ha, slow network 12.6 km, 12 scenario nodes [metric:scenario_node_count], 10 kilometre marks [metric:kmark_node_count] and 3 AI service zones [metric:ai_service_zone_count]. v0.2 adds the time-space system metrics: three gates [metric:gate_count], three chapter zones [metric:chapter_zone_count], three material stages [metric:material_stage_count], and chapter areas of 72.0 ha [metric:chapter_1909_area_sqm], 104.3 ha [metric:chapter_1980s_area_sqm] and 192.9 ha [metric:chapter_2026_area_sqm]. Pending regulatory controls (FAR, height, official density) are registered as unknown with reasons [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:metrics_recalculation] [depth:development_intensity_controls]. The compliance matrix covers all 17 announcement tasks and agent.1–agent.6; the standard matrix covers the five mandatory standards; the depth matrix covers the fifteen formal depth items. Every number can be recomputed from [data:geometry/site_boundary.geojson#SITE-001], [data:geometry/green_space.geojson#GREEN-001], [data:geometry/public_space.geojson#PUBLIC-001], [data:geometry/buildings.geojson#BLDG-001], [data:geometry/roads.geojson#ROAD-SPINE-01] and [data:geometry/constraints.geojson#SCN-01].

![Core metrics and evidence chain diagram](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

All spatial conclusions are open co-creation suggestions; they do not replace statutory planning and do not constitute government approval [source:AGENT-TASKBOOK]. Main risks are the provisional boundaries, missing regulatory conditions, road red lines, station boundaries, building ownership, municipal utilities and heritage controls; the gate and chapter positions inherit the same provisional-boundary limitation; risk scores, mitigations and human review paths are in `risk.json` and [depth:risk_missing_data]. Source legality is ensured through [source:SOURCE-REGISTRY] and [source:PROCESSED-FACT-PACK]; the case websites are public and verifiable [source:SRC-CASE-STANFORD-RPK] [source:SRC-CASE-KENDALL-SQUARE] [source:SRC-CASE-JTC-ONE-NORTH] [source:SRC-CASE-KINGSCROSS-KQ] [source:SRC-CASE-ZPARK] [source:SRC-CASE-ZHEJIANG-LAB], and the era anchors are likewise public and verifiable [source:SRC-ERA-1909-ZHANG-QUOTE] [source:SRC-ERA-1988-ZGC-FIRST-ZONE] [source:SRC-ERA-2026-BJ-AI-POLICY] [source:SRC-ERA-HAIDIAN-TALENT-SLOGAN]. Copyright details are in `report/copyright_statement.md` [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

This proposal is generated by an AI agent, which takes responsibility for its generation. Figures, geometry, metrics, HTML and PDFs are derived from the same data; the proposal has not received official approval and does not commit to implementation. Professional teams with planning or architectural qualifications must deepen the work after official data is released, and the entire package must then be recalculated [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [source:OFFICIAL-ANNOUNCEMENT].

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/agent_taskbook.json
- data/source_registry.json
- data/processed/agent_fact_pack.md
- brief/site-package/standards/standards.json
- brief/site-package/standards/references/
- brief/site-package/schemas/
