#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const submissionRoot = path.resolve(__dirname, "../..");
const context = {window: {}};
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, "responsibility-transfer-data.js"), "utf8"),
  context
);

const model = context.window.RESPONSIBILITY_TRANSFER_MODEL;
const bilingual = (value) => Boolean(value && value.zh && value.en);

function validateSpatialReference(reference) {
  if (typeof reference !== "string" || !reference.includes("#")) return false;
  const [relativePath, featureId] = reference.split("#");
  const collection = JSON.parse(fs.readFileSync(path.join(submissionRoot, relativePath), "utf8"));
  return collection.features.some((feature) => feature.properties && feature.properties.id === featureId);
}

function validateHandoff(handoff) {
  const errors = [];
  if (!bilingual(handoff.label)) errors.push("missing_bilingual_label");
  if (!bilingual(handoff.originator)) errors.push("missing_originator");
  if (!handoff.raci || !bilingual(handoff.raci.responsible)) errors.push("missing_raci_responsible");
  if (!handoff.raci || !bilingual(handoff.raci.accountable)) errors.push("missing_raci_accountable");
  if (!handoff.raci || !bilingual(handoff.raci.receiver)) errors.push("missing_raci_receiver");
  if (!handoff.raci || !bilingual(handoff.raci.consulted)) errors.push("missing_affected_group_observer");
  if (!handoff.raci || !bilingual(handoff.raci.informed)) errors.push("missing_raci_informed");
  if (!bilingual(handoff.decisionGate)) errors.push("missing_decision_gate");
  if (!bilingual(handoff.noAiEquivalent)) errors.push("missing_no_ai_equivalent");
  if (!bilingual(handoff.affectedGroups)) errors.push("missing_affected_groups");
  if (!handoff.spatial || !bilingual(handoff.spatial.consequence)) errors.push("missing_spatial_consequence");
  if (!handoff.spatial || !validateSpatialReference(handoff.spatial.reference)) errors.push("invalid_spatial_reference");
  if (!handoff.denominator || handoff.denominator.includeFailedAttempts !== true) errors.push("failed_attempts_excluded");
  if (!handoff.denominator || handoff.denominator.includeWithdrawals !== true) errors.push("withdrawals_excluded");
  if (!handoff.denominator || handoff.denominator.status !== "pending_field_measurement" || handoff.denominator.value !== null) errors.push("fabricated_denominator");
  if (!handoff.transferEvidence || !bilingual(handoff.transferEvidence.acceptanceRequirement)) errors.push("missing_acceptance_evidence");
  if (!handoff.transferEvidence || !bilingual(handoff.transferEvidence.stopRequirement)) errors.push("missing_stop_evidence");
  if (!handoff.transferEvidence || !bilingual(handoff.transferEvidence.recoveryRequirement)) errors.push("missing_recovery_evidence");
  if (!handoff.transferEvidence || handoff.transferEvidence.fieldStatus !== "unknown") errors.push("fabricated_field_status");
  return errors;
}

function deletePath(target, dottedPath) {
  const segments = dottedPath.split(".");
  const property = segments.pop();
  const parent = segments.reduce((value, segment) => value[segment], target);
  delete parent[property];
}

const ids = model.handoffs.map((handoff) => handoff.id);
const costClasses = model.handoffs.map((handoff) => handoff.costClass);
const positiveErrors = model.handoffs.flatMap((handoff) =>
  validateHandoff(handoff).map((error) => `${handoff.id}:${error}`)
);
const fixtureResults = model.negativeFixtures.map((fixture) => {
  const handoff = structuredClone(model.handoffs.find((candidate) => candidate.id === fixture.handoffId));
  deletePath(handoff, fixture.removePath);
  const errors = validateHandoff(handoff);
  return {id: fixture.id, handoffId: fixture.handoffId, expectedError: fixture.expectedError, errors, passed: errors.includes(fixture.expectedError)};
});
const checks = {
  seven_unique_handoffs: ids.length === 7 && new Set(ids).size === 7,
  exact_cost_classes: JSON.stringify(costClasses) === JSON.stringify(model.requiredCostClasses),
  positive_contract_valid: positiveErrors.length === 0,
  seven_distinct_negative_fixtures: fixtureResults.length === 7 && new Set(model.negativeFixtures.map((fixture) => fixture.removePath)).size === 7,
  every_negative_fixture_rejected: fixtureResults.every((result) => result.passed),
  protocol_only_no_personal_data: model.status === "protocol_only_not_authorized_not_run" && model.realPersonalDataUsed === 0
};
const result = {ok: Object.values(checks).every(Boolean), checks, positiveErrors, fixtureResults};

console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exit(1);
