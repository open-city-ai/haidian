#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(__dirname, 'open-pulse-release-interface-prototypes.json');
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
if (data.boundary?.public_rank_claim !== false) fail('public_rank_claim must be false');
if (data.scale_contract?.numeric_dimensions !== null) fail('numeric_dimensions must remain null');

const interfaces = Array.isArray(data.interfaces) ? data.interfaces : [];
if (interfaces.length !== 3) fail('exactly three release interfaces are required');
const ids = new Set();
const areas = new Set();
for (const item of interfaces) {
  if (!item.id || ids.has(item.id)) fail(`interface id missing or duplicated: ${item.id || '<empty>'}`);
  ids.add(item.id);
  if (!item.key_area) fail(`${item.id || '<empty>'} missing key_area`);
  areas.add(item.key_area);
  if (!item.name_zh || !item.name_en) fail(`${item.id || '<empty>'} missing bilingual name`);
  if (!Array.isArray(item.state_sequence) || item.state_sequence.join('|') !== 'BASE|BOOST|BLACKOUT|BEQUEST') fail(`${item.id || '<empty>'} state sequence is not reversible`);
  if (!Array.isArray(item.components) || item.components.length < 4) fail(`${item.id || '<empty>'} needs at least four spatial components`);
  if (!Array.isArray(item.ordinary_service_first) || item.ordinary_service_first.length < 3) fail(`${item.id || '<empty>'} needs ordinary service first`);
  if (!item.ai_role || !item.owner || !item.evidence_required?.length || !item.stop_if?.length) fail(`${item.id || '<empty>'} missing bounded role, owner, evidence or stop rule`);
}
if (areas.size !== 3) fail('interfaces must cover three distinct key areas');
if (!Array.isArray(data.shared_review_gates) || data.shared_review_gates.length !== 4) fail('four shared review gates are required');
if (!Array.isArray(data.field_claims) || data.field_claims.length !== 0) fail('field_claims must remain empty');

if (errors.length) {
  console.error('FAIL Open Pulse release interfaces');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log('PASS Open Pulse release interfaces: 3 design-only spatial interfaces, reversible four-state sequence, zero authorization/field claims');
