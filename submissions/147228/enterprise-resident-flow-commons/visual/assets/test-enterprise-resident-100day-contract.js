#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '../..');
const source = path.join(root, 'visual/assets/enterprise-resident-100day-contract.json');
const runner = path.join(root, 'visual/assets/run-enterprise-resident-100day-contract.js');
const baseline = JSON.parse(fs.readFileSync(source, 'utf8'));
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'erf-100day-'));
const run = (value) => {
  const file = path.join(tempDir, 'fixture.json');
  fs.writeFileSync(file, JSON.stringify(value));
  try {
    execFileSync(process.execPath, [runner, file], {cwd: root, stdio: 'pipe'});
    return true;
  } catch {
    return false;
  }
};
const assert = (condition, label) => {
  if (!condition) {
    console.error(`FAIL ${label}`);
    process.exit(1);
  }
  console.log(`PASS ${label}`);
};

assert(run(baseline), 'positive-control');

const cases = [
  ['decision-not-hold', (value) => { value.decision = 'READY'; }],
  ['unauthorized', (value) => { value.boundary.authorization = 1; }],
  ['missing-resident-return', (value) => { delete value.delivery_windows[1].resident_deliverable; }],
  ['blackout-without-public-route', (value) => { value.delivery_windows[3].acceptance_checks = ['digital_layer_stopped']; }],
  ['field-claim', (value) => { value.field_claims = ['resident_route_is_safe']; }]
];
for (const [label, mutate] of cases) {
  const value = JSON.parse(JSON.stringify(baseline));
  mutate(value);
  assert(!run(value), `fail-closed fixture ${label}`);
}
console.log('PASS all Enterprise-resident 100-day negative fixtures');
