import { getScroller, on, off } from '../../../utils/dom.js';
import { throttle } from '../../../utils/shared.js';

var DEFAULT_DURATION = 16;
var scrollerMixin = {
  data: function data() {
    return {
      scoller: null
    };
  },
  mounted: function mounted() {
    if (this.scoller) return;
    this.scoller = getScroller(this.$el);
    this.scrollCallBack = throttle(this.onScroll, DEFAULT_DURATION);
    on(this.scoller, 'scroll', this.scrollCallBack);
  },
  beforeDestroy: function beforeDestroy() {
    off(this.scoller, 'scroll', this.scrollCallBack);
  }
};

export { scrollerMixin as default };
