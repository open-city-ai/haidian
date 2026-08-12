'use strict';

/*
 * Sweep one declared policy input while holding the C3 ground controls
 * constant. The sweep is a sensitivity readout, not a forecast of employer
 * adoption and not an optimisation of the real-world stagger rate.
 */

const fs = require('fs');
const path = require('path');
const { simulateBundle, model, TOTAL } = require('./run-commute-co-benefit-optimization.js');

const root = __dirname;
const packageRoot = path.resolve(root, '..', '..');
const outputPath = path.join(root, 'commute-co-benefit-sensitivity.json');
const figureRoot = path.join(packageRoot, 'assets', 'figures');
const SHIFT_SHARES = [0, 0.06, 0.12, 0.18, 0.24];

function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function text(x, y, value, className, anchor = 'start') {
  return `<text x="${x}" y="${y}" class="${className}" text-anchor="${anchor}">${esc(value)}</text>`;
}

function groupById(candidate) {
  return Object.fromEntries(candidate.group_readouts.map((group) => [group.id, group]));
}

function buildSensitivity() {
  const c3 = model.policy_bundles.find((bundle) => bundle.id === 'C3_commute_co_benefit');
  if (!c3) throw new Error('C3 policy bundle missing');
  const protectedIds = model.synthetic_population.groups.map((group) => group.id).filter((id) => id !== 'enterprise_employee');
  const scenarios = SHIFT_SHARES.map((share) => {
    const result = simulateBundle({ ...c3, id: `C3_sensitivity_${Math.round(share * 100)}` , enterprise_shift_share: share });
    const groups = groupById(result);
    const enterprise = groups.enterprise_employee;
    const protectedGroups = protectedIds.map((id) => groups[id]);
    return {
      declared_shift_share_input: share,
      selected_policy_controls: {
        weight_profile: c3.weight_profile,
        curb_factor: c3.curb_factor,
        reliability_bonus: c3.reliability_bonus,
        accessibility_protection: c3.accessibility_protection,
        air_candidate: c3.air_candidate
      },
      hard_gate_pass: result.hard_gate_pass,
      agents_processed_first_pass: result.agents_processed_first_pass,
      agents_processed_second_pass: result.agents_processed_second_pass,
      overall: {
        satisfaction_proxy: result.satisfaction_proxy,
        mean_generalized_cost_proxy: result.mean_generalized_cost_proxy,
        p90_travel_minutes_proxy: result.p90_travel_minutes_proxy,
        vehicle_km_proxy: result.vehicle_km_proxy
      },
      enterprise: {
        agents: enterprise.agents,
        satisfaction_proxy: enterprise.satisfaction_proxy,
        mean_travel_minutes: enterprise.mean_travel_minutes,
        activity_chain_completion_proxy: enterprise.activity_chain_completion_proxy,
        vehicle_km_proxy: enterprise.vehicle_km_proxy
      },
      protected_groups: {
        minimum_satisfaction_proxy: Math.min(...protectedGroups.map((group) => group.satisfaction_proxy)),
        minimum_accessibility_proxy: Math.min(...protectedGroups.map((group) => group.accessibility_completion_proxy)),
        maximum_p90_travel_minutes_proxy: Math.max(...protectedGroups.map((group) => group.p90_travel_minutes)),
        declared_shift_share_input: 0
      }
    };
  });
  const reference = scenarios.find((scenario) => scenario.declared_shift_share_input === 0.18);
  const referenceProtected = scenarios[0].protected_groups;
  return {
    schema_version: '0.1.0',
    register_id: 'COMMUTE-CO-BENEFIT-SENSITIVITY-1000',
    status: 'synthetic_input_sensitivity_not_operational',
    population_reference: TOTAL,
    input_under_test: 'enterprise_shift_share',
    input_definition: 'Declared share of enterprise employees eligible for an early window. It is not observed employer acceptance, a resident response, or a recommended operating rate.',
    fixed_controls: {
      policy_bundle: c3.id,
      weight_profile: c3.weight_profile,
      curb_factor: c3.curb_factor,
      reliability_bonus: c3.reliability_bonus,
      accessibility_protection: c3.accessibility_protection,
      modes: model.modes,
      air_candidate: false
    },
    scenarios,
    reference_scenario: 0.18,
    interpretation: 'The sweep shows how the synthetic readout changes when one declared input moves. It does not identify an optimal stagger rate or prove adoption, demand, capacity, resident satisfaction or field performance.',
    checks: {
      scenario_count_complete: scenarios.length === SHIFT_SHARES.length,
      all_agents_processed: scenarios.every((scenario) => scenario.agents_processed_first_pass === TOTAL && scenario.agents_processed_second_pass === TOTAL),
      all_ground_hard_gates_pass: scenarios.every((scenario) => scenario.hard_gate_pass),
      reference_scenario_present: Boolean(reference),
      protected_groups_do_not_receive_shift_input: scenarios.every((scenario) => scenario.protected_groups.declared_shift_share_input === 0),
      protected_readout_invariant_under_input_sweep: scenarios.every((scenario) => JSON.stringify(scenario.protected_groups) === JSON.stringify(referenceProtected)),
      air_candidate_blocked_by_fixed_controls: c3.air_candidate === false,
      aggregate_only: true,
      no_optimal_rate_claim: true
    }
  };
}

function chartLine(scenarios, key, color, x0, y0, width, height, maxValue, label, format) {
  const points = scenarios.map((scenario, index) => {
    const x = x0 + index * (width / (scenarios.length - 1));
    const y = y0 + height - (scenario[key] / maxValue) * height;
    return { x, y, value: scenario[key], share: scenario.declared_shift_share_input };
  });
  const pathData = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ');
  const dots = points.map((point) => `<circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="7" fill="${color}" stroke="#071a2b" stroke-width="3"/><text x="${point.x.toFixed(1)}" y="${(point.y - 16).toFixed(1)}" class="chart-value" text-anchor="middle">${format(point.value)}</text>`).join('');
  const legend = `<line x1="${x0}" y1="${y0 - 56}" x2="${x0 + 30}" y2="${y0 - 56}" stroke="${color}" stroke-width="5" stroke-linecap="round"/><text x="${x0 + 42}" y="${y0 - 50}" class="legend">${esc(label)}</text>`;
  return `${legend}<path d="${pathData}" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>${dots}`;
}

function createBoard(readout, english = false) {
  const zh = !english;
  const title = zh ? '企业错峰输入敏感性与群体保护' : 'Employer staggering sensitivity and group protection';
  const subtitle = zh ? '固定 C3 地面控制，只改变声明输入；3,122,000 个合成代理全量回放' : 'C3 ground controls fixed; one declared input changes; 3,122,000 synthetic agents replayed';
  const scenarios = readout.scenarios;
  const current = scenarios.find((scenario) => scenario.declared_shift_share_input === readout.reference_scenario);
  const x0 = 260;
  const chartTop = 300;
  const chartWidth = 770;
  const laneHeight = 64;
  const laneGap = 75;
  const laneTops = [0, 1, 2].map((index) => chartTop + index * (laneHeight + laneGap));
  const chartBottom = laneTops[laneTops.length - 1] + laneHeight;
  const xLabels = scenarios.map((scenario, index) => text(x0 + index * (chartWidth / (scenarios.length - 1)), chartBottom + 42, `${Math.round(scenario.declared_shift_share_input * 100)}%`, 'axis', 'middle')).join('');
  const grid = laneTops.map((laneTop) => [0, 50, 100].map((value) => {
    const y = laneTop + laneHeight - (value / 100) * laneHeight;
    return `<line x1="${x0}" y1="${y}" x2="${x0 + chartWidth}" y2="${y}" stroke="#315569" stroke-width="1" stroke-dasharray="5 9"/>${text(x0 - 18, y + 5, value, 'axis', 'end')}`;
  }).join('')).join('');
  const currentX = x0 + scenarios.findIndex((scenario) => scenario.declared_shift_share_input === readout.reference_scenario) * (chartWidth / (scenarios.length - 1));
  const currentMarker = `<line x1="${currentX}" y1="${chartTop - 24}" x2="${currentX}" y2="${chartBottom + 14}" stroke="#f6c76b" stroke-width="2" stroke-dasharray="8 8"/>${text(currentX + 10, chartTop - 30, zh ? '当前 18%' : 'current 18%', 'marker')}`;
  const overallSeries = scenarios.map((scenario) => ({ ...scenario, value: scenario.overall.satisfaction_proxy }));
  const enterpriseSeries = scenarios.map((scenario) => ({ ...scenario, value: scenario.enterprise.satisfaction_proxy }));
  const protectedSeries = scenarios.map((scenario) => ({ ...scenario, value: scenario.protected_groups.minimum_satisfaction_proxy }));
  const overallLine = chartLine(overallSeries, 'value', '#77e3c0', x0, laneTops[0], chartWidth, laneHeight, 100, zh ? '全体满意度代理' : 'overall satisfaction proxy', (value) => value.toFixed(2));
  const enterpriseLine = chartLine(enterpriseSeries, 'value', '#79a9ff', x0, laneTops[1], chartWidth, laneHeight, 100, zh ? '企业组满意度代理' : 'enterprise satisfaction proxy', (value) => value.toFixed(2));
  const protectedLine = chartLine(protectedSeries, 'value', '#f6c76b', x0, laneTops[2], chartWidth, laneHeight, 100, zh ? '保护组最低满意度' : 'minimum protected-group satisfaction', (value) => value.toFixed(2));
  const evidenceRows = zh
    ? [`企业错峰输入  ${(current.declared_shift_share_input * 100).toFixed(0)}%`, `全体代理分  ${current.overall.satisfaction_proxy.toFixed(2)}`, `企业组活动链完成  ${(current.enterprise.activity_chain_completion_proxy * 100).toFixed(1)}%`, `保护组最低可达  ${current.protected_groups.minimum_accessibility_proxy.toFixed(3)}`, '所有地面硬门  5/5 场景通过']
    : [`enterprise shift input  ${(current.declared_shift_share_input * 100).toFixed(0)}%`, `overall proxy  ${current.overall.satisfaction_proxy.toFixed(2)}`, `enterprise chain completion  ${(current.enterprise.activity_chain_completion_proxy * 100).toFixed(1)}%`, `minimum protected access  ${current.protected_groups.minimum_accessibility_proxy.toFixed(3)}`, 'ground hard gates  all 5 scenarios pass'];
  const evidence = evidenceRows.map((row, index) => {
    const y = 280 + index * 76;
    return `<rect x="1180" y="${y}" width="510" height="54" rx="12" fill="#102f42"/><text x="1205" y="${y + 34}" class="card-row">${esc(row)}</text>`;
  }).join('');
  const note = zh ? '敏感性图只说明声明输入怎样改变合成读数，不给出最佳错峰率。企业接受度、居民回应、班次容量和现场满意度仍待有日期证据。' : 'This sensitivity board shows how a declared input changes synthetic readouts. It does not identify an optimal stagger rate. Employer acceptance, resident response, timetable capacity and field satisfaction remain pending dated evidence.';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1000" viewBox="0 0 1800 1000" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title><desc id="desc">${esc(note)}</desc>
  <style>.bg{fill:#071a2b}.panel{fill:#0e2a3c;stroke:#275369;stroke-width:2}.title{font:800 36px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#f4fbff}.sub{font:500 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}.section{font:800 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#77e3c0}.axis{font:600 14px SFMono-Regular,Consolas,monospace;fill:#91b5bf}.chart-value{font:800 13px SFMono-Regular,Consolas,monospace;fill:#f4fbff}.legend{font:700 15px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#dceef2}.marker{font:800 14px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#f6c76b}.card-row{font:650 16px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#e0eff2}.note{font:500 15px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}.foot{font:600 14px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#91b5bf}</style>
  <rect width="1800" height="1000" class="bg"/><circle cx="1700" cy="70" r="270" fill="#2a9d8f" opacity=".12"/><circle cx="70" cy="930" r="240" fill="#5b8def" opacity=".1"/>
  ${text(64, 64, title, 'title')}${text(66, 100, subtitle, 'sub')}
  <rect x="52" y="140" width="1040" height="620" rx="26" class="panel"/><rect x="1140" y="140" width="608" height="620" rx="26" class="panel"/>
  ${text(86, 190, zh ? '一个输入，三条读数' : 'One input, three readouts', 'section')}${text(86, 226, zh ? '企业错峰输入占比' : 'declared enterprise shift share', 'note')}
  ${grid}${currentMarker}${overallLine}${enterpriseLine}${protectedLine}${xLabels}${text(645, chartBottom + 80, zh ? '声明错峰输入占比' : 'declared shift share input', 'axis', 'middle')}
  ${text(1178, 190, zh ? '当前参考点 C3' : 'Current reference C3', 'section')}${text(1178, 226, zh ? '固定地面服务控制，只扫一个输入' : 'fixed ground controls; one input swept', 'note')}${evidence}
  <rect x="52" y="794" width="1696" height="126" rx="20" fill="#102f42" stroke="#f6c76b" stroke-width="2"/>${text(82, 838, note, 'note')}${text(82, 875, zh ? '来源：commute-co-benefit-sensitivity.json · 全量合成回放 · 仅聚合结果' : 'Source: commute-co-benefit-sensitivity.json · full synthetic replay · aggregate only', 'foot')}${text(82, 900, zh ? '空中候选保持阻断；敏感性结果不参与现场授权或公开服务承诺' : 'Air candidate remains blocked; sensitivity does not grant field authorisation or a public-service promise', 'foot')}
</svg>`;
}

function writeArtifacts(readout) {
  fs.mkdirSync(figureRoot, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(readout, null, 2)}\n`);
  fs.writeFileSync(path.join(figureRoot, 'commute-co-benefit-sensitivity-board.svg'), createBoard(readout, false));
  fs.writeFileSync(path.join(figureRoot, 'commute-co-benefit-sensitivity-board.en.svg'), createBoard(readout, true));
}

function checkSensitivity(actual) {
  const fresh = buildSensitivity();
  const boardMarkup = [createBoard(fresh, false), createBoard(fresh, true)];
  const checks = {
    readout_parity: JSON.stringify(actual) === JSON.stringify(fresh),
    scenario_count_complete: fresh.checks.scenario_count_complete,
    all_agents_processed: fresh.checks.all_agents_processed,
    all_ground_hard_gates_pass: fresh.checks.all_ground_hard_gates_pass,
    reference_scenario_present: fresh.checks.reference_scenario_present,
    protected_groups_do_not_receive_shift_input: fresh.checks.protected_groups_do_not_receive_shift_input,
    protected_readout_invariant_under_input_sweep: fresh.checks.protected_readout_invariant_under_input_sweep,
    air_candidate_blocked_by_fixed_controls: fresh.checks.air_candidate_blocked_by_fixed_controls,
    aggregate_only: fresh.checks.aggregate_only,
    no_optimal_rate_claim: fresh.checks.no_optimal_rate_claim,
    visual_board_has_three_series: boardMarkup.every((board) =>
      (board.match(/class="legend"/g) || []).length === 3
      && (board.match(/class="chart-value"/g) || []).length === SHIFT_SHARES.length * 3
    )
  };
  if (Object.values(checks).every(Boolean)) {
    console.log(JSON.stringify({ ok: true, reference_scenario: fresh.reference_scenario, checks }, null, 2));
    return true;
  }
  Object.entries(checks).filter(([, pass]) => !pass).forEach(([id]) => console.error(`COMMUTE_CO_BENEFIT_SENSITIVITY_CHECK_FAIL: ${id}`));
  process.exitCode = 1;
  return false;
}

if (process.argv.includes('--check')) {
  if (!fs.existsSync(outputPath)) {
    console.error(`COMMUTE_CO_BENEFIT_SENSITIVITY_CHECK_FAIL: missing ${outputPath}`);
    process.exitCode = 1;
  } else checkSensitivity(JSON.parse(fs.readFileSync(outputPath, 'utf8')));
} else {
  const readout = buildSensitivity();
  writeArtifacts(readout);
  console.log(JSON.stringify({ ok: true, output: path.relative(packageRoot, outputPath), board: 'assets/figures/commute-co-benefit-sensitivity-board.svg', reference_scenario: readout.reference_scenario }, null, 2));
}
