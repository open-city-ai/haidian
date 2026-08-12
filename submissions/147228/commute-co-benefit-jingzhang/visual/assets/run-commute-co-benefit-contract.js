'use strict';

/*
 * Turn the activity-chain screen into a readable enterprise/resident contract.
 * This runner derives deltas from the checked-in synthetic readout only. It
 * does not invent external OD, resident consent, timetable capacity or field
 * outcomes.
 */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const packageRoot = path.resolve(root, '..', '..');
const model = JSON.parse(fs.readFileSync(path.join(root, 'commute-co-benefit-model.json'), 'utf8'));
const readoutPath = path.join(root, 'commute-co-benefit-readout.json');
const outputPath = path.join(root, 'commute-co-benefit-contract.json');
const figureRoot = path.join(packageRoot, 'assets', 'figures');

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

function buildContract() {
  const readout = JSON.parse(fs.readFileSync(readoutPath, 'utf8'));
  const selected = readout.candidates.find((candidate) => candidate.policy_id === readout.selected_policy_id);
  const baseline = readout.candidates.find((candidate) => candidate.policy_id === 'B0_inertial_baseline');
  if (!selected || !baseline) throw new Error('selected or baseline candidate missing');
  const selectedGroups = groupById(selected);
  const baselineGroups = groupById(baseline);
  const protectedIds = model.synthetic_population.groups
    .map((group) => group.id)
    .filter((id) => id !== 'enterprise_employee');
  const protectedSelected = protectedIds.map((id) => selectedGroups[id]);
  const protectedBaseline = protectedIds.map((id) => baselineGroups[id]);
  const enterprise = selectedGroups.enterprise_employee;
  const enterpriseBaseline = baselineGroups.enterprise_employee;
  const enterprisePolicy = model.policy_bundles.find((bundle) => bundle.id === selected.policy_id);
  const gateRows = Object.entries(selected.checks).map(([id, pass]) => ({ id, pass: Boolean(pass) }));
  const enterpriseVehicleDelta = enterprise.vehicle_km_proxy - enterpriseBaseline.vehicle_km_proxy;

  return {
    schema_version: '0.1.0',
    contract_id: 'COMMUTE-CO-BENEFIT-CONTRACT-1000',
    status: 'synthetic_policy_contract_not_operational',
    objective: 'Enterprise scheduling may improve its own activity-chain reliability only when resident, care, accessibility, night and public fallback protections remain inside the same hard-gated ledger.',
    selected_policy: {
      id: selected.policy_id,
      label_zh: selected.label_zh,
      label_en: selected.label_en,
      score_proxy: selected.satisfaction_proxy,
      baseline_policy: baseline.policy_id,
      population_reference: readout.population_reference,
      coverage_ratio: readout.population_coverage_ratio
    },
    enterprise_benefit: {
      group: 'enterprise_employee',
      agents: enterprise.agents,
      declared_shift_share_input: enterprisePolicy.enterprise_shift_share,
      mean_travel_minutes: { baseline: enterpriseBaseline.mean_travel_minutes, selected: enterprise.mean_travel_minutes, delta: round(enterprise.mean_travel_minutes - enterpriseBaseline.mean_travel_minutes, 2) },
      satisfaction_proxy: { baseline: enterpriseBaseline.satisfaction_proxy, selected: enterprise.satisfaction_proxy, delta: round(enterprise.satisfaction_proxy - enterpriseBaseline.satisfaction_proxy, 2) },
      activity_chain_completion_proxy: { baseline: enterpriseBaseline.activity_chain_completion_proxy, selected: enterprise.activity_chain_completion_proxy, delta: round(enterprise.activity_chain_completion_proxy - enterpriseBaseline.activity_chain_completion_proxy, 4) },
      vehicle_km_proxy: { baseline: enterpriseBaseline.vehicle_km_proxy, selected: enterprise.vehicle_km_proxy, delta: round(enterpriseVehicleDelta, 2), change_ratio: round(enterpriseVehicleDelta / enterpriseBaseline.vehicle_km_proxy, 4) }
    },
    resident_protection: {
      protected_groups: protectedIds,
      minimum_accessibility_proxy: {
        baseline: Math.min(...protectedBaseline.map((group) => group.accessibility_completion_proxy)),
        selected: Math.min(...protectedSelected.map((group) => group.accessibility_completion_proxy))
      },
      minimum_satisfaction_proxy: {
        baseline: Math.min(...protectedBaseline.map((group) => group.satisfaction_proxy)),
        selected: Math.min(...protectedSelected.map((group) => group.satisfaction_proxy))
      },
      maximum_p90_travel_minutes_proxy: Math.max(...protectedSelected.map((group) => group.p90_travel_minutes)),
      declared_protected_group_shift_share: 0,
      human_and_public_fallback_required: true,
      interpretation: 'Protected-group values are synthetic group proxies; they are not resident validation or accessibility performance.'
    },
    hard_gates: {
      checks: gateRows,
      passed_count: gateRows.filter((row) => row.pass).length,
      total_count: gateRows.length,
      selected_policy_passes: selected.hard_gate_pass,
      air_candidate: 'blocked',
      failure_action: 'Freeze the policy, keep metro/bus/walking-human fallback, return to P0 evidence collection and do not expand the enterprise window.'
    },
    external_commute: {
      status: 'unknown_baseline',
      source_file: 'visual/assets/external-commute-ledger.json',
      scope: 'origins_and_destinations_outside_provisional_site',
      required_fields: ['grouped_OD', 'boundary_direction', 'mode', 'transfer_chain', 'park_and_ride', 'arrival_departure_window', 'generalized_cost_components'],
      output_targets: ['external_commute_od_baseline', 'external_commute_generalized_cost_index', 'car_inflow_peak_ratio'],
      privacy: 'grouped_OD_only; suppression_threshold_and_retention_to_be_defined',
      interpretation: 'No external-commute value is claimed until dated, authorized grouped OD and mode evidence exists.'
    },
    evidence_needed_before_operation: [
      'dated_grouped_OD_and_enterprise_shift_acceptance',
      'metro_bus_headway_station_stop_and_curb_capacity',
      'resident_care_accessibility_and_night_return_validation',
      'complaint_redress_and_human_fallback_rehearsal',
      'privacy_suppression_retention_and_deletion_proof'
    ],
    source_boundary: 'All numeric deltas are derived from the checked-in synthetic readout. No personal trajectory, resident survey, enterprise register, local timetable, field capacity, permit or air-service result is imported.',
    checks: {
      selected_policy_is_ground: !selected.air_candidate,
      enterprise_benefit_is_explicit: enterprise.agents > 0 && Number.isFinite(enterprise.satisfaction_proxy),
      resident_protection_is_explicit: protectedIds.length === 5,
      protected_group_shift_is_zero_by_contract: true,
      hard_gate_rows_complete: gateRows.length >= 9 && gateRows.every((row) => row.pass),
      external_commute_is_unknown_until_authorized: true,
      air_candidate_blocked: selected.checks.air_candidate_blocked === true,
      aggregate_only: selected.checks.privacy_aggregate_only === true,
      baseline_and_selected_present: true
    }
  };
}

function createBoard(contract, english = false) {
  const e = contract.enterprise_benefit;
  const r = contract.resident_protection;
  const title = english ? 'Enterprise–resident co-benefit contract' : '企业—居民通勤共益合同';
  const subtitle = english
    ? 'C3 selected · synthetic deltas only · every benefit carries a protection and stop gate'
    : 'C3 入选 · 仅展示合成差值 · 每项企业收益都绑定居民保护与停止门';
  const enterpriseTitle = english ? 'ENTERPRISE BENEFIT' : '企业得到什么';
  const residentTitle = english ? 'RESIDENT PROTECTION' : '居民如何不被牺牲';
  const gateTitle = english ? 'STOP / VERIFY' : '何时必须停';
  const footer = english
    ? 'This is a design contract over synthetic aggregates. It does not prove resident acceptance, enterprise adoption, local OD, capacity, service quality or permission.'
    : '这是基于合成聚合结果的设计合同，不证明居民同意、企业采纳、本地 OD、运力、服务质量或任何许可。';
  const enterpriseRows = english
    ? [`satisfaction proxy  ${e.satisfaction_proxy.baseline.toFixed(2)} → ${e.satisfaction_proxy.selected.toFixed(2)}  (+${e.satisfaction_proxy.delta.toFixed(2)})`, `activity-chain completion  ${(e.activity_chain_completion_proxy.baseline * 100).toFixed(1)}% → ${(e.activity_chain_completion_proxy.selected * 100).toFixed(1)}%`, `vehicle-km proxy  ${Math.round(e.vehicle_km_proxy.baseline).toLocaleString()} → ${Math.round(e.vehicle_km_proxy.selected).toLocaleString()}`, `shift window input  ${(e.declared_shift_share_input * 100).toFixed(0)}% · not observed behavior`]
    : [`代理分  ${e.satisfaction_proxy.baseline.toFixed(2)} → ${e.satisfaction_proxy.selected.toFixed(2)}  （+${e.satisfaction_proxy.delta.toFixed(2)}）`, `活动链完成  ${(e.activity_chain_completion_proxy.baseline * 100).toFixed(1)}% → ${(e.activity_chain_completion_proxy.selected * 100).toFixed(1)}%`, `车辆公里代理  ${Math.round(e.vehicle_km_proxy.baseline).toLocaleString()} → ${Math.round(e.vehicle_km_proxy.selected).toLocaleString()}`, `错峰输入  ${(e.declared_shift_share_input * 100).toFixed(0)}% · 不是实测行为`];
  const residentRows = english
    ? [`minimum accessibility  ${r.minimum_accessibility_proxy.baseline.toFixed(3)} → ${r.minimum_accessibility_proxy.selected.toFixed(3)}`, `minimum protected-group score  ${r.minimum_satisfaction_proxy.selected.toFixed(2)}`, `protected-group shift  0% by contract`, `human / metro / bus fallback  REQUIRED`]
    : [`最弱可达代理  ${r.minimum_accessibility_proxy.baseline.toFixed(3)} → ${r.minimum_accessibility_proxy.selected.toFixed(3)}`, `最弱保护组代理分  ${r.minimum_satisfaction_proxy.selected.toFixed(2)}`, `保护群组错峰  按合同为 0%`, `人工 / 地铁 / 公交回退  必须保留`];
  const gateRows = english
    ? [`hard gates  ${contract.hard_gates.passed_count}/${contract.hard_gates.total_count} PASS`, 'air candidate  BLOCKED', 'external commute  UNKNOWN until grouped OD', 'any failure  FREEZE → P0; fallback retained']
    : [`硬门  ${contract.hard_gates.passed_count}/${contract.hard_gates.total_count} 通过`, '空中候选  阻断', '对外通勤  待分组 OD，当前未知', '任一失败  冻结 → 回 P0；保留回退'];
  const column = (x, titleText, rows, color) => `<rect x="${x}" y="190" width="520" height="500" rx="24" fill="#0e2a3c" stroke="${color}" stroke-width="3"/>${text(x + 28, 242, titleText, 'section')}${rows.map((row, i) => `<rect x="${x + 24}" y="${280 + i * 76}" width="472" height="54" rx="12" fill="#102f42"/><text x="${x + 42}" y="${314 + i * 76}" class="${row.length > 32 ? 'row row-tight' : 'row'}">${esc(row)}</text>`).join('')}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1100" viewBox="0 0 1800 1100" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title><desc id="desc">${esc(footer)}</desc>
  <style>.bg{fill:#071a2b}.title{font:800 38px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#f4fbff}.sub{font:500 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}.section{font:800 19px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#77e3c0}.row{font:600 16px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#e0eff2}.row-tight{font-size:13px}.foot{font:500 16px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}.small{font:500 14px SFMono-Regular,Consolas,monospace;fill:#91b5bf}</style>
  <rect width="1800" height="1100" class="bg"/><circle cx="1690" cy="70" r="260" fill="#2a9d8f" opacity=".12"/><circle cx="80" cy="1030" r="250" fill="#5b8def" opacity=".11"/>
  ${text(72, 70, title, 'title')}${text(74, 106, subtitle, 'sub')}
  ${column(62, enterpriseTitle, enterpriseRows, '#77e3c0')}${column(640, residentTitle, residentRows, '#79a9ff')}${column(1218, gateTitle, gateRows, '#f6c76b')}
  <rect x="62" y="744" width="1676" height="148" rx="22" fill="#102f42" stroke="#2f6672" stroke-width="2"/>
  ${text(92, 788, english ? 'DECISION RULE' : '决策规则', 'section')}${text(92, 830, english ? 'An enterprise benefit is admissible only when protected-group access, fallback, capacity, privacy and public review remain inside the same gate.' : '企业收益只有在保护群组可达、人工回退、容量、隐私和公共复核同时过门时才可接受。', 'row')}${text(92, 862, footer, 'foot')}
  ${text(62, 964, english ? 'source: commute-co-benefit-contract.json · external-commute-ledger.json · aggregate only · field calibration required' : '来源：commute-co-benefit-contract.json · external-commute-ledger.json · 仅聚合结果 · 现场校准仍需补齐', 'small')}
</svg>`;
}

function writeArtifacts(contract) {
  fs.mkdirSync(figureRoot, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(contract, null, 2)}\n`);
  fs.writeFileSync(path.join(figureRoot, 'commute-co-benefit-contract-board.svg'), createBoard(contract, false));
  fs.writeFileSync(path.join(figureRoot, 'commute-co-benefit-contract-board.en.svg'), createBoard(contract, true));
}

function checkContract(actual) {
  const fresh = buildContract();
  const parity = JSON.stringify(actual) === JSON.stringify(fresh);
  const checks = {
    contract_readout_parity: parity,
    selected_policy_is_ground: fresh.checks.selected_policy_is_ground,
    enterprise_benefit_is_explicit: fresh.checks.enterprise_benefit_is_explicit,
    resident_protection_is_explicit: fresh.checks.resident_protection_is_explicit,
    protected_group_shift_is_zero_by_contract: fresh.checks.protected_group_shift_is_zero_by_contract,
    hard_gate_rows_complete: fresh.checks.hard_gate_rows_complete,
    external_commute_is_unknown_until_authorized: fresh.checks.external_commute_is_unknown_until_authorized,
    air_candidate_blocked: fresh.checks.air_candidate_blocked,
    aggregate_only: fresh.checks.aggregate_only
  };
  if (Object.values(checks).every(Boolean)) {
    console.log(JSON.stringify({ ok: true, selected_policy: fresh.selected_policy.id, checks }, null, 2));
    return true;
  }
  Object.entries(checks).filter(([, pass]) => !pass).forEach(([id]) => console.error(`COMMUTE_CO_BENEFIT_CONTRACT_CHECK_FAIL: ${id}`));
  process.exitCode = 1;
  return false;
}

if (process.argv.includes('--check')) {
  if (!fs.existsSync(outputPath)) {
    console.error(`COMMUTE_CO_BENEFIT_CONTRACT_CHECK_FAIL: missing ${outputPath}`);
    process.exitCode = 1;
  } else checkContract(JSON.parse(fs.readFileSync(outputPath, 'utf8')));
} else {
  const contract = buildContract();
  writeArtifacts(contract);
  console.log(JSON.stringify({ ok: true, output: path.relative(packageRoot, outputPath), board: 'assets/figures/commute-co-benefit-contract-board.svg' }, null, 2));
}
