# 版权与来源声明

## 版权声明

本方案全部内容由 QClaw AI Agent（账号 youlan2333）生成，依据《百年京张AI创新带城市设计国际方案征集》共创宪章和开源征集规则提交。方案 license 为 **COMMUNITY-DISPLAY-ONLY**，未经授权不得用于商业目的。

## 方案名称

- **设计概念名（英文正文）**: Jingzhang AI Symbiosis Corridor（京张智脉共生带）
- **项目标识名**: Centennial Jingzhang AI Belt（百年京张AI创新带，对应 manifest.project_id = centennial-jingzhang-ai-belt）

## 数据来源

| 类别 | 来源 | 使用范围 |
|------|------|----------|
| 临时边界 | brief/site-package/geometry/provisional_boundaries.geojson | 仅作概念生成、可视化、设计讨论；不得作为官方红线或审批依据 |
| 用地分区 | submissions/.../geometry/land_use.geojson | 概念设计分区，待官方控规确认 |
| 指标 | submissions/.../metrics.json | 基于 provisional boundary 计算；official boundary 发布后需重算 |
| 场景卡 | submissions/.../proposal.md | 概念建议，不承诺官方实施 |
| 场地包 | brief/site-package/ | 全部引用来自官方公开登记资料 |

## 图件逐资产版权清权

### 5张设计图 (assets/figures/*.png)

| 文件 | 内容类型 | 字体 | 版权状态 |
|------|----------|------|----------|
| site-overview.png | AI生成场地总览图 | SimHei (系统字体) + Arial (系统字体) | AI原创作品；字体为Windows系统字体（Microsoft桌面字体EULA覆盖） |
| land-use-structure.png | AI生成用地结构图 | SimHei + Arial | 同上 |
| key-areas.png | AI生成重点区域图 | SimHei + Arial | 同上 |
| mobility-bluegreen.png | AI生成蓝绿慢行图 | SimHei + Arial | 同上 |
| metrics-evidence.png | AI生成指标证据图 | SimHei + Arial | 同上 |

### 英文版图件 (assets/figures/*.en.png)

| 文件 | 内容类型 | 版权状态 |
|------|----------|----------|
| site-overview.en.png 等 5 张 | 英文标题覆盖层叠加于中文底图 | AI原创；仅标题翻译，底图为对应中文图的同文件 |

> ⚠️ **已知局限**：英文版图件为英文标题覆盖（Overlay），非全图重新翻译，底图仍为中文内容。如需正式英文展板，应重新生成完整英文图件。

### A3 手册 (drawings/*.pdf)

| 文件 | 内容 | 字体 | 版权状态 |
|------|------|------|----------|
| a3-booklet.pdf | AI生成中文版手册 | SimHei + Arial | AI原创作品 |
| a3-booklet.en.pdf | AI生成英文版手册 | SimHei + Arial | AI原创作品 |
| a3-cover.pdf / a3-cover.en.pdf | 封面页 | SimHei + Arial | AI原创作品 |
| a3-three-layer-space.pdf 等 4 份 | 各专题页 | SimHei + Arial | AI原创作品 |

### A0 展板 (drawings/*.pdf)

| 文件 | 版权状态 |
|------|----------|
| a0-boards.pdf | AI原创作品 |
| a0-boards.en.pdf | AI原创作品 |

### HTML 可视化 (visual/*.html)

| 文件 | 版权状态 |
|------|----------|
| visual/index.html | AI生成；无外部依赖（无远程脚本、字体、地图瓦片） |
| visual/index.en.html | AI生成；无外部依赖 |

## 字体说明

- **SimHei (simhei.ttf)**: Windows 中文系统字体，随 Windows 操作系统提供，由 Microsoft 桌面字体最终用户许可协议（EULA）覆盖。用于图件和 PDF 中的中文文本。
- **Arial (arial.ttf)**: Windows 西文字体，随 Microsoft Office/Windows 提供，由 Microsoft 桌面字体 EULA 覆盖。用于图件和 PDF 中的英文文本。
- 本方案图件和 PDF 中使用的字体均属上述系统字体范围，无需单独购买字体许可证。

## GeoJSON 空间数据

所有 geometry/*.geojson 文件为 AI 基于场地包（brief/site-package/）中的 provisional_boundaries.geojson 和公开资料生成的原创空间设计数据，license 为 COMMUNITY-DISPLAY-ONLY。

## 代码与脚本

本方案不含引入第三方代码。所有生成逻辑均为 QClaw AI Agent 原创实现。

## 合规确认

- ✅ 不包含非公开图件、数据或内控指标
- ✅ 不包含未经授权的肖像、商标、论文图像或版权材料
- ✅ 所有图件、字体、PDF 均有明确来源说明
- ⚠️ 英文版图件（*.en.png）仅标题翻译，非全图重新翻译，存在局限（见上表）
- ⚠️ 英文版 A3/A0 首屏近乎空白，未达到与中文版同等的信息密度（见 manifest known_blockers）
- 所有空间建议均表述为"概念建议""参考方案""可供专业团队深化研究"
- FAR、建筑高度、拆改留、道路红线等法定指标均标注为"待确认"或 unknown

---
生成时间：2026-08-10
最后更新：2026-08-14（扩展逐资产版权清权、字体说明、已知局限标注）
license: COMMUNITY-DISPLAY-ONLY
