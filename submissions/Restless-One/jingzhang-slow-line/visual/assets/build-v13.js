#!/usr/bin/env node
'use strict';

/*
 * Deterministic v1.5 builder for P0-ALL-STOP-01.
 * Sources: visual/assets/v13-implementation.json,
 * visual/assets/v14-delivery-control.json,
 * visual/assets/v15-execution-kit.json, and the existing submission files.
 * Outputs: two fixed bilingual figures, bilingual proposal/visual HTML inputs,
 * four PDFs, and synchronized evidence records. No network access is used.
 * Run with --font-only after render_proposal_html.py to restore offline CJK
 * coverage without loading the optional canvas/PDF build dependencies.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
let createCanvas;
let GlobalFonts;
let loadImage;
let PDFDocument;

const ROOT = path.resolve(__dirname, '..', '..');
const DATA_PATH = path.join(__dirname, 'v13-implementation.json');
const DATA = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const CONTROL_PATH = path.join(__dirname, 'v14-delivery-control.json');
const CONTROL = JSON.parse(fs.readFileSync(CONTROL_PATH, 'utf8'));
const KIT_PATH = path.join(__dirname, 'v15-execution-kit.json');
const KIT = JSON.parse(fs.readFileSync(KIT_PATH, 'utf8'));
const FIGURES = path.join(ROOT, 'assets', 'figures');
const DRAWINGS = path.join(ROOT, 'drawings');
const EMBEDDED_FONT_START = '/* SLOWLINE_EMBEDDED_NOTO_SANS_SC */';
const EMBEDDED_FONT_END = '/* SLOWLINE_EMBEDDED_NOTO_SANS_SC_END */';

const C = {
  ink: '#14263a',
  navy: '#173a54',
  blue: '#1f6d8f',
  cyan: '#8fd2d5',
  green: '#527f67',
  paleGreen: '#dbe8de',
  yellow: '#f0be3e',
  paleYellow: '#f7e8aa',
  red: '#ba3a35',
  paleRed: '#f2d8d4',
  paper: '#f4f0e5',
  white: '#fffdf8',
  grey: '#66727d',
  light: '#d8d5cb',
  rail: '#5b5752',
  ground: '#e6dfd1'
};

const FONT_CJK = '/System/Library/Fonts/STHeiti Medium.ttc';
const FONT_LATIN = '/System/Library/Fonts/Supplemental/Arial.ttf';
const FONT_LATIN_BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf';

function loadBuildDependencies() {
  ({ createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas'));
  ({ PDFDocument } = require('pdf-lib'));
  if (fs.existsSync(FONT_CJK)) GlobalFonts.registerFromPath(FONT_CJK, 'SlowLineCJK');
  if (fs.existsSync(FONT_LATIN)) GlobalFonts.registerFromPath(FONT_LATIN, 'SlowLineLatin');
  if (fs.existsSync(FONT_LATIN_BOLD)) GlobalFonts.registerFromPath(FONT_LATIN_BOLD, 'SlowLineLatinBold');
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function write(rel, value) {
  const dest = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, value);
}

function readJson(rel) {
  return JSON.parse(read(rel));
}

function writeJson(rel, value) {
  write(rel, JSON.stringify(value, null, 2) + '\n');
}

function embeddedFontCss() {
  for (const rel of ['visual/index.html', 'visual/index.en.html', 'report/proposal.html', 'report/proposal.en.html']) {
    const html = read(rel);
    const start = html.indexOf(EMBEDDED_FONT_START);
    const end = html.indexOf(EMBEDDED_FONT_END, start);
    if (start >= 0 && end >= 0) {
      return html.slice(start, end + EMBEDDED_FONT_END.length);
    }
  }
  throw new Error('Embedded SlowLineSans CSS source is missing.');
}

function ensureEmbeddedFont(rel, fontCss) {
  let html = read(rel);
  const start = html.indexOf(EMBEDDED_FONT_START);
  const end = html.indexOf(EMBEDDED_FONT_END, start);
  if (start >= 0 && end >= 0) {
    html = html.slice(0, start) + fontCss + html.slice(end + EMBEDDED_FONT_END.length);
  } else {
    html = html.replace('<style>', `<style>\n    ${fontCss}`);
  }
  write(rel, html);
}

function restoreEmbeddedFonts() {
  const fontCss = embeddedFontCss();
  for (const rel of ['report/proposal.html', 'report/proposal.en.html', 'visual/index.html', 'visual/index.en.html']) {
    ensureEmbeddedFont(rel, fontCss);
  }
}

function uniqPush(array, value) {
  if (!Array.isArray(array)) return;
  if (!array.includes(value)) array.push(value);
}

function rounded(ctx, x, y, w, h, r, fill, stroke = null, lineWidth = 1) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function font(ctx, size, bold = false, lang = 'en') {
  const family = lang === 'zh' ? 'SlowLineCJK' : (bold ? 'SlowLineLatinBold' : 'SlowLineLatin');
  ctx.font = `${bold ? '700' : '400'} ${size}px "${family}"`;
}

function splitLines(ctx, text, maxWidth, lang = 'en') {
  const raw = String(text ?? '');
  if (!raw) return [''];
  const tokens = lang === 'zh' ? Array.from(raw) : raw.split(/\s+/).map((t, i) => i ? ` ${t}` : t);
  const lines = [];
  let line = '';
  for (const token of tokens) {
    const candidate = line + token;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line.trim());
      line = lang === 'zh' ? token : token.trimStart();
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line.trim());
  return lines;
}

function text(ctx, value, x, y, maxWidth, size, color = C.ink, bold = false, lang = 'en', lineHeight = 1.25, maxLines = null) {
  font(ctx, size, bold, lang);
  ctx.fillStyle = color;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  const lines = splitLines(ctx, value, maxWidth, lang);
  const shown = maxLines ? lines.slice(0, maxLines) : lines;
  if (maxLines && lines.length > maxLines && shown.length) {
    let last = shown[shown.length - 1];
    while (last && ctx.measureText(last + '…').width > maxWidth) last = last.slice(0, -1);
    shown[shown.length - 1] = last + '…';
  }
  shown.forEach((line, index) => ctx.fillText(line, x, y + index * size * lineHeight));
  return shown.length * size * lineHeight;
}

function label(ctx, value, x, y, bg, color, lang = 'en') {
  font(ctx, 16, true, lang);
  const w = ctx.measureText(value).width + 18;
  rounded(ctx, x, y, w, 28, 6, bg);
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.fillText(value, x + 9, y + 14);
  return w;
}

function panel(ctx, x, y, w, h, titleValue, lang = 'en', accent = C.blue) {
  rounded(ctx, x, y, w, h, 14, C.white, C.light, 1.5);
  ctx.fillStyle = accent;
  ctx.fillRect(x, y, 8, h);
  text(ctx, titleValue, x + 22, y + 14, w - 40, 22, C.ink, true, lang, 1.1, 2);
}

function line(ctx, x1, y1, x2, y2, color = C.ink, width = 2, dash = []) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function arrow(ctx, x1, y1, x2, y2, color = C.ink, width = 2) {
  line(ctx, x1, y1, x2, y2, color, width);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  for (const end of [[x2, y2, angle], [x1, y1, angle + Math.PI]]) {
    const [x, y, a] = end;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 9 * Math.cos(a - Math.PI / 6), y - 9 * Math.sin(a - Math.PI / 6));
    ctx.lineTo(x - 9 * Math.cos(a + Math.PI / 6), y - 9 * Math.sin(a + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }
}

function dimension(ctx, x1, y1, x2, y2, value, lang = 'en', offset = 0) {
  const vertical = Math.abs(x2 - x1) < Math.abs(y2 - y1);
  const ox = vertical ? offset : 0;
  const oy = vertical ? 0 : offset;
  arrow(ctx, x1 + ox, y1 + oy, x2 + ox, y2 + oy, C.red, 1.6);
  const mx = (x1 + x2) / 2 + ox;
  const my = (y1 + y2) / 2 + oy;
  rounded(ctx, mx - 34, my - 13, 68, 26, 5, C.paper);
  font(ctx, 15, true, lang);
  ctx.fillStyle = C.red;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(value, mx, my);
  ctx.textAlign = 'left';
}

function titleBand(ctx, lang, kicker, titleValue, sub) {
  ctx.fillStyle = C.navy;
  ctx.fillRect(0, 0, ctx.canvas.width, 92);
  text(ctx, kicker, 40, 10, 760, 16, C.yellow, true, lang, 1.05, 1);
  text(ctx, titleValue, 40, 38, 1010, 32, C.white, true, lang, 1.05, 1);
  text(ctx, sub, 1110, 16, 440, 16, '#dfe8ec', false, lang, 1.25, 3);
}

function buildSiteRelation(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '1:500 场地关系｜仅作候选点筛查' : '1:500 SITE RELATION | CANDIDATE SCREENING ONLY', lang, C.green);
  const ix = x + 28, iy = y + 52, iw = w - 56, ih = h - 72;
  ctx.fillStyle = C.paleGreen;
  ctx.fillRect(ix, iy, iw * 0.26, ih);
  for (let yy = iy + 10; yy < iy + ih; yy += 30) {
    line(ctx, ix + 36, yy, ix + 36, yy + 16, C.rail, 4);
    line(ctx, ix + 58, yy, ix + 58, yy + 16, C.rail, 4);
    line(ctx, ix + 28, yy + 8, ix + 66, yy + 8, C.rail, 2);
  }
  ctx.fillStyle = '#c9ddd3';
  ctx.fillRect(ix + iw * 0.26, iy, iw * 0.18, ih);
  ctx.fillStyle = '#d8cdb8';
  ctx.fillRect(ix + iw * 0.44, iy, iw * 0.18, ih);
  ctx.fillStyle = '#eee8da';
  ctx.fillRect(ix + iw * 0.62, iy, iw * 0.38, ih);
  line(ctx, ix + iw * 0.50, iy, ix + iw * 0.50, iy + ih, C.blue, 7);
  for (let yy = iy + 10; yy < iy + ih; yy += 24) line(ctx, ix + iw * 0.48, yy, ix + iw * 0.52, yy, C.white, 2);
  ctx.save();
  ctx.strokeStyle = C.red;
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 7]);
  ctx.strokeRect(ix + iw * 0.55, iy + ih * 0.28, iw * 0.34, ih * 0.44);
  ctx.restore();
  line(ctx, ix + iw * 0.78, iy + ih * 0.5, ix + iw * 0.5, iy + ih * 0.5, C.yellow, 7);
  text(ctx, lang === 'zh' ? '遗产铁路\n不跨越' : 'HERITAGE RAIL\nNO CROSSING', ix + 4, iy + 6, iw * 0.23, 11, C.ink, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '绿化缓冲' : 'GREEN\nBUFFER', ix + iw * 0.27, iy + 6, iw * 0.14, 11, C.ink, true, lang, 1.05, 2);
  text(ctx, lang === 'zh' ? '既有慢行\n净宽实测 TBC' : 'EXISTING ROUTE\nWIDTH TBC', ix + iw * 0.45, iy + 6, iw * 0.16, 11, C.ink, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '社区界面\n权属/消防 TBC' : 'COMMUNITY EDGE\nRIGHTS/FIRE TBC', ix + iw * 0.66, iy + 6, iw * 0.3, 11, C.ink, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '18×12 m P0\n概念包络\n无坐标 / 不放样' : '18×12 m P0\nNO COORDS\nDO NOT SET OUT', ix + iw * 0.58, iy + ih * 0.34, iw * 0.28, 11, C.red, true, lang, 1.08, 4);
}

function buildPlan(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '1:100 条件式平面｜设计假设，可移动/缩小/暂停/拆除' : '1:100 CONDITIONAL PLAN | ASSUMPTIONS; MOVE / SHRINK / PAUSE / REMOVE', lang, C.blue);
  const ox = x + 42, oy = y + 76;
  const scale = Math.min((w - 84) / 18, (h - 122) / 12);
  const pw = 18 * scale, ph = 12 * scale;
  const X = m => ox + m * scale;
  const Y = m => oy + m * scale;
  ctx.fillStyle = C.ground;
  ctx.fillRect(ox, oy, pw, ph);
  ctx.fillStyle = '#d6ded9';
  ctx.fillRect(X(0), Y(0.5), pw, 3 * scale);
  ctx.fillStyle = '#efeadf';
  ctx.fillRect(X(5.5), Y(4), 12 * scale, 8 * scale);
  ctx.save();
  ctx.strokeStyle = C.blue;
  ctx.lineWidth = 3;
  ctx.setLineDash([9, 7]);
  ctx.strokeRect(X(5.5), Y(4), 12 * scale, 8 * scale);
  ctx.restore();
  ctx.fillStyle = C.yellow;
  ctx.fillRect(X(14.2), Y(3.5), 3.2 * scale, 0.14 * scale);
  ctx.fillStyle = C.paleRed;
  ctx.fillRect(X(14.2), Y(3.64), 3.2 * scale, 2 * scale);
  ctx.save();
  ctx.strokeStyle = C.red;
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 5]);
  ctx.strokeRect(X(14.2), Y(3.64), 3.2 * scale, 2 * scale);
  ctx.restore();
  ctx.fillStyle = '#c7d8e0';
  ctx.fillRect(X(14.6), Y(6.2), 2.4 * scale, 1.8 * scale);
  ctx.strokeStyle = C.blue;
  ctx.lineWidth = 2;
  ctx.strokeRect(X(14.6), Y(6.2), 2.4 * scale, 1.8 * scale);
  ctx.fillStyle = C.paleYellow;
  ctx.fillRect(X(6), Y(5), 4.8 * scale, 3.6 * scale);
  ctx.strokeStyle = C.yellow;
  ctx.lineWidth = 3;
  ctx.strokeRect(X(6), Y(5), 4.8 * scale, 3.6 * scale);
  ctx.fillStyle = C.navy;
  ctx.fillRect(X(6.4), Y(6.2), 2.4 * scale, 0.8 * scale);
  ctx.fillStyle = C.paleGreen;
  ctx.fillRect(X(6.4), Y(9.4), 2.4 * scale, 0.7 * scale);
  ctx.fillStyle = C.green;
  for (let i = 0; i < 3; i++) ctx.fillRect(X(6.45 + i * 0.75), Y(9.45), 0.55 * scale, 0.55 * scale);
  ctx.save();
  ctx.strokeStyle = C.red;
  ctx.lineWidth = 2;
  ctx.setLineDash([7, 5]);
  ctx.strokeRect(X(11), Y(4), 3 * scale, 8 * scale);
  ctx.restore();
  ctx.fillStyle = C.ink;
  ctx.fillRect(X(0), Y(3.5), pw, 0.3 * scale);
  for (let xx = X(0); xx < X(18); xx += 10) {
    ctx.fillStyle = (Math.floor((xx - X(0)) / 10) % 2) ? C.white : C.yellow;
    ctx.fillRect(xx, Y(3.5), 10, 0.3 * scale);
  }
  for (const cx of [10.1, 7.6]) {
    ctx.beginPath();
    ctx.arc(X(cx), Y(cx === 10.1 ? 6.6 : 8.2), 0.9 * scale, 0, Math.PI * 2);
    ctx.strokeStyle = C.red;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  const deskX = X(7.6), deskY = Y(6.6);
  line(ctx, deskX, deskY, X(0.4), Y(1.8), C.red, 1.4, [5, 5]);
  line(ctx, deskX, deskY, X(17.6), Y(1.8), C.red, 1.4, [5, 5]);
  line(ctx, deskX, deskY, X(15.8), Y(3.5), C.red, 1.4, [5, 5]);
  rounded(ctx, X(7.65), Y(6.28), 12, 12, 6, C.red);
  rounded(ctx, X(13.85), Y(4.05), 16, 16, 8, C.red);
  rounded(ctx, X(9.7), Y(5.25), 16, 16, 8, C.red);
  text(ctx, lang === 'zh' ? '有效慢行净宽 3.0 m｜任何构件 0 侵占' : '3.0 m effective clear route | 0 object encroachment', X(0.4), Y(0.8), 10.8 * scale, 16, C.ink, true, lang, 1.1, 2);
  text(ctx, lang === 'zh' ? '服务桌 2.4×0.8 m' : 'desk 2.4×0.8 m', X(6.45), Y(6.25), 2.25 * scale, 12, C.white, true, lang, 1, 2);
  text(ctx, lang === 'zh' ? 'D1.8 回转' : 'D1.8 turn', X(9.25), Y(6.0), 1.7 * scale, 12, C.red, true, lang, 1.05, 2);
  text(ctx, lang === 'zh' ? '机器人停靠\n2.4×1.8 m' : 'robot bay\n2.4×1.8 m', X(14.75), Y(6.45), 2.1 * scale, 12, C.ink, true, lang, 1.1, 3);
  text(ctx, lang === 'zh' ? '不可进入区 3.2×2.0 m' : 'NO-ENTRY 3.2×2.0 m', X(14.3), Y(4.0), 3 * scale, 12, C.red, true, lang, 1.05, 2);
  text(ctx, lang === 'zh' ? '3.0 m 拆除通道' : '3.0 m removal route', X(11.1), Y(10.8), 2.8 * scale, 12, C.red, true, lang, 1.05, 2);
  text(ctx, lang === 'zh' ? '座椅 3 + 轮椅同伴位 1' : '3 seats + 1 wheelchair companion bay', X(6.2), Y(10.25), 4.6 * scale, 12, C.green, true, lang, 1.05, 2);
  text(ctx, lang === 'zh' ? '概念值守视线 ≤15 m｜真人响应仍须实测' : 'concept sightline ≤15 m | human response field-TBC', X(5.7), Y(4.05), 7.8 * scale, 11, C.red, false, lang, 1.05, 2);
  dimension(ctx, X(0), Y(0.18), X(18), Y(0.18), '18.0 m', lang);
  dimension(ctx, X(0.2), Y(0.5), X(0.2), Y(3.5), '3.0 m', lang, -16);
  dimension(ctx, X(17.8), Y(0), X(17.8), Y(12), '12.0 m', lang, 10);
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 2;
  ctx.strokeRect(ox, oy, pw, ph);
  label(ctx, lang === 'zh' ? 'NOT_AUTHORIZED / HOLD' : 'NOT_AUTHORIZED / HOLD', ox + 8, oy + ph - 36, C.red, C.white, lang);
}

function buildSection(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '1:50 断面｜净宽、接口与可撤回构件' : '1:50 SECTION | CLEARANCES, INTERFACES, REVERSIBLE COMPONENTS', lang, C.yellow);
  const ix = x + 28, base = y + h - 42, usable = w - 56;
  const total = 12;
  const S = usable / total;
  ctx.fillStyle = C.ground;
  ctx.fillRect(ix, base - 16, usable, 16);
  ctx.fillStyle = '#d6ded9';
  ctx.fillRect(ix, base - 30, 3 * S, 14);
  ctx.fillStyle = C.paleYellow;
  ctx.fillRect(ix + 3.6 * S, base - 28, 3.6 * S, 12);
  ctx.fillStyle = C.paleRed;
  ctx.fillRect(ix + 7.2 * S, base - 28, 1.5 * S, 12);
  line(ctx, ix, base - 30, ix + usable, base - 30, C.ink, 2);
  line(ctx, ix + 3 * S, base - 42, ix + 3 * S, base - 15, C.yellow, 8);
  ctx.strokeStyle = C.yellow;
  ctx.lineWidth = 5;
  ctx.strokeRect(ix + 4.0 * S, base - 150, 3.0 * S, 120);
  ctx.fillStyle = C.navy;
  ctx.fillRect(ix + 4.35 * S, base - 72, 1.7 * S, 30);
  ctx.fillStyle = C.green;
  ctx.fillRect(ix + 6.25 * S, base - 48, 0.65 * S, 18);
  line(ctx, ix + 7.2 * S, base - 150, ix + 7.2 * S, base - 30, C.red, 2, [6, 5]);
  text(ctx, lang === 'zh' ? '3.0 m 有效慢行' : '3.0 m clear route', ix + 4, base - 64, 2.8 * S, 14, C.ink, true, lang, 1.05, 2);
  text(ctx, lang === 'zh' ? '0.6 m 构件退距' : '0.6 m object setback', ix + 3.05 * S, base - 92, 0.9 * S, 13, C.red, true, lang, 1.05, 4);
  text(ctx, lang === 'zh' ? '3.6 m 遮蔽/服务区\n净高概念 2.4 m' : '3.6 m shelter/service\nconcept clear height 2.4 m', ix + 4.05 * S, base - 138, 2.9 * S, 13, C.ink, true, lang, 1.1, 4);
  text(ctx, lang === 'zh' ? '1.5 m 维护/拆除净空' : '1.5 m maintenance/removal clearance', ix + 7.25 * S, base - 118, 1.4 * S, 13, C.red, true, lang, 1.1, 5);
  text(ctx, lang === 'zh' ? '应急基线净宽、坡度、排水、照度均 TBC；不得因 P0 缩减' : 'Emergency baseline width, slope, drainage, and lighting are TBC and cannot be reduced by P0', ix + 8.85 * S, base - 112, 3.0 * S, 13, C.grey, true, lang, 1.1, 6);
  dimension(ctx, ix, base + 14, ix + 3 * S, base + 14, '3.0 m', lang);
  dimension(ctx, ix + 3 * S, base + 14, ix + 3.6 * S, base + 14, '0.6 m', lang);
  dimension(ctx, ix + 3.6 * S, base + 14, ix + 7.2 * S, base + 14, '3.6 m', lang);
  dimension(ctx, ix + 7.2 * S, base + 14, ix + 8.7 * S, base + 14, '1.5 m', lang);
}

function buildNode(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '1:20 关键接口｜可逆' : '1:20 KEY INTERFACE | REVERSIBLE', lang, C.red);
  const ix = x + 28, base = y + h - 42;
  ctx.fillStyle = '#aaa49b';
  ctx.fillRect(ix, base - 24, w - 56, 24);
  ctx.fillStyle = '#d8d3c7';
  ctx.fillRect(ix, base - 38, w - 56, 14);
  ctx.fillStyle = C.yellow;
  ctx.fillRect(ix + 42, base - 48, 52, 10);
  ctx.fillStyle = C.navy;
  ctx.fillRect(ix + 112, base - 118, 18, 80);
  ctx.fillStyle = C.ink;
  ctx.fillRect(ix + 90, base - 42, 62, 14);
  line(ctx, ix + 230, base - 40, ix + 230, base - 132, C.blue, 8);
  line(ctx, ix + 230, base - 132, ix + 280, base - 132, C.blue, 4);
  ctx.beginPath();
  ctx.arc(ix + 280, base - 132, 12, 0, Math.PI * 2);
  ctx.fillStyle = C.yellow;
  ctx.fill();
  line(ctx, ix + 170, base - 42, ix + 205, base - 42, C.red, 4);
  rounded(ctx, ix, y + 58, 132, 48, 6, '#eef1ef');
  rounded(ctx, ix + 148, y + 58, 140, 48, 6, '#eef1ef');
  rounded(ctx, ix, y + 112, 132, 48, 6, C.paleRed);
  rounded(ctx, ix + 148, y + 112, 140, 48, 6, '#e6eef2');
  text(ctx, lang === 'zh' ? '可逆防滑层\n材料/坡度 TBC' : 'REVERSIBLE LAYER\nMATERIAL/SLOPE TBC', ix + 8, y + 66, 116, 10, C.ink, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '保护垫+压重底座\n无穿透固定' : 'WEIGHTED BASE\nNO PENETRATION', ix + 156, y + 66, 124, 10, C.ink, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '触觉+高对比\n做法 TBC' : 'TACTILE+CONTRAST\nDETAIL TBC', ix + 8, y + 120, 116, 10, C.red, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '照明/电源 TBC\n线缆不穿净宽' : 'LIGHT/POWER TBC\nNO CABLE ON ROUTE', ix + 156, y + 120, 124, 10, C.blue, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '排水口/流向：实测后定' : 'DRAIN/OUTFALL: AFTER BASELINE', ix + 154, base - 18, w - 220, 10, C.grey, false, lang, 1.05, 2);
}

function buildDimensionRegister(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '尺寸表｜仅作假设' : 'DIMENSIONS | ASSUMPTIONS ONLY', lang, C.red);
  const rows = [
    ['D01', '18×12 m', lang === 'zh' ? '筛查包络' : 'screening envelope'],
    ['D02', '12×8 m', lang === 'zh' ? '可逆地面' : 'reversible ground'],
    ['D03', '3.0 m', lang === 'zh' ? '有效净宽' : 'effective clear width'],
    ['D04', 'D1.8 m', lang === 'zh' ? '回转空间' : 'turning space'],
    ['D05', '2.4 m', lang === 'zh' ? '服务桌长度' : 'desk length'],
    ['D06', '≤15 m', lang === 'zh' ? '概念视线' : 'concept sightline'],
    ['D07', '2.4×1.8 m', lang === 'zh' ? '机器人包络' : 'robot bay'],
    ['D08', '3.2×2.0 m', lang === 'zh' ? '不可进入区' : 'no-entry zone'],
    ['D09', '0.6 m', lang === 'zh' ? '构件退距' : 'object setback'],
    ['D10', '1.5 m', lang === 'zh' ? '维护净空' : 'work clearance'],
    ['D11', '3.0 m', lang === 'zh' ? '拆除通道' : 'removal route'],
    ['D12', '17.28 m²', lang === 'zh' ? '可拆遮蔽' : 'shelter area']
  ];
  const startY = y + 51;
  rows.forEach((row, i) => {
    const yy = startY + i * 15.2;
    if (i % 2 === 0) {
      ctx.fillStyle = '#f0ede5';
      ctx.fillRect(x + 18, yy - 1, w - 36, 15);
    }
    text(ctx, row[0], x + 24, yy, 42, 10, C.red, true, lang, 1, 1);
    text(ctx, row[1], x + 72, yy, 82, 10, C.ink, true, lang, 1, 1);
    text(ctx, row[2], x + 160, yy, w - 180, 10, C.grey, false, lang, 1, 1);
  });
  rounded(ctx, x + 18, y + h - 43, w - 36, 32, 5, C.paleRed);
  text(ctx, lang === 'zh' ? 'TBC：触觉/对比、照明、排水、应急净宽、容量' : 'TBC: tactile/contrast, light, drainage, emergency width, capacity', x + 24, y + h - 36, w - 48, 10, C.red, true, lang, 1.05, 2);
}

function buildConditions(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '失败条件 → 可审计动作' : 'FAILURE CONDITION → AUDITABLE ACTION', lang, C.navy);
  const items = lang === 'zh' ? [
    ['移动 MOVE', '权属/文保/消防/管线/排水冲突', '筛出记录 + 新候选点基线'],
    ['缩小 SHRINK', '不削弱净宽、人工等价、维护和退出', '重算尺寸/BOQ/排班并重跑检查'],
    ['暂停 PAUSE', '排班、审计、天气、照明、维护或投诉缺口', '停用记录 + 人工接管 + 重启决定'],
    ['拆除 REMOVE', '安全关键失败、等价缺失、退出失败或群体拒绝', '事件包 + T12 拆除恢复记录'],
    ['恢复 RESTORE', '第 90 天结束或任何拆除指令', '前后对照 + 缺陷关闭 + 验收']
  ] : [
    ['MOVE', 'rights / heritage / fire / utility / drainage conflict', 'screen-out + new candidate baseline'],
    ['SHRINK', 'only if clear route, equivalence, maintenance, exit stay intact', 'recalculate dimensions / BOQ / roster'],
    ['PAUSE', 'roster, audit, weather, light, maintenance, complaint gap', 'stop log + human takeover + restart decision'],
    ['REMOVE', 'critical safety failure, missing equivalence, failed exit, group rejection', 'incident pack + T12 removal/restoration'],
    ['RESTORE', 'day 90 or any removal instruction', 'before/after + closure + acceptance']
  ];
  const rowH = (h - 72) / 5;
  items.forEach((item, i) => {
    const yy = y + 52 + i * rowH;
    label(ctx, item[0], x + 22, yy + 5, i >= 3 ? C.red : C.navy, C.white, lang);
    text(ctx, item[1], x + 150, yy + 4, 300, 11, C.ink, true, lang, 1.1, 3);
    text(ctx, item[2], x + 458, yy + 4, w - 480, 11, C.grey, false, lang, 1.1, 3);
    if (i < 4) line(ctx, x + 20, yy + rowH - 2, x + w - 20, yy + rowH - 2, C.light, 1);
  });
}

async function buildKeyFigure(lang) {
  const canvas = createCanvas(1600, 1000);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, 1600, 1000);
  titleBand(ctx, lang,
    lang === 'zh' ? '固定评审图 03 / v1.5 专业执行交接' : 'FIXED REVIEW FIGURE 03 / v1.5 PROFESSIONAL HAND-OFF',
    lang === 'zh' ? 'P0-ALL-STOP-01｜尺寸化首启单元' : 'P0-ALL-STOP-01 | DIMENSIONED LAUNCH UNIT',
    lang === 'zh' ? 'P0-CAND-01 · NOT_AUTHORIZED · HOLD\n临时重点区筛查关系 · 无坐标/不可放样' : 'P0-CAND-01 · NOT_AUTHORIZED · HOLD\nProvisional-area screening relation · no coordinates/set-out');
  buildSiteRelation(ctx, 32, 112, 500, 246, lang);
  buildPlan(ctx, 32, 376, 804, 592, lang);
  buildSection(ctx, 854, 112, 714, 246, lang);
  buildNode(ctx, 854, 376, 344, 286, lang);
  buildDimensionRegister(ctx, 1216, 376, 352, 286, lang);
  buildConditions(ctx, 854, 680, 714, 288, lang);
  const out = path.join(FIGURES, lang === 'zh' ? 'key-areas.png' : 'key-areas.en.png');
  fs.writeFileSync(out, await canvas.encode('png'));
}

function drawTimeline(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '90 天 → 12 项连续任务 → G0—G5' : '90 DAYS → 12 CONTINUOUS TASKS → G0—G5', lang, C.blue);
  const taskNamesZh = ['角色/停权', '候选点筛查', '现场基线', '付费共设', '条件设计', '专业复核', '中性采购', '全尺样机', '安装演练', '限时小试', '独立决策', '拆除恢复'];
  const taskNamesEn = ['roles/stop', 'site screen', 'baseline', 'paid co-design', 'conditional design', 'professional review', 'neutral procurement', 'full mock-up', 'install/rehearse', 'limited trial', 'independent decision', 'remove/restore'];
  const names = lang === 'zh' ? taskNamesZh : taskNamesEn;
  const innerX = x + 24, innerY = y + 62, cellW = (w - 48) / 6, cellH = (h - 84) / 2;
  DATA.tasks.forEach((task, i) => {
    const row = Math.floor(i / 6), col = i % 6;
    const cx = innerX + col * cellW, cy = innerY + row * cellH;
    rounded(ctx, cx + 3, cy + 2, cellW - 8, cellH - 10, 8, i >= 9 ? C.paleYellow : '#eef1ef', i === 8 ? C.red : C.light, i === 8 ? 2.5 : 1);
    text(ctx, task.task_id, cx + 11, cy + 10, cellW - 22, 13, C.red, true, lang, 1, 1);
    text(ctx, names[i], cx + 11, cy + 28, cellW - 22, 14, C.ink, true, lang, 1.1, 2);
    const gateText = i === 8 ? 'G0–G4' : task.required_gates.join('+');
    text(ctx, `${task.window} · ${gateText}`, cx + 11, cy + cellH - 33, cellW - 22, 11, C.grey, false, lang, 1, 1);
    if (col < 5) arrow(ctx, cx + cellW - 12, cy + cellH / 2, cx + cellW - 2, cy + cellH / 2, C.blue, 1.4);
  });
}

function drawRolesAndGates(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '17 个角色已声明｜全部 unassigned/conditional' : '17 ROLES DECLARED | ALL unassigned/conditional', lang, C.red);
  const roles = lang === 'zh' ? [
    ['执行', 'R-P0-EXEC'], ['最终签放/恢复验收', 'A-P0-RIGHTS'], ['立即叫停', '共同设计 / 服务 / 安全'], ['人工接管', 'R-P0-SERVICE'], ['拆除恢复', 'R-P0-INSTALL'], ['独立证据审查', 'R-P0-EVAL']
  ] : [
    ['execute', 'R-P0-EXEC'], ['final release/restoration acceptance', 'A-P0-RIGHTS'], ['immediate stop', 'co-design / service / safety'], ['human takeover', 'R-P0-SERVICE'], ['remove/restore', 'R-P0-INSTALL'], ['independent evidence review', 'R-P0-EVAL']
  ];
  roles.forEach((r, i) => {
    const yy = y + 58 + i * 27;
    text(ctx, r[0], x + 22, yy, w * 0.52, 13, C.grey, false, lang, 1, 1);
    text(ctx, r[1], x + w * 0.52, yy, w * 0.43, 13, C.ink, true, lang, 1, 1);
  });
  const gateY = y + h - 84;
  ['G0', 'G1', 'G2', 'G3', 'G4', 'G5'].forEach((g, i) => {
    const gx = x + 22 + i * ((w - 44) / 6);
    rounded(ctx, gx, gateY, (w - 58) / 6, 31, 6, C.red);
    text(ctx, g, gx + 8, gateY + 7, 48, 14, C.white, true, lang, 1, 1);
  });
  text(ctx, lang === 'zh' ? '默认 6/6 关闭；公众/工作人员可触发实体急停，无惩罚。' : '6/6 default closed; any user/worker may activate the physical stop without penalty.', x + 22, gateY + 40, w - 44, 12, C.red, true, lang, 1.1, 2);
}

function drawBoq(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '不计价 BOQ｜16 行均可由平面/任务推导' : 'NON-PRICED BOQ | 16 PLAN/TASK-DERIVED LINES', lang, C.green);
  const qtyDisplay = ['1 set', '17.3 m²', '96 m²', '1 desk', '2 units', '1 rack', '5 points', '18 m', '3.2 m', '6.4 m²', '3+1 bay', '4 points', '1+2 pts', '1+4 checks', '13 visits', '1 lot'];
  const shortEn = [
    'Frame', 'Shelter', 'Reversible ground', 'Staffed desk', 'E-stop ×2', 'Paper rack',
    'Wayfinding points', 'Tactile / contrast edge', 'Robot stop line', 'Robot no-entry marking',
    'Seating + companion bay', 'Lighting points', 'Interface cabinet + points',
    'Install + four checks', 'Maintenance visits', 'Remove + restore'
  ];
  const compact = DATA.boq.map((q, i) => [q.boq_id, lang === 'zh' ? q.item_zh : shortEn[i], qtyDisplay[i]]);
  const cols = 2, rows = 8, colW = (w - 42) / cols;
  compact.forEach((row, i) => {
    const col = Math.floor(i / rows), rr = i % rows;
    const xx = x + 20 + col * colW, yy = y + 56 + rr * 39;
    if (rr % 2 === 0) {
      ctx.fillStyle = '#f0ede5';
      ctx.fillRect(xx, yy - 3, colW - 10, 35);
    }
    text(ctx, row[0], xx + 5, yy, 58, 11, C.red, true, lang, 1, 1);
    text(ctx, row[1], xx + 63, yy, colW - 155, 12, C.ink, true, lang, 1.05, 2);
    text(ctx, row[2], xx + colW - 86, yy, 78, 11, C.grey, false, lang, 1.05, 2);
  });
  text(ctx, lang === 'zh' ? '单价 / 正式总价 / 报价单位 / 基准日：null / TBC' : 'Unit rates / formal total / quotation entity / basis date: null / TBC', x + 24, y + h - 38, w - 48, 13, C.red, true, lang, 1.1, 2);
}

function drawCost(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '工作成本敏感性｜正式价仍为 null' : 'WORKING COST SENSITIVITY | FORMAL PRICE NULL', lang, C.yellow);
  text(ctx, 'C_P0 = REV + HUMAN + CO-DESIGN + ACCESS/SAFETY + PRIVACY/EVAL + O&M + REMOVE/RESTORE + RESERVE', x + 22, y + 56, w - 44, 13, C.ink, true, lang, 1.18, 5);
  const startY = y + 133;
  DATA.cost_model.components.forEach((c, i) => {
    const yy = startY + i * 27;
    rounded(ctx, x + 22, yy, 106, 21, 4, i === 7 ? C.red : C.navy);
    text(ctx, c.cost_id.replace('C_', ''), x + 29, yy + 4, 94, 10, C.white, true, lang, 1, 1);
    text(ctx, lang === 'zh' ? c.label_zh : c.label_en, x + 140, yy + 2, w - 162, 11, C.ink, true, lang, 1.05, 2);
  });
  text(ctx, lang === 'zh' ? 'CAPEX ROM 85–210 万 CNY｜年度 OPEX 90–220 万 CNY｜12 h 工作排班 4 FTE' : 'CAPEX ROM CNY 0.85–2.10m | annual OPEX CNY 0.90–2.20m | 12 h working roster: 4 FTE', x + 22, y + h - 73, w - 44, 12, C.grey, false, lang, 1.15, 4);
  label(ctx, lang === 'zh' ? '非正式工作带' : 'WORKING BAND', x + 22, y + h - 34, C.red, C.white, lang);
}

function drawAcceptance(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '两层验收｜A：8 通过｜B：4 决策包 / 12 原始项暂停' : 'ACCEPTANCE | A: 8P | B: 4 BUNDLES / 12 RAW HOLD', lang, C.red);
  const current = DATA.acceptance_current_package;
  const startY = y + 58;
  current.forEach((m, i) => {
    const yy = startY + i * 30;
    const hold = m.current_status.startsWith('HOLD');
    rounded(ctx, x + 20, yy, 54, 22, 5, hold ? C.red : C.green);
    text(ctx, m.metric_id.replace('P0-', ''), x + 26, yy + 5, 44, 11, C.white, true, lang, 1, 1);
    text(ctx, lang === 'zh' ? m.label_zh : m.label_en, x + 84, yy + 1, w - 180, 12, C.ink, true, lang, 1.05, 2);
    text(ctx, hold ? 'HOLD' : 'PASS', x + w - 82, yy + 3, 60, 12, hold ? C.red : C.green, true, lang, 1, 1);
  });
  const fieldY = startY + 8 * 30 + 10;
  rounded(ctx, x + 20, fieldY, w - 40, h - (fieldY - y) - 20, 8, C.paleRed, C.red, 1.5);
  text(ctx, lang === 'zh' ? 'B｜必须等待现场基线：轮椅、低视力、无智能手机老人用时、真人响应、人流冲突、噪声、照明、排水、微气候、居民接受、排班、真实成本。' : 'B | FIELD BASELINE REQUIRED: wheelchair, low vision, no-smartphone time, human response, conflicts, noise, lighting, drainage, microclimate, residents, roster, actual cost.', x + 34, fieldY + 14, w - 68, 13, C.red, true, lang, 1.18, 7);
  text(ctx, lang === 'zh' ? '任一群体安全关键失败、等价缺失或无法退出 => 整体 HOLD；不得用平均值覆盖。' : 'Any group safety-critical failure, missing equivalent, or failed exit => whole unit HOLD; no averaging away failure.', x + 34, y + h - 55, w - 68, 13, C.ink, true, lang, 1.18, 4);
}

function drawA3FocusStrip(ctx, x, y, w, lang, mode) {
  rounded(ctx, x, y, w, 64, 12, C.navy);
  const value = mode === 'tasks'
    ? (lang === 'zh'
      ? 'P0-ALL-STOP-01 | D00-D90 | 7 空表 | 4 外部决策 / 12 原始项 HOLD | 当前未授权'
      : 'P0-ALL-STOP-01 | D00-D90 | 7 FORMS | 4 EXTERNAL DECISIONS / 12 RAW HOLD | NOT AUTHORIZED')
    : (lang === 'zh'
      ? '16 行 BOQ | 4 FTE 工作排班 | A 层 8 PASS | B 层 4 决策包 / 12 原始项 HOLD'
      : '16 BOQ LINES | 4-FTE WORKING ROSTER | LAYER A 8 PASS | B: 4 BUNDLES / 12 RAW HOLD');
  text(ctx, value, x + 24, y + 20, w - 48, 18, C.white, true, lang, 1.15, 2);
}

function drawA3TaskFocus(ctx, x, y, w, h, lang) {
  drawA3FocusStrip(ctx, x, y, w, lang, 'tasks');
  const timelineY = y + 78;
  const timelineH = 500;
  panel(ctx, x, timelineY, w, timelineH, lang === 'zh' ? '90 天交付任务链 | 每项均带时间、责任、Gate 与退出证据' : '90-DAY DELIVERY CHAIN | TIME, RESPONSIBILITY, GATE + EXIT EVIDENCE', lang, C.blue);
  const taskNamesZh = ['角色与停权', '候选点筛查', '现场基线', '付费共同设计', '条件设计', '专业复核', '中性采购', '全尺样机', '安装与演练', '限时小试', '独立决策', '拆除与恢复'];
  const taskNamesEn = ['roles + stop power', 'candidate screen', 'site baseline', 'paid co-design', 'conditional design', 'professional review', 'neutral procurement', 'full-scale mock-up', 'install + rehearse', 'limited trial', 'independent decision', 'remove + restore'];
  const names = lang === 'zh' ? taskNamesZh : taskNamesEn;
  const gap = 10;
  const innerX = x + 24;
  const innerY = timelineY + 66;
  const cellW = (w - 48 - gap * 5) / 6;
  const cellH = (timelineH - 84 - gap) / 2;
  DATA.tasks.forEach((task, i) => {
    const row = Math.floor(i / 6), col = i % 6;
    const cx = innerX + col * (cellW + gap), cy = innerY + row * (cellH + gap);
    const alert = i === 8;
    rounded(ctx, cx, cy, cellW, cellH, 10, i >= 9 ? C.paleYellow : '#eef1ef', alert ? C.red : C.light, alert ? 2.5 : 1.2);
    text(ctx, task.task_id, cx + 12, cy + 10, cellW - 24, 15, C.red, true, lang, 1, 1);
    text(ctx, names[i], cx + 12, cy + 34, cellW - 24, 18, C.ink, true, lang, 1.08, 2);
    text(ctx, `${task.window} | ${task.required_gates.join('+')}`, cx + 12, cy + 83, cellW - 24, 13, C.grey, true, lang, 1.05, 1);
    text(ctx, `R: ${task.responsible_role}`, cx + 12, cy + 111, cellW - 24, 12, C.ink, false, lang, 1.05, 2);
    text(ctx, `A: ${task.accountable_role}`, cx + 12, cy + 146, cellW - 24, 12, C.ink, false, lang, 1.05, 2);
    if (col < 5) arrow(ctx, cx + cellW + 1, cy + cellH / 2, cx + cellW + gap - 1, cy + cellH / 2, C.blue, 1.5);
  });

  const rolesY = timelineY + timelineH + 18;
  const rolesH = y + h - rolesY;
  panel(ctx, x, rolesY, w, rolesH, lang === 'zh' ? '责任交接与立即停止权 | 17 个槽位全部 unassigned/conditional' : 'ACCOUNTABILITY HAND-OFF + IMMEDIATE STOP POWER | ALL 17 SLOTS unassigned/conditional', lang, C.red);
  const cols = 6, roleGap = 8;
  const roleW = (w - 48 - roleGap * (cols - 1)) / cols;
  DATA.roles.forEach((role, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const rx = x + 24 + col * (roleW + roleGap), ry = rolesY + 56 + row * 46;
    rounded(ctx, rx, ry, roleW, 38, 7, '#eef1ef', C.light, 1);
    text(ctx, role.role_id, rx + 7, ry + 4, roleW - 14, 10, C.red, true, lang, 1, 1);
    text(ctx, lang === 'zh' ? role.role_zh : role.role_en, rx + 7, ry + 18, roleW - 14, 9, C.ink, true, lang, 1.02, 2);
  });
  const gateY = rolesY + rolesH - 78;
  text(ctx, lang === 'zh' ? '完整输入、输出、HOLD 与恢复/退出证据保留在交付台账。' : 'Full input, output, HOLD, and recovery/exit evidence remains in the delivery register.', x + 24, gateY - 25, w - 48, 11, C.grey, false, lang, 1.05, 1);
  ['G0', 'G1', 'G2', 'G3', 'G4', 'G5'].forEach((gate, i) => {
    const gx = x + 24 + i * ((w - 48) / 6);
    rounded(ctx, gx, gateY, (w - 68) / 6, 31, 6, C.red);
    text(ctx, gate, gx + 12, gateY + 6, 60, 16, C.white, true, lang, 1, 1);
  });
  text(ctx, lang === 'zh' ? '任一公众或工作人员可无惩罚触发实体急停；G0-G5 默认 6/6 关闭。' : 'Any user or worker may activate the physical stop without penalty; G0-G5 remain 6/6 default closed.', x + 24, rolesY + rolesH - 39, w - 48, 14, C.red, true, lang, 1.1, 2);
}

function drawA3BoqFocus(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '不计价 BOQ | 16 行均可回溯至平面、断面或任务' : 'NON-PRICED BOQ | 16 LINES TRACE TO PLAN, SECTION OR TASK', lang, C.green);
  const qty = ['1 set', '17.3 m²', '96 m²', '1 desk', '2 units', '1 rack', '5 points', '18 m', '3.2 m', '6.4 m²', '3+1 bay', '4 points', '1+2 pts', '1+4 checks', '13 visits', '1 lot'];
  const shortEn = ['Frame', 'Shelter', 'Reversible ground', 'Staffed desk', 'E-stop facilities', 'Paper rack', 'Wayfinding points', 'Tactile / contrast edge', 'Robot stop line', 'Robot no-entry marking', 'Seating + companion bay', 'Lighting points', 'Interface cabinet + points', 'Install + four checks', 'Maintenance visits', 'Remove + restore'];
  const gap = 14, colW = (w - 40 - gap) / 2, rowH = (h - 104) / 8;
  DATA.boq.forEach((item, i) => {
    const col = Math.floor(i / 8), row = i % 8;
    const xx = x + 20 + col * (colW + gap), yy = y + 58 + row * rowH;
    if (row % 2 === 0) { ctx.fillStyle = '#f0ede5'; ctx.fillRect(xx, yy - 3, colW, rowH - 3); }
    text(ctx, item.boq_id, xx + 5, yy + 4, 62, 13, C.red, true, lang, 1, 1);
    text(ctx, lang === 'zh' ? item.item_zh : shortEn[i], xx + 72, yy + 3, colW - 174, 14, C.ink, true, lang, 1.05, 2);
    text(ctx, qty[i], xx + colW - 92, yy + 4, 86, 13, C.grey, false, lang, 1.05, 2);
  });
  text(ctx, lang === 'zh' ? '市场单价、报价主体、货币、正式总价与基准日：null / TBC' : 'Market rates, quotation entity, currency, formal total and basis date: null / TBC', x + 24, y + h - 36, w - 48, 14, C.red, true, lang, 1.05, 2);
}

function drawA3CostFocus(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '成本与排班工作带 | 正式估算/报价仍为空' : 'COST + ROSTER WORKING BANDS | FORMAL ESTIMATE/QUOTE NULL', lang, C.yellow);
  text(ctx, 'C_P0 = REV + HUMAN + CO-DESIGN + ACCESS/SAFETY', x + 22, y + 55, w - 44, 15, C.ink, true, lang, 1.05, 1);
  text(ctx, '+ PRIVACY/EVAL + O&M + REMOVE/RESTORE + RESERVE', x + 22, y + 76, w - 44, 15, C.ink, true, lang, 1.05, 1);
  const gap = 12, colW = (w - 44 - gap) / 2, startY = y + 108, rowH = 47;
  DATA.cost_model.components.forEach((item, i) => {
    const col = Math.floor(i / 4), row = i % 4;
    const xx = x + 22 + col * (colW + gap), yy = startY + row * rowH;
    rounded(ctx, xx, yy, colW, 38, 7, '#eef1ef');
    rounded(ctx, xx + 6, yy + 7, 116, 24, 5, i === 7 ? C.red : C.navy);
    text(ctx, item.cost_id.replace('C_', ''), xx + 13, yy + 11, 102, 11, C.white, true, lang, 1, 1);
    text(ctx, lang === 'zh' ? item.label_zh : item.label_en, xx + 132, yy + 8, colW - 142, 13, C.ink, true, lang, 1.05, 2);
  });
  text(ctx, lang === 'zh' ? 'CAPEX 85–210 万｜OPEX 90–220 万/年｜12 h：3.129 FTE → 4 FTE｜均为参与者敏感性' : 'CAPEX CNY 0.85–2.10m | OPEX 0.90–2.20m/year | 12 h: 3.129 → 4 FTE | participant sensitivity only', x + 22, y + h - 82, w - 150, 13, C.grey, false, lang, 1.12, 3);
  label(ctx, 'FORMAL null', x + w - 132, y + h - 48, C.red, C.white, lang);
}

function drawA3AcceptanceFocus(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '两层验收 | A：8 PASS | B：4 决策包 / 12 原始项 HOLD' : 'TWO-LAYER ACCEPTANCE | A: 8 PASS | B: 4 BUNDLES / 12 RAW HOLD', lang, C.red);
  const startY = y + 68, rowH = 48;
  DATA.acceptance_current_package.forEach((item, i) => {
    const yy = startY + i * rowH;
    const hold = item.current_status.startsWith('HOLD');
    rounded(ctx, x + 22, yy, 62, 28, 6, hold ? C.red : C.green);
    text(ctx, item.metric_id.replace('P0-', ''), x + 30, yy + 7, 50, 13, C.white, true, lang, 1, 1);
    text(ctx, lang === 'zh' ? item.label_zh : item.label_en, x + 98, yy + 2, w - 208, 16, C.ink, true, lang, 1.08, 2);
    text(ctx, hold ? 'HOLD' : 'PASS', x + w - 92, yy + 5, 70, 14, hold ? C.red : C.green, true, lang, 1, 1);
    line(ctx, x + 22, yy + rowH - 7, x + w - 22, yy + rowH - 7, C.light, 1);
  });
  const fieldY = startY + 8 * rowH + 8;
  rounded(ctx, x + 22, fieldY, w - 44, h - (fieldY - y) - 22, 10, C.paleRed, C.red, 1.5);
  text(ctx, lang === 'zh' ? 'B 层必须等待现场基线：轮椅、低视力、无智能手机老人取得人工服务用时、真人响应、人流冲突、噪声、照明、排水、微气候、居民接受、排班与真实成本。' : 'LAYER B REQUIRES FIELD BASELINES: wheelchair, low vision, no-smartphone time to staffed help, human response, flow conflict, noise, lighting, drainage, microclimate, resident acceptance, roster and actual cost.', x + 42, fieldY + 22, w - 84, 16, C.red, true, lang, 1.22, 8);
  rounded(ctx, x + 42, fieldY + 126, w - 84, 82, 8, C.white, C.light, 1);
  text(ctx, lang === 'zh' ? '可审计字段（按 metric_id）：公式 → 数据源 → 阈值状态 → 责任角色 → 当前状态 → 触发条件' : 'AUDIT FIELDS (BY metric_id): formula → data source → threshold state → responsible role → current status → trigger', x + 58, fieldY + 144, w - 116, 14, C.navy, true, lang, 1.18, 3);
  text(ctx, lang === 'zh' ? '合成任务、虚构人物旅程和普通意见不得代替 B 层现场绩效。' : 'Synthetic tasks, fictional journeys and general opinions cannot substitute for Layer-B field performance.', x + 58, fieldY + 181, w - 116, 13, C.grey, false, lang, 1.12, 2);
  text(ctx, lang === 'zh' ? '任一群体安全关键失败、等价服务缺失或无法退出 => 整体 HOLD；不得以平均值覆盖。' : 'Any group safety-critical failure, missing equivalent service or failed exit => whole unit HOLD; no averaging away failure.', x + 42, y + h - 72, w - 84, 15, C.ink, true, lang, 1.18, 4);
}

function drawA3DeliveryFocus(ctx, x, y, w, h, lang) {
  drawA3FocusStrip(ctx, x, y, w, lang, 'delivery');
  const contentY = y + 84;
  const gap = 20;
  const leftW = Math.round(w * 0.52);
  const rightX = x + leftW + gap;
  const rightW = w - leftW - gap;
  drawA3BoqFocus(ctx, x, contentY, leftW, 420, lang);
  drawA3CostFocus(ctx, x, contentY + 440, leftW, h - 524, lang);
  drawA3AcceptanceFocus(ctx, rightX, contentY, rightW, h - 84, lang);
}

async function buildMetricsFigure(lang) {
  const canvas = createCanvas(1600, 1000);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, 1600, 1000);
  titleBand(ctx, lang,
    lang === 'zh' ? '固定评审图 05 / v1.5 专业执行交接' : 'FIXED REVIEW FIGURE 05 / v1.5 PROFESSIONAL HAND-OFF',
    lang === 'zh' ? 'P0 任务链、工程量、成本与验收' : 'P0 TASKS, QUANTITIES, COST + ACCEPTANCE',
    lang === 'zh' ? 'P0-ALL-STOP-01 · 90 天 · G0—G5\n可失败、可停止、可退出' : 'P0-ALL-STOP-01 · 90 days · G0—G5\nfail · stop · exit');
  rounded(ctx, 32, 106, 1536, 62, 12, C.navy);
  const summary = lang === 'zh'
    ? '30 秒：7 空表｜18 回执字段｜4 外部决策 / 12 原始项 HOLD｜容量 null｜4 维护周期｜未授权'
    : '30 SEC: 7 FORMS | 18 RECEIPT FIELDS | 4 EXTERNAL DECISIONS / 12 RAW HOLD | CAPACITY NULL | 4 CYCLES | NOT AUTHORIZED';
  text(ctx, summary, 54, 124, 1492, 18, C.white, true, lang, 1.18, 2);
  drawTimeline(ctx, 32, 186, 980, 322, lang);
  drawRolesAndGates(ctx, 1030, 186, 538, 322, lang);
  drawBoq(ctx, 32, 526, 618, 442, lang);
  drawCost(ctx, 668, 526, 420, 442, lang);
  drawAcceptance(ctx, 1106, 526, 462, 442, lang);
  const out = path.join(FIGURES, lang === 'zh' ? 'metrics-evidence.png' : 'metrics-evidence.en.png');
  fs.writeFileSync(out, await canvas.encode('png'));
}

async function buildSimulationFigure(lang) {
  const simulation = readJson('simulation.json');
  const tasks = simulation.tasks;
  const successCount = tasks.filter(task => task.outcome === 'success' || task.outcome.endsWith('_success')).length;
  const validPayloads = tasks.filter(task => task.dispatch_schema_valid === true);
  const malformedPayloads = tasks.filter(task => task.dispatch_schema_valid === false);
  const rejectedMalformedCount = malformedPayloads.filter(task => task.outcome === 'malformed_dispatch_audited_hold_success').length;
  const auditCount = tasks.filter(task => task.audit_complete).length;
  const humanCount = tasks.filter(task => task.human_equivalent_complete).length;
  const canvas = createCanvas(1600, 1100);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, 1600, 1100);
  text(ctx, lang === 'zh' ? '离线演练：包内闭环，错误仍阻断' : 'OFFLINE REHEARSAL: PACKAGE CLOSED, ERRORS STILL BLOCK', 70, 48, 1460, 42, C.ink, true, lang, 1.05, 1);
  text(ctx, lang === 'zh' ? '固定 seed · 12 项合成任务 · 无在线模型/真人/个人数据/真实机器人' : 'Fixed seed | 12 synthetic tasks | no online model, people, personal data, or real robot', 72, 116, 1456, 19, C.grey, false, lang, 1.1, 1);
  line(ctx, 70, 160, 1530, 160, C.ink, 2);

  const cards = [
    [lang === 'zh' ? '任务' : 'TASKS', String(tasks.length), C.ink],
    [lang === 'zh' ? '预登记结果' : 'REGISTERED RESULT', `${successCount}/${tasks.length}`, C.green],
    [lang === 'zh' ? '合法载荷' : 'VALID PAYLOAD', `${validPayloads.length}/${validPayloads.length}`, C.blue],
    [lang === 'zh' ? '错误拦截' : 'MALFORMED REJECT', `${rejectedMalformedCount}/${malformedPayloads.length}`, C.green],
    [lang === 'zh' ? '审计完整' : 'AUDIT COMPLETE', `${auditCount}/${tasks.length}`, C.green],
    [lang === 'zh' ? 'AI-off 人工等价' : 'AI-OFF HUMAN EQUIV.', `${humanCount}/${tasks.length}`, C.green]
  ];
  const cardGap = 22;
  const cardW = (1460 - cardGap * (cards.length - 1)) / cards.length;
  cards.forEach(([titleValue, value, color], index) => {
    const x = 70 + index * (cardW + cardGap);
    rounded(ctx, x, 204, cardW, 176, 20, C.white);
    text(ctx, titleValue, x + 26, 234, cardW - 52, 17, C.grey, false, lang, 1.1, 2);
    text(ctx, value, x + 26, 294, cardW - 52, 46, color, true, lang, 1, 1);
  });

  text(ctx, lang === 'zh' ? 'TASK LEDGER / 任务台账' : 'TASK LEDGER', 70, 428, 1460, 24, C.ink, false, lang, 1, 1);
  const taskGap = 34;
  const taskW = (1460 - taskGap * 5) / 6;
  tasks.forEach((task, index) => {
    const col = index % 6;
    const row = Math.floor(index / 6);
    const x = 70 + col * (taskW + taskGap);
    const y = 486 + row * 84;
    const malformed = task.dispatch_schema_valid === false;
    rounded(ctx, x, y, taskW, 58, 11, malformed ? C.paleYellow : C.paleGreen, malformed ? C.yellow : C.green, 1.5);
    text(ctx, task.task_id.replace('SUT-SIM-', 'SUT-'), x + 16, y + 17, taskW - 92, 15, malformed ? C.ink : C.green, true, lang, 1, 1);
    text(ctx, malformed ? 'HOLD OK' : 'PASS', x + taskW - 78, y + 17, 66, 14, malformed ? C.ink : C.green, true, lang, 1, 1);
  });

  text(ctx, lang === 'zh' ? 'v1.5 保留的包内闭环' : 'PACKAGE CLOSURE RETAINED IN v1.5', 70, 674, 1460, 25, C.ink, true, lang, 1, 1);
  const fixes = lang === 'zh' ? [
    ['人工桌不可用', '转入同服务窗的人工电话/文字热备；两条人工路径都不可用时 AI 同步关闭。'],
    ['错误载荷', 'schema 继续无效，但必须拒绝并完整记录；不把故意错误涂绿。'],
    ['现实边界', '12/12 只证明固定台账闭环；任一现场基线、角色任命、资金或许可缺失仍 HOLD。']
  ] : [
    ['STAFFED DESK UNAVAILABLE', 'Transfer to human telephone/text hot backup in the same service window; AI closes when both human paths are unavailable.'],
    ['MALFORMED PAYLOAD', 'Schema remains invalid, but rejection must create a complete audited HOLD; the deliberate error is not painted green.'],
    ['REAL-WORLD BOUNDARY', '12/12 proves only fixed-ledger closure; any missing field baseline, appointment, funding, or permission remains HOLD.']
  ];
  const fixGap = 42;
  const fixW = (1460 - fixGap * 2) / 3;
  fixes.forEach(([titleValue, body], index) => {
    const x = 70 + index * (fixW + fixGap);
    rounded(ctx, x, 730, fixW, 222, 18, C.navy);
    text(ctx, titleValue, x + 24, 756, fixW - 48, 18, C.yellow, true, lang, 1.15, 2);
    text(ctx, body, x + 24, 812, fixW - 48, 17, C.white, false, lang, 1.35, 6);
  });
  rounded(ctx, 70, 996, 1460, 66, 13, C.paleRed);
  text(ctx, lang === 'zh' ? '仅证明规则台账可复算；不代表现场无障碍、真人响应、机器人性能、许可或资金已经成立。' : 'This proves only that the rule ledger is recomputable; it does not establish field accessibility, human response, robot performance, permission, or funding.', 94, 1018, 1412, 16, C.red, true, lang, 1.2, 2);
  const out = path.join(FIGURES, lang === 'zh' ? 'simulation-rehearsal.png' : 'simulation-rehearsal.en.png');
  fs.writeFileSync(out, await canvas.encode('png'));
}

function metricEntry(value, unit, formula, assumptions = ['A-P0-DIM-001'], confidence = 'high') {
  return {
    status: 'known', value, unit,
    source_files: ['visual/assets/v13-implementation.json', 'visual/assets/v14-delivery-control.json', 'visual/assets/v15-execution-kit.json'], formula, confidence, assumptions,
    interpretation: 'Conditional P0 concept-source value; not a field measurement, approved engineering parameter, supplier quote, or authorization.'
  };
}

function updateMetrics() {
  const metrics = readJson('metrics.json');
  const m = metrics.metrics;
  Object.assign(m, {
    p0_screening_envelope_area_sqm: metricEntry(216, 'sqm', '18.0 * 12.0'),
    p0_reversible_ground_area_sqm: metricEntry(96, 'sqm', '12.0 * 8.0'),
    p0_clear_route_width_m: metricEntry(3, 'm', 'concept effective clear-route width', ['A-P0-DIM-001', 'A-P0-SITE-001'], 'medium'),
    p0_wheelchair_turn_diameter_m: metricEntry(1.8, 'm', 'concept clear turning-circle diameter', ['A-P0-DIM-001', 'A-P0-CODESIGN-001'], 'medium'),
    p0_staffed_desk_length_m: metricEntry(2.4, 'm', 'concept demountable desk length'),
    p0_staffed_sightline_m: metricEntry(15, 'm', 'maximum concept plan sightline; not response-time performance', ['A-P0-DIM-001', 'A-P0-FIELD-001'], 'medium'),
    p0_robot_bay_area_sqm: metricEntry(4.32, 'sqm', '2.4 * 1.8'),
    p0_robot_no_entry_area_sqm: metricEntry(6.4, 'sqm', '3.2 * 2.0'),
    p0_component_setback_m: metricEntry(0.6, 'm', 'concept minimum setback outside effective route', ['A-P0-DIM-001', 'A-P0-SITE-001'], 'medium'),
    p0_maintenance_clearance_m: metricEntry(1.5, 'm', 'concept working clearance around demountable components', ['A-P0-DIM-001', 'A-P0-SITE-001'], 'medium'),
    p0_removal_access_width_m: metricEntry(3, 'm', 'concept removal-access width; no vehicle authorization', ['A-P0-DIM-001', 'A-P0-SITE-001'], 'medium'),
    p0_canopy_area_sqm: metricEntry(17.28, 'sqm', '4.8 * 3.6', ['A-P0-DIM-001', 'A-P0-SITE-001'], 'medium'),
    p0_task_chain_count: metricEntry(12, 'count', 'count(v13-implementation.tasks)', ['A-P0-ROLE-001']),
    p0_role_slot_count: metricEntry(17, 'count', 'count(v13-implementation.roles)', ['A-P0-ROLE-001']),
    p0_boq_line_count: metricEntry(16, 'count', 'count(v13-implementation.boq)', ['A-P0-COST-001']),
    p0_tbc_interface_count: metricEntry(6, 'count', 'count(v13-implementation.tbc_interfaces)', ['A-P0-SITE-001']),
    p0_cost_component_count: metricEntry(8, 'count', 'count(v13-implementation.cost_model.components)', ['A-P0-COST-001']),
    p0_market_rate_known_count: metricEntry(0, 'count', 'count(cost rates where verified market rate is non-null)', ['A-P0-COST-001']),
    p0_current_package_check_count: metricEntry(8, 'count', 'count(v13-implementation.acceptance_current_package)', ['A-P0-FIELD-001']),
    p0_current_package_pass_count: metricEntry(8, 'count', 'count(current package checks with current_status starting PASS)', ['A-P0-FIELD-001']),
    p0_current_package_hold_count: metricEntry(0, 'count', 'count(current package checks with current_status starting HOLD)', ['A-P0-FIELD-001']),
    p0_field_check_hold_count: metricEntry(12, 'count', 'count(field checks with current_status starting HOLD)', ['A-P0-FIELD-001']),
    p0_gate_default_closed_ratio: metricEntry(1, 'ratio', 'default_closed_gates / 6', ['A-PILOT-001', 'A-P0-ROLE-001']),
    p0_route_obstruction_count: metricEntry(0, 'count', 'count(BOQ object boxes intersecting concept 18.0 m x 3.0 m clear route)', ['A-P0-DIM-001']),
    p0_malformed_input_hold_ratio: metricEntry(1, 'ratio', 'malformed-input tests resulting in HOLD / malformed-input tests', ['A-SIMULATION-001']),
    p0_exit_evidence_slot_count: metricEntry(6, 'count', 'count(T12 required exit/restoration evidence slots)', ['A-P0-ROLE-001']),
    p0_audit_complete_count: metricEntry(12, 'count', 'count(simulation tasks where audit_complete=true)', ['A-SIMULATION-001']),
    p0_ai_off_human_equivalent_count: metricEntry(12, 'count', 'count(simulation tasks where human_equivalent_complete=true)', ['A-SIMULATION-001', 'A-P0-OPERATIONS-001']),
    p0_candidate_screening_count: metricEntry(3, 'count', 'count(v14-delivery-control.candidate_screening.candidates)', ['A-P0-SITE-001']),
    p0_external_gate_hold_count: metricEntry(12, 'count', 'count(v14 external gates with status HOLD)', ['A-P0-ROLE-001']),
    p0_release_stage_hold_count: metricEntry(6, 'count', 'count(external release stages with status HOLD)', ['A-P0-ROLE-001']),
    p0_alternative_count: metricEntry(4, 'count', 'count(v14 alternatives)', ['A-P0-SITE-001', 'A-P0-COST-001']),
    p0_urban_renewal_module_count: metricEntry(11, 'count', 'count(v14 urban-renewal module map)', ['A-P0-ROLE-001']),
    p0_working_roster_fte: metricEntry(4, 'FTE', 'ceil((12 * 365 / 1680) * 1.2)', ['A-P0-OPERATIONS-001'], 'medium'),
    p0_working_capex_rom_low_cny: metricEntry(850000, 'CNY', 'participant low working sensitivity band', ['A-P0-COST-001'], 'low'),
    p0_working_capex_rom_high_cny: metricEntry(2100000, 'CNY', 'participant high working sensitivity band', ['A-P0-COST-001'], 'low'),
    p0_working_opex_low_cny: metricEntry(900000, 'CNY_per_year', 'participant low annual operating sensitivity band', ['A-P0-COST-001', 'A-P0-OPERATIONS-001'], 'low'),
    p0_working_opex_high_cny: metricEntry(2200000, 'CNY_per_year', 'participant high annual operating sensitivity band', ['A-P0-COST-001', 'A-P0-OPERATIONS-001'], 'low'),
    p0_external_decision_bundle_count: metricEntry(4, 'count', 'count(v15-execution-kit.external_decision_bundles)', ['A-P0-FIELD-001', 'A-P0-HANDOFF-001']),
    p0_external_decision_bundle_hold_count: metricEntry(4, 'count', 'count(v15 external decision bundles with status HOLD)', ['A-P0-FIELD-001', 'A-P0-HANDOFF-001']),
    p0_execution_form_count: metricEntry(7, 'count', 'count(v15-execution-kit.forms)', ['A-P0-HANDOFF-001']),
    p0_execution_form_required_field_count: metricEntry(KIT.forms.flatMap(item => item.required_fields).length, 'count', 'sum(form-specific required fields across EX-01 to EX-07)', ['A-P0-HANDOFF-001']),
    p0_external_evidence_receipt_field_count: metricEntry(18, 'count', 'count(v15-execution-kit.common_record_fields)', ['A-P0-HANDOFF-001']),
    p0_verified_external_record_count: metricEntry(0, 'count', 'current verified external records accepted into v15 execution kit', ['A-P0-HANDOFF-001']),
    p0_capacity_egress_template_count: metricEntry(1, 'count', 'count(v15 capacity_egress_template)', ['A-P0-CAPACITY-001']),
    p0_concept_egress_route_count: metricEntry(2, 'count', 'participant concept independent egress-route design test', ['A-P0-CAPACITY-001'], 'low'),
    p0_field_verified_egress_route_count: metricEntry(0, 'count', 'field-verified independent egress routes accepted into evidence kit', ['A-P0-CAPACITY-001']),
    p0_maintenance_cycle_count: metricEntry(4, 'count', 'count(v15-execution-kit.maintenance_cycles)', ['A-P0-MAINTENANCE-001']),
    p0_restoration_reserve_template_count: metricEntry(1, 'count', 'count(v15 restoration_reserve_template)', ['A-P0-MAINTENANCE-001']),
    p0_restoration_reserve_ratio_low: metricEntry(0.1, 'ratio', 'participant lower sensitivity bound for verified removable CAPEX', ['A-P0-MAINTENANCE-001'], 'low'),
    p0_restoration_reserve_ratio_high: metricEntry(0.2, 'ratio', 'participant upper sensitivity bound for verified removable CAPEX', ['A-P0-MAINTENANCE-001'], 'low')
  });
  m.simulation_success_rate = {
    ...m.simulation_success_rate,
    value: 1,
    formula: 'tasks with outcome=success or outcome ending _success / simulation_task_count',
    interpretation: 'All twelve fixed synthetic tasks reached their registered outcome; this is package logic only, not field performance.'
  };
  m.tool_schema_pass_rate = {
    ...m.tool_schema_pass_rate,
    value: 11 / 12,
    interpretation: 'Reserved repository aggregate: eleven valid payloads passed schema and one preregistered malformed payload correctly remained invalid and triggered an audited HOLD. Expected behaviour is 12/12; this aggregate is not an unclosed package gap.'
  };
  m.valid_dispatch_payload_schema_pass_rate = {
    status: 'known', value: 1, unit: 'ratio', source_files: ['simulation.json'],
    formula: 'dispatch_schema_valid=true among preregistered valid-payload tasks / preregistered valid-payload task count',
    confidence: 'high', assumptions: ['A-SIMULATION-001'],
    interpretation: 'All eleven preregistered valid dispatch payloads pass schema: 11/11.'
  };
  m.malformed_dispatch_rejection_rate = {
    status: 'known', value: 1, unit: 'ratio', source_files: ['simulation.json'],
    formula: 'malformed payloads rejected with complete audited HOLD / preregistered malformed-payload tests',
    confidence: 'high', assumptions: ['A-SIMULATION-001'],
    interpretation: 'The one preregistered malformed payload is rejected with a complete audited HOLD: 1/1.'
  };
  m.audit_completeness = {
    ...m.audit_completeness,
    value: 1,
    interpretation: 'All twelve synthetic task records are complete, including the malformed-input HOLD record; this is not a field audit.'
  };
  m.ai_off_rehearsal_success_rate = {
    ...m.ai_off_rehearsal_success_rate,
    value: 1,
    interpretation: 'All twelve fixed synthetic tasks have a complete human, paper, telephone, or fixed-spatial equivalent; staffing and funding remain external HOLDs.'
  };
  m.p0_market_price_total = {
    status: 'unknown', value: null, unit: 'currency', source_files: ['visual/assets/v13-implementation.json'],
    formula: 'sum(verified BOQ quantity_i * verified unit_rate_i) + services + reserve', confidence: 'unknown', assumptions: ['A-P0-COST-001'],
    reason: 'All market unit rates, currency, quotation entities, funding commitment, and estimate basis date remain null/TBC.'
  };
  m.p0_staffing_fte = metricEntry(4, 'FTE', 'selected participant working scenario ROSTER-12H: ceil((12 * 365 / 1680) * 1.2)', ['A-P0-ROLE-001', 'A-P0-COST-001', 'A-P0-OPERATIONS-001'], 'medium');
  m.p0_staffing_fte.interpretation = 'Participant working roster sensitivity only; not a named operator, funded roster, employment plan, or opening authorization.';
  m.p0_formal_total_cost = {
    status: 'unknown', value: null, unit: 'currency', source_files: ['visual/assets/v13-implementation.json'],
    formula: DATA.cost_model.formula, confidence: 'unknown', assumptions: ['A-P0-COST-001'],
    reason: 'Quantities are concept-derived but market rates, professional fees, funding, tax basis, and site-specific restoration scope are not available.'
  };
  m.p0_calculated_field_capacity = {
    status: 'unknown', value: null, unit: 'persons', source_files: ['visual/assets/v15-execution-kit.json'],
    formula: KIT.capacity_egress_template.capacity_formula, confidence: 'unknown', assumptions: ['A-P0-CAPACITY-001'],
    reason: 'Surveyed net area, approved occupant factor, fire/life-safety capacity, accessible service positions, and appointed staffed coverage are all absent.'
  };
  m.p0_restoration_reserve_amount = {
    status: 'unknown', value: null, unit: 'CNY', source_files: ['visual/assets/v15-execution-kit.json'],
    formula: KIT.restoration_reserve_template.formula, confidence: 'unknown', assumptions: ['A-P0-MAINTENANCE-001', 'A-P0-COST-001'],
    reason: 'Verified removable CAPEX, site-specific restoration, removal transport, waste treatment, closeout cost, funding authority, and ring-fencing are absent.'
  };
  writeJson('metrics.json', metrics);
}

function updateAssumptions() {
  const file = readJson('assumptions.json');
  const additions = [
    {
      id: 'A-P0-DIM-001', status: 'conditional_design_assumption',
      statement: 'P0-ALL-STOP-01 dimensions are transparent concept-screening assumptions derived from the stated 18 m x 12 m envelope and component relationships. They are not copied from another submission, are not site measurements, and are not claimed as statutory or signed engineering minima.',
      impact: 'They support clash checks, quantity derivation, and hand-off only. Every site- and standard-sensitive parameter remains subject to competent professional review.',
      recalculation_trigger: 'Candidate site survey, applicable public-standard confirmation, paid accessibility co-design, equipment selection, or any geometry change.'
    },
    {
      id: 'A-P0-SITE-001', status: 'participant_preferred_candidate_no_set_out',
      statement: 'P0-CAND-01 binds the participant-preferred screening relationship to the provisional Zhongzhiyuan key area and safe-speed-yard spatial object. It still has no coordinates, parcel, rights holder, measured section, emergency baseline, utilities, drainage, lighting, noise, or microclimate record.',
      impact: 'Authorization stays NOT_AUTHORIZED and every field metric stays HOLD. The candidate relation improves hand-off specificity but is not a site plan or selection decision.',
      recalculation_trigger: 'Authorized candidate-site baseline and rights/heritage/fire/utilities review.'
    },
    {
      id: 'A-P0-ROLE-001', status: 'unassigned_conditional',
      statement: 'All seventeen referenced execution, accountability, accessibility, traffic, fire, structure, electrical, drainage, equipment, lighting, maintenance, stop, human-takeover, installation, survey, co-design, and independent-evaluation role slots are declared but unassigned/conditional.',
      impact: 'No gate may open, no public operation may begin, and no restoration may be accepted until written role acceptance and authority limits are recorded.',
      recalculation_trigger: 'Written acceptance by real competent parties without implying government authorization.'
    },
    {
      id: 'A-P0-COST-001', status: 'participant_working_band_no_market_pricing',
      statement: 'The BOQ contains concept-derived quantities only. v1.4 adds CNY participant working bands for CAPEX ROM and annual OPEX, with a fixed basis date, while every market unit rate, quotation entity, formal estimate, tender price, tax basis and funding commitment remains null/TBC.',
      impact: 'The bands support option and roster sensitivity comparison but are not a price, budget, supplier quotation, cost-professional estimate, or funding claim.',
      recalculation_trigger: 'Nominated site, verified quantities, neutral procurement route, auditable market rates, professional cost plan, and funding authority.'
    },
    {
      id: 'A-P0-FIELD-001', status: 'HOLD_no_field_baseline',
      statement: 'The two-layer acceptance matrix distinguishes eight package-checkable items from twelve field-dependent metrics. v1.4 closes the audit-record and AI-off staffed-service rehearsal gaps, so current package results are eight PASS and zero HOLD; all twelve field metrics remain HOLD. v1.5 aggregates those twelve raw metrics and twelve external gates into four decision bundles without removing any evidence requirement.',
      impact: 'Synthetic tasks, concept paths, and fictional journeys cannot be presented as wheelchair, low-vision, older-person, response-time, conflict, environmental, acceptance, roster, or real-cost performance.',
      recalculation_trigger: 'G0-G3 evidence, paid co-design preregistration, authorized field data, named operator, and independent evaluation.'
    },
    {
      id: 'A-P0-CODESIGN-001', status: 'paid_codesign_required',
      statement: 'The 1.8 m turning assumption and all tactile, contrast, service-desk, response, and group thresholds must be tested with paid affected participants and accessibility professionals.',
      impact: 'Concept dimensions cannot substitute for lived-experience acceptance or professional compliance review.',
      recalculation_trigger: 'Accessible full-size mock-up and participant-approved task protocol.'
    },
    {
      id: 'A-P0-OPERATIONS-001', status: 'participant_roster_sensitivity_no_operator',
      statement: 'v1.4 compares 8, 12 and 18 public-service hours per day using 1680 productive hours per FTE-year and a 1.2 leave/training factor. The selected 12-hour middle working case assumes 07:00-19:00, covers morning-to-evening civic use more fully than the 8-hour fallback without treating the 18-hour stress case as authorized, calculates 3.129 FTE, and rounds to a four-FTE roster with zero modelled uncovered hours.',
      impact: 'The roster makes the human-equivalent rule computable but does not create a named operator, employment commitment, insurance, funding, or opening permission.',
      recalculation_trigger: 'A named operator confirms service hours, productive-hour rules, simultaneous staffing, leave, training, hot backup, insurance and budget.'
    },
    {
      id: 'A-P0-HANDOFF-001', status: 'blank_professional_handoff_not_executed_evidence',
      statement: 'v1.5 provides seven bilingual execution forms, eighteen common evidence-receipt fields, four external decision bundles, a machine mirror, and a deterministic verifier. All forms are blank and current verified external records remain zero.',
      impact: 'The package is directly receivable by survey, operations, professional-review, cost, procurement, maintenance and independent-evaluation teams, but form completeness does not prove execution maturity.',
      recalculation_trigger: 'A competent party completes, signs and independently reviews an executed copy with traceable external evidence.'
    },
    {
      id: 'A-P0-CAPACITY-001', status: 'capacity_egress_formula_no_field_inputs',
      statement: 'The participant capacity rule is the minimum of surveyed net-area capacity, approved fire/life-safety capacity, accessible-service-position capacity, and appointed staffed-role coverage. Two independent egress routes are a concept design test only; field-verified routes and widths remain zero/null.',
      impact: 'No occupancy, opening, event or evacuation claim can be made until survey, fire, accessibility and operator evidence is accepted.',
      recalculation_trigger: 'Authorized survey plus fire/life-safety, accessibility and named-operator confirmation.'
    },
    {
      id: 'A-P0-MAINTENANCE-001', status: 'lifecycle_template_no_executed_log_or_funding',
      statement: 'v1.5 defines four maintenance cycles and a restoration-reserve sensitivity of 10%–20% of verified removable CAPEX plus site-specific restoration, removal transport, waste treatment and independent closeout. Verified CAPEX, reserve amount and ring-fenced funding remain null/false.',
      impact: 'Maintenance and removal become explicit decision interfaces without presenting a participant percentage as a cost estimate or funded reserve.',
      recalculation_trigger: 'Verified quantities and costs, named maintenance responsibility, site-specific restoration method, funding authority and independent closeout acceptance.'
    }
  ];
  for (const item of additions) {
    const index = file.assumptions.findIndex(a => a.id === item.id);
    if (index >= 0) file.assumptions[index] = item; else file.assumptions.push(item);
  }
  writeJson('assumptions.json', file);
}

const METRIC_REF_BY_DIM = {
  'P0-D01': 'p0_screening_envelope_area_sqm', 'P0-D02': 'p0_reversible_ground_area_sqm',
  'P0-D03': 'p0_clear_route_width_m', 'P0-D04': 'p0_wheelchair_turn_diameter_m',
  'P0-D05': 'p0_staffed_desk_length_m', 'P0-D06': 'p0_staffed_sightline_m',
  'P0-D07': 'p0_robot_bay_area_sqm', 'P0-D08': 'p0_robot_no_entry_area_sqm',
  'P0-D09': 'p0_component_setback_m', 'P0-D10': 'p0_maintenance_clearance_m',
  'P0-D11': 'p0_removal_access_width_m', 'P0-D12': 'p0_canopy_area_sqm'
};

function safeCell(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, '<br>');
}

function deliveryControlBlock(lang) {
  const zh = lang === 'zh';
  const candidates = CONTROL.candidate_screening.candidates.map(item =>
    `| ${item.candidate_id} | ${safeCell(zh ? item.name_zh : item.name_en)} | ${safeCell(item.strengths.join('; '))} | ${safeCell(item.holds.join('; '))} | ${item.status} |`
  ).join('\n');
  const rosters = CONTROL.operator_commissioning.shift_scenarios.map(item =>
    `| ${item.scenario_id} | ${item.public_service_hours_per_day} h/day | ${item.annual_staffed_hours} h | ${item.calculated_fte.toFixed(3)} | ${item.working_roster_fte} | ${item.uncovered_hours} |`
  ).join('\n');
  const gates = CONTROL.external_gates.map(item =>
    `| ${item.gate_id} | ${safeCell(item.subject)} | ${item.accountable_role} | ${safeCell(item.required_receipt)} | ${item.status} |`
  ).join('\n');
  const stages = CONTROL.release_stages.map(item =>
    `| ${item.stage_id} | ${item.state} | ${item.required_gate_ids.join('+') || 'internal'} | ${item.status} |`
  ).join('\n');
  const alternatives = CONTROL.alternatives.map(item =>
    `| ${item.alternative_id} | ${safeCell(item.question)} | ${safeCell(item.option_a)} | ${safeCell(item.option_b)} | ${item.fallback_gate_id} | ${item.status} |`
  ).join('\n');
  const capex = CONTROL.working_cost_sensitivity.capex_rom_cny;
  const opex = CONTROL.working_cost_sensitivity.annual_opex_cny;
  return `#### ${zh ? 'v1.4 实施控制闭环：内部可执行，外部门继续关闭' : 'v1.4 delivery-control closure: internally executable, externally fail-closed'}

${zh ? 'P0 不再保持完全非定位，而是绑定三个公开临时重点区中的参与者筛查候选关系；首选 P0-CAND-01 只表示优先进入 G0 文件筛查，不是选址、坐标、权属或许可。' : 'P0 is no longer wholly unlocated: it binds three participant-screening candidates to the public provisional key-area relationships. Preferred P0-CAND-01 means first in line for G0 documentary screening only—not site selection, coordinates, rights, or permission.'} [metric:p0_candidate_screening_count]

| candidate | ${zh ? '筛查关系' : 'Screening relationship'} | ${zh ? '优势' : 'Strengths'} | HOLD | status |
| --- | --- | --- | --- | --- |
${candidates}

${zh ? '人工等价采用“AI 开放时长不得超过已覆盖的人工服务时长”硬规则。人工桌不可用时先切换到同一服务窗内的人工电话/文字热备；两条人工路径都不可用时，AI 同步关闭并生成审计 HOLD。以下均为参与者排班敏感性，不是运营承诺。' : 'Human equivalence uses a hard rule: AI availability cannot exceed covered human-service hours. If the desk is unavailable, service changes to funded human phone/text hot backup in the same window; if both human routes fail, AI closes and emits an audited HOLD. These are participant roster sensitivities, not operator commitments.'}

| scenario | service window | annual staffed hours | calculated FTE | working roster | uncovered hours |
| --- | ---: | ---: | ---: | ---: | ---: |
${rosters}

${zh ? '选定 ROSTER-12H 作为中值工作情景：参与者暂按 07:00—19:00 比较，它比 8 小时回退情景更完整覆盖早晚公共服务，又不把 18 小时压力情景当作既定承诺；计算为 3.129 FTE，向上取整 4 FTE，模型未覆盖工时为 0。具体时段仍须由具名运营者和付费共同设计确认或替换。' : 'ROSTER-12H is selected as the middle working case. Its participant assumption of 07:00-19:00 covers morning-to-evening civic use more fully than the 8-hour fallback without treating the 18-hour stress case as a commitment. It calculates 3.129 FTE, rounds up to four FTE, and has zero modelled uncovered hours. A named operator and paid co-design process must confirm or replace the window.'} [metric:p0_working_roster_fte]

${zh ? `CAPEX ROM 工作带为 ${capex.low.toLocaleString('en-US')}—${capex.high.toLocaleString('en-US')} CNY；基准日 ${CONTROL.working_cost_sensitivity.basis_date}。` : `The CAPEX ROM working band is CNY ${capex.low.toLocaleString('en-US')}–${capex.high.toLocaleString('en-US')}, basis date ${CONTROL.working_cost_sensitivity.basis_date}.`} [metric:p0_working_capex_rom_low_cny] [metric:p0_working_capex_rom_high_cny]

${zh ? `年度 OPEX 工作带为 ${opex.low.toLocaleString('en-US')}—${opex.high.toLocaleString('en-US')} CNY。这些区间只比较概念 BOQ 与排班，不是市场单价、正式估算、供应商报价、招标价或资金承诺。` : `The annual OPEX working band is CNY ${opex.low.toLocaleString('en-US')}–${opex.high.toLocaleString('en-US')}. These bands compare concept BOQ and roster assumptions only; they are not market rates, a formal estimate, vendor quotes, a tender price, or funding commitment.`} [metric:p0_working_opex_low_cny] [metric:p0_working_opex_high_cny]

${zh ? '十二道外部门均要求独立回执，当前 12/12 HOLD；任何缺失不得由包内 PASS 抵消。' : 'All twelve external gates require distinct receipts and remain 12/12 HOLD; no missing gate can be offset by package-level PASS results.'} [metric:p0_external_gate_hold_count]

| gate | subject | accountable | required receipt | current |
| --- | --- | --- | --- | --- |
${gates}

${zh ? '释放链只允许参与者设计交接状态为 READY；尽调、冻结、采购、组装、限时开放和恢复验收六个外部阶段全部 HOLD。' : 'Only the participant design hand-off state is READY. Due diligence, design freeze, procurement, assembly, limited opening, and restoration closeout all remain HOLD.'} [metric:p0_release_stage_hold_count]

| stage | state | required gates | current |
| --- | --- | --- | --- |
${stages}

${zh ? '四组 A/B 备选均绑定回退门；备选比较不构成批准。' : 'Four A/B alternatives bind explicit fallback gates; comparison is not approval.'} [metric:p0_alternative_count]

| alternative | question | option A | option B | fallback | status |
| --- | --- | --- | --- | --- | --- |
${alternatives}

${zh ? '交接包同时映射北京市城市更新实施方案编制工作指南的 11 个模块；这只检查交接完整度，不产生实施主体、联审、批准、资金或场地权利。确定性验证已检查角色引用、任务依赖、单一 Accountable、排班、成本边界、门禁、双钥匙、备选回退和假释放，结果为 PASS。' : 'The package also maps all eleven modules of the Beijing urban-renewal implementation-plan guide. This tests hand-off completeness only and creates no implementation entity, joint review, approval, funding, or site right. Deterministic verification checks role references, task dependencies, single accountability, roster, cost boundaries, gates, two-key control, alternative fallback, and false release; result: PASS.'} [metric:p0_urban_renewal_module_count]`;
}

function professionalHandoffBlock(lang) {
  const zh = lang === 'zh';
  const bundleRows = KIT.external_decision_bundles.map(item =>
    `| ${item.bundle_id} | ${safeCell(zh ? item.title_zh : item.title_en)} | ${item.raw_field_metric_ids.join(', ')} | ${item.external_gate_ids.join(', ')} | ${item.required_form_ids.join(', ')} | ${item.status} |`
  ).join('\n');
  const formRows = KIT.forms.map(item =>
    `| ${item.form_id} | ${safeCell(zh ? item.title_zh : item.title_en)} | ${item.responsible_roles.join(' + ')} | ${item.required_fields.length} | ${zh ? '空表 / 未执行' : 'blank / not executed'} |`
  ).join('\n');
  const maintenanceRows = KIT.maintenance_cycles.map(item =>
    `| ${item.cycle_id} | ${item.frequency} | ${safeCell(item.scope)} | ${item.decision} | ${item.status} |`
  ).join('\n');
  return `#### ${zh ? 'v1.5 专业执行交接：可填写、可接收、可复核' : 'v1.5 professional execution hand-off: fillable, receivable, verifiable'}

${zh ? 'v1.5 不增加总体概念、场景或角色，而把既有控制转换为七类双语执行空表、机器镜像和反假释放校验。每份外部证据必须填写 18 个统一字段，包括版本、来源、方法、样本、局限、缺失、权利、利益冲突、独立复核、签认与 SHA-256。当前已接收并核验的外部记录仍为 0。' : 'v1.5 adds no overall concept, scenario or role. It converts the existing controls into seven bilingual blank execution forms, a machine mirror, and false-release verification. Every external record must carry eighteen common fields including version, source, method, sample, limitations, missingness, rights, conflict, independent review, sign-off and SHA-256. Current accepted and verified external records remain zero.'} [metric:p0_execution_form_count] [metric:p0_external_evidence_receipt_field_count] [metric:p0_verified_external_record_count]

| form | ${zh ? '工作面' : 'Work surface'} | ${zh ? '责任槽位' : 'Role slots'} | ${zh ? '专用必填字段' : 'Specific required fields'} | current |
| --- | --- | --- | ---: | --- |
${formRows}

${zh ? '底层 12 项现场指标与 12 道外部门均保留，首屏只聚合成四个不可互相抵消的专业决策包。聚合不减少证据；任何一个底层指标或 Gate 缺失，相应决策包继续 HOLD。' : 'All twelve raw field metrics and twelve external gates remain. The first screen aggregates them into four non-compensating professional decision bundles only. Aggregation removes no evidence: one missing raw metric or gate keeps its bundle on HOLD.'} [metric:p0_external_decision_bundle_count] [metric:p0_external_decision_bundle_hold_count]

| bundle | ${zh ? '专业决策入口' : 'Professional decision entry'} | raw metrics | external gates | forms | current |
| --- | --- | --- | --- | --- | --- |
${bundleRows}

${zh ? '容量不采用单一设计人数，而按四个可核输入的最小值裁定：' : 'Capacity is not a single participant-designed number. It is decided by the minimum of four verifiable inputs:'}

\`${KIT.capacity_egress_template.capacity_formula}\`

${zh ? '实测净面积、人均面积、消防/生命安全核定、无障碍服务位和已落实岗位覆盖均为 null；概念上检查两条独立退出路径，但现场核实路径为 0、核实净宽为 null。' : 'Surveyed net area, occupant factor, fire/life-safety approval, accessible service positions and appointed staffing coverage are all null. Two independent egress routes are tested conceptually, but field-verified routes are zero and verified clear width is null.'} [metric:p0_capacity_egress_template_count] [metric:p0_concept_egress_route_count] [metric:p0_field_verified_egress_route_count]

${zh ? '因此容量保持 unknown/HOLD。' : 'Capacity therefore remains unknown/HOLD.'} [metric:p0_calculated_field_capacity]

${zh ? '维护与退出按四个周期进入交接：' : 'Maintenance and exit enter hand-off through four cycles:'} [metric:p0_maintenance_cycle_count]

| cycle | frequency | scope | decision | current |
| --- | --- | --- | --- | --- |
${maintenanceRows}

${zh ? '恢复储备模板采用“经核可拆 CAPEX × 10%–20% + 场地专项恢复 + 拆运 + 废弃物 + 独立收口”；该比例只是参与者敏感性。' : 'The restoration-reserve template uses verified removable CAPEX × 10%–20% plus site-specific restoration, removal transport, waste and independent closeout. The ratio is a participant sensitivity only.'} [metric:p0_restoration_reserve_template_count] [metric:p0_restoration_reserve_ratio_low] [metric:p0_restoration_reserve_ratio_high]

${zh ? '当前经核 CAPEX、储备金额和锁定资金仍为 null/false。' : 'Verified CAPEX, reserve amount and ring-fenced funding remain null/false.'} [metric:p0_restoration_reserve_amount]

${zh ? '人工工作簿见 `assets/media/p0-execution-workbook.md`，机器镜像与确定性收据见 `visual/assets/v15-execution-kit.json` 和 `visual/assets/v15-verification.json`。表单完整永远不能自动打开现场 Gate。' : 'The human workbook is `assets/media/p0-execution-workbook.md`; its machine mirror and deterministic receipt are `visual/assets/v15-execution-kit.json` and `visual/assets/v15-verification.json`. Form completeness can never open a field gate automatically.'}`;
}

function summaryBlock(lang) {
  const zh = lang === 'zh';
  return `<!-- V1.3_P0_SUMMARY_START -->\n### ${zh ? '30 秒 P0 实施摘要' : '30-second P0 implementation summary'}\n\n> **P0-ALL-STOP-01 · ${zh ? '条件式首启单元' : 'conditional launch unit'} · \`NOT_AUTHORIZED\` · \`HOLD\`**\n> ${zh ? '216 m² 非定位概念筛查包络，保留 3.0 m 有效慢行净宽；12 项任务、16 行不计价 BOQ、8 类成本组件。8 项包内验收目前 6 PASS / 2 HOLD，12 项现场验收全部 HOLD；8 个责任槽位均为 unassigned/conditional，市场单价、正式总价、报价单位与基准日均为 null/TBC。任一群体安全关键失败、等价服务缺失或无法退出，整体继续 HOLD。' : 'A 216 m² unlocated concept-screening envelope preserves a 3.0 m effective slow-route width; 12 tasks, 16 non-priced BOQ lines, and 8 cost components. Eight package checks currently show 6 PASS / 2 HOLD, while all 12 field checks remain HOLD. All 8 role slots are unassigned/conditional; market rates, formal total, quotation entity, and basis date are null/TBC. One group safety-critical failure, missing equivalent service, or failed exit keeps the whole unit on HOLD.'}\n\n${zh ? '固定入口：尺寸与接口见下文及 `assets/figures/key-areas.png`；任务、工程量、成本与验收见 `assets/figures/metrics-evidence.png`。这些是可复算交接证据，不是现场绩效、许可或工程签章。' : 'Fixed entry points: dimensions and interfaces appear below and in `assets/figures/key-areas.en.png`; tasks, quantities, cost, and acceptance appear in `assets/figures/metrics-evidence.en.png`. These are recomputable hand-off evidence, not field performance, permission, or engineering sign-off.'} [metric:p0_screening_envelope_area_sqm] [metric:p0_clear_route_width_m] [metric:p0_task_chain_count] [metric:p0_boq_line_count] [metric:p0_cost_component_count] [metric:p0_role_slot_count] [metric:p0_current_package_check_count] [metric:p0_current_package_pass_count] [metric:p0_current_package_hold_count] [metric:p0_field_check_hold_count]\n<!-- V1.3_P0_SUMMARY_END -->`;
}

function summaryBlockV14(lang) {
  const zh = lang === 'zh';
  return `<!-- V1.4_P0_SUMMARY_START -->\n### ${zh ? '30 秒 P0 实施摘要' : '30-second P0 implementation summary'}\n\n> **P0-ALL-STOP-01 · ${zh ? '实施控制交接单元' : 'delivery-control hand-off unit'} · \`NOT_AUTHORIZED\` · \`HOLD\`**\n> ${zh ? '216 m² 概念筛查包络已绑定众智园安全慢速场的参与者首选候选关系，但无坐标、不可放样；12 项任务、16 行 BOQ、17 个已声明但未指派角色。8 项包内验收为 8 PASS / 0 HOLD，审计与 AI-off 人工等价均为 12/12；12 项现场验收、12 道外部门和 6 个外部释放阶段继续全部 HOLD。12 小时工作排班为 4 FTE；CAPEX/OPEX 只有非正式敏感区间，正式总价、报价、资金与许可仍为 null/TBC。' : 'The 216 m² concept envelope is bound to a participant-preferred candidate relationship at the Zhongzhiyuan safe-speed yard, but has no coordinates and cannot be set out. It has 12 tasks, 16 BOQ lines, and 17 declared but unappointed roles. Package acceptance is 8 PASS / 0 HOLD; audit and AI-off human equivalence are both 12/12. All 12 field checks, 12 external gates, and six external release stages remain HOLD. The 12-hour working roster is four FTE; CAPEX/OPEX are non-formal sensitivity bands only, while formal total, quotation, funding, and permission remain null/TBC.'}\n\n${zh ? '尺寸与接口的固定入口见下文及 \`assets/figures/key-areas.png\`；这些是概念筛查值，不是现场测量。' : 'The fixed entry for dimensions and interfaces is below and in \`assets/figures/key-areas.en.png\`; these are concept-screening values, not field measurements.'} [metric:p0_screening_envelope_area_sqm] [metric:p0_clear_route_width_m]\n\n${zh ? '任务、工程量和责任角色见 \`assets/figures/metrics-evidence.png\` 与控制数据源。' : 'Tasks, quantities, and accountable roles are shown in \`assets/figures/metrics-evidence.en.png\` and the control source.'} [metric:p0_task_chain_count] [metric:p0_boq_line_count] [metric:p0_role_slot_count]\n\n${zh ? '包内验收已闭环；现场验收继续关闭，不能由合成结果替代。' : 'Package acceptance is closed; field acceptance remains closed and cannot be replaced by synthetic results.'} [metric:p0_current_package_pass_count] [metric:p0_current_package_hold_count] [metric:p0_field_check_hold_count]\n\n${zh ? '外部门与工作排班见 \`visual/assets/v14-delivery-control.json\`；它们不构成许可、签约或工程签章。' : 'External gates and the working roster are in \`visual/assets/v14-delivery-control.json\`; they are not permission, appointment, or engineering sign-off.'} [metric:p0_external_gate_hold_count] [metric:p0_working_roster_fte]\n<!-- V1.4_P0_SUMMARY_END -->`;
}

function summaryBlockV15(lang) {
  const zh = lang === 'zh';
  return `<!-- V1.5_P0_SUMMARY_START -->\n### ${zh ? '30 秒 P0 专业交接摘要' : '30-second P0 professional hand-off summary'}\n\n> **P0-ALL-STOP-01 · ${zh ? '专业执行交接单元' : 'professional execution hand-off unit'} · \`NOT_AUTHORIZED\` · \`HOLD\`**\n> ${zh ? '216 m² 概念筛查包络继续绑定 P0-CAND-01，但无坐标、不可放样。12 项任务、16 行 BOQ、17 个未指派角色和包内 8/8 PASS 均保持；12 项现场指标与 12 道外部门被无损聚合为 4 个外部决策包，当前 4/4 HOLD。新增 7 类双语执行空表、18 个证据回执字段、容量/疏散公式、4 个维护周期和恢复储备模板；真实记录、容量、签认、成本、资金与授权仍为 0/null/HOLD。' : 'The 216 m² concept-screening envelope remains bound to P0-CAND-01 but has no coordinates and cannot be set out. Twelve tasks, 16 BOQ lines, 17 unappointed roles and package 8/8 PASS remain. Twelve field metrics and twelve external gates are losslessly aggregated into four external decision bundles, all 4/4 HOLD. v1.5 adds seven bilingual blank execution forms, eighteen evidence-receipt fields, a capacity/egress formula, four maintenance cycles and a restoration-reserve template; actual records, capacity, signatures, cost, funding and authorization remain zero/null/HOLD.'}\n\n${zh ? '专业团队可从工作簿直接接手调查、责任接受、D0 基线、成本、专业复核、复演维护和变更控制；四个外部决策包继续全部 HOLD。' : 'Professional teams can directly take over survey, responsibility acceptance, D0 baseline, cost, professional review, rehearsal/maintenance and change control from the workbook; all four external decision bundles remain HOLD.'} [metric:p0_execution_form_count] [metric:p0_external_decision_bundle_count] [metric:p0_external_decision_bundle_hold_count]\n\n${zh ? '容量/疏散、维护和恢复储备均已有填写模板；工作簿自身不构成现场证据或放行。' : 'Capacity/egress, maintenance and restoration reserve now have fillable templates; the workbook itself is not field evidence or release.'} [metric:p0_capacity_egress_template_count] [metric:p0_maintenance_cycle_count] [metric:p0_restoration_reserve_template_count]\n<!-- V1.5_P0_SUMMARY_END -->`;
}

function implementationBlock(lang) {
  const zh = lang === 'zh';
  const dRows = DATA.dimensions.map(d => {
    const ref = METRIC_REF_BY_DIM[d.dimension_id];
    return `| ${d.dimension_id} | ${safeCell(zh ? d.label_zh : d.label_en)} | ${safeCell(d.derivation)} [metric:${ref}] | ${safeCell(zh ? d.basis_zh : d.basis_en)} | \`${d.confirmation_role}\` / ${safeCell(d.trigger)} |`;
  }).join('\n');
  const taskZh = ['角色与停权登记', '候选点筛查', '现场基线', '付费共同设计', '条件设计与 BOQ', '许可/专业复核', '中性采购与方法书', '全尺样机与急停', '安装及 AI-off 演练', '限时小试', '独立评估与决策', '拆除、恢复、验收'];
  const taskRows = DATA.tasks.map((t, i) => {
    const title = zh ? taskZh[i] : t.outputs.slice(0, 2).join('; ');
    return `| ${t.task_id} | ${t.window} | \`${t.responsible_role}\` | \`${t.accountable_role}\` | ${safeCell(title)} | ${t.required_gates.join('+')} | ${safeCell(t.hold_conditions.join('; '))} | ${safeCell(t.recovery_or_exit_evidence.join('; '))} |`;
  }).join('\n');
  const boqRows = DATA.boq.map(q => `| ${q.boq_id} | ${safeCell(zh ? q.item_zh : q.item_en)} | ${q.quantity} ${q.unit} | ${safeCell(q.derivation)} | \`null/TBC\` |`).join('\n');
  const aRows = DATA.acceptance_current_package.map(m => `| ${m.metric_id} | ${safeCell(zh ? m.label_zh : m.label_en)} | ${safeCell(m.formula)} | ${safeCell(m.data_source)} | ${safeCell(m.threshold_status)} | \`${m.responsible_role}\` | **${m.current_status}** | ${safeCell(m.trigger_condition)} |`).join('\n');
  const bRows = DATA.acceptance_field.map(m => `| ${m.metric_id} | ${safeCell(zh ? m.label_zh : m.label_en)} | ${safeCell(m.formula)} | ${safeCell(m.data_source)} | ${safeCell(m.threshold_status)} | \`${m.responsible_role}\` | **${m.current_status}** | ${safeCell(m.trigger_condition)} |`).join('\n');
  const roleLines = DATA.roles.map(r => `- \`${r.role_id}\` — ${zh ? r.role_zh : r.role_en}: \`${r.assignment}\`; ${r.authority}`).join('\n');
  const costLines = DATA.cost_model.components.map(c => `- \`${c.cost_id}\` ${zh ? c.label_zh : c.label_en}: \`${c.formula}\`; value = \`null\`.`).join('\n');
  const metricRefs = '[metric:p0_tbc_interface_count]';
  return `<!-- V1.3_P0_IMPLEMENTATION_START -->\n### ${zh ? 'v1.3 P0-ALL-STOP-01：尺寸化、责任化、数量化' : 'v1.3 P0-ALL-STOP-01: dimensioned, accountable, quantified'}\n\n${zh ? '稳定对象 ID 为' : 'The stable object ID is'} \`P0-ALL-STOP-01\`. ${zh ? '它仍是无坐标、非定位、不可放样、不可采购的概念筛查单元；当前状态同时为' : 'It remains a coordinate-free, unlocated concept-screening unit that cannot be set out or procured; its current states are'} \`NOT_AUTHORIZED\`, \`HOLD\`, ${zh ? '角色' : 'roles'} \`unassigned/conditional\`, ${zh ? '价格' : 'prices'} \`null/TBC\`. ${zh ? '图件按 1:500 场地关系、1:100 平面、1:50 断面和 1:20 关键接口表达同一对象，但比例只说明图面关系与设计假设，不冒充正式选址或工程设计。' : 'The same object is shown at 1:500 site relation, 1:100 plan, 1:50 section, and 1:20 key interface. The scales communicate drawing relationships and assumptions only, never formal siting or engineering design.'}\n\n![${zh ? 'P0-ALL-STOP-01 场地关系、平面、断面、关键接口与条件动作' : 'P0-ALL-STOP-01 site relation, plan, section, key interface, and conditional actions'}](assets/figures/key-areas${zh ? '' : '.en'}.png)\n\n#### ${zh ? '尺寸登记：每一个数都带依据和确认触发' : 'Dimension register: every number has a basis and confirmation trigger'}\n\n| ID | ${zh ? '对象' : 'Object'} | ${zh ? '数值/推导' : 'Value / derivation'} | ${zh ? '设计假设边界' : 'Design-assumption boundary'} | ${zh ? '确认角色 / 触发' : 'Confirmation role / trigger'} |\n| --- | --- | --- | --- | --- |\n${dRows}\n\n${zh ? '六类现场接口继续为 TBC：触觉做法、高对比与夜间可读性、照度/眩光/电力容量、坡度/排水/出水口、应急净宽与消防控制、设备电力/数据/充电与线缆保护。任何线缆不得穿越有效路径；既有应急净宽不得因 P0 缩减；没有文保/管线/结构许可时不做穿透式固定。' : 'Six site interfaces remain TBC: tactile detail, contrast and night readability, lighting/glare/power, slope/drainage/outfall, emergency width/fire control, and power/data/charging/cable protection. No cable may cross the effective route; P0 cannot reduce the existing emergency width; no penetrating fixing is allowed without heritage, utility, and structural clearance.'} ${metricRefs}\n\n#### ${zh ? '权力与责任：执行、签放、叫停、接管、拆除与验收分开' : 'Authority and responsibility: execution, release, stop, takeover, removal, and acceptance are separated'}\n\n${roleLines}\n\n${zh ? '最终签放槽位是场地权利方/委托责任槽位，但不得绕过无障碍、消防、结构、电气、隐私、安全与独立证据记录。付费共同设计牵头、人工服务运营、当班安全/隐私角色拥有平行立即叫停权；任何使用者或工作人员都可无惩罚触发实体急停。人工接管由人工服务运营角色执行；安装恢复角色负责拆除、清运和地面恢复；场地责任槽位对恢复验收负责，独立评估角色只签证据完整性，不冒充政府或工程批准。' : 'The site-rights/commissioning slot holds final release accountability but cannot bypass accessibility, fire, structural, electrical, privacy, safety, or independent evidence. Paid co-design, staffed service, and on-duty safety/privacy roles hold equal immediate-stop power; any user or worker may activate the physical stop without penalty. The staffed operator performs takeover; the installation/restoration role dismantles, removes, and restores; the accountable site slot accepts restoration, while the independent evaluator signs evidence completeness only—not government or engineering approval.'}\n\n#### ${zh ? '90 天交付任务链' : '90-day delivery task chain'}\n\n| task_id | ${zh ? '窗口' : 'Window'} | ${zh ? '责任角色' : 'Responsible'} | ${zh ? 'Accountable' : 'Accountable'} | ${zh ? '输入/输出摘要' : 'Input/output summary'} | Gate | HOLD | ${zh ? '恢复或退出证据' : 'Recovery or exit evidence'} |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${taskRows}\n\n${zh ? '任务链共 12 项，保持 D00—D90 研究窗与 G0—G5 六道证据门。G0—G5 默认 6/6 关闭；T09 只有在路径侵占为 0、审计与 AI-off 等价均达到 12/12、错误输入 1/1 触发 HOLD 后才可能请求 G4，而不是自动放行。当前合成台账仍为审计 11/12、AI-off 等价 11/12，因此 P0 继续 HOLD。' : 'The chain contains 12 tasks within D00–D90 and retains G0–G5. All six gates default closed. T09 may request—but never automatically receive—G4 only after route encroachment is zero, audit and AI-off equivalence are both 12/12, and malformed input triggers HOLD in 1/1 tests. The present synthetic ledger remains 11/12 for audit and 11/12 for AI-off equivalence, so P0 remains on HOLD.'} [metric:p0_task_chain_count] [metric:p0_gate_default_closed_ratio] [metric:p0_route_obstruction_count] [metric:p0_malformed_input_hold_ratio]\n\n#### ${zh ? '不计价工程量清单' : 'Non-priced bill of quantities'}\n\n| boq_id | ${zh ? '项目' : 'Item'} | ${zh ? '数量' : 'Quantity'} | ${zh ? '推导' : 'Derivation'} | ${zh ? '计价状态' : 'Pricing state'} |\n| --- | --- | --- | --- | --- |\n${boqRows}\n\n${zh ? 'BOQ 共 16 行，覆盖构架、地面、人工桌、急停、纸本、多通道导视、座椅/遮蔽、照明、设备接口、安装、维护和拆除恢复。数量能从 1:100 平面、1:50 断面、1:20 节点或 90 天任务直接复算；市场单价已取得项为 0，货币、报价单位、正式总价与估算基准日仍为 null/TBC。' : 'The 16-line BOQ covers frame, ground, staffed desk, emergency stops, paper, multi-channel wayfinding, seating/shelter, lighting, equipment interfaces, installation, maintenance, and removal/restoration. Every quantity can be recomputed from the 1:100 plan, 1:50 section, 1:20 node, or 90-day tasks. Verified market-rate count is 0; currency, quotation entity, formal total, and estimate basis date remain null/TBC.'} [metric:p0_boq_line_count] [metric:p0_market_rate_known_count]\n\n#### ${zh ? '参数化成本模型：公式完整，价格不造' : 'Parametric cost model: complete formula, no fabricated prices'}\n\n\`${DATA.cost_model.formula}\`\n\n${costLines}\n\n${zh ? '人员公式为' : 'Staffing formula:'} \`${DATA.cost_model.staffing_formula}\`. ${zh ? '敏感性至少覆盖开放工时、开放天数、班次重叠、每 FTE 生产工时、付费参与与支持、BOQ 数量、恢复面积和预备费率。市场价格总额、所需 FTE 与正式总价都保持 unknown/null，只有具名场地、运营者、专业造价团队、报价来源、基准日和资金授权到位后才可计算。' : 'Sensitivity covers opening hours, open days, shift overlap, productive hours per FTE, paid participation/support, BOQ quantities, remediation area, and contingency. Market-price total, required FTE, and formal total all remain unknown/null until a named site, operator, professional cost team, rate sources, basis date, and funding authority exist.'} [metric:p0_cost_component_count] [metric:p0_market_price_total] [metric:p0_staffing_fte] [metric:p0_formal_total_cost]\n\n#### ${zh ? '两层验收 A：当前包内即可判断' : 'Two-layer acceptance A: checkable in the current package'}\n\n| metric_id | ${zh ? '指标' : 'Metric'} | ${zh ? '公式' : 'Formula'} | ${zh ? '数据源' : 'Data source'} | ${zh ? '阈值状态' : 'Threshold state'} | ${zh ? '责任' : 'Responsible'} | ${zh ? '当前状态' : 'Current state'} | ${zh ? '触发' : 'Trigger'} |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${aRows}\n\n${zh ? 'A 层 8 项当前为 6 PASS / 2 HOLD。HOLD 项就是演练中公开保留的审计缺口与人工桌关闭失败；只有补齐记录、修正人工服务并重跑同一固定任务，状态才可能改变。退出/恢复的 6 个证据槽位已在流程中完整定义，但真实执行仍属于 B 层现场证据。' : 'Layer A currently records 6 PASS / 2 HOLD across eight checks. The HOLD items are the disclosed audit gap and staffed-desk closure failure. Status changes only after closing the record gap, correcting staffed service, and rerunning the same fixed tasks. Six exit/restoration evidence slots are fully specified, but actual execution remains field evidence.'} [metric:p0_current_package_pass_count] [metric:p0_current_package_hold_count] [metric:p0_exit_evidence_slot_count]\n\n#### ${zh ? '两层验收 B：必须等待现场基线' : 'Two-layer acceptance B: field baseline required'}\n\n| metric_id | ${zh ? '指标' : 'Metric'} | ${zh ? '公式' : 'Formula'} | ${zh ? '数据源' : 'Data source'} | ${zh ? '阈值状态' : 'Threshold state'} | ${zh ? '责任' : 'Responsible'} | ${zh ? '当前状态' : 'Current state'} | ${zh ? '触发' : 'Trigger'} |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${bRows}\n\n${zh ? 'B 层 12 项全部 HOLD：没有真实轮椅/低视力任务、老人取得人工服务用时、真人响应、人流冲突、噪声、照明、排水、微气候、居民接受、排班或真实成本数据。合成任务、虚构人物旅程和普通意见均不得代替它们。任一群体出现安全关键失败、等价服务缺失或无法退出时，整体 HOLD，不得用平均值覆盖。' : 'All 12 Layer-B items remain HOLD: there is no real wheelchair/low-vision task evidence, older-person time to staffed help, human response, flow conflict, noise, lighting, drainage, microclimate, resident acceptance, roster, or actual cost data. Synthetic tasks, fictional journeys, and general opinions cannot substitute. Any group safety-critical failure, missing equivalent, or failed exit places the whole unit on HOLD; averages cannot override it.'} [metric:p0_field_check_hold_count]\n\n![${zh ? 'P0 任务链、工程量、成本结构和两层验收矩阵' : 'P0 task chain, quantities, cost structure, and two-layer acceptance matrix'}](assets/figures/metrics-evidence${zh ? '' : '.en'}.png)\n<!-- V1.3_P0_IMPLEMENTATION_END -->`;
}

function implementationBlockV14(lang) {
  const zh = lang === 'zh';
  let block = implementationBlock(lang)
    .replaceAll('V1.3_P0_IMPLEMENTATION', 'V1.4_P0_IMPLEMENTATION')
    .replace(zh ? 'v1.3 P0-ALL-STOP-01：尺寸化、责任化、数量化' : 'v1.3 P0-ALL-STOP-01: dimensioned, accountable, quantified', zh ? 'v1.4 P0-ALL-STOP-01：实施控制闭环' : 'v1.4 P0-ALL-STOP-01: delivery-control closure');
  const imageIndex = block.indexOf('\n\n![');
  const header = zh
    ? '稳定对象 ID 为 `P0-ALL-STOP-01`。v1.4 将其绑定到 `P0-CAND-01` 众智园安全慢速场边缘的参与者首选筛查关系；该关系只引用临时重点区和概念空间对象，仍无放样坐标、地块、权属或许可。当前状态保持 `NOT_AUTHORIZED`、`HOLD`，17 个角色均为 `unassigned/conditional`，正式价格与资金为 `null/TBC`。图件继续以 1:500、1:100、1:50 和 1:20 表达同一对象，不冒充正式选址或工程设计。'
    : 'The stable object ID is `P0-ALL-STOP-01`. v1.4 binds it to participant-preferred screening candidate `P0-CAND-01` at the Zhongzhiyuan safe-speed-yard edge. The relationship cites only a provisional key area and concept spatial object and still has no set-out coordinate, parcel, right, or permission. Current states remain `NOT_AUTHORIZED` and `HOLD`; all 17 roles are `unassigned/conditional`, and formal price/funding remains `null/TBC`. The 1:500, 1:100, 1:50, and 1:20 chain still describes the same object without pretending formal siting or engineering design.';
  if (imageIndex < 0) throw new Error('v1.4 implementation image anchor missing');
  block = block.slice(0, block.indexOf('\n\n', block.indexOf('\n### ')) + 2) + header + block.slice(imageIndex);
  block = block.replace(
    zh ? '任务链共 12 项，保持 D00—D90 研究窗与 G0—G5 六道证据门。G0—G5 默认 6/6 关闭；T09 只有在路径侵占为 0、审计与 AI-off 等价均达到 12/12、错误输入 1/1 触发 HOLD 后才可能请求 G4，而不是自动放行。当前合成台账仍为审计 11/12、AI-off 等价 11/12，因此 P0 继续 HOLD。' : 'The chain contains 12 tasks within D00–D90 and retains G0–G5. All six gates default closed. T09 may request—but never automatically receive—G4 only after route encroachment is zero, audit and AI-off equivalence are both 12/12, and malformed input triggers HOLD in 1/1 tests. The present synthetic ledger remains 11/12 for audit and 11/12 for AI-off equivalence, so P0 remains on HOLD.',
    zh ? '任务链共 12 项，保持 D00—D90 研究窗与 G0—G5 六道证据门。v1.4 复演后，审计完整度与 AI-off 人工等价均达到 12/12，错误输入仍为 1/1 触发已审计 HOLD；这只关闭包内缺口，不会自动打开 G4，现实外部门仍全部关闭。' : 'The chain contains 12 tasks within D00–D90 and retains G0–G5. After v1.4 replay, audit completeness and AI-off human equivalence both reach 12/12, while malformed input still triggers an audited HOLD in 1/1 tests. This closes package-level gaps only and never opens G4 automatically; every real-world external gate remains closed.'
  );
  block = block.replace(
    zh ? 'BOQ 共 16 行，覆盖构架、地面、人工桌、急停、纸本、多通道导视、座椅/遮蔽、照明、设备接口、安装、维护和拆除恢复。数量能从 1:100 平面、1:50 断面、1:20 节点或 90 天任务直接复算；市场单价已取得项为 0，货币、报价单位、正式总价与估算基准日仍为 null/TBC。' : 'The 16-line BOQ covers frame, ground, staffed desk, emergency stops, paper, multi-channel wayfinding, seating/shelter, lighting, equipment interfaces, installation, maintenance, and removal/restoration. Every quantity can be recomputed from the 1:100 plan, 1:50 section, 1:20 node, or 90-day tasks. Verified market-rate count is 0; currency, quotation entity, formal total, and estimate basis date remain null/TBC.',
    zh ? 'BOQ 共 16 行，并归入 6 个不计价采购包。数量可由图纸或任务复算；市场单价、供应商报价、正式估算、招标价与资金承诺仍为 0/null。v1.4 只增加带基准日的参与者 CAPEX/OPEX 工作区间，用于比较排班与备选方案。' : 'The 16-line BOQ is grouped into six unpriced procurement lots and remains recomputable from drawings or tasks. Market rates, vendor quotes, formal estimate, tender price, and funding commitment remain zero/null. v1.4 adds dated participant CAPEX/OPEX working bands only to compare roster and alternatives.'
  );
  block = block.replace(
    zh ? '敏感性至少覆盖开放工时、开放天数、班次重叠、每 FTE 生产工时、付费参与与支持、BOQ 数量、恢复面积和预备费率。市场价格总额、所需 FTE 与正式总价都保持 unknown/null，只有具名场地、运营者、专业造价团队、报价来源、基准日和资金授权到位后才可计算。' : 'Sensitivity covers opening hours, open days, shift overlap, productive FTE hours, paid participation/support, BOQ quantities, remediation area, and contingency. Market-price total, required FTE, and formal total all remain unknown/null until a named site, operator, professional cost team, rate sources, basis date, and funding authority exist.',
    zh ? 'v1.4 以 1680 小时/FTE·年和 1.2 请假培训系数比较 8/12/18 小时服务窗；12 小时情景计算为 3.129 FTE，向上取整为 4 FTE，模型未覆盖时长为 0。工作区间并非运营承诺或正式造价；具名运营者、报价、资金、税费与恢复储备签放仍待外部证据。' : 'v1.4 compares 8/12/18-hour service windows using 1,680 productive hours per FTE-year and a 1.2 leave/training factor. The 12-hour case calculates 3.129 FTE and rounds to four FTE with zero modelled uncovered hours. Working bands are not an operator commitment or formal estimate; named operator, quotes, funding, tax, and restoration-reserve release remain external evidence.'
  );
  block = block.replace(
    zh ? 'A 层 8 项当前为 6 PASS / 2 HOLD。HOLD 项就是演练中公开保留的审计缺口与人工桌关闭失败；只有补齐记录、修正人工服务并重跑同一固定任务，状态才可能改变。退出/恢复的 6 个证据槽位已在流程中完整定义，但真实执行仍属于 B 层现场证据。' : 'Layer A currently records 6 PASS / 2 HOLD across eight checks. The HOLD items are the disclosed audit gap and staffed-desk closure failure. Status changes only after closing the record gap, correcting staffed service, and rerunning the same fixed tasks. Six exit/restoration evidence slots are fully specified, but actual execution remains field evidence.',
    zh ? 'A 层 8 项当前为 8 PASS / 0 HOLD。缺失审计记录已改为错误载荷拒绝后的完整审计 HOLD；人工桌不可用已改为人工电话/文字热备，同一任务仍以 AI-off 方式完成。真实执行和现场效果仍属于 B 层。' : 'Layer A now records 8 PASS / 0 HOLD. The missing audit record becomes a complete audited HOLD after malformed-input rejection; desk unavailability changes to human phone/text hot backup so the same task still completes with AI off. Real execution and field effects remain Layer B.'
  );
  block = block.replace(
    zh ? 'B 层 12 项全部 HOLD：没有真实轮椅/低视力任务、老人取得人工服务用时、真人响应、人流冲突、噪声、照明、排水、微气候、居民接受、排班或真实成本数据。合成任务、虚构人物旅程和普通意见均不得代替它们。任一群体出现安全关键失败、等价服务缺失或无法退出时，整体 HOLD，不得用平均值覆盖。' : 'All 12 Layer-B items remain HOLD: there is no real wheelchair/low-vision task evidence, older-person time to staffed help, human response, flow conflict, noise, lighting, drainage, microclimate, resident acceptance, roster, or actual cost data. Synthetic tasks, fictional journeys, and general opinions cannot substitute. Any group safety-critical failure, missing equivalent, or failed exit places the whole unit on HOLD; averages cannot override it.',
    zh ? 'B 层 12 项仍全部 HOLD：没有真实轮椅/低视力任务、老人取得人工服务用时、真人响应、人流冲突、噪声、照明、排水、微气候、居民接受、已签排班或真实成本。4 FTE 和成本区间只是参与者敏感性，不能替代现场与签约证据。任一群体关键失败，整体 HOLD。' : 'All 12 Layer-B items remain HOLD: no real wheelchair/low-vision tasks, older-person time to human help, human response, flow conflict, noise, lighting, drainage, microclimate, resident acceptance, signed roster, or actual cost exists. Four FTE and the cost bands are participant sensitivities and cannot substitute for field or appointment evidence. Any group critical failure holds the whole unit.'
  );
  const finalImageIndex = block.lastIndexOf('\n\n![');
  if (finalImageIndex < 0) throw new Error('v1.4 final evidence image anchor missing');
  block = block.slice(0, finalImageIndex) + `\n\n${deliveryControlBlock(lang)}` + block.slice(finalImageIndex);
  return block;
}

function implementationBlockV15(lang) {
  const zh = lang === 'zh';
  let block = implementationBlockV14(lang)
    .replaceAll('V1.4_P0_IMPLEMENTATION', 'V1.5_P0_IMPLEMENTATION')
    .replace(zh ? 'v1.4 P0-ALL-STOP-01：实施控制闭环' : 'v1.4 P0-ALL-STOP-01: delivery-control closure', zh ? 'v1.5 P0-ALL-STOP-01：专业执行交接' : 'v1.5 P0-ALL-STOP-01: professional execution hand-off');
  const imageIndex = block.indexOf('\n\n![');
  const header = zh
    ? '稳定对象 ID 为 `P0-ALL-STOP-01`。v1.5 保留 v1.4 的尺寸、任务、数量、排班、成本敏感性和 fail-closed 控制，并将专业团队接手所需的调查、责任接受、D0 基线、成本、专业复核、复演维护和变更控制整理为 7 类可填写双语表单。对象仍只绑定 `P0-CAND-01` 概念筛查关系，无坐标、地块、权属、许可或放样权限；17 个角色仍未指派，正式价格与资金仍为 `null/TBC`。'
    : 'The stable object ID is `P0-ALL-STOP-01`. v1.5 retains the v1.4 dimensions, tasks, quantities, roster, cost sensitivities and fail-closed controls, then packages survey, responsibility acceptance, D0 baseline, cost, professional review, rehearsal/maintenance and change control into seven fillable bilingual forms for professional takeover. The object remains bound only to concept-screening relationship `P0-CAND-01`, with no coordinates, parcel, right, permission or set-out authority; all 17 roles remain unappointed and formal price/funding remain `null/TBC`.';
  if (imageIndex < 0) throw new Error('v1.5 implementation image anchor missing');
  block = block.slice(0, block.indexOf('\n\n', block.indexOf('\n### ')) + 2) + header + block.slice(imageIndex);
  block = block.replace(
    zh ? 'B 层 12 项仍全部 HOLD：没有真实轮椅/低视力任务、老人取得人工服务用时、真人响应、人流冲突、噪声、照明、排水、微气候、居民接受、已签排班或真实成本。4 FTE 和成本区间只是参与者敏感性，不能替代现场与签约证据。任一群体关键失败，整体 HOLD。' : 'All 12 Layer-B items remain HOLD: no real wheelchair/low-vision tasks, older-person time to human help, human response, flow conflict, noise, lighting, drainage, microclimate, resident acceptance, signed roster, or actual cost exists. Four FTE and the cost bands are participant sensitivities and cannot substitute for field or appointment evidence. Any group critical failure holds the whole unit.',
    zh ? 'B 层 12 项仍全部 HOLD，并被无损聚合为 4 个外部决策包供交接；每项原始 metric_id、数据源、阈值、责任角色和触发条件都继续保留。表单只让专业团队知道由谁、用何方法、在何时补齐什么证据，不能替代真实参与者、实测、签认、报价或许可。任一群体关键失败，整体 HOLD。' : 'All 12 Layer-B items remain HOLD and are losslessly aggregated into four external decision bundles for hand-off; every raw metric_id, source, threshold, responsible role and trigger remains intact. The forms tell a professional team who must obtain which evidence, by what method and when; they cannot substitute for real participants, measurements, signatures, quotations or permission. Any group critical failure holds the whole unit.'
  );
  const finalImageIndex = block.lastIndexOf('\n\n![');
  if (finalImageIndex < 0) throw new Error('v1.5 final evidence image anchor missing');
  block = block.slice(0, finalImageIndex) + `\n\n${professionalHandoffBlock(lang)}` + block.slice(finalImageIndex);
  return block;
}

function replaceMarked(source, start, end, block, anchor) {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end);
  if (startIndex >= 0 && endIndex >= startIndex) {
    return source.slice(0, startIndex) + block + source.slice(endIndex + end.length);
  }
  const anchorIndex = source.indexOf(anchor);
  if (anchorIndex < 0) throw new Error(`anchor not found: ${anchor}`);
  return source.slice(0, anchorIndex) + block + '\n\n' + source.slice(anchorIndex);
}

function updateProposal(rel, lang) {
  const zh = lang === 'zh';
  let source = read(rel);
  source = source.replace(/^<!-- V1\.[345]_P0_(?:SUMMARY|IMPLEMENTATION)_(?:START|END) -->\n?/gm, '');
  source = source.replace(
    zh
      ? /\n?### 30 秒 P0 (?:实施|专业交接)摘要[\s\S]*?(?=\n## 设计依据与资料清单)/
      : /\n?### 30-second P0 (?:implementation|professional hand-off) summary[\s\S]*?(?=\n## Design Basis and Source Inventory)/,
    ''
  );
  source = source.replace(
    zh
      ? /\n?### v1\.[345] P0-ALL-STOP-01[^\n]*[\s\S]*?(?=\n### 同一任务、逐组验收)/
      : /\n?### v1\.[345] P0-ALL-STOP-01[^\n]*[\s\S]*?(?=\n### Same task, group-by-group acceptance)/,
    ''
  );
  source = source.replace(/iteration: "[^"]+"/, 'iteration: "v1.5-professional-handoff"');
  source = replaceMarked(source, '<!-- V1.5_P0_SUMMARY_START -->', '<!-- V1.5_P0_SUMMARY_END -->', summaryBlockV15(lang), zh ? '## 设计依据与资料清单' : '## Design Basis and Source Inventory');
  source = replaceMarked(source, '<!-- V1.5_P0_IMPLEMENTATION_START -->', '<!-- V1.5_P0_IMPLEMENTATION_END -->', implementationBlockV15(lang), zh ? '### 同一任务、逐组验收' : '### Same task, group-by-group acceptance');
  source = source.replace(
    '[metric:p0_screening_envelope_area_sqm] [metric:p0_clear_route_width_m] [metric:p0_task_chain_count] [metric:p0_boq_line_count] [metric:p0_cost_component_count] [metric:p0_role_slot_count] [metric:p0_current_package_check_count] [metric:p0_current_package_pass_count] [metric:p0_current_package_hold_count] [metric:p0_field_check_hold_count]',
    '[metric:p0_role_slot_count] [metric:p0_current_package_check_count]'
  );
  source = source.replace(
    '[metric:p0_task_chain_count] [metric:p0_gate_default_closed_ratio] [metric:p0_route_obstruction_count] [metric:p0_malformed_input_hold_ratio]',
    `[metric:p0_task_chain_count] [metric:p0_gate_default_closed_ratio] [metric:p0_route_obstruction_count]\n\n${zh ? '错误输入测试必须保持 1/1 触发 HOLD；失败时不能用其他任务的平均结果覆盖。' : 'Malformed-input testing must remain 1/1 for triggering HOLD; failure cannot be averaged away by other task results.'} [metric:p0_malformed_input_hold_ratio]`
  );
  source = source.replace(
    '[metric:p0_cost_component_count] [metric:p0_market_price_total] [metric:p0_staffing_fte] [metric:p0_formal_total_cost]',
    `[metric:p0_cost_component_count] [metric:p0_market_price_total] [metric:p0_staffing_fte]\n\n${zh ? '正式总价保持 null，不能由概念数量反推成报价或资金承诺。' : 'The formal total remains null and cannot be inferred from concept quantities as a quotation or funding commitment.'} [metric:p0_formal_total_cost]`
  );
  source = source.replace(
    zh
      ? /\n\n合法载荷与错误拦截分项[^\n]*/g
      : /\n\nValid-payload and malformed-rejection components[^\n]*/g,
    ''
  );
  source = source.replace(
    zh
      ? /`simulation\.json` 登记 12 项固定清单的离线合成任务[\s\S]*?\[metric:simulation_task_count\] \[metric:simulation_success_rate\] \[metric:audit_completeness\](?:\n\n合法载荷与错误拦截分项[\s\S]*?\[metric:valid_dispatch_payload_schema_pass_rate\] \[metric:malformed_dispatch_rejection_rate\])?/
      : /`simulation\.json` records twelve tasks from a fixed offline synthetic list[\s\S]*?\[metric:simulation_task_count\] \[metric:simulation_success_rate\] \[metric:audit_completeness\](?:\n\nValid-payload and malformed-rejection components[\s\S]*?\[metric:valid_dispatch_payload_schema_pass_rate\] \[metric:malformed_dispatch_rejection_rate\])?/,
    zh
      ? '`simulation.json` 登记 12 项固定清单的离线合成任务，不调用在线模型、不接入真实机器人、不使用个人数据，也不代表现场绩效。v1.5 保留 v1.4 的包内读数：12/12 任务达到预登记合成结果；11/11 合法调度载荷通过 schema；1/1 预登记错误载荷被拒绝并触发完整审计 HOLD；12/12 审计记录完整；AI 关闭后的人工等价演练为 12/12。人工桌不可用时转入人工电话/文字热备，两条人工路径都不可用时数字服务同步关闭。保留指标 `tool_schema_pass_rate` 仍按仓库规则以全部 12 项为分母复算为 11/12，不代表一个未关闭的包内缺口。 [metric:simulation_task_count] [metric:simulation_success_rate] [metric:audit_completeness]\n\n合法载荷与错误拦截分项分别为 11/11 和 1/1，二者共同组成 12/12 预期行为。 [metric:valid_dispatch_payload_schema_pass_rate] [metric:malformed_dispatch_rejection_rate]'
      : '`simulation.json` records twelve tasks from a fixed offline synthetic list. It calls no online model, connects to no real robot, uses no personal data, and represents no field performance. v1.5 retains the v1.4 package readings: 12/12 tasks reached their preregistered synthetic outcome; 11/11 valid dispatch payloads passed schema; the 1/1 preregistered malformed payload was rejected and triggered a complete audited HOLD; 12/12 audit records are complete; and AI-off human-equivalent rehearsal is 12/12. An unavailable staffed desk transfers to human telephone/text hot backup, and digital service closes synchronously when both human paths are unavailable. The reserved `tool_schema_pass_rate` still recomputes to 11/12 under the repository rule that uses all twelve tasks as its denominator; this does not represent an unclosed package gap. [metric:simulation_task_count] [metric:simulation_success_rate] [metric:audit_completeness]\n\nValid-payload and malformed-rejection components are 11/11 and 1/1 respectively, together forming 12/12 expected behaviours. [metric:valid_dispatch_payload_schema_pass_rate] [metric:malformed_dispatch_rejection_rate]'
  );
  source = source.replace(
    zh ? /^\| 离线演练任务 \|.*$/m : /^\| Offline rehearsal \|.*$/m,
    zh
      ? '| 离线演练任务 | 12 项；12/12 达到预登记合成结果 | 固定任务台账，可复算；不是现场绩效 |'
      : '| Offline rehearsal | 12 tasks; 12/12 reached the preregistered synthetic outcome | Fixed, recomputable ledger; not field performance |'
  );
  source = source.replace(
    zh ? /^\| (?:调度 schema|合法载荷)[^|]*\|.*$/m : /^\| (?:Dispatch schema|Valid payload)[^|]*\|.*$/m,
    zh
      ? '| 合法载荷 / 错误拦截 / 审计 / AI-off 等价 | 11/11 / 1/1 / 12/12 / 12/12 | 全部预期行为通过；保留的 `tool_schema_pass_rate` 因按 12 项总分母计算仍为 11/12 |'
      : '| Valid payload / malformed rejection / audit / AI-off equivalent | 11/11 / 1/1 / 12/12 / 12/12 | All expected behaviours pass; reserved `tool_schema_pass_rate` remains 11/12 because its required denominator is all twelve tasks |'
  );
  source = source.replace(
    zh ? '![十二项离线演练的真实读数、失败项与设计修正]' : '![True readings, failed cases, and design corrections from the twelve-task offline rehearsal]',
    zh ? '![十二项离线演练的包内闭环、故障阻断与人工热备]' : '![Package closure, fail-closed handling, and human hot backup across the twelve-task offline rehearsal]'
  );
  source = source.replace(/^!\[[^\n]*\]\(assets\/figures\/pilot-protocol(?:\.en)?\.png\)\n+/m, '');
  source = source.replace(/v1\.0-v1\.[234]/g, 'v1.0-v1.5').replace(/v1\.0–v1\.[234]/g, 'v1.0–v1.5');
  source = source.replace(/^<!-- V1\.5_P0_(?:SUMMARY|IMPLEMENTATION)_(?:START|END) -->\n?/gm, '');
  write(rel, source);
}

function updateSpatial() {
  const file = readJson('spatial.json');
  const item = {
    id: 'p0-all-stop-01', type: 'node', title: 'P0-ALL-STOP-01 条件式全停门', title_en: 'P0-ALL-STOP-01 Conditional All-Stop Gate',
    summary: '绑定众智园安全慢速场临时重点区关系的参与者首选筛查单元；18 m x 12 m 概念包络可撤回、不可放样，包含责任、排班、成本敏感性、失败停止，以及可填写的专业执行与恢复交接，不含坐标或授权。',
    summary_en: 'Participant-preferred screening unit bound to the provisional Zhongzhiyuan safe-speed-yard relationship; a reversible, non-set-out 18 m x 12 m concept envelope with accountability, roster, cost sensitivity, failure stops, and fillable professional execution/restoration hand-off, but no coordinates or authorization.',
    source: 'visual/assets/v13-implementation.json + visual/assets/v14-delivery-control.json + visual/assets/v15-execution-kit.json + assets/media/p0-execution-workbook.md + proposal.md', public_level: 'provisional', linked_scenarios: ['ai-traffic-walkability'], order: 8,
    geometry: { mode: 'concept', label: 'P0-CAND-01 provisional key-area-bound screening relationship; no coordinates; NOT_AUTHORIZED and HOLD' }
  };
  const index = file.items.findIndex(i => i.id === item.id);
  if (index >= 0) file.items[index] = item; else file.items.push(item);
  file.summary = '表达一条概念慢线、三处可转移慢场、三座公共地标与一个绑定临时重点区关系的 P0 条件式全停门；v1.5 为 P0 增加可填写专业执行工作簿，但 P0-CAND-01 仍只作参与者首选筛查和交接，不包含坐标、红线、权属、工程线位、授权或审定指标。';
  writeJson('spatial.json', file);
}

function updateMatrices() {
  const complianceV13 = 'v1.3 以 P0-ALL-STOP-01 同源登记 1:500/1:100/1:50/1:20、12 项任务、16 行 BOQ、8 类成本和两层验收；状态保持 NOT_AUTHORIZED/HOLD，现场与价格数据不补造。';
  const depthV13 = 'v1.3 增加稳定对象 P0-ALL-STOP-01 的尺寸、接口、责任、任务、数量、成本和两层验收闭环；complete 仅表示包内表达完整，不表示现场、许可、角色或价格已取得。';
  const complianceV14 = 'v1.4 关闭包内审计与 AI-off 两项缺口，登记 17 个角色、3 个筛查候选、12 道外部门、7 个释放阶段、4 组备选、排班与非正式成本敏感性，并以确定性验证阻止假释放；现实现场、许可、报价与签约仍保持 HOLD。';
  const depthV14 = 'v1.4 将 P0 从详细概念交接推进到可机器复核的实施控制模板：包内 8/8 PASS，现场与外部门继续 fail-closed；complete 不表示已取得实施批准。';
  const complianceV15 = 'v1.5 增加 7 类双语可填写执行表单、18 个通用证据回执字段，将 12 项现场指标与 12 道外部门无损聚合为 4 个外部决策包，并补齐容量/疏散公式、4 个维护周期和 10%–20% 恢复储备模板；所有真实记录、签认、容量、成本、资金和授权仍为 0/null/HOLD。';
  const depthV15 = 'v1.5 将可机器复核的实施控制进一步整理为可由专业团队直接填写和签接的执行工作簿；表单完整不自动打开任何现场 Gate，complete 仍不表示已取得实施批准。';
  const compliance = readJson('compliance_matrix.json');
  const targetReqs = new Set(['1.5.2.3', '1.5.2.4', '1.5.3.required', '1.5.3.2', 'agent.3', 'agent.4', 'agent.6']);
  for (const req of compliance.requirements) {
    if (!targetReqs.has(req.requirement_id)) continue;
    for (const ref of ['assets/figures/key-areas.png', 'assets/figures/metrics-evidence.png', 'drawings/a3-booklet.pdf', 'drawings/a0-boards.pdf']) uniqPush(req.drawing_refs, ref);
    uniqPush(req.metric_refs, 'p0_task_chain_count');
    uniqPush(req.metric_refs, 'p0_boq_line_count');
    uniqPush(req.metric_refs, 'p0_current_package_hold_count');
    uniqPush(req.metric_refs, 'p0_external_gate_hold_count');
    uniqPush(req.metric_refs, 'p0_working_roster_fte');
    uniqPush(req.metric_refs, 'p0_execution_form_count');
    uniqPush(req.metric_refs, 'p0_external_decision_bundle_count');
    uniqPush(req.metric_refs, 'p0_capacity_egress_template_count');
    uniqPush(req.metric_refs, 'p0_maintenance_cycle_count');
    uniqPush(req.metric_refs, 'p0_restoration_reserve_template_count');
    uniqPush(req.assumption_ids, 'A-P0-DIM-001');
    uniqPush(req.assumption_ids, 'A-P0-ROLE-001');
    uniqPush(req.assumption_ids, 'A-P0-FIELD-001');
    uniqPush(req.assumption_ids, 'A-P0-OPERATIONS-001');
    uniqPush(req.assumption_ids, 'A-P0-HANDOFF-001');
    uniqPush(req.assumption_ids, 'A-P0-CAPACITY-001');
    uniqPush(req.assumption_ids, 'A-P0-MAINTENANCE-001');
    const baseSummary = (req.evidence_summary_zh || '').split(complianceV15).join('').replace(/\s{2,}/g, ' ').trim();
    req.evidence_summary_zh = `${baseSummary} ${complianceV15}`.trim();
  }
  writeJson('compliance_matrix.json', compliance);

  const depth = readJson('design_depth_matrix.json');
  const targetDepth = new Set(['traffic_rail_slow_parking', 'municipal_new_infrastructure', 'blue_green_public_space', 'three_key_area_detailed_design', 'renewal_project_list', 'phasing_implementation', 'metrics_recalculation', 'risk_missing_data']);
  for (const item of depth.items) {
    if (!targetDepth.has(item.item_id)) continue;
    for (const ref of ['assets/figures/key-areas.png', 'assets/figures/metrics-evidence.png', 'drawings/a3-booklet.pdf', 'drawings/a0-boards.pdf']) uniqPush(item.drawing_refs, ref);
    uniqPush(item.metric_refs, 'p0_screening_envelope_area_sqm');
    uniqPush(item.metric_refs, 'p0_clear_route_width_m');
    uniqPush(item.metric_refs, 'p0_task_chain_count');
    uniqPush(item.metric_refs, 'p0_boq_line_count');
    uniqPush(item.metric_refs, 'p0_field_check_hold_count');
    uniqPush(item.metric_refs, 'p0_external_gate_hold_count');
    uniqPush(item.metric_refs, 'p0_working_roster_fte');
    uniqPush(item.metric_refs, 'p0_execution_form_count');
    uniqPush(item.metric_refs, 'p0_external_decision_bundle_count');
    uniqPush(item.metric_refs, 'p0_capacity_egress_template_count');
    uniqPush(item.metric_refs, 'p0_maintenance_cycle_count');
    uniqPush(item.metric_refs, 'p0_restoration_reserve_template_count');
    uniqPush(item.assumption_ids, 'A-P0-DIM-001');
    uniqPush(item.assumption_ids, 'A-P0-SITE-001');
    uniqPush(item.assumption_ids, 'A-P0-COST-001');
    uniqPush(item.assumption_ids, 'A-P0-OPERATIONS-001');
    uniqPush(item.assumption_ids, 'A-P0-HANDOFF-001');
    uniqPush(item.assumption_ids, 'A-P0-CAPACITY-001');
    uniqPush(item.assumption_ids, 'A-P0-MAINTENANCE-001');
    const baseSummary = (item.evidence_summary_zh || '').split(depthV15).join('').replace(/\s{2,}/g, ' ').trim();
    item.evidence_summary_zh = `${baseSummary} ${depthV15}`.trim();
  }
  writeJson('design_depth_matrix.json', depth);
}

function updateAgentAndSources() {
  const agent = readJson('agent.json');
  agent.generated_with = agent.generated_with.replace(/v1\.0-v1\.[234]/, 'v1.0-v1.5');
  const v13Note = 'v1.3 added the source-controlled P0-ALL-STOP-01 dimension set, 12-task hand-off chain, non-priced quantities, parametric cost model, two-layer acceptance matrix, fixed review figures, first-screen summaries, and rebuilt bilingual PDFs while keeping roles, prices, authorization, and field data on HOLD.';
  const v14Note = 'v1.4 closed the two package-level rehearsal gaps, declared every referenced professional role, bound three provisional candidate relationships, added recomputable roster and non-formal cost sensitivities, external gate and release-stage controls, A/B fallback alternatives, an eleven-module hand-off map, and deterministic false-release verification while leaving every field, appointment, permission, quotation, and funding claim on HOLD.';
  const v15Note = 'v1.5 adds seven bilingual fillable execution forms with eighteen common evidence-receipt fields, losslessly aggregates twelve raw field metrics and twelve external gates into four external decision bundles, and adds capacity/egress, four-cycle maintenance, and restoration-reserve templates plus deterministic verification; every actual record, signatory, field result, cost, funding, and authorization remains zero/null/HOLD.';
  const baseNote = agent.generation_note.split(v15Note).join('').replace(/\s{2,}/g, ' ').trim();
  agent.generation_note = baseNote.replace(/Human account owner authorization/, `${v15Note} Human account owner authorization`);
  writeJson('agent.json', agent);

  const sources = readJson('sources.json');
  const additions = [
    { id: 'TOOL-NAPI-RS-CANVAS', title: '@napi-rs/canvas', authority_level: 'presentation_only', source_type: 'software_tool', url: 'https://github.com/Brooooooklyn/canvas', accessed_at: '2026-08-30', rights: 'MIT; used locally for deterministic bilingual raster figure and board composition', allowed_uses: ['presentation rendering'], prohibited_uses: ['site fact', 'engineering evidence', 'field performance'] },
    { id: 'TOOL-PDF-LIB', title: 'pdf-lib', authority_level: 'presentation_only', source_type: 'software_tool', url: 'https://pdf-lib.js.org/', accessed_at: '2026-08-30', rights: 'MIT; used locally to assemble rasterized bilingual review pages into PDF', allowed_uses: ['PDF assembly'], prohibited_uses: ['site fact', 'engineering evidence', 'professional sign-off'] },
    { id: 'BEIJING-URBAN-RENEWAL-IMPLEMENTATION-GUIDE-2024', title: '北京市城市更新实施方案编制工作指南（试行）', publisher: '北京市住房和城乡建设委员会', published_date: '2024-05-27', effective_date: '2024-09-10', url: 'https://www.beijing.gov.cn/zhengce/gfxwj/202405/t20240527_3694615.html', source_type: 'official_public', authority_level: 'A0', usable_for: ['eleven-module implementation-plan handoff completeness frame'], not_usable_for: ['project approval', 'site right', 'funding', 'professional sign-off', 'automatic applicability conclusion'] }
  ];
  for (const item of additions) {
    const index = sources.sources.findIndex(s => s.id === item.id);
    if (index >= 0) sources.sources[index] = item; else sources.sources.push(item);
  }
  writeJson('sources.json', sources);
}

function updateChangelogAndNarrative() {
  let changelog = read('changelog.md');
  const block = `<!-- V1.3_CHANGELOG_START -->\n## v1.3 - 2026-08-30\n\n- 在不改变“让城市跟上最慢的人 / THE SLOW LINE”概念的前提下，建立稳定对象 \`P0-ALL-STOP-01\`，状态保持 \`NOT_AUTHORIZED\`、\`HOLD\`、\`unassigned/conditional\` 与 \`null/TBC\`。\n- 新增同源 1:500 场地关系、1:100 平面、1:50 断面和 1:20 关键接口；12 项尺寸均注明概念假设、确认角色与触发条件，不冒充实测、法定最小值或专业签章。\n- 将 90 天研究窗与 G0—G5 展开为 12 项连续任务，分离执行、最终签放、立即叫停、人工接管、拆除恢复和独立证据复核。\n- 增加 16 行不计价 BOQ、8 组件参数化成本模型和敏感性变量；所有市场单价、货币、报价单位、总价、基准日与资金承诺继续为 null/TBC。\n- 建立两层验收：包内 8 项当前 6 PASS / 2 HOLD，现场 12 项全部 HOLD。审计 11/12 与 AI-off 等价 11/12 的不利读数继续阻断 G4。\n- 将尺寸、任务、Gate、BOQ、成本和验收折入固定 \`key-areas\` 与 \`metrics-evidence\` 中英图；在双语 HTML 首屏与四份 PDF 第一页加入 30 秒 P0 摘要。\n- A3 第 3/4 页改为同源原生重排：第 3 页专读任务、责任和 Gate，第 4 页专读 BOQ、成本和两层验收，消除重复整图并提升人工翻阅可读性。\n- 增加可重复构建源 \`visual/assets/v13-implementation.json\` 与脚本 \`visual/assets/build-v13.js\`，由同一数据源重建图件、正文证据、可视化与 PDF。\n<!-- V1.3_CHANGELOG_END -->`;
  changelog = replaceMarked(changelog, '<!-- V1.3_CHANGELOG_START -->', '<!-- V1.3_CHANGELOG_END -->', block, '## v1.2 - 2026-08-29');
  const v14Block = `<!-- V1.4_CHANGELOG_START -->\n## v1.4 - 2026-08-31\n\n- 关闭 v1.3 明示保留的两项包内缺口：错误载荷仍 1/1 触发已审计 HOLD，审计记录与 AI-off 人工等价均从 11/12 提升为 12/12，A 层成为 8 PASS / 0 HOLD。\n- 将全部被尺寸、接口、任务和验收引用的角色补齐为 17 个声明槽位；任务控制表为 12 项任务登记前置依赖及唯一 Accountable，并由确定性脚本检查无环和引用完整。\n- 将 P0 绑定到三个临时重点区的参与者筛查候选，首选 \`P0-CAND-01\` 众智园安全慢速场边缘关系；仍无坐标、地块、权属或放样权限。\n- 增加 8/12/18 小时排班敏感性；12 小时工作情景计算 3.129 FTE，向上取整 4 FTE，模型未覆盖时长为 0。人工桌和人工热备都不可用时，AI 必须同步关闭。\n- 增加带 2026-08-31 基准日的参与者 CAPEX ROM 与年度 OPEX 工作区间，并保持市场单价、正式估算、报价、招标价、税费和资金承诺为 0/null。\n- 增加 12 道外部门、7 个释放阶段、双钥匙控制、4 组 A/B 备选回退、6 个采购包及北京市城市更新实施方案编制指南 11 模块映射；所有外部释放继续 HOLD。\n- 新增 \`visual/assets/v14-delivery-control.json\`、\`verify-v14.js\` 与哈希绑定验证回执；验证角色引用、任务依赖、排班、成本边界、门禁、备选、双钥匙和假释放。\n<!-- V1.4_CHANGELOG_END -->`;
  changelog = replaceMarked(changelog, '<!-- V1.4_CHANGELOG_START -->', '<!-- V1.4_CHANGELOG_END -->', v14Block, '## v1.3 - 2026-08-30');
  const v15Block = `<!-- V1.5_CHANGELOG_START -->\n## v1.5 - 2026-08-31\n\n- 不增加新概念或伪造现场结果，将 v1.4 的实施控制整理为专业团队可直接接手的双语执行工作簿。\n- 新增 7 类可填写空表：候选承载体调查、责任/权限/冲突接受、D0 基线与数据字典、数量/成本/采购、专业复核与 Gate、复演/维护/叫停/退出，以及 programme/RAID/变更控制。\n- 为每份外部记录规定 18 个通用回执字段，覆盖时间地点、来源方、方法、工具、版本、缺失、限制、权利依据、利益冲突、独立复核、签署与 SHA-256；当前真实记录数仍为 0。\n- 将 12 项现场指标和 12 道外部门无损聚合成 4 个外部决策包，保留每一个原始 metric_id、Gate、阈值、责任和触发条件；当前 4/4 HOLD。\n- 新增容量/疏散计算模板：允许同时使用人数取实测净面积、消防/生命安全核定、无障碍服务位和已落实岗位覆盖的最小值；当前容量为 null，现场核实退出路径为 0。\n- 新增开放前、每周、季度/重大变更后、年度/续期前 4 个维护周期，以及“经核可拆 CAPEX × 10%–20% + 场地专项恢复等”的恢复储备模板；当前储备金额和锁定资金仍为 null/false。\n- 新增 \`assets/media/p0-execution-workbook.md\`、\`visual/assets/v15-execution-kit.json\`、\`verify-v15.js\` 与哈希绑定回执；验证表单、字段、四包覆盖、容量、维护、储备及零伪造边界。\n<!-- V1.5_CHANGELOG_END -->`;
  changelog = replaceMarked(changelog, '<!-- V1.5_CHANGELOG_START -->', '<!-- V1.5_CHANGELOG_END -->', v15Block, '## v1.4 - 2026-08-31');
  write('changelog.md', changelog);

  let narrative = read('report/narrative.md');
  narrative = narrative.replace(/更新日期：2026-08-(?:29|30)/, '更新日期：2026-08-31');
  const nblock = `<!-- V1.3_NARRATIVE_START -->\n## v1.3 P0 可实施性升级（2026-08-30）\n\n最新 96/100 复核中唯一未满分项为可实施性 4/5。本轮不增加概念、场景、Logo、人物或国际案例，只把原有非定位全停门升级为稳定对象 \`P0-ALL-STOP-01\`：12 项透明尺寸假设、四种比例关系、12 项任务、8 个未指派责任槽位、16 行不计价 BOQ、8 类参数化成本、8 项包内验收和 12 项现场验收。\n\n当前结果刻意不是“全绿”：包内路径、侵占、非 AI 覆盖、Gate 默认关闭、错误输入 HOLD 与退出流程等 6 项成立；审计完整度和 AI-off 人工等价仍为 11/12，因此 2 项 HOLD。现场轮椅/低视力任务、老人取得人工服务用时、真人响应、人流冲突、噪声、照明、排水、微气候、居民接受、排班与真实成本没有基线，12 项继续 HOLD。这个差异是本轮可实施性证据的核心，不以合成任务或虚构旅程替代现实表现。\n\n固定评审入口已改为 \`key-areas\` 的同源 P0 尺寸图与 \`metrics-evidence\` 的任务—数量—成本—验收图；视觉 HTML 首屏和 A0/A3 第一页均显示 30 秒摘要。所有派生成果由 \`visual/assets/v13-implementation.json\` 和 \`visual/assets/build-v13.js\` 重建，随后再由仓库报告渲染与四门自检收口。\n<!-- V1.3_NARRATIVE_END -->`;
  narrative = replaceMarked(narrative, '<!-- V1.3_NARRATIVE_START -->', '<!-- V1.3_NARRATIVE_END -->', nblock, '## 0. 成果阅读入口');
  const v14Narrative = `<!-- V1.4_NARRATIVE_START -->\n## v1.4 实施控制闭环（2026-08-31）\n\nv1.3 的最终复核为 96/100，唯一未满分项仍是可实施性 4/5。评审已经认可尺寸、任务、BOQ、成本公式与两层验收，但明确指出 P0 仍为非定位筛查单元，包内审计和 AI-off 等价各为 11/12，角色、排班、价格和现场基线尚未形成。v1.4 不增加品牌、场景或渲染，而只处理这一成熟度边界。\n\n本轮首先关闭两个包内 HOLD：错误输入保留 fail-closed 结果并补齐完整审计记录；人工桌不可用时切换同服务窗的人工电话/文字热备，两条人工路径都不可用则 AI 同步关闭。由此 A 层成为 8 PASS / 0 HOLD，审计与 AI-off 人工等价均为 12/12。随后补齐 17 个角色、12 项单一 Accountable 任务控制、三个筛查候选、8/12/18 小时排班、参与者 CAPEX/OPEX 工作区间、12 道外部门、7 个释放阶段、双钥匙、4 组备选回退、6 个采购包与 11 模块交接映射。\n\n这不是把现实条件涂绿：首选 \`P0-CAND-01\` 仍无坐标、权属或授权；4 FTE 和成本区间只是工作敏感性；12 项现场指标、12 道外部门和 6 个外部释放阶段继续全部 HOLD。\`verify-v14.js\` 只验证包内依赖、边界和 fail-closed 状态，不证明许可、签章、报价、资金或现场绩效。\n<!-- V1.4_NARRATIVE_END -->`;
  narrative = replaceMarked(narrative, '<!-- V1.4_NARRATIVE_START -->', '<!-- V1.4_NARRATIVE_END -->', v14Narrative, '## v1.3 P0 可实施性升级（2026-08-30）');
  const v15Narrative = `<!-- V1.5_NARRATIVE_START -->\n## v1.5 专业执行交接（2026-08-31）\n\nv1.4 的复核为 96/100，六项为 5/5，唯一未满分项仍是可实施性 4/5。与最新 100/100 参考相比，差异不再是概念、图纸数量或包内校验，而是专业团队能否在不重新解释方案的情况下直接收集、签接和复核外部证据。v1.5 因此不扩展主题，只把既有控制落成一套可填写、可哈希、可 fail-closed 的执行工作簿。\n\n工作簿包含 7 类表单与 18 个通用证据回执字段；12 项现场指标和 12 道外部门被无损聚合为 4 个外部决策包，使评审能先判断“真实使用者与同任务基线、场地容量疏散与专业复核、运营设备叫停与复演、真实成本授权与退出”四件事，同时仍可追溯到每项原始指标和 Gate。容量公式、两条概念退出路径、4 个维护周期和 10%–20% 恢复储备模板补齐了日常运营与退出期的接手条件。\n\n这轮明确不把空表当成果：当前真实外部记录、现场结果、具名签署、经核成本输入和核验容量均为 0/null；四个外部决策包继续 HOLD。\`verify-v15.js\` 只证明表单覆盖、引用完整、无重复、哈希绑定和零伪造边界，不证明任何现场事实、专业签章、资金或许可。\n<!-- V1.5_NARRATIVE_END -->`;
  narrative = replaceMarked(narrative, '<!-- V1.5_NARRATIVE_START -->', '<!-- V1.5_NARRATIVE_END -->', v15Narrative, '## v1.4 实施控制闭环（2026-08-31）');
  narrative = narrative.replace(/v1\.2 评审修复 \| 当前 PR 待复评/g, 'v1.2 评审修复 | 已完成复核').replace(/v1\.2 的结果仍以绑定新 exact head 的复评为准。/g, 'v1.2 最新复核为 96/100；本轮只处理其中可实施性 4/5。');
  write('report/narrative.md', narrative);
}

function updateManifestEntries() {
  const manifest = readJson('manifest.json');
  manifest.generated_at = '2026-08-31T00:00:00.000Z';
  manifest.validation_claim.self_checked = false;
  const entries = [
    { path: 'visual/assets/v13-implementation.json', role: 'evidence_data', required: false, language: 'neutral', sha256: null },
    { path: 'visual/assets/v14-delivery-control.json', role: 'evidence_data', required: false, language: 'neutral', sha256: null },
    { path: 'visual/assets/v14-verification.json', role: 'evidence_data', required: false, language: 'neutral', sha256: null },
    { path: 'visual/assets/verify-v14.js', role: 'verification_script', required: false, language: 'neutral', sha256: null },
    { path: 'assets/media/p0-execution-workbook.md', role: 'transcript', required: false, language: 'neutral', sha256: null },
    { path: 'visual/assets/v15-execution-kit.json', role: 'evidence_data', required: false, language: 'neutral', sha256: null },
    { path: 'visual/assets/v15-verification.json', role: 'evidence_data', required: false, language: 'neutral', sha256: null },
    { path: 'visual/assets/verify-v15.js', role: 'verification_script', required: false, language: 'neutral', sha256: null },
    { path: 'visual/assets/build-v13.js', role: 'verification_script', required: false, language: 'neutral', sha256: null }
  ];
  for (const item of entries) {
    const index = manifest.files.findIndex(f => f.path === item.path);
    if (index >= 0) manifest.files[index] = { ...manifest.files[index], ...item }; else manifest.files.push(item);
  }
  writeJson('manifest.json', manifest);
}

function updateVisualHtml(rel, lang) {
  const zh = lang === 'zh';
  let html = read(rel);
  const css = `<!-- V1.3_P0_CSS_START --><style>
    .hero{min-height:620px;height:auto!important;padding:48px 5vw!important;display:block!important;background:linear-gradient(135deg,#10283c 0%,#173a54 60%,#1f6d8f 100%)!important;}
    .hero-copy{max-width:1180px!important;margin:0 auto!important;}
    .p0-hero-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:14px;margin-top:26px;}
    .p0-hero-card{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.23);border-radius:14px;padding:18px;color:#fff;}
    .p0-hero-card h3{margin:0 0 9px;color:#f0be3e;font-size:18px;}
    .p0-hero-card p{margin:0;color:#f6f4ed;line-height:1.55;font-size:15px;}
    .p0-status{display:inline-flex;gap:9px;flex-wrap:wrap;margin-top:14px;}
    .p0-status b{padding:7px 10px;border-radius:8px;background:#ba3a35;color:#fff;font-size:13px;letter-spacing:.04em;}
    .p0-status b.neutral{background:#527f67;}
    .hero .lead{max-width:1180px;font-size:clamp(1.2rem,1.75vw,1.8rem);white-space:nowrap;}
    @media(max-width:850px){.p0-hero-grid{grid-template-columns:1fr}.hero{min-height:0}.hero .lead{white-space:normal}}
  </style><!-- V1.3_P0_CSS_END -->`;
  html = replaceMarked(html, '<!-- V1.3_P0_CSS_START -->', '<!-- V1.3_P0_CSS_END -->', css, '</head>');
  const hero = `<header class="hero">
    <div class="hero-copy">
      <div class="eyebrow">${zh ? '京张慢线 · v1.5 专业执行交接' : 'THE SLOW LINE · v1.5 PROFESSIONAL HAND-OFF'}</div>
      <h1>${zh ? '让城市跟上最慢的人' : 'Keep pace with the slowest person'}</h1>
      <p class="lead">P0-ALL-STOP-01 · ${zh ? '尺寸可核验、责任可交接、失败可停止、退出可恢复' : 'dimensioned, accountable, stoppable, restorable'}</p>
      <div class="p0-status"><b>NOT_AUTHORIZED</b><b>HOLD</b><b class="neutral">unassigned/conditional</b><b class="neutral">prices null/TBC</b></div>
      <div class="p0-hero-grid">
        <div class="p0-hero-card"><h3>${zh ? '可直接接手' : 'Ready to take over'}</h3><p>${zh ? '7 类双语空表、18 个证据回执字段，覆盖调查、D0、成本、专业复核、复演维护与变更控制。' : 'Seven bilingual blank forms and eighteen receipt fields cover survey, D0, cost, professional review, rehearsal/maintenance and change control.'}</p></div>
        <div class="p0-hero-card"><h3>${zh ? '四个外部决策' : 'Four external decisions'}</h3><p><span data-metric="p0_external_decision_bundle_hold_count" data-value="4">4/4 HOLD</span>${zh ? '；无损覆盖 12 项现场指标与 12 道外部门。容量 null，现场核实退出路径 0。' : '; losslessly covering twelve field metrics and twelve external gates. Capacity null; zero field-verified egress routes.'}</p></div>
        <div class="p0-hero-card"><h3>${zh ? '运维与退出可填写' : 'Operations and exit fillable'}</h3><p>${zh ? '4 个维护周期与 10%–20% 恢复储备模板已定义；真实记录、签认、成本、资金与授权仍为 0/null。' : 'Four maintenance cycles and a 10–20% restoration-reserve template are defined; actual records, signatures, cost, funding and authorization remain zero/null.'}</p></div>
      </div>
    </div>
  </header>`;
  html = html.replace(/<header class="hero">[\s\S]*?<\/header>/, hero);
  html = html.replace(/v1\.[234]/g, 'v1.5').replace(/2026-08-(?:29|30)/g, '2026-08-31');
  html = html.replace(/(data-metric="simulation_success_rate"\s+data-value=")[^"]+("[\s\S]*?<strong>)[^<]+(<\/strong>)/, (_match, beforeValue, beforeLabel, afterLabel) => `${beforeValue}1${beforeLabel}100%${afterLabel}`);
  html = html.replace(/(data-metric="audit_completeness"\s+data-value=")[^"]+("[\s\S]*?<strong>)[^<]+(<\/strong>)/, (_match, beforeValue, beforeLabel, afterLabel) => `${beforeValue}1${beforeLabel}100%${afterLabel}`);
  html = html.replace(
    /<div\s+class="metric"\s+data-metric="tool_schema_pass_rate"\s+data-value="0\.9166666666666666"\s*>[\s\S]*?<\/div>/,
    `<div class="metric" data-metric="tool_schema_pass_rate" data-value="0.9166666666666666" data-valid-payload-rate="1" data-malformed-rejection-rate="1"><strong>11/11 + 1/1</strong><span>${zh ? '合法载荷 + 错误拦截（保留聚合 11/12）' : 'valid payloads + malformed rejection (reserved aggregate 11/12)'}</span></div>`
  );
  html = html.replace(zh ? '<h2>失败没有被藏起来</h2>' : '<h2>Failures remain visible</h2>', zh ? '<h2>故障阻断仍然可见</h2>' : '<h2>Fail-closed handling remains visible</h2>');
  html = html.replace(
    zh ? 'alt="十二项离线演练的读数、两项失败和三项设计修正"' : 'alt="Readings, two failures, and three design corrections from twelve offline tasks"',
    zh ? 'alt="十二项离线演练的包内闭环、故障阻断与人工热备"' : 'alt="Package closure, fail-closed handling, and human hot backup across twelve offline tasks"'
  );
  const fixedSection = `<section class="alt" id="p0-fixed-evidence"><h2>${zh ? 'P0 固定评审证据' : 'P0 fixed review evidence'}</h2><p>${zh ? '同一数据链生成尺寸、任务、排班、成本、四个外部决策、容量/疏散、维护与退出模板；v15 验证器检查覆盖、哈希和假释放。人工填写入口：<a href="../assets/media/p0-execution-workbook.md">p0-execution-workbook.md</a>。' : 'One data chain generates dimensions, tasks, roster, cost, four external decisions, capacity/egress, maintenance and exit templates; the v15 verifier checks coverage, hashes and false release. Human-fillable entry: <a href="../assets/media/p0-execution-workbook.md">p0-execution-workbook.md</a>.'}</p><div class="grid2"><div class="card"><img src="../assets/figures/key-areas${zh ? '' : '.en'}.png" alt="P0 dimensioned launch unit"></div><div class="card"><img src="../assets/figures/metrics-evidence${zh ? '' : '.en'}.png" alt="P0 task quantities cost acceptance"></div></div></section>`;
  if (html.includes('id="p0-fixed-evidence"')) html = html.replace(/<section class="alt" id="p0-fixed-evidence">[\s\S]*?<\/section>/, fixedSection);
  else html = html.replace('</header>', `</header>\n${fixedSection}`);
  write(rel, html);
}

async function imageFor(rel) {
  return loadImage(path.join(ROOT, rel));
}

function fitRect(img, x, y, w, h) {
  const scale = Math.min(w / img.width, h / img.height);
  const nw = img.width * scale, nh = img.height * scale;
  return { x: x + (w - nw) / 2, y: y + (h - nh) / 2, w: nw, h: nh };
}

function drawPdfHeader(ctx, lang, pageTitle, pageNo, format) {
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = C.navy;
  ctx.fillRect(0, 0, ctx.canvas.width, 180);
  text(ctx, lang === 'zh' ? '京张慢线 / THE SLOW LINE' : 'THE SLOW LINE', 80, 35, ctx.canvas.width * 0.56, 46, C.white, true, lang, 1, 1);
  text(ctx, pageTitle, 80, 96, ctx.canvas.width * 0.72, 30, C.yellow, true, lang, 1.1, 2);
  text(ctx, `${format} · v1.5 · ${String(pageNo).padStart(2, '0')}`, ctx.canvas.width - 520, 54, 430, 24, '#dce5e8', true, lang, 1, 1);
}

function drawThirtySecond(ctx, lang, x, y, w, h) {
  rounded(ctx, x, y, w, h, 18, C.navy);
  text(ctx, lang === 'zh' ? '30 秒 P0 专业交接摘要' : '30-SECOND P0 PROFESSIONAL HAND-OFF', x + 28, y + 22, w - 56, 30, C.yellow, true, lang, 1, 1);
  text(ctx, 'P0-ALL-STOP-01 · NOT_AUTHORIZED · HOLD', x + 28, y + 66, w - 56, 23, C.white, true, lang, 1, 1);
  text(ctx, lang === 'zh' ? '7 空表｜18 回执字段｜4 外部决策 / 12 原始项 HOLD｜容量 null｜4 维护周期｜恢复储备未锁定' : '7 forms | 18 receipt fields | 4 external decisions / 12 raw HOLD | capacity null | 4 cycles | reserve unfunded', x + 28, y + 105, w - 56, 22, C.white, false, lang, 1.3, 3);
  text(ctx, lang === 'zh' ? '任一群体安全关键失败、等价缺失或无法退出 => 整体 HOLD' : 'Any group safety-critical failure, missing equivalent, or failed exit => whole unit HOLD', x + 28, y + h - 48, w - 56, 19, '#f5d2ce', true, lang, 1.1, 2);
}

async function makePdfPage(lang, spec, width, height, pageNo, format) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  drawPdfHeader(ctx, lang, spec.title, pageNo, format);
  if (spec.summary) drawThirtySecond(ctx, lang, 70, 210, width - 140, 240);
  const top = spec.summary ? 485 : 215;
  if (spec.focus === 'tasks') {
    drawA3TaskFocus(ctx, 70, top, width - 140, height - top - 80, lang);
  } else if (spec.focus === 'delivery') {
    drawA3DeliveryFocus(ctx, 70, top, width - 140, height - top - 80, lang);
  } else if (spec.images.length === 1) {
    const img = await imageFor(spec.images[0]);
    const rect = fitRect(img, 70, top, width - 140, height - top - 80);
    rounded(ctx, rect.x - 8, rect.y - 8, rect.w + 16, rect.h + 16, 16, C.white, C.light, 2);
    ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);
  } else {
    const gap = 34;
    const count = spec.images.length;
    const cols = count > 2 ? 2 : count;
    const rows = Math.ceil(count / cols);
    const cellW = (width - 140 - gap * (cols - 1)) / cols;
    const cellH = (height - top - 90 - gap * (rows - 1)) / rows;
    for (let i = 0; i < count; i++) {
      const img = await imageFor(spec.images[i]);
      const col = i % cols, row = Math.floor(i / cols);
      const rect = fitRect(img, 70 + col * (cellW + gap), top + row * (cellH + gap), cellW, cellH);
      rounded(ctx, rect.x - 7, rect.y - 7, rect.w + 14, rect.h + 14, 14, C.white, C.light, 2);
      ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);
    }
  }
  text(ctx, lang === 'zh' ? '概念建议 · 临时候选筛查关系 · 无坐标/非工程图 · 未授权 · 现实条件按 TBC/HOLD 管理' : 'Concept proposal · provisional candidate screen · no coordinates/not engineering · not authorized · real conditions TBC/HOLD', 70, height - 48, width - 140, 16, C.grey, false, lang, 1, 1);
  return canvas.encode('png');
}

async function buildPdf(lang, format) {
  const zh = lang === 'zh';
  const isA0 = format === 'A0';
  const width = isA0 ? 3370 : 1684;
  const height = isA0 ? 2384 : 1191;
  const specs = isA0 ? [
    { title: zh ? 'P0-ALL-STOP-01｜尺寸化首启单元' : 'P0-ALL-STOP-01 | DIMENSIONED LAUNCH UNIT', summary: true, images: [`assets/figures/key-areas${zh ? '' : '.en'}.png`] },
    { title: zh ? '任务链、工程量、成本与验收' : 'TASKS, QUANTITIES, COST + ACCEPTANCE', summary: false, images: [`assets/figures/metrics-evidence${zh ? '' : '.en'}.png`] },
    { title: zh ? '总体空间、场地校准与慢行系统' : 'OVERALL SPACE, SITE GROUNDING + SLOW MOBILITY', summary: false, images: [`assets/figures/site-grounding${zh ? '' : '.en'}.png`, `assets/figures/site-overview${zh ? '' : '.en'}.png`, `assets/figures/land-use-structure${zh ? '' : '.en'}.png`, `assets/figures/mobility-bluegreen${zh ? '' : '.en'}.png`] }
  ] : [
    { title: zh ? 'P0-ALL-STOP-01｜30 秒专业交接摘要' : 'P0-ALL-STOP-01 | 30-SECOND PROFESSIONAL HAND-OFF', summary: true, images: [`assets/figures/key-areas${zh ? '' : '.en'}.png`] },
    { title: zh ? 'P0 尺寸、断面与接口' : 'P0 DIMENSIONS, SECTION + INTERFACE', summary: false, images: [`assets/figures/key-areas${zh ? '' : '.en'}.png`] },
    { title: zh ? '任务、责任与六道证据门' : 'TASKS, ACCOUNTABILITY + SIX GATES', summary: false, focus: 'tasks', images: [] },
    { title: zh ? '不计价工程量、成本与两层验收' : 'NON-PRICED QUANTITIES, COST + TWO-LAYER ACCEPTANCE', summary: false, focus: 'delivery', images: [] },
    { title: zh ? '场地校准｜方位、事实、叠加分开' : 'SITE GROUNDING | ORIENTATION, FACT, OVERLAY SEPARATED', summary: false, images: [`assets/figures/site-grounding${zh ? '' : '.en'}.png`] },
    { title: zh ? '一线三慢场六全停门' : 'ONE LINE, THREE YARDS, SIX ALL-STOP GATES', summary: false, images: [`assets/figures/site-overview${zh ? '' : '.en'}.png`, `assets/figures/land-use-structure${zh ? '' : '.en'}.png`] },
    { title: zh ? '慢行、蓝绿与公共服务底线' : 'SLOW MOBILITY, BLUE-GREEN + PUBLIC-SERVICE FLOORS', summary: false, images: [`assets/figures/mobility-bluegreen${zh ? '' : '.en'}.png`] },
    { title: zh ? '离线演练｜包内闭环，错误仍阻断' : 'OFFLINE REHEARSAL | PACKAGE CLOSED, ERRORS STILL BLOCK', summary: false, images: [`assets/figures/simulation-rehearsal${zh ? '' : '.en'}.png`, `assets/figures/pilot-protocol${zh ? '' : '.en'}.png`] }
  ];
  const pdf = await PDFDocument.create();
  pdf.setTitle(zh ? '京张慢线 v1.5 P0 专业执行交接' : 'The Slow Line v1.5 P0 Professional Hand-off');
  pdf.setAuthor('Restless-One with Codex');
  pdf.setSubject('P0-ALL-STOP-01 conditional implementation evidence');
  pdf.setCreator('pdf-lib (https://github.com/Hopding/pdf-lib)');
  pdf.setProducer('pdf-lib (https://github.com/Hopding/pdf-lib)');
  const fixedPdfDate = new Date('2026-08-31T00:00:00Z');
  pdf.setCreationDate(fixedPdfDate);
  pdf.setModificationDate(fixedPdfDate);
  for (let i = 0; i < specs.length; i++) {
    const png = await makePdfPage(lang, specs[i], width, height, i + 1, format);
    const embedded = await pdf.embedPng(png);
    const pageWidth = isA0 ? 3370.39 : 1190.55;
    const pageHeight = isA0 ? 2383.94 : 841.89;
    const page = pdf.addPage([pageWidth, pageHeight]);
    page.drawImage(embedded, { x: 0, y: 0, width: pageWidth, height: pageHeight });
  }
  const name = isA0 ? 'a0-boards' : 'a3-booklet';
  const out = path.join(DRAWINGS, `${name}${zh ? '' : '.en'}.pdf`);
  fs.writeFileSync(out, await pdf.save({ useObjectStreams: false }));
}

async function main() {
  if (process.argv.includes('--font-only')) {
    restoreEmbeddedFonts();
    process.stdout.write(JSON.stringify({ ok: true, outputs: ['report/visual HTML font coverage zh/en'] }, null, 2) + '\n');
    return;
  }
  loadBuildDependencies();
  execFileSync(process.execPath, [path.join(__dirname, 'verify-v15.js')], { stdio: ['ignore', 'ignore', 'inherit'] });
  updateAssumptions();
  updateMetrics();
  updateProposal('proposal.md', 'zh');
  updateProposal('proposal.en.md', 'en');
  updateSpatial();
  updateMatrices();
  updateAgentAndSources();
  updateChangelogAndNarrative();
  await buildKeyFigure('zh');
  await buildKeyFigure('en');
  await buildMetricsFigure('zh');
  await buildMetricsFigure('en');
  await buildSimulationFigure('zh');
  await buildSimulationFigure('en');
  updateVisualHtml('visual/index.html', 'zh');
  updateVisualHtml('visual/index.en.html', 'en');
  restoreEmbeddedFonts();
  await buildPdf('zh', 'A0');
  await buildPdf('en', 'A0');
  await buildPdf('zh', 'A3');
  await buildPdf('en', 'A3');
  updateManifestEntries();
  process.stdout.write(JSON.stringify({ ok: true, version: KIT.package_version, object_id: DATA.object_id, outputs: ['v15 professional-handoff verification', 'key-areas zh/en', 'metrics-evidence zh/en', 'visual index zh/en', 'A0 zh/en', 'A3 zh/en'] }, null, 2) + '\n');
}

main().catch(error => {
  console.error(error.stack || String(error));
  process.exit(1);
});
