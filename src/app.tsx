import routes, { IBestAFSRoute } from '@/routes';
import useSettings from '@/utils/useSettings';
import { StyleProvider, px2remTransformer } from '@ant-design/cssinjs';
import { LoadingFour } from '@icon-park/react';
import '@icon-park/react/styles/index.css';
import { AxiosResponse, RequestConfig } from '@umijs/max';
import { App, ConfigProvider, Spin } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import NProgress from 'nprogress';
import { ActionsRender } from './components/ActionsRender';
import AntdFeedback, { Message } from './components/AntdFeedback';
import { AvatarProps } from './components/AvatarProps';
import { userStore } from './store';
import './styles/global.less';

Spin.setDefaultIndicator(<LoadingFour style={{ fontSize: 24 }} spin />);
NProgress.configure({
  showSpinner: false,
});

export const layout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const settings = useSettings();
  const fullScreen =
    settings.hideNavbar || settings.hideMenu || settings.hideInBreadcrumb;
  const menuRenderSettings = settings.hideMenu ? { menuRender: false } : {};
  const element = document.querySelector('#nprogress .bar') as HTMLElement;
  element?.style.setProperty('background-color', settings.themeColor as string);

  return {
    logo: '/favicon.svg',
    title: settings.title,
    menu: {
      locale: false,
      request: async () => {
        function renameChildMenuListToRoutes(
          tree: IBestAFSRoute[],
        ): IBestAFSRoute[] {
          return tree.map((node, index) => {
            const newNode = {
              ...node,
              path: node?.path as string,
              iconName: node.icon,
              icon: node.icon ? (
                <div
                  className={
                    node.path.split('/')?.length >= 3
                      ? 'w-6 h-6 space_center rounded'
                      : ''
                  }
                >
                  {node.icon}
                </div>
              ) : undefined,
              routes: node.routes
                ? renameChildMenuListToRoutes(node.routes)
                : undefined,
            };
            return newNode;
          });
        }
        return renameChildMenuListToRoutes(routes);
      },
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
        colorMenuBackground: `linear-gradient(to bottom, #fff, #fff, #fff, ${settings?.themeColor}10)`,
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
  const containerBg = '#f3f4f6';

  const themeStyle = {
    colorBgContainer: containerBg,
    colorBorder: containerBg,
  };
  return (
    <ConfigProvider
      locale={zh_CN}
      theme={{
        token: {
          colorPrimary: userStore.userSettings?.themeColor,
          colorLink: userStore.userSettings?.themeColor,
        },
        components: {
          Segmented: {
            itemSelectedColor: userStore.userSettings?.themeColor,
          },
          Button: themeStyle,
          DatePicker: themeStyle,
          Input: themeStyle,
          Select: themeStyle,
          InputNumber: themeStyle,
          Mentions: themeStyle,
          ColorPicker: themeStyle,
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
