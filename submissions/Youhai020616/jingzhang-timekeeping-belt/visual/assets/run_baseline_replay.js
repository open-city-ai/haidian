#!/usr/bin/env node
/**
 * 京张授时带 — 评测回放式对时演练 (baseline replay drill)
 *
 * 在桌面演练 (run_timecheck_tabletop.js, D1-D6) 验证协议结构之外,
 * 本脚本演练"对时"动作本身的评测学内核: 把服务读数与人工基准答案集
 * 逐条回放比对, 测量偏差, 依限差给出 续期/降级 决定。
 *
 *   E1 合格回放 — 5/5 读数与基准一致, 偏差 0 ≤ 限差 → on_time_renewal
 *   E2 超差回放 — 1/5 读数漂移, 偏差 1 > 限差 0 → deviation_degrade + 复测条件
 *   E3 决定可追溯 — 每条比对记录进入证据, 决定由偏差推出, 不由人为指定
 *
 * 这一循环与任何具备"基准设计-评测运行-门禁发布-轨迹留档"能力的开源
 * agent 评测框架一一对应 (映射说明见 ../../visual/assets/timecheck-runtime.json); 演练本身
 * 零依赖、离线、确定性, 不调用任何模型或外部系统。
 * 全部数据为合成样例; 真实基准须由专业角色建立后方可进入真实对时。
 *
 * 运行: node run_baseline_replay.js [--check]
 * 输出: baseline-replay-evidence.json (逐字节可复现)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const HERE = __dirname;
const raw = fs.readFileSync(path.join(HERE, 'baseline-replay-fixture.json'), 'utf8');
const fx = JSON.parse(raw);
const inputHash = crypto.createHash('sha256').update(raw).digest('hex');

const results = [];
let pass = 0, fail = 0;
function check(id, name, ok, detail) {
  results.push({ id, name, status: ok ? 'pass' : 'fail', detail });
  ok ? pass++ : fail++;
}

function replay(runName) {
  const run = fx.service_readings[runName];
  const rows = fx.baseline.entries.map((e) => {
    const got = run.answers[e.q];
    return { q: e.q, expected: e.expected, got, match: got === e.expected };
  });
  const deviations = rows.filter((r) => !r.match).length;
  const withinTolerance = deviations <= fx.tolerance.max_deviations;
  const decision = withinTolerance ? 'on_time_renewal' : 'deviation_degrade';
  return { runName, rows, deviations, withinTolerance, decision };
}

// E1 合格回放
const e1 = replay('in_tolerance_run');
check('E1', '合格回放→准点续期', e1.deviations === 0 && e1.decision === 'on_time_renewal',
  `5/5 一致, 偏差 ${e1.deviations} ≤ 限差 ${fx.tolerance.max_deviations}, 决定=${e1.decision}`);

// E2 超差回放
const e2 = replay('out_of_tolerance_run');
const retest_zh = '同步公开目录版本后重新回放全部条目; 降级期间由人工窗口与纸质目录服务';
check('E2', '超差回放→降级+复测条件', e2.deviations === 1 && e2.decision === 'deviation_degrade',
  `4/5 一致, 偏差 ${e2.deviations} > 限差 ${fx.tolerance.max_deviations}, 决定=${e2.decision}; 复测条件已登记`);

// E3 决定可追溯: 决定必须能从逐条比对推出, 且证据含全部比对行
const traceable = [e1, e2].every((r) => r.rows.length === fx.baseline.entries.length &&
  (r.decision === 'on_time_renewal') === (r.deviations <= fx.tolerance.max_deviations));
check('E3', '决定可追溯(由偏差推出)', traceable,
  '每个决定均由逐条比对与限差机械推出, 证据保留全部比对行, 无人为指定分支');

const evidence = {
  drill: 'jingzhang-timekeeping-belt baseline replay v0.1',
  scope_zh: '本地合成演练: 零依赖、离线、确定性; 不调用模型或外部系统; 基准与读数均为合成样例',
  input_fixture_sha256: inputHash,
  baseline: { id: fx.baseline.baseline_id, version: fx.baseline.version, entries: fx.baseline.entries.length },
  replays: [e1, e2].map((r) => ({ run: r.runName, deviations: r.deviations, decision: r.decision, rows: r.rows })),
  retest_condition_zh: retest_zh,
  checks: results,
  summary: { pass, fail, total: results.length },
  runtime_mapping_zh: '生产化映射见 visual/assets/timecheck-runtime.json: 基准答案集↔benchmark suite, 对时回放↔evaluation run, 续期/降级↔评测门禁, 误点档案↔trace/评测历史; 可由任何具备该四类能力的开源 agent 评测框架实现, 不构成供应商绑定',
  operations_status: {
    real_baseline_established: false,
    real_deployment: 'not_authorized_not_run',
    note_zh: '真实基准须由专业角色建立并版本化后, 评测回放才能进入真实对时流程',
  },
};
const out = JSON.stringify(evidence, null, 1);
fs.writeFileSync(path.join(HERE, 'baseline-replay-evidence.json'), out);
console.log(`baseline replay: ${pass}/${results.length} checks pass, fail=${fail}`);
console.log(`evidence sha256(input)=${inputHash.slice(0, 16)}… -> baseline-replay-evidence.json`);
if (process.argv.includes('--check')) process.exit(fail === 0 ? 0 : 1);
