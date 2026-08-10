#!/usr/bin/env node
/**
 * check_closure.js — run the closure mechanism, do not just read about it.
 *
 *   node visual/assets/check_closure.js [record.json]
 *
 * The package already ships verify.js, which recomputes the metrics. This
 * recomputes the *mechanism*. The proposal argues that a declaration nobody can
 * machine-check is not evidence — and for most of its life the closure
 * mechanism, which is the proposal's central declaration, existed only as prose
 * and tables. That was the same defect this submission reports in other
 * people's structured fields, sitting in its own.
 *
 * So a closure record is a data contract (closure-record.schema.json), and this
 * file is the instrument that reads one:
 *
 *   1. checks the record against the contract, without a JSON-schema library;
 *   2. recomputes f from the station readings and rejects a record whose
 *      declared f disagrees with the recomputation;
 *   3. derives the verdict from f and F rather than trusting the stated one;
 *   4. enforces the mechanism rules that are easy to write and easy to skip —
 *      four review categories, no local repair, a non-AI path, affected users
 *      taking their own readings, tolerance that may only tighten.
 *
 * Zero dependencies, no network. The exit code is the verdict.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const SCHEMA = path.join(HERE, 'closure-record.schema.json');
const DEFAULT_RECORD = path.join(HERE, 'example-s08-closure-record.json');

const problems = [];
const notes = [];
const fail = (m) => problems.push(m);

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (err) {
    console.error(`cannot read ${p}: ${err.message}`);
    process.exit(2);
  }
}

/**
 * A deliberately small subset of JSON Schema: the keywords this contract
 * actually uses. Pulling in a validator would make the check unrunnable for a
 * reviewer with only Node and this directory, which is the whole point.
 */
function validate(node, schema, where) {
  if (schema.const !== undefined && node !== schema.const) {
    fail(`${where}: must be ${JSON.stringify(schema.const)}, got ${JSON.stringify(node)}`);
    return;
  }
  if (schema.enum && !schema.enum.includes(node)) {
    fail(`${where}: must be one of ${schema.enum.join(', ')}, got ${JSON.stringify(node)}`);
    return;
  }
  const t = schema.type;
  if (t === 'object') {
    if (node === null || typeof node !== 'object' || Array.isArray(node)) {
      fail(`${where}: must be an object`);
      return;
    }
    for (const key of schema.required || []) {
      if (!(key in node)) fail(`${where}: missing required property "${key}"`);
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(node)) {
        if (!(schema.properties && key in schema.properties)) {
          fail(`${where}: unexpected property "${key}"`);
        }
      }
    }
    for (const [key, sub] of Object.entries(schema.properties || {})) {
      if (key in node) validate(node[key], sub, `${where}.${key}`);
    }
  } else if (t === 'array') {
    if (!Array.isArray(node)) { fail(`${where}: must be an array`); return; }
    if (schema.minItems !== undefined && node.length < schema.minItems) {
      fail(`${where}: needs at least ${schema.minItems} items, has ${node.length}`);
    }
    node.forEach((item, i) => validate(item, schema.items || {}, `${where}[${i}]`));
  } else if (t === 'number' || t === 'integer') {
    if (typeof node !== 'number' || (t === 'integer' && !Number.isInteger(node))) {
      fail(`${where}: must be ${t}`);
      return;
    }
    if (schema.minimum !== undefined && node < schema.minimum) fail(`${where}: below minimum ${schema.minimum}`);
    if (schema.maximum !== undefined && node > schema.maximum) fail(`${where}: above maximum ${schema.maximum}`);
    if (schema.exclusiveMinimum !== undefined && node <= schema.exclusiveMinimum) {
      fail(`${where}: must be greater than ${schema.exclusiveMinimum}`);
    }
  } else if (t === 'string') {
    if (typeof node !== 'string') { fail(`${where}: must be a string`); return; }
    if (schema.pattern && !new RegExp(schema.pattern).test(node)) {
      fail(`${where}: does not match ${schema.pattern}`);
    }
    if (schema.maxLength !== undefined && node.length > schema.maxLength) {
      fail(`${where}: longer than ${schema.maxLength}`);
    }
    if (schema.format === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(node)) {
      fail(`${where}: must be a YYYY-MM-DD date`);
    }
  } else if (t === 'boolean') {
    if (typeof node !== 'boolean') fail(`${where}: must be a boolean`);
  }
}

const recordPath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_RECORD;
const schema = readJson(SCHEMA);
const record = readJson(recordPath);

console.log('Closure record check');
console.log(`  contract  ${path.relative(process.cwd(), SCHEMA)}`);
console.log(`  record    ${path.relative(process.cwd(), recordPath)}`);
console.log('');

validate(record, schema, 'record');

// ---- recompute f rather than trusting it -------------------------------
let recomputed = null;
if (Array.isArray(record.stations) && record.stations.every((s) => typeof s.reading === 'number')) {
  const readings = record.stations.map((s) => s.reading);
  recomputed = Math.max(...readings) - Math.min(...readings);
  const declared = record.verdict && record.verdict.f;
  if (typeof declared === 'number' && Math.abs(declared - recomputed) > 1e-9) {
    fail(`verdict.f declares ${declared} but the stations recompute to ${recomputed.toFixed(6)}`);
  }
}

// ---- the mechanism rules, enforced rather than described ----------------
const stations = Array.isArray(record.stations) ? record.stations : [];

if (stations.length && stations[0].benchmark !== 'BM-0') {
  fail(`stations[0]: every circuit departs from BM-0, this one departs from ${stations[0].benchmark}`);
}

// RT-N and RT-S are 附合路线 — connecting routes, not closed loops. They depart
// from the origin and terminate at a different, independently known point, and
// that terminus is the whole reason the run is checkable: without a second
// known height at the far end there is nothing for the carried value to be
// compared against. The departure was enforced and the terminus was not, which
// left the defining property of the route form unchecked. Resolved against the
// shipped geometry rather than a list in this file, so a benchmark that stops
// being first-order cannot silently keep qualifying.
const ORDERS = (() => {
  const gj = JSON.parse(fs.readFileSync(path.join(HERE, '..', '..', 'geometry/public_space.geojson'), 'utf8'));
  return new Map(gj.features.filter((f) => f.properties.benchmark_id)
    .map((f) => [f.properties.benchmark_id, f.properties.benchmark_order]));
})();

if (stations.length > 1) {
  const last = stations[stations.length - 1].benchmark;
  if (ORDERS.get(last) !== 'first') {
    fail(`stations[last]: a connecting route must terminate at a first-order benchmark, because the ` +
         `carried value has nothing to be checked against otherwise. This one ends at ${last} ` +
         `(${ORDERS.get(last) || 'not a benchmark'}).`);
  }
}

const parties = new Set(stations.map((s) => s.review_party));
if (parties.size < 3) {
  fail(`review parties: ${parties.size} distinct across the circuit; a reading taken by one kind of party ` +
       `cannot detect what that kind of party cannot see`);
} else if (parties.size < 4) {
  notes.push(`review parties: ${parties.size} of 4 categories present (${[...parties].join(', ')}). ` +
             `A full cycle must include all four; a three-station trial circuit cannot.`);
}

// Omission used to pass. The field was optional in the schema and this check
// only looked for an explicit `false`, so a record that simply left it out
// cleared both — fail-open on the one rule the proposal calls non-waivable.
// Caught in review of PR #1002 by @anselasimov-web. The schema now requires
// the field with const true; this states the same refusal in the reader's own
// words, because a contract enforced in only one of the two places is the
// defect one layer down.
if (record.verdict && !('non_ai_path_available' in record.verdict)) {
  fail('verdict.non_ai_path_available is absent: the equivalent non-AI path is not waivable, so ' +
       'omitting the field cannot be treated as satisfying it. State it explicitly as true.');
}
if (record.verdict && record.verdict.non_ai_path_available === false) {
  fail('verdict.non_ai_path_available is false: a scenario with no non-AI equivalent cannot be returned, ' +
       'because returning it would interrupt public service — so the stop rule would be circumvented');
}

if (record.tolerance_class === 'F1' && record.resumption &&
    record.resumption.unanimous_four_parties !== true) {
  fail('resumption after an F1 incident requires unanimous confirmation by all four review categories');
}
if (record.resumption && record.resumption.consecutive_passes < 2) {
  fail(`resumption needs two consecutive passing cycles, record shows ${record.resumption.consecutive_passes}; ` +
       `once may be luck`);
}

const stepFree = stations.filter((s) => /wheelchair|step-free|轮椅|无障碍/i.test(s.note || ''));
for (const s of stepFree) {
  if (s.read_by_affected_user !== true) {
    fail(`${s.benchmark}: a step-free or wheelchair reading must be taken by the affected user in person`);
  }
}

// ---- derive the verdict, do not accept it ------------------------------
let derivedPass = null;
if (recomputed !== null && typeof record.tolerance_F === 'number') {
  derivedPass = recomputed <= record.tolerance_F;
  if (record.verdict && record.verdict.passed !== derivedPass) {
    fail(`verdict.passed says ${record.verdict.passed} but f ${recomputed.toFixed(3)} against F ` +
         `${record.tolerance_F} derives ${derivedPass}`);
  }
  const expected = derivedPass ? 'continue' : 'return-whole-route';
  if (record.verdict && record.verdict.action !== expected && record.verdict.action !== 'resume-pending') {
    fail(`verdict.action is "${record.verdict.action}" but f against F requires "${expected}"`);
  }
}

if (recomputed !== null) {
  const readings = stations.map((s) => s.reading);
  const lo = Math.min(...readings);
  const worst = stations.find((s) => s.reading === lo);
  console.log(`  convention   ${record.f_convention} — f is the range across stations`);
  console.log(`  readings     ${readings.join(', ')}`);
  console.log(`  f            ${recomputed.toFixed(3)}   (max ${Math.max(...readings)} − min ${lo})`);
  console.log(`  tolerance F  ${record.tolerance_F}   class ${record.tolerance_class}`);
  console.log(`  verdict      f ${derivedPass ? '<=' : '>'} F  →  ${derivedPass ? 'level for this cycle' : 'return the whole route'}`);
  if (worst) {
    console.log(`  lowest       ${worst.benchmark} (${worst.review_party})${worst.read_by_affected_user ? ', read by the affected user' : ''}`);
    console.log(`               amending only this station is not an available action`);
  }
  console.log('');
}

if (record.illustrative) {
  notes.push('record is marked illustrative: the readings are a worked example, not field measurements');
}

for (const n of notes) console.log(`  note: ${n}`);
if (notes.length) console.log('');

if (problems.length) {
  console.log(`${problems.length} problem(s):`);
  for (const p of problems) console.log(`  - ${p}`);
  console.log('');
  console.log('Record rejected.');
  process.exit(1);
}

console.log('Record is well formed, f recomputes, and the mechanism rules hold.');
process.exit(0);
