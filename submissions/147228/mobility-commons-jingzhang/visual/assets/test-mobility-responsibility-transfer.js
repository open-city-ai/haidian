#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = __dirname;
const sourceContract = path.join(root, 'mobility-responsibility-transfer.json');
const sourceRunner = path.join(root, 'run-mobility-responsibility-transfer.js');
const base = JSON.parse(fs.readFileSync(sourceContract, 'utf8'));

function runFixture(name, mutate) {
  const fixtureDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mobility-responsibility-'));
  const fixtureContract = path.join(fixtureDir, 'mobility-responsibility-transfer.json');
  const fixtureRunner = path.join(fixtureDir, 'run-mobility-responsibility-transfer.js');
  const fixture = JSON.parse(JSON.stringify(base));
  mutate(fixture);
  fs.writeFileSync(fixtureContract, JSON.stringify(fixture, null, 2));
  fs.copyFileSync(sourceRunner, fixtureRunner);
  const result = spawnSync(process.execPath, [fixtureRunner, '--json'], { encoding: 'utf8' });
  if (result.status === 0) {
    throw new Error(`${name}: malformed fixture unexpectedly passed`);
  }
  return { name, status: result.status };
}

const cases = [
  ['duplicate_declared_group', (fixture) => {
    fixture.coverage_groups[1] = fixture.coverage_groups[0];
  }],
  ['empty_unit_mapping', (fixture) => {
    fixture.resource_units[0].coverage_group_ids = [];
  }],
  ['unknown_mapped_group', (fixture) => {
    fixture.resource_units[0].coverage_group_ids.push('unknown_group');
  }],
  ['unmapped_declared_group', (fixture) => {
    fixture.resource_units.forEach((unit) => {
      unit.coverage_group_ids = unit.coverage_group_ids.filter((group) => group !== 'emergency_responder');
    });
  }],
];

const results = cases.map(([name, mutate]) => runFixture(name, mutate));
process.stdout.write(`${JSON.stringify({ ok: true, negative_cases: results }, null, 2)}\n`);
