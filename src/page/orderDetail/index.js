'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let _util = require('util/util.js');
let _order = require('service/order-service.js');
let navSide = require('page/common/nav-side/index.js');
let templateIndex = require('./index.string');

//page逻辑部分
let page = {
  data: {
    orderNo: _util.getUrlParam('orderNo')
  },
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    //初始化左侧菜单
    navSide.init({
      name: 'order-list'
    });
    this.loadOrderDetail();
  },
  bindEvent: function() {
    let _this = this;
    $(document).on('click', '.order-cancel', function() {
      if (window.confirm('确认要取消该订单吗？')) {
        _order.cancelOrder(_this.data.orderNo, function(res) {
          _util.successTips('该订单取消成功');
          _this.loadOrderDetail();
        }, function(errMsg) {
          _util.errorTips(errMsg);
        });
      }
    });
  },
  //加载订单详情
  loadOrderDetail: function() {
    let _this = this,
      orderListHtml = '',
      $content = $('.content');
    $content.html('<div class="loading"></div>');
    _order.getOrderDetail(this.data.orderNo, function(res) {
      _this.dataFilter(res);
      // 渲染html 
      let orderDetailHtml = _util.renderHtml(templateIndex, res);
      $content.html(orderDetailHtml);
    }, function(errMsg) {
      $content.html('<p class="err-tip">' + errMsg + '</p>');
    });
  },
  // 数据的适配
  dataFilter: function(data) {
    data.needPay = data.status == 10;
    data.isCancelable = data.status == 10;
  }
};
$(function() {
  page.init();
});
