#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.argv[2] ? path.resolve(process.argv[2]) : __dirname;
const registerPath = path.join(root, "pilot-readiness-register.json");
const cardsPath = path.join(root, "scenario-cards.json");
const gatesPath = path.join(root, "release-gate-ledger.json");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

const register = readJson(registerPath);
const cards = readJson(cardsPath);
const gates = readJson(gatesPath);
const failures = [];
const expectedFields = {
  baseline: "not_collected",
  sample_plan: "to_be_defined_by_authorized_evaluator",
  success_threshold: "freeze_before_authorization",
  stop_threshold: "freeze_before_authorization",
  human_fallback: "contracted_in_package",
  accountable_role: "to_be_confirmed",
  review_period: "to_be_defined_by_authorized_evaluator",
  deletion_proof: "required_before_exit",
};

function check(condition, message) {
  if (!condition) failures.push(message);
}

function recordFailures(record) {
  const problems = [];
  const localCheck = (condition, message) => {
    if (!condition) problems.push(message);
  };
  localCheck(gateIds.has(record.release_gate), `${record.scenario_id}: release gate must resolve`);
  localCheck(record.no_deployment_claim === true, `${record.scenario_id}: no_deployment_claim must stay true`);
  localCheck(typeof record.first_evidence_needed_zh === "string" && record.first_evidence_needed_zh.length >= 20, `${record.scenario_id}: first_evidence_needed_zh must describe the first evidence`);
  localCheck(typeof record.first_evidence_needed_en === "string" && record.first_evidence_needed_en.length >= 20, `${record.scenario_id}: first_evidence_needed_en must describe the first evidence`);
  localCheck(typeof record.first_evidence_owner_zh === "string" && record.first_evidence_owner_zh.includes("待授权"), `${record.scenario_id}: first_evidence_owner_zh must remain unconfirmed`);
  localCheck(typeof record.first_evidence_owner_en === "string" && record.first_evidence_owner_en.includes("To-be-authorized"), `${record.scenario_id}: first_evidence_owner_en must remain unconfirmed`);
  for (const [field, expected] of Object.entries(expectedFields)) {
    localCheck(record.readiness?.[field] === expected, `${record.scenario_id}: ${field} must be ${expected}`);
  }
  for (const field of Object.keys(expectedFields)) {
    localCheck(!Object.prototype.hasOwnProperty.call(record.readiness || {}, `${field}_value`), `${record.scenario_id}: ${field} must not carry a value`);
  }
  return problems;
}

const testCards = cards.cards.filter((card) => card.test_validation === true);
const testIds = testCards.map((card) => card.scenario_id).sort();
const records = Array.isArray(register.records) ? register.records : [];
const recordIds = records.map((record) => record.scenario_id).sort();
const gateIds = new Set((gates.releases || []).map((release) => release.release_id));

check(
  register.package_iteration === cards.package_iteration,
  `package_iteration must match scenario cards (${cards.package_iteration})`
);
check(register.status === "pre_authorization_contract_only", "register must remain pre-authorization");
check(register.field_evidence_boundary?.site_visit_status === "not_conducted", "site visit status must remain not_conducted");
check(register.field_evidence_boundary?.resident_validation_status === "not_conducted", "resident validation status must remain not_conducted");
check(register.field_evidence_boundary?.stakeholder_engagement_status === "not_conducted", "stakeholder engagement status must remain not_conducted");
check(register.field_evidence_boundary?.field_measurement_status === "not_collected", "field measurement status must remain not_collected");
check(Array.isArray(register.required_fields) && register.required_fields.length === 8, "eight readiness fields are required");
check(JSON.stringify(recordIds) === JSON.stringify(testIds), "records must cover exactly all test_validation scenario cards");

for (const record of records) {
  failures.push(...recordFailures(record));
}

const negativeMissing = JSON.parse(JSON.stringify(register));
delete negativeMissing.records[0].readiness.stop_threshold;
check(
  recordFailures(negativeMissing.records[0]).length > 0,
  "negative fixture with a missing stop threshold must fail"
);

const negativeNumeric = JSON.parse(JSON.stringify(register));
negativeNumeric.records[0].readiness.success_threshold = 0.95;
check(
  recordFailures(negativeNumeric.records[0]).length > 0,
  "negative fixture with a numeric success threshold must fail"
);

const negativeAuthorized = JSON.parse(JSON.stringify(register));
negativeAuthorized.records[0].readiness.accountable_role_value = "named_operator";
check(
  recordFailures(negativeAuthorized.records[0]).length > 0,
  "negative fixture with an injected accountable role value must fail"
);

const result = {
  ok: failures.length === 0,
  checks: {
    test_validation_cards: testIds.length,
    readiness_records: recordIds.length,
    required_fields: register.required_fields?.length || 0,
    field_evidence_boundary: register.field_evidence_boundary?.site_visit_status || "missing",
    negative_fixtures: 3,
  },
  failures,
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.ok ? 0 : 1;
