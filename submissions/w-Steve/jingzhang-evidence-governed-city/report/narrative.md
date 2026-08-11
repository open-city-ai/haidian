# Bounded Evidence Note / 有界证据说明

## Street-Edge Proof Case

The research process used `Curb OS` as an internal historical name. Initial hypothesis: Fully Dynamic control might add value beyond simpler curb strategies.

Method: a deterministic optimiser compared Optimal Static, optimised 2/3-period Semi-Static, Restricted Adaptive, Adaptive with execution burdens, and parameterised Simple Fixed interventions under matched synthetic demand. Negative controls and structured sensitivity covered module size, forecast error, holding, switching and execution failure.

Result: P4-SIM adjudicated `SEMISTATIC_SIM_PREFERRED`; `DYNAMIC_SIM_SUPPORT` structured regions = 0; capacity-limited regions = 69/135. Hard Rights violations = 0 in the audited experiment.

Design implication: use static management when sufficient; use a few stable time-of-day states only when repeated temporal differences justify them; when protected rights plus simultaneous demand exceed capacity, stop scheduling and consider physical redesign.

Limit: synthetic / desk-proxy mechanism evidence only. P4-FIELD remains `BLOCKED_PENDING_FIELD_DATA`. This is not evidence that Wudaokou or any Jing-Zhang street should deploy a specific strategy.

<!-- P7.2:DELIVERY-NOTE:START -->
## P7.2 evidence-to-delivery revision

The reviewer-facing package now exposes five conceptual regional exchange interfaces, ten scenario delivery contracts and six stoppable work packages. Each work package declares role classes, required permission/resource classes, a baseline gate, acceptance logic, stop conditions and rollback. Named responsible institutions, partnerships, budget and authorization remain unassigned.

This revision improves taskbook traceability and implementation legibility without changing the research result: Fully Dynamic remains rejected as the core strategy, P4-SIM remains `SEMISTATIC_SIM_PREFERRED`, and P4-FIELD remains blocked pending real evidence. The intentionally empty `constraints.geojson` is treated as a missing verified spatial-constraint layer, not cited as if it contained known site constraints.
<!-- P7.2:DELIVERY-NOTE:END -->

## Evidence and stakeholder status

- Field visit: NONE
- Formal resident interview: NONE
- Formal stakeholder consultation: NONE
- Real OD data: NONE
- Verified curb rules: insufficient
- Verified legal flexible capacity: NONE
- Public / desk evidence: available, limited
- Synthetic mechanism evidence: available

Design personas are not survey respondents. File and deterministic validation establish artifact integrity only; they do not establish planning validity, social legitimacy, implementation approval, or resident acceptance.
