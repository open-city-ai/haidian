# 版权与素材声明 / Copyright and Asset Statement

## 提交许可 / Submission licence

本提交以 `COMMUNITY-DISPLAY-ONLY` 参加百年京张 AI 创新带城市设计开源征集。该许可仅覆盖本提交者与所声明 AI 工作流原创生成的文字、数据组织、概念几何、图解、网页、脚本和版式；不改变任何第三方材料的原有权利，也不构成法定规划成果、政府批准或实施承诺。

This entry is submitted under `COMMUNITY-DISPLAY-ONLY`. The licence applies only to original text, data organisation, conceptual geometry, diagrams, web pages, scripts, and layouts created for this entry by the declared participant and AI workflow. It does not relicense third-party material and does not constitute statutory planning, government approval, or an implementation commitment.

## 原创内容与生成责任 / Original work and AI responsibility

- `proposal.md`、`proposal.en.md`、结构化 JSON、HTML、图件与 PDF 的组织、论证和视觉表达均为本次提交原创；AI 参与检索辅助、比较、写作、翻译、几何生成、排版与校验，GitHub 用户 `laopitongxue` 对最终选择、核验、遗漏与发布负责。
- `visual/assets/` 中的脚本以项目内 GeoJSON 和 JSON 为唯一设计数据输入，确定性生成概念图、指标展示与版面。图中没有调用生成式图像模型，也没有复制竞品方案图、摄影作品、Logo、商业地图瓦片或人物肖像。
- 所有概念几何只用于本次内容审阅。`geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 明确为 provisional；取得正式红线、控规、权属、文保、道路、市政及现状建筑数据后必须重锚和重算。

- The proposal, translation, structured JSON, HTML, figures, and PDFs are original arrangements and expressions produced for this entry. AI assisted research, comparison, writing, translation, geometry generation, layout, and validation; GitHub user `laopitongxue` remains responsible for final selection, verification, omissions, and publication.
- Scripts under `visual/assets/` deterministically generate the concept drawings and layouts from this package's GeoJSON and JSON. No generative-image model, peer proposal drawing, photograph, logo, commercial basemap tile, or identifiable portrait is incorporated.
- All geometry is conceptual and for content review only. The site and key-area layers are expressly provisional and must be re-anchored when official statutory and survey data become available.

## 第三方资料 / Third-party references

第三方标准、法规、官方公告、规划公示、机构案例网页、论文及开放地图只作为有限事实来源和方法参照；本包不复制其受保护图像、图纸或长段文字。每项来源的发布者、网址、访问日期、许可/再利用边界、用途、转换与局限均记录在 `sources.json`。其中 OpenStreetMap 相关核查遵循 ODbL 署名要求，但 OSM 对象未被直接再分发为本提交的场地底图；Issue #846 与 #1029 仅作为公开的问题记录和不确定性证据。

Third-party standards, regulations, notices, planning disclosures, institutional case pages, papers, and open-map references are used only for limited factual support and methodological comparison. Protected images, drawings, and extended passages are not reproduced. Publisher, URL, access date, reuse boundary, purpose, transformation, and limitation are recorded per item in `sources.json`. OpenStreetMap checks retain ODbL attribution requirements, but OSM objects are not redistributed here as the submission basemap.

## 字体、软件与离线性 / Fonts, software, and offline operation

- 中文采用本机 Microsoft YaHei，英文采用本机 Arial；字体文件不作为独立资产随包分发。PDF 仅由 ReportLab 嵌入实际使用字形的子集，PNG 为栅格化文字。
- 生成与校验使用项目脚本及 Python 开源库（包括 ReportLab、Pillow、Shapely、PyProj）；软件仍分别适用其原许可证，本声明不对其再许可。
- `visual/index.html` 与 `visual/index.en.html` 不加载远程脚本、字体、地图瓦片、iframe、表单、API 或跟踪代码；评审所需资产均位于提交目录内。

- Chinese output uses the locally installed Microsoft YaHei font and English output uses local Arial. Font files are not distributed as standalone assets; PDFs embed only the glyph subsets used by ReportLab, while PNG text is rasterised.
- Generation and validation use project scripts and open-source Python libraries including ReportLab, Pillow, Shapely, and PyProj. Those tools remain under their respective licences and are not relicensed here.
- Both visual HTML files are offline: they contain no remote scripts, fonts, map tiles, iframes, forms, APIs, or tracking code.

## 明确排除 / Explicit exclusions

未获授权的非公开资料、个人身份信息、第三方底图、航拍影像、历史照片、企业标识、受保护建筑图纸和付费数据库均未纳入提交。若后续展览或实施需要上述材料，须先取得单独授权，并在 `sources.json` 与本声明中更新记录。
