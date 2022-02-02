import { getScroller, on, off } from '../../../utils/dom';
import { throttle } from '../../../utils/shared';

const DEFAULT_DURATION = 16;
export default {
  data() {
    return {
      scoller: null,
    };
  },
  mounted() {
    if (this.scoller) return;
    this.scoller = getScroller(this.$el);
    this.scrollCallBack = throttle(this.onScroll, DEFAULT_DURATION);
    on(this.scoller, 'scroll', this.scrollCallBack);
  },
  beforeDestroy() {
    off(this.scoller, 'scroll', this.scrollCallBack);
  },
};
