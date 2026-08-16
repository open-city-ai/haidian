#!/usr/bin/env node
/*
 * check_cards.js — refuse a scenario card set that cannot be joined to anything.
 *
 *   node visual/assets/check_cards.js              # check the shipped cards
 *   node visual/assets/check_cards.js --selftest   # prove the checks have teeth
 *
 * The twelve cards used to be a markdown table. Six of them named a benchmark
 * that does not exist — 「BM-2x」 and 「BM-3xx」 are placeholders, not ids — and
 * eleven said 「超限」 without anywhere defining the quantity that would be over
 * the limit. Both defects survived every review because a table cannot be
 * joined to the geometry it refers to and prose cannot be asked whether a word
 * has a definition.
 *
 * So the cards are data now, and this reads them the way check_closure.js reads
 * a closure record: it accepts none of the file's conclusions about itself. It
 * does not trust `operational`, it recomputes it. It does not trust that a
 * benchmark id is real, it looks it up in public_space.geojson. It does not
 * trust that a spatial anchor resolves, it opens the named GeoJSON and looks
 * for the feature id.
 *
 * What it deliberately does NOT do is certify that the cards are good policy,
 * that the thresholds are the right thresholds, or that any of this would work.
 * It certifies exactly one thing: every field the cards promise is present, and
 * every reference they make resolves to something that exists.
 *
 * No dependencies. Node >= 14. Exit 0 pass, 1 fail.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const PKG = path.resolve(HERE, '..', '..');

const problems = [];
const fail = (m) => problems.push(m);

const read = (rel) => JSON.parse(fs.readFileSync(path.join(PKG, rel), 'utf8'));

/* ---- the checks, as one function so --selftest can re-run them on a mutant --- */

function check(cards, world) {
  const { benchmarkIds, featureIds, registryScenarios } = world;

  const ids = cards.cards.map((c) => c.id);
  if (new Set(ids).size !== ids.length) fail('card ids are not unique');
  ids.forEach((id, i) => {
    const want = 'S' + String(i + 1).padStart(2, '0');
    if (id !== want) fail(`card ${i}: expected ${want}, got ${id}`);
  });

  // Tolerance classes must stay ordered once they have values, so a later edit
  // cannot quietly make the safety class the loosest one.
  for (const [name, lvl] of Object.entries(cards.tolerance_levels)) {
    const looser = lvl.must_be_stricter_than;
    if (!looser) continue;
    const other = cards.tolerance_levels[looser];
    if (!other) { fail(`${name}.must_be_stricter_than names ${looser}, which is not a class`); continue; }
    if (lvl.value !== null && other.value !== null && !(lvl.value < other.value)) {
      fail(`${name} = ${lvl.value} is not stricter than ${looser} = ${other.value}`);
    }
  }

  for (const c of cards.cards) {
    const at = `${c.id}`;

    // Every promised field, present and non-empty. The lead sentence promises
    // eight; the table used to deliver six.
    for (const f of ['name_zh', 'name_en', 'data_source_zh', 'data_source_en',
                     'human_review_zh', 'human_review_en', 'f_definition_zh',
                     'f_family', 'tolerance_level', 'privacy_boundary',
                     'non_ai_equivalent_zh', 'non_ai_equivalent_en']) {
      if (!c[f] || String(c[f]).trim() === '') fail(`${at}: ${f} is empty — the cards promise this field`);
    }

    // The stop rule this whole package turns on is that a scenario may not be
    // returned to service without an equivalent that does not need the model.
    // The closure reader enforces the boolean; nothing enforced that the card
    // says what the equivalent IS, and for a while none of them did.
    if (c.tolerance_level === 'F1' && c.non_ai_equivalent_permanent !== true) {
      fail(`${at}: is F1 and does not mark its non-AI equivalent permanent — ` +
           `at F1 the equivalent is not withdrawn when the AI comes back`);
    }
    if (c.tolerance_level !== 'F1' && c.non_ai_equivalent_permanent === true) {
      fail(`${at}: marks its non-AI equivalent permanent at ${c.tolerance_level}; ` +
           `permanence is the F1 rule and claiming it elsewhere makes the rule mean less`);
    }

    // Benchmarks: real ids, not placeholders.
    if (!Array.isArray(c.benchmark_ids) || c.benchmark_ids.length === 0) {
      fail(`${at}: names no benchmark; a scenario with no water-level point cannot be re-surveyed`);
    }
    for (const bm of c.benchmark_ids || []) {
      if (!benchmarkIds.has(bm)) {
        fail(`${at}: benchmark "${bm}" is not a benchmark_id in geometry/public_space.geojson ` +
             `(known: ${[...benchmarkIds].sort().join(', ')})`);
      }
    }

    // Spatial anchor resolves to a feature that exists.
    const ref = c.spatial_anchor && c.spatial_anchor.ref;
    if (!ref || !ref.includes('#')) {
      fail(`${at}: spatial_anchor.ref missing or not a file#id reference`);
    } else {
      const [file, fid] = ref.split('#');
      const known = featureIds[file];
      if (!known) fail(`${at}: spatial_anchor points at ${file}, which is not a shipped geometry file`);
      else if (!known.has(fid)) fail(`${at}: spatial_anchor ${ref} names a feature id that does not exist`);
    }

    // f convention: named family, and the family is defined.
    if (!cards.f_families[c.f_family]) fail(`${at}: f_family "${c.f_family}" has no definition`);

    // Tolerance class exists, and the card's copy of F agrees with the class.
    const lvl = cards.tolerance_levels[c.tolerance_level];
    if (!lvl) fail(`${at}: tolerance_level "${c.tolerance_level}" is not a declared class`);
    else if (c.tolerance_F !== lvl.value) {
      fail(`${at}: carries tolerance_F ${JSON.stringify(c.tolerance_F)} but class ` +
           `${c.tolerance_level} is ${JSON.stringify(lvl.value)}`);
    }

    // Exit triggers: at least one, each naming a defined quantity and a role.
    if (!Array.isArray(c.exit_triggers) || c.exit_triggers.length === 0) {
      fail(`${at}: no exit trigger; an exit condition nobody can compute is not an exit condition`);
    }
    for (const t of c.exit_triggers || []) {
      if (t.quantity !== '__f__' && !cards.quantities[t.quantity]) {
        fail(`${at}: exit trigger names quantity "${t.quantity}", which is nowhere defined — ` +
             `this is what 「超限」 used to hide`);
      }
      if (!t.executing_role) fail(`${at}: exit trigger names no executing role`);
      else if (!cards.roles[t.executing_role]) fail(`${at}: executing_role "${t.executing_role}" is not a declared role type`);
      if (!t.action_zh || !t.action_en) fail(`${at}: exit trigger has no action in one or both languages`);
      const stated = t.threshold_state;
      const isSet = t.threshold !== null && t.threshold !== undefined;
      if (isSet && stated === 'pending_baseline_cycle') fail(`${at}: threshold is set but declared pending`);
      if (!isSet && stated === 'set') fail(`${at}: threshold declared set but is null`);
    }

    // `operational` is recomputed, never trusted.
    const thresholdsSet = (c.exit_triggers || []).every(
      (t) => t.threshold !== null && t.threshold !== undefined);
    const want = Boolean(lvl && lvl.value !== null && thresholdsSet);
    if (c.operational !== want) {
      fail(`${at}: declares operational=${c.operational} but tolerance ` +
           `${lvl ? JSON.stringify(lvl.value) : '?'} and its thresholds recompute to ${want}`);
    }
    if (!want && !c.not_operational_because) {
      fail(`${at}: is not operational and does not say why`);
    }

    // Registry mapping: either a declared scenario, or an explicit reason it is not one.
    if (c.registry_scenario === null) {
      if (!c.registry_note_zh || !c.registry_note_en) {
        fail(`${at}: maps to no registry scenario and gives no reason in one or both languages`);
      }
    } else if (!registryScenarios.has(c.registry_scenario)) {
      fail(`${at}: registry_scenario "${c.registry_scenario}" is not in the front matter's scenarios list`);
    }
  }

  // Every declared registry scenario is claimed by at least one card, or the
  // front matter is advertising something the package does not carry.
  const claimed = new Set(cards.cards.map((c) => c.registry_scenario).filter(Boolean));
  for (const s of registryScenarios) {
    if (!claimed.has(s)) fail(`front matter declares scenario "${s}" and no card carries it`);
  }

  // Every defined quantity is used. An unused definition is a place for a stale
  // one to hide.
  const used = new Set(cards.cards.flatMap((c) => (c.exit_triggers || []).map((t) => t.quantity)));
  for (const q of Object.keys(cards.quantities)) {
    if (!used.has(q)) fail(`quantity "${q}" is defined and used by no card`);
  }
}

/* ---- the world the cards are checked against ------------------------------- */

function world() {
  const benchmarkIds = new Set();
  const featureIds = {};
  for (const f of fs.readdirSync(path.join(PKG, 'geometry'))) {
    if (!f.endsWith('.geojson')) continue;
    const rel = `geometry/${f}`;
    const gj = read(rel);
    featureIds[rel] = new Set(gj.features.map((x) => x.properties.id));
    for (const x of gj.features) {
      if (x.properties.benchmark_id) benchmarkIds.add(x.properties.benchmark_id);
    }
  }
  const md = fs.readFileSync(path.join(PKG, 'proposal.md'), 'utf8');
  const m = md.match(/scenarios:\s*\[(.*?)\]/s);
  const registryScenarios = new Set(
    (m ? m[1] : '').split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean));
  return { benchmarkIds, featureIds, registryScenarios };
}

/* ---- self-test: mutate the shipped cards and require each break to be caught -- */

const MUTATIONS = [
  ['a placeholder benchmark id', (c) => { c.cards[1].benchmark_ids = ['BM-2x']; }],
  ['an undefined exit quantity', (c) => { c.cards[5].exit_triggers[0].quantity = 'over_the_limit'; }],
  ['a missing data source', (c) => { c.cards[3].data_source_zh = ''; }],
  ['an unresolvable spatial anchor', (c) => { c.cards[7].spatial_anchor.ref = 'geometry/roads.geojson#ROAD-999'; }],
  ['an exit action with no executing role', (c) => { delete c.cards[9].exit_triggers[0].executing_role; }],
  ['a card claiming to be operational on an unset tolerance', (c) => { c.cards[0].operational = true; }],
  ['a safety class looser than an information class', (c) => {
    c.tolerance_levels.F1.value = 0.5; c.tolerance_levels.F2.value = 0.4;
    for (const x of c.cards) x.tolerance_F = c.tolerance_levels[x.tolerance_level].value;
  }],
  ['a registry scenario no card carries', (c) => { c.cards[5].registry_scenario = null;
    c.cards[5].registry_note_zh = 'x'; c.cards[5].registry_note_en = 'x'; }],
  ['a card that does not say what its non-AI equivalent is', (c) => {
    c.cards[2].non_ai_equivalent_zh = ''; }],
  ['an F1 card whose non-AI equivalent is not permanent', (c) => {
    const f1 = c.cards.find((x) => x.tolerance_level === 'F1');
    f1.non_ai_equivalent_permanent = false; }],
];

function selftest(base, w) {
  let bad = 0;
  for (const [name, mutate] of MUTATIONS) {
    const clone = JSON.parse(JSON.stringify(base));
    mutate(clone);
    problems.length = 0;
    check(clone, w);
    const caught = problems.length > 0;
    console.log(`  ${caught ? 'refused' : 'ACCEPTED'}  ${name}` +
                (caught ? `  — ${problems[0]}` : ''));
    if (!caught) bad += 1;
  }
  problems.length = 0;
  return bad;
}

/* ---- main ------------------------------------------------------------------ */

const cards = read('visual/assets/scenario_cards.json');
const w = world();

if (process.argv.includes('--selftest')) {
  console.log(`check_cards.js self-test: ${MUTATIONS.length} deliberately broken card sets\n`);
  const bad = selftest(cards, w);
  if (bad) { console.error(`\n${bad} mutation(s) were accepted. The checks do not have teeth.`); process.exit(1); }
  console.log('\nAll mutations refused. The checks are load-bearing.');
  process.exit(0);
}

check(cards, w);

const total = cards.cards.length;
const live = cards.cards.filter((c) => c.operational).length;
if (problems.length) {
  console.error(`check_cards.js: ${problems.length} problem(s)\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
const named = cards.cards.filter((c) => c.non_ai_equivalent_zh && c.non_ai_equivalent_en).length;
const permanent = cards.cards.filter((c) => c.non_ai_equivalent_permanent === true).length;
console.log(`check_cards.js: ${total} cards, every benchmark and anchor resolves, ` +
            `every exit quantity is defined.`);
console.log(`  non-AI equivalent named on ${named}/${total} cards, ${permanent} of them permanent ` +
            `(every F1 card and no other): the stop rule is only as good as the path it falls back to.`);
console.log(`  operational now: ${live}/${total}. The remaining ${total - live} are blocked on ` +
            `tolerances that are set in the assembly at BM-1, not here — the package says so in a ` +
            `field rather than in the word 「超限」.`);
