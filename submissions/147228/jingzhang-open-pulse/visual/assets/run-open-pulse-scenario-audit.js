#!/usr/bin/env node
/**
 * Replays the Open Pulse scenario/operation handoff contract from bundled JSON.
 * This is a local structural audit only: it does not contact a participant,
 * call a service, validate a field condition, or authorize a pilot.
 */

"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const HERE = __dirname;
const SCENARIO_PATH = path.join(HERE, "scenario-operation-matrix.json");
const OPERATIONS_PATH = path.join(HERE, "operations-matrix.json");
const EVIDENCE_PATH = path.join(HERE, "open-pulse-scenario-audit.json");

const SCENARIO_IDS = Array.from({length: 14}, (_, index) => `S${String(index + 1).padStart(2, "0")}`);
const OPERATION_IDS = Array.from({length: 8}, (_, index) => `OP-${String(index + 1).padStart(2, "0")}`);
const MATRIX_SCHEMA_VERSION = "1.0.0";
const RACI_ROLES = ["responsible", "accountable", "consulted", "informed"];
const EXPECTED_COMMON_GATES = [
  "no digital precondition",
  "human review cannot be removed",
  "accessible route remains continuous",
  "public status and complaint path",
  "stop and rollback are tested",
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function nonEmpty(value) {
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0 && value.every(nonEmpty);
  return value !== null && value !== undefined;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function evaluateScenario(row) {
  const checks = [
    {id: "identity", pass: /^S\d{2}$/.test(row.scenario_id) && nonEmpty(row.name_zh)},
    {id: "spatial_trigger", pass: nonEmpty(row.spatial_carrier) && nonEmpty(row.trigger)},
    {id: "minimum_data_sla", pass: nonEmpty(row.minimum_data) && nonEmpty(row.sla)},
    {id: "raci_roles", pass: row.raci && RACI_ROLES.every((role) => nonEmpty(row.raci[role]))},
    {id: "public_fallback", pass: nonEmpty(row.non_ai_equivalent)},
    {id: "stop_and_success", pass: nonEmpty(row.stop_condition) && nonEmpty(row.success_metric)},
    {id: "phase_and_status", pass: nonEmpty(row.phase) && row.status === "conceptual_suggestion"},
    {id: "provisional_boundary", pass: nonEmpty(row.provisional_boundary_note)},
  ];
  return {
    id: row.scenario_id || "(missing)",
    status: checks.every((item) => item.pass) ? "pass" : "fail",
    failed_checks: checks.filter((item) => !item.pass).map((item) => item.id),
  };
}

function evaluateOperation(row) {
  const checks = [
    {id: "identity", pass: /^OP-\d{2}$/.test(row.action_id) && nonEmpty(row.name_zh)},
    {id: "accountability", pass: nonEmpty(row.responsible) && nonEmpty(row.accountable) && nonEmpty(row.consulted)},
    {id: "deliverables_dependencies", pass: nonEmpty(row.deliverables) && nonEmpty(row.dependencies)},
    {id: "acceptance_and_stop", pass: nonEmpty(row.acceptance_test) && nonEmpty(row.stop_condition)},
    {id: "maintenance", pass: nonEmpty(row.maintenance)},
    {id: "phase_cost_status", pass: nonEmpty(row.phase) && ["low", "medium", "high"].includes(row.cost_band) && row.status === "conceptual_suggestion"},
  ];
  return {
    id: row.action_id || "(missing)",
    status: checks.every((item) => item.pass) ? "pass" : "fail",
    failed_checks: checks.filter((item) => !item.pass).map((item) => item.id),
  };
}

function check(id, pass, observed, expected) {
  return {id, status: pass ? "pass" : "fail", observed, expected};
}

function buildEvidence() {
  const scenarioMatrix = readJson(SCENARIO_PATH);
  const operationsMatrix = readJson(OPERATIONS_PATH);
  const scenarioRows = Array.isArray(scenarioMatrix.rows) ? scenarioMatrix.rows : [];
  const operationRows = Array.isArray(operationsMatrix.packages) ? operationsMatrix.packages : [];
  const scenarioResults = scenarioRows.map(evaluateScenario);
  const operationResults = operationRows.map(evaluateOperation);
  const scenarioIds = scenarioRows.map((row) => row.scenario_id);
  const operationIds = operationRows.map((row) => row.action_id);

  const malformedScenario = clone(scenarioRows[0] || {});
  malformedScenario.raci = {...(malformedScenario.raci || {}), accountable: ""};
  const malformedFallback = clone(scenarioRows[0] || {});
  malformedFallback.non_ai_equivalent = "";
  malformedFallback.stop_condition = "";
  const malformedOperation = clone(operationRows[0] || {});
  malformedOperation.stop_condition = "";
  const negativeFixtureResults = [
    {
      id: "NEG-S01-MISSING-ACCOUNTABLE",
      mutation: "clear scenario RACI accountable",
      expected_failed_checks: ["raci_roles"],
      observed: evaluateScenario(malformedScenario),
    },
    {
      id: "NEG-S01-MISSING-FALLBACK-STOP",
      mutation: "clear non-AI equivalent and stop condition",
      expected_failed_checks: ["public_fallback", "stop_and_success"],
      observed: evaluateScenario(malformedFallback),
    },
    {
      id: "NEG-OP01-MISSING-STOP",
      mutation: "clear operation stop condition",
      expected_failed_checks: ["acceptance_and_stop"],
      observed: evaluateOperation(malformedOperation),
    },
  ].map((fixture) => ({
    ...fixture,
    status: fixture.observed.status === "fail"
      && JSON.stringify(fixture.observed.failed_checks) === JSON.stringify(fixture.expected_failed_checks)
      ? "pass"
      : "fail",
  }));

  const checks = [
    check(
      "scenario_matrix_shape",
      scenarioMatrix.schema_version === MATRIX_SCHEMA_VERSION && scenarioRows.length === SCENARIO_IDS.length,
      {schema_version: scenarioMatrix.schema_version, rows: scenarioRows.length},
      {schema_version: MATRIX_SCHEMA_VERSION, rows: SCENARIO_IDS.length}
    ),
    check(
      "scenario_ids_and_order",
      JSON.stringify(scenarioIds) === JSON.stringify(SCENARIO_IDS),
      scenarioIds,
      SCENARIO_IDS
    ),
    check(
      "scenario_contract_fields",
      scenarioResults.length === SCENARIO_IDS.length && scenarioResults.every((item) => item.status === "pass"),
      {pass: scenarioResults.filter((item) => item.status === "pass").length, total: scenarioResults.length},
      {pass: SCENARIO_IDS.length, total: SCENARIO_IDS.length}
    ),
    check(
      "common_gates",
      JSON.stringify(scenarioMatrix.common_gates) === JSON.stringify(EXPECTED_COMMON_GATES),
      scenarioMatrix.common_gates,
      EXPECTED_COMMON_GATES
    ),
    check(
      "operations_matrix_shape",
      operationsMatrix.schema_version === MATRIX_SCHEMA_VERSION && operationRows.length === OPERATION_IDS.length,
      {schema_version: operationsMatrix.schema_version, packages: operationRows.length},
      {schema_version: MATRIX_SCHEMA_VERSION, packages: OPERATION_IDS.length}
    ),
    check(
      "operation_ids_and_order",
      JSON.stringify(operationIds) === JSON.stringify(OPERATION_IDS),
      operationIds,
      OPERATION_IDS
    ),
    check(
      "operation_contract_fields",
      operationResults.length === OPERATION_IDS.length && operationResults.every((item) => item.status === "pass"),
      {pass: operationResults.filter((item) => item.status === "pass").length, total: operationResults.length},
      {pass: OPERATION_IDS.length, total: OPERATION_IDS.length}
    ),
    check(
      "negative_fixtures_rejected",
      negativeFixtureResults.length === 3 && negativeFixtureResults.every((item) => item.status === "pass"),
      negativeFixtureResults.map((item) => ({id: item.id, status: item.status, failed_checks: item.observed.failed_checks})),
      "all three malformed contracts must be rejected"
    ),
  ];

  const pass = checks.every((item) => item.status === "pass");
  return {
    schema_version: "0.1.0",
    audit_id: "OPEN-PULSE-SCENARIO-AUDIT-001",
    runner: "run-open-pulse-scenario-audit.js",
    claim_level: "local_structural_audit",
    status: pass ? "PASS" : "FAIL",
    operational_status: "not_authorized_not_run",
    gate_effect: "none; this audit does not authorize construction, public opening, procurement or deployment",
    reproduce: "node visual/assets/run-open-pulse-scenario-audit.js --check",
    inputs: {
      scenario_matrix: {
        path: "visual/assets/scenario-operation-matrix.json",
        sha256: sha256(SCENARIO_PATH),
      },
      operations_matrix: {
        path: "visual/assets/operations-matrix.json",
        sha256: sha256(OPERATIONS_PATH),
      },
      network_calls: 0,
      participant_contact: "none",
      external_systems: "none",
    },
    checks,
    scenario_rows: scenarioResults,
    operation_packages: operationResults,
    negative_fixture_results: negativeFixtureResults,
    not_proven: [
      "field accessibility, safety, comfort or drainage performance",
      "real operator capacity, service-level performance or public acceptance",
      "legal compliance, procurement, insurance or construction approval",
      "AI model quality, privacy compliance or deployment safety",
    ],
  };
}

const evidence = buildEvidence();
if (process.argv.includes("--check")) {
  if (!fs.existsSync(EVIDENCE_PATH)) throw new Error("missing open-pulse-scenario-audit.json");
  const persisted = readJson(EVIDENCE_PATH);
  if (JSON.stringify(persisted) !== JSON.stringify(evidence)) {
    throw new Error("Open Pulse scenario audit is stale; rerun without --check");
  }
  if (evidence.status !== "PASS") throw new Error("Open Pulse scenario audit failed");
  console.log("PASS: 14 scenario rows and 8 operation packages are structurally reproducible; no operational authorization implied");
} else {
  fs.writeFileSync(EVIDENCE_PATH, JSON.stringify(evidence, null, 2) + "\n", "utf8");
  if (evidence.status !== "PASS") {
    console.error("FAIL: Open Pulse scenario audit found a contract gap");
    process.exitCode = 1;
  } else {
    console.log("WROTE: open-pulse-scenario-audit.json");
  }
}
