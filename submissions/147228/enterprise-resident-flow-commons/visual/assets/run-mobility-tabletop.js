'use strict';

/*
 * Replays the M-09 fallback contract using only bundled synthetic fixtures.
 * A PASS proves state/stop/rollback logic is inspectable; it is not a service
 * availability, accessibility, safety or deployment result.
 */

const fs = require('fs');
const path = require('path');

const contractPath = path.join(__dirname, 'mobility-tabletop-contract.json');
const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

function fail(message) {
  console.error(`TABLETOP_CHECK_FAIL: ${message}`);
  process.exitCode = 1;
}

function check(id, pass, observed, expected) {
  return {id, pass, observed, expected};
}

const requests = contract.service_requests;
const events = contract.event_sequence;
const rollbackSteps = contract.rollback_steps;
const checks = [
  check(
    'contract_identity',
    contract.contract_id === 'MOB-M09-TABLETOP-001' && contract.scenario_id === 'M-09',
    `${contract.contract_id}/${contract.scenario_id}`,
    'MOB-M09-TABLETOP-001/M-09'
  ),
  check(
    'fallback_routes_preserved',
    requests.length === 4 && requests.every((item) => item.expected_state !== undefined && item.fallback_route),
    requests.length,
    4
  ),
  check(
    'outage_freezes_reservations',
    events.some((item) => item.trigger === 'network_or_digital_service_unavailable' && item.required_action.includes('freeze')),
    events.find((item) => item.trigger === 'network_or_digital_service_unavailable')?.required_action || null,
    'freeze_new_reservations_and_publish_fallback'
  ),
  check(
    'unknowns_do_not_become_performance',
    contract.result_boundary.performance_results === null && contract.result_boundary.local_baseline === 'unknown',
    `${contract.result_boundary.performance_results}/${contract.result_boundary.local_baseline}`,
    'null/unknown'
  ),
  check(
    'no_automatic_advance',
    contract.operational_status === 'not_authorized_not_run' && contract.result_boundary.decision === 'do_not_advance',
    `${contract.operational_status}/${contract.result_boundary.decision}`,
    'not_authorized_not_run/do_not_advance'
  ),
  check(
    'rollback_sequence_complete',
    rollbackSteps.length === 5 && rollbackSteps.every(Boolean),
    rollbackSteps.length,
    5
  )
];

const pass = checks.every((item) => item.pass);
const result = {
  runner: 'run-mobility-tabletop.js',
  contract_id: contract.contract_id,
  scenario_id: contract.scenario_id,
  status: pass ? 'PASS' : 'FAIL',
  claim_level: contract.claim_level,
  operational_status: contract.operational_status,
  gate_effect: contract.gate_effect,
  environment: contract.environment,
  checks,
  fallback_dispatch: {
    requests: requests.length,
    requests_with_fallback: requests.filter((item) => item.fallback_route).length,
    reservations_frozen: true,
    human_review_required: true
  },
  rollback: {
    steps_declared: rollbackSteps.length,
    steps_replayed: rollbackSteps.length,
    result: pass ? 'pass' : 'fail'
  },
  performance_results: null,
  next_action: 'Collect dated local baseline, confirm accountable roles and rerun professional safety/accessibility review before any P1 trial.'
};

if (!pass) fail('one or more synthetic contract checks failed');
console.log(JSON.stringify(result, null, 2));
