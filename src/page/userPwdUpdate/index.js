'use strict';

require('../common/header/index.js');
require('../common/search/index.js');
require('./index.css')
let navSide = require('../common/nav-side/index.js');
let _util = require('util/util.js');
let _user = require('service/user-service.js')

let page = {
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    // 初始化左侧菜单
    navSide.init('userPwdUpdate');
  },
  bindEvent: function() {
    let _this = this;
    //事件代理添加点击按钮提交后的动作
    $(document).on('click', '.btn-submit', function() {
      let userInfo = {
        password: $.trim($('#password').val()),
        passwordNew: $.trim($('#password-new').val()),
        passwordConfirm: $.trim($('#password-confirm').val()),
      },
      validateResult = _this.validateForm(userInfo);
      //表单验证
      if (validateResult.status) {
        //更改用户信息
        _user.updatePassword({
          passwordOld: userInfo.password,
          passwordNew: userInfo.passwordNew,
        }, function(res, msg) {
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
  //验证字段信息
  validateForm: function(formData) {
    let result = {
      status: false,
      msg: '',
    };
    if (!_util.validate(formData.password, 'require')) {
      result.msg = '原密码不能为空';
      return result;
    };
    if (!formData.passwordNew || formData.passwordNew.length < 6) {
      result.msg = '密码长度不得小于六位';
      return result;
    };
    if (formData.passwordNew !== formData.passwordConfirm) {
      result.msg = '两次输入的密码不一致';
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