const fs = require('fs');
const path = require('path');
const vm = require('vm');

const source = fs.readFileSync(path.join(__dirname, 'enterprise-spatial-decision.json'), 'utf8');
const runner = path.join(__dirname, 'run-enterprise-spatial-decision.js');
const original = JSON.parse(source);
const run = (payload) => {
  const dir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'enterprise-spatial-decision-'));
  const json = path.join(dir, 'enterprise-spatial-decision.json');
  fs.writeFileSync(json, JSON.stringify(payload));
  const patched = fs.readFileSync(runner, 'utf8').replace("path.join(__dirname, 'enterprise-spatial-decision.json')", JSON.stringify(json));
  try {
    vm.runInNewContext(patched, { require, console, __dirname: dir, process });
    return true;
  } catch (error) {
    return false;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

if (!run(original)) throw new Error('positive control failed');
const mutations = [
  ['decision-not-hold', (data) => { data.decision = 'READY'; }],
  ['advance-two-alternatives', (data) => { data.alternatives[0].decision = 'ADVANCE_TO_DESIGN_REVIEW'; }],
  ['missing-right', (data) => { data.rights_matrix.pop(); }],
  ['selected-alt-b', (data) => { data.selected_alternative = 'ALT-B'; }],
  ['field-claim', (data) => { data.field_claims.push({ id: 'invented-result' }); }]
];
for (const [label, mutate] of mutations) {
  const data = JSON.parse(JSON.stringify(original));
  mutate(data);
  if (run(data)) throw new Error(`negative fixture unexpectedly passed: ${label}`);
}
console.log(JSON.stringify({ status: 'PASS', positive_controls: 1, negative_fixtures: mutations.length }, null, 2));
