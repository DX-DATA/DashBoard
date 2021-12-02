module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.21:3333/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
      '/socket': {
        target: 'http://192.168.0.21:3333/',
        changeOrigin: true,
        pathRewrite: { '^/socket': '' },
        ws: false,
      },
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
};
