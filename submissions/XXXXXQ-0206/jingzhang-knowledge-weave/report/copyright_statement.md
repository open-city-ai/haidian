# Copyright and Source Ledger

| Asset | Author / source | Generation or modification method | License / evidence path | Boundary |
| --- | --- | --- | --- | --- |
| `proposal.md` | Submission author with declared AI assistance | Original Chinese narrative and evidence tags. | Front matter, `agent.json`, `manifest.json`. | No third-party text, photo, map, mark, portrait, or personal data embedded. |
| `report/proposal.html` | Submission author | Repository renderer output from `proposal.md`. | `report/narrative.md`; manifest SHA-256. | Local static rendering only; no remote style, script, API, iframe, form, or tracker. |
| `visual/index.html` | Submission author | Original inline-CSS offline visual page. | `report/narrative.md`; manifest SHA-256. | Uses only local figure paths; no remote resource or telemetry. |
| `report/narrative.md` | Submission author | Original render/evidence note. | Manifest SHA-256. | Method note, not external factual authority. |
| `report/copyright_statement.md` | Submission author | This asset-level ledger. | Manifest SHA-256. | Does not assert clearance beyond the stated evidence. |
| Local asset-generation tooling (not delivered) | Submission author with declared AI assistance | Original local Pillow tooling generated the static assets; reproducible inputs, tool/version boundary, page sizes and render method are declared in `report/narrative.md`. | `report/narrative.md`; `sources.json#ASSET-PILLOW-001`; `sources.json#ASSET-NOTO-001`. | No executable code is delivered in the final package, avoiding an unsupported `report/` file type; static deliverables have independent SHA-256 receipts. |
| `assets/figures/site-overview.png` | Submission author | Original Pillow board: dual-line structure, three cores, two wings, four gates. | Generator source; manifest SHA-256. | Diagram only, no base map or aerial imagery. |
| `assets/figures/land-use-structure.png` | Submission author | Original Pillow board: eight-factor ecosystem and regional interfaces. | Generator source; manifest SHA-256. | Text-level case comparison only; no copied case image or logo. |
| `assets/figures/key-areas.png` | Submission author | Original Pillow board: three provisional concept-overlay templates. | Generator source; manifest SHA-256. | Not an existing-condition survey, redline, architecture drawing, or engineering siting. |
| `assets/figures/mobility-bluegreen.png` | Submission author | Original Pillow board: ten scenario governance cards. | Generator source; manifest SHA-256. | No individual tracking data, icon set, or third-party graphic. |
| `assets/figures/metrics-evidence.png` | Submission author | Original Pillow board: implementation, rights, and recomputation loop. | Generator source; manifest SHA-256. | All figures are approximate/provisional where geometry-derived. |
| `drawings/a3-booklet.pdf` | Submission author | Five full-page A3 layouts rendered from the five original boards. | `report/narrative.md`; manifest SHA-256. | No purchased board template, logo, or external image. |
| `drawings/a0-boards.pdf` | Submission author | Five full-page A0 layouts rendered from the five original boards. | `report/narrative.md`; manifest SHA-256. | No purchased board template, logo, or external image. |
| Chinese raster labels in PNG/PDF | Noto Sans SC | Local font rasterization only; font binary is not copied into this submission. | `sources.json#ASSET-NOTO-001`; SIL OFL 1.1. | No redistribution of the font file. |
| Pillow runtime | Python Pillow project | Local image/PDF composition from authored geometry labels and text. | `sources.json#ASSET-PILLOW-001`; HPND License. | Tool only; it contributes no external visual material. |
| `geometry/site_boundary.geojson` | Open-city-ai site package registry | Committed provisional intake boundary, retained without asserting official status. | `sources.json#BOUNDARY-SOURCE`; `assumptions.json#A-BOUNDARY-001`. | Not an official redline or precise-area basis. |
| `geometry/key_areas.geojson` | Open-city-ai site package registry | Committed provisional key-area placeholders, retained without asserting official status. | `sources.json#KEY-AREA-SOURCE`; `assumptions.json#A-BOUNDARY-001`. | Not official polygons, parcel boundaries, or project locations. |
| `geometry/buildings.geojson`, `geometry/constraints.geojson`, `geometry/green_space.geojson`, `geometry/land_use.geojson`, `geometry/phasing.geojson`, `geometry/public_space.geojson`, `geometry/roads.geojson` | Open-city-ai submission package | Submitted conceptual/intake layers used for relation checks and recomputation. | `sources.json#SITE-PACKAGE`; manifest SHA-256. | Not field survey, statutory control, engineering, ownership, utility, or approval data. |
| `metrics.json` | Submission author | Recomputable values from the committed provisional layers. | Formula, sources, confidence, and assumptions recorded in-file. | Area-derived values are `provisional_intake_only`, low confidence, and require full recomputation. |
| `assumptions.json` | Submission author | Original uncertainty, governance, and data-gap register. | `A-BOUNDARY-001`, `A-GOVERNANCE-001`; manifest SHA-256. | Does not fill missing official data with inference. |
| `sources.json` | Submission author | Original source/rights registry, including five text-only cases. | Source IDs and URLs in-file; manifest SHA-256. | Case references are not copied visual or brand material. |
| `agent.json` | Submission author | Required agent identity card. | Manifest SHA-256. | Identity metadata only. |
| `standard_matrix.json`, `design_depth_matrix.json`, `compliance_matrix.json` | Submission author | Structured task-to-evidence mappings. | Manifest SHA-256; proposal evidence tags. | Mapping evidence, not approval or procurement documentation. |
| `self_check.json`, `manifest.json` | Submission author and repository validators | Local self-check receipt and byte-integrity manifest. | Validator output and per-file SHA-256. | Local validation is not a real-world rights or approval certificate. |
| `CASE-KENDALL-001`, `CASE-CAMBRIDGE-001`, `CASE-ONENORTH-001`, `CASE-HELSINKI-001`, `CASE-BARCELONA-001` | MIT; City of Cambridge; JTC; City of Helsinki; Ajuntament de Barcelona | Text-only mechanism comparison, with publisher, URL, access date, and stated use in `sources.json`. | Respective `sources.json` entries. | No screenshot, map, statistic, trademark, logo, or implementation claim is reproduced. |

## Excluded Material

No third-party base map, aerial image, photograph, portrait, corporate/government mark, icon library, stock graphic, remote font, analytics, API, iframe, credential, personal trajectory, or externally generated image is included. Any material without the above author/source/license/method/evidence path is excluded rather than presumed clear.

## AI Generation Disclosure

The declared agent generated original text, technical diagrams, static HTML and PDF composition from the registered/provisional site package and disclosed the local rendering source and method. No external generative image, stock image, map screenshot, copyrighted illustration, portrait, company mark, or private data was used. Future factual, rights, design, approval and implementation judgments remain with human and professional reviewers.
