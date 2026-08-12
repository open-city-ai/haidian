#!/usr/bin/env node
/*
 * 道岔联锁协议（switch-protocol.json）确定性验证脚本。
 * 第三方可复跑：node visual/assets/verify_switch_protocol.js
 * 验证：状态机合法性 / 迁移规则 / 场景卡字段完整性 / 责任矩阵 / 红牌演练。
 * 全部检查确定性、无网络依赖，输出 JSON。
 */
"use strict";
const fs = require("fs");
const path = require("path");

const PROTOCOL_PATH = path.join(__dirname, "switch-protocol.json");
const VALID_STATES = ["GREEN", "YELLOW", "RED", "RETIRED"];
const WILDCARD = ["ANY"];
const REQUIRED_SCENARIO_FIELDS = [
  "id", "name_zh", "state", "zone", "location_zh", "manual_fallback_zh",
  "operator_zh", "permit_zh", "data_zh", "kpi_zh", "review_zh", "exit_zh",
];
const EXPECTED_SCENARIO_COUNT = 12;
const EXPECTED_INDUSTRY_TEST_COUNT = 3;

function runChecks(protocol) {
  const checks = [];
  const sm = protocol.state_machine || {};

  const states = sm.states || [];
  checks.push({
    id: "SM_STATES_VALID",
    ok: Array.isArray(states) && states.slice().sort().join(",") === VALID_STATES.slice().sort().join(","),
    detail: "states=" + JSON.stringify(states),
  });

  const initial = sm.initial_state;
  checks.push({
    id: "SM_INITIAL_STATE",
    ok: VALID_STATES.includes(initial),
    detail: "initial=" + initial,
  });

  const transitions = sm.transitions || [];
  let transOk = true;
  let redToGreen = false;
  for (const t of transitions) {
    const f = t.from, to = t.to;
    if (!(VALID_STATES.includes(f) || WILDCARD.includes(f)) || !VALID_STATES.includes(to)) transOk = false;
    if (f === "RED" && to === "GREEN") redToGreen = true;
  }
  checks.push({
    id: "SM_TRANSITIONS_VALID",
    ok: transOk && transitions.length >= 6,
    detail: "transitions=" + transitions.length,
  });
  checks.push({
    id: "SM_NO_RED_TO_GREEN",
    ok: !redToGreen,
    detail: "red must not go directly to green",
  });

  const scenarios = protocol.scenarios || [];
  checks.push({
    id: "SCENARIO_COUNT",
    ok: scenarios.length === EXPECTED_SCENARIO_COUNT,
    detail: "count=" + scenarios.length,
  });

  const missing = [];
  for (const sc of scenarios) {
    for (const field of REQUIRED_SCENARIO_FIELDS) {
      if (!sc[field]) missing.push((sc.id || "?") + ":" + field);
    }
  }
  checks.push({
    id: "SCENARIO_FIELDS_COMPLETE",
    ok: missing.length === 0,
    detail: missing.length ? "missing=" + missing.join(",") : "all complete",
  });

  const testCount = scenarios.filter((sc) => sc.industry_test).length;
  checks.push({
    id: "INDUSTRY_TEST_COUNT",
    ok: testCount >= EXPECTED_INDUSTRY_TEST_COUNT,
    detail: "industry_test=" + testCount,
  });

  const drill = sm.red_light_drill || {};
  checks.push({
    id: "RED_LIGHT_DRILL_CONFIGURED",
    ok: !!(drill.runbook_zh && drill.runbook_en),
    detail: drill.runbook_zh ? "drill runbook present" : "missing",
  });

  const principles = protocol.governance_principles_zh || [];
  checks.push({
    id: "GOVERNANCE_PRINCIPLES",
    ok: Array.isArray(principles) && principles.length >= 5,
    detail: "principles=" + principles.length,
  });

  const respOk = scenarios.every(
    (sc) => sc.operator_zh && sc.permit_zh && sc.data_zh && sc.kpi_zh && sc.review_zh && sc.exit_zh
  );
  checks.push({
    id: "RESPONSIBILITY_MATRIX",
    ok: respOk,
    detail: respOk ? "responsibility matrix complete" : "incomplete",
  });

  return checks;
}

function main() {
  if (!fs.existsSync(PROTOCOL_PATH)) {
    console.log(JSON.stringify({ ok: false, error: "switch-protocol.json not found" }));
    process.exit(1);
  }
  let protocol;
  try {
    protocol = JSON.parse(fs.readFileSync(PROTOCOL_PATH, "utf-8"));
  } catch (e) {
    console.log(JSON.stringify({ ok: false, error: "parse error: " + e.message }));
    process.exit(1);
  }
  const checks = runChecks(protocol);
  const allOk = checks.every((c) => c.ok);
  const result = {
    ok: allOk,
    checks_total: checks.length,
    checks_passed: checks.filter((c) => c.ok).length,
    checks,
    note_zh: "道岔联锁协议确定性验证；与 metrics.json/proposal 中的治理表述配套。",
    note_en: "Deterministic verification of the Switch Interlocking Protocol; complements governance statements in metrics.json and the proposal.",
  };
  console.log(JSON.stringify(result, null, 2));
  process.exit(allOk ? 0 : 1);
}

main();
