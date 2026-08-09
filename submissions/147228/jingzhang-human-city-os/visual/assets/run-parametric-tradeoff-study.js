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

const evidence = {
  schema_version: '0.1.0',
  generated_by: 'visual/assets/run-parametric-tradeoff-study.js',
  status: ok ? 'PASS' : 'FAIL',
  checks,
  variant_count: study.variants.length,
  formal_metric_change: false,
  interpretation_zh: 'PASS 只证明参数和面积公式可复算、基线可回接；不证明任何候选已获推荐、批准或具备实施条件。',
  interpretation_en: 'PASS proves only that parameters and area formulas replay and the baseline reconnects; it does not recommend, approve, or establish implementation readiness for any variant.'
};
fs.writeFileSync(path.join(here, 'parametric-tradeoff-study-evidence.json'), JSON.stringify(evidence, null, 2) + '\n');
console.log(JSON.stringify(evidence, null, 2));
process.exit(ok ? 0 : 1);
