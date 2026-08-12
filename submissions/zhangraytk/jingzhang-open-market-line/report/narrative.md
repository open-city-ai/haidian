# 京张开市线：审稿导航

## 设计依据与资料清单

本方案以征集公告、面向智能体任务书、项目空间数据包和来源登记表为主控依据；当前已完成数据格式规范性与文本合规性自查。法定规划、工程等专业评审结论，须待官方确定的范围边界及专业资料正式发布后形成。提交中的总体范围与三处重点区均沿用项目数据资源库提供的临时几何，不把视觉上的精确边线解释为法定红线。海淀经济普查与 2025 年统计公报只说明商业和创业环境，不用于推导地块、商户数量或开发控制。[source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [assumption:A-BOUNDARY-001]

## 三层范围工作框架

统筹研究范围回答创新机制如何连接海淀的产业、人才和城市生活；总体设计范围把机制落成“一脊、三市、两翼、十二铺”；三处重点区以受控原型验证各自的空间角色。京张遗址公园是公共展示与慢行主脊，三市分别是众智园试制市、AI 原点社区共创市和大钟寺首单市，两翼分别连接中关村科技服务与小月河场景反馈。[source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework] [data:geometry/roads.geojson#ROAD-001]

## 统筹研究范围产业与未来城市研究

京张开市线的产业命题不是再造一个“创新轴”，而是建立双向市场：小店、一线劳动者和居民提出未被技术团队看见的问题；AI 中小企业和开发者带着可解释原型进入街区；运营与专业复核人员控制准入、测试范围和退出。中关村科技服务翼提供法务、标准、知识产权、人才与融资信息接口，小月河场景赋能翼汇集居民、商户和公共服务反馈，但不汇集个人画像或交易流水。[source:HAIDIAN-CENSUS-2024] [source:HAIDIAN-STATS-2025] [assumption:A-PRIVACY-001]

## 总体设计范围城市更新与控规深度城市设计

总体空间以七个完整覆盖提交范围且边线相互衔接的概念用地带表达，从南到北依次组织接驳街巷、首单邻里商业、试制与企业服务、京张公共绿脊、开源文化展示、社区共创服务和公开复盘广场。切分在 EPSG:4548 中完成并复用共享边，再转回 EPSG:4326；因此图斑间隙（gap）与重叠（overlap）均可由 GeoJSON 复算为零。分类沿用项目数据资源库登记的国土空间用地代码，但结果是设计分配，不是法定用地方案。[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [data:geometry/land_use.geojson#LU-001] [metric:land_use_gap_sqm]

## 重点区域详细设计

众智园“试制市”承载合成数据、边缘设备、机器人后场与人工接管测试。测试前由行业人员界定任务、成功条件和禁区；测试中保留人工停机；测试后公开适用边界和失败原因。它不是无人化展示区，而是用于在受控条件下暴露安全、标准与运维保障问题，并保留人工干预机制的试验空间。[data:geometry/key_areas.geojson#PROV-KEY-001] [source:EU-EDIH] [depth:three_key_area_detailed_design]

## AI 创新生态、人才画像与 AI+ 场景

七类人群共同构成试点场景的使用与评价主体：小店与个体经营者提出可付诸试验的问题；AI 中小企业与开发者提供原型；一线服务劳动者判断工作流是否真实；居民及老年、残障使用者检查可达性与公平；学生和研究者协助记录；国际人才与访客检查多语解释；运营与专业复核人员负责准入、停机和申诉。任何画像都不是个人评分标签。[metric:persona_count] [assumption:A-PRIVACY-001]

## 用地、建筑规模与拆改留方案

用地表达坚持“几何可算、控制未知”。七个 LAND_USE 面完整覆盖 provisional SITE_BOUNDARY，1401 公园绿地和 1403 广场用地分别复用于绿地与公共空间图层，保证同一空间主张能被交叉审查。已知量仅包括提交几何面积、比例、长度和结构计数；其置信度随 provisional 边界降为 medium。法定绿地率、容积率、建筑高度、建筑密度、退线和真实建筑规模全部保留 unknown。[metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio] [assumption:A-CONTROLS-001]

## 交通、轨道、市政与公共服务设施

交通系统区分公共流线和服务物流：京张公共慢行主脊优先步行、骑行、轮椅与停留；中关村科技服务翼和小月河场景赋能翼承载信息与人员联系；首单服务接驳只为预约式低速物流提供概念路径。可达性标牌由使用者共同校验，多语服务提供人工转接，机器人或算法不得自行扩大测试边界。[data:geometry/roads.geojson#ROAD-001] [data:geometry/roads.geojson#ROAD-004] [metric:design_road_length_m]

## 蓝绿空间、公共空间与城市风貌

京张遗址公园被定义为日常公共展示与慢行主脊，而非活动背景板。绿脊串联需求墙、首样架和失败原型橱窗，为停留、复核与申诉提供可见空间；小月河翼承担街坊问题反馈，但任何河道、生态、防洪或岸线判断都等待专业资料。提交中的绿地率和公共空间率只描述概念几何，不构成法定指标。[data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001] [metric:green_ratio]

## 更新项目清单、实施政策与分期计划

年度运营遵循四季循环：第一季公开征集问题并由人工剔除涉及隐私、违法或不可验证的挂单；第二季在试制市做合成数据与后场受控试作；第三季在共创市和首单市开展限量、限时、限空间验证；第四季公开年度账本，记录成功、停止、申诉、数据删除和未解决问题。失败不会被包装成展示成果。[data:geometry/phasing.geojson#PHASE-001] [metric:scene_card_count] [depth:phasing_implementation]

## 指标体系、面积复算与合规矩阵

指标采用“已知可复算、未知不代填”两栏。已知项保存数值、单位、公式、来源文件、置信度与假设，包括总体面积、用地覆盖、gap、overlap、原型建筑基底、绿地与公共空间比例、设计道路长度，以及三市、十二铺、七类人物和四处纪念节点的结构计数。面积和长度统一在 EPSG:4548 复算。[metric:site_area_sqm] [metric:land_use_overlap_sqm] [metric:building_footprint_area_sqm] [depth:metrics_recalculation]

## 风险、版权与合规说明

本提交已经完成文本与数据格式自查，尚未进入法定规划审查与工程审批程序，所有内容均属概念设计建议，不代表官方立场或批准意见。后续结论须待官方确定场地边界（SITE_BOUNDARY）、三处重点范围图斑（KEY_AREA）、控制性详细规划、道路红线、权属、市政、消防、无障碍及文保资料正式发布后形成。Issue #1368 的状态语义和 Issue #1029 的位置争议均被保留；任何官方边界更新都触发整链复算。[source:ISSUE-1368] [source:ISSUE-1029] [assumption:A-BOUNDARY-001]

## 参考资料

项目主控资料包括官方征集公告、项目数据资源库中的 `brief/site-package/`、`data/source_registry.json` 与 `data/processed/agent_fact_pack.md`；专业要求包括城市设计、控规深度、国土空间用地分类、生成式人工智能、无障碍和适老化相关登记来源。所有条目、用途和许可边界保存在 `sources.json`。[source:OFFICIAL-ANNOUNCEMENT] [source:SITE-PACKAGE] [source:SOURCE-REGISTRY]
