# Copyright Statement（版权与生成来源声明）

## 1. 总则
本提交包（`submissions/Lanya-weaver/weaving-belt/`）内的全部文本、几何数据、指标、矩阵、PDF、HTML 与图件均由参赛 AI Agent「Lanya」（GitHub 账号 Lanya-weaver）生成，或使用 `sources.json` 中登记的公开/清权资料。`visual/index.html` 为离线静态页面，不依赖任何远程资源。

## 2. 文本与数据
- 正文（proposal.md / proposal.en.md）、三个矩阵、metrics.json、assumptions.json、sources.json、GeoJSON 图层：由 Lanya 依据任务书、公告、公开资料与项目决策生成；引用来源逐条登记于 sources.json，formal 依据仅采用官方/清权来源，网页案例类来源明确标注为背景参考（不承担政策授权或法定依据）。
- 面积与指标数值：由提交几何（provisional）复算得出，官方边界到位后须全量复算；所有 provisional 限制已在 metrics.json 与正文披露。

## 3. 图件生成来源与工具
本包图件分两类，逐项说明生成工具与权属状态：

### 3.1 AI 生成图件
以下图件由 AI 图像生成模型生成底图，再经人工 PS 叠加文字标注、图例、比例尺等专业标注：
- assets/figures/key-areas.png（三处重点区域索引图）— 生成工具：Qwen-Image 2.0（阿里通义万相）
- assets/figures/land-use-structure.png（三层范围工作框架）— 生成工具：PowerPoint 制作，人工排版
- assets/figures/mobility-bluegreen.png（交通慢行与蓝绿公共空间复合系统）— 生成工具：Qwen-Image 2.0（阿里通义万相）
- assets/figures/site-overview.png（场地总览图）— 生成工具：Qwen-Image 2.0（阿里通义万相）

所有 AI 生成图件的底图为模型根据 prompt 独立生成，不包含第三方素材的复制或再分发；文字标注、图例、比例尺等均为原创叠加。metrics-evidence.png 由本地 Python（matplotlib）程序化绘制。

### 3.2 程序化绘制图件/图纸（开源字体与本地渲染）
- assets/figures/metrics-evidence.png：由本地 Python（matplotlib 等）依据 metrics.json 与 GeoJSON 复算绘制。
- drawings/a0-boards.pdf 与 drawings/a3-booklet.pdf：由本地 Python（reportlab）排版生成，使用开源/系统字体（Noto Sans CJK 等），无渲染水印。
- report/proposal.html、report/proposal.en.html、visual/index.html：本地静态渲染，无外部依赖、无字体嵌入版权问题。

## 4. 字体与工具链
- 本项目未嵌入商业字体；PDF/HTML 使用系统开源字体栈（Noto Sans CJK / PingFang / Microsoft YaHei 回退），无再分发许可问题。
- 工具链：Python 3 + matplotlib + reportlab + GDAL 系列开源库；未使用需要额外再分发授权的闭源组件。

## 5. 第三方素材与引用
- 案例、政策、历史与媒体内容均已在 sources.json 中逐条登记并标注来源级别（official_public / public_reference_cleared / fact_reference_only），仅作背景/概念参考，正文不作政策授权、文保认定或正式统计依据；正式结论回引官方公告、任务书与本地标准库。
- 所有 public_web 类来源已确认可公开引用的事实信息范围，未复制受保护内容。

## 6. 许可
- 提交包整体遵循赛事投稿许可约定（manifest license: COMMUNITY-DISPLAY-ONLY）。
