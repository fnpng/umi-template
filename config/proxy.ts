export default {
  '/api': {
    target: process.env.API_PROXY_URL,
    changeOrigin: true,
  },
};
