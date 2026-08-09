# Copyright and asset provenance statement

## Scope and authorship

This package is an original concept submission prepared for the open-call review by the declared AI agent for GitHub user `jnyd7`. Text, tables, diagrams, SVG marks, static HTML, and the submitted GeoJSON design layers were generated for this proposal. They are not official planning documents, approvals, surveys, cadastral records, or engineering instructions.

## Asset register

| Asset class | Files / examples | Author or generation method | License / permission status | Restrictions and traceability |
| --- | --- | --- | --- | --- |
| Proposal text and tables | `proposal.md`, `report/proposal.html`, `report/narrative.md` | Original AI-assisted drafting and human-directed editing for this submission | `COMMUNITY-DISPLAY-ONLY`; submitted for review and public display in this call | No third-party text intentionally reproduced; source references are embedded in the proposal |
| Design geometry | `geometry/*.geojson` | Original AI-generated conceptual layers derived from the submitted provisional package and design assumptions | Conceptual submission asset; no statutory use | `official_boundary=false` where applicable; replace and recompute after official polygons are released |
| Figures and PDFs | `assets/figures/*.png`, `drawings/*.pdf` | Original programmatic diagrams generated from the submitted GeoJSON, metrics, and text | Original proposal graphics; community display only | No external image, map tile, photo, or logo asset is embedded |
| Logo and icon language | `assets/figures/jing-zhang-ai-commons-logo.svg` | Original vector geometry created for this submission | Original proposal mark; not a registered trademark | May be reviewed and reused only with attribution to this proposal; no third-party brand marks used |
| HTML/CSS/JavaScript | `visual/index.html` | Original offline dashboard and static interaction code | Original submission code; community display only | No CDN, remote font, remote map tile, iframe, form submission, tracking, or external API |
| Fonts | PDF and raster generation; HTML system fallback stack | PDF generation uses built-in Latin fonts and an embedded/available CJK-capable system font when present; HTML uses local system fallback names only | No font file is redistributed by this package | If a rendering environment lacks CJK support, regenerate with an approved CJK font and record its license before publication |
| Data and references | `sources.json`; cited repository `brief/` and `data/` records | Organizer-provided public repository materials and provisional geometry explicitly identified in the source registry | Used only within the permissions and usage classes recorded in `sources.json` | Provisional-only sources are not upgraded to official evidence; official controls remain pending |

## Clearance boundary

No personal data, confidential data, private imagery, unlicensed historical photograph, third-party enterprise logo, proprietary map tile, or unverified government endorsement is included. The original SVG mark is a concept direction, not a claim of ownership or official branding. Before any public or commercial reuse beyond this open-call review, the organizer or reuser must independently verify fonts, data permissions, accessibility, trademark clearance, and any replacement assets.

## Hash association

The authoritative file hashes are maintained in `manifest.json`. Any changed asset requires a new manifest hash and a rerun of the deterministic, spatial, visual, and professional checks. No remote assets are required by `visual/index.html`.
