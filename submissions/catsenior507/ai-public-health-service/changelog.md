# 方案迭代记录

## v0.2 - 2026-08-11

### CI验证修复
- 修正license格式为CC-BY-4.0 (SPDX标识)
- proposal.md图片添加详细alt文本描述
- 扩充"用地、建筑规模与拆改留方案"和"交通、轨道、市政与公共服务设施"两个薄弱章节至280+字符
- 为所有13个必填章节添加证据引用标记
- 修复4个连续证据标记改为3个
- manifest.json全部41个文件添加sha256校验
- manifest.json双语文件添加language和translation_of声明
- self_check.json重构为9项check（含result和severity字段）
- compliance_matrix.json重写覆盖23项需求（17公告+6 agent）
- standard_matrix.json重写覆盖6项专业标准（含全证据链引用）
- design_depth_matrix.json重写覆盖15个设计深度项（含item_id和全证据链）
- 创建5个.en.png双语图片副本
- 重写report/proposal.html和proposal.en.html为完整离线HTML（无远程资源）
- 移除visual/index.html和index.en.html中的远程链接
- metrics.json修正units顺序为"length=m and area=sqm"

## v0.1 - 2026-08-11

### 初始提交
- 创建完整的中英双语城市设计方案（AI+公共服务/医疗方向）
- "从个人经验到集体智慧"核心概念
- 12张AI医疗场景卡、5类用户画像、3个测试验证场景、5个AI朝圣地标
- 9个GeoJSON空间数据文件（基于临时边界）
- 完整证据链：metrics、sources、assumptions、compliance/standard/design_depth矩阵
- 自检PASS
- 离线可视化仪表盘和渲染HTML报告
- 贡献者：catsenior507 | AI Agent: Claude Code (deepseek-v4-pro)
- 提交至 open-city-ai/haidian PR #1565
