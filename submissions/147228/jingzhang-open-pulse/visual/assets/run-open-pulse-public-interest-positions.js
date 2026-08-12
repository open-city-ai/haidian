#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const assetsDir = __dirname;
const packageRoot = path.resolve(assetsDir, '..', '..');
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(packageRoot, relative), 'utf8'));
const register = readJson('visual/assets/public-interest-position-register.json');
const scenarios = readJson('visual/assets/scenario-operation-matrix.json').rows || [];
const operations = readJson('visual/assets/operations-matrix.json').packages || [];
const scenarioIds = new Set(scenarios.map((row) => row.scenario_id));
const operationIds = new Set(operations.map((row) => row.action_id));
const required = [
  'id', 'title_zh', 'title_en', 'conflict_zh', 'conflict_en',
  'position_zh', 'position_en', 'affected_groups', 'spatial_anchor',
  'linked_scenarios', 'linked_operations', 'acceptance_evidence',
  'ordinary_equivalent_zh', 'stop_condition_zh', 'unresolved_decision_zh',
  'source_ids', 'baseline', 'status'
];
const errors = [];
const positions = Array.isArray(register.positions) ? register.positions : [];
const seen = new Set();

if (register.schema_version !== '1.0.0') errors.push('schema_version must be 1.0.0');
if (register.operational_status !== 'not_authorized_not_run') errors.push('operational status must remain not_authorized_not_run');
if (register.official_boundary !== false) errors.push('official_boundary must remain false');
if (register.baseline_status !== 'unknown') errors.push('baseline_status must remain unknown');
if (positions.length !== 8) errors.push(`expected 8 positions, got ${positions.length}`);
if (!register.non_neutrality || !register.non_neutrality.author_position_zh || !register.non_neutrality.author_position_en) errors.push('explicit bilingual non-neutrality statement is required');

for (const item of positions) {
  if (seen.has(item.id)) errors.push(`duplicate position id: ${item.id}`);
  seen.add(item.id);
  for (const key of required) {
    if (item[key] === undefined || item[key] === null || item[key] === '' || (Array.isArray(item[key]) && item[key].length === 0)) {
      errors.push(`${item.id || 'unknown'} missing ${key}`);
    }
  }
  for (const id of item.linked_scenarios || []) if (!scenarioIds.has(id)) errors.push(`${item.id} references unknown scenario ${id}`);
  for (const id of item.linked_operations || []) if (!operationIds.has(id)) errors.push(`${item.id} references unknown operation ${id}`);
  for (const evidence of item.acceptance_evidence || []) {
    if (!evidence.ref || !fs.existsSync(path.join(packageRoot, evidence.ref))) errors.push(`${item.id} missing evidence file ${evidence.ref}`);
    if (!evidence.observable_zh || !evidence.status) errors.push(`${item.id} has incomplete acceptance evidence`);
  }
  if (item.baseline !== 'unknown') errors.push(`${item.id} baseline must remain unknown`);
  if (item.status !== 'conceptual_suggestion_for_professional_refinement') errors.push(`${item.id} status boundary changed`);
}

const groupCoverage = new Set(positions.flatMap((item) => item.affected_groups || []));
for (const group of ['older_residents', 'disabled_people', 'carers', 'night_workers', 'children_and_guardians', 'visitors', 'small_businesses', 'maintenance_crews']) {
  if (!groupCoverage.has(group)) errors.push(`missing public-interest group ${group}`);
}

const result = {
  ok: errors.length === 0,
  status: errors.length === 0 ? 'PASS' : 'FAIL',
  register: 'visual/assets/public-interest-position-register.json',
  positions: positions.length,
  scenario_links: new Set(positions.flatMap((item) => item.linked_scenarios || [])).size,
  operation_links: new Set(positions.flatMap((item) => item.linked_operations || [])).size,
  affected_group_count: groupCoverage.size,
  explicit_non_neutrality: Boolean(register.non_neutrality),
  baseline: register.baseline_status,
  boundary: 'conceptual trade-off register; not a survey, approval, field result or performance claim',
  errors
};
console.log(JSON.stringify(result, null, 2));
process.exit(errors.length === 0 ? 0 : 1);
