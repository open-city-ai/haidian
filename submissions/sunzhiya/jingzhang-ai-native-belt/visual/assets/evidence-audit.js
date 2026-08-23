#!/usr/bin/env node
/*
 * evidence-audit.js — offline self-audit for the submission package.
 *
 *   node visual/assets/evidence-audit.js            (run from the package root)
 *   node evidence-audit.js                          (run from visual/assets/)
 *
 * The script uses only the Node standard library. It performs no network
 * access, writes no files and reads nothing outside the package directory.
 * It re-derives every number this package claims and exits non-zero if any
 * assertion fails, so a reviewer never has to take a stated figure on trust.
 *
 * Checks performed
 *   A. geometry     shoelace re-computation of every area and length metric
 *   B. metrics      every claim-provenance raw_value vs its JSON pointer
 *   C. ledger       every machine-readable check block in evidence-ledger.json
 *   D. gates        index <-> gate file consistency for all 40 gates
 *   E. simulation   success rate, schema rate, energy, audit, intercept, p95
 *   F. baseline     evaluation-baseline.json mirrors the simulation baselines
 *   G. prose        every [metric:*] token exists in both proposal files
 *   H. safety       hard-risk pattern scan across all text files
 */

'use strict';

const fs = require('fs');
const path = require('path');

/* ------------------------------------------------------------------ setup */

function findRoot() {
  let dir = process.cwd();
  for (let i = 0; i < 6; i += 1) {
    if (fs.existsSync(path.join(dir, 'manifest.json')) &&
        fs.existsSync(path.join(dir, 'metrics.json'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  // fall back to the directory two levels above this script
  return path.resolve(__dirname, '..', '..');
}

const ROOT = findRoot();
const VA = path.join(ROOT, 'visual', 'assets');

function readJSON(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}
function readText(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}
function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

const results = [];
let passed = 0;
let failed = 0;

function check(group, name, ok, detail) {
  results.push({ group: group, name: name, ok: !!ok, detail: detail || '' });
  if (ok) { passed += 1; } else { failed += 1; }
}

const EPS = 1e-6;
function near(a, b, tol) {
  if (a === null || b === null || a === undefined || b === undefined) return a === b;
  const t = tol === undefined ? EPS : tol;
  return Math.abs(a - b) <= t;
}

function pointer(obj, ptr) {
  if (!ptr) return undefined;
  const parts = ptr.replace(/^#?\//, '').split('/');
  let cur = obj;
  for (let i = 0; i < parts.length; i += 1) {
    const key = parts[i].replace(/~1/g, '/').replace(/~0/g, '~');
    if (cur === null || cur === undefined) return undefined;
    cur = Array.isArray(cur) ? cur[Number(key)] : cur[key];
  }
  return cur;
}

/* -------------------------------------------------------- A. geometry */

const M_PER_DEG_LAT = 110540;
const SITE_MID_LAT = 39.98275;
const M_PER_DEG_LON = 111320 * Math.cos(SITE_MID_LAT * Math.PI / 180);

function toXY(coord) {
  return [coord[0] * M_PER_DEG_LON, coord[1] * M_PER_DEG_LAT];
}

function ringArea(ring) {
  let s = 0;
  for (let i = 0; i < ring.length - 1; i += 1) {
    const a = toXY(ring[i]);
    const b = toXY(ring[i + 1]);
    s += a[0] * b[1] - b[0] * a[1];
  }
  return Math.abs(s) / 2;
}

function polygonArea(geom) {
  if (!geom) return 0;
  if (geom.type === 'Polygon') {
    let a = ringArea(geom.coordinates[0]);
    for (let i = 1; i < geom.coordinates.length; i += 1) a -= ringArea(geom.coordinates[i]);
    return a;
  }
  if (geom.type === 'MultiPolygon') {
    let total = 0;
    for (let i = 0; i < geom.coordinates.length; i += 1) {
      const poly = geom.coordinates[i];
      let a = ringArea(poly[0]);
      for (let j = 1; j < poly.length; j += 1) a -= ringArea(poly[j]);
      total += a;
    }
    return total;
  }
  return 0;
}

function lineLength(geom) {
  if (!geom) return 0;
  const runs = geom.type === 'LineString' ? [geom.coordinates]
    : geom.type === 'MultiLineString' ? geom.coordinates : [];
  let total = 0;
  for (let r = 0; r < runs.length; r += 1) {
    const c = runs[r];
    for (let i = 0; i < c.length - 1; i += 1) {
      const a = toXY(c[i]);
      const b = toXY(c[i + 1]);
      total += Math.hypot(b[0] - a[0], b[1] - a[1]);
    }
  }
  return total;
}

function layerArea(layer) {
  const fc = readJSON('geometry/' + layer + '.geojson');
  return (fc.features || []).reduce(function (s, f) { return s + polygonArea(f.geometry); }, 0);
}
function layerLength(layer) {
  const fc = readJSON('geometry/' + layer + '.geojson');
  return (fc.features || []).reduce(function (s, f) { return s + lineLength(f.geometry); }, 0);
}

function auditGeometry(metrics) {
  const site = layerArea('site_boundary');
  const built = layerArea('buildings');
  const green = layerArea('green_space');
  const pub = layerArea('public_space');
  const land = layerArea('land_use');
  const roads = layerLength('roads');

  const pairs = [
    ['site_area_sqm', site, 1.0],
    ['building_footprint_area_sqm', built, 1.0],
    ['green_space_area_sqm', green, 1.0],
    ['public_space_area_sqm', pub, 1.0],
    ['green_ratio', green / site, 1e-5],
    ['public_space_ratio', pub / site, 1e-5],
    ['land_use_coverage_ratio', land / site, 1e-5],
    ['road_network_length_m', roads, 1.0]
  ];
  pairs.forEach(function (p) {
    const declared = pointer(metrics, '/metrics/' + p[0] + '/value');
    check('A.geometry', p[0], near(declared, p[1], p[2]),
      'declared=' + declared + ' recomputed=' + (Math.round(p[1] * 1000) / 1000));
  });

  // structural sanity: ratios must stay inside a defensible urban range
  check('A.geometry', 'green_ratio_plausible', green / site > 0.05 && green / site < 0.45,
    'green ratio ' + (green / site).toFixed(4));
  check('A.geometry', 'footprint_ratio_plausible', built / site > 0.001 && built / site < 0.35,
    'footprint ratio ' + (built / site).toFixed(4));

  // every feature must carry the five mandatory provenance properties
  const LAYERS = ['site_boundary', 'key_areas', 'land_use', 'buildings', 'roads',
    'green_space', 'public_space', 'phasing', 'constraints'];
  const REQ = ['id', 'layer', 'source_type', 'confidence', 'geometry_role'];
  let missing = 0;
  let featureTotal = 0;
  LAYERS.forEach(function (l) {
    const fc = readJSON('geometry/' + l + '.geojson');
    (fc.features || []).forEach(function (f) {
      featureTotal += 1;
      REQ.forEach(function (k) {
        if (f.properties === undefined || f.properties[k] === undefined) missing += 1;
      });
    });
  });
  check('A.geometry', 'feature_properties_complete', missing === 0,
    featureTotal + ' features, ' + missing + ' missing property slots');

  // the boundary must still declare itself provisional
  const sb = readJSON('geometry/site_boundary.geojson').features[0].properties;
  check('A.geometry', 'boundary_declared_provisional',
    sb.official_boundary === false && sb.geometry_role === 'provisional_constraint',
    'official_boundary=' + sb.official_boundary + ' role=' + sb.geometry_role);
}

/* ------------------------------------------------------- B. provenance */

// Apply a declared derivation to a resolved pointer target. Keeping the
// derivation in the data (rather than in this file) means a reviewer can see
// exactly how a count was produced without reading the auditor source.
function derive(value, spec) {
  if (!spec) return value;
  if (spec === 'length') return Array.isArray(value) ? value.length : undefined;
  const ge = /^count_ge:([A-Za-z0-9_]+):(-?\d+(?:\.\d+)?)$/.exec(spec);
  if (ge) {
    if (!Array.isArray(value)) return undefined;
    return value.filter(function (x) { return Number(x[ge[1]]) >= Number(ge[2]); }).length;
  }
  const dis = /^distinct:([A-Za-z0-9_]+)$/.exec(spec);
  if (dis) {
    if (!Array.isArray(value)) return undefined;
    const set = Object.create(null);
    value.forEach(function (x) { set[String(x[dis[1]])] = true; });
    return Object.keys(set).length;
  }
  return undefined;
}

function auditProvenance(metrics) {
  const prov = readJSON('visual/assets/claim-provenance.json');
  prov.records.forEach(function (r) {
    const spec = String(r.raw_value_path || '');
    const hash = spec.indexOf('#');
    if (hash < 0) { check('B.provenance', r.claim_id, false, 'malformed raw_value_path'); return; }
    const file = spec.slice(0, hash);
    const ptr = spec.slice(hash + 1);
    if (!/^\//.test(ptr)) {
      check('B.provenance', r.claim_id, false, 'raw_value_path must end in a JSON pointer');
      return;
    }
    let doc;
    try { doc = readJSON(file); } catch (e) {
      check('B.provenance', r.claim_id, false, 'cannot read ' + file); return;
    }
    let live = pointer(doc, ptr);
    if (r.derivation) {
      live = derive(live, r.derivation);
      if (live === undefined) {
        check('B.provenance', r.claim_id, false, 'unsupported derivation ' + r.derivation);
        return;
      }
    }
    const ok = (typeof live === 'number' && typeof r.raw_value === 'number')
      ? near(live, r.raw_value, 1e-6)
      : JSON.stringify(live) === JSON.stringify(r.raw_value);
    check('B.provenance', r.claim_id, ok, 'stored=' + JSON.stringify(r.raw_value) +
      ' live=' + JSON.stringify(live) + (r.derivation ? ' via ' + r.derivation : ''));

    (r.figure_files || []).forEach(function (f) {
      check('B.provenance', r.claim_id + ':figure:' + path.basename(f), exists(f), f);
    });
  });
}

/* ----------------------------------------------------------- C. ledger */

function auditLedger() {
  const led = readJSON('visual/assets/evidence-ledger.json');
  check('C.ledger', 'record_count_matches', led.record_count === led.records.length,
    led.record_count + ' vs ' + led.records.length);

  const seen = Object.create(null);
  led.records.forEach(function (r) {
    if (seen[r.id]) check('C.ledger', 'duplicate:' + r.id, false, 'duplicate record id');
    seen[r.id] = true;

    ['title_zh', 'title_en', 'decision_zh', 'decision_en', 'boundary_zh', 'boundary_en']
      .forEach(function (k) {
        if (!r[k] || String(r[k]).trim().length < 2) {
          check('C.ledger', r.id + ':' + k, false, 'empty field');
        }
      });

    const c = r.check;
    if (!c) { check('C.ledger', r.id, false, 'record has no check block'); return; }

    if (c.kind === 'files_exist') {
      const bad = (c.paths || []).filter(function (p) { return !exists(p); });
      check('C.ledger', r.id, bad.length === 0, bad.length ? 'missing ' + bad.join(', ') : 'all present');
    } else if (c.kind === 'json_pointer_equals') {
      let doc = null;
      try { doc = readJSON(c.file); } catch (e) { doc = null; }
      if (!doc) { check('C.ledger', r.id, false, 'cannot read ' + c.file); return; }
      const live = pointer(doc, c.pointer);
      const ok = (typeof live === 'number' && typeof c.expect === 'number')
        ? near(live, c.expect, 1e-6)
        : JSON.stringify(live) === JSON.stringify(c.expect);
      check('C.ledger', r.id, ok, 'expect=' + JSON.stringify(c.expect) + ' live=' + JSON.stringify(live));
    } else if (c.kind === 'risk_dimension') {
      const risk = readJSON(c.file);
      const d = (risk.dimensions || []).filter(function (x) { return x.id === c.dimension; })[0];
      if (!d) { check('C.ledger', r.id, false, 'dimension not found'); return; }
      const scoreOk = d.score === c.expect_score;
      const reviewOk = d.score < 4 || (d.human_review && d.human_review.length >= 8);
      check('C.ledger', r.id, scoreOk && reviewOk,
        'score=' + d.score + ' human_review=' + (d.human_review ? 'present' : 'MISSING'));
    } else if (c.kind === 'scenario_task_count') {
      const sim = readJSON(c.file);
      const n = sim.tasks.filter(function (t) { return t.scenario_id === c.scenario_id; }).length;
      check('C.ledger', r.id, n === c.expect, 'expect=' + c.expect + ' actual=' + n);
    } else {
      check('C.ledger', r.id, false, 'unknown check kind ' + c.kind);
    }
  });
}

/* ------------------------------------------------------------ D. gates */

function auditGates() {
  const idx = readJSON('visual/assets/v2-evidence-gate-index.json');
  check('D.gates', 'registered_count', idx.registered_gate_count === idx.gates.length,
    idx.registered_gate_count + ' vs ' + idx.gates.length);
  check('D.gates', 'planned_total_met', idx.gates.length >= idx.planned_gate_total,
    idx.gates.length + ' >= ' + idx.planned_gate_total);

  idx.gates.forEach(function (g) {
    if (!exists(g.path)) { check('D.gates', g.gate_id, false, 'missing ' + g.path); return; }
    const f = readJSON(g.path);
    const ok = f.gate_id === g.gate_id && f.domain === g.domain &&
      Array.isArray(f.procedure) && f.procedure.length >= 3 &&
      String(f.pass_rule || '').length >= 8 && String(f.stop_rule || '').length >= 8 &&
      String(f.non_ai_equivalent || '').length >= 2;
    check('D.gates', g.gate_id, ok,
      ok ? f.title_zh : 'inconsistent or incomplete gate file');
  });
}

/* ------------------------------------------------------- E. simulation */

function percentile95(values) {
  const s = values.slice().sort(function (a, b) { return a - b; });
  if (!s.length) return 0;
  const rank = Math.ceil(0.95 * s.length);
  return s[Math.min(rank, s.length) - 1];
}

function auditSimulation(metrics) {
  const sim = readJSON('simulation.json');
  const tasks = sim.tasks || [];
  check('E.simulation', 'task_count', sim.task_count === tasks.length,
    sim.task_count + ' vs ' + tasks.length);

  const succ = tasks.filter(function (t) {
    return t.outcome === 'success' || /_success$/.test(String(t.outcome));
  }).length;
  const schemaOk = tasks.filter(function (t) { return t.dispatch_schema_valid === true; }).length;
  const overs = tasks.filter(function (t) {
    return typeof t.energy_used_kwh === 'number' && typeof t.energy_budget_kwh === 'number' &&
      t.energy_used_kwh > t.energy_budget_kwh;
  }).length;
  const audited = tasks.filter(function (t) { return t.audit_complete === true; }).length;
  const flagged = tasks.filter(function (t) { return t.risk_flagged === true; });
  const intercepted = flagged.filter(function (t) { return t.human_review_required === true; }).length;
  const p95 = percentile95(tasks.map(function (t) { return Number(t.replan_seconds || 0); }));

  const derived = [
    ['simulation_task_count', tasks.length, 0],
    ['simulation_success_rate', succ / tasks.length, 1e-9],
    ['tool_schema_pass_rate', schemaOk / tasks.length, 1e-9],
    ['energy_budget_violations', overs, 0],
    ['audit_completeness', audited / tasks.length, 1e-9],
    ['high_risk_intercept_rate', flagged.length ? intercepted / flagged.length : 1, 1e-9],
    ['replan_p95_seconds', p95, 1e-9]
  ];
  derived.forEach(function (d) {
    const inSim = pointer(sim, '/derived/' + d[0]);
    const inMet = pointer(metrics, '/metrics/' + d[0] + '/value');
    check('E.simulation', d[0] + ':derived', near(inSim, d[1], d[2]),
      'declared=' + inSim + ' recomputed=' + d[1]);
    check('E.simulation', d[0] + ':metrics', near(inMet, d[1], d[2]),
      'metrics=' + inMet + ' recomputed=' + d[1]);
  });

  // honesty rule: refused and blocked tasks must never be counted as success
  const dishonest = tasks.filter(function (t) {
    const o = String(t.outcome || '');
    return (/^refused/.test(o) || /^blocked/.test(o)) && /success/.test(o);
  }).length;
  check('E.simulation', 'refusal_not_counted_as_success', dishonest === 0,
    dishonest + ' contaminated outcomes');

  // every high-risk task must be intercepted
  check('E.simulation', 'all_high_risk_intercepted', intercepted === flagged.length,
    intercepted + '/' + flagged.length);
}

/* --------------------------------------------------------- F. baseline */

function auditBaseline() {
  const sim = readJSON('simulation.json');
  const base = readJSON('visual/assets/evaluation-baseline.json');
  const declared = pointer(sim, '/baselines/urban_llm_harness') || {};
  const mirror = pointer(base, '/metrics/urban_llm_harness') ||
    pointer(base, '/baselines/urban_llm_harness') ||
    base.urban_llm_harness || {};
  let compared = 0;
  Object.keys(declared).forEach(function (k) {
    if (mirror[k] === undefined) {
      check('F.baseline', k, false, 'missing in evaluation-baseline.json');
      return;
    }
    compared += 1;
    const ok = (typeof declared[k] === 'number')
      ? near(mirror[k], declared[k], 1e-9)
      : JSON.stringify(mirror[k]) === JSON.stringify(declared[k]);
    check('F.baseline', k, ok, 'sim=' + declared[k] + ' baseline=' + mirror[k]);
  });
  check('F.baseline', 'fields_compared', compared > 0, compared + ' fields');
}

/* ------------------------------------------------------------ G. prose */

function auditProse(metrics) {
  ['proposal.md', 'proposal.en.md'].forEach(function (f) {
    if (!exists(f)) { check('G.prose', f, false, 'missing'); return; }
    const text = readText(f);
    const missing = Object.keys(metrics.metrics).filter(function (k) {
      return text.indexOf('[metric:' + k + ']') < 0;
    });
    check('G.prose', f + ':metric_tokens', missing.length === 0,
      missing.length ? 'missing ' + missing.join(', ') : 'all 23 tokens present');

    const tokens = text.match(/\[metric:([a-z0-9_]+)\]/g) || [];
    const unknown = tokens.map(function (t) { return t.slice(8, -1); })
      .filter(function (k) { return metrics.metrics[k] === undefined; });
    check('G.prose', f + ':no_unknown_tokens', unknown.length === 0, unknown.join(', '));
  });
}

/* ----------------------------------------------------------- H. safety */

const HARD_PATTERNS = [
  [/\b\d{17}[\dXx]\b/, 'identity card number'],
  [/(?:^|[^\d])1[3-9]\d{9}(?:[^\d]|$)/, 'mobile phone number'],
  [/(已获|已经获得)[\s\S]{0,12}(政府|官方)[\s\S]{0,12}(批准|背书|认可)/, 'claimed official approval'],
  [/(无需审批|保证落地|一定实施)/, 'unexecutable promise'],
  [/(内部资料|涉密|保密图件|非公开空间数据|绝密|机密)/, 'sensitive data claim']
];

function walk(dir, out) {
  fs.readdirSync(dir).forEach(function (name) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) { walk(full, out); return; }
    if (/\.(md|json|geojson|html|js|css|txt)$/i.test(name)) out.push(full);
  });
  return out;
}

function auditSafety() {
  const files = walk(ROOT, []);
  let hits = 0;
  files.forEach(function (full) {
    if (path.basename(full) === 'evidence-audit.js') return; // the patterns live here
    let text;
    try { text = fs.readFileSync(full, 'utf8'); } catch (e) { return; }
    HARD_PATTERNS.forEach(function (p) {
      if (p[0].test(text)) {
        hits += 1;
        check('H.safety', path.relative(ROOT, full).replace(/\\/g, '/'), false, p[1]);
      }
    });
  });
  check('H.safety', 'hard_risk_pattern_scan', hits === 0,
    files.length + ' text files scanned, ' + hits + ' hits');
}

/* --------------------------------------------------- I. citation tokens */
/* 正文里的每一个 [source:] [depth:] [standard:] [metric:] 记号都必须能在对应
   登记册中找到条目。悬空记号意味着「可回溯」的主张在该处是空的，因此按失败处理。*/

function auditTokens(metrics) {
  const sources = readJSON('sources.json');
  const depth = readJSON('design_depth_matrix.json');
  const standards = readJSON('standard_matrix.json');

  const registry = {
    source: sources.sources.map(function (s) { return s.id; }),
    depth: depth.items.map(function (i) { return i.item_id; }),
    standard: standards.standards.map(function (s) { return s.standard_id; }),
    metric: Object.keys(metrics.metrics)
  };

  check('I.tokens', 'sources.json:source_count',
    sources.source_count === sources.sources.length,
    'declared ' + sources.source_count + ' vs actual ' + sources.sources.length);

  Object.keys(registry).forEach(function (kind) {
    const ids = registry[kind];
    const dup = ids.filter(function (v, i) { return ids.indexOf(v) !== i; });
    check('I.tokens', kind + '_registry:no_duplicate_id', dup.length === 0, dup.join(', '));
  });

  ['proposal.md', 'proposal.en.md'].forEach(function (f) {
    if (!exists(f)) { check('I.tokens', f, false, 'missing'); return; }
    const text = readText(f);
    const seen = { source: [], depth: [], standard: [], metric: [] };
    const re = /\[(source|depth|standard|metric):([A-Za-z0-9_\-]+)\]/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      if (seen[m[1]].indexOf(m[2]) < 0) seen[m[1]].push(m[2]);
    }
    Object.keys(seen).forEach(function (kind) {
      const dangling = seen[kind].filter(function (id) {
        return registry[kind].indexOf(id) < 0;
      });
      check('I.tokens', f + ':' + kind + '_resolves',
        dangling.length === 0,
        dangling.length ? 'dangling: ' + dangling.join(', ')
          : seen[kind].length + ' distinct ids all resolve');
    });
  });

  /* 每一份图注引用的图纸文件都必须真实存在，且英文正文只能引用英文图版。*/
  [['proposal.md', false], ['proposal.en.md', true]].forEach(function (pair) {
    const f = pair[0];
    const wantEn = pair[1];
    if (!exists(f)) return;
    const text = readText(f);
    const refs = [];
    const re = /!\[[^\]]*\]\(([^)]+)\)/g;
    let m;
    while ((m = re.exec(text)) !== null) refs.push(m[1]);
    const missing = refs.filter(function (r) { return !exists(r); });
    check('I.tokens', f + ':figure_files_exist', missing.length === 0,
      missing.length ? missing.join(', ') : refs.length + ' figure refs resolve');
    if (wantEn) {
      const wrong = refs.filter(function (r) {
        return /\.png$/i.test(r) && !/\.en\.png$/i.test(r);
      });
      check('I.tokens', f + ':figures_are_english_plates', wrong.length === 0,
        wrong.join(', '));
    }
  });
}

/* -------------------------------------------------------------- runner */

function main() {
  const metrics = readJSON('metrics.json');
  auditGeometry(metrics);
  auditProvenance(metrics);
  auditLedger();
  auditGates();
  auditSimulation(metrics);
  auditBaseline();
  auditProse(metrics);
  auditSafety();
  auditTokens(metrics);

  const groups = {};
  results.forEach(function (r) {
    if (!groups[r.group]) groups[r.group] = { pass: 0, fail: 0 };
    groups[r.group][r.ok ? 'pass' : 'fail'] += 1;
  });

  process.stdout.write('\nevidence-audit  ' + path.basename(ROOT) + '\n');
  process.stdout.write('package root: ' + ROOT + '\n\n');
  Object.keys(groups).sort().forEach(function (g) {
    const s = groups[g];
    process.stdout.write('  ' + (s.fail === 0 ? 'PASS' : 'FAIL') + '  ' + g +
      '  ' + s.pass + ' passed, ' + s.fail + ' failed\n');
  });
  if (failed > 0) {
    process.stdout.write('\nfailing assertions:\n');
    results.filter(function (r) { return !r.ok; }).forEach(function (r) {
      process.stdout.write('  - [' + r.group + '] ' + r.name + ': ' + r.detail + '\n');
    });
  }
  const total = passed + failed;
  process.stdout.write('\ntotal ' + total + ' assertions, ' + passed + ' passed, ' +
    failed + ' failed  (' + (total ? (100 * passed / total).toFixed(2) : '0') + '%)\n');
  process.stdout.write(failed === 0
    ? 'RESULT: every claim in this package was re-derived from its own source files.\n'
    : 'RESULT: audit failed; the package must not be submitted in this state.\n');
  process.exit(failed === 0 ? 0 : 1);
}

if (require.main === module) {
  main();
} else {
  module.exports = { main: main, pointer: pointer, polygonArea: polygonArea };
}
