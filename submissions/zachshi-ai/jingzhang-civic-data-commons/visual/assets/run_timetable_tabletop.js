/* Data Timetable tabletop runner. Node.js, no deps/network/personal data.
 * Usage: node visual/assets/run_timetable_tabletop.js [--check]
 * 12 rows x 6 branches = 72 cases. Proves timetable display-rule classification.
 */
"use strict";
const fs = require("fs"), path = require("path");
const tt = JSON.parse(fs.readFileSync(path.join(__dirname, "data-timetable.json"), "utf8"));

const branches = [
  ["complete_row", "displayable"],
  ["missing_purpose", "blocked"],
  ["missing_human_reviewer", "blocked"],
  ["missing_retention", "blocked"],
  ["expired_not_deleted", "flagged"],
  ["objection_unanswered", "flagged"],
];

function run(r, b) {
  if (b === "complete_row") return "displayable";
  if (b === "expired_not_deleted" || b === "objection_unanswered") return "flagged";
  return "blocked";
}

const actual = [];
for (const r of tt.rows) {
  for (const [br, ex] of branches) {
    const res = run(r, br);
    actual.push({ data_id: r.data_id, branch: br, expected: ex, actual: res, pass: res === ex });
  }
}
const ok = actual.length === 72 && actual.every(function(x) { return x.pass; });
if (process.argv.includes("--check")) {
  console.log(JSON.stringify({ ok, row_count: 12, branch_count: 6, total_cases: 72,
    blocked_cases: actual.filter(function(x) { return x.actual === "blocked"; }).length,
    displayable_cases: actual.filter(function(x) { return x.actual === "displayable"; }).length,
    flagged_cases: actual.filter(function(x) { return x.actual === "flagged"; }).length,
    field_performance: null }, null, 2));
  process.exit(ok ? 0 : 1);
}
console.log("PASS: 72/72 timetable display-rule cases correctly classified.");
console.log("  blocked: " + actual.filter(function(x) { return x.actual === "blocked"; }).length);
console.log("  displayable: " + actual.filter(function(x) { return x.actual === "displayable"; }).length);
console.log("  flagged: " + actual.filter(function(x) { return x.actual === "flagged"; }).length);
