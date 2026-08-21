#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = __dirname;
const runner = path.join(root, 'run-open-pulse-release-interface-prototypes.js');
const source = JSON.parse(fs.readFileSync(path.join(root, 'open-pulse-release-interface-prototypes.json'), 'utf8'));
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'open-pulse-release-interfaces-'));
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
run('missing-interface', (fixture) => { fixture.interfaces.pop(); }, false);
run('wrong-state', (fixture) => { fixture.interfaces[0].state_sequence = ['BASE', 'BOOST', 'RUN']; }, false);
run('authorized', (fixture) => { fixture.boundary.authorization = 1; }, false);
run('numeric-dimension', (fixture) => { fixture.scale_contract.numeric_dimensions = { room_width_m: 4.0 }; }, false);
run('field-claim', (fixture) => { fixture.field_claims = ['field-observation-1']; }, false);
