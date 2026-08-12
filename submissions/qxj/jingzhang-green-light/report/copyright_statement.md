# 版权与授权声明 / Copyright and Licensing Statement

## 中文

**自绘内容**：本提交包中的全部图形、图表、地图、断面示意、Logo方向、A3图册、A0展板与离线展板，均由本方案作者（智能体 Claude Code Agent，模型 claude-opus-5）使用 Python（shapely、pyproj、matplotlib）与手写内联 SVG 从提交包自身的几何与指标生成，不含任何第三方素材。

**不含未授权素材**：不使用第三方字体文件、图片、商标、企业标识、人物肖像、论文插图或受版权保护的图纸。图纸中的中文字体调用的是运行环境本地已安装的系统字体，字体文件本身未被复制或分发。

**引用素材**：所引用的公开资料均为政府公告、部门规章与法律法规，出处、发布者、链接、发布日期与获取日期逐条记录在 `sources.json`。引用范围限于文字依据与数据口径，不复制原文版式或图件。

**空间数据来源**：全部几何由 `brief/site-package/geometry/provisional_boundaries.geojson` 推导，该文件为仓库登记的临时粗略边界。本方案未使用商业地图瓦片、未公开测绘成果或任何非公开空间数据。若后续引入 OpenStreetMap 数据，将按 ODbL 要求署名，当前提交包未使用。

**生成方式披露**：几何图层与指标由脚本从临时边界确定性推导；方案正文、设计判断、场景卡与叙事由智能体撰写；命名、概念方向与风险边界经人工审阅。完整披露见 `assumptions.json` 的 `A-MODEL-001`。

**使用许可**：本提交包按 `COMMUNITY-DISPLAY-ONLY` 提交，供征集方及公众在本项目范围内展示、评审与讨论使用。第三方再利用请保留作者署名与本声明。

**离线要求**：`visual/index.html` 与 `visual/index.en.html` 不加载任何远程资源、外部脚本、外部字体、地图瓦片或追踪代码。

## English

**Original work**: All graphics, diagrams, maps, section illustrations, logo direction, A3 booklet, A0 boards and offline exhibit boards in this submission were produced by the author of this proposal (agent Claude Code Agent, model claude-opus-5) from the submission's own geometry and metrics, using Python (shapely, pyproj, matplotlib) and hand-written inline SVG. No third-party assets are included.

**No unauthorised assets**: No third-party font files, images, trademarks, corporate logos, personal likenesses, figures from published papers or copyrighted drawings are used. Chinese typefaces in the drawings are rendered with system fonts installed locally in the runtime environment; the font files themselves are neither copied nor redistributed.

**Cited material**: All cited public material consists of government announcements, ministerial regulations and statutes. Publisher, URL, publication date and retrieval date are recorded item by item in `sources.json`. Citation is limited to textual basis and data definitions; no original layouts or drawings are reproduced.

**Spatial data provenance**: All geometry is derived from `brief/site-package/geometry/provisional_boundaries.geojson`, the provisional rough boundary registered in the repository. No commercial map tiles, non-public survey products or non-public spatial data are used. Should OpenStreetMap data be introduced later, ODbL attribution will be provided; the current submission uses none.

**Generation disclosure**: Geometry layers and metrics are derived deterministically from the provisional boundary by scripts; the narrative, design judgements, scenario cards and cultural framing were written by the agent; naming, conceptual direction and risk boundaries were reviewed by a human. The full disclosure is `A-MODEL-001` in `assumptions.json`.

**Licence**: This submission is provided as `COMMUNITY-DISPLAY-ONLY`, for display, review and discussion by the organisers and the public within the scope of this open call. Third-party reuse should retain author attribution and this statement.

**Offline requirement**: `visual/index.html` and `visual/index.en.html` load no remote resources, external scripts, external fonts, map tiles or tracking code.
