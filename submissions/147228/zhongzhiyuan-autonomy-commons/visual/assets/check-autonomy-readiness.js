#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const read = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const fail = (message) => { throw new Error(message); };

const register = read('visual/assets/autonomy-readiness-register.json');
const scenarios = read('visual/assets/autonomous-scenarios.json').scenarios;
const matrix = read('visual/assets/scenario-operation-matrix.json').rows;
const gates = read('visual/assets/curbside-test-gates.json').gates;
const nodes = read('visual/assets/autonomy_nodes.json').features;

if (register.status_boundary !== 'participant_proposed_readiness_schema') fail('readiness register must remain participant-proposed');
if (register.readiness_status !== 'all_cards_not_authorized_not_run') fail('readiness register boundary drift');
const required = new Set(register.required_fields || []);
const scenarioById = new Map(scenarios.map((item) => [item.id, item]));
const matrixById = new Map(matrix.map((item) => [item.scenario_id, item]));
const gateIds = new Set(gates.map((item) => item.id));
const nodeById = new Map(nodes.map((item) => [item.id, item]));
const cards = register.cards || [];

if (cards.length !== scenarios.length) fail('readiness card count must equal scenario card count');
if (new Set(cards.map((item) => item.scenario_id)).size !== cards.length) fail('readiness scenario IDs must be unique');

const supporting = new Set((register.supporting_matrix_rows || []).map((item) => item.row_id));
const primaryRows = new Set();
for (const card of cards) {
  const scenario = scenarioById.get(card.scenario_id);
  if (!scenario) fail(`unknown scenario ${card.scenario_id}`);
  if (scenario.node !== card.node_id) fail(`${card.scenario_id} node drift`);
  if (!nodeById.has(card.node_id)) fail(`${card.scenario_id} node does not resolve`);
  if (!matrixById.has(card.matrix_row_ref)) fail(`${card.scenario_id} matrix row does not resolve`);
  if (supporting.has(card.matrix_row_ref)) fail(`${card.scenario_id} points to a supporting-only row`);
  primaryRows.add(card.matrix_row_ref);
  for (const gateId of card.gate_refs || []) {
    if (!gateIds.has(gateId)) fail(`${card.scenario_id} gate does not resolve: ${gateId}`);
  }
  for (const field of required) {
    if (!(field in card)) fail(`${card.scenario_id} missing required readiness field ${field}`);
  }
  if (card.matrix_mapping_status !== 'participant_proposed') fail(`${card.scenario_id} mapping must remain participant_proposed`);
  if (card.baseline.status !== 'unknown' || card.baseline.value !== null) fail(`${card.scenario_id} baseline must remain unknown/null`);
  if (card.observation.status !== 'not_authorized_not_run' || card.observation.sample !== null || card.observation.time_window !== null) fail(`${card.scenario_id} observation boundary drift`);
  if (card.success_threshold.status !== 'design_target_to_freeze_before_authorization' || card.success_threshold.value !== null) fail(`${card.scenario_id} success threshold must remain unmeasured`);
  if (card.authorization_status !== 'not_authorized' || card.operational_status !== 'not_authorized_not_run') fail(`${card.scenario_id} authorization boundary drift`);
  if (card.field_data !== false || card.performance_results !== null) fail(`${card.scenario_id} contains field/performance evidence`);
  if (!card.stop_threshold.condition || !card.human_equivalent_service) fail(`${card.scenario_id} needs a stop condition and human equivalent`);
}

const allScenarioIds = new Set(scenarios.map((item) => item.id));
if (![...allScenarioIds].every((id) => cards.some((item) => item.scenario_id === id))) fail('not every AV scenario has a readiness card');
if (primaryRows.size !== 9) fail(`expected nine primary operation rows, got ${primaryRows.size}`);
if (![...supporting].every((id) => matrixById.has(id))) fail('supporting operation row does not resolve');
if ([...primaryRows].some((id) => supporting.has(id))) fail('primary and supporting operation rows overlap');
if (primaryRows.size + supporting.size !== matrix.length) fail('every operation row must be classified as primary or supporting');

console.log(JSON.stringify({
  ok: true,
  register: register.id,
  scenario_cards: cards.length,
  primary_operation_rows: primaryRows.size,
  supporting_operation_rows: supporting.size,
  all_not_authorized_not_run: cards.every((item) => item.authorization_status === 'not_authorized' && item.operational_status === 'not_authorized_not_run'),
  baselines_unknown: cards.every((item) => item.baseline.status === 'unknown' && item.baseline.value === null),
  performance_results_null: cards.every((item) => item.performance_results === null)
}, null, 2));

