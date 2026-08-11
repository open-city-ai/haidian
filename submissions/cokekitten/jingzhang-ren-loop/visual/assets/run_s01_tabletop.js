#!/usr/bin/env node
/*
 * 折返凭证桌面演练离线校验器 (deterministic, offline, dependency-free)
 * 用法: node run_s01_tabletop.js [--check]
 * 读取同目录 ren-receipt.schema.json / example-s01-receipt.json / scenario-gates.json,
 * 运行结构与口径一致性检查 + 3 个负例 fixture,输出 s01-tabletop-evidence.json。
 * 本脚本不访问网络、不产生随机性;重复运行输出逐字节一致。
 * 它只证明记录结构完整与口径一致,不证明任何真实运行效果、授权或实施安排。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DIR = __dirname;
const read = (f) => fs.readFileSync(path.join(DIR, f), 'utf8');
const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

const STAGE_ORDER = ['problem', 'site', 'data_scope', 'authorization', 'human_gate',
  'test_plan', 'evidence', 'adopt_or_reject', 'feedback', 'rollback'];
const DISCLAIMER = 'concept-only; no government approval, authorization, funding or implementation commitment is claimed';

function checkReceipt(r) {
  const failures = [];
  const ok = (id, cond) => { if (!cond) failures.push(id); };
  ok('RECEIPT_REQUIRED_KEYS', ['receipt_id', 'scenario_id', 'run_status', 'stages',
    'performance_results', 'responsible_parties', 'not_proven', 'disclaimer']
    .every((k) => Object.prototype.hasOwnProperty.call(r, k)));
  ok('RECEIPT_STAGE_COUNT', Array.isArray(r.stages) && r.stages.length === 10);
  ok('RECEIPT_STAGE_ORDER', Array.isArray(r.stages) &&
    r.stages.every((s, i) => s && s.stage === STAGE_ORDER[i]));
  ok('RECEIPT_PERF_NULL_WHEN_NOT_RUN',
    !(['not_run', 'tabletop_only'].includes(r.run_status)) || r.performance_results === null);
  ok('RECEIPT_NOT_PROVEN_NONEMPTY', Array.isArray(r.not_proven) && r.not_proven.length >= 1 &&
    r.not_proven.every((x) => typeof x === 'string' && x.length >= 8));
  ok('RECEIPT_DISCLAIMER_EXACT', r.disclaimer === DISCLAIMER);
  ok('RECEIPT_ROLLBACK_DEFINED', Array.isArray(r.stages) &&
    r.stages.some((s) => s && s.stage === 'rollback' && s.status === 'complete'));
  ok('RECEIPT_AUTH_NOT_CLAIMED', Array.isArray(r.stages) &&
    r.stages.some((s) => s && s.stage === 'authorization' && s.status === 'not_run'));
  ok('RECEIPT_ROLES_ARE_ROLES', r.responsible_parties &&
    Object.values(r.responsible_parties).every((v) => typeof v === 'string' && /角色|联席|受托/.test(v)));
  return failures;
}

function checkGates(g) {
  const failures = [];
  const ok = (id, cond) => { if (!cond) failures.push(id); };
  const ids = (g.scenarios || []).map((s) => s.id);
  ok('GATES_TWELVE_UNIQUE', ids.length === 12 && new Set(ids).size === 12 &&
    ids.every((id, i) => id === 'S' + String(i + 1).padStart(2, '0')));
  ok('GATES_FIELDS_COMPLETE', (g.scenarios || []).every((s) =>
    s.amber_entry && s.green_acceptance && Array.isArray(s.red_stop) && s.red_stop.length >= 1 &&
    s.human_takeover && s.rollback && s.non_ai_fallback && s.roles &&
    ['responsible', 'accountable', 'consulted', 'informed'].every((k) => s.roles[k])));
  ok('GATES_STARRED_TEST_TRIO', JSON.stringify((g.scenarios || [])
    .filter((s) => s.industry_test).map((s) => s.id)) === JSON.stringify(['S04', 'S05', 'S06']));
  ok('GATES_DISCLAIMER_PRESENT', typeof g.disclaimer === 'string' && g.disclaimer.includes('concept-only'));
  return failures;
}

// ---- load inputs ----
const schemaText = read('ren-receipt.schema.json');
const receiptText = read('example-s01-receipt.json');
const gatesText = read('scenario-gates.json');
const receipt = JSON.parse(receiptText);
const gates = JSON.parse(gatesText);

// ---- positive checks ----
const receiptFailures = checkReceipt(receipt);
const gateFailures = checkGates(gates);
const s01 = gates.scenarios.find((s) => s.id === 'S01');
const crossFailures = [];
if (!(s01 && s01.human_takeover.includes('人工闸门') &&
      receipt.stages.some((st) => st.stage === 'human_gate' && st.summary.includes('人工闸门')))) {
  crossFailures.push('CROSS_HUMAN_GATE_CONSISTENT');
}
if (!(s01 && s01.red_stop.some((x) => x.includes('个体可识别')) &&
      receipt.stages.some((st) => (st.hard_stop_conditions || []).some((h) => h.includes('个体可识别'))))) {
  crossFailures.push('CROSS_RED_STOP_CONSISTENT');
}

// ---- negative fixtures: malformed receipts MUST fail with exact check ids ----
const clone = () => JSON.parse(receiptText);
const fixtures = [];
{ const f = clone(); f.performance_results = { travel_time_saved: '12%' };
  fixtures.push({ fixture: 'NEG-PERF-CLAIMED-WHILE-TABLETOP', expected: ['RECEIPT_PERF_NULL_WHEN_NOT_RUN'], actual: checkReceipt(f) }); }
{ const f = clone(); f.not_proven = [];
  fixtures.push({ fixture: 'NEG-EMPTY-NOT-PROVEN', expected: ['RECEIPT_NOT_PROVEN_NONEMPTY'], actual: checkReceipt(f) }); }
{ const f = clone(); f.stages = f.stages.filter((s) => s.stage !== 'rollback');
  fixtures.push({ fixture: 'NEG-MISSING-ROLLBACK', expected: ['RECEIPT_STAGE_COUNT', 'RECEIPT_ROLLBACK_DEFINED'], actual: checkReceipt(f) }); }
const fixtureResults = fixtures.map((f) => ({
  fixture: f.fixture, expected_failures: f.expected, observed_failures: f.actual,
  status: JSON.stringify(f.expected) === JSON.stringify(f.actual) ? 'pass' : 'fail',
}));

// ---- evidence output ----
const checks = []
  .concat(['RECEIPT_REQUIRED_KEYS', 'RECEIPT_STAGE_COUNT', 'RECEIPT_STAGE_ORDER',
    'RECEIPT_PERF_NULL_WHEN_NOT_RUN', 'RECEIPT_NOT_PROVEN_NONEMPTY', 'RECEIPT_DISCLAIMER_EXACT',
    'RECEIPT_ROLLBACK_DEFINED', 'RECEIPT_AUTH_NOT_CLAIMED', 'RECEIPT_ROLES_ARE_ROLES']
    .map((id) => ({ id, status: receiptFailures.includes(id) ? 'fail' : 'pass' })))
  .concat(['GATES_TWELVE_UNIQUE', 'GATES_FIELDS_COMPLETE', 'GATES_STARRED_TEST_TRIO', 'GATES_DISCLAIMER_PRESENT']
    .map((id) => ({ id, status: gateFailures.includes(id) ? 'fail' : 'pass' })))
  .concat(['CROSS_HUMAN_GATE_CONSISTENT', 'CROSS_RED_STOP_CONSISTENT']
    .map((id) => ({ id, status: crossFailures.includes(id) ? 'fail' : 'pass' })));

const allPass = checks.every((c) => c.status === 'pass') && fixtureResults.every((f) => f.status === 'pass');
const evidence = {
  runner: 'run_s01_tabletop.js',
  determinism: 'offline, dependency-free, no randomness, byte-identical on re-run',
  inputs: {
    'ren-receipt.schema.json': { sha256: sha256(schemaText) },
    'example-s01-receipt.json': { sha256: sha256(receiptText) },
    'scenario-gates.json': { sha256: sha256(gatesText) },
  },
  checks,
  negative_fixtures: fixtureResults,
  result: allPass ? 'PASS' : 'FAIL',
  proves: '记录结构完整、十段折返链齐备、三态口径与凭证互相一致、负例可被精确拒绝',
  does_not_prove: receipt.not_proven,
  disclaimer: DISCLAIMER,
};
const out = JSON.stringify(evidence, null, 1) + '\n';
if (process.argv.includes('--check')) {
  const existing = read('s01-tabletop-evidence.json');
  const same = existing === out;
  console.log(same ? 'CHECK PASS: evidence file is reproducible byte-identical' : 'CHECK FAIL: evidence file differs from deterministic re-run');
  process.exit(same && allPass ? 0 : 1);
}
fs.writeFileSync(path.join(DIR, 's01-tabletop-evidence.json'), out);
console.log('result:', evidence.result, '| checks:', checks.length, '| negative fixtures:', fixtureResults.length);
process.exit(allPass ? 0 : 1);
