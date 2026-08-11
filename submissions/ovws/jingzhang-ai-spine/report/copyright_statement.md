# Copyright and source ledger

## Scope and responsibility

This package is released under `COMMUNITY-DISPLAY-ONLY`. The declared AI agent generated the proposal text, structured design tables, GeoJSON concept layers, diagrams, PDF boards and offline HTML. The package is a concept submission; the licence does not by itself clear third-party rights or grant permission to publish someone else’s asset.

## Asset ledger

| Asset class | Package contents | Source/author record | Current status | Follow-up owner |
| --- | --- | --- | --- | --- |
| Text and bilingual narrative | `proposal.md`, `proposal.en.md`, `report/*.html`, `visual/*.html` | Declared AI agent; bilingual check recorded in `compliance_matrix.json` | Original package text; professional translation sign-off pending | Author + reviewer |
| Geometry and metrics | `geometry/*.geojson`, `metrics.json`, `assumptions.json` | Public call/taskbook references plus agent-generated design geometry | Provisional design data; no official redline or precise-area claim | Maintainer + professional team |
| Diagrams and raster figures | `assets/figures/*.png` | Agent-generated diagrams using package labels and concept geometry | No third-party image embedded; concept mark only | Author + rights reviewer |
| A3/A0 boards | `drawings/*.pdf` | Agent-generated layouts and package figures | No external image layer; check fonts before public print | Author + production reviewer |
| Fonts | Local system font fallback used during raster/PDF generation | No font file is redistributed in this package | Verify embedding/subsetting and licence before publication | Production reviewer |
| Icons and pictograms | Simple shapes and text drawn in the package | Agent-generated; no icon library asset embedded | Clear for package display as original shapes | Author |
| Maps and data | Provisional GeoJSON and cited public call materials | `sources.json`; no remote tiles or API calls | Usage limited to concept generation and review | Maintainer |
| Code and dependencies | Repository scripts referenced by validation commands | Repository licence and dependency manifests; no vendor code copied into package | Re-run dependency/licence audit before distribution | Maintainer |
| Generated concept logo | “Jing-Zhang Intelligence Spine” two-rail/pulse direction | Original concept described in `proposal.md` | Not an official mark; trademark search and approval pending | Author + organiser |
| Historical and cultural material | Textual railway/station/resource leads only | `sources.json` and `assumptions.json#A-CULTURE-RIGHTS-001` | No historical image, archive scan, portrait or logo embedded | Rights reviewer |
| Enterprise and institutional marks | None embedded; names are descriptive references only | Rights-holder confirmation required for any later use | No endorsement is implied | Author + maintainer |
| Global reference cases | Five official public links and mechanism summaries | `CASE-PDD`, `CASE-HELSINKI-3D`, `CASE-SEOUL-SMAP`, `CASE-AMSTERDAM-ALGO`, `CASE-VIRTUAL-SINGAPORE` | Link-only research reference; no visual asset or copied code | Author + reviewer |

## Remote-resource statement

`report/proposal.html`, `report/proposal.en.html`, `visual/index.html` and `visual/index.en.html` are offline files. They do not load remote scripts, remote fonts, map tiles, iframes, forms, external APIs or tracking. Any future external asset must be added to this ledger and to `sources.json` before it is embedded.

## Limits of this statement

The ledger records package-level provenance and intended use. It is not a legal opinion, a copyright clearance certificate, a trademark clearance, an official data licence, an approval, or evidence that a partner has agreed to operate any service. Formal publication requires item-level confirmation by the organiser, maintainer and relevant rights holders.
