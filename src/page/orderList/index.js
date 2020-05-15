'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let _util = require('util/util.js');
let _order = require('service/order-service.js');
let navSide = require('page/common/nav-side/index.js');
let templateIndex = require('./index.string');
let Pagination = require('util/pagination/index.js');

//page逻辑部分
let page = {
  data: {
    listParam: {
      pageNum: 1,
      pageSize: 10
    }
  },
  init: function() {
    this.onLoad();
  },
  onLoad: function() {
    //初始化左侧菜单
    navSide.init({
      name: 'orderList'
    });
    this.loadOrderList();
  },
  //加载订单列表
  loadOrderList: function() {
    let _this = this,
      orderListHtml = '',
      $listCon = $('.order-list-con');
    $listCon.html('<div class="loading"></div>');
    _order.getOrderList(this.data.listParam, function(res) {
      // 渲染html 
      orderListHtml = _util.renderHtml(templateIndex, res);
      $listCon.html(orderListHtml);
      _this.loadPagination({
        hasPreviousPage: res.hasPreviousPage,
        prePage: res.prePage,
        hasNextPage: res.hasNextPage,
        nextPage: res.nextPage,
        pageNum: res.pageNum,
        pages: res.pages
      });
    }, function(errMsg) {
      $listCon.html('<p class="err-tip">加载订单列表失败，请刷新</p>');
    });
  },
  //加载分页信息
  loadPagination: function(pageInfo) {
    let _this = this;
    this.pagination ? '' : (this.pagination = new Pagination());
    this.pagination.render($.extend({}, pageInfo, {
      container: $('.pagination'),
      onSelectPage: function(pageNum) {
        _this.data.listParam.pageNum = pageNum;
        _this.loadOrderList();
      }
    }));
  }
};
$(function() {
  page.init();
});
