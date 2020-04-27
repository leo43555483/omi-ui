import touchMixin from '../../mixins/touch';
import {
  on, off, getScroller, getScrollTop, preventDefault,
} from '../../../src/utils/dom';
import statusMixin, {
  STATUS_RESET, STATUS_PULLING, STATUS_REFRESHING, STATUS_LOSING, STATUS_OVER_THRESHOLD,
} from './state';

const { round } = Math;

const DEFAULT_THRESHOLD = 80;
const DEFAULT_DURATION = 350;

const PullFresh = () => ({
  name: 'OmiPullRefresh',
  mixins: [touchMixin, statusMixin],
  data() {
    return {
      distance: 0,
      scroller: null,
      reachTop: false,
      showSuccessTip: false,
      animateDuration: this.duration,
    };
  },
  model: {
    prop: 'refreshing',
  },
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    refreshing: {
      type: Boolean,
      default: false,
    },
    threshold: {
      type: Number,
      default: DEFAULT_THRESHOLD,
    },
    duration: {
      type: Number,
      default: DEFAULT_DURATION,
    },
    overTresholdText: {
      type: String,
      default: '',
    },
    successText: {
      type: String,
      default: '',
    },
    refreshingText: {
      type: String,
      default: '',
    },
    losingText: {
      type: String,
      default: '',
    },
    pullingText: {
      type: String,
      default: '',
    },
    successDuration: {
      type: Number,
      default: DEFAULT_DURATION,
    },
  },
  watch: {
    refreshing(refreshing) {
      if (refreshing) {
        this.invokeStatus(true);
      } else {
        const { status } = this;
        this[status]();
      }
    },
  },
  methods: {
    getDefaultTip(text) {
      return text;
    },
    showSuccess() {
      let resolve;
      const promise = new Promise((r) => { resolve = r; });
      const { successText, successDuration } = this;
      if (successText || this.$slots.success) {
        console.log('success');
        this.showSuccessTip = true;
        setTimeout(() => {
          resolve();
        }, successDuration);
      } else {
        resolve();
      }
      return promise;
    },
    getPullingTip() {
      const { isPulling } = this;
      if (isPulling) {
        return (this.$slots.pulling || (
          <div class="omi-pull-refresh__pulling">请下拉</div>
        ));
      }
      return null;
    },
    getOverThresholdTip() {
      if (!this.isOverThreshold) return null;
      return (
        <div class="omi-pull-refresh__over-threshold">
          {this.$slots['over-threshold'] || this.getDefaultTip(this.overTresholdText)}
        </div>
      );
    },
    getRefreshTip() {
      if (this.refreshing || this.isLosing) {
        return (
          <div class="refresh__refreshing">
            {this.$slots.refreshing || this.getDefaultTip(this.refreshingText)}
          </div>
        );
      }
      return null;
    },
    getSuccessTip() {
      if (!this.showSuccessTip) return null;

      return (
        <div class="omi-pull-refresh__success">
          {this.$slots.success || this.getDefaultTip(this.successText)}
        </div>
      );
    },
    getTips() {
      return (
        <div class="omi-pull-refresh__tip">
          {this.getPullingTip()}
          {this.getOverThresholdTip()}
          {this.getRefreshTip()}
          {this.getSuccessTip()}
        </div>
      );
    },
    getDistance(moveY) {
      const { threshold } = this;
      if (moveY <= threshold) return round(moveY);
      const distance = threshold + (moveY - threshold) / (moveY / threshold);
      return round(distance);
    },
    getStatus(touchEnd) {
      const { distance, threshold, refreshing } = this;
      if (refreshing && touchEnd) return STATUS_REFRESHING;
      if (distance === 0) return STATUS_RESET;
      if (distance < threshold) return STATUS_PULLING;
      if (touchEnd) return STATUS_LOSING;
      return STATUS_OVER_THRESHOLD;
    },
    invokeStatus(touchEnd) {
      const status = this.getStatus(touchEnd);
      if (status) this[status](touchEnd);
    },
    onTouchMove(e) {
      if (!this.reachTop || this.unClickable) return;
      this.touchMove(e);
      const { direction, moveY } = this;
      if (direction !== 'vertical' || moveY < 0) return;
      preventDefault(e);
      this.distance = this.getDistance(moveY);
      this.invokeStatus(false);
    },
    onTouchStart(e) {
      if (this.unClickable) return;
      this.reachTop = getScrollTop(this.scroller) === 0;
      if (!this.reachTop) return;
      this.touchStart(e);
      this.animateDuration = 0;
    },
    onTouchEnd() {
      if (this.unClickable) return;
      if (this.reachTop) this.invokeStatus(true);
    },
    onTransitionEnd() {
      this[STATUS_LOSING](true, true);
      this.$nextTick(() => {
        if (this.showSuccessTip) this.showSuccessTip = false;
      });
    },
    restPostion(position) {
      this.animateDuration = this.duration;
      this.distance = position;
    },
  },
  computed: {
    bodyStyles() {
      const { distance, animateDuration } = this;
      const transform = distance ? `translate3d(0, ${distance}px, 0)` : null;
      return {
        'transition-duration': `${animateDuration}ms`,
        transform,
      };
    },
    headerStyle() {
      const { threshold } = this;
      return `height: ${threshold}px`;
    },
    unClickable() {
      const { status } = this;
      return status === STATUS_REFRESHING || this.showSuccessTip || this.disable;
    },
  },
  mounted() {
    this.scroller = getScroller(this.$el);
    const pullBody = this.$refs.body;
    on(this.$el, 'touchstart', this.onTouchStart);
    on(this.$el, 'touchmove', this.onTouchMove);
    on(this.$el, 'touchend', this.onTouchEnd);
    on(pullBody, 'transitionend', this.onTransitionEnd);
  },
  beforeDestroy() {
    const pullBody = this.$refs.body;
    off(this.$el, 'touchstart', this.touchStart);
    off(this.$el, 'touchmove', this.onTouchMove);
    off(this.$el, 'touchend', this.onTouchEnd);
    off(pullBody, 'transitionend', this.onTransitionEnd);
  },
  render() {
    return (
      <div class="omi-pull-refresh">
        <div ref="body" class="omi-pull-refresh__body" style={this.bodyStyles}>
          <div class="omi-pull-refresh__header" style={this.headerStyle}>
            {this.getTips()}
          </div>
          {this.$slots.default}
        </div>
      </div>
    );
  },
});

export default PullFresh();
