const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const path = require('path');

const devConfig = {
  mode: 'development',
  //服务器配置
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, "dist/view"),
    hot: true,
    inline: true,
    proxy: {}
  }
}

module.exports = merge(config, devConfig)
