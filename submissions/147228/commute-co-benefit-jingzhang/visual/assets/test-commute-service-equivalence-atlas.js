const fs = require('fs');
const path = require('path');
const {validateAtlas} = require('./run-commute-service-equivalence-atlas.js');

const atlasPath = path.join(__dirname, 'commute-service-equivalence-atlas.json');
const original = JSON.parse(fs.readFileSync(atlasPath, 'utf8'));

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function expectFailure(label, mutate) {
  const candidate = clone(original);
  mutate(candidate);
  const errors = validateAtlas(candidate);
  if (!errors.length) throw new Error(`${label}: mutation was not rejected`);
}

expectFailure('duplicate handoff', (candidate) => {
  candidate.handoffs[3] = clone(candidate.handoffs[0]);
});
expectFailure('wrong gate meaning', (candidate) => {
  candidate.gates[0] = 'model confidence threshold';
});
expectFailure('missing negative fixture', (candidate) => {
  candidate.negative_cases.pop();
});

console.log(JSON.stringify({ok: true, regressions: 3, message: 'contract mutations rejected'}));
