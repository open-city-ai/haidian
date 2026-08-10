#!/usr/bin/env node
/**
 * run_s08_tabletop.js — run the closure mechanism against itself, on paper.
 *
 *   node visual/assets/run_s08_tabletop.js
 *
 * The proposal describes a four-week closure trial for S08 and a set of rules
 * that decide what happens to a scenario. Describing rules is cheap. This
 * exercises them: eight cases are constructed, each one a closure record that
 * either satisfies the mechanism or breaks it in a specific way, and every case
 * is put through the shipped reader — `check_closure.js`, spawned as a
 * subprocess, not a copy of its logic — so what is tested is the file a
 * reviewer would actually run.
 *
 * The cases that matter are the failing ones. A mechanism that only accepts
 * good records proves nothing; the claim in the proposal is that certain moves
 * are structurally unavailable — patching the worst station, resuming after one
 * lucky cycle, running a circuit with a single kind of reviewer — and a claim
 * like that is only worth something if the refusal can be demonstrated.
 *
 * What this proves: the decision logic is reproducible, and the stop and
 * rejection branches fire where the proposal says they do.
 *
 * What it does not prove: nothing here is a field measurement. There are no
 * real readings, no real review parties, no service performance, and no
 * evidence that anyone would take a reading at all. The readings are worked
 * numbers chosen to exercise branches. Treating this as operational evidence
 * would be exactly the substitution this proposal argues against.
 *
 * Zero dependencies, no network. Exit code 0 when every case behaved as
 * specified, 1 otherwise. Evidence is written to s08-tabletop-evidence.json.
 */

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const HERE = __dirname;
const READER = path.join(HERE, 'check_closure.js');
const BASE = JSON.parse(fs.readFileSync(path.join(HERE, 'example-s08-closure-record.json'), 'utf8'));
const OUT = path.join(HERE, 's08-tabletop-evidence.json');

const clone = (o) => JSON.parse(JSON.stringify(o));

/** Each case states the rule it exercises and the outcome the proposal promises. */
const CASES = [
  {
    id: 'C1-within-tolerance',
    rule: 'f <= F is level for this cycle and the scenario continues',
    expect: 'accept',
    build: () => clone(BASE),
  },
  {
    id: 'C2-over-tolerance-returns-whole-route',
    rule: 'f > F returns the whole route, not the failing station',
    expect: 'accept',
    build: () => {
      const r = clone(BASE);
      r.stations[1].reading = 0.55;          // a genuinely bad station
      r.verdict.f = 0.36;                     // honestly recomputed
      r.verdict.passed = false;
      r.verdict.action = 'return-whole-route';
      return r;
    },
  },
  {
    id: 'C3-local-repair-refused',
    rule: 'rule 5: amending only the worst station is not an available action',
    expect: 'reject',
    build: () => {
      const r = clone(BASE);
      r.stations.splice(1, 1);                // delete the worst station
      r.verdict.f = 0.03;
      return r;
    },
  },
  {
    id: 'C4-declared-f-disagrees',
    rule: 'a record does not get to state its own f',
    expect: 'reject',
    build: () => {
      const r = clone(BASE);
      r.stations[1].reading = 0.55;
      // f, passed and action all left at the flattering originals
      return r;
    },
  },
  {
    id: 'C5-homogeneous-review-parties',
    rule: 'a circuit read by one kind of party cannot detect what that party cannot see',
    expect: 'reject',
    build: () => {
      const r = clone(BASE);
      r.stations.forEach((s) => { s.review_party = 'operator'; });
      return r;
    },
  },
  {
    id: 'C6-no-non-ai-path',
    rule: 'without an equivalent non-AI path the stop rule would be circumvented',
    expect: 'reject',
    build: () => {
      const r = clone(BASE);
      r.verdict.non_ai_path_available = false;
      return r;
    },
  },
  {
    id: 'C6b-non-ai-path-omitted',
    rule: 'omitting the non-AI path field is not the same as satisfying it',
    expect: 'reject',
    build: () => {
      const r = clone(BASE);
      delete r.verdict.non_ai_path_available;
      return r;
    },
  },
  {
    id: 'C6c-route-does-not-reach-a-known-point',
    rule: 'a connecting route must terminate at a first-order benchmark, or nothing checks the carried value',
    expect: 'reject',
    build: () => {
      const r = clone(BASE);
      r.stations[r.stations.length - 1].benchmark = 'BM-302';
      return r;
    },
  },
  {
    id: 'C7-resumption-after-one-pass',
    rule: 'rule 7: two consecutive passes are required, because once may be luck',
    expect: 'reject',
    build: () => {
      const r = clone(BASE);
      r.resumption = { previous_failure_cycle: 1, consecutive_passes: 1, cause_published: true };
      return r;
    },
  },
  {
    id: 'C8-f1-resumption-needs-unanimity',
    rule: 'rule 7: an F1 incident resumes only on unanimous confirmation, no majority rule',
    expect: 'reject',
    build: () => {
      const r = clone(BASE);
      r.tolerance_class = 'F1';
      r.tolerance_F = 0.05;
      r.f_convention = 'false-positive-plus-false-negative';
      r.verdict.passed = false;
      r.verdict.action = 'return-whole-route';
      r.resumption = {
        previous_failure_cycle: 2,
        consecutive_passes: 2,
        cause_published: true,
        unanimous_four_parties: false,
      };
      return r;
    },
  },
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 's08-tabletop-'));
const results = [];
let mismatches = 0;

for (const c of CASES) {
  const file = path.join(tmp, `${c.id}.json`);
  fs.writeFileSync(file, JSON.stringify(c.build(), null, 2));
  const run = spawnSync(process.execPath, [READER, file], { encoding: 'utf8' });
  const actual = run.status === 0 ? 'accept' : 'reject';
  const ok = actual === c.expect;
  if (!ok) mismatches += 1;
  const reasons = (run.stdout || '')
    .split('\n')
    .filter((l) => l.trim().startsWith('- '))
    .map((l) => l.trim().slice(2));
  results.push({ case: c.id, rule: c.rule, expected: c.expect, actual, ok, reasons });
}

fs.rmSync(tmp, { recursive: true, force: true });

const accepted = results.filter((r) => r.actual === 'accept').length;
const rejected = results.length - accepted;

console.log('S08 closure-mechanism tabletop');
console.log(`  reader   ${path.relative(process.cwd(), READER)}`);
console.log('');
for (const r of results) {
  // `r.expected`, not `r.expect`: the first version read a field that does not
  // exist on the result object, so every line printed "expected reject"
  // regardless of the case. A misreported expectation inside the very file
  // whose job is honest reporting.
  console.log(`  ${r.ok ? 'OK  ' : 'FAIL'} ${r.case.padEnd(34)} expected ${r.expected}, got ${r.actual}`);
  console.log(`       ${r.rule}`);
  if (r.reasons.length) console.log(`       refused because: ${r.reasons[0]}`);
}
console.log('');
console.log(`  ${results.length - mismatches}/${results.length} cases behaved as specified` +
            `  (${accepted} accepted, ${rejected} refused)`);
console.log('');
console.log('  proves      the decision logic is reproducible and the refusal branches fire');
console.log('  proves NOT  any field reading, any real review party, any service performance');

const evidence = {
  schema_version: 'tabletop-evidence-v1',
  disclaimer: 'concept-only',
  scenario_id: 'S08',
  generated_by: 'visual/assets/run_s08_tabletop.js',
  reader_under_test: 'visual/assets/check_closure.js',
  cases_total: results.length,
  cases_as_specified: results.length - mismatches,
  cases_accepted: accepted,
  cases_refused: rejected,
  proves: 'The closure mechanism\'s decision logic is reproducible from the shipped contract, and the ' +
          'refusal branches — no local repair, no self-declared f, no homogeneous review parties, no ' +
          'missing non-AI path, no resumption on one pass, no majority-rule F1 resumption — fire where ' +
          'the proposal says they do.',
  proves_not: 'Nothing here is a field measurement. No real readings, no real review parties, no service ' +
              'performance, and no evidence that anyone would take a reading. The numbers are worked ' +
              'values chosen to exercise branches; treating them as operational evidence would be the ' +
              'substitution this proposal argues against.',
  results,
};
fs.writeFileSync(OUT, JSON.stringify(evidence, null, 1) + '\n');
console.log(`  evidence    ${path.relative(process.cwd(), OUT)}`);

process.exit(mismatches ? 1 : 0);
