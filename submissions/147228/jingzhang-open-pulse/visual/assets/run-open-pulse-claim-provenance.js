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
if (!Array.isArray(register.records) || register.records.length !== 9) fail(`records=${register.records?.length}`);

for (const record of register.records || []) {
  const value = readJsonPointer(record.raw_value_path);
  if (value !== record.raw_value) fail(`${record.claim_id}: raw value ${value} != ${record.raw_value}`);
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
}

if (failures.length) {
  console.error(JSON.stringify({ status: 'FAIL', failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'PASS',
  records_checked: register.records.length,
  boundary: register.boundary_en,
  checked: ['raw_value_path', 'source_files', 'figure_files', 'bilingual proposal tokens', 'bilingual report metric markers']
}, null, 2));
