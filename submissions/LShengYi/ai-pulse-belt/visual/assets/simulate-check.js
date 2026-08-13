#!/usr/bin/env node
/**
 * simulate-check.js — offline re-runnable contract check for simulation.json.
 *
 * Zero dependencies, deterministic, idempotent. Exit code contract:
 *   0 = all contract checks pass
 *   1 = any contract check fails (missing task, wrong variant set, bad receipt)
 *   2 = simulation.json missing or unreadable
 *
 * Usage:  node simulate-check.js  [path-to-simulation.json]
 * Default path: sibling directory ../../simulation.json (package root).
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const argv = process.argv.slice(2);
const simPath = path.resolve(__dirname, "..", "..", "simulation.json");
const filePath = argv[0] ? path.resolve(argv[0]) : simPath;

let sim;
try {
  sim = JSON.parse(fs.readFileSync(filePath, "utf8"));
} catch (e) {
  console.error("E2 simulation.json missing or unreadable:", filePath);
  process.exit(2);
}

const failures = [];

// Contract 1: expected service set (12 scenario cards + 3 validation tests).
const SERVICES = [
  "card-01", "card-02", "card-03", "card-04", "card-05", "card-06",
  "card-07", "card-08", "card-09", "card-10", "card-11", "card-12",
  "test-v2x", "test-delivery", "test-wayfinding",
];

// Contract 2: expected variant set per service (1 qualified + 7 failure branches).
const VARIANTS = [
  "qualified",
  "missing_responsible_role",
  "data_exceeds_declared_ceiling",
  "same_task_human_route_unavailable",
  "cannot_pause",
  "revision_not_public",
  "bequest_dividend_missing",
  "post_exit_service_lapses",
];

const EXPECTED_TASK_COUNT = SERVICES.length * VARIANTS.length; // 15 * 8 = 120
const EXPECTED_FAILURE_BRANCHES = SERVICES.length * (VARIANTS.length - 1); // 105

if (sim.task_count !== EXPECTED_TASK_COUNT) {
  failures.push(`task_count ${sim.task_count} != ${EXPECTED_TASK_COUNT}`);
}
if (sim.failure_branch_count !== EXPECTED_FAILURE_BRANCHES) {
  failures.push(`failure_branch_count ${sim.failure_branch_count} != ${EXPECTED_FAILURE_BRANCHES}`);
}

const seen = new Set();
for (const t of sim.tasks || []) {
  const sid = t.scenario_id;
  if (!SERVICES.includes(sid)) failures.push(`unknown scenario_id ${sid}`);
  const key = `${sid}::${t.test_variant}`;
  if (seen.has(key)) failures.push(`duplicate task ${key}`);
  seen.add(key);
  const expected = t.test_variant === "qualified" ? "rule_check_success" : "negative_blocked";
  if (t.outcome !== expected) failures.push(`${key}: outcome ${t.outcome} != ${expected}`);
  if (t.dispatch_schema_valid !== true) failures.push(`${key}: dispatch_schema_valid != true`);
  if (t.audit_complete !== true) failures.push(`${key}: audit_complete != true`);
  if (t.synthetic !== true) failures.push(`${key}: synthetic != true`);
  if (t.field_run !== false) failures.push(`${key}: field_run != false`);
  const want = crypto
    .createHash("sha256")
    .update(`${sim.seed || ""}|${sid}|${t.test_variant}`)
    .digest("hex");
  if (t.receipt_sha256 !== want) failures.push(`${key}: receipt mismatch`);
}

for (const sid of SERVICES) {
  for (const v of VARIANTS) {
    if (!seen.has(`${sid}::${v}`)) failures.push(`missing task ${sid}::${v}`);
  }
}

if (sim.status !== "offline_complete_field_not_authorized_not_run") {
  failures.push(`status ${sim.status} != offline_complete_field_not_authorized_not_run`);
}

if (failures.length) {
  console.error("E1 contract violations:");
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log(
  `OK ${sim.task_count} tasks, ${sim.failure_branch_count} negative branches, ` +
  `all receipts deterministic, status=${sim.status}`
);
process.exit(0);
