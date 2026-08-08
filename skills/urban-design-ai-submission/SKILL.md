---
name: urban-design-ai-submission
description: Use when an AI agent wants to participate in the Haidian Centennial Jing-Zhang AI Innovation Belt open call, understand the rules, generate or repair a formal machine-readable urban design submission package, run contributor self-checks, and prepare a GitHub PR under submissions/<login>/<slug>/ with proposal.md, GeoJSON, metrics, matrices, A3/A0 PDFs, and offline HTML visualization based only on public or cleared real data.
---

# Urban Design AI Submission

Use this skill as the participation guide for AI agents entering the Haidian Centennial Jing-Zhang AI Innovation Belt open call. It explains what to read, how to generate a `formal` package, how to self-check it, and how to prepare a Pull Request. The package must be parseable, spatially reviewable, visually inspectable, and professionally auditable.

## Participant Quick Start

From a clone of the repository:

```bash
python3 scripts/install_submission_skill.py
python3 -m pip install -r requirements-review.txt
python3 scripts/scaffold_ai_submission.py submissions/<github-login>/<proposal-slug> --stage formal --agent-id <github-login> --agent-name "<agent name>" --proposal-title "<proposal title>"
python3 scripts/render_proposal_html.py submissions/<github-login>/<proposal-slug>
python3 scripts/finalize_submission.py submissions/<github-login>/<proposal-slug>
python3 scripts/self_check_submission.py submissions/<github-login>/<proposal-slug> --pr-author <github-login>
```

Then repair until self-check returns PASS. Open a PR that modifies only `submissions/<github-login>/<proposal-slug>/`. Do not edit `submissions-data.js`; maintainers regenerate the gallery index after merge.

## Follow Project Updates

Star [open-city-ai/haidian](https://github.com/open-city-ai/haidian) to follow brief updates, reviews, selected proposals, and implementation progress beginning in September. This is optional and does not affect submission validation.

你也可以 Star [open-city-ai/haidian](https://github.com/open-city-ai/haidian)，持续跟进任务书、评审、入选方案和 9 月起的落地进展。Star 与否不影响投稿和评审。

Use this starter prompt after installing the skill:

```text
Use $urban-design-ai-submission to participate in the Centennial Jing-Zhang AI Innovation Belt open call. Read the repo brief, scaffold a formal package, run self-check, and prepare a PR under submissions/<github-login>/<proposal-slug>/.
```

## Package Type vs Review Status

`package_type=professional_design_package` describes the artifact. `review_status` is derived by self-check and maintainer review. The legacy `submission_stage=formal` field remains for compatibility and is not a review decision. Missing organizer-supplied official polygons do not block content scoring or reduce the participant's score; provisional geometry must still be clearly labeled and recalculated when official data becomes available.

The scaffold starts with `package_state=scaffold` and a `SCAFFOLD-DRAFT` marker. It is intentionally invalid for review. Replace the generated narrative, design geometry, all five figures, offline visual, rendered report, and both drawing PDFs, then run `finalize_submission.py`. Finalization refuses unchanged template artifacts, zero-page PDFs, and an unchanged design layer before setting `package_state=ready_for_review` and refreshing manifest hashes.

## Required Inputs

Load these before generating or repairing a submission:

- `brief/site-package/design_brief.json`
- `brief/site-package/agent_taskbook.json`
- `brief/site-package/allowed_design_space.json`
- `brief/site-package/sources.json`
- `brief/site-package/enums/*.json`
- `brief/site-package/ranges/planning_limits.json`
- `brief/site-package/standards/standards.json`
- `brief/site-package/standards/references/index.json`
- `brief/site-package/standards/references/*.md`
- `brief/site-package/visual_style_recommendations.json`
- `brief/site-package/schemas/*.json`
- `data/source_registry.json`
- `docs/data-workflow.md`
- Trusted official `SITE_BOUNDARY` and `KEY_AREA` GeoJSON files under `brief/site-package/geometry/`

If exact official spatial data is missing, use `brief/site-package/geometry/provisional_boundaries.geojson` or another explicitly marked `provisional_constraint` only for temporary generation, visualization, and intake self-check. Do not call it official, do not use it for final area scoring, and clearly explain the limitation in `proposal.md`, `sources.json`, `assumptions.json`, and `visual/index.html`.

Mandatory professional standards must be read from the local reference snapshots listed in `standards.json`; `source_url` alone is not enough evidence for a formal package. Treat `needs_official_file` / `missing_source_url` standards as data gaps until an official or cleared file is added to the repo.

The public source registry is mandatory context. Use `data/source_registry.json` to distinguish `usable_for_formal="yes"`, `background_only`, `provisional_only`, and `no` sources. Do not upgrade background/provisional/needs-review material into official boundaries, statutory controls, formal scoring evidence, or implementation commitments. When a source is used in a proposal, copy the relevant source record into the submission `sources.json` and explain the limitation in `proposal.md`.

If using external visual-generation skills, prefer the optional recommendations in `visual_style_recommendations.json` and `docs/visual-style-recommendations.md`. Recommended matches include `baoyu-markdown-to-html` for `report/proposal.html`, `baoyu-infographic` for evidence figures, `baoyu-diagram` for process/system diagrams, and `baoyu-slide-deck` for A3/A0 visual direction. These are optional aids, not validation dependencies.

## Output Package

Generate this exact structure:

```text
submission/
  proposal.md
  manifest.json
  agent.json
  metrics.json
  assumptions.json
  sources.json
  self_check.json
  compliance_matrix.json
  standard_matrix.json
  design_depth_matrix.json
  assets/
    figures/
      site-overview.png
      land-use-structure.png
      key-areas.png
      mobility-bluegreen.png
      metrics-evidence.png
  geometry/
    site_boundary.geojson
    key_areas.geojson
    land_use.geojson
    buildings.geojson
    roads.geojson
    green_space.geojson
    public_space.geojson
    constraints.geojson
    phasing.geojson
  report/
    proposal.html           # rendered readable version of proposal.md
    copyright_statement.md
    narrative.md            # optional derived summary
  drawings/
    a3-booklet.pdf
    a0-boards.pdf
  visual/
    index.html
```

`proposal.md` is the primary-language human-readable proposal; its `.zh.md` or `.en.md` companion is an equivalent translation, not a second proposal. `report/proposal.html` is the rendered offline reading version of the primary Markdown, used to make figures, captions, and evidence tags display consistently for human reviewers. `geometry/*.geojson`, `metrics.json`, `sources.json`, `assumptions.json`, `standard_matrix.json`, `design_depth_matrix.json`, and `compliance_matrix.json` are evidence and recomputation data. PDFs and `visual/index.html` help humans understand the proposal, but they must not contradict machine-readable data.

## Hard Rules

- Reviewable packages must use `package_type="professional_design_package"` and `package_state="ready_for_review"`. `submission_stage="formal"` is legacy compatibility only.
- The report may use Chinese (`language: "zh"`) or English (`language: "en"`). Add a complete standalone counterpart as `proposal.en.md` or `proposal.zh.md`, set `translation_file` on the primary file and `translation_of: "proposal.md"` on the counterpart, and pair the rendered HTML, visual HTML, A3/A0 PDFs, and text-bearing figures. Keep sections, claims, metrics, evidence references, and figure positions aligned, using `docs/terminology-glossary.md`. Missing translations produce non-blocking warnings only and do not prevent submission, merge, or content review.
- Use real public or user-provided cleared data only.
- Read the public source registry before selecting evidence. Formal claims must rely on approved formal-ready sources or separately supplied official/cleared attachments; background-only and provisional-only sources must be labeled as such.
- Formal packages may use official or provisional boundaries. Official geometry uses `official_boundary=true` and `geometry_role="official_constraint"`. Temporary geometry uses `official_boundary=false`, `geometry_role="provisional_constraint"`, and `boundary_precision="provisional_rough"`.
- Provisional geometry must disclose precision limits and must not claim to be an official redline, but organizer data gaps alone do not block content scoring.
- Every announcement task in sections 1.3, 1.4, and 1.5 must be covered in `compliance_matrix.json`.
- Every agent-open-call task in `agent_taskbook.json` (`agent.1` through `agent.6`) must be covered in `compliance_matrix.json` and explained in `proposal.md`.
- Every mandatory professional standard must be covered in `standard_matrix.json`.
- Every required formal design depth item must be `complete` in `design_depth_matrix.json`.
- `proposal.md` must cite evidence with `[source:...]`, `[standard:...]`, `[depth:...]`, `[data:geometry/file.geojson#feature]`, and `[metric:...]`.
- `proposal.md` is the top-priority human-readable deliverable. Every chapter must explain the design intent, why the spatial move is proposed, how the GeoJSON/metrics support it, and what data gaps remain. Do not submit a matrix dump, slogan text, or generic planning prose.
- The six agent taskbook requirements must become readable proposal content: naming/Logo and identity system, 5-8 AI ecosystem cases, at least 10 scenario cards, at least 3 industry test/validation scenarios, at least 5 user personas, at least 3 AI pilgrimage landmarks or honor-display nodes, cultural narrative, and long-term global AI event/community operation.
- All agent taskbook spatial ideas must be worded as conceptual suggestions, reference schemes, or material for professional teams to deepen. Do not state them as statutory planning, approved government action, confirmed implementation, investment commitment, engineering feasibility, or parcel-level demolition/renovation conclusion.
- `proposal.md` must embed local derived figures using Markdown image syntax. Required figures are `assets/figures/site-overview.png`, `assets/figures/land-use-structure.png`, `assets/figures/key-areas.png`, `assets/figures/mobility-bluegreen.png`, and `assets/figures/metrics-evidence.png`. These figures must be generated from the same GeoJSON, metrics, matrices, and self-check state; they are for human readability and cannot replace JSON/GeoJSON as authoritative data.
- Required figures must be presentation-quality urban design diagrams, not raw GeoJSON/debug maps. Each figure needs a clear main story, visual hierarchy, title, legend, source/provisional-status note, and design annotations. Do not submit pure rectangle block diagrams, equal-weight layer dumps, unstyled GIS screenshots, or images where a provisional bbox/polygon dominates the composition.
- If provisional geometry is rectangular or rough, show it only as a low-contrast dashed/annotated constraint. The visual emphasis must be on design intent, corridors, nodes, public-space networks, key-area callouts, AI scenarios, phasing, metrics, and evidence relationships.
- Run `python3 scripts/render_proposal_html.py submissions/<agent-id>/<proposal-slug>` after manual edits to `proposal.md`. The output `report/proposal.html` must be offline, local-image-only, and must show the five required figures.
- Every feature must include `id`, `layer`, `source_type`, `confidence`, and `geometry_role`.
- Every known metric must include `status`, `value`, `unit`, `source_files`, `formula`, `confidence`, and assumptions.
- Do not use narrative text, renderings, screenshots, PDFs, OSM, news images, or bbox as the basis for formal boundaries, areas, or planning-control claims.
- `visual/index.html` must be offline static HTML. It must not load CDN resources, remote map tiles, external scripts, external fonts, iframe, form submissions, API calls, or tracking code.
- `visual/index.html` must be presentation-quality, not a raw debug page. Use clear layout, hierarchy, color legend, map/diagram composition, core metrics, task coverage, self-check state, sources, assumptions, and responsive mobile/desktop styling. It should read like a professional urban-design board or evidence dashboard, not a raw data viewer. AI agents should use design/product-design skills or equivalent visual QA before submitting.
- External visual styles must stay professional and evidence-oriented. Prefer technical schematic, subway/network map, dashboard, blueprint, corporate, minimal, editorial infographic, scientific, or UI-wireframe styles. Do not use comics, social-media cards, kawaii/cute, fantasy, pixel-art, heavy atmosphere, or purely decorative illustrations as formal core deliverables.

## Spatial Generation Protocol

Generate spatial data in this order:

1. Load trusted official `SITE_BOUNDARY`; if unavailable, load explicitly marked provisional `SITE_BOUNDARY`.
2. Load trusted official `KEY_AREA` features; if unavailable, load explicitly marked provisional `KEY_AREA` features for:
   - `zhongzhiyuan_ai_acceleration_area`
   - `beijing_ai_origin_community`
   - `dazhongsi_ai_industry_cluster`
3. Lock official/provisional/existing constraints before editing design layers. Provisional constraints must stay visibly labeled as provisional.
4. Derive `geometry/land_use.geojson` by partitioning the site boundary. Land-use polygons must cover the full submitted boundary without gaps or overlaps.
5. Derive green space, public space, buildings, roads, phasing, and AI/service nodes from the same boundary or land-use partition.
6. Recalculate metrics from generated geometry after projecting to `EPSG:4548`.
7. Generate `assets/figures/*.png`, render `report/proposal.html`, and generate `visual/index.html` from the same metrics and geometry summaries. Use `visual_style_recommendations.json` when selecting optional visual skills/styles.
8. Run contributor self-check before submitting.

Do not hand-draw adjacent polygons independently. Adjacent land-use polygons must share boundary coordinates. Do not leave unlabeled space in `land_use.geojson`.

## Professional Report Protocol

`proposal.md` must follow `templates/proposal.md` and cover:

- design basis and source inventory
- three-level scope framework
- coordinated research area industry and future-city strategy
- overall design area urban renewal at regulatory-plan urban design depth
- detailed design for all three key areas
- AI innovation ecosystem, talent profile, and AI+ scenarios
- land use, building scale, and retain/renovate/demolish/new-build logic
- traffic, rail, municipal, and public service facilities
- blue-green public space and urban character
- renewal project list, policies, and phasing
- indicators, area recomputation, and compliance matrix
- professional standard response and design depth evidence
- agent taskbook response: three positioning statements, five functions, three areas and two wings, six required tasks, scenario cards, brand identity, AI pilgrimage landmarks, cultural narrative, and long-term operations
- risk, copyright, and legal/official-claim boundaries

Short concept text is invalid for formal submission.

## Workflow

1. Read the site package and official attachments.
2. Confirm official boundary and key-area geometry are present and trusted.
3. Run `python3 scripts/scaffold_ai_submission.py submissions/<agent-id>/<proposal-slug> --stage formal --agent-id <agent-id> --agent-name "<agent name>" --proposal-title "<proposal title>"`.
4. Replace scaffold text, diagrams, metrics, design layers, offline visual, and placeholder PDFs with the actual proposal content; remove the `SCAFFOLD-DRAFT` marker.
5. Generate A3/A0 PDFs and offline `visual/index.html`.
6. Run `python3 scripts/render_proposal_html.py submissions/<agent-id>/<proposal-slug>`.
7. Run `python3 scripts/finalize_submission.py submissions/<agent-id>/<proposal-slug>`.
8. Run `python3 scripts/self_check_submission.py submissions/<agent-id>/<proposal-slug> --pr-author <agent-id>`.
9. Repair until deterministic validation, spatial review, visual packaging check, and professional evidence review all PASS.

## References

- For package authority and file roles, read `references/submission-package.md`.
- For geometry, layer, and metric rules, read `references/geometry-and-metrics.md`.
- For validation feedback format, read `references/validator-feedback.md`.
- For contributor-facing formal preparation details, read `../../docs/formal-submission-guide.md`.
