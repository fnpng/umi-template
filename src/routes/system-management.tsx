import { Log, SettingTwo, User } from '@icon-park/react';
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
        icon: <User />,
        component: '@/pages/system/user-management',
      },
      {
        path: '/system/log',
        name: '系统日志',
        icon: <Log />,
      },
    ],
  },
] as IBestAFSRoute[];
