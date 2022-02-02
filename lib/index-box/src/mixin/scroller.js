'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dom = require('../../../utils/dom.js');
var shared = require('../../../utils/shared.js');

var DEFAULT_DURATION = 16;
var scrollerMixin = {
  data: function data() {
    return {
      scoller: null
    };
  },
  mounted: function mounted() {
    if (this.scoller) return;
    this.scoller = dom.getScroller(this.$el);
    this.scrollCallBack = shared.throttle(this.onScroll, DEFAULT_DURATION);
    dom.on(this.scoller, 'scroll', this.scrollCallBack);
  },
  beforeDestroy: function beforeDestroy() {
    dom.off(this.scoller, 'scroll', this.scrollCallBack);
  }
};

exports["default"] = scrollerMixin;
