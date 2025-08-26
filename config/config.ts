import { defineConfig } from '@umijs/max';
import { routes } from '../src/routes';
import proxy from './proxy';

export default defineConfig({
  antd: {},
  proxy,
  layout: {},
  routes,
  define: {},
  npmClient: 'pnpm',
  request: {},
  valtio: {},
  tailwindcss: {},
  esbuildMinifyIIFE: true,
  hash: true,
});
