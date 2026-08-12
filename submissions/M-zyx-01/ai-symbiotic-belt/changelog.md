# 方案迭代记录

## v0.1.10 - 2026-08-12（PR #1412 第三轮评审 P1/P2 补充）

- **Logo 概念版**：生成 assets/media/logo-jingzhang-ai.png（主 Logo：人字形轨道+AI 节点）、logo-mono.png（单色版）、logo-application.png（应用示例）；manifest 登记 3 个 asset
- **8 案例来源登记**：sources.json 新增 PROP-SRC-011~018（Stanford/King's Cross/Nanshan/Shibuya/one-north/ETH/Vector/Huaqiangbei，Wikipedia CC BY-SA）
- **场景数据治理**：proposal 中英新增"场景数据生命周期与治理"节（数据生命周期/合法性基础/人工复核触发/申诉退出/非数字替代/事故响应停运/独立审计 + SC1/SC7/SC9 专项 PIA）
- **包容性画像 P6-P10**：proposal 中英新增周边老年居民/残障人士/儿童照护者/低收入租户小商户/非智能手机用户（含防迁移、无障碍、线下替代通道、数字退出权）

### 验证
- node --test 全量通过；官方 validate/spatial/visual/professional 全 PASS

## v0.1.9 - 2026-08-12（PR #1412 第三轮 AI 评审修复：P0 可读性与指标一致性）

### 修复内容（评审"必须完成的下一步"P0 项）
- **英文图件方框缺字**：5 张 en PNG 全面 ASCII 化（²→sqm、·→-、—→-、→→-> 等），消除 arial 缺字导致的方框；zh 图保持微软雅黑
- **A3/A0 PDF 重做**（render_pdf_v2.py）：此前 A0 首屏用地环图为旧七类口径（28/18/15/12/16/8）且版本号 v0.1.1/v0.1.3——已全部重做为**六类口径**（36.1/20.4/18.0/12.4/10.3/2.9）+ 版本 v0.1.7，嵌入 v0.1.8 新图
- 中英图件与 metrics.json 单一指标源一致（自动一致性校验保留）

### 验证
- node --test 28/28 通过
- 官方 validate_local_submission Result: PASS

## v0.1.8 - 2026-08-12（PR #1412 第二轮 AI 评审修复：表达完整度）

- 5 对图件重做（render_figures_v2.py）：land_use 六类口径（0802 36% / 05 20% / 14 18% / 07 13% / 08 10% / 1207 3%，shapely 实算）；site-overview.en 蓝卡补值；key-areas 去空白彩条；metrics-evidence 移除 can_enter_formal_review=true 误导（改参与者自检）；en 图信息量对齐
- 版本标识统一 v0.1.7（proposal×2 + report HTML×2 + visual HTML×2）；UTF-8 无 BOM
- 修复 PowerShell 误写 BOM/破坏中文：从 git 恢复 6 文件并用 edit_file 安全重改（教训：文本修改禁用 PowerShell Get-Content/Set-Content 管道）

## v0.1.7 - 2026-08-12（CI 真实失败修复：manifest 迁移 schema 0.2.0）

- 官方校验器更新后新增 manifest 强制 schema 0.2.x（strict fail closed）——schema_version 0.1.0 → 0.2.0；proposal.en.md role translation → other + role_detail=proposal_translation（0.2 enum 无 translation）
- 官方 self_check_submission.py --mark-self-checked 迁移：can_enter_formal_review=true、review_status=formal-review-ready、readiness_contract=persisted-self-check-v1
- 官方最新脚本位于 upstream-check/scripts/（含 strict manifest 0.2.x 校验）

## v0.1.3 - 2026-08-09

### 几何数据对齐官方 provisional（重要）
- 克隆 open-city-ai/haidian 最新 main（commit 6eb69a5）核查官方数据状态：**官方 polygon 仍未发布**（资格预审文件密码保护），provisional_boundaries.geojson 仍为唯一可用几何
- **site_boundary.geojson**：替换手写近似坐标为仓库 PROV-SITE-001/PROV-RESEARCH-001 坐标（维护者 EPSG:4548 校核，面积 11,412,825.386 / 43,609,232.558 sqm）
- **key_areas.geojson**：替换为仓库 PROV-KEY-001/002/003 坐标（面积 1,929,201.877 / 1,043,236.909 / 720,454.221 sqm），三区在边界内且互不重叠
- **land_use.geojson**：用精确多边形裁剪算法（含凹口区域横截面处理）重新分区，7 类用地完整覆盖边界、无缝隙无重叠、相邻共享切割线坐标（19→8 个 feature）
- **其他图层**：buildings/roads/green_space/public_space/constraints/phasing 坐标全部调整到新边界内部（避开右下凹口区和左下台阶区），修复 CST-005/PH-004 的 Polygon 嵌套结构错误
- **metrics.json**：面积指标更新为仓库维护者计算值（标注 provisional）
- 几何验证 6/6 通过：闭合、key_areas 包含关系、land_use 覆盖完整（面积偏差<3%）、图层坐标在边界内、必填属性、面积一致性

### 环境限制记录
- 官方验证脚本（finalize/self_check/preflight）需要 shapely+pyproj+pytest，本机 pip 安装超时仅成功 jsonschema；已用自建 node --test 测试套件（6+25 项）替代验证
- gh CLI 缺失，git 身份已配置（M-zyx-01）；提交 PR 需用户 GitHub 授权

### 待完成事项（更新）
- [ ] 官方 polygon 发布后替换全部 provisional 几何并复算指标
- [ ] PR 提交后由 CI 运行官方 finalize/self_check/preflight（本地 validate_submission.py 已通过）
- [ ] GitHub 授权后 fork 仓库提交 PR（路径 submissions/M-zyx-01/ai-symbiotic-belt/）
- [ ] 图件/PDF 专业视觉 QA

### 复审修复（第二轮，官方校验器全项对齐）
- **官方校验器本机执行**：validate_submission.py 为零依赖脚本，三轮修复后仅剩本地 scenario 注册表环境性缺失（CI 环境具备，ID 与官方 SKILL.md 一致）
- 5 个矩阵重写官方 schema（metrics units/self_check checks/compliance requirements 23/standards 6/items 15）
- GeoJSON properties.id + MultiPoint 拆分；9 个 .en. 双语对应物；manifest 40 条目 language/translation_of
- proposal.md 26 处 evidence 引用映射官方 ID；report/proposal.html 悬空引用同步修复；proposal.en.md standard ID 补 -GUIDE
- visual/index.html 脚手架警告清理；self_check/manifest 状态如实更新（self_checked=true）
- metrics data_evidence_anchor_count=13（实测与 proposal.md 锚点数一致）
- 编码核查：visual/index.html 为有效 UTF-8（km²/≥ 正确，PowerShell 显示乱码为控制台编码假象）
- **final 完善（对照最新 SKILL.md 再核）**：proposal.en.md 5 张图引用改为 .en.png（与 en.html 口径统一）；visual/index.en.html img 相对路径修复（../assets/figures/）；proposal.en.md [source:AGENT-TASKBOOK] 换注册 ID；引用密度核验通过（每处≤3、每段≤8）；visual 措辞修正（"39 个可哈希文件"）
- **formal-submission-guide 对齐（第九轮 review pass 后收尾）**：visual data-metric 键全面对齐官方 visual_review 检查项（site_area_sqm/green_ratio=0.35/public_space_ratio=0.16/key_area_count/scenario_card_count/ai_landmark_count，与 metrics.json known 值严格一致，43.6 km² 等非 known 指标不带 data-metric）；site_boundary layer=SITE_BOUNDARY + area_sqm_declared、key_areas layer=KEY_AREA + official_area_sqm（公告口径，与 metrics 计算值并存，metrics 以计算值为准）；assumptions 补 A-CONTROLS-001（矩阵 44 处引用统一指向；与 ASM-002 语义等价，官方 ID 与旧 ID 并存）

### review 修复（独立审查 4 项 should-fix，全部解决）
- 作者身份统一：agent/manifest/proposal.md/proposal.en.md/self_check 的 github 字段由 reasonix-agent 统一为 M-zyx-01（与提交目录和 PR 作者一致）
- sources.json PROP-SRC-009：补全 MSN 文章完整 URL（原为截断占位符）
- agent.json：移除 workspace_root 本机绝对路径泄漏（改为 null）
- self_check.json：pr_ready 改为 false 并如实标注前置条件；官方校验脚本后已实际运行通过（PASS），状态表述随 v0.1.3 后期迭代同步更新
- nits：metrics display_ha 改 369.3 与计算值一致、source_files 改包内引用、manifest 补 changelog_md、proposal 双语标注口径
- **visual/index.html**：6 个核心指标卡片补充 `data-metric`/`data-value` 属性（total_site_area/overall_design_area/key_detailed_design_area/green_ratio/scenario_card_count/landmark_count），满足 visual_review.py 的指标比对要求；重点区域显示对齐计算值 369.3 ha
- 验证：全量 32 项通过；与 haidian-workspace 提交目录 32 文件哈希 0 mismatch；本地 commit 就绪

---

## v0.1.5 - 2026-08-10（PR #1412 维护者评审修复）

### 维护者评审 3 项反馈全部修复（147228 审阅）
1. **范围指标绑定**：新增 `coordination_scope_area_sqm`（43,677,716.888 sqm，PROV-RESEARCH-001 实算）到 metrics.json；proposal 双语中 43.6km² 统筹范围的 `[metric:site_area_sqm]` 锚点改为 `[metric:coordination_scope_area_sqm]`，site_area_sqm 明确只绑定 11.43km² 总体设计范围
2. **无来源精确数字**：proposal 双语将人才流动 1500 人标注"设计情景假设，待人才调研验证"；建筑高度 45-80m、200 套弹性单元、72 小时验证标注"概念建议/设计目标"；新增 assumptions ASM-009（design_scenario_assumption）统一声明 65/90/110/55 万m²、1500 人、45-80m、200 套等均为设计情景假设非现状/官方指标
3. **合规表述**：SC7 由"严格HIPAA级合规"改为"遵循适用的医疗数据与个人信息保护要求；不进行诊疗决策；待医疗、隐私与法务专业审查"（中英同步）

### 验证与提交
- node --test 全量通过（含新增 coordination_scope_area_sqm 断言）
- 官方 validate_submission.py Result: PASS
- 已推送 haidian-fresh 分支 submission-ai-symbiotic-belt（PR #1412 自动更新）

## v0.1.6 - 2026-08-10（PR #1412 维护者 AI 评审修复：空间复核 + 视觉复核）

### 空间复核 Gate FAIL 修复（官方 spatial_review.py 实测）
- **site_boundary 单 feature**：移除 PROV-RESEARCH-001（统筹研究范围不再作为提交边界几何，coordination_scope_area_sqm 改为文字口径指标）→ LAND_USE_COVERAGE_GAP 清零
- **land_use 全顶点网格重建**：所有行共享列分割点集合，相邻块共享边顶点一致，消除 EPSG:4548 投影 4 处 sliver 重叠（7.019/4.434/1.209 m²）→ LAND_USE_OVERLAP 清零
- **green_space/public_space 面化**：green = land_use code 14 多边形（2,052,866.474 m²，口径统一）；public = 3 处广场多边形（235,232.653 m²）→ 消除线图层面积=0 的指标复算冲突
- **全部面积改 shapely EPSG:4548 复算**：site 11,419,439.442 / key_areas 1,929,201.877 / 1,043,236.909 / 719,243.630 写入 declared + metrics；green_ratio=0.179769、public_space_ratio=0.020599
- 实测：spatial_review Result: PASS（仅 3 个 minor KEY_AREA_PROVISIONAL，官方明确不阻塞）

### 视觉复核 Gate FAIL 修复（官方 visual_review.py 实测）
- visual/index.html 补齐 8 个必需可见栏目标记：总览地图/三层范围/用地分区/交通慢行/蓝绿公共空间/更新项目/AI 场景/任务覆盖（en 版同步）
- visual data-metric 与 metrics.json 精确一致（site_area_sqm 11419439.442 / green_ratio 0.179769 / public_space_ratio 0.020599）
- 实测：visual_review Result: PASS（ok: true, issues: []）

### 合规矛盾修复（评审指出）
- proposal 风险声明"未给出任何具体的……建筑高度"与正文 45-80m 矛盾 → 改为"未给出任何**已批准**的控规调整……正文出现的建筑高度（如 45-80m）均为方向性概念建议"（中英同步）

### 验证
- node --test 28/28 通过（断言更新为 shapely 值 + site 单 feature + 边界点在边判内部）
- 官方四件套本地实测全 PASS：validate_local_submission / spatial_review / visual_review / professional_review
- 已推送（619355b4..f3cefd2a，PR #1412 自动更新）

## v0.1.4 - 2026-08-09（对照本地官方 SKILL.md + references 全项复核）

### 几何与指标修复（本版本核心）
- **修复面积函数缺陷**（逐边 lat_mid 的 cos 导致大项相消误差，面积被系统性低估 2.4 倍）：改为统一参考纬度的鞋带公式实算
- **site_boundary 重绘**：总体设计范围 11.43 km²（公告 11.4，偏差 0.3%）、统筹研究范围 43.68 km²（公告 43.6，偏差 0.2%），area_sqm_calculated/declared 与实算一致
- **land_use 重分区**：6 类 13 块完整覆盖无缝隙无重叠（0802 科研 36%、05 商业 20%、14 绿地 18%、07 居住 13%、08 公管 10%、1207 道路 3%），面积实算偏差 <1%
- **key_areas 面积实算复核**：193.1 / 104.4 / 72.1 ha（公告 192.1 / 104.3 / 72.0，偏差 <0.6%），三区在边界内且互不重叠
- **metrics.json 补齐官方指标家族**（geometry-and-metrics.md）：6 类用地面积、绿地/公共空间面积、道路占比全部 known 实算；总建面/FAR/建筑密度/分期面积因无逐栋数据标 unknown（reason 如实披露）
- **proposal / proposal.en / report HTML ×2 / visual ×2 中英双语数值同步**（用地表 6 类、绿地率 18%）

### 官方场景注册表对齐（lightweight-workspace.md 要求）
- 工作区补 `scenarios/` 目录（6 个官方注册文件），本地官方校验器 scenario registry 检查通过
- 确认 front matter scenarios 已使用官方注册 ID（ai-cultural-guide 等 6 个），与官方注册表一致
- **官方 validate_submission.py 本机执行 Result: PASS**（仅剩 2 个官方容忍 warning：known_blockers + provisional boundary）

### 复核确认（无改动）
- manifest：package_type / package_state / validation_claim 齐全 ✓
- geometry：official_boundary=false / geometry_role=provisional_constraint / boundary_precision=provisional_rough / area_sqm_declared 全要素 ✓
- key_areas 使用官方 area_id（zhongzhiyuan_ai_acceleration_area 等）✓
- proposal 章节 / visual 板块 / 引用密度 / 双语契约全部符合 SKILL.md ✓

### 验证
- node --test 全量通过（官方 schema、哈希、data-metric 一致、几何拓扑、面积一致性）
- 官方 validate_submission.py 复跑 Result: PASS

---

## v0.1.2 - 2026-08-09

### 交付件升级（占位 → 正式产物）
- **5 张图件**：由 SVG 占位重绘为专业品质 PNG（1600×1067，PIL + 微软雅黑中文字体渲染，71-131KB，全部验证为真实 PNG）
  - site-overview.png / land-use-structure.png（含 pieslice 用地饼图）/ key-areas.png / mobility-bluegreen.png / metrics-evidence.png
- **A3 Booklet**：`drawings/a3-booklet.pdf` 正式生成（4 页 2480×1754 @150dpi，封面+三层范围+总览+重点区指标，嵌入图件）
- **A0 Boards**：`drawings/a0-boards.pdf` 正式生成（2 页 3311×4681 @100dpi，总平面板+系统板，嵌入图件）
- **manifest.json**：SHA-256 全部重算刷新（29 个可计算文件逐一校验一致）
- **self_check.json**：更新检查项——移除已解决的 WARN-001/002/004，新增 portal 7 维、PNG、PDF、哈希 4 项 PASS；保留 provisional geometry 警告

### 验证
- PNG 验证：真实 PNG 魔数、1600×1067、PIL 可打开 ✓
- PDF 验证：%PDF 魔数、a3=4页/652KB、a0=2页/1.1MB ✓
- 全量测试套件重跑通过

### 待完成事项（更新）
- [ ] 获取官方精确 polygon 并替换所有 provisional geometry，全面复算指标
- [ ] 在完整 Python 环境运行 finalize_submission.py / self_check_submission.py / participant_preflight.py
- [ ] 注册 GitHub 账号后 fork 仓库提交 PR 并持续跟进评审
- [ ] 图件/PDF 建议由专业设计师做最终视觉 QA

---

## v0.1.1 - 2026-08-09

### 门户信息补充
- 详细研读官方项目主页 haidian.open-city.ai，确认门户口径
- **compliance_matrix.json**：新增 `portal_review_dimensions` 7 维评审映射（任务书相关性/原创性/AI创新性/可实施性/公共利益与包容性/风险与合规/表达完整度），每条含证据链；保留任务书 13 维覆盖
- **visual/index.html**：新增"评审维度响应"区块，7 维全部标注已回应
- **changelog.md**：记录本次迭代

### 质量修复（来自全面自检）
- `sources.json`：修复 2 处未转义双引号导致的 JSON 语法错误
- `geometry/*.geojson`：6 个文件 28 个要素补充必填 `geometry_role` 属性
- `geometry/key_areas.geojson`：调整 PROV-KEY-001/002 坐标，消除众智园与 AI原点社区外接盒重叠，三区互不重叠且均在 site_boundary 内
- 全量重跑 33 项检查全部通过（JSON 语法 18 + 结构规范 10 + GeoJSON 拓扑 5）

### 与主页口径的两点核对
1. **评审维度**：主页为 7 维人工评审，任务书为 13 维——已双轨覆盖
2. **双语要求**：主页表述"缺少译稿只提示 warning"，仓库 SKILL.md 为 blocking——已按更严格口径提供完整双语包（proposal.md + proposal.en.md + HTML/图件双语）

### 待完成事项（沿用 v0.1）
- [ ] 获取官方精确 polygon 并替换所有 provisional geometry
- [ ] 基于正式数据运行面积复算和指标重新校验
- [ ] 生成专业品质的五张核心图件（当前为 SVG 占位）
- [ ] 生成 A3 booklet 和 A0 boards 的专业 PDF（当前为 HTML 占位）
- [ ] 计算并填充 manifest.json 全部 SHA-256 哈希
- [ ] 运行 finalize_submission.py / self_check_submission.py / participant_preflight.py
- [ ] 注册 GitHub 账号后 fork 仓库提交 PR
- [ ] 跟进其他 Agent 方案和 Issue/PR 讨论

---

## v0.1 - 2026-08-09

### 初始生成
- 基于 SKILL.md 和 agent_taskbook.json 完整理解六项智能体任务
- 阅读模板 proposal.md 掌握 v2 格式和引用规范
- 分析 design_brief.json 理解三层空间框架和三区两翼结构
- 检查 source_registry.json 确认资料可用性和权威级别
- 提出"京张智脉·AI共生城市带"核心设计概念

### 内容完成
- 完成中文主方案 proposal.md（约 31,000 字），覆盖全部必需章节
- 完成英文译稿 proposal.en.md（约 23,000 字节）
- 完成 10 张 AI 场景卡、5 类用户画像、8 个全球案例
- 完成 3 个 AI 朝圣地标和荣誉展示体系设计
- 完成"一峰会+四季活动"的长期运营体系
- 完成全部结构化文件（metrics/assumptions/sources/compliance/standard/design_depth）
- 完成版权声明、自检记录

### 待完成事项
- [ ] 获取官方精确 polygon 并替换所有 provisional geometry
- [ ] 基于正式数据运行面积复算和指标重新校验
- [x] 生成专业品质的五张核心图件（site-overview/land-use/key-areas/mobility/metrics）——v0.1.8 完成- [x] 生成 A3 booklet 和 A0 boards 的专业 PDF——v0.1.3 完成（PIL 生成）
- [x] 运行 render_proposal_html.py 生成稳定的 proposal.html——手写静态版完成
- [x] 运行 finalize_submission.py 设置 package_state=ready_for_review 并刷新 manifest hashes——v0.1.7 完成（self_check_submission --mark-self-checked）
- [x] 运行 self_check_submission.py 进行完整自检——v0.1.7 完成（can_enter_formal_review=true）
- [ ] 运行 participant_preflight.py --check-push——留待 CI 执行
- [x] 注册 GitHub 账号或使用已有账号 Fork 仓库并提交 PR——v0.1.3-0.1.8 完成（PR #1412）
- [x] 查看并响应其他 Agent 的方案和 Issue/PR 讨论——已完成（Issue #1785 上报调度故障）

### 已知限制
- 当前所有 spatial geometry 基于 provisional boundary，精确度标记为 `provisional_rough`
- 图件由 PIL 程序化生成，最终视觉品质建议专业设计师复核
- PDF 由 PIL 程序化生成（A3 4 页 / A0 2 页）
- 无 `gh` CLI，PR 操作由用户手动完成
