'use strict';

require('../common/header/index.js');
require('../common/search/index.js');
require('./cart.css');
let _util = require('util/util.js');
let _cart = require('service/cart-service.js');
let templateIndex = require('./cart.string');

let page = {
  data: {
    
  },
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    this.loadCart();
  },
  bindEvent: function() {
    let _this = this;
    //商品的选择 / 取消选择
    $(document).on('click', '.cart-select', function() {
      let $this = $(this);
    });
  },
  //加载购物车信息
  loadCart: function() {
    let _this = this;
    //获取购物车列表
    _cart.getCartList(function(res) {
      _this.renderCart(res);
    }, function(errMsg) {
      $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新试试吧</p>')
    })
    // $pageWrap.html('<div class="loading"></div>')
  },
  //渲染购物车
  renderCart: function(data) {
    this.fliter(data);
    console.log(data);
    // 缓存购物车信息
    this.data.cartInfo = data;
    // 生成html
    let carthtml = _util.renderHtml(templateIndex, data);
    $('.page-wrap').html(carthtml);
  },
  //数据匹配
  fliter: function(data) {
    data.notEmpty = !!data.cartProductVoList.length;
  }
};

$(function() {
  page.init();
})