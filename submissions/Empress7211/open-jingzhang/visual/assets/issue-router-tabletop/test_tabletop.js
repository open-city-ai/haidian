#!/usr/bin/env node
"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { buildRun, evaluate, stable } = require("./run_tabletop.js");

const HERE = __dirname;
const contract = JSON.parse(fs.readFileSync(path.join(HERE, "contract.json"), "utf8"));
const positive = JSON.parse(fs.readFileSync(path.join(HERE, "fixtures.positive.json"), "utf8")).cases[0];

const first = buildRun();
const second = buildRun();
assert.deepStrictEqual(first, second, "repeated runs must be deterministic");
assert.strictEqual(first.synthetic, true);
assert.strictEqual(first.field_run, false);
assert.strictEqual(first.human_decision_required, true);
assert.strictEqual(first.execution_status, "synthetic_offline_rehearsal_complete");
assert.strictEqual(first.all_expectations_matched, true);
assert.deepStrictEqual(first.decision_counts, { HOLD: 5, PASS: 1, RETIRED: 1 });

for (const receipt of first.receipts) {
  assert.strictEqual(receipt.synthetic, true);
  assert.strictEqual(receipt.field_run, false);
  assert.strictEqual(receipt.human_decision_required, true);
  assert.strictEqual(receipt.execution_status, "synthetic_offline_rehearsal_complete");
  assert.strictEqual(receipt.expectation.matched, true);
  assert.ok(receipt.evidence.deletion);
  assert.ok(receipt.evidence.rollback);
  assert.ok(receipt.evidence.restoration);
  assert.ok(receipt.evidence.public_receipt);
}

const undeclared = JSON.parse(JSON.stringify(positive));
undeclared.issue.uncontracted_field = "synthetic-value";
const undeclaredResult = evaluate(contract, undeclared);
assert.strictEqual(undeclaredResult.decision, "HOLD");
assert.ok(undeclaredResult.reasons.includes("UNDECLARED_ISSUE_FIELD:uncontracted_field"));

const fieldRun = JSON.parse(JSON.stringify(positive));
fieldRun.field_run = true;
const fieldRunResult = evaluate(contract, fieldRun);
assert.strictEqual(fieldRunResult.decision, "HOLD");
assert.ok(fieldRunResult.reasons.includes("FIELD_RUN_MUST_BE_FALSE"));

const committed = stable(JSON.parse(fs.readFileSync(path.join(HERE, "receipts.json"), "utf8")));
assert.deepStrictEqual(committed, first, "committed receipts must match the deterministic run");

process.stdout.write("PASS: deterministic, fail-closed Scenario 14 tabletop tests passed (7 fixtures + 2 guard checks).\n");
