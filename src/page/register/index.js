'use strict';

require('./index.css');
require('../common/nav-simple/index.js');
let _user = require('service/user-service.js');
let _util = require('util/util.js');

let formError = {
  show: function(errMsg) {
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide: function() {
    $('.error-item').hide().find('.err-msg').text('');
  }
};

//page逻辑部分
let page = {
  //初始化
  init: function() {
    this.bindEvent();
  },
  bindEvent: function() {
    let _this = this;
    //验证username
    $('#username').on('blur', function() {
      let username = $.trim($(this).val());
      //用户名为空return掉
      if (!username) {
        return;
      };
      //异步验证用户名是否存在
      _user.checkUsername(username, function(res) {
        formError.hide();
      }, function(errMsg) {
        formError.show(errMsg);
      });
    });
    //立即注册按钮的点击
    $('#submit').click(function() {
      _this.submit();
    });
    //如果按下回车，也进行提交
    $('.user-content').on('keyup', function(e) {
      if (e.keyCode === 13) {
        _this.submit();
      };
    })
  },
  //提交表单
  submit: function() {
    let formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val()),
      passwordConfirm: $.trim($('#password-confirm').val()),
      phone: $.trim($('#phone').val()),
      email: $.trim($('#email').val()),
      question: $.trim($('#question').val()),
      answer: $.trim($('#answer').val()),
    };
    //表单验证结果
    let validateResult = this.formValidate(formData);

    //验证成功
    if (validateResult.status) {
      _user.register(formData, function(res) {
        window.location.href = './result.html?type=register';
      }, function(errMsg) {
        formError.show(errMsg);
      });
    }
    //验证失败
    else {
      formError.show(validateResult.msg);
    };
  },
  //表单字段的验证
  formValidate: function(formData) {
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
    };
    if (formData.password.length < 6) {
      result.msg = '密码长度不能小于六位';
      return result;
    };
    if (formData.password !== formData.passwordConfirm) {
      result.msg = '两次输入的密码不一致';
      return result;
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
};

$(function() {
  page.init();
})
