#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');
const checker = path.join(__dirname, 'check_scenario_operation_contract.js');
const contractPath = path.join(__dirname, 'scenario-operation-contract.json');
const original = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const cases = [
  ['clean', (x) => x, true],
  ['missing_owner', (x) => { x.rows[0].owner_role = ''; return x; }, false],
  ['missing_matrix_link', (x) => { x.rows[1].scenario_id = 'S99'; return x; }, false],
  ['missing_fallback', (x) => { x.rows[2].action_if_fail = 'continue automatically'; return x; }, false]
];
let passed = 0;
const results = [];
for (const [id, mutate, expected] of cases) {
  const target = path.join(require('os').tmpdir(), `autonomy-operation-contract-${id}.json`);
  fs.writeFileSync(target, JSON.stringify(mutate(JSON.parse(JSON.stringify(original)))));
  const out = spawnSync(process.execPath, [checker], {encoding: 'utf8', env: {...process.env, AUTONOMY_CONTRACT_OVERRIDE: target}});
  const observed = out.status === 0;
  const ok = observed === expected;
  if (ok) passed++;
  results.push({id, expected_pass: expected, observed_pass: observed, exit_code: out.status});
}
const report = {ok: passed === cases.length, cases: cases.length, passed, results, boundary: 'design_gate_not_field_standard'};
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.ok ? 0 : 1;
