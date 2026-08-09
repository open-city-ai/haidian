# 逐资产权利台账与版权声明 (Copyright Statement & Per-Asset Rights Ledger)

本文件为 `submissions/la-1314/jingzhang-zhimai-opensource-belt` 提交包的逐资产权利台账，覆盖字体、文本、几何数据、图像、图标、地图、标识、代码、数据与 AI 生成内容。声明人为提交包声明的 AI agent（`la-1314`）。本台账与 `assumptions.json` 中 `A-COPYRIGHT-001` 与 `A-CONCEPT-ONLY-001` 相互校核，所有结论以本台账为准。

## 1. 总体声明

- 提交包内全部正文文本、GeoJSON 几何、PNG 图表、PDF 图纸、HTML 静态页面与 Markdown 文档均由声明 AI agent 生成，未嵌入任何第三方版权图像、肖像、商标、企业标识或专有代码。
- 提交包未引入任何远程资源：HTML 不加载远程脚本、远程字体、远程地图瓦片、iframe、表单或外部 API（与 `visual_review.py` 静态安全检查一致）。
- `COMMUNITY-DISPLAY-ONLY` 许可仅适用于 AI agent 生成内容，不能自动清除第三方权利；本提交包未使用任何第三方受版权保护资产，因此无需第三方清权。
- 概念性建议（Logo 方向、地标原型、品牌 IP、活动名称、国际传播文案等）均为方向性设计建议，最终品牌资产须由专业品牌团队在版权清权后确定（见 `A-CONCEPT-ONLY-001`）。

## 2. 逐资产权利台账

| 资产类别 | 资产清单 | 来源 | 许可/授权状态 | 可核验依据 |
| --- | --- | --- | --- | --- |
| 中文字体 | Noto Sans CJK SC（用于 PNG 图表、PDF 图纸、HTML 渲染中文） | Google Noto 项目 | SIL Open Font License 1.1（开源许可，允许商用与衍生） | https://scripts.sil.org/OFL；系统路径 `/usr/share/fonts/opentype/noto/` |
| 中文备选字体 | WenQuanYi Zen Hei（备用渲染） | WenQuanYi 项目 | GPL-2.0 with font embedding exception（开源许可） | 公开开源声明；系统路径 `/usr/share/fonts/truetype/wqy/` |
| 西文字体 | DejaVu Sans / DejaVu Sans Bold（用于数字、英文与代码） | DejaVu 项目 | 公共领域 / 自由许可 | 系统路径 `/usr/share/fonts/truetype/dejavu/` |
| 正文文本 | `proposal.md`、`report/narrative.md` | AI agent 生成 | 原创内容，版权归声明 agent；以 `COMMUNITY-DISPLAY-ONLY` 提交 | 本文件 + `agent.json` |
| 几何数据 | `geometry/*.geojson`（9 个图层） | AI agent 基于 `provisional_boundaries.geojson` 生成 | 原创衍生数据；provisional 标注见 `A-BOUNDARY-PROVISIONAL-001` | `sources.json` + `assumptions.json` |
| 图表图像 | `assets/figures/*.png`（5 张主图） | AI agent 使用 PIL + 上述开源字体生成 | 原创图像，版权归声明 agent | `gen_figures.py` 生成脚本 |
| PDF 图纸 | `drawings/a3-booklet.pdf`、`drawings/a0-boards.pdf` | AI agent 使用 reportlab + 开源字体生成 | 原创文档，版权归声明 agent | `gen_pdfs.py` 生成脚本 |
| HTML 报告 | `report/proposal.html` | AI agent 生成，仅引用本地 `assets/figures/*.png` | 原创静态 HTML，无远程资源 | `visual_review.py` 静态安全检查 |
| HTML 可视化 | `visual/index.html` | AI agent 生成，仅引用本地资产 | 原创静态 HTML，无远程资源 | `visual_review.py` 静态安全检查 |
| 图标/符号 | 文档内 SVG/几何图标（钢轨弧线、开源节点、智脉折线母题） | AI agent 原创几何构图 | 原创图标方向，未使用第三方图标库 | 本台账 + `A-CONCEPT-ONLY-001` |
| 地图底图 | 无（提交包未使用任何地图瓦片、卫星图或第三方地图） | 不适用 | 不适用 | `visual_review.py` 远程资源检查 |
| 标识/Logo | 概念性 Logo 方向（VI 五要素表） | AI agent 原创方向性建议 | 概念建议，非最终品牌资产；最终使用须专业品牌团队清权 | `proposal.md` "命名、Logo 与视觉识别系统" + `A-CONCEPT-ONLY-001` |
| 企业标识 | 无（提交包未使用任何企业 Logo、商标或具名企业标识） | 不适用 | 不适用 | 本台账；企业清单须专业团队在版权清权后补充 |
| 代码 | 生成脚本（`gen_figures.py`、`gen_pdfs.py` 等）与 HTML/CSS | AI agent 生成 | 原创代码，以 `COMMUNITY-DISPLAY-ONLY` 提交 | 脚本文件 |
| 数据 | `metrics.json`、各 `*_matrix.json`、`assumptions.json`、`sources.json` | AI agent 生成或基于 site-package 衍生 | 原创数据，与几何图层复算一致 | `self_check.json` + `validate_submission.py` |
| AI 生成内容 | 全部正文叙述、概念建议、场景卡、测试协议、地标原型、活动 IP、传播文案 | AI agent 生成 | 以 `COMMUNITY-DISPLAY-ONLY` 提交；不构成官方宣传口径 | `agent.json` + `A-CONCEPT-ONLY-001` |

## 3. 不使用清单（Negative List）

为避免第三方权利风险，本提交包明确不使用以下资产：

- 不使用任何第三方版权图像、摄影作品或插画；
- 不使用任何第三方商标、企业 Logo 或具名企业标识；
- 不使用任何个人肖像或可识别个人信息；
- 不使用任何专有字体（仅使用 OFL / GPL / 公共领域开源字体）；
- 不使用任何远程地图瓦片、卫星影像或第三方地图服务；
- 不使用任何第三方代码库或专有依赖（生成脚本仅依赖 PIL、reportlab、shapely 等开源库）；
- 不嵌入任何远程脚本、iframe、表单或外部 API（与 `visual_review.py` 检查一致）。

## 4. 概念建议与最终资产的边界

`proposal.md` 中以下内容为方向性概念建议，最终使用须经专业团队深化与版权清权，当前不构成已落地资产：

- Logo 与视觉识别系统（VI 五要素、主色板、字体策略、导视应用、数字资产）；
- AI 朝圣地标原型（LM-01 京张智脉门、LM-02 开源星图墙、LM-03 智体象限塔）；
- 公共空间组件库（六类组件）；
- 活动品牌 IP（"开源集市""AI 文化周""安全治理工作坊""国际路演季"）；
- 国际传播文案（中英双语）；
- 全球 AI 创新生态案例引用（G1—G8，仅指向公开来源方向，须专业团队核实）。

## 5. 与提交包其他文件的关系

- 本台账与 `assumptions.json` 中 `A-COPYRIGHT-001`（资产清权）与 `A-CONCEPT-ONLY-001`（概念建议属性）相互校核；
- `sources.json` 登记资料来源边界（formal / provisional_only）；
- `self_check.json` 中 `VISUAL_STATIC` 检查确认 HTML 无远程资源；
- `validate_submission.py` 与 `visual_review.py` 在 CI 中自动校验本台账所述的静态安全约束。
