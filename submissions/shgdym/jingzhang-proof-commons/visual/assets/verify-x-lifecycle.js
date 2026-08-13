#!/usr/bin/env node
/* Executable X Receipt state machine. PASS proves local rule conformance only. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const STATES = ['TEST_PENDING','TEST_FAIL','TEST_PASS','RETEST','RELEASE_HOLD','RELEASE_PASS','USE_PENDING','USE_OPEN','USE_HOLD','RETURN'];
const TRANSITIONS = {
  START: ['TEST_PENDING'], TEST_PENDING: ['TEST_FAIL','TEST_PASS'], TEST_FAIL: ['RETEST'], RETEST: ['TEST_FAIL','TEST_PASS'],
  TEST_PASS: ['RELEASE_HOLD','RELEASE_PASS'], RELEASE_HOLD: ['RELEASE_HOLD','RELEASE_PASS','RETURN'], RELEASE_PASS: ['USE_PENDING'],
  USE_PENDING: ['USE_OPEN','USE_HOLD','RETURN'], USE_OPEN: ['USE_HOLD','RETURN'], USE_HOLD: ['USE_OPEN','RETURN'], RETURN: ['RETEST'],
};
const EXPECTED = {TEST_FAIL:['Test Receipt','FAIL'],TEST_PASS:['Test Receipt','PASS'],RELEASE_HOLD:['Release Ticket','HOLD'],RELEASE_PASS:['Release Ticket','PASS'],USE_OPEN:['Public Verdict','OPEN'],USE_HOLD:['Public Verdict','HOLD'],RETURN:['Public Verdict','RETURN']};
const FINGERPRINT = ['product_version','model_version','map_version','route_version','config_hash'];
function stable(value) { if (Array.isArray(value)) return value.map(stable); if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(k => [k, stable(value[k])])); return value; }
function hash(ticket) { const copy = {...ticket}; delete copy.hash; return 'sha256:' + crypto.createHash('sha256').update(JSON.stringify(stable(copy))).digest('hex'); }
function sign(ticket) { ticket.hash = hash(ticket); return ticket; }
function base(type, decision, id, upstream = null) { return sign({ticket_type:type, decision, ticket_id:id, product_version:'0.9', model_version:'m0.9', map_version:'map-a', route_version:'route-a', config_hash:'cfg-a', upstream_ticket_hash:upstream, human_signoff:'named-review-role', issued_at:'2026-08-01T00:00:00Z', expires_at:'2027-08-01T00:00:00Z'}); }
function validDocument() {
  const test = base('Test Receipt','PASS','TR-001');
  const release = base('Release Ticket','PASS','RL-001',test.hash); Object.assign(release,{rights_complete:true,withdrawal_owner:'release-steward'}); sign(release);
  const verdict = base('Public Verdict','OPEN','PV-001',release.hash); Object.assign(verdict,{staffed_service:true,non_ai_equivalent:true}); sign(verdict);
  return {schema_version:'1.0.0',claim_level:'synthetic_protocol_evidence_only',events:[{state:'TEST_PENDING'},{state:'TEST_PASS',ticket:test},{state:'RELEASE_PASS',ticket:release},{state:'USE_PENDING'},{state:'USE_OPEN',ticket:verdict}]};
}
function clone(v) { return JSON.parse(JSON.stringify(v)); }
function fp(t) { return FINGERPRINT.map(k => t[k]).join('|'); }
function verify(doc, now = new Date('2026-08-13T00:00:00Z')) {
  const errors = [], ids = new Set(), hashes = new Set(), failures = [];
  let state = 'START', validTest = null, validRelease = null, returned = false;
  if (doc.claim_level !== 'synthetic_protocol_evidence_only') errors.push('claim_level must remain synthetic_protocol_evidence_only');
  if (!Array.isArray(doc.events) || !doc.events.length) return {ok:false,errors:['events must be a non-empty list'],final_state:null,failure_history:[]};
  doc.events.forEach((event, i) => {
    const next = event.state;
    if (!STATES.includes(next)) errors.push(`event[${i}]: unknown state ${next}`);
    if (!(TRANSITIONS[state] || []).includes(next)) errors.push(`event[${i}]: illegal transition ${state} -> ${next}`);
    const expected = EXPECTED[next], ticket = event.ticket;
    if (expected) {
      if (!ticket) errors.push(`event[${i}]: ${next} requires a ticket`);
      else {
        if (ticket.ticket_type !== expected[0] || ticket.decision !== expected[1]) errors.push(`event[${i}]: ticket type/decision does not match ${next}`);
        if (!ticket.human_signoff) errors.push(`event[${i}]: human signoff missing`);
        if (ticket.hash !== hash(ticket)) errors.push(`event[${i}]: ticket hash does not match canonical content`);
        if (ids.has(ticket.ticket_id)) errors.push(`event[${i}]: duplicate ticket id`); else ids.add(ticket.ticket_id);
        if (hashes.has(ticket.hash)) errors.push(`event[${i}]: duplicate ticket hash`); else hashes.add(ticket.hash);
        if (new Date(ticket.expires_at) <= now) errors.push(`event[${i}]: ticket expired`);
        if (next === 'TEST_FAIL') failures.push({ticket_id:ticket.ticket_id,hash:ticket.hash});
        if (next === 'TEST_PASS') { validTest = ticket; returned = false; }
        if (next.startsWith('RELEASE_')) {
          if (!validTest) errors.push(`event[${i}]: RELEASE requires a valid PASS Test Receipt`);
          else if (ticket.upstream_ticket_hash !== validTest.hash) errors.push(`event[${i}]: release upstream hash is broken`);
          if (validTest && fp(ticket) !== fp(validTest)) errors.push(`event[${i}]: configuration changed after TEST`);
          if (next === 'RELEASE_PASS' && (!ticket.rights_complete || !ticket.withdrawal_owner)) errors.push(`event[${i}]: incomplete rights must HOLD`);
          if (next === 'RELEASE_PASS') validRelease = ticket;
        }
        if (['USE_OPEN','USE_HOLD','RETURN'].includes(next)) {
          if (!validRelease) errors.push(`event[${i}]: USE requires a valid Release Ticket`);
          else if (ticket.upstream_ticket_hash !== validRelease.hash) errors.push(`event[${i}]: verdict upstream hash is broken`);
          if (validRelease && fp(ticket) !== fp(validRelease)) errors.push(`event[${i}]: route or configuration changed after RELEASE`);
          if (next === 'USE_OPEN' && (!ticket.staffed_service || !ticket.non_ai_equivalent)) errors.push(`event[${i}]: USE_OPEN requires staffed and non-AI equivalent service`);
          if (next === 'RETURN') {
            returned = true;
            if (ticket.rollback_status !== 'complete') errors.push(`event[${i}]: RETURN requires completed rollback`);
            if (ticket.complaint_trigger && !ticket.review_task_id) errors.push(`event[${i}]: complaint RETURN requires a review task`);
          }
        }
      }
    }
    if (next === 'RETEST') {
      if (!returned && state !== 'TEST_FAIL') errors.push(`event[${i}]: RETEST requires prior FAIL or RETURN`);
      if (returned && (!event.task_id || !event.trigger_ticket_hash)) errors.push(`event[${i}]: RETURN retest must link task and verdict hash`);
      validTest = validRelease = null;
    }
    state = next;
  });
  return {ok:errors.length===0,errors,final_state:state,failure_history:failures};
}
function returnPath(d) {
  const release = d.events[2].ticket;
  const ret = base('Public Verdict','RETURN','PV-RETURN-001',release.hash); Object.assign(ret,{rollback_status:'complete',complaint_trigger:true,review_task_id:'TASK-RETEST-001'}); sign(ret);
  d.events = [...d.events, {state:'RETURN',ticket:ret},{state:'RETEST',task_id:'TASK-RETEST-001',trigger_ticket_hash:ret.hash}];
}
function tests() {
  const cases = [];
  function add(name, mutate, expected=false) { const d=validDocument(); mutate(d); const result=verify(d); cases.push({name,expected_ok:expected,actual_ok:result.ok,pass:result.ok===expected,errors:result.errors}); }
  add('normal_path',()=>{},true);
  add('release_skips_test',d=>{d.events.splice(1,1);});
  add('test_receipt_used_as_release',d=>{d.events[2].ticket=clone(d.events[1].ticket);});
  add('release_ticket_used_as_verdict',d=>{d.events[4].ticket=clone(d.events[2].ticket);});
  add('missing_human_signoff',d=>{delete d.events[2].ticket.human_signoff; sign(d.events[2].ticket);});
  add('expired_ticket',d=>{d.events[1].ticket.expires_at='2026-01-01T00:00:00Z'; sign(d.events[1].ticket);});
  for (const [name,field] of [['product_version_changed','product_version'],['model_version_changed','model_version'],['map_changed','map_version'],['route_changed','route_version'],['config_changed','config_hash']]) add(name,d=>{d.events[2].ticket[field]+='-secret'; sign(d.events[2].ticket);});
  add('broken_upstream_hash',d=>{d.events[2].ticket.upstream_ticket_hash='sha256:broken'; sign(d.events[2].ticket);});
  add('rights_incomplete',d=>{d.events[2].ticket.rights_complete=false; sign(d.events[2].ticket);});
  add('withdrawal_owner_missing',d=>{delete d.events[2].ticket.withdrawal_owner; sign(d.events[2].ticket);});
  add('staff_absent',d=>{d.events[4].ticket.staffed_service=false; sign(d.events[4].ticket);});
  add('non_ai_equivalent_absent',d=>{d.events[4].ticket.non_ai_equivalent=false; sign(d.events[4].ticket);});
  add('verdict_hash_chain_broken',d=>{d.events[4].ticket.upstream_ticket_hash='sha256:broken'; sign(d.events[4].ticket);});
  add('valid_complaint_return_and_retest',returnPath,true);
  add('complaint_return_without_task',d=>{returnPath(d); delete d.events[5].ticket.review_task_id; sign(d.events[5].ticket);});
  add('rollback_failed',d=>{returnPath(d); d.events[5].ticket.rollback_status='failed'; sign(d.events[5].ticket);});
  add('illegal_use_after_return',d=>{returnPath(d); d.events.pop(); d.events.push({state:'USE_OPEN',ticket:clone(d.events[4].ticket)});});
  add('illegal_release_after_return',d=>{returnPath(d); d.events.pop(); d.events.push({state:'RELEASE_PASS',ticket:clone(d.events[2].ticket)});});
  add('technical_fail_cannot_release',d=>{const fail=base('Test Receipt','FAIL','TR-FAIL');d.events=[{state:'TEST_PENDING'},{state:'TEST_FAIL',ticket:fail},{state:'RELEASE_PASS',ticket:d.events[2].ticket}];});
  add('tampered_fail_history_not_overwritten',d=>{const fail=base('Test Receipt','FAIL','TR-FAIL');d.events=[{state:'TEST_PENDING'},{state:'TEST_FAIL',ticket:fail},{state:'TEST_PASS',ticket:d.events[1].ticket}];});
  return cases;
}
function arg(name) { const i=process.argv.indexOf(name); return i>=0?process.argv[i+1]:null; }
if (process.argv.includes('--self-test')) {
  const cases=tests(), report={schema_version:'1.0.0',claim_level:'deterministic_protocol_tests_not_field_validation',passed:cases.filter(x=>x.pass).length,total:cases.length,ok:cases.every(x=>x.pass),cases};
  const out=arg('--json-out'); if(out) fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');
  const example=arg('--write-example'); if(example) fs.writeFileSync(example,JSON.stringify(validDocument(),null,2)+'\n');
  console.log(`${report.passed}/${report.total} PASS`); process.exitCode=report.ok?0:1;
} else {
  const file=process.argv.find(x=>x.endsWith('.json')); if(!file) throw new Error('provide a lifecycle JSON or --self-test');
  const result=verify(JSON.parse(fs.readFileSync(file,'utf8'))); console.log(JSON.stringify(result,null,2)); process.exitCode=result.ok?0:1;
}
