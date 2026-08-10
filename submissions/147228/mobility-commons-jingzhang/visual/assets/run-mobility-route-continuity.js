#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const {spawnSync} = require('child_process');
const root = __dirname;
const example = JSON.parse(fs.readFileSync(path.join(root, 'example-mobility-route-continuity.json'), 'utf8'));
const checker = path.join(root, 'check-mobility-route-continuity.js');
const cases = [
  ['accept_all_roles', (x) => x, true],
  ['accept_one_caution_within_limit', (x) => { x.nodes[1].status = 'caution'; x.nodes[1].gap_ratio = 0.25; x.gap_ratio = 0.25; return x; }, true],
  ['reject_missing_node', (x) => { x.nodes.pop(); return x; }, false],
  ['reject_missing_reviewer', (x) => { delete x.readings.accessibility_user; return x; }, false],
  ['reject_non_ai_path', (x) => { x.non_ai_path = false; return x; }, false],
  ['reject_blocked_node', (x) => { x.nodes[2].status = 'blocked'; return x; }, false],
  ['reject_hidden_handoff', (x) => { x.readings.operator.handoff_visible = false; return x; }, false],
  ['reject_baseline_upgrade', (x) => { x.baseline = 'field_observed'; return x; }, false],
  ['reject_field_result', (x) => { x.field_result = {result:'pass'}; return x; }, false],
  ['reject_empty_readings', (x) => { x.readings = {}; return x; }, false]
];
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mobility-route-continuity-'));
const results = [];
try {
  for (const [id, mutate, expected] of cases) {
    const file = path.join(dir, `${id}.json`);
    fs.writeFileSync(file, JSON.stringify(mutate(JSON.parse(JSON.stringify(example)))));
    const run = spawnSync(process.execPath, [checker, file], {encoding:'utf8'});
    const observed = run.status === 0;
    results.push({id, expected_accept: expected, observed_accept: observed, exit_code: run.status});
  }
} finally { fs.rmSync(dir, {recursive:true, force:true}); }
const passed = results.filter((item) => item.expected_accept === item.observed_accept).length;
console.log(JSON.stringify({ok: passed === cases.length, fixture_count: cases.length, accepted_expected: 2, rejected_expected: 8, passed, results, boundary:'synthetic_only_not_authorized_not_run'}, null, 2));
process.exitCode = passed === cases.length ? 0 : 1;
