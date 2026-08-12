"use strict";

const fs = require("fs");
const path = require("path");

const here = __dirname;
const validPath = path.join(here, "relay-contracts.json");
const invalidPath = path.join(here, "relay-contract.expected-invalid.json");
const outputPath = path.join(here, "relay-contract.validation.json");

const expectedRelayTypes = [
  "tenure",
  "layout",
  "workspace",
  "service",
  "consent",
  "departure_return",
];
const forbiddenKeys = new Set([
  "score",
  "rank",
  "household_score",
  "personal_score",
  "eligibility_decision",
  "rent_decision",
  "allocation_decision",
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function walkForbidden(value, location, errors) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkForbidden(item, `${location}[${index}]`, errors));
    return;
  }
  if (!value || typeof value !== "object") return;
  Object.entries(value).forEach(([key, child]) => {
    if (forbiddenKeys.has(key)) errors.push(`${location}.${key}: forbidden decision or scoring field`);
    walkForbidden(child, `${location}.${key}`, errors);
  });
}

function requiredObject(value, keys, location, errors) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    errors.push(`${location}: expected object`);
    return;
  }
  keys.forEach((key) => {
    if (!(key in value)) errors.push(`${location}.${key}: missing`);
  });
}

function validateCollection(data) {
  const errors = [];
  if (!data || typeof data !== "object" || Array.isArray(data)) return ["root: expected object"];
  walkForbidden(data, "root", errors);

  if (data.version !== "1.2") errors.push("root.version: expected 1.2");
  if (!Array.isArray(data.states) || data.states.length !== 9) errors.push("root.states: expected exactly nine states");
  if (!Array.isArray(data.gates) || data.gates.length !== 3) errors.push("root.gates: expected exactly three gates");
  if (!Array.isArray(data.contracts) || data.contracts.length !== 6) errors.push("root.contracts: expected exactly six contracts");

  const stateIds = new Set((data.states || []).map((state) => state.id));
  (data.states || []).forEach((state, index) => {
    requiredObject(state, ["id", "label_zh", "label_en", "human_owner", "can_move_to"], `states[${index}]`, errors);
    if (!Array.isArray(state.can_move_to) || !state.can_move_to.length) errors.push(`states[${index}].can_move_to: expected routes`);
    (state.can_move_to || []).forEach((target) => {
      if (!stateIds.has(target)) errors.push(`states[${index}].can_move_to: unknown state ${target}`);
    });
  });

  const gateIds = (data.gates || []).map((gate) => gate.id).sort();
  if (gateIds.join(",") !== "G1,G2,G3") errors.push("root.gates: expected G1, G2 and G3");
  (data.gates || []).forEach((gate, index) => {
    requiredObject(gate, ["id", "label_zh", "label_en", "required_evidence", "block_if", "signer_roles"], `gates[${index}]`, errors);
    ["required_evidence", "block_if", "signer_roles"].forEach((field) => {
      if (!Array.isArray(gate[field]) || !gate[field].length) errors.push(`gates[${index}].${field}: expected entries`);
    });
  });

  const seenTypes = new Set();
  (data.contracts || []).forEach((contract, index) => {
    const location = `contracts[${index}]`;
    requiredObject(contract, [
      "contract_id", "relay_type", "actor", "input", "state", "consent", "ai_boundary",
      "fallback", "stop_rule", "success_evidence", "service_level", "status",
    ], location, errors);
    if (seenTypes.has(contract.relay_type)) errors.push(`${location}.relay_type: duplicate`);
    seenTypes.add(contract.relay_type);
    requiredObject(contract.actor, ["responsible_role", "accountable_role", "consulted_roles", "informed_roles"], `${location}.actor`, errors);
    requiredObject(contract.input, ["request", "minimum_data", "required_evidence", "prohibited_inputs"], `${location}.input`, errors);
    requiredObject(contract.state, ["entry", "target", "failure"], `${location}.state`, errors);
    requiredObject(contract.consent, ["required_parties", "withdrawal_path", "effect_of_withdrawal"], `${location}.consent`, errors);
    requiredObject(contract.ai_boundary, ["allowed", "forbidden", "human_decision"], `${location}.ai_boundary`, errors);
    requiredObject(contract.fallback, ["no_ai_route", "offline_route", "rollback_action", "receiving_role"], `${location}.fallback`, errors);
    requiredObject(contract.stop_rule, ["triggers", "stop_authority", "resume_evidence"], `${location}.stop_rule`, errors);
    requiredObject(contract.service_level, ["status", "formula", "clock_owner"], `${location}.service_level`, errors);
    [contract.state && contract.state.entry, contract.state && contract.state.target, contract.state && contract.state.failure].forEach((stateId) => {
      if (!stateIds.has(stateId)) errors.push(`${location}.state: unknown state ${stateId}`);
    });
    if (!contract.fallback || !contract.fallback.no_ai_route || !contract.fallback.offline_route) errors.push(`${location}.fallback: ordinary routes missing`);
    if (!contract.stop_rule || !Array.isArray(contract.stop_rule.triggers) || !contract.stop_rule.triggers.length) errors.push(`${location}.stop_rule: trigger missing`);
    if (!Array.isArray(contract.success_evidence) || contract.success_evidence.length < 2) errors.push(`${location}.success_evidence: expected at least two records`);
    if (contract.status !== "protocol_only_not_authorized_not_run") errors.push(`${location}.status: field operation may not be claimed`);
  });
  expectedRelayTypes.forEach((type) => {
    if (!seenTypes.has(type)) errors.push(`root.contracts: missing relay type ${type}`);
  });
  return errors;
}

const validData = readJson(validPath);
const invalidData = readJson(invalidPath);
const validErrors = validateCollection(validData);
const invalidErrors = validateCollection(invalidData);
const gateMetadataRegression = JSON.parse(JSON.stringify(validData));
delete gateMetadataRegression.gates[0].id;
delete gateMetadataRegression.gates[0].label_zh;
delete gateMetadataRegression.gates[0].label_en;
const gateMetadataErrors = validateCollection(gateMetadataRegression);
const expectedGateMetadataErrors = [
  "gates[0].id: missing",
  "gates[0].label_zh: missing",
  "gates[0].label_en: missing",
];
const gateMetadataRejected = expectedGateMetadataErrors.every((error) => gateMetadataErrors.includes(error));
const passed = validErrors.length === 0 && invalidErrors.length > 0 && gateMetadataRejected;
const output = {
  schema_version: "1.0",
  validation_scope: "offline structure, state-reference, fallback, stop-rule, negative-fixture and gate-metadata regression checks only",
  field_pilot_status: "not_authorized_not_run",
  result: passed ? "pass" : "fail",
  counts: {
    relay_contracts: Array.isArray(validData.contracts) ? validData.contracts.length : 0,
    states: Array.isArray(validData.states) ? validData.states.length : 0,
    gates: Array.isArray(validData.gates) ? validData.gates.length : 0,
    valid_fixture_errors: validErrors.length,
    expected_invalid_errors: invalidErrors.length,
    gate_metadata_regression_errors: gateMetadataErrors.length,
  },
  checks: [
    {id: "valid-fixture", passed: validErrors.length === 0, errors: validErrors},
    {id: "negative-fixture", passed: invalidErrors.length > 0, errors: invalidErrors},
    {id: "gate-metadata-regression", passed: gateMetadataRejected, errors: gateMetadataErrors},
  ],
  limitation: "A passing result validates the submitted protocol structure. It does not establish service quality, legal authority, spatial feasibility, housing availability, affordability, capacity, or public acceptance.",
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
if (!passed) {
  process.stderr.write(`${JSON.stringify(output, null, 2)}\n`);
  process.exit(1);
}
process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
