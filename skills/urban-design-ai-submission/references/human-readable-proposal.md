# Human-readable proposal format

Use this reference when writing, repairing, validating, or rendering `proposal.md`.

## Contract versions

- Version 2: set `proposal_format_version: "2"` in front matter. Use a human reading layer plus a complete machine-audit layer.
- Version 1: the field is absent or set to `"1"`. This is the legacy format. Existing packages remain valid and the public viewer condenses dense marker runs automatically.

Do not remove or bulk-rewrite a legacy participant's evidence merely to upgrade the format. Apply v2 when scaffolding a new package or when the author intentionally revises the narrative.

## Human reading layer

Write each required chapter so a planning professional can understand it without opening JSON:

1. State the design judgment in ordinary language.
2. Explain why it matters for this site and its users.
3. Describe the spatial move, measurable consequence, or implementation choice.
4. State any missing official data or professional follow-up in human terms.
5. Add one to three directly relevant evidence markers after the claim they support.

The sentence must remain grammatical and useful after removing its markers. Prefer:

```markdown
The proposal connects the three key areas through the heritage park slow-mobility spine, while keeping every provisional boundary visibly qualified [data:geometry/key_areas.geojson#PROV-KEY-001] [depth:three_key_area_detailed_design]
```

Do not write:

```markdown
Complete evidence index: [source:...] [source:...] [standard:...] [depth:...] [data:...] [metric:...]
```

Use readable status language in prose:

- `unknown` → “待正式数据补齐” / “pending official data”
- `provisional_constraint` → “临时约束范围（provisional constraint）”
- matrix filenames → “任务覆盖矩阵”, “专业标准矩阵”, or “设计深度矩阵”

Raw IDs and filenames may appear in code, tables intended for audit, or tool output, but they must not dominate the narrative.

## Machine-audit layer

Keep exhaustive coverage in the files designed for it:

- `sources.json`: all sources, rights, provenance, dates, limitations, and permitted uses
- `metrics.json`: all known and pending metrics, formulas, units, source files, assumptions, and confidence
- `geometry/*.geojson`: spatial evidence and stable feature IDs
- `compliance_matrix.json`: all announcement and Agent task coverage
- `standard_matrix.json`: all mandatory professional standard responses
- `design_depth_matrix.json`: all required design-depth responses
- `assumptions.json`: all missing data, provisional conditions, and recalculation triggers

The validator checks these files independently. Do not duplicate their complete indexes in `proposal.md`.

## Citation limits for v2

- Every required chapter needs at least one relevant evidence marker.
- Usually attach one to three markers to one claim.
- More than three consecutive markers is an evidence dump.
- More than eight markers in one paragraph or content block is an evidence dump.
- Break a genuinely complex passage into separate claims rather than raising the limit.

## Rendering behavior

The generated offline report renders v2 markers as quiet semantic labels. The public viewer resolves both v1 raw markers and v2 semantic markers. Consecutive legacy markers are grouped into one “N 条依据” control; the complete records remain accessible in the evidence panel.
