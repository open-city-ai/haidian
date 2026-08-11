#!/usr/bin/env node

/* Read-only replay of one synthetic resident journey. PASS is not field evidence. */
const fs = require('fs');
const path = require('path');

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, '..', '..');
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(packageDir, rel), 'utf8'));
const contract = readJson('visual/assets/mobility-ordinary-journey-contract.json');
const nodes = new Map((readJson('visual/assets/mobility-nodes.json').nodes || []).map((item) => [item.id, item]));
const cards = new Map((readJson('visual/assets/scenario-cards.json').cards || []).map((item) => [item.id, item]));
const keyAreas = new Set((readJson('geometry/key_areas.geojson').features || []).map((item) => item.id));
const steps = contract.journey_steps || [];
const fixtures = contract.fixtures || [];
const checks = contract.acceptance_checks || [];
const negative = fixtures.filter((item) => item.fires_stop_if);
const controls = fixtures.filter((item) => !item.fires_stop_if);
const results = [];
const result = (id, pass, observed, expected) => results.push({id, pass, observed, expected});
const unique = (items) => new Set(items).size === items.length;

const routeReferencesResolve = steps.length === 6 && steps.every((step) => {
  const node = nodes.get(step.node_id);
  const card = cards.get(step.scenario_id);
  return Boolean(node) && Boolean(card) && node.anchor_feature_id === step.anchor_feature_id &&
    keyAreas.has(step.anchor_feature_id) && (card.space_zh || card.space_en);
});
result('route_spatial_scenario_references', routeReferencesResolve,
  steps.map((step) => `${step.id}:${step.node_id}:${step.scenario_id}:${step.anchor_feature_id}`),
  'six steps resolve to mobility nodes, provisional key-area anchors and scenario cards');

const stepFieldsResolve = steps.length === 6 && unique(steps.map((step) => step.id)) && steps.every((step) =>
  step.action_zh && step.action_en && step.ordinary_equivalent_zh && step.ordinary_equivalent_en &&
  Array.isArray(step.required_evidence) && step.required_evidence.length >= 3 &&
  Array.isArray(step.acceptance_ids) && step.acceptance_ids.length > 0
);
result('ordinary_journey_steps_complete', stepFieldsResolve, steps.length, 'six unique human-readable steps with an ordinary equivalent and evidence fields');

const checkIds = new Set(checks.map((item) => item.id));
const fixtureIds = new Set(fixtures.map((item) => item.id));
const acceptanceTrace = checks.length === 8 && unique(checks.map((item) => item.id)) && checks.every((item) =>
  item.check && Array.isArray(item.fixture_ids) && item.fixture_ids.length > 0 && item.fixture_ids.every((id) => fixtureIds.has(id))
);
result('acceptance_trace_complete', acceptanceTrace, {checks: checks.length, unique: checkIds.size}, 'eight unique acceptance checks reference existing fixtures');

const negativeReplay = negative.length === 6 && negative.every((item) => item.expected_decision && item.expected_decision !== 'continue_with_human_option');
result('negative_replay_stops', negativeReplay, negative.map((item) => ({input: item.input, decision: item.expected_decision})), 'six adverse fixtures stop, freeze or return to P0');

const controlReplay = controls.length === 3 && controls.every((item) => item.expected_decision === 'continue_with_human_option');
result('control_replay_keeps_human_option', controlReplay, controls.map((item) => ({input: item.input, decision: item.expected_decision})), 'three control fixtures continue with a human/public option');

const selfAudit = contract.self_audit && contract.self_audit.finding_count === 4 &&
  Array.isArray(contract.self_audit.findings) && contract.self_audit.findings.length === 4 &&
  contract.self_audit.findings.every((item) => item.status === 'unknown' && item.finding_zh && item.finding_en && item.required_action);
result('self_audit_keeps_gaps_unknown', Boolean(selfAudit), contract.self_audit && contract.self_audit.findings.map((item) => item.id), 'four adverse findings remain unknown and carry a dated evidence action');

const ordinaryFallback = steps.every((step) => /人工|电话|纸面|公共交通|staffed|telephone|paper|public transport/i.test(`${step.ordinary_equivalent_zh} ${step.ordinary_equivalent_en}`));
result('every_step_has_non_ai_equivalent', ordinaryFallback, steps.map((step) => step.id), 'every step preserves an ordinary human or public-transport equivalent');

const boundary = contract.boundary || {};
const boundaryPass = boundary.result_status === 'not_run' && boundary.performance_results === null &&
  boundary.operational_status === 'not_authorized_not_run' && boundary.network_calls === 0 &&
  boundary.external_systems === 'none' && boundary.personal_data === 'none' && boundary.decision === 'do_not_advance';
result('synthetic_boundary_preserved', boundaryPass, boundary, 'not_run/null/not_authorized_not_run/zero external access/no personal data/do_not_advance');

const rollbackPass = Array.isArray(contract.rollback_steps) && contract.rollback_steps.length === 5 && contract.rollback_steps.every(Boolean);
result('rollback_steps_complete', rollbackPass, contract.rollback_steps && contract.rollback_steps.length, 'five ordered reversible rollback steps');

const pass = results.every((item) => item.pass);
console.log(JSON.stringify({
  runner: 'run-mobility-ordinary-journey.js',
  contract_id: contract.contract_id,
  status: pass ? 'PASS' : 'FAIL',
  claim_level: contract.claim_level,
  persona: contract.persona,
  route: contract.route_binding,
  checks: results,
  trace_coverage: {
    journey_steps: `${steps.length}/6`,
    acceptance_checks: `${checkIds.size}/8`,
    negative_replays: `${negative.length}/6`,
    control_replays: `${controls.length}/3`,
    self_audit_findings: `${contract.self_audit?.findings?.length || 0}/4`,
    rollback_steps: `${contract.rollback_steps?.length || 0}/5`
  },
  negative_replay: {replayed: `${negative.length}/6`, rejection_path_observed: negativeReplay},
  self_audit: contract.self_audit,
  result_status: boundary.result_status,
  performance_results: boundary.performance_results,
  operational_status: boundary.operational_status,
  next_action: 'Collect dated accessibility, return-trip, handoff and complaint evidence before any field window or expansion.'
}, null, 2));

if (!pass) process.exitCode = 1;
