"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;
const PACKAGE_ID = "T1-PUBLIC-SERVICE-TABLETOP";
const FIELD_STATE = "not_authorized_not_run";
const EXPECTED_SCENARIOS = ["S06", "S08", "S09", "S10"];
const EXPECTED_FAIL_CODES = [
  "CONSENT_MISSING",
  "MINOR_GUARDIAN_REQUIRED",
  "HUMAN_HANDOFF_UNAVAILABLE",
  "ACCESSIBLE_CHANNEL_MISSING",
  "HIGH_IMPACT_AUTO_ACTION",
  "DATA_MINIMIZATION_EXCEEDED",
  "RETENTION_UNBOUNDED",
  "APPEAL_ROUTE_MISSING",
  "EMERGENCY_ESCALATION_MISSING",
  "BILINGUAL_PARITY_MISSING"
];

function load(name) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, name), "utf8"));
}

function sameArray(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function sameSet(a, b) {
  return a.length === b.length && a.every((value) => b.includes(value));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function evaluate(testCase, maximumRetentionDays) {
  const input = testCase.input;
  const failures = [];

  if (!input.consent) {
    failures.push("CONSENT_MISSING");
  }
  if (input.user_age < 18 && input.guardian_consent !== true) {
    failures.push("MINOR_GUARDIAN_REQUIRED");
  }
  if (input.human_handoff_requested && !input.human_handoff_available) {
    failures.push("HUMAN_HANDOFF_UNAVAILABLE");
  }
  if (!input.available_channels.includes(input.requested_channel)) {
    failures.push("ACCESSIBLE_CHANNEL_MISSING");
  }
  if (input.action_class === "high_impact" && input.auto_execute) {
    failures.push("HIGH_IMPACT_AUTO_ACTION");
  }
  if (input.data_fields_requested.some((field) => !input.allowed_data_fields.includes(field))) {
    failures.push("DATA_MINIMIZATION_EXCEEDED");
  }
  if (input.retention_days === null || input.retention_days > maximumRetentionDays) {
    failures.push("RETENTION_UNBOUNDED");
  }
  if (!input.appeal_route) {
    failures.push("APPEAL_ROUTE_MISSING");
  }
  if (input.emergency_signal && !input.emergency_escalation) {
    failures.push("EMERGENCY_ESCALATION_MISSING");
  }
  if (input.languages_required.some((language) => !input.languages_available.includes(language))) {
    failures.push("BILINGUAL_PARITY_MISSING");
  }

  return {
    pass: failures.length === 0,
    decision: failures.length === 0 ? "allow_tabletop_path" : "block_and_handoff",
    fail_codes: failures
  };
}

function checkStatus(document, name) {
  assert(document.status.field_state === FIELD_STATE, name + " field_state must remain not_authorized_not_run");
  assert(document.status.tabletop_state === "contract_check_only", name + " must remain a tabletop check");
  assert(document.status.performance_results === null, name + " performance_results must be null");
  assert(document.status.receipt_semantics === "expected_output_only", name + " receipts must be expected only");
}

function checkContract(contract) {
  assert(contract.document_type === "trial_contract", "Unexpected contract document_type");
  assert(contract.package_id === PACKAGE_ID, "Unexpected contract package_id");
  checkStatus(contract, "contract");
  assert(contract.scope.field_location === null, "A field location must not be claimed");
  assert(sameArray(contract.scope.scenarios, EXPECTED_SCENARIOS), "Contract scenarios must be S06/S08/S09/S10");
  assert(sameSet(contract.scenario_registry.map((item) => item.id), EXPECTED_SCENARIOS), "Scenario registry is incomplete");
  assert(contract.raci.length >= 5, "RACI must cover at least five workstreams");
  assert(contract.raci.every((item) => item.assignment_state === "role_placeholder_pending_authorization"), "RACI roles must remain placeholders");
  assert(contract.authorizations.length >= 6, "Authorization register is incomplete");
  assert(contract.authorizations.every((item) => item.state === "not_obtained"), "No authorization may be implied");
  assert(contract.budget.funding_state === "unfunded_unapproved", "Budget must remain unfunded and unapproved");
  assert(contract.budget.estimate_state === "not_estimated", "Budget amount must remain unestimated");
  assert(contract.budget.currency === null && contract.budget.total === null, "Budget amount and currency must remain null");
  const expectedBudgetCategories = [
    "human_staffing", "accessibility_qa", "privacy_security", "bilingual_qa",
    "temporary_setup", "operations_maintenance", "rollback_reserve",
  ];
  assert(sameSet(contract.budget.categories.map((item) => item.category), expectedBudgetCategories), "Budget resource categories are incomplete");
  assert(contract.budget.categories.every((item) => item.basis.zh && item.basis.en), "Budget resource categories must be bilingual");

  const registeredCodes = contract.fail_code_registry.map((item) => item.code);
  assert(sameSet(registeredCodes, EXPECTED_FAIL_CODES), "Fail-code registry must contain all ten specified codes");
  assert(contract.service_contract.maximum_retention_days === 30, "Maximum retention must be explicit");
  assert(contract.stop_rollback_retirement.safe_state === "human_and_non_digital_channels_only", "Safe state must retain human and non-digital service");
  assert(contract.evidence_limits.does_not_prove.length >= 6, "Evidence limitations are incomplete");
}

function checkFixtures(positive, negative, contract) {
  checkStatus(positive, "positive fixtures");
  checkStatus(negative, "negative fixtures");
  assert(positive.polarity === "positive", "Positive fixture polarity mismatch");
  assert(negative.polarity === "negative", "Negative fixture polarity mismatch");
  assert(positive.cases.length === 4, "Exactly four positive cases are required");
  assert(sameSet(positive.cases.map((item) => item.scenario_id), EXPECTED_SCENARIOS), "Positive fixtures must cover S06/S08/S09/S10");
  assert(negative.cases.length >= 8, "At least eight negative cases are required");

  const declaredNegativeCodes = [];
  const results = [];
  for (const testCase of positive.cases.concat(negative.cases)) {
    const actual = evaluate(testCase, contract.service_contract.maximum_retention_days);
    const expected = testCase.expected;
    const match = actual.pass === expected.pass &&
      actual.decision === expected.decision &&
      sameArray(actual.fail_codes, expected.fail_codes);
    assert(match, testCase.id + " mismatch: expected " + JSON.stringify(expected) + " but received " + JSON.stringify(actual));
    if (!expected.pass) {
      declaredNegativeCodes.push(...expected.fail_codes);
    }
    results.push({
      id: testCase.id,
      scenario_id: testCase.scenario_id,
      pass_expected: expected.pass,
      contract_match: true,
      fail_codes: actual.fail_codes
    });
  }
  assert(sameSet(Array.from(new Set(declaredNegativeCodes)), EXPECTED_FAIL_CODES), "Negative fixtures must cover all ten specified fail codes");
  return results;
}

function checkReceipt(receipt, positive) {
  assert(receipt.document_type === "expected_receipt", "Unexpected receipt document_type");
  assert(receipt.package_id === PACKAGE_ID, "Unexpected receipt package_id");
  assert(receipt.expected_output === true, "Receipt must be marked expected_output");
  assert(receipt.run_status === FIELD_STATE, "Receipt must not imply a field run");
  assert(receipt.performance_results === null, "Receipt performance_results must be null");
  const sourceCase = positive.cases.find((item) => item.id === receipt.fixture_id);
  assert(sourceCase, "Receipt source fixture does not exist");
  assert(receipt.scenario_id === sourceCase.scenario_id, "Receipt scenario does not match source fixture");
  assert(receipt.decision === sourceCase.expected.decision, "Receipt decision does not match source fixture");
  assert(sameArray(receipt.fail_codes, sourceCase.expected.fail_codes), "Receipt fail_codes do not match source fixture");
  assert(sameArray(receipt.data_handling.fields, sourceCase.input.data_fields_requested), "Receipt fields do not match source fixture");
  assert(receipt.data_handling.retention_days === sourceCase.input.retention_days, "Receipt retention does not match source fixture");
  assert(receipt.human_route.available && receipt.human_route.appeal_available, "Receipt must retain human and appeal routes");
}

function checkQa(qa) {
  assert(qa.document_type === "rights_bilingual_qa", "Unexpected QA document_type");
  assert(qa.package_id === PACKAGE_ID, "Unexpected QA package_id");
  checkStatus(qa, "rights and bilingual QA");
  assert(qa.rights_ledger.length >= 6, "Rights ledger is incomplete");
  assert(qa.rights_ledger.every((item) => item.review_state === "cleared_for_submission"), "A rights item is not cleared");
  assert(qa.rights_ledger.every((item) => item.third_party_content === false), "Third-party content must be explicitly reviewed before inclusion");
  assert(qa.bilingual_qa.length >= 4, "Bilingual QA is incomplete");
  assert(qa.accessibility_qa.some((item) => item.result === "manual_review_required"), "Field accessibility limits must remain visible");
}

function runCheck() {
  const contract = load("contract.json");
  const positive = load("fixtures.positive.json");
  const negative = load("fixtures.negative.json");
  const receipt = load("receipt.example.json");
  const qa = load("rights-bilingual-qa.json");

  checkContract(contract);
  const fixtureResults = checkFixtures(positive, negative, contract);
  checkReceipt(receipt, positive);
  checkQa(qa);

  return {
    ok: true,
    package_id: PACKAGE_ID,
    field_state: FIELD_STATE,
    performance_results: null,
    execution_mode: "read_only_tabletop_contract_check",
    files_checked: 5,
    fixture_summary: {
      positive: positive.cases.length,
      negative: negative.cases.length,
      total: fixtureResults.length,
      specified_fail_codes_covered: EXPECTED_FAIL_CODES.length,
      contract_matches: fixtureResults.filter((item) => item.contract_match).length
    },
    claims: {
      real_users_contacted: false,
      field_site_authorized: false,
      field_trial_run: false,
      performance_measured: false,
      receipt_is_expected_output_only: true
    }
  };
}

function main() {
  const args = process.argv.slice(2);
  if (!sameArray(args, ["--check"])) {
    process.stdout.write("Usage: node run.js --check\n");
    process.exitCode = args.length === 0 ? 0 : 2;
    return;
  }

  try {
    process.stdout.write(JSON.stringify(runCheck(), null, 2) + "\n");
  } catch (error) {
    process.stderr.write(JSON.stringify({ ok: false, error: error.message }, null, 2) + "\n");
    process.exitCode = 1;
  }
}

main();
