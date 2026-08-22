const assert = require('assert');
const path = require('path');
const { spawnSync } = require('child_process');

const runner = path.join(__dirname, 'run-human-city-seb-crosswalk.js');
const result = spawnSync(process.execPath, [runner, '--check'], { encoding: 'utf8' });
assert.strictEqual(result.status, 0, result.stderr || result.stdout);
const evidence = JSON.parse(result.stdout);
assert.strictEqual(evidence.status, 'PASS');
assert.deepStrictEqual(evidence.coverage, { mapped_nodes: 4, field_crosswalk: 5, positive_fixtures: 4, negative_fixtures: 5 });
assert.strictEqual(evidence.positive_results.filter((item) => item.status === 'PASS').length, 4);
assert.strictEqual(evidence.negative_results.filter((item) => item.status === 'REJECT').length, 5);
assert.strictEqual(evidence.claims.official_score, false);
console.log(JSON.stringify({ status: 'PASS', runner: 'run-human-city-seb-crosswalk.js', positive: 4, negative: 5, official_score: false }, null, 2));
