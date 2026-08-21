#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = __dirname;
const runner = path.join(root, 'run-mobility-interface-prototypes.js');
const source = JSON.parse(fs.readFileSync(path.join(root, 'mobility-interface-prototypes.json'), 'utf8'));
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'mobility-interface-prototypes-'));
const run = (name, mutate, expected) => {
  const fixture = JSON.parse(JSON.stringify(source));
  mutate(fixture);
  const file = path.join(temp, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(fixture));
  const result = spawnSync(process.execPath, [runner, file], { encoding: 'utf8' });
  const passed = result.status === 0;
  if (passed !== expected) {
    console.error(`FAIL fixture ${name}: expected ${expected ? 'PASS' : 'FAIL'}, got ${result.status}`);
    console.error(result.stdout, result.stderr);
    process.exit(1);
  }
  console.log(`${expected ? 'PASS' : 'PASS fail-closed'} fixture ${name}`);
};

run('positive-control', () => {}, true);
run('missing-prototype', (fixture) => { fixture.prototypes.pop(); }, false);
run('authorized', (fixture) => { fixture.boundary.authorization = 1; }, false);
run('numeric-dimension', (fixture) => { fixture.scale_contract.numeric_dimensions = { curb_width_m: 4.5 }; }, false);
run('missing-ordinary-route', (fixture) => { fixture.prototypes[1].ordinary_service_first = []; }, false);
run('field-claim', (fixture) => { fixture.field_claims = ['field-observation-1']; }, false);
