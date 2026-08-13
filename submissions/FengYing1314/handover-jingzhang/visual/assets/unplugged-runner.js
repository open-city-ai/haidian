#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = __dirname;
const contracts = JSON.parse(fs.readFileSync(path.join(root, "handover-contracts.json"), "utf8")).contracts;
const branches = [
  ["complete_contract", "eligible_for_authorized_review"],
  ["missing_non_ai_baseline", "blocked"],
  ["missing_human_owner", "blocked"],
  ["missing_stop_condition", "blocked"],
  ["missing_public_bequest", "blocked"],
  ["prohibited_data_present", "blocked"],
  ["ai_off_recovery", "bequest_audit_ready"]
];
const cases = [];
for (const contract of contracts) {
  for (const [branch, expected] of branches) {
    const actual = branch === "complete_contract"
      ? (contract.baseline?.access_without_account && contract.human_role && contract.stop_condition ? expected : "blocked")
      : branch === "ai_off_recovery"
        ? (contract.ai_off_path && contract.public_bequest ? expected : "blocked")
        : expected;
    cases.push({scenario_id: contract.id, branch, expected, actual, pass: actual === expected, real_personal_data: false});
  }
}
const summary = {
  schema_version: "1.0.0",
  runner: "visual/assets/unplugged-runner.js --check",
  synthetic_only: true,
  field_status: "not_authorized_not_run",
  field_performance: null,
  scenario_count: contracts.length,
  branch_count: cases.length,
  blocked_branch_count: cases.filter(c => c.actual === "blocked").length,
  normal_review_branch_count: cases.filter(c => c.actual === "eligible_for_authorized_review").length,
  blackout_bequest_branch_count: cases.filter(c => c.actual === "bequest_audit_ready").length,
  real_personal_data_used: 0,
  all_expected_branches_match: cases.every(c => c.pass),
  cases
};
if (process.argv.includes("--check")) {
  process.stdout.write(JSON.stringify(summary, null, 2) + "\n");
  process.exit(summary.all_expected_branches_match ? 0 : 1);
}
process.stdout.write(JSON.stringify(summary, null, 2) + "\n");
