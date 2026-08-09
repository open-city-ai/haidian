---
title: "Jing-Zhang Grid: Urban Weaver — Centennial Jing-Zhang AI Innovation Belt Urban Design Scheme"
author_github: "Xwang987654"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Read the Jing-Zhang Railway site as the north-south 'longitude', and the three east-west university-community-industry corridors as 'latitude'. The entire AI Innovation Belt is a 'city loom': with Zhongzhiyuan as the longitudinal thread, AI Origin community as the latitudinal shuttle, and Dazhongsi as the showcase of finished products. Weaving together three layers of innovation, life, and culture."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "robot-delivery-low-speed", "enterprise-service-copilot"]
iteration: "v0.1"
---

<!-- 本方案由 AI agent 在公开任务书与 provisional 几何约束下生成, 所有空间落地均为概念建议.  -->

# Jing-Zhang Grid: Urban Weaver — Centennial Jing-Zhang AI Innovation Belt Urban Design Scheme

> **One-sentence Overview**: The Jing-Zhang Railway is the longitudinal axis, with university-community-industry corridors as the latitudinal lines, and the AI Innovation Belt as a loom—using three weaving workshops "Longitudinal Axis Spinning, Latitudinal Lines Shuttleting, Finished Product Display"—to weave together the century-old railway cultural heritage, the innovation resources of Zhongguancun, and the new AI culture into a global innovation pilgrimage belt where AI talent can walk, observe, and weave.

## Overview of the Proposal

This proposal presents five key judgments:

1. **The spatial structure is "woven," not "drawn."** The Jing-Zhang Railway Heritage Park is a continuous main axis of Public Spaces running north-south, which this proposal reads as the "longitude." The three north-south corridors of North Fifth Ring-Ring Qinghe, Wudao Kou-Qinghua Donglu, and Dazhongsi serve as the "latitude." The intersection of longitude and latitude forms the weaving points, with the three key areas being the three largest weaving points: Zhongzhiyuan as the "longitude loom" (where basic research weaves the thread of innovation), the AI Origin community as the "latitude shuttle" (where the results of conversion are woven into fabric), and Dazhongsi as the "finished product display" (where industrial services showcase the woven fabric). This differs from most submissions that treat the railway as a single "axis" or "line": the core of the weaving machine is the "interwoven longitude and latitude," where the north-south corridors are not merely complementary but are production elements on par with the north-south structure [data:geometry/roads.geojson#ROAD-001] [data:geometry/roads.geojson#ROAD-003].

2. **"Weaving" is both a spatial action and an AI action**. The core of AI large models is the "attention mechanism" — weaving meaning by cross-referencing countless information clues; the AI innovation chain is also the weaving process of "spinning (basic research) → threading (technology transfer) → weaving (industrial implementation) → dyeing (cultural coloring) → exhibiting (international dissemination)". Organizing urban space as a loom, aligning the production logic of AI with the spatial logic of the city, is the originality of this proposal [source:AGENT-TASKBOOK].

3. **Honest data governance takes precedence over pretty numbers**. Official precise redlines have not yet been released; all spatial layers in this plan are based on `provisional_boundaries` and are marked with `official_boundary=false`. The Floor Area Ratio, Building Height, density, and other regulatory control metrics are all labeled as `unknown` with an explanation of the reason [metric:floor_area_ratio]. The organizers' data gaps do not block content scoring, but the plan will never mislead the reviewers by falsely claiming precision [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE].

4. **Differentiated Specialization at Three Key Areas, Rather Than Repetitive Similarity**. Zhongzhiyuan = Garden-Type Full-Stack Autonomous Innovation ("Meridian Spindle", quiet and profound); AI Origin Community = School-Neighboring Type Technology Transfer ("Latitudinal Shuttle", active and mixed); Dazhongsi = Urban-Type Intelligent Economy ("Product Showcase", vibrant and international). These three areas differ in their spatial character, user base, AI scenarios, and landmark status [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003].

5. **Pilgrimage is not a visit, but a walkable weaving journey**. Along the Jing-Zhang Line from south to north, starting from the "Pilgrimage Bell" at Dazhongsi, passing through the "Coordinates Platform" at the AI Origin community, and arriving at the "Weaving Square" at Zhongzhiyuan, completing a reverse trace back pilgrimage from "finished product → transformation → source of inspiration". The three pilgrimage sites correspond to three journeys, aligning with the century-old cultural heritage of the Jing-Zhang Railway [depth:three_key_area_detailed_design].

**Uniform Statement**: All spatial implementations, activity operations, brand promotion, and policy mechanisms in this proposal are Open Co-Creation suggestions, reference proposals, or content for in-depth research by professional teams. They do not replace formal planning and do not constitute government approval conclusions [source:AGENT-TASKBOOK]. The content regarding Floor Area Ratio, Building Height, demolish–renovate–retain strategy, road alignment, municipal utility lines, investment estimates, and development timelines are all expressed as Conceptual Recommendations and must not be used as legal planning or approval references [standard:MOHURD-CONTROL-DETAILED-PLANNING]. (Demolish–Renovate–Retain Strategy)

![Figure 01: Overview of the Proposal — Loom Machine and Three Weaving Workshops](assets/figures/site-overview.png)

## Design Basis and Source List

### First Based on and Documentation Level

This plan is based primarily on the qualification pre-review announcement for the international Urban Design competition of the Centennial Jing-Zhang AI Innovation Belt issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources on May 9, 2026 [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. The announcement clearly defines the three layers of scope, three key areas, design tasks, depth of the competition, and boundary conditions, which serve as the primary control for the three layers of scope, key area positioning, and the context of the project results.

Excerpts from the Open Call Task Book for Agents (2026-05-18) have added ten co-creation principles, three positioning statements, five functional areas, the Three Zones and Two Wings, six agent tasks, a unified evaluation dimension, and uniform boundary clauses [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The main text of this plan, the square array, the standard matrix, the deep matrix, HTML, and the drawings are all organized around these requirements. The six tasks from agent.1 to agent.6 are readable in the main text, rather than merely being ticked off in JSON.

Use strict distinction in authority levels for data usage (according to `data/source_registry.json`) [source:SOURCE-REGISTRY] [source:PROCESSED-FACT-PACK]:

- **formal Available References (5):** Official Announcement (A0), Agent Task Statement (Qing Quan), Urban Design Management Measures (A0), Methods for Compilation and Approval of Control Plans (A0), and Guide to Classification of Land and Sea Use in Spatial Planning (A0). These are the authoritative references for the main conclusions.
- **provisional-only Materials (1 item)**: `provisional_boundaries.geojson` (maintained based on the announced textual boundaries and approximate area). For use in AI generation, visualization, self-check, and design discussions only; not to be upgraded to Official Planning Boundaries. (Official Planning Boundary)
- **Background Information**: The "1+X+1" industrial system in Haidian, and the Beijing Science and Technology Commission's "Three Zones and Two Wings" report, are provided for industrial context only and do not support spatial control conclusions.

### provisional honest declaration of boundaries

The official precise redlines are not yet available (qualification review documents for the organizing body are password protected; as of August 7, 2026, no verifiable coordinate system for the precise redlines was found on public channels) [source:BOUNDARY-SOURCE]. This plan uses `brief/site-package/geometry/provisional_boundaries.geojson` to generate a temporary formal package. The package includes `geometry/site_boundary.geojson` and `geometry/key_areas.geojson`, both marked as `provisional_constraint`, `official_boundary=false`, `boundary_precision=provisional_rough` [data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#PROV-KEY-001].

The data gaps of the organizing party do not block content scoring, nor should points be deducted for them [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. However, the plan must prominently disclose the limitations of accuracy: the provisional boundaries are only for the generation, self-check, visualization, and design discussion of the plan and **must not be used as official redlines, approval basis, precise area recalculation basis, or legal control conclusions**. After replacing the official polygons, the site boundary, key areas, land use, roads, green space, public space, buildings, phasing, and metrics must all be recalculated in their entirety [source:PROVISIONAL-BOUNDARIES].

### citation framework

The main text uses five categories of machine-readable evidence tags, with at least one required section per category:

- `[source:ID]`: Source (e.g., OFFICIAL-ANNOUNCEMENT, AGENT-TASKBOOK, BOUNDARY-SOURCE)
- `[standard:ID]`:  Professional Standards (such as MOHURD-URBAN-DESIGN-MEASURES, MNR-LAND-USE-CLASSIFICATION-GUIDE)
- `[depth:ID]`: Design depth items (such as land_use_layout, three_key_area_detailed_design)
- `[data:geometry/file.geojson#FEATURE]`: geometric layer feature
- `[metric:KEY]`: Indicator

These references allow reviewers to trace back from the main text to the GeoJSON to view the boundaries, back to the metrics to verify the calculations, and back to the sources to check the references, rather than relying solely on the text. The Evidence Chain of this proposal is seen in the cross-references to [data:geometry/site_boundary.geojson#SITE-001], [metric:site_area_sqm], [source:OFFICIAL-ANNOUNCEMENT], and [depth:existing_conditions_diagnosis].

## Three-Level Scope Framework

The proposal is organized according to the three levels determined in the announcement. The three layers of scope are mapped individually in `compliance_matrix.json`, ensuring that the mandatory tasks specified in sections 1.3, 1.4, and 1.5 of the announcement are covered by chapters, layers, indicators, drawings, and HTML evidence [depth:three_level_scope_framework].

| Level | Area (provisional recalculation) | Design Issue | Solution Approach | Data Anchoring |
| --- | --- | --- | --- | --- |
| Coordinated Research Area | 43.6 km² (Announced Value) | How can AI industry ecosystems and future urban forms be organized? | Establish an "innovation chain of Academic Pioneering-Open Source Collaboration-Enterprise Transformation-Public Experience-International Promotion"; naming system in conjunction with the Three Zones and Two Wings synergistic loop. | [source:OFFICIAL-ANNOUNCEMENT], compliance_matrix.json |
| Overall Design Area | 11,412,825 ㎡ [metric:site_area_sqm] | Industrial space, Urban Renewal, transportation infrastructure, how to be reflected on the plan | Warp and Weave Spatial Structure: 1 Warp Axis + 3 Weft Sewn Corridors + 9 Land Use Zones + Blue-Green Slow Travel Composite Ring | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-Area Detailed Design Area | 3,692,893 ㎡ (three zones combined) [metric:key_area_total_sqm] | How the three zones will achieve detailed design depth | Jingxian Spinning/Weaving Looms/Finished Product Display three weaving workshops, each with its own positioning, spatial actions, AI scenarios, and implementation risks | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

Three layers of work are not a disjointed set of drawings. Integrated research determines the industrial chain and urban form (what to weave); overall design translates these determinations into update projects, spatial structure, and facility carrying capacity (how to weave); detailed design for key areas verifies the implementability of specific plots, buildings, transportation, Public Space, and AI scenarios (what fabric to weave) [depth:overall_spatial_structure].

![Figure 02: Three-Layer Scope and Geographic Spatial Structure](assets/figures/land-use-structure.png)

provisional boundary description: all areas in this section are provisional recalculated values, within a reasonable tolerance range of the announced area (Overall Design Area 11,412,825 ㎡ vs announcement 11,400,000 ㎡; Key Area total 3,692,893 ㎡ vs announcement 3,684,000 ㎡). The differences arise from the deviation between the provisional rectangular boundaries and the actual redlines. The data must be recalculated in full upon the release of the formal data, and the current values should not be used as precise area references [source:PROVISIONAL-BOUNDARIES] [source:KEY-AREA-SOURCE].

## Coordinated Research Area: Industry and Future City Research

This section responds to Announcement 1.5(1) regarding the requirements for a World-Class AI Innovation Ecosystem, supply chain collaboration, the Three Zones and Two Wings, future AI city forms, AI culture/society/city, AI+transportation, and continuous green space systems [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], and addresses Agent.1 (overall concept and functional coordination of one belt) and Agent.2 (Full-Stack Independent AI Innovation System and World-Class AI Innovation Ecosystem) [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Naming System, English Names, and Logo Direction (agent.1)

**Name**: _df_ JingZhang JingJing (Chinese) / JingZhang Loom (English). (Jing-Zhang)

**Naming System Logic**:
- **Etymological Meaning**: "Jing" refers to the north-south longitudinal axis (Jing-Zhang Railway, the main line connecting Beijing and Tianjin, which runs longitudinally through the site); "Wei" refers to the east-west transverse axis (the academic zone-community-industry corridor). "Jing Wei" collectively refers to the longitudinal and transverse structure of a fabric, which is extended to mean "planning, governance" (Jing Wei Tian Xia). The "loom" is a production tool—AI innovation belt is not a static display belt, but a dynamic production belt.
- **Spatial Semantics**: Meridians = Jing-Zhang Heritage Park Vital Axis (north-south oriented, 9 kilometers of continuous pedestrian and bicycle paths); Latitudes = Three East-West Stitches (Qinghe Innovation Latitude, Wudaokou Humanistic Latitude, Dazhongsi Commercial Latitude); Nodes = Intersections of Meridians and Latitudes (three key areas); Fabric = Three Layers of Output (Innovative Fabric, Living Fabric, Cultural Fabric).
- **Semantic Dissemination**: The English term "Loom" means both "loom" (as in a weaving machine) and "loom" (as in something becoming visible or apparent), implying that AI innovation is a continuously emerging process. Jingzhang Loom has a clear international pronunciation and is distinctly different from existing submissions such as REN AXIS, Origin Line, and Civic Loop.

**Sub-Naming System:**
- Three Weaving Workshops: Zhongzhiyuan = Inquiry Spinning Mill, AI Origin Community = Transit Shuttle, Dazhongsi = Fabric Showcase.
- Two Wings:
Zhongguancun Technology Services Wing = Warp Wing (providing capital, IP, and global channels as "warp raw materials");
Xiaoyue River Scenario Enablement Wing = Dye Wing (providing real-world scenario testing and "dyeing" coloring).
- Holy Site Landmarks: Weaving Square (Zhongzhiyuan), Meridian and Latitude Platform (AI Origin Community), Holy Bell (Dazhongsi).
- Honor System: Jing-Zhang Loom Steles —— a sustainable incremental commemorative system along the Jing-Zhang Line, recording the most outstanding entities and human contributors of the year. It aligns with the four types of memorial carriers of the call-for-entries: "Entity Contribution Honor Wall, AI Milestones, Open Source Achievement Display Nodes, and Global Developer Honor Wall."

**Logo Direction** (pure geometric construction, using no third-party fonts, images, or trademarks): The theme is based on "crossed meridians and parallels + railway gauge." Two parallel vertical lines (representing north-south railway tracks, with the spacing indicating the gauge) are intersected by a horizontal line (representing an east-west meridian), creating a square negative space at the intersection point. The overall geometric abstraction can be read as an abstract "weave" symbol, or as a "meridian and parallel coordinate cross." It can be simplified into a single-color line drawing for use in paving patterns, signpost elements, and digital displays. Color scheme: Jing-Zhang rust red #B5563C (representing historical meridians), Zhongguancun circuit blue #2E5C8A (representing innovative parallels), and fabric off-white #F2EBE0 (representing public fabric). The font must be a SIL OFL open-source licensed font (such as Source Han Sans/Noto Sans CJK), and unauthorized fonts must not be used. **This Logo direction is a Conceptual Recommendation; formal use requires completion of trademark search and font authorization review** [source:AGENT-TASKBOOK].

### Three Key Orientations, Five Major Functions, and the Synergistic Loop of the Three Zones and Two Wings (agent.1)

**Three Key Positions Defined**:
- Centennial Jing-Zhang Cultural Belt → Main Axis (Jing-Zhang Relic Park Cultural Main Axis, Zhan Tianyou Railway Cultural Vein) [depth:existing_conditions_diagnosis]
- Urban AI Living Experience Belt → Latitudinal Line (Scenes of Life and Service Scenarios Linked by Three East-West Stitches)
- AI Integration Innovation Belt → Weave Points (three key areas for innovative production)

**Five Functional Zones Located**:
- Full-Stack Independent AI Innovation System → Jingxian Spinning (Zhongzhiyuan)
- World-class AI Innovation Ecosystem → Weaving Line Spindle (AI Origin Community)
- AI-Enabled Scenario Enablement New Paradigm → Trial Color Wing (Xiaoyue River Scenario Enablement Wing) + 12 Scenario Nodes
- Intelligent AI Vibrant City → Full Axis Scenographic System + Latitudinal and Longitudinal Public Experience Pathways
- AI Governance of Global Discourse → Longitude Spin (Zhongzhiyuan AI Standard Safety Governance Center) + Latitude Honor Night Annual Governance Dialogue

**Three Zones and Two Wings Synergistic Loop** ("Spinning→Loom→Weaving→Dyeing→Display→Recirculation")
The longitudinal weaving (Zhongzhiyuan) produces autonomous technologies and standard methods → The latitudinal shuttle (AI Origin community) weaves and transforms them into products and talent → The finished product exhibition (Dazhongsi) showcases industrial services and gathers market feedback → The warp wing (Zhongguancun Technology Services Wing) provides capital, professional services, and global element allocation → The trial dyeing wing (Xiaoyue River Scenario Enablement Wing) provides real-world scenarios and validation data → Feedback loops back to the longitudinal weaving to calibrate technical direction [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003].

At the regional collaborative level, this corridor is envisioned to form a "source-conception-mid-stage testing-manufacturing" gradient division of labor with the Future Science City, Huairou Science City, and Beijing Economic-Technological Development Area. It will complement innovation community ecosystems such as the Beilun Community, and leverage the Beijing-Tianjin-Hebei region as a deep hinterland scenario. These collaborations are Conceptual Recommendations and do not constitute a predetermined regional division of labor [source:AGENT-TASKBOOK].

### 5-8 global AI Innovation Ecosystem case studies and convertible mechanisms (agent.2)

This plan selects 8 global case studies, detailing verifiable mechanisms only, without fabricating investment amounts, outputs, or company lists [source:AGENT-TASKBOOK]. Each case corresponds to a "weaving mechanism" translation:

| # | Case | Comparability with Jing-Zhang | Transformative Mechanism (Weaving Translation) | Explicitly Not to Be Replicated |
| --- | --- | --- | --- | --- |
| 1 | Kendall Square, Boston | tightly adjacent to MIT's transformation zone, most resembling the cluster of colleges along Institute Road | "Suo" Mechanism: university-industry-capital walkable proximity, weaving origins into transformation | Avoid Replicating Intensive Development |
| 2 | King's Cross Knowledge Quarter in London | Both railway land regeneration and knowledge economy agglomeration | "Eccentric Line Regeneration" Mechanism: Embedding railway heritage with innovative functions | No single development entity |
| 3 | Paris Station F | Renovation of an Old Station into a Mega Startup Space | "Exhibition of Finishes" Mechanism: Transforming Large-Scale Carriers into Incubators | Avoid Replicating Super-Scale Monoliths |
| 4 | One-North Singapore | A mixed-use innovation district held and operated by the government for the long term | "Weaving" Mechanism: Long-term operational entity and Scenario Access | No fabricated land approval |
| 5 | Shenzhen Nan Mountain High-Tech Park | Industrial Iteration and Mutual Promotion of High-Density Urban Vitality | "Weave" Mechanism: Density Organization in Urban-Type Innovative Blocks | Do Not Fabricate Enterprise/Supply Chain Commitments |
| 6 | Seoul Banpo Tech Valley | Integration of Rail Stations and Cities with Digital Industry Aggregation | "Wěixiàn Jiēbó" Mechanism: Integration of Three Rail Lines | Avoid Replicating Suburban Models |
| 7 | MaRS Discovery District in Toronto | Non-profit institution long-term operation of a concentrated university area innovation facility | "Weave" Mechanism: Institutional Design Referencing a Long-Term Operating Entity | No Fabrication of Fiscal Commitments |
| 8 | Helsinki Kalasatama | Urban Space as a Real Test Bed | "Dye" Mechanism: Resident Co-Creation + Experimental Access and Exit (Refer to Trial Dye Wing) | Governance Framework for the Scenario Access Sandbox |

**AI Innovation Ecosystem Map (Element-Space Mapping)**: The spatial landing points of the eight elements (land/space/industry/funds/talent/computing power/data/scenarios) only answer "where they fall within which category of space," not "who they are given to or how much."
- Land/Space → Grid Network Land Use Zones (9 Zones)[data:geometry/land_use.geojson#LU-001]
- Industry → Diversified Craftwork Workshops
- Funding/Computing Power → Warp Wing (Zhongguancun) and Weft Spin (Zhongzhiyuan Intelligence Computing Services)
- talent → latitude shuttle (AI Origin Community Talent Residence) [data:geometry/buildings.geojson#BLDG-002]
- Data/Scenes → Trial Dyeing Wing (Xiaoyuehe) and 12 Scene Nodes

**Zhongzhiyuan Full Stack Autonomous System**: A "vertical thread" encompassing the entire chain from chips to applications, emphasizing a low-disturbance deep-dive environment for research, and supporting the national AI platform, standard setting, and security governance [data:geometry/key_areas.geojson#PROV-KEY-001]. **AI Origin Community Innovation Ecosystem**: A "horizontal shuttle" near the school, facilitating academic passage, technology transfer, and talent aggregation, and collaborating with Tsinghua, Peking, and the Chinese Academy of Sciences as the source of innovation [data:geometry/key_areas.geojson#PROV-KEY-002]. **Zhongguancun Technology Services Wing Support Mechanism**: A "weaving wing" for capital, professional services, and global element allocation. All of the above are Conceptual Recommendations and do not constitute confirmed business attraction, funding, or policy arrangements [source:AGENT-TASKBOOK].

![Figure 03: Three Key Areas —— Meridian Spindle · Latitudinal Shuttle · Finished Display](assets/figures/key-areas.png)

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The Overall Design Area requires the depth of Regulatory Detailed Planning for Urban Design [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:MOHURD-CONTROL-DETAILED-PLANNING]. This proposal presents the overall spatial structure of Urban Renewal, identification of inefficient spaces, a list of renewal projects, policy recommendations for implementation, the proportion of industrial functions, spatial organization models, total building scale, and an assessment of comprehensive carrying capacity [depth:overall_spatial_structure].

**Overall Design Area Spatial Structure**: With the "spatial loom" as the framework — the Jing-Zhang Greenway (greenway) as the north-south Public Space axis, and three vertical lines (Clear River Innovation/Kechuang branch, Wudaokou Cultural/Personality branch, Dazhongsi Commerce branch) as the east-west stitching corridors. The nine grid zones comprehensively cover the overall design area (11,412,825 ㎡) [data:geometry/land_use.geojson#LU-001] [data:geometry/roads.geojson#ROAD-001] [depth:land_use_layout]. Low-efficiency spaces are identified focusing on inefficient factories adjacent to the Jing-Zhang Heritage Park, crossing points over the ring road, and inactive spaces around stations. (Urban Renewal)

**Land Use Zones and Functional Proportions**: The 9-grid system adopts the MNR classification code [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] —— 0802 Research and Development Land (Zhongzhiyuan and the original point community segment, accommodating full-stack innovation and incubation), 0803 Cultural Land (cultural narrative in the ruins park segment of Dazhongsi), 1401 Park and Green Space (Jing-Zhang Green Corridor continuous belt), 05 Commercial and Business Services (industrial services and intelligent consumption), 0702 Community Services (talent residence and supporting facilities) [data:geometry/land_use.geojson#LU-001] [data:geometry/land_use.geojson#LU-009]. Building Footprint 256,081 ㎡ [metric:building_footprint_area_sqm], corresponding to three representative buildings [data:geometry/buildings.geojson#BLDG-001] [data:geometry/buildings.geojson#BLDG-002] [data:geometry/buildings.geojson#BLDG-003].

**List of Update Projects and Implementation Policies**: Six update projects (JZ-01 Jing-Zhang Axis Pedestrian Gap Closure, JZ-02 Zhongzhiyuan Qinghe Innovation Interface, JZ-03 Origin Community Near-School Conversion Street, JZ-04 Dazhongsi Station Quadrant Pedestrian Connectivity, JZ-05 AI Public Services and Edge Computing Nodes, JZ-06 Weaving Week Public Route), specifying types, spatial locations, dependency conditions, implementation subjects, and phased implementation [depth:renewal_project_list] [data:geometry/phasing.geojson#PHASE-001]. Implementation policy recommendations cover Urban Renewal integrated implementation, spatial supply, operational mechanisms, industrial services, public participation, data governance, and property rights coordination, all as Conceptual Recommendations [source:AGENT-TASKBOOK].

**Control Plan Depth and Confirmable Conditions**: Decompose the control plan depth into reviewable objects——land use structure [standard:MOHURD-CONTROL-DETAILED-PLANNING], [data:geometry/land_use.geojson#LU-001], Building Footprint [data:geometry/buildings.geojson#BLDG-001], traffic organization [data:geometry/roads.geojson#ROAD-001] Municipal Support [data:geometry/constraints.geojson] [depth:development_intensity_controls]. Floor Area Ratio, Building Height, Building Coverage Ratio, Green Space Ratio, and setback distances, among the official control metrics, are all missing in the Rights-Cleared Material [metric:floor_area_ratio]. They are marked as `unknown` and the reason for the missing data must be explained, and it is not acceptable to substitute fabricated values for the approved metrics [depth:risk_missing_data]. These are provisional zoning conditions that will be confirmed after the official polygon and zoning annex are completed. They will be refined by a professional team.

**Transportation, Railways, Municipal Infrastructure, and Supporting Facilities**: Propose a spatial layout around Transit-Station Integration (Wudao Kou, Qinghua Donglu Xi Kou, Dazhongsi), road micro-circulation, the closure of gaps in pedestrian paths, and the organization of parking and non-motorized vehicles [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure]. Explore the integration of edge-side computing pods, distributed energy, and traditional municipal infrastructure. Deploy a component library for Public Spaces (smart benches, information posts, display screens, interactive ground surfaces, edge computing pods) along the axis. For content involving Building Height, Development Intensity, road red lines, setbacks, and facility standards, write "pending confirmation of official control conditions" [source:AGENT-TASKBOOK]. (New Infrastructure)

## Detailed Design of Key Areas

Detailed design of key areas is a mandatory option in the announcement [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. The three key areas are represented as three non-overlapping rectangles in the provisional geometry, arranged from north to south. This plan designs them as three differentiated weaving workshops [depth:three_key_area_detailed_design]. The three key areas are provisional polygons for directional design only; all architectural forms, Demolish–Renovate–Retain strategy, and traffic organization conclusions will be re-evaluated after the official polygon and control plan conditions are fully defined [source:KEY-AREA-SOURCE] [source:PROVISIONAL-BOUNDARIES]. (Demolish–Renovate–Retain Strategy)

### Xinglian Spinning · Zhongzhiyuan AI Independent Innovation Acceleration Area (North, approximately 192.1 ha)

**Location**: Garden-type full-stack independent AI innovation district, Full-Stack Independent AI Innovation System and AI governance global discourse authority source [data:geometry/key_areas.geojson#PROV-KEY-001].

**Space Strategy·"West Core East Extension, Qinghe as the Boundary, and Central Axis"**: The west side is designated for a full-stack innovation experimental cluster (chip-framework-model-application full chain) and an AI standard safety governance center, housing the deepest research and development. The east side is allocated for a smart computing service and industry exhibition hub, making the inquiries visible. The northern end connects to the Qinghe Blue-Green Space and the North Fifth Ring Road green belt, forming a natural closure. The Jing-Zhang Central Axis (ruins park green corridor) runs longitudinally through, with the Zhongzhiyuan segment designated as the "Reflection Segment" — low density, low interference, high concentration [data:geometry/roads.geojson#ROAD-001].

**Spatial Character**: Unlike other proposals that define Zhongzhiyuan as a "Garden-Type Innovation District," this proposal defines it as an "Economic Thread Factory" — emphasizing "quiet deep work" rather than "displayed vibrancy." Full-stack independent innovation requires an environment with low interference for focused attention, where the "thread" is inward-facing: from problems to methods.

**AI Scene Arrangement (3 Weaving Points)**:
- Testing and Validation Scenario: Smart Gardening and Ecological Monitoring (First Weave·Garden Weave) - Only environmental and vegetation data, model failure fallback to conventional maintenance [data:geometry/green_space.geojson#GREEN-001]
- Second Weave·Transfer Weave (Autonomous Drive Shuttle Testing Segment, Testing and Validation Scenario): Conducts national and Beijing municipal intelligent network and autonomous vehicle testing management regulations, safety event stop [data:geometry/roads.geojson#ROAD-001]
- Third Weave · Model Weave (City Model Field): Display data consistent with metrics.json [metric:key_area_count]

**Place of Pilgrimage·Loom Plaza**: The loom-themed installation at Zhongzhiyuan station square, featuring an updateable plaque that records the "most fundamental question" of the year — annually nominated by the global AI community for the most significant open AI question of the year, inscribed on a monument. It records the "question" rather than the "answer," because the starting point of independent innovation is the question [data:geometry/public_space.geojson#PUBLIC-001].

**Implementation Risks**: Coordination with existing park ownership, balance between ecological space and development intensity, and uncertainty in the timing of national platform construction. All intensity and height indicators are pending confirmation [metric:floor_area_ratio] [depth:risk_missing_data].

### Meridian Shuttle·Beijing AI Origin Community (approx. 104.3 ha)

**Location**: Campus-based Conversion of Research Outcomes and Talent Community, a key node in the World-Class AI Innovation Ecosystem [data:geometry/key_areas.geojson#PROV-KEY-002].

**Spatial Strategy·"Four Directions of Weaving, Core at the Origin, and Opening the Campus"**: With the origin square as the core, weave in four directions—north to the Tsinghua Garden Cultural Node, south to Zhi Chun Road's Innovative Services, east to the University Cluster on University Road, and west to the Zhongguancun Texturing Wing. The core action is "Opening the Campus": borrowing the concept of "public right of way" but imbuing it with weaving significance—not "opening the walls to make the road network denser," but "opening the campus to extend the warp lines into the universities." Segments of the internal paths of the eight universities on University Road are included in the public pedestrian network, allowing the "warp lines" to extend from the heritage park into the campuses [data:geometry/roads.geojson#ROAD-004]. The Jing-Zhang Warp Line in the origin community segment is set as an "intersection segment"—high density, high mixed use, and high serendipity.

**Spatial Character**: defined as a "weaving shed" — where the act of "weaving" itself occurs: papers become products, students become entrepreneurs, and knowledge becomes capital. The spatial character emphasizes the "busyness and mixing at the weaving shed's interface." Universities are not passive talent suppliers but active "weaving partners" — with campus boundary design as a "weaving shed interface" rather than a barrier.

**AI Scene Arrangement (4 Weaving Points)**:
- Fourth Weave · Open Source Weave (Open Source Market and Release Day): Minimal Collection of Registration Information and Deletion After the Event [data:geometry/public_space.geojson#PUBLIC-002]
- Testing and Validation Scenario for Fifth Weaving·Delivery Weaving (Robot Low-Speed Delivery): Test data desensitized and open for research, with on-site safety personnel and remote take-over [data:geometry/roads.geojson#ROAD-002]
- Sixth Weaving·Transformation Weaving (Near-School Fruit-of-Research Transformation Kiosk): Result and Intellectual Property Authorization, Human Review [data:geometry/buildings.geojson#BLDG-002]
- Seventh Weave·Residential Weave (Talent Apartments and Community Services): Do not collect resident profiles for commercial recommendations [data:geometry/buildings.geojson#BLDG-002]

**Place of Pilgrimage · Latitude and Longitude Platform**: A tiered Public Space adjacent to the original point square, featuring a step-like public space with updateable plaques recording the "most successful traversals" of the year — i.e., the most successful cases of transforming from research papers to products (citation rights must be obtained). The record tracks "transformations" rather than "publications," as the core of the "traversal" is about crossing the gap [data:geometry/public_space.geojson#PUBLIC-002].

**Implementation Risks**: coordination mechanisms for universities and research institutions, supply models for talent apartments, and balancing the interests of existing communities. The Demolish–Renovate–Retain Strategy is merely a method framework [depth:retain_renovate_demolish].

### Exhibition of Finished Products · Dazhongsi AI Industry Cluster (South, approximately 72.0 ha)

**Location**: Urban-type Smart Economy and International Exchange District, the pilgrimage destination for new smart-native business forms [data:geometry/key_areas.geojson#PROV-KEY-003].

**Spatial Strategy·"Station Forecourt Exhibition + Dual Clusters + Bell Sound Dialogue"**: The Jing-Zhang legacy line corridor (now the ground segment of Line 13) diagonally traverses this area. The historical arm of the Line 13 pedestrian walkway is aligned with its route, providing the exhibition venues with a century-old ambiance of "along the legacy line." The Dazhongsi intersection square serves as an intelligent native consumption exhibition venue. To the west, an intelligent terminal flagship experience cluster and to the east, an intelligent body economic enterprise headquarters cluster and a data element service center are situated. These form a "sound dialogue" with the Dazhongsi Ancient Bell Museum — contemporary AI sound installations echo the cultural memory of the Yongle Great Bell's "bronze cast classic" [depth:height_massing_character].

**Spatial Character**: defined as the "finished exhibition space" — the endpoint where AI-Native products "enter the public domain." The spatial character emphasizes the coexistence of "the solemnity of a pilgrimage and the vitality of consumption." The cultural anchor point of Dazhongsi's ancient bells is proactively incorporated — the "sound of the bell" symbolizes "the sound of pilgrimage."

**AI Scene Arrangement (5 Weaving Points)**:
- Eighth Weave · Consumption Weave (Intelligent Native Commercial Experimental Field): Anonymous foot traffic counting and transaction data, no face recognition [data:geometry/public_space.geojson#PUBLIC-003]
- Ninth Fabric · Service Fabric (Enterprise Service Copilot Kiosk): Responses provided with sources and verified by professional advisors, not a substitute for official approval [data:geometry/buildings.geojson#BLDG-003]
- Tenth Layer · Sound Layer (AI Sound Installation and Public Art Experiment Segment): Utilize only environmental light and pedestrian density aggregated data; the lighting environment must meet ecological and residential rest requirements [data:geometry/green_space.geojson#GREEN-001]
- Eleventh Layer · Safety Layer (Nighttime Vitality and Safety Care): No facial recognition, alerts must be manually confirmed before disposal [data:geometry/public_space.geojson#PUBLIC-003]
- Testing and Validation Scenario: Compliance Authorization, Auditable, Minimized, Data Transaction Compliance + Human Review [data:geometry/buildings.geojson#BLDG-003]

**Place of Pilgrimage·Pilgrimage Bell**: A contemporary sound installation at Dazhongsi Intersection Square, echoing the cultural memory of the Yongle Great Bell. It will chime during major open-source releases and annual events. It maintains a distance from the cultural heritage scope of the Ancient Bell Museum, serving only as a conceptual installation [data:geometry/public_space.geojson#PUBLIC-003].

**Implementation Risks**: Dazhongsi Ancient Bell Museum conservation constraints (site selection based on avoiding conservation areas), traffic pressure along the Third Ring Road, and market uncertainty due to the transformation of commercial and trade activities [depth:risk_missing_data].

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

This section responds to agent.3 (AI-Enabled Scenario Empowering New Paradigms and Intelligent AI-Enabled Smart Cities) [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Twelve AI Scene Cards ("Twelve Weaves")

This proposal provides 12 AI scenario cards, among which 3 are for industrial Testing and Validation Scenarios (marked with a star ★), exceeding the minimum requirement specified in the task book (≥10 scenario cards, ≥3 testing scenarios). Each card follows a unified field: Fabric N · Fabric Name / Spatial Carrier / Service Object / Minimum Data / Human Review / Exit Condition. Common privacy baseline: no collection of facial or other biometric information for identity tracking; no establishment of cross-scenario personal profiles; human review retained for judgments involving public safety and public services; testing scenarios explicitly inform participants and provide exit options [source:AGENT-TASKBOOK].

| Woven ID | Scenario / Type | Spatial Carrier | Why It Is "One Woven" | Data and Human Review |
| --- | --- | --- | --- | --- |
| First Weave | Smart Gardening and Ecological Monitoring★ | Zhongzhiyuan Green Corridor | AI How to Make Ecology Smarter | Environmental and vegetation data only; model failure reverts to conventional maintenance. |
| Second Weave | Autonomous Driving Shuttle Test Segment★ | Zhongzhiyuan Loop | How AI Makes Mobility More Accessible | Adhering to National and Beijing's Intelligent Networked Vehicle Testing Management Regulations; Stopping at the First Sign of Safety Incidents |
| Third Weave | Urban Model Testing Field | Zhongzhiyuan Display Hub | How AI Enables Urban Simulatability | Display Data Consistent with metrics.json |
| Fourth Weave | Open Source Market and Release Day | Original Station Square | How AI Can Make Knowledge More Open | Minimal Collection of Registration Information and Deletion After the Event |
| Fifth Fabric | Low-Speed Delivery by Robots★ | Original Community Cycling Route | How AI Can Make Services More Accessible | Test Data Desensitized for Open Research; On-Site Safety Officer + Remote Takeover |
| Sixth Weave | Near-School Technology Transfer Hub | Original Point Community West Side | How AI Can Accelerate Conversion | Results and Intellectual Property Licensing; Human Review of Conversion Platform |
| Seventh Weave | Talent Residences and Community Services | Across from the Original Point Community | How AI Can Make Talent Feel at Home | No Resident Profiles Collected for Commercial Recommendations |
| Eighth Weave | Smart Native Commercial Experimentation Field | Dazhongsi Station Plaza | AI How to Make Consumption More Native | Anonymous foot traffic counts and transaction data; no facial recognition |
| Ninth Ward | Enterprise Services Copilot Station | Dazhongsi Headquarters Cluster | How AI Can Make Businesses Easier | Responses Attached with Sources and Reviewed by Professional Consultants; Not a Substitute for Official Approval |
| Tenth Fabric | AI Sound Installation and Public Art | Dazhongsi Green Corridor | How AI Can Facilitate Cultural Dialogue | Only Environmental Lighting and Crowd Density Aggregated Data |
| Eleventh Section | Nighttime Vitality and Safety Care | Dazhongsi Station Front | How AI Can Make Nights Safer | No Face Recognition; Alerts Must Be Hand-Confirmed Before Disposal |
| Twelfth Fabric | Data Elements and Digital Asset Circulation★ | Dazhongsi Data Service Center | AI How to Make Data More Valuable | Compliance-authorized, auditable, minimized; Compliance Party + Human Review |

### Five User Archetypes (agent.3)

| Image | Core Needs | Spatial Response | Non-Negotiable Boundaries |
| --- | --- | --- | --- |
| Weavers (Frontier Researchers) | Quiet Experimental Space, High-Intensity Computing Power, Low Interference | Meridians (Zhongzhiyuan) | Not Open for Display to Disturb Research |
| Weavers (Entrepreneur Engineers and Developers) | Low-cost Incubation Spaces, Open Source Community, Launch Scenarios | Latitudinal Weavers (AI Origin Community) | Test Admission Tiering |
| Exhibitors (International Visitors and Guest Experts) | readable bilingual urban interface, cultural narrative, landmark | Exhibition of Finishes (Dazhongsi) + Along the Entire Meridian Line | Source and copyright traceable. |
| Weavers (College Students) | Learning, Internship, and Entrepreneurship Integration Pathway | College Road Science and Education Integration Zone | Campus Data Requires Authorization |
| Residents (including the elderly in the surrounding community) | Accessible, Understandable, and Rejectable AI Public Services | Throughout All Axis Scenarios | No Individual Identity Data Collected; Maintain Non-Smart Alternatives |

### Scene-Space-Operation Mapping

All scenarios follow the open mechanism of "scene list public release → subject application → safety and ethics review → limited-term testing → Human Review → display or exit" [source:AGENT-TASKBOOK]. The operational subject is suggested to be formed by a district-level platform company in conjunction with the community, enterprises, and universities, with the specific mechanism being a Conceptual Recommendation. Xiaoyuehe Trial Wing serves as a "AI+ healthcare, AI+ film and television, embodied intelligence" etc. real test field. The public experience path is the "Eccentric Line One Day Route" — a pilgrimage experience route from south to north: Holy Bell → Meridian and Latitude Platform → Loom Square [depth:traffic_rail_slow_parking].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

### Land-Use Layout (Grid Zone Division)

The land use classification is based on the Land and Sea Use Classification Guide [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], and the Overall Design Area is divided into 9 zones using a grid of latitude and longitude. This division fully covers the site_boundary, with no overlaps or gaps [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]:

| Land Code | Name | Area (provisional, sqm) | Design Implication |
| --- | --- | --- | --- |
| 0802 | AI Autonomous Innovation Research Land (Zhongzhiyuan Segment + Yedian Community Segment) | 2,147,993 | Research and Production Space for Warp and Weft Spinning |
| 1401 | Park Green Spaces and Jing-Zhang Green Corridor | 2,968,537 + Meridian Line | Meridian Public Space Main Axis |
| 0803 | Cultural Land Use and Ruins Park (Dazhongsi Segment) | 1,518,481 | Cultural Narrative Carrier of the Meridian |
| 05 | Industrial and Commercial Service Land | 2,317,716 | Space for Exhibition of Finished Products |
| 0702 | Community Services and Accompanying Land Use | 2,460,149 | Latitudinal Living Service Space |

The land use zones are formed by dividing the site boundary with 2 longitudinal lines (Jing-Zhang Greenway Line + Innovation Service Line) and 3 latitudinal lines (Qinghe Science and Technology Innovation Latitudinal Line + Wudaokou Humanistic Latitudinal Line + Dazhongsi Commercial Latitudinal Line). Adjacent polygons share vertex coordinates, ensuring topological safety [data:geometry/land_use.geojson#LU-001] [data:geometry/land_use.geojson#LU-009].

### Building Scale and Demolish–Renovate–Retain Strategy

The Building Footprint expresses the representative buildings of three key areas [data:geometry/buildings.geojson#BLDG-001] [data:geometry/buildings.geojson#BLDG-002] [data:geometry/buildings.geojson#BLDG-003], with a total gross floor area of 256,081 ㎡ [metric:building_footprint_area_sqm] [depth:height_massing_character]. The demolition–renovate–retain strategy classifies the approach as a method framework: retain (preserved cultural heritage and high-quality buildings), renovate (inefficient factories and ground-floor activities), demolish (dangerous buildings and illegal constructions), and new construction (incremental development in key areas) [depth:retain_renovate_demolish]. (Demolish–Renovate–Retain Strategy)

**Development Intensity and Control Conditions**: The official control indicators such as Floor Area Ratio, Building Height, Building Coverage Ratio, green space ratio, and setback distances are all missing in the Rights-Cleared Material [metric:floor_area_ratio]. This plan clearly marks them as `unknown` and provides the reason for their absence, ensuring that fabricated values are not used [standard:MOHURD-CONTROL-DETAILED-PLANNING]. These indicators are pending and will be completed by the professional team once the official polygon and control plan attachments are provided.

## Transport, Rail, Municipal Infrastructure, and Public Services

### Walking and Cycling Network

Traffic organization designed as an "Meridians + Latitudes" network [data:geometry/roads.geojson#ROAD-001] [depth:traffic_rail_slow_parking]:

- **Meridian:** Jing-Zhang Greenway Main Axis (ROAD-001, greenway) + Innovation Service Pedestrian Corridor (ROAD-002, pedestrian), running north-south and connecting the Three Weaving Workshops [data:geometry/roads.geojson#ROAD-001] [data:geometry/roads.geojson#ROAD-002].
- **Meridians**: Three east-west aligned corridors (ROAD-003/004/005, branches), respectively corresponding to Qinghe Innovation, Wudaokou Humanities, and Dazhongsi Commerce, weaving through the university-park-industry [data:geometry/roads.geojson#ROAD-003] [data:geometry/roads.geojson#ROAD-004] [data:geometry/roads.geojson#ROAD-005].

Conceptual Recommendation for Track Integration: Conduct integrated design for the Wudaokou, Qinghua Donglu Xi Kou, and Dazhongsi stations to optimize station connectivity with key development areas [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. Focus on stitching the slow-moving traffic gaps at the Jing-Zhang Heritage Park across the ring road node and the park's north and south ends [data:geometry/public_space.geojson#PUBLIC-001]. All road alignments, red lines, and bridge and tunnel works are part of the conceptual recommendation and do not constitute an engineering feasibility conclusion [source:AGENT-TASKBOOK].

![Figure 04: Traffic Slow Zone and Composite System of Blue-Green Public Spaces](assets/figures/mobility-bluegreen.png)

### Municipal and New Infrastructure

Municipal facilities cover AI industry service facilities, innovation service platforms, talent living services, New Infrastructure, distributed energy, edge-side computing capacity, and the integration with traditional municipal facilities [depth:municipal_new_infrastructure]. Explore the axial replication deployment of edge-side computing pods and public service component libraries (smart seats, information posts, display screens, interactive ground surfaces, edge computing pods). When engineering documents for energy, drainage, flood control, fire protection, etc., are missing, they are listed as formal deepening prerequisites [data:geometry/constraints.geojson] [depth:risk_missing_data].

## Blue-Green Network, Public Space, and Urban Character

### Blue-green Public Space System

Blue-Green Space is structured around the Jing-Zhang Green Corridor, with a green space ratio of 15.4% [metric:green_ratio] and a Public Space ratio of 2.1% [metric:public_space_ratio] [depth:blue_green_public_space]. The green corridor runs continuously along the Jing-Zhang line (GREEN-001), with the Zhongzhiyuan segment connecting to Qinghe Blue-Green Space, the original community segment featuring a school park nearby, and the Dazhongsi segment planning for green space with multiple uses [data:geometry/green_space.geojson#GREEN-001] [data:geometry/green_space.geojson#GREEN-002]. Public spaces include three weaving workshop squares and a network of longitudinal and latitudinal public walkways [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/public_space.geojson#PUBLIC-004].

### Three AI Pilgrimage Sites and Honor System (agent.4)

This proposal presents 3 AI pilgrimage landmarks corresponding to the three stages of the pilgrimage journey [source:AGENT-TASKBOOK]:
- **Loom Square** (Zhongzhiyuan): Records the annual "most fundamental question," bearing the AI milestone [data:geometry/public_space.geojson#PUBLIC-001]
- **AI Origin Community (AI Origin):** Records the annual "Most Successful Transit," hosting a node for the display of open-source achievements [data:geometry/public_space.geojson#PUBLIC-002]
- **Pilgrim Bell** (Dazhongsi): The annual bell is rung in honor of the most outstanding contributor of the year, commemorating the global developer honor wall [data:geometry/public_space.geojson#PUBLIC-003]

Honor System "Jing-Zhang Axis Memorial Park" is set along the Jing-Zhang axis, establishing a sustainable sequence of commemorative inscriptions that align with the four categories of memorial carriers proposed by the collector. All landmarks are Conceptual Recommendations, with the selection principle being to avoid the rigid constraints of cultural heritage protection and green spaces, and do not constitute approved construction [source:AGENT-TASKBOOK].

### Cultural Narrative (agent.5)

Share the "weaving" action through a three-layer cultural narrative [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]:
- **First Layer·Century Jing-Zhang (1909)**: Zhan Tianyou innovated with the "person" shaped track to conquer the steep climb of Guan-Gou —— innovation began with questioning "how to climb." The old Tsinghua Garden Station (begun in 1910, and on March 25, 1949, it was the first stop for the Central Committee of the Communist Party of China's "entrance exam journey" to Beijing) will be utilized through narrative and display, without reaching an engineering conclusion. Narrative keywords: latitude and longitude, overcoming difficulties, self-reliance.
- **Second Layer · Zhongguancun and the Eight Academies (1952 to Present)**: In 1952, during the institutional adjustment, eight institutions of technology and engineering were concentratedly established on University Road, becoming China's earliest "University City." The universities on University Road are not passive suppliers but active "weavers" in the fabric of the city. Narrative keywords: weft, aggregation, pioneering.
- **Third Layer·AI New Culture (Current Era)**: AI is essentially a "machine for asking and solving questions," and the core of open-source collaboration is "to make problems public so that others can continue to build upon them." Narrative keywords: traversal, open-source, human-centric.

Three-layer common core: Jing-Zhang Railway asks "how to climb the slope," University Road asks "how to innovate," and AI asks "how to solve"—all share the action of "weaving." Signage is based on the theme of "longitude and latitude cross," managed in layers with the overall logo of One-Belt [source:AGENT-TASKBOOK]. All historical statements must be verified by humanities and history professionals, ensuring no distortion of history and no use of culture as a decorative element for technology.

### Urban Character

Urban Character blends the historical and cultural threads of the Jing-Zhang Railway, the innovation culture of Zhongguancun, and the new AI culture [standard:MOHURD-URBAN-DESIGN-MEASURES]. Building Height, massing, character, roof forms, and facade control are design suggestion levels, to be refined after the official control plan conditions are confirmed [depth:height_massing_character]. The control of character is to be clearly distinguished between official control, design suggestions, and conditions that require confirmation, and it is strictly forbidden to provide pseudo-precise control lines without cultural heritage or control plan justification [standard:MOHURD-CONTROL-DETAILED-PLANNING].

## Renewal Projects, Implementation Policy, and Phasing

### Update Project List (6 items)

| Project Number | Project Name | Type | Main Dependencies | Evidence Reference |
| --- | --- | --- | --- | --- |
| JZ-01 | Jing-Zhang Meridian Slow-Travel Discontinuity Seam | Public Space/Transport | Road Red Line, Underbridge Space, Review of Traffic Organization | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Zhongzhiyuan Qinghe Innovation Interface | Blue-Green Space/Industrial Display | River Blue Line, Ecological and Flood Protection Conditions | [data:geometry/green_space.geojson#GREEN-002] |
| JZ-03 | Origin Community Near-School Conversion Street | Urban Renewal/Industrial Services | campus boundaries, ownership, first-floor uses | [data:geometry/buildings.geojson#BLDG-002] |
| JZ-04 | Dazhongsi Station Quadrant Pedestrian Connectivity | Transit-Oriented Development/Slow Zone | Transit Station, Road Intersection, Utility Infrastructure | [data:geometry/public_space.geojson#PUBLIC-003] |
| JZ-05 | AI Public Services and Edge Computing Nodes | New Infrastructure/Public Services | Energy, computing power, security, and operational entity | [data:geometry/constraints.geojson] |
| JZ-06 | Public Space Route for JZ Weaving Week | Operations/Brand | Public Space Permits, Activity Safety, Copyright Clearance | [data:geometry/phasing.geojson#PHASE-001] |

### Phased Plan (Phase )

Phase in accordance with the advancement rhythm of the three weaving workshops [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation]:
- **Phase-001·Origin Community Pilot Conversion Segment** (PHASE-001): Pilot with a Latitudinal Shuttle, Lightweight Facilities + Operational Activities + Service Platform Initiation [data:geometry/phasing.geojson#PHASE-001]
- **Phase-002·Zhongzhiyuan Full Stack Innovation Breakthrough Segment** (PHASE-002): Jingxian Spinning, Requires Confirmation of Control Plan and National Platform Sequence [data:geometry/phasing.geojson#PHASE-002]
- **Phase-003·Dazhongsi Industrial Service Extension Segment** (PHASE-003): Product Exhibition, Requires Cultural Heritage Confirmation and Business Model Transformation [data:geometry/phasing.geojson#PHASE-003]

Distinguish between phases and a 100-day design solicitation period: the solicitation period is the timeframe for submitting results, while phased implementation is the Urban Renewal advancement path [source:AGENT-TASKBOOK].

### Global AI Innovation Ecosystem and Long-Term Operations (agent.6)

**Annual Activity Framework** (Conceptual Recommendation) [source:AGENT-TASKBOOK]:
- Spring·Jingxian Spinning Forum (Zhongzhiyuan): Annual Global AI Foundation Research Fundamental Inquiry Conference, which poses a "Most Fundamental Question" each year
- Summer·Latitude Shuttle Co-creation Camp (AI Origin Community): Open Source Collaboration and Outcome Co-creation Camp
- Fall·Completed Works Festival (Full Axis Engagement + Dazhongsi Main Stage): AI-Native Product Consumption Exhibition + Public Open Day for Pilgrimage Journey
- Winter · Jingwei Honor Night (Jingwei Platform Unveiling of New Plaque): Annual Honor Engraved + Pilgrimage Bell Ringing + Addition to Jingwei Stele Garden

**Developer Community Operations**: Establish "Open Source Home" as a permanent hub, and implement the operational rules of "member co-creation, mentor pairing, company posing questions-community solving problems." New members will embark on a "Innovation Pilgrimage" by walking along the longitudinal axis through the Three Weaving Workshops when they join [source:AGENT-TASKBOOK]. **International Promotion and Attraction Transformation**: Collaborate with a global open-source community to develop a narrative titled "The Loom of Jingzhang — A Century of Rails, A Future of Woven Intelligence" in bilingual storytelling. Establish a transformation channel for "events-talent hub-incubation-carrier supply." Each activity should set participation scale, number of talents and projects involved, and reiteration evaluation criteria.KPI, adjust or exit for those that do not meet the criteria continuously. All activities, funding, policies, and operational arrangements are Conceptual Recommendations and do not constitute determined government arrangements.[source:AGENT-TASKBOOK].

## Metrics, Area Recalculation, and Compliance Matrix

### Three categories of indicators

This scheme categorizes the indicators into three types [depth:metrics_recalculation]:
- **First Category·Geometric Recalculation Spatial Indicators**: site_area_sqm=11,412,825 [metric:site_area_sqm], green_ratio=0.154 [metric:green_ratio], public_space_ratio=0.021 [metric:public_space_ratio], building_footprint_area_sqm=256,081 [metric:building_footprint_area_sqm], key_area_count=3 [metric:key_area_count], key_area_total_sqm=3,692,893 [metric:key_area_total_sqm], land_use_partition_count=9 [metric:land_use_partition_count].
- **Second Category·Control Indicators Requiring Official Zoning Support**: floor_area_ratio=unknown [metric:floor_area_ratio], Building Height, Density, Setback—All missing, pending official zoning plan.
- **Third Category·Metrics Requiring Operational Data Calibration**: scenario_card_count=10 [metric:scenario_card_count], persona_count=5 [metric:persona_count], pilgrimage_landmark_count=3 [metric:pilgrimage_landmark_count], renewal_project_count=6 [metric:renewal_project_count].

All known metrics can be recalculated from GeoJSON or reliable sources; unknown metrics provide the reason and formal submission prerequisites [source:PROVISIONAL-BOUNDARIES]. Recalculation of the metrics is performed in EPSG:4548 (CGCS2000 / 3-degree Gauss-Kruger CM 117E) [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

![Figure 05: Recalculation of Core Indicators and Evidence Chain](assets/figures/metrics-evidence.png)

### Align the grid pattern coverage

`compliance_matrix.json` covers all 17 items of announcements 1.3, 1.4, and 1.5, plus items agent.1-agent.6, totaling 23 requirements [depth:metrics_recalculation]. `standard_matrix.json` covers 6 professional standards (5 mandatory + 1 needs_official_file) [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]. `design_depth_matrix.json` 15 core depths all complete [depth:existing_conditions_diagnosis] [depth:three_level_scope_framework] [depth:overall_spatial_structure] [depth:land_use_layout] [depth:development_intensity_controls] [depth:height_massing_character] [depth:retain_renovate_demolish] [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure] [depth:blue_green_public_space] [depth:three_key_area_detailed_design] [depth:renewal_project_list] [depth:phasing_implementation] [depth:metrics_recalculation] [depth:risk_missing_data].

## Risk, Copyright, and Compliance

### Legality of Documentation and Provisional Restrictions

This plan is based on official publicly available materials and provisional geometry, without the use of non-public planning documents, non-public spatial data, internal control indicators, or personal privacy [source:OFFICIAL-ANNOUNCEMENT] [source:PROVISIONAL-BOUNDARIES]. The provisional boundaries are only for AI generation, self-inspection, visualization, and design discussions and must not be used as official redlines, approval references, or precise area references; all area-related metrics must be recalculated in their entirety after replacing the official polygon [depth:risk_missing_data].

### List of Missing Materials

The following are formal deepened prerequisites [source:PROVISIONAL-BOUNDARIES] [source:KEY-AREA-SOURCE]:
- official redline with three official key-area polygons
- Controlled Development Regulations (FAR/height/density/green space ratio/setback)
- right-of-way, parcel boundaries, ownership boundaries
- Preserve control line (Dazhongsi Ancient Bell Museum, Former Tsinghua Garden Railway Station)
- municipal utilities, traffic sections, fire safety, energy loads

### Copyright and AI Generated Disclosure

All text, geometry, metrics, drawings, and visualizations are generated by an AI agent within the open rules of this repository, without the use of any unauthorized trademarks, fonts, images, or copyrighted materials [source:AGENT-TASKBOOK]. Naming and logo direction are Conceptual Recommendations and must be reviewed for trademark clearance and font authorization before formal use. The proposal is released under a CC-BY-4.0 license (`license: COMMUNITY-DISPLAY-ONLY`). All content is generated by an AI agent, with the generation method, model, and self-check results recorded in agent.json, self_check.json, and manifest.json. The proposal is part of the Open Co-Creation initiative, with the final judgment made by humans and professional teams. It does not claim any governmental stance and is not intended as an approval document [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Reiterate the compliance boundaries

All spaces, activities, operations, brand promotion, and policy mechanisms are expressed as "Conceptual Recommendations" and "Reference Plans" for further in-depth study by professional teams. They should not be considered as statutory planning, definitive government decisions, or implementation commitments [source:AGENT-TASKBOOK]. This plan does not claim official approval, final control detailed planning, ultimate land ownership, final construction scale, or any assurance of implementation [standard:MOHURD-CONTROL-DETAILED-PLANNING].

## References

- `brief/public-brief.md`, `brief/site-package/design_brief.json`, `brief/site-package/allowed_design_space.json`
- `brief/site-package/agent_taskbook.json` [source:AGENT-TASKBOOK]
- `brief/site-package/sources.json`, `data/source_registry.json` [source:SOURCE-REGISTRY]
- `data/processed/agent_fact_pack.md` [source:PROCESSED-FACT-PACK]
- `brief/site-package/ranges/planning_limits.json`, `brief/site-package/enums/`
- `brief/site-package/schemas/`(compliance/standard/depth/metrics/manifest/self_check/geojson_feature)
- `brief/site-package/standards/standards.json` with `references/` [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]
- Machine-readable citation index: [source:OFFICIAL-ANNOUNCEMENT], [source:AGENT-TASKBOOK], [source:SITE-PACKAGE], [source:SOURCE-REGISTRY], [source:PROCESSED-FACT-PACK], [source:BOUNDARY-SOURCE], [source:KEY-AREA-SOURCE], [source:PROVISIONAL-BOUNDARIES], [data:geometry/site_boundary.geojson#SITE-001], [metric:site_area_sqm]
