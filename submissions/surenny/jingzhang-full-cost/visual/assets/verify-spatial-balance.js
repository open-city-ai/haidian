#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const submissionRoot = path.resolve(__dirname, "../..");
const context = {};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "spatial-balance-data.js"), "utf8"), context);
const model = context.SPATIAL_BALANCE_MODEL;

function bilingual(value) {
  return Boolean(value && value.zh && value.en);
}

function validateAnchor(reference) {
  if (typeof reference !== "string" || !reference.includes("#")) return false;
  const [relativePath, featureId] = reference.split("#");
  const collection = JSON.parse(fs.readFileSync(path.join(submissionRoot, relativePath), "utf8"));
  return collection.features.some((feature) => feature.properties && feature.properties.id === featureId);
}

function protectedCount(candidate, sourceModel) {
  return sourceModel.protectedUses.reduce((total, use) => total + candidate.allocations[use], 0);
}

function validate(sourceModel) {
  const errors = [];
  const stateMap = Object.fromEntries(sourceModel.states.map((state) => [state.id, state]));
  const baseline = stateMap.baseline;
  const candidate = stateMap.candidate;
  const exit = stateMap.exit;
  if (!validateAnchor(sourceModel.anchor)) errors.push("invalid_spatial_anchor");
  if (sourceModel.unit !== "relative_layout_cell" || sourceModel.officialUnitsClaimed !== false) errors.push("fabricated_official_units");
  if (!sourceModel.decisionRule || !bilingual(sourceModel.decisionRule.humanDecisionGate)) errors.push("missing_human_decision_gate");
  if (!sourceModel.decisionRule || !bilingual(sourceModel.decisionRule.affectedGroups)) errors.push("missing_affected_groups");
  if (!baseline || !candidate || !exit) return errors.concat("missing_required_state");
  for (const state of sourceModel.states) {
    const total = Object.values(state.allocations).reduce((sum, value) => sum + value, 0);
    if (total !== sourceModel.cellCount) errors.push(`${state.id}_cell_total_mismatch`);
  }
  for (const use of sourceModel.protectedUses) {
    if (candidate.allocations[use] < baseline.allocations[use]) errors.push(`candidate_reduces_${use}`);
    if (exit.allocations[use] < candidate.allocations[use]) errors.push(`exit_reduces_${use}`);
  }
  const protectedGain = protectedCount(candidate, sourceModel) - protectedCount(baseline, sourceModel);
  if (protectedGain <= candidate.allocations.reversible_ai_trial) errors.push("candidate_has_no_net_spatial_dividend");
  if (candidate.allocations.reversible_ai_trial <= 0) errors.push("candidate_has_no_reversible_trial");
  if (exit.allocations.reversible_ai_trial !== 0) errors.push("exit_retains_ai_trial");
  if (sourceModel.fieldPerformance !== "unknown" || sourceModel.status !== "relative_tabletop_not_authorized_not_run") errors.push("fabricated_field_status");
  if (sourceModel.realPersonalDataUsed !== 0) errors.push("personal_data_not_zero");
  return [...new Set(errors)];
}

function mutate(target, fixture) {
  const segments = fixture.path.split(".");
  if (segments[0] === "states") {
    const stateId = segments[1];
    segments.splice(0, 2, "states", String(target.states.findIndex((state) => state.id === stateId)));
  }
  const property = segments.pop();
  const parent = segments.reduce((value, segment) => value[segment], target);
  if (fixture.remove) delete parent[property];
  else parent[property] = fixture.value;
}

const positiveErrors = validate(model);
const fixtureResults = model.negativeFixtures.map((fixture) => {
  const candidate = structuredClone(model);
  mutate(candidate, fixture);
  const errors = validate(candidate);
  return {id: fixture.id, expectedError: fixture.expectedError, errors, passed: errors.includes(fixture.expectedError)};
});
const checks = {
  three_states: model.states.length === 3 && new Set(model.states.map((state) => state.id)).size === 3,
  positive_contract_valid: positiveErrors.length === 0,
  six_distinct_negative_fixtures: fixtureResults.length === 6 && new Set(model.negativeFixtures.map((fixture) => fixture.path)).size === 6,
  every_negative_fixture_rejected: fixtureResults.every((result) => result.passed),
  relative_units_only: model.unit === "relative_layout_cell" && model.officialUnitsClaimed === false,
  protocol_only_no_personal_data: model.fieldPerformance === "unknown" && model.realPersonalDataUsed === 0
};
const result = {ok: Object.values(checks).every(Boolean), checks, positiveErrors, fixtureResults};

console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exit(1);
