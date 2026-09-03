#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2] || path.join(__dirname, 'open-pulse-spatial-decision.json');
const contract = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const errors = [];
const fail = (message) => errors.push(message);
const nonEmpty = (value) => typeof value === 'string' && value.trim() !== '';

if (contract.decision !== 'HOLD') fail('decision must remain HOLD');
if (contract.design_only !== true) fail('design_only must be true');
const boundary = contract.boundary || {};
if (boundary.official_boundary !== false) fail('official_boundary must be false');
if (boundary.authorization !== 0) fail('authorization must remain 0');
if (boundary.field_observations !== 0) fail('field_observations must remain 0');
if (boundary.local_baseline !== 'unknown') fail('local_baseline must remain unknown');
if (boundary.operational_status !== 'not_authorized_not_run') fail('operational_status must remain not_authorized_not_run');
if (boundary.performance_results !== null) fail('performance_results must remain null');
if (boundary.public_rank_claim !== false) fail('public_rank_claim must be false');
if (!Array.isArray(boundary.field_claims) || boundary.field_claims.length !== 0) fail('field_claims must remain empty');
if (contract.numeric_dimensions !== null) fail('numeric_dimensions must remain null');

const scales = Array.isArray(contract.scale_chain) ? contract.scale_chain : [];
const expectedScales = ['1:5000', '1:2000', '1:500', '1:100', '1:50'];
if (JSON.stringify(scales.map((item) => item && item.scale)) !== JSON.stringify(expectedScales)) fail('scale chain must be 1:5000 -> 1:2000 -> 1:500 -> 1:100 -> 1:50');
if (scales.some((item) => !item || !nonEmpty(item.question))) fail('every scale must have a review question');

const alternatives = Array.isArray(contract.alternatives) ? contract.alternatives : [];
if (alternatives.length !== 3) fail('exactly three alternatives are required');
const alternativeIds = alternatives.map((item) => item && item.id);
if (alternativeIds.some((id) => !nonEmpty(id)) || new Set(alternativeIds).size !== alternativeIds.length) fail('alternative IDs must be unique non-empty strings');
const decisions = alternatives.map((item) => item && item.decision);
if (!decisions.includes('REJECT') || !decisions.includes('REVISE') || !decisions.includes('ADVANCE_TO_DESIGN_REVIEW')) fail('alternatives must include REJECT, REVISE and ADVANCE_TO_DESIGN_REVIEW');
if (alternatives.filter((item) => item && item.selected === true).length !== 1) fail('exactly one alternative must be selected');
const selected = alternatives.find((item) => item && item.selected === true);
if (!selected || selected.decision !== 'ADVANCE_TO_DESIGN_REVIEW') fail('selected alternative must advance only to design review');
if (!selected.interface_ids || selected.interface_ids.length !== 3) fail('selected network must link three existing interfaces');
if (alternatives.some((item) => !item || !nonEmpty(item.reason) || !nonEmpty(item.return_to) || !Array.isArray(item.fail_if) || item.fail_if.length < 2)) fail('each alternative needs reason, return path and fail-closed conditions');

const rights = Array.isArray(contract.rights) ? contract.rights : [];
if (rights.length !== 5) fail('five rights are required');
const rightIds = rights.map((item) => item && item.id);
if (rightIds.some((id) => !nonEmpty(id)) || new Set(rightIds).size !== rightIds.length) fail('right IDs must be unique non-empty strings');
if (rights.some((item) => !item || !nonEmpty(item.label) || !nonEmpty(item.test) || !nonEmpty(item.stop_if))) fail('each right needs a test and stop condition');

const gates = Array.isArray(contract.shared_gates) ? contract.shared_gates : [];
if (gates.length !== 5) fail('five shared gates are required');
const gateIds = gates.map((item) => item && item.id);
if (gateIds.some((id) => !nonEmpty(id)) || new Set(gateIds).size !== gateIds.length) fail('gate IDs must be unique non-empty strings');
if (gates.some((item) => !item || !nonEmpty(item.label) || !nonEmpty(item.pass))) fail('each gate needs a pass rule');

if (errors.length) {
  console.error('FAIL Open Pulse spatial decision');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(JSON.stringify({status: 'PASS', scales: scales.length, alternatives: alternatives.length, selected: selected.id, rights: rights.length, gates: gates.length, field_claims: boundary.field_claims.length}, null, 2));
