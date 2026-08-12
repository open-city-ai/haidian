#!/usr/bin/env node
/* Verify that visible numeric claims return to package values and evidence. */

const fs = require('fs');
const path = require('path');

const assetsDir = __dirname;
const packageRoot = path.resolve(assetsDir, '../..');
const registerPath = path.join(assetsDir, 'claim-provenance.json');
const register = JSON.parse(fs.readFileSync(registerPath, 'utf8'));
const metrics = JSON.parse(fs.readFileSync(path.join(packageRoot, 'metrics.json'), 'utf8'));
const proposalZh = fs.readFileSync(path.join(packageRoot, 'proposal.md'), 'utf8');
const proposalEn = fs.readFileSync(path.join(packageRoot, 'proposal.en.md'), 'utf8');
const reportZh = fs.readFileSync(path.join(packageRoot, 'report/proposal.html'), 'utf8');
const reportEn = fs.readFileSync(path.join(packageRoot, 'report/proposal.en.html'), 'utf8');
const failures = [];

function fail(message) {
  failures.push(message);
}

function readJsonPointer(pointer) {
  const hash = pointer.indexOf('#');
  if (hash < 0) return undefined;
  const file = pointer.slice(0, hash);
  const tokens = pointer.slice(hash + 1).split('/').filter(Boolean).map((token) => token.replaceAll('~1', '/').replaceAll('~0', '~'));
  const root = file === 'metrics.json' ? metrics : JSON.parse(fs.readFileSync(path.join(packageRoot, file), 'utf8'));
  return tokens.reduce((value, token) => (value === undefined ? undefined : value[token]), root);
}

if (register.schema_version !== '0.1.0') fail(`schema_version=${register.schema_version}`);
if (register.status !== 'audit_contract') fail(`status=${register.status}`);
if (!Array.isArray(register.records) || register.records.length < 1) fail(`records=${register.records?.length}`);
if (register.record_count !== register.records.length) fail(`record_count=${register.record_count}, records=${register.records.length}`);

function metricTokens(text) {
  return [...text.matchAll(/\[metric:([^\]]+)\]/g)].map((match) => match[1]);
}

const zhTokens = new Set(metricTokens(proposalZh));
const enTokens = new Set(metricTokens(proposalEn));
const bilingualVisibleTokens = [...zhTokens].filter((token) => enTokens.has(token)).sort();
const registeredTokens = [...new Set((register.records || []).map((record) => record.claim_id))].sort();
if (JSON.stringify(bilingualVisibleTokens) !== JSON.stringify(registeredTokens)) {
  fail(`bilingual visible tokens=${bilingualVisibleTokens.join(',')} registered=${registeredTokens.join(',')}`);
}
if (registeredTokens.length !== register.records.length) fail('claim_id values must be unique');

for (const record of register.records || []) {
  const value = readJsonPointer(record.raw_value_path);
  if (value !== record.raw_value) fail(`${record.claim_id}: raw value ${value} != ${record.raw_value}`);
  const status = readJsonPointer(record.status_path);
  if (status !== record.expected_status) fail(`${record.claim_id}: status ${status} != ${record.expected_status}`);
  for (const rel of record.source_files || []) {
    if (!fs.existsSync(path.join(packageRoot, rel))) fail(`${record.claim_id}: missing source ${rel}`);
  }
  for (const rel of record.figure_files || []) {
    if (!fs.existsSync(path.join(packageRoot, rel))) fail(`${record.claim_id}: missing figure ${rel}`);
    const reportPath = rel.replace(/^assets\//, '../assets/');
    const report = rel.includes('.en.') ? reportEn : reportZh;
    if (!report.includes(reportPath)) fail(`${record.claim_id}: report missing ${reportPath}`);
  }
  if (!proposalZh.includes(record.proposal_token)) fail(`${record.claim_id}: zh proposal token missing`);
  if (!proposalEn.includes(record.proposal_token)) fail(`${record.claim_id}: en proposal token missing`);
  if (!reportZh.includes(`data-evidence-value="${record.claim_id}"`)) fail(`${record.claim_id}: zh report metric marker missing`);
  if (!reportEn.includes(`data-evidence-value="${record.claim_id}"`)) fail(`${record.claim_id}: en report metric marker missing`);
  if (record.evidence_class === 'model_output_not_field_result') {
    if (!record.boundary_zh || !record.boundary_en) fail(`${record.claim_id}: model-output boundary missing`);
    if (!(record.source_files || []).some((rel) => rel.endsWith('.json') || rel.endsWith('.js'))) {
      fail(`${record.claim_id}: model-output source runner missing`);
    }
  }
  if (record.evidence_class === 'unmeasured_unknown_baseline') {
    if (record.raw_value !== null || record.expected_status !== 'unknown') {
      fail(`${record.claim_id}: unknown baseline must remain null/unknown`);
    }
    if (!record.boundary_zh || !record.boundary_en) {
      fail(`${record.claim_id}: unknown-baseline boundary missing`);
    }
  }
}

if (failures.length) {
  console.error(JSON.stringify({ status: 'FAIL', failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'PASS',
  records_checked: register.records.length,
  unknown_baseline_records: register.records.filter((record) => record.evidence_class === 'unmeasured_unknown_baseline').length,
  boundary: register.boundary_en,
  checked: ['record count', 'bilingual visible-token coverage', 'raw value and status', 'source files', 'figure files', 'bilingual proposal tokens', 'bilingual report metric markers', 'unknown-baseline boundaries']
}, null, 2));
