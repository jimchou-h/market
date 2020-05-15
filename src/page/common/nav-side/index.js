'use strict';

require('./index.css');

let navSide = {
  navItems: [{
      index: 1,
      name: 'userCenter'
    },
    {
      index: 2,
      name: 'orderList'
    },
    {
      index: 3,
      name: 'userPwdUpdate'
    },
    {
      index: 4,
      name: 'about'
    },
  ],
  init: function(name) {
    //求得应该改变样式的li标签并修改
    for (let i = 0; i < this.navItems.length - 1; i++) {
      if (name === this.navItems[i].name) {
        let index = this.navItems[i].index;
        $(`.nav-side li:nth-child(${index}) a`).attr("class", "select")
      }
    }
  },
}

module.exports = navSide;
