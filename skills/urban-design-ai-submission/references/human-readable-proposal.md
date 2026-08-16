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

- `unknown` → "待正式数据补齐" / "pending official data"
- `provisional_constraint` → "临时约束范围（provisional constraint）"
- matrix filenames → "任务覆盖矩阵", "专业标准矩阵", or "设计深度矩阵"

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

The generated offline report renders v2 markers as quiet semantic labels. The public viewer resolves both v1 raw markers and v2 semantic markers. Consecutive legacy markers are grouped into one "N 条依据" control; the complete records remain accessible in the evidence panel.

## Chapter writing guide

Each of the 13 required chapters has a distinct focus. The table below describes what each chapter
must establish and the minimum evidence it should cite.

| # | Chinese heading | English heading | Must establish | Minimum evidence |
|---|---|---|---|---|
| 1 | 设计依据与资料清单 | Design Basis and Source List | Which official and public sources the design is built on; what data gaps exist and how they are handled | `[source:...]` for every major source; list provisional boundaries and explain the gap |
| 2 | 三层范围工作框架 | Three-Level Scope Framework | The three nested scopes (研究/总体/重点) with area figures and spatial references | `[data:geometry/site_boundary.geojson]`; area metrics from `metrics.json` |
| 3 | 统筹研究范围产业与未来城市研究 | Coordinated Research Area: Industry and Future City Research | Industry positioning, future-city hypothesis, and evidence for the AI innovation belt narrative | At least one `[source:...]` per major claim |
| 4 | 总体设计范围城市更新与控规深度城市设计 | Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design | Spatial structure, land-use layout, FAR zoning, and renewal strategy | `[data:geometry/land_use.geojson]`; FAR metrics; `[depth:overall_spatial_structure]` |
| 5 | 重点区域详细设计 | Detailed Design of Key Areas | Design intent and spatial moves for each of the three key areas | `[data:geometry/key_areas.geojson]` for each area; `[depth:three_key_area_detailed_design]` |
| 6 | AI 创新生态、人才画像与 AI+ 场景 | AI Innovation Ecosystem, Personas, and AI+ Scenarios | Scenario descriptions, persona profiles, and AI-node locations | `[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]`; scenario IDs from `compliance_matrix.json` |
| 7 | 用地、建筑规模与拆改留方案 | Land Use, Building Scale, and Retain-Renovate-Demolish Strategy | Parcel-level land-use decisions; retain/renovate/demolish rationale; floor-area targets | Land-use area metrics; `[depth:retain_renovate_demolish]` |
| 8 | 交通、轨道、市政与公共服务设施 | Transport, Rail, Municipal Infrastructure, and Public Services | Pedestrian/cycle network, metro access, road hierarchy, utility strategy | `[data:geometry/roads.geojson]`; `[depth:traffic_rail_slow_parking]` |
| 9 | 蓝绿空间、公共空间与城市风貌 | Blue-Green Network, Public Space, and Urban Character | Green-space and public-space areas, continuity strategy, character guidelines | `[data:geometry/green_space.geojson]`; `[data:geometry/public_space.geojson]`; ratio metrics |
| 10 | 更新项目清单、实施政策与分期计划 | Renewal Projects, Implementation Policy, and Phasing | Project-by-project list with phasing, cost range, and policy triggers | `[data:geometry/phasing.geojson]`; `[depth:renewal_project_list]` |
| 11 | 指标体系、面积复算与合规矩阵 | Metrics, Area Recalculation, and Compliance Matrix | All required metrics confirmed; compliance against task IDs; design-depth coverage | `[metric:...]` for each key figure; `[depth:metrics_recalculation]` |
| 12 | 风险、版权与合规说明 | Risk, Copyright, and Compliance | Risk matrix entries; copyright statement for all generated or third-party assets; data-gap acknowledgements | At least one `[source:...]` per external asset; `[depth:risk_missing_data]` |
| 13 | 参考资料 | References | Full bibliography of sources cited in the proposal | `[source:...]` IDs matching `sources.json` |

## v2 Migration Checklist

When upgrading a v1 package to v2, work through these steps in order:

1. Set `proposal_format_version: "2"` in `proposal.md` front matter.
2. Read each chapter and rewrite dense evidence runs as prose + 1–3 inline markers.
3. Move all exhaustive source/metric/ID lists to `sources.json` / `metrics.json`.
4. Confirm every required chapter has at least one evidence marker.
5. Re-run `scripts/render_proposal_html.py` to regenerate the report.
6. Run `scripts/refresh_submission_manifest.py` to update the declared hashes of the existing `ready_for_review` package.
7. Re-run `scripts/self_check_submission.py --mark-self-checked --json`.

## Common evidence-marker mistakes

- **Dump at chapter end**: moving all evidence to a list at the bottom of the chapter hides which
  claim each piece of evidence supports. Attach markers immediately after the claim.
- **Repeated identical markers**: citing the same source ID multiple times in one paragraph adds no
  information. Cite once per claim, not once per sentence.
- **Marker without prose**: a line that is only `[source:X] [standard:Y] [depth:Z]` passes the
  validator but communicates nothing to a reviewer. Every marker needs surrounding prose.
- **Wrong marker type**: `[data:...]` is for GeoJSON/CSV files; `[source:...]` is for bibliographic
  sources. Using the wrong type prevents the reviewer panel from linking correctly.
