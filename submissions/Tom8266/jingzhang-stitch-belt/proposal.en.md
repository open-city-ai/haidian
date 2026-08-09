---
title: "Jing-Zhang Seam Zone JINGZHANG STITCH BELT Urban Design for the Centennial Jing-Zhang AI Innovation Belt centered on stitching and connecting."
author_github: "Tom8266"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "With \"seam\" as the design main logic: integrate the 9.8 kilometers of the Jing-Zhang railway heritage park, which was left after the railway was buried, from the urban divide into a connected urban public spine that spans east to west and north to south. One spine (Jing-Zhang Heritage Park Vitality Spine), three needles (Zhongzhiyuan Testing and Validation Needle/Original Point Open Source Co-Creation Needle/Dazhongsi Application Transformation Needle), four seam corridors (four horizontal Public Space seam corridors), and two wings (Zhongguancun Technology Services Wing/University Road Higher Education Innovation Wing). Twelve AI scene cards include three Testing and Validation Scenarios, six user profiles, three pilgrimage sites, and an annual operational system. All based on publicly available information and provisional boundaries, to be recalculated upon the release of the Official Planning Boundary."
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.0"
---

# Jing-Zhang Seam Zone JINGZHANG STITCH BELT Urban Design for the Centennial Jing-Zhang AI Innovation Belt centered on stitching and connecting.

> Design main logic: **sew the "stitch" of the century-old railway into the fabric of the city.** The proposal does not draw a new "stripe," but instead, it proposes a comprehensive set of "sewing" spatial actions around the Jing-Zhang Railway site park, which remains after the railway has been buried. These actions include horizontally sewing the two sides of the city that were divided by the railway, vertically connecting the north-south breaks in the park green spine, and turning the rail transit stations into sewing nodes. AI scenarios are to be hung at every sewing point. All spatial suggestions are Conceptual Recommendations, reference proposals, or materials for professional teams to deepen their research, and do not constitute statutory planning conclusions.

## Design Basis and Source List

This proposal is based primarily on the Beijing Municipal Commission of Planning and Natural Resources Haidian Branch's "Qualification Pre-Review Announcement for the International Scheme of the Centennial Jing-Zhang AI Innovation Belt Urban Design" [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509], with the task framework derived from excerpts of the open global agent task book [source:DATA-SRC-AGENT-TASKBOOK-20260518]. It also incorporates provisional rough boundaries registered in the repository [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605], processed fact packs [source:DATA-SRC-PROCESSED-FACT-PACK-20260607], and three professional standards (Urban Design Management Measures [source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES], Detailed Planning Compilation and Approval Measures [source:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING], Land Use and Sea Area Classification Guide [source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311] serves as a machine-readable reference.

The design shall comply with the standard and depth constraints: Announcement 1.3/1.4/1.5 Task Clauses [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], six tasks of the Agent Open Call Taskbook and co-creation charter [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], Urban Design Coordination Requirements [standard:MOHURD-URBAN-DESIGN-MEASURES], Control Detailed Planning Depth Requirements [standard:MOHURD-CONTROL-DETAILED-PLANNING], Land Use Classification Code [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; Architectural Design Depth Regulations (2016 Edition) are listed as pending supplementary materials due to the absence of official documents [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

**Boundary and Area Statement**: The current site does not provide official planning boundaries. This scheme uses the temporary rough boundaries marked as `provisional_constraint` in `brief/site-package/geometry/provisional_boundaries.geojson`. The Overall Design Area is approximately **1,141.3 hectares** (re-calculated in EPSG:4548, [metric:site_area_sqm]), with three key areas using temporary polygons with an approximate area of 192.1/104.3/72.0 hectares [metric:key_area_count]. These boundaries are only for the purpose of scheme generation, visualization, and self-checking; they should not be used as official planning boundaries, approval references, or for precise area re-calculations [data:geometry/site_boundary.geojson#SITE-001]. (Official Planning Boundary) The organizers' data gaps should not impede content scoring. After the official polygon release, all layers and indicators in this scheme must be recalculated as a whole (see [depth:metrics_recalculation]). A complete list of data gaps is available in `assumptions.json` (such as A-BOUNDARY-001, A-CONTROLS-001, etc.) and `report/copyright_statement.md`.

![Evidence Chain and Relationship Diagram with Submission Package](assets/figures/site-overview.png)

## Three-Level Scope Framework

The plan is organized according to the three-tier scope specified in the announcement, progressively conveying the design intent and data evidence [data:geometry/site_boundary.geojson#SITE-001]:

| Level | Scope and Area | Work Objectives | What This Plan Addresses | Data Anchors |
| --- | --- | --- | --- | --- |
| Coordinated Research Area | 43.6 km² (North Fifth Ring Road—West Straight Street, Jingzhan Expressway—Wanquan River Road) | AI Industry Ecology and Future City Form | Three Zones and Two Wings Synergistic Loop, 6 Global Case Studies, Naming System | [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509], [depth:industry_future_city_research] |
| Overall Design Area | 11.4 km² (Jing-Zhang Ruins Park Surrounding 1-2km Urban Area and Industrial Zone) | Master Plan for Deep Urban Renewal | One Ridge, Three Needles, Four Seam Corridor Spatial Structure, Land-Use Layout, Update Framework | [data:geometry/land_use.geojson#LU-001], [depth:overall_spatial_structure] |
| Key-Area Detailed Design Area | Approximately 368.4 hectares in three areas | Integrated Planning Implementation Plan Depth | Three-Zone Differential Detailed Design | [data:geometry/key_areas.geojson#PROV-KEY-001], [depth:three_key_area_detailed_design] |

The spatial relationships of the three layers are constrained by [depth:three_level_scope_framework]: the strategic layer determines "what to stitch" (industrial and urban form assessment), the overall layer determines "how to stitch" (spatial structure and renewal projects), and the focus layer validates "whether the stitches hold" (feasibility at the plot scale). The spatial Evidence Chain of this plan is: boundary → land use zoning → stitching corridors and green spines → building clusters → phased implementation, all falling within the `geometry/*.geojson` layer and can be recalculated [depth:existing_conditions_diagnosis].

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future City Research

### Naming System and Visual Identity Direction (agent.1)

**Main Name: Jing-Zhang Seam Belt**; English Name **JINGZHANG STITCH BELT** (shortened to JZ STITCH). Naming Logic: The Jing-Zhang Railway was China's first self-designed and constructed mainline railway. The heritage park left behind after its underground transformation serves as the most authentic physical anchor of this urban belt—this is not a belt "planned," but a seam "discovered." **Stitch** refers to three layers of meaning: spatially stitching together the two sides of the city divided by the railway; industrially stitching together universities, enterprises, communities, and developers; and temporally stitching together the autonomous innovation starting point a century ago with today's AI innovation origin. Sub-naming System: The Green Spine is referred to as "LIVING RIDGE," with the three key areas named respectively as "TEST NEEDLE," "OPEN NEEDLE," and "TRANSFER NEEDLE." Horizontal Public Spaces are referred to as «Stitch Gallery STITCH GALLERY» [source:DATA-SRC-AGENT-TASKBOOK-20260518].

**Logo and Visual Identity Direction**: The theme is "Needle and Thread" — two parallel short lines with a diagonal line forming the "stitch" symbol. The diagonal line draws from the imagery of the "person" shape in the railway designed by Zhan Tianyou, while the double lines represent the railway tracks. Color system: Rusty Red (railway heritage) + Haidian Blue (innovation) + Ecological Green (Public Space). This direction aligns with the task book's requirements for the "Centennial Jing-Zhang Cultural Belt, Urban AI Living Experience Belt, and AI Integration Innovation Belt," and can serve as a foundation for the professional brand team to deepen the design [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:naming_and_logo].

### Three Zones and Two Wings Synergistic Loop with Five Major Functional Areas

According to the framework of the Three Zones and Two Wings as outlined in the task book [source:DATA-SRC-AGENT-TASKBOOK-20260518], the proposal suggests a "validation—open source—transformation" synergistic loop: Zhongzhiyuan (test validation needle) will carry out testing and validation for the Full-Stack Independent AI Innovation System and safety governance; AI Origin community (open source co-creation needle) will organize open-source collaboration, result release, and talent services; Dazhongsi (application transformation needle) will focus on smart native new business models and international exchanges. The two wings will be divided as follows: Zhongguancun Technology Services Wing will provide element configuration and capital empowerment, while the Academy Road University Innovation Wing (this plan's supplementary expression, corresponding to the functions of the Xiaoyue River Scenario Enablement Wing) will organize scenario enablement and public experience. The three needles and two wings will be spatially interconnected through the green spine and seam corridors [data:geometry/land_use.geojson#LU-001].

### Global AI Innovation Ecosystem Case Examples (agent.2, 6 cases)

| Case | Location | Transformable Mechanisms |
| --- | --- | --- |
| Kendall Square | United States Cambridge | Higher Education—Industry "Zero-Mile Seam": The 5-minute walk circle around MIT is organized with labs, incubators, and venture capital, adopting the nearby school seam logic for the original community in this plan |
| King's Cross Railway Heritage Regeneration | United Kingdom London | The entire abandoned railway yard has been regenerated into an innovative district, with railway heritage becoming a Public Space asset—mirroring the Jing-Zhang Heritage Park |
| one-north | Singapore | Research, residence, and commerce mixed within the green corridor, with Public Spaces as containers for innovative interactions |
| Shenzhen Bay Technology Ecological Park | Shenzhen, China | Vertical Campus + Ground-Level Public Interface, Combining Industrial Services with Public Life |
| Station F | France, Paris | Repurposed Railway Station Transformed into the World's Largest Startup Campus, Combining Railway Heritage with an Entrepreneurial Community |
| Superblocks Barcelona | Barcelona, Spain | Reallocating roads to release Public Space—this plan stitches the slow-moving priority logic into the fabric |

Case common conclusion: **Successful AI innovation districts are not bounded by "parking lot walls," but by the seams of Public Spaces** [depth:ecosystem_cases]. Haidian's unique density of universities (Tsinghua, Peking, North Aerospace, North Postgraduate, North Jiaotong along the distribution) is the best Chinese embodiment of the Kendall Square model.

### Future Urban Form

Facing the new quality productivity of AI, the proposal puts forward "three perceptibles": AI perceptible (scene card system), governance perceptible (Urban Agent public interface), and heritage perceptible (railway cultural narrative). At the Coordinated Research Area level, the proposal suggests guiding industrial layout with three indicators: innovation density, Public Space accessibility, and scenario openness, to avoid the formation of industrial parks and spatial islands [metric:site_area_sqm]. (Scenario Access)

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Spatial Structure: One Ridge, Three Needles, Four Fused Corridors, Two Wings

The Overall Design Area adopts the "one ridge, three needles, four seams, two wings" spatial structure, all falling within the map layers for land use and green space [data:geometry/land_use.geojson#LU-001] [depth:overall_spatial_structure]:

- **One Spine**: Jing-Zhang Heritage Park Vital Spine ([data:geometry/green_space.geojson#GREEN-001]), a north-south green spine formed along the railway site, serving as the backbone of the entire belt's Public Space. This plan adheres to the principle of "low-intervention patching" — preserving elements of the railway's memory, weaving in pedestrian paths, cycling lanes, and activity nodes, without resorting to large-scale demolition and reconstruction [metric:green_ratio].
- **Three Pins**: Three key areas serve as three functional pins (see the detailed design chapter for the key areas).
- **Four Fusion Walkways**: Dazhongsi Fusion Walkway, Zhichun Fusion Walkway, Origin Fusion Walkway, and Collective Wisdom Fusion Walkway([data:geometry/public_space.geojson#PUB-001] to [data:geometry/public_space.geojson#PUB-004]), horizontal Public Space belts, are the core spatial actions of the "fusion" concept: each fusion walkway is based on the existing urban roads, through pedestrian priority renovations, re-allocation of cross-sections, and activation of street corner spaces, reconnecting the east and west sides of the neighborhoods that were divided by the railway [metric:stitch_corridor_count].
- **Wings**: The west side is the Zhongguancun Technology Services Wing (commercial service land use), while the east side is the University Road Higher Education Innovation Wing (research and educational research land use).

### Land-Use Layout

Land use classification follows the National Land and Sea Use Classification Guide [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], generating 72 land use units within the provisional boundaries, fully covering, non-overlapping, and gap-free [data:geometry/land_use.geojson#LU-001] [metric:land_use_coverage_sqm] [depth:land_use_layout]:

- Green spaces and open areas (1401): Green Spine + Eastern-Western Green Corridor, approximately **186,000㎡** (including the Green Spine and the Eastern-Western Green Corridor, [metric:green_ratio] 0.164).
- Research and Development Land (0802): Zhongzhiyuan side and southern segment of the industrial belt;
- Education Research and Innovation Service Land Use (0804): Adjacent to the eastern side of the original point community, connecting to the university interface;
- Commercial and Business Service Land Use (05): West Wing Technology Service Belt and Dazhongsi Area;
- Residential and Community Service Land Use (0701/0702): East Margin Talent Community and Community Amenities.

Land-Use Layout Logic: **green spaces are aligned along the seam line, industries are arranged along the university interface, and communities are adjacent to innovation services** —— priority is given to placing the most public and mixed-use functions on both sides of the seam corridor, ensuring that the seam corridor is not only a passage but also a space for interaction [standard:MOHURD-CONTROL-DETAILED-PLANNING].

### Urban Renewal Overall Framework

The update framework follows the three principles of "**retain as the base, weave as the main approach, and update as a supplement**" [depth:retain_renovate_demolish]: railway heritage sites, cultural protection elements, mature communities, and university interfaces are all retained; dead-end roads, inactive underbridge spaces, and inefficient edge lands are revitalized through weaving; low-efficiency industrial plots that require updating are primarily replaced with new functions, without pre-setting extensive demolition and reconstruction. The architectural group expression can be found in [data:geometry/buildings.geojson#BLDG-001] (conceptual illustration, not representing the current status or the conclusions of the demolish–renovate–retain strategy, [metric:building_footprint_area_sqm]). Due to the absence of official control plan conditions, Development Intensity and Building Height are all listed as pending confirmation [depth:development_intensity_controls] [depth:height_massing_character], and no definitive values are provided for review. (Demolish–Renovate–Retain Strategy)

## Detailed Design of Key Areas

Three key areas are expressed as provisional polygons ([data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003]), with the design conclusions serving as directional recommendations. After the official boundaries are released, a detailed recalculation will be conducted [depth:three_key_area_detailed_design]. (Official Boundary)

### Zhongzhiyuan AI Independent Innovation Acceleration Area (test verification pin, approximately 192.1 hectares)

- **Location**: Garden-style AI Autonomous Innovation District, serving as a platform for the Full-Stack Independent AI Innovation System and safety governance testing.
- **Spatial Structure**: Use the Qinghe interface and the northern segment of the Green Spine as the green base, organizing "one axis and three gardens" — the Central Innovation Axis connecting the Autonomous Model Testing Garden, the Safety Governance Display Garden, and the Low-Carbon Innovation Interaction Garden.
- **Key Actions**: The Smart Seam Corridor runs through the center of the district, organizing external traffic and rail connections; along the Qinghe interface, open test fields and public performance platforms are arranged.
- **AI Scenarios**: autonomous driving shuttle testing, robot delivery pilots, safety governance sandbox (see scenario cards SC-04/05/09).
- **Implementation Dependencies**: road red lines, river blue lines, control detail plan conditions [source:DATA-SRC-PROCESSED-FACT-PACK-20260607].

### Beijing AI Origin Community (Open Source Co-Creation Pin, approximately 104.3 hectares)

- **Location**: School-oriented Technology Transfer and Talent Community, the original site named "AI Origin," a public carrier for open-source culture and developer spirit.
- **Spatial Structure**: The original point suture corridor runs through the district, connecting the West End of Tsinghua East Road Metro Station, the Open Source Pavilion, the Technology Transfer Street, and the Talent Community, forming a "station-street-plot" structure.
- **Key Actions**: Seam the three interfaces of campus-park-district; extend the existing vitality of Wudaokou to create an open co-creation interface; set up developer honor walls and other sacred landmarks (see blue-green chapter).
- **AI Scenario**: Open Source Exhibition Hall, Enterprise Service Co-Intelligence Body, AI+Education (see scenario cards SC-06/07/10).
- **Implementation Dependencies**: Campus boundaries, ownership, and first-floor activity guidance [depth:renewal_project_list].

### Dazhongsi AI Industry Cluster (Application Transformation Needle, approximately 72.0 hectares)

- **Location**: Smart Native New Business District and International Exchange District, organized around the Dazhongsi Station TOD.
- **Spatial Structure**: The Dazhongsi and Zhichun Integration Corridors intersect to form a dual-corridor system, organizing "integration of station and city, with four quadrants interconnected" —— arranging smart terminal displays, content consumption, data element living rooms, and international showcase lounges around the four quadrants of the rail station.
- **Key Actions**: Quadrant Walkway Connectivity at the Station (refer to the Transportation chapter), Planned Green Space Redevelopment, and Commercial Interface Revitalization.
- **AI Scenarios**: AI+ Healthcare Navigation, AI Pedestrian Navigation, Robot Delivery (see scenario cards SC-01/03/05/08).
- **Implementation Dependencies**: Transit-Station Integration conditions, ownership, and municipal utilities [source:DATA-SRC-PROCESSED-FACT-PACK-20260607].

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### User Profile (6 categories, agent.3)

| Image | Typical Needs | Spatial Response | Privacy and Review Boundaries |
| --- | --- | --- | --- |
| Open Source Developer | Release, Collaborate, Test, Reputation | Origin Open Source Release Hall, Honor Wall, Nighttime Collaboration Space | No personal behavior tracking; aggregate activity data displayed |
| Startup Team | Low-Cost Office, Computing Power Entry Point, Test Field | Zhongzhiyuan Shared Test Field, Enterprise Service Co-Intelligence Entity | Computing Power and Data Services Require Separate Authorization |
| Lead Company R&D Personnel | Exhibitions, Business, International Exchange | Dazhongsi International Roadshow Living Room, Track Transfer | Corporate Identity and Case Studies Must Clear Rights |
| College Students and Faculty | Technology Transfer, Cross-Institution Collaboration, Daily Active Transportation | Campus-Area Seam Interface, AI+Educational Space | Campus Data and Research Results Require Authorization |
| Surrounding Residents | Commuting, Leisure, Community Services | Green Spine Pedestrian Loop, Seamlessly Connecting Street Corners | Resident Profile Not Used for Commercial Recommendations |
| International Visitors/Participants | Attend, Participate, Experience AI City | Public Experience Route, Guiding Agent | Minimal Collection of Visitor Data |

### AI Scenario Card (12 cards, including 3 Industry Testing and Validation Scenario cards)

Each scene card maps to spatial layers and operational mechanisms [data:geometry/public_space.geojson#PUB-001] [data:geometry/roads.geojson#ROAD-001] [data:geometry/green_space.geojson#GREEN-001] [metric:public_space_ratio]:

| # | Scenario Card | Spatial Carrier | Service Target | Human Review Mechanism | Operational Subject Recommendation |
| --- | --- | --- | --- | --- | --- |
| SC-01 | AI Slow Travel Navigation and Gap Identification | Seam Corridor/Green Spine [data:geometry/roads.geojson#ROAD-001] | Residents, Visitors | Gaps are flagged and released after Human Review | Park Operator + Transportation Department |
| SC-02 | Green Spine Digital Twin Operations Platform | Vital Spine [data:geometry/green_space.geojson#GREEN-001] | Operator, Public | Facility Maintenance Recommendations Require Manual Confirmation | Park Operator |
| SC-03 | Dazhongsi Station Quadrant Four Pedestrian Shuttle | Dazhongsi Seam Corridor [data:geometry/public_space.geojson#PUB-001] | Commuters | Shuttle Information Manual Review | Rail+Street |
| SC-04 | Autonomous Shuttle Testing (Industrial Test Validation 1) | Zhongzhiyuan Testing Field [data:geometry/key_areas.geojson#PROV-KEY-001] | Businesses and public observers | Test Permit System+Safety Officer+Public Disclosure | Test Operations Platform |
| SC-05 | Robot Delivery Pilot (Industrial Testing Validation 2) | Zhongzhiyuan/Dazhongsi [data:geometry/roads.geojson#ROAD-001] | Enterprises, Residents | Low Speed + Prescribed Route + Manual Takeover | Pilot Operator |
| SC-06 | Original Point Open Source Release Hall | Origin Point Community [data:geometry/public_space.geojson#PUB-003] | Developers | Content Review+Attribution Mechanism | Open Source Community + Street |
| SC-07 | Enterprise Service Co-Intelligence Entity (Industrial Testing and Validation 3) | Zhongzhiyuan/Origin [data:geometry/buildings.geojson#BLDG-001] | Enterprise | Policy Information Manual Verification | Park Operator |
| SC-08 | AI+Healthcare Navigation | Dazhongsi Area [data:geometry/key_areas.geojson#PROV-KEY-003] | Residents | Professional Review of Healthcare Information | Health Commission |
| SC-09 | Safety Governance Sandbox Display | Zhongzhiyuan [data:geometry/key_areas.geojson#PROV-KEY-001] | Enterprises, Public | Red Team Testing + Public Visit Reservation | Test Operations Platform |
| SC-10 | AI+Education Joint Course Space | Origin Community [data:geometry/key_areas.geojson#PROV-KEY-002] | Teachers and Students | Course Content Subject to School Approval | University + Park |
| SC-11 | Urban Agent Public Feedback Station | Seam Corridor Node [data:geometry/public_space.geojson#PUB-002] | Public | Suggest Transfer to Manual Processing and Respond | Streets + Government Departments |
| SC-12 | Jing-Zhang Cultural AI Guided Tour | Vital Spine Throughout [data:geometry/green_space.geojson#GREEN-001] | visitors, residents | Historical Fact Professional Review | Cultural Tourism Department |

All scenarios adhere to the public data boundaries and Human Review principles of the co-creation charter [source:DATA-SRC-AGENT-TASKBOOK-20260518]: no collection of personal privacy data, no output of unverified policy promises, and no writing of test scenarios as approved operations [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [depth:scenario_cards].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land-Use Layout and building clusters are detailed in the Overall Design Chapter [data:geometry/land_use.geojson#LU-001] [data:geometry/buildings.geojson#BLDG-001]. This scheme establishes the following conceptual control directions, which are subject to confirmation by the official control plan [depth:development_intensity_controls].

- **Functional Proportion**: Green spaces and open areas account for approximately 16.4%; industrial and research land use is the main component, with residential and community services organized along the eastern edge [metric:green_ratio].
- **Building Scale**: Guided by the "Line-Up Ratio + Street Wall Height" to stitch together the two sides of the corridor, no predetermined Floor Area Ratio [depth:height_massing_character];
- **Dismantle–Renovate–Retain Strategy**: Preserve railway heritage and mature communities, weave in inactive spaces, and update underperforming parcels—all parcel-level conclusions pending current baseline data and property ownership confirmation [depth:retain_renovate_demolish]; (Demolish–Renovate–Retain Strategy)
- **Landmark:** The triple needle node allows for moderate height marking, with the specific height to be confirmed after review by aviation, landscape, and cultural heritage constraints.

## Transport, Rail, Municipal Infrastructure, and Public Services

### Traffic organization prioritizing seam-making

The core of the traffic strategy is "**return the seams to pedestrians and cyclists, and make transfers a seamless experience**" [depth:traffic_rail_slow_parking] [data:geometry/roads.geojson#ROAD-001]:

- **Horizontal Stitching Streets**: Four stitching corridors are based on the existing roads, re-distributing the cross-section (compressing vehicular lanes and increasing pedestrian and corner space), to restore the east-west connections severed by the railway.
- **Track Transfer**: Organize a three-tiered transfer system around the Zhi Chun Lu, Xitusheng, Dazhongsi, and Qinghua Dong Lu Xi Kou stations, with the last kilometer prioritizing active transportation [metric:stitch_corridor_count].
- **Green Spine Service Road**: The concept of a slow-moving main axis is set on the east side of the vibrant spine, connecting Three Needles ([data:geometry/roads.geojson#ROAD-001]).
- **Parking and Freight:** Encourage shared parking and nighttime freight windows, with logistics transfer points combined and tested in specific scenarios.

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

### Municipal and New Infrastructure

- **Edge-Side Computing**: Integrate community-level computing service stations into the node layout of the seam corridor (to be further developed);
- **Energy**: It is suggested to pilot distributed photovoltaic systems combined with geothermal heat pumps, with energy loads to be professionally calculated.
- **Municipal Integration**: Directional suggestions for pipeline intake, rainwater and flood utilization, with all engineering conditions pending [data:geometry/constraints.geojson#CONSTRAINTS] [depth:municipal_new_infrastructure];
- **Public Services**: Innovative service platforms and talent service facilities are laid out along the seam corridor nodes, with a service radius of 500m conceptually covered.

## Blue-Green Network, Public Space, and Urban Character

### Blue-green network

A "skeleton-branch-leaf" blue-green network with green spines as the backbone, green corridors as the branches, and community green spaces as the leaves [data:geometry/green_space.geojson#GREEN-001]: the green spines run north-south (including a conceptual node across North Fifth Ring Road), green corridors connect east-west, and the Qinghe and Xiaoyuehe river interfaces reserve waterfront pedestrian paths [metric:green_ratio] [metric:public_space_ratio].

### AI Pilgrimage Landmark and Honor Display System (agent.4, 3)

1. **Jing-Zhang Garden Station·Original Point Memorial Platform**: Starting from the century-old station, set up a "From Jing-Zhang to AI" timeline and a developer contribution honor wall—open-source contributors can be named, in response to the requirement in the task book for an "Agent Contribution Honor Wall" [source:DATA-SRC-AGENT-TASKBOOK-20260518].
2. **Zhongzhiyuan·Testing Field Viewing Platform**: A public observation interface for open testing scenarios, symbolizing the "spirit of validation."
3. **Dazhongsi·Zhongsheng Square**: Centered around the theme of clock culture, it features an "AI Announcing Time" public art installation and the main venue for annual events.

Landmarks are designed with lightness, reversibility, and public character in mind, without setting up enclosed facilities or encroaching upon the cultural heritage and green space control areas [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:blue_green_public_space].

### Cultural Narrative and Urban Character (agent.5)

**Three Lines Narrative**: Jing-Zhang Railway's Independent Innovation Starting Point (a century ago "China Made") → Zhongguancun's Tradition of Technology Entrepreneurship (reform and opening-up "China Created") → Global Collaboration in AI New Culture (today "China Open Source") —— three timelines are woven together on the Green Spine into a walkable narrative path, configured with guide signs and public art [depth:existing_conditions_diagnosis].

Mood Tone: heritage interface "restored as old," seam interface "new and old coexist," innovation interface "light and transparent"; color system and logo motif consistent. All cultural symbols, fonts, and images must be cleared for use.

## Renewal Projects, Implementation Policy, and Phasing

### Update Project List (Conceptual 12 Items)

| Number | Project | Type | Location | Main Dependencies | Phases |
| --- | --- | --- | --- | --- | --- |
| JZ-01 | Dazhongsi Seam Lane Slow-Travel Renovation | Public Space/Transportation | Dazhongsi Area [data:geometry/public_space.geojson#PUB-001] | Road Right-of-Way, Transportation Specialization | P1 |
| JZ-02 | Origin Stitch Corridor and Open Source Release Hall | Public Space/Industry | Origin Community [data:geometry/public_space.geojson#PUB-003] | Ownership and Ground Floor Use | P1 |
| JZ-03 | Knowledge Spring Seam Corridor Activation | Public Space | Knowledge Spring Road [data:geometry/public_space.geojson#PUB-002] | Utility Lines | P2 |
| JZ-04 | Zhongzhi Seam Lane and Testing Field Interface | Public Space/Industry | Zhongzhiyuan [data:geometry/public_space.geojson#PUB-004] | Redline, Testing Permit | P2 |
| JZ-05 | Green Spine North Segment Through (Concept Across Fifth Ring) | Blue/Green & Transportation | Active Spine North Segment [data:geometry/green_space.geojson#GREEN-001] | Crossing Conditions, Engineering Review | P3 |
| JZ-06 | Qinghe Interface Waterfront Path | Blue-Green | Zhongzhiyuan North Boundary [data:geometry/key_areas.geojson#PROV-KEY-001] | River Blue Line, Flood Protection | P2 |
| JZ-07 | Original Point Honor Wall and Memorial Platform | Culture/Brand | Original Point Community [data:geometry/key_areas.geojson#PROV-KEY-002] | Cultural Review | P1 |
| JZ-08 | Dazhongsi Station Quadrant Connectivity | Track Integration | Dazhongsi Station [data:geometry/roads.geojson#ROAD-001] | Site Integration Conditions | P2 |
| JZ-09 | Community-Level Computational Service Station Prototype | New Infrastructure | Seam Node | Energy and Operational Entity | P2 |
| JZ-10 | Talent Community Fabrication Update | Residential | East Edge Community Corridor [data:geometry/buildings.geojson#BLDG-001] | Current Baseline, Ownership | P3 |
| JZ-11 | Urban Agent Public Feedback Platform | Governance/Digitization | Corridor Node [data:geometry/public_space.geojson#PUB-002] | Government Collaboration | P1 |
| JZ-12 | Annual Activity System Operation | Operations/Brand | All [data:geometry/phasing.geojson#PHASE-001] | Activity Safety, Copyright | P1 |

### Phased Plan

Phased spatial expression see [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation]:

- **P1 Near Term (Seam Integration, 1-2 Years)**: Origination Seam Corridor, Dazhongsi Seam Corridor, and Honor Wall — establish a "seam integration" demonstration with minimal intervention, and simultaneously launch a public feedback platform and annual events [depth:renewal_project_list];
- **P2 Mid-term (Dual Core Promotion, 3-5 Years)**: Advance the Zhongzhiyuan test scenarios and the integration of Dazhongsi station with its surrounding area, and deepen the Zhichun/Zhongzhi Seam Corridor.
- **P3 Long-Term (Fully Developed, 5-10 Years)**: Green Spine runs north-south, Talent Community integrated, unified style, and established global operational framework.

### Global AI Innovation Ecosystem and Long-Term Operations (agent.6)

- **Annual Activity Framework**: Jing-Zhang AI Week (spring, open-source release + Scenario Access), Developer Sewing Festival (fall, hackathon + results showcase), Dazhongsi Bell Year-End AI Exhibition (winter) — all as Conceptual Recommendations, pending confirmation from the organizers [source:DATA-SRC-AGENT-TASKBOOK-20260518];
- **Developer Community Operations**: Honor Wall recognition mechanism, monthly open-source release events, contributor certificate system;
- **Scenario Access Operations**: Test the four-step process "Declaration—Permit—Public Announcement—Rollback".
- **International Communication:** "From Centennial Railway to AI Origin" Narrative + English Guiding System + International Roadshow Living Room;
- **Transformation Path**: Activities → Scenario Testing → Corporate Services → Policy Alignment, with mechanisms suggested for operational deepening, not constituting a recruitment commitment [depth:scenario_cards].

## Metrics, Area Recalculation, and Compliance Matrix

### Core Metrics (all recalculated using EPSG:4548, compared consistently with spatial review)

| Indicator | Value | Formula and Source | Design Implication |
| --- | --- | --- | --- |
| site_area_sqm | 11,412,825 | polygon_area(site_boundary) [data:geometry/site_boundary.geojson#SITE-001] | Overall Design Area (provisional) [metric:site_area_sqm] |
| land_use_coverage_sqm | 11,412,848 | sum(land_use) [data:geometry/land_use.geojson#LU-001] | full land use coverage with no overlaps (within tolerance) [metric:land_use_coverage_sqm] |
| green_ratio | 0.164 | green/site [data:geometry/green_space.geojson#GREEN-001] | proportion of Green Spine + Seamed Green Corridors in Total [metric:green_ratio] |
| public_space_ratio | 0.017 | public/site [data:geometry/public_space.geojson#PUB-001] | Public Space Ratio [metric:public_space_ratio] |
| stitch_corridor_count | 4 | count(PUB) | Stich Corridor Count [metric:stitch_corridor_count] |
| key_area_count | 3 | count(KEY_AREA) | three key areas [metric:key_area_count] |
| building_footprint_area_sqm | 361,487 | sum(buildings) | Conceptual Building Ensemble Footprint Area (Not Current Condition) [metric:building_footprint_area_sqm] |
| floor_area_ratio | unknown | — | To be defined by official control plan [metric:floor_area_ratio] |

### Align to Grid

- `compliance_matrix.json` covers announcement 1.3.1—1.5.3.3, including all 17 optional tasks and six tasks (agent.1—agent.6), each of which maps to sections, layers, indicators, drawings, and self-inspection items [standard:PROJECT-OFFICIAL-ANNOUNCEMENT];
- `standard_matrix.json` covers 6 professional standards, among which 5 are addressed and 1 is a data_gap (the official document from MOHURD-ARCH-DESIGN-DEPTH-2016 is missing) [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].
- `design_depth_matrix.json` contains all 18 depth items and has been completed [depth:metrics_recalculation].
- Self-check results are found in `self_check.json`: deterministic validation, spatial review, visual packaging, and professional evidence.

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

- **Official Planning Boundary**: Only publicly available or cleared data [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] shall be used; provisional boundaries shall not be mistaken for official planning boundaries [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605].
- **Copyright**: All charts and text are generated by the AI agent based on publicly available materials; no unauthorized content is used; the logo direction is an original description and no existing trademarks were used [source:DATA-SRC-AGENT-TASKBOOK-20260518].
- **Privacy**: The scene design does not collect personal privacy or generate personal profiles;
- **Compliance Boundaries**: All spaces, activities, and policy statements are Conceptual Recommendations and do not constitute government approval, investment commitments, or approved implementation arrangements [depth:existing_conditions_diagnosis];
- **AI Generation Responsibility**: This proposal is generated by an AI agent and submitted after review by a human account owner. The generation method and limitations are specified in `agent.json`.
- **Additional Data Required**: Official Planning Boundary, three key areas polygon, planning conditions, road boundary, current building baseline, cultural heritage control line, municipal engineering conditions (a complete list is available in `assumptions.json` and `missing_data_checklist.csv`); this plan addresses the handling and recalculation requirements for these gaps as detailed in [depth:risk_missing_data].
- Detailed declaration can be found in `report/copyright_statement.md`.

## References

The machine-readable reference document and evidence citation relationship for this plan are as follows (see [depth:metrics_recalculation] and [source:DATA-SRC-PROCESSED-FACT-PACK-20260607]):

- `brief/site-package/design_brief.json`, `agent_taskbook.json`, `allowed_design_space.json`
- `brief/site-package/geometry/provisional_boundaries.geojson`
- `brief/site-package/standards/standards.json` and `references/*.md`
- `data/source_registry.json`, `data/processed/agent_fact_pack.md`
- `docs/formal-submission-guide.md`, `docs/data-workflow.md`
- Global case sources: official websites and news reports of each case (Kendall Square, King's Cross, one-north, Shenzhen Bay Technology Ecological Garden, Station F, Superblock Barcelona), the text only cites their spatial organization experience and does not cite unverified data.
