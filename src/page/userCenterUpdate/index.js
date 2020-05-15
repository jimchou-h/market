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
    this.bindEvent();
  },
  onLoad: function() {
    // 初始化左侧菜单
    navSide.init('userCenter');
    // 加载用户信息
    this.loadUserInfo();
  },
  bindEvent: function() {
    let _this = this;
    //事件代理添加点击按钮提交后的动作
    $(document).on('click', '.btn-submit', function() {
      let userInfo = {
        phone: $.trim($('#phone').val()),
        email: $.trim($('#email').val()),
        question: $.trim($('#question').val()),
        answer: $.trim($('#answer').val()),
      },
      validateResult = _this.validateForm(userInfo);
      //表单验证
      if (validateResult.status) {
        //更改用户信息
        _user.updateUserInfo(userInfo, function(res, msg) {
          _util.successTips(msg);
          window.location.href = './userCenter.html';
        }, function(errMsg) {
          _util.errorTips(errMsg);
        });
      }
      else {
        _util.errorTips(validateResult.msg);
      }
    })
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
  },
  //验证字段信息
  validateForm: function(formData) {
    let result = {
      status: false,
      msg: '',
    };
    if (!_util.validate(formData.phone, 'phone')) {
      result.msg = '手机格式不正确';
      return result;
    };
    if (!_util.validate(formData.email, 'email')) {
      result.msg = '邮箱格式不正确';
      return result;
    };
    if (!_util.validate(formData.question, 'require')) {
      result.msg = '问题提示问题不能为空';
      return result;
    };
    if (!_util.validate(formData.answer, 'require')) {
      result.msg = '问题提示问题答案不能为空';
      return result;
    };
    //通过验证，返回正确提示
    result.status = true;
    result.msg = '验证通过';
    return result;
  }
}

$(function() {
  page.init();
})