const fs=require('fs');
const path=require('path');
const ROOT=path.resolve(__dirname,'..','..');
const read=rel=>JSON.parse(fs.readFileSync(path.join(ROOT,rel),'utf8'));
const fail=m=>{throw new Error(m)};

const metrics=read('metrics.json').metrics;
const required={
  east_west_stitch_count:6,
  spatial_component_type_count:9,
  receipt_landmark_count:3,
  s7_prototype_kit_item_count:16,
  s7_pilot_phase_count:5,
  measurement_contract_count:12,
  field_verification_result_count:0,
  synthetic_design_verification_case_count:84,
  spatial_hard_gate_evaluation_count:21,
  rejected_spatial_alternative_count:1,
  revised_spatial_alternative_count:1,
  advanced_spatial_alternative_count:1,
  official_planning_area_ha:1668.2,
  official_green_belt_length_km:9,
  exchange_contract_count:5,
  cultural_component_count:5,
  ordinary_open_day_step_count:5
};
for(const [id,value] of Object.entries(required)){
  if(!metrics[id])fail(`missing semantic metric ${id}`);
  if(metrics[id].status!=='known'||metrics[id].value!==value)fail(`semantic metric mismatch ${id}: ${JSON.stringify(metrics[id])}`);
}

const expected=[
  ['六条东西缝合','east_west_stitch_count'],['Six east–west stitches','east_west_stitch_count'],
  ['九个 ID','spatial_component_type_count'],['The IDs recur','spatial_component_type_count'],
  ['E2 原型准备文件','s7_prototype_kit_item_count'],['One S7 model drives','s7_prototype_kit_item_count'],
  ['84 项','synthetic_design_verification_case_count'],['84/84 cases','synthetic_design_verification_case_count']
];
for(const rel of ['proposal.md','proposal.en.md']){
  const text=fs.readFileSync(path.join(ROOT,rel),'utf8');
  const refs=[...text.matchAll(/\[metric:([a-z0-9_]+)\]/g)].map(m=>m[1]);
  for(const id of refs)if(!metrics[id])fail(`${rel} references missing metric ${id}`);
  for(const [anchor,id] of expected)if(text.includes(anchor)){
    const i=text.indexOf(anchor); const paragraph=text.slice(i,text.indexOf('\n\n',i)>i?text.indexOf('\n\n',i):i+800);
    if(!paragraph.includes(`[metric:${id}]`))fail(`${rel} semantic anchor ${anchor} does not cite ${id}`);
  }
  const paragraphs=text.split(/\n\n+/);
  for(const p of paragraphs){
    const local=[...p.matchAll(/\[metric:([a-z0-9_]+)\]/g)].map(m=>m[1]);
    if(new Set(local).size!==local.length)fail(`${rel} repeats a metric citation in one paragraph: ${local.filter((x,i)=>local.indexOf(x)!==i).join(',')}`);
    if(/六条东西缝合|Six east–west stitches/.test(p)&&p.includes('[metric:key_area_count]'))fail(`${rel} stitches cite key_area_count`);
    if(/九个 ID|nine stable component IDs/.test(p)&&p.includes('[metric:paired_scenario_count]'))fail(`${rel} component types cite paired_scenario_count`);
    if(/E2 原型准备文件|E2 prototype preparation/.test(p)&&p.includes('[metric:measurement_contract_count]'))fail(`${rel} E2 kit cites measurement_contract_count`);
  }
}

const zh=fs.readFileSync(path.join(ROOT,'proposal.md'),'utf8');
const en=fs.readFileSync(path.join(ROOT,'proposal.en.md'),'utf8');
for(const token of ['measurement_contract_count','field_verification_result_count','east_west_stitch_count','spatial_component_type_count','s7_prototype_kit_item_count','s7_pilot_phase_count']){
  if(!zh.includes(`[metric:${token}]`)||!en.includes(`[metric:${token}]`))fail(`bilingual metric citation missing ${token}`);
}
console.log(JSON.stringify({ok:true,schema:'1.13.0',metric_count:Object.keys(metrics).length,semantic_assertions:Object.keys(required).length,bilingual:true},null,2));
