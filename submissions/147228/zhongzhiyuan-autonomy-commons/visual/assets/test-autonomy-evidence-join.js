#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const {spawnSync} = require('child_process');

const packageRoot = path.resolve(__dirname, '..', '..');
const checker = path.join(__dirname, 'check-autonomy-evidence-join.js');
const requiredFiles = [
  'visual/assets/autonomy-readiness-register.json',
  'visual/assets/autonomous-scenarios.json',
  'visual/assets/scenario-operation-matrix.json',
  'visual/assets/curbside-test-gates.json',
  'visual/assets/autonomy_nodes.json',
  'visual/assets/autonomy-spatial-chain.json',
  'visual/assets/autonomy-node-interface-plans.json',
  'visual/assets/autonomy-curbside-tabletop-contract.json',
  'visual/assets/autonomy-curbside-tabletop-evidence.json',
  'geometry/key_areas.geojson',
  'visual/assets/run-autonomy-curbside-tabletop.js'
];

const copyFixture = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'autonomy-evidence-join-'));
  for (const rel of requiredFiles) {
    const target = path.join(root, rel);
    fs.mkdirSync(path.dirname(target), {recursive: true});
    fs.copyFileSync(path.join(packageRoot, rel), target);
  }
  return root;
};

const run = (mutate) => {
  const root = copyFixture();
  try {
    mutate(root);
    const result = spawnSync(process.execPath, [checker], {
      encoding: 'utf8',
      env: {...process.env, AUTONOMY_JOIN_ROOT: root}
    });
    return {pass: result.status === 0, exit_code: result.status};
  } finally {
    fs.rmSync(root, {recursive: true, force: true});
  }
};

const load = (root, rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const write = (root, rel, value) => fs.writeFileSync(path.join(root, rel), `${JSON.stringify(value, null, 2)}\n`);
const cases = [
  ['clean', () => {}, true],
  ['missing_matrix_link', (root) => {
    const value = load(root, 'visual/assets/autonomy-readiness-register.json');
    value.cards[0].matrix_row_ref = 'S99';
    write(root, 'visual/assets/autonomy-readiness-register.json', value);
  }, false],
  ['node_chain_mismatch', (root) => {
    const value = load(root, 'visual/assets/autonomy-spatial-chain.json');
    value.node_cards[0].node_feature_ref = 'visual/assets/autonomy_nodes.json#AUTO-NODE-999';
    write(root, 'visual/assets/autonomy-spatial-chain.json', value);
  }, false],
  ['missing_gate_receipt_binding', (root) => {
    const value = load(root, 'visual/assets/autonomy-curbside-tabletop-contract.json');
    value.gate_ids = value.gate_ids.filter((id) => id !== 'AV-T03');
    write(root, 'visual/assets/autonomy-curbside-tabletop-contract.json', value);
  }, false],
  ['missing_key_area', (root) => {
    const value = load(root, 'visual/assets/autonomy-spatial-chain.json');
    value.node_cards[0].key_area_feature_ref = 'geometry/key_areas.geojson#PROV-KEY-999';
    write(root, 'visual/assets/autonomy-spatial-chain.json', value);
  }, false]
];

const results = cases.map(([id, mutate, expected_pass]) => {
  const observed = run(mutate);
  return {id, expected_pass, observed_pass: observed.pass, exit_code: observed.exit_code};
});
const passed = results.filter((item) => item.expected_pass === item.observed_pass).length;
const report = {ok: passed === results.length, cases: results.length, passed, results, boundary: 'package-reference-check_only_not_field_evidence'};
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.ok ? 0 : 1;
