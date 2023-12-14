import { defineConfig } from '@umijs/max';
import routes from '../src/routes';
import proxy from './proxy';

export default defineConfig({
  antd: {},
  define: {
    'process.env.UMI_ENV': 'dev',
    'process.env.API_PROXY_URL': 'http://localhost',
  },
  proxy,
  layout: {},
  routes,
  npmClient: 'pnpm',
  tailwindcss: {},
  esbuildMinifyIIFE: true,
});
