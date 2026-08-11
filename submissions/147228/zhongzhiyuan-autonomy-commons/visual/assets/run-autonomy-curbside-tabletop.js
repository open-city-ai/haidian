#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = __dirname;
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
const contract = readJson('autonomy-curbside-tabletop-contract.json');
const evidence = readJson('autonomy-curbside-tabletop-evidence.json');
const gates = readJson('curbside-test-gates.json');
const scenarioMatrix = readJson('scenario-operation-matrix.json');
const checks = [];

function check(id, pass, observed, expected) {
  checks.push({ id, pass, observed, expected });
}

const gateIds = new Set((gates.gates || []).map((gate) => gate.id));
const contractGateIds = new Set(contract.gate_ids || []);
const fixtureIds = new Set((contract.fixtures || []).map((fixture) => fixture.id));
const scenarioIds = new Set((scenarioMatrix.rows || []).map((row) => row.scenario_id));
const declaredCheckIds = new Set((contract.acceptance_checks || []).map((item) => item.id));
const negativeReplay = contract.negative_replay || [];

function replayStopPath(fixture, replay) {
  const firesStopIf = replay.fixture_id === fixture.id &&
    replay.trigger_input &&
    replay.stop_if_token === fixture.stop_if &&
    replay.fires_stop_if === true;
  return {
    fixture_id: fixture.id,
    trigger_input: replay.trigger_input,
    fires_stop_if: firesStopIf,
    decision: firesStopIf ? 'reject_or_stop' : 'continue',
    result_status: firesStopIf ? 'not_run' : 'unknown',
    performance_results: firesStopIf ? null : 'not_evaluated'
  };
}

const negativeReplayResults = contract.fixtures.map((fixture) => {
  const replay = negativeReplay.find((item) => item.fixture_id === fixture.id) || {};
  return replayStopPath(fixture, replay);
});

check(
  'gate-linkage',
  contract.gate_ids.every((id) => gateIds.has(id)),
  contract.gate_ids,
  ['AV-T01', 'AV-T02', 'AV-T03']
);
check(
  'unknown-boundary',
  gates.gates.every((gate) => gate.baseline === 'unknown') &&
    String(gates.decision_rule).includes('unknown'),
  gates.gates.map((gate) => ({ id: gate.id, baseline: gate.baseline })),
  'all gate baselines stay unknown'
);

const traceItems = contract.acceptance_checks || [];
const traceFixtureIds = new Set();
const traceGateIds = new Set();
const traceScenarioIds = new Set();
const boundaryFields = new Set([
  ...Object.keys(contract),
  ...Object.keys(contract.boundary || {})
]);
const traceBoundaryFields = new Set();
let traceReferencesValid = true;
for (const item of traceItems) {
  for (const id of item.fixture_ids || []) {
    traceFixtureIds.add(id);
    traceReferencesValid = traceReferencesValid && fixtureIds.has(id);
  }
  for (const id of item.gate_ids || []) {
    traceGateIds.add(id);
    traceReferencesValid = traceReferencesValid && contractGateIds.has(id);
  }
  for (const id of item.scenario_ids || []) {
    traceScenarioIds.add(id);
    traceReferencesValid = traceReferencesValid && scenarioIds.has(id);
  }
  for (const field of item.boundary_fields || []) {
    traceBoundaryFields.add(field);
    traceReferencesValid = traceReferencesValid && boundaryFields.has(field);
  }
}
check(
  'declared-trace-references',
  traceReferencesValid &&
    [...traceFixtureIds].every((id) => fixtureIds.has(id)) &&
    [...traceGateIds].every((id) => gateIds.has(id)) &&
    [...traceScenarioIds].every((id) => scenarioIds.has(id)),
  { fixtures: [...traceFixtureIds], gates: [...traceGateIds], scenarios: [...traceScenarioIds] },
  'all trace references resolve'
);
check(
  'boundary-trace-references',
  traceBoundaryFields.size > 0 &&
    [...traceBoundaryFields].every((field) => boundaryFields.has(field)),
  [...traceBoundaryFields],
  'all boundary trace fields resolve'
);
check(
  'fixture-coverage',
  [...fixtureIds].every((id) => traceFixtureIds.has(id)),
  [...traceFixtureIds],
  [...fixtureIds]
);
check(
  'gate-coverage',
  [...contractGateIds].every((id) => traceGateIds.has(id)),
  [...traceGateIds],
  [...contractGateIds]
);
check(
  'scenario-coverage',
  contract.matrix_scenario_ids.every((id) => scenarioIds.has(id)) &&
    contract.matrix_scenario_ids.every((id) => traceScenarioIds.has(id)),
  { declared: contract.matrix_scenario_ids, traced: [...traceScenarioIds] },
  'all declared scenarios exist and are traced'
);
check(
  'artifact-reconciliation',
  evidence.contract_id === contract.contract_id &&
    evidence.evidence_id === contract.contract_id &&
    evidence.fixtures_replayed === contract.fixtures.length &&
    evidence.acceptance_checks_defined === contract.acceptance_checks.length &&
    evidence.rollback_steps_defined === contract.rollback_steps.length &&
    contract.gate_ids.length === gates.gates.length &&
    new Set(contract.gate_ids).size === contract.gate_ids.length &&
    new Set(contract.fixtures.map((fixture) => fixture.id)).size === contract.fixtures.length &&
    contract.matrix_scenario_ids.length === new Set(contract.matrix_scenario_ids).size &&
    [...traceScenarioIds].every((id) => contract.matrix_scenario_ids.includes(id)),
  {
    contract_id: evidence.contract_id,
    evidence_id: evidence.evidence_id,
    fixtures: evidence.fixtures_replayed,
    acceptance_checks: evidence.acceptance_checks_defined,
    rollback_steps: evidence.rollback_steps_defined,
    gates: gates.gates.length,
    scenarios: contract.matrix_scenario_ids.length
  },
  'declared artifact counts and identifiers reconcile'
);
check(
  'rollback-contract',
  contract.rollback_steps.length === 5 &&
    contract.rollback_steps.every((step) => typeof step === 'string' && step.trim().length > 0),
  contract.rollback_steps,
  'five non-empty rollback steps'
);
check(
  'negative-replay-coverage',
  negativeReplay.length === contract.fixtures.length &&
    new Set(negativeReplay.map((item) => item.fixture_id)).size === contract.fixtures.length &&
    negativeReplay.every((item) => fixtureIds.has(item.fixture_id)),
  negativeReplay.map((item) => item.fixture_id),
  [...fixtureIds]
);
check(
  'negative-replay-rejects',
  negativeReplayResults.every((item) =>
    item.fires_stop_if &&
    item.decision === 'reject_or_stop' &&
    item.result_status === 'not_run' &&
    item.performance_results === null
  ),
  negativeReplayResults,
  'every synthetic stop-if input rejects or stops without producing performance'
);
check(
  'negative-replay-evidence',
  evidence.negative_replay_replayed === negativeReplayResults.length &&
    evidence.rejection_path_observed === true &&
    Array.isArray(evidence.negative_replay) &&
    evidence.negative_replay.every((item) =>
      item.decision === 'reject_or_stop' &&
      item.result_status === 'not_run' &&
      item.performance_results === null
    ),
  {
    negative_replay_replayed: evidence.negative_replay_replayed,
    rejection_path_observed: evidence.rejection_path_observed
  },
  'evidence receipt records all four synthetic rejection paths'
);
check(
  'ordinary-route-continuity',
  contract.fixtures.some((fixture) =>
    fixture.id === 'ordinary_curb_audit' &&
    fixture.expected_action === 'preserve_manual_patrol_and_paper_signage'
  ),
  contract.fixtures.find((fixture) => fixture.id === 'ordinary_curb_audit')?.expected_action,
  'preserve_manual_patrol_and_paper_signage'
);
check(
  'accessible-stop',
  contract.fixtures.some((fixture) =>
    fixture.id === 'accessible_route_obstruction' &&
    fixture.expected_action === 'stop_automation_and_switch_to_human_only' &&
    fixture.fallback === 'manual_service_route_preserved'
  ),
  contract.fixtures.find((fixture) => fixture.id === 'accessible_route_obstruction')?.expected_action,
  'stop automation and preserve manual route'
);
check(
  'equivalent-service-stop',
  contract.fixtures.some((fixture) =>
    fixture.id === 'equivalent_service_worse' &&
    fixture.expected_action === 'hold_trial_and_keep_human_paper_phone_route' &&
    fixture.fallback === 'human_service_and_redress_preserved'
  ),
  contract.fixtures.find((fixture) => fixture.id === 'equivalent_service_worse')?.expected_action,
  'hold trial and keep human paper/phone route'
);
check(
  'network-weather-rollback',
  contract.fixtures.some((fixture) =>
    fixture.id === 'network_weather_rollback' &&
    fixture.expected_action === 'freeze_new_trials_broadcast_and_restore_ordinary_service' &&
    fixture.fallback.includes('recovery')
  ),
  contract.fixtures.find((fixture) => fixture.id === 'network_weather_rollback')?.expected_action,
  'freeze, broadcast, restore and recover'
);
check(
  'no-authorization',
  contract.operational_status === 'not_authorized_not_run' &&
    contract.boundary.authorization === 'not_authorized' &&
    evidence.operational_status === 'not_authorized_not_run',
  { contract: contract.operational_status, evidence: evidence.operational_status },
  'not_authorized_not_run'
);
check(
  'no-performance-inference',
  contract.boundary.performance_results === null &&
    evidence.performance_results === null &&
    evidence.baselines === 'unknown',
  { performance_results: evidence.performance_results, baselines: evidence.baselines },
  'null performance results and unknown baselines'
);

check(
  'declared-checks-unique',
  declaredCheckIds.size === contract.acceptance_checks.length &&
    contract.acceptance_checks.length === 7,
  [...declaredCheckIds],
  'seven uniquely identified acceptance checks'
);

const ok = checks.every((item) => item.pass);
const output = {
  runner: 'run-autonomy-curbside-tabletop.js',
  contract_id: contract.contract_id,
  ok,
  mode: 'offline_synthetic_tabletop',
  fixtures: contract.fixtures.length,
  acceptance_checks_defined: contract.acceptance_checks.length,
  checks_executed: checks.length,
  rollback_steps: contract.rollback_steps.length,
  negative_replay_replayed: negativeReplayResults.length,
  rejection_path_observed: negativeReplayResults.every((item) => item.decision === 'reject_or_stop'),
  negative_replay: negativeReplayResults,
  result_status: contract.boundary.result_status,
  operational_status: contract.operational_status,
  performance_results: contract.boundary.performance_results,
  checks
};

console.log(JSON.stringify(output, null, 2));
process.exitCode = ok ? 0 : 1;
