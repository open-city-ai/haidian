# 方案迭代记录

Changelog — adaptive-flow-network

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
