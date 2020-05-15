const path = require('path');
var webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin'); //引入CleanWebpackPlugin新写法
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //css分离
var HtmlWebpackPlugin = require('html-webpack-plugin');

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title) {
  return {
    template: './src/view/' + name + '.html',
    filename: name + '.html',
    title: title,
    inject: true,
    hash: true,
    chunks: ['common', 'vender', name],
  }
};

//webpack config
var config = {
  //入口
  entry: {
    'common': ['./src/page/common/index.js'],
    'login': ['./src/page/login/index.js'],
    'register': ['./src/page/register/index.js'],
    'pwdForget': ['./src/page/pwdForget/index.js'],
    'index': ['./src/page/index/index.js'],
    'list': ['./src/page/list/index.js'],
    'cart': ['./src/page/cart/index.js'],
    'detail': ['./src/page/detail/index.js'],
    'payment': ['./src/page/payment/index.js'],
    'about': ['./src/page/about/index.js'],
    'orderConfirm': ['./src/page/orderConfirm/index.js'],
    'orderList': ['./src/page/orderList/index.js'],
    'orderDetail': ['./src/page/orderDetail/index.js'],
    'userCenter': ['./src/page/userCenter/index.js'],
    'userCenterUpdate': ['./src/page/userCenterUpdate/index.js'],
    'userPwdUpdate': ['./src/page/userPwdUpdate/index.js'],
    'result': ['./src/page/result/index.js']
  },
  //出口
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  //建立索引
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    // new CleanWebpackPlugin(), //清除dist文件夾下无关联的文件
    // css分离
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    }),
    new OptimizeCSSAssetsPlugin({}),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
    new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
    new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
    new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('register', '用户注册')),
    new HtmlWebpackPlugin(getHtmlConfig('pwdForget', '找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('payment', '支付')),
    new HtmlWebpackPlugin(getHtmlConfig('userCenter', '用户中心')),
    new HtmlWebpackPlugin(getHtmlConfig('userCenterUpdate', '修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('userPwdUpdate', '修改密码')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    new HtmlWebpackPlugin(getHtmlConfig('orderDetail', '订单详情')),
    new HtmlWebpackPlugin(getHtmlConfig('orderConfirm', '订单确认页')),
    new HtmlWebpackPlugin(getHtmlConfig('orderList', '订单列表')),
    new HtmlWebpackPlugin(getHtmlConfig('about', '关于'))
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          // css分离
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'production',
            },
          },
          // 'style-loader',
          'css-loader',
          "postcss-loader"
        ]
      },
      //图像的处理
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: 'resource/[name]-[hash].[ext]',
          },
        }, ],
      },
      //字体的处理
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'iconfont/[name]-[hash].[ext]',
          },
        }, ]
      },
      //模板的解析
      {
        test: /\.string$/,
        loader: 'html-loader',
      }
    ]
  },
  //配置别名
  resolve: {
    alias: {
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + '/src/image',
      common: __dirname + '/src/common',
      node_modules: __dirname + '/node_modules',
    }
  },
  //独立通用模块到vender.js
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      name: 'vender',
    }
  }
};

module.exports = config;
