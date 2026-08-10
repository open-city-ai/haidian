#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const requestedRoot = process.argv[2] ? path.resolve(process.argv[2]) : __dirname;
const root = fs.existsSync(path.join(requestedRoot, "governance-startup-protocol.json"))
  ? requestedRoot
  : path.join(requestedRoot, "visual", "assets");
const protocolPath = path.join(root, "governance-startup-protocol.json");
const readinessPath = path.join(root, "pilot-readiness-register.json");
const gatesPath = path.join(root, "release-gate-ledger.json");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

const protocol = readJson(protocolPath);
const readiness = readJson(readinessPath);
const gates = readJson(gatesPath);
const failures = [];
function check(condition, message) {
  if (!condition) failures.push(message);
}

function validate(candidate) {
  const problems = [];
  const local = (condition, message) => {
    if (!condition) problems.push(message);
  };
  local(candidate.stage_id && candidate.name_zh && candidate.name_en, "stage identity is required");
  local(Array.isArray(candidate.initiator_role_classes) && candidate.initiator_role_classes.length >= 2, `${candidate.stage_id}: role classes are required`);
  local(Array.isArray(candidate.required_inputs) && candidate.required_inputs.length >= 4, `${candidate.stage_id}: required inputs are incomplete`);
  local(typeof candidate.required_output === "string" && candidate.required_output.length > 5, `${candidate.stage_id}: required output is missing`);
  local(candidate.authorized === false, `${candidate.stage_id}: protocol cannot claim authorization`);
  local(!Object.prototype.hasOwnProperty.call(candidate, "confirmed_operator"), `${candidate.stage_id}: confirmed_operator must not be invented`);
  return problems;
}

const stages = Array.isArray(protocol.stages) ? protocol.stages : [];
const stageIds = stages.map((stage) => stage.stage_id).sort();
const requiredStageIds = [...(protocol.coverage?.required_stage_ids || [])].sort();
check(protocol.package_iteration === "v1.0", "protocol package_iteration must be v1.0");
check(protocol.status === "pre_authorization_contract_only", "protocol must remain pre-authorization");
check(protocol.claim_boundary?.authorized === false, "authorized must remain false");
check(protocol.claim_boundary?.operator_confirmed === false, "operator_confirmed must remain false");
check(JSON.stringify(stageIds) === JSON.stringify(requiredStageIds), "all required governance stages must be present exactly once");
check(new Set(stageIds).size === stageIds.length, "stage IDs must be unique");
for (const stage of stages) failures.push(...validate(stage));

const recordIds = (readiness.records || []).map((record) => record.scenario_id).sort();
const coveredScenarioIds = [...(protocol.coverage?.scenario_ids || [])].sort();
check(JSON.stringify(recordIds) === JSON.stringify(coveredScenarioIds), "all readiness scenarios must be covered exactly once");
const gateIds = (gates.releases || []).map((release) => release.release_id).sort();
const coveredGateIds = [...(protocol.coverage?.release_gate_ids || [])].sort();
check(JSON.stringify(gateIds) === JSON.stringify(coveredGateIds), "all release gates must be covered exactly once");
const requiredFields = ["baseline", "sample_plan", "success_threshold", "stop_threshold", "human_fallback", "accountable_role", "review_period", "deletion_proof"];
check(JSON.stringify([...(protocol.coverage?.readiness_fields || [])].sort()) === JSON.stringify(requiredFields.sort()), "all eight readiness fields must be covered");
check((protocol.role_selection_rules || []).length >= 4, "four role selection rules are required");
check((protocol.no_go_conditions || []).length >= 5, "no-go conditions are required");

const negativeMissing = JSON.parse(JSON.stringify(protocol));
delete negativeMissing.stages[3].required_inputs;
check(validate(negativeMissing.stages[3]).length > 0, "negative fixture with missing selection inputs must fail");
const negativeAuthorized = JSON.parse(JSON.stringify(protocol));
negativeAuthorized.stages[3].authorized = true;
check(validate(negativeAuthorized.stages[3]).length > 0, "negative fixture with unauthorized stage must fail");

const result = {
  ok: failures.length === 0,
  checks: {
    governance_stages: stageIds.length,
    readiness_scenarios: recordIds.length,
    release_gates: gateIds.length,
    readiness_fields: protocol.coverage?.readiness_fields?.length || 0,
    role_selection_rules: protocol.role_selection_rules?.length || 0,
    no_go_conditions: protocol.no_go_conditions?.length || 0,
    negative_fixtures: 2,
  },
  claim_boundary: protocol.claim_boundary,
  failures,
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.ok ? 0 : 1;
