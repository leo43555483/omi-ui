import '../../loading/index.js';
import Pulling from './pulling.js';
import touchMixin from '../../mixins/touch.js';
import { preventDefault, getScrollTop, getScroller, on, off } from '../../utils/dom.js';
import statusMixin, { STATUS_REFRESHING, STATUS_RESET, STATUS_PULLING, STATUS_LOSING, STATUS_OVER_THRESHOLD } from './state.js';
import Loading from '../../loading/src/index.vue.js';

var round = Math.round;
var DEFAULT_HEADER_HEIGHT = 84;
var DEFAULT_DURATION = 400;

var PullFresh = function PullFresh() {
  return {
    name: 'OmiPullRefresh',
    mixins: [touchMixin, statusMixin],
    data: function data() {
      return {
        distance: 0,
        scroller: null,
        reachTop: false,
        showSuccessTip: false,
        animateDuration: this.duration
      };
    },
    model: {
      prop: 'refreshing'
    },
    props: {
      headerPosition: {
        type: String,
        default: '',
        validator: function validator(cls) {
          return cls === 'top' || cls === '';
        }
      },
      headerHeight: {
        type: Number,
        default: DEFAULT_HEADER_HEIGHT
      },
      disable: {
        type: Boolean,
        default: false
      },
      refreshing: {
        type: Boolean,
        default: false
      },
      threshold: {
        type: Number,
        default: DEFAULT_HEADER_HEIGHT
      },
      duration: {
        type: Number,
        default: DEFAULT_DURATION
      },
      overThresholdText: {
        type: String,
        default: ''
      },
      successText: {
        type: String,
        default: ''
      },
      refreshingText: {
        type: String,
        default: ''
      },
      losingText: {
        type: String,
        default: ''
      },
      pullingText: {
        type: String,
        default: ''
      },
      successDuration: {
        type: Number,
        default: DEFAULT_DURATION
      }
    },
    watch: {
      refreshing: function refreshing(_refreshing) {
        if (_refreshing) {
          this.invokeStatus(true);
        } else {
          var status = this.status;
          this[status]();
        }
      }
    },
    methods: {
      getDefaultTip: function getDefaultTip(text) {
        var h = this.$createElement;
        return h("div", {
          "class": "omi-pull-refresh__loading"
        }, [h(Loading, {
          "attrs": {
            "spinner": true
          }
        }), text]);
      },
      showSuccess: function showSuccess() {
        var _this = this;

        var resolve;
        var promise = new Promise(function (r) {
          resolve = r;
        }); // Use nexttick otherwise can't get slot in #slot usage？

        this.$nextTick(function () {
          var successText = _this.successText,
              successDuration = _this.successDuration;

          if (successText || _this.$slots.success) {
            _this.showSuccessTip = true;
            setTimeout(function () {
              resolve();
            }, successDuration);
          } else {
            resolve();
          }
        });
        return promise;
      },
      getPullingTip: function getPullingTip() {
        var h = this.$createElement;
        var isPulling = this.isPulling;
        var pullingSlot = this.$scopedSlots.pulling;

        if (isPulling) {
          return h("div", {
            "class": "omi-pull-refresh__pulling"
          }, [pullingSlot && pullingSlot({
            distance: this.distance
          }) || h(Pulling, {
            "attrs": {
              "distance": this.distance,
              "threshold": this.threshold
            }
          }), this.pullingText]);
        }

        return null;
      },
      getOverThresholdTip: function getOverThresholdTip() {
        var h = this.$createElement;
        if (!this.isOverThreshold) return null;
        return h("div", {
          "class": "omi-pull-refresh__over-threshold"
        }, [this.$slots['over-threshold'] || this.getDefaultTip(this.overThresholdText)]);
      },
      getRefreshTip: function getRefreshTip() {
        var h = this.$createElement;
        var refreshing = this.refreshing,
            isLosing = this.isLosing;

        if (refreshing || isLosing) {
          return h("div", {
            "class": "refresh__refreshing"
          }, [this.$slots.refreshing || this.getDefaultTip(this.refreshingText)]);
        }

        return null;
      },
      getSuccessTip: function getSuccessTip() {
        var h = this.$createElement;
        if (!this.showSuccessTip) return null;
        return h("div", {
          "class": "omi-pull-refresh__success"
        }, [this.$slots.success || this.getDefaultTip(this.successText)]);
      },
      getTips: function getTips() {
        var h = this.$createElement;
        return h("div", {
          "class": "omi-pull-refresh__tip"
        }, [this.getPullingTip(), this.getOverThresholdTip(), this.getRefreshTip(), this.getSuccessTip()]);
      },
      getDistance: function getDistance(moveY) {
        var threshold = this.threshold;
        if (moveY < threshold) return round(moveY);
        var isOverDistance = moveY / threshold >= 2;
        var resistance = isOverDistance ? 0.25 : 0.4;
        var r = isOverDistance ? 1.4 : 1;
        var s = isOverDistance ? 2 : 1;
        var distance = threshold * r + (moveY - threshold * s) * resistance;
        return round(distance);
      },
      getStatus: function getStatus(touchEnd) {
        var distance = this.distance,
            threshold = this.threshold,
            refreshing = this.refreshing;
        if (refreshing && touchEnd) return STATUS_REFRESHING;
        if (distance === 0) return STATUS_RESET;
        if (distance < threshold) return STATUS_PULLING;
        if (touchEnd) return STATUS_LOSING;
        return STATUS_OVER_THRESHOLD;
      },
      invokeStatus: function invokeStatus(touchEnd) {
        var status = this.getStatus(touchEnd);
        if (status) this[status](touchEnd);
      },
      onTouchMove: function onTouchMove(e) {
        if (!this.reachTop || this.unClickable) return;
        this.touchMove(e);
        var direction = this.direction,
            moveY = this.moveY;
        if (direction !== 'vertical' || moveY < 0 && this.distance <= 0) return;
        preventDefault(e);
        this.distance = Math.max(this.getDistance(moveY), 0);
        this.invokeStatus(false);
      },
      onTouchStart: function onTouchStart(e) {
        if (this.unClickable) return;
        this.reachTop = getScrollTop(this.scroller) === 0;
        if (!this.reachTop) return;
        this.touchStart(e);
        this.animateDuration = 0;
        this.isHolding = true;
      },
      onTouchEnd: function onTouchEnd() {
        if (this.unClickable) return;
        this.isHolding = false;
        if (this.reachTop) this.invokeStatus(true);
      },
      onTransitionEnd: function onTransitionEnd() {
        var _this2 = this;

        this[STATUS_LOSING](true, true);
        this.$nextTick(function () {
          if (_this2.showSuccessTip) _this2.showSuccessTip = false;
        });
      },
      restPostion: function restPostion(position) {
        this.animateDuration = this.duration;
        this.distance = position;
      },
      getHeader: function getHeader() {
        var h = this.$createElement;
        return h("div", {
          "class": this.headerClasses,
          "style": this.headerStyle
        }, [this.getTips()]);
      }
    },
    computed: {
      headerClasses: function headerClasses() {
        var headerPosition = this.headerPosition;
        var cls = ['omi-pull-refresh__header'];

        if (headerPosition === 'top') {
          cls.push('omi-pull-refresh__header--top');
        }

        return cls;
      },
      bodyStyles: function bodyStyles() {
        var distance = this.distance,
            animateDuration = this.animateDuration;
        var transform = distance ? "translate3d(0, " + distance + "px, 0)" : null;
        return {
          'transition-duration': animateDuration + "ms",
          transform: transform,
          'will-change': transform ? 'transform' : null
        };
      },
      headerStyle: function headerStyle() {
        var headerHeight = this.headerHeight;
        return "height: " + headerHeight + "px";
      },
      unClickable: function unClickable() {
        var isRefreshing = this.isRefreshing,
            showSuccessTip = this.showSuccessTip,
            disable = this.disable,
            isDone = this.isDone;
        return isRefreshing || showSuccessTip || disable || isDone;
      }
    },
    mounted: function mounted() {
      if (!this.scroller) {
        this.scroller = getScroller(this.$el);
        var pullBody = this.$refs.body;
        on(this.$el, 'touchstart', this.onTouchStart, false);
        on(this.$el, 'touchmove', this.onTouchMove, false);
        on(this.$el, 'touchend', this.onTouchEnd);
        on(pullBody, 'transitionend', this.onTransitionEnd);
        if (this.refreshing) this.invokeStatus(true);
      }
    },
    beforeDestroy: function beforeDestroy() {
      var pullBody = this.$refs.body;
      off(this.$el, 'touchstart', this.touchStart);
      off(this.$el, 'touchmove', this.onTouchMove);
      off(this.$el, 'touchend', this.onTouchEnd);
      off(pullBody, 'transitionend', this.onTransitionEnd);
    },
    render: function render() {
      var h = arguments[0];
      var headerOnTop = this.headerPosition === 'top';
      return h("div", {
        "class": "omi-pull-refresh"
      }, [!headerOnTop && this.getHeader(), h("div", {
        "ref": "body",
        "class": "omi-pull-refresh__body",
        "style": this.bodyStyles
      }, [headerOnTop && this.getHeader(), this.$slots.default])]);
    }
  };
};

var PullFresh$1 = PullFresh();

export { PullFresh$1 as default };
