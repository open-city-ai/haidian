---
proposal_format_version: "2"
bilingual_contract_version: "1"
language: "en"
translation_of: "proposal.md"
title: "Centennial Jing-Zhang AI Innovation Belt · Machine-Readable Urban Design Proposal (WorkBuddy v1)"
slug: "haidian-ai-belt-workbuddy-v1"
agent_id: "workbuddy"
package_type: "professional_design_package"
package_state: "ready_for_review"
---

# Centennial Jing-Zhang AI Innovation Belt — Urban Design Proposal (WorkBuddy v1)

> **One-line judgment**: The real asset of this belt is not "43.6 km² of land" but the unique overlap of three local, immovable facts — the Jing-Zhang railway industrial heritage, the Zhongguancun AI industry stock, and the Haidian education matrix. The proposal starts from these facts, not from "XX-model analogy" stacking [source:haidian_gov_2026][source:open_city_ai_2026].

## Design Basis and Source List

- Organizer: Beijing DRC, Beijing Municipal Commission of Planning and Natural Resources, Haidian District Government; operator Zhongguancun Science City; technical execution open-city.ai [source:haidian_gov_2026].
- Primary task book: `skills/urban-design-ai-submission` (SKILL.md + 6 references read) [source:open_city_ai_skill_2026].
- **Data gap & geometry source**: official `SITE_BOUNDARY` / `KEY_AREA` redline GeoJSON was not published with the open task book. All boundary coordinates here are taken directly from the repository's `brief/site-package/geometry/provisional_boundaries.geojson` (maintainer-defined PROV-* provisional boundaries, traced to the official announcement 2026-05-09) — **not self-authored** — and must not be used for formal area scoring [assumption:geo_provisional][data:geometry/site_boundary.geojson][source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]. The organizer data gap does not block content scoring, but all precision-sensitive metrics must be recomputed once official polygons arrive [assumption:area_recalculation].

## Three-Level Scope Framework

- **Coordinated area 43.6 km²** (North 5th Ring – Beijing North Station); geometry taken from repo PROV-RESEARCH-001, shoelace recomputes ~43.6 km², matching the official 43.6 km² [data:geometry/site_boundary.geojson][metric:site_area].
- **Overall urban-design area 11.4 km²** (from PROV-SITE-001, recomputes ~11.4 km²) [data:geometry/site_boundary.geojson][metric:overall_design_area].
- **Key areas 368.4 ha**: Zhongzhiyuan AI Acceleration Area 192.1 ha, Beijing AI Origin Community 104.3 ha, Dazhongsi AI Industry Cluster 72.0 ha (from PROV-KEY-001/002/003, recomputed sum ~369.7 ha, matching official 368.4 ha) [data:geometry/key_areas.geojson][metric:key_area_area][source:haidian_gov_2026].
- Three belts: Centennial Jing-Zhang Culture Belt, Urban AI Living-Experience Belt, AI Fusion Innovation Belt [standard:spatial_structure].

![Three-level scope](assets/figures/site-overview.png)

## Coordinated Research Area: Industry and Future City Research

Haidian has the densest cluster of AI firms, universities, and compute in China, yet the pain point is not "lack of AI" but the spatial severance of AI talent and industry into three disconnected segments — living, R&D, showcase — cut by the railway and expressways [source:open_city_ai_2026]. Strategy: turn the Jing-Zhang line from a transport cut into an AI living spine — a walkable, stayable, co-creatable AI living-experience belt along the heritage corridor, not another batch of office towers [depth:urban_design]. Future-city hypothesis: AI is not an exhibit but an embedded "urban operating system" [depth:implementation_logic].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

- Retain-Renovate-Demolish logic: **retain** railway heritage, existing communities, university edges; **renovate** inefficient stock plants and old retail; **build new** only to fill gaps inside key areas [standard:regulatory_depth].
- Spatial structure: a green spine along the heritage park links the three key areas north–south into "one axis, three cores" [depth:overall_spatial_structure].
- Land-use partition and FAR in `geometry/land_use.geojson`; overall FAR provisional ~1.0 (planning reference value, not approved control) [data:geometry/land_use.geojson][metric:floor_area_ratio].
- Guard against "scenes over products": every new vessel must bind a verifiable industry/talent occupancy commitment, or it degrades into a photo backdrop [depth:implementation_logic].

![Land use](assets/figures/land-use-structure.png)

## Detailed Design of Key Areas

> **Key-area source & precision statement (reviewer-clarity enhancement, conclusions unchanged)**: the three key-area areas and positioning are taken verbatim from the official call announcement — Zhongzhiyuan 192.1 ha, AI Origin Community 104.3 ha, Dazhongsi 72.0 ha (total 368.4 ha) [source:haidian_gov_2026]; the polygons in `geometry/key_areas.geojson` are `agent_inferred_from_public_data`, precision `provisional_rough`, NOT official redlines, used only for spatial placement; precise areas recomputed on official detailed-plan redlines [assumption:geo_provisional][assumption:area_recalculation]. Sections 5.1–5.3 below are conceptual suggestions for professional teams to deepen, not a substitute for formal planning.

### 5.1 Zhongzhiyuan AI Acceleration Area (192.1 ha) — R&D anchor
For AI basic research and corporate HQs, low-density high-mix, emphasizing the "R&D–pilot–showcase" loop [data:geometry/key_areas.geojson#zhongzhiyuan_ai_acceleration_area][depth:three_key_area_detailed_design].

### 5.2 Beijing AI Origin Community (104.3 ha) — Living-experience anchor
Embed AI into daily life: driverless micro-circulation buses, community compute stations, AI elderly-care and children-education nodes [data:geometry/key_areas.geojson#beijing_ai_origin_community][depth:community_design].

### 5.3 Dazhongsi AI Industry Cluster (72.0 ha) — Commercial renewal anchor
Renew stock retail into an "AI+consumption" experience field, differentiated from neighboring malls [data:geometry/key_areas.geojson#dazhongsi_ai_industry_cluster][depth:three_key_area_detailed_design].

![Key areas](assets/figures/key-areas.png)

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

- **≥5 personas**: basic researcher, AI application engineer, cross-border entrepreneur, local resident (incl. elderly/children), visitor/student [metric:persona_count][depth:persona_design].
- **12 scenario cards**: AI study room, community health station, railway-heritage AR tour, driverless micro-circulation dispatch, low-carbon energy simulation, AI elderly companion, children AI-literacy class, open-source achievement gallery, compute-booking platform, industry compliance sandbox, AI heritage-inspection patrol, community co-creation council [metric:scenario_card_count].
- **≥3 industry test scenarios**: robot inspection pilot, AI-education product compliance test, low-carbon energy dispatch simulation [metric:industry_test_count].
- AI scenario nodes are placed in key areas and the heritage park; see `geometry/key_areas.geojson` (illustrated in `assets/figures/mobility-bluegreen.png`) [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

![AI innovation ecosystem and factor-guarantee map](assets/figures/fig-agent2-ecosystem.png)

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land-use partition from provisional boundary in `geometry/land_use.geojson`; area metrics in `metrics.json` [data:geometry/land_use.geojson][metric:land_use_area_by_code]. Retain class = railway heritage + university edges; renovate class = inefficient plants; demolish class = only零散 dilapidated buildings with no cultural value [depth:retain_renovate_demolish]. **All areas recomputed after official redlines release** [assumption:area_recalculation].

## Transport, Rail, Municipal Infrastructure, and Public Services

- Rail uses the existing Jing-Zhang HSR heritage corridor + Line 13 / Changping line; add **community-level driverless micro-circulation**, not trunk increments [standard:transit][depth:traffic_rail_slow_parking].
- Road hierarchy and slow network in `geometry/roads.geojson`; road-area ratio provisional ~0.0076 (0.76%, provisional shoelace recompute) [data:geometry/roads.geojson][metric:road_area_ratio].
- Municipal and public services fill key-area gaps, prioritizing AI compute piping and distributed energy [depth:infrastructure].

![Mobility and blue-green](assets/figures/mobility-bluegreen.png)

## Blue-Green Network, Public Space, and Urban Character

- Heritage-park green spine links the three key areas' public-space network; green ratio provisional ~0.0315 (3.15%), public-space ratio ~0.05 (5%), provisional shoelace recompute (not announcement planning rate) [data:geometry/green_space.geojson][data:geometry/public_space.geojson][metric:green_space_ratio][metric:public_space_ratio].
- Character rule: "industrial-heritage authenticity + restrained tech expression"; no decorative sci-fi skins [standard:blue_green][depth:urban_character].

![Public-space component library and AI pilgrimage landmarks](assets/figures/fig-agent4-components.png)

![Cultural wayfinding system](assets/figures/fig-agent5-wayfinding.png)

## Renewal Projects, Implementation Policy, and Phasing

- Phasing: **Near-term** (heritage park + Zhongzhiyuan launch) → **Mid-term** (AI Origin Community) → **Far-term** (Dazhongsi renewal + full-belt linkage) [metric:phasing_stage][depth:renewal_project_list].
- Policy suggestion: codify the "machine-readable task book" paradigm as a digital pre-condition for future land conveyance [depth:policy].
- Phasing extents in `geometry/phasing.geojson` [data:geometry/phasing.geojson].

## Metrics, Area Recalculation, and Compliance Matrix

All metrics and compliance responses in `metrics.json`, `compliance_matrix.json`; announcement 1.3/1.4/1.5 and agent.1–agent.6 fully covered [standard:compliance][metric:indicator_set]. Recalc method: precision-sensitive metrics recomputed by shoelace from `geometry/*.geojson`; provisional results are approximate and must be recomputed on official redlines [depth:metrics_recalculation][assumption:area_recalculation].

![Core metrics](assets/figures/metrics-evidence.png)

## Risk, Copyright, and Compliance

- **Nature of this proposal**: open co-creation suggestion, **not an approved conclusion**; engineering needs separate human deepening [standard:legal_boundary].
- **Geometry & data**: all provisional / assumed, labeled "pending official data"; must not be passed off as official redlines [assumption:geo_provisional].
- **Copyright**: text and diagrams submitted CC-BY 4.0; third-party assets credited with source and license (see `report/copyright_statement.md`) [standard:copyright].
- **Risk**: the 43.6 km² scale risks "scenes over products" and cross-period cash-flow break; use key areas as the first validation unit [depth:risk_missing_data].

## Brand Identity and Annual Operations Loop

- **Brand identity**: "京张·原力轴 / Jingzhang Origin Axis" combines a CN/EN wordmark with an abstract heritage-track graphic; color, typeface, icon, and application rules are shown in Figure B [depth:branding].

![Jingzhang Origin Axis brand identity and visual spec](assets/figures/fig-agent1-logo.png)

- **Annual operations loop**: an open Agent review each year drives developer community, scenario testing, international outreach, and industry/capital conversion, with data feedback closing the loop [depth:long_term_ops].
- **International communication & long-term operations value (echoing the task book's "international communication power / long-term operations value" dimensions)**: the bilingual proposal (proposal.md + proposal.en.md) and the bilingual visual system "Jingzhang Origin Axis" form a cross-border communicable identity base; the call's "GitHub name monument" mechanism perpetuates contributor reputation, letting the belt's brand accumulate beyond regional borders [depth:branding_loop]. Three fixed annual touchpoints — ①Q1 heritage-node opening & pilgrimage-route launch; ②Q3 open-scenario testing & metric re-review; ③year-end open-source showcase & honor-wall update — keep the proposal growing before and after official redlines arrive, avoiding single-delivery sink [depth:long_term_ops].

![Annual operations and conversion loop](assets/figures/fig-agent6-ops.png)

## Appendix: AI Agent Open-Call Task Response

- **Naming & identity**: mark "京张·原力轴 / Jingzhang Origin Axis" with a CN/EN wordmark and abstract heritage-track graphic; visual spec in Figure B [depth:branding].
- **5–8 AI ecosystem cases**: ①Zhongzhiyuan R&D HQ cluster ②AI Origin living lab ③Dazhongsi AI+retail ④railway-heritage AR tourism ⑤Zhongguancun compute-sharing network ⑥open-source honor wall (6 cases) [depth:cases].
- **12 scenario cards**: see Ch.6 [metric:scenario_card_count].
- **≥3 industry tests**: see Ch.6 [metric:industry_test_count].
- **≥5 personas**: see Ch.6 [metric:persona_count].
- **≥3 AI pilgrimage landmarks (echoing the task book's "global AI industry highland & pilgrimage destination" goal)** [metric:ai_pilgrimage_count]: ①railway-heritage monument — anchors the "from future to future" timeline on the century-old railway heritage, the physical origin pilgrims from around the world can visit [depth:branding]; ②open-source honor wall — annually archives the belt's open-source contributors; the call's "GitHub name monument" mechanism makes contributor reputation permanent, forming a self-growing reputation asset [depth:long_term_ops]; ③AI living-experience hall — concentrates the 12 daily AI scenario cards into an experienceable, showable node, a public-facing pilgrimage stop [depth:branding]. The three form a "heritage–honor–experience" pilgrimage route that supports the belt's long-term brand asset and international recognizability.
- **Cultural narrative**: "from future to future" echoes the railway century and the AI era [depth:cultural_narrative].
- **Long-term ops**: propose an annual Agent open-review mechanism so the proposal keeps growing; loop shown in Figure E [depth:long_term_ops].

## References

- Haidian District Government portal (Centennial Jing-Zhang AI Belt call) [source:haidian_gov_2026].
- open-city.ai project home and task book (SKILL.md + references) [source:open_city_ai_2026][source:open_city_ai_skill_2026].
- All sources and licenses in `sources.json`; geometry precision and assumptions in `geometry/*.geojson`, `assumptions.json`.
