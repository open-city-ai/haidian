# Formal Narrative

**Package**: `jingzhang-rings` · **Author**: `EvianEvans` · **Proposal format**: v2 (bilingual contract v1)

## What this package claims

The proposal is titled **京张年轮 / THE JINGZHANG RINGS — 一圈年轮，两条曲线 / One Ring, Two Curves**.

It takes two pieces of linear infrastructure that already exist inside 43.6 km² of real city — the
Jing-Zhang railway heritage park (9 km, already built) and the Xiaoyuehe waterfront (6.4 km improvement
reach, under construction in 2026) — and weaves them into one annual recording system. Each year cuts one
ring on each axis. The same ring carries both the ecological record and the AI service register, so that
ecology becomes a recomputable hard constraint on technological expansion rather than a slogan beside it.

## How the package is put together

Every number in the human-readable layer is derived from the machine layer, never asserted beside it.

- **Geometry** — nine GeoJSON layers. The site boundary and the three key areas are taken verbatim from the
  provisional geometry published in the official site package; no hand-drawn rectangle is presented as a
  redline. All 223 land-use features are carved by boolean operations in EPSG:4548, so the layer is a
  strict partition of the site: no gaps beyond tolerance, no overlaps, no self-intersections.
- **Metrics** — `metrics.json` is produced by importing `spatial_review.py` itself and recomputing through
  the validator's own pipeline, so there is exactly one source of truth. `floor_area_ratio` stays
  `unknown` because the regulatory plan and the existing building inventory are missing; it is never shown
  as a number anywhere in the package.
- **Matrices** — `compliance_matrix.json`, `standard_matrix.json` and `design_depth_matrix.json` register
  the response location of each clause, standard and deliverable. Items that cannot be met because of data
  gaps are marked pending, never disguised as complete.
- **Drawings and figures** — the A3 booklet (7 pages) and A0 boards (2 pages), plus five figures, are all
  rendered from the on-disk GeoJSON. Every artefact has a `.en` counterpart.
- **Visual page** — `visual/index.html` is fully offline: no CDN, no remote fonts, no map tiles, no
  external scripts, no forms, no API requests. Every `data-metric` it declares is registered in
  `metrics.json` with status `known` and a matching value.

## What this package deliberately refuses to do

1. It gives no approved indicator. All five regulatory-plan indicators are missing from the site package,
   so no floor-area ratio, building height, site coverage, green-space ratio or setback is stated.
2. It does not treat `green_ratio` or `public_space_ratio` as compliance conclusions. They are ratios of
   conceptual quantities and are labelled as such wherever they appear.
3. It does not present provisional geometry as official redline. The site boundary and key areas carry
   `official_boundary: false` and are described that way in every artefact.
4. It does not claim full-line continuity. Reaches inside confidential institutes, military land and some
   university redlines are left as acknowledged breaks.
5. It does not claim any government endorsement of the li-keeper mechanism; that is registered as an
   assumption requiring confirmation by the relevant authorities.

## Reading order

`proposal.md` is the human-readable argument. `visual/index.html` is the visual summary. The A3 booklet is
the board set. `metrics.json` and the three matrices are the machine evidence, and `self_check.json`
records the most recent four-gate result.
