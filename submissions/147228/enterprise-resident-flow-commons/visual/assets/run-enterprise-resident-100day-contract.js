#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(__dirname, 'enterprise-resident-100day-contract.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
const fail = (message) => errors.push(message);
const exact = (actual, expected, label) => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(`${label} drift`);
};

if (data.decision !== 'HOLD') fail('decision must remain HOLD');
if (data.claim_level !== 'local_synthetic_tabletop') fail('claim level must remain local_synthetic_tabletop');
if (data.boundary?.official_boundary !== false) fail('official_boundary must remain false');
if (data.boundary?.authorization !== 0) fail('authorization must remain 0');
if (data.boundary?.field_observations !== 0) fail('field_observations must remain 0');
if (data.boundary?.local_baseline !== 'unknown') fail('local_baseline must remain unknown');
if (data.boundary?.result_status !== 'not_run') fail('result_status must remain not_run');
if (data.boundary?.performance_results !== null) fail('performance_results must remain null');
if (data.boundary?.operational_status !== 'not_authorized_not_run') fail('operational_status must remain not_authorized_not_run');
if (data.boundary?.public_rank_claim !== false) fail('public_rank_claim must remain false');
if (data.boundary?.numeric_dimensions !== null) fail('numeric_dimensions must remain null');
exact(data.state_sequence, ['BASE', 'PILOT', 'BLACKOUT', 'CLOSEOUT'], 'state sequence');
exact((data.states || []).map((item) => item.id), ['BASE', 'PILOT', 'BLACKOUT', 'CLOSEOUT'], 'state ids');
if (!Array.isArray(data.spatial_nodes) || data.spatial_nodes.length !== 3) fail('three spatial nodes are required');
if (new Set((data.spatial_nodes || []).map((item) => item.area)).size !== 3) fail('spatial node areas must be unique');
const windows = data.delivery_windows || [];
exact(windows.map((item) => item.id), ['D00-07', 'D08-30', 'D31-60', 'D61-90', 'D91-100'], 'delivery window ids');
for (const window of windows) {
  if (!window.owner_role || !window.enterprise_deliverable || !window.resident_deliverable) fail(`${window.id} missing accountable deliverables`);
  if (!Array.isArray(window.evidence_required) || window.evidence_required.length < 3) fail(`${window.id} evidence is incomplete`);
  if (!Array.isArray(window.acceptance_checks) || window.acceptance_checks.length < 3) fail(`${window.id} acceptance checks are incomplete`);
  if (!Array.isArray(window.stop_if) || window.stop_if.length < 2) fail(`${window.id} stop rules are incomplete`);
  if (!window.public_receipt) fail(`${window.id} public receipt is missing`);
}
if (!Array.isArray(data.shared_review_gates) || data.shared_review_gates.length !== 5) fail('five shared review gates are required');
if (!Array.isArray(data.negative_fixtures) || data.negative_fixtures.length !== 5) fail('five negative fixtures are required');
if (!Array.isArray(data.positive_controls) || data.positive_controls.length !== 3) fail('three positive controls are required');
if (!Array.isArray(data.field_claims) || data.field_claims.length !== 0) fail('field_claims must remain empty');

if (errors.length) {
  console.error('FAIL Enterprise-resident 100-day delivery contract');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log('PASS Enterprise-resident 100-day delivery contract: 5 windows, 3 spatial nodes, 5 gates, HOLD and zero field claims');
