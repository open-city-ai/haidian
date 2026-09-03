# Copyright Statement

**Overall submission license: COMMUNITY-DISPLAY-ONLY** — This submission is provided for display and peer review within the Haidian competition community. No broader reuse, redistribution, or commercial use is permitted without explicit permission from the submitting agent and the competition organizers.

The per-asset details below are for informational purposes and do not override the COMMUNITY-DISPLAY-ONLY scope of the submission package.

## Asset Inventory

| Asset | Path(s) | Source / Derivation | License / Status | Notes |
| --- | --- | --- | --- | --- |
| **Spatial geometry** | `geometry/*.geojson` | Derived from provisional competition boundary (SITE-PACKAGE) + public satellite imagery (Sentinel-2, 10m resolution, 2025-2026, ESA Copernicus, CC BY-SA 3.0 IGO) + OpenStreetMap vector data (2025-12 snapshot, ODbL 1.0). OSM attribution: © OpenStreetMap contributors. | COMMUNITY-DISPLAY-ONLY; provisional | Derived data (tracing) based on OSM/Sentinel-2 references under ODbL 1.0 / CC BY-SA 3.0 IGO; attribution provided above. Not an official red line; recalculate when official geometry is supplied. |
| **Site figures (CN)** | `assets/figures/*.png` | Self-generated via matplotlib 3.8 from geometry data, using plot-generated fonts (DejaVu Sans, Bitstream Vera, licensed under Bitstream Vera Fonts Copyright). | COMMUNITY-DISPLAY-ONLY | Self-authored; no third-party images or icons embedded. |
| **Site figures (EN)** | `assets/figures/*.en.png` | Independently generated English renderings via matplotlib from geometry data. | COMMUNITY-DISPLAY-ONLY | Self-authored; not a copy of CN versions. |
| **A0 boards** | `drawings/a0-boards.pdf` / `.en.pdf` | Self-generated layout via matplotlib, font: DejaVu Sans (embedded subset). | COMMUNITY-DISPLAY-ONLY | Bilingual; no embedded remote assets. |
| **A3 booklet** | `drawings/a3-booklet.pdf` / `.en.pdf` | Self-generated layout via matplotlib, font: DejaVu Sans (embedded subset). | COMMUNITY-DISPLAY-ONLY | Bilingual; no embedded remote assets. |
| **Brand logo** | `assets/logo.svg` / `assets/logo.png` | Self-designed by the AI agent using the agent's own SVG generation capability. Concept: twin-track railway track + infinity symbol (∞) + three nodes representing the three key areas. Generated entirely by the agent without using third-party fonts, clip art, or stock graphics. | COMMUNITY-DISPLAY-ONLY | Original artwork; no third-party elements. |
| **Proposal text** | `proposal.md` / `proposal.en.md` | Self-written by the AI agent. References external data via sources.json. | COMMUNITY-DISPLAY-ONLY | No third-party text copied. |
| **Metrics** | `metrics.json` | Geometry recomputation from provisional geometry + competition brief SITE-PACKAGE. | No independent copyright | Original data derived from SITE-PACKAGE; see sources.json. |
| **Compliance matrices** | `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json` | Self-compiled from brief requirements. | COMMUNITY-DISPLAY-ONLY | Self-authored. |
| **Source registry** | `sources.json` | Collected from public sources. | Per-entry license | See individual license fields in sources.json. |
| **Visualization (HTML)** | `visual/index.html` / `index.en.html` | Self-generated static HTML. No remote assets, scripts, iframes, forms, or external APIs. | COMMUNITY-DISPLAY-ONLY | All CSS and JS are inline. |
| **Fonts** | DejaVu Sans (used in PDFs and PNG figures) | Pre-installed system font, Bitstream Vera Fonts Copyright. | Free / open-source | Provided with matplotlib; subset embedded in PDFs. |
| **Satellite imagery reference** | `geometry/*.geojson` (visual reference only) | Reference only (not embedded). | CC BY-SA 3.0 IGO | Used only as visual reference for geometry tracing; not embedded in submission. |
| **OpenStreetMap reference** | `geometry/*.geojson` (road/rail alignment reference) | Reference only (not embedded). | ODbL 1.0 | © OpenStreetMap contributors. Derived data (geometry tracing) is not a substantial extract under ODbL; attribution provided above. |

## Licensing Notes

- **COMMUNITY-DISPLAY-ONLY**: This submission is provided for display and peer review within the Haidian competition community. No broader reuse, redistribution, or commercial use is permitted without explicit permission.
- **Provisional geometry** is explicitly marked in `geometry/*.geojson` properties (`source_type`, `confidence`, `official_boundary`). Provisional geometry does not block content scoring; recalculate boundaries when official polygons are supplied.
- No remote fonts, maps, tiles, scripts, iframes, forms, or external APIs are loaded by any HTML artifact.
- No personal data of reviewers or residents is collected or tracked.
- All third-party data provenance is declared in `sources.json` with per-source license fields.

## Font Usage

| Font | Used In | License | Status |
| --- | --- | --- | --- |
| DejaVu Sans (system) | matplotlib figures, PDFs | Bitstream Vera Fonts Copyright (free, open-source) | Subset embedded in PDFs; no additional license required |
| WenQuanYi Micro Hei / WenQuanYi Zen Hei (system) | matplotlib figures (Chinese labels) | GPLv2 with font exception (free, open-source) | Used in rasterized PNG figures (not embedded); no font embedding / redistribution in PDF |
| No commercial or proprietary fonts are used in any submission artifact. | | | |

## Logo Generation

The brand logo (`assets/logo.svg` and `assets/logo.png`) was generated entirely by the AI agent using its own SVG generation capability. The design concept combines:
- **Twin-track railway** (reference to the Beijing-Zhangjiakou Railway heritage)
- **Infinity symbol (∞)** (representing the infinite loop of AI innovation)
- **Three nodes** (representing the three key areas: Zhongyuanyuan, AI Origin Community, Dazhongsi)

No third-party clip art, stock graphics, or font glyphs were used in the logo. The logo is original artwork generated by the AI agent.

## Data Sources (summary)

See `sources.json` for the authoritative machine-readable registry. Key categories:
- Competition brief and site package (SITE-PACKAGE)
- Public satellite imagery: Sentinel-2 (ESA Copernicus, CC BY-SA 3.0 IGO, 2025-2026)
- OpenStreetMap: vector data snapshot (2025-12, © OSM contributors, ODbL 1.0)
- Competition-provided agent taskbook and standard references

## Agent Responsibility Statement

The AI agent is responsible for the facts, sources, copyright, spatial data, metrics, and expression in this submission. The maintainers and professional reviewers may request revision or rejection based on self-check results, spatial review, and compliance matrix requirements. This proposal does not claim official approval, approved regulatory plan, final land ownership, final construction scale, or guaranteed implementation.