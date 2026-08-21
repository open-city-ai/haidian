'use strict';

/*
 * Regression guard for the #706 forward-safe package boundary.
 * This is a local metadata check, not a legal or licence conclusion.
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const packageRoot = process.env.OPEN_PULSE_RIGHTS_ROOT
  ? path.resolve(process.env.OPEN_PULSE_RIGHTS_ROOT)
  : path.resolve(__dirname, '..', '..');
const oldPaths = [
  'visual/assets/open-pulse-relay-receipt.schema.json',
  'visual/assets/example-s02-embodied-receipt.json'
];
const retainedPaths = [
  'visual/assets/open-pulse-test-window-record.schema.json',
  'visual/assets/example-s02-embodied-test-window.json'
];
const textExtensions = new Set(['.html', '.js', '.json', '.md']);
const allowedHistoricalFiles = new Set([
  'changelog.md',
  'visual/assets/test-open-pulse-rights-clean.js'
]);

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(packageRoot, relativePath), 'utf8'));
}

function sha256(relativePath) {
  return crypto.createHash('sha256')
    .update(fs.readFileSync(path.join(packageRoot, relativePath)))
    .digest('hex');
}

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

const manifest = readJson('manifest.json');
const selfCheck = readJson('self_check.json');
const ledger = readJson('visual/assets/copyright-ledger.json');
const manifestEntries = manifest.files || [];
const manifestPaths = new Set(manifestEntries.map((entry) => entry.path));
const ledgerEntries = ledger.assets || [];
const ledgerPaths = new Set(ledgerEntries.map((entry) => entry.path));
const selfCheckText = JSON.stringify(selfCheck);

for (const relativePath of oldPaths) {
  assert(!fs.existsSync(path.join(packageRoot, relativePath)), `disputed asset still exists: ${relativePath}`);
  assert(!manifestPaths.has(relativePath), `manifest still registers disputed asset: ${relativePath}`);
  assert(!ledgerPaths.has(relativePath), `copyright ledger still registers disputed asset: ${relativePath}`);
  assert(!selfCheckText.includes(relativePath), `self-check still names disputed asset: ${relativePath}`);
}

for (const relativePath of retainedPaths) {
  assert(fs.existsSync(path.join(packageRoot, relativePath)), `retained asset missing: ${relativePath}`);
  assert(manifestPaths.has(relativePath), `manifest missing retained asset: ${relativePath}`);
  assert(ledgerPaths.has(relativePath), `copyright ledger missing retained asset: ${relativePath}`);
  const manifestEntry = manifestEntries.find((entry) => entry.path === relativePath);
  const ledgerEntry = ledgerEntries.find((entry) => entry.path === relativePath);
  const digest = sha256(relativePath);
  assert(manifestEntry.sha256 === digest, `manifest hash mismatch: ${relativePath}`);
  assert(ledgerEntry.hash_sha256 === digest, `ledger hash mismatch: ${relativePath}`);
}

const schema = readJson(retainedPaths[0]);
const example = readJson(retainedPaths[1]);
assert(schema.$id === 'open-pulse-test-window-record-0.2.0', 'retained schema id changed');
assert(example.record_id === 'OPW-S02-SYNTHETIC-001', 'retained example identity changed');

function scanTextFiles(directory, relativeDirectory = '') {
  let scanned = 0;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.posix.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) {
      scanned += scanTextFiles(absolutePath, relativePath);
      continue;
    }
    if (!entry.isFile() || allowedHistoricalFiles.has(relativePath) ||
        !textExtensions.has(path.extname(relativePath))) continue;
    scanned += 1;
    const content = fs.readFileSync(absolutePath, 'utf8');
    for (const oldPath of oldPaths) {
      assert(!content.includes(oldPath), `active file reintroduces disputed reference: ${relativePath}`);
    }
  }
  return scanned;
}

const scannedTextFiles = scanTextFiles(packageRoot);
for (const entry of manifestEntries) {
  if (!textExtensions.has(path.extname(entry.path)) || allowedHistoricalFiles.has(entry.path)) continue;
  const content = fs.readFileSync(path.join(packageRoot, entry.path), 'utf8');
  for (const oldPath of oldPaths) {
    assert(!content.includes(oldPath), `active file reintroduces disputed reference: ${entry.path}`);
  }
}

console.log(JSON.stringify({
  ok: true,
  old_assets_absent: oldPaths.length,
  retained_assets_verified: retainedPaths.length,
  scanned_text_files: scannedTextFiles,
  historical_changelog_allowed: true
}));
