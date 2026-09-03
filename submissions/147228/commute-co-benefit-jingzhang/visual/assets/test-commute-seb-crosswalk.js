const fs = require('fs');
const path = require('path');
const {validateCandidate, mutate} = require('./run-commute-seb-crosswalk.js');

const root = __dirname;
const crosswalk = JSON.parse(fs.readFileSync(path.join(root, 'commute-seb-crosswalk.json'), 'utf8'));
const atlas = JSON.parse(fs.readFileSync(path.join(root, 'commute-service-equivalence-atlas.json'), 'utf8'));
const contract = JSON.parse(fs.readFileSync(path.join(root, 'responsibility-acceptance-contract.json'), 'utf8'));

for (const fixture of crosswalk.negative_fixtures) {
  const errors = validateCandidate(mutate(crosswalk, fixture.mutation), atlas, contract);
  if (!errors.some((error) => error.endsWith(fixture.expected_fail_code))) throw new Error(`${fixture.id}: expected ${fixture.expected_fail_code}, got ${errors.join(',')}`);
}

console.log(JSON.stringify({ok: true, regressions: crosswalk.negative_fixtures.length, message: 'SEB crosswalk rejects all declared negative fixtures'}));
