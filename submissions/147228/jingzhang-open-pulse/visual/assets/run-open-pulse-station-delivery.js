#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2] || path.join(__dirname, 'open-pulse-station-delivery-contract.json');
const contract = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const errors = [];
const fail = (message) => errors.push(message);
const nonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;
const validRange = (value) => Array.isArray(value) && value.length === 2 && value.every(Number.isFinite) && value[0] > 0 && value[1] >= value[0];

if (contract.design_only !== true) fail('design_only must remain true');
if (contract.authorization_count !== 0) fail('authorization_count must remain 0');
if (contract.field_observation_count !== 0) fail('field_observation_count must remain 0');
if (contract.official_geometry_status !== 'not_supplied') fail('official_geometry_status must remain not_supplied');
if (contract.decision !== 'HOLD') fail('decision must remain HOLD');
if (!nonEmpty(contract.boundary)) fail('boundary statement is required');

const expectedScales = ['1:5000', '1:2000', '1:500', '1:100', '1:50'];
if (JSON.stringify(contract.scale_chain) !== JSON.stringify(expectedScales)) fail('scale_chain must remain complete and ordered');
if (contract.dimension_rule?.status !== 'parameter_envelope_only') fail('dimensions must remain parameter envelopes');
if (contract.dimension_rule?.must_recalculate !== true) fail('dimensions must require recalculation');
if (!Array.isArray(contract.dimension_rule?.recalculation_triggers) || contract.dimension_rule.recalculation_triggers.length < 5) fail('at least five recalculation triggers are required');

const expectedStates = ['BASE', 'TEST_WINDOW', 'BLACKOUT', 'CLOSEOUT'];
if (JSON.stringify(contract.public_states) !== JSON.stringify(expectedStates)) fail('public states must include BASE, TEST_WINDOW, BLACKOUT and CLOSEOUT');

const stations = Array.isArray(contract.stations) ? contract.stations : [];
if (stations.length !== 3) fail('exactly three stations are required');
const stationIds = stations.map((station) => station?.station_id);
const siteRefs = stations.map((station) => station?.site_ref);
if (stationIds.some((id) => !nonEmpty(id)) || new Set(stationIds).size !== stations.length) fail('station IDs must be unique');
if (siteRefs.some((id) => !/^PROV-KEY-00[1-3]$/.test(id)) || new Set(siteRefs).size !== stations.length) fail('stations must map one-to-one to the three provisional key areas');

for (const station of stations) {
  const spatial = station.spatial_review || {};
  const delivery = station.delivery || {};
  if (!nonEmpty(station.name_zh) || !nonEmpty(station.name_en) || !nonEmpty(station.role_zh) || !nonEmpty(station.role_en)) fail(`${station.station_id}: bilingual station identity is required`);
  if (spatial.plan_scale !== '1:500' || spatial.detail_scale !== '1:50') fail(`${station.station_id}: plan/detail scales must be 1:500 and 1:50`);
  if (!Array.isArray(spatial.plan_modules) || spatial.plan_modules.length < 4) fail(`${station.station_id}: at least four plan modules are required`);
  for (const module of spatial.plan_modules || []) {
    if (!nonEmpty(module.id) || !nonEmpty(module.name_zh) || !nonEmpty(module.name_en)) fail(`${station.station_id}: every plan module needs a bilingual identity`);
    if (!validRange(module.target_width_m)) fail(`${station.station_id}/${module.id}: target_width_m must be a positive range`);
    if (module.target_depth_m !== undefined && !validRange(module.target_depth_m)) fail(`${station.station_id}/${module.id}: target_depth_m must be a positive range`);
    if (module.state !== 'provisional_target') fail(`${station.station_id}/${module.id}: module state must remain provisional_target`);
  }
  if (!Array.isArray(spatial.section_bands) || spatial.section_bands.length !== 4) fail(`${station.station_id}: exactly four section bands are required`);
  if ((spatial.section_bands || []).some((band) => !nonEmpty(band.id) || !nonEmpty(band.name_zh) || !nonEmpty(band.name_en) || !validRange(band.target_width_m))) fail(`${station.station_id}: section bands require bilingual labels and valid ranges`);
  if (JSON.stringify(Object.keys(spatial.frontage_states || {})) !== JSON.stringify(expectedStates)) fail(`${station.station_id}: frontage states must cover the four public states in order`);
  if (!['ordinary', 'maintenance', 'emergency'].every((key) => nonEmpty(spatial.flows?.[key]))) fail(`${station.station_id}: ordinary, maintenance and emergency flows are required`);

  const capacity = spatial.capacity_check || {};
  if (!nonEmpty(capacity.formula) || capacity.decision !== 'HOLD' || capacity.release_capacity !== null) fail(`${station.station_id}: capacity must remain formula-bound and HOLD`);
  for (const [key, value] of Object.entries(capacity)) {
    if (!['formula', 'decision', 'release_capacity'].includes(key) && value !== null) fail(`${station.station_id}: capacity input ${key} must remain null`);
  }
  if (!Array.isArray(spatial.ownership_interfaces) || spatial.ownership_interfaces.length < 3) fail(`${station.station_id}: at least three ownership interfaces are required`);
  if ((spatial.ownership_interfaces || []).some((item) => !nonEmpty(item.interface) || !nonEmpty(item.owner_archetype) || item.status !== 'unconfirmed')) fail(`${station.station_id}: ownership interfaces must remain archetypal and unconfirmed`);

  const roles = delivery.responsibility_archetypes || {};
  if (delivery.role_status !== 'unconfirmed') fail(`${station.station_id}: responsibility roles must remain unconfirmed`);
  if (Object.keys(roles).length < 6 || Object.values(roles).some((value) => !nonEmpty(value))) fail(`${station.station_id}: six responsibility archetypes are required`);
  if (!Array.isArray(delivery.procurement_sequence) || delivery.procurement_sequence.length < 5) fail(`${station.station_id}: five-step procurement sequence is required`);
  if (delivery.cost_envelope_cny?.lower !== null || delivery.cost_envelope_cny?.upper !== null || delivery.cost_envelope_cny?.confidence !== 'not_estimated' || !nonEmpty(delivery.cost_envelope_cny?.method)) fail(`${station.station_id}: cost must remain unestimated with a quantity-survey method`);
  if (!Array.isArray(delivery.minimum_staffing_roles) || delivery.minimum_staffing_roles.length < 4) fail(`${station.station_id}: minimum staffing roles are required`);
  if (!Array.isArray(delivery.service_level_targets) || delivery.service_level_targets.length < 3) fail(`${station.station_id}: at least three service-level targets are required`);
  if ((delivery.service_level_targets || []).some((item) => !nonEmpty(item.id) || !nonEmpty(item.target) || item.basis !== 'design_target_not_observed')) fail(`${station.station_id}: service levels must remain unobserved design targets`);
  if (!nonEmpty(delivery.acceptance_gate) || !nonEmpty(delivery.rollback)) fail(`${station.station_id}: acceptance and rollback are required`);
}

const gates = Array.isArray(contract.shared_delivery_gates) ? contract.shared_delivery_gates : [];
if (gates.length !== 6) fail('six shared delivery gates are required');
if (new Set(gates.map((gate) => gate?.id)).size !== gates.length || gates.some((gate) => !nonEmpty(gate?.id) || !nonEmpty(gate?.gate))) fail('delivery gates must have unique IDs and rules');

if (errors.length) {
  console.error('FAIL Open Pulse station delivery contract');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'PASS',
  stations: stations.length,
  plan_modules: stations.reduce((sum, station) => sum + station.spatial_review.plan_modules.length, 0),
  section_bands: stations.reduce((sum, station) => sum + station.spatial_review.section_bands.length, 0),
  ownership_interfaces: stations.reduce((sum, station) => sum + station.spatial_review.ownership_interfaces.length, 0),
  service_level_targets: stations.reduce((sum, station) => sum + station.delivery.service_level_targets.length, 0),
  delivery_gates: gates.length,
  decision: contract.decision
}, null, 2));
