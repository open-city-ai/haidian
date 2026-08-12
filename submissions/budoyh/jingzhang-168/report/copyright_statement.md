# 版权、生成方式与授权声明

## 1. 许可范围

本提交采用 `COMMUNITY-DISPLAY-ONLY`：允许 `open-city-ai/haidian` 仓库为本次征集的收件、机器审查、维护者复核、社区讨论与非商业展示而保存、渲染和呈现本包。该许可不授予工程实施、商业开发或第三方再许可，也不表示任何政府部门、主办方、专业机构或案例主体已经采纳、批准、背书、采购、合作或承诺实施。

## 2. 文本、数据与确定性证据

中英正文、公共红利合同、四态协议、RACI、实施闸门、场景卡、矩阵、自检与方案 GeoJSON 由提交者在 OpenAI Codex 辅助下为本次征集编制。最终责任人为 GitHub 用户 `budoyh`。

下列证据层由本地确定性流程读取本包 GeoJSON、`metrics.json`、`assumptions.json`、协议 JSON 与矩阵生成；其文字、数字、图例和地图不是 GPT Image 2 生成内容：

- 五张中文核心图及五张英文对应图：`assets/figures/*.png`；
- 中文/英文 A3 文册：`drawings/a3-booklet(.en).pdf`；
- 中文/英文 A0 展板：`drawings/a0-boards(.en).pdf`；
- 离线正文 HTML 与交互展示：`report/proposal(.en).html`、`visual/index(.en).html`。

地图不使用商业底图、外部瓦片、航片或第三方地图截图。若显示层与机器资产冲突，以带来源的 GeoJSON/JSON、矩阵及后续专业复核为准。

本地排版使用 Noto Sans SC、Noto Serif SC、Bahnschrift 与 Segoe UI；不发起远程字体请求。四份 PDF 中实际使用的字体均嵌入并子集化；字体权利仍归各权利人所有。

## 3. GPT Image 2 概念体验资产

以下三张最终 WebP 由本项目 2026-08-11 通过 OpenAI 内置图像通道生成的三张无文字 GPT Image 2 源图，经本地确定性裁切、降饱和、调对比、暖色薄层与压缩得到：

- `assets/media/concept-safety-dividend-v4.webp`；
- `assets/media/concept-open-dividend-v4.webp`；
- `assets/media/concept-everyday-dividend-v4.webp`。

第三张源图的初稿曾在停放设备上出现字母状伪文字，已在同一图像会话中定点移除，随后以原分辨率复核。三张 v4 成品与它们组成的 `cover.webp`、视频海报和视频帧均经人工检查，未发现可读文字、伪文字、数字、Logo、商标、水印或真实人物肖像。

这些资产全部为 `concept / presentation only`，不能支撑边界、面积、现状、建筑、植被、道路、轨道、市政、容量、安全、审批、合作、人数、公众意见、现场绩效或实施结论。每张图的模型、日期、源输出标识、完整提示词、人工检查、v4 转换和禁止用途逐项登记于 `visual/assets/rights-ledger.json`。

`assets/media/cover.webp` 与 `city-on-walkthrough-poster.webp` 是三张成品的本地无字拼接。`city-on-walkthrough.mp4` 是约34秒无声、无片内文字、无自动播放的本地平移与淡入淡出序列；双语信息由 `city-on-walkthrough.vtt` 和 `city-on-walkthrough.md` 提供。视频同样不具有证据效力。

## 4. 外部资料与同行方案

征集公告、任务书、仓库资料、公开标准、北京与海淀公开资料及国际案例只以带来源的事实摘要和机制比较使用，未复制第三方图纸、摄影、地图、Logo、界面、视频或长段文字。高分同行方案只用于比较证据颗粒度、失败路径、双语交付、空间化场景与权责分离方法；未复制其概念名称、文字、图像、几何、协议、数据或品牌。来源的发布者、日期、采集方式、时空范围、权利、转换、允许用途与限制见 `sources.json`。

## 5. 责任与待确认边界

本包不包含个人隐私、受限资料、真实业务数据或未经授权的空间信息。临时边界、概念建筑、预算、容量、运营主体、专业签审与现场成效均保持 `provisional`、`pending` 或 `unknown`，直至取得官方资料、授权主体、现场测量和相应专业复核。AI 生成或辅助内容不构成法定规划、工程安全、采购、医疗、法律或政府决策意见。

---

**English summary.** Text, contracts, geometry, metrics, matrices, bilingual evidence figures, HTML and technical PDFs were prepared with OpenAI Codex assistance; `budoyh` remains responsible for the final submission. Three text-free GPT Image 2 sources generated on 2026-08-11 were deterministically cropped, graded and encoded into the three named v4 concept WebPs. Their cover, poster and silent 34-second walkthrough are presentation-only and prove no site, building, number, approval, partnership or field effect. The five bilingual evidence figures and all exact labels and numbers are deterministic views of local package data. No commercial basemap, remote tile, third-party logo, portrait or official endorsement is used. Licence: `COMMUNITY-DISPLAY-ONLY`.
