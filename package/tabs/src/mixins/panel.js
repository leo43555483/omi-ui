import { on, off } from '../../../../src/utils/dom';

const THRESH_HOLD = 0.2;
const TOUCH_DIRECTION_DEGREE = 45;
export default {
  data() {
    return {
      isMoving: false,
      scoller: null,
      transformX: 0,
      distance: 0,
    };
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
    getActiveChild(index) {
      const child = this.children[index];
      return this.getActiveChildInfo(child);
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
          getActiveChild,
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
            const { activeKey } = getActiveChild(currentIndex);
            this.$emit('input', activeKey);
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
      const { direction } = this;
      this.touchMove(e, TOUCH_DIRECTION_DEGREE);
      const isHorizontal = direction === 'horizontal';
      if (!isHorizontal) return;
      this.setTransform(this.moveX);
    },
    onTouchEnd() {
      const { moveX, offsetX } = this;
      if (this.isMoving) {
        this.findNextActive(moveX, offsetX);
        this.isMoving = false;
      }
      this.resetTouch();
    },
    bindTouchEvent() {
      if (!this.swipleable || this.scoller) return;
      this.scoller = this.$refs.pane;
      on(this.scoller, 'touchstart', this.onTouchStart);
      on(this.scoller, 'touchmove', this.onTouchMove);
      on(this.scoller, 'touchend', this.onTouchEnd);
    },
    getTransformString(transformX, property) {
      return `
        transform: translate3d(${transformX}px, 0, 0);
        transition-property: ${property};
      `;
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
    paneWidth() {
      const { pane } = this.$refs;
      return pane && pane.offsetWidth;
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
    const { scoller } = this;
    if (scoller) {
      off(scoller, 'touchstart', this.onTouchStart);
      off(scoller, 'touchmove', this.onTouchMove);
      off(scoller, 'touchstart', this.onTouchEnd);
    }
  },
};
