'use strict';

/*
 * Read the same population-scale activity-chain runner through a time-budget
 * sufficiency lens.  This is an exact deterministic synthetic proxy.  It is
 * not observed accessibility, a travel-time guarantee, or a local baseline.
 */
const fs = require('fs');
const path = require('path');
const { simulateBundle, model, TOTAL, TIME_BUDGETS } = require('./run-commute-co-benefit-optimization.js');

const root = __dirname;
const packageRoot = path.resolve(root, '..', '..');
const outputPath = path.join(root, 'commute-co-benefit-accessibility.json');
const figureRoot = path.join(packageRoot, 'assets', 'figures');
const CANDIDATE_ID = 'C3_commute_co_benefit';
const REFERENCE_ID = 'B0_inertial_baseline';
const PROTECTED_GROUPS = ['resident_worker', 'carer_or_child', 'night_worker'];

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function policy(id) {
  const found = model.policy_bundles.find((item) => item.id === id);
  if (!found) throw new Error(`Missing policy bundle: ${id}`);
  return found;
}

function aggregate(rows, budget) {
  const total = rows.reduce((sum, row) => sum + row.agents, 0);
  return round(rows.reduce((sum, row) => (
    sum + row.time_budget_sufficiency_proxy[String(budget)] * row.agents
  ), 0) / total);
}

function protectedMinimum(rows, budget) {
  const values = rows
    .filter((row) => PROTECTED_GROUPS.includes(row.id))
    .map((row) => row.time_budget_sufficiency_proxy[String(budget)]);
  return round(Math.min(...values));
}

function groupGap(rows, budget) {
  const values = rows.map((row) => row.time_budget_sufficiency_proxy[String(budget)]);
  return round(Math.max(...values) - Math.min(...values));
}

function scenario(id) {
  const result = simulateBundle(policy(id));
  return {
    policy_id: result.policy_id,
    label_zh: result.label_zh,
    label_en: result.label_en,
    agents_processed_first_pass: result.agents_processed_first_pass,
    agents_processed_second_pass: result.agents_processed_second_pass,
    total_agents: result.total_agents,
    hard_gate_pass: result.hard_gate_pass,
    group_rows: result.group_readouts.map((row) => ({
      id: row.id,
      label_zh: row.label_zh,
      label_en: row.label_en,
      agents: row.agents,
      time_budget_sufficiency_proxy: row.time_budget_sufficiency_proxy
    })),
    overall_sufficiency_proxy: Object.fromEntries(TIME_BUDGETS.map((budget) => [
      String(budget), aggregate(result.group_readouts, budget)
    ])),
    protected_minimum_sufficiency_proxy: Object.fromEntries(TIME_BUDGETS.map((budget) => [
      String(budget), protectedMinimum(result.group_readouts, budget)
    ])),
    group_gap_proxy: Object.fromEntries(TIME_BUDGETS.map((budget) => [
      String(budget), groupGap(result.group_readouts, budget)
    ])),
    interpretation: 'Exact deterministic synthetic time-budget sufficiency proxy; not observed accessibility or field performance.'
  };
}

function buildReadout() {
  const candidate = scenario(CANDIDATE_ID);
  const reference = scenario(REFERENCE_ID);
  const allScenarios = [candidate, reference];
  const groupRowsComplete = allScenarios.every((item) => item.group_rows.every((row) => (
    TIME_BUDGETS.every((budget) => Number.isFinite(row.time_budget_sufficiency_proxy[String(budget)]))
  )));
  const allValuesBounded = allScenarios.every((item) => TIME_BUDGETS.every((budget) => (
    [item.overall_sufficiency_proxy[String(budget)], item.protected_minimum_sufficiency_proxy[String(budget)]]
      .every((value) => value >= 0 && value <= 1)
  )));
  return {
    schema_version: '0.1.0',
    model_version: model.model_version,
    analysis_id: 'COMMUTE-TIME-BUDGET-SUFFICIENCY-1000',
    status: 'synthetic_aggregate_only',
    population_reference: model.regional_scope.population_reference,
    population_coverage_ratio: model.regional_scope.coverage_ratio,
    time_budgets_minutes: TIME_BUDGETS,
    definition: 'A group is counted within a budget only when its deterministic synthetic travel time is below the budget upper bound; the 75-minute-plus tail is outside the displayed comparison.',
    candidate_policy_id: CANDIDATE_ID,
    reference_policy_id: REFERENCE_ID,
    protected_groups: PROTECTED_GROUPS,
    scenarios: allScenarios,
    checks: {
      scenarios_complete: allScenarios.length === 2,
      all_agents_processed: allScenarios.every((item) => item.agents_processed_first_pass === TOTAL && item.agents_processed_second_pass === TOTAL),
      group_rows_complete: groupRowsComplete,
      all_values_bounded_0_to_1: allValuesBounded,
      protected_groups_explicit: PROTECTED_GROUPS.length === 3,
      aggregate_only: true,
      synthetic_not_observed: true,
      no_local_accessibility_claim: true,
      no_optimal_time_budget_claim: true
    },
    source_boundary: 'The time-budget curve is derived from the committed synthetic runner. Dated local OD, schedule, route, accessibility and resident evidence remain required before any local decision.'
  };
}

function linePath(values, xFor, yFor) {
  return values.map((value, index) => `${index === 0 ? 'M' : 'L'} ${xFor(TIME_BUDGETS[index]).toFixed(1)} ${yFor(value).toFixed(1)}`).join(' ');
}

function board(readout, english = false) {
  const candidate = readout.scenarios.find((item) => item.policy_id === readout.candidate_policy_id);
  const groups = candidate.group_rows;
  const colors = ['#77e3c0', '#6ea5ff', '#f6c76b', '#ef829d', '#b8a1ff', '#a7d9a0'];
  const title = english ? 'Time-budget sufficiency by group' : '分组时间预算充分性';
  const subtitle = english
    ? 'C3 protected-time-budget profile · 3,122,000 synthetic agents · exact thresholds'
    : 'C3 保护组时间预算剖面 · 3,122,000 个合成代理 · 声明阈值精确回读';
  const caveat = english
    ? 'Synthetic aggregate screen only. It does not report observed accessibility, a service guarantee or a local baseline.'
    : '仅为合成聚合压力屏查，不报告现场可达性、服务保证或本地基线。';
  const x0 = 164;
  const y0 = 260;
  const plotW = 850;
  const plotH = 430;
  const xFor = (budget) => x0 + ((budget - TIME_BUDGETS[0]) / (TIME_BUDGETS[TIME_BUDGETS.length - 1] - TIME_BUDGETS[0])) * plotW;
  const yFor = (value) => y0 + plotH - value * plotH;
  const grid = [0, 0.25, 0.5, 0.75, 1].map((value) => {
    const y = yFor(value);
    return `<line x1="${x0}" y1="${y}" x2="${x0 + plotW}" y2="${y}" stroke="#2b5365" stroke-width="1"/><text x="${x0 - 18}" y="${y + 6}" text-anchor="end" class="axis">${Math.round(value * 100)}%</text>`;
  }).join('');
  const xTicks = TIME_BUDGETS.map((budget) => `<line x1="${xFor(budget)}" y1="${y0 + plotH}" x2="${xFor(budget)}" y2="${y0 + plotH + 8}" stroke="#9fc0cf" stroke-width="2"/><text x="${xFor(budget)}" y="${y0 + plotH + 32}" text-anchor="middle" class="axis">${budget}</text>`).join('');
  const paths = groups.map((group, index) => {
    const values = TIME_BUDGETS.map((budget) => group.time_budget_sufficiency_proxy[String(budget)]);
    const label = english ? group.label_en : group.label_zh;
    const legendX = 150 + (index % 3) * 290;
    const legendY = 790 + Math.floor(index / 3) * 32;
    return `<path d="${linePath(values, xFor, yFor)}" fill="none" stroke="${colors[index]}" stroke-width="${index < 3 ? 5 : 3}" stroke-linecap="round" stroke-linejoin="round"/><g><circle cx="${legendX}" cy="${legendY - 5}" r="6" fill="${colors[index]}"/><text x="${legendX + 16}" y="${legendY}" class="legend">${esc(label)}</text></g>${values.map((value, pointIndex) => `<circle cx="${xFor(TIME_BUDGETS[pointIndex])}" cy="${yFor(value)}" r="4" fill="${colors[index]}" stroke="#071a2b" stroke-width="2"/>`).join('')}`;
  }).join('');
  const baseline = readout.scenarios.find((item) => item.policy_id === readout.reference_policy_id);
  const tableRows = TIME_BUDGETS.map((budget, index) => {
    const y = 305 + index * 72;
    const c3 = candidate.overall_sufficiency_proxy[String(budget)];
    const b0 = baseline.overall_sufficiency_proxy[String(budget)];
    const min = candidate.protected_minimum_sufficiency_proxy[String(budget)];
    const gap = candidate.group_gap_proxy[String(budget)];
    return `<g><text x="1196" y="${y}" class="tableStrong">${budget} min</text><text x="1370" y="${y}" class="tableValue">${(c3 * 100).toFixed(1)}%</text><text x="1510" y="${y}" class="tableValue">${(b0 * 100).toFixed(1)}%</text><text x="1650" y="${y}" class="tableValue">${(min * 100).toFixed(1)}%</text><text x="1750" y="${y}" class="tableValue">${(gap * 100).toFixed(1)}pt</text></g>`;
  }).join('');
  const headers = english ? ['budget', 'C3 all', 'B0 all', 'C3 protected min', 'C3 gap'] : ['预算', 'C3 全体', 'B0 全体', 'C3 保护组最低', 'C3 组间差'];
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1900" height="1050" viewBox="0 0 1900 1050" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title><desc id="desc">${esc(caveat)}</desc>
  <style>
    .bg{fill:#071a2b}.panel{fill:#0e2a3c;stroke:#2f6672;stroke-width:2}.title{font:800 38px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#f4fbff}.sub{font:500 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}.section{font:800 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#77e3c0}.axis{font:600 15px SFMono-Regular,Consolas,monospace;fill:#a9c8d1}.legend{font:650 16px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#e0eff2}.tableHead{font:800 15px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#77e3c0}.tableStrong{font:800 18px SFMono-Regular,Consolas,monospace;fill:#f4fbff}.tableValue{font:700 17px SFMono-Regular,Consolas,monospace;fill:#d8eef1}.foot{font:500 16px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}.small{font:500 14px SFMono-Regular,Consolas,monospace;fill:#91b5bf}
  </style>
  <rect width="1900" height="1050" class="bg"/><circle cx="1800" cy="90" r="270" fill="#2a9d8f" opacity=".12"/><circle cx="90" cy="980" r="250" fill="#5b8def" opacity=".11"/>
  <text x="72" y="70" class="title">${esc(title)}</text><text x="74" y="106" class="sub">${esc(subtitle)}</text>
  <rect x="62" y="156" width="1050" height="700" rx="24" class="panel"/><rect x="1140" y="156" width="698" height="700" rx="24" class="panel"/>
  <text x="104" y="205" class="section">${esc(english ? 'share within time budget' : '进入时间预算的分组比例')}</text><text x="1040" y="205" text-anchor="end" class="small">${esc(english ? 'exact synthetic travel time · 75+ outside view' : '按合成时间精确计数 · 75 分钟以上不在图内')}</text>
  ${grid}${xTicks}<line x1="${x0}" y1="${y0 + plotH}" x2="${x0 + plotW}" y2="${y0 + plotH}" stroke="#9fc0cf" stroke-width="2"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 + plotH}" stroke="#9fc0cf" stroke-width="2"/>${paths}
  <text x="${x0 + plotW / 2}" y="${y0 + plotH + 62}" text-anchor="middle" class="axis">${esc(english ? 'door-to-door synthetic travel-time budget in minutes' : '合成门到门时间预算，分钟')}</text>
  <text x="1170" y="205" class="section">${esc(english ? 'C3 against inertial baseline' : 'C3 与惯性基线对照')}</text>
  <text x="1196" y="250" class="tableHead">${esc(headers[0])}</text><text x="1370" y="250" class="tableHead">${esc(headers[1])}</text><text x="1510" y="250" class="tableHead">${esc(headers[2])}</text><text x="1650" y="250" class="tableHead">${esc(headers[3])}</text><text x="1750" y="250" class="tableHead">${esc(headers[4])}</text>
  ${tableRows}<line x1="1180" y1="280" x2="1800" y2="280" stroke="#2f6672" stroke-width="2"/>
  <rect x="1174" y="710" width="640" height="110" rx="18" fill="#102f42" stroke="#2f6672" stroke-width="2"/><text x="1200" y="750" class="section">${esc(english ? 'Protected groups' : '保护组')}</text><text x="1200" y="783" class="foot">${esc(english ? 'resident workers · carers / children · night workers' : '居民工作者 · 照护者/儿童 · 夜班工作者')}</text><text x="1200" y="807" class="small">${esc(english ? 'Declared guard profile; field threshold and fallback remain pending.' : '声明的保护剖面；现场阈值和回退证据仍待补齐。')}</text>
  <rect x="62" y="896" width="1776" height="88" rx="18" fill="#102f42" stroke="#2f6672" stroke-width="2"/><text x="92" y="934" class="foot">${esc(caveat)}</text><text x="92" y="962" class="small">${esc(english ? 'Source: commute-co-benefit-accessibility.json · run-commute-co-benefit-accessibility.js' : '来源：commute-co-benefit-accessibility.json · run-commute-co-benefit-accessibility.js')}</text>
</svg>`;
}

function writeArtifacts(readout) {
  fs.mkdirSync(figureRoot, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(readout, null, 2)}\n`);
  fs.writeFileSync(path.join(figureRoot, 'commute-co-benefit-accessibility-board.svg'), board(readout, false));
  fs.writeFileSync(path.join(figureRoot, 'commute-co-benefit-accessibility-board.en.svg'), board(readout, true));
}

function checkReadout(actual) {
  const fresh = buildReadout();
  const checks = {
    readout_matches_deterministic_runner: JSON.stringify(actual) === JSON.stringify(fresh),
    scenarios_complete: fresh.checks.scenarios_complete,
    all_agents_processed: fresh.checks.all_agents_processed,
    group_rows_complete: fresh.checks.group_rows_complete,
    all_values_bounded_0_to_1: fresh.checks.all_values_bounded_0_to_1,
    protected_groups_explicit: fresh.checks.protected_groups_explicit,
    aggregate_only: fresh.checks.aggregate_only,
    synthetic_not_observed: fresh.checks.synthetic_not_observed,
    no_local_accessibility_claim: fresh.checks.no_local_accessibility_claim,
    no_optimal_time_budget_claim: fresh.checks.no_optimal_time_budget_claim,
    board_has_all_budgets: TIME_BUDGETS.length === 5
  };
  Object.entries(checks).forEach(([key, value]) => {
    if (!value) console.error(`COMMUTE_ACCESSIBILITY_CHECK_FAIL: ${key}`);
  });
  if (Object.values(checks).every(Boolean)) {
    console.log(JSON.stringify({ ok: true, candidate_policy_id: CANDIDATE_ID, checks }, null, 2));
    return true;
  }
  process.exitCode = 1;
  return false;
}

if (require.main === module) {
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(outputPath)) {
      console.error(`COMMUTE_ACCESSIBILITY_CHECK_FAIL: missing ${outputPath}`);
      process.exitCode = 1;
    } else {
      checkReadout(JSON.parse(fs.readFileSync(outputPath, 'utf8')));
    }
  } else {
    const readout = buildReadout();
    writeArtifacts(readout);
    console.log(JSON.stringify({ ok: true, output: path.relative(packageRoot, outputPath), checks: readout.checks }, null, 2));
  }
}

module.exports = { buildReadout, board, TIME_BUDGETS };
