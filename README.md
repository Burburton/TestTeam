# AI Team Template

**可复用的 AI 开发团队模板底座** - 基于 OpenCode + GitHub + GitHub Actions 的半自动化软件开发系统。

## 特性

- 🤖 **七个 AI 角色**: Planner, Architect, Developer, QA, Reviewer, Triage, CI Analyst
- 🧠 **分层记忆系统**: 全局记忆、角色记忆、任务记忆、失败库隔离
- 📋 **任务系统**: task.yaml 任务清单，状态机驱动工作流
- 🔄 **可升级底座**: 项目开发期间可同步最新模板更新
- 📦 **开箱即用**: 一键初始化新项目
- 🔒 **安全可控**: 人工审批保留在关键节点，治理模型保护核心知识

## 快速开始

### 方式一：作为模板使用 (推荐)

```bash
# 使用 GitHub Template 创建新仓库
# 或者克隆此仓库
git clone https://github.com/your-org/ai-team-template.git my-project
cd my-project

# 初始化配置
node cli/ai-team.cjs init
```

### 方式二：添加到现有项目

```bash
cd your-existing-project

# 下载并运行初始化脚本
npx ai-team-template init
```

### 方式三：全局安装

```bash
npm install -g ai-team-template

# 创建新项目
ai-team init my-project

# 或在现有项目中初始化
cd your-project
ai-team init
```

## 项目结构

```
ai-team-template/
├── .ai-team/                    # AI Team 核心配置 (升级时覆盖)
│   ├── agents/                  # AI 角色定义
│   │   ├── planner.md           # 任务分解和流程协调
│   │   ├── architect.md         # 架构设计
│   │   ├── developer.md         # 代码实现
│   │   ├── qa.md                # 质量验证
│   │   ├── reviewer.md          # 代码审查
│   │   ├── triage.md            # Issue 分类和调试
│   │   └── ci-analyst.md        # CI 失败分析
│   ├── skills/                  # 可复用技能
│   ├── commands/                # 工作流命令
│   └── memory/                  # 角色记忆模板
│
├── cli/                         # CLI 工具
│   ├── ai-team.cjs              # 主命令
│   └── sync.cjs                 # 同步脚本
│
├── .github/                     # GitHub 配置 (可自定义)
│   ├── workflows/               # CI/CD 工作流
│   └── ISSUE_TEMPLATE/          # Issue 模板
│
├── docs/                        # 文档目录
│   ├── architecture/            # 架构文档
│   ├── decisions/               # 决策记录
│   ├── patterns/                # 实现模式库
│   ├── releases/                # 发布文档
│   └── runbooks/ci/             # CI 运维手册
│
├── tasks/                       # 任务记忆存储
│   ├── _template/               # 任务模板
│   │   ├── task.yaml            # 任务清单模板
│   │   └── release.md           # 发布检查模板
│   └── issue-{id}/              # 具体任务目录
│
├── src/                         # 源代码
│
├── ai-team.config.yaml          # 项目配置 (自定义)
├── AGENTS.md                    # 全局规则 (自定义)
└── README.md
```

## 使用指南

### 1. 初始化项目

```bash
# 交互式初始化
ai-team init

# 指定参数
ai-team init my-project \
  --language typescript \
  --framework node \
  --description "My awesome project"
```

### 2. 配置 GitHub Secrets

在仓库 Settings → Secrets and variables → Actions 添加：

| Secret | 说明 |
|--------|------|
| `OPENCODE_API_KEY` | OpenCode API 密钥 |
| `GITHUB_TOKEN` | 自动提供，无需手动配置 |

### 3. 使用 AI Team

创建 Issue 后，评论命令触发 AI：

```
/opencode use architect to analyze this issue
```

**可用命令：**

| 命令 | 角色 | 作用 |
|------|------|------|
| `/triage` | Triage | Issue 分类和初步调试 |
| `/design` | Architect | 分析需求，设计方案 |
| `/implement` | Developer | 实现代码 |
| `/test` | QA | 测试验证 |
| `/review` | Reviewer | 代码审查 |
| `/ci-analyze` | CI Analyst | CI 失败分析 |
| `/release-check` | Reviewer | 发布就绪检查 |

### 4. 工作流程

#### 功能开发流程

```
Issue 创建
     │
     ▼
┌─────────────┐
│   Planner   │ ─── 任务分解，派发给合适角色
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  Architect  │ ─── 分析需求，设计方案
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  Developer  │ ─── 实现代码，创建 PR
└─────┬───────┘
      │
      ▼
┌─────────────┐
│     QA      │ ─── 测试验证
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  Reviewer   │ ─── 代码审查
└─────┬───────┘
      │
      ▼
┌─────────────┐
│   Human     │ ─── 审批合并
└─────────────┘
```

#### Bug 修复流程

```
Bug 报告
     │
     ▼
┌─────────────┐
│   Triage    │ ─── 分类，初步调试分析
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  Developer  │ ─── 修复代码
└─────┬───────┘
      │
      ▼
┌─────────────┐
│     QA      │ ─── 回归测试
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  Reviewer   │ ─── 代码审查
└─────────────┘
```

#### CI 失败流程

```
CI 失败
     │
     ▼
┌─────────────┐
│ CI Analyst  │ ─── 分析失败原因，提供修复建议
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  Developer  │ ─── 应用修复
└─────┬───────┘
      │
      ▼
┌─────────────┐
│     QA      │ ─── 验证修复
└─────────────┘
```

## 任务系统

### task.yaml 任务清单

每个任务都有一个 `task.yaml` 文件：

```yaml
id: issue-123
title: 实现用户认证
type: feature
status: in_implementation
priority: high
owner_role: developer
depends_on: []
blocked_by: []
acceptance_criteria:
  - 用户可以使用邮箱密码登录
  - 登录失败有合理的错误提示
risk_level: medium
module_scope:
  - auth
  - api
```

### 任务状态机

```
backlog → ready → in_analysis → in_design → in_implementation → in_validation → in_review → release_candidate → done
                              ↓                                              ↓
                           blocked ←───────────────────────────────────────── ←
```

## 升级底座

当模板仓库有更新时，可以同步到你的项目：

```bash
# 检查状态
ai-team status

# 升级到最新版本
ai-team upgrade

# 强制升级
ai-team upgrade --force
```

**升级注意事项：**

- `.ai-team/` 目录会被覆盖
- 自定义配置 (`ai-team.config.yaml`, `AGENTS.md`) 不会被覆盖
- 自动创建备份

## 记忆系统

### 四层记忆架构

```
┌─────────────────────────────────────┐
│       GLOBAL MEMORY (docs/)          │
│   项目级知识，需要人工审批修改        │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│   ROLE MEMORY (.ai-team/memory/)    │
│   角色专属记忆，自动更新              │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│   FAILURES LIBRARY                   │
│   共享失败模式库，CI Analyst 维护     │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│      TASK MEMORY (tasks/)            │
│   任务级记忆，自动创建归档            │
└─────────────────────────────────────┘
```

### 记忆权限矩阵

| 角色 | 全局 | Planner | Architect | Developer | QA | Reviewer | Triage | CI Analyst | 失败库 | 任务 |
|------|------|---------|-----------|-----------|-----|----------|--------|------------|--------|------|
| Planner | 只读 | 读写 | 只读 | - | - | - | 只读 | - | 只读 | 读写 |
| Architect | 只读 | 只读 | 读写 | 只读 | - | - | - | - | 只读 | 读写 |
| Developer | 只读 | 只读 | 只读 | 读写 | - | - | - | - | 只读 | 读写 |
| QA | 只读 | 只读 | 只读 | - | 读写 | - | - | - | 只读 | 读写 |
| Reviewer | 只读 | 只读 | 只读 | 只读 | 只读 | 读写 | - | - | 只读 | 读写 |
| Triage | 只读 | - | - | - | - | - | 读写 | - | 只读 | 读写 |
| CI Analyst | 只读 | - | - | - | - | - | - | 读写 | 读写 | 读写 |

## 治理模型

### 变更范围保护

- Bug 修复不应进行无关重构
- 功能开发不应在未审批时重新设计公共接口
- 重构应保持行为不变
- 审查者不应静默修改实现

### 受保护知识区域

AI 不能直接修改以下区域，需要人工审批：

- `docs/architecture/`
- `docs/decisions/`
- 发布策略
- 标准文档

### 人工审批关卡

以下操作需要人工审批：

- 架构变更
- 合并到受保护分支
- 发布操作
- 修改全局知识
- 高风险任务分解

## 自定义配置

### ai-team.config.yaml

```yaml
project:
  name: "my-project"
  description: "My project description"
  language: "typescript"
  framework: "node"

ai_team:
  version: "2.0.0"
  agents:
    planner: true
    architect: true
    developer: true
    qa: true
    reviewer: true
    triage: true
    ci_analyst: true

rules:
  coding:
    max_function_lines: 30
    test_coverage_threshold: 80
  git:
    commit_convention: "conventional"
  governance:
    protected_paths:
      - "docs/architecture/"
      - "docs/decisions/"
```

### 添加自定义角色

1. 创建角色文件 `.ai-team/agents/custom-role.md`
2. 在配置中启用：

```yaml
ai_team:
  custom_agents:
    - name: product-manager
      enabled: true
```

### 添加自定义技能

1. 创建技能文件 `.ai-team/skills/my-skill/skill.md`
2. 在 `opencode.jsonc` 中注册

## 开发此模板

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 构建
npm run build

# 本地测试 CLI
node cli/ai-team.cjs init test-project
```

## 常见问题

### Q: 如何保留自定义修改？

A: 以下文件不会被升级覆盖：
- `ai-team.config.yaml`
- `AGENTS.md`
- `docs/`
- `src/`
- `tests/`

### Q: 如何回滚升级？

A: 升级时会自动创建备份目录 `.ai-team-backup-{timestamp}`，可以手动恢复。

### Q: 支持 GitHub 以外的平台吗？

A: 目前主要支持 GitHub。GitLab 支持计划中。

### Q: v1 升级到 v2 需要做什么？

A: v2 新增了 3 个角色 (Planner, Triage, CI Analyst)、任务系统、治理模型。运行 `ai-team upgrade` 会自动添加新组件。

## 贡献

欢迎提交 Issue 和 Pull Request！

## License

MIT