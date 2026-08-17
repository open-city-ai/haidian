#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const OUTPUT = path.join(__dirname, 'site-context-osm.json');
const ENDPOINT = process.env.OVERPASS_ENDPOINT || 'https://overpass-api.de/api/interpreter';
const CORRIDOR = [39.937, 116.332, 40.029, 116.363];
const WINDOWS = [
  [40.006, 116.340, 40.027, 116.357],
  [39.981, 116.339, 39.996, 116.357],
  [39.941, 116.339, 39.953, 116.358],
];

const box = (value) => value.join(',');
const query = `[out:json][timeout:180];
(
  way["highway"](${box(CORRIDOR)});
  way["railway"](${box(CORRIDOR)});
  way["waterway"](${box(CORRIDOR)});
  way["natural"="water"](${box(CORRIDOR)});
  way["leisure"="park"](${box(CORRIDOR)});
  ${WINDOWS.map((item) => `way["building"](${box(item)});`).join('\n  ')}
);
out tags geom;`;

const retainedTags = new Set([
  'name', 'name:zh', 'highway', 'railway', 'building', 'leisure', 'natural',
  'waterway', 'bridge', 'tunnel', 'layer', 'access', 'foot', 'bicycle', 'service',
]);

function featureClass(tags) {
  if (tags.building) return 'building';
  if (tags.highway) return 'highway';
  if (tags.railway) return 'railway';
  if (tags.waterway) return 'waterway';
  if (tags.leisure === 'park') return 'park';
  if (tags.natural === 'water') return 'water';
  return 'other';
}

function normalize(element) {
  const tags = Object.fromEntries(
    Object.entries(element.tags || {}).filter(([key]) => retainedTags.has(key)),
  );
  return {
    type: element.type,
    id: element.id,
    class: featureClass(tags),
    tags,
    coordinates: (element.geometry || []).map(({ lon, lat }) => [
      Number(lon.toFixed(7)),
      Number(lat.toFixed(7)),
    ]),
  };
}

async function main() {
  const inputIndex = process.argv.indexOf('--input');
  let raw;
  if (inputIndex >= 0) {
    const inputPath = process.argv[inputIndex + 1];
    if (!inputPath) throw new Error('--input requires an Overpass JSON path');
    raw = JSON.parse(fs.readFileSync(path.resolve(inputPath), 'utf8'));
  } else {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: new URLSearchParams({ data: query }),
    });
    if (!response.ok) throw new Error(`Overpass HTTP ${response.status}`);
    raw = await response.json();
  }
  const features = (raw.elements || [])
    .map(normalize)
    .filter((item) => item.coordinates.length > 1 && item.class !== 'other')
    .sort((a, b) => a.class.localeCompare(b.class) || a.id - b.id);

  const output = {
    schema_version: '1.0',
    dataset_role: 'public_observational_context_not_official_planning_data',
    source: {
      title: 'OpenStreetMap contributors via Overpass API',
      url: 'https://www.openstreetmap.org/',
      endpoint: ENDPOINT,
      license: 'ODbL 1.0',
      attribution: '© OpenStreetMap contributors',
      osm_base_timestamp: raw.osm3s && raw.osm3s.timestamp_osm_base,
      fetched_at_utc: new Date().toISOString(),
    },
    query: {
      corridor_bbox_south_west_north_east: CORRIDOR,
      building_windows_south_west_north_east: WINDOWS,
      overpass_ql: query,
    },
    limitations: [
      'OSM is a public volunteered map and may be incomplete or stale.',
      'Mapped features are observational context, not official redlines, ownership, engineering survey, accessibility certification, or implementation approval.',
      'Building counts describe mapped footprints whose centroid falls inside each provisional key-area box; they do not describe legal parcels or floor area.',
    ],
    features,
  };
  const payload = zlib.gzipSync(Buffer.from(JSON.stringify(output)), { level: 9 }).toString('base64');
  fs.writeFileSync(OUTPUT, `${JSON.stringify({ schema_version: '1.0', encoding: 'gzip+base64', payload })}\n`);
  console.log(`wrote ${path.relative(process.cwd(), OUTPUT)} (${features.length} features)`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
