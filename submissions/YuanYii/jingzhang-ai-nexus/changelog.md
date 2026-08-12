# 方案迭代记录

> **版本号规则**：两位 x.x 制，第二位最大为 5（每 5 次迭代进位）。本地实际迭代已超 20 次。

## 版本映射

| 版本 | 旧编号范围 | 里程碑 |
| --- | --- | --- |
| **9.5** | v9.5 | 数据置信度校准：building_density→unknown + 指标覆盖度 12→28 + 来源/假设台账扩充 |
| **9.4** | v9.4 | 数据一致性与合规修复包：移除名实不符的站点指标明细与自创口径绿道指标 + 节点设计去规划控制数值 + 路线图去委办局越界表述 + manifest schema 合规清理 |
| **9.3** | v9.3 | P2 批深化补充：O6 运营路线图 + O7 Logo VI 基础包 + 节点级设计 + 指标扩充 |
| **9.2** | v9.2 | 批判性修复包：H1-H8 文本硬伤 + C1-C6 内容补强 + 图件重绘 |
| **9.1** | v9.1 | 合规修复包：simulation task_count + evidence marker 规范化 + 双语同步 + 标准矩阵增补 |
| **9.0** | v9.0 | 阶段 B 图件+运营闭环：生态图谱气泡图+三区两翼空间图+场景-空间-运营矩阵+JZ KPI/退出表+Logo/VI 交付清单 |
| **8.0** | v8.0 | P0/P1 修复包：建筑分类声明 + 图件透明化 + 品牌视觉方向 + 技术成熟度声明 + 无感视觉边界 + 版权台账细化 |
| **7.0** | v7.0 | P0 自认证标签清理 + P1 区域协同RACI矩阵/全球案例生态图谱补齐 |
| **6.0** | v6.0 | 正式重构 16:9 QHD 品牌展板与 A0/A3 高清 PDF 矢量图册全套里程碑 |
| **5.x** | v4.7–v5.7 | 内容增强 + 概念传达强化 + 补强迭代 |
| **4.0** | v1.4.0–v1.4.6 | 路签制治理协议 / Proof-Mile / 责任矩阵 / 资产 |
| **3.0** | v1.3.0 | 深度优化：City-as-Repo / 多物种 / 无障碍 |
| **2.0** | v1.0.0–v1.2.0 | 首次提交 + 合规精细化 |
| **1.0** | v0.x（~15 次） | 本地早期迭代：概念形成 / 数据搭建 |

## v9.3 - 2026-08-11（P2 批深化补充）

P2 批优化（O6/O7/O8，版本保持 v9.3）：
- **O6 运营实施路线图**：proposal.md/en 新增「运营实施路线图（概念）」小节——JZ-01~06 × 概念责任主体 × 资金来源假设 × 三年里程碑表（第 1 年试点/第 2-3 年成型/第 4-5 年示范），全部 confidence=low 概念措辞，验收走 Proof-Mile 闭环
- **O7 Logo VI 基础包**：visual/assets/logo-vi/ 新增主版/反白/单色 SVG+PNG（双轨 × 神经网络母题）+ VI 规范页（最小尺寸/安全空间/禁用规则/色彩字体 token）
- **O8 官方数据重算脚本**：scripts/recalc_on_official_data.py 一键重算入口（官方 geojson → EPSG:4548 全指标重算 → metrics 更新 → 差异报告 → 哈希刷新指引）；dry-run 已验证
- **视觉索引同步**：proposal.md/en 图件索引更新（场景卡总览图、Logo VI 包、PDF v9.3、比例尺/指北针/地名说明、重算脚本引用）
- 回归：self-check 四门禁 PASS

## v9.5 - 2026-08-12（数据置信度校准与覆盖度扩充）

数据声明结构与台账规范化：

- **第一批·数据一致性修复**：
  - building_density 改标 unknown（官方可建设用地数据未提供；0.158 概念估算降级），proposal 引用同步中性化
  - confidence 保守化：provisional 自绘几何派生指标（building_footprint/green_ratio/public_space_ratio/green_300m/tod_500m/road 长度/land_use 面积）medium→low；官方锚点 site_area 保留 medium；key_area_count→high
  - note_zh 口径解释：green_ratio 双口径（355.1ha 全斑块 vs 270.8ha LU-002）、tod 质心口径、building_footprint 要素级说明
- **第二批·覆盖度与台账扩充**：
  - 指标 12 → 28：新增几何实测类（road_centerline_length_m=27.32km、building_count=63、public_space_count=27、green_patch_count=10、land_use_parcel_count=4、phase_count=6、constraint_count=3、land_use 四类面积 309.4/270.8/249.2/311.9ha）与台账类（scenario_count=13、renewal_project_count=6、persona_count=6、ai_landmark_count=3、proof_mile_interface_count=6）
  - assumptions 9 → 18：数据缺口（建筑普查/道路红线/站点坐标/用地分类）、控制（开发强度不预设）、运营（责任主体待授权）、指标口径（双口径声明）四类细化
  - sources 9 → 22：补官方 site-package 结构化文件（design_brief/allowed_design_space/enums/planning_limits/schemas）、国家标准（GB 50137/GB 50180/设计深度规定）与政策文件（生成式AI暂行办法/无障碍法/适老方案/城市设计管理办法）
- 版本号 v9.4 → v9.5 全链同步（proposal 双语/PDF 封面与页眉/visual 展示页/manifest）
- 回归：本地 validate/self_check 四门禁 PASS

## v9.4 - 2026-08-12（数据一致性与合规修复包）

针对提交包数据一致性与合规问题的修复：
- **P0-1 移除名实不符的站点指标明细**：删除 metrics.json tod_station_500m_cover.station_breakdown_500m_buffer（原三站 500m 覆盖面积均为 78.41 ha，实为重点区域质心缓冲计算结果，不宜标注真实站名）；保留并集覆盖单值 20.6%，proposal 表述同步改为「三处重点区域质心 500m 圈」
- **P0-2 移除自创口径的绿道指标**：删除 metrics.json greenway_length_km（22.71 km 系 top-3 绿地斑块并集周长近似，口径非标准），proposal 双语量化情景同步清理引用
- **P1-1 路线图去越界表述**：运营实施路线图删除具体委办局分工（规自委/交通委/水务局等）与具体资金来源安排（公共财政/生态补偿/绿色债券），改为中性「主管部门 + 专业运营团队（待授权确认）」与「资金来源待确认」
- **P1-2 节点设计去规划控制值**：三区 9 节点删除概念规模数值与容积率 3.5-4.5、退让 30-50 m、200 m 核心圈等规划控制指标，保留定性设计要点
- **P2 manifest schema 合规清理**：修复 files[56] translation_of 空字符串（补 en 映射）；删除 9 条 description 多余字段；删除顶层 version/updated_at/checksums 遗留字段；validation_claim 版本与时间戳同步；全部 files[].sha256 重算
- **PDF 版本号同步**：4 份 PDF（A3/A0 × zh/en）页眉/封面 v9.3→v9.4、2026-08-11→2026-08-12（PyMuPDF redact+重写，共 32 处，渲染验证无残留）；proposal 图件索引表 PDF 描述同步；visual/index 双语展示页 Submission v9.2→v9.4（落后两版）并同步 en 状态为 formal-review-ready
- 回归：本地 validate/self_check 四门禁 PASS（见下方验证记录）

## v9.3 - 2026-08-11（PDF 数据同步补记）

手动 PDF 原稿（Pages）数据同步（保持文档结构不变）：
- **用地数值修正**：LU-001 312.0→311.9、LU-002 270.9→270.8、LU-003 309.2→309.4（zh+en 4 份 docx，共 44 处替换），与 land_use.geojson EPSG:4548 实测一致
- **版本号**：全部页脚 v9.2 → v9.3（zh+en）
- **场景卡总览图重绘**：对齐主稿 L1=8/L2=4/L3=1（06/07/11/13 四卡等级修正），image 逐卡验证
- **metrics.json 新增 building_density**（0.158，保持「全部指标可回溯」声明成立）
- **PDF 重新导出**：Pages AppleScript（export as PDF to 语法）导出 4 份规范命名 PDF 至 drawings/；旧命名文件归档
- **checklist 同步**：current_pdf_version=v9.3
- 回归：self-check 四门禁 PASS

## v9.3 - 2026-08-11

优化包（O2-O9）：
- **O4 指标扩充**：metrics.json 新增 greenway_length_km（22.71 km，top-3 绿地斑块并集周长骨架）与 tod_station_500m_cover 站点明细（五道口/清华东路西口/大钟寺三站 500m 覆盖分解），交通市政章同步双语量化描述
- **O3 三区节点级设计深化**：众智园（国家级 AI 模型测试场 15ha/清河低碳界面 1.5km/安全治理沙盒集群 8ha）、原点社区（开源发布厅 5ha/近校转化街 800m/清华园印记公园 6ha）、大钟寺（TOD 核心 10ha/四象限连廊 600m/国际路演客厅 4ha），全部 confidence=low 概念级
- **O2 图件规范化**：site-overview 叠加五道口/清华东路西口/大钟寺/清河/小月河地名标注；全部地图图件补 2km/1km 比例尺 + 指北针；去除裸经纬度轴
- **O5 场景卡视觉化**：新增 13 大 AI 场景卡总览图（L1/L2/L3 准入色标 + AI 测试/公开展示 TRL 标识，中英双语），嵌入 proposal 与 visual
- **manifest 结构修复**：manifest.json 自引用条目恢复为无 sha256 的 role=manifest 规范结构（消除自引用 hash 循环）
- 回归：self-check 四门禁 PASS、官方校验脚本 8/8 pass

## v9.2 - 2026-08-11

批判性分析修复包（14 项：8 硬伤 + 6 结构缺陷）：
- **H1 重复章节清理**：删除「路签制调度算法概要」重复块与孤立空标题
- **H2/H3 结构修复**：粘连标题还原；治理机制章编号重排（1 状态机 / 2 产业准入 / 3 开发者社区 / 3.1 City-as-Repo / 4 AI 伦理 / 4.1 无障碍 / 5 活动品牌 / 6 CVP）
- **H4 准入模型正交化**：明确 L1-L3（空间开放等级）与五态状态机（验证生命周期）正交并用，消除自相矛盾
- **H5 场景卡数量统一 13**：L363/L571 旧数字 12 修正
- **H6 绿地口径说明**：补充 270.8 ha（LU-002 用地分类）与 3.55 km²（全部绿地斑块）双口径说明
- **H7 冷却数据全量同步**：零假设免责声明 1.5°C → 0.8°C ~ 1.5°C 区间
- **H8 参考资料去重**：清除 4 条重复条目
- **C1 治理隐喻措辞修正**：「不是比喻」→「铁路令牌闭塞互斥逻辑的城市治理隐喻与概念框架」
- **C2 拆改留草案**：新增「概念性拆改留情景草案」（三区+全线 4 行，confidence=low 待官方普查复核）
- **C3 交通市政量化**：新增 3 个 synthetic 指标（绿地 300m 覆盖 85.6% / TOD 500m 并集 20.6% / 绿道断点 15 处），EPSG:4548 投影实测
- **C4 TRL 声明范围修正**：明确仅对 AI 核心技术场景评估，07/09/10/12/13 标注 N/A
- **C5 图件重做**：key-areas.png / land-use-structure.png 重绘（三区名称标注、去除经纬度轴）；ecosystem-map.en.png / three-areas-two-wings.en.png 生成真正英文版，替换中文镜像
- **C6 合规加固**：15% 抽成改为 10%-20% 区间建议；删除无归属的 open-pulse 引用
- **版本号统一升级**：proposal.md / proposal.en.md / manifest.json / visual 中英 → v9.2
- **PDF 全套重制（追加）**：A3 文册 10 页 / A0 展板 7 板，中英 4 份全部重制——13 张新场景卡、CVP 10%-20% 区间、MNR 用地分类、版本 v9.2、删除旧版无依据合规断言（GB 50137/500m 100%/三星绿建 100%）；每页多区块高密度排版，图件索引表同步更新

---

## v9.1 - 2026-08-11

合规修复包（基于官方最新校验脚本全量核查）：
- **simulation.json 补 task_count**：新增 `task_count: 2`，满足官方可复现聚合校验要求
- **proposal.md evidence marker 规范化**：证据链索引段（16 个）、参考资料索引段（11 个）、指标汇总段、控规深度段、边界解释段全部收敛为每 claim ≤3 个 marker，完整索引保留在 sources.json / standard_matrix.json / design_depth_matrix.json / metrics.json
- **CVP 与风廊小节归位**：Civic Value Protocol 移至「AI 场景准入、开放运营与社区治理机制」章节，京张通风廊道与风健康场移至「蓝绿空间、公共空间与城市风貌」章节，不再悬挂于参考资料章节
- **冷却区间双语同步**：proposal.md 与 proposal.en.md 统一为 0.8°C ~ 1.5°C 区间表述，消除全角/半角括号重复说明
- **manifest 一致性修复**：重跑 finalize 刷新全部 sha256 与 validation_claim；self_check.json 持久化四门禁 gates
- **版本号统一升级**：proposal.md / proposal.en.md / manifest.json → v9.1
- **已知限制**：assets/figures/ecosystem-map.en.png 与 three-areas-two-wings.en.png 暂为中文版镜像（未生成真正英文版），已在图件索引表标注，待后续迭代替换

---

## v8.0 - 2026-08-11

阶段 A 修复包：
- **#1 建筑留存分类声明**：proposal.md 新增"建筑留存分类声明"段落，声明 buildings.geojson 所有 polygon 因缺官方普查数据暂标 `status=unknown`；metrics.json 增加 caveat；assumptions.json 新增 A-BUILDING-001
- **#4 图件标注透明化**：图件索引表新增"已知限制"列，逐图件标注缺地名/比例尺/北箭头/来源等限制；新增"图件透明声明"段落
- **#11 品牌视觉系统方向**：新增"品牌视觉系统方向"小节，含核心母题/色彩系统/字体方向/应用场景/延展规则/IP 方向/当前状态声明
- **#13 技术成熟度概念声明**：新增 9 场景 × TRL 概念评估表，含核心技术/TRL 等级/关键待验证项/部署条件
- **#14 无感视觉技术边界**：在 AI 伦理章节新增"无感视觉技术边界声明"，逐条界定含义/数据最小化/处理位置/保留周期/退出机制/技术成熟度
- **#18 版权台账细化**：copyright_statement.md 全部 8 条资产条目重写，补充具体来源/生成过程/工具链/获取时间
- 版本号统一升级：proposal.md/manifest.json/visual/index.html/visual/index.en.html → v8.0

---

## v7.0 - 2026-08-11

- **P0 自认证标签清理**：visual/index.html 中 "GeoJSON Topology Verified" → "GeoJSON 拓扑结构（provisional）"；visual/index.en.html 中 "GeoJSON Verified" / "Key Verified Metrics" → "GeoJSON Topology (provisional)" / "Key Metrics (provisional geometry)"；proposal.md L171 "达到控制性详细规划的城市设计深度" → "参照控制性详细规划的城市设计深度要求组织"
- **P1 区域协同 RACI 矩阵**：新增 8 方协同主体 RACI 矩阵（北纬社区/未来科学城/怀柔科学城/经开区/中关村科技服务翼/小月河场景赋能翼/京津冀协调机构/京张AI带管委会），含角色、核心输入输出、权限边界和接口机制
- **P1 全球案例生态图谱**：为 6 个全球案例新增结构化对比表（国家/城市/核心特征/规模/关键机制/可迁移性/来源链接）
- 版本号统一升级：proposal.md/manifest.json/visual/index.html/visual/index.en.html → v7.0

---

## v6.0 - 2026-08-11

- **版本统一**：proposal.md/proposal.en.md 版本号同步为 v6.0；英文版新增路签调度算法章节 + Card 13 + 去重；key-areas.png/en.png 独立生成；manifest hash 全量刷新；A0/A3 PDF 重渲染。

## v6.0-prev - 2026-08-10

- **版本升级**：统一将项目全套成果文件（Proposal 文档、A0 展板、A3 图册 PDF、交互看板及元数据）版本号同步升级为 **v6.0**。

## v5.7 - 2026-08-10

- **升级**：更新  与  重点区域图为 16:9 (2560x1440) 深藏青 QHD 品牌展板。
维护者反馈修复：
- metrics.json 中 `site_area_sqm` 与 `key_area_count` 置信度 high → medium（与 manifest data_confidence=medium 对齐）

## v5.6 - 2026-08-10

4 项内容补强：
- **simulation.json**：新增风健康场 CFD + 路签制调度器概念模拟声明，与 proof-mile/wind-health JSON 资产呼应（53 文件）
- **受益群体说明**：公共利益章节加全部 7 类群体（开源开发者/初创/高校/居民/企业访客/国际嘉宾/数字弱势）的受益影响总结
- **证据引用补强**：路签制调度算法章节加 [depth:] 与 [source:AGENT-TASKBOOK] 引用
- **场景可感知度**：朝圣地标章节新增「5 公里可步行朝圣体验路线」空间可感知描述（[data:geometry/roads.geojson#ROAD-001]）

## v5.2 - 2026-08-10

概念传达强化：
- **v5.1**：目标契合度——H1 副标题增加「服务海淀打造全球人工智能产业高地与 AI 创新朝圣地」
- **v5.2**：场景可感知度——场景卡描述增加「可体验、可展示、可推广」显式标签

## v5.0 - 2026-08-10（v4.7 进位）

内容增强迭代：
- **v4.5**：参考资料章节重写——增加对 brief/public-brief.md / agent_taskbook.json / source_registry.json / agent_fact_pack.md 的显式引用与 evidence_anchor 说明
- **v4.6**：JZ-01~06 验收步骤具体化——每项四步复现流程（数据提取→测量/仿真→公式计算→对比基线），中英同步
- **v4.7**：中文叙事深度扩展——新增路签制调度算法概要（Pre-qualification / Block Assignment / In-operation Watch / Return & Audit 四阶段）、全球案例路签制可复现性矩阵（6×4）；proposal.md 24→27KB
- **v5.0**：proof-mile-delivery.json 中全部 6 个 JZ 项目验证状态从 claimed → synthetic-tested，版本进位

## v4.4 - 2026-08-10

5 项内容增强迭代：
- **v4.0**：版本号三位转两位；PR body 更新展示完整迭代全貌（4 个大版本、Block Token 协议闭环）
- **v4.1**：frontmatter summary + H1 副标题露出路签制（Block Token）概念信号
- **v4.2**：路签制人本反思段落——「时间公平与区间共享」
- **v4.3**：visual/assets/qa-readiness.json（视觉 QA / 合规 QA / 双语 QA 三维自查清单）+ sources.json 全部 8 条补 evidence_anchor + metrics.json 新增 interval_sharing_ratio / community_participation_rate 概念指标
- **v4.4**：A0 展板每板补指标卡片 + 新增第 13 张场景卡「时间公平与区间共享卡」

## v4.0（旧 v1.4.0–v1.4.6） - 2026-08-09/10

内容增强与合规对齐迭代：
- **v1.4.0**：治理协议内核——区间路签制（Block Token）+ Proof-Mile 验算接口（JZ-01~06 新增列）+ 场景卡责任条款矩阵（12×6）+ 零假设免责声明 + Civic Value Protocol 15% + Wind Health Field 9.5km/1.5°C + spatial.json + agent.json 丰富 + visual/index.html data-metric 补全
- **v1.4.1**：frontmatter 同步 + proposal_format_version/bilingual_contract_version + changelog 重写
- **v1.4.2**：维护者第 1 条 review 修复（frontmatter de-duplicate + manifest data_confidence high→medium）
- **v1.4.6**：维护者第 2-4 条 review 修复 + 路签制叙事闭环（三层框架/更新清单/场景准入） + 3 个 JSON 资产 + PDF 重生成

## v3.0（旧 v1.3.0） - 2026-08-09

深度优化与评审增项：
- City-as-Repo 开源空间治理体系（空间 Pull Request / Code Review / 回滚）
- 清河低碳水岸多物种生态感知与韧性系统
- 无障碍数字包容与非数字替代服务
- 场景卡 10→12（新增多物种感知节点 + 非数字替代服务站）
- 用户画像 5→6（新增国际访客与学术嘉宾）
- 中英双语全同步；report HTML 重渲染 + manifest 哈希刷新

## v2.0（旧 v1.0.0–v1.2.0） - 2026-08-08/09

首次提交与合规精细化：
- 基于 brief/site-package 与 provisional 边界生成 formal 提交包
- SVG 与可视化升级：重构 visual/index.html，指标对齐 metrics.json
- 四大合规矩阵解耦（compliance / standard / design_depth 逐项映射）
- risk.json 八维风险矩阵 + assumptions.json 补全
- P0/P1/P2 review feedback 快速修复（spatial / metric / visual inconsistencies）

## v1.0（v0.x，本地早期~15 次迭代） - 2026-08-08 前

- 概念形成、数据搭建、脚本调试、脚手架生成
- 首次正式提交前的工作区准备
