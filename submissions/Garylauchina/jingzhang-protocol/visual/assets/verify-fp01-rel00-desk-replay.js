#!/usr/bin/env node
"use strict";

/**
 * Re-run the participant-side FP01 REL00 synthetic interface replay.
 *
 * This standard-library-only verifier derives every decision from case inputs,
 * compares it with the recorded result, verifies the source contract hash and
 * event classes, and keeps all field/external evidence credits at zero.
 * It does not test people, operate a service, authorize a site, or satisfy H0-H4.
 *
 * Usage:
 *   node visual/assets/verify-fp01-rel00-desk-replay.js [replay.json] [--json]
 */

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

class ReplayFailure extends Error {}

function assert(condition, message) {
  if (!condition) throw new ReplayFailure(message);
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function exactSet(values, expected, label) {
  const actual = new Set(values);
  assert(actual.size === values.length, `${label} contains duplicates`);
  assert(actual.size === expected.size, `${label} size mismatch`);
  for (const value of actual) assert(expected.has(value), `${label} unexpected value: ${value}`);
}

function evaluate(input) {
  if (input.direct_identifier_present === true) {
    return { decision: "BLOCK_DIRECT_IDENTIFIER", allowed: false };
  }
  if (input.path_mode === "ai_only") {
    return { decision: "BLOCK_AI_ONLY_PATH", allowed: false };
  }
  if (input.smartphone_required === true) {
    return { decision: "BLOCK_SMARTPHONE_DEPENDENCY", allowed: false };
  }
  if (input.release_request !== "REL00" && input.external_authorization !== true) {
    return { decision: "BLOCK_UNAUTHORIZED_RELEASE", allowed: false };
  }
  if (input.human_confirmation !== true) {
    return { decision: "BLOCK_MISSING_HUMAN_CONFIRMATION", allowed: false };
  }
  if (input.outcome === "refusal" && input.reason_code_present !== true) {
    return { decision: "BLOCK_UNREASONED_REFUSAL", allowed: false };
  }
  if (input.appeal_available !== true) {
    return { decision: "BLOCK_APPEAL_UNAVAILABLE", allowed: false };
  }
  if (input.deletion_claim === "completed_without_accountable_acknowledgement") {
    return { decision: "BLOCK_UNVERIFIED_DELETION_CLAIM", allowed: false };
  }
  if (input.outcome === "human_takeover" && input.human_service_continues !== true) {
    return { decision: "BLOCK_SERVICE_DISCONTINUITY", allowed: false };
  }
  if (
    input.outcome === "exit_restoration" &&
    !(input.ai_assistance_disabled === true && input.baseline_restored === true && input.human_service_continues === true)
  ) {
    return { decision: "BLOCK_EXIT_RESTORATION_GAP", allowed: false };
  }

  const positive = {
    referral: "PASS_HUMAN_CONFIRMED_REFERRAL",
    refusal: "PASS_REASONED_REFUSAL_WITH_APPEAL",
    human_takeover: "PASS_HUMAN_TAKEOVER_CONTINUES_SERVICE",
    exit_restoration: "PASS_EXIT_RESTORE_DELETE_PENDING",
  };
  assert(Object.hasOwn(positive, input.outcome), `unsupported outcome: ${input.outcome}`);
  return { decision: positive[input.outcome], allowed: true };
}

function run(replayPath) {
  const replay = JSON.parse(fs.readFileSync(replayPath, "utf8"));
  const root = path.resolve(path.dirname(replayPath), "../..");

  assert(replay.$schema === "local://jingzhang/fp01-rel00-desk-replay/v1", "unexpected schema");
  assert(replay.artifact_id === "FP01-REL00-DESK-REPLAY-001", "unexpected artifact_id");
  assert(replay.replay_status === "executed_participant_side_synthetic_design_time_only", "unexpected replay_status");
  assert(replay.recorded_run?.result === "PASS", "recorded run must be PASS");
  assert(replay.verification?.runtime === "nodejs_standard_library_only", "runtime boundary mismatch");

  const contractPath = path.join(root, replay.source_contract.path);
  assert(fs.existsSync(contractPath), `missing source contract: ${contractPath}`);
  assert(sha256(contractPath) === replay.source_contract.sha256, "source contract hash mismatch");
  const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
  const eventClasses = contract.illustrative_receipts.map((item) => item.event_class);
  exactSet(eventClasses, new Set(replay.source_contract.required_event_classes), "source contract event classes");

  const boundary = replay.evidence_boundary;
  assert(boundary.release_stage === "REL00_desk_review_and_open_correction_only", "replay must remain REL00 only");
  for (const field of [
    "field_evidence", "external_evidence", "independent_rehearsal", "professional_signoff",
    "government_authorization", "site_confirmation", "named_operator_commitment", "performance_measurement",
  ]) {
    assert(boundary[field] === false, `evidence boundary ${field} must be false`);
  }
  assert(boundary.synthetic === true, "replay must be synthetic");
  assert(boundary.external_evidence_credit_count === 0, "external evidence credit must remain zero");
  assert(boundary.h0_h4_verified_gate_count === 0, "H0-H4 verified gate count must remain zero");
  assert(boundary.external_release_granted_count === 0 && boundary.release_state === "HOLD", "external release must remain HOLD at zero");

  assert(Array.isArray(replay.cases) && replay.cases.length === 12, "exactly 12 replay cases required");
  exactSet(
    replay.cases.map((item) => item.case_id),
    new Set([
      "REL00-POS-01-SUCCESS", "REL00-POS-02-REFUSAL", "REL00-POS-03-HUMAN-TAKEOVER",
      "REL00-POS-04-EXIT-RESTORATION", "REL00-NEG-01-AI-ONLY", "REL00-NEG-02-SMARTPHONE",
      "REL00-NEG-03-NO-HUMAN-CONFIRMATION", "REL00-NEG-04-NO-REFUSAL-REASON",
      "REL00-NEG-05-NO-APPEAL", "REL00-NEG-06-DIRECT-IDENTIFIER",
      "REL00-NEG-07-FALSE-DELETION", "REL00-NEG-08-UNAUTHORIZED-RELEASE",
    ]),
    "case IDs",
  );

  const positiveEvents = replay.cases.filter((item) => item.case_class === "positive_transition").map((item) => item.event_class);
  exactSet(positiveEvents, new Set(["success", "refusal", "human_takeover", "exit_restoration"]), "positive event classes");
  const injections = replay.cases.filter((item) => item.case_class === "negative_fail_closed").map((item) => item.failure_injection);
  exactSet(injections, new Set([
    "ai_only_service_path", "smartphone_dependency", "missing_human_confirmation", "missing_refusal_reason",
    "appeal_route_unavailable", "direct_identifier_flag_without_identifier_value",
    "deletion_completed_without_accountable_acknowledgement", "release_beyond_rel00_without_external_authorization",
  ]), "failure injections");

  let passed = 0;
  let positivePassed = 0;
  let negativeBlocked = 0;
  const results = replay.cases.map((item) => {
    const actual = evaluate(item.input);
    const matches = actual.decision === item.expected_decision &&
      actual.decision === item.recorded_actual_decision &&
      actual.allowed === item.expected_allowed &&
      actual.allowed === item.recorded_allowed;
    assert(matches, `${item.case_id} replay mismatch: ${JSON.stringify(actual)}`);
    passed += 1;
    if (item.case_class === "positive_transition" && actual.allowed) positivePassed += 1;
    if (item.case_class === "negative_fail_closed" && !actual.allowed) negativeBlocked += 1;
    return { case_id: item.case_id, decision: actual.decision, allowed: actual.allowed, pass: true };
  });

  const aggregate = replay.aggregate;
  assert(aggregate.synthetic_fixture_count === replay.cases.length, "synthetic fixture count mismatch");
  assert(aggregate.positive_case_count === 4 && aggregate.negative_control_count === 8, "case-class counts mismatch");
  assert(aggregate.recorded_pass_count === passed, "recorded pass count mismatch");
  assert(aggregate.positive_transition_match_ratio === positivePassed / 4, "positive transition ratio mismatch");
  assert(aggregate.negative_control_block_ratio === negativeBlocked / 8, "negative block ratio mismatch");
  assert(aggregate.external_evidence_credit_count === 0, "aggregate external evidence credit must remain zero");

  const serialized = JSON.stringify(replay);
  assert(!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(serialized), "email-like identifier detected");
  assert(!/(^|\D)1[3-9]\d{9}(?!\d)/.test(serialized), "mobile-like identifier detected");
  assert(!/(^|\D)\d{17}[0-9Xx](?!\d)/.test(serialized), "identity-number-like value detected");

  return {
    artifact_id: replay.artifact_id,
    result: "PASS",
    synthetic_fixture_count: replay.cases.length,
    positive_transition_match_ratio: positivePassed / 4,
    negative_control_block_ratio: negativeBlocked / 8,
    external_evidence_credit_count: 0,
    h0_h4_verified_gate_count: 0,
    external_release_state: "HOLD",
    results,
  };
}

function main() {
  const args = process.argv.slice(2);
  const jsonOutput = args.includes("--json");
  const fileArg = args.find((arg) => arg !== "--json");
  const defaultPath = path.join(__dirname, "fp01-rel00-desk-replay.json");
  try {
    const summary = run(fileArg ? path.resolve(fileArg) : defaultPath);
    if (jsonOutput) process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
    else process.stdout.write("FP01 REL00 DESK REPLAY PASS — 4/4 positive transitions matched; 8/8 negative controls failed closed; external evidence credit 0; H0-H4 0/5; release HOLD.\n");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (jsonOutput) process.stdout.write(`${JSON.stringify({ result: "FAIL", error: message }, null, 2)}\n`);
    else process.stderr.write(`FP01 REL00 DESK REPLAY FAIL — ${message}\n`);
    process.exitCode = 1;
  }
}

main();
