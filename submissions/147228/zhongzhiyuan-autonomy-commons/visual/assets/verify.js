#!/usr/bin/env node
/*
 * Independent, dependency-free replay of the Autonomy package's class-1
 * metrics and structural claims.  It deliberately refuses to turn a
 * provisional point, a synthetic record or an unknown field result into a
 * deployment claim.
 *
 *   node visual/assets/verify.js
 *   node visual/assets/verify.js --selftest
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const read = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const text = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

// CGCS2000 / 3-degree Gauss-Kruger CM 117E (EPSG:4548), reimplemented here
// so a reviewer needs only Node and the submitted package.
const A = 6378137.0;
const F = 1 / 298.257222101;
const E2 = 2 * F - F * F;
const LON0 = (117 * Math.PI) / 180;
const FE = 500000.0;

function project(lon, lat) {
  const phi = (lat * Math.PI) / 180;
  const lam = (lon * Math.PI) / 180;
  const ep2 = E2 / (1 - E2);
  const N = A / Math.sqrt(1 - E2 * Math.sin(phi) ** 2);
  const T = Math.tan(phi) ** 2;
  const C = ep2 * Math.cos(phi) ** 2;
  const Ad = (lam - LON0) * Math.cos(phi);
  const M = A * (
    (1 - E2 / 4 - (3 * E2 ** 2) / 64 - (5 * E2 ** 3) / 256) * phi -
    ((3 * E2) / 8 + (3 * E2 ** 2) / 32 + (45 * E2 ** 3) / 1024) * Math.sin(2 * phi) +
    ((15 * E2 ** 2) / 256 + (45 * E2 ** 3) / 1024) * Math.sin(4 * phi) -
    ((35 * E2 ** 3) / 3072) * Math.sin(6 * phi)
  );
  return [
    N * (Ad + ((1 - T + C) * Ad ** 3) / 6 +
      ((5 - 18 * T + T * T + 72 * C - 58 * ep2) * Ad ** 5) / 120) + FE,
    M + N * Math.tan(phi) * ((Ad * Ad) / 2 +
      ((5 - T + 9 * C + 4 * C * C) * Ad ** 4) / 24 +
      ((61 - 58 * T + T * T + 600 * C - 330 * ep2) * Ad ** 6) / 720)
  ];
}

function ringArea(ring) {
  let total = 0;
  for (let i = 0; i < ring.length; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    total += x1 * y2 - x2 * y1;
  }
  return total / 2;
}

function polygonArea(rings) {
  return rings.reduce((sum, ring, i) => {
    const projected = ring.map(([lon, lat]) => project(lon, lat));
    return sum + (i === 0 ? Math.abs(ringArea(projected)) : -Math.abs(ringArea(projected)));
  }, 0);
}

function geometryArea(geometry) {
  if (geometry.type === 'Polygon') return polygonArea(geometry.coordinates);
  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates.reduce((sum, polygon) => sum + polygonArea(polygon), 0);
  }
  return 0;
}

function geometryLength(geometry) {
  const line = (coords) => {
    const points = coords.map(([lon, lat]) => project(lon, lat));
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      total += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    }
    return total;
  };
  if (geometry.type === 'LineString') return line(geometry.coordinates);
  if (geometry.type === 'MultiLineString') return geometry.coordinates.reduce((sum, c) => sum + line(c), 0);
  return 0;
}

function layerArea(file, data) {
  return data[file].features.reduce((sum, feature) => sum + geometryArea(feature.geometry), 0);
}

function pointInRing(ring, x, y) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function pointInPolygon(geometry, point) {
  if (geometry.type !== 'Polygon') return false;
  const [x, y] = point;
  return pointInRing(geometry.coordinates[0], x, y) &&
    !geometry.coordinates.slice(1).some((hole) => pointInRing(hole, x, y));
}

const AUTONOMY_METRICS = [
  'autonomy_scenario_card_count', 'autonomy_node_count', 'autonomy_metric_count',
  'autonomy_trial_route_length_m', 'curb_conflict_rate',
  'accessible_route_continuity_ratio', 'remote_stop_response_seconds',
  'autonomy_fallback_success_ratio', 'data_minimization_coverage_ratio',
  'autonomy_trial_speed_limit_status', 'ai_landmark_count'
];

function audit(mutate = () => {}) {
  const metricsFile = read('metrics.json');
  const data = {
    'geometry/site_boundary.geojson': read('geometry/site_boundary.geojson'),
    'geometry/buildings.geojson': read('geometry/buildings.geojson'),
    'geometry/green_space.geojson': read('geometry/green_space.geojson'),
    'geometry/public_space.geojson': read('geometry/public_space.geojson'),
    'geometry/roads.geojson': read('geometry/roads.geojson'),
    'visual/assets/autonomy_nodes.json': read('visual/assets/autonomy_nodes.json'),
    'visual/assets/autonomous-scenarios.json': read('visual/assets/autonomous-scenarios.json'),
    'visual/assets/public-landmarks.json': read('visual/assets/public-landmarks.json')
  };
  const state = {metrics: metricsFile.metrics, data};
  mutate(state);

  const boundary = state.data['geometry/site_boundary.geojson'].features[0];
  const buildings = state.data['geometry/buildings.geojson'];
  const green = state.data['geometry/green_space.geojson'];
  const publicSpace = state.data['geometry/public_space.geojson'];
  const roads = state.data['geometry/roads.geojson'];
  const nodes = state.data['visual/assets/autonomy_nodes.json'];
  const scenarios = state.data['visual/assets/autonomous-scenarios.json'];
  const landmarks = state.data['visual/assets/public-landmarks.json'];
  const nodeFeatures = nodes.features.filter((f) => f.geometry && f.geometry.type === 'Point');
  const nodeIds = nodeFeatures.map((f) => f.properties.id);
  const nodeSet = new Set(nodeIds);
  const route = nodes.features.find((f) => f.properties.id === 'AUTO-ROUTE-001');
  const prose = `${text('proposal.md')}\n${text('proposal.en.md')}`;

  const site = geometryArea(boundary.geometry);
  const buildingArea = layerArea('geometry/buildings.geojson', state.data);
  const roadFeatures = roads.features;
  const spine = roadFeatures.find((f) => f.properties.id === 'ROAD-001');
  const computed = {
    site_area_sqm: site,
    building_footprint_area_sqm: buildingArea,
    building_footprint_ratio: buildingArea / site,
    green_ratio: layerArea('geometry/green_space.geojson', state.data) / site,
    public_space_ratio: layerArea('geometry/public_space.geojson', state.data) / site,
    key_area_count: read('geometry/key_areas.geojson').features.length,
    design_north_south_spine_length_m: spine ? geometryLength(spine.geometry) : 0,
    design_east_west_connector_count: roadFeatures.filter((f) => f.properties.network_role === 'east_west_connector').length,
    design_slow_mobility_network_length_m: roadFeatures.reduce((sum, f) => sum + geometryLength(f.geometry), 0),
    autonomy_scenario_card_count: scenarios.scenarios.length,
    autonomy_node_count: nodeFeatures.length,
    autonomy_metric_count: AUTONOMY_METRICS.length,
    ai_landmark_count: landmarks.landmarks.length
  };

  const failures = [];
  const metricRows = [];
  const close = (name, actual, expected) => {
    const isCount = name.endsWith('_count');
    const tolerance = isCount ? 0 : Math.max(Math.abs(expected) * 1e-4, 1e-8);
    const ok = Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance;
    metricRows.push({metric: name, declared: expected, recomputed: isCount ? actual : Number(actual.toFixed(6)), result: ok ? 'PASS' : 'FAIL'});
    if (!ok) failures.push(`metric:${name}`);
  };
  for (const [name, metric] of Object.entries(state.metrics)) {
    if (metric.status === 'known') {
      if (!Object.prototype.hasOwnProperty.call(computed, name)) failures.push(`known_metric_not_recomputed:${name}`);
      else close(name, computed[name], metric.value);
    } else if ((metric.status === 'unknown' || metric.status === 'not_applicable') && metric.value !== null) {
      failures.push(`non_known_metric_must_be_null:${name}`);
    }
  }

  const check = (name, ok, detail) => {
    if (!ok) failures.push(name);
    return {claim: name, result: ok ? 'PASS' : 'FAIL', detail};
  };
  const structural = [];
  structural.push(check('site_boundary_is_explicitly_provisional', boundary.properties.official_boundary === false, String(boundary.properties.official_boundary)));
  structural.push(check('exactly_three_provisional_autonomy_nodes', nodeFeatures.length === 3 && new Set(nodeIds).size === 3, `${nodeFeatures.length} nodes`));
  structural.push(check('all_nodes_are_inside_provisional_boundary', nodeFeatures.every((f) => pointInPolygon(boundary.geometry, f.geometry.coordinates)), nodeIds.join(',')));
  structural.push(check('audit_route_is_not_a_vehicle_route', Boolean(route) && route.properties.vehicle_route === false, route ? String(route.properties.vehicle_route) : 'missing'));
  structural.push(check('audit_route_visits_all_nodes', Boolean(route) && route.geometry.type === 'LineString' && route.geometry.coordinates.length >= 3 && route.geometry.coordinates.every((point, i) => {
    if (i >= nodeFeatures.length) return true;
    return point[0] === nodeFeatures[i].geometry.coordinates[0] && point[1] === nodeFeatures[i].geometry.coordinates[1];
  }), route ? route.geometry.coordinates.length : 0));
  structural.push(check('all_twelve_cards_have_a_declared_node', scenarios.scenarios.length === 12 && scenarios.scenarios.every((s) => nodeSet.has(s.node)), scenarios.scenarios.length));
  structural.push(check('all_three_nodes_are_named_in_bilingual_prose', nodeIds.every((id) => prose.includes(id)), nodeIds.join(',')));
  structural.push(check('three_public_landmarks_are_structured', landmarks.landmarks.length === 3 && landmarks.landmarks.every((x) => x.id && x.name_zh && x.name_en), landmarks.landmarks.length));
  structural.push(check('public_route_contract_is_reachable', fs.existsSync(path.join(__dirname, 'public-route-continuity.schema.json')) && fs.existsSync(path.join(__dirname, 'example-public-route-continuity.json')), 'schema and example present'));
  structural.push(check('provisional_boundary_is_not_promoted_in_prose', prose.includes('provisional') && prose.includes('unknown'), 'boundary words present'));
  return {ok: failures.length === 0, failures, metricRows, structural};
}

function main() {
  if (process.argv.includes('--selftest')) {
    const cases = [
      ['clean_package', () => audit(), false],
      ['wrong_site_area', () => audit((s) => { s.metrics.site_area_sqm.value += 10000; }), true],
      ['missing_node', () => audit((s) => { s.data['visual/assets/autonomy_nodes.json'].features.pop(); }), true],
      ['vehicle_route_promoted', () => audit((s) => { s.data['visual/assets/autonomy_nodes.json'].features.find((f) => f.properties.id === 'AUTO-ROUTE-001').properties.vehicle_route = true; }), true],
      ['scenario_points_to_unknown_node', () => audit((s) => { s.data['visual/assets/autonomous-scenarios.json'].scenarios[0].node = 'AUTO-NODE-999'; }), true]
    ];
    const results = cases.map(([id, run, expectFailure]) => {
      const result = run();
      return {id, expected_failure: expectFailure, observed_failure: !result.ok, ok: (!result.ok) === expectFailure, failures: result.failures};
    });
    const report = {ok: results.every((r) => r.ok), selftest_count: results.length, results};
    console.log(JSON.stringify(report, null, 2));
    process.exitCode = report.ok ? 0 : 1;
    return;
  }
  const result = audit();
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.ok ? 0 : 1;
}

main();
