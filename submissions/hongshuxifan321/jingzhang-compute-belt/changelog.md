# 方案迭代记录

## v1.2-4 - 2026-08-12

合并入库后小修三项（仓库全区域巡查发现，打包单 PR）。

- **用字统一**：proposal.md「大钟寺 AI 产业集聚区」→「大钟寺 AI 产业聚集区」（与术语表/compliance_matrix 统一，术语表明确「聚集区」统一译为 Industry Cluster；英文 Dazhongsi AI Industry Cluster 此前已一致）
- **新增 risk.json**（role=other + role_detail=risk_matrix，可选项）：8 风险维度全量（数据隐私/实施复杂度/公众接受度/运维成本/政策不确定性/空间争议/技术成熟度/公平与包容性），内容转自正文「风险、版权与合规说明」章节；政策不确定性与实施复杂度评 4 分并带 human_review 路径，与「控规条件缺失、指标保持 unknown」口径一致
- **新增 spatial.json**（role=other + role_detail=spatial_nodes，可选项）：6 个概念空间对象（三区两翼节点 3 + 主廊道/文化廊道 2 + 两翼协同区域 1），geometry 全部 mode=concept 仅文字标注，不含任何坐标、红线或审定指标；linked_scenarios 挂接仓库场景注册表（robot-delivery-low-speed / ai-traffic-walkability / ai-cultural-guide）
- **manifest.json**：45 → 47 文件（新增 risk/spatial 两个可选项）
- **校验**：schema 校验通过 → self-check 四门 PASS → preflight PASS

## v1.2-3 - 2026-08-12

图纸双语修复（评审「表达完整度」点名扣分点：英文图含中文，v1 遗留）。

- **build_pdfs.py 修复**：A3/A0 英文版 PDF 此前硬编码嵌入中文图（`site-overview.png` 等无 `.en` 后缀，仅外层标题切语言）→ 新增 `fig_for()` 按语言选 `.en.png`；`__main__` 补跑 `build_a0("en")`（此前漏调，`a0-boards.en.pdf` 实为旧版产物）
- **验证**：mcp-vision（qwen-vl-max）复查 4 页英文 PDF——图内标题/图例/地图标注全英文，无中文残留
- **校验**：self-check 四门 PASS → preflight PASS

## v1.2-2 - 2026-08-12

审查遗留补齐（assumptions 证据链挂接）。

- **5 条 assumption 挂接矩阵链路**：A-BUILDING-004/A-BUILDINGS-001（概念建筑体量）→ compliance 1.4.2 + depth retain_renovate_demolish/height_massing_character + standard MOHURD-ARCH-DESIGN-DEPTH-2016；A-DATA-005（轨道/市政待确认）→ compliance 1.5.2.3 + depth traffic_rail_slow_parking/municipal_new_infrastructure/risk_missing_data + standard MOHURD-CONTROL-DETAILED-PLANNING；A-ECONOMIC-003（经济指标推导）→ compliance 1.5.1.1 + depth metrics_recalculation；A-ZHONGZHI-002（众智命名推断）→ compliance 1.5.3.1 + depth overall_spatial_structure
- **校验**：self-check 四门 PASS → preflight PASS

## v1.2-1 - 2026-08-12

全面审查修复（standard 引用闭环缺口）。

- **standard_matrix 补 3 条**：BARRIER-FREE-ENVIRONMENT-LAW（无障碍环境建设法）、ELDERLY-SMART-TECH-PLAN-2020-45（国办发〔2020〕45 号）、GENERATIVE-AI-INTERIM-MEASURES（生成式 AI 办法）——正文 [standard:] 引用的法规此前未登记矩阵（v1 遗留）
- **proposal 双语**：合规章节补「专业标准遵循」段（城市设计管理办法/控规办法/用地分类指南 3 标记）；用地节补建筑设计深度规定标记；参考资料 19-20 补无障碍法+适老方案
- **校验**：self-check 四门 PASS → preflight PASS

## v1.1-5 - 2026-08-12

文化叙事来源补强（评审「数据缺口」维度：1909 历史叙事缺可核查一级来源）。

- **sources.json 新增 3 个 JHZ-\* 来源**：北京市档案馆《京张路工撮影》（1909 年官方影像档案 178 张，一级档案）、人民网「历史上的今天」（1909-09-24 全线通车 / 10-02 南口典礼 / 201.2km / 最大坡度 33‰ / 693 万两造价）、中国新闻网《百年京张的历史跨越》（人字形折返线、竖井开凿法、青龙桥站）
- **proposal.md/en.md**：开篇补「1909-09-24 通车、10-02 南口典礼」史实并挂来源；命名体系段补「人字形折返线+竖井法攻克关沟段 33‰」史实内核；场景卡 8「一级来源待补登记」→ 已登记（sources.json JHZ-*）；参考资料 16-18
- **compliance_matrix**：agent.5 source_ids 补 3 个 JHZ-*
- **校验**：self-check 四门 PASS → preflight PASS

## v1.1-4 - 2026-08-12

品牌 VI 体系（评审「原创性」维度点名缺失：Logo 构图/比例/单色版/最小尺寸/字体/应用样例）。

- **新增 assets/branding/ 三图**（build_branding.py 生成，脚本 git exclude，图内中英双语标注；qwen-vl-max 目视审查通过）：
  - `logo-construction.png`：标志构图规范——6a×6a 标准网格（a=4mm，安全区 8a×8a）、人字展线与数据总线 1:1 分割、展线坡度 33‰（青龙桥史实，象征变形）、「值」字负形标注、主色 #22304E
  - `logo-mono.png`：单色正形/深底负形 + 最小尺寸标尺（web ≥32px ｜ 印刷 ≥8mm）
  - `brand-application.png`：应用样例拼版——名片/导视牌/开放日横幅/网页头图，含字级标注
- **字体方案**：中文思源黑体（Noto Sans SC，SIL OFL）+ 西文 Inter（OFL），三级字级（标题/正文/标注）
- **proposal.md/en.md**：命名体系小节补 VI 规范段 + 三图嵌入；compliance_matrix agent.1 evidence 更新；manifest 登记 3 个 visualization 文件
- **校验**：self-check 四门 PASS → preflight PASS

## v1.1-3 - 2026-08-12

visual 视觉对齐（图新视觉 #22304E 系）。

- **visual/index.html + index.en.html 色板对齐**（build_visual.py 生成，脚本 git exclude）：`--navy` #1B2A4A → #22304E（图 INK 墨蓝主文字）、`--green` #3FA66B → #3E8E63（图 GREEN_D）、`--coral` #E05B4B → #A93F35（图 CORAL）、阴影 rgba(27,42,74) → rgba(34,48,78)；`--amber` #E8A33D 与图一致未动
- **生成器可复现验证**：重跑 build_visual.py 后 diff 仅颜色 6 处/页，无内容漂移
- **校验**：self-check 四门 PASS → preflight PASS

## v1.1-2 - 2026-08-12

区域协同补强（评审「任务书相关性」维度缺口，任务书 agent.1「区域创新协同关系」）。

- **proposal 新增「区域协同：算带如何嵌入京畿创新网络」小节**（统筹研究范围章）：按「分工—流量—接口」三层论证与中关村AI北纬社区、未来科学城、怀柔科学城、经开区（亦庄）、京津冀的协同关系——分工表 5 行（公开定位 + 建议角色 + 与算带接口）、三类要素流（人才/算力/数据与场景）、四个合作机制接口（评测互认/测试协同/展示联动/数据沙盒）；全部协作机制标注为概念建议，不声称既定合作
- **sources.json 新增 6 个 REGION-\* 来源**：北纬社区（海淀区政府）、未来科学城（昌平区政府）、怀柔科学城（人民网）、亦庄（北京国际科技创新中心官网）、京津冀算力一张网（经济参考报）、北京算力规划（人民网）
- **compliance_matrix**：agent.1 与 1.4.1 的 evidence_summary_zh 与 source_ids 同步更新（新增 REGION-* 覆盖）
- **双语同步**：proposal.en.md 等值章节（Regional Synergy）+ 参考资料 10-15（zh/en 各 6 条）
- **校验**：self-check 四门 PASS → preflight PASS

## v1 - 2026-08-12

正式提交包（42 文件，11.8 MiB，formal-review-ready）。

- **方案定型**：京张算带 / Jing-Zhang Compute Belt（一脊五段两翼 + 知识溢出空间编排论证）
- **总审缺口修复**（2026-08-11）：sources.json 增补 11 个证据锚点；compliance_matrix 覆盖 23 项任务；design_depth_matrix 补齐 15 项；assumptions 增至 6 条；copyright_statement 具体化素材来源与边界声明
- **视觉体系升级**（2026-08-11/12）：10 张图全量重渲染——地图类图（总体概念/用地结构/交通蓝绿）改为低饱和城市设计色板 + 圆角卡片 + 隐藏科学坐标轴（比例尺/指北针替代）+ 徽章式标签；重点区域索引改为信息图卡片；指标图改为仪表盘面板（双轴、圆头柱）；双语图同步
- **媒体层**：新增 AI 生成封面概念图 `assets/media/cover.webp`（qwen-image-2.0-pro，解释层非证据，manifest.cover_image 启用）
- **证据披露补充**：assumptions.json 新增 A-BUILDINGS-001（11 栋概念建筑体量 disclosure）；copyright_statement 补充字体与渲染说明
- **图纸同步**：A3/A0 PDF 重渲染（嵌入新视觉图，配色与调色板对齐，版本号 v1）
- **校验**：self-check 四门 PASS（formal-review-ready）→ preflight PASS

## v0.1 - 2026-08-11

首轮成稿。

- scaffold 替换：proposal 正文（双语）、几何九层（GeoJSON，临时边界 provisional_rough）、指标复算（EPSG:4548）、矩阵（compliance/standards/design_depth）、五图首版、A3/A0 PDF、visual 离线页
- 数据：海淀 2025 统计公报 + OSM（ODbL）+ 任务书，来源登记于 sources.json
- 首轮 self-check 四门 PASS 后进入终审
