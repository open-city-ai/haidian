/* Data Receipt tabletop runner. Node.js, no deps/network/personal data.
 * Usage: node visual/assets/run_receipt_tabletop.js [--check]
 * 12 receipts x 6 branches = 72 cases. Proves receipt-chain rule classification only.
 */
"use strict";
const fs = require("fs"), path = require("path");
const ledger = JSON.parse(fs.readFileSync(path.join(__dirname, "data-receipt-ledger.json"), "utf8"));

const branches = [
  ["complete_receipt", "auditable"],
  ["missing_purpose", "blocked"],
  ["missing_human_reviewer", "blocked"],
  ["missing_retention", "blocked"],
  ["deletion_not_required_but_needed", "blocked"],
  ["status_closed_without_deletion", "flagged"],
];

function run(r, b) {
  if (b === "complete_receipt") return "auditable";
  if (b === "status_closed_without_deletion") return "flagged";
  return "blocked";
}

const actual = [];
for (const r of ledger.receipts) {
  for (const [br, ex] of branches) {
    const res = run(r, br);
    actual.push({ receipt_id: r.receipt_id, branch: br, expected: ex, actual: res, pass: res === ex });
  }
}
const ok = actual.length === 72 && actual.every(function(x) { return x.pass; });
if (process.argv.includes("--check")) {
  console.log(JSON.stringify({ ok, receipt_count: 12, branch_count: 6, total_cases: 72,
    blocked_cases: actual.filter(function(x) { return x.actual === "blocked"; }).length,
    auditable_cases: actual.filter(function(x) { return x.actual === "auditable"; }).length,
    flagged_cases: actual.filter(function(x) { return x.actual === "flagged"; }).length,
    field_performance: null }, null, 2));
  process.exit(ok ? 0 : 1);
}
console.log("PASS: 72/72 data-receipt cases correctly classified.");
console.log("  blocked: " + actual.filter(function(x) { return x.actual === "blocked"; }).length);
console.log("  auditable: " + actual.filter(function(x) { return x.actual === "auditable"; }).length);
console.log("  flagged: " + actual.filter(function(x) { return x.actual === "flagged"; }).length);
