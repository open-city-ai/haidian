#!/usr/bin/env node

/* Render the proposed Commute Commons identity and three public experience nodes. */
const fs = require('fs');
const path = require('path');

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, '..', '..');
const figureDir = path.join(packageDir, 'assets', 'figures');
const data = JSON.parse(fs.readFileSync(path.join(assetDir, 'brand-system.json'), 'utf8'));
if (!Array.isArray(data.public_experience_nodes) || data.public_experience_nodes.length !== 3) {
  throw new Error('brand system must declare three public experience nodes');
}

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function board(lang) {
  const zh = lang === 'zh';
  const title = zh ? '通勤共益调度台：交通系统的品牌与公共体验入口' : 'COMMUTE CO-BENEFIT COMMONS: IDENTITY AND PUBLIC EXPERIENCE ENTRIES';
  const subtitle = zh ? '三处重点区组成一条可观察、可使用、可复核的未来体验路线；当前未排期、未授权' : 'Three key areas form a future route for observing, using and reviewing the system; unscheduled and unauthorised';
  const nodes = data.public_experience_nodes.map((node, index) => {
    const x = 90 + index * 490;
    const accent = [data.visual_tokens.teal, data.visual_tokens.blue, data.visual_tokens.coral][index];
    const name = zh ? node.name_zh : node.name_en;
    const role = zh ? node.role_zh : node.role_en;
    const experience = zh ? node.experience_zh : node.experience_en;
    return `<g><rect x="${x}" y="450" width="430" height="318" rx="24" fill="#102A3A" stroke="#2D5366" stroke-width="2"/><rect x="${x}" y="450" width="10" height="318" rx="5" fill="${accent}"/><circle cx="${x + 54}" cy="510" r="24" fill="#071A2B" stroke="${accent}" stroke-width="5"/><text x="${x + 54}" y="517" text-anchor="middle" class="nodeId" fill="${accent}">${esc(node.id)}</text><text x="${x + 96}" y="512" class="nodeTitle">${esc(name)}</text><text x="${x + 30}" y="570" class="label" fill="${accent}">${esc(zh ? '它让人看见' : 'PUBLIC ROLE')}</text><text x="${x + 30}" y="600" class="body">${esc(role)}</text><text x="${x + 30}" y="648" class="label" fill="${accent}">${esc(zh ? '体验入口' : 'ACCESS')}</text><text x="${x + 30}" y="678" class="body">${esc(experience)}</text><text x="${x + 30}" y="726" class="status">${esc(zh ? '设计目标 · unknown_until_authorized' : 'DESIGN TARGET · unknown_until_authorized')}</text></g>`;
  }).join('');
  const sequence = zh ? data.pilgrimage_contract.sequence_zh : data.pilgrimage_contract.sequence_en;
  const purpose = zh ? data.pilgrimage_contract.purpose_zh : data.pilgrimage_contract.purpose_en;
  const boundary = zh ? '这是品牌与公共体验合同，不是官方 Logo、活动、景点、合作或运营结果。' : 'This is an identity and public-experience contract, not an official logo, event, attraction, partnership or operating result.';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="980" viewBox="0 0 1600 980" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071A2B"/><stop offset="1" stop-color="#123E4A"/></linearGradient><style>.sans{font-family:PingFang SC,Microsoft YaHei,Arial,sans-serif}.title{font-size:31px;font-weight:850;fill:#F5FBFF}.sub{font-size:15px;fill:#A9C7D4}.brand{font-size:42px;font-weight:900;fill:#F5FBFF;letter-spacing:2px}.brandEn{font-size:16px;font-weight:800;fill:#66E3CA;letter-spacing:3px}.nodeId{font:900 13px Arial,sans-serif}.nodeTitle{font:800 20px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#F5FBFF}.label{font:800 11px Arial,PingFang SC,sans-serif;letter-spacing:1px}.body{font:500 15px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#D8EAF0}.status{font:800 11px Arial,PingFang SC,sans-serif;fill:#9CF2DE}</style></defs><rect width="1600" height="980" fill="url(#bg)"/><circle cx="1470" cy="80" r="310" fill="#2A9D8F" opacity=".14"/><circle cx="80" cy="900" r="260" fill="#5B8DEF" opacity=".12"/><text x="70" y="56" class="sans" fill="#66E3CA" font-size="17" font-weight="900" letter-spacing="3">COMMUTE CO-BENEFIT COMMONS / BRAND SYSTEM</text><text x="70" y="98" class="sans title">${esc(title)}</text><text x="70" y="125" class="sans sub">${esc(subtitle)}</text><g transform="translate(110 180)"><circle cx="70" cy="70" r="58" fill="none" stroke="#55E4C1" stroke-width="10" stroke-dasharray="220 90"/><circle cx="70" cy="8" r="13" fill="#7DA8FF"/><circle cx="16" cy="104" r="13" fill="#F082A7"/><circle cx="124" cy="104" r="13" fill="#F7BF63"/><path d="M70 8 L16 104 L124 104 Z" fill="none" stroke="#D8EAF0" stroke-width="3" opacity=".9"/><circle cx="70" cy="70" r="10" fill="#F5FBFF"/><path d="M70 70 L70 8" stroke="#F5FBFF" stroke-width="4"/></g><text x="280" y="230" class="brand">${esc(data.brand_name_zh)}</text><text x="282" y="263" class="brandEn">${esc(data.brand_name_en.toUpperCase())}</text><text x="282" y="310" class="sub">${esc(zh ? data.tagline_zh : data.tagline_en)}</text><text x="282" y="356" class="body">${esc(zh ? data.logo_contract.meaning_zh : data.logo_contract.meaning_en)}</text><path d="M280 390 H1320" stroke="#2D5366"/><text x="90" y="425" class="label" fill="#66E3CA">${esc(zh ? '三处公共体验节点' : 'THREE PUBLIC EXPERIENCE NODES')}</text>${nodes}<path d="M290 832 C540 900 1060 900 1310 832" fill="none" stroke="#55E4C1" stroke-width="4" stroke-dasharray="12 12"/><text x="800" y="865" text-anchor="middle" class="body">${esc(sequence)}</text><text x="800" y="902" text-anchor="middle" class="sub">${esc(purpose)}</text><text x="800" y="950" text-anchor="middle" class="status">${esc(boundary)}</text></svg>`;
}

fs.writeFileSync(path.join(figureDir, 'brand-system-board.svg'), board('zh'));
fs.writeFileSync(path.join(figureDir, 'brand-system-board.en.svg'), board('en'));

function updateVisualIndex(file, lang) {
  const target = path.join(packageDir, 'visual', file);
  let html = fs.readFileSync(target, 'utf8');
  const zh = lang === 'zh';
  const nav = zh ? '<a href="#18">品牌与体验</a>' : '<a href="#18">Identity & experience</a>';
  const metricLink = zh ? '<a href="#9">核心指标</a>' : '<a href="#9">Core metrics</a>';
  if (!html.includes('href="#18"')) html = html.replace(metricLink, `${nav}${metricLink}`);
  const section = zh
    ? '<section id="18" class="evidence brand-system-board"><div class="section-head"><span class="section-no">19</span><h2>“通勤共益调度台”品牌与公共体验</h2><span class="tag">未排期</span></div><p>三处节点分别让人观察企业问题、使用居民入口、复核轨道与路缘。它是公开学习和复核路线，不是官方 Logo、活动、景点或运营结果。</p><img src="../assets/figures/brand-system-board.svg" alt="通勤共益调度台品牌与公共体验节点"><div class="micro">brand-system.json · design_brand_not_operational · not_scheduled_not_authorized</div></section>'
    : '<section id="18" class="evidence brand-system-board"><div class="section-head"><span class="section-no">19</span><h2>Commute Commons identity and public experience</h2><span class="tag">UNSCHEDULED</span></div><p>Three nodes let people observe enterprise needs, use the resident entry, and review rail and curb. This is a public learning and review route, not an official logo, event, attraction or operating result.</p><img src="../assets/figures/brand-system-board.en.svg" alt="Commute Commons identity and public experience nodes"><div class="micro">brand-system.json · design_brand_not_operational · not_scheduled_not_authorized</div></section>';
  const style = '<style>.brand-system-board{background:#eef7f5}.brand-system-board img{background:#071A2B;border-color:#2A9D8F}.brand-system-board .micro{color:#5E7D88}</style>';
  html = html.replace(/<section id="18" class="evidence brand-system-board">.*?<\/section>/g, '');
  html = html.replaceAll(style, '');
  html = html.replace('<section id="17" class="evidence scenario-card-board">', `${section}<section id="17" class="evidence scenario-card-board">`);
  html = html.replace('</head>', `${style}</head>`);
  fs.writeFileSync(target, html);
}

updateVisualIndex('index.html', 'zh');
updateVisualIndex('index.en.html', 'en');

console.log(JSON.stringify({
  ok: true,
  node_count: data.public_experience_nodes.length,
  generated: ['assets/figures/brand-system-board.svg', 'assets/figures/brand-system-board.en.svg'],
  visual_index: ['visual/index.html', 'visual/index.en.html'],
  status: data.status,
  pilgrimage_status: data.pilgrimage_contract.status,
}, null, 2));
