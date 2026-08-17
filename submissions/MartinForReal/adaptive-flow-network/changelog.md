# 方案迭代记录

Changelog — adaptive-flow-network

## v2.1 - 2026-08-16

**Evidence-chain repair.** This revision closes the reference graph: every registered metric, source
and assumption is now reachable from a file the reviewer reads, and every reference in the three
matrices resolves. One of the changes fixes a self-contradiction the package shipped with, so it is
listed first.

### Corrected defect

- **All 44 matrix rows pointed at self-check ids that do not exist.** The scaffold ships
  `self_check.json` with the ids `BOUNDARY_TRUST` / `KEY_AREAS_TRUST` / `LAND_USE_TOPOLOGY` /
  `VISUAL_STATIC`, and points every row of `compliance_matrix.json`, `standard_matrix.json` and
  `design_depth_matrix.json` at them. Running `self_check_submission.py --mark-self-checked`
  replaces that file's `checks` array with the four gate results the runner actually produces
  (`DETERMINISTIC_VALIDATION`, `SPATIAL_REVIEW`, `VISUAL_PACKAGING`, `PROFESSIONAL_EVIDENCE`), so
  after a real self-check the intersection between the ids cited by the matrices and the ids present
  in `self_check.json` was **empty for all 44 rows**. `validate_submission.py` only checks that
  `self_check_ids` is a non-empty array of strings, so the gates stayed green while the package
  contradicted itself for anyone holding both files. Every row now cites the gates it actually rests
  on, non-uniformly (7 distinct combinations across the 23 compliance rows), and the build step
  asserts that each id resolves against the persisted `self_check.json`.

### Registered rather than asserted

- **`metrics.json` 17 → 41 entries** (34 known, 7 unknown). The 24 additions are quantities the
  package already relied on in prose or on the boards but had never registered: unit and category
  counts for land use, roads, buildings, public space and green space; the phase and constraint
  counts; and the key-area area reconciliation. Each carries `formula`, `source_files`,
  `confidence`, `assumptions` and a scope disclaimer stating it is **not a statutory planning
  indicator**.
- **Six of the additions are registered unknowns** — `total_floor_area_sqm`,
  `average_building_height_m`, `road_area_sqm`, `observed_od_load_fluctuation_cv`,
  `link_failure_observed_reroute_success_ratio`, `pedestrian_detour_penalty_measured_s`. These are
  quantities a reviewer would expect and the current public material cannot support. They are
  registered with `status: "unknown"`, `value: null` and a stated reason rather than filled in with
  an assumed value, per 「这些数据没有从当前公开资料中取得，AI agent 不得自行编造」.
- **The traceability table in the proposal is now generated from `metrics.json`** instead of a
  hard-coded list of 11 ids, so it covers all 41 and cannot drift from the registry. A second table
  lists the 7 unknowns with the reason each is unknown. All 41 are cited by `[metric:]` in both
  language versions.
- **Four new assumptions** — `A-EDGE-COUNT-001`, `A-BUILDING-INTERFACE-001`,
  `A-KEY-AREA-EXTENT-001`, `A-EMPIRICAL-GAP-001` — and every assumption now carries `category`,
  `owner`, `resolution_trigger` and explicit `blocks_formal_intake` / `blocks_content_scoring`
  flags.

### Corrected numbers

- **`backbone_road_segment_count` is 150, not 149 solver outputs.** The disclaimer now states that
  149 edges come from the solver and **1 is the authored corridor spine**, appended by hand before
  the solver loop. This is consistent with the v2.0 correction that the spine is drawn, not solved.
- **`key_area_polygon_to_announced_ratio` is declared `dimensionless`, not `ratio`.** Its value is
  1.002414, and both `spatial_review.py` and `validate_submission.py` correctly require a metric with
  `unit: "ratio"` to fall in 0..1. This quantity is not a share of a whole: it is an agreement index
  between two independently sourced areas, and it exceeds 1 whenever the provisional tracing comes
  out slightly larger than the announced figure — here by **+0.24%**. The metric says so in its own
  assumption text.

### Rows that now answer their own question

- All 23 compliance, 6 standard and 15 depth rows previously shipped byte-identical bodies apart
  from the title (7 / 1 / 1 distinct). Each row now carries a unique `evidence_summary_zh` quoting
  the specific numbers it rests on, interpolated from `metrics.json` at build time so the prose
  cannot drift, plus row-specific section, layer, drawing, figure, source and assumption references.
  Distinct evidence bodies: **23 / 6 / 15**.
- Coverage after the rewrite: **41/41 metrics, 30/30 sources and 10/10 assumptions** are cited by at
  least one matrix row; **0 dangling references** of any kind, verified against the shipped files
  after `self_check_submission.py` rewrites `self_check.json`.

Boundary conditions are unchanged: the boundary and the three key areas remain provisional, no
statutory control figure is inferred from the corridor 控规 having 「通过技术审查」, and every spatial
proposal remains a concept suggestion rather than an approval conclusion.

## v2.0 - 2026-08-16

**Correctness repair.** This revision follows a self-audit of the version merged in PR #2808. It
corrects defects found by executing the harness rather than reading it. Three of the changes
invalidate claims the previous version made, so they are listed first.

### Corrected claims

- **Removed "网络不是画出来的，是解出来的" / "The network is solved, not drawn."**
  It was false as implemented. The corridor spine is *drawn*: it links the three key-area centroids
  ordered by latitude, and edges inside its 118 m buffer are assigned resistance 0.18. The backbone is
  then a resistance-weighted shortest path over that surface, so it necessarily follows the drawn line.
  The proposal now separates what is drawn from what is solved before making any method claim.

- **Removed the unqualified claim that the γ≥1 branch "converges to a hierarchical tree."**
  The solver applied its Tikhonov term to node 0 only. Once winner-take-all drove most conductances
  toward zero the graph fragmented, every component not containing node 0 produced a singular block,
  `splu` raised, and a bare `except RuntimeError` fell through to `lsqr` — a least-squares vector, not
  a Kirchhoff potential. Most of the shipped backbone iterations ran on that fallback and the sup-norm
  step never settled. The term is now applied to all N nodes: 0 solver fallbacks, final step 6.14e-09
  (was 7.65e-03), under a second instead of 319 s, and the winner-take-all signature is preserved
  (1567/1820 edges at exactly zero). Convergence is now *reported as measured*, not claimed — the
  published proof covers single source-sink, unit-exponent, continuous-time dynamics and does not
  cover this multi-terminal, multi-scenario, discretely stepped model. Recorded as `A-CONVERGENCE-001`.

- **Stated the RNG = Gabriel degeneracy.** On a regular 140 m grid the relative-neighbourhood lune
  test and the Gabriel disk test tie exactly, so both return an identical 1820-edge set. The Toussaint
  hierarchy collapses to MST < RNG = Gabriel < Delaunay. The benchmark is three baselines, not four.

### Benchmark repairs

All rows are now produced by one scorer version in a single run; the previous table mixed a superseded
scorer for the baselines with a separately patched row for the shipped design.

- **Matched attack rule.** Every network is now attacked highest-edge-betweenness first, with a 5-draw
  random-order mean also reported. Previously only this design received a targeted conductance-ranked
  attack while baselines fell through to a row-major spatial peel, which is not a comparison.
- **Frozen denominator.** The largest-connected-component share is now divided by the node count
  measured before any removal; recomputing it after removal made shedding nodes into isolation free.
- **Removal sweep runs to completion.** The old `range(12)` at `dx=1/12` stopped at 11/12 of the edges,
  capping the statistic at 0.9167 — exactly what RNG, Gabriel and Delaunay all reported. Those three
  numbers were the metric's arithmetic ceiling, not a measurement. Now 21 steps to full removal.
- **Loop count** uses `k − n + C` with the real component count, replacing a formula that assumed C = 1.
- **γ sweep selection** is rank-based (strongest K edges) rather than a value quantile, which
  degenerates once a large mass of conductances is exactly zero.

Result: under one matched rule the design scores 0.399 against Delaunay's 0.643. **Delaunay is still
better on failure resilience and the proposal says so.** The defensible statement is the cost ratio —
roughly 62% of Delaunay's attack tolerance for 18.7% of its edges and 11.9% of its total length.
`cheaper_per_covered_node_than_mst` is published as **false** (199 vs 140 m per covered node).

The phenotype claim is now demonstrated rather than asserted: at γ=0.72, L/N = 0.411 with zero
zero-conductance edges; at γ=1.35, L/N = 0.067 with 1567/1820 at zero. One equation, only γ changed.

### Evidence layer

- **sources.json 21 → 30 entries**, 24 with a canonical URL resolved before registering, across
  8 distinct non-`.cn` institutional hosts. Every method citation now carries a DOI, publisher,
  publication date, `accessed_date`, and a `not_usable_for` blocklist stating what it may **not** be
  used to claim. Wikipedia was replaced by the Seoul Metropolitan Government's own page for the
  Sangam DMC case; the remaining secondary citation is labelled as such.
- **Scenario stop and rollback table added** — for all 12 cards: accountable human role, the non-AI
  equivalent path that must stay available, minimum necessary data, who is entitled to stop it, and
  what is restored when it stops.
- **agent.1–agent.6 compliance rows** now cite task-specific sections, layers, metrics and sources
  instead of the scaffold's identical body (23 identical evidence bodies → 7 distinct).
- **New section on the limits of biomimetic legitimacy**, citing the empirical finding that the
  "biomimetic" label does not by itself raise perceived sustainability, and the STS critique of
  "direct access to nature". Biology is used as a source of falsifiable hypotheses, not as justification.

### Unchanged

No FAR, building height, demolition-vs-retention, road redline or engineering-implementation
conclusion is stated anywhere. `floor_area_ratio` remains `status: unknown`. The site boundary remains
provisional; the corridor 控规 has passed technical review (通过技术审查), which is not approval, and
no statutory control figure is inferred from it.
