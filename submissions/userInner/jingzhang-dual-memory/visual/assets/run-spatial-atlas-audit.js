#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = __dirname;
const atlas = JSON.parse(fs.readFileSync(path.join(root, 'proof-mile-spatial-atlas.json')));
const routes = JSON.parse(fs.readFileSync(path.join(root, 'key-area-daily-routes.json')));
const kit = JSON.parse(fs.readFileSync(path.join(root, 'building-interface-kit.json')));
const checks = [
  ['proof_mile_has_four_levels', atlas.proof_mile.length === 4],
  ['three_key_area_routes', routes.routes.length === 3],
  ['all_routes_have_ordinary_equivalent', routes.routes.every(r => r.ordinary_equivalent === true)],
  ['all_routes_are_account_free', routes.routes.every(r => r.account_required === false)],
  ['field_test_not_falsely_claimed', routes.release_test.status === 'not_field_tested'],
  ['official_controls_remain_unknown', atlas.spatial_controls.filter(c => c.status === 'unknown').length >= 3],
  ['interface_sequence_is_reversible_first', kit.rule.includes('reversible_insert')]
];
const failed = checks.filter(([, ok]) => !ok).map(([name]) => name);
const result = {artifact_id: 'DM-SPATIAL-AUDIT-V3', checked_at: '2026-08-12', checks: Object.fromEntries(checks), verdict: failed.length ? 'FAIL' : 'PASS', failed};
process.stdout.write(JSON.stringify(result, null, 2) + '\n');
process.exit(failed.length ? 1 : 0);
