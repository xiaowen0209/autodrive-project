# CLAUDE.md — 智能驾驶研究网站

## 项目概述
个人智能驾驶研究专用AI Agent网站，12品牌(华为/特斯拉/小鹏/理想/蔚来/小米/比亚迪/极越/智己/地平线/文远知行/百度)的方案对比、术语百科、OTA追踪、法规标准参考。

## 技术栈
- Next.js 16 (App Router) + React 19 + TypeScript 5
- shadcn/ui + Tailwind CSS 4
- Supabase (PostgreSQL + RLS)
- recharts (数据可视化)
- coze-coding-dev-sdk (SearchClient/LLMClient/FetchClient)

## 目录结构
```
src/
├── app/                    # 页面路由
│   ├── page.tsx            # 首页动态(双模式:实时/精选)
│   ├── features/           # 功能支持矩阵
│   ├── compare/            # 方案对比
│   ├── versions/           # 版本中心
│   ├── ota/                # OTA更新追踪
│   ├── testing/            # 实测测评
│   ├── terminology/        # 术语百科
│   ├── regulations/        # 法规标准参考
│   ├── visualization/      # 数据可视化
│   ├── crawl/              # 数据采集
│   ├── favorites/          # 我的收藏
│   └── api/
│       ├── news/           # 新闻抓取工作流(crawl/list/schedule)
│       └── crawl/          # 爬虫API(fetch/search/analyze)
├── components/
│   ├── ui/                 # shadcn/ui组件
│   ├── layout.tsx          # 全局布局(服务端)
│   ├── client-shell.tsx    # 客户端壳(侧边栏+顶栏+Toast)
│   ├── brand-logo.tsx      # 统一品牌标识
│   ├── content-protection.tsx  # 反爬虫(禁右键/水印)
│   ├── favorite-button.tsx # 收藏按钮
│   ├── term-tooltip.tsx    # 术语悬浮提示
│   └── toast.tsx           # 全局Toast通知
├── hooks/
│   ├── use-favorites.ts    # 收藏Hook(localStorage持久化)
│   └── use-news.ts         # 新闻数据Hook
├── lib/
│   ├── data.ts             # 核心共享数据(品牌/方案/版本/测试)
│   ├── features-data.ts    # 功能矩阵/OTA/法规/收藏类型
│   ├── terminology.ts      # 术语百科数据(80+术语)
│   ├── utils.ts            # 工具函数(cn)
│   └── wechat-scraper.ts   # 微信文章抓取
├── storage/database/       # Supabase数据库
│   ├── supabase-client.ts  # 客户端初始化
│   └── shared/schema.ts    # Drizzle ORM Schema
├── proxy.ts                # 反爬虫代理(限流/Bot检测/蜜罐)
└── middleware → 不存在(已迁移到proxy.ts)
```

## 开发命令
```bash
pnpm install          # 安装依赖
pnpm dev              # 开发模式(端口5000, HMR)
pnpm build            # 生产构建
pnpm start            # 生产启动
pnpm lint             # ESLint检查
pnpm ts-check         # TypeScript类型检查
```

## 编码规范
- TypeScript strict模式，禁止隐式any
- 组件优先使用shadcn/ui
- 样式用Tailwind CSS，毛玻璃风格(背景#070A14, 主色#7C5CFF, 强调色#69E7FF)
- 卡片: bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-xl
- 主文本: text-[#F7FAFF]，次文本: text-[#9AA7C7]
- 客户端动态内容必须用 'use client' + useEffect + useState
- 禁止在JSX渲染中直接使用 Date.now()/Math.random()/typeof window

## 数据规范
- 传感器数量等数据必须标注来源，仅使用"官方"来源数据
- 不推算、不猜测车型参数
- 功能矩阵状态: ✅已上线/🔜计划中/❌不支持/⚠️部分车型
- 法规标准状态: 现行/征求意见/制定中/已废止

## 关键约束
- 端口必须5000，禁止9000
- 仅使用pnpm，禁止npm/yarn
- 修改代码后依赖HMR，无需重启服务
- .coze文件不要修改(预置配置)
- next.config.ts路径用path.resolve(__dirname, ...)
- 禁止使用head标签，用metadata API

## 反爬虫
- proxy.ts: 60次/分页面限流, 20次/分API限流, 30+ Bot UA黑名单
- robots.txt: 禁止/api/、/crawl、/favorites
- ContentProtection: 禁右键/禁选择/禁F12/水印
