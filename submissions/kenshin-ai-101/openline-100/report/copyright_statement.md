# Copyright & Generation Provenance Statement

All submitted text, geometry, diagrams, PDFs, and static HTML assets are authored by Openline 100 Studio (agent `kenshin-ai-101`) or use cleared public / user-provided / open-licensed sources listed below and in `sources.json`. This statement is the itemized rights ledger requested by review: every category lists license, attribution, redistribution right, and restrictions.

## 1. OpenStreetMap basemap (ODbL)

- **What is used:** community-sourced fabric (buildings / roads / greens / waters / rails) covering approx. Xizhimen (S) → North 5th Ring & Qinghe (N), Wanquanhe Rd (W) → G6 (E); snapshot 2026-08; processed by `tools/openline-100/figs-v1.2/fetch_osm.py` → `osm_cache/` → `prepare_basemap.py`.
- **License:** Open Data Commons Open Database License (ODbL 1.0). Figures are Produced Works under ODbL 4.3: attribution is printed on every basemap figure footer and on A3 plate pages ("Base map © OpenStreetMap contributors").
- **Redistribution:** no OSM database or derived database is redistributed; only rendered figure pixels ship. Source card: `sources.json#OSM-BASEMAP-202608`.
- **Restriction honored:** OSM geometry is never presented as statutory or surveyed geometry.

## 2. Typefaces (SIL OFL 1.1)

- **Noto Sans SC Regular / Bold** (bundled with the managed Python runtime; SIL Open Font License 1.1, no Reserved Font Name):
  - subset-embedded by reportlab into `drawings/*.pdf` (build toolchain `HGB` / `HGB-B`);
  - subset-embedded as WOFF (base64) into `report/proposal.html` and `visual/index.html` by `tools/openline-100/embed_cjk_font.py`, so the offline HTML renders on machines without CJK fonts; the embedded subset is renamed `OpenlineEmbeddedSC` (OFL has no Reserved Font Name here, and renaming avoids any confusion with the original font);
  - the English HTML files (`report/proposal.en.html`, `visual/index.en.html`) embed the same renamed subset for Latin/punctuation glyphs, fixing missing-glyph rendering in font-poor review environments.
- **OFL compliance:** subsetting, embedding, and redistribution inside documents are permitted; the fonts are not sold standalone; this statement is the attribution. Original full fonts are not redistributed. The full OFL 1.1 text is incorporated by reference from its canonical source: SIL International, "SIL Open Font License, Version 1.1" (scripts.sil.org/OFL); it is not reproduced here to avoid transcription drift.
- **Matplotlib figure text:** rendered to raster pixels at export; whichever system CJK font matplotlib selects (e.g. Hiragino Sans GB on macOS) is never redistributed as a font file—only pixels ship.

## 3. Images, icons, diagrams

- All figures in `assets/figures/` are generated locally by this package's own scripts (`tools/openline-100/figs-v1.2/*.py`) under the Sasaki-style visual spec whose full text is written into the proposal's own infographic-spec section; no Sasaki assets, photos, or trademarks are used.
- No external photographs, icons, stock imagery, or web-fetched media appear anywhere in the package. Human figures, trees, and textures are programmatic vector/watercolor primitives.
- `visual/index.html` and `report/*.html` are fully offline: no CDN, remote tiles, external fonts (beyond the embedded OFL subset), iframes, or APIs.

## 4. Generation models and tools

- Text, code, and design concepts are co-authored by AI agents (Cursor Composer; Kimi / Moonshot AI Work runtime) under human direction, as declared in `agent.json`. No third-party copyrighted text is reproduced; case-study and news facts are paraphrased with citation markers.
- Rendering stack: matplotlib / reportlab / fontTools (BSD/MIT/PSF-family permissive licenses) inside the managed runtime; official competition scripts (`scripts/*.py`) are used unmodified for rendering, manifest, and validation.

## 5. Third-party names and materials

- Global ecosystem case names (22@Barcelona etc.) and publisher names (People.cn, Beijing Daily, Capital Window) appear for nominative, factual, mechanism-discussion purposes only; no trademark license is implied.
- News-derived planning facts are background / pending-review evidence per `sources.json` (`package_usability: background_pending_registry_review`) and are never used alone for statutory claims.

## 6. Original work

- Concept title «何以京张：The Openline 100», the Openline / Open Ticket system, all narratives, geometry layers, and figures are original to this package.
- Site and key-area footprints derive from repository provisional geometry (`DATA-SRC-PROVISIONAL-BOUNDARIES-20260605`); they are not official redlines.
- Package license: `COMMUNITY-DISPLAY-ONLY` (see `proposal.md` front matter)—display and review within the competition context; other reuse requires the authors' written consent.
