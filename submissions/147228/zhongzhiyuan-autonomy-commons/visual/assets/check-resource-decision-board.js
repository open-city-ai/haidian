#!/usr/bin/env node
/* Offline checker for the resource-and-decision board. */
const fs = require('fs');
const path = require('path');
const here = __dirname;
const root = path.resolve(here, '../..');
const data = JSON.parse(fs.readFileSync(path.join(here, 'resource-decision-board.json'), 'utf8'));
const checks = [];
function check(id, pass, detail) { checks.push({ id, status: pass ? 'PASS' : 'FAIL', detail }); }
function svgSize(name) {
  const text = fs.readFileSync(path.join(root, 'assets', 'figures', name), 'utf8');
  const match = text.match(/<svg[^>]+width="(\d+)"[^>]+height="(\d+)"[^>]+viewBox="0 0 (\d+) (\d+)"/);
  return match ? { width: Number(match[1]), height: Number(match[2]), viewWidth: Number(match[3]), viewHeight: Number(match[4]) } : null;
}
function pngSize(name) {
  const bytes = fs.readFileSync(path.join(root, 'assets', 'figures', name));
  if (bytes.length < 24 || bytes.readUInt32BE(0) !== 0x89504e47 || bytes.readUInt32BE(16) === 0) return null;
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}
check('STATUS', data.status === 'conceptual_resource_decision_contract' && data.not_a_score === true, data.status);
check('BOUNDARY', data.official_boundary === false && data.geometry_role === 'provisional_constraint' && data.operational_status === 'not_authorized_not_run', 'provisional and not operational');
check('PRINCIPLES', data.principles.length === 3 && data.principles.every((x) => x.name_zh && x.name_en && x.rule_zh && x.rule_en), `principles=${data.principles.length}`);
check('RESOURCES', data.resource_classes.length === 5 && data.resource_classes.every((x) => [x.name_zh, x.name_en, x.holds_zh, x.holds_en, x.resource_route_zh, x.resource_route_en, x.veto_zh, x.veto_en, x.minimum_evidence_zh, x.minimum_evidence_en].every(Boolean)), `resource_classes=${data.resource_classes.length}`);
check('STAGES', data.decision_stages.length === 4 && data.decision_stages.every((x) => [x.stage_zh, x.stage_en, x.can_propose_zh, x.can_propose_en, x.must_hold_zh, x.must_hold_en, x.decision_zh, x.decision_en, x.stop_zh, x.stop_en].every(Boolean)), `decision_stages=${data.decision_stages.length}`);
check('ANCHORS', data.coverage.key_area_refs.every((ref) => { const [file] = ref.split('#'); return fs.existsSync(path.join(root, file)); }), 'all key-area anchors resolve');
check('FIGURES', ['resource-decision-board.svg', 'resource-decision-board.en.svg'].every((name) => fs.existsSync(path.join(root, 'assets', 'figures', name))), 'bilingual SVG figures exist');
const figurePairs = [
  ['resource-decision-board.svg', 'resource-decision-board.png', 1600, 1100],
  ['resource-decision-board.en.svg', 'resource-decision-board.en.png', 1600, 1100],
  ['autonomy-node-interface.svg', 'autonomy-node-interface.png', 1600, 1060],
  ['autonomy-node-interface.en.svg', 'autonomy-node-interface.en.png', 1600, 1060],
];
const figureDimensionFailures = figurePairs.filter(([svg, png, width, height]) => {
  const source = svgSize(svg);
  const raster = pngSize(png);
  return !source || !raster || source.width !== width || source.height !== height || source.viewWidth !== width || source.viewHeight !== height || raster.width !== width || raster.height !== height;
});
check('FIGURE_DIMENSIONS', figureDimensionFailures.length === 0, figureDimensionFailures.length ? `mismatch=${figureDimensionFailures.map(([svg, png]) => `${svg}/${png}`).join(',')}` : 'SVG and PNG companions preserve native dimensions');
const failed = checks.filter((x) => x.status === 'FAIL');
const result = { schema_version: '0.1.0', generated_by: 'visual/assets/check-resource-decision-board.js', status: failed.length ? 'FAIL' : 'PASS', checks, not_a_score: true, boundary_zh: 'PASS 只证明资源类别、决策权和停止字段可离线复核，不产生预算、许可、主体或运营结论。', boundary_en: 'PASS proves only that resource, decision, and stop fields replay offline; it produces no budget, permit, actor, or operating conclusion.' };
fs.writeFileSync(path.join(here, 'resource-decision-board-evidence.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (failed.length) process.exit(1);
