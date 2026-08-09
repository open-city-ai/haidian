---
title: "The Leveling Line: making robots and AI public services re-measurable in the city"
author_github: "jiangmuran"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Leveling is not about measuring accurately once; it is about measuring back. Depart from a datum, run the circuit, return — and the closure error decides whether the whole line is trusted. This proposal applies that hundred-year-old rule where a wrong reading injures someone: low-speed robots, autonomous shuttles, and AI health, education, legal and daily services. The same instrument, turned on this open call and on the site itself, produced measured findings that are reported here including the ones that count against this submission. Concept advice on provisional boundaries; not a substitute for statutory planning."
tracks: ["robotics-autonomous-mobility", "ai-public-services", "civic-agent-governance"]
scenarios: ["robot-delivery-low-speed", "ai-health-service-navigation", "ai-traffic-walkability", "public-safety-operations-review", "enterprise-service-copilot", "ai-cultural-guide"]
---

# The Leveling Line: making robots and AI public services re-measurable in the city

> A hundred years ago, the first thing Zhan Tianyou did on the Jing-Zhang railway was not to cut through mountains. It was to survey.
>
> And the method of leveling is not "measure accurately". It is **measure back** — depart from a known point, carry the height station by station, close the loop, and return. The difference on return is the **closure error**. Within tolerance, every station on the line is accepted; over tolerance, the whole run is void and re-measured. You may not patch the worst station and keep the rest.
>
> A model that answers wrongly in an office costs a round of rework. A delivery robot that judges wrongly on a footway costs someone an ankle. A health navigator that misstates a dose may cost something that cannot be undone.
>
> **So this proposal does not open with "urban AI governance". It opens where a wrong reading injures a person.** Low-speed robots and autonomous shuttles; AI health, education, legal and daily services. What those need is not a cleverer model. It is an institution that can show the system **measures back**.

**A statement of position.** Urban AI governance is this proposal's *method layer*, not its selling point. Treating the governance protocol itself as the deliverable is the most saturated move in this call: of 298 merged proposals at the most recent measurement, 189 declare the governance track, and evidence-chain language appears in 31.5% of them [source:FIELD-CENSUS-2026-08]. This proposal uses governance as a tool and applies it where coverage is thinnest — `robotics-autonomous-mobility` is **12 of 298 by label (4.0%)**, the thinnest of the eight tracks and under half the next; `ai-public-services` is **26 (8.7%)**, tied for second-thinnest with `youth-friendly-public-space` (25). Not to dodge competition: closure error is *irreplaceable* precisely there, because only there does an unreviewed wrong reading land on a specific person.

## Design Basis and Source List

The first authority is the official prequalification announcement for the international solicitation [source:OFFICIAL-ANNOUNCEMENT]; agent tasks follow the open-call taskbook [source:AGENT-TASKBOOK]; machine-readable boundaries, enumerations, ranges and schemas come from the registered site package [source:SITE-PACKAGE]. Source usability follows the registry [source:SOURCE-REGISTRY], reading navigation follows the processed pack [source:PROCESSED-FACT-PACK], and boundary and key-area provenance follow [source:BOUNDARY-SOURCE] and [source:KEY-AREA-SOURCE].

Mandatory professional standards are read from the local reference snapshots rather than from a URL alone: urban design administration measures [standard:MOHURD-URBAN-DESIGN-MEASURES], regulatory detailed planning measures [standard:MOHURD-CONTROL-DETAILED-PLANNING], the national land-use classification guide [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE], architectural design depth provisions [standard:MOHURD-ARCH-DESIGN-DEPTH-2016], the project announcement [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], and the agent taskbook [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. Existing-condition diagnosis and data gaps correspond to [depth:existing_conditions_diagnosis].

**Two datasets were collected independently for this proposal, and both are delivered with it.** A re-runnable census instrument enumerates the GitHub git tree for every merged proposal directory and reads each one's public `proposal.md` front matter and `agent.json` [source:FIELD-CENSUS-2026-08]; its most recent run (2026-08-09) covered **298** proposals with 298/298 fetched and zero failures; the three earlier runs covered 184, 215 and 228. A second instrument cross-checks the provisional boundary against OpenStreetMap's surveyed geometry of the Jing-Zhang Railway Heritage Park [source:OSM-REFERENCE-2026-08].

The census deliberately does not read `submissions-data.js`. That file is a generated gallery index and it lags. **This observation reversed under this proposal's own re-measurement, and is recorded as such:** on 8 August it listed 184, i.e. 44 fewer (19.3%) than the repository held, unchanged between two censuses, which read as a widening gap; on 9 August it measured 292 of 298, a lag of **6 (2.0%)**. The index has plainly been caught up. This proposal claims no credit — causation cannot be shown and there is no evidence the change relates to this report; it is written here because a mechanism that only re-measures when the result flatters it is not a mechanism. **What survives is the methodological part: a review instrument must read the authoritative source (the git tree), not a derived index that may lag by an amount which itself varies.**

Data products ship in `visual/assets/` and the numbers can be checked directly. The generation scripts cannot ship: the submission format's allow-list accepts no `.py` anywhere (`assets/*` takes images only, `report/*` five fixed names, `geometry/*` nine named files). They are published in the accompanying issue instead. Both self-collected sources are graded `background_only` in `sources.json`: they are the empirical basis of the argument, **not** evidence for any spatial or statutory conclusion.

![Overall concept and site cross-check](assets/figures/site-overview.en.png)

Official `SITE_BOUNDARY` and the three `KEY_AREA` polygons remain unpublished. This package labels `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` as `provisional_constraint` with `official_boundary=false`; they are for generation, self-check, visualisation and discussion only, never as an official redline, approval basis or precise-area basis. When official polygons appear, **every layer and metric is recomputed as a whole** — never one file at a time. That is the same rule this proposal applies to the city: over tolerance, re-measure the section, do not patch a station.

### Act One: turn the instrument on this open call first

An instrument that claims to make city AI re-measurable should first be pointed at the object closest to home.

This is not a comment on the organisers' work. It is **the thing they most lack right now**: with 298 merged proposals and PR numbers past 900, the hard problem is no longer intake but *reading across*. Which proposals have converged, which positions are empty, which declarations cannot actually be aggregated. A gallery page cannot answer that. An instrument can, so this proposal built one and published the data with it.

**Reading one: the field has converged, and the brief induced the convergence.**

| Structural motif | Proposals | Share |
|---|---|---|
| Three cores / three stations | 152 | 51.0% |
| Two wings | 120 | 40.3% |
| Evidence chain / recomputable | 94 | 31.5% |
| One spine / one belt | 93 | 31.2% |

The taskbook prescribes "three areas, two wings", so more than half the field draws the same skeleton. That is not consensus; it is the question shape. **Drawing that skeleton again adds nothing.** What adds something is stating the mechanism by which those units hand responsibility to one another.

**Reading two: track coverage is severely uneven.** 202 proposals declare traffic and walkability (67.8%), 189 governance (63.4%), 174 enterprise services (58.4%) — against **12** for robotics and autonomous mobility (4.0%), 25 for youth-friendly public space, and **26** for AI public services (8.7%).

Both of this proposal's tracks thickened between measurements — robotics 6 to 12, public services 19 to 26 — but their relative position did not change: robotics remains the thinnest by a factor of two. **The wording is adjusted rather than defended**: public services is now tied for second-thinnest, one proposal apart from youth-friendly public space, so calling it "the second thinnest" would be inaccurate.

Labels are not coverage, and that distinction matters. Reading every proposal in those two tracks showed both directions of error: one declares the robotics track while its "robots" are ecological sensing devices, and another substantively treats ground robots, tiered autonomous-vehicle admission and low-altitude delivery corridors while never declaring the track at all. So the precise statement is: **twelve by label, slightly more in substance, and thinnest of the eight either way** — which is itself a useful reading for the organisers, because track labels currently cannot serve as a coverage measure.

**Reading three: the "machine-readable" disclosure field is not machine-readable.**

`agent.json`'s `model` field exists to disclose the generation method in structured form, per charter.6 (disclose generation method) and charter.5 (structured, agent-readable). Measured: 211 filled in, **87 (29.2%) still hold the scaffold placeholder or are empty**.

And the 211 that are filled in use **99 distinct strings that collapse to 8 buckets** under the mapping rule published with the script (one bucket being "unclassified"). The GPT/Codex family alone is written **50 different ways** across 138 proposals.

**No one can aggregate "which models produced this call" from that field.** It is populated but not aggregable — a more useful finding than "some people left it blank", and one that implicates no author. Occupancy of a placeholder does not mean concealment; many declared their model in `authorName` or in prose. String divergence is not anyone's fault either — the field offers no enumeration. The fix is light: split `model` into an enumerated family plus a free-text detail, and add one enumeration check to the gates. That proposal, the data and the scripts are all in the accompanying issue.

Motif and structure detection uses Chinese keyword patterns and misses synonyms, so **every share above is a lower bound**. The corpus grows daily; re-run before citing. **Applied to this proposal itself, that rule produced a stronger finding than any single snapshot.** Four independent runs:

| Run | Corpus | Disclosure field empty |
|---|---|---|
| First | 184 | 29.9% |
| Second | 215 | 30.7% |
| Third | 228 | 30.3% |
| Fourth | **298** | **29.2%** |

The corpus grew **62%** over that span while the gap stayed inside a 1.5-point band, 29.2–30.7%. A ratio that does not move while the corpus grows by three-fifths is not snapshot noise but a **structural property** — it does not depend on who enters, but on the field having no enumeration and no gate that checks it. This is also why the proposal gives methods rather than numbers: numbers expire, four measurements pointing the same way do not.

![Evidence chain and submission package: a leveling circuit not yet closed](assets/figures/evidence-circuit.en.png)

None of this weakens the call. It shows the opposite: this open-source mechanism **is genuinely producing checkable public evidence**, and no other city project can be measured this way. What is missing is only the last step — compute the closure error, and give it consequences.

**What the instrument produced, and what it did not.** Both self-collected datasets were published as issues with their re-runnable scripts, and another contributor subsequently opened upstream implementations:

| This proposal's issue | Upstream implementation PR (not by this author) | Content |
|---|---|---|
| #840 field census and the disclosure-field defect | **#848** `feat: add structured model disclosure fields` | Exactly the recommended fix: keep free-text `model`, add an enumerated `model_family` with a paired `model_detail`, validated as a pair |
| #846 OSM boundary cross-check | **#850** `docs: register OSM boundary cross-check limits` | Registers this proposal's readout (0% intersection, 412.5 m nearest distance, 100% research-scope coverage) as `background_only` with ODbL attribution and prohibited uses |
| #858 CI timing race | #861 | Queue-period false failures from a head_sha / live-file-list mismatch |
| #883 self-check evidence not persisted | #807 | Transactional persistence of the self-check verdict |

Three things must be stated precisely. **First, all of those PRs were written by someone else; this proposal contributed the measurement, the scripts and the diagnosis** — #848 describes itself as implementing "the low-risk structured disclosure portion of #840", and #850 as recording "the reproducible OSM cross-check raised in #846". **Second, none of the four had merged at the time of writing**, so they are not presented here as effective repository rules. **Third, this proposal claims no credit for the gallery index lag closing from 44 to 6**; causation cannot be shown.

This section is not a record of merit. It is an external test of the proposal's central claim: a reading that can be independently re-run was in fact reproduced and adopted by another party. **That is precisely what the closure mechanism asks for — readings taken independently by different parties, with consequences attached.** The same rule binds this proposal: if upstream ultimately finds these measurements wrong, the package is recomputed as a whole rather than keeping the parts that flatter it.

### Act Two: the same instrument on the site, and what it found in the site data

Act One measured paper. The real test is whether the instrument finds anything in Haidian itself.

The method is identical to closure: **one object, two independent routes, compare**. Route A is the announcement's textual bounds, from which the repository inferred `provisional_boundaries.geojson`. Route B is OpenStreetMap's surveyed polygon for the Jing-Zhang Railway Heritage Park and the disused railway alignment. Neither route uses official polygons; both can be re-run by anyone.

| Measurement | Result |
|---|---|
| Surveyed park area (built section, OSM) | **17.49 ha** |
| Intersection with the provisional **overall design area** | **0.00 ha (0% coverage)** |
| Nearest distance to that boundary | **412.5 m** |
| Relationship to the provisional **coordinated research area** | 100% contained ✓ |
| Disused railway | 14 segments, 3,028 m; 683.7 m inside the provisional overall design area |

**That is a closure error, and it is in the site data rather than on paper.** The 43.6 km² research area agrees completely with OSM, so the announcement's textual bounds and the actual geography do not conflict; but the 11.4 km² provisional overall design area does not intersect the surveyed park at all.

The limits must be stated exactly. OSM is crowd-sourced and its polygon may cover only the built, mapped section rather than the planned whole. The provisional boundary is itself explicitly an inference from text, with its basis and error documented in the repository. **This proposal does not adjudicate which is right.** It reports one recomputable fact: the two routes differ by 412.5 m.

**And the same measurement measured this proposal.** The submitted spine centreline lies **1,116.7 m** from the surveyed park, because it was generated against the provisional boundary. That sentence works against this submission. Omitting it would make every claim about recomputability hollow.

Why not simply move the spine? Because the package must be internally consistent with the boundary it declares — spatial self-check requires every layer to sit inside the submitted `site_boundary.geojson`, which the repository's process derives from the provisional geometry. Moving the spine would trade one error for another.

The real answer is a property of the design: **a leveling network is boundary-relative, not coordinate-absolute.** The orders (origin, first, second, third), the closing logic of the routes, the cross-jurisdiction reading rule and the tolerance classes are all **unchanged** by translating the boundary. Only where the marks land changes. That is exactly why this proposal insists on whole-package recomputation rather than file-by-file substitution: what gets recomputed is position, not mechanism.

## Three-Level Scope Framework

The proposal is organised on the three levels the announcement sets, and each maps one-to-one onto an order of survey precision [depth:three_level_scope_framework].

| Announcement level | Extent | Network role | Cycle | Spatial evidence |
|---|---|---|---|---|
| Coordinated research area | ~43.6 km²; north to the North Fifth Ring Road, east to the Jingzang Expressway, south to Xizhimenwai Street, west to Wanquanhe Road | Whole-network control | Annual | `provisional_boundaries.geojson#PROV-RESEARCH-001` [source:BOUNDARY-SOURCE] |
| Overall design area | ~11.4 km²; the 1–2 km of city around the heritage park | First-order route: the spine plus two closing routes | Semi-annual | [data:geometry/site_boundary.geojson#SITE-001], recomputed as [metric:site_area_sqm] |
| Key areas | ~369.3 ha, recomputed from [data:geometry/key_areas.geojson#PROV-KEY-001]; the announcement text says ~368.4 ha | First-order benchmarks BM-0 / BM-1 / BM-2 | Annual | [data:geometry/key_areas.geojson#PROV-KEY-001] |

These are not three unrelated drawing sets. The research area decides **what to measure**; the design area decides **which route to measure along**; the key areas decide **where to set the stones**. Any area, ratio or count that cannot be recomputed from a structured layer is not written as a conclusion — the basic verifiability requirement [standard:MOHURD-URBAN-DESIGN-MEASURES] places on urban design output.

### Why three levels map exactly onto three orders

Orders in a leveling network are not a copy of administrative hierarchy. They are a **division of labour between precision and frequency**: the higher the order, the larger the extent it controls, the less often it is re-measured, and the more stability it demands; the lower the order, the closer it sits to daily use, the more often it is read, and the more readily it catches small failures. The announcement's three levels are isomorphic to that:

- **The coordinated research area (43.6 km²) decides what to measure.** Industrial ecosystem, innovation chain and future urban form are judged at this level, and they change on a scale of years, so this level corresponds to annual whole-network control. It produces no individual readings. What it produces is the answer to *which questions deserve to be treated as public questions at all.*
- **The overall design area (11.4 km²) decides which route to measure along.** The spine and the two closing routes are established at this level and re-measured every six months. Once a route changes, the reading series of every station on it is broken — which is exactly why this level is required to be stable, and why a route is not adjusted for convenience.
- **The key areas (369.3 ha recomputed from the layer; ~368.4 ha in the announcement text) decide where to set the stones.** The three first-order benchmarks land here and are re-measured annually. A stone is a physical object: once set, it becomes the common reference for every later re-survey, which is why its position must be settled before anything is built around it.

**Constraints across levels run one way.** A lower-order reading cannot amend a higher-order datum, but it can force that datum to be reviewed. A third-order point that exceeds tolerance repeatedly may not adjust its own tolerance — otherwise every point would eventually be within its own tolerance — but it may require the first-order benchmark to reconsider whether the tolerance was set wrongly in the first place. What this asymmetry prevents is specific: **the people closest to the ground being obliged to endorse a standard they can see is unreasonable.**

The two figures either side of this discrepancy deserve a note. The key-area total recomputed from the submitted layer is 369.3 ha while the announcement text says approximately 368.4 ha, a difference of about 0.24%. This proposal does not reconcile them: the layer is a provisional substitute and the announcement figure is textual, so agreement to three significant figures would be coincidence rather than evidence. Both numbers are reported, with their sources, and the difference is left visible.

All three spatial boundaries are provisional substitutes [source:BOUNDARY-SOURCE]; their inferential basis and error are documented in the repository's `provisional_boundaries_basis.md`. When official data is published, the whole package is recomputed [depth:existing_conditions_diagnosis] — never one layer at a time, because a network in which one station has been re-measured and the rest have not is not a network.

![Three scope levels and network orders](assets/figures/land-use-structure.en.png)

## Coordinated Research Area: Industry and Future City Research

### Naming and identity system (agent.1)

**Chinese name: 京张水准线. English name: THE LEVELING LINE.**

The name is not rhetoric; it is a statement of method. In surveying, leveling means geometric spirit leveling, and its product is a **leveling network** — built from permanent stones, open to independent re-measurement by anyone, and judged as a whole by its closure error. Those three properties are exactly the governance properties this belt needs: physical, re-checkable, judged whole rather than station by station.

The naming system is an extensible numbering grammar rather than a slogan:

| Level | Convention | Example | Meaning |
|---|---|---|---|
| Network | Jing-Zhang leveling network | JZ-NET | The governance network of the whole line |
| Origin | Origin benchmark | **BM-0** | Public evidence hub; the network's starting elevation |
| First order | First-order benchmark | BM-1, BM-2 (the origin BM-0 is listed separately) | The three key areas, re-measured annually |
| Second order | Second-order benchmark | BM-2x | Nodes in the two wings, re-measured quarterly |
| Third order | Third-order benchmark | BM-3xx | Community and station level, re-measured monthly |
| Route | Closing route | RT-N, RT-S | The out-and-back path a scenario is validated along |
| Reading | Closure error / tolerance | f / F | The measure of trust, and its threshold |

Any new node, scenario or institution receives a number in this grammar and joins a re-survey cycle. **That is what "extensible" means here** — a property of the numbering system, not an adjective attached to the concept.

### Visual identity direction (agent.1)

The mark is taken from two physical objects: the form of a benchmark stone, and the reticle a surveyor reads through a level. Superimposed they give one geometric sign — **a horizontal datum line crossed by a reticle, rising slightly at the right end and returning to the same level**, and the small height difference between that rise and that return is the closure error itself. The mark is therefore not decoration; it draws the belt's method.

- **Primary form:** the datum line plus the reticle intersection. It degrades to a single-colour 1-bit graphic, so it can be etched into a metal stone, cast into a manhole cover, or used as a data-interface icon.
- **Colour direction:** the datum red of surveying convention (readings, tolerance, exceedance) and railway grey (the base colour of infrastructure), on a neutral off-white ground in public-space applications.
- **Extension:** every benchmark carries a uniquely numbered plaque in a common style, so the whole line reads as one identifiable visual sequence.
- **Copyright boundary:** no unlicensed typeface, image, trademark, portrait or corporate mark is used anywhere. The mark is a directional proposal and a geometric construction note for a professional visual team to develop; it is not a finished identity.

The mark, its construction, four variants and three applications (benchmark plaque, reading board, data-interface icon) are drawn below. All graphics are generated from geometric parameters and can be redrawn from them.

![Identity: mark, construction and applications](assets/figures/identity.en.png)

### Three positionings, five functions, and a circuit that closes (agent.1)

The taskbook gives three positionings and five functions [source:AGENT-TASKBOOK]. Rather than restate them, this proposal connects them into a **circuit that can close** — which is precisely the blind spot the field converges into. The measurement shows 51.0% of 298 proposals using a three-core structure, 40.3% two wings, and 31.2% a single spine [source:FIELD-CENSUS-2026-08]. That convergence is not consensus; it is what the taskbook's "three areas, two wings" induces. Drawing the same structure again adds nothing. What adds something is stating **by what mechanism these units hand responsibility to one another.**

The leveling network's answer is elevation transfer: each station's reading depends on the one before it, and the run returns to the origin to be computed.

```
                    BM-0 origin benchmark (AI Origin Community)
                    public evidence hub · network origin
                      ▲                 │
       closure f      │                 │ depart
                      │                 ▼
   RT-N north route ──┴── BM-1 Zhongzhiyuan (full-stack autonomy · AI governance)
        │                        │
        │              Xiaoyuehe scenario wing BM-2x (scenarios · a vibrant city)
        │                        │
   RT-S south route ──┬── BM-2 Dazhongsi (AI-native activity)
                      │
             Zhongguancun services wing BM-2x (factors · IP and capital)
```

- **BM-1 Zhongzhiyuan** carries the full-stack autonomous AI innovation system and the global-discourse positioning: it is where tolerance F is set, which in surveying is called the **datum of origin**.
- **BM-0 the AI Origin Community** carries the world-class AI innovation ecosystem: it is both the network's starting point and the point at which closure is computed, and it is the physical landing place for the public knowledge base this call has produced.
- **BM-2 Dazhongsi** carries AI-native new activity: high-frequency consumer and business scenarios take their readings here.
- **The Zhongguancun services wing** supplies factors and capital and is the route's **support system**; **the Xiaoyuehe scenario wing** supplies real users and is therefore the route's **source of reading density**.

The five functions are consequently not five parallel slogans but five positions on one circuit: set the datum (Zhongzhiyuan) → depart (Origin Community) → take readings (Dazhongsi and the two wings) → return to the origin and compute (Origin Community) → re-measure if over tolerance. The spatial expression is [data:geometry/public_space.geojson#PUBLIC-001], and the overall structure corresponds to [depth:overall_spatial_structure].

### Global AI innovation ecosystem cases (agent.2)

Six cases, each asked one question: **what mechanism establishes its public trust, and can that mechanism be re-measured.** All material is drawn from publicly available institutional documents and public reporting. No non-public data is cited, and no company lists, investment figures or output values are fabricated.

| # | Case | Trust mechanism | Re-measurable | Transferable point |
|---|---|---|---|---|
| C1 | Algorithm registers in Helsinki and Amsterdam | Public register of each algorithm in use: purpose, data, responsible owner, appeal route | High: entries can be checked one by one | Directly supplies the information base for a benchmark plaque |
| C2 | Risk tiering in the EU AI Act | Duties differentiated by risk class | Medium: the tiering is checkable, enforcement needs a regulator | Supports the tiered setting of tolerance F |
| C3 | Singapore's AI Verify testing framework | Comparable reports produced with a standardised toolkit | High: the tests can be re-run | Supplies the technical form that re-survey takes |
| C4 | Algorithmic impact assessment practice in the UK NHS | Mandatory ex-ante assessment and ex-post review for high-risk uses | Medium-high: the record is auditable | Supports the strictest tolerance for health scenarios |
| C5 | Civic data-stewardship practice in Taipei and Barcelona | Data use decided by a citizen agenda | Medium: the agenda is public | Supports the public's right to initiate re-survey at third-order points |
| C6 | Reproducibility norms in open-source communities, e.g. artifact evaluation | A conclusion must ship a re-runnable artifact | High: the artifact executes | This proposal publishes all generation scripts and data products on that norm |

All six point at one gap: **they register and they assess, and none institutionalises returning to the origin and computing.** A register tells you what a system declared. An assessment tells you what experts think. Neither answers *how much the conclusion differs when the same public question passes through different nodes at different times.* Closure error is the thing that fills that gap.

### Innovation ecosystem and element mechanisms (agent.2)

The ecosystem map is organised in three columns — element, space, re-survey responsibility — specifically to avoid writing industrial recruitment as though it were a settled arrangement:

| Element | Spatial carrier | Owning benchmark | Re-survey item |
|---|---|---|---|
| Land and space | Key-area renewal parcels | BM-1 / BM-0 / BM-2 | Delivery rate of promised space |
| Compute | Consolidated compute nodes | BM-1 | Share of public compute open to application |
| Data | Data-factor circulation venue | BM-2 | Authorisation-chain completeness |
| Scenarios | Real-use venues in the two wings | BM-2x | Enforceability of scenario exit |
| Funding | Technology-services wing | Zhongguancun wing BM-2x | None |
| Talent | Talent district and third places | BM-0 | Re-survey of service satisfaction |

The re-survey cell for funding is **deliberately empty**: investment arrangements are decisions for market actors, an urban design proposal should not write them as governance metrics, and it must never express them as fiscal commitments. That blank is itself a compliance statement [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

The correspondence between industry and space lands in [data:geometry/land_use.geojson#LANDUSE-001], with metric conventions in [metric:key_area_count]. The full chain of custody and the six-case comparison are drawn below — **the funding row's re-survey cell is a blank box in the drawing, and that is a judgement rather than an oversight.**

![Innovation ecosystem and element mechanisms](assets/figures/ecosystem.en.png)

### Regional coordination: extending the network into a regional one (agent.1)

The taskbook asks for a response on coordination with the Beiwei community, Future Science City, Huairou Science City, the Economic-Technological Development Area, and Beijing-Tianjin-Hebei [source:AGENT-TASKBOOK]. Most treatments of coordination stop at phrases like "strengthen linkage, build platforms" — which cannot be tested and therefore cannot be executed. Leveling supplies an executable form, because **networks are built to be tied together**: two independent networks that share a datum convention and a tolerance convention can be joined by inter-measurement into one larger network, without either side giving up any of its own authority.

The mechanism proposed is therefore **cross-regional mutual recognition of tolerance**, in three parts:

| Mechanism | Content | What can be checked |
|---|---|---|
| Common tolerance convention | Each cluster adopts the same definitions of F1/F2/F3 — the conditions they apply to and how they are computed — while remaining free to set stricter values | The convention documents are public and comparable |
| Closure records travel with the scenario | A scenario's closure record obtained here (readings, composition of review parties, exceedances and remediation history) travels with it to another cluster as admission material | The record is checkable item by item and cannot be edited after the fact |
| Inter-measurement nodes | Each cluster maintains one outward-facing inter-measurement point, and they exchange readings on a shared set of public questions at intervals, computing a **regional closure error** | The regional readings are published and the difference is recomputable |

The second is the one that matters, because it turns coordination from *signing an agreement* into *saved duplication*: a scenario that has already run a full re-survey cycle here arrives elsewhere carrying a verifiable closure record, so the receiving side does not verify from zero — it reviews the record and applies its own tolerance. **The benefit of coordination is therefore a specific, measurable saving in administrative cost, rather than a statement of intent.**

### What each of the five partners actually trades

The five partners the taskbook names sit at different points in the innovation chain, so what each exchanges with this belt is different. Writing them all into one paragraph would amount to no coordination at all.

| Partner | Where it sits | What it trades with this belt | Why it is that |
|---|---|---|---|
| **Economic-Technological Development Area** | Volume production and higher-level autonomous-vehicle road testing | **Mutual recognition of closure records across complementary speed domains** | The most directly relevant of the five: the Development Area works at vehicle speeds on open roads, this belt at **pedestrian scale with low-speed devices**. The same machine behaves entirely differently in the two domains, so the two closure records **cannot substitute for one another but can be connected** — an F1 clearance here is a condition for entering pedestrian-dense space, not for entering a carriageway, and vice versa. Both sides must confirm this; this proposal does not decide it for them |
| **Future Science City** | Corporate research institutes and engineering | Scenario demand and real user density | The two wings supply real-user density as a validation ground for institute output; what comes back is engineering capability |
| **Huairou Science City** | Large scientific facilities and basic research | The measurement method itself | The only partner that coordinates at the **method layer** rather than the application layer: quantifying f, setting cycles, and the statistical basis for revising tolerance are all measurement-science questions |
| **Beiwei community** | An innovation community named in the taskbook | Mutual measurement points and exchange of review parties | This proposal holds no knowledge of its specific positioning and proposes only a mechanism interface: set up reciprocal inter-measurement points and exchange review parties so both sides' readings are comparable |
| **Beijing-Tianjin-Hebei** | Cross-provincial coordination | Cross-provincial recognition of the tolerance convention | The highest and slowest layer. This proposal argues only that the convention comes first — without a common convention, no cross-provincial recognition of records is possible at all |

**A boundary that has to be stated.** The descriptions above of where each partner sits are based on publicly known general positioning and are **unconfirmed by any of them**. This proposal holds no internal plan of any party, makes no commitment on anyone's behalf, and does not assume any coordination agreement exists. Every row is a **mechanism interface offered for independent evaluation**, and the complementary speed-domain relationship in the Development Area row in particular must be settled against both sides' actual testing protocols.

This proposal decides nothing on behalf of any cluster and assumes no coordination commitment; all of the above is mechanism advice for independent assessment [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. At the regional level, the spatial interface is the coordinated research area [data:geometry/site_boundary.geojson#SITE-001].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The core task inside the overall design area is to turn the leveling network from a concept into a buildable spatial sequence [depth:land_use_layout].

**The spine.** The existing linear green corridor of the Jing-Zhang Railway Heritage Park is the skeleton, forming a continuous walkable public axis. The spine's spatial task is not to re-make landscape; it is to **carry measurement points** — at intervals, a public node where someone can dwell, read a posted result, and initiate a re-survey.

**Development intensity and height.** This proposal gives **no** figures for floor area ratio, building height, density, setbacks or road redlines [depth:development_intensity_controls] [depth:height_massing_character]. These are statutory regulatory-plan controls and must follow official conditions [standard:MOHURD-CONTROL-DETAILED-PLANNING]; supplying numbers while official data is absent is fabricated certainty. What is given instead are **form principles**: continuous sky corridors and continuous frontage either side of the spine, rising from the spine outward inside each key area, and existing height as the cap around historic nodes. Once official conditions are published, numbers are generated from these principles and the package is recomputed as a whole.

**Character.** The whole line takes the honesty of infrastructure as its register — retain the engineering language of the railway structures (sleepers, ballast, signal posts, mileposts), and let new work sit beside them in clearly contemporary material rather than imitating historical style, so that a hundred years of time layers stay legible in a single view.

### What urban design owes at regulatory-plan depth

Statutory regulatory planning supplies numbers. Urban design supplies **relationships**. Six sets of form and interface rules are given for the overall design area, each checkable item by item, all of them relational or principled, none of them a statutory control value [depth:height_massing_character].

**One — frontage continuity.** Frontages either side of the spine must be continuous, with no breaks formed by walls, parking entrances or defensive setbacks. The test for a break is whether **a walker's sightline is interrupted by function-less blankness** while walking continuously; that can be counted on site, which is what makes it checkable rather than rhetorical. Existing walls should be converted into transparent, dwellable frontage rather than demolished and rebuilt.

**Two — ground-floor publicness.** Buildings along the spine must carry public function at ground level (any of: outward-facing service, display, seating, toilets), and must not present a pure plant level or a bare lobby. This is directly tied to the network: **a benchmark needs people present to be re-measured**, and a frontage with no ground-floor function holds nobody.

**Three — view corridors.** The longitudinal sky corridor along the spine is kept unbroken, as are the lateral corridors from historic nodes toward the railway heritage structures. View corridors are a **protective requirement**: new massing may not enter them. The controlling surfaces must be fixed only after official regulatory conditions and heritage protection boundaries are published; this proposal pre-empts no control line.

**Four — relative frontage heights.** No absolute figures; three relative rules instead. Frontages immediately on the spine are **no taller** than those behind them; heights around historic nodes are capped at **existing height**; within a key area, heights rise from the spine outward. All three hold under any official numbers, so publication of the official conditions cannot invalidate them.

**Five — parcel grain.** Over-deep, single-ownership super-parcels should not occur along the spine. They inevitably produce long stretches of closed frontage with no entrances, and they leave nowhere to place a cross-jurisdiction benchmark. The grain must be set against actual ownership; the principle is given, the dimension is not.

**Six — servicing and access.** Vehicle entrances and loading may not open onto the spine, and low-speed device charging and standby may not occupy the pedestrian frontage (see the kerb priority order in the transport section). This rule is what keeps "the spine is a continuous public axis" true after construction — without it, continuity is cut into pieces by driveways one parcel at a time.

### East-west stitching: types and priorities, not engineering conclusions

The spine is cut laterally by several existing arterials, and stitching those cuts is one of the central tasks of the overall design area. This proposal classifies each stitching point into three types by **cost and feasibility**, and states plainly where it stops:

| Type | Character | What this proposal supplies |
|---|---|---|
| A — improvable now | A crossing already exists; the problem is detour distance, gradient or waiting safety | Priority order and direction of improvement; can ride along with near-term projects R1–R4 |
| B — needs channelisation | Requires signal changes, channelisation or footway widening | The connection need and the basis for it; requires specialist traffic review |
| C — needs new structure | Requires a bridge, tunnel or underpass | **The need is registered only; no feasibility conclusion is offered** |

The classification is by the approval and engineering level a connection requires, **not by importance** — and that distinction has to be stated rather than smoothed over. **An important connection may fall in class C and therefore remain unrealised for a long time. Saying so is more useful than drawing a line and implying the problem is solved.** The spatial position of each stitching point must be fixed after official boundaries and road conditions are published [standard:MOHURD-CONTROL-DETAILED-PLANNING].

**Not decided in this section:** floor area ratio, building height, density, green ratio, setbacks, building control lines, road redlines, parcel dimensions, view-corridor control surfaces, and any engineering feasibility conclusion.

## Detailed Design of Key Areas

Each of the three key areas carries one survey role, and the three check one another [depth:three_key_area_detailed_design].

| Area | Survey role | Design positioning | Spatial move | AI scenarios and operation |
|---|---|---|---|---|
| Zhongzhiyuan AI Autonomous Innovation Acceleration Area [data:geometry/key_areas.geojson#PROV-KEY-001] | **BM-1, datum of origin** | Full-stack autonomous innovation and the source of governance standards | Tolerance chamber (F set and revised in public); low-carbon social interface along the Qinghe frontage; land reserved for a standard test field | S11 industry validation; compliance pre-check services for firms |
| Beijing AI Origin Community [data:geometry/key_areas.geojson#PROV-KEY-002] | **BM-0, origin benchmark** | Near-campus innovation, open-source system, talent district | **Origin benchmark stone** and public evidence hall (permanent display and search of every proposal in this call); direct campus-to-park walking link; rail-station integration | S01 scenario open day; S07 open-source collaboration; re-survey of talent services |
| Dazhongsi AI Industry Cluster [data:geometry/key_areas.geojson#PROV-KEY-003] | **BM-2, high-frequency reading point** | AI-native consumption and business | Four-quadrant pedestrian connection at the intersection; compound use of planned green space; Dazhongsi station integration | S03 agent business desk; S05 data-factor circulation; S09 daily-service demonstration street |

![Key areas and benchmark layout](assets/figures/key-areas.en.png)

### Zhongzhiyuan AI Autonomous Innovation Acceleration Area (BM-1, the datum of origin)

**Why the datum of origin belongs here.** A datum should sit where conditions are most stable and least exposed to day-to-day fluctuation. Zhongzhiyuan carries full-stack autonomous innovation and is where governance standards originate — it is where tolerance F is set. **The place that sets the standard should not also be the place under daily operating pressure**, or the standard drifts with that pressure rather than with evidence.

- **Programme.** R&D and pilot production lead, with a standard test field, a tolerance chamber — a standing public space in which F is set and revised — and an industry display frontage. The test field must be enclosable, pausable and reversible; its controlled boundary is [data:geometry/constraints.geojson#CONSTRAINT-001].
- **Buildings and scale.** Indicative footprints are in [data:geometry/buildings.geojson#BUILDING-001], including the test field and tolerance chamber (BLDG-004) and the L2 closure stele (BLDG-002, offset from the former so the two do not share ground). Scale is order-of-magnitude only and constitutes no building design.
- **Retain, renovate, demolish.** Renovation-led. Existing workshops and research buildings with clear title and sound structure are converted first into test and display space. No demolition conclusion is offered.
- **Public space connection.** A low-carbon social environment is organised along the Qinghe frontage, giving a continuous walk from the spine to the water's edge. That frontage is also a candidate position for a second-order point.
- **Traffic.** External traffic here is freight-like — test equipment and materials — and must be separated from the pedestrian spine. **Freight entrances may not open onto the spine.**
- **Scenarios carried.** S11 AI industry validation field (F1) and S10 public-safety operations review (F1). Both are scenarios that **may never be executed automatically.**

### Beijing AI Origin Community (BM-0, the network origin)

**Why the origin belongs here.** The origin must be the place the public can most easily reach and, at the same time, the place nearest to knowledge production. A near-campus position satisfies both, which no other candidate on this line does.

- **Programme.** Near-campus innovation, incubation and commercialisation, a talent district, and the open-source system. The substantive addition is a **public evidence hall** — permanent display and search of every proposal in this call and of every subsequent re-survey reading, open to the public with no access control.
- **Landmark.** The **origin benchmark stone L1** (BLDG-001), a metal stone set flush with the ground, with contributors' numbered sequence set into the surrounding paving. This meets the call's own inscription promise without inventing a device for it: a benchmark stone has always been a permanent mark left for whoever re-measures a century later.
- **Retain, renovate, demolish.** Retention and renovation combined. **Residential provision must not be reduced to make room for innovation functions**; any talent housing must be additional to, not substituted for, existing residential supply.
- **Public space connection.** The direct campus-to-park walking link is this area's decisive move, and its success is judged by the **actual walking time** of personas P3 and P4 — not by straight-line distance, which conceals every crossing, kerb and detour that decides whether the link is used. Rail-station integration follows the station-point unification rule, with the concourse doubling as a third-order point.
- **Traffic.** Walking and cycling lead. The jurisdictional problem is sharpest here: points in this area sit across both park management and campus authority [data:geometry/public_space.geojson#PUBLIC-001].
- **Scenarios carried.** S01 scenario open day and S07 open-source collaboration, both F3; talent and public-service re-surveys depart from here.

### Dazhongsi AI Industry Cluster (BM-2, the high-frequency reading point)

**Why the high-frequency point belongs here.** The consumption and business frontage carries the densest footfall and the highest use frequency, and is therefore where the dispersion of service AI shows up first — **high frequency is a resource for readings, not a burden on the area.**

- **Programme.** Leading firms and intelligent terminals, content consumption, data-factor and digital-asset circulation, commercial services. The data-factor circulation venue is the spatial carrier of S05.
- **Buildings and scale.** The AI-native business frontage (BLDG-005) and the L3 zeroing point (BLDG-003, offset). The zeroing point is an annual ceremony space and an ordinary public dwelling space the rest of the year; it is not single-use.
- **Retain, renovate, demolish.** Renovation and compound use. **Compound use of planned green space is conditional on the green function not being downgraded**: what is compounded is time-of-day and user group, not the conversion of green space into development land.
- **Public space connection.** The **four-quadrant pedestrian connection at the intersection** is the most concrete spatial task in this area, and also the decisive location for device queue storage — without four-quadrant connection, devices and pedestrians necessarily contend for the same waiting area (see the transport section).
- **Traffic.** Dazhongsi station integration. Points here span **three jurisdictions** — municipal road, rail station and commercial property — making them the most complex on the line.
- **Scenarios carried.** S03 agent business service desk, S05 data-factor authorisation chain, S09 daily-service demonstration street, mostly F2.

### Retain, renovate, demolish: principles common to all three

Classification depends on the title and structural-safety assessment of existing buildings, and both are currently data gaps. This proposal therefore **offers no demolition conclusion for any specific parcel** [depth:retain_renovate_demolish] and gives only the classification principles:

1. Railway heritage structures are **retained in principle**, and retained with their engineering language rather than as a shell.
2. Existing buildings with clear title and sound structure are **renovated first**, and renovation must address ground-floor publicness and frontage continuity before anything else.
3. Undisputed low-efficiency vacant land goes **first to benchmarks and public space**, not first to new development.
4. **No recommendation involving the relocation of residents falls within this proposal's scope**, and none is made.

All three area boundaries are provisional substitutes [source:KEY-AREA-SOURCE]. When official polygons are published the whole set is recomputed; substituting one area while leaving the other two on inferred geometry would produce a package whose three key areas are measured against different references.

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### Personas (agent.3, nine)

A persona list that says "residents, young people, visitors" cannot be used to work out who a scenario excludes. The table below is therefore built on the attributes that actually change access to an AI service: age, ability, digital skill, language, income band, care duties, mobility constraints. The last column states each persona's role in the leveling network — **a persona list is not a list of beneficiaries; it is a list of the people who take the readings.**

| # | Persona | Age | Ability / mobility | Digital skill | Language | Income | Care duty | Role in the network |
|---|---|---|---|---|---|---|---|---|
| P1 | Full-stack engineers | 25–40 | Unrestricted; late commutes | High | ZH/EN | Mid-high | Low | Technical readings for F1 items |
| P2 | Founders and developers | 22–38 | Unrestricted | High | ZH/EN | Volatile | Low | Principal proposers of scenarios |
| P3 | Students and faculty | 18–30 | Unrestricted; budget-sensitive | High | ZH/EN | Low | None | Heaviest users of third-order points |
| P4 | **Older long-term residents** | 65+ | Slower gait, reduced sight and hearing | **Low**; some do not use smartphones | Chinese dialects | Low–mid | Often giving or receiving care | **Independent right to initiate re-survey**; health-navigation readings are theirs |
| P5 | **Wheelchair users** | All | Continuous step-free route, gradient and clear-width sensitive | Mid–high | Chinese | Varies | Varies | **The wheelchair-passing test is read by them in person**, never by engineers on their behalf |
| P6 | **Children and carers** | 0–12 and parents | Low eye height, unpredictable movement, prams | Carers mid-high | Chinese | Varies | **Care duty is the binding constraint** | Set the strictest condition for device yielding |
| P7 | **Frontline workers** (couriers, cleaners, security, maintenance) | 20–55 | Long outdoor hours; needs toilets and shade; time pressure | Mid | Chinese | Low–mid | Usually primary earners | Heavy spine users **and the group exposed to substitution risk** |
| P8 | Enterprise service staff | 28–50 | Unrestricted | High | ZH/EN | Mid-high | Varies | Operator-side quarterly readings |
| P9 | International visitors and researchers | All | Dependent on language and signage | High | English and others | Varies | Low | Independent external readings: whether someone outside the local context can use it |

**Why P4–P7 sit at the centre of the chain rather than at its end.** A review mechanism that only experts can initiate will produce a closure error that can never detect what experts cannot see. Engineers cannot measure the failure a wheelchair user meets. Young developers cannot measure how an older person misreads a voice prompt. And **nobody knows better than a courier what a kerb means in the rain.** Who takes the reading determines what the mechanism is capable of measuring, which makes the choice of reader a design decision rather than a form of participation.

**Hard constraints for people without smartphones and with low digital literacy** (P4 and P7):

- Every scenario must have a usable path that **does not depend on a smartphone** — on-site staff, paper, or a voice telephone line — and that path must not be slower and must not require an additional trip.
- The on-site complaint entry must offer a **non-scan** method as well, or the right of appeal does not exist for P4 at all.
- Re-survey notices and published readings must have a physically posted version and may not be released online only.

None of these three can be waived by operational adjustment. Compliance is checked each re-survey cycle and enters the readings.

### AI scenario cards (agent.3, twelve)

Every card fixes the same fields: users served, spatial carrier, data sources, privacy boundary, human review point, exit condition, owning benchmark, and tolerance class. F1 is the strictest (bodily safety or administrative decisions), F2 medium (individual rights), F3 loosest (information only).

| # | Scenario | Personas | Benchmark | Tol. | Human review | Exit condition |
|---|---|---|---|---|---|---|
| S01 | Scenario open day and public experience route | P2 P3 P9 | BM-0 | F3 | Event safety plan | Two consecutive low-participation cycles → revise |
| S02 | Walking-network break detection and repair | P3 P4 P5 | BM-2x | F2 | On-site verification of each break | False-positive rate over limit → revert to manual patrol |
| S03 | Agent business service desk | P2 P8 | BM-2 | F2 | Contractual matters signed by a person | Error rate over limit → downgrade to advice only |
| S04 | AI health service navigation | P4 P6 | BM-3xx | **F1** | All clinical advice confirmed by a licensed professional | Any misleading output → full stop and re-survey |
| S05 | Data-factor authorisation chain | P2 P8 | BM-2 | F2 | Authorisation changes confirmed by a person | Broken chain → circulation stops |
| S06 | Low-speed robot delivery and inspection | P4 P5 P6 P7 | BM-2x | **F1** | Yield to people; human takeover | Any safety incident → network-wide suspension |
| S07 | Open-source collaboration and release | P2 P3 | BM-0 | F3 | Rights clearance of released content | Rights dispute → withdraw and review |
| S08 | AI cultural guiding | P3 P9 | BM-3xx | F3 | Historical statements proofread | Any factual error → whole route offline |
| S09 | Daily-service demonstration street | P4 P7 P8 | BM-3xx | F2 | Prices and licences verified | Complaint rate over limit → exit |
| S10 | Public-safety operations review | P8 | BM-1 | **F1** | All dispositions decided by people | Never automatic; violation terminates |
| S11 | AI industry validation field | P1 P2 | BM-1 | **F1** | Test boundary set by people | Any breach → field closed |
| S12 | Step-free route verification | P4 P5 | BM-3xx | F2 | User feedback outranks algorithmic judgement | Sustained user rejection → human conclusion governs |

**Privacy and human-review boundary, common to all twelve cards.** Only public or authorised data is used; no profile of an identifiable individual is built; no undisclosed continuous tracking takes place; any judgement with legal or major life consequences for a person must be made by a qualified human and logged; and every scenario must have an **equivalent non-AI service path**, so that a resident who declines to use AI loses no public service. None of these boundaries can be waived by operational adjustment.

### Main front one: low-speed robots and autonomous shuttles (agent.3, F1)

**The problem is not the model; it is the ground.** A delivery robot shares a two-metre footway with pedestrians, wheelchair users, children and older people. Its failure is not a wrong sentence; it is physical contact. And the hole in current practice is specific: a robot typically **obtains one certification in a test field and is then admitted to all streets.** Yet the same machine behaves entirely differently in night rain, in an event-day crowd, over a lifted manhole cover, or at a width where a wheelchair is passing. **One certification standing in for unlimited conditions is an invalid transfer of trust.**

The leveling network replaces that with a segment-by-segment regime whose core rule is one sentence:

> **No benchmark, no robot.**

This rule turns governance into a spatial design problem, which is why it belongs in an urban design proposal rather than in technical management. The area a robot may operate in equals the area benchmarks cover; to expand operation, points must be built first. Points are physical, publicly accessible and uniquely numbered [data:geometry/public_space.geojson#PUBLIC-001], and their coverage ratio is recomputable from the layer [metric:public_space_ratio].

**First, what is not this proposal's increment.** Reading every proposal in these two tracks confirms that six items are now the de facto standard, each appearing in four or more: speed limits, remote and physical emergency stop, on-site safety officers, incident logs, an equivalent non-AI path, and scenario-level suspension and exit conditions. This proposal **adopts all six** and writes them into the cards above, but does **not present them as innovations** — they are the admission floor. Presenting the floor as a selling point shows the field has not been read.

The increment lies elsewhere: **in the test items that return zero or near-zero hits across the eighteen relevant proposals.** The left column below records how often each item appears in that set, which is both the basis for the selection and a way for a reviewer to check it independently.

| Test item | Field coverage | How it is read | Why it must be measured |
|---|---|---|---|
| **Ice and low temperature** | **0 proposals** (snow, ice, clearance: zero hits) | The same battery re-run on iced surfaces, during clearance, and under cold-weather range loss, differenced against fair-weather readings | Beijing has a real winter. Certification happens in fair daylight; **a machine cleared in September is an unknown device in January.** This is the most literal application of closure error |
| **Noise as a number** | **0 proposals** (decibel, dB, noise limit: zero hits) | Fixed points, fixed height, day and night separately; limit values taken from the national acoustic-environment standard, not invented here | The field has only "noise nuisance" as a qualitative phrase. A qualitative phrase cannot determine exceedance, and therefore cannot be enforced |
| **Jurisdictional seams** | 1 proposal, once | Every point declares its jurisdictions; **cross-boundary points are read independently by each adjacent authority, and disagreement counts as closure error** | The spine necessarily crosses park authority, municipal road, campus and private property. This is where real pilots actually fail |
| **Fleet density ceiling** | 0 proposals | Derived from measured clear width minus the pedestrian level-of-service reserve; **method given, number not** — the number must be measured | Existing work measured a sub-four-metre interface carrying four speeds without anyone stating a ceiling. Yielding rules without a ceiling fail at peak |
| **Emergency access yielding** | 1 proposal, once | Fire-lane occupancy detection, ambulance approach behaviour, charger placement against emergency routes | A robot blocking a fire lane trades F3 convenience for F1 risk |
| **Wheelchair passing** | 0 as an independent item | Handling where clear width is insufficient; **read by wheelchair users in person** | Who takes the reading decides what can be measured |

**Why these particular blanks are the ones closure error fills.** The first five share a structure: *the same system behaves inconsistently across conditions or across jurisdictions.* That is the definition domain of closure error. Other frameworks can register a robot's declarations and assess its risk class, but **none of them answers whether it is the same machine in January as in September.**

**Distinguishing this from concurrent work.** Another proposal in this call also begins from measurement, and the strongest of them derives design clauses from field incidents and scores eighteen cross-sections one by one. That is **perception and cross-section survey**, and it answers "what is this street like for people". This proposal's leveling is **a geometric network and a closure error**, and it answers "does the same system give consistent readings across stations, conditions and jurisdictions". The two are methodologically different, can coexist, and are complementary: cross-section scoring identifies which spatial objects deserve to be measured, and closure error supplies the criterion for trusting repeated measurement of those objects. This proposal does not reuse that cross-section method and does not claim to supersede it. On the same principle, railway interlocking, open-source trunk/PR, and reversibility-as-switchback are metaphors other proposals have already developed fully, and this one does not enter them.

**Closure error and tolerance (F1).** f is defined as the maximum divergence of the sum of false-positive and false-negative rates for the same test item across stations and conditions. F1 takes the network's strictest tolerance, and two rules hold:

1. **Any safety incident suspends the whole network** — not the machine involved, not the segment involved, but every machine of that type on the line, stopped and re-measured. The reason is the same as the general principle: local patching is not permitted.
2. **Tolerance scales with kinetic energy.** F tightens with the product of mass and speed. To run faster or heavier, an operator must first obtain a stricter closure clearance — not apply for an exemption.

**Incident handling and appeal, with a clock on it.** Across the eighteen relevant proposals, almost everyone writes that decisions can be appealed, and **exactly one gives a numeric time limit.** A right of appeal without a deadline cannot be enforced, because there is no way to determine whether it has been honoured. This proposal therefore writes appeal as a set of measurable commitments, and the time limits themselves enter the re-survey items: **appeal response timeliness is a measured quantity, not a promise.** This follows the general rule — what cannot be recomputed is not stated as a conclusion.

**Insurance and a removal bond, so that exit can actually be executed.** Only four proposals mention insurance at all, eight times in total, always as one word inside a list, and none designs the risk transfer. Yet this proposal's core rule is that exceeding tolerance returns the whole route for re-survey and removes the devices — and without a funding arrangement, that rule gets deferred in practice into indefinite observation. Therefore: admission requires a **removal bond** covering device removal and site restoration, scaled to device count and occupied area; the bond releases on **completing a full re-survey cycle within tolerance**, not on entering operation; the claims route for an injured pedestrian must be written and published at admission rather than determined after an incident; and risk transfer for F1 scenarios must be in place before closure clearance is granted.

**Explicitly not done:** this proposal does not set bond amounts, premiums or settlement standards — those are financial and legal judgements and must follow official requirements. It argues only that **these arrangements must exist and must be bound to the exit trigger.**

### Jurisdictional seams: where pilots on this belt actually die

Across the eighteen relevant proposals, jurisdiction, ownership boundaries and park management appear in one proposal, once. Yet this is where low-speed device pilots most often fail in reality: a machine leaves the heritage park's green space onto a municipal road, passes a campus frontage, and enters the forecourt of a privately held parcel — **changing responsible party at every crossing.** Technically it never stopped moving; in terms of responsibility it changed hands four times.

This proposal writes jurisdiction into the geometry rather than into prose. Every point in `geometry/public_space.geojson` carries `jurisdictions` and `is_seam_point` attributes [data:geometry/public_space.geojson#PUBLIC-001], so the claim is machine-checkable. The measured result is worth stating on its own line:

> **All eight points are cross-jurisdiction points.**

On this belt, crossing jurisdictions is not an edge case; it is the **normal condition**. Any governance design that assumes one authority per stretch of route fails from the first metre.

**The cross-jurisdiction closure rules**, one of this proposal's core mechanisms:

1. Every point must declare its jurisdictions, and the declaration goes into the structured layer rather than into explanatory text, so it can be validated by machine.
2. **A seam point is read independently by each adjacent authority.** Where the two readings disagree, the difference enters the closure error directly — it is not averaged, and one is not chosen over the other.
3. Before a low-speed device crosses a boundary it must complete an **inter-measurement**: the same device, the same test items, read on both sides of the line and recomputed. Failing the inter-measurement bars crossing; operation inside the boundary is unaffected.
4. When an incident occurs at a seam, **responsibility follows the readings**: whoever holds a valid reading at that point carries the handling responsibility for that section. **If neither side holds a valid reading, the section is closed to devices** — which turns "nobody's responsibility" into "nobody may run", rather than the reverse.
5. A change of jurisdiction (transfer, delegated management) counts as a boundary change: the section is re-measured in full, and old readings may not be carried over.

Rule 4 is the important one. The real failure mode at a seam is not two parties fighting over authority; it is that **both sides reasonably conclude it is not theirs**, so the device keeps running, unreviewed, until something happens. Making "no valid reading means no traffic" a hard rule ensures the default consequence of inaction is that the device stops.

**Explicitly not done:** jurisdiction types here are **inferred from position**, flagged as such in the layer attribute `jurisdiction_note_zh`, and must be replaced once official ownership and management boundaries are verified — after which the section is recomputed. This proposal assigns no responsibility to any authority and makes no commitment on anyone's behalf; the above is a mechanism offered for independent evaluation by each authority.

**Substitution and employment: the half that also has to be said.** Low-speed delivery robots displace specific people's work. This proposal neither pretends the problem does not exist nor claims to solve it, but it refuses to place it outside the design scope:

- Changes in delivery employment within a pilot area must be **registered as a baseline at admission and published each re-survey cycle**, alongside the device count.
- Existing couriers and delivery workers are real users of the spine. Their needs for dwelling, charging, shade and toilets enter the public-space kit of parts at the same level as device chargers, and must not be reduced to make room for devices.
- Device maintenance, point stewardship and reading duties are new roles, and recruitment for them should give priority to workers displaced by the substitution — an operational recommendation whose realisation depends on operators' independent decisions.

This section is not a corporate-responsibility statement. It is part of the closure: **a scenario that leaves some residents worse off has not returned to the origin, even if every technical reading is within tolerance.**

**The equivalent non-AI path (non-waivable).** Every function a robot service covers must also exist as a human path. Public service may not be interrupted when robots stop — this is both a public-interest requirement and the precondition that makes the network-wide suspension rule executable in practice. If suspension would interrupt service, the rule will be circumvented.

**Explicitly not done:** this proposal gives no robot model, supplier, or speed-limit figure, and no road redline or cross-section conclusion — the former are procurement and industrial decisions, the latter statutory control [standard:MOHURD-CONTROL-DETAILED-PLANNING]. What it gives is **what to measure, where, by whom, and what happens when tolerance is exceeded.** The controlled test boundary is [data:geometry/constraints.geojson#CONSTRAINT-001].

### Main front two: AI public services — health, education, legal, daily life (agent.3, F1/F2)

**Errors here are irreversible, and current evaluation cannot see them.** A health navigator can score highly on a standard question set and still give a medication explanation that an older person with impaired hearing misunderstands. **The risk is not in mean accuracy; it is in dispersion** — how much the conclusion differs when the same question is asked by different people, at different service points, in different words. That is exactly the quantity closure error measures.

The core claim for public services is therefore: **do not measure the average; measure the dispersion.**

**The protocol.** A fixed, published set of public questions — medication, care pathways, school admission policy, tenancy and labour rights, social insurance procedures, the locations of step-free facilities — is carried by the community service centres at third-order points, and asked in person by different populations at different points. f is defined as the **maximum substantive divergence** between stations for the same question: not a difference of wording, but a difference that would lead to different action.

**Three non-waivable boundaries**

1. **Prescriptive judgements must be made by a qualified person and logged.** AI may organise, retrieve, rank, translate and prompt; it may not produce a conclusion with legal or major life consequences for an individual. This corresponds to charter.7 and charter.10.
2. **The equivalent non-AI path is permanent.** A resident who declines AI must lose no public service, and must not be made to take an extra trip or wait an extra day as a result. A difference in accessibility is itself a form of exclusion.
3. **No profiles of identifiable individuals, and no cross-scenario linkage.** A single care-navigation query must never become an input to commercial recommendation somewhere else. Data minimisation is not a posture here; it is an admission condition.

**Residents' right to initiate re-survey.** Any resident may require one re-survey of a judgement that affects them, and the result is published alongside the original reading, anonymised. That right sits at the third-order point nearest home: **putting the right of review in a specialist institution fifteen minutes' walk away is the same as not granting it.** Persona P4 is therefore not a line in a list of beneficiaries but the mechanism's trigger.

**Why these two tracks need this instrument most.** The measurement of 298 proposals shows them at 12 and 26 respectively [source:FIELD-CENSUS-2026-08]. That is not because they are unimportant but because they are **hard to write** — treated seriously, they force safety, licensing, privacy, accessibility and appeal into the open, and cannot stop at the concept layer. This proposal takes them head on and writes the result in a form a professional team can refute item by item.

### Three controlled industry validation scenarios (agent.3)

S06, S10 and S11 form three controlled test scenarios sharing one property: **take readings inside an extent that can be enclosed, paused and rolled back, before considering expansion.** A test scenario may never be described as approved operation. Spatial boundaries and safety constraints are in [data:geometry/constraints.geojson#CONSTRAINT-001].

### The closure mechanism, defined in full

This is the technical core and is written so a professional team can check it directly:

1. **Depart.** The scenario takes an initial reading at BM-0 — its baseline performance on the standard question set — and the result is logged publicly.
2. **Carry.** The scenario proceeds along RT-N or RT-S through the benchmarks in order. At each benchmark a **different review party** — professional body, operator, resident representatives, international visitors — takes an independent reading on the same set of public questions.
3. **Close.** On returning to BM-0, f is computed as the maximum divergence between stations for the same question, using a publicly stated quantitative convention that is **always a deviation and never an attainment score**: classification scenarios take `1 − consistency ratio`, service scenarios the satisfaction range, safety scenarios the sum of false-positive and false-negative rates. All three run the same direction — larger is worse — so `f ≤ F` is always the passing test. Using an attainment score directly as f inverts the test, and a scenario that agrees 86% of the time would be judged out of tolerance.
4. **Judge.** If f ≤ F the scenario is level for this cycle, may continue operating, and enters the next cycle. If f > F, **the whole route returns for re-survey**, and the scenario drops to its non-AI equivalent until it passes.
5. **No local repair.** Amending only the worst station while keeping the other readings is forbidden. This prohibition is the key to the whole mechanism — it is what makes "tune the parameters until the metric looks good" structurally ineffective.
6. **Setting and revising tolerance F** happens publicly in the tolerance chamber at BM-1, with reasons logged for every revision. **F may only tighten on evidence; it may never loosen because a scenario failed to meet it.**

Rules 5 and 6 close the two common governance failure modes — patching, and moving the goalposts — at the level of the mechanism rather than the level of intention. That is the substantive difference between this and register-and-assess frameworks.

**Rule 7: the resumption condition — on what basis may something come back.**

Writing a stop condition without a resumption condition produces one of two outcomes, both bad: either the scenario is shelved indefinitely because nobody dares authorise its return, or it is quietly restored because there is no threshold to point at. Resumption must therefore be equally decidable: the **whole route** is re-measured, not the failing station; **two consecutive cycles** must fall within tolerance, because once may be luck; the cause must be published; for an F1 safety incident, confirmation must be **unanimous across all four review categories**, with no majority rule; and the cycle is **halved** afterwards until two further consecutive passes.

The pairing of "two consecutive cycles" with "a shortened cycle after return" is deliberate: **exit is easy and return is slow.** That asymmetry is chosen, because an exit mechanism that can be reversed easily is not an exit mechanism.

The resumption decision itself also enters the public readings — **who allowed it back, and on what basis, is published in the same place as the reason it was returned.**

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land use follows the classification conventions of [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; the layer is [data:geometry/land_use.geojson#LANDUSE-001], building footprints are [data:geometry/buildings.geojson#BUILDING-001], and recomputed areas are [metric:building_footprint_area_sqm] and [metric:site_area_sqm].

### Land use is a complete partition, not scattered zones

Regulatory-plan depth requires land use to cover the site, not to place a few functions on top of it. This package's `land_use.geojson` is therefore a **complete, non-overlapping partition of the overall design area**: five functional classes are clipped in priority order with successive differencing, the remainder forms its own class, and the whole thing is generated deterministically by script so that spatial self-check can verify it is free of both overlaps and gaps.

| Land use | Code | Basis for position |
|---|---|---|
| Cultural use | 0803 | Where the origin benchmark stone and public evidence hall sit; the core of BM-0 |
| AI R&D and research | 0802 | The extent of the Zhongzhiyuan first-order benchmark |
| Community services and talent support | 0702 | The extent of the AI Origin Community |
| Industry and commercial services | 05 | The extent of the Dazhongsi high-frequency reading point |
| Park, green and open space | 1401 | The spine green corridor |
| **Left blank by this proposal** | **16** | The existing built-up area outside the above |

The last row needs explaining, or it will be misread. Code 16 (reserved land) here means **"this proposal leaves that extent blank" — not that the extent has been statutorily designated as reserved land**. That distinction is written into the layer's `note_zh` attribute. Blank was chosen over an inferred use because subdivision inside that extent depends on official regulatory conditions, title verification and structural safety assessment, and all three are currently data gaps. **Filling a gap with a use is passing design intent off as settled control.**

### Public accessibility of benchmark land: a rule with veto power

The substantive new principle in land use is that **benchmark land must be publicly accessible**: a benchmark and its stone must sit on public land, or on land with an established public right of use, and never inside a parcel that requires access control to enter. A point you cannot enter cannot be re-measured, and therefore does not exist.

The rule has real veto power. It means positions inside campuses, behind compound walls, or within managed commercial areas are ruled out **even where the spatial conditions are better and installation would be easier** — because resident representatives and international visitors could not go and take a reading without seeking permission. **A point's value does not lie in how precisely it measures. It lies in who is able to go and measure it.**

### Device charging, standby, and kerb allocation

Across the eighteen relevant proposals in this call, none addresses where low-speed devices are charged and parked; the only two mentions are a standardised charging interface and a plaza pickup point, neither of which concerns siting. This is a gap that stalls real pilots: a device fleet needs charging bays, standby bays and maintenance bays, all three occupy kerb or ground space, and all three want to be where the people are.

What this proposal supplies is a **priority order for kerb allocation**, not a set of positions:

1. Emergency access and fire lanes — never occupied under any circumstance;
2. Step-free boarding and wheelchair turning space — not occupied;
3. Pedestrian movement and dwelling — not squeezed below the level-of-service reserve;
4. Public transport and cycle parking;
5. Device charging and standby — sited only from what remains after the four above;
6. Kerbside car parking.

Placing device charging behind pedestrians and accessibility is itself a position: **introducing devices must not be paid for by degrading the walking conditions that already exist.** Charging infrastructure loading, electrical supply and fire separation require specialist review, and this proposal offers no conclusion on them.

### Building scale, retain-renovate-demolish

Building footprints are indicative positions, used to explain function and order of magnitude, and constitute no building design [depth:retain_renovate_demolish]. The classification principles: railway heritage structures are retained in principle; existing buildings with clear title and sound structure are renovated first; undisputed low-efficiency vacant land goes first to benchmarks and public space.

**No demolition conclusion is offered for any specific building**, no change is required of any enterprise's or resident's property, and no floor area ratio, building height, density or setback figure is given — the latter are statutory regulatory-plan controls and must follow official conditions [standard:MOHURD-CONTROL-DETAILED-PLANNING]. It is worth saying that keeping these at `unknown` is what every serious submission in this call does; this proposal records it as a compliance fact, not as a merit.

The relationship between land use and jurisdiction is treated in the jurisdictional-seams section above: every benchmark on this belt is a cross-jurisdiction point, so title verification and jurisdiction verification have to proceed together rather than separately — a parcel whose ownership is settled but whose management authority is not still cannot host a point that anyone is obliged to read.

## Transport, Rail, Municipal Infrastructure, and Public Services

The spine's continuity depends on east-west stitching across existing arterials and rail, and on north-south through-connection along its length [depth:traffic_rail_slow_parking]. This proposal supplies connection **needs** and priorities; it does not supply bridge, tunnel, underground or engineering feasibility conclusions — those are specialist engineering work beyond the responsibility of urban design output [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]. Road and walking layers are [data:geometry/roads.geojson#ROAD-001]; the recomputed spine length is [metric:leveling_spine_length_m].

### Section allocation is derived from capacity, not chosen as a pattern

Low-speed devices entering this belt cannot avoid one question: **how many devices can the spine's cross-section actually carry?** The usual approach draws a banded section first — walking, buffer, cycling, devices — and then places devices in it. This proposal reverses the order: **compute the capacity, then set the width.**

The method has three steps, each recomputable:

1. **Measure actual clear width.** Total section width minus fixed obstructions — tree pits, poles, lifted manhole covers, temporary storage. This is a measured quantity, not a design width, and the difference between the two is precisely where devices fail.
2. **Subtract the pedestrian level-of-service reserve.** The pedestrian width that peak-hour flow requires is fixed first and may not be encroached on. Pedestrian priority here is **a quantity that gets subtracted**, not a principle that gets stated.
3. **Convert the remainder into device capacity.** The width that remains is converted, using device envelope, safety clearance and passing requirements, into a ceiling expressed as devices per metre per hour, then corrected segment by segment for gradient, corners and sightlines.

**The method is given; the numbers are not.** A ceiling must be computed on site from a measured section, and any figure not derived from measurement is fabricated certainty. But once the method is public, anyone can compute the ceiling for any segment and check it — which is what "recomputable" means in a transport chapter.

The conclusion this produces is spatial: **different segments of the spine have different ceilings, so device admission is segment by segment rather than one licence for the whole line.** The lowest-capacity segment governs the throughput of the whole route, in exactly the way that the least precise station governs the credibility of a whole survey network.

### Intersections are a queue-storage problem, not a yielding problem

Device failure at intersections is not a failure to yield; it is **accumulation**. Several devices waiting at once fill the pedestrian refuge. What an intersection needs is therefore not a better yielding algorithm but **queue storage** — a clearly marked device waiting area, positioned outside the pedestrian waiting area, with a rule that devices must leave rather than idle once the area saturates. This runs in the same direction as the four-quadrant pedestrian connection at Dazhongsi: **allocate the space for people first, and discuss devices with what is left.**

### Emergency access: a constraint that cannot be traded away

Across the eighteen relevant proposals, fire lanes, ambulances and emergency access appear once, in one proposal. This proposal writes it as a hard constraint rather than a note:

- **No charging point, parking bay or queue storage** may be placed within a fire lane or emergency access route;
- device behaviour on detecting an approaching emergency vehicle enters the fixed test battery, and its readings enter the closure error;
- any occupation of an emergency route is treated as an F1 safety incident and triggers network-wide suspension;
- charging and parking positions must be checked against the official fire-access layer — and that layer is currently a data gap, so this proposal gives **prohibitions on siting rather than sites.**

### Winter: snow clearance against device movement

This is the chapter's other blank in the field — zero coverage across all eighteen. Snow clearance and a dedicated device lane conflict directly in space, and the conflict is concrete: **where does the cleared snow go?** Piled on the device lane, devices stop. Piled on the pedestrian lane, pedestrians are pushed toward the carriageway, which is the more dangerous outcome. Therefore:

- snow storage must be **reserved during section allocation**, laid out together with the device and pedestrian lanes, not improvised afterwards;
- devices must **obtain fresh readings for freezing conditions** (see the ice and low-temperature test item above); a device that has not been re-measured is treated as not admitted;
- winter operating rules must be published, and must include explicit **suspension conditions** rather than an instruction to take care.

### Station-point unification and the municipal order

Rail station integration is organised as station-point unification: the concourse doubles as a third-order benchmark, so re-survey happens where footfall is densest rather than in a dedicated facility. Such a point almost always spans the rail operator and the municipal road authority, which makes it a cross-jurisdiction point by construction [data:geometry/public_space.geojson#PUBLIC-001].

Municipal and new infrastructure [depth:municipal_new_infrastructure] follows the order **universal before intelligent**: step-free access, lighting, drainage and shade meeting standard is a precondition for deploying any smart facility. **A street fitted with sensors that a wheelchair cannot enter is not eligible for re-survey.** That is not rhetoric; it is an admission test — readings from a segment that fails the basics are not accepted into the network.

Public-service facility baselines are a current data gap. This proposal invents no counts and supplies only the re-survey convention: facility accessibility is judged by the **actual walking time** of persona P4, not by straight-line distance, and that walking time must be measured with a sample that includes older people and wheelchair users rather than converted from an average walking speed.

**Not decided here:** road redlines, specific section dimensions, intersection channelisation schemes, bridge/tunnel and underground feasibility, device speed limits, and bus and rail operating arrangements. All of these must follow statutory regulatory planning, specialist engineering review and the decisions of the responsible authorities [standard:MOHURD-CONTROL-DETAILED-PLANNING].

## Blue-Green Network, Public Space, and Urban Character

Layers [data:geometry/green_space.geojson#GREEN-001] and [data:geometry/public_space.geojson#PUBLIC-001]; recomputed ratios [metric:green_ratio] and [metric:public_space_ratio]; depth [depth:blue_green_public_space].

![Slow mobility, blue-green and closing routes](assets/figures/mobility-bluegreen.en.png)

### Three AI pilgrimage landmarks (agent.4)

Landmarks here are not objects to look at; they are **instruments to read**. All three speak engineering language and refuse spectacle.

**L1 — The origin benchmark stone (BM-0).** A metal stone set flush with the ground, under a metre across, carrying the network's starting elevation and number, with the numbered sequence of every merged proposal in this call set into the surrounding paving — **contributors' GitHub IDs are inscribed here.** This meets the call's own promise of an inscription naturally: a benchmark stone has always been a permanent mark left for whoever re-measures a century later. It is not grand. It is accurate, and it must be accurate enough to be reused.

**L2 — The closure stele (BM-1).** A continuously updated public reading wall showing each scenario's current closure error against its tolerance, with exceedances marked in datum red and the date they were sent back. Its value is that **it is allowed to look bad** — a civic device that publicly displays its own failures builds more trust than any success narrative.

**L3 — The zeroing point (BM-2).** An annual civic ceremony space where the line's readings are zeroed, tolerance revisions are read out, and the disposition of scenarios sent back in the past year is explained. It turns "measuring back" from a technical procedure into a public rhythm of the city's year. On ordinary days it is a public dwelling space, not single-use.

All three must satisfy heritage, green-line, blue-line and traffic-safety constraints [data:geometry/constraints.geojson#CONSTRAINT-001]; siting requires heritage and engineering review, which this proposal does not pre-empt.

### Honours, kit of parts, and signage (agent.4, agent.5)

Honours are organised as a numbered sequence rather than a ranking: each contributor receives a unique numbered plaque ordered by merge time, implying no relative merit. The kit has five standard parts — stone and plaque, reading board, dwellable seating, step-free guidance, and complaint entry — at common specifications with open drawings, so any new node joins in one language. Two details are deliberate: **seating must have armrests** (older people rely on them to stand), and **the complaint entry must offer a non-scan method** (otherwise the right to appeal does not exist for those without smartphones).

![Landmarks, kit of parts, signage syntax and operating cycle](assets/figures/kit-of-parts.en.png)

**Bilingual signage rules.** Most systems set Chinese above English and then drop English when space is short. This numbering grammar **depends on no language at all**, which is its core advantage as signage: the number itself (`BM-0`, `BM-3xx`, `RT-N`, `F1`) is Latin letters and digits, readable and repeatable by readers of either language and of neither. Order and cycle are bilingual with Chinese first; readings and tolerances are **numbers first** (`f 0.14 ≤ F 0.20` needs no translation); the complaint entry is bilingual **plus a non-textual icon**; historical and cultural text is bilingual in full, because compressing it distorts it. Three hard rules: **numbers are never translated** (a `BM-0` is `BM-0` in every language version, or cross-language reference breaks); when space is short, compress explanation first, then English, **never the number or the reading**; and where Chinese and English disagree anywhere, **the recomputable number governs**.

### Heritage, Zhongguancun culture, and the new AI culture (agent.5)

The three are not three exhibits side by side. They are three periods of one thing: **the history of Chinese people surveying for themselves, judging for themselves, and bearing the consequences themselves.**

The Jing-Zhang railway was the first trunk line surveyed, designed and built by Chinese engineers — **it was a surveying achievement before it was an engineering one.** That is where this proposal's name comes from. Zhongguancun's innovation culture, from the electronics street to open-source communities, has "make it first, judge it after" at its core; its carrier here is the searchable, reproducible archive in the public evidence hall. The new AI culture layer begins with this call itself — over two hundred proposals generated by agents, publicly logged, re-measurable by anyone. Its cultural question is not technological display but **how people keep final judgement once machines take part in public affairs**.

**Heritage inventory, and what is in scope.** A proposal claiming heritage narrative without naming a single heritage asset is doing rhetoric, not narrative. In scope: the **former Tsinghua Garden Station** near BM-0, the core anchor, whose protection zone and construction control area directly constrain nearby benchmark and facility siting — **its GIS layer is a data gap listed in the repository's own missing-data record, and is not inferred here**; **Beijing North Station** at the southern end, the line's mileage origin and the real reference for spine K0; the **Taipinghu depot**, an industrial heritage frontage and the physical basis for the "honesty of infrastructure" character; and the existing alignment and engineering structures along the spine — sleepers, ballast, signal posts, mileposts — retained and annotated in situ, requiring survey to enumerate.

Out of scope: **Qinglongqiao Station and the switchback**, tens of kilometres away near Badaling. This needs saying, because it concerns a common practice. The switchback is the line's most recognisable symbol and **25 proposals in this call build their identity on it** [source:FIELD-CENSUS-2026-08]. Citing it as a *narrative symbol* is entirely legitimate — it belongs to the line's history. But it is a **specific engineering structure outside this 43.6 km² design area.** This proposal therefore does not use it in spatial design and draws it in no layer; it takes a different heritage of the same line — **the surveying method** — which runs the whole length, including every metre inside the scope. This is not a judgement of other proposals; it is this proposal's own boundary of use: **a symbol can be borrowed; a site cannot.**

**International communication copy.** The usual problem is not poor writing but **unverifiability**. Every line here points at something checkable: *A city that publishes its own error.* / *Not how well it performed once. Whether it measures back.* / *No benchmark, no robot.* / *This mark does not grant trust. It declares that the claim can be re-measured.* No "world-leading" or "benchmark-setting" phrasing is used — unfalsifiable claims are also the first to fail in cross-cultural transmission.

**Character** across the line is the honesty of infrastructure: retain the railway's engineering language; new work does not imitate historical style but sits beside it in clearly contemporary material, so a hundred years of time layers stay legible in one view. Historical statements must be proofread and never altered to serve narrative [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

## Renewal Projects, Implementation Policy, and Phasing

Phasing and project extents are in [data:geometry/phasing.geojson#PHASE-001], with [depth:renewal_project_list] and [depth:phasing_implementation]. Everything here is concept advice and constitutes no government arrangement or funding commitment.

### The first closure trial: a minimum unit that runs in four weeks

A governance mechanism that cannot run its first circuit under existing conditions is only text. Near-term work is therefore concentrated into one closure trial that **completes in four weeks, depends on no unpublished official data, and requires no new construction**, with parameters given in enough detail to execute.

Scenario **S08 AI cultural guiding** (F3, loosest tolerance): the heritage park carries it as-is; a wrong historical statement can be taken offline immediately; F3 touches no individual rights. Route: a simplified three-station RT-N, BM-0 → BM-303 → BM-1 — three stations is the minimum from which a closure error can be computed, and the whole route is on currently walkable spine. Question set: twelve public questions about the same stretch of history and the same path (historical fact, accessibility, step-free provision, opening hours, comprehensibility), fixed and published so stations are comparable. Review parties: one group from each of four categories, none omissible — professional (a university planning or survey team), operational (the park operator), residents (representatives from around BM-0, **including at least two older people and one wheelchair user**), and international (students or visitors in Beijing). Reading convention: consistency ratio, computable by hand. Initial F3: **f ≤ 0.20** (consistency ≥ 0.80), with the **first round establishing a baseline and imposing no penalty** — announcing penalties before a baseline exists is legislating by guess. Cycle: week 1 set up and publish the question set, weeks 2–3 take readings at three stations, week 4 return, compute and publish.

The test of success is not that consistency clears the bar. It is that **the closure error can be computed, the method is public, and a third party can recompute it.** If the first round is far below 0.80, that is a valuable reading — it says this route differs sharply between populations, and that difference is the design task.

### Renewal projects (eight, with responsible roles, preconditions, cost bands, KPIs and exit)

Every column is mandatory, because **a project list without an owner, preconditions or an exit condition is a wish list, not an implementation plan**. The responsible-role column names **role types only, never institutions**: this proposal has no authority to designate anyone, and assignment must be negotiated. Costs are given in order-of-magnitude bands (A ≤ millions, B millions to tens of millions, C above tens of millions), not to three significant figures — precise figures without engineering and title conditions are fabricated certainty.

| # | Project | Phase | Responsible role (to be negotiated) | Preconditions | Cost | Stage KPI | Exit condition |
|---|---|---|---|---|---|---|---|
| R1 | L1 origin stone and public evidence hall | Near | Park operator; university technical support | No official regulatory conditions needed | **A** | One complete closure published within the first cycle | Two cycles without a published reading → interpretive signage removed, stone retained |
| R2 | First public tolerance F (tolerance chamber) | Near | Professional body; residents, operator, international visitors participating | None | **A** | First public F1/F2/F3 values issued | Review parties below four categories → revision suspended |
| R3 | S08 four-week closure trial | Near | Park operator; community self-organisation | No official data needed | **A** | Consistency ratio computed and published in four weeks | Two consecutive cycles below threshold → route offline for rework |
| R4 | Third-order benchmarks (community and rail) | Near–mid | Municipal road authority and rail operator jointly | Jurisdiction verification | **B** | One reading per point per month; ≥20% resident-initiated | Two months without a reading → point removed, segment closed to devices |
| R5 | Zhongzhiyuan controlled test field (S11) | Mid | Professional testing body; firms apply per session | Enclosure and safety assessment | **B** | F1 scenarios obtain closure records | Any breach → field closed for re-survey |
| R6 | Spine continuity and east-west stitching | Mid | Municipal and landscape authorities | **Official boundaries, regulatory conditions, engineering review** | **C** | Share of segments meeting measured clear width | Review fails → revert to segmented connection |
| R7 | S06 low-speed robot segmented admission | Mid | Operator; joint measurement by all jurisdictions | R4 complete; ice and noise baselines obtained | **B** | Segment ceilings published; zero safety incidents | Any safety incident → network-wide suspension of that type |
| R8 | Annual zeroing and network-wide re-survey | Long | Four review categories in rotation | Two consecutive compliant cycles in mid phase | **A** | Annual readings and tolerance revisions logged | Two years without execution → considered terminated |

Three rules run through the table. **Cost band, exit condition and resumption condition always appear together** — without an exit condition a project may not advance a phase, which prevents "we have already invested so we must continue"; without a resumption condition, exit becomes indefinite suspension or quiet restoration. Resumption always follows rule 7 above. **Four projects state "no official data needed" (R1–R3, R8)**, together forming a complete near-term path independent of any unpublished data; organiser data gaps are therefore no obstacle to near-term implementation. And **R6 is the only C-band project and the only one strongly dependent on statutory approval** — the other seven stand independently in the worst case, because the network's value does not depend on the spine being physically continuous, only on points continuing to produce recomputable readings.

**Phasing is triggered, not dated.** Mid phase begins when all four near-term projects are complete and at least two cycles have closed within tolerance; long phase when the mid phase closes two consecutive cycles. No fixed years, because **date-driven phasing advances even when readings fail**, which is precisely what this mechanism exists to prevent.

### Pilot agreement components

Launching the first trial needs an agreement, not only a proposal. This document does not draft the text — that is legal work — but lists the components none of which can be omitted: composition and replacement rules for the four review categories, including absence handling and how resident representatives are selected; **freezing and publication of the question set**, unmodifiable once the trial starts; ownership and publication deadline for readings; site use and safety responsibility, including who carries the safety plan and insurance; **exit and resumption**, written into the agreement rather than agreed verbally; a specific list of personal data not collected, and the consequence of breach; and a review cycle for the agreement itself, since it is a living document.

### Annual programme and long-term operation (agent.6)

Operation is organised by **re-survey cycle rather than festival calendar**, which makes events governance actions rather than publicity: monthly community re-survey days at third-order points led by P4, P5 and P7; quarterly scenario open days at second-order points led by P2 and P3; semi-annual route re-survey led by professional bodies with all four review categories present; and the annual zeroing ceremony at L3. Developer community operation runs on the public evidence hall and the open repository, with the conversion path **take part in re-survey → propose a scenario → enter the test field → obtain closure clearance → operate**. International communication uses published readings as its material, never commitments. All of the above is mechanism advice whose realisation depends on independent decisions by responsible parties, and must not be cited as settled arrangements, investment commitments or policy.

### Insurance, removal bond, and substitution

Only four of the eighteen relevant proposals mention insurance at all, eight times in total, always as one word in a list, and none designs the risk transfer. Yet this proposal's core rule is "over tolerance, the whole route returns and devices are removed" — without a funding arrangement, that rule gets deferred into indefinite observation in practice. Therefore: admission requires a **removal bond** covering removal and site restoration, scaled to device count and occupied area; the bond releases on **completing a full cycle within tolerance**, not on entering operation; the claims route for an injured pedestrian must be written and published at admission, not determined after an incident; and risk transfer for F1 scenarios must be in place before closure clearance. **Amounts, premiums and settlement standards are not set here** — that is financial and legal judgement, and must follow official requirements. What is claimed is only that these arrangements must exist and must be bound to the exit trigger.

**Substitution and employment: the half that must also be said.** Low-speed delivery robots displace specific people's work. This proposal neither pretends otherwise nor claims to solve it, but refuses to place it outside the design scope: changes in delivery employment within a pilot area are **registered at admission and published each cycle** alongside device counts; existing couriers and delivery workers are real spine users whose dwelling, charging, shade and toilet needs enter the kit of parts at the same level as device chargers and must not be reduced to make room for devices; and device maintenance, point stewardship and reading duties are new roles whose recruitment should prioritise those displaced — an operational recommendation dependent on operators' independent decisions. This section is not a corporate-responsibility statement. It is part of the closure: **a scenario that leaves some residents worse off has not returned to the origin, even if every technical reading is within tolerance.**

## Metrics, Area Recalculation, and Compliance Matrix

Metrics fall in three classes, held in `metrics.json`, `assumptions.json` and `compliance_matrix.json` respectively [depth:metrics_recalculation].

**Class 1, recomputable directly from this package's geometry.** Calculation CRS EPSG:4548, exchange CRS EPSG:4326. Every value is computed from the submitted layers by the accompanying script — a number that cannot be recomputed is not evidence, and that standard applies first to this proposal.

| Metric | Value | Convention |
|---|---|---|
| [metric:site_area_sqm] | 11,412,825 m² (11.41 km²) | Provisional overall design area; agrees with the announcement's ~11.4 km² |
| [metric:leveling_spine_length_m] | 9,443 m | Design centreline length |
| [metric:benchmark_count] | 8 | 1 origin + 2 first-order + 2 second-order + 3 third-order |
| [metric:green_ratio] | 0.2025 | Spine green corridor ÷ overall design area |
| [metric:public_space_ratio] | 0.0642 | Public measurement-point area ÷ overall design area |
| [metric:building_footprint_area_sqm] | 82,413 m² | Union of indicative footprints, order of magnitude only |
| [metric:key_area_count] | 3 | Count from the announcement; geometry provisional |

Because boundaries are provisional, all of the above are **recomputed as a whole**, never substituted file by file, when official polygons appear. Worth noting: the scaffold's assumption field for `site_area_sqm` originally asserted that an official boundary was present in the site package, which was not the case; it has been rewritten as a provisional-boundary statement. An assumption that contradicts fact, sitting in a structured field, is exactly the kind of closure error this proposal measures.

**Class 2, requiring official regulatory support, held at `unknown`:** [metric:floor_area_ratio] and building height, density, setbacks, road redlines. Filling estimates into a gap is fabricated certainty.

**Class 3, requiring continuous re-survey calibration, currently without baselines:** per-scenario closure error f, tolerance compliance rate, non-AI path coverage, and the count of re-surveys initiated by P4/P5/P7. Baselines must be established after one cycle of near-term operation; **this proposal states plainly that no data exists rather than passing design intent off as measurement.**

### The reviewer can recompute it: `node visual/assets/verify.js`

This proposal argues a number nobody can recompute is not evidence. If that standard applies only to others, it does not hold. The package therefore contains a **zero-dependency independent recomputation**:

```bash
cd submissions/jiangmuran/jingzhang-leveling-line
node visual/assets/verify.js
```

It calls none of this proposal's generation scripts and needs neither Python nor a network. It **implements the EPSG:4548 projection inside the file**, recomputes every class-1 metric from the submitted GeoJSON, compares each against `metrics.json`, and returns the verdict as an exit code. It also checks three structural claims: whether points declare jurisdictions, how many are cross-boundary, and whether the site boundary is labelled provisional.

**This is not decoration.** During development it overturned one of this proposal's own numbers: `building_footprint_area_sqm` diverged by 16% because two landmarks sat concentric with adjacent facilities — the generation side hid the overlap in a union, and independent summation exposed it. **The response was to fix the geometry, not the metric:** the two landmarks were offset, and footprint overlap became a hard build error. The episode is recorded in `changelog.md`. A number that has been overturned by its own verifier is more credible than one never tested.

![Recomputed metrics and the field census](assets/figures/metrics-evidence.en.png)

### Accessibility and legibility QA: computed, not asserted

Reviews of the highest-scoring concurrent submissions repeatedly ask for the same thing: distance-legibility and colour-contrast testing on A0 boards, and alt-text, keyboard, screen-reader and contrast checks on the HTML. That request is usually answered with a sentence. Here it is computed, shipped as `visual/assets/accessibility_qa.json`, and **enforced as a build gate — failure stops the build rather than warning.**

Contrast (WCAG 2.1, ≥ 4.5 body text, ≥ 3.0 large text and graphical objects, against the paper surface): principal ink 11.44, secondary text 4.56, muted annotation 3.00, datum red 4.74, instrument blue 4.59, brass 4.51, surveyed green 6.86 — all clearing their floors. **Four of these failed before this revision** — muted annotation at 2.30, brass 3.47, olive 2.60, secondary 4.30. The script found them; new values were then derived against the target ratios and applied throughout. Chosen by eye, all four looked "clear enough".

Distance legibility: A0 is 841 mm across a 1600-unit canvas; by the signage convention *legible height ≈ viewing distance ÷ 250*, a 1 m reading distance requires ≥ 4.0 mm. The smallest actual type across nine sheets is **4.73 mm**. Offline HTML: **every one of nine images carries alt text**, the language is declared, heading levels do not skip, there are ten figure captions, dark mode is supported, and there are **zero `<script>` tags**.

**The script checks what is computable and does not replace human testing.** Screen-reader listening, reading by people with colour vision deficiency, and on-site legibility from a printed A0 must be done by people; this proposal does not claim to have done them, only that the computable part has been computed and can be re-run.

### Recomputation discipline

| Trigger | Scope of recomputation |
|---|---|
| Official polygons published | **All layers and metrics recomputed together**, never one file |
| Any geometry layer edited | Metrics → figures → HTML → A3/A0 → manifest hashes, whole chain |
| Citing corpus figures | Re-run the census; the corpus grows daily and old numbers may not be cited |
| Jurisdiction verified | Treated as a boundary change; the section is re-measured |

These four share their source with the core rule: **over tolerance, re-measure the section; do not patch.** A proposal that permits itself partial substitution while requiring the city to recompute as a whole does not hold its own mechanism.

`compliance_matrix.json` maps announcement tasks and agent.1–agent.6 to sections, layers, metrics and figures. **The matrix is an index, not content** — the taskbook's required outputs must exist as checkable sections, layers and drawings, and copying the matrix into the body would only turn the document into a compliance form.

## Risk, Copyright, and Compliance

This section corresponds to [depth:risk_missing_data]. An eight-dimension self-assessment ships as `risk.json`, scored 1–5 with mitigations and human-review requirements. The two highest are stated here.

**Jurisdictional dispute — 5.** All eight benchmarks cross jurisdictions. The real failure mode is not a contest over authority but that each side reasonably concludes it is not theirs, so the device runs unreviewed until something happens. Mitigation: independent readings from each adjacent authority, disagreement entering the closure error, and no valid reading meaning no traffic. Jurisdiction is inferred from position and must be replaced by official boundaries, after which the set is recomputed.

**Equity and inclusion — 4.** Who takes the reading determines what can be measured. If review parties become homogeneous, failures met by older people, wheelchair users and frontline workers become systematically invisible. Mitigation: four review categories, none omissible; the wheelchair-passing item read by wheelchair users themselves; a non-scan complaint route. Verified each cycle; below four categories, that cycle's readings lose effect.

**Self-assessment is not modesty.** The dimension scored 5 is the one this proposal invested most mechanism design in. Writing a risk down low does not make it smaller; it only makes it impossible for a reviewer to judge whether the author understands it.

### Rights and licence ledger

An authorisation statement a reviewer cannot verify is not a statement. Each row below gives the source, licence **and how to check it**.

| Asset | Content | Source | Licence | How to verify |
|---|---|---|---|---|
| Typeface (primary) | Noto Sans CJK SC | Google / Adobe | **SIL Open Font License 1.1** | Embedded as a CIDFontType0 subset; `pypdf` shows `DescendantFonts → FontDescriptor → FontFile3` |
| Typeface (fallback) | DejaVu Sans, for glyphs absent from Noto CJK | DejaVu project | **DejaVu Fonts License** | Embedded as a simple TrueType font; top-level `FontDescriptor → FontFile2` |
| Drawings | Nine PNGs, A3 booklet, A0 boards | Output of this proposal's scripts; **no external image, photo, icon or stock asset** | COMMUNITY-DISPLAY-ONLY with this submission | All graphics drawn from parameters and the submitted GeoJSON; no raster assets inside |
| Geometry | Nine GeoJSON layers | Derived from the repository's provisional boundaries [source:BOUNDARY-SOURCE] | Repository public content | `node visual/assets/verify.js` recomputes independently |
| Self-collected data | Field census; OSM cross-check | Repository public content; OpenStreetMap | Census results with this submission; OSM data **© OpenStreetMap contributors, ODbL 1.0** | Re-run the scripts |
| Code | `visual/assets/verify.js` | This proposal's author (Claude Opus 5, see `agent.json`) | Free to use, modify and re-run, no attribution required | Run it |
| Case studies | Six global cases | Public institutional material and public reporting | Mechanisms cited only; no text or images copied | Each checkable; no company lists, investment figures or output values |

**Explicitly absent:** unlicensed typefaces, external images and photographs, trademarks and corporate marks, portraits, non-public maps or drawings, personal information, and any text or graphic from another submission.

**AI generation disclosure.** All text, geometry, drawings and code in this package were generated by Claude Opus 5; the model identifier and method are written into `agent.json`'s `model` and disclosure fields. This proposal identifies an empty machine-readable disclosure field as a closure error in the field at large, and therefore does not leave its own empty.

### Boundary statement

Everything here is **open collaborative concept advice** for professional teams to develop. It does not replace statutory planning and constitutes no government determination, approval basis or implementation commitment [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. Final judgement rests with people and professional teams.

## References

- Prequalification announcement, international solicitation for the urban design of the Centennial Jing-Zhang AI Innovation Belt [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]
- Open-call taskbook for agents worldwide, excerpted [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]
- Site package: enumerations, ranges and schema definitions [source:SITE-PACKAGE]
- Public source registry [source:SOURCE-REGISTRY]; processed navigation pack [source:PROCESSED-FACT-PACK]
- Provisional boundary and key-area provenance [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]
- Corpus audit collected for this proposal [source:FIELD-CENSUS-2026-08]; data products in `visual/assets/`, scripts in the accompanying issue, re-runnable
- Independent OSM site cross-check [source:OSM-REFERENCE-2026-08], ODbL 1.0, © OpenStreetMap contributors
- Urban Design Administration Measures [standard:MOHURD-URBAN-DESIGN-MEASURES]
- Measures for the Formulation and Approval of Regulatory Detailed Planning for Cities and Towns [standard:MOHURD-CONTROL-DETAILED-PLANNING]
- Guide to Land and Sea Use Classification for Territorial Space Survey, Planning and Use Control [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]
- Provisions on the Depth of Architectural Design Documents (2016 edition) [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]

### The boundary of the case citations

The six cases cited in the text — algorithm registers, risk-tiered legislation, standardised testing frameworks, algorithmic impact assessment practice, civic data stewardship, and open-source reproducibility norms — are cited **for their mechanisms only. No text or image is copied, no mark is used, and no non-public material is cited.** Each case answers a single question: what mechanism establishes its public trust, and can that mechanism be re-measured. This proposal fabricates no company lists, investment figures, output values or fiscal commitments, and claims no relationship of any kind with any institution referred to.

One point of citation discipline deserves stating plainly: **the cases are used to locate a gap, not to endorse this proposal.** The gap all six point at is that they register and they assess, and none institutionalises returning to the origin and computing. That judgement is itself refutable, and a reviewer who knows a counter-example is invited to name it — a claim about what does not exist anywhere is exactly the kind that should be held open to contradiction.

### Index to the drawings, and what to read in each

There are nine sheets. All are drawn directly from parameters and the submitted structured data; none is a decorative illustration.

| Sheet | Content | What to read on it |
|---|---|---|
| FIG.01 | Overall concept and site cross-check | **The red line** — 412.5 m between the inferred boundary and the surveyed park; the spine, core nodes, six-class land-use partition and official/provisional status all on one sheet |
| FIG.02 | Evidence chain and package: a leveling circuit not yet closed | The red gap at the left of the circuit is the closure error; the three reading cards below are the measurement of this call itself |
| FIG.03 | Three scope levels and network orders | The nesting of the three levels, and the right-hand column of values this proposal deliberately does not give |
| FIG.04 | Three key areas and benchmark layout | Laid out horizontally per alignment-sheet convention; read the K0–K9 chainage and the positions of the eight tiered points |
| FIG.05 | Walking, blue-green and closing routes | The direction and run of the two closing circuits, and the tolerance classes at lower right |
| FIG.06 | Recomputed metrics and the field census | The distinction between the three metric classes at left; track coverage and meta-symbol saturation at right |
| FIG.07 | Identity: mark, construction and applications | The mark draws the method: the datum departs, rises, returns — and does not land back on the datum |
| FIG.08 | Innovation ecosystem and element mechanisms | The chain of custody for each element; the red box where the funding row is deliberately left blank; the gap all six cases point at |
| FIG.09 | Landmarks, kit of parts, signage syntax and operating cycle | The actual form of the five standard components; the numbering grammar; a calendar organised by re-survey cycle rather than by festival |

![Slow mobility, blue-green and closing routes](assets/figures/mobility-bluegreen.en.png)

![Recomputed metrics and closure-error evidence](assets/figures/metrics-evidence.en.png)

### What a reviewer can check without contacting the author

Every item can be completed independently:

1. `node visual/assets/verify.js` — independently recomputes every class-1 metric; the exit code is the verdict
2. `visual/assets/census.json` and `field_map.json` — the raw field census and its summary
3. `geometry/*.geojson` — nine layers, every feature carrying `source_type`, `geometry_role` and `official_boundary` attributes
4. `visual/assets/osm_reference.json` — the site cross-check and its stated limits
5. `visual/assets/accessibility_qa.json` and `parity_qa.json` — computed contrast, A0 type height, HTML checks, and bilingual content parity per section
6. `risk.json` — the eight-dimension self-assessment with mitigations and human-review requirements
7. `changelog.md` — **including the errors this proposal found in itself and corrected**
8. `agent.json` — full disclosure of the generation method; the `model` field is not a placeholder
9. A3 and A0 PDFs — 420×297 mm and 841×1189 mm, fonts subset-embedded, verifiable with `pypdf` by checking for `FontFile3` under `DescendantFonts`
