import { defineConfig } from '@umijs/max';
import { routes } from '../src/routes';
import proxy from './proxy';

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

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
  chainWebpack(config) {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin);
  },
});
