const fs=require('fs');
const path=require('path');
const ROOT=path.resolve(__dirname,'..','..');
const VERSION='V17.2';
const CJK=/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;
const read=rel=>fs.readFileSync(path.join(ROOT,rel));
const uri=(rel,mime)=>`data:${mime};base64,${read(rel).toString('base64')}`;
const scenes=JSON.parse(read('visual/assets/two-answers.json')).scenarios;
const metricData=JSON.parse(read('metrics.json')).metrics;
const q=(zh,z,e)=>zh?z:e;
const esc=v=>String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
const fontData=JSON.parse(read('visual/assets/font-bundle.json')).data_base64;
const fontCss=`@font-face{font-family:'JZ Civic CJK';src:url(data:font/woff2;base64,${fontData}) format('woff2');font-weight:100 900;font-style:normal;font-display:block}html,body,button,input,select,textarea,svg text{font-family:'JZ Civic CJK','Noto Sans CJK SC','Microsoft YaHei',Arial,sans-serif}`;
const files={
  day:uri('assets/media/receipt-porch-v17-day.webp','image/webp'),
  night:uri('assets/media/receipt-porch-v17-night.webp','image/webp'),
  overall:uri('assets/figures/site-overview.png','image/png'),
  overallEn:uri('assets/figures/site-overview.en.png','image/png'),
  axon:uri('assets/figures/hero-s7-assembly.png','image/png'),
  axonEn:uri('assets/figures/hero-s7-assembly.en.png','image/png')
};
const typographyCss=`.proof span,.formal-index span,.card span,.card small,.v172-tasks span,.v172-report aside span{font-size:14px!important;line-height:1.35}.status a{display:inline-block;margin-top:7px;font-weight:850}.status,.v172-report aside{overflow-wrap:anywhere}.v172-report~main>.hero:first-child,.v172-report~main>.hero:first-child+h1{display:none!important}.v172-report{min-height:780px!important;align-items:start!important}.v172-report figure img{height:auto!important;min-height:0!important;max-height:620px!important}.panel{grid-template-rows:auto auto auto auto!important;align-content:start}.panel img{height:auto!important;min-height:0!important;max-height:430px!important}.state-list{display:grid;grid-template-columns:1fr 1fr;gap:8px}.state-list div{min-height:210px;padding:10px;background:#fff;border-left:7px solid #176b55;border-radius:9px}.state-list div:nth-child(2){border-color:#d98a13}.state-list div:nth-child(3){border-color:#a74238}.state-list div:nth-child(4){border-color:#126e99}.state-list b,.state-list span{display:block}.state-list svg{width:100%;height:auto;max-height:135px}.state-list span{font-size:14px;line-height:1.35;margin-top:4px}@media(max-width:900px){.v172-report{grid-template-columns:1fr!important}.v172-report aside{grid-template-columns:repeat(2,1fr)!important}.state-list{grid-template-columns:1fr 1fr}.state-list div{min-height:170px}}`;

function polish(html,zh){
  return html
    .replace(/<style id="jz-cjk-font">[\s\S]*?<\/style>/g,'')
    .replace(/<\/head>/i,`<style id="jz-cjk-font">${fontCss}${typographyCss}</style></head>`)
    .replace(/JING-ZHANG TWO ANSWERS · V17(?:\.\d+)*/g,`JING-ZHANG TWO ANSWERS · ${VERSION}`)
    .replaceAll('阅读中文版本','Chinese edition')
    .replace('</p></aside></div><div class="proofs">',`</p>${stateEvidence(zh)}</aside></div><div class="proofs">`)
    .replace(/>(?:EN|中文|中文 \/ EN)<\/a>/g,`>${zh?'EN':'Chinese edition'}</a>`);
}

function stateEvidence(zh){
  const rows=zh?[['OPEN','普通服务独立运行'],['TRIAL','许可后仅开一侧'],['PAUSE','隔离设备，人工接管'],['RETIRE','撤出设备，恢复公共用途']]:[['OPEN','ordinary service independent'],['TRIAL','one side only after gates'],['PAUSE','isolate; staffed takeover'],['RETIRE','remove; restore civic use']];
  return `<div class="state-list" aria-label="${q(zh,'四态空间证据','four-state spatial evidence')}">${rows.map(r=>`<div><b>${r[0]}</b>${stateSvg(r[0],zh)}<span>${r[1]}</span></div>`).join('')}</div>`;
}

function assertEnglishClean(html,label){
  const visible=html
    .replace(/<script[\s\S]*?<\/script>/gi,'')
    .replace(/<style[\s\S]*?<\/style>/gi,'')
    .replace(/data:[^\"']+/g,'');
  if(CJK.test(visible)) throw new Error(`${label}: visible CJK remains in English output`);
}

function stateSvg(state,zh){
  const trial=state==='TRIAL',pause=state==='PAUSE',retire=state==='RETIRE';
  return `<svg viewBox="0 0 820 390" role="img" aria-label="${state} ${q(zh,'空间几何','spatial geometry')}"><rect width="820" height="390" rx="18" fill="#fff"/><g class="baseline"><path d="M60 195H760M410 40V350" stroke="#176b55" stroke-width="44"/><path d="M60 195H760M410 40V350" stroke="#dcebe2" stroke-width="26"/><path d="M60 195H760M410 40V350" stroke="#e9c744" stroke-width="5" stroke-dasharray="4 10"/></g><g class="porch"><rect x="78" y="235" width="245" height="100" rx="10" fill="#dcecf4" stroke="#126e99" stroke-width="5"/><text x="100" y="290">${q(zh,'人工回执廊常开','STAFFED PORCH STAYS')}</text></g><g class="bay"><rect x="455" y="220" width="230" height="115" rx="12" fill="${trial?'#f7e3bc':'#eef1ed'}" stroke="${trial?'#d98a13':'#89978f'}" stroke-width="5" ${trial?'stroke-dasharray="12 8"':''}/>${pause?'<path d="M485 245L655 315M655 245L485 315" stroke="#a74238" stroke-width="9"/>':''}${retire?'<path d="M485 285H650" stroke="#126e99" stroke-width="8" stroke-dasharray="14 10"/>':''}<text x="475" y="275">${q(zh,trial?'限时试验':pause?'设备隔离':retire?'设备撤出':'普通公共用途',trial?'TIMED TRIAL':pause?'EQUIPMENT ISOLATED':retire?'EQUIPMENT REMOVED':'ORDINARY CIVIC USE')}</text></g><path d="M455 355H760" stroke="#a74238" stroke-width="7" stroke-dasharray="12 8" marker-end="url(#a)"/><defs><marker id="a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#a74238"/></marker></defs><text x="58" y="30" font-weight="800">${state} · ${q(zh,'4m公共路径不移动','4m PUBLIC ROUTE DOES NOT MOVE')}</text><text x="540" y="378">${q(zh,'独立撤场线','INDEPENDENT RETIREMENT')}</text></svg>`;
}

const css=`:root{--paper:#f4f0e6;--ink:#14231e;--dark:#10271f;--green:#176b55;--amber:#d98a13;--blue:#126e99;--red:#a74238}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink)}.skip{position:absolute;left:-9999px}.skip:focus{left:16px;top:16px;z-index:99;background:white;padding:12px}.hero{min-height:100vh;padding:24px clamp(22px,3vw,52px);display:grid;grid-template-rows:auto minmax(700px,1fr) auto;gap:16px}.hero-head{display:grid;grid-template-columns:1fr auto;gap:20px;align-items:end}.hero-head small{font-weight:900;letter-spacing:.13em;color:var(--green)}h1{font-size:clamp(42px,5.3vw,80px);line-height:.94;margin:8px 0}.claim{font-size:clamp(18px,1.65vw,26px);font-weight:750;max-width:980px;margin:0}.status{border:2px solid #97a69d;border-radius:14px;padding:12px 16px;background:white}.status b,.status span{display:block}.status b{color:var(--amber)}.status a{color:var(--ink)}.twin{display:grid;grid-template-columns:minmax(0,3fr) minmax(420px,2fr);gap:16px}.scene,.panel{background:white;border-radius:20px;overflow:hidden;box-shadow:0 10px 28px #10271f18}.scene{position:relative;min-height:700px}.scene>img{width:100%;height:100%;object-fit:cover}.scene-label{position:absolute;left:0;right:0;top:0;padding:20px;color:white;background:linear-gradient(#10271fe8,transparent);display:flex;flex-wrap:wrap;gap:6px 12px}.geometry{position:absolute;left:16px;right:16px;bottom:16px}.geometry svg{width:100%;max-height:330px;display:block}.panel{padding:18px;display:grid;grid-template-rows:auto minmax(380px,1fr) auto;gap:12px}.panel h2{margin:0 0 8px;font-size:26px}.panel img{width:100%;height:100%;min-height:380px;object-fit:contain;background:#f4f0e6;border-radius:12px}.panel p{font-size:16px;line-height:1.45;margin:0}.buttons{display:flex;gap:8px;flex-wrap:wrap;margin-top:7px}.buttons button{border:2px solid var(--green);background:white;border-radius:9px;padding:9px 13px;font-weight:900;cursor:pointer}.buttons button[aria-pressed=true]{background:var(--dark);color:white}.proofs{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.proof{background:white;border-top:8px solid var(--green);padding:12px;border-radius:9px}.proof:nth-child(2){border-color:var(--amber)}.proof:nth-child(3){border-color:var(--blue)}.proof:nth-child(4){border-color:var(--red)}.proof b,.proof span{display:block}.proof span{margin-top:4px}.below{padding:35px clamp(22px,4vw,64px)}.formal-index{display:grid;grid-template-columns:repeat(7,1fr);gap:7px;margin-bottom:28px}.formal-index span{background:#fff;border-bottom:4px solid var(--blue);padding:9px;font-weight:750}.formal-index .metric{border-color:var(--amber)}.catalog{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.card{background:white;border-left:7px solid var(--green);border-radius:9px;padding:12px}.card.hero-card{border-color:var(--amber)}.card span,.card small{display:block}.card small{color:var(--red);font-weight:800;margin-top:7px}footer{background:var(--dark);color:#dcebe2;padding:22px clamp(22px,4vw,64px)}:focus-visible{outline:4px solid #e9c744;outline-offset:3px}@media(max-width:900px){.hero{padding:16px;grid-template-rows:auto auto auto}.hero-head,.twin{grid-template-columns:1fr}.scene{min-height:570px}.panel{grid-template-rows:auto auto auto}.panel img{min-height:0;max-height:330px}.proofs,.catalog{grid-template-columns:1fr 1fr}.formal-index{grid-template-columns:repeat(3,1fr)}}@media(max-width:520px){.proofs,.catalog,.formal-index{grid-template-columns:1fr}.scene{min-height:520px}.geometry{left:6px;right:6px;bottom:6px}.panel{position:relative;border-radius:18px 18px 0 0}.panel img{max-height:260px}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important}}`;

function cards(zh){return scenes.map(s=>`<article class="card ${s.visual_priority==='hero'?'hero-card':''}" tabindex="0"><b>${esc(s.code)} · ${esc(zh?s.name.zh:s.name.en)}</b><span>${q(zh,'普通服务先成立，AI可选接入','ordinary service first; AI optional')}</span><small>${s.visual_priority.toUpperCase()} · NOT FIELD-RUN</small></article>`).join('')}

function formalIndex(zh){
  const markers=zh?['总览地图','三层范围','重点区域','用地分区','交通慢行','蓝绿公共空间','建筑','更新项目','AI 场景','核心指标','任务覆盖','自检状态','来源','假设']:['Overview map','Three scales','Key areas','Land use','Walking + transit','Blue-green public realm','Architecture','Renewal projects','AI scenes','Core metrics','Task coverage','Self-check','Sources','Assumptions'];
  const metrics=[['site_area_sqm',metricData.site_area_sqm.value],['green_ratio',metricData.green_ratio.value],['public_space_ratio',metricData.public_space_ratio.value]];
  return `<section class="formal-index" aria-label="${q(zh,'正式审查索引','formal review index')}">${markers.map(x=>`<span>${x}</span>`).join('')}${metrics.map(([n,v])=>`<span class="metric" data-metric="${n}" data-value="${v}">${n} · ${v}</span>`).join('')}</section>`;
}

function visualPage(zh=true){
  const axon=zh?files.axon:files.axonEn;
  return `<!doctype html><html lang="${zh?'zh-CN':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${q(zh,'京张双答｜一路四态','Jing-Zhang Two Answers · One route, four states')}</title><style>${css}</style></head><body><a class="skip" href="#twin">${q(zh,'跳到四态空间孪生','Skip to four-state twin')}</a><main><section class="hero" id="twin"><header class="hero-head"><div><small>JING-ZHANG TWO ANSWERS · ${VERSION}</small><h1>${q(zh,'一条公共路径，四种城市状态','ONE PUBLIC ROUTE, FOUR CIVIC STATES')}</h1><p class="claim">${q(zh,'4米原型公共路径始终连续；AI只占一侧；人工回执廊始终开放。','The 4 m prototype public route stays continuous; AI occupies one side; the staffed Receipt Porch stays open.')}</p></div><div class="status"><b>${q(zh,'当前 G0 · 测绘与许可准备','CURRENT G0 · SURVEY + PERMIT PREP')}</b><span>NOT FIELD-RUN · FIELD PERFORMANCE UNKNOWN</span><a href="${zh?'index.en.html':'index.html'}">${zh?'EN':'Chinese edition'}</a></div></header><div class="twin"><div class="scene" id="scene"><img id="heroImage" src="${files.day}" alt="${q(zh,'大钟寺回执廊普通开放日概念图','Dazhongsi ordinary OPEN day concept')}"/><div class="scene-label"><b>${q(zh,'S7 大钟寺｜同一机位、同一公共十字','S7 DAZHONGSI · SAME CAMERA, SAME PUBLIC CROSS')}</b><span>${q(zh,'概念生成图 / 非现场证据','CONCEPT-GENERATED / NOT FIELD EVIDENCE')}</span></div><div class="geometry" id="geometry">${stateSvg('OPEN',zh)}</div></div><aside class="panel"><div><h2>${q(zh,'装配与四态控制','ASSEMBLY + FOUR-STATE CONTROL')}</h2><div class="buttons"><button data-time="DAY">DAY</button><button data-time="NIGHT">NIGHT</button></div><div class="buttons">${['OPEN','TRIAL','PAUSE','RETIRE'].map(s=>`<button data-state="${s}">${s}</button>`).join('')}</div></div><img src="${axon}" alt="${q(zh,'分层剖切装配轴测','layered cutaway assembly')}"/><p>${q(zh,'切换改变试验湾、隔离、设备和恢复几何；公共路线、人工服务和撤场出口不移动。','Switching changes bay, isolation, equipment and restoration geometry; public route, staffed service and exit do not move.')}</p></aside></div><div class="proofs"><div class="proof"><b>${q(zh,'公共路线','PUBLIC ROUTE')}</b><span>4 m · OPEN/TRIAL/PAUSE/RETIRE</span></div><div class="proof"><b>${q(zh,'单侧试验湾','ONE-SIDE BAY')}</b><span>${q(zh,'许可后限时开放','timed only after gates')}</span></div><div class="proof"><b>${q(zh,'人工岗位','STAFFED POST')}</b><span>${q(zh,'服务/申诉/决定常开','service/appeal/decision stays')}</span></div><div class="proof"><b>${q(zh,'撤场出口','RETIREMENT EXIT')}</b><span>${q(zh,'不借用公共路线','independent of public route')}</span></div></div></section><section class="below">${formalIndex(zh)}<h2>${q(zh,'十二个同题场景','TWELVE SAME-TASK SCENES')}</h2><div class="catalog">${cards(zh)}</div></section></main><footer>Map data © OpenStreetMap contributors · ODbL · 2026-08-13 · ${q(zh,'公开背景 / 投稿设计 / 现场未知分层','published context / design / field unknown separated')}</footer><script>const states=${JSON.stringify(Object.fromEntries(['OPEN','TRIAL','PAUSE','RETIRE'].map(s=>[s,stateSvg(s,zh)])))};const day='${files.day}',night='${files.night}';function params(){return new URLSearchParams(location.hash.slice(1))}function setState(s){document.getElementById('geometry').innerHTML=states[s];document.querySelectorAll('[data-state]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.state===s));const h=params();h.set('state',s);history.replaceState(null,'','#'+h)}function setTime(t){document.getElementById('heroImage').src=t==='NIGHT'?night:day;document.querySelectorAll('[data-time]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.time===t));const h=params();h.set('time',t);history.replaceState(null,'','#'+h)}document.querySelectorAll('[data-state]').forEach(b=>b.onclick=()=>setState(b.dataset.state));document.querySelectorAll('[data-time]').forEach(b=>b.onclick=()=>setTime(b.dataset.time));const h=params();setState(h.get('state')||'OPEN');setTime(h.get('time')||'DAY');</script></body></html>`;
}

function reportPanel(zh){
  const tasks=zh?[['A1','双答协议','十二场景与准入'],['A2','区域交换','五条可失败合同'],['A3','证据分层','事实/设计/未知'],['A4','公共空间','环、门、廊地标'],['A5','文化里程','事实—讲解—纠错'],['A6','长期运营','开放日与知识资产']]:[['A1','Two Answers','scenes + admission'],['A2','Exchange','five fail-able contracts'],['A3','Evidence','fact/design/unknown'],['A4','Public realm','Ring/Gate/Porch'],['A5','Evidence mile','fact–interpret–correct'],['A6','Operations','open day + knowledge']];
  return `<!-- V172_REPORT_START --><section class="v172-report"><div class="v172-intro"><small>JING-ZHANG TWO ANSWERS · ${VERSION}</small><h1>${q(zh,'一条公共路径，四种城市状态','ONE PUBLIC ROUTE, FOUR CIVIC STATES')}</h1><p>${q(zh,'六项任务各有独立入口；正式规划是可信底图，建筑公共十字是设计主角。','Six tasks have distinct evidence entries; planning is the base and the civic cross is the design.')}</p><div class="v172-tasks">${tasks.map(r=>`<div><b>${r[0]} · ${r[1]}</b><span>${r[2]}</span></div>`).join('')}</div></div><figure><img src="${zh?files.overall:files.overallEn}" alt="${q(zh,'总体城市设计与三站接口','overall urban design and three interfaces')}"><figcaption>${q(zh,'公开背景上的可停、可撤运营叠加','stoppable, removable overlay on published context')}</figcaption></figure><aside><b>4 m</b><span>${q(zh,'四态公共路径','four-state route')}</span><b>3</b><span>${q(zh,'环 / 门 / 廊','Ring / Gate / Porch')}</span><b>G0</b><span>${q(zh,'测绘与许可准备','survey + permit prep')}</span><em>NOT FIELD-RUN</em><a href="${zh?'proposal.en.html':'proposal.html'}">${zh?'EN':'Chinese edition'}</a></aside></section><style>.v172-report{min-height:min(100vh,1500px);background:#f4f0e6;color:#14231e;padding:34px 30px;display:grid;grid-template-columns:minmax(0,35fr) minmax(0,50fr) minmax(150px,15fr);gap:18px;align-items:stretch;border-top:14px solid #176b55}.v172-report small{font-weight:900;letter-spacing:.13em;color:#176b55}.v172-report h1{font:900 clamp(42px,4.7vw,74px)/.96 'JZ Civic CJK',Arial,sans-serif;margin:12px 0}.v172-report p{font-size:19px;line-height:1.4}.v172-report figure{margin:0;display:flex;flex-direction:column}.v172-report figure img{width:100%;height:calc(100vh - 150px);min-height:650px;object-fit:contain;border-radius:18px;background:white;box-shadow:0 12px 28px #10271f18}.v172-report figcaption{font-weight:800;margin-top:8px}.v172-tasks{display:grid;grid-template-columns:1fr 1fr;gap:8px}.v172-tasks div{background:white;border-left:7px solid #176b55;padding:11px}.v172-tasks b,.v172-tasks span{display:block}.v172-report aside{display:grid;align-content:start;gap:8px}.v172-report aside b,.v172-report aside span,.v172-report aside em,.v172-report aside a{background:white;padding:11px;border-radius:9px;font-style:normal}.v172-report aside b{font-size:32px;color:#176b55}.v172-report aside em{background:#10271f;color:white;font-weight:900}.v172-report aside a{color:#14231e;font-weight:900}@media(max-width:900px){.v172-report{min-height:auto;grid-template-columns:1fr}.v172-report figure img{height:auto;min-height:0}.v172-report aside{grid-template-columns:repeat(2,1fr)}}@media(max-width:520px){.v172-report{padding:18px}.v172-tasks{grid-template-columns:1fr}}</style><!-- V172_REPORT_END -->`;
}

function inject(rel,zh){
  const p=path.join(ROOT,rel);
  let html=fs.readFileSync(p,'utf8')
    .replace(/<!-- V17_REPORT_START -->[\s\S]*?<!-- V17_REPORT_END -->/g,'')
    .replace(/<!-- V172_REPORT_START -->[\s\S]*?<!-- V172_REPORT_END -->/g,'');
  html=html.replace(/<body([^>]*)>/i,m=>m+reportPanel(zh));
  html=polish(html,zh);
  if(!zh) assertEnglishClean(html,rel);
  fs.writeFileSync(p,html);
}

function build(){
  const zhVisual=polish(visualPage(true),true);
  const enVisual=polish(visualPage(false),false);
  assertEnglishClean(enVisual,'visual/index.en.html');
  fs.writeFileSync(path.join(ROOT,'visual','index.html'),zhVisual);
  fs.writeFileSync(path.join(ROOT,'visual','index.en.html'),enVisual);
  inject('report/proposal.html',true);
  inject('report/proposal.en.html',false);
  console.log(`${VERSION} report and interaction built`);
}

module.exports={build};
if(require.main===module)build();
