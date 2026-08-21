const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const read = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const fail = (message) => {
  console.error(message);
  process.exit(1);
};
const exact = (actual, expected, label) => {
  const left = JSON.stringify(actual);
  const right = JSON.stringify(expected);
  if (left !== right) fail(`${label} drift`);
};

const contract = read('visual/assets/ai-era-ordinary-journey-contract.json');
const evidence = read('visual/assets/ai-era-ordinary-journey-evidence.json');
const atlas = read('visual/assets/ai-era-g0-journey-atlas.json');

if (contract.contract_id !== 'AE-ORDINARY-JOURNEY-001') fail('ordinary journey contract id drift');
if (contract.claim_level !== 'local_synthetic_tabletop') fail('ordinary journey claim level drift');
exact(contract.route_bindings.map((item) => item.route_id), ['ROUTE-01', 'ROUTE-02', 'ROUTE-03', 'ROUTE-04'], 'route ids');
exact(contract.journey_steps.map((item) => item.id), ['J-01', 'J-02', 'J-03', 'J-04', 'J-05'], 'journey step ids');
exact(contract.rollback_steps.map((item) => item.id), ['RB-01', 'RB-02', 'RB-03', 'RB-04', 'RB-05'], 'rollback ids');
exact(contract.acceptance_checks.map((item) => item.id), ['AC-01', 'AC-02', 'AC-03', 'AC-04', 'AC-05', 'AC-06'], 'acceptance ids');
exact(contract.fixtures.map((item) => item.fixture_id), ['AE-F01', 'AE-F02', 'AE-F03', 'AE-F04', 'AE-F05', 'AE-F06', 'AE-F07', 'AE-F08'], 'fixture ids');

const routeIds = new Set(contract.route_bindings.map((item) => item.route_id));
for (const fixture of contract.fixtures) {
  if (!routeIds.has(fixture.route_id)) fail(`${fixture.fixture_id} route does not resolve`);
}
for (const route of atlas.route_cards) {
  if (!routeIds.has(route.route_id) || route.spatial_refs.length < 1 || !route.ordinary_equivalent) fail(`${route.route_id} route card is incomplete`);
}
exact(atlas.journey_steps.map((item) => item.id), ['J-01', 'J-02', 'J-03', 'J-04', 'J-05'], 'atlas journey step ids');
if (atlas.route_cards.length !== 4 || atlas.writeback_fields.length < 8) fail('atlas coverage is incomplete');

if (evidence.contract_id !== atlas.contract_ref.split('#')[1]) fail('atlas and evidence contract ids do not match');
if (evidence.trace_coverage.routes !== '4/4') fail('route trace coverage drift');
if (evidence.trace_coverage.acceptance_checks !== '6/6') fail('acceptance trace coverage drift');
if (evidence.trace_coverage.journey_steps !== '5/5') fail('journey trace coverage drift');
if (evidence.trace_coverage.rollback_steps !== '5/5') fail('rollback trace coverage drift');
if (evidence.negative_replay.replayed !== '5/5' || !evidence.negative_replay.rejection_path_observed) fail('negative replay boundary drift');
if (evidence.control_replay.inputs.length !== 3 || !evidence.control_replay.expectation_matches) fail('positive control replay drift');
if (evidence.result_status !== 'not_run' || evidence.performance_results !== null) fail('result boundary drift');
if (evidence.operational_status !== 'not_authorized_not_run') fail('operational boundary drift');
if (evidence.environment.network_calls !== 0 || evidence.environment.personal_data !== 'none') fail('offline boundary drift');

if (atlas.status.gate !== 'G0' || atlas.status.decision !== 'HOLD' || atlas.status.authorizations !== 0) fail('atlas gate boundary drift');
if (atlas.status.field_data !== false || atlas.status.baseline !== 'unknown' || atlas.status.result_status !== 'not_run') fail('atlas field boundary drift');
if (atlas.status.performance_results !== null || atlas.status.operational_status !== 'not_authorized_not_run') fail('atlas operational boundary drift');

console.log(JSON.stringify({
  ok: true,
  atlas_id: atlas.atlas_id,
  routes: atlas.route_cards.length,
  journey_steps: atlas.journey_steps.length,
  rollback_steps: contract.rollback_steps.length,
  acceptance_checks: contract.acceptance_checks.length,
  negative_replay: evidence.negative_replay.replayed,
  positive_control: evidence.control_replay.inputs.length,
  authorizations: atlas.status.authorizations,
  field_data: atlas.status.field_data,
  baseline: atlas.status.baseline,
  decision: atlas.status.decision
}, null, 2));
