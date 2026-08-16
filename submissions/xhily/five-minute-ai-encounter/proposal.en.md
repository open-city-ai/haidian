---
title: "Five-Minute AI Encounter"
author_github: "xhily"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Organizes the Jingzhang Relic Park, AI Origin Community, Zhongzhiyuan and Dazhongsi into a single walkable urban-scale AI experience network. Within a five-minute walk from any node, anyone can reach a usable AI service, AI public space, or AI pilgrimage landmark. All spatial judgments are conceptual suggestions pending recalculation once official boundaries are released."
tracks: ["ai-traffic-walkability", "ai-origin-community", "youth-friendly-public-space"]
scenarios: ["ai-traffic-walkability", "ai-health-service-navigation", "ai-cultural-guide", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
---

# Five-Minute AI Encounter

## Design Basis and Source Inventory

This formal proposal takes the Haidian District prequalification announcement for the *Centennial Jing-Zhang AI Innovation Belt International Urban Design Competition* as its primary basis, and uses the maintainer-registered provisional boundaries, key areas, enumerations, metrics and source lists under `brief/site-package/` as machine-readable evidence. AI agents must read `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json` and `data/processed/agent_fact_pack.md` before generating, and use `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, `missing_data_checklist.csv` to build a task, scope, source-use and data-gap checklist. Every design judgment must decompose into traceable sources, recomputable metrics, verifiable layers, and human-reviewable assumptions [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis].

The proposal uses `brief/site-package/geometry/provisional_boundaries.geojson` while official `SITE_BOUNDARY` and `KEY_AREA` polygons remain unavailable. The submitted `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` must be marked `provisional_constraint` with `official_boundary=false`; they can be used only for generation, self-check, visualization and design discussion, and cannot serve as official redline, approval basis, precise area basis or statutory control conclusion. This organizer-side data gap alone does not block content scoring.

## Three-Level Scope Framework

The proposal organizes work across three official levels: the 43.6 km² coordinated research area focusing on AI industrial ecology, strategic positioning, innovation chains and future urban form; the 11.4 km² overall design area focusing on urban renewal framework, industrial spatial layout, traffic/municipal support and urban character control; and the 368.4 ha key detailed design area covering three detailed design zones. All three levels are mapped item-by-item in `compliance_matrix.json`.

## Overall Concept: Five-Minute AI Encounter

The overall concept is **"Five-Minute AI Encounter"**: organizing the Jingzhang Relic Park, Zhongzhiyuan, Beijing AI Origin Community and Dazhongsi into a single walkable urban-scale AI experience network, so that within a five-minute walk from any node, anyone can reach a real, usable AI service, AI public space, or AI pilgrimage landmark. "Five minutes" here is not a statutory service radius but a design commitment that can be reviewed and improved: once official boundaries are released, five-minute isochrones should be recomputed against the real road network and rail connections, and continuously calibrated by agents and the public [source:AGENT-TASKBOOK]. Spatially it maps to "one axis, three cores, many nodes"; operationally it maps to "day-scenario / week-scenario / year-scenario" rhythms serving local workers, cross-district visitors and the global AI community respectively [data:geometry/site_boundary.geojson#SITE-001] [depth:overall_spatial_structure].

This main thread chains the dispersed agent tasks into one experience chain: agent.1 naming and visual identity revolve around "encounter"; agent.2 industrial ecology cases translate into "who you can meet and what you can collaborate on in this district"; agent.3 scenario cards and personas are exactly what is reachable within five minutes; agent.4 pilgrimage landmarks and public-space components form the network nodes; agent.5 cultural narrative attaches the century-long innovation arc "from Zhan Tianyou to AGI" to a walkable path; agent.6 global event system upgrades this path into a communicable international route. All spatial proposals are conceptual suggestions, reference schemes, or material for professional teams to deepen [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Key Area Detailed Design

| Key Area | Positioning | Spatial Move | AI Industry & Operation Scenarios |
| --- | --- | --- | --- |
| Zhongzhiyuan AI Acceleration Area | Garden-style full-stack autonomous innovation district | Strengthen Qinghe interface, industrial display, low-carbon innovation interaction and external traffic; green space carries open testing | Autonomous model testing, standard-making workshops, safety-governance display, low-carbon compute experience |
| Beijing AI Origin Community | Campus-adjacent transformation & talent community | Stitch campus-district-street slow traffic; add release, talent service, residential and open-source collaboration space | Open-source community, release events, talent-zone services, campus-adjacent incubation |
| Dazhongsi AI Industry Cluster | Urban intelligent economy & international exchange district | Dazhongsi station integration, four-quadrant pedestrian connectivity, business services and key-enterprise public realm | Agent and terminal display, content consumption, data elements and international roadshows |

## AI Innovation Ecosystem, Personas and AI+ Scenarios

| Persona | Typical Need | Spatial Response | Self-check Boundary |
| --- | --- | --- | --- |
| Open-source developer | Release, collaboration, testing, community reputation | Origin community release hall, public code wall, night collaboration space | No personal trajectory collection; activity data is aggregate-only |
| Startup team | Low-cost office, compute access, product trial field | Zhongzhiyuan shared testbed, edge-compute service point, standards consultation | Compute and data services require separate authorization |
| Leading-enterprise visitor | Display, business, international hosting, talent recruiting | Dazhongsi international roadshow living room, rail-station access, key-enterprise public realm | Enterprise logos and cases must be rights-cleared |
| Local resident | Commute, leisure, community services, low-disturbance renewal | Jingzhang park slow loop, community-service inset, graded night lighting | Resident profiles not used for commercial recommendation |
| Faculty & students | Tech transfer, cross-campus collaboration, daily slow traffic | Campus-district slow stitching, tech-transfer depot, AI education experience spots | Campus data and research outputs require authorization |

| Scenario Card | Spatial Carrier | What you can encounter in five minutes | Design Note |
| --- | --- | --- | --- |
| 01 Open-source Release Hall | Beijing AI Origin Community | An open-source model being demoed and its contributors | Release events, code-contribution display, small roadshows for universities, open-source communities and startups |
| 02 Safety Governance Sandbox | Zhongzhiyuan | A red-team test or standards discussion you can observe | Standards-making, safety evaluation, model red-teaming rendered as visitable, bookable, supervisable nodes |
| 03 Edge Compute Relay | Overall design nodes | An edge inference device serving passersby and its energy data | A new-infrastructure prototype tied to public service, enterprise service and low-carbon energy strategy |
| 04 AI Slow-Traffic Navigator | Jingzhang Relic Park belt | A barrier-free path optimized by explainable signage | Identifies slow-traffic breakpoints, congestion nodes and accessibility needs via explainable signage and low-intrusion sensing |
| 05 Dazhongsi International Roadshow Living Room | Dazhongsi cluster | An ongoing international roadshow or product launch | Display, negotiation, media release and international exchange for agents, terminals and content-consumption enterprises |
| 06 Qinghe Low-Carbon Innovation Corridor | Zhongzhiyuan along Qinghe | A waterfront path where you can read district carbon data and AI model energy use while walking | Combines green stormwater space, walking, cycling and AI display as a district public living room |
| 07 Campus-Adjacent Tech Transfer Street | Beijing AI Origin Community | A first-stop window for university tech transfer with in-house legal/IP advisors | Incubation, display, legal, IP and investment services for university tech transfer |
| 08 Data Element Salon | Dazhongsi | A compliant, auditable data-circulation simulation interface with a docent | A city-service interface for data elements and digital assets under compliance, authorization and auditability |
| 09 AI Life Service Sample Street | Community-commercial intersections | An AI pharmacy, an AI legal consulting spot, a set of AI education corners | Maps healthcare, education, legal and lifestyle AI+ scenarios into operable small-scale street space |
| 10 Global AI Week Route | Belt-wide public space system | A walkable pilgrimage route chaining the nine scenarios above | A walkable, communicable experience route from relic culture through open-source community to industrial display and international roadshow |

## Three AI Pilgrimage Landmarks (agent.4)

| Landmark | District | What you can encounter in five minutes | Concept Form Direction (for further deepening only) |
| --- | --- | --- | --- |
| L1 Jingzhang Smart-Spine Plaza | Jingzhang Relic Park core node | Jingzhang relic + a live AI model: a preserved relic fragment framing a public model-inference installation | Low-intervention relic-park node carrying a public AI installation; no large structure; respects heritage boundaries |
| L2 Origin Light | Beijing AI Origin Community central public space | A public light/wayfinding installation visualizing "China's AI happens here" in real time | A "public code wall" concept showing only public contributions; no unauthorized personal or enterprise data |
| L3 Dazhongsi International Salon | Dazhongsi cluster core public space | A multilingual living room welcoming global AI visitors as a city gateway for roadshows, launches and hosting | Public space plus reversible temporary installations; no permanent building changes; all content rights-cleared |

The honor-display system extends the same logic: a class of "contribution wall / honor belt" components in the public-space library projects公开 contributions, award-winning works and key milestones onto urban furniture and paving textures. Display objects must be authorized and revocable by the contributor; no personal profiles, non-public enterprise data, or commercially sensitive information may be shown.

## Risk, Copyright and Compliance Statement

**Bilingual requirement.** The main proposal file may be Chinese or English, but must provide a complete counterpart via `proposal.en.md` or `proposal.zh.md`; A3/A0 drawings, HTML and text-bearing figures must also provide language counterparts, using the competition terminology in `docs/terminology-glossary.md` where available. v2 packages missing any required translation, language mapping or valid file will be blocked by finalize and CI.

This proposal does not claim official approval, statutory regulatory plan, final land rights, final construction scale, or guaranteed implementation. The AI agent is responsible for facts, sources, copyright, spatial data, metrics and expression; maintainers and professional reviewers may request rework or reject based on self-check, spatial review and the compliance matrix.

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- data/processed/agent_fact_pack.md
- Complete machine indexes: see `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json` and `design_depth_matrix.json`
