# 方案迭代记录

本文件记录"智轨百年·京张新脉"方案的版本迭代、依据变更与待办事项。所有空间主张均为概念建议；官方精确红线与管控指标到位后，将重算全部几何与面积指标并更新本记录。

## v0.4 - 2026-08-08（评审导向迭代·三轮·标签与通道一致性）

- EN 通道补齐：proposal.en.md 图件引用全部切换为 .en.png 并新增图6（空间原型三则）；EN A3 原型图注本地化；EN visual 场景区补充护照六字段说明。
- 版本戳统一为 v0.3/v0.3：proposal（中英）、图件、A3/A0、visual、HTML 全部一致。
- 修复 visual 公共空间标签（21.9 ha→22.3 ha，占比 1.9%→2.0%），与 metrics.json（222,997.7 m² / 0.019539）一致。
- report HTML 渲染器修复 [depth:...] 小写 ID 未替换问题（34 处→0）；EN HTML 现含图6。
- 全包四项 gate 复核 PASS。

## v0.3 - 2026-08-08（评审导向迭代·二轮）

- 修复 report/proposal.html 与 proposal.md 同步问题（重建渲染链路：编辑→渲染→自检）。
- A3/A0 图纸重建为密集成果：A3 文册 14 页（12 章节+指标带，含五大功能映射、铁路→AI 转译表、12 场景护照矩阵、区域协同表、发车协议、P0-P2 响应表、风险表）；A0 展板 4 张（概念结构、用地交通蓝绿、三站+护照、协议+协同+分期+风险）；版本标签统一 v0.2，修正比例类指标显示（绿地率/道路率/公共空间率以百分比呈现）。
- 新增「实施治理与风险响应」：P1-P7 逐项目进入/退出闸门、具名人工复核角色、P0/P1/P2 响应目标（15min/4h/48h）、条件成本包络（试点→示范段→网络）、模型卡/算法登记（鸣钟验收前置证据）；新增 AI 城市形态三类可感知变化（建筑/街道/治理）。
- 五大功能显式枚举并映射到空间载体（proposal 正文 + 图纸 + visual）。
- 新增空间原型三则（概念级）：原点「首层公共、平台共享」、众智园「花园中的开放工程院」、大钟寺「四象限站城界面」。
- 新增路网中心线指标：road_network_length_m（约 43.46 km）、road_network_density_km_per_sqkm（约 3.81，概念脊柱口径，非法定标准）。
- 修复 visual/index.html 重复区块；AI 场景区展示场景护照六字段；self_check.json 补齐 LAND_USE_TOPOLOGY 与 VISUAL_STATIC。
- 全部指标 EPSG:4548 复算；四项 gate 全 PASS。

## v0.2 - 2026-08-08（评审导向迭代）

- 新增「区域协同矩阵」：北纬社区、未来科学城、怀柔科学城、经开区、京津冀的能力互补—接口—数据/IP 边界（回应评审维度 regional_synergy）。
- 12 张场景卡升级为「场景试点卡 / Scenario Passport」：每卡补齐准入条件、RACI、KPI 与评估周期、停止阈值、申诉与撤回、数据保留期限六项运营字段；S04/S05/S06 产业测试卡附完整运行卡要点。
- 用户画像从 5 类扩展为 5+1 类（新增非数字用户/行动不便者），每类标注公共利益边界；新增无障碍与包容性设计小节（回应 public_interest_inclusion）。
- 全球案例对标升级为「可证事实本地转译 / 明确不照搬」双栏表，7 例全部登记逐案来源 ID（CASE-*）。
- 运营机制品牌化为「发车协议 Departure Protocol」七步闭环（申请→评审→测试→鸣钟验收→发车→复盘→退出复原），显式加入人工最终判断优先（Human Override）。
- 新增 risk.json 八维风险矩阵；copyright_statement 升级为逐资产权利台账；新增 Logo 矢量/栅格原型（assets/logo.svg、assets/figures/logo.png）；visual 展示页新增区域协同与发车协议两节。
- 修复 manifest 语言字段（EN 图件）、补充新文件清单与哈希；haidian-design/tools 路径统一到 zhouql-dev。
- 确定性校验、空间审查、视觉包装、专业证据链四项 gate 全部 PASS（provisional 边界提示为 minor）。

## v0.1 - 2026-08-08

- 首次生成 formal 方案包：完成 proposal.md 中文主稿与 proposal.en.md 对照译文。
- 基于仓库 `brief/site-package/geometry/provisional_boundaries.geojson` 的 PROV-SITE-001 与 PROV-KEY-001/002/003 生成提交边界与三个重点片区，全部标注 `provisional_constraint`、`official_boundary=false`、`boundary_precision=provisional_rough`。
- 生成用地、建筑基底、道路、绿地、公共空间、分期、约束共七类设计图层；用地分区满足全覆盖、无重叠拓扑，面积在 EPSG:4548 投影下复算并写入 metrics.json。
- 建立 compliance_matrix（公告 1.3/1.4/1.5 + agent.1-6）、standard_matrix（六项专业标准）、design_depth_matrix（15 项深度全部 complete）。
- 产出 12 张场景卡（含 3 张产业测试验证场景）、5 类用户画像、3+1 处 AI 朝圣地标、7 个全球案例、三期实施框架。
- 已知缺口：官方容积率、建筑高度、建筑密度、绿地率、退线指标缺失，metrics.json 以 unknown 标记；官方精确红线缺失，待补齐后重算。
- 待办：根据维护者与社区反馈迭代场景卡运营机制与分期时序；补充 A3/A0 图纸与离线 visual 展示的细节校核。
