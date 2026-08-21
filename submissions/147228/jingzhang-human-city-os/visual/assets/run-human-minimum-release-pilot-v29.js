#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const assetDirectory = __dirname;
const inputPath = path.join(assetDirectory, "human-minimum-release-pilot-v29.json");
const evidencePath = path.join(assetDirectory, "human-minimum-release-pilot-v29-evidence.json");
const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function checkTimeline() {
  assert(input.timeline.length === 6, "six timeline phases are required");
  const weeks = input.timeline.flatMap((phase) => phase.weeks);
  assert(JSON.stringify(weeks) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), "timeline must cover weeks 1-12 exactly once");
  for (const phase of input.timeline) {
    for (const field of ["phase_id", "name_zh", "name_en", "entry", "exit_gate", "stop"]) {
      assert(phase[field], `${phase.phase_id || "timeline phase"} missing ${field}`);
    }
    assert(Array.isArray(phase.work) && phase.work.length >= 3, `${phase.phase_id} has insufficient work definition`);
  }
}

function checkCoverage() {
  const plan = input.coverage_sampling_plan;
  assert(plan.sampling_type === "coverage_oriented_purposive_not_statistical", "sampling boundary is missing");
  assert(plan.population_inference_allowed === false, "population inference must remain prohibited");
  assert(plan.route_attempts.minimum_count === 3 * 4 * 2, "route-attempt plan does not match formula");
  assert(plan.service_equivalence_cases.minimum_count === 4 * 3 * 2, "service-equivalence plan does not match formula");
  assert(plan.accessibility_walkthroughs.minimum_count === 3 * 2 * 2, "accessibility plan does not match formula");
  assert(plan.failure_and_appeal_drills.minimum_count === 8, "eight failure drills are required");
  assert(plan.accessibility_walkthroughs.proxy_substitution_allowed === false, "proxy-only accessibility review must be rejected");
  for (const item of [plan.route_attempts, plan.service_equivalence_cases, plan.accessibility_walkthroughs, plan.failure_and_appeal_drills]) {
    assert(item.field_value === null, "field values must remain null before authorization");
  }
}

function checkGatesAndRoles() {
  assert(input.decision_rule.default_decision === "hold", "default decision must be hold");
  assert(input.gate_thresholds.length === 6, "six gate thresholds are required");
  assert(new Set(input.gate_thresholds.map((item) => item.gate_id)).size === 6, "gate IDs must be unique");
  assert(input.gate_thresholds.every((item) => item.measure && item.threshold && item.failure_action), "gate threshold is incomplete");
  assert(input.accountability_slots.length === 6, "six accountability slots are required");
  assert(input.accountability_slots.every((item) => item.confirmed === false && item.duty), "roles must remain unconfirmed and carry a duty");
  assert(input.action_packages.length === 6, "six action packages are required");
  const roleIds = new Set(input.accountability_slots.map((item) => item.role_id));
  const resourceClasses = new Set(input.resource_envelopes.map((item) => item.class));
  for (const item of input.action_packages) {
    assert(roleIds.has(item.owner_slot), `${item.id} owner slot is unresolved`);
    assert(resourceClasses.has(item.resource_class), `${item.id} resource class is unresolved`);
    assert(item.scale && item.output, `${item.id} scale or output is missing`);
  }
  assert(input.resource_envelopes.find((item) => item.class === "R3").excludes.includes("twelve-week minimum pilot"), "R3 work must remain outside the pilot");
}

function checkDataBoundary() {
  const data = input.data_and_redress;
  assert(input.status.field_state === "not_authorized_not_run", "field state must remain not_authorized_not_run");
  assert(input.status.performance_results === null, "performance results must remain null");
  assert(input.status.confirmed_operator === null && input.status.confirmed_budget === null && input.status.confirmed_site === null, "operator, budget, and site must remain unconfirmed");
  assert(data.current_g0_retention_days === 0, "current G0 retention must be zero days");
  assert(data.future_field_raw_observation_max_days > 0 && data.future_field_raw_observation_max_days <= 30, "future raw observation retention must be bounded to 30 days");
  assert(data.future_non_personal_aggregate_max_days <= 365, "future aggregate retention must be bounded to one year");
  assert(data.appeal_window_days >= 30, "appeal window must be at least 30 days");
  for (const prohibited of ["name", "face", "precise_route_trace", "health_record", "cross_service_profile"]) {
    assert(data.prohibited_fields.includes(prohibited), `prohibited field missing: ${prohibited}`);
  }
  assert(/no real participant/.test(data.repository_rule), "public-repository boundary is missing");
}

function main() {
  if (process.argv.length !== 3 || process.argv[2] !== "--check") {
    console.error("Usage: node run-human-minimum-release-pilot-v29.js --check");
    process.exitCode = 2;
    return;
  }
  try {
    checkTimeline();
    checkCoverage();
    checkGatesAndRoles();
    checkDataBoundary();
    const evidence = {
      runner: "run-human-minimum-release-pilot-v29.js",
      status: "PASS",
      package_id: input.package_id,
      execution_mode: "read_only_contract_check",
      field_state: input.status.field_state,
      performance_results: null,
      coverage: {
        weeks: 12,
        phases: input.timeline.length,
        planned_route_attempts: input.coverage_sampling_plan.route_attempts.minimum_count,
        planned_service_equivalence_cases: input.coverage_sampling_plan.service_equivalence_cases.minimum_count,
        planned_accessibility_walkthroughs: input.coverage_sampling_plan.accessibility_walkthroughs.minimum_count,
        planned_failure_drills: input.coverage_sampling_plan.failure_and_appeal_drills.minimum_count,
        gate_thresholds: input.gate_thresholds.length,
        accountability_slots: input.accountability_slots.length,
        action_packages: input.action_packages.length
      },
      claims: {
        field_authorized: false,
        real_users_contacted: false,
        real_personal_data_used: false,
        operator_confirmed: false,
        budget_confirmed: false,
        site_confirmed: false,
        performance_claimed: false
      },
      scope_note: input.limits.zh
    };
    fs.writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
    console.log(JSON.stringify(evidence, null, 2));
  } catch (error) {
    console.error(JSON.stringify({ status: "FAIL", error: error.message }, null, 2));
    process.exitCode = 1;
  }
}

main();
