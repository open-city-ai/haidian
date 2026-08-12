#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = __dirname;
const passports = JSON.parse(fs.readFileSync(path.join(root, "acceptance-passports.json"), "utf8"));
const tabletop = JSON.parse(fs.readFileSync(path.join(root, "acceptance-tabletop.json"), "utf8"));

if (passports.status !== "concept_not_authorized_not_run") {
  throw new Error("Passport status must stay concept_not_authorized_not_run.");
}
if (tabletop.status !== "synthetic_tabletop_only_not_authorized_not_field_run") {
  throw new Error("Tabletop status must stay synthetic and not field-run.");
}

const ids = new Set(passports.passports.map((item) => item.scenario_id));
if (ids.size !== 12) throw new Error(`Expected 12 unique passports, got ${ids.size}.`);

const decide = (item) =>
  item.purpose_visible &&
  item.accountable_owner_named &&
  item.human_takeover_rehearsed &&
  item.exit_rehearsed &&
  item.red_lines_pass
    ? "eligible_for_time_limited_public_acceptance"
    : "blocked_restore_no_ai_baseline";

let passed = 0;
for (const item of tabletop.test_cases) {
  if (!ids.has(item.scenario_id)) throw new Error(`Unknown scenario ${item.scenario_id}.`);
  const actual = decide(item);
  if (actual !== item.expected) {
    throw new Error(`${item.test_id}: expected ${item.expected}, got ${actual}.`);
  }
  passed += 1;
}

const positives = tabletop.test_cases.filter((item) => item.test_id.startsWith("T")).length;
const negatives = tabletop.test_cases.filter((item) => item.test_id.startsWith("N")).length;
process.stdout.write(JSON.stringify({
  result: "PASS",
  mode: "read_only_zero_network_synthetic_tabletop",
  passports: ids.size,
  tests_passed: passed,
  positive_paths: positives,
  blocked_negative_paths: negatives,
  field_performance: null,
  deployment_decision: "not_authorized_not_run"
}, null, 2) + "\n");
