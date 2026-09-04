#!/usr/bin/env node
/*
 * Remove the remaining Chinese role-class labels from the English Figure 12.
 * The overlay is confined to the metadata footer inside each existing card;
 * it does not alter the spatial sketch, action sequence, geometry references,
 * metrics, or claim boundary.
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function findBundledNodeModules() {
  return String(process.env.PATH || '')
    .split(path.delimiter)
    .map((entry) => path.resolve(entry, '..', '..', 'node', 'node_modules'))
    .find((candidate) => candidate.includes(`${path.sep}codex-runtimes${path.sep}`) && fs.existsSync(candidate));
}

function loadSharp() {
  try {
    return require('sharp');
  } catch (initialError) {
    const bundled = findBundledNodeModules();
    if (!bundled) throw initialError;

    const bundledNode = path.resolve(bundled, '..', 'bin', 'node');
    const currentNode = fs.realpathSync(process.execPath);
    const resolvedBundledNode = fs.existsSync(bundledNode) ? fs.realpathSync(bundledNode) : '';
    if (
      resolvedBundledNode
      && currentNode !== resolvedBundledNode
      && process.env.HUMAN_CITY_BUNDLED_NODE !== '1'
    ) {
      const result = spawnSync(resolvedBundledNode, [__filename, ...process.argv.slice(2)], {
        stdio: 'inherit',
        env: { ...process.env, HUMAN_CITY_BUNDLED_NODE: '1' },
      });
      if (result.error) throw result.error;
      process.exit(result.status === null ? 1 : result.status);
    }

    process.env.NODE_PATH = [bundled, process.env.NODE_PATH].filter(Boolean).join(path.delimiter);
    require('module').Module._initPaths();
    return require('sharp');
  }
}

const sharp = loadSharp();

const packageRoot = path.resolve(__dirname, '../..');
const target = path.join(packageRoot, 'assets', 'figures', 'spatial-action-atlas.en.png');
const temp = `${target}.tmp.png`;

const cards = [
  {
    x: 96,
    width: 706,
    color: '#4C78FF',
    spatial: ['Spatial refs: PROV-KEY-001 · SC-B02 · SC-C03', 'ROAD-B-SILICON · GREEN-C-SPONGE'],
    roles: 'Role classes: transport / energy / hydrology / safety / public observation',
  },
  {
    x: 833,
    width: 733,
    color: '#EB5B73',
    spatial: ['Spatial refs: PROV-KEY-002 · SC-A02 · SC-A03', 'ROAD-A-SKILL · PUBLIC-A-INCLUSION'],
    roles: 'Role classes: community / employment / accessibility / data responsibility',
  },
  {
    x: 1598,
    width: 732,
    color: '#18A287',
    spatial: ['Spatial refs: PROV-KEY-003 · SC-C01 · SC-C04 · SC-D03', 'BLDG-C-01 · BLDG-D-01/02'],
    roles: 'Role classes: data / energy / OPC / multilingual service',
  },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const overlay = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1500">',
  '<style>.meta{font:18px Arial,Helvetica,sans-serif;fill:#6E8099}.role{font:18px Arial,Helvetica,sans-serif;fill:#425B7A}</style>',
];
for (const card of cards) {
  overlay.push(`<rect x="${card.x}" y="1180" width="${card.width}" height="142" fill="#FFFFFF"/>`);
  overlay.push(`<rect x="${card.x}" y="1180" width="5" height="142" fill="${card.color}" opacity="0.08"/>`);
  overlay.push(`<text x="${card.x + 3}" y="1212" class="meta">${escapeXml(card.spatial[0])}</text>`);
  overlay.push(`<text x="${card.x + 3}" y="1240" class="meta">${escapeXml(card.spatial[1])}</text>`);
  overlay.push(`<text x="${card.x + 3}" y="1292" class="role">${escapeXml(card.roles)}</text>`);
}
overlay.push('</svg>');

sharp(target)
  .composite([{ input: Buffer.from(overlay.join('\n')) }])
  .png({ compressionLevel: 9, adaptiveFiltering: false })
  .toFile(temp)
  .then(() => {
    fs.renameSync(temp, target);
    process.stdout.write(`${JSON.stringify({ ok: true, target: path.relative(packageRoot, target), corrected_cards: cards.length }, null, 2)}\n`);
  })
  .catch((error) => {
    try { fs.unlinkSync(temp); } catch (_) {}
    console.error(error);
    process.exit(1);
  });
