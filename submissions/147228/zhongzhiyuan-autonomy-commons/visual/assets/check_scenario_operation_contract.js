#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const contractPath = process.env.AUTONOMY_CONTRACT_OVERRIDE || path.join(__dirname, 'scenario-operation-contract.json');
const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const matrix = JSON.parse(fs.readFileSync(path.join(__dirname, 'scenario-operation-matrix.json'), 'utf8'));
const required = contract.required_fields;
const matrixIds = new Set(matrix.rows.map((row) => row.scenario_id));
const failures = [];
if (contract.rows.length !== 14) failures.push('fourteen_contract_rows_required');
for (const row of contract.rows) {
  for (const field of required) {
    if (typeof row[field] !== 'string' || row[field].trim() === '') failures.push(`${row.scenario_id}:missing:${field}`);
  }
  if (!matrixIds.has(row.scenario_id)) failures.push(`${row.scenario_id}:missing_from_operation_matrix`);
  if (row.action_if_fail !== 'hold window and keep human patrol' && !/human|manual|freeze|withdraw|decline|cancel|close|do not open|switch/i.test(row.action_if_fail)) {
    failures.push(`${row.scenario_id}:no_human_fallback_action`);
  }
}
const report = {ok: failures.length === 0, contract_rows: contract.rows.length, matrix_rows: matrix.rows.length, required_fields: required, failures, boundary: contract.status};
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.ok ? 0 : 1;
