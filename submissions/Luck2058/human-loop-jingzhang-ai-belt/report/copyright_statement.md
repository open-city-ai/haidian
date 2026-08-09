# 版权与资产溯源声明 / Copyright & Asset Provenance Statement

本文件对本提交包内**每一项**可视资产、字体、数据与代码给出资产级溯源：来源、生成方式、许可、授权状态与二次分发条件。所有条目均可与 `sources.json`、`manifest.json` 交叉核验。

This statement provides **asset-level** provenance for every visual asset, font, dataset and code artefact in this submission: origin, generation method, licence, authorisation status and redistribution terms. All entries cross-reference `sources.json` and `manifest.json`.

## 1. 总体声明 / General

- 本提交包内**不含**任何第三方受版权保护的照片、渲染图、卫星影像、地图瓦片、商标图形或人物肖像。
- 全部图件为 AI agent 依据公开信息与本方案自有几何数据**原生生成的矢量或程序化位图**，不存在对既有作品的临摹、拼贴或风格迁移。
- `visual/index.html`、`visual/index.en.html`、`report/proposal*.html` 均为纯静态离线页面：**未加载**远程脚本、远程字体、远程地图瓦片、iframe、表单或外部 API，不含任何访客追踪代码。
- 本方案不构成法定规划成果，所有空间结论为 `agent-generated provisional scenario`。

## 2. 图件资产清单 / Figure Assets

| 资产路径 | 生成方式 | 内容来源 | 许可 | 授权状态 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `assets/figures/brand-identity.svg` | AI agent 手写 SVG（矢量原生） | 原创标识概念，母题为「人」字与环形，无第三方图形元素 | 随本提交包以赛事规则授权主办方评审使用 | 自有原创，可清权 | 概念草案，非最终审定视觉 |
| `assets/figures/innovation-ecosystem-map.svg` | AI agent 手写 SVG（矢量原生） | 七要素关系为本方案自有论证；对标案例仅使用机构公开名称，未使用其标识 | 同上 | 自有原创，可清权 | 概念示意图，非实测数据图 |
| `assets/figures/site-overview.png` | 程序化渲染自本方案 `geometry/*.geojson` | 几何数据由 agent 依公告文字描述推导（`BOUNDARY-SOURCE`、`AGENT-DESIGN-GEOMETRY`） | 同上 | 自有原创，可清权 | 底图为纯色块，**非**任何商业地图瓦片 |
| `assets/figures/key-areas.png` | 同上 | `geometry/key_areas.geojson`（provisional） | 同上 | 自有原创，可清权 | 矩形边不得解释为地块或道路红线 |
| `assets/figures/land-use-structure.png` | 同上 | `geometry/land_use.geojson` | 同上 | 自有原创，可清权 | 用地色系自定义，未套用制式图例版权样式 |
| `assets/figures/mobility-bluegreen.png` | 同上 | `geometry/roads.geojson`、`green_space.geojson`、`public_space.geojson` | 同上 | 自有原创，可清权 | — |
| `assets/figures/metrics-evidence.png` | 程序化绘制自 `metrics.json` | 本方案自有复算指标 | 同上 | 自有原创，可清权 | — |
| `drawings/a3-booklet.pdf` | 由上述图件与正文排版生成 | 同上 | 同上 | 自有原创，可清权 | 内嵌字体见第 3 节 |
| `drawings/a0-boards.pdf` | 同上 | 同上 | 同上 | 自有原创，可清权 | 同上 |

## 3. 字体溯源 / Font Provenance

本方案的字体策略为 **仅使用 SIL Open Font License 1.1 开源字体或系统默认字体**，不使用任何商业授权字体。

| 用途 | 字体 | 版权方 | 许可 | 许可链接 | 嵌入方式 |
| --- | --- | --- | --- | --- | --- |
| 中文标题 / 叙事 | Noto Serif SC | Google LLC / Adobe | SIL OFL 1.1 | https://openfontlicense.org/ | PDF 子集嵌入（OFL 允许） |
| 中文正文 / 导视 | Noto Sans SC | Google LLC / Adobe | SIL OFL 1.1 | 同上 | PDF 子集嵌入 |
| 数字 / 指标 / 代码 | Noto Sans Mono | Google LLC | SIL OFL 1.1 | 同上 | PDF 子集嵌入 |
| HTML 与 SVG 显示 | `system-ui` / 微软雅黑 / PingFang SC 等系统字体栈 | 各操作系统厂商 | 系统随附，**不嵌入、不分发** | — | 仅 CSS `font-family` 声明 |

**OFL 合规确认**：① 未将 OFL 字体单独出售；② 未使用 "Noto" 之保留名称命名衍生字体；③ SVG/HTML 中不内联 base64 字体文件，仅作字体族名声明，因此本提交包内**不含**任何字体二进制文件（可由 `manifest.json` 文件清单核验）。

## 4. 数据与几何溯源 / Data & Geometry Provenance

| 资产 | 来源 ID（见 `sources.json`） | 性质 | 可用性 |
| --- | --- | --- | --- |
| 项目任务、范围、深度要求 | `OFFICIAL-ANNOUNCEMENT` | 政府公开发布公告 | 公开可引用 |
| agent 任务书与要求清单 | `AGENT-TASKBOOK` | 赛事仓库随附 | 随仓库授权 |
| 临时粗略边界 / 重点区域 | `BOUNDARY-SOURCE`、`KEY-AREA-SOURCE` | agent 依公告文字推导的 provisional 几何 | **不得**作为审批或精确面积依据 |
| 全部设计几何图层 | `AGENT-DESIGN-GEOMETRY` | agent 原生生成 | 自有原创 |
| 站点资料包与登记表 | `SITE-PACKAGE`、`SOURCE-REGISTRY`、`PROCESSED-FACT-PACK` | 赛事仓库随附 | 随仓库授权 |

## 5. 第三方名称与标识使用说明 / Third-party Names

正文「全球 AI 创新生态案例」章节中出现的 Sidewalk Toronto、Station F、MaRS Discovery District、鹏城实验室、深圳南山/坪山、Helsinki 等名称，**仅作为公开可查的政策与规划案例进行文字引述与比较分析**，属合理引用范畴；本提交包**未使用**上述任何机构的标识、图片、渲染图或受版权保护的图纸，亦不暗示任何合作或背书关系。同理，正文提及的企业与机构名称均为客观陈述，未使用其商标图形。

## 6. AI 生成声明 / AI Generation Disclosure

本提交包全部内容由声明的 AI agent 生成，包括文本、几何、图件、页面与自检记录。生成过程未使用受版权保护的训练素材直接输出，未复制任何具名设计作品。人类参与限于任务发起、方案决策与结果审阅。

## 7. 遗留风险 / Residual Risks（对应 `A-COPYRIGHT-001`）

1. 正式阶段若引入现状照片、航拍影像、控规底图或企业提供素材，须逐项重新清权并更新本清单。
2. 若 A3/A0 后续改用商业字体，须取得嵌入与分发授权并替换第 3 节。
3. 品牌标识为概念草案，若进入实际使用须另行完成商标检索与注册查重。
4. 地标 L1–L3 的形体为原创概念，正式阶段仍建议做既有作品相似性检索。
