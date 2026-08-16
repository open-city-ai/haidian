# 版权、来源与生成声明 / Copyright, Sources and Generation Statement

本投稿的中英文叙事、结构化台账与证据映射由 OpenAI Codex（GPT-5.6）基于仓库公开或用户清权材料生成，并由主代理与 agent team 分工复核。正文生成脚本不生成或修改图板、PDF、`manifest.json` 或 `self_check.json`。

五组中英文核心图板与中英文 A3 册页共 34 个可见页面，全部由 OpenAI gpt-image-2 生成或定向编辑；PDF 打包只放置经接受的整页图像，未叠加任何可见文字、线条、形状、图表或标注。逐页模型、源图 SHA-256、输入排除项和人工复核状态见 `visual/assets/image2-production-record.json`，资产权利见 `visual/assets/asset-rights-ledger.json`。这些图像仅作概念性竞赛表达，不是现状照片、测绘底图、公众意见、工程可行性或官方背书；页内文字、数字、编号、图例和警示均已回到 GeoJSON、`metrics.json` 与结构化台账复核。

交付前对十张主图仅进行技术编码优化：从已接受的 RGB 像素源生成无抖动自适应调色板 PNG，不添加、删除或程序重绘任何可见设计内容。每张图仍为 2400×1500，并保留 `board_id`、`language` 与 `hard_counts` 文本块；源图/交付图哈希、字节数、调色板规模、像素 MAD、PSNR、人工原尺寸 stop-ship 和 HTML/PDF 关联均记录于 `visual/assets/image2-production-record.json`。PDF 可见页及其 Image-2 来源未因该交付编码步骤而改变。

六个全球案例仅使用其官方机构页面核对事实和运营机制：JTC Punggol Digital District、Mila、STATION F、High Tech Campus Eindhoven、DIFC Dubai AI Campus 与 City of Helsinki Testbed Helsinki。没有复制这些网站的照片、地图、Logo、图标、口号或页面设计。JTC、STATION F、HTCE 与 DIFC 内容按版权保留处理；Mila 的开放科学不等于所有成果开放，具体代码/原型逐项目许可；Helsinki 网站文本为 CC BY 4.0，但图片仍需许可。完整 URL、访问日期和使用限制见 `sources.json`。

提交包不分发第三方网站媒体。为消除 Linux 离线渲染对宿主字体的依赖，`competition.css` 内嵌一份 Noto Sans SC 静态 400 WOFF2 子集；源字体和子集再分发遵循 SIL Open Font License 1.1，源二进制与子集 SHA-256、字符覆盖、网页嵌入权和 12 组运行检查均记录于资产与无障碍台账。PDF 仅嵌入项目自有 Image-2 页面和按许可生成的不可见检索字体子集。无法证明可再分发的素材不得进入包。投稿整体采用 `COMMUNITY-DISPLAY-ONLY` 展示条款，外部原始材料和商标权利仍归各自权利人。

四张 `assets/media/*.png` 分别记录作者/生成边界、文件 SHA-256、网页使用权与概念限制；交付仅执行无抖动索引色技术编码，不新增文字、地图、标志或空间事实。它们不是现状照片、测绘底图、选址结论或第三方案例素材。Pillow、fontTools、ReportLab、pypdf、Poppler 与 Chromium 仅作本地构建或核验工具，其二进制不随投稿分发。

All site and station geometry is conceptual or provisional unless a record explicitly says otherwise. The work does not claim official approval, selection, construction, procurement, investment, legal compliance or professional certification. Official geometry, controls, ownership, utilities, heritage, safety, verified community needs, funding and accountable operators require separate confirmation before implementation. External PR #2247 informed process comparison only and supplied no image, text, data or design asset to this submission.

Final delivery verification measured 52,223 extractable characters across all 34 pages of the four PDFs, with a minimum of 647 characters on every page. The refreshed semantic layers preserve the previously accepted visible DCT image streams and placement matrices; direct 150/200 dpi comparison found no visible pixel drift. The ten repository PNGs received metadata-only corrections so that `hard_counts` states current board facts and `legacy_contract_counts` preserves the earlier aggregate contract; their RGB pixels are unchanged. These are reproducibility and packaging checks, not legal or professional accessibility certification.
