'use strict';

require('./index.css');
require('../common/nav-simple/index.js');
let _user = require('service/user-service.js');
let _util = require('util/util.js');

let formError = {
  show: function (errMsg) {
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide: function (errMsg) {
    $('.error-item').hide().find('.err-msg').text('');
  }
};

//page逻辑部分
let page = {
  //初始化
  init: function () {
    this.bindEvent();
    this.isShowAlert();
  },
  bindEvent: function () {
    let _this = this;
    //登录按钮的点击
    $('#submit').click(function () {
      _this.submit();
    }) ;
    //如果按下回车，也进行提交
    $('.user-content').keyup(function (e) {
      if (e.keyCode === 13) {
       _this.submit(); 
      }
    });
  },
  //提交表单
  submit: function () {
    let formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val()),
    };
    //表单验证结果
    let validateResult = this.formValidate(formData);
    
    //验证成功
    if (validateResult.status) {
      _user.login(formData, function (res) {
        window.location.href = _util.getUrlParam('redirect') || './index.html';
      }, function (errMsg) {
        formError.show(errMsg);
      });
    }
    //验证失败
    else {
      formError.show(validateResult.msg);
    };
  },
  //表单字段的验证
  formValidate: function (formData) {
    let result = {
      status: false,
      msg: '',
    };
    if (!_util.validate(formData.username, 'require')) {
      result.msg = '用户名不能为空';
      return result;
    };
    if (!_util.validate(formData.password, 'require')) {
      result.msg = '密码不能为空';
      return result;
    }
    //通过验证，返回正确提示
    result.status = true;
    result.msg = '验证通过';
    return result;
  },
  isShowAlert: function () {
    if (window.location.search) {
      alert("请先进行登录后再操作");
    }
  }
};

$(function () {
  page.init();
})