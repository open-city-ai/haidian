#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const payload = JSON.parse(
  fs.readFileSync(path.join(__dirname, "synthetic-test-fixtures.json"), "utf8"),
);
const SHARED_ERROR_VERSION = "ERR-V7";

function evaluateFixture(fields) {
  const candidateSurfaced = fields.frozen_rule_version === SHARED_ERROR_VERSION;
  const humanScopeDecision = !candidateSurfaced
    ? "exclude"
    : fields.required_scope_field_complete
      ? "include"
      : "hold_for_human_clarification";

  return {
    publicActual: {
      candidate_surfaced: candidateSurfaced,
      human_scope_decision: humanScopeDecision,
      repeat_proof_steps: candidateSurfaced ? 0 : null,
      ordinary_service_preserved: true,
      temporary_link_deleted_on_exit: fields.requests_exit,
    },
    noticeAction: !candidateSurfaced
      ? "none"
      : fields.notice_channel_safe
        ? "human_approved_notice"
        : "protected_human_contact_only",
  };
}

function aggregateSuites(evaluatedFixtures) {
  const shared = evaluatedFixtures.filter(
    ({ fixture }) => fixture.synthetic_fields.frozen_rule_version === SHARED_ERROR_VERSION,
  );
  const controls = evaluatedFixtures.filter(
    ({ fixture }) => fixture.synthetic_fields.frozen_rule_version !== SHARED_ERROR_VERSION,
  );

  return {
    T1_VERSION_TRACE: {
      shared_version_surfaced: shared.filter(({ evaluation }) => evaluation.publicActual.candidate_surfaced).length,
      control_surfaced: controls.filter(({ evaluation }) => evaluation.publicActual.candidate_surfaced).length,
    },
    T2_HUMAN_SCOPE_REVIEW: {
      included: evaluatedFixtures.filter(({ evaluation }) => evaluation.publicActual.human_scope_decision === "include").length,
      excluded_controls: controls.filter(({ evaluation }) => evaluation.publicActual.human_scope_decision === "exclude").length,
      human_clarification_hold: evaluatedFixtures.filter(
        ({ evaluation }) => evaluation.publicActual.human_scope_decision === "hold_for_human_clarification",
      ).length,
    },
    T3_NOTICE_EXIT_SAFETY: {
      unsafe_notice_sent: evaluatedFixtures.filter(
        ({ fixture, evaluation }) =>
          !fixture.synthetic_fields.notice_channel_safe && evaluation.noticeAction === "human_approved_notice",
      ).length,
      requested_exit_links_deleted: evaluatedFixtures.filter(
        ({ fixture, evaluation }) =>
          fixture.synthetic_fields.requests_exit && evaluation.publicActual.temporary_link_deleted_on_exit,
      ).length,
    },
    T4_AI_OFF_EQUIVALENCE: {
      ordinary_service_preserved: evaluatedFixtures.filter(
        ({ evaluation }) => evaluation.publicActual.ordinary_service_preserved,
      ).length,
      repeat_proof_steps_for_shared_version: shared.reduce(
        (total, { evaluation }) => total + evaluation.publicActual.repeat_proof_steps,
        0,
      ),
    },
  };
}

function sameValue(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function verify(candidatePayload) {
  const failures = [];
  const fixtures = candidatePayload.fixtures;

  if (fixtures.length !== 60) failures.push("fixture count");
  if (fixtures.filter((item) => item.synthetic_fields.frozen_rule_version === SHARED_ERROR_VERSION).length !== 12) failures.push("shared-version count");
  if (fixtures.filter((item) => item.synthetic_fields.complaint_present).length !== 1) failures.push("complainant count");
  if (fixtures.filter((item) => !item.synthetic_fields.required_scope_field_complete).length !== 4) failures.push("ambiguity count");

  const evaluatedFixtures = fixtures.map((fixture) => ({
    fixture,
    evaluation: evaluateFixture(fixture.synthetic_fields),
  }));

  for (const { fixture, evaluation } of evaluatedFixtures) {
    if (
      !sameValue(fixture.expected, evaluation.publicActual) ||
      !sameValue(fixture.actual, evaluation.publicActual) ||
      fixture.result !== "pass"
    ) {
      failures.push(fixture.fixture_id);
    }
  }

  const suiteActual = aggregateSuites(evaluatedFixtures);
  for (const suite of candidatePayload.test_suites) {
    if (
      !sameValue(suite.expected, suiteActual[suite.test_id]) ||
      !sameValue(suite.actual, suiteActual[suite.test_id]) ||
      suite.result !== "pass" ||
      !suite.failure_branch
    ) {
      failures.push(suite.test_id);
    }
  }

  return failures;
}

const failures = verify(payload);

const tamperedPayload = structuredClone(payload);
tamperedPayload.fixtures[0].synthetic_fields.frozen_rule_version = "CTRL-TAMPER";
const tamperFailures = verify(tamperedPayload);
if (!tamperFailures.includes("FX-001")) failures.push("tamper detection");

if (process.argv.includes("--tamper-example")) {
  console.error(`EXPECTED FAIL: ${tamperFailures.join(", ")}`);
  process.exit(tamperFailures.length ? 1 : 0);
}

if (failures.length) {
  console.error(`FAIL: ${failures.join(", ")}`);
  process.exit(1);
}
console.log("PASS: 60 fixture inputs executed, four suites aggregated, and tamper example detected");
