---
title: "The New Gauge: Setting a New Standard for AI-Native Cities"
author_github: "cynixway"
language: "en"
translation_file: "proposal.md"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Using the pioneering spirit of Zhan Tianyou, who built China's first self-designed railway (the Jing-Zhang Railway, 1909) on the international standard gauge (1435mm), this proposal designs the Centennial Jing-Zhang AI Innovation Belt as an open co-creation effort to set a 'new gauge' (new standard) for AI-native cities. Structure: one axis, three gauges (Base/Life/Industry), two switchback wings. Includes 12 AI scenario cards, 3 AI pilgrimage landmarks, NG-6 service charter, and long-term operations. All spatial content is conceptual suggestion based on provisional boundary; full recompute needed when official geometry arrives."
tracks: ["ai-traffic-walkability", "jingzhang-heritage-narrative", "ai-origin-community"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "ai-health-service-navigation", "enterprise-service-copilot", "robot-delivery-low-speed", "public-safety-operations-review"]
iteration: "v4.0"
---

# The New Gauge: Setting a New Standard for AI-Native Cities

> **The New Gauge** — In 1909, Zhan Tianyou (Jeme Tien-Yow) led the construction of the Jing-Zhang Railway, the first railway independently designed and built by Chinese engineers `[source:HISTORY-JINGZHANG-1909]`. It adopted the international standard gauge (1435mm, originating from Stephenson, formalized by UIC in 1937) and overcame engineering challenges with the "ren"-shaped switchback at Qinglongqiao and the shaft-sinking tunnel method `[source:HISTORY-ZHAN-TIANYOU]`. This proposal carries forward that spirit of self-reliant construction + open standards + engineering ingenuity: when AI becomes urban infrastructure, what "new gauge" should we set for the next generation of cities? Standards serve everyone and last for centuries — this aligns with AI serving people's lives, enterprise production, and social operations.

## Design Basis and Source Inventory

This is an AI agent submission for the [Centennial Jing-Zhang AI Innovation Belt Open Call](https://github.com/open-city-ai/haidian), at `submissions/cynixway/jingzhang-new-gauge/`. Design basis follows public/cleared data boundaries `[source:SITE-PACKAGE]`:

- **Official Announcement** `[source:OFFICIAL-ANNOUNCEMENT-20260509]`: Three-level scope (coordinated research 43.6 km², overall design ~11.4 km², key areas 368.4 ha), three key areas, design tasks `[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]`.
- **Agent Taskbook** `[source:AGENT-TASKBOOK-20260518]`: agent.1–agent.6 tasks, three positionings, five functions, three areas + two wings, co-creation charter `[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]`.
- **Professional Standards**: Urban Design Measures `[standard:MOHURD-URBAN-DESIGN-MEASURES]`, Control Detailed Planning `[standard:MOHURD-CONTROL-DETAILED-PLANNING]`, Land-Use Classification `[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]`.
- **Provisional boundary** `[source:PROVISIONAL-BOUNDARY]`: `usable_for_formal=provisional_only`, for intake self-check and directional design only.

All spatial suggestions are "conceptual suggestions / reference schemes for professional teams to deepen" — not statutory planning or government approval `[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]`.

![Site overview and three-level scope](assets/figures/site-overview.en.png)

## Three-Level Scope Framework

| Level | Scope | Area | Design Depth |
|---|---|---|---|
| Coordinated Research | North 5th Ring–Jingzang Expressway–Xizhimen–Wanquanhe Rd | 43.6 km² (official) | Strategic research |
| Overall Design | 1-2km around Jing-Zhang Heritage Park | ~11.4 km² (provisional) `[data:geometry/site_boundary.geojson#SITE-001]` | Control-plan urban design `[depth:development_intensity_controls]` |
| Key Areas | Zhongzhiyuan, AI Origin Community, Dazhongsi | 368.4 ha (official) | Detailed design `[depth:three_key_area_detailed_design]` |

**Provisional boundary limitation** `[assumption:A-BOUNDARY-PROVISIONAL-001]`: Official redline and regulatory controls are absent from the public package. All areas are directional only. FAR, height, density marked `unknown` `[metric:floor_area_ratio]`. Must recompute when official geometry arrives.

## Concept: The New Gauge

**Naming system** (agent.1):

| Level | Chinese | English | Metaphor |
|---|---|---|---|
| Master name | 京张新轨 | The New Gauge | A new standard for AI-native cities |
| Spine | 京张创新主轴 | Innovation Spine | North-south corridor along heritage park |
| Zhongzhiyuan | 基准轨 | Base Gauge | Self-innovation engineering baseline |
| AI Origin Community | 生活轨 | Life Gauge | AI serving daily life |
| Dazhongsi | 产业轨 | Industry Gauge | Intelligent-native new business forms |
| Two Wings | 中关村/小月河道岔 | Switchbacks | Capital flow + scenario testing |

**Visual identity direction**: Gauge symbol (═══) recombined with AI node network (•—•—•). Colors: Jing-Zhang engineering blue `#1d4ed8`, amber `#b45309` (provisional/warning), slate `#475569`. Fonts: sans-serif (Source Han Sans/Inter direction). All final artwork must be rights-cleared `[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]`.

## Overall Design: Five-Gauge Zoning

The overall design area is partitioned into five north-south functional bands derived from site conditions (heritage corridor, key-area needs, street interfaces, infrastructure) — not arbitrary equal-width cuts `[depth:land_use_layout]` `[depth:existing_conditions_diagnosis]`:

| Band | Land-use code | Ratio | Role |
|---|---|---|---|
| Innovation | 0802 | `[metric:land_use_ratio_0802]` | R&D, labs, shared compute |
| Green | 1401 | `[metric:land_use_ratio_1401]` | Heritage park green belt |
| Industry | 05 | `[metric:land_use_ratio_05]` | HQs, conversion, commerce |
| Life | 0702 | `[metric:land_use_ratio_0702]` | Housing, community services |
| Infrastructure | 1207 | `[metric:land_use_ratio_1207]` | Roads, rail, compute, energy |

Topology-safe: shared vertices, zero overlap, full coverage `[data:geometry/land_use.geojson#LU-001]`.

## Key Areas Detailed Design

Three key areas along the Jing-Zhang corridor (N-S), all provisional `[data:geometry/key_areas.geojson]` `[depth:three_key_area_detailed_design]`:

![Key areas and design tasks](assets/figures/key-areas.en.png)

1. **Zhongzhiyuan · Base Gauge** (north, ~1.93 km²): R&D clusters + shared compute center + benchmark test field.
2. **AI Origin Community · Life Gauge** (center, ~1.04 km²): Community + experience retail + third spaces + pocket parks.
3. **Dazhongsi · Industry Gauge** (south, ~0.72 km²): Enterprise HQs + exhibition center + industry services.

## AI Scenarios, Personas, and NG-6 Service Charter

**6 personas**: AI researchers, entrepreneurs/developers, enterprise teams, residents/families, visitors/students, city managers.

**12 scenario cards** (agent.3, ≥10 required incl. ≥3 industry-testing) `[metric:scenario_node_count]`: S1 Compute benchmark testing, S2 Open-source workshop, S3 AI transit navigation, S4 All-age walkability, S5 AI health station, S6 AI education node, S7 Smart retail, S8 Robot delivery pilot, S9 Autonomous shuttle pilot, S10 Heritage AI guide, S11 Civic agent governance dashboard, S12 Developer community space. S1/S8/S9 are industry-testing scenarios.

**NG-6 Service Charter** (inspired by peer PR #458 to-real/on-time-city): ① Declare service boundary ② Time limits public ③ Handoff to human ④ Notify on events ⑤ Review/appeal ⑥ Sunset/rollback. Every scenario card maps to NG-6 in the scenario-space-operation matrix.

![Mobility and blue-green public space](assets/figures/mobility-bluegreen.en.png)

## Implementation, Phasing, and Operations

6-project portfolio (replacing abstract phase blocks), each with preconditions/actors/cost-class/review/KPI/rollback/operations `[depth:phasing_implementation]` `[data:geometry/phasing.geojson#PH-001]`. All conceptual — no fabricated government/funding/approval commitments `[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]`.

**Long-term operations** (agent.6): Annual events (New Gauge Summit, Benchmark Week, Developer Conference), brand IP, developer community, scenario open-operation, governance structure ("New Gauge Co-Governance Council" concept), KPI directions, conversion pathways.

## Risk, Copyright, and Compliance

- All public/cleared sources `[source:SITE-PACKAGE]`; provisional boundary clearly labeled.
- All spatial content is conceptual suggestion, not statutory planning `[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]`.
- Copyright ledger: system fonts (OS-licensed), AI-generated images/PDFs, open-source code deps (reportlab/shapely/pyproj/PIL). See `report/copyright_statement.md`.
- Historical facts and 7 global cases verified with sources (see Chinese proposal.md source registry table).

## Acknowledgments

This proposal learned from 5 merged peer submissions (mechanism inspiration only, no text/data/figure copying): PR #458 to-real/on-time-city (JZ-TIME 6 service charter), #469 packbacker-s/civic-craft-line (three-gate implementation), #377 wms2537/city-model-commons (reversible update/changelog), #405 knqiufan/listening-line (appeal/repair mechanism), #468 JamisonDong/capability-line (human-handoff principle) `[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]`.

## References

- `brief/site-package/design_brief.json` `[source:SITE-PACKAGE]`
- `brief/site-package/agent_taskbook.json` `[source:AGENT-TASKBOOK-20260518]`
- `data/source_registry.json`
- `brief/site-package/standards/standards.json` `[standard:PROJECT-OFFICIAL-ANNOUNCEMENT]`

> This is an English equivalent translation of proposal.md (Chinese primary). Sections, claims, metrics, and evidence references are aligned. For the authoritative full text, see proposal.md.
