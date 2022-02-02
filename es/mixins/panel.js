import { preventDefault, on, off } from '../utils/dom.js';

var THRESH_HOLD = 0.2;
var TOUCH_DIRECTION_DEGREE = 5;
var panelMixin = {
  data: function data() {
    return {
      isMoving: false,
      scoller: null,
      transformX: 0,
      distance: 0,
      isSwiping: false
    };
  },
  watch: {
    shouldRender: function shouldRender(_shouldRender) {
      if (_shouldRender) this.bindTouchEvent();else this.unBindTouchEvent();
    }
  },
  methods: {
    findValidChild: function findValidChild(index, isIncrease) {
      var child = this.children[index];
      if (!child.disabled) return index;

      if (index > 0 && index < this.children.length - 1) {
        var nextIndex = isIncrease ? index + 1 : index - 1;
        return this.findValidChild(nextIndex, isIncrease);
      }

      return -1;
    },
    setTransform: function setTransform(moveX) {
      var activeIndex = this.activeIndex,
          children = this.children;
      if (activeIndex <= 0 && moveX >= 0 || activeIndex >= children.length - 1 && moveX <= 0) return;
      if (!this.isMoving) this.isMoving = true;
      this.distance = this.transformX + moveX;
    },
    findNextActive: function findNextActive(moveX, offsetX) {
      var _this = this;

      this.$nextTick(function () {
        var activeIndex = _this.activeIndex,
            children = _this.children,
            findValidChild = _this.findValidChild;

        var paneWidth = _this.getPaneWidth();

        var thresholdWidth = paneWidth * THRESH_HOLD;
        var currentIndex = activeIndex;

        if (offsetX >= thresholdWidth) {
          if (moveX < 0 && activeIndex < children.length - 1) {
            currentIndex = findValidChild(activeIndex + 1);
          } else if (moveX > 0 && activeIndex > 0) {
            currentIndex = findValidChild(activeIndex - 1);
          }

          if (currentIndex !== activeIndex && currentIndex >= 0) {
            _this.updateIndex(currentIndex);
          }
        }
      });
    },
    onTouchStart: function onTouchStart(e) {
      if (!this.swipleable) return;
      this.touchStart(e);
    },
    onTouchMove: function onTouchMove(e) {
      if (!this.swipleable) return;
      this.touchMove(e, TOUCH_DIRECTION_DEGREE);
      if (!this.inited) this.inited = true;
      this.isSwiping = true;
      var direction = this.direction;
      var isHorizontal = direction === 'horizontal';

      if (!isHorizontal) {
        preventDefault(e);
      }

      this.setTransform(this.moveX);
    },
    onTouchEnd: function onTouchEnd() {
      var moveX = this.moveX,
          offsetX = this.offsetX;

      if (this.isMoving) {
        this.findNextActive(moveX, offsetX);
        this.isMoving = false;
      }

      this.isSwiping = false;
      this.resetTouch();
    },
    bindTouchEvent: function bindTouchEvent() {
      var _this2 = this;

      this.$nextTick(function () {
        if (!_this2.swipleable || _this2.scoller) return;
        _this2.scoller = _this2.$refs.pane;
        if (!_this2.scoller) return;
        on(_this2.scoller, 'touchstart', _this2.onTouchStart);
        on(_this2.scoller, 'touchmove', _this2.onTouchMove, false);
        on(_this2.scoller, 'touchend', _this2.onTouchEnd);
      });
    },
    unBindTouchEvent: function unBindTouchEvent() {
      var scoller = this.scoller;

      if (scoller) {
        off(scoller, 'touchstart', this.onTouchStart);
        off(scoller, 'touchmove', this.onTouchMove);
        off(scoller, 'touchstart', this.onTouchEnd);
        this.scoller = null;
      }
    },
    getTransformString: function getTransformString(transformX, property) {
      var willChange = this.isSwiping ? 'transform' : null;
      var styles = "\n        transform: translate3d(" + transformX + "px, 0, 0);\n        transition-property: " + property + ";\n      ";
      if (this.isSwiping) styles += "will-change: " + willChange + ";";
      return styles;
    },
    scrollPane: function scrollPane() {
      var _this3 = this;

      if (!this.animated) return;
      this.$nextTick(function () {
        var activeIndex = _this3.activeIndex;

        var paneWidth = _this3.getPaneWidth();

        _this3.transformX = -(activeIndex * paneWidth);
      });
    },
    getPaneWidth: function getPaneWidth() {
      if (this.$refs.pane) return this.$refs.pane.offsetWidth;
      return this.$el.offsetWidth;
    }
  },
  computed: {
    animatedClass: function animatedClass() {
      var animated = this.animated,
          inited = this.inited;
      return {
        'omi-tabs__animated': animated && inited
      };
    },
    paneStyles: function paneStyles() {
      var isMoving = this.isMoving,
          distance = this.distance,
          getTransformString = this.getTransformString,
          transformX = this.transformX,
          swipleable = this.swipleable,
          animated = this.animated;
      if (isMoving && swipleable) return getTransformString(distance, 'none');
      if (animated) return getTransformString(transformX, 'transform');
      return null;
    }
  },
  mounted: function mounted() {
    this.bindTouchEvent();
  },
  beforeDestroy: function beforeDestroy() {
    this.unBindTouchEvent();
  }
};

export { panelMixin as default };
