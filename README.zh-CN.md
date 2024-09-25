# 帮助中心

⚠️ **警告：本项目目前正在开发中，尚未准备好用于生产环境。使用风险自负。**

这是一个使用 Turbo 进行多项目管理的帮助中心应用，包括 Strapi 后端 API 和一个使用 React、shadcn/ui 和 Vite 的前端。

## 开始使用

确保你已经安装了 Node.js（版本 >= 14.0.0）和 pnpm（版本 8.15.4）。

1. 克隆仓库：
   ```
   git clone git@github.com:lynzz/help-center.git
   cd help-center
   ```

2. 安装依赖：
   ```
   pnpm install
   ```

3. 运行开发服务器：
   - 运行所有项目：
     ```
     pnpm run dev
     ```
   - 只运行 API：
     ```
     pnpm run dev:api
     ```
   - 只运行 Web 前端（将在 3003 端口运行）：
     ```
     pnpm run dev:web
     ```

4. 构建项目：
   ```
   pnpm run build
   ```

5. 运行 lint 检查：
   ```
   pnpm run lint
   ```

## 项目结构

- `apps/`: 包含所有应用
  - `api/`: Strapi 后端 API
  - `web/`: 使用 Vite 的 React 前端
- `packages/`: 共享包（如果有的话）

## 技术栈

- Turbo: 用于多项目管理
- Strapi: 后端 API
- React: 前端库
- Next.js: Web 前端的 React 框架
- shadcn/ui: 前端 UI 组件
- Vite: 用于非 Next.js 部分的前端构建工具和开发服务器
- pnpm: 包管理器

## 致谢

- [next-shadcn-dashboard-starter](https://github.com/Kiranism/next-shadcn-dashboard-starter): 使用 Nextjs14 和 shadcn ui 构建的管理仪表板启动器。

## 许可证

[在此添加你的许可证信息]
