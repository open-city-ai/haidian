#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const contractPath = path.join(__dirname, 'ai-era-pilot-dossier.json');
const runnerPath = path.join(__dirname, 'run-ai-era-pilot-dossier.js');
const original = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const clone = (value) => JSON.parse(JSON.stringify(value));

function run(candidate) {
  const mutateGeometry = arguments[1];
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-era-pilot-dossier-'));
  const assetRoot = path.join(tempRoot, 'visual', 'assets');
  const geometryRoot = path.join(tempRoot, 'geometry');
  fs.mkdirSync(assetRoot, { recursive: true });
  fs.mkdirSync(geometryRoot, { recursive: true });
  const tempPath = path.join(assetRoot, 'ai-era-pilot-dossier.json');
  fs.writeFileSync(tempPath, JSON.stringify(candidate));
  for (const file of ['constraints.geojson', 'key_areas.geojson', 'public_space.geojson']) {
    fs.copyFileSync(path.join(__dirname, '..', '..', 'geometry', file), path.join(geometryRoot, file));
  }
  if (mutateGeometry) mutateGeometry(tempRoot);
  const result = spawnSync(process.execPath, [runnerPath, tempPath, '--root', tempRoot], { encoding: 'utf8' });
  fs.rmSync(tempRoot, { recursive: true, force: true });
  return result.status === 0;
}

if (!run(original)) throw new Error('positive control did not pass');

const fixtures = [];
const released = clone(original); released.decision = 'RELEASE'; fixtures.push(['released-without-evidence', released]);
const observed = clone(original); observed.field_observation_count = 1; fixtures.push(['fabricated-field-observation', observed]);
const official = clone(original); official.official_boundary = true; fixtures.push(['fabricated-official-boundary', official]);
const fixed = clone(original); fixed.dimension_rule.must_recalculate = false; fixtures.push(['fixed-dimensions', fixed]);
const capacity = clone(original); capacity.spatial_dossier.plan_1_500.release_capacity = 42; fixtures.push(['invented-capacity', capacity]);
const narrow = clone(original); narrow.spatial_dossier.plan_1_500.modules[0].width_m = 0; fixtures.push(['invalid-route-width', narrow]);
const owner = clone(original); owner.delivery_contract.raci[0].status = 'confirmed'; fixtures.push(['invented-owner', owner]);
const capex = clone(original); capex.delivery_contract.capex_design_estimate_cny.lower = 100000; fixtures.push(['broken-capex-formula', capex]);
const missingSla = clone(original); missingSla.delivery_contract.service_level_targets.pop(); fixtures.push(['missing-sla', missingSla]);
const observedSla = clone(original); observedSla.delivery_contract.service_level_targets[0].basis = 'field_observed'; fixtures.push(['observed-sla-claim', observedSla]);
const noRollback = clone(original); noRollback.delivery_contract.rollback = ''; fixtures.push(['missing-rollback', noRollback]);
const fakeWalkthrough = clone(original); fakeWalkthrough.field_acceptance.status = 'pass'; fixtures.push(['fabricated-public-walkthrough', fakeWalkthrough]);
const brokenHost = clone(original); brokenHost.geometry_binding.host_refs.public_space = 'geometry/public_space.geojson#PUBLIC-02'; fixtures.push(['outside-host-substitution', brokenHost]);
fixtures.push(['missing-formal-feature', clone(original), (root) => {
  const file = path.join(root, 'geometry', 'public_space.geojson');
  const value = JSON.parse(fs.readFileSync(file, 'utf8'));
  value.features.pop();
  fs.writeFileSync(file, JSON.stringify(value));
}]);
fixtures.push(['island-on-ordinary-route', clone(original), (root) => {
  const file = path.join(root, 'geometry', 'public_space.geojson');
  const value = JSON.parse(fs.readFileSync(file, 'utf8'));
  const ordinary = value.features.find((feature) => feature.properties.id === 'PILOT-AIORIGIN-M01-ORDINARY-ROUTE');
  const island = value.features.find((feature) => feature.properties.id === 'PILOT-AIORIGIN-M04-AI-ISLAND');
  island.geometry = JSON.parse(JSON.stringify(ordinary.geometry));
  fs.writeFileSync(file, JSON.stringify(value));
}]);
fixtures.push(['invalid-clear-ring-clearance', clone(original), (root) => {
  const file = path.join(root, 'geometry', 'public_space.geojson');
  const value = JSON.parse(fs.readFileSync(file, 'utf8'));
  const ring = value.features.find((feature) => feature.properties.id === 'PILOT-AIORIGIN-M05-CLEAR-RING');
  const island = value.features.find((feature) => feature.properties.id === 'PILOT-AIORIGIN-M04-AI-ISLAND');
  ring.geometry.coordinates[0] = JSON.parse(JSON.stringify(island.geometry.coordinates[0]));
  fs.writeFileSync(file, JSON.stringify(value));
}]);

const unexpected = fixtures.filter(([, fixture, mutateGeometry]) => run(fixture, mutateGeometry)).map(([name]) => name);
if (unexpected.length) throw new Error(`negative fixtures unexpectedly passed: ${unexpected.join(', ')}`);

console.log(JSON.stringify({ status: 'PASS', positive_controls: 1, negative_fixtures: fixtures.length, rejected: fixtures.map(([name]) => name) }, null, 2));
