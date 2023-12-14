import '@/mock';
import routes from '@/routes';
import settings from '@/settings.json';
import getSettings from '@/utils/getSettings';
import { getAvatarProps } from '@/utils/getUserInfo';
import { LoadingFour } from '@icon-park/react';
import '@icon-park/react/styles/index.css';
import { App, ConfigProvider, Spin } from 'antd';
import NProgress from 'nprogress';
import React from 'react';
import AntdFeedback from './components/AntdFeedback';
import './styles/global.less';

Spin.setDefaultIndicator(<LoadingFour style={{ fontSize: 24 }} spin />);
NProgress.configure({ showSpinner: false });

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化,支持 ProLayout 入参: https://procomponents.ant.design/components/layout
export const layout = () => {
  const settings = getSettings();
  const avatarProps = getAvatarProps();
  const fullScreen = settings.hideNavbar && settings.hideMenu;
  const menuRenderSettings = settings.hideMenu ? { menuRender: false } : {};

  return {
    logo: '/favicon.svg',
    title: settings.title,
    menu: {
      locale: false,
    },
    layout: 'mix',
    splitMenus: true,
    ...menuRenderSettings,
    fixSiderbar: !settings.hideNavbar,
    siderWidth: settings.siderWidth,
    headerRender: !settings.hideNavbar,
    contentStyle: {
      height: settings.hideNavbar ? '100vh' : 'calc(100vh - 56px)',
    },
    token: {
      bgLayout: 'rgba(242,243,245,1)',
      pageContainer: {
        paddingBlockPageContainerContent: fullScreen ? 0 : 16,
        paddingInlinePageContainerContent: fullScreen ? 0 : 24,
      },
      header: {
        colorBgHeader: '#fff',
        colorMenuBackground: '#fff',
        colorMenuItemDivider: '#dfdfdf',
        colorTextMenu: '#595959',
        colorTextMenuSelected: settings?.themeColor,
      },
      sider: {
        colorMenuBackground: '#fff',
        colorMenuItemDivider: '#dfdfdf',
        colorTextMenu: '#595959',
        colorTextMenuSelected: settings?.themeColor,
        colorBgMenuItemSelected: '#f0f4ff',
      },
    },
    route: {
      path: '/',
      routes,
    },
    avatarProps,
  };
};

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: settings.themeColor,
        },
        components: {
          Segmented: {
            itemSelectedColor: settings?.themeColor,
          },
        },
      }}
    >
      <App message={{ maxCount: 3 }}>
        <AntdFeedback />
        {container}
      </App>
    </ConfigProvider>
  );
}

export function onRouteChange() {
  NProgress.start();
  NProgress.done();
}
