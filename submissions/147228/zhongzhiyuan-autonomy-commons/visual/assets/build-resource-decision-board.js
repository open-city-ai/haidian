#!/usr/bin/env node
/* Build the bilingual resource-and-decision board from the package contract. */
const fs = require('fs');
const path = require('path');

const here = __dirname;
const packageDir = path.resolve(here, '..', '..');
const data = JSON.parse(fs.readFileSync(path.join(here, 'resource-decision-board.json'), 'utf8'));
const figureDir = path.join(packageDir, 'assets', 'figures');
fs.mkdirSync(figureDir, { recursive: true });

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function wrap(text, max) {
  const chars = Array.from(String(text));
  const lines = [];
  for (let i = 0; i < chars.length; i += max) lines.push(chars.slice(i, i + max).join(''));
  return lines;
}
function textBlock(x, y, value, options = {}) {
  const lines = wrap(value, options.max || 22);
  const size = options.size || 15;
  const fill = options.fill || '#DCEEF5';
  const weight = options.weight || 500;
  return lines.map((line, i) => `<text x="${x}" y="${y + i * (size + 5)}" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(line)}</text>`).join('');
}

function render(lang) {
  const zh = lang === 'zh';
  const title = zh ? '资源与决策板：谁能提出、谁能暂停、什么证据才能扩展' : 'Resource and decision board: propose, pause, and expand only with evidence';
  const subtitle = zh ? '自动驾驶公共带 · 概念程序 · 不提供预算、许可或运营结果' : 'Autonomous-mobility commons · conceptual procedure · no budget, permit, or operating result';
  const header = zh ? ['资源类别', '谁持有公共底线', '资源渠道（待确认）', '否决/暂停条件'] : ['Resource class', 'Who holds the public floor', 'Resource route (to confirm)', 'Veto / pause condition'];
  const colors = ['#2A9D8F', '#6EA5FF', '#F5B84B', '#F07D9E', '#B8A1FF'];
  const rowY = 205;
  const rowH = 130;
  const x = [58, 300, 655, 1015];
  const w = [220, 335, 340, 520];
  const rows = data.resource_classes.map((item, index) => {
    const y = rowY + index * rowH;
    const name = zh ? item.name_zh : item.name_en;
    const holds = zh ? item.holds_zh : item.holds_en;
    const route = zh ? item.resource_route_zh : item.resource_route_en;
    const veto = zh ? item.veto_zh : item.veto_en;
    return `<g><rect x="40" y="${y - 18}" width="1520" height="${rowH - 8}" rx="16" fill="#0B2738" stroke="#24556B"/><rect x="40" y="${y - 18}" width="10" height="${rowH - 8}" rx="5" fill="${colors[index]}"/>${textBlock(x[0], y + 12, name, { max: zh ? 12 : 22, size: 17, fill: '#F7FBFF', weight: 800 })}${textBlock(x[1], y + 8, holds, { max: zh ? 22 : 36, size: 14 })}${textBlock(x[2], y + 8, route, { max: zh ? 22 : 36, size: 14, fill: '#B7D4DE' })}${textBlock(x[3], y + 8, veto, { max: zh ? 32 : 54, size: 14, fill: '#FFD8DE' })}</g>`;
  }).join('');
  const stageTitle = zh ? '四道决策门：任何一项缺失都不自动升级' : 'Four decision gates: a missing item never upgrades automatically';
  const stageW = 365;
  const stageY = 880;
  const stages = data.decision_stages.map((stage, index) => {
    const sx = 45 + index * 385;
    const name = zh ? stage.stage_zh : stage.stage_en;
    const decision = zh ? stage.decision_zh : stage.decision_en;
    const stop = zh ? stage.stop_zh : stage.stop_en;
    return `<g><rect x="${sx}" y="${stageY}" width="${stageW}" height="180" rx="18" fill="#102F43" stroke="${colors[index]}" stroke-width="2"/><text x="${sx + 18}" y="${stageY + 28}" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif" font-size="16" font-weight="800" fill="${colors[index]}">${esc(`${index + 1}  ${name}`)}</text>${textBlock(sx + 18, stageY + 58, decision, { max: zh ? 24 : 37, size: 13, fill: '#E6F4F8' })}${textBlock(sx + 18, stageY + 112, stop, { max: zh ? 24 : 37, size: 13, fill: '#FFD8DE' })}</g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}</desc>
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071A2B"/><stop offset="1" stop-color="#103E50"/></linearGradient></defs>
  <rect width="1600" height="1100" fill="url(#bg)"/><circle cx="1450" cy="90" r="260" fill="#2A9D8F" opacity=".16"/><circle cx="80" cy="1040" r="260" fill="#6EA5FF" opacity=".12"/>
  <text x="58" y="58" font-family="Arial, sans-serif" font-size="16" font-weight="900" letter-spacing="3" fill="#66E3CA">AUTONOMY COMMONS / RESOURCE AND DECISION RIGHTS</text>
  <text x="58" y="104" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif" font-size="31" font-weight="900" fill="#F7FBFF">${esc(title)}</text>
  <text x="58" y="137" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif" font-size="16" fill="#A9C7D4">${esc(subtitle)}</text>
  <rect x="40" y="168" width="1520" height="45" rx="12" fill="#153D4E" stroke="#2A9D8F"/><text x="58" y="197" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif" font-size="15" font-weight="800" fill="#66E3CA">${esc(zh ? '公共底线先于自动化 · 提案不能自我放行 · 资源不购买公共性' : 'PUBLIC FLOOR BEFORE AUTOMATION · PROPOSER CANNOT SELF-RELEASE · RESOURCES DO NOT BUY PUBLICNESS')}</text>
  ${header.map((label, i) => `<text x="${x[i]}" y="${rowY - 32}" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif" font-size="14" font-weight="800" fill="#66E3CA">${esc(label)}</text>`).join('')}
  ${rows}
  <text x="45" y="850" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif" font-size="19" font-weight="900" fill="#F7FBFF">${esc(stageTitle)}</text>
  ${stages}
  <text x="58" y="1082" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif" font-size="12" fill="#9FC0CF">${esc(zh ? '数据来源：包内 contract、场景卡、准备度台账与公共利益审计 · provisional / not authorized / not a score' : 'Source: package contracts, scenario cards, readiness register, and public-interest audit · provisional / not authorized / not a score')}</text>
</svg>`;
}

fs.writeFileSync(path.join(figureDir, 'resource-decision-board.svg'), render('zh'));
fs.writeFileSync(path.join(figureDir, 'resource-decision-board.en.svg'), render('en'));
console.log(JSON.stringify({ ok: true, generated: ['assets/figures/resource-decision-board.svg', 'assets/figures/resource-decision-board.en.svg'], not_a_score: true }, null, 2));
