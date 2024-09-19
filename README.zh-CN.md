# 帮助中心

这是一个使用 Turbo 进行多项目管理的帮助中心应用，包括 Strapi 后端 API、Next.js 前端，以及 shadcn/ui 作为前端 UI 库。

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
   - 只运行 Web 前端：
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
  - `web/`: Next.js 前端
- `packages/`: 共享包（如果有的话）

## 技术栈

- Turbo: 用于多项目管理
- Strapi: 后端 API
- Next.js: 前端框架
- shadcn/ui: 前端 UI 库
- pnpm: 包管理器

## 致谢

- [shadcnui-boilerplate](https://github.com/TinsFox/shadcnui-boilerplate): 一个使用 shadcn/ui 构建的样板，用于快速开发现代 Web 应用程序。

## 许可证

[在此添加你的许可证信息]
