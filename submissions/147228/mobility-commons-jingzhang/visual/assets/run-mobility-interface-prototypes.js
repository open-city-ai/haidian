#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(__dirname, 'mobility-interface-prototypes.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
const fail = (message) => errors.push(message);

if (data.decision !== 'HOLD') fail('decision must remain HOLD');
if (data.design_only !== true) fail('design_only must be true');
if (data.boundary?.official_boundary !== false) fail('official_boundary must be false');
if (data.boundary?.authorization !== 0) fail('authorization must remain 0');
if (data.boundary?.field_observations !== 0) fail('field_observations must remain 0');
if (data.boundary?.operational_status !== 'not_authorized_not_run') fail('operational_status must remain not_authorized_not_run');
if (data.boundary?.performance_results !== null) fail('performance_results must remain null');
if (data.scale_contract?.numeric_dimensions !== null) fail('numeric_dimensions must remain null');
if (data.boundary?.public_rank_claim !== false) fail('public_rank_claim must be false');

const prototypes = Array.isArray(data.prototypes) ? data.prototypes : [];
if (prototypes.length !== 3) fail('exactly three prototypes are required');
const ids = new Set();
const areas = new Set();
for (const prototype of prototypes) {
  if (!prototype.id || ids.has(prototype.id)) fail(`prototype id missing or duplicated: ${prototype.id || '<empty>'}`);
  ids.add(prototype.id);
  if (!prototype.key_area) fail(`${prototype.id || '<empty>'} missing key_area`);
  areas.add(prototype.key_area);
  if (!prototype.name_zh || !prototype.name_en) fail(`${prototype.id || '<empty>'} missing bilingual name`);
  if (!Array.isArray(prototype.components) || prototype.components.length < 4) fail(`${prototype.id || '<empty>'} needs at least four spatial components`);
  if (!Array.isArray(prototype.ordinary_service_first) || prototype.ordinary_service_first.length < 3) fail(`${prototype.id || '<empty>'} needs ordinary service first`);
  if (!prototype.ai_role) fail(`${prototype.id || '<empty>'} missing bounded AI role`);
  if (!prototype.owner || !prototype.evidence_required?.length || !prototype.stop_if?.length) fail(`${prototype.id || '<empty>'} missing owner, evidence or stop rule`);
}
if (areas.size !== 3) fail('prototypes must cover three distinct key areas');
if (!Array.isArray(data.shared_review_gates) || data.shared_review_gates.length !== 4) fail('four shared review gates are required');
if (!Array.isArray(data.field_claims) || data.field_claims.length !== 0) fail('field_claims must remain empty');

if (errors.length) {
  console.error('FAIL mobility interface prototypes');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log('PASS mobility interface prototypes: 3 design-only spatial prototypes, 4 fail-closed gates, zero authorization/field claims');
