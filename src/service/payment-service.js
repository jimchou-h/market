'use strict';

var _util = require('util/util.js');
var _payment = {
    //获取支付信息
    getPaymentInfo: function(orderNo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/api/order/pay.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject,
        });
    },
    // 获取订单状态
    getPaymentStatus: function(orderNo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/api/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject,
        });
    }
};
module.exports = _payment;
