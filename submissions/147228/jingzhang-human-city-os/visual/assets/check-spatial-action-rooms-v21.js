#!/usr/bin/env node
/* Offline structural check for the v2.1 spatial-action-room board. */
const fs = require('fs');
const path = require('path');

const here = __dirname;
const packageRoot = path.resolve(here, '../..');
const payload = JSON.parse(fs.readFileSync(path.join(here, 'spatial-action-rooms-v21.json'), 'utf8'));
const requiredFiles = [
  'geometry/key_areas.geojson',
  'geometry/constraints.geojson',
  'geometry/public_space.geojson',
  'geometry/roads.geojson',
  'geometry/green_space.geojson',
  'metrics.json',
  'assets/figures/spatial-action-rooms-v21.png',
  'assets/figures/spatial-action-rooms-v21.en.png',
];

const checks = [];
function check(id, ok, detail) { checks.push({ id, status: ok ? 'PASS' : 'FAIL', detail }); }

check('BOUNDARY_DECLARED', payload.official_boundary === false && payload.geometry_role === 'provisional_constraint', 'official_boundary=false and geometry_role=provisional_constraint');
check('AREA_COUNT', Array.isArray(payload.areas) && payload.areas.length === 3, `areas=${payload.areas?.length}`);
check('STAGE_COUNT', Array.isArray(payload.stages) && payload.stages.length === 5, `stages=${payload.stages?.length}`);
const nodeCounts = (payload.areas || []).map((area) => area.nodes?.length || 0);
check('FIVE_NODES_PER_AREA', nodeCounts.length === 3 && nodeCounts.every((count) => count === 5), `node_counts=${nodeCounts.join(',')}`);
check('NO_OPERATIONAL_RESULTS', payload.verification_contract?.performance_results === null && payload.verification_contract?.operational_status === 'not_authorized_not_run', 'performance_results=null; not_authorized_not_run');
for (const rel of requiredFiles) check(`FILE_${rel.replace(/[^A-Z0-9]+/gi, '_').toUpperCase()}`, fs.existsSync(path.join(packageRoot, rel)), rel);

const geometryText = ['geometry/key_areas.geojson', 'geometry/constraints.geojson', 'geometry/public_space.geojson', 'geometry/roads.geojson', 'geometry/green_space.geojson'].map((rel) => fs.readFileSync(path.join(packageRoot, rel), 'utf8')).join('\n');
const metricText = fs.readFileSync(path.join(packageRoot, 'metrics.json'), 'utf8');
for (const area of payload.areas || []) {
  for (const ref of [...(area.geometry_refs || []), ...(area.scenario_refs || [])]) {
    const id = ref.split('#')[1];
    check(`REF_${id}`, geometryText.includes(`"id": "${id}"`) || geometryText.includes(`"id":"${id}"`), ref);
  }
  for (const ref of area.metric_refs || []) {
    const id = ref.replace(/^metric:/, '');
    check(`METRIC_${id}`, metricText.includes(`"${id}"`), ref);
  }
}
const svg = fs.readFileSync(path.join(packageRoot, 'assets/figures/spatial-action-rooms-v21.svg'), 'utf8');
const svgEn = fs.readFileSync(path.join(packageRoot, 'assets/figures/spatial-action-rooms-v21.en.svg'), 'utf8');
check('SVG_BOUNDS_ZH', /viewBox="0 0 1900 1420"/.test(svg), 'viewBox=0 0 1900 1420');
check('SVG_BOUNDS_EN', /viewBox="0 0 1900 1420"/.test(svgEn), 'viewBox=0 0 1900 1420');
check('BILINGUAL_NODE_TITLES', (svg.match(/class="nodehead"/g) || []).length === 15 && (svgEn.match(/class="nodehead"/g) || []).length === 15, '15 node cards in each language');
const banned = /(official redline|engineering section|capacity|implementation commitment|国家标准|工程断面|容量|已确定)/i;
check('BOUNDARY_WORDING', !banned.test(JSON.stringify(payload)) || JSON.stringify(payload).includes('does not'), 'boundary wording is limiting, not claiming implementation');

const ok = checks.every((item) => item.status === 'PASS');
const report = { schema_version: '0.1.0', package_iteration: 'v2.1', status: ok ? 'PASS' : 'FAIL', checks, areas: payload.areas.length, nodes: payload.areas.reduce((sum, area) => sum + area.nodes.length, 0), not_a_score: true, boundary_zh: '离线结构检查不产生官方评分、现场结果、专业批准或实施结论。' };
fs.writeFileSync(path.join(here, 'spatial-action-rooms-v21-evidence.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
process.exit(ok ? 0 : 1);
