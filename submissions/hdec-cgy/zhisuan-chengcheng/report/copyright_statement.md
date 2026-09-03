# Copyright Statement / 版权说明

The Chinese proposal, original HTML presentation, diagrams, illustrations, screenshots and videos are team-authored or team-curated materials supplied by the user. They are preserved as the team's work and are not claimed as AI-generated content.

中文方案、原始 HTML 展示页、图纸、插图、界面截图和视频均为用户提供的团队创作或团队整理成果。本成果包完整保留其署名和作品属性，不将其声明为 AI 生成内容。

## 投稿封面说明

中英文共用的无文字中性封面 `assets/media/cover.png` 由 OpenAI 图像生成能力根据团队方案命题制作，用于概念性表达京张铁路遗产、智算枢纽、边缘节点、能源系统及韧性算力切换关系。封面为合成解释性图像，不代表现状实景、官方规划、精确场地条件或已批准建设；它不作为边界、面积、工程参数或规划控制结论的证据来源。

生成方法：文本到图像生成后由人工选定；未使用第三方人物肖像、企业标志或外部版权图片作为输入。已知局限包括建筑、铁路、设备和城市背景均为概念化表达，不能用于工程深化或场地事实判断。

OpenAI Codex only performs competition-format adaptation, resource-path localisation, structured metadata, validation support and explicitly identified supplementary packaging. Final publication rights, third-party licences, portrait/privacy permissions and attribution order have been confirmed by the submitting entity (中国电建华东勘测设计研究院-城市规划研究院-京张AI创新带AI投标项目组, GitHub: @hdec-cgy) as recorded in the per-asset rights ledger `assets/media/appendix-g-rights-inventory.md` (baseline 2026-08-31).

## A-RIGHTS-001 权利清权闭合说明（2026-08-31）

本成果包中进入正式提交的全部资产已完成逐资产清权，类别与依据如下：

1. **团队自制**（32 个 SVG 分析图、13 个沙盘界面截图、全部 HTML/JS/GeoJSON 代码与测算数据）：团队职务作品，提交主体享有权利，随包参赛提交；
2. **AI 生成媒体**（92 个渲染图与封面，中英双语）：按竞赛规则披露为 AI 生成、人工选样修订；不含真实人物肖像、企业标志或第三方版权原图输入；生成工具与过程记录可按组委会要求提供；
3. **开源第三方**：Leaflet 1.9.4（BSD-2-Clause，版权与许可头保留于 `visual/assets/vendor/leaflet.js`）；OpenStreetMap 冻结快照（© OpenStreetMap contributors，ODbL 1.0，界面与来源清单已注明归因）；Noto Sans CJK SC（SIL Open Font License 1.1，离线子集与许可声明置于 `visual/assets/cjk-font.css`）；
4. **统计引用**：高德（amap）公开 POI 仅作统计口径引用（2026-08 抓取，WGS84），不展示受保护地图瓦片原样、不批量再分发原始记录；
5. **文字引用**：仅使用来源清单中可核验的公开文本并作必要转述；不复制任何第三方版式、图形、历史照片、肖像或机构标识。

不存在 `pending_user_confirmation` 或 `pending verification/clearance` 状态仍被正式使用的关键资产；后续新增素材须先登记 `assets/media/appendix-g-rights-inventory.md` 再进入正文。

The 2026-08-26 restructuring reorganises the complete Chinese team master under the competition's 13 required report chapters, adds five evidence figures and an offline competition-audit dashboard, and regenerates the Chinese report and A3 booklet. These packaging changes do not transfer or replace authorship of the team's original text, tables, images, captions or videos.

2026年8月26日的重构工作仅将完整中文团队母本归入赛事要求的13章，增加五张证据图和离线赛事审计面板，并重新生成中文报告及A3文册。上述包装工作不转移、替代或削弱团队对原始文字、表格、图片、图注和视频的作品属性。

`visual/index.html` localises the Leaflet runtime and team-owned static assets. The remote basemap request has been replaced by an offline blank tile while all team-authored map overlays, markers, labels, legends and interaction code remain present.
