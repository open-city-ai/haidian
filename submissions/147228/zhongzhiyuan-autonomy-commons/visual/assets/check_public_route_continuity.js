#!/usr/bin/env node
/* Fail-closed checker for the autonomy package's public-route contract. */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const contract = JSON.parse(fs.readFileSync(path.join(__dirname, 'public-route-continuity.schema.json'), 'utf8'));
const file = process.argv[2] || 'visual/assets/example-public-route-continuity.json';
const record = JSON.parse(fs.readFileSync(path.resolve(ROOT, file), 'utf8'));

function fail(reason, details = {}) {
  console.log(JSON.stringify({ok: false, decision: 'out_of_tolerance_reopen', reason, ...details}, null, 2));
  process.exitCode = 1;
}

const requiredClasses = contract.required_reviewer_classes;
const nodeIds = [...new Set(record.node_ids || [])];
const readings = Array.isArray(record.readings) ? record.readings : [];
if (record.contract_id !== contract.contract_id) fail('contract_id_mismatch');
else if (nodeIds.length < contract.required_node_count) fail('three_distinct_nodes_required');
else if (record.baseline !== 'unknown' || record.field_result !== null) fail('field_boundary_must_stay_unknown_and_null');
else if (record.non_ai_path_available !== true) fail('non_ai_equivalent_path_is_required');
else {
  const missing = [];
  for (const nodeId of nodeIds) {
    const nodeReadings = readings.filter((r) => r.node_id === nodeId);
    for (const reviewerClass of requiredClasses) {
      const rows = nodeReadings.filter((r) => r.reviewer_class === reviewerClass);
      if (rows.length !== 1) missing.push(`${nodeId}:${reviewerClass}`);
    }
  }
  if (missing.length) fail('exactly_one_reading_per_node_and_reviewer_required', {missing});
  else {
    const invalidStates = readings.filter((r) => !['continuous', 'caution', 'blocked'].includes(r.route_state));
    if (invalidStates.length) {
      fail('route_state_must_be_continuous_caution_or_blocked', {count: invalidStates.length});
      return;
    }
    const degraded = readings.filter((r) => r.route_state !== 'continuous' || r.handoff_visible !== true);
    const blocking = readings.filter((r) => r.route_state === 'blocked' || r.handoff_visible !== true);
    const gapRatio = readings.length ? degraded.length / readings.length : 1;
    const withinLimit = gapRatio <= contract.design_limit.max_gap_ratio;
    const decision = blocking.length === 0 && withinLimit ? 'within_design_limit' : 'out_of_tolerance_reopen';
    console.log(JSON.stringify({
      ok: decision === 'within_design_limit',
      decision,
      gap_ratio: Number(gapRatio.toFixed(6)),
      design_limit: contract.design_limit.max_gap_ratio,
      node_count: nodeIds.length,
      reviewer_classes: requiredClasses,
      synthetic_fixture: record.synthetic_fixture === true,
      boundary: {baseline: record.baseline, field_result: record.field_result, authorization: record.authorization}
    }, null, 2));
    if (decision !== 'within_design_limit') process.exitCode = 1;
  }
}
