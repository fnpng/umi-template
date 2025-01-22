import {
  Analysis,
  DatabaseSetting,
  SalesReport,
  Workbench,
} from '@icon-park/react';
import React from 'react';
import { IBestAFSRoute } from './index';

export default [
  {
    name: '数据分析',
    path: '/data-analysis',
    icon: (<SalesReport />) as React.ReactNode,
    routes: [
      { path: '/data-analysis', redirect: '/data-analysis/workbench' },
      {
        path: '/data-analysis/workbench',
        name: '工作台',
        icon: <Workbench />,
        component: '@/pages/data-analysis/workbench/index',
      },
      {
        path: '/data-analysis/data-preparation',
        name: '数据准备',
        icon: <DatabaseSetting />,
        component: '@/pages/data-analysis/data-preparation/index',
      },
      {
        path: '/data-analysis/large-screen',
        name: '数据大屏',
        icon: <Analysis />,
        component: '@/pages/data-analysis/large-screen/index',
      },
      {
        path: '/data-analysis/page-build',
        component: '@/pages/data-analysis/page-build/index',
        headerRender: false,
        menuRender: false,
        breadcrumb: false,
        footerRender: false,
      },
    ],
  },
] as IBestAFSRoute[];
