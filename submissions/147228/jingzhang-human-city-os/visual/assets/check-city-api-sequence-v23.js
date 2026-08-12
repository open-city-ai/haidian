#!/usr/bin/env node
/* Offline structural checker for the v2.3 city-API sequence board. */
const fs = require('fs');
const path = require('path');
const here = __dirname;
const root = path.resolve(here, '../..');
const data = JSON.parse(fs.readFileSync(path.join(here, 'city-api-sequence-v23.json'), 'utf8'));
const checks = [];
function check(id, pass, detail) { checks.push({ id, status: pass ? 'PASS' : 'FAIL', detail }); }
const requiredSteps = ['API-01', 'API-02', 'API-03', 'API-04', 'API-05', 'API-06'];
check('ITERATION', data.package_iteration === 'v2.3', data.package_iteration);
check('SEQUENCE_ID', data.sequence_id === 'CITY-API-SEQUENCE-V23-001', data.sequence_id);
check('STEP_COUNT', data.steps.length === 6, `steps=${data.steps.length}`);
check('STEP_ORDER', data.steps.map((step) => step.step_id).join(',') === requiredSteps.join(','), data.steps.map((step) => step.step_id).join(','));
check('STEP_FIELDS', data.steps.every((step) => [step.label_zh, step.label_en, step.actor_zh, step.actor_en, step.action_zh, step.action_en, step.human_equivalent_zh, step.human_equivalent_en, step.stop_trigger_zh, step.stop_trigger_en].every(Boolean)), 'bilingual action, actor, human equivalent and stop fields present');
check('EVIDENCE_REFS', data.steps.every((step) => Array.isArray(step.evidence_refs) && step.evidence_refs.length >= 1), 'each step has at least one evidence reference');
check('ANCHORS', data.spatial_anchor_refs.every((ref) => { const [file] = ref.split('#'); return fs.existsSync(path.join(root, file)); }), 'all spatial anchor files resolve');
check('BOUNDARY', data.official_boundary === false && data.geometry_role === 'provisional_constraint', 'official_boundary=false; geometry_role=provisional_constraint');
check('NON_OPERATIONAL', data.operational_status === 'not_authorized_not_run' && data.performance_results === null, 'not_authorized_not_run; performance_results=null');
check('NOT_A_SCORE', data.not_a_score === true, 'not_a_score=true');
check('FIGURES', ['city-api-sequence-v23.svg', 'city-api-sequence-v23.en.svg', 'city-api-sequence-v23.png', 'city-api-sequence-v23.en.png'].every((name) => fs.existsSync(path.join(root, 'assets', 'figures', name))), 'bilingual SVG and PNG figures exist');
const failed = checks.filter((item) => item.status === 'FAIL');
const result = {
  schema_version: '0.1.0',
  generated_by: 'visual/assets/check-city-api-sequence-v23.js',
  package_iteration: data.package_iteration,
  status: failed.length ? 'FAIL' : 'PASS',
  checks,
  not_a_score: true,
  boundary_zh: 'PASS 只证明城市 API 六步结构、双语字段、引用与停止边界可离线复核，不产生官方评分、接口能力、许可或运营结论。',
  boundary_en: 'PASS proves only that the six-step city-API structure, bilingual fields, references, and stop boundary replay offline; it produces no official score, interface capability, permit, or operating conclusion.'
};
fs.writeFileSync(path.join(here, 'city-api-sequence-v23-evidence.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (failed.length) process.exit(1);
