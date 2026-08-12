#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const packageRoot = path.resolve(__dirname, '../..');
const auditPath = path.join(__dirname, 'claim-audit.json');
const audit = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
const proposalZh = fs.readFileSync(path.join(packageRoot, 'proposal.md'), 'utf8');
const proposalEn = fs.readFileSync(path.join(packageRoot, 'proposal.en.md'), 'utf8');

const failures = [];
const contextWindow = 260;

function contextAround(text, needle) {
  const paragraph = text.split(/\n\s*\n/).find((block) => block.includes(needle));
  if (paragraph) return paragraph;
  const index = text.indexOf(needle);
  if (index < 0) return '';
  return text.slice(Math.max(0, index - contextWindow), Math.min(text.length, index + needle.length + contextWindow));
}

function requireTerms(text, terms, label) {
  const missing = terms.filter((term) => !text.includes(term));
  if (missing.length) failures.push(`${label}: missing terms: ${missing.join(', ')}`);
}

for (const claim of audit.headline_claims) {
  const zhContext = contextAround(proposalZh, claim.match_zh);
  const enContext = contextAround(proposalEn, claim.match_en);
  if (!zhContext) failures.push(`${claim.id}: Chinese match not found: ${claim.match_zh}`);
  if (!enContext) failures.push(`${claim.id}: English match not found: ${claim.match_en}`);
  if (zhContext) requireTerms(zhContext, claim.required_zh, `${claim.id}/zh`);
  if (enContext) requireTerms(enContext, claim.required_en, `${claim.id}/en`);
  for (const relativePath of claim.source_files) {
    if (!fs.existsSync(path.join(packageRoot, relativePath))) {
      failures.push(`${claim.id}: missing source file: ${relativePath}`);
    }
  }
}

const headingsZh = proposalZh.split('\n').filter((line) => /^#{1,6}\s/.test(line)).join('\n');
const headingsEn = proposalEn.split('\n').filter((line) => /^#{1,6}\s/.test(line)).join('\n');
for (const phrase of audit.headline_wording_guard.forbidden_headlines_zh) {
  if (headingsZh.includes(phrase)) failures.push(`forbidden Chinese headline remains: ${phrase}`);
}
for (const phrase of audit.headline_wording_guard.forbidden_headlines_en) {
  if (headingsEn.toLowerCase().includes(phrase.toLowerCase())) failures.push(`forbidden English headline remains: ${phrase}`);
}

if (!proposalZh.includes('[data:visual/assets/claim-audit.json]')) {
  failures.push('proposal.md: missing claim-audit evidence marker');
}
if (!proposalEn.includes('[data:visual/assets/claim-audit.json]')) {
  failures.push('proposal.en.md: missing claim-audit evidence marker');
}
const result = {
  schema_version: audit.schema_version,
  scope: audit.scope,
  claims_checked: audit.headline_claims.length,
  failures,
  pass: failures.length === 0,
  boundary: audit.boundary
};
console.log(JSON.stringify(result, null, 2));
if (failures.length) {
  console.error(`CLAIM_AUDIT_CHECK_FAIL: ${failures.length} failure(s)`);
  process.exit(1);
}
console.log('CLAIM_AUDIT_CHECK_PASS: disclosure labels, bilingual wording and source paths are consistent');
