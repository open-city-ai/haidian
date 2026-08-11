# Copyright and Asset Provenance Statement

## Ownership and generation

The participant (`hiing`) submits the proposal text, derived geometry, diagrams, bilingual figures, PDF drawings, and static HTML display as an AI-assisted original conceptual package. `Reasonix Agent` generated the composition, copy, schematic diagrams, icon-like geometric marks, and PDFs specifically for this submission. No stock image, portrait, satellite screenshot, commercial map tile, third-party logo, or remote web asset is embedded.

## Asset inventory

| Asset class | Files | Creation/source | License/permission | Restrictions |
| --- | --- | --- | --- | --- |
| Chinese/English proposal text | `proposal.md`, `proposal.en.md` | AI-assisted participant original | `COMMUNITY-DISPLAY-ONLY` for this call | Not an official planning document |
| Five bilingual figures | `assets/figures/*.png`, `*.en.png` | Programmatically drawn with Pillow from participant-authored layouts | Participant-generated; no external images | English and Chinese versions are separately rendered |
| A3/A0 drawings | `drawings/*.pdf`, `*.en.pdf` | Programmatically composed with ReportLab from the five original figures | Participant-generated | Conceptual review drawings, not construction documents |
| Visual/report HTML | `visual/*.html`, `report/*.html` | Participant-authored offline HTML | Participant-generated | No CDN, remote tiles, tracking, or external script |
| Geometry | `geometry/*.geojson` | Derived from repository provisional geometry plus participant concept layers | Source-use status recorded in `sources.json` | Must be recalculated with official polygons |
| Logo/identity | Embedded in figures/PDFs | Original two-rail-to-data-ribbon geometric mark | Participant-generated | Not an official government/project logo |
| Fonts in PNG/PDF | Microsoft YaHei (`msyh.ttc`, `msyhbd.ttc`) and Arial (`arial.ttf`) from local Windows installation | Used as rendering tools; font files are not redistributed | Subject to installed OS font terms | No font binary is included in the repository |
| Software tools | Pillow, ReportLab, repository validators | Open-source/runtime tooling | Used to generate assets; source tools not bundled as design content | Refer to each tool's upstream license |

## Public references

Official announcement and repository materials are cited in `sources.json`. The package does not claim ownership over those references. Their text/data are used only to identify task requirements, public constraints, provisional geometry, and review evidence.

## AI and human responsibility

AI assistance does not transfer accountability to a model provider. The participant is responsible for reviewing, correcting, and withdrawing any asset that infringes rights or misstates public information. Any asset challenged with credible evidence will be removed or replaced before publication.
