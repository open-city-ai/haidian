#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2] || path.join(__dirname, 'ai-era-pilot-dossier.json');
const contract = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const rootIndex = process.argv.indexOf('--root');
const packageRoot = rootIndex >= 0 ? path.resolve(process.argv[rootIndex + 1]) : path.resolve(__dirname, '..', '..');
const errors = [];
const fail = (message) => errors.push(message);
const nonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;
const positive = (value) => Number.isFinite(value) && value > 0;
const close = (a, b) => Math.abs(a - b) < 0.001;

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(packageRoot, relativePath), 'utf8'));
}

function byId(collection, id) {
  return (collection?.features || []).find((feature) => (feature?.properties?.id || feature?.id) === id);
}

function refId(ref) {
  return String(ref || '').split('#')[1] || '';
}

function flattenCoordinates(value, output = []) {
  if (Array.isArray(value) && value.length >= 2 && value.every((item) => typeof item === 'number')) output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => flattenCoordinates(item, output));
  return output;
}

function bbox(feature) {
  const points = flattenCoordinates(feature?.geometry?.coordinates);
  return {
    minX: Math.min(...points.map((point) => point[0])),
    minY: Math.min(...points.map((point) => point[1])),
    maxX: Math.max(...points.map((point) => point[0])),
    maxY: Math.max(...points.map((point) => point[1]))
  };
}

function ringWithoutClosure(ring) {
  if (!Array.isArray(ring)) return [];
  if (ring.length > 1 && Math.abs(ring[0][0] - ring[ring.length - 1][0]) < 1e-12 && Math.abs(ring[0][1] - ring[ring.length - 1][1]) < 1e-12) return ring.slice(0, -1);
  return ring.slice();
}

function pointOnSegment(point, start, end, tolerance = 1e-10) {
  const cross = (point[1] - start[1]) * (end[0] - start[0]) - (point[0] - start[0]) * (end[1] - start[1]);
  if (Math.abs(cross) > tolerance) return false;
  const dot = (point[0] - start[0]) * (end[0] - start[0]) + (point[1] - start[1]) * (end[1] - start[1]);
  if (dot < -tolerance) return false;
  const lengthSquared = (end[0] - start[0]) ** 2 + (end[1] - start[1]) ** 2;
  return dot <= lengthSquared + tolerance;
}

function pointInRing(point, ring) {
  const points = ringWithoutClosure(ring);
  let inside = false;
  for (let index = 0, previous = points.length - 1; index < points.length; previous = index++) {
    const currentPoint = points[index];
    const previousPoint = points[previous];
    if (pointOnSegment(point, previousPoint, currentPoint)) return true;
    const crosses = ((currentPoint[1] > point[1]) !== (previousPoint[1] > point[1]))
      && point[0] < (previousPoint[0] - currentPoint[0]) * (point[1] - currentPoint[1]) / (previousPoint[1] - currentPoint[1]) + currentPoint[0];
    if (crosses) inside = !inside;
  }
  return inside;
}

function polygonCoversFeature(outer, inner) {
  const outerRing = outer?.geometry?.coordinates?.[0] || [];
  const innerPoints = inner?.geometry?.type === 'Point'
    ? [inner.geometry.coordinates]
    : flattenCoordinates(inner?.geometry?.coordinates?.[0]);
  return outerRing.length >= 4 && innerPoints.length > 0 && innerPoints.every((point) => pointInRing(point, outerRing));
}

function orientation(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
}

function segmentsIntersect(a, b, c, d) {
  const o1 = orientation(a, b, c);
  const o2 = orientation(a, b, d);
  const o3 = orientation(c, d, a);
  const o4 = orientation(c, d, b);
  if ((o1 > 0) !== (o2 > 0) && (o3 > 0) !== (o4 > 0)) return true;
  return pointOnSegment(c, a, b) || pointOnSegment(d, a, b) || pointOnSegment(a, c, d) || pointOnSegment(b, c, d);
}

function polygonIntersectsFeature(polygon, feature) {
  if (feature?.geometry?.type === 'Point') return pointInRing(feature.geometry.coordinates, polygon.geometry.coordinates[0]);
  const outer = ringWithoutClosure(polygon?.geometry?.coordinates?.[0]);
  const inner = ringWithoutClosure(feature?.geometry?.coordinates?.[0]);
  if (!outer.length || !inner.length) return false;
  if (outer.some((point) => pointInRing(point, inner)) || inner.some((point) => pointInRing(point, outer))) return true;
  return outer.some((start, index) => {
    const end = outer[(index + 1) % outer.length];
    return inner.some((otherStart, otherIndex) => segmentsIntersect(start, end, otherStart, inner[(otherIndex + 1) % inner.length]));
  });
}

function ringsEquivalent(a, b, tolerance = 1e-10) {
  const left = ringWithoutClosure(a);
  const right = ringWithoutClosure(b);
  return left.length === right.length && left.every((point) => right.some((other) => Math.abs(point[0] - other[0]) <= tolerance && Math.abs(point[1] - other[1]) <= tolerance));
}

function ringCenter(ring) {
  const points = ringWithoutClosure(ring);
  return [points.reduce((sum, point) => sum + point[0], 0) / points.length, points.reduce((sum, point) => sum + point[1], 0) / points.length];
}

function overlaps(a, b) {
  return a.minX < b.maxX && a.maxX > b.minX && a.minY < b.maxY && a.maxY > b.minY;
}

function distanceMeters(a, b) {
  const radians = (value) => value * Math.PI / 180;
  const lat1 = radians(a[1]);
  const lat2 = radians(b[1]);
  const dLat = lat2 - lat1;
  const dLon = radians(b[0] - a[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 6371008.8 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function polygonDimensions(feature) {
  const ring = feature?.geometry?.coordinates?.[0] || [];
  return [distanceMeters(ring[0], ring[1]), distanceMeters(ring[1], ring[2])];
}

if (contract.design_only !== true) fail('design_only must remain true');
if (contract.decision !== 'HOLD') fail('decision must remain HOLD');
if (contract.official_boundary !== false) fail('official_boundary must remain false');
if (contract.authorization_count !== 0 || contract.field_observation_count !== 0) fail('authorization and field observation counts must remain zero');
if (contract.result_status !== 'not_run') fail('result_status must remain not_run');
if (!nonEmpty(contract.boundary)) fail('boundary statement is required');

const pilot = contract.pilot || {};
if (pilot.pilot_id !== 'PILOT-AIORIGIN-ORDINARY-SERVICE-NODE') fail('pilot ID changed');
if (pilot.site_ref !== 'PROV-KEY-002') fail('pilot must remain tied to the provisional AI Origin key area');
if (pilot.selected_alternative !== 'ALT-C') fail('pilot must implement ALT-C');
if (!Array.isArray(pilot.scenario_refs) || pilot.scenario_refs.length !== 4) fail('pilot requires four scenario references');

const binding = contract.geometry_binding || {};
if (binding.status !== 'participant_authored_low_confidence_design_binding') fail('geometry binding must remain a low-confidence participant design binding');
if (binding.formal_geometry_file !== 'geometry/public_space.geojson' || binding.formal_feature_count !== 9) fail('geometry binding must declare nine pilot features');
if (!nonEmpty(binding.boundary)) fail('geometry binding boundary is required');
try {
  const pilotLayer = readJson(binding.formal_geometry_file);
  const keyAreas = readJson('geometry/key_areas.geojson');
  const publicSpaces = readJson('geometry/public_space.geojson');
  const constraints = readJson('geometry/constraints.geojson');
  const refs = [binding.envelope_ref, ...Object.values(binding.module_refs || {}).flat()];
  const refIds = refs.map(refId);
  const pilotFeatures = (pilotLayer.features || []).filter((feature) => feature.properties?.pilot_id === pilot.pilot_id);
  if (refs.length !== 9 || new Set(refIds).size !== 9 || pilotFeatures.length !== 9) fail('geometry binding must resolve nine unique formal features');
  const features = refIds.map((id) => byId(pilotLayer, id));
  if (features.some((feature) => !feature)) fail('one or more pilot formal feature refs do not resolve');
  for (const feature of features.filter(Boolean)) {
    const properties = feature.properties || {};
    if (properties.layer !== 'PUBLIC_SPACE' || properties.pilot_geometry_class !== 'PILOT_NODE_DESIGN' || properties.source_type !== 'agent_generated_design' || properties.confidence !== 'low' || properties.geometry_role !== 'design_proposal') fail(`${properties.id}: formal pilot feature boundary fields changed`);
    if (properties.official_boundary !== false || properties.authorization !== 0 || properties.field_observations !== 0 || properties.decision !== 'HOLD' || properties.must_recalculate !== true) fail(`${properties.id}: formal pilot feature must remain fail-closed`);
    if (!positive(properties.area_sqm_declared)) fail(`${properties.id}: projected design area must be declared for spatial review`);
  }
  const envelope = byId(pilotLayer, 'PILOT-AIORIGIN-ENVELOPE');
  const keyArea = byId(keyAreas, refId(binding.host_refs?.key_area));
  const publicSpace = byId(publicSpaces, refId(binding.host_refs?.public_space));
  const scenarioNode = byId(constraints, refId(binding.host_refs?.scenario_node));
  if (!envelope || !keyArea || !publicSpace || !scenarioNode) fail('pilot host refs must resolve to envelope, key area, public space and scenario node');
  else {
    if (!polygonCoversFeature(keyArea, envelope) || !polygonCoversFeature(publicSpace, envelope) || !polygonCoversFeature(envelope, scenarioNode)) fail('pilot envelope must remain inside PROV-KEY-002 and PUBLIC-03 and contain SCN-03');
    for (const feature of features.filter((item) => item && item !== envelope)) if (!polygonCoversFeature(envelope, feature)) fail(`${feature.properties.id}: module leaves pilot envelope`);
  }
  const ordinary = byId(pilotLayer, 'PILOT-AIORIGIN-M01-ORDINARY-ROUTE');
  const island = byId(pilotLayer, 'PILOT-AIORIGIN-M04-AI-ISLAND');
  const clearRing = byId(pilotLayer, 'PILOT-AIORIGIN-M05-CLEAR-RING');
  if (!ordinary || !island || !clearRing || overlaps(bbox(ordinary), bbox(island))) fail('removable island must stay outside the ordinary route');
  if (!clearRing || clearRing.geometry?.type !== 'Polygon' || clearRing.geometry.coordinates?.length !== 2 || !ringsEquivalent(clearRing.geometry.coordinates[1], island.geometry.coordinates[0])) fail('clear ring must contain the island as an equivalent polygon hole');
  const dimensionChecks = [
    ['PILOT-AIORIGIN-ENVELOPE', 30.0, 18.0],
    ['PILOT-AIORIGIN-M01-ORDINARY-ROUTE', 30.0, 3.0],
    ['PILOT-AIORIGIN-M02-STAFFED-SERVICE', 6.0, 4.0],
    ['PILOT-AIORIGIN-M03-LOW-STIM-WAITING', 6.0, 4.0],
    ['PILOT-AIORIGIN-M04-AI-ISLAND', 4.0, 3.0],
    ['PILOT-AIORIGIN-M05-CLEAR-RING', 8.0, 7.0],
    ['PILOT-AIORIGIN-M06-MAINTENANCE-ACCESS', 2.4, 18.0],
    ['PILOT-AIORIGIN-M07-EXIT-WEST', 1.8, 2.0],
    ['PILOT-AIORIGIN-M07-EXIT-EAST', 1.8, 2.0]
  ];
  for (const [id, expectedWidth, expectedDepth] of dimensionChecks) {
    const [width, depth] = polygonDimensions(byId(pilotLayer, id));
    if (Math.abs(width - expectedWidth) > 0.25 || Math.abs(depth - expectedDepth) > 0.25) fail(`${id}: geodesic dimensions no longer match the design targets`);
  }
  if (clearRing && island) {
    const [outerWidth, outerDepth] = polygonDimensions(clearRing);
    const [islandWidth, islandDepth] = polygonDimensions(island);
    if (Math.abs((outerWidth - islandWidth) / 2 - 2.0) > 0.25 || Math.abs((outerDepth - islandDepth) / 2 - 2.0) > 0.25) fail('clear ring must retain the two-metre design clearance');
    if (distanceMeters(ringCenter(clearRing.geometry.coordinates[0]), ringCenter(island.geometry.coordinates[0])) > 0.1) fail('clear ring and removable island must remain concentric');
  }
  for (const item of binding.context_not_used_for_siting || []) {
    const id = refId(item.ref);
    const collection = item.ref.includes('public_space') ? publicSpaces : constraints;
    const feature = byId(collection, id);
    if (!feature || polygonIntersectsFeature(keyArea, feature)) fail(`${id}: excluded context must exist and remain outside PROV-KEY-002`);
  }
} catch (error) {
  fail(`geometry binding files cannot be validated: ${error.message}`);
}

const rule = contract.dimension_rule || {};
if (rule.status !== 'participant_authored_design_target' || rule.must_recalculate !== true) fail('dimension rule must remain a recalculable design target');
if (!Array.isArray(rule.recalculation_triggers) || rule.recalculation_triggers.length < 6) fail('six recalculation triggers are required');

const spatial = contract.spatial_dossier || {};
if (JSON.stringify(spatial.scale_chain) !== JSON.stringify(['1:500', '1:100', '1:50'])) fail('scale chain must be 1:500, 1:100 and 1:50');
const plan = spatial.plan_1_500 || {};
if (!Array.isArray(plan.envelope_m) || plan.envelope_m.length !== 2 || !plan.envelope_m.every(positive)) fail('plan envelope must contain two positive dimensions');
if (!Array.isArray(plan.modules) || plan.modules.length < 7) fail('seven plan modules are required');
for (const module of plan.modules || []) {
  if (!nonEmpty(module.id) || !nonEmpty(module.name_zh) || !nonEmpty(module.name_en)) fail('every plan module needs a bilingual identity');
  if (!positive(module.width_m) || !positive(module.depth_m) || module.state !== 'design_target') fail(`${module.id}: dimensions must remain positive design targets`);
}
if (!nonEmpty(plan.capacity_formula) || plan.release_capacity !== null) fail('capacity must remain formula-bound with null release capacity');

const section = spatial.section_1_100 || {};
if (!positive(section.clear_height_m) || !Array.isArray(section.bands) || section.bands.length !== 4) fail('section requires a positive height and four bands');
if ((section.bands || []).some((band) => !positive(band.width_m) || band.state !== 'design_target')) fail('section bands must remain positive design targets');
if (!nonEmpty(section.blackout_rule)) fail('section blackout rule is required');

const detail = spatial.detail_1_50 || {};
if (!Array.isArray(detail.elements) || detail.elements.length !== 4) fail('detail requires four elements');
if ((detail.elements || []).some((item) => item.state !== 'design_target')) fail('detail elements must remain design targets');
if (!nonEmpty(detail.closeout_rule)) fail('detail closeout rule is required');

const delivery = contract.delivery_contract || {};
if (delivery.delivery_state !== 'pre_authorization_design_estimate' || delivery.organization_status !== 'unconfirmed') fail('delivery state and organisations must remain unconfirmed');
if (!Array.isArray(delivery.schedule) || delivery.schedule.length !== 6) fail('six delivery stages are required');
if ((delivery.schedule || []).some((item) => !nonEmpty(item.id) || !nonEmpty(item.work_zh) || !nonEmpty(item.work_en) || !nonEmpty(item.release_gate))) fail('every delivery stage needs bilingual work and a release gate');
if (!Array.isArray(delivery.raci) || delivery.raci.length < 5) fail('five RACI asset rows are required');
if ((delivery.raci || []).some((row) => ['asset','responsible','accountable','consulted','informed'].some((key) => !nonEmpty(row[key])) || row.status !== 'role_unconfirmed')) fail('RACI roles must be complete and unconfirmed');
if (!nonEmpty(delivery.procurement?.method) || !Array.isArray(delivery.procurement?.sequence) || delivery.procurement.sequence.length < 6 || !nonEmpty(delivery.procurement?.forbidden)) fail('procurement method, six steps and forbidden claim are required');

function validateEstimate(estimate, reserveKey) {
  if (!Array.isArray(estimate?.line_items) || estimate.line_items.length < 4) return false;
  if (estimate.line_items.some((item) => !positive(item.lower) || !positive(item.upper) || item.upper < item.lower)) return false;
  const lower = estimate.line_items.reduce((sum, item) => sum + item.lower, 0) * (1 + estimate[reserveKey]);
  const upper = estimate.line_items.reduce((sum, item) => sum + item.upper, 0) * (1 + estimate[reserveKey]);
  return close(lower, estimate.lower) && close(upper, estimate.upper) && nonEmpty(estimate.formula) && /^low_design_estimate_not_/.test(estimate.confidence);
}

if (!validateEstimate(delivery.capex_design_estimate_cny, 'contingency_rate')) fail('CAPEX estimate must equal its transparent formula');
if (!validateEstimate(delivery.monthly_opex_design_estimate_cny, 'reserve_rate')) fail('OPEX estimate must equal its transparent formula');
if (!Array.isArray(delivery.service_level_targets) || delivery.service_level_targets.length !== 5) fail('five SLA targets are required');
if ((delivery.service_level_targets || []).some((item) => !nonEmpty(item.id) || !nonEmpty(item.target) || item.basis !== 'design_target_not_observed')) fail('SLA rows must remain unobserved design targets');
if (!nonEmpty(delivery.insurance_gate) || !nonEmpty(delivery.acceptance_gate) || !nonEmpty(delivery.rollback)) fail('insurance, acceptance and rollback gates are required');

const field = contract.field_acceptance || {};
if (field.status !== 'not_run' || !Array.isArray(field.required_but_missing) || field.required_but_missing.length < 6 || !nonEmpty(field.rule)) fail('field acceptance must remain not_run with explicit missing evidence');

if (errors.length) {
  console.error('FAIL AI-era pilot dossier');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'PASS',
  decision: contract.decision,
  pilot_id: pilot.pilot_id,
  formal_geometry_features: binding.formal_feature_count,
  formal_geometry_file: binding.formal_geometry_file,
  scales: spatial.scale_chain.length,
  plan_modules: plan.modules.length,
  section_bands: section.bands.length,
  detail_elements: detail.elements.length,
  delivery_stages: delivery.schedule.length,
  raci_assets: delivery.raci.length,
  sla_targets: delivery.service_level_targets.length,
  capex_design_estimate_cny: [delivery.capex_design_estimate_cny.lower, delivery.capex_design_estimate_cny.upper],
  monthly_opex_design_estimate_cny: [delivery.monthly_opex_design_estimate_cny.lower, delivery.monthly_opex_design_estimate_cny.upper],
  field_acceptance: field.status
}, null, 2));
