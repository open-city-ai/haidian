# 版权与合规声明（逐项资产权利清单）

本文件逐项列明提交包 `submissions/sierhaha/jingzhang-ai-commons`（双螺旋创新带方案，v0.7）内全部交付物的生成方式、素材来源与权利边界，供评审按资产逐项核查。

## 1. 生成方式

本包全部文本、空间几何、指标、矩阵、图件、HTML、图纸均由声明的 AI 智能体 **sier-hermes**（Hermes Agent CLI，模型 deepseek）编写/生成，并经确定性校验（finalize_submission.py / self_check_submission.py --mark-self-checked / validate_submission.py）验证。生成脚本清单（位于参赛者本地工作区，未随包分发）：`tools/gen_geometry.py`、`tools/gen_metrics.py`、`tools/gen_matrices.py`、`tools/gen_figures.py`、`tools/gen_renders.py`、`tools/gen_visual.py`、`tools/gen_drawings.py`、`tools/fetch_osm.py`、`tools/embed_font.py`。

## 2. 逐项资产权利清单

| 资产 | 来源 | 许可/权利 | 使用方式 |
| --- | --- | --- | --- |
| 空间几何（9 GeoJSON） | 基于 `brief/site-package/geometry/provisional_boundaries.geojson` 由智能体推导 | 设计推导数据 | 提交、评审展示 |
| 示意图件（9×中英 PNG） | 智能体用 matplotlib 程序化绘制 | 自创 | 提交、评审展示 |
| 概念渲染图（6×中英 PNG） | 智能体用 matplotlib 程序化绘制 | 自创 | 提交、评审展示 |
| A3 文册 / A0 展板（PDF） | 智能体用 matplotlib 生成 | 自创 | 提交、评审展示 |
| 离线 HTML（visual/report） | 智能体生成；内嵌 Noto Sans CJK SC 字体子集 | 自创 + OFL 字体子集 | 提交、离线展示 |
| **OSM 底图** | OpenStreetMap（经 Overpass API 提取道路/水系/铁路/公园） | **ODbL 1.0，© OpenStreetMap contributors** | 图件底图，已署名 |
| 字体 | Noto Sans CJK SC（SIL OFL 1.1） | OFL-1.1 | 图件/PDF 渲染 + HTML 内嵌子集 |
| 政策引用 | 国务院《2030年前碳达峰行动方案》国发〔2021〕23号 | 公开政府文件（事实引用） | 正文引用，见 sources.json |

## 3. OSM 署名与 ODbL 义务

- 总览图、空间结构图使用 OpenStreetMap 底图，图面左下角标注「底图 © OpenStreetMap contributors (ODbL)」；ODbL 要求在衍生数据库场景下以相同许可共享，本方案仅为评审展示性引用，不发布衍生数据库。
- 若主办方需公开发布图件，可提供无底图版本或按 ODbL 提供对应图层。

## 4. 字体使用

- 图件与 PDF 使用 Noto Sans CJK SC（OFL-1.1）渲染，嵌入显示子集；离线 HTML 内嵌 woff2 字体子集（约 400 KB），确保评审环境无中文系统字体时不出现方框字。
- 无任何专有字体（SimHei/微软雅黑）用于交付物。

## 5. 工具链与依赖

| 组件 | 用途 | 许可证 |
| --- | --- | --- |
| Python 3.11 | 生成与校验 | PSF |
| matplotlib | 图件/图纸 | PSF 兼容 |
| shapely / pyproj / Pillow | 几何/投影/图像 | BSD-3 / MIT / HPND |
| fontTools + brotli | 字体子集化（仅本地构建，不随包分发依赖） | MIT / MIT |
| Node.js | JZ-05 试点脚本（run_jz05_pilot.js，纯标准库） | MIT |
| jsonschema | 结构化校验 | MIT |

## 6. 外部资源与离线声明

- 全部 HTML 完全离线，不加载 CDN、远程字体、地图瓦片、外部脚本、iframe 或跟踪代码。
- 本包不含任何需另行授权的第三方视觉素材；Logo 为概念方向（未定稿），字体/图像/商标/肖像需清权后使用。

## 7. 图件复现说明（生成脚本与可复现性）

- 全部图件/图纸由以下脚本生成（确定性：无随机种子依赖，输入为 geometry/*.geojson、metrics.json、OSM 缓存与固定 T 文本表）：

| 资产 | 生成脚本 | 输入 | 可复现步骤 |
| --- | --- | --- | --- |
| 9 张正式图（×中英） | tools/gen_figures.py | geometry/*.geojson + artifacts/osm_cache.json | `python3 tools/gen_figures.py zh|en` |
| 6 张概念渲染图（×中英） | tools/gen_renders.py | geometry/*.geojson + 固定 T 文本 | `python3 tools/gen_renders.py all` |
| A3/A0 图纸（×中英） | tools/gen_drawings.py | assets/figures/*.png | `python3 tools/gen_drawings.py` |
| 离线 HTML | tools/gen_visual.py + scripts/render_proposal_html.py + tools/embed_font.py | proposal.md + metrics.json + figures | 依次运行后 `python3 tools/embed_font.py` 嵌入字体子集 |

- OSM 底图数据源：`tools/fetch_osm.py`（Overpass API 查询，bbox 116.330,39.930,116.365,40.035，要素类型道路/水系/铁路/公园），缓存于参赛者本地 artifacts/osm_cache.json，不随包分发；图面已署名。
- 字体子集：`tools/embed_font.py`（fontTools 子集化 Noto Sans CJK SC → woff2 → base64 内嵌）。
- 任何第三方可按上述脚本复现全部图件；随机种子未使用，输出与评审所见一致。

## 8. 边界与事实性声明

- 边界为临时约束范围（provisional），官方 polygon 发布后全部面积类指标复算。
- 本方案不声称官方批准、审定控规、最终权属或实施承诺；全部机制/试点/指标为概念建议或候选口径。
