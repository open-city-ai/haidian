# 公开资料时效性与权威性规则

> 状态：草案。访问日期：2026-05-28。
> 用途：筛选、排序和复核百年京张 AI 创新带资料包中的公开资料。

## 1. 权威等级

| 等级 | 可用性 | 来源类型 | 使用规则 |
|---|---|---|---|
| A0 | 主证据 | 政府正式公告、政策文件、规划纲要、统计公报、政府公报、官方标准、公共数据开放平台元数据 | 可作为 brief 和方案依据的核心来源 |
| A1 | 强证据 | 政府部门官网新闻、官方政策解读、官方专题页、官方发布会实录 | 可作为项目背景和事实补充，关键数字最好与 A0 互证 |
| A2 | 辅助证据 | 首都之窗转载的权威媒体报道、北京日报/新华社/人民网等主流媒体报道 | 只用于时间线、案例描述和补充叙事，不单独作为规划结论 |
| A3 | 对标证据 | OECD、UN-Habitat、Brookings、CIDOB 等机构报告 | 用于国际案例和方法框架，不直接套用为本地结论 |
| X | 不入库 | 商业地图瓦片、账号内资料、下载密码资料、版权不明图片、非公开图件、个人信息 | 不进入自动资料包 |

## 2. 时效等级

| 等级 | 定义 | 使用规则 |
|---|---|---|
| T0 | 2026 年发布，或项目征集期内发布 | 最高优先抓取和引用 |
| T1 | 2025 年发布，或仍在执行期内的政策/规划 | 可作为近期依据 |
| T2 | 规划期覆盖 2026 年及以后，例如 2020-2035、2026-2030 | 即使发布时间较早，也视为有效 |
| T3 | 历史文化、文物、公园建成资料等长期事实 | 可用，但必须记录访问日期 |
| T4 | 可能过期、已被新文件替代、或只有旧新闻无正式文件 | 只作背景线索，不进入申请者核心资料 |

## 3. 自动抓取优先级

1. 先抓 `A0 + T0/T1/T2`：项目公告、十五五规划、AI 行动计划、统计公报、公共数据元数据。
2. 再抓 `A1 + T0/T1`：2026 年官方发布会、官方新闻、专题页。
3. 再抓 `A0/A1 + T3`：京张铁路遗址、清华园车站、文物和公园基础资料。
4. 最后抓 `A3`：国际案例和方法框架。
5. `A2` 新闻只进“背景材料”，不进“核心依据”。

## 4. 刷新频率

| 资料类型 | 刷新频率 | 说明 |
|---|---|---|
| 项目征集公告、资格预审、补遗、答疑 | 每周 | 征集期内最容易变化 |
| 2026 年 AI 政策、创新街区、海淀区专题页 | 每两周 | 可能持续新增材料 |
| 公共数据开放目录 | 每月 | 目录和数据文件可能更新 |
| 统计公报、年鉴、经济普查 | 每季度 | 关注新年度发布和修订 |
| 上位规划、标准、文物资料 | 每半年 | 通常较稳定 |
| 国际案例报告 | 每半年 | 只补新版或权威更新 |

## 5. 入库前必须记录

- 标题
- 发布机构
- 原始 URL
- 发布日期
- 访问日期
- 文件类型
- 权威等级
- 时效等级
- 是否直接可下载
- 许可/使用限制
- 摘要
- 采集状态
- 人工复核状态

## 6. 申请者可见资料的底线

- 必须能追溯到公开 URL。
- 必须说明来源和访问日期。
- 涉及数字、范围、周期、主办单位、政策目标时，优先引用 A0。
- 涉及新闻性表述时，必须标明“据公开报道”或“据官方发布信息”。
- 涉及空间范围、建设强度、道路组织、用地边界时，不得把概念性公开资料说成审定规划结论。


## English Quick Reference

The Chinese text above is authoritative. This section is a non-normative summary; where it
omits a detail, follow the Chinese requirements.

### Authority levels

| Level | Usability | Source type |
|---|---|---|
| A0 | Primary evidence | Official government announcements, policy documents, planning summaries, official statistics and gazettes, official standards, and open-data-platform metadata |
| A1 | Strong evidence | Government department website news, official policy interpretations, official press conference transcripts; cross-check key figures against A0 where possible |
| A2 | Supporting evidence | Authorized reposts by the Beijing government portal and state media reports (Beijing Daily, Xinhua, People's Daily); use for timelines and narrative, not planning conclusions |
| A3 | Benchmark evidence | OECD, UN-Habitat, Brookings, CIDOB reports; use for international cases and frameworks, not local conclusions |
| X | Do not index | Commercial map tiles, account-gated or password-protected materials, unclear-copyright images, non-public data, and personal information |

### Timeliness levels

| Level | Definition |
|---|---|
| T0 | Published in 2026 or during the open-call period |
| T1 | Published in 2025 or policy/plan still in force |
| T2 | Planning period covers 2026 and beyond (e.g., 2020–2035) |
| T3 | Long-term historical facts (heritage, parks); record the access date |
| T4 | Potentially outdated; only use as background context |

### Crawl priority order

1. `A0 + T0/T1/T2` — project announcements, 15th Five-Year Plan, AI action plans, statistical bulletins.
2. `A1 + T0/T1` — 2026 official press conferences, news, thematic pages.
3. `A0/A1 + T3` — Jing-Zhang Railway heritage, Qinghua Garden Station, heritage parks.
4. `A3` — international cases and methodology frameworks.
5. `A2` news — background material only; not core evidence.
