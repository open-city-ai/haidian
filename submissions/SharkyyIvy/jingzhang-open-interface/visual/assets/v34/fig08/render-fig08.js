const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawnSync } = require('child_process');

const sourceDir = __dirname;
const submissionDir = path.resolve(sourceDir, '..', '..', '..', '..');
const figuresDir = path.join(submissionDir, 'assets', 'figures');
const renderer = path.join(sourceDir, 'fig08-threshold-field.svg');
const edgeCandidates = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const edge = edgeCandidates.find(fs.existsSync);

if (!edge) throw new Error('Microsoft Edge is required to render canonical FIG-08.');
if (!fs.existsSync(renderer)) throw new Error(`Canonical FIG-08 renderer is missing: ${renderer}`);

function sleep(milliseconds) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}

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
  if (stableSamples < 3) throw new Error(`Timed out waiting for FIG-08 render: ${file}`);
}

function assertPngDimensions(file) {
  const png = fs.readFileSync(file);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (!png.subarray(0, 8).equals(signature)) throw new Error(`Not a PNG: ${file}`);
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  if (width !== 2400 || height !== 1500) throw new Error(`FIG-08 must be 2400x1500; got ${width}x${height}.`);
}

function renderLocale(language, outputName) {
  const output = path.join(figuresDir, outputName);
  fs.rmSync(output, { force: true });
  const uri = `${pathToFileURL(renderer).href}?lang=${language}`;
  const result = spawnSync(edge, [
    '--headless', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--window-size=2400,1500', `--screenshot=${output}`, uri,
  ], { stdio: 'inherit', windowsHide: true, timeout: 30000 });
  if (result.error && result.error.code !== 'ETIMEDOUT') throw result.error;
  waitForStableFile(output);
  assertPngDimensions(output);
  return output;
}

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

const zhOutput = renderLocale('zh', 'fig-08.png');
const enOutput = renderLocale('en', 'fig-08.en.png');
const zhAliases = ['fig-08.zh.png'];
const enAliases = ['fig-08.zh.en.png'];
zhAliases.forEach(name => fs.copyFileSync(zhOutput, path.join(figuresDir, name)));
enAliases.forEach(name => fs.copyFileSync(enOutput, path.join(figuresDir, name)));

const zhHash = sha256(zhOutput);
const enHash = sha256(enOutput);
if (zhHash === enHash) throw new Error('Canonical FIG-08 ZH and EN renders must be genuinely localized.');

console.log(JSON.stringify({
  renderer,
  width: 2400,
  height: 1500,
  zh: { sha256: zhHash, outputs: ['fig-08.png', ...zhAliases] },
  en: { sha256: enHash, outputs: ['fig-08.en.png', ...enAliases] },
}, null, 2));
