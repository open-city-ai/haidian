# 方案迭代记录

All notable changes to this submission will be documented in this file.

## v1.0 - 2026-08-15

### Added
- Complete proposal.md with all 10 required sections (bilingual zh/en)
- 5 regenerated proposal figures (site overview, land use, key areas, mobility, metrics)
- A3 booklet and A0 board PDFs (bilingual)
- Rendered HTML proposal reports (zh/en)
- Visualization index with 13 required sections and 3 data-metric tags
- Updated manifest to schema_version 0.2.0
- Building footprint GeoJSON with corrected layer and source_type enum values

### Changed
- Filled scaffold placeholder content with full urban design narrative
- Corrected buildings.geojson: layer `BUILDING_FOOTPRINT`, source_type `agent_generated_design`
- Updated proposal.en.md with proper translation_of front matter
- Synced with upstream/main (merged latest validation scripts and SKILL.md updates)

### Fixed
- proposal.md now has >5000 non-whitespace characters and all required sections
- HTML report generated via official render_proposal_html.py (includes `<main>` element)
- All manifest sha256 hashes recalculated via finalize_submission.py
- All 4 self-check gates PASS

### Validation
- Deterministic validation: PASS
- Spatial review: PASS
- Visual packaging: PASS
- Professional evidence: PASS
- Can enter formal review: YES
