---
title: "AutoJingZhang: L3-L4 Autonomous Driving Network & Full-Domain Unmanned Mobility System"
author_github: "Wa1nutP"
language: "en"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "This proposal positions the Centennial Jingzhang AI Innovation Belt as the world's first full-domain L3-L4 autonomous driving demonstration area. All private vehicles are prohibited from the core zone, and all travel needs are served by autonomous shuttle systems, creating a future mobility paradigm of 'Human-AI-City' symbiosis."
tracks: ["ai-traffic-walkability", "robotics-autonomous-mobility"]
scenarios: ["ai-traffic-walkability", "robot-delivery-low-speed"]
iteration: "v1.0"
---

# AutoJingZhang: L3-L4 Autonomous Driving Network & Full-Domain Unmanned Mobility System

## Design Basis and Document Checklist

This proposal takes the "Centennial Jingzhang AI Innovation Belt Urban Design International Solicitation Pre-qualification Announcement" as the primary basis, and uses the temporary provisional boundaries, enums, metrics, and source registry in `brief/site-package/` as machine-readable references [source:SITE-PACKAGE]. The design task responds to announcements 1.3, 1.4, and 1.5 regarding comprehensive requirements for transportation systems, industrial spaces, and public services [source:OFFICIAL-ANNOUNCEMENT].

Data usage boundary statement [source:BOUNDARY-PROVISIONAL]:
- This proposal uses temporary provisional boundaries; all spatial data must be recalculated after official boundaries are released
- Provisional boundaries shall not be used as official redlines, approval basis, or precise area basis
- Data gaps shall not block content scoring but must be clearly marked

![Data Evidence Chain and Submission Package Relationship](assets/figures/key-areas.en.png)

**Core Innovation**: Position the Jingzhang Innovation Belt as a "Full-Domain Autonomous Driving Network" - all roads within the area are transformed into L3-L4 autonomous driving exclusive lanes, private vehicles are prohibited from the core zone (~2.8km²), and all residents, employees, and visitors meet their travel needs through autonomous shuttle systems.

## Three-Layer Scope Work Framework

The proposal organizes work according to the three-layer scope announced [source:PROJECT-OFFICIAL-ANNOUNCEMENT]:

| Layer | Area | Work Objective | Core Strategy |
|-------|------|----------------|---------------|
| Overall Research Scope | 43.6km² | AI industry ecosystem & future mobility forms | Build full-domain autonomous driving network system |
| Overall Design Scope | 11.4km² | Urban renewal & regulatory plan depth design | L3-L4 road transformation + shuttle system |
| Key Area Scope | 368.4ha | Three area detailed designs | Differentiated autonomous driving scenario implementation |

The three-layer work is not a collection of disconnected drawings but an implementation sequence from strategy to detail: overall research determines the overall framework and regional coordination strategy for the autonomous driving network; overall design implements the framework into road transformation, station layout, and transfer systems; key area detailed designs verify the feasibility and perceptibility of specific nodes.

![Three-Layer Scope and Spatial Work Framework](assets/figures/land-use-structure.en.png)

## Overall Research Scope: Industry & Future Urban Research

### Belt Overall Concept: AutoJingZhang

**Naming and Logo Direction**: The proposal suggests "AutoJingZhang" as the belt brand name, with a logo design that fuses the classic "herringbone" railway track imagery of the Jingzhang Railway with the streamlined silhouette of autonomous vehicles, creating a recognizable visual symbol with international spread [source:AGENT-TASKBOOK].

**Three Major Positioning Integration**:
- **Centennial Jingzhang Cultural Belt**: Autonomous driving network along the Jingzhang Heritage Park creates a spatio-temporal dialogue between historic railway culture and future mobility technology
- **Urban AI Life Experience Belt**: Residents experience L3-L4 autonomous driving in daily travel, realizing the "Mobility as a Service" (MaaS) concept
- **AI Integration Innovation Belt**: Autonomous driving network becomes a real-world experimental field for AI technology testing, validation, and iteration

**Five Functional Carriers**:
1. AI Full-Stack Self-Innovation System - Full-chain innovation in autonomous driving chips, algorithms, and sensors
2. World-Class AI Innovation Ecosystem - Clustering of autonomous driving companies, data services, and intelligent transportation solutions
3. AI+ Scenario Empowerment New Paradigm - Multi-scenario integration of autonomous shuttles, unmanned delivery, and intelligent logistics
4. Intelligent AI Vibrant City - Full-domain unmanned mobility improves urban efficiency and vitality
5. AI Governance Global Discourse - Export of autonomous driving governance rules, standards, and safety regulations

### Global AI Innovation Ecosystem Case Studies

The proposal studies 8 typical global autonomous driving and intelligent transportation cases [source:AGENT-TASKBOOK][standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]:

| Case | Core Experience | Transferable Strategy |
|------|-----------------|----------------------|
| Waymo One (Phoenix) | Commercial driverless taxi service | Shuttle bus operation model reference |
| Cruise (San Francisco) | Urban complex road autonomous driving | Core zone unmanned management experience |
| Singapore Smart Nation | National-level MaaS integration | Mobility as a Service platform architecture |
| Xiong'an New Area | New city autonomous driving priority | Synchronized autonomous driving infrastructure planning |
| Tokyo MaaS Integration | Multi-modal seamless transfer | Rail-shuttle-pedestrian system design |
| Helsinki Whim | On-demand mobility subscription | Shuttle system charging model |
| Dubai Unmanned Testing | Autonomous driving in high temperatures | Extreme scenario technology validation |
| Dutch Unmanned Shuttle | Fixed-route autonomous driving feeder | Park autonomous driving shuttle reference |

## Overall Design Scope: Urban Renewal & Regulatory Plan Depth Urban Design

### Core Transportation Strategy: Full-Domain L3-L4 Autonomous Driving Network

**Core Proposal**: Transform approximately 85% of road capacity within the overall design scope into L3-L4 autonomous driving exclusive lanes, comprehensively prohibit private vehicles in the core zone (~2.8km²), and serve all travel needs through autonomous shuttle systems.

This proposal is based on the following design judgments:
1. **Space Release**: After canceling private vehicle parking and lanes, approximately 32% of land can be released for greening and public space
2. **Efficiency Improvement**: L3-L4 autonomous vehicles can improve traffic efficiency by 40-60% through connected vehicle coordination
3. **Safety Improvement**: Autonomous driving can eliminate human error, expected to reduce traffic accidents by over 70%
4. **Experience Upgrade**: Residents don't need to drive or find parking; travel becomes time for work or rest

**Road System Transformation Strategy** [data:geometry/roads.geojson#ROAD-001]:

| Road Type | Transformation Strategy | Permitted Vehicles | Design Speed |
|------------|-------------------------|-------------------|--------------|
| Autonomous Main Corridor | Along Jingzhang Heritage Park, 2-lane bidirectional | L3-L4 shuttle buses, unmanned delivery | 40km/h |
| Autonomous Secondary Roads | Cover major industrial and residential areas, 1-2 lanes | L3-L4 shuttle buses, autonomous taxis | 30km/h |
| Slow-Travel Priority Streets | Core commercial and public spaces, 0 lanes | Pedestrians, bicycles, slow EVs | - |
| Emergency Service Lanes | Reserved on all roads, marked control | Emergency vehicles, special permit vehicles | Unlimited |

![Mobility, Slow-Travel & Blue-Green Public Space Composite System](assets/figures/mobility-bluegreen.en.png)

### Land Use and Building Scheme [data:geometry/land_use.geojson#LU-001]

| Land Use Type | Area (ha) | Ratio | Autonomous Driving Scenario |
|---------------|-----------|-------|----------------------------|
| AI R&D Innovation | 319.2 | 28% | Exclusive shuttle stations, test vehicle parking |
| Jingzhang Heritage Park Green | 364.8 | 32% | Green travel axis, autonomous corridor passes through |
| Industrial Service Commercial | 228.0 | 20% | Unmanned delivery endpoints, unmanned retail stations |
| Residential Community Support | 228.0 | 20% | Community shuttle terminals, convenience service points |

Building scale to be refined after formal regulatory plan conditions are confirmed [source:A-REGULATORY-001]. Current proposal suggests:
- New buildings' ground floors reserve autonomous vehicle drop-off zones
- Blocks include autonomous vehicle charging facilities
- Underground spaces set up shuttle terminals and maintenance centers

## Key Area Detailed Design

Three key areas propose differentiated design strategies based on the autonomous driving network [data:geometry/key_areas.geojson#PROV-KEY-001][data:geometry/key_areas.geojson#PROV-KEY-002][data:geometry/key_areas.geojson#PROV-KEY-003]:

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.en.png)

### Zhongzhi Park AI Self-Innovation Acceleration Zone

**Positioning**: Autonomous driving technology source and testing core

**Autonomous Driving Scenario Design**:
- **Beihang-BUPT Autonomous Driving Test Corridor**: Connects university labs with industrial parks, providing real-world road testing environment
- **Qinghe Waterfront Autonomous Driving Display**: Lays out autonomous sightseeing routes along Qinghe River, demonstrating technological capabilities
- **Closed Testing Field**: Sets up L4-level autonomous driving closed testing area for enterprise technology verification

**Transportation Organization**:
- Main corridor along Qinghe River creates "technology display corridor"
- Sets up 3 L3-L4 shuttle stations serving university teachers, students, and park employees
- Long-term reserves autonomous driving ray extending to North 5th Ring Road

### Beijing AI Origin Community

**Positioning**: Intimate contact interface between autonomous driving and people

**Autonomous Driving Scenario Design**:
- **AI Origin Central Hub**: Sets up autonomous shuttle bus terminal, integrated with pedestrian plaza
- **Community Shuttle Grid**: Sets shuttle stations at 200m intervals, achieving "door-to-door" service
- **Late-Night Autonomous Driving**: Provides safe, punctual late-night shuttle service for late-night workers

**Transportation Organization**:
- Core zone approximately 1.2km² set as "car-free pedestrian priority area"
- Shuttle buses station at pedestrian area edges, any destination reachable within 5 minutes' walk
- Sets unmanned retail, unmanned delivery pilots, achieving "last mile" unmanned

### Dazhongsi AI Industry Cluster

**Positioning**: Autonomous driving commercial service and TOD integration

**Autonomous Driving Scenario Design**:
- **Dazhongsi Station Autonomous Driving Hub**: Integrated design with metro station, achieving seamless rail-shuttle transfer
- **Intelligent Delivery Corridor**: Connects commercial facilities and office buildings, achieving full unmanned delivery coverage
- **Enterprise Exclusive Shuttle**: Provides customized autonomous driving shuttle services for key enterprises

**Transportation Organization**:
- Within 800m radius of stations, private vehicles comprehensively prohibited
- Sets circular autonomous driving shuttle bus routes, covering all functions around stations
- Commercial delivery uniformly uses autonomous delivery vehicles, centralized nighttime delivery

## AI Innovation Ecosystem, Talent Profile & AI+ Scenarios

### User Profiles and Service Design

| User Type | Typical Needs | Autonomous Driving Service Response |
|-----------|--------------|-----------------------------------|
| University teachers/students | Commute, experiments, library, cafeteria | Campus-dormitory-teaching building shuttle, 24h service |
| R&D personnel | Overtime, night travel, safety | Late-night shuttle, door-to-door pickup |
| Surrounding residents | Grocery, medical, childcare | Community shuttle, short-distance transfer |
| Visitors/tourists | Sightseeing, visiting, shopping | Autonomous sightseeing, voice guide |
| Delivery needs | Express, takeout, goods delivery | Unmanned delivery vehicles, smart locker pickup |

### AI Scenario Cards (12 cards)

| ID | Scenario Name | Spatial Carrier | Design Description |
|----|---------------|----------------|-------------------|
| S-01 | Autonomous Shuttle Bus | Full-domain main corridor | L3 autonomous buses, fixed routes, high-frequency schedules |
| S-02 | On-Demand Shuttle Call | Community/park | L4 autonomous, on-demand call, flexible routes |
| S-03 | Late-Night Safe Shuttle | Residential area | 24h service, ensures night travel safety |
| S-04 | Campus Shuttle Bus | Zhongzhi Park area | Circular shuttle, connects teaching buildings and dormitory areas |
| S-05 | Rail Shuttle Bus | Dazhongsi Station | Last-mile shuttle, seamless transfer |
| S-06 | Unmanned Delivery Express | Commercial/residential | Autonomous delivery vehicles, delivery locker pickup |
| S-07 | Unmanned Retail Mobile Store | Public spaces | Autonomous mobile retail vehicles, on-demand service |
| S-08 | Intelligent Logistics Distribution | Industrial area | Unmanned trucks, centralized nighttime delivery |
| S-09 | Slow-Travel Breakpoint Recognition | Full-domain | Autonomous vehicles perceive slow-travel system breakpoints |
| S-10 | Road Health Monitoring | Full-domain roads | Autonomous vehicles carry sensors, monitor road conditions |
| S-11 | Emergency Autonomous Driving | Full-domain | Autonomous vehicles respond quickly in emergencies |
| S-12 | Sightseeing Autonomous Driving | Jingzhang Park | Autonomous sightseeing route along heritage park |

### Industrial Testing and Validation Scenarios (3)

| ID | Testing Scenario | Validation Objective | Location |
|----|----------------|---------------------|----------|
| T-01 | L3-L4 Mixed Traffic Flow Testing | Validate safety in pedestrian and non-motorized vehicle environments | Full-domain main corridor |
| T-02 | Shuttle Bus Operation Efficiency Testing | Validate capacity, schedules, transfer efficiency | AI Origin Community |
| T-03 | Unmanned Delivery Business Model Testing | Validate cost, efficiency, user acceptance | Industrial service area |

This chapter covers AI innovation ecosystem and talent profile [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE][depth:existing_conditions_diagnosis][metric:key_area_count][metric:shuttle_stop_count][metric:shuttle_stop_density].[data:geometry/site_boundary.geojson#SITE-001]

## Land Use, Building Scale & Retention/Renovation/Demolition Scheme

This section describes design intent for land use layout and building scale [source:A-REGULATORY-001][data:geometry/buildings.geojson#BLDG-001][data:geometry/constraints.geojson#CONSTRAINT-001]:

**Retention/Renovation/Demolition Judgment Principles**:
- Inefficient buildings near autonomous corridors and stations prioritized for renovation
- Historic buildings and cultural heritage preserved and integrated into autonomous driving landscapes
- New buildings must meet autonomous driving infrastructure reservation requirements
- Priority retention of existing buildings with industrial transformation potential
- Dangerous buildings and those not meeting safety standards included in demolition plans

**Land Use Layout Description**:
This proposal divides land within the overall design scope into four major types: AI R&D innovation land accounts for 28%, mainly distributed in Zhongzhi Park and industrial service clusters, for carrying core functions such as autonomous driving technology R&D, AI algorithm innovation, and intelligent connected equipment manufacturing; Jingzhang Heritage Park green space accounts for 32%, serving as the regional green spine and historical cultural display belt, and as the main carrier for autonomous driving sightseeing corridors; industrial service commercial land accounts for 20%, arranged around rail stations and autonomous driving hubs, forming TOD-oriented high-density development nodes; residential community support land accounts for 20%, providing residential and public service guarantees for university teachers, R&D personnel, and original residents.

**Building Scale Description**: Current proposal does not set specific floor area ratios and building heights; these metrics need to be determined based on formal regulatory plan conditions [source:GB-50289-2016][source:GB-50337-2018]. Design suggestions:
- New R&D buildings: reserve autonomous vehicle drop-off areas, charging facilities, and vehicle-road communication equipment interfaces
- Commercial buildings: underground set up unmanned delivery distribution centers, ground floors set up smart delivery lockers and pickup stations
- Residential buildings: ground floors set up convenience shuttle stations, shared autonomous vehicle parking areas
- Existing building renovations: install autonomous driving adaptation facilities including charging piles, sensor brackets, and communication modules

**Retention/Renovation/Demolition Classification Suggestions** [data:geometry/phasing.geojson#PHASE-001]:
- Retention category: Jingzhang Railway historic buildings, cultural heritage units, landmark-value existing buildings
- Renovation category: Low-rise buildings near autonomous corridors, structurally sound industrial buildings, old factories with renovation potential
- Demolition category: Dangerous houses, illegal buildings occupying road red lines, buildings seriously affecting autonomous corridor implementation

**Building Style Control**: New and renovated buildings should emphasize coordination with autonomous driving landscapes, encourage setting up technology display interfaces, using building facades as display windows for autonomous driving technology and AI culture. Building signage systems should be compatible with autonomous vehicle recognition needs, setting high-precision positioning reference points and V2X communication facility interfaces. Overall building style should reflect the "technology sense, future sense, humanization" AI new city characteristics.

## Transportation, Rail, Municipal & Public Service Facilities

### Transportation System Design [data:geometry/roads.geojson#ROAD-001]

**Autonomous Driving Network Architecture**:
- One vertical: North-south autonomous driving main corridor along Jingzhang Heritage Park
- Three horizontals: Three east-west autonomous driving connection lines
- Multiple branches: Autonomous driving branches covering various functional areas
- Central ring: Autonomous driving ring in AI Origin Community

**Shuttle Station Layout**: With 200m service radius, set approximately 120 autonomous shuttle stations within the full domain, ensuring any location can reach the nearest station within 5 minutes.

**Rail Connection**: Dazhongsi Station set as "Rail-Shuttle" integrated hub, achieving:
- Metro exit within 30 seconds to autonomous shuttle transfer
- Shuttle schedules coordinated with rail arrival/departure times
- Seamless multi-modal travel experience

### Municipal Infrastructure Suggestions

Autonomous driving network requires supporting municipal facilities [source:A-ENGINEERING-001]:
- **Charging facilities**: Autonomous vehicle charging piles every 500m along routes
- **Communication facilities**: Full C-V2X roadside unit coverage, supporting vehicle-road coordination
- **Perception facilities**: Cameras, radar, and other perception equipment supporting autonomous driving and high-precision positioning
- **Control center**: Regional autonomous driving dispatch and monitoring center

## Blue-Green Space, Public Space & Urban Character [depth:blue_green_public_space][depth:municipal_new_infrastructure][standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

### Blue-Green Space Design [data:geometry/green_space.geojson#GREEN-001]

**Jingzhang Heritage Park Green Belt**: Using space released from canceled motor vehicle lanes, the Jingzhang Heritage Park is developed as:
- Continuous and connected green pedestrian space
- Embedded autonomous driving sightseeing corridor
- Historic railway cultural display belt

**Qinghe Waterfront Green Belt**:
- Increase green coverage along waterfront spaces
- Set autonomous driving sightseeing and waterway transportation stations
- Form blue-green intertwined ecological network

![Mobility, Slow-Travel & Blue-Green Public Space Composite System](assets/figures/mobility-bluegreen.en.png)

### Urban Character Guidance

**Three Major Cultural Integration**:
1. **Jingzhang Railway Culture**: Preserve railway symbols, integrate into autonomous driving landscape design
2. **Zhongguancun Innovation Culture**: Technology sense and future sense in urban furniture and signage systems
3. **AI New Culture**: Digitalized, intelligent, humanized urban spaces

**Building Style Control** (pending formal regulatory plan conditions):
- New buildings should consider visual coordination with autonomous vehicles
- Encourage setting up autonomous driving technology display interfaces
- Signage systems should be compatible with autonomous vehicle recognition needs

## Renewal Project List, Implementation Policies & Phasing Plan [depth:renewal_project_list][depth:phasing_implementation][depth:risk_missing_data][depth:three_level_scope_framework][standard:PROJECT-OFFICIAL-ANNOUNCEMENT]

### Implementation Project List

| Project ID | Project Name | Type | Main Dependencies | Implementation Subject |
|-----------|--------------|------|-------------------|----------------------|
| JZ-A01 | Jingzhang Autonomous Driving Main Corridor | Transportation infrastructure | Road renovation, charging facilities, communication facilities | Government/platform company |
| JZ-A02 | AI Origin Shuttle Hub | Transportation hub | Rail connection, station construction, operation system | Government/rail company |
| JZ-A03 | Full-Domain Shuttle Station Network | Transportation facilities | 120 stations, signage system, operation system | Platform company |
| JZ-A04 | Core Zone Car-Free Renovation | Transportation control | Traffic control facilities, enforcement system | Traffic management department |
| JZ-A05 | Unmanned Delivery Pilot | New infrastructure | Delivery vehicles, dispatch system, delivery lockers | Logistics enterprises |
| JZ-A06 | Autonomous Driving Dispatch Center | Operation facilities | Construction, IT systems, personnel | Operation platform |

### Phased Implementation Plan

| Phase | Time | Main Objectives | Milestones |
|-------|------|----------------|-----------|
| Phase 1 | Years 1-3 | Main corridor first | Jingzhang autonomous driving main corridor opens, 50 stations operate |
| Phase 2 | Years 4-6 | Full-domain network | All main and secondary roads renovated, 120-station network shaped |
| Phase 3 | Years 7-10 | Intelligent upgrade | Full-domain AI traffic governance, unmanned delivery normalized |

**Operation Mode Suggestions**:
- Government-led infrastructure investment and construction
- Introduce platform companies responsible for operation services
- Implement "Mobility as a Service" (MaaS) charging model
- Government provides initial operation subsidies

This chapter covers renewal projects and phased implementation [standard:MOHURD-CONTROL-DETAILED-PLANNING][standard:MOHURD-URBAN-DESIGN-MEASURES][depth:development_intensity_controls][depth:height_massing_character][depth:land_use_layout][depth:metrics_recalculation][depth:overall_spatial_structure][depth:retain_renovate_demolish][depth:three_key_area_detailed_design][depth:traffic_rail_slow_parking][metric:announced_overall_design_area_sqm][metric:green_ratio][metric:key_area_1_recalc_sqm][metric:key_area_2_recalc_sqm][metric:key_area_3_recalc_sqm].[data:geometry/site_boundary.geojson#SITE-001]

## Metrics System, Area Recalculation & Compliance Matrix

### Core Metrics Design [metric:site_area_sqm][metric:autonomous_road_ratio][metric:public_space_ratio][metric:green_ratio]

| Metric Name | Design Value | Basis | Status |
|-------------|--------------|-------|--------|
| Overall Design Scope Area | 11.4km² | Announcement | Known (temporary boundary) |
| Autonomous Driving Network Coverage | 85% | Design target | Design proposal |
| Shuttle Station Density | 120 stations/11.4km² | 200m service radius | Design proposal |
| Green Space Ratio | 17.57% | [data:geometry/green_space.geojson] | Known (spatial recalculation) |
| Public Space Ratio | 1.75% | [data:geometry/public_space.geojson] | Known (spatial recalculation) |

![Core Metrics Recalculation and Evidence Chain](assets/figures/metrics-evidence.en.png)

### Compliance Matrix

This proposal covers the following announcement tasks [source:COMPLIANCE-MATRIX]:

| Task ID | Task Name | Covered Chapter | Evidence Layer |
|---------|-----------|-----------------|----------------|
| 1.3.1 | Build world-class AI innovation ecosystem | Overall research scope industry research | [data:geometry/land_use.geojson] |
| 1.3.2 | Build AI new urban forms | Overall design scope | [data:geometry/roads.geojson] |
| 1.3.3 | Create AI talent high-quality urban area | Key area detailed design | [data:geometry/key_areas.geojson] |
| 1.5.2.3 | Transportation rail municipal supporting facilities | Transportation system design | [data:geometry/roads.geojson] |
| 1.5.3.1-3 | Three key area designs | Key area detailed design | [data:geometry/key_areas.geojson] |

![Three Key Areas Design Map](assets/figures/key-areas.en.png)

## Risks, Copyright & Compliance Statement [depth:risk_missing_data][standard:PROJECT-OFFICIAL-ANNOUNCEMENT]

### Design Boundary Statement

All spatial implementation suggestions in this proposal are **concept suggestions, reference schemes, or schemes for professional team further study**, not substituting formal planning, not constituting government approval conclusions [source:BOUNDARY-PROVISIONAL]:

- Road red lines, regulatory metrics, building heights, etc., need to be determined based on formal approval documents
- Autonomous driving technology feasibility needs professional engineering evaluation
- Implementation schedule, investment scale, and policy support need government decision confirmation

### Major Risk Description

| Risk Type | Risk Level | Response Strategy |
|-----------|------------|------------------|
| Technology risk | Medium | Phased implementation, progressive validation |
| Policy risk | Medium | Strengthen policy coordination, strive for pilot support |
| Public acceptance | High | Sufficient communication, progressive promotion, ensure service quality |
| Implementation complexity | High | Phased implementation, prioritize experience zone construction |

### Data and Copyright Statement

- All data used in this proposal comes from public materials and temporary provisional data
- All AI scenarios follow privacy protection and data minimization principles
- Proposal does not include unauthorized trademarks, portraits, or copyrighted materials

## AI Agent Task Response

This proposal fully responds to six tasks for AI agents [source:AGENT-TASKBOOK]:

| Task ID | Task Name | Proposal Response |
|---------|-----------|------------------|
| agent.1 | Overall concept and logo design | "AutoJingZhang" brand, logo design direction |
| agent.2 | AI innovation ecosystem design | 8 global case studies, autonomous driving industry ecosystem |
| agent.3 | AI+ scenario design | 12 scenario cards, 3 testing scenarios |
| agent.4 | Public space and landmarks | Jingzhang Heritage Park green belt, 3 autonomous driving hubs |
| agent.5 | Cultural narrative | Integration of centennial railway culture and AI new culture |
| agent.6 | Long-term operation design | MaaS operation model, phased implementation plan |

## References

### Official Documents and Design Basis

- [source:PROJECT-OFFICIAL-ANNOUNCEMENT] - "Centennial Jingzhang AI Innovation Belt Urban Design International Solicitation Pre-qualification Announcement"
- [source:SITE-PACKAGE] - brief/site-package/ Design Task Package
- [source:OFFICIAL-ANNOUNCEMENT] - Announcement requirement documents
- [source:BOUNDARY-PROVISIONAL] - Temporary boundary statement
- [source:COMPLIANCE-MATRIX] - Compliance matrix

### Data Sources

- [source:DATA-SRC-AGENT-TASKBOOK-20260518] - Agent taskbook data source
- [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] - Official announcement data source

### Standards and Codes

- [source:GB-50289-2016] - "Code for Urban Engineering Pipeline Comprehensive Planning"
- [source:GB-50337-2018] - "Standard for Planning of Urban Environmental Sanitation Facilities"
- [source:GB-T-51328-2018] - "Standard for Urban Comprehensive Transportation System Planning"
- [source:CJJ-T-296-2022] - "Technical Standard for Autonomous Driving Infrastructure on Urban Roads"
- [source:BJV2-2019] - Beijing autonomous vehicle related specifications

### International Standards

- [source:ISO-22737-2021] - ISO 22737:2021 Autonomous Vehicle System International Standard
- [source:SAE-J3016-2021] - SAE J3016:2021 Driving Automation Classification Standard

### Location and Boundary Data

- [brief/site-package/design_brief.json](file:///d:/Coding/Haidian/haidian-main/brief/site-package/design_brief.json) - Design brief
- [brief/site-package/agent_taskbook.json](file:///d:/Coding/Haidian/haidian-main/brief/site-package/agent_taskbook.json) - Agent taskbook
- [brief/site-package/geometry/provisional_boundaries.geojson](file:///d:/Coding/Haidian/haidian-main/brief/site-package/geometry/provisional_boundaries.geojson) - Provisional boundaries
- [data/source_registry.json](file:///d:/Coding/Haidian/haidian-main/data/source_registry.json) - Source registry

---

All spatial suggestions are concept proposals; professional teams shall refine after formal regulatory plan conditions and official boundaries are released.
