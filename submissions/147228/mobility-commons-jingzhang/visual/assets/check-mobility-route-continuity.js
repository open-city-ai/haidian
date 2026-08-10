#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..', '..');
const schema = JSON.parse(fs.readFileSync(path.join(__dirname, 'mobility-route-continuity.schema.json'), 'utf8'));
const nodeRegister = JSON.parse(fs.readFileSync(path.join(__dirname, 'mobility-nodes.json'), 'utf8'));
const target = process.argv[2] || path.join(__dirname, 'example-mobility-route-continuity.json');
const payload = JSON.parse(fs.readFileSync(target, 'utf8'));
const errors = [];
const nodeIds = new Set(nodeRegister.nodes.map((node) => node.id));
const route = schema.route;

function fail(message) { errors.push(message); }
if (payload.contract_id !== schema.contract_id) fail('contract_id mismatch');
if (payload.route_id !== route.route_id) fail('route_id mismatch');
if (payload.baseline !== 'unknown') fail('baseline must remain unknown');
if (payload.field_result !== null) fail('field_result must remain null');
if (payload.authorization !== 'not_authorized') fail('authorization boundary mismatch');
if (payload.non_ai_path !== true) fail('non-AI path is not preserved');
if (!Array.isArray(payload.nodes) || payload.nodes.length !== route.node_ids.length) fail('node coverage/count mismatch');
if (JSON.stringify((payload.nodes || []).map((node) => node.node_id)) !== JSON.stringify(route.node_ids)) fail('node order does not match route contract');
for (const node of payload.nodes || []) {
  if (!nodeIds.has(node.node_id)) fail(`unknown node ${node.node_id}`);
  if (!['open', 'caution', 'blocked'].includes(node.status)) fail(`${node.node_id} status invalid`);
  if (!Number.isFinite(Number(node.gap_ratio)) || Number(node.gap_ratio) < 0 || Number(node.gap_ratio) > 1) fail(`${node.node_id} gap_ratio invalid`);
  if (Number(node.gap_ratio) > route.max_gap_ratio && node.status !== 'blocked') fail(`${node.node_id} exceeds design gap limit without block`);
  if (node.status === 'blocked') fail(`${node.node_id} route is blocked`);
  for (const field of ['handoff_visible', 'human_equivalent', 'non_app_entry']) if (node[field] !== true) fail(`${node.node_id}.${field} is not true`);
}
const readings = payload.readings;
if (!readings || typeof readings !== 'object') fail('readings missing');
for (const reviewer of route.reviewer_classes) {
  const reading = readings?.[reviewer];
  if (!reading) { fail(`missing reviewer class ${reviewer}`); continue; }
  if (!['open', 'caution', 'blocked'].includes(reading.status)) fail(`${reviewer}.status invalid`);
  if (!Number.isFinite(Number(reading.gap_ratio)) || Number(reading.gap_ratio) < 0 || Number(reading.gap_ratio) > 1) fail(`${reviewer}.gap_ratio invalid`);
  if (reading.status === 'blocked' || reading.handoff_visible !== true || reading.human_equivalent !== true || reading.non_app_entry !== true) fail(`${reviewer} does not retain a safe handoff and equivalent path`);
}
if (payload.continuity_state === 'blocked') fail('continuity_state is blocked');
if (Number(payload.gap_ratio) > route.max_gap_ratio) fail('route gap exceeds design limit');
const result = {ok: errors.length === 0, decision: errors.length === 0 ? 'within_design_limit' : 'reopen_or_hold', gap_ratio: payload.gap_ratio, design_limit: route.max_gap_ratio, node_count: payload.nodes?.length || 0, reviewer_classes: route.reviewer_classes, errors, boundary: schema.boundary};
console.log(JSON.stringify(result, null, 2));
process.exitCode = errors.length === 0 ? 0 : 1;
