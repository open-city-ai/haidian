#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = __dirname;
const passports = JSON.parse(fs.readFileSync(path.join(root, "memory-boundary-passports.json"), "utf8"));
const routes = JSON.parse(fs.readFileSync(path.join(root, "public-interest-route-tests.json"), "utf8"));
const budget = JSON.parse(fs.readFileSync(path.join(root, "forgetfulness-budget.json"), "utf8"));

const errors = [];
const ids = new Set();
for (const passport of passports.passports || []) {
  if (ids.has(passport.passport_id)) errors.push(`duplicate passport ${passport.passport_id}`);
  ids.add(passport.passport_id);
  for (const key of ["operator_roles", "data_contract", "ordinary_equivalent", "stop_triggers", "release_evidence", "current_decision"]) {
    if (!passport[key] || (Array.isArray(passport[key]) && passport[key].length === 0)) {
      errors.push(`${passport.passport_id} missing ${key}`);
    }
  }
  if (passport.current_decision !== "hold") errors.push(`${passport.passport_id} must remain hold before field evidence`);
}

if ((routes.personas || []).length < 6) errors.push("fewer than six public-interest personas");
if ((budget.data_classes || []).length < 5) errors.push("forgetfulness budget lacks complete data classes");
if (!String(budget.audit && budget.audit.failure_action).includes("restore ordinary service")) {
  errors.push("forgetfulness audit lacks ordinary-service rollback");
}

const result = {
  audit_id: "DM-MBP-OFFLINE-CHECK",
  status: errors.length ? "FAIL" : "PASS",
  evidence_scope: "package structure only; no field performance claimed",
  passport_count: ids.size,
  persona_count: (routes.personas || []).length,
  data_class_count: (budget.data_classes || []).length,
  errors
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
process.exit(errors.length ? 1 : 0);
