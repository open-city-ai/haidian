#!/usr/bin/env node
/**
 * run_jzsw_tabletop.js — 人字回退桌面演练主入口
 *
 * 读取同目录 jzsw-tabletop-evidence.json 的固定用例集，逐用例调用
 * check_switchback.js 的 check()，输出「实际判定 vs 期望」对照与汇总
 * （X 接受 / Y 拒绝），并复验证据哈希（防篡改、第三方可比对）。
 *
 * 退出码：
 *   0 = 全部用例通过且哈希一致
 *   1 = 存在用例判定与期望不符
 *   2 = 证据哈希不匹配（用例集疑似被篡改）
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { check } = require('./check_switchback.js');

const EVIDENCE_FILE = path.join(__dirname, 'jzsw-tabletop-evidence.json');

/** 规范序列化：对象键排序（数组保序），2 空格缩进 —— 与证据哈希算法一致 */
function canonicalStringify(obj) {
  return JSON.stringify(obj, function (key, value) {
    if (Array.isArray(value)) return value;
    if (value !== null && typeof value === 'object') {
      const sorted = {};
      Object.keys(value).sort().forEach(function (k) { sorted[k] = value[k]; });
      return sorted;
    }
    return value;
  }, 2);
}

/** SHA-256 十六进制 */
function sha256Hex(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

function main() {
  let evidence;
  try {
    evidence = JSON.parse(fs.readFileSync(EVIDENCE_FILE, 'utf8'));
  } catch (err) {
    console.error('错误：无法读取证据文件 ' + EVIDENCE_FILE + ' — ' + err.message);
    process.exit(2);
  }
  const cases = Array.isArray(evidence.cases) ? evidence.cases : [];
  const meta = evidence.meta || {};

  const actualHash = sha256Hex(canonicalStringify(cases));
  const expectedHash = typeof meta.evidence_hash === 'string' ? meta.evidence_hash : '';
  const hashOk = actualHash === expectedHash;

  console.log('============================================================');
  console.log('  人字回退 JZ-SWITCHBACK-001 桌面演练（tabletop exercise）');
  console.log('============================================================');
  console.log('证据文件 : ' + EVIDENCE_FILE);
  console.log('证据哈希 : sha256 ' + actualHash);
  console.log('哈希校验 : ' + (hashOk ? '一致 ✓（第三方可复算比对）' : '不匹配（期望 ' + (expectedHash || '（缺失）') + '）✗'));
  console.log('------------------------------------------------------------');

  const results = cases.map(function (tc) {
    const actual = check(tc.input);
    const stateOk = actual.verdict === tc.expected_state;
    const ruleOk = actual.rule_id === tc.expected_rule;
    const rejOk = actual.rejected === !!tc.expected_rejected;
    return {
      tc: tc,
      actual: actual,
      pass: stateOk && ruleOk && rejOk,
      stateOk: stateOk,
      ruleOk: ruleOk,
      rejOk: rejOk,
    };
  });

  results.forEach(function (r) {
    const mark = r.pass ? '✓' : '✗';
    console.log('[' + r.tc.id + '] ' + r.tc.description);
    console.log('      期望 → ' + r.tc.expected_state + '(' + r.tc.expected_rule + ') ' + (r.tc.expected_rejected ? '拒绝' : '接受'));
    console.log('      实际 → ' + r.actual.verdict + '(' + r.actual.rule_id + ') ' + (r.actual.rejected ? '拒绝' : '接受') + '  ' + mark);
    if (!r.pass) {
      console.log('      实际理由 : ' + r.actual.reason);
      console.log('      期望理由 : ' + r.tc.expected_reason);
    }
  });

  const passed = results.filter(function (r) { return r.pass; }).length;
  const accepted = results.filter(function (r) { return !r.actual.rejected; }).length;
  const rejected = results.filter(function (r) { return r.actual.rejected; }).length;
  const expAccepted = results.filter(function (r) { return !r.tc.expected_rejected; }).length;
  const expRejected = results.filter(function (r) { return !!r.tc.expected_rejected; }).length;

  console.log('------------------------------------------------------------');
  console.log('汇总：用例 ' + results.length + ' 个（正例 ' + expAccepted + ' / 反例 ' + expRejected + '）');
  console.log('实际判定：接受 ' + accepted + ' / 拒绝 ' + rejected);
  console.log('通过：' + passed + '/' + results.length);
  console.log('------------------------------------------------------------');

  // 可证伪性对照：五大 fail-open 反例 → 触发规则
  const guardIds = ['N1', 'N2', 'N3', 'N4', 'N5'];
  console.log('可证伪性对照（防 fail-open）：');
  results.filter(function (r) { return guardIds.indexOf(r.tc.id) !== -1; }).forEach(function (r) {
    console.log('  反例 ' + r.tc.id + ' → ' + r.tc.expected_rule + '：' + r.tc.expected_reason);
  });
  console.log('------------------------------------------------------------');

  let code = 0;
  if (passed !== results.length) {
    code = 1;
    console.log('结论：存在用例失败 — 机制判定与期望不符，需修正。');
  }
  if (!hashOk) {
    if (code === 0) code = 2;
    console.log('结论：证据哈希不匹配 — 用例集疑似被篡改，不可采信。');
  }
  if (code === 0) {
    console.log('结论：全部通过 — 四态回退机制在固定用例集上可证伪、未 fail-open。');
  }
  process.exit(code);
}

if (require.main === module) {
  main();
}

module.exports = { canonicalStringify: canonicalStringify, sha256Hex: sha256Hex };
