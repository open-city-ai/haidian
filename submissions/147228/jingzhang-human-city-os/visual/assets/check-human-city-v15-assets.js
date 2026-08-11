#!/usr/bin/env node
/* Read-only deterministic checks for the v1.5 spatial, search, and delivery assets. */
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
function readText(rel) { return fs.readFileSync(path.join(root, rel), 'utf8'); }
function exists(rel) { return fs.existsSync(path.join(root, rel)); }
function round(value) { return Math.round(value * 1e6) / 1e6; }
function svgRectOverflow(rel) {
  const content = fs.readFileSync(path.join(root, rel), 'utf8');
  const viewBox = content.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  if (!viewBox) return ['missing viewBox'];
  const [, viewWidth, viewHeight] = viewBox.map(Number);
  const overflow = [];
  for (const match of content.matchAll(/<rect x="(-?\d+(?:\.\d+)?)" y="(-?\d+(?:\.\d+)?)" width="(\d+(?:\.\d+)?)" height="(\d+(?:\.\d+)?)"/g)) {
    const [, x, y, width, height] = match.map(Number);
    if (x < 0 || y < 0 || x + width > viewWidth || y + height > viewHeight) overflow.push(match[0]);
  }
  return overflow;
}

const search = read('parametric-search.json');
const mainline = read('human-city-mainline.json');
const delivery = read('human-city-delivery-spine.json');
const bilingualAudit = read('bilingual-equivalence-audit.json');
const metrics = read('../../metrics.json').metrics;
const objectiveFns = {
  human_floor: (s) => 0.5 * s.human_community + 0.3 * s.learning_data + 0.2 * s.reversible_meanwhile,
  machine_callability: (s) => s.api_embodied + 0.5 * s.learning_data + 0.5 * s.international_opc,
  reversible_resilience: (s) => s.reversible_meanwhile + s.green_resilience,
  public_access: (s) => s.human_community + 0.4 * s.international_opc + 0.3 * s.green_resilience
};
const samples = search.sampled_candidates || [];
check('SEARCH_STATUS', search.status === 'conceptual_deterministic_search', `status=${search.status}`);
check('SEARCH_SAMPLE_COUNT', samples.length === 128, `samples=${samples.length}`);
check('SITE_AREA_RECONNECT', Math.abs(search.input_contract.site_area_sqm - metrics.site_area_sqm.value) < 1e-9, `search=${search.input_contract.site_area_sqm}; metrics=${metrics.site_area_sqm.value}`);
check('SEARCH_BOUNDARY', search.input_contract.confidence === 'low' && search.boundary_zh.includes('不产生容积率'), 'low confidence and no formal-control claim');
check('SHARES_SUM', samples.every((candidate) => Math.abs(Object.values(candidate.shares).reduce((a, b) => a + b, 0) - 1) < 1e-6), 'all samples sum to one');
check('SHARE_FLOORS', samples.every((candidate) => Object.values(candidate.shares).every((share) => share >= 0.1)), 'all conceptual floors are met');
check('OBJECTIVES_REPLAY', samples.every((candidate) => Object.entries(objectiveFns).every(([id, fn]) => round(fn(candidate.shares)) === candidate.objective_scores[id])), 'all four objective formulas replay');
check('PARETO_IDS_RESOLVE', (search.pareto_front_ids || []).every((id) => [...(search.named_candidates || []), ...samples].some((candidate) => candidate.candidate_id === id)), `pareto=${(search.pareto_front_ids || []).length}`);
check('MAINLINE_SHAPE', mainline.official_boundary === false && mainline.geometry_role === 'provisional_constraint' && mainline.stages.length === 5 && mainline.areas.length === 3, `stages=${mainline.stages.length}; areas=${mainline.areas.length}`);
check('DELIVERY_SHAPE', delivery.status === 'conceptual_governance_not_commitment' && delivery.project_families.length === 5 && delivery.gates.length === 3, `families=${delivery.project_families.length}; gates=${delivery.gates.length}`);
const proposalZh = readText('proposal.md');
const proposalEn = readText('proposal.en.md');
const v15DataRefs = [
  'visual/assets/human-city-mainline.json',
  'visual/assets/parametric-search.json',
  'visual/assets/human-city-delivery-spine.json'
];
const v15FigureStems = [
  'assets/figures/human-city-mainline',
  'assets/figures/parametric-search',
  'assets/figures/human-city-delivery-spine'
];
const v15BilingualRefs = v15DataRefs.every((ref) => proposalZh.includes(ref) && proposalEn.includes(ref)) && v15FigureStems.every((stem) => proposalZh.includes(`${stem}.svg`) && proposalEn.includes(`${stem}.en.svg`));
check('BILINGUAL_AUDIT_ITERATION', bilingualAudit.package_iteration === 'v1.5', `audit=${bilingualAudit.package_iteration}`);
check('BILINGUAL_AUDIT_SCOPE', ['图 16', '图 17', '图 18'].every((label) => bilingualAudit.scope.join(' ').includes(label)) && ['human-city-mainline', 'parametric-search', 'human-city-delivery-spine'].every((name) => bilingualAudit.scope.join(' ').includes(name)), 'v1.5 mainline/search/delivery are named in the audit scope');
check('BILINGUAL_V15_REFS', v15BilingualRefs, 'v1.5 data and figure references occur in both proposal languages');
for (const rel of ['assets/figures/human-city-mainline.svg', 'assets/figures/human-city-mainline.en.svg']) {
  const overflow = svgRectOverflow(rel);
  check(`SVG_RECT_FITS_${rel}`, overflow.length === 0, overflow.length === 0 ? 'all positioned rectangles fit viewBox' : `overflow=${overflow.join(' | ')}`);
}
for (const rel of [
  'assets/figures/human-city-mainline.svg',
  'assets/figures/human-city-mainline.en.svg',
  'assets/figures/parametric-search.svg',
  'assets/figures/parametric-search.en.svg',
  'assets/figures/human-city-delivery-spine.svg',
  'assets/figures/human-city-delivery-spine.en.svg'
]) check(`FILE_${rel}`, exists(rel), rel);

const evidence = {
  schema_version: '0.1.0',
  generated_by: 'visual/assets/check-human-city-v15-assets.js',
  status: ok ? 'PASS' : 'FAIL',
  checks,
  interpretation_zh: 'PASS 只证明 v1.5 图件、候选搜索和交付主线的结构、边界与回接可读；不证明官方评分、现场绩效、批准或实施。',
  interpretation_en: 'PASS proves only that v1.5 figures, search, and delivery spine resolve structurally with declared boundaries; it does not prove official scoring, field performance, approval, or implementation.'
};
console.log(JSON.stringify(evidence, null, 2));
process.exit(ok ? 0 : 1);
