#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, '..', '..');
const figureDir = path.join(packageDir, 'assets', 'figures');
const contractPath = path.join(assetDir, 'review-status-contract.json');
const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

if (contract.package_state !== 'ready_for_review') throw new Error('package_state must be ready_for_review');
if (contract.content_review_eligible !== true) throw new Error('content_review_eligible must be true');
if (contract.professional_scoring_eligible !== false) throw new Error('professional_scoring_eligible must be false');
if (contract.axes.length !== 3) throw new Error('expected three status axes');

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function lines(values, x, y, cls, gap = 25) {
  return values.map((value, index) => `<text x="${x}" y="${y + index * gap}" class="${cls}">${esc(value)}</text>`).join('');
}

function board(lang) {
  const zh = lang === 'zh';
  const title = zh ? '三条状态轴。先看包，再看评审资格' : 'Three status axes. Read the package, then its review eligibility';
  const subtitle = zh
    ? '同一份投稿同时说明包完整性、内容评审资格和官方空间数据依赖的正式专业评分资格'
    : 'One submission reports package integrity, content review eligibility and official-spatial-data-dependent professional scoring separately';
  const header = zh ? ['机器门禁', '内容评审', '正式专业评分'] : ['PACKAGE GATES', 'CONTENT REVIEW', 'FORMAL PROFESSIONAL SCORING'];
  const statusLabels = zh ? ['通过', '可进入', '等待官方空间数据'] : ['PASS', 'ELIGIBLE', 'WAITING FOR OFFICIAL SPATIAL DATA'];
  const colors = ['#27C499', '#5EA7FF', '#F0A45D'];
  const supportTitle = zh ? '当前状态可以支持' : 'This state can support';
  const boundaryTitle = zh ? '仍然需要' : 'Still required';
  const footerLeft = zh
    ? '内容评审可以回读包内设计证据。它与 official-geometry-dependent professional scoring 分开记录。'
    : 'Package design evidence may enter content review. It is recorded separately from official-geometry-dependent professional scoring.';
  const footerRight = zh
    ? '来源。manifest · self_check · provisional GeoJSON · review-status-contract.json'
    : 'Evidence. manifest · self_check · provisional GeoJSON · review-status-contract.json';
  const cardMarkup = contract.axes.map((axis, index) => {
    const x = 60 + index * 510;
    const color = colors[index];
    const support = zh ? axis.supports_zh : axis.supports_en;
    const still = zh ? axis.still_requires_zh : axis.still_requires_en;
    const status = statusLabels[index];
    return `<g transform="translate(${x} 190)">
      <rect width="470" height="560" rx="26" fill="#0B2738" stroke="#24556B" stroke-width="2"/>
      <rect width="470" height="12" rx="6" fill="${color}"/>
      <text x="32" y="62" class="card-title">${esc(header[index])}</text>
      <rect x="32" y="88" width="406" height="58" rx="16" fill="${color}20" stroke="${color}" stroke-width="2"/>
      <circle cx="60" cy="117" r="9" fill="${color}"/>
      <text x="84" y="124" class="status">${esc(status)}</text>
      <text x="32" y="184" class="machine">${esc(axis.machine_state)}</text>
      <line x1="32" y1="214" x2="438" y2="214" stroke="#24556B"/>
      <text x="32" y="256" class="section">${esc(supportTitle)}</text>
      ${lines([zh ? axis.label_zh : axis.label_en, support], 32, 292, 'body', 32)}
      <text x="32" y="392" class="section warm">${esc(boundaryTitle)}</text>
      ${lines([still], 32, 428, 'body', 32)}
    </g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title>
  <desc id="desc">${esc(subtitle)}</desc>
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071A2B"/><stop offset="1" stop-color="#0E3448"/></linearGradient><style>.sans{font-family:PingFang SC,Microsoft YaHei,Arial,sans-serif}.eyebrow{font-size:18px;font-weight:900;letter-spacing:3px;fill:#66E3CA}.title{font-size:31px;font-weight:900;fill:#F5FBFF}.sub{font-size:16px;fill:#A9C7D4}.card-title{font-size:18px;font-weight:900;fill:#E8F8FA}.status{font-size:18px;font-weight:900;fill:#F5FBFF}.machine{font-size:15px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;fill:#A9C7D4}.section{font-size:15px;font-weight:900;fill:#66E3CA}.section.warm{fill:#F0A45D}.body{font-size:15px;fill:#DCEEF5}.footer{font-size:14px;fill:#9FC0CF}</style></defs>
  <rect width="1600" height="1000" fill="url(#bg)"/><circle cx="1500" cy="70" r="280" fill="#1C7771" opacity=".16"/><circle cx="90" cy="950" r="260" fill="#3C4F89" opacity=".16"/>
  <text x="60" y="58" class="sans eyebrow">MOBILITY COMMONS / REVIEW STATUS CONTRACT</text>
  <text x="60" y="103" class="sans title">${esc(title)}</text><text x="60" y="133" class="sans sub">${esc(subtitle)}</text>
  ${cardMarkup}
  <rect x="60" y="790" width="1480" height="116" rx="22" fill="#071A2B" stroke="#24556B"/>
  <text x="88" y="832" class="sans footer">${esc(footerLeft)}</text><text x="88" y="866" class="sans footer">${esc(footerRight)}</text>
  <text x="1540" y="952" text-anchor="end" class="sans footer">${esc(zh ? contract.human_label_zh : contract.human_label_en)}</text>
</svg>`;
}

for (const [lang, file] of [['zh', 'review-status-contract.svg'], ['en', 'review-status-contract.en.svg']]) {
  fs.writeFileSync(path.join(figureDir, file), board(lang));
}

console.log(JSON.stringify({
  ok: true,
  contract_id: contract.contract_id,
  axes: contract.axes.map((axis) => ({ id: axis.id, status: axis.status, machine_state: axis.machine_state })),
  generated: ['assets/figures/review-status-contract.svg', 'assets/figures/review-status-contract.en.svg'],
}, null, 2));
