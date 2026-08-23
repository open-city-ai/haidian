const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const ROOT=path.resolve(__dirname,'..','..');
const read=rel=>fs.readFileSync(path.join(ROOT,rel));
const text=rel=>read(rel).toString('utf8');
const json=rel=>JSON.parse(text(rel));
const sha=rel=>crypto.createHash('sha256').update(read(rel)).digest('hex');
const ok=(condition,message)=>{if(!condition)throw new Error(message);};

const model=json('visual/assets/prototype-model.json');
ok(model.schema_version==='1.13.0','V16 prototype schema must be 1.13.0');
ok(model.field_status==='not_field_run','Prototype must remain not_field_run');
ok(model.architectural_prototypes.length===3,'V16 must contain three architectural prototypes');
ok(new Set(model.architectural_prototypes.map(x=>x.spatial_archetype)).size===3,'Ring, Gate and Porch archetypes must be distinct');
ok(model.material_palette.length===5,'V16 must contain five dry/reversible material systems');
for(const p of model.architectural_prototypes){
  ok(p.plan_refs.length&&p.section_refs.length&&p.detail_refs.length,p.id+' needs plan, section and detail refs');
  ok(p.service_access_refs.length&&p.maintenance_clearance,p.id+' needs service access and maintenance clearance');
  ok(p.field_status==='not_field_run',p.id+' must remain not_field_run');
}
ok(model.s7.public_routes.length===2&&model.s7.public_routes.every(x=>x.clear_width_m>=4),'S7 must preserve two 4 m public routes');
ok(model.s7.trial_bay.assembly_state==='reversible','S7 trial bay must remain reversible');
ok(model.s7.fire_route.independent_of_trial,'Fire route must remain independent');
ok(model.s7.retirement_route.independent_of_public_cross,'Retirement route must remain independent');
ok(model.s7.back_of_house.service_clearance_m>=2.4,'Back-of-house requires 2.4 m service clearance');
ok(model.current_gate.decision==='no_go','Current gate must remain no_go');
ok(model.current_gate.closed_permit_count===0&&model.current_gate.required_permit_count===8,'Permit gate must remain truthful at 0/8');
ok(model.current_gate.baseline_days_recorded===0&&model.current_gate.required_baseline_days===7,'Baseline must remain truthful at 0/7');

const sceneData=json('visual/assets/two-answers.json');
const atlas=json('visual/assets/spatial-atlas.json');
ok(sceneData.schema_version==='1.13.0'&&atlas.schema_version==='1.13.0','V16 package schemas must align at 1.13.0');
ok(atlas.official_context_update.official_context_update.planning_area_ha===1668.2,'Official planning context must preserve 1668.2 ha');
ok(atlas.official_context_update.official_context_update.green_belt_length_km===9,'Official green-belt context must preserve 9 km');
ok(atlas.official_context_update.submission_overlay.area_sqm===11412825.386,'Provisional submission geometry must remain separately registered');
ok(atlas.exchange_contracts.length===5&&atlas.cultural_components.length===5,'Agent 2 and 5 require five exchange contracts and five cultural components');
ok(sceneData.ordinary_open_day.steps.length===5&&sceneData.ordinary_open_day.field_status==='not_field_run','Agent 6 ordinary open day must remain a five-step unrun protocol');
const scenes=sceneData.scenarios;
ok(scenes.length===12,'All twelve scenarios must remain present');
ok(scenes.every(s=>s.field_status==='not_field_run'),'Every scenario must remain not_field_run');
ok(scenes.every(s=>s.ordinary_answer&&s.ai_answer&&s.human_responsibility&&s.stop_conditions),'Every scenario needs paired answers, human responsibility and stop conditions');
for(const pair of [['SCN-002','LMK-01'],['SCN-005','LMK-02'],['SCN-010','LMK-03']])ok(scenes.find(s=>s.id===pair[0])?.architectural_prototype_ref===pair[1],pair[0]+' must resolve to '+pair[1]);

const decision=json('visual/assets/spatial-decision.json');
const decisions=decision.alternatives.map(x=>x.decision);
ok(decisions.filter(x=>x==='reject_design').length>=1,'At least one option must be rejected');
ok(decisions.filter(x=>x==='revise_design').length>=1,'At least one option must be revised');
ok(decisions.filter(x=>x==='advance_design').length===1,'Exactly one option may advance');

for(const rel of ['visual/index.html','visual/index.en.html']){
  const html=text(rel);
  ok(!/<(?:iframe|script|link)[^>]+(?:src|href)=["']https?:/i.test(html),rel+' must not load remote runtime resources');
  ok((html.match(/<article class="card/g)||[]).length===12,rel+' must expose twelve scene cards');
  for(const state of ['OPEN','TRIAL','PAUSE','RETIRE'])ok(html.includes('data-state="'+state+'"'),rel+' missing '+state);
  for(const time of ['DAY','NIGHT'])ok(html.includes('data-time="'+time+'"'),rel+' missing '+time);
  ok(html.includes('URLSearchParams(location.hash.slice(1))'),rel+' must restore URL hash state');
  ok(html.includes('prefers-reduced-motion'),rel+' must respect reduced motion');
  ok((html.includes('NOT FIELD EVIDENCE')||html.includes('非现场证据'))&&html.includes('G0 NO-GO'),rel+' must disclose evidence and gate status');
}

const core=['site-overview','land-use-structure','key-areas','mobility-bluegreen','metrics-evidence'];
for(const language of ['', '.en']){
  const hashes=core.map(name=>sha('assets/figures/'+name+language+'.png'));
  ok(new Set(hashes).size===hashes.length,'Core '+(language||'zh')+' figures must be unique');
}
const sources=json('sources.json').sources;
for(const id of ['BEIJING-BLOCK-PLAN-APPROVED-20260812','BEIJING-JZ-PHASE2-COMPLETE-20260714','BEIJING-JZ-PUBLIC-USE-20260730'])ok(sources.some(x=>x.id===id),'Missing official V16 source '+id);
for(const id of ['GENERATED-VERIFICATION-RING-V15','GENERATED-TRANSLATION-GATE-V15','GENERATED-RECEIPT-PORCH-V15']){
  const source=sources.find(x=>x.id===id);
  ok(source&&source.source_type==='ai_generated_visual','Missing '+id);
  ok(fs.existsSync(path.join(ROOT,source.path))&&fs.existsSync(path.join(ROOT,source.companion_path)),'Missing assets for '+id);
}

const manifest=json('manifest.json');
const listed=new Set(manifest.files.map(x=>x.path));
for(const rel of ['visual/assets/prototype-model.json','visual/assets/content.js','visual/assets/build.js','visual/assets/build-html.js','visual/assets/qa.js','visual/assets/app.js','visual/assets/styles.css'])ok(listed.has(rel),'Manifest missing '+rel);

console.log(JSON.stringify({ok:true,schema:'1.13.0',prototypes:3,materials:5,scenarios:12,exchange_contracts:5,cultural_components:5,open_day_steps:5,current_gate:'G0_no_go',permits:'0/8',baseline:'0/7',core_unique:true,offline:true},null,2));
