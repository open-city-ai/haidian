#!/usr/bin/env node
/* Deterministic, offline structural check for the v2.5 public-space evidence. */
const fs = require('fs');
const path = require('path');
const here = __dirname;
const root = path.resolve(here, '../..');
const checks = [];
let ok = true;
function check(id, pass, detail) {
  checks.push({ id, status: pass ? 'PASS' : 'FAIL', detail });
  if (!pass) ok = false;
}
function read(name) { return JSON.parse(fs.readFileSync(path.join(here, name), 'utf8')); }
function exists(rel) { return fs.existsSync(path.join(root, rel)); }
const connector = read('public-space-connector-atlas-v25.json');
const conversion = read('developer-community-conversion-v25.json');
function resolveRef(ref) {
  const [rel, id] = String(ref).split('#');
  if (!rel || !id) return false;
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) return false;
  const data = JSON.parse(fs.readFileSync(full, 'utf8'));
  return (data.features || []).some((feature) => feature.properties && feature.properties.id === id);
}
check('ITERATION_CONNECTOR', connector.package_iteration === 'v2.5', connector.package_iteration);
check('ITERATION_CONVERSION', conversion.package_iteration === 'v2.5', conversion.package_iteration);
check('BOUNDARY_CONNECTOR', connector.boundary.official_boundary === false && connector.boundary.geometry_role === 'provisional_constraint' && connector.boundary.operational_status === 'not_authorized_not_run' && connector.boundary.performance_results === null, JSON.stringify(connector.boundary));
check('BOUNDARY_CONVERSION', conversion.boundary.official_boundary === false && conversion.boundary.geometry_role === 'provisional_constraint' && conversion.boundary.operational_status === 'not_authorized_not_run' && conversion.boundary.performance_results === null, JSON.stringify(conversion.boundary));
check('NOT_A_SCORE', connector.not_a_score === true && conversion.not_a_score === true, 'both evidence records remain non-score');
check('DIRECTION_COUNT', connector.directional_strategies.length === 2, String(connector.directional_strategies.length));
check('DIRECTION_IDS', JSON.stringify(connector.directional_strategies.map((item) => item.strategy_id)) === JSON.stringify(['NS-01', 'EW-01']), JSON.stringify(connector.directional_strategies.map((item) => item.strategy_id)));
check('COMPONENT_COUNT', connector.public_space_components.length === 5, String(connector.public_space_components.length));
check('HONOUR_PANELS', connector.honour_display_system.panels.length === 3, String(connector.honour_display_system.panels.length));
check('CONVERSION_STAGES', conversion.conversion_chain.length === 4, String(conversion.conversion_chain.length));
check('ANNUAL_RHYTHM', conversion.annual_activity_system.length === 4, String(conversion.annual_activity_system.length));
const refs = [];
for (const item of connector.directional_strategies) refs.push(...(item.spatial_refs || []));
for (const item of connector.public_space_components) if (item.anchor) refs.push(item.anchor);
check('ANCHORS_RESOLVE', refs.every(resolveRef), `resolved=${refs.filter(resolveRef).length}/${refs.length}`);
check('NO_DIMENSIONS', connector.public_space_components.every((item) => item.dimensions === null), 'component dimensions remain null');
check('FIGURES', ['assets/figures/public-space-operations-v25.png', 'assets/figures/public-space-operations-v25.en.png', 'assets/figures/public-space-operations-v25.svg', 'assets/figures/public-space-operations-v25.en.svg'].every(exists), 'bilingual PNG/SVG board files exist');
console.log(JSON.stringify({ schema_version: '0.1.0', package_iteration: 'v2.5', status: ok ? 'PASS' : 'FAIL', checks, boundary_zh: 'PASS 只证明结构、锚点与边界可离线回读；不证明官方边界、权属、运营、审批、现场绩效或官方评分。', boundary_en: 'PASS proves only structural traceability and declared boundaries; it does not prove official geometry, rights, operation, approval, field performance, or an official score.' }, null, 2));
process.exit(ok ? 0 : 1);
