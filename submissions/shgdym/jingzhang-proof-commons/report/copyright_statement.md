# Copyright and Source Statement

## Rights status

The four realistic concept images previously present at this path had no verifiable generation-service or rights metadata. On 2026-08-24 they were removed and replaced in full. No pixel from those earlier files is retained in the four current source images or in their current derivatives.

The replacement images were created from text-only prompts with the OpenAI built-in image-generation tool in Codex. The tool did not expose a model identifier, so the model field remains `unknown` rather than being guessed. No third-party photograph, reference image, logo, map tile or private site material was supplied as an input. Every replacement was reviewed by a person and received an embedded bilingual disclosure before derivative layouts were rebuilt.

The rights basis is the [OpenAI Terms of Use effective 2026-01-01](https://openai.com/policies/terms-of-use/): as between the user and OpenAI, the user retains rights in Input and owns Output to the extent permitted by applicable law. The [OpenAI Sharing & Publication Policy](https://openai.com/policies/sharing-publication-policy/) is also recorded because it requires clear disclosure of AI involvement and human review. These terms support submission display and repository redistribution, but they do not guarantee copyrightability, uniqueness, non-infringement, factual accuracy or planning approval. The participant remains responsible for the published use.

## Generative asset register

| Asset path | Asset type | Creation method | Generation service | Model | Generation date | Source inputs | Post-processing | Rights basis | Redistribution status | Evidence status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `assets/figures/site-overview.png` | Realistic aerial concept image | Text-to-image | OpenAI built-in image generation in Codex | `unknown` - not surfaced by tool | 2026-08-24, Asia/Shanghai | Text prompt only; no third-party image input | Human review; Pillow 12.2.0 disclosure strip; pngquant 2.12.5 palette compression; no photo compositing | OpenAI Terms of Use effective 2026-01-01; Sharing & Publication Policy | Permitted for this submission and repository distribution subject to the recorded terms and applicable law | `CLOSED_FOR_SUBMISSION_USE_WITH_DISCLOSED_LIMITS` |
| `assets/figures/experience-zhongzhi.png` | Realistic station concept image | Text-to-image | OpenAI built-in image generation in Codex | `unknown` - not surfaced by tool | 2026-08-24, Asia/Shanghai | Text prompt only; no third-party image input | Human review; Pillow 12.2.0 disclosure strip; pngquant 2.12.5 palette compression; no photo compositing | Same as above | Same as above | `CLOSED_FOR_SUBMISSION_USE_WITH_DISCLOSED_LIMITS` |
| `assets/figures/experience-ai-origin.png` | Realistic station concept image | Text-to-image | OpenAI built-in image generation in Codex | `unknown` - not surfaced by tool | 2026-08-24, Asia/Shanghai | Text prompt only; no third-party image input | Human review; Pillow 12.2.0 disclosure strip; pngquant 2.12.5 palette compression; no photo compositing | Same as above | Same as above | `CLOSED_FOR_SUBMISSION_USE_WITH_DISCLOSED_LIMITS` |
| `assets/figures/experience-dazhongsi.png` | Realistic station concept image | Text-to-image | OpenAI built-in image generation in Codex | `unknown` - not surfaced by tool | 2026-08-24, Asia/Shanghai | Text prompt only; no third-party image input | Human review; Pillow 12.2.0 disclosure strip; pngquant 2.12.5 palette compression; no photo compositing | Same as above | Same as above | `CLOSED_FOR_SUBMISSION_USE_WITH_DISCLOSED_LIMITS` |

### Prompt record

- `site-overview.png`: high-oblique 16:9 aerial concept of the X Jingzhang Beijing rail-heritage corridor, linear park and Xiaoyue River connecting campus, research, neighbourhood and transit conditions; contemporary Beijing scale; no text, logo or watermark.
- `experience-zhongzhi.png`: realistic 16:9 public experiment garden with a continuous public path, independently closable robot-test court, movable conditions, observation, staffed stop point, workshop and equipment withdrawal route; no text, logo or watermark.
- `experience-ai-origin.png`: realistic 16:9 rail-heritage public co-development hall with open-source theatre, developer steps, prototype table, transparent laboratories, staffed rights/withdrawal desk, cafe and community activity; no text, logo or watermark.
- `experience-dazhongsi.png`: realistic 16:9 transit-arrival civic room with an accessible main path, staffed non-digital service, rest and commerce, limited AI side zone, complaint/return point, equipment exit and neighbourhood worktable; no text, logo or watermark.

### Integrity record

| Asset | Raw generated SHA-256 | Final disclosed SHA-256 |
| --- | --- | --- |
| `site-overview.png` | `5f82e57328a52fff0a3657e1718bd436aba4061da70ea7412753f71774f7b22e` | `30a886602f8c704928f67e946978f8281fe1150b784d8360998e3eba7e1ace31` |
| `experience-zhongzhi.png` | `5d7d770d010842cac3473a62ffd311a834814518440ad7778c7bc0a1e02bdf55` | `0b8196f8cec02d5cd3b2b49d49334e58379d37aeac2e2be9b62e5bacdc9af221` |
| `experience-ai-origin.png` | `a2f7da790727c16f39e08e49c34854d58c5edf18afc81c48f022d877f720c8c4` | `992df94202aacf14b82d8594ec080284fc10cb57d03f3399366efe0d1cdbc042` |
| `experience-dazhongsi.png` | `4ef39609377e02511dc62c1a96b8f7a94e0d27ad8a4bfbe376105e166abd22e6` | `cfd3f2fab5580090955677f9e2f799a994489267d63a5dc89b80779d751659b0` |

The raw generated files are not published because they lack the mandatory disclosure. The final files above are the only publishable source versions.

## Derivative and non-generative assets

| Asset group | Creation/source | Rights and limitation |
| --- | --- | --- |
| `station-experiences*`, `persona-day*`, `failure-atlas*`, `x-operating-proof*`, `mobility-bluegreen*`, `key-areas*`, `aerial-design-key*` | Locally rebuilt from the four registered concept images plus submission text, geometry and rules | Each layout repeats a visible language-appropriate concept-image disclosure. Generated pixels remain conceptual and are not site, boundary, ownership, engineering, implementation or approval evidence. |
| `framework-overview*`, `implementation-roadmap*`, `station-topology-proof*`, `metrics-evidence*`, `three-station-flagship-contracts*`, `station-design-atlas*`, `sections-accessibility*`, `identity-guidelines*`, `delivery-dashboard*` and remaining diagrams | Locally composed from submission GeoJSON, metrics, text and checked-in machine evidence | Participant-generated diagrams; no third-party photograph or commercial basemap. Provisional geometry remains conceptual. |
| `visual/assets/site-context-osm.json` and map-derived figures | Normalized OpenStreetMap data obtained through Overpass on 2026-08-17 | © OpenStreetMap contributors, ODbL 1.0. The shipped subset retains attribution and is not a survey, official boundary, ownership or accessibility record. |
| `visual/assets/cjk-font.css` | Locally subset Noto Sans CJK SC Regular and Bold embedded as WOFF2 data | SIL Open Font License 1.1; licence text is embedded in the CSS. Used to prevent Chinese missing-glyph boxes in offline HTML. |
| Lifecycle, topology, station-contract and tabletop scripts/results | Participant-generated deterministic validators and synthetic fixtures | Package evidence only; not field validation, certification, railway operation or implementation approval. |
| `proposal.md`, `proposal.en.md`, HTML, PDF and narrative | Participant submission assembled from registered sources and assets | Submission text/layout under CC BY-SA 4.0 where the participant may license it; third-party source rights and the limitations above remain in force. |

All realistic concept images visibly state, in the relevant language, that they are AI/generative concept images, not site photographs and not planning or implementation approval. Captions carry the same evidentiary boundary. No enterprise logo, personal data, non-public spatial data, commercial map imagery, third-party photograph or unlicensed icon is intentionally included.

## QA and external blockers

Human bilingual and full-page visual checks are persisted in `visual/assets/bilingual-qa.json` and `visual/assets/visual-qa.json`. The PR #3828 repair closure is persisted in `visual/assets/review-3828-repair-matrix.json`; JSON is used because the submission validator permits only the fixed report filenames in `report/`.

Real deployment remains blocked until a legal operator, site permission, insurance, safety responsibility, data controller, accessibility reviewer and restoration funding are evidenced. Those missing external commitments do not weaken the asset-rights disclosure above and are not represented as completed partnerships.
