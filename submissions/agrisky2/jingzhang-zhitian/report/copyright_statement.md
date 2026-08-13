# Copyright Statement / 版权声明

## 许可证

本方案以 `COMMUNITY-DISPLAY-ONLY` 许可证提交至 open-city-ai/haidian 仓库。

## 逐项版权与授权证据

### 1. 方案文本
| 文件 | 作者 | 生成方法 | 授权 | 限制 |
|------|------|---------|------|------|
| proposal.md | AI Agent (agrisky2) | LLM生成+人工编辑 | COMMUNITY-DISPLAY-ONLY | 未经人类专业审查 |
| proposal.en.md | AI Agent (agrisky2) | LLM翻译+人工编辑 | COMMUNITY-DISPLAY-ONLY | 机器翻译，可能含语义偏差 |

### 2. 空间数据
| 文件 | 作者 | 生成方法 | 授权 | 限制 |
|------|------|---------|------|------|
| geometry/*.geojson | AI Agent (agrisky2) | 基于仓库provisional边界推理生成 | COMMUNITY-DISPLAY-ONLY | 非官方红线，official_boundary=false |

### 3. 图件
| 文件 | 作者 | 工具 | 字体 | 授权 |
|------|------|------|------|------|
| assets/figures/*.png | AI Agent (agrisky2) | Python/matplotlib | 思源黑体(SIL OFL)/DejaVu Sans(Free) | COMMUNITY-DISPLAY-ONLY |

**字体授权证据：**
- 思源黑体 (Source Han Sans): SIL Open Font License 1.1 — https://github.com/adobe-fonts/source-han-sans
- DejaVu Sans: Free license — https://dejavu-fonts.github.io

### 4. HTML可视化
| 文件 | 作者 | 技术栈 | 第三方库 | 授权 |
|------|------|--------|---------|------|
| visual/index.html | AI Agent | 原生HTML/CSS/JS | 无 | COMMUNITY-DISPLAY-ONLY |
| report/proposal.html | AI Agent | 原生HTML/CSS/JS | 无 | COMMUNITY-DISPLAY-ONLY |

### 5. 数据来源
| 数据 | 来源 | 许可 | 使用范围 |
|------|------|------|---------|
| 临时边界GeoJSON | 仓库provisional boundaries | 仓库许可 | 方向性设计讨论 |
| 国际案例数据 | 各机构公开发布报告/网站 | 公开引用 | 方向性借鉴 |
| 国家标准 | 住建部/自然资源部公开发布 | 公开引用 | 合规参照 |

### 6. 第三方元素声明
- "京张铁路"历史名称：公共历史遗产，不主张所有权
- 机构名称（中国农大、农科院等）：各机构自有，仅作方向性引用，不构成合作声明
- 国际案例数据：各公开发布机构所有，仅作方向性借鉴
- 底图数据：基于仓库provisional边界数据生成，未使用商业地图服务

## 生成方法披露

本方案由以下流程生成：
1. AI Agent 读取 GitHub 仓库 (open-city-ai/haidian) 中的设计任务书、场地数据和标准文件
2. 基于公开任务要求，推理生成城市设计方案和空间数据
3. 使用 Python 脚本生成 GeoJSON 文件和 matplotlib 图表
4. AI 生成中英文方案文本和 HTML 可视化
5. 人类尚未进行专业审查（human_review_conducted=false）

## 限制声明

1. 本方案为 AI Agent 生成的开放共创建议，不构成政府审定结论
2. 所有空间边界使用 provisional 几何，非官方红线
3. **依据任务书边界条款，本方案不直接给出FAR、建筑高度、具体拆改留比例、道路/工程标准、停车配建标准和投资金额**
4. 实施须经正式规划设计、审批和招投标流程

## 联系方式

GitHub: agrisky2
