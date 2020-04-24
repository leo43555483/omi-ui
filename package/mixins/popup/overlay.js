import Vue from 'vue';
import VueOverlay, { overLayProps } from '../../overlay';
import {
  on, off, preventDefault,
} from '../../../src/utils/dom';
import touchMixin from '../touch';

let lockCount = 0;
const getProps = (model, props) => {
  const result = {};
  for (const key in model) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      result[key] = props[key];
    }
  }
  return result;
};
export default {
  mixins: [touchMixin],
  props: {
    ...overLayProps,
  },
  methods: {
    ontouchMove(e) {
      this.touchMove(e);
      const { direction } = this;
      if (!direction) return;
      const { moveY, moveX } = this;
      const {
        scrollHeight,
        scrollTop,
        offsetHeight,
        scrollWidth,
        scrollLeft,
        offsetWidth,
      } = this.$el;
      const isVertical = direction === 'vertical';
      let reachTop = false;
      let reachBottom = false;
      let reachLeft = false;
      let reachRight = false;
      if (scrollTop <= 0) reachTop = true;
      if (scrollLeft <= 0) reachLeft = true;
      if (scrollTop + offsetHeight >= scrollHeight) reachBottom = true;
      if (scrollLeft + offsetWidth >= scrollWidth) reachRight = true;
      if (isVertical && ((reachTop && moveY > 0) || (reachBottom && moveY < 0))) {
        preventDefault(e);
      } else if (!isVertical && ((reachLeft && moveX > 0) || (reachRight && moveX < 0))) {
        preventDefault(e);
      }
    },
    mountOverlay() {
      const OverlayConstructor = Vue.extend(VueOverlay());
      const el = document.createElement('div');
      const Overlay = new OverlayConstructor({ el });
      Object.assign(Overlay, getProps(overLayProps, this));
      this.portal(Overlay.$el);
      Overlay.setZindex(this.getZindex);
      Overlay.$on('clickOverlay', () => {
        if (this.clickClose) {
          this.close();
        }
      });
      if (this.lockScroll) {
        on(document, 'touchstart', this.touchStart, false);
        on(document, 'touchmove', this.ontouchMove, false);
        if (!lockCount) {
          document.body.classList.add('omi-no-scroll');
        }
        lockCount += 1;
      }
      return Overlay;
    },
    unlockScroll() {
      if (this.lockScroll) {
        off(document, 'touchstart', this.onTouchstart);
        off(document, 'touchmove', this.ontouchMove);
        if (lockCount > 0) lockCount -= 1;
        document.body.classList.remove('omi-no-scroll');
      }
    },
    destroyOverlay() {
      const { overlay } = this;
      if (overlay && overlay.$el) {
        this.overlay.show = false;
        this.$nextTick(() => {
          this.unLoadImmediately(overlay);
          this.overlay = null;
        });
      }
      this.unlockScroll();
    },
  },
};
