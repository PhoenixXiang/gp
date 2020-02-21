
// 自定义配置
module.exports = {
  // 打包路径修改
  publicPath: './',
  assetsDir: 'static',
  // 接口代理
  devServer: {
    https: false,
    proxy: {
      // 系统接口
      '/api': {
        target: 'http://127.0.0.1:8081', // 代理接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''// 代理的路径
        }
      }
    }
  }
}
