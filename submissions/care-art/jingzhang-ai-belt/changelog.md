# 方案迭代记录

## v2.1 - 2026-08-14 (Schema Migration and CI Repair)
- Migrated from legacy manifest schema to new schema 0.2.0
- Fixed geometry enum values (source_type, geometry_role, layer)
- Recomputed area declarations to match projected geometry
- Fixed author_github from claude-agent to care-art
- Fixed agent.json model declaration to claude-opus-4-8[1m]
- Updated all proposal_id and package_id references
- Kept all existing design content, figures, and geometry intact
- Pending: generate real A3/A0 drawing PDFs before final submission

## v2.0 - 2026-08-09 (Improvement Pass)
- **Enhanced cultural narrative**: Upgraded from "Intelligence Converges at Zhongguancun" to "Compute Rails Reborn", establishing the century-old dialogue metaphor between railway and compute rails
- **Added evidence grading system**: Four-level evidence classification (A directly computable/B announcement-anchored/C conceptual inference/D pending verification), each number carries level tags
- **Enhanced scenario cards**: Each scenario card now includes "operating protocol" field (scenario passport six fields: operating status/data boundary/human fallback/expiration date/rollback mechanism)
- **Deepened landmarks**: 3 pilgrimage landmarks now correspond to three Jing-Zhang Railway historical elements (switchback/Tsinghua Yuan Station/Bell), forming history-innovation-future three-layer narrative
- **Optimized spatial structure**: Upgraded from "one axis three cores two wings" to "one spine three stations two wings twelve nodes", each key area corresponds to one stage of AI innovation chain (verification/co-creation/experience)
- **Added three narrative lines**: Historical narrative (Jing-Zhang heritage), innovation narrative (Zhongguancun spirit inheritance), future narrative (AI scenarios concretized)
- Other content unchanged

## v1.0 - 2026-08-09

---

## v1.0 - 2026-08-09
- Initial formal submission
- Generated proposal.md (zh) and proposal.en.md (en) with proposal_format_version: 2
- Generated 9 GeoJSON spatial layers in geometry/
- Generated metrics.json with 23 metrics (18 known, 5 unknown)
- Generated compliance_matrix.json covering agent.1-6 and announcement tasks
- Generated standard_matrix.json covering 5 mandatory professional standards
- Generated design_depth_matrix.json with 12 complete design depth items
- Generated 5 required PNG figures (site-overview, land-use-structure, key-areas, mobility-bluegreen, metrics-evidence) plus English versions
- Generated visual/index.html and visual/index.en.html offline static pages
- Generated report/proposal.html rendered offline reading version
- Generated sources.json, assumptions.json, self_check.json, manifest.json, agent.json
- Self-check: ALL PASS
- Package state: ready_for_review

## Notes
- All boundaries are provisional (provisional_constraint) pending official polygons
- FAR, building height, and other regulatory conditions are pending official release
- All AI scenarios, personas, and landmarks are conceptual design directions
