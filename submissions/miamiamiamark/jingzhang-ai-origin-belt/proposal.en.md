---
title: "Jing-Zhang Centennial · AI Origin: From a Centennial Engineering Project to an Innovative Belt for a Global AI Holy Land in Urban Design"
author_github: "Miamiamiamark"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With the overall concept of \"Century Jing-Zhang · AI Origin,\" integrate the century-old self-reliant engineering spirit of the Jing-Zhang Railway with the innovation culture of Zhongguancun and the AI open-source co-creation culture into a perceivable and operable urban narrative axis; around the Zhongzhiyuan AI Independent Innovation Acceleration Area, Beijing AI Origin Community, and Dazhongsi AI Industry Cluster three key areas, propose a conceptual Urban Design scheme that includes the coordination of the Three Zones and Two Wings, the vitality belt of the Jing-Zhang Heritage Park, and the placement of AI scenario cards."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "robot-delivery-low-speed"]
iteration: "v1.0"
---

# Jing-Zhang Centennial · AI Origin: From a Centennial Engineering Project to an Innovative Belt for a Global AI Holy Land in Urban Design

## Design Basis and Source List

This proposal is a formal conceptual urban design scheme for the "Centennial Jing-Zhang AI Innovation Belt Open Call for Urban Design." All spatial judgments are based on publicly available information and data provided in the package for this call. The main references are as follows:

- Official Pre-Qualification Announcement (Three Levels of Scope, Three Key Areas, Design Tasks, and Depth of Deliverables): [source:OFFICIAL-ANNOUNCEMENT], corresponding to the local snapshot [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].
- Draft Public Brief and Material Boundary Description: [source:brief-public-brief] (`brief/public-brief.md`, `brief/README.md`, describing the boundaries for the use of public materials).
- Excerpt from an Open Call Task Book Oriented towards Intelligent Entities (Three Orientations, Five Functions, Three Zones and Two Wings, Six Tasks): [source:AGENT-TASKBOOK], corresponding to [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].
- Structured site package (design task, allowable design space, enumeration, metric ranges, data sources): [source:SITE-PACKAGE] (`brief/site-package/` containing all JSON and GeoJSON files).
- Authority Level Registry for Public Documentation: [source:SOURCE-REGISTRY] (`data/source_registry.json`, distinguishing between formal-ready / background-only / provisional-only);
- Processed agent fact package with scope summary: [source:PROCESSED-FACT-PACK] (`data/processed/`).
- Boundaries and Key Areas: The three layers of ranges and three key areas used in this plan are all derived from [source:BOUNDARY-SOURCE] and [source:KEY-AREA-SOURCE] (`brief/site-package/geometry/provisional_boundaries.geojson`). Official polygons have not yet been released with the public data.

**Boundary Condition Statement (Important)**: As of the generation of this proposal, the organizers have not released the official precise polygon for SITE_BOUNDARY and KEY_AREA in the public channels along with the call data. This scheme uses all geometric layers from `provisional_boundaries.geojson` that are explicitly marked as `provisional_rough` rough geometries (`geometry_role="provisional_constraint"`, `official_boundary=false`). The geometry has been recalculated and aligns with the announced area (Overall Design Area 11,412,825㎡≈11.4k㎡, for the three key areas combined 3,692,893㎡≈368.4ha), but **must not be considered as the Official Planning Boundary**. After the formal polygon is published, all area-sensitive metrics in `geometry/*.geojson` and `metrics.json` must be recalculated (see [depth:metrics_recalculation]). This data gap does not block content scoring, but all boundaries, areas, and "street/line frontage" determinations in this proposal are provisional within the context of design discussion, see [depth:risk_missing_data].

Correspondence: Compliance for this proposal is documented item-by-item in `compliance_matrix.json` (all 13/14/15 optional tasks from announcement 1.3/1.4/1.5), `standard_matrix.json` (5 mandatory professional standards), and `design_depth_matrix.json` (15 formal depth items). Evidence reference format is unified as `[source:...]`, `[standard:...]`, `[depth:...]`, `[data:geometry/xxx.geojson#id]`, and `[metric:xxx]`.

![Evidence Chain and Relationship Diagram with Submission Package](assets/figures/site-overview.png)

## Three-tier scope work framework [depth:three_level_scope_framework])

According to Section 1.4 of [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] and the `design_brief.json` in [source:SITE-PACKAGE], this scheme is organized in three levels, progressively narrowing and deepening:

**(1)Coordinated Research Area(approximately 43.6k㎡, `geometry/site_boundary.geojson` beyond the research boundary)**. North to the Fifth Ring Road North, east to the Jingzang Expressway, south to West Straight Street, and west to Wancuihe Road. This layer undertakes strategic analysis for the "Three Zone Two Wing" industrial coordination, a world-class AI Innovation Ecosystem, and the future form of an AI city. It produces naming systems, logo directions, ecological case studies, and scenario matrices. The results are for the research and strategy layer, not directly translating into land boundary designation ([depth:overall_spatial_structure]).  (Three Zones and Two Wings)

**(2) Overall Design Area (approximately 11.4k㎡, `geometry/site_boundary.geojson#SITE-001`).** For the planning area surrounding the Jing-Zhang Heritage Park within a 1-2 kilometer radius of the urban region, this plan completes the Land-Use Layout, Urban Renewal framework, traffic and municipal infrastructure, blue-green Public Spaces, and urban renewal/control depth design for appearance and indicators (depth:[depth:land_use_layout], [depth:traffic_rail_slow_parking], [depth:blue_green_public_space]). The design boundary is taken from [data:geometry/site_boundary.geojson#SITE-001], with a projected area of [metric:site_area_sqm] approximately 1,141.3 million square meters, consistent with the announced value of 11.4k㎡ (±0.2%).

**(3)Key-Area Detailed Design Area (approximately 368.4 ha, `geometry/key_areas.geojson`)**. Three key areas run from north to south: Zhongzhiyuan AI Independent Innovation Acceleration Area (approximately 192.1 ha, [data:geometry/key_areas.geojson#KEY-zhongzhiyuan_ai_acceleration_area]), Beijing AI Origin Community (approximately 104.3 ha, [data:geometry/key_areas.geojson#KEY-beijing_ai_origin_community]), and Dazhongsi AI Industry Cluster (approximately 72.0 ha, [data:geometry/key_areas.geojson#KEY-dazhongsi_ai_industry_cluster]). The projected recalculation totals approximately 369.3 million square meters for the key areas [metric:key_area_total_sqm], with a count of key areas [metric:key_area_count] = 3. This layer reaches the depth of the Integrated Planning Implementation Plan for Urban Design ([depth:three_key_area_detailed_design]), as detailed in the "Key Areas Detailed Design" chapter.

The overall structure is implemented through "one main axis, three cores, and two wings" connecting the three levels: strategic industry (research level) → spatial structure (design level) → detailed plan (implementation level). Since all geometry is provisional, the areas, boundaries, and spatial relationships at the three levels are marked for design discussion only. Once the formal polygon is released, it must be recalculated according to [depth:metrics_recalculation].

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Overall Concept and Naming System (agent.1)

This proposal presents an overall concept of **「Jing-Zhang AI Origin」** (English: **Jing-Zhang AI Origin Belt**), with a core narrative: **connecting the engineering spirit embodied by Zhan Tianyou's autonomous design and construction of the Jing-Zhang Railway a century ago with today's AI autonomous innovation and open-source collaboration in Haidian**. This will transform the site corridor extending south from the Tsinghua Garden Railway Station into the "origin" and "pilgrimage site" for global AI talent to understand China's autonomous innovation.

Naming System (All suggested for this proposal, to be refined by the professional team, not official names):

- Main Name: Hundred-Year Jing-Zhang · AI Origin; English: Jing-Zhang AI Origin Belt.
- Three key sub-brands: Zhongzhiyuan "Yuanqi" (Origin Spark, a full-stack independent innovation launch site), Dazhongsi "AI Origin" Community "Yuandian·HOME" (Origin Home, a community near the school for innovation and open-source activities), and Dazhongsi "Intelligent Native Lane" (Native Lane, a place for intelligent native consumption and business).
- Two wings: Zhongguancun Technology Services Wing "Factor Port" and Xiaoyue River Scenario Enablement Wing "Scenario Bay".
- Activity series brand: "Jing-Zhang AI Origin Week," "Origin Hackathon," and "Century·Future" Cultural Season.

**Logo Direction** (this design direction is text-based, not the final graphic): The logo takes the "zigzag" of the Jing-Zhang Railway "human-shaped railway" (winding slope) as its theme, overlaying the "human" character with an AI node network — the "human" character both commemorates Zhan Tianyou's human-shaped railway project and expresses the "people-oriented" stance of AI governance; the node network represents the open collaboration of the AI Innovation Ecosystem. The main color scheme is suggested to be "Jing-Zhang Blue" (railway industrial blue) + "Haidian Tech Blue" + "Open Source Green," with the font using a sans-serif geometric style (to be used after clearance, Qingquan). Visual norms and graphic styles should be consistent (see [depth:overall_spatial_structure]). All fonts, images, trademarks, and character images must be cleared for use (refer to [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] and the "Risk, Copyright, and Compliance" section).

### Three Key Orientations, Five Major Functions, and the Synergistic Loop of the Three Zones and Two Wings (agent.1)

Three Key Orientations (from [source:AGENT-TASKBOOK] and [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]): **Centennial Jing-Zhang Cultural Belt, Urban AI Life Experience Belt, and AI Integration Innovation Belt**. This plan implements these orientations as spatial strategies: Cultural Belt = Jing-Zhang Heritage Park Vitality Axis (longitudinal main axis); Life Experience Belt = three key areas and their connecting AI-Enabled Scenario Streets; Innovation Belt = industrial function layout within the land use and renewal structure ([data:geometry/land_use.geojson]).

Five Functional Areas ([source:AGENT-TASKBOOK]): AI Full-Stack Independent Innovation System, World-Class AI Innovation Ecosystem, AI+ AI-Enabled Scenario New Paradigm, Intelligent AI Vibrant City, AI Governance Global Discourse Power. These five functional areas are anchored as follows: Zhongzhiyuan (Full-Stack Independent Innovation + Governance Discourse Power), AI Origin Community (Innovation Ecosystem), Dazhongsi (Innate Intelligent New Business Model), Zhongguancun Technology Services Wing (Factor Globalization Configuration, Zhongguancun IP and Capital Empowerment), Xiaoyue River Scenario Enablement Wing (AI Scenario Enablement and Vibrant City). (Full-Stack Independent AI Innovation System)

Three Zones and Two Wings Synergistic Loop (the conceptual operational loop proposed in this plan): **university original innovation (Peking University/ Tsinghua University/ Chinese Academy of Sciences, etc.) → AI Origin community incubation and transformation → Zhongzhiyuan acceleration and pilot testing → Dazhongsi intelligent origination industrialization and consumer validation → Zhongguancun Technology Services Wing providing capital, data, compliance, and international elements → Xiaoyue River Scenario Enablement Wing providing AI+ urban scenario testing and demonstration**, Form a "source—incubation—acceleration—industrialization—service—scenario" loop. This loop is the industrial logic ([depth:overall_spatial_structure]) of the spatial structure in this plan (a main axis, three cores, and two wings working in coordination), and it corresponds to agent.1 and announcement 1.5(1) in the `compliance_matrix.json`.

### Global AI Innovation Ecosystem Case Examples (agent.2, 5-8 cases)

This plan selects 8 globally verifiable AI/innovation ecosystem case studies as reference examples (case information based on public reports and research, serving as background material [source:CASE-STUDIES-BACKGROUND], with specific data to be verified against the original sources and not constituting an investment or policy commitment):

| # | Case | Core Experience | Transformable Spaces/Operational Mechanisms |
|---|------|---------|----------------------|
| 1 | Silicon Valley/Stanford Research Park | University-Capital-Industry Triad for Research, Learning, and Industry Cycle | Model of "Campus Conversion" in the Original Community ([data:geometry/buildings.geojson#BLD-004]) |
| 2 | Boston Kendall Square,  | Around MIT's TOD Innovation District, High-Intensity Mixed-Use | Track Station Integration + Mixed Use of Work, Residences, and Commerce (Dazhongsi Station Quadrants) | (Transit-Station Integration)
| 3 | One-North Singapore | National Flagship Innovation District, Integrated Compound, and "Garden City" | Garden-Inspired Innovation District (Zhongzhiyuan Green Corridor and King George Interface) |
| 4 | Shenzhen Nanshan High-Tech Park/Houhai | Cluster Development + Urban Renewal + Headquarters Economy | Existing Stock Update to Release Industrial Space (Manufacturing Transition Belt Update) |
| 5 | Hangzhou Future Technology City/Dream Town | Policy-Space-Activity Linked Entrepreneurial Ecosystem | Scenario Access Day and Entrepreneurship Incubation Space (Origin Community) |
| 6 | Shanghai Zhangjiang Science City | Large Scientific Facilities Driving Industry Aggregation | Pilot/Testing/Standard Facilities (Zhongzhiyuan Governance and Standards Center) |
| 7 | Korean Banchang Tech Valley | Government-led innovation clusters with living amenities | Facilities for Talent Services and Public Space Supply |
| 8 | Zhongguancun Software Park (Local Benchmark) | Operational and Supporting Experience of Mature Software Parks | Direct Benchmark with Operational Mechanism |

The conclusions drawn from the experiences of the above cases are presented as Conceptual Recommendations to be further developed by the professional team ([depth:overall_spatial_structure]).

### Adapted Future City Form for AI (agent.2/agent.3)

This proposal defines "AI-Driven Future Urban Form" as a **"Self-Adaptive, Evolvable Urban Operating System"**. Spatially, it emphasizes **scene orchestration** (where a single block can accommodate multiple functional sequences such as R&D, testing, display, consumption, and activities), **facility growth** (end-side computing power, distributed energy, and smart node additions as needed), and **data re-calculability** (all spatial decisions traceable to public sources and layers). Based on this, three types of spatial tools are proposed: 1. **AI Scenario Node Layer** (`SCENARIO_NODE` concept, incorporating `compliance_matrix.json` and scenario cards); 2. **Slow Travel and Green Continuity System** (responding to the announcement "Perceptible, Interactive AI+ Transportation Systems and Continuous Green Spaces"); 3. **Update Phasing Framework** (near-term lightweight launch, mid-term updates, long-term governance, see "Update Project List" chapter). In terms of AI+transportation, this proposal suggests a green transportation strategy centered on the "Jing-Zhang Innovation Avenue" as the backbone, combined with Transit-Station Integration, slow travel discontinuity stitching, and pilot unmanned shuttle services (see [data:geometry/roads.geojson#RD-001]).

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Industrial objectives, functional layout, and innovation indicator system (agent.2/agent.3)

In combination with Haidian's "1+X+1" modernized industrial system ([source:PROCESSED-FACT-PACK]), this plan proposes an "**three belts and two wings with one main axis**" functional layout within the Overall Design Area: the Jing-Zhang Heritage Park Vitality Belt (cultural/public/slow travel axis), the West Side Higher Education and Research Belt (relying on universities and research institutions), and the East Side Industry Innovation Belt (enterprises/prototyping/manufacturing). The suggested proportion of industrial functions (conceptual, based on the zoning structure of this plan [metric:land_use_total_area_sqm], formal proportions require verification with control plan and industrial data): approximately [metric:research_industry_ratio]×100% of the base area for research and industrial land use (0804+1001), with commercial and business (0901+0902), residential (0701), green spaces (1401), and other uses allocated according to the zoning structure (see the "Land Use, Building Scale, and Demolish–Renovate–Retain Strategy" chapter).

Conceptual Recommendation for an Innovative Indicator System (Classified into Three Categories): Spatial indicators will be directly recalculated from the geometry of this plan (metrics such as [metric:site_area_sqm], [metric:green_ratio], [metric:public_space_ratio], etc.). Controlled indicators (Floor Area Ratio, Building Height, Building Coverage Ratio, setback, road red line) are unknown, pending official control plan conditions ([metric:floor_area_ratio], [metric:building_density], both status=unknown), See `planning_limits.json` (and [depth:development_intensity_controls]); performance metrics (AI innovation index, talent density, output scale) are for operational vision and require ongoing calibration with industry data, not fixed values.

### Urban Renewal Overall Framework and Total Building Scale

This plan updates the logic based on "**preserving culture, updating space, and integrating functions**" ([depth:retain_renovate_demolish]): preserving cultural elements of the Jing-Zhang Railway site, historical resources, and mature university and enterprise parks such as Tsinghua Garden Railway Station; updating inefficient industrial spaces, dilapidated neighborhoods, and areas around rail stations; and constructing new developments primarily in three key areas (conceptual, with pending official data on ownership and current buildings). The total building scale of this plan does not provide a definitive value—due to the absence of control plan Floor Area Ratio and current building data. Instead, it provides a conceptual range and recalculation formula for the "incremental scale of industrial spaces in key areas," listed in `assumptions.json` (A-CONTROLS-001) as a pending confirmation item ([depth:development_intensity_controls]).

### Transport, Rail, Municipal Infrastructure, and Public Services

Traffic Strategy: 1. The "Jing-Zhang Innovation Avenue" will serve as the primary north-south connection within the zone (refer to [data:geometry/roads.geojson#RD-001], conceptual alignment); 2. Horizontal roads will connect to the Wudaokou, Qinghua East Road West Mouth, and Dazhongsi Station (refer to [data:geometry/roads.geojson#RD-004], conceptual alignment); 3. The intersection of the North Fifth Ring Road and the Jing-Zhang Heritage Park will be a key focus for integrating external traffic and pedestrian and bicycle connections (refer to [data:geometry/constraints.geojson#CON-001]); 4. Dazhongsi Station will feature quadrants for pedestrian connectivity and organized static traffic (refer to announcement 1.5(3)-3); 5. The small Yuehe River Riverfront Pedestrian Path (refer to [data:geometry/roads.geojson#RD-006]). Municipal and New Infrastructure: This proposal presents a concept framework for integrating the "edge-side computational power + distributed energy + intelligent service nodes" with traditional municipal facilities such as water supply, drainage, and electricity (*[depth:municipal_new_infrastructure]*) . Pipeline, energy, flood control, and fire protection engineering conditions are listed as formal advanced prerequisite conditions.

## Detailed Design of Key Areas

The detailed design for the three key areas is based on the provisional polygons in [data:geometry/key_areas.geojson], with the conclusions serving as directional designs for professional teams to further develop; each key area is organized according to "location + spatial structure + building renewal + traffic and pedestrian access + Public Space + AI scenarios + implementation risks" ([depth:three_key_area_detailed_design]).

### Zhongzhiyuan AI Independent Innovation Acceleration Area (approximately 192.1 ha)

- Location: Garden-type AI Autonomous Innovation District, a full-stack autonomous innovation system and a carrier of global AI governance discourse power ([source:AGENT-TASKBOOK]).
- Spatial Structure: "One Core, Two Belts, Four Clusters" —— Governance and Standardization Center (area [data:geometry/land_use.geojson#LU-009]), Qinghe Ecological Belt, Intelligent Manufacturing Test Belt, and Four Clusters for Computing Power/Models/Data/Evaluation (concepts such as [data:geometry/buildings.geojson#BLD-001] cluster).
- Building Update: New/Updated to Low-Multi-Level Garden-style Campus, with Roof Photovoltaic and Ecological Roofs (Conceptual Recommendation), Demolish–Renovate–Retain Strategy based on Current and Control Planning Data.
- Traffic Slow Zone: Combine with the Fifth Ring Road to propose optimization directions for external traffic, and connect internal slow zones with the Qinghe interface.
- Public Space: Developers Square ([data:geometry/public_space.geojson#PS-001]), Qinghe Ecological Corridor ([data:geometry/green_space.geojson#GS-003]).
- AI Scenario: Evaluation, standards, and safety governance scenarios for the national artificial intelligence platform; Intelligent Agent Contribution Honor Wall (see "Blue-Green Space" Pilgrimage Landmark).
- Implementation Risks: Requires confirmation of national platform resources, integrated five-ring traffic, and flood prevention conditions; to be implemented in the long term ([data:geometry/phasing.geojson#PH-P5]).

### Beijing AI Origin Community (approximately 104.3 ha)

- Location: School-adjacent AI Innovation District, original innovation cradle—incubation—transformation closed loop, global leading AI Innovation Ecosystem ([source:AGENT-TASKBOOK]).
- Space structure: "One Street and Two Parks" —— Near-school Technology Transfer Street (towards Tsinghua East Road), Open Source Home/Creator Park ([data:geometry/land_use.geojson#LU-012] area), Talent Apartment Park ([data:geometry/land_use.geojson#LU-013] area).
- Building Update: Organic and low-impact updates as the main approach, with the first floor activated for innovative service and display uses ([depth:retain_renovate_demolish]). The demolish–renovate–retain strategy is pending with respect to ownership data. (Demolish–Renovate–Retain Strategy)
- Traffic Slow Zone: Around Wudaokou and Qinghua East Road West Mouth Transit-Station Integration, optimize the pedestrian and bicycle connectivity between the campus and the park area ([data:geometry/roads.geojson#RD-004]).
- Public Space: AI Origin Open Square ([data:geometry/public_space.geojson#PS-002]), Xiao Yuehe Blue-Green Ecological Belt ([data:geometry/green_space.geojson#GS-002]).
- AI Scenario: Open-source Co-creation, Outcome Presentation and Display, Startup Incubation, Talent Services (Scene Cards SC-02/SC-05, etc.).
- Implementation Risks: Coordination among multiple stakeholders is required for the campus boundary, ownership, and low-impact update mode; initial implementation will commence with Phase P3 ([data:geometry/phasing.geojson#PH-P3]).

### Dazhongsi AI Industry Cluster (approximately 72.0 ha)

- Location: Urban AI Innovation District, featuring AI-Native and AI+ fusion new business models such as intelligent bodies, smart terminals, and content consumption ([source:AGENT-TASKBOOK]).
- Space structure: "One Core and Two Quadrants" — Dazhongsi Station TOD core (four quadrants pedestrian connectivity, [data:geometry/roads.geojson#RD-007]), smart business quadrant ([data:geometry/land_use.geojson#LU-016] area), smart consumption quadrant ([data:geometry/land_use.geojson#LU-017] area).
- Building Update: Potential site function replacement in conjunction with the renovation and update of nearby universities, planning for the composite use of green spaces (as in the concept of [data:geometry/buildings.geojson#BLD-006]).
- Traffic Slow Zones: Integration of Dazhongsi Station with key development areas, quadrants of pedestrian zones at intersections, and organization of bicycle parking.
- Public Space: Smart Experience Plaza ([data:geometry/public_space.geojson#PS-003]).
- AI Scenario: Intelligent Native Consumption, Data Element Living Room, Starting Point of the Global AI Activities Week Route (Scene Card SC-04/SC-08).
- Implementation Risks: Confirmation of the sequence of track construction, ownership, and the commercial operation entity; initiation scheduled for the near term ([data:geometry/phasing.geojson#PH-P1]).

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### Five user archetypes (agent.3, ≥5 categories)

| Image | Demand Characteristics | Corresponding Space/Scenario |
|------|---------|--------------|
| P1 AI Engineer/Developer | Open-source Collaboration, Testing Compute Power, Community Events, Convenient Commuting | Open-source Home, Developer Square, Manufacturing Test Field |
| P2 Entrepreneurs/Start-up Teams | Low-Cost Entry, Incubation and Acceleration, Financing and Investment Services, and Policy Support | Origin Point Community Incubator, Zhongguancun Technology Services Wing |
| P3 University Research Personnel | Technology Transfer, University-Enterprise Collaboration, Experimental Conditions | Campus-Adjacent Technology Transfer Street, Higher Education Research Cluster |
| P4 Youth Talent/Community Residents | Living, Education, Healthcare, Consumption, Nighttime Vitality | Talented Youth Apartment Garden, AI-Led Living Service Sample Street |
| P5 Visitors/Global Developers | Cultural Experience, Guiding, Activity Participation, Brand Perception | Jing-Zhang Heritage Park Vitality Belt, Pilgrimage Landmark, Activity Week Route |

### AI-Enabled Scenario Card (agent.3, ≥10 cards)

This proposal introduces 12 scenario cards (SC-01~SC-12), among which SC-03, SC-10, and SC-12 are AI industry testing and validation scenarios (≥3). The spatial location, service target, data boundaries, human review, and operational entity for each scenario card are recorded in the `compliance_matrix.json` segment and `visual/index.html`: Testing and Validation Scenario and Human Review.

| ID | Scenario | Type | Spatial Placement | Data/Privacy Boundaries | Human Review | Operating Entity Recommendation |
|----|------|------|---------|--------------|---------|-------------|
| SC-01 | AI+Software (Code/Open Source Collaboration) | Industry Development | Origin Community Open Source Home | Public Code, Desensitized | Community Maintainer | Open Source Community + Park Operations |
| SC-02 | AI+Healthcare (Assisted Diagnosis) | Urban functions | Healthcare District | Minimize, Empower | Review by a Registered Professional Engineer | Healthcare Institutions+AI Companies |
| SC-03 | AI+Education (Adaptive Learning) | Testing Validation | Higher Education Research Cluster | Learning Data Authorization | Teacher Review | Higher Education + Education Industry |
| SC-04 | AI+Law (Compliance Assistant) | Urban Function | Dazhongsi Business District | Case Desensitization | Practicing Lawyer Review | Legal Service Institution |
| SC-05 | AI+Life Services (Convenience Assistant) | Urban functions | AI Life Service Model Street | Minimize, Empower | Fallback to Live Support | Government+Service Provider |
| SC-06 | AI+Transportation (Signal Control Optimization) | Urban functions | Jing-Zhang Innovation Avenue | Traffic flow open data | Traffic department review | Transport+Technology Companies |
| SC-07 | AI Guided Tour (Cultural/Site) | Urban functions | Jing-Zhang Site Park | Public cultural resources | Content Editing and Review | Cultural Operations Manager |
| SC-08 | AI Consumption (Intelligent Native Retail) | Urban Function | Dazhongsi Intelligent Consumption Complex | Consumption Data Authorization | Consumer Protection Mechanism | Commercial Operator |
| SC-09 | Robot Delivery | Urban Function | Dazhongsi/Origin Point Community Block | Path Desensitization | Security Officer + Platform Review | Delivery Platform + Property Management |
| SC-10 | Unmanned Shuttle Pilot | Testing and Validation | Route from Fifth Ring to Manufacturing Test Site | Vehicular Road Coordination Data | Safety Officer on Board | Auto Manufacturer + Park + Traffic Management |
| SC-11 | Urban Agent (Governance Sandbox) | Urban Function | Zhongzhiyuan Governance and Standards Center | Public Government Data | Manual Approval as a Last Resort | Government + Governance Institutions |
| SC-12 | Scenario Access Testing Field (Multimodal) | Testing Validation | Zhongzhiyuan Manufacturing and Testing Field | Test Data Isolation | Evaluation Agency Review | Industrial Platform |

All AI scenarios adhere to the principles of data minimization, public sources, transparency, and Human Review; agents only assist in identifying pedestrian bottlenecks, Public Space heat maps, facility maintenance needs, and business service demands, without replacing planning approvals, outputting unauthorized personal profiles, or claiming official implementation commitments ([depth:risk_missing_data]).

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land use classification is based on the [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] (source: [source:MNR-LAND-USE-CLASSIFICATION]) of the national spatial land use and sea use classification codes, expressed in the [data:geometry/land_use.geojson]. This plan forms a complete, closed, and seamless set of 30 conceptual zones (`geometry/land_use.geojson`), covering the entire area of [metric:site_area_sqm], with no gaps or overlaps. The main land use codes (as simplified mappings in this repository): 1401 Park Green Spaces (Jing-Zhang Heritage Park Vital Zone, [data:geometry/land_use.geojson#LU-001] etc.), 0802 Research and Development Land, 16 Reserved Industrial/Blank Land, 05 Commercial and Service Land, 0701 Urban Residential Land, 0804 Educational Land, 1207 Road Land. Classification area is shown in [metric:land_use_total_area_sqm] (see the breakdown by code group in the Land Use Structure Diagram), with the industrial and research proportion at [metric:research_industry_ratio] and the green space ratio at [metric:green_ratio].

The architectural proposals are distinguished into five categories: retain/renovate/update/new construction/to be confirmed.[depth:retain_renovate_demolish]): This scheme `geometry/buildings.geojson` The 7 concept architectural clusters are all "proposed_concept".[data:geometry/buildings.geojson#BLD-001] Equal to the combined Building Footprint area [metric:building_footprint_area_sqm], this is used to express the organization of industrial space in the focus area, **and does not constitute the current building footprint or the Demolish–Renovate–Retain Strategy conclusion**. Building Height, massing, facade, and appearance control([depth:height_massing_character])propose the directionality of "Zhongzhiyuan low multi-layer garden style, Dazhongsi TOD high density commercial, and Dazhongsi near school low disturbance community." Floor Area Ratio [metric:floor_area_ratio] and Building Coverage Ratio [metric:building_density] are pending official master plan conditions.

## Transport, Rail, Municipal Infrastructure, and Public Services

Traffic, rail, and pedestrian depth is managed by [depth:traffic_rail_slow_parking] (layers of evidence [data:geometry/roads.geojson#RD-001]~[data:geometry/roads.geojson#RD-008], [data:geometry/public_space.geojson#PS-001], etc.): the Jing-Zhang Innovation Avenue running longitudinally, the road network running transversely, Transit-Station Integration, pedestrian connectivity gaps filled, and pilot zones for autonomous shuttle services (SC-10). The municipal and New Infrastructure depth is managed by [depth:municipal_new_infrastructure]: a conceptual framework for the integration of end-side computing power, distributed energy, intelligent service nodes, and the three traditional facilities (pipelines, energy, drainage, flood control, fire protection are formal deepened prerequisites).

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

Blue-Green Spaces are structured around the Jing-Zhang Relic Park Vitality Belt ([data:geometry/green_space.geojson#GS-001]), which incorporates [metric:green_space_area_sqm], connecting the Qinghe Ecological Corridor ([data:geometry/green_space.geojson#GS-003]) with the Little Yuehe Blue-Green Ecological Belt ([data:geometry/green_space.geojson#GS-002]), forming a north-south permeable and east-west connected pedestrian and cycling network. Public Space nodes ([data:geometry/public_space.geojson#PS-001]~[data:geometry/public_space.geojson#PS-004]) host innovative interactions, technology testing, application demonstrations, and activities ([depth:blue_green_public_space], green space ratio [metric:green_ratio], public space proportion [metric:public_space_ratio], public space area [metric:public_space_area_sqm]).

**AI Pilgrimage Landmarks and Honor Display Nodes (agent.4, ≥3)** —— This proposal presents three perceivable and operational conceptual landmarks (all are proposal suggestions, require clear title and approval, and are not claimed to be approved for construction):

1. **Jing-Zhang Developer's Walkway** (along the Jing-Zhang Site Park Vitality Belt, [data:geometry/green_space.geojson#GS-001]): A cultural pedestrian path that narrates the history of the zigzag railway, connecting the century-old railway culture, the innovation culture of Zhongguancun, and the new AI culture, with cultural tours (SC-07).
2. **Open Source Achievement Gallery** (AI Origin Community Open Source Square, [data:geometry/public_space.geojson#PS-002]): showcase open source projects, collaborative achievements, and developer contributions, in conjunction with the Open Source Home ([data:geometry/buildings.geojson#BLD-004]).
3. **Agent Milestone Honor Wall** (Zhongzhiyuan Governance and Standards Center, [data:geometry/public_space.geojson#PS-001] North Side): Incorporate the names of selected scheme agents and their GitHub identities into a sustainable memorial system, in response to the "Monument/Permanent Memorial" mechanism solicitation ([source:OFFICIAL-ANNOUNCEMENT]).
4. **Global Developers Honor Wall** (Dazhongsi Smart Experience Plaza, [data:geometry/public_space.geojson#PS-003]): a brand showcase node for the international developer community.

Urban Character ([depth:height_massing_character]) integrates the historical Jing-Zhang Railway, the innovation of Zhongguancun, and the new culture of AI, proposing an urban tone and roof form of "Jing-Zhang Qing + Technology Blue + Open Source Green"; showcasing cultural resources such as the Tsinghua Yuan Railway Station and linking them with artistic resources like the North Film Institute (as per [standard:MOHURD-URBAN-DESIGN-MEASURES] [source:MOHURD-URBAN-DESIGN-MEASURES]). All brands, fonts, images, portraits, and corporate logos must be cleared for use.

## Renewal Projects, Implementation Policy, and Phasing

Update project list (conceptual, see [data:geometry/phasing.geojson] and [depth:renewal_project_list]):

| Project Number | Project Name | Type | Location | Implementing Entity (Concept) | Stage | Main Dependencies | Evidence Reference |
| --- | --- | --- | --- | --- | --- | --- | --- |
| JZ-01 | Jing-Zhang Site Park Pedestrian Connectivity Gap | Public Space/Transport | Park's North-South Passage Segment | Haidian District Forestry and Gardening/Transport Department | Recent | Reconciliation of Road Rights-of-Way, Underbridge Space, and Traffic Organization | [data:geometry/roads.geojson#RD-001] |
| JZ-02 | Zhongzhiyuan Qinghe Innovation Interface | Blue/Green/Industrial Showcase | Zhongzhiyuan North Segment | Park Operations+Water Department | Long-term | river blue line, ecological flood protection conditions | [data:geometry/green_space.geojson#GS-003] |
| JZ-03 | Origin Community Near-School Conversion Street | Urban Renewal | West side of the Origin Community | platform for joint development between universities and parks | Recent | campus boundaries, ownership, first-floor uses | [data:geometry/buildings.geojson#BLD-004] |
| JZ-04 | Dazhongsi Station Quadrant Pedestrian Connectivity | Transit-Oriented Development | Dazhongsi Core | Transit+Traffic+Local | Near-Term | Track Station, Road Intersection, Pipelines | [data:geometry/public_space.geojson#PS-003] |
| JZ-05 | Intelligent Body Scenario Access Test Site | New Infrastructure | Zhongzhiyuan Test Site | Industry Platform + Governance Institution | Long-term | Energy, Computing Power, Security, Operating Entity | [data:geometry/constraints.geojson#CON-001] |
| JZ-06 | Global AI Activity Week Public Route | Operations/Brand | One Belt Public Space System | Cultural Operator+Community | Ongoing | Activity Permits, Safety, Copyright Clearance | [data:geometry/phasing.geojson#PH-P3] |

Phasing and Main Description: The implementation entity is a conceptual suggestion, and the formal implementation entity must be confirmed by the relevant authority. Phasing corresponds to [data:geometry/phasing.geojson#PH-P1]~[data:geometry/phasing.geojson#PH-P5], with project phase indicators (area, length, node count) recorded in `metrics.json` and `compliance_matrix.json`.

Implement phased implementation ([depth:phasing_implementation], [data:geometry/phasing.geojson#PH-P1]~[data:geometry/phasing.geojson#PH-P5]): **Recent Period (P1/P3)**, the focus will be on the launch of the Dazhongsi Intelligent Native Business District and the AI Origin Community. Implement lightweight facilities, operational activities, and service platforms initially; **mid-term (P2/P4)** complete the midsection enhancement of the Jing-Zhang cultural belt and the update of the manufacturing-to-intelligence transition area; **long-term (P5)** achieve full-scale expansion of the Zhongzhiyuan ecosystem. Phased implementation will start with operational activities and lightweight facilities, followed by the confirmation of control plans, municipal services, transportation, and property rights conditions before entering the physical construction phase.

**Global AI Innovation Activity System and Long-term Operations (agent.6, Conceptual Recommendation)**: 1. Annual activity system — 'Jing-Zhang AI Origin Week' (Global AI Innovation Week, including roadshows, launches, and open days), 'Origin Marathon' (annual hackathon), 'Century·Future' Cultural Season (bi-annual cultural narrative events); 2. Developer community operations — continuous operation of the Open Source Home, quarterly open-source co-creation workshops; 3. Scenario Access operations — SC-10/SC-12 test sites open in batches, with anonymized operational data made public; 4. Public experience routes — pilgrimage landmarks + activity week routes forming a walkable, shareable experience loop (see [data:geometry/phasing.geojson#PH-P3]); 5. International promotion and attraction transformation — activity branding, developer honor walls, and monument systems support international promotion, while the capital and policy services of the Zhongguancun Technology Services Wing complete the attraction transformation. All activities, recruitment, funding, policies, and operational arrangements are conceptual recommendations or deepening directions, and must not be expressed as determined government arrangements (see boundary clauses in [source:AGENT-TASKBOOK]).

## Metrics, Area Recalculation, and Compliance Matrix

Metrics Framework ([depth:metrics_recalculation]): All spatial metrics are recalculated from `geometry/*.geojson` using EPSG:4548 projection (refer to `metrics.json`): Overall Design Area area [metric:site_area_sqm], total area of key zones [metric:key_area_total_sqm] and count [metric:key_area_count], green space area [metric:green_space_area_sqm] and green space ratio [metric:green_ratio], Public Space area [metric:public_space_area_sqm] and ratio [metric:public_space_ratio], conceptual Building Footprint [metric:building_footprint_area_sqm], total area of land use zones [metric:land_use_total_area_sqm]. Industry research proportion [metric:research_industry_ratio] and phased total area [metric:phasing_total_area_sqm]. Control metrics (floor area ratio [metric:floor_area_ratio], building density [metric:building_density]) are unknown, reasons registered in `assumptions.json` and [depth:development_intensity_controls]. Performance metrics (AI innovation index, talent density, etc.) are described in the operational vision in the main text and the matrix, not specified as approved values.

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

Compliance Matrix (`compliance_matrix.json`) covers announcements 1.3 (3 items), 1.4 (3 items), and 1.5 (optional 11 items + required items) and all optional tasks for agent.1–agent.6. Each entry registers the report chapter, layer, indicator, drawing, HTML segment, source, assumptions, and self-inspection items. Professional Standard Matrix (`standard_matrix.json`) covers 5 mandatory standards ([standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]). Design depth matrix (`design_depth_matrix.json`) covers 15 formal depth items ([depth:existing_conditions_diagnosis] to [depth:risk_missing_data]), with all required items complete.

## Risk, Copyright, and Compliance

- **Data and Boundary Risks**: All boundaries and key areas are provisional; they will need to be recalculated once the formal polygons are released ([depth:risk_missing_data]). The control detailed planning Floor Area Ratio, height, density, road red lines, existing buildings, ownership, and municipal conditions are missing. All related conclusions are downgraded to pending confirmation items ([standard:MOHURD-CONTROL-DETAILED-PLANNING] [source:MOHURD-CONTROL-DETAILED-PLANNING]).
- **Drawing Depth**: The drawing and plan depth shall refer to [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] (Regulations for the Preparation Depth of Architectural Engineering Design Documents). The drawings shall be consistent with both visual representation and machine-readable data.
- **Copyright and Clearance**: The main text and charts of this proposal are generated by an AI agent based on publicly available information; all cultural symbols, characters, corporate logos, fonts, and photos in the graphics must be cleared for use, as detailed in `report/copyright_statement.md`.
- **Privacy and Compliance**: The AI scenario adheres to data minimization, public sources, and Human Review; it does not collect or use personal privacy or non-public planning information.
- **No Commitment Clause**: This scheme is a conceptual design proposal and does not claim official approval, final zoning regulations, ultimate land ownership, construction scale, or implementation guarantees; the spatial concepts for the six agent tasks are all Conceptual Recommendations, reference schemes, or materials for professional teams to further develop.
- **AI Generated Responsibility**: The AI agent is responsible for the facts, sources, copyright, spatial data, metrics, and expressions used; maintainers and professional reviewers may request revisions or rejection based on self-inspection results, spatial verification, and conformity with the grid system.

## References

- `brief/public-brief.md` (public task book draft and documentation boundaries, indexed materials, [source:brief-public-brief])
- `brief/site-package/design_brief.json`, `allowed_design_space.json`, `agent_taskbook.json`, `sources.json`, `ranges/planning_limits.json`, `standards/standards.json` and `standards/references/`, `geometry/provisional_boundaries.geojson` (all from the site package, with sources and availability recorded in `data/source_registry.json` and `sources.json`)
- `brief/site-package/allowed_design_space.json`
- `brief/site-package/agent_taskbook.json`
- `brief/site-package/sources.json`
- `brief/site-package/ranges/planning_limits.json`
- `brief/site-package/standards/standards.json` and `brief/site-package/standards/references/`
- `brief/site-package/geometry/provisional_boundaries.geojson`
- `data/source_registry.json`
- `data/processed/agent_fact_pack.md`, `data/processed/project_scope_summary.csv`
- `brief/site-package/schemas/compliance_matrix.schema.json`, `standard_matrix.schema.json`, `design_depth_matrix.schema.json`
- `skills/urban-design-ai-submission/references/submission-package.md`, `geometry-and-metrics.md`
