#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

// This checker deliberately follows references across the package.  It does
// not turn a synthetic receipt into field evidence or an authorization.
const root = process.env.AUTONOMY_JOIN_ROOT || path.resolve(__dirname, '..', '..');
const read = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const fail = (message) => { throw new Error(message); };
const ids = (items) => new Set(items);
const refId = (ref) => String(ref).split('#')[1];

const register = read('visual/assets/autonomy-readiness-register.json');
const scenarios = read('visual/assets/autonomous-scenarios.json').scenarios;
const matrix = read('visual/assets/scenario-operation-matrix.json').rows;
const gates = read('visual/assets/curbside-test-gates.json').gates;
const nodes = read('visual/assets/autonomy_nodes.json').features;
const spatial = read('visual/assets/autonomy-spatial-chain.json');
const interfaces = read('visual/assets/autonomy-node-interface-plans.json').nodes;
const keyAreas = read('geometry/key_areas.geojson').features;
const contract = read('visual/assets/autonomy-curbside-tabletop-contract.json');
const receipt = read('visual/assets/autonomy-curbside-tabletop-evidence.json');

if (register.status_boundary !== 'participant_proposed_readiness_schema') fail('readiness register boundary drift');
if (register.readiness_status !== 'all_cards_not_authorized_not_run') fail('readiness register status drift');
if (spatial.official_boundary !== false || spatial.geometry_role !== 'provisional_constraint') fail('spatial chain boundary drift');
if (contract.claim_level !== 'local_synthetic_tabletop') fail('tabletop contract claim level drift');
if (contract.network_policy !== 'offline_only') fail('tabletop contract must remain offline-only');
if (contract.operational_status !== 'not_authorized_not_run') fail('tabletop contract authorization boundary drift');
if (receipt.evidence_id !== contract.contract_id || receipt.contract_id !== contract.contract_id) fail('evidence receipt does not resolve to its contract');
if (receipt.result_status !== 'not_run' || receipt.field_data !== false || receipt.performance_results !== null) fail('evidence receipt contains a field/performance result');
if (receipt.baselines !== 'unknown' || receipt.receipt.authorization !== 'not_authorized') fail('evidence receipt boundary drift');
if (!fs.existsSync(path.join(root, receipt.runner))) fail(`tabletop runner does not resolve: ${receipt.runner}`);

const scenarioById = new Map(scenarios.map((item) => [item.id, item]));
const matrixById = new Map(matrix.map((item) => [item.scenario_id, item]));
const gateById = new Map(gates.map((item) => [item.id, item]));
const nodeById = new Map(nodes.map((item) => [item.id, item]));
const interfaceById = new Map(interfaces.map((item) => [item.id, item]));
const keyAreaById = new Map(keyAreas.map((item) => [item.id, item]));
const chainByNodeId = new Map(spatial.node_cards.map((item) => [item.node_id, item]));
const receiptGateIds = ids(contract.gate_ids || []);
const receiptMatrixIds = ids(contract.matrix_scenario_ids || []);
const acceptanceGateIds = ids((contract.acceptance_checks || []).flatMap((item) => item.gate_ids || []));
const contractMatrixIds = ids(matrix.map((item) => item.scenario_id));

if (contract.gate_ids.length !== gates.length) fail('tabletop contract must bind every registered gate');
for (const gateId of contract.gate_ids) {
  if (!gateById.has(gateId)) fail(`tabletop contract gate does not resolve: ${gateId}`);
  if (!acceptanceGateIds.has(gateId)) fail(`tabletop acceptance checks omit gate: ${gateId}`);
}
for (const matrixId of contract.matrix_scenario_ids) {
  if (!contractMatrixIds.has(matrixId)) fail(`tabletop contract matrix row does not resolve: ${matrixId}`);
}
for (const fixture of contract.fixtures || []) {
  if (!receiptMatrixIds.has(fixture.scenario_id)) fail(`fixture is outside receipt matrix scope: ${fixture.id}`);
  if (!matrixById.has(fixture.scenario_id)) fail(`fixture matrix row does not resolve: ${fixture.scenario_id}`);
}

const cards = register.cards || [];
if (!cards.length) fail('readiness register has no cards');
const joins = [];
for (const card of cards) {
  const scenario = scenarioById.get(card.scenario_id);
  if (!scenario) fail(`${card.scenario_id} scenario does not resolve`);
  if (scenario.node !== card.node_id) fail(`${card.scenario_id} node does not match scenario card`);

  const node = nodeById.get(card.node_id);
  if (!node || node.geometry.type !== 'Point') fail(`${card.scenario_id} node does not resolve to a point feature`);
  if (node.properties.geometry_role !== 'provisional_test_marker' || node.properties.official_road !== false) fail(`${card.node_id} node boundary drift`);

  const chain = chainByNodeId.get(card.node_id);
  if (!chain) fail(`${card.scenario_id} spatial chain node does not resolve`);
  if (refId(chain.node_feature_ref) !== card.node_id) fail(`${card.scenario_id} spatial node feature ref drift`);
  const keyArea = keyAreaById.get(refId(chain.key_area_feature_ref));
  if (!keyArea || keyArea.properties.official_boundary !== false) fail(`${card.scenario_id} key-area ref does not resolve to a provisional feature`);

  const interfacePlan = interfaceById.get(chain.interface_id);
  if (!interfacePlan || interfacePlan.site_ref !== card.node_id) fail(`${card.scenario_id} interface plan does not resolve to node`);

  const matrixRow = matrixById.get(card.matrix_row_ref);
  if (!matrixRow || matrixRow.status !== 'conceptual_suggestion') fail(`${card.scenario_id} S row does not resolve to a conceptual matrix row`);
  const gateRefs = card.gate_refs || [];
  if (!gateRefs.length) fail(`${card.scenario_id} has no gate reference`);
  for (const gateId of gateRefs) {
    if (!gateById.has(gateId)) fail(`${card.scenario_id} gate does not resolve: ${gateId}`);
    if (!receiptGateIds.has(gateId)) fail(`${card.scenario_id} gate is not covered by the evidence receipt: ${gateId}`);
  }

  joins.push({
    scenario_id: card.scenario_id,
    node_id: card.node_id,
    key_area_id: keyArea.id,
    matrix_row_ref: card.matrix_row_ref,
    gate_refs: gateRefs
  });
}

const receiptRows = [...receiptMatrixIds].filter((id) => matrixById.has(id));
console.log(JSON.stringify({
  ok: true,
  join: 'AV -> node -> key area -> S row -> gate -> evidence receipt',
  scenario_cards: joins.length,
  fully_resolved_cards: joins.length,
  unique_nodes: new Set(joins.map((item) => item.node_id)).size,
  unique_key_areas: new Set(joins.map((item) => item.key_area_id)).size,
  unique_matrix_rows: new Set(joins.map((item) => item.matrix_row_ref)).size,
  unique_gates: new Set(joins.flatMap((item) => item.gate_refs)).size,
  evidence_receipt: receipt.evidence_id,
  evidence_receipt_scope: 'gate_level; synthetic tabletop only',
  receipt_matrix_rows: receiptRows,
  field_data: false,
  performance_results: null,
  authorization: 'not_authorized'
}, null, 2));
