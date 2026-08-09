---
title: "Urban Design Open Call: Jing-Zhang Corridor: Urban Design Open Source Proposal from the Centennial Jing-Zhang Railway to the Global AI Innovation Belt"
author_github: "savon66"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "On the historical artery of the Jing-Zhang Railway, propose the 'Intelligent Vein One Belt' concept: a one-belt-three-core-two-wing-multipoint spatial structure, a full-stack self-innovative and scenario-open operational mechanism, and a framework consisting of 12 AI scenario cards, 7 sacred landmark nodes, and 14 update projects, forming a deepening plan. All spatial suggestions are Conceptual Recommendations and will be recalculated in their entirety after the Official Planning Boundary and control plan conditions are completed. (Scenario Access)"
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "ai-health-service-navigation", "robot-delivery-low-speed", "enterprise-service-copilot"]
iteration: "v0.1"
---

# Urban Design Open Call: Jing-Zhang Corridor: Urban Design Open Source Proposal from the Centennial Jing-Zhang Railway to the Global AI Innovation Belt

![Overall Concept and Spatial Structure Master Plan for the Intelligent Vein Belt](assets/figures/site-overview.png)

## 1. Design Basis and Reference Materials

This proposal is based on four types of documentation: [source:SITE-PACKAGE] provides the project brief, enumeration, allowable design space, planning limits, and data patterns; [source:SOURCE-REGISTRY] distinguishes between formal available, background, and provisional data; [source:PROCESSED-FACT-PACK] provides the task index, source boundaries, and missing data list; [source:OFFICIAL-ANNOUNCEMENT] and [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509] provide the official project name, host, three-tier scope, area approximation values, and design tasks. [source:AGENT-TASKBOOK] and [source:DATA-SRC-AGENT-TASKBOOK-20260518] provide six tasks for agents, co-creation principles, evaluation criteria, and unified boundary conditions.

Spatial base map aspects, [source:BOUNDARY-SOURCE] and [source:KEY-AREA-SOURCE] (i.e., [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]) provide the Overall Design Area and temporary rough polygons for three key areas, which are only for generating, visualizing, and intake self-inspection purposes and should not be used as official planning boundaries or for accurate area calculations. OpenStreetMap (OSM) data from [source:SRC-OSM-2026] (ODbL) is used for the current road network, tracks, water systems, green spaces, educational facilities, and building background. [source:SRC-HAIDIAN-PROFILE-2025], [source:SRC-ZGC-AI-2025], [source:SRC-HAIDIAN-EDU-2025], [source:SRC-BJ-TRAFFIC-2025], and [source:SRC-JINGZHANG-HISTORY] provide public background information on Haidian's industry, education, traffic, and Jing-Zhang's historical context. (Official Planning Boundary) In terms of professional standards, [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] serves as the primary control for the project task, [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] serves as the primary control for the agent task, [standard:MOHURD-URBAN-DESIGN-MEASURES] guides Urban Design and appearance, [standard:MOHURD-CONTROL-DETAILED-PLANNING] defines the depth of the control plan and the implementation boundary, and [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] unifies the semantic classification of land use. [depth:existing_conditions_diagnosis] and [depth:risk_missing_data] clarify the current conditions and the list of gaps.

Boundary Condition Description: The Overall Design Area is approximately [metric:site_area_sqm] square meters (about 1141.3 hectares), which is a provisional boundary calculated from an announcement of approximately 11.4 square kilometers and a temporary polygon. The three key areas together cover approximately 369 hectares, also marked as provisional. [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#KEY-001] are both marked with `provisional_constraint`. All areas, ratios, and layers referenced in this plan are based on this boundary calculation; after obtaining the official CAD/GIS, the entire package must be recalculated, as recorded in [assumption:A-BOUNDARY-001] and [assumption:A-CONTROLS-001].

## 2. Three-Level Scope Work Framework

The three levels each carry out different design tasks: [depth:three_level_scope_framework].

**Coordinated Research Area (approximately 43.6 square kilometers)**: The research scope is based on the "Three Zones and Two Wings" of Haidian, addressing questions related to a world-class AI Innovation Ecosystem, future urban forms, AI culture, and AI social issues. This layer does not generate precise red lines but focuses on the research of industry-space-innovation network. The relationship between the two wings is expressed through [data:geometry/constraints.geojson#CZ-004] (Conceptual Research Boundary of Xiaoyue River Scenario Enablement Wing) and [data:geometry/constraints.geojson#CZ-005] (Conceptual Research Boundary of Zhongguancun Technology Services Wing).

**Overall Design Area (approximately 11.4 square kilometers)**: The Urban Design research framework targets the urban and industrial areas within 1-2 kilometers around the Jing-Zhang Heritage Park. This layer generates [data:geometry/land_use.geojson#LU-00-20] land use zones, [data:geometry/buildings.geojson#BD-001] architectural concept bases, [data:geometry/roads.geojson#RD-001] road organization, [data:geometry/green_space.geojson#GR-LU-02-20] Blue-Green Spaces, and [data:geometry/phasing.geojson#PH-001] phased areas.

**Key-Area Detailed Design Area (approximately 368.4 hectares)**: Conduct detailed design for the Zhongzhiyuan AI Independent Innovation Acceleration Area, Beijing AI Origin Community, and Dazhongsi AI Industry Cluster Area, corresponding to [data:geometry/key_areas.geojson#KEY-001], [data:geometry/key_areas.geojson#KEY-002], and [data:geometry/key_areas.geojson#KEY-003]. Currently, all three key areas are provisional rough polygons. The conclusions in the main text are only for directional design and will be deepened by professional teams after obtaining the official boundaries of the respective areas.

The three-tiered logical progression is "strategic industry defines function, overall structure defines framework, and key areas define form": the strategic tier provides industry focus and collaborative loops, the overall tier lands on land use, transportation, blue-green spaces, and renewal structures, while the key tier details building renewal, station connections, and Public Spaces. The area calculations for each tier are derived from the submitted GeoJSON files, not the announcement text ([metric:site_area_sqm], [metric:key_area_count], [metric:key_area_zhongzhiyuan_sqm], [metric:key_area_origin_sqm], [metric:key_area_dazhongsi_sqm]). The boundary precision is uniformly recorded by [assumption:A-BOUNDARY-001].

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

## 3. Coordinated Research Area Industry and Future City Research

### 3.1 Current Basis and Industrial Assessment

Haidian has formed one of the densest concentrations of AI industry and intellectual resources in China: official figures show that by mid-2025, there were 1,900 AI companies and 26 AI unicorns in Zhongguancun Science City (accounting for about 70% of the entire city of Beijing) [metric:ai_company_count_haidian][metric:ai_unicorn_count_haidian]. In Haidian, over 24,000 new technology companies were added in 2025, bringing the total number of technology companies to 145,400, with 265 listed companies, 49 unicorns, and nearly 10,000 national high-tech enterprises [source:SRC-HAIDIAN-PROFILE-2025]. (Haidian District) Haidian District hosts over 30 universities and over 100 research institutions. It has 181 ordinary primary and secondary schools with 344,000 students [metric:school_count_haidian][metric:university_count_haidian][metric:student_count_haidian][source:SRC-HAIDIAN-EDU-2025]. These data indicate that Haidian District possesses the elements for a full chain of "source innovation—engineering transformation—industrial scaling—scene feedback," but spatially, it still faces structural barriers such as large institute walls, closed parks, disconnected nodes and streets, and broken pedestrian connections [depth:existing_conditions_diagnosis].

### 3.2 Three Zones and Two Wings Synergistic Loop

This scheme organizes the "Three Zones and Two Wings" into a **"Smart Synergistic Loop"** (Conceptual Recommendation):

- **AI Origin Community** (Zhonghuan): Anchored in original innovation from Tsinghua, Peking, and the Chinese Academy of Sciences, this community fosters talent and the conversion of research outcomes, serving as the "creation end" of the loop.
- **Zhongzhiyuan AI Independent Innovation Acceleration Area** (North Core): Undertakes full-stack AI independent innovation and AI governance, serving as the loop's "validation end";
- **Dazhongsi AI Industry Cluster** (South Core): This area accommodates intelligent entities, smart terminals, content consumption, and other native intelligent industries, serving as the "amplification and experience end" of the loop.
- **Zhongguancun Technology Services Wing**: Provides capital, IP, compliance, data, and global elements configuration, serving as the "service end" of the loop.
- **Xiaoyue River Scenario Enablement Wing**: Provides AI+ living, transportation, education, and medical scenarios for experimentation, serving as the "scene end" of the loop.

Loop mechanism: Original outcomes originate from the original community, undergo full-stack validation and governance evaluation at Zhongzhiyuan, form products and experiences in Dazhongsi, then return to the daily scenes of citizens via the Xiao Yuehe wing, and finally complete the service and capital loop at Zhongguancun wing. This loop corresponds to the three core service partition concepts of [data:geometry/constraints.geojson#CZ-001], [data:geometry/constraints.geojson#CZ-002], and [data:geometry/constraints.geojson#CZ-003], as well as the two wing area concepts.

### 3.3 Global AI Innovation Ecosystem Case Examples (5-8 cases)

This plan selects 6 publicly verifiable global AI Innovation Ecosystem cases, extracting transformable mechanisms (as per the requirement of 5-8 cases, [source:AGENT-TASKBOOK]):

1. **Silicon Valley (Stanford—Palo Alto)**: Entrepreneurial districts walkable from the university, with a concentration of venture capital and an alumni network. Transformation mechanism: Enhance the "professor+entrepreneur+capital" walking interface within the original community, and establish an open-source living room that is accessible 24/7.
2. **Boston Kendall Square**: Life sciences and AI cluster around MIT, transformed through a vertical stacking of "research institute-incubator-enterprise" with Public Spaces. Transformable mechanism: In Zhongzhiyuan, the concept of a vertical "full-stack tower" is adopted, featuring a public testing level at the bottom, research and development in the middle, and governance labs on top.
3. **One-North Singapore**: With the goal of integrating "work, live, learn, and play," it builds continuous green spaces and multimodal transportation. Transformative mechanism: enhance the Jing-Zhang Heritage Park as an "innovative shared green spine" running north-south.
4. **King's Cross Knowledge Quarter in London**: Utilizing the platform of railway heritage renewal, it introduces universities and tech companies to activate the district through station-city integration. Conversion mechanism: The practice of "railway heritage + knowledge economy" is implemented at the Dazhongsi Station Quadrant and the southern end of the Jing-Zhang Heritage Park.
5. **Shenzhen Nan Mountain High-Tech Park and Houhai Area**: characterized by leading company leadership, market-oriented park operation, and rapid iteration. Transformative mechanism: Dazhongsi leverages leading companies to drive smart terminal and content ecosystems, with park operation adopting a "platform company + scenario company" model (Conceptual Recommendation).
6. **Hangzhou Future Technology City**: Policy experimentation, Scenario Access, and talent policies attract AI enterprises. Transformative mechanism: Xiao Yuehe Wing as a "scenario sandbox" to validate AI+ living services in a real urban environment (Conceptual Recommendation).

The above cases are only for reference in terms of spatial mechanisms and operational mechanisms, and do not cite unverified investment amounts, output values, or lists of companies.

### 3.4 Future Urban Form: Adaptive Blocks

This proposal puts forward the **"Adaptive Block"** concept (Conceptual Recommendation): treating the block as a learnable and evolving urban system, including four subsystems:

- **Smart Vein**: With the Jing-Zhang Heritage Park Green Spine as the north-south main axis, connect the rail transit stations with Public Spaces, forming a perceivable and interactive "AI+Transport" framework (including concept lines such as [data:geometry/roads.geojson#RD-404] etc.).
- **Elastic Cells**: Use blank land use areas ([metric:land_use_area_16_sqm], accounting for approximately 4.8% of the Overall Design Area) as evolution reserves, allowing for functional iterations between "AI R&D—residential—commercial" based on demand (Conceptual Recommendation, without pre-setting conclusions for plot results).
- **Scenographic Layer**: Embed AI service zones and scenario nodes ([metric:scenario_node_count] nodes) within the street grid to form a perceivable public AI service interface.
- **Energy and Computing Infrastructure**: Suggestions for a system that integrates distributed energy, edge-side computing, and traditional municipal facilities, with engineering feasibility pending professional calculations.

This form responds to the announcement's "adaptive and evolutionary urban development model" requirement and is expressed with layers such as [data:geometry/land_use.geojson#LU-03-38] (example blank unit).

## 4. Overall Design Area Urban Renewal and Control Detailed Urban Design

### 4.1 Overall Spatial Structure: One Belt, Three Cores, Two Wings, and Multiple Nodes

The overall structure is **"One Belt, Three Cores, Two Wings, and Multiple Nodes"** (Conceptual Recommendation):

- **One Belt**: Form a north-south through and east-west connected Smart Axis along the Jing-Zhang Heritage Park, while simultaneously carrying a slow-moving green corridor, cultural narrative, and AI scenarios.
- **Three Core Areas**: Zhongzhiyuan (North Core·Full Stack and Governance), Yuandian Community (Central Core·Innovation and Talent), Dazhongsi (South Core·Smart Economy);
- **Wings**: Zhongguancun Technology Services Wing (East Wing) and Xiaoyue River Scenario Enablement Wing (West Wing);
- **Multi-Node Points**: Nodes such as Wudao Kou, West Qhuedong East Road, Zhi Chun Lu, Dazhongsi, Xitucheng, Xueyuan Qiao, Xuezhi Yuan, and Qinghe Xiaoying Qiao, as well as integrated transit nodes such as Qhuedong Garden Time Station and the Governance Ring cultural scene nodes ([data:geometry/constraints.geojson#SN-001] to [data:geometry/constraints.geojson#SN-012]).

The spatial structure is located within the 249 conceptual land use units of [data:geometry/land_use.geojson] ([metric:land_use_polygon_count]), with the structural layer corresponding one-to-one with the metrics. [depth:overall_spatial_structure]

### 4.2 Land Use Functional Layout

Land-Use Layout follows the principle of "aggregation along axes, mixed wings, and residential and supporting uses in the periphery" (Conceptual Recommendation):

- **On Both Sides of the Smart Vein Axis**: Research and development land use (represented by [metric:land_use_area_0802_sqm], approximately 21.2%) and commercial and business service land use (represented by [metric:land_use_area_05_sqm], approximately 18.6%) form an innovative industrial interface.
- **Middle Original Point Community**: Education land use([metric:land_use_area_0804_sqm], approximately 9.5%)and cultural land use([metric:land_use_area_0803_sqm])are arranged around the university and station to support the integration of "campus-park-block" spaces.
- **East and Periphery**:  Residential land use([metric:land_use_area_0701_sqm], approximately 17.5%)along with healthcare([metric:land_use_area_0806_sqm]), sports([metric:land_use_area_0805_sqm])and other public service facilities;
- **Blue-Green Open Spaces**: Park green spaces ([metric:land_use_area_1401_sqm], approximately 16.2%) are continuously arranged along the main axis, while square land uses ([metric:land_use_area_1403_sqm]) are located at the front of the station and landmark nodes. Left-over land uses ([metric:land_use_area_16_sqm]) are reserved for evolution.

The land use codes are all from the enumerated subset of [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] (as defined by [depth:land_use_layout]), and the submission boundary is fully covered by [data:geometry/land_use.geojson] with no overlaps or gaps. [self_check:LAND_USE_TOPOLOGY] Approved.

### 4.3 Urban Renewal Overall Framework and Development Intensity

The update framework adopts the **"preserve priority, progressive renovation, and blank space evolution"** three strategies (Conceptual Recommendation):

- **Preserve Prioritization**: College campuses, historical and cultural nodes, mature residential areas, and rail facilities should be preserved and are not included in the renovation scope;
- **Gradual Transformation**: For underperforming industrial parks, outdated markets, and idle buildings with potential, propose three categories of transformation paths: "functional replacement, updating public interfaces, and green renovations" (Conceptual Recommendation, not specific to particular parcels).
- **Leaving Space to Evolve**: The vacant land serves as a functional elasticity reserve, gradually releasing its potential after the confirmation of industrial demand and public value.

Development Intensity aspects, given the absence of official control plan conditions (Floor Area Ratio, Building Coverage Ratio, Building Height, Green Space Ratio, setback distances, etc.), this plan does not provide statutory indicators. [metric:floor_area_ratio], [metric:building_density], [metric:building_height_m], and [metric:total_gfa_sqm] are all marked as unknown. [depth:development_intensity_controls] only provide conceptual ranges for professional teams to refine: it is suggested that the core industrial zone maintain a medium to high intensity cluster with a podium interface, the residential area maintain current intensity, and control the height and setback of the interface along the relic park green belt (all of which are pending confirmed concepts, [assumption:A-CONTROLS-001]). The total building scale (measured by [metric:total_gfa_sqm]) is pending confirmation based on official conditions and a survey of existing building data.

![Three Key Areas Index and Design Task Map](assets/figures/key-areas.png)

## 5. Detailed Design for Key Areas

Three key areas are provisional polygons (e.g., [data:geometry/key_areas.geojson#KEY-001]), and the following is directional design, to be developed further by professional teams after the Official Boundary is confirmed. [depth:three_key_area_detailed_design]

### 5.1 Zhongzhiyuan AI Independent Innovation Acceleration Area (approximately 192.9 hectares)

**Location**: Garden-type AI Full-stack Autonomous Innovation District, undertaking the "full-stack validation + AI governance + national platform support" northern core function.

**Spatial Structure**: Conceptualized as "One Ring, One Axis, and Three Clusters" — the Governance Ring (Central Public Ring), Qinghe Cultural Axis, and clusters for Full Stack Validation, Computing Power Services, and International Conferences. Corresponding to [data:geometry/land_use.geojson#LU-00-39], [data:geometry/constraints.geojson#CZ-001], and [data:geometry/public_space.geojson#LM-004].

**Building Update**: Preserve mature parks and ecological green spaces; propose a vertical stacked renovation direction for underperforming buildings, such as "ground-level testing, mid-level research and development, and top-level governance laboratories" (none of which constitute a demolish–renovate–retain strategy, [assumption:A-BUILDING-001]). (Demolish–Renovate–Retain Strategy)

**Traffic Slow Zone**: Integrate the concept of optimizing external transportation directions within the Quintuple Ring area (Conceptual Recommendation). Set up gateway connection nodes (such as [data:geometry/roads.geojson#RD-702], etc., conceptual lines); develop a blue-green walking loop along Qinghe.

**Public Space and AI Scenarios**: The Governance Ring hosts trustworthy AI testing and validation, honor displays, and citizen observation windows; the scenarios include the Full Stack Validation Field, AI Safety Governance Laboratory, and Green Computing Demonstration (see Chapter 6 Scenario Cards ).

**Implementation Risks**: The integration of traffic for the Fifth Ring Road involves significant engineering efforts and requires official transportation-specific permits. Governance and safety testing scenarios necessitate the establishment of admission and ethical review mechanisms.

### 5.2 Beijing AI Origin Community (approximately 104.3 hectares)

**Location**: School-adjacent AI Original Community, serving as the core function for "creation, transformation, and talent development."

**Spatial Structure**: Conceptualized as "Origin Square + Dual Corridors + Transformation Clusters" — Origin Square as an open-source and release center, dual corridors connecting the Tsinghua/Northwestern direction with Wudaokou and the Tsinghua East Road West Exit station, transformation clusters to incubate university outcomes. Corresponding to [data:geometry/constraints.geojson#CZ-002], [data:geometry/public_space.geojson#LM-002], and [data:geometry/roads.geojson#RD-403].

**Building Update**:  propose a low-impact, organic update model: open the campus boundary "wall as a boundary"(Conceptual Recommendation), publicize the ground floor of existing buildings, and add exhibition, showcase and youth service spaces along the street; do not alter the ownership and function of the university([assumption:A-BUILDING-001]).

**Traffic Slow Zones:** Develop an integrated transfer concept design around Wudaokou and the west entrance of Qinghua East Road station, densifying the slow zone connections between campus, park, and neighborhood. Establish an accessible and shared bicycle docking ring.

**Public Space and AI Scenarios**: The Original Point Square serves as both an open-source release venue and a developer honor wall; the scenarios include a large model classroom, result release showcase, talent station, and open-source contributors archive (scene cards S4, S6, S10).

**Implementation Risks**: Involves negotiations with universities and old communities, requiring discussions on property rights and low-disturbance construction arguments; the space for technology transfer needs to be aligned with the university's technology transfer office.

### 5.3 Dazhongsi AI Industry Cluster (approximately 72.0 hectares)

**Location**: Urban-type Smart Economy District, serving the "Intelligent Body + Terminal + Content Consumption" southern core function.

**Spatial Structure**: The concept is based on "Station City Confluence + Quadrant Walkway Ring + Smart Consumption Street" —— Dazhongsi station quadrants are set up to provide pedestrian connectivity and corner squares. The southern side is planned to utilize green spaces in a composite manner as a "Smart Experience Field in the Park." This corresponds to [data:geometry/constraints.geojson#CZ-003], [data:geometry/public_space.geojson#LM-003], and [data:geometry/roads.geojson#RD-405].

**Building Renovation**: Propose a conceptual direction for updating and transforming adjacent potential sites and the university, encouraging a mixed-use function of "industry + commerce + exhibitions"; the architectural style should aim for a city-type appearance, transparency, and recognizability (Conceptual Recommendation).

**Traffic Slow Zone**: Complete the design direction for pedestrian connectivity in the four quadrants of the Dazhongsi station (non-engineering conclusion), optimize the parking of non-motorized vehicles and the organization of static traffic, and set up unmanned delivery end nodes ([data:geometry/constraints.geojson#SN-007]).

**Public Space and AI Scenarios**: Smart Agora hosts digital art, smart terminal experiences, and content release; the scenarios include smart native commerce, data element sandbox, and AI+Legal Kiosks (scene cards ).

**Implementation Risks**: Site integration involves track ownership and construction safety, requiring specialized research; mechanisms for the circulation of data elements need a compliant sandbox design.

## 6. AI Innovation Ecosystem, Talent Profile, and AI-Enabled Scenario

### 6.1 AI Innovation Ecosystem Map

The ecological map consists of eight categories of elements: **computing power, data, models and open-source, talent, capital, scenarios, services, and governance**. These elements are spatially represented as follows: computing power and full-stack validation (Zhongzhiyuan), data and models (Yuandian Community + universities), open-source and developers (Yuandian Plaza), capital and IP (Zhuancheng Garden Wing), scenarios (Xiaoyuehe Wing + Three Core Areas), and governance (Zhongzhiyuan Governance Ring). The five service zones defined by [depth:overall_spatial_structure] and [data:geometry/constraints.geojson] ground the map in space. The [source:AGENT-TASKBOOK] requirements for land, space, industry, capital, talent, computing power, data, and scenario mechanisms are expressed in the scheme as an "element—space—mechanism" table (Conceptual Recommendation, not constituting a recruitment or funding commitment).

### 6.2 User Profiles (5 Categories)

1. **College Researchers and Young Entrepreneurs**: Require low-cost startup spaces adjacent to laboratories, 24-hour public lounges, and platforms for showcasing results and connecting with investors; corresponding to the Origin Point Community and Open Source Square.
2. **AI Engineers and Developers**: Require open-source collaboration stations, computational power access, testing sandboxes, and community activities; corresponding to the full-stack validation cluster and developer's home in Zhongzhiyuan.
3. ** unicorns and Listed Company Managers**: Require internationalized office spaces, exhibition and conference facilities, legal compliance, and capital services; corresponding to Dazhongsi and the service wing of Zhongguancun.
4. **Resident Needs and Family:** Require childcare, education, healthcare, markets, and safe and accessible Public Spaces; corresponding to the living amenities on the two wings and the eastern side.
5. **Students, Visitors, and International Individuals**: Require cultural tours, multilingual information services, accessible slow mobility, and perceivable AI experiences; corresponding to the Jing-Zhang Heritage Park and pilgrimage landmarks.

Each profile maps to scenario cards and space nodes, and uses anonymized aggregated data within privacy boundaries ([assumption:A-SCENARIO-001]).

### 6.3 AI Scenarios Card (12 cards, including 4 industrial Testing and Validation Scenarios)

| ID | Scenario Card | Spatial Anchor | Service Target | Operational Subject (Concept) | Data/Privacy Boundary |
| --- | --- | --- | --- | --- | --- |
| S1 | AI Full Stack Validation Field (Industrial Testing Validation) | Zhongzhiyuan·Governance Ring [data:geometry/constraints.geojson#SN-011] | Chip/Framework/Model Enterprises | Platform Company + Third-party Evaluation | Desensitization, Sandbox, Human Review |
| S2 | Trusted AI Safety Governance Laboratory (Industrial Testing and Validation) | Zhongzhiyuan·CZ-001 | Governance and Safety Institutions | research institutions+regulatory observers | Tiered Access Control, Traceable for Audit |
| S3 | Green Computing Power and Edge Demonstration (Industrial Testing and Validation) | Zhongzhiyuan·Computing Power Cluster | Computing Power Service Provider | Energy+Computing Power Consortium | Energy Consumption Data Aggregation and Publication |
| S4 | Large Model Classroom and AI Literacy Camp | Origin Community · Academy Bridge [data:geometry/constraints.geojson#SN-006] | Students, Teachers, Families | University + Open Course Platform | Minimize Data for Minors |
| S5 | Smart Pulse Pedestrian Navigation and Signal Prioritization (Industrial Test Validation) | Heritage Park + Wudaokou [data:geometry/constraints.geojson#SN-001] | Commuters, Tourists | Transportation Department + Platform Enterprises | Anonymous Trajectories, Opt-Out |
| S6 | Outcome Presentation Roadshow and Open Source Conference Venue | Origin Square [data:geometry/public_space.geojson#LM-002] | Entrepreneurs, Developers | Community Operations Organizations | Public Content Compliance Review |
| S7 | Intelligent Natively Generated Business and Terminal Experience | Dazhongsi·Intelligent Hub [data:geometry/public_space.geojson#LM-003] | Consumers, Enterprises | Business Operators | No Mandatory Facial Recognition |
| S8 | Data Element Sandbox and Digital Asset Hub | Dazhongsi·CZ-003 | Data and Content Enterprise | Compliance Sandbox Institution | Authorized Data, Auditable |
| S9 | AI+Legal and Open Source Compliance Hub | West Campus [data:geometry/constraints.geojson#SN-005] | Entrepreneurs, Legal | Legal Service Providers | Consultation Records Tiered Confidentiality |
| S10 | Tsinghua Garden · Time Station Cultural Tour | Former Tsinghua Garden Railway Station [data:geometry/constraints.geojson#SN-010] | Citizens, Tourists | Cultural Operations Institution | Location Data Anonymization |
| S11 | Health Services AI Navigation Station | North Beishan [data:geometry/constraints.geojson#SN-012] | Residents, Elderly Population | Hospitals + Communities | Minimized Medical Privacy |
| S12 | Low-Speed Robot Delivery and Shuttle Pilot | Xuezhi Garden - Xiao Yuehe Wing [data:geometry/constraints.geojson#SN-007] | Residents, Campus | Delivery Platform + Property Management | Cameras Limited to Safety Purposes |

The scenario card meets the requirement of the tender document for "at least 10 scenario cards, including at least 3 industrial Testing and Validation Scenarios": [metric:scenario_node_count] spatial anchor points are plotted. [data:geometry/constraints.geojson#SN-001] to [data:geometry/constraints.geojson#SN-012] correspond one-to-one with the cards. All scenarios are Conceptual Recommendations and have not been approved for operation. Privacy boundaries follow the principles of data minimization, anonymous aggregation, opt-in, and Human Review.[assumption:A-SCENARIO-001]).

## 7. Land Use, Building Scale, and Demolish–Renovate–Retain Strategy

### 7.1 Land Use Structure

The Overall Design Area is recalculated as follows (EPSG:4548, provisional boundary):

| Land Use Code | Land Use Name | Area (hectares) | Proportion |
| --- | --- | ---: | ---: |
| 0701 | Town Residential Land | 199.6 | 17.5% |
| 0802 | Research and Development Land | 242.5 | 21.2% |
| 0803 | Cultural Land Use | 36.0 | 3.2% |
| 0804 | Educational Land Use | 108.8 | 9.5% |
| 0805 | Sports Land Use | 19.7 | 1.7% |
| 0806 | Healthcare Land Use | 51.6 | 4.5% |
| 05 | Commercial and Business Service Land Use | 212.6 | 18.6% |
| 1401 | Park Green Spaces | 184.7 | 16.2% |
| 1402 | Protective Green Spaces | 0.0 | 0.0% |
| 1403 | Square Land Use | 30.8 | 2.7% |
| 16 | Vacant Land | 55.0 | 4.8% |

The land use codes correspond to [data:geometry/land_use.geojson] and the metrics [metric:land_use_polygon_count] conceptual units, with area indicators ranging from [metric:land_use_area_0701_sqm] to [metric:land_use_area_16_sqm] (including [metric:land_use_area_1402_sqm] for protective green spaces) calculated geometrically. Each code is derived from the enumeration in [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], and the land use layout is completed at [depth:land_use_layout]. The [self_check:LAND_USE_TOPOLOGY] review covers and overlaps the topological relationships.

### 7.2 Building Scale and Demolish–Renovate–Retain Strategy

The total Building Footprint area is approximately 751,700 square meters ([metric:building_footprint_area_sqm]), which is a indicative conceptual value and does not represent the current condition or approved building scale ([assumption:A-BUILDING-001]). The Demolish–Renovate–Retain Strategy is expressed by category:

- **Preserve Category** (e.g., [data:geometry/buildings.geojson#BD-001] etc. `existing_retained`): universities and research institutions, historical nodes, mature communities, and transit facilities;
- **Renovation Category** (`renovation_proposal`): Underutilized industrial parks and outdated buildings, with a focus on first-floor publicization, green renovations, and functional replacements;
- **Conceptual Recommendation** for **Updated New Construction Class** (`new_proposal`): Vacant and Potential Sites with New Industrial and Supporting Buildings.

Building Height, massing, and roof forms are expressed through stylistic guidance (see Chapter 9), with specific control conditions (see Chapter 9).[metric:building_height_m])Pending official confirmation;[depth:retain_renovate_demolish] With [depth:height_massing_character] Complete.

## 8. Transportation, Railways, Utilities, and Public Services Facilities

### 8.1 Current Conditions and Issues

OSM background data shows that the One Belt and One Road () line along the corridor has a dense concentration of rail resources: the current stations within the study range include Wudaokou, Qinghua Donglu Xi Kou, Zhi Chun Lu, Dazhongsi, Xitucheng, Xueyuan Qiao, Xuezhikang, Qinghe Xiaoying Qiao, Liudao Kou, Beishusanduan, etc. (source: [source:SRC-OSM-2026]); the current main, secondary, and arterial road network forms a conceptual road centerline of [metric:road_centerline_length_m] meters (including OSM current and design lines, [data:geometry/roads.geojson]). The main issues are: discontinuities in the north-south connection of the relic park, insufficient east-west cross-street connections, discontinuities in the surrounding pedestrian and transfer facilities of the stations, and insufficient bicycle parking. [depth:traffic_rail_slow_parking]

The official public stance of Beijing indicates that the share of active transportation has risen to 22.7%.[metric:slow_traffic_share_beijing_2025], 2025 Annual Transportation Development Report), to provide background support for enhancing pedestrian and cycling priority in the belt.[source:SRC-BJ-TRAFFIC-2025]).

### 8.2 Transportation and Pedestrian Design Direction (Conceptual Recommendation)

- **North-South Connectivity**: Form a continuous greenway and pedestrian path along the Jing-Zhang Heritage Park (see [data:geometry/roads.geojson#RD-404]), with safe crosswalks and priority signals for pedestrians and cyclists at ring road and arterial road nodes (subject to engineering feasibility study).
- **East-West Connectivity**: Establish east-west oriented pedestrian and bicycle connections at the Wudaokou, Dazhongsi, and Zhichunlu stations, densifying the network of alleyways and micro-circulations (such as the conceptual lines [data:geometry/roads.geojson#RD-001]).
- **Station-City Integration**: Arrange for bus transfers, shared bicycles, and unmanned terminal connections around rail transit stations([data:geometry/constraints.geojson#SN-001] to [data:geometry/constraints.geojson#SN-012]);
- **Static Transportation**: Provide centralized parking for non-motorized vehicles and facilitate "P+R+Active Transportation" transfers in the vicinity of the station (Conceptual Recommendation).

### 8.3 Municipal and New Infrastructure

Propose a "traditional municipal + AI New Infrastructure" integrated system approach ([depth:municipal_new_infrastructure]): distributed energy nodes, edge-side computing modules, smart street poles, and digital sensing of municipal networks (e.g., within the [data:geometry/constraints.geojson#CZ-001] district); public service facilities are configured in a three-tier system at the community level, district level, and regional level, with the addition of talent apartments, childcare facilities, community centers, sports, and cultural facilities. All capacities, pipelines, and engineering feasibility are pending official municipal data and professional calculations ([assumption:A-CONTROLS-001]).

## 9. Blue-Green Space, Public Space, and Urban Character

### 9.1 Blue-Green Space System

Public Space is based on the concept of "two rivers, one ridge, and multiple gardens": Qinghe River and Xiao Yuehe River serve as the blue-green base, while the Jing-Zhang Heritage Park acts as the green spine running north-south. Along the spine, park green spaces and protective green spaces form a continuous boundaryless system. The green space concept zone covers an area of approximately 184.7 hectares ([metric:green_space_area_sqm]), with a green space ratio of approximately [metric:green_ratio] ([data:geometry/green_space.geojson]), including 184.7 hectares of park green spaces and 0.0 hectares of protective green spaces. The blue-green public space ([depth:blue_green_public_space]) is complete. The public space and aesthetic principles of [standard:MOHURD-URBAN-DESIGN-MEASURES] are implemented in [data:geometry/public_space.geojson].

### 9.2 AI Public Space and Pilgrimage Landmarks

The Public Space system is composed of three layers: "front station square, community square, and AI pilgrimage landmark," covering a total area of approximately 45.6 hectares ([metric:public_space_area_sqm], comprising [metric:public_space_ratio]). The proposal includes [metric:landmark_count] candidate nodes for AI pilgrimage landmarks:

1. **Tsinghua Garden · Time Station** ([data:geometry/public_space.geojson#LM-001]): Leverage the cultural resources of the old Tsinghua Garden Railway Station by setting up AI cultural tours and a century-old railway narrative installation.
2. **Zhi Mai Yuan Dian Open Source Square** ([data:geometry/public_space.geojson#LM-002]): Origin community open source release, developer honor wall, and "Contributor Monument" display;
3. **Dazhongsi·Smart Venue** ([data:geometry/public_space.geojson#LM-003]): Station-city integrated Public Space, featuring digital art and smart terminal experiences.
4. **Zhongzhiyuan·Governance Ring** ([data:geometry/public_space.geojson#LM-004]): Trusted AI Testing Observation Window and Governance Honor Display;
5. **Wudaokou·Intelligence Pulse Shuttle Plaza** ([data:geometry/public_space.geojson#LM-005]), **Qinghua East Road West Mouth·Origin Portal Plaza** ([data:geometry/public_space.geojson#LM-006]), **Zhi Chun Road·Service Wing Kiosk Plaza** ([data:geometry/public_space.geojson#LM-007]) as stations portal nodes.

Conceptual Recommendations are provided for the landmarks, without involving any conclusions regarding conservation works; the conservation control area (e.g., the former site of the Tsinghua Garden Railway Station) awaits official delineation confirmation ([assumption:A-BOUNDARY-001]).

### 9.3 Urban Character and Cultural Narrative

**Cultural Narrative**: From the inauguration of the Jing-Zhang Railway under Zhan Tianyou in 1909, to the concentration of universities on Academy Road in the 1950s, to the rise of Zhongguancun Electronics Street in the 1980s and today's AI industry hub, a railway line weaves together a century-long narrative of "national self-strengthening—scientific and educational prosperity—innovation-driven development—intelligent era"([source:SRC-JINGZHANG-HISTORY]). This plan uses "rail and pulse" as its core symbol: zigzag lines represent historical tracks, waveforms represent AI data streams, and both intersect at stations, forming "each station is a handshake between history and the future."

**Naming and Visual Identity Direction**: Main name "Zhi Mai Yi Dai" (suggested in English as AI Pulse Line, abbreviated APL); sub-zone names suggested as "Zhongzhiyuan·Pulse Core" "Yuan Dian Community·Innovation Origin" "Dazhongsi·Smart Gathering Place"; the wings are named "Zhongguancun·Service Hub Wing" "Xiao Yue He·Scenario Experiment Wing". Logo direction is a "Dual Track Pulse" graphic: two zigzagging steel tracks evolve into a set of ascending waveforms, paired with a square stamp-style logo; color direction is steel gray, tech blue, and Tsinghua purple; no commercial font or registered trademark is bound (as required by [source:AGENT-TASKBOOK] for naming, logo, and visual identity direction).

**Wayfinding System Direction**: The theme is "Track—Station—Pulse". Historical segments use rail elements, innovative segments use wave elements, and scene nodes use glowing pulse elements. Wayfinding and the overall logo system should be managed separately to avoid confusion ([source:AGENT-TASKBOOK]).

![Traffic Slow Zone and Blue-Green Public Space Composite System Diagram](assets/figures/mobility-bluegreen.png)

## 10. Update the project list, implementation policies, and phased plan

### 10.1 Update Project List (14 items, Conceptual Recommendation)

| Number | Project (Concept) | Type | Spatial Location | Dependent Conditions | Implementation Subject (Concept) | Phases |
| --- | --- | --- | --- | --- | --- | --- |
| R1 | Ruins Park South Segment | Public Space | Dazhongsi—Xizhimenwai Direction | Park Implementation Boundary, Cultural Relics Protection Control Line | District Government + Professional Team | P1 |
| R2 | Dazhongsi Station Quadrant Four Pedestrian Loop | Transportation/Public Space | Dazhongsi Station | Rail Right-of-Way, Transportation Specialization | Rail+District Department | P1 |
| R3 | Update of Wudaoqiao Station Forecourt | Public Space | Wudaoqiao | Site Boundary, Commercial Interface | District Authorities+Property Management | P1 |
| R4 | Smart Pulse Origin Open Source Square | Public Space | Origin Community | University Consultation and Land Conditions | Community Operations Entity | P1 |
| R5 | Xiao Yuehe Scenario Sandbox | Scenario Operations | Xiao Yuehe Wing | Compliance and Safety Assessment | Platform + Community | P1 |
| R6 | Autonomous Delivery Low-Speed Pilot | Scenario Operations | Xuezhi Garden—Xiaoyuehe Wing | Traffic and Safety Permit | Delivery Platform + Property Management | P1 |
| R7 | Zhongzhiyuan Full Stack Validation Field | Industrial Space | Zhongzhiyuan | Platform Construction, Testing Standards | Platform Company + Research Institution | P2 |
| R8 | Trustworthy AI Governance Laboratory | Industrial Space | Zhongzhiyuan·Governance Ring | Ethics and Safety Review | Research+Regulatory Observer | P2 |
| R9 | Tsinghua Garden · Time Station | Cultural Public Space | Former Tsinghua Garden Railway Station | Cultural Heritage Approval, Exhibition Design | Cultural Operations Entity | P2 |
| R10 | Academy Bridge AI Education Pilot Station | Public Services | Academy Bridge | Collaboration with Education Departments | University + Education Platform | P2 |
| R11 | West Tucheng AI+Legal Service Station | Public Services | West Tucheng | Legal Service Admission | Legal Institutions + Park | P2 |
| R12 | Origin Talent Apartments and Youth Community | Residential Accommodation | Surrounding Origin Community | Ownership and Update Conditions | Professional Operator | P3 |
| R13 | Dazhongsi Intelligent Economy Experience Center | Industrial Space | Dazhongsi | Industrial Recruitment and Commercial Operations | Platform Company + Commercial Operations | P3 |
| R14 | Elastic Development Demonstration for Vacant Land | Industrial/City Form | Individual Vacant Units | Control Detailed Plan Conditions, Demand Assessment | District Authorities + Market | P3 |

The project list corresponds to the three-phase scope [data:geometry/phasing.geojson] (Phase 1 approximately 410.7 hectares, Phase 2 approximately 377.1 hectares, Phase 3 approximately 353.5 hectares, [metric:phase1_area_sqm], [metric:phase2_area_sqm], [metric:phase3_area_sqm]), and both [depth:renewal_project_list] and [depth:phasing_implementation] have been completed.

### 10.2 Implementation Policy Orientation (Conceptual Recommendation)

- **Scenario Access Policy**: Establish an "Scenario Declaration—Sandbox Testing—Assessment Exit" open operation mechanism, without pre-setting suppliers.
- **Data Governance**: Anonymous aggregation, tiered authorization, Human Review, and audit trail;
- **Update Guidelines**: Align with the direction for low-disturbance updates and "first-floor publicization" guidelines;
- **Flexible Floor Area Ratio Mechanism**: Within the official control framework, study the rules for transferring and releasing Floor Area Ratio (requires statutory procedures, [assumption:A-CONTROLS-001]).

### 10.3 Global AI Innovation Ecosystem and Long-Term Operations

- **Annual Activity Framework**: It is recommended to form an "Jing-Zhang AI Week" (including Open Source Conference, Developer Marathon, Scenario Access Day, Cultural Walk) and a quarterly "Zhi Mai Release" series (Conceptual Recommendation, [source:AGENT-TASKBOOK]).
- **Branding and Communication**: Use "IntelliVene Belt" as the unified activity brand direction, with bilingual Chinese-English text: "From Railway Pulse to AI Pulse".
- **Developer Community Operations**: GitHub Open Source Collaboration + Offline Developer Home, contributors enter the honor display system (inscriptions and electronic records);
- **Scenario Access Operations**: A five-step closed loop including admission, safety, privacy, data management, and exit mechanisms.
- **Public Engagement and Landmark Operations**: Implement "cultural operation + community co-creation" at sacred landmark nodes, with regular rotations of exhibitions and displays.
- **International Promotion and Attraction Transformation**: Attract international developers and teams through events, completing the transformation path from "event→community→enterprise services→space landing" (Conceptual Recommendation, not constituting a recruitment promise).

## 11. Indicator System, Area Recalculation, and Standardized Matrix

### 11.1 Core Indicators

All spatial metrics have been recalculated from the submitted GeoJSON in EPSG:4548 ([depth:metrics_recalculation], [self_check:METRICS_RECALC]).

- Overall Design Area: [metric:site_area_sqm] square meters (approximately 1141.3 hectares)
- Green space area: [metric:green_space_area_sqm] square meters, green space ratio [metric:green_ratio].
- Public Space Area: [metric:public_space_area_sqm] square meters, comprising [metric:public_space_ratio].
- Building Conceptual Base: [metric:building_footprint_area_sqm] square meters;
- Centerline length of the road: [metric:road_centerline_length_m] meters;
- Land Use Units: [metric:land_use_polygon_count] units;
- Key areas: Zhongzhiyuan [metric:key_area_zhongzhiyuan_sqm] square meters, Original Point Community [metric:key_area_origin_sqm] square meters, Dazhongsi [metric:key_area_dazhongsi_sqm] square meters;
- AI service zone area: [metric:ai_service_zone_area_sqm] square meters;
- Scene nodes: [metric:scenario_node_count]; Sacred landmarks: [metric:landmark_count]; Update projects: [metric:renewal_project_count]
- Phase  Study Scope: [metric:phase1_area_sqm] m², [metric:phase2_area_sqm] m², [metric:phase3_area_sqm] m²;
- Background data: Haidian AI companies [metric:ai_company_count_haidian], AI unicorns [metric:ai_unicorn_count_haidian], primary and secondary schools [metric:school_count_haidian] in total, universities [metric:university_count_haidian] (publicly reported minimum), students [metric:student_count_haidian] in total, and the share of slow travel in Beijing [metric:slow_traffic_share_beijing_2025].

Statutory Control Parameters ([metric:floor_area_ratio], [metric:building_density], [metric:building_height_m], [metric:total_gfa_sqm])Due to the absence of official conditions, all are unknown, See the usage_note of [data:geometry/site_boundary.geojson#SITE-001] and [assumption:A-CONTROLS-001].

### 11.2 Conform to Regular Grid

compliance_matrix.json covers all 17 tasks outlined in official announcements 1.3, 1.4, and 1.5, corresponding to six tasks in the agent_taskbook (agent.1—agent.6), each with a chapter, layer, metric, drawing, HTML page, source, assumptions, and self-check evidence; standard_matrix.json covers five mandatory professional standards; design_depth_matrix.json covers 15 required depth items and is fully complete. [self_check:PROFESSIONAL_EVIDENCE] passed, [self_check:DATA_GAPS] recorded remaining gaps.

![Re-calculation of Core Indicators and Evidence Chain Diagram](assets/figures/metrics-evidence.png)

## 12. Risk, Copyright, and Compliance Statements

### 12.1 Documentation and Data Risks

- Official Boundary Missing: The provisional rough polygons were used for the three tiers of area and three key zones; official CAD/GIS ([assumption:A-BOUNDARY-001]) must be replaced before formal scoring.
- Control plan conditions missing: Floor Area Ratio, height, density, green space ratio, and setback distances are all unknown (this plan does not make a legal standard conclusion [assumption:A-CONTROLS-001]).
- Missing Existing Building Inventory: buildings.geojson is a conceptual illustration, and does not represent the current state or the Demolish–Renovate–Retain Strategy conclusions ( [assumption:A-BUILDING-001] ) ;
- OSM data only as background: not used for boundaries, redlines, or area references ([assumption:A-OSM-001]). (Background Only)

### 12.2 Scenarios and Operational Risks

All AI scenarios and operational mechanisms are Conceptual Recommendations and have not been approved for deployment or operation (e.g., [assumption:A-SCENARIO-001], [assumption:A-OPERATION-001]). Privacy boundaries include: data minimization, anonymous aggregation, opt-in, Human Review, no over-monitoring, protection of minors, and opt-out mechanisms. The scenarios must not require the use of non-public data, personal privacy, or specific suppliers as necessary conditions.

### 12.3 Copyright and Compliance

- The concept recommendation is original, with the naming, logo direction, charts, and text generated by the intelligent system. It does not contain unauthorized trademarks, fonts, portraits, or copyrighted images. (Conceptual Recommendation)
- OSM data are provided under the ODbL license [source:SRC-OSM-2026].
- The official announcement and task statement are provided for reference only; no unauthorized or unpublicized materials were used.
- This plan does not claim government approval or endorsement, and does not express any determination of government arrangements, investments, funding, or business attraction commitments.
- Detailed copyright and generation information can be found in [report/copyright_statement.md](report/copyright_statement.md).

### 12.4 List of Missing Materials

Official three-story structure and key area polygon, control plan conditions, road red lines and sections, current parcel and ownership, existing building baseline, cultural relic control range, municipal pipeline and fire safety, and public service facility baseline (corresponding to data/processed/missing_data_checklist.csv's GAP-BOUNDARY-001 to GAP-SERVICE-001). After completing the updates, the entire package must be recalculated and sources.json, assumptions.json, and self_check.json must be updated.

## 13. References

- [source:SITE-PACKAGE]: `brief/site-package/` (Task Statement, Enumerations, Permitted Design Space, Constraints, Schema)
- [source:SOURCE-REGISTRY]: `data/source_registry.json`
- [source:PROCESSED-FACT-PACK]: `data/processed/agent_fact_pack.md`
- [source:BOUNDARY-SOURCE] / [source:KEY-AREA-SOURCE] / [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]: `brief/site-package/geometry/provisional_boundaries.geojson`
- [source:OFFICIAL-ANNOUNCEMENT] / [source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]: Centennial Jing-Zhang AI Innovation Belt Urban Design International Scheme Call for Qualification Pre-Review Announcement, Haidian Branch of Beijing Municipal Commission of Planning and Natural Resources, 2026-05-09, https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/tzgg/hd/202605/t20260509_4643047.html
- [source:AGENT-TASKBOOK] / [source:DATA-SRC-AGENT-TASKBOOK-20260518]: Extract from the Open Call for Urban Design of the Centennial Jing-Zhang AI Innovation Belt (User Authorization Document) (Centennial Jing-Zhang AI Innovation Belt Open Call for Urban Design)
- [source:DATA-SRC-MOHURD-URBAN-DESIGN-MEASURES]: Urban Design Management Measures, Ministry of Housing and Urban-Rural Development Order No. 35, 2017
- [source:DATA-SRC-MOHURD-CONTROL-DETAILED-PLANNING]: **Regulatory Detailed Planning Compilation and Approval Measures for Cities and Towns**, Ministry of Housing and Urban-Rural Development Order No. 7, 2011
- [source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311]: Land and Sea Use Classification Guide for Spatial Investigation, Planning, and Land Use Control, Ministry of Natural Resources, No. 234, NatResourIss2023-234
- [source:SRC-OSM-2026]: OpenStreetMap data and copyright attribution, https://www.openstreetmap.org/copyright (ODbL)
- [source:SRC-HAIDIAN-PROFILE-2025]: Overview of Haidian, Beijing Municipal Government Website, https://www.beijing.gov.cn/renwen/bjgk/hdgk/index.html
- [source:SRC-ZGC-AI-2025]: ZPark Science City 2025 First-Half Year Report (1,900 AI companies, 26 AI unicorns),  Beijing Daily client app, https://xinwen.bjd.com.cn/content/s688cbe8ee4b0aabe0a047083.html
- [source:SRC-HAIDIAN-EDU-2025]: Main Situations and Statistical Data of Educational Development in Haidian District for the 2024-2025 Academic Year,https://zyk.bjhd.gov.cn/jbdt/auto4489_51785/zdly/202504/t20250409_4764168.shtml
- [source:SRC-BJ-TRAFFIC-2025]: 2025 Annual Report on Traffic Development in Beijing (pedestrian and bicycle share 22.7%, peak congestion index 5.2), https://www.sohu.com/a/921098494_122120704
- [source:SRC-JINGZHANG-HISTORY]: Official page for the Centennial Jing-Zhang AI Innovation Belt Open Call for Urban Design (historical narrative and call for submissions), https://haidian.open-city.ai/

> This scheme is an Open Co-Creation Conceptual Recommendation for AI agents, not a substitute for formal planning, nor a government-approval conclusion; all spatial implementation suggestions are conceptual recommendations, reference schemes, or content for professional teams to deepen their research.
