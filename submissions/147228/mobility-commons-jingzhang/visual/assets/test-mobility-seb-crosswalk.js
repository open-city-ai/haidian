const fs = require('fs');
const path = require('path');
const {validateCandidate, mutate} = require('./run-mobility-seb-crosswalk.js');

const root = __dirname;
const crosswalk = JSON.parse(fs.readFileSync(path.join(root, 'mobility-seb-crosswalk.json'), 'utf8'));
const atlas = JSON.parse(fs.readFileSync(path.join(root, 'mobility-route-service-atlas.json'), 'utf8'));
const baseline = JSON.parse(fs.readFileSync(path.join(root, 'mobility-public-baseline-contract.json'), 'utf8'));

for (const fixture of crosswalk.negative_fixtures) {
  const errors = validateCandidate(mutate(crosswalk, fixture.mutation), atlas, baseline);
  if (!errors.some((error) => error.endsWith(fixture.expected_fail_code))) throw new Error(`${fixture.id}: expected ${fixture.expected_fail_code}, got ${errors.join(',')}`);
}

console.log(JSON.stringify({ok: true, regressions: crosswalk.negative_fixtures.length, message: 'SEB crosswalk rejects all declared negative fixtures'}));
