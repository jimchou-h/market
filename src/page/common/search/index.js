'use strict';

require('./index.css');
let _util = require('util/util.js');

let search = {
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    let keyword = _util.getUrlParam('keyword');
    // keyword存在就回填输入框
    if (keyword) {
      $('#search-input').val(keyword)
    }
  },
  bindEvent: function() {
    let _this = this;
    // 点击搜索按钮以后，做搜索提交
    $('#search-btn').click(function() {
      _this.searchSubmit();
    });
    // 输入回车后，做搜索提交
    $('#search-input').keyup(function(e) {
      // 13是回车键的keyCode
      if (e.keyCode === 13) {
        _this.searchSubmit();
      }
    });
  },
  //搜索的提交
  searchSubmit: function() {
    let keyword = $.trim($('#search-input').val());
    // 如果提交的时候有keyword,正常跳转到list页
    if (keyword) {
      window.location.href = './list.html?keyword=' + keyword;
    }
    // 如果keyword为空，直接返回首页
    else {
      _util.goHome();
    }
  }
}

$(function() {
  search.init()
})
