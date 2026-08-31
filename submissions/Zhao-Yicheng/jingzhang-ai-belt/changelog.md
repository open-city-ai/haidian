# 方案迭代记录

## v1.1 - 2026-08-31（回应第一轮评审 request-changes）

- **展示页字形**：`visual/index.html` 与 `visual/index.en.html` 改为内嵌 SIL OFL 1.1 的 Noto Sans SC 子集 woff2（仅含页面实际用到的字形，Regular+Bold 两字重），不再依赖查看端是否装有中文字体；字体来源与许可证登记在 `sources.json`（`FONT-NOTO-SANS-SC`）与版权声明中。五张核心图与 A3/A0 图纸的中文用字同步改用同一 OFL 字体的静态实例，避免受限许可字体的嵌入分发问题。
- **指标唯一口径表**：新增 `key_area_block_count_*` 与 `key_area_block_count_outside_key_areas` 指标，正文、译稿、矩阵、图件、HTML 与 PDF 统一引用同一判据：街坊总数为 `count(LAND_USE)`，重点区街坊数为"代表点落在该 provisional key-area polygon 内的 LAND_USE 要素数"，两者分母不同故三区之和小于总数；同时修正 v1.0 正文中残留的旧轮次数字。
- **图件可读性**：`key-areas` 中英图改为底部横向图例条，不再遮挡 A3 面板的地图、面积、街坊数与主导用地；`metrics-evidence` 中英图底部说明拆为两行并上移，消除裁切。
- **任务书结构映射**：正文与 `compliance_matrix.json` 逐项映射三大定位（百年京张文化带 / 都市AI生活体验带 / AI融合创新带）、五大功能与三区；两翼改回任务书规定的**中关村科技服务翼**与**小月河场景赋能翼**，原自定义"南段/北段"明确降格为施工与分期意义上的空间分段并声明非替代关系；补充北纬社区、未来科学城、怀柔科学城、经开区与京津冀的协作对象、要素流与非承诺性接口。
- **案例降格为待验证假设**：八个国际案例不再指名机构陈述事实，改为 H1–H8 机制假设清单（`A-ECO-004`，`verification_status=pending`），删除无法核查的具体主张；`CASE-REFERENCES` 明确为 background_only 且不得支撑设计依据或对外口径。

## v1.0 - 2026-08-31

- 按 `scripts/scaffold_ai_submission.py --stage formal` 重建包结构，全部文件位于 `submissions/Zhao-Yicheng/jingzhang-ai-belt/`，与 PR 作者用户名一致。
- 空间数据改为真实 WGS84（EPSG:4326）几何：以 `brief/site-package/geometry/provisional_boundaries.geojson` 的官方临时边界与三处重点区 polygon 为基础，用平面剖分生成 294 个无缝隙、不重叠的用地街坊，面积在 EPSG:4548 下复算。
- 补齐双语派生件：`proposal.en.md`、`report/proposal.en.html`、`visual/index.en.html`、五张 `assets/figures/*.en.png` 与 `drawings/a3-booklet.en.pdf`、`drawings/a0-boards.en.pdf`。
- 重写 `proposal.md` 为可读主体方案：13 个必需章节全部具备机器可读证据引用，正文含命名与标识方向、八条全球案例机制、12 张 AI 场景卡（含 3 个产业测试验证场景）、5 类用户画像、5 处朝圣地标与文化叙事、长期运营与活动体系。
- 三类矩阵改为逐条真实指针：`compliance_matrix.json` 覆盖公告 1.3.1–1.5.3.3 与 agent.1–agent.6 共 23 条必要求；`standard_matrix.json` 响应 9 条专业标准；`design_depth_matrix.json` 15 个核心深度项全部 `complete`，受限项以 `completeness_limited_by` 披露。
- `metrics.json` 重写为 50 条指标：known 全部由包内几何复算；官方容积率、建筑高度、绿地率控制与退线保持 `unknown` 并注明所需来源，不使用占位数字。
- `visual/index.html` 重写为完全离线的内联 SVG 展示页，含 14 个必需模块与 `data-metric`/`data-value` 一致性标记。

## v0.1 - 2026-08-28

- 首次生成的方案包（提交在仓库根目录，分支与 upstream `main` 无共同祖先，无法形成 Pull Request）。
- 已知问题：`geometry/*.geojson` 使用 0–4000 × 0–2850 的本地米坐标而非 WGS84 经纬度；`manifest.hashes` 为 `computed-locally` 占位；`self_check.json` 的闸门结果为手写 PASS；缺少全部英文派生件；`report/proposal.html` 未由官方渲染脚本生成。
- 处置：v1.0 起全部重做，不沿用上述数据；旧分支保留作为迭代证据，不再作为提交内容。

## 待复核事项

- 官方三层范围与三处重点区 polygon、控规指标（容积率、高度、密度、绿地率、退线）、道路红线与断面、权属与现状建筑、文保控制线、市政管线、交通与停车底数发布后：重跑几何生成 → `render_proposal_html.py` → `finalize_submission.py` → `self_check_submission.py --mark-self-checked` → `participant_preflight.py --check-push`，并同步更新五张核心图、A3/A0 图纸与展示页数值。
- 品牌命名、标识方向与字体使用需主办方与权利人复核；本包不宣称任何商标或品牌授权。
- 全部空间与强度结论为概念建议，需规划、交通、市政、文保与公众参与程序复核。

## v1.3 - 2026-08-31（关闭第 2 轮 AI 评审的五项阻断）

- **agent.2 案例可核查化**：`proposal.md` / `proposal.en.md` 的八条待验证机制假设替换为 C1—C6 六案例对照表（Kendall Square、East London Tech City、Station F、板桥技术谷、one-north、模速空间），逐案给出运营或治理主体、机制、适用条件、局限与可转化项；`sources.json` 新增 `CASE-KENDALL`、`CASE-EASTTECH`、`CASE-STATIONF`、`CASE-PANGYO`、`CASE-ONENORTH`、`CASE-MOSHU` 六条记录，含标题、发布者、发布或标注日期、精确 URL、访问日期与许可说明。六个案例的 `usable_for_formal` 全部保持 `background_only`，未自行上调；旧 `CASE-REFERENCES` 标为 `superseded_by_case_entries`。页面未标注发布日期的来源写明"未标注"，不推断日期。
- **agent.4 公共空间组件库**：新增 PSC-01…PSC-08 八类构件（透水铺装与导盲连续带、座椅与休息点、无障碍与触觉语音双通道导视、多功能智慧杆件、贡献铭牌、夜间照明、低速配送与测试边界、遮荫微气候与饮水卫生单元），每项含适用空间、尺度或性能区间、无障碍要求、数据与供电需求、维护责任与概念性质；写入正文、`visual/assets/public-space-components.json`、`visual/index.html#components` 与图 6。
- **agent.6 活动品牌与传播视觉系统**：建立 L0—L4 品牌层级、`JZB-[层级]-[年份]-[序号]` 命名规则、五项基本视觉元素与禁止项、四套双语传播模板（含无障碍电子通告）、三级内容审核与十年资产归档责任；新增"主体—资源—招募—转化—复盘"运营矩阵五项活动，替换原活动口号。数据见 `visual/assets/event-brand-operations.json` 与 `visual/index.html#brand`。
- **国办发〔2020〕45 号证据等级**：`sources.json` 中 `STANDARD-ELDERLY-SMART-2020` 由 `yes` 降为 `background_only`，与仓库 `source_registry_summary` 一致；`standard_matrix.json` 对应条目 `mandatory` 改为 `false`，"要求/合规证明"措辞改为政策背景与方案自愿设计承诺，并注明法定无障碍义务仅在《无障碍环境建设法》适用范围内引用。
- **表达完整性**：`report/proposal.html` 与 `report/proposal.en.html` 内嵌 Noto Sans SC（OFL）woff2 子集（1130 字形，正文与标题各一档），离线渲染不再出现中文方框；修复 `assets/figures/metrics-evidence.en.png` 底部两行注记被裁切（改为轴内定位并换行）；修复 `visual/index.html` 总览图中心节点与地标标签叠压（地标改为编号徽标＋编号对照表，重点区代号改为带白描边的居中编号）；新增图 6 双语对照板 `assets/figures/agent-deliverables.png` 与 `.en.png`。
- **A3/A0 图纸**：随新版图件与正文重新排版生成（14 页 A3 ×2、6 板 A0 ×2）。
