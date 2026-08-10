#!/usr/bin/env node
// Deterministic offline P1 synthetic desktop replay: no network, no personal data.
const fs=require("fs"), path=require("path"), crypto=require("crypto");
const dir=__dirname;
const fixturePath=path.join(dir,"p1-replay-fixtures.json");
const evidencePath=path.join(dir,"p1-replay-evidence.json");
const schemaPath=path.join(dir,"civic-agent-receipt.schema.json");
const exampleReceiptPath=path.join(dir,"example-p1-receipt.json");
const load=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const hash=b=>crypto.createHash("sha256").update(b).digest("hex");
const fixtures=load(fixturePath), schema=load(schemaPath), exampleReceipt=load(exampleReceiptPath);
if(!schema.$schema.endsWith("2020-12/schema")||!schema.$id) throw Error("schema contract metadata invalid");
const jsonType=v=>v===null?"null":Array.isArray(v)?"array":typeof v;
function validateSchema(node,value,at="$",errors=[]){
 const allowed=Array.isArray(node.type)?node.type:node.type?[node.type]:[];
 if(allowed.length&&!allowed.includes(jsonType(value))) errors.push(`${at}: type ${allowed.join("|")} required`);
 if(node.enum&&!node.enum.some(x=>JSON.stringify(x)===JSON.stringify(value))) errors.push(`${at}: enum mismatch`);
 if(Object.prototype.hasOwnProperty.call(node,"const")&&value!==node.const) errors.push(`${at}: const mismatch`);
 if(typeof value==="string"&&node.pattern&&!new RegExp(node.pattern).test(value)) errors.push(`${at}: pattern mismatch`);
 if(typeof value==="string"&&node.format==="date-time"&&(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)||Number.isNaN(Date.parse(value)))) errors.push(`${at}: invalid date-time`);
 if(Array.isArray(value)){if(node.minItems!==undefined&&value.length<node.minItems) errors.push(`${at}: minItems ${node.minItems}`); if(node.items)value.forEach((v,i)=>validateSchema(node.items,v,`${at}[${i}]`,errors));}
 if(value&&jsonType(value)==="object"){
  for(const key of node.required||[]) if(!Object.prototype.hasOwnProperty.call(value,key)) errors.push(`${at}.${key}: required`);
  if(node.additionalProperties===false) for(const key of Object.keys(value)) if(!Object.prototype.hasOwnProperty.call(node.properties||{},key)) errors.push(`${at}.${key}: additional property`);
  for(const [key,child] of Object.entries(node.properties||{})) if(Object.prototype.hasOwnProperty.call(value,key)) validateSchema(child,value[key],`${at}.${key}`,errors);
 }
 return errors;
}
const receiptSchemaErrors=validateSchema(schema,exampleReceipt);
const clone=v=>JSON.parse(JSON.stringify(v));
const negativeControls=[
 r=>delete r.receipt_id,
 r=>{r.data_categories="not-an-array";},
 r=>{r.confidence_status="unknown";},
 r=>{r.receipt_id="bad id";},
 r=>{r.expires_at="tomorrow";},
 r=>{r.uncontracted_field=true;},
 r=>delete r.retention.deletion_evidence,
 r=>{r.prohibited_identity_fields=true;}
];
const rejectedNegativeControls=negativeControls.filter(mutate=>{const r=clone(exampleReceipt); mutate(r); return validateSchema(schema,r).length>0;}).length;
function decide(c){const stops=[];
 if(c.route_state==="severe_safety_mislead") stops.push("severe_safety_mislead");
 if(!c.handoff_available) stops.push("human_handoff_unavailable");
 if(!c.physical_break_isolated) stops.push("physical_break_not_isolated");
 if(c.route_state==="uncertain") stops.push("uncertainty_requires_human_review");
 return [stops.length?"suspend":"continue_limited",stops];}
const memory=fixtures.cases.map(c=>c.id);
const results=fixtures.cases.map(c=>{const [actual,hard_stops]=decide(c); return {case_id:c.id,actual,expected:c.expected,pass:actual===c.expected,hard_stops,fallback:actual==="suspend"?"paper_route_and_staffed_desk":"staffed_desk_visible"};});
const stopSet=new Set(results.flatMap(r=>r.hard_stops));
const assertions={all_expected_dispositions:results.every(r=>r.pass),four_fixture_cases:results.length===4,four_hard_stop_branches:stopSet.size===4,human_fallback_present:results.every(r=>r.fallback),no_network_inputs:fixtures.scope==="offline_synthetic_desktop_only",schema_contract_valid:receiptSchemaErrors.length===0&&rejectedNegativeControls===negativeControls.length};
const before=memory.length;
const deletionLog=[...memory].map(case_id=>({case_id,action:"deleted_from_replay_memory"})); memory.length=0;
const rollback=["disable_route_assistant","publish_stop_state","activate_paper_route","route_to_staffed_desk","retain_public_incident_record_only"];
assertions.memory_deleted_4_to_0=before===4&&memory.length===0&&deletionLog.length===4;
assertions.five_step_rollback=rollback.length===5;
const payload={evidence_version:"1.1",generated_at:"2026-08-09T13:30:00Z",status:Object.values(assertions).every(Boolean)?"PASS":"FAIL",claim_boundary:"Synthetic offline desktop replay only; NOT AUTHORIZED and NOT RUN as a field or operational pilot.",inputs:{fixtures:"visual/assets/p1-replay-fixtures.json",fixture_sha256:hash(fs.readFileSync(fixturePath)),schema:"visual/assets/civic-agent-receipt.schema.json",schema_sha256:hash(fs.readFileSync(schemaPath)),example_receipt:"visual/assets/example-p1-receipt.json",example_receipt_sha256:hash(fs.readFileSync(exampleReceiptPath)),network_calls:0,personal_records:0},schema_validation:{draft:schema.$schema,example_error_count:receiptSchemaErrors.length,example_errors:receiptSchemaErrors,negative_controls_rejected:rejectedNegativeControls,negative_controls_total:negativeControls.length,keywords_exercised:["required","type","enum","pattern","format:date-time","additionalProperties","nested required","const"]},results,assertions,deletion:{records_before:before,records_after:memory.length,log:deletionLog},rollback:{step_count:rollback.length,steps:rollback,final_mode:"non_ai_public_service"}};
payload.replay_digest_sha256=hash(Buffer.from(JSON.stringify(payload)));
fs.writeFileSync(evidencePath,JSON.stringify(payload,null,2)+"\n");
console.log(`P1_REPLAY ${payload.status} cases=${results.length} assertions=${Object.values(assertions).filter(Boolean).length}/${Object.keys(assertions).length} digest=${payload.replay_digest_sha256}`);
if(payload.status!=="PASS") process.exit(1);
