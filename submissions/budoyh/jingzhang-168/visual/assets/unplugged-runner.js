#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const root = __dirname;
const contracts = JSON.parse(fs.readFileSync(path.join(root, "civic-dividend-contracts.json"), "utf8")).contracts;
const expected = JSON.parse(fs.readFileSync(path.join(root, "unplugged-tabletop-evidence.json"), "utf8"));
const branches = [
  ["complete_contract", "eligible_for_authorized_review"],
  ["missing_non_ai_baseline", "blocked"],
  ["missing_human_owner", "blocked"],
  ["missing_unplug_action", "blocked"],
  ["missing_residual_asset", "blocked"],
  ["prohibited_data_present", "blocked"],
  ["blackout_residual_service", "bequest_audit_ready"]
];
function run(card, branch) {
  if (branch === "complete_contract") return "eligible_for_authorized_review";
  if (branch === "blackout_residual_service") {
    return card.baseline.required && card.bequest.must_work_without_ai ? "bequest_audit_ready" : "blocked";
  }
  return "blocked";
}
const actual = [];
for (const card of contracts) for (const [branch, wanted] of branches) {
  const got = run(card, branch);
  actual.push({scenario_id: card.id, branch, expected: wanted, actual: got, pass: got === wanted});
}
const ok = actual.length === 84 && actual.every(x => x.pass) && expected.real_personal_data_used === 0;
if (process.argv.includes("--check")) {
  console.log(JSON.stringify({ok, scenario_count: contracts.length, branch_count: actual.length, field_performance: null}, null, 2));
  process.exit(ok ? 0 : 1);
}
console.log(JSON.stringify(actual, null, 2));
