#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const packageRoot = path.resolve(__dirname, '..', '..');
const figureDir = path.join(packageRoot, 'assets', 'figures');
const sharp = require(process.env.AI_ERA_SHARP_MODULE || 'sharp');
const dossier = JSON.parse(fs.readFileSync(path.join(__dirname, 'ai-era-pilot-dossier.json'), 'utf8'));

if (dossier.decision !== 'HOLD' || dossier.design_only !== true || dossier.field_observation_count !== 0) {
  throw new Error('Pilot dossier must remain design-only, HOLD and without field observations.');
}

const W = 2400;
const H = 1350;
const C = {
  navy: '#14213d', ink: '#172033', paper: '#f5f2e9', white: '#fffdfa', muted: '#627083',
  line: '#cfd8e4', blue: '#3975d5', blueSoft: '#dfeafb', teal: '#188f8a', tealSoft: '#dcefeb',
  orange: '#df784e', orangeSoft: '#f6dfd5', gold: '#d4a62b', goldSoft: '#f5e9bd', red: '#c6534b',
  green: '#347f62', greenSoft: '#dce9df', purple: '#7c63b7', purpleSoft: '#e9e2f3'
};

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function text(x, y, value, size, options = {}) {
  return `<text x="${x}" y="${y}" text-anchor="${options.anchor || 'start'}" font-size="${size}" font-weight="${options.weight || 400}" fill="${options.fill || C.ink}" letter-spacing="${options.letter || 0}">${esc(value)}</text>`;
}

function wrapped(x, y, value, size, widthChars, options = {}) {
  const words = String(value).split(/\s+/);
  const rows = [];
  let current = '';
  if (/^[\x00-\xff\s]+$/.test(String(value))) {
    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (next.length > widthChars && current) { rows.push(current); current = word; } else current = next;
    }
    if (current) rows.push(current);
  } else {
    const chars = Array.from(String(value));
    for (let i = 0; i < chars.length; i += widthChars) rows.push(chars.slice(i, i + widthChars).join(''));
  }
  const gap = options.gap || Math.round(size * 1.35);
  return rows.slice(0, options.maxRows || 4).map((row, index) => text(x, y + index * gap, row, size, options)).join('');
}

function rect(x, y, width, height, options = {}) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${options.radius ?? 18}" fill="${options.fill ?? C.white}" stroke="${options.stroke ?? C.line}" stroke-width="${options.sw ?? 2}"${options.dash ? ` stroke-dasharray="${options.dash}"` : ''}/>`;
}

function line(x1, y1, x2, y2, options = {}) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${options.stroke || C.ink}" stroke-width="${options.sw || 3}" stroke-linecap="round"${options.dash ? ` stroke-dasharray="${options.dash}"` : ''}/>`;
}

function dimension(x1, y1, x2, y2, label, vertical = false) {
  const cap = 10;
  let out = line(x1, y1, x2, y2, { stroke: C.ink, sw: 2 });
  if (vertical) {
    out += line(x1 - cap, y1, x1 + cap, y1, { sw: 2 }) + line(x2 - cap, y2, x2 + cap, y2, { sw: 2 });
    out += text(x1 - 18, (y1 + y2) / 2 + 6, label, 20, { anchor: 'end', weight: 700 });
  } else {
    out += line(x1, y1 - cap, x1, y1 + cap, { sw: 2 }) + line(x2, y2 - cap, x2, y2 + cap, { sw: 2 });
    out += text((x1 + x2) / 2, y1 - 10, label, 20, { anchor: 'middle', weight: 700 });
  }
  return out;
}

function start(title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}"><rect width="${W}" height="${H}" fill="${C.paper}"/><g font-family="Arial, PingFang SC, Noto Sans CJK SC, sans-serif">`;
}

function header(code, titleValue, subtitle, lang) {
  let out = text(78, 68, code, 20, { fill: C.teal, weight: 700, letter: 1.2 });
  out += text(2322, 68, 'V2.9 / LOW-CONFIDENCE GEOMETRY / HOLD', 19, { anchor: 'end', fill: C.orange, weight: 700 });
  out += text(78, 145, titleValue, lang === 'zh' ? 52 : 44, { weight: 760 });
  out += text(78, 198, subtitle, lang === 'zh' ? 23 : 19, { fill: C.muted });
  out += line(78, 232, 2322, 232, { stroke: C.line, sw: 2 });
  return out;
}

function planBoard(lang) {
  const zh = lang === 'zh';
  const titleValue = zh ? '一个节点，三张能被追问的图' : 'One node, three drawings that can be challenged';
  const subtitle = zh ? 'ALT-C 试点：先画普通路径、人工接管、停用与维护，再放入可撤回 AI 服务岛' : 'ALT-C pilot: ordinary route, takeover, blackout and maintenance precede the removable AI island';
  let out = start(titleValue) + header('AI ORIGIN ORDINARY-SERVICE NODE / 01', titleValue, subtitle, lang);

  out += rect(78, 270, 1040, 890, { fill: C.white, stroke: C.teal, sw: 3, radius: 26 });
  out += text(112, 325, zh ? '1:500 平面设计目标' : '1:500 PLAN DESIGN TARGET', zh ? 29 : 25, { weight: 730 });
  out += text(1078, 325, '30.0 m × 18.0 m', 22, { anchor: 'end', fill: C.teal, weight: 700 });
  const px = 148; const py = 398; const pw = 900; const ph = 540; const s = 30;
  out += rect(px, py, pw, ph, { fill: '#f7fafb', stroke: C.ink, sw: 4, radius: 0 });
  out += rect(px, py, 2.4 * s, ph, { fill: C.purpleSoft, stroke: C.purple, sw: 2, radius: 0 });
  out += `<text x="${px + 42}" y="${py + ph / 2}" text-anchor="middle" font-size="${zh ? 18 : 15}" font-weight="700" fill="${C.purple}" transform="rotate(-90 ${px + 42} ${py + ph / 2})">${zh ? '独立维护通道' : 'INDEPENDENT MAINTENANCE ACCESS'}</text>`;
  out += rect(px, py + ph - 3 * s, pw, 3 * s, { fill: C.greenSoft, stroke: C.green, sw: 3, radius: 0 });
  out += text(px + pw / 2, py + ph - 35, zh ? '3.0 m 连续普通路径｜BASE、BLACKOUT、CLOSEOUT 均开放' : '3.0 m ORDINARY ROUTE · OPEN IN BASE, BLACKOUT AND CLOSEOUT', zh ? 18 : 15, { anchor: 'middle', fill: C.green, weight: 700 });
  out += rect(px + 115, py + 55, 6 * s, 4 * s, { fill: C.blueSoft, stroke: C.blue, sw: 3, radius: 8 });
  out += wrapped(px + 205, py + 102, zh ? '人工服务与纸面回执 6×4 m' : 'STAFFED SERVICE + PAPER RECEIPT 6×4 m', zh ? 18 : 15, zh ? 11 : 20, { anchor: 'middle', weight: 700, fill: C.blue, maxRows: 3 });
  out += rect(px + 115, py + 205, 6 * s, 4 * s, { fill: C.goldSoft, stroke: C.gold, sw: 3, radius: 8 });
  out += wrapped(px + 205, py + 252, zh ? '低刺激等候与语音入口 6×4 m' : 'LOW-STIMULATION WAIT + VOICE ENTRY 6×4 m', zh ? 18 : 15, zh ? 11 : 20, { anchor: 'middle', weight: 700, fill: '#7c5c00', maxRows: 3 });
  const ringX = px + 465; const ringY = py + 92; const ringW = 8 * s; const ringH = 7 * s;
  out += rect(ringX, ringY, ringW, ringH, { fill: C.orangeSoft, stroke: C.orange, sw: 3, dash: '12 8', radius: 8 });
  out += rect(ringX + 2 * s, ringY + 2 * s, 4 * s, 3 * s, { fill: C.orange, stroke: C.ink, sw: 3, radius: 8 });
  out += wrapped(ringX + ringW / 2, ringY + 34, zh ? '2.0 m 净空环' : '2.0 m CLEAR RING', 17, 16, { anchor: 'middle', weight: 700, fill: C.orange });
  out += wrapped(ringX + ringW / 2, ringY + 132, zh ? '可撤回 AI 服务岛 4×3 m' : 'REMOVABLE AI ISLAND 4×3 m', zh ? 17 : 14, 18, { anchor: 'middle', weight: 800, fill: C.white, maxRows: 2 });
  out += line(ringX + ringW, ringY + ringH / 2, px + pw - 35, ringY + ringH / 2, { stroke: C.red, sw: 5, dash: '14 9' });
  out += text(px + pw - 35, ringY + ringH / 2 - 15, zh ? '停用后撤出' : 'BLACKOUT RETREAT', 16, { anchor: 'end', fill: C.red, weight: 700 });
  out += dimension(px, py - 34, px + pw, py - 34, '30.0 m');
  out += dimension(px - 34, py, px - 34, py + ph, '18.0 m', true);
  out += dimension(px, py + ph + 45, px + 3 * s, py + ph + 45, '3.0 m');
  out += text(148, 1010, zh ? '两处 1.8 m 退出口｜容量公式保持 HOLD，release_capacity=null' : 'Two 1.8 m exit mouths · capacity formula stays HOLD · release_capacity=null', zh ? 18 : 15, { fill: C.muted, weight: 600 });
  out += text(148, 1050, zh ? '低置信宿主：PROV-KEY-002 / PUBLIC-03 / SCN-03；9 个 formal features 可回读。' : 'Low-confidence hosts: PROV-KEY-002 / PUBLIC-03 / SCN-03; 9 formal features resolve.', zh ? 17 : 14, { fill: C.orange });
  out += text(148, 1082, zh ? 'PUBLIC-02 / SCN-02 位于临时重点区外，不作本节点选址证据；正式资料到位后整体重算。' : 'PUBLIC-02 / SCN-02 are outside the provisional key area and are not siting evidence; recalculate after formal data.', zh ? 16 : 13, { fill: C.red, weight: 650 });

  out += rect(1155, 270, 1167, 500, { fill: C.white, stroke: C.blue, sw: 3, radius: 26 });
  out += text(1190, 325, zh ? '1:100 界面剖面设计目标' : '1:100 INTERFACE SECTION TARGET', zh ? 29 : 24, { weight: 730 });
  const sx = 1200; const sy = 430; const sw = 1060; const sh = 215;
  const bands = dossier.spatial_dossier.section_1_100.bands;
  const total = bands.reduce((sum, band) => sum + band.width_m, 0);
  const colors = [C.greenSoft, C.blueSoft, C.orangeSoft, C.purpleSoft];
  const strokes = [C.green, C.blue, C.orange, C.purple];
  let cursor = sx;
  bands.forEach((band, index) => {
    const width = sw * band.width_m / total;
    out += rect(cursor, sy, width, sh, { fill: colors[index], stroke: strokes[index], sw: 3, radius: 0 });
    out += wrapped(cursor + width / 2, sy + 78, zh ? band.name_zh : band.name_en, zh ? 17 : 14, zh ? 8 : 18, { anchor: 'middle', weight: 700, fill: strokes[index], maxRows: 3 });
    out += text(cursor + width / 2, sy + 178, `${band.width_m.toFixed(1)} m`, 19, { anchor: 'middle', weight: 800 });
    cursor += width;
  });
  out += line(sx, sy + sh, sx + sw, sy + sh, { sw: 5 });
  out += dimension(sx - 25, sy, sx - 25, sy + sh, '3.6 m', true);
  out += text(1200, 705, zh ? 'BLACKOUT：服务岛断电断数；3.0 m 普通带、人工与纸面服务不关闭。' : 'BLACKOUT: isolate island power/data; keep the 3.0 m route plus staffed and paper service open.', zh ? 18 : 14, { fill: C.red, weight: 700 });

  out += rect(1155, 805, 1167, 355, { fill: C.white, stroke: C.gold, sw: 3, radius: 26 });
  out += text(1190, 860, zh ? '1:50 交接细部设计目标' : '1:50 HANDOFF DETAIL TARGET', zh ? 29 : 24, { weight: 730 });
  const details = dossier.spatial_dossier.detail_1_50.elements;
  details.forEach((item, index) => {
    const x = 1200 + index * 270;
    out += rect(x, 910, 245, 150, { fill: index % 2 ? C.goldSoft : C.blueSoft, stroke: index % 2 ? C.gold : C.blue, sw: 2, radius: 14 });
    out += text(x + 18, 944, item.id, 16, { fill: C.muted, weight: 700 });
    out += wrapped(x + 122, 982, zh ? item.name_zh : item.name_en, zh ? 17 : 14, zh ? 10 : 20, { anchor: 'middle', weight: 700, maxRows: 2 });
    const value = item.target_m ? `${item.target_m} m` : item.target_range_m ? `${item.target_range_m[0]}–${item.target_range_m[1]} m` : `${item.footprint_m[0]}×${item.footprint_m[1]} m`;
    out += text(x + 122, 1038, value, 20, { anchor: 'middle', fill: index % 2 ? '#785900' : C.blue, weight: 800 });
  });
  out += text(1190, 1105, zh ? '退役：拆岛—封接口—恢复地面；保留普通路径、人工台、纸面记录与投诉联系人。' : 'Closeout: remove island, cap interfaces, restore floor; retain route, desk, paper record and complaint contact.', zh ? 17 : 14, { fill: C.muted });

  out += rect(78, 1200, 2244, 88, { fill: C.navy, stroke: C.navy, radius: 18 });
  out += text(112, 1240, zh ? '证据边界' : 'EVIDENCE BOUNDARY', 17, { fill: C.gold, weight: 800 });
  out += wrapped(360, 1238, zh ? '以上均为参赛者提出的概念尺寸，不是测绘、法定、工程、招标或竣工尺寸；0 授权、0 现场观察、HOLD。' : 'Participant-authored concept dimensions only—not surveyed, statutory, engineering, tender or as-built dimensions; 0 authorisations, 0 field observations, HOLD.', zh ? 17 : 14, zh ? 74 : 190, { fill: C.white, maxRows: 2 });
  return out + '</g></svg>\n';
}

function deliveryBoard(lang) {
  const zh = lang === 'zh';
  const titleValue = zh ? '一张试点交付回执，把“谁来做”留到放行门里' : 'One pilot delivery receipt keeps “who does it” behind a release gate';
  const subtitle = zh ? '18 周条件式路径 · 透明成本公式 · 未确认 RACI · SLA 与退役触发' : 'Conditional 18-week path · transparent cost formula · unconfirmed RACI · SLA and retirement triggers';
  let out = start(titleValue) + header('AI ORIGIN PILOT DELIVERY / 02', titleValue, subtitle, lang);
  const dc = dossier.delivery_contract;

  out += rect(78, 270, 2244, 225, { fill: C.white, stroke: C.teal, sw: 3, radius: 26 });
  out += text(112, 320, zh ? '六段条件式交付路径' : 'SIX-STEP CONDITIONAL DELIVERY PATH', zh ? 27 : 23, { weight: 730 });
  dc.schedule.forEach((item, index) => {
    const x = 115 + index * 365;
    const color = [C.teal, C.blue, C.gold, C.orange, C.purple, C.red][index];
    if (index < dc.schedule.length - 1) out += line(x + 48, 375, x + 342, 375, { stroke: C.line, sw: 5 });
    out += `<circle cx="${x + 28}" cy="375" r="29" fill="${color}" stroke="${C.ink}" stroke-width="2"/>`;
    out += text(x + 28, 382, String(index + 1), 18, { anchor: 'middle', fill: C.white, weight: 800 });
    out += text(x, 432, item.id, 17, { fill: color, weight: 800 });
    out += wrapped(x, 462, zh ? item.work_zh : item.work_en, zh ? 16 : 13, zh ? 13 : 25, { weight: 650, maxRows: 2 });
  });

  out += rect(78, 530, 720, 585, { fill: C.white, stroke: C.blue, sw: 3, radius: 26 });
  out += text(112, 585, zh ? '成本设计估算｜不是招标价' : 'DESIGN COST ESTIMATE · NOT A TENDER PRICE', zh ? 25 : 19, { weight: 730 });
  out += text(112, 638, zh ? 'CAPEX' : 'CAPEX', 20, { fill: C.blue, weight: 800 });
  out += text(760, 638, '¥655,500–1,000,500', 28, { anchor: 'end', fill: C.blue, weight: 800 });
  dc.capex_design_estimate_cny.line_items.forEach((item, index) => {
    const y = 685 + index * 48;
    out += text(112, y, item.id, 15, { fill: C.muted, weight: 700 });
    out += text(170, y, zh ? ['测绘/设计/专业审查','可逆装修与人工台','普通路径/导视/无障碍','可撤回 AI 与离线硬件','测试/培训/退役恢复'][index] : item.name, zh ? 16 : 13, { weight: 600 });
    out += text(760, y, `¥${(item.lower / 1000).toFixed(0)}k–${(item.upper / 1000).toFixed(0)}k`, 16, { anchor: 'end', fill: C.muted, weight: 650 });
  });
  out += text(112, 948, zh ? '公式：分项合计 × 1.15 预备费' : 'Formula: line-item sum × 1.15 contingency', zh ? 17 : 14, { fill: C.orange, weight: 700 });
  out += line(112, 974, 760, 974, { stroke: C.line, sw: 2 });
  out += text(112, 1018, 'OPEX / MONTH', 19, { fill: C.teal, weight: 800 });
  out += text(760, 1018, '¥32,780–54,340', 26, { anchor: 'end', fill: C.teal, weight: 800 });
  out += text(112, 1063, zh ? '人工、维护、纸面/翻译/无障碍、数据审计分项合计 × 1.10 储备' : 'Staffing, maintenance, paper/translation/accessibility and data audit × 1.10 reserve', zh ? 15 : 12, { fill: C.muted });

  out += rect(835, 530, 780, 585, { fill: C.white, stroke: C.gold, sw: 3, radius: 26 });
  out += text(870, 585, zh ? 'RACI 资产交接｜机构尚未确认' : 'RACI ASSET HANDOFF · ORGANISATIONS UNCONFIRMED', zh ? 25 : 18, { weight: 730 });
  const rows = dc.raci;
  const headers = zh ? ['资产','R 负责','A 问责','C 共审'] : ['ASSET','RESPONSIBLE','ACCOUNTABLE','CONSULTED'];
  const xs = [870, 1115, 1295, 1468];
  headers.forEach((h, i) => { out += text(xs[i], 628, h, zh ? 16 : 13, { fill: C.gold, weight: 800 }); });
  rows.forEach((row, index) => {
    const y = 660 + index * 82;
    out += rect(866, y, 714, 70, { fill: index % 2 ? '#f8f5ec' : '#fbfaf6', stroke: C.line, sw: 1, radius: 8 });
    const valsZh = [
      ['公共路径/地面','现场承包角色','公共资产所有者','无障碍/消防'],
      ['人工/纸面服务','公共服务运营角色','服务委托主体','社区/无障碍'],
      ['可撤回 AI 岛','样机供应角色','试点运营角色','数据/安全/无障碍'],
      ['日志/投诉记录','数据保护角色','服务委托主体','独立复核'],
      ['退役与恢复','维护/现场承包','公共资产所有者','运营/社区']
    ][index];
    const vals = zh ? valsZh : [row.asset, row.responsible, row.accountable, row.consulted];
    vals.forEach((value, i) => { out += wrapped(xs[i], y + 23, value, zh ? 14 : 10.5, zh ? [10,7,7,7][i] : [20,15,15,15][i], { weight: i === 0 ? 700 : 500, maxRows: zh ? 2 : 3, gap: zh ? 19 : 13 }); });
  });
  out += text(870, 1090, zh ? '所有 A 角色须在采购前具名签字；当前 status=role_unconfirmed。' : 'Every accountable role must be named and sign before procurement; current status=role_unconfirmed.', zh ? 15 : 12, { fill: C.red, weight: 700 });

  out += rect(1652, 530, 670, 585, { fill: C.navy, stroke: C.navy, sw: 3, radius: 26 });
  out += text(1688, 585, zh ? '五条 SLA｜均未现场观察' : 'FIVE SLA TARGETS · NONE OBSERVED', zh ? 24 : 18, { fill: C.white, weight: 730 });
  const slaZh = [
    '普通路径 + 人工/纸面服务始终可完成',
    '停用触发后 2 分钟内隔离 AI 岛',
    '投诉 1 工作日确认、5 工作日给状态',
    '开闭场签署路径/纸面/断电/维护检查',
    '无障碍/消防/隐私/同意重大失败即归零'
  ];
  dc.service_level_targets.forEach((item, index) => {
    const y = 640 + index * 78;
    out += `<circle cx="1708" cy="${y - 7}" r="17" fill="${index === 4 ? C.red : C.teal}"/>`;
    out += text(1708, y, String(index + 1), 13, { anchor: 'middle', fill: C.white, weight: 800 });
    out += wrapped(1742, y - 10, zh ? slaZh[index] : item.target, zh ? 15 : 12, zh ? 27 : 52, { fill: C.white, maxRows: 2, gap: zh ? 21 : 17 });
  });
  out += line(1688, 1040, 2286, 1040, { stroke: '#506982', sw: 2 });
  out += wrapped(1688, 1072, zh ? '退役触发：断电拆岛、封接口、恢复地面、保留普通服务、通知公众、关闭投诉并归档。' : 'Retirement: isolate and remove the island, cap interfaces, restore floor, retain ordinary service, notify, close complaints and archive.', zh ? 15 : 12, zh ? 32 : 62, { fill: C.gold, weight: 700, maxRows: 2 });

  out += rect(78, 1155, 2244, 133, { fill: C.orangeSoft, stroke: C.orange, sw: 3, radius: 18 });
  out += text(112, 1195, zh ? '采购与放行边界' : 'PROCUREMENT + RELEASE BOUNDARY', 17, { fill: C.orange, weight: 800 });
  out += wrapped(112, 1230, zh ? '只有具名资产所有者、正式几何、专业签字、知情同意的匿名公众走查、成本确认和独立决定同时到位，才讨论启用。当前无机构、预算、供应商、保险或现场结果被确认。' : 'Open only after a named owner, verified geometry, professional sign-offs, consented anonymised walkthrough evidence, confirmed cost and an independent decision. No organisation, budget, supplier, insurance or field result is confirmed.', zh ? 16 : 13, zh ? 105 : 170, { fill: C.ink, maxRows: 2 });
  return out + '</g></svg>\n';
}

async function writePair(stem, builder) {
  for (const lang of ['zh', 'en']) {
    const suffix = lang === 'zh' ? '' : '.en';
    const svg = builder(lang);
    const svgPath = path.join(figureDir, `${stem}${suffix}.svg`);
    const pngPath = path.join(figureDir, `${stem}${suffix}.png`);
    fs.writeFileSync(svgPath, svg);
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(pngPath);
    process.stdout.write(`${path.relative(packageRoot, svgPath)}\n${path.relative(packageRoot, pngPath)}\n`);
  }
}

async function main() {
  fs.mkdirSync(figureDir, { recursive: true });
  await writePair('ai-era-pilot-node-dossier', planBoard);
  await writePair('ai-era-pilot-delivery-receipt', deliveryBoard);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
