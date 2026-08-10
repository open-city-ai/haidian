# Copyright Statement — 京张智脉共生带方案包

## 1. 声明主体

- **作者**：jinbohao1688（GitHub 用户名），即本方案包的提交者和声明主体。
- **AI Agent**：GLM-5.2 via TraeCode，由智谱 AI 提供。
- **生成时间**：2026-08-10
- **方案包 ID**：jingzhang-ai-vein

## 2. 资产级版权台账

### 2.1 文本资产

| 资产 | 文件路径 | 作者/来源 | 许可状态 |
| --- | --- | --- | --- |
| 方案正文 | proposal.md | AI Agent (GLM-5.2) 生成，jinbohao1688 声明 | COMMUNITY-DISPLAY-ONLY |
| 叙事文档 | report/narrative.md | AI Agent (GLM-5.2) 生成，jinbohao1688 声明 | COMMUNITY-DISPLAY-ONLY |
| 版权声明 | report/copyright_statement.md | AI Agent (GLM-5.2) 生成，jinbohao1688 声明 | COMMUNITY-DISPLAY-ONLY |
| HTML 展示 | visual/index.html | AI Agent (GLM-5.2) 生成，jinbohao1688 声明 | COMMUNITY-DISPLAY-ONLY |
| HTML 方案 | report/proposal.html | AI Agent (GLM-5.2) 生成，jinbohao1688 声明 | COMMUNITY-DISPLAY-ONLY |

所有文本资产均由声明的 AI Agent 生成，无第三方版权文本引用。方案中提及的公告条文、任务书要求均为公开文件引用，引用目的为设计依据说明，不构成版权侵权。

### 2.2 字体

| 字体名称 | 用途 | 许可证 | 商用状态 |
| --- | --- | --- | --- |
| 思源黑体 (Source Han Sans) | 中文主字体 | SIL Open Font License 1.1 | 可免费商用 |
| Inter | 英文主字体 | SIL Open Font License 1.1 | 可免费商用 |
| JetBrains Mono | 数字辅助字体 | Apache License 2.0 | 可免费商用 |
| Microsoft YaHei | 图表回退字体 | Microsoft 系统字体 | 仅限 Windows 系统渲染使用 |
| SimHei | 图表回退字体 | Microsoft 系统字体 | 仅限 Windows 系统渲染使用 |

注：图表和 PDF 在生成时使用 matplotlib 的字体回退机制。最终发布版本应嵌入思源黑体以确保跨平台一致性。当前 PDF 中的文字渲染依赖系统字体，如评审者系统缺少相应字体可能出现字形替代。

### 2.3 图像与图表

| 资产 | 文件路径 | 生成方式 | 来源说明 |
| --- | --- | --- | --- |
| 场地总览图 | assets/figures/site-overview.png | Python 脚本 (matplotlib) 生成 | 基于 brief/site-package/ 的 provisional boundaries |
| 用地结构图 | assets/figures/land-use-structure.png | Python 脚本 (matplotlib) 生成 | 同上 |
| 重点区域索引图 | assets/figures/key-areas.png | Python 脚本 (matplotlib) 生成 | 同上 |
| 交通蓝绿系统图 | assets/figures/mobility-bluegreen.png | Python 脚本 (matplotlib) 生成 | 同上 |
| 核心指标图 | assets/figures/metrics-evidence.png | Python 脚本 (matplotlib) 生成 | 同上 |

所有图表均由 `scripts/generate_jingzhang_vein.py` 使用 matplotlib 自动生成，无外部图片、照片或插图引用。图表中的地理数据基于组织方提供的 provisional boundaries，未使用商业地图瓦片或第三方地图服务。

### 2.4 地图数据

| 数据 | 来源 | 许可状态 |
| --- | --- | --- |
| 场地边界 | brief/site-package/geometry/provisional_boundaries.geojson | 组织方提供，provisional_only，仅限方案生成使用 |
| 重点区域 | brief/site-package/geometry/provisional_boundaries.geojson | 同上 |
| 道路网络 | AI Agent 基于公开道路走向生成 | 原创生成，非商业地图数据 |
| 建筑布局 | AI Agent 基于概念设计生成 | 原创生成，非现状建筑数据 |

本方案未使用 Google Maps、百度地图、高德地图或任何商业地图瓦片服务。所有空间数据均为原创生成或基于组织方提供的 provisional boundaries。

### 2.5 PDF 图纸

| 资产 | 文件路径 | 生成方式 | 字体嵌入状态 |
| --- | --- | --- | --- |
| A3 文册 | drawings/a3-booklet.pdf | Python 脚本 (matplotlib PdfPages) 生成 | 依赖系统字体，未嵌入 |
| A0 展板 | drawings/a0-boards.pdf | Python 脚本 (matplotlib PdfPages) 生成 | 依赖系统字体，未嵌入 |

### 2.6 代码依赖

| 依赖库 | 版本 | 许可证 | 用途 |
| --- | --- | --- | --- |
| Python | 3.x | PSF License | 运行环境 |
| matplotlib | 3.x | PSF-based License | 图表和 PDF 生成 |
| numpy | 1.x | BSD-3-Clause License | 数值计算 |
| shapely | 2.x | BSD-3-Clause License | 空间几何运算 |
| pyproj | 3.x | MIT License | 坐标投影转换 |

所有代码依赖均为开源许可，允许商业和非商业使用。

### 2.7 AI 生成方式说明

| 资产类别 | 生成工具 | 生成方式 |
| --- | --- | --- |
| 方案文本 | GLM-5.2 via TraeCode | AI Agent 根据公告、任务书和场地资料生成 |
| Python 脚本 | GLM-5.2 via TraeCode | AI Agent 生成，用于自动化产出 GeoJSON、图表和 PDF |
| GeoJSON 图层 | Python 脚本 (generate_jingzhang_vein.py) | 脚本自动生成，非 AI 直接生成 |
| 图表 (PNG) | Python 脚本 (matplotlib) | 脚本自动生成 |
| PDF 图纸 | Python 脚本 (matplotlib PdfPages) | 脚本自动生成 |
| HTML 页面 | GLM-5.2 via TraeCode | AI Agent 生成 |

### 2.8 商标使用声明

- 方案中提及的 "Google"、"MIT"、"Sidewalk Labs" 等企业或机构名称仅用于案例研究对标，不涉及商标使用、授权或背书。
- "京张智脉"、"Jingzhang AI Vein"、"JZAV" 为本方案原创命名，未注册商标，不侵犯已知商标权利。
- 方案中提及的 "清华园火车站"、"詹天佑" 等历史名称为公共文化引用。

## 3. 免责声明

- 本方案包中的所有设计内容均为概念建议，不构成法定规划、审批依据或实施承诺。
- provisional boundary 相关的空间数据和面积指标不可作为 official redline 或精确面积依据。
- 作者对方案中事实陈述、来源引用、版权声明和空间数据的准确性负责。
- 维护者和专业评审可依据自检结果、空间复核和合规矩阵要求返修或拒绝。
- 如发现任何资产的版权或许可问题，作者承诺在收到通知后立即替换或移除相关资产。
