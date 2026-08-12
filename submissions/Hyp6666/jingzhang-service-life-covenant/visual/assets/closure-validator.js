#!/usr/bin/env node
'use strict';

const crypto = require('crypto');

const STATES = Object.freeze([
  'L0_CANDIDATE', 'L1_CONTRACTED', 'L2_COMMISSIONING', 'L3_IN_SERVICE',
  'L4_MAINTENANCE_DUE', 'L5_INCIDENT_REPAIR', 'L6_UPGRADE_RECERTIFY', 'L7_RETIRED'
]);
const STATE_SET = new Set(STATES);
const ALLOWED_STATE_GRAPH = Object.freeze({
  L0_CANDIDATE: Object.freeze(['L1_CONTRACTED']),
  L1_CONTRACTED: Object.freeze(['L2_COMMISSIONING']),
  L2_COMMISSIONING: Object.freeze(['L3_IN_SERVICE']),
  L3_IN_SERVICE: Object.freeze(['L4_MAINTENANCE_DUE', 'L5_INCIDENT_REPAIR']),
  L4_MAINTENANCE_DUE: Object.freeze(['L5_INCIDENT_REPAIR']),
  L5_INCIDENT_REPAIR: Object.freeze(['L6_UPGRADE_RECERTIFY']),
  L6_UPGRADE_RECERTIFY: Object.freeze(['L3_IN_SERVICE', 'L7_RETIRED']),
  L7_RETIRED: Object.freeze([])
});
const REQUIRED_LEDGERS = Object.freeze(['service', 'labor', 'material_resource', 'public_value']);
const REQUIRED_ESCROW_CONDITIONS = Object.freeze([
  'maintenance_receipt', 'fallback', 'data_clearing', 'material_destination', 'four_ledger_closing'
]);
const GENESIS_HASH = '0'.repeat(64);

function canonical(value) {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  if (value && typeof value === 'object') {
    return '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}';
  }
  return JSON.stringify(value);
}
function sha256(value) {
  const text = typeof value === 'string' ? value : canonical(value);
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}
function withoutRecordHash(record) {
  const copy = {};
  for (const [key, value] of Object.entries(record || {})) if (key !== 'record_hash') copy[key] = value;
  return copy;
}
function addCode(codes, code) { if (!codes.includes(code)) codes.push(code); }
function disclosureValid(d) {
  return !!d && d.synthetic === true && d.executed === true && d.field_validated === false && d.official_site_connected === false;
}
function transitionCodes(from, to) {
  const codes = [];
  if (to === 'DELETE' || from === 'DELETE') addCode(codes, 'DELETE_PATH_FORBIDDEN');
  if (!STATE_SET.has(from) || !STATE_SET.has(to)) {
    addCode(codes, 'UNKNOWN_STATE');
    return codes;
  }
  if (!(ALLOWED_STATE_GRAPH[from] || []).includes(to)) {
    if (from === 'L1_CONTRACTED' && to === 'L3_IN_SERVICE') addCode(codes, 'SKIPPED_COMMISSIONING');
    else if (from === 'L5_INCIDENT_REPAIR' && to === 'L3_IN_SERVICE') addCode(codes, 'SKIPPED_RECERTIFICATION');
    else if (from === 'L7_RETIRED') addCode(codes, 'L7_ASSET_REVIVAL_FORBIDDEN');
    else addCode(codes, 'INVALID_STATE_TRANSITION');
  }
  return codes;
}
function validateJournal(journal) {
  const codes = [];
  if (!Array.isArray(journal) || journal.length < 2) return ['JOURNAL_MISSING'];
  let previous = GENESIS_HASH;
  for (let i = 0; i < journal.length; i += 1) {
    const event = journal[i] || {};
    if (event.sequence !== i + 1) addCode(codes, 'JOURNAL_SEQUENCE_BROKEN');
    if (event.previous_hash !== previous) addCode(codes, 'JOURNAL_PREVIOUS_HASH_BROKEN');
    const computed = sha256(withoutRecordHash(event));
    if (event.record_hash !== computed) addCode(codes, 'JOURNAL_HASH_MISMATCH');
    if (i === 0) {
      if (event.from_state !== null || event.to_state !== 'L0_CANDIDATE') addCode(codes, 'JOURNAL_MUST_BEGIN_L0');
    } else {
      const prior = journal[i - 1] || {};
      if (event.from_state !== prior.to_state) addCode(codes, 'JOURNAL_STATE_DISCONTINUITY');
      for (const code of transitionCodes(event.from_state, event.to_state)) addCode(codes, code);
    }
    previous = event.record_hash;
  }
  return codes;
}
function computeLedger(name, ledger) {
  const codes = [];
  if (!ledger || ledger.ledger_name !== name || !ledger.unit || !Array.isArray(ledger.transactions) || ledger.transactions.length < 2) {
    return { codes: ['LEDGER_STRUCTURE_INVALID'], debit: null, credit: null, closing: null, closed: false };
  }
  let debit = 0;
  let credit = 0;
  const ids = new Set();
  for (const tx of ledger.transactions) {
    if (!tx.transaction_id || ids.has(tx.transaction_id)) addCode(codes, 'LEDGER_TRANSACTION_ID_INVALID');
    ids.add(tx.transaction_id);
    if (!tx.logical_time || !tx.debit_party_role || !tx.credit_party_role || !tx.signed_by_role) addCode(codes, 'LEDGER_PARTY_OR_SIGNOFF_MISSING');
    if (!/^[0-9a-f]{64}$/.test(tx.evidence_hash || '')) addCode(codes, 'LEDGER_EVIDENCE_HASH_INVALID');
    if (!Number.isFinite(tx.debit) || !Number.isFinite(tx.credit) || tx.debit < 0 || tx.credit < 0) addCode(codes, 'LEDGER_AMOUNT_INVALID');
    debit += Number(tx.debit || 0);
    credit += Number(tx.credit || 0);
  }
  const closing = debit - credit;
  if (closing !== 0) addCode(codes, 'LEDGER_NOT_CLOSED');
  if (!ledger.sign_off_rule || ledger.sign_off_rule !== 'two-role evidence-backed close') addCode(codes, 'LEDGER_SIGNOFF_RULE_INVALID');
  return { codes, debit, credit, closing, closed: codes.length === 0 };
}
function computeEscrow(asset, ledgerClosing) {
  const codes = [];
  const escrow = asset.escrow || {};
  if (!escrow.custodian_role) addCode(codes, 'ESCROW_CUSTODIAN_MISSING');
  if (!escrow.authorization_id) addCode(codes, 'ESCROW_AUTHORIZATION_MISSING');
  if (escrow.unit !== 'synthetic_reserve_unit') addCode(codes, 'ESCROW_UNIT_INVALID');
  if (escrow.currency !== null || escrow.legal_structure !== null) addCode(codes, 'ESCROW_LEGAL_OR_CURRENCY_OVERCLAIM');
  const conditions = escrow.conditions || {};
  const missing = [];
  for (const id of REQUIRED_ESCROW_CONDITIONS) {
    const condition = conditions[id];
    if (!condition || condition.satisfied !== true || !condition.evidence_ref) missing.push(id);
  }
  if (missing.length) addCode(codes, 'ESCROW_CONDITION_MISSING');
  if (!REQUIRED_LEDGERS.every(name => ledgerClosing[name] && ledgerClosing[name].closed)) addCode(codes, 'ESCROW_LEDGER_CLOSING_FAILED');
  const txs = Array.isArray(escrow.transactions) ? escrow.transactions : [];
  let contributions = 0;
  let releases = 0;
  for (const tx of txs) {
    if (!tx.transaction_id || !tx.logical_time || !tx.authorization_id || !/^[0-9a-f]{64}$/.test(tx.evidence_hash || '')) addCode(codes, 'ESCROW_TRANSACTION_INVALID');
    if (tx.type === 'contribution') contributions += Number(tx.amount || 0);
    else if (tx.type === 'release') releases += Number(tx.amount || 0);
    else addCode(codes, 'ESCROW_TRANSACTION_INVALID');
  }
  const opening = Number(escrow.opening);
  const closing = opening + contributions - releases;
  if (!Number.isFinite(closing)) addCode(codes, 'ESCROW_BALANCE_INVALID');
  const released = codes.length === 0 && missing.length === 0;
  if (!released) addCode(codes, 'ESCROW_RELEASE_LOCKED');
  return { codes, opening, contributions, releases, closing, released, missing_conditions: missing };
}
function validateAsset(asset) {
  const codes = [];
  if (!asset || !asset.asset_id) return { accepted: false, codes: ['ASSET_ID_MISSING'], derived: {} };
  if (!disclosureValid(asset.disclosure)) addCode(codes, 'SYNTHETIC_DISCLOSURE_INVALID');
  const join = asset.spatial_join || {};
  if (!join.key_area_id || (!join.geometry_ref && !join.concept_feature)) addCode(codes, 'GEOMETRY_OR_ZONE_JOIN_MISSING');
  const debt = asset.maintenance_debt || {};
  if (!debt.node_id || !debt.service_gap_record_id || !Number.isFinite(debt.score)) addCode(codes, 'MAINTENANCE_DEBT_INPUT_MISSING');
  const intervention = asset.intervention || {};
  if (!intervention.intervention_id || !intervention.phase || !intervention.authorization_id || intervention.selected_from_debt_node_id !== debt.node_id) {
    addCode(codes, 'DEBT_AUTHORIZATION_SELECTION_INVALID');
  }
  const transition = asset.transition || {};
  for (const code of transitionCodes(transition.from, transition.to)) addCode(codes, code);
  for (const code of validateJournal(asset.event_journal)) addCode(codes, code);
  if (Array.isArray(asset.event_journal) && asset.event_journal.length) {
    const last = asset.event_journal[asset.event_journal.length - 1];
    if (last.from_state !== transition.from || last.to_state !== transition.to) addCode(codes, 'TRANSITION_JOURNAL_MISMATCH');
  }
  const receipt = asset.receipt || {};
  if (!receipt.receipt_id || receipt.asset_id !== asset.asset_id || receipt.intervention_id !== intervention.intervention_id || receipt.decision !== 'accepted') addCode(codes, 'MAINTENANCE_RECEIPT_INVALID');
  const fallback = asset.fallback || {};
  if (!fallback.fallback_id || !fallback.human_authority || !fallback.nondigital_mode) addCode(codes, 'FALLBACK_INVALID');
  const disposition = asset.disposition || {};
  if (!disposition.data_clearing_receipt || !disposition.material_destination) addCode(codes, 'DISPOSITION_INVALID');
  const ledgerClosing = {};
  for (const name of REQUIRED_LEDGERS) {
    ledgerClosing[name] = computeLedger(name, (asset.ledgers || {})[name]);
    for (const code of ledgerClosing[name].codes) addCode(codes, `${name.toUpperCase()}_${code}`);
  }
  const escrow = computeEscrow(asset, ledgerClosing);
  for (const code of escrow.codes) addCode(codes, code);
  return {
    accepted: codes.length === 0,
    codes,
    derived: {
      debt_score: debt.score,
      selected_intervention: intervention.intervention_id || null,
      ledger_closing: Object.fromEntries(REQUIRED_LEDGERS.map(name => [name, {
        unit: (asset.ledgers && asset.ledgers[name] && asset.ledgers[name].unit) || null,
        debit: ledgerClosing[name].debit,
        credit: ledgerClosing[name].credit,
        closing: ledgerClosing[name].closing,
        closed: ledgerClosing[name].closed
      }])),
      escrow
    }
  };
}

module.exports = {
  STATES, ALLOWED_STATE_GRAPH, REQUIRED_LEDGERS, REQUIRED_ESCROW_CONDITIONS,
  GENESIS_HASH, canonical, sha256, validateJournal, computeLedger, computeEscrow, validateAsset
};
