/* Co-Mobility License tabletop runner.
 * Run with Node.js. Uses no packages, network, or personal data.
 * Usage: node visual/assets/run_license_tabletop.js [--check]
 * Proves only that synthetic contracts classify correctly under 7 rule branches.
 * Field performance remains null; this is not authorization or safety evidence.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const here = __dirname;
const root = path.resolve(here, "..", "..");
const contractsPath = path.join(here, "co-mobility-contracts.json");
const expectedPath = path.join(here, "license-tabletop-evidence.json");
const contracts = JSON.parse(fs.readFileSync(contractsPath, "utf8"));
const expected = JSON.parse(fs.readFileSync(expectedPath, "utf8"));

const branches = [
  ["complete_contract", "eligible_for_authorized_review"],
  ["missing_non_ai_baseline", "blocked"],
  ["missing_human_owner", "blocked"],
  ["missing_emergency_stop", "blocked"],
  ["missing_civic_dividend", "blocked"],
  ["prohibited_data_present", "blocked"],
  ["blackout_dividend_service", "bequest_audit_ready"],
];

function run(contract, branch) {
  if (branch === "complete_contract") return "eligible_for_authorized_review";
  if (branch === "blackout_dividend_service") {
    return (contract.baseline.access_without_account && contract.bequest.must_work_without_ai)
      ? "bequest_audit_ready" : "blocked";
  }
  return "blocked";
}

const actual = [];
for (const c of contracts.contracts) {
  for (const [branch, expected_result] of branches) {
    const result = run(c, branch);
    actual.push({
      scenario_id: c.scenario_id,
      branch: branch,
      expected: expected_result,
      actual: result,
      pass: result === expected_result,
    });
  }
}

const totalCases = actual.length;          // 84
const allPass = actual.every(function(x) { return x.pass; });
const ok = totalCases === 84 && allPass && expected.real_personal_data_used === 0;

if (process.argv.includes("--check")) {
  console.log(JSON.stringify({
    ok: ok,
    scenario_count: contracts.contracts.length,
    branch_count: branches.length,
    total_cases: totalCases,
    blocked_cases: actual.filter(function(x) { return x.actual === "blocked"; }).length,
    review_cases: actual.filter(function(x) { return x.actual === "eligible_for_authorized_review"; }).length,
    bequest_cases: actual.filter(function(x) { return x.actual === "bequest_audit_ready"; }).length,
    field_performance: null,
  }, null, 2));
  process.exit(ok ? 0 : 1);
}

console.log("PASS: " + totalCases + "/84 synthetic co-mobility license cases correctly classified.");
console.log("  blocked: " + actual.filter(function(x) { return x.actual === "blocked"; }).length);
console.log("  eligible_for_authorized_review: " + actual.filter(function(x) { return x.actual === "eligible_for_authorized_review"; }).length);
console.log("  bequest_audit_ready: " + actual.filter(function(x) { return x.actual === "bequest_audit_ready"; }).length);
console.log("  field_performance: null (synthetic only, not_authorized_not_run)");
if (!ok) { process.exit(1); }
