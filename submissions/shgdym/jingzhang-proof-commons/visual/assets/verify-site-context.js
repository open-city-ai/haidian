#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const HERE = __dirname;
const ROOT = path.resolve(HERE, '../..');
const DATA_PATH = path.join(HERE, 'site-context-osm.json');
const AREAS_PATH = path.join(ROOT, 'geometry/key_areas.geojson');
const RESULT_PATH = path.join(HERE, 'site-context-results.json');

const envelope = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const data = JSON.parse(zlib.gunzipSync(Buffer.from(envelope.payload, 'base64')).toString('utf8'));
const areas = JSON.parse(fs.readFileSync(AREAS_PATH, 'utf8'));
const walkTypes = new Set(['footway', 'path', 'pedestrian', 'steps', 'cycleway', 'living_street']);
const earthRadiusM = 6371008.8;

function inside(point, ring) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const crosses = (yi > point[1]) !== (yj > point[1]);
    if (crosses && point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

function midpoint(a, b) {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function lengthM(a, b) {
  const rad = Math.PI / 180;
  const lat1 = a[1] * rad;
  const lat2 = b[1] * rad;
  const dLat = (b[1] - a[1]) * rad;
  const dLon = (b[0] - a[0]) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * earthRadiusM * Math.asin(Math.min(1, Math.sqrt(h)));
}

function centroid(points) {
  const usable = points.length > 2 && points[0][0] === points.at(-1)[0] && points[0][1] === points.at(-1)[1]
    ? points.slice(0, -1) : points;
  return usable.reduce((acc, point) => [acc[0] + point[0] / usable.length, acc[1] + point[1] / usable.length], [0, 0]);
}

function segmentsInRing(feature, ring) {
  const output = [];
  for (let index = 1; index < feature.coordinates.length; index += 1) {
    const a = feature.coordinates[index - 1];
    const b = feature.coordinates[index];
    if (inside(midpoint(a, b), ring)) output.push([a, b]);
  }
  return output;
}

function countJunctions(highways, ring) {
  const nodes = new Map();
  for (const feature of highways) {
    for (const point of feature.coordinates) {
      if (!inside(point, ring)) continue;
      const key = `${point[0].toFixed(7)},${point[1].toFixed(7)}`;
      if (!nodes.has(key)) nodes.set(key, new Set());
      nodes.get(key).add(feature.id);
    }
  }
  return [...nodes.values()].filter((ids) => ids.size >= 2).length;
}

function areaMetrics(area) {
  const ring = area.geometry.coordinates[0];
  const buildings = data.features.filter((feature) => feature.class === 'building' && inside(centroid(feature.coordinates), ring));
  const highways = data.features.filter((feature) => feature.class === 'highway');
  const railways = data.features.filter((feature) => feature.class === 'railway');
  const parks = data.features.filter((feature) => feature.class === 'park' && inside(centroid(feature.coordinates), ring));
  const highwaySegments = highways.flatMap((feature) => segmentsInRing(feature, ring).map((segment) => ({ feature, segment })));
  const railSegments = railways.flatMap((feature) => segmentsInRing(feature, ring));
  return {
    id: area.id,
    name_zh: area.properties.name_zh,
    geometry_status: area.properties.boundary_precision,
    mapped_building_footprints: buildings.length,
    mapped_highway_length_m: Math.round(highwaySegments.reduce((sum, item) => sum + lengthM(...item.segment), 0)),
    mapped_walk_or_cycle_length_m: Math.round(highwaySegments.filter((item) => walkTypes.has(item.feature.tags.highway)).reduce((sum, item) => sum + lengthM(...item.segment), 0)),
    mapped_highway_junctions: countJunctions(highways, ring),
    mapped_railway_length_m: Math.round(railSegments.reduce((sum, item) => sum + lengthM(...item), 0)),
    mapped_park_features: parks.length,
  };
}

const byClass = {};
for (const feature of data.features) byClass[feature.class] = (byClass[feature.class] || 0) + 1;
const result = {
  schema_version: '1.0',
  ok: true,
  check_scope: 'offline_recalculation_of_shipped_osm_observational_context',
  source_timestamp: data.source.osm_base_timestamp,
  feature_count: data.features.length,
  feature_count_by_class: byClass,
  key_area_metrics: areas.features.map(areaMetrics),
  caveats: data.limitations,
  tests: [
    { id: 'source_license', pass: data.source.license === 'ODbL 1.0' },
    { id: 'source_attribution', pass: data.source.attribution === '© OpenStreetMap contributors' },
    { id: 'provisional_key_areas', pass: areas.features.every((area) => area.properties.official_boundary === false) },
    { id: 'nonempty_context', pass: data.features.length > 0 },
    { id: 'three_key_areas', pass: areas.features.length === 3 },
  ],
};
result.ok = result.tests.every((test) => test.pass);
fs.writeFileSync(RESULT_PATH, `${JSON.stringify(result, null, 2)}\n`);
console.log(`${result.tests.filter((test) => test.pass).length}/${result.tests.length} PASS`);
for (const item of result.key_area_metrics) {
  console.log(`${item.id}: buildings=${item.mapped_building_footprints}, walk/cycle=${item.mapped_walk_or_cycle_length_m}m, junctions=${item.mapped_highway_junctions}`);
}
process.exit(result.ok ? 0 : 1);
