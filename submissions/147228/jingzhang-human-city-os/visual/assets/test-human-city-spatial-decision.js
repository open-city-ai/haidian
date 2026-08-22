const fs = require('fs');
const path = require('path');
const child = require('child_process');
const source = path.join(__dirname, 'human-city-spatial-decision.json');
const runner = path.join(__dirname, 'run-human-city-spatial-decision.js');
const base = JSON.parse(fs.readFileSync(source, 'utf8'));
const fail = (message) => { throw new Error(`Human City spatial decision test: ${message}`); };
const clone = (value) => JSON.parse(JSON.stringify(value));
const run = (fixture) => { const original = fs.readFileSync(source, 'utf8'); fs.writeFileSync(source, JSON.stringify(fixture, null, 2)); const result = child.spawnSync(process.execPath, [runner], {encoding: 'utf8'}); fs.writeFileSync(source, original); return result; };
const positive = child.spawnSync(process.execPath, [runner], {encoding: 'utf8'});
if (positive.status !== 0) fail(`positive control failed: ${positive.stderr}`);
const fixtures = [
  ['decision_not_hold', (d) => { d.decision = 'ADVANCE'; }],
  ['selected_reject', (d) => { d.selected_alternative = 'ALT-A'; }],
  ['broken_scale', (d) => { d.scales[2].id = 'S250'; }],
  ['missing_right', (d) => { d.rights_matrix.pop(); }],
  ['field_claim', (d) => { d.field_claims = ['unverified_field_fact']; }]
];
for (const [name, mutate] of fixtures) { const fixture = clone(base); mutate(fixture); const result = run(fixture); if (result.status === 0) fail(`${name} was accepted`); }
console.log(JSON.stringify({status: 'PASS', positive_controls: 1, negative_fixtures: fixtures.length}, null, 2));
