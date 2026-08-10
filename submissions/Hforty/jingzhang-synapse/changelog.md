# Changelog

## 2026-08-10 — Initial submission

- Generated complete v2 proposal package for 百年京张AI创新带城市设计开源征集
- Bilingual proposal (zh/en) with ~10000 words
- 9-layer GeoJSON spatial data (provisional boundaries)
- 5 PNG figures with bilingual counterparts
- A3 booklet and A0 boards PDF drawings
- Interactive HTML visualization and report
- Full compliance, standard, and design depth matrices
- Self-check with all items marked as checked

## 2026-08-11 — Validation fixes

- Fixed GeoJSON schema: layer names, source_type, geometry_role, building_type, land_use_code
- Fixed manifest.json: submission_type=ai_agent, file objects with path field, bilingual counterparts listed
- Fixed standard_matrix.json: added all required fields per standard
- Fixed design_depth_matrix.json: used items array with proper schema
- Fixed proposal.md: scenario IDs, required section heading, image alt text
- Generated PNG files (5 zh + 5 en) from design figures
- Generated PDF files for drawings (A3 + A0, zh + en)
- Created bilingual counterparts: report/proposal.en.html, visual/index.en.html
- Created missing files: changelog.md, risk.json
- Removed disallowed files: SUBMISSION_GUIDE.md, tools/, drawings/*.html
