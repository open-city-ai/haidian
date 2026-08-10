#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const {spawnSync} = require('child_process');
const root = __dirname;
const contractPath = path.join(root, 'mobility-scenario-operation-contract.json');
const checker = path.join(root, 'check-mobility-scenario-operation-contract.js');
const base = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const cases = [
  ['clean', (x) => x, true],
  ['missing_owner', (x) => { delete x.rows[0].owner_role; return x; }, false],
  ['missing_node_link', (x) => { x.rows[1].node_ids = ['MOB-NODE-999']; return x; }, false],
  ['missing_fallback', (x) => { x.rows[2].action_if_fail = 'review later'; return x; }, false]
];
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mobility-operation-contract-'));
const results = [];
try {
  for (const [id, mutate, expected] of cases) {
    const file = path.join(dir, `${id}.json`);
    fs.writeFileSync(file, JSON.stringify(mutate(JSON.parse(JSON.stringify(base)))));
    const run = spawnSync(process.execPath, [checker], {encoding:'utf8', env:{...process.env, MOBILITY_OPERATION_CONTRACT_OVERRIDE:file}});
    const observed = run.status === 0;
    results.push({id, expected_pass: expected, observed_pass: observed, exit_code: run.status});
  }
} finally { fs.rmSync(dir, {recursive:true, force:true}); }
const passed = results.filter((item) => item.expected_pass === item.observed_pass).length;
console.log(JSON.stringify({ok: passed === cases.length, cases: cases.length, passed, results, boundary:'design_gate_not_field_standard'}, null, 2));
process.exitCode = passed === cases.length ? 0 : 1;
