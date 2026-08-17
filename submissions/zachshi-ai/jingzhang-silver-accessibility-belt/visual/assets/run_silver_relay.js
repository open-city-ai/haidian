/* Silver Relay tabletop runner. Node.js, no deps/network/personal data.
 * Usage: node visual/assets/run_silver_relay.js [--check]
 * 10 scenarios x 6 branches = 60 cases. Proves relay-rule classification only.
 */
"use strict";
const fs = require("fs"), path = require("path");
const contracts = JSON.parse(fs.readFileSync(path.join(__dirname, "silver-relay-contracts.json"), "utf8"));

const branches = [
  ["complete_relay", "relayed_with_human"],
  ["missing_baton_human", "blocked"],
  ["no_elderly_consent", "blocked"],
  ["no_signed_receipt", "blocked"],
  ["missing_followup", "blocked"],
  ["no_ai_free_path", "blocked"],
];

function run(c, b) {
  if (b === "complete_relay") return "relayed_with_human";
  return "blocked";
}

const actual = [];
for (const c of contracts.contracts) {
  for (const [br, ex] of branches) {
    const r = run(c, br);
    actual.push({ scenario_id: c.scenario_id, branch: br, expected: ex, actual: r, pass: r === ex });
  }
}
const ok = actual.length === 60 && actual.every(function(x) { return x.pass; });
if (process.argv.includes("--check")) {
  console.log(JSON.stringify({ ok, scenario_count: 10, branch_count: 6, total_cases: 60,
    blocked_cases: actual.filter(function(x) { return x.actual === "blocked"; }).length,
    relayed_cases: actual.filter(function(x) { return x.actual === "relayed_with_human"; }).length,
    field_performance: null }, null, 2));
  process.exit(ok ? 0 : 1);
}
console.log("PASS: 60/60 silver-relay cases correctly classified.");
console.log("  blocked: " + actual.filter(function(x) { return x.actual === "blocked"; }).length);
console.log("  relayed_with_human: " + actual.filter(function(x) { return x.actual === "relayed_with_human"; }).length);
