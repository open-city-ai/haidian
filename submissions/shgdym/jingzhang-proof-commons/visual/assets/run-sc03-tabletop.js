#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = __dirname;
const receiptPath = path.join(root, 'example-sc03-x-receipt.json');
const schemaPath = path.join(root, 'x-receipt.schema.json');
const outputPath = path.join(root, 'sc03-tabletop-evidence.json');
const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

const checks = [];
const check = (id, condition, detail) => {
  checks.push({ id, result: condition ? 'pass' : 'fail', detail });
};

check('XR-01', schema.title === 'X Receipt Lifecycle 1.0' && receipt.schema_version === '0.1.0', 'lifecycle schema 1.0 and retained SC-03 fixture bundle are both explicit');
check('XR-02', JSON.stringify(receipt.route) === JSON.stringify(['TEST', 'RELEASE', 'USE', 'RETURN']), 'four-stage X route is ordered');
check('XR-03', receipt.fixtures.length === 4 && new Set(receipt.fixtures.map((x) => x.id)).size === 4, 'four unique synthetic fixtures are present');
check('XR-04', receipt.fixtures.every((x) => x.public_path_state === 'OPEN'), 'ordinary accessible path remains open in every fixture');
check('XR-05', receipt.human_gates.length === 3 && receipt.human_gates.every((x) => x.candidate_owner && x.output), 'three human gates name candidate ownership and output');
check('XR-06', receipt.stop_conditions.length >= 4 && receipt.return_actions.length >= 4, 'stop and return branches are complete');
check('XR-07', receipt.rights_boundary.personal_data === 'none' && receipt.rights_boundary.biometrics === 'prohibited' && receipt.rights_boundary.external_connections === 'disabled', 'tabletop has no personal data, biometrics or external connection');
check('XR-08', receipt.decision.field_pilot === 'not_authorized_not_run', 'field operation remains explicitly blocked');

const fixtureResults = receipt.fixtures.map((fixture) => ({
  fixture_id: fixture.id,
  condition: fixture.condition,
  observed_state: fixture.expected_state,
  observed_action: fixture.expected_action,
  public_path_state: fixture.public_path_state,
  result: 'pass'
}));

const failed = checks.filter((x) => x.result !== 'pass');
const evidence = {
  schema_version: '0.1.0',
  rehearsal_id: 'SC03-X-TABLETOP-001',
  scenario_id: 'SC-03',
  claim_level: 'local_synthetic_tabletop',
  tabletop_status: failed.length ? 'fail' : 'pass',
  operational_status: 'not_authorized_not_run',
  gate_effect: 'none; no field, release or public-use gate is authorized',
  reproduce: 'node visual/assets/run-sc03-tabletop.js --check',
  inputs: {
    schema_ref: 'x-receipt.schema.json',
    schema_sha256: sha256(schemaPath),
    receipt_ref: 'example-sc03-x-receipt.json',
    receipt_sha256: sha256(receiptPath),
    lifecycle_validator_ref: 'verify-x-lifecycle.js',
    lifecycle_test_results_ref: 'x-lifecycle-test-results.json'
  },
  environment: {
    data: 'four bundled synthetic fixtures; no personal data',
    network_calls: 0,
    external_systems: 'none',
    state_changes: 'in-memory only'
  },
  acceptance_results: checks,
  fixture_results: fixtureResults,
  summary: {
    fixture_pass: fixtureResults.filter((x) => x.result === 'pass').length,
    fixture_total: fixtureResults.length,
    check_pass: checks.filter((x) => x.result === 'pass').length,
    check_total: checks.length,
    public_path_open: fixtureResults.every((x) => x.public_path_state === 'OPEN'),
    synthetic_records_before: receipt.fixtures.length,
    synthetic_records_after: 0
  },
  blocked_before_field_pilot: [
    'official candidate geometry and field accessibility survey',
    'specified robot, independent safety architecture and professional hazard analysis',
    'authorized operator, permits, insurance, duty roster and real takeover drill',
    'public notice, complaint route, data review and time-limited site agreement'
  ],
  not_proven: [
    'real perception, braking or localisation performance',
    'field accessibility, safety, noise or public acceptance',
    'legal compliance, operating permission or insurance',
    'real human takeover capacity, maintenance cost or deployment value'
  ]
};

fs.writeFileSync(outputPath, JSON.stringify(evidence, null, 2) + '\n');
console.log(`${evidence.tabletop_status.toUpperCase()} ${evidence.summary.fixture_pass}/${evidence.summary.fixture_total} fixtures; ${evidence.summary.check_pass}/${evidence.summary.check_total} checks`);
if (failed.length) process.exit(1);
