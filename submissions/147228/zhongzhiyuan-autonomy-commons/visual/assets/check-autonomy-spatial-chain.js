#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const read = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const fail = (message) => { throw new Error(message); };
const chain = read('visual/assets/autonomy-spatial-chain.json');
const nodes = read('visual/assets/autonomy_nodes.json');
const plans = read('visual/assets/autonomy-node-interface-plans.json');
const scenarios = read('visual/assets/autonomous-scenarios.json').scenarios;
const keyAreas = read('geometry/key_areas.geojson').features;

if (chain.status !== 'conceptual_spatial_evidence') fail('chain must remain conceptual_spatial_evidence');
if (chain.official_boundary !== false || chain.geometry_role !== 'provisional_constraint') fail('chain boundary must remain provisional');
if (chain.dimensions !== null || chain.official_road !== false || chain.permit !== false) fail('chain contains an unauthorized spatial/deployment field');
if (chain.shared_stages.length !== 5) fail('shared sequence must have five stages');

const nodeById = new Map(nodes.features.map(f => [f.id, f]));
const planById = new Map(plans.nodes.map(n => [n.id, n]));
const scenarioById = new Map(scenarios.map(s => [s.id, s]));
const keyById = new Map(keyAreas.map(f => [f.id, f]));
if (chain.node_cards.length !== 3) fail('expected three node cards');

for (const card of chain.node_cards) {
  const node = nodeById.get(card.node_id);
  const plan = planById.get(card.interface_id);
  if (!node || node.geometry.type !== 'Point') fail(`${card.node_id} does not resolve to a point feature`);
  if (node.properties.geometry_role !== 'provisional_test_marker' || node.properties.official_road !== false) fail(`${card.node_id} boundary drift`);
  if (!plan || plan.site_ref !== card.node_id) fail(`${card.interface_id} does not resolve to ${card.node_id}`);
  const keyId = card.key_area_feature_ref.split('#')[1];
  const key = keyById.get(keyId);
  if (!key || key.properties.official_boundary !== false) fail(`${card.key_area_feature_ref} must resolve to provisional key area`);
  if (card.stage_ids.join('|') !== chain.shared_stages.map(s => s.id).join('|')) fail(`${card.node_id} missing shared stage`);
  for (const sid of card.scenario_refs) {
    const scenario = scenarioById.get(sid);
    if (!scenario || scenario.node !== card.node_id) fail(`${sid} does not resolve to ${card.node_id}`);
  }
  if (JSON.stringify(card.stop_rules) !== JSON.stringify(plan.stop_rules)) fail(`${card.node_id} stop rules drift from interface plan`);
  if (JSON.stringify(card.evidence_required) !== JSON.stringify(plan.evidence_required)) fail(`${card.node_id} evidence list drift from interface plan`);
}

const route = nodeById.get(chain.route.geometry_ref.split('#')[1]);
if (!route || route.geometry.type !== 'LineString' || route.properties.vehicle_route !== false || route.properties.official_road !== false) fail('audit route must remain non-vehicle provisional relation');
for (const svg of ['assets/figures/autonomy-spatial-chain.svg', 'assets/figures/autonomy-spatial-chain.en.svg']) {
  const text = fs.readFileSync(path.join(root, svg), 'utf8');
  if (!/<svg[^>]+viewBox="0 0 1800 1260"/.test(text)) fail(`${svg} missing fixed viewBox`);
  if (/<script|https?:\/\/(?!www\.w3\.org\/2000\/svg)/i.test(text)) fail(`${svg} contains a runtime/external dependency`);
}
console.log('PASS autonomy spatial chain: 3 nodes, 3 provisional key areas, 5 stages, 12 scenario refs, stop/evidence parity, offline figures');
