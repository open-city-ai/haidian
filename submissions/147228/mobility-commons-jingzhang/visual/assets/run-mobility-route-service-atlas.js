const fs = require('fs');
const path = require('path');

const root = __dirname;
const file = path.join(root, 'mobility-route-service-atlas.json');
const atlas = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
const expectedAreas = ['PROV-KEY-001', 'PROV-KEY-002', 'PROV-KEY-003'];

if (atlas.status !== 'design_only') errors.push('status must remain design_only');
if (atlas.authorization !== 0) errors.push('authorization must remain 0');
if (!Array.isArray(atlas.nodes) || atlas.nodes.length !== 3) errors.push('expected exactly three service nodes');
if (JSON.stringify(atlas.nodes.map((node) => node.key_area_feature_id)) !== JSON.stringify(expectedAreas)) {
  errors.push('key area order must cover PROV-KEY-001/002/003');
}
for (const node of atlas.nodes || []) {
  if (!node.id || !node.spatial_interface) errors.push(`${node.id || 'node'} missing spatial interface`);
  if (!Array.isArray(node.denominators) || node.denominators.length < 3) errors.push(`${node.id} needs three denominators`);
  if (!node.non_ai_equivalent || !node.refusal || !node.fallback) errors.push(`${node.id} missing refusal or fallback contract`);
}
if (!Array.isArray(atlas.handoffs) || atlas.handoffs.length !== 2) errors.push('expected two handoff records');
if (!Array.isArray(atlas.gates) || atlas.gates.length !== 5) errors.push('expected five gates');
if (!Array.isArray(atlas.writeback_fields) || atlas.writeback_fields.length < 8) errors.push('writeback fields incomplete');
if (atlas.field_status.real_route_observations !== 0 || atlas.field_status.real_handoffs !== 0) {
  errors.push('synthetic atlas must not claim field observations');
}

if (errors.length) {
  console.error(JSON.stringify({status: 'FAIL', errors}, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({
  status: 'PASS',
  atlas_id: atlas.atlas_id,
  nodes: atlas.nodes.length,
  handoffs: atlas.handoffs.length,
  gates: atlas.gates.length,
  field_status: atlas.field_status
}, null, 2));
