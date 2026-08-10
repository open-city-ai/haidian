#!/usr/bin/env node

// Boundary audit only. It does not replay the claimed Monte Carlo experiment.
// A future evidence PR may add the model inputs and a deterministic runner.

const fs = require('fs');
const path = require('path');

const packageDir = path.resolve(__dirname, '..', '..');
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(packageDir, relativePath), 'utf8'));

const metrics = readJson('metrics.json').metrics;
const gate = readJson('visual/assets/gates/04-metric-lineage.json');
const requiredUnknown = [
  'resilience_v13_monte_carlo_draws',
  'resilience_v13_selected_mean_score',
  'resilience_v13_selected_p05_score',
  'resilience_v13_selected_win_rate',
  'resilience_v13_selected_mean_regret',
  'resilience_v13_selected_min_stress_score',
  'resilience_v13_hard_gates_passed',
];

const failures = [];
if (gate.status !== 'design_target') {
  failures.push(`GATE-04 must remain design_target until the MCDA lineage is independently replayed (got ${gate.status})`);
}
for (const name of requiredUnknown) {
  const metric = metrics[name];
  if (!metric) {
    failures.push(`missing metric ${name}`);
    continue;
  }
  if (metric.status !== 'unknown' || metric.value !== null || typeof metric.reason !== 'string' || !metric.reason.trim()) {
    failures.push(`${name} must be unknown with null value and an explicit reason until inputs and runner are packaged`);
  }
}
const candidateCount = metrics.resilience_v13_candidate_count;
if (!candidateCount || candidateCount.status !== 'known' || candidateCount.value !== 5) {
  failures.push('resilience_v13_candidate_count must remain the independently readable count of S0 through S4');
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join('\n'));
  process.exit(1);
}

console.log('PASS: MCDA boundary is explicit; no numerical Monte Carlo output is claimed as independently replayed.');
