/* Build the frozen, display-only OpenStreetMap context snapshot used by V3.
 * Input is a one-time Overpass JSON download; output is deliberately simplified
 * and never contributes to design metrics or statutory claims. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const temp = process.env.TEMP || process.env.TMP;
const sources = [
  ['lines', path.join(temp, 'jz-osm-lines-20260813.json')],
  ['zhongzhiyuan', path.join(temp, 'jz-osm-zhongzhiyuan-buildings-20260813.json')],
  ['ai_origin', path.join(temp, 'jz-osm-ai_origin-buildings-20260813.json')],
  ['dazhongsi', path.join(temp, 'jz-osm-dazhongsi-buildings-20260813.json')],
];
const overall = [116.337, 39.937, 116.358, 40.029];
const stationBoxes = {
  zhongzhiyuan: [116.341, 40.006, 116.356, 40.027],
  ai_origin: [116.340, 39.982, 116.355, 39.995],
  dazhongsi: [116.340, 39.942, 116.357, 39.952],
};
function simplify(points, max = 48) {
  if (points.length <= max) return points;
  const step = (points.length - 1) / (max - 1);
  return Array.from({length: max}, (_, i) => points[Math.round(i * step)]);
}
function xy(p, bbox) {
  return [
    +(((p.lon - bbox[0]) / (bbox[2] - bbox[0])) * 1000).toFixed(1),
    +(((bbox[3] - p.lat) / (bbox[3] - bbox[1])) * 1000).toFixed(1),
  ];
}
function inBox(p, b) { return p.lon >= b[0] && p.lon <= b[2] && p.lat >= b[1] && p.lat <= b[3]; }
function kind(tags = {}) {
  if (tags.building) return 'building';
  if (tags.railway) return 'rail';
  if (tags.waterway || tags.natural === 'water') return 'water';
  if (tags.leisure === 'park') return 'park';
  if (tags.highway) return ['primary','secondary','tertiary'].includes(tags.highway) ? 'road_major' : (['footway','cycleway','pedestrian','path'].includes(tags.highway) ? 'path' : 'road_local');
  return 'other';
}
function read(file) { return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')).elements || [] : []; }
const lineEls = read(sources[0][1]);
const contexts = {};
for (const [id, bbox] of Object.entries({overall, ...stationBoxes})) {
  const features = [];
  let localIndex = 0;
  for (const e of lineEls) {
    if (!e.geometry || !e.geometry.some(p => inBox(p, bbox))) continue;
    const k = kind(e.tags);
    if (k === 'other') continue;
    if ((k === 'road_local' || k === 'path') && (++localIndex % (id === 'overall' ? 12 : 5))) continue;
    features.push({id: `osm-${e.id}`, kind: k, points: simplify(e.geometry.filter(p => inBox(p, bbox)), 22).map(p => xy(p, bbox)), source_type:'open_data_context', status:'reference_only'});
  }
  if (id !== 'overall') {
    const buildingFile = sources.find(s => s[0] === id)?.[1];
    for (const e of read(buildingFile)) {
      if (!e.geometry) continue;
      const pts = e.geometry.filter(p => inBox(p, bbox));
      if (pts.length >= 3) features.push({id:`osm-${e.id}`, kind:'building', points:simplify(pts,24).map(p=>xy(p,bbox)), source_type:'open_data_context', status:'reference_only'});
    }
  }
  contexts[id] = {bbox_wgs84:bbox, drawing_viewbox:[0,0,1000,1000], features};
}
const output = {
  schema_version:'1.0.0', dataset_id:'jingzhang-open-map-context-20260813', snapshot_date:'2026-08-13',
  source:{publisher:'OpenStreetMap contributors', url:'https://www.openstreetmap.org/copyright/', attribution:'Map data © OpenStreetMap contributors', license:'ODbL 1.0'},
  coordinate_system:{source:'EPSG:4326', drawing:'normalised local SVG coordinates', note:'Display transformation only; not survey control.'},
  precision:'open-data reference; simplified for legibility', legal_use:'display_context_only',
  metrics_exclusion:'All features are reference_only and excluded from design quantities, statutory area and performance claims.',
  contexts
};
fs.writeFileSync(path.join(__dirname, 'context-open-map.json'), JSON.stringify(output));
console.log(Object.fromEntries(Object.entries(contexts).map(([k,v])=>[k,v.features.length])));
