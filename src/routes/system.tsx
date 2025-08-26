import {
  ApplicationMenu,
  ListView,
  Peoples,
  SettingTwo,
} from '@icon-park/react';
import React from 'react';
import { IBestAFSRoute } from './index';

export default [
  {
    name: '系统管理',
    path: '/system',
    icon: (<SettingTwo />) as React.ReactNode,
    routes: [
      { path: '/system', redirect: '/system/user' },
      {
        path: '/system/user',
        name: '用户管理',
        icon: <Peoples />,
        component: '@/pages/system/user',
      },
      {
        path: '/system/menu',
        name: '菜单管理',
        icon: <ApplicationMenu />,
        component: '@/pages/system/menu',
      },
      {
        path: '/system/form-style',
        name: '表单样式',
        icon: <ListView />,
        component: '@/pages/system/form-style',
      },
    ],
  },
] as IBestAFSRoute[];
