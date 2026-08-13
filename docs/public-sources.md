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
