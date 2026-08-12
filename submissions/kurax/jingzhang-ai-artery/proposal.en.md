---
title: "Jing-AI Artery: Urban Design Concept for the Centennial Jing-Zhang AI Innovation Belt"
author_github: "kurax"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Under the overall concept of the Jing-AI Artery, this proposal upgrades the Jing-Zhang railway heritage corridor from a commemorative green axis into operable urban intelligent infrastructure — a composite artery carrying slow mobility, autonomous shuttles, edge computing and civic service agents at once — linking the Zhongzhiyuan, AI Origin Community and Dazhongsi key areas into a spatial structure of One Artery, Three Cores, Two Wings and Two Networks, with twelve AI scenario cards."
tracks: ["ai-traffic-walkability", "robotics-autonomous-mobility", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "robot-delivery-low-speed", "ai-cultural-guide"]
iteration: "v1.0"
---

# Jing-AI Artery

**Urban Design Concept for the Centennial Jing-Zhang AI Innovation Belt**

> This proposal is an open co-creation suggestion submitted to the "Centennial Jing-Zhang AI Innovation Belt Urban Design Open Call." It does not replace statutory planning and does not constitute an approved government conclusion. All spatial suggestions are conceptual proposals and reference schemes for professional teams to deepen [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

---

## Design Basis and Source Inventory

### One judgment to state first: our boundary is provisional, but the design logic is not

This proposal works under a real data condition: at the time of writing, the organizer has not released official vector redlines for the overall design area or the three key areas. What the repository provides is a **provisional constraint** inferred by an agent from announced areas and major roads, explicitly labelled as rough in precision [source:BOUNDARY-SOURCE] [data:geometry/site_boundary.geojson#PROV-SITE-001].

This limitation determined how the proposal is written. Rather than avoiding it, we made it part of the structure: **no conclusion that depends on precise redlines is given** — no floor area ratio, no building height, no parcel-level retain/renovate/demolish, no road alignment. Design effort concentrates instead on judgments that hold without redline precision: the topology of spatial structure, corridor connectivity logic, the match between scenarios and people, and the design of operating mechanisms. When official redlines arrive, such judgments **do not need to be overturned, only re-measured**.

Concretely, the provisional boundary may be used for concept generation, human-readable visualization, non-statutory design discussion and local self-check; it may not be used as an official redline, an approval basis, precise area calculation, statutory planning control, or a land-ownership or engineering boundary [source:BOUNDARY-SOURCE]. Items requiring recalculation once official polygons arrive are recorded item by item as recalculation triggers in the assumptions file, principally site area, green ratio, public space ratio, building footprint and the three key-area areas [metric:site_area_sqm].

### Source grading and usage discipline

The proposal strictly separates three tiers of usability. **Usable for formal argument**: the prequalification announcement, which carries the controlling requirements on project purpose, three-level scope, design tasks and deliverable depth [source:OFFICIAL-ANNOUNCEMENT]; the agent taskbook, carrying ten co-creation principles, three positioning statements, five functions and six tasks [source:AGENT-TASKBOOK]; the Urban Design Management Measures [standard:MOHURD-URBAN-DESIGN-MEASURES]; the Measures for Formulation and Approval of Regulatory Detailed Planning for Cities and Towns [standard:MOHURD-CONTROL-DETAILED-PLANNING]; the Guidelines for Land and Sea Use Classification in Territorial Spatial Survey, Planning and Use Control [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; the Interim Measures for the Management of Generative AI Services [standard:GENERATIVE-AI-INTERIM-MEASURES]; and the Barrier-Free Environment Construction Law [standard:BARRIER-FREE-ENVIRONMENT-LAW].

**Usable only for provisional generation and display** is the provisional boundary data above. **Usable only as background** is the implementation plan on difficulties older people face with smart technology; the proposal uses it to support age-friendly design and human-fallback judgments, but does not treat it as a direct control basis for this project [standard:ELDERLY-SMART-TECH-PLAN-2020-45].

Complete source records, rights statements, metric formulas, standard responses, design depth and task coverage are kept respectively in the sources file, the metrics file, the task coverage matrix, the professional standard matrix and the design depth matrix. The narrative does not transcribe these machine indexes.

![Evidence chain and submission package relationship diagram](assets/figures/site-overview.png)

### What this proposal does not do

Following the taskbook's unified boundary clause, this proposal gives no statutory planning judgments such as regulatory plan adjustment, floor area ratio or building height; no parcel-level retain/renovate/demolish conclusions; no engineering schemes for road alignment, rail alignment, bridges and tunnels or municipal pipelines; no underground-space feasibility or municipal capacity calculations; no land ownership, investment estimate or approval judgments; and it uses no non-public government data, internal enterprise data or personal privacy data [source:AGENT-TASKBOOK]. The building fabric, road centrelines and phasing extents appearing in the text are **conceptual illustrative geometry** used to express structural relationships and orders of magnitude; their attributes are all marked as design suggestions and they do not constitute engineering alignment [data:geometry/buildings.geojson#BLDG-C2R7-1].

---

## Three-Level Scope Framework

### Three scales, three kinds of design task, three deliverable precisions

The three-level scope set by the announcement is not one thing at three magnifications but three different kinds of work. The proposal therefore gives three different deliverable precisions rather than covering all scales at one depth.

**The coordinated research area (about 43.6 km²)** answers "what role does this belt play in the regional innovation network." Deliverables at this scale are industrial synergy relationships, innovation-factor flow paths, a division of labour with the Beiwei community, Future Science City, Huairou Science City and the Economic-Technological Development Area, and the skeleton of a continuous green space system. The form is strategy and relationship diagrams, not parcel-level design [data:geometry/site_boundary.geojson#PROV-RESEARCH-001].

**The overall design area (about 11.4 km²)** answers "how does the belt organize itself." This is the proposal's main field of work, at the urban design depth of regulatory detailed planning: spatial structure, land use layout, development intensity zoning intent, height and massing intent, the blue-green public space system, transport and slow-mobility organization, renewal object classification and a phasing framework. Recalculated from the provisional boundary in EPSG:4548, this area is 11,412,825 m², consistent with the announced approximately 11.4 km², which verifies that the provisional boundary is usable at the level of magnitude [metric:site_area_sqm] [data:geometry/site_boundary.geojson#PROV-SITE-001].

**The key detailed design area (about 368.4 ha)** answers "how do the critical nodes actually run." The three key areas are taken to the urban design depth of a comprehensive implementation plan: positioning, spatial structure, building renewal intent, transport and slow mobility, public space, AI scenario configuration and implementation risk. Recalculated areas are 192.9 ha for the Zhongzhiyuan AI Autonomous Innovation Acceleration Area, 104.3 ha for the Beijing AI Origin Community and 72.0 ha for the Dazhongsi AI Industry Cluster, totalling 369.2 ha — a 0.2% deviation from the announced 368.4 ha, within the reasonable error of a provisional boundary [depth:three_level_scope_framework] [data:geometry/key_areas.geojson#PROV-KEY-001].

### What transmits between the three levels

Transmission between the three levels does not rely on administrative hierarchy but on **the continuity of one artery**. The north-south innovation corridor established in the coordinated research area lands in the overall design area as one concrete spatial carrier, the Jing-Zhang Heritage Park composite corridor, and lands in the key areas as three concrete corridor interface segments (the Qinghe interface segment, the Origin Community segment and the Dazhongsi segment). A strategic judgment at one scale thus has an explicit spatial recipient at the next, instead of a newly invented structure [depth:overall_spatial_structure].

![Three-level scope and spatial work framework diagram](assets/figures/land-use-structure.png)

---

## Coordinated Research Area: Industry and Future-City Strategy

### The overall concept: why "Jing-AI Artery"

**Chinese principal name: 京智动脉. English name: Jing-AI Artery. Abbreviation: JIA.**

The core judgment behind the name is this: the belt's most distinctive asset is not "many AI companies" but **a continuous linear space about 9.7 km long running north-south** — the Jing-Zhang railway heritage corridor. No other innovation district in Beijing has this. Zhongguancun has density but no continuous corridor; Future Science City has space but no centennial narrative. The proposal therefore does not treat the heritage corridor as a relic to be protected with a commemorative greenway, but as **the one piece of infrastructure this belt cannot replicate elsewhere**, and loads function onto it.

"Artery" carries three layers. **Physical**: a genuinely continuous channel carrying slow mobility, autonomous shuttles, utility tunnels and edge computing nodes. **Informational**: the sensing and computing facilities along the corridor form the belt's data trunk, serving transport, public services and industrial testing. **Cultural**: the Jing-Zhang railway was the first trunk line the Chinese built themselves, and that core of "self-reliance" is the same thing today's demand for full-stack AI autonomy is asking for, one era later. What the artery carries is not only people and data but the continuity of self-reliant innovation.

"智" (intelligence) rather than "AI" was chosen for the Chinese name because it points simultaneously to intelligent technology and urban wisdom, and because with "京" it forms a place-name-style abbreviation (京智) with the potential to become a toponym — as "京张" itself did.

### A naming system: each positioning statement gets its own name

The naming is not a single title but an extensible system, so that each of the three positioning statements has its own linguistic landing point instead of crowding everything into one word [source:AGENT-TASKBOOK]:

| Positioning | System name | Naming logic | Principal spatial carrier |
|---|---|---|---|
| Centennial Jing-Zhang Culture Belt | **京张轨 · JZ Track** | "Track" means rail, and also historical trajectory and inheritance | Corridor culture segments, Tsinghua Garden Station site, Dazhongsi Ancient Bell Museum surroundings |
| Urban AI Life Experience Belt | **京智脉 · JIA Pulse** | "Pulse" means heartbeat and the rhythm of daily life, stressing perceptible experience | AI Origin Community, Zhichun Road life belt, Xiaoyuehe scenario empowerment wing |
| AI Integrated Innovation Belt | **京智核 · JIA Core** | "Core" means kernel, computing core and innovation source | Zhongzhiyuan AI acceleration area, Zhongguancun technology service wing |

The three sub-names share the morphemes "京" and "智" to form a family resemblance, while each can travel independently, suited to the three distinct discourse settings of culture-tourism, community operation and industrial attraction.

### Visual identity and Logo direction

The Logo direction takes the **zigzag** as its core figure. The choice has an explicit basis: the switchback (colloquially the "人"-shaped or zigzag line) at Qinglongqiao Station on the Jing-Zhang railway is a landmark technical innovation in Chinese railway history, a concrete symbol of "solving a hard constraint with an ingenious move." In an AI context the same broken line reads simultaneously as **chip routing** and as a **heartbeat pulse waveform**. Three meanings coincide in one figure, which this proposal considers the most effective identity strategy available [source:AGENT-TASKBOOK].

Suggested composition: a single zigzag trunk rising from bottom to top, with three progressively larger nodes at its three turning points, corresponding to the rising energy levels of the three key areas from south to north (Dazhongsi → Origin Community → Zhongzhiyuan); the line opens upward at its end and does not close, signifying continuing evolution.

Suggested extension: the zigzag can stretch into path indication lines in the wayfinding system, guiding patterns in public space paving, the layout skeleton of event posters, and the axes of data visualizations. It remains legible in a single colour and suits embroidery, metal etching, screen display and small-format use.

On rights: the Logo direction is a verbal description and a geometric logic. The proposal supplies no font files, image assets, portraits or corporate marks requiring licence. A formal visual system must be deepened by a professional team after trademark search and font licensing [source:AGENT-TASKBOOK].

### The synergy loop of three positionings, five functions, three areas and two wings

The taskbook sets out three positionings and five functions but does not prescribe how they mesh. The answer this proposal offers is **a closed loop**, not five parallel blocks [source:AGENT-TASKBOOK]:

The **full-stack autonomous AI innovation system** (Zhongzhiyuan) produces technology → the **AI+ scenario empowerment paradigm** (Xiaoyuehe wing, heritage corridor) supplies real scenarios for validation → validation feeds back into technical iteration while forming the perceptible services of the **intelligent vibrant AI city** (Origin Community, Dazhongsi) → running those services accumulates governance experience and draft standards → which support **global discourse power in AI governance** (Origin Community governance laboratory) → discourse and standards attract global factors back → the **world-class AI innovation ecosystem** (Zhongguancun technology service wing) completes factor allocation → factors return to Zhongzhiyuan to support the next round of technical work.

The crucial point of this loop is that **scenarios are not a downstream showroom for technology but an upstream input to its iteration**. Scenario nodes are therefore placed directly in the corridor and the communities rather than concentrated in a single "demonstration park."

The division of labour follows: Zhongzhiyuan carries the full-stack autonomous system and governance discourse; the AI Origin Community carries the world-class ecosystem and governance experiment; Dazhongsi carries AI-native business formats; the Zhongguancun technology service wing carries factor allocation and IP conversion; the Xiaoyuehe scenario empowerment wing carries scenario opening and test validation [source:AGENT-TASKBOOK].

### Overall spatial structure: One Artery, Three Cores, Two Wings, Two Networks

**One Artery** — the Jing-Zhang Heritage Park composite corridor. Running through north to south, it is the structural trunk. Four systems are superimposed within it: a continuous slow-mobility way, an autonomous shuttle loop, edge computing and sensing nodes, and cultural narrative nodes. Recalculated, park green land totals 2.401 million m², 21.0% of the overall design area, of which the public space spine along the corridor is 1.560 million m² [metric:green_ratio] [data:geometry/public_space.geojson#PUBLIC-ARTERY].

**Three Cores** — the three key areas act as three "ventricles" on the artery, each with independent function and operating rhythm, kept continuous through the corridor.

**Two Wings** — the Zhongguancun technology service wing (west, inheriting existing innovation-service density) and the Xiaoyuehe scenario empowerment wing (east, taking up waterfront openness and testing-ground demand). The two wings form a "service–validation" pairing across the corridor.

**Two Networks** — the **Smart Mobility Network** covers motorized, slow and autonomous shuttle modes with 9 principal channels, recalculated at 36.1 km total length [data:geometry/roads.geojson#ROAD-ARTERY-SLOW]; the **Smart Service Network** is the deployment network of civic service agents, physically anchored on 8 scenario nodes extending into communities, the interchange, the waterfront and intersections [data:geometry/public_space.geojson#SCN-ORIGIN-SVC].

### Five to eight global AI innovation ecosystem cases and transferable lessons

The following cases all rest on publicly documented city and district development experience, used to extract mechanisms rather than copy form. The proposal fabricates no company lists, investment figures, output values or fiscal commitments [source:AGENT-TASKBOOK].

**Case 1: autonomous-driving clustering in Pittsburgh, USA (around Carnegie Mellon University).** The mechanism is the short distance between university laboratories and city streets: researchers can validate algorithms on real streets minutes away, and that physical proximity is the real cause of clustering. **Transferable lesson**: the proposal places the autonomous-driving test ground in the Xiaoyuehe wing, roughly 2 km straight-line from Zhongzhiyuan, keeping the "laboratory–test ground" trip within 15 minutes [data:geometry/public_space.geojson#SCN-XYH-TEST].

**Case 2: King's Cross regeneration, London, UK.** The mechanism is converting derelict railway land into a mixed-use district, keeping industrial structures as the skeleton of public space, and sustaining phased development over fifteen years or more with patient capital under long-term single ownership. **Transferable lesson**: corridor renewal should use long-cycle phasing rather than single-shot completion, and should retain recognizable railway structures as the spatial skeleton of public space rather than clearing the site and redoing the landscape.

**Case 3: Superilles (superblocks), Barcelona, Spain.** The mechanism is gaining large amounts of walking space at very low cost by reallocating carriageway right-of-way to public space through traffic organization alone, without building new roads. **Transferable lesson**: the slow-mobility priority strategy proposed along the corridor relies mainly on right-of-way reallocation, offered as a conceptual suggestion for professional assessment, with no road alignment or redline conclusion given.

**Case 4: public service digitalization under Singapore's Smart Nation programme.** The mechanism is standardizing and opening government service interfaces so third-party developers build on a common base, while human service channels are retained. **Transferable lesson**: the Smart Service Network adopts the triad of "common interface + open development + human fallback," where human fallback is a hard configuration rather than an option [standard:BARRIER-FREE-ENVIRONMENT-LAW].

**Case 5: Cheonggyecheon restoration, Seoul, Korea.** The mechanism is removing an elevated road to restore a watercourse, using one linear public space to restructure value and the pedestrian network in surrounding districts. **Transferable lesson**: the value of a linear space lies not in its own width but in the density of its interfaces with the blocks on either side. The proposal therefore stresses lateral east-west stitching interfaces rather than longitudinal continuity alone.

**Case 6: Brainport high-tech campus, Eindhoven, Netherlands.** The mechanism is an "open innovation" institutional design in which firms share pilot equipment and experimental facilities, lowering the heavy-asset threshold for any single actor. **Transferable lesson**: Zhongzhiyuan should be equipped with shared computing and pilot facilities — offered as a conceptual suggestion, with scale and investment to be calculated by professional teams.

**Case 7: Kendall Square, Boston, USA.** The mechanism is a high degree of mixing between R&D offices, housing and retail, maximizing the probability of informal exchange. **Transferable lesson**: in the Origin Community the proposal places the science-education conversion district immediately adjacent to residential communities rather than segregating them; residential land is 33.3% of the area against 24.9% for research, a ratio of mixture rather than separation [data:geometry/land_use.geojson#LU-C2-R5].

**Case 8: multi-level public space at Toranomon-Azabudai, Tokyo, Japan.** The mechanism is making public space a multi-level continuous system under high density. **Transferable lesson**: the Dazhongsi area is cut by railway and arterial roads, so public space continuity can only be solved across levels; the proposal lists this as a direction requiring engineering feasibility study by professional teams and gives no bridge or tunnel conclusion [source:AGENT-TASKBOOK].

### The AI innovation ecosystem map and factor mechanisms

The ecosystem map has five rings: the **kernel** is Zhongzhiyuan's full-stack autonomous technical work (chips, frameworks, models, toolchains); the **second ring** is the Origin Community's technology transfer and governance experiment; the **third ring** is Dazhongsi's AI-native consumption and business formats; the **fourth ring** is factor allocation and scenario validation in the two wings; the **fifth ring** is regional synergy within the coordinated research area with the Beiwei community, Future Science City, Huairou Science City and the Economic-Technological Development Area.

Suggested mechanisms for eight factors follow. **Land**: renewal of existing stock first, supplying innovation space through functional mixing rather than new land supply. **Space**: a continuous gradient from single desk to standalone building, avoiding large-floorplate-only stock. **Industry**: scenario demand pulls technology supply. **Capital**: explore long-cycle patient capital mechanisms (a conceptual suggestion, involving no specific financial arrangement). **Talent**: reduce commuting cost through adjacency of housing and services. **Computing**: a two-tier architecture of "corridor edge nodes + concentrated cloud valley at Zhongzhiyuan," edge nodes serving low-latency scenarios and concentrated nodes serving training demand [data:geometry/public_space.geojson#SCN-ZZY-CLOUD]. **Data**: define data boundaries per scenario, with no cross-scenario aggregation. **Scenarios**: establish an open-scenario list and admission rules so firms can apply to test in real space.

All factor mechanisms above are conceptual suggestions and do not constitute settled policy arrangements, investment-attraction commitments or funding arrangements [source:AGENT-TASKBOOK].

### Regional synergy and territorial-spatial planning innovation

Regionally, the proposal suggests this belt take the role of a **validation hub** rather than yet another industrial park. Future Science City and Huairou Science City have large scientific facilities and large-scale land, suited to heavy equipment and long-cycle research; the development area has manufacturing capacity, suited to volume conversion. This belt's distinctive condition is **high-density real urban scenarios + intense talent concentration + a continuous linear public space**, which best suits the link of "validating technology inside a real city." Such a division avoids duplicated construction and matches each area's endowment to its use.

On planning method, the proposal offers three research-level ideas. First, **scenario as a planning element** — overlaying a "scenario openness" attribute layer on conventional land-use classification, marking which spaces permit which intensity of technical testing, so that planning can govern technical activity and not only construction. Second, **temporal elasticity of land use** — the same space serving different functions at different times (a corridor segment opening as a test ground off-peak), which requires planning tools that support time-based control. Third, **quantified expression of mixed use** — supplementing a single land-use code with a "functional mix" indicator that reflects the actual functional ratio. All three require feasibility assessment by professional teams within the current statutory framework; the proposal does not advocate departing from current rules [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

---

## Overall Design Area: Urban Renewal at Regulatory-Plan Urban Design Depth

### Diagnosis: three real problems

The diagnosis rests on publicly available understanding of spatial pattern. Judgments involving specific building ownership, existing building quality and municipal capacity lack official data and are all listed as pending official data [depth:existing_conditions_diagnosis].

**Problem one: continuous north-south, severed east-west.** The belt runs about 9.7 km north-south, but its east-west width falls below 1.5 km in many places and is cut transversely by the North Third Ring, North Fourth Ring, Zhichun Road, Chengfu Road and other east-west arterials. The corridor is continuous on paper and cut into segments in experience. This is the first spatial problem the proposal addresses.

**Problem two: dense innovation factors, insufficient public space for encounter.** This is among the most innovation-dense districts in the country, yet informal exchange between actors happens mostly inside buildings (cafés, meeting rooms), with a shortage of high-quality outdoor public space able to carry chance encounter. That limits the efficiency of knowledge spillover.

**Problem three: the corridor's value is underestimated by the "protection" narrative.** Treated only as commemorative historical space, it would become a green strip of very low use intensity, unable to answer the belt's urgent need for functional space. The corridor must carry real urban function.

### Spatial structure and functional layout

The spatial responses are, respectively: **east-west stitching** (concentrating design effort where the corridor meets arterials, turning breaks into nodes), **loading function onto the corridor** (placing public exchange and scenario validation within it), and **polarizing the cores** (building sufficient functional intensity in the three key areas rather than spreading evenly).

Land use follows this structure; the recalculated composition is [depth:land_use_layout] [data:geometry/land_use.geojson#LU-AXIS-R5]:

| Land use category | Code | Area (10k m²) | Share | Structural role |
|---|---|---|---|---|
| Urban residential land | 0701 | 379.7 | 33.3% | Talent housing base, mainly in the two wings |
| Public management and public service land (research) | 0802 | 284.4 | 24.9% | Core carrier of Zhongzhiyuan and the R&D belt |
| Park green land | 1401 | 240.1 | 21.0% | Corridor body and waterfront green belts |
| Commercial and business land | 05 | 140.7 | 12.3% | Dazhongsi formats and life services |
| Protective green land | 1402 | 43.7 | 3.8% | Watercourse and railway buffers |
| Educational land | 0804 | 42.7 | 3.7% | Origin Community science-education conversion |
| Urban road land (interchange) | 1207 | 10.0 | 0.9% | Dazhongsi integrated transport interchange |

The partition uses a grid skeleton of seven rows north-south and five columns east-west, with the central column as the corridor; adjacent parcels share boundary coordinates, achieving full coverage of the boundary with no gaps and no overlaps. Topological checking gives a coverage gap of only 45 m² (0.0004% of total area, at the level of coordinate rounding) and zero overlapping pairs [data:geometry/land_use.geojson#LU-C1-R7].

This structure answers one key judgment: **the one-third residential share is deliberate**. A common failure in innovation districts is tilting land use too far toward industry, forcing talent into long commutes and thereby reducing the actual effect of concentration. The 33.3% residential share adjacent to the 24.9% research share is a spatial translation of the Kendall Square lesson.

### Development intensity, height and massing intent

The proposal gives no floor area ratio or building height figures; these are statutory planning judgments outside the scope of an open call [source:AGENT-TASKBOOK] [depth:development_intensity_controls].

As a conceptual suggestion, the **distribution intent** is: a trough along the corridor rising toward both sides, producing a section that is "open in the middle, concentrated at the sides," giving the corridor ample sunlight and openness of view; north-south, the three key areas form three intensity peaks with lower intensity in transition segments, producing rhythm rather than uniformity. The height principle is that first-row buildings along the corridor step back and lower to avoid a continuous high wall; around heritage sites (Tsinghua Garden Station site, Dazhongsi Ancient Bell Museum) heritage protection requirements govern strictly, and height and massing require dedicated review under official heritage rules, on which the proposal gives no conclusion [data:geometry/constraints.geojson#CONS-HER-QHY] [depth:height_massing_character].

Building footprint recalculates to 1.061 million m², a building coverage of about 9.3%, across 123 conceptual illustrative masses [metric:building_footprint_area_sqm] [data:geometry/buildings.geojson#BLDG-C2R7-1]. The figure indicates the order of magnitude of a conceptual fabric expressing "low coverage, high green volume, compact grouping"; it is not a construction-scale conclusion. Total floor area cannot be computed for want of a floor area ratio condition and is listed as pending official data.

### The logic for retain, renovate, demolish and build new

The proposal **gives no retain/renovate/demolish conclusion for any specific parcel**; that exceeds the open call's boundary and lacks data on existing building quality, ownership and structural safety [source:AGENT-TASKBOOK] [depth:retain_renovate_demolish].

What it gives is **classification criteria** for professional teams to apply once survey data exists. **Retain as a priority**: railway structures of historical value, structurally sound and functionally suitable existing research buildings, mature residential communities. **Renovate**: buildings mismatched to new demand but structurally sound, especially former industrial buildings convertible to shared R&D and pilot space. **Assess demolition cautiously**: only where structural safety is compromised or public space continuity is severely blocked, and only after lawful ownership and compensation procedures. **Build new**: concentrated where a functional gap is clear (interchange transfer facilities, public service nodes), aiming to complete function rather than add volume.

The bias of these criteria is **existing stock first**: this belt's spatial problem is mainly "insufficient connection" and "functional mismatch," not "insufficient total volume," so renewal should work mainly through renovation and connection.

### Renewal project framework

Renewal projects are organized in three classes, with the list in the phasing chapter below [depth:renewal_project_list]: **structural projects** (corridor continuity, east-west stitching nodes, interchange integration) address the skeleton; **functional projects** (scenario nodes, public service facilities, shared R&D carriers) address function; **quality projects** (wayfinding, corridor edge interfaces, cultural narrative nodes) address experience. The three are not sequential: each phase contains all three, so every phase yields a perceptible complete result.

### Municipal and new-type infrastructure

Capacity assessment for conventional municipal systems (water, drainage, power, gas, telecom) requires official data; the proposal performs no calculation and lists this as pending official data [depth:municipal_new_infrastructure].

The **integration method** for new-type infrastructure is a conceptual suggestion of the proposal: build edge computing nodes, sensing devices and charging or battery-swap facilities **in the same trench and the same period** as conventional utility tunnels, rather than retrofitting later. The reason is that the operating needs of such facilities (power, heat rejection, inspection access) overlap heavily with municipal systems, so simultaneous construction markedly lowers whole-life cost. Because of its continuous linear character the corridor is the space best suited to carry such a composite tunnel [data:geometry/roads.geojson#ROAD-ARTERY-SLOW]. Configuration scales for distributed energy and edge computing require professional calculation, and the proposal gives no figures.

---

## Detailed Design for the Three Key Areas

All three key-area polygons are provisional constraints, so the designs below are **directional conceptual suggestions**; conclusions dependent on precise boundaries (parcel division, setbacks, specific scale) must be re-derived once official redlines arrive [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design].

![Index and design tasks of the three key areas](assets/figures/key-areas.png)

### Zhongzhiyuan AI Autonomous Innovation Acceleration Area (192.9 ha)

**Positioning**: the source area for full-stack autonomous technical work, carrying two functions — the full-stack autonomous AI innovation system, and global discourse power in AI governance.

**Spatial structure**: the corridor's Qinghe interface segment forms the east-west face, producing "one belt, three clusters" — the west research cluster (basic research and algorithms), the central AI acceleration core (engineering and toolchains) and the east computing cluster (computing facilities and data services). The three clusters sit side by side along the corridor rather than in series, so any cluster is within walking distance of it [data:geometry/land_use.geojson#LU-C2-R7].

**Building renewal intent**: mainly renovation of existing research buildings, above all converting closed standalone research blocks into **clusters around shared atria**, inserting shared pilot and equipment space between buildings. This is the spatial translation of the Eindhoven open-innovation lesson: shared facilities must sit physically between actors, not inside one of them. Renovation schemes for specific parcels require ownership and structural data first.

**Transport and slow mobility**: pedestrian priority internally, with motorized traffic resolved at cluster edges. The west and east smart mobility arterials carry external connection, and clusters connect to each other through the corridor slow-mobility way and the autonomous shuttle loop [data:geometry/roads.geojson#ROAD-WSPINE].

**Public space**: the core is the **Jing-Zhang Departure Station Plaza** at the corridor's northern segment, the only open space among the three key areas facing the Qinghe watercourse directly. It serves two functions: everyday informal exchange among researchers, and the main venue of the annual event [data:geometry/public_space.geojson#PUBLIC-PLAZA-ZZY].

**AI scenario configuration**: the AI Computing Cloud Valley (a visible interface onto concentrated computing facilities) and the Qinghe AI Waterfront Lounge (an intelligent service node within waterfront public space) [data:geometry/public_space.geojson#SCN-ZZY-CLOUD].

**Implementation risk**: ownership among existing research institutions is complex and renovation requires case-by-case negotiation at high time cost; power and heat-rejection demand from computing facilities may exceed existing municipal capacity and needs dedicated assessment. Both require further study by professional teams.

### Beijing AI Origin Community (104.3 ha)

**Positioning**: a community-scale sample of a world-class AI innovation ecosystem, carrying the world-class ecosystem function and the governance experiment. This is where **AI comes closest to daily life** in the proposal.

**Spatial structure**: the corridor's Origin Community segment is the axis, with residential community along Zhongguancun East Road to the west, the science-education conversion district in the centre, the Zhichun Road AI life and commerce belt to the east, and residential community furthest east. This is a symmetrical **housing–conversion–commerce–housing** structure, so the conversion district abuts living functions on both sides and maximizes the probability of informal exchange [data:geometry/land_use.geojson#LU-C2-R5].

**Building renewal intent**: the conversion district uses educational land as its carrier (427,000 m²) and should take a **small-grain, high-density, continuous-frontage** form, producing a walkable street network rather than a superblock layout. Residential communities are mainly renovated in place, focusing on activating ground-floor frontages and barrier-free upgrading [standard:BARRIER-FREE-ENVIRONMENT-LAW].

**Transport and slow mobility**: Zhichun Road AI Avenue and Chengfu Road AI Life Street are the two principal east-west channels, and their intersections with the corridor are this area's most important stitching nodes. The design point for slow mobility is keeping the walking distance from residential communities to the corridor within 500 m [data:geometry/roads.geojson#ROAD-ZCL].

**Public space**: the core is the **Zhichun AI Lounge**, a public space addressed to residents rather than practitioners alone. Its design intent is that AI services here are used and appraised daily by ordinary residents, making the space the site of the governance experiment [data:geometry/public_space.geojson#PUBLIC-PLAZA-ORIGIN].

**AI scenario configuration**: the intelligent service station (community node of civic service agents), the Zhongguancun AI public service lounge, and the Wudaokou smart intersection [data:geometry/public_space.geojson#SCN-ORIGIN-SVC].

**Heritage constraint**: the Tsinghua Garden Station site lies within this area; its protection extent and construction control requirements follow official heritage rules. The proposal marks it only as a constraint and gives no conclusion on surrounding construction [data:geometry/constraints.geojson#CONS-HER-QHY].

**Implementation risk**: renovating existing residential communities involves resident willingness and the coordination of interests, requiring full public participation; deploying AI services in communities involves personal information protection and must comply strictly with the relevant rules while preserving the right not to use intelligent services [standard:GENERATIVE-AI-INTERIM-MEASURES].

### Dazhongsi AI Industry Cluster (72.0 ha)

**Positioning**: the concentrated carrier of AI-native consumption and business formats. Among the three key areas this one has **the best transport conditions and the greatest renewal pressure**.

**Spatial structure**: the AI integrated transport interchange is the core, with commercial and business functions extending in four directions. The interchange occupies 100,000 m² and is the proposal's only urban road land (interchange) parcel; the intent is to complete transfer between rail station, conventional bus, autonomous shuttle and slow mobility within one spatial body [data:geometry/land_use.geojson#LU-AXIS-R2-HUB].

**Building renewal intent**: mainly renewal of formats within existing commercial buildings; in form, a **compact high-density block** is suggested, contrasting with the low-density corridor to the north. The contrast is intended: an artery needs different density rhythms in different segments, and uniformity along the whole line would forfeit legibility.

**Transport and slow mobility**: the area is held between the south and north Dazhongsi urban roads and adjoins an existing rail station. The central difficulty for slow mobility is crossing the arterials; the proposal offers the direction of a multi-level continuous system while stating explicitly that bridge, tunnel and underground-space feasibility requires professional review, and gives no conclusion [data:geometry/roads.geojson#ROAD-DZS-N] [source:AGENT-TASKBOOK].

**Public space**: the core is the **AI Interchange Plaza** south of the interchange, serving both interchange dispersal and public activity [data:geometry/public_space.geojson#PUBLIC-PLAZA-DZS].

**AI scenario configuration**: the AI integrated transport interchange station (intelligent dispatch across multiple transfer modes) [data:geometry/public_space.geojson#SCN-DZS-HUB].

**Cultural constraint**: the Dazhongsi Ancient Bell Museum lies to the south and is an important cultural resource. The proposal suggests incorporating it as the southern cultural anchor of the narrative system, with protection requirements per official rules [data:geometry/constraints.geojson#CONS-HER-DZS].

**Implementation risk**: exit and conversion of existing commercial formats involve operators' interests; integrated renovation of the interchange requires coordination with rail operating bodies, is difficult to implement and needs a long cycle.

---

## AI Innovation Ecosystem, Talent Profiles and AI+ Scenarios

### Five user personas

Personas here are not market segments but a way to test whether the design actually serves people. Five personas are defined, each with concrete spatial needs and a failure risk [source:AGENT-TASKBOOK].

**Persona 1: algorithm researcher (roughly 25–40, graduate background, working in Zhongzhiyuan and the Origin Community).** Core needs are the ability to switch between intense focused work and frequent informal exchange, and low-threshold access to test grounds. **Failure risk**: if testing requires cross-district application and approval, the research rhythm breaks. **Spatial response**: shared pilot facilities between clusters; test ground within a 15-minute trip of the R&D area [data:geometry/public_space.geojson#SCN-XYH-TEST].

**Persona 2: startup team member (roughly 22–35, micro and small enterprises, rent-sensitive).** Core needs are affordable small floorplates, elasticity to expand on demand, and chances to meet potential customers and investors. **Failure risk**: only large high-rent premises exist and teams are forced out. **Spatial response**: a continuous space gradient from single desk to standalone building; encounter venues placed in public space rather than in paid meeting facilities.

**Persona 3: community resident (all ages, including many older residents).** Core needs are everyday convenience, safe and comfortable public space, and the right **not to be compelled to use intelligent services**. **Failure risk**: after government and life services move fully online, residents who do not use smart devices are excluded from service. **Spatial response**: every node of the Smart Service Network is required to provide a staffed service channel, and that channel must not be degraded in location or waiting time [standard:BARRIER-FREE-ENVIRONMENT-LAW] [standard:ELDERLY-SMART-TECH-PLAN-2020-45].

**Persona 4: commuter and transferring passenger (users of the Dazhongsi interchange and stations along the line).** Core needs are short transfer distance, clear paths and accurate information. **Failure risk**: multi-modal transfer is run in silos and the real walking distance far exceeds what signage claims. **Spatial response**: the interchange integrates rail, bus, autonomous shuttle and slow mobility within one spatial body [data:geometry/public_space.geojson#SCN-DZS-HUB].

**Persona 5: international visitor and developer (short visits, attending events or surveying).** Core needs are to grasp quickly what the belt is doing and to see scenarios genuinely running rather than display boards. **Failure risk**: only planning models and promotional films are on offer. **Spatial response**: a public experience route stringing genuinely operating scenario nodes into a self-guided walk.

### Twelve AI scenario cards

Each card states spatial location, users served, data boundary, human review arrangement and suggested operator. Cards 10–12 are AI industry test and validation scenarios (satisfying the requirement of no fewer than three). All scenarios are conceptual suggestions and must not be read as approved operations [source:AGENT-TASKBOOK] [standard:GENERATIVE-AI-INTERIM-MEASURES].

**Card 01 | Corridor autonomous shuttle loop (AI + transport)**
Location: the full Jing-Zhang Heritage Park composite corridor [data:geometry/roads.geojson#ROAD-ARTERY-SLOW]. Users: commuters along the line, visitors, people with reduced mobility. Operating data: vehicle position, passenger counts, path occupancy; no passenger identity or facial data collected. Privacy boundary: passenger flow by anonymous counting, no individual tracking. Human review: remote attendant per vehicle with takeover on anomaly; conventional walking and cycling routes retained along the whole line. Suggested operator: local operating platform with the vehicle technology provider. Risk: mixed-traffic safety requires dedicated review; the proposal gives no engineering conclusion.

**Card 02 | Wudaokou smart intersection (AI + transport)**
Location: where the corridor meets the east-west road at Wudaokou [data:geometry/public_space.geojson#SCN-WDK-INTER]. Users: crossing pedestrians, cyclists, motor vehicles. Operating data: directional volumes, waiting times, conflict event counts. Privacy boundary: statistics only, no identifiable imagery stored. Human review: signal strategy changes require traffic authority approval; algorithmic suggestions are advisory only. Suggested operator: traffic management authority. Risk: signal optimization touches statutory traffic management powers and must be implemented lawfully.

**Card 03 | Dazhongsi interchange intelligent dispatch (AI + transport)**
Location: the Dazhongsi AI integrated transport interchange [data:geometry/land_use.geojson#LU-AXIS-R2-HUB]. Users: transferring passengers. Operating data: arrival and departure times by mode, platform crowding, transfer flows. Privacy boundary: no access to personal ticketing identity. Human review: station staff may override dispatch suggestions at any time. Suggested operator: rail and bus operating bodies. Risk: data coordination across operators needs an agreement basis.

**Card 04 | Community intelligent service station (civic agent governance × public services)**
Location: the Zhichun AI Lounge in the Origin Community [data:geometry/public_space.geojson#SCN-ORIGIN-SVC]. Users: community residents, older residents in particular. Operating data: types of matters handled, handling duration, rate of transfer to staff. Privacy boundary: matter content is not retained at the local node; identity verification is handled by existing government systems. Human review: **a staffed counter and the intelligent terminal open at the same place and time**, with no queue reset on transfer to staff. Suggested operator: sub-district office. Risk: if the terminal replaces the staffed counter it constitutes service exclusion of a specific group, a practice the proposal explicitly opposes.

**Card 05 | Zhongguancun AI public service lounge (civic agent governance × public services)**
Location: the Zhongguancun technology service wing [data:geometry/public_space.geojson#SCN-ZGC-LOUNGE]. Users: enterprises and startup teams. Operating data: enquiry matters, policy matching results, progress. Privacy boundary: enterprise operating data not reused across matters. Human review: conclusions on policy applicability must be confirmed by staff before issue. Suggested operator: campus service institution. Risk: misreading policy may cause enterprise loss; disclaimer and correction mechanisms must be explicit.

**Card 06 | Qinghe AI waterfront lounge (AI + public space)**
Location: the Qinghe interface north of Zhongzhiyuan [data:geometry/public_space.geojson#SCN-QH-WATER]. Users: people using the waterfront. Operating data: intensity of space use, environmental comfort (temperature, humidity, noise). Privacy boundary: no personal identification. Human review: facility adjustments decided by the managing body. Suggested operator: park management unit. Risk: waterfront safety management takes priority over intelligent functions.

**Card 07 | Corridor cultural narrative guiding (AI + culture)**
Location: culture segments of the heritage corridor, including the surroundings of the Tsinghua Garden Station site [data:geometry/constraints.geojson#CONS-HER-QHY]. Users: visitors, study groups. Operating data: guiding requests, route choices. Privacy boundary: not bound to user identity. Human review: historical content must be vetted by professional history institutions; free generation of historical facts by a model is prohibited. Suggested operator: culture and heritage authorities with an operator. Risk: factual error would damage cultural seriousness; the content base must be fixed after human vetting.

**Card 08 | Shared pilot facility booking (AI + industrial services)**
Location: the central AI acceleration core of Zhongzhiyuan [data:geometry/land_use.geojson#LU-C2-R7]. Users: researchers and startup teams. Operating data: equipment status, booking schedule, usage duration. Privacy boundary: experiment content not reported, only equipment occupancy recorded. Human review: equipment safety review is performed by staff. Suggested operator: shared facility operating institution. Risk: allocation of equipment safety responsibility must be explicit.

**Card 09 | Age-friendly life service assistant (AI + life services)**
Location: the Origin Community and residential communities in the two wings [data:geometry/land_use.geojson#LU-C1-R5]. Users: older residents and their families. Operating data: service request types, response times. Privacy boundary: no health or family information collected; emergency calls connect directly to staff. Human review: all service dispatch confirmed by community personnel. Suggested operator: sub-district and community service institutions. Risk: intelligent services must not replace necessary home visits [standard:ELDERLY-SMART-TECH-PLAN-2020-45].

**Card 10 | Open autonomous-driving test ground (AI industry test and validation)**
Location: the Xiaoyuehe scenario empowerment wing [data:geometry/public_space.geojson#SCN-XYH-TEST]. Users: autonomous-driving firms and research institutions. Operating data: vehicle behaviour logs, scenario replay data. Privacy boundary: clear notice signage within the test area, with physical separation between public and test areas. Human review: a safety operator on site for every test, capable of immediate takeover. Suggested operator: test ground operator with the industry authority. Risk: open-road testing requires a lawful permit; the proposal does not prejudge permit outcomes.

**Card 11 | Edge computing node performance validation (AI industry test and validation)**
Location: edge computing nodes along the corridor and the Zhongzhiyuan cloud valley [data:geometry/public_space.geojson#SCN-ZZY-CLOUD]. Users: computing facility and model deployment parties. Operating data: latency, throughput, energy indicators. Privacy boundary: synthetic workloads only, no real user data. Human review: test plans reviewed by a technical committee. Suggested operator: computing facility operator. Risk: the effect of energy and heat rejection on municipal capacity requires professional calculation.

**Card 12 | Robot urban-environment adaptability validation (AI industry test and validation)**
Location: the corridor slow-mobility way and public space nodes, in defined time windows [data:geometry/public_space.geojson#SCN-ARTERY-ROBOT]. Users: service robot and embodied intelligence developers. Operating data: passage success rate, obstacle-avoidance behaviour, environment interaction records. Privacy boundary: notice posted during test windows, avoiding capture of public imagery; where imagery is required it must be de-identified on site. Human review: human supervision throughout; the public's priority right of way is not transferable. Suggested operator: scenario opening management body. Risk: the safety boundary for mixing with the public must be determined by professional review.

### How the scenario–space–operation mapping is organized

The twelve cards are not a flat list but organized in three layers: a **base layer** (cards 01–03, transport, serving everyone, reliability first); a **service layer** (cards 04–09, public and life services, inclusiveness first, human fallback as a hard constraint); and a **validation layer** (cards 10–12, industry testing, controllability first, physical and temporal isolation as hard constraints). Because the consequence of failure differs by layer, so does risk management: the base layer aims at zero interruption, the service layer at zero exclusion, the validation layer at zero spillover.

### A unified boundary for data and human review

All scenarios observe four hard boundaries. **First**, no collection of personal identity or biometric information, save where legally necessary on a separate basis. **Second**, data isolated per scenario, with no cross-scenario aggregation or profiling. **Third**, any judgment affecting personal rights must pass human review, and the reviewer's conclusion prevails over algorithmic output. **Fourth**, every intelligent service retains a non-intelligent alternative path and must not become the sole channel to a public service [standard:GENERATIVE-AI-INTERIM-MEASURES] [standard:BARRIER-FREE-ENVIRONMENT-LAW].

---

## Land Use, Building Scale and the Retain/Renovate/Demolish Scheme

Composition and ratios were tabulated in the overall design chapter; this section adds design meaning and recalculation conventions [depth:land_use_layout].

**The intent behind functional ratios.** Research land (2.844 million m², 24.9%) concentrates in Zhongzhiyuan and the central R&D belt, forming a continuous innovation carrier belt rather than scattered points; commercial and business land (1.407 million m², 12.3%) concentrates at Dazhongsi and Zhichun Road, avoiding the corridor's core segments so the corridor stays public rather than commercialized; park green land (2.401 million m², 21.0%) has the corridor as its body and is the third-largest category in the proposal — a magnitude that guarantees the corridor is wide enough to carry composite function rather than being a planting strip [metric:green_ratio].

**Footprint and development intensity.** Building footprint is 1.061 million m², coverage 9.3% [metric:building_footprint_area_sqm]. The coverage is lower than a typical built-up area because the conceptual illustrative geometry expresses only the position and grouping of principal functional masses, not all existing buildings. **Total floor area cannot be computed**, since it needs a floor area ratio condition, which belongs to regulatory planning and is not inferred here [depth:development_intensity_controls].

**Recalculation conventions.** All areas are exchanged in EPSG:4326 and computed in the EPSG:4548 projection. The difference between total land-use area and site boundary area is 45 m², arising from coordinate rounding rather than topological error [data:geometry/land_use.geojson#LU-C1-R1]. Green ratio is park green land plus protective green land over site area; public space ratio is public space layer area over site area. The two overlap spatially (the corridor is both green space and public space) and therefore cannot be added [metric:public_space_ratio].

**Retain, renovate, demolish.** Criteria were set out in the overall design chapter. To restate: the proposal gives no parcel-level conclusion; such judgments require data on existing building quality, structural safety, ownership and resident willingness, and must be made by professional teams through statutory procedure [depth:retain_renovate_demolish] [source:AGENT-TASKBOOK].

---

## Transport, Rail, Municipal and Public Service Facilities

### The Smart Mobility Network: three modes, one corridor

The network has 9 principal channels, recalculated at 36.1 km total length [data:geometry/roads.geojson#ROAD-ESPPINE] [depth:traffic_rail_slow_parking]. Its organizing principle is **layering by mode rather than by hierarchy**: the corridor slow-mobility main way carries walking, cycling and autonomous shuttles (conventional motor vehicles excluded); the east and west smart mobility arterials carry motorized traffic; the east-west urban roads carry district connection and the stitching function.

**Rail integration.** Dazhongsi and Wudaokou are two existing rail stations [data:geometry/constraints.geojson#CONS-METRO-DZS]. Integration is not about building more passages but about **minimizing the decision cost of transferring**: switching modes within one spatial body, with information provided ahead of the transfer point. Specific station renovation schemes bear on rail operating safety and must be reviewed jointly by professional teams and the operating body.

**Slow-mobility breaks.** The corridor's intersections with four east-west arterials are the four principal breaks. The proposal's direction is to turn each break into a **stitching node** — concentrating public space, service facilities and scenario nodes at the crossing so that crossing itself becomes a spatial experience with content rather than mere passage. A multi-level continuous system is one possible technical route, but bridge and tunnel feasibility requires professional review and no conclusion is given [source:AGENT-TASKBOOK].

**Parking and bicycles.** An organization of **concentrated at the perimeter, restricted inside** is suggested: car parking concentrated on one side of the flanking arterials, with no conventional parking inside the corridor; bicycle parking at concentrated points at each corridor node with charging facilities. Specific provision ratios belong to regulatory planning and no figures are given.

### Integrating municipal and new-type infrastructure

Municipal capacity assessment requires official data and is listed as pending. The suggestion to build new-type infrastructure **in the same trench and period** as conventional systems was set out above [depth:municipal_new_infrastructure].

One judgment to add: **the siting of edge computing nodes should follow scenarios, not power conditions**. Low-latency scenarios (transport, robots) require computing physically close to where the scenario occurs, so nodes distribute along the corridor; training demand is latency-tolerant and can concentrate in the Zhongzhiyuan cloud valley. This two-tier architecture makes the corridor the distributed carrier of computing, and is the technical basis on which the proposal calls the corridor "infrastructure" rather than "landscape" [data:geometry/public_space.geojson#SCN-ZZY-CLOUD].

**Public service facilities.** The 8 scenario nodes of the Smart Service Network double as physical carriers of public service, avoiding a separate set of facilities for intelligent services. Every node is staffed-capable; this is a hard requirement [standard:BARRIER-FREE-ENVIRONMENT-LAW].

![Composite system of slow mobility and blue-green public space](assets/figures/mobility-bluegreen.png)

---

## Blue-Green Space, Public Space and Urban Character

### The Jing-Zhang Heritage Park vitality belt: east-west stitching and north-south continuity

**North-south continuity** is the corridor's basic task, achieved through the continuous slow-mobility way and the autonomous shuttle loop, with a public space spine of 1.560 million m² [data:geometry/public_space.geojson#PUBLIC-ARTERY].

**East-west stitching** is the harder and more decisive task. The belt's east-west width is limited, and a corridor that only connects longitudinally becomes a "green wall" separating the two sides. Stitching works through: nodes at the corridor's intersections with east-west roads, making lateral crossing clear, short and continuous in experience; permeable corridor edges, avoiding continuous walls and back-facing layouts; and functions in the two wings opening onto the corridor rather than turning away from it [depth:blue_green_public_space].

**The blue-green system.** Qinghe to the north and Xiaoyuehe to the east are two external watercourses, marked as constraint and landscape resource [data:geometry/constraints.geojson#CONS-XYH-WATER]. Waterfront green belts (protective green land, 437,000 m²) carry ecological and buffer functions. The 21.0% green ratio (park green land) is, under this proposal's conventions, a recalculated value from conceptual illustrative geometry and must be recalculated once official boundaries arrive [metric:green_ratio].

### Three AI pilgrimage landmarks

The design judgment on landmarks is that **their persuasiveness comes from carrying real activity, not from unusual form**. All three landmarks are therefore function-led, with form following function [source:AGENT-TASKBOOK].

**Landmark 1: Jing-Zhang Departure Station Plaza · Memorial Ground of Self-Reliant Innovation (north end of Zhongzhiyuan).** The carrier is the open plaza at the corridor's north end facing Qinghe [data:geometry/public_space.geojson#PUBLIC-PLAZA-ZZY]. Its "pilgrimage" quality comes from superimposing two narratives: the self-built history of the Jing-Zhang railway and the contemporary demand for full-stack AI autonomy, stated together in one place. An **open-source contributor honour display system** is suggested — a continuously updatable physical carrier (such as a replaceable plaque matrix) recording individuals and teams who contribute openly to the belt, including participants in this open call. The honour display must have explicit selection rules and an update mechanism, and every attribution requires the person's authorization.

**Landmark 2: Zhichun AI Lounge · Urban Agent Governance Laboratory (Origin Community).** The carrier is public space addressed to residents [data:geometry/public_space.geojson#PUBLIC-PLAZA-ORIGIN]. Its "pilgrimage" quality comes from being **one of the few places in the world where one can openly observe how AI public services are actually used, questioned and improved by real residents**. A public service appraisal mechanism and an operating data board (aggregate indicators only, no personal information) are suggested here, making the governance process itself something that can be visited and studied. This is, in the proposal's view, the landmark with the greatest international communication value — what it displays is not technical capability but governance capability.

**Landmark 3: Dazhongsi AI Interchange Station · Intelligent Mobility Experience Gateway (Dazhongsi).** The carrier is the interchange and its plaza [data:geometry/public_space.geojson#PUBLIC-PLAZA-DZS]. Its "pilgrimage" quality comes from being the belt's southern gateway and the first point of contact for most visitors. The starting point of the public experience route is suggested here, so that visitors can begin experiencing on arrival without first visiting an exhibition centre. The Ancient Bell Museum answers it as the southern cultural anchor, forming an "ancient bell — AI interchange" pairing across time [data:geometry/constraints.geojson#CONS-HER-DZS].

Constraints common to all three: no violation of heritage, green space, blue line or traffic safety requirements; no bridge, tunnel, underground-space or engineering feasibility conclusions; no unauthorized involvement of enterprise buildings or owned space; restrained formal expression avoiding excessive entertainment or internet-celebrity treatment [source:AGENT-TASKBOOK].

### Public space component library

So that the concept can be deepened directly by professional and operating teams, a set of **reusable public space components** is suggested: the intelligent service kiosk (with a staffed position), the integrated edge computing and sensing pole, the autonomous shuttle platform, the scenario notice board (stating what intelligent function runs there, what data is collected, and how to reach staff), the updatable honour plaque matrix, and the zigzag wayfinding element. Components use one zigzag visual language so the whole line remains legible at detail scale. All components are conceptual suggestions; materials, dimensions and construction detailing require professional design.

### Urban character

The suggested key is **restrained technicity**: rational geometry, plain materials and precise detail to express technical character, avoiding piled-on futuristic decoration. Building frontages along the corridor stress permeability and openings to produce publicness; roof form in the Zhongzhiyuan area should integrate equipment and greening to bring order to the fifth elevation. Character around heritage sites follows official protection requirements, on which the proposal gives no conclusion [depth:height_massing_character].

---

## Renewal Project List, Implementation Policy and Phasing

### Phasing framework

Phasing runs in three phases, each containing structural, functional and quality projects so that every phase produces a perceptible result [depth:phasing_implementation]. Recalculated phase areas are [data:geometry/phasing.geojson#PHASE-1]:

| Phase | Period | Area (10k m²) | Share | Core task |
|---|---|---|---|---|
| Near-term start-up | 2026–2028 | 481.0 | 42.1% | Corridor spine continuity + start-up segments of the three cores + first scenario nodes |
| Mid-term advance | 2028–2031 | 577.2 | 50.6% | Principal renewal parcels in the three key areas and two wings |
| Long-term deepening | 2031–2035 | 83.0 | 7.3% | Overall renewal of the southern and peripheral transition belt |

**Leading with the corridor in the near term** is a deliberate ordering: the corridor is the structural trunk, so opening it first gives every later district renewal something to attach to; and corridor continuity is the result most readily perceived by the public, which helps build confidence.

### Renewal project list

**Structural projects**: corridor spine continuity works (near term); four east-west stitching nodes (near to mid term); integrated renovation of the Dazhongsi interchange (mid to long term); construction of the autonomous shuttle loop (near to mid term).

**Functional projects**: the 8 scenario nodes of the Smart Service Network (first three near term, completed mid term); shared pilot facilities (mid term); edge computing nodes along the line (near to mid term); age-friendly community upgrading (near term); the autonomous-driving test ground (mid term).

**Quality projects**: line-wide wayfinding and component system (near term); upgrading of corridor edge interfaces (mid term); cultural narrative nodes (near to mid term); the honour display system (near term).

All projects are conceptual suggestions; implementing bodies, funding sources, approval procedures and timing must be settled through statutory procedure, and the proposal makes no commitment [source:AGENT-TASKBOOK].

### Global AI innovation event system and long-term operation

**Annual event system.** A "one main, two supporting" annual rhythm is suggested: the **main event** is an annual AI Innovation Week (autumn suggested, main venue the Jing-Zhang Departure Station Plaza), covering technical releases, scenario open days and governance discussion; **supporting event one** is a quarterly developer gathering (Origin Community, small scale and high frequency); **supporting event two** is a standing monthly scenario open day at which the public can book experience of genuinely operating scenario nodes. The intent is that **frequent small events sustain community activity while the annual large event builds international influence**, avoiding a single conference once a year.

**Event brand and communication visuals.** The brand builds on the Jing-AI Artery principal name and the zigzag visual system; annual events may use extended naming such as "JIA Week." Communication visuals continue the broken-line language to keep recognition continuous year to year.

**Developer community operation.** The core is a **two-way mechanism between open source and open scenarios**: members may apply to use scenario nodes for validation and, in return, contribute reusable results to a public knowledge base. This open call is itself a first practice of that mechanism — participants' proposals enter the public knowledge base for later deepening [source:AGENT-TASKBOOK]. A contributor honour system is suggested, linked to the honour display of Landmark 1.

**Scenario opening operation.** Establish an open-scenario list (which spaces, which time windows, which tests are allowed), admission rules (safety, privacy, insurance) and an exit mechanism. The premise of opening is that public interest comes first: no test may reduce the public's right of way, level of safety or access to service.

**Public experience and landmark operation.** The public experience route starts at the Dazhongsi interchange and runs north along the corridor, stringing the three landmarks and the principal scenario nodes, completable on foot combined with the shuttle. Route information is publicly available with no paywall.

**International communication and conversion.** The suggested core message is **"governance you can observe"** rather than "the most advanced technology" — technical leadership is hard to claim durably, whereas an open, appraisable practice of AI public service governance is scarce and verifiable. The suggested conversion path is: international visitors build understanding through the experience route and the annual event → conduct actual validation through the scenario opening mechanism → complete service landing through the technology service wing.

All event, brand, community, attraction and operating arrangements above are conceptual suggestions and directions for deepening, and do not constitute settled government arrangements, event commitments, funding arrangements or investment-attraction commitments [source:AGENT-TASKBOOK].

---

## Centennial Jing-Zhang Culture, Zhongguancun Culture and the New AI Culture

### Three cultures are not parallel but three stages of one thread

The core judgment of the cultural narrative is that Jing-Zhang railway culture, Zhongguancun innovation culture and the new AI culture are not three heterogeneous cultures needing "fusion" but **one spirit expressed in three eras** — self-reliance.

**Stage one (1909, the Jing-Zhang railway)**: under dual constraints of technology and capital, Chinese engineers completed a trunk railway themselves, and the Qinglongqiao switchback typifies "solving a hard constraint with an ingenious move." **Stage two (1980s to present, Zhongguancun)**: on a weak industrial base, grassroots innovation spontaneously formed China's densest concentration of technological innovation. **Stage three (present, AI)**: under the demand for full-stack technical autonomy, a complete autonomous system across chips, frameworks, models and toolchains is being explored.

The shared structure of the three stages is **external constraint + autonomous choice + ingenious solution**. This is, in the proposal's view, the most persuasive and also the most honest narrative thread: it neither exaggerates nor invents, and it is supported by historical fact [source:AGENT-TASKBOOK].

### The Jing-Zhang railway historical and cultural resource system

Cultural resources available within the area mainly include the Tsinghua Garden Station site (an important station remnant of the Jing-Zhang railway) and the Dazhongsi Ancient Bell Museum (a regional cultural landmark) [data:geometry/constraints.geojson#CONS-HER-QHY]. Their specific protection grade, protection extent and construction control requirements follow official heritage rules; the proposal makes no determination and incorporates them only as constraints [depth:existing_conditions_diagnosis].

The suggested spatial carrier of the narrative is to treat the corridor itself as the **main narrative line**, with nodes arranged along it in chronological order — the south end (Dazhongsi, the ancient bell) for historical depth, the middle (Tsinghua Garden Station site) for the Jing-Zhang railway, the north end (Jing-Zhang Departure Station Plaza) for contemporary self-reliant innovation. Walking the corridor from south to north is itself a reading of a time sequence.

### Wayfinding, signage and symbol system

The symbol system takes the zigzag as its motif across three scales: at **city scale**, a continuous guiding pattern in corridor paving; at **street scale**, the form of wayfinding boards and node markers; at **detail scale**, the layout skeleton of honour plaques and scenario notice boards.

The cultural identity system and the overall Logo system must be **clearly distinguished**: the overall Logo (Jing-AI Artery) serves unified identification of the belt; the cultural mark (JZ Track) marks historical narrative content. The two share the broken-line motif but are not mixed, so that cultural content is not overwritten by an industrial brand [source:AGENT-TASKBOOK].

On rights: all historical content must be vetted by professional history institutions, and free generation of historical facts by a model is prohibited; no unauthorized portraits, trademarks, paper figures or copyrighted material are used; historical fact must not be embellished for narrative effect [source:AGENT-TASKBOOK].

### Urban temperament and international communication

Suggested keywords for temperament are **restraint, precision, openness**. The suggested core international narrative reads: a century ago, engineers here built China's first self-built trunk railway under severe constraints; today the same corridor carries a different kind of self-reliance — and it lets you watch how a city governs its AI in public.

The strength of this narrative is that it opens on verifiable historical fact and closes on observable contemporary practice, depending on no promise about the future [source:AGENT-TASKBOOK].

---

## Indicators, Area Recomputation and Compliance Matrices

### Core indicators and their design meaning

Indicators are not merely numbers; each corresponds to a design judgment. Complete formulas, units, source files and confidence are recorded in the metrics file, while the narrative explains meaning [depth:metrics_recalculation].

**Site area 11,412,825 m².** Recalculated from the provisional boundary in EPSG:4548, consistent with the announced approximately 11.4 km², indicating the provisional boundary is usable for conceptual design at the level of magnitude. Recalculation is required once official boundaries arrive [metric:site_area_sqm].

**Green ratio 24.9% (park green land plus protective green land).** The design judgment this supports is that the corridor is wide enough to carry composite function. Materially below this value, the corridor would degrade into a planting strip unable to accommodate the superposition of slow mobility, shuttles, computing nodes and cultural nodes [metric:green_ratio].

**Public space ratio 13.8%.** This supports the judgment that innovative exchange needs a spatial container. The diagnosis above identified a shortage of outdoor public space able to carry chance encounter, and this ratio is the quantitative response [metric:public_space_ratio].

**Building footprint 1,061,379 m², coverage 9.3%.** This supports the formal intent of "low coverage, compact grouping." It must be noted that this is a recalculated value of conceptual illustrative geometry: it neither represents total existing building stock nor constitutes a construction-scale conclusion [metric:building_footprint_area_sqm].

**Key areas: 3, totalling 369.2 ha.** A 0.2% deviation from the announced 368.4 ha, verifying the usability of the provisional boundary [metric:key_area_count].

**Smart Mobility Network 36.1 km, 8 scenario nodes, 12 AI scenario cards, 5 user personas, 3 pilgrimage landmarks.** This set corresponds to the quantitative requirements of the six taskbook tasks, all met or exceeded.

**Floor area ratio and total floor area: pending official data.** Both belong to regulatory planning content; lacking official regulatory conditions, the proposal does not infer them [depth:risk_missing_data].

### Area recomputation method

Coordinates are exchanged in EPSG:4326; areas and lengths are computed in the EPSG:4548 projection. The land-use layer uses a grid partition with shared boundary coordinates; topological checking gives a coverage gap of 45 m² (0.0004%) and zero overlaps. Green space and public space overlap spatially (the corridor holds both attributes), so the two ratios cannot be added [depth:metrics_recalculation].

### Matrix coverage

Coverage of announcement sections 1.3, 1.4 and 1.5 and of the six agent taskbook tasks (agent.1 to agent.6) is recorded in the task coverage matrix; responses to nine professional standards are recorded in the professional standard matrix; the completion state of fifteen design depth requirements is recorded in the design depth matrix. The three matrices correspond one to one with the chapters of this proposal for machine review [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

![Core indicator recomputation and evidence chain](assets/figures/metrics-evidence.png)

---

## Risk, Copyright and Compliance

### Data and source compliance

The proposal uses only publicly available material and registered data provided by the repository. No non-public government data, internal enterprise data or personal privacy data is used. Limits on the provisional boundary data are stated in the first chapter and marked consistently in geometry file attributes, the assumptions file and the electronic display page [source:BOUNDARY-SOURCE] [depth:risk_missing_data].

### Copyright and licensing

The text, diagrams, geometry and web pages of this proposal are agent-generated and contain no font files, image assets, portraits, trademarks or paper figures requiring licence. The Logo direction is a verbal and geometric description; font licensing and trademark search for a formal visual system must be completed by a professional team. See the copyright statement for details [source:AGENT-TASKBOOK].

### Responsibility for AI generation

This proposal was generated by an AI agent and may contain factual error, spatial misjudgment and omission. All content requires review by human professional teams before any substantive use. Historical and cultural content in particular must be vetted by professional history institutions [standard:GENERATIVE-AI-INTERIM-MEASURES].

### Boundary of official status

This proposal does not constitute official approval, statutory planning, approved indicators or an implementation commitment. It uses no official redline, makes no precise area determination, and gives no conclusion on floor area ratio, building height, parcel-level retain/renovate/demolish, road alignment, rail alignment, bridge and tunnel engineering, municipal pipelines, underground-space feasibility, land ownership, investment estimation or approval. All spatial suggestions are stated as conceptual proposals and reference schemes for professional teams to deepen [source:AGENT-TASKBOOK].

### Pending material and professional review needs

Pending official data includes: official vector boundaries and key-area redlines; regulatory conditions (floor area ratio, height, provision ratios); existing building quality and ownership data; municipal capacity data; heritage protection extents and construction control requirements; rail operating conditions; traffic volume data. Judgments requiring professional review include: engineering feasibility of a multi-level continuous system; power and heat-rejection capacity for computing facilities; the safety boundary for mixing autonomous vehicles and robots with the public; and resident willingness and interest-coordination schemes for renovating existing communities [depth:risk_missing_data].

---

## References

1. Haidian Branch, Beijing Municipal Commission of Planning and Natural Resources. *Prequalification Announcement for the International Solicitation of Urban Design Schemes for the Centennial Jing-Zhang AI Innovation Belt.* 9 May 2026. (Controlling basis for project purpose, three-level scope, design tasks and deliverable depth.)
2. *Excerpt of the Taskbook for the Global Agent Open Call on Urban Design of the Centennial Jing-Zhang AI Innovation Belt.* 18 May 2026. (Three positionings, five functions, three areas and two wings, six agent tasks and the unified boundary clause.)
3. Ministry of Housing and Urban-Rural Development. *Urban Design Management Measures.* (Basis for urban design formulation requirements and deliverable depth.)
4. Ministry of Housing and Urban-Rural Development. *Measures for the Formulation and Approval of Regulatory Detailed Planning for Cities and Towns.* (Basis for judging regulatory-plan urban design depth.)
5. Ministry of Natural Resources. *Guidelines for Land and Sea Use Classification in Territorial Spatial Survey, Planning and Use Control.* November 2023. (Basis for land-use codes and classification conventions.)
6. Cyberspace Administration of China et al. *Interim Measures for the Management of Generative AI Services.* (Basis for scenario data boundaries and human review.)
7. *Barrier-Free Environment Construction Law of the People's Republic of China.* (Mandatory basis for human fallback channels and age-friendly design.)
8. General Office of the State Council. *Implementation Plan on Effectively Resolving Difficulties Faced by Older People in Using Smart Technology* (Guo Ban Fa [2020] No. 45). (Background reference for age-friendly service design, not a direct control basis for this project.)
9. Repository maintainers. *Provisional Rough Polygons for the Three-Level Scope and Three Key Areas of the Centennial Jing-Zhang AI Innovation Belt.* 5 June 2026. (Provisional constraint, for concept generation and visualization only, not usable as an official redline.)

The authoritative machine-readable index of sources, metric formulas, standard responses and task coverage is the sources file, the metrics file and the three matrix files [source:SOURCE-REGISTRY].
