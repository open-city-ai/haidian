#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = __dirname;
const fixturePath = path.join(root, "fixtures.json");
const resultPath = path.join(root, "results.json");
const payload = JSON.parse(fs.readFileSync(fixturePath, "utf8"));

function decide(facts) {
  if (!facts.intake_safe) return "HOLD_R0";
  if (!facts.ownership_clear) return "HOLD_R1";
  if (facts.ai_action === "data_request" && facts.data_scope_exceeded) {
    return "REJECT_DATA_REQUEST_R1";
  }
  if (facts.hazard_suspected && facts.qualified_route) return "QUALIFIED_HANDOVER_R2";
  if (facts.hazard_suspected) return "HOLD_R2";
  if (!facts.repair_authorized) return "HOLD_R3";
  if (facts.ai_action === "part_recommendation" && !facts.part_evidence_complete) {
    return "REJECT_AI_RECOMMENDATION_R3";
  }
  if (!facts.part_evidence_complete) return "REJECT_PART_R3";
  if (!facts.retest_passed) return "HOLD_R4";
  if (facts.ai_action === "release_decision") return "HOLD_AI_AUTHORITY_R5";
  if (facts.erasure_required && !facts.erasure_evidenced) return "HOLD_R5";
  if (!facts.accountable_signoff || !facts.independent_signoff) return "HOLD_R5";
  return "RETURN_TO_SERVICE_R5";
}

const cases = payload.fixtures.map((fixture) => {
  const actual = decide(fixture.facts);
  return {
    fixture_id: fixture.id,
    rule_family: fixture.rule_family || "release_gate",
    expected: fixture.expected,
    actual,
    matched: actual === fixture.expected,
  };
});

const matched = cases.filter((item) => item.matched).length;
const authorityCases = cases.filter((item) => item.rule_family === "ai_authority_boundary");
const authorityMatched = authorityCases.filter((item) => item.matched).length;
const result = {
  schema_version: "1.0.0",
  claim_level: "synthetic_rule_replay",
  purpose: "Check that participant-authored R0-R5 and AI-authority rules stop or divert known negative branches.",
  field_runs: 0,
  fixture_count: cases.length,
  matched_expected_decisions: matched,
  expected_match_rate: cases.length ? matched / cases.length : 0,
  authority_boundary_fixture_count: authorityCases.length,
  authority_boundary_matched: authorityMatched,
  authority_boundary_match_rate: authorityCases.length
    ? authorityMatched / authorityCases.length
    : 0,
  all_matched: matched === cases.length,
  cases,
  not_proven: [
    "field safety",
    "device performance",
    "institutional authorization",
    "public acceptance",
    "professional approval",
  ],
};

fs.writeFileSync(resultPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result));
