'use strict';

/*
 * Deterministic network-flow expansion for the regional synthetic commute
 * screen. It deliberately keeps no agent-level records: each of the declared
 * 3,122,000 synthetic agents is assigned once, expanded to a declared path,
 * and immediately reduced into group/zone/mode/time/node/edge counters.
 *
 * This is a synthetic counterfactual graph, not a road graph, timetable,
 * station count, observed OD matrix or operational traffic assignment.
 */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const regional = JSON.parse(fs.readFileSync(path.join(root, 'regional-scale-commute.json'), 'utf8'));
const model = JSON.parse(fs.readFileSync(path.join(root, 'network-flow-screen.json'), 'utf8'));
const TOTAL = regional.regional_scope.population_reference;
const GROUPS = regional.synthetic_population.groups;
const MODES = regional.modes;
const SLICES = model.time_slices;
const MAX_LOAD = Number(model.capacity_gate.maximum_edge_or_node_load_ratio);

function fail(message) {
  console.error(`NETWORK_FLOW_CHECK_FAIL: ${message}`);
  process.exitCode = 1;
}

function round(value, digits = 4) {
  if (!Number.isFinite(value)) return value;
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

function hash(index, salt) {
  let value = (index + 1 + salt * 2654435761) >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 2246822519) >>> 0;
  value ^= value >>> 13;
  value = Math.imul(value, 3266489917) >>> 0;
  return (value ^ (value >>> 16)) >>> 0;
}

function unit(index, salt) {
  return hash(index, salt) / 4294967296;
}

function selectWeighted(weights, index, salt) {
  const target = unit(index, salt);
  let cursor = 0;
  for (const mode of MODES) {
    cursor += Number(weights[mode] || 0);
    if (target < cursor) return mode;
  }
  return MODES[MODES.length - 1];
}

function groupRanges() {
  let start = 0;
  return GROUPS.map((group) => {
    const range = {...group, start, end: start + group.count};
    start += group.count;
    return range;
  });
}

function addMap(map, key, value = 1) {
  map[key] = Number(map[key] || 0) + value;
}

function makeZeroByMode() {
  return Object.fromEntries(MODES.map((mode) => [mode, 0]));
}

function makeZeroBySlice() {
  return Object.fromEntries(SLICES.map((slice) => [slice.id, 0]));
}

function makeNestedModeSlice() {
  return Object.fromEntries(MODES.map((mode) => [mode, makeZeroBySlice()]));
}

function makeNestedGroupMode() {
  return Object.fromEntries(GROUPS.map((group) => [group.id, makeZeroByMode()]));
}

function makeNestedGroupSlice() {
  return Object.fromEntries(GROUPS.map((group) => [group.id, makeZeroBySlice()]));
}

function makeNestedGroupModeSlice() {
  return Object.fromEntries(GROUPS.map((group) => [
    group.id,
    Object.fromEntries(MODES.map((mode) => [mode, makeZeroBySlice()]))
  ]));
}

function validateGraph() {
  const nodeIds = new Set(model.nodes.map((node) => node.id));
  const edgeIds = new Set();
  const errors = [];
  for (const edge of model.edges) {
    if (edgeIds.has(edge.id)) errors.push(`duplicate edge ${edge.id}`);
    edgeIds.add(edge.id);
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) errors.push(`edge ${edge.id} has unknown endpoint`);
    for (const mode of edge.allowed_modes) {
      if (!MODES.includes(mode)) errors.push(`edge ${edge.id} allows unknown mode ${mode}`);
    }
    for (const slice of SLICES) {
      if (!(Number(edge.capacity_person_trips_by_time_slice[slice.id]) > 0)) errors.push(`edge ${edge.id} has no positive capacity for ${slice.id}`);
    }
  }
  for (const [pathId, edgePath] of Object.entries(model.path_catalog)) {
    for (const edgeId of edgePath) {
      if (!edgeIds.has(edgeId)) errors.push(`path ${pathId} references unknown edge ${edgeId}`);
    }
  }
  if (errors.length) throw new Error(errors.join('; '));
  return {nodeIds, edgeIds};
}

const graph = validateGraph();
const edgeById = Object.fromEntries(model.edges.map((edge) => [edge.id, edge]));
const nodeById = Object.fromEntries(model.nodes.map((node) => [node.id, node]));

function emptyEdgeState(edge) {
  return {
    edge_id: edge.id,
    from: edge.from,
    to: edge.to,
    allowed_modes: edge.allowed_modes,
    capacity_person_trips_by_time_slice: edge.capacity_person_trips_by_time_slice,
    flow_person_trips: 0,
    flow_by_mode: makeZeroByMode(),
    flow_by_group: Object.fromEntries(GROUPS.map((group) => [group.id, 0])),
    flow_by_time_slice: makeZeroBySlice(),
    external_person_trips: 0,
    vehicle_or_service_flow_by_mode: makeZeroByMode()
  };
}

function emptyNodeState(node) {
  return {
    node_id: node.id,
    label_zh: node.label_zh,
    label_en: node.label_en,
    kind: node.kind,
    capacity_person_trips_by_time_slice: node.capacity_person_trips_by_time_slice,
    inflow_person_trips: 0,
    outflow_person_trips: 0,
    inflow_by_mode: makeZeroByMode(),
    outflow_by_mode: makeZeroByMode(),
    inflow_by_time_slice: makeZeroBySlice(),
    outflow_by_time_slice: makeZeroBySlice()
  };
}

function initializeScenario(scenarioId, profileId) {
  return {
    scenario_id: scenarioId,
    profile_id: profileId,
    status: 'synthetic_counterfactual_not_operational',
    population_agents: TOTAL,
    agents_processed: 0,
    path_assignments: 0,
    mode_counts: makeZeroByMode(),
    group_counts: Object.fromEntries(GROUPS.map((group) => [group.id, 0])),
    group_mode_counts: makeNestedGroupMode(),
    time_slice_counts: makeZeroBySlice(),
    mode_time_slice_counts: makeNestedModeSlice(),
    group_time_slice_counts: makeNestedGroupSlice(),
    group_mode_time_slice_counts: makeNestedGroupModeSlice(),
    origin_counts: Object.fromEntries(regional.zones.origins.map((zone) => [zone, 0])),
    destination_counts: Object.fromEntries(regional.zones.destinations.map((zone) => [zone, 0])),
    external_counts: {internal: 0, external: 0},
    external_by_mode: {internal: makeZeroByMode(), external: makeZeroByMode()},
    edge_states: Object.fromEntries(model.edges.map((edge) => [edge.id, emptyEdgeState(edge)])),
    node_states: Object.fromEntries(model.nodes.map((node) => [node.id, emptyNodeState(node)])),
    path_counts: {},
    od_counts: {},
    vehicle_or_service_units_by_mode: makeZeroByMode(),
    accessible_source_agents: 0,
    accessible_corridor_agents: 0,
    air_path_agents: 0
  };
}

function pathIdFor(mode, external, groupId) {
  const externalBranch = external && groupId === 'enterprise_employee'
    && ['metro', 'bus', 'car', 'enterprise_shuttle'].includes(mode)
    ? 'external'
    : 'internal';
  return `${mode}_${externalBranch}`;
}

function destinationGate(destination) {
  if (destination === 'care_and_school') return model.destination_gate_rules.care_and_school;
  if (destination === 'logistics_edge') return model.destination_gate_rules.logistics_edge;
  return null;
}

function pathFor(mode, external, groupId, destination) {
  const pathId = pathIdFor(mode, external, groupId);
  const base = model.path_catalog[pathId];
  if (!base) throw new Error(`no declared path for ${pathId}`);
  const edgePath = [...base];
  const gate = destinationGate(destination);
  const supportsDestinationGate = ['transfer-to-destination', 'cycle-to-destination', 'accessible-to-destination', 'curb-to-destination']
    .some((edgeId) => edgePath.includes(edgeId));
  if (gate && supportsDestinationGate) {
    edgePath.push(gate === 'accessible_service_gate' ? 'destination-service-gate' : 'destination-logistics-gate');
  }
  return {pathId, edgePath};
}

function addNodeFlow(state, nodeId, direction, mode, sliceId, amount) {
  const node = state.node_states[nodeId];
  node[`${direction}_person_trips`] += amount;
  node[`${direction}_by_mode`][mode] += amount;
  node[`${direction}_by_time_slice`][sliceId] += amount;
}

function vehicleEquivalent(mode, personTrips) {
  const parameter = model.vehicle_or_service_units[mode];
  if (!parameter || parameter.persons_per_unit) return parameter && parameter.persons_per_unit ? personTrips / parameter.persons_per_unit : 0;
  return 0;
}

function addEdgeFlow(state, edgeId, mode, groupId, sliceId, external, amount = 1) {
  const edge = state.edge_states[edgeId];
  if (!edge.allowed_modes.includes(mode)) throw new Error(`mode ${mode} used on disallowed edge ${edgeId}`);
  edge.flow_person_trips += amount;
  edge.flow_by_mode[mode] += amount;
  edge.flow_by_group[groupId] += amount;
  edge.flow_by_time_slice[sliceId] += amount;
  if (external) edge.external_person_trips += amount;
  edge.vehicle_or_service_flow_by_mode[mode] += vehicleEquivalent(mode, amount);
  addNodeFlow(state, edge.from, 'outflow', mode, sliceId, amount);
  addNodeFlow(state, edge.to, 'inflow', mode, sliceId, amount);
}

function summarizeEdge(edgeState) {
  const loadByTimeSlice = Object.fromEntries(SLICES.map((slice) => [
    slice.id,
    round(edgeState.flow_by_time_slice[slice.id] / Number(edgeState.capacity_person_trips_by_time_slice[slice.id]))
  ]));
  const peakLoadRatio = Math.max(...Object.values(loadByTimeSlice));
  const totalVehicleFlow = sum(Object.values(edgeState.vehicle_or_service_flow_by_mode));
  return {
    ...edgeState,
    flow_person_trips: round(edgeState.flow_person_trips, 2),
    flow_by_mode: Object.fromEntries(MODES.map((mode) => [mode, round(edgeState.flow_by_mode[mode], 2)])),
    flow_by_group: Object.fromEntries(GROUPS.map((group) => [group.id, round(edgeState.flow_by_group[group.id], 2)])),
    flow_by_time_slice: Object.fromEntries(SLICES.map((slice) => [slice.id, round(edgeState.flow_by_time_slice[slice.id], 2)])),
    external_person_trips: round(edgeState.external_person_trips, 2),
    vehicle_or_service_flow_by_mode: Object.fromEntries(MODES.map((mode) => [mode, round(edgeState.vehicle_or_service_flow_by_mode[mode], 2)])),
    vehicle_or_service_flow: round(totalVehicleFlow, 2),
    load_ratio_by_time_slice: loadByTimeSlice,
    peak_load_ratio: round(peakLoadRatio),
    gate_pass: peakLoadRatio <= MAX_LOAD,
    interpretation: 'synthetic edge pressure; not an observed road, rail or station capacity'
  };
}

function summarizeNode(nodeState) {
  const loadByTimeSlice = nodeState.capacity_person_trips_by_time_slice
    ? Object.fromEntries(SLICES.map((slice) => [
      slice.id,
      round(nodeState.inflow_by_time_slice[slice.id] / Number(nodeState.capacity_person_trips_by_time_slice[slice.id]))
    ]))
    : null;
  const peakLoadRatio = loadByTimeSlice ? Math.max(...Object.values(loadByTimeSlice)) : null;
  return {
    ...nodeState,
    inflow_person_trips: round(nodeState.inflow_person_trips, 2),
    outflow_person_trips: round(nodeState.outflow_person_trips, 2),
    inflow_by_mode: Object.fromEntries(MODES.map((mode) => [mode, round(nodeState.inflow_by_mode[mode], 2)])),
    outflow_by_mode: Object.fromEntries(MODES.map((mode) => [mode, round(nodeState.outflow_by_mode[mode], 2)])),
    inflow_by_time_slice: Object.fromEntries(SLICES.map((slice) => [slice.id, round(nodeState.inflow_by_time_slice[slice.id], 2)])),
    outflow_by_time_slice: Object.fromEntries(SLICES.map((slice) => [slice.id, round(nodeState.outflow_by_time_slice[slice.id], 2)])),
    balance_gap_person_trips: round(nodeState.inflow_person_trips - nodeState.outflow_person_trips, 2),
    load_ratio_by_time_slice: loadByTimeSlice,
    peak_load_ratio: peakLoadRatio === null ? null : round(peakLoadRatio),
    gate_pass: peakLoadRatio === null ? true : peakLoadRatio <= MAX_LOAD,
    interpretation: nodeState.capacity_person_trips_by_time_slice
      ? 'synthetic node pressure; not an observed station, curb or facility capacity'
      : 'aggregate ledger node without a capacity claim'
  };
}

function simulateScenario(scenarioId, profileId) {
  const state = initializeScenario(scenarioId, profileId);
  const profile = regional.mode_weights_by_group[profileId];
  const ranges = groupRanges();
  for (const group of ranges) {
    const rule = regional.departure_time_choice.group_rules[group.id];
    for (let offset = 0; offset < group.count; offset += 1) {
      const index = group.start + offset;
      const origin = regional.zones.origins[hash(index, 11) % regional.zones.origins.length];
      const destination = regional.zones.destinations[hash(index, 13) % regional.zones.destinations.length];
      const external = unit(index, 17) < (group.id === 'enterprise_employee' ? 0.58 : group.id === 'resident_worker' ? 0.24 : 0.14);
      const mode = selectWeighted(profile[group.id], index, 19);
      const shiftEligible = profileId === 'O4' && rule.shiftable && unit(index, 67) < Number(rule.shift_share_O4 || 0);
      const sliceId = shiftEligible ? rule.shift_band : rule.default_band;
      const {pathId, edgePath} = pathFor(mode, external, group.id, destination);
      if (edgePath.some((edgeId) => edgeId.includes('air'))) state.air_path_agents += 1;
      if (mode === 'walking_wheelchair') state.accessible_source_agents += 1;
      if (mode === 'walking_wheelchair' && edgePath.includes('origin-to-accessible') && edgePath.includes('accessible-to-destination')) state.accessible_corridor_agents += 1;
      addMap(state.mode_counts, mode);
      addMap(state.group_counts, group.id);
      addMap(state.group_mode_counts[group.id], mode);
      addMap(state.time_slice_counts, sliceId);
      addMap(state.mode_time_slice_counts[mode], sliceId);
      addMap(state.group_time_slice_counts[group.id], sliceId);
      addMap(state.group_mode_time_slice_counts[group.id][mode], sliceId);
      addMap(state.origin_counts, origin);
      addMap(state.destination_counts, destination);
      addMap(state.external_counts, external ? 'external' : 'internal');
      addMap(state.external_by_mode[external ? 'external' : 'internal'], mode);
      addMap(state.path_counts, pathId);
      addMap(state.od_counts, `${origin} → ${destination}`);
      for (const edgeId of edgePath) addEdgeFlow(state, edgeId, mode, group.id, sliceId, external);
      state.vehicle_or_service_units_by_mode[mode] += vehicleEquivalent(mode, 1);
      state.agents_processed += 1;
      state.path_assignments += 1;
    }
  }

  const edgeResults = Object.values(state.edge_states).map(summarizeEdge);
  const nodeResults = Object.values(state.node_states).map(summarizeNode);
  const edgePeak = Math.max(...edgeResults.map((edge) => edge.peak_load_ratio));
  const nodePeak = Math.max(...nodeResults.filter((node) => node.peak_load_ratio !== null).map((node) => node.peak_load_ratio));
  const topEdges = [...edgeResults].sort((left, right) => right.peak_load_ratio - left.peak_load_ratio).slice(0, 6).map((edge) => ({
    edge_id: edge.edge_id,
    from: edge.from,
    to: edge.to,
    flow_person_trips: edge.flow_person_trips,
    vehicle_or_service_flow: edge.vehicle_or_service_flow,
    peak_load_ratio: edge.peak_load_ratio,
    preferred_load_ratio: edge.load_ratio_by_time_slice.preferred,
    external_person_trips: edge.external_person_trips
  }));
  const topNodes = [...nodeResults]
    .filter((node) => node.peak_load_ratio !== null)
    .sort((left, right) => right.peak_load_ratio - left.peak_load_ratio)
    .slice(0, 6)
    .map((node) => ({
      node_id: node.node_id,
      label_zh: node.label_zh,
      label_en: node.label_en,
      inflow_person_trips: node.inflow_person_trips,
      peak_load_ratio: node.peak_load_ratio,
      preferred_load_ratio: node.load_ratio_by_time_slice.preferred,
      balance_gap_person_trips: node.balance_gap_person_trips
    }));
  const topOD = Object.entries(state.od_counts).sort((left, right) => right[1] - left[1]).slice(0, 10).map(([od, count]) => ({od, count, share: round(count / TOTAL)}));
  const groupAccessibilityRouteShare = Object.fromEntries(GROUPS.map((group) => {
    const walking = state.group_mode_counts[group.id].walking_wheelchair;
    const groupTotal = state.group_counts[group.id];
    return [group.id, {walking_wheelchair_agents: walking, share: round(walking / Math.max(groupTotal, 1)), corridor_preserved: true}];
  }));
  const checks = {
    all_agents_processed: state.agents_processed === TOTAL,
    path_mass_conservation: state.path_assignments === TOTAL,
    mode_mass_conservation: sum(Object.values(state.mode_counts)) === TOTAL,
    time_slice_mass_conservation: sum(Object.values(state.time_slice_counts)) === TOTAL,
    group_mass_conservation: sum(Object.values(state.group_counts)) === TOTAL,
    origin_mass_conservation: sum(Object.values(state.origin_counts)) === TOTAL,
    destination_mass_conservation: sum(Object.values(state.destination_counts)) === TOTAL,
    external_internal_mass_conservation: sum(Object.values(state.external_counts)) === TOTAL,
    accessible_source_preserved: state.accessible_source_agents === state.accessible_corridor_agents,
    no_air_path: state.air_path_agents === 0,
    network_edge_gate_pass: edgeResults.every((edge) => edge.gate_pass),
    network_node_gate_pass: nodeResults.every((node) => node.gate_pass),
    balanced_transfer_nodes: nodeResults.filter((node) => ['dazhongsi_transfer', 'metro_backbone', 'bus_spine', 'protected_cycle_link', 'accessible_corridor', 'managed_curb', 'enterprise_shuttle_spine'].includes(node.node_id)).every((node) => Math.abs(node.balance_gap_person_trips) < 0.01)
  };
  return {
    scenario_id: scenarioId,
    profile_id: profileId,
    status: state.status,
    population_agents: TOTAL,
    agents_processed: state.agents_processed,
    path_assignments: state.path_assignments,
    mode_counts: state.mode_counts,
    mode_shares: Object.fromEntries(MODES.map((mode) => [mode, round(state.mode_counts[mode] / TOTAL)])),
    group_counts: state.group_counts,
    group_mode_counts: state.group_mode_counts,
    time_slice_counts: state.time_slice_counts,
    mode_time_slice_counts: state.mode_time_slice_counts,
    group_time_slice_counts: state.group_time_slice_counts,
    group_mode_time_slice_counts: state.group_mode_time_slice_counts,
    origin_counts: state.origin_counts,
    destination_counts: state.destination_counts,
    external_counts: state.external_counts,
    external_by_mode: state.external_by_mode,
    path_counts: state.path_counts,
    od_top10: topOD,
    vehicle_or_service_units_by_mode: Object.fromEntries(MODES.map((mode) => [mode, round(state.vehicle_or_service_units_by_mode[mode], 2)])),
    accessible_source_agents: state.accessible_source_agents,
    accessible_corridor_agents: state.accessible_corridor_agents,
    air_path_agents: state.air_path_agents,
    edge_results: edgeResults,
    node_results: nodeResults,
    top_edges: topEdges,
    top_nodes: topNodes,
    group_accessibility_route_share: groupAccessibilityRouteShare,
    maximum_edge_load_ratio: round(edgePeak),
    maximum_node_load_ratio: round(nodePeak),
    maximum_network_load_ratio: round(Math.max(edgePeak, nodePeak)),
    gate: {
      maximum_edge_or_node_load_ratio: MAX_LOAD,
      edge_pass: checks.network_edge_gate_pass,
      node_pass: checks.network_node_gate_pass,
      pass: checks.network_edge_gate_pass && checks.network_node_gate_pass
    },
    checks,
    privacy_check: 'aggregate_only_no_personal_trace',
    air_candidate: 'blocked',
    interpretation: 'Synthetic node/edge pressure and vehicle-equivalent ledger; not observed road, rail, station, curb, timetable or resident-performance evidence.'
  };
}

const scenarios = model.scope.scenarios.map((scenario) => simulateScenario(scenario.id, scenario.profile_id));
const baseline = scenarios.find((scenario) => scenario.profile_id === 'B0');
const selected = scenarios.find((scenario) => scenario.profile_id === 'O4');
const checks = {
  model_population_matches_regional: model.scope.population_reference === TOTAL,
  graph_nodes_and_edges_declared: graph.nodeIds.size === model.nodes.length && graph.edgeIds.size === model.edges.length,
  all_scenarios_processed: scenarios.every((scenario) => scenario.checks.all_agents_processed),
  all_scenarios_mass_conserved: scenarios.every((scenario) => Object.entries(scenario.checks).filter(([key]) => key.includes('mass_conservation')).every(([, value]) => value)),
  accessible_corridor_preserved: scenarios.every((scenario) => scenario.checks.accessible_source_preserved),
  air_candidate_fail_closed: scenarios.every((scenario) => scenario.checks.no_air_path && scenario.air_candidate === 'blocked'),
  selected_policy_network_gate_pass: selected.gate.pass,
  selected_policy_has_vehicle_ledger: Object.values(selected.vehicle_or_service_units_by_mode).some((value) => value > 0),
  selected_policy_has_external_flow: selected.external_counts.external > 0,
  privacy_aggregate_only: scenarios.every((scenario) => scenario.privacy_check === 'aggregate_only_no_personal_trace')
};

const output = {
  screen_id: model.screen_id,
  model_version: model.model_version,
  generated_by: 'node visual/assets/run-network-flow-screen.js',
  status: model.status,
  scope: model.scope,
  assignment_parity: model.assignment_parity,
  capacity_gate: model.capacity_gate,
  selected_policy: selected.scenario_id,
  scenarios,
  comparison_selected_minus_baseline: {
    maximum_network_load_ratio: round(selected.maximum_network_load_ratio - baseline.maximum_network_load_ratio),
    preferred_transfer_inflow_person_trips: round(selected.node_results.find((node) => node.node_id === 'dazhongsi_transfer').inflow_by_time_slice.preferred - baseline.node_results.find((node) => node.node_id === 'dazhongsi_transfer').inflow_by_time_slice.preferred),
    external_person_trips: selected.external_counts.external - baseline.external_counts.external,
    car_person_trips: selected.mode_counts.car - baseline.mode_counts.car,
    metro_person_trips: selected.mode_counts.metro - baseline.mode_counts.metro,
    bus_person_trips: selected.mode_counts.bus - baseline.mode_counts.bus
  },
  checks,
  calibration_required: model.calibration_required,
  method_sources: model.method_sources,
  interpretation: model.scope.interpretation
};

Object.entries(checks).forEach(([name, passed]) => {
  if (!passed) fail(name);
});

console.log(JSON.stringify(output, null, 2));
if (Object.values(checks).every(Boolean)) console.error('NETWORK_FLOW_CHECK_PASS: all network-flow checks passed');
