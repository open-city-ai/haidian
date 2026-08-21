#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(__dirname, 'mobility-spatial-options.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
const fail = (message) => errors.push(message);
const expectedAreas = ['PROV-KEY-001', 'PROV-KEY-002', 'PROV-KEY-003'];
const expectedScales = ['1:5000', '1:2000', '1:500', '1:100', '1:50'];
const expectedRights = ['R1', 'R2', 'R3', 'R4', 'R5'];

if (data.decision !== 'HOLD') fail('decision must remain HOLD');
if (data.design_only !== true) fail('design_only must be true');
if (data.boundary?.official_boundary !== false) fail('official_boundary must be false');
if (data.boundary?.authorization !== 0) fail('authorization must remain 0');
if (data.boundary?.field_observations !== 0) fail('field_observations must remain 0');
if (data.boundary?.operational_status !== 'not_authorized_not_run') fail('operational_status must remain not_authorized_not_run');
if (data.boundary?.performance_results !== null) fail('performance_results must remain null');
if (data.boundary?.public_rank_claim !== false) fail('public_rank_claim must be false');
if (data.comparison_scope?.numeric_dimensions !== null) fail('numeric_dimensions must remain null');

const scales = Array.isArray(data.comparison_scope?.scale_chain) ? data.comparison_scope.scale_chain : [];
if (scales.length !== expectedScales.length) fail('exactly five review scales are required');
if (JSON.stringify(scales.map((item) => item.scale)) !== JSON.stringify(expectedScales)) fail('scale chain must be 1:5000, 1:2000, 1:500, 1:100, 1:50');
for (const scale of scales) {
  if (scale.construction_claim !== false) fail(`${scale.id || 'scale'} must not make a construction claim`);
  if (!scale.review) fail(`${scale.id || 'scale'} needs a review purpose`);
}

const alternatives = Array.isArray(data.alternatives) ? data.alternatives : [];
if (alternatives.length !== 4) fail('exactly four system alternatives are required');
const ids = new Set();
const statuses = new Set();
for (const alternative of alternatives) {
  if (!alternative.id || ids.has(alternative.id)) fail(`alternative id missing or duplicated: ${alternative.id || '<empty>'}`);
  ids.add(alternative.id);
  statuses.add(alternative.status);
  if (!alternative.label_zh || !alternative.label_en) fail(`${alternative.id || '<empty>'} needs bilingual labels`);
  if (JSON.stringify(alternative.key_area_ids) !== JSON.stringify(expectedAreas)) fail(`${alternative.id || '<empty>'} must cover all three key areas in order`);
  if (!Array.isArray(alternative.spatial_moves) || alternative.spatial_moves.length < 3) fail(`${alternative.id || '<empty>'} needs three spatial moves`);
  if (!Array.isArray(alternative.hard_gate_results) || alternative.hard_gate_results.length !== 5) fail(`${alternative.id || '<empty>'} needs five hard-gate results`);
  if (!Array.isArray(alternative.evidence_required) || alternative.evidence_required.length < 5) fail(`${alternative.id || '<empty>'} needs at least five evidence inputs`);
  if (!Array.isArray(alternative.stop_if) || alternative.stop_if.length < 3) fail(`${alternative.id || '<empty>'} needs at least three stop rules`);
  if (!alternative.return_to || !alternative.decision_basis) fail(`${alternative.id || '<empty>'} needs return_to and decision_basis`);
  if (alternative.status === 'ADVANCE_TO_DESIGN_REVIEW' && (!alternative.ordinary_route_first || !alternative.human_equivalent || !alternative.reversible)) fail('the advancing option must be ordinary-first, human-equivalent and reversible');
}
for (const required of ['REJECT', 'REVISE', 'ADVANCE_TO_DESIGN_REVIEW']) {
  if (!statuses.has(required)) fail(`missing required decision status ${required}`);
}
if (data.review_readout?.selected_concept !== 'S1-GROUND-FIRST') fail('selected concept must be S1-GROUND-FIRST');
if (data.review_readout?.selected_status !== 'ADVANCE_TO_DESIGN_REVIEW') fail('selected status must be ADVANCE_TO_DESIGN_REVIEW');

const rights = Array.isArray(data.rights_contract) ? data.rights_contract : [];
if (rights.length !== 5) fail('exactly five rights rows are required');
if (JSON.stringify(rights.map((item) => item.id)) !== JSON.stringify(expectedRights)) fail('rights rows must be ordered R1 through R5');
for (const right of rights) {
  if (!right.label_zh || !right.label_en || !right.minimum || !right.failure_action) fail(`${right.id || 'right'} is incomplete`);
}
if (!Array.isArray(data.field_claims) || data.field_claims.length !== 0) fail('field_claims must remain empty');

if (errors.length) {
  console.error('FAIL mobility spatial options');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log('PASS mobility spatial options: 4 alternatives, 5 scales, 5 rights rows, 3 key areas, HOLD boundary');
