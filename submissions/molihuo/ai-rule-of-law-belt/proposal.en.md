---
title: "Zhi-Li Belt, Rule-of-Law Jing-Zhang: Urban Design Proposal for the Centennial Jing-Zhang AI Innovation Belt as the First City of AI Rule-of-Law Endeavor"
author_github: "molihuo"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "For the 43.6 km² Centennial Jing-Zhang AI Innovation Belt, this proposal takes the «First City of AI Rule-of-Law Endeavor» as its first-tier positioning and signature concept, and puts forward the «Source / Test / Market / Forum» (法源·法测·法市·法坛) four-space typology, the «AI Rule-of-Law Endeavor Five-Dimensional Loop» methodology, the «Rule-of-Law Endeavor Index (ROL-AI Index)» measurement, and the «Rule-of-Law Endeavor Community» operating vehicle, forming a reviewable urban design package covering all agent.1-6 tasks."
tracks: ["ai-public-services", "civic-agent-governance", "ai-origin-community"]
iteration: "v0.1"
---

# Zhi-Li Belt, Rule-of-Law Jing-Zhang: Urban Design Proposal for the Centennial Jing-Zhang AI Innovation Belt as the First City of AI Rule-of-Law Endeavor

## Design Basis and Source Inventory

This proposal takes the "Notice of Pre-qualification for the International Open Call of the Centennial Jing-Zhang AI Innovation Belt Urban Design" issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources as the top-level task basis [source:SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT], and uses the machine-readable foundation of provisional boundaries, enums, metrics and professional standards maintained in `brief/site-package/` [source:SRC-SITE-PACKAGE-2026]. Before generation the contributor must read `design_brief.json`, `allowed_design_space.json`, `agent_taskbook.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json` and `data/processed/agent_fact_pack.md`, and use `project_scope_summary.csv`, `source_use_matrix.csv` and `missing_data_checklist.csv` to build the task, scope, source-usage and gap lists [source:SRC-PROCESSED-FACT-PACK-2026]. The site package at submission time does not contain an official polygon, official redline, official regulatory planning or ownership file — this is a disclosed data gap and does not block content scoring, but means every spatial conclusion must be expressed as "concept suggestion / reference scheme / available for professional deepening" [source:SRC-PROVISIONAL-BOUNDARIES-2026] [depth:risk_missing_data].

Across the six tasks (agent.1-6), this proposal takes "**the First City of AI Rule-of-Law Endeavor**" as its first-tier positioning and signature concept. The wording emphasises that AI rule-of-law is not scattered policy clauses or compliance actions, but a **long-term endeavour** that uses law to shape the order of the AI era for the common good, requiring coordinated construction of spatial carriers, institutional tools, talent teams and public discourse [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. "First City" means this proposal carries the endeavour at full-city scale, building a globally **pioneering, model-setting, enduring** urban interface for AI rule-of-law endeavour. The proposal accordingly raises five groups of original concepts: the «Source / Test / Market / Forum» (法源·法测·法市·法坛) four-space typology, the «AI Rule-of-Law Endeavor Five-Dimensional Loop» methodology, the «Rule-of-Law Endeavor Index (ROL-AI Index)» metric, the «Rule-of-Law Endeavor Community» operating vehicle and the «Three Landmarks of the Rule-of-Law Endeavor». The cited Chinese laws and initiatives (Data Security Law, PIPL, Interim Measures for Generative AI Services, Global AI Governance Initiative, etc.) are public legal background only and are not interpreted as local implementation conclusions [depth:risk_missing_data].

![Source evidence chain and overall concept map](assets/figures/site-overview.png)

## Three-Tier Scope Framework

The proposal organises work along the three tiers defined in the official Notice [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]:

- **Coordinated Research Scope 43.6 km²**: bounded by the North Fifth Ring to the north, the Jingzang Expressway to the east, Xizhimen Outer Street to the south, and Wanquanhe Road to the west (text-based bounds from the official Notice; the provisional package does not provide a corresponding polygon). This tier concerns the AI innovation ecosystem, global rule-of-law discourse, and future urban form; no new pseudo-precise redlines are introduced [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].
- **Overall Design Scope 11.4 km²** (EPSG:4548 recomputation 11.4128 km², relative deviation +0.11%): the 1–2 km belt around the Jingzhang Heritage Park, bounded by the North Fifth Ring to the north, Xueyuan Road / Xitucheng Road to the east, Xizhimen Outer Street to the south, and Dazhongsi East Road / Heqing Road to the west [data:geometry/site_boundary.geojson#SITE-001]. This tier addresses urban renewal, land-use structure, transport and municipal systems, and city character at **concept-suggestion depth**, with formal regulatory depth reserved for professional deepening after official data is available [depth:land_use_layout].
- **Key Areas Scope 368.4 ha** (EPSG:4548 recomputation 369.29 ha, relative deviation +0.24%): three sub-areas from north to south are Zhongzhiyuan AI Innovation Acceleration Area 192.1 ha, Beijing AI Origin Community 104.3 ha, and Dazhongsi AI Industry Cluster 72.0 ha [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [depth:three_key_area_detailed_design]. The Dazhongsi Area's distinct characteristics are recorded in [data:geometry/key_areas.geojson#PROV-KEY-003].

| Tier | Design question | Proposal response | Data footprint |
| --- | --- | --- | --- |
| Coordinated Research Scope | How to organise AI innovation ecosystem and rule-of-law discourse | Universities + open-source compliance + governance sandbox + data elements + international forum | compliance_matrix.json (agent.1-6) |
| Overall Design Scope | How to land industrial space, renewal and public space | 42 seamless land-use parcels + 24 indicative buildings + central green belt + slow-traffic loop | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key Areas Scope | How to reach detailed-design depth for the three sub-areas | Zhongzhiyuan = Test; Origin Community = Source; Dazhongsi = Market | Each key-area's metrics |

The master concept is named «**Zhi-Li Belt, Rule-of-Law Jing-Zhang**». "Zhi-Li" combines "intelligence" and "governance"; "Rule-of-Law Jing-Zhang" continues the centennial Jingzhang Railway's "self-reliant" engineering civilisation, translated into a contemporary "lineage of law and governance" for the AI era. The spatial structure is «**One Belt · Three Cores · Multi-Node Scenarios · Blue-Green Slow-Traffic Composite Loop**».

### Original Concept 1: The «First City of AI Rule-of-Law Endeavor» as Master Concept and the «Source / Test / Market / Forum» Spatial Typology

"AI Rule-of-Law Endeavor" is the master concept, landing as **four endeavour space types**:

| Space type | Function | Anchors |
| --- | --- | --- |
| **Source (法源)** — cultural rule-of-law origination | Heritage, AI governance knowledge, talent education | AI Origin Community: AI Rule-of-Law Source Hall (法源馆), Rule-of-Law Talent Community, Open-Source Compliance Station |
| **Test (法测)** — governance testing and standards | Algorithm filing, model testing, standards co-creation | Zhongzhiyuan: AI Safety Governance Sandbox, Standards Workshop, Model Red-Team Field |
| **Market (法市)** — compliance services and factor market | Data compliance, legal-tech industry, factor circulation | Dazhongsi: Data-Element Compliance Port, Smart-Legal Building |
| **Forum (法坛)** — dialogue and discourse | International dialogue, arbitration, honour exhibition | Belt axis: International Rule-of-Law Forum Hall, Algorithm Justice Ring |

### Original Concept 2: The «AI Rule-of-Law Endeavor Five-Dimensional Loop»

The five-dimensional loop "Legislative origination → Standards making → Compliance testing → Dispute resolution → International dialogue" is the methodological backbone of every AI rule-of-law scenario and operating mechanism: from rule supply (origination, standards) to rule execution (testing, dispute) to rule discourse (international). Each dimension is anchored by at least one spatial carrier and one scenario card (see the "AI Innovation Ecosystem, Personas and AI+ Scenarios" section).

### Original Concept 3: The «Rule-of-Law Endeavor Index (ROL-AI Index)»

"Rule-of-Law Endeavor" is quantified along five first-tier dimensions: **Rule Completeness, Compliance Execution, Dispute Resolution, Talent Supply, International Discourse**, each with operational indicators (number of regulations and standards, filing and review pass rates, dispute-resolution rates, talent density, international activity and mutual-recognition outputs). The index is a **concept metric framework** that requires official data and professional calibration before it can be measured; it is recorded as pending in `metrics.json` and no fabricated numbers are produced [depth:metrics_recalculation].

### Original Concept 4: The «Rule-of-Law Endeavor Community»

The "annual Global AI Rule-of-Law Forum + Developer Compliance Community + Three-Landmark Honour System + Data Compliance Annual White Paper" form the long-running "Rule-of-Law Endeavor Community", turning a one-off scheme into a sustainable public-knowledge asset (see the "Renewal Project List, Implementation Policy and Phasing" section).

### Original Concept 5: The «Three Landmarks of the Rule-of-Law Endeavor»

① **AI Rule-of-Law Source Hall** (cultural landmark, AI Origin Community); ② **Algorithm Justice Ring** (honour landmark, belt axis); ③ **Data-Element Compliance Port** (industry landmark, Dazhongsi). They correspond to Source / Forum / Market respectively and constitute a visitable and operable public interface for AI rule-of-law (see the "Blue-Green Space, Public Space and City Character" section).

## Coordinated Research Scope: Industry and Future-City Study

### Naming System and Visual Identity

The proposal name follows a three-tier hierarchy, putting "the First City of AI Rule-of-Law Endeavor" as the first-tier positioning:

- **Tier 1 (Master/Positioning)**: "**the First City of AI Rule-of-Law Endeavor**" — the proposal's primary positioning and signature concept. "First City" carries three meanings: **Pioneering** (a vision of being the first city in the world to carry AI rule-of-law endeavour at full-city scale — this is a vision-level claim, not yet verified by a global comparison method, and requires an auditable comparison baseline to be built in follow-up work); **Model** (a replicable, auditable and externally communicable urban paradigm); **Enduring** (built as a long-term endeavour rather than a one-off project). Short form: "**AI Rule-of-Law Endeavor First City**". All spatial, industrial, scenario and operational designs are subordinated to this first-order goal.
- **Tier 2 (Space/Brand)**: "**Zhi-Li Belt, Rule-of-Law Jing-Zhang**" — the belt's spatial brand name carrying the master concept into concrete form.
- **Tier 3 (Full Title)**: "**Zhi-Li Belt, Rule-of-Law Jing-Zhang: Urban Design Proposal for the Centennial Jing-Zhang AI Innovation Belt as the First City of AI Rule-of-Law Endeavor**" — the official submission title.

#### «First City» Narrative: A Twofold Purpose

"The First City of AI Rule-of-Law Endeavor" is the visual punch of the proposal's narrative, carrying a twofold purpose:

**One, raising the banner.** It puts forward "AI Rule-of-Law Endeavor" as a signature concept with great clarity: AI rule-of-law is not a pile of scattered clauses and compliance actions, but a long-term endeavour that uses law to shape the order of the AI era for the common good. It needs to be named, seen and continuously built. Therefore it raises the banner under the name "First City", giving the concept a city-scale carrier and a globally pioneering identity, and turning "AI governance global discourse" from an abstract function into a tangible endeavour flag.

**Two, grounding as a city.** Using the Jingzhang urban belt as the carrier, it grounds AI rule-of-law endeavour in concrete city-building: the 43.6 km² Coordinated Research Scope answers "where does the endeavour grow", the 11.4 km² Overall Design Scope answers "how does the endeavour network", and the 368.4 ha three Key Areas answer "where does the endeavour land". The three Key Areas are exactly the real landing of the four endeavour-space types: Origin Community hosts cultural rule-of-law and talent origination, Zhongzhiyuan hosts governance testing and standards-making, Dazhongsi hosts compliance services and factor market, and the belt axis hosts international dialogue and honour exhibition. Combined with the Five-Dimensional Loop, the ROL-AI Index, the Rule-of-Law Endeavor Community and the Three Landmarks, "endeavour" becomes a city space that is visitable, operable, measurable and enduring.

In one sentence: **under the name "First City" we raise the banner; along the Jingzhang belt we build the city.**

English mapping: Tier 1 **First City of AI Rule-of-Law Endeavor** (master), Tier 2 **Centennial Jing-Zhang AI Rule-of-Law Belt** (brand), Tier 3 **Zhi-Li Belt, Rule-of-Law Jing-Zhang: Urban Design Proposal for the Centennial Jing-Zhang AI Innovation Belt as the First City of AI Rule-of-Law Endeavor** (full).

#### Name Non-Negotiable Clause

**Regardless of any future iteration or revision, the proposal name must retain the full expression "人工智能法治事业建设第一城" (First City of AI Rule-of-Law Endeavor) — it may not be deleted, abbreviated, substituted or weakened.** Concretely: the official full title (Tier 3) is fixed as "Zhi-Li Belt, Rule-of-Law Jing-Zhang: Urban Design Proposal for the Centennial Jing-Zhang AI Innovation Belt as the First City of AI Rule-of-Law Endeavor"; any version (frontmatter, body heading, visualisation, figures, PDF, PR title, external materials) that cites the proposal name must include the complete expression. "AI Rule-of-Law First City" may be used only as an abbreviation and must be accompanied by the full title at first mention.

![Proposal logo (direction indication)](assets/figures/logo.png)

Logo visual motif (direction indication only): "scales + rail" as the core — the upper crossbar borrows from rail-tie imagery, the lower part is a stylised justice-symbol, the three key areas embed as three coloured nodes (Source / Test / Market), and the central "Forum" axis is wrapped by a gold ring. No corporate, trademark, font or portrait elements are used [depth:risk_missing_data].

#### Visual Identity System Specification (VI direction)

| Item | Definition | Application |
| --- | --- | --- |
| Master mark | "Scales + rail" logo (CN/EN/combined formats) | Public interface, A3/A0, HTML, event materials |
| Symbol colours | Source-indigo #1E5AA8 · Test-vermilion #C77E3C · Market-cyan-green #2E9BA6 · Forum-gold #C9A227 | Three-area symbol colours + gold axis identity |
| Supporting colours | Ink #22303F, cream #F7F6F2, alert red #B5453F | Layering and warnings |
| Typeface | Chinese PingFang SC / English Helvetica (system fonts, not redistributed) | Reports, figures, wayfinding |
| Graphic motifs | Rail tie (paving), balance (beam), node ring (Forum gold ring) | Wayfinding, component library, landmarks |
| Wayfinding hierarchy | Level 1 (area) · Level 2 (node) · Level 3 (scenario) | Cultural wayfinding system |
| Accessibility | Braille, multilingual, sign-language, large-print specs | All public terminals |

The VI direction follows "reviewable, clearable, non-entertaining" principles; formal VI is deepened by professional teams [depth:risk_missing_data].

### AI Innovation Ecosystem — Global Case Briefs

Public references [source:SRC-SITE-PACKAGE-2026], used as conceptual background only:

| Case / ecosystem | City / country | Distinctive feature | This proposal borrows |
| --- | --- | --- | --- |
| EU AI Act and Brussels governance ecosystem | Brussels, Belgium | Risk tiers, cross-border compliance, regulatory sandbox | Zhongzhiyuan AI Safety Governance Sandbox |
| Singapore IMDA AI Verify framework | Singapore | AI governance test framework and cross-border mutual recognition | International Rule-of-Law Forum Hall |
| UK Alan Turing Institute + governance observatory | London, UK | Academia + governance dual drive | Standards Workshop |
| Montreal MILA and AI governance | Montreal, Canada | Academic origination + AI ethics | AI Rule-of-Law Source Hall narrative |
| Beijing AI Safety Governance Institute and related bodies | Beijing, China | LLM evaluation, compliance filing consultancy | Zhongzhiyuan governance hub |
| Beijing International Data Exchange | Beijing, China | Data registration, compliance circulation, cross-border pilots | Dazhongsi Data-Element Compliance Port |
| Dubai AI governance and regulatory sandbox | Dubai, UAE | AI regulatory sandbox | Algorithm Filing Review Sandbox |
| Heidelberg AI Ethics and Law Research Centre | Heidelberg, Germany | Law + ethics interdiscipline | AI Rule-of-Law Source Hall cross-disciplinary origination |

### Innovation Chain and Future Urban Form

Haidian has a complete AI innovation chain "universities originate → enterprises transform → public experience → international communication" [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS] [source:SRC-2026-HAIDIAN-1X1]. This proposal uses the «AI Rule-of-Law Endeavor Five-Dimensional Loop» to organise the three-area + two-wing rule-of-law nodes:

- **Three Areas**: ① Zhongzhiyuan carries **Test** (AI Safety Governance Sandbox, Standards Workshop and Model Red-Team Field); ② AI Origin Community carries **Source** (AI Rule-of-Law Source Hall, Rule-of-Law Talent Community, Open-Source Compliance Station); ③ Dazhongsi carries **Market** (Data-Element Compliance Port, Smart-Legal Building).
- **Two Wings**: ① Zhongguancun Technology Service Wing carries the AI rule-of-law public service platform and cross-border compliance services; ② Xiaoyuehe Scenario Enablement Wing carries the **Forum** community-side AI rule-of-law living scenarios and intelligent mediation.

Future urban form responds to [depth:overall_spatial_structure]: AI is not just a tool but a new urban subject. Urban space must provide three new infrastructures for human-AI collaboration — explainable space (Source Hall and Governance Sandbox), auditable space (Compliance Port and Audit Centre), and participatory space (Open-Source Station and Forum Hall). "AI Rule-of-Law Endeavor" is translated here into a tangible spatial order: from knowledge accumulation in **Source**, to rule testing in **Test**, to compliance circulation in **Market**, finally converging into international discourse in **Forum** — a sustainable urban interface for the rule-of-law endeavour.

### Regional Synergy: Beiwei Community · Future Science City · Huairou Science City · Beijing E-Town · Jing-Jin-Ji

Responding to the review dimension on regional synergy (all concept-level, not confirmed arrangements) [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]:

- **With Beiwei Community**: share talent housing and youth services, building a commuting and life-circle link between the "Rule-of-Law Talent Community" and Beiwei.
- **With Future Science City**: connect basic research and large-scale facilities; Zhongzhiyuan's "Test" Sandbox can host its model-evaluation and standard-verification needs.
- **With Huairou Science City**: link national-laboratory computing and algorithm resources, providing a computing channel for the "Edge Computing Station" and compliance evaluation.
- **With Beijing E-Town (Economic-Technological Development Area)**: connect autonomous-driving and robotics scenes, exporting "AI Slow-Traffic Navigation" and "Intelligent Mediation" scenarios as reusable pilots.
- **With Jing-Jin-Ji (Beijing-Tianjin-Hebei)**: use the "Data-Element Compliance Port" and "Cross-Border Data Compliance Service" as interfaces, exploring regional data-element compliance circulation and standard mutual-recognition pilots.

Synergy is organised along five threads — innovation (Beiwei / Future Science City), computing (Huairou), scenarios (E-Town), standards and activities (initiated by the belt, co-built regionally). All concept suggestions; professional teams must deepen with relevant counterparts.

## Overall Design Scope: Urban Renewal and Concept Deepening

> Depth statement: this section is a conceptual urban-design study; formal regulatory depth and integrated-implementation depth must be completed by professional teams after official data are released; this proposal does not pretend to be a ratified conclusion.

### Land Use and Spatial Structure

Within the 11.4 km² overall design scope, **42** land-use parcels are generated (coverage deviation 0%, overlap 0%); neighbouring parcels share boundary coordinates [data:geometry/land_use.geojson] [depth:land_use_layout]. Land-use classification follows the *Guide on Land-Use Classification for Territorial Survey, Planning and Use Control* [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE].

Main composition (provisional-boundary share): parks + protective green space ≈ 47% (concept share, including central green belt and perimeter protective belts), urban residential ≈ 19%, R&D ≈ 14%, commercial service ≈ 11%, the rest being education, culture and plaza.

### Urban Renewal Overall Framework

`geometry/buildings.geojson` contains **24** indicative buildings, distributed across the three key areas, classified as "preserve-and-renew / build-and-renew" [data:geometry/buildings.geojson#BLDG-001]. `geometry/constraints.geojson` registers the existing Jingzhang Railway line, the eastern expressway and the Qinghe water system (indicative) as locked elements [depth:existing_conditions_diagnosis]. **Regulatory FAR, building height, building density, green ratio and setback** are all marked `unknown` in `metrics.json`; the proposal does not fabricate ratified conclusions [depth:development_intensity_controls] [depth:height_massing_character].

### Transport, Rail and Municipal Services

`geometry/roads.geojson` includes 5 main road centre-lines (north-south slow-traffic axis + three transverse arterials + side arterials). `constraints.geojson` labels the Jingzhang Heritage Park rail-line (indicative) as the backbone of the park and the slow-traffic axis. **Rail stations, rail alignment, road redlines, municipal pipelines, fire safety and energy** are currently indicative and must be marked as to-be-confirmed where regulatory conditions are absent [depth:traffic_rail_slow_parking] [depth:municipal_new_infrastructure].

![Land-use structure and industry layout](assets/figures/land-use-structure.png)

## Key Areas Detailed Design

![Key-area concept plan](assets/figures/key-area-concept.png)

The three key areas carry "Test / Source / Market" — the three landing forms of the master concept in space. This proposal expresses them at **concept-suggestion and reference-scheme depth**, for professional teams to deepen to integrated-implementation depth once official boundaries and engineering conditions are available [depth:three_key_area_detailed_design]:

### Zhongzhiyuan AI Innovation Acceleration Area (about 192.1 ha) · Test

Positioned as "Garden-style Full-Stack Self-Reliant Block + AI Rule-of-Law Endeavor 'Test' Hub" [data:geometry/key_areas.geojson#PROV-KEY-001]. Spatial moves: ① reinforce the low-carbon innovation interface along the Qinghe waterfront; ② use green space to host the Algorithm Filing Review Sandbox, Model Red-Team Field and AI Safety Evaluation Centre; ③ organise the Standards Workshop, Safety Governance Exhibition and Open Testing Corridor; ④ coordinate external transport and city exhibition hall access. This area is the principal host for the "Standards making" and "Compliance testing" dimensions of the Five-Dimensional Loop.

### Beijing AI Origin Community (about 104.3 ha) · Source

Positioned as "Campus-Adjacent Outcome-Conversion Block + AI Rule-of-Law Endeavor 'Source' Origin" [data:geometry/key_areas.geojson#PROV-KEY-002]. Spatial moves: ① stitch campus-park-block slow-traffic; ② build the AI Rule-of-Law Source Hall as the cultural landmark; ③ Rule-of-Law Talent Community, Open-Source Compliance Station, Campus-Adjacent Outcome-Conversion Street; ④ complete outcome release, talent residence and cross-border compliance education. This area is the principal host for "Legislative origination" and "Talent supply".

### Dazhongsi AI Industry Cluster (about 72.0 ha) · Market

Positioned as "Urban Smart-Economy + Rule-of-Law Endeavor 'Market' Block" [data:geometry/key_areas.geojson#PROV-KEY-003]. Spatial moves: ① Dazhongsi Station integration and four-quadrant pedestrian connectivity; ② Data-Element Compliance Port, Smart-Legal Building, International Rule-of-Law Forum Hall; ③ Algorithm Justice Ring as the AI rule-of-law honour landmark; ④ renewal of public environment around key enterprises and complex commercial services. This area is the integrated host for "Compliance execution", "Dispute resolution" and "International dialogue".

![Three key areas index](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas and AI+ Scenarios

### Personas (12, incl. vulnerable and marginalised groups)

| Persona | Typical need | Spatial response | Boundaries |
| --- | --- | --- | --- |
| AI Corporate Legal Counsel | Algorithm filing, cross-border compliance, contract review | Smart-Legal Building, Compliance Port, cross-border services | Lawyer final review; does not replace judiciary |
| Data Compliance Officer | Data governance, audit, PIA | Compliance Port, AI Source Hall, training | Data minimisation, privacy boundaries |
| Open-Source Developer | Compliant open-source, collaboration, reputation | Open-Source Compliance Station, test field | Licence consultancy; community aggregation |
| Legal-Tech Entrepreneur | Low-cost office, financing, regulator dialogue | Rule-of-Law Talent Community, Forum Hall | Financial sustainability; not a commercial endorsement |
| Government Governor | Governance tools, decision support, risk warning | Algorithm Filing Sandbox, slow-traffic navigation | Does not replace administrative approval |
| Neighbourhood Resident | Low disturbance, community services, AI legal consultancy | AI legal counselling points, mediation workshop | Does not collect behavioural trajectories |
| Children & Youth | Safe school commute, AI rule-of-law literacy, friendly space | Source Hall children zone, community mediation corner, safe school route | Strict data minimisation for minors |
| Older Adults | Large-print wayfinding, voice counsel, no-app-payment services | Accessibility terminals, slow-traffic AI pillars, staffed counters | No forced digitisation; human channel retained |
| Persons with Disabilities | Barrier-free paths, sign-language and assistive adaptation | Braille signage, accessibility terminals, slow-traffic gap elimination | Accessibility designed upfront, not retrofitted |
| Low Digital-Literacy Persons | Plain legal language, offline assistance | Staffed kiosks, community briefings, large-print materials | Human alternative channel provided |
| External Visitors | Wayfinding, multilingual information, public facility access | Bilingual signage, Forum Hall visitor services | Visitor data anonymised and aggregated |
| Economically Disadvantaged | Public-interest legal counsel, low-cost dispute resolution | Intelligent Mediation Workshop public seats, Source Hall free exhibitions | Public-interest services without fee barriers |

### Public Co-Creation and Grievance-Redress Mechanism

Residents and communities are co-deciders of planning and operation, not just service recipients:

- **Public co-creation**: an annual "Rule-of-Law Endeavor Community Council" (rotating between the Source Hall and mediation corners) proposes improvements on slow-traffic routes, wayfinding language, scenario priorities and landmark narratives; an adoption list is published quarterly.
- **Grievance and redress**: a unified grievance entry (online + staffed counter) for AI scenarios; algorithm-involved decisions provide a three-step remedy "explain → appeal → human re-review", resolved within 15 working days.
- **Inclusion metrics**: ① 100% barrier-free coverage of the slow-traffic system; ② Braille, multilingual and sign-language terminals in wayfinding; ③ digital-exclusion service windows not less than 30% of all service points; ④ co-creation adoption rate and grievance closure rate included in the annual ROL-AI Index.
- **Co-creation output**: council recommendations enter the iteration list of the Public-Space Component Library and Cultural Wayfinding System, forming a "suggest → adopt → implement → publicise" loop [depth:risk_missing_data].

### AI Rule-of-Law Scenario Cards (12, organised by the Five-Dimensional Loop)

**Legislative origination**: S08 AI Rule-of-Law Source Hall (cultural landmark + legal history + AI governance history); S09 Open-Source Compliance Station (licence consultancy + compliance audit).
**Standards making**: S02 AI Standards Workshop (industry-group standards + evaluation tool co-creation).
**Compliance testing**: S01 Algorithm Filing Review Sandbox (**industry test scenario**: model red-team + ethics review + interpretability testing); S03 Edge Computing Station (public + enterprise + low-carbon energy coupling); S05 Data-Element Compliance Port (**industry test scenario**: data registration + compliance evaluation + cross-border circulation); S11 Cross-Border Data Compliance Service (cross-border transfer safety assessment).
**Dispute resolution**: S06 Smart-Legal Building (legal-tech + law firm + AI collaboration); S10 Intelligent Mediation Workshop (civil/labour/consumer-dispute AI assistance).
**International dialogue**: S07 International Rule-of-Law Forum Hall (**industry test scenario**: cross-border AI governance dialogue + international arbitration); S12 Algorithm Justice Ring · honour landmark (contributor registry + annual achievement exhibition).
**Public experience (cross-dimensional)**: S04 AI Slow-Traffic Navigation (low-intrusion sensing + wayfinding advice).

Common principles: data minimisation, interpretability, human review, privacy protection; does not replace judiciary / law enforcement / approval; does not write immature technology as fully deployable [depth:risk_missing_data].

### Factor-Support Mechanism (Land-Space-Industry-Capital-Talent-Computing-Data-Scenario)

The "AI Rule-of-Law Endeavor" requires coordinated supply of eight factors (all concept design):

| Factor | Supply mechanism | Spatial / institutional carrier |
| --- | --- | --- |
| Land | Flexible disposal of redevelopment and reserve land, prioritising endeavour space | land_use.geojson reserve + JZ-03/04 |
| Space | Four endeavour spaces + component library, phased near/mid/long supply | key_areas.geojson + phasing.geojson + component library |
| Industry | Test hosts evaluation/standards; Market hosts compliance/factor circulation | Zhongzhiyuan evaluation cluster + Dazhongsi compliance belt |
| Capital | Government guidance fund + social capital + public-interest fund | Phased financing scheme for JZ projects (concept) |
| Talent | Rule-of-Law Talent Community + university joint training + international recruitment | Origin Community + regional synergy (Beiwei) |
| Computing | Edge Computing Stations + Huairou Science City computing channel | New infrastructure JZ-05 + regional synergy |
| Data | Compliance Port registration + evaluation + cross-border circulation loop | Dazhongsi Port + S05/S11 |
| Scenario | 12 scenario cards organised by the Five-Dimensional Loop, each with space/data/operator/review | Scenario technical elements table |

The eight factors are calibrated annually by the ROL-AI Index, forming a "supply-operate-monitor-adjust" loop [depth:metrics_recalculation].

### Key-Area Spatial Node Typology (Street-Station-Public Interface-Pedestrian Path)

Strengthening the relation of nodes to real streets, rail stations, public interfaces and pedestrian paths (concept):

| Node type | Example | Location | Linked scenarios |
| --- | --- | --- | --- |
| Rail station integration node | Dazhongsi four-quadrant pedestrian connectivity | Dazhongsi · Market | S05/S07 |
| Campus-block stitch node | Origin Community three-segment slow-traffic stitch | Origin · Source | S08/S09 |
| Waterfront public interface | Qinghe low-carbon innovation interface | Zhongzhiyuan · Test | S01/S02 |
| Park slow-traffic gap repair | Jingzhang Heritage Park gap stitching | Belt green band | S04 |
| Community service node | Mediation corner + accessibility terminals | Community end | S10 |
| Honour exhibition node | Algorithm Justice Ring | Axis · Forum | S12 |

Each node type gives a four-part description "current problem → spatial action → AI scenario → implementation dependency" (see Key Areas chapter and concept plan), avoiding dangling nodes [depth:overall_spatial_structure] [depth:traffic_rail_slow_parking].

### Scenario Card Technical Elements (complete)

Each scenario card records technology readiness (TRL concept range), data flow, spatial conditions, candidate operator, human-review checkpoints, failure modes and stop conditions. All are concept suggestions and do not constitute approved operation.

| ID | Scenario | 5D dimension | TRL (concept) | Data flow | Spatial conditions | Candidate operator | Human review | Failure modes & stop conditions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S01 | Algorithm Filing Review Sandbox | Compliance testing | TRL 4-6 | Enterprise self-report + third-party review; algorithm body does not leave the sandbox | Enclosed test zone in Zhongzhiyuan green space | Third-party reviewer + industry alliance | Filing conclusion reviewed by regulator | Evaluation-data leak → pause and audit; no authoritative filing interface → downgrade to display |
| S02 | AI Standards Workshop | Standards making | TRL 3-5 | Draft standards + open evaluation tools | Zhongzhiyuan workshop space | Industry alliance + standards body | Standards signed off by multi-party | Standards dispute unresolved → switch to consultation draft |
| S03 | Edge Computing Station | Compliance testing | TRL 3-4 | Local processing; cross-border data via compliance channel | Belt nodes + low-carbon energy coupling | Energy/computing operator | Energy and data compliance audit | Energy over-quota or cross-border non-compliance → suspend node |
| S04 | AI Slow-Traffic Navigation | Public experience | TRL 5-6 | Anonymous aggregate counts; no personal trajectory | Jingzhang Park slow-traffic system | Municipal operator + community | Wayfinding advice human-reviewed | Privacy complaint → stop collection; high error rate → downgrade to static signage |
| S05 | Data-Element Compliance Port | Compliance testing | TRL 4-5 | Data registration + compliance evaluation + cross-border transfer records | Dazhongsi compliance service interface | Authorised licensed body | Compliance certificates issued per case | Audit trace missing → freeze transactions; licence lapsed → stop service |
| S06 | Smart-Legal Building | Dispute resolution | TRL 5-6 | Contract / case documents after de-identification | Dazhongsi industry building | Legal-tech firms + law firms | Lawyer final review | Model output inaccurate → human fallback; liability unclear → exit that building's service |
| S07 | International Rule-of-Law Forum Hall | International dialogue | TRL 4-5 | Multilingual interpretation + cross-border evidence records | Dazhongsi station-city integration space | International organisations + arbitration bodies | Procedural compliance human-checked | Cross-border data non-compliance → close evidence function; dispute escalates → transfer to formal procedure |
| S08 | AI Rule-of-Law Source Hall | Legislative origination | TRL 5-6 | Public legal literature + AI governance history | Cultural landmark in Origin Community | Public-interest body + academic volunteers | Exhibits academically reviewed | Copyright unclear → take down material; low foot traffic → adjust operation |
| S09 | Open-Source Compliance Station | Legislative origination | TRL 5-6 | Licence texts + community question bank | Origin Community station | Open-source foundation + corporate legal | Compliance report human-reviewed | Misleading conclusion → human correction and public notice; community inactive → shift online |
| S10 | Intelligent Mediation Workshop | Dispute resolution | TRL 4-5 | Mediation dialogue de-identified and aggregated | Community service points | Mediation committee + professional mediators | Mediator final award | Party objection → human re-review; data security incident → stop use |
| S11 | Cross-Border Data Compliance Service | Compliance testing | TRL 4-5 | Cross-border transfer filing + safety assessment records | Zhongguancun Service Wing | Compliance consultancy | Filing materials reviewed | Approval process changes → pause intake; leak → accountability and exit |
| S12 | Algorithm Justice Ring · honour landmark | International dialogue | TRL 5-6 | Public contributor registry + annual achievements | Belt axis public square | Organising committee + community representatives | Public notice + appeal | False contribution info → take down and correct; copyright dispute → remove exhibit |

## Land Use, Building Scale and Retain/Renew/Demolish Approach

Land-use classification entirely follows the territorial-space codes (1401 park green space, 1402 protective green space, 1403 plaza, 0701 urban residential, 0802 R&D, 0803 culture, 0804 education, 05 commercial service, 1207 urban-village road) [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. 24 building footprints concentrate in the key areas [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]. **FAR, building height, building density, green ratio and setback** are all marked `unknown` [depth:development_intensity_controls] [depth:height_massing_character].

## Transport, Rail, Municipal and Public Service Facilities

`geometry/roads.geojson` expresses the slow-traffic axis + primary/secondary arterials + east-west cross streets; `constraints.geojson` labels the Jingzhang Heritage rail-line, eastern expressway and Qinghe water system. Public-space nodes in `geometry/public_space.geojson` include plaza land and the three key-area public sitting rooms [data:geometry/public_space.geojson#PUBLIC-001]. **Pipelines, fire, energy, computing, 5G/6G** are all marked as formal deepening prerequisites where official conditions are absent [depth:municipal_new_infrastructure].

![Transport slow-traffic and blue-green public space](assets/figures/mobility-bluegreen.png)

![Cross-section concept along the belt axis (Source → Forum → Market)](assets/figures/section-profile.png)

## Blue-Green Space, Public Space and City Character

Blue-green public space takes the Jingzhang Heritage Park active belt as its spine, coordinating the Qinghe and Xiaoyuehe rivers, surrounding universities, enterprises and communities [depth:blue_green_public_space]. Green ratio 47.4% (concept share) [metric:green_ratio]; public-space ratio 18.0% (plaza + sitting rooms, spatial-union recomputation basis) [metric:public_space_ratio].

### Cultural Narrative: Centennial Lineage of Law

"The Centennial Jingzhang" is a lineage of law from industrial self-reliance to AI self-strengthening: in 1909 Zhan Tianyou led the first trunk railway independently designed by Chinese, breaking the bias that "Chinese cannot build their own railway"; in 1953 Zhongguancun's first modern science city laid the foundation for science-and-education renewal; in 2026 the AI Rule-of-Law Innovation Belt takes up the contemporary mission of "Chinese can independently formulate AI governance rules" [source:SRC-2026-BJ-KW-THREE-AREAS-WINGS] [source:SRC-2026-HAIDIAN-1X1]. This narrative organically fuses the three positionings of "Centennial Jingzhang Cultural Belt + AI Convergence Innovation Belt + Urban AI Living-Experience Belt".

### Three Landmarks of the Rule-of-Law Endeavor

① **AI Rule-of-Law Source Hall** (Beijing AI Origin Community, **Source** · cultural landmark): a centennial rule-of-law heritage plus an AI governance case library plus a walkable "Tree of Law" narrative space. ② **Algorithm Justice Ring** (belt axis, **Forum** · honour landmark): a circular plaza plus an annual rule-of-law achievement wall plus a contributor registry, following the "public contributions only" principle. ③ **Data-Element Compliance Port** (Dazhongsi, **Market** · industry landmark): a visualised data-compliance, cross-border circulation and regulatory-sandbox experience hall plus compliance certificates. The three landmarks form the public memorial interface of "AI Rule-of-Law Endeavor" and are included in the honour-exhibition system of the "Rule-of-Law Endeavor Community".

All brand, font, image, portrait and corporate-identity elements must be cleared [depth:risk_missing_data].

### Public-Space Component Library (concept)

Reusable components for the "AI Rule-of-Law public interface" (all concept suggestions; require professional deepening and clearance):

| Component | Type | Audience | Description |
| | | | |
| Rule-of-Law Source Pavilion | Cultural / educational | Public, academics | Open-air lectures + legal history + AI governance exhibition unit |
| Compliance Counselling Kiosk | Service | Enterprises, residents | Smart legal + staffed compliance counselling point |
| Justice Ring Honour Wall | Honour | Contributors | Public contributor registry + annual achievement exhibition |
| Algorithm Visualisation Screen | Exhibition | Public | Interpretable AI decision process visualisation (de-identified) |
| Slow-Traffic AI Navigation Pillar | Transport | All ages | Accessibility + congestion-aware low-intrusion wayfinding |
| Community Mediation Corner | Service | Residents | AI-assisted mediation + mediator final award |
| Data Element Exhibition Cabin | Exhibition | Enterprises, public | Data compliance, cross-border circulation demonstration |
| Accessibility Language Terminal | Inclusion | Disabled, low digital-literacy | Voice, large-font, multilingual and sign-language assistive terminal |

### Cultural Wayfinding System (concept direction)

Using "Lineage of Law" as the main thread to organise wayfinding and symbols: ① rail-tie imagery as the ground-paving motif, linking the Heritage Park, the Source Hall and the Justice Ring; ② the three areas distinguished by Source / Test / Market symbol-colour sets (indigo / vermilion / cyan-green); ③ the central axis "Forum" identified in gold for the Forum Hall and Justice Ring; ④ the belt provides bilingual, Braille and accessibility language terminals to ensure digital-exclusion groups can reach [depth:risk_missing_data].

## Renewal Project List, Implementation Policy and Phasing

`geometry/phasing.geojson` divides the belt into near / mid / long phases [data:geometry/phasing.geojson#PHASE-001] [depth:phasing_implementation].

### Implementation Matrix

| No. | Project | Type | Candidate operator | Prerequisites | Pilot indicators | Risk gates and exit mechanisms |
| --- | --- | --- | --- | --- | --- | --- |
| JZ-01 | Jingzhang Heritage Park slow-traffic gap stitching | Public space / transport | Haidian District Government + municipal operator | Road redline and under-bridge space ownership review | Slow-traffic connectivity, number of gaps reduced | Safety not met → suspend construction, switch to traffic review |
| JZ-02 | Zhongzhiyuan Qinghe innovation interface + governance sandbox | Blue-green / industry | Park operator + third-party reviewer | River blue line, flood-control and ecological conditions | Sandbox occupants, review pass rate | Ecological impact exceeded → remove waterfront segment; review-data incident → freeze sandbox |
| JZ-03 | Origin Community campus-adjacent outcome conversion + AI Source Hall | Urban renewal | Universities + district state-owned platform | Campus boundary, ownership, ground-floor uses | Conversion projects, Source Hall visitors | Ownership dispute unresolved → suspend; visitors below baseline → adjust operation |
| JZ-04 | Dazhongsi Station four-quadrant pedestrian connectivity + Compliance Port | Rail integration | Rail operator + commercial operator | Rail station, road intersection and pipeline conditions | Pedestrian connectivity, compliance service volume | Pipeline conflict → reroute; volume below threshold → scale down pilot |
| JZ-05 | AI public services + edge-computing nodes | New infrastructure | Energy / computing operator | Energy, computing, safety, operator | Node utilisation, energy indicators | Energy over-quota → throttle; data-security incident → take node offline |
| JZ-06 | Annual Global AI Rule-of-Law Forum public route | Operation / brand | Organising committee + community representatives | Public-space permits, copyright clearance | Participants, international institutions | Safety risk → adjust route; content violation → cancel that session |

The above candidate operators, indicators and gates are all concept suggestions; formal implementation requires corresponding decision procedures and professional permits.

### Long-Term Operation: Rule-of-Law Endeavor Community

Using "AI Rule-of-Law Endeavor" as the banner, the long-term operation forms the "**Rule-of-Law Endeavor Community**": ① **Global AI Rule-of-Law Forum** (autumn, belt public-space system): cross-border AI governance dialogue, international arbitration, intelligent mediation [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]; ② **AI Safety Governance Quarterly Release** (Zhongzhiyuan · Test): Standards Workshop outputs; ③ **Developer Compliance Community Monthly Salon** (Origin Community · Source Open-Source Compliance Station): open-source licence consultancy and compliance audit training; ④ **Data-Element Compliance Port Annual White Paper** (Dazhongsi · Market): cross-border data-flow compliance report; ⑤ **ROL-AI Index Annual Release**: using the five-dimensional metric to observe the belt's rule-of-law endeavour progress year by year, forming an accumulating public-knowledge asset.

The operating mechanism strictly obeys [depth:risk_missing_data]: do not write imagined events as confirmed government arrangements; do not exaggerate government commitments or effects; do not write slogans without operating mechanisms; preserve conversion paths for talent, enterprises and developers.

#### Event Brand and Conversion Path (concept design)

**Event brand**: "Global AI Rule-of-Law Forum" is the master brand, with four sub-brands — "AI Safety Governance Quarterly Release", "Developer Compliance Community Salon", "Data-Element Compliance Port Annual White Paper", "ROL-AI Rule-of-Law Endeavor Index Annual Release" — sharing the "scales + rail" visual motif and the "Source / Test / Market / Forum" symbol system, forming an accumulating brand asset.

**Conversion path** (event → talent / enterprise / developer retention):
1. Forum participation → Developer Compliance Community registration → Sandbox application → Market-side enterprise service engagement → annual index and white-paper endorsement — forming a four-step ladder "attendee → contributor → partner → co-builder".
2. Each event sets explicit conversion indicators (registration conversion rate, sandbox applications, compliance service contracts, talent acquisitions); when below target, content and channels are adjusted.
3. All event and conversion arrangements are concept suggestions and do not constitute government commitments or investment-certain arrangements [depth:risk_missing_data].

## Metrics, Recalculation and Compliance Matrix

Core metrics can be recomputed from the submitted geometry and the Notice (EPSG:4548) [depth:metrics_recalculation]:

| Metric | Status | Value | Source |
| --- | --- | --- | --- |
| Overall design scope area | known | 11,412,825 m² (about 11.4 km²) | site_boundary.geojson |
| Key areas total | known | 369.29 ha (Notice about 368.4 ha) | key_areas.geojson |
| Zhongzhiyuan / Origin / Dazhongsi | known | 192.92 / 104.32 / 72.05 ha | key_areas.geojson |
| Green ratio | known | 47.4% (concept share) | green_space.geojson |
| Public-space ratio | known | 18.0% (0.180292) | public_space.geojson (spatial union) |
| Concept parcels | known | 42 parcels | land_use.geojson |
| Indicative buildings | known | 24 | buildings.geojson |
| Key areas | known | 3 | key_areas.geojson |
| Scenario cards / personas / landmarks | known | 12 / 6 / 3 | proposal.md |
| ROL-AI Index | unknown (concept framework) | 5 first-tier dimensions | proposal.md §Three-Tier Scope |
| FAR / height / density / setback | unknown | — | Regulatory gap |

![Core metric recalculation and evidence chain](assets/figures/metrics-evidence.png)

The compliance matrix covers all sub-clauses of Notice 1.3 / 1.4 / 1.5 and all agent.1-6 tasks (see `compliance_matrix.json`).

## Risk, Copyright and Compliance Statement

**Bilingual contract**: the main file is Chinese (`proposal.md`), with a complete English counterpart `proposal.en.md` [depth:risk_missing_data]. The v2 package uses `render_proposal_html.py` to render `report/proposal.html` and `report/proposal.en.html`; A3/A0, HTML and text-bearing figures use the same terminology across languages.

**Key risks** [depth:risk_missing_data]: ① official polygon, regulatory planning conditions, road redlines, ownership and engineering data are missing; all spatial conclusions are concept suggestions [data:geometry/constraints.geojson]; ② AI rule-of-law scenarios do not replace judiciary / law enforcement / approval functions; ③ trademarks, fonts, portraits and corporate identities must be cleared; ④ no secret or sensitive material is exposed; ⑤ HTML pages must not load CDN / remote scripts / iframes / forms / APIs / trackers [source:SRC-SITE-PACKAGE-2026].

**Responsibility statement**: this proposal does not claim official approval, ratified regulatory planning, final land ownership, final construction scale or guaranteed implementation. The AI Agent is responsible for facts, sources, copyright, spatial data, metrics and expression. Detailed copyright and sources are in [source:SRC-REPORT-COPYRIGHT-2026].

## References

Main public sources (machine index in `sources.json`) [source:SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT] [source:SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK]:

- Beijing Municipal Commission of Planning and Natural Resources Haidian Branch: *Notice of Pre-qualification for the International Open Call of the Centennial Jing-Zhang AI Innovation Belt Urban Design* (2026-05-09).
- Beijing Municipal Science and Technology Commission, Zhongguancun Administrative Committee: "Three Areas and Two Wings Build a World-Class AI Cluster" (2026-04-03).
- Haidian District Government: "Haidian Releases '1+X+1' Modernised Industry System Layout" (2026-03-02).
- Ministry of Housing and Urban-Rural Development: *Measures for Urban Design Management* (2017-03-14).
- Ministry of Housing and Urban-Rural Development: *Measures for the Compilation and Approval of Regulatory Detailed Planning of Cities and Towns*.
- Ministry of Natural Resources: *Guide on Land-Use Classification for Territorial Survey, Planning and Use Control* (2023-11-22).
- Repository maintainers: provisional coarse boundaries and three key-area polygons (2026-06-05, provisional).
- Public background references such as EU AI Act, Singapore IMDA AI Verify, UK Alan Turing Institute, Montreal MILA, Dubai AI Governance, Beijing AI Safety Governance Institute, Beijing International Data Exchange, Heidelberg AI Ethics Centre [source:SRC-SITE-PACKAGE-2026].
- Site package: `brief/site-package/` (design_brief.json, agent_taskbook.json, standards, enums, geometry, schemas).
- Source registry: `data/source_registry.json`, `data/processed/agent_fact_pack.md` [source:SRC-PROCESSED-FACT-PACK-2026].