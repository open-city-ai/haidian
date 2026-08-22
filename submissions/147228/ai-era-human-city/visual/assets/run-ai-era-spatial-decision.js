const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'ai-era-spatial-decision.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const fail = (message) => { throw new Error(`AI-era spatial decision: ${message}`); };
const exact = (actual, expected, label) => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(`${label} mismatch`);
};

if (data.decision !== 'HOLD') fail('decision must remain HOLD');
if (data.claim_level !== 'local_synthetic_tabletop') fail('claim level must stay synthetic');
if (data.boundary.official_boundary !== false || data.boundary.geometry_role !== 'provisional_constraint') fail('boundary must remain provisional');
if (data.boundary.authorization !== 0 || data.boundary.field_observations !== 0) fail('field state must remain zero');
if (data.boundary.local_baseline !== 'unknown' || data.boundary.result_status !== 'not_run') fail('baseline/result must remain not run');
if (data.boundary.operational_status !== 'not_authorized_not_run') fail('operational state must remain unauthorized');
if (data.boundary.public_rank_claim !== false || data.boundary.numeric_dimensions !== null) fail('public/range claims must remain closed');
if (!Array.isArray(data.scales) || data.scales.length !== 5) fail('expected five design scales');
exact(data.scales.map((item) => item.id), ['S5000', 'S2000', 'S500', 'S100', 'S50'], 'scale IDs');
if (!Array.isArray(data.alternatives) || data.alternatives.length !== 3) fail('expected three alternatives');
exact(data.alternatives.map((item) => item.id), ['ALT-A', 'ALT-B', 'ALT-C'], 'alternative IDs');
exact(data.alternatives.map((item) => item.decision), ['REJECT', 'REVISE', 'ADVANCE_TO_DESIGN_REVIEW'], 'alternative decisions');
if (data.selected_alternative !== 'ALT-C') fail('selected alternative must be ALT-C');
if (!Array.isArray(data.nodes) || data.nodes.length !== 3) fail('expected three spatial nodes');
if (!Array.isArray(data.rights_matrix) || data.rights_matrix.length !== 5) fail('expected five rights rows');
if (!Array.isArray(data.shared_gates) || data.shared_gates.length !== 5) fail('expected five shared gates');
if (!Array.isArray(data.positive_controls) || data.positive_controls.length !== 3) fail('expected three positive controls');
if (!Array.isArray(data.negative_fixtures) || data.negative_fixtures.length !== 5) fail('expected five negative fixtures');
if (!Array.isArray(data.field_claims) || data.field_claims.length !== 0) fail('field claims must remain empty');

console.log(JSON.stringify({
  status: 'PASS',
  scales: data.scales.length,
  alternatives: data.alternatives.length,
  selected: data.selected_alternative,
  nodes: data.nodes.length,
  rights: data.rights_matrix.length,
  gates: data.shared_gates.length,
  field_claims: data.field_claims.length
}, null, 2));
