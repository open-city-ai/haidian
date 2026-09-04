const fs = require('fs');
const path = require('path');

const root = process.env.MOBILITY_CONTINUITY_ROOT || __dirname;
const file = path.join(root, 'mobility-continuity-receipt.json');
const receipt = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
const expectedStates = ['T01-AM-ARRIVAL', 'T02-DAY-ACCESS', 'T03-PM-RETURN', 'T04-OUTAGE-WEATHER'];
const expectedNodes = ['MS-01-ZHONGZHIYUAN', 'MS-02-AI-ORIGIN', 'MS-03-DAZHONGSI', 'ROUTE-SYSTEM'];
const expectedPositive = ['PC-01', 'PC-02', 'PC-03', 'PC-04'];
const expectedNegative = ['NC-01', 'NC-02', 'NC-03', 'NC-04', 'NC-05', 'NC-06'];

if (receipt.status !== 'design_only') errors.push('status must remain design_only');
if (receipt.authorization !== 0) errors.push('authorization must remain 0');
if (receipt.field_observations !== 0) errors.push('field_observations must remain 0');
if (receipt.local_baseline !== 'unknown') errors.push('local_baseline must remain unknown');
if (receipt.result_status !== 'not_run') errors.push('result_status must remain not_run');
if (receipt.decision !== 'HOLD') errors.push('decision must remain HOLD');
if (receipt.ordinary_service_first !== true) errors.push('ordinary_service_first must remain true');
if (!receipt.ai_role || !receipt.boundary) errors.push('boundary and AI role are required');

const states = Array.isArray(receipt.states) ? receipt.states : [];
if (JSON.stringify(states.map((item) => item.id)) !== JSON.stringify(expectedStates)) errors.push('state IDs/order must be exact');
if (JSON.stringify(states.map((item) => item.node_id)) !== JSON.stringify(expectedNodes)) errors.push('node IDs/order must be exact');
for (const state of states) {
  if (!state.id || !state.window_zh || !state.window_en || !state.node_id) errors.push(`${state.id || 'state'} missing label or node`);
  if (!state.ordinary_service || !state.ai_assist || !state.human_equivalent) errors.push(`${state.id} missing service equivalence`);
  if (!Array.isArray(state.accountable_roles) || state.accountable_roles.length < 2) errors.push(`${state.id} needs named roles`);
  if (!Array.isArray(state.receipt_fields) || state.receipt_fields.length < 3) errors.push(`${state.id} needs receipt fields`);
  if (!state.stop_condition) errors.push(`${state.id} needs a stop condition`);
}

if (!Array.isArray(receipt.handoff_seams) || receipt.handoff_seams.length !== 4) errors.push('expected four handoff seams');
if (!Array.isArray(receipt.receipt_fields) || receipt.receipt_fields.length !== 12) errors.push('receipt field schema must contain twelve fields');
if (!Array.isArray(receipt.positive_controls) || JSON.stringify(receipt.positive_controls.map((item) => item.id)) !== JSON.stringify(expectedPositive)) errors.push('positive controls must be exact');
if (!Array.isArray(receipt.negative_fixtures) || JSON.stringify(receipt.negative_fixtures.map((item) => item.id)) !== JSON.stringify(expectedNegative)) errors.push('negative fixtures must be exact');
for (const item of receipt.negative_fixtures || []) {
  if (item.expected_decision !== 'HOLD') errors.push(`${item.id} must fail closed to HOLD`);
}
for (const item of receipt.positive_controls || []) {
  if (!item.trigger || !item.expected_decision) errors.push(`${item.id} needs a trigger and expected decision`);
}

if (errors.length) {
  console.error(JSON.stringify({status: 'FAIL', errors}, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({
  status: 'PASS',
  receipt_id: receipt.receipt_id,
  states: states.length,
  handoff_seams: receipt.handoff_seams.length,
  receipt_fields: receipt.receipt_fields.length,
  negative_hold: `${receipt.negative_fixtures.length}/${expectedNegative.length}`,
  positive_controls: receipt.positive_controls.length,
  ordinary_service_first: receipt.ordinary_service_first,
  authorization: receipt.authorization,
  field_observations: receipt.field_observations,
  local_baseline: receipt.local_baseline,
  result_status: receipt.result_status,
  decision: receipt.decision
}, null, 2));
