#!/usr/bin/env node

const assert = require('assert');
const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const packageRoot = path.resolve(__dirname, '..', '..');
const runnerSource = path.join(__dirname, 'run-ai-era-spatial-integrity.js');
const fixture = {
  scenario_id: 'SCN-01',
  anchor_index: 0,
  expected_message: 'SCN-01 repeats anchor PUBLIC-01',
};

function run(runnerPath) {
  return childProcess.spawnSync(process.execPath, [runnerPath], {
    encoding: 'utf8',
  });
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'haidian-ai-era-spatial-integrity-'));
try {
  const tempRunnerDir = path.join(tempRoot, 'visual', 'assets');
  fs.mkdirSync(tempRunnerDir, {recursive: true});
  fs.copyFileSync(runnerSource, path.join(tempRunnerDir, 'run-ai-era-spatial-integrity.js'));
  fs.copyFileSync(path.join(packageRoot, 'spatial.json'), path.join(tempRoot, 'spatial.json'));
  fs.cpSync(path.join(packageRoot, 'geometry'), path.join(tempRoot, 'geometry'), {recursive: true});

  const runnerPath = path.join(tempRunnerDir, 'run-ai-era-spatial-integrity.js');
  const baseline = run(runnerPath);
  assert.strictEqual(
    baseline.status,
    0,
    `baseline spatial-integrity runner failed:\n${baseline.stdout}\n${baseline.stderr}`,
  );

  const crosswalkPath = path.join(tempRoot, 'spatial.json');
  const crosswalk = JSON.parse(fs.readFileSync(crosswalkPath, 'utf8'));
  const row = crosswalk.scenario_spatial_crosswalk.find(
    (item) => item.scenario_id === fixture.scenario_id,
  );
  assert.ok(row, `fixture scenario is missing: ${fixture.scenario_id}`);
  const anchor = row.anchors[fixture.anchor_index];
  assert.ok(anchor, `fixture anchor is missing at index ${fixture.anchor_index}`);
  row.anchors.push({...anchor});
  fs.writeFileSync(crosswalkPath, `${JSON.stringify(crosswalk, null, 2)}\n`);

  const duplicate = run(runnerPath);
  const output = `${duplicate.stdout}\n${duplicate.stderr}`;
  assert.notStrictEqual(duplicate.status, 0, 'duplicate anchor fixture unexpectedly passed');
  assert.match(output, new RegExp(fixture.expected_message.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  console.log(`PASS: duplicate anchor fixture rejected (${fixture.expected_message})`);
} finally {
  fs.rmSync(tempRoot, {recursive: true, force: true});
}
