#!/usr/bin/env node
// Zero-dependency, offline checker for the proposed Jing-Zhang Open Ledger.
// It validates synthetic tabletop records only; it cannot authorize a service.
const fs = require("node:fs");
const path = require("node:path");
const fixtures = JSON.parse(fs.readFileSync(path.join(__dirname, "open-ledger-tabletop-fixtures.json"), "utf8")).fixtures;

const rules = [
  ["PUBLIC_SOURCE_MISSING", item => Boolean(item.public_source_id)],
  ["PERSONAL_DATA_NOT_ALLOWED", item => item.personal_data === false],
  ["HUMAN_ALTERNATIVE_MISSING", item => item.human_alternative === true],
  ["INDEPENDENT_REVIEW_MISSING", item => item.independent_review === true],
  ["APPEAL_ROUTE_MISSING", item => item.appeal_route === true],
  ["RECORD_EXPIRED", item => item.expiry_state === "active"],
  ["RETURN_UNRESOLVED", item => item.return_status !== "unresolved" && item.next_question === true],
  ["PAUSE_CONDITION_MISSING", item => item.pause_condition === true],
  ["CARE_STEWARD_MISSING", item => item.care_steward === true],
];

const results = fixtures.map(item => {
  const failures = rules.filter(([, test]) => !test(item)).map(([code]) => code);
  const decision = failures.length ? "reject" : "accept";
  return { id: item.id, expected: item.expected, decision, matches_expected: item.expected === decision, failures };
});
const allMatch = results.every(result => result.matches_expected);
const output = {
  protocol_id: "jingzhang-open-ledger-five-receipt-v0.1",
  status: "synthetic_tabletop_only",
  safe_to_deploy: false,
  fixture_count: results.length,
  accepted_count: results.filter(result => result.decision === "accept").length,
  rejected_count: results.filter(result => result.decision === "reject").length,
  all_expected_outcomes_match: allMatch,
  results,
};
console.log(JSON.stringify(output, null, 2));
process.exit(allMatch ? 0 : 1);
