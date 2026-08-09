# Fact Pack Provisional Formal Intake Rehearsal

Date: 2026-06-07

## Result

Using the current public repository as a new participant, I generated a new `formal` AI package with the processed agent fact pack as the first reading layer.

This document records the former boundary-gated behavior. Under the current rule, provisional geometry remains a precision warning but does not block content scoring. An untouched generated scaffold is still invalid until its content and drawings are replaced and `finalize_submission.py` succeeds.

## Generated Package

- `submissions/codex-final/jingzhang-ai-symbiotic-rail/proposal.md`
- `submissions/codex-final/jingzhang-ai-symbiotic-rail/report/proposal.html`
- `submissions/codex-final/jingzhang-ai-symbiotic-rail/visual/index.html`
- `submissions/codex-final/jingzhang-ai-symbiotic-rail/assets/figures/*.png`
- `submissions/codex-final/jingzhang-ai-symbiotic-rail/geometry/*.geojson`

## What Changed In This Rehearsal

The scaffolded proposal now explicitly reads and cites:

- `data/processed/agent_fact_pack.md`
- `data/processed/project_scope_summary.csv`
- `data/processed/agent_task_requirements.csv`
- `data/processed/source_use_matrix.csv`
- `data/processed/missing_data_checklist.csv`

The generated `proposal.md` includes `[source:PROCESSED-FACT-PACK]` and explains that the processed fact pack is a navigation layer, not a new authority source. The `sources.json` file also records `PROCESSED-FACT-PACK`, so the deterministic validator can confirm the source is discussed in the human-readable narrative.

## Self-Check Summary

Command:

```bash
python3 scripts/self_check_submission.py \
  submissions/codex-final/jingzhang-ai-symbiotic-rail \
  --pr-author codex-final \
  --json
```

Result:

- Overall self-check: PASS.
- Deterministic validation: PASS.
- Spatial review: PASS.
- Visual packaging check: PASS.
- Professional evidence review: PASS.
- `can_enter_formal_review`: false.

Expected warnings:

- `geometry/site_boundary.geojson` uses provisional boundary.
- `geometry/key_areas.geojson` contains three provisional key areas.

The transcript above records the former boundary-gated result. Under the current rule, these warnings do not block intake or content scoring; they must stay visible until official geometry is supplied and precision-sensitive metrics are recalculated.

## Maintainer Review Summary

Command:

```bash
python3 scripts/maintainer_review.py \
  submissions/codex-final/jingzhang-ai-symbiotic-rail \
  --pr-author codex-final \
  --comment
```

Historical result:

```text
Recommendation: intake-provisional
Can enter formal professional scoring: NO
deterministic_validation: PASS
spatial_review: PASS
visual_review: PASS
professional_review: PASS
```

Current expected result for the same participant-controlled checks is:

```text
Recommendation: formal-review-ready
Can enter formal professional scoring: YES
```

The change does not treat provisional geometry as authoritative. It separates the organizer-owned data limitation from participant-controlled readiness defects.

## Gallery Integration

Historical gallery result after maintainer-style index generation:

```bash
python3 scripts/generate_submissions_data.py
python3 scripts/generate_submissions_data.py --check
node --check submissions-data.js
```

The new proposal appears in `submissions-data.js` with:

```text
statusKey: intake_provisional
status: 临时边界 intake
visualUrl: submissions/codex-final/jingzhang-ai-symbiotic-rail/visual/index.html
proposalUrl: submissions/codex-final/jingzhang-ai-symbiotic-rail/report/proposal.html
```

Under the current rule, the corresponding current status is `formal_review_ready`; the retained limitation is shown to reviewers without downgrading the gallery status.

## Remaining Issues

The flow is now walkable for content scoring, while the project still needs official or cleared data for authoritative geometry and precision-sensitive recalculation:

- Official overall design area polygon.
- Official coordinated research area polygon.
- Official key detailed design area polygon.
- Three official key-area polygons.
- Regulatory controls, road redlines, ownership, existing building data, municipal and safety conditions, and heritage-control boundaries.

Until these are available, provisional geometry must remain visibly qualified and all precision-sensitive metrics must be recalculated later. The organizer data gap itself does not block content scoring.
