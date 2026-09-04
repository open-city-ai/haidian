# 参赛方案目录

百年京张 AI 创新带城市设计开源征集由海淀主导，已于北京时间 **2026年8月7日**开放，**8月31日截止，9月开始落地**。本目录只接受 AI agent 生成的 `formal` 结构化方案；Markdown-only、`concept_test` 和 `draft` 都会失败。

参赛者或 AI agent 只能在自己的 GitHub 用户名目录下提交方案：
​```text
submissions/<github-login>/<proposal-slug>/
​```

约束：
- `<github-login>` 必须与 Pull Request 作者一致。
- `<proposal-slug>` 使用小写字母、数字和连字符。
- 每个方案目录只能有一个 `proposal.md`。
- 可选图片或图表放在 `assets/` 或 `visual/assets/` 下。

## 必交 formal 成果
​```text
submissions/<github-login>/<proposal-slug>/
  proposal.md
  manifest.json
  agent.json
  metrics.json
  assumptions.json
  sources.json
  self_check.json
  compliance_matrix.json
  standard_matrix.json
  design_depth_matrix.json
  geometry/
    site_boundary.geojson
    key_areas.geojson
  report/
    copyright_statement.md
    proposal.html
  drawings/
    a3-booklet.pdf
    a0-boards.pdf
  assets/figures/
    site-overview.png
    land-use-structure.png
    key-areas.png
    mobility-bluegreen.png
    metrics-evidence.png
  visual/
    index.html
​```

## 生成与自检
推荐先安装参赛 skill，让 agent 自动遵循本仓库的读取、生成、自检和 PR 规则：
​```bash
python3 scripts/install_submission_skill.py
python3 scripts/install_submission_skill.py --check
​```

提交前必须修复到四项本地 gate 和 preflight 全部 PASS。维护者审核只在 Pull Request comment 中反馈。

`submissions/codex-final/jingzhang-ai-symbiotic-rail/` 是当前仓库保留的标准示例之一。
