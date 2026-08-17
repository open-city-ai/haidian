#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const contracts = JSON.parse(fs.readFileSync(path.join(__dirname, 'three-station-flagship-contracts.json'), 'utf8'));
const topology = JSON.parse(fs.readFileSync(path.join(__dirname, 'station-topology.json'), 'utf8'));
const proposal = fs.readFileSync(path.join(root, 'proposal.md'), 'utf8');

const checks = [];
const check = (id, ok, detail) => checks.push({id, result: ok ? 'pass' : 'fail', detail});
const items = contracts.contracts || [];
const stations = new Map((topology.stations || []).map((item) => [item.id, item]));

check('contract-count', items.length === 3, `found ${items.length}; expected 3`);
check('unique-stages', new Set(items.map((item) => item.stage)).size === 3 && ['TEST', 'RELEASE', 'USE'].every((stage) => items.some((item) => item.stage === stage)), 'requires TEST, RELEASE and USE exactly once');
check('one-through-product', contracts.through_product && contracts.through_product.id === 'SC-03-PRODUCT-01', 'one SC-03 product must connect all stations');
check('claim-boundary', contracts.evidence_level === 'proposed_design_acceptance_contract' && /not field-test results/.test(contracts.claim_boundary_en || ''), 'must remain a proposed design contract');

for (const item of items) {
  const station = stations.get(item.station_id);
  const nodeIds = new Set((station && station.nodes || []).map((node) => node.id));
  const prefix = item.stage.toLowerCase();
  check(`${prefix}-topology-ref`, Boolean(station) && station.operating_role === item.stage, `${item.station_id} must exist with role ${item.stage}`);
  check(`${prefix}-required-nodes`, Boolean(station) && item.spatial_contract.required_nodes.every((id) => nodeIds.has(id)), 'all contract nodes must exist in station topology');
  check(`${prefix}-public-mainline`, Boolean(station) && station.public_mainline.includes(item.spatial_contract.public_function_kept_open), 'kept-open function must be on civic main line');
  check(`${prefix}-ordinary-return`, Boolean(station) && station.ordinary_use_after_return === item.spatial_contract.ordinary_use_after_return, 'RETURN use must match station topology');
  check(`${prefix}-technical-boundary`, item.technical_system.components.length >= 5 && item.technical_system.allowed_inputs.length >= 4 && item.technical_system.prohibited_inputs.length >= 3, 'technical components and data boundary must be explicit');
  check(`${prefix}-human-decision`, /sign/.test(item.technical_system.human_decision || ''), 'a human role must sign the station output');
  check(`${prefix}-90-day-evidence`, item.day_90_gate.status === 'proposed_target_not_achieved_result' && item.day_90_gate.required_evidence.length >= 5, '90-day gate must require evidence and remain a proposal');
  check(`${prefix}-180-day-evidence`, item.day_180_gate.status === 'proposed_target_not_achieved_result' && item.day_180_gate.required_evidence.length >= 5, '180-day gate must require evidence and remain a proposal');
  check(`${prefix}-stop-restore`, item.immediate_stop_conditions.length >= 3 && item.immediate_stop_conditions.every((rule) => rule.trigger && rule.human_action && rule.spatial_action), 'each stop condition needs trigger, human decision and spatial action');
  check(`${prefix}-proposal-crossrefs`, proposal.includes(item.project_ref) && item.primary_scene_refs.every((ref) => proposal.includes(ref)), 'project and scene references must exist in proposal.md');
}

check('distinct-station-graphs', new Set(items.map((item) => item.spatial_contract.required_nodes.join('|'))).size === 3, 'the stations must not reuse one topology');
check('distinct-handover-outputs', new Set(items.map((item) => item.handover_output)).size === 3, 'each station must issue a different decision object');
check('return-to-test-task', items.some((item) => item.immediate_stop_conditions.some((rule) => /generate_new_zhongzhi_fixture/.test(rule.spatial_action))), 'public RETURN must create a new Zhongzhi fixture');

const failed = checks.filter((item) => item.result === 'fail');
const output = {
  schema_version: '1.0.0',
  evidence_scope: 'repository_contract_cross_reference_only_not_field_validation',
  summary: {total: checks.length, passed: checks.length - failed.length, failed: failed.length, ok: failed.length === 0},
  checks
};
fs.writeFileSync(path.join(__dirname, 'three-station-flagship-contract-results.json'), JSON.stringify(output, null, 2) + '\n');
console.log(`${output.summary.passed}/${output.summary.total} PASS`);
if (failed.length) {
  for (const item of failed) console.error(`FAIL ${item.id}: ${item.detail}`);
  process.exit(1);
}
