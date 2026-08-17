const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const data = fs.readFileSync(path.join(__dirname, 'two-answers.json'), 'utf8').trim();
const atlas = fs.readFileSync(path.join(__dirname, 'spatial-atlas.json'), 'utf8').trim();
const context = fs.readFileSync(path.join(__dirname, 'context-open-map.json'), 'utf8').trim();
const geometry = { type: 'FeatureCollection', features: ['roads.geojson', 'public_space.geojson', 'buildings.geojson', 'constraints.geojson'].flatMap((name) => JSON.parse(fs.readFileSync(path.join(ROOT, 'geometry', name), 'utf8')).features).filter((feature) => String(feature.id || feature.properties?.id || '').startsWith('V5-')) };
const copy = {
  zh: { title: '京张双答｜把回执画进城市', kicker: 'JING-ZHANG TWO ANSWERS · V5', claim: '把回执画进城市：每一次 AI 试验，都必须保留一条不被牺牲的公共路径。', heroes: ['T2 环形测试庭', 'S2 可穿行大厅', 'S7 四象限交通前场'] },
  en: { title: 'Jing-Zhang Two Answers | Draw the Receipt into the City', kicker: 'JING-ZHANG TWO ANSWERS · V5', claim: 'Draw the receipt into the city: every AI trial must preserve one public route that cannot be sacrificed.', heroes: ['T2 LOOP COURT', 'S2 POROUS HALL', 'S7 FOUR-QUADRANT FORECOURT'] },
};
for (const lang of ['zh', 'en']) {
  const file = path.join(ROOT, 'visual', `index${lang === 'en' ? '.en' : ''}.html`);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${copy[lang].title}</title>`).replace(/<p class="kicker">[^<]*<\/p>/, `<p class="kicker">${copy[lang].kicker}</p>`).replace(/<p class="claim">[^<]*<\/p>/, `<p class="claim">${copy[lang].claim}</p>`).replace(/<div class="first-look">[\s\S]*?<\/div><nav class="review-nav"/, '<nav class="review-nav"').replace('</div><nav class="review-nav"', `</div><div class="first-look"><img src="../assets/figures/site-overview${lang === 'en' ? '.en' : ''}.png" alt="${lang === 'zh' ? '一脊三站两翼总体城市设计' : 'Overall urban design'}"><div>${copy[lang].heroes.map((item) => `<b>${item}</b>`).join('')}</div><strong>NOT FIELD-RUN · E1 CONCEPT DESIGN</strong></div><nav class="review-nav"`).replace(/<script id="scenario-data"[\s\S]*?<\/script>/, `<script id="scenario-data" type="application/json">${data}</script>`).replace(/<script id="atlas-data"[\s\S]*?<\/script>/, `<script id="atlas-data" type="application/json">${atlas}</script>`).replace(/<script id="context-data"[\s\S]*?<\/script>/, `<script id="context-data" type="application/json">${context}</script>`);
  if (!html.includes('two-answers-v5.css')) html = html.replace('</head>', '<link rel="stylesheet" href="assets/two-answers-v5.css"></head>');
  if (html.includes('id="geometry-data"')) html = html.replace(/<script id="geometry-data"[\s\S]*?<\/script>/, `<script id="geometry-data" type="application/json">${JSON.stringify(geometry)}</script>`);
  else html = html.replace('<script src="assets/two-answers.js"></script>', `<script id="geometry-data" type="application/json">${JSON.stringify(geometry)}</script><script src="assets/two-answers.js"></script><script src="assets/two-answers-v5.js"></script>`);
  fs.writeFileSync(file, html.replace(/\r\n/g, '\n'));
}
console.log(`embedded V5 data and ${geometry.features.length} traceable GeoJSON objects`);
