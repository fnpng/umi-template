import routes from '@/routes';
import getSettings from '@/utils/getSettings';
import { StyleProvider, px2remTransformer } from '@ant-design/cssinjs';
import { LoadingFour } from '@icon-park/react';
import '@icon-park/react/styles/index.css';
import { AxiosResponse, RequestConfig } from '@umijs/max';
import { App, ConfigProvider, Spin } from 'antd';
import NProgress from 'nprogress';
import { ActionsRender } from './components/ActionsRender';
import AntdFeedback, { Message } from './components/AntdFeedback';
import { AvatarProps } from './components/AvatarProps';
import { userStore } from './store';
import './styles/global.less';

Spin.setDefaultIndicator(<LoadingFour style={{ fontSize: 24 }} spin />);
NProgress.configure({ showSpinner: false });

export const layout = () => {
  const settings = getSettings();
  const fullScreen =
    settings.hideNavbar || settings.hideMenu || settings.hideInBreadcrumb;
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
        colorBgMenuItemSelected: `${settings?.themeColor}10`,
      },
      sider: {
        colorMenuBackground:
          'linear-gradient(to bottom, #fff, #fff, #fff, #eef2ff)',
        colorMenuItemDivider: '#dfdfdf',
        colorTextMenu: '#595959',
        colorTextMenuSelected: settings?.themeColor,
        colorBgMenuItemSelected: `${settings?.themeColor}10`,
      },
    },
    route: {
      path: '/',
      routes,
    },
    actionsRender: ActionsRender,
    avatarProps: AvatarProps(),
  };
};

export function rootContainer(container: React.ReactNode) {
  const px2rem = px2remTransformer({
    rootValue: 14, // 32px = 1rem; @default 16
  });
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: userStore.userSettings?.themeColor,
          colorLink: userStore.userSettings?.themeColor,
        },
        components: {
          Segmented: {
            itemSelectedColor: userStore.userSettings?.themeColor,
          },
        },
      }}
    >
      <StyleProvider transformers={[px2rem]}>
        <App message={{ maxCount: 3 }}>
          <AntdFeedback />
          {container}
        </App>
      </StyleProvider>
    </ConfigProvider>
  );
}

export function onRouteChange() {
  NProgress.start();
  NProgress.done();
}

export const request: RequestConfig = {
  timeout: 30000,
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [
    (url: string, options: Record<string, unknown>) => {
      const token = window.localStorage.getItem('token');
      if (token) {
        (options.headers as Record<string, string>)['token'] = token;
      } else {
        const filterPath = ['/login'];
        if (!filterPath.includes(window.location.pathname)) {
          setTimeout(() => {
            // window.location.pathname = '/login';
          }, 100);
          // Message.warning('登录过期，请重新登录');
        }
      }
      return { url, options };
    },
  ],
  responseInterceptors: [
    (response) => {
      const { data = {} } = response as AxiosResponse<Record<string, unknown>>;
      if (data?.code === 200) {
        return response;
      } else {
        const { code, message } = data;
        switch (code) {
          case 1001:
            return response;
          case 1003:
          case 1005:
            setTimeout(() => {
              // window.location.pathname = '/login';
              // Message.warning('登录过期，请重新登录');
            }, 100);
            return response;
          default:
            if (message) {
              Message.error({
                content: JSON.stringify(message || data?.data),
              });
            }
            return response;
        }
      }
    },
  ],
};
