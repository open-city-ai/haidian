---
title: "Centennial Jing-Zhang AI Innovation Belt: Urban Design Conceptual Proposal for the Jing-Zhang Smart Pulse Coexistence Belt"
author_github: "JinGuYuan"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With the Jing-Zhang Railway Heritage Park, fully connected by August 2026, serving as the historical and Public Space axis, the concept of an AI innovation belt in Urban Design is proposed: \"one belt, three cores, two wings, and multiple points, with a blue-green slow-moving composite ring.\" The Zhongzhiyuan serves as the full-stack self-innovative core, the AI Origin community as the near-school ecological original point core, and Dazhongsi as the urban-type AI-Native new industry core. The two wings connect to Zhongguancun's technological services and the \"Little Moon River scenario empowerment,\" forming a formal machine-readable scheme that is verifiable, calculable, and ready for recalculation after the Official Boundary is replaced."
tracks: ["jingzhang-heritage-narrative", "ai-traffic-walkability", "youth-friendly-public-space"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "ai-health-service-navigation", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v0.1"
---

<!-- 本包已替换全部脚手架内容，为正式可评审草稿；package_state 由 finalize 置为 ready_for_review。 -->

# Centennial Jing-Zhang AI Innovation Belt: Urban Design Conceptual Proposal for the Jing-Zhang Smart Pulse Coexistence Belt

## Design Basis and Source List

This proposal is based on the qualification pre-review announcement for the International Scheme Competition of the Centennial Jing-Zhang AI Innovation Belt Urban Design, hosted by the Beijing Development and Reform Commission, Beijing Planning and Natural Resources Commission, and the Haidian District People's Government, and organized by the Zhongguancun Science City Management Committee [source:OFFICIAL-ANNOUNCEMENT], and uses the machine-readable temporary rough boundaries, key areas, enumerations, indicators, standards, and source list maintained by the site manager in the repository `brief/site-package/` [source:SITE-PACKAGE][source:AGENT-TASKBOOK][standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

**Area Benchmarks for Three Levels and Three Key Areas**: The Coordinated Research Area covers approximately 43.6 square kilometers, the Overall Design Area covers approximately 11.4 square kilometers, and the Key-Area Detailed Design Area covers approximately 368.4 hectares; the three key areas are the Zhongzhiyuan AI Independent Innovation Acceleration Area (192.1 hectares), the Beijing AI Origin Community (104.3 hectares), and the Dazhongsi AI Industry Cluster Area (72.0 hectares) [source:OFFICIAL-ANNOUNCEMENT]. This scheme submission includes the [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#zhongzhiyuan_ai_acceleration_area] elements, which are **provisional constraints** (`official_boundary=false` and `boundary_precision="provisional_rough"`), used only for scheme generation, self-checking, visualization, and design discussions. They cannot be used as official redlines, approval references, precise area references, or legal control conclusions [source:BOUNDARY-SOURCE][source:KEY-AREA-SOURCE][source:PROCESSED-FACT-PACK]. The recalculated Overall Design Area using EPSG:4548 is 11,412,825 m², consistent with the announced 11.4 square kilometers. Three key areas have a combined area of 3,692,893 m² (3 areas, [metric:key_area_count]), consistent with the announcement of 368.4 hectares (error approximately 0.2%) [metric:site_area_sqm][metric:key_area_area_sqm]. The current baseline conditions and list of data gaps are detailed in [depth:existing_conditions_diagnosis] and `data/processed/missing_data_checklist.csv`. The organizing body's data gaps do not block content scoring; overall replacement and re-calculation are required after the official polygon release.

**Core Fact Baseline (Public Sources)**: The Jing-Zhang Railway was constructed from 1905 to 1909 under the supervision of Zhan Tianyou, marking the first railway designed and built by Chinese engineers, with the "person" shape switch at Qinglong Bridge as a landmark [source:SRC-JINGZHANG-HISTORY]; in 2016, the Tsinghua University Station ceased passenger operations, and the old Jing-Zhang Railway within the Fifth Ring Road of Beijing was decommissioned [source:SRC-TSINGHUAYUAN-STOP]; on December 30, 2019, the Jing-Zhang High-Speed Railway was inaugurated, exiting the Beijing North Station and entering underground through the Tsinghua University Tunnel after about 270 meters, transforming the original ground space into the Jing-Zhang Railway Heritage Park [source:SRC-JINGZHANG-HSR]. The Heritage Park is approximately 9 kilometers long and covers about 70 hectares, serving nine street towns in Haidian [source:SRC-HERITAGE-PARK-PLAN], with Phase 1 opening in June 2023 (covering about 2.4 kilometers from Zhichun Road to Qinghua East Road). **Phase 2 will be completed and open on August 6, 2026, with the entire route from Xizhimen to the North Fifth Ring Road fully connected, covering approximately 53 hectares and serving about 450,000 residents in 70 communities** [source:SRC-HERITAGE-PARK-PHASE2]. Phase II Core Achievements: 1. Construct a seamless Walking and Cycling Network ("three paths and one green") along the entire line (independent pedestrian paths, slow running paths, and bicycle lanes with no breaks, with cycling network connections to the dedicated bicycle path in Huoliangqian); 2. Restore approximately 2.4 kilometers of the original century-old railway track in the southern community vitality section, recreate the historical appearance of Sidaokou, and revitalize the industrial heritage of the welding factory into an innovative workshop (Industrial Heritage Innovation Workshop); 3. Connect the natural leisure section in the north with the suburban park and Qinghe Green Corridor, and build a "Jing-Zhang Ring" themed square; 4. Reserve activity spaces for a youth innovation market, catering to the needs of all age groups [source:SRC-HERITAGE-PARK-PHASE2].

**Three Zones and Two Wings Official Framework**: Haidian District Government and the Beijing Municipal Commission of Science and Technology have clarified that the innovation belt will be based on a 9-kilometer stretch of the Jing-Zhang Railway Heritage Park as the "innovation chain," with three zones (Zhongzhiyuan AI Independent Innovation Acceleration Area, Beijing AI Origin Community, Dazhongsi AI Industry Agglomeration Zone) and two wings (the west side Zhongguancun Technology Services Wing and the east side Xiaoyue River Scenario Enablement Wing) [source:SRC-HAIDIAN-3AREAS-2WINGS][source:SRC-BJ-KW-3AREAS-2WINGS]. The spatial concept of this plan is built upon this official framework, without creating additional red lines.

**Source Review Status**: `data/source_registry.json` records formal available sources and provisional-only sources [source:SOURCE-REGISTRY]. This proposal `sources.json` Seven items were formally approved in correspondence with the registry, and thirteen items were publicly officially approved.URL Source metadata registered completely, annotate with / ——for factual background only, Do not support the spatial control conclusions (all spatial control conclusions are supported by [data:geometry/*] and [metric:*]), to be upgraded after review by the custodian registry.

**Reference Boundary**: `data/source_registry.json` records formal available sources and provisional-only sources [source:SOURCE-REGISTRY]. The provisional boundaries used in this plan are only for provisional intake; `sources.json` registers all publicly official sources cited in this plan (Beijing Municipal Commission of Planning and Natural Resources, Haidian District Government, Beijing Municipal Commission of Science and Technology, China State Railway Group, etc.) [source:SRC-HAIDIAN-AI-INDUSTRY][source:SRC-ZHONGZHIYUAN][source:SRC-AI-ORIGIN-COMMUNITY][source:SRC-DAZHONGSI-RENEWAL][source:SRC-XIAOYUEHE]. Unverified claims (such as rumors of enterprise acquisitions in the Dazhongsi plot) are not adopted. (Provisional Boundary) All areas, proportions, and scales can be recalculated from `geometry/*.geojson`, `metrics.json`, or the sources above [metric:land_use_cover_ratio].

![Evidence Chain and Relationship Diagram with Submission Package](assets/figures/site-overview.png)

## Three-Level Scope Framework

The plan is organized according to the three levels determined in the announcement, progressively implementing "industrial strategy → overall Urban Design → detailed design of key areas":

| Level | Official Area | Work Content of This Plan | Design Depth | Data Landing Point |
| --- | --- | --- | --- | --- |
| Coordinated Research Area | Approximately 43.6 km² | World-Class AI Innovation Ecosystem, Synergistic Circuits of the Three Zones and Two Wings, Naming and Visual Identity, AI Future City Form | Industrial and Urban Strategic Research | [source:OFFICIAL-ANNOUNCEMENT], compliance_matrix.json |
| Overall Design Area | 11.4 km² | Jing-Zhang Greenway Vital Axis, Land Use Structure, Transportation Infrastructure, Blue-Green Slow-Travel Ring, Urban Character | Controlled Detailed Urban Design | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-Area Detailed Design Area | 368.4 ha | Three key areas for detailed design: industrial functions, architectural forms, demolish–renovate–retain strategy, Public Space, traffic organization, AI scenarios | depth of Integrated Planning Implementation Plan | [data:geometry/key_areas.geojson#zhongzhiyuan_ai_acceleration_area] etc. | (Demolish–Renovate–Retain Strategy)

The three-level scope depth items are constrained by [depth:three_level_scope_framework] and [depth:overall_spatial_structure]. **provisional boundary usage note**: The current submission uses a temporary rough polygon provided by the repository; after replacing with official polygons, the site boundary, key areas, land use, roads, green space, public space, buildings, phasing, and all indicators must be recalculated [source:BOUNDARY-SOURCE][source:PROCESSED-FACT-PACK].

**Overall Spatial Concept——"Jing-Zhang AI Vital Spine"**:

```
一带三核两翼多点 · 蓝绿慢行复合环

    众智园 ── AI全栈自主创新核（北）── 轨道微中心 · 开园运营
      │
 京张遗址公园活力绿带（历史与公共空间主轴，9km全线贯通）
      │
    AI原点社区 ── 近校生态原点核（中）── 五道口 · 全球十大创新区
      │
    大钟寺 ── 城市型AI原生新业态核（南）── 古钟博物馆 · 国际交流中心
      │
  西翼：中关村科技服务翼        东翼：小月河场景赋能翼
```

"Jing-Zhang" does not add new red lines, but translates the three-layer approach into a spatial axis: with the Jing-Zhang Heritage Park as the backbone for historical memory and public life, the three key areas serve as functional nuclei on the spine, while the wings facilitate the flow of elements and the diffusion of scenes. The blue-green slow-moving composite loop weaves the scattered scenes into a network. Spatial evidence can be found in [data:geometry/green_space.geojson#GREEN-001], [data:geometry/land_use.geojson#LU-001], and [data:geometry/phasing.geojson#PHASE-001].

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Industrial Judgment

Haidian District is the district with the highest density of AI companies in current China: over 2,000 AI enterprises, 26 unicorns, 130 registered large models, an AI core industry scale of over 350 billion yuan (accounting for about 30% of the national total), 135 AI2000 global top scholars (accounting for 34% of the national total), and 31 AI100 young pioneers (accounting for 47%) [source:SRC-HAIDIAN-AI-INDUSTRY]. According to the Municipal Science and Technology Commission: along the Innovation Belt, the number of enterprises, revenue scale, and financing volume account for over 70% of Haidian District, with talent composition exceeding 80%; the industrial space is nearly 1 million square meters, with an available and updatable area of about 100,000 square meters [source:SRC-BJ-KW-3AREAS-2WINGS].

This plan makes a judgment on the industrial assessment of the Coordinated Research Area: **the Innovation Belt does not need to create another "industrial park," but rather to transform the "track" into an "AI Track"** —— converting the spirit of independent innovation carried by the Jing-Zhang Railway into an organizational form of elements for the AI era. The three key areas form a complete loop: Zhongzhiyuan bears full-stack independent innovation (computing power, algorithms, data, models), the AI Origin community bears the source and ecosystem (universities, open-source, talent), Dazhongsi bears scenarios and new business forms (intelligent bodies, intelligent terminals, content consumption), with the two wings respectively receiving element allocation (West Wing: capital and IP) and scenario diffusion (East Wing: embodied intelligence, AI+ healthcare, AI+ film and television).

### Naming and Visual Identity Direction (agent.1)

![Jing-Zhang Zhi Mai Logo Concept (Qinglong Bridge Zigzag Alignment × Circuit Pad)](assets/logo-jz-aivs.png)

- **Main Name**: Jing-Zhang AI Vital Spine (Jing-Zhang Intelligent Neural Spine, abbreviated JZ-AIVS). "AI Vital Spine" is a play on "railway artery" and "AI neural network": the tracks are the nervous system of the industrial age, while the computational tracks are the blood vessels of the intelligent age.
- **Naming System**:
One Belt = Jing-Zhang Intelligence Vein;
Three Cores = Wisdom Core (Zhongzhiyuan), Origin Core (AI Origin Community), New Business Core (Dazhongsi);
Two Wings = Service Wing (Zhongguancun Technology Services Wing), Scenario Wing (Xiaoyue River Scenario Enablement Wing);
Nodes = AI Touchpoints (AI Touchpoints).
- **Logo Direction (Concept Art Already Developed, SVG/PNG Available at `assets/logo-jz-aivs.svg/.png`)**: The core symbol is centered around the "person" character in the Qinglong Bridge "person" character track layout — the "person" character represents both the engineering soul of the Jing-Zhang Railway (1905-1909 self-innovative construction) and the "people-oriented" AI governance philosophy. **Rail as Track**: The green "person" character track line has three endpoints representing circuit pads (start=old/finish=new/convergence=self-innovative construction), with the apex extending upwards to connect to the future, forming a compound quality of "rail and calculation." Visual Theme = rail gauge (1435mm standard gauge) + circuit board trace texture.
- **Implementation Boundaries**: The above are Conceptual Recommendations and further development directions. Unauthorized use is not permitted for any third-party fonts, trademarks, individuals, or company logos [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][depth:overall_spatial_structure].

### Global AI Innovation Ecosystem Case Examples (agent.2, 6 Readable Abstracts)

| # | Case Study | Lessons to Draw | Adaptation to This Proposal |
| --- | --- | --- | --- |
| 1 | Boston Kendall Square (MIT Near-Campus Innovation District) | University-Powered → Capital → Enterprise Near-Campus Loop | Direct Reference for the "Near-Campus" Positioning of AI Origin Community |
| 2 | Singapore One-North Wee One North Tech City | Full Stack Ecology + Public Space Integration | Public Space Organization in the Zhongzhiyuan Full Stack Acceleration Area |
| 3 | London King's Cross (Railway Heritage Revitalization) | Abandoned Railway Station → Knowledge Economy District | Jing-Zhang Heritage Park Side Update Strategy |
| 4 | Silicon Valley Sand Hill Road Venture Corridor | aggregation "wing" of capital elements | The logical configuration of the elements in the Zhongguancun Technology Services Wing |
| 5 | Shenzhen Nanshan High-Tech Park | Market-oriented Urban-Industry Integration | The update model for the Dazhongsi urban-type block |
| 6 | Tokyo Shinagawa/Shibuya TOD Innovation Hub | Integrated Station and City | Zhongzhiyuan Track Micro-Center and Dazhongsi Metro Integration |

The above cases are public common references, used for experience transformation, and do not constitute a commitment to any enterprise or project [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][metric:ai_ecosystem_case_count].

### Regional Synergy and Larger-Scale Innovation Networks (agent.2 Deepen)

This scheme defines the relationship between the Innovation Belt and the broader scale innovation network outside the Coordinated Research Area (43.6 km²) (Conceptual Recommendation, mechanisms to be refined by the relevant authorities).

- **Collaboration with the Internal Innovation Hub of Haidian**: Beixinwei Community (ZPark North, part of the Zhongguancun Science City) provides future industrial spaces and research and development support. The innovation belt extends northward with "railway micro-centers + greenway vitality axes" (the heritage park is planned to extend to HouShanCun Road, over 13 kilometers [source:SRC-HERITAGE-PARK-PLAN]); the park areas along the belt, including Dongsheng Science Park and Tsinghua Science Park, are included in the "area collaboration" framework.
- **Collaboration with "Three Cities and One Zone"**: Future Science City (Changping) will take on pilot production and advanced manufacturing, while Huairou Science City will provide support for large-scale scientific facilities and basic research. The Innovation Corridor will participate in this collaboration through a relay chain of "university innovation source (Tsinghua/PEKing///) → Zhongguancun technology transfer → amplification in science city," thereby avoiding redundant construction.
- **Collaboration with the Economic and Technological Development Zone**: The intelligent networking and high-end manufacturing experience from the Beijing Economic and Technological Development Zone (Yizhuang) can inform and enhance the testing standards and Scenario Access mechanisms (conceptual direction) of the Jiaoyehe Embodied Intelligent Testing Field (S2).
- **Jing-Jin-Ji Synergy**: Leverage the Jing-Zhang High-Speed Railway (Beijing North-Zhangjiakou) and the Jing-Zhang Railway heritage to explore cooperation mechanisms for synergy in energy for computing power and the open-source ecosystem with the Zhangjiakou Renewable Energy Demonstration Zone and the Xiongan New Area; no new red lines are added, and no reference is made to a determined government arrangement [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

The above collaborative relationships are suggested mechanisms and directions for deepening; the specifics shall be based on the Jingjinji Coordination Development Plan and Haidian District's industrial policies.

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Spatial Structure and Land-Use Layout

Overall Design Area (11.4 km²) is centered around the Jing-Zhang Heritage Park Vital Green Belt, forming a "one axis, three cores, two wings, and blue-green double ring" structure [depth:overall_spatial_structure][depth:land_use_layout]:

- **Axis**: Jing-Zhang Heritage Park Vital Green Belt ([data:geometry/green_space.geojson#GREEN-001], a conceptual corridor with a design width of approximately 300-400 meters, to be fully connected by August 2026 [source:SRC-HERITAGE-PARK-PHASE2]).
- **Three Cores**: Three key areas (such as [data:geometry/key_areas.geojson#zhongzhiyuan_ai_acceleration_area]), with a calculated area of 3,692,893 m² [metric:key_area_area_sqm].
- **Wings**: The west wing, known as the Service Wing, follows the organizational elements along the existing urban road; the east wing, known as the Scene Wing, organizes a riverside scene corridor along Xiao Yue River (the Xiao Yue River is approximately 6.4 kilometers long, with the riverside space construction scheduled to start in 2026 and an additional 110,000 square meters of green space to be added [source:SRC-XIAOYUEHE]).
- **Blue-Green Double Ring**: The Jing-Zhang Green Belt ([data:geometry/green_space.geojson#GREEN-001]) plus two east-west connectivity green corridors ([data:geometry/green_space.geojson#GREEN-003], [data:geometry/green_space.geojson#GREEN-004]) form a composite ring, weaving the three cores and two wings into a continuous network.

Land use classification follows the guidelines of the "Guidelines for Land and Sea Use Classification in Territorial Space Investigation, Planning, and Control" [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], generating a total of 18 land-use elements that cover the entire area without gaps (coverage ratio 0.999991 [metric:land_use_cover_ratio]): 838,349 m² for AI research and development land (0802), 2,690,538 m² for park and green spaces (1401), 711,257 m² for protective green spaces (1402), 383,583 m² for commercial and service land (05), 229,512 m² for cultural land (0803), and 6,559,559 m² for residential land (0701). The combined green spaces and open spaces total 3,401,796 m², with a green space ratio of approximately 29.8% [metric:green_ratio][metric:green_space_area_sqm].

### Urban Renewal Overall Framework (Demolish–Renovate–Retain Strategy)

This plan adheres to the updating logic of "**retaining and rectifying as the main approach, renovating and improving as a secondary approach, and prudently incorporating new facilities**" [depth:retain_renovate_demolish]:

- **Preserve**: existing residential and community areas, higher education institutions and academies, historic parks and cultural relics (the Dazhongsi Ancient Bell Museum is a Qing Dynasty building from 1733 [source:SRC-DAZHONGSI-MUSEUM]), as well as the existing built-up sections of industrial parks (such as the Zhongzhiyuan project itself, which is under construction for renewal).
- **Renovation**: After the closure of the Lanjingli Jiali Dazhongsi Home Plaza, it was renovated into an "International Exchange Center" (with an additional building area of approximately 13,569.978 square meters and expected to attract social investment of about 48.8 billion yuan, making it the city's first municipal indicator-supported Urban Renewal project) [source:SRC-DAZHONGSI-RENEWAL]; the surrounding streets of the Origin Tower were updated as part of the "Ignite Plan" [source:SRC-AI-ORIGIN-COMMUNITY].
- **New Construction:** Three areas within the focus zones for AI research and development, incubation, and cultural display (216 design elements in the submitted buildings layer, totaling 223,349 m² [metric:building_footprint_area_sqm] of Building Footprint), all of which are Conceptual Recommendations and do not include site-level renovation conclusions.
- **No Demolition and No New Construction**: This plan does not propose any legal conclusions for demolition or new construction at the plot level; specific demolish–renovate–retain actions will be based on the control plan and implementation plan [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][depth:development_intensity_controls]. (Demolish–Renovate–Retain Strategy)

### Pending Confirmation Items for the Control Detailed Planning ([standard:MOHURD-CONTROL-DETAILED-PLANNING])

Floor Area Ratio, Building Height, Building Coverage Ratio, green space ratio, and setback distances are missing from the statutory indicators in the publicly available materials [source:PROCESSED-FACT-PACK]. This plan marks them as unknown in the [metric:floor_area_ratio] and [metric:building_height_m], to be recalculated after the official control plan conditions are supplemented [depth:development_intensity_controls][depth:height_massing_character][assumption:A-CONTROLS-001].

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

## Detailed Design of Key Areas

### Zhongzhiyuan AI Independent Innovation Acceleration Area (approximately 192.1 hectares, North Core)

**Location**: AI full-stack independent innovation "nuclear explosive point" [source:SRC-HAIDIAN-3AREAS-2WINGS]. The anchor point is Zhongzhiyuan, part of the Zhongguancun Dongsheng Science and Technology Park (originally named Xuebeiyuan, both names refer to the same project, with a total floor area of approximately 238,300 square meters): located at the northern end of Xueyuan Road in Dongsheng Town, north of the North Fifth Ring Road at Qingqiao Bridge, east of the Jingzhang Expressway, and south of Yuequan Road. The underground of the park is connected to Xuezhikyuan Station on the Changping Line of the Beijing subway (one of the first batch of track micro-centers in Beijing), with the park ready to open by July 2026; the western side of the park is home to the under-construction new headquarters of Tencent Beijing (approximately 460,000 square meters, as reported by official sources) [source:SRC-ZHONGZHIYUAN].

**Spatial Structure**: "One Station, One Axis, One Garden" —— the Xuezhiyuan Track Micro-Center serves as the gateway node, with the east-west Innovation Axis connecting the park to the Jing-Zhang Greenway, while Zhongzhiyuan is the full-stack innovation hub.

**Design Actions** (Conceptual Recommendation): 1. Organize TOD connections and Public Space around the track micro-center (refer to [data:geometry/roads.geojson#ROAD-006]); 2. Research and development land use (0802) dominates the area, with accompanying industrial services and commerce (05) and talent residential areas (0701); 3. Set up the "Qinglong Bridge Zigzag Plaza" as a public node (refer to [data:geometry/public_space.geojson#PUBLIC-001]); 4. Reserve space on the west side for functional coordination with Tencent's new headquarters (conceptual direction, not involving corporate commitment) [depth:three_key_area_detailed_design].

**Industrial Heritage AI Activation —— "Welding Tracks × Algorithm" Innovation Workshop** (Conceptual Recommendation): The complete preservation of the industrial relics from the rail welding factory in the second phase of the park (steel tracks, bridges, and other original industrial components) can be transformed into an "Welding Tracks × Algorithm" Innovation Workshop —— with "from welding railway tracks to welding models" as the narrative thread. The heavy industrial manufacturing techniques can be analogized to AI model training, fine-tuning, and alignment. The preserved old railway tracks and welding equipment can serve as spatial themes, with AI open-source collaborative workstations, model evaluation laboratories, and industrial heritage tour routes integrated into the space. This forms an activation experience node for heritage [source:SRC-HERITAGE-PARK-PHASE2]. This is a conceptual recommendation, and the specific renovation plan must be approved by the cultural relics and planning authorities.

**AI Scenario**: Full-stack AI Acceleration (open-source collaborative testing ground for computing power, algorithms, data, and models), intelligent shuttle services for track micro-centers, and AI enterprise service Copilot ([scenario:enterprise-service-copilot]).

**Implementation Risks**: The acceleration zone is an ongoing update project. The plan supplements Public Space and connectivity from the perspective of "neighborhood synergy," without altering the statutory implementation content of the park. The precise interface for connecting the rail station with the park remains to be confirmed by the engineering drawings.

### Beijing AI Origin Community (approximately 104.3 hectares, Zhonghuan)

**Location**: School-adjacent Artificial Intelligence Innovation District. Starting from the Original Point Building (formerly Dongsheng Building), it spans approximately 3 square kilometers: it hosts 439 enterprises, with over 7,000 people commuting daily, and hosts over 120 events annually; it was selected as one of the first "Global Top Ten Innovation Districts" in 2025. It is centered around the original innovation founts around Tsinghua University, Peking University, and the Chinese Academy of Sciences, creating a "Near-School Innovation Ecosystem" within a one-kilometer radius of the universities [source:SRC-AI-ORIGIN-COMMUNITY][source:SRC-HAIDIAN-3AREAS-2WINGS].

**Spatial Structure**: "AI Origin Memorial Square + Innovation Alleys + University Collaboration" —— An "AI Origin Memorial Square" is set in front of the AI Origin Tower ([data:geometry/public_space.geojson#PUBLIC-002]), preserving the scale and texture of the Wudaokou district. The alleys are connected to the campuses of Tsinghua and Peking Universities through pedestrian corridors.

**Design Actions** (Conceptual Recommendation): 1. Cultural land use (0803) to carry AI cultural origins and public cultural functions; 2. Mixed layout of incubators and talent apartments (e.g., [data:geometry/buildings.geojson#BLDG-101]); 3. Community services (0702) and business and service industries (05) to support 24-hour vitality; 4. Operational activities under the "Ignite Plan" (over 120 events annually) to form a synergistic relationship with Public Spaces [source:SRC-AI-ORIGIN-COMMUNITY][depth:three_key_area_detailed_design].

**AI Scenario**: AI+Education (university campus within one kilometer), AI in Government and Public Governance Pilot (community services), Developer Honor Wall ([scenario:ai-cultural-guide]).

**Implementation Risks**: The Origin Community lacks physical boundaries and involves cross-block coordination. This proposal is a Conceptual Recommendation and does not replace the existing block update plan.

### Dazhongsi AI Industry Agglomeration Zone (approximately 72.0 hectares, South Core)

**Location**: Urban-type Artificial Intelligence Innovation District, focusing on the development of AI-Native and AI+ integrated new business forms such as intelligent bodies, intelligent terminals, and content consumption [source:SRC-HAIDIAN-3AREAS-2WINGS].

**Spatial Structure**: "Ancient Bell, New Voice" —— with the Dazhongsi Ancient Bell Museum (Jueshengsi) serving as the cultural anchor [source:SRC-DAZHONGSI-MUSEUM], the renovation of the "International Exchange Center" by Blue Scene LiJia serves as the industrial anchor [source:SRC-DAZHONGSI-RENEWAL], and the integration of Dazhongsi subway station with pedestrian connectivity through the four quadrants at the intersection serve as the transportation anchor. **Policy Anchoring**: The Blue Scene LiJia project is the **first Urban Renewal project in the city to be approved with a municipal building scale indicator (6,784 sqm)**, adding a total building scale of 13,569 sqm and expected to attract approximately 4.88 billion yuan in social investment. The project adopts a "government-led + private capital participation + land auction" model, and upon completion, it will form a cluster of three centers for scientific and technological innovation exchanges with the Fangheng Plaza and Zhongkun Plaza [source:SRC-DAZHONGSI-LANJINGLIJIA].

**Design Actions** (Conceptual Recommendation): 1. AI-Native New Business (05) and AI Application R&D Testing (0802) as dual main drivers; 2. Set up an "AI Scene Experience Plaza" ([data:geometry/public_space.geojson#PUBLIC-003]); 3. Optimize the integrated plan for Dazhongsi Metro Station and quadrants walking connection ([data:geometry/roads.geojson#ROAD-008]); 4. Install an "AI Chime Soundscapes Installation" (conceptual landmark) between the Ancient Bell Museum and the Blue Scene Lijia Transformation Area, combining ancient bell acoustics with AI-generated music—site selection located in the public pedestrian corridor between the cultural anchor point (Ancient Bell Museum) and the industrial anchor point (International Exchange Center), reinforcing the spatial narrative continuity of "Ancient Bells in New Sounds" [depth:three_key_area_detailed_design].

**AI Scenario**: Smart Agent Content Consumption District, AI+ Film/Content Production Testing, Robot Low-Speed Delivery ([scenario:robot-delivery-low-speed]).

**Implementation Risks**: The International Exchange Center is an approved municipal indicator update project (2026-08). This plan supplements Public Space and scenarios from a surrounding coordination perspective, without interfering with the statutory update content.

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### Eight user persona categories (agent.3, a total of 8 categories [metric:user_persona_count])

| # | Profile | Features | Space Requirements |
| --- | --- | --- | --- |
| P1 | AI Entrepreneurs/Developers | Ages 25-40, active in open-source communities, commuting between cities | 24-hour incubation space, test track, rail transit connection, affordable housing |
| P2 | College Students | Ages 18-30, Tsinghua/Northwestern/Peking/Beihang Universities | Near-school walkable, affordable dining, shared workstations, club activity spaces |
| P3 | AI Company Employees | Ages 25-45, from Established and Innovative Companies | Work-Life Balance, Greenway Walkways, Talent Apartments, Life Services |
| P4 | International AI Talent/Visiting Scholars | 30-50 years old, Short-term Residency | Internationalized Services, Bilingual Guiding, Honor Display, Cultural Exchange |
| P5 | Surrounding Community Residents | All Ages | Park Green Spaces, Public Spaces, AI Convenience Services, Soundscape and Cultural Activities |
| P6 | Children and Youth | Ages 0-17, visiting with parents or living nearby | Safe Slow-Travel School Routes, No-Power Playgrounds, Nature Education, Parent-Child Friendly Facilities |
| P7 | Seniors | 60 years and above, resident in the surrounding community | Barrier-free resting points, anti-slip lighting, community dining and health services, non-digital service alternatives |
| P8 | Persons with Disabilities, Caregivers, and Digital Vulnerable Groups | Visually Impaired/Audio Impaired/Mobility Impaired; Low-income or Non-smart Terminal Users | Fully Accessible Pathways, Multimodal Guidance (Voice, Large Text, Tactile), Manual Service Windows, Non-AI Alternative Channels |

### Public Interest and Inclusivity Design (agent.3 deepens)

This plan explicitly covers three additional categories of public service objects, P6-P8, beyond the five core profiles. It is based on the principle of "**dual tracks of digital and human services**":

- **Barriers-Free Verifiable Indicators (Conceptual Recommendation)**: Establish barriers-free slow-moving standards along the Jing-Zhang Greenway and at three key areas—main corridor with a maximum slope of ≤2.5%, rest stops spaced ≤300m apart, at least one voice, large print, and tactile guidance path in each key area, and fall-prevention lighting and level transitions at critical nodes (specific details to be refined according to the barriers-free design standards and implementation plan [standard:MOHURD-URBAN-DESIGN-MEASURES]).
- **Child-Friendly**: Each focus area includes a child-safe slow zone for walking to school and a natural playground (Public Space component); AI navigation includes a parent-child mode.
- **Age-Friendly**: community dining halls, health services, and fall-prevention environments; all AI services retain human windows (mechanisms for "human takeover" are in place at S1-S10).
- **Digital Vulnerability Safety Net**: Residents who do not use smart terminals can receive telephone appointments, manual guidance, paper information, and community proxy services; AI services are not mandatory.
- **Public Space Service Radius**: Three AI Squares (totaling 106,418 m²) anchor the high-vitality interface of the key areas, featuring shade, resting areas, nighttime lighting, and community co-governance mechanisms; the 0.93% below the target for public space is carried by the continuous public spaces of a 9 km green belt (70 ha).

### Ten AI Scenario Cards (agent.3, among which S1-S3 are industrial Testing and Validation Scenarios)

| # | Scenario | Spatial Location | Service Target | Operational Data | Privacy Boundary | Human Review | Risk |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S1 | **AI Full-stack Acceleration Testing Field** (Industrial Testing) | Zhongzhiyuan | P1 | Computing Power Scheduling, Model Evaluation | Desensitized Data | Platform Review | Computing Power Cost |
| S2 | **Embodied Intelligence Public Testing Field** (Industrial Testing) | Xiao Yuehe Scenario Wing | P1/P3 | Motion Trajectories, Interaction Records | Public Place Anonymization | Testing Access Review | Safety |
| S3 | **AI+Healthcare Service Navigation** (Industrial Test) | Xiao Yuehe Scenario Wing/Original Point Community | P5 | Clinic Path, Wait Time | No Medical Data Collection | Medical Institution Review | Compliance |
| S4 | Near-School AI+ Education Ecosystem | Origin Community | P2 | Course/Lecture Reservation | Learning Data Minimization | School Involvement | Educational Ethics |
| S5 | Smart Body Content Consumption Street | Dazhongsi | P1/P4 | Consumer Preferences (Anonymized) | No Cross-Scenario Profiling | Operator Review | Recommendation Bias |
| S6 | Jing-Zhang Smart Vein AI Guided Tour and Cultural Narrative | Jing-Zhang Greenway | P4/P5/P2 | Tour Route, Duration of Stops | Localized Position Data | Cultural Expert Review | Historical Inaccuracies |
| S7 | AI Talent Apartment Smart Community | Around Three Cores | P1/P3 | Energy Consumption, Maintenance Reports | Resident Data Not Leaving the Community | Property Reconciliation | Privacy |
| S8 | Micro-Station Smart Shuttle | Zhongzhiyuan/Dazhongsi | P1/P3 | Passenger Flow, Shuttle Duration | No Biometric Data Collection | Transportation Department Review | Data Security |
| S9 | AI in Government and Public Governance Pilot | Origin Community | P5 | Request Classification and Processing Progress | Government Data Classification | Neighborhood Review | Algorithm Accountability |
| S10 | Developer Honor Wall and AI Pilgrimage Node | Jing-Zhang Greenway Three Nodes | P1/P4 | Contribution Record (Voluntary) | Honor Data Controlled by Individual | Community Committee | Reputation Controversy |

The above scenarios are Conceptual Recommendations and direction for operational mechanisms. The aspects involving actual operations, funding, and policies must be further developed by a professional team in collaboration with the relevant authorities [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][metric:ai_scenario_card_count].

### AI Ecological Spectrum and Governance Mechanism (agent.2/agent.3 Deepened)

**AI Ecosystem Spectrum (Conceptual Direction)**: With "computing power-algorithm-data-model-universities-capital-scenarios" as seven types of element nodes, Zhongzhiyuan (computing power/model foundation), Origin Community (universities/open-source origin), and Dazhongsi (scenarios/new business models) as three types of organizational nodes, the wings represent the channels for element flow—forming an updatable spectrum of elements-nodes-channels (the spectrum data is based on publicly available industrial data and is not a corporate commitment).

**Data Flow and Responsibility Flow Architecture**: Each scenario (S1-S10) is registered according to a five-stage data flow process of "collection-desensitization-storage-use-deletion," with the responsible party being the scenario operator, subject to supervision by industry authorities and street-level oversight. Scenarios involving medical and governmental data (S3/S9) ensure that data does not leave the statutory system boundary.

**Scenographic Entry and Exit Mechanism**: Scenes are managed in a tri-state model of "Trial - Evaluation - Formalization/Exit" —— new scenes must undergo a pre-review of safety, privacy, and ethics before entering the trial phase; during the operational period, they are evaluated quarterly on usability, fairness, privacy compliance, and energy consumption. Scenes that fail to meet the criteria for two consecutive quarters or experience a major accident will be exited and manually taken over.

**Evaluation Criteria and Failure Degradation**: Each AI scenario is quantifiable.KPI(service volume, accuracy rate, response duration, human takeover rate); when service anomalies occur or safety thresholds are triggered, automatically degrade to manual service (S1-S10 Preserve the pedestrian pathways, and issue an accident report.

**Inter-subject Governance Protocol (Conceptual Recommendation)**: A "Jing-Zhang Smart Vein Scenario Governance Committee," led by the Haidian District principal authority and comprising representatives from operators, universities, communities, and an independent auditing institution, is responsible for scenario admission approval, dispute arbitration, data auditing, and annual performance evaluation disclosure. All mechanisms are conceptual recommendations and must be refined by a professional team and the principal authority [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][depth:risk_missing_data].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land-Use Layout is shown in [data:geometry/land_use.geojson] (18 elements fully covered) [depth:land_use_layout]. The proportion of industrial functions (based on recalculated area): Research and Development (0802) accounts for 7.3%, Business and Services (05) accounts for 3.4%, Culture (0803) accounts for 2.0%, Residential (0701) accounts for 57.5%, and Green Spaces (1401+1402) accounts for 29.8%. The Building Footprint totals 223,349 m² [metric:building_footprint_area_sqm], distributed across three key areas (such as [data:geometry/buildings.geojson#BLDG-001]), all of which are Conceptual Recommendations, without including plot-level statutory demolition and renovation conclusions [depth:retain_renovate_demolish]. Building Height, Massing, and Visual Character Control Direction: Control low to mid-rise heights along the Jing-Zhang Greenway to maintain sightlines to the site (Conceptual Recommendation), with specific heights to be determined by the control plan and constraints from the airport, cultural heritage, and landscape [depth:height_massing_character][metric:building_height_m].

## Transport, Rail, Municipal Infrastructure, and Public Services

**Roads and Active Transportation:** Submit 8 road centerlines ([data:geometry/roads.geojson]), with the Jing-Zhang Railway Old Line Site Belt registered as an existing constraint at [data:geometry/constraints.geojson#CON-001], totaling 22,004 m ([metric:road_length_m]): Jing-Zhang Greenway's primary bi-directional pedestrian and bicycle corridors (greenway, corresponding to the official "north-south through pedestrian and cycling path" requirement [source:OFFICIAL-ANNOUNCEMENT]) on both sides of the Jing-Zhang Greenway, three key areas with secondary east-west secondary roads, and three transit connection lines (transit_connection, with station locations as conceptual assumptions). Active transportation gaps and barrier-free paths will be deepened according to the [scenario:ai-traffic-walkability] evaluation direction ([depth:traffic_rail_slow_parking]).

**"Track AI Lab"** —— **Old Line AI Experience Corridor** (Conceptual Recommendation): The approximately 2.4 kilometers of century-old railway track that was restored in Phase II of the park [source:SRC-HERITAGE-PARK-PHASE2] can be transformed into a fourth "AI Experience Path" outside of the "Three Paths and One Green" slow travel system: Lightweight AI interaction nodes can be installed along the old tracks (historical knowledge quizzes, AR historical scene overlays, soundscapes storytelling, AI-generated poetry/music in dialogue with the Jing-Zhang history), forming an immersive corridor where one can "Experience Future AI on a Century-Old Track." Youth innovation and entrepreneurship markets can organize "AI Demo Day" results exhibitions during fixed weekly periods (such as Saturdays), converting the park's physical space into a daily carrier of AI innovation culture. All of this is a conceptual recommendation that does not alter the park's legal purpose or management ownership [depth:traffic_rail_slow_parking]. (Walking and Cycling Network)

**Transport and Integration**: Zhongzhiyuan relies on the track micro-center at Xizhiyuan Station on the Changping Line [source:SRC-ZHONGZHIYUAN]; Dazhongsi benefits from integrated metro station connections and four-quadrant pedestrian connectivity [source:SRC-HAIDIAN-3AREAS-2WINGS]; the Jing-Zhang High-Speed Rail entry segment (Tsinghua Yuan Tunnel) does not affect the ground-level pedestrian continuity [source:SRC-JINGZHANG-HSR].

**Urban Infrastructure and New Infrastructure** (Concept Direction): Integration of distributed energy and edge-side computing, smart street poles and perception networks along green belts, robotic low-speed delivery channels ([scenario:robot-delivery-low-speed]), and integrated municipal pipelines and track micro-centers. Specific urban infrastructure elements await confirmation of master planning and engineering conditions [depth:municipal_new_infrastructure][depth:development_intensity_controls].

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## Blue-Green Space, Public Space, and Urban Character ([depth:blue_green_public_space])

**Blue-Green System**: With the Jing-Zhang Heritage Site Park vitality green belt as the spine (total length of approximately 9 kilometers [metric:heritage_belt_length_m], 70 hectares, 46 entrances and exits, cycling takes about 40 minutes [source:SRC-HERITAGE-PARK-PLAN][source:SRC-HERITAGE-PARK-PHASE2]), and the Xiao Yue River waterfront space as the eastern wing scene corridor (6.4 kilometers, additional green space of 110,000 square meters [source:SRC-XIAOYUEHE]), two east-west connecting green corridors are added to form a composite loop ([data:geometry/green_space.geojson#GREEN-001] to [data:geometry/green_space.geojson#GREEN-004]). The green space ratio is approximately 29.8% [metric:green_ratio].

**Public Space**: Three AI public squares (totaling 106,418 m², accounting for 0.9% of the entire area [metric:public_space_ratio]): Zhongzhiyuan "Qinglongqiao Dragon Scale Square", AI Origin Community "AI Origin Memorial Square", and Dazhongsi "AI Scene Experience Square" ([data:geometry/public_space.geojson#PUBLIC-001/002/003]).

**Three AI Holy Sites (agent.4)**:

1. **Qinglongqiao Renziwen Square** (Zhongzhiyuan·Xuezhiyuan Track Micro-Center): Inspired by the "ren" character shape, this plaza pays tribute to Zhan Tianyou's independent innovation. It serves as a portal landmark and a hub for full-stack innovation.
2. **AI Origin Monument** (at the AI Origin Community · AI Origin Building): Dedicated to the narrative anchor of being selected as one of the global top ten innovation districts [source:SRC-AI-ORIGIN-COMMUNITY], commemorating the inception moment of the Haidian AI industry, featuring a Developers Honor Wall (S10).
3. **Dazhongsi AI Chime Soundscapes Installation** (next to the Ancient Bells Museum): Integrating the acoustics of ancient bells with AI-generated music to form a cultural landmark known as the "New Sounds of Ancient Bells," echoing the conceptual framework of AI content creation akin to a "Song of Dishes."

The above landmarks are concept suggestions; no third-party fonts, images, trademarks, individuals, or company logos are to be used without authorization; they are not expressed as approved for construction [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][metric:ai_pilgrimage_landmark_count]. (Conceptual Recommendation)

**Cultural Narrative (agent.5) ——"Three Times of Autonomous Innovation"**: The first time was in 1905-1909 when Zhan Tianyou led the construction of the Jing-Zhang Railway, breaking the foreign assertion with the "person" shaped alignment [source:SRC-JINGZHANG-HISTORY]; the second time was in the 1980s when Zhongguancun transitioned from "Electronic Street" to technological self-reliance; the third time is in 2026 when the AI Innovation Belt transforms the "track" into "computational track," with Haidian standing at the forefront of global AI, boasting over 2,000 AI companies and 130 registered large models [source:SRC-HAIDIAN-AI-INDUSTRY]. This narrative line fuses railway heritage, Zhongguancun memories, and new AI culture into a walkable "time track."

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

## Renewal Projects, Implementation Policy, and Phasing

### Update project list (Conceptual Recommendation, [depth:renewal_project_list], phasing see [depth:phasing_implementation])

| # | Project | Type | Responsible Entity Type | Prerequisites | Time Window | Cost Level | Phases |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Zhongzhiyuan Opening Operations and District Coordination | Under Construction/Operation | Park Operator + Local Street | Opened in July 2026 [source:SRC-ZHONGZHIYUAN] | 2026-2027 | Currently Under Construction | Near Term |
| R2 | Origin Community Ignition Plan and Square Illumination | Update/Operation | Community Operator + Street | Initiated [source:SRC-AI-ORIGIN-COMMUNITY] | 2026-2027 | China | Near Term |
| R3 | Blue Vision Li Jia → International Exchange Center | Demolition and Reconstruction (Public Notice) | Project Main Body + Planning and Natural Resources Department | Municipal Indicators Support [source:SRC-DAZHONGSI-RENEWAL] | 2026-2028 | High | Near Term |
| R4 | Jing-Zhang Greenway AI Guided Tour and Pilgrimage Nodes | New (Concept) | Park Management Authority + Cultural Institution | Phase II Already Connected [source:SRC-HERITAGE-PARK-PHASE2] | 2026-2028 | Medium | Near Term |
| R5 | Xiao Yue River Waterfront AI Scenario Segment | New (Conceptual) | Water Department + Local Street | Waterfront construction has commenced [source:SRC-XIAOYUEHE] | 2028-2030 | Medium | Mid-term |
| R6 | Dazhongsi Metro Integration and Quadrant Connectivity | Transformation (Concept) | Track Construction Authority + Transportation Department | Track Plan Confirmation | 2028-2030 | High | Mid-term |
| R7 | AI Talent Apartments and Smart Community | New (Concept) | Development and Operations Entity + Housing and Urban-Rural Development Department | Plan Conditions Confirmation | 2028-2030 | High | Mid-term |
| R8 | Coherent Urban Fabric and Extension to the North | Enhancement (Concept) | Regeneration and Self-Planning Department + Local Street | Long-Term Planning [source:SRC-HERITAGE-PARK-PLAN] | 2030-2035 | Medium | Long-Term |

**Implementation Mechanism (Conceptual Recommendation)**: Each project should have verifiable mechanisms.KPI(For example, R4 Greenway Tour: annual tour service volume, bilingual coverage, and accessibility rate; R2 Square Illumination: annual event sessions, community participation numbers, and services for digitally vulnerable populations); the project advances based on "responsible entity+prerequisite conditions+time window," with all being Conceptual Recommendations and not expressed as confirmed government arrangements or funding commitments. Major risks (funding, approval, public opinion) will trigger an assessment by the governance committee for adjustments or termination (exit mechanism, see AI governance mechanism). Community engagement: Each update project will have a public opinion consultation window, and detailed design in key areas must be refined after community review [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][depth:renewal_project_list].

### Phased Plan (agent.6)

- **Near Term (2026-2028) "Three Cores Illuminated"**: Zhongzhiyuan opens and operates, original point community activities ignite, and Dazhongsi updates commence; track connections and pilgrimage nodes are prioritized (see [data:geometry/phasing.geojson#PHASE-001], recalculated at 3,692,893 m²).
- **Mid-term (2028-2030) "Green Belt Throughway"**: Jing-Zhang Green Belt full-line operation + AI guided tour, Xiao Yuehe waterfront scenario segment, blue-green slow travel composite loop formed ([data:geometry/phasing.geojson#PHASE-002], recalculated 2,857,512 m²).
- **Long-Term (2030-2035) "All-District Intelligent Vein"**: district-wide landscape coordination, extending northward to connect (the heritage park is proposed to extend to Hou Fang Village Road, over 13 kilometers [source:SRC-HERITAGE-PARK-PLAN]) ([data:geometry/phasing.geojson#PHASE-003]).
- **Aligned Official Rhythm**: In alignment with the official press release, the **comprehensive planning integration will be completed by November 2026** [source:SRC-HERITAGE-PARK-PHASE2]; this scheme's phased plan is designed to align with the official integration rhythm, maintaining openness, adaptability, and replaceability during the integration period (provisional boundary replacements and indicator recalculation processes are detailed above).

### Global AI Innovation Ecosystem and Long-Term Operations (agent.6)

Conceptual Recommendation: **Annual "Jing-Zhang Smart Pulse Global AI Developer Conference"** (building on the foundation of over 120 events held annually at the Original Point Community [source:SRC-AI-ORIGIN-COMMUNITY]), developer honor wall and pilgrimage route (S10), Scenario Access operational mechanism (operated under the principle of "AI provides recommendations, humans make decisions" for S1-S10), and international promotion and attraction transformation (West Wing Capital/IP element allocation). All activities, recruitment, funding, policies, and operational arrangements are conceptual suggestions or areas for further development, not expressed as confirmed government arrangements [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

**Deepening of Operational Mechanisms (Conceptual Recommendation, Verifiable Direction)**:
- **Annual Activity Portfolio**: Host the Developer Conference as the annual flagship event (target: attending developers ≥ 5000, international guest speakers ≥ 20%, and open-source contribution submissions ≥ 2000, all target directions not guaranteed), in addition to quarterly themed competitions (embodied intelligence/open-source models/city AI scenarios), monthly community open days, and greenway cultural activities, forming a "flagship + regular + daily" three-tier activity system.
- **Developer Retention and Conversion Pathway**: The Developer Honor Wall(S10)records contributions and issues "Jing-Zhang Smart Vein Contribution Certificates"(digital badges, with honor data under individual control); establish a four-tier conversion funnel of "activity participation→community contribution→scenario pilot→enterprise implementation", KPI direction for annual number of converted enterprises and positions(specific targets set by the principal department and operators).
- **International Promotion and Attraction**: Leverage the Jing-Zhang High-Speed Railway and the narrative of its heritage to reach international developers and visiting scholars (P4) through bilingual content, international conference exhibitions, and the "AI Pilgrimage Route" (three landmarks). The attraction focus is on open-source communities, embodied intelligence, and content technology enterprises, all in accordance with public policies.
- **Brand Asset Management:** "Jing-Zhang Intelligence Vein (JZ-AIVS)" naming and visual identity are a Conceptual Recommendation. Brand asset registration and authorization rules will be implemented after the relevant authorities establish them. This plan does not pre-set any commercial authorization arrangements.

## Metrics, Area Recalculation, and Compliance Matrix

This scheme's metric system and recalculation results are detailed in `metrics.json` (16 metrics, among which 14 are known and 2 are pending confirmation), with key metrics in the main text as follows: [metric:site_area_sqm]=11,412,825 m², [metric:key_area_area_sqm]=3,692,893 m², [metric:green_ratio]=0.2981, [metric:public_space_ratio]=0.0093, [metric:building_footprint_area_sqm]=223,349 m², [metric:road_length_m]=22,004 m, [metric:land_use_cover_ratio]=0.999991. The design implications of the core metrics are as follows: a green space ratio of 29.8% supports the "high-quality urban district that global AI innovation talents aspire to" (meeting the demand for greenway walkability among talents); although the Public Space ratio is only 0.9%, three squares anchor high-energy interfaces in key areas (with incremental spaces being borne by greenways). Building Footprint 223,349 m² corresponds to the industrial space supply direction for the three cores (52 instances of duplicate footprints have been removed, resolving structured evidence conflicts) [depth:metrics_recalculation].

Compliance Coverage: `compliance_matrix.json` covers all design tasks for announcements 1.3/1.4/1.5, as well as the six intelligent agent tasks (agent.1-agent.6); `standard_matrix.json` covers six mandatory professional standards; `design_depth_matrix.json` covers all 15 required depth items, which are fully complete [depth:metrics_recalculation]. Area recalculation is based on EPSG:4548, with each formula and source item registered individually. A provisional boundary error of approximately 0.2% has been noted, and a full recalculation will be performed once the official polygons are released.

## Risk, Copyright, and Compliance

- **Legality of Documentation**: This plan uses only publicly official sources and repository clearance rights (see `sources.json`), and does not use secret maps or non-public tables; it does not adopt unverified information (such as rumors of corporate acquisitions of the Dazhongsi plot) [source:SOURCE-REGISTRY][charter.2].
- **Copyright**: This proposal is for community display purposes only (COMMUNITY-DISPLAY-ONLY); no third-party fonts, images, trademarks, or logos are authorized for use; see the generation methods and limitations in `report/copyright_statement.md`.
- **AI Generation Responsibility**: This proposal is generated by an AI agent based on publicly available information and the call for submissions, and it is part of an Open Co-Creation initiative. It does not replace professional planning nor bypass government review and statutory approval [charter.3][charter.7].
- **Privacy**: The operational data involved in the scenario cards are handled with de-identification, anonymization, and minimization principles, and do not collect biometric or medical data [charter.10].
- **Additional Information**: Official Boundary polygon, control plan indicators (FAR, height, density, setback), road red line, ownership, municipal utility lines, and current building stock (missing lists can be found in `assumptions.json` and `data/processed/missing_data_checklist.csv`)[assumption:A-CONTROLS-001][depth:risk_missing_data].
- **Professional Review Requirements**: This scheme's spatial structure, indicators, and drawings must be reviewed by a team of urban planning, transportation, and municipal professionals before entering any statutory or implementation procedures [standard:MOHURD-URBAN-DESIGN-MEASURES][standard:MOHURD-ARCH-DESIGN-DEPTH-2016][depth:risk_missing_data].

## References (evidence traceback: all citations registered in [source:SITE-PACKAGE] and [source:SOURCE-REGISTRY])

All machine-readable evidence for this plan is verifiable from layers such as [data:geometry/site_boundary.geojson#SITE-001] and [metric:site_area_sqm], etc.

- `brief/site-package/design_brief.json`, `agent_taskbook.json`, `allowed_design_space.json`, `sources.json`
- `brief/site-package/standards/standards.json` and `references/` local snapshot
- `brief/site-package/geometry/provisional_boundaries.geojson`
- `data/source_registry.json`, `data/processed/agent_fact_pack.md`
- All publicly official sources registered in `sources.json` (such as the Municipal Commission of Planning and Natural Resources, Haidian District Government, Municipal Commission of Science and Technology, China Railway Corporation, Questo Network, People's Network, Science and Technology Daily, etc.)
- `brief/site-package/schemas/*.json`
