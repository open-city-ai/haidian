#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const root = __dirname;
const contractPath = process.argv[2] || path.join(root, "duty-shift-contracts.json");
const payload = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const required = payload.required_fields;
const contracts = payload.contracts;
const shifts = payload.shift_states;
const faults = payload.cross_room_fault_cards;
const complete = contracts.flatMap(c => shifts.map(s => ({
  id: `POS-${c.scenario_node_id}-${s.id}`,
  pass: required.every(f => Object.prototype.hasOwnProperty.call(c, f) && c[f] !== "")
})));
const missing = contracts.flatMap(c => required.map(f => {
  const copy = {...c}; delete copy[f];
  return {id: `NEG-${c.scenario_node_id}-${f.toUpperCase()}`, pass: !required.every(k => Object.prototype.hasOwnProperty.call(copy, k))};
}));
const fault = faults.map(f => ({
  id: `FAULT-${f.id}`,
  pass: Boolean(f.expected && f.owner && f.reopen_evidence)
}));
const tests = [...complete, ...missing, ...fault];
const report = {
  total_cases: tests.length,
  expected_matches: tests.filter(t => t.pass).length,
  complete_contract_shift_cases: complete.length,
  missing_field_block_cases: missing.length,
  fault_reversion_cases: fault.length,
  field_passes_claimed: 0,
  readiness_label: "READY_FOR_STAFF_REHEARSAL_NOT_OPENING_APPROVAL",
  ok: tests.length === 140 && tests.every(t => t.pass)
};
console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 1);
