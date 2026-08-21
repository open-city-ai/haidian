#!/usr/bin/env node

/*
 * Render the population-scale distributional screen as a bilingual board.
 * The source is the same aggregate runner readout; the board does not add
 * local observations, person-level traces, or an implementation claim.
 */
const fs = require('fs');
const path = require('path');

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, '..', '..');
const figureDir = path.join(packageDir, 'assets', 'figures');
const readout = JSON.parse(fs.readFileSync(path.join(assetDir, 'regional-scale-commute-readout.json'), 'utf8'));
const distribution = readout.selected_policy_readout?.distributional_readout;
const gate = readout.optimization_search?.hard_gate_constraints || {};

const GROUPS = [
  {id: 'enterprise_employee', zh: '企业员工', en: 'Enterprise employees', color: '#55E4C1'},
  {id: 'resident_worker', zh: '居民工作者', en: 'Resident workers', color: '#7DA8FF'},
  {id: 'carer_or_child', zh: '照护者 / 儿童', en: 'Carers / children', color: '#F7BF63'},
  {id: 'visitor_service', zh: '访客 / 服务', en: 'Visitors / service', color: '#B7A4FF'},
  {id: 'logistics_and_maintenance', zh: '物流 / 维护', en: 'Logistics / maintenance', color: '#F082A7'},
  {id: 'night_worker', zh: '夜班工作者', en: 'Night workers', color: '#5ED6D0'}
];

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function wrap(text, max) {
  const value = String(text);
  if (/\s/.test(value)) {
    const lines = [];
    let line = '';
    for (const word of value.split(/\s+/)) {
      const next = line ? `${line} ${word}` : word;
      if ([...next].length <= max) line = next;
      else {
        if (line) lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
    return lines;
  }
  const chars = [...value];
  const lines = [];
  for (let i = 0; i < chars.length; i += max) lines.push(chars.slice(i, i + max).join(''));
  return lines;
}

function textBlock(x, y, value, className, max = 42, lineHeight = 18) {
  return wrap(value, max).map((line, index) =>
    `<text x="${x}" y="${y + index * lineHeight}" class="${className}">${esc(line)}</text>`
  ).join('');
}

if (!distribution || Object.keys(distribution.by_group || {}).length !== GROUPS.length) {
  throw new Error('distributional readout is incomplete');
}
if (readout.checks?.optimized_worst_group_satisfaction_screen_pass !== true) {
  throw new Error('nominal worst-group satisfaction screen did not pass');
}

function board(lang) {
  const zh = lang === 'zh';
  const title = zh ? '平均值之外：六类人的出行分布' : 'BEYOND THE MEAN: SIX GROUPS, ONE DISTRIBUTIONAL SCREEN';
  const subtitle = zh
    ? 'O4 名义候选 · 每人一条合成动线 · 时间与综合出行压力按群体分箱回读'
    : 'O4 nominal candidate · one synthetic chain per agent · group-binned travel time and mobility-pressure readout';
  const note = zh
    ? '分位数是声明分箱的上界，不是居民调查、现场 OD 或运营绩效；分数保护和现场复核仍然有效。'
    : 'Percentiles are upper bounds of declared bins, not resident surveys, observed OD, or operating performance; score protection and field review remain in force.';
  const label = zh
    ? {p10: '满意度代理 P10', p50: 'P50', p90: 'P90', time: '通勤时间 P50 / P90', people: '合成人数'}
    : {p10: 'SATISFACTION PROXY P10', p50: 'P50', p90: 'P90', time: 'TRAVEL TIME P50 / P90', people: 'SYNTHETIC AGENTS'};
  const rows = GROUPS.map((group, index) => {
    const row = distribution.by_group[group.id];
    const y = 226 + index * 82;
    const p10 = Number(row.satisfaction_p10_proxy_points);
    const p50 = Number(row.satisfaction_p50_proxy_points);
    const p90 = Number(row.satisfaction_p90_proxy_points);
    const p10Width = Math.max(0, Math.min(100, p10)) * 4.6;
    const p50X = 340 + Math.max(0, Math.min(100, p50)) * 4.6;
    return `<g>
      <rect x="60" y="${y - 28}" width="910" height="66" rx="14" fill="#102A3A" stroke="#2D5366"/>
      <rect x="60" y="${y - 28}" width="7" height="66" rx="3" fill="${group.color}"/>
      <text x="86" y="${y - 3}" class="group">${esc(zh ? group.zh : group.en)}</text>
      <text x="86" y="${y + 20}" class="small">${label.people} ${Number(row.population_agents).toLocaleString('en-US')}</text>
      <text x="340" y="${y - 11}" class="small">${esc(label.p10)}</text>
      <rect x="340" y="${y}" width="460" height="12" rx="6" fill="#244657"/>
      <rect x="340" y="${y}" width="${p10Width}" height="12" rx="6" fill="${group.color}" opacity=".92"/>
      <line x1="${p50X}" y1="${y - 6}" x2="${p50X}" y2="${y + 18}" stroke="#F5FBFF" stroke-width="2"/>
      <text x="820" y="${y + 10}" class="value">${p10} / 100</text>
      <text x="340" y="${y + 31}" class="tiny">${label.p50} ${p50} · ${label.p90} ${p90}</text>
      <text x="650" y="${y + 31}" class="tiny">${esc(label.time)} ${row.travel_time_p50_proxy_minutes} / ${row.travel_time_p90_proxy_minutes} min</text>
    </g>`;
  }).join('');
  const cards = [
    {title: zh ? '最弱群体 P10' : 'WORST-GROUP P10', value: `${distribution.worst_group_satisfaction_p10_proxy}/100`, color: '#F082A7'},
    {title: zh ? 'P10 差距' : 'P10 SPREAD', value: zh ? `${distribution.worst_group_satisfaction_p10_gap_proxy_points} 个代理分` : `${distribution.worst_group_satisfaction_p10_gap_proxy_points} proxy points`, color: '#F7BF63'},
    {title: zh ? '最差 P90 时间' : 'WORST P90 TIME', value: zh ? `${distribution.worst_group_p90_travel_time_proxy_minutes} 分钟` : `${distribution.worst_group_p90_travel_time_proxy_minutes} minutes`, color: '#7DA8FF'},
    {title: zh ? 'P10 差距门' : 'P10-GAP GATE', value: zh ? `≤ ${gate.maximum_worst_group_satisfaction_p10_gap_proxy_points} 个代理分` : `≤ ${gate.maximum_worst_group_satisfaction_p10_gap_proxy_points} proxy points`, color: '#55E4C1'}
  ].map((card, index) => {
    const x = 1035;
    const y = 210 + index * 112;
    return `<g><rect x="${x}" y="${y}" width="505" height="88" rx="16" fill="#F3F8FA"/><rect x="${x}" y="${y}" width="7" height="88" rx="3" fill="${card.color}"/><text x="${x + 28}" y="${y + 28}" class="cardTitle">${esc(card.title)}</text><text x="${x + 28}" y="${y + 68}" class="cardValue">${esc(card.value)}</text></g>`;
  }).join('');
  const legend = zh
    ? '横条显示满意度代理 P10，白线为 P50；每个群体的 P90 和 P50/P90 通勤时间另列。O4 仍需正式 OD、容量、无障碍和满意度证据。'
    : 'Bars show satisfaction-proxy P10 and the white marker shows P50; P90 and P50/P90 travel-time bins are listed per group. O4 still requires formal OD, capacity, accessibility and satisfaction evidence.';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="920" viewBox="0 0 1600 920" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071A2B"/><stop offset="1" stop-color="#123E4A"/></linearGradient><style>.sans{font-family:PingFang SC,Microsoft YaHei,Arial,sans-serif}.title{font:850 30px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#F5FBFF}.sub{font:500 15px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#A9C7D4}.group{font:800 17px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#F4FBFF}.small{font:500 11px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#A9C7D4}.tiny{font:500 11px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#B6D3DC}.value{font:850 16px Arial,sans-serif;fill:#F5FBFF}.cardTitle{font:800 12px Arial,PingFang SC,sans-serif;letter-spacing:.8px;fill:#5E7D88}.cardValue{font:850 28px Arial,PingFang SC,sans-serif;fill:#102A3A}.foot{font:500 12px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#B6D3DC}</style></defs><rect width="1600" height="920" fill="url(#bg)"/><circle cx="1500" cy="30" r="280" fill="#2A9D8F" opacity=".14"/><circle cx="40" cy="820" r="240" fill="#5B8DEF" opacity=".12"/><text x="60" y="54" class="sans" fill="#66E3CA" font-size="17" font-weight="900" letter-spacing="3">MOBILITY COMMONS / DISTRIBUTIONAL EQUITY</text><text x="60" y="94" class="title">${esc(title)}</text><text x="60" y="124" class="sub">${esc(subtitle)}</text><rect x="60" y="152" width="1480" height="32" rx="10" fill="#0B2738" stroke="#2A9D8F"/><text x="80" y="174" class="foot">${esc(note)}</text>${rows}${cards}<rect x="60" y="748" width="1480" height="64" rx="14" fill="#102A3A" stroke="#2D5366"/><text x="84" y="776" class="foot">${esc(legend)}</text><text x="84" y="798" class="foot">${esc(zh ? '方法：同一 runner 按 3,122,000 个合成代理计数；仅保留群体聚合与分箱，不发布个人轨迹。' : 'Method: the same runner counts 3,122,000 synthetic agents; only group aggregates and bins are retained, with no personal traces published.')}</text><text x="60" y="870" class="foot">${esc(zh ? '区域人口规模参考 · 合成分布屏查 · 不是居民满意度或现场运营结果' : 'Regional population reference · synthetic distribution screen · not resident satisfaction or field operation')}</text></svg>`;
}

fs.writeFileSync(path.join(figureDir, 'distributional-equity-board.svg'), board('zh'), 'utf8');
fs.writeFileSync(path.join(figureDir, 'distributional-equity-board.en.svg'), board('en'), 'utf8');
console.log(JSON.stringify({ok: true, generated: ['assets/figures/distributional-equity-board.svg', 'assets/figures/distributional-equity-board.en.svg'], groups: GROUPS.length}, null, 2));
