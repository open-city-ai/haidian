#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..', '..');
const contractPath = process.env.MOBILITY_OPERATION_CONTRACT_OVERRIDE || path.join(__dirname, 'mobility-scenario-operation-contract.json');
const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const cards = JSON.parse(fs.readFileSync(path.join(__dirname, 'scenario-cards.json'), 'utf8')).cards;
const startup = JSON.parse(fs.readFileSync(path.join(__dirname, 'pilot-startup-checklist.json'), 'utf8')).scenarios;
const nodes = new Set(JSON.parse(fs.readFileSync(path.join(__dirname, 'mobility-nodes.json'), 'utf8')).nodes.map((node) => node.id));
const errors = [];
const required = contract.required_fields || [];
const cardIds = new Set(cards.map((card) => card.id));
const startupIds = new Set(startup.map((item) => item.id));
if (contract.status !== 'design_gate_not_field_standard') errors.push('contract status boundary mismatch');
if (!Array.isArray(contract.rows) || contract.rows.length !== 10) errors.push('expected exactly 10 operation rows');
for (const row of contract.rows || []) {
  for (const field of required) if (row[field] === undefined || row[field] === null || (typeof row[field] === 'string' && !row[field].trim()) || (Array.isArray(row[field]) && row[field].length === 0)) errors.push(`${row.scenario_id || '(missing)'}.${field} missing`);
  if (!cardIds.has(row.scenario_id)) errors.push(`${row.scenario_id} missing scenario card`);
  if (!startupIds.has(row.scenario_id)) errors.push(`${row.scenario_id} missing startup checklist`);
  for (const nodeId of row.node_ids || []) if (!nodes.has(nodeId)) errors.push(`${row.scenario_id} unknown node ${nodeId}`);
  for (const evidence of row.evidence_required || []) if (!fs.existsSync(path.join(root, evidence))) errors.push(`${row.scenario_id} missing evidence ${evidence}`);
  if (!/human|public transport|telephone|paper|manual/i.test(row.action_if_fail || '')) errors.push(`${row.scenario_id} lacks explicit fallback action`);
  if (!row.non_ai_equivalent || !row.owner_role) errors.push(`${row.scenario_id} lacks owner/non-AI equivalent`);
}
for (const id of cardIds) if (!(contract.rows || []).some((row) => row.scenario_id === id)) errors.push(`${id} not covered by operation contract`);
const result = {ok: errors.length === 0, contract_rows: contract.rows?.length || 0, card_rows: cards.length, startup_rows: startup.length, required_fields: required, failures: errors, boundary: contract.boundary};
console.log(JSON.stringify(result, null, 2));
process.exitCode = errors.length === 0 ? 0 : 1;
