# 公开资料索引

本页是 `sources/public-sources.json` 的人类可读说明。投稿者和 AI agent 应优先引用索引内资料；如使用索引外公开资料，需要在方案的“参考资料”章节补充来源、发布时间或访问路径，并说明其公开性。

## 使用原则

- 只引用公开资料、授权资料或参赛者自行整理且可公开说明来源的资料。
- 不引用涉密图件、非公开空间数据、内部研判、未审定规划控制指标、个人信息或企业非公开资料。
- 涉及建设强度、建筑高度、道路线位、土地权属等内容时，应明确为概念建议，不得伪装为官方审定结论。
- 索引外资料不代表不可使用，但必须由投稿者说明来源和公开性，并接受维护者复核。

## 当前索引

| ID | 标题 | 类型 | 引用方式 | 可公开状态 | 风险备注 |
| --- | --- | --- | --- | --- | --- |
| `brief-public-brief` | 百年京张 AI 创新带公开任务书草案 | brief | `brief/public-brief.md` | public-draft | 正式发布前仍需维护者确认不含涉密、内部或未审定信息。 |
| `brief-public-boundary` | 公开任务书资料边界说明 | boundary | `brief/README.md` | public-draft | 用于约束资料使用边界，不替代正式公开性审查。 |
| `heritage-batch11-notice-2025` | 北京市人民政府关于公布第十一批文物保护单位保护范围及建设控制地带的通知（京政发〔2025〕3号） | policy | `https://www.beijing.gov.cn/zhengce/zfwj/202501/t20250114_3989104.html` | external-public | 只有名单无四至；图纸“另行印发”未公开，不得声称掌握。 |
| `heritage-control-zone-rules` | 北京市文物保护单位保护范围及建设控制地带管理规定 | policy | `https://www.beijing.gov.cn/zhengce/zhengcefagui/202009/t20200922_2080070.html` | external-public | 只有分类含义无坐标；Ⅰ/Ⅲ/Ⅴ类与一/三/五类的对应属推定，须写入 assumptions。 |
| `heritage-batch11-scope-index` | 北京市文物局“第十一批划定文保单位的保护范围及建控地带”栏目 | culture | `https://wwj.beijing.gov.cn/bjww/362771/362782/743928533/index.html` | external-public | 滚动更新列表页，条目 URL 可能变动；四至须引具体详情页。 |
| `heritage-qinghuayuan-station` | 清华园车站旧址 保护范围及建设控制地带（第十一批） | culture | `https://wwj.beijing.gov.cn/bjww/362771/362782/743928533/743928745/index.html` | external-public | 文字四至可转译为 provisional 几何；不得标 official_constraint 或当作官方矢量。 |
| `heritage-pingsui-xizhimen-station` | 平绥西直门车站旧址 保护范围及建设控制地带（第十一批） | culture | `https://wwj.beijing.gov.cn/bjww/362771/362782/743928533/743928716/index.html` | external-public | 6 个保护范围子区须多要素表达；2004 年京政发〔2004〕18 号版本已被本批重划。 |
| `heritage-enyousi-enmusi-gates` | 恩佑寺山门、恩慕寺山门 保护范围及建设控制地带（第十一批） | culture | `https://wwj.beijing.gov.cn/bjww/362771/362782/743928533/743928725/index.html` | external-public | 所含“74定122”道路红线表述只约束本处一段，不得外推为红线图层。 |

## 外部公开来源条目的字段承载约定

`sources/public-sources.json` 的字段集合由 `schema/source.schema.json` 固定（`additionalProperties: false`），没有独立的 accessed date、允许用途、禁止用途和版本替代关系字段。为避免新增字段带来 schema 与校验脚本的连带改动，外部公开来源（`public_status: external-public`）的这四项信息按下列约定写入现有字段：

| 需要记录的信息 | 承载字段 | 写法 |
| --- | --- | --- |
| accessed date（访问日期） | `citation` | 以“访问日期：YYYY-MM-DD。”结尾 |
| 允许用途 | `usage_note` | 以“允许用途：”开头 |
| 禁止用途 | `risk_note` | 以“禁止用途：”开头 |
| 版本替代关系 | `risk_note` | 以“版本替代关系：”起句，写明被替代件的文号与替代范围 |

对文保四至类条目另有三条固定口径：

- 由文字四至推导的任何几何只能标 `provisional_constraint` / `agent_inferred_from_public_data`，不得标 `official_constraint`；
- 要素 `properties` 中须原样保留四至原文、条目 URL、访问日期与推导方法，使第三方可独立复核；
- 官方矢量或“另行印发”的图纸公布后，据此派生的几何须整体替换并复算，不得局部修补。

登记本身不构成公开性审查结论，也不授权把推定几何标注为官方约束。

## 机器可读文件

机器可读索引位于：

```text
sources/public-sources.json
```

本地校验命令：

```bash
python3 scripts/validate_sources.py
```

后续“方案自检评分”可读取该索引，检查投稿方案是否引用了索引内资料，并提示索引外资料需要补充公开性说明。

## English Quick Reference

The public source index at `sources/public-sources.json` lists publicly accessible sources
used for the Haidian AI design brief.

### Usage principles (English)

- Only cite publicly accessible, rights-cleared, or independently-sourced materials with
  documented provenance.
- Do not cite classified documents, non-public spatial data, unreviewed internal research,
  unapproved planning controls, personal data, or proprietary company materials.
- When discussing construction intensity, building height, road alignments, or land rights,
  label the content as a conceptual recommendation — never present it as an officially
  approved conclusion.
- Sources outside the index may still be used, but the participant must document the source,
  access date, and public status, and accept maintainer review.

### Adding a new source

Submit a `[source-registry]` Issue with the following information:
- URL or file path
- Publisher and publication date
- A short description of the content and its proposed use
- License or rights statement
- Proposed `usable_for_formal` tier: `yes`, `background_only`, `provisional_only`, or `no`

Maintainers review and, if approved, add the source to `data/source_registry.json`. Do not
edit the registry directly.
