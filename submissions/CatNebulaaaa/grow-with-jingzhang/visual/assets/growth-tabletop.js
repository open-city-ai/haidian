#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const runbook = JSON.parse(fs.readFileSync(path.join(root, "growth-runbook.json"), "utf8"));

const rules = {
  R1_OWNER: (service) => Boolean(String(service.owner || "").trim()),
  R2_EQUAL_SERVICE: (service) => Boolean(String(service.non_digital_equivalent || "").trim()),
  R3_MINIMUM_DATA: (service) => service.personal_data === false,
  R4_NO_BIOMETRIC: (service) => service.biometric_identification === false,
  R5_TAKEOVER: (service) => Boolean(String(service.human_takeover || "").trim()),
  R6_STOP_AUTHORITY: (service) => Boolean(String(service.stop_authority || "").trim()),
  R7_NOTICE: (service) => service.public_notice === true,
  R8_RECEIPT: (service) => Array.isArray(service.evidence_receipt) && service.evidence_receipt.length >= 2,
};

const failures = (service) => Object.entries(rules)
  .filter(([, check]) => !check(service))
  .map(([rule]) => rule);

const serviceResults = runbook.services.map((service) => ({
  id: service.id,
  failures: failures(service),
}));
const mutationResults = runbook.negative_cases.map((testCase) => {
  const caughtBy = failures(testCase);
  return {
    case_id: testCase.id,
    must_violate: testCase.must_violate,
    caught_by: caughtBy,
    caught_by_expected_rule: caughtBy.includes(testCase.must_violate),
    rejected: caughtBy.length > 0,
  };
});
const exercised = Object.fromEntries(Object.keys(rules).map((rule) => [rule, false]));
for (const result of mutationResults) {
  for (const rule of result.caught_by) exercised[rule] = true;
}

const report = {
  schema_version: "1.0.0",
  protocol: runbook.protocol,
  status: "tabletop_only_not_authorized_not_run",
  services_total: runbook.services.length,
  services_passed: serviceResults.filter((item) => item.failures.length === 0).length,
  services_failed: serviceResults.filter((item) => item.failures.length > 0),
  negative_cases_total: runbook.negative_cases.length,
  negative_cases_caught: mutationResults.filter((item) => item.caught_by_expected_rule).length,
  mutation_results: mutationResults,
  dead_rules: Object.entries(exercised).filter(([, live]) => !live).map(([rule]) => rule),
  proof_boundary_zh: "本报告仅证明方案协议的字段和拦截规则可复算，不证明项目已获批准、场地安全、服务质量或公众接受度。",
};
report.ok = report.services_total === 12
  && report.services_failed.length === 0
  && report.negative_cases_caught === report.negative_cases_total
  && report.dead_rules.length === 0;

fs.writeFileSync(
  path.join(root, "growth-tabletop-evidence.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
process.exitCode = report.ok ? 0 : 1;
