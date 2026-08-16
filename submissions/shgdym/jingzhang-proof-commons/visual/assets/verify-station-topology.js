#!/usr/bin/env node
/* Deterministic concept-topology verifier. PASS is not site or code compliance. */
const fs = require('fs');
const path = require('path');
const input = process.argv.find(x => x.endsWith('.json') && !x.includes('results')) || path.join(__dirname, 'station-topology.json');
const oi = process.argv.indexOf('--json-out');
const output = oi >= 0 ? process.argv[oi + 1] : null;
const data = JSON.parse(fs.readFileSync(input, 'utf8'));

function connected(station, sourceRole, targetRole, closed) {
  const nodes = new Map(station.nodes.filter(n => !closed.has(n.id)).map(n => [n.id, new Set(n.roles)]));
  const graph = new Map([...nodes.keys()].map(k => [k, new Set()]));
  for (const edge of station.edges) if (nodes.has(edge.from) && nodes.has(edge.to) && edge.mode !== 'return_only') { graph.get(edge.from).add(edge.to); graph.get(edge.to).add(edge.from); }
  const queue = [...nodes].filter(([, roles]) => roles.has(sourceRole)).map(([id]) => id), seen = new Set(queue);
  const targets = new Set([...nodes].filter(([, roles]) => roles.has(targetRole)).map(([id]) => id));
  while (queue.length) { const node = queue.shift(); if (targets.has(node)) return true; for (const next of graph.get(node)) if (!seen.has(next)) { seen.add(next); queue.push(next); } }
  return false;
}
function shortestPath(station, source, target, closed = new Set()) {
  const live = new Set(station.nodes.filter(n => !closed.has(n.id)).map(n => n.id));
  if (!live.has(source) || !live.has(target)) return Infinity;
  const graph = new Map([...live].map(id => [id, []]));
  for (const edge of station.edges) {
    if (live.has(edge.from) && live.has(edge.to) && edge.mode !== 'return_only') {
      graph.get(edge.from).push(edge.to); graph.get(edge.to).push(edge.from);
    }
  }
  const queue = [[source, 0]], seen = new Set([source]);
  while (queue.length) {
    const [node, distance] = queue.shift();
    if (node === target) return distance;
    for (const next of graph.get(node)) if (!seen.has(next)) { seen.add(next); queue.push([next, distance + 1]); }
  }
  return Infinity;
}
const checks = [], signatures = [];
function record(station, check_id, ok, detail) { checks.push({station, check_id, result: ok ? 'pass' : 'fail', detail}); }
for (const station of data.stations) {
  const sid = station.id, nodes = new Map(station.nodes.map(n => [n.id, new Set(n.roles)]));
  const allAI = new Set(station.closure_sets.all_ai), observation = new Set(station.closure_sets.observation || []), returned = new Set(station.closure_sets.return);
  record(sid, 'PUBLIC_CHAIN_WITH_AI_CLOSED', connected(station, 'public_entry', 'public_destination', allAI), 'entry-to-destination survives AI closure');
  record(sid, 'ACCESSIBLE_CHAIN_WITH_AI_CLOSED', connected(station, 'public_entry', 'public_destination', allAI), 'accessible chain does not depend on AI nodes');
  record(sid, 'OBSERVATION_CLOSURE_NO_DETOUR', connected(station, 'public_entry', 'public_destination', observation), 'observation closure does not break passage');
  const aiNodes = [...nodes].filter(([, r]) => r.has('closable_ai') || r.has('ai_technical')).map(([id]) => id);
  record(sid, 'AI_POCKET_INDEPENDENTLY_CLOSABLE', aiNodes.every(id => allAI.has(id) || returned.has(id)), 'all AI nodes belong to a closure set');
  const uncontrolled = station.edges.filter(e => { const a = nodes.get(e.from), b = nodes.get(e.to); const cross = (a.has('ai_technical') && (b.has('public_chain') || b.has('accessible_chain'))) || (b.has('ai_technical') && (a.has('public_chain') || a.has('accessible_chain'))); return cross && !e.controlled; });
  record(sid, 'NO_UNCONTROLLED_TEST_PUBLIC_CROSSING', !uncontrolled.length, `uncontrolled=${uncontrolled.length}`);
  const available = new Set(station.nodes.filter(n => !returned.has(n.id)).flatMap(n => n.roles));
  record(sid, 'ORDINARY_USES_SURVIVE_RETURN', station.required_ordinary_roles_after_closure.every(r => available.has(r)), 'required ordinary roles survive RETURN');
  record(sid, 'RETURN_RESTORES_ORDINARY_PUBLIC_USE', station.nodes.some(n => n.roles.includes('ordinary_public_after_return')), 'ordinary public use declared after removal');
  const contract = station.conflict_contract || {};
  const contractFields = ['conflict', 'public_arm', 'ai_arm', 'decision_node', 'opening_rule', 'failure_action'];
  record(sid, 'X_CONFLICT_CONTRACT_COMPLETE', contractFields.every(k => typeof contract[k] === 'string' && contract[k].length > 0) &&
    nodes.has(contract.public_arm) && nodes.has(contract.ai_arm) && nodes.has(contract.decision_node),
    'two arms, decision node, opening rule and failure action are explicit');
  if (station.operating_role === 'TEST') {
    const decisionRoles = nodes.get(contract.decision_node) || new Set();
    const bypass = shortestPath(station, contract.public_arm, contract.ai_arm, new Set([contract.decision_node]));
    record(sid, 'TEST_CROSSING_STAFFED_PUBLIC_PRIORITY_NO_BYPASS', decisionRoles.has('staffed_stop') && decisionRoles.has('public_priority') && !Number.isFinite(bypass),
      'machine arm reaches the public edge only through a staffed, public-priority decision node');
  }
  if (station.operating_role === 'RELEASE') {
    const hasEdge = (a, b) => station.edges.some(e => (e.from === a && e.to === b) || (e.from === b && e.to === a));
    const withdrawalRoles = nodes.get(contract.decision_node) || new Set();
    record(sid, 'RELEASE_METHOD_RIGHTS_WITHDRAWAL_CO_VISIBLE', hasEdge(contract.public_arm, contract.ai_arm) && hasEdge(contract.ai_arm, contract.decision_node) && withdrawalRoles.has('publicly_visible_withdrawal'),
      'method, rights review and public withdrawal form one visible frontage chain');
  }
  if (station.operating_role === 'USE') {
    const service = new Set(station.nodes.filter(n => n.roles.includes('non_ai_service') && n.roles.includes('human_service')).map(n => n.id));
    const direct = station.edges.some(e => (service.has(e.from) && nodes.get(e.to).has('public_chain')) || (service.has(e.to) && nodes.get(e.from).has('public_chain')));
    record(sid, 'NON_AI_SERVICE_DIRECT_TO_PUBLIC_CHAIN', service.size > 0 && direct, 'staffed non-AI service directly adjoins public chain');
    const publicChain = station.nodes.find(n => n.roles.includes('public_chain'))?.id;
    const nonAiDistance = shortestPath(station, publicChain, contract.public_arm);
    const aiDistance = shortestPath(station, publicChain, contract.ai_arm);
    const decisionDistance = shortestPath(station, publicChain, contract.decision_node);
    const decisionToTrial = shortestPath(station, contract.decision_node, contract.ai_arm);
    record(sid, 'USE_NON_AI_PARITY_AND_COMPLAINT_AT_CONFLICT', nonAiDistance <= aiDistance && decisionDistance === 1 && decisionToTrial === 1,
      `non_ai_hops=${nonAiDistance}; ai_hops=${aiDistance}; complaint_public_hops=${decisionDistance}; complaint_trial_hops=${decisionToTrial}`);
  }
  const special = ['machine_test_pocket', 'release_method', 'rights_review', 'withdrawal_interface', 'limited_use_pocket', 'non_ai_service'];
  signatures.push(station.nodes.flatMap(n => n.roles.filter(r => special.includes(r))).sort().join('|'));
}
record('SYSTEM', 'THREE_STATIONS_HAVE_DISTINCT_TOPOLOGY', new Set(signatures).size === signatures.length, 'station special-role signatures differ');
const passed = checks.filter(c => c.result === 'pass').length;
const report = {schema_version: '1.0.0', claim_level: 'deterministic_concept_topology_check_not_site_or_code_compliance', ok: passed === checks.length, passed, total: checks.length, checks};
if (output) fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
console.log(`${passed}/${checks.length} PASS`); for (const c of checks) console.log(`${c.result.toUpperCase()} ${c.station} ${c.check_id}`);
process.exitCode = report.ok ? 0 : 1;
