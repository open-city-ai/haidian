#!/usr/bin/env node
"use strict";

// Does Dazhongsi still refuse to claim a position it cannot support?
//
// Lab 3 has no official geometry, and Issue #1029 records a questioned discrepancy of
// about 2.26 km between the provisional extent and the station reference. Every
// convenience that would make the drawing easier to read — an entrance, a track, a road
// centreline, a floor level — would also make it a claim about where things are. This test
// looks for those conveniences by name, in the design record, in the plate registry, and
// in the geometry, and it requires the same disclosure sentence on every surface a reader
// might arrive at.
//
// It also checks the direction of the evidence rule. If official station evidence ever
// lands, it invalidates this diagram; it does not confirm it.
//
// Two further sweeps run beside the vocabulary check. The first isolates the Dazhongsi
// slice of every human surface and of every Dazhongsi-scoped registry record, then reads
// it for positive statements about what stands on that site and how it is built — the
// class of claim that survives a vocabulary check because it never names a forbidden noun.
// "The modules change neither structure nor fire egress" contains no banned word and is
// still an engineering conclusion about a site nobody has surveyed. The second pins the
// numbers this file needs rather than importing them.
//
// Read-only. Usage: node test-dazhongsi-claim-limits.js
// Deliberate mutations are evaluated in memory; no file is written.

const contract = require("./key-area-contract.js");

const {
  DZS_FORBIDDEN_TERMS_EN, DZS_FORBIDDEN_TERMS_ZH,
  DZS_EVIDENCE_CONSEQUENCE, DZS_GEOMETRY_CONTRACT, DZS_GEOMETRY_DISCLAIMER_FIELDS,
  DZS_GEOMETRY_REQUIRED, exists, readJson, readText, pdfDocument, harness, cli,
} = contract;

const DESIGN = "visual/assets/key-area-design.json";
const REGISTRY = "visual/assets/area-plates.json";
const SOURCE = "visual/assets/regeneration-source.json";
const GOVERNANCE = "visual/assets/action-governance.json";
const GEOMETRY = "geometry/key_areas.geojson";
const FEATURE = "PROV-KEY-003";
const PROJECT = "P07";

// ---------------------------------------------------------------------------
// The independent oracle
// ---------------------------------------------------------------------------

// The two disclosure sentences are written out in full here instead of being imported
// from key-area-contract.js. Importing them would make this file agree with the generator
// by construction: a quiet rewording would move the constant, the builders would emit the
// new wording, this test would compare the new wording against itself and stay green, and
// the sentence that was actually registered against Issue #1029 would have vanished with
// nothing to notice. A pinned literal is the only version of this check that can fail.
const PINNED_DISCLOSURE_ZH =
  "Issue #1029 记录临时范围与车站参照之间存在约 2.26 公里的质疑偏差；本图不建立车站空间关系。";
const PINNED_DISCLOSURE_EN =
  "Issue #1029 records a questioned discrepancy of approximately 2.26 km between the provisional "
  + "extent and the station reference; this drawing establishes no station relationship.";

// The A0 board composition is pinned for the same reason, and it belongs in this file
// because it is a claim-limit in disguise. Plate 02 carries the not-to-scale topology and
// Plate 03 carries the sections; those two are where a Dazhongsi reader meets the limits of
// what this package asserts. Demote them on the board and the disclosure survives in the
// registry while shrinking below reading size on the sheet a jury actually stands in front
// of. build-plates.js reads these numbers from key-area-contract.js, so a check that
// imported them too would compare the layout against the constant that produced it.
const PINNED_A0_RANK = {
  "02": { visual_rank: 1, min_area_fraction: 0.30 },
  "03": { visual_rank: 2, min_area_fraction: 0.20 },
};
const PINNED_A0_SUPPORT_MAX_AREA_FRACTION = 0.15;
const PINNED_ARTIFACT_COUNT = 30;
const PINNED_DZS_ARTIFACT_COUNT = 10;

// Terms whose disappearance from the shared vocabulary would silently disarm the sweep
// below. The list itself lives in key-area-contract.js; these are the load-bearing entries,
// written as the exact strings that list holds.
const REQUIRED_FORBIDDEN_EN = ["station entrance", "track", "crossing", "gate", "floor level"];
const REQUIRED_FORBIDDEN_ZH = ["车站出入口", "过街", "闸机", "首层", "承重结构"];

// ---------------------------------------------------------------------------
// Positive-claim patterns
// ---------------------------------------------------------------------------

// Hand-written here, deliberately not derived from any registry. Each pattern matches an
// assertion, not a topic: the package is free to say that something is unknown, unsurveyed
// or not drawn, and is not free to say what is there or what a module would do to it.
//
// The "no-change" patterns are the subtle ones. A sentence like "the modules change no
// existing levels" reads as a safety assurance and is in fact a survey result: to know that
// nothing changes you must know what is there. This package does not.
const DZS_POSITIVE_CLAIM_PATTERNS = [
  {
    id: "no-change-conclusion-zh",
    pattern: /不(改变|影响|触及)[^。；]{0,14}(结构|竖向|标高|消防|疏散|承重)/,
    note: "asserts what a module would not do to fabric nobody has surveyed",
  },
  {
    id: "no-change-conclusion-en",
    pattern: /\b(chang(e|es|ing)|affect(s|ing)?|alter(s|ing)?)\s+(neither|no)\s+(the\s+)?(structure|structural|level|levels|egress|grade|grades)\b/i,
    note: "asserts what a module would not do to fabric nobody has surveyed",
  },
  {
    id: "no-change-conclusion-verb-en",
    pattern: /\b(does|do|will|would|shall)\s+not\s+(change|affect|alter|disturb)\s+[^.;]{0,40}\b(structure|structural|level|levels|egress|grade|grades|foundation|foundations)\b/i,
    note: "asserts what a module would not do to fabric nobody has surveyed",
  },
  {
    id: "ground-floor-zh",
    pattern: /首层/,
    note: "claims this site has a ground floor and that this proposal knows what is in it",
  },
  {
    id: "ground-floor-en",
    pattern: /\b(ground[-\s]floors?|storeys?|stories)\b/i,
    note: "claims this site has a ground floor and that this proposal knows what is in it",
  },
  {
    id: "existing-levels-zh",
    pattern: /(现状|既有|原有)(竖向|标高|高程)/,
    note: "states a level for ground that has not been surveyed",
  },
  {
    id: "existing-levels-en",
    pattern: /\bexisting\s+(ground\s+)?(levels?|grades?|datum)\b/i,
    note: "states a level for ground that has not been surveyed",
  },
  {
    id: "load-bearing-zh",
    pattern: /承重/,
    note: "states a structural fact that only a survey and a qualified engineer can state",
  },
  {
    id: "load-bearing-en",
    pattern: /\bload[-\s]bearing\b/i,
    note: "states a structural fact that only a survey and a qualified engineer can state",
  },
  {
    id: "fire-egress-zh",
    pattern: /消防(路径|通道|疏散|车道)/,
    note: "states a fire-safety route, which is a professional determination this package cannot make",
  },
  {
    id: "fire-egress-en",
    pattern: /\bfire\s+(egress|escape|route|routes|path|paths|lane)\b/i,
    note: "states a fire-safety route, which is a professional determination this package cannot make",
  },
  {
    id: "existing-fabric-predicate-zh",
    pattern: /(现状|既有|原有)(建筑|房屋|结构|地面|铺装|做法|布局|业态|首层)\s*(为|是|采用|保持|包括|设有|均)/,
    note: "predicates something of existing fabric this package holds no evidence about",
  },
  {
    id: "existing-fabric-predicate-en",
    pattern: /\bexisting\s+(building|buildings|structure|structures|fabric|arrangement|layout|uses?)\s+(is|are|was|were|includes?|comprises?|consists?|remains?)\b/i,
    note: "predicates something of existing fabric this package holds no evidence about",
  },
  {
    id: "restoration-claim-zh",
    pattern: /恢复(原地表|原铺装|原状|原有)|恢复到接手时|可(以)?恢复原/,
    note: "promises a reinstatement whose feasibility depends on an unsurveyed condition",
  },
  {
    id: "restoration-claim-en",
    pattern: /\b(the\s+)?original\s+(ground\s+)?(cover|surface|paving)\s+is\s+reinstated\b|\breturn(s|ed)?\s+to\s+the\s+condition\s+in\s+which\s+it\s+was\s+taken\s+on\b/i,
    note: "promises a reinstatement whose feasibility depends on an unsurveyed condition",
  },
  {
    id: "installation-feasibility-zh",
    pattern: /(可以|能够|均可)安装|安装(于|在)(现状|既有)/,
    note: "asserts that a module can be installed on ground whose condition is unknown",
  },
  {
    id: "installation-feasibility-en",
    pattern: /\b(can|may|will)\s+be\s+(installed|fixed|anchored|mounted)\b/i,
    note: "asserts that a module can be installed on ground whose condition is unknown",
  },
];

// ---------------------------------------------------------------------------
// Narrow exemptions
// ---------------------------------------------------------------------------

// A disclaimer has to be able to name the thing it disclaims, so a handful of exact
// sentences are removed before the patterns run. Every entry is a full clause, not a
// keyword, and every entry has to be found somewhere in the scanned corpora — an exemption
// that stops matching real text is deleted rather than left lying around, because a stale
// exemption is a hole waiting for a future sentence to fall into.
const NEGATIVE_EXEMPTIONS = [
  {
    text: "众智园一侧的库房是既有室内空间的可逆占用，撤场后清空并恢复到接手时状态",
    context: "众智园一侧的库房是既有室内空间的可逆占用，撤场后清空并恢复到接手时状态；大钟寺一侧只是自提模块内部的货架，随模块一并撤除，不涉及该处任何既有空间。",
    why: "attributed in the same clause to Zhongzhiyuan, which is georeferenced and holds building evidence; the Dazhongsi half of the sentence claims nothing",
  },
  {
    text: "On the Zhongzhiyuan side the store is a reversible occupation of existing interior space, emptied at closure and returned to the condition in which it was taken on",
    context: "On the Zhongzhiyuan side the store is a reversible occupation of existing interior space, emptied at closure and returned to the condition in which it was taken on; on the Dazhongsi side it is only racking inside the proposed module, removed together with the module, and it involves no existing space there.",
    why: "attributed in the same clause to Zhongzhiyuan, which is georeferenced and holds building evidence; the Dazhongsi half of the sentence claims nothing",
  },
];

// ---------------------------------------------------------------------------
// Scanning
// ---------------------------------------------------------------------------

// Removes an approved Zhongzhiyuan clause only when its full, pinned sentence immediately
// scopes the Dazhongsi half to a module and disclaims existing space. A bare copy of the
// approved clause remains scannable; otherwise pasting it into a Dazhongsi record would create
// a global exemption hole. The separator stops the surviving text on either side from joining.
function stripExemptions(text) {
  let out = text;
  for (const exemption of NEGATIVE_EXEMPTIONS) {
    const scopedReplacement = exemption.context.split(exemption.text).join(" \u0000 ");
    out = out.split(exemption.context).join(scopedReplacement);
  }
  return out;
}

// Returns the ids of every positive-claim pattern the text trips, after exemptions.
function positiveClaimHits(text) {
  const scanned = stripExemptions(text);
  return DZS_POSITIVE_CLAIM_PATTERNS.filter((entry) => entry.pattern.test(scanned)).map((entry) => entry.id);
}

// Scans a corpus given as {path, value} entries so a hit can be reported where it lives.
function scanEntries(entries) {
  const hits = [];
  for (const { path, value } of entries) {
    for (const id of positiveClaimHits(value)) hits.push({ path, pattern: id });
  }
  return hits;
}

// Collects every string in a value tree, with the path that reached it.
function strings(value, path = "", found = []) {
  if (typeof value === "string") found.push({ path, value });
  else if (Array.isArray(value)) value.forEach((item, index) => strings(item, `${path}[${index}]`, found));
  else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) strings(item, path ? `${path}.${key}` : key, found);
  }
  return found;
}

// ASCII terms are matched on word boundaries so that `investigate` does not read as
// `gate`; Chinese has no word boundary, so those terms are matched as substrings.
function findForbidden(text) {
  const hits = [];
  for (const term of DZS_FORBIDDEN_TERMS_EN) {
    const pattern = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}s?\\b`, "i");
    if (pattern.test(text)) hits.push(term);
  }
  for (const term of DZS_FORBIDDEN_TERMS_ZH) {
    if (text.includes(term)) hits.push(term);
  }
  return hits;
}

// ---------------------------------------------------------------------------
// Corpora
// ---------------------------------------------------------------------------

// Where a reader can meet Lab 3 in prose. Each has to carry the disclosure in its own
// language; a reader of the English viewer never sees the Chinese footnote.
const SURFACES = [
  { file: "proposal.md", language: "zh" },
  { file: "proposal.en.md", language: "en" },
  { file: "visual/index.html", language: "zh" },
  { file: "visual/index.en.html", language: "en" },
  { file: "report/proposal.html", language: "zh" },
  { file: "report/proposal.en.html", language: "en" },
];

const PDF_SURFACES = [
  { file: "drawings/a3-booklet.pdf", language: "zh" },
  { file: "drawings/a3-booklet.en.pdf", language: "en" },
  { file: "drawings/a0-boards.pdf", language: "zh" },
  { file: "drawings/a0-boards.en.pdf", language: "en" },
];

// A block that names Lab 3 is a block a reader attributes to Lab 3, whatever else it also
// names. That is the point: a positive engineering statement sitting in the same paragraph
// as Dazhongsi will be read as being about Dazhongsi, so co-location is itself the fault.
const DZS_MENTION = /大钟寺|Dazhongsi|DZS-|PROV-KEY-003/;

// The viewers are emitted as a single line tens of thousands of characters long, so
// splitting HTML on newlines would hand the sweep one block containing all three labs and
// report every Zhongzhiyuan sentence as a Dazhongsi claim. Blocks are cut at the closing
// tags a reader experiences as a paragraph break instead. Rows are kept whole and cells are
// not split apart: a claim in the third cell of a row whose first cell names Dazhongsi is
// still a claim about Dazhongsi.
const HTML_BLOCK_END = /<\/(?:p|li|tr|h[1-6]|figcaption|summary|caption|dd|dt|blockquote|pre)>|<br\s*\/?>/gi;

function htmlBlocks(file, raw) {
  const blocks = [];
  const boundary = new RegExp(HTML_BLOCK_END.source, "gi");
  const cuts = [];
  let match;
  while ((match = boundary.exec(raw)) !== null) cuts.push(match.index + match[0].length);
  if (cuts.length === 0 || cuts[cuts.length - 1] < raw.length) cuts.push(raw.length);

  let start = 0;
  let cursor = 0;
  let line = 1;
  for (const end of cuts) {
    while (cursor < start) {
      if (raw[cursor] === "\n") line += 1;
      cursor += 1;
    }
    const source = raw.slice(start, end);
    blocks.push({ path: `${file}:${line}`, value: stripTags(source), raw: source, start });
    start = end;
  }
  return blocks;
}

function textBlocks(file, raw) {
  let plainOffset = 0;
  const blocks = file.endsWith(".html")
    ? htmlBlocks(file, raw)
    : raw.split("\n").map((value, index) => {
      const start = plainOffset;
      plainOffset += value.length + 1;
      return {
        path: `${file}:${index + 1}`,
        value,
        raw: value,
        start,
      };
    });

  let sectionLevel = null;
  return blocks.filter((entry) => {
    const heading = file.endsWith(".html")
      ? entry.raw.match(/<h([1-6])\b[^>]*>/i)
      : entry.raw.match(/^\s*(#{1,6})\s+/);
    const level = heading ? (file.endsWith(".html") ? Number(heading[1]) : heading[1].length) : null;
    const mentionsDazhongsi = DZS_MENTION.test(entry.value);

    if (level !== null) {
      if (mentionsDazhongsi) {
        sectionLevel = level;
      } else if (sectionLevel !== null && level <= sectionLevel) {
        sectionLevel = null;
      }
    }

    return mentionsDazhongsi || sectionLevel !== null;
  });
}

// Tag names and attribute values are machinery, not prose; scanning them would report a
// css class as a site claim. Entities are decoded so a disclosure sentence still matches.
function stripTags(line) {
  return line
    .replace(/<[^>]*>/g, " ")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

const HTML_VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta",
  "param", "source", "track", "wbr",
]);
const HTML_NONVISIBLE_ELEMENTS = new Set(["script", "style", "template", "noscript"]);

function htmlTextIsVisible(raw, offset) {
  if (raw.lastIndexOf("<!--", offset) > raw.lastIndexOf("-->", offset)) return false;
  if (raw.lastIndexOf("<", offset) > raw.lastIndexOf(">", offset)) return false;

  const stack = [];
  const tags = /<\s*(\/?)\s*([a-z][\w:-]*)([^>]*)>/gi;
  let match;
  while ((match = tags.exec(raw)) !== null && match.index < offset) {
    const closing = match[1] === "/";
    const name = match[2].toLowerCase();
    if (closing) {
      for (let index = stack.length - 1; index >= 0; index -= 1) {
        if (stack[index].name === name) {
          stack.length = index;
          break;
        }
      }
      continue;
    }

    const tag = match[0];
    const style = tag.match(/\sstyle\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const className = tag.match(/\sclass\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const styleValue = style ? (style[1] ?? style[2] ?? style[3] ?? "") : "";
    const classValue = className ? (className[1] ?? className[2] ?? className[3] ?? "") : "";
    const hidden = HTML_NONVISIBLE_ELEMENTS.has(name)
      || /\s(?:hidden|inert)(?:\s|=|\/?>)/i.test(tag)
      || /\saria-hidden\s*=\s*(?:"true"|'true'|true)(?:\s|\/?>)/i.test(tag)
      || /(?:^|;)\s*(?:display\s*:\s*none|visibility\s*:\s*hidden)(?:\s*!important)?\s*(?:;|$)/i.test(styleValue)
      || /(?:^|\s)(?:sr-only|visually-hidden|is-hidden)(?:\s|$)/i.test(classValue);
    const selfClosing = /\/\s*>$/.test(tag) || HTML_VOID_ELEMENTS.has(name);
    if (!selfClosing) stack.push({ name, hidden });
  }

  return !stack.some((entry) => entry.hidden);
}

function disclosurePlacementProblems(file, raw, disclosure) {
  const offsets = [];
  let cursor = -1;
  while ((cursor = raw.indexOf(disclosure, cursor + 1)) !== -1) offsets.push(cursor);
  if (offsets.length === 0) return [`${file} does not carry the pinned disclosure`];

  const scoped = textBlocks(file, raw);
  const problems = [];
  for (const offset of offsets) {
    const block = scoped.find((entry) => (
      offset >= entry.start && offset + disclosure.length <= entry.start + entry.raw.length
    ));
    if (!block) {
      problems.push(`${file} carries a pinned disclosure outside its Dazhongsi section`);
    } else if (file.endsWith(".html") && !htmlTextIsVisible(raw, offset)) {
      problems.push(`${file} carries a pinned disclosure in hidden or non-text HTML`);
    }
  }
  return problems;
}

function pdfDisclosurePlacementProblems(file, text, disclosure) {
  const denseText = text.replace(/\s+/g, "");
  const denseDisclosure = disclosure.replace(/\s+/g, "");
  const marker = disclosure === PINNED_DISCLOSURE_EN ? /Dazhongsi|DZS-/ : /大钟寺|DZS-/;
  const offsets = [];
  let cursor = -1;
  while ((cursor = denseText.indexOf(denseDisclosure, cursor + 1)) !== -1) offsets.push(cursor);
  if (offsets.length === 0) return [`${file} does not carry the pinned disclosure in extractable text`];

  const problems = [];
  for (const offset of offsets) {
    const window = denseText.slice(Math.max(0, offset - 256), offset + denseDisclosure.length + 256);
    if (!marker.test(window)) {
      problems.push(`${file} carries a pinned disclosure more than 256 extractable characters from a Dazhongsi identifier`);
    }
  }
  return problems;
}

// The Dazhongsi slice of each registry. Each returns {path, value} entries or null when
// the file is missing, so the caller can report the absence rather than scanning nothing
// and calling it clean.
function designEntries() {
  if (!exists(DESIGN)) return null;
  const record = (readJson(DESIGN).areas ?? []).find((area) => area.area_feature_id === FEATURE);
  if (!record) return null;
  return strings(record, `${DESIGN}#${FEATURE}`);
}

function sourceEntries() {
  if (!exists(SOURCE)) return null;
  const source = readJson(SOURCE);
  const area = (source.areas ?? []).find((item) => item.id === FEATURE);
  const project = (source.projects ?? []).find((item) => item.id === PROJECT);
  const entries = [];
  if (area) entries.push(...strings(area, `${SOURCE}#${FEATURE}`));
  if (project) entries.push(...strings(project, `${SOURCE}#${PROJECT}`));
  return entries;
}

function governanceEntries() {
  if (!exists(GOVERNANCE)) return null;
  const actions = (readJson(GOVERNANCE).actions ?? [])
    .filter((action) => action.project_id === PROJECT || (action.area_ids ?? []).includes(FEATURE));
  return actions.flatMap((action) => strings(action, `${GOVERNANCE}#${action.id}`));
}

function plateEntries() {
  if (!exists(REGISTRY)) return null;
  const artifacts = (readJson(REGISTRY).artifacts ?? []).filter((record) => record.area_feature_id === FEATURE);
  return artifacts.flatMap((record) => strings(
    {
      title: record.title,
      alt_text: record.alt_text,
      extended_description: record.extended_description,
      claim_limits: record.claim_limits,
    },
    `${REGISTRY}#${record.artifact_id}`,
  ));
}

// ---------------------------------------------------------------------------
// Deliberate mutations
// ---------------------------------------------------------------------------

// A scanner that rejects everything would catch every mutation below and prove nothing, so
// the control runs first: careful sentences drawn from the real package, each of which
// names an unknown without asserting anything, and all of which must pass clean.
const CLAIM_SCAN_CONTROL = [
  "模块与既有建造、竖向及疏散条件如何相接尚未勘测，本方案不作任何工程结论。",
  "撤除后的地面恢复做法未经勘测，剖面不画。",
  "剖面上没有地面标高、没有既有做法，也没有任何一处与周边环境的相对关系。",
  "到达位至换乘位的次序连线，按无台阶提出；不含位置、距离与标高。",
  "How the modules would meet existing construction, levels, or evacuation conditions is unsurveyed.",
  "The section draws the working face that module removal needs; what reinstating the ground would involve is unsurveyed and is not drawn.",
  "It carries no position, distance or level and establishes no relationship to the station.",
  "Neither a restoration method nor a restoration capacity has been confirmed by any party.",
].join("\n");

// One mutation per source registry, plus one generated surface. Each is applied to that
// corpus's real extracted text, so the mutation exercises record selection and string
// collection as well as the patterns; a corpus whose selector silently matched nothing
// would fail here rather than reporting a clean sweep.
const CORPUS_MUTATIONS = [
  {
    id: "design-existing-levels-zh",
    corpus: DESIGN,
    inject: "模块整体安放于现状竖向之上，不改变现状标高。",
    expect: ["existing-levels-zh", "no-change-conclusion-zh"],
  },
  {
    id: "source-ground-floor-en",
    corpus: SOURCE,
    inject: "The set reactivates the existing ground floor along the frontage.",
    expect: ["ground-floor-en"],
  },
  {
    id: "governance-fire-egress-en",
    corpus: GOVERNANCE,
    inject: "The modules are additions that change neither structure nor fire egress.",
    expect: ["no-change-conclusion-en", "fire-egress-en"],
  },
  {
    id: "plates-restoration-en",
    corpus: REGISTRY,
    inject: "After removal the original ground cover is reinstated.",
    expect: ["restoration-claim-en"],
  },
  {
    id: "surface-load-bearing-zh",
    corpus: "proposal.md",
    inject: "模块荷载由现场承重结构承担。",
    expect: ["load-bearing-zh"],
  },
  {
    id: "surface-installation-en",
    corpus: "proposal.en.md",
    inject: "Each module can be anchored directly to the existing slab.",
    expect: ["installation-feasibility-en"],
  },
];

// A reworded disclosure is the failure this file exists to catch, so it gets its own
// mutation rather than being trusted to the equality check above.
const DISCLOSURE_MUTATIONS = [
  {
    id: "disclosure-reworded-zh",
    language: "zh",
    from: PINNED_DISCLOSURE_ZH,
    to: "Issue #1029 记录临时范围与车站参照之间存在约 2.3 公里的偏差；本图不建立车站空间关系。",
  },
  {
    id: "disclosure-reworded-en",
    language: "en",
    from: PINNED_DISCLOSURE_EN,
    to: "Issue #1029 records a discrepancy of about 2.26 km between the provisional extent and the "
      + "station reference; this drawing establishes no station relationship.",
  },
];

function checkMutations(fail, corpora) {
  const controlHits = positiveClaimHits(CLAIM_SCAN_CONTROL);
  if (controlHits.length > 0) {
    fail(`the positive-claim control trips ${controlHits.join(" ")}; a scanner that rejects careful text proves nothing below`);
  }

  const caught = [];
  for (const mutation of CORPUS_MUTATIONS) {
    const entries = corpora[mutation.corpus];
    if (!entries) {
      fail(`mutation ${mutation.id} has no ${mutation.corpus} corpus to mutate`);
      continue;
    }
    if (entries.length === 0) {
      fail(`mutation ${mutation.id} found an empty ${mutation.corpus} Dazhongsi slice; the selector matches nothing`);
      continue;
    }
    const before = new Set(scanEntries(entries).map((hit) => hit.pattern));
    const after = scanEntries(entries.concat([{ path: `${mutation.corpus}#<mutation>`, value: mutation.inject }]));
    const introduced = new Set(after.map((hit) => hit.pattern).filter((id) => !before.has(id)));
    const missed = mutation.expect.filter((id) => !introduced.has(id));
    if (missed.length > 0) {
      fail(`mutation ${mutation.id} slipped through ${mutation.corpus}: expected ${missed.join(" ")}`);
    } else {
      caught.push(mutation.id);
    }
  }

  for (const mutation of DISCLOSURE_MUTATIONS) {
    const file = mutation.language === "en" ? "proposal.en.md" : "proposal.md";
    if (!exists(file)) {
      fail(`mutation ${mutation.id} has no ${file} to mutate`);
      continue;
    }
    const original = readText(file);
    if (!original.includes(mutation.from)) {
      fail(`mutation ${mutation.id} cannot run: ${file} does not carry the pinned disclosure to reword`);
      continue;
    }
    const reworded = original.split(mutation.from).join(mutation.to);
    if (reworded.split(mutation.from).length - 1 !== 0) {
      fail(`mutation ${mutation.id} left the pinned disclosure in place; the mutation is inert`);
    } else {
      caught.push(mutation.id);
    }
  }

  const sectionContextMutation = [
    "### Dazhongsi AI Cluster",
    "",
    "A proposed module can be installed on the existing slab.",
    "",
    "### Another key area",
    "A proposed module can be installed on the existing slab.",
  ].join("\n");
  const sectionContextHits = scanEntries(textBlocks("<section-context-mutation>.md", sectionContextMutation));
  const installationHits = sectionContextHits.filter((hit) => hit.pattern === "installation-feasibility-en");
  if (installationHits.length !== 1 || !installationHits[0].path.endsWith(":3")) {
    fail("mutation section-context-propagation slipped through: expected only the selector-free paragraph beneath the Dazhongsi heading to be scanned");
  } else {
    caught.push("section-context-propagation");
  }

  const exemptionScopeMutations = [
    { id: "exemption-scope-zh", text: NEGATIVE_EXEMPTIONS[0].text, expect: "restoration-claim-zh" },
    { id: "exemption-scope-en", text: NEGATIVE_EXEMPTIONS[1].text, expect: "restoration-claim-en" },
  ];
  for (const mutation of exemptionScopeMutations) {
    const hits = positiveClaimHits(mutation.text);
    if (!hits.includes(mutation.expect)) {
      fail(`mutation ${mutation.id} slipped through: an approved Zhongzhiyuan clause was stripped without its Dazhongsi no-claim context`);
    } else {
      caught.push(mutation.id);
    }
  }

  const disclosurePlacementMutations = [
    {
      id: "disclosure-unrelated-section",
      file: "<unrelated-disclosure-mutation>.md",
      disclosure: PINNED_DISCLOSURE_EN,
      raw: `## Zhongzhiyuan\n${PINNED_DISCLOSURE_EN}\n\n## Dazhongsi AI Cluster\nThe disclosure is absent here.`,
    },
    {
      id: "disclosure-hidden-html",
      file: "<hidden-disclosure-mutation>.html",
      disclosure: PINNED_DISCLOSURE_EN,
      raw: `<h2>Dazhongsi AI Cluster</h2><p aria-hidden="true">${PINNED_DISCLOSURE_EN}</p>`,
    },
  ];
  for (const mutation of disclosurePlacementMutations) {
    const problems = disclosurePlacementProblems(mutation.file, mutation.raw, mutation.disclosure);
    if (problems.length === 0) {
      fail(`mutation ${mutation.id} slipped through: file-wide disclosure presence was mistaken for visible Dazhongsi placement`);
    } else {
      caught.push(mutation.id);
    }
  }

  const unrelatedPdfText = `Dazhongsi${"x".repeat(400)}${PINNED_DISCLOSURE_EN}`;
  const unrelatedPdfProblems = pdfDisclosurePlacementProblems(
    "<unrelated-disclosure-mutation>.pdf",
    unrelatedPdfText,
    PINNED_DISCLOSURE_EN,
  );
  if (unrelatedPdfProblems.length === 0) {
    fail("mutation disclosure-unrelated-pdf slipped through: PDF-wide presence was mistaken for placement beside a Dazhongsi identifier");
  } else {
    caught.push("disclosure-unrelated-pdf");
  }

  return caught;
}

function run() {
  return harness("KA-DZS", "Dazhongsi claims no position, no station relationship, and no invented site fact", (fail) => {
    // The pinned oracle against the shared constants. These have to agree; when they stop
    // agreeing the question is which one moved, and that is worth stopping for.
    if (contract.DZS_DISCLOSURE_ZH !== PINNED_DISCLOSURE_ZH) {
      fail("key-area-contract.js Chinese disclosure no longer matches the sentence pinned in this test");
    }
    if (contract.DZS_DISCLOSURE_EN !== PINNED_DISCLOSURE_EN) {
      fail("key-area-contract.js English disclosure no longer matches the sentence pinned in this test");
    }
    for (const [concept, pinned] of Object.entries(PINNED_A0_RANK)) {
      const shared = (contract.A0_RANK ?? {})[concept];
      if (!shared || shared.visual_rank !== pinned.visual_rank || shared.min_area_fraction !== pinned.min_area_fraction) {
        fail(`key-area-contract.js A0 rank for concept ${concept} is ${JSON.stringify(shared)}, pinned ${JSON.stringify(pinned)}`);
      }
    }
    if (contract.A0_SUPPORT_MAX_AREA_FRACTION !== PINNED_A0_SUPPORT_MAX_AREA_FRACTION) {
      fail(`key-area-contract.js support-panel ceiling is ${contract.A0_SUPPORT_MAX_AREA_FRACTION}, pinned ${PINNED_A0_SUPPORT_MAX_AREA_FRACTION}`);
    }
    for (const term of REQUIRED_FORBIDDEN_EN) {
      if (!DZS_FORBIDDEN_TERMS_EN.includes(term)) fail(`the English forbidden vocabulary no longer holds "${term}"`);
    }
    for (const term of REQUIRED_FORBIDDEN_ZH) {
      if (!DZS_FORBIDDEN_TERMS_ZH.includes(term)) fail(`the Chinese forbidden vocabulary no longer holds "${term}"`);
    }

    if (!exists(DESIGN)) return fail(`${DESIGN} does not exist`);
    const design = (readJson(DESIGN).areas ?? []).find((area) => area.area_feature_id === FEATURE);
    if (!design) return fail(`${DESIGN} declares nothing for ${FEATURE}`);

    if (design.georeferenced !== false) fail(`${FEATURE} must stay non-georeferenced`);
    if (design.evidence_consequence !== DZS_EVIDENCE_CONSEQUENCE) {
      fail(`${FEATURE} evidence_consequence is ${JSON.stringify(design.evidence_consequence)}, expected ${DZS_EVIDENCE_CONSEQUENCE}`);
    }
    if (design.disclosure_zh !== PINNED_DISCLOSURE_ZH) fail(`${FEATURE} Chinese disclosure is not the exact registered sentence`);
    if (design.disclosure_en !== PINNED_DISCLOSURE_EN) fail(`${FEATURE} English disclosure is not the exact registered sentence`);

    // The forbidden-term sweep over the whole Dazhongsi design record. The disclosure
    // sentences are exempt: they are the one place the package is allowed to mention the
    // station, precisely in order to deny a relationship to it.
    const exempt = new Set([PINNED_DISCLOSURE_ZH, PINNED_DISCLOSURE_EN]);
    const designHits = [];
    for (const { path, value } of strings(design)) {
      if (exempt.has(value)) continue;
      for (const term of findForbidden(value)) designHits.push(`${path}: "${term}"`);
    }
    for (const hit of designHits) fail(`${FEATURE} design record asserts a forbidden site fact at ${hit}`);

    // The same sweep over the ten published Dazhongsi artifact records, plus the board
    // composition each of them declares.
    const registryHits = [];
    const missingDisclosure = [];
    const a0Problems = [];
    if (exists(REGISTRY)) {
      const all = readJson(REGISTRY).artifacts ?? [];
      if (all.length !== PINNED_ARTIFACT_COUNT) {
        fail(`the registry holds ${all.length} artifacts, pinned ${PINNED_ARTIFACT_COUNT}`);
      }
      const artifacts = all.filter((record) => record.area_feature_id === FEATURE);
      if (artifacts.length !== PINNED_DZS_ARTIFACT_COUNT) {
        fail(`the registry holds ${artifacts.length} Dazhongsi artifacts, pinned ${PINNED_DZS_ARTIFACT_COUNT}`);
      }
      for (const record of artifacts) {
        for (const field of ["title", "alt_text", "extended_description", "claim_limits"]) {
          const value = record[field];
          if (typeof value !== "string" || exempt.has(value)) continue;
          for (const term of findForbidden(value)) registryHits.push(`${record.artifact_id}.${field}: "${term}"`);
        }
        if (record.georeferenced !== false) fail(`${record.artifact_id} claims to be georeferenced`);
        if (record.north_arrow !== false) fail(`${record.artifact_id} carries a north arrow`);
        if (record.scale_mode !== "not_to_scale") {
          fail(`${record.artifact_id} scale_mode is ${JSON.stringify(record.scale_mode)}, expected not_to_scale`);
        }
        const expectedDisclosure = record.language === "en" ? PINNED_DISCLOSURE_EN : PINNED_DISCLOSURE_ZH;
        const carried = `${record.claim_limits ?? ""}\n${record.extended_description ?? ""}`;
        if (!carried.includes(expectedDisclosure)) missingDisclosure.push(record.artifact_id);
      }

      // Board composition for every plate, measured against the pinned numbers rather than
      // the ones build-plates.js used to lay the board out.
      for (const record of all) {
        const a0 = record.placements?.a0;
        if (!a0) {
          a0Problems.push(`${record.artifact_id} declares no A0 placement`);
          continue;
        }
        const pinned = PINNED_A0_RANK[record.concept_id];
        if (pinned) {
          if (a0.visual_rank !== pinned.visual_rank) {
            a0Problems.push(`${record.artifact_id} A0 visual_rank ${a0.visual_rank}, pinned ${pinned.visual_rank}`);
          }
          if (!(typeof a0.area_fraction === "number" && a0.area_fraction >= pinned.min_area_fraction)) {
            a0Problems.push(`${record.artifact_id} occupies ${a0.area_fraction} of its board, pinned at least ${pinned.min_area_fraction}`);
          }
        } else if (!(typeof a0.area_fraction === "number" && a0.area_fraction <= PINNED_A0_SUPPORT_MAX_AREA_FRACTION)) {
          a0Problems.push(`${record.artifact_id} is a support panel occupying ${a0.area_fraction}, pinned at most ${PINNED_A0_SUPPORT_MAX_AREA_FRACTION}`);
        }
      }
    } else {
      fail(`${REGISTRY} does not exist`);
    }
    for (const hit of registryHits) fail(`a Dazhongsi plate record asserts a forbidden site fact at ${hit}`);
    for (const id of missingDisclosure) fail(`${id} does not carry the exact Issue #1029 disclosure`);
    for (const problem of a0Problems) fail(`A0 board composition: ${problem}`);

    // The geometry feature. Its job is to constrain, not to assert, and a design edit here
    // would turn a provisional rough extent into a boundary claim.
    if (exists(GEOMETRY)) {
      const feature = (readJson(GEOMETRY).features ?? []).find((item) => item.properties?.id === FEATURE);
      if (!feature) {
        fail(`${GEOMETRY} has no ${FEATURE} feature`);
      } else {
        for (const [key, value] of Object.entries(DZS_GEOMETRY_CONTRACT)) {
          if (feature.properties[key] !== value) {
            fail(`${FEATURE} geometry ${key} is ${JSON.stringify(feature.properties[key])}, expected ${JSON.stringify(value)}`);
          }
        }
        for (const [key, value] of Object.entries(DZS_GEOMETRY_REQUIRED)) {
          if (feature.properties[key] !== value) {
            fail(`${FEATURE} geometry ${key} is ${JSON.stringify(feature.properties[key])}, expected ${JSON.stringify(value)}`);
          }
        }
        // The disclaimer fields are exempt from the sweep below, so they have to be there.
        for (const field of DZS_GEOMETRY_DISCLAIMER_FIELDS) {
          const value = feature.properties[field];
          if (typeof value !== "string" || value.trim() === "") {
            fail(`${FEATURE} geometry has no ${field}; the forbidden-term exemption is unearned`);
          }
        }
        for (const { path, value } of strings(feature.properties)) {
          if (exempt.has(value)) continue;
          if (DZS_GEOMETRY_DISCLAIMER_FIELDS.includes(path)) continue;
          for (const term of findForbidden(value)) {
            fail(`${FEATURE} geometry asserts a forbidden site fact at ${path}: "${term}"`);
          }
        }
      }
    } else {
      fail(`${GEOMETRY} does not exist`);
    }

    // Assemble every corpus once: the registries by record selection, the human surfaces by
    // isolating the lines that name Lab 3.
    const corpora = {
      [DESIGN]: designEntries(),
      [SOURCE]: sourceEntries(),
      [GOVERNANCE]: governanceEntries(),
      [REGISTRY]: plateEntries(),
    };
    for (const [file, entries] of Object.entries(corpora)) {
      if (entries === null) fail(`${file} holds no Dazhongsi slice to scan`);
      else if (entries.length === 0) fail(`the Dazhongsi slice of ${file} is empty; the selector matches nothing`);
    }

    const surfaces = {};
    const surfaceBlocks = {};
    for (const surface of SURFACES) {
      if (!exists(surface.file)) {
        fail(`${surface.file} does not exist`);
        continue;
      }
      const raw = readText(surface.file);
      const expectedDisclosure = surface.language === "en" ? PINNED_DISCLOSURE_EN : PINNED_DISCLOSURE_ZH;
      const occurrences = raw.split(expectedDisclosure).length - 1;
      surfaces[surface.file] = occurrences;
      if (occurrences === 0) {
        fail(`${surface.file} does not carry the Issue #1029 disclosure in ${surface.language}`);
      }
      for (const problem of disclosurePlacementProblems(surface.file, raw, expectedDisclosure)) fail(problem);
      const blocks = textBlocks(surface.file, raw);
      if (blocks.length === 0) fail(`${surface.file} names Dazhongsi nowhere; the slice cannot be checked`);
      surfaceBlocks[surface.file] = blocks;
      corpora[surface.file] = blocks;
    }

    const pdfSurfaces = {};
    for (const surface of PDF_SURFACES) {
      if (!exists(surface.file)) {
        fail(`${surface.file} does not exist`);
        continue;
      }
      const document = pdfDocument(surface.file);
      if (document.cmap_conflicts.length > 0) {
        fail(`${surface.file} has conflicting ToUnicode entries: ${document.cmap_conflicts.join("; ")}`);
      }
      if (document.unmapped_glyphs.length > 0) {
        fail(`${surface.file} has ${document.unmapped_glyphs.length} visible glyphs with no extractable character`);
      }
      const expectedDisclosure = surface.language === "en" ? PINNED_DISCLOSURE_EN : PINNED_DISCLOSURE_ZH;
      const denseText = document.text.replace(/\s+/g, "");
      const denseDisclosure = expectedDisclosure.replace(/\s+/g, "");
      pdfSurfaces[surface.file] = denseText.split(denseDisclosure).length - 1;
      for (const problem of pdfDisclosurePlacementProblems(surface.file, document.text, expectedDisclosure)) fail(problem);
    }

    // The positive-claim sweep, over every corpus assembled above.
    const claimHits = [];
    for (const [name, entries] of Object.entries(corpora)) {
      if (!entries) continue;
      for (const hit of scanEntries(entries)) claimHits.push(`${hit.path} (${hit.pattern})`);
    }
    for (const hit of claimHits) fail(`a Dazhongsi surface states a positive site or engineering fact at ${hit}`);

    // Every exemption must still be earned by text that exists.
    const haystack = Object.values(corpora)
      .filter(Boolean)
      .flat()
      .map((entry) => entry.value)
      .join("\n");
    for (const exemption of NEGATIVE_EXEMPTIONS) {
      if (!haystack.includes(exemption.text)) {
        fail(`the exemption "${exemption.text.slice(0, 40)}…" matches nothing any more and should be deleted`);
      }
    }

    const mutationsCaught = checkMutations(fail, corpora);

    return {
      evidence_consequence: design.evidence_consequence ?? null,
      design_forbidden_hits: designHits,
      registry_forbidden_hits: registryHits,
      positive_claim_hits: claimHits,
      a0_composition_problems: a0Problems,
      disclosure_occurrences: surfaces,
      pdf_disclosure_occurrences: pdfSurfaces,
      dzs_blocks_scanned: Object.fromEntries(
        Object.entries(surfaceBlocks).map(([file, blocks]) => [file, blocks.length]),
      ),
      mutations_caught: mutationsCaught,
    };
  });
}

if (require.main === module) cli(run());

module.exports = { run };
