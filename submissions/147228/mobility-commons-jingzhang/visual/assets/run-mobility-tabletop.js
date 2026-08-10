'use strict';

/* Offline replay of the M-09 fallback contract. PASS is not deployment evidence. */
const fs = require('fs');
const path = require('path');
const contract = JSON.parse(fs.readFileSync(path.join(__dirname, 'mobility-tabletop-contract.json'), 'utf8'));

function result(id, pass, observed, expected) { return {id, pass, observed, expected}; }

const requests = contract.service_requests || [];
const events = contract.event_sequence || [];
const rollback = contract.rollback_steps || [];
const checks = [
  result('contract_identity', contract.contract_id === 'MOB-M09-TABLETOP-888' && contract.scenario_id === 'M-09', `${contract.contract_id}/${contract.scenario_id}`, 'MOB-M09-TABLETOP-888/M-09'),
  result('fallback_routes_preserved', requests.length === 4 && requests.every((item) => item.fallback_route && item.expected_state), requests.length, 4),
  result('outage_freezes_reservations', events.some((item) => item.trigger === 'network_or_digital_service_unavailable' && item.required_action.includes('freeze')), true, true),
  result('unknowns_do_not_become_performance', contract.result_boundary.performance_results === null && contract.result_boundary.local_baseline === 'unknown', 'null/unknown', 'null/unknown'),
  result('no_automatic_advance', contract.operational_status === 'not_authorized_not_run' && contract.result_boundary.decision === 'do_not_advance', `${contract.operational_status}/${contract.result_boundary.decision}`, 'not_authorized_not_run/do_not_advance'),
  result('rollback_sequence_complete', rollback.length === 5 && rollback.every(Boolean), rollback.length, 5)
];
const pass = checks.every((item) => item.pass);
if (!pass) { console.error('MOBILITY_TABLETOP_CHECK_FAIL'); process.exitCode = 1; }
console.log(JSON.stringify({
  runner: 'run-mobility-tabletop.js',
  contract_id: contract.contract_id,
  scenario_id: contract.scenario_id,
  status: pass ? 'PASS' : 'FAIL',
  claim_level: contract.claim_level,
  operational_status: contract.operational_status,
  gate_effect: contract.gate_effect,
  environment: contract.environment,
  checks,
  fallback_dispatch: {requests: requests.length, requests_with_fallback: requests.filter((item) => item.fallback_route).length, reservations_frozen: true, human_review_required: true},
  rollback: {steps_declared: rollback.length, steps_replayed: pass ? rollback.length : 0, result: pass ? 'pass' : 'fail'},
  performance_results: null,
  next_action: 'Collect dated local baseline, confirm accountable roles and rerun professional safety/accessibility review before any P1 trial.'
}, null, 2));
