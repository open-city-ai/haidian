const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const MODULES=process.env.JZ_WORKSPACE_NODE_MODULES;
const {chromium}=MODULES?require(path.join(MODULES,'playwright')):require('playwright');
const builder=require('./build');
const ROOT=path.resolve(__dirname,'..','..');
const read=rel=>fs.readFileSync(path.join(ROOT,rel));
const text=rel=>read(rel).toString('utf8');
const json=rel=>JSON.parse(text(rel));
const sha=rel=>crypto.createHash('sha256').update(read(rel)).digest('hex');
const ok=(v,m)=>{if(!v)throw new Error(m)};

const model=json('visual/assets/prototype-model.json');
const atlas=json('visual/assets/spatial-atlas.json');
const data=json('visual/assets/two-answers.json');
for(const [name,item] of [['prototype',model],['atlas',atlas],['scenes',data]])ok(item.schema_version==='1.14.0',`${name} schema must be 1.14.0`);
ok(model.field_status==='not_field_run','Prototype must remain not_field_run');
ok(model.architectural_prototypes.length===3,'Three prototypes required');
ok(new Set(model.architectural_prototypes.map(x=>x.spatial_archetype)).size===3,'Ring, Gate and Porch must be distinct');
ok(model.material_palette.length===5,'Five reversible materials required');
ok(model.public_route_invariant.clear_width_m===4&&!model.public_route_invariant.interruption_allowed,'4 m public route invariant required');
ok(model.public_route_invariant.states.join('|')==='OPEN|TRIAL|PAUSE|RETIRE','Four canonical states required');
ok(Object.keys(model.canonical_view_refs).length===5,'Five canonical jury views required');
ok(model.implementation_stage==='G0_survey_and_permit_preparation','Current stage must be G0 preparation');
ok(model.next_gate_requirements.length===5,'Five next-gate requirements required');
for(const p of model.architectural_prototypes){
  for(const key of ['canonical_view_refs','context_feature_refs','existing_public_use_refs','state_geometry_refs','maintenance_route_refs','experience_camera_ref','visual_priority','implementation_stage','next_gate_requirements'])ok(p[key]&&(Array.isArray(p[key])?p[key].length:true),`${p.id} missing ${key}`);
  ok(p.plan_refs.length&&p.section_refs.length&&p.service_access_refs.length,`${p.id} needs plan, section and service refs`);
  ok(p.field_status==='not_field_run',`${p.id} must remain not_field_run`);
}
ok(model.s7.public_routes.length===2&&model.s7.public_routes.every(r=>r.clear_width_m>=4),'Two 4 m S7 public routes required');
ok(model.s7.trial_bay.assembly_state==='reversible','Trial bay must be reversible');
ok(model.s7.fire_route.independent_of_trial,'Fire route must be independent');
ok(model.s7.retirement_route.independent_of_public_cross,'Retirement route must be independent');
ok(model.current_gate.closed_permit_count===0&&model.current_gate.required_permit_count===8,'Truthful 0/8 permit state required');
ok(model.current_gate.baseline_days_recorded===0&&model.current_gate.required_baseline_days===7,'Truthful 0/7 baseline required');

ok(atlas.official_context_update.official_context_update.planning_area_ha===1668.2,'Official 1668.2 ha context required');
ok(atlas.official_context_update.official_context_update.green_belt_length_km===9,'Official 9 km context required');
ok(atlas.official_context_update.submission_overlay.area_sqm===11412825.386,'Provisional overlay must remain separate');
ok(atlas.exchange_contracts.length===5&&atlas.cultural_components.length===5,'Five exchange and five cultural entries required');
ok(data.ordinary_open_day.steps.length===5&&data.ordinary_open_day.field_status==='not_field_run','Five-step unrun ordinary day required');
ok(data.scenarios.length===12,'Twelve scenarios required');
for(const s of data.scenarios){
  ok(s.field_status==='not_field_run',`${s.code} must remain not_field_run`);
  for(const k of ['ordinary_answer','ai_answer','human_responsibility','stop_conditions','public_route_invariant','visual_priority','implementation_stage','next_gate_requirements'])ok(s[k],`${s.code} missing ${k}`);
}
for(const [id,ref] of [['SCN-002','LMK-01'],['SCN-005','LMK-02'],['SCN-010','LMK-03']])ok(data.scenarios.find(s=>s.id===id)?.architectural_prototype_ref===ref,`${id} must resolve to ${ref}`);

const decision=json('visual/assets/spatial-decision.json').alternatives.map(x=>x.decision);
ok(decision.filter(x=>x==='reject_design').length>=1,'At least one reject required');
ok(decision.filter(x=>x==='revise_design').length>=1,'At least one revise required');
ok(decision.filter(x=>x==='advance_design').length===1,'Exactly one advance required');

for(const rel of ['visual/index.html','visual/index.en.html']){
  const html=text(rel);
  ok(!/<(?:iframe|script|link)[^>]+(?:src|href)=["']https?:/i.test(html),`${rel} loads remote runtime resources`);
  ok((html.match(/<article class="card/g)||[]).length===12,`${rel} must expose 12 scene cards`);
  for(const state of ['OPEN','TRIAL','PAUSE','RETIRE'])ok(html.includes(`data-state="${state}"`),`${rel} missing ${state}`);
  for(const time of ['DAY','NIGHT'])ok(html.includes(`data-time="${time}"`),`${rel} missing ${time}`);
  ok(html.includes('URLSearchParams(location.hash.slice(1))'),`${rel} must restore hash state`);
  ok(html.includes('prefers-reduced-motion'),`${rel} must respect reduced motion`);
  ok(html.includes('NOT FIELD-RUN')&&(html.includes('G0')||html.includes('测绘')),`${rel} must disclose evidence and stage`);
}
for(const rel of ['report/proposal.html','report/proposal.en.html']){
  const html=text(rel);
  ok((html.match(/V172_REPORT_START/g)||[]).length===1,`${rel} must contain one V17.2 report entry`);
  const firstScreen=html.split('V172_REPORT_END')[0];
  ok(!firstScreen.includes('v16-report')&&!firstScreen.includes('G0 NO-GO'),`${rel} contains legacy first screen`);
  ok(html.includes('.v172-report~main>.hero:first-child,.v172-report~main>.hero:first-child+h1{display:none!important}'),`${rel} must replace, not duplicate, the original hero`);
}

const cjk=/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;
for(const rel of ['report/proposal.en.html','visual/index.en.html']){
  const visible=text(rel).replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'').replace(/data:[^\"']+/g,'');
  ok(!cjk.test(visible),`${rel} contains visible CJK text`);
  ok(visible.includes('Chinese edition'),`${rel} must use the English language-entry label`);
}
ok(!cjk.test(text('proposal.en.md')),`proposal.en.md contains CJK text`);

const fontRel='visual/assets/font-bundle.json';
const fontBundle=json(fontRel);
const fontMeta=json('visual/assets/font-metadata.json');
const fontGlyphs=json('visual/assets/font-glyphs.json').characters;
const fontBinary=Buffer.from(fontBundle.data_base64,'base64');
const fontHash=crypto.createHash('sha256').update(fontBinary).digest('hex');
ok(fontMeta.family==='JZ Civic CJK','Offline font family must be JZ Civic CJK');
ok(fontMeta.license==='SIL Open Font License 1.1','Offline font must retain OFL 1.1');
ok(fontMeta.subset.sha256===fontHash,'Offline font metadata hash mismatch');
ok(fontBundle.sha256===fontHash,'Offline font bundle hash mismatch');
ok(fontBinary.length<=480*1024,'Offline font subset exceeds 480 KiB');
for(const rel of ['report/proposal.html','report/proposal.en.html','visual/index.html','visual/index.en.html']){
  const html=text(rel);
  ok(read(rel).length<2*1024*1024,`${rel} exceeds 2 MiB`);
  ok(html.includes("font-family:'JZ Civic CJK'"),`${rel} missing embedded font family`);
  const match=html.match(/data:font\/woff2;base64,([A-Za-z0-9+/=]+)/);
  ok(match,`${rel} missing embedded WOFF2 data URI`);
  const embeddedHash=crypto.createHash('sha256').update(Buffer.from(match[1],'base64')).digest('hex');
  ok(embeddedHash===fontHash,`${rel} embeds the wrong font binary`);
  ok(!html.includes('\uFFFD')&&!html.includes('\u25A1'),`${rel} contains a replacement/tofu character`);
  for(const character of new Set([...html].filter(c=>c.codePointAt(0)>127)))ok(fontGlyphs.includes(character),`${rel} font subset misses U+${character.codePointAt(0).toString(16).toUpperCase()}`);
}

const core=['site-overview','land-use-structure','key-areas','mobility-bluegreen','metrics-evidence'];
for(const suffix of ['', '.en']){
  const hashes=core.map(n=>sha(`assets/figures/${n}${suffix}.png`));
  ok(new Set(hashes).size===5,`Core ${suffix||'zh'} figures must be unique`);
}
for(const name of core)ok(sha(`assets/figures/${name}.png`)!==sha(`assets/figures/${name}.en.png`),`${name} bilingual pair must be independently rendered`);
for(const rel of ['drawings/a0-boards.pdf','drawings/a0-boards.en.pdf','drawings/a3-booklet.pdf','drawings/a3-booklet.en.pdf'])ok(read(rel).length<6*1024*1024,`${rel} exceeds 6 MiB`);
const total=(function walk(d){return fs.readdirSync(d,{withFileTypes:true}).reduce((n,e)=>n+(e.isDirectory()?walk(path.join(d,e.name)):fs.statSync(path.join(d,e.name)).size),0)})(ROOT);
ok(total<38*1024*1024,`Package exceeds 38 MiB: ${total}`);

const sources=json('sources.json').sources;
for(const id of ['BEIJING-BLOCK-PLAN-APPROVED-20260812','BEIJING-JZ-PHASE2-COMPLETE-20260714','GENERATED-RECEIPT-PORCH-V17-DAY','GENERATED-RECEIPT-PORCH-V17-NIGHT','SOURCE-HAN-SANS-2.005R']){
  const s=sources.find(x=>x.id===id);ok(s,`Missing source ${id}`);if(s.path)ok(fs.existsSync(path.join(ROOT,s.path)),`Missing asset for ${id}`);if(s.companion_path)ok(fs.existsSync(path.join(ROOT,s.companion_path)),`Missing companion for ${id}`);
}
const buildCode=text('visual/assets/build.js')+text('visual/assets/content.js')+text('visual/assets/build-html.js');
ok(!/Legacy|V1[1-6]_REPORT|function\s+\w+V1[1-6]/.test(buildCode),'Canonical build contains legacy override code');
ok(buildCode.includes("const VERSION='V17.2'"),'V17.2 publication token is required');
ok(buildCode.includes('title:44')&&buildCode.includes('note:18'),'Shared publication type tokens are required');
ok(!fs.existsSync(path.join(ROOT,'visual/assets/app.js'))&&!fs.existsSync(path.join(ROOT,'visual/assets/styles.css')),'Unused app/styles assets should be removed');
const listed=new Set(json('manifest.json').files.map(x=>x.path));
for(const rel of ['visual/assets/prototype-model.json','visual/assets/content.js','visual/assets/build.js','visual/assets/build-html.js','visual/assets/build-font.js','visual/assets/font-render-qa.js','visual/assets/qa.js','visual/assets/font-bundle.json','visual/assets/font-metadata.json','visual/assets/font-glyphs.json','visual/assets/font-license.json','assets/figures/jury-summary.png','assets/media/receipt-porch-v17-day.webp','assets/media/receipt-porch-v17-night.webp'])ok(listed.has(rel),`Manifest missing ${rel}`);

async function inspectSvgGeometry(page,markup,label,style=''){
  await page.setContent(`<html><meta charset="utf-8"><style>html,body{margin:0}${style}</style><body>${markup}</body></html>`,{waitUntil:'load'});
  const failures=await page.evaluate(()=>{
    const failures=[];
    const bounds=e=>{const r=e.getBoundingClientRect();return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
    for(const el of document.querySelectorAll('svg text')){
      const owner=el.closest('svg');
      if(!owner)continue;
      const r=bounds(el),s=bounds(owner),vb=owner.viewBox&&owner.viewBox.baseVal;
      const scale=vb&&vb.width?Math.min(s.width/vb.width,s.height/vb.height):1;
      const inset=10*scale;
      if(r.left<s.left+inset-1||r.top<s.top+inset-1||r.right>s.right-inset+1||r.bottom>s.bottom-inset+1)failures.push({kind:'svg-text-bound',text:(el.textContent||'').trim(),role:el.dataset.role||'',rect:r,owner:s});
    }
    for(const board of document.querySelectorAll('.board')){
      const title=board.querySelector('[data-role="board-title"]');
      const code=board.querySelector('[data-role="board-code"]');
      if(title&&code){const a=bounds(title),b=bounds(code);const root=board.querySelector(':scope > svg');const rr=bounds(root);const vb=root.viewBox.baseVal;const scale=rr.width/vb.width;const gap=(b.left-a.right)/scale;if(gap<24)failures.push({kind:'board-header-gap',gap,title:title.textContent,code:code.textContent});}
    }
    for(const card of document.querySelectorAll('[data-role="fallback-card"]')){
      const outline=card.querySelector('[data-role="fallback-outline"]');
      const body=[...card.querySelectorAll('[data-role="fallback-body"]')];
      if(!outline||!body.length){failures.push({kind:'fallback-role-missing'});continue;}
      const box=bounds(outline);
      for(const el of body){const r=bounds(el);if(r.left<box.left+8||r.right>box.right-8||r.top<box.top+8||r.bottom>box.bottom-8)failures.push({kind:'fallback-body-bound',text:el.textContent,rect:r,outline:box});}
    }
    return failures;
  });
  ok(!failures.length,`${label} geometry failures: ${JSON.stringify(failures.slice(0,8))}`);
}

async function runVisualGeometryQa(){
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const page=await browser.newPage({viewport:{width:1920,height:1400}});
    const coreSources=[['site-overview',builder.overall],['land-use-structure',builder.groundInterface],['key-areas',builder.keyAreas],['mobility-bluegreen',builder.mobility],['metrics-evidence',builder.metrics]];
    for(const l of ['zh','en'])for(const [name,make] of coreSources)await inspectSvgGeometry(page,make(l),`${name}.${l}`);
    for(const l of ['zh','en']){
      await inspectSvgGeometry(page,builder.a0(l),`a0.${l}`,builder.pdfCss(true));
      await inspectSvgGeometry(page,builder.a3(l),`a3.${l}`,builder.pdfCss(false));
    }
  }finally{await browser.close();}
}

runVisualGeometryQa().then(()=>console.log(JSON.stringify({ok:true,schema:'1.14.0',prototypes:3,materials:5,scenarios:12,public_route_width_m:4,states:4,current_stage:'G0_survey_and_permit_preparation',permits:'0/8',baseline:'0/7',core_unique:true,offline:true,visual_geometry:true,font_family:fontMeta.family,font_bytes:fontBinary.length,package_bytes:total},null,2))).catch(e=>{console.error(e);process.exit(1)});
