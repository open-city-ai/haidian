const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'ai-era-spatial-decision.json');
const base = JSON.parse(fs.readFileSync(source, 'utf8'));
const runner = path.join(__dirname, 'run-ai-era-spatial-decision.js');
const fail = (message) => { throw new Error(`AI-era spatial decision test: ${message}`); };
const deepClone = (value) => JSON.parse(JSON.stringify(value));
const run = (fixture) => {
  const temp = path.join(__dirname, '.ai-era-spatial-decision-fixture.json');
  fs.writeFileSync(temp, JSON.stringify(fixture));
  const original = fs.readFileSync(source, 'utf8');
  fs.writeFileSync(source, JSON.stringify(fixture, null, 2));
  const result = require('child_process').spawnSync(process.execPath, [runner], {encoding: 'utf8'});
  fs.writeFileSync(source, original);
  fs.unlinkSync(temp);
  return result;
};

const positive = require('child_process').spawnSync(process.execPath, [runner], {encoding: 'utf8'});
if (positive.status !== 0) fail(`positive control failed: ${positive.stderr}`);

const fixtures = [
  ['decision_not_hold', (d) => { d.decision = 'ADVANCE'; }],
  ['selected_reject', (d) => { d.selected_alternative = 'ALT-A'; }],
  ['broken_scale', (d) => { d.scales[3].id = 'S250'; }],
  ['missing_right', (d) => { d.rights_matrix.pop(); }],
  ['field_claim', (d) => { d.field_claims = ['unverified_field_fact']; }]
];
for (const [name, mutate] of fixtures) {
  const fixture = deepClone(base);
  mutate(fixture);
  const result = run(fixture);
  if (result.status === 0) fail(`${name} was accepted`);
}

console.log(JSON.stringify({status: 'PASS', positive_controls: 1, negative_fixtures: fixtures.length}, null, 2));
