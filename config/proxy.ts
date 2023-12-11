export default {
  '/aircodeapi': {
    target: 'https://3hy12t94kb.hk.aircode.run',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/aircodeapi/, ''),
  },
  '/api': {
    target: process.env.API_PROXY_URL,
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/ms/, '/ms'),
  },
};
