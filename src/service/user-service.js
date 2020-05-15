'use strict';

var _util = require('util/util.js');
var _user = {
  register: function(userInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/api/user/register.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject,
    });
  },
  login: function(userInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/api/user/login.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject,
    });
  },
  logout: function(resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/api/user/logout.do'),
      method: 'POST',
      success: resolve,
      error: reject,
    });
  },
  //检验用户名
  checkUsername: function(username, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/api/user/check_valid.do'),
      data: {
        type: 'username',
        str: username
      },
      method: 'POST',
      success: resolve,
      error: reject,
    });
  },
  //检查登陆状态(获取用户基本信息)
  checkLogin: function(resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/api/user/get_user_info.do'),
      method: 'POST',
      success: resolve,
      error: reject,
    });
  },
  //获取密码提示问题
  getQuestion: function(username, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/api/user/forget_get_question.do'),
      data: {
        username: username
      },
      method: 'POST',
      success: resolve,
      error: reject,
    });
  },
  //获取用户密码提示问题的答案
  checkAnswer: function(userInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/api/user/forget_check_answer.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject,
    });
  },
  // 重置密码
  resetPassword: function(userInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/api/user/forget_reset_password.do'),
      data: userInfo,
      dataType: 'json',
      method: 'POST',
      success: resolve,
      error: reject,
    });
  },
  //获取用户详细信息
  getUserInfo: function(resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/api/user/get_information.do'),
      method: 'POST',
      success: resolve,
      error: reject,
    });
  },
  //修改个人信息
  updateUserInfo: function(userInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/api/user/update_information.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject,
    });
  },
  //重置密码信息
  updatePassword: function(passwordInfo, resolve, reject) {
    _util.request({
      url: _util.getServerUrl('/api/user/reset_password.do'),
      data: passwordInfo,
      method: 'POST',
      success: resolve,
      error: reject,
    });
  }
};
module.exports = _user;
