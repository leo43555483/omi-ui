import { on, off, preventDefault } from '../../src/utils/dom';

const THRESH_HOLD = 0.2;
const TOUCH_DIRECTION_DEGREE = 5;
export default {
  data() {
    return {
      isMoving: false,
      scoller: null,
      transformX: 0,
      distance: 0,
      isSwiping: false,
    };
  },
  watch: {
    shouldRender(shouldRender) {
      if (shouldRender) this.bindTouchEvent();
      else this.unBindTouchEvent();
    },
  },
  methods: {
    findValidChild(index, isIncrease) {
      const child = this.children[index];
      if (!child.disabled) return index;
      if (index > 0 && index < this.children.length - 1) {
        const nextIndex = isIncrease ? index + 1 : index - 1;
        return this.findValidChild(nextIndex, isIncrease);
      }
      return -1;
    },
    setTransform(moveX) {
      const { activeIndex, children } = this;
      if ((activeIndex <= 0 && moveX >= 0)
        || ((activeIndex >= children.length - 1) && moveX <= 0)) return;
      if (!this.isMoving) this.isMoving = true;
      this.distance = this.transformX + moveX;
    },
    findNextActive(moveX, offsetX) {
      this.$nextTick(() => {
        const {
          activeIndex,
          children,
          findValidChild,
        } = this;
        const paneWidth = this.getPaneWidth();
        const thresholdWidth = paneWidth * THRESH_HOLD;
        let currentIndex = activeIndex;
        if (offsetX >= thresholdWidth) {
          if (moveX < 0 && (activeIndex < children.length - 1)) {
            currentIndex = findValidChild(activeIndex + 1);
          } else if (moveX > 0 && activeIndex > 0) {
            currentIndex = findValidChild(activeIndex - 1);
          }
          if (currentIndex !== activeIndex && currentIndex >= 0) {
            this.updateIndex(currentIndex);
          }
        }
      });
    },
    onTouchStart(e) {
      if (!this.swipleable) return;
      this.touchStart(e);
    },
    onTouchMove(e) {
      if (!this.swipleable) return;
      this.touchMove(e, TOUCH_DIRECTION_DEGREE);
      if (!this.inited) this.inited = true;
      this.isSwiping = true;
      const { direction } = this;
      const isHorizontal = direction === 'horizontal';
      if (!isHorizontal) {
        preventDefault(e);
      }
      this.setTransform(this.moveX);
    },
    onTouchEnd() {
      const { moveX, offsetX } = this;
      if (this.isMoving) {
        this.findNextActive(moveX, offsetX);
        this.isMoving = false;
      }
      this.isSwiping = false;
      this.resetTouch();
    },
    bindTouchEvent() {
      this.$nextTick(() => {
        if (!this.swipleable || this.scoller) return;
        this.scoller = this.$refs.pane;
        if (!this.scoller) return;
        on(this.scoller, 'touchstart', this.onTouchStart);
        on(this.scoller, 'touchmove', this.onTouchMove, false);
        on(this.scoller, 'touchend', this.onTouchEnd);
      });
    },
    unBindTouchEvent() {
      const { scoller } = this;
      if (scoller) {
        off(scoller, 'touchstart', this.onTouchStart);
        off(scoller, 'touchmove', this.onTouchMove);
        off(scoller, 'touchstart', this.onTouchEnd);
        this.scoller = null;
      }
    },
    getTransformString(transformX, property) {
      const willChange = this.isSwiping ? 'transform' : null;
      let styles = `
        transform: translate3d(${transformX}px, 0, 0);
        transition-property: ${property};
      `;
      if (this.isSwiping) styles += `will-change: ${willChange};`;
      return styles;
    },
    scrollPane() {
      if (!this.animated) return;
      this.$nextTick(() => {
        const { activeIndex } = this;
        const paneWidth = this.getPaneWidth();
        this.transformX = -(activeIndex * paneWidth);
      });
    },
    getPaneWidth() {
      if (this.$refs.pane) return this.$refs.pane.offsetWidth;
      return this.$el.offsetWidth;
    },
  },
  computed: {
    animatedClass() {
      const { animated, inited } = this;
      return {
        'omi-tabs__animated': animated && inited,
      };
    },
    paneStyles() {
      const {
        isMoving,
        distance,
        getTransformString,
        transformX,
        swipleable,
        animated,
      } = this;
      if (isMoving && swipleable) return getTransformString(distance, 'none');
      if (animated) return getTransformString(transformX, 'transform');
      return null;
    },
  },
  mounted() {
    this.bindTouchEvent();
  },
  beforeDestroy() {
    this.unBindTouchEvent();
  },
};
