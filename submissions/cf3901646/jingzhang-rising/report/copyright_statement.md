# Asset Rights and Copyright Statement

## 1. Scope and responsibility

Author and submitting account: `cf3901646`. Producing agent: the AI agent declared in `agent.json`.

This ledger covers **every one of the 49 files** in `submissions/cf3901646/jingzhang-rising/`. It is written to be checked, not to be trusted: each row names the actual production method so that a reviewer can re-derive the asset from the package itself.

This package is a **conceptual design submission**. It contains no commissioned photography, no aerial or satellite imagery, no map tiles, no third-party logos or trademarks, no portraits or identifiable persons, no proprietary or licensed datasets, no CAD or survey drawings, no purchased templates, and no remote web assets. Nothing in this package is an official planning approval, a statutory redline, or a government commitment.

If contrary evidence is found for any item below, the submitter will correct or remove that item.

## 2. Asset ledger

| Files | Author / production method | Source and clearance basis | Reuse restriction |
| --- | --- | --- | --- |
| `proposal.md`, `proposal.en.md` | Original bilingual design narrative written for this submission by the declared AI agent under author direction. Both languages are natively written, not machine round-tripped. | Factual inputs limited to the seven public organizer entries registered in `sources.json` (`SITE-PACKAGE`, `SOURCE-REGISTRY`, `PROCESSED-FACT-PACK`, `BOUNDARY-SOURCE`, `KEY-AREA-SOURCE`, `OFFICIAL-ANNOUNCEMENT`, `AGENT-TASKBOOK`), plus publicly published historical facts cited inline. No text is copied from another submission, publication, or website. | `COMMUNITY-DISPLAY-ONLY`. Do not present as approved planning. |
| `geometry/*.geojson` (9 layers: site boundary, key areas, land use, buildings, roads, green space, public space, constraints, phasing) | Agent-generated conceptual geometry, constructed locally with Shapely and reprojected with PyProj. No imported survey, cadastral, CAD, or commercial GIS layer. | Boundary input is `brief/site-package/geometry/provisional_boundaries.geojson`, registered in `sources.json` as **provisional**. Every layer carries `official_boundary: false` and `geometry_role: "provisional_constraint"`. | Provisional and discussion use only. **Not** an official redline, statutory control, precise-area basis, engineering survey, or property record. |
| `metrics.json`, `assumptions.json`, `self_check.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`, `manifest.json`, `agent.json`, `sources.json` | Machine-derived. All 33 metrics are back-computed from the GeoJSON layers above in EPSG:4548; three values that cannot be derived are recorded as `status: unknown` rather than estimated. | Derived solely from this package's own geometry. Independently reproducible by a third party from the shipped layers. | Figures are conceptual outputs of provisional geometry; do not quote as surveyed quantities. |
| `assets/figures/*.png` (10 files, 5 plates x zh/en) | Original diagrams rendered locally with Matplotlib directly from this package's GeoJSON and metrics. Vector-style drawing only - **no photographic layer, no downloaded image, no scanned material, and no AI image-generation model was used at any point.** | Derived only from package geometry, package metrics, and the public task inputs in `sources.json`. | Same display-only license. Do not crop out the provisional-boundary or data-source notes. |
| `drawings/a3-booklet.pdf`, `a3-booklet.en.pdf`, `a0-boards.pdf`, `a0-boards.en.pdf` | Original PDF page layouts composed locally by Matplotlib's PDF backend from the figures above. | No imported drawing, CAD file, map, photograph, standalone font file, or commercial layout template. | Same display-only license. Printed output remains conceptual and provisional. |
| `report/proposal.html`, `report/proposal.en.html`, `visual/index.html`, `visual/index.en.html` | Original static HTML with inline CSS and inline SVG, assembled locally. | **Zero remote dependencies**: no CDN, no external script, no web font, no remote map tile, no iframe, no analytics or tracking, no network request of any kind. Opens correctly from a local filesystem with networking disabled. | Same display-only license. |
| `assets/media/film.mp4`, `film.en.mp4` (75 s each) | Original motion graphics. Every frame is drawn programmatically by Matplotlib from **the same geometry layers and palette as the static figures**, then encoded frame by frame. Cue-aligned narration is synthesised from the registered transcript as disclosed below. No stock footage, filmed material, third-party clip, motion template, generative video model, sampled sound or cloned voice is used. | Derived only from package geometry and package text; narration uses the exact supplied transcript. | Same display-only license. |
| `assets/media/film.vtt`, `film-en.vtt`, `film-transcript.md`, `film-transcript-en.md` | Original captions and transcripts, authored to match the narration and on-screen text. | Written for this submission. Provided so the content survives when audio or video cannot be played. | Same display-only license. |
| `assets/media/film-poster.png`, `film-poster-en.png`, `assets/media/cover.png` | Original still frames and cover plate rendered by the same local Matplotlib pipeline. | Derived only from package geometry and package text. | Same display-only license. |
| Name, wordmark and graphic system - "Jingzhang Rising", the ascending stroke motif, the 1909-1949-1980-2026 origin sequence, the colour palette, node codes and wayfinding wording | Original conceptual naming and graphic wording created for this submission. | No third-party mark, logo, mascot, typeface design, character, photograph, or registered trademark is incorporated. The character-form motif is used as a **public historical and typographic reference**, not as a copy of any existing identity. | Do not imply sponsorship, trademark registration, exclusivity, or organizer endorsement. |

## 3. Audio disclosure

Both films contain **synthetic narration only**: the Chinese film uses Microsoft `zh-CN-YunyangNeural` (professional/news male voice) and the English film uses Microsoft `en-US-AndrewNeural` (warm/confident male voice), rendered at build time through the open-source `edge-tts` client. The narration is generated cue by cue from the exact text in `film.vtt` / `film-en.vtt`, then locally aligned, compressed and loudness-normalised before AAC encoding.

- No human voice was recorded, imitated or cloned; no biometric voice sample was supplied.
- No music, sampled recording, ambient sound or sound effect is present.
- No voice model, service credential or TTS software is redistributed; only the rendered narration inside the two MP4 files is submitted.
- The WebVTT captions and full transcripts remain equivalent fallbacks, and the films do not autoplay.
- The rendered voice output is non-exclusive and makes no claim of performer endorsement or ownership of the underlying synthetic voice.

## 4. Typeface disclosure

All rendered text - figures, PDFs, films, posters and cover - was typeset with **Microsoft YaHei** (`msyh.ttc`) and **Microsoft YaHei Bold** (`msyhbd.ttc`), read at render time from the local Windows system font directory of the build machine. No other typeface was used for rendered raster or PDF output.

Precise position:

- **No font file is redistributed.** No `.ttf`, `.ttc`, `.otf`, `.woff` or `.woff2` file is included anywhere in this package.
- **PNG, MP4 and poster output contains no font data at all** - glyphs are rasterised to pixels during rendering.
- **PDF output embeds only the glyph subset** required to display this document, which is the ordinary document-embedding use these OS-bundled fonts are supplied for. The typeface itself is not licensed, sublicensed, or made extractable for reuse by this package.
- **HTML output requests no web font.** It declares a CSS fallback stack of locally installed families (`Microsoft YaHei`, `PingFang SC`, `Hiragino Sans GB`, `Segoe UI`, `system-ui`, `sans-serif`) and downloads nothing; each reader's own installed fonts are used.

Anyone rebuilding this package on a machine without Microsoft YaHei should substitute an openly licensed CJK family (for example Noto Sans CJK / Source Han Sans, SIL Open Font License 1.1). Layout does not depend on the specific typeface.

## 5. Software and build-chain notices

The package was built locally with Python and the following open-source libraries, used strictly as **build-time tools**: Matplotlib (rendering of figures, PDFs and film frames), Shapely (geometry construction), PyProj (EPSG:4548 reprojection), NumPy (numeric arrays), `edge-tts` (requesting the disclosed synthetic narration), and `imageio-ffmpeg` (supplying the FFmpeg binary used to encode and master the two MP4 files).

- None of these libraries, their source code, their bundled fonts, their binaries, or their brand assets are redistributed in this submission. Only the rendered output is submitted.
- The FFmpeg binary supplied by `imageio-ffmpeg` was executed as an external encoder on the build machine and is **not** included in the package.
- The two MP4 files carry H.264 video plus mono AAC narration in a fast-start MP4 container with `yuv420p` pixel format, chosen for broad browser and offline playback. No codec implementation is redistributed here; only the encoded output is submitted.
- No third-party code is executed by any delivered HTML file.

## 6. Sources, standards and citation limits

`sources.json` registers seven organizer-published inputs. Citing a public standard, an official announcement, or an organizer material does **not** transfer copyright in that material and does not authorise republication beyond the conceptual use declared here. Where a standard is referenced for design-depth purposes without a verified public source, it is recorded as such in `sources.json` and `standard_matrix.json` rather than being claimed as cleared.

No classified, internal, personal, private, or non-public spatial data is included. No official endorsement, approval outcome, statutory conclusion, or implementation commitment is claimed or implied anywhere in this package.

## 7. Verification and removal rule

Before any reuse outside this submission, verify the current source, licence, attribution, and applicable organizer terms for the specific asset. **Remove or replace any asset whose authorship, source, or reuse right cannot be demonstrated from this package.** The submitter will act on any substantiated rights objection without requiring the objector to prove damage.
