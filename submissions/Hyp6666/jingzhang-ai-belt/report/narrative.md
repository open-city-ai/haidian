# Formal Narrative

## Overview

"百年京张·共生智轨" (Centennial Jing-Zhang · Symbiotic Intelligent Rail) is an AI-generated open urban design proposal for the Jing-Zhang AI Innovation Belt in Haidian District, Beijing. The proposal is organized around the three-layer scope announced in the call for proposals — the Coordinated Research Area (43.6 km²), the Overall Design Area (11.4 km²), and the Key-Area Detailed Design Area (368.4 ha) — and answers all six agent tasks (agent.1–agent.6) specified by the organizers.

## Design Concept

The historic Jing-Zhang Railway corridor, China's first self-designed railway, is reinterpreted as a living urban spine: a seven-band land-use structure along the rail corridor that stitches together university research clusters, AI industry anchors (including the Dazhongsi AI Industry Cluster and the Zhongzhiyuan area), and everyday neighborhood life. The concept of "symbiotic intelligent rail" binds heritage preservation, continuous slow-mobility corridors, and AI-augmented public services into one spatial and governance framework.

## Spatial and Program Structure

The proposal defines a seven-band functional structure within the Overall Design Area and delivers detailed designs for three key areas. Land use, transportation and slow mobility, blue-green public space, and building/plot guidance are each quantified and cross-checked: every headline metric in metrics.json — site area, green ratio, public-space ratio, building footprint, phasing areas — is computable from the delivered GeoJSON geometry and is registered with a known/unknown status so reviewers can distinguish verified values from declared data gaps.

## AI Application Scenarios

Twelve AI scenario cards and six stakeholder personas translate the spatial plan into operational services across three tracks: AI traffic and walkability, enterprise services ecosystem, and civic agent governance. Each scenario names its data dependencies, governance boundaries, and human-oversight requirements; safety- and rights-sensitive scenarios are explicitly routed through human review rather than automated decision-making.

## Compliance and Verification

The package closes 23 mandatory tasks, 15 design-depth items, and 26 registered sources in three structured matrices (tasks coverage, design depth, sources–evidence). Deterministic self-checks (validate_local_submission.py, spatial, visual, and professional review scripts) are run against the package, and results are recorded in self_check.json. Assumptions and unresolved official-data discrepancies are disclosed in assumptions.json under six status classes, with sensitive items flagged for human confirmation.

## Deliverable Map

- proposal.md / proposal.en.md — full bilingual proposal text (13 chapters each)
- geometry/*.geojson — 9 geometry files covering scope, land use, key areas, transport, blue-green, buildings, and phasing
- metrics.json, sources.json, assumptions.json, three matrices — the structured evidence layer
- assets/figures/ — 5 bilingual figure pairs; drawings/ — bilingual A3 booklet and A0 boards
- visual/index.html (+ .zh / .en) — offline interactive-style summary; report/ — rendered HTML, this narrative, and the copyright statement
