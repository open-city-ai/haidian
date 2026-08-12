'use strict';

/*
 * Weekly activity-chain screen. It replays every declared synthetic agent for
 * seven synthetic days, retains aggregate group/activity/mode counters and
 * renders bilingual evidence boards. It is a design screen, not a survey,
 * timetable, field performance result or personal-trace generator.
 */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const model = JSON.parse(fs.readFileSync(path.join(root, 'regional-scale-commute.json'), 'utf8'));
const expected = JSON.parse(fs.readFileSync(path.join(root, 'weekly-activity-screen.json'), 'utf8'));
const TOTAL = Number(model.regional_scope.population_reference);
const GROUPS = model.synthetic_population.groups;
const MODES = model.modes;
const DAYS = expected.scope.day_labels_zh.map((labelZh, index) => ({
  id: index < 5 ? `weekday_${index + 1}` : index === 5 ? 'saturday' : 'sunday',
  label_zh: labelZh,
  label_en: expected.scope.day_labels_en[index],
  weekend: index >= 5
}));

function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function hash(index, salt) {
  let value = (index + 1 + salt * 2654435761) >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 2246822519) >>> 0;
  value ^= value >>> 13;
  value = Math.imul(value, 3266489917) >>> 0;
  return (value ^ (value >>> 16)) >>> 0;
}

function unit(index, salt) {
  return hash(index, salt) / 4294967296;
}

function normalize(weights) {
  const positive = Object.fromEntries(Object.entries(weights).map(([key, value]) => [key, Math.max(0, Number(value) || 0)]));
  const total = Object.values(positive).reduce((sum, value) => sum + value, 0);
  return Object.fromEntries(Object.entries(positive).map(([key, value]) => [key, total ? value / total : 0]));
}

function choose(weights, keys, index, salt) {
  const target = unit(index, salt);
  let cursor = 0;
  for (const key of keys) {
    cursor += Number(weights[key] || 0);
    if (target < cursor) return key;
  }
  return keys[keys.length - 1];
}

function modeWeights(groupId, weekend) {
  const base = {...model.mode_weights_by_group.O4[groupId]};
  if (weekend) {
    for (const [mode, delta] of Object.entries(expected.weekend_mode_adjustment)) {
      if (mode !== 'interpretation') base[mode] = (base[mode] || 0) + Number(delta);
    }
  }
  return normalize(base);
}

function emptyModes() {
  return Object.fromEntries(MODES.map((mode) => [mode, 0]));
}

function emptyGroups() {
  return Object.fromEntries(GROUPS.map((group) => [group.id, 0]));
}

function emptyActivity() {
  return Object.fromEntries(GROUPS.map((group) => [group.id, {}]));
}

function buildScreen() {
  const daily = [];
  const weeklyByGroup = Object.fromEntries(GROUPS.map((group) => [group.id, {
    label_zh: group.label_zh,
    label_en: group.label_en,
    agent_count: group.count,
    agent_days_processed: 0,
    active_trip_count: 0,
    activity_counts: {},
    mode_counts: emptyModes()
  }]));
  let processedAgentDays = 0;
  let activeTripCount = 0;
  let groupStart = 0;

  for (const group of GROUPS) {
    const profile = expected.activity_profiles[group.id];
    for (let offset = 0; offset < group.count; offset += 1) {
      const index = groupStart + offset;
      for (let dayIndex = 0; dayIndex < DAYS.length; dayIndex += 1) {
        const day = DAYS[dayIndex];
        const dayState = daily[dayIndex] || {
          id: day.id,
          label_zh: day.label_zh,
          label_en: day.label_en,
          weekend: day.weekend,
          agent_days_processed: 0,
          active_trip_count: 0,
          mode_counts: emptyModes(),
          group_counts: emptyGroups(),
          activity_counts: emptyActivity(),
          vehicle_km_proxy: 0
        };
        dayState.agent_days_processed += 1;
        processedAgentDays += 1;
        weeklyByGroup[group.id].agent_days_processed += 1;
        if (unit(index, 101 + dayIndex) >= Number(day.weekend ? profile.weekend_active_share : profile.weekday_active_share)) {
          daily[dayIndex] = dayState;
          continue;
        }
        const activityWeights = day.weekend ? profile.activity_weights_weekend : profile.activity_weights_weekday;
        const activity = choose(normalize(activityWeights), Object.keys(activityWeights), index, 131 + dayIndex);
        const weights = modeWeights(group.id, day.weekend);
        const mode = choose(weights, MODES, index, 151 + dayIndex);
        dayState.active_trip_count += 1;
        dayState.group_counts[group.id] += 1;
        dayState.activity_counts[group.id][activity] = (dayState.activity_counts[group.id][activity] || 0) + 1;
        dayState.mode_counts[mode] += 1;
        const modeParameter = model.mode_parameters[mode];
        const unitSpec = modeParameter.service_unit;
        dayState.vehicle_km_proxy += Number(unitSpec.distance_km_per_unit || 0) / Math.max(1, Number(unitSpec.capacity_persons_per_unit || 1));
        activeTripCount += 1;
        weeklyByGroup[group.id].active_trip_count += 1;
        weeklyByGroup[group.id].activity_counts[activity] = (weeklyByGroup[group.id].activity_counts[activity] || 0) + 1;
        weeklyByGroup[group.id].mode_counts[mode] += 1;
        daily[dayIndex] = dayState;
      }
    }
    groupStart += group.count;
  }

  const weeklyModes = emptyModes();
  const weeklyActivities = {};
  const weeklyVehicleKmProxy = daily.reduce((sum, day) => sum + day.vehicle_km_proxy, 0);
  for (const day of daily) {
    for (const mode of MODES) weeklyModes[mode] += day.mode_counts[mode];
    for (const counts of Object.values(day.activity_counts)) {
      for (const [activity, count] of Object.entries(counts)) weeklyActivities[activity] = (weeklyActivities[activity] || 0) + count;
    }
    day.active_trip_share = round(day.active_trip_count / TOTAL, 6);
    day.mode_shares = Object.fromEntries(MODES.map((mode) => [mode, round(day.active_trip_count ? day.mode_counts[mode] / day.active_trip_count : 0, 6)]));
    day.vehicle_km_proxy = round(day.vehicle_km_proxy, 2);
  }

  const expectedAgentDays = TOTAL * DAYS.length;
  const checks = {
    all_agent_days_processed: processedAgentDays === expectedAgentDays,
    agent_day_mass_conservation: daily.every((day) => day.agent_days_processed === TOTAL),
    active_trip_mass_conservation: daily.reduce((sum, day) => sum + day.active_trip_count, 0) === activeTripCount,
    mode_mass_conservation: Object.values(weeklyModes).reduce((sum, value) => sum + value, 0) === activeTripCount,
    group_mass_conservation: Object.values(weeklyByGroup).reduce((sum, group) => sum + group.active_trip_count, 0) === activeTripCount,
    aggregate_only: true,
    air_candidate_blocked: expected.gates.air_candidate_must_remain_blocked === true
  };

  return {
    screen_id: expected.screen_id,
    model_version: expected.model_version,
    status: expected.status,
    profile_id: expected.profile_id,
    population_reference: TOTAL,
    population_reference_label: model.regional_scope.population_reference_label,
    days: DAYS,
    agents_processed_per_day: TOTAL,
    agent_days_processed: processedAgentDays,
    active_trip_count: activeTripCount,
    weekly_active_trip_share: round(activeTripCount / expectedAgentDays, 6),
    daily,
    weekly_mode_counts: weeklyModes,
    weekly_activity_counts: weeklyActivities,
    weekly_by_group: weeklyByGroup,
    vehicle_km_proxy: round(weeklyVehicleKmProxy, 2),
    interpretation: expected.research_boundary,
    calibration_required: expected.calibration_required,
    checks
  };
}

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const MODE_LABELS = {
  metro: ['地铁', 'metro'],
  bus: ['公交', 'bus'],
  bicycle: ['自行车', 'bicycle'],
  walking_wheelchair: ['步行 / 无障碍', 'walk / access'],
  car: ['汽车', 'car'],
  enterprise_shuttle: ['企业接驳', 'shuttle']
};
const MODE_COLORS = {metro: '#43D6C5', bus: '#6C9CFF', bicycle: '#F5C15B', walking_wheelchair: '#B7E37C', car: '#FF8B72', enterprise_shuttle: '#C49CFF'};
const GROUP_COLORS = ['#43D6C5', '#6C9CFF', '#F5C15B', '#B7E37C', '#FF8B72', '#C49CFF'];

function renderBoard(readout, english) {
  const title = english ? 'WEEKLY ACTIVITY CHAIN' : '一周活动链总账';
  const subtitle = english ? 'Synthetic design screen · O4 capacity-balanced ground profile · aggregate counters only' : '合成设计屏查 · O4 容量平衡地面组合 · 只保留聚合计数';
  const metricLabels = english ? ['agent-days', 'agents / day', 'active chain units', 'vehicle-km proxy'] : ['代理日', '每日代理', '活动链设计单元', '车辆公里代理'];
  const metrics = [readout.agent_days_processed.toLocaleString(), readout.agents_processed_per_day.toLocaleString(), readout.active_trip_count.toLocaleString(), readout.vehicle_km_proxy.toLocaleString()];
  const chartX = 72;
  const chartY = 256;
  const chartW = 730;
  const chartH = 292;
  const maxActive = Math.max(...readout.daily.map((day) => day.active_trip_count));
  const bars = readout.daily.map((day, index) => {
    const y = chartY + index * 38;
    const total = day.active_trip_count || 1;
    let x = chartX;
    const segments = MODES.map((mode) => {
      const width = chartW * day.mode_counts[mode] / total;
      const rect = `<rect x="${x.toFixed(1)}" y="${y}" width="${Math.max(0, width).toFixed(1)}" height="24" fill="${MODE_COLORS[mode]}"/>`;
      x += width;
      return rect;
    }).join('');
    const label = english ? day.label_en : day.label_zh;
    return `<text x="${chartX - 16}" y="${y + 17}" text-anchor="end" class="day">${esc(label)}</text>${segments}<text x="${chartX + chartW + 14}" y="${y + 17}" class="value">${day.active_trip_count.toLocaleString()}</text>`;
  }).join('');
  const legend = MODES.map((mode, index) => {
    const x = chartX + (index % 3) * 218;
    const y = chartY + chartH + 36 + Math.floor(index / 3) * 24;
    return `<rect x="${x}" y="${y - 12}" width="12" height="12" rx="3" fill="${MODE_COLORS[mode]}"/><text x="${x + 20}" y="${y - 1}" class="legend">${esc(english ? MODE_LABELS[mode][1] : MODE_LABELS[mode][0])}</text>`;
  }).join('');
  const groups = Object.values(readout.weekly_by_group);
  const groupMax = Math.max(...groups.map((group) => group.active_trip_count));
  const groupBars = groups.map((group, index) => {
    const y = 276 + index * 44;
    const width = 450 * group.active_trip_count / groupMax;
    const label = english ? group.label_en : group.label_zh;
    return `<text x="856" y="${y + 17}" class="group-label">${esc(label)}</text><rect x="1074" y="${y}" width="${width.toFixed(1)}" height="24" rx="5" fill="${GROUP_COLORS[index]}"/><text x="${1086 + width}" y="${y + 17}" class="value">${group.active_trip_count.toLocaleString()}</text>`;
  }).join('');
  const checks = Object.values(readout.checks).every(Boolean);
  const checkText = english ? (checks ? 'CHECK PASS · full agent-day replay · aggregate-only' : 'CHECK HOLD · inspect failed gates') : (checks ? '校验通过 · 全量代理日回放 · 仅聚合输出' : '校验暂停 · 请检查失败门禁');
  const note = english ? 'Day-type activity shares and weekend mode adjustments are declared synthetic assumptions. Replace them with dated grouped evidence before operational use.' : '工作日/周末活动比例和周末方式调整均为声明的合成假设。正式使用前必须替换为有日期的分组证据。';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="920" viewBox="0 0 1400 920">
  <rect width="1400" height="920" fill="#071A2B"/>
  <rect x="36" y="34" width="1328" height="852" rx="28" fill="#0D2A3D" stroke="#2A9D8F" stroke-width="2"/>
  <text x="72" y="92" fill="#E6FFFA" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="1">${esc(title)}</text>
  <text x="72" y="124" fill="#9CC8C8" font-family="Arial, sans-serif" font-size="15">${esc(subtitle)}</text>
  ${metrics.map((metric, index) => `<g transform="translate(${72 + index * 308},154)"><text fill="#E6FFFA" font-family="Arial, sans-serif" font-size="25" font-weight="700">${esc(metric)}</text><text y="25" fill="#82AAB1" font-family="Arial, sans-serif" font-size="12" letter-spacing="1">${esc(metricLabels[index])}</text></g>`).join('')}
  <line x1="72" y1="222" x2="1328" y2="222" stroke="#275267"/>
  <text x="72" y="250" fill="#E6FFFA" font-family="Arial, sans-serif" font-size="16" font-weight="700">${esc(english ? 'Seven synthetic days · active chain units by mode' : '七个合成日 · 按方式拆分的活动链设计单元')}</text>
  <text x="856" y="250" fill="#E6FFFA" font-family="Arial, sans-serif" font-size="16" font-weight="700">${esc(english ? 'Weekly active units by group' : '按群组汇总的一周活动单元')}</text>
  <line x1="${chartX}" y1="${chartY + chartH + 10}" x2="${chartX + chartW}" y2="${chartY + chartH + 10}" stroke="#275267"/>
  ${bars}${legend}${groupBars}
  <rect x="856" y="590" width="472" height="118" rx="14" fill="#102F43" stroke="#275267"/>
  <text x="880" y="622" fill="#66E3CA" font-family="Arial, sans-serif" font-size="13" font-weight="700">${esc(english ? 'READ THIS WITH THE LEDGER' : '读图顺序')}</text>
  <text x="880" y="650" fill="#D6EEF0" font-family="Arial, sans-serif" font-size="13">${esc(english ? 'Every group is processed each day. Active units are' : '每天都处理每个群组。活动单元是')}</text>
  <text x="880" y="671" fill="#D6EEF0" font-family="Arial, sans-serif" font-size="13">${esc(english ? 'representative design units, not observed trips.' : '代表性设计单元，不是观测出行。')}</text>
  <text x="880" y="692" fill="#D6EEF0" font-family="Arial, sans-serif" font-size="13">${esc(english ? 'Vehicle-km is a relative proxy, not emissions.' : '车辆公里是相对代理，不是排放结果。')}</text>
  <rect x="72" y="760" width="1256" height="76" rx="14" fill="#102F43" stroke="#275267"/>
  <circle cx="100" cy="798" r="8" fill="${checks ? '#66E3CA' : '#FF8B72'}"/>
  <text x="122" y="794" fill="#E6FFFA" font-family="Arial, sans-serif" font-size="14" font-weight="700">${esc(checkText)}</text>
  <text x="122" y="818" fill="#9CC8C8" font-family="Arial, sans-serif" font-size="12">${esc(note)}</text>
  <text x="72" y="866" fill="#668D98" font-family="Arial, sans-serif" font-size="11">${esc(english ? 'Sources: ABIT weekly activity · MIT SimMobility · POLARIS integrated agent-based transit | no coefficients imported' : '方法参照：ABIT 一周活动模型 · MIT SimMobility · POLARIS 综合代理交通 | 未导入论文系数')}</text>
  <style>.day,.group-label,.legend,.value{font-family:Arial,sans-serif}.day,.group-label{fill:#B6D3DC;font-size:13px}.legend{fill:#B6D3DC;font-size:12px}.value{fill:#E6FFFA;font-size:12px;font-weight:700}</style>
</svg>`;
}

const readout = buildScreen();
fs.writeFileSync(path.join(root, 'weekly-activity-readout.json'), `${JSON.stringify(readout, null, 2)}\n`);
fs.writeFileSync(path.join(root, '..', '..', 'assets', 'figures', 'weekly-activity-board.svg'), renderBoard(readout, false));
fs.writeFileSync(path.join(root, '..', '..', 'assets', 'figures', 'weekly-activity-board.en.svg'), renderBoard(readout, true));

console.log(JSON.stringify(readout, null, 2));
if (process.argv.includes('--check') && !Object.values(readout.checks).every(Boolean)) process.exitCode = 1;
