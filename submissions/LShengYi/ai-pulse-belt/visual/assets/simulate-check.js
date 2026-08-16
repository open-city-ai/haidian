#!/usr/bin/env node
/**
 * simulate-check.js — offline re-runnable contract check for simulation.json.
 *
 * Zero dependencies, deterministic, idempotent. Exit code contract:
 *   0 = all contract checks pass
 *   1 = any contract check fails (missing task, wrong variant set, bad receipt)
 *   2 = simulation.json missing or unreadable
 *
 * Usage:
 *   node simulate-check.js                     # check the real simulation.json
 *   node simulate-check.js --self-test         # baseline + tamper-rejection battery
 *
 * --self-test proves the checker's refusal branches actually fire: it mutates a
 * deep copy of simulation.json with eight known tampering cases, runs the SAME
 * check() on each, and requires every case to be rejected (exit 1). Evidence is
 * written to visual/assets/simulate-tamper-evidence.json (deterministic).
 * A checker that only passes "good" records proves nothing; the whole point of
 * the 105 negative branches is that they get blocked.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const argv = process.argv.slice(2);
const simPath = path.resolve(__dirname, "..", "..", "simulation.json");
const evidencePath = path.join(__dirname, "simulate-tamper-evidence.json");
const filePath = argv[0] && !argv[0].startsWith("--") ? path.resolve(argv[0]) : simPath;
const selfTest = argv.includes("--self-test");

// Contract 1: expected service set (12 scenario cards + 3 validation tests).
const SERVICES = [
  "card-01", "card-02", "card-03", "card-04", "card-05", "card-06",
  "card-07", "card-08", "card-09", "card-10", "card-11", "card-12",
  "test-v2x", "test-delivery", "test-wayfinding",
];

// Contract 2: expected variant set per service (1 qualified + 7 failure branches).
const VARIANTS = [
  "qualified",
  "missing_responsible_role",
  "data_exceeds_declared_ceiling",
  "same_task_human_route_unavailable",
  "cannot_pause",
  "revision_not_public",
  "bequest_dividend_missing",
  "post_exit_service_lapses",
];

const EXPECTED_TASK_COUNT = SERVICES.length * VARIANTS.length; // 15 * 8 = 120
const EXPECTED_FAILURE_BRANCHES = SERVICES.length * (VARIANTS.length - 1); // 105

/** Pure check: returns array of violation strings (empty = pass). */
function check(sim) {
  const failures = [];
  if (sim.task_count !== EXPECTED_TASK_COUNT) {
    failures.push(`task_count ${sim.task_count} != ${EXPECTED_TASK_COUNT}`);
  }
  if (sim.failure_branch_count !== EXPECTED_FAILURE_BRANCHES) {
    failures.push(`failure_branch_count ${sim.failure_branch_count} != ${EXPECTED_FAILURE_BRANCHES}`);
  }
  const seen = new Set();
  for (const t of sim.tasks || []) {
    const sid = t.scenario_id;
    if (!SERVICES.includes(sid)) failures.push(`unknown scenario_id ${sid}`);
    const key = `${sid}::${t.test_variant}`;
    if (seen.has(key)) failures.push(`duplicate task ${key}`);
    seen.add(key);
    const expected = t.test_variant === "qualified" ? "rule_check_success" : "negative_blocked";
    if (t.outcome !== expected) failures.push(`${key}: outcome ${t.outcome} != ${expected}`);
    if (t.dispatch_schema_valid !== true) failures.push(`${key}: dispatch_schema_valid != true`);
    if (t.audit_complete !== true) failures.push(`${key}: audit_complete != true`);
    if (t.synthetic !== true) failures.push(`${key}: synthetic != true`);
    if (t.field_run !== false) failures.push(`${key}: field_run != false`);
    const want = crypto
      .createHash("sha256")
      .update(`${sim.seed || ""}|${sid}|${t.test_variant}`)
      .digest("hex");
    if (t.receipt_sha256 !== want) failures.push(`${key}: receipt mismatch`);
  }
  for (const sid of SERVICES) {
    for (const v of VARIANTS) {
      if (!seen.has(`${sid}::${v}`)) failures.push(`missing task ${sid}::${v}`);
    }
  }
  if (sim.status !== "offline_complete_field_not_authorized_not_run") {
    failures.push(`status ${sim.status} != offline_complete_field_not_authorized_not_run`);
  }
  return failures;
}

let sim;
try {
  sim = JSON.parse(fs.readFileSync(filePath, "utf8"));
} catch (e) {
  console.error("E2 simulation.json missing or unreadable:", filePath);
  process.exit(2);
}

if (!selfTest) {
  const failures = check(sim);
  if (failures.length) {
    console.error("E1 contract violations:");
    for (const f of failures) console.error("  - " + f);
    process.exit(1);
  }
  console.log(
    `OK ${sim.task_count} tasks, ${sim.failure_branch_count} negative branches, ` +
    `all receipts deterministic, status=${sim.status}`
  );
  process.exit(0);
}

// ---- --self-test: baseline must pass, every tamper case must be rejected ----
const clone = (x) => JSON.parse(JSON.stringify(x));

const tamperCases = [
  {
    id: "T1",
    rule: "缺任务（missing task）",
    tamper: (c) => { c.tasks.pop(); c.task_count = c.tasks.length; },
    expect: "拒绝：缺 card-12::post_exit_service_lapses",
  },
  {
    id: "T2",
    rule: "任务重复（duplicate task key）",
    tamper: (c) => { c.tasks.push(clone(c.tasks[0])); },
    expect: "拒绝：duplicate task card-01::qualified",
  },
  {
    id: "T3",
    rule: "回执哈希被改写（receipt tamper）",
    tamper: (c) => { c.tasks[0].receipt_sha256 = "0".repeat(64); },
    expect: "拒绝：receipt mismatch",
  },
  {
    id: "T4",
    rule: "失败分支被改成通过（negative branch flipped）",
    tamper: (c) => {
      const t = c.tasks.find((x) => x.test_variant === "cannot_pause");
      t.outcome = "rule_check_success";
    },
    expect: "拒绝：outcome != negative_blocked",
  },
  {
    id: "T5",
    rule: "计数声明被改（task_count 119）",
    tamper: (c) => { c.task_count = 119; },
    expect: "拒绝：task_count 119 != 120",
  },
  {
    id: "T6",
    rule: "擅自声称现场运行（field_run=true）",
    tamper: (c) => { c.tasks[0].field_run = true; },
    expect: "拒绝：field_run != false（未获授权、未现场运行的纪律）",
  },
  {
    id: "T7",
    rule: "状态改为已上线（status=live）",
    tamper: (c) => { c.status = "live"; },
    expect: "拒绝：status != offline_complete_field_not_authorized_not_run",
  },
  {
    id: "T8",
    rule: "注入未知场景 id（unknown scenario_id）",
    tamper: (c) => { c.tasks[0].scenario_id = "card-99"; },
    expect: "拒绝：unknown scenario_id card-99",
  },
];

const baselineFailures = check(sim);
const cases = [];
let allRejected = baselineFailures.length === 0;
for (const tc of tamperCases) {
  const mutated = clone(sim);
  tc.tamper(mutated);
  const f = check(mutated);
  const rejected = f.length > 0;
  if (!rejected) allRejected = false;
  cases.push({
    id: tc.id,
    rule: tc.rule,
    expect: tc.expect,
    rejected,
    violations: f.slice(0, 2),
  });
}

const evidence = {
  schema_version: "1.0.0",
  package_version: "v10.7.3",
  intended_use: "自测证据：证明 simulate-check.js 的拒绝分支真实触发（同一份 check() 跑在八种篡改副本上，全部必须被拒）。自测只证明判定逻辑可复现、拒绝分支确实会触发；不证明任何实地读数、任何真实服务绩效——篡改用例是示意性的。",
  baseline_ok: baselineFailures.length === 0,
  cases,
  all_tamper_cases_rejected: allRejected,
};
fs.writeFileSync(evidencePath, JSON.stringify(evidence, null, 1), "utf8");

if (!allRejected) {
  console.error("SELF-TEST FAIL: at least one tamper case was NOT rejected");
  for (const c of cases) {
    if (!c.rejected) console.error("  - " + c.id + " not rejected");
  }
  process.exit(1);
}
console.log(
  `SELF-TEST OK: baseline ${sim.task_count} tasks pass; ${cases.length}/${cases.length} tamper cases rejected ` +
  `(evidence: ${path.relative(process.cwd(), evidencePath)})`
);
process.exit(0);
