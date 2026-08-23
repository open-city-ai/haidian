"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const base = __dirname;
const inputPath = path.join(base, "spatial-decision.json");
const auditPath = path.join(base, "spatial-decision-audit.json");
const data = JSON.parse(fs.readFileSync(inputPath, "utf8"));

function evaluate(value, operator, threshold) {
  if (operator === ">=") return value >= threshold;
  if (operator === "<=") return value <= threshold;
  if (operator === "==") return value === threshold;
  throw new Error(`Unsupported operator: ${operator}`);
}

const alternatives = data.alternatives.map((alternative) => {
  const gates = data.hard_gates.map((gate) => ({
    gate_id: gate.id,
    pass: evaluate(alternative[gate.field], gate.operator, gate.threshold),
  }));
  const failed = gates.filter((gate) => !gate.pass).map((gate) => gate.gate_id);
  const decision = failed.length === 0 ? "advance" : failed.length <= 2 ? "revise" : "reject";
  return {
    id: alternative.id,
    decision,
    expected_decision: alternative.expected_decision,
    passed_gate_count: gates.length - failed.length,
    failed_gate_ids: failed,
    gates,
  };
});

const checks = {
  schema_version_present: typeof data.schema_version === "string",
  hard_gate_count_is_five: data.hard_gates.length === 5,
  alternative_count_is_three: data.alternatives.length === 3,
  expected_decisions_match: alternatives.every((item) => item.decision === item.expected_decision),
  exactly_one_advanced: alternatives.filter((item) => item.decision === "advance").length === 1,
  first_100_days_has_five_packages: data.first_100_days.length === 5,
  no_field_result_claimed: Array.isArray(data.field_results) && data.field_results.length === 0,
};

const audit = {
  audit_version: "1.0.0",
  decision_id: data.decision_id,
  deterministic: true,
  status: Object.values(checks).every(Boolean) ? "PASS" : "FAIL",
  checks,
  alternatives,
  counts: {
    hard_gates: data.hard_gates.length,
    alternatives: data.alternatives.length,
    rejected: alternatives.filter((item) => item.decision === "reject").length,
    revised: alternatives.filter((item) => item.decision === "revise").length,
    advanced: alternatives.filter((item) => item.decision === "advance").length,
    first_100_days_work_packages: data.first_100_days.length,
    field_results: data.field_results.length,
  },
  input_sha256: crypto.createHash("sha256").update(fs.readFileSync(inputPath)).digest("hex"),
};

if (process.argv.includes("--write")) {
  fs.writeFileSync(auditPath, `${JSON.stringify(audit, null, 2)}\n`, "utf8");
}

process.stdout.write(`${JSON.stringify(audit, null, 2)}\n`);
process.exitCode = audit.status === "PASS" ? 0 : 1;
