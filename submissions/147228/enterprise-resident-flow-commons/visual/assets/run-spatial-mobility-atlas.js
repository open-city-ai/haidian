#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const inputPath = path.join(dir, 'spatial-mobility-atlas.json');
const atlas = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const outPath = path.join(dir, 'spatial-mobility-atlas-readout.json');
const boardDir = path.join(dir, '..', '..', 'assets', 'figures');
const boardZh = path.join(boardDir, 'spatial-mobility-atlas-board.svg');
const boardEn = path.join(boardDir, 'spatial-mobility-atlas-board.en.svg');

const expectedKeys = ['PROV-KEY-001', 'PROV-KEY-002', 'PROV-KEY-003'];
const expectedWindows = ['AM_ARRIVAL', 'MIDDAY_SERVICE', 'PM_RETURN', 'NIGHT_RETURN'];
const checks = [];
function check(id, ok, detail) { checks.push({ id, status: ok ? 'PASS' : 'FAIL', detail }); }
function unique(items) { return new Set(items).size === items.length; }
function esc(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

check('schema', atlas.schema_version === '1.0-spatial-mobility-atlas', `schema=${atlas.schema_version}`);
check('population_reference', atlas.population_reference?.value === 3122000 && atlas.population_reference?.unit === 'synthetic_agents_reference', '3,122,000 is a synthetic replay reference');
check('key_area_set', JSON.stringify(atlas.geometry_boundary?.key_area_ids) === JSON.stringify(expectedKeys), 'three provisional key-area IDs are explicit');
check('window_set', JSON.stringify(atlas.windows?.map(w => w.id)) === JSON.stringify(expectedWindows), 'four time windows are explicit');
check('cell_count', atlas.cells?.length === 12, `cells=${atlas.cells?.length}`);
check('cell_identity', unique(atlas.cells.map(c => c.id)) && atlas.cells.every(c => expectedKeys.includes(c.key_area_id) && expectedWindows.includes(c.window_id)), 'unique IDs and known key-area/window IDs');
check('one_cell_per_slot', new Set(atlas.cells.map(c => `${c.key_area_id}:${c.window_id}`)).size === 12, 'every key-area/window slot has one decision cell');
check('synthetic_boundaries', atlas.cells.every(c => c.synthetic_screen.status === 'synthetic_counterfactual' && c.synthetic_screen.air_agents === 0), 'all screen values are synthetic and air agents stay zero');
check('hard_guards', atlas.cells.every(c => c.synthetic_screen.feeder_share <= atlas.hard_guards.max_feeder_share && c.synthetic_screen.worst_group_access_delta >= atlas.hard_guards.max_worst_group_access_delta), 'feeder and worst-group synthetic guards pass');
check('human_decisions', atlas.cells.every(c => c.human_decision_question_zh && c.human_decision_question_en && c.decision_owner?.length), 'each cell names a human question and proposed owner');
check('evidence_requests', atlas.cells.every(c => c.required_evidence?.length && c.stop_condition), 'each cell has evidence requests and a stop condition');
check('air_gate', atlas.policy.air_status === 'blocked' && atlas.policy.air_agents === 0 && atlas.hard_guards.air_agents_must_be_zero, 'air candidate is fail-closed and outside operations');
check('field_claim_guard', !JSON.stringify(atlas.cells).match(/field demand|resident satisfaction|operating permit|public acceptance/i), 'decision cells contain no local field or approval claim');

const passed = checks.filter(c => c.status === 'PASS').length;
const blocked = atlas.cells.filter(c => c.release === 'hold').length;
const conditional = atlas.cells.filter(c => c.release === 'conditional_review').length;
const readout = {
  screen_id: atlas.screen_id,
  status: checks.every(c => c.status === 'PASS') ? 'PASS_WITH_CONDITIONAL_CELLS' : 'FAIL',
  status_boundary: 'supplemental design-decision layer; not a core validator gate, score, gallery-promotion or operating authorization',
  generated_at: '2026-08-12',
  checks,
  summary: {
    checks_passed: passed,
    checks_total: checks.length,
    key_areas: 3,
    time_windows: 4,
    decision_cells: atlas.cells.length,
    conditional_review_cells: conditional,
    hold_cells: blocked,
    field_measurements: 0,
    resident_satisfaction_measurements: 0,
    operating_authorizations: 0,
    air_agents: 0
  },
  release_readout: atlas.cells.map(c => ({ id: c.id, key_area_id: c.key_area_id, window_id: c.window_id, release: c.release, human_decision_question_zh: c.human_decision_question_zh, stop_condition: c.stop_condition })),
  boundary: atlas.decision_contract.cannot_claim
};
fs.writeFileSync(outPath, JSON.stringify(readout, null, 2) + '\n');

const namesZh = { 'PROV-KEY-001': '众智园', 'PROV-KEY-002': 'AI 原点社区', 'PROV-KEY-003': '大钟寺' };
const namesEn = { 'PROV-KEY-001': 'Zhongzhiyuan', 'PROV-KEY-002': 'AI Origin', 'PROV-KEY-003': 'Dazhongsi' };
function makeBoard(lang) {
  const zh = lang === 'zh';
  const title = zh ? '空间交通决策图谱' : 'Spatial mobility decision atlas';
  const sub = zh ? '3 个临时重点区 × 4 个时段 · 合成信号只生成复核问题' : '3 provisional key areas × 4 windows · synthetic signals generate review questions only';
  const headers = zh ? ['重点区 / 时段', '骨干与支撑', '合成护栏', '空间动作 / 人工决定'] : ['Key area / window', 'Backbone and support', 'Synthetic guards', 'Spatial action / human decision'];
  const wmap = Object.fromEntries(atlas.windows.map(w => [w.id, zh ? w.label_zh : w.label_en]));
  const rows = atlas.cells.map((c, i) => {
    const y = 150 + i * 52;
    const label = `${zh ? namesZh[c.key_area_id] : namesEn[c.key_area_id]} · ${wmap[c.window_id]}`;
    const modes = `${c.backbone_modes.join(' + ')} / ${c.support_modes.slice(0, 2).join(' + ')}`;
    const guard = `F ${(c.synthetic_screen.feeder_share * 100).toFixed(0)}% · Δ ${(c.synthetic_screen.worst_group_access_delta * 100).toFixed(0)}pp · air 0`;
    const action = zh ? `${c.spatial_action_zh.slice(0, 30)}…` : `${c.spatial_action_en.slice(0, 54)}…`;
    const decision = zh ? `问：${c.human_decision_question_zh.slice(0, 24)}…` : `Ask: ${c.human_decision_question_en.slice(0, 44)}…`;
    const state = c.release === 'hold' ? (zh ? 'HOLD' : 'HOLD') : (zh ? '复核' : 'REVIEW');
    return `<rect x="24" y="${y - 25}" width="1152" height="44" rx="8" fill="${i % 2 ? '#F1F7F6' : '#FFFFFF'}"/><text x="40" y="${y - 4}" class="cell label">${esc(label)}</text><text x="300" y="${y - 4}" class="cell">${esc(modes)}</text><text x="555" y="${y - 4}" class="cell guard">${esc(guard)}</text><text x="785" y="${y - 8}" class="cell">${esc(action)}</text><text x="785" y="${y + 9}" class="small">${esc(decision)}</text><rect x="1120" y="${y - 16}" width="42" height="20" rx="10" fill="${c.release === 'hold' ? '#FDE8E7' : '#DDF6EF'}"/><text x="1141" y="${y - 2}" text-anchor="middle" class="state ${c.release === 'hold' ? 'hold' : 'review'}">${state}</text>`;
  }).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${185 + atlas.cells.length * 52}" viewBox="0 0 1200 ${185 + atlas.cells.length * 52}"><style>.bg{fill:#F7F3ED}.title{font:800 28px -apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;fill:#10233F}.sub{font:14px -apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;fill:#64748B}.head{font:700 12px -apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;fill:#0E8F83}.cell{font:12px -apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;fill:#1F2A37}.label{font-weight:700;fill:#10233F}.guard{fill:#B45309}.small{font:10px -apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;fill:#64748B}.state{font:700 9px -apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif}.hold{fill:#B42318}.review{fill:#047857}</style><rect width="1200" height="100%" class="bg"/><text x="24" y="42" class="title">${esc(title)}</text><text x="24" y="68" class="sub">${esc(sub)}</text><rect x="24" y="96" width="1152" height="34" rx="8" fill="#10233F"/><text x="40" y="118" class="head" fill="#A7F3D0">${esc(headers[0])}</text><text x="300" y="118" class="head" fill="#A7F3D0">${esc(headers[1])}</text><text x="555" y="118" class="head" fill="#A7F3D0">${esc(headers[2])}</text><text x="785" y="118" class="head" fill="#A7F3D0">${esc(headers[3])}</text>${rows}<text x="24" y="${160 + atlas.cells.length * 52}" class="small">${esc(zh ? '读法：合成护栏通过不等于可以施工；HOLD 需要补齐现场证据。大钟寺几何仍为 provisional。' : 'Read: passing synthetic guards does not authorize construction; HOLD requires field evidence. Dazhongsi geometry remains provisional.')}</text><text x="24" y="${178 + atlas.cells.length * 52}" class="small">${esc(zh ? '边界：field=0 · satisfaction=0 · authorization=0 · air agents=0' : 'Boundary: field=0 · satisfaction=0 · authorization=0 · air agents=0')}</text></svg>`;
}
fs.writeFileSync(boardZh, makeBoard('zh'));
fs.writeFileSync(boardEn, makeBoard('en'));
console.log(JSON.stringify(readout, null, 2));
if (process.argv.includes('--check') && readout.status === 'FAIL') process.exit(1);
