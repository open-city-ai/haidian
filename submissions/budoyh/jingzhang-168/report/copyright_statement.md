# 版权、生成方式与授权声明

## 1. 许可范围

本提交采用 `COMMUNITY-DISPLAY-ONLY`：允许 `open-city-ai/haidian` 仓库为本次征集的收件、机器审查、维护者复核、社区讨论与非商业展示而保存、渲染和呈现本包。该许可不授予工程实施、商业开发、第三方再许可，也不表示任何政府部门、主办方或专业机构已经采纳、批准、背书或承诺实施。

## 2. 文字、数据与确定性证据图

中英正文、周运行协议、状态机、RACI、实施闸门、场景卡、矩阵、自检和本包内方案 GeoJSON 由提交者在 OpenAI Codex 辅助下为本次征集编制。五张中文核心图及五张英文对应图、中文/英文 A3 文册、中文/英文 A0 展板和离线 HTML 由本地确定性渲染流程读取本包 GeoJSON、`metrics.json`、`assumptions.json`、协议 JSON 与矩阵生成；地图不使用商业底图、外部瓦片、航片或第三方地图截图。若图面与机器可读资产冲突，以机器资产、更高等级来源及后续专业复核为准。

核心证据资产为：

- `assets/figures/site-overview(.en).png`
- `assets/figures/land-use-structure(.en).png`
- `assets/figures/key-areas(.en).png`
- `assets/figures/mobility-bluegreen(.en).png`
- `assets/figures/metrics-evidence(.en).png`
- `drawings/a3-booklet(.en).pdf`
- `drawings/a0-boards(.en).pdf`

本地排版使用 Windows 环境中的 Noto Sans SC、Bahnschrift 与 Segoe UI 字体；不从远程加载字体。字体只在本包图件/PDF中用于排版，其授权仍归各权利人所有。

## 3. GPT Image 2 概念体验图

以下四张无文字图于 2026-08-09 通过 OpenAI 内置图像通道的 `GPT Image 2` 生成，并经人工检查；它们均标记为 `presentation only`，不能支撑边界、面积、现状、建筑、道路、轨道、市政、容量、安全、审批或实施结论：

- `assets/figures/concept-experience-v2.png`
- `assets/figures/concept-validation-garden-v2.png`
- `assets/figures/concept-knowledge-hub-v2.png`
- `assets/figures/concept-civic-living-room-v2.png`

每张图的模型、日期、参考关系、最终提示记录、用途、人工检查与禁止用途逐项登记于 `visual/assets/rights-ledger.json`。生成时未请求或嵌入真实人物肖像、第三方标志、商标、新闻图片、商业底图、官方图章或可识别真实建筑；知识换乘站图曾由同一图像通道进行定点编辑，移除了中央板上的伪文字。概念图与确定性证据发生冲突时，概念图不具有证据效力。

## 4. 外部资料与同行方案

征集公告、任务书、仓库站点包、公开标准和国际案例只以带来源的事实性概括和机制比较使用，未复制第三方图纸、摄影、地图或界面。高分同行方案只用于比较证据颗粒度、双语交付、空间化场景、建设闸门和权责分离方法；未复制其概念名称、文字、图像、几何、协议、数据或品牌。完整来源和“不照搬”边界见 `sources.json` 与正文“设计依据与资料清单”。

## 5. 责任与待确认边界

提交者 `budoyh` 对最终提交内容负责。AI 生成或辅助内容不构成法定规划、专业签章、工程安全、采购、医疗、法律或政府决策意见。临时边界、概念建筑、预算、容量、SLO、运营主体和全部运行成效均按本包标识保持 provisional 或 unknown，直至取得官方资料、授权主体、现场测量与相应专业复核。

---

**English summary.** Text and structured evidence were prepared with OpenAI Codex assistance. Four named, text-free concept images were generated with GPT Image 2 on 2026-08-09 and are presentation-only. All core maps, labels, numbers, bilingual figures and technical PDF content are deterministic views of local package data. No commercial basemap, external tile, third-party logo, portrait or official endorsement is used. Licence: `COMMUNITY-DISPLAY-ONLY`.
