#!/usr/bin/env node
/* Offline structural checker for the v2.2 reviewer-facing first-screen atlas. */
const fs = require('fs');
const path = require('path');
const here = __dirname;
const root = path.resolve(here, '../..');
const evidence = JSON.parse(fs.readFileSync(path.join(here, 'reviewer-facing-atlas-v22.json'), 'utf8'));
const action = JSON.parse(fs.readFileSync(path.join(here, 'spatial-action-rooms-v21.json'), 'utf8'));
const checks = [];
function check(id, pass, detail) { checks.push({ id, status: pass ? 'PASS' : 'FAIL', detail }); }
check('ITERATION', evidence.package_iteration === 'v2.2', evidence.package_iteration);
check('BOUNDARY', evidence.official_boundary === false && evidence.geometry_role === 'provisional_constraint', 'official_boundary=false; geometry_role=provisional_constraint');
check('AREAS', evidence.areas.length === 3 && action.areas.length === 3, `areas=${evidence.areas.length}`);
check('STAGES', evidence.stages.length === 5 && action.stages.length === 5, `stages=${evidence.stages.length}`);
check('NODES', evidence.areas.every((area) => area.node_count === 5) && action.areas.every((area) => area.nodes.length === 5), '5 nodes per area');
check('GEOMETRY_FILES', evidence.geometry_files.every((file) => fs.existsSync(path.join(root, file))), 'all 7 geometry layers resolve');
check('CORE_PNGS', ['site-overview.png', 'site-overview.en.png'].every((file) => fs.existsSync(path.join(root, 'assets', 'figures', file))), 'reviewer core PNGs exist');
check('STOP_AND_HUMAN', evidence.human_equivalent_visible === true && evidence.stop_return_visible === true, 'human equivalent and stop/return visible');
check('NOT_OPERATIONAL', evidence.operational_status === 'not_authorized_not_run' && evidence.performance_results === null, 'not_authorized_not_run; performance_results=null');
check('TRANSFORM_LIMIT', /pixel distance is not metric evidence/.test(evidence.display_transform), 'display transform is not metric evidence');
check('METRIC_SOURCE', evidence.metrics.source === 'metrics.json#site_area_sqm' && evidence.metrics.confidence, evidence.metrics.source);
const failed = checks.filter((item) => item.status === 'FAIL');
const result = { schema_version: '0.1.0', generated_by: 'check-reviewer-facing-atlas-v22.js', status: failed.length ? 'FAIL' : 'PASS', checks, not_a_score: true, boundary_zh: 'PASS 只证明首屏复合图的结构化引用和声明边界，不产生官方评分、现场结果或实施结论。' };
console.log(JSON.stringify(result, null, 2));
if (failed.length) process.exit(1);
