#!/usr/bin/env node
/* Deterministic CTP package-topology validator. No network or field claims. */
const fs = require('fs');
function reachable(nodes, edges, start, goal, allowed) {
  const graph = Object.fromEntries(nodes.map(n => [n, []]));
  edges.forEach(([a,b]) => { if (allowed.has(a) && allowed.has(b)) { graph[a].push(b); graph[b].push(a); } });
  const queue=[start], seen=new Set(queue);
  while(queue.length){ const current=queue.shift(); if(current===goal)return true; graph[current].forEach(next=>{if(!seen.has(next)){seen.add(next);queue.push(next);}}); }
  return false;
}
function stationChecks(station){
  const records=Object.fromEntries(station.nodes.map(n=>[n.id,n])), ids=station.nodes.map(n=>n.id);
  const nonAi=new Set(station.nodes.filter(n=>!n.ai_dependent).map(n=>n.id));
  const staff=station.nodes.find(n=>n.type==='human_review'&&n.staffed), pilot=station.nodes.find(n=>n.type==='pilot'), returned=station.nodes.find(n=>n.type==='return');
  const accessible=new Set(station.nodes.filter(n=>n.accessible&&!n.ai_dependent).map(n=>n.id));
  const checks={
    ai_off_public_exit:reachable(ids,station.edges,'arrival','exit',nonAi),
    accessible_equivalent_path:reachable(ids,station.edges,'arrival','exit',accessible),
    staffed_review_reachable:Boolean(staff&&reachable(ids,station.edges,'arrival',staff.id,nonAi)),
    pilot_isolatable:Boolean(pilot&&pilot.isolatable),
    paper_receipt_reachable:Boolean(returned&&reachable(ids,station.edges,'arrival',returned.id,nonAi)),
    complaint_can_pause:Boolean(staff&&pilot&&reachable(ids,station.edges,staff.id,pilot.id,new Set(ids))),
    maintenance_failure_can_retire:Boolean(pilot&&pilot.isolatable&&reachable(ids,station.edges,'arrival','exit',nonAi)),
    return_use_after_retire:Boolean(returned&&!records[returned.id].ai_dependent&&reachable(ids,station.edges,'arrival',returned.id,nonAi))
  };
  const passed=Object.values(checks).filter(Boolean).length; return {id:station.id,name_zh:station.name_zh,checks,passed,total:8,ok:passed===8};
}
function validate(input){const stations=input.stations.map(stationChecks),passed=stations.reduce((s,x)=>s+x.passed,0),total=stations.reduce((s,x)=>s+x.total,0);return {schema_version:'1.0.0',status:'concept_protocol_test_not_field_performance',ok:passed===total&&total===input.expected.total_tests,passed,total,stations};}
if(require.main===module){const inputPath=process.argv[2]||'visual/assets/ctp-validator.json',oi=process.argv.indexOf('--output'),result=validate(JSON.parse(fs.readFileSync(inputPath,'utf8'))),encoded=JSON.stringify(result,null,2)+'\n';if(oi>=0&&process.argv[oi+1])fs.writeFileSync(process.argv[oi+1],encoded);process.stdout.write(encoded);process.exit(result.ok?0:1);}
module.exports={validate};
