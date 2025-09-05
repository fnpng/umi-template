import React from 'react';
import {
  BsFillGrid3X3GapFill,
  BsFillPeopleFill,
  BsFillXDiamondFill,
} from 'react-icons/bs';
import { FcServices } from 'react-icons/fc';
import { IBestAFSRoute } from './index';

export default [
  {
    name: '系统管理',
    path: '/system',
    icon: (<FcServices size={20} />) as React.ReactNode,
    routes: [
      { path: '/system', redirect: '/system/user' },
      {
        path: '/system/user',
        name: '用户管理',
        icon: <BsFillPeopleFill />,
        component: '@/pages/system/user',
      },
      {
        path: '/system/menu',
        name: '菜单管理',
        icon: <BsFillGrid3X3GapFill />,
        component: '@/pages/system/menu',
      },
      {
        path: '/system/form-style',
        name: '表单样式',
        icon: <BsFillXDiamondFill />,
        component: '@/pages/system/form-style',
      },
    ],
  },
] as IBestAFSRoute[];
