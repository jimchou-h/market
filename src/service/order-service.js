'use strict';

var _util = require('util/util.js');
var _order = {
    //获取产品列表信息
    getProductList: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/api/order/get_order_cart_product.do'),
            success: resolve,
            error: reject,
        });
    },
    // 提交订单
    createOrder: function(orderInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/api/order/create.do'),
            data: orderInfo,
            success: resolve,
            error: reject,
        });
    },
    //获取订单列表
    getOrderList: function(listParam, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/api/order/list.do'),
            data: listParam,
            success: resolve,
            error: reject,
        });
    },
    //获取订单详情
    getOrderDetail: function(orderNo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/api/order/detail.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject,
        });
    },
    cancelOrder: function(orderNo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/api/order/cancel.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject,
        });
    }
};
module.exports = _order;
