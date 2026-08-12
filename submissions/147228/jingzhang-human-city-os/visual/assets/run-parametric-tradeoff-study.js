#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const here = __dirname;
const study = JSON.parse(fs.readFileSync(path.join(here, 'parametric-tradeoff-study.json'), 'utf8'));
const metrics = JSON.parse(fs.readFileSync(path.join(here, '../../metrics.json'), 'utf8')).metrics;
const tolerance = 1e-6;
const checks = [];
let ok = true;

function check(id, pass, detail) {
  checks.push({ id, status: pass ? 'PASS' : 'FAIL', detail });
  if (!pass) ok = false;
}

const site = study.input_contract.site_area_sqm;
check('SITE_AREA_MATCH', Math.abs(site - metrics.site_area_sqm.value) <= tolerance, `study=${site}; metrics=${metrics.site_area_sqm.value}`);
for (const variant of [{ variant_id: 'baseline_reproduction', shares: study.baseline_reproduction.shares, areas: null }, ...study.variants]) {
  const sum = Object.values(variant.shares).reduce((a, b) => a + b, 0);
  check(`${variant.variant_id}_SHARES_SUM`, Math.abs(sum - 1) <= 1e-9, `sum=${sum}`);
  if (variant.areas) {
    for (const band of study.bands) {
      const expected = variant.shares[band.id] * site;
      const actual = variant.derived_area_sqm[band.id];
      check(`${variant.variant_id}_${band.id}_AREA`, Math.abs(expected - actual) <= 1, `expected=${expected.toFixed(3)}; actual=${actual}`);
    }
  }
}
check('BASELINE_HUMAN_MATCH', Math.abs(study.baseline_reproduction.shares.human_community - metrics.community_retention_support_area_ratio.value) <= 1e-6, 'LU-H01 share returns to the current metric');
check('BASELINE_REVERSIBLE_MATCH', Math.abs(study.baseline_reproduction.shares.reversible_meanwhile - metrics.reversible_space_ratio.value) <= 1e-6, 'LU-B01 share returns to the current metric');
check('VARIANT_COUNT', study.variants.length === 3, `variants=${study.variants.length}`);
check('BOUNDARY_DECLARED', study.status === 'conceptual_scenario_study' && study.confidence === 'low', `status=${study.status}; confidence=${study.confidence}`);
const objectiveFns = {
  human_floor: (s) => 0.5 * s.human_community + 0.3 * s.learning_data + 0.2 * s.reversible_meanwhile,
  machine_callability: (s) => s.api_embodied + 0.5 * s.learning_data + 0.5 * s.international_opc,
  reversible_resilience: (s) => s.reversible_meanwhile + s.green_resilience,
  public_access: (s) => s.human_community + 0.4 * s.international_opc + 0.3 * s.green_resilience
};
const objectiveIds = (study.objective_lenses || []).map((lens) => lens.objective_id);
check('OBJECTIVE_LENS_COUNT', objectiveIds.length === 4 && objectiveIds.every((id) => typeof objectiveFns[id] === 'function'), `lenses=${objectiveIds.join(',')}`);
for (const variant of study.variants) {
  for (const lens of study.objective_lenses || []) {
    const expected = objectiveFns[lens.objective_id]?.(variant.shares);
    const actual = variant.objective_scores?.[lens.objective_id];
    check(`${variant.variant_id}_${lens.objective_id}_OBJECTIVE`, Number.isFinite(expected) && Math.abs(expected - actual) <= 1e-6, `expected=${expected?.toFixed(6)}; actual=${actual}`);
    check(`${variant.variant_id}_${lens.objective_id}_FLOOR`, actual >= lens.minimum_comparison_floor, `score=${actual}; floor=${lens.minimum_comparison_floor}`);
  }
}
function dominates(a, b) {
  const scoresA = a.objective_scores || {};
  const scoresB = b.objective_scores || {};
  const allAtLeast = objectiveIds.every((id) => scoresA[id] >= scoresB[id]);
  const oneHigher = objectiveIds.some((id) => scoresA[id] > scoresB[id]);
  return allAtLeast && oneHigher;
}
const dominatedPairs = [];
for (const a of study.variants) for (const b of study.variants) {
  if (a.variant_id !== b.variant_id && dominates(a, b)) dominatedPairs.push(`${a.variant_id}>${b.variant_id}`);
}
check('PARETO_NON_DOMINATED', dominatedPairs.length === 0, dominatedPairs.length ? dominatedPairs.join(',') : 'all three candidates remain non-dominated across four lenses');

// Make the trade-off legible without turning a conceptual share into a formal
// metric.  Each delta is derived from the existing baseline shares and the
// existing variant areas; no new geometry, target, or performance result is
// introduced.
const decisionDiffBands = ['human_community', 'reversible_meanwhile', 'api_embodied'];
const decisionDiff = study.variants.map((variant) => ({
  variant_id: variant.variant_id,
  compared_to: 'baseline_reproduction',
  bands: decisionDiffBands.map((band) => ({
    band,
    baseline_share: study.baseline_reproduction.shares[band],
    variant_share: variant.shares[band],
    share_delta: Number((variant.shares[band] - study.baseline_reproduction.shares[band]).toFixed(9)),
    baseline_area_sqm: Number((study.baseline_reproduction.shares[band] * site).toFixed(3)),
    variant_area_sqm: variant.derived_area_sqm[band],
    derived_area_sqm_delta: Number((variant.derived_area_sqm[band] - study.baseline_reproduction.shares[band] * site).toFixed(3)),
    status: 'conceptual_comparison_only'
  }))
}));

const evidence = {
  schema_version: '0.1.0',
  generated_by: 'visual/assets/run-parametric-tradeoff-study.js',
  status: ok ? 'PASS' : 'FAIL',
  checks,
  variant_count: study.variants.length,
  objective_lens_count: objectiveIds.length,
  pareto_status: dominatedPairs.length === 0 ? 'all_non_dominated' : 'dominated_candidate_found',
  decision_diff: decisionDiff,
  formal_metric_change: false,
  interpretation_zh: 'PASS 只证明参数、面积公式、四个比较镜头和非支配关系可复算、基线可回接；不证明任何候选已获推荐、批准或具备实施条件。',
  interpretation_en: 'PASS proves only that parameters, area formulas, four comparison lenses, and non-dominance replay and the baseline reconnects; it does not recommend, approve, or establish implementation readiness for any variant.'
};
fs.writeFileSync(path.join(here, 'parametric-tradeoff-study-evidence.json'), JSON.stringify(evidence, null, 2) + '\n');
console.log(JSON.stringify(evidence, null, 2));
process.exit(ok ? 0 : 1);
