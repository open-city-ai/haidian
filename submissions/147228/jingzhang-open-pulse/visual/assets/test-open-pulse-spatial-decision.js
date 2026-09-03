#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');

const contractPath = path.join(__dirname, 'open-pulse-spatial-decision.json');
const runnerPath = path.join(__dirname, 'run-open-pulse-spatial-decision.js');
const original = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const clone = (value) => JSON.parse(JSON.stringify(value));
const run = (candidate) => {
  const tempPath = path.join('/tmp', `open-pulse-spatial-${process.pid}-${Math.random().toString(16).slice(2)}.json`);
  fs.writeFileSync(tempPath, JSON.stringify(candidate));
  const result = spawnSync(process.execPath, [runnerPath, tempPath], {encoding: 'utf8'});
  fs.unlinkSync(tempPath);
  return result.status === 0;
};

if (!run(original)) throw new Error('positive control did not pass');
const fixtures = [];
const noHold = clone(original); noHold.decision = 'ADVANCE'; fixtures.push(noHold);
const noSelectedAdvance = clone(original); noSelectedAdvance.alternatives[2].decision = 'REVISE'; fixtures.push(noSelectedAdvance);
const duplicateAlternative = clone(original); duplicateAlternative.alternatives[1].id = duplicateAlternative.alternatives[0].id; fixtures.push(duplicateAlternative);
const brokenScale = clone(original); brokenScale.scale_chain[2].scale = '1:250'; fixtures.push(brokenScale);
const missingRight = clone(original); missingRight.rights.pop(); fixtures.push(missingRight);
const fieldClaim = clone(original); fieldClaim.boundary.field_claims = ['observed']; fixtures.push(fieldClaim);
const failures = fixtures.filter(run).length;
if (failures !== 0) throw new Error(`${failures} negative fixture(s) unexpectedly passed`);
console.log(JSON.stringify({status: 'PASS', positive_controls: 1, negative_fixtures: fixtures.length}, null, 2));
