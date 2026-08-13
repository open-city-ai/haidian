#!/usr/bin/env node
/* RENLINE Switchback Protocol offline validator 折返协议离线校验器
 *
 * Zero external dependencies (Node built-ins only). Implements the card
 * contract rules R1-R4 documented in switchback-protocol.schema.json and
 * cross-checks every geojson_ref anchor against the package geometry.
 *
 * Usage:  node visual/assets/run-switchback-validation.js
 * (run from the submission package root: submissions/chucky1102/jingzhang-renline)
 *
 * IMPORTANT BOUNDARY 边界声明:
 * PASS certifies protocol logic and file self-consistency ONLY. It is NOT
 * field performance, NOT an approval, NOT a government commitment.
 * 校验通过只证明协议逻辑与文件自洽,不证明现场成效、批准或任何政府承诺。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = process.cwd();
const PROTOCOL = 'visual/assets/switchback-protocol.json';
const SCHEMA = 'visual/assets/switchback-protocol.schema.json';
const FIXTURE_DIR = 'visual/assets/fixtures';
const RECEIPT = 'visual/assets/switchback-validation-receipt.json';

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

const CARD_REQUIRED = ['id', 'name_zh', 'name_en', 'type', 'status', 'anchor', 'anchor_type',
  'takeover_max_minutes', 'fallback', 'data_boundary', 'human_review', 'ascent_grade', 'evidence_status'];
const STATUS_ENUM = ['green', 'yellow', 'red', 'green_candidate'];
const ANCHOR_TYPES = ['geojson_ref', 'text_only'];
const TAKEOVER_STATUS = ['not_applicable', 'unknown'];
const EVIDENCE = ['known', 'design_target', 'unknown', 'blocked'];

function geometryIds(file) {
  const g = JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
  return new Set((g.features || []).map(f => (f.properties || {}).id).filter(Boolean));
}

const geomCache = {};
function anchorResolves(ref) {
  const [file, fid] = ref.split('#');
  if (!file || !fid) return false;
  if (!fs.existsSync(path.join(ROOT, file))) return false;
  if (!geomCache[file]) geomCache[file] = geometryIds(file);
  return geomCache[file].has(fid);
}

/* Validate one card. Returns a list of violations, each tagged with a rule id. */
function validateCard(card) {
  const errs = [];
  for (const k of CARD_REQUIRED) {
    if (!(k in card)) errs.push(`R0 missing required field: ${k}`);
  }
  if (errs.length) return errs;
  if (!/^[A-Z]+[0-9]+$/.test(card.id)) errs.push('R0 id pattern');
  if (!STATUS_ENUM.includes(card.status)) errs.push(`R0 status not in enum: ${card.status}`);
  if (!ANCHOR_TYPES.includes(card.anchor_type)) errs.push(`R0 anchor_type not in enum: ${card.anchor_type}`);
  if (!EVIDENCE.includes(card.evidence_status)) errs.push(`R0 evidence_status not in enum: ${card.evidence_status}`);
  if (!/^G[0-5]$/.test(card.ascent_grade)) errs.push('R0 ascent_grade pattern');
  for (const k of ['fallback', 'data_boundary', 'human_review']) {
    if (typeof card[k] !== 'string' || card[k].length < 8) errs.push(`R0 ${k} too short`);
  }
  // R1: yellow => numeric takeover ceiling + gate
  if (card.status === 'yellow') {
    if (typeof card.takeover_max_minutes !== 'number') errs.push('R1 yellow card requires a numeric takeover_max_minutes');
    if (!card.gate) errs.push('R1 yellow card requires a verification gate');
  }
  // R2: null takeover => takeover_status
  if (card.takeover_max_minutes === null && !TAKEOVER_STATUS.includes(card.takeover_status)) {
    errs.push('R2 null takeover_max_minutes requires takeover_status (not_applicable | unknown)');
  }
  // R3: geojson_ref => anchor_ref present and resolvable
  if (card.anchor_type === 'geojson_ref') {
    if (!card.anchor_ref) errs.push('R3 geojson_ref anchor requires anchor_ref');
    else if (!/^geometry\/[a-z_]+\.geojson#[A-Za-z0-9_-]+$/.test(card.anchor_ref)) errs.push('R3 anchor_ref pattern');
    else if (!anchorResolves(card.anchor_ref)) errs.push(`R3 anchor_ref does not resolve: ${card.anchor_ref}`);
  }
  // R4: paper evidence must not impersonate field grades
  if (card.evidence_status === 'design_target' && !/^G[0-2]$/.test(card.ascent_grade)) {
    errs.push('R4 design_target evidence must not claim ascent grade above G2');
  }
  return errs;
}

function validateProtocolFile(p) {
  const errs = [];
  const doc = JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
  for (const k of ['schema_version', 'protocol', 'license', 'status_enum', 'belt_wide_defaults', 'roles_model', 'cards', 'field_semantics', 'migration']) {
    if (!(k in doc)) errs.push(`top-level missing: ${k}`);
  }
  if (errs.length) return { errs, cards: 0 };
  if (doc.schema_version !== '0.2.0') errs.push('schema_version must be 0.2.0');
  const lic = doc.license || {};
  if (lic.spdx_id !== 'CC-BY-4.0' || lic.scope !== 'protocol_spec_only' || lic.attribution_required !== true) {
    errs.push('license block must declare CC-BY-4.0 / protocol_spec_only / attribution_required');
  }
  for (const k of STATUS_ENUM) if (!(k in doc.status_enum)) errs.push(`status_enum missing: ${k}`);
  const ids = new Set();
  for (const card of doc.cards) {
    for (const e of validateCard(card)) errs.push(`card ${card.id || '?'}: ${e}`);
    if (ids.has(card.id)) errs.push(`duplicate card id: ${card.id}`);
    ids.add(card.id);
  }
  return { errs, cards: doc.cards.length };
}

function main() {
  const results = { protocol: null, fixtures: [] };
  let failed = false;

  const { errs, cards } = validateProtocolFile(PROTOCOL);
  results.protocol = { file: PROTOCOL, cards, errors: errs, result: errs.length ? 'FAIL' : 'PASS' };
  if (errs.length) failed = true;

  for (const f of fs.readdirSync(path.join(ROOT, FIXTURE_DIR)).filter(f => f.endsWith('.json')).sort()) {
    const fixture = JSON.parse(fs.readFileSync(path.join(ROOT, FIXTURE_DIR, f), 'utf8'));
    const cardErrs = validateCard(fixture.card);
    let outcome, ok;
    if (fixture.expect_reject) {
      const hitExpectedRule = cardErrs.some(e => e.startsWith(fixture.expect_reject));
      ok = cardErrs.length > 0 && hitExpectedRule;
      outcome = ok ? `REJECTED as expected (${fixture.expect_reject})` : `NOT REJECTED CORRECTLY (errors: ${cardErrs.join('; ') || 'none'})`;
    } else {
      ok = cardErrs.length === 0;
      outcome = ok ? 'PASSED as expected' : `UNEXPECTED ERRORS: ${cardErrs.join('; ')}`;
    }
    if (!ok) failed = true;
    results.fixtures.push({ file: `${FIXTURE_DIR}/${f}`, expect: fixture.expect_reject || 'pass', outcome, ok });
  }

  const receipt = {
    validator: 'run-switchback-validation.js',
    contract: 'switchback-protocol.schema.json (rules R0-R4)',
    result: failed ? 'FAIL' : 'PASS',
    boundary_zh: '校验通过只证明协议逻辑与文件自洽,不证明现场成效、批准或任何政府承诺。',
    boundary_en: 'PASS certifies protocol logic and file self-consistency only — not field performance, approval or government commitment.',
    inputs: {
      [PROTOCOL]: sha256(path.join(ROOT, PROTOCOL)),
      [SCHEMA]: sha256(path.join(ROOT, SCHEMA))
    },
    protocol: results.protocol,
    fixtures: results.fixtures
  };
  fs.writeFileSync(path.join(ROOT, RECEIPT), JSON.stringify(receipt, null, 2) + '\n');

  console.log(`protocol file: ${results.protocol.result} (${cards} cards)`);
  for (const fx of results.fixtures) console.log(`fixture ${path.basename(fx.file)}: ${fx.outcome}`);
  console.log(`overall: ${receipt.result}`);
  console.log('receipt written to', RECEIPT);
  console.log('NOTE: PASS certifies protocol logic only — not field performance.');
  process.exit(failed ? 1 : 0);
}

main();
