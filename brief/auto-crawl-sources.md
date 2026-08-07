# 百年京张 AI 创新带自动采集 URL 白名单

> 状态：草案。访问日期：2026-05-28。  
> 用途：给后续自动下载、链接健康检查、摘要生成和人工复核提供明确种子 URL。  
> 原则：只抓公开网页、公开 PDF、公开开放数据元数据和有明确开放许可的数据；不抓密码资料、商业地图瓦片、个人信息、账号内非公开内容。

## 采集分级

- `auto_html`：可直接抓取 HTML，并转为 Markdown/纯文本。
- `auto_pdf`：可直接下载 PDF，记录哈希后转文本。
- `auto_docx`：可直接下载 DOC/DOCX，记录哈希后转文本；征求意见稿必须标记为 draft。
- `metadata_html`：可直接抓取数据目录/元数据，但数据文件或 API 调用需要登录、`userKey` 或人工确认。
- `keyed_api`：拿到北京市公共数据开放平台 `userKey` 后可自动调用。
- `geo_api`：开放地理数据接口，可自动拉取，但要记录许可和获取日期。
- `manual_only`：只登记入口，不自动下载，避免密码、版权或非公开边界风险。

## 时效性和权威性规则

自动采集按 `brief/source-quality-rules.md` 执行。优先级从高到低为：

1. 2026 年发布的政府正式公告、规划纲要、政策文件、统计公报、政府公报和公共数据元数据。
2. 仍在执行期内的规划、标准和政策，例如 2026-2030、2020-2035。
3. 政府部门官网新闻和官方专题页，用于补充项目时间线、场景和数字。
4. 历史文化、公园、文物资料，记录访问日期后作为长期事实。
5. 国际组织和研究机构报告，用于对标方法，不替代本地政策依据。

新闻报道只作为辅助资料；涉及项目范围、指标、政策目标、征集规则时，必须优先引用正式公告或政策文件。

## A. 项目公告与官方新闻

| 类型 | 名称 | URL | 采集内容 | 备注 |
|---|---|---|---|---|
| auto_html | 市规自委资格预审公告 | https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/tzgg/hd/202605/t20260509_4643047.html | 项目范围、任务、资格、周期、补偿、知识产权 | P0，项目第一权威来源 |
| auto_html | 首都之窗启动征集新闻 | https://www.beijing.gov.cn/ywdt/gzdt/202605/t20260507_4639102.html | 征集启动、主承办单位、规划目标 | P0 |
| auto_html | 京张 AI 创新带系列：何以京张 | https://www.beijing.gov.cn/fuwu/lqfw/gggs/202603/t20260330_4569001.html | 京张历史、公园活动、AI 场景 | P0/P1 |
| auto_html | 京张 AI 创新带系列：原点爆发 | https://www.beijing.gov.cn/fuwu/lqfw/gggs/202604/t20260401_4571735.html | AI 原点社区、高校企业资源、场景试验田 | P0/P1 |
| auto_html | 海淀新闻镜像：何以京张 | https://hdzx.bjhd.gov.cn/2019/zxyx/szxw/202603/t20260330_4810156.shtml?type=computer | 与首都之窗新闻互证 | 可去重 |
| auto_html | 海淀 AI 未来专题：AI 原点社区 | https://www.bjhd.gov.cn/ztzx/2025/aifuture/jq/aiyd/ | 原点社区专题新闻列表 | 可抓列表页及子页 |
| auto_html | 京张铁路遗址公共空间改造提升工程（二期） | https://www.bjhd.gov.cn/ztzx/2025/ysxtj/ttdkj/gzgxfn/202503/t20250314_4760993.shtml | 二期建设、9 公里公园、空间更新策略 | P1 |
| auto_html | “三区两翼”打造世界级 AI 集聚地 | https://kw.beijing.gov.cn/xwdt/kcyx/xwdtcyfz/202604/t20260403_4573808.html | 三区两翼、37 平方公里、产业空间、重点节点 | 2026 年官方部门转载，P0/P1 |
| auto_html | 北京发布首批 4 个人工智能创新街区 | https://kw.beijing.gov.cn/xwdt/kcyx/xwdtshgg/202601/t20260121_4452025.html | 海淀原点社区、面积约 3 平方公里、支持政策 | 2026 年，P1 |
| auto_html | 北京奋力打造全球人工智能创新高地 | https://www.beijing.gov.cn/fuwu/lqfw/gggs/202603/t20260331_4570534.html | 2026 中关村论坛 AI 背景、百年京张 AI 创新带 | 官方门户报道，P1 |

## B. 上位规划、产业政策与 AI 政策

| 类型 | 名称 | URL | 采集内容 | 备注 |
|---|---|---|---|---|
| auto_html | 北京城市总体规划（2016年-2035年） | https://www.beijing.gov.cn/gongkai/guihua/wngh/csztgh/201907/t20190701_100008.html | 首都功能、科技创新中心、中关村科学城 | P0，旧 `cqgh` 路径已失效 |
| auto_html | 北京总规图解 | https://www.beijing.gov.cn/zhengce/zcjd/tjxz/201905/t20190523_78134.html | 公众版图解 | 辅助理解 |
| auto_html | 海淀分区规划成果公布 | https://zyk.bjhd.gov.cn/zwdt/xxgk/tzgg/201912/t20191211_4363066_hd.shtml | 海淀国土空间规划入口 | P0 |
| auto_html | 海淀分区规划批复 | https://www.bjhd.gov.cn/ztzx/2019zt/hdfqgh/201912/t20191211_4361674.shtml | 北京市政府批复 | P0 |
| auto_html | 海淀区十五五规划纲要 | https://zyk.bjhd.gov.cn/zwdt/zcwj/202604/t20260428_4813297.shtml | AI 产业高地、城市更新、城市治理、京张相关表述 | P0 |
| auto_html | 海淀“1+X+1”现代化产业体系建设布局 | https://www.bjhd.gov.cn/ztzx/2026/2026jjshgzlfzdh/yw/202603/t20260303_4806875.shtml | 人工智能塔尖产业、产业空间和场景 | P0 |
| auto_pdf | 中关村科学城通用人工智能创新引领发展实施方案（政府公报 PDF） | https://zyk.bjhd.gov.cn/zwdt/szgb/wqgb/202303/202311/P020231120520239626741.pdf | 中关村科学城 AI 目标、平台、基础设施、场景 | P0，政府公报 PDF |
| auto_html | 中关村科学城通用人工智能实施方案政策解读 | https://zyk.bjhd.gov.cn/zwdt/xxgk/zcjd/zcjd/202309/t20230927_4622536.shtml | 政策目标和指标解读 | P1 |
| auto_html | 图解中关村科学城通用人工智能实施方案 | https://zyk.bjhd.gov.cn/zwdt/szgb/zcjd/jdjdt/202311/t20231120_4629654_hd.shtml | 图解入口 | 图片版权需人工判断 |
| auto_html | 北京市促进通用人工智能创新发展的若干措施 | https://www.beijing.gov.cn/zhengce/zfwj/202305/t20230530_3116869.html | 算力、数据、模型、场景、监管 | P0 |
| auto_html | 北京市推动“人工智能+”行动计划（2024-2025年） | https://www.beijing.gov.cn/zhengce/zhengcefagui/202503/t20250325_4043893.html | AI+医疗、教育、文化、交通、机器人等场景 | P0 |
| auto_html | 北京市发改委版“人工智能+”行动计划 | https://fgw.beijing.gov.cn/fgwzwgk/2024zcwj/bwqtwj/202407/t20240726_3760264.htm | 多部门正式印发文本，含 AI+交通、教育、医疗、司法、空间计算 | P0，优先于转载页 |
| auto_html | 北京市人工智能创新高地建设推进会 | https://fgw.beijing.gov.cn/gzdt/fgzs/tpxw/202601/t20260106_4404914.htm | 北京人工智能创新高地建设行动计划、九大行动、首批创新街区 | 2026 年官方发布，P0/P1 |
| auto_html | 北京人工智能创新高地建设行动计划新闻 | https://jxj.beijing.gov.cn/ztzl/ywzt/hbjh/hbdt/zcwj/rgznzc/202603/t20260316_4557526.html | 北京 AI 高地目标、国产智算集群、企业指标 | P1 |
| auto_html | 北京加快打造人工智能万亿级产业集群 | https://kw.beijing.gov.cn/xwdt/kcyx/xwdtcyfz/202603/t20260302_4546431.html | 2025 年 AI 核心产业规模、企业数量、算力和创新街区 | 2026 年，P1 |
| auto_html | 北京市国民经济和社会发展第十五个五年规划纲要 | https://www.beijing.gov.cn/zhengce/zhengcefagui/202604/t20260407_4576089.html | 北京 2026-2030 总体发展任务 | P0 |
| auto_pdf | 北京市十五五规划纲要 PDF | https://www.beijing.gov.cn/zhengce/zhengcefagui/202604/W020260521433654900452.pdf | 北京 2026-2030 规划 PDF | P0，优先下载 |
| auto_html | 国务院关于深入实施“人工智能+”行动的意见 | https://www.gov.cn/zhengce/zhengceku/202508/content_7037862.htm | 国家 AI+ 顶层政策 | P0 |
| auto_html | 深化智慧城市发展、推进城市全域数字化转型指导意见 | https://www.gov.cn/zhengce/zhengceku/202405/content_6952353.htm | 城市数字化、数据要素、产城融合 | P0 |
| auto_html | 生成式人工智能服务管理暂行办法 | https://www.cac.gov.cn/2023-07/13/c_1690898326795531.htm | AI 合规、数据和内容安全 | P0 |

## C. 统计、公报与经济数据

| 类型 | 名称 | URL | 采集内容 | 备注 |
|---|---|---|---|---|
| auto_html | 海淀区统计公报列表 | https://zyk.bjhd.gov.cn/sjkf/tjgb/ | 历年统计公报入口 | 可分页抓取 |
| auto_html | 海淀区数据开放/数说海淀列表 | https://zyk.bjhd.gov.cn/sjkf/sshd/index_m_1.shtml | 经济运行、五经普、专题数据新闻 | 可抓列表页及子页 |
| auto_html | 海淀区2025年国民经济和社会发展统计公报 | https://zyk.bjhd.gov.cn/sjkf/tjgb/202604/t20260410_4811526.shtml | GDP、人口、产业、科技、民生 | P0 |
| auto_html | 海淀区2024年国民经济和社会发展统计公报 | https://zyk.bjhd.gov.cn/sjkf/tjgb/202504/t20250423_4766489.shtml | 年度对比基础 | P0 |
| auto_pdf | 海淀区第五次全国经济普查公报 PDF | https://zyk.bjhd.gov.cn/sjkf/tjgb/202509/P020250908358373241269.pdf | 产业结构、法人单位、从业人员等 | P0 |
| auto_html | 北京市2025年国民经济和社会发展统计公报 | https://tjj.beijing.gov.cn/zxfbu/202603/t20260324_4564401.html | 北京市级宏观参照 | P1 |
| auto_html | 北京市2024年国民经济和社会发展统计公报 | https://www.beijing.gov.cn/gongkai/shuju/tjgb/202505/t20250529_4102086.html | 北京市级宏观参照 | P1 |

## C2. 交通、慢行与空间标准

| 类型 | 名称 | URL | 采集内容 | 备注 |
|---|---|---|---|---|
| auto_html | 北京市慢行系统规划（2020年-2035年）公示报道 | https://www.beijing.gov.cn/ywdt/gzdt/202109/t20210903_2483137.html | 慢行系统目标、指标、网络策略 | 规划期覆盖 2035，T2 |
| auto_html | 北京市“十四五”时期交通发展建设规划 | https://fgw.beijing.gov.cn/fgwzwgk/2024zcwj/ghjhwb/wngh/202206/t20220625_3732854.htm | 绿色出行、慢行、智慧停车、交通治理 | 规划期到 2025，作背景 |
| auto_html | 2026年非机动车停放秩序治理专项行动计划 | https://jtw.beijing.gov.cn/xxgk/dtxx/202603/t20260318_4560621.html | 非机动车保有量、停车位供给、接驳治理 | 2026 年，P1 |
| auto_html | 城市道路慢行系统、绿道与滨水慢行路融合规划设计标准 | https://ghzrzyw.beijing.gov.cn/biaozhunguanli/bz/szjgdjt/202405/t20240531_3700152.html | DB11/T 2209-2023 标准入口 | P1 |
| auto_pdf | 城市道路慢行系统、绿道与滨水慢行路融合规划设计标准 PDF | https://ghzrzyw.beijing.gov.cn/biaozhunguanli/bz/szjgdjt/202405/P020240531370798445170.pdf | 慢行、绿道、滨水慢行融合标准 | P1，优先下载 |
| auto_html | 滨水慢行系统规划设计导则征求意见 | https://swj.beijing.gov.cn/swdt/tzgg/202501/t20250117_3991712.html | 滨水慢行设计导则征求意见稿 | 非最终稿，作线索 |
| auto_docx | 滨水慢行系统规划设计导则征求意见稿 | https://swj.beijing.gov.cn/swdt/tzgg/202501/P020250117535098047096.docx | 导则文本 | 非最终稿，下载后标记 draft |

## D. 北京公共数据开放平台

| 类型 | 名称 | URL | 采集内容 | 备注 |
|---|---|---|---|---|
| metadata_html | 北京市公共数据开放平台首页 | https://data.beijing.gov.cn/ | 数据目录、机构、主题入口 | 可抓元数据 |
| metadata_html | 开放目录 | https://data.beijing.gov.cn/zyml/kfml/index.htm | 全部开放目录列表 | 可抓目录，翻页需解析 |
| metadata_html | 按主题目录 | https://data.beijing.gov.cn/zyml/azt/index.htm | 交通服务、教育科研、环境资源等主题 | 可抓目录 |
| metadata_html | 按机构目录 | https://data.beijing.gov.cn/zyml/ajg/index.htm | 市交通委、市规自委、市统计局、海淀区等 | 可抓目录 |
| metadata_html | 市交通委目录 | https://data.beijing.gov.cn/zyml/ajg/sjtw/ | 交通类数据集列表 | 可抓目录 |
| metadata_html | 往年开放数据 | https://data.beijing.gov.cn/zyml/wnkfsj/index2.htm | 历史交通、停车、天气等数据入口 | 可抓目录 |
| metadata_html | 公交站点信息（出行服务） | https://data.beijing.gov.cn/zyml/ajg/sjtw/17453.htm | 线路名称、方向、站点序号、站点名称；记录数 76283 | 数据文件/API 需登录或 userKey |
| metadata_html | 乘客引导基础信息 | https://data.beijing.gov.cn/zyml/ajg/sjtw/96fb0e66adef41aab7a98797a2e0cd1c.htm | 轨道线路、公交线路、周边交通指南、枢纽站信息 | 数据文件/API 需登录或 userKey |
| keyed_api | 公交站点信息 API 文档 | https://data.beijing.gov.cn//cms/web/bjdata/api/dataDoc.jsp?contentID=17453 | API 参数说明 | 登录后获取 `userKey` |
| keyed_api | 乘客引导基础信息 API 文档 | https://data.beijing.gov.cn//cms/web/bjdata/api/dataDoc.jsp?contentID=96fb0e66adef41aab7a98797a2e0cd1c | API 参数说明 | 登录后获取 `userKey` |
| keyed_api | 公共数据 API 调用模板 | https://data.beijing.gov.cn/cms/web/api/{USER_KEY}/{CONTENT_ID}?currentPage=1&pageSize=500 | 分页拉取 JSON | 需替换 `USER_KEY` 和 `CONTENT_ID` |
| manual_only | 公交站点 CSV 下载地址 | https://data.beijing.gov.cn/cms/data/downloadResource/3c54d7a5291644d8a4da063032f5300e | CSV 文件下载 | 当前跳转 SSO 登录，拿到会话后可自动 |
| manual_only | 公交站点 XLSX 下载地址 | https://data.beijing.gov.cn/cms/data/downloadResource/a12812ba8132448184fc5c2599bc3b7d | XLSX 文件下载 | 当前跳转 SSO 登录 |
| manual_only | 乘客引导 CSV 下载地址 | https://data.beijing.gov.cn/cms/data/downloadResource/6baf53487c414098b035bca27708a028 | CSV 文件下载 | 当前跳转 SSO 登录 |

## E. 公园、文化遗产与公共空间

| 类型 | 名称 | URL | 采集内容 | 备注 |
|---|---|---|---|---|
| auto_html | 京张铁路遗址公园一期项目开工建设 | https://yllhj.beijing.gov.cn/ztxx/lhysh/st/202201/t20220119_2595406.shtml | 一期建设背景 | P1 |
| auto_html | 京张铁路遗址公园一期南段开放 | https://www.beijing.gov.cn/ywdt/gzdt/202302/t20230202_2910777.html | 一期长度、面积、功能、开放节点 | P1 |
| auto_html | 京张铁路遗址公园一期全面建成开放 | https://yllhj.beijing.gov.cn/zwgk/zwxx/202306/t20230626_3145467.shtml | 一期 2.5 公里、16.8 公顷、遗址保护和城市更新 | P1 |
| auto_html | 京张铁路遗址公园二期计划年底前开工 | https://www.beijing.gov.cn/ywdt/gqrd/202409/t20240920_3902264.html | 二期建设和工业遗存 | P1 |
| auto_html | 海淀版京张铁路遗址公园二期开工计划 | https://zyk.bjhd.gov.cn/ywdt/hdywx/202409/t20240920_4670752_hd.shtml | 二期 9 公里、服务社区和高校科研机构 | P1 |
| auto_html | 北京市园林绿化局：京张铁路遗址公园 | https://yllhj.beijing.gov.cn/ggfw/bjsggml/zhgy/hdq/202507/t20250724_4156668.shtml | 公园名录、开放时间、服务信息 | P1，注意页面中地址字段需人工核验 |
| auto_html | 北京市园林绿化局公园信息入口 | https://yllhj.beijing.gov.cn/ggfw/gyfjqyl/gyxx/ | 公园名录入口 | 可抓入口和 PDF |
| auto_pdf | 北京市公园名录（2025年度） | https://yllhj.beijing.gov.cn/ggfw/bjsggml/bjsgymlzb/202511/P020251127601806691724.pdf | 公园名称、类型、地址、主管单位 | P1 |
| auto_html | 北京市文物局：清华园车站旧址 | https://wwj.beijing.gov.cn/bjww/362771/362782/743928533/743928745/index.html | 文保范围、建设控制地带 | P1，规划约束 |
| auto_html | 清华大学校史馆：见证进京“赶考”历史的百年清华园车站 | https://xsg.tsinghua.edu.cn/info/1003/3329.htm | 清华园车站历史、开放信息 | P1 |
| auto_html | 清华园车站旧址开放新闻 | https://www.beijing.gov.cn/renwen/sy/whkb/202303/t20230326_2944607.html | 旧址开放、展陈和红色文化 | P1 |

## F. 开放地理数据

| 类型 | 名称 | URL | 采集内容 | 备注 |
|---|---|---|---|---|
| geo_api | Overpass API | https://overpass-api.de/api/interpreter | OSM 道路、步道、轨道、站点、绿地、水系、POI | 记录 ODbL 许可和日期 |
| geo_api | Overpass Turbo 调试入口 | https://overpass-turbo.eu/ | 调试和导出 Overpass 查询 | 不作为最终数据源 |
| auto_html | OpenStreetMap 版权和许可 | https://www.openstreetmap.org/copyright | ODbL 署名和许可要求 | 入库前必须记录 |

建议初始 bbox：

```text
south=39.935
west=116.300
north=40.055
east=116.395
```

建议 Overpass 查询模板：

```text
[out:json][timeout:90];
(
  way["highway"](39.935,116.300,40.055,116.395);
  node["public_transport"](39.935,116.300,40.055,116.395);
  way["railway"](39.935,116.300,40.055,116.395);
  relation["route"="subway"](39.935,116.300,40.055,116.395);
  way["leisure"="park"](39.935,116.300,40.055,116.395);
  relation["leisure"="park"](39.935,116.300,40.055,116.395);
  way["waterway"](39.935,116.300,40.055,116.395);
);
out body;
>;
out skel qt;
```

## G. 国际案例与 AI 城市治理

| 类型 | 名称 | URL | 采集内容 | 备注 |
|---|---|---|---|---|
| auto_html | Brookings: The Rise of Innovation Districts | https://www.brookings.edu/essay/rise-of-innovation-districts/ | 创新区理论、空间与产业组织 | P2 |
| auto_pdf | Brookings PDF: The Rise of Innovation Districts | https://www.brookings.edu/wp-content/uploads/2016/07/InnovationDistricts1.pdf | 可转文本 | P2 |
| auto_html | Brookings: 12 Principles guiding innovation districts | https://www.brookings.edu/articles/12-principles-guiding-innovation-districts-2/ | 创新区原则 | P2 |
| auto_html | Brookings: Clusters and innovation districts | https://www.brookings.edu/articles/clusters-and-innovation-districts-lessons-from-the-united-states-experience/ | 美国集群与创新区经验 | P2 |
| auto_html | OECD: Smart Cities and Inclusive Growth | https://www.oecd.org/en/publications/smart-cities-and-inclusive-growth_8a4ce475-en.html | 智慧城市和包容增长框架 | P2 |
| auto_pdf | OECD PDF: Smart Cities and Inclusive Growth | https://www.oecd.org/content/dam/oecd/en/publications/reports/2020/08/smart-cities-and-inclusive-growth_332850c0/8a4ce475-en.pdf | 可转文本 | P2 |
| auto_html | UN-Habitat: AI & Cities | https://unhabitat.org/ai-cities-risks-applications-and-governance | AI 城市风险、应用、治理 | P2 |
| auto_pdf | UN-Habitat PDF: AI and Cities | https://unhabitat.org/sites/default/files/2022/10/artificial_intelligence_and_cities_risks_applications_and_governance.pdf | 可转文本 | P2 |
| auto_html | UN-Habitat: Global Assessment of Responsible AI in Cities | https://unhabitat.org/global-assessment-of-responsible-ai-in-cities | 负责任城市 AI 评估 | P2 |
| auto_pdf | UN-Habitat PDF: Global Assessment of Responsible AI in Cities | https://unhabitat.org/sites/default/files/2025/11/global_assessment_of_responsible_ai_in_cities_24112025.pdf | 可转文本 | P2 |
| auto_html | Global Observatory of Urban AI | https://gouai.cidob.org/ | 城市 AI 案例库和报告入口 | P2 |
| auto_html | CIDOB: Atlas of Urban AI first report | https://www.cidob.org/publicaciones/mapeo-de-la-inteligencia-artificial-urbana-primer-informe-del-atlas-de-la | 城市 AI 案例报告 | P2 |

## 暂不自动抓取

- 北京科技园拍卖招标有限公司资格预审文件：公告写明需要登记表和下载密码，暂列 `manual_only`。
- 中国招标投标公共服务平台同一公告：可登记入口，但正文已由市规自委公告覆盖。
- 天地图、百度地图、高德地图、腾讯地图商业瓦片、POI、街景：不入自动采集，除非后续明确许可和使用条款。
- 新闻图片、图解图片、专题页海报：先只抓标题、正文和图片 URL；图片是否可再分发由人工确认。
