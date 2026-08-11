const fs = require('fs');
const path = require('path');

const here = __dirname;
const packageRoot = path.resolve(here, '..', '..');
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(packageRoot, rel), 'utf8'));
const contract = readJson('visual/assets/ai-era-ordinary-journey-contract.json');
const scenarioCards = readJson('visual/assets/scenario-cards.json');
const personas = readJson('visual/assets/personas-and-fairness.json');
const geojsonFiles = [
  'geometry/constraints.geojson',
  'geometry/public_space.geojson',
  'geometry/land_use.geojson',
  'geometry/phasing.geojson'
];

const featureIds = new Set();
for (const rel of geojsonFiles) {
  for (const feature of readJson(rel).features || []) featureIds.add(feature.id);
}
const scenarioById = new Map((scenarioCards.cards || []).map((card) => [card.card_id, card]));
const personaIds = new Set((personas.personas || []).map((persona) => persona.persona_id));
const fixtures = contract.fixtures || [];
const routes = contract.route_bindings || [];
const acceptanceIds = new Set((contract.acceptance_checks || []).map((item) => item.id));
const fixtureIds = new Set(fixtures.map((item) => item.fixture_id));
const routeIds = new Set(routes.map((item) => item.route_id));
const journeySteps = contract.journey_steps || [];
const rollbackSteps = contract.rollback_steps || [];
const requiredAcceptanceIds = new Set(contract.trace_requirements.required_acceptance_ids || []);
const requiredJourneyStepIds = new Set(contract.trace_requirements.required_journey_step_ids || []);
const requiredRollbackStepIds = new Set(contract.trace_requirements.required_rollback_step_ids || []);

const unique = (items) => new Set(items).size === items.length;
const coversAll = (actual, expected) => expected.every((item) => actual.has(item));
const results = [];
const result = (id, pass, observed, expected) => results.push({ id, pass, observed, expected });

const routeReferencesResolve = routes.length === 4 && routes.every((route) => {
  const card = scenarioById.get(route.scenario_id);
  return Boolean(card) &&
    routeIds.has(route.route_id) &&
    route.persona_ids.every((id) => personaIds.has(id)) &&
    featureIds.has(route.phase_id) &&
    route.spatial_refs.every((id) => featureIds.has(id)) &&
    route.spatial_refs.every((id) => (card.spatial_refs || []).includes(id));
});
result('route_trace_references', routeReferencesResolve, routes.map((route) => route.route_id), 'four routes resolve to scenario cards, personas, phase features, and spatial features');

const fixtureReferencesResolve = fixtures.length === 8 && fixtures.every((fixture) => {
  return routeIds.has(fixture.route_id) && fixture.input && fixture.expected_decision;
});
result('fixture_contract', fixtureReferencesResolve, fixtures.length, 8);

const acceptanceReferencesResolve = (contract.acceptance_checks || []).every((item) => item.id && item.check && item.fixture_ids.every((id) => fixtureIds.has(id)));
result('acceptance_trace_references', acceptanceReferencesResolve, acceptanceIds.size, 'six unique acceptance checks with resolvable fixtures');
result('acceptance_ids_unique', unique([...acceptanceIds]) && acceptanceIds.size === 6, [...acceptanceIds], 'six unique acceptance-check IDs');

const journeyAcceptanceIds = new Set(journeySteps.flatMap((step) => step.acceptance_ids || []));
const journeyFixtureIds = new Set(journeySteps.flatMap((step) => step.fixture_ids || []));
const journeyTrace = journeySteps.length === 5 &&
  unique(journeySteps.map((step) => step.id)) &&
  journeySteps.every((step) => step.id && step.action && step.fixture_ids.every((id) => fixtureIds.has(id)) && step.acceptance_ids.every((id) => acceptanceIds.has(id))) &&
  coversAll(new Set(journeySteps.map((step) => step.id)), [...requiredJourneyStepIds]) &&
  coversAll(journeyAcceptanceIds, [...requiredAcceptanceIds]);
result('journey_trace_references', journeyTrace, { steps: journeySteps.length, fixtures: journeyFixtureIds.size, acceptance_checks: journeyAcceptanceIds.size }, 'five unique steps cover all six acceptance checks');

const rollbackAcceptanceIds = new Set(rollbackSteps.flatMap((step) => step.acceptance_ids || []));
const rollbackFixtureIds = new Set(rollbackSteps.flatMap((step) => step.fixture_ids || []));
const rollbackTrace = rollbackSteps.length === 5 &&
  unique(rollbackSteps.map((step) => step.id)) &&
  rollbackSteps.every((step) => step.id && step.action && step.fixture_ids.every((id) => fixtureIds.has(id)) && step.acceptance_ids.every((id) => acceptanceIds.has(id))) &&
  coversAll(new Set(rollbackSteps.map((step) => step.id)), [...requiredRollbackStepIds]) &&
  coversAll(rollbackAcceptanceIds, [...requiredAcceptanceIds]);
result('rollback_trace_references', rollbackTrace, { steps: rollbackSteps.length, fixtures: rollbackFixtureIds.size, acceptance_checks: rollbackAcceptanceIds.size }, 'five unique rollback steps cover all six acceptance checks');

const negativeReplays = fixtures.filter((fixture) => fixture.fires_stop_if).map((fixture) => ({
  fixture_id: fixture.fixture_id,
  trigger_input: fixture.input,
  fires_stop_if: fixture.fires_stop_if,
  expectation_matches: fixture.expected_decision !== 'continue_ordinary_route',
  decision_class: 'reject_or_stop',
  decision: fixture.expected_decision,
  result_status: contract.boundary.result_status,
  performance_results: contract.boundary.performance_results
}));
const negativeReplayPass = negativeReplays.length === 5 && negativeReplays.every((item) => item.expectation_matches);
result('negative_replay_rejects', negativeReplayPass, negativeReplays, 'five bounded failures stop or return to G0 without performance');

const controlFixtures = fixtures.filter((fixture) => !fixture.fires_stop_if);
const controlReplay = controlFixtures.length ? {
  inputs: controlFixtures.map((fixture) => fixture.input),
  decisions: controlFixtures.map((fixture) => fixture.expected_decision),
  expectation_matches: controlFixtures.length === 3 && controlFixtures.every((fixture) => fixture.expected_decision.startsWith('continue_')),
  result_status: contract.boundary.result_status,
  performance_results: contract.boundary.performance_results
} : null;
result('control_replay_allows_ordinary_route', Boolean(controlReplay && controlReplay.expectation_matches), controlReplay, 'three ordinary or human alternatives continue without performance claims');

const boundaryPass = contract.boundary.result_status === 'not_run' &&
  contract.boundary.performance_results === null &&
  contract.boundary.operational_status === 'not_authorized_not_run' &&
  contract.boundary.network_calls === 0 &&
  contract.boundary.external_systems === 'none' &&
  contract.boundary.personal_data === 'none';
result('g0_boundary_preserved', boundaryPass, contract.boundary, 'not_run/null/not_authorized_not_run/zero external access');

const pass = results.every((item) => item.pass);
console.log(JSON.stringify({
  runner: 'run-ai-era-ordinary-journey.js',
  contract_id: contract.contract_id,
  status: pass ? 'PASS' : 'FAIL',
  claim_level: contract.claim_level,
  operational_status: contract.boundary.operational_status,
  gate_effect: 'none; the tabletop cannot authorize a field window',
  environment: { network_calls: 0, external_systems: 'none', personal_data: 'none', state_changes: 'in-memory only' },
  checks: results,
  trace_coverage: {
    routes: `${routes.length}/4`,
    acceptance_checks: `${acceptanceIds.size}/${requiredAcceptanceIds.size}`,
    journey_steps: `${new Set(journeySteps.map((step) => step.id)).size}/${requiredJourneyStepIds.size}`,
    rollback_steps: `${new Set(rollbackSteps.map((step) => step.id)).size}/${requiredRollbackStepIds.size}`
  },
  negative_replay: { replayed: `${negativeReplays.length}/5`, rejection_path_observed: negativeReplayPass, results: negativeReplays },
  control_replay: controlReplay,
  rollback: { steps_declared: rollbackSteps.length, steps_replayed: pass ? rollbackSteps.length : 0, result: pass ? 'pass' : 'fail' },
  result_status: contract.boundary.result_status,
  performance_results: contract.boundary.performance_results,
  next_action: 'Confirm official geometry, accessibility baseline, named roles, rights, and professional safety review before any bounded G1 window.'
}, null, 2));

if (!pass) process.exitCode = 1;
