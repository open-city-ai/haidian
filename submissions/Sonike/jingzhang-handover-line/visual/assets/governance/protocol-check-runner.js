#!/usr/bin/env node
/*
 * 京张交接线 · 协议自检重跑器（离线、只读）
 *
 * 用途：把本包两个招牌数字——96 条规则检查与 48 项接管断言——从原始夹具当场重算一遍，
 * 并与随包发布的结果逐条比对。包内其余数值（面积、长度、比率、断面合计、更新单元落点）
 * 都能由 geojson 与 metrics.json 直接复算；这两个数此前是唯一的例外，本文件补上。
 *
 * 用法：
 *   node protocol-check-runner.js            # 人读摘要，全部一致时退出码 0
 *   node protocol-check-runner.js --json     # 机器可读结果
 *
 * 只读三个随包文件，不写任何东西，不联网，不依赖任何第三方包：
 *   shift-ledger-suite.json   输入夹具：12 条合成交接账
 *   shift-ledger.schema.json  协议 schema（17 个枚举定义，300 个实例逐个校验）
 *   rule-check-report.json    随包发布的 96 条规则检查结果
 *   ../../../simulation.json  随包发布的 12 任务 / 48 断言结果
 *
 * 规则谓词与缺陷注入按 rule-check-report.json 的 rules[].statement_zh 独立实现，
 * 不是原生成脚本的搬运；因此本文件与那两份结果一致，构成一次独立复现。
 *
 * 它不证明现场绩效、安全、合规或获批：现场演练仍为 0/12。
 */
"use strict";
const fs = require("fs");
const path = require("path");

/* 与同目录 claims-audit.js 同一套约定：JZ_AUDIT_OVERLAY 只为 audit-selftest.js 存在，
   不设置时行为不变——只读随包文件，不写任何东西。覆盖层键用包内相对路径。 */
const HERE = process.env.JZ_AUDIT_HOME ? path.resolve(process.env.JZ_AUDIT_HOME) : __dirname;
const OVERLAY = process.env.JZ_AUDIT_OVERLAY ? path.resolve(process.env.JZ_AUDIT_OVERLAY) : null;
const read = (p) => {
  const key = path.normalize(path.join("visual/assets/governance", p));
  if (OVERLAY) {
    const cand = path.join(OVERLAY, key);
    if (fs.existsSync(cand)) return JSON.parse(fs.readFileSync(cand, "utf8"));
  }
  return JSON.parse(fs.readFileSync(path.join(HERE, p), "utf8"));
};

const suite = read("shift-ledger-suite.json");
const report = read("rule-check-report.json");
const sim = read("../../../simulation.json");

const RULES = [
  "R1_DUAL_CONTROL_SEPARATION",
  "R2_HUMAN_FLOOR_FIRST",
  "R3_BLOCKING_ITEM_HOLDS_SMART_LAYER_OFF",
  "R4_NO_TRIAL_WITHOUT_OBSERVED_ROLLBACK",
  "R5_SYNTHETIC_MUST_NOT_TOUCH_LIVE",
  "R6_REFUSAL_NEEDS_REASONS",
  "R7_NO_ATTESTATION_WITHOUT_APPOINTMENT",
];
// 「智能层关闭时该渠道仍可用」的两种合法取值
const FLOOR_OFF_OK = [
  "available_while_smart_layer_is_off",
  "available_before_during_and_after_smart_layer",
];
const ATTESTED = ["attested", "co_signed", "signed"];

const hasBlockingOpen = (L) =>
  (L.unresolved_register || []).some((i) => i.blocking === true && i.state === "open");

/* 七条规则的谓词。返回被违反的规则，按 R1…R7 次序。 */
function violations(L) {
  const v = [];
  const cp = L.control_pair, ta = L.transfer_attempt;
  const hf = L.human_service_floor, oe = L.operating_envelope, rb = L.rollback_rehearsal;

  // R1 交出与接入必须由不同角色判断，同一人不得两侧签字
  if (cp.same_person_permitted !== false ||
      cp.release_role.role_code === cp.receive_role.role_code) v.push(RULES[0]);

  // R2 人工等价服务须先于智能层存在，且至少一条渠道在智能层关闭时仍可用
  if (hf.must_exist_before_smart_layer !== true ||
      !(hf.channels || []).some((c) => FLOOR_OFF_OK.includes(c.continuity_rule))) v.push(RULES[1]);

  // R3 存在未闭合的阻塞性未决项时，智能层必须保持关闭
  if (hasBlockingOpen(L) && ta.smart_layer_state_after_decision !== "off") v.push(RULES[2]);

  // R4 回滚演练未被观察到通过前，不得进入限定试用
  if (rb.pass !== true && ta.smart_layer_state_after_decision === "limited_trial") v.push(RULES[3]);

  // R5 合成记录不得触碰真实服务，也不得含个人数据
  if (oe.record_origin === "synthetic" &&
      (oe.touches_live_service !== false || oe.contains_personal_data !== false)) v.push(RULES[4]);

  // R6 拒收必须给出可复核的理由
  if (ta.receiver_disposition === "refused" &&
      !(ta.refusal_reasons || []).length) v.push(RULES[5]);

  // R7 角色未指派时，双联状态不得标记为已共同签认
  const roles = ["release_role", "receive_role"];
  const unassigned = roles.filter((k) => cp[k].assignment_state === "unassigned_concept_role");
  if (unassigned.some((k) => ATTESTED.includes(cp[k].attestation_state)) ||
      (unassigned.length && ATTESTED.includes(cp.pair_state))) v.push(RULES[6]);

  return v;
}

/* 七类缺陷注入：每类只动一处字段，使对应规则必然被触发。
   注意 R4 的注入同时会触发 R3——阻塞项仍开着而智能层被推到限定试用，
   这与随包结果里那 12 条 violations 为两元素的记录一致。 */
function inject(L, rule) {
  const x = JSON.parse(JSON.stringify(L));
  const cp = x.control_pair, ta = x.transfer_attempt;
  switch (rule) {
    case RULES[0]: cp.receive_role.role_code = cp.release_role.role_code; break;
    case RULES[1]: x.human_service_floor.must_exist_before_smart_layer = false; break;
    case RULES[2]: ta.smart_layer_state_after_decision = "sandbox_preview"; break;
    case RULES[3]: ta.smart_layer_state_after_decision = "limited_trial"; break;
    case RULES[4]: x.operating_envelope.touches_live_service = true; break;
    case RULES[5]: ta.refusal_reasons = []; break;
    case RULES[6]: cp.release_role.attestation_state = "attested"; cp.pair_state = "attested"; break;
  }
  return x;
}

/* 四项接管断言，逐条由夹具字段判定。 */
const ASSERTS = ["smart_layer_off_baseline", "human_takeover_route",
                 "synthetic_record_disposal", "rollback_to_human_service"];
function assertions(L) {
  const ta = L.transfer_attempt, hf = L.human_service_floor;
  const oe = L.operating_envelope, rb = L.rollback_rehearsal;
  const d = oe.synthetic_record_disposal || {};
  const floorMethods = (hf.channels || []).map((c) => c.method_zh);
  return {
    smart_layer_off_baseline: ta.smart_layer_state_after_decision === "off" ? "pass" : "fail",
    human_takeover_route:
      hf.must_exist_before_smart_layer === true && hf.device_free_access === true &&
      (hf.channels || []).some((c) => FLOOR_OFF_OK.includes(c.continuity_rule)) ? "pass" : "fail",
    synthetic_record_disposal:
      oe.record_origin === "synthetic" && !!d.trigger && !!d.verification_method &&
      (d.retained_material || []).length > 0 ? "pass" : "fail",
    rollback_to_human_service:
      floorMethods.includes(rb.target_state_zh) &&
      (rb.expected_sequence || []).length >= 1 ? "pass" : "fail",
  };
}

/* ---------------- 重算并比对 ---------------- */
const recomputed = new Map();
for (const L of suite.ledgers) {
  const sid = L.scenario_anchor.scenario_id;
  recomputed.set(`${sid}::baseline`, violations(L));
  for (const r of RULES) recomputed.set(`${sid}::${r}`, violations(inject(L, r)));
}

const ruleMismatches = [];
for (const c of report.checks) {
  const got = recomputed.get(c.check_id);
  const same = got && JSON.stringify(got) === JSON.stringify(c.violations);
  const resultOk = c.variant === "baseline"
    ? (got || []).length === 0
    : (got || []).includes(c.injected_defect);
  if (!same || (c.result === "pass") !== resultOk) {
    ruleMismatches.push({ check_id: c.check_id, published: c.violations, recomputed: got });
  }
}

const byScenario = new Map(suite.ledgers.map((L) => [L.scenario_anchor.scenario_id, L]));
let assertRun = 0;
const assertMismatches = [];
for (const t of sim.tasks) {
  const a = assertions(byScenario.get(t.scenario_id));
  for (const [k, published] of Object.entries(t.checks)) {
    assertRun += 1;
    if (a[k] !== published) {
      assertMismatches.push({ scenario_id: t.scenario_id, check: k, published, recomputed: a[k] });
    }
  }
}

/* ---- schema 枚举一致性 ＋ fail-closed 结构断言（2026-08-21 加） -------------
   此前本脚本完全不读 shift-ledger.schema.json：schema 声明了 17 个枚举，但包内
   没有任何脚本验证 12 条账的取值是否落在枚举内。这个洞在 2026-08-21 当场被证实
   —— 为做模型 shadow 测试手造扰动时用了 assigned / attested /
   official_and_field_confirmed 三个**不在枚举里**的取值，包内无一处能拦下。

   两条硬规则在这里都必须守：
   ① 每个实例无条件登记：字段读不到就判该项失败并写明原因，不是跳过；
   ② 规模写死在被审对象之外——17 个枚举字段、300 个实例是常量。夹具少几条账、
      schema 少几个枚举定义，都会让退出码变 1，而不是「比对条数跟着变少但仍一致」。

   fail-closed 结构断言：smart_layer_state_after_decision 的枚举必须**逐位等于**
   ["off","sandbox_preview","limited_trial"]。这条协议因此在 schema 层面就无法
   表达「已全面启用」——不是承诺，是结构性不可能。谁往枚举里加一个更高的状态，
   这条断言立刻失败。 */
const schema = read("shift-ledger.schema.json");
const ENUM_SCALE = { enum_fields: 18, enum_instances: 360 };
const REASON_SCALE = { codes: 5, compat_rows: 4, compat_pairs: 7 };
const FAIL_CLOSED_SMART_LAYER = ["off", "sandbox_preview", "limited_trial"];

const enumDefs = new Map();
/* 只收「字段值约束」型枚举：路径必须一路走 properties/items/$defs，
   **不能穿过 if/then/else/not**——2026-08-22 加兼容表时这里咬了一口：
   allOf[i].if.properties.receiver_disposition.enum 是一个条件判据，不是
   字段的取值域，旧版收集器把它当约束写进去、还覆盖了真正的四值枚举，
   于是十二条账里合法的 "refused" 被判成越界。 */
const COND_KEYS = new Set(["if", "then", "else", "not"]);
(function collectEnums(node, name, inCond) {
  if (Array.isArray(node)) { node.forEach((v) => collectEnums(v, name, inCond)); return; }
  if (!node || typeof node !== "object") return;
  if (!inCond && Array.isArray(node.enum) && name) enumDefs.set(name, node.enum);
  for (const [k, v] of Object.entries(node)) {
    const passthrough = k === "properties" || k === "items" || k === "$defs";
    collectEnums(v, passthrough ? name : k, inCond || COND_KEYS.has(k));
  }
})(schema, null, false);

const enumInstances = [];
(function walkInstances(node) {
  if (Array.isArray(node)) { node.forEach(walkInstances); return; }
  if (!node || typeof node !== "object") return;
  for (const [k, v] of Object.entries(node)) {
    if (!enumDefs.has(k)) { walkInstances(v); continue; }
    /* 枚举约束既可能落在标量上，也可能落在字符串数组的每一项上
       （refusal_reasons 就是后者，2026-08-22 由自由字符串收紧为枚举）。 */
    if (typeof v === "string") {
      enumInstances.push({ field: k, value: v, ok: enumDefs.get(k).includes(v) });
    } else if (Array.isArray(v) && v.every((x) => typeof x === "string")) {
      for (const x of v) enumInstances.push({ field: k, value: x, ok: enumDefs.get(k).includes(x) });
    } else {
      walkInstances(v);
    }
  }
})(suite.ledgers);

const enumViolations = enumInstances.filter((x) => !x.ok)
  .map((x) => `${x.field} = ${JSON.stringify(x.value)} 不在枚举 ${JSON.stringify(enumDefs.get(x.field))} 内`);

const smartEnum = enumDefs.get("smart_layer_state_after_decision") || null;
const failClosedOk = Array.isArray(smartEnum)
  && smartEnum.length === FAIL_CLOSED_SMART_LAYER.length
  && smartEnum.every((v, i) => v === FAIL_CLOSED_SMART_LAYER[i]);
const failClosedProblems = [];
if (!smartEnum) {
  failClosedProblems.push("schema 里找不到 smart_layer_state_after_decision 的枚举定义");
} else if (!failClosedOk) {
  failClosedProblems.push(
    `smart_layer_state_after_decision 枚举为 ${JSON.stringify(smartEnum)}，`
    + `应逐位等于 ${JSON.stringify(FAIL_CLOSED_SMART_LAYER)}——fail-closed 上限被改动`);
}

/* ---- 拒收理由码与「处置 × 智能层」兼容表（2026-08-22 加）------------------
   起因是同一次模型影子测试的另两处发现：
   · SHADOW-F1：refusal_reasons 只有正则、没有枚举，同一套协议交给独立判断者时
     约 5 个概念被拼成 14 个不同码（单是「场地未确认」四种拼法），使「按理由分类
     公布拒收分布」失效。**这个缺陷本来就在包内**：随包例样用的是
     SITE_SCOPE_UNCONFIRMED 与 ROUTE_NOT_HUMAN_VERIFIED，与十二条账的四个码
     是两套词汇。
   · SHADOW-F3：协议记录的四个码里没有一个对应「人工兜底未验证」，而十二条账
     全部 must_exist_before_smart_layer=true 且 proof_state=not_observed——
     12/12 漏报了这一条理由。现补入 HUMAN_FLOOR_NOT_PROVEN。
   另补一张此前根本不存在的表：schema 原先只强制 refused ⇒ off，其余三种处置对
   智能层毫无约束，因此「附条件接受」在结构上可以直接跳到 limited_trial。
   规模（5 码／4 行／7 对）写死参与退出码：目录被删几条时「逐条一致」仍成立。 */
const REASON_FIELD = "refusal_reasons";
const reasonProblems = [];
const catalog = schema.refusal_reason_catalog || {};
const catCodes = (catalog.codes || []).map((c) => c.code).sort();
const enumCodes = (enumDefs.get(REASON_FIELD) || []).slice().sort();
if (catCodes.length !== REASON_SCALE.codes) {
  reasonProblems.push(`理由码目录 ${catCodes.length} 条，应为 ${REASON_SCALE.codes} 条`);
}
if (enumCodes.length !== REASON_SCALE.codes) {
  reasonProblems.push(`refusal_reasons 枚举 ${enumCodes.length} 值，应为 ${REASON_SCALE.codes} 值`);
}
if (catCodes.join("|") !== enumCodes.join("|")) {
  reasonProblems.push(`目录与枚举分岔：目录 ${JSON.stringify(catCodes)} vs 枚举 ${JSON.stringify(enumCodes)}`);
}
const compat = schema.disposition_smart_layer_compatibility || {};
const rows = compat.table || [];
const compatMap = new Map(rows.map((r) => [r.receiver_disposition, r.permitted_smart_layer_state_after_decision || []]));
const pairCount = rows.reduce((n, r) => n + (r.permitted_smart_layer_state_after_decision || []).length, 0);
if (rows.length !== REASON_SCALE.compat_rows) {
  reasonProblems.push(`兼容表 ${rows.length} 行，应为 ${REASON_SCALE.compat_rows} 行`);
}
if (pairCount !== REASON_SCALE.compat_pairs) {
  reasonProblems.push(`兼容表 ${pairCount} 对，应为 ${REASON_SCALE.compat_pairs} 对`);
}
for (const d of (enumDefs.get("receiver_disposition") || [])) {
  if (!compatMap.has(d)) reasonProblems.push(`处置 ${d} 在兼容表里没有对应行`);
}
for (const l of suite.ledgers) {
  const ta = l.transfer_attempt || {};
  const allowed = compatMap.get(ta.receiver_disposition);
  if (!allowed) {
    reasonProblems.push(`${l.ledger_id}: 处置 ${ta.receiver_disposition} 不在兼容表内`);
  } else if (!allowed.includes(ta.smart_layer_state_after_decision)) {
    reasonProblems.push(`${l.ledger_id}: ${ta.receiver_disposition} × ${ta.smart_layer_state_after_decision} 违反兼容表（许可 ${JSON.stringify(allowed)}）`);
  }
  const hasReasons = (ta[REASON_FIELD] || []).length > 0;
  const mustHave = ta.receiver_disposition === "refused" || ta.receiver_disposition === "deferred";
  if (hasReasons !== mustHave) {
    reasonProblems.push(`${l.ledger_id}: refusal_reasons 非空(${hasReasons}) 与处置 ${ta.receiver_disposition} 的不变式不符`);
  }
}

/* ---- 回滚证据一致性（2026-08-21 加，起因是模型影子测试） --------------------
   schema 不禁止 execution_state: observed_pass 与 evidence_pointer: null 并存——
   也就是「声称演练通过、却没有任何可核证据」。这个状态是影子测试的扰动无意造出来
   的，模型在 P4／P5 档共 8 次点出它（见 model-shadow-run.json#SHADOW-F2）。
   规则：execution_state 一旦是 observed_pass 或 observed_fail，evidence_pointer
   与 executed_at 必须非空。12 条账逐条检查，条数写死参与退出码。 */
const OBSERVED = ["observed_pass", "observed_fail"];
const rollbackEvidenceProblems = [];
let rollbackEvidenceChecked = 0;
for (const L of suite.ledgers) {
  rollbackEvidenceChecked += 1;
  const rb = (L || {}).rollback_rehearsal;
  const id = ((L || {}).scenario_anchor || {}).scenario_id || "?";
  if (!rb) { rollbackEvidenceProblems.push(`${id}: 缺 rollback_rehearsal 段`); continue; }
  if (!OBSERVED.includes(rb.execution_state)) continue;   // 未执行态无需证据指针
  if (rb.evidence_pointer === null || rb.evidence_pointer === undefined || rb.evidence_pointer === "") {
    rollbackEvidenceProblems.push(`${id}: execution_state=${rb.execution_state} 但 evidence_pointer 为空`);
  }
  if (rb.executed_at === null || rb.executed_at === undefined || rb.executed_at === "") {
    rollbackEvidenceProblems.push(`${id}: execution_state=${rb.execution_state} 但 executed_at 为空`);
  }
}

/* 规模守卫。上面三个计数全部由被审数据自己推出——夹具少几条账、发布结果少几条检查，
   比对的条数就跟着变少，而「逐条一致」仍然成立：那样脚本会以 40/40、exit 0 通过，
   正文声明的 96 与 48 却已经不成立。所以把本包声明的规模写死在这里参与退出码。
   同类的洞 2026-08-20 在 claims-audit.js 上被外部复核实测到过（见该文件 Z 段注释）。 */
const EXPECTED_SCALE = { ledgers: 12, rule_checks: 96, assertions: 48, rollback_evidence_checks: 12 };
const scaleProblems = [];
if (suite.ledgers.length !== EXPECTED_SCALE.ledgers) {
  scaleProblems.push(`交接账 ${suite.ledgers.length} 条，应为 ${EXPECTED_SCALE.ledgers} 条`);
}
if (report.checks.length !== EXPECTED_SCALE.rule_checks) {
  scaleProblems.push(`规则检查 ${report.checks.length} 条，应为 ${EXPECTED_SCALE.rule_checks} 条`);
}
if (assertRun !== EXPECTED_SCALE.assertions) {
  scaleProblems.push(`接管断言 ${assertRun} 项，应为 ${EXPECTED_SCALE.assertions} 项`);
}
if (enumDefs.size !== ENUM_SCALE.enum_fields) {
  scaleProblems.push(`schema 枚举字段 ${enumDefs.size} 个，应为 ${ENUM_SCALE.enum_fields} 个`);
}
if (enumInstances.length !== ENUM_SCALE.enum_instances) {
  scaleProblems.push(`枚举实例 ${enumInstances.length} 个，应为 ${ENUM_SCALE.enum_instances} 个`);
}
if (rollbackEvidenceChecked !== EXPECTED_SCALE.rollback_evidence_checks) {
  scaleProblems.push(`回滚证据检查 ${rollbackEvidenceChecked} 条，应为 ${EXPECTED_SCALE.rollback_evidence_checks} 条`);
}

const out = {
  runner: "protocol-check-runner.js",
  reads_only: ["shift-ledger-suite.json", "rule-check-report.json", "simulation.json"],
  ledgers: suite.ledgers.length,
  rule_checks_recomputed: report.checks.length,
  rule_checks_matching_published: report.checks.length - ruleMismatches.length,
  assertions_recomputed: assertRun,
  assertions_matching_published: assertRun - assertMismatches.length,
  expected_scale: EXPECTED_SCALE,
  enum_scale: ENUM_SCALE,
  enum_fields_in_schema: enumDefs.size,
  enum_instances_checked: enumInstances.length,
  enum_instances_valid: enumInstances.length - enumViolations.length,
  enum_violations: enumViolations,
  reason_scale: REASON_SCALE,
  reason_code_catalogue: catCodes,
  reason_problems: reasonProblems,
  fail_closed_smart_layer_enum: smartEnum,
  fail_closed_ok: failClosedOk,
  fail_closed_problems: failClosedProblems,
  rollback_evidence_checked: rollbackEvidenceChecked,
  rollback_evidence_problems: rollbackEvidenceProblems,
  scale_ok: scaleProblems.length === 0,
  scale_problems: scaleProblems,
  rule_mismatches: ruleMismatches,
  assertion_mismatches: assertMismatches,
  all_match: ruleMismatches.length === 0 && assertMismatches.length === 0
             && scaleProblems.length === 0 && enumViolations.length === 0
             && reasonProblems.length === 0
             && failClosedProblems.length === 0 && rollbackEvidenceProblems.length === 0,
  field_rehearsal_tasks_completed: sim.summary.field_rehearsal_tasks_completed,
  scope_note_zh: "只重算协议逻辑，不证明现场绩效、安全、合规或获批；现场演练仍为 0/12。",
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(out, null, 2));
} else {
  console.log(`交接账 ${out.ledgers} 条`);
  console.log(`规则检查 ${out.rule_checks_matching_published}/${out.rule_checks_recomputed} 与随包结果一致`);
  console.log(`接管断言 ${out.assertions_matching_published}/${out.assertions_recomputed} 与随包结果一致`);
  console.log(`schema 枚举取值 ${out.enum_instances_valid}/${out.enum_instances_checked} 合法（${out.enum_fields_in_schema} 个枚举字段）`);
  console.log(`拒收理由码 ${out.reason_code_catalogue.length}/${REASON_SCALE.codes} 与目录一致；兼容表 ${REASON_SCALE.compat_rows} 行／${REASON_SCALE.compat_pairs} 对，十二条账逐条符合`);
  console.log(`fail-closed 上限 ${out.fail_closed_ok ? "未被改动" : "已被改动"}：smart_layer 枚举 ${JSON.stringify(out.fail_closed_smart_layer_enum)}`);
  console.log(`回滚证据一致性 ${out.rollback_evidence_checked - out.rollback_evidence_problems.length}/${out.rollback_evidence_checked}（observed_* 必须带 evidence_pointer 与 executed_at）`);
  console.log(`现场演练 ${out.field_rehearsal_tasks_completed}/12（未授权，未执行）`);
  for (const m of out.rule_mismatches) console.log("  规则不一致:", JSON.stringify(m));
  for (const m of out.assertion_mismatches) console.log("  断言不一致:", JSON.stringify(m));
  for (const m of out.scale_problems) console.log("  规模不符:", m);
  for (const m of out.enum_violations) console.log("  枚举越界:", m);
  for (const m of out.fail_closed_problems) console.log("  fail-closed 断言失败:", m);
  for (const m of out.rollback_evidence_problems) console.log("  回滚证据不一致:", m);
  console.log(out.all_match ? "全部一致" : "存在不一致");
}
process.exit(out.all_match ? 0 : 1);
