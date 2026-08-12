'use strict';

/*
 * Reviewer-facing recovery-time ledger.
 *
 * This screen deliberately consumes the existing B3 mobility runner instead
 * of reimplementing its queues or inventing a second set of coefficients.
 * Its values are synthetic recovery-time proxies under declared events, not
 * local incident records, p90 travel times or resilience observations.
 */

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const root = __dirname;
const modelPath = path.join(root, 'movement-simulation.json');
const model = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
const runnerPath = path.join(root, 'run-mobility-simulation.js');
const outputPath = path.join(root, 'resilience-recovery-readout.json');

const labels = {
  R0_nominal_ground_first: {
    zh: 'R0 例行运行',
    en: 'R0 nominal operation'
  },
  R1_metro_segment_disruption: {
    zh: 'R1 地铁区段中断 30 分钟',
    en: 'R1 metro segment disruption · 30 min'
  },
  R2_weather_ground_fallback: {
    zh: 'R2 强天气：自行车转地面回退',
    en: 'R2 severe weather · ground fallback'
  }
};

const groupLabels = {
  resident: {zh: '居民', en: 'Residents'},
  enterprise_employee: {zh: '企业员工', en: 'Enterprise'},
  carer_or_child: {zh: '照护者 / 儿童', en: 'Carer / child'},
  wheelchair_user: {zh: '轮椅使用者', en: 'Wheelchair users'},
  visitor: {zh: '访客', en: 'Visitors'},
  logistics_and_maintenance: {zh: '物流 / 维护', en: 'Logistics / maintenance'},
  night_worker: {zh: '夜班人员', en: 'Night workers'}
};

function fail(message) {
  console.error(`RESILIENCE_RECOVERY_CHECK_FAIL: ${message}`);
  process.exitCode = 1;
}

function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(Number(value) * factor) / factor;
}

function maxWindowMinutes(event) {
  const windows = Object.values(event.blocked_windows_by_mode || {}).flat();
  return windows.reduce((max, window) => Math.max(max, Number(window.end_minute) - Number(window.start_minute)), 0);
}

const source = childProcess.spawnSync(process.execPath, [runnerPath], {encoding: 'utf8'});
if (source.error) {
  fail(`could not run source runner: ${source.error.message}`);
  process.exit(1);
}
if (source.status !== 0) {
  fail(`source runner exited with ${source.status}`);
  process.exit(1);
}

let raw;
try {
  raw = JSON.parse(source.stdout);
} catch (error) {
  fail(`source runner did not emit JSON: ${error.message}`);
  process.exit(1);
}

const resilience = raw.resilience_sensitivity;
const declaredEvents = model.resilience_sensitivity.events;
const groupIds = Object.keys(model.resilience_sensitivity.group_mode_weights);
const eventRows = (resilience?.events || []).map((event) => {
  const declared = declaredEvents.find((candidate) => candidate.id === event.event_id) || {};
  const groups = Object.fromEntries(groupIds.map((group) => {
    const proxy = event.group_equity_proxies?.[group] || {};
    return [group, {
      label_zh: groupLabels[group]?.zh || group,
      label_en: groupLabels[group]?.en || group,
      recovery_time_proxy_minutes: round(proxy.recovery_time_proxy_minutes),
      worst_group_gap_proxy_points: round(proxy.worst_group_gap_proxy_points),
      status: proxy.status
    }];
  }));
  const slowest = Object.entries(groups).sort((a, b) =>
    b[1].recovery_time_proxy_minutes - a[1].recovery_time_proxy_minutes || a[0].localeCompare(b[0])
  )[0];
  return {
    event_id: event.event_id,
    label_zh: labels[event.event_id]?.zh || event.event_id,
    label_en: labels[event.event_id]?.en || event.event_id,
    event: event.event,
    disruption_duration_minutes: maxWindowMinutes(declared),
    fallback_coverage_ratio: round(event.fallback_coverage_ratio),
    total_queue_person_minutes: round(event.total_queue_person_minutes),
    fallback_eligible_unmet: event.fallback_eligible_unmet,
    covered_fallback_units: event.covered_fallback_units,
    group_recovery_time_proxy_minutes: Object.fromEntries(
      Object.entries(groups).map(([group, value]) => [group, value.recovery_time_proxy_minutes])
    ),
    group_rows: groups,
    slowest_group: slowest ? {
      group: slowest[0],
      label_zh: slowest[1].label_zh,
      label_en: slowest[1].label_en,
      recovery_time_proxy_minutes: slowest[1].recovery_time_proxy_minutes,
      worst_group_gap_proxy_points: slowest[1].worst_group_gap_proxy_points
    } : null,
    policy_screen: event.policy_screen,
    source_disclaimer: event.disclaimer
  };
});

const policy = resilience?.policy || {};
const allChecks = {
  source_runner_pass: raw.status === 'PASS',
  source_runner_is_declared: raw.runner === 'run-mobility-simulation.js',
  event_count_is_three: eventRows.length === 3,
  all_declared_groups_present: eventRows.every((event) => groupIds.every((group) =>
    Object.prototype.hasOwnProperty.call(event.group_recovery_time_proxy_minutes, group)
  )),
  recovery_values_are_finite: eventRows.every((event) => Object.values(event.group_recovery_time_proxy_minutes).every(Number.isFinite)),
  fallback_ratios_are_bounded: eventRows.every((event) => event.fallback_coverage_ratio >= 0 && event.fallback_coverage_ratio <= 1),
  slowest_group_is_recomputed: eventRows.every((event) => event.slowest_group
    && event.slowest_group.recovery_time_proxy_minutes === Math.max(...Object.values(event.group_recovery_time_proxy_minutes))),
  policy_thresholds_declared: Number(policy.max_recovery_time_proxy_minutes) > 0
    && Number(policy.minimum_fallback_coverage_ratio) >= 0,
  air_candidate_remains_blocked: eventRows.every((event) => event.policy_screen?.air_candidate === 'blocked'),
  no_local_performance_claim: String(resilience?.disclaimer || '').includes('not a local resilience')
};
Object.entries(allChecks).forEach(([name, passed]) => {
  if (!passed) fail(name);
});

const output = {
  version: '2.21-resilience-recovery-readout',
  screen_id: 'MOB-RESILIENCE-RECOVERY-888',
  status: 'synthetic_recovery_time_proxy_not_local_resilience',
  generated_by: 'node visual/assets/run-resilience-recovery-screen.js',
  source_runner: 'run-mobility-simulation.js',
  source_model_version: raw.model_version,
  base_scenario: resilience?.base_scenario,
  events: eventRows,
  gate: {
    max_recovery_time_proxy_minutes: policy.max_recovery_time_proxy_minutes,
    minimum_fallback_coverage_ratio: policy.minimum_fallback_coverage_ratio,
    max_worst_group_gap_proxy_points: policy.max_worst_group_gap_proxy_points,
    air_candidate: 'blocked'
  },
  checks: allChecks,
  calibration_required: resilience?.required_calibration,
  interpretation: 'TTR is a synthetic grouped recovery-time proxy from declared queue/fallback stress inputs. It is not a dated incident response, local resilience observation, accessibility audit, p90 OD result or implementation guarantee.'
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(output, null, 2));
if (Object.values(allChecks).every(Boolean)) console.error('RESILIENCE_RECOVERY_CHECK_PASS: all recovery-ledger checks passed');
