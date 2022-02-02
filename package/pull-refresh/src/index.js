import Loading from '../../loading';
import Pulling from './pulling';
import touchMixin from '../../mixins/touch';
import {
  on,
  off,
  getScroller,
  getScrollTop,
  preventDefault,
} from '../../utils/dom';
import statusMixin,
{
  STATUS_RESET,
  STATUS_PULLING,
  STATUS_REFRESHING,
  STATUS_LOSING,
  STATUS_OVER_THRESHOLD,
} from './state';

const { round } = Math;

const DEFAULT_HEADER_HEIGHT = 84;
const DEFAULT_DURATION = 400;

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
    headerPosition: {
      type: String,
      default: '',
      validator(cls) {
        return cls === 'top' || cls === '';
      },
    },
    headerHeight: {
      type: Number,
      default: DEFAULT_HEADER_HEIGHT,
    },
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
      default: DEFAULT_HEADER_HEIGHT,
    },
    duration: {
      type: Number,
      default: DEFAULT_DURATION,
    },
    overThresholdText: {
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
      return (
        <div class="omi-pull-refresh__loading">
          <Loading spinner/>{text}
        </div>
      );
    },
    showSuccess() {
      let resolve;
      const promise = new Promise((r) => { resolve = r; });
      // Use nexttick otherwise can't get slot in #slot usage？
      this.$nextTick(() => {
        const { successText, successDuration } = this;
        if (successText || this.$slots.success) {
          this.showSuccessTip = true;
          setTimeout(() => {
            resolve();
          }, successDuration);
        } else {
          resolve();
        }
      });
      return promise;
    },
    getPullingTip() {
      const { isPulling } = this;
      const pullingSlot = this.$scopedSlots.pulling;
      if (isPulling) {
        return (
          <div class="omi-pull-refresh__pulling">
            {
             (pullingSlot && pullingSlot({
               distance: this.distance,
             }))
              || <Pulling distance={this.distance} threshold={this.threshold} />
            }
            {this.pullingText}
          </div>
        );
      }
      return null;
    },
    getOverThresholdTip() {
      if (!this.isOverThreshold) return null;
      return (
        <div class="omi-pull-refresh__over-threshold">
          {this.$slots['over-threshold'] || this.getDefaultTip(this.overThresholdText)}
        </div>
      );
    },
    getRefreshTip() {
      const { refreshing, isLosing } = this;
      if (refreshing || isLosing) {
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
      if (moveY < threshold) return round(moveY);
      const isOverDistance = (moveY / threshold) >= 2;
      const resistance = isOverDistance ? 0.25 : 0.4;
      const r = isOverDistance ? 1.4 : 1;
      const s = isOverDistance ? 2 : 1;
      const distance = threshold * r + (moveY - threshold * s) * resistance;
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
      if (direction !== 'vertical' || (moveY < 0 && this.distance <= 0)) return;
      preventDefault(e);
      this.distance = Math.max(this.getDistance(moveY), 0);
      this.invokeStatus(false);
    },
    onTouchStart(e) {
      if (this.unClickable) return;
      this.reachTop = getScrollTop(this.scroller) === 0;
      if (!this.reachTop) return;
      this.touchStart(e);
      this.animateDuration = 0;
      this.isHolding = true;
    },
    onTouchEnd() {
      if (this.unClickable) return;
      this.isHolding = false;
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
    getHeader() {
      return (
        <div class={this.headerClasses} style={this.headerStyle}>
          {this.getTips()}
        </div>
      );
    },
  },
  computed: {
    headerClasses() {
      const { headerPosition } = this;
      const cls = ['omi-pull-refresh__header'];
      if (headerPosition === 'top') {
        cls.push('omi-pull-refresh__header--top');
      }
      return cls;
    },
    bodyStyles() {
      const { distance, animateDuration } = this;
      const transform = distance ? `translate3d(0, ${distance}px, 0)` : null;
      return {
        'transition-duration': `${animateDuration}ms`,
        transform,
        'will-change': transform ? 'transform' : null,
      };
    },
    headerStyle() {
      const { headerHeight } = this;
      return `height: ${headerHeight}px`;
    },
    unClickable() {
      const {
        isRefreshing,
        showSuccessTip,
        disable,
        isDone,
      } = this;
      return isRefreshing || showSuccessTip || disable || isDone;
    },
  },
  mounted() {
    if (!this.scroller) {
      this.scroller = getScroller(this.$el);
      const pullBody = this.$refs.body;
      on(this.$el, 'touchstart', this.onTouchStart, false);
      on(this.$el, 'touchmove', this.onTouchMove, false);
      on(this.$el, 'touchend', this.onTouchEnd);
      on(pullBody, 'transitionend', this.onTransitionEnd);
      if (this.refreshing) this.invokeStatus(true);
    }
  },
  beforeDestroy() {
    const pullBody = this.$refs.body;
    off(this.$el, 'touchstart', this.touchStart);
    off(this.$el, 'touchmove', this.onTouchMove);
    off(this.$el, 'touchend', this.onTouchEnd);
    off(pullBody, 'transitionend', this.onTransitionEnd);
  },
  render() {
    const headerOnTop = this.headerPosition === 'top';
    return (
      <div class="omi-pull-refresh">
        {!headerOnTop && this.getHeader()}
        <div ref="body" class="omi-pull-refresh__body" style={this.bodyStyles}>
          {headerOnTop && this.getHeader()}
          {this.$slots.default}
        </div>
      </div>
    );
  },
});

export default PullFresh();
