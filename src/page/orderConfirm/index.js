'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
let _util = require('util/util.js');
let _order = require('service/order-service.js');
let _address = require('service/address-service.js');
let addressModel = require('./address-model.js');
let templateProduct = require('./product-list.string');
let templateAddress = require('./address-list.string');

let page = {
  data: {
    selectedAddressId: null
  },
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    this.loadAddressList();
    this.loadProductList();
  },
  bindEvent: function() {
    let _this = this;
    // 地址的选择
    $(document).on('click', '.address-item', function() {
      let $this = $(this);
      $this.addClass('active').siblings('.address-item').removeClass('active');
      _this.data.selectedAddressId = $this.data('id');
    });
    //地址添加
    $(document).on('click', '.address-add', function() {
      addressModel.show({
        isUpdate: false,
        onSuccess: function() {
          _this.loadAddressList();
        }
      });
    });
    //地址编辑
    $(document).on('click', '.address-update', function(e) {
      e.stopPropagation();
      let shippingId = $(this).parents('.address-item').data('id');
      _address.getAddress(shippingId, function(res) {
        addressModel.show({
          isUpdate: true,
          data: res,
          onSuccess: function() {
            _this.loadAddressList();
          }
        });
      }, function(errMsg) {
        _util.errorTips(errMsg);
      });
    });
    //地址删除
    $(document).on('click', '.address-delete', function(e) {
      e.stopPropagation();
      let shippingId = $(this).parents('.address-item').data('id');
      if (window.confirm('你确认要删除该地址吗？')) {
        _address.deleteAddress(shippingId, function(res) {
          _this.loadAddressList();
        }, function(errMsg) {
          _util.errorTips(errMsg);
        });
      }
    });
    //订单的提交
    $(document).on('click', '.order-submit', function() {
      let shippingId = _this.data.selectedAddressId;
      if (shippingId) {
        _order.createOrder({
          shippingId: shippingId
        }, function(res) {
          window.location.href = './payment.html?orderNo=' + res.orderNo;
        }, function(errMsg) {
          _util.errorTips(errMsg);
        });
      } else {
        _util.errorTips('选择地址后再提交');
      }
    });
  },
  // 加载地址列表
  loadAddressList: function() {
    let _this = this;
    $('.product-con').html('<div class="loading"></div>');
    _address.getAddressList(function(res) {
      _this.addressFilter(res);
      let addressHtml = _util.renderHtml(templateAddress, res);
      $('.address-con').html(addressHtml);
    }, function(errMsg) {
      $('.address-con').html('<p class="err-tip">地址加载失败，请刷新重试</p>')
    });
  },
  // 加载商品列表
  loadProductList: function() {
    let _this = this;
    $('.product-con').html('<div class="loading"></div>');
    _order.getProductList(function(res) {
      let productHtml = _util.renderHtml(templateProduct, res);
      $('.product-con').html(productHtml);
    }, function(errMsg) {
      $('.product-con').html('<p class="err-tip">商品加载失败，请刷新重试</p>')
    });
  },
  // 处理地址列表中的选中状态
  addressFilter: function(data) {
    if (this.data.selectedAddressId) {
      let selectedAddressIdFlag = false;
      for (let i = 0, length = data.list.length; i < length; i++) {
        if (data.list[i].id === this.data.selectedAddressId) {
          data.list[i].isActive = true;
          selectedAddressIdFlag = true;
        }
      }
      if (!selectedAddressIdFlag) {
        this.data.selectedAddressId = null;
      }
    }

  }

};
$(function() {
  page.init();
});
