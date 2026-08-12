#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const crosswalkPath = path.join(root, 'spatial.json');
const geometryDir = path.join(root, 'geometry');
const crosswalk = JSON.parse(fs.readFileSync(crosswalkPath, 'utf8'));
const files = new Map();
const features = new Map();

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

for (const name of fs.readdirSync(geometryDir).filter((item) => item.endsWith('.geojson')).sort()) {
  const relative = `geometry/${name}`;
  const document = JSON.parse(fs.readFileSync(path.join(geometryDir, name), 'utf8'));
  files.set(relative, document);
  for (const feature of document.features || []) {
    const id = feature.id || feature.properties?.id;
    if (!id) {
      fail(`${relative} has a feature without id`);
      continue;
    }
    if (features.has(id)) fail(`duplicate feature id ${id}`);
    features.set(id, {path: relative, feature});
  }
}

const rows = crosswalk.scenario_spatial_crosswalk || [];
if (rows.length !== 10) fail(`expected 10 scenario rows, found ${rows.length}`);
const scenarioFile = files.get('geometry/constraints.geojson');
const scenarioIds = new Set((scenarioFile?.features || [])
  .map((feature) => feature.id || feature.properties?.id)
  .filter((id) => /^SCN-\d+$/.test(id)));
const seenScenarios = new Set();

for (const row of rows) {
  if (!row.scenario_id || seenScenarios.has(row.scenario_id)) fail(`duplicate or missing scenario id ${row.scenario_id}`);
  seenScenarios.add(row.scenario_id);
  if (!scenarioIds.has(row.scenario_id)) fail(`${row.scenario_id} is not present in geometry/constraints.geojson`);
  if (!Array.isArray(row.anchors) || row.anchors.length < 2) fail(`${row.scenario_id} needs at least two spatial anchors`);
  const anchorIds = new Set();
  for (const anchor of row.anchors || []) {
    if (anchorIds.has(anchor.feature_id)) fail(`${row.scenario_id} repeats anchor ${anchor.feature_id}`);
    anchorIds.add(anchor.feature_id);
    const record = features.get(anchor.feature_id);
    if (!record) {
      fail(`${row.scenario_id} references missing feature ${anchor.feature_id}`);
      continue;
    }
    if (record.path !== anchor.path) fail(`${row.scenario_id} anchor ${anchor.feature_id} path mismatch: ${anchor.path} vs ${record.path}`);
  }
}

for (const id of scenarioIds) {
  if (!seenScenarios.has(id)) fail(`scenario feature ${id} is not covered by spatial.json`);
}

if (crosswalk.boundary?.official_boundary !== false) fail('crosswalk must keep official_boundary=false');
if (crosswalk.boundary?.geometry_role !== 'provisional_constraint') fail('crosswalk must keep provisional_constraint role');

if (!process.exitCode) {
  console.log(`PASS: ${rows.length} scenario rows, ${features.size} geometry features indexed, all anchors resolve`);
  console.log('BOUNDARY: references only; no official geometry, capacity, permission or field performance claim');
}
