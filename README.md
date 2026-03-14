# 消消乐 - Match-3 Puzzle Game

网页版消消乐游戏 - 使用 React + TypeScript + Vite 构建

## 游戏特性

- 8x8 游戏棋盘
- 6种不同颜色的宝石
- 点击交换相邻宝石
- 三消及以上消除
- 连锁消除和动画效果
- 分数系统和关卡目标

## 技术栈

- **React 18** - UI框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Vitest** - 测试框架

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 运行测试
npm test

# 类型检查
npm run typecheck

# 代码检查
npm run lint
```

## 项目结构

```
src/
├── components/      # React组件
│   ├── Gem.tsx      # 宝石组件
│   ├── GameBoard.tsx # 游戏棋盘
│   └── GameInfo.tsx # 游戏信息显示
├── game/            # 游戏核心逻辑
│   ├── board.ts     # 棋盘操作
│   ├── match.ts     # 匹配检测
│   └── fall.ts      # 下落逻辑
├── hooks/           # React Hooks
│   └── useGameState.ts # 游戏状态管理
├── styles/          # 样式文件
├── types/           # TypeScript类型定义
└── test/            # 测试配置
```

## AI Team

本项目使用 AI Team 进行开发迭代。

### 可用命令

| 命令 | 作用 |
|------|------|
| `/design` | 分析需求并设计方案 |
| `/implement` | 实现设计好的方案 |
| `/test` | 验证和测试实现 |
| `/review` | 代码质量审查 |
| `/triage` | 问题分类和调试 |
| `/ci-analyze` | CI失败分析 |

### 记忆系统

- **全局记忆**: `docs/`, `AGENTS.md`
- **角色记忆**: `.ai-team/memory/`
- **任务记忆**: `tasks/`

## 游戏玩法

1. 点击一个宝石选中它
2. 点击相邻的宝石进行交换
3. 三个或更多相同颜色的宝石连成一线即可消除
4. 消除后上方的宝石会下落，空位会被新宝石填充
5. 达到目标分数即可过关

## License

MIT