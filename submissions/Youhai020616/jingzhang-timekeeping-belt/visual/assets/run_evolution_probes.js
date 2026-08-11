#!/usr/bin/env node
/**
 * 京张授时带 — 演进与探针演练 (evolution & probes drill)
 *
 * 会进化的服务如何守时? 本脚本用确定性方式演练对时协议中回答这个
 * 问题的三条条款:
 *
 *   E4 进化即失效 — 服务版本哈希变更 → 对时资格立即作废(version_voided),
 *      经沙箱重新对时后以新窗口回归; 公共空间内不存在热更新
 *   E5 红蓝对时 — 在人工核准的探针类别内用确定性模板生成 4 个探针:
 *      "背题服务"(只记住基准原文的过拟合服务) 0/4 全军覆没 → probe_failed
 *      降级并登记复测条件; "健壮服务" 4/4 通过 → 续期;
 *      红方发现的基准缺口(PRB-05)送入基准共建室成为新基准候选
 *   E6 资格不继承, 档案要继承 — 版本谱系上误点档案连续累积,
 *      新版本不继承旧版本的合格资格, 公众可读完整家族史
 *
 * 演练零依赖、离线、确定性, 不调用任何模型; 生产环境的探针由受约束的
 * 校时 agent 生成, 人类保留基准维护权、类别核准权与争议裁决权。
 * 全部数据为合成样例; real_deployment = not_authorized_not_run。
 *
 * 运行: node run_evolution_probes.js [--check]
 * 输出: evolution-probes-evidence.json (逐字节可复现)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const HERE = __dirname;
const rawT = fs.readFileSync(path.join(HERE, 'example-timetables.json'), 'utf8');
const rawP = fs.readFileSync(path.join(HERE, 'probe-classes-fixture.json'), 'utf8');
const timetables = JSON.parse(rawT).timetables;
const px = JSON.parse(rawP);
const inputHash = crypto.createHash('sha256')
  .update(rawT).update(rawP).digest('hex');

const results = [];
let pass = 0, fail = 0;
function check(id, name, ok, detail) {
  results.push({ id, name, status: ok ? 'pass' : 'fail', detail });
  ok ? pass++ : fail++;
}

// ---------- E4 进化即失效 ----------
const t = JSON.parse(JSON.stringify(timetables[1])); // SVC-HEALTH-NAV
const ledger = [];
function log(tick, event, note) { ledger.push({ tick, event, note_zh: note }); }
// tick 20: 服务在窗口内、上次对时合格
let state = 'in_service';
let versionHash = t.version_binding.service_version_hash;
// tick 22: 自演化产生 N+1 版 (模拟版本哈希变更)
const newHash = versionHash + '-evolved-n1';
let voided = false;
if (newHash !== versionHash && t.version_binding.voided_on_version_change) {
  state = 'voided';
  voided = true;
  log(22, 'version_voided', '服务自演化出新版本, 对时资格作废; 公共入口关闭, 非AI路径顶上');
}
// tick 23-24: 新版本走 T3 沙箱 → 重新对时合格 → 以新哈希签发新窗口
let reentered = false;
if (state === 'voided') {
  const sandboxPass = true;   // 演练固定分支: 新版本沙箱回放合格
  if (sandboxPass) {
    versionHash = newHash;
    state = 'in_service';
    reentered = true;
    log(24, 'on_time_renewal', '新版本经沙箱重新对时合格, 以新哈希签发新窗口回归');
  }
}
check('E4', '进化即失效→重考回归', voided && reentered && versionHash === newHash,
  '版本变更即作废(不存在热更新), 新版本经 T3 沙箱与重新对时后以新窗口回归; 全程档案留痕');

// ---------- E5 红蓝对时 ----------
function runProbes(serviceName) {
  const svc = px.simulated_services[serviceName].answers;
  const rows = px.probe_templates.map((p) => {
    const got = svc[p.probe_q];
    return { probe_id: p.probe_id, class_zh: p.class_zh, expected: p.expected, got, match: got === p.expected };
  });
  return { serviceName, rows, passed: rows.filter((r) => r.match).length, total: rows.length };
}
const memo = runProbes('memorized_service');
const robust = runProbes('robust_service');
if (memo.passed < memo.total) {
  log(30, 'probe_failed', `背题服务探针 ${memo.passed}/${memo.total}, 降级并登记复测条件: 在全部核准类别下重新通过探针回放`);
}
const gapToCobuild = px.baseline_gap_probe.probe_id === 'PRB-05';
check('E5', '红蓝对时(背题0/4·健壮4/4)', memo.passed === 0 && robust.passed === 4 && gapToCobuild,
  `背题服务 ${memo.passed}/4 → probe_failed 降级; 健壮服务 ${robust.passed}/4 → 续期; 基准缺口 PRB-05 送入共建室成为新基准候选`);

// ---------- E6 资格不继承, 档案要继承 ----------
const lineageContinuous = ledger.length >= 3 &&
  ledger.some((e) => e.event === 'version_voided') &&
  ledger.some((e) => e.event === 'probe_failed');
const qualificationNotInherited = voided === true; // 新版本必须重考, 未直接继承 in_service
check('E6', '资格不继承·档案要继承', lineageContinuous && qualificationNotInherited,
  `谱系档案 ${ledger.length} 条连续记录(作废/回归/探针降级并存); 新版本未继承旧资格, 公众可读完整家族史`);

// ---------- 证据输出 ----------
const evidence = {
  drill: 'jingzhang-timekeeping-belt evolution & probes drill v0.1',
  scope_zh: '本地合成演练: 零依赖、离线、确定性; 探针为确定性模板, 不调用模型; 生产环境探针由受约束校时agent生成, 人类保留基准维护/类别核准/争议裁决权',
  input_fixtures_sha256: inputHash,
  e4_version_lifecycle: { initial_hash: t.version_binding.service_version_hash, evolved_hash: newHash, final_state: state },
  e5_probe_replays: [memo, robust],
  e5_baseline_gap_to_cobuild: px.baseline_gap_probe,
  e6_lineage_ledger: ledger,
  checks: results,
  summary: { pass, fail, total: results.length },
  principle_zh: '到期对时管住不变的服务会漂移; 进化即失效管住会变的服务不逃逸。自演化让服务变好, 进化即失效让变好这件事变得安全。',
  operations_status: {
    real_deployment: 'not_authorized_not_run',
    probe_agent_exists: false,
    note_zh: '真实红方校时agent与探针类别须经人工核准并指派裁决角色后方可运行; 本演练只证明条款分支可确定性复现',
  },
};
const out = JSON.stringify(evidence, null, 1);
fs.writeFileSync(path.join(HERE, 'evolution-probes-evidence.json'), out);
console.log(`evolution & probes: ${pass}/${results.length} checks pass, fail=${fail}`);
console.log(`evidence sha256(input)=${inputHash.slice(0, 16)}… -> evolution-probes-evidence.json`);
if (process.argv.includes('--check')) process.exit(fail === 0 ? 0 : 1);
