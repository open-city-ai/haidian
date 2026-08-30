# Copyright Statement

All submitted text, geometry, diagrams, PDFs, and static HTML assets in this package are original output of the declared AI agent (WorkBuddy Agent, Kimi-K3 by Moonshot AI), generated from public or user-provided cleared sources listed in `sources.json`.

- No non-public government data, enterprise internal data, trade secrets, or personal data were used.
- No unauthorized fonts, images, trademarks, portraits, or copyrighted artwork were used. Figures and PDFs are rendered locally with matplotlib using the operating system's bundled Microsoft YaHei font for display only.
- The "JingZhang AI Spine / 京张智脊" name, logo direction, landmark concepts and component library are original concept directions; trademark and copyright clearance is required before any official adoption.
- Global case material (Silicon Valley, Kendall Square, King's Cross, Shenzhen Nanshan, Singapore one-north, Toronto Quayside) is used as background research only, not as local factual evidence.
- `visual/index.html` and its English counterpart are fully offline and load no remote assets.
- Provisional boundary geometry derives from the repository's `brief/site-package/geometry/provisional_boundaries.geojson` (maintainer-derived from the official announcement) and remains labeled provisional.

## Generated concept imagery (assets/media/)

The images under `assets/media/` are AI-generated concept visualizations of the design intent. They are an explanatory layer only: they are not photographs, not site records, not resident feedback, and not engineering or approval evidence. Buildings, people, facilities and site details shown are illustrative and may differ materially from existing conditions. Spatial, area and indicator conclusions rest solely on `geometry/*.geojson` and `metrics.json`.

- Tool: WorkBuddy built-in image generation (ImageGen), text-to-image; 2026-08-30 (v0.2.2 revision of the same 13 frames).
- Prompt strategy: realistic architectural visualization, unified palette (Jing-Zhang slate gray, brick red, restrained AI blue), explicitly excluding text, signage and trademarks.
- No protected trademarks, fonts, portraits or third-party material are depicted. Figures shown are generated synthetic persons, not portraits of real individuals.

### v0.2.2 revision: people and existing-landscape fidelity

Three constraints were added to every frame and the 13 images were regenerated:

1. **Person count reduced.** Each frame now carries an explicit cap of **one to two people** ("one or two people maximum", "no crowds"); the bird's-eye frame specifies "very few pedestrians visible at this scale and no crowds". Group scenes (conference forecourt, maker market, governance hall) were re-framed as quiet, near-empty daytime states rather than crowded events.
2. **Figures are Chinese.** Every frame that contains a person specifies Chinese persons (e.g. "one elderly Chinese man resting on a bench", "a Chinese staff member", "two Chinese students"), with everyday contemporary clothing and no identifiable likeness.
3. **Existing landscape referenced to open data, not invented.** The built-form palette is derived from OpenStreetMap `building:levels` and building-kind tags retrieved for the site bbox (273 tagged buildings, 2026-08-30, ODbL 1.0). The dominant stock is low-rise: 169 of 273 tagged buildings are 1 storey, 6 storeys is the common multi-storey type, with a thin tail of 18–25 storey towers; tagged kinds are apartments (19), residential (14), dormitory (9), house (5), school (4), university (3), retail (3), college (2), commercial (2), industrial (2), train_station (1). Frames therefore render six-storey grey brick residential slabs with occasional 18–25 storey apartment towers, red brick university buildings, and planted street trees typical of Beijing (Chinese locust / 国槐, ginkgo / 银杏, poplar, willow along the 清河).

**Baidu Street View was deliberately not used.** Two reasons: (a) retrieving street-view imagery programmatically requires a commercial Baidu Maps API key and is licensed for restricted commercial use, which cannot be relicensed into an open submission; (b) the brief prohibits commercial map imagery as submission data. OpenStreetMap data is used for built-form *typology* only — never for boundaries, areas or planning-control claims, which rest exclusively on `geometry/*.geojson` and `metrics.json`.

### v0.2.6: key-area renderings and JPEG migration

Three area-level concept renderings were added for the three key areas (`keyarea-zhongzhiyuan.jpg`, `keyarea-ai-origin.jpg`, `keyarea-dazhongsi.jpg`; 2026-08-30, same tool and prompt constraints as above: one to two Chinese figures per frame, no crowds, built-form typology from OSM `building:levels`, no off-site Beijing landmarks, no text or trademarks). To stay under the 40 MiB changed-files cap of the open-call, all media images were converted from PNG to JPEG (quality 88, visually lossless for concept imagery); file extensions in this table and in the proposals were updated accordingly, and the imagery content is unchanged.

| File | Alt text |
|---|---|
| `keyarea-dazhongsi.jpg` | Dazhongsi AI Industry Cluster: renovated brick-and-glass commercial complex with green terraces around the intelligence-harbor square, restored locomotive and rail segments as heritage exhibits, elevated metro line, Beijing North hub beyond, delivery robot on a demo lane; one Chinese shop assistant and one visitor, no crowd, dusk light with a faint blue data ribbon. |
| `keyarea-ai-origin.jpg` | Beijing AI Origin Community at Wudaokou: red brick university interface, glazed open-source hall, maker-square canopies by a metro entrance, weathering-steel memorial pavilion with a preserved track fragment in a ginkgo court, green corridor with a luminous station pavilion; two Chinese students and one elderly Chinese man, no crowd, dusk light. |
| `keyarea-zhongzhiyuan.jpg` | Zhongzhiyuan AI Acceleration Area: low-rise red brick and glass research campus along Shuangqing Road, glazed pilot-testing hall, open-source plaza with honor wall, the green rail corridor with preserved rails, willows and poplars, the Qinghe river beyond; two Chinese researchers, no crowd, dusk light. |
| `overview-birdseye.jpg` | Futuristic cinematic oblique aerial at dusk, camera above the site's south edge looking north. Foreground: the Dazhongsi AI industry cluster - renovated brick-and-glass commercial complex with green terraces around the intelligence-harbor square, historic locomotives and rail segments preserved in the paving as heritage exhibits, the elevated metro line (Line 13) curving along the southeast edge, and the Beijing North station hub to the west. From the square, the 9.7 km green heritage spine with preserved rails recedes north past luminous station pavilions and stitch bridges, between red brick university buildings (west) and six-storey grey brick residential slabs with occasional towers (east), toward the Qinghe river wetlands on the horizon; faint blue light ribbons above the spine suggest an AI data layer. Almost no pedestrians visible at this altitude. (v0.2.4: angle changed from top-down to oblique so the Dazhongsi key-area design is legible in the foreground.) |
| `sc-01-heritage-ar-guide.jpg` | Station plaza with old rail tracks set into paving as heritage exhibit; one Chinese visitor using an AR device before a restored locomotive; brick-and-glass transit hall behind. |
| `sc-02-ai-native-retail.jpg` | Renovated retail interior with modular smart shelving, transparent display panels, interactive mirror and a restocking robot; one Chinese shop assistant. |
| `sc-03-intermodal-logistics.jpg` | Low-speed autonomous delivery vehicle and cargo robot on a demo lane beside a restored rail embankment, with safety fencing and one Chinese observer. |
| `sc-04-university-maker-market.jpg` | University maker market plaza with canopies and modular stalls, two Chinese students with a small robot, red brick campus buildings and a metro entrance. |
| `sc-05-promenade-robot-service.jpg` | Tree-lined promenade on the converted corridor with a service robot and one elderly Chinese man resting on a bench, six-storey grey brick residential slabs behind. |
| `sc-06-open-source-hall.jpg` | Double-height glazed community hall with shared tables, meeting pods, display wall and a glassed server rack; one Chinese user at a table. |
| `sc-07-ai-origin-memorial.jpg` | Low brick and weathering-steel memorial pavilion beside a historic station site, honor wall of name plates, preserved track fragment, ginkgo court; one Chinese visitor. |
| `sc-08-elderly-companion.jpg` | Ground-floor community room with a staffed counter, seating and a voice assistant; one Chinese staff member assisting one elderly Chinese resident. |
| `sc-09-compute-pilot-platform.jpg` | Renovated research building with a glazed pilot-testing hall, screened edge-compute containers and a testing work yard; one Chinese engineer. |
| `sc-10-governance-sandbox.jpg` | Calm exhibition hall with a central demo table, text-free abstract display walls, an observation gallery and a workshop table; empty of people. |
| `sc-11-qinghe-wetland.jpg` | Timber boardwalk through reed beds with an observation platform, monitoring sensors and willows, continuing toward the greenway; one Chinese visitor on the boardwalk. |
| `sc-12-developer-conference.jpg` | Low-rise conference venue with a wide forecourt, brick-and-glass modular facade and event canopies next to the linear park; two Chinese attendees arriving, no crowd. |

License: COMMUNITY-DISPLAY-ONLY.
