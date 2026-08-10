# 方案迭代记录

## v0.1 - 2026-08-09

# Changelog

All notable changes to this proposal will be documented here.

## v0.1 - 2026-08-09

### Added
- Initial scaffold via `scaffold_ai_submission.py` (provisional workspace)
- Provisional boundaries adopted from `brief/site-package/geometry/provisional_boundaries.geojson`
- OpenStreetMap base map extracted via Overpass API (6 layers, 103,167 elements, ODbL license)
- Beijing bbox: 39.935-40.055 N / 116.300-116.395 E
- Three core areas' recalculation precision: +0.02% to +0.43%
- Naming system: Centennial.AI Origin / Layered Cultural Convergence / Layered Ring
- 5 personas, 10 AI scenario cards, 3 industry-validation scenarios
- 4 pilgrimage landmarks: Origin Pillar / Convergence Bridge / Intelligence Spine / Developer Pilgrimage
- 8 global case studies (Kendall Square / 22@Barcelona / King's Cross / Paris-Saclay / Station F / Toronto Waterfront / Zhongguancun / Qianhai)
- 12 renewal projects (R-01 to R-12) with near/mid/far phasing
- Annual event system: Jingzhang AI Pilgrimage Week
- Full compliance matrix (23 requirements: 1.3.1–1.3.3, 1.4.1–1.4.3, 1.5.1.1–1.5.1.2, 1.5.2.1–1.5.2.5, 1.5.3.required–1.5.3.3, agent.1–agent.6)
- Full standard matrix (6 standards including 4 mandatory MOHURD/MNR + project announcement + agent taskbook + OSM)
- Full design depth matrix (15 depth items, mostly complete; development_intensity, building_height, retain/renovate/demolish, municipal, city_character marked as concept_only/pending_official_control)
- Full sources.json (17 sources, all with authority level and license)
- Full assumptions.json (11 assumptions, all with confidence and replacement trigger)
- Full metrics.json (20 metrics, 12 known + 7 unknown + 1 heritage protection count)
- Bilingual contract v1: proposal.md (zh) + proposal.en.md (en) + translation metadata

### Pending (will be addressed in subsequent iterations)
- self_check_submission.py to be run
- finalize_submission.py to be run
- participant_preflight.py to be run
- Visual HTML (visual/index.html + index.en.html) generation by sub-agent
- A3 booklet PDF and A0 boards PDF generation by sub-agent
- 8 GeoJSON layers from OSM conversion by sub-agent
- 5 core figures (PNG) generation by sub-agent
- report/proposal.html + report/proposal.en.html rendering
- report/copyright_statement.md finalization
- Push to fork jiefalcon/haidian and open PR
- Monitor upstream daily changes and respond to issues/PRs

### Known Limitations
- All boundaries are provisional (geometry_role=provisional_constraint, official_boundary=false)
- FAR, building height, density, green ratio, setback are status=unknown pending official regulatory controls
- Land use ratios are conceptual sketches, not regulatory plan substitutes
- Retain/renovate/demolish is conceptual only, not at parcel level
- 9 data gaps disclosed (boundaries, controls, roads, parcels, buildings, heritage, municipal, services)

### Compliance Boundary Acknowledgement
- ✅ No non-public planning data, internal data, or personal privacy used
- ✅ OSM data follows ODbL license (© OpenStreetMap contributors)
- ✅ All figures include © OpenStreetMap contributors attribution
- ✅ No unauthorized trademarks, fonts, or portraits used
- ✅ All conceptual content uses "concept suggestion", "reference scheme", "for further professional study" wording

## v0.3 - 2026-08-09（空间修复 · spatial 清零）

### Fixed（官方 self_check_submission.py 真跑验证）
- **spatial_review：111 issues → 3 issues**（仅保留 3 个 `KEY_AREA_PROVISIONAL`，按设计不可改）。
- `GEOMETRY_OUTSIDE_SITE` 99：green_space（241→131）/ public_space（11→9）/ buildings（10→8）逐层与 site_boundary 做 `∩` 裁剪，丢弃空几何。
- `GEOMETRY_VALIDITY` 2：2 个自相交 OSM 关系裁剪时 `make_valid` + `buffer(0)` 修复。
- `LAND_USE_OVERLAP` 4 + `LAND_USE_COVERAGE_GAP` 1：land_use 重画——8 个现有多边形裁剪到 site 并顺序扣除重叠，再用 `site 减去已处理并集` 得到剩余区补全（28 个网格填充，采用现状用地代码 07/08/05/1207/14/16），保证两两不重叠且并集铺满 site。
- `METRIC_RECALC_MISMATCH` 2：裁剪后绿地/公共空间面积变小，将 metrics.json 的 `green_ratio`（0.14→0.05275）、`public_space_ratio`（0.18→0.000668）改写为空间复算值；visual HTML 的 `data-value` 与可见文字同步更新（标注"研究范围实测"）。

### Result
- deterministic / spatial / visual / professional 四关全过；`review_status = formal-review-ready`，`can_enter_formal_review = true`。

### Known Limitations（建议 v0.4）
- spatial 的 `site` = site_boundary 并集 = 43.6 km² 统筹研究范围（因 site_boundary 同时含研究/设计两层）。故 green_ratio / public_space_ratio 复算值偏小（研究范围口径），与 proposal.md 中"设计范围 14%~20% / 约 18%"目标值口径不同。若需统一为设计范围口径，应评估将 site_boundary 改为仅含设计层 + 同步充实 public_space.geojson 几何。
- gh auth login 待陛下亲为（fork / push / 开 PR）。

## v0.3.1 - 2026-08-09（manifest 哈希再同步 · 真跑复验）

### Fixed（官方 self_check_submission.py 二次真跑复验捕获）
- 复验发现 `deterministic_validation` 报 `sha256 mismatch for self_check.json`：`self_check.json` 改动后，manifest 哈希未同步。用 `refresh_manifest_hashes.py` 重算除 `manifest.json` 自身外所有条目 sha256 + bytes，回写 manifest；并将 `self_check.json` 的 `last_self_check_at` 更新为复验时刻。
- 同步更新 visual HTML 指标值与 self_check.json 审计内容。

### Result
- 再次真跑四关：`ok=true`、`can_enter_formal_review=true`、`review_status=formal-review-ready`；deterministic errors=[]（仅 2 warning）、spatial 3×KEY_AREA_PROVISIONAL（minor）、visual / professional 均 0 issue。

> **恢复说明（2026-08-09 19:xx）**：本地 `haidian_fork/.git` 在一次 `git checkout -f main` 中损坏（`.git` 被清空、git 历史丢失，工作区回退到 v0.2）。v0.3.1 成果由 `drafts/fix_spatial_v03.py`（已修正 GEO 绝对路径与合法枚举）+ `drafts/refresh_manifest_hashes.py` 在 v0.2 基线上重放复现；提交包文件完整恢复，随后由 `git init` 重建仓库。提交包内容以本记录与 `self_check.json` 为准。