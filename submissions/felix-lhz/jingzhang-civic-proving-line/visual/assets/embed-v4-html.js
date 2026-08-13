const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..','..');
const data=fs.readFileSync(path.join(__dirname,'two-answers.json'),'utf8').trim();
const atlas=fs.readFileSync(path.join(__dirname,'spatial-atlas.json'),'utf8').trim();
const context=fs.readFileSync(path.join(__dirname,'context-open-map.json'),'utf8').trim();
const replacements={zh:[
  ['<title>京张双答｜空间评审工作台</title>','<title>京张双答｜城市采纳回执评审工作台</title>'],
  ['<p class="kicker">JING-ZHANG TWO ANSWERS</p>','<p class="kicker">JING-ZHANG TWO ANSWERS · V4</p>'],
  ['<p class="claim">每个城市问题，先有普通答案，再证明 AI 答案。</p>','<p class="claim">城市采纳回执：普通服务先成立，AI 必须通过同题、同人、同空间的公开验收。</p>'],
  ['<h2>十二组同题双答</h2>','<h2>三个英雄场景＋九项复制索引</h2>'],
  ['<p>绩效全部等待现场基线，不生成虚构效率、满意度、成本或节能数值。</p>','<p>T2、S2、S7 展开到总平面、详图、剖面、运营与回执；其余九项保持可追踪复制链。所有绩效待现场基线。</p>']
],en:[
  ['<title>Jing-Zhang Two Answers | Spatial Review Workbench</title>','<title>Jing-Zhang Two Answers | Civic Adoption Receipt Workbench</title>'],
  ['<p class="kicker">JING-ZHANG TWO ANSWERS</p>','<p class="kicker">JING-ZHANG TWO ANSWERS · V4</p>'],
  ['<p class="claim">For every civic question: establish the ordinary answer, then prove the AI answer.</p>','<p class="claim">Civic Adoption Receipt: baseline service stands first; AI must pass a same-task, same-user, same-space public test.</p>'],
  ['<h2>TWELVE PAIRED CIVIC QUESTIONS</h2>','<h2>THREE HERO SCENARIOS + NINE REPLICATION ITEMS</h2>'],
  ['<p>Performance awaits field baselines; no invented efficiency, satisfaction, cost or energy values.</p>','<p>T2, S2 and S7 expand into plan, detail, section, operation and receipt; nine further items retain a traceable replication chain. All performance awaits field baselines.</p>']
]};
for(const lang of ['zh','en']){
  const file=path.join(ROOT,'visual',`index${lang==='en'?'.en':''}.html`);let html=fs.readFileSync(file,'utf8');
  for(const [from,to] of replacements[lang])html=html.replace(from,to);
  html=html.replace(/(<button data-layer="context" aria-pressed="true">[^<]+<\/button>){2}/,(_,one)=>one);
  html=html.replace(/<script id="scenario-data"[\s\S]*?<\/script>/,`<script id="scenario-data" type="application/json">${data}</script>`)
    .replace(/<script id="atlas-data"[\s\S]*?<\/script>/,`<script id="atlas-data" type="application/json">${atlas}</script>`)
    .replace(/<script id="context-data"[\s\S]*?<\/script>/,`<script id="context-data" type="application/json">${context}</script>`);
  fs.writeFileSync(file,html.replace(/\r\n/g,'\n'));
}
console.log('embedded V4 hero/catalog data into bilingual offline workbench');
