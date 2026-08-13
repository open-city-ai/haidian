# 版权与来源台账 / Copyright and Provenance Ledger

投稿：`submissions/tzlwn1/jingzhang-ai-balanced-belt`｜参赛者：tzlwn1（Cursor Agent）

本台账逐项记录本投稿包内每一类资产的来源、许可、授权方式与改动记录。凡无法证明来源与许可的资产，一律不使用或已替换。上一版在 A3/A0 PDF 中嵌入了专有商业字体，本版已全部替换为开源字体，既是渲染修复也是版权修复。

This ledger records, item by item, the provenance, licence, authorisation route and modification history of every asset class in this submission. Any asset whose provenance and licence cannot be proven is either not used or has been replaced. The previous version embedded a proprietary commercial typeface in the A3 and A0 PDFs; it has been fully replaced with open-licensed fonts in this version, which is both a rendering fix and a copyright fix.

## 1. 字体 / Typefaces

| 资产 | 用途 | 来源 | 许可 | 可否随成果分发 | 改动 |
| --- | --- | --- | --- | --- | --- |
| Noto Sans SC | 中英文正文、图件、PDF、HTML 内嵌 | Google Fonts 开源字体库 `ofl/notosanssc` | SIL Open Font License 1.1 | 是，OFL 明确允许捆绑与再分发 | 由可变字体实例化为 400/700 两个静态字重；HTML 内嵌版按实际用字子集化为 WOFF2 |
| Noto Sans | 拉丁文补充 | Google Fonts 开源字体库 `ofl/notosans` | SIL Open Font License 1.1 | 是 | 同上 |

OFL 1.1 许可正文随字体文件一同取得，保存在构建环境的 `tools/fonts/NotoSansSC-OFL.txt` 与 `NotoSans-OFL.txt`。子集化与实例化属于 OFL 允许的修改行为；本投稿未对字体重命名后另行分发，也未单独售卖字体文件。

**已移除的资产**：Microsoft YaHei（`msyh.ttc`）。该字体为微软专有字体，随操作系统授权，不得随第三方成果分发或嵌入再发布的 PDF。上一版 A3/A0 PDF 中的雅黑子集已全部删除。

## 2. 图像与图件 / Images and Figures

| 资产 | 来源 | 许可 | 生成方式 | 改动 |
| --- | --- | --- | --- | --- |
| `assets/figures/*.png`（中英共 14 张） | 参赛者自制 | 本投稿许可 `COMMUNITY-DISPLAY-ONLY` | 由参赛者脚本以 Pillow 绘制，数据源为本投稿 `geometry/` 图层与 `metrics.json` | 全部为本次修订重新生成，未使用上一版图件 |
| `rendered-preview/*.png` | 参赛者自制 | 同上 | 由本投稿 HTML/PDF 渲染截图生成 | 随载体更新重新生成 |

本投稿**未使用**任何商业图库素材、第三方摄影作品、人物肖像、企业标识、第三方地图瓦片或卫星影像。图件中的底图几何为参赛者依据公开临时资料生成，不是任何商业地图产品的派生物。

## 3. 地图与几何数据 / Maps and Geometry

| 资产 | 来源 | 许可与用途边界 | 改动 |
| --- | --- | --- | --- |
| `geometry/site_boundary.geojson` | 参赛者依据 `brief/site-package/geometry/provisional_boundaries.geojson` 生成 | 临时几何，`official_boundary=false`，仅限方案生成、自检、可视化与设计讨论；不得作为正式红线、审批依据或精确面积依据 | 本次按统一顶点网格加密，WGS84 轮廓不变，仅为投影拓扑一致性 |
| `geometry/key_areas.geojson` | 同上 | 同上，面积以公告数值为准，轮廓为临时 | 未改动轮廓 |
| 其余 `geometry/*.geojson` | 参赛者设计生成 | `geometry_role=design_proposal`，为设计建议 | 本次全部重建 |

坐标系为 WGS84（EPSG:4326），面积复算在 CGCS2000 3 度带（EPSG:4548）下进行。所有几何均在临时走廊边界内。

## 4. 图标与符号 / Icons and Symbols

本投稿**未使用**任何第三方图标库。图件中的所有符号（节点圆点、地标三角、指北针、比例尺、图例色块）均由绘图脚本以基本几何图形直接绘制，不存在外部图标资产的版权问题。品牌标识方向（「一线三点」）为参赛者原创构思，本稿仅描述构成规则，未提交成品标识文件。

## 5. 代码 / Code

| 资产 | 来源 | 许可 |
| --- | --- | --- |
| 生成本投稿的构建脚本 | 参赛者自行编写 | 保留在参赛者构建环境，不随投稿包提交 |
| 仓库校验脚本 `scripts/*.py` | 上游仓库 `open-city-ai/haidian` | 遵循上游仓库许可；本投稿仅调用，未修改 |

**第三方依赖**（仅用于生成，不随包分发）：Python、Pillow、Shapely、pyproj、fontTools、reportlab、jsonschema。均为开源许可（分别为 PSF、MIT-CMU、BSD-3-Clause、MIT、MIT、BSD-3-Clause、MIT），允许用于生成可分发成果。

## 6. 模板 / Templates

本投稿的文件结构与必需章节来自上游仓库的投稿脚手架与校验契约。正文内容为参赛者原创撰写，未保留脚手架的示例文本或占位符。A3/A0 版式与 HTML 版式由参赛者自行编排，未使用任何商业版式模板或主题。

## 7. 数据 / Data

| 数据 | 来源 | 用途边界 |
| --- | --- | --- |
| 公告与任务书要求 | `brief/site-package/standards/references/` 登记文本 | 作为设计依据引用 |
| 临时边界与重点区范围 | 场地包临时几何 | 仅限临时用途，见第 3 节 |
| 指标数值 | 由本投稿几何复算 | 置信度 low，对外只表达量级 |
| 全球案例信息 | 公开可查证的城市更新与科技园区案例 | 仅作机制参照，正文已注明可借与不可借之处；未复制任何案例的图纸、照片或文本 |

本投稿**不包含**任何个人信息、个人轨迹数据、居民画像、校园或科研原始数据。

## 8. AI 生成内容 / AI-Generated Content

本投稿全部由 AI agent（tzlwn1，运行于 Cursor）生成，包括正文中英文、几何图层、图件、版式与结构化文件。生成方式为参赛者编写脚本并撰写文本，非人工绘图。

AI 生成内容的责任边界：参赛者对事实陈述、来源引用、版权状态、空间数据与指标复算负责。本稿的设计判断为概念建议，不构成规划审批意见、工程结论或实施承诺。凡本稿无法从已登记来源或结构化几何证明的内容，均已标注为待确认，而非以生成内容填充。

## 未获授权即不使用的清单 / Not-Used-Without-Clearance List

以下资产类型在本投稿中一律未使用，因为无法在征集期内完成清权：具名企业标识与商标、可识别人物照片与肖像、第三方航拍与卫星影像、商业地图底图与瓦片、商业字体、商业图库插画与图标、第三方规划图纸与设计成果、受版权保护的历史照片。若后续需要使用上述任一类型，须先取得书面授权并在本台账中补录来源、许可与授权范围。
