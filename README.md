# AI Team Foundation

**可复用的 AI 开发团队底座** - 基于 OpenCode + GitHub + GitHub Actions 的半自动化软件开发系统。

具备受控的自举能力，支持初始化、验证、规划和升级下游项目。

## 特性

- 🤖 **七个 AI 角色**: Planner, Architect, Developer, QA, Reviewer, Triage, CI Analyst
- 🧠 **分层记忆系统**: 全局记忆、角色记忆、任务记忆、失败库隔离
- 📋 **任务系统**: task.yaml 任务清单，状态机驱动工作流
- 🔄 **可升级底座**: 项目开发期间可同步最新模板更新
- 📦 **开箱即用**: 一键初始化新项目
- 🔒 **安全可控**: 人工审批保留在关键节点，治理模型保护核心知识
- 🚀 **受控自举**: 支持初始化、验证、规划、升级，但不会无监管自我修改

## 快速开始

### 方式一：使用 Bootstrap 脚本 (推荐)

```bash
# 克隆 Foundation
git clone https://github.com/your-org/ai-team-foundation.git
cd ai-team-foundation

# 初始化新项目
./scripts/init_project.sh my-project

# 或使用 overlay
./scripts/init_project.sh -o python-backend -l python my-api
```

### 方式二：作为模板使用

```bash
# 使用 GitHub Template 创建新仓库
# 或者克隆此仓库
git clone https://github.com/your-org/ai-team-foundation.git my-project
cd my-project

# 初始化配置
node cli/ai-team.cjs init
```

### 方式三：添加到现有项目

```bash
cd your-existing-project

# 下载并运行初始化脚本
npx ai-team-foundation init
```

### 方式四：全局安装

```bash
npm install -g ai-team-foundation

# 创建新项目
ai-team init my-project

# 或在现有项目中初始化
cd your-project
ai-team init
```

## 项目结构

```
ai-team-foundation/
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
├── scripts/                     # Bootstrap 脚本
│   ├── init_project.sh          # 初始化新项目
│   ├── validate_foundation.sh   # 验证 Foundation
│   ├── validate_project_setup.sh # 验证项目配置
│   ├── plan_upgrade.sh          # 规划升级
│   ├── upgrade_foundation.sh    # 执行升级
│   ├── diff_foundation_vs_project.sh # 对比差异
│   └── generate_docs.sh         # 生成文档
│
├── .foundation/                 # Foundation 元数据模板
│   ├── foundation.lock          # 版本锁定模板
│   ├── upgrade-history.md       # 升级历史模板
│   └── local-overrides.md       # 本地覆盖模板
│
├── cli/                         # CLI 工具
│   ├── ai-team.cjs              # 主命令
│   └── sync.cjs                 # 同步脚本
│
├── overlays/                    # 技术栈 overlay
│   ├── cpp-qt-desktop/          # C++ Qt 桌面应用
│   ├── python-backend/          # Python 后端
│   ├── web-fullstack/           # 全栈 Web
│   └── ai-agent-product/        # AI Agent 产品
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
│   ├── runbooks/ci/             # CI 运维手册
│   ├── bootstrap-model.md       # Bootstrap 模型
│   ├── upgrade-policy.md        # 升级策略
│   └── overlay-guide.md         # Overlay 指南
│
├── tasks/                       # 任务记忆存储
│   ├── _template/               # 任务模板
│   │   ├── task.yaml            # 任务清单模板
│   │   └── release.md           # 发布检查模板
│   └── issue-{id}/              # 具体任务目录
│
├── src/                         # 源代码
│
├── VERSION                      # Foundation 版本
├── CHANGELOG.md                 # 版本变更记录
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

## Bootstrap 脚本

Foundation 提供一组 Bootstrap 脚本，用于初始化、验证和升级项目。

### 脚本列表

| 脚本 | 用途 | 模式 |
|------|------|------|
| `init_project.sh` | 初始化新项目 | init |
| `validate_foundation.sh` | 验证 Foundation 完整性 | validate |
| `validate_project_setup.sh` | 验证项目配置 | validate |
| `plan_upgrade.sh` | 生成升级计划 (只读) | plan-upgrade |
| `upgrade_foundation.sh` | 执行受控升级 | apply-upgrade |
| `diff_foundation_vs_project.sh` | 对比 Foundation 与项目 | validate |
| `generate_docs.sh` | 生成文档 | - |

### 初始化新项目

```bash
# 基本用法
./scripts/init_project.sh my-project

# 指定 overlay 和语言
./scripts/init_project.sh -o python-backend -l python my-api

# 使用 C++ Qt overlay
./scripts/init_project.sh -o cpp-qt-desktop -l cpp my-desktop-app

# 完整参数
./scripts/init_project.sh \
  --language typescript \
  --framework node \
  --description "My awesome project" \
  --overlay web-fullstack \
  my-project
```

**创建的内容**:
- `.ai-team/` - AI Team 配置
- `.github/` - GitHub 工作流和模板
- `.foundation/` - Foundation 元数据
- `docs/`, `tasks/`, `src/` - 项目目录
- `ai-team.config.yaml`, `opencode.jsonc` - 项目配置

### 验证项目

```bash
# 验证 Foundation 自身
./scripts/validate_foundation.sh

# 验证项目配置
./scripts/validate_project_setup.sh /path/to/project

# 或在项目目录中
cd my-project
../scripts/validate_project_setup.sh .
```

**验证内容**:
- 必需目录是否存在
- Agent/Skill/Command 文件是否完整
- Memory 目录是否正确
- GitHub 工作流和模板是否存在
- Foundation lock 文件是否有效

### 规划升级

```bash
# 生成升级计划 (只读，不修改文件)
./scripts/plan_upgrade.sh /path/to/project
```

**输出**:
- 缺失文件列表
- 过期文件列表
- 受保护文件列表
- 风险评估
- 升级计划报告 (`.foundation/upgrade-plan.md`)

### 执行升级

```bash
# 执行升级
./scripts/upgrade_foundation.sh /path/to/project

# 预览变更 (不实际执行)
./scripts/upgrade_foundation.sh --dry-run /path/to/project

# 强制升级 (跳过确认)
./scripts/upgrade_foundation.sh --force /path/to/project
```

**升级行为**:
- 自动添加缺失文件 (Class A)
- 生成变更 diff 供审查 (Class B)
- 跳过受保护文件 (Class C)
- 创建备份
- 更新 `.foundation/` 元数据

### 对比差异

```bash
# 对比 Foundation 和项目的所有关键文件
./scripts/diff_foundation_vs_project.sh /path/to/project

# 对比特定文件
./scripts/diff_foundation_vs_project.sh /path/to/project .ai-team/agents/planner.md
```

### 文件分类

| 类别 | 说明 | 升级行为 |
|------|------|---------|
| **Class A** | 自动生成 (模板、空目录) | 可自动创建/替换 |
| **Class B** | 需审查 (Agent、Skill、Command) | 生成 diff，人工审查 |
| **Class C** | 受保护 (架构文档、决策记录) | 人工批准，禁止自动修改 |

### Foundation 元数据

每个下游项目都有 `.foundation/` 目录：

```
.foundation/
├── foundation.lock      # 版本锁定
├── upgrade-history.md   # 升级历史
└── local-overrides.md   # 本地自定义记录
```

**foundation.lock**:
```yaml
foundation_repo: ai-team-foundation
foundation_version: 2.0.0
overlay: python-backend
initialized_at: 2026-03-14
last_upgrade_at: 2026-03-20
```

**升级流程**:

```
1. plan_upgrade.sh    → 生成升级计划 (只读)
2. 审查 upgrade-plan.md
3. upgrade_foundation.sh --dry-run  → 预览变更
4. upgrade_foundation.sh            → 执行升级
5. validate_project_setup.sh        → 验证结果
6. 测试项目
7. 提交变更
```

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