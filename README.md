# UmiJS 管理系统模板

一个基于 [UmiJS 4](https://umijs.org/) 构建的现代化 React 管理系统模板，集成了 Ant Design、TypeScript、Tailwind CSS 等主流技术栈，提供完整的权限管理、用户管理、菜单管理等企业级功能。

## ✨ 特性

- 🚀 **基于 UmiJS 4** - 使用最新的 UmiJS 框架，支持微前端、插件化开发
- 🎨 **Ant Design 5** - 集成 Ant Design Pro Components，提供丰富的企业级组件
- 🔐 **权限管理** - 完整的 RBAC 权限控制系统，支持角色、菜单、用户管理
- 📱 **响应式设计** - 支持多端适配，移动端友好
- 🎯 **TypeScript** - 完整的 TypeScript 支持，类型安全
- 🎨 **Tailwind CSS** - 现代化的 CSS 框架，快速构建美观界面
- 🔧 **开发体验** - ESLint + Prettier + Husky，代码质量保障
- 📊 **数据可视化** - 集成 ECharts，支持图表展示
- 🌐 **国际化支持** - 内置多语言支持
- 📱 **PWA 支持** - 支持渐进式 Web 应用

## 🛠️ 技术栈

- **框架**: UmiJS 4 + React 18
- **UI 组件**: Ant Design 5 + Ant Design Pro Components
- **样式**: Tailwind CSS + Less
- **状态管理**: Valtio
- **类型检查**: TypeScript 5
- **构建工具**: UmiJS Max
- **包管理**: pnpm
- **代码规范**: ESLint + Prettier + Husky
- **图标**: IconPark React
- **图表**: ECharts for React

## 📦 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 7

### 安装依赖

```bash
# 克隆项目
npx degit fnpng/umi-template project-name
cd project-name

# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm dev

# 或者使用 start 命令
pnpm start
```

开发服务器将在 [http://localhost:8000](http://localhost:8000) 启动

### 构建生产版本

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

### 代码格式化

```bash
# 格式化代码
pnpm format
```

## 📁 项目结构

```
umi-template/
├── config/                 # UmiJS 配置文件
│   ├── config.ts         # 主配置文件
│   └── proxy.ts          # 代理配置
├── src/
│   ├── api/              # API 接口定义
│   │   ├── auth/         # 认证相关接口
│   │   ├── userController.ts
│   │   ├── roleController.ts
│   │   └── menuController.ts
│   ├── components/       # 公共组件
│   │   ├── ActionsRender/    # 操作渲染组件
│   │   ├── Permission/       # 权限控制组件
│   │   └── CustomUpload/     # 自定义上传组件
│   ├── layouts/          # 布局组件
│   ├── pages/            # 页面组件
│   │   ├── home/         # 首页
│   │   ├── login/        # 登录页
│   │   ├── system/       # 系统管理
│   │   │   ├── user/     # 用户管理
│   │   │   ├── role/     # 角色管理
│   │   │   └── menu/     # 菜单管理
│   │   └── user-center/  # 用户中心
│   ├── routes/           # 路由配置
│   ├── store/            # 状态管理
│   ├── styles/           # 样式文件
│   └── utils/            # 工具函数
├── openapi.config.ts     # OpenAPI 配置
├── tailwind.config.js    # Tailwind CSS 配置
└── package.json
```

## 🔧 配置说明

### UmiJS 配置

主要配置位于 `config/config.ts`，包含：

- Ant Design 配置
- 代理设置
- 布局配置
- 路由配置
- Tailwind CSS 支持

### 代理配置

开发环境代理配置位于 `config/proxy.ts`，支持 API 接口代理。

### Tailwind CSS

项目集成了 Tailwind CSS，配置文件位于 `tailwind.config.js`。

## 🚀 开发指南

### 添加新页面

1. 在 `src/pages` 目录下创建新的页面组件
2. 在 `src/routes` 中添加路由配置
3. 配置菜单和权限（如需要）

### 添加新 API

1. 在 `src/api` 目录下创建接口定义
2. 使用 UmiJS 的 request 插件调用接口

### 权限控制

项目使用基于角色的权限控制系统：

- 在路由中配置 `access` 属性
- 使用 `Permission` 组件控制组件渲染
- 支持菜单级和按钮级权限控制

## 💻 页面功能

### 系统管理

- **用户管理**: 用户增删改查、角色分配
- **角色管理**: 角色权限配置、菜单分配
- **菜单管理**: 动态菜单配置、权限控制

### 用户中心

- 个人信息查看和编辑
- 密码修改
- 个人设置

### 首页

- 数据概览
- 快捷操作
- 系统状态

## 🔍 开发工具配置

### VS Code 推荐配置

1. 安装 ESLint 和 Prettier 扩展
2. 启用 `formatOnSave` 功能
3. 确保所有依赖已安装
4. 检查右下角是否显示 ESLint 和 Prettier 状态

### 代码规范

项目使用 ESLint + Prettier 进行代码规范控制：

- ESLint: 代码质量检查
- Prettier: 代码格式化
- Husky: Git hooks 管理
- lint-staged: 暂存文件检查

**注意**: 这是一个管理系统模板，请根据实际业务需求进行定制和扩展。
