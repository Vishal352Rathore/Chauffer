const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://chauffer-admin-staging-5rb3b.ondigitalocean.app',
      changeOrigin: true,
    })
  );
};
