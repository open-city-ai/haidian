#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = __dirname;
const sourceContract = path.join(root, 'mobility-public-baseline-contract.json');
const sourceRunner = path.join(root, 'run-mobility-public-baseline-contract.js');
const base = JSON.parse(fs.readFileSync(sourceContract, 'utf8'));

function runFixture(name, mutate) {
  const fixtureDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mobility-baseline-'));
  const fixture = JSON.parse(JSON.stringify(base));
  mutate(fixture);
  fs.writeFileSync(path.join(fixtureDir, 'mobility-public-baseline-contract.json'), JSON.stringify(fixture, null, 2));
  const runner = path.join(fixtureDir, 'run-mobility-public-baseline-contract.js');
  fs.copyFileSync(sourceRunner, runner);
  const result = spawnSync(process.execPath, [runner, '--json'], { encoding: 'utf8' });
  if (result.status === 0) throw new Error(`${name}: malformed fixture unexpectedly passed`);
  return { name, status: result.status };
}

const cases = [
  ['duplicate_prototype', (fixture) => { fixture.prototypes[1].id = fixture.prototypes[0].id; }],
  ['missing_blackout_action', (fixture) => { delete fixture.prototypes[0].blackout_action; }],
  ['missing_bequest_asset', (fixture) => { fixture.prototypes[2].bequest_asset = ''; }],
  ['field_status_not_hold', (fixture) => { fixture.field_status.decision = 'CONTINUE'; }],
];
process.stdout.write(`${JSON.stringify({ ok: true, negative_cases: cases.map(([name, mutate]) => runFixture(name, mutate)) }, null, 2)}\n`);
