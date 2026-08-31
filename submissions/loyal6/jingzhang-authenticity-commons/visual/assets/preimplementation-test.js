"use strict";

const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "preimplementation-package.json");
const evidence = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const dossier = JSON.parse(fs.readFileSync(path.join(__dirname, "correction-receipt-demo.json"), "utf8"));

const zoneArea = evidence.reference_test_fit.zones.reduce((sum, zone) => sum + zone.area_sqm, 0);
const shareTotal = evidence.procurement_cost_plan.packages.reduce(
  (sum, item) => sum + item.reference_share_percent,
  0
);
const gateIds = new Set(evidence.external_gates.map((gate) => gate.id));
const mappedBranches = evidence.conditional_implementation_branches.every((branch) =>
  branch.trigger_gates.every((gateId) => gateIds.has(gateId))
);
const allGatesHold = evidence.external_gates.every((gate) => gate.status === "HOLD");
const schedule = evidence.staffing_screening.reference_90_day_schedule;
const expectedStaffHours =
  schedule.window_hours *
  schedule.windows_per_week *
  schedule.weeks *
  evidence.staffing_screening.minimum_concurrent_seats;
const expectedStates = ["INTAKE", "PAUSE", "REVIEW", "CORRECT", "RETEST", "ADOPTION", "RECOVERY", "CLOSED"];
const actualStates = evidence.institutional_state_machine.ordered_state_ids;
const stateFields = ["entry_condition", "accountable_role", "required_receipt", "forbidden_transition", "exit_condition", "spatial_support"];
const stateMachineComplete =
  JSON.stringify(actualStates) === JSON.stringify(expectedStates) &&
  evidence.institutional_state_machine.states.length === expectedStates.length &&
  evidence.institutional_state_machine.states.every((state, index) =>
    state.id === expectedStates[index] && stateFields.every(field => typeof state[field] === "string" && state[field].trim())
  );
const gateFields = ["required_evidence", "enables", "blocks", "safe_state"];
const launchGatesComplete = evidence.external_gates.every(gate =>
  gateFields.every(field => typeof gate[field] === "string" && gate[field].trim())
);
const acceptanceSet = evidence.acceptance_evidence.institutional_acceptance_set;
const acceptanceIds = new Set(acceptanceSet.map(item => item.id));
const acceptanceMetrics = new Set(acceptanceSet.map(item => item.metric_id));
const acceptanceSetComplete =
  acceptanceSet.length === 12 &&
  acceptanceIds.size === 12 &&
  acceptanceMetrics.size === 12 &&
  acceptanceSet.filter(item => item.status.startsWith("currently_judgeable")).length === 8 &&
  acceptanceSet.filter(item => item.status === "baseline_required" && item.target === null).length === 4;
const dossierReceiptKeys = [
  "intake_receipt",
  "pause_receipt",
  "independent_review_record",
  "same_channel_correction_receipt",
  "retest_ticket",
  "adoption_consequence",
  "recovery_retirement_receipt",
  "closure_record"
];
const dossierComplete = dossierReceiptKeys.every(key => dossier.case_dossier && dossier.case_dossier[key]);

const checks = [
  {
    id: "P0_ZONE_AREA",
    passed: zoneArea === evidence.reference_test_fit.envelope.area_sqm,
    observed: zoneArea,
    expected: evidence.reference_test_fit.envelope.area_sqm
  },
  {
    id: "P0_COST_SHARES",
    passed: shareTotal === 100 && shareTotal === evidence.procurement_cost_plan.share_total_percent,
    observed: shareTotal,
    expected: 100
  },
  {
    id: "P0_GATES_HOLD",
    passed: allGatesHold && evidence.acceptance_evidence.field_release === false,
    observed: evidence.external_gates.filter((gate) => gate.status === "HOLD").length,
    expected: evidence.external_gates.length
  },
  {
    id: "P0_BRANCH_GATE_MAPPING",
    passed: mappedBranches,
    observed: evidence.conditional_implementation_branches.length,
    expected: 4
  },
  {
    id: "P0_STAFF_HOURS",
    passed: schedule.reference_staff_hours === expectedStaffHours,
    observed: schedule.reference_staff_hours,
    expected: expectedStaffHours
  },
  {
    id: "P0_INSTITUTIONAL_STATE_MACHINE",
    passed: stateMachineComplete,
    observed: actualStates,
    expected: expectedStates
  },
  {
    id: "P0_LAUNCH_GATE_EFFECTS",
    passed: launchGatesComplete,
    observed: evidence.external_gates.filter(gate => gateFields.every(field => typeof gate[field] === "string" && gate[field].trim())).length,
    expected: evidence.external_gates.length
  },
  {
    id: "P0_ACCEPTANCE_SET",
    passed: acceptanceSetComplete,
    observed: acceptanceSet.map(item => ({ id: item.id, status: item.status })),
    expected: "A01-A08 judgeable and A09-A12 baseline_required"
  },
  {
    id: "P0_CASE_DOSSIER_RECEIPTS",
    passed: dossierComplete,
    observed: dossierReceiptKeys.filter(key => dossier.case_dossier && dossier.case_dossier[key]).length,
    expected: dossierReceiptKeys.length
  },
  {
    id: "P0_OPERATING_SCENARIOS",
    passed: evidence.operational_screening.operating_scenarios.length === 3,
    observed: evidence.operational_screening.operating_scenarios.length,
    expected: 3
  }
];

const result = {
  schema_version: "1.0",
  source: "preimplementation-package.json",
  passed: checks.every((check) => check.passed),
  checks
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (!result.passed) process.exitCode = 1;
