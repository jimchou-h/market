'use strict';

require('./index.css');
require('../common/nav-simple/index.js');
let _user = require('service/user-service.js');

let formError = {
  show: function(errMsg) {
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide: function(errMsg) {
    $('.error-item').hide().find('.err-msg').text('');
  }
};

//page逻辑部分
let page = {
  data: {
    username: '',
    question: '',
    answer: '',
    token: '',
  },
  //初始化
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    this.loadStepUsername();
  },
  bindEvent: function() {
    var _this = this;
    //输入用户名按钮的点击
    $('#submit-username').click(function() {
      var username = $.trim($('#username').val());
      //判断用户名是否为空
      if (username) {
        _user.getQuestion(username, function(res) {
          _this.data.username = username;
          _this.data.question = res;
          _this.loadStepQuestion();
        }, function(errMsg) {
          formError.show(errMsg)
        })
      } else {
        //用户名为空
        formError.show('请输入用户名')
      };
    });
    //输入密码提示问题按钮的点击
    $('#submit-question').click(function() {
      var answer = $.trim($('#answer').val());
      //判断密码提示问题答案是否为空
      if (answer) {
        _user.checkAnswer({
          username: _this.data.username,
          question: _this.data.question,
          answer: answer,
        }, function(res) {
          _this.data.answer = answer;
          _this.data.token = res
          _this.loadStepPassword();
        }, function(errMsg) {
          formError.show(errMsg)
        })
      } else {
        //密码提示答案问题为空
        formError.show('请输入密码提示问题答案')
      };
    });
    //输入新密码按钮的点击
    $('#submit-password').click(function() {
      var password = $.trim($('#password').val());
      //判断新密码是否为空
      if (password && password.length >= 6) {
        _user.resetPassword({
          username: _this.data.username,
          passwordNew: password,
          forgetToken: _this.data.token,
        }, function(res) {
          window.location.href = './result.html?type=pass-reset';
        }, function(errMsg) {
          formError.show(errMsg)
        })
      } else {
        //密码为空
        formError.show('请输入不少于六位新密码')
      };
    });
  },
  //加载输入用户名的一步
  loadStepUsername: function() {
    $('.step-username').show();
  },
  //加载输入提示答案的一步
  loadStepQuestion: function() {
    //清除错误提示
    formError.hide();
    //做容器的切换
    $('.step-username').hide();
    $('.step-question').show().find('.question').text(this.data.question);
  },
  //加载输入新密码的一步
  loadStepPassword: function() {
    formError.hide();
    $('.step-question').hide();
    $('.step-password').show();
  },
};

$(function() {
  page.init();
})
