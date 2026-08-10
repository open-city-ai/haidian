#!/usr/bin/env node
/* Ten deterministic fixtures: two accepted, eight fail-closed. */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const {spawnSync} = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const checker = path.join(__dirname, 'check_public_route_continuity.js');
const example = JSON.parse(fs.readFileSync(path.join(__dirname, 'example-public-route-continuity.json'), 'utf8'));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'autonomy-route-continuity-'));
const fixtures = [];
const add = (id, mutate, expected) => { const r = JSON.parse(JSON.stringify(example)); mutate(r); fixtures.push({id, record:r, expected}); };
add('accept_all_roles', () => {}, true);
add('accept_one_nonblocking_gap_within_fixture_limit', (r) => { r.readings[0].route_state = 'caution'; }, true);
add('reject_missing_node', (r) => { r.node_ids.pop(); }, false);
add('reject_missing_accessibility_reader', (r) => { r.readings = r.readings.filter((x) => x.reviewer_class !== 'accessibility_user'); }, false);
add('reject_non_ai_path', (r) => { r.non_ai_path_available = false; }, false);
add('reject_route_block', (r) => { r.readings[3].route_state = 'blocked'; }, false);
add('reject_handoff_not_visible', (r) => { r.readings[4].handoff_visible = false; }, false);
add('reject_baseline_upgrade', (r) => { r.baseline = 'known'; }, false);
add('reject_field_result', (r) => { r.field_result = {result: 'pass'}; }, false);
add('reject_empty_readings', (r) => { r.readings = []; }, false);
let passed = 0;
const results = [];
for (const fixture of fixtures) {
  const target = path.join(tmp, `${fixture.id}.json`);
  fs.writeFileSync(target, JSON.stringify(fixture.record));
  const out = spawnSync(process.execPath, [checker, target], {encoding: 'utf8'});
  const parsed = out.stdout.trim() ? JSON.parse(out.stdout) : {ok: false, parse_error: out.stderr};
  const ok = Boolean(parsed.ok) === fixture.expected;
  if (ok) passed++;
  results.push({id: fixture.id, expected_accept: fixture.expected, observed_accept: Boolean(parsed.ok), exit_code: out.status});
}
const report = {ok: passed === fixtures.length, fixture_count: fixtures.length, accepted_expected: 2, rejected_expected: 8, passed, results, boundary: 'synthetic_only_not_authorized_not_run'};
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.ok ? 0 : 1;
