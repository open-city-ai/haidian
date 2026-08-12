---
title: "The Jing-Zhang Gauge: Urban Design for the Centennial Jing-Zhang AI Innovation Belt with a Public Specification as Its Core Product"
author_github: "JIQINGFENG0818"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
proposal_format_version: "2"
bilingual_contract_version: "1"
summary: "Built on the concept of The Jing-Zhang Gauge, this proposal defines the belt's core product as an adoptable public specification for AI in urban space: a Version Line links the three stations of standard-setting, first installation, and volume deployment; a catalogue of standard parts carries implementability through spec cards that include decommissioning and rollback clauses; and a system of Datum landmarks turns public deliberation and the display of failure into physical space."
tracks: ["civic-agent-governance", "ai-traffic-walkability", "jingzhang-heritage-narrative"]
iteration: "v0.1"
---

# The Jing-Zhang Gauge: Urban Design for the Centennial Jing-Zhang AI Innovation Belt with a Public Specification as Its Core Product

**The concept in one sentence**: what this belt ultimately produces is not buildings but a *gauge* — a public specification for AI in urban space that anyone can build to, connect to, and audit against.

A century ago, the significance of the Jing-Zhang Railway was not only that it was the first railway designed and built by Chinese engineers. It was that, without external technical control, **the specification itself was set locally and made to work**. Self-reliance → standard-setting → interoperability is the real technical legacy of Jing-Zhang. Among the five functions named in the taskbook, "a Full-Stack Independent AI Innovation System (FSIAIS)" and "global discourse power in AI governance" are the two ends of exactly this line, a hundred years apart [source:AGENT-TASKBOOK].

A track gauge is invisible. It produces no locomotive, yet it determines which vehicles can run on the line and which networks can connect. **Whoever holds the standard gains authority over the network without owning a single vehicle.** Discourse power in governance does not come from declarations; it comes from others having to build to your specification. This is the mechanism this proposal offers for that function.

> **Compliance statement**: all spatial content in this proposal is a **conceptual recommendation** for further development by qualified professional teams. It does not constitute statutory planning, an approved conclusion, an implementation commitment, an investment commitment, or an engineering feasibility conclusion. The boundaries used are the organiser's provisional substitute boundaries and must not be treated as an official red line or a basis for precise area figures.

## Design Basis and Source List

### Sources and availability tiers

This proposal strictly separates formal-ready, background-only, and provisional-only material, selecting evidence only after reading `data/source_registry.json`. Background or provisional material is never promoted to the status of a statutory control basis [source:SOURCE-REGISTRY].

| Material | Use | Availability | Handling |
|---|---|---|---|
| Public taskbook and project announcement | Three-level scope, Three Zones and Two Wings, five functions | formal-ready | Cited directly [source:PROJECT-OFFICIAL-ANNOUNCEMENT] [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] |
| Agent-facing taskbook | Mandatory tasks agent.1–agent.6 | formal-ready | Addressed item by item in the body [source:AGENT-TASKBOOK] |
| Structured fact pack | Organiser-curated terminology and definitions | formal-ready | Used to keep terminology consistent [source:PROCESSED-FACT-PACK] |
| `ranges/planning_limits.json` | Official area figures and control-indicator status | formal-ready | Area comparison and gap disclosure [source:SITE-PACKAGE] |
| `geometry/provisional_boundaries.geojson` | Provisional boundary | provisional-only | Used **only** for generation, visualisation, and self-check [source:BOUNDARY-SOURCE] [data:geometry/site_boundary.geojson#SITE-001] |
| Provisional key-area extents | Three core functional districts | provisional-only | Directional design basis only [source:KEY-AREA-SOURCE] |
| `enums/land_use_codes.json` | Land-use classification codes | formal-ready (project subset) | The complete official code table must be imported before formal statistics [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] |
| Global cases and historical material | Case reference and cultural narrative | to be completed | See the References chapter; marked `[待证]` (pending verification) in this version, asserted as fact nowhere |

### Evidence-chain correspondence

- `sources.json` records the publisher, URL, retrieval date, coverage, licence, and known limitations of every citation
- `assumptions.json` records every assumed value (right-of-way widths, storey counts, price-band basis) and the scope in which it must not be used
- `compliance_matrix.json` covers all tasks under announcement clauses 1.3/1.4/1.5 and agent.1–agent.6
- `standard_matrix.json` responds to the mandatory professional standards [standard:MOHURD-URBAN-DESIGN-MEASURES], [standard:MOHURD-CONTROL-DETAILED-PLANNING], [standard:MNR-LAND-USE-CLASSIFICATION]
- `design_depth_matrix.json` marks the completion status of each design-depth item [depth:land_use_layout]

### Data gaps (disclosed here explicitly)

The organiser has not yet released the official red line or precise key-area polygons. In `planning_limits.json`, five official control indicators — floor area ratio, building height, building density, green ratio, and setback — all carry the status `missing` [source:SITE-PACKAGE]. This proposal **does not fill them in**; they remain `unknown`, and the recalculation scope after official data becomes available is set out in the metrics chapter.

![Evidence chain and submission package relationships](assets/figures/site-overview.en.png)

## Three-Level Scope Framework

### Objectives and depth by level

| Level | Extent | Official area | Depth in this proposal | Recalculated here |
|---|---|---|---|---|
| Coordinated research area | North Fifth Ring Road to Xizhimenwai Avenue | 43.60 km² | Industry and future-city research | Not recalculated (no official boundary) |
| Overall design area | 1–2 km around the heritage park | 11.40 km² | Regulatory-plan-level urban design | **11.413 km²**, deviation 0.11% [metric:site_area_sqm] |
| Key detailed design | Three core functional districts | 368.40 ha | Comprehensive implementation-plan depth | 368.40 ha (provisional extent) |

The 0.11% deviation from the officially published figure confirms, in reverse, that the provisional boundary and the projection chain (EPSG:4548, CGCS2000 3-degree Gauss-Kruger zone 39) are sound. **This does not mean the boundary is accurate** — the provisional boundary is a rough substitute, and a small deviation only indicates that the order of magnitude is consistent.

### How the three levels cascade

The coordinated research area answers "what role does this belt play in the regional innovation network"; the overall design area answers "how must space be organised to support that role"; the key areas answer "what exactly gets built, and in what order". The three levels are not the same drawing at three levels of detail — they are one logic, standard-setting → first installation → volume deployment, unfolded at three scales [depth:three_level_scope_framework].

### Limits of the provisional boundary, and the replacement list

This proposal uses a boundary carrying `geometry_role="provisional_constraint"`, `official_boundary=false`, and `boundary_precision="provisional_rough"` [data:geometry/constraints.geojson#CN-001]. It is suitable **only** for: provisional generation, human-readable visualisation, non-statutory design discussion, and local self-check. It must **not** be used for: official red lines, approval basis, precise area calculation, statutory planning control, or ownership and engineering boundaries.

Once official polygons are released, the following must be recalculated: the full `land_use.geojson` partition, `roads.geojson`, `buildings.geojson`, `phasing.geojson`, and every area and ratio metric in `metrics.json`. The geometry generator is parameterised, so replacing the boundary source file allows a single full re-run without redrawing.

![Three-level scope and spatial working framework](assets/figures/land-use-structure.en.png)

## Coordinated Research Area: Industry and Future City Research

### Overall concept and naming system (agent.1)

| Layer | Chinese | English | Meaning |
|---|---|---|---|
| Overall concept | 京张公制 | **The Jing-Zhang Gauge** | 公 = public/open, 制 = specification/system; a pun on the metric system — a globally shared convention of measurement |
| Specification body | 京张轨距 | JZ-Gauge | The versioned public specification set for AI in urban space |
| Component catalogue | 京张标准件 | JZ-Parts | A procurable, installable, retirable catalogue of physical components |
| Scenario protocols | 京张场景规程 | JZ-Specs | Behavioural boundaries and human-review rules for each AI scenario |
| Honour system | 立标碑 / 基准点 | Datum Stones | See the blue-green and public space chapter |
| Annual event | 定标周 | Gauge Week | See the implementation chapter |

Names of the "smart spine / smart valley / corridor" family are deliberately avoided: they describe form rather than function. **A name that another city can *adopt* is closer to governance discourse power than a name that merely sounds good.**

### Visual identity direction (agent.1)

The core mark is two parallel lines with a transverse tick, reading simultaneously as a gauge section, a measurement scale, and a version line. The base palette is rail steel grey and ballast. **The single accent is the "version colour"**: each specification version is assigned a colour, painted directly onto physical standard parts, so that a resident on the street can see which version of the specification a given installation was built under — turning auditability into a visible design act.

Explicitly excluded: anthropomorphic AI faces, neural-network spheres, glowing brains, cyber gradients. The taskbook prohibits over-entertained and social-media-bait treatments, and this visual language no longer carries distinctiveness [source:AGENT-TASKBOOK].

### Reading of the three positionings

| Taskbook positioning | Reading in this proposal | Core action |
|---|---|---|
| Centennial Jing-Zhang cultural belt | From building our own railway to setting our own standard | Make the standard-setting process itself visitable public culture |
| Urban AI life experience belt | The standard part *is* the experience | Every AI installation is scannable for spec, responsible party, and retirement date |
| AI convergence and innovation belt | Conformance testing as the entry point | Firms join by *passing certification*, not by signing an investment agreement |

### Full-Stack Independent AI Innovation System and ecosystem cases (agent.2)

The ecosystem mechanism is organised around eight factor classes — land, space, industry, capital, talent, compute, data, and scenarios — and its core move is to make certification the industrial entry point: the standard-setting district drafts specifications and provides conformance testing; the access wing arranges factors; the first-installation district provides real deployment sites; the volume district takes on scale.

Reference directions for global cases are listed below. **This version gives only the selection direction and the reason for selection; specific figures, company lists, and investment amounts are not fabricated.** Public sources must be supplied item by item before the formal version:

| Case direction | What is referenced | Status |
|---|---|---|
| City-scale sensing deployments that met public objection and were terminated | Lessons of failure and exit-mechanism design | `[待证]` |
| Open registers for urban algorithms and data | The institutional form of registration and disclosure | `[待证]` |
| Technical specification catalogues for public procurement | Institutional feasibility of a component catalogue | `[待证]` |
| Spatial organisation of science cities and innovation districts | Whether the standard-setting → first-installation → volume sequence has precedent | `[待证]` |
| Rail-heritage linear park renewal | Stitching and activation techniques for linear space | `[待证]` |
| Open-source community governance and release mechanisms | Organisational prototype for the version line and objection process | `[待证]` |
| Conformance certification by standards bodies | How certification becomes an industrial entry point | `[待证]` |

[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

### Spatial structure: one line, three stations, two interfaces

The north–south axis of the Jing-Zhang Railway Heritage Park is the **Version Line** — not a landscape axis but the physical embodiment of a product release pipeline: specifications are drafted at the north end, validated by first installation in the middle, and deployed at scale in the south. The full journey of a standard part from draft to stable is walked once, north to south, across the site [data:geometry/roads.geojson#RD-001].

This gives north–south connection an intrinsic necessity: the connection is not one of traffic but **one of process**, not connection for its own sake [depth:overall_spatial_structure].

### Land use and functional layout

Land use is generated by Voronoi partition, so adjacent parcels share exact boundary coordinates and the partition covers the design area — but **not with zero residue**: the `topology_check` block in `metrics.json` records a residual gap of 14.897 m² and an overlap of 0.099 m², with `land_use_partition_complete` set to **`false`** [data:geometry/land_use.geojson#LU-001]. Against an 11.41 km² site that residue is on the order of 1.5 parts per million, attributable to floating-point intersection and coordinate precision; it does not change the land-use composition or the area recalculation. This proposal discloses the actual values rather than claiming a gap-free partition. Eleven land-use codes are used: the Version Line's core green corridor is park green space (1401), stitch points are square/plaza land (1403), protective green space (1402) lines the outer edge, and the three stations carry their dominant functions — research (0802), residential and community services (0701/0702), commercial services (05) — while the hinterland receives periodic education, medical, cultural, and sports facility parcels [depth:land_use_layout].

Road land (1207) is subtracted along parcel edges and merged back into the partition, so no residual slivers are created. Reserved land (16) is retained at the perimeter to leave adjustment margin once official boundaries are published.

### Overall urban renewal framework

Existing-conditions diagnosis identifies three core problems: the severance between the two sides of the railway, the fabric of existing communities, and existing commercial ownership. All three are based on publicly observable spatial conditions, with no use of non-public material [depth:existing_conditions_diagnosis]. Renewal targets are identified by three capacities — standard-setting capability, first-installation sites, volume capacity — rather than by building age alone. The retain-renovate-demolish logic is set out in the land-use chapter.

### Regulatory conditions pending confirmation

Total building scale, floor area ratio, building height, density, green ratio, and setback all lack official control conditions. Every statement in this chapter touching development intensity is a conceptual recommendation and **must not be treated as an approved indicator** [source:SITE-PACKAGE] [depth:development_intensity_controls].

## Detailed Design of Key Areas

This proposal covers three key areas [metric:key_area_count]. They are not three parallel blocks of industrial land but three stations on one production line [data:geometry/key_areas.geojson#KEY-001] [depth:three_key_area_detailed_design].

### Zhongzhiyuan AI Independent Innovation Acceleration Area (ZY-AIIA) → Gauge Works (192.1 ha)

- **Positioning**: specification drafting, conformance testing laboratory, red-teaming and certification; addressing "Full-Stack Independent AI Innovation System" and "global discourse power in AI governance"
- **Spatial structure**: the conformance testing laboratory at the core, with drafting bodies, certification bodies, and open-source community space around it, opening toward the Version Line
- **Building renewal**: predominantly research land, with cultural land on the corridor side to carry the visitable standard-drafting process
- **Mobility**: northern origin of the Version Line, highest density of stitch points
- **Public space**: location of D-01 Datum Zero
- **AI scenarios**: S-10 developer on-site debugging channel, T-01 conformance testing laboratory, T-03 red-team stress testing
- **Implementation risk**: the administrative attribution of standard-setting authority is undetermined; this proposal offers only a mechanism concept and makes no judgement on administrative authorisation

### Beijing AI Origin Community (BAIOC) → Proto Blocks (104.3 ha)

- **Positioning**: first installation of standard parts, resident jury, rapid iteration and version rollback; addressing "world-class AI innovation ecosystem"
- **Spatial structure**: predominantly residential and community-service land, with community facility land on the corridor side carrying jury and display functions
- **Building renewal**: existing communities as the carrier, prioritising retention and renovation, avoiding large-scale demolition
- **Public space**: location of D-02 The Objection Stand
- **AI scenarios**: S-05 community service desk, S-09 accessibility and age-friendly guidance, T-02 first-installation jury
- **Implementation risk**: resident acceptance of being the first installation site is the largest uncertainty. The design treats "refusable, reversible, with a non-AI redundant path" as a precondition rather than a remedy

### Dazhongsi AI Industry Cluster (DSAIC) → Market Floor (72.0 ha)

- **Positioning**: scale deployment of certified standard parts; addressing "AI-native new business forms"
- **Spatial structure**: predominantly commercial service land, forming AI-native consumption and business scenarios
- **Public space**: location of D-03 The Decommission Yard
- **AI scenarios**: S-07 AI-native commerce, S-12 facility decommissioning and data destruction
- **Implementation risk**: existing commercial ownership is complex; this proposal does not propose alterations to enterprise buildings or owned space

> **This area's provisional geometry carries a known positional offset, which must be stated first** [source:ISSUE-1029] [depth:risk_missing_data]: this proposal carries over `PROV-KEY-003` from the organizer's `provisional_boundaries.geojson` unchanged. Its recalculated area of 72.0 ha matches the announcement, but its **centroid sits near Beijing North Station / Xizhimen, not Dazhongsi**. The offset was raised by participant @anselasimov-web in issue #1029, independently confirmed by the maintainers, and clarified in #1036: the three KEY rectangles are configured only by the announced north-to-south order and approximate area, and the placeholder geometry **is not yet anchored to stations or roads**. The maintainers explicitly chose **not to translate the coordinates and not to change the areas**, pending official key-area polygons.
>
> We re-checked this independently and the result agrees: the `PROV-KEY-003` centroid is 39.946920 / 116.348500, about **165 m** from the Beijing North Station signal box and about 235 m from the Jing-Bao passenger line; and the extract area, drawn to cover the three provisional key areas, **contains no feature named Dazhongsi at all**. The OpenStreetMap extract used for that check (`osm_base 2026-05-31`, computed in EPSG:4548) **does not belong to this package**: it is submitted with, and registered in the `sources.json` of, the same author's other submission `submissions/JIQINGFENG0818/jingzhang-patrol/`. It is cited here only as corroboration; this package's own geometry and metrics do not depend on it.
>
> **All spatial conclusions in this section therefore hold for the Market Floor as a production station, not for the area around Dazhongsi station.** The station-integration and four-quadrant pedestrian connectivity tasks required by announcement 1.5(3)3) are deliberately **not drawn on this provisional geometry** in this version, and are left to be redone on the new geometry once the official boundary is released. This proposal does not translate the geometry on its own, to avoid decoupling from the source geometry.

### The two wings

- **Access Wing** (Zhongguancun technology services wing): capital, IP, and global factors enter through a certification interface rather than administrative liaison
- **Field Wing** (Xiaoyue River scenario enablement wing): scenario stress testing in real waterfront and community conditions, with failure cases published

> All three key-area polygons are provisional; the conclusions above can only serve as **directional design**. Once official polygons are released, land-use boundaries, scale, and implementation projects must be re-established.

![Index and design tasks for the three key areas](assets/figures/key-areas.en.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### Personas (agent.3, six)

| ID | Persona | Relationship to the belt | Primary concern |
|---|---|---|---|
| P-01 | Specification and test engineer | Based in Gauge Works | Test equipment, peer density, specification iteration cadence |
| P-02 | Hardware and integration founder | Access Wing → Gauge Works → Market Floor | Certification time and cost, speed of access to a real installation site |
| P-03 | Resident of Proto Blocks | Subject of first installation | Can I refuse, who do I call when it breaks, am I being recorded |
| P-04 | Student and developer | Field Wing, developer community | Is there a real hands-on site, can I obtain the data |
| P-05 | Procurement and maintenance body (district units, property management) | Belt-wide | Procurement basis, maintenance liability, replacement, retirement accounting |
| P-06 | International peer and visitor | Gauge Week, Datum points | Can this specification be taken home and used |

P-05 is the persona most proposals omit. Urban AI installations are ultimately procured and maintained by front-line units; without this role, "implementability" is empty.

### AI scenario cards (agent.3, sixteen)

**A design constraint that runs through all of them: no scenario card depends on individual identity recognition.** S-13 to S-16 respond directly to the six application families named in call direction 7 — AI+transport, AI+health, AI+education, robotics, autonomous driving and autonomous delivery. The two cards touching minors and medical care carry stricter boundaries than the rest. This is an active design choice, not a passive compliance statement. The taskbook explicitly prohibits scenarios involving privacy intrusion, excessive surveillance, or the absence of human review [source:AGENT-TASKBOOK].

| # | Scenario card | Spatial carrier | Human review and fallback | Maturity |
|---|---|---|---|---|
| S-01 | Street lighting with visible version | Along the Version Line | Falls back to constant baseline lighting on fault | Mature |
| S-02 | Autonomous delivery shuttle in the heritage park | Stitch points | Time- and route-limited; exits automatically above a pedestrian density threshold, handing over to human delivery | Pilot |
| S-03 | Citizen reporting of facility faults | Belt-wide | AI performs classification and de-duplication only; disposition decisions must be human; reporters can trace the handling chain | Mature |
| S-04 | Layered interpretation of railway heritage | Heritage park | Historical content is locked to a human-verified library; AI must not generate historical assertions | Mature |
| S-05 | Community service desk | Proto Blocks | Eligibility, subsidy, and dispute matters always go to a human; AI performs document pre-check only | Mature |
| S-06 | Public space crowd guidance | District nodes | Advisory guidance only, no enforcement; density statistics only, no individual recognition | Mature |
| S-07 | AI-native commerce | Market Floor | Merchant participation is voluntary; consumers can opt out of personalisation in one action without service degradation | Mature |
| S-08 | Xiaoyue River waterfront environmental monitoring | Field Wing | All data published; threshold exceedance triggers human site verification rather than automated action | Mature |
| S-09 | Accessibility and age-friendly guidance | Stitch points belt-wide | A non-AI physical redundant path is mandatory (handrails, tactile paving, human call point) | Mature |
| S-10 | Developer on-site debugging channel | Gauge Works / Field Wing | Designated experimental zones; physical signage informs the public during experiments | Pilot |
| S-11 | Standard-part objection intake | D-02 The Objection Stand | Objections enter a public queue and must receive a human response within a committed period | Mature |
| S-12 | Facility decommissioning and data destruction | D-03 The Decommission Yard | Whole process logged and published; data destruction issues a verifiable certificate | Mature |
| S-13 | AI+Education: campus and community learning assistant | Education land in Proto Blocks | **No individual student profiling or ranking**; minors' data is processed locally and never sent back; teachers retain final assessment authority, with AI limited to lesson preparation and resource retrieval | Mature |
| S-14 | AI+Health: assisted triage at community health stations | Health land in Proto Blocks | **No diagnosis, no medication recommendation**; limited to wayfinding, queuing and accessible guidance; anything touching diagnosis, prescription or test interpretation always goes to a licensed physician | Mature |
| S-15 | Robotics: public space service robots | Stitch points, Market Floor | Bounded operating area and speed cap; automatic exit and docking in dense crowds; each robot maps to one standard-part spec card and a named responsible party | Pilot |
| S-16 | Autonomous driving: low-speed shuttle test section | Field Wing, Version Line | Operates only on a designated test section with a safety operator present; physical signage informs the public during testing; failure modes enter the published T-03 list | Pilot |

### Testing and Validation Scenarios (TVS) (agent.3)

- **T-01 Conformance testing laboratory** (Gauge Works): verifies whether a standard part meets the JZ-Gauge specification; outputs certified / not certified, published
- **T-02 First-installation jury** (Proto Blocks): acceptability and real utility under actual resident conditions; outputs iteration recommendations or a rollback decision
- **T-03 Red-team stress testing** (Gauge Works and Field Wing): failure behaviour under adversarial input, extreme weather, and network loss; outputs a **published failure-mode list**

The point of T-03 is the publication of failure modes. No proposal dares state how its own system will break — which is exactly the dividing line of professionalism.

### Scenario–space–operations mapping

Each scenario card is registered in `JZ-Specs` with: spatial carrier (mapped to a GeoJSON feature), standard parts involved (mapped to JZ-Parts identifiers), data boundary, human-review triggers, failure fallback, operating responsible party, and phase. A scenario that does not land on a specific space and a named responsible party is not implementable content.

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

### Land-use composition

Land-use areas are recalculated from `land_use.geojson` in EPSG:4548; the share of each class is given in `land_use_area_by_code_sqm` [metric:site_area_sqm]. Partition integrity is verified: gap 14.897 m² and overlap 0.099 m², i.e. about 0.00013% and 0.00000087% of the total area respectively.

### Building scale (conceptual estimate)

Building footprints are laid out by land-use class and are a **conceptual massing indication, not an architectural design output** [data:geometry/buildings.geojson#BD-0001]:

- Footprint area [metric:building_footprint_area_sqm], building coverage ratio [metric:building_density], conceptual gross floor area [metric:total_floor_area_sqm]
- Storey counts are assumed values by land-use class, recorded in `assumptions.json`
- `floor_area_ratio` remains `status="unknown"` — the public site package contains no approved FAR control indicator, and an agent must not fill it in
- The conceptual estimate is reported separately as [metric:conceptual_floor_area_ratio] with unit `far`, explicitly distinguished from statutory control indicators

This handling is an **active constraint** the proposal places on itself: better to leave a field empty than to manufacture data that merely looks complete.

### Height and character control

Gauge Works is characterised by horizontally extended laboratory and testing buildings; Proto Blocks maintains the scale of existing communities; Market Floor permits relatively concentrated height clustering. Specific height zoning must await the release of official control indicators, and this version gives no height figures [depth:height_massing_character] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

### Retain-renovate-demolish logic

| Class | Basis | Main distribution |
|---|---|---|
| Retain | Intact community fabric, stable resident life | Mainly Proto Blocks |
| Renovate | Existing buildings able to host standard-setting or testing functions | Gauge Works, Market Floor |
| New build | Functions without an existing carrier, such as the conformance testing laboratory | Gauge Works |
| Demolish | This proposal identifies no specific demolition target | — |

**No parcel-level demolition conclusion is given**, no ownership judgement is made, and no alteration of enterprise buildings is proposed [depth:retain_renovate_demolish].

## Transport, Rail, Municipal Infrastructure, and Public Services

### Road network

The road network is generated along the edges of the land-use partition and therefore coincides exactly with parcel boundaries, producing no residual slivers [data:geometry/roads.geojson#RD-2001]. Road land area [metric:road_area_sqm], road area ratio [metric:road_area_ratio] [depth:traffic_rail_slow_parking]. Parking is organised on demand-management principles, encouraging stitch-point interchange in place of surface parking expansion; specific provision ratios await official standards. Right-of-way widths (44 m arterial / 26 m secondary / 16 m local) are **conceptual assumed values**, recorded in `assumptions.json`, subject to verification against official regulatory conditions.

### How east–west stitching is actually done (agent.4)

The severance between the two sides of the railway is the most concrete physical problem on this site. This proposal does not answer it by "building a few more bridges". Instead: **every transverse connection point is a complete demonstration section of standard parts.** One stitch point equals one assembled demonstration set — lighting, sensing, edge compute, interaction, autonomous delivery interchange, accessible guidance — and whatever connects on the east side must have a matching interface on the west. The stitch point itself becomes the physical showroom of the component catalogue [data:geometry/public_space.geojson#PS-001].

Six stitch points are proposed. Their positions are conceptual recommendations requiring verification by qualified teams against ownership and engineering conditions. **No bridge, tunnel, underground space, or engineering feasibility conclusion is provided.**

### Rail and municipal infrastructure

Rail interchange and municipal carrying capacity must be based on official infrastructure material; no usable public data was available for this version, and this is recorded as a data gap [depth:municipal_new_infrastructure]. New Infrastructure (edge compute, sensing power supply, data backhaul) is carried uniformly through the physical-specification field of the standard-part spec card, rather than as separate, unverifiable special facilities. Public service facility land has been distributed across education, medical, cultural, and sports classes within the land-use partition; scale must be reviewed against official population and provision standards [standard:MOHURD-CONTROL-DETAILED-PLANNING].

![Mobility and blue-green public space structure](assets/figures/mobility-bluegreen.en.png)

## Blue-Green Network, Public Space, and Urban Character

### Blue-green structure

The Version Line's core green corridor runs the full north–south length [data:geometry/green_space.geojson#GS-001], protective green space lines the outer edge, and stitch points together with Datum landmarks form a network of public space nodes [depth:blue_green_public_space]. Total green area [metric:green_space_area_sqm], total public space area [metric:public_space_area_sqm], green ratio [metric:green_ratio], public space ratio [metric:public_space_ratio] — all recalculated from unioned geometry to avoid double counting where features overlap.

### AI pilgrimage landmarks as Datum points (agent.4, four)

The pilgrimage landmarks are not photo-op sculptures. They are **Datum points** — monuments that, like a levelling origin, carry an actual measurement function [data:geometry/public_space.geojson#PS-007].

| ID | Name | Location | Function |
|---|---|---|---|
| D-01 | Datum Zero | Core of Gauge Works | The physical release point of each specification version; version number and principal changes are physically inscribed at each update |
| D-02 | The Objection Stand | Public space in Proto Blocks | A physical registration point for objections to any standard part; objection numbers and handling status are publicly traceable |
| D-03 | The Decommission Yard | Edge of Market Floor | Displays retired standard parts and the reasons for retirement. **Showing failure is the source of this system's credibility** |
| D-04 | Contributor Stones | Along the Version Line | Specification contributors inscribed by version segment |

### Honour and display system

Honours are organised not by award but by **version**: the contributors to each specification version are inscribed on the stone segment for that version. Contribution therefore remains traceable and attributable by version.

### Public space component catalogue (agent.4, the technical core of this proposal)

The "implementability" review dimension asks for a clear delivery path and measurable indicators. Most concept proposals answer with a timeline. **A component catalogue with specifications, price bands, maintenance liability, and retirement clauses *is* the delivery path — it can enter a government procurement process directly.**

Fields of each standard-part spec card:

```
JZ-Parts / <id>
├─ Function definition and applicable scenarios
├─ Physical specification (dimensions, power, load, ingress protection, mounting conditions)
├─ Data behaviour (what is collected / what is not / local or backhaul / retention period)
├─ Human-review triggers (when human handover is mandatory, who may disable it)
├─ Price band (conceptual order-of-magnitude range; not a quotation or procurement basis)
├─ Whole life cycle (expected life, maintenance frequency, responsible party)
├─ Decommissioning and rollback (how to remove, how data is destroyed, what state is restored)
└─ Version and compatibility (applicable specification version, backward compatibility)
```

**"Decommissioning and rollback" is the single most important design decision in this proposal.** The real risk of urban AI installations is not that they cannot be installed — it is that once installed they cannot be removed, no one is accountable, and no one knows where the data went. Writing down how to take something out demonstrates governance capability more than writing down how to put it in.

### The right to trigger a retest: the specification must say who can demand one (agent.4 / agent.6)

Conformance testing has a gap that is easy to miss: **the test happens once, but the equipment stays in service for years.** Passing at the factory does not mean still compliant three years later — a dirty camera lens, a compute box throttling on heat, a sensor screened by foliage, and any field on the spec card can quietly stop being true. If only the standards body and the vendor may initiate a retest, then "do not retest" is always the cheapest option, and within a few years the specification decays into a factory pass certificate.

This proposal therefore holds that **"who may trigger a retest" is itself a clause of the specification, and that the trigger right must not sit only with professionals.** All of the following are **Conceptual Recommendations**; the actual thresholds, cycles and procedures must be settled by professional teams and the competent authority:

| Who triggers | Trigger condition | Response required by the specification | How the result is published |
|---|---|---|---|
| **Nearby residents** | A named retest request against a nearby standard part, once it reaches the threshold set in the specification (for example, cumulative requests against the same device within a defined period) | Must enter the retest schedule; it may not be dismissed on the ground that the device "is running normally" | Both acceptance and conclusion are posted at Datum point D-01 and on that device's nameplate |
| Inspection crew | Routine checking finds any spec-card field no longer matching site conditions | Downgraded and tagged on site, enters retest | The failure reason is published with the decommissioning display |
| Operator | Version upgrade, change of supplier, change in data behaviour | The change itself triggers a retest; the old certification may not be carried over | Version number and certification date refreshed together |
| Standards body | Specification version upgrade; existing standard parts require a conformity recheck | A transition period and a withdrawal list are issued | Published at Gauge Week |

**The resident trigger is the most unusual row in this table, and the most necessary.** Common practice places the public in the position of being *informed* — there is a status screen to look at and a notice board to read, but no button to press. Public display solves disclosure; it does not solve **agenda setting**. If a resident cannot push a device into the retest schedule, then "public" only means watching a fact one cannot change. Two fields already present on the spec card — "human-review trigger conditions" and "whole life cycle (accountable party)" — are exactly the interface that receives such a request: writing resident requests in as one of the trigger conditions adds no new field, it only writes the permission into the specification.

The boundaries must be written down just as clearly: **merge rules for duplicate and abusive requests** are required so that the retest schedule is not swamped by a small number of requesters; naming a request does not mean publishing personal data — what is published is **the number of requests and the outcome, not the identity of the requester**; and this clause imposes no obligation on any party, and may only take effect after confirmation by the competent authority through lawful procedure [depth:risk_missing_data].

### How a specification avoids becoming dead paper: standard-setting interlocked with field checking

A specification whose only actions are "draft" and "certify" has a life cycle that ends on publication day. For it to stay alive, someone must **recheck on site, on a cycle**, whether each installed standard part still conforms to the version it originally passed — which is the operational face of the retest trigger right set out above.

This proposal therefore treats "field checking of standard parts" as a necessary companion to the Gauge, not an optional extra: Gauge Works produces the specification and the test methods, Proto Blocks produces real operating conditions and the resident jury, Market Floor produces deployment at scale, and **between the three there must be a return path that carries field readings back into revision of the specification** — otherwise the D-03 decommissioning yard will exhibit obsolete components without being able to say how they became obsolete. A companion submission by the same author, `submissions/JIQINGFENG0818/jingzhang-patrol/` (The Patrol Line), develops that return path into patrol beats, crew establishment and a patrol kit register; the two may be reviewed independently, and the reference here states only this proposal's operational dependency, making no claim about the review outcome of that submission.

### Urban character and cultural narrative (agent.5)

The narrative line: **"A century ago we set our own gauge; a century later we set our own specification."** Three narrative layers map onto the three districts:

1. **Self-reliance** (Gauge Works) — the technical self-reliance tradition of the Jing-Zhang Railway, landing today as the authority to draft specifications
2. **Openness** (Proto Blocks) — the collaborative culture of Zhongguancun, landing as resident juries and objection mechanisms
3. **Interoperability** (Market Floor) — from gauge to specification, the value of a standard lies in being adopted by others

**Wayfinding and sign system**: a unified "spec plate" language across the belt, formally derived from railway mileposts and levelling benchmark stones. The plate is wayfinding, version identification, and accountability disclosure at once — one language solving three problems.

**International communication**: not led by promotional video but by publishing a **downloadable, citable, adoptable specification text**. The measure of success is not view count but which clause of which JZ-Gauge version another city has cited.

> Historical statements require publicly available sources. Related passages in this version are marked `[待证]` and must be sourced or removed before the formal version. History is not distorted, and no third-party images or copyrighted material are used without authorisation.

## Renewal Projects, Implementation Policy, and Phasing

### Phasing

The renewal project list is organised in three phases, each mapped to spatial carriers and signature outcomes [depth:renewal_project_list]. Phases are divided by proximity to the three stations [data:geometry/phasing.geojson#PH-001] [depth:phasing_implementation] and are a **conceptual recommendation; they do not constitute an implementation plan, an investment commitment, or a schedule**.

| Phase | Stage | Renewal focus | Signature outcome |
|---|---|---|---|
| 1 | Standard-setting | Conformance testing laboratory, certification and red-team capability, JZ-Parts v1.0 | D-01 Datum Zero completed |
| 2 | First installation | Stitch-point sections installed, resident jury established, scenario cards launched in batches | D-02 The Objection Stand opened |
| 3 | Volume deployment | Scale deployment of certified standard parts, introduction of AI-native business forms | D-03 The Decommission Yard opened |

### Implementation policy direction

Replacing approval-based investment promotion with certification is the core policy recommendation: Access Wing consultation → Gauge Works certification → Proto Blocks installation → Market Floor scale-up.

This proposal makes **no commitment** regarding government investment, subsidies, tax preferences, or the number of firms attracted, and does not present envisaged activities as confirmed arrangements.

### Long-term operations (agent.6)

- **Gauge Week (annual)**: not a forum but a public specification release, an open conformance testing competition, and a retirement review. Developers bring physical units and receive certification results on the spot
- **Developer community**: the specification is maintained openly; objections and amendments follow a public process; contributors are inscribed by version at D-04
- **Scenario opening**: the Field Wing designates experimental zones available on application, with physical signage informing the public during experiments and mandatory publication of failure cases
- **Conversion pathway**: certification results replace administrative screening, reducing dependence on policy commitments

## Metrics, Area Recalculation, and Compliance Matrix

### Recalculation method

All geometry is computed in EPSG:4548 (CGCS2000 3-degree Gauss-Kruger zone 39) and output in EPSG:4326. Metrics are recalculated from GeoJSON, never transcribed from narrative text [depth:metrics_recalculation]. Each metric records `status`, `value`, `unit`, `source_files`, `formula`, `confidence`, and `assumptions`.

### Core metrics

| Metric | Source | Confidence | Note |
|---|---|---|---|
| Design area | [metric:site_area_sqm] | low | Provisional boundary, not an official precise area; 0.11% deviation from the official figure |
| Green ratio | [metric:green_ratio] | medium | Recalculated from the union of `green_space.geojson` |
| Public space ratio | [metric:public_space_ratio] | medium | Union of stitch plazas and Datum nodes |
| Road area ratio | [metric:road_area_ratio] | medium | Right-of-way widths are conceptual assumed values |
| Building coverage ratio (BCR) | [metric:building_density] | low | Conceptual massing indication |
| Statutory FAR | `floor_area_ratio` | **unknown** | Official control indicator missing; not filled in |
| Conceptual FAR | `conceptual_floor_area_ratio` | low | Storey counts assumed; not a statutory control indicator |

### Topology verification

The `topology_check` field records the gap and overlap areas of the land-use partition: **a gap of 14.897 m² and an overlap of 0.099 m², with `land_use_partition_complete=false`**. Against an 11.41 km² site that is on the order of 1.5 parts per million, arising from floating-point intersection and coordinate precision; this proposal discloses the actual values rather than presenting the partition as complete. The spatial review returns PASS, retaining only three `KEY_AREA_PROVISIONAL` notices — these arise from the absence of official boundaries and are a factual record from the spatial review. Official boundary and key-area data are pending release; the affected geometry, metrics and drawings must be recalculated once published, and eligibility and scoring are for the maintainers and reviewers to judge under the formal rules.

### Compliance matrix correspondence

`compliance_matrix.json` covers all tasks under announcement clauses 1.3, 1.4, and 1.5 and agent.1–agent.6; `standard_matrix.json` covers all mandatory professional standards; `design_depth_matrix.json` marks the completion status of every formal-required depth item.

### Recalculation scope after official data becomes available

Once official red lines and key-area polygons are released, the following must be recalculated: all GeoJSON layers, all area and ratio metrics, phase divisions, figures, and the visualisation. Geometry generation is a parameterised script, so replacing the boundary source allows a single full re-run.

![Metric recalculation and evidence chain](assets/figures/metrics-evidence.en.png)

## Risk, Copyright, and Compliance

### Principal risks and handling

| Risk | Handling |
|---|---|
| Absence of official boundaries [depth:risk_missing_data] | `provisional_constraint` used throughout; drawn as low-contrast dashed constraint; disclosed in the body text, `sources.json`, `assumptions.json`, and `visual/index.html` alike; not used for area scoring |
| Administrative attribution of standard-setting authority | Only a conceptual mechanism is proposed; no judgement on administrative authorisation |
| Component catalogue price bands | Marked as conceptual order-of-magnitude ranges; not a quotation or procurement basis |
| Accuracy of historical narrative | All historical statements require public sources; `[待证]` items must be sourced or removed before the formal version |
| Scenario technology maturity | Maturity marked per card; immature technology is not presented as ready for full deployment |
| Resident acceptance | First installation is conditioned on "refusable, reversible, with a non-AI redundant path" |

### Boundary of officialness

This proposal makes no claim to have used or disclosed any non-public planning drawing, non-public spatial data, or internal control indicator. All content touching development intensity, building height, or road alignment is marked as a conceptual recommendation and is not presented as an official approved conclusion. All cited material states its source.

### Privacy and the human-review boundary

None of the sixteen scenario cards depends on individual identity recognition. Eligibility determination, subsidy, dispute, and disposition decisions always go to a human. Critical public services retain a non-AI redundant path.

### Copyright

The text, geometry, figures, and visualisation in this proposal are original outputs. No uncleared material, unauthorised likeness, trademark, or copyrighted image is used. `visual/index.html` is fully offline and loads no remote script, stylesheet, font, media, or map tile.

## References

**Cited (verifiable within the repository)**

- `brief/site-package/design_brief.json`, `agent_taskbook.json`, `allowed_design_space.json` [source:SITE-PACKAGE]
- `brief/site-package/ranges/planning_limits.json` (official area figures and control-indicator status)
- `brief/site-package/enums/land_use_codes.json`, `layers.json`, `source_types.json`
- `brief/site-package/geometry/provisional_boundaries.geojson`
- `brief/site-package/standards/references/`: urban design administrative measures, regulatory detailed planning, land-use classification guide, agent-facing taskbook, project announcement
- `data/source_registry.json` (source availability tiers)
- `docs/data-workflow.md`, `docs/terminology-glossary.md`

**To be completed before the formal version**

All marked `[待证]`; **no factual assertion is made in this version**: public sources for five to eight global AI innovation ecosystem cases; public sources on the Jing-Zhang Railway and the unification of technical terminology and standards; public data on rail and municipal infrastructure; official population and facility provision standards.

**Method and tooling**

- Geometry generation: Voronoi partition guarantees that adjacent parcels share exact boundary coordinates; the road network is generated along parcel edges and then subtracted from land use
- Projection: computed in EPSG:4548, output in EPSG:4326
- Verification: spatial review PASS, visual packaging check PASS
