# 方案迭代记录

## v1.0 - 2026-08-09

- Created an independent enterprise–resident mobility submission package.
- Replaced autonomy-first narrative with demand ledger, curb states, rail/bus feeder logic and four service levels.
- Added Beijing transport and Haidian parking-service evidence, employer TDM and curb-management research.
- Regenerated bilingual figures, offline visual pages and A3/A0 boards.

## v1.2 - 2026-08-09

- Added an explicit multi-agent queue/network sandbox for residents, enterprise employees, carers/children, visitors, logistics, night workers, metro trains, buses, bicycles, cars, walking/wheelchair flows and the gated air candidate.
- Added synthetic, clearly non-local readouts for queues, station load, transfer wait and curb service, with a calibration list for dated OD, headways, capacity, signals, conflicts and accessibility.
- Refreshed the simulation and evidence boards and added bilingual model-object diagrams with readable units, thresholds, status gates and source notes.

## v1.3 - 2026-08-09

- Added inspectable trip-leg templates for external enterprise commuting, resident services, shuttle transfers, logistics windows and ground-first air fallback.
- Added a dependency-free deterministic runner at `visual/assets/run-mobility-simulation.js`; it recalculates grouped mode shares, service supply, one-minute queues and calibration fields without network access.
- Added activity/agent-based multimodal and grouped accessibility method references; formal calibration now calls for mode share, road/curb volume, door-to-door time, distance and distributional access checks rather than a single efficiency score.

## v1.4 - 2026-08-09

- Added machine-readable `model_family` and `model_detail` disclosure fields while retaining the legacy `model` field for compatibility.
