const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const path = require('path');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const prodConfig = {
  mode: 'production',
  // 代码压缩
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
}

module.exports = merge(config, prodConfig)
