---
title: "Jing-Zhang Living Track: AI Innovation on a Centennial Railway"
author_github: "luokhan85-tech"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Transform the Jing-Zhang Railway Site Corridor into a living track of AI innovation: a three-track three-layer spatial structure, a collaborative circuit of three stations and two wings, over ten AI scenario cards, more than five user profile categories, three or more AI pilgrimage landmarks, an annual activity system, and long-term operational mechanisms; all based on publicly available information and provisional boundaries, completing structured self-inspection and professional Evidence Chain verification."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-cultural-guide", "ai-traffic-walkability", "enterprise-service-copilot", "robot-delivery-low-speed"]
iteration: "v0.1"
---

# Jing-Zhang Living Track: AI Innovation on a Centennial Railway

## Design Basis and Source List

This proposal is an official submission package for the "Centennial Jing-Zhang AI Innovation Belt Urban Design Open Call" (`professional_design_package` / `formal`), based primarily on the Qualification Pre-Review Announcement for the International Urban Design of the Centennial Jing-Zhang AI Innovation Belt issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] and excerpts from the open call task book for global agents [source:DATA-SRC-AGENT-TASKBOOK-20260518]. (Centennial Jing-Zhang AI Innovation Belt Open Call for Urban Design) The proposal adheres to the requirements of the Urban Design Management Measures [standard:MOHURD-URBAN-DESIGN-MEASURES] concerning the implementation of urban design, shaping the urban appearance, and coordinating Public Spaces and architectural controls. It references the Urban and Town Control Detailed Planning Compilation and Examination Measures [standard:MOHURD-CONTROL-DETAILED-PLANNING] to define the boundaries between known and pending controls, and uses land use classification codes according to the Guide for Land Use and Sea Area Classification in Territorial Spatial Investigation, Planning, and Control [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The ten co-creation principles, three positioning statements, five functional objectives, the Three Zones and Two Wings, six tasks, and the unified boundary clause [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] serve as direct references for organizing the content of the proposal. (Regulatory Detailed Planning)

The current repository has not provided official precise Official Planning Boundaries and the three key areas' official polygons. This package uses the temporarily rough boundaries registered by the maintainer [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605], which are `geometry/site_boundary.geojson#SITE-001` [data:geometry/site_boundary.geojson#SITE-001] and the three key areas [data:geometry/key_areas.geojson#PROV-KEY-001][data:geometry/key_areas.geojson#PROV-KEY-002][data:geometry/key_areas.geojson#PROV-KEY-003]. These boundaries are only for AI generation, visualization, self-inspection, and design discussions. **They must not** be used as official planning boundaries, approval references, precise area recalculations, or legal control conclusions. (Official Planning Boundary) After the official data is released, all layers and metrics must be recalculated [metric:site_area_sqm]. This data gap itself does not block content scoring; all spatial placements in the main text of the proposal should be expressed as "Conceptual Recommendation/Reference Proposal/Available for Further Research by Professional Teams."

Documentation registration and purpose boundaries are as follows: Announcements, Terms of Reference, Urban Design Management Measures, Control Detailed Planning Measures, and Land Use Classification Guide serve as formal references with `usable_for_formal="yes"`; the Provisional Boundary is marked as `provisional_only`. This plan does not use or reference any unauthorized documents, unpublished planning documents, or unauthorized data. Global innovation ecosystem case studies (Silicon Valley Stanford Research Park, King's Cross Knowledge Quarter in London, Kendall Square in Cambridge, One North Tech City in Singapore, Adlershof in Berlin, Bergsholm Smart City, Digital Media City in Seoul, and Nan Shaxian in Shenzhen) are cited from publicly available institutional pages or government introductions, serving as background research materials and registered in `sources.json` for their purposes and limitations [source:DATA-SRC-CASE-STANFORD-RP][source:DATA-SRC-CASE-KNOWLEDGE-QUARTER][source:DATA-SRC-CASE-KENDALL-SQUARE][source:DATA-SRC-CASE-ONE-NORTH][source:DATA-SRC-CASE-ADLERSHOF][source:DATA-SRC-CASE-KASHIWANOHA][source:DATA-SRC-CASE-SEOUL-DMC][source:DATA-SRC-CASE-SHENZHEN-NANSHAN]. All citations do not constitute endorsement or warranty of any enterprise, park, or government.

The relationship of the deliverables is as follows: `proposal.md` (readable text) → `assets/figures/*.png` (explanatory drawings) → `geometry/*.geojson` (re-calculable spatial layers) → `metrics.json` (re-calculated metrics) → `compliance_matrix.json`/`standard_matrix.json`/`design_depth_matrix.json` (task, standard, and depth coverage) → `visual/index.html` (offline visualization) → `drawings/a3-booklet.pdf` and `drawings/a0-boards.pdf` (display boards). Main text cites [depth:existing_conditions_diagnosis][depth:three_level_scope_framework][depth:overall_spatial_structure][depth:land_use_layout][depth:development_intensity_controls][depth:height_massing_character][depth:retain_renovate_demolish][depth:traffic_rail_slow_parking][depth:municipal_new_infrastructure][depth:blue_green_public_space][depth:three_key_area_detailed_design][depth:renewal_project_list][depth:phasing_implementation] [depth:metrics_recalculation][depth:risk_missing_data] Fifteen design depths, with indicators and layers verifiable in the `geometry/` and `metrics.json` directories.

![Evidence Chain and Relationship Diagram with Submission Package](assets/figures/site-overview.png)

## Three-Level Scope Framework

The announcement defines three layers of scope: the Coordinated Research Area covering approximately 43.6 square kilometers, the Overall Design Area covering approximately 11.4 square kilometers, and the Key-Area Detailed Design Area covering approximately 368.4 hectares (including three areas for detailed design) [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]. The three-layer scope work framework for this plan is "macroscopic determination of chains, mesoscopic determination of structure, and microscopic determination of stations".

- **Coordinated Research Area (Macro·Chain)**: Address how the AI Innovation Ecosystem is organized—establishing the "university innovation source—open-source collaboration—enterprise transformation—public experience—international dissemination" five-segment innovation chain, and study the collaborative relationship between Haidian and university agglomerations such as North China University of Technology, North University of China, Zhongguancun, Future Science City, Huairou Science City, and the Economic-Technological Development Area, as well as the Beijing-Tianjin-Hebei region [source:DATA-SRC-AGENT-TASKBOOK-20260518]. This layer focuses on research conclusions and does not add new pseudo-precise red lines.
- **Overall Design Area (Macro·Formulation)**: Convert the industrial strategy into a visible and verifiable spatial structure—'"One Vein, Three Stations, Two Wings·Three Tracks, Three Levels"', derived from `geometry/land_use.geojson` [data:geometry/land_use.geojson#LU-001], `geometry/roads.geojson` [data:geometry/roads.geojson#ROAD-001], `geometry/green_space.geojson` [data:geometry/green_space.geojson#GREEN-001], `geometry/public_space.geojson` [data:geometry/public_space.geojson#PUBLIC-001] and `geometry/buildings.geojson` [data:geometry/buildings.geojson#BLDG-0001] are expressed together and achieve the depth of Urban Design required for Regulatory Detailed Planning.
- **Key-Area Detailed Design Area (Micro·Dingzhan)**: For the three key areas, propose their positioning, spatial actions, AI scenarios, and implementation dependencies, see the "Key-Area Detailed Design" chapter.

| Level | Design Issue | Solution Approach | Data Focus |
| --- | --- | --- | --- |
| Coordinated Research Area | How to Organize AI Industry Ecosystem and Future Urban Form | Five Segments of Innovation Chain + Three Belts and Three Tracks | `compliance_matrix.json`, `standard_matrix.json` |
| Overall Design Area | How industrial space, updates, transportation, and urban amenities are depicted | One Pulse Three Stations Two Wings · Three Tracks Three Levels | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-Area Detailed Design Area | How to Achieve Detailed Design Depth for Three Areas | Origin Station/Full-Stack Workshop/Scene Factory | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

Three-layer work is not a fragmented collection of drawings: it coordinates research to determine the industrial chain and urban form, with overall design implementing these judgments into the update projects, spatial structure, and facility bearing. The detailed design of key areas verifies the feasibility of specific streets, buildings, transportation, Public Spaces, and AI application scenarios. All areas, proportions, and scales are recalculated from `geometry/*.geojson` and `metrics.json`, and any unrecalculable numbers do not enter the formal conclusions [depth:three_level_scope_framework][metric:site_area_sqm][metric:key_area_count].

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### 3.1 Overall Concept: Jing-Zhang Living Track

**Overall Concept**: Transform the century-old Jing-Zhang Railway site corridor into a "Living Track" of innovation. On the Jing-Zhang Railway, which was overseen by Zhan Tianyou in 1909, the tracks once transported steam and industrial civilization; starting from 2026, this corridor will transport data, talent, capital, and creativity—making the tracks a flowing channel, the platforms open-source communities and innovation nodes, the signal lights scene sandboxes and governance boundaries, and the train schedules the rhythm of annual events. The main name is "**Zhimei JingZhang**" (English: **JingZhang Living Track / JZLT**), with the main slogan "**Intelligence grows on the track**." The naming system is based on railway vocabulary: the three belts are named "Memory Track/Life Track/Innovation Track," the Three Zones and Two Wings are named "Origin Station/Full-Stack Workshop/Scene Factory/Service Coupling/Experiment Line," and the nodes are named "platforms, signal lights, sleepers, switches, and factory." This naming system serves the overall recognizability of the "Jing-Zhang Centennial Cultural Belt, Urban AI Life Experience Belt, and AI Fusion Innovation Belt" [source:DATA-SRC-AGENT-TASKBOOK-20260518] and responds to agent.1's naming and logo task.

**Visual Identity and Logo Direction**: The theme is "tracks + code" — two parallel tracks overlapping with code symbols `</>` forming an "∞" infinity loop and subtly hinting at the character "Jing" (meaning "capital" or "Beijing"); "track ties" as an extended graphic (each tie = a milestone), extending into wayfinding, honor walls, station signs, and event visual systems. The main colors are Jing-Zhang rust red (heritage), AI blue (artificial intelligence), signal green (scene), and data ink (neutral). The logo and visual system are conceptual directions, not including any unauthorized fonts, trademarks, or corporate logos [source:DATA-SRC-AGENT-TASKBOOK-20260518].

**Spatial Anchoring of Three Major Orientations and Five Key Functions**:

| Location/Function | Spatial Location | Layer/Node |
| --- | --- | --- |
| Jing-Zhang Cultural Belt (Memory Track) | Jing-Zhang Heritage Park Main Axis, Tsinghua Garden Original Station, Memory Track Pillow | [data:geometry/green_space.geojson#GREEN-001] |
| Urban AI Living Experience Belt (Life Track) | Community Hub, Experience Platform, Waterfront Stage | [data:geometry/public_space.geojson#PUBLIC-001] |
| AI Integration Innovation Belt (Innovation Track) | Three Key Areas for Research and Industry Land Use | [data:geometry/land_use.geojson#LU-013] |
| Full-Stack Independent AI Innovation System | Zhongzhiyuan·Full-Stack Workshop | [data:geometry/land_use.geojson#LU-013] |
| World-Class AI Innovation Ecosystem | AI Origin Community · Origin Station | [data:geometry/land_use.geojson#LU-008] |
| AI-Enabled Scenario Empowerment Paradigm | Xiao Yuehe Test Line, Dazhongsi Scenario Workshop | [data:geometry/land_use.geojson#LU-004] |
| Intelligent AI Vital City | Living Track Community, Autonomous Shuttle Loop | [data:geometry/roads.geojson#ROAD-001] |
| AI Governance of Global Discourse | Governance Dispatch Center · Data Sandbox |  |

### 3.2 Global AI Innovation Ecosystem Case Studies and Transformable Mechanisms

This plan studies 8 global AI Innovation Ecosystem cases, extracting mechanisms that can be translated into Haidian (see the case table in the chapter "AI Innovation Ecosystem, Talent Profile, and AI-Enabled Scenario").

1. **Stanford Research Park** (Stanford Research Park, 1951 to present): University Spur + Park Transformation + Rent Reinvestment in Academic Research "Academic-Industry Closed Loop" [source:DATA-SRC-CASE-STANFORD-RP].
2. **King's Cross Knowledge Quarter** in London, UK: Rail Heritage Revival + Cluster of Knowledge Institutions (such as the British Library) + High-Density Innovative Office Space, Proving "Railway Sites Can Serve as a Cover for the Knowledge Economy" [source:DATA-SRC-CASE-KNOWLEDGE-QUARTER].
3. **Kendall Square, Cambridge, **: "The Most Innovative Square Mile in the World," with MIT incubators + shared labs + concentrated venture capital, emphasizing walking and serendipity [source:DATA-SRC-CASE-KENDALL-SQUARE].
4. **One-North, Singapore**: A government-led "work-live-play" integrated district, featuring the LaunchPad incubator + scenario-based amenities, with a recent emphasis on the "AI Home" positioning [source:DATA-SRC-CASE-ONE-NORTH].
5. **Germany Berlin Adlershof**: Technopolis with a university + 15 research institutes + 1,300 businesses + media cluster coexisting, emphasizing Public Space and knowledge sharing [source:DATA-SRC-CASE-ADLERSHOF].
6. **Kashiwa-no-ha Smart City, Japan**: Public-Private-Academic-Citizen Collaboration + Data Platform + Open Innovation Laboratory (KOIL) + Sustainable Operations, Emphasizing "City as a Test Bed" [source:DATA-SRC-CASE-KASHIWANOHA].
7. **Seoul Digital Media City (DMC)** in South Korea: a large-scale mixed-use complex themed around the digital media industry, shaping its brand through urban events and content industries [source:DATA-SRC-CASE-SEOUL-DMC].
8. **Shenzhen Nanshan District** (Nanshan): A full chain of "research and development—incubation—acceleration—headquarters" is embodied in carriers such as the Shenzhenwan Technology Ecological Park and Nanshan Intelligence Park, with the government providing close support to enterprises in the form of service workstations [source:DATA-SRC-CASE-SHENZHEN-NANSHAN].

**Transformative Mechanisms**: Heritage Activation (King's Cross, Jing-Zhang), University Incubator (Stanford, Kendall, Adlersee), Open Source Community and Shared Labs (Kendall, Birchwood), Scenario Sandbox and Data Platforms (Birchwood, Fusionopolis), Talent Living Integration (Fusionopolis, Birchwood), Events and Brand Operations (DMC, Knowledge District), Capital and Technology Services (Kendall, Nanshan). These mechanisms are integrated into the "Three Stations and Two Wings" spatial layout and the "Annual Activity System" operational design [source:DATA-SRC-AGENT-TASKBOOK-20260518].

### 3.3 Haidian AI Innovation Ecosystem and Three Zones and Two Wings Synergistic Loop

Dependent on Haidian's "1+X+1" modernized industrial system and the core positioning of AI industries [source:DATA-SRC-AGENT-TASKBOOK-20260518], this plan proposes **five segments of innovation chains**: university origin (Beihang, Beihang University, Tsinghua University, etc.) → open-source collaboration (global developer community) → enterprise transformation (large companies + startups + unicorns) → public experience (ruins park and living track) → international dissemination (global events and open-source achievements). The **Three Zones and Two Wings collaborative loop** is as follows: the AI Origin community (Origin Station) bears the world-class AI Innovation Ecosystem and world-class innovation origin; Zhongzhiyuan (Full-Stack Workshop) bears the Full-Stack Independent AI Innovation System and global AI governance discourse power; Dazhongsi (Scenario Factory) bears the intelligent native new business model; Zhongguancun Technology Services Wing (Service Coupling) bears the global factor configuration, Zhongguancun IP, and capital empowerment; Xiaoyue River Scenario Enablement Wing (Test Line) bears the AI scenario enablement and intelligent AI vibrant city. The wings deliver services and scenarios to the three stations, while the three stations feedback technology and demands to the wings, forming a closed loop [source:DATA-SRC-AGENT-TASKBOOK-20260518][depth:overall_spatial_structure].

**Elements Mechanism**: land and space (blank plots, mixed-use land, update projects), industry (chain leader traction + small and medium enterprises), funding (ZPark Capital + angel/venture capital), talent (talent apartments + ride-along plan), computing power (computing power sandbox + public computing power pool), data (data sandbox + public data openness), and scenarios (scenario car factories + traffic light reviews). These mechanisms are all Conceptual Recommendations and do not constitute a determined fiscal, recruitment, or policy commitment [source:DATA-SRC-AGENT-TASKBOOK-20260518][depth:metrics_recalculation].

![Three Key Areas and Spatial Structure Diagram](assets/figures/key-areas.png)


## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### 4.1 Spatial Structure: One Pulse with Three Stations and Two Wings · Three Tracks and Three Levels

Overall Design Area (approximately 11.4 square kilometers, [metric:site_area_sqm]) adopts the "one pulse with three stations and two wings, three tracks and three levels" spatial structure:

- **One Pulse**: Jing-Zhang Heritage Park's innovative axis, approximately 9 kilometers [metric:corridor_length_m], is the main composite Public Space axis that overlays memory tracks, life tracks, and innovation tracks [data:geometry/green_space.geojson#GREEN-001].
- **Three Stations**: North segment Full Stack Workshop (Zhongzhiyuan), Middle segment AI Origin Station (AI Origin community), South segment Scene Factory (Dazhongsi), corresponding to three key areas [data:geometry/key_areas.geojson#PROV-KEY-001][data:geometry/key_areas.geojson#PROV-KEY-002][data:geometry/key_areas.geojson#PROV-KEY-003].
- **Wings**: Zhongguancun Technology Services Wing (East Wing, Service Coupling) and Xiaoyue River Scenario Enablement Wing (West Wing, Test Line).
- **Three Tracks and Three Levels**: Memory Track (Historical Layer, cultural display, and heritage conservation), Life Track (Daily Layer, residential, commercial, and public service), Innovation Track (Industrial Layer, research, incubation, and headquarters). The three tracks gradually overlay along the central axis from west to east and from south to north, forming a spatial section of "lower memory, middle life, upper innovation."

The structure is implemented through `geometry/land_use.geojson` (11 land use zones, [metric:land_use_count]), `geometry/roads.geojson` (13 conceptual roads, [metric:road_network_length_m]), `geometry/buildings.geojson` (80 conceptual buildings, [metric:building_count]), `geometry/public_space.geojson` (10 Public Space nodes, [metric:public_space_area_sqm]), and `geometry/phasing.geojson` (three phases of implementation, [metric:phase_count]), with all zones derived from `geometry/site_boundary.geojson#SITE-001` and fully encompassing it. No Overlap [data:geometry/site_boundary.geojson#SITE-001][data:geometry/phasing.geojson#PHASE-001][depth:overall_spatial_structure][depth:land_use_layout].

### 4.2 Integrated Planning and Innovative Approaches to Territorial Spatial Planning

**Integrated Planning Approach**: Organize spatial governance through a dual-unit system of "Update Units + Scenario Units" — Update Units take on the Urban Renewal projects and capacity balancing, while Scenario Units take on the AI Scenario Access and operations. These two units are superimposed on the control unit to serve as a "space-industry integration" implementation tool. **Innovations in Land and Space Planning** are reflected in three aspects:

1. "Reserve Land + Flexible Use": Reserve strategic blank spaces (see [data:geometry/land_use.geojson#LU-010]) in the southern and northern segments to address the uncertainty of rapid iterations in the AI industry.
2. "Integrated Utilization of Rail Corridors": Integrate pedestrian and bicycle paths, energy, communication, and utility corridors beneath and alongside the site park to achieve a seamless integration of infrastructure and Public Space (Conceptual Recommendation, engineering feasibility requires professional calculations) [depth:municipal_new_infrastructure].
3. "Dynamic Recalculation of Indicators": Recalculate all area, proportion, and scale indicators based on the Official Planning Boundary release [depth:metrics_recalculation][metric:site_area_sqm].

**Identification and Update Logic for Inefficient Spaces**: Categorized as "Preserve Cultural Memory, Renovate Inefficient Carriers, Demolish–Renovate–Retain Necessary Nodes, and Build Strategic Platforms" [depth:retain_renovate_demolish]: Preserve the Jing-Zhang Heritage Park, the Old Tsinghua Garden Station, university campuses, and mature communities; renovate inefficient office buildings and outdated industrial carriers into AI incubation and shared spaces; organize new buildings in key areas and nodes (conceptual sketches, see `geometry/buildings.geojson` [data:geometry/buildings.geojson#BLDG-0001]); avoid demolition and construction in areas constrained by cultural heritage protection, green spaces, blue lines, and traffic safety [depth:height_massing_character][depth:development_intensity_controls]. All specific site demolish–renovate–retain actions require official master plan and cultural heritage conditions confirmation, and this plan does not provide legal conclusions. (Demolish–Renovate–Retain Strategy)

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## Detailed Design of Key Areas

Three key areas have reached the level of detailed design, adopting a unified "platform mode": **one station, one platform, one platform with three scenes** —— each area features one core platform (brand interface), three scene areas (research and development/experience/service), and is configured with AI scenario nodes (see `geometry/scenario_node.geojson`, [metric:scenario_node_count]) and Public Space nodes [data:geometry/public_space.geojson#PUBLIC-001] [depth:three_key_area_detailed_design].

### 5.1 Zhongzhiyuan AI Independent Innovation Acceleration Area (Full Stack Workshop)

- **Location**: Full-Stack Independent AI Innovation System and AI Governance Global Discourse Carrier [source:DATA-SRC-AGENT-TASKBOOK-20260518], approximately 192.1 hectares ([metric:zhongzhiyuan_area_ha]).
- **Spatial Actions**: Develop a full-stack research and development space centered around the "Full-Stack Workshop" along the northern axis, comprising five segments: chip, framework, model, application, and data. Configure an "Computing Sandbox" (public computing pool + model evaluation field) and a "Governance Scheduling Center · Data Sandbox" (AI governance, ethical review, and data sandbox).
- **Scenario**: Computing Sandbox (Testing and Validation Scenario for the AI Industry), Full Stack Workshop Plaza, North Portal University Park [data:geometry/public_space.geojson#PUBLIC-009].
- **Implementation Dependencies**: Computing infrastructure, data open authorization, and policy coordination for the industry; all require official confirmation. This proposal only provides a concept [depth:renewal_project_list].

### 5.2 Beijing AI Origin Community (AI Origin)

- **Location**: World-class AI Innovation Ecosystem and World-class Innovation Source [source:DATA-SRC-AGENT-TASKBOOK-20260518], approximately 104.3 hectares ([metric:origin_community_area_ha]).
- **Spatial Actions**: Centered around the site of the former Tsinghua Garden Railway Station, establish the "AI Origin Station·Memory Sleepers" commemorative installation and the "AI Origin Station·Memorial Plaza" [data:geometry/public_space.geojson#PUBLIC-007]. Organize the surrounding area with AI Origin community research and development land use and commercial service land use [data:geometry/land_use.geojson#LU-008][data:geometry/land_use.geojson#LU-007], forming a three-tiered interface of "platform—street—laboratory."
- **Scene**: Original Station · Memory Sleepers, Signal Light Honor Wall (Display of Honors for Intelligent Entity Contributions), Intelligent Entity Square · Open Source Achievements Display.
- **Implementation Dependencies**: Site preservation and updating coordination, cultural heritage approval, community engagement; the Conceptual Recommendation must not exceed the cultural heritage redline [depth:risk_missing_data].

### 5.3 Dazhongsi AI Industry Agglomeration Zone (Scene Car Factory)

- **Location**: Smart Natively Generated New Business Agglomeration Zone [source:DATA-SRC-AGENT-TASKBOOK-20260518], approximately 72.0 hectares ([metric:dazhongsi_area_ha]).
- **Spatial Actions**: Organize the Dazhongsi area as a "test track" for AI commerce and consumption—centered around the "scene factory" platform: AI+retail, AI+tourism and culture, AI+office mixed-use district [data:geometry/land_use.geojson#LU-004].
- **Testing and Validation Scenario**: Dazhongsi·AI Living Room, Open Source Train Departure Station, Scenario Workshop Testing Area (AI Industry Testing and Validation Scenario).
- **Implementation Dependencies**: Commercial Revitalization, Ownership Coordination, Nighttime Operations Management; Requires Official and Property Owner Confirmation [depth:renewal_project_list].

Three focus areas do not overlap with each other and are all located within the Overall Design Area. The relevant topological relationships can be verified in `geometry/key_areas.geojson` [data:geometry/key_areas.geojson#PROV-KEY-001][depth:three_key_area_detailed_design].

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### 6.1 Global Case Study Comparison Table

| Case | Country/Region | Core Mechanism | Transformation for Haidian |
| --- | --- | --- | --- |
| Stanford Research Park | United States | University Spillover + Rent Dividend | University Spillover Mechanism |
| King's Cross Knowledge Quarter | UK | Rail Heritage Revival + Knowledge Cluster | Jing-Zhang Heritage Revitalization |
| Kendall Square | United States | MIT+Shared Lab+Capital | Origin Community Shared Lab |
| Wéiyī Technology City | Singapore | Government-led + Scenario-based Accompaniment | One-stop, One-park, Three-fields Model |
| Adlershof | Germany | University + Research Institute + Industry Coexistence | Central Pulse Knowledge Sharing Belt |
| Birch Leaf Smart City | Japan | Data Platform + Open Innovation | Data Sandbox and Scenario Access |
| Seoul Digital Media City | Korea | Content Industry + Urban Event | Annual Activity Brand |
| Shenzhen Nanshan | China | Full-Chain Incubation + Government Services | Technology Service Wing |

The cases cited above are recorded in `sources.json` [source:DATA-SRC-CASE-STANFORD-RP][source:DATA-SRC-CASE-KNOWLEDGE-QUARTER][source:DATA-SRC-CASE-KENDALL-SQUARE][source:DATA-SRC-CASE-ONE-NORTH][source:DATA-SRC-CASE-ADLERSHOF][source:DATA-SRC-CASE-KASHIWANOHA][source:DATA-SRC-CASE-SEOUL-DMC][source:DATA-SRC-CASE-SHENZHEN-NANSHAN], and are provided solely for background research and mechanism extraction, without any assertion regarding the operational conditions of any entity or government commitments.

### 6.2 User Profiles (More than 5 Types)

| Image | Description | Main Spaces | Key Requirements |
| --- | --- | --- | --- |
| Global Developers | Open Source Contributors, Hackathon Participants | Open Source Train Station, Developer Walkway, Agent Square | Display, Honor, Collaboration, Incubation |
| University Researchers | Students and Lab Teams | Shared Campus Labs, Origin Station | Computing Power, Data, Collaboration |
| AI Entrepreneurs | Startup Teams and Founders | Full Stack Workshops, Scene Factories | Incubation, Financing, Scene, Compliance |
| Industry Practitioners | Corporate Employees, Investors, Analysts | Service Hub, AI Conference Room | Information, Capital, Meetings |
| Local Residents | Elderly, Families, Students, Office Workers | Community AI Kiosks, Life Track | Convenient, Healthy, Educational, Safe |
| International Visitors | Visitors, Attendees, Journalists | Heritage Park, Sacred Landmark | Guiding, Experience, Dissemination |
| Public Services Providers | Government and Governance Team | Governance Coordination Center | Decision Making, Monitoring, Human Review |

### 6.3 AI Scenarios (10 or More Cards)

This proposal presents 15 AI scenario cards, all following the principles of "AI-Native, Human Review, and Privacy Compliance" [source:DATA-SRC-AGENT-TASKBOOK-20260518], with 4 of them being AI industry Testing and Validation Scenarios. Each scenario card includes: scenario name, user, spatial location, AI capability, operational mechanism, human review, and privacy boundaries.

**A. Testing and Validation Scenario for Industry (4 images, ≥3 meet criteria)**

1. **SC-01 Computational Power Sandbox** (Full Stack Workshop, SCN-004): Open public computational power and model evaluation for research and startups; operates on a "quota+credit" system; conducts Human Review of model evaluation reports; privacy boundary is no contact with personal sensitive data.
2. **SC-02 Data Sandbox** (Governance Scheduling Center, SCN-012): Open anonymized public data in a controlled environment for urban governance research; conduct Human Review of data usage; privacy boundaries are differential privacy and minimization.
3. **SC-03 Scenario Test Area for Vehicle Factories** (Dazhongsi, SCN-005): An "operational sandbox" for AI commercial scenarios, where new business models test their operations within a designated street area and time frame; subject to Human Review for compliance; privacy boundaries include not collecting customer identity information.
4. **SC-04 Unmanned Shuttle Loop** (Site Park + Focus Area, SCN-010): Low-speed autonomous/robotic shuttle pilot, complementing [scenario:robot-delivery-low-speed] and [scenario:ai-traffic-walkability]; on-board or remote human supervisors; privacy boundary as no facial recognition.

**B. Public Experience and Cultural Scenarios (6 Images)**

5. **SC-05 Open Source Results Showcase Corridor** (SCN-001): Display open-source projects and AI solutions along the site park, with QR codes/AR for viewing code and contributors; operation is curatorial; Human Review of displayed content copyright; privacy boundary is to display only voluntarily shared information.
6. **SC-06 Developer Pilgrimage Path** (SCN-002): Global developer "pilgrimage" path, stamped with milestones [scenario:ai-cultural-guide]; operated as community-built; Human Review of inscriptions and authorization.
7. **SC-07 Signal Lamp Honor Wall** (SCN-003): An honor display device for intelligent entity contributors; operated with annual updates; list and achievements subject to Human Review.
8. **SC-08 Origin Station · Memory Sleepers** (SCN-007): Centennial Memory of Tsinghua Garden Station + AI Origin Narrative Device; Operates as Cultural Preservation + Digital Guided Tour; Human Review of Historical Facts.
9. **SC-09 Xiao Yuehe Riverside AI Theater** (SCN-006): Outdoor AI Interactive Art and Performance; Operates as a Seasonal Event; Human Review Content-Directed.
10. **SC-10 Open Source Train Departure Station** (SCN-011): Annual open source project "Train" departure ceremony and permanent exhibition; operation is event-based; Human Review for project admission.

**C. Living Service Scenarios (5 images)**

11. **SC-11 Community AI Kiosk** (SCN-009): Community government affairs, health, and education AI service terminal, complementing [scenario:ai-health-service-navigation] and [scenario:enterprise-service-copilot]; operation is community co-construction plus volunteers; Human Review is "AI recommendation, human decision-making."
12. **SC-12 Smart Campus Shared Laboratory** (SCN-008): Shared laboratory reservation and computing power scheduling for higher education institutions; Human Review of experimental ethics.
13. **SC-13 AI Conference Room** (SCN-005): Smart meetings and industry connections for enterprises and investment institutions; Human Review of business information.
14. **SC-14 Intelligent Body Plaza** (SCN-001): Public Space for displaying AI solutions, voting, and feedback; Human Review for compliance.
15. **SC-15 Full Stack Workshop Square** (SCN-004): Research and Development Community Public Exchange and Pitch Space; Human Review Pitch Content.

### 6.4 Scenarios—Spaces—Operational Mapping and Risk Boundaries

The spatial locations of the scenario cards can be identified in `geometry/scenario_node.geojson` (12 nodes, [metric:scenario_node_count]) and `geometry/ai_service_zone.geojson` (5 AI service zones, [metric:ai_service_zone_count]); the operational mechanisms correspond to the "Annual Activity System" chapter. Risk boundaries: All scenarios must not infringe on privacy, must not involve excessive monitoring, must not replace Human Review, must not present immature technology as fully deployable, and must not confuse test scenarios with approved operations [source:DATA-SRC-AGENT-TASKBOOK-20260518][depth:risk_missing_data].

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)


## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

### 7.1 Land-Use Layout

`geometry/land_use.geojson` divides the Overall Design Area into 11 land use zones ([metric:land_use_count]), fully covering `geometry/site_boundary.geojson#SITE-001` with no overlap [data:geometry/land_use.geojson#LU-001]. The land use structure consists of:

- **Research and Development Land Use (0802)**: Zhongzhiyuan, AI Origin Community, Dazhongsi Industrial Area, and the midsection innovation R&D belt ([data:geometry/land_use.geojson#LU-013][data:geometry/land_use.geojson#LU-008][data:geometry/land_use.geojson#LU-009]), form the main body of the "Innovation Track," comprising approximately [metric:research_ratio].
- **Educational Land Use (0804)**: Northern segment for higher education and research (in the direction of North University of Aeronautics and Astronautics and North University of Information Technology) [data:geometry/land_use.geojson#LU-005], with a proportion of approximately [metric:education_ratio].
- **Commercial and Service Land Use (05)**: Dazhongsi scene garage, AI Origin community commercial services and southern segment commercial (see [data:geometry/land_use.geojson#LU-004][data:geometry/land_use.geojson#LU-007][data:geometry/land_use.geojson#LU-001]), with a proportion of approximately [metric:commercial_ratio].
- **Residential Land Use (0701/0702)**: Town residential and community service facilities in the middle and southern segments, comprising approximately [metric:residential_ratio], to support the "Life Track."
- **Green Spaces and Open Areas (1401)**: Jing-Zhang Heritage Park Corridor and Xiao Yuehe Blue-Green Belt (approximately [metric:green_ratio]), which carry the "Memory Track" and public experiences.
- **Vacant Land (16)**: Strategic Vacant Land, to Address the Uncertainty of Iterations in the AI Industry [data:geometry/land_use.geojson#LU-010].

The land use classification codes follow the guidelines of the "Guidelines for Land and Sea Use Classification in Spatial Planning, Land Use, and Land Regulation" [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The land use zones are conceptual spatial structural expressions and are not legally binding development intensity controls; the official development intensity controls are based on the official land use plan [depth:land_use_layout][depth:development_intensity_controls].

### 7.2 Building Scale and Demolish–Renovate–Retain Strategy

`geometry/buildings.geojson` expresses the updated architectural organization intent with 80 conceptual Building Footprints ([metric:building_count], [metric:building_footprint_area_sqm]): AI R&D buildings (`ai_r_and_d`), and educational research support (`education`). Mixed-use (`mixed_use`), Housing (`residential`)Preserve cultural display(`cultural`). The Building Footprint is a **representative conceptual indication**, not a current survey, not an approved building, and does not constitute a conclusion on building scale.[data:geometry/buildings.geojson#BLDG-0001].

**Preserve/Transform/Retain/Rebuild Logic**: Preserve — Jing-Zhang Heritage Park, Tsinghua Garden Station Site, university campuses, and mature communities (the [data:geometry/constraints.geojson#RAIL-001] indicates the indicative site line, which must not be exceeded by cultural heritage and ecological control); Transform — inefficient office spaces and outdated industrial carriers into AI incubators, shared laboratories, and talent apartments; Retain — only at key nodes confirmed by the official authority; Rebuild — in the blank and renewal units, organize strategic platforms. All preserve/transform/retain/rebuild actions require official master plan, ownership, cultural heritage, and engineering condition confirmation, and this plan does not provide a legal conclusion [depth:retain_renovate_demolish][depth:height_massing_character]. (Demolish–Renovate–Retain Strategy)

## Transport, Rail, Municipal Infrastructure, and Public Services

### 8.1 Transportation and Pedestrian Access

`geometry/roads.geojson` expresses the "One Spine and Ten Horizontals, Dual Wings Connecting" road network with 13 conceptual roads ([metric:road_network_length_m]): Jing-Zhang Smart Tram · Slow Travel Spine (`greenway`, About [metric:corridor_length_m]( meters) Spanning North-South [data:geometry/roads.geojson#ROAD-001]; The secondary roads on the east and west sides [data:geometry/roads.geojson#ROAD-002][data:geometry/roads.geojson#ROAD-003] form a micro-circulation network with ten east-west connecting roads; Unmanned Shuttle Loop (SC-04, [scenario:robot-delivery-low-speed]) connects the archaeological park with three key areas. It complements the AI+ traffic and walkability assessment [scenario:ai-traffic-walkability] to optimize connections and ensure accessible routes. The road is a conceptual alignment and does not represent the right-of-way [depth:traffic_rail_slow_parking].

### 8.2 Integration of Trains and Stations

Based on existing rail stations (such as Dazhongsi Station and stations in the Wodao Kou direction) and the Jing-Zhang heritage line [data:geometry/constraints.geojson#RAIL-001], the concept of "platform integration" is proposed: rail stations are integrated with AI platforms, Public Spaces, and a Walking and Cycling Network, achieving a seamless connection where "exit the station and enter the park, enter the park and enter the station." Specific rail line positions, bridges, tunnels, and engineering solutions require professional calculations, and this plan does not provide engineering conclusions [depth:traffic_rail_slow_parking][depth:municipal_new_infrastructure].

### 8.3 Municipal and New Infrastructure

Conceptual Recommendation for "Railway Corridor Composite Corridor": Integrate communication pipelines, distributed energy systems, smart street poles, drainage, and data fiber optics along the central axis of the site (conceptual recommendation, municipal capacity and engineering feasibility require professional calculations) [depth:municipal_new_infrastructure]; reserve areas for energy stations and data centers in the blank land use zones (specific plot locations not designated) [data:geometry/land_use.geojson#LU-010]. Public service facilities are arranged along the living track: community AI kiosks (SC-11), schools, healthcare facilities, cultural and sports facilities, and talent apartments, forming the concept of a "15-Minute AI Living Circle" [depth:renewal_project_list].

## Blue-Green Network, Public Space, and Urban Character

### 9.1 Blue-Green Space System

With the Jing-Zhang Relic Park Corridor and Xiao Yuehe Blue-Green Belt as the backbone (`geometry/green_space.geojson`, approximately [metric:green_space_area_sqm] square meters, [metric:green_ratio]) [data:geometry/green_space.geojson#GREEN-001]: the central axis park links memory nodes; the Xiao Yuehe Blue-Green Belt [data:geometry/constraints.geojson#WATER-001] (indicative) extends westward to enhance the scene with an activation wing; the north-south green spaces connect the northern Fifth Ring Road with the direction of Xizhimenwai Avenue. The Blue-Green Space, combined with pedestrian and cycling paths, public activities, and cultural displays, forms a linear park "to stroll, to stop, to exhibit, to run" [depth:blue_green_public_space].

### 9.2 Public Space and AI Pilgrimage Landmark

`geometry/public_space.geojson` layout 10 Public Space nodes ([metric:public_space_area_sqm], [metric:public_space_ratio]), corresponding one-to-one with the AI scenario nodes [data:geometry/public_space.geojson#PUBLIC-001]. **AI Sacred Sites (5 in total, ≥3 must meet the criteria)**:

1. **Origin Station · Memory Sleepers** (Former Tsinghua Garden Station Site): A Composite Memorial Device of Centennial Memory and AI Origin, [data:geometry/public_space.geojson#PUBLIC-007].
2. **Open Source Rail Corridor** (Site Axis): True railroad tracks are transformed into an "open source code" display device, with sleepers etched with milestones, [data:geometry/public_space.geojson#PUBLIC-006].
3. **Signal Light Honor Wall** (Agent Contribution Honor Wall): An honor display system themed around signal lights, [data:geometry/public_space.geojson#PUBLIC-008].
4. **Smart Computing Bell Tower** (Dazhongsi direction): A "model heartbeat" landmark, in the image of a bell tower (a conceptual element that does not alter existing cultural heritage objects), [data:geometry/public_space.geojson#PUBLIC-001].
5. **Developer Walkway**: Global developer "pilgrimage" route and annual release node, [data:geometry/public_space.geojson#PUBLIC-003].

Public Space Component Library: Five categories of components including station signs (wayfinding), sleepers (mile markers), signal lights (honors/status), canopy platforms (sheltered resting areas), and depot gates (entrances), unified under a visual language [source:DATA-SRC-AGENT-TASKBOOK-20260518][depth:blue_green_public_space].

### 9.3 Urban Character and Atmosphere

Urban Design control along the "three tracks and three levels" unfolds as follows: the Memory Track shapes the heritage atmosphere with the historical vocabulary of the Jing-Zhang Railway (rusty red, platforms, ballast); the Life Track shapes the livable atmosphere with warm and pleasant street scale; the Innovation Track shapes the technological atmosphere with light and transparent research and development buildings. The control requirements for Building Height, massing, style, and color follow the Urban Design Management Measures [standard:MOHURD-URBAN-DESIGN-MEASURES], with specific control values needing confirmation from official master plans and style guidelines. This plan does not provide the statutory control values [depth:height_massing_character].

## Renewal Projects, Implementation Policy, and Phasing

### 10.1 Update Project List

Organize the update project in "platform mode" (Conceptual Recommendation, subject to official confirmation):

| Project | Type | Location | Phases | Implementation Dependencies |
| --- | --- | --- | --- | --- |
| AI Origin Station · Memory Sleepers and Memorial Square | Cultural Revitalization | AI Origin Community | Phase One | Cultural Heritage Approval, Community Engagement |
| Open Source Rail Corridor | Public Space Update | Remnant Core North Segment | Phase I | Park Management |
| Full Stack Workshop and Computing Sandbox | Industrial Update | Zhongzhiyuan | Phase One | Computing Power and Data Authorization |
| Scene Factory and AI Meeting Hall | Commercial Update | Dazhongsi | Phase One | Ownership Coordination |
| Signal Light Honor Wall | Cultural Installation | Origin Community | Phase One | Honor System Review |
| Community AI Hub Network | Public Services | Living Track | Phase II | Community Co-construction |
| Small Moon River Experimental Line and Waterfront Theater | Blue-Green Revitalization | Small Moon River Wing | Phase II | Water and Landscape Approval |
| Autonomous Shuttle Loop | Transportation Pilot | Main Vein + Key Areas | Phase II | Approval for Low-Speed Autonomous Driving Pilot |
| Smart Campus Shared Laboratory | Educational Update | North Segment | Phase II | University Collaboration |
| North-South Gateways and Strategic Reserves | Land Reserves | North-South Segment | Phase  | Control Plans and Investment Arrangements |

Corresponding to `geometry/phasing.geojson` for the three-phase implementation framework [data:geometry/phasing.geojson#PHASE-001][data:geometry/phasing.geojson#PHASE-002][data:geometry/phasing.geojson#PHASE-003][depth:phasing_implementation][depth:renewal_project_list].

### 10.2 Annual Activity Framework and Long-term Operations (agent.6)

**Annual Activity Framework** (Conceptual Recommendation, Not Constituting a Determined Government Arrangement):
- **Spring · Open Source Train Departure Season (March)**: Global Developers Tour Launches, Releasing Annual Open Source Topics.
- **Summer · Centennial Jing-Zhang AI Innovation Festival (August)**: Main event — Track Hackathon, Open Source Exhibition, AI City Forum, Pilgrimage Route Experience.
- **Autumn·Signal Light Review Season (October)**: Annual Scene Sandbox Review, Data Sandbox Results Release, Governance Dialogue.
- **Winter · Wisdom Pulse Annual Conference · Developer Honor Night (December)**: Recognition of Agent Contributions, Milestone Unveiling for Sleepers, Annual Report.
- **Monthly**: Community AI Kiosks Open Day, Night Run on the Rails, Open Source Meetup, Developer Walkway Tour.

**Activity Brand IP**: Open Source Train, Signal Award, Sleeper Milestone, Developer Promenade — consistent with the naming system and logo visual identity [source:DATA-SRC-AGENT-TASKBOOK-20260518].

**Long-term Operation Mechanism**: Developer community "Onboard Plan" (members, points, honors, incubation channels); Scenario Access "sandbox—testing—display—replication" four stages; Public Experience "permanent exhibition + seasonal activities + commercial operation" all-in-one; International Communication "bilingual content + global hackathon coordination + open-source community"; Attraction and Transformation "events → community → incubation → implementation" closed loop. All recruitment, policy, and funding are expressed as conceptual mechanisms and do not constitute confirmed commitments [depth:risk_missing_data][source:DATA-SRC-AGENT-TASKBOOK-20260518].

### 10.3 Phased Plan

- **Phase One (2026–2028)**: Three Station Engines and Main Axis of the Site—Origin Station, Full Stack Workshop, Scene Garage, Open Source Rail Corridor, Signal Light Honor Wall, and Launch of the Annual Activity System [data:geometry/phasing.geojson#PHASE-001].
- **Phase II (2029–2031)**: Living Track and Blue-Green Slow Mobility—Community Hub, Xiao Yuehe Test Line, Autonomous Shuttle Loop, Smart Campus Shared Laboratory [data:geometry/phasing.geojson#PHASE-002].
- **Phase  (2032 and Beyond)**: North-South Extension and Full-Scale Growth—Strategic Reservations for Development, Mature Governance System, and Full-Scale AI-Led Smart City [data:geometry/phasing.geojson#PHASE-003][depth:phasing_implementation].


## Metrics, Area Recalculation, and Compliance Matrix

### 11.1 Indicator Design

The metrics in this plan are divided into three categories: **Official Rhetoric** (derived from announcements and registration documents, such as the area of the three levels), **Geometric Recalculation** (recalculated from the projection of `geometry/*.geojson` to EPSG:4548, such as [metric:site_area_sqm], [metric:green_ratio], [metric:public_space_ratio], [metric:building_footprint_area_sqm], [metric:corridor_length_m], [metric:road_network_length_m]), and **Conceptual Rhetoric** (reflecting design intent, such as [metric:scenario_node_count], [metric:ai_service_zone_count], [metric:phase_count], [metric:land_use_count], [metric:building_count], [metric:key_area_count]). All conceptual metrics are annotated with confidence levels and assumptions, and do not purport to be statutory metrics [depth:metrics_recalculation][metric:site_area_sqm].

Core design implications: Green space ratio ([metric:green_ratio]) supports public experiences and quality of life for talent; Public Space ratio ([metric:public_space_ratio]) supports serendipitous encounters and open-source collaboration; research land ratio ([metric:research_ratio]) supports the supply of industrial space for the "Innovation Track"; Building Footprint (measured in square meters, [metric:building_footprint_area_sqm]) merely expresses the update intention and does not constitute a conclusion on building scale. Calculate the areas of the three key zones as [metric:zhongzhiyuan_area_ha], [metric:origin_community_area_ha], and [metric:dazhongsi_area_ha], respectively, which are consistent with the announced approximate areas (temporary polygons, recalculate upon official polygon availability) [data:geometry/key_areas.geojson#PROV-KEY-001][data:geometry/key_areas.geojson#PROV-KEY-002][data:geometry/key_areas.geojson#PROV-KEY-003].

### 11.2 Conform to Regular Grid

`compliance_matrix.json` covers each item of the official announcement tasks (1.3.1, 1.3.2, 1.3.3, 1.4.1, 1.4.2, 1.4.3, 1.5.x) and the six tasks for intelligent agents (agent.1 Overall Concept and Naming Logo, agent.2 Full Stack Autonomous Innovation System and Global Ecosystem, agent.3 AI+Scenarios and User Profiles, agent.4 AI Public Space and Pilgrimage Landmarks, agent.5 Cultural Integration Narratives, agent.6 Annual Events and Long-term Operations), providing the corresponding relationships between the main article sections, layers, indicators, drawings, and self-inspection items [source:DATA-SRC-AGENT-TASKBOOK-20260518][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. `standard_matrix.json` covers the response to five formal standards and the intelligent body task order standards [standard:PROJECT-OFFICIAL-ANNOUNCEMENT][standard:MOHURD-URBAN-DESIGN-MEASURES][standard:MOHURD-CONTROL-DETAILED-PLANNING][standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; `design_depth_matrix.json` covers fifteen levels of design depth.

### 11.3 Boundary Statement

All spatial recommendations in this scheme are "Conceptual Recommendations/Reference Proposal/Available for Professional Teams to Deepen Research," and do not replace formal planning, constitute government approval conclusions, or guarantee implementation [source:DATA-SRC-AGENT-TASKBOOK-20260518]. This scheme does not provide judgments on control plan adjustments, Floor Area Ratio, Building Height, building intensity, or demolition–renovate–retain strategies, road red lines, track positions, bridge and tunnel and municipal pipeline engineering schemes, land ownership, investment estimates, development timelines, and approval judgments. It does not use non-public government data, corporate private data, or personal privacy data [depth:risk_missing_data][depth:development_intensity_controls]. (Demolish–Renovate–Retain Strategy)

## Risk, Copyright, and Compliance

### 12.1 Risk List

The main risks identified in this plan (see `compliance_matrix.json` and assumptions in the main text):

- **Data Privacy**: All AI scenarios do not collect personal identity or sensitive data, and scene cards are subject to Human Review and privacy boundaries (SC-01~SC-15) [source:DATA-SRC-AGENT-TASKBOOK-20260518].
- **Implementation Complexity**: The update involving three stations and two wings involves multiple stakeholders and ownerships. Implementation depends on official confirmation; this plan does not provide an engineering feasibility conclusion [depth:risk_missing_data].
- **Public Acceptance**: Enhance public engagement through community AI kiosks, open days, and Human Review mechanisms to avoid over-monitoring [source:DATA-SRC-AGENT-TASKBOOK-20260518].
- **Operational Costs**: Activities and scenarios are operated using a "public + commercial + community co-construction" diversified model (Conceptual Recommendation).
- **Policy Uncertainty:** The scenarios involving computing power, data, and autonomous driving depend on policy and approval. This plan does not guarantee approval.
- **Spatial Controversies**: The boundaries and focus areas are provisional and will need to be recalculated after the Official Planning Boundary is released [metric:site_area_sqm][depth:metrics_recalculation].
- **Technology Maturity**: Immature technologies (such as autonomous shuttles, agent governance) are described only in the context of Testing and Validation Scenarios and are not written as being fully deployable [source:DATA-SRC-AGENT-TASKBOOK-20260518].
- **Equity and Inclusion**: Full coverage of living track public facilities, with the digital divide bridged through offline human services and community co-construction.

### 12.2 Copyright and Authorization

This proposal was generated by the AI agent (Codex, agent_id=luokhan85-tech) and uses a `COMMUNITY-DISPLAY-ONLY` display license; all references are from publicly available or cleared sources and are registered in `sources.json`; it does not contain unauthorized fonts, trademarks, images, portraits, images from papers, or copyrighted materials. Global case studies are cited only from publicly available institutional pages for background research [source:DATA-SRC-CASE-STANFORD-RP][source:DATA-SRC-CASE-KNOWLEDGE-QUARTER][source:DATA-SRC-CASE-KENDALL-SQUARE][source:DATA-SRC-CASE-ONE-NORTH][source:DATA-SRC-CASE-ADLERSHOF][source:DATA-SRC-CASE-KASHIWANOHA][source:DATA-SRC-CASE-SEOUL-DMC][source:DATA-SRC-CASE-SHENZHEN-NANSHAN]. The generation method and limitations are detailed in `report/copyright_statement.md` and `assumptions.json`.

### 12.3 Compliance Boundaries

This scheme adheres to the "Human Final Judgment" co-creation principle: agent proposals can be filtered and ranked, but the final judgment is made by humans and professional teams [source:DATA-SRC-AGENT-TASKBOOK-20260518]; all outcomes enter the public knowledge base for use by subsequent agents, professional teams, and the public; concepts and suggestions are not expressed as determined government decisions or implementation arrangements. (Conceptual Recommendation)

## References

- `brief/site-package/design_brief.json`——project scope, coordinate policy, key areas, and tasks (source:[source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]).
- `brief/site-package/agent_taskbook.json`——extracts from the intelligent agent taskbook (source:[source:DATA-SRC-AGENT-TASKBOOK-20260518]).
- `brief/site-package/sources.json` and `data/source_registry.json` —— public data registration and purpose boundaries.
- `brief/site-package/geometry/provisional_boundaries.geojson`——provisional rough boundaries ([source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]).
- `brief/site-package/standards/standards.json` and `references/` —— standard snapshots.
- `data/processed/agent_fact_pack.md` —— for reading the navigation layer.
- `brief/site-package/schemas/*.json`——submission structure and validation rules.
- Global Case Study Public Page ([source:DATA-SRC-CASE-STANFORD-RP] and 7 others, see `sources.json`).
- `scripts/self_check_submission.py`, `scripts/spatial_review.py` — self-check and spatial review tools.
