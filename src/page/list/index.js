'use strict';

require('../common/header/index.js');
require('../common/search/index.js');
require('./index.css')
let _util = require('util/util.js');
let _product = require('service/product-service.js')
let Pagination = require('util/pagination/index.js');
let templateIndex = require('./index.string');

let page = {
  data: {
    listParam: {
      keyword: _util.getUrlParam('keyword') || '',
      categoryId: _util.getUrlParam('categoryId') || '',
      orderBy: _util.getUrlParam('orderBy') || 'default',
      pageNum: _util.getUrlParam('pageNum') || '1',
      pageSize: _util.getUrlParam('pageSize') || '20',
    }
  },
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    this.loadList();
  },
  bindEvent: function() {
    let _this = this;
    //排序的点击事件
    $('.sort-item').click(function() {
      //获取用jquery封装好的当前对象
      let $this = $(this);
      //重新排序后都将页面置于第一页
      _this.data.listParam.pageNum = 1;
      //点击默认排序
      if ($this.data('type') === 'default') {
        //已经是active样式
        if ($this.hasClass('active')) {
          return;
        }
        //其它
        else {
          $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
          _this.data.listParam.orderBy = 'default';
        }
      }
      //点击价格排序
      else if ($this.data('type') === 'price') {
        //active class的处理
        $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
        //升序，降序处理
        if (!$this.hasClass('asc')) {
          $this.addClass('asc').removeClass('desc');
          _this.data.listParam.orderBy = 'price_asc';
        } else {
          $this.addClass('desc').removeClass('asc');
          _this.data.listParam.orderBy = 'price_desc';
        }
      }
      //重新加载列表
      _this.loadList();
    })
  },
  //加载list数据
  loadList: function() {
    let _this = this,
        listHtml = '',
        listParam = this.data.listParam,
        $pListCon = $('.p-list-con')
        $pListCon.html('<div class="loading"></div>')
    // 删除参数中不必要的字段
    listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
    _product.getProductList(listParam, function(res) {
      listHtml = _util.renderHtml(templateIndex, {
        list: res.list
      });
      $pListCon.html(listHtml);
      _this.loadPagination({
        hasPreviousPage: res.hasPreviousPage,
        prePage: res.prePage,
        hasNextPage: res.hasNextPage,
        nextPage: res.nextPage,
        pageNum: res.pageNum,
        pages: res.pages,
      });
    }, function(errMsg) {
      _util.errorTips(errMsg);
    })
  },
  //加载分页信息
  loadPagination: function(pageInfo) {
    let _this = this;
    this.pagination ? '' :  (this.pagination = new Pagination());
    this.pagination.render($.extend({}, pageInfo, {
      container: $('.pagination'),
      onSelectPage: function(nrwPageNum) {
        _this.data.listParam.pageNum = nrwPageNum;
        _this.loadList();
      }
    }))
  }
};

$(function() {
  page.init();
})
