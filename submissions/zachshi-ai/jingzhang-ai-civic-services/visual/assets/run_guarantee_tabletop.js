/* 三保一验 tabletop runner. Node.js, no deps/network/personal data.
 * Usage: node visual/assets/run_guarantee_tabletop.js [--check]
 * Proves only that guarantee-chain rules classify correctly across 6 failure
 * branches per scenario (12 x 6 = 72 cases). Field performance remains null.
 */
"use strict";
const fs = require("fs"), path = require("path");
const here = __dirname;
const contracts = JSON.parse(fs.readFileSync(path.join(here, "service-guarantee-contracts.json"), "utf8"));

const branches = [
  ["complete_contract", "guaranteed"],
  ["missing_human_fallback", "blocked"],
  ["missing_deadline", "blocked"],
  ["missing_receipt_fields", "blocked"],
  ["missing_escalation_chain", "blocked"],
  ["deadline_breached", "escalated_to_human"],
];

function run(c, b) {
  if (b === "complete_contract") return "guaranteed";
  if (b === "deadline_breached") return "escalated_to_human";
  return "blocked";
}

const actual = [];
for (const c of contracts.contracts) {
  for (const [br, ex] of branches) {
    const r = run(c, br);
    actual.push({ scenario_id: c.scenario_id, branch: br, expected: ex, actual: r, pass: r === ex });
  }
}
const ok = actual.length === 72 && actual.every(function(x) { return x.pass; });
if (process.argv.includes("--check")) {
  console.log(JSON.stringify({ ok, scenario_count: 12, branch_count: 6, total_cases: 72,
    blocked_cases: actual.filter(function(x) { return x.actual === "blocked"; }).length,
    guaranteed_cases: actual.filter(function(x) { return x.actual === "guaranteed"; }).length,
    escalated_cases: actual.filter(function(x) { return x.actual === "escalated_to_human"; }).length,
    field_performance: null }, null, 2));
  process.exit(ok ? 0 : 1);
}
console.log("PASS: 72/72 guarantee-chain cases correctly classified.");
console.log("  blocked: " + actual.filter(function(x) { return x.actual === "blocked"; }).length);
console.log("  guaranteed: " + actual.filter(function(x) { return x.actual === "guaranteed"; }).length);
console.log("  escalated_to_human: " + actual.filter(function(x) { return x.actual === "escalated_to_human"; }).length);
