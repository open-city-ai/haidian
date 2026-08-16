#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const inputPath = path.resolve(process.argv[2] || path.join(__dirname, "gate-protocol.json"));
const outputPath = process.argv[3] ? path.resolve(process.argv[3]) : null;
const protocol = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const gates = Array.isArray(protocol.gate_records) ? protocol.gate_records : [];
const required = Array.isArray(protocol.required_gate_fields) ? protocol.required_gate_fields : [];

const issues = [];
const uniqueIds = new Set();
for (const gate of gates) {
  if (uniqueIds.has(gate.id)) issues.push(`duplicate gate id: ${gate.id}`);
  uniqueIds.add(gate.id);
  for (const field of required) {
    const value = gate[field];
    if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
      issues.push(`${gate.id || "unknown"}: missing ${field}`);
    }
  }
}

const coverage = (field) => gates.length === 0
  ? 0
  : gates.filter((gate) => {
      const value = gate[field];
      return value !== undefined && value !== null && value !== "" && (!Array.isArray(value) || value.length > 0);
    }).length / gates.length;

const forbidden = new Set(protocol.governance?.non_negotiables || []);
const requiredRules = [
  "no_biometric_identification",
  "no_individual_credit_scoring",
  "no_automated_admission_denial",
  "accessible_manual_service_always_available",
  "public_log_and_appeal_channel_required"
];
for (const rule of requiredRules) {
  if (!forbidden.has(rule)) issues.push(`missing governance rule: ${rule}`);
}

if (gates.length !== 12) issues.push(`expected 12 gate records, found ${gates.length}`);
if ((protocol.field_tests || []).length !== 3) issues.push("expected 3 field tests");
if ((protocol.implementation_projects || []).length !== 9) issues.push("expected 9 implementation projects");
if ((protocol.regional_routes || []).length !== 5) issues.push("expected 5 regional routes");
if ((protocol.annual_events || []).length !== 4) issues.push("expected 4 annual events");

const audit = {
  schema_version: "1.0.0",
  protocol_id: protocol.protocol_id,
  checked_input: path.basename(inputPath),
  status: issues.length === 0 ? "PASS" : "FAIL",
  generated_by: "verify-gate-protocol.js",
  deterministic: true,
  counts: {
    gate_records: gates.length,
    field_tests: (protocol.field_tests || []).length,
    implementation_projects: (protocol.implementation_projects || []).length,
    regional_routes: (protocol.regional_routes || []).length,
    annual_events: (protocol.annual_events || []).length
  },
  coverage: {
    human_authority: coverage("human_authority"),
    manual_fallback: coverage("manual_fallback"),
    minimum_data: coverage("minimum_data"),
    start_gates: coverage("start_gates"),
    stop_triggers: coverage("stop_triggers"),
    accountable_actor: coverage("accountable_actor"),
    exit_asset: coverage("exit_asset")
  },
  issues
};

const serialized = `${JSON.stringify(audit, null, 2)}\n`;
if (outputPath) fs.writeFileSync(outputPath, serialized, "utf8");
process.stdout.write(serialized);
process.exitCode = issues.length === 0 ? 0 : 1;
