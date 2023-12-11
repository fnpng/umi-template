import { Home } from '@icon-park/react';
import React from 'react';
import systemManagement from './system-management';

export const routes: IBestAFSRoute[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: '@/pages/login',
    layout: false,
  },
  {
    name: '首页',
    path: '/home',
    component: './homepage',
    icon: <Home />,
  },
  ...systemManagement,
  { path: '/*', component: '@/pages/404' },
];

export type IBestAFSRoute = {
  path: string;
  component?: string;
  name?: string; // 菜单名称
  icon?: string | React.ReactNode;
  redirect?: string;
  routes?: IBestAFSRoute[];
  layout?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top'; // 新页面打开
  headerRender?: boolean | (() => React.ReactNode); // 不展示顶栏
  footerRender?: boolean | (() => React.ReactNode); // 不展示页脚
  // 不展示菜单
  menuRender?:
    | boolean
    | ((props: { collapsed?: boolean }) => React.ReactNode | boolean);
  // 不展示菜单顶栏
  menuHeaderRender?:
    | boolean
    | ((props: { collapsed?: boolean }) => React.ReactNode | boolean);
  // 权限配置，需要与 plugin-access 插件配合使用
  access?:
    | 'canRead'
    | 'canUpdate'
    | 'canDelete'
    | 'canCreate'
    | string
    | string[];
  // 隐藏子菜单
  hideChildrenInMenu?: boolean;
  // 隐藏自己和子菜单
  hideInMenu?: boolean;
  // 在面包屑中隐藏
  hideInBreadcrumb?: boolean;
  // 子项往上提，仍旧展示,
  flatMenu?: boolean;
};

export default routes;
