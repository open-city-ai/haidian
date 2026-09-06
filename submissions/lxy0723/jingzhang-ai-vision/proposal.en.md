---
title: "Jingzhang AI Symbiotic Corridor: A Future City Where Century-Old Railway Meets AI Innovation"
author_github: "lxy0723"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Centered on the 'Jingzhang AI Symbiotic Corridor' concept, this proposal deeply integrates the century-old historical heritage of the Jingzhang Railway, the innovative DNA of Zhongguancun, and cutting-edge AI technology to build a world-class AI innovation ecosystem corridor featuring 'one belt, three cores, multiple scenarios, and a full value chain.' Based on an overall design scope of 11.4 square kilometers and three key districts (Zhongzhi Park 192.1 ha, Origin Community 104.3 ha, Dazhongsi 72.0 ha), the proposal introduces a naming and branding system, global ecosystem benchmarking, 12 AI scenario cards, three AI pilgrimage landmarks, an annual event operations system, and cultural narrative strategies, aiming to create a spiritual home for global AI developers and a city-level AI application demonstration model."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# Jingzhang AI Symbiotic Corridor: A Future City Where Century-Old Railway Meets AI Innovation

## Design Basis and Source List

This proposal takes the **Pre-qualification Announcement for the International Design Competition for the Century-Old Jingzhang AI Innovation Belt Urban Design** issued by the Haidian District Branch of the Beijing Municipal Planning and Natural Resources Commission as its primary basis [source:OFFICIAL-ANNOUNCEMENT], and uses the provisional rough boundaries, key areas, enumerations, metrics, and source lists registered by maintainers in `brief/site-package/` as machine-readable evidence [source:AGENT-TASKBOOK]. Prior to design, the team systematically read `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, and `data/source_registry.json`, and established a four-dimensional inventory of tasks-scope-data-gaps using `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, and `missing_data_checklist.csv`.

Data registration and usage boundaries [source:SOURCE-REGISTRY]: 7 items of formal available data, 1 item of background data, and 1 item of provisional-only data. `data/processed/agent_fact_pack.md` serves as a reading navigation layer and is not a new formal basis [source:PROCESSED-FACT-PACK].

The spatial data submitted herein is marked as `provisional_constraint`. `geometry/site_boundary.geojson` (SITE-001, approximately 11.4 square kilometers) [data:geometry/site_boundary.geojson#SITE-001] and `geometry/key_areas.geojson` (PROV-KEY-001/002/003) [data:geometry/key_areas.geojson#PROV-KEY-001] are not official redlines and are used solely for proposal generation and discussion.

## Three-Level Scope Framework

The proposal is organized according to the three levels specified in the announcement: the Coordinated Research Scope (43.6 square kilometers) focuses on the AI industry ecosystem and future urban form; the Overall Design Scope (11.4 square kilometers) concentrates on urban renewal and industrial layout around the Jingzhang Heritage Park; and the Key Area Scope (368.4 hectares) focuses on three detailed design districts.

The core naming of this proposal is the **"Jingzhang AI Symbiotic Corridor."** "AI Symbiotic" refers to the spatial projection of the innovation meridian of AI computing power and algorithms along the Jingzhang Railway heritage corridor; "Symbiotic" refers to the coordinated evolution of historical heritage, natural ecology, and intelligent technology. The overall spatial structure is **"One Belt, Three Cores, Multiple Scenarios, Blue-Green Slow-Travel Composite Loop"** — the "One Belt" is the Jingzhang Heritage Park Vitality Belt (corresponding to the north-south through-space of [data:geometry/green_space.geojson#GREEN-001] and [data:geometry/public_space.geojson#PUBLIC-001]), the "Three Cores" are the three key districts of Zhongzhi Park, Origin Community, and Dazhongsi, the "Multiple Scenarios" are AI service nodes scattered across functional zones, and the "Composite Loop" is the blue-green slow-travel system connecting the three corridors.

### Three-Level Scope and Design Response Table

| Level | Design Question | Proposal Response | Data Placement |
| --- | --- | --- | --- |
| Coordinated Research Scope | How to organize the AI industry ecosystem and future urban form | Establish a five-level innovation chain of "University Source → Open-Source Collaboration → Enterprise Transformation → Public Experience → International Communication" | compliance_matrix.json, standard_matrix.json |
| Overall Design Scope | How to map industrial space, urban renewal, transport/municipal, and character | Four major land-use zones (AI R&D / Park Green Space / Industrial Services / Community Facilities) + three-core multi-point structure | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key Area Scope | How the three districts achieve detailed design depth | Zhongzhi Park garden-style innovation block, Origin Community university-near incubation, Dazhongsi urban-type industrial aggregation | [data:geometry/key_areas.geojson#PROV-KEY-001/002/003] |

### Naming System and Visual Identity (agent.1)

**Chinese Name**: 京张智脉共生带
**English Name**: Jingzhang AI Symbiotic Corridor (abbreviated: JZASC)
**Brand Positioning**: A convergence node between century-old industrial heritage and future intelligent civilization

**Logo Design Concept**:
The logo integrates the geometric form of Jingzhang Railway rails with AI neural network node topology — two parallel rails symbolize the century-old linear history of the Jingzhang Railway, with neural network nodes and connections overlaid thereon representing the network ecosystem of AI innovation, collectively forming an outward-radiating "AI Symbiotic" totem. The color scheme uses a gradient combination of classic rail silver-gray (#5B6B7A) from the Jingzhang Railway and AI tech blue (#0052D9), conveying the core imagery of "historical rails carrying future computing power."

**Sub-Brand System**:
- The three cores are named "AI Symbiotic · Source" (Zhongzhi Park, innovation source), "AI Symbiotic · Embryo" (Origin Community, incubation growth), and "AI Symbiotic · Confluence" (Dazhongsi, industrial convergence)
- Each AI scenario node is named under the "AI Symbiotic · Waystation" series, such as "Open-Source Waystation," "Safety Waystation," and "Computing Power Waystation"

## Coordinated Research Area: Industry and Future City Research

### Global AI Innovation Ecosystem Benchmarking (agent.2)

This proposal systematically reviews eight global AI innovation ecosystem cases and distills lessons applicable to the "Jingzhang AI Symbiotic Corridor" in Haidian:

| Case | Core Features | Implications for This Project |
| --- | --- | --- |
| **Silicon Valley AI Cluster (USA)** | University-industry-capital triangle, Stanford/Berkeley radiation, deep open-source culture | Strengthen embedded collaboration between Tsinghua/Peking University/Chinese Academy of Sciences and industry; establish a dual-track "Professor + Engineer" workstation system |
| **Tsukuba Science City AI Hub (Japan)** | Government-led planning, national research institute clustering, work-life balance | Leverage the garden-style environment of Zhongzhi Park to build a low-carbon AI R&D community and attract national AI laboratories |
| **London Tech Quarter (UK)** | Financial AI integration, regulatory sandbox, international talent diversity | Establish an "AI Regulatory Sandbox" in the Dazhongsi district to encourage financial AI and RegTech pilots |
| **Station F Paris (France)** | World's largest startup incubation campus, unified brand operations, vertical industry focus | Origin Community adopts its "startup ecosystem under one roof" model, focusing on AI open-source and developer incubation |
| **Shenzhen AI Town (China)** | Strong government push, computing infrastructure first, open application scenarios | Promote distributed edge-side computing node construction and open park-level AI application testing scenarios |
| **Zhongguancun AI Cluster (Beijing, China)** | Head enterprise clustering, dense university resources, superimposed policy advantages | This project serves as the "AI Core Pole" of Zhongguancun, forming a "dual-pole linkage" with the core Zhongguancun area in Haidian |
| **Seattle AI Corridor (USA)** | Microsoft/Amazon dual engines, cloud computing and AI synergy, organic ecosystem growth | Use the natural linear space of Jingzhang Heritage Park as a carrier to construct the ecological microcycle of the "Blue-Green AI Corridor" |
| **Singapore AI District (Singapore)** | National strategy, city-level AI applications, smart nation integration | Promote the overall "AI-Enabled City" solution, embedding AI from transportation to public services across all scenarios |

**Comprehensive Implications**: The eight cases collectively point to four success factors — ① physical proximity between universities and industry; ② deep cultivation of open-source and developer culture; ③ balance between government regulation and market innovation; ④ branded operations and international communication. This proposal translates these four factors into specific spatial strategies and operational mechanisms.

### AI Innovation Chain Spatial Organization

Based on the above case analysis, this proposal constructs a five-level innovation chain: "University Source → Open-Source Collaboration → Enterprise Transformation → Public Experience → International Communication":

1. **University Source Layer**: With Tsinghua University, Peking University, and the Chinese Academy of Sciences as cores, an "AI Achievement Transformation Waystation" is set up in Origin Community to complete prototype verification within 500 meters of laboratory achievements
2. **Open-Source Collaboration Layer**: An "Open-Source Contribution Honor Wall" is set up in the core area of Origin Community (see agent.4), establishing a visual honor system based on GitHub stars and code contribution volume
3. **Enterprise Transformation Layer**: Zhongzhi Park focuses on "autonomous and controllable AI," providing access to national AI testing and verification platforms; Dazhongsi focuses on "AI applications and industrial aggregation," serving head enterprises and unicorns
4. **Public Experience Layer**: An "AI Life Experience Belt" is set up along the Jingzhang Heritage Park, embedding AI+Transportation, AI+Education, AI+Healthcare and other scenarios into daily spaces
5. **International Communication Layer**: The Dazhongsi International Roadshow Living Room serves as the Beijing foothold for global AI teams, forming an international communication node in conjunction with the annual "Jingzhang AI Innovation Week"

### Future Urban Form Prediction

AI will change the ways cities work, live, socialize, learn, and commute. Based on this, the proposal puts forward three spatial prototypes:
- **AI R&D Office Prototype**: Zhongzhi Park adopts a "garden-style low-density R&D" model, with building heights not exceeding 36 meters, green space ratio not less than 45%, and each building equipped with an independent computing power waystation
- **AI Life Community Prototype**: Origin Community adopts a "university-near mixed community" model, with vertical mixing of residential and R&D functions, and AI education, AI healthcare, and AI services within 500 meters
- **AI Industrial Service Prototype**: Dazhongsi adopts a "transit-oriented international business" model, with headquarters offices, international roadshows, data element trading, and commercial services arranged within a 1000-meter radius of Dazhongsi Station

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Land Use Layout Structure

The Overall Design Scope (11.4 square kilometers) forms four major land-use zones, arranged from west to east [data:geometry/land_use.geojson#LU-001]:

| Land Use Zone | Code | Area (sqm) | Proportion | Design Positioning |
| --- | --- | --- | --- | --- |
| AI R&D Innovation Land | 0802 | 2,674,562 | 23.4% | Zhongzhi Park AI Autonomous Innovation Acceleration Zone, garden-style full-stack autonomous innovation block |
| Park Green Space and Open Space | 1401 | 2,589,339 | 22.7% | Jingzhang Heritage Park Vitality Belt, north-south through-going blue-green public space framework |
| Industrial Service and Commercial Service Land | 05 | 3,366,138 | 29.5% | Dazhongsi AI Industrial Agglomeration Zone and Origin Community industrial support |
| Community Service and Ancillary Land | 0702 | 2,782,793 | 24.4% | AI talent housing, living support for university faculty and students |

Land use classification follows [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], while building height and massing control are managed by [depth:height_massing_character].

### Spatial Structure

**"One Belt, Three Cores, Multiple Scenarios, Blue-Green Slow-Travel Composite Loop"**:

- **One Belt**: Jingzhang Heritage Park Vitality Belt (corresponding to [data:geometry/green_space.geojson#GREEN-001], approximately 140.9 hectares in area), serves as the public space framework connecting the three core districts, carrying composite functions such as cultural display, slow-travel transportation, and AI outdoor experiences
- **Three Cores**:
  1. Zhongzhi Park AI Autonomous Innovation Acceleration Zone ([data:geometry/key_areas.geojson#PROV-KEY-001], 192.1 hectares) — garden-style full-stack autonomous innovation block
  2. Beijing AI Origin Community ([data:geometry/key_areas.geojson#PROV-KEY-002], 104.3 hectares) — university-near achievement transformation and talent community
  3. Dazhongsi AI Industrial Agglomeration Zone ([data:geometry/key_areas.geojson#PROV-KEY-003], 72.0 hectares) — urban-type intelligent economy and international exchange block
- **Multiple Scenarios**: AI service nodes scattered between the three cores, including open-source release halls, safety governance sandboxes, edge-side computing power waystations, etc. (see agent.3 scenario cards for details)
- **Blue-Green Slow-Travel Composite Loop**: Based on the east-west slow-travel corridor of [data:geometry/roads.geojson#ROAD-001] (116.341→116.354, 39.9845), connecting the three cores, park green spaces, and public spaces

### Building Scale and Development Intensity

Building footprint control follows [depth:retain_renovate_demolish]. The AI R&D demonstration building footprint [data:geometry/buildings.geojson#BLDG-001] occupies approximately 31.1 hectares. Due to the absence of official regulatory planning conditions, indicators such as floor-area ratio, building height, and building density are temporarily marked as `status=unknown`, pending recalculation upon availability of official regulatory planning data.

### Transportation and Municipal Support

The transportation plan revolves a three-element structure of "integrated transit stations + micro-road circulation + slow-travel network":
- **Transit Integration**: Dazhongsi Station, Wudaokou Station, and Qinghua East Road West Station serve as three major transit hubs, with industrial services and public spaces arranged within 500 meters of each station
- **Micro-Road Circulation**: A 20km/h slow-travel-priority micro-circulation system is established within the three key districts
- **Blue-Green Slow-Travel Loop**: Based on the Jingzhang Heritage Park as a framework, a continuous slow-travel network with a total length of approximately 15km slow-travel skeleton (including Jingzhang Heritage Park vitality belt and east-west corridor; conceptual estimate, pending transport survey)

## Detailed Design of Key Areas

### Zhongzhi Park AI Autonomous Innovation Acceleration Zone (PROV-KEY-001, 192.1 hectares)

**Positioning**: Garden-style full-stack autonomous innovation block — the core bearing zone for the national AI autonomous and controllable strategy.

**Spatial Actions**:
1. **Qinghe River Interface Enhancement**: A "Qinghe Low-Carbon Innovation Corridor" is established in the western portion of Zhongzhi Park along the Qinghe River (northern section of [data:geometry/green_space.geojson#GREEN-001]), integrating green space, stormwater management, pedestrian and cycling functions, and AI display
2. **Industrial Display Spine**: Using the north-south main road as a framework, the national AI testing and verification platform, autonomous innovation exhibition center, and standard-setting workshops are arranged
3. **Low-Carbon Innovation Exchange Environment**: Buildings adopt a low-carbon energy system of distributed photovoltaics + ground-source heat pumps, with each R&D building equipped with a dedicated computing power waystation
4. **External Transportation Organization**: A cross-Qinghe River slow-travel bridge is constructed on the west side to connect to the ecological corridor along the Qinghe River; the east side connects to the North Fifth Ring Road and urban expressways

**Building Strategy**: Approximately 60% of existing modifiable buildings are retained, about 30% are renovated, and about 10% are newly built. New building heights are controlled at 24-36 meters, using setback designs to respond to the surrounding environment, with distributed photovoltaics and vertical greening on rooftops.

**AI Industry and Operations Scenarios**: Autonomous model testing and verification, AI safety governance display, low-carbon computing power experience, open-source standard workshops.

### Beijing AI Origin Community (PROV-KEY-002, 104.3 hectares)

**Positioning**: University-near achievement transformation and talent community — the spiritual origin of China's AI open-source culture.

**Spatial Actions**:
1. **Campus-Park-Block Slow-Travel Connection**: A dedicated slow-travel corridor is constructed between Qinghua East Road West Station and Tsinghua University, approximately 800 meters apart with a walking time of about 10 minutes
2. **Achievement Release Core Zone**: An "Open-Source Contribution Honor Wall" and "AI Achievement Release Hall" are established in the community center, serving as the main venue for the annual Global AI Activity Week
3. **AI Talent Integrated Services**: Concept proposal suggests AI talent apartments, international schools, AI medical clinics, and 24-hour open-source collaboration spaces (pending approval confirmation) are provided
4. **University-Near Achievement Transformation Street**: A one-stop service street for incubation, exhibition, legal affairs, intellectual property rights, and investment and financing is arranged along Qinghua East Road

**Building Strategy**: Primarily renovation (approximately 70%), supplemented by new construction (approximately 30%). Some modern-era buildings are retained as "AI Origin Commemorative Spaces." New buildings adopt a "low-rise high-density" model with heights controlled at 18-24 meters.

**AI Industry and Operations Scenarios**: Open-source community collaboration, achievement release roadshows, university achievement transformation, AI education and training, international developer residency.

### Dazhongsi AI Industrial Agglomeration Zone (PROV-KEY-003, 72.0 hectares)

**Positioning**: Urban-type intelligent economy and international exchange block — the Beijing headquarters base for global AI enterprises.

**Spatial Actions**:
1. **Dazhongsi Station Integration**: An underground-ground three-dimensional pedestrian system is constructed around Dazhongsi Metro Station, with pedestrian connectivity distance not exceeding 300 meters across all four quadrants
2. **International Roadshow Living Room**: A "Dazhongsi International Roadshow Living Room" is established in the northeast quadrant of the station, serving as a venue for display and negotiation of agents, intelligent terminals, and content consumer enterprises
3. **Data Elements Living Room**: A data elements and digital asset circulation display center is established in the southwest quadrant of the station, premised on "compliance, authorization, and auditability"
4. **Composite Use of Planning Green Spaces**: Planning green spaces within the district are combined with AI outdoor experiences, technology testing, and public art

**Building Strategy**: Primarily renovation and updating (approximately 50%), with about 30% retained and about 20% newly built. Focus on updating public spaces around enterprises and building facades to form a unified "AI International Block" image.

**AI Industry and Operations Scenarios**: Agent and intelligent terminal display, content consumption and AIGC experience, data element circulation, international roadshows and media releases.

### Summary of Three Key Area Designs

| Key District | Design Positioning | Spatial Actions | AI Industry and Operations Scenarios | Evidence Reference |
| --- | --- | --- | --- | --- |
| Zhongzhi Park AI Autonomous Innovation Acceleration Zone | Garden-style full-stack autonomous innovation block | Qinghe interface enhancement, industrial display spine, low-carbon innovation exchange, external transportation organization | Autonomous model testing, safety governance display, low-carbon computing power experience, standard-setting workshops | [data:geometry/key_areas.geojson#PROV-KEY-001] |
| Beijing AI Origin Community | University-near achievement transformation and talent community | Campus-park-block connection, achievement release core, talent zone services, university-near transformation street | Open-source community, achievement release, talent services, university-near incubation, international developer residency | [data:geometry/key_areas.geojson#PROV-KEY-002] |
| Dazhongsi AI Industrial Agglomeration Zone | Urban-type intelligent economy and international exchange block | Station integration, international roadshow living room, data elements living room, composite green space use | Agent and terminal display, content consumption, data element circulation, international roadshows | [data:geometry/key_areas.geojson#PROV-KEY-003] |

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### AI Personas

Based on global case analysis and Haidian industry characteristics, this proposal defines five core AI user personas and corresponding spatial needs:

| User Persona | Typical Needs | Spatial Response | Data and Privacy Boundaries |
| --- | --- | --- | --- |
| **Open-Source Developers** | Code release, community collaboration, technical reputation, night work | Origin Community open-source release hall, public code wall, 24h collaboration space | No collection of personal behavior trajectories; activity data used only for aggregate statistics |
| **Startup Teams** | Low-cost office, computing power access, product testing, rapid iteration | Zhongzhi Park shared testing grounds, edge-side computing power waystations, standard governance consulting | Computing power and data services require separate authorization; core enterprise data not shared |
| **Head Enterprise Visitors** | Technology display, business negotiation, international reception, talent recruitment | Dazhongsi International Roadshow Living Room, transit station Rapid connection service, enterprise public spaces | Enterprise logos and cases require rights clearance; visitor data used only for service optimization |
| **Surrounding Residents** | Convenient commuting, daily leisure, community services, low-disturbance environment | Jingzhang Heritage Park slow-travel loop, community AI service embedding, graded night lighting | Resident personas not used for commercial recommendations; no collection of biometric data |
| **University Faculty and Students** | Achievement transformation, cross-university collaboration, daily slow-travel, academic exchange | Campus-park slow-travel corridor, achievement transformation waystation, AI education experience points | Campus data and research achievements require university authorization; teaching data used with desensitization |

### AI Scenario Card System (agent.3)

This proposal designs **12 AI scenario cards** covering three major domains: industrial development, urban services, and public governance:

#### Industrial Development Scenarios (4 cards)

**Scenario Card 01 · Open-Source Release Hall**
- **Spatial Carrier**: Core area of Beijing AI Origin Community, adjacent to Qinghua East Road West Station
- **Service Targets**: Open-source developers, university research teams, startup teams
- **Core Functions**: AI achievement release, code contribution display, small roadshows, annual open-source community awards
- **Data Sources**: GitHub/Gitee public contribution data, project submission records (authorization required)
- **Privacy Boundary**: No collection of personal identity data; anonymized aggregate statistics used; code contribution display shows only user ID + contribution type, not specific code content
- **Proposed Collaborative Entity**: AI open-source community-related organization (pending authorization); concept proposal suggests hosting the annual "Jingzhang AI Open-Source Gala"
- **Design Description**: The hall adopts a "stepped, sit-and-display" layout, with an LED code waterfall screen at the center displaying real-time global AI open-source project contribution rankings

**Scenario Card 02 · Safety Governance Sandbox**
- **Spatial Carrier**: Central part of Zhongzhi Park AI Autonomous Innovation Acceleration Zone
- **Service Targets**: AI safety researchers, regulatory agencies, enterprise compliance teams
- **Core Functions**: AI standard formulation, model red-team testing, safety evaluation, compliance certification
- **Data Sources**: AI model testing data (desensitized), security attack records, regulatory compliance data
- **Privacy Boundary**: All testing data is fully desensitized; sandbox environment is isolated from physical networks; test results are viewable only by authorized clients
- **Proposed Collaborative Entity**: AI standard research-related organization (pending authorization)
- **Design Description**: The sandbox zone adopts a "glass vault" design, making the testing process visible while operations cannot be intervened upon, serving both visitor education and safety protection functions

**Scenario Card 03 · Edge-Side Computing Power Waystation**
- **Spatial Carrier**: One location in each of the three core districts, totaling 3; one micro-computing point every 500 meters along the slow-travel corridors
- **Service Targets**: AI developers, intelligent terminal users, urban operation systems
- **Core Functions**: Edge computing access, AI model inference acceleration, intelligent terminal debugging
- **Data Sources**: Urban IoT data, public service sensor data (desensitized), computing power usage records
- **Privacy Boundary**: Edge-side computing processes only local data, no raw data is transmitted back to central nodes; computing power usage data is protected by differential privacy
- **Proposed Collaborative Entity**: Regional computing power operation organization (pending authorization)
- **Design Description**: The computing power waystation adopts a "container-type movable" design, with appearance blending into the surrounding environment, and internally equipped with GPU inference servers and high-speed networks

**Scenario Card 04 · International Roadshow Living Room**
- **Spatial Carrier**: Dazhongsi AI Industrial Agglomeration Zone, northeast quadrant of Dazhongsi Station
- **Service Targets**: Global AI enterprises, investors, media, government representatives
- **Core Functions**: AI product launches, investment roadshows, international media conferences, industry summits
- **Data Sources**: Product information and roadshow content independently submitted by enterprises (authorization required)
- **Privacy Boundary**: Intellectual property of roadshow content belongs to the enterprise; the hall does not record or store roadshow content
- **Proposed Collaborative Entity**: International roadshow service organization (pending authorization)
- **Design Description**: The roadshow living room uses a "flexible modular" space that can be quickly converted into a roadshow hall, exhibition hall, or conference room, equipped with simultaneous interpretation in 8 languages

#### Urban Service Scenarios (5 cards)

**Scenario Card 05 · AI Slow-Travel Navigation**
- **Spatial Carrier**: Entire Jingzhang Heritage Park Vitality Belt (approximately 3.5km north-south)
- **Service Targets**: Pedestrians, cyclists, barrier-free users
- **Core Functions**: AI wayfinding, slow-travel breakpoint identification, crowding warning, barrier-free path planning
- **Data Sources**: Slow-travel flow sensors, mobile phone positioning (desensitized), barrier-free facility status
- **Privacy Boundary**: No collection of individual location trajectories, only regional heatmap statistics; sensor data is processed in real-time and then cleared
- **Proposed Collaborative Entity**: Transportation operation management organization (pending authorization)
- **Design Description**: AI wayfinding signs are installed every 200 meters along the trails, supporting voice interaction and sign language video, with solar charging panels at the base

**Scenario Card 06 · Qinghe Low-Carbon Innovation Corridor**
- **Spatial Carrier**: Along the Qinghe River on the western side of Zhongzhi Park (northern section of [data:geometry/green_space.geojson#GREEN-001])
- **Service Targets**: Park developers, surrounding residents, low-carbon technology enthusiasts
- **Core Functions**: AI display of green space, intelligent stormwater management, low-carbon energy experience, pedestrian and cycling composite path
- **Data Sources**: Meteorological data, water quality monitoring, energy consumption data (park-level)
- **Privacy Boundary**: No personal data involved; only environmental and energy data collected
- **Proposed Collaborative Entity**: Low-carbon operation management organization (pending authorization)
- **Design Description**: The innovation corridor adopts a trinity design of "rain garden + photovoltaic promenade + AI environment monitoring station," displaying the complete technical chain of a low-carbon park

**Scenario Card 07 · University-Near Achievement Transformation Street**
- **Spatial Carrier**: Beijing AI Origin Community, arranged along Qinghua East Road
- **Service Targets**: University research teams, technology transfer institutions, investment and financing institutions
- **Core Functions**: AI achievement display, technology transfer matching, intellectual property services, investment and financing roadshows
- **Data Sources**: University achievement registration data, technology patent information, investment and financing records
- **Privacy Boundary**: Trade secrets involving achievements are protected by NDA agreements; publicly displayed achievements require rights holder authorization
- **Proposed Collaborative Entity**: Technology transfer service organization (pending authorization)
- **Design Description**: The transformation street adopts a "front shop, back factory" layout, with display and negotiation spaces on the ground floor and small laboratories and conference rooms upstairs

**Scenario Card 08 · Data Elements Living Room**
- **Spatial Carrier**: Dazhongsi AI Industrial Agglomeration Zone, southwest quadrant of Dazhongsi Station
- **Service Targets**: Data service providers, compliance institutions, digital asset investors
- **Core Functions**: Data element circulation display, compliance audit, digital asset transaction matching
- **Data Sources**: Data product catalog, compliance audit reports, transaction records
- **Privacy Boundary**: All data displayed is desensitized samples, raw data is not displayed; transaction data is stored on blockchain
- **Proposed Collaborative Entity**: Data element circulation service organization (pending authorization)
- **Design Description**: The living room adopts a "transparent glass + encrypted terminal" design, with the display area open and transparent and the transaction area closed and secure

**Scenario Card 09 · AI Life Service Model Street**
- **Spatial Carrier**: Intersection of Origin Community and surrounding commercial areas
- **Service Targets**: Surrounding residents, AI talent families, elderly groups, children
- **Core Functions**: AI health monitoring, AI education tutoring, AI legal consultation, AI life assistant
- **Data Sources**: Resident health records (desensitized), education data (desensitized), public service data
- **Privacy Boundary**: All personal data is processed using a federated learning framework, raw data does not leave the device side
- **Proposed Collaborative Entity**: AI life service-related organization (pending authorization)
- **Design Description**: The model street adopts a "experience store + service station" model, with each store displaying an AI life service and providing 14 days of free experience

#### Public Governance Scenarios (3 cards)

**Scenario Card 10 · Global AI Activity Week Public Route**
- **Spatial Carrier**: Jingzhang Heritage Park Vitality Belt + Three Core Districts + Transit Stations
- **Service Targets**: Global AI practitioners, students, the public, media
- **Core Functions**: AI-themed parade, open-source contribution awards, industry achievement tour, public experience day
- **Data Sources**: Activity participation data (aggregate), media coverage data
- **Privacy Boundary**: No collection of participant personal data; photo/video collection requires marked authorization zones
- **Proposed Collaborative Entity**: Cultural event planning organization (pending authorization)
- **Design Description**: The activity route totals approximately 8km, starting from Dazhongsi Station, passing through Origin Community and Zhongzhi Park, ending at the Qinghe River, with 10 AI interactive experience stations along the route

**Scenario Card 11 · AI Public Security Operation Center**
- **Spatial Carrier**: Underground level one of Dazhongsi District, adjacent to the Dazhongsi Station control center
- **Service Targets**: Urban managers, emergency responders, public safety officials
- **Core Functions**: Public space safety monitoring, emergency warning, emergency resource dispatch, crowd heat analysis
- **Data Sources**: Public space cameras (desensitized), crowd sensors, emergency resource GPS
- **Privacy Boundary**: Video data is deleted immediately after real-time analysis, raw footage is not stored; personal identity data does not enter the AI analysis process
- **Proposed Collaborative Entity**: Emergency management organization (pending authorization)
- **Design Description**: The operation center adopts a "central large screen + mobile terminal" architecture, allowing commanders to dispatch emergency resources across districts in real-time

**Scenario Card 12 · AI Cultural Heritage Digital Protection Station**
- **Spatial Carrier**: Central section of Jingzhang Heritage Park Vitality Belt (within [data:geometry/green_space.geojson#GREEN-001])
- **Service Targets**: Historical researchers, cultural heritage managers, the public
- **Core Functions**: 3D digitization of Jingzhang Railway heritage, virtual restoration experience, AI cultural interpretation, heritage monitoring
- **Data Sources**: Historical archives, archaeological data, public contribution data
- **Privacy Boundary**: Public contribution data requires authorization; historical data has passed its protection period
- **Proposed Collaborative Entity**: Cultural heritage protection-related organization (pending authorization)
- **Design Description**: The protection station adopts an "underground exhibition hall + ground-level marker" design, with 3D holographic projection underground to restore historical scenes of the Jingzhang Railway

### AI Governance Principles

All AI scenario nodes follow four governance principles:
1. **Data Minimization**: Only data essential for scenario operation is collected; data is cleared when the scenario ceases to operate
2. **Transparency**: Each AI node displays a notice board explaining the type of data collected, purpose of use, and retention period
3. **Explainability**: AI decision processes are visible to users, with human review and appeal support
4. **Human Fallback**: All AI systems are equipped with manual intervention channels, allowing human takeover at critical moments

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

### Land Use Plan

Four major land-use zones form a closed, seamless land-use structure [data:geometry/land_use.geojson#LU-001], with a total area of approximately 11.4 square kilometers:

| Land Use Code | Land Use Nature | Area (sqm) | Layout Strategy |
| --- | --- | --- | --- |
| 0802 | AI R&D Innovation Land | 2,674,562 | Primarily in Zhongzhi Park district, adopting a garden-style low-density layout |
| 1401 | Park Green Space and Open Space | 2,589,339 | Jingzhang Heritage Park Vitality Belt as framework, connecting green spaces across districts |
| 05 | Industrial Service and Commercial Service Land | 3,366,138 | Primarily in Dazhongsi district, with supporting industrial services in Origin Community |
| 0702 | Community Service and Ancillary Land | 2,782,793 | Surrounding the three core districts, serving AI talent housing and livelihood |

### Building Retain-Renovate-Demolish Strategy

The building plan distinguishes four categories: **retain / renovate / update / new-build**, following [depth:retain_renovate_demolish]:

- **Retain**: Buildings related to Jingzhang Railway heritage, modern-era buildings with historical value, and industrial buildings with intact structures (approximately 15%)
- **Renovate**: Existing industrial office buildings, undergoing energy-saving renovation and AI infrastructure upgrading (approximately 45%)
- **Update**: Low-efficiency commercial buildings and old industrial buildings, with functional replacement for AI industrial services (approximately 25%)
- **New-Build**: AI-functional buildings at new industrial nodes and residential districts (approximately 15%)

The AI R&D demonstration building footprint [data:geometry/buildings.geojson#BLDG-001] occupies approximately 302,609 square meters, serving as a design template.

### Building Character Control

Building height and massing control follow [depth:height_massing_character]:
- Zhongzhi Park: Building heights proposed 24-36m (conceptual, pending regulatory plan), setback design concept, rooftop greening + PV (subject to structural review)
- Origin Community: Building heights proposed 18-24m (conceptual, pending regulatory plan), low-rise high-density concept, facades may use red brick + glass (subject to heritage review)
- Dazhongsi District: Building heights 36-60 meters, modern business style, unified AI signage system
- Around Heritage Park: Building heights not exceeding 24 meters, harmonizing with the historical environment

## Transport, Rail, Municipal Infrastructure, and Public Services

### Transportation Organization

**Transit Station Integration**:
- Dazhongsi Station: Pedestrian connectivity across 4 quadrants, covering all industrial land within a 500-meter radius
- Wudaokou Station: Connects to Tsinghua/Peking University, with a dedicated AI achievement transformation fast track
- Qinghua East Road West Station: Adjacent to Origin Community, reaching the core area within a 300-meter walk

**Road Micro-Circulation**:
- Zhongzhi Park District: A "six vertical, three horizontal" micro-circulation system, with road sections primarily 14 meters wide
- Origin Community District: A "block-level slow-travel network" with main roads limited to 20km/h
- Dazhongsi District: A "grid-style" pedestrian system centered on the rail transit

**Blue-Green Slow-Travel Loop**: Based on the east-west corridor of [data:geometry/roads.geojson#ROAD-001] and the north-south green space of [data:geometry/green_space.geojson#GREEN-001], a "cross-shaped" slow-travel framework is formed with a total length of approximately 15km.

### Municipal and Public Service Facilities

**AI Industrial Service Facilities**:
- Distributed edge-side computing power nodes: 1 main node in each of the three cores, 1 micro-node every 500 meters along slow-travel corridors
- AI Safety Monitoring Stations: 1 environmental monitoring station every 300 meters along Jingzhang Heritage Park
- Open-Source Collaboration Network: 24-hour open-source collaboration spaces in all three cores

**Talent Living Service Facilities**:
- AI Talent Apartments: 500 talent apartments in Origin Community, equipped with AI smart home
- AI International School: 1 12-year AI-featured school in Origin Community
- AI Medical Clinics: 1 AI-assisted diagnosis clinic in each of the three cores

**New Infrastructure**:
- Distributed Energy System: Zhongzhi Park uses a photovoltaic + energy storage system with coverage rate not less than 30%
- 5G/6G Network: Full coverage across the three core districts, continuous coverage along slow-travel corridors
- Urban Perception Network: 200+ environmental sensors deployed along Jingzhang Heritage Park

## Blue-Green Network, Public Space, and Urban Character

### Blue-Green Space System

Based on the Jingzhang Heritage Park Vitality Belt ([data:geometry/green_space.geojson#GREEN-001], 140.9 hectares) as a framework, a "one corridor, three parks, multiple points" green space system is formed:

- **One Corridor**: Jingzhang Heritage Park Vitality Belt, passing through the three core districts from north to south
- **Three Parks**: Zhongzhi Park Low-Carbon Innovation Park, Origin Community Talent Park, Dazhongsi Urban Living Room Park
- **Multiple Points**: Micro-green spaces and pocket parks within each district, with a service radius not exceeding 300 meters

The green space ratio is 29.9% (metrics.json measured value 0.298819), and the public space ratio is 3.0% (metrics.json measured value 0.030331), following [depth:blue_green_public_space] and [data:geometry/public_space.geojson#PUBLIC-001] (34.6 hectares, metrics.json measured value 346,167 sqm).

### AI Pilgrimage Landmark Design (agent.4)

This proposal designs **three AI pilgrimage landmarks**, forming a spiritual landmark system for global AI developers:

#### Landmark One: Jingzhang AI Memorial Tower
- **Location**: Northern section of Jingzhang Heritage Park Vitality Belt (south of Zhongzhi Park, within [data:geometry/green_space.geojson#GREEN-001])
- **Design Concept**: A 38-meter-high metal tower with a "twisted rail" form — two parallel Jingzhang Railway rails twisted into a spiraling AI neural network pattern, symbolizing "civilizational leap from historical rails to intelligent neural networks"
- **Functions**: AI history exhibition (from the Turing Test to the century-long context of deep learning), AI real-time computing power display wall (dynamically displaying global AI computing power distribution), 360-degree observation deck at the top
- **Cultural Narrative**: Commemorates the century-long dialogue between the 1905 groundbreaking of the Jingzhang Railway and the future conceptual launch of the Jingzhang AI Innovation Belt (conceptual, not implemented)

#### Landmark Two: Open-Source Contribution Honor Wall
- **Location**: Core square of Beijing AI Origin Community
- **Design Concept**: A 60-meter-long, 8-meter-high LED honor wall composed of 100,000 independently illuminable "code bricks," each representing an open-source contributor, real-time displaying their GitHub/Gitee contribution volume and project influence
- **Functions**: "Digital Walk of Fame" for global open-source contributors; annual selection of "Jingzhang AI Open-Source Contribution Star," with winners leaving permanent light patterns on the wall
- **Operations**: API integration with open-source platforms such as GitHub and Gitee, real-time updating of contribution data, with a dedicated honor wall App for contributor self-service queries

#### Landmark Three: Global AI Milestone Corridor
- **Location**: Southern section of Jingzhang Heritage Park Vitality Belt (north of Dazhongsi, within [data:geometry/green_space.geojson#GREEN-001])
- **Design Concept**: A 200-meter-long linear corridor with 12 milestone sculptures on each side, each representing a milestone event in AI development history (1956 Dartmouth Conference, 1995 Statistical Learning, 2006 Deep Learning, 2016 AlphaGo, 2022 Large Models, Future AGI Breakthrough (conceptual), etc.)
- **Functions**: AI cultural science corridor, public photo check-in point, AI enterprise brand display area
- **Operations**: Milestones updated every two years; AI enterprises may sponsor milestone sculptures (subject to rights clearance approval)

### Cultural Narrative System (agent.5)

This proposal constructs a "three-segment" cultural narrative that deeply integrates Jingzhang Railway history, Zhongguancun innovation culture, and AI culture:

**Segment One: Century-Old Railway · Origin of Industrial Civilization**
- **Narrative Core**: In 1905, Zhan Tianyou presided over the construction of the Jingzhang Railway, creating the precedent for China's independently designed and constructed railways
- **Spatial Carrier**: Jingzhang Heritage Park, former site of Qinghua Garden Railway Station
- **AI Translation**: AR experience restores the construction scene of the Jingzhang Railway; AI narrators tell the inheritance relationship between industrial civilization and intelligent civilization

**Segment Two: Zhongguancun · Innovation Cultural DNA**
- **Narrative Core**: The entrepreneurial innovation culture from Zhongguancun's "Electronics Street" to the National Independent Innovation Demonstration Zone
- **Spatial Carrier**: Haidian Huangzhuang, Entrepreneurial Street, Origin Community
- **AI Translation**: Digital archive of AI entrepreneur oral history; real-time display of Zhongguancun innovation index

**Segment Three: Jingzhang AI Symbiotic · Future of AI Civilization**
- **Narrative Core**: From the "human acceleration" of the Jingzhang Railway to the "intelligent acceleration" of the AI era, the century-old transportation corridor transforms into an AI innovation corridor
- **Spatial Carrier**: Jingzhang AI Memorial Tower, Global AI Milestone Corridor
- **AI Translation**: AI Civilization Time Capsule (storing contemporary AI achievements, to be opened in a century); global AI developer spiritual map

**Cultural Narrative Route**:
Dazhongsi AI Memorial Tower → Global AI Milestone Corridor → Jingzhang Heritage Park Vitality Belt → Open-Source Contribution Honor Wall → University-Near Achievement Transformation Street → Former Site of Qinghua Garden Railway Station → Qinghe Low-Carbon Innovation Corridor

### Urban Character

The urban character integrates Jingzhang Railway industrial heritage, Zhongguancun innovation culture, and AI technology elements:
- **Building Color Scheme**: Based on the classic gray-white of Jingzhang Railway, accented with AI tech blue
- **Public Art**: 12 sets of "AI and Railway" themed public artworks along Jingzhang Heritage Park
- **Wayfinding System**: Uses "rail + neural network" graphic language, bilingual Chinese-English + AI voice broadcast
- **Night Lighting**: Three core districts use different color temperatures of landscape lighting — Zhongzhi Park cool blue (technology), Origin Community warm white (culture), Dazhongsi golden white (business)

## Renewal Projects, Implementation Policy, and Phasing

### Renewal Project Inventory

| Project No. | Project Name | Type | Key Dependencies | Design Description | Evidence Reference |
| --- | --- | --- | --- | --- | --- |
| JZ-01 | Jingzhang Heritage Park Slow-Travel Breakpoint Connection | Public Space / Transportation | Road redlines, under-bridge spaces, traffic organization | Connect 5 major slow-travel breakpoints, add 3 cross-ring-road slow-travel channels | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Zhongzhi Park Qinghe Innovation Interface | Blue-Green Space / Industry Display | River blue line, flood control conditions | Build 1.2km innovation display belt along the Qinghe River, including 3 AI environment monitoring stations | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | Origin Community University-Near Achievement Transformation Street | Urban Renewal / Industrial Services | Campus boundary, ownership, ground-floor retail | Arrange 200-meter achievement transformation street along Qinghua East Road, including 12 types of businesses such as incubation services, intellectual property, and investment and financing | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | Dazhongsi Station Four-Quadrant Pedestrian Connection | Transit Integration / Slow-Travel | Transit station, road intersections, municipal utilities | Construct a 4-quadrant pedestrian system at Dazhongsi Station, with total walking distance not exceeding 300 meters | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI Public Services and Edge-Side Computing Power Nodes | New Infrastructure / Public Services | Energy, computing power, security | 1 main computing power waystation in each of the three cores, 1 micro-computing point every 500 meters along slow-travel corridors | [data:geometry/site_boundary.geojson#SITE-001] |
| JZ-06 | Jingzhang AI Memorial Tower Construction | Cultural Landmark / Public Space | Heritage conservation, landscape design | 38-meter AI memorial tower with exhibition, computing power display, and observation functions | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-07 | Open-Source Contribution Honor Wall Construction | Cultural Landmark / Community | Open-source platform API, data authorization | 60-meter LED honor wall displaying real-time global open-source contribution rankings | [data:geometry/key_areas.geojson#PROV-KEY-002] |
| JZ-08 | Global AI Milestone Corridor Construction | Cultural Landmark / Public Space | Milestone topic selection, enterprise sponsorship | 200-meter linear corridor with 24 milestone sculptures | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-09 | Origin Community AI Talent Apartments | Residential / Ancillary | Land supply, building design | 500 AI talent apartments equipped with AI smart home and community services | [data:geometry/key_areas.geojson#PROV-KEY-002] |
| JZ-10 | Dazhongsi International Roadshow Living Room | Industrial Services / Commercial | Building renovation, brand operations | Flexible convertible space accommodating 500 people, with 8-language simultaneous interpretation | [data:geometry/key_areas.geojson#PROV-KEY-003] |
| JZ-11 | Data Elements Living Room | Industrial Services / Compliance | Data compliance, transaction rules | Data element display + compliance audit + transaction matching functions | [data:geometry/key_areas.geojson#PROV-KEY-003] |
| JZ-12 | AI Cultural Heritage Digital Protection Station | Cultural / Public Services | Heritage data, digital technology | 3D digital protection + virtual restoration experience of Jingzhang Railway | [data:geometry/green_space.geojson#GREEN-001] |

### Phased Implementation Plan

Phasing follows [depth:phasing_implementation], with spatial basis [data:geometry/phasing.geojson#PHASE-001] (Phase 1 area approximately 458.7 hectares):

**Near-Term (0-2 years): Pilot Launch Period**
- Lightweight facilities: Edge-side computing power waystations (3 main nodes), AI wayfinding system, open-source contribution honor wall (pilot version)
- Operations activities: First "Jingzhang AI Innovation Week," open-source community relocation, AI life service model street opening
- Policy support: AI industry support policies, open-source contribution incentive plan, AI talent certification standards

**Mid-Term (2-5 years): Core Construction Period**
- Key projects: Jingzhang AI Memorial Tower, Global AI Milestone Corridor, Zhongzhi Park Qinghe Innovation Interface, Dazhongsi Station pedestrian connectivity
- Spatial renewal: Origin Community achievement transformation street, Dazhongsi International Roadshow Living Room, Zhongzhi Park renovation
- Ecosystem building: National AI testing and verification platform relocation, global AI developer community establishment, AI regulatory sandbox launch

**Long-Term (5-10 years): Ecosystem Maturation Period**
- System improvement: AI Public Security Operation Center, Data Elements Living Room, AI Cultural Heritage Digital Protection Station
- Brand export: Jingzhang AI Innovation Week becomes a top global AI event; Jingzhang AI Symbiotic Corridor becomes a global AI pilgrimage site
- Continuous operations: Regular release of AI innovation index, annual open-source contribution awards, AI Civilization Time Capsule opening ceremony

### Annual Operations System (agent.6)

This proposal constructs an annual AI innovation activity system of **"Four-Season Themes + Monthly Activities + Daily Operations"**:

| Quarter | Theme | Core Activities |
| --- | --- | --- |
| **Spring (Mar-May) · Open-Source Season** | Open-source and Community | Mar: Jingzhang AI Open-Source Gala (open-source contribution awards); Apr: Global AI Developer Marathon (48-hour coding competition); May: AI Open-Source Education Week (university outreach) |
| **Summer (Jun-Aug) · Innovation Season** | Innovation and Industry | Jun: AI Standard Formulation Forum concept (pending institutional authorization); Jul: AI Safety Governance Summit; Aug: Zhongzhi Park AI Product Launch Month |
| **Autumn (Sep-Nov) · Cultural Season** | Culture and Life | Sep: Jingzhang AI Innovation Week (core annual event); Oct: AI Life Experience Day (public open house); Nov: AI and Railway Cultural Dialogue |
| **Winter (Dec-Feb) · Future Season** | Future and Outlook | Dec: AI Civilization Time Capsule Sealing Ceremony; Jan: Annual AI Innovation Index Release; Feb: Global AI Trend Outlook Forum |

**Developer Community Operations**:
- "Jingzhang AI Developer Club": Annual membership system, providing computing power subsidies, open-source resources, and roadshow opportunities
- "AI Open-Source Contributor Plan": In partnership with GitHub/Gitee, top 100 contributors on the Jingzhang leaderboard receive free residency qualification
- "AI Young Scholar Residency Program": 50 global young AI scholars selected annually for 3-6 month residencies

**Long-Term Brand Mechanisms**:
- "Jingzhang AI Innovation Index": Annual release covering dimensions such as AI industry scale, innovation vitality, open-source contribution, and talent density
- "Jingzhang AI Medal": Lifetime honor for global AI contributors, with the first 100 medals planned for future launch (conceptual, not issued)
- "AI Civilization Time Capsule": Sealed with contemporary AI achievements, scheduled to be opened in 2125 (220th anniversary of Jingzhang Railway + 100th anniversary of AI Innovation Belt)

## Metrics, Area Recalculation, and Compliance Matrix

### Core Metrics System

| Metric Category | Metric Name | Value / Status | Data Source |
| --- | --- | --- | --- |
| **Spatial Metrics** | Overall Design Scope Area | ~11,412,825 sqm | [data:geometry/site_boundary.geojson#SITE-001] |
| | Total Key Area Area | ~3,692,893 sqm | [data:geometry/key_areas.geojson#PROV-KEY-001/002/003] |
| | Green Space and Open Space Area | ~2,589,339 sqm | [data:geometry/land_use.geojson#LU-002] |
| | Continuous Park Green Space Area | ~1,408,601 sqm | [data:geometry/green_space.geojson#GREEN-001] |
| | Public Activity Space Area | ~346,167 sqm | [data:geometry/public_space.geojson#PUBLIC-001] |
| | AI R&D Innovation Land Area | ~2,674,562 sqm | [data:geometry/land_use.geojson#LU-001] |
| | Total Building Footprint Area | ~302,609 sqm | [data:geometry/buildings.geojson#BLDG-001] |
| | Total Slow-Travel Corridor Length | ~15,000 m | [data:geometry/roads.geojson#ROAD-001] + design derivation |
| **Ratio Metrics** | Green Space Ratio | 29.9% | Design recommendation, pending regulatory plan confirmation |
| | Public Space Ratio | 3.0% | Design recommendation, pending regulatory plan confirmation |
| | AI Industry Land Proportion | ~23.4% | [data:geometry/land_use.geojson#LU-001] / [data:geometry/site_boundary.geojson#SITE-001] |
| **Operations Metrics** | AI Scenario Node Count | 12 locations | This proposal design |
| | AI Pilgrimage Landmark Count | 3 locations | This proposal design |
| | Annual Event Sessions | ~30 sessions | Operations planning |
| | Developer Community Scale | 10,000+ persons | Operations target |

### Metric Tiered Explanation

Metrics are divided into three categories, following [depth:metrics_recalculation]:
1. **Spatial Metrics That Can Be Directly Recalculated** (as shown in the spatial metrics table above): directly calculated from GeoJSON layers
2. **Control Metrics Pending Official Confirmation**: Floor-area ratio, building height, building density, setback, road redlines, etc., marked as `status=unknown`
3. **Performance Metrics Requiring Continuous Calibration**: AI innovation index, talent density, industry service satisfaction, slow-travel accessibility, etc., requiring continuous operational data support

### Compliance Matrix

The compliance matrix covers Announcement 1.3 (Coordinated Research Scope), 1.4 (Overall Design Scope), 1.5 (Key Areas), and all mandatory tasks from agent.1 through agent.6:
- agent.1 Naming System → Section 2 "Naming System and Visual Identity" herein
- agent.2 Ecosystem Cases → Section 3 "Global AI Innovation Ecosystem Benchmarking" herein
- agent.3 Scenario Cards → Section 6 "AI Scenario Card System" herein
- agent.4 Pilgrimage Landmarks → Section 9 "AI Pilgrimage Landmark Design" herein
- agent.5 Cultural Narrative → Section 9 "Cultural Narrative System" herein
- agent.6 Operations Design → Section 10 "Annual Operations System" herein

The complete compliance matrix is stored in `compliance_matrix.json`, with each task corresponding to chapters, layers, metrics, drawings, and self-check items.

## Risk, Copyright, and Compliance

### Risks and Missing Data

The spatial data of this proposal is based on provisional boundaries. The following items await official data confirmation:
- Official site boundary and key areas polygons
- Regulatory detailed planning conditions (floor-area ratio, building height, road redlines, etc.)
- Current building ownership and structural information
- Municipal utilities and engineering conditions
- Historical and cultural relic unit boundaries and protection requirements
- Traffic flow and public transit operation data

For the complete missing data list, see `missing_data_checklist.csv`; for risk assessment, see [depth:risk_missing_data] and [data:geometry/site_boundary.geojson#SITE-001].

### Copyright and Compliance

- The main proposal file is in Chinese; the translated version can be found in `proposal.en.md`
- The sources and authorization status of all images, drawings, data, and code assets are described in `sources.json` and `report/copyright_statement.md`
- Intellectual property of the logo design, brand name, and cultural narrative belongs to the submitting team
- Materials involving AI enterprise brands, open-source platform data, historical images, etc., have been marked with rights clearance status
- HTML pages do not load remote scripts, remote map tiles, remote fonts, or external APIs

### Non-Commitment Statement

This proposal is a design submission and does not claim official approval, authorized regulatory planning, final land ownership, or guarantee of implementation. The AI agent is responsible for the originality of the design content, the accuracy of spatial data citations, and expression compliance; maintainers and professional reviewers may revise or reject based on self-check results and compliance matrix requirements.

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- data/processed/agent_task_requirements.csv
- data/processed/source_use_matrix.csv
- data/processed/missing_data_checklist.csv
- Complete machine index: see `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, and `design_depth_matrix.json`
- Global AI ecosystem case references: official public materials of Silicon Valley AI Cluster, Tsukuba Science City, London Tech Quarter, Station F Paris, Shenzhen AI Town, Zhongguancun AI Cluster, Seattle AI Corridor, Singapore AI District
- Bibliographic entries in this section are registered according to the site package; for complete sources and permissions, see the structured source list [source:SITE-PACKAGE]

---

## Public Space Component Library (agent.4 supplement)

> The following component library is a typified list at the conceptual design stage. Actual selection, configuration, and construction must be determined after regulatory plan confirmation, site condition survey, and professional engineering review. All components are marked with non-implementable conditions.

### Component Type Matrix

| Component ID | Component Type | Applicable Space | Service Target | Data/Energy Needs | Accessibility Requirements | Maintenance Responsibility | Non-Implementable Conditions |
|---|---|---|---|---|---|---|---|
| PC-01 | AI Interactive Guide Post | Public space nodes, key area entrances | All visitors | 4G/5G/WiFi; mains power; low-power edge computing | Voice interaction, Braille buttons, height ≤1.2m | Proposed: property management (pending authorization) | Cannot deploy without network or power |
| PC-02 | Open-Source Contribution Display Wall | Origin Community central plaza | Developers, public | LED screen; API (GitHub/Gitee); mains power | Audio description for visually impaired; adjustable viewing angle | Proposed: open-source community org (pending authorization) | Cannot implement without open-platform API authorization |
| PC-03 | Slow-Mobility Breakpoint Diagnostic Stake | Blue-green slow-travel loop | Slow-mobility users, management | Public data + manual review; offline sensors; solar | Wheelchair accessible, tactile maps | Proposed: urban management authority (pending authorization) | Requires privacy assessment if involving personal location data |
| PC-04 | AI Safety Governance Display Podium | Key area public spaces | Enterprises, government, public | Model testing data (desensitized); mains power; edge computing | Multi-language support, sign-language video | Proposed: AI safety governance institution (pending authorization) | Conceptual display only until safety standards body is confirmed |
| PC-05 | Low-Carbon Computing Waystation | Zhongzhiyuan, Dazhongsi industry nodes | Enterprises, developers | Distributed PV + storage; liquid cooling; network | Universal accessible access | Proposed: energy service enterprise (pending authorization) | Cannot construct before energy capacity assessment |
| PC-06 | Talent Life Service Kiosk | Origin Community, community service zones | AI talent, residents | Public service data (desensitized); mains power | Accessible service window, voice assistance | Proposed: talent service agency (pending authorization) | Requires clear legal basis when involving personal data |
| PC-07 | Jingzhang Memory Interactive Installation | Jingzhang Heritage Park vitality belt | All visitors | Historical archives (public); solar; offline storage | Multi-sensory experience (visual + tactile + auditory) | Proposed: cultural heritage authority (pending authorization) | Requires approval when involving protected heritage structures |
| PC-08 | Public Safety Emergency Post | Public space nodes | Management, public | Public space cameras (desensitized); emergency communication | One-touch alarm height ≤1.0m; flash alert | Proposed: emergency management authority (pending authorization) | Cannot activate without emergency management authorization |

### Component-to-Key-Area Mapping

| Key Area | Applicable Components | Corresponding Scenario Cards |
|---|---|---|
| Zhongzhiyuan AI Innovation Acceleration Zone | PC-01, PC-05, PC-08 | Scenario 02, 08, 10 |
| Beijing AI Origin Community | PC-01, PC-02, PC-06, PC-07 | Scenario 01, 04, 09 |
| Dazhongsi AI Industry Cluster Zone | PC-01, PC-04, PC-05, PC-08 | Scenario 05, 07, 10 |

### Non-Implementable Conditions Summary

All components above are typified suggestions at the conceptual design stage. Actual selection, configuration, and construction must satisfy the following preconditions:
1. Site condition survey and professional engineering review completed
2. Regulatory plan confirmation and municipal infrastructure availability
3. Privacy impact assessment completed for components involving personal data
4. Written authorization obtained for components involving third-party APIs/platforms
5. Cultural heritage authority approval for components involving protected heritage
6. Emergency management authorization for public safety components

---

## Scenario Governance Template (Unified Supplement)

> This template applies to all 12 AI scenario cards. Each scenario must supplement governance information according to this template. All technical governance chains are conceptual design stage statements and do not constitute legal basis or risk assessment conclusions.

### Unified Governance Template

| Dimension | Content Requirement | Scope |
|---|---|---|
| **Input** | Data source, data type, whether personal/sensitive data is involved | All 12 scenarios |
| **Processing** | Algorithm/model overview, processing location (edge/cloud), governance mechanism | All 12 scenarios |
| **Output** | Service/product form, target users, feedback mechanism | All 12 scenarios |
| **Spatial Carrier** | Physical location, facility requirements, mapping to key areas/nodes | All 12 scenarios |
| **Responsible Entity** | Proposed data controller (pending authorization), processor, operator | All 12 scenarios |
| **Human Review** | Review mechanism, reviewer qualification, review frequency | All 12 scenarios |
| **Failure Degradation** | Service degradation plan, non-digital alternative routes | All 12 scenarios |
| **Exit Conditions** | Scenario termination conditions, data deletion audit, post-exit handling | All 12 scenarios |
| **Validation Metrics** | Testable KPIs, audit cycle, third-party assessment requirements | All 12 scenarios |

### High-Risk Scenario Notes

The following scenarios involve personal/sensitive data and are currently conceptual only. No technical measure (including federated learning, differential privacy, instant deletion, etc.) substitutes for legal basis and risk assessment:

- **Scenario 04 Talent Life Steward**: Involves residential, educational, and health personal data; privacy impact assessment required before collection
- **Scenario 09 Slow-Mobility Breakpoint Diagnosis**: Involves mobile phone location data; must inform users, obtain consent, and set retention periods
- **Scenario 11 Public Safety Dispatch**: Involves public space camera collection; must comply with PIPL and Public Security Video Image Information System Management Regulations
- **Scenario 12 Health and Education Services**: Involves health records and education data (sensitive personal information); explicit consent and purpose limitation required

### Privacy Statement Corrections

1. **De-identification is not anonymization**: All data processing marked "desensitized" in this proposal refers only to technical de-identification, not legal anonymization. De-identified data may still constitute personal information under PIPL.
2. **Data controller pending confirmation**: The data controller identity for all scenarios involving personal data requires confirmation based on the actual operating entity. All "proposed collaborative entities" are conceptual suggestions, not authorized parties.
3. **Federated learning and differential privacy are conceptual**: Technologies mentioned are conceptual stage direction suggestions, not deployed solutions, and do not replace legal compliance assessment.
4. **Instant video deletion**: "Instant video deletion" in public safety scenarios is a design goal; actual deletion strategy must comply with statutory retention period requirements.

---

## Accessibility and Inclusion Matrix

> This matrix covers older people, children, low-digital-literacy users, non-smartphone users, mobility/sensory/cognitive disabilities, and non-Chinese speakers. Current stage: conceptual design suggestions. Actual standards must follow national accessibility codes and local implementation rules.

### Inclusion Matrix

| User Group | Non-Digital Alternative | On-Site Human Assistance | Affordability | Accessible Wayfinding | Complaint/Appeal Channel | Testable Acceptance Criteria |
|---|---|---|---|---|---|---|
| **Older people** | Service window, paper maps, phone hotline | Dedicated staff at service centers | Free public services; senior discounts | Tactile maps, voice navigation, large-print signage | Phone, on-site, community rep | Response target ≤10 min (candidate KPI, pending operations testing); font target ≥36pt (candidate KPI, pending accessibility code review) |
| **Children** | Family routes, non-digital interactive installations | Activity/education staff accompaniment | Free children's activity areas | Color-coded routes, signage ≤1.2m height | Parent feedback forms, community | Safety distance signage 100%; safety-tested installations |
| **Low-digital-literacy users** | Service window, paper guides, phone hotline | Volunteers at service centers | All public services free | Icon-based navigation, voice assistance | Phone, on-site | Human service coverage target ≥80% of public nodes (candidate KPI, pending staffing confirmation) |
| **Non-smartphone users** | Paper maps, IC/RFID cards, on-site terminals | Device lending at service centers | Lending free | Physical signage system, tactile maps | Phone, written complaint | Non-digital service covers all core nodes |
| **Mobility-impaired** | Accessible routes, wheelchair-reachable paths | On-site assistants (bookable) | Free accessible facilities | Wheelchair routing, accessible signage | Phone, on-site | Accessible route full coverage of core public spaces (candidate KPI, pending accessibility design review) |
| **Visually impaired** | Braille maps, voice navigation, tactile signage | Guide-dog-friendly policy, human guidance | Free assistance services | Full voice navigation, Braille signage | Phone, voice feedback | Voice navigation covers core routes; Braille at core nodes |
| **Hearing impaired** | Text signage, sign-language video, vibration alerts | Sign-language service (bookable) | Free sign-language service | Text navigation, visual alert system | Text feedback, online complaint | Sign-language response ≤24h; text signage at core nodes |
| **Cognitive impairments** | Simplified routes, icon-based signage, quiet zones | Companion policy, quiet zone provision | Free quiet zones | Simplified navigation, sensory-friendly design | Guardian feedback, community rep | Safe zone in each key area |
| **Non-Chinese speakers** | Multi-language signage (EN/JP/KO), translation service | Translation service (bookable) | Basic multi-language signage free | Multi-language navigation system | Multi-language complaint channel | EN signage at all core nodes; translation ≤48h response |

### Non-Digital Alternative Routes Summary

All AI scenarios and public space services must provide non-digital alternative routes:
1. Human service windows: at least 1 per key area, service hours ≥8 hours/day
2. Paper materials: multi-language maps, service guides, accessible route maps updated regularly
3. Phone hotline: covers all service functions, supports multi-language and voice assistance
4. Physical signage system: independent of digital systems, covers all core public space nodes

> This accessibility and inclusion matrix is a conceptual design stage suggestion. Actual implementation must follow the Accessibility Design Code GB 50763, Information Accessibility General Technical Specifications, and other national codes and local implementation rules, and be reviewed by professional accessibility consulting institutions.

