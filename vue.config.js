const path = require('path');

function resolve(dir) {
  return path.join(__dirname, './', dir);
}

module.exports = {
  publicPath: '/Login-page/',
  chainWebpack: (config) => {
    // 先刪除預設的svg配置
    config.module.rule('svg').exclude.add(resolve('src/assets/icon')).end();

    // 新增 svg-sprite-loader 設定
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: '[name]' });
  },
};
