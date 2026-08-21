const fs = require('fs');
const path = require('path');

const root = __dirname;
const file = path.join(root, 'commute-service-equivalence-atlas.json');
const atlas = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
const expected = ['AC-01-LEAVE', 'AC-02-FEEDER', 'AC-03-ARRIVE', 'AC-04-MIDDAY', 'AC-05-RETURN', 'AC-06-REVIEW'];
const ids = atlas.nodes.map((node) => node.id);
if (atlas.schema_version !== 'commute-service-equivalence-atlas-v1') errors.push('schema_version');
if (JSON.stringify(ids) !== JSON.stringify(expected)) errors.push('six activity-chain nodes in order');
if (atlas.nodes.length !== 6) errors.push('node count');
if (atlas.handoffs.length !== 4) errors.push('handoff count');
if (atlas.gates.length !== 5) errors.push('gate count');
if (atlas.writeback_fields.length < 8) errors.push('writeback fields');
for (const node of atlas.nodes) {
  if (!node.key_area || !node.moment_zh || !node.moment_en) errors.push(`${node.id} labels`);
  if (!Array.isArray(node.groups) || node.groups.length < 3) errors.push(`${node.id} groups`);
  if (!Array.isArray(node.denominators) || node.denominators.length < 3) errors.push(`${node.id} denominators`);
  for (const key of ['ai_option', 'non_ai_equivalent', 'acceptance', 'refusal', 'fallback']) {
    if (typeof node[key] !== 'string' || node[key].length < 12) errors.push(`${node.id} ${key}`);
  }
  if (!Array.isArray(node.maintenance_writeback) || node.maintenance_writeback.length < 3) errors.push(`${node.id} maintenance`);
}
if (atlas.status.authorization_count !== 0) errors.push('authorization count must remain zero');
if (atlas.status.field_observation_count !== 0) errors.push('field observation count must remain zero');
if (atlas.status.local_baseline !== 'unknown') errors.push('local baseline must remain unknown');
if (atlas.status.performance_results !== null) errors.push('performance results must remain null');
if (atlas.status.decision !== 'HOLD') errors.push('decision must remain HOLD');
if (errors.length) {
  console.error(`FAIL ${errors.join('; ')}`);
  process.exit(1);
}
console.log(JSON.stringify({
  ok: true,
  atlas_id: atlas.atlas_id,
  nodes: atlas.nodes.length,
  handoffs: atlas.handoffs.length,
  gates: atlas.gates.length,
  writeback_fields: atlas.writeback_fields.length,
  authorization_count: atlas.status.authorization_count,
  field_observation_count: atlas.status.field_observation_count,
  local_baseline: atlas.status.local_baseline,
  decision: atlas.status.decision
}, null, 2));
