const fs = require("fs");
const path = require("path");
const here = __dirname;
const contract = JSON.parse(fs.readFileSync(path.join(here, "contract.json"), "utf8"));
const fixtureDoc = JSON.parse(fs.readFileSync(path.join(here, "fixtures.json"), "utf8"));
const receipts = fixtureDoc.fixtures.map((fixture) => {
  const missing = contract.required_boolean_inputs.filter((key) => fixture.inputs[key] !== true);
  const actual = missing.length === 0 && fixture.inputs.incident_open === false
    ? "synthetic_contract_pass" : "reject_or_pause";
  return {
    fixture_id: fixture.id,
    contract_id: fixture.contract_id,
    expected: fixture.expected,
    actual,
    matched: actual === fixture.expected,
    blocking_inputs: missing,
    incident_open: fixture.inputs.incident_open,
    tabletop_only: true,
    field_evidence: false
  };
});
const result = {
  schema_version: "1.0.0",
  deterministic: true,
  field_state: contract.field_state,
  claim_boundary: contract.claim_boundary,
  summary: {
    total: receipts.length,
    matched: receipts.filter((item) => item.matched).length,
    synthetic_pass_branches: receipts.filter((item) => item.actual === "synthetic_contract_pass").length,
    rejection_or_pause_branches: receipts.filter((item) => item.actual === "reject_or_pause").length,
    field_runs: 0
  },
  receipts
};
fs.writeFileSync(path.join(here, "receipts.json"), JSON.stringify(result, null, 2) + "\n");
if (result.summary.matched !== result.summary.total) process.exit(1);
console.log(`RC tabletop: ${result.summary.matched}/${result.summary.total} matched; field_runs=0`);
