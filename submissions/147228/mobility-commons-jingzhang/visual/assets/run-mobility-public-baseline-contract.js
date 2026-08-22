#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const contract = JSON.parse(fs.readFileSync(path.join(__dirname, "mobility-public-baseline-contract.json"), "utf8"));
const checks = [];
function check(id, ok, detail) { checks.push({ id, ok: Boolean(ok), detail }); }

const expectedStates = ["BASE", "BOOST", "BLACKOUT", "BEQUEST"];
const prototypes = Array.isArray(contract.prototypes) ? contract.prototypes : [];
const phases = Array.isArray(contract.phase_sequence) ? contract.phase_sequence : [];
const gates = Array.isArray(contract.gate_thresholds) ? contract.gate_thresholds : [];
const roles = Array.isArray(contract.accountability_slots) ? contract.accountability_slots : [];
const plan = contract.measurement_plan || {};

check("four_public_states", JSON.stringify((contract.states || []).map((item) => item.id)) === JSON.stringify(expectedStates), "BASE/BOOST/BLACKOUT/BEQUEST");
check("four_method_references", (contract.method_references || []).length === 4 && contract.method_references.every((item) => item.source_id && item.use && item.limit), "four bounded method references");
check("three_spatial_prototypes", prototypes.length === 3, `${prototypes.length}/3`);
check("unique_prototype_ids", new Set(prototypes.map((item) => item.id)).size === prototypes.length, "unique prototype IDs");
check("prototype_contract_fields", prototypes.every((item) => item.key_area && item.ordinary_service && item.ai_boost && item.blackout_action && item.bequest_asset && item.responsible_role), "ordinary, boost, blackout, bequest and responsibility fields");
check("prototype_stop_conditions", prototypes.every((item) => Array.isArray(item.stop_conditions) && item.stop_conditions.length >= 2), "each prototype has stop conditions");

const weeks = phases.flatMap((item) => item.weeks || []);
check("five_phase_sequence", phases.length === 5 && phases.map((item) => item.id).join(",") === "P0,P1,P2,P3,P4", "P0 to P4");
check("twelve_weeks_exactly_once", JSON.stringify(weeks) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), "weeks 1-12 exactly once");
check("phase_contract_fields", phases.every((item) => item.action && item.gate), "each phase has action and gate");

check("coverage_sampling_boundary", plan.sampling_type === "coverage_oriented_purposive_not_statistical" && plan.population_inference_allowed === false, "coverage-oriented and no population inference");
check("curb_window_formula", plan.curb_observation_windows?.minimum_count === 3 * 2 * 2 * 4, "48 planned curb windows");
check("route_attempt_formula", plan.ordinary_route_attempts?.minimum_count === 3 * 4 * 2, "24 planned ordinary routes");
check("accessibility_formula", plan.accessibility_walkthroughs?.minimum_count === 3 * 2 * 2 && plan.accessibility_walkthroughs?.proxy_substitution_allowed === false, "12 affected-user walkthroughs without proxy substitution");
check("blackout_formula", plan.blackout_and_handoff_drills?.minimum_count === 4 * 2, "8 planned blackout and handoff drills");
check("field_values_remain_null", [plan.curb_observation_windows, plan.ordinary_route_attempts, plan.accessibility_walkthroughs, plan.blackout_and_handoff_drills].every((item) => item?.field_value === null), "all planned field values null");

check("six_unique_gates", gates.length === 6 && new Set(gates.map((item) => item.id)).size === 6, "six unique gate thresholds");
check("gate_contract_fields", gates.every((item) => item.measure && item.threshold && item.failure_action), "measure, threshold and failure action");
check("six_unconfirmed_roles", roles.length === 6 && roles.every((item) => item.confirmed === false && item.duty), "six unconfirmed accountability slots");

const data = contract.data_boundary || {};
check("data_retention_boundary", data.current_public_repository_case_records === 0 && data.future_coded_raw_observation_max_days <= 30 && data.future_non_personal_aggregate_max_days <= 365, "0 current cases, raw <=30 days, aggregate <=365 days");
check("prohibited_personal_fields", ["name", "face", "precise_person_trace", "home_address", "health_record", "cross_service_profile"].every((field) => (data.prohibited_fields || []).includes(field)), "personal and cross-service fields prohibited");
check("independent_manual_validation", /manual ground truth/.test(data.independent_validation || ""), "technology compared with separate manual ground truth");

const field = contract.field_status || {};
check("fail_closed_field_boundary", field.authorization === 0 && field.field_observations === 0 && field.local_baseline === "unknown" && field.performance_results === null && field.confirmed_operator === null && field.confirmed_budget === null && field.decision === "HOLD", "authorization=0, observations=0, unknown/null/HOLD");

const failed = checks.filter((item) => !item.ok);
const result = {
  ok: failed.length === 0,
  checks,
  summary: {
    states: contract.states?.length || 0,
    prototypes: prototypes.length,
    phases: phases.length,
    weeks: weeks.length,
    planned_curb_windows: plan.curb_observation_windows?.minimum_count || 0,
    planned_route_attempts: plan.ordinary_route_attempts?.minimum_count || 0,
    planned_accessibility_walkthroughs: plan.accessibility_walkthroughs?.minimum_count || 0,
    planned_blackout_drills: plan.blackout_and_handoff_drills?.minimum_count || 0,
    gates: gates.length,
    roles: roles.length,
    decision: field.decision
  },
  boundary: contract.boundary
};

if (process.argv.includes("--json")) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
else {
  process.stdout.write(`${result.ok ? "PASS" : "FAIL"} mobility public baseline contract ${checks.length - failed.length}/${checks.length}\n`);
  for (const item of checks) process.stdout.write(`${item.ok ? "PASS" : "FAIL"} ${item.id}: ${item.detail}\n`);
}
process.exitCode = result.ok ? 0 : 1;
