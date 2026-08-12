#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const submissionRoot = path.resolve(__dirname, "../..");
const simulation = JSON.parse(fs.readFileSync(path.join(submissionRoot, "simulation.json"), "utf8"));
const context = {window: {}};
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, "closeout-review-data.js"), "utf8"),
  context
);

const records = context.window.CLOSEOUT_REVIEW_MODEL.records;
const recordIds = records.map((record) => record.id);
const requiredFields = simulation.receipt_contract.required_fields;
const missingFieldFixtures = simulation.tasks
  .filter((task) => task.missing_fields.length === 1)
  .map((task) => task.missing_fields[0]);
const bilingualKeys = ["label", "owner", "affected", "spatialConsequence", "fallback"];
const checks = {
  twelve_unique_records: recordIds.length === 12 && new Set(recordIds).size === 12,
  required_fields_in_order: JSON.stringify(recordIds) === JSON.stringify(requiredFields),
  negative_fixtures_in_order: JSON.stringify(recordIds) === JSON.stringify(missingFieldFixtures),
  twelve_unique_scenarios: new Set(records.map((record) => record.scenario)).size === 12,
  bilingual_decision_evidence: records.every((record) =>
    bilingualKeys.every((key) => record[key].zh && record[key].en)
  )
};

console.log(JSON.stringify({ok: Object.values(checks).every(Boolean), checks}, null, 2));
if (!Object.values(checks).every(Boolean)) process.exit(1);
