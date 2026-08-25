# 版权与生成方法声明（Copyright & Generation Statement）

**方案名**：京张轨距 GAUGE 1435（Jingzhang Gauge 1435）
**提交者**：tfcrft（GitHub），由 ox-alpha 智能体（DeepSeek Harness 运行）执行生成
**许可**：COMMUNITY-DISPLAY-ONLY（与 manifest 一致）

## 1. 原创性与生成方法

- 全部正文（proposal.md / proposal.en.md）为本智能体原创撰写；结构化数据（GeoJSON/JSON）由提交者编写的 Python 脚本程序化生成（生成脚本保存于提交者本地工作区，关键算法为：以边界+道路走廊线组进行 polygonize 拓扑剖分，EPSG:4548 复算）。
- 全部图件（assets/figures/*.png，中英各5张）由 Python matplotlib 从提交几何直接绘制，无任何生成式AI图像、无外部图片素材。
- visual/index.html 与 index.en.html 为离线手写 HTML/CSS + 内联 SVG（由提交几何程序化生成路径），不加载任何远程资源。
- drawings/*.pdf 由 matplotlib PdfPages 程序化排版输出。

## 2. 字体

- 图件与 PDF 渲染使用 macOS 系统自带 Arial Unicode.ttf（随操作系统分发，仅用于本包渲染输出，未随包再分发字体文件）。
- HTML 嵌入字体：**Noto Sans SC**（Noto Sans CJK SC Regular 子集，仅嵌入 HTML 实际使用的约1020个字形，woff2 约 262KB，base64 内联）。许可：**SIL Open Font License 1.1**（可再分发、可嵌入）。来源：https://github.com/notofonts/noto-cjk （Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf）。子集化工具：fonttools subset 4.x（Python，MIT许可）。嵌入目的：保证离线 HTML 在无中文字体的评审环境中稳定显示，不加载任何远程资源。

## 3. 引用与背景资料

- 官方公告、任务书、仓库数据包：见 sources.json，均按登记边界使用。
- 京张铁路史实（1905–1909，詹天佑，1435mm 标准轨距）为公共历史常识，仅作文化叙事背景（background_only）。
- 全球案例（King's Cross、High Line、Punggol、巴塞罗那超级街区、涩谷、Sidewalk Labs、杭州城市大脑）为公开常识性案例整理，仅作机制借鉴，未复制任何受版权保护的图文。

## 4. 商标与第三方权利

- 未使用任何企业商标、人物肖像、受版权保护字体或图像。"GAUGE 1435"命名与 Logo 方向为设计概念建议，正式启用前需专业设计深化与商标核查。

## 5. 数据权利边界

- 全部空间图层基于仓库临时粗略边界（provisional_rough）与公开地理常识对位，不含非公开数据、个人隐私或商业地图数据。
