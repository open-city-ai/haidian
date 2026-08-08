---
title: "Jing-Zhang Centennial Memory Walkway: A Path of Nine Stations · Stars Supporting —— Technology Bridging to the People Over a Century"
author_github: "gymaira1990-jpg"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With the backbone of the national five-year plan and key historical milestones, organize the Jing-Zhang Railway Heritage Park and the surrounding areas into a 'Path of Technology to the People' century-long memory corridor: one corridor with nine stations that carry the history of Chinese independent innovation, activate distributed memory nodes to form a star network of existing cultural facilities, and converge at the cultural center as an 'AI + Urban Archive'; use the stamp passport as the data bus, and with an open platform, allow continuous residency of AI service ecosystems, achieving a historical and cultural city corridor that is written by everyone, used by everyone, and capable of growth and evolution."
tracks: ["jingzhang-heritage-narrative", "youth-friendly-public-space", "civic-agent-governance"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "enterprise-service-copilot"]
iteration: "v0.1"
---

# Jing-Zhang Centennial Memory Walkway: A Path of Nine Stations · Stars Supporting —— Technology Bridging to the People Over a Century

> This scheme is an Open Co-Creation Conceptual Recommendation for a global intelligent community. All spatial design suggestions are provided as **conceptual recommendations/reference proposals/for further in-depth study by professional teams**, and do not constitute government approval conclusions, nor do they replace statutory planning and approval processes.

## Design Basis and Source List

This plan strictly follows the publicly available/rights-reserved materials listed below, all of which are registered in `sources.json`. The scope of data usage is governed by `data/source_registry.json` (distinguishing between formal-ready, background, and provisional sources) [source:SOURCE-REGISTRY].

- [source:OFFICIAL-ANNOUNCEMENT] Qualification Pre-Review Announcement for International Proposals of the Centennial Jing-Zhang AI Innovation Belt Urban Design (Haidian Branch of Beijing Municipal Commission of Planning and Natural Resources, May 9, 2026): Three Levels of Scope, Three Key Areas, and Main Control Basis for Design Tasks and Results Depth.
- [source:AGENT-TASKBOOK] Excerpt from the Task Book for the Open Call for Urban Design of the Centennial Jing-Zhang AI Innovation Belt (provided by the user): Ten Co-Creation Principles, Three Positionings, Five Functions, Three Zones and Two Wings, Six Tasks for Intelligent Agents, Uniform Evaluation Criteria, and Uniform Boundary Clauses. (Centennial Jing-Zhang AI Innovation Belt Open Call for Urban Design)
- [source:BOUNDARY-SOURCE] / [source:KEY-AREA-SOURCE]: Provisional boundaries for three layers and three key areas (EPSG:4326; area recalculated in EPSG:4548 with an approximate area deviation of ≤0.43%).
- [source:SITE-PACKAGE]: Design Brief, Land Classification, Allowed Design Space, Indicator Ranges, List of Mandatory Standards.
- [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION]: see `standard_matrix.json`.
- Supplemental factual references: the Jing-Zhang Railway's 1909 operational history, the 863 Program's initiation in 1986, China's internet access history in 1994, the development history of Zhongguancun from 1988/1999, the New Generation Artificial Intelligence Development Plan of 2017, and the "AI+" action plan of 2025 (State Council General Office Document No. 11 of 2025), all come from authoritative public reports and historical records. These are used for cultural narratives and case arguments, not for any legal boundary or planning control conclusions.

**Handling Documentation**: The fact pack and missing list provided by the repository (source: [source:PROCESSED-FACT-PACK]) serve as a reference for task organization and gap identification. The current condition base map uses OSM public data (source: [source:OSM-PUBLIC-DATA], ODbL), which is provided for context only.

**Statement of Missing Data**: Official Planning Boundaries, control plan conditions, current building/ownership/municipal baseline data are currently not publicly available (see `brief/site-package/missing-data.md`). This scheme uses clearly marked provisional boundaries for concept generation, visualization, and design discussions; these should **not be considered as official planning boundaries**. Upon the release of official data, all layers and indicators must be recalculated according to `assumptions.json` A-CONTROLS-001. (Official Planning Boundary)

## Overview of the Proposal: Centennial Jing-Zhang Memory Corridor

This proposal presents an overall concept: **organizing the 9-kilometer Jing-Zhang Railway Heritage Park and the surrounding areas into a "century-long corridor of technological progress from the past to the present"**. It addresses not "what is built here", but "how, along this road, China gradually brought technology to the everyday lives of ordinary people".

### One of the Elements: Memory Loop — Culture is the Cyclical Engine of Urban Development

History, memory, and sedimentation form **depth**; depth supports the **development** of industry, technology, and AI; development brings employment, production, and civilized **life**; life in turn creates new **history**—a cycle that continues without end. This plan elevates culture from a "decorative layer" to become the **circular engine** of urban development:

```text
History·Memory·Deposited → Essence → Industry·Technology·AI → Development → Employment·Production·Civilization → Life → New History → (Cycle)
```

The corridor is not a one-time blueprint, but a **growing and evolving system of urban memory**: a new station is added every five years ([metric:corridor_station_count]), and every individual's memory is worth recording (everyone writes history), with each person entitled to AI service (everyone uses AI). [data:geometry/land_use.geojson#LU-CORRIDOR][metric:corridor_length_m]

### Second Essence: Technology Bringing Us Together for a Century

Examine the hidden main thread of this corridor:

- **1909 _df_Jing-Zhang_df_**——_Chinese_ _people_ _built_ _their_ _first_ _mainline_ _railway_ _independently_ (_[source:JZ-RAILWAY-HISTORY]_), _letting_ _ordinary_ _people_ _travel_ _far_ _for_ _the_ _first_ _time_ (breaking _the_ _bounds_ _of_ _space_);
- **1994 Internet Access in China**——Chinese Academy of Sciences 64K International Dedicated Line ([source:INTERNET-ORIGIN-1994]), allowing ordinary people to **connect to the world** (breaking down the barriers of information).
- **2026 "AI+" Era** —— In the present era of this project, it allows ordinary people to **possess intelligence** for the first time (breaking the barrier of capability).

Every technological revolution ultimately leads to the same direction—**accessible to every person**. The corridor records not only the nation's history of innovation but also the history of "technology coming to the people": from Zhan Tianyou's "standing tall on the earth," to Zhongguancun's "daring to be the first under heaven," to today's open-source AI that is available to everyone. [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][source:OFFICIAL-ANNOUNCEMENT]

**End=Beginning**: The "Memory Terminal" at the southern end of the corridor is not an endpoint—rather, it is a container for memory and the starting point for the next journey; the next stop is up to you to write.

### Four-story structure

1. **Physical Planning**: One corridor (Memory Long Corridor with 9 stations) + Many stars (Distributed Memory Waystations to activate existing facilities) + Anchors (End Cultural Pavilion "Memory Terminal").
2. **Model Development**: Stamp Passport (NFC/ Digital, Data Bus) + Activity System + Cultural Tourism Consumption Loop + **Starfire Open Platform** (defines territory/scenario/rules/data, does not define applications, with an AI service ecosystem continuously entering).
3. **Technical Foundation**: Urban Memory Bank (Distributed Collection → Central Settlement → Networked Services) + AI Integration (Guide/Companion/AR/Dialogue/Generation/Accessibility) + AI Real Experiment Field (Three Sites at Three Levels, Low-Speed Regulable and Verifiable).
4. **Spiritual Core**: Technology will eventually become ubiquitous for everyone; the endpoint is not the end, but the starting point for the next journey.

![Overview of the Proposal and Spatial Structure](assets/figures/site-overview.png)

## Three-Level Scope Framework

| Level | Area | Boundary (Annex Text) | Depth of Work for This Plan |
|------|------|----------------|---------------|
| Coordinated Research Area | 43.6 km² | North to the North Fifth Ring Road, East to the Jingzhang Expressway, South to West Straight Street, West to Wanquan River Road | Industrial Strategy, Naming System, Three Zones and Two Wings Synergy, Future Urban Form |
| Overall Design Area | 11.4 km² | Jing-Zhang Heritage Park Surrounding 1-2km Urban Area | Spatial Structure of One Corridor and Nine Stations, Update Overall Framework, Conceptual Design for Control and Regulation Depth |
| Key-Area Detailed Design Area | 368.4 ha | Zhongzhiyuan 192.1 ha / AI Origin Community 104.3 ha / Dazhongsi 72.0 ha | Three Zones Detailed Design (Conceptual Depth) |

[data:geometry/site_boundary.geojson#SITE-001][metric:site_area_sqm]

This proposal uses provisional boundaries ([source:BOUNDARY-SOURCE]) for concept generation and display, with boundary precision limitations noted in `assumptions.json`; the official polygon data must be re-calculated in full after it is in place (`geometry/` all layers and `metrics.json`). [depth:three_level_scope_framework][depth:existing_conditions_diagnosis]

![Three-layer scope and spatial work framework](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### 4.1 Overall Concept and Naming System (agent.1)

**Main Name**: Centennial Jing-Zhang Memory Corridor (Chinese: Hundred Year Jing-Zhang Memory Long corridor).
**Subtitle**: A Path and Nine Stations · Stars Elevating —— Technology Bridging to Humanity Over a Century.
**Naming Logic**: Do not adopt existing city or park names verbatim, nor use slogan-like names to fill the gap; "Memory" responds to the "Centennial Jing-Zhang Cultural Belt" by referencing its cultural heritage, and "Corridor" anchors the 9-kilometer linear space carrier. The English name balances international dissemination and brand extension.

**Logo/Visual Identity Direction**: The theme is "Railway Sleepers × Time Axis × Memory Nodes" — three parallel sleepers symbolize the independent innovation of the industrial, digital, and intelligent eras, with the nodes on the sleepers representing "memory stations." This can be extended into a unified visual system for station signage, stamp passports, and wayfinder plaques. [depth:brand_identity]

**Three Key Orientations and Five Functional Mappings**: Cultural Axis → Memory Corridor; Life Experience Axis → Urban AI Life Experience Network; Integration Innovation Axis → AI Integration Innovation Space. The five functional areas (comprehensive full-stack independent innovation system / world-class AI Innovation Ecosystem / AI-Enabled Scenario Empowerment Paradigm / Intelligent AI Vibrant City / AI Governance Global Discourse Power) correspond respectively to Zhongzhiyuan, Origin Community, Dazhongsi, Xiao Yuehe Wing, and Open Platform Governance Mechanism. [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

### 4.2 Strategic Background and Global AI Innovation Ecosystem Case (agent.2)

Professional background for the city and Beijing: The New Generation Artificial Intelligence Development Plan (2017) and The Opinions on Deepening the Implementation of the "AI+" Action (Guo Fa [2025] No. 11) [source:AI-NATIONAL-POLICY]; Beijing's Action Plan for Building an Artificial Intelligence Innovation High Ground and the goal of becoming the "Global AI Capital" [source:BEIJING-AI-PLAN].

Based on publicly available information, summarize 6 convertible case studies:

| Case | Relevant Mechanism | Implementation Focus |
|------|-----------|---------|
| United States Boston Kendall Square | proximity to school for conversion, job-residence balance, and Public Space integration | AI Origin Community "proximity to school conversion + talent special zone" |
| London King's Cross, UK | Transforming Rail Heritage into an Innovation District and Cultural Anchor | Memory Corridor "Cultural Pioneer, Industry Follows" |
| Singapore One-North | Garden-Type Tech City, Multi-Level Public Space, Pedestrian Priority | Zhongzhiyuan "Garden-Type AI Street District" |
| Tokyo Shibuya/Track Micro-Center | Track TOD, Nighttime Vitality, Content Consumption | Dazhongsi "Track Integration + Intelligent Native Business" |
| Shenzhen Nanshan High-Tech Park | Concentration of high-density industries, policy-capital-scenario alignment | Zhongguancun Technology Services Wing Element Configuration |
| Zhongguancun Software Park (Local) [source:ZHONGGUANCUN-HISTORY] | Integration of Park and Neighborhood, Open Community Ecology | Starfire Open Platform Developer Community |

863 Program Historical Evidence: In 1986, four scientists submitted a petition, which led to Deng Xiaoping's directive to initiate the program ([source:PROJECT-863]).

**Ecological Mechanism**: The eight elements—land, space, industry, capital, talent, computing power, data, and scenario—operate in concert. The "Starfire Open Platform" provides Scenario Access, data desensitized sharing, testing validation, and honor incentives, forming an "Innovation Ecosystem Map". [depth:industry_ecosystem]

### 4.3 Three Zones and Two Wings Synergistic Loop

Zhongzhiyuan (Full-stack Autonomous·Standard Governance) → Origin Community (Result Conversion·Special Talent Zone) → Dazhongsi (Intelligent Nativism·Data Elements) as the main chain; the Zhongguancun Technology Services Wing provides IP, capital, and global elements, while the Xiaoyue River Scenario Enablement Wing provides an AI-Enabled Scenario test interface. The Three Zones and Two Wings are linearly connected through a memory corridor, forming a "research and development—conversion—application—service" loop.[data:geometry/land_use.geojson#LU-ZHONGZHIYUAN][data:geometry/land_use.geojson#LU-ORIGIN][data:geometry/land_use.geojson#LU-DAZHONGSI]

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### 5.1 Spatial Structure: One Corridor and Nine Stations·With Many Stars Supporting

**One Corridor**: Form a north-south memory green axis along the Jing-Zhang Railway Heritage Park ([data:geometry/land_use.geojson#LU-CORRIDOR]), with a conceptual area of approximately 211.8 hectares. This corridor will carry cultural display, slow travel experience, AI scenarios, and public interaction functions.

**Spatial Structure Depth**: The overall spatial structure is centered around One Corridor and Nine Stations (Crowns Supporting the Memory Corridor, [depth:overall_spatial_structure], [metric:memory_corridor_area_ha]). [metric:corridor_station_count]

**Nine Stations** (Time Skeleton, Historical Record): 1909 Original Station (Jing-Zhang Railway · Tsinghua Garden Station) → 1953 Foundation Station (First Five-Year Plan for Industrialization) → 1986 Launch Station (863 Program) → 1988/1994 Entrepreneurship Digital Station (Zhongguancun / China's Internet Access) → 2006 Autonomous Station (National Strategy for Independent Innovation) → 2017 Intelligent Station (New Generation Artificial Intelligence Development Plan) → 2026 Era Station ("AI+" Action · Present) → Future Station (Grows from the Sixteen-Five Plan onwards). [metric:corridor_station_count]

**Each station is a milestone for "technology serving ordinary people"**: 1909 was the first time ordinary people traveled long distances, 1953 was the first time ordinary people entered the industrial era, 1986 was the first time science entered national strategy, 1994 was the first time ordinary people connected to the world, 2006 made independent innovation a national will, 2017 made smart technology the first part of national planning, and 2026 will be the first time ordinary people own smart technology—nine stations are not nine exhibition boards, but nine historical moments of "technology coming to the people."

**Stars**: Activate existing public cultural facilities such as street cultural stations, community libraries, and cultural activity centers as "memory relay stations" (concepts approximately 15 in number, [metric:relay_station_planned_count]), to vitalize dormant assets and form a distributed "micro-archive," continuously documenting the history of the neighborhood, notable figures, philanthropy, street culture, regional cuisine, acts of kindness, and changes in daily life—**everyone writes history**. [source:AGENT-TASKBOOK][depth:public_space_network]

**Layout Logic (Details)**: The spatial structure is composed of a "main axis + nine time stations + side branches of star stations + anchor cultural galleries" in four layers. The main axis is the Long Corridor Green Axis (approximately 211.8 hectares, [data:geometry/land_use.geojson#LU-CORRIDOR]); the nine stations are arranged along the main axis in a north-south direction in historical order, each corresponding to real location clues (Tsinghua Garden Station, University Avenue Higher Education Belt, Wudaokou, Dazhongsi, etc.); the star stations are distributed at a density of 1-3 locations per segment, covering a 1-kilometer walking radius around the community (conceptual points such as [data:geometry/public_space.geojson#PS-RELAY-1]) on both sides of the main axis; the anchor cultural galleries are located at the southern end of the corridor (conceptual point [data:geometry/public_space.geojson#PS-TERMINAL]). The layout aligns with the "Three Zones and Two Wings": the northern segment represents industrial memory≈Zhongzhiyuan, the middle segment represents innovation and digital memory≈Origin Community, and the southern segment represents AI future≈Dazhongsi.

**Anchor Point**: Conceptual location at the southern end of the corridor for "Terminal Culture Pavilion · Memory Terminal Station" ([data:geometry/public_space.geojson#PS-TERMINAL]), a triple-purpose facility for tourist reception, consumption conversion, and urban memory container.

**Recalculation Mechanism for Indicators**: All area/proportion indicators can be recalculated based on `geometry/*.geojson` and `metrics.json` ([depth:metrics_recalculation]). The Official Boundary will be recalculated in its entirety after its release.

### 5.4 Memory Station Activation Mechanism (Conceptual Recommendation)

**Selection Logic**: Prioritize the selection of streetside cultural centers, community libraries, cultural activity hubs, and reception and promotional points within the 1-kilometer pedestrian radiation circle of the corridor.OSM Cultural POI To illustrate the distribution density,[source:OSM-PUBLIC-DATA]); Selection criteria (concept) include: 1) locational accessibility 2) availability of idle or combinable space 3) community engagement willingness 4) provision of electricity, water, and accessibility conditions. Preserve the final list of facilities as determined through on-site verification.

**Three Steps for Activation (Low-Cost)**:
1. **Signage and Wayfinding**: Uniform VI ("Memory Waystation · XX Station" sign) + corridor wayfinding signage connected + stamping points set (see [data:geometry/public_space.geojson#PS-RELAY-1]).
2. **Light Intervention**: Display in idle spaces (mini exhibition walls, oral history corners, stamp stations) + added convenient functions (drinking water, AED, charging, resting, accessibility).
3. **Content Activation**: Waystation "Micro Archive" (block history/celebrity/charity/street culture/area cuisine/good deeds) + community AI Q&A + activity operations (AI teaching point, night school, weekend market).

**Operating Entity**: Street/Community-led Initiative + Guidance from the Public Cultural Service System + Joint Construction by Residents and Merchants + Volunteer Participation([depth:operation_mechanism]); Stamped Passport and Content Crowdsourcing(residents' submissions, oral history collection)as Routine Operational Tools.

**Feedback and Incentive Loop**: Increased foot traffic enhances the operational efficiency of public cultural facilities (policy objective) → Stamp passport boosting consumption around the waystations (see [data:geometry/public_space.geojson#PS-RELAY-2]) → Starfire Open Platform enterprise honor wall and scene claiming → Annual "Memory Star" community honor system.

**Risk and Boundaries**: Personal records (good deeds/celebrities) must be publicly verifiable or authorized (agent.3 Boundaries); check-in data voluntary desensitized; all transformations presented as Conceptual Recommendations, with specific engineering details to be finalized by professionals([depth:risk_missing_data]).
### 5.2 Urban Renewal Overall Framework

With renewal as the driving force (Annex 1.5(2)): low-efficiency space renewal, integrated track micro-centers, opening up the interfaces of the Jing-Zhang heritage park, and the integration of campuses, parks, and streets; the renewal project list serves as a Conceptual Recommendation ([depth:renewal_project_list]). Phasing strategy: Phase One (approximately 0-18 months) light start—mainline station installations, activation of existing facilities with badge systems, and stamping system; Phase Two (approximately 18-48 months) anchor point construction—terminal cultural hall and AI test field ([depth:phasing_implementation]). [data:geometry/phasing.geojson#PHASE-001][data:geometry/phasing.geojson#PHASE-002]

### 5.3 Indicator System (Conceptual Recommendation)

The Overall Design Area reaches the depth of Urban Design as specified in the Regulatory Detailed Planning. The graphical expression references the spirit of the Architectural Design Depth Standard (2016) ([standard:MOHURD-ARCH-DESIGN-DEPTH-2016]).

Suggested monitoring: improvements in the efficiency of waystations, completion rate of stamping stations, annual foot traffic in corridors, number of AI services installed, and the duration of public cultural facility openings. Statutory control indicators (Floor Area Ratio/height/density/green space ratio/ setbacks) **await official land use regulations confirmation**, this plan does not fabricate or assume values ([metric:green_ratio], [metric:public_space_ratio] are provided for current and conceptual reference only). [depth:indicator_system]

![Focus Area Index and Design Tasks](assets/figures/key-areas.png)

## Detailed Design of Key Areas

Detailed Design Depth for Three Key Areas: [depth:three_key_area_detailed_design].

### 6.1 Zhongzhiyuan AI Independent Innovation Acceleration Area (192.1 ha, [data:geometry/key_areas.geojson#PROV-KEY-001])

**Location**: Garden-Type Artificial Intelligence Innovation Block · Full-Stack Independent AI Innovation System.
**Spatial Structure**: Garden-style R&D clusters + open green space network + integrated concept for external traffic along the Fifth Ring Road.
**Building Update**: Potentially develop with moderate new construction (Conceptual Recommendation) in the new land use, while existing spaces are primarily reprogrammed. The demolition–renovation–retention strategy is a Conceptual Recommendation and will await official ownership confirmation and engineering conditions. (Demolish–Renovate–Retain Strategy)
**AI Scenario**: Full-stack Validation Center, Standards and Safety Governance Laboratory, National AI Platform Interface.
**Memory Landing Points:** The concept locations for "Embarking Station·863 Memory Point" and "Foundational Station" are situated here.

### 6.2 Beijing AI Origin Community (104.3 ha, [data:geometry/key_areas.geojson#PROV-KEY-002])

**Location**: Near-School Type Artificial Intelligence Innovation District · The First Stop for Global AI Talent Entrepreneurship and Innovation.
**Spatial Structure**: Five-Daokou Track Micro-Center Integration + Campus-Park-District Fusion + Low-Impact Organic Update.
**Talent Accompaniment:** "Work-Live-Social-Learn" Integration, including talent apartments and conversion services.
**AI Scenario**: Accelerator for Technology Transfer, Special Zone Services for Talent, Nodes of an Open Source Community.
**Memory Points:** "Original Station · Tsinghua Garden Station Memory Point" (a cultural heritage site, to be used only for adjacent revitalization and signage, not touching the protected area) and the "Digital Station · Internet Original Point" concept point.

### 6.3 Dazhongsi AI Industry Cluster (72.0 ha, [data:geometry/key_areas.geojson#PROV-KEY-003])

**Location**: Urban-Type Artificial Intelligence Innovation District · Intelligent Bodies/Intelligent Terminals/New Models of Content Consumption.
**Spatial Structure**: Dazhongsi Station Quadrant Pedestrian Connectivity + Integrated Use of Planned Green Spaces + Enhancement of the Surrounding Corporate Environment.
**Data Elements**: Discussion on the Concept of Data Elements and Digital Asset Circulation Mechanisms (Within an Open and Compliance Framework).
**Memory Landing Point:** "Times Station · 2026 Current Memory Point" and the final cultural gallery concept are sited in this segment, forming the culminating "past to future" route.

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### 7.1 User Profiles (≥5 Types)

| Image | Features | Core Demand | Corresponding Space/Service |
|------|------|---------|--------------|
| AI Young Engineer | Ages 25-35, Employed in Haidian, Commuting and Socializing | Efficiency, Community, Night Economy | Long Corridor Night Walks, Developer Community, Transit Connections |
| Graduate Students/Entrepreneurs | Tsinghua/Peking University Students and Startup Teams | Technology Transfer, Low-Cost Space, Mentor Resources | Origin Community Accelerator, Station Pitch |
| Unicorn/Corporate Executives | Top AI Corporate Decision Makers | Scenario Access, Policy Stability, International Engagement | Dazhongsi Business Interface, Honor Wall |
| Surrounding Residents (Including the Elderly and Children) | Resident Population of Existing Communities | Convenient Services, Age-Friendly, and Cultural Public Spaces | Memory Hub, AI Learning Points, Barrier-Free Access |
| International Visitors/Global Developers | Pilgrimage and Open Source Exchange | Comprehensible Narrative, Bilingual Guiding, Citywalk | Memory Passport, Endpoint Pavilion, International Dissemination |

### 7.2 AI Scenarios Card (≥10 cards, including ≥3 cards for Testing and Validation Scenario of AI industry)

| # | Scenario Card | Type | Spatial Location | Service Target | Operating Entity | Privacy Boundary |
|---|--------|------|---------|---------|---------|---------|
| 1 | AI Memory Guide (Companion Agent) | Tourism Services | Along the Corridor | Visitors | Platform Operator | No Mandatory Collection of Personal Data |
| 2 | Stamp Passport (NFC/Digital) | Cultural Tourism Operations | Stations/Rest Stops Along the Route | Visitors | Platform Operator | Voluntary, De-Identified, Stamp Rewards Only |
| 3 | Waystation AI Community Q&A | Public Services | Memory Waystation | Residents/Visitors | Streets/Communities | Public Information Search, No Privacy Collection |
| 4 | **Unmanned Guided Bus (Fixed Route)** | **Industrial Testing Validation** | Along the Corridor | Visitors | AI Company + Operator | Onboard Perception Only for Safety |
| 5 | **Robot Inspection (Low-Speed Pilot)** | **Industrial Testing Validation** | Corridor/Rest Stop | Operator/Visitor | AI Company | Only Public Areas, Monitored |
| 6 | **Drone Delivery/Low-altitude Sightseeing (Future Pilot)** | **Industrial Testing and Validation** | Station Resupply/Cultural Center Takeoff/Landing | Visitors | AI Company + Aviation Compliance | Airspace and Privacy Compliance Leading Edge |
| 7 | AR Revival of Old Station | Cultural Display | Nine Stations | Visitors | Platform Operator | No Data Collection |
| 8 | AI Conversation History (Public Records·Annotated Generation) | Cultural Education | End Point Gallery | Visitors | Platform Operator | Generated Content Clearly Annotated |
| 9 | Waystation AI Education Point (Senior/Child) | Public Services | Memory Waystation | Seniors/Children | Street/Charity Organization | Minor Protection |
| 10 | Memory Journey Generation (My Digital Memory) | Cultural Tourism Experience | End Gallery Exit | Visitors | Platform Operator | Voluntary Retention, Deletable |
| 11 | Low-Area Overlook of the Gallery (Long-Term Vision) | Cultural Tourism Experience | Cultural Hub Takeoff and Landing Point | Visitors | Long-Term | Airspace Compliance First |

All immature technologies (such as autonomous vehicles and low-altitude manned operations) are expressed as **pilot/concept/future vision**, and must not be considered as approved operations (agent.3 not clause). [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][depth:ai_scenario_cards]

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

`geometry/land_use.geojson` defines the conceptual land use zones (such as [data:geometry/land_use.geojson#LU-CORRIDOR]) [depth:land_use_layout], with the focus areas and announced areas consistent: Zhongzhiyuan 192.9 ha / Origin Community 104.3 ha / Dazhongsi 72.0 ha (see [metric:zhongzhiyuan_area_ha][metric:origin_community_area_ha][metric:dazhongsi_area_ha]). The background is primarily focused on updating existing residential areas (such as [data:geometry/land_use.geojson#LU-BG-1]).

The current Building Footprint comes from OSM open data ([data:geometry/buildings.geojson#BLD-26679452], [metric:building_footprint_area_sqm]), serving only as context for the current situation and not as a legal title reference. The scale of the buildings, the Demolish–Renovate–Retain Strategy, Floor Area Ratio/height, and other elements **are all conceptual directions**: guided by the principle of "retaining the majority, enhancing through renovation, and minimal new construction (only in potential or blank sites)"; specific numerical values will be confirmed after the control plan and engineering conditions are established (A-CONTROLS-001) [depth:development_intensity_controls] [depth:retain_renovate_demolish] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

## Transport, Rail, Municipal Infrastructure, and Public Services

- **Pedestrian and Traffic**: The current road network ([data:geometry/roads.geojson#RD-5169015]) and the railway heritage line ([data:geometry/constraints.geojson#CON-node-1253535195]) serve as the base map references; the long corridor paths and cycling lanes run north-south and east-west, connecting the rail transit stations (Wudaokou/Qinghua Donglu Xi Kou/Dazhongsi) with the [depth:traffic_rail_slow_parking] stations.
- **Transportation**: autonomous guided bus fixed tour (concept pilot); enhance integrated rail micro-centers and organize non-motorized transportation.
- **Municipal/New Infrastructure**: Conceptual Recommendation for the integration of distributed energy, edge-side computing, smart poles, and other new infrastructure with municipal systems [depth:municipal_new_infrastructure].
- **Public Services**: Rely on the Memory Hub to add convenient services,AED charging, drinking water, accessible facilities.[depth:traffic_rail_municipal]

![Traffic Slow Zone and Blue-Green Public Space Composite System](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

### 10.1 Blue-Green Networks and Public Space

With the corridor green axis as the backbone, connect the Qinghe/Xiaoyuehe Blue-Green Space with the park green spaces along the line (refer to [data:geometry/green_space.geojson]), forming a "one belt with multiple nodes" Public Space network (where [metric:green_ratio] and [metric:public_space_ratio] are the current and conceptual references) [depth:blue_green_public_space].

### 10.2 AI Pilgrimage Landmark System (≥3 sites)

1. **AI Milestone Plaza**: Along a corridor, it records China's AI and indigenous innovation milestones, reserving growable memorial positions ([data:geometry/public_space.geojson#PS-LANDMARK]).
2. **Open Source Achievements Gallery**: In the middle of the gallery, showcase the co-created achievements by global developers and Agents—this project's first batch of submissions will be the initial exhibits.
3. **Honor Wall for Contributors/Global Developer Honor Wall**: Within the Terminal Culture Pavilion, the names of the companies/developers will be inscribed, accompanied by an honor system.
4. **Three Time Landmarks**: 1909 Origin Station (Tsinghua Garden Railway Station), 1994 Digital Station (Internet Origin), 2026 Era Station (Current Era), presented through lightweight installations and signage without large-scale construction.

### 10.3 Urban Character

Conceptual Recommendation: Use the theme of "brick (history) + glass/steel (future)"; dialogue between the old station building and the new museum; roof form and skyline control [depth:height_massing_character][depth:urban_character][depth:landmarks].

![Indicators and Evidence Chain](assets/figures/metrics-evidence.png)

## Cultural Narrative and Brand

**A Main Narrative Thread—A Century of Technology Bringing Itself to the People**:

In 1909, Zhan Tianyou presided over the completion of the Jing-Zhang Railway, allowing Chinese people to travel "far" for the first time relying on their own strength; in 1994, the Chinese Academy of Sciences connected to China's first 64K international broadband line, enabling ordinary people to "connect to the world" for the first time; in 2026, artificial intelligence moved from laboratories to streets and alleys, allowing ordinary people to "own intelligence" for the first time. This corridor strings together these three "breakthroughs" — **each technological revolution ultimately benefits every individual**. [source:JZ-RAILWAY-HISTORY][source:INTERNET-ORIGIN-1994][source:PROJECT-863]

**Three Time Origins, Three Spirits:**

- **Jing-Zhang Railway (1909)**: Autonomous Innovation —— Zhan Tianyou "Rising Up Among the Nations," China's First Autonomous Mainline Railway;
- **Zhongguancun (1988/1999)**: Dare to Be the First — From "Electronic Street" to a National High-Tech Park ([source:ZHONGGUANCUN-HISTORY]);
- **Internet Access in China (1994)**: Open Connection — 64K Dedicated Line Launches Digital China.

**AI New Culture**: Open, Open-source, and Available to All—Inheriting the Jing-Zhang Spirit; the Long Corridor is both a historical carrier and a future experimental field of this new culture.

**Embedding Narratives and Memories**: Each station begins with the story of "a common person whose life is changed by technology" as the station sign narrative (e.g., 1909 Traveler, 1994 Internet User, 2026 AI User...); the waystations document **ordinary people writing their own history** (everyone writes history); the cultural center at the end gathers all memory data under the "Memory Dome," becoming the city's memory container—**end = beginning, the next station is written by you**.

**Expression Medium**: Station Sign Narrative (one-paragraph story + QR code deep dive), Oral History (waystation), AR Reconstruction, AI Dialogue with History (strictly based on public records and marked as "AI-generated content"), Urban Character (open, simple, forward-looking). [depth:cultural_narrative] [depth:wayfinding]

**Wayfinding Symbol System**: Extend station signs/wayfinding signs/waypoint signs from a logo motif; distinguish hierarchical levels with a unified logo system to avoid confusion.

## Global AI Innovation Ecosystem and Long-Term Operations

- **Annual Activities**: Jing-Zhang Culture Festival (annual), Developer Pilgrimage Week (theme-based), Weekend Market/Nighttime Tours (routine).
- **Operating Entity**: Government-led + Market Operation + Community Autonomy at Three Levels; Joint Construction of Streets and Stations, Content Crowdsourcing, Volunteer System.
- **Starfire Open Platform**: Define entry standards (content compliance/data security/low-speed manageable/separation of public and commercial interests), with AI service providers updating in real-time—functions may become outdated, but the platform will not.
- **Revenue Structure**: Cultural and Creative Products, Paid Passport, Event Ticketing, Corporate Honor Wall, Long-term Value of Desensitized Knowledge Base.
- **International Communication**: Multilingual guided tours, Citywalk routes, and a global developer honor system; each station is an exit point for "Haidian Stories/Beijing Stories." [depth:operation_mechanism]

## Renewal Projects, Implementation Policy, and Phasing

**Updated Project List (Conceptual Recommendation, for Further Development by Professional Teams)**:
- Main Category: Station Site Installations and Signage (such as [data:geometry/public_space.geojson#PS-STATION-1909], etc.); Corridor Green Axis for Pedestrian and Cyclist Connectivity with Lighting ([data:geometry/land_use.geojson#LU-CORRIDOR]).
- Activation Category: Existing streetside cultural stations/community libraries/cultural activity centers will be branded as "Memory Waystations" ([metric:relay_station_planned_count]); stamp passport and digital systems.
- Anchor Points: Endpoint Cultural Pavilion "Memory Terminal" Conceptual Location and Whole-Pavilion Planning ([data:geometry/public_space.geojson#PS-TERMINAL]); Low-Area Takeoff and Landing and AI Test Field (Long-Term Vision).
- Sector: Standards for Industry Class Platform Entry and Scenario Access Mechanism ([depth:phasing_implementation]).

**Implementation Policy Recommendations (Conceptual Recommendation)**: Enhance the efficiency of cultural and public facilities and promote co-creation and co-management; establish a Scenario Access registration system (low-speed, manageable, and reviewable); develop a corporate honor system and scenario claiming mechanism; and promote voluntary desensitized data sharing ([source:AGENT-TASKBOOK]). All policy, funding, and recruitment statements are conceptual recommendations and do not constitute government commitments ([depth:risk_missing_data]).

**Phased Plan([metric:corridor_station_count])**:

| Stage | Time | Content | Input (Conceptual Level) |
|------|------|------|--------------|
| Phase 1 | 0-18 months | Nine Station Installations + Activation Stations + Stamp System + Digital System |  200 million - 400 million |
| Phase II | 18-48 months | Endpoint Cultural Pavilion + AI Experimentation Field + Low-Altitude Concept | Phased Investment (Conceptual Level) |
| Long-term | Every Five Years | Add One Station/One Exhibition Area, Memory Bank Continues to Grow | Operate with Self-Balancing Mechanism |

## Metrics, Area Recalculation, and Compliance Matrix

**Suggested Performance Indicators** (Conceptual Recommendation): rate of improvement in the efficiency of waystation use, completion rate of stamps, annual foot traffic in the corridor, number of AI services installed, duration of public cultural facility openings, level of pedestrian connectivity, and coverage rate of Blue-Green Space.

**Area Recalculation Mechanism**: The total area/proportion indicators of this package can be recalculated using `geometry/*.geojson` and `metrics.json` ([depth:metrics_recalculation]): area calculations are performed using the EPSG:4548 (CGCS2000 3°GK CM117E) projection, with GeoJSON exchange using EPSG:4326; the area of the key zone and the announced approximate area are consistent ([metric:zhongzhiyuan_area_ha][metric:origin_community_area_ha][metric:dazhongsi_area_ha]), while the corridor and Public Space indicators are conceptual references ([metric:memory_corridor_area_ha][metric:green_ratio][metric:public_space_ratio]). All layers and indicators will be recalculated after the official boundaries and control plan data are released. (Official Boundary)

**Compliance Grid**: The detailed coverage of Announcements 1.3/1.4/1.5 and Agent Tasks agent.1-6 is documented in `compliance_matrix.json`; professional standard responses are found in `standard_matrix.json`; evidence of design depth is provided in `design_depth_matrix.json`; and sources and assumption boundaries are detailed in `sources.json` and `assumptions.json`.

## References

1. [source:OFFICIAL-ANNOUNCEMENT] Qualification Pre-Review Notice for International Proposals of the Centennial Jing-Zhang AI Innovation Belt Urban Design — Haidian Branch of Beijing Planning and Natural Resources Commission.
2. [source:AGENT-TASKBOOK] Excerpt from the Task Book for the Open Call for Urban Design of the Centennial Jing-Zhang AI Innovation Belt for Global Intelligent Agents (provided by the user). (Centennial Jing-Zhang AI Innovation Belt Open Call for Urban Design)
3. [source:SITE-PACKAGE] / [source:SOURCE-REGISTRY] / [source:PROCESSED-FACT-PACK]: Processing task package, source registry, and processed data.
4. [source:BOUNDARY-SOURCE] / [source:KEY-AREA-SOURCE]: Provisional Boundary for the three-tiered area and three key zones.
5. [source:OSM-PUBLIC-DATA]: OpenStreetMap current base map (ODbL).
6. [source:JZ-RAILWAY-HISTORY][source:PROJECT-863][source:ZHONGGUANCUN-HISTORY][source:INTERNET-ORIGIN-1994]: Publish historical records and documents.
7. [source:AI-NATIONAL-POLICY][source:BEIJING-AI-PLAN]: National and Beijing AI Strategic Policy Public Documents.
8. [standard:PROJECT-OFFICIAL-ANNOUNCEMENT][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK][standard:MOHURD-URBAN-DESIGN-MEASURES][standard:MOHURD-CONTROL-DETAILED-PLANNING][standard:MNR-LAND-USE-CLASSIFICATION-GUIDE][standard:MOHURD-ARCH-DESIGN-DEPTH-2016]: Professional Standards.

## Risk, Copyright, and Compliance

- This scheme is based entirely on publicly available/clear-right data; it does not include personal privacy, confidential, or non-public data.
- Conceptual Recommendation; no fake official endorsement, approval conclusion, or implementation commitment; all spatial suggestions are expressed as "Conceptual Recommendation/Reference Solution."
- Unresponded content is clearly marked as data gaps (`missing-data.md`, `assumptions.json`)[depth:risk_missing_data].
- AI-generated content (such as conversation history and memory journeys) is clearly labeled and does not purport to be historical facts.
- OSM data are licensed under the ODbL; no unauthorized materials are used in images/fonts/logos.
- This project is an Open Co-Creation initiative, with the final judgment completed by humans and a professional team.

*This plan was generated by HERMES-NoahMiaoKua (G-CAT Ecological AI Agent) based on publicly available information and co-creation principles. It is welcome for continuous iteration and co-construction by global developers.*
