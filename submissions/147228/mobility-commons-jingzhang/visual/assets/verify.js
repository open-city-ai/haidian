#!/usr/bin/env node
'use strict';

/* Independent package verifier. It checks relationships, not field performance. */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..', '..');
function read(relative) { return JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8')); }
function clone(value) { return JSON.parse(JSON.stringify(value)); }

function verify(state = {}) {
  const site = state.site || read('geometry/site_boundary.geojson');
  const areas = state.areas || read('geometry/key_areas.geojson');
  const roads = state.roads || read('geometry/roads.geojson');
  const nodes = state.nodes || read('visual/assets/mobility-nodes.json');
  const graph = state.graph || read('visual/assets/multimodal-network.json');
  const cards = state.cards || read('visual/assets/scenario-cards.json');
  const operation = state.operation || read('visual/assets/mobility-scenario-operation-contract.json');
  const route = state.route || read('visual/assets/example-mobility-route-continuity.json');
  const failures = [];
  const check = (id, pass, detail) => { if (!pass) failures.push({id, detail}); };
  const areaIds = new Set((areas.features || []).map((feature) => feature.id || feature.properties?.id));
  const nodeIds = new Set((nodes.nodes || []).map((node) => node.id));
  const graphNodeIds = new Set((graph.nodes || []).map((node) => node.id));
  const graphEdgeIds = new Set((graph.edges || []).map((edge) => edge.id));
  check('site_boundary_is_provisional', site.features?.some((feature) => feature.id === 'SITE-001' && feature.properties?.official_boundary === false), 'SITE-001 must remain provisional');
  check('three_key_areas_are_present', areaIds.size === 3 && ['PROV-KEY-001','PROV-KEY-002','PROV-KEY-003'].every((id) => areaIds.has(id)), `area_ids=${[...areaIds].join(',')}`);
  check('three_nodes_are_geometry_linked', (nodes.nodes || []).length === 3 && (nodes.nodes || []).every((node) => node.geometry_role === 'provisional_constraint' && areaIds.has(node.anchor_feature_id) && node.geometry_ref === `geometry/key_areas.geojson#${node.anchor_feature_id}`), 'every mobility node must link to a provisional key area');
  check('roads_are_design_relationships', (roads.features || []).length === 4 && roads.name === 'jingzhang_mobility_commons_network_v2_33' && (roads.features || []).every((feature) => feature.properties?.official_boundary === false && feature.geometry?.coordinates?.length >= 2), 'roads must be current-package, non-statutory relationship geometry');
  check('analytical_graph_endpoints_exist', (graph.edges || []).every((edge) => graphNodeIds.has(edge.from) && graphNodeIds.has(edge.to)), 'graph edge endpoint missing');
  check('analytical_paths_use_declared_edges', Object.values(graph.path_catalog || {}).every((edgePath) => Array.isArray(edgePath) && edgePath.length > 0 && edgePath.every((edgeId) => graphEdgeIds.has(edgeId))), 'path catalog has unknown or empty edges');
  const requiredCardFields = ['id','space_zh','space_en','trigger_zh','trigger_en','inputs_zh','inputs_en','service_action_zh','service_action_en','fallback_zh','fallback_en','stop_condition_zh','stop_condition_en'];
  check('ten_cards_have_required_bilingual_fields', (cards.cards || []).length === 10 && (cards.cards || []).every((card) => requiredCardFields.every((field) => typeof card[field] === 'string' && card[field].trim())), 'scenario cards are not complete');
  const cardIds = new Set((cards.cards || []).map((card) => card.id));
  check('ten_cards_have_operation_rows', (operation.rows || []).length === 10 && [...cardIds].every((id) => operation.rows.some((row) => row.scenario_id === id)), 'scenario to operation coverage is incomplete');
  check('operation_rows_use_known_nodes', (operation.rows || []).every((row) => Array.isArray(row.node_ids) && row.node_ids.length > 0 && row.node_ids.every((id) => nodeIds.has(id))), 'operation row references unknown node');
  check('operation_rows_have_fallback_contract', (operation.rows || []).every((row) => row.owner_role && row.action_if_fail && /human|public transport|telephone|paper|manual/i.test(row.action_if_fail) && row.non_ai_equivalent), 'operation row missing owner, fallback or non-AI equivalent');
  check('route_contract_covers_nodes', route.contract_id === 'MOBILITY-PUBLIC-ROUTE-CONTINUITY-001' && JSON.stringify(route.nodes.map((node) => node.node_id)) === JSON.stringify(['MOB-NODE-001','MOB-NODE-002','MOB-NODE-003']) && route.baseline === 'unknown' && route.field_result === null && route.authorization === 'not_authorized', 'route continuity contract boundary or node order changed');
  check('route_contract_keeps_non_ai_path', route.non_ai_path === true && route.nodes.every((node) => node.handoff_visible && node.human_equivalent && node.non_app_entry), 'route lacks visible human/equivalent access');
  check('no_local_performance_promotion', cards.status === 'design_register_not_operational' && cards.run_status === 'not_authorized_not_run', 'scenario cards promoted beyond design boundary');
  return {ok: failures.length === 0, checked: 13, failures};
}

if (require.main === module) {
  const result = {ok: true, checks: [], selftest_count: 0};
  const clean = verify();
  result.ok = clean.ok;
  result.checks = clean;
  if (process.argv.includes('--selftest')) {
    const base = {site:read('geometry/site_boundary.geojson'),areas:read('geometry/key_areas.geojson'),roads:read('geometry/roads.geojson'),nodes:read('visual/assets/mobility-nodes.json'),graph:read('visual/assets/multimodal-network.json'),cards:read('visual/assets/scenario-cards.json'),operation:read('visual/assets/mobility-scenario-operation-contract.json'),route:read('visual/assets/example-mobility-route-continuity.json')};
    const tests = [
      ['clean_package', (x) => x, false],
      ['promoted_boundary', (x) => { x.site.features[0].properties.official_boundary = true; return x; }, true],
      ['missing_node_anchor', (x) => { delete x.nodes.nodes[0].anchor_feature_id; return x; }, true],
      ['unknown_operation_node', (x) => { x.operation.rows[0].node_ids = ['MOB-NODE-999']; return x; }, true],
      ['promoted_scenario_run', (x) => { x.cards.run_status = 'field_run'; return x; }, true]
    ];
    result.selftests = tests.map(([id, mutate, expectedFailure]) => { const observed = verify(mutate(clone(base))); const failed = !observed.ok; return {id,expected_failure:expectedFailure,observed_failure:failed,ok:failed===expectedFailure,failures:observed.failures.map((item)=>item.id)}; });
    result.selftest_count = result.selftests.length;
    result.ok = result.ok && result.selftests.every((item) => item.ok);
  }
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.ok ? 0 : 1;
}

module.exports = {verify};
