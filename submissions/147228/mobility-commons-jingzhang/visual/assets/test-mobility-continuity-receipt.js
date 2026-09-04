const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const sourceRoot = __dirname;
const runner = path.join(sourceRoot, 'run-mobility-continuity-receipt.js');
const sourceFile = path.join(sourceRoot, 'mobility-continuity-receipt.json');
const cases = [
  ['duplicate_state_id', (data) => { data.states[1].id = data.states[0].id; }],
  ['missing_human_equivalent', (data) => { data.states[2].human_equivalent = ''; }],
  ['negative_fixture_not_hold', (data) => { data.negative_fixtures[0].expected_decision = 'CONTINUE'; }]
];
const failures = [];

for (const [name, mutate] of cases) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'mobility-continuity-'));
  try {
    const data = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
    mutate(data);
    fs.writeFileSync(path.join(temp, 'mobility-continuity-receipt.json'), JSON.stringify(data));
    const result = spawnSync(process.execPath, [runner], {
      env: {...process.env, MOBILITY_CONTINUITY_ROOT: temp},
      encoding: 'utf8'
    });
    if (result.status === 0) failures.push(`${name} was accepted`);
  } finally {
    fs.rmSync(temp, {recursive: true, force: true});
  }
}

if (failures.length) {
  console.error(JSON.stringify({ok: false, failures}, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ok: true, negative_cases: cases.length}));
