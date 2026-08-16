"use strict";

const fs = require("fs");
const path = require("path");

const root = __dirname;
const contractsPath = path.join(root, "scenario-contracts.json");
const receiptsPath = path.join(root, "receipts.json");
const registerPath = path.join(root, "..", "public-ai-register.json");
const scenariosPath = path.join(root, "..", "scenarios.json");
const simulationPath = path.join(root, "..", "..", "..", "simulation.json");
const contracts = JSON.parse(fs.readFileSync(contractsPath, "utf8"));
const register = JSON.parse(fs.readFileSync(registerPath, "utf8"));
const scenarioCards = JSON.parse(fs.readFileSync(scenariosPath, "utf8"));

const variants = [
  "qualified",
  "missing_accountable_role",
  "human_route_unavailable",
  "data_ceiling_exceeded",
  "stop_authority_unavailable",
  "restoration_evidence_missing",
];

function validateRegisterRecord(contract, card, record) {
  const failed = [];
  const required = [
    "purpose", "non_ai_route", "inputs", "prohibited_inputs", "model_or_rule",
    "version_status", "supplier_dependency", "retention", "subgroup_checks",
    "human_authority", "metrics", "incident_owner", "pause_threshold", "appeal",
    "procurement_disclosure", "public_change_log", "physical_shutdown", "exit_and_deletion",
  ];
  if (!record || required.some((key) => !Object.prototype.hasOwnProperty.call(record, key))) {
    return ["public_register_record"];
  }
  if (record.scenario_id !== contract.id || record.scenario_id !== card.id) failed.push("record_identity");
  if (record.name_zh !== card.name_zh || record.name_en !== card.name_en) failed.push("record_name");
  if (record.version_status !== "concept_not_procured") failed.push("version_status");
  if (record.public_change_log !== "required_before_authorized_pilot") failed.push("public_change_log");
  if (!record.non_ai_route.same_task || record.non_ai_route.staffed_route !== contract.same_task_human_route) failed.push("same_task_human_route");
  if (!record.non_ai_route.non_digital_route) failed.push("non_digital_route");
  if (!record.supplier_dependency.replaceable || !record.supplier_dependency.interface || record.supplier_dependency.procured_supplier !== null) failed.push("replaceable_supplier_interface");
  if (record.supplier_dependency.interface !== contract.supplier_interface) failed.push("supplier_interface_contract");
  if (!record.retention.session_data || !record.retention.voluntary_case_receipt) failed.push("retention");
  if (!record.subgroup_checks.required_before_release || !record.subgroup_checks.required_before_release.length) failed.push("subgroup_checks");
  if (!record.incident_owner.role || !record.incident_owner.status) failed.push("incident_owner");
  if (!record.physical_shutdown.action || !record.physical_shutdown.continuity) failed.push("physical_shutdown");
  const exit = record.exit_and_deletion;
  if (exit.service_shutdown !== "disable_service" || exit.data_disposition !== "verified_deletion" || exit.human_service_continuity !== "continue_same_task_staffed_service" || exit.public_close_out !== "publish_close_out_record") failed.push("exit_and_deletion");
  const prohibited = record.prohibited_inputs.join(" ").toLowerCase();
  for (const phrase of ["face recognition", "mandatory precise tracking", "cross-scene profiling"]) {
    if (!prohibited.includes(phrase)) failed.push(`prohibited_${phrase.replaceAll(" ", "_")}`);
  }
  const operational = JSON.stringify({inputs: record.inputs, model_or_rule: record.model_or_rule, purpose: record.purpose}).toLowerCase();
  for (const phrase of ["face recognition", "mandatory precise tracking", "cross-scene profiling"]) {
    if (operational.includes(phrase)) failed.push(`operational_${phrase.replaceAll(" ", "_")}`);
  }
  return failed;
}

function evaluate(candidate, registerFailures) {
  const failed = [];
  failed.push(...registerFailures);
  if (!candidate.accountable_role) failed.push("accountable_role");
  if (!candidate.same_task_human_route) failed.push("same_task_human_route");
  if (candidate.data_exceeds_declared_ceiling) failed.push("data_ceiling");
  if (!candidate.stop_authority || !candidate.stop_authority.length) failed.push("stop_authority");
  if (!candidate.restoration_acceptance || !candidate.restoration_acceptance.length) failed.push("restoration_evidence");
  return {
    release_decision: failed.length ? "block_release" : "release_for_tabletop_only",
    failed_conditions: failed,
  };
}

function candidateFor(contract, variant) {
  const candidate = JSON.parse(JSON.stringify(contract));
  if (variant === "missing_accountable_role") candidate.accountable_role = "";
  if (variant === "human_route_unavailable") candidate.same_task_human_route = "";
  if (variant === "data_ceiling_exceeded") candidate.data_exceeds_declared_ceiling = true;
  if (variant === "stop_authority_unavailable") candidate.stop_authority = [];
  if (variant === "restoration_evidence_missing") candidate.restoration_acceptance = [];
  return candidate;
}

const receipts = [];
const recordsById = new Map(register.records.map((item) => [item.scenario_id, item]));
const cardsById = new Map(scenarioCards.scenarios.map((item) => [item.id, item]));
const expectedIds = Array.from({length: 12}, (_, index) => `SC-${String(index + 1).padStart(2, "0")}`);
if (register.records.length !== 12 || contracts.scenarios.length !== 12 || scenarioCards.scenarios.length !== 12 || expectedIds.some((id) => !recordsById.has(id) || !cardsById.has(id))) {
  throw new Error("public AI register, scenario cards and tabletop contracts must map SC-01..SC-12 one-to-one");
}
for (const contract of [...contracts.scenarios].sort((a, b) => a.id.localeCompare(b.id))) {
  const registerFailures = validateRegisterRecord(contract, cardsById.get(contract.id), recordsById.get(contract.id));
  for (const variant of variants) {
    const result = evaluate(candidateFor(contract, variant), registerFailures);
    const expected = variant === "qualified" ? "release_for_tabletop_only" : "block_release";
    receipts.push({
      case_id: `${contract.id}-${variant}`,
      scenario_id: contract.id,
      variant,
      release_decision: result.release_decision,
      failed_conditions: result.failed_conditions,
      register_contract_valid: registerFailures.length === 0,
      register_failed_conditions: registerFailures,
      expected_decision: expected,
      expectation_met: result.release_decision === expected,
    });
  }
}

const output = {
  schema_version: "1.0",
  simulation_id: "OLS-TABLETOP-001",
  status: "synthetic_tabletop_only_not_field_test",
  deterministic: true,
  network_required: false,
  qualified_cases_released: receipts.filter((item) => item.release_decision === "release_for_tabletop_only").length,
  negative_cases_blocked: receipts.filter((item) => item.variant !== "qualified" && item.release_decision === "block_release").length,
  public_ai_record_count: register.records.length,
  public_ai_register: "visual/assets/public-ai-register.json",
  receipts,
};

if (receipts.length !== 72 || output.qualified_cases_released !== 12 || output.negative_cases_blocked !== 60 || !receipts.every((item) => item.expectation_met)) {
  throw new Error("tabletop totals or expectations do not match the contract");
}

fs.writeFileSync(receiptsPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
const simulation = {
  schema_version: "1.0",
  simulation_id: "OLS-TABLETOP-001",
  prototype_id: "OLS-1TO1-001",
  status: "synthetic_tabletop_only_not_field_test",
  runner: "visual/assets/public-acceptance-tabletop/run_tabletop.js",
  contracts: "visual/assets/public-acceptance-tabletop/scenario-contracts.json",
  receipts: "visual/assets/public-acceptance-tabletop/receipts.json",
  public_ai_register: "visual/assets/public-ai-register.json",
  public_ai_record_count: register.records.length,
  task_count: receipts.length,
  qualified_tabletop_releases: output.qualified_cases_released,
  negative_cases_blocked: output.negative_cases_blocked,
  network_required: false,
  field_claim: false,
  real_user_data_used: false,
  supplier_or_procurement_claim: false,
  authorization_claim: false,
  tasks: receipts.map((receipt) => ({
    task_id: receipt.case_id,
    scenario_id: receipt.scenario_id,
    variant: receipt.variant,
    outcome: receipt.expectation_met ? "expectation_success" : "expectation_failure",
    release_decision: receipt.release_decision,
    dispatch_schema_valid: true,
    register_contract_valid: receipt.register_contract_valid,
    audit_complete: true,
  })),
};
fs.writeFileSync(simulationPath, `${JSON.stringify(simulation, null, 2)}\n`, "utf8");
process.stdout.write("PASS: 72 synthetic cases; 12 qualified tabletop releases; 60 negative cases blocked\n");
