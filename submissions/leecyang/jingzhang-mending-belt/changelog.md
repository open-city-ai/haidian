# 方案迭代记录

本文件记录本投稿包的每一次实质修订、修订原因与随之重跑的校验。所有条目按时间倒序。

This file records every substantive revision of the submission package, why it was made,
and which validations were re-run. Entries are newest first.

## v0.6 - 2026-08-09

修复画廊查看器报告的四处证据未解析 / Resolve four unresolved evidence references

### 起因

方案页查看器报出四处「未解析」：`geometry/land_use.geojson#LU-001`、`#LU-002`、`#LU-005`（提示"文件已载入，但没有找到编号"），以及 `source:DATA-SRC-MNR-LAND-USE-CLASSIFICATION-202311`（提示"正文包含该引用，但方案包中没有找到同名结构化条目"）。

### 根因：此前的自建校验过于宽松

上一版的 `audit_evidence.py` 报 PASS，是因为它做了两处不该做的宽容：

- 对几何引用会剥掉 `-N` 后缀再匹配，于是 `LU-005` 因 `LU-005-1` 存在而被误判为可解析；
- 对来源引用会接受出现在几何 `derived_from_source_ids` 里的 id，于是 `DATA-SRC-MNR-...` 因几何属性中出现过而被误判为已登记。

查看器采用严格精确匹配，因此暴露了真实缺口。校验器已改为与查看器一致的严格规则，并新增独立探针 `probe_refs.py` 交叉验证。

### 修复

- 用地图层按用途成组，单个用途会被缝合口或边界切分为多个不连续部分（`LU-001-1 … LU-001-11`）。为每个部分补充 `land_use_group_id`、`land_use_group_parts` 与中英文分组说明，并在文件 `metadata.groups` 中给出完整分组索引，使"整个用途"可被检索；正文三处引用改指向确实存在的要素 id。
- 在 `sources.json` 中正式登记自然资源部《国土空间调查、规划、用途管制用地用海分类指南》（2023-11），含出版者、发布时间、`usable_for_formal: yes`、用途说明（列明本方案使用的 10 个用地代码）与已知限制（仅使用与投稿相关的分类子集，法定用途须以完整官方代码表与主管部门认定为准）。

### 重跑的校验

- 证据索引：118 个标记，严格规则下 0 悬空，两个独立校验器结果一致
- `self_check_submission.py` → PASS，四门全通过，formal-review-ready
- `score_submission.py` → 7 pass / 0 needs-work
- 成果完整性审计 → 无污染；矩阵审计 → 0 问题；`participant_preflight --check-push` → PASS

## v0.5 - 2026-08-09

双语对等、证据可索引与成果完整性核验 / Bilingual parity, evidence indexing and integrity audit

### 证据索引：消除全部悬空引用

- 新增逐条校验：把正文中每一个 `[source:]` / `[standard:]` / `[depth:]` / `[metric:]` / `[data:file#id]` 标记与 `sources.json`、`standard_matrix.json`、`design_depth_matrix.json`、`metrics.json` 及 `geometry/*.geojson` 的实际条目比对。
- 发现并修复 12 处悬空引用，分两类：
  - `[source:DATA-SRC-AGENT-TASKBOOK-20260518]` 与 `[source:DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509]` 在 `sources.json` 中只有短名条目（`AGENT-TASKBOOK` / `OFFICIAL-ANNOUNCEMENT`），已补登记表别名记录并新增 `registry_source_id` 字段互指；
  - 走廊校正后 `site_boundary.geojson` 的要素 id 由 `PROV-SITE-001` 变为 `SITE-001`，正文 4 处引用已重指向实际承载该论断的要素。
- 现状：118 个标记全部可索引，无“正文包含该引用但方案包中没有同名结构化条目”的情况。

### 双语对等

- 英文版补齐此前缺失的实质章节：两处数据偏差的完整表格与说明、走廊校正处理方式、三层范围的三个子节、遗产绿脊 / 东西界面 / 十处缝合口子节，以及三期分期各自的阶段动作、参与主体、可衡量指标与回退条件。
- 中英章节结构现已一一对应（各 16 个二级章节），claims、证据标记与图片位置同步。

### 成果完整性核验

- 新增整包完整性审计：manifest 摘要与磁盘文件、暂存 git blob 三方一致；PNG 签名与尺寸；PDF 头部、`%%EOF` 与页数；HTML 的 UTF-8、外链、`iframe`/`fetch`/`form`、体积与图片可解析；Markdown 的加粗泄漏、粘连标题、孤立标记与图片存在性；全部 JSON/GeoJSON 可解析。
- 结果：无污染。同时清理了两次重新出现在仓库根目录的 `tmp/` 临时目录——它会让 `participant_preflight` 报 `PR scope contains files outside the participant proposal directory` 而阻断上传。

### 矩阵核验

- `compliance_matrix` 23 项覆盖公告 1.3.1–1.5.3.3 与 agent.1–agent.6；`standard_matrix` 6 项强制标准全部 addressed；`design_depth_matrix` 15 项必填全部 complete；三份矩阵引用的章节名、指标名与几何文件名均存在，无过时引用。

## v0.4 - 2026-08-09

评分细则对齐与证据链补全 / Rubric alignment and evidence-chain completion

### 方案与指标口径

- 将正文中的“一脊、两侧、十二缝”统一为实际几何中的十处缝合口，并同步修正中英文指标表、实施阶段与展板说明。
- 用 `shapely+pyproj` 在 EPSG:4548 下复算并统一面积与拓扑口径：场地 11,400,000.000 m²、绿地 5,664,361.118 m²、公共缝合空间 1,231,563.476 m²、用地图斑 110 个、缺口 15.8 m²、重叠 0.42 m²。
- 新增 `mending_stitch_area_sqm` 指标，明确其为公共空间图层的 union 面积；保留所有临时边界的 `official_boundary=false`、`geometry_role=provisional_constraint` 与 `confidence=medium`，不把概念性几何冒充正式边界。

### 评审可执行性

- 新增“缝合账本”与六项智能体任务的空间化交付表：每个建议均绑定空间对象、可审查产物、人工复核、停止条件与回退路径。
- 新增公共利益与公平校验、无障碍/夜间安全/免费通行约束，以及仅作为基线校准前建议值的试点目标，避免将未经调查的效果写成既成事实或政府承诺。
- 更新离线展板中的拓扑核验文字，并准备在全部内容稳定后通过仓库已审核的持久化自检路径生成正式就绪记录；不手工伪造就绪布尔值。

## v0.3 - 2026-08-09

真实底图重制与走廊校正 / Real base map and corridor correction

### 起因

使用者反馈图纸"绘制不够精细、虚线框位置错误、红色缝合线没有遵照地图中的路径走向、左侧部分没有展示完全、有几条路重合在一起"，并要求以 OpenStreetMap 真实数据重绘、按高级规划院制图风格出图、迎合评审细则提高得分。

### 引入 OpenStreetMap 真实底图（ODbL）

- 经 Overpass API 于 2026-08-09 获取范围 39.930–40.035N / 116.300–116.385E 的铁路、路网、水系、绿地、校园、建筑与轨道站点数据。
- 五张图纸全部改为真实地理底图：实测京张（京包）走廊线形、真实路网与城市肌理、比例尺、指北针、ODbL 署名。
- OSM 仅作地理参照：不参与面积复算，不构成官方边界、管控线或权属依据。已在 `sources.json` 登记完整出处、许可、覆盖范围、转换过程与已知限制。

### 发现并公开两处数据偏差

- 偏差一：仓库临时总体范围矩形位于 lon 116.3397–116.3553，实测走廊在 116.3138–116.3477；北段矩形位于铁路以东约 2 km，并不包含它本该描述的走廊，两者面积重叠仅占矩形的 22.8%。
- 偏差二：公告明确提及"大钟寺站"，实测站位 39.96527N，而仓库临时大钟寺重点区在 39.9440–39.9498，相差约 1.7 km。
- 两处均非仓库错误，而是文字四至在缺少坐标时必然产生的推定误差；已在正文、图纸与 `constraints.geojson` 中如实标注，不做掩盖。

### 走廊校正的提交边界（保留原矩形留证）

- 依据公告"京张遗址公园周边 1—2 公里"的走廊相对定义重建 `SITE_BOUNDARY`：以实测走廊为中心线，南北取公告文字四至，半宽按 EPSG:4548 拟合至公告约 11.4 km²，解得半宽 0.579 km（全宽 1.16 km，落在公告"1—2 公里"区间内）。面积偏差 0.000%。
- 三处重点区同法校正，面积分别精确拟合至 192.1 / 104.3 / 72.0 公顷，合计 368.4 公顷，偏差均为 0.00%。
- 仓库原矩形完整保留在 `constraints.geojson`，图纸上以两种虚线同时呈现。
- 全部几何仍标注 `official_boundary=false`、`geometry_role=provisional_constraint`。

### 缝合口由十二处抽象横杠改为十处真实路径

- 用 OSM 统计走廊现状穿越性：约 10.19 km 走廊上仅有 6 条连续贯通东西的道路，平均间距约 2,038 m，最大空档约 2,160 m——这是横向连通提升空间的量化尺度。
- 十处缝合口据此分为两类：6 处改造既有穿越（线形取既有道路几何），4 处填补实测空档（两端落在既有道路上）。
- 每条线形的顶点均来自 OSM 几何；图上以实线表示现状已连通段、虚线表示本方案新增段。
- 新增指标：`existing_ew_crossing_count`、`mean_crossing_spacing_m`、`max_crossing_gap_m`、`stitch_upgrade_count`、`stitch_new_link_count`。

### 评分短板补齐

- 可实施性：三期各写明阶段动作、参与主体、可衡量指标与回退条件。
- 公开资料引用：正文引用 `brief/public-brief.md` 与 `brief/README.md`，已被公开资料索引匹配。
- `score_submission.py` 结果由 5 pass / 2 needs-work 提升至 7 pass / 0 needs-work。

### 修复排版缺陷

- 修复 84 处因早期加粗转换造成的标题粘连与层级错乱（`###` 被误降为 `##`、正文黏在标题行尾）。
- 再次清除正文中重新出现的 22 处 `**` 加粗标记——仓库渲染器不支持加粗，会原样漏出；改用真实标题层级承载强调。
- 展板与 A3/A0 内嵌图像按尺寸重采样：`visual/index.html` 由 5.4 MB 降至 0.8–0.9 MB，A0 图纸由 12.7 MB 降至约 3.3–3.6 MB，均回到限值以内。

### 重跑的校验

- `spatial_review.py` → PASS（用地满铺：缺口 15.8 m²、重叠 0.42 m²，均在容差内）
- `score_submission.py` → 7 pass / 0 needs-work / 1 manual-review
- `render_proposal_html.py` / `self_check_submission.py` / `participant_preflight.py` → 见 `self_check.json` 与本节末尾的持久化就绪记录

## v0.2 - 2026-08-09

渲染缺陷修复与评审意见回应 / Rendering fixes and review response

- 十张图纸全部需要重新生成：此前为解决 Windows `core.autocrlf=true` 下 manifest sha256 与 git blob 不一致的问题做过一次 LF 归一化，误把 PNG 纳入范围，剥离了 PNG 签名中的 CRLF（`89 50 4E 47 0D 0A 1A 0A`），导致图片仍以 200 OK 传输却解码失败。归一化已限定为文本扩展名 + NUL 字节双重保护。
- 取消 Markdown 加粗：仓库渲染器 `render_inline` 仅支持行内代码与证据标记，`**` 会原样漏出。改为用真实标题层级与文字本身承载强调（中英同步）。
- 修复英文图纸注记溢出画布、A3/A0 页眉绿线穿过标题字母降部。
- 回应评审意见（@147228）：`self_check.json` 落盘真实四门 PASS 且 `validation_claim.self_checked=true`；`model` 由占位值 `agent-declared-model` 改为实际模型与工具链。

## v0.1 - 2026-08-09

首次提交 / Initial submission

- 立意「京张缝合带 THE MENDING BELT」：把百年铁路走廊作为待缝合成型的城市公共走廊，而非供人纵向行走的主脉。
- 九个 GeoJSON 图层、双语 proposal、报告 HTML、离线展板、A3/A0 图纸、三份矩阵与完整证据层。
- PR [#809](https://github.com/open-city-ai/haidian/pull/809)，CI `submission-validation` PASS。
