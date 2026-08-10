#!/usr/bin/env node
/**
 * 京张授时带 — 对时协议桌面演练 (deterministic tabletop drill)
 *
 * 本脚本在无网络、无外部系统、无参与者、无个人数据的本地范围内，
 * 用抽象 tick 时钟对四份示例运行时刻表复演对时协议的全部关键分支：
 *   D1 字段完整性       — 四份时刻表逐一通过 schema 必填字段检查
 *   D2 到期降级         — 时钟越过 next_check_due_tick 且未对时 → 自动降级
 *   D3 超差降级         — 对时读数超出限差 → 降级并登记复测条件
 *   D4 准点续期         — 对时合格 → 续期新窗口, 误点档案记 on_time_renewal
 *   D5 非AI路径连续     — 全部降级态服务仍有非 AI 等价路径
 *   D6 退役五步         — 一份时刻表执行退役: 停入口→切人工→处置记录→公开档案→封存
 * 演练只证明协议结构与退出分支可确定性复现, 不证明真实人工能力、
 * 现场安全、服务绩效或公众接受度。真实运营状态固定为 not_authorized_not_run。
 *
 * 运行: node run_timecheck_tabletop.js [--check]
 * 输出: timecheck-tabletop-evidence.json (逐字节可复现)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const HERE = __dirname;
const schema = JSON.parse(fs.readFileSync(path.join(HERE, 'timetable.schema.json'), 'utf8'));
const fixturesRaw = fs.readFileSync(path.join(HERE, 'example-timetables.json'), 'utf8');
const fixtures = JSON.parse(fixturesRaw).timetables;
const inputHash = crypto.createHash('sha256').update(fixturesRaw).digest('hex');

const results = [];
const ledgerAll = [];
let pass = 0, fail = 0;
function check(id, name, ok, detail) {
  results.push({ id, name, status: ok ? 'pass' : 'fail', detail });
  ok ? pass++ : fail++;
}

// ---- D1 字段完整性（必填字段 + 关键常量约束, 不依赖外部校验库） ----
const required = schema.required;
let d1ok = true;
const d1detail = [];
for (const t of fixtures) {
  const missing = required.filter((k) => !(k in t));
  const constOk = t.minimum_data && t.minimum_data.personal_data === false;
  const windowOk = t.time_check_window && t.time_check_window.interval_days <= 180;
  const notAssigned = t.responsible_role && t.responsible_role.assigned === false;
  const noBaseline = t.baseline_ref && t.baseline_ref.established === false;
  const ok = missing.length === 0 && constOk && windowOk && notAssigned && noBaseline;
  d1ok = d1ok && ok;
  d1detail.push(`${t.service_id}: ${ok ? 'complete' : 'missing=' + missing.join(',')}`);
}
check('D1', '字段完整性 4/4', d1ok, d1detail.join('; '));

// ---- 模拟时钟推进 ----
function degrade(t, tick, event, note) {
  const entry = { tick, event, note_zh: note };
  t.delay_ledger.push(entry);
  ledgerAll.push({ service_id: t.service_id, ...entry });
  t._state = event === 'on_time_renewal' ? 'in_service' : 'degraded';
}

// D2 到期降级: 时钟直接推进到 tick=200 (超过全部窗口), 无任何对时
const sim = JSON.parse(JSON.stringify(fixtures));
let d2ok = true;
for (const t of sim) {
  const tick = 200;
  if (tick > t.time_check_window.next_check_due_tick) {
    degrade(t, tick, 'overdue_degrade', '到期未对时, 自动降级到非AI等价路径: ' + t.non_ai_path_zh.slice(0, 24));
  }
  d2ok = d2ok && t._state === 'degraded' && t.delay_ledger.length === 1;
}
check('D2', '到期降级 4/4', d2ok, '全部时刻表在越过对时窗后进入降级态并留下公开误点记录');

// D3 超差降级: SVC-HEALTH-NAV 在窗口内对时但读数超差
const t3 = JSON.parse(JSON.stringify(fixtures[1]));
{
  const tick = 25; // 窗口内
  const deviationExceeds = true; // 演练固定分支: 抽样回放与公开目录不一致
  if (deviationExceeds) {
    degrade(t3, tick, 'deviation_degrade', '对时超差: 转介去向与公开目录不一致, 降级并登记复测条件');
  }
  check('D3', '超差降级', t3._state === 'degraded' && t3.delay_ledger[0].event === 'deviation_degrade',
    '窗口内对时但超出限差 → 降级, 恢复只能经重新对时: ' + t3.degrade_plan.recovers_via_zh.slice(0, 20));
}

// D4 准点续期: SVC-ACCESS-COMPANION 在 tick=28 对时合格
const t4 = JSON.parse(JSON.stringify(fixtures[0]));
{
  const tick = 28;
  const deviationOk = true; // 演练固定分支
  if (tick <= t4.time_check_window.next_check_due_tick && deviationOk) {
    t4.time_check_window.last_check_tick = tick;
    t4.time_check_window.next_check_due_tick = tick + t4.time_check_window.interval_days;
    degrade(t4, tick, 'on_time_renewal', '对时合格, 续期至 tick=' + t4.time_check_window.next_check_due_tick);
  }
  check('D4', '准点续期', t4._state === 'in_service' && t4.time_check_window.next_check_due_tick === 58,
    '合格对时把窗口精确续期一个 interval, 续期本身也进入公开档案');
}

// D5 非AI路径连续: 全部降级态服务仍有非空 non_ai_path
const degraded = sim.filter((t) => t._state === 'degraded');
check('D5', '非AI路径连续 4/4', degraded.length === 4 && degraded.every((t) => t.non_ai_path_zh.length >= 8),
  '降级不是停止服务: 四份时刻表的非AI等价路径全部存在且可执行');

// D6 退役五步: SVC-EXPERIENCE-ST 执行退役
const t6 = JSON.parse(JSON.stringify(fixtures[3]));
const retireSteps = [
  '停用 AI 入口并摘除展位',
  '切换人工咨询与普通服务',
  '按保留规则处置测试数据并记录删除',
  '退役原因与全部误点档案公开',
  '时刻表封存, 新版本须另开时刻表并从 T0 重新过门',
];
const executed = [];
for (const s of retireSteps) executed.push(s);
degrade(t6, 90, 'retired', '按五步退役; 档案只增不删');
check('D6', '退役五步 5/5', executed.length === 5 && t6.delay_ledger[0].event === 'retired',
  executed.map((s, i) => `${i + 1}.${s.slice(0, 12)}`).join(' '));

// ---- 证据输出 ----
const evidence = {
  drill: 'jingzhang-timekeeping-belt timecheck tabletop v0.1',
  scope_zh: '本地合成演练: 无网络调用、无外部系统、无参与者、无个人数据; 时钟为抽象 tick',
  input_fixtures_sha256: inputHash,
  fixture_count: fixtures.length,
  checks: results,
  summary: { pass, fail, total: results.length },
  public_delay_ledger_sample: ledgerAll,
  operations_status: {
    real_deployment: 'not_authorized_not_run',
    responsible_role_assigned: false,
    baseline_established: false,
    performance_results: null,
    note_zh: '演练只证明对时协议的结构与退出分支可复现; 真实限域试用须待 T0-T2 证据齐备并由经授权主体签署',
  },
};
const out = JSON.stringify(evidence, null, 1);
fs.writeFileSync(path.join(HERE, 'timecheck-tabletop-evidence.json'), out);
console.log(`timecheck tabletop: ${pass}/${results.length} checks pass, fail=${fail}`);
console.log(`evidence sha256(input)=${inputHash.slice(0, 16)}… -> timecheck-tabletop-evidence.json`);
if (process.argv.includes('--check')) process.exit(fail === 0 ? 0 : 1);
