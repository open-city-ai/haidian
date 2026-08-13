const fs = require('fs');
const path = require('path');

const root = __dirname;
const fixture = JSON.parse(fs.readFileSync(path.join(root, 'synthetic-proof-cases.json'), 'utf8'));
const order = ['provenance', 'consent', 'access', 'review', 'rollback', 'stewardship'];
const results = fixture.cases.map((item) => {
  const decision = order.every((key) => item.gates[key]) ? 'proof_ready' : 'return_for_retranslation';
  return {case_id: item.case_id, decision, expected: item.expected, pass: decision === item.expected};
});
const evidence = {
  generated_by: 'visual/assets/run-six-gate-proofing.js',
  network_access: false,
  synthetic_only: true,
  field_pilot_status: 'not_started',
  gate_order: order,
  result_count: results.length,
  pass_count: results.filter((item) => item.pass).length,
  results
};
fs.writeFileSync(path.join(root, 'six-gate-proof-evidence.json'), JSON.stringify(evidence, null, 2) + '\n');
if (evidence.pass_count !== evidence.result_count) process.exitCode = 1;
console.log(`Six-Gate Civic Proofing: ${evidence.pass_count}/${evidence.result_count} synthetic paths passed`);
