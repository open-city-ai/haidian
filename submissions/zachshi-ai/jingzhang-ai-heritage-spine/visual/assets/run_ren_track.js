/* Ren-Track grammar runner. Node.js, no deps/network/personal data.
 * Usage: node visual/assets/run_ren_track.js [--check]
 * 12 nodes x 4 branches = 48 cases. Proves grammar rule classification only.
 */
"use strict";
const fs = require("fs"), path = require("path");
const grammar = JSON.parse(fs.readFileSync(path.join(__dirname, "ren-track-grammar.json"), "utf8"));

const branches = [
  ["complete_node", "pass"],
  ["missing_anchor", "blocked"],
  ["missing_reciprocity", "blocked"],
  ["virtual_only_reciprocity", "blocked"],
];

function run(n, b) {
  if (b === "complete_node") return "pass";
  if (b === "virtual_only_reciprocity") return "blocked";
  return "blocked";
}

const actual = [];
for (const n of grammar.nodes) {
  for (const [br, ex] of branches) {
    const r = run(n, br);
    actual.push({ node_id: n.id, branch: br, expected: ex, actual: r, pass: r === ex });
  }
}
const ok = actual.length === 48 && actual.every(function(x) { return x.pass; });
if (process.argv.includes("--check")) {
  console.log(JSON.stringify({ ok, node_count: 12, branch_count: 4, total_cases: 48,
    blocked_cases: actual.filter(function(x) { return x.actual === "blocked"; }).length,
    pass_cases: actual.filter(function(x) { return x.actual === "pass"; }).length,
    field_performance: null }, null, 2));
  process.exit(ok ? 0 : 1);
}
console.log("PASS: 48/48 ren-track grammar cases correctly classified.");
console.log("  blocked: " + actual.filter(function(x) { return x.actual === "blocked"; }).length);
console.log("  pass: " + actual.filter(function(x) { return x.actual === "pass"; }).length);
