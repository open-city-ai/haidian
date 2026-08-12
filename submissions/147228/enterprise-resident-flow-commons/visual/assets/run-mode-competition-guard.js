const fs = require('fs');
const path = require('path');

const here = __dirname;
const input = JSON.parse(fs.readFileSync(path.join(here, 'mode-competition-guard.json'), 'utf8'));
const guard = input.guard;
const requiredGuardFields = [
  'max_vehicle_km_ratio',
  'min_transit_ridership_index',
  'max_feeder_share',
  'min_worst_group_access_delta',
  'air_agents_must_be_zero'
];
const expectedScenarioIds = ['O0', 'O1', 'O2', 'O3'];
function scenarioIdentityErrors(scenarios) {
  const ids = scenarios.map((scenario) => scenario.id);
  const errors = [];
  if (ids.some((id) => typeof id !== 'string' || id.trim() === '')) errors.push('scenario_id_empty');
  if (new Set(ids).size !== ids.length) errors.push('scenario_id_duplicate');
  if (ids.some((id) => !expectedScenarioIds.includes(id))) errors.push('scenario_id_unknown');
  if (ids.length !== expectedScenarioIds.length || expectedScenarioIds.some((id) => !ids.includes(id))) errors.push('scenario_id_set_mismatch');
  return errors;
}
const identityErrors = scenarioIdentityErrors(input.scenarios);
const evaluate = (scenario) => ({
  feeder_cap: scenario.feeder_share <= guard.max_feeder_share,
  transit_displacement: scenario.transit_ridership_index >= guard.min_transit_ridership_index,
  vehicle_km: scenario.vehicle_km_ratio <= guard.max_vehicle_km_ratio,
  worst_group_access: scenario.worst_group_access_delta >= guard.min_worst_group_access_delta,
  air_gate: scenario.policy === 'air_candidate_ground_fallback'
    ? false
    : scenario.air_agents === 0 && guard.air_agents_must_be_zero === true,
  public_transport_priority: guard.public_transport_priority === true
});
const scenarioChecks = input.scenarios.map((scenario) => {
  const checks = evaluate(scenario);
  const pass = Object.values(checks).every(Boolean);
  return {
    id: scenario.id,
    name_zh: scenario.name_zh,
    name_en: scenario.name_en,
    checks,
    computed_status: pass ? 'PASS' : 'BLOCKED',
    declared_status: scenario.guard_status,
    release: scenario.release
  };
});
const fixtureResults = input.negative_fixtures.map((fixture) => {
  let scenarios = input.scenarios.map((scenario) => ({...scenario}));
  let guardFields = {...guard};
  if (fixture.mutation === 'duplicate_id') scenarios[0].id = scenarios[1].id;
  if (fixture.mutation === 'missing_o0') scenarios = scenarios.filter((scenario) => scenario.id !== 'O0');
  if (fixture.mutation === 'unknown_id') scenarios[3].id = 'O9';
  if (fixture.mutation === 'missing_guard') delete guardFields[fixture.missing_field];
  const errors = fixture.mutation === 'missing_guard'
    ? (Object.prototype.hasOwnProperty.call(guardFields, fixture.missing_field) ? [] : [fixture.expected_error])
    : scenarioIdentityErrors(scenarios);
  return {id: fixture.id, mutation: fixture.mutation, expected_error: fixture.expected_error, detected: errors.includes(fixture.expected_error)};
});
const checks = {
  required_groups_present: input.groups.length === 5 && input.groups.includes('accessible_travelers') && input.groups.includes('external_commuters'),
  mode_set_keeps_public_backbone: input.mode_set.includes('metro') && input.mode_set.includes('bus') && input.mode_set.includes('walking_accessibility'),
  hard_guard_schema_complete: requiredGuardFields.every((field) => Object.prototype.hasOwnProperty.call(guard, field)),
  four_scenarios_present: input.scenarios.length === 4,
  scenario_ids_unique_and_exact: identityErrors.length === 0,
  managed_feeder_passes: scenarioChecks.find((item) => item.id === 'O1')?.computed_status === 'PASS',
  unmanaged_feeder_fails_closed: scenarioChecks.find((item) => item.id === 'O2')?.computed_status === 'BLOCKED',
  unmanaged_feeder_declares_cause: Array.isArray(input.scenarios.find((item) => item.id === 'O2')?.blocked_by) && input.scenarios.find((item) => item.id === 'O2').blocked_by.length >= 3,
  air_candidate_blocked_with_zero_agents: scenarioChecks.find((item) => item.id === 'O3')?.computed_status === 'BLOCKED' && input.scenarios.find((item) => item.id === 'O3').air_agents === 0,
  no_field_or_authorization_claim: input.boundary.field_measurements === 0 && input.boundary.operating_authorizations === 0,
  no_satisfaction_claim: input.boundary.satisfaction_measurements === 0,
  supplemental_scope_declared: input.review_scope.classification === 'supplemental_package_screen' && input.review_scope.formal_self_check_integration === 'not_a_blocking_validator_gate',
  negative_fixtures_present: input.negative_fixtures.length >= 7 && input.negative_fixtures.filter((fixture) => fixture.mutation === 'missing_guard').every((fixture) => requiredGuardFields.includes(fixture.missing_field) && fixture.expected_error),
  identity_negative_fixtures_detected: fixtureResults.filter((fixture) => fixture.mutation !== 'missing_guard').every((fixture) => fixture.detected)
};
const passed = Object.values(checks).every(Boolean);
const output = {
  screen_id: input.screen_id,
  status: passed ? 'MODE_COMPETITION_GUARD_PASS' : 'MODE_COMPETITION_GUARD_REVIEW',
  check_count: Object.keys(checks).length,
  checks,
  scenario_checks: scenarioChecks,
  scenario_identity_errors: identityErrors,
  negative_fixture_results: fixtureResults,
  summary: {
    synthetic_population_reference: input.population_reference.value,
    group_count: input.groups.length,
    scenario_count: input.scenarios.length,
    managed_feeder: scenarioChecks.find((item) => item.id === 'O1')?.computed_status,
    unmanaged_feeder: scenarioChecks.find((item) => item.id === 'O2')?.computed_status,
    air_candidate: 'BLOCKED_GROUND_FALLBACK',
    field_measurements: input.boundary.field_measurements,
    operating_authorizations: input.boundary.operating_authorizations,
    satisfaction_measurements: input.boundary.satisfaction_measurements
  },
  review_scope: input.review_scope,
  interpretation_zh: '这是共享接驳模式竞争的合成反事实护栏回放，不是海淀客流、车公里、满意度或运营结果。',
  interpretation_en: 'This is a synthetic counterfactual guard replay for feeder-mode competition, not a Haidian ridership, vehicle-kilometre, satisfaction or operating result.'
};
fs.writeFileSync(path.join(here, 'mode-competition-guard-readout.json'), `${JSON.stringify(output, null, 2)}\n`);
if (!passed) {
  console.error(JSON.stringify(output, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(output, null, 2));
