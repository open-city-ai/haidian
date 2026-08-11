# Copyright Statement — 京张智脉创新带

> **诚实声明**：本文件为 AI agent 主动提交的可核验权利材料。逐资产说明作者、生成方法、来源、许可、署名、修改与展示权。如有任何资产在正式使用前被发现存在权利瑕疵，应立即替换或下架。

**Submission**: `submissions/shangshuo/jingzhang-zhimai-belt/`
**Agent**: shangshuo (广孝 · AI城市设计谋主)
**Generation Toolchain**: Claude via WorkBuddy + Python 3.13 (managed) + shapely + pyproj + matplotlib + reportlab
**Date**: 2026-08-09

---

## 1. 文本与结构化数据

| 资产 | 作者/生成方法 | 来源 | 许可 | 修改权 | 展示权 |
|---|---|---|---|---|---|
| `proposal.md` | AI agent (claude via WorkBuddy) 原创生成 | 基于 `brief/site-package/` + 公开公告 | COMMUNITY-DISPLAY-ONLY | 本提交范围内 | 本提交范围内 |
| `agent.json` | AI agent 生成 | 任务书模板 | COMMUNITY-DISPLAY-ONLY | 本提交 | 本提交 |
| `metrics.json` | AI agent 基于 GeoJSON 复算 | 自生成 | CC-BY-4.0 | 本提交 | 本提交 |
| `assumptions.json` | AI agent 基于任务书声明 | 自生成 | CC-BY-4.0 | 本提交 | 本提交 |
| `sources.json` | 严格对齐 `data/source_registry.json` | 组织方权威登记 | 见各条目 | 见各条目 | 见各条目 |
| `compliance_matrix.json` | AI agent 基于任务书骨架生成 | 自生成 | CC-BY-4.0 | 本提交 | 本提交 |
| `standard_matrix.json` | AI agent 基于任务书骨架生成 | 自生成 | CC-BY-4.0 | 本提交 | 本提交 |
| `design_depth_matrix.json` | AI agent 基于任务书骨架生成 | 自生成 | CC-BY-4.0 | 本提交 | 本提交 |
| `manifest.json` | AI agent 自动生成 | 自生成 | CC-BY-4.0 | 本提交 | 本提交 |
| `self_check.json` | AI agent 自动生成 | 自生成 | CC-BY-4.0 | 本提交 | 本提交 |

---

## 2. 空间数据 (geometry/*.geojson)

| 资产 | 来源 | 许可 | 精度声明 |
|---|---|---|---|
| `site_boundary.geojson` | `brief/site-package/geometry/provisional_boundaries.geojson`（组织方维护者提供） | 仓库使用许可 | **provisional**，不得作为 official redline 或 precise area calculation |
| `key_areas.geojson` | 同上 | 仓库使用许可 | **provisional** |
| `land_use.geojson` | AI agent 在 site_boundary 上用 shapely 生成 | CC-BY-4.0 | 基于临时边界 |
| `buildings.geojson` | AI agent 在 land_use 上生成 | CC-BY-4.0 | 概念性布局 |
| `roads.geojson` | AI agent 在 site_boundary 上生成 | CC-BY-4.0 | 概念性路网 |
| `green_space.geojson` | AI agent 在 site_boundary 上生成 | CC-BY-4.0 | 概念性绿廊 |
| `public_space.geojson` | AI agent 在 site_boundary 上生成 | CC-BY-4.0 | 概念性公共空间 |
| `constraints.geojson` | AI agent 在 site_boundary 上生成 | CC-BY-4.0 | 概念性约束 |
| `phasing.geojson` | AI agent 基于 land_use 派生 | CC-BY-4.0 | 概念性分期 |

**地图依赖许可**：本提交**未使用** OpenStreetMap（OSM）、Google Maps、Baidu Maps、Tencent Maps 或任何第三方地图瓦片/底图。全部几何由 shapely 在组织方提供的 provisional boundary 上操作生成。

**数据来源**：所有空间数据基于 `brief/site-package/geometry/provisional_boundaries.geojson`（组织方维护者提供的临时几何）。该几何来源已在 `sources.json` 中标注为 `provisional_only`，并在 README 和 assumptions.json 中反复声明。

---

## 3. 图件 (assets/figures/*.png)

| 资产 | 生成方法 | 字体 | 许可 | 备注 |
|---|---|---|---|---|
| `site-overview.png` | matplotlib | system default (Heiti SC) | CC-BY-4.0 | 概念性三层范围 |
| `key-areas.png` | matplotlib | system default (Heiti SC) | CC-BY-4.0 | 概念性重点区 |
| `land-use-structure.png` | matplotlib | system default (Heiti SC) | CC-BY-4.0 | 用地结构图 |
| `mobility-bluegreen.png` | matplotlib | system default (Heiti SC) | CC-BY-4.0 | 慢行+蓝绿 |
| `metrics-evidence.png` | matplotlib | system default (Heiti SC) | CC-BY-4.0 | 指标图 |
| `three-wings-synergy.png` | matplotlib | system default (Heiti SC) | CC-BY-4.0 | 三区两翼协同 |
| `zhongzhiyuan-concept.png` | matplotlib | system default (Heiti SC) | CC-BY-4.0 | 众智园大比例概念 |
| `ai-origin-community-concept.png` | matplotlib | system default (Heiti SC) | CC-BY-4.0 | AI原点社区概念 |
| `dazhongsi-concept.png` | matplotlib | system default (Heiti SC) | CC-BY-4.0 | 大钟寺概念 |
| `ai-ecosystem-map.png` | matplotlib | system default (Heiti SC) | CC-BY-4.0 | AI 生态图谱 |
| `public-space-components.png` | matplotlib | system default (Heiti SC) | CC-BY-4.0 | 公共空间组件库 |
| `scenario-network.png` | matplotlib | system default (Heiti SC) | CC-BY-4.0 | 场景网络图 |
| `logo-full.png` | ImageGen via WorkBuddy (AI 生成) | 系统字体 | 仅本提交展示 | **未进行商标检索** |
| `logo-icon.png` | ImageGen (AI 生成) | 系统字体 | 仅本提交展示 | **未进行商标检索** |
| `logo-wordmark.png` | ImageGen (AI 生成) | 系统字体 | 仅本提交展示 | **未进行商标检索** |

**字体声明**（matplotlib 生成）：使用 macOS 系统默认字体（Heiti SC / Arial Unicode MS），**不嵌入、不分发**。

**第三方图片依赖**：本提交**未使用**任何第三方图片、图标、照片、插画。全部图形由 matplotlib 从自生成 GeoJSON 派生。

---

## 4. 图纸 (drawings/*.pdf)

| 资产 | 生成方法 | 字体 | 许可 | 备注 |
|---|---|---|---|---|
| `a3-booklet.pdf` | reportlab | **NotoSansTC-Regular + NotoSansTC-Bold（嵌入）** | OFL-1.1 | 见下方字体许可声明 |
| `a0-boards.pdf` | reportlab | **NotoSansTC-Regular + NotoSansTC-Bold（嵌入）** | OFL-1.1 | 见下方字体许可声明 |

### 字体嵌入许可声明

A3 / A0 PDF 嵌入的字体为 **Noto Sans TC**（思源黑体繁体），授权许可为 **SIL Open Font License Version 1.1 (OFL-1.1)**。

**OFL-1.1 关键条款**：
- 允许：自由使用、研究、修改、再分发、嵌入
- 必须：保留版权声明；如修改须以新名称标识
- 不得：单独销售字体本身
- 完整许可文本：https://scripts.sil.org/OFL

**字体来源**：Adobe 官方字体分发页 / Google Fonts（公开可下载）。本提交中嵌入该字体符合 OFL-1.1 所有条款。

**Helvetica (reportlab built-in)**：仅在英文字符回退场景下被使用，**不嵌入 PDF**，仅在渲染时按系统字体回退。Helvetica 属于 Adobe Core Fonts，受 Adobe 商业许可约束。

---

## 5. Logo 商标检索声明

**重要提示**：本提交中的三件套 Logo 由 AI agent 生成（ImageGen via WorkBuddy），**未进行正式的商标近似检索**。

**已采取的措施**：
- Logo 设计融合"铁轨—神经网络—绿叶"三重意象，为自创图样
- 中英文文字标（"京张智脉 / Jingzhang Smart Vein"）为描述性词汇，未直接使用他人注册商标
- 配色方案（深蓝 + 科技蓝 + 绿色）属于行业通用色系

**未采取的措施**：
- ❌ 未在国家知识产权局商标局数据库进行正式检索
- ❌ 未在 WIPO Madrid International 进行国际商标检索
- ❌ 未在欧盟 EUIPO、英国 IPO、美国 USPTO 等主流商标库进行检索

**强烈建议**（运营主体在实际使用前必须完成）：
1. 委托专业商标代理机构在国家知识产权局商标局进行完整检索
2. 同步进行国际商标检索（特别是英联邦、北美、欧盟、东亚市场）
3. 提交商标注册申请（建议覆盖 9/35/38/41/42 类）
4. 检索完成后取得《商标注册申请受理通知书》或《商标注册证》方可正式商业使用

**本提交责任限制**：本提交不对 Logo 在任何司法管辖区的可注册性作任何保证。使用本提交 Logo 产生的一切商标纠纷，由实际使用方自行承担责任。

---

## 6. 可视化 (visual/index.html)

- **生成方法**：纯静态 HTML + inline CSS + inline SVG
- **外部资源加载**：**无**（验证：no remote scripts, no remote fonts, no remote map tiles, no iframes, no forms, no external APIs）
- **唯一例外**：`xmlns="http://www.w3.org/2000/svg"` 是 XML 命名空间标识符，不是资源加载
- **许可**：CC-BY-4.0

---

## 7. 代码依赖与许可

| 依赖包 | 版本约束 | 许可 | 用途 |
|---|---|---|---|
| Python | 3.13.12 (managed) | PSF | 运行时 |
| shapely | 2.x | BSD-3 | 几何操作 |
| pyproj | 3.x | MIT | 投影转换 |
| matplotlib | 3.x | PSF-based | 图件绘制 |
| reportlab | 4.x | BSD-3 | PDF 生成 |
| Pillow (PIL) | 10.x | HPND | 图像处理 |
| numpy | 1.x | BSD-3 | 数值计算 |

所有依赖包均使用其原始许可，**不修改、不二次分发**。代码本身为本 agent 私有脚本（位于仓库外），不随提交发布。

---

## 8. 数据依赖与许可

| 数据 | 来源 | 许可 | 使用方式 |
|---|---|---|---|
| Provisional geometry | `brief/site-package/geometry/provisional_boundaries.geojson` | 仓库使用许可 | 全部空间几何的基底 |
| 用地分类编码 | 自然资源部《国土空间调查、规划、用途管制用地用海分类指南》 | 政府公开 | 用地代码引用 |
| 城市设计管控规则 | 城市设计管理办法 | 政府公开 | 设计依据引用 |

**未使用**：OSM、OpenAddresses、自然资源调查数据、卫星影像、第三方 POI 数据、第三方统计年鉴。

---

## 9. 引用内容合规

`report/background_references.md` 列出了所有**未在 `data/source_registry.json` 中登记的参考引用**（包括 PIPL、各地城市更新指引、全球科技城案例等）。这些引用仅作为**设计输入**使用，**不构成对未登记来源权威性的合规背书**。如本提交中将任何 background 引用作为正式论证依据，须先由组织方在 source registry 中登记升级。

---

## 10. 免责声明

- 本声明为 AI agent 基于知识与文件内容作出的诚实声明
- 不构成法律意见，不替代正式知识产权清算审查
- 如发现任何资产存在权利瑕疵，应立即替换或下架
- 本提交不对 Logo 在任何司法管辖区的可注册性作保证
- 字体嵌入许可以 SIL OFL-1.1 官方文本为准
- 实际运营使用前须委托专业机构完成完整商标检索与注册

*最后更新：2026-08-09*