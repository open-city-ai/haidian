#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const coverage = JSON.parse(fs.readFileSync(path.join(root, 'visual/assets/public-interest-coverage-v26.json'), 'utf8'));
const personas = JSON.parse(fs.readFileSync(path.join(root, 'visual/assets/personas-and-fairness.json'), 'utf8'));
const geometryFiles = new Map();
const featureIds = new Set();

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

for (const filename of fs.readdirSync(path.join(root, 'geometry')).filter((name) => name.endsWith('.geojson')).sort()) {
  const relative = `geometry/${filename}`;
  const document = JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
  geometryFiles.set(relative, document);
  for (const feature of document.features || []) {
    const id = feature.id || feature.properties?.id;
    if (id) featureIds.add(`${relative}#${id}`);
  }
}

const scenarioIds = new Set((geometryFiles.get('geometry/constraints.geojson')?.features || [])
  .map((feature) => feature.id || feature.properties?.id));
const existingIds = new Set((personas.personas || []).map((persona) => persona.persona_id));
const expectedExisting = coverage.existing_persona_ids || [];
for (const id of expectedExisting) if (!existingIds.has(id)) fail(`missing existing persona ${id}`);

const extensions = coverage.extensions || [];
if (extensions.length !== 3) fail(`expected 3 public-interest extensions, found ${extensions.length}`);
const extensionIds = new Set();
for (const item of extensions) {
  if (!/^P-0[7-9]$/.test(item.persona_id) || extensionIds.has(item.persona_id)) fail(`invalid or duplicate extension ${item.persona_id}`);
  extensionIds.add(item.persona_id);
  if (!Array.isArray(item.scenario_refs) || item.scenario_refs.length === 0) fail(`${item.persona_id} has no scenario refs`);
  for (const scenarioId of item.scenario_refs) if (!scenarioIds.has(scenarioId)) fail(`${item.persona_id} missing scenario ${scenarioId}`);
  if (!Array.isArray(item.spatial_refs) || item.spatial_refs.length < 2) fail(`${item.persona_id} needs at least two spatial refs`);
  for (const reference of item.spatial_refs) if (!featureIds.has(reference)) fail(`${item.persona_id} missing spatial ref ${reference}`);
  for (const field of ['group_zh', 'group_en', 'benefit_zh', 'benefit_en', 'impact_risk_zh', 'impact_risk_en', 'human_alternative_zh', 'human_alternative_en', 'stop_if_zh', 'stop_if_en', 'evidence_needed_zh', 'evidence_needed_en']) {
    const minimum = field.startsWith('group_') ? 2 : 8;
    if (typeof item[field] !== 'string' || item[field].trim().length < minimum) fail(`${item.persona_id} has incomplete ${field}`);
  }
}
if (coverage.not_a_score !== true) fail('coverage must keep not_a_score=true');
if (extensions.length + expectedExisting.length !== 9) fail('expected 9 total persona coverage records');

if (!process.exitCode) {
  console.log(`PASS: ${expectedExisting.length} existing personas + ${extensions.length} public-interest extensions; all scenario and spatial refs resolve`);
  console.log('BOUNDARY: coverage only; no demographic, accessibility, service, employment, or official-score claim');
}
