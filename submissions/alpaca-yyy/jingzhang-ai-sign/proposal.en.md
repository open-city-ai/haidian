---
title: "Jingzhang AI Innovation Belt · Lightweight Digital Twin Observatory"
author_github: "alpaca-yyy"
language: "en"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A formal AI urban design package submitted by alpaca-yyy: proposes a lightweight digital twin observatory concept along the Jingzhang Heritage Park axis, covering a three-level scope framework, detailed design of three key areas, and an AI+ scenario system; all spatial proposals are conceptual and will be recalculated once official boundaries are published."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v1.0"
---

# Jingzhang AI Innovation Belt · Lightweight Digital Twin Observatory

## Design Basis and Source List

This formal package follows the Haidian Centennial Jing-Zhang AI Innovation Belt open call announcement and the machine-readable site package under `brief/site-package/` [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]. All design judgments are decomposed into traceable sources, recomputable metrics, checkable layers, and human-reviewable assumptions [depth:existing_conditions_diagnosis].

## Three-Level Scope Framework

The proposal organizes work into three levels: a coordinated research area (~43.6 km² AI industry ecosystem), an overall design area (~11.4 km² around the Jingzhang Heritage Park), and three key areas (~368.4 ha detailed design) [source:PROCESSED-FACT-PACK]. The three-level scope is mapped one-to-one in `compliance_matrix.json` [depth:three_level_scope_framework].

## Coordinated Research Area: Industry and Future City Research

A spatial framework for the AI innovation chain links universities, open-source collaboration, enterprises, public experience, and international outreach [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. Future-city research translates AI impacts on work, life, mobility, and public services into locatable districts, nodes, corridors, and scenarios [source:AGENT-TASKBOOK].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

The overall design reaches control-detailed-planning urban design depth: renewal spatial structure, inefficient-space identification, project lists, building massing, and comprehensive capacity assessment [standard:MOHURD-CONTROL-DETAILED-PLANNING]. Evidence layers: `geometry/land_use.geojson`, `geometry/buildings.geojson`, `geometry/roads.geojson` [data:geometry/land_use.geojson#LU-001] [metric:building_footprint_area_sqm].

## Detailed Design of Key Areas

Three key areas receive detailed design: Zhongzhiyuan AI independent-innovation acceleration zone, Beijing AI Origin Community, and Dazhongsi AI industry cluster [data:geometry/key_areas.geojson#PROV-KEY-001] [data:geometry/key_areas.geojson#PROV-KEY-002] [data:geometry/key_areas.geojson#PROV-KEY-003] [depth:three_key_area_detailed_design]. Each area covers program, building scale, retain-renovate-demolish classification, public space, transport, and implementation projects.

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

Five user personas (open-source developers, startups, enterprise visitors, residents, faculty/students) and ten AI scenario cards (open-source launch hall, governance sandbox, edge-compute station, AI slow-mobility navigation, international roadshow hall, etc.) are tied to spatial layers and governance boundaries [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/roads.geojson#ROAD-001].

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

Land use follows public land-use classification standards forming a complete, closed, seamless zoning [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; buildings distinguish retain/renovate/renew/new categories [depth:retain_renovate_demolish] [metric:building_footprint_area_sqm]. Unknown control conditions are declared as unknown/pending rather than fabricated.

## Transport, Rail, Municipal Infrastructure, and Public Services

Transport responds to rail-station integration, road micro-circulation, slow-mobility gap closure, parking, and green-transport requirements around Wudaokou, Qinghua East Road West, and Dazhongsi station [depth:traffic_rail_slow_parking] [data:geometry/roads.geojson#ROAD-001]. Municipal and public-service facilities cover AI industry services, innovation platforms, talent services, new infrastructure, and distributed energy [depth:municipal_new_infrastructure].

## Blue-Green Network, Public Space, and Urban Character

The blue-green framework uses the Jingzhang Heritage Park as a spine, linking Qinghe, Xiaoyue River, campuses, enterprises, and community trips into a north-south continuous walking/cycling system [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]. Urban character merges Jingzhang railway heritage, Zhongguancun innovation culture, and AI culture [standard:MOHURD-URBAN-DESIGN-MEASURES].

## Renewal Projects, Implementation Policy, and Phasing

Six renewal projects (JZ-01 to JZ-06) are listed with type, dependencies, and evidence; phasing distinguishes near-term pilots, mid-term renewal, and long-term governance [depth:renewal_project_list] [depth:phasing_implementation] [data:geometry/phasing.geojson#PHASE-001].

## Metrics, Area Recalculation, and Compliance Matrix

Metrics are classified into geometry-recomputable, control-condition-dependent, and performance indicators; full values and formulas live in `metrics.json` [depth:metrics_recalculation] [metric:site_area_sqm] [data:geometry/green_space.geojson#GREEN-001]. The compliance matrix maps every announcement/taskbook requirement to sections, layers, metrics, drawings, and HTML [standard:PROJECT-OFFICIAL-ANNOUNCEMENT].

## Risk, Copyright, and Compliance

All geometry, figures, PDFs, and HTML assets are generated by the declared AI agent or use cleared sources listed in `sources.json`; no remote assets are loaded [source:SITE-PACKAGE]. Missing official control conditions are downgraded to pending items [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS]. This package claims no official approval, statutory plan, final ownership, or guaranteed implementation.

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- Complete machine index: `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json` [source:SITE-PACKAGE]
