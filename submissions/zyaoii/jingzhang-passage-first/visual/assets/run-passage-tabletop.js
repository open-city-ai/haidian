#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const assetDir = __dirname;
const contractPath = path.join(assetDir, "passage-contract.json");
const evidencePath = path.join(assetDir, "passage-tabletop-evidence.json");
const contractRaw = fs.readFileSync(contractPath, "utf8");
const contract = JSON.parse(contractRaw);

const requiredEvidence = new Set(contract.required_evidence_types);
const passableStates = new Set(["VERIFIED_PASSAGE", "ACTIVE"]);

const fixtures = [
  {
    id: "PF-T01-MISSING-AUTHORITY",
    from: "PREPARING",
    trigger: "request_human_verification",
    evidence: ["physical_route_and_notice_record", "evidence_expiry"],
    human: { named: true, competent: true, authorized: true },
    expected: "PREPARING",
  },
  {
    id: "PF-T02-HUMAN-VERIFIED",
    from: "PREPARING",
    trigger: "request_human_verification",
    evidence: [...requiredEvidence],
    human: { named: true, competent: true, authorized: true },
    expected: "VERIFIED_PASSAGE",
  },
  {
    id: "PF-T03-EVIDENCE-EXPIRED",
    from: "ACTIVE",
    trigger: "critical_evidence_expired",
    evidence: [...requiredEvidence],
    human: null,
    expected: "UNKNOWN",
  },
  {
    id: "PF-T04-ROUTE-OBSTRUCTED",
    from: "ACTIVE",
    trigger: "route_condition_failed",
    evidence: [...requiredEvidence],
    human: null,
    expected: "DEGRADED",
  },
  {
    id: "PF-T05-AI-OPEN-ATTEMPT",
    from: "PREPARING",
    trigger: "ai_requests_open",
    evidence: [...requiredEvidence],
    human: null,
    expected: "PREPARING",
  },
  {
    id: "PF-T06-HUMAN-RESTORED",
    from: "RESTORING",
    trigger: "request_restoration",
    evidence: ["restoration_scope_and_signatory"],
    human: { named: true, competent: true, authorized: true },
    expected: "RESTORED",
  },
];

function hasAllEvidence(evidence) {
  const present = new Set(evidence);
  return [...requiredEvidence].every((item) => present.has(item));
}

function hasHumanAuthority(human) {
  return Boolean(human && human.named && human.competent && human.authorized);
}

function transition(fixture) {
  if (fixture.trigger === "critical_evidence_expired") return "UNKNOWN";
  if (fixture.trigger === "route_condition_failed") return "DEGRADED";
  if (fixture.trigger === "ai_requests_open") return fixture.from;
  if (fixture.trigger === "request_human_verification") {
    return hasAllEvidence(fixture.evidence) && hasHumanAuthority(fixture.human)
      ? "VERIFIED_PASSAGE"
      : fixture.from;
  }
  if (fixture.trigger === "request_restoration") {
    const hasRestorationEvidence = fixture.evidence.includes("restoration_scope_and_signatory");
    return hasRestorationEvidence && hasHumanAuthority(fixture.human)
      ? "RESTORED"
      : fixture.from;
  }
  return fixture.from;
}

const results = fixtures.map((fixture) => {
  const actual = transition(fixture);
  return {
    id: fixture.id,
    from: fixture.from,
    trigger: fixture.trigger,
    expected: fixture.expected,
    actual,
    pass: actual === fixture.expected,
    false_ready: passableStates.has(actual) && !hasHumanAuthority(fixture.human),
  };
});

const stateNames = Object.keys(contract.status_semantics);
const privacyFieldsInFixtures = fixtures.flatMap((fixture) =>
  Object.keys(fixture).filter((key) => contract.privacy_forbidden_fields.includes(key))
);
const checks = [
  { id: "C01-EIGHT-STATES", pass: stateNames.length === 8, actual: stateNames.length },
  { id: "C02-ALL-FIXTURES", pass: results.every((result) => result.pass), actual: results.filter((result) => result.pass).length },
  { id: "C03-ZERO-FALSE-READY", pass: results.every((result) => !result.false_ready), actual: results.filter((result) => result.false_ready).length },
  { id: "C04-EXPIRY-FAILS-CLOSED", pass: results.find((result) => result.id === "PF-T03-EVIDENCE-EXPIRED").actual === "UNKNOWN", actual: results.find((result) => result.id === "PF-T03-EVIDENCE-EXPIRED").actual },
  { id: "C05-PHYSICAL-FAILURE-DEGRADES", pass: results.find((result) => result.id === "PF-T04-ROUTE-OBSTRUCTED").actual === "DEGRADED", actual: results.find((result) => result.id === "PF-T04-ROUTE-OBSTRUCTED").actual },
  { id: "C06-AI-CANNOT-OPEN", pass: results.find((result) => result.id === "PF-T05-AI-OPEN-ATTEMPT").actual === "PREPARING", actual: results.find((result) => result.id === "PF-T05-AI-OPEN-ATTEMPT").actual },
  { id: "C07-NO-PROHIBITED-PERSONAL-FIELDS", pass: privacyFieldsInFixtures.length === 0, actual: privacyFieldsInFixtures.length },
];

const evidence = {
  schema_version: "1.0.0",
  runner: "visual/assets/run-passage-tabletop.js",
  input_contract_sha256: crypto.createHash("sha256").update(contractRaw).digest("hex"),
  run_status: "local_synthetic_tabletop_pass",
  operational_status: "not_authorized_not_run",
  performance_results: null,
  fixture_count: fixtures.length,
  fixture_pass_count: results.filter((result) => result.pass).length,
  check_count: checks.length,
  check_pass_count: checks.filter((check) => check.pass).length,
  all_passed: results.every((result) => result.pass) && checks.every((check) => check.pass),
  results,
  checks,
  limitations: [
    "Synthetic deterministic tabletop only; it does not test a real route, work zone, person, organization, permit, inspection or restoration.",
    "A local PASS proves only state and fail-closed logic; it is not engineering, accessibility, traffic, legal, safety or implementation approval.",
    "Real operation remains blocked until written authority, named accountable roles, field survey, professional verification, maintenance, insurance and restoration evidence exist.",
  ],
};

if (process.argv.includes("--write")) {
  fs.writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
}

if (process.argv.includes("--json")) {
  process.stdout.write(`${JSON.stringify(evidence, null, 2)}\n`);
} else {
  process.stdout.write(
    `passage tabletop: ${evidence.fixture_pass_count}/${evidence.fixture_count} fixtures, ` +
      `${evidence.check_pass_count}/${evidence.check_count} checks, ` +
      `operational=${evidence.operational_status}\n`
  );
}

if (process.argv.includes("--check") && !evidence.all_passed) {
  process.exitCode = 1;
}
