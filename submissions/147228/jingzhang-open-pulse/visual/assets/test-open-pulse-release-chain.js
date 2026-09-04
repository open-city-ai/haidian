const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const runner = path.join(__dirname, 'run-open-pulse-release-chain.js');
const source = path.join(__dirname, 'open-pulse-release-chain.json');
const original = JSON.parse(fs.readFileSync(source, 'utf8'));

function runFixture(name, mutate, expected) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'open-pulse-release-'));
  const fixture = path.join(tempDir, `${name}.json`);
  const copy = JSON.parse(JSON.stringify(original));
  mutate(copy);
  fs.writeFileSync(fixture, JSON.stringify(copy));
  const result = spawnSync(process.execPath, [runner, fixture], { encoding: 'utf8' });
  const failedClosed = result.status !== 0;
  if (failedClosed !== expected) throw new Error(`${name}: unexpected status ${result.status}`);
  console.log(`PASS ${name}: ${expected ? 'failed closed' : 'valid'}`);
}

runFixture('positive-control', () => {}, false);
runFixture('missing-horizon', (data) => { data.first_168h.pop(); }, true);
runFixture('non-hold-decision', (data) => { data.default_decision = 'BOOST'; }, true);
runFixture('unauthorized-state', (data) => { data.boundary.authorization = 1; }, true);
runFixture('field-claim', (data) => { data.review_dimensions[0].field_claims = ['observed']; }, true);
runFixture('empty-evidence', (data) => { data.first_168h[0].evidence = []; }, true);
runFixture('duplicate-state', (data) => { data.states[1].id = data.states[0].id; }, true);
runFixture('invalid-window', (data) => { data.first_168h[2].window = '72-168h'; }, true);
runFixture('non-string-fallback', (data) => { data.first_12_weeks[0].fallback = null; }, true);
runFixture('missing-base-mode', (data) => { data.ordinary_service_first.base_modes.pop(); }, true);
