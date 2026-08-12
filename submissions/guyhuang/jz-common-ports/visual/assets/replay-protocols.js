#!/usr/bin/env node
"use strict";

// Offline, dependency-free replay of the three flagship Common Port protocols.
// This is synthetic policy evidence only. It does not simulate field users,
// urban systems, accessibility performance, legal compliance, or model quality.

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const ASSET_DIR = __dirname;
const PACKAGE_DIR = path.resolve(ASSET_DIR, "..", "..");
const SIMULATION_PATH = path.join(PACKAGE_DIR, "simulation.json");
const SCHEMA_PATH = path.join(ASSET_DIR, "simulation.schema.json");
const EVIDENCE_PATH = path.join(ASSET_DIR, "replay-evidence.json");
const RUNNER_PATH = __filename;

function canonical(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("non-finite number is not canonical JSON");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  }
  throw new Error(`unsupported JSON type: ${typeof value}`);
}

function sha256Bytes(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

function sha256File(file) {
  return sha256Bytes(fs.readFileSync(file));
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function validateInput(testName, input) {
  const errors = [];
  if (!input || typeof input !== "object" || Array.isArray(input)) return ["input must be an object"];
  if (testName === "minimum-data") {
    if (!Array.isArray(input.declared_fields) || !input.declared_fields.every((v) => typeof v === "string")) errors.push("declared_fields must be a string array");
    if (!Array.isArray(input.requested_fields) || !input.requested_fields.every((v) => typeof v === "string")) errors.push("requested_fields must be a string array");
    if (!isBoolean(input.personal_data)) errors.push("personal_data must be boolean");
  } else if (testName === "non-ai-parity") {
    for (const key of ["digital_opt_out", "human_channel_available", "paper_channel_available"]) if (!isBoolean(input[key])) errors.push(`${key} must be boolean`);
  } else if (testName === "red-card-hold") {
    if (!isBoolean(input.red_card)) errors.push("red_card must be boolean");
    if (!isBoolean(input.unresolved_appeal)) errors.push("unresolved_appeal must be boolean");
    if (!["concept", "simulation", "sandbox", "limited", "hold", "retired"].includes(input.current_state)) errors.push("current_state must be a passport state");
  } else if (testName === "human-final-decision") {
    for (const key of ["high_stakes", "qualified_human_available", "ai_decision_attempted"]) if (!isBoolean(input[key])) errors.push(`${key} must be boolean`);
  } else if (testName === "expiry-and-audit") {
    for (const key of ["expired", "deletion_evidence", "non_personal_change_log"]) if (!isBoolean(input[key])) errors.push(`${key} must be boolean`);
  } else {
    errors.push(`unknown test_name: ${testName}`);
  }
  return errors;
}

function deriveControl(testName, input) {
  if (testName === "minimum-data") {
    const declared = new Set(input.declared_fields);
    return input.requested_fields.every((field) => declared.has(field)) && !input.personal_data
      ? "accept_minimum_data"
      : "reject_undeclared_field";
  }
  if (testName === "non-ai-parity") {
    return input.digital_opt_out && input.human_channel_available && input.paper_channel_available
      ? "offer_human_path"
      : "block_until_parity";
  }
  if (testName === "red-card-hold") {
    return input.red_card || input.unresolved_appeal ? "hold" : `continue_${input.current_state}`;
  }
  if (testName === "human-final-decision") {
    if (input.high_stakes && !input.qualified_human_available) return "hold_for_human_capacity";
    if (input.high_stakes) return "route_to_human";
    return input.ai_decision_attempted ? "recall_ai_decision" : "human_review_optional";
  }
  if (testName === "expiry-and-audit") {
    if (!input.expired) return "remain_limited";
    return input.deletion_evidence && input.non_personal_change_log ? "retire_and_log" : "hold_until_audit_complete";
  }
  throw new Error(`cannot derive unknown test_name: ${testName}`);
}

function validateSimulationShape(simulation, schema) {
  const errors = [];
  const requiredTop = schema.required || [];
  for (const key of requiredTop) if (!(key in simulation)) errors.push(`simulation missing ${key}`);
  if (!Array.isArray(simulation.tasks)) errors.push("simulation.tasks must be an array");
  if (simulation.task_count !== simulation.tasks.length) errors.push("task_count does not equal tasks.length");
  if (simulation.canonicalization_contract?.id !== "recursive_key_sort_utf8_compact_json_v1") errors.push("canonicalization contract ID mismatch");
  if (simulation.runner?.path !== "visual/assets/replay-protocols.js") errors.push("runner path mismatch");
  if (simulation.runner?.schema_path !== "visual/assets/simulation.schema.json") errors.push("schema path mismatch");
  return errors;
}

function evaluateTask(task) {
  const failures = [];
  const required = [
    "task_id", "pilot_id", "test_name", "fixture", "input_sha256", "canonicalization",
    "dispatch_schema_valid", "outcome", "expected_control", "observed_control",
    "counterfactual_input", "counterfactual_expected_control", "energy_used_kwh",
    "energy_budget_kwh", "audit_complete", "contains_personal_data",
  ];
  for (const key of required) if (!(key in task)) failures.push(`missing ${key}`);
  if (!task.fixture || typeof task.fixture !== "object") failures.push("fixture must be an object");
  if (task.fixture?.pilot_id !== task.pilot_id) failures.push("fixture pilot_id mismatch");
  if (task.fixture?.test_name !== task.test_name) failures.push("fixture test_name mismatch");
  if (task.fixture?.synthetic !== true) failures.push("fixture must declare synthetic=true");

  const inputErrors = validateInput(task.test_name, task.fixture?.input);
  const counterfactualErrors = validateInput(task.test_name, task.counterfactual_input);
  failures.push(...inputErrors.map((v) => `primary schema: ${v}`));
  failures.push(...counterfactualErrors.map((v) => `counterfactual schema: ${v}`));

  let derivedControl = null;
  let counterfactualControl = null;
  let computedHash = null;
  if (!inputErrors.length && task.fixture) {
    computedHash = sha256Bytes(Buffer.from(canonical(task.fixture), "utf8"));
    derivedControl = deriveControl(task.test_name, task.fixture.input);
  }
  if (!counterfactualErrors.length) counterfactualControl = deriveControl(task.test_name, task.counterfactual_input);

  if (task.canonicalization !== "recursive_key_sort_utf8_compact_json_v1") failures.push("task canonicalization ID mismatch");
  if (computedHash !== task.input_sha256) failures.push("fixture SHA-256 mismatch");
  if (derivedControl !== task.expected_control) failures.push("derived primary control does not match expected_control");
  if (task.observed_control !== derivedControl) failures.push("stored observed_control does not match independently derived control");
  if (counterfactualControl !== task.counterfactual_expected_control) failures.push("derived counterfactual control mismatch");
  if (task.dispatch_schema_valid !== true) failures.push("stored dispatch_schema_valid is not true");
  if (task.outcome !== "policy_success") failures.push("outcome is not policy_success");
  if (!(typeof task.energy_used_kwh === "number" && typeof task.energy_budget_kwh === "number" && task.energy_used_kwh <= task.energy_budget_kwh)) failures.push("energy envelope failed");
  if (task.audit_complete !== true) failures.push("audit_complete is not true");
  if (task.contains_personal_data !== false) failures.push("contains_personal_data is not false");

  return {
    task_id: task.task_id,
    pilot_id: task.pilot_id,
    test_name: task.test_name,
    fixture_sha256: computedHash,
    derived_control: derivedControl,
    counterfactual_control: counterfactualControl,
    energy_used_kwh: task.energy_used_kwh,
    energy_budget_kwh: task.energy_budget_kwh,
    passed: failures.length === 0,
    failures,
  };
}

function buildEvidence(simulation, schema, pilotFilter) {
  const topErrors = validateSimulationShape(simulation, schema);
  const allTasks = Array.isArray(simulation.tasks) ? simulation.tasks : [];
  const tasks = pilotFilter ? allTasks.filter((task) => task.pilot_id === pilotFilter) : allTasks;
  if (pilotFilter && tasks.length === 0) topErrors.push(`no tasks found for pilot ${pilotFilter}`);
  const duplicateIds = allTasks.map((task) => task.task_id).filter((id, i, ids) => ids.indexOf(id) !== i);
  if (duplicateIds.length) topErrors.push(`duplicate task IDs: ${[...new Set(duplicateIds)].join(", ")}`);
  const results = tasks.map(evaluateTask);
  const taskFailures = results.flatMap((result) => result.failures.map((message) => `${result.task_id}: ${message}`));
  const failures = [...topErrors, ...taskFailures];
  const passedTasks = results.filter((result) => result.passed).length;
  return {
    evidence_version: "1.0.0",
    status: failures.length ? "FAIL" : "PASS",
    scope: pilotFilter || "SC-01+SC-05+SC-09",
    claim_boundary: "offline synthetic public-interest policy replay; not field, accessibility, legal, urban-system, service-quality or model-performance evidence",
    canonicalization: "recursive_key_sort_utf8_compact_json_v1",
    runner_sha256: sha256File(RUNNER_PATH),
    schema_sha256: sha256File(SCHEMA_PATH),
    simulation_sha256: sha256File(SIMULATION_PATH),
    task_count: results.length,
    passed_task_count: passedTasks,
    primary_policy_assertions: results.length,
    counterfactual_policy_assertions: results.length,
    schema_pass_count: results.filter((result) => !result.failures.some((f) => f.includes("schema"))).length,
    energy_budget_violations: results.filter((result) => result.energy_used_kwh > result.energy_budget_kwh).length,
    failures,
    results,
  };
}

function parseArguments(argv) {
  const options = { check: false, writeEvidence: false, json: false, pilot: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--check") options.check = true;
    else if (arg === "--write-evidence") options.writeEvidence = true;
    else if (arg === "--json") options.json = true;
    else if (arg === "--pilot") options.pilot = argv[++i];
    else if (arg === "--help" || arg === "-h") {
      process.stdout.write("Usage: node visual/assets/replay-protocols.js [--check] [--write-evidence] [--pilot SC-01] [--json]\n");
      process.exit(0);
    } else throw new Error(`unknown argument: ${arg}`);
  }
  if (!options.check && !options.writeEvidence) options.check = true;
  if (options.writeEvidence && options.pilot) throw new Error("--write-evidence must cover all three pilots");
  return options;
}

function main() {
  const options = parseArguments(process.argv.slice(2));
  const simulation = readJson(SIMULATION_PATH);
  const schema = readJson(SCHEMA_PATH);
  const evidence = buildEvidence(simulation, schema, options.pilot);
  const rendered = `${JSON.stringify(evidence, null, 2)}\n`;

  if (options.writeEvidence) fs.writeFileSync(EVIDENCE_PATH, rendered, "utf8");
  if (options.check && !options.pilot && fs.existsSync(EVIDENCE_PATH)) {
    const persisted = readJson(EVIDENCE_PATH);
    if (canonical(persisted) !== canonical(evidence)) {
      evidence.status = "FAIL";
      evidence.failures.push("persisted replay-evidence.json is stale; run --write-evidence after reviewed changes");
    }
  }

  if (options.json) process.stdout.write(`${JSON.stringify(evidence, null, 2)}\n`);
  else process.stdout.write(`${evidence.status}: ${evidence.passed_task_count}/${evidence.task_count} tasks; ${evidence.primary_policy_assertions + evidence.counterfactual_policy_assertions} policy assertions; ${evidence.failures.length} failures; scope=${evidence.scope}\n`);
  process.exitCode = evidence.status === "PASS" ? 0 : 1;
}

try {
  main();
} catch (error) {
  process.stderr.write(`FAIL: ${error.message}\n`);
  process.exitCode = 1;
}
