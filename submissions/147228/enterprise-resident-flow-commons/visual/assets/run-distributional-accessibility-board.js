#!/usr/bin/env node

/*
 * Render the accessibility-tail screen from the same aggregate regional runner.
 * The board makes the least-accessible declared bin visible without presenting
 * it as a field audit, a resident outcome, or a route guarantee.
 */
const fs = require('fs');
const path = require('path');

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, '..', '..');
const figureDir = path.join(packageDir, 'assets', 'figures');
const readout = JSON.parse(fs.readFileSync(path.join(assetDir, 'regional-scale-commute-readout.json'), 'utf8'));
const distribution = readout.selected_policy_readout?.distributional_readout;
const nominalGate = Number(readout.optimization_search?.hard_gate_constraints?.maximum_worst_group_accessibility_p10_gap_proxy_points);
const robustScreen = readout.robustness_screen || {};
const robustGate = Number(robustScreen.hard_gate_constraints?.maximum_worst_group_accessibility_p10_gap_proxy_points);
const robustCandidate = (robustScreen.ranked_candidates || [])[0] || {};

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

if (!distribution || Object.keys(distribution.by_group || {}).length !== GROUPS.length) {
  throw new Error('accessibility distributional readout is incomplete');
}
if (!Number.isFinite(nominalGate) || !Number.isFinite(robustGate)) {
  throw new Error('accessibility-tail gates are missing');
}

function pct(value) {
  return `${(Number(value) * 100).toFixed(0)}%`;
}

function board(lang) {
  const zh = lang === 'zh';
  const title = zh ? '最低可达性也要过门' : 'THE LEAST ACCESSIBLE GROUP MUST PASS';
  const subtitle = zh
    ? '同一批 3,122,000 个合成代理 · 六类人分布 · 名义与扰动屏查分别回读'
    : 'The same 3,122,000 synthetic agents · six groups · nominal and stress screens kept separate';
  const note = zh
    ? '可达性代理是方式与条件的合成分箱，不是无障碍走查、居民结果或服务承诺；正式数据到位后整包重算。'
    : 'Accessibility proxies are binned synthetic mode-and-condition inputs, not an accessibility audit, resident result, or service promise; rerun the package when formal data arrives.';
  const labels = zh
    ? {p10: 'P10 尾部', p50: 'P50', p90: 'P90', people: '合成人数', nominal: '名义门', robust: '扰动门'}
    : {p10: 'P10 TAIL', p50: 'P50', p90: 'P90', people: 'SYNTHETIC AGENTS', nominal: 'NOMINAL GATE', robust: 'STRESS GATE'};
  const left = 0.60;
  const right = 1.00;
  const barX = 390;
  const barW = 520;
  const valueX = 940;
  const xFor = (value) => barX + Math.max(0, Math.min(1, (Number(value) - left) / (right - left))) * barW;
  const rows = GROUPS.map((group, index) => {
    const row = distribution.by_group[group.id];
    const y = 230 + index * 78;
    const p10 = Number(row.accessibility_p10_proxy);
    const p50 = Number(row.accessibility_p50_proxy);
    const p90 = Number(row.accessibility_p90_proxy);
    return `<g>
      <rect x="60" y="${y - 28}" width="980" height="62" rx="14" fill="#102A3A" stroke="#2D5366"/>
      <rect x="60" y="${y - 28}" width="7" height="62" rx="3" fill="${group.color}"/>
      <text x="86" y="${y - 2}" class="group">${esc(zh ? group.zh : group.en)}</text>
      <text x="86" y="${y + 20}" class="small">${labels.people} ${Number(row.population_agents).toLocaleString('en-US')}</text>
      <rect x="${barX}" y="${y - 2}" width="${barW}" height="12" rx="6" fill="#244657"/>
      <rect x="${barX}" y="${y - 2}" width="${Math.max(0, xFor(p10) - barX)}" height="12" rx="6" fill="${group.color}" opacity=".92"/>
      <line x1="${xFor(p50)}" y1="${y - 10}" x2="${xFor(p50)}" y2="${y + 18}" stroke="#F5FBFF" stroke-width="2"/>
      <circle cx="${xFor(p90)}" cy="${y + 4}" r="5" fill="#F5FBFF" stroke="#102A3A" stroke-width="2"/>
      <text x="${valueX}" y="${y + 3}" class="value">${pct(p10)}</text>
      <text x="${valueX}" y="${y + 22}" class="tiny">${labels.p50} ${pct(p50)} · ${labels.p90} ${pct(p90)}</text>
    </g>`;
  }).join('');
  const cards = [
    {title: zh ? '名义最弱 P10' : 'NOMINAL WORST P10', value: pct(distribution.worst_group_accessibility_p10_proxy), color: '#F082A7'},
    {title: zh ? '名义 P10 差距' : 'NOMINAL P10 SPREAD', value: `${distribution.worst_group_accessibility_p10_gap_proxy_points} pt`, color: '#F7BF63'},
    {title: labels.nominal, value: `≤ ${nominalGate} pt`, color: '#55E4C1'},
    {title: labels.robust, value: `${robustCandidate.worst_group_accessibility_p10_gap_proxy_points} / ≤ ${robustGate} pt`, color: '#7DA8FF'}
  ].map((card, index) => {
    const x = 1090;
    const y = 218 + index * 112;
    return `<g><rect x="${x}" y="${y}" width="450" height="88" rx="16" fill="#F3F8FA"/><rect x="${x}" y="${y}" width="7" height="88" rx="3" fill="${card.color}"/><text x="${x + 28}" y="${y + 28}" class="cardTitle">${esc(card.title)}</text><text x="${x + 28}" y="${y + 68}" class="cardValue">${esc(card.value)}</text></g>`;
  }).join('');
  const legend = zh
    ? '横条从 60% 起画，颜色到 P10，白线为 P50，白点为 P90。数字只是群体分布筛查，低尾部需要正式无障碍数据验证。'
    : 'Bars start at 60%; color reaches P10, the white line marks P50 and the white dot marks P90. This is a group-distribution screen, pending formal accessibility evidence.';
  const footer = zh
    ? '名义 O4 与扰动 O2 分开显示 · 空中候选仍 blocked · 不发布个人轨迹'
    : 'Nominal O4 and stress O2 remain separate · air candidate stays blocked · no personal traces published';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="920" viewBox="0 0 1600 920" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071A2B"/><stop offset="1" stop-color="#123E4A"/></linearGradient><style>.title{font:850 31px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#F5FBFF}.sub{font:500 15px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#A9C7D4}.group{font:800 17px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#F4FBFF}.small{font:500 11px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#A9C7D4}.tiny{font:500 11px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#B6D3DC}.value{font:850 17px Arial,sans-serif;fill:#F5FBFF}.cardTitle{font:800 12px Arial,PingFang SC,sans-serif;letter-spacing:.8px;fill:#5E7D88}.cardValue{font:850 28px Arial,PingFang SC,sans-serif;fill:#102A3A}.foot{font:500 12px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#B6D3DC}.axis{font:500 11px Arial,PingFang SC,sans-serif;fill:#91B4C0}</style></defs><rect width="1600" height="920" fill="url(#bg)"/><circle cx="1490" cy="20" r="280" fill="#2A9D8F" opacity=".14"/><circle cx="30" cy="820" r="240" fill="#5B8DEF" opacity=".12"/><text x="60" y="54" fill="#66E3CA" font-size="17" font-weight="900" letter-spacing="3">MOBILITY COMMONS / DISTRIBUTIONAL ACCESSIBILITY</text><text x="60" y="96" class="title">${esc(title)}</text><text x="60" y="126" class="sub">${esc(subtitle)}</text><rect x="60" y="151" width="1480" height="34" rx="10" fill="#0B2738" stroke="#2A9D8F"/><text x="80" y="174" class="foot">${esc(note)}</text><text x="${barX}" y="210" class="axis">60%</text><text x="${xFor(.8)}" y="210" class="axis">80%</text><text x="${xFor(.9)}" y="210" class="axis">90%</text><text x="${xFor(1)}" y="210" class="axis">100%</text>${rows}${cards}<rect x="60" y="718" width="1480" height="76" rx="14" fill="#102A3A" stroke="#2D5366"/><text x="84" y="748" class="foot">${esc(legend)}</text><text x="84" y="774" class="foot">${esc(footer)}</text><text x="60" y="706" class="foot">${esc(zh ? '方法：同一 runner 对每名合成代理保留可达性分箱，只发布群体聚合和分位数上界。' : 'Method: the same runner bins accessibility for every synthetic agent, then publishes only group aggregates and percentile upper bounds.')}</text></svg>`;
}

fs.writeFileSync(path.join(figureDir, 'distributional-accessibility-board.svg'), board('zh'), 'utf8');
fs.writeFileSync(path.join(figureDir, 'distributional-accessibility-board.en.svg'), board('en'), 'utf8');
console.log(JSON.stringify({ok: true, generated: ['assets/figures/distributional-accessibility-board.svg', 'assets/figures/distributional-accessibility-board.en.svg'], groups: GROUPS.length}, null, 2));
