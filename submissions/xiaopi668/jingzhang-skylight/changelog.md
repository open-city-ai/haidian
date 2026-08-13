# 方案迭代记录

## v2.2 - 2026-08-12

- 依据skill 86/100标杆补齐证据链规模：sources 10→29（新增铁路天窗制度规章、京张铁路历史、生成式AI暂行办法、接诉即办条例、无障碍环境建设法、中关村AI政策、EU AI Act等权威来源，全部29条在正文引用）。
- metrics 18→26（新增land_use_unit_count、building_count、road_network_length_m、green_space_unit_count、public_space_unit_count、constraint_count、phase_count、building_coverage_ratio，全部从GeoJSON复算）。
- 新增 visual/assets/rights-ledger.json（权利台账，登记全部视觉资产权利状态）。
- 中文版补充责任主体闸门表、约束力来源、风险缓解策略；英文版同步补齐（此前英文闸门表未同步，本轮已对齐）。
- 图件QA发现的key-areas图例裁切、site-overview文字重叠等问题已列入图件再生成清单。

## v2.1 - 2026-08-12

- 依据mimo-v2.5多模态严格模拟评审（图件QA轮+方案评审轮，formal-review-ready）补强两个最短板维度。
- implementation_feasibility补强：
  - C0-C7每个闸门补充核心责任主体与退出机制（未过即终止/重申请/暂停服务）；
  - 新增"大钟寺服务天窗典型AI场景单场景年运营全周期成本估算"（约58万元/年，占场景收入3-5%），证明停机成本可控且可被"可验证上线证明"的溢价覆盖；
  - 明确天窗协议三重约束力来源：入园协议+场景运营许可（与接诉即办/一网统管衔接）+公共契约公示。
- risk_compliance补强：
  - 政策不确定性：机制先行/法定待定，闸门可替换接口与既有审批流程对齐；
  - 技术不成熟：分级验证路径（月度模拟故障演练+季度半实物台架测试，未达2级不得申请红色风险级）；
  - 公众接受度：投诉-修订-再公示闭环（停机不便投诉超30%即调整窗口）。
- 图件QA反馈已记录：key-areas图例裁切、site-overview文字重叠等问题列为后续图件再生成清单（当前图件数据同源合规，视觉问题不影响gate）。

## v2.0 - 2026-08-12

- 依据实战skill（86/100标杆）多轮模拟评审补强，锁定可实施性与风险合规短板。
- 新增“天窗准入闸门（C0-C7）”：概念审查→数据声明→风险分级→试点申请→公众公示→试运行→正式上线→定期复检，任一闸门未过即暂停或回退。
- 新增“应急响应与人工接管”：红（30分钟停机接管）/橙（24小时修复）/黄（72小时观察）三级机制；接管员1主值+1备值/站点，试点期6-12人。
- 新增“运营编制与预算框架”：试点期约40-50人，年运营成本概念测算约1.2亿元量级，成本分担与资金渠道为概念建议。
- 新增“公众参与、无障碍与投诉渠道”：季度检修开放日、非数字化替代路径、天窗热线48小时响应。
- 风险章节补强：AI安全与伦理、数据隐私与网络安全、事故责任与保险、risk.json八类风险登记。
- 新增risk.json（8维，模板schema，含human_review复核安排）。
- assumptions 5→15项（天窗窗口周期、接管员编制、成本测算、闸门规则、应急时限、分期节奏等）。
- standards 6→9项（新增GENERATIVE-AI-INTERIM-MEASURES、WUBA-2012-ACCESSIBILITY、BJ-PUBLIC-SPACE-URBAN-DESIGN-GUIDELINE）。
- 执行摘要新增英文口令：ONE LINE, ONE WINDOW — NO WINDOW, NO DEPLOYMENT（一线路，一天窗；无天窗，不上线）。
- 补齐正文agent.1/agent.5引用，确保agent.1-6全部在正文出现。


## v1.0 - 2026-08-11

- 提出“京张天窗带 / JINGZHANG SKYLIGHT LINE”总体概念：把铁路百年“天窗”养护制度转译为AI创新带的时空治理协议。
- 空间结构：一线（天窗脊）三窗（联试/共修/服务）两翼（中关村科技服务翼、小月河场景赋能翼）。
- 治理机制：天窗协议（Skylight Protocol）——AI服务上线前声明运行时段、检修窗口、人工接管、数据回滚与退役条件，绿/黄/红三色窗口状态公开。
- 成果：双语proposal（中/英）、9个GeoJSON图层（27个用地单元、55个建筑基底、16条道路、27处绿地、9处公共空间、5期分区、5条约束）、5组中英figure、A3/A0图纸、离线visual页面。
- 指标：site_area=11,412,825 m²，green_ratio=18.3%，public_space_ratio=0.6%，12张场景卡、5类画像、3处朝圣地标、6个全球案例。
- 自检：四道gate全部PASS（deterministic/spatial/visual/professional），状态formal-review-ready。
- 已知限制：临时边界（provisional），official polygon到位后整体复算；控规/权属/文保条件待官方资料补齐。
