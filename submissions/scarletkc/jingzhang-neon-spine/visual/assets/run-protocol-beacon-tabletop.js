"use strict";
const fs = require("node:fs");
const path = require("node:path");

const assetDir = __dirname;
const fixturePath = path.join(assetDir, "protocol-beacon-passport.fixture.json");
const evidencePath = path.join(assetDir, "protocol-beacon-tabletop-evidence.json");
const base = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));

function evaluate(passport) {
  const reasons = [];
  if (!String(passport.accountability.accountable_role || "").trim()) reasons.push("accountable_role_missing");
  if (!passport.accountability.human_checkpoint) reasons.push("human_checkpoint_missing");
  if (!passport.service.accessible_route_verified) reasons.push("accessible_route_unverified");
  if (!passport.rights.equivalent_service) reasons.push("equivalent_no_app_service_missing");
  if (passport.data.consent_status === "withdrawn" && passport.data.raw_feedback_records > 0) reasons.push("withdrawn_consent_has_raw_records");
  if (passport.data.personal_data_default !== false || passport.data.biometrics_default !== false) reasons.push("default_personal_or_biometric_data_enabled");
  if (passport.provenance.source_integrity !== "verified") reasons.push("source_integrity_unverified");
  return {decision: reasons.length ? "stop" : "admit", reasons};
}

function result(fixtureId, passport, expectedDecision, rollback) {
  const observed = evaluate(passport);
  return {
    fixture_id: fixtureId,
    expected_decision: expectedDecision,
    observed_decision: observed.decision,
    reasons: observed.reasons,
    expectation_passed: observed.decision === expectedDecision,
    rollback,
  };
}

function runTabletop() {
  const inaccessible = clone(base);
  inaccessible.service.accessible_route_verified = false;

  const withdrawn = clone(base);
  withdrawn.data.consent_status = "withdrawn";
  withdrawn.data.raw_feedback_records = 4;

  const tampered = clone(base);
  tampered.provenance.source_integrity = "tampered";
  tampered.accountability.accountable_role = "";

  const results = [
    result("F0-NO-APP-BASELINE", base, "admit", {required: false}),
    result("F1-ACCESSIBLE-ROUTE-BLOCKED", inaccessible, "stop", {required: true, action: "restore_accessible_non_ai_route_before_retest"}),
    result("F2-CONSENT-WITHDRAWN-WITH-RAW-DATA", withdrawn, "stop", {required: true, action: "delete_raw_feedback_records", records_before: 4, records_after: 0}),
    result("F3-SOURCE-TAMPERED-AND-OWNER-ABSENT", tampered, "stop", {required: true, action: "restore_verified_source_and_assign_accountable_role"}),
  ];
  return {
    schema_version: "1.0",
    contract_id: "PROTOCOL-BEACON-100X100",
    evidence_type: "local_synthetic_tabletop",
    operational_status: "not_authorized_not_run",
    input_fixture: "protocol-beacon-passport.fixture.json",
    runner: "run-protocol-beacon-tabletop.js --check",
    total_fixtures: results.length,
    passing_expectations: results.filter((item) => item.expectation_passed).length,
    negative_fixtures: results.filter((item) => item.expected_decision === "stop").length,
    negative_fail_closed: results.filter((item) => item.expected_decision === "stop" && item.observed_decision === "stop").length,
    all_expectations_pass: results.every((item) => item.expectation_passed),
    results,
  };
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

const actual = runTabletop();
if (process.argv.includes("--check")) {
  const expected = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
  if (JSON.stringify(stable(actual)) !== JSON.stringify(stable(expected))) {
    console.error("FAIL: committed tabletop evidence does not match deterministic replay");
    process.exit(1);
  }
  console.log("PASS: 4/4 synthetic fixtures matched; 3/3 negative fixtures failed closed; operational_status=not_authorized_not_run");
} else {
  process.stdout.write(JSON.stringify(actual, null, 2) + "\n");
}
