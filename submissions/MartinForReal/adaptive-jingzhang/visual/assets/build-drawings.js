#!/usr/bin/env node
'use strict';

/**
 * build-drawings.js
 *
 * Renders the four competition drawings from the package's bilingual
 * registries and writes them to drawings/:
 *
 *   drawings/a0-boards.pdf      zh  four A0 landscape boards
 *   drawings/a0-boards.en.pdf   en  the same four boards
 *   drawings/a3-booklet.pdf     zh  a cover plus fifteen A3 plate pages
 *   drawings/a3-booklet.en.pdf  en  the same sixteen pages
 *
 * Node standard library only; no npm dependencies. All glyph work is done by
 * the sibling module visual/assets/noto-sans-sc-subset.js; this file adds only
 * a PDF writer around it.
 *
 * ===========================================================================
 * WHY THIS BUILDER EXISTS
 * ===========================================================================
 * The previous drawings carried no embedded font program and no /ToUnicode
 * map: they named /Helvetica and /STSong-Light and relied on the viewer to
 * find them. Text in such a file is neither guaranteed to render nor
 * extractable. Every page written here uses an embedded Noto Sans SC subset
 * (a /FontFile2 CIDFontType2 with Identity-H encoding) and ships a /ToUnicode
 * CMap for every glyph actually drawn, so the text is both rendered from the
 * file itself and recoverable as Unicode by a parser.
 *
 * ===========================================================================
 * CONTENT SOURCES  (this file authors no user-visible wording of its own)
 * ===========================================================================
 *   visual/assets/regeneration-source.json          bilingual single source
 *   visual/assets/action-governance.json            P00-P11 governance rows
 *   visual/assets/area-plates.json                  plate registry (required)
 *   visual/assets/key-area-design.json              registered disclosures
 *   visual/assets/physarum-zero-jitter-ablation.json  zero-jitter comparison
 *   visual/assets/physarum-inputs.json  (frozen, read only)
 *   visual/assets/physarum-runs.json    (frozen, read only)
 *
 * Every string placed on a sheet is read from one of those records through
 * T()/TA(), which throw when a `<field>_<language>` key is absent. Labels that
 * did not yet exist were appended to regeneration-source.json ui_labels in
 * both languages under the `drawing_*` prefix and are read back from there.
 *
 * ===========================================================================
 * WHAT THE DRAWINGS DO NOT CLAIM
 * ===========================================================================
 * - The diagrams are topological. They carry no coordinate, no scale bar, no
 *   north arrow and no distance; the only lines drawn between nodes are the
 *   `blocked_by` relations already recorded in the registries.
 * - The Dazhongsi record carries georeferenced: false. Its panel is drawn as a
 *   non-georeferenced, non-station module diagram, its `non_station_note` is
 *   printed on the same panel, and no entrance, road, crossing, parcel,
 *   distance or station relationship is drawn or implied for it.
 * - Every action is printed with its authorization_state, funding_state and
 *   unresolved D gates. No authorized target exists and none is printed.
 * - The computation named on the sheets is the seeded Kruskal topology and
 *   selection-instability probe described in method_card; its wording is
 *   copied from that record and is not upgraded.
 *
 * ===========================================================================
 * GLYPH SUBSTITUTION  (see GLYPH_SUBSTITUTIONS below)
 * ===========================================================================
 * The font payloads in noto-sans-sc-subset.js are a snapshot taken before the
 * registries were last edited, so 47 code points now present in the registry
 * prose have no glyph in the subset. Drawing them would emit .notdef boxes.
 * As the sibling plate builder already does (area-plates.json records the same
 * mechanism under `glyph_substitutions`), this builder applies a table of
 * meaning-preserving substitutions at draw time only. The registries
 * themselves are never modified, the rule table is printed in the build
 * report, and drawText() still aborts the build if any character survives
 * substitution without a glyph, so no .notdef box can ship.
 *
 * ===========================================================================
 * DETERMINISM
 * ===========================================================================
 * No wall-clock time, no randomness. /CreationDate and /ModDate are the fixed
 * constant FIXED_DATE; the /ID is the SHA-256 of the assembled file body; all
 * streams use zlib.deflateSync at a fixed level. Running the builder twice
 * produces byte-identical files.
 *
 * ===========================================================================
 * CLI
 * ===========================================================================
 *   node visual/assets/build-drawings.js            write the four PDFs
 *   node visual/assets/build-drawings.js --check    compare only, write nothing
 * A single JSON report is printed to stdout. Exit 0 only on success.
 */

const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const crypto = require('node:crypto');

const typeface = require('./noto-sans-sc-subset.js');

// ---------------------------------------------------------------------------
// 0. Paths and constants
// ---------------------------------------------------------------------------

const ASSETS_DIR = __dirname;
const PACKAGE_ROOT = path.resolve(ASSETS_DIR, '..', '..');
const DRAWINGS_DIR = path.join(PACKAGE_ROOT, 'drawings');

const SOURCE_FILE = path.join(ASSETS_DIR, 'regeneration-source.json');
const GOVERNANCE_FILE = path.join(ASSETS_DIR, 'action-governance.json');
const PLATES_FILE = path.join(ASSETS_DIR, 'area-plates.json');
const DESIGN_FILE = path.join(ASSETS_DIR, 'key-area-design.json');
const GATES_FILE = path.join(ASSETS_DIR, 'gate-registry.json');
const ABLATION_FILE = path.join(ASSETS_DIR, 'physarum-zero-jitter-ablation.json');
const INPUTS_FILE = path.join(ASSETS_DIR, 'physarum-inputs.json');
const RUNS_FILE = path.join(ASSETS_DIR, 'physarum-runs.json');

// 1189 x 841 mm and 420 x 297 mm, landscape, in PostScript points.
const A0 = Object.freeze({ width: 3370.39, height: 2383.94 });
const A3 = Object.freeze({ width: 1190.55, height: 841.89 });

// Fixed so that two builds of the same content are byte-identical.
const FIXED_DATE = 'D:20260101000000Z';

const LANGUAGES = ['zh', 'en'];

// The five plates every key area gets, in the order they are numbered and in the
// order a reader meets them: what is on the ground and what the drawing refuses to
// claim about it, then what happens where, then what would actually be built, then
// how it is reached and kept through a winter, then who may stop it and on what
// evidence. The order is fixed because the argument only holds in that order.
const PLATE_CONCEPTS = Object.freeze([
  'situation-claim-limits',
  'program-flows',
  'reversible-module-sections',
  'access-operations-seasons',
  'governance-stop-evidence',
]);

// Which A0 board and which A3 pages an area's plates land on. Boards 1-3 are one
// area each; board 4 is the cross-area synthesis and carries no plate.
const AREA_SHEETS = Object.freeze({
  ZZY: { board: 1, firstPage: 2 },
  AIO: { board: 2, firstPage: 7 },
  DZS: { board: 3, firstPage: 12 },
});

const A0_BOARDS = 4;
const A3_PAGES = 16;

// Every field a plate record has to carry before it may be drawn. A missing field
// is a build failure and not a blank on a board, because a blank on a board reads
// as "nothing to say here" rather than as "the registry is incomplete".
const PLATE_RECORD_FIELDS = Object.freeze([
  'artifact_id', 'plate_id', 'area_feature_id', 'concept_id', 'concept_slug',
  'language', 'translation_of', 'file', 'width_px', 'height_px',
  'title', 'alt_text', 'extended_description', 'claim_limits',
  'georeferenced', 'north_arrow', 'scale_mode', 'status', 'placements',
]);

const TARGETS = [
  { file: 'drawings/a0-boards.pdf', kind: 'a0', language: 'zh' },
  { file: 'drawings/a0-boards.en.pdf', kind: 'a0', language: 'en' },
  { file: 'drawings/a3-booklet.pdf', kind: 'a3', language: 'zh' },
  { file: 'drawings/a3-booklet.en.pdf', kind: 'a3', language: 'en' },
];

// ---------------------------------------------------------------------------
// 1. Palette
// ---------------------------------------------------------------------------

const INK = [0.09, 0.09, 0.10];
const MUTED = [0.36, 0.37, 0.40];
const FAINT = [0.55, 0.56, 0.59];
const RULE = [0.76, 0.77, 0.80];
const HAIR = [0.87, 0.88, 0.90];
const PAPER = [1, 1, 1];
const PANEL = [0.968, 0.969, 0.974];
const PANEL_DEEP = [0.926, 0.930, 0.940];
const CHAIN = [0.043, 0.286, 0.404];
const CHAIN_SOFT = [0.855, 0.898, 0.925];
const GATE = [0.451, 0.318, 0.098];
const GATE_SOFT = [0.957, 0.918, 0.847];
const NODE_FILL = [0.988, 0.988, 0.992];

// ---------------------------------------------------------------------------
// 2. Glyph substitution and the .notdef guard
// ---------------------------------------------------------------------------

/**
 * [from, to] pairs, longest and most specific first. Applied to every string
 * immediately before it is measured or drawn, never to the registries on disk.
 * Each replacement is checked against the subset at start-up by
 * assertSubstitutionsRenderable().
 */
const GLYPH_SUBSTITUTIONS = [
  // The subset has no 援, and 救援通道 is the route name key-area-design.json declares,
  // so it cannot be reworded at source without contradicting the design record. 救护
  // carries the same sense of rescue and every character of it renders.
  ['救援通道', '救护通道'],
  ['无障碍闸口', '无障碍门'],
  ['跨片区综合', '跨片区汇总'],
  ['地面不打孔', '不穿透地面'],
  ['开放的那条。', '开放的一条路径。'],
  ['行动缓慢者', '行动慢者'],
  ['报告渲染器', '报告生成器'],
  ['读屏软件', '读屏程序'],
  ['文档大纲', '文档结构'],
  ['财产损害', '实物损害'],
  ['渲染器', '生成器'],
  ['未拨款', '未获资金'],
  ['可搬移', '可移动'],
  ['张贴到', '公示于'],
  ['倒过来', '反过来'],
  ['还不能', '尚不能'],
  ['尤其是', '特别是'],
  ['通行宽度', '通行宽度'],
  ['护栏', '屏障'],
  ['一栏', '一列'],
  ['按钮', '按键'],
  ['旁路', '绕行路'],
  ['旁边', '边上'],
  ['缩短', '变短'],
  ['压缩', '精简'],
  ['遮蔽', '遮盖'],
  ['改善', '改进'],
  ['还能', '仍能'],
  ['挡风', '防风'],
  ['措辞', '用语'],
  ['财务', '资金'],
  ['携带', '带有'],
  ['口头', '口述'],
  ['亦可', '也可'],
  ['停靠', '停车'],
  ['车辆', '车'],
  ['净宽', '通行宽度'],
  ['核销', '核对'],
  ['撤销', '撤回'],
  ['磨损', '损耗'],
  ['赔付', '补救'],
  ['取暖', '供热'],
  ['履行', '执行'],
  ['自己', '本人'],
  ['召回', '收回'],
  ['讲解', '解说'],
  ['对着', '面对'],
  ['救济', '补救'],
  ['逻辑', '规则'],
  ['挤出', '排除'],
  ['再谈', '再说'],
  ['植栽', '植物'],
  ['清淤', '清理'],
  ['缺乏', '没有'],
  ['借还', '出入库'],
  ['借出', '出库'],
  ['增减', '增删'],
  ['扰动', '变动'],
  ['走廊', '通道'],
];

function substitute(value) {
  let out = String(value === undefined || value === null ? '' : value);
  for (const [from, to] of GLYPH_SUBSTITUTIONS) {
    if (out.indexOf(from) !== -1) out = out.split(from).join(to);
  }
  return out;
}

function assertSubstitutionsRenderable() {
  const missing = [];
  for (const [, to] of GLYPH_SUBSTITUTIONS) {
    for (const ch of to) {
      if (!typeface.hasGlyph(ch, 'regular') || !typeface.hasGlyph(ch, 'bold')) {
        missing.push(`${ch} (U+${ch.codePointAt(0).toString(16).toUpperCase()})`);
      }
    }
  }
  if (missing.length) {
    throw new Error('build-drawings: substitution targets lack glyphs: ' + missing.join(', '));
  }
}

// ---------------------------------------------------------------------------
// 3. Registry access
// ---------------------------------------------------------------------------

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

/**
 * Language purity is enforced at the point of access rather than by scanning
 * the finished sheets: while a document is being composed only its own
 * language column of the registries may be read, so a Chinese sheet cannot
 * pick up English prose and an English sheet cannot pick up Chinese prose.
 */
let activeLanguage = null;

function assertLanguage(language, base) {
  if (activeLanguage !== null && language !== activeLanguage) {
    throw new Error(
      `build-drawings: the ${activeLanguage} document tried to read ${base}_${language}`);
  }
}

/** Bilingual string field. Throws when the language column is absent. */
function T(record, base, language) {
  assertLanguage(language, base);
  const value = record ? record[`${base}_${language}`] : undefined;
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`build-drawings: missing string field ${base}_${language}`);
  }
  return value;
}

/** Bilingual array field. */
function TA(record, base, language) {
  assertLanguage(language, base);
  const value = record ? record[`${base}_${language}`] : undefined;
  if (!Array.isArray(value)) {
    throw new Error(`build-drawings: missing array field ${base}_${language}`);
  }
  return value;
}

// ---------------------------------------------------------------------------
// 4. Number and string formatting for the content streams
// ---------------------------------------------------------------------------

function num(value) {
  if (!Number.isFinite(value)) {
    throw new Error(`build-drawings: non-finite number in content stream: ${value}`);
  }
  let out = value.toFixed(3);
  if (out.indexOf('.') !== -1) out = out.replace(/0+$/, '').replace(/\.$/, '');
  if (out === '-0') out = '0';
  return out;
}

function colorOps(color, stroke) {
  const [r, g, b] = color;
  return `${num(r)} ${num(g)} ${num(b)} ${stroke ? 'RG' : 'rg'}`;
}

function hex16(value) {
  return value.toString(16).toUpperCase().padStart(4, '0');
}

/** A PDF text string: ASCII stays literal, anything else becomes UTF-16BE. */
function pdfString(value) {
  const text = String(value);
  if (/^[\x20-\x7E]*$/.test(text)) {
    return `(${text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')})`;
  }
  const buf = Buffer.from('﻿' + text, 'utf16le').swap16();
  return `<${buf.toString('hex').toUpperCase()}>`;
}

// ---------------------------------------------------------------------------
// 5. Sheet: a single page's vector and text content
// ---------------------------------------------------------------------------

/**
 * Layout is expressed with the origin at the top-left corner and y growing
 * downwards; py() converts to PDF's bottom-left origin at emit time.
 */
class Sheet {
  constructor(doc, width, height, index) {
    this.doc = doc;
    this.width = width;
    this.height = height;
    this.index = index;
    this.ops = [];
  }

  py(y) {
    return this.height - y;
  }

  push(op) {
    this.ops.push(op);
  }

  content() {
    return Buffer.from(this.ops.join('\n') + '\n', 'latin1');
  }

  rect(x, y, w, h, options = {}) {
    if (!(w > 0) || !(h > 0)) return;
    const parts = ['q'];
    if (options.fill) parts.push(colorOps(options.fill, false));
    if (options.stroke) {
      parts.push(colorOps(options.stroke, true));
      parts.push(`${num(options.lineWidth || 1)} w`);
    }
    if (options.dash) parts.push(`[${options.dash.map(num).join(' ')}] 0 d`);
    parts.push(`${num(x)} ${num(this.py(y + h))} ${num(w)} ${num(h)} re`);
    parts.push(options.fill && options.stroke ? 'B' : (options.fill ? 'f' : 'S'));
    parts.push('Q');
    this.push(parts.join(' '));
  }

  line(x1, y1, x2, y2, options = {}) {
    const parts = ['q', colorOps(options.stroke || RULE, true), `${num(options.lineWidth || 0.8)} w`];
    if (options.cap) parts.push(`${options.cap} J`);
    if (options.dash) parts.push(`[${options.dash.map(num).join(' ')}] 0 d`);
    parts.push(`${num(x1)} ${num(this.py(y1))} m ${num(x2)} ${num(this.py(y2))} l S Q`);
    this.push(parts.join(' '));
  }

  /** Horizontal-ish bezier connector, used for component/route -> gate links. */
  connector(x1, y1, x2, y2, options = {}) {
    const mid = (x1 + x2) / 2;
    const parts = ['q', colorOps(options.stroke || HAIR, true), `${num(options.lineWidth || 0.7)} w`];
    if (options.dash) parts.push(`[${options.dash.map(num).join(' ')}] 0 d`);
    parts.push(
      `${num(x1)} ${num(this.py(y1))} m ` +
      `${num(mid)} ${num(this.py(y1))} ${num(mid)} ${num(this.py(y2))} ` +
      `${num(x2)} ${num(this.py(y2))} c S Q`
    );
    this.push(parts.join(' '));
  }

  circle(cx, cy, r, options = {}) {
    const k = 0.5522847498307936 * r;
    const y = this.py(cy);
    const parts = ['q'];
    if (options.fill) parts.push(colorOps(options.fill, false));
    if (options.stroke) {
      parts.push(colorOps(options.stroke, true));
      parts.push(`${num(options.lineWidth || 0.9)} w`);
    }
    parts.push(
      `${num(cx - r)} ${num(y)} m ` +
      `${num(cx - r)} ${num(y + k)} ${num(cx - k)} ${num(y + r)} ${num(cx)} ${num(y + r)} c ` +
      `${num(cx + k)} ${num(y + r)} ${num(cx + r)} ${num(y + k)} ${num(cx + r)} ${num(y)} c ` +
      `${num(cx + r)} ${num(y - k)} ${num(cx + k)} ${num(y - r)} ${num(cx)} ${num(y - r)} c ` +
      `${num(cx - k)} ${num(y - r)} ${num(cx - r)} ${num(y - k)} ${num(cx - r)} ${num(y)} c`
    );
    parts.push(options.fill && options.stroke ? 'B' : (options.fill ? 'f' : 'S'));
    parts.push('Q');
    this.push(parts.join(' '));
  }

  /**
   * Places a raster in the box (x, y, w, h), letterboxed so the plate keeps its
   * aspect ratio. A stretched plan is a plan that lies about proportion, so the
   * unused part of the box is left blank rather than filled by distortion.
   * Returns the rectangle actually covered, which is what the placement record
   * reports as its area fraction.
   */
  image(relative, x, y, w, h) {
    const name = this.doc.image(relative);
    const { width: pw, height: ph } = this.doc.images.get(relative);
    const scale = Math.min(w / pw, h / ph);
    const drawWidth = pw * scale;
    const drawHeight = ph * scale;
    const left = x + (w - drawWidth) / 2;
    const top = y + (h - drawHeight) / 2;
    this.push(
      `q ${num(drawWidth)} 0 0 ${num(drawHeight)} ${num(left)} ${num(this.py(top + drawHeight))} cm ` +
      `/${name} Do Q`);
    return { x: left, y: top, width: drawWidth, height: drawHeight };
  }

  /**
   * Draws one line of text with its baseline at y. Returns the advance width.
   * Every glyph is resolved through the subset; a code point without a glyph
   * aborts the build rather than shipping a .notdef box.
   */
  text(value, x, y, options = {}) {
    const string = substitute(value);
    if (string.length === 0) return 0;
    const size = options.size || 10;
    const weight = options.weight || 400;
    const key = weight >= 600 ? 'bold' : 'regular';
    const items = typeface.layoutText(string, { size, weight });
    const codes = [];
    for (const item of items) {
      if (item.invisible && item.glyphAdvance === 0) continue;
      if (item.gid === 0) {
        throw new Error(
          `build-drawings: no glyph for ${JSON.stringify(item.ch)} ` +
          `(U+${item.ch.codePointAt(0).toString(16).toUpperCase()}) in ${JSON.stringify(string.slice(0, 40))}`
        );
      }
      codes.push(hex16(item.gid));
      const usage = this.doc.usage[key];
      if (!usage.has(item.gid)) usage.set(item.gid, item.ch.codePointAt(0));
    }
    if (codes.length === 0) return 0;

    const width = typeface.measureText(string, { size, weight }).width;
    let originX = x;
    if (options.align === 'center') originX = x - width / 2;
    else if (options.align === 'right') originX = x - width;

    // Recorded so the build can audit its own geometry: every drawn run keeps
    // its page, box and text for the on-page and collision checks below.
    this.doc.drawn.push({
      page: this.index,
      text: string,
      x: originX,
      y,
      width,
      size,
      weight,
      color: options.color || INK,
      pageWidth: this.width,
      pageHeight: this.height,
      tag: options.tag || null,
    });

    this.push(
      `q ${colorOps(options.color || INK, false)} BT /${key === 'bold' ? 'F2' : 'F1'} ` +
      `${num(size)} Tf 1 0 0 1 ${num(originX)} ${num(this.py(y))} Tm <${codes.join('')}> Tj ET Q`
    );
    return width;
  }
}

// ---------------------------------------------------------------------------
// 6. Measurement and fitting helpers
// ---------------------------------------------------------------------------

function widthOf(value, size, weight) {
  return typeface.measureText(substitute(value), { size, weight: weight || 400 }).width;
}

/** Largest size from `sizes` whose single line fits `maxWidth`. */
function fitSize(value, maxWidth, sizes, weight) {
  for (const size of sizes) {
    if (widthOf(value, size, weight) <= maxWidth) return size;
  }
  return sizes[sizes.length - 1];
}

function headline(sheet, value, x, y, maxWidth, sizes, options = {}) {
  const size = fitSize(value, maxWidth, sizes, options.weight || 700);
  sheet.text(value, x, y, {
    size,
    weight: options.weight || 700,
    color: options.color || INK,
    align: options.align,
  });
  return size;
}

/**
 * Wraps `value` into `width` at the largest size from `sizes` that fits inside
 * `maxHeight`, draws it, and returns the y coordinate just below the block.
 * An overflow at the smallest size is recorded on the document and fails the
 * build, so no source text is ever silently clipped.
 */
function paragraph(sheet, value, x, y, width, maxHeight, options = {}) {
  const string = substitute(value);
  const weight = options.weight || 400;
  const lineHeight = options.lineHeight || 1.36;
  const sizes = options.sizes;
  let chosen = null;
  for (let i = 0; i < sizes.length; i += 1) {
    const size = sizes[i];
    const lines = typeface.wrapText(string, { maxWidth: width, size, weight });
    const height = lines.length * size * lineHeight;
    if (height <= maxHeight || i === sizes.length - 1) {
      chosen = { size, lines, height, overflow: height > maxHeight };
      break;
    }
  }
  if (chosen.overflow) {
    sheet.doc.overflows.push({
      tag: options.tag || 'paragraph',
      needed: Number(chosen.height.toFixed(2)),
      available: Number(maxHeight.toFixed(2)),
    });
  }
  let baseline = y + chosen.size * 0.86;
  for (const line of chosen.lines) {
    sheet.text(line, x, baseline, {
      size: chosen.size,
      weight,
      color: options.color || INK,
      align: options.align,
    });
    baseline += chosen.size * lineHeight;
  }
  return y + chosen.height;
}

/**
 * The height paragraph() would need for `value` at the smallest size it is
 * allowed to use. This is the floor: no setting of the same text can be shorter,
 * so it is the honest amount of space to reserve for a block that must not be
 * pushed off its panel by whatever is drawn above it.
 */
function paragraphFloor(value, width, sizes, lineHeight = 1.36, weight = 400) {
  const size = sizes[sizes.length - 1];
  const lines = typeface.wrapText(substitute(value), { maxWidth: width, size, weight });
  return lines.length * size * lineHeight;
}

/** A label in the left gutter with a wrapped value beside it. */
function fieldRow(sheet, label, value, x, y, labelWidth, valueWidth, maxHeight, options) {
  sheet.text(label, x, y + (options.sizes[0] * 0.86), {
    size: options.labelSize,
    weight: 700,
    color: options.labelColor || MUTED,
  });
  return paragraph(sheet, value, x + labelWidth, y, valueWidth, maxHeight, options);
}

/** A small filled pill carrying a state word. Returns the width consumed. */
function badge(sheet, value, x, y, options = {}) {
  const size = options.size || 10;
  const padX = size * 0.55;
  const width = widthOf(value, size, options.weight || 700) + padX * 2;
  const height = size * 1.72;
  sheet.rect(x, y, width, height, {
    fill: options.fill || PANEL_DEEP,
    stroke: options.stroke,
    lineWidth: 0.6,
  });
  sheet.text(value, x + padX, y + height - size * 0.55, {
    size,
    weight: options.weight || 700,
    color: options.color || MUTED,
  });
  return width;
}

function badgeRow(sheet, values, x, y, options = {}) {
  let cursor = x;
  for (const entry of values) {
    const width = badge(sheet, entry.text, cursor, y, Object.assign({}, options, entry.style || {}));
    cursor += width + (options.gap || 8);
  }
  return cursor - x;
}

// ---------------------------------------------------------------------------
// 7. PDF document assembly
// ---------------------------------------------------------------------------

class PdfDocument {
  constructor(title) {
    this.title = title;
    this.sheets = [];
    this.usage = { regular: new Map(), bold: new Map() };
    this.overflows = [];
    this.drawn = [];
    // relative raster path -> { name, width, height, payload }. Keyed by path so a plate
    // carried on both a board and a booklet page is stored once.
    this.images = new Map();
  }

  addSheet(width, height) {
    const sheet = new Sheet(this, width, height, this.sheets.length);
    this.sheets.push(sheet);
    return sheet;
  }

  /** Registers a raster and returns the PDF resource name to draw it with. */
  image(relative) {
    const existing = this.images.get(relative);
    if (existing) return existing.name;
    const png = readPngForPdf(path.join(PACKAGE_ROOT, relative), relative);
    const entry = { name: `Im${this.images.size}`, ...png, relative };
    this.images.set(relative, entry);
    return entry.name;
  }
}

/** Six deterministic uppercase letters derived from the font program bytes. */
function subsetTag(program) {
  const digest = crypto.createHash('sha256').update(program).digest();
  let tag = '';
  for (let i = 0; i < 6; i += 1) tag += String.fromCharCode(65 + (digest[i] % 26));
  return tag;
}

/**
 * Reads the FontBBox and the vertical metrics a /FontDescriptor requires
 * straight out of the sfnt table directory. This is descriptor metadata only;
 * every cmap lookup, advance and outline still comes from the font module.
 */
function descriptorMetrics(program) {
  const numTables = program.readUInt16BE(4);
  let head = -1;
  let hhea = -1;
  let os2 = -1;
  for (let i = 0; i < numTables; i += 1) {
    const entry = 12 + i * 16;
    const tag = program.toString('latin1', entry, entry + 4);
    const offset = program.readUInt32BE(entry + 8);
    if (tag === 'head') head = offset;
    else if (tag === 'hhea') hhea = offset;
    else if (tag === 'OS/2') os2 = offset;
  }
  if (head < 0 || hhea < 0) {
    throw new Error('build-drawings: font program has no head/hhea table');
  }
  const unitsPerEm = program.readUInt16BE(head + 18);
  const scale = 1000 / unitsPerEm;
  const box = [
    Math.round(program.readInt16BE(head + 36) * scale),
    Math.round(program.readInt16BE(head + 38) * scale),
    Math.round(program.readInt16BE(head + 40) * scale),
    Math.round(program.readInt16BE(head + 42) * scale),
  ];
  const ascent = Math.round(program.readInt16BE(hhea + 4) * scale);
  const descent = Math.round(program.readInt16BE(hhea + 6) * scale);
  let capHeight = Math.round(box[3] * 0.72);
  if (os2 >= 0 && program.readUInt16BE(os2) >= 2 && os2 + 90 <= program.length) {
    const value = program.readInt16BE(os2 + 88);
    if (value > 0) capHeight = Math.round(value * scale);
  }
  return { box, ascent, descent, capHeight };
}

/** [gid, gid, ...] -> a compact /W array over consecutive runs. */
function widthArray(gids, widths, defaultWidth) {
  const listed = gids.filter((gid) => widths[gid] !== defaultWidth).sort((a, b) => a - b);
  const parts = [];
  let index = 0;
  while (index < listed.length) {
    const start = listed[index];
    const run = [widths[listed[index]]];
    let next = index + 1;
    while (next < listed.length && listed[next] === listed[next - 1] + 1) {
      run.push(widths[listed[next]]);
      next += 1;
    }
    parts.push(`${start} [${run.join(' ')}]`);
    index = next;
  }
  return `[${parts.join(' ')}]`;
}

function toUnicodeCMap(usage) {
  const entries = [...usage.entries()].sort((a, b) => a[0] - b[0]);
  const head = [
    '/CIDInit /ProcSet findresource begin',
    '12 dict begin',
    'begincmap',
    '/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def',
    '/CMapName /Adobe-Identity-UCS def',
    '/CMapType 2 def',
    '1 begincodespacerange',
    '<0000> <FFFF>',
    'endcodespacerange',
  ];
  const body = [];
  for (let i = 0; i < entries.length; i += 100) {
    const chunk = entries.slice(i, i + 100);
    body.push(`${chunk.length} beginbfchar`);
    for (const [gid, codePoint] of chunk) {
      const utf16 = Buffer.from(String.fromCodePoint(codePoint), 'utf16le').swap16();
      body.push(`<${hex16(gid)}> <${utf16.toString('hex').toUpperCase()}>`);
    }
    body.push('endbfchar');
  }
  const tail = ['endcmap', 'CMapName currentdict /CMap defineresource pop', 'end', 'end'];
  return Buffer.from(head.concat(body, tail).join('\n') + '\n', 'latin1');
}

function deflate(buffer) {
  return zlib.deflateSync(buffer, { level: 9 });
}

/**
 * Reads a non-interlaced 8-bit truecolour PNG and returns the pieces a PDF
 * image XObject needs, with the compressed payload untouched.
 *
 * PNG filters every scanline with the predictor family PDF calls
 * `/Predictor 15`, and both containers deflate the result. So the IDAT payload
 * can be handed to the PDF verbatim: no inflate, no re-encode, no resampling,
 * and the pixels a juror sees on the printed board are byte for byte the ones
 * the plate builder wrote. Anything that is not 8-bit non-interlaced RGB is
 * rejected rather than quietly converted, because a quiet conversion is how a
 * drawing changes between the raster and the print without anyone deciding to
 * change it.
 */
function readPngForPdf(absolute, relative) {
  const bytes = fs.readFileSync(absolute);
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (bytes.length < 8 || !bytes.subarray(0, 8).equals(signature)) {
    throw new Error(`build-drawings: ${relative} is not a PNG`);
  }
  let header = null;
  const idat = [];
  let offset = 8;
  while (offset + 8 <= bytes.length) {
    const length = bytes.readUInt32BE(offset);
    const type = bytes.toString('latin1', offset + 4, offset + 8);
    const start = offset + 8;
    if (type === 'IHDR') {
      header = {
        width: bytes.readUInt32BE(start),
        height: bytes.readUInt32BE(start + 4),
        bitDepth: bytes[start + 8],
        colorType: bytes[start + 9],
        interlace: bytes[start + 12],
      };
    } else if (type === 'IDAT') {
      idat.push(bytes.subarray(start, start + length));
    } else if (type === 'IEND') {
      break;
    }
    offset = start + length + 4;
  }
  if (!header) throw new Error(`build-drawings: ${relative} has no IHDR chunk`);
  if (header.bitDepth !== 8 || header.colorType !== 2) {
    throw new Error(
      `build-drawings: ${relative} is bit depth ${header.bitDepth} colour type ${header.colorType}; ` +
      'only 8-bit truecolour is carried into a PDF without resampling');
  }
  if (header.interlace !== 0) {
    throw new Error(`build-drawings: ${relative} is interlaced; the scanline predictor would not survive`);
  }
  if (idat.length === 0) throw new Error(`build-drawings: ${relative} has no IDAT chunk`);
  return {
    width: header.width,
    height: header.height,
    payload: Buffer.concat(idat),
    fileBytes: bytes.length,
  };
}

/** Serialises a PdfDocument. Returns { bytes, objects, fontFileIds, toUnicodeIds, imageIds }. */
function serialize(doc) {
  const objects = [null];
  const alloc = () => {
    objects.push(null);
    return objects.length - 1;
  };
  const put = (id, body) => {
    objects[id] = Buffer.isBuffer(body) ? body : Buffer.from(body, 'latin1');
  };
  const stream = (id, dict, payload) => {
    const compressed = deflate(payload);
    const header = Buffer.from(
      `<< ${dict} /Filter /FlateDecode /Length ${compressed.length} >>\nstream\n`, 'latin1');
    put(id, Buffer.concat([header, compressed, Buffer.from('\nendstream', 'latin1')]));
  };
  // For payloads that arrive already deflated, such as a PNG IDAT run.
  const rawStream = (id, dict, compressed) => {
    const header = Buffer.from(
      `<< ${dict} /Filter /FlateDecode /Length ${compressed.length} >>\nstream\n`, 'latin1');
    put(id, Buffer.concat([header, compressed, Buffer.from('\nendstream', 'latin1')]));
  };

  const catalogId = alloc();
  const pagesId = alloc();
  const infoId = alloc();

  const fontFileIds = [];
  const toUnicodeIds = [];
  const fontResources = [];

  for (const key of ['regular', 'bold']) {
    const usage = doc.usage[key];
    if (usage.size === 0) continue;
    const program = typeface.fontProgram(key);
    const metrics = descriptorMetrics(program);
    const widths = typeface.pdfWidths(key);
    const tag = subsetTag(program);
    const baseName = `${tag}+NotoSansSC-${key === 'bold' ? 'Bold' : 'Regular'}`;

    const fontFileId = alloc();
    const descriptorId = alloc();
    const cidFontId = alloc();
    const toUnicodeId = alloc();
    const type0Id = alloc();

    stream(fontFileId, `/Length1 ${program.length}`, program);
    fontFileIds.push(fontFileId);

    put(descriptorId,
      `<< /Type /FontDescriptor /FontName /${baseName} /Flags 4 ` +
      `/FontBBox [${metrics.box.join(' ')}] /ItalicAngle 0 /Ascent ${metrics.ascent} ` +
      `/Descent ${metrics.descent} /CapHeight ${metrics.capHeight} ` +
      `/StemV ${key === 'bold' ? 140 : 80} /FontFile2 ${fontFileId} 0 R >>`);

    put(cidFontId,
      `<< /Type /Font /Subtype /CIDFontType2 /BaseFont /${baseName} ` +
      `/CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> ` +
      `/FontDescriptor ${descriptorId} 0 R /DW 1000 ` +
      `/W ${widthArray([...usage.keys()], widths, 1000)} /CIDToGIDMap /Identity >>`);

    stream(toUnicodeId, '/Type /CMap', toUnicodeCMap(usage));
    toUnicodeIds.push(toUnicodeId);

    put(type0Id,
      `<< /Type /Font /Subtype /Type0 /BaseFont /${baseName} /Encoding /Identity-H ` +
      `/DescendantFonts [${cidFontId} 0 R] /ToUnicode ${toUnicodeId} 0 R >>`);

    fontResources.push(`/${key === 'bold' ? 'F2' : 'F1'} ${type0Id} 0 R`);
  }

  if (fontFileIds.length === 0) {
    throw new Error('build-drawings: refusing to write a document with no embedded font');
  }

  // One XObject per distinct raster, shared across every page that places it. A plate
  // appears on both an A0 board and an A3 page, and storing it twice would double the
  // file for no visible difference.
  const imageIds = [];
  const imageResources = [];
  const imageNames = new Set();
  // doc.images is keyed by the relative raster path so one file is stored once; the PDF
  // resource name is entry.name (Im0, Im1, ...) and is what the content stream draws
  // with. Keying the resource dictionary by the path instead would emit a name a reader
  // can never resolve, and every plate would silently vanish from the printed sheet.
  for (const image of doc.images.values()) {
    const imageId = alloc();
    rawStream(imageId,
      `/Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} ` +
      '/ColorSpace /DeviceRGB /BitsPerComponent 8 ' +
      `/DecodeParms << /Predictor 15 /Colors 3 /BitsPerComponent 8 /Columns ${image.width} >>`,
      image.payload);
    imageIds.push(imageId);
    imageNames.add(image.name);
    imageResources.push(`/${image.name} ${imageId} 0 R`);
  }

  const resourcesId = alloc();
  const xobjects = imageResources.length > 0 ? ` /XObject << ${imageResources.join(' ')} >>` : '';
  const procSet = imageResources.length > 0 ? '[/PDF /Text /ImageC]' : '[/PDF /Text]';
  put(resourcesId, `<< /Font << ${fontResources.join(' ')} >>${xobjects} /ProcSet ${procSet} >>`);

  const pageIds = [];
  for (const sheet of doc.sheets) {
    const contentId = alloc();
    const payload = sheet.content();
    // A `/Name Do` that no resource dictionary defines is not a fatal PDF error: a
    // reader prints "XObject is unknown", skips the operator, and hands back a page
    // that looks finished except that the drawing is missing. Refuse to serialise
    // rather than let a board go to print with a blank panel where a plate belongs.
    for (const match of payload.toString('latin1').matchAll(/\/([A-Za-z0-9]+)\s+Do\b/g)) {
      if (!imageNames.has(match[1])) {
        throw new Error(
          `build-drawings: sheet ${sheet.index} draws /${match[1]} Do but no XObject resource ` +
          `defines that name (defined: ${[...imageNames].join(', ') || 'none'})`);
      }
    }
    stream(contentId, '', payload);
    const pageId = alloc();
    pageIds.push(pageId);
    put(pageId,
      `<< /Type /Page /Parent ${pagesId} 0 R ` +
      `/MediaBox [0 0 ${num(sheet.width)} ${num(sheet.height)}] ` +
      `/Resources ${resourcesId} 0 R /Contents ${contentId} 0 R >>`);
  }

  put(pagesId, `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`);
  put(catalogId, `<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
  put(infoId,
    `<< /Title ${pdfString(doc.title)} /Creator ${pdfString('visual/assets/build-drawings.js')} ` +
    `/CreationDate (${FIXED_DATE}) /ModDate (${FIXED_DATE}) >>`);

  const chunks = [Buffer.from('%PDF-1.7\n%\xE2\xE3\xCF\xD3\n', 'latin1')];
  let offset = chunks[0].length;
  const offsets = new Array(objects.length).fill(0);
  for (let id = 1; id < objects.length; id += 1) {
    if (objects[id] === null) throw new Error(`build-drawings: object ${id} was never written`);
    const body = Buffer.concat([
      Buffer.from(`${id} 0 obj\n`, 'latin1'),
      objects[id],
      Buffer.from('\nendobj\n', 'latin1'),
    ]);
    offsets[id] = offset;
    offset += body.length;
    chunks.push(body);
  }

  const xrefOffset = offset;
  const xref = [`xref\n0 ${objects.length}\n`, '0000000000 65535 f \n'];
  for (let id = 1; id < objects.length; id += 1) {
    xref.push(`${String(offsets[id]).padStart(10, '0')} 00000 n \n`);
  }
  chunks.push(Buffer.from(xref.join(''), 'latin1'));

  const body = Buffer.concat(chunks);
  const digest = crypto.createHash('sha256').update(body).digest('hex').slice(0, 32).toUpperCase();
  const trailer = Buffer.from(
    `trailer\n<< /Size ${objects.length} /Root ${catalogId} 0 R /Info ${infoId} 0 R ` +
    `/ID [<${digest}> <${digest}>] >>\nstartxref\n${xrefOffset}\n%%EOF\n`, 'latin1');

  return {
    bytes: Buffer.concat([body, trailer]),
    objectCount: objects.length - 1,
    offsets,
    fontFileIds,
    toUnicodeIds,
    imageIds,
    pages: pageIds.length,
  };
}

// ---------------------------------------------------------------------------
// 8. Shared drawing blocks
// ---------------------------------------------------------------------------

const A0_SIZES = {
  title: [72, 66, 60, 54],
  section: [42, 38, 34, 30],
  panelTitle: [30, 27, 24, 21, 19],
  cardTitle: [19, 18, 17, 16, 15],
  body: [18, 17, 16, 15, 14, 13],
  small: [15, 14, 13, 12, 11],
  tiny: [13, 12, 11, 10, 9.5, 9, 8.5],
  micro: [11, 10.5, 10, 9.5, 9],
  label: 13,
  node: [16, 15, 14, 13, 12],
  gate: 13,
};

const A3_SIZES = {
  title: [27, 25, 23, 21],
  section: [16, 15, 14, 13],
  panelTitle: [12, 11.5, 11, 10.5, 10],
  cardTitle: [8.4, 8, 7.6, 7.2],
  body: [8, 7.6, 7.2, 6.8, 6.4, 6],
  small: [7, 6.7, 6.4, 6.1, 5.8],
  tiny: [6.2, 6, 5.8, 5.6, 5.4],
  micro: [5.6, 5.4, 5.2, 5],
  // The two ladders the band under an A3 plate is set on. They start well above
  // the body ladder because that band is read off a printed 420 mm sheet, and
  // they still fall back far enough to keep a long claim-limit sentence inside
  // its box rather than reporting an overflow.
  plateAlt: [11, 10.2, 9.4, 8.6, 7.8, 7, 6.4],
  plateBand: [9, 8.4, 7.8, 7.2, 6.6, 6.1, 5.6],
  // The running appendix. The micro ladder spans 5.0 to 5.6 pt, so a panel with
  // room to spare could only turn that room into white space between blocks
  // rather than into type a reader can follow. This ladder reaches up far enough
  // that spare room becomes a larger size instead.
  appendix: [7.6, 7.2, 6.8, 6.4, 6, 5.6, 5.2, 5],
  // The concept column beside the plate. Same problem as the appendix: the column
  // is roughly a third of a 420 mm sheet and the micro ladder could only ever set
  // it at around 5 pt, so the panels ended a third of the way down their own frame
  // and the rest was framed white paper. This ladder reaches high enough for the
  // text to grow into the column and still bottoms out where micro does.
  context: [11, 10.2, 9.4, 8.6, 7.8, 7.2, 6.6, 6.1, 5.6, 5.2, 5],
  label: 6.2,
  node: [7.2, 6.9, 6.6, 6.3, 6],
  gate: 6,
};

function panelFrame(sheet, x, y, w, h, options = {}) {
  sheet.rect(x, y, w, h, {
    fill: options.fill || PANEL,
    stroke: options.stroke || RULE,
    lineWidth: options.lineWidth || 0.9,
  });
}

/**
 * A titled panel: draws the frame and the eyebrow, and returns the inner box.
 */
function panel(sheet, title, x, y, w, h, sizes, options = {}) {
  panelFrame(sheet, x, y, w, h, options);
  const pad = options.pad || sizes.label * 1.2;
  const titleSize = fitSize(title, w - pad * 2, sizes.panelTitle, 700);
  sheet.text(title, x + pad, y + pad + titleSize * 0.86, {
    size: titleSize,
    weight: 700,
    color: options.titleColor || INK,
  });
  const ruleY = y + pad + titleSize * 1.5;
  sheet.line(x + pad, ruleY, x + w - pad, ruleY, { stroke: RULE, lineWidth: 0.7 });
  return {
    x: x + pad,
    y: ruleY + pad * 0.6,
    w: w - pad * 2,
    h: h - (ruleY + pad * 0.6 - y) - pad,
  };
}

/** Bulleted list of registry strings inside a fixed box. */
function bulletList(sheet, values, x, y, w, hMax, sizes, options = {}) {
  const count = values.length;
  if (count === 0) return y;
  const per = hMax / count;
  let cursor = y;
  for (const value of values) {
    sheet.circle(x + 2.2, cursor + per * 0.32, 1.6, { fill: options.dotColor || FAINT });
    paragraph(sheet, value, x + 8, cursor, w - 8, per - 1.5, {
      sizes: options.sizes || sizes.tiny,
      color: options.color || MUTED,
      lineHeight: 1.3,
      tag: options.tag || 'bullet',
    });
    cursor += per;
  }
  return y + hMax;
}

/**
 * The key-area program and flow diagram: components as nodes, proposed
 * step-free chains as drawn chains, unresolved D gates as a node column, and
 * one drawn link per registered blocked_by relation. Topological only.
 */
function areaDiagram(sheet, area, language, labels, box, sizes, options = {}) {
  const { x, y, w, h } = box;
  const gateWidth = Math.max(46, w * 0.13);
  const nodeRight = x + w - gateWidth - w * 0.06;
  const nodeWidth = nodeRight - x;

  const gateIds = [];
  const collect = (list) => {
    for (const gate of list || []) if (!gateIds.includes(gate)) gateIds.push(gate);
  };
  for (const component of area.components) collect(component.blocked_by);
  for (const route of area.routes) collect(route.blocked_by);
  collect(area.phase1_envelope.blocked_by);
  gateIds.sort();

  const gateRadius = Math.min(gateWidth * 0.28, h / (gateIds.length * 3.1));
  const gateX = x + w - gateWidth / 2;
  const gateSpan = h - gateRadius * 2;
  const gateY = new Map();
  gateIds.forEach((gate, index) => {
    const cy = gateIds.length === 1
      ? y + h / 2
      : y + gateRadius + (gateSpan * index) / (gateIds.length - 1);
    gateY.set(gate, cy);
  });

  const headerH = sizes.label * 1.6;
  const bandGap = h * 0.028;
  const componentBand = (h - headerH * 3 - bandGap * 2) * 0.56;
  const routeBand = (h - headerH * 3 - bandGap * 2) * 0.26;
  const envelopeBand = h - headerH * 3 - bandGap * 2 - componentBand - routeBand;

  // --- components -----------------------------------------------------------
  let cursor = y;
  sheet.text(T(labels, 'components_heading', language), x, cursor + sizes.label * 0.9, {
    size: sizes.label, weight: 700, color: MUTED,
  });
  cursor += headerH;

  const compCount = area.components.length;
  // Five components share this band. At the old 5.5% gap almost a quarter of the
  // band went to whitespace and the English descriptions had no room for their
  // second line; the boxes are already drawn with a border, so a narrower gutter
  // reads the same and gives the prose the height it needs.
  const compGap = componentBand * 0.02;
  const compH = (componentBand - compGap * (compCount - 1)) / compCount;
  area.components.forEach((component, index) => {
    const boxY = cursor + index * (compH + compGap);
    sheet.rect(x, boxY, nodeWidth, compH, {
      fill: NODE_FILL, stroke: MUTED, lineWidth: 0.9,
    });
    sheet.rect(x, boxY, 3.2, compH, { fill: CHAIN });
    const pad = compH * 0.08;
    const idWidth = sheet.text(component.id, x + pad + 5, boxY + pad + sizes.node[0] * 0.86, {
      size: sizes.node[0] * 0.86, weight: 700, color: CHAIN,
    });
    headline(sheet, T(component, 'name', language), x + pad + 12 + idWidth, boxY + pad + sizes.node[0] * 0.86,
      nodeWidth - pad * 2 - idWidth - 14, sizes.node);
    // The description occupies exactly the gap between the name above it and the
    // evidence reference below it. Both neighbours are set at absolute sizes while
    // the box is proportional, so a fraction of compH cannot express that gap: at
    // the sizes this board uses it put the first line under the name and the last
    // line under the reference.
    const evidenceSize = sizes.micro[sizes.micro.length - 1];
    const evidenceBaseline = boxY + compH - pad * 0.7;
    const descTop = boxY + pad + sizes.node[0] * 1.15;
    paragraph(sheet, T(component, 'description', language), x + pad + 5, descTop,
      nodeWidth - pad * 2 - 6, evidenceBaseline - evidenceSize - descTop - 1, {
        sizes: sizes.tiny, color: MUTED, lineHeight: 1.25, tag: `component:${component.id}`,
      });
    sheet.text(component.evidence_ref, x + pad + 5, evidenceBaseline, {
      size: evidenceSize, color: FAINT,
    });
    for (const gate of component.blocked_by || []) {
      sheet.connector(x + nodeWidth, boxY + compH / 2, gateX - gateRadius, gateY.get(gate), {
        stroke: HAIR, lineWidth: 0.6,
      });
    }
  });
  cursor += componentBand + bandGap;

  // --- proposed step-free chains -------------------------------------------
  sheet.text(T(labels, 'routes_heading', language), x, cursor + sizes.label * 0.9, {
    size: sizes.label, weight: 700, color: MUTED,
  });
  cursor += headerH;

  const routeCount = area.routes.length;
  const routeH = routeBand / routeCount;
  area.routes.forEach((route, index) => {
    const rowY = cursor + index * routeH;
    const chainY = rowY + routeH * 0.62;
    const idWidth = sheet.text(route.id, x, rowY + sizes.node[0] * 0.82, {
      size: sizes.node[0] * 0.86, weight: 700, color: CHAIN,
    });
    headline(sheet, T(route, 'name', language), x + idWidth + 10, rowY + sizes.node[0] * 0.82,
      nodeWidth * 0.62 - idWidth, sizes.node);
    if (route.step_free) {
      badge(sheet, T(labels, 'step_free', language), x + nodeWidth * 0.66, rowY - sizes.micro[0] * 0.2, {
        size: sizes.micro[sizes.micro.length - 1], fill: CHAIN_SOFT, color: CHAIN,
      });
    }
    sheet.line(x + 2, chainY, nodeRight - 4, chainY, {
      stroke: CHAIN, lineWidth: Math.max(1.6, routeH * 0.06), cap: 1,
    });
    sheet.rect(x, chainY - routeH * 0.05, 4.4, routeH * 0.1, { fill: CHAIN });
    sheet.rect(nodeRight - 4.4, chainY - routeH * 0.05, 4.4, routeH * 0.1, { fill: CHAIN });
    sheet.text(route.evidence_ref, x, rowY + routeH - 2, {
      size: sizes.micro[sizes.micro.length - 1], color: FAINT,
    });
    for (const gate of route.blocked_by || []) {
      sheet.connector(nodeRight, chainY, gateX - gateRadius, gateY.get(gate), {
        stroke: HAIR, lineWidth: 0.6, dash: [2, 2],
      });
    }
  });
  cursor += routeBand + bandGap;

  // --- phase 1 conceptual envelope -----------------------------------------
  const envelope = area.phase1_envelope;
  sheet.text(T(labels, 'envelope', language), x, cursor + sizes.label * 0.9, {
    size: sizes.label, weight: 700, color: MUTED,
  });
  cursor += headerH;
  sheet.rect(x, cursor, nodeWidth, envelopeBand, {
    fill: PAPER, stroke: MUTED, lineWidth: 0.9, dash: [5, 3],
  });
  const envPad = envelopeBand * 0.11;
  const envIdWidth = sheet.text(envelope.id, x + envPad + 4, cursor + envPad + sizes.node[0] * 0.86, {
    size: sizes.node[0] * 0.86, weight: 700, color: INK,
  });
  badgeRow(sheet, [
    { text: T(labels, 'reversible', language), style: { fill: CHAIN_SOFT, color: CHAIN } },
    { text: T(labels, 'not_authorized', language) },
    { text: T(labels, 'unfunded', language) },
  ], x + envPad + envIdWidth + 14, cursor + envPad * 0.7, {
    size: sizes.micro[sizes.micro.length - 1], gap: 5,
  });
  paragraph(sheet, T(envelope, 'description', language), x + envPad + 4, cursor + envelopeBand * 0.36,
    nodeWidth - envPad * 2 - 6, envelopeBand * 0.58, {
      sizes: sizes.tiny, color: MUTED, lineHeight: 1.25, tag: `envelope:${envelope.id}`,
    });
  for (const gate of envelope.blocked_by || []) {
    sheet.connector(x + nodeWidth, cursor + envelopeBand / 2, gateX - gateRadius, gateY.get(gate), {
      stroke: HAIR, lineWidth: 0.6, dash: [1, 2],
    });
  }

  // --- unresolved gate column ----------------------------------------------
  sheet.text(T(options.governanceLabels, 'blocked_by', language), gateX, y - sizes.label * 0.4, {
    size: sizes.label * 0.86, weight: 700, color: GATE, align: 'center',
  });
  for (const gate of gateIds) {
    const cy = gateY.get(gate);
    sheet.circle(gateX, cy, gateRadius, { fill: GATE_SOFT, stroke: GATE, lineWidth: 0.9 });
    sheet.text(gate, gateX, cy + sizes.gate * 0.34, {
      size: Math.min(sizes.gate, gateRadius * 1.1), weight: 700, color: GATE, align: 'center',
    });
  }
  return gateIds;
}

// The reference column beside the three lab panels. It carries the four drawing keys, then
// the seven-gate contract, then the denominator disclosure.
//
// The four keys used to be spread over the whole column at a quarter of its height each,
// which left three lines of text floating in a thousand points of paper. They are held to
// the height they need, and the room that frees is spent on the two things a reader of a
// board has no other way to reach: the gates that can stop the work, printed with the
// clause that decides each one, and the arithmetic behind every percentage on the sheet.
function legendPanel(sheet, box, language, data, sizes) {
  const labels = data.labels;
  const rowH = Math.min(box.h / 4, 52);
  let y = box.y;

  sheet.rect(box.x, y + rowH * 0.22, 26, rowH * 0.4, { fill: NODE_FILL, stroke: MUTED, lineWidth: 0.9 });
  sheet.rect(box.x, y + rowH * 0.22, 2.4, rowH * 0.4, { fill: CHAIN });
  paragraph(sheet, T(labels, 'components_heading', language), box.x + 34, y + rowH * 0.2,
    box.w - 40, rowH * 0.7, { sizes: sizes.small, color: INK, tag: 'legend' });
  y += rowH;

  sheet.line(box.x, y + rowH * 0.42, box.x + 26, y + rowH * 0.42, { stroke: CHAIN, lineWidth: 2.4, cap: 1 });
  paragraph(sheet, T(labels, 'routes_heading', language), box.x + 34, y + rowH * 0.2,
    box.w - 40, rowH * 0.7, { sizes: sizes.small, color: INK, tag: 'legend' });
  y += rowH;

  sheet.circle(box.x + 12, y + rowH * 0.42, Math.min(11, rowH * 0.3),
    { fill: GATE_SOFT, stroke: GATE, lineWidth: 0.9 });
  paragraph(sheet, T(labels.governance, 'blocked_by', language), box.x + 34, y + rowH * 0.2,
    box.w - 40, rowH * 0.7, { sizes: sizes.small, color: INK, tag: 'legend' });
  y += rowH;

  sheet.rect(box.x, y + rowH * 0.22, 26, rowH * 0.4, { stroke: MUTED, lineWidth: 0.9, dash: [4, 3] });
  paragraph(sheet, T(labels, 'envelope', language), box.x + 34, y + rowH * 0.2,
    box.w - 40, rowH * 0.7, { sizes: sizes.small, color: INK, tag: 'legend' });
  y += rowH + 10;

  const bottom = box.y + box.h;
  // Two thirds of the remaining column for the gates, the rest for the arithmetic. Both
  // blocks are drawn only if the room they need is actually there, so a future layout
  // change shrinks the panel rather than writing text off the bottom of the board.
  const remaining = bottom - y;
  if (remaining > 200) {
    sheet.line(box.x, y, box.x + box.w, y, { stroke: RULE, lineWidth: 0.8 });
    y += 12;
    y = gateContractBlock(sheet, { x: box.x, y, w: box.w, h: remaining * 0.66 }, language, data, sizes);
    if (bottom - y > 90) {
      y += 8;
      sheet.line(box.x, y, box.x + box.w, y, { stroke: RULE, lineWidth: 0.8 });
      y += 12;
      denominatorBlock(sheet, { x: box.x, y, w: box.w, h: bottom - y }, language, data, sizes);
    }
  }
}

/**
 * The seven human gates, printed from the registry with the clause that decides each one.
 *
 * The heading says the gates are adjudicated by people and are not closed by anything in
 * the package, because a numbered list on a board reads as a checklist that somebody has
 * already worked through. Every string here comes from `gate-registry.json`; the drawing
 * holds no gate wording of its own.
 *
 * Returns the y the block ends at.
 */
function gateContractBlock(sheet, box, language, data, sizes) {
  const labels = data.labels;
  let y = box.y;
  sheet.text(T(labels, 'drawing_gate_contract', language), box.x, y + sizes.label * 1.05,
    { size: sizes.label, weight: 700, color: INK });
  y += sizes.label * 1.9;
  y = paragraph(sheet, T(labels, 'drawing_gate_contract_note', language), box.x, y, box.w,
    box.h * 0.2, { sizes: sizes.micro, color: GATE, tag: 'gates:note' }) + 8;

  const gates = data.humanGates.gates;
  const room = box.y + box.h - y;
  const perGate = room / gates.length;
  for (const gate of gates) {
    const label = `${gate.id}  ${gate[`name_${language}`]}`;
    sheet.text(label, box.x, y + sizes.small[0] * 0.9,
      { size: sizes.small[0], weight: 700, color: INK });
    y += sizes.small[0] * 1.45;
    y = paragraph(sheet, gate[`fails_if_${language}`], box.x + 12, y, box.w - 12,
      Math.max(perGate - sizes.small[0] * 1.6, sizes.micro[0] * 2), {
        sizes: sizes.micro, color: MUTED, lineHeight: 1.24, tag: `gates:${gate.id}`,
      }) + 5;
  }
  return y;
}

/**
 * The arithmetic behind every percentage on the sheet, printed from the one registered
 * pair of sentences. Both denominators and both results for the same numerator appear
 * together, so no reader has to guess which basis a share was computed on.
 *
 * Returns the y the block ends at.
 */
function denominatorBlock(sheet, box, language, data, sizes) {
  const labels = data.labels;
  let y = box.y;
  sheet.text(T(labels, 'drawing_denominator', language), box.x, y + sizes.label * 1.05,
    { size: sizes.label, weight: 700, color: INK });
  y += sizes.label * 1.9;
  return paragraph(sheet, T(data.denominator, 'text', language), box.x, y, box.w,
    box.y + box.h - y, {
      sizes: sizes.micro, color: INK, lineHeight: 1.26, tag: 'denominator',
    });
}

function methodCardBlock(sheet, box, language, data, sizes, compact) {
  const card = data.source.method_card;
  const labels = data.labels;
  let y = box.y;
  y = paragraph(sheet, T(card, 'name', language), box.x, y, box.w, box.h * 0.16, {
    sizes: sizes.cardTitle, weight: 700, color: INK, tag: 'method:name',
  }) + sizes.label * 0.4;
  y = paragraph(sheet,
    `${T(labels, 'drawing_operates_on', language)}: ${T(card, 'operates_on', language)}`,
    box.x, y, box.w, box.h * 0.14, { sizes: sizes.tiny, color: MUTED, tag: 'method:operates' })
    + sizes.label * 0.4;
  y = paragraph(sheet,
    `${T(labels, 'drawing_guaranteed', language)}: ${TA(card, 'guaranteed_by_construction', language).join(' / ')}`,
    box.x, y, box.w, box.h * 0.14, { sizes: sizes.tiny, color: MUTED, tag: 'method:guaranteed' })
    + sizes.label * 0.4;
  y = paragraph(sheet,
    `${T(labels, 'drawing_does_not_compute', language)}: ${TA(card, 'does_not_compute', language).join(' / ')}`,
    box.x, y, box.w, box.h * 0.2, { sizes: sizes.tiny, color: GATE, tag: 'method:excludes' })
    + sizes.label * 0.4;
  if (compact) return y;

  const thresholds = Object.entries(card.thresholds).map(([key, value]) => `${key} ${value}`).join('   ');
  y = paragraph(sheet, `${T(labels, 'drawing_thresholds', language)}: ${thresholds}`,
    box.x, y, box.w, box.h * 0.12, { sizes: sizes.micro, color: MUTED, tag: 'method:thresholds' })
    + sizes.label * 0.3;
  const reproducer = Object.entries(card.reproducer).map(([key, value]) => `${key} ${value}`).join('   ');
  y = paragraph(sheet, `${T(labels, 'drawing_reproducer', language)}: ${reproducer}`,
    box.x, y, box.w, box.h * 0.12, { sizes: sizes.micro, color: MUTED, tag: 'method:reproducer' });
  return y;
}

function claimLimitsBlock(sheet, box, language, data, sizes) {
  const values = [
    T(data.source, 'evidence_boundary', language),
    T(data.governance, 'boundary', language),
    T(data.source.ui_labels.areas, 'intro', language),
    T(data.source.ui_labels.projects, 'intro', language),
    T(data.source.spelling_provenance, 'note', language),
  ];
  return bulletList(sheet, values, box.x, box.y, box.w, box.h, sizes, {
    sizes: sizes.tiny, color: MUTED, tag: 'claim-limit',
  });
}

function colophonLine(language, data) {
  const labels = data.labels;
  return [
    T(labels, 'drawing_generated_note', language),
    `${T(labels, 'drawing_typeface', language)}: ${typeface.PROVENANCE.family} / ` +
      `${typeface.PROVENANCE.license} / ${typeface.PROVENANCE.licenseUrl}`,
    // Both numbers, because they answer different questions: fifteen is how many
    // drawings there are, thirty is how many files a reader could open. A single
    // "plates: 30" would read as thirty distinct drawings.
    `${T(labels, 'plates', language)}: ${data.plates.counts.semantic_plates} / ` +
      `${data.plates.counts.artifacts}`,
  ].join('   ·   ');
}

function areaBadges(area, language, labels) {
  const list = [];
  if (!area.georeferenced) {
    list.push({
      text: T(labels, 'non_georeferenced', language),
      style: { fill: GATE_SOFT, color: GATE },
    });
  }
  list.push({ text: `${T(labels, 'official_area', language)} ${area.official_area_ha} ha` });
  list.push({ text: area.lab });
  return list;
}

// ---------------------------------------------------------------------------
// 9. A0 boards
// ---------------------------------------------------------------------------

function boardHeader(sheet, language, data, index, total, subtitle) {
  const labels = data.labels;
  const margin = 64;
  const sizes = A0_SIZES;
  sheet.text(
    `${T(labels, 'drawing_board', language)} ${index} / ${total}   ·   ` +
    `${T(labels, 'drawing_sheet', language)} A0 1189 × 841 mm`,
    margin, margin + 18, { size: sizes.label * 1.5, weight: 700, color: MUTED });
  headline(sheet, data.source.document_title.canonical[language], margin, margin + 88,
    sheet.width - margin * 2 - 900, sizes.title);
  paragraph(sheet, subtitle, margin, margin + 104, sheet.width - margin * 2 - 900, 60, {
    sizes: sizes.small, color: MUTED, tag: 'board:subtitle',
  });
  // paragraph() aligns each line to `x` when align is 'right', so `x` is the
  // right edge of the block, not its left. The band runs to the rule at
  // margin + 172, and the method card name is the longest single string on the
  // board in English, so it gets the height the band actually has rather than a
  // round number that happened to suit the Chinese wording.
  paragraph(sheet, T(data.source.method_card, 'name', language),
    sheet.width - margin, margin + 20, 860, 140, {
      sizes: sizes.section, weight: 700, color: FAINT, align: 'right', tag: 'board:method',
    });
  sheet.line(margin, margin + 172, sheet.width - margin, margin + 172, { stroke: INK, lineWidth: 1.6 });
}

function boardFooter(sheet, language, data, top) {
  const margin = 64;
  const sizes = A0_SIZES;
  sheet.line(margin, top, sheet.width - margin, top, { stroke: RULE, lineWidth: 0.9 });
  paragraph(sheet, colophonLine(language, data), margin, top + 12,
    sheet.width - margin * 2, 60, { sizes: sizes.micro, color: FAINT, tag: 'board:colophon' });
}

// A0 board furniture, in points. The plate canvas is what is left of the board once
// the header and footer bands are taken out, and it is the denominator the
// registry's area_fraction is a fraction OF. Saying so is not pedantry: a fraction
// of the whole media box and a fraction of the drawable area differ by about a
// fifth here, and a plate covering a fifth less of the board than the register
// promised would be a quiet demotion of the drawing the argument rests on.
const A0_MARGIN = 88;
const A0_HEADER = 196;
const A0_FOOTER = 132;
const A0_GAP = 32;
const A0_CAPTION = 34;

function a0Canvas() {
  return {
    x: A0_MARGIN,
    y: A0_MARGIN + A0_HEADER,
    w: A0.width - A0_MARGIN * 2,
    h: A0.height - A0_MARGIN * 2 - A0_HEADER - A0_FOOTER,
  };
}

/**
 * Turns the registry's declared area fractions into real boxes on a real board.
 *
 * Each plate gets a box whose area is its declared fraction of the plate canvas and
 * whose proportions are the raster's own, so nothing is stretched and the fraction
 * on the record is the fraction on the paper. The dominant pair sits on the upper
 * row, bottom-aligned so their captions share a baseline; the three support plates
 * sit on the lower one, and whatever width they leave becomes the keyed register.
 *
 * If the declared fractions cannot be laid out, this throws with the shortfall in
 * points rather than overlapping two drawings or shrinking one to fit. Either of
 * those would leave the register describing a board nobody printed, which is the
 * one failure this package cannot afford.
 */
function solveBoardLayout(plates, canvas) {
  const canvasArea = canvas.w * canvas.h;
  const boxes = plates.map((plate) => {
    const target = plate.placements.a0.area_fraction * canvasArea;
    const aspect = plate.width_px / plate.height_px;
    return { plate, width: Math.sqrt(target * aspect), height: Math.sqrt(target / aspect) };
  });
  const dominant = [boxes[1], boxes[2]];
  const support = [boxes[0], boxes[3], boxes[4]];

  const rowWidth = (row) => row.reduce((sum, box) => sum + box.width, 0) + A0_GAP * (row.length - 1);
  const rowHeight = (row) => Math.max(...row.map((box) => box.height)) + A0_CAPTION;
  const dominantH = rowHeight(dominant);
  const supportH = rowHeight(support);
  const stack = dominantH + A0_GAP + supportH;

  const shortfalls = [];
  const over = (value) => (value - canvas.w).toFixed(1);
  if (rowWidth(dominant) > canvas.w) shortfalls.push(`the dominant row is ${over(rowWidth(dominant))} pt too wide`);
  if (rowWidth(support) > canvas.w) shortfalls.push(`the support row is ${over(rowWidth(support))} pt too wide`);
  if (stack > canvas.h) shortfalls.push(`the two rows are ${(stack - canvas.h).toFixed(1)} pt too tall`);
  if (shortfalls.length > 0) {
    throw new Error(`build-drawings: the ${String(plates[0].plate_id).split('-')[0]} area fractions ` +
      `cannot be laid out on an A0 board: ${shortfalls.join('; ')}`);
  }

  const placed = [];
  let x = canvas.x;
  for (const box of dominant) {
    placed.push(Object.assign({}, box, { x, y: canvas.y + dominantH - A0_CAPTION - box.height }));
    x += box.width + A0_GAP;
  }
  const supportTop = canvas.y + dominantH + A0_GAP;
  x = canvas.x;
  for (const box of support) {
    placed.push(Object.assign({}, box, { x, y: supportTop + supportH - A0_CAPTION - box.height }));
    x += box.width + A0_GAP;
  }
  return {
    boxes: placed,
    // The register takes the width the support plates leave and the height the
    // canvas actually has below the dominant row, not merely the height of the
    // support plates. Clipping it to supportH left every row too short for one
    // line of its own smallest type while the canvas still had space under it.
    register: { x, y: supportTop, w: canvas.x + canvas.w - x, h: canvas.y + canvas.h - supportTop },
    canvas,
  };
}

/**
 * The strip under a plate. It names the plate, then states in print the same three
 * things the registry states in JSON: where the plate ranks on the board, how much
 * of the canvas it holds, and that nothing on it has been verified. A reader
 * standing at the board should not have to open a file to learn that.
 */
function plateCaption(sheet, box, plate, language, data, sizes) {
  const labels = data.labels;
  const top = box.y + box.height + 6;
  sheet.line(box.x, top - 4, box.x + box.width, top - 4, { stroke: INK, lineWidth: 1.1 });
  const idWidth = sheet.text(plate.plate_id, box.x, top + sizes.label * 1.1,
    { size: sizes.label * 1.25, weight: 700, color: CHAIN });
  headline(sheet, plate.title, box.x + idWidth + 12, top + sizes.label * 1.1,
    box.width - idWidth - 12, sizes.small, { weight: 700 });
  const fraction = plate.placements.a0.area_fraction;
  sheet.text(
    `${T(labels, 'drawing_plate_register', language)} ${plate.artifact_id}   ·   ` +
    `${plate.placements.a0.visual_rank} / 5   ·   ${(fraction * 100).toFixed(0)}%   ·   ` +
    `${T(labels, 'drawing_plate_status', language)}: ${T(labels, 'drawing_plate_pending', language)}`,
    box.x, top + sizes.label * 1.1 + sizes.micro[0] * 1.5,
    { size: sizes.micro[1], color: FAINT });
}

/**
 * One board per key area: five plates in the hierarchy the registry declares, with
 * that area's keyed register filling the width the support row does not need.
 */
function buildAreaBoard(doc, language, data, area, plates, board) {
  const sheet = doc.addSheet(A0.width, A0.height);
  const labels = data.labels;
  const sizes = A0_SIZES;
  const placements = [];

  sheet.rect(0, 0, sheet.width, sheet.height, { fill: PAPER });
  boardHeader(sheet, language, data, board, A0_BOARDS,
    `${T(area, 'name', language)}   ·   ${T(labels, 'role_label', language)}: ${T(area, 'role', language)}`);

  // A non-georeferenced area says so above its own drawings, in the registered
  // words, before the reader has looked at anything. The A3 pages get the same
  // sentence out of each plate's claim_limits; a board has no such field, so it
  // is printed here rather than left to the caption to imply.
  const design = data.designById.get(area.id);
  if (design && design.georeferenced === false) {
    const bandY = 64 + 172 + 12;
    sheet.rect(A0_MARGIN, bandY, 4, 26, { fill: GATE });
    paragraph(sheet, design[`disclosure_${language}`], A0_MARGIN + 14, bandY,
      A0.width - A0_MARGIN * 2 - 14, 26,
      { sizes: sizes.tiny, weight: 700, color: GATE, tag: `board:disclosure:${area.id}` });
  }

  const canvas = a0Canvas();
  const layout = solveBoardLayout(plates, canvas);
  for (const box of layout.boxes) {
    const drawn = sheet.image(box.plate.file, box.x, box.y, box.width, box.height);
    sheet.rect(drawn.x, drawn.y, drawn.width, drawn.height,
      { stroke: RULE, lineWidth: 0.9 });
    plateCaption(sheet, box, box.plate, language, data, sizes);
    placements.push({
      placement_id: box.plate.placements.a0.placement_id,
      artifact_id: box.plate.artifact_id,
      plate_id: box.plate.plate_id,
      file: box.plate.file,
      page: board,
      visual_rank: box.plate.placements.a0.visual_rank,
      // The declared fraction is republished so the two registries can be compared
      // without either being trusted, and the measured one beside it so a layout
      // that honoured the number in name only is visible as the gap between them.
      area_fraction: box.plate.placements.a0.area_fraction,
      drawn_area_fraction: Number(((drawn.width * drawn.height) / (canvas.w * canvas.h)).toFixed(6)),
      box_pt: [Number(drawn.x.toFixed(2)), Number(drawn.y.toFixed(2)),
        Number(drawn.width.toFixed(2)), Number(drawn.height.toFixed(2))],
    });
  }

  // The keyed register, in the width the support plates leave. The drawings come
  // first and the words that index them take the space that is left, which is the
  // order a board is actually read in.
  const register = layout.register;
  const registerBox = panel(sheet, T(labels, 'drawing_keyed_details', language),
    register.x + A0_GAP, register.y, register.w - A0_GAP, register.h, sizes);
  const entries = keyedEntries(area, language, data);
  const rowGap = 5;
  const rowH = (registerBox.h - rowGap * (entries.length - 1)) / entries.length;
  entries.forEach((entry, index) => {
    const y = registerBox.y + index * (rowH + rowGap);
    if (index % 2 === 1) sheet.rect(registerBox.x - 4, y, registerBox.w + 8, rowH, { fill: PANEL_DEEP });
    sheet.rect(registerBox.x, y, 3, rowH, { fill: entry.accent });
    const idWidth = sheet.text(entry.id, registerBox.x + 10, y + sizes.micro[0] * 1.4,
      { size: sizes.micro[0], weight: 700, color: entry.accent });
    headline(sheet, entry.name, registerBox.x + 16 + idWidth, y + sizes.micro[0] * 1.4,
      registerBox.w - idWidth - 20, sizes.micro, { weight: 700 });
    paragraph(sheet, entry.description, registerBox.x + 10, y + sizes.micro[0] * 1.9,
      registerBox.w - 14, rowH - sizes.micro[0] * 3.2, {
        sizes: sizes.micro, color: MUTED, lineHeight: 1.24, tag: `register:${entry.id}`,
      });
    sheet.text(`${T(labels.governance, 'blocked_by', language)}: ${entry.gates.join(' ')}`,
      registerBox.x + 10, y + rowH - 3,
      { size: sizes.micro[sizes.micro.length - 1], weight: 700, color: GATE });
  });

  boardFooter(sheet, language, data, A0.height - A0_MARGIN - A0_FOOTER + 40);
  return { sheet, placements };
}

function keyedCard(sheet, entry, language, data, x, y, w, h, sizes) {
  const labels = data.labels;
  sheet.rect(x, y, w, h, { fill: NODE_FILL, stroke: RULE, lineWidth: 0.8 });
  sheet.rect(x, y, 3, h, { fill: entry.accent });
  const pad = 10;
  const idWidth = sheet.text(entry.id, x + pad + 4, y + pad + sizes.cardTitle[0] * 0.86, {
    size: sizes.cardTitle[0], weight: 700, color: entry.accent,
  });
  headline(sheet, entry.name, x + pad + idWidth + 10, y + pad + sizes.cardTitle[0] * 0.86,
    w - pad * 2 - idWidth - 12, sizes.cardTitle);
  let cursor = y + pad + sizes.cardTitle[0] * 1.5;
  cursor = paragraph(sheet, entry.description, x + pad + 4, cursor, w - pad * 2 - 6,
    h - (cursor - y) - pad * 2 - sizes.micro[0] * 3.2, {
      sizes: sizes.tiny, color: MUTED, lineHeight: 1.26, tag: `keyed:${entry.id}`,
    }) + 3;
  if (entry.tags && entry.tags.length) {
    badgeRow(sheet, entry.tags, x + pad + 4, cursor, { size: sizes.micro[sizes.micro.length - 1], gap: 5 });
    cursor += sizes.micro[sizes.micro.length - 1] * 2.1;
  }
  sheet.text(`${T(labels, 'col_evidence', language)}: ${entry.evidence}`, x + pad + 4,
    y + h - pad - sizes.micro[sizes.micro.length - 1] * 1.4, {
      size: sizes.micro[sizes.micro.length - 1], color: FAINT,
    });
  sheet.text(`${T(labels.governance, 'blocked_by', language)}: ${entry.gates.join(' ')}`,
    x + pad + 4, y + h - pad, { size: sizes.micro[sizes.micro.length - 1], weight: 700, color: GATE });
}

function keyedEntries(area, language, data) {
  const labels = data.labels;
  const entries = [];
  for (const component of area.components) {
    entries.push({
      id: component.id,
      name: T(component, 'name', language),
      description: T(component, 'description', language),
      evidence: component.evidence_ref,
      gates: component.blocked_by || [],
      accent: CHAIN,
      tags: [],
    });
  }
  for (const route of area.routes) {
    entries.push({
      id: route.id,
      name: T(route, 'name', language),
      description: T(route, 'description', language),
      evidence: route.evidence_ref,
      gates: route.blocked_by || [],
      accent: CHAIN,
      tags: route.step_free
        ? [{ text: T(labels, 'step_free', language), style: { fill: CHAIN_SOFT, color: CHAIN } }]
        : [],
    });
  }
  const envelope = area.phase1_envelope;
  entries.push({
    id: envelope.id,
    name: T(labels, 'envelope', language),
    description: T(envelope, 'description', language),
    evidence: `area:${area.id} | ${T(labels, 'drawing_key_ref', language)}:${area.area_id}`,
    gates: envelope.blocked_by || [],
    accent: GATE,
    tags: [
      { text: T(labels, 'reversible', language), style: { fill: CHAIN_SOFT, color: CHAIN } },
      { text: T(labels, 'not_authorized', language) },
      { text: T(labels, 'unfunded', language) },
    ],
  });
  return entries;
}

function governanceSummary(sheet, box, language, data, sizes) {
  const labels = data.labels;
  const gov = data.governance;
  const rows = gov.actions;
  const rowH = box.h / rows.length;
  const idW = box.w * 0.06;
  const nameW = box.w * 0.19;
  const stateW = box.w * 0.2;
  const gateW = box.w * 0.13;
  const triggerX = box.x + idW + nameW + stateW + gateW;
  const triggerW = box.x + box.w - triggerX;

  rows.forEach((action, index) => {
    const y = box.y + index * rowH;
    if (index % 2 === 1) sheet.rect(box.x - 4, y, box.w + 8, rowH, { fill: PANEL_DEEP });
    const project = data.projectsById.get(action.id);
    sheet.text(action.id, box.x, y + rowH * 0.55, { size: sizes.tiny[1], weight: 700, color: INK });
    sheet.text(action.phase, box.x, y + rowH * 0.92, { size: sizes.micro[2], color: FAINT });
    paragraph(sheet, T(project, 'name', language), box.x + idW, y + rowH * 0.08, nameW - 8, rowH * 0.9, {
      sizes: sizes.tiny, color: INK, lineHeight: 1.2, tag: `gov:name:${action.id}`,
    });
    badgeRow(sheet, [
      { text: T(gov.labels, 'not_authorized', language) },
      { text: T(gov.labels, 'unfunded', language) },
    ], box.x + idW + nameW, y + rowH * 0.18, { size: sizes.micro[sizes.micro.length - 1], gap: 4 });
    sheet.text(`${T(gov.labels, 'authorized_target', language)}: ${T(gov.labels, 'null_target', language)}`,
      box.x + idW + nameW, y + rowH * 0.92, { size: sizes.micro[sizes.micro.length - 1], color: GATE });
    paragraph(sheet, action.blocked_by.join(' '), box.x + idW + nameW + stateW, y + rowH * 0.14,
      gateW - 6, rowH * 0.8, {
        sizes: sizes.tiny, weight: 700, color: GATE, lineHeight: 1.2, tag: `gov:gates:${action.id}`,
      });
    paragraph(sheet, `${T(gov.labels, 'stop_trigger', language)}: ${T(action, 'stop_trigger', language)}`,
      triggerX, y + rowH * 0.08, triggerW, rowH * 0.9, {
        sizes: sizes.micro, color: MUTED, lineHeight: 1.2, tag: `gov:trigger:${action.id}`,
      });
    sheet.line(box.x - 4, y + rowH, box.x + box.w + 4, y + rowH, { stroke: HAIR, lineWidth: 0.5 });
  });
  sheet.text(T(labels, 'drawing_full_register', language), box.x, box.y + box.h + sizes.micro[0] * 1.4, {
    size: sizes.micro[0], color: FAINT,
  });
}

/**
 * Board 4 carries no plate. It is where the three areas are read against each
 * other: the shared method, the coupling rule that lets one lab learn from
 * another, the twelve actions with their stop triggers and unresolved gates, the
 * limits of what any of it claims, and the public-memory and spelling records that
 * say where the words came from. The area boards show three sites. This one shows
 * the single argument they are three instances of.
 */
function buildSynthesisBoard(doc, language, data) {
  const sheet = doc.addSheet(A0.width, A0.height);
  const labels = data.labels;
  const sizes = A0_SIZES;
  const margin = A0_MARGIN;
  const inner = sheet.width - margin * 2;

  sheet.rect(0, 0, sheet.width, sheet.height, { fill: PAPER });
  boardHeader(sheet, language, data, A0_BOARDS, A0_BOARDS, T(labels, 'drawing_synthesis', language));

  const canvas = a0Canvas();
  const supportH = 700;
  const supportTop = canvas.y + canvas.h - supportH;
  const gridTop = canvas.y + 74;
  const gridH = supportTop - gridTop - 30;

  headline(sheet, T(labels, 'drawing_program_flow', language), margin, canvas.y + 38,
    inner * 0.46, sizes.section);
  paragraph(sheet, T(labels, 'drawing_topological_note', language),
    margin + inner * 0.48, canvas.y + 6, inner * 0.52, 64, {
      sizes: sizes.small, color: GATE, tag: 'board4:topological',
    });

  // three areas side by side, with the shared legend beside them ------------
  const gap = 30;
  const legendW = 380;
  const panelW = (inner - gap * 3 - legendW) / 3;

  data.source.areas.forEach((area, index) => {
    const px = margin + index * (panelW + gap);
    panelFrame(sheet, px, gridTop, panelW, gridH, { fill: PANEL });
    const pad = 22;
    let cursor = gridTop + pad;
    const titleSize = fitSize(T(area, 'name', language), panelW - pad * 2, sizes.panelTitle, 700);
    sheet.text(T(area, 'name', language), px + pad, cursor + titleSize * 0.86,
      { size: titleSize, weight: 700, color: INK });
    cursor += titleSize * 1.5 + 4;
    badgeRow(sheet, areaBadges(area, language, labels), px + pad, cursor, { size: sizes.label });
    cursor += sizes.label * 2.4;
    cursor = paragraph(sheet, `${T(labels, 'role_label', language)}: ${T(area, 'role', language)}`,
      px + pad, cursor, panelW - pad * 2, 44,
      { sizes: sizes.small, color: CHAIN, tag: `board4:role:${area.id}` }) + 6;
    cursor = paragraph(sheet, T(area, 'distinct_task', language), px + pad, cursor,
      panelW - pad * 2, 96, { sizes: sizes.tiny, color: MUTED, tag: `board4:task:${area.id}` }) + 8;
    if (!area.georeferenced) {
      const noteBottom = paragraph(sheet, T(area, 'non_station_note', language), px + pad, cursor,
        panelW - pad * 2, 148, { sizes: sizes.tiny, color: GATE, tag: `board4:nonstation:${area.id}` });
      sheet.line(px + pad - 8, cursor, px + pad - 8, noteBottom, { stroke: GATE, lineWidth: 2 });
      cursor = noteBottom + 8;
    }
    sheet.line(px + pad, cursor, px + panelW - pad, cursor, { stroke: RULE, lineWidth: 0.8 });
    cursor += 22;

    const diagramBottom = gridTop + gridH - pad - 118;
    areaDiagram(sheet, area, language, labels, {
      x: px + pad, y: cursor, w: panelW - pad * 2, h: diagramBottom - cursor,
    }, sizes, { governanceLabels: labels.governance });

    let tail = diagramBottom + 12;
    sheet.line(px + pad, tail - 6, px + panelW - pad, tail - 6, { stroke: RULE, lineWidth: 0.8 });
    tail = paragraph(sheet, `${T(labels, 'winter', language)}: ${T(area, 'winter', language)}`,
      px + pad, tail, panelW - pad * 2, 52,
      { sizes: sizes.micro, color: MUTED, lineHeight: 1.25, tag: `board4:winter:${area.id}` }) + 4;
    paragraph(sheet, `${T(labels, 'maintenance', language)}: ${T(area, 'maintenance', language)}`,
      px + pad, tail, panelW - pad * 2, 52,
      { sizes: sizes.micro, color: MUTED, lineHeight: 1.25, tag: `board4:maintenance:${area.id}` });
  });

  const legendBox = panel(sheet, T(labels, 'drawing_legend', language),
    margin + (panelW + gap) * 3, gridTop, legendW, gridH, sizes);
  legendPanel(sheet, legendBox, language, data, sizes);

  // support band -------------------------------------------------------------
  const supportGap = 26;
  const available = inner - supportGap * 3;
  const governanceW = available * 0.366;
  const methodW = available * 0.221;
  const limitsW = available * 0.196;
  const memoryW = available - governanceW - methodW - limitsW;

  const governanceBox = panel(sheet, T(data.governance.labels, 'heading', language),
    margin, supportTop, governanceW, supportH, sizes, { fill: PANEL });
  governanceSummary(sheet, {
    x: governanceBox.x, y: governanceBox.y, w: governanceBox.w,
    h: governanceBox.h - sizes.micro[0] * 2.2,
  }, language, data, sizes);

  const methodX = margin + governanceW + supportGap;
  const methodBox = panel(sheet, T(labels, 'drawing_method_card', language),
    methodX, supportTop, methodW, supportH, sizes);
  const methodTail = methodCardBlock(sheet, methodBox, language, data, sizes, false) + 8;
  paragraph(sheet,
    `${T(labels, 'drawing_limitations', language)}: ` +
    `${TA(data.source.method_card, 'limitations', language).join(' ')}`,
    methodBox.x, methodTail, methodBox.w, methodBox.y + methodBox.h - methodTail, {
      sizes: sizes.micro, color: MUTED, lineHeight: 1.28, tag: 'board4:limitations',
    });

  // Claim limits and the coupling rule share a column: what the package refuses to
  // say, directly above the one channel by which a lab may borrow from a lab.
  const limitsX = methodX + methodW + supportGap;
  const limitsH = supportH * 0.56;
  const limitsBox = panel(sheet, T(labels, 'drawing_claim_limits', language),
    limitsX, supportTop, limitsW, limitsH, sizes, { fill: PANEL_DEEP });
  claimLimitsBlock(sheet, limitsBox, language, data, sizes);

  const couplingTop = supportTop + limitsH + supportGap;
  const couplingBox = panel(sheet, T(labels, 'drawing_lab_coupling', language),
    limitsX, couplingTop, limitsW, supportH - limitsH - supportGap, sizes);
  const couplingTail = paragraph(sheet, T(data.source.lab_coupling, 'rule', language),
    couplingBox.x, couplingBox.y, couplingBox.w, couplingBox.h * 0.34, {
      sizes: sizes.micro, color: INK, tag: 'board4:coupling-rule',
    }) + 6;
  bulletList(sheet, data.source.lab_coupling.channels.map(
    (channel) => `${channel.id} ${T(channel, 'name', language)} \u2014 ${T(channel, 'definition', language)}`),
    couplingBox.x, couplingTail, couplingBox.w, couplingBox.y + couplingBox.h - couplingTail, sizes,
    { sizes: sizes.micro, tag: 'board4:coupling' });

  const memoryBox = panel(sheet, T(labels, 'drawing_public_memory', language),
    limitsX + limitsW + supportGap, supportTop, memoryW, supportH, sizes);
  let ry = paragraph(sheet, T(data.source.public_memory, 'rule', language),
    memoryBox.x, memoryBox.y, memoryBox.w, supportH * 0.14, {
      sizes: sizes.tiny, color: INK, tag: 'board4:memory-rule',
    }) + 6;
  ry = bulletList(sheet, TA(data.source.public_memory, 'guarantees', language),
    memoryBox.x, ry, memoryBox.w, supportH * 0.34, sizes,
    { sizes: sizes.micro, tag: 'board4:memory' }) + 8;
  sheet.line(memoryBox.x, ry - 4, memoryBox.x + memoryBox.w, ry - 4, { stroke: RULE, lineWidth: 0.7 });
  sheet.text(T(labels, 'drawing_spelling', language), memoryBox.x, ry + sizes.label * 1.1,
    { size: sizes.label, weight: 700, color: MUTED });
  ry += sizes.label * 1.9;
  ry = paragraph(sheet, T(data.source.spelling_provenance, 'note', language),
    memoryBox.x, ry, memoryBox.w, supportH * 0.2, {
      sizes: sizes.micro, color: MUTED, tag: 'board4:spelling',
    }) + 4;
  for (const variant of data.source.spelling_provenance.variants) {
    const line = language === 'zh'
      ? `${variant.spelling}   ${variant.source_id}`
      : `${variant.spelling}   ${variant.used_in}   ${variant.source_id}`;
    ry = paragraph(sheet, line, memoryBox.x, ry, memoryBox.w, supportH * 0.1, {
      sizes: sizes.micro, color: INK, tag: 'board4:spelling-variant',
    }) + 2;
  }

  boardFooter(sheet, language, data, A0.height - A0_MARGIN - A0_FOOTER + 40);
  return sheet;
}


// ---------------------------------------------------------------------------
// 10. A3 booklet
// ---------------------------------------------------------------------------

function a3Page(doc, language, data, pageNumber, totalPages, title) {
  const sheet = doc.addSheet(A3.width, A3.height);
  const labels = data.labels;
  const sizes = A3_SIZES;
  const margin = 40;
  sheet.rect(0, 0, sheet.width, sheet.height, { fill: PAPER });
  sheet.text(data.source.document_title.canonical[language], margin, margin - 12,
    { size: sizes.tiny[0], weight: 700, color: MUTED });
  sheet.text(
    `${T(labels, 'drawing_booklet', language)}   ·   ` +
    `${T(labels, 'drawing_page', language)} ${pageNumber} / ${totalPages}   ·   A3 420 × 297 mm`,
    sheet.width - margin, margin - 12,
    { size: sizes.tiny[0], color: FAINT, align: 'right' });
  sheet.line(margin, margin - 4, sheet.width - margin, margin - 4, { stroke: RULE, lineWidth: 0.7 });
  const titleSize = headline(sheet, title, margin, margin + 22, sheet.width - margin * 2 - 340, sizes.section);
  sheet.line(margin, margin + titleSize * 0.6 + 12, sheet.width - margin, margin + titleSize * 0.6 + 12,
    { stroke: INK, lineWidth: 1.1 });
  const footerTop = sheet.height - margin - 22;
  sheet.line(margin, footerTop, sheet.width - margin, footerTop, { stroke: RULE, lineWidth: 0.6 });
  paragraph(sheet, colophonLine(language, data), margin, footerTop + 4,
    sheet.width - margin * 2, 18, { sizes: sizes.micro, color: FAINT, tag: 'a3:colophon' });
  return {
    sheet,
    box: {
      x: margin,
      y: margin + titleSize * 0.6 + 24,
      w: sheet.width - margin * 2,
      h: footerTop - (margin + titleSize * 0.6 + 24) - 10,
    },
  };
}

function a3Cover(doc, language, data, pageNumber, totalPages, contents) {
  const labels = data.labels;
  const sizes = A3_SIZES;
  const { sheet, box } = a3Page(doc, language, data, pageNumber, totalPages,
    T(labels, 'drawing_contents', language));

  const leftW = box.w * 0.46;
  let y = box.y;
  y = paragraph(sheet, data.source.document_title.canonical[language], box.x, y, leftW, 90, {
    sizes: sizes.title, weight: 700, color: INK, tag: 'a3:cover-title',
  }) + 10;
  y = paragraph(sheet, T(data.source.method_card, 'name', language), box.x, y, leftW, 40, {
    sizes: sizes.panelTitle, color: CHAIN, tag: 'a3:cover-method',
  }) + 12;
  y = paragraph(sheet, T(data.source, 'purpose', language), box.x, y, leftW, 60, {
    sizes: sizes.body, color: MUTED, tag: 'a3:cover-purpose',
  }) + 10;
  y = paragraph(sheet, T(data.source, 'evidence_boundary', language), box.x, y, leftW, 60, {
    sizes: sizes.body, color: GATE, tag: 'a3:cover-boundary',
  }) + 14;
  sheet.line(box.x, y, box.x + leftW, y, { stroke: RULE, lineWidth: 0.7 });
  y += 12;
  y = paragraph(sheet, T(data.governance, 'boundary', language), box.x, y, leftW, 70, {
    sizes: sizes.small, color: MUTED, tag: 'a3:cover-govboundary',
  }) + 10;
  paragraph(sheet, T(labels, 'drawing_topological_note', language), box.x, y, leftW,
    box.y + box.h - y, { sizes: sizes.small, color: GATE, tag: 'a3:cover-topological' });

  const rightX = box.x + leftW + 34;
  const rightW = box.x + box.w - rightX;
  const listTop = box.y;
  // The contents used to run at a fixed row height and stop a third of the way up the
  // page, leaving the rest of the column blank. The blank is now spent on the two records
  // a reader of the booklet has no other single page to find them on: the canonical seven
  // gates, and the denominator every percentage in the booklet is computed against.
  const tailH = 250;
  const rowH = Math.min(26, (box.h - 30 - tailH) / contents.length);
  // The page already carries `drawing_contents` as its section title in the header band,
  // so the column repeats no heading of its own.
  contents.forEach((entry, index) => {
    const ry = listTop + index * rowH;
    sheet.text(String(entry.page).padStart(2, '0'), rightX, ry + rowH * 0.6,
      { size: sizes.body[0], weight: 700, color: CHAIN });
    paragraph(sheet, entry.title, rightX + 26, ry + rowH * 0.1, rightW - 26, rowH * 0.86, {
      sizes: sizes.body, color: INK, tag: `a3:contents:${entry.page}`,
    });
    sheet.line(rightX, ry + rowH, rightX + rightW, ry + rowH, { stroke: HAIR, lineWidth: 0.5 });
  });

  // The cover carries the gate names and their order rather than the full clauses: the
  // clauses are printed at readable size on the synthesis board, and a cover that tried to
  // hold both would print neither legibly. The names and the order are what a booklet page
  // reference has to be able to resolve.
  let ty = listTop + contents.length * rowH + 18;
  const tailBottom = box.y + box.h;
  sheet.text(T(labels, 'drawing_gate_contract', language), rightX, ty + sizes.label * 1.05,
    { size: sizes.label, weight: 700, color: INK });
  ty += sizes.label * 1.9;
  ty = paragraph(sheet, T(labels, 'drawing_gate_contract_note', language), rightX, ty,
    rightW, 46, { sizes: sizes.micro, color: GATE, tag: 'a3:cover-gate-note' }) + 6;
  const gateLine = data.humanGates.gates
    .map((gate) => `${gate.id} ${gate[`name_${language}`]}`)
    .join('   ·   ');
  ty = paragraph(sheet, gateLine, rightX, ty, rightW, 44, {
    sizes: sizes.small, color: INK, tag: 'a3:cover-gates',
  }) + 12;

  sheet.line(rightX, ty - 6, rightX + rightW, ty - 6, { stroke: RULE, lineWidth: 0.7 });
  sheet.text(T(labels, 'drawing_denominator', language), rightX, ty + sizes.label * 1.05,
    { size: sizes.label, weight: 700, color: INK });
  ty += sizes.label * 1.9;
  paragraph(sheet, T(data.denominator, 'text', language), rightX, ty, rightW,
    tailBottom - ty, { sizes: sizes.micro, color: INK, lineHeight: 1.26, tag: 'a3:cover-denominator' });
  return sheet;
}

// A3 page geometry. The plate takes the upper left, the concept column runs down
// the right, and the band under the plate carries the words that make the plate
// usable to a reader who cannot see it.
//
// The plate is the deliverable on this page, so it is given the width the page can
// spare rather than a little over half of it. At 0.56 the drawing stopped around
// three fifths of the way down the sheet and the bottom fifth of the paper carried
// nothing at all; the plate now runs far enough down that the band beneath it ends
// near the footer rule.
const A3_PLATE_FRACTION = 0.655;
const A3_COLUMN_GAP = 18;
// Frame, eyebrow, rule and padding a titled panel spends before any content.
const A3_PANEL_CHROME = 38;

/**
 * The context column beside a plate. Each of the five concepts is answered with the
 * part of the record it is actually about, so the column is never a caption
 * restating the picture: the situation plate carries the claim limits, the flow
 * plate carries the keyed components and routes, the section plate carries the
 * reversibility envelope, the access plate carries winter and maintenance, and the
 * governance plate carries the four actions and the gates that block them.
 */
/**
 * Lay a column of text blocks out so the panel ends where the text ends.
 *
 * Every block is measured at the bottom of the ladder, and the leftover room is
 * shared out in proportion to those floors. That buys two properties at once. No
 * block can be given less than the height its own text needs at the smallest
 * size, so nothing overflows its box or lands on the block after it; and the
 * blocks together consume the panel, so a short section grows into the column
 * instead of leaving two thirds of a drawn frame empty. Growth is in type size
 * rather than in leading, because the column is read off a printed sheet.
 */
function a3ContextBlocks(sheet, inner, top, blocks, sizes) {
  const ladder = sizes.context;
  const measured = blocks.map((block) => {
    const width = inner.w - (block.bullet ? 8 : 0);
    return {
      block,
      gap: block.gap === undefined ? 6 : block.gap,
      floor: paragraphFloor(block.text, width, ladder, block.lineHeight || 1.28, block.weight || 400),
    };
  });
  const gaps = measured.reduce((sum, m) => sum + m.gap, 0);
  const total = measured.reduce((sum, m) => sum + m.floor, 0);
  const available = inner.y + inner.h - top;
  const scale = total > 0 ? Math.max(1, (available - gaps) / total) : 1;

  let y = top;
  for (const { block, gap, floor } of measured) {
    const height = floor * scale;
    if (block.rule) sheet.line(inner.x, y - 3, inner.x + inner.w, y - 3, { stroke: RULE, lineWidth: 0.6 });
    if (block.bullet) {
      sheet.circle(inner.x + 2.2, y + height * 0.3, 1.6, { fill: block.color || FAINT });
    }
    paragraph(sheet, block.text, inner.x + (block.bullet ? 8 : 0), y,
      inner.w - (block.bullet ? 8 : 0), height, {
        sizes: ladder,
        color: block.color || INK,
        weight: block.weight || 400,
        lineHeight: block.lineHeight || 1.28,
        tag: block.tag,
      });
    y += height + gap;
  }
}

/**
 * What the concept column says, separated from where it is drawn.
 *
 * Three of the five concepts set the column as a short stack of text blocks, and
 * the page needs their height before it can decide how tall to draw the panel.
 * The other two set it as a table that distributes its rows over whatever height
 * it is given; they return null and keep their own renderer below.
 */
function a3ContextSpec(plate, area, language, data, sizes) {
  const labels = data.labels;
  const id = plate.artifact_id;

  if (plate.concept_slug === 'situation-claim-limits') {
    const blocks = [
      { text: `${T(labels, 'role_label', language)}: ${T(area, 'role', language)}`,
        color: CHAIN, tag: `a3ctx:role:${id}` },
      { text: T(area, 'distinct_task', language), color: MUTED, tag: `a3ctx:task:${id}` },
    ];
    if (!area.georeferenced) {
      blocks.push({ text: T(area, 'non_station_note', language), color: GATE,
        tag: `a3ctx:nonstation:${id}` });
    }
    blocks.push(
      { text: T(data.source, 'evidence_boundary', language), color: MUTED, bullet: true,
        rule: true, tag: `a3ctx:limit:${id}:evidence` },
      { text: T(data.governance, 'boundary', language), color: MUTED, bullet: true,
        tag: `a3ctx:limit:${id}:governance` });
    return {
      title: T(labels, 'drawing_claim_limits', language),
      fill: PANEL_DEEP,
      badges: areaBadges(area, language, labels),
      blocks,
    };
  }

  if (plate.concept_slug === 'reversible-module-sections') {
    const envelope = area.phase1_envelope;
    return {
      title: T(labels, 'envelope', language),
      badges: [
        { text: T(labels, 'reversible', language), style: { fill: CHAIN_SOFT, color: CHAIN } },
        { text: T(labels, 'not_authorized', language) },
        { text: T(labels, 'unfunded', language) },
      ],
      blocks: [
        { text: `${envelope.id}   ${T(envelope, 'description', language)}`,
          color: INK, tag: `a3ctx:envelope:${id}` },
        { text: `${T(labels.governance, 'blocked_by', language)}: ` +
            `${(envelope.blocked_by || []).join(' ')}`,
          color: GATE, weight: 700, tag: `a3ctx:envgates:${id}` },
        { text: T(labels, 'drawing_topological_note', language),
          color: GATE, rule: true, tag: `a3ctx:topo:${id}` },
      ],
    };
  }

  if (plate.concept_slug === 'access-operations-seasons') {
    // Only the routes that actually carry a step-free claim are listed. A route
    // that does not is not evidence of anything and is left off rather than
    // padding the column into looking more complete than the record is.
    const stepFree = area.routes.filter((route) => route.step_free);
    return {
      title: T(labels, 'winter', language),
      badges: null,
      blocks: [
        { text: `${T(labels, 'winter', language)}: ${T(area, 'winter', language)}`,
          color: INK, lineHeight: 1.3, tag: `a3ctx:winter:${id}` },
        { text: `${T(labels, 'maintenance', language)}: ${T(area, 'maintenance', language)}`,
          color: INK, lineHeight: 1.3, tag: `a3ctx:maintenance:${id}` },
        { text: T(labels, 'step_free', language),
          color: CHAIN, weight: 700, rule: true, gap: 3, tag: `a3ctx:stepfree:${id}` },
        ...stepFree.map((route) => ({
          text: `${route.id} ${T(route, 'name', language)} — ${route.evidence_ref}`,
          color: MUTED, bullet: true, tag: `a3ctx:stepfree:${id}:${route.id}`,
        })),
      ],
    };
  }

  return null;
}

/**
 * The height a block-stacked concept column wants, measured at the top of its
 * ladder. Drawing the panel taller than this cannot make the text any larger,
 * because the ladder has a ceiling; it only draws a longer frame around the same
 * words. Sizing the panel to this figure instead moves the leftover column out
 * of the frame, where it reads as white paper between two panels rather than as
 * a half-empty box. A table-based column has no natural height and takes the
 * room it is given.
 */
function a3ContextHeight(spec, width, sizes) {
  if (!spec) return Infinity;
  const size = sizes.context[0];
  const inner = width - sizes.label * 2.4;
  let total = spec.badges ? sizes.label * 2.6 : 0;
  for (const block of spec.blocks) {
    const lines = typeface.wrapText(substitute(block.text),
      { maxWidth: inner - (block.bullet ? 8 : 0), size, weight: block.weight || 400 });
    total += lines.length * size * (block.lineHeight || 1.28)
      + (block.gap === undefined ? 6 : block.gap);
  }
  return A3_PANEL_CHROME + total;
}

function a3PlateContext(sheet, box, plate, area, language, data, sizes) {
  const labels = data.labels;
  const id = plate.artifact_id;

  const spec = a3ContextSpec(plate, area, language, data, sizes);
  if (spec) {
    const inner = panel(sheet, spec.title, box.x, box.y, box.w, box.h, sizes,
      spec.fill ? { fill: spec.fill } : {});
    let top = inner.y;
    if (spec.badges) {
      badgeRow(sheet, spec.badges, inner.x, top, { size: sizes.label });
      top += sizes.label * 2.6;
    }
    a3ContextBlocks(sheet, inner, top, spec.blocks, sizes);
    return;
  }

  if (plate.concept_slug === 'program-flows') {
    const inner = panel(sheet, T(labels, 'drawing_keyed_details', language),
      box.x, box.y, box.w, box.h, sizes);
    const entries = keyedEntries(area, language, data);
    const rowH = inner.h / entries.length;
    entries.forEach((entry, index) => {
      const y = inner.y + index * rowH;
      if (index % 2 === 1) sheet.rect(inner.x - 3, y, inner.w + 6, rowH, { fill: PANEL_DEEP });
      sheet.rect(inner.x, y + 1, 2, rowH - 3, { fill: entry.accent });
      const idW = sheet.text(entry.id, inner.x + 7, y + sizes.micro[0] * 1.3,
        { size: sizes.micro[0], weight: 700, color: entry.accent });
      headline(sheet, entry.name, inner.x + 11 + idW, y + sizes.micro[0] * 1.3,
        inner.w - idW - 14, sizes.micro, { weight: 700 });
      paragraph(sheet, entry.description, inner.x + 7, y + sizes.micro[0] * 1.7,
        inner.w - 10, rowH - sizes.micro[0] * 2.9, {
          sizes: sizes.micro, color: MUTED, lineHeight: 1.22, tag: `a3ctx:keyed:${id}:${entry.id}`,
        });
      sheet.text(`${T(labels.governance, 'blocked_by', language)}: ${entry.gates.join(' ')}`,
        inner.x + 7, y + rowH - 2,
        { size: sizes.micro[sizes.micro.length - 1], weight: 700, color: GATE });
    });
    return;
  }

  const inner = panel(sheet, T(data.governance.labels, 'heading', language),
    box.x, box.y, box.w, box.h, sizes);
  const index = data.source.areas.indexOf(area);
  const actions = data.governance.actions.slice(index * 4, index * 4 + 4);
  const rowH = inner.h / actions.length;
  actions.forEach((action, row) => {
    const y = inner.y + row * rowH;
    if (row % 2 === 1) sheet.rect(inner.x - 3, y, inner.w + 6, rowH, { fill: PANEL_DEEP });
    const project = data.projectsById.get(action.id);
    const idW = sheet.text(`${action.id}`, inner.x, y + sizes.tiny[0] * 1.2,
      { size: sizes.tiny[0], weight: 700, color: INK });
    headline(sheet, T(project, 'name', language), inner.x + idW + 8, y + sizes.tiny[0] * 1.2,
      inner.w - idW - 10, sizes.micro, { weight: 700 });
    sheet.text(`${action.phase}   ${T(data.governance.labels, 'authorized_target', language)}: ` +
      `${T(data.governance.labels, 'null_target', language)}`,
      inner.x, y + sizes.tiny[0] * 2.1,
      { size: sizes.micro[sizes.micro.length - 1], color: FAINT });
    let ay = y + sizes.tiny[0] * 2.5;
    ay = paragraph(sheet,
      `${T(data.governance.labels, 'stop_trigger', language)}: ${T(action, 'stop_trigger', language)}`,
      inner.x, ay, inner.w, rowH - (ay - y) - sizes.micro[0] * 1.6, {
        sizes: sizes.micro, color: MUTED, lineHeight: 1.22, tag: `a3ctx:trigger:${id}:${action.id}`,
      });
    sheet.text(`${T(data.governance.labels, 'blocked_by', language)}: ${action.blocked_by.join(' ')}`,
      inner.x, y + rowH - 2,
      { size: sizes.micro[sizes.micro.length - 1], weight: 700, color: GATE });
  });
}

/**
 * The running appendix, fifteen sections in a fixed order.
 *
 * The previous booklet gave the method card, the ablation, the institutions and the
 * claim limits a full page each. This one gives every plate page a band and walks
 * the same material through it, so nothing was dropped in the move to one plate per
 * page and a reader who stops at any plate still has the provenance of the thing in
 * front of them within reach.
 */
function a3AppendixSections(data, language) {
  const labels = data.labels;
  const card = data.source.method_card;
  const ablation = data.ablation;
  const pairs = (record) => Object.entries(record).map(([key, value]) => `${key} ${value}`);

  return [
    {
      title: T(labels, 'drawing_method_card', language),
      lines: [T(card, 'name', language),
        `${T(labels, 'drawing_operates_on', language)}: ${T(card, 'operates_on', language)}`],
    },
    {
      title: T(labels, 'drawing_guaranteed', language),
      bullets: TA(card, 'guaranteed_by_construction', language),
    },
    {
      title: T(labels, 'drawing_does_not_compute', language),
      bullets: TA(card, 'does_not_compute', language), color: GATE,
    },
    {
      title: T(labels, 'drawing_limitations', language),
      bullets: TA(card, 'limitations', language),
    },
    {
      title: T(labels, 'drawing_thresholds', language),
      lines: pairs(card.thresholds),
    },
    {
      title: T(labels, 'drawing_reproducer', language),
      lines: pairs(card.reproducer),
    },
    {
      title: T(labels, 'drawing_ablation', language),
      lines: [T(ablation, 'definition', language),
        `seeds ${ablation.seeds}   jitter_range [${ablation.jitter_range.join(', ')}]   ` +
        `selected_edges_per_run ${ablation.selected_edges_per_run}`,
        `candidate_edges ${ablation.summary.candidate_edges}   ` +
        `largest_absolute_delta ${ablation.summary.largest_absolute_delta}   ` +
        `runs ${data.runs.runs}   nodes ${data.inputs.nodes.length}   edges ${data.inputs.edges.length}`],
    },
    {
      title: `${T(labels, 'drawing_ablation', language)} \u00b7 summary`,
      lines: ['edges_changing_status', 'zero_jitter_always_selected',
        'zero_jitter_never_selected', 'zero_jitter_still_unstable'].map(
        (key) => `${key}: ${ablation.summary[key].join(' ')}`),
    },
    {
      title: `${T(labels, 'drawing_ablation', language)} \u00b7 edges`,
      // Two edges to a printed row. One row per edge was taller than the appendix
      // column, which pushed the "not a finding" note off the bottom of the panel
      // \u2014 the one sentence on this page that must not go missing. Every edge and
      // every number is still printed; only the packing changed.
      lines: ablation.edges.reduce((rows, edge, index) => {
        const cell = `${edge.edge_id}   ${edge.primary_frequency}   ` +
          `${edge.zero_jitter_frequency}   ${edge.delta}`;
        if (index % 2 === 0) rows.push(cell);
        else rows[rows.length - 1] += `      ${cell}`;
        return rows;
      }, []),
      note: T(ablation, 'not_a_finding', language),
    },
    {
      title: T(labels, 'drawing_lab_coupling', language),
      lines: [T(data.source.lab_coupling, 'rule', language)],
      bullets: data.source.lab_coupling.channels.map(
        (channel) => `${channel.id} ${T(channel, 'name', language)} \u2014 ${T(channel, 'definition', language)}`),
    },
    {
      title: T(labels, 'drawing_public_memory', language),
      lines: [T(data.source.public_memory, 'rule', language)],
      bullets: TA(data.source.public_memory, 'guarantees', language),
    },
    {
      title: T(labels, 'drawing_spelling', language),
      lines: [T(data.source.spelling_provenance, 'note', language)],
      bullets: data.source.spelling_provenance.variants.map((variant) => (language === 'zh'
        ? `${variant.spelling}   ${variant.source_id}`
        : `${variant.spelling}   ${variant.used_in}   ${variant.source_id}`)),
    },
    {
      title: T(labels, 'drawing_standards', language),
      lines: [T(data.source.standards_additions, 'reason', language)],
      bullets: data.source.standards_additions.records.map((record) =>
        `${record.standard_id}   review_status ${record.review_status}   ` +
        `mandatory ${record.mandatory}   ${record.source_ids.join(' ')}`),
    },
    {
      title: T(labels, 'drawing_terminology', language),
      bullets: data.source.terminology.map(
        (term) => `${term.id}: ${T(term, 'reason', language)}`),
    },
    {
      title: T(labels, 'drawing_marker_migration', language),
      lines: [T(data.source.marker_migration, 'reason', language),
        `${data.source.marker_migration.unsupported_kind} \u2192 ${data.source.marker_migration.target_kind}   ` +
        `${data.source.marker_migration.target_file}   ` +
        `expected_replacements ${data.source.marker_migration.expected_replacements}   ` +
        `expected_distinct_ids ${data.source.marker_migration.expected_distinct_ids}`],
      note: `${T(labels, 'drawing_typeface', language)}   ${T(labels, 'drawing_generated_note', language)}`,
    },
  ];
}

/**
 * The floor height of every block in an appendix section, measured at the
 * smallest type on the ladder.
 *
 * The panel used to be drawn at a fixed fraction of the page: the frame reached
 * the footer, the words stopped a third of the way down it, and the empty
 * remainder read as something the builder had failed to draw. Sizing the panel
 * from the same measurements that later allocate the blocks inside it means the
 * frame ends where the section ends, and no block can be handed less room than
 * its own text needs.
 */
function a3AppendixFloors(section, width, sizes) {
  const lines = (section.lines || []).map(
    (line) => paragraphFloor(line, width, sizes.appendix, 1.26));
  const bullets = (section.bullets || []).map(
    (bullet) => paragraphFloor(bullet, width - 8, sizes.appendix, 1.3));
  const note = section.note ? paragraphFloor(section.note, width, sizes.appendix, 1.26) : 0;
  const gaps = lines.length * 3 + bullets.length * 1.5 + (section.note ? 4 : 0);
  const total = lines.reduce((a, b) => a + b, 0)
    + bullets.reduce((a, b) => a + b, 0) + note + gaps;
  return { lines, bullets, note, gaps, total };
}

function a3AppendixHeight(section, width, sizes) {
  // The floors are measured at the bottom of the ladder. Drawing the panel at
  // exactly that height would force every block to render at that bottom size,
  // so the panel is given room for the blocks to climb a few steps; the stretch
  // is what turns spare column into legible type rather than into a gap.
  return A3_PANEL_CHROME + a3AppendixFloors(section, width, sizes).total * 1.75;
}

function a3AppendixBlock(sheet, box, section, index, language, data, sizes) {
  const labels = data.labels;
  const heading = panel(sheet,
    `${T(labels, 'drawing_appendix', language)} ${index + 1} / 15   \u00b7   ${section.title}`,
    box.x, box.y, box.w, box.h, sizes);
  const bottom = heading.y + heading.h;

  // Every block is given its own floor height scaled by whatever room the panel
  // has over the sum of those floors. Two properties follow, and both used to be
  // violated: no block can be squeezed under the height its own text needs at the
  // smallest size, so nothing overflows or lands on top of the block after it;
  // and the blocks between them consume the panel, so the section ends at the
  // frame instead of a third of the way down it. The note is last and is measured
  // with the rest, which is what keeps the one gate sentence on the panel.
  const floors = a3AppendixFloors(section, heading.w, sizes);
  const available = bottom - heading.y;
  const scale = floors.total > 0 ? Math.max(1, (available - floors.gaps) / (floors.total - floors.gaps)) : 1;

  let y = heading.y;
  (section.lines || []).forEach((line, i) => {
    y = paragraph(sheet, line, heading.x, y, heading.w, floors.lines[i] * scale, {
      sizes: sizes.appendix, color: section.color || INK, lineHeight: 1.26,
      tag: `a3appendix:${index}:line`,
    }) + 3;
  });
  (section.bullets || []).forEach((bullet, i) => {
    sheet.circle(heading.x + 2.2, y + floors.bullets[i] * scale * 0.32, 1.6,
      { fill: section.color || FAINT });
    paragraph(sheet, bullet, heading.x + 8, y, heading.w - 8, floors.bullets[i] * scale, {
      sizes: sizes.appendix, color: section.color || MUTED, lineHeight: 1.3,
      tag: `a3appendix:${index}:bullet`,
    });
    y += floors.bullets[i] * scale + 1.5;
  });
  if (section.note) {
    paragraph(sheet, section.note, heading.x, y, heading.w, Math.max(floors.note, bottom - y), {
      sizes: sizes.appendix, color: GATE, lineHeight: 1.26, tag: `a3appendix:${index}:note`,
    });
  }
}

/**
 * One plate per page, and beside it on every page the same three things: what this
 * plate is for, what the package will not claim from it, and the description a
 * reader who cannot see the drawing needs in order to use it. A plate without those
 * three is a picture rather than a drawing.
 */
function a3PlatePage(doc, language, data, plate, area, section, sectionIndex) {
  const labels = data.labels;
  const sizes = A3_SIZES;
  const pageNumber = plate.placements.a3.page;
  const { sheet, box } = a3Page(doc, language, data, pageNumber, A3_PAGES,
    `${plate.plate_id}   ${plate.title}`);

  const plateW = box.w * A3_PLATE_FRACTION;
  const plateH = plateW * plate.height_px / plate.width_px;
  const drawn = sheet.image(plate.file, box.x, box.y, plateW, plateH);
  sheet.rect(drawn.x, drawn.y, drawn.width, drawn.height, { stroke: RULE, lineWidth: 0.8 });

  // the band under the plate, for a reader who cannot see it -----------------
  // The band used to be set at the two smallest ladders on the page, which put the
  // description of the drawing and its claim limits at around five and a half
  // point on a 420 mm sheet. Those are the sentences that decide what the plate
  // may be read as claiming, so they are offered the larger steps first and take
  // the height the plate no longer wastes.
  const bandTop = box.y + plateH + 12;
  const bandBottom = box.y + box.h;
  sheet.line(box.x, bandTop - 6, box.x + plateW, bandTop - 6, { stroke: INK, lineWidth: 0.9 });
  let by = paragraph(sheet,
    `${T(labels, 'drawing_plate_description', language)}: ${plate.alt_text}`,
    box.x, bandTop, plateW, (bandBottom - bandTop) * 0.3,
    { sizes: sizes.plateAlt, color: INK, lineHeight: 1.3, tag: `a3:alt:${plate.artifact_id}` }) + 6;
  by = paragraph(sheet, plate.extended_description, box.x, by, plateW, (bandBottom - by) * 0.52,
    { sizes: sizes.plateBand, color: MUTED, lineHeight: 1.32, tag: `a3:desc:${plate.artifact_id}` }) + 6;
  by = paragraph(sheet, plate.claim_limits, box.x, by, plateW, (bandBottom - by) * 0.74,
    { sizes: sizes.plateBand, color: GATE, lineHeight: 1.32, tag: `a3:limits:${plate.artifact_id}` }) + 6;
  paragraph(sheet,
    `${plate.artifact_id}   \u00b7   ${T(labels, 'drawing_plate_status', language)}: ` +
    `${T(labels, 'drawing_plate_pending', language)}   \u00b7   ` +
    `${T(labels, 'drawing_plate_translation', language)}`,
    box.x, by, plateW, Math.max(0, bandBottom - by),
    { sizes: sizes.tiny, color: FAINT, lineHeight: 1.28, tag: `a3:status:${plate.artifact_id}` });

  // the concept column, then the running appendix ---------------------------
  // The appendix is drawn at the height its own section needs and pinned to the
  // bottom of the column; a block-stacked concept panel is drawn at the height
  // its own content needs and pinned to the top, while a table-based one still
  // takes everything above the appendix. Whichever section lands on this page,
  // both panels end in words rather than in a frame around nothing, and column
  // neither of them needs falls between them as plain paper.
  const colX = box.x + plateW + A3_COLUMN_GAP;
  const colW = box.x + box.w - colX;
  const appendixH = Math.min(
    box.h * 0.55,
    Math.max(box.h * 0.16, a3AppendixHeight(section, colW - sizes.label * 2.4, sizes)));
  const appendixTop = box.y + box.h - appendixH;
  const contextH = Math.min(
    a3ContextHeight(a3ContextSpec(plate, area, language, data, sizes), colW, sizes),
    appendixTop - box.y - 16);
  a3PlateContext(sheet, { x: colX, y: box.y, w: colW, h: contextH },
    plate, area, language, data, sizes);

  sheet.line(colX, appendixTop - 9, colX + colW, appendixTop - 9, { stroke: INK, lineWidth: 0.9 });
  a3AppendixBlock(sheet, { x: colX, y: appendixTop, w: colW, h: appendixH },
    section, sectionIndex, language, data, sizes);

  return {
    placement_id: plate.placements.a3.placement_id,
    artifact_id: plate.artifact_id,
    plate_id: plate.plate_id,
    file: plate.file,
    page: pageNumber,
    appendix_section: sectionIndex + 1,
    box_pt: [Number(drawn.x.toFixed(2)), Number(drawn.y.toFixed(2)),
      Number(drawn.width.toFixed(2)), Number(drawn.height.toFixed(2))],
  };
}

// ---------------------------------------------------------------------------
// 11. Document composition
// ---------------------------------------------------------------------------

/**
 * Walks the plates of one language in registry order: three area boards, then the
 * synthesis board. The order of the plates on each board is the registry's, not a
 * list held here, so the boards cannot drift from what the registry publishes.
 */
function orderedPlates(language, data) {
  const ordered = [];
  for (const area of data.source.areas) {
    for (const plate of data.plateIndex.sheets.get(`${area.plate_prefix}:${language}`)) {
      ordered.push({ plate, area });
    }
  }
  return ordered;
}

function buildA0(language, data) {
  activeLanguage = language;
  const doc = new PdfDocument(
    `${data.source.document_title.canonical[language]} — ${T(data.labels, 'drawing_board', language)}`);
  doc.placements = [];
  for (const area of data.source.areas) {
    const sheets = data.plateIndex.sheets.get(`${area.plate_prefix}:${language}`);
    const { placements } = buildAreaBoard(
      doc, language, data, area, sheets, AREA_SHEETS[area.plate_prefix].board);
    for (const placement of placements) doc.placements.push(placement);
  }
  buildSynthesisBoard(doc, language, data);
  if (doc.sheets.length !== A0_BOARDS) {
    throw new Error(`build-drawings: the ${language} boards came out at ${doc.sheets.length}, expected ${A0_BOARDS}`);
  }
  activeLanguage = null;
  return doc;
}

function buildA3(language, data) {
  activeLanguage = language;
  const labels = data.labels;
  const doc = new PdfDocument(
    `${data.source.document_title.canonical[language]} — ${T(labels, 'drawing_booklet', language)}`);

  // One appendix section per plate page. If the two ever disagree the booklet
  // would silently drop a section rather than print a short one, so it stops here.
  const sections = a3AppendixSections(data, language);
  const ordered = orderedPlates(language, data);
  if (sections.length !== ordered.length) {
    throw new Error(
      `build-drawings: the appendix has ${sections.length} sections for ${ordered.length} plate pages`);
  }

  const contents = [{ page: 1, title: T(labels, 'drawing_contents', language) }].concat(
    ordered.map(({ plate }) => ({
      page: plate.placements.a3.page,
      title: `${plate.plate_id}   ${plate.title}`,
    })));

  a3Cover(doc, language, data, 1, A3_PAGES, contents);
  doc.placements = ordered.map(({ plate, area }, index) =>
    a3PlatePage(doc, language, data, plate, area, sections[index], index));
  if (doc.sheets.length !== A3_PAGES) {
    throw new Error(`build-drawings: the ${language} booklet came out at ${doc.sheets.length} pages, expected ${A3_PAGES}`);
  }
  activeLanguage = null;
  return doc;
}

// ---------------------------------------------------------------------------
// 12. Self-verification of the produced bytes
// ---------------------------------------------------------------------------

/**
 * Re-reads the file that was just assembled: header, trailer, xref offsets,
 * embedded font programs and /ToUnicode coverage. Nothing here trusts the
 * writer; every claim is checked against the bytes.
 */
function verifyDocument(relative, result, doc, failures) {
  const bytes = result.bytes;
  const latin = bytes.toString('latin1');

  if (!latin.startsWith('%PDF-')) failures.push(`${relative}: missing %PDF- header`);
  if (!latin.trimEnd().endsWith('%%EOF')) failures.push(`${relative}: missing %%EOF`);

  const fontFileCount = (latin.match(/\/FontFile2/g) || []).length;
  const toUnicodeCount = (latin.match(/\/ToUnicode/g) || []).length;
  if (fontFileCount < 1) failures.push(`${relative}: no /FontFile2 stream`);
  if (toUnicodeCount < 1) failures.push(`${relative}: no /ToUnicode CMap`);
  if (/\/BaseFont\s*\/(Helvetica|Times|Courier|Symbol|ZapfDingbats|STSong)/.test(latin)) {
    failures.push(`${relative}: references a non-embedded base font`);
  }

  const startIndex = latin.lastIndexOf('startxref');
  if (startIndex < 0) {
    failures.push(`${relative}: no startxref`);
    return { fontFileCount, toUnicodeCount, pages: result.pages, mappedGlyphs: 0 };
  }
  const xrefOffset = Number(latin.slice(startIndex + 9).trim().split(/\s/)[0]);
  if (latin.slice(xrefOffset, xrefOffset + 4) !== 'xref') {
    failures.push(`${relative}: startxref does not point at an xref table`);
  }
  for (let id = 1; id <= result.objectCount; id += 1) {
    const offset = result.offsets[id];
    const header = latin.slice(offset, offset + 24);
    if (!header.startsWith(`${id} 0 obj`)) {
      failures.push(`${relative}: xref offset for object ${id} does not resolve`);
      break;
    }
  }

  // /ToUnicode round trip: inflate each CMap and check it maps every glyph the
  // pages actually drew back to the code point that produced it.
  const mapped = new Map();
  for (const id of result.toUnicodeIds) {
    const offset = result.offsets[id];
    const slice = latin.slice(offset);
    const streamStart = slice.indexOf('stream\n');
    const streamEnd = slice.indexOf('\nendstream');
    if (streamStart < 0 || streamEnd < 0) {
      failures.push(`${relative}: /ToUnicode object ${id} has no stream`);
      continue;
    }
    const payload = bytes.subarray(offset + streamStart + 7, offset + streamEnd);
    const text = zlib.inflateSync(payload).toString('latin1');
    // Start past the codespace range so its <0000> <FFFF> is not read as a
    // character mapping.
    const bfchar = text.indexOf('beginbfchar');
    const body = bfchar < 0 ? '' : text.slice(bfchar);
    const pattern = /<([0-9A-F]{4})>\s*<([0-9A-F]+)>/g;
    let match = pattern.exec(body);
    while (match !== null) {
      const gid = parseInt(match[1], 16);
      const utf16 = Buffer.from(match[2], 'hex');
      mapped.set(`${id}:${gid}`, utf16.swap16().toString('utf16le').codePointAt(0));
      match = pattern.exec(body);
    }
  }
  const keys = ['regular', 'bold'].filter((key) => doc.usage[key].size > 0);
  keys.forEach((key, index) => {
    const id = result.toUnicodeIds[index];
    for (const [gid, codePoint] of doc.usage[key]) {
      const found = mapped.get(`${id}:${gid}`);
      if (found !== codePoint) {
        failures.push(
          `${relative}: /ToUnicode does not map glyph ${gid} of the ${key} font back to ` +
          `U+${codePoint.toString(16).toUpperCase()}`);
        break;
      }
    }
  });

  // The embedded programs must be the subset byte for byte.
  for (const id of result.fontFileIds) {
    const offset = result.offsets[id];
    const slice = latin.slice(offset);
    const streamStart = slice.indexOf('stream\n');
    const streamEnd = slice.indexOf('\nendstream');
    const payload = bytes.subarray(offset + streamStart + 7, offset + streamEnd);
    const program = zlib.inflateSync(payload);
    if (program.readUInt32BE(0) !== 0x00010000) {
      failures.push(`${relative}: /FontFile2 object ${id} is not a TrueType program`);
    }
  }

  return {
    fontFileCount,
    toUnicodeCount,
    pages: result.pages,
    mappedGlyphs: mapped.size,
  };
}

// ---------------------------------------------------------------------------
// 13. Data loading and CLI
// ---------------------------------------------------------------------------

// The visual hierarchy a board has to deliver, by plate sequence. Plate 02 is the
// dominant spatial plan and plate 03 the second; the other three are support. A
// board that reads in a different order is arguing something the text does not.
const PLATE_RANKS = Object.freeze([3, 1, 2, 4, 5]);

/**
 * Reads the 33-byte PNG header and nothing else. The registry declares each
 * raster's pixel size and the board layout is computed from it, so a registry that
 * disagrees with the file on disk would reserve a box for one drawing and print
 * another at a different shape.
 */
function readPngSize(absolute, relative) {
  const head = Buffer.alloc(33);
  const fd = fs.openSync(absolute, 'r');
  let read = 0;
  try {
    read = fs.readSync(fd, head, 0, 33, 0);
  } finally {
    fs.closeSync(fd);
  }
  if (read < 33 || head.toString('latin1', 12, 16) !== 'IHDR') {
    throw new Error(`build-drawings: ${relative} does not begin with a PNG IHDR chunk`);
  }
  return { width: head.readUInt32BE(16), height: head.readUInt32BE(20) };
}

/**
 * Indexes the plate registry and checks it against the drawings it governs.
 *
 * The registry is the single source of truth for what each plate is, where it
 * lands, and how much of a board it takes; this build follows it rather than
 * asserting numbers of its own. That only works in one direction. Every claim the
 * registry makes has to be one the build can actually honour, so a claim it cannot
 * honour stops the build here rather than being quietly overridden downstream and
 * leaving the registry describing a drawing nobody printed.
 */
function indexPlates(registry) {
  const expectedCounts = { semantic_plates: 15, artifacts: 30, zh: 15, en: 15 };
  for (const [key, value] of Object.entries(expectedCounts)) {
    const actual = registry.counts ? registry.counts[key] : undefined;
    if (actual !== value) {
      throw new Error(
        `build-drawings: area-plates.json counts.${key} is ${JSON.stringify(actual)}, expected ${value}`);
    }
  }
  const artifacts = registry.artifacts;
  if (!Array.isArray(artifacts) || artifacts.length !== 30) {
    throw new Error('build-drawings: area-plates.json holds ' +
      `${Array.isArray(artifacts) ? artifacts.length : 'no'} artifacts, expected 30`);
  }

  const byId = new Map();
  for (const record of artifacts) {
    if (byId.has(record.artifact_id)) {
      throw new Error(`build-drawings: duplicate plate artifact ${record.artifact_id}`);
    }
    byId.set(record.artifact_id, record);
  }

  const sheets = new Map();
  for (const record of artifacts) {
    const id = record.artifact_id;
    for (const field of PLATE_RECORD_FIELDS) {
      if (record[field] === undefined) throw new Error(`build-drawings: ${id} has no ${field}`);
    }
    if (!LANGUAGES.includes(record.language)) {
      throw new Error(`build-drawings: ${id} language is ${JSON.stringify(record.language)}`);
    }
    // The area prefix and the plate's position in its set are read back out of the
    // ids the registry already carries, rather than stored a second time. A record
    // that spelled them out separately could disagree with its own plate_id, and
    // then a plate would be paged to a sheet its own name says it is not on.
    const sequence = Number(record.concept_id);
    if (!Number.isInteger(sequence) || sequence < 1 || sequence > PLATE_CONCEPTS.length) {
      throw new Error(`build-drawings: ${id} concept_id ${JSON.stringify(record.concept_id)} is not 01-05`);
    }
    if (record.concept_id !== String(sequence).padStart(2, '0')) {
      throw new Error(`build-drawings: ${id} concept_id ${JSON.stringify(record.concept_id)} is not zero-padded`);
    }
    if (record.concept_slug !== PLATE_CONCEPTS[sequence - 1]) {
      throw new Error(`build-drawings: ${id} is concept ${record.concept_id} carrying slug ` +
        `${record.concept_slug}; concept ${record.concept_id} is ${PLATE_CONCEPTS[sequence - 1]}`);
    }
    const areaPrefix = String(record.plate_id).split('-')[0];
    if (record.plate_id !== `${areaPrefix}-${record.concept_id}`) {
      throw new Error(`build-drawings: ${id} plate_id ${record.plate_id} does not match its prefix and concept`);
    }
    if (id !== `${record.plate_id}-${record.language}`) {
      throw new Error(`build-drawings: ${id} is not named after its plate and language`);
    }

    // An English plate is the twin of a Chinese original, not a plate in its own
    // right. If that link does not resolve, the English boards are a second design
    // rather than a translation of the first, and the two can drift apart unseen.
    if (record.language === 'en') {
      const original = byId.get(record.translation_of);
      if (!original) {
        throw new Error(`build-drawings: ${id} translation_of ` +
          `${JSON.stringify(record.translation_of)} resolves to no artifact`);
      }
      if (original.language !== 'zh' || original.plate_id !== record.plate_id) {
        throw new Error(`build-drawings: ${id} is not the twin of ${original.artifact_id}`);
      }
    } else if (record.translation_of !== null) {
      throw new Error(`build-drawings: ${id} is a Chinese original and must carry translation_of null`);
    }

    const status = record.status || {};
    if (status.verified !== false) {
      throw new Error(`build-drawings: ${id} reports verified ` +
        `${JSON.stringify(status.verified)}; no plate in this package is verified`);
    }

    const absolute = path.join(PACKAGE_ROOT, record.file);
    if (!fs.existsSync(absolute)) {
      throw new Error(`build-drawings: ${id} raster ${record.file} does not exist`);
    }
    const size = readPngSize(absolute, record.file);
    if (size.width !== record.width_px || size.height !== record.height_px) {
      throw new Error(`build-drawings: ${id} declares ${record.width_px}x${record.height_px} but ` +
        `${record.file} is ${size.width}x${size.height}`);
    }

    const sheet = AREA_SHEETS[areaPrefix];
    if (!sheet) throw new Error(`build-drawings: ${id} carries unknown area prefix ${areaPrefix}`);
    const places = record.placements || {};
    const a3 = places.a3 || {};
    const a0 = places.a0 || {};
    const page = sheet.firstPage + sequence - 1;
    const expected = {
      'placements.a3.page': [a3.page, page],
      'placements.a3.placement_id': [a3.placement_id, `a3-p${String(page).padStart(2, '0')}-plate`],
      'placements.a0.page': [a0.page, sheet.board],
      'placements.a0.placement_id': [a0.placement_id, `a0-b${sheet.board}-${record.concept_id}`],
      'placements.viewer_anchor': [places.viewer_anchor,
        `plate-${areaPrefix.toLowerCase()}-${record.concept_id}-${record.language}`],
      'placements.a0.visual_rank': [a0.visual_rank, PLATE_RANKS[sequence - 1]],
    };
    for (const [field, [actual, want]] of Object.entries(expected)) {
      if (actual !== want) {
        throw new Error(`build-drawings: ${id} ${field} is ${JSON.stringify(actual)}, ` +
          `the drawings place it at ${JSON.stringify(want)}`);
      }
    }

    const fraction = a0.area_fraction;
    if (typeof fraction !== 'number' || !(fraction > 0)) {
      throw new Error(`build-drawings: ${id} area_fraction is ${JSON.stringify(fraction)}`);
    }
    const floor = a0.visual_rank === 1 ? 0.30 : a0.visual_rank === 2 ? 0.20 : null;
    if (floor !== null && fraction < floor) {
      throw new Error(`build-drawings: ${id} is rank ${a0.visual_rank} at area_fraction ` +
        `${fraction}; rank ${a0.visual_rank} must hold at least ${floor} of the board`);
    }
    if (floor === null && fraction > 0.15) {
      throw new Error(`build-drawings: ${id} is a support plate at area_fraction ` +
        `${fraction}; support plates may hold at most 0.15 of the board`);
    }

    const key = `${areaPrefix}:${record.language}`;
    if (!sheets.has(key)) sheets.set(key, new Array(5).fill(null));
    sheets.get(key)[sequence - 1] = record;
  }

  for (const prefix of Object.keys(AREA_SHEETS)) {
    for (const language of LANGUAGES) {
      const list = sheets.get(`${prefix}:${language}`);
      if (!list || list.some((item) => item === null)) {
        throw new Error(`build-drawings: ${prefix} has an incomplete ${language} plate set`);
      }
    }
  }
  return { byId, sheets };
}

function loadData() {
  const source = readJson(SOURCE_FILE);
  const governance = readJson(GOVERNANCE_FILE);
  const ablation = readJson(ABLATION_FILE);
  const inputs = readJson(INPUTS_FILE);
  const runs = readJson(RUNS_FILE);
  // The plate registry is written by the plate builder and read here. It is not
  // optional: the boards and the booklet are plate carriers, and a build that
  // silently produced them without plates would look finished and be empty.
  if (!fs.existsSync(PLATES_FILE)) {
    throw new Error('build-drawings: area-plates.json does not exist; the drawings have nothing to carry');
  }
  const plates = readJson(PLATES_FILE);
  const design = readJson(DESIGN_FILE);

  // The gate registry owns the seven human gates. The boards and the booklet print them
  // from here rather than from a list kept beside the layout, because a hand-kept list is
  // exactly how the package previously published gate sets of four, five and seven that
  // did not agree with each other. A drawing that cannot read a canonical seven in
  // canonical order refuses to render rather than printing a shorter contract.
  const gates = readJson(GATES_FILE);
  const humanGates = gates.human_design_gate;
  const CANONICAL_GATE_IDS = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'];
  if (!humanGates || !Array.isArray(humanGates.gates)) {
    throw new Error('build-drawings: gate-registry.json publishes no human_design_gate list');
  }
  const drawnGateIds = humanGates.gates.map((gate) => gate.id);
  if (drawnGateIds.join(',') !== CANONICAL_GATE_IDS.join(',')) {
    throw new Error(
      `build-drawings: human_design_gate is ${drawnGateIds.join(',') || '(empty)'}, ` +
      `not the canonical ${CANONICAL_GATE_IDS.join(',')}; refusing to draw a gate list ` +
      'that would contradict the registry');
  }
  for (const gate of humanGates.gates) {
    for (const language of LANGUAGES) {
      for (const field of ['name', 'fails_if']) {
        const value = gate[`${field}_${language}`];
        if (typeof value !== 'string' || value.trim() === '') {
          throw new Error(`build-drawings: ${gate.id} has no ${language} ${field} to print`);
        }
      }
    }
  }

  // The denominator disclosure is one registered pair of sentences, printed on every
  // drawing. Two shares of the same numerator differ depending on which denominator is
  // used, and a board that showed one without the other would be publishing a precision
  // the package does not have.
  const denominator = source.denominator_disclosure;
  for (const language of LANGUAGES) {
    const value = denominator && denominator[`text_${language}`];
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(`build-drawings: regeneration-source.json has no ${language} denominator disclosure`);
    }
  }

  // The design record owns the exact disclosure sentences. The drawings print
  // them from here rather than keeping a copy, because a copy is a second place
  // the wording can be edited, and the whole point of a registered sentence is
  // that it says the same thing on every surface a reader might arrive at.
  const designById = new Map(design.areas.map((area) => [area.area_feature_id, area]));
  for (const area of design.areas) {
    if (area.georeferenced !== false) continue;
    for (const language of LANGUAGES) {
      const sentence = area[`disclosure_${language}`];
      if (typeof sentence !== 'string' || sentence.trim() === '') {
        throw new Error(`build-drawings: ${area.area_feature_id} has no ${language} disclosure to print`);
      }
      for (const record of plates.artifacts || []) {
        if (record.area_feature_id !== area.area_feature_id || record.language !== language) continue;
        const carried = `${record.claim_limits || ''}\n${record.extended_description || ''}`;
        if (!carried.includes(sentence)) {
          throw new Error(
            `build-drawings: ${record.artifact_id} does not carry the registered ` +
            `${area.area_feature_id} disclosure; the drawing would publish a weaker claim limit`);
        }
      }
    }
  }

  const labels = Object.assign({}, source.ui_labels, { governance: governance.labels });
  const projectsById = new Map(source.projects.map((project) => [project.id, project]));
  const plateIndex = indexPlates(plates);

  for (const action of governance.actions) {
    if (action.authorized_target !== null) {
      throw new Error(`build-drawings: ${action.id} carries an authorized target; refusing to draw it`);
    }
    if (action.authorization_state !== 'not_authorized' || action.funding_state !== 'unfunded') {
      throw new Error(`build-drawings: ${action.id} is not in the not_authorized/unfunded state`);
    }
    if (!Array.isArray(action.blocked_by) || action.blocked_by.length === 0) {
      throw new Error(`build-drawings: ${action.id} lists no unresolved D gate`);
    }
    if (!projectsById.has(action.id)) {
      throw new Error(`build-drawings: no project record for action ${action.id}`);
    }
  }

  return {
    source, governance, ablation, inputs, runs, plates, design, designById,
    gates, humanGates, denominator,
    labels, projectsById, plateIndex,
  };
}

function render(data) {
  const rendered = [];
  for (const target of TARGETS) {
    const doc = target.kind === 'a0'
      ? buildA0(target.language, data)
      : buildA3(target.language, data);
    const result = serialize(doc);
    rendered.push({ target, doc, result });
  }
  return rendered;
}

/**
 * Audits the layout rather than the file format: no drawn run may fall off the
 * sheet, and no two runs may sit on top of each other. Both are recorded as
 * build failures, so a layout regression cannot be written out unnoticed.
 */
function auditGeometry(doc, relative, failures) {
  const TOP = 0.86;
  const BOTTOM = 0.18;
  const TOLERANCE = 0.75;
  const pages = new Map();
  let offSheet = 0;
  let collisions = 0;

  for (const item of doc.drawn) {
    const box = {
      left: item.x,
      right: item.x + item.width,
      top: item.y - item.size * TOP,
      bottom: item.y + item.size * BOTTOM,
      item,
    };
    if (box.left < -TOLERANCE || box.right > item.pageWidth + TOLERANCE ||
        box.top < -TOLERANCE || box.bottom > item.pageHeight + TOLERANCE) {
      offSheet += 1;
      if (offSheet <= 3) {
        failures.push(
          `${relative}: text leaves page ${item.page + 1} ` +
          `(${item.tag || 'untagged'}) ${JSON.stringify(item.text.slice(0, 32))}`);
      }
    }
    if (!pages.has(item.page)) pages.set(item.page, []);
    pages.get(item.page).push(box);
  }

  for (const [page, boxes] of pages) {
    boxes.sort((a, b) => a.top - b.top);
    for (let i = 0; i < boxes.length; i += 1) {
      const a = boxes[i];
      for (let j = i + 1; j < boxes.length; j += 1) {
        const b = boxes[j];
        if (b.top >= a.bottom) break;
        const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (overlapX <= TOLERANCE || overlapY <= TOLERANCE) continue;
        const area = overlapX * overlapY;
        const smallest = Math.min(
          (a.right - a.left) * (a.bottom - a.top),
          (b.right - b.left) * (b.bottom - b.top));
        if (area < smallest * 0.2) continue;
        collisions += 1;
        if (collisions <= 3) {
          failures.push(
            `${relative}: overlapping text on page ${page + 1} — ` +
            `${JSON.stringify(a.item.text.slice(0, 26))} over ` +
            `${JSON.stringify(b.item.text.slice(0, 26))}`);
        }
      }
    }
  }
  return { offSheet, collisions };
}

function main(argv) {
  const checkOnly = argv.includes('--check');
  typeface.verifyPayloads();
  assertSubstitutionsRenderable();

  const data = loadData();
  const rendered = render(data);

  const failures = [];
  const documents = [];
  const sheetRecords = [];
  let changedFiles = 0;

  for (const { target, doc, result } of rendered) {
    const absolute = path.join(PACKAGE_ROOT, target.file);
    const inspection = verifyDocument(target.file, result, doc, failures);

    for (const overflow of doc.overflows) {
      failures.push(
        `${target.file}: text did not fit at the smallest size (${overflow.tag}) ` +
        `— needed ${overflow.needed} pt in ${overflow.available} pt`);
    }

    // Language purity. Chinese sheets are guaranteed by construction: T()/TA()
    // refuse to hand an `_en` column to a zh document. The English sheets are
    // additionally scanned for CJK, which may only appear as the two official
    // spellings the spelling_provenance record requires be reproduced exactly.
    if (target.language === 'en') {
      const permitted = new Set(
        data.source.spelling_provenance.variants.map((variant) => variant.spelling));
      for (const string of doc.drawn) {
        let residue = string.text;
        for (const spelling of permitted) residue = residue.split(spelling).join('');
        const stray = residue.match(/[㐀-鿿　-〿＀-￯]/g);
        if (stray) {
          failures.push(`${target.file}: English sheet carries CJK text ${JSON.stringify(string.text)}`);
          break;
        }
      }
    }

    const geometry = auditGeometry(doc, target.file, failures);

    sheetRecords.push({
      sheet: target.kind,
      language: target.language,
      file: target.file,
      pages: doc.sheets.length,
      page_size_pt: target.kind === 'a0' ? [A0.width, A0.height] : [A3.width, A3.height],
      plate_count: doc.placements.length,
      placements: doc.placements,
    });

    const existing = fs.existsSync(absolute) ? fs.readFileSync(absolute) : null;
    const changed = existing === null || !existing.equals(result.bytes);
    if (changed) changedFiles += 1;
    if (changed && !checkOnly) {
      fs.mkdirSync(path.dirname(absolute), { recursive: true });
      fs.writeFileSync(absolute, result.bytes);
    }

    documents.push({
      file: target.file,
      language: target.language,
      pages: inspection.pages,
      page_size_pt: target.kind === 'a0'
        ? [A0.width, A0.height]
        : [A3.width, A3.height],
      bytes: result.bytes.length,
      sha256: crypto.createHash('sha256').update(result.bytes).digest('hex'),
      font_file2: inspection.fontFileCount,
      to_unicode: inspection.toUnicodeCount,
      mapped_glyphs: inspection.mappedGlyphs,
      embedded_glyphs: doc.usage.regular.size + doc.usage.bold.size,
      text_runs: doc.drawn.length,
      text_off_sheet: geometry.offSheet,
      text_collisions: geometry.collisions,
      changed,
    });
  }

  if (checkOnly && changedFiles > 0) {
    failures.push(`${changedFiles} drawing(s) on disk differ from the rendered bytes`);
  }

  // Where every plate actually landed, in points, measured off the drawn boxes
  // rather than restated from the registry. The registry says what share of a
  // board a plate should take; this says what share it took. A reviewer can hold
  // the two against each other without opening a PDF, and the accessibility
  // tests can resolve a plate to a page and a rectangle.
  const placementRecord = {
    schema_version: '0.3.0',
    registry_id: 'drawing-placements',
    generated_by: 'visual/assets/build-drawings.js',
    source_record: 'visual/assets/area-plates.json',
    note_zh: '本文件记录每一图版在图纸中的实际落位（单位：点）。' +
      'A0 面积占比以页眉与页脚之间的图版画布为分母，非纸张幅面。',
    note_en: 'Where each plate actually landed in the drawings, in points. A0 area ' +
      'fractions are shares of the plate canvas between the header and footer ' +
      'bands, not of the media box.',
    generated: FIXED_DATE,
    counts: {
      sheets: sheetRecords.length,
      placements: sheetRecords.reduce((sum, entry) => sum + entry.plate_count, 0),
    },
    sheets: sheetRecords,
  };
  const placementsAbsolute = path.join(ASSETS_DIR, 'drawing-placements.json');
  const placementsBytes = Buffer.from(`${JSON.stringify(placementRecord, null, 2)}\n`, 'utf8');
  const placementsExisting = fs.existsSync(placementsAbsolute)
    ? fs.readFileSync(placementsAbsolute)
    : null;
  const placementsChanged = placementsExisting === null || !placementsExisting.equals(placementsBytes);
  if (placementsChanged) {
    changedFiles += 1;
    if (checkOnly) {
      failures.push('visual/assets/drawing-placements.json differs from the rendered placements');
    } else {
      fs.writeFileSync(placementsAbsolute, placementsBytes);
    }
  }

  const report = {
    status: failures.length === 0 ? 'PASS' : 'FAIL',
    exit_code: failures.length === 0 ? 0 : 1,
    mode: checkOnly ? 'check' : 'write',
    changed_files: changedFiles,
    documents_written: documents.length,
    languages: LANGUAGES,
    areas: data.source.areas.length,
    actions: data.governance.actions.length,
    semantic_plates: data.plates.counts.semantic_plates,
    plate_artifacts: data.plates.counts.artifacts,
    plates_placed: placementRecord.counts.placements,
    glyph_substitution_rules: GLYPH_SUBSTITUTIONS.length,
    fixed_date: FIXED_DATE,
    documents,
    failures,
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  return report.exit_code;
}

if (require.main === module) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (error) {
    process.stdout.write(`${JSON.stringify({
      status: 'FAIL',
      exit_code: 2,
      error_type: 'build_error',
      error: error instanceof Error ? error.message : String(error),
    }, null, 2)}\n`);
    process.exitCode = 2;
  }
}

module.exports = {
  A0,
  A3,
  GLYPH_SUBSTITUTIONS,
  substitute,
  loadData,
  render,
  serialize,
  verifyDocument,
  main,
};
