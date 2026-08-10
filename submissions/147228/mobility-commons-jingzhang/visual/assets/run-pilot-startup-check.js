#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const packageRoot = path.resolve(__dirname, '..', '..');
const checklist = JSON.parse(fs.readFileSync(path.join(__dirname, 'pilot-startup-checklist.json'), 'utf8'));
const cards = JSON.parse(fs.readFileSync(path.join(__dirname, 'scenario-cards.json'), 'utf8'));
const errors = [];
const warnings = [];
const expected = cards.cards.map((card) => card.id);
const actual = checklist.scenarios.map((scenario) => scenario.id);
const forbidden = /\b(authorized|approved|operational|deployed)\b|measured local performance|resident validated/i;

function fail(message) { errors.push(message); }
function nonEmpty(value, label) {
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== 'string' || !item.trim())) {
    fail(`${label} must be a non-empty string array`);
  }
}

if (checklist.status !== 'conceptual_interface_not_approved') fail('checklist status must remain conceptual_interface_not_approved');
if (checklist.start_policy.current_status !== 'not_authorized_not_run') fail('current status must remain not_authorized_not_run');
if (!checklist.start_policy.earliest_start_rule || !checklist.start_policy.date_rule) fail('start policy must state earliest start and date rules');
nonEmpty(checklist.start_policy.shared_evidence, 'shared_evidence');
nonEmpty(checklist.start_policy.shared_stop, 'shared_stop');
if (actual.length !== 10 || new Set(actual).size !== actual.length) fail('checklist must contain ten unique scenario cards');
if (expected.join('|') !== actual.join('|')) fail(`scenario coverage mismatch: expected ${expected.join(',')} got ${actual.join(',')}`);

for (const scenario of checklist.scenarios) {
  const prefix = scenario.id || '(missing id)';
  for (const field of ['name_zh', 'name_en', 'plain_language_zh', 'status', 'human_fallback']) {
    if (typeof scenario[field] !== 'string' || !scenario[field].trim()) fail(`${prefix} missing ${field}`);
  }
  if (scenario.status !== 'not_authorized_not_run') fail(`${prefix} must remain not_authorized_not_run`);
  for (const field of ['accountable_roles', 'required_evidence', 'physical_check', 'start_when', 'stop_if', 'evidence_refs']) nonEmpty(scenario[field], `${prefix}.${field}`);
  if (scenario.accountable_roles.length < 2) fail(`${prefix} needs at least two accountable roles`);
  if (scenario.start_when.length < 3) fail(`${prefix} needs at least three start conditions`);
  if (scenario.stop_if.length < 2) fail(`${prefix} needs at least two stop conditions`);
  if (!/human|telephone|paper|public transport/i.test(scenario.human_fallback)) fail(`${prefix} must expose a human or public-transport fallback`);
  if (forbidden.test(JSON.stringify(scenario))) fail(`${prefix} contains an operational or approval claim`);
  for (const reference of scenario.evidence_refs) {
    if (!fs.existsSync(path.join(packageRoot, reference))) fail(`${prefix} evidence reference does not exist: ${reference}`);
  }
}

if (!/not establish a field pilot|not_authorized_not_run|permit/i.test(checklist.boundary)) warnings.push('boundary wording should remain visible to readers');
const result = {
  checklist: checklist.checklist_id,
  scenario_count: checklist.scenarios.length,
  expected_scenario_count: expected.length,
  checks: {
    scenario_coverage: errors.every((error) => !error.includes('scenario coverage') && !error.includes('ten unique')),
    required_fields: errors.every((error) => !error.includes('missing') && !error.includes('must be a non-empty')),
    evidence_traceability: errors.every((error) => !error.includes('evidence reference')),
    fail_closed_boundary: errors.every((error) => !error.includes('operational or approval')),
    human_fallback: errors.every((error) => !error.includes('fallback'))
  },
  errors,
  warnings,
  status: errors.length ? 'FAIL' : 'PASS'
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = errors.length ? 1 : 0;
