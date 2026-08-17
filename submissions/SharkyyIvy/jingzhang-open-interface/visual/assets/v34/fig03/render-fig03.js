const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawnSync } = require('child_process');

const sourceDir = __dirname;
const submissionDir = path.resolve(sourceDir, '..', '..', '..', '..');
const figuresDir = path.join(submissionDir, 'assets', 'figures');
const source = path.join(sourceDir, 'fig03-spatial-key-areas.svg');
const edge = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
].find(fs.existsSync);

if (!edge) throw new Error('Microsoft Edge is required to render canonical FIG-03.');
if (!fs.existsSync(source)) throw new Error(`Canonical FIG-03 source is missing: ${source}`);

const sleep = milliseconds => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);

function waitForStableFile(file) {
  const deadline = Date.now() + 20000;
  let lastLength = -1;
  let stableSamples = 0;
  while (Date.now() < deadline && stableSamples < 3) {
    sleep(150);
    if (!fs.existsSync(file)) continue;
    const length = fs.statSync(file).size;
    if (length > 0 && length === lastLength) stableSamples += 1;
    else { lastLength = length; stableSamples = 0; }
  }
  if (stableSamples < 3) throw new Error(`Timed out waiting for FIG-03 render: ${file}`);
}

function assertPng(file) {
  const png = fs.readFileSync(file);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (!png.subarray(0, 8).equals(signature)) throw new Error(`Not a PNG: ${file}`);
  if (png.readUInt32BE(16) !== 2400 || png.readUInt32BE(20) !== 1500) {
    throw new Error(`Canonical FIG-03 must be 2400x1500: ${file}`);
  }
}

function render(language, outputName) {
  const output = path.join(figuresDir, outputName);
  fs.rmSync(output, { force: true });
  const result = spawnSync(edge, [
    '--headless', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--window-size=2400,1500', `--screenshot=${output}`, `${pathToFileURL(source).href}?lang=${language}`,
  ], { stdio: 'inherit', windowsHide: true, timeout: 30000 });
  if (result.error && result.error.code !== 'ETIMEDOUT') throw result.error;
  waitForStableFile(output);
  assertPng(output);
  return output;
}

const sha256 = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const zhOutput = render('zh', 'key-areas.png');
const enOutput = render('en', 'key-areas.en.png');
const zhAliases = ['fig-03.png', 'fig-03.zh.png'];
const enAliases = ['fig-03.en.png', 'fig-03.zh.en.png'];
zhAliases.forEach(name => fs.copyFileSync(zhOutput, path.join(figuresDir, name)));
enAliases.forEach(name => fs.copyFileSync(enOutput, path.join(figuresDir, name)));

const zhHash = sha256(zhOutput);
const enHash = sha256(enOutput);
if (zhHash === enHash) throw new Error('Canonical FIG-03 ZH and EN renders must be genuinely localized.');

console.log(JSON.stringify({
  source,
  width: 2400,
  height: 1500,
  zh: { sha256: zhHash, outputs: ['key-areas.png', ...zhAliases] },
  en: { sha256: enHash, outputs: ['key-areas.en.png', ...enAliases] },
}, null, 2));
