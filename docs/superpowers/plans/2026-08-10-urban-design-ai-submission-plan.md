# Urban Design AI Submission Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, validate, and verify a complete formal submission package for the Centennial Jing-Zhang AI Innovation Belt urban design open call under `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/`.

**Architecture:** Scaffolds the submission package, populates structured narrative (`proposal.md`), creates spatial GeoJSON layers (`design_layers.geojson`), computes metrics (`metrics.json`) and evaluation matrices (`matrices/`), generates 5 figures (`figures/`) and 2 PDFs (`drawings/`), renders offline HTML (`proposal.html`), and verifies via official self-check & preflight scripts.

**Tech Stack:** Python 3 (shapely, pyproj, reportlab, matplotlib/pillow), GeoJSON (EPSG:4326 exchange, EPSG:4548 math), Jinja2/HTML5, Markdown, Git.

## Global Constraints

- **Submission Path**: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/`
- **Proposal Slug**: `jingzhang-ai-compute-green-axis`
- **Agent ID / PR Author**: `open-city-ai-participant`
- **Package Type**: `professional_design_package`
- **CRS**: `EPSG:4326` for GeoJSON export, `EPSG:4548` for metric calculations.
- **Strict Verification**: `self_check_submission.py` and `participant_preflight.py` MUST exit with code 0 (PASS).

---

### Task 1: Submission Scaffolding & Manifest Setup

**Files:**
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/manifest.json`
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/changelog.md`

**Interfaces:**
- Consumes: `scripts/scaffold_ai_submission.py`
- Produces: Initial scaffold directory and base `manifest.json`.

- [ ] **Step 1: Run scaffolding script**

Run:
```bash
python scripts/scaffold_ai_submission.py submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis --stage formal --agent-id open-city-ai-participant --agent-name "Antigravity AI Agent" --proposal-title "百年京张·智算双轴：AI原生基础设施与算力生态城市设计"
```

- [ ] **Step 2: Verify scaffold files created**

Run: `ls submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/`
Expected: `manifest.json`, `proposal.md`, `changelog.md`, `metrics.json`, etc.

- [ ] **Step 3: Update manifest metadata**

Edit `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/manifest.json`: Ensure `package_type` is set to `"professional_design_package"`, `proposal_slug` is `"jingzhang-ai-compute-green-axis"`, and `proposal_title_zh` is `"百年京张·智算双轴：AI原生基础设施与算力生态城市设计"`.

- [ ] **Step 4: Commit scaffold**

```bash
git add submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/
git commit -m "feat: scaffold urban design AI submission package"
```

---

### Task 2: Narrative & Text Proposal Synthesis (`proposal.md`)

**Files:**
- Modify: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/proposal.md`

**Interfaces:**
- Consumes: Spec requirements in `docs/superpowers/specs/2026-08-10-urban-design-ai-submission-design.md`
- Produces: `proposal.md` with complete Chinese narrative without any SCAFFOLD-DRAFT placeholders.

- [ ] **Step 1: Write full proposal narrative**

Populate `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/proposal.md` with the full Chinese narrative covering:
1. Executive Summary & Core Concept (算绿双轴·智算孪生城)
2. Three Positionings & Five Main Functions
3. Spatial Hierarchy & Scopes (Research 43.6 km², Overall 11.4 km², Key 3.684 km²)
4. Zhongzhiyuan Detailed Urban Design (192.1 ha, Underground Conduit, Heat Recovery, Green Mounds, Embodied AI testbed, 3D Streetscapes)
5. 10 AI Scenario Cards (`SC-01` to `SC-10`), 3 Testbeds (`TB-01` to `TB-03`), 5 Personas (`P-01` to `P-05`), 3 Landmarks (`LM-01` to `LM-03`)
6. Visual Identity & Logo Concept (Jingzhang AI Compute Valley / 京张智谷)
7. Operational & Implementation Strategy.

- [ ] **Step 2: Verify no SCAFFOLD-DRAFT markers remain**

Run: `grep -i "SCAFFOLD-DRAFT" submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/proposal.md`
Expected: Empty output (0 matches).

- [ ] **Step 3: Commit proposal narrative**

```bash
git add submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/proposal.md
git commit -m "docs: write comprehensive proposal narrative for Jingzhang AI submission"
```

---

### Task 3: GeoJSON Spatial Data Generation (`design_layers.geojson`)

**Files:**
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/design_layers.geojson`
- Helper script: `scripts/generate_proposal_geojson.py`

**Interfaces:**
- Consumes: `brief/site-package/geometry/provisional_boundaries.geojson`
- Produces: `design_layers.geojson` containing valid FeatureCollection with scopes, key areas, dual corridor lines, and 10 scenario point features in EPSG:4326.

- [ ] **Step 1: Create GeoJSON generation script**

Write a Python script `scripts/generate_proposal_geojson.py` that extracts/constructs valid polygons and features for:
- Scope Polygons: `coordinated_research_area`, `overall_design_area`, `key_detailed_design_area`
- Key Area Polygons: `zhongzhiyuan_ai_acceleration_area`, `beijing_ai_origin_community`, `dazhongsi_ai_industry_cluster`
- Linear Corridors: `underground_compute_conduit_axis`, `aboveground_green_railway_park_axis`
- Scenario Points: `SC-01` through `SC-10` and Landmarks `LM-01` through `LM-03`.

- [ ] **Step 2: Run GeoJSON generation script**

Run: `python scripts/generate_proposal_geojson.py submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/design_layers.geojson`
Expected: Successfully writes `design_layers.geojson`.

- [ ] **Step 3: Validate GeoJSON geometry syntax**

Run: `python -c "import json; d=json.load(open('submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/design_layers.geojson')); print(len(d['features']), 'features loaded')"`
Expected: Prints `15 features loaded` (or more).

- [ ] **Step 4: Commit GeoJSON layer**

```bash
git add submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/design_layers.geojson scripts/generate_proposal_geojson.py
git commit -m "feat: add design_layers.geojson spatial features"
```

---

### Task 4: Metrics & Evaluation Matrices Setup (`metrics.json` & `matrices/`)

**Files:**
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/metrics.json`
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/matrices/overall_comparison.json`
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/matrices/ai_scenarios_matrix.json`

**Interfaces:**
- Consumes: Metric calculation rules in `brief/site-package/schemas/`
- Produces: Valid JSON files for metrics and comparison matrices.

- [ ] **Step 1: Write metrics.json**

Create `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/metrics.json` containing:
- Area metrics (Research: 43.6 km², Overall: 11.4 km², Key: 3.684 km², Zhongzhiyuan: 1.921 km², AI Origin: 1.043 km², Dazhongsi: 0.72 km²)
- Performance metrics: 100% winter compute heat recycling, <1ms intra-cluster latency, 85%+ green microgrid ratio, 10 AI scenarios, 3 testbeds.

- [ ] **Step 2: Write evaluation matrices**

Create `overall_comparison.json` and `ai_scenarios_matrix.json` under `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/matrices/`.

- [ ] **Step 3: Commit metrics and matrices**

```bash
git add submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/metrics.json submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/matrices/
git commit -m "feat: populate submission metrics and evaluation matrices"
```

---

### Task 5: High-Resolution Figures & Presentation PDFs (`figures/` & `drawings/`)

**Files:**
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/figures/fig1_overall_masterplan.png`
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/figures/fig2_zhongzhiyuan_detail.png`
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/figures/fig3_compute_infrastructure.png`
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/figures/fig4_ai_scenarios.png`
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/figures/fig5_branding_landmarks.png`
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/drawings/A3_presentation_boards.pdf`
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/drawings/A0_masterplan_drawings.pdf`
- Script: `scripts/generate_proposal_figures_and_pdfs.py`

**Interfaces:**
- Consumes: Pillow / Matplotlib / ReportLab in Python.
- Produces: 5 non-zero PNG figures and 2 non-zero PDF presentation documents.

- [ ] **Step 1: Write figure & PDF generator script**

Create `scripts/generate_proposal_figures_and_pdfs.py` to programmatically render high-quality 1920x1080 diagrammatic PNG figures and multi-page vector A3/A0 PDFs containing masterplan diagrams, site layouts, compute architecture, scenario callouts, and branding designs.

- [ ] **Step 2: Execute figure & PDF generator**

Run: `python scripts/generate_proposal_figures_and_pdfs.py submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis`
Expected: Generates 5 PNG files in `figures/` and 2 PDF files in `drawings/`.

- [ ] **Step 3: Verify non-zero file sizes**

Run: `ls -lh submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/figures/ submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/drawings/`
Expected: All PNGs > 50KB, PDFs > 100KB.

- [ ] **Step 4: Commit figures and PDFs**

```bash
git add submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/figures/ submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/drawings/ scripts/generate_proposal_figures_and_pdfs.py
git commit -m "feat: generate high-resolution figures and A3/A0 presentation PDFs"
```

---

### Task 6: HTML Visualizer, Finalization & Self-Check Verification

**Files:**
- Create: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/proposal.html`
- Modify: `submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/manifest.json` (`package_state: ready_for_review`)

**Interfaces:**
- Consumes: `scripts/render_proposal_html.py`, `scripts/finalize_submission.py`, `scripts/self_check_submission.py`, `scripts/participant_preflight.py`.
- Produces: Rendered `proposal.html` and 100% PASS verification results.

- [ ] **Step 1: Render offline HTML visualizer**

Run: `python scripts/render_proposal_html.py submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis`
Expected: Successfully generates `proposal.html`.

- [ ] **Step 2: Finalize submission package**

Run: `python scripts/finalize_submission.py submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis`
Expected: Calculates file SHA256 hashes, sets `package_state` to `"ready_for_review"`, and updates `manifest.json`.

- [ ] **Step 3: Run self-check script**

Run: `python scripts/self_check_submission.py submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis --pr-author open-city-ai-participant`
Expected: Output ends with `Self-check PASSED` / Exit code 0.

- [ ] **Step 4: Run participant preflight check**

Run: `python scripts/participant_preflight.py submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis --pr-author open-city-ai-participant`
Expected: Output ends with `Preflight PASSED` / Exit code 0.

- [ ] **Step 5: Final Git Commit**

```bash
git add submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis/
git commit -m "feat: finalize submission package and pass self-check verification"
```
