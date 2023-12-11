import { defineConfig } from '@umijs/max';
import routes from '../src/routes';
import settings from '../src/settings.json';
import proxy from './proxy';

export default defineConfig({
  antd: {
    theme: {
      token: {
        colorPrimary: settings.themeColor,
      },
    },
    appConfig: {
      message: {
        maxCount: 3,
      },
    },
  },
  define: {
    'process.env.UMI_ENV': 'dev',
    'process.env.API_PROXY_URL': 'http://localhost',
  },
  proxy,
  model: {},
  initialState: {},
  // request: {},
  layout: {},
  routes,
  npmClient: 'pnpm',
  tailwindcss: {},
  theme: { '@primary-color': '#1DA57A' },
});
