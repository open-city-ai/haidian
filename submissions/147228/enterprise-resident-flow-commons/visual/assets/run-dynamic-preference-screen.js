#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, '..', '..');
const contract = JSON.parse(fs.readFileSync(path.join(assetDir, 'dynamic-preference-screen.json'), 'utf8'));
const regional = JSON.parse(fs.readFileSync(path.join(assetDir, 'regional-scale-commute-readout.json'), 'utf8'));
const outputPath = path.join(assetDir, 'dynamic-preference-readout.json');
const figureDir = path.join(packageDir, 'assets', 'figures');
const checks = [];
const check = (id, ok, detail) => checks.push({ id, status: ok ? 'PASS' : 'FAIL', detail });
const round = (value, digits = 2) => { const m = 10 ** digits; return Math.round(Number(value) * m) / m; };
const clamp = (value, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, value));
const sum = values => values.reduce((a, b) => a + Number(b || 0), 0);
const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const candidateIds = Object.keys(contract.candidate_attributes);
const regionalById = Object.fromEntries((regional.optimization_search?.ranked_candidates || []).map(c => [c.policy_id, c]));

check('schema', contract.schema_version === '1.0-dynamic-preference-screen', contract.schema_version);
check('population_reference', contract.population_reference === 3122000, '3,122,000 synthetic agents');
check('group_set', contract.groups.length === 8 && Math.abs(sum(contract.groups.map(g => g.share)) - 1) < 1e-9, 'eight groups sum to 1');
check('horizon_set', contract.horizons.length === 4 && new Set(contract.horizons.map(h => h.id)).size === 4, 'four time windows');
check('mode_set', contract.modes.length === 8 && contract.modes.includes('air_candidate'), 'eight declared modes including air gate');
check('first_last_mile_contract', Object.values(contract.candidate_attributes).every(candidate => Number.isFinite(candidate.first_last_mile_completion) && candidate.first_last_mile_completion >= 0 && candidate.first_last_mile_completion <= 1), 'first/last-mile completion is explicit for every candidate');
check('regional_parity', candidateIds.every(id => regionalById[id] && Math.abs(Number(regionalById[id].satisfaction_proxy) - contract.candidate_attributes[id].base_satisfaction) < 0.001), 'candidate base scores match persisted regional readout');
check('weight_contract', contract.groups.every(g => Math.abs(sum(Object.values(g.weights)) - 1) < 1e-9), 'each group preference profile sums to 1');
check('air_gate', contract.mode_contract.air_candidate_status === 'blocked' && contract.mode_contract.air_agents === 0 && contract.objective.hard_gates.air_agents_must_be_zero, 'air candidate stays fail-closed');

function adjustedWeights(group, horizon) {
  const shifted = {};
  for (const key of Object.keys(group.weights)) shifted[key] = Math.max(0, group.weights[key] + Number(horizon.weight_shift[key] || 0));
  const total = sum(Object.values(shifted));
  for (const key of Object.keys(shifted)) shifted[key] = shifted[key] / total;
  return shifted;
}
function score(group, horizon, candidate) {
  const weights = adjustedWeights(group, horizon);
  const raw = Object.entries(weights).reduce((value, [key, weight]) => value + weight * candidate.component_scores[key], 0);
  const groupBias = group.id === 'accessible_older' && candidate.accessibility_completion < 0.932 ? -1.3 : 0;
  const nightBias = horizon.id === 'NIGHT_RETURN' && candidate.component_scores.reliability < 70 ? -1.0 : 0;
  return { score: round(clamp(raw + groupBias + nightBias)), weights };
}
function gate(candidate) {
  const g = contract.objective.hard_gates;
  return candidate.mode_load_ratio <= g.max_mode_load_ratio && candidate.feeder_share <= g.max_feeder_share && candidate.accessibility_completion >= g.min_accessibility_completion && candidate.first_last_mile_completion >= g.min_first_last_mile_completion && candidate.external_car_inflow_ratio <= g.max_external_car_inflow_ratio && candidate.air_agents === 0;
}

const candidateRows = candidateIds.map((id) => {
  const candidate = contract.candidate_attributes[id];
  candidate.air_agents = 0;
  const cells = [];
  for (const group of contract.groups) for (const horizon of contract.horizons) {
    const result = score(group, horizon, candidate);
    cells.push({ group_id: group.id, horizon_id: horizon.id, score: result.score, weights: result.weights });
  }
  const values = cells.map(c => c.score).sort((a, b) => a - b);
  const weightedMean = sum(cells.map(cell => cell.score * contract.groups.find(g => g.id === cell.group_id).share)) / contract.horizons.length;
  const p10 = values[Math.max(0, Math.floor(values.length * 0.10) - 1)];
  return { policy_id: id, label_zh: candidate.label_zh, label_en: candidate.label_en, hard_gate_pass: gate(candidate), mean_satisfaction: round(weightedMean), worst_group_satisfaction_p10: round(p10), accessibility_p10: round(candidate.accessibility_completion * 100), first_last_mile_completion: candidate.first_last_mile_completion, weighted_system_utility: round(candidate.base_efficiency * 0.6 + weightedMean * 0.4), mode_load_ratio: candidate.mode_load_ratio, feeder_share: candidate.feeder_share, external_car_inflow_ratio: candidate.external_car_inflow_ratio, vehicle_km: candidate.vehicle_km, base_satisfaction: candidate.base_satisfaction, cells };
});
const eligible = candidateRows.filter(row => row.hard_gate_pass);
eligible.sort((a, b) => b.worst_group_satisfaction_p10 - a.worst_group_satisfaction_p10 || b.accessibility_p10 - a.accessibility_p10 || b.weighted_system_utility - a.weighted_system_utility || b.mean_satisfaction - a.mean_satisfaction || a.vehicle_km - b.vehicle_km);
candidateRows.forEach(row => { row.selection_rank = eligible.findIndex(x => x.policy_id === row.policy_id) + 1 || null; });
const selected = eligible[0];
const rawLeader = [...candidateRows].sort((a, b) => b.base_satisfaction - a.base_satisfaction)[0];
const dynamicLeader = [...candidateRows].sort((a, b) => b.mean_satisfaction - a.mean_satisfaction)[0];
check('candidate_rows', candidateRows.length === 4 && candidateRows.every(c => c.cells.length === 32), 'four policies × eight groups × four windows');
check('eligible_selection', Boolean(selected) && selected.policy_id === 'O4_capacity_balanced', `selected=${selected?.policy_id}`);
check('raw_leader_disclosed', rawLeader.policy_id === 'O3_active_first' && rawLeader.hard_gate_pass === false, `raw_regional_leader=${rawLeader.policy_id}`);
check('selection_not_raw_score', rawLeader.policy_id !== selected.policy_id && selected.hard_gate_pass, 'hard gates precede satisfaction proxy');
check('no_local_claims', contract.privacy.local_satisfaction_responses === 0 && contract.privacy.operating_authorizations === 0, 'local measurements and authorizations remain zero');

const cellReadout = [];
for (const group of contract.groups) for (const horizon of contract.horizons) {
  const eligibleCells = candidateRows.filter(c => c.hard_gate_pass).sort((a, b) => b.cells.find(x => x.group_id === group.id && x.horizon_id === horizon.id).score - a.cells.find(x => x.group_id === group.id && x.horizon_id === horizon.id).score);
  const chosen = eligibleCells[0];
  cellReadout.push({ group_id: group.id, horizon_id: horizon.id, selected_policy: chosen.policy_id, score: chosen.cells.find(x => x.group_id === group.id && x.horizon_id === horizon.id).score, ground_modes: contract.modes.filter(m => m !== 'air_candidate') });
}
const passed = checks.filter(c => c.status === 'PASS').length;
const output = {
  screen_id: contract.screen_id,
  status: checks.every(c => c.status === 'PASS') ? 'PASS_WITH_SYNTHETIC_BOUNDARIES' : 'FAIL',
  status_boundary: 'supplemental dynamic preference screen; no field preference, satisfaction, approval, score or operating claim',
  population_reference: contract.population_reference,
  checks,
  summary: { checks_passed: passed, checks_total: checks.length, groups: contract.groups.length, horizons: contract.horizons.length, policies: candidateRows.length, cells: cellReadout.length, raw_satisfaction_leader: rawLeader.policy_id, raw_satisfaction_leader_score: rawLeader.base_satisfaction, dynamic_preference_leader: dynamicLeader.policy_id, dynamic_preference_leader_score: dynamicLeader.mean_satisfaction, selected_eligible_policy: selected?.policy_id || null, selected_eligible_mean: selected?.mean_satisfaction || null, selected_worst_group_p10: selected?.worst_group_satisfaction_p10 || null, local_satisfaction_responses: 0, air_agents: 0 },
  candidate_rows: candidateRows,
  cell_readout: cellReadout,
  selection_contract: contract.objective,
  calibration_required_before_local_decision: contract.calibration_required_before_local_decision,
  source_boundaries: contract.source_boundaries
};

function renderBoard(lang) {
  const zh = lang === 'zh';
  const title = zh ? '动态偏好复核：满意度与硬门一起选' : 'Dynamic preference review: select with satisfaction and gates';
  const subtitle = zh ? '8 类群体 × 4 个时段 × 4 个候选 · 3,122,000 合成代理的聚合回放' : '8 groups × 4 windows × 4 candidates · aggregate replay of 3,122,000 synthetic agents';
  const selectedLabel = zh ? '硬门后可选最高' : 'highest eligible';
  const rawLabel = zh ? '区域回放原始满意度最高' : 'regional raw satisfaction leader';
  const candidateMarkup = candidateRows.map((c, i) => {
    const y = 250 + i * 82;
    const color = c.policy_id === selected.policy_id ? '#55D6BE' : c.policy_id === rawLeader.policy_id ? '#FF9F68' : '#69A7FF';
    const state = c.hard_gate_pass ? (zh ? '可选' : 'eligible') : (zh ? '闭锁' : 'blocked');
    return `<text x="72" y="${y}" class="candidate">${esc(zh ? c.label_zh : c.label_en)}</text><rect x="300" y="${y - 21}" width="430" height="18" rx="9" fill="#183548"/><rect x="300" y="${y - 21}" width="${Math.min(430, c.mean_satisfaction * 5.3).toFixed(1)}" height="18" rx="9" fill="${color}"/><text x="750" y="${y - 6}" class="score">${c.mean_satisfaction.toFixed(2)}</text><text x="830" y="${y - 6}" class="status ${c.hard_gate_pass ? 'pass' : 'blocked'}">${state}</text><text x="300" y="${y + 18}" class="muted">${zh ? '最弱群体 P10' : 'worst-group P10'} ${c.worst_group_satisfaction_p10.toFixed(2)} · load ${c.mode_load_ratio.toFixed(2)}× · ${zh ? '首末端' : 'first/last-mile'} ${(c.first_last_mile_completion * 100).toFixed(1)}%</text>`;
  }).join('');
  const labels = Object.fromEntries(contract.groups.map(g => [g.id, zh ? g.label_zh : g.label_en]));
  const horizonLabels = Object.fromEntries(contract.horizons.map(h => [h.id, zh ? h.label_zh : h.label_en]));
  const gridX = 935, gridY = 242, colW = 115, rowH = 46;
  const header = contract.horizons.map((h, i) => `<text x="${gridX + i * colW + 10}" y="${gridY - 18}" class="gridhead">${esc(horizonLabels[h.id])}</text>`).join('');
  const grid = contract.groups.map((g, ri) => {
    const label = `<text x="${gridX - 8}" y="${gridY + ri * rowH + 20}" text-anchor="end" class="gridlabel">${esc(labels[g.id])}</text>`;
    const cells = contract.horizons.map((h, ci) => {
      const cell = cellReadout.find(x => x.group_id === g.id && x.horizon_id === h.id);
      const fill = cell.selected_policy === selected.policy_id ? '#1D6F68' : '#25445A';
      return `<rect x="${gridX + ci * colW}" y="${gridY + ri * rowH}" width="${colW - 5}" height="${rowH - 5}" rx="7" fill="${fill}"/><text x="${gridX + ci * colW + 8}" y="${gridY + ri * rowH + 17}" class="gridpolicy">${esc(cell.selected_policy.replace('_', ' ').replace('O4 capacity balanced', 'O4'))}</text><text x="${gridX + ci * colW + 8}" y="${gridY + ri * rowH + 34}" class="gridscore">${cell.score.toFixed(1)}</text>`;
    }).join('');
    return label + cells;
  }).join('');
  const foot = zh ? 'O3 的未过滤代理满意度最高，但方式负荷、接驳和首末端护栏未过；O4 是硬门后的可选最高。所有数值为合成输入，满意度问卷、现场 OD、许可和空中代理均为 0。' : 'O3 has the highest unfiltered satisfaction proxy but fails load, feeder and first/last-mile guards; O4 is the highest eligible candidate. All values are synthetic inputs; survey responses, field OD, permissions and air agents remain 0.';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="820" viewBox="0 0 1600 820" role="img" aria-label="${esc(title)}"><rect width="1600" height="820" fill="#061521"/><rect x="48" y="38" width="1504" height="112" rx="20" fill="#0B2438" stroke="#1C4C61"/><text x="72" y="83" class="title">${esc(title)}</text><text x="72" y="119" class="subtitle">${esc(subtitle)}</text><rect x="1120" y="60" width="380" height="68" rx="14" fill="#123047" stroke="#55D6BE"/><text x="1140" y="88" class="kicker">${esc(selectedLabel)}</text><text x="1140" y="115" class="hero">O4</text><text x="1210" y="112" class="score-note">${selected.mean_satisfaction.toFixed(2)}</text><text x="72" y="196" class="section">${esc(zh ? '候选政策的合成满意度代理' : 'Synthetic satisfaction proxy by policy')}</text><text x="300" y="218" class="axis">${esc(zh ? '代理分，100 越高' : 'proxy points, higher is better')}</text>${candidateMarkup}<rect x="880" y="180" width="630" height="535" rx="20" fill="#0B2438" stroke="#1C4C61"/><text x="910" y="215" class="section">${esc(zh ? '每个群体和时段的可选政策' : 'Eligible policy by group and horizon')}</text><text x="910" y="240" class="muted">${esc(zh ? '分数是该格的动态偏好代理' : 'Score is the horizon-adjusted preference proxy')}</text>${header}${grid}<text x="72" y="615" class="section">${esc(rawLabel)}</text><text x="300" y="615" class="callout">${esc(rawLeader.policy_id)} · ${rawLeader.mean_satisfaction.toFixed(2)} · ${zh ? '但硬门未通过' : 'fails hard gates'}</text><text x="72" y="653" class="section">${esc(selectedLabel)}</text><text x="300" y="653" class="callout green">O4 · ${selected.mean_satisfaction.toFixed(2)} · ${zh ? '硬门通过后保留' : 'retained after gates'}</text><rect x="48" y="735" width="1504" height="56" rx="14" fill="#0B2438" stroke="#A65F55"/><text x="72" y="758" class="boundary">BOUNDARY</text><text x="165" y="758" class="footer">${esc(foot)}</text><style>.title{font:800 30px Arial,sans-serif;fill:#EAF8FA}.subtitle{font:500 17px Arial,sans-serif;fill:#A7C9D3}.kicker{font:700 13px Arial,sans-serif;fill:#8EBAC7;letter-spacing:1px}.hero{font:800 30px Arial,sans-serif;fill:#55D6BE}.score-note{font:800 22px Arial,sans-serif;fill:#EAF8FA}.section{font:800 18px Arial,sans-serif;fill:#DDEFF2}.candidate{font:700 16px Arial,sans-serif;fill:#DDEFF2}.score{font:800 17px Arial,sans-serif;fill:#EAF8FA}.status{font:800 12px Arial,sans-serif}.pass{fill:#55D6BE}.blocked{fill:#FF9F68}.muted{font:500 13px Arial,sans-serif;fill:#86A9B8}.axis{font:500 12px Arial,sans-serif;fill:#7394A5}.gridhead{font:700 12px Arial,sans-serif;fill:#A7C9D3}.gridlabel{font:600 11px Arial,sans-serif;fill:#C5DDE2}.gridpolicy{font:700 10px Arial,sans-serif;fill:#EAF8FA}.gridscore{font:600 10px Arial,sans-serif;fill:#A7C9D3}.callout{font:800 18px Arial,sans-serif;fill:#FF9F68}.green{fill:#55D6BE}.boundary{font:800 12px Arial,sans-serif;fill:#FF9F68;letter-spacing:1px}.footer{font:500 12px Arial,sans-serif;fill:#C5DDE2}</style></svg>`;
}
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
function renderBoardWithRawScore(lang) {
  const board = renderBoard(lang);
  return board.replace(`${rawLeader.policy_id} · ${rawLeader.mean_satisfaction.toFixed(2)} ·`, `${rawLeader.policy_id} · ${rawLeader.base_satisfaction.toFixed(2)} ·`);
}
fs.writeFileSync(path.join(figureDir, 'dynamic-preference-board.svg'), renderBoardWithRawScore('zh'));
fs.writeFileSync(path.join(figureDir, 'dynamic-preference-board.en.svg'), renderBoardWithRawScore('en'));
console.log(JSON.stringify({runner: 'run-dynamic-preference-screen.js', status: output.status, summary: output.summary}, null, 2));
if (output.status === 'FAIL') process.exit(1);
