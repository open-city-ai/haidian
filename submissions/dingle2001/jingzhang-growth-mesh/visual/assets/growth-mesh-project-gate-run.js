#!/usr/bin/env node
"use strict";
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const dir = __dirname;
const specPath = path.join(dir, "growth-mesh-project-gate.json");
const fixturesPath = path.join(dir, "growth-mesh-project-gate-fixtures.json");
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const suite = JSON.parse(fs.readFileSync(fixturesPath, "utf8"));
if (suite.protocol_id !== spec.protocol_id) throw new Error("protocol_id mismatch");
let matched = 0;
const results = suite.fixtures.map(f => {
  const required = spec.contract_groups[f.group].required_fields;
  const missing = required.filter(name => !f.present_fields.includes(name));
  const actual = missing.length ? "return_to_problem_or_project_library" : "ready_for_professional_and_field_review";
  const ok = actual === f.expected; if (ok) matched++;
  return {fixture_id:f.id, expected:f.expected, actual, missing_fields:missing, matched:ok};
});
const digest = file => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const output = {
  protocol_id: spec.protocol_id,
  status: matched === results.length ? "pass" : "fail",
  synthetic_fixtures: results.length,
  expected_matches: matched,
  field_results_completed: 0,
  protocol_sha256: digest(specPath),
  fixtures_sha256: digest(fixturesPath),
  results,
  boundary: "Synthetic rule execution only; no field performance, approval or implementation claim."
};
process.stdout.write(JSON.stringify(output, null, 2) + "\n");
process.exit(output.status === "pass" ? 0 : 1);
