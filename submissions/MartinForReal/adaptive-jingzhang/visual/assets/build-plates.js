#!/usr/bin/env node
'use strict';

/**
 * build-plates.js
 *
 * Builds the fifteen semantic key-area plates as thirty rasters - each plate
 * rendered once in Chinese and once, separately, in English - into
 * assets/figures/key-area-<slug>-<nn>-<concept>[.en].png, and writes the
 * thirty-record plate registry visual/assets/area-plates.json.
 *
 *   15 semantic plates = 3 key areas x 5 concepts
 *   30 artifacts       = each plate as a Chinese base raster and a separate
 *                        English twin. The two are different files with
 *                        different rendered language, never one bilingual
 *                        image.
 *
 * Concepts (visual/assets/key-area-contract.js is the single source of truth)
 *   01 situation-claim-limits        what is and is not claimed
 *   02 program-flows                 the dominant spatial plan
 *   03 reversible-module-sections    two keyed sections with dimension bases
 *   04 access-operations-seasons     step-free chain, operating modes, seasons
 *   05 governance-stop-evidence      phase 1 envelope, thresholds, stop rules
 *
 * Content source (single source of truth): visual/assets/key-area-design.json
 * Provisional extent (ZZY and AIO only):   geometry/key_areas.geojson
 * Text rendering:                          visual/assets/noto-sans-sc-subset.js
 *
 * PROV-KEY-003 (Dazhongsi, prefix DZS) is georeferenced=false. Its five plates
 * are not-to-scale, non-georeferenced topologies: no map, no polygon, no north
 * arrow, no scale bar, no coordinate, no distance and no positive station
 * relationship of any kind. Every Dazhongsi plate carries the registered
 * Issue #1029 disclosure in its own language.
 *
 * Determinism
 *   No timestamps, no random values, no locale-dependent collation, no
 *   filesystem ordering. Every object iteration is over an explicitly ordered
 *   key list. Rasterisation is integer 4x4 supersampled coverage. Running the
 *   builder twice produces byte-identical PNGs.
 *
 * Usage
 *   node visual/assets/build-plates.js            write PNGs + registry
 *   node visual/assets/build-plates.js --check    re-render in memory, compare,
 *                                                 write nothing, exit non-zero
 *                                                 on any difference
 * Both modes print one JSON object to stdout.
 *
 * Glyph coverage
 *   The font subset is a snapshot taken before the current design record was
 *   written and genuinely lacks glyphs for code points that record uses. Every
 *   string is passed through SUBSTITUTIONS (a meaning-preserving, fully
 *   disclosed Chinese rephrasing table, also emitted into area-plates.json) and
 *   then through assertGlyphs(). If any character still has no glyph the build
 *   throws before a single byte is written, so no plate can ship a .notdef box.
 *   The two registered Dazhongsi disclosure sentences are asserted to pass
 *   through the table unchanged.
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const F = require('./noto-sans-sc-subset.js');
const contract = require('./key-area-contract.js');

const {
  AREAS: CONTRACT_AREAS, CONCEPTS, REQUIRED_STATUS, A0_RANK,
  DZS_DISCLOSURE_ZH, DZS_DISCLOSURE_EN, expectedArtifacts,
} = contract;

const ASSET_DIR = __dirname;
const PKG_ROOT = path.resolve(ASSET_DIR, '..', '..');
const SRC_PATH = path.join(ASSET_DIR, 'key-area-design.json');
const GEO_PATH = path.join(PKG_ROOT, 'geometry', 'key_areas.geojson');
const REGISTRY_PATH = path.join(ASSET_DIR, 'area-plates.json');
const OUT_DIR = path.join(PKG_ROOT, 'assets', 'figures');
const OUT_PREFIX = 'key-area-';

// ---------------------------------------------------------------------------
// 1. Canvas geometry and palette
// ---------------------------------------------------------------------------

/**
 * The plates are laid out in a 2000 x 1400 design space and rendered into a
 * 1800 x 1200 raster. The scale is uniform, so nothing is stretched: the design
 * space is padded horizontally to 2100 x 1400, which is exactly 3:2, and then
 * reduced by 1200/1400.
 *
 * The output aspect is load-bearing rather than cosmetic. build-drawings.js
 * sizes every A0 plate box from the declared area_fraction and the raster's own
 * aspect ratio, and throws when the two rows will not fit the board; 3:2 sits in
 * the middle of the window that solves.
 */
const OUT_W = 1800;
const OUT_H = 1200;
const W = 2000;               // design space width
const H = 1400;               // design space height
const S = OUT_H / H;          // 6/7, uniform
const PAD_X = (OUT_W / S - W) / 2;   // 50 design units on each side

const TX = (x) => (x + PAD_X) * S;
const TY = (y) => y * S;

// Full-bleed extents for the header and footer bands, in design units.
const BLEED_X = -PAD_X - 4;
const BLEED_W = W + 2 * PAD_X + 8;

const M = 64;                 // outer margin
const HEAD_H = 184;           // dark header band
const FOOT_Y = 1206;          // top of footer band
const BODY_Y = 214;           // top of the drawing body
const BODY_B = 1190;          // bottom of the drawing body
const CW = W - 2 * M;         // content width = 1872
const RIGHT = W - M;          // 1936

const INK = [22, 31, 40];
const PAPER = [255, 255, 255];
const PANEL = [243, 243, 241];
const PANEL2 = [233, 234, 232];
const RULE = [203, 208, 212];
const MUTED = [113, 124, 134];
const DIM = [155, 164, 172];
const WHITE = [255, 255, 255];
const HEADTEXT = [186, 196, 205];
const WARN = [176, 58, 46];
const WARN_SOFT = [250, 232, 229];
const GOOD = [42, 118, 88];
const GOOD_SOFT = [226, 240, 234];

const ACCENT = {
  ZZY: [61, 106, 153],
  AIO: [15, 124, 116],
  DZS: [201, 84, 62],
};
const ACCENT_SOFT = {
  ZZY: [226, 234, 242],
  AIO: [220, 238, 236],
  DZS: [249, 230, 225],
};

// ---------------------------------------------------------------------------
// 2. Chinese rephrasing for code points absent from the font subset
// ---------------------------------------------------------------------------

/**
 * Each rule is a synonym substitution that preserves the meaning of the source
 * sentence. The table is reproduced in area-plates.json so that every deviation
 * from key-area-design.json is visible to a reader of the package. Order
 * matters: longer patterns first.
 */
const SUBSTITUTIONS = [
  ['可搬移护栏', '可移动屏障'],
  ['地面不打孔', '不穿透地面'],
  ['开放的那条。', '开放的一条路径。'],
  ['带靠背休息位', '带背部支撑休息位'],
  ['条纹方向', '导向条方向'],
  ['走维护通道', '经维护通道'],
  ['可请求的', '按需提供的'],
  ['摩擦条件', '地面条件'],
  ['外摆座椅', '户外座椅'],
  ['机械连接', '可拆连接'],
  ['广告牌', '展示牌'],
  ['携带设备', '自备设备'],
  ['可搬移', '可移动'],
  ['护栏', '屏障'],
  ['栏杆', '屏障'],
  ['按钮', '按键'],
  ['张贴到', '公示于'],
  ['张贴', '公示'],
  ['旁路', '绕行路'],
  ['旁边', '边上'],
  ['缩短', '变短'],
  ['遮蔽', '遮盖'],
  ['遮挡', '遮盖'],
  ['改善', '改进'],
  ['倒过来', '反过来'],
  ['还不能', '尚不能'],
  ['还能', '仍能'],
  ['挡风', '防风'],
  ['围挡', '围板'],
  ['救援', '救护'],
  ['横切', '剖切'],
  ['横坡', '侧向坡度'],
  ['纵切', '沿线剖切'],
  ['试验舱', '试验间'],
  ['可走', '可通行'],
  ['净宽', '通行宽度'],
  ['净高', '通行高度'],
  ['净空', '通行空间'],
  ['车辆', '车'],
  ['抉择', '决定'],
  ['卫生间', '厕所'],
  ['堆放', '放置'],
  ['摆放', '放置'],
  ['外摆', '户外设置'],
  ['端头', '端部'],
  ['破坏', '损坏'],
  ['自己', '本身'],
  ['房屋', '建筑'],
  ['堵塞', '阻断'],
  ['波动', '变化'],
  ['减少', '降低'],
  ['一旦', '如果'],
  ['起伏', '高低变化'],
  ['凡属', '属于'],
  ['违规', '不合规'],
  ['支腿', '支撑件'],
  ['垃圾', '废物'],
  ['截断', '中断'],
  ['加印', '增发'],
  ['陪同', '一同'],
  ['靠背', '背部支撑'],
  ['卸货', '装卸'],
  ['滴水', '排水'],
  ['敷设', '铺设'],
];

function T(s) {
  let out = String(s === undefined || s === null ? '' : s);
  for (const [from, to] of SUBSTITUTIONS) out = out.split(from).join(to);
  return out;
}

/**
 * The code points that actually forced each rule above, derived at run time
 * from the font itself rather than hard-coded, and reported in area-plates.json.
 */
const MISSING_GLYPH_CODEPOINTS = (function () {
  const found = new Map();
  for (const rule of SUBSTITUTIONS) {
    for (const ch of rule[0]) {
      if (!F.hasGlyph(ch, 'regular') || !F.hasGlyph(ch, 'bold')) {
        found.set(ch.codePointAt(0), ch);
      }
    }
  }
  return Array.from(found.keys()).sort((a, b) => a - b).map((cp) => ({
    code_point: 'U+' + cp.toString(16).toUpperCase().padStart(4, '0'),
    character: found.get(cp),
  }));
})();

// The disclosure is quoted verbatim on five plates and in ten registry records.
// A rephrasing rule that silently edited it would turn a registered sentence
// into an approximation of one.
for (const sentence of [DZS_DISCLOSURE_ZH, DZS_DISCLOSURE_EN]) {
  if (T(sentence) !== sentence) {
    throw new Error('build-plates: a substitution rule rewrites the registered Dazhongsi disclosure');
  }
}

// ---------------------------------------------------------------------------
// 3. Glyph guard - nothing may reach the raster without a real glyph
// ---------------------------------------------------------------------------

const MISSING_CP = new Map();
let NOTDEF_DRAWN = 0;

function assertGlyphs(text_, weight) {
  const s = String(text_);
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    if (cp < 0x20) continue;
    if (!F.hasGlyph(ch, weight)) {
      MISSING_CP.set(cp, ch);
      NOTDEF_DRAWN++;
    }
  }
}

function flushGlyphGuard() {
  if (MISSING_CP.size === 0) return;
  const list = Array.from(MISSING_CP.keys()).sort((a, b) => a - b)
    .map((cp) => 'U+' + cp.toString(16).toUpperCase().padStart(4, '0') +
      ' ' + MISSING_CP.get(cp));
  throw new Error('build-plates: the font subset has no glyph for ' +
    MISSING_CP.size + ' code point(s): ' + list.join(', ') +
    '. Refusing to render a .notdef box.');
}

// ---------------------------------------------------------------------------
// 4. Raster primitives (integer 4x4 supersampled coverage, deterministic)
// ---------------------------------------------------------------------------

function blend(data, o, color, cov) {
  if (cov <= 0) return;
  if (cov >= 16) {
    data[o] = color[0];
    data[o + 1] = color[1];
    data[o + 2] = color[2];
    return;
  }
  const inv = 16 - cov;
  data[o] = (data[o] * inv + color[0] * cov + 8) >> 4;
  data[o + 1] = (data[o + 1] * inv + color[1] * cov + 8) >> 4;
  data[o + 2] = (data[o + 2] * inv + color[2] * cov + 8) >> 4;
}

function fillRect(sf, x, y, w, h, color, alpha) {
  const a = alpha === undefined ? 1 : alpha;
  const cov = Math.round(Math.max(0, Math.min(1, a)) * 16);
  if (cov <= 0) return;
  let x0 = Math.round(TX(x));
  let y0 = Math.round(TY(y));
  let x1 = Math.round(TX(x + w));
  let y1 = Math.round(TY(y + h));
  // A hairline rule is a drawing decision, not a rounding artefact: reducing to
  // 6/7 must never make a declared 1 px rule disappear.
  if (w > 0 && x1 === x0) x1 = x0 + 1;
  if (h > 0 && y1 === y0) y1 = y0 + 1;
  if (x0 > x1) { const t = x0; x0 = x1; x1 = t; }
  if (y0 > y1) { const t = y0; y0 = y1; y1 = t; }
  if (x0 < 0) x0 = 0;
  if (y0 < 0) y0 = 0;
  if (x1 > sf.width) x1 = sf.width;
  if (y1 > sf.height) y1 = sf.height;
  const d = sf.data;
  for (let py = y0; py < y1; py++) {
    let o = (py * sf.width + x0) * 3;
    for (let px = x0; px < x1; px++, o += 3) blend(d, o, color, cov);
  }
}

/** pts: flat [x0,y0,x1,y1,...] in design space; non-zero winding, 4x4 supersampled. */
function fillPoly(sf, ptsIn, color, alpha) {
  const n = ptsIn.length >> 1;
  if (n < 3) return;
  const pts = new Array(ptsIn.length);
  for (let i = 0; i < n; i++) {
    pts[i * 2] = TX(ptsIn[i * 2]);
    pts[i * 2 + 1] = TY(ptsIn[i * 2 + 1]);
  }
  const a = alpha === undefined ? 1 : alpha;

  if (a <= 0) return;

  let minX = Infinity; let maxX = -Infinity;
  let minY = Infinity; let maxY = -Infinity;
  for (let i = 0; i < n; i++) {
    const x = pts[i * 2];
    const y = pts[i * 2 + 1];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  let bx0 = Math.max(0, Math.floor(minX));
  let bx1 = Math.min(sf.width, Math.ceil(maxX) + 1);
  let by0 = Math.max(0, Math.floor(minY));
  let by1 = Math.min(sf.height, Math.ceil(maxY) + 1);
  if (bx1 <= bx0 || by1 <= by0) return;

  const bw = bx1 - bx0;
  const bh = by1 - by0;
  const subCols = bw * 4;
  const cover = new Uint8Array(bw * bh);
  const diff = new Int32Array(subCols + 2);
  const xs = [];
  const dirs = [];

  for (let row = 0; row < bh; row++) {
    diff.fill(0);
    let any = false;
    for (let s = 0; s < 4; s++) {
      const sy = by0 + row + (s + 0.5) / 4;
      xs.length = 0;
      dirs.length = 0;
      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        const y0 = pts[i * 2 + 1];
        const y1 = pts[j * 2 + 1];
        if (y0 === y1) continue;
        if ((sy >= y0 && sy < y1) || (sy >= y1 && sy < y0)) {
          const x0 = pts[i * 2];
          const x1 = pts[j * 2];
          xs.push(x0 + ((sy - y0) * (x1 - x0)) / (y1 - y0));
          dirs.push(y1 > y0 ? 1 : -1);
        }
      }
      if (xs.length < 2) continue;
      const idx = xs.map((v, i2) => i2);
      idx.sort((p, q) => (xs[p] - xs[q]) || (p - q));
      let wind = 0;
      for (let k = 0; k < idx.length - 1; k++) {
        wind += dirs[idx[k]];
        if (wind === 0) continue;
        const xa = xs[idx[k]];
        const xb = xs[idx[k + 1]];
        let ca = Math.round((xa - bx0) * 4);
        let cb = Math.round((xb - bx0) * 4);
        if (cb <= ca) continue;
        if (ca < 0) ca = 0;
        if (cb > subCols) cb = subCols;
        if (cb <= ca) continue;
        diff[ca] += 1;
        diff[cb] -= 1;
        any = true;
      }
    }
    if (!any) continue;
    // `diff` holds the union of all four sub-rows, so the running value is the
    // number of sub-rows covering this sub-column (0..4). Adding it gives the
    // full 16-sample coverage per pixel; adding 1 would cap every fill at 25%.
    let run = 0;
    const base = row * bw;
    for (let c = 0; c < subCols; c++) {
      run += diff[c];
      if (run > 0) cover[base + (c >> 2)] += run > 4 ? 4 : run;
    }
  }

  const d = sf.data;
  const scale = a;
  for (let row = 0; row < bh; row++) {
    const py = by0 + row;
    let o = (py * sf.width + bx0) * 3;
    const base = row * bw;
    for (let col = 0; col < bw; col++, o += 3) {
      const c = cover[base + col];
      if (c === 0) continue;
      blend(d, o, color, Math.round(Math.min(16, c) * scale));
    }
  }
}

function circlePts(cx, cy, r, segments) {
  const n = segments || 72;
  const out = new Array(n * 2);
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    out[i * 2] = cx + r * Math.cos(t);
    out[i * 2 + 1] = cy + r * Math.sin(t);
  }
  return out;
}

function ringPts(cx, cy, rOuter, rInner, segments) {
  const n = segments || 96;
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    out.push(cx + rOuter * Math.cos(t), cy + rOuter * Math.sin(t));
  }
  for (let i = n - 1; i >= 0; i--) {
    const t = (i / n) * Math.PI * 2;
    out.push(cx + rInner * Math.cos(t), cy + rInner * Math.sin(t));
  }
  return out;
}

function roundRectPts(x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  const seg = 10;
  const out = [];
  const corner = (cx, cy, a0) => {
    for (let i = 0; i <= seg; i++) {
      const t = a0 + (i / seg) * (Math.PI / 2);
      out.push(cx + rr * Math.cos(t), cy + rr * Math.sin(t));
    }
  };
  corner(x + w - rr, y + rr, -Math.PI / 2);
  corner(x + w - rr, y + h - rr, 0);
  corner(x + rr, y + h - rr, Math.PI / 2);
  corner(x + rr, y + rr, Math.PI);
  return out;
}

function fillRound(sf, x, y, w, h, r, color, alpha) {
  fillPoly(sf, roundRectPts(x, y, w, h, r), color, alpha);
}

function strokeRound(sf, x, y, w, h, r, t, color) {
  const outer = roundRectPts(x, y, w, h, r);
  const inner = roundRectPts(x + t, y + t, w - 2 * t, h - 2 * t, Math.max(0, r - t));
  const rev = [];
  for (let i = (inner.length >> 1) - 1; i >= 0; i--) rev.push(inner[i * 2], inner[i * 2 + 1]);
  fillPoly(sf, outer.concat(rev), color);
}

function strokeRect(sf, x, y, w, h, t, color) {
  fillRect(sf, x, y, w, t, color);
  fillRect(sf, x, y + h - t, w, t, color);
  fillRect(sf, x, y + t, t, h - 2 * t, color);
  fillRect(sf, x + w - t, y + t, t, h - 2 * t, color);
}

function segment(sf, x0, y0, x1, y1, t, color) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return;
  const nx = (-dy / len) * (t / 2);
  const ny = (dx / len) * (t / 2);
  fillPoly(sf, [
    x0 + nx, y0 + ny, x1 + nx, y1 + ny, x1 - nx, y1 - ny, x0 - nx, y0 - ny,
  ], color);
}

function polyline(sf, pts, t, color) {
  for (let i = 0; i + 3 < pts.length; i += 2) {
    segment(sf, pts[i], pts[i + 1], pts[i + 2], pts[i + 3], t, color);
    if (i + 5 < pts.length) fillPoly(sf, circlePts(pts[i + 2], pts[i + 3], t / 2, 20), color);
  }
}

/** Dashed horizontal rule; deterministic phase from x0. */
function dashRow(sf, x0, x1, y, t, color, dash, gap) {
  const d = dash || 10;
  const g = gap || 8;
  for (let x = x0; x < x1; x += d + g) {
    fillRect(sf, x, y, Math.min(d, x1 - x), t, color);
  }
}

/** Dashed line in any direction; deterministic phase from the start point. */
function dashLine(sf, x0, y0, x1, y1, t, color, dash, gap) {
  const d = dash || 13;
  const g = gap || 8;
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return;
  const ux = dx / len;
  const uy = dy / len;
  for (let s = 0; s < len; s += d + g) {
    const e = Math.min(s + d, len);
    segment(sf, x0 + ux * s, y0 + uy * s, x0 + ux * e, y0 + uy * e, t, color);
  }
}

/** Dash-dot line: the drawing convention this package reserves for emergency. */
function dashDotLine(sf, x0, y0, x1, y1, t, color) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return;
  const ux = dx / len;
  const uy = dy / len;
  const period = 40;
  for (let s = 0; s < len; s += period) {
    const a = Math.min(s + 22, len);
    segment(sf, x0 + ux * s, y0 + uy * s, x0 + ux * a, y0 + uy * a, t, color);
    const b = s + 30;
    if (b < len) fillPoly(sf, circlePts(x0 + ux * b, y0 + uy * b, t * 0.7, 14), color);
  }
}

/** Dotted line: the convention reserved for maintenance access. */
function dotLine(sf, x0, y0, x1, y1, t, color) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return;
  const ux = dx / len;
  const uy = dy / len;
  for (let s = 0; s <= len; s += 13) {
    fillPoly(sf, circlePts(x0 + ux * s, y0 + uy * s, t * 0.75, 14), color);
  }
}

/** 45-degree hatch clipped to the rectangle; slope 1 makes the clip exact. */
function hatch(sf, x, y, w, h, color, step, t) {
  const s = step || 16;
  for (let o = -Math.ceil(h / s) * s; o < w; o += s) {
    let x0 = x + o;
    let y0 = y;
    let x1 = x + o + h;
    let y1 = y + h;
    if (x0 < x) { y0 += (x - x0); x0 = x; }
    if (x1 > x + w) { y1 -= (x1 - (x + w)); x1 = x + w; }
    if (x1 <= x0) continue;
    segment(sf, x0, y0, x1, y1, t || 1, color);
  }
}

/** Deterministic stipple, the convention reserved for snow storage. */
function stipple(sf, x, y, w, h, color) {
  for (let py = y + 5; py < y + h - 1; py += 11) {
    for (let px = x + 5; px < x + w - 1; px += 11) {
      fillRect(sf, px, py, 3, 3, color);
    }
  }
}

function arrowHead(sf, x, y, dirX, dirY, size, color) {
  const len = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
  const ux = dirX / len;
  const uy = dirY / len;
  const px = -uy;
  const py = ux;
  fillPoly(sf, [
    x, y,
    x - ux * size + px * size * 0.55, y - uy * size + py * size * 0.55,
    x - ux * size - px * size * 0.55, y - uy * size - py * size * 0.55,
  ], color);
}

function arrow(sf, x0, y0, x1, y1, t, color, head) {
  const hs = head || 16;
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const sx = x1 - (dx / len) * hs * 0.86;
  const sy = y1 - (dy / len) * hs * 0.86;
  segment(sf, x0, y0, sx, sy, t, color);
  arrowHead(sf, x1, y1, dx, dy, hs, color);
}

// ---------------------------------------------------------------------------
// 5. Text primitives
// ---------------------------------------------------------------------------

function text(sf, s, x, y, o) {
  const opt = o || {};
  const weight = opt.weight || 'regular';
  const str = T(s);
  assertGlyphs(str, weight);
  return F.drawText(sf, str, TX(x), TY(y), {
    size: (opt.size || 18) * S,
    weight,
    color: opt.color || INK,
    align: opt.align || 'left',
    letterSpacing: (opt.ls || 0) * S,
  });
}

function widthOf(s, size, weight, ls) {
  return F.measureText(T(s), { size, weight: weight || 'regular', letterSpacing: ls || 0 }).width;
}

/**
 * Draws `s` inside the box (x,y,w,h), shrinking the type size until every line
 * fits. Throws when even the minimum size overflows, so a clipped plate can
 * never be written.
 */
function para(sf, s, x, y, w, h, o) {
  const opt = o || {};
  const weight = opt.weight || 'regular';
  const color = opt.color || INK;
  const lh = opt.lh || 1.5;
  const align = opt.align || 'left';
  const max = opt.size || 20;
  const min = opt.min || Math.max(11, Math.round(max * 0.6));
  const str = T(s);
  for (let sz = max; sz >= min; sz--) {
    const lines = F.wrapText(str, { maxWidth: w, size: sz, weight });
    const lineH = Math.round(sz * lh);
    const total = (lines.length - 1) * lineH + Math.round(sz * 1.14);
    let over = false;
    for (const ln of lines) {
      if (F.measureText(ln, { size: sz, weight }).width > w + 0.5) { over = true; break; }
    }
    if (over || total > h) continue;
    if (opt.measureOnly) return { height: total, size: sz, lines: lines.length };
    const ax = align === 'center' ? x + w / 2 : (align === 'right' ? x + w : x);
    for (let i = 0; i < lines.length; i++) {
      assertGlyphs(lines[i], weight);
      F.drawText(sf, lines[i], TX(ax), TY(y + Math.round(sz * 0.92) + i * lineH), {
        size: sz * S, weight, color, align,
      });
    }
    return { height: total, size: sz, lines: lines.length };
  }
  throw new Error('build-plates: text does not fit in ' + Math.round(w) + 'x' +
    Math.round(h) + ' at sizes ' + min + '..' + max + ': "' + str.slice(0, 42) + '"');
}

/** Single line, shrunk until it fits `w`. Never truncates. */
function line(sf, s, x, y, w, o) {
  const opt = o || {};
  const weight = opt.weight || 'regular';
  const max = opt.size || 20;
  const min = opt.min || Math.max(9, Math.round(max * 0.5));
  const str = T(s);
  for (let sz = max; sz >= min; sz--) {
    if (F.measureText(str, { size: sz, weight, letterSpacing: opt.ls || 0 }).width <= w) {
      return text(sf, str, x, y, { size: sz, weight, color: opt.color, align: opt.align, ls: opt.ls });
    }
  }
  throw new Error('build-plates: line does not fit in ' + Math.round(w) +
    'px at sizes ' + min + '..' + max + ': "' + str.slice(0, 42) + '"');
}

/** Small filled label chip with centred text. */
function chip(sf, x, y, w, h, label, fill, fg, size) {
  fillRound(sf, x, y, w, h, Math.min(h / 2, 8), fill);
  line(sf, label, x + w / 2, y + h / 2 + Math.round((size || 17) * 0.34), w - 16, {
    size: size || 17, weight: 'bold', color: fg, align: 'center',
  });
}

/** Auto-width chip; returns the width it consumed. */
// Every call site passes the label first. The parameters used to be declared
// (sf, x, y, label), so the gate id landed in the x slot and a coordinate in the
// label slot; the geometry then went non-numeric and the tag drew nothing at all,
// silently dropping the blocking gates and the element tags from the plates.
function tag(sf, label, x, y, fill, fg, size) {
  const s = size || 14;
  const w = Math.round(widthOf(label, s, 'bold', 0)) + 18;
  const h = Math.round(s * 1.72);
  fillRound(sf, x, y, w, h, 5, fill);
  text(sf, label, x + 9, y + Math.round(h * 0.5 + s * 0.36), { size: s, weight: 'bold', color: fg });
  return w;
}

// ---------------------------------------------------------------------------
// 6. Panels
// ---------------------------------------------------------------------------

function panel(sf, x, y, w, h, fill) {
  fillRound(sf, x, y, w, h, 10, fill || PANEL);
  strokeRound(sf, x, y, w, h, 10, 1, RULE);
}

/**
 * Panel with a coloured title bar. Returns the inner content box.
 */
function titled(sf, x, y, w, h, label, barFill, barText, barH) {
  const bh = barH || 40;
  panel(sf, x, y, w, h, WHITE);
  fillPoly(sf, roundRectPts(x, y, w, bh + 10, 10), barFill);
  fillRect(sf, x, y + bh - 10, w, 10, barFill);
  line(sf, label, x + 16, y + Math.round(bh * 0.5) + 7, w - 32, {
    size: 19, weight: 'bold', color: barText,
  });
  return { x: x + 16, y: y + bh + 12, w: w - 32, h: h - bh - 26 };
}

// ---------------------------------------------------------------------------
// 7. Geometry op sink
// ---------------------------------------------------------------------------

/**
 * Every semantic drawing act appends one op here. Text is never recorded, so
 * the Chinese and English rasters of one plate must produce byte-identical op
 * streams; the build asserts that and hashes the stream into
 * geometry_fingerprint, which is a pair-invariant field.
 */
let GOPS = null;

function gop() {
  if (!GOPS) return;
  const parts = [];
  for (let i = 0; i < arguments.length; i++) {
    const v = arguments[i];
    parts.push(typeof v === 'number' ? String(Math.round(v * 100) / 100) : String(v));
  }
  GOPS.push(parts.join(' '));
}

// ---------------------------------------------------------------------------
// 8. Source data
// ---------------------------------------------------------------------------

const DESIGN = JSON.parse(fs.readFileSync(SRC_PATH, 'utf8'));
const GEO = JSON.parse(fs.readFileSync(GEO_PATH, 'utf8'));

const DESIGN_BY_FEATURE = new Map(DESIGN.areas.map((a) => [a.area_feature_id, a]));
const GEO_BY_ID = new Map(GEO.features.map((f) => [f.properties.id, f]));

const PLATE_AREAS = CONTRACT_AREAS.map((area, index) => {
  const design = DESIGN_BY_FEATURE.get(area.area_feature_id);
  if (!design) {
    throw new Error('build-plates: key-area-design.json declares no ' + area.area_feature_id);
  }
  return Object.assign({}, area, {
    index,
    design,
    feature: GEO_BY_ID.get(area.area_feature_id) || null,
  });
});

function L(o, base, lang) {
  if (!o) return '';
  const v = o[base + '_' + lang];
  return v === undefined || v === null ? '' : String(v);
}

// ---------------------------------------------------------------------------
// 9. Interface strings
// ---------------------------------------------------------------------------

const UI = {
  zh: {
    condition: '成图条件',
    claims: '本图主张的内容',
    notclaims: '本图不主张的内容',
    status: '状态声明',
    extent: '临时工作范围（矩形示意）',
    voidpos: '落位主张：无效',
    plan: '有条件地面平面',
    topo: '不按比例的次序拓扑',
    legend: '图例',
    assertion: '分离断言',
    notclaimed: '不主张的内容',
    topoclaims: '拓扑声明',
    routes: '五条动线分别绘制',
    cutkeys: '剖切位置（见 02 平面）',
    dims: '尺寸、依据与状态',
    pending: '待定',
    chain: '无障碍链路：七个节点、六个段落',
    equivalents: '非数字等效渠道',
    modes: '七种运行状态',
    seasons: '八个季节与运行议题',
    snow: '融雪暂存位',
    envelope: '第一期可逆范围',
    blocked: '阻断条件',
    thresholds: '阈值：尚无获批值',
    stop: '停止条件与试点边界',
    evidence: '证据',
    limits: '主张边界',
    artifact: '成果',
    yes: '是',
    no: '否',
    nullv: '空（null）',
    basis: '依据',
    value: '数值',
    unit: '单位',
    approved: '获批阈值',
    pilotstart: '允许开始试点',
    proposed: '建议目标',
    days: '试点天数',
    yearround: '足以支撑全年结论',
    entersct: '公众观察进入受控试验场',
    dependsct: '公众观察以受控试验场为条件',
    nottoscale: '不按比例',
    scalebar: '比例尺',
    northarrow: '指北针',
    assignment: '落位指定',
    quadrant: '象限',
    excluded: '排除的证据类别',
    consequence: '证据后果',
    clearof: '避让',
    overlapsfree: '与无障碍链路重叠',
    overlapstac: '与导向条重叠',
    node: '节点',
    segment: '段落',
    clearwidth: '通行宽度',
    gradient: '坡度',
    crossfall: '侧向坡度',
    routeavail: '动线可用性',
    stopaction: '停止动作',
    provided: '提供方式',
    modules: '可逆构件',
    routesof: '动线',
    sectionsof: '剖面',
    chainof: '无障碍链路',
    fontnote: '字体：Noto Sans SC 子集（SIL OFL 1.1）',
    langtag: '中文版',
    positions: '四个位置（次序，不是方位）',
    order: '次序链',
  },
  en: {
    condition: 'Conditions under which this drawing holds',
    claims: 'What this drawing claims',
    notclaims: 'What this drawing does not claim',
    status: 'Declared status',
    extent: 'Provisional working extent (rectangle, indicative)',
    voidpos: 'Positional claim: void',
    plan: 'Conditional ground plan',
    topo: 'Not-to-scale order topology',
    legend: 'Legend',
    assertion: 'Separation assertion',
    notclaimed: 'Not claimed',
    topoclaims: 'Topology declarations',
    routes: 'Five routes, each drawn separately',
    cutkeys: 'Cut keys (see plate 02)',
    dims: 'Dimensions, basis and status',
    pending: 'pending',
    chain: 'Step-free chain: seven nodes, six segments',
    equivalents: 'Non-digital equivalents',
    modes: 'Seven operating modes',
    seasons: 'Eight seasonal and operating topics',
    snow: 'Snow storage',
    envelope: 'Phase 1 reversible envelope',
    blocked: 'Blocking conditions',
    thresholds: 'Thresholds: none approved',
    stop: 'Stop conditions and pilot limits',
    evidence: 'Evidence',
    limits: 'Claim limits',
    artifact: 'Artifact',
    yes: 'yes',
    no: 'no',
    nullv: 'null',
    basis: 'basis',
    value: 'value',
    unit: 'unit',
    approved: 'approved threshold',
    pilotstart: 'pilot start allowed',
    proposed: 'proposed target',
    days: 'pilot days',
    yearround: 'sufficient for year-round conclusions',
    entersct: 'public observation enters the controlled test field',
    dependsct: 'public observation depends on the controlled test field',
    nottoscale: 'not to scale',
    scalebar: 'scale bar',
    northarrow: 'north arrow',
    assignment: 'position assignment',
    quadrant: 'quadrant',
    excluded: 'Excluded evidence categories',
    consequence: 'Evidence consequence',
    clearof: 'kept clear of',
    overlapsfree: 'overlaps the step-free chain',
    overlapstac: 'overlaps the guidance strip',
    node: 'node',
    segment: 'segment',
    clearwidth: 'clear width',
    gradient: 'gradient',
    crossfall: 'crossfall',
    routeavail: 'Route availability',
    stopaction: 'Stop action',
    provided: 'Provided as',
    modules: 'Reversible components',
    routesof: 'Routes',
    sectionsof: 'Sections',
    chainof: 'Step-free chain',
    fontnote: 'Type: Noto Sans SC subset (SIL OFL 1.1)',
    langtag: 'English edition',
    positions: 'Four positions (an order, not a bearing)',
    order: 'order chain',
  },
};

const STATUS_LABEL = {
  zh: {
    verified: '已核验', accessibility_gate: '无障碍关卡', survey: '测量',
    professional_audit: '专业审核', authorization_state: '授权状态', funding_state: '资金状态',
  },
  en: {
    verified: 'verified', accessibility_gate: 'accessibility gate', survey: 'survey',
    professional_audit: 'professional audit', authorization_state: 'authorization',
    funding_state: 'funding',
  },
};

const STATUS_VALUE = {
  zh: {
    false: '否', 'G5:pending': 'G5 待定', pending: '待定',
    not_authorized: '未获授权', unfunded: '无资金',
  },
  en: {
    false: 'no', 'G5:pending': 'G5 pending', pending: 'pending',
    not_authorized: 'not authorized', unfunded: 'unfunded',
  },
};

// A section dimension carries one of two bases and no third; anything else has no label
// here on purpose, so an inadmissible basis prints its raw token in the table rather than
// being dressed up in Chinese or English as if it were a recognised kind.
const BASIS_LABEL = {
  zh: {
    proposed_module: '建议模数', pending: '待定',
  },
  en: {
    proposed_module: 'proposed module', pending: 'pending',
  },
};

const NOT_CLAIMED_LABEL = {
  zh: {
    campus_gates: '园区门禁', boundaries: '界线', access_controls: '通行控制',
    ownership: '权属', rights_of_way: '通行权', parcels: '地块',
    existing_ground_floor_space: '既有底层空间',
  },
  en: {
    campus_gates: 'campus entry control', boundaries: 'boundaries',
    access_controls: 'access controls', ownership: 'ownership',
    rights_of_way: 'rights of way', parcels: 'land divisions',
    existing_ground_floor_space: 'existing lower-level space',
  },
};

const EQUIV_LABEL = {
  zh: {
    tactile: '触感导向', visual_contrast: '明度对比', audio: '语音说明',
    staffed: '人工代办', paper: '纸质材料', telephone: '电话渠道',
  },
  en: {
    tactile: 'tactile', visual_contrast: 'visual contrast', audio: 'spoken',
    staffed: 'staffed', paper: 'paper', telephone: 'telephone',
  },
};

const MODE_LABEL = {
  zh: {
    day: '白天', night: '夜间', event: '活动', snow: '降雪', maintenance: '维护',
    power_failure: '断电', digital_failure: '数字系统失效',
  },
  en: {
    day: 'day', night: 'night', event: 'event', snow: 'snow', maintenance: 'maintenance',
    power_failure: 'power failure', digital_failure: 'digital failure',
  },
};

const TOPIC_LABEL = {
  zh: {
    drainage_ice: '排水与结冰', shelter: '遮盖', sun_wind: '日照与风',
    night_noise: '夜间与噪声', cleaning_waste: '保洁与废物', service_access: '服务车接近',
    equipment_power_failure: '设备与断电', removal_restoration: '撤除与恢复',
  },
  en: {
    drainage_ice: 'drainage and ice', shelter: 'shelter', sun_wind: 'sun and wind',
    night_noise: 'night and noise', cleaning_waste: 'cleaning and waste',
    service_access: 'service access', equipment_power_failure: 'equipment and power failure',
    removal_restoration: 'removal and restoration',
  },
};

const EXCLUDED_LABEL = {
  zh: { buildings: '建筑存量', phasing: '分期', station_position: '车站落位' },
  en: { buildings: 'building stock', phasing: 'phasing', station_position: 'station position' },
};

const DZS_POSITION_LABEL = {
  zh: { arrive: '到达位', transfer: '换乘位', stay: '停留位', repair: '维修位' },
  en: { arrive: 'arrive', transfer: 'transfer', stay: 'stay', repair: 'repair' },
};

// ---------------------------------------------------------------------------
// 10. Authored plate prose
// ---------------------------------------------------------------------------

/**
 * Titles, alt text, extended descriptions and claim limits, one entry per
 * semantic plate. The Chinese and English strings of a pair are written
 * separately: they are the only fields the registry allows to differ, and a
 * reviewer reading one language never sees the other.
 *
 * Dazhongsi claim_limits is the registered Issue #1029 disclosure verbatim and
 * nothing else, so the forbidden-term sweep exempts it as a registered
 * sentence rather than having to parse around it.
 */
const PROSE = {
  'ZZY-01': {
    title_zh: '众智园 · 本图主张与不主张的范围',
    title_en: 'Zhongzhiyuan - what this drawing claims and what it does not',
    alt_zh: '两列对照图：一列列出众智园平面所主张的构件、动线、剖面与链路，另一列列出不主张的边界、权属、控制指标与工程可行性，下部为六项状态声明与临时工作范围的矩形示意。',
    alt_en: 'A two-column comparison: the left column lists what the Zhongzhiyuan plan claims - components, routes, sections and the step-free chain - and the right column lists what it does not claim, with six declared status rows and an indicative rectangle of the provisional working extent below.',
    ext_zh: '本图是众智园五张图纸的入口。它先说明这套图的底图是临时工作范围而非官方边界，再把主张与不主张分列并置，使读者在读平面之前就知道哪些内容有依据、哪些内容只是提案本身的提议。六项状态全部为未核验、未授权、无资金，图上不出现任何指北针或比例尺。',
    ext_en: 'This plate is the entrance to the five Zhongzhiyuan drawings. It states first that the base is a provisional working extent and not an official boundary, then sets what is claimed beside what is not, so that a reader meets the plan already knowing which lines carry evidence and which are only what the proposal itself puts forward. All six status rows read unverified, unauthorized and unfunded, and no north arrow or scale bar appears anywhere on the sheet.',
    lim_zh: '本图不主张官方边界、坐标、面积、权属、控制指标或工程可行性。矩形范围来自本包几何，精度声明为 provisional_rough；官方多边形发布后全部坐标与面积作废重绘。',
    lim_en: 'This drawing claims no official boundary, coordinate, area, tenure, control indicator or engineering feasibility. The rectangle comes from the package geometry at declared precision provisional_rough; when the official polygon is published every coordinate and area is voided and redrawn.',
  },
  'ZZY-02': {
    title_zh: '众智园 · 有条件地面平面与五条分绘动线',
    title_en: 'Zhongzhiyuan - conditional ground plan with five separately drawn routes',
    alt_zh: '有条件地面平面：一侧为闭合的公众观察环线，中部为加密分隔带，另一侧为带斜线填充的受控试验场及其独立入口面；上部为物流干线，下部为应急通道，外侧为维护点线。平面下部另有五个小图，把五条动线逐条单独画出。',
    alt_en: 'A conditional ground plan: a closed public observation loop on the left, a stippled separation zone in the middle, and a hatched controlled test field on the right with its own entry face; a logistics spine along the top, an emergency route along the bottom and a dotted maintenance route down the right edge. Five small diagrams beneath the plan draw each of the five routes on its own.',
    ext_zh: '这是众智园的主图。公众观察环线是一条闭合线，既不进入受控试验场，也不以其为通过条件：试验场停用时环线仍然完整。分隔带被明确画成一条不属于任何一方的加密带，两侧没有共用的边或门槛。维护点线始终在试验场之外，从外侧到达每一个模块面。下方五个小图把五条动线逐条抽出，使"分别绘制"是可核对的事实而不是说明文字。',
    ext_en: 'This is the dominant Zhongzhiyuan drawing. The public observation loop is a closed line that neither enters the controlled test field nor passes through it as a condition of use: when the field is suspended the loop is still complete. The separation zone is drawn as a stippled band belonging to neither side, with no shared edge and no shared threshold. The maintenance route stays outside the field throughout and reaches every module face from the outside. The five small diagrams below extract each route on its own, so that "drawn separately" is a checkable fact rather than a caption.',
    lim_zh: '构图关系可核对，尺寸与坐标不可核对。平面落在临时工作范围之上，不是官方边界内的设计；场地高差、现状铺装与既有设施均未测量。',
    lim_en: 'The compositional relationships are checkable; the dimensions and coordinates are not. The plan sits over the provisional working extent and is not a design inside an official boundary; ground levels, existing paving and existing installations are unsurveyed.',
  },
  'ZZY-03': {
    title_zh: '众智园 · 可逆模块剖面 A 与 B',
    title_en: 'Zhongzhiyuan - reversible module sections A and B',
    alt_zh: '两张剖面并列：剖面 A 显示公众观察廊与受控试验间之间的分隔带与各自到达面，剖面 B 沿物流脊线显示装卸面、维护接近与应急回车位。每张剖面上有四个编号尺寸，待定尺寸画成虚线并标注待定，下方表格逐条列出数值、单位、依据类型与状态。',
    alt_en: 'Two sections side by side: Section A shows the separation zone between the public observation gallery and the controlled test enclosure with the independent arrival face each one has, and Section B runs along the logistics spine through the loading face, maintenance access and the emergency turning bay. Four keyed dimensions sit on each section, the pending ones drawn as broken lines marked pending, and a table below lists value, unit, basis type and status for every one.',
    ext_zh: '剖面的作用是把"可逆"变成可以检查的做法。八个尺寸中只有四个有数字，且全部标注为建议模数；另外四个分别等待场地测量、官方边界与专业审核，没有数字，图上画成虚线尺寸并写明待定，绝不给出一个看起来像测量结果的数。这样，读者可以判断哪些数字是提案的选择，哪些是尚未获得的事实。',
    ext_en: 'The sections exist to turn "reversible" into something a reader can check. Of the eight dimensions only four carry a number, and every one of those is labelled a proposed module; the other four wait on a site survey, on the official boundary or on a professional audit, carry no number at all, are drawn as broken dimension lines and are written as pending, so that nothing on the sheet can be mistaken for a measurement. A reader can therefore separate the proposal choices from the facts it does not yet have.',
    lim_zh: '剖面为示意做法，不是施工图。待定尺寸不得被引用为设计值，已给出的数值全部是建议模数，未经测量、未经专业审核，也未取得任何批准。',
    lim_en: 'The sections are indicative build-ups, not construction drawings. A pending dimension may not be quoted as a design value, and the numbers that are given are proposed modules: unsurveyed, unaudited and unapproved.',
  },
  'ZZY-04': {
    title_zh: '众智园 · 无障碍链路、运行状态与季节',
    title_en: 'Zhongzhiyuan - step-free chain, operating modes and seasons',
    alt_zh: '上部为无障碍链路：七个节点与六个段落连成一条线，每段标注通行宽度，坡度与侧向坡度标为待定。中部为六种非数字等效渠道与七种运行状态。下部为八个季节与运行议题，以及融雪暂存位面板，声明暂存位不与链路或导向条重叠。',
    alt_en: 'The upper band is the step-free chain: seven nodes joined by six segments, each segment annotated with its clear width while gradient and crossfall are marked pending. The middle bands carry six non-digital equivalents and seven operating modes. The lower band holds eight seasonal and operating topics and a snow storage panel declaring that storage overlaps neither the chain nor the guidance strip.',
    ext_zh: '无障碍不是一处坡道，而是一条从到达到离场都不中断的链路。本图把链路画成七个节点与六个段落，逐段标注通行宽度，并把坡度与侧向坡度留白为待定，因为地面高差尚未测量。七种运行状态说明夜间、活动、降雪、维护、断电与数字系统失效时哪些路径仍然可用，以及何时必须停止；六种非数字等效渠道保证不使用任何设备的人也能完成全部环节。',
    ext_en: 'Step-free access is not a ramp somewhere; it is a chain that does not break between arrival and exit. This plate draws it as seven nodes and six segments, annotates the clear width of every segment, and leaves gradient and crossfall as pending because the ground has not been surveyed. Seven operating modes state which routes remain available at night, during an event, in snow, under maintenance, on power failure and on digital failure, and when the area must instead close; six non-digital equivalents ensure that a visitor using no device can still complete every step.',
    lim_zh: '链路为建议路径，尚未核验，无障碍关卡 G5 仍为待定，坡度与侧向坡度未测量。九十天试点不足以支撑全年结论。',
    lim_en: 'The chain is a proposed route: unverified, with accessibility gate G5 still pending and gradient and crossfall unsurveyed. A ninety-day pilot cannot support a year-round conclusion.',
  },
  'ZZY-05': {
    title_zh: '众智园 · 治理、停止条件与证据',
    title_en: 'Zhongzhiyuan - governance, stop conditions and evidence',
    alt_zh: '上部为三张状态卡片：授权状态未获授权、资金状态无资金、允许开始试点为否，另一侧列出三项阻断条件。中部为第一期可逆范围的四段说明：范围、拆除、恢复与责任。下部为两张阈值卡片，获批阈值均为空，以及停止条件与证据面板。',
    alt_en: 'Three state cards across the top read authorization not authorized, funding unfunded and pilot start allowed no, with three blocking conditions listed beside them. The middle band carries the four statements of the phase 1 reversible envelope: extent, removal, restoration and liability. Two threshold cards below show an approved threshold of null on each, next to a stop-condition and evidence panel.',
    ext_zh: '这张图记录的是本提案尚不能做什么。第一期只投放可拆装构件，全部以可拆连接固定，可按相反顺序拆卸整体运离；但恢复能力尚未由任何一方确认，拆除、运离与恢复的剩余责任也尚无承担主体。两项阈值都只有建议目标，获批阈值为空，允许开始试点为否。三项阻断条件在解除之前，本片区不得开工。',
    ext_en: 'This plate records what the proposal is not yet allowed to do. Phase 1 places only demountable components, every one mechanically fixed so it can be taken apart in reverse order and carried away whole; but restoration capacity has been confirmed by nobody, and residual liability for dismantling, removal and reinstatement has no holder. Both thresholds carry a proposed target only: the approved threshold is null and pilot start allowed is no. Until the three blocking conditions are lifted, no work may begin here.',
    lim_zh: '本图不主张授权、资金、责任主体或工程可行性，也不主张任何阈值已获批准。所列阻断条件为提案自设的停止条件，不是审批意见。',
    lim_en: 'This drawing claims no authorization, no funding, no liability holder and no engineering feasibility, and claims that no threshold has been approved. The blocking conditions listed are stop conditions the proposal sets for itself, not a determination by any authority.',
  },

  'AIO-01': {
    title_zh: 'AI 原点社区 · 本图主张与不主张的范围',
    title_en: 'AI Origin Community - what this drawing claims and what it does not',
    alt_zh: '两列对照图：一列列出 AI 原点社区平面所主张的公地、服务位、沿街面与慢行缝，另一列以七个标签列出明确不主张的园区门禁、界线、通行控制、权属、通行权、地块与既有底层空间，下部为六项状态声明与临时工作范围的矩形示意。',
    alt_en: 'A two-column comparison: the left column lists what the AI Origin Community plan claims - the commons, the service positions, the frontages and the slow seam - and the right column carries seven labels naming what is expressly not claimed: campus entry control, boundaries, access controls, ownership, rights of way, land divisions and existing lower-level space, with six declared status rows and an indicative extent rectangle below.',
    ext_zh: '这个片区的困难在于：它提出的内容大多落在他方的地面上。因此本图先把七项不主张的内容单独列成标签：门禁、界线、通行控制、权属、通行权、地块与既有底层空间，全部不绘制也不推断。慢行缝之所以在平面上标注为"有条件"，正是因为它能否成立取决于这七项之中的任何一项。',
    ext_en: 'The difficulty in this area is that almost everything it wants to do would sit on ground belonging to somebody else. So this plate first sets out, as seven separate labels, what it does not claim: campus entry control, boundaries, access controls, ownership, rights of way, land divisions and existing lower-level space - none drawn, none inferred. The slow seam is annotated conditional on the plan precisely because whether it can exist at all depends on any one of those seven unknowns.',
    lim_zh: '本图不绘制也不推断园区门禁、界线、通行控制、权属、通行权、地块与既有底层空间。矩形范围来自本包几何，精度声明为 provisional_rough。',
    lim_en: 'This drawing neither draws nor infers campus entry control, boundaries, access controls, ownership, rights of way, land divisions or existing lower-level space. The rectangle comes from the package geometry at declared precision provisional_rough.',
  },
  'AIO-02': {
    title_zh: 'AI 原点社区 · 有条件地面平面与五条分绘动线',
    title_en: 'AI Origin Community - conditional ground plan with five separately drawn routes',
    alt_zh: '有条件地面平面：中部为不设围合线、以四个角标示意的模型发布公地，可从三面到达；一侧为有人值守与非数字两个日常服务位；上部为安静沿街面，下部为照护沿街面，外侧为可负担沿街面并划分为小开间；一条虚线慢行缝标注为有条件。平面下部另有五个小图，把五条动线逐条单独画出。',
    alt_en: 'A conditional ground plan: at the centre the model release commons, drawn with corner brackets and no enclosing line, reachable from three sides; on the left the staffed and the non-digital daily service positions; a quiet frontage along the top, a care frontage along the bottom and an affordable frontage of small subdividable bays down the right edge; a broken slow seam annotated conditional. Five small diagrams beneath the plan draw each of the five routes on its own.',
    ext_zh: '发布公地被画成没有围合线的开放图形，因为围合线就是一种通行控制的主张，而本片区不主张通行控制。有人值守服务位与非数字服务位分别绘制，保证不使用任何设备的人有完整的一条办理路径。三条沿街面各自承担照护、安静与可负担三种要求，并在图上分别标注。慢行缝画成虚线并加"有条件"标签，只画在方案本身创造的地面上。',
    ext_en: 'The release commons is drawn as an open figure with no enclosing line, because an enclosing line is itself a claim about access control, and this area claims none. The staffed service position and the non-digital service position are drawn separately, so that a resident using no device still has a complete path through every step. The three frontages carry the care, quiet and affordable requirements and are annotated separately. The slow seam is broken-lined and tagged conditional, and is drawn only across ground the proposal itself creates.',
    lim_zh: '平面只落位方案本身提出的构件与关系。慢行缝为有条件构件，其成立取决于未知的权属与通行条件；本图不因绘制而主张其可行。',
    lim_en: 'The plan places only the components and relationships this proposal puts forward. The slow seam is a conditional component whose existence depends on unknown tenure and access conditions; drawing it does not claim that it can be delivered.',
  },
  'AIO-03': {
    title_zh: 'AI 原点社区 · 可逆构件剖面 A 与 B',
    title_en: 'AI Origin Community - reversible component sections A and B',
    alt_zh: '两张剖面并列：剖面 A 剖过发布公地、值守服务位与照护沿街面，剖面 B 沿慢行缝剖过安静沿街面与冬季避风位。每张剖面上有四个编号尺寸，待定尺寸画成虚线并标注待定，下方表格逐条列出数值、单位、依据类型与状态。',
    alt_en: 'Two sections side by side: Section A cuts across the release commons, the staffed service position and the care frontage, and Section B runs along the slow seam through the quiet frontage and the winter shelter position. Four keyed dimensions sit on each section, the pending ones drawn as broken lines marked pending, and a table below lists value, unit, basis type and status for every one.',
    ext_zh: '两个与既有沿街面有关的尺寸没有数字：既有沿街面通行高度与公地和沿街面之间的现状高差，都必须实地测量后才能确定。安静沿街面的声学退距同样留白，等待专业审核；临时工作范围的南北向跨度等待官方边界。给出数字的四个尺寸全部是 2.4 米与 3.6 米一类的建议模数，标注清楚以免被读作现状。',
    ext_en: 'Two dimensions that touch the existing frontage carry no number: the existing frontage clear height and the existing level difference between the commons and the frontage both have to be measured on site. The acoustic setback of the quiet frontage is likewise left open, pending professional audit, and the north-south span of the provisional working extent waits on the official boundary. The four dimensions that do carry a number are proposed modules of the 2.4 m and 3.6 m family, and are labelled as such so they cannot be read as existing conditions.',
    lim_zh: '剖面不表达既有建筑做法、结构或权属。待定尺寸不得被引用为设计值；慢行缝相关尺寸另附条件状态。',
    lim_en: 'The sections express no existing construction, structure or tenure. A pending dimension may not be quoted as a design value, and the slow seam dimension additionally carries a conditional status.',
  },
  'AIO-04': {
    title_zh: 'AI 原点社区 · 无障碍链路、运行状态与季节',
    title_en: 'AI Origin Community - step-free chain, operating modes and seasons',
    alt_zh: '上部为 AI 原点社区的无障碍链路：七个节点与六个段落连成一条线，沿公地边缘与三条沿街面通过，每段标注通行宽度，坡度与侧向坡度标为待定。中部为六种非数字等效渠道与七种运行状态，其中数字系统失效一项声明全链路不关闭。下部为八个季节与运行议题，以及融雪暂存位面板，声明暂存位不与链路或导向条重叠。',
    alt_en: 'The upper band is the AI Origin Community step-free chain: seven nodes joined by six segments running along the edge of the commons and past three frontages, each annotated with its clear width while gradient and crossfall are marked pending. The middle bands carry six non-digital equivalents and seven operating modes, the digital-failure card declaring that no part of the chain closes. The lower band holds eight seasonal and operating topics and a snow storage panel declaring that storage overlaps neither the chain nor the guidance strip.',
    ext_zh: '这个片区的链路穿过公地边缘与三条沿街面，因此段落的通行宽度必须在户外座椅、展示牌与临时展位之间保住。运行状态里有一条对本片区特别重要：数字系统失效时全链路不得关闭，非数字渠道全程可用，否则这个以 AI 原点为名的片区就会把最需要它的人排除在外。',
    ext_en: 'This chain runs along the edge of the commons and past three frontages, so the clear width of each segment has to survive outdoor seating, display boards and temporary stands. One operating mode matters here more than anywhere else: on digital failure no part of the chain may close and the non-digital channels stay available throughout, because an area named for the origin of AI must not be the one that shuts out the people who need it most.',
    lim_zh: '链路为建议路径，尚未核验，无障碍关卡 G5 仍为待定。沿街面的实际可用宽度取决于未知的既有条件，本图不主张其可得。',
    lim_en: 'The chain is a proposed route: unverified, with accessibility gate G5 still pending. The usable width actually available along the frontages depends on unknown existing conditions, and this drawing does not claim it can be obtained.',
  },
  'AIO-05': {
    title_zh: 'AI 原点社区 · 治理、停止条件与证据',
    title_en: 'AI Origin Community - governance, stop conditions and evidence',
    alt_zh: '上部为三张状态卡片：授权状态未获授权、资金状态无资金、允许开始试点为否，另一侧列出 D02、D06、D11 三项阻断条件。中部为 AI 原点社区第一期可逆范围的四段说明：范围、拆除、恢复与责任。下部为两张阈值卡片，分别针对非数字渠道全年可用率与冬季沿街通行宽度保持率，获批阈值均为空，另一侧为停止条件与证据面板。',
    alt_en: 'Three state cards across the top read authorization not authorized, funding unfunded and pilot start allowed no, with blocking conditions D02, D06 and D11 listed beside them. The middle band carries the four statements of the AI Origin Community phase 1 reversible envelope: extent, removal, restoration and liability. Two threshold cards below address the year-round availability of the non-digital channels and the retention of clear width along the winter frontage, each with an approved threshold of null, next to a stop-condition and evidence panel.',
    ext_zh: '本片区的第一期完全落在可逆范围之内，但它的阻断条件与众智园不同：这里的关键未知是权属与通行条件，而不是受控试验的安全边界。两项阈值分别针对非数字渠道的全年可用率与冬季沿街链路的通行宽度保持率，都只有建议目标，没有获批值，也不允许据此开始试点。',
    ext_en: 'Phase 1 here sits entirely inside the reversible envelope, but its blocking conditions differ from Zhongzhiyuan: the decisive unknowns are tenure and access conditions rather than the safety limits of a controlled test. The two thresholds address the year-round availability of the non-digital channels and the retention of clear width along the winter frontage chain; each carries a proposed target only, no approved value, and neither permits a pilot to start.',
    lim_zh: '本图不主张授权、资金、责任主体、权属或通行权。可逆范围的恢复能力尚未由任何一方确认。',
    lim_en: 'This drawing claims no authorization, no funding, no liability holder, no tenure and no right of way. Restoration capacity for the reversible envelope has been confirmed by nobody.',
  },

  'DZS-01': {
    title_zh: '大钟寺 · 不主张落位的图：主张边界与 Issue #1029 披露',
    title_en: 'Dazhongsi - a drawing that claims no position: claim limits and the Issue #1029 disclosure',
    alt_zh: '两列对照图：一列列出本片区主张的模块、次序与链路，另一列以大字标注落位主张为无效，并列出三类被排除的证据——建筑存量、分期与车站落位，各附排除理由。下部为六项状态声明与 Issue #1029 披露面板。图上没有底图、多边形、指北针或比例尺。',
    alt_en: 'A two-column comparison: the left column lists what this area claims - modules, an order and a step-free chain - and the right column states in large type that the positional claim is void, listing three excluded categories of evidence: building stock, phasing and station position, each with its reason. Six declared status rows and the Issue #1029 disclosure panel sit below. There is no base map, no polygon, no north arrow and no scale bar.',
    ext_zh: '本片区没有官方几何，Issue #1029 记录的质疑偏差约为 2.26 公里。在这种情况下，任何让图纸更易读的做法——一条参照线、一处方位、一个距离——同时也会变成一个关于位置的主张。因此这一组图纸把落位主张整体声明为无效，并主动排除三类本可引用的证据，说明排除理由，使读者能判断这不是遗漏而是判断。',
    ext_en: 'This area has no official geometry, and Issue #1029 records a questioned discrepancy of about 2.26 km. In that situation every convenience that would make the drawing easier to read - a reference line, a bearing, a distance - would also make it a claim about where things are. So this set declares the positional claim void as a whole, and expressly excludes three categories of evidence it could otherwise have borrowed, giving the reason for each, so that a reader can tell this is a judgement rather than an omission.',
    lim_zh: DZS_DISCLOSURE_ZH,
    lim_en: DZS_DISCLOSURE_EN,
  },
  'DZS-02': {
    title_zh: '大钟寺 · 不按比例的四象限次序拓扑与五条分绘连线',
    title_en: 'Dazhongsi - not-to-scale four-quadrant order topology with five separately drawn lines',
    alt_zh: '不按比例的拓扑图：一个十字把画面分成四个象限，每个象限内有一个环形标记，依次为到达位、换乘位、停留位与维修位，指向线按到达、换乘、停留、维修的次序相连。自行车停放模块与自行车维修模块画在维修位边上，值守模块在换乘位边上，遮盖模块在停留位边上，融雪暂存位另置一角。顶部说明带声明不按比例、无比例尺、无指北针，四个位置的落位均为待测量指定。下部五个小图把五条连线逐条单独画出。',
    alt_en: 'A not-to-scale topology: a cross divides the sheet into four quadrants, each holding one circular token - arrive, transfer, stay and repair - joined by arrows in that order. The cycle parking module and the cycle repair module sit beside the repair token, the staffed module beside the transfer token, the shelter module beside the stay token, and the snow storage bay in a corner of its own. A banner across the top declares not to scale, no scale bar and no north arrow, and records that all four positions are to be assigned by survey. Five small diagrams below draw each of the five lines on its own.',
    ext_zh: '象限在这里是次序，不是方位。四个位置的相对次序——先到达，再换乘，然后停留，最后维修——是这套图纸能主张的全部内容；它们与任何实际地点、方向或距离都没有关系，落位状态一律记为 to_be_assigned_by_survey。图上没有底图、没有多边形、没有比例尺、没有指北针，也没有任何一条线声称本身对应现场的某一条。自行车停放与维修被单独画出，因为它们是本片区最不该被省略的日常内容。',
    ext_en: 'A quadrant here is an order, not a bearing. The relative order of the four positions - arrive, then transfer, then stay, then repair - is the whole of what this set is able to claim; it corresponds to no actual place, direction or distance, and every position is recorded as to_be_assigned_by_survey. There is no base map, no polygon, no scale bar, no north arrow and no line that claims to correspond to anything on the ground. Cycle parking and cycle repair are drawn as their own modules because they are the everyday content this area can least afford to leave out.',
    lim_zh: DZS_DISCLOSURE_ZH,
    lim_en: DZS_DISCLOSURE_EN,
  },
  'DZS-03': {
    title_zh: '大钟寺 · 可逆模块剖面 A 与 B',
    title_en: 'Dazhongsi - reversible module sections A and B',
    alt_zh: '两张剖面并列，均为不按比例的模块做法示意，不含任何场地参照。每张剖面上有四个编号尺寸，待定尺寸画成虚线并标注待定，下方表格逐条列出数值、单位、依据类型与状态。',
    alt_en: 'Two sections side by side, both not-to-scale indicative module build-ups carrying no site reference of any kind. Four keyed dimensions sit on each section, the pending ones drawn as broken lines marked pending, and a table below lists value, unit, basis type and status for every one.',
    ext_zh: '这两张剖面只表达模块本身：座位高度、背部支撑、遮盖面的覆盖范围与排水位置、自行车维修位所需的通行空间。需要参照现场才能确定的量，一律留白为待定。剖面上没有地面标高、没有既有做法，也没有任何一处与周边环境的相对关系，因为这种关系本片区无权主张。',
    ext_en: 'These two sections express the modules and nothing else: seat height and back support, the extent of the shelter surface and where water runs off it, and the clear space a cycle repair position needs. Any quantity that would require a site reference to fix is left open as pending. No datum, no existing build-up and no relationship to a surrounding condition appears, because this area has no standing to claim such a relationship.',
    lim_zh: DZS_DISCLOSURE_ZH,
    lim_en: DZS_DISCLOSURE_EN,
  },
  'DZS-04': {
    title_zh: '大钟寺 · 无障碍链路、运行状态与季节',
    title_en: 'Dazhongsi - step-free chain, operating modes and seasons',
    alt_zh: '上部为无障碍链路：七个节点与六个段落连成一条线，每段标注通行宽度，坡度与侧向坡度标为待定；链路以次序表达，不含任何落位。中部为六种非数字等效渠道与七种运行状态。下部为八个季节与运行议题，以及融雪暂存位面板，声明暂存位不与链路或导向条重叠。',
    alt_en: 'The upper band is the Dazhongsi step-free chain: seven nodes joined by six segments, each annotated with its clear width while gradient and crossfall are marked pending; the chain is expressed as an order and carries no position. The middle bands hold six non-digital equivalents and seven operating modes. The lower band carries eight seasonal and operating topics and a snow storage panel declaring that storage overlaps neither the chain nor the guidance strip.',
    ext_zh: '链路在这里同样只是次序：七个节点按到达、决定、休息、厕所指向、值守服务、主要内容、离场排列，段落之间的通行宽度是建议模数，坡度与侧向坡度因无处可测而留白。这正是本片区最容易被误读的地方——链路可以在落位确定之前设计，但不能在落位确定之前被验证。',
    ext_en: 'Here too the chain is only an order: seven nodes running arrival, decision, rest, toilet direction, staffed service, principal content and exit, with a proposed module clear width between them and gradient and crossfall left open because there is nowhere yet to measure them. This is the point most easily misread - a chain can be designed before a position is fixed, but it cannot be verified before one is.',
    lim_zh: DZS_DISCLOSURE_ZH,
    lim_en: DZS_DISCLOSURE_EN,
  },
  'DZS-05': {
    title_zh: '大钟寺 · 治理、停止条件与证据',
    title_en: 'Dazhongsi - governance, stop conditions and evidence',
    alt_zh: '上部为三张状态卡片：授权状态未获授权、资金状态无资金、允许开始试点为否，另一侧列出三项阻断条件。中部为第一期可逆范围的四段说明。下部为两张阈值卡片，获批阈值均为空，以及一个证据后果面板，声明官方证据如果出现将使本组图纸作废重做，而不是被确认。',
    alt_en: 'Three state cards across the top read authorization not authorized, funding unfunded and pilot start allowed no, with three blocking conditions listed beside them. The middle band carries the four statements of the phase 1 reversible envelope. Two threshold cards below show an approved threshold of null on each, next to an evidence-consequence panel stating that official evidence, when it arrives, invalidates this set and requires it to be redesigned rather than confirming it.',
    ext_zh: '这张图记录了证据规则的方向。若官方证据落地，本组图纸不会因此被确认，而是整体作废并重做——这是一个提前写下的承诺，用来防止事后把新证据读成对旧图的支持。三项阻断条件、两个未获批阈值与未指定的落位共同构成本片区的停止条件：在它们解除之前，这里不存在可以开始的工作。',
    ext_en: 'This plate records the direction of the evidence rule. If official evidence lands, this set is not thereby confirmed; it is invalidated as a whole and redesigned. That is a commitment written down in advance, so that new evidence cannot later be read as support for the old drawing. Three blocking conditions, two unapproved thresholds and an unassigned position together form the stop condition for this area: until they are lifted there is no work here that could begin.',
    lim_zh: DZS_DISCLOSURE_ZH,
    lim_en: DZS_DISCLOSURE_EN,
  },
};

// ---------------------------------------------------------------------------
// 11. Evidence, per plate
// ---------------------------------------------------------------------------

/**
 * Locators are pair-invariant and every one is resolved by
 * test-evidence-resolution.js against a file other than this registry. The
 * three sets are deliberately different from one another: three areas citing
 * one pasted set would prove that none of them is about a place.
 *
 * Dazhongsi cites no other area's drawings, and none of the refs it has
 * declared excluded (building stock, phasing, station position).
 */
const EVIDENCE = {
  'ZZY-01': ['area:PROV-KEY-001', 'drawing:ZZY-PLAN-01', 'source:KEY-AREA-SOURCE',
    'source:BOUNDARY-SOURCE', 'data:assumptions.json#A-BOUNDARY-001', 'metric:site_area_sqm'],
  'ZZY-02': ['area:PROV-KEY-001', 'drawing:ZZY-PLAN-01', 'route:Z-R01', 'route:Z-R02',
    'route:Z-R03', 'route:Z-R04', 'route:Z-R05', 'component:Z-C01', 'component:Z-C02',
    'component:Z-C03', 'source:CASE-ONE-NORTH', 'metric:public_space_ratio'],
  'ZZY-03': ['area:PROV-KEY-001', 'section:ZZY-SEC-A', 'section:ZZY-SEC-B', 'component:Z-C04',
    'component:Z-C05', 'plate:ZZY-02-zh', 'source:OPEN-BUILDING-HABRAKEN-2021',
    'source:SHEARING-LAYERS-BRAND-1994', 'standard:MOHURD-ARCH-DESIGN-DEPTH-2016',
    'data:assumptions.json#A-BUILDING-001'],
  'ZZY-04': ['area:PROV-KEY-001', 'drawing:ZZY-PLAN-01', 'section:ZZY-SEC-A', 'section:ZZY-SEC-B',
    'route:Z-R05', 'plate:ZZY-02-zh', 'standard:BARRIER-FREE-ENVIRONMENT-LAW',
    'standard:ELDERLY-SMART-TECH-PLAN-2020-45', 'source:ISSUE-1774',
    'data:assumptions.json#A-CLIMATE-001', 'data:assumptions.json#A-PILOT-001'],
  'ZZY-05': ['area:PROV-KEY-001', 'section:ZZY-SEC-B', 'component:Z-C04',
    'metric:phase1_reversible_area_sqm', 'source:REAL-OPTIONS-NEUFVILLE-2003',
    'source:HOLLING-1973', 'source:ISSUE-2170', 'data:assumptions.json#A-CONTROLS-001'],

  'AIO-01': ['area:PROV-KEY-002', 'drawing:AIO-PLAN-01', 'source:KEY-AREA-SOURCE',
    'source:BOUNDARY-SOURCE', 'data:assumptions.json#A-BOUNDARY-001',
    'metric:public_space_area_sqm'],
  'AIO-02': ['area:PROV-KEY-002', 'drawing:AIO-PLAN-01', 'route:O-R01', 'route:O-R02',
    'route:O-R03', 'route:O-R04', 'route:O-R05', 'component:O-C01', 'component:O-C02',
    'component:O-C03', 'source:OSTROM-COMMONS-1990', 'metric:public_space_ratio'],
  'AIO-03': ['area:PROV-KEY-002', 'section:AIO-SEC-A', 'section:AIO-SEC-B', 'component:O-C04',
    'component:O-C05', 'plate:AIO-02-zh', 'source:CASE-KENDALL', 'source:SCHELLING-1971',
    'standard:MOHURD-ARCH-DESIGN-DEPTH-2016', 'data:assumptions.json#A-BUILDING-001'],
  'AIO-04': ['area:PROV-KEY-002', 'drawing:AIO-PLAN-01', 'section:AIO-SEC-A', 'section:AIO-SEC-B',
    'route:O-R05', 'plate:AIO-02-zh', 'standard:BARRIER-FREE-ENVIRONMENT-LAW',
    'standard:GENERATIVE-AI-INTERIM-MEASURES', 'source:ISSUE-1781',
    'data:assumptions.json#A-CLIMATE-001', 'data:assumptions.json#A-EQUITY-001'],
  'AIO-05': ['area:PROV-KEY-002', 'section:AIO-SEC-B', 'component:O-C05',
    'metric:network_detour_factor', 'source:REAL-OPTIONS-NEUFVILLE-2003',
    'source:CASE-KALASATAMA', 'source:OSTROM-POLYCENTRIC-2010',
    'data:assumptions.json#A-NETWORK-001'],

  'DZS-01': ['area:PROV-KEY-003', 'drawing:DZS-TOPO-01', 'source:ISSUE-1029',
    'source:KEY-AREA-SOURCE', 'metric:key_area_count'],
  'DZS-02': ['area:PROV-KEY-003', 'drawing:DZS-TOPO-01', 'route:D-R01', 'route:D-R02',
    'route:D-R03', 'route:D-R04', 'route:D-R05', 'component:D-C01', 'component:D-C02',
    'component:D-C03', 'component:D-C04', 'source:ISSUE-1029', 'metric:public_space_ratio'],
  'DZS-03': ['area:PROV-KEY-003', 'section:DZS-SEC-A', 'section:DZS-SEC-B', 'component:D-C03',
    'component:D-C04', 'plate:DZS-02-zh', 'source:CASE-QUAYSIDE',
    'source:SHEARING-LAYERS-BRAND-1994', 'source:ISSUE-1029'],
  'DZS-04': ['area:PROV-KEY-003', 'drawing:DZS-TOPO-01', 'section:DZS-SEC-B', 'component:D-C05',
    'route:D-R05', 'plate:DZS-02-zh', 'standard:BARRIER-FREE-ENVIRONMENT-LAW',
    'standard:ELDERLY-SMART-TECH-PLAN-2020-45', 'source:ISSUE-1781',
    'data:assumptions.json#A-CLIMATE-001', 'data:assumptions.json#A-PILOT-001'],
  'DZS-05': ['area:PROV-KEY-003', 'section:DZS-SEC-A', 'component:D-C01',
    'metric:phase1_reversible_area_sqm', 'source:REAL-OPTIONS-NEUFVILLE-2003',
    'source:CASE-SEOUL-AI-HUB', 'source:ISSUE-1029', 'data:assumptions.json#A-CLIMATE-001'],
};

/**
 * A0 board hierarchy. build-drawings.js sizes each plate box from the fraction
 * and the raster aspect and throws when the rows will not fit, so these are the
 * values the board layout actually solves at, not an aspiration.
 */
const A0_PLACEMENT = {
  '01': { visual_rank: 3, area_fraction: 0.07 },
  '02': { visual_rank: 1, area_fraction: 0.30 },
  '03': { visual_rank: 2, area_fraction: 0.20 },
  '04': { visual_rank: 4, area_fraction: 0.07 },
  '05': { visual_rank: 5, area_fraction: 0.07 },
};

const A3_FIRST_PAGE = { ZZY: 2, AIO: 7, DZS: 12 };
const A0_BOARD = { ZZY: 1, AIO: 2, DZS: 3 };

// ---------------------------------------------------------------------------
// 12. Plate chrome
// ---------------------------------------------------------------------------

function chromeHeader(sf, spec) {
  const { area, concept, language } = spec;
  const accent = ACCENT[area.prefix];
  const ui = UI[language];
  const prose = PROSE[spec.plate_id];

  fillRect(sf, BLEED_X, 0, BLEED_W, HEAD_H, INK);
  fillRect(sf, BLEED_X, 0, 16 - BLEED_X, HEAD_H, accent);
  fillRect(sf, BLEED_X, HEAD_H - 5, BLEED_W, 5, accent);

  text(sf, spec.plate_id, M, 58, { size: 30, weight: 'bold', color: accent, ls: 3 });
  const idW = widthOf(spec.plate_id, 30, 'bold', 3);
  line(sf, concept.slug, M + idW + 22, 56, 520, { size: 17, color: HEADTEXT, ls: 1 });

  line(sf, L(prose, 'title', language), M, 116, 1240, {
    size: 34, min: 20, weight: 'bold', color: WHITE,
  });
  line(sf, ui.langtag, M, 156, 520, { size: 15, color: DIM });

  line(sf, L(area.design, 'name', language), RIGHT, 56, 620,
    { size: 21, weight: 'bold', color: WHITE, align: 'right' });
  line(sf, area.area_feature_id + '  ·  ' + area.spatial_mode, RIGHT, 92, 620,
    { size: 16, color: HEADTEXT, align: 'right' });
  line(sf, 'scale: not_to_scale  ·  north arrow: none', RIGHT, 124, 620,
    { size: 15, color: DIM, align: 'right' });
  line(sf, spec.artifact_id, RIGHT, 156, 620, { size: 15, color: DIM, align: 'right' });
}

function chromeFooter(sf, spec) {
  const { area, language } = spec;
  const accent = ACCENT[area.prefix];
  const ui = UI[language];
  const prose = PROSE[spec.plate_id];

  fillRect(sf, BLEED_X, FOOT_Y, BLEED_W, H - FOOT_Y, PANEL);
  fillRect(sf, BLEED_X, FOOT_Y, BLEED_W, 2, RULE);
  fillRect(sf, BLEED_X, FOOT_Y, 16 - BLEED_X, H - FOOT_Y, accent);

  line(sf, ui.limits, M, FOOT_Y + 32, 400, { size: 15, weight: 'bold', color: accent });
  para(sf, L(prose, 'lim', language), M, FOOT_Y + 42, 1160, 92,
    { size: 17, min: 11, lh: 1.42, color: INK });

  line(sf, ui.evidence, 1264, FOOT_Y + 32, 300, { size: 15, weight: 'bold', color: accent });
  para(sf, EVIDENCE[spec.plate_id].join('   '), 1264, FOOT_Y + 42, 672, 92,
    { size: 13, min: 9, lh: 1.4, color: MUTED });

  fillRect(sf, M, H - 46, CW, 1, RULE);
  line(sf, spec.file, M, H - 22, 1000, { size: 13, color: MUTED });
  line(sf, ui.fontnote, RIGHT, H - 22, 700, { size: 13, color: MUTED, align: 'right' });
}

// ---------------------------------------------------------------------------
// 13. Shared body widgets
// ---------------------------------------------------------------------------

function bulletList(sf, items, box, opt) {
  const o = opt || {};
  const n = items.length;
  if (n === 0) return;
  const gap = o.gap === undefined ? 10 : o.gap;
  const each = (box.h - gap * (n - 1)) / n;
  for (let i = 0; i < n; i++) {
    const y = box.y + i * (each + gap);
    fillPoly(sf, circlePts(box.x + 5, y + 10, 4, 16), o.dot || MUTED);
    para(sf, items[i], box.x + 20, y, box.w - 20, each,
      { size: o.size || 17, min: o.min || 10, lh: 1.42, color: o.color || INK });
  }
}

function statusRows(sf, box, language, accent) {
  const keys = ['verified', 'accessibility_gate', 'survey', 'professional_audit',
    'authorization_state', 'funding_state'];
  const each = box.h / keys.length;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const y = box.y + i * each;
    const value = REQUIRED_STATUS[key];
    const shown = STATUS_VALUE[language][String(value)] || String(value);
    if (i > 0) fillRect(sf, box.x, y - 2, box.w, 1, RULE);
    line(sf, STATUS_LABEL[language][key], box.x + 4, y + each / 2 + 6, box.w - 230,
      { size: 17, min: 11, color: INK });
    const w = Math.round(widthOf(shown, 15, 'bold', 0)) + 26;
    chip(sf, box.x + box.w - w, y + each / 2 - 14, w, 28, shown, WARN_SOFT, WARN, 15);
  }
}

/** A dimension line with ticks; pending dimensions are broken and unnumbered. */
function dimH(sf, x0, x1, y, label, pending, color) {
  const c = color || MUTED;
  if (pending) dashRow(sf, x0, x1, y - 1, 2, c, 9, 7);
  else fillRect(sf, x0, y - 1, x1 - x0, 2, c);
  fillRect(sf, x0, y - 9, 2, 18, c);
  fillRect(sf, x1 - 2, y - 9, 2, 18, c);
  const w = Math.round(widthOf(label, 14, 'bold', 0)) + 14;
  fillRect(sf, (x0 + x1) / 2 - w / 2, y - 24, w, 20, WHITE);
  line(sf, label, (x0 + x1) / 2, y - 9, w, { size: 14, weight: 'bold', color: c, align: 'center' });
}

function dimV(sf, x, y0, y1, label, pending, color, side) {
  const c = color || MUTED;
  if (pending) {
    for (let y = y0; y < y1; y += 16) fillRect(sf, x - 1, y, 2, Math.min(9, y1 - y), c);
  } else fillRect(sf, x - 1, y0, 2, y1 - y0, c);
  fillRect(sf, x - 9, y0, 18, 2, c);
  fillRect(sf, x - 9, y1 - 2, 18, 2, c);
  const w = Math.round(widthOf(label, 14, 'bold', 0)) + 12;
  const lx = side === 'left' ? x - 14 - w : x + 14;
  fillRect(sf, lx, (y0 + y1) / 2 - 11, w, 22, WHITE);
  line(sf, label, lx + w / 2, (y0 + y1) / 2 + 5, w, {
    size: 14, weight: 'bold', color: c, align: 'center',
  });
}

// ---------------------------------------------------------------------------
// 14. Concept 01 - situation and claim limits
// ---------------------------------------------------------------------------

function claimBullets(ctx) {
  const { design, lang, ui } = ctx;
  const d = design;
  return [
    L(d.plan, 'title', lang),
    ui.modules + ': ' + d.components.map((c) => c.id + ' ' + L(c, 'name', lang)).join(' / '),
    ui.routesof + ': ' + d.routes.map((r) => r.id + ' ' + L(r, 'name', lang)).join(' / '),
    ui.sectionsof + ': ' + d.sections.map((s) => s.id + ' ' + L(s, 'title', lang)).join(' / '),
    ui.chainof + ': ' + d.step_free_chain.id + ' - ' +
      d.step_free_chain.nodes.length + ' ' + ui.node + ' / ' +
      d.step_free_chain.segments.length + ' ' + ui.segment,
  ];
}

function notClaimBullets(ctx) {
  const { area, design, lang } = ctx;
  if (area.prefix === 'AIO') {
    return design.not_claimed.map((k) => NOT_CLAIMED_LABEL[lang][k] || k)
      .concat([L(design, 'not_claimed_note', lang)]);
  }
  if (area.prefix === 'DZS') {
    return design.excluded_evidence.map(
      (e) => (EXCLUDED_LABEL[lang][e.category] || e.category) + ' - ' + L(e, 'reason', lang));
  }
  return lang === 'zh' ? [
    '官方边界、坐标与面积：本图底图为临时工作范围，不是官方多边形。',
    '现状权属、控制指标与批准状态：本包没有这些依据，也不推断。',
    '工程可行性、结构与设备做法：需专业审核，本图不作判断。',
    '场地事实：高差、铺装、既有设施均未测量，图上不出现实测值。',
    '任何指北针、比例尺与坐标标注：因底图精度不足而一律不画。',
  ] : [
    'Official boundary, coordinates and area: the base here is a provisional working extent, not an official polygon.',
    'Existing tenure, control indicators and approval status: this package holds none of these and infers none.',
    'Engineering feasibility, structure and services: these require professional audit and this drawing makes no finding.',
    'Site facts: levels, paving and existing installations are unsurveyed, so no measured value appears.',
    'Any north arrow, scale bar or coordinate annotation: omitted throughout because the base is not precise enough to carry one.',
  ];
}

function extentInset(ctx, box) {
  const { sf, area, lang, accent } = ctx;
  const feature = area.feature;
  const ring = feature.geometry.coordinates[0];
  let minX = Infinity; let maxX = -Infinity; let minY = Infinity; let maxY = -Infinity;
  for (const [lon, lat] of ring) {
    if (lon < minX) minX = lon;
    if (lon > maxX) maxX = lon;
    if (lat < minY) minY = lat;
    if (lat > maxY) maxY = lat;
  }
  const dw = box.w * 0.46;
  const dh = box.h - 40;
  const sx = dw / (maxX - minX);
  const sy = dh / (maxY - minY);
  const s = Math.min(sx, sy) * 0.82;
  const ox = box.x + dw / 2 - ((maxX - minX) * s) / 2;
  const oy = box.y + dh / 2 - ((maxY - minY) * s) / 2;
  const pts = [];
  for (const [lon, lat] of ring.slice(0, ring.length - 1)) {
    pts.push(ox + (lon - minX) * s, oy + (maxY - lat) * s);
  }
  gop('extent', area.area_feature_id, pts.length / 2);
  fillPoly(sf, pts, ACCENT_SOFT[area.prefix]);
  for (let i = 0; i < pts.length; i += 2) {
    const j = (i + 2) % pts.length;
    dashLine(sf, pts[i], pts[i + 1], pts[j], pts[j + 1], 3, accent, 14, 9);
  }
  line(sf, 'provisional_rough', box.x + 4, box.y + dh + 26, dw, { size: 14, color: MUTED });

  const tx = box.x + box.w * 0.52;
  const tw = box.w - box.w * 0.52;
  const rows = [
    ['geometry_role', feature.properties.geometry_role],
    ['boundary_precision', feature.properties.boundary_precision],
    ['official_boundary', String(feature.properties.official_boundary)],
    ['area_sqm_declared', String(feature.properties.area_sqm_declared)],
    ['source_id', String(feature.properties.source_id)],
  ];
  for (let i = 0; i < rows.length; i++) {
    const y = box.y + i * 34;
    line(sf, rows[i][0], tx, y + 16, tw, { size: 13, color: MUTED });
    line(sf, rows[i][1], tx, y + 34, tw, { size: 15, weight: 'bold', color: INK });
  }
  para(sf, L(feature.properties, 'warning', lang), tx, box.y + rows.length * 34 + 6,
    tw, box.h - rows.length * 34 - 10, { size: 13, min: 9, lh: 1.4, color: WARN });
}

function voidPanel(ctx, box) {
  const { sf, design, lang, ui } = ctx;
  line(sf, 'positional_claim: void', box.x, box.y + 40, box.w,
    { size: 38, min: 20, weight: 'bold', color: WARN });
  line(sf, ui.assignment + ': to_be_assigned_by_survey', box.x, box.y + 76, box.w,
    { size: 17, min: 11, color: INK });
  fillRect(sf, box.x, box.y + 92, box.w, 1, RULE);
  line(sf, ui.consequence + ': ' + design.evidence_consequence, box.x, box.y + 122, box.w,
    { size: 17, min: 11, weight: 'bold', color: INK });
  para(sf, L(design, 'evidence_consequence_note', lang), box.x, box.y + 134,
    box.w, box.h - 138, { size: 15, min: 10, lh: 1.44, color: INK });
}

function render01(ctx) {
  const { sf, area, design, lang, ui, accent } = ctx;
  const soft = ACCENT_SOFT[area.prefix];

  panel(sf, M, BODY_Y, CW, 92, soft);
  fillRect(sf, M, BODY_Y, 6, 92, accent);
  line(sf, ui.condition, M + 22, BODY_Y + 30, 460, { size: 16, weight: 'bold', color: accent });
  para(sf, L(design.plan, 'condition', lang), M + 22, BODY_Y + 40, CW - 44, 44,
    { size: 16, min: 10, lh: 1.4, color: INK });

  const cy = BODY_Y + 108;
  const chh = 464;
  const left = titled(sf, M, cy, 916, chh, ui.claims, GOOD_SOFT, GOOD);
  bulletList(sf, claimBullets(ctx), left, { dot: GOOD, size: 17, min: 10 });
  const right = titled(sf, 1020, cy, 916, chh, ui.notclaims, WARN_SOFT, WARN);
  bulletList(sf, notClaimBullets(ctx), right, { dot: WARN, size: 17, min: 10 });

  const sy = cy + chh + 16;
  const sh = BODY_B - sy;
  const stat = titled(sf, M, sy, 916, sh, ui.status, PANEL2, INK);
  statusRows(sf, stat, lang, accent);

  const isDzs = area.prefix === 'DZS';
  const info = titled(sf, 1020, sy, 916, sh, isDzs ? ui.voidpos : ui.extent,
    isDzs ? WARN_SOFT : soft, isDzs ? WARN : accent);
  if (isDzs) voidPanel(ctx, info);
  else extentInset(ctx, info);
}

// ---------------------------------------------------------------------------
// 15. Concept 02 - the dominant plan
// ---------------------------------------------------------------------------

const PLAN_BOX = { x: 88, y: 268, w: 1168, h: 648 };

function zzyPlan(ctx, mini) {
  const { sf, accent } = ctx;
  const b = PLAN_BOX;
  const only = mini || null;
  const show = (id) => !only || only === id;

  // Z-E03 logistics spine
  if (show('Z-R03')) {
    gop('spine', b.x + 22, 300, b.x + b.w - 22, 300);
    dashRow(sf, b.x + 22, b.x + b.w - 22, 297, 6, show('Z-R03') && only ? accent : INK, 26, 14);
    for (const lx of [740, 840, 940, 1040]) fillRect(sf, lx, 288, 26, 8, INK);
  }

  // Z-E01 public observation loop, closed, entered from outside
  if (show('Z-R01')) {
    const lc = only ? accent : INK;
    gop('loop', 140, 340, 600, 780);
    strokeRound(sf, 140, 340, 460, 440, 26, 4, lc);
    strokeRound(sf, 196, 396, 348, 328, 18, 4, lc);
    if (!only) {
      fillPoly(sf, roundRectPts(140, 340, 460, 440, 26)
        .concat(roundRectPts(196, 396, 348, 328, 18).reverse()), ACCENT_SOFT.ZZY, 0.55);
    }
    // Z-E09 level arrival threshold, from outside the loop
    fillRect(sf, 196, 776, 104, 4, lc);
    fillRect(sf, 196, 788, 104, 4, lc);
    arrow(sf, 248, 838, 248, 796, 4, lc, 15);
  }

  // Z-E02 controlled test field: hatched, own entry face, no shared edge
  if (show('Z-R02')) {
    const tc = only ? accent : INK;
    gop('testfield', 690, 340, 1090, 780);
    strokeRect(sf, 690, 340, 400, 440, 4, tc);
    hatch(sf, 692, 342, 396, 436, only ? ACCENT_SOFT.ZZY : PANEL2, 18, 2);
    // Z-E07 reversible module bays on the 1.2 m grid
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const x = 703 + c * 100;
        const y = 376 + r * 130;
        strokeRect(sf, x, y, 82, 108, 2, tc);
        gop('bay', x, y);
      }
    }
    // own entry face on the logistics side, never from the observation loop
    fillRect(sf, 860, 336, 80, 8, PAPER);
    arrow(sf, 900, 306, 900, 346, 4, tc, 15);
  }

  // separation zone: belongs to neither side
  if (!only) {
    stipple(sf, 612, 340, 56, 440, DIM);
    strokeRect(sf, 612, 340, 56, 440, 1, RULE);
    gop('separation', 612, 340, 668, 780);
  }

  // Z-E04 emergency egress and rescue route
  if (show('Z-R04')) {
    const ec = only ? accent : INK;
    gop('emergency', b.x + 22, 850, b.x + b.w - 22, 850);
    dashDotLine(sf, b.x + 22, 850, b.x + b.w - 22, 850, 4, ec);
    for (const bx of [258, 700, 1058]) strokeRect(sf, bx, 828, 44, 44, 3, ec);
  }

  // Z-E05 maintenance access, always outside the test field
  if (show('Z-R05')) {
    const mc = only ? accent : INK;
    gop('maintenance', 1130, 300, 1130, 870);
    dotLine(sf, 1130, 300, 1130, 870, 5, mc);
    for (const my of [430, 560, 690]) dotLine(sf, 1130, my, 1094, my, 5, mc);
  }

  // Z-E06 staffed service desk, on the loop within sight of arrival
  if (!only) {
    fillRect(sf, 250, 730, 140, 44, accent);
    gop('desk', 250, 730);
    // Z-E08 snow storage, set back from every marked route
    stipple(sf, 1160, 680, 86, 110, MUTED);
    strokeRect(sf, 1160, 680, 86, 110, 1, RULE);
    gop('snow', 1160, 680);

    const labels = [
      ['Z-E03', b.x + 24, 262], ['Z-E01', 210, 352], ['Z-E02', 700, 352],
      ['Z-E07', 700, 792], ['Z-E06', 250, 786], ['Z-E09', 196, 806],
      ['Z-E04', b.x + 24, 876], ['Z-E05', 1096, 262], ['Z-E08', 1160, 794],
    ];
    for (const [id, lx, ly] of labels) tag(sf, id, lx, ly, PANEL2, INK, 13);
  }
}

function aioPlan(ctx, mini) {
  const { sf, accent } = ctx;
  const b = PLAN_BOX;
  const only = mini || null;
  const show = (id) => !only || only === id;

  // O-E05 quiet frontage
  if (!only || only === 'O-R03') {
    fillRect(sf, 130, 320, 1090, 32, PANEL2);
    strokeRect(sf, 130, 320, 1090, 32, 1, RULE);
    gop('quiet', 130, 320);
  }
  // O-E04 care frontage, seating outside the movement band
  if (show('O-R03')) {
    const cc = only ? accent : INK;
    fillRect(sf, 130, 800, 1090, 40, only ? ACCENT_SOFT.AIO : PANEL2);
    strokeRect(sf, 130, 800, 1090, 40, 3, cc);
    for (let i = 0; i < 9; i++) fillRect(sf, 180 + i * 118, 852, 40, 12, cc);
    gop('care', 130, 800);
  }
  // O-E06 affordable frontage, subdividable on the module
  if (!only) {
    strokeRect(sf, 1100, 380, 120, 396, 3, INK);
    for (let i = 1; i < 6; i++) fillRect(sf, 1100, 380 + i * 66, 120, 2, INK);
    gop('affordable', 1100, 380);
  }
  // O-E01 release commons: open figure, no enclosing line, three approaches
  if (show('O-R02')) {
    const rc = only ? accent : INK;
    const cx0 = 420; const cy0 = 400; const cx1 = 860; const cy1 = 740;
    gop('commons', cx0, cy0, cx1, cy1);
    const arm = 70;
    fillRect(sf, cx0, cy0, arm, 5, rc); fillRect(sf, cx0, cy0, 5, arm, rc);
    fillRect(sf, cx1 - arm, cy0, arm, 5, rc); fillRect(sf, cx1 - 5, cy0, 5, arm, rc);
    fillRect(sf, cx0, cy1 - 5, arm, 5, rc); fillRect(sf, cx0, cy1 - arm, 5, arm, rc);
    fillRect(sf, cx1 - arm, cy1 - 5, arm, 5, rc); fillRect(sf, cx1 - 5, cy1 - arm, 5, arm, rc);
    arrow(sf, 300, 570, 412, 570, 4, rc, 15);
    arrow(sf, 640, 330, 640, 392, 4, rc, 15);
    arrow(sf, 640, 796, 640, 748, 4, rc, 15);
  }
  // O-E02 staffed and O-E03 non-digital daily service positions
  if (show('O-R01')) {
    const sc = only ? accent : accent;
    fillRect(sf, 220, 430, 160, 80, sc);
    strokeRect(sf, 220, 570, 160, 80, 4, sc);
    for (let i = 0; i < 3; i++) fillRect(sf, 236, 590 + i * 18, 128, 6, sc);
    gop('service', 220, 430, 220, 570);
    if (only) polyline(sf, [160, 470, 214, 470, 214, 610, 160, 610], 4, accent);
  }
  // O-E07 conditional slow seam, only where the proposal makes the ground
  if (show('O-R04')) {
    const qc = only ? accent : WARN;
    gop('seam', 866, 570, 960, 790);
    dashLine(sf, 866, 570, 960, 570, 5, qc, 16, 11);
    dashLine(sf, 960, 570, 960, 790, 5, qc, 16, 11);
    tag(sf, UI[ctx.lang].pending === 'pending' ? 'conditional' : '有条件', 902, 528,
      WARN_SOFT, WARN, 14);
  }
  // O-R05 maintenance and cleaning line
  if (show('O-R05')) {
    const mc = only ? accent : INK;
    gop('maint', 1244, 320, 1244, 866);
    dotLine(sf, 1244, 320, 1244, 866, 5, mc);
    dotLine(sf, 1244, 866, 150, 866, 5, mc);
  }
  if (!only) {
    // O-E08 snow storage, set back from the seam and every frontage
    stipple(sf, 220, 690, 120, 76, MUTED);
    strokeRect(sf, 220, 690, 120, 76, 1, RULE);
    gop('snow', 220, 690);
    // O-E09 winter shelter: demountable canopy over the rest point
    dashLine(sf, 440, 748, 620, 748, 4, INK, 14, 8);
    fillRect(sf, 440, 748, 4, 34, INK);
    fillRect(sf, 616, 748, 4, 34, INK);
    gop('shelter', 440, 748);

    const labels = [
      ['O-E05', 134, 292], ['O-E01', 424, 356], ['O-E02', 220, 404],
      ['O-E03', 220, 656], ['O-E06', 1100, 352], ['O-E07', 966, 596],
      ['O-E04', 134, 774], ['O-E08', 220, 768], ['O-E09', 440, 786],
    ];
    for (const [id, lx, ly] of labels) tag(sf, id, lx, ly, PANEL2, INK, 13);
  }
}

function dzsTopo(ctx, mini) {
  const { sf, accent, lang } = ctx;
  const b = PLAN_BOX;
  const only = mini || null;
  const design = ctx.design;

  if (!only) {
    fillRect(sf, b.x, b.y, b.w, 34, WARN_SOFT);
    strokeRect(sf, b.x, b.y, b.w, 34, 1, WARN);
    line(sf, UI[lang].nottoscale + '  ·  ' + UI[lang].scalebar + ': ' + UI[lang].no +
      '  ·  ' + UI[lang].northarrow + ': ' + UI[lang].no + '  ·  ' +
      UI[lang].assignment + ': to_be_assigned_by_survey',
      b.x + 14, b.y + 23, b.w - 28, { size: 16, min: 10, weight: 'bold', color: WARN });
  }

  const cx = 672;
  const cy = 610;
  if (!only) {
    gop('cross', cx, cy);
    dashLine(sf, cx, 330, cx, 900, 2, RULE, 12, 9);
    dashLine(sf, 130, cy, 1220, cy, 2, RULE, 12, 9);
  }

  const pos = {
    arrive: { x: 940, y: 460, q: 'Q1' },
    transfer: { x: 400, y: 460, q: 'Q2' },
    stay: { x: 400, y: 762, q: 'Q3' },
    repair: { x: 940, y: 762, q: 'Q4' },
  };
  const order = ['arrive', 'transfer', 'stay', 'repair'];

  const links = [
    ['D-R01', 'arrive', 'transfer'],
    ['D-R02', 'transfer', 'stay'],
    ['D-R03', 'stay', 'repair'],
  ];
  for (const [id, from, to] of links) {
    if (only && only !== id) continue;
    const a = pos[from];
    const z = pos[to];
    const c = only ? accent : INK;
    const dx = z.x - a.x;
    const dy = z.y - a.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    gop('link', id, a.x, a.y, z.x, z.y);
    arrow(sf, a.x + (dx / len) * 66, a.y + (dy / len) * 66,
      z.x - (dx / len) * 74, z.y - (dy / len) * 74, 4, c, 17);
  }

  if (only === 'D-R04') {
    gop('cycle', pos.repair.x, pos.repair.y, pos.arrive.x, pos.arrive.y);
    polyline(sf, [1046, 762, 1140, 762, 1140, 460, 1006, 460], 4, accent);
  }
  if (only === 'D-R05') {
    gop('modmaint');
    dotLine(sf, 260, 380, 1090, 380, 5, accent);
    dotLine(sf, 1090, 380, 1090, 860, 5, accent);
    dotLine(sf, 1090, 860, 260, 860, 5, accent);
    dotLine(sf, 260, 860, 260, 380, 5, accent);
  }

  for (const role of order) {
    if (only && only !== 'D-R01' && only !== 'D-R02' && only !== 'D-R03' &&
      only !== 'D-R04' && only !== 'D-R05') break;
    const p = pos[role];
    gop('token', role, p.x, p.y);
    fillPoly(sf, circlePts(p.x, p.y, 62, 60), ACCENT_SOFT.DZS);
    fillPoly(sf, ringPts(p.x, p.y, 62, 58, 60), accent);
    if (!only) {
      line(sf, DZS_POSITION_LABEL[lang][role], p.x, p.y + 2, 108,
        { size: 19, min: 11, weight: 'bold', color: INK, align: 'center' });
      line(sf, p.q, p.x, p.y + 28, 108, { size: 15, color: MUTED, align: 'center' });
    }
  }

  if (!only) {
    // D-E07 staffed desk against the transfer position
    fillRect(sf, 220, 430, 80, 60, accent);
    tag(sf, 'D-E07', 220, 396, PANEL2, INK, 13);
    // D-E08 shelter over the stay position
    dashLine(sf, 210, 738, 320, 738, 4, INK, 13, 8);
    fillRect(sf, 210, 738, 4, 30, INK);
    fillRect(sf, 316, 738, 4, 30, INK);
    tag(sf, 'D-E08', 210, 700, PANEL2, INK, 13);
    // D-E05 cycle parking and D-E06 cycle repair beside the repair position
    strokeRect(sf, 1040, 700, 78, 54, 3, INK);
    for (let i = 0; i < 3; i++) fillRect(sf, 1052 + i * 22, 712, 6, 30, INK);
    tag(sf, 'D-E05', 1040, 664, PANEL2, INK, 13);
    strokeRect(sf, 1040, 790, 78, 54, 3, INK);
    fillRect(sf, 1052, 806, 54, 6, INK);
    fillPoly(sf, circlePts(1064, 828, 9, 20), INK);
    fillPoly(sf, circlePts(1096, 828, 9, 20), INK);
    tag(sf, 'D-E06', 1040, 848, PANEL2, INK, 13);
    // D-E09 snow storage clear of every marked line
    stipple(sf, 620, 828, 110, 66, MUTED);
    strokeRect(sf, 620, 828, 110, 66, 1, RULE);
    tag(sf, 'D-E09', 620, 896, PANEL2, INK, 13);

    const corners = [['Q2', 150, 356], ['Q1', 1150, 356], ['Q3', 150, 880], ['Q4', 1150, 880]];
    for (const [q, qx, qy] of corners) {
      line(sf, q, qx, qy, 70, { size: 22, weight: 'bold', color: DIM });
    }
    line(sf, UI[lang].positions, b.x + 14, b.y + b.h - 8, b.w - 28,
      { size: 15, min: 10, color: MUTED });
    void design;
  }
}

const PLAN_DRAW = { ZZY: zzyPlan, AIO: aioPlan, DZS: dzsTopo };

function render02(ctx) {
  const { sf, area, design, lang, ui, accent } = ctx;
  const soft = ACCENT_SOFT[area.prefix];
  const isDzs = area.prefix === 'DZS';

  panel(sf, M, BODY_Y, 1216, 726, WHITE);
  fillPoly(sf, roundRectPts(M, BODY_Y, 1216, 50, 10), soft);
  fillRect(sf, M, BODY_Y + 30, 1216, 20, soft);
  line(sf, (isDzs ? ui.topo : ui.plan) + '  ·  ' + design.plan.id, M + 16, BODY_Y + 32, 1184,
    { size: 19, weight: 'bold', color: accent });
  PLAN_DRAW[area.prefix](ctx, null);

  // legend
  const leg = titled(sf, 1296, BODY_Y, 640, 348, ui.legend, PANEL2, INK, 36);
  const elements = design.plan.elements;
  const rowH = leg.h / elements.length;
  for (let i = 0; i < elements.length; i++) {
    const e = elements[i];
    const y = leg.y + i * rowH;
    line(sf, e.id, leg.x, y + rowH / 2 + 5, 64, { size: 14, weight: 'bold', color: accent });
    line(sf, L(e, 'name', lang), leg.x + 70, y + rowH / 2 + 5, leg.w - 70,
      { size: 15, min: 10, color: INK });
  }

  // assertion / not claimed / topology declarations
  const aTitle = isDzs ? ui.topoclaims : (area.prefix === 'AIO' ? ui.notclaimed : ui.assertion);
  const ass = titled(sf, 1296, BODY_Y + 364, 640, 362, aTitle,
    isDzs ? WARN_SOFT : soft, isDzs ? WARN : accent, 36);
  if (area.prefix === 'ZZY') {
    const s = design.separation;
    const rows = [
      [ui.entersct, s.public_observation_enters_controlled_test],
      [ui.dependsct, s.public_observation_depends_on_controlled_test],
    ];
    for (let i = 0; i < rows.length; i++) {
      const y = ass.y + i * 52;
      line(sf, rows[i][0], ass.x, y + 22, ass.w - 90, { size: 15, min: 10, color: INK });
      chip(sf, ass.x + ass.w - 78, y + 2, 78, 28, rows[i][1] ? ui.yes : ui.no,
        GOOD_SOFT, GOOD, 15);
    }
    para(sf, L(s, 'note', lang), ass.x, ass.y + 116, ass.w, ass.h - 120,
      { size: 15, min: 10, lh: 1.45, color: INK });
  } else if (area.prefix === 'AIO') {
    let x = ass.x;
    let y = ass.y;
    for (const k of design.not_claimed) {
      const label = NOT_CLAIMED_LABEL[lang][k] || k;
      const w = Math.round(widthOf(label, 14, 'bold', 0)) + 18;
      if (x + w > ass.x + ass.w) { x = ass.x; y += 32; }
      tag(sf, label, x, y, WARN_SOFT, WARN, 14);
      x += w + 8;
    }
    para(sf, L(design, 'not_claimed_note', lang), ass.x, y + 42, ass.w,
      ass.h - (y + 42 - ass.y), { size: 15, min: 10, lh: 1.45, color: INK });
  } else {
    const p = design.plan;
    const rows = [
      [ui.nottoscale, p.not_to_scale ? ui.yes : ui.no],
      [ui.scalebar, p.scale_bar ? ui.yes : ui.no],
      [ui.northarrow, p.north_arrow ? ui.yes : ui.no],
    ];
    for (let i = 0; i < rows.length; i++) {
      const y = ass.y + i * 44;
      line(sf, rows[i][0], ass.x, y + 22, ass.w - 90, { size: 15, min: 10, color: INK });
      chip(sf, ass.x + ass.w - 78, y + 2, 78, 28, rows[i][1], WARN_SOFT, WARN, 15);
    }
    let y = ass.y + 142;
    for (const q of p.positions) {
      line(sf, q.quadrant + '  ' + DZS_POSITION_LABEL[lang][q.role] + '  ·  ' + q.assignment,
        ass.x, y, ass.w, { size: 14, min: 10, color: INK });
      y += 26;
    }
    para(sf, DZS_DISCLOSURE_ZH === undefined ? '' : (lang === 'en' ? DZS_DISCLOSURE_EN : DZS_DISCLOSURE_ZH),
      ass.x, y + 6, ass.w, ass.h - (y + 6 - ass.y), { size: 14, min: 9, lh: 1.42, color: WARN });
  }

  // five routes, each drawn on its own
  const my = BODY_Y + 742;
  const mh = BODY_B - my;
  line(sf, ui.routes, M, my + 16, 900, { size: 17, weight: 'bold', color: accent });
  const top = my + 26;
  const gapW = 16;
  const mw = (CW - gapW * 4) / 5;
  const routes = design.routes;
  for (let i = 0; i < routes.length; i++) {
    const r = routes[i];
    const x = M + i * (mw + gapW);
    panel(sf, x, top, mw, mh - 26, WHITE);
    fillPoly(sf, roundRectPts(x, top, mw, 40, 10), soft);
    fillRect(sf, x, top + 20, mw, 20, soft);
    line(sf, r.id, x + 10, top + 25, 72, { size: 15, weight: 'bold', color: accent });
    line(sf, L(r, 'name', lang), x + 86, top + 25, mw - 96, { size: 13, min: 8, color: INK });
    miniPlan(ctx, x + 10, top + 46, mw - 20, mh - 84, r.id);
    if (r.positional_claim) {
      line(sf, 'positional_claim: ' + r.positional_claim, x + 10, top + mh - 34, mw - 20,
        { size: 12, min: 9, color: WARN });
    }
  }
}

/**
 * Draws the plan base plus exactly one route, scaled into a small panel. The
 * geometry is produced by the same code as the main plan, so a route that is
 * absent from the plan cannot appear here.
 */
function miniPlan(ctx, x, y, w, h, routeId) {
  const sf = ctx.sf;
  const b = PLAN_BOX;
  const s = Math.min(w / b.w, h / b.h);
  const ox = x + (w - b.w * s) / 2;
  const oy = y + (h - b.h * s) / 2;
  const proxy = {
    width: sf.width, height: sf.height, data: sf.data,
  };
  // A scaled shim: the mini diagrams are schematic reductions, drawn directly
  // rather than transformed, so that no coordinate is implied to be a scaling
  // of a real one.
  const sub = Object.assign({}, ctx, { sf: proxy });
  void sub;
  const map = (px, py) => [ox + (px - b.x) * s, oy + (py - b.y) * s];

  const [x0, y0] = map(b.x + 20, b.y + 20);
  const [x1, y1] = map(b.x + b.w - 20, b.y + b.h - 20);
  strokeRect(sf, x0, y0, x1 - x0, y1 - y0, 1, RULE);

  const prefix = ctx.area.prefix;
  const accent = ctx.accent;
  if (prefix === 'ZZY') {
    const [lx0, ly0] = map(140, 340);
    const [lx1, ly1] = map(600, 780);
    strokeRound(sf, lx0, ly0, lx1 - lx0, ly1 - ly0, 8, routeId === 'Z-R01' ? 4 : 1,
      routeId === 'Z-R01' ? accent : RULE);
    const [tx0, ty0] = map(690, 340);
    const [tx1, ty1] = map(1090, 780);
    strokeRect(sf, tx0, ty0, tx1 - tx0, ty1 - ty0, routeId === 'Z-R02' ? 4 : 1,
      routeId === 'Z-R02' ? accent : RULE);
    if (routeId === 'Z-R02') hatch(sf, tx0 + 2, ty0 + 2, tx1 - tx0 - 4, ty1 - ty0 - 4, ACCENT_SOFT.ZZY, 9, 2);
    if (routeId === 'Z-R03') {
      const [ax, ay] = map(b.x + 22, 300);
      const [bx2] = map(b.x + b.w - 22, 300);
      dashRow(sf, ax, bx2, ay, 4, accent, 12, 7);
    }
    if (routeId === 'Z-R04') {
      const [ax, ay] = map(b.x + 22, 850);
      const [bx2] = map(b.x + b.w - 22, 850);
      dashDotLine(sf, ax, ay, bx2, ay, 3, accent);
    }
    if (routeId === 'Z-R05') {
      const [ax, ay] = map(1130, 300);
      const [, by2] = map(1130, 870);
      dotLine(sf, ax, ay, ax, by2, 3.5, accent);
      for (const my2 of [430, 560, 690]) {
        const [sx2, sy2] = map(1130, my2);
        const [ex2] = map(1094, my2);
        dotLine(sf, sx2, sy2, ex2, sy2, 3.5, accent);
      }
    }
  } else if (prefix === 'AIO') {
    const [cx0, cy0] = map(420, 400);
    const [cx1, cy1] = map(860, 740);
    strokeRect(sf, cx0, cy0, cx1 - cx0, cy1 - cy0, routeId === 'O-R02' ? 3 : 1,
      routeId === 'O-R02' ? accent : RULE);
    const [fx0, fy0] = map(130, 800);
    const [fx1, fy1] = map(1220, 840);
    strokeRect(sf, fx0, fy0, fx1 - fx0, fy1 - fy0, routeId === 'O-R03' ? 3 : 1,
      routeId === 'O-R03' ? accent : RULE);
    if (routeId === 'O-R01') {
      const [sx2, sy2] = map(220, 430);
      const [ex2, ey2] = map(380, 650);
      strokeRect(sf, sx2, sy2, ex2 - sx2, ey2 - sy2, 3, accent);
    }
    if (routeId === 'O-R04') {
      const [ax, ay] = map(866, 570);
      const [bx2] = map(960, 570);
      const [, cy2] = map(960, 790);
      dashLine(sf, ax, ay, bx2, ay, 3, accent, 8, 6);
      dashLine(sf, bx2, ay, bx2, cy2, 3, accent, 8, 6);
    }
    if (routeId === 'O-R05') {
      const [ax, ay] = map(1244, 320);
      const [, by2] = map(1244, 866);
      const [ex2] = map(150, 866);
      dotLine(sf, ax, ay, ax, by2, 3.5, accent);
      dotLine(sf, ax, by2, ex2, by2, 3.5, accent);
    }
  } else {
    const pos = {
      arrive: map(940, 460), transfer: map(400, 460),
      stay: map(400, 762), repair: map(940, 762),
    };
    for (const role of ['arrive', 'transfer', 'stay', 'repair']) {
      fillPoly(sf, ringPts(pos[role][0], pos[role][1], 15, 13, 30), RULE);
    }
    const link = { 'D-R01': ['arrive', 'transfer'], 'D-R02': ['transfer', 'stay'], 'D-R03': ['stay', 'repair'] };
    if (link[routeId]) {
      const a = pos[link[routeId][0]];
      const z = pos[link[routeId][1]];
      const dx = z[0] - a[0];
      const dy = z[1] - a[1];
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      arrow(sf, a[0] + (dx / len) * 18, a[1] + (dy / len) * 18,
        z[0] - (dx / len) * 20, z[1] - (dy / len) * 20, 3, accent, 11);
    }
    if (routeId === 'D-R04') {
      const p1 = map(1046, 762);
      const p2 = map(1140, 762);
      const p3 = map(1140, 460);
      const p4 = map(1006, 460);
      polyline(sf, [p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]], 3, accent);
    }
    if (routeId === 'D-R05') {
      const a = map(260, 380);
      const c = map(1090, 860);
      dotLine(sf, a[0], a[1], c[0], a[1], 3.5, accent);
      dotLine(sf, c[0], a[1], c[0], c[1], 3.5, accent);
      dotLine(sf, c[0], c[1], a[0], c[1], 3.5, accent);
      dotLine(sf, a[0], c[1], a[0], a[1], 3.5, accent);
    }
  }
  gop('mini', routeId, Math.round(s * 1000));
}

// ---------------------------------------------------------------------------
// 16. Concept 03 - reversible module sections
// ---------------------------------------------------------------------------

function sectionDrawing(ctx, sec, box) {
  const { sf, accent } = ctx;
  const g = box.y + 200;
  gop('section', sec.id, box.x, box.y);

  // ground line: the only datum the drawing has, and it carries no level
  fillRect(sf, box.x + 60, g, box.w - 120, 3, INK);
  for (let x = box.x + 60; x < box.x + box.w - 60; x += 20) {
    segment(sf, x, g + 3, x - 8, g + 13, 1, MUTED);
  }

  // two demountable module volumes standing on the ground, no foundation
  fillRect(sf, box.x + 150, g - 80, 180, 80, ACCENT_SOFT[ctx.area.prefix]);
  strokeRect(sf, box.x + 150, g - 80, 180, 80, 3, INK);
  fillRect(sf, box.x + 370, g - 104, 220, 104, ACCENT_SOFT[ctx.area.prefix]);
  strokeRect(sf, box.x + 370, g - 104, 220, 104, 3, INK);

  // demountable canopy over both
  dashLine(sf, box.x + 130, g - 140, box.x + 630, g - 140, 4, INK, 15, 9);
  fillRect(sf, box.x + 130, g - 140, 4, 36, INK);
  fillRect(sf, box.x + 626, g - 140, 4, 36, INK);

  // mechanically fixed feet, shown as removable connections
  for (const fx of [box.x + 160, box.x + 310, box.x + 380, box.x + 570]) {
    fillRect(sf, fx, g - 8, 12, 8, accent);
  }

  const dims = sec.dimensions;
  const pending = (d) => d.value === null || d.value === undefined || d.basis_type === 'pending';
  // Every section dimension is now a metre quantity, so this guard should never fire. It
  // stays as a drawing-side refusal: a dimension line renders a length against the section,
  // and a value in any other unit would be drawn to a scale it does not have. Units are
  // printed as declared, never assumed.
  const drawable = (d) => d && d.unit === 'm';
  const label = (d, i) => 'D' + (i + 1) + (pending(d) ? '  ' + UI[ctx.lang].pending
    : '  ' + d.value + ' ' + d.unit);
  if (drawable(dims[0])) dimH(sf, box.x + 150, box.x + 590, g - 168, label(dims[0], 0), pending(dims[0]), accent);
  if (drawable(dims[1])) dimH(sf, box.x + 370, box.x + 590, g + 46, label(dims[1], 1), pending(dims[1]), accent);
  if (drawable(dims[2])) dimV(sf, box.x + 110, g - 80, g, label(dims[2], 2), pending(dims[2]), accent, 'left');
  if (drawable(dims[3])) dimV(sf, box.x + 660, g - 140, g, label(dims[3], 3), pending(dims[3]), accent, 'right');
}

function render03(ctx) {
  const { sf, area, design, lang, ui, accent } = ctx;
  const soft = ACCENT_SOFT[area.prefix];

  panel(sf, M, BODY_Y, CW, 58, soft);
  fillRect(sf, M, BODY_Y, 6, 58, accent);
  const cuts = design.plan.cut_keys.map(
    (c) => c.key + ' -> ' + c.section_id + ': ' + L(c, 'note', lang)).join('     ');
  line(sf, ui.cutkeys, M + 22, BODY_Y + 36, 300, { size: 16, weight: 'bold', color: accent });
  line(sf, cuts, M + 330, BODY_Y + 36, CW - 356, { size: 15, min: 9, color: INK });

  const sy = BODY_Y + 74;
  const sh = 482;
  for (let i = 0; i < design.sections.length; i++) {
    const sec = design.sections[i];
    const x = i === 0 ? M : 1020;
    const inner = titled(sf, x, sy, 916, sh,
      sec.key + '  ·  ' + sec.id + '  ·  ' + L(sec, 'title', lang), soft, accent);
    sectionDrawing(ctx, sec, { x: inner.x, y: inner.y, w: inner.w, h: 280 });
    para(sf, L(sec, 'shows', lang), inner.x, inner.y + 296, inner.w, inner.h - 296,
      { size: 15, min: 10, lh: 1.44, color: INK });
  }

  const ty = sy + sh + 16;
  const th = BODY_B - ty;
  const tbl = titled(sf, M, ty, CW, th, ui.dims, PANEL2, INK);
  const all = [];
  for (const sec of design.sections) for (const d of sec.dimensions) all.push([sec, d]);
  const colW = (tbl.w - 24) / 2;
  const rowH = tbl.h / 4;
  for (let i = 0; i < all.length; i++) {
    const [sec, d] = all[i];
    const col = i < 4 ? 0 : 1;
    const row = i % 4;
    const x = tbl.x + col * (colW + 24);
    const y = tbl.y + row * rowH;
    if (row > 0) fillRect(sf, x, y - 2, colW, 1, RULE);
    const pending = d.value === null || d.value === undefined || d.basis_type === 'pending';
    line(sf, sec.key + (i % 4 + 1 <= 4 ? '' : '') + '  ' + d.id, x, y + 20, 300,
      { size: 14, weight: 'bold', color: accent });
    line(sf, L(d, 'label', lang), x + 310, y + 20, colW - 310, { size: 14, min: 9, color: INK });
    const value = pending ? ui.pending : String(d.value) + ' ' + d.unit;
    line(sf, value, x, y + 48, 250, { size: 18, min: 11, weight: 'bold', color: pending ? WARN : GOOD });
    const basis = BASIS_LABEL[lang][d.basis_type] || d.basis_type;
    const bw = Math.round(widthOf(basis, 13, 'bold', 0)) + 20;
    chip(sf, x + 258, y + 30, bw, 24, basis, pending ? WARN_SOFT : GOOD_SOFT,
      pending ? WARN : GOOD, 13);
    line(sf, d.status, x + 268 + bw, y + 48, colW - 278 - bw, { size: 13, min: 9, color: MUTED });
  }
}

// ---------------------------------------------------------------------------
// 17. Concept 04 - access, operations and seasons
// ---------------------------------------------------------------------------

function render04(ctx) {
  const { sf, area, design, lang, ui, accent } = ctx;
  const soft = ACCENT_SOFT[area.prefix];
  const chain = design.step_free_chain;
  const seasonal = design.seasonal_operations;

  const chainPanel = titled(sf, M, BODY_Y, CW, 254, ui.chain + '  ·  ' + chain.id, soft, accent);
  const nodes = chain.nodes;
  const segs = chain.segments;
  const nx = (i) => chainPanel.x + 84 + i * ((chainPanel.w - 168) / (nodes.length - 1));
  const ny = chainPanel.y + 78;
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    const x0 = nx(i);
    const x1 = nx(i + 1);
    gop('seg', s.id, x0, x1);
    fillRect(sf, x0, ny - 4, x1 - x0, 8, accent);
    const cw = s.clear_width;
    line(sf, s.id + '  ' + cw.value + ' ' + cw.unit, (x0 + x1) / 2, ny - 40, x1 - x0 - 20,
      { size: 14, min: 9, weight: 'bold', color: INK, align: 'center' });
    line(sf, ui.gradient + '/' + ui.crossfall + ': ' + ui.pending, (x0 + x1) / 2, ny - 20,
      x1 - x0 - 20, { size: 12, min: 8, color: WARN, align: 'center' });
  }
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    const x = nx(i);
    gop('node', n.id, x, ny);
    fillPoly(sf, circlePts(x, ny, 30, 40), WHITE);
    fillPoly(sf, ringPts(x, ny, 30, 26, 40), accent);
    line(sf, String(i + 1), x, ny + 7, 40, { size: 19, weight: 'bold', color: INK, align: 'center' });
    line(sf, n.id, x, ny + 58, 130, { size: 13, weight: 'bold', color: accent, align: 'center' });
    para(sf, L(n, 'name', lang), x - 68, ny + 66, 136, 50,
      { size: 13, min: 9, lh: 1.34, color: INK, align: 'center' });
  }

  const ey = BODY_Y + 270;
  const eq = titled(sf, M, ey, CW, 164, ui.equivalents, PANEL2, INK, 36);
  const eqKeys = ['tactile', 'visual_contrast', 'audio', 'staffed', 'paper', 'telephone'];
  const eqW = (eq.w - 5 * 12) / 6;
  for (let i = 0; i < eqKeys.length; i++) {
    const k = eqKeys[i];
    const x = eq.x + i * (eqW + 12);
    panel(sf, x, eq.y, eqW, eq.h, WHITE);
    line(sf, EQUIV_LABEL[lang][k], x + 10, eq.y + 24, eqW - 20,
      { size: 15, min: 10, weight: 'bold', color: accent });
    para(sf, L(chain.equivalents[k], 'provided', lang), x + 10, eq.y + 32, eqW - 20, eq.h - 60,
      { size: 12, min: 8, lh: 1.34, color: INK });
    line(sf, chain.equivalents[k].status, x + 10, eq.y + eq.h - 8, eqW - 20,
      { size: 11, min: 8, color: MUTED });
  }

  const my = ey + 180;
  const mo = titled(sf, M, my, CW, 220, ui.modes, PANEL2, INK, 36);
  const modes = chain.operating_modes;
  const moW = (mo.w - 6 * 10) / 7;
  for (let i = 0; i < modes.length; i++) {
    const m = modes[i];
    const x = mo.x + i * (moW + 10);
    panel(sf, x, mo.y, moW, mo.h, WHITE);
    fillRect(sf, x, mo.y, moW, 3, accent);
    line(sf, MODE_LABEL[lang][m.mode] || m.mode, x + 8, mo.y + 24, moW - 16,
      { size: 15, min: 10, weight: 'bold', color: INK });
    para(sf, L(m, 'route_availability', lang), x + 8, mo.y + 32, moW - 16, 60,
      { size: 11, min: 8, lh: 1.32, color: INK });
    fillRect(sf, x + 8, mo.y + 98, moW - 16, 1, RULE);
    line(sf, ui.stopaction, x + 8, mo.y + 118, moW - 16, { size: 11, min: 8, color: WARN });
    para(sf, L(m, 'stop_action', lang), x + 8, mo.y + 122, moW - 16, mo.h - 126,
      { size: 11, min: 8, lh: 1.32, color: INK });
  }

  const ty = my + 236;
  const th = BODY_B - ty;
  const tp = titled(sf, M, ty, 1176, th, ui.seasons, PANEL2, INK, 36);
  const topics = seasonal.topics;
  const tw = (tp.w - 3 * 12) / 4;
  const trh = (tp.h - 12) / 2;
  for (let i = 0; i < topics.length; i++) {
    const t = topics[i];
    const x = tp.x + (i % 4) * (tw + 12);
    const y = tp.y + Math.floor(i / 4) * (trh + 12);
    panel(sf, x, y, tw, trh, WHITE);
    line(sf, TOPIC_LABEL[lang][t.id] || t.id, x + 10, y + 22, tw - 20,
      { size: 14, min: 9, weight: 'bold', color: accent });
    para(sf, L(t, 'shown', lang), x + 10, y + 30, tw - 20, trh - 56,
      { size: 12, min: 8, lh: 1.34, color: INK });
    line(sf, t.spatial_ref, x + 10, y + trh - 10, tw - 20, { size: 11, min: 8, color: MUTED });
  }

  const sn = titled(sf, 1264, ty, 672, th, ui.snow, PANEL2, INK, 36);
  const snow = seasonal.snow_storage;
  // This panel flows from the measured height of the rule text instead of fixed
  // offsets. The Chinese and English rules wrap to different line counts, so a
  // single set of constants puts the pilot line on top of the last storage bay
  // label in one language while looking correct in the other.
  const rule = para(sf, L(snow, 'rule', lang), sn.x, sn.y, sn.w, 70,
    { size: 15, min: 10, lh: 1.42, color: INK });
  let sy = sn.y + rule.height + 8;
  const rows = [
    [ui.overlapsfree, snow.overlaps_step_free_route],
    [ui.overlapstac, snow.overlaps_tactile_route],
  ];
  for (let i = 0; i < rows.length; i++) {
    const y = sy + i * 28;
    line(sf, rows[i][0], sn.x, y + 20, sn.w - 90, { size: 14, min: 10, color: INK });
    chip(sf, sn.x + sn.w - 78, y + 2, 78, 26, rows[i][1] ? ui.yes : ui.no, GOOD_SOFT, GOOD, 14);
  }
  sy += rows.length * 28 + 6;
  for (let i = 0; i < snow.locations.length; i++) {
    const loc = snow.locations[i];
    const y = sy + i * 34;
    stipple(sf, sn.x, y, 34, 30, MUTED);
    strokeRect(sf, sn.x, y, 34, 30, 1, RULE);
    line(sf, loc.id, sn.x + 46, y + 14, 90, { size: 13, weight: 'bold', color: accent });
    line(sf, L(loc, 'name', lang), sn.x + 46, y + 30, sn.w - 46,
      { size: 13, min: 9, color: INK });
  }
  sy += snow.locations.length * 34;
  const pilot = seasonal.pilot;
  const pilotBaseline = sy + 18;
  if (pilotBaseline > sn.y + sn.h) {
    throw new Error('build-plates: snow storage panel overflows its box in ' + lang +
      ' (' + Math.round(pilotBaseline) + ' > ' + Math.round(sn.y + sn.h) + ')');
  }
  line(sf, ui.days + ': ' + pilot.days + '   ·   ' + ui.yearround + ': ' +
    (pilot.sufficient_for_year_round ? ui.yes : ui.no), sn.x, pilotBaseline, sn.w,
    { size: 14, min: 9, weight: 'bold', color: WARN });
}

// ---------------------------------------------------------------------------
// 18. Concept 05 - governance, stop conditions and evidence
// ---------------------------------------------------------------------------

function render05(ctx) {
  const { sf, area, design, lang, ui, accent } = ctx;
  const env = design.phase1_envelope;
  const seasonal = design.seasonal_operations;

  const stateCards = [
    [STATUS_LABEL[lang].authorization_state, STATUS_VALUE[lang][env.authorization_state] || env.authorization_state],
    [STATUS_LABEL[lang].funding_state, STATUS_VALUE[lang][env.funding_state] || env.funding_state],
    [ui.pilotstart, ui.no],
  ];
  for (let i = 0; i < stateCards.length; i++) {
    const x = M + i * 464;
    panel(sf, x, BODY_Y, 448, 158, WARN_SOFT);
    fillRect(sf, x, BODY_Y, 448, 5, WARN);
    line(sf, stateCards[i][0], x + 20, BODY_Y + 46, 408, { size: 17, min: 11, color: INK });
    line(sf, stateCards[i][1], x + 20, BODY_Y + 106, 408,
      { size: 40, min: 18, weight: 'bold', color: WARN });
  }
  const bl = titled(sf, 1456, BODY_Y, 480, 158, ui.blocked, PANEL2, INK, 36);
  let bx = bl.x;
  for (const g of env.blocked_by) {
    const w = tag(sf, g, bx, bl.y + 6, WARN_SOFT, WARN, 20);
    bx += w + 10;
  }
  line(sf, env.id + '  ·  reversible: ' + (env.reversible ? ui.yes : ui.no),
    bl.x, bl.y + 74, bl.w, { size: 14, min: 10, color: MUTED });

  const ey = BODY_Y + 174;
  const parts = [
    ['description', ui.envelope],
    ['removal', lang === 'zh' ? '拆除' : 'Removal'],
    ['restoration', lang === 'zh' ? '恢复' : 'Restoration'],
    ['liability', lang === 'zh' ? '责任' : 'Liability'],
  ];
  for (let i = 0; i < parts.length; i++) {
    const x = i % 2 === 0 ? M : 1020;
    const y = ey + Math.floor(i / 2) * 170;
    const inner = titled(sf, x, y, 916, 154, parts[i][1], PANEL2, INK, 36);
    para(sf, L(env, parts[i][0], lang), inner.x, inner.y, inner.w, inner.h,
      { size: 16, min: 10, lh: 1.44, color: INK });
  }

  const ty = ey + 356;
  const ths = seasonal.thresholds;
  for (let i = 0; i < ths.length; i++) {
    const t = ths[i];
    const x = i === 0 ? M : 1020;
    const inner = titled(sf, x, ty, 916, 208, ui.thresholds + '  ·  ' + t.id, WARN_SOFT, WARN);
    line(sf, L(t, 'label', lang), inner.x, inner.y + 20, inner.w,
      { size: 18, min: 11, weight: 'bold', color: INK });
    // The target sentence is one line in Chinese and two in English, so the status
    // rows follow its measured height rather than a fixed offset that pushed the
    // last row out through the bottom of the panel.
    const target = para(sf, L(t, 'proposed_target', lang), inner.x, inner.y + 32, inner.w, 60,
      { size: 15, min: 10, lh: 1.4, color: INK });
    const rows = [
      [ui.approved, t.approved_threshold === null ? ui.nullv : String(t.approved_threshold)],
      [ui.pilotstart, t.pilot_start_allowed ? ui.yes : ui.no],
      [ui.status, t.status],
    ];
    const rowTop = inner.y + 32 + target.height + 10;
    const lastBaseline = rowTop + (rows.length - 1) * 22 + 16;
    if (lastBaseline > inner.y + inner.h) {
      throw new Error('build-plates: threshold panel ' + t.id + ' overflows its box in ' +
        lang + ' (' + Math.round(lastBaseline) + ' > ' + Math.round(inner.y + inner.h) + ')');
    }
    for (let r = 0; r < rows.length; r++) {
      const y = rowTop + r * 22;
      line(sf, rows[r][0], inner.x, y + 16, 320, { size: 14, min: 10, color: MUTED });
      line(sf, rows[r][1], inner.x + 330, y + 16, inner.w - 330,
        { size: 14, min: 10, weight: 'bold', color: WARN });
    }
  }

  const gy = ty + 224;
  const gh = BODY_B - gy;
  const stopBox = titled(sf, M, gy, 1216, gh, ui.stop, PANEL2, INK, 36);
  const pilot = seasonal.pilot;
  line(sf, ui.days + ': ' + pilot.days + '   ·   ' + ui.yearround + ': ' +
    (pilot.sufficient_for_year_round ? ui.yes : ui.no), stopBox.x, stopBox.y + 20, stopBox.w,
    { size: 16, min: 10, weight: 'bold', color: WARN });
  para(sf, L(pilot, 'note', lang), stopBox.x, stopBox.y + 34, stopBox.w, stopBox.h - 38,
    { size: 15, min: 10, lh: 1.44, color: INK });

  const evBox = titled(sf, 1296, gy, 640, gh, ui.evidence, PANEL2, INK, 36);
  if (area.prefix === 'DZS') {
    line(sf, ui.consequence, evBox.x, evBox.y + 18, evBox.w,
      { size: 15, min: 10, weight: 'bold', color: WARN });
    line(sf, design.evidence_consequence, evBox.x, evBox.y + 44, evBox.w,
      { size: 17, min: 10, weight: 'bold', color: INK });
    para(sf, L(design, 'evidence_consequence_note', lang), evBox.x, evBox.y + 54,
      evBox.w, 88, { size: 13, min: 9, lh: 1.4, color: INK });
    line(sf, ui.excluded, evBox.x, evBox.y + 162, evBox.w,
      { size: 15, min: 10, weight: 'bold', color: WARN });
    let y = evBox.y + 172;
    for (const e of design.excluded_evidence) {
      line(sf, EXCLUDED_LABEL[lang][e.category] || e.category, evBox.x, y + 18, evBox.w,
        { size: 14, min: 10, weight: 'bold', color: INK });
      y += 26;
    }
  } else {
    para(sf, design.evidence_refs.join('    '), evBox.x, evBox.y, evBox.w, 92,
      { size: 14, min: 9, lh: 1.44, color: INK });
    fillRect(sf, evBox.x, evBox.y + 104, evBox.w, 1, RULE);
    para(sf, env.evidence_refs.join('    '), evBox.x, evBox.y + 114, evBox.w,
      evBox.h - 118, { size: 14, min: 9, lh: 1.44, color: MUTED });
  }
}

const CONCEPT_RENDER = {
  '01': render01, '02': render02, '03': render03, '04': render04, '05': render05,
};

// ---------------------------------------------------------------------------
// 19. Plate rendering
// ---------------------------------------------------------------------------

function drawPlate(spec) {
  const area = spec.area;
  const sf = F.createSurface(OUT_W, OUT_H, PAPER);
  GOPS = [];
  const ctx = {
    sf,
    area,
    design: area.design,
    lang: spec.language,
    ui: UI[spec.language],
    accent: ACCENT[area.prefix],
  };
  chromeHeader(sf, spec);
  CONCEPT_RENDER[spec.concept.concept_id](ctx);
  chromeFooter(sf, spec);
  const ops = GOPS;
  GOPS = null;
  return { buffer: F.encodePNG(sf), ops: ops.join('\n') };
}

// ---------------------------------------------------------------------------
// 20. Registry
// ---------------------------------------------------------------------------

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function canonical(value) {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  if (value && typeof value === 'object') {
    return '{' + Object.keys(value).sort().map(
      (k) => JSON.stringify(k) + ':' + canonical(value[k])).join(',') + '}';
  }
  return JSON.stringify(value === undefined ? null : value);
}

function idsFor(area, conceptId) {
  const d = area.design;
  const sectionIds = d.sections.map((s) => s.id);
  const inSections = (ref) => sectionIds.indexOf(ref) >= 0;
  if (conceptId === '03') {
    return {
      drawing_ids: sectionIds.slice(),
      component_ids: d.components.filter((c) => inSections(c.drawing_ref)).map((c) => c.id),
      route_ids: d.routes.filter((r) => inSections(r.drawing_ref)).map((r) => r.id),
    };
  }
  if (conceptId === '05') {
    return {
      drawing_ids: sectionIds.slice(),
      component_ids: d.components.map((c) => c.id),
      route_ids: d.routes.map((r) => r.id),
    };
  }
  if (conceptId === '04') {
    return {
      drawing_ids: [d.plan.id].concat(sectionIds),
      component_ids: d.components.map((c) => c.id),
      route_ids: d.routes.map((r) => r.id),
    };
  }
  return {
    drawing_ids: [d.plan.id],
    component_ids: d.components.map((c) => c.id),
    route_ids: d.routes.map((r) => r.id),
  };
}

function claimStatus(area) {
  return area.prefix === 'DZS'
    ? 'no_position_claimed'
    : 'provisional_extent_not_official_boundary';
}

/**
 * Registry prose is not only read, it is drawn: build-drawings.js prints
 * title and alt_text into the A3 and A0 captions using the same font subset.
 * A record whose text the font cannot set would fail there rather than here,
 * in a builder this one does not own, so the check belongs at this end.
 */
function assertRegistryGlyphs(registry) {
  const missing = new Map();
  const visit = (value, where) => {
    if (typeof value === 'string') {
      for (const ch of value) {
        const cp = ch.codePointAt(0);
        if (cp < 0x20) continue;
        if (!F.hasGlyph(ch, 'regular') || !F.hasGlyph(ch, 'bold')) {
          if (!missing.has(ch)) missing.set(ch, where);
        }
      }
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => visit(item, where + '[' + i + ']'));
    } else if (value && typeof value === 'object') {
      for (const key of Object.keys(value)) {
        if (key === 'glyph_substitutions') continue;   // it names the gaps by design
        visit(value[key], where ? where + '.' + key : key);
      }
    }
  };
  visit(registry, '');
  if (missing.size === 0) return;
  const list = Array.from(missing.entries()).map(
    ([ch, where]) => ch + ' U+' + ch.codePointAt(0).toString(16).toUpperCase() + ' at ' + where);
  throw new Error('build-plates: the font subset cannot set ' + missing.size +
    ' code point(s) used in registry prose, which the drawings builder would have to print: ' +
    list.join('; '));
}

function buildAll() {
  const artifacts = expectedArtifacts();
  const byArea = new Map(PLATE_AREAS.map((a) => [a.area_feature_id, a]));
  const rendered = [];

  for (const artifact of artifacts) {
    const area = byArea.get(artifact.area.area_feature_id);
    const spec = {
      artifact_id: artifact.artifact_id,
      plate_id: artifact.plate_id,
      language: artifact.language,
      translation_of: artifact.translation_of,
      file: artifact.file,
      area,
      concept: artifact.concept,
    };
    const out = drawPlate(spec);
    rendered.push({ artifact, spec, buffer: out.buffer, ops: out.ops });
  }
  flushGlyphGuard();

  // The two languages of one plate must be different rasters carrying the same
  // geometry. Both halves of that are asserted rather than assumed.
  const opsByPlate = new Map();
  for (const r of rendered) {
    const seen = opsByPlate.get(r.artifact.plate_id);
    if (seen === undefined) opsByPlate.set(r.artifact.plate_id, r.ops);
    else if (seen !== r.ops) {
      throw new Error('build-plates: ' + r.artifact.plate_id +
        ' draws different geometry in its two languages');
    }
  }
  const bufByPlate = new Map();
  for (const r of rendered) {
    const key = r.artifact.plate_id;
    const seen = bufByPlate.get(key);
    if (seen === undefined) bufByPlate.set(key, r.buffer);
    else if (seen.equals(r.buffer)) {
      throw new Error('build-plates: ' + key + ' rendered byte-identical rasters, so one language was never drawn');
    }
  }

  const records = [];
  for (const r of rendered) {
    const { artifact, spec, buffer } = r;
    const area = spec.area;
    const conceptId = artifact.concept.concept_id;
    const prose = PROSE[artifact.plate_id];
    const ids = idsFor(area, conceptId);
    const a0 = A0_PLACEMENT[conceptId];
    const a3page = A3_FIRST_PAGE[area.prefix] + Number(conceptId) - 1;
    const board = A0_BOARD[area.prefix];
    const evidence = EVIDENCE[artifact.plate_id];

    const semantic = 'sem-' + sha256(canonical({
      plate_id: artifact.plate_id,
      area_feature_id: area.area_feature_id,
      area_id: area.area_id,
      concept_id: conceptId,
      concept_slug: artifact.concept.slug,
      drawing_ids: ids.drawing_ids,
      component_ids: ids.component_ids,
      route_ids: ids.route_ids,
      claim_status: claimStatus(area),
      spatial_mode: area.spatial_mode,
      georeferenced: area.georeferenced,
      evidence_refs: evidence,
    })).slice(0, 24);
    const geometry = 'geo-' + sha256(opsByPlate.get(artifact.plate_id)).slice(0, 24);

    records.push({
      artifact_id: artifact.artifact_id,
      plate_id: artifact.plate_id,
      language: artifact.language,
      translation_of: artifact.translation_of,
      file: artifact.file,
      sha256: sha256(buffer),
      bytes: buffer.length,
      width_px: OUT_W,
      height_px: OUT_H,
      area_feature_id: area.area_feature_id,
      area_id: area.area_id,
      concept_id: conceptId,
      concept_slug: artifact.concept.slug,
      title: L(prose, 'title', artifact.language),
      alt_text: L(prose, 'alt', artifact.language),
      extended_description: L(prose, 'ext', artifact.language),
      claim_limits: L(prose, 'lim', artifact.language),
      georeferenced: area.georeferenced,
      spatial_mode: area.spatial_mode,
      scale_mode: 'not_to_scale',
      north_arrow: false,
      claim_status: claimStatus(area),
      drawing_ids: ids.drawing_ids,
      component_ids: ids.component_ids,
      route_ids: ids.route_ids,
      status: {
        verified: REQUIRED_STATUS.verified,
        accessibility_gate: REQUIRED_STATUS.accessibility_gate,
        survey: REQUIRED_STATUS.survey,
        professional_audit: REQUIRED_STATUS.professional_audit,
        authorization_state: REQUIRED_STATUS.authorization_state,
        funding_state: REQUIRED_STATUS.funding_state,
      },
      evidence_refs: evidence.slice(),
      placements: {
        viewer_file: artifact.language === 'en' ? 'visual/index.en.html' : 'visual/index.html',
        viewer_anchor: 'plate-' + area.prefix.toLowerCase() + '-' + conceptId + '-' + artifact.language,
        a3: {
          document: artifact.language === 'en' ? 'drawings/a3-booklet.en.pdf' : 'drawings/a3-booklet.pdf',
          page: a3page,
          placement_id: 'a3-p' + String(a3page).padStart(2, '0') + '-plate',
        },
        a0: {
          document: artifact.language === 'en' ? 'drawings/a0-boards.en.pdf' : 'drawings/a0-boards.pdf',
          page: board,
          placement_id: 'a0-b' + board + '-' + conceptId,
          visual_rank: a0.visual_rank,
          area_fraction: a0.area_fraction,
        },
      },
      semantic_fingerprint: semantic,
      geometry_fingerprint: geometry,
    });
  }

  const plates = [];
  for (const area of PLATE_AREAS) {
    for (const concept of CONCEPTS) {
      const plateId = area.prefix + '-' + concept.concept_id;
      plates.push({
        plate_id: plateId,
        area_feature_id: area.area_feature_id,
        area_id: area.area_id,
        concept_id: concept.concept_id,
        concept_slug: concept.slug,
        sequence: Number(concept.concept_id),
        zh_artifact_id: plateId + '-zh',
        en_artifact_id: plateId + '-en',
      });
    }
  }

  const registry = {
    schema_version: '2.0.0',
    registry_id: 'adaptive-jingzhang-key-area-plates',
    generated_by: 'visual/assets/build-plates.js',
    source_record: 'visual/assets/key-area-design.json',
    source_record_id: DESIGN.record_id,
    note_zh: '十五张语义图纸，每张分别绘制中文本体与英文对照本，共三十个位图成果。' +
      'placements.a0.area_fraction 是该图在图板版面区（上部带与页脚带之间的区域）中所占的份额，' +
      '不是整幅介质框的份额；build-drawings.js 依此排版，排不下即报错。' +
      '所有图纸均不按比例、不设指北针；大钟寺（PROV-KEY-003）不主张任何落位。',
    note_en: 'Fifteen semantic plates, each rendered separately as a Chinese base raster and an ' +
      'English twin, for thirty raster artifacts. placements.a0.area_fraction is the share of the ' +
      "board's plate canvas (the 3194.39 x 1855.94 pt region between the header and footer bands), " +
      'not a share of the full media box; build-drawings.js lays the boards out to match and throws ' +
      'if a declared fraction cannot be placed. Every plate is not to scale and carries no north ' +
      'arrow; Dazhongsi (PROV-KEY-003) claims no position at all.',
    canvas: {
      width_px: OUT_W,
      height_px: OUT_H,
      aspect_ratio: '3:2',
      design_space: '2100 x 1400 design units, reduced uniformly by 6/7; nothing is stretched',
      colour_type: 'truecolour_rgb_8bit_non_interlaced',
      dpi: null,
      dpi_note_zh: '位图不含 pHYs 密度块，成图精度由版面中声明的面积份额决定，因此此处不给出一个无法成立的 dpi 值。',
      dpi_note_en: 'The rasters carry no pHYs chunk: printed resolution follows from the area fraction each plate is given on the sheet, so no dpi figure is asserted here.',
    },
    font: {
      family: F.PROVENANCE.family,
      source_file: F.PROVENANCE.sourceFile,
      license: F.PROVENANCE.license,
      license_url: F.PROVENANCE.licenseUrl,
    },
    glyph_substitutions: {
      note_zh: '字体子集缺少下列码位的字形。每条规则为保义改写，图上绘制的中文即为改写后的文本。',
      note_en: 'The font subset carries no glyph for the code points below. Every rule is a meaning-preserving rephrasing, and the Chinese rendered on the plates is the rephrased text.',
      missing_code_points: MISSING_GLYPH_CODEPOINTS,
      rules: SUBSTITUTIONS.map((r) => ({ from: r[0], to: r[1] })),
    },
    counts: { semantic_plates: 15, artifacts: 30, zh: 15, en: 15 },
    semantic_plates: plates,
    artifacts: records,
  };

  assertRegistryGlyphs(registry);

  return { registry, rendered };
}
// ---------------------------------------------------------------------------
// 21. Driver
// ---------------------------------------------------------------------------

function declaredFiles(rendered) {
  return new Set(rendered.map((r) => r.artifact.file.split('/').pop()));
}

function main(argv) {
  const check = argv.indexOf('--check') >= 0;
  const built = buildAll();
  const registryText = JSON.stringify(built.registry, null, 2) + '\n';

  if (check) {
    const differences = [];
    for (const r of built.rendered) {
      const p = path.join(PKG_ROOT, r.artifact.file);
      if (!fs.existsSync(p)) { differences.push(r.artifact.file + ': missing'); continue; }
      if (!fs.readFileSync(p).equals(r.buffer)) differences.push(r.artifact.file + ': differs');
    }
    if (!fs.existsSync(REGISTRY_PATH)) differences.push('visual/assets/area-plates.json: missing');
    else if (fs.readFileSync(REGISTRY_PATH, 'utf8') !== registryText) {
      differences.push('visual/assets/area-plates.json: differs');
    }
    const declared = declaredFiles(built.rendered);
    const strays = fs.existsSync(OUT_DIR)
      ? fs.readdirSync(OUT_DIR).filter((n) => n.startsWith(OUT_PREFIX) && !declared.has(n)).sort()
      : [];
    for (const s of strays) differences.push('assets/figures/' + s + ': undeclared key-area raster');

    process.stdout.write(JSON.stringify({
      mode: 'check',
      ok: differences.length === 0,
      semantic_plates: 15,
      artifacts: built.rendered.length,
      differences,
      notdef_drawn: NOTDEF_DRAWN,
    }, null, 2) + '\n');
    if (differences.length > 0) process.exitCode = 1;
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  let written = 0;
  let bytes = 0;
  for (const r of built.rendered) {
    fs.writeFileSync(path.join(PKG_ROOT, r.artifact.file), r.buffer);
    written++;
    bytes += r.buffer.length;
  }
  fs.writeFileSync(REGISTRY_PATH, registryText);

  const declared = declaredFiles(built.rendered);
  const strays = fs.readdirSync(OUT_DIR)
    .filter((n) => n.startsWith(OUT_PREFIX) && !declared.has(n)).sort();

  process.stdout.write(JSON.stringify({
    mode: 'write',
    ok: strays.length === 0,
    semantic_plates: 15,
    artifacts: written,
    zh: written / 2,
    en: written / 2,
    total_bytes: bytes,
    registry: 'visual/assets/area-plates.json',
    undeclared_key_area_rasters: strays,
    substitution_rules: SUBSTITUTIONS.length,
    missing_code_points: MISSING_GLYPH_CODEPOINTS.length,
    notdef_drawn: NOTDEF_DRAWN,
  }, null, 2) + '\n');
  if (strays.length > 0) process.exitCode = 1;
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (err) {
    process.stdout.write(JSON.stringify({
      mode: process.argv.indexOf('--check') >= 0 ? 'check' : 'write',
      ok: false,
      error: String(err && err.message ? err.message : err),
    }, null, 2) + '\n');
    process.exitCode = 2;
  }
}

module.exports = {
  __internal: { SUBSTITUTIONS, T, buildAll, PLATE_AREAS, PROSE, EVIDENCE },
};
