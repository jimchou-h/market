'use strict';

require('../common/header/index.js');
require('../common/search/index.js');
require('./index.css')
let navSide = require('../common/nav-side/index.js');
let _util = require('util/util.js');
let _user = require('service/user-service.js')
let templateIndex = require('./index.string');

let page = {
  init: function() {
    this.onLoad();
  },
  onLoad: function() {
    // 初始化左侧菜单
    navSide.init('userCenter');
    // 加载用户信息
    this.loadUserInfo();
  },
  //加载用户信息
  loadUserInfo: function() {
    let userHtml = '';
    _user.getUserInfo(function(res) {
      //使用hogan.js进行模板渲染并注入
      userHtml = _util.renderHtml(templateIndex, res);
      $('.panel-body').html(userHtml)
    }, function(errMsg) {
      _util.errorTips(errMsg);
    })
  }
}

$(function() {
  page.init();
})