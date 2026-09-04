#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const { validate } = require('./run-mobility-release-chain.js');

const packageRoot = path.resolve(__dirname, '..', '..');
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'mobility-release-chain-'));
const assetRoot = path.join(tempRoot, 'visual', 'assets');
const figureRoot = path.join(tempRoot, 'assets', 'figures');
fs.mkdirSync(assetRoot, { recursive: true });
fs.mkdirSync(figureRoot, { recursive: true });
for (const file of ['mobility-first-168h.json', 'mobility-first-12-weeks.json', 'mobility-release-evidence-map.json', 'mobility-public-baseline-contract.json', 'mobility-route-service-atlas.json', 'mobility-continuity-receipt.json', 'mobility-responsibility-transfer.json']) {
  fs.copyFileSync(path.join(packageRoot, 'visual', 'assets', file), path.join(assetRoot, file));
}
for (const file of ['mobility-release-chain.svg', 'mobility-release-chain.en.svg']) fs.writeFileSync(path.join(figureRoot, file), '<svg/>');
for (const file of ['proposal.md', 'sources.json', 'assumptions.json', 'metrics.json', 'visual/index.html', 'geometry/key_areas.geojson', 'visual/assets/implementation-operation-contract.json']) {
  const target = path.join(tempRoot, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, '{}');
}

function assertFixture(name, mutate) {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), `mobility-release-${name}-`));
  fs.cpSync(tempRoot, fixtureRoot, { recursive: true });
  mutate(fixtureRoot);
  const result = validate(fixtureRoot);
  if (result.ok) throw new Error(`${name} unexpectedly passed`);
  console.log(`PASS ${name}: failed closed`);
}

const base = validate(tempRoot);
if (!base.ok) throw new Error('positive control failed');
console.log('PASS positive-control: valid release chain');
assertFixture('missing-horizon', root => {
  const file = path.join(root, 'visual/assets/mobility-first-168h.json');
  const value = JSON.parse(fs.readFileSync(file, 'utf8'));
  value.horizons.pop();
  fs.writeFileSync(file, JSON.stringify(value));
});
assertFixture('non-hold-decision', root => {
  const file = path.join(root, 'visual/assets/mobility-first-12-weeks.json');
  const value = JSON.parse(fs.readFileSync(file, 'utf8'));
  value.default_decision = 'RELEASE';
  fs.writeFileSync(file, JSON.stringify(value));
});
assertFixture('unauthorized-state', root => {
  const file = path.join(root, 'visual/assets/mobility-release-evidence-map.json');
  const value = JSON.parse(fs.readFileSync(file, 'utf8'));
  value.authorization = 1;
  fs.writeFileSync(file, JSON.stringify(value));
});
assertFixture('missing-artifact', root => {
  fs.unlinkSync(path.join(root, 'assets/figures/mobility-release-chain.svg'));
});
