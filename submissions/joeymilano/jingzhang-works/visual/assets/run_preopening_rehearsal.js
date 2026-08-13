#!/usr/bin/env node
// Rehearse release rules with synthetic omissions and declared fault cards.
// This script never converts a synthetic check into field evidence.
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const assetRoot = __dirname;
const [journeyArg, drillArg, outputArg] = process.argv.slice(2);
const journeyPath = journeyArg || path.join(assetRoot, "task_journeys.json");
const drillPath = drillArg || path.join(assetRoot, "day_one_operations_drill.json");
const outputPath = outputArg || path.join(assetRoot, "preopening-rehearsal.json");

const journeyBytes = fs.readFileSync(journeyPath);
const drillBytes = fs.readFileSync(drillPath);
const journeyData = JSON.parse(journeyBytes.toString("utf8"));
const drillData = JSON.parse(drillBytes.toString("utf8"));

const requiredFields = [
  "responsible_owner",
  "no_ai_equivalent",
  "minimum_data_rule",
  "human_takeover",
  "stop_condition",
  "validation_metric"
];

function hasValue(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function assessContract(contract) {
  const missing = requiredFields.filter((field) => !hasValue(contract[field]));
  return {
    door_decision: missing.length ? "block_before_field_review" : "ready_for_field_review",
    missing_fields: missing
  };
}

function sameList(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

const journeys = [...(journeyData.journeys || [])].sort((a, b) => a.id.localeCompare(b.id));
const faults = [...(drillData.fault_cards || [])].sort((a, b) => a.id.localeCompare(b.id));

if (journeys.length !== 12) throw new Error(`expected 12 task journeys, found ${journeys.length}`);
if (requiredFields.length !== 6) throw new Error(`expected 6 release fields, found ${requiredFields.length}`);
if (faults.length !== 6) throw new Error(`expected 6 fault cards, found ${faults.length}`);

const contractCases = [];
for (const journey of journeys) {
  const completeActual = assessContract(journey);
  contractCases.push({
    case_id: `${journey.id}-C0`,
    task_id: journey.id,
    synthetic_fixture: "declared_complete_contract",
    omitted_field: null,
    expected_door_decision: "ready_for_field_review",
    actual_door_decision: completeActual.door_decision,
    actual_missing_fields: completeActual.missing_fields,
    expected_outcome_matched:
      completeActual.door_decision === "ready_for_field_review" && completeActual.missing_fields.length === 0,
    field_result: null
  });

  requiredFields.forEach((field, index) => {
    const mutated = {...journey, [field]: null};
    const actual = assessContract(mutated);
    contractCases.push({
      case_id: `${journey.id}-M${index + 1}`,
      task_id: journey.id,
      synthetic_fixture: "one_required_field_removed",
      omitted_field: field,
      expected_door_decision: "block_before_field_review",
      actual_door_decision: actual.door_decision,
      actual_missing_fields: actual.missing_fields,
      expected_outcome_matched:
        actual.door_decision === "block_before_field_review" && sameList(actual.missing_fields, [field]),
      field_result: null
    });
  });
}

const faultCases = faults.map((fault) => {
  const missing = ["trigger", "expected_human_action", "maximum_claim", "stop_if"].filter(
    (field) => !hasValue(fault[field])
  );
  const actualDecision = missing.length ? "invalid_fault_card" : "block_ai_opening_keep_declared_manual_route";
  return {
    case_id: `${fault.id}-F`,
    fault_card_id: fault.id,
    synthetic_fixture: "declared_fault_injected_before_opening",
    trigger: fault.trigger,
    expected_door_decision: "block_ai_opening_keep_declared_manual_route",
    actual_door_decision: actualDecision,
    expected_human_action: fault.expected_human_action,
    maximum_claim: fault.maximum_claim,
    stop_if: fault.stop_if,
    missing_fault_fields: missing,
    expected_outcome_matched: actualDecision === "block_ai_opening_keep_declared_manual_route",
    field_result: null
  };
});

const allCases = [...contractCases, ...faultCases];
const expectedMatches = allCases.filter((item) => item.expected_outcome_matched).length;
const fieldResults = allCases.filter((item) => item.field_result !== null).length;
const output = {
  schema_version: "1.6.0",
  rehearsal_name_zh: "开门前排演器",
  rehearsal_name_en: "Pre-opening Rehearsal",
  status: expectedMatches === allCases.length ? "synthetic_rule_expectations_matched" : "blocked",
  method: {
    contract_cases: "For each of 12 declared task contracts, keep one complete copy and remove each of six required fields once.",
    fault_cases: "Inject each of six participant-authored day-one fault cards before opening.",
    release_ceiling: "A complete synthetic contract may become ready_for_field_review only. It never becomes field_verified."
  },
  source_hashes: {
    task_journeys_sha256: crypto.createHash("sha256").update(journeyBytes).digest("hex"),
    day_one_operations_drill_sha256: crypto.createHash("sha256").update(drillBytes).digest("hex")
  },
  required_fields: requiredFields,
  summary: {
    total_synthetic_cases: allCases.length,
    expected_outcome_matches: expectedMatches,
    complete_contract_cases: contractCases.filter((item) => item.omitted_field === null).length,
    missing_field_cases: contractCases.filter((item) => item.omitted_field !== null).length,
    missing_field_cases_blocked: contractCases.filter(
      (item) => item.omitted_field !== null && item.actual_door_decision === "block_before_field_review"
    ).length,
    fault_cases: faultCases.length,
    fault_cases_blocking_ai_opening: faultCases.filter(
      (item) => item.actual_door_decision === "block_ai_opening_keep_declared_manual_route"
    ).length,
    field_results: fieldResults
  },
  contract_cases: contractCases,
  fault_cases: faultCases,
  claim_boundary_zh:
    "九十项结果只说明本地确定性规则对这些合成样例作出了预期判断，不代表任何现场路线、人员、设备、服务或故障演练已经完成。",
  claim_boundary_en:
    "The ninety results show only that deterministic local rules returned the expected decisions for these synthetic fixtures. They do not prove any field journey, staffing, device, service, or fault drill."
};

if (allCases.length !== 90) throw new Error(`expected 90 synthetic cases, found ${allCases.length}`);
if (expectedMatches !== allCases.length) throw new Error(`${allCases.length - expectedMatches} synthetic cases missed their expected decision`);
if (fieldResults !== 0) throw new Error("synthetic rehearsal must contain zero field results");

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");
console.log(`pre-opening rehearsal: ${expectedMatches}/${allCases.length} expected decisions matched; field results ${fieldResults}`);
