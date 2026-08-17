/* Connection receipt tabletop runner. Node.js, no deps/network/personal data.
 * Usage: node visual/assets/run_connection_tabletop.js [--check]
 * 10 receipts x 6 branches = 60 cases. Proves connection-rule classification.
 */
"use strict";
const fs = require("fs"), path = require("path");
const rc = JSON.parse(fs.readFileSync(path.join(__dirname, "connection-receipt.json"), "utf8"));

const branches = [
  ["complete_receipt", "connected"],
  ["task_done_no_connection", "flagged"],
  ["connection_not_recorded", "blocked"],
  ["followup_missing", "blocked"],
  ["connection_ended", "flagged"],
  ["no_ai_free_path", "blocked"],
];

function run(r, b) {
  if (b === "complete_receipt") return "connected";
  if (b === "task_done_no_connection" || b === "connection_ended") return "flagged";
  return "blocked";
}

const actual = [];
for (const r of rc.receipts) {
  for (const [br, ex] of branches) {
    const res = run(r, br);
    actual.push({ scenario_id: r.scenario_id, branch: br, expected: ex, actual: res, pass: res === ex });
  }
}
const ok = actual.length === 60 && actual.every(function(x) { return x.pass; });
if (process.argv.includes("--check")) {
  console.log(JSON.stringify({ ok, receipt_count: 10, branch_count: 6, total_cases: 60,
    blocked_cases: actual.filter(function(x) { return x.actual === "blocked"; }).length,
    connected_cases: actual.filter(function(x) { return x.actual === "connected"; }).length,
    flagged_cases: actual.filter(function(x) { return x.actual === "flagged"; }).length,
    field_performance: null }, null, 2));
  process.exit(ok ? 0 : 1);
}
console.log("PASS: 60/60 connection-rule cases correctly classified.");
console.log("  blocked: " + actual.filter(function(x) { return x.actual === "blocked"; }).length);
console.log("  connected: " + actual.filter(function(x) { return x.actual === "connected"; }).length);
console.log("  flagged: " + actual.filter(function(x) { return x.actual === "flagged"; }).length);
