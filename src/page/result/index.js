'use strict';

require('./index.css');
require('../common/nav-simple/index.js');
var _util = require('util/util.js');

$(function() {
  //根据url传递过来的参数输出不同的界面信息
  var param = _util.getUrlParam('type') || 'default',
      el = $('.' + param + '-success');
  el.show();
});