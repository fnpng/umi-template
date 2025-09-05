import routes, { IBestAFSRoute } from '@/routes';
import useSettings from '@/utils/useSettings';
import { AxiosResponse, RequestConfig } from '@umijs/max';
import { App, Spin } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import NProgress from 'nprogress';
import { IconContext } from 'react-icons';
import { BiLoaderAlt } from 'react-icons/bi';
import { ActionsRender } from './components/ActionsRender';
import AntdFeedback, { Message } from './components/AntdFeedback';
import { AvatarProps } from './components/AvatarProps';
import CustomConfigProvider from './CustomConfigProvider';
import { userStore } from './store';
import './styles/global.less';

// 设置 dayjs 默认语言为中文
dayjs.locale('zh-cn');

Spin.setDefaultIndicator(
  <BiLoaderAlt style={{ fontSize: 24 }} className="animate-spin " />,
);
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
        function renameMenuListToRoutes(
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
                      ? 'w-6 h-6 space_center rounded bg-slate-100'
                      : ''
                  }
                >
                  {node.icon}
                </div>
              ) : undefined,
              routes: node.routes
                ? renameMenuListToRoutes(node.routes)
                : undefined,
            };
            return newNode;
          });
        }
        return renameMenuListToRoutes(routes);
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
  const themeColor = userStore.userSettings?.themeColor;
  // 在 JavaScript 中设置 CSS 变量
  document.documentElement.style.setProperty(
    '--theme-color',
    `${themeColor}40` || '#ffffff',
  );

  return (
    <CustomConfigProvider>
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <App message={{ maxCount: 3 }}>
          <AntdFeedback />
          {container}
        </App>
      </IconContext.Provider>
    </CustomConfigProvider>
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
