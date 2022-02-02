<template>
  <div class="omi-index-box__wrapper" @touchend="onTouchEnd">
    <ul
      class="omi-index-box__list"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
    >
      <li class="omi-index-box__tip" v-show="isShowIndexTip">{{currentIndex}}</li>
      <li
        ref="indexItem"
        class="omi-index-box__item"
        v-for="char in indexs"
        :class="{'omi-index-box__active': char === currentIndex}"
        :key="char"
        :data-index="char"
        @touchstart="onTouchStart"
      >{{char}}</li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
import touchMixin from '../../mixins/touch';
import providerMixin from '../../mixins/provider';
import scrollerMixin from './mixin/scroller';
import {
  getScrollTop,
  getBoundingClientRect,
  getRootPageYOffset,
} from '../../utils/dom';
import { getCharacter } from '../../utils/shared';

export default {
  name: 'OmiIndexBox',
  data() {
    return {
      currentIndex: null,
      active: false,
      touching: false,
      anchorIndex: null,
    };
  },
  mixins: [touchMixin, scrollerMixin, providerMixin('omiIndexBox')],
  props: {
    fixAnchor: {
      type: Boolean,
      default: true,
    },
    indexs: {
      type: Array,
      default: getCharacter,
    },
    showIndexTip: {
      type: Boolean,
      default: () => true,
    },
  },
  watch: {
    touching(touching) {
      if (touching) {
        document.body.classList.add('omi-index-box__touching');
      } else {
        document.body.classList.remove('omi-index-box__touching');
      }
    },
  },
  computed: {
    isShowIndexTip() {
      const { showIndexTip, currentIndex, active } = this;
      return showIndexTip && currentIndex !== null && active;
    },
  },
  methods: {
    getPoint(e) {
      if (e.touches) return e.touches[0];
      return e;
    },
    onTouchStart(e) {
      e.stopPropagation();
      this.touchStart(e);
      this.scrollIntoView(e);
      this.touching = true;
    },
    onTouchMove(e) {
      this.touchMove(e);
      e.preventDefault();
      const { direction } = this;
      if (direction === 'vertical') {
        this.scrollIntoView(e);
      }
    },
    onTouchEnd() {
      this.resetStatus();
    },
    onScroll() {
      const { getOffsetTop, children } = this;
      const scollerViewTop = getBoundingClientRect(this.scoller).top;
      const scrollTop = getScrollTop(this.scoller);
      const anchorsOffset = children.map((anchor) => {
        const offsetTop = getOffsetTop(anchor.$el, scollerViewTop, scrollTop);
        return { offsetTop };
      });
      const anchorIndex = this.getActiveAnchor(anchorsOffset, scrollTop);
      this.anchorIndex = anchorIndex;
      // no anchor index found
      if (anchorIndex === -1) {
        this.resetActiveIndex();
        return;
      }
      const currentIndex = this.indexs[anchorIndex];
      this.currentIndex = currentIndex;
      if (this.fixAnchor) {
        this.updateAnchor(anchorIndex, anchorsOffset, scollerViewTop, scrollTop);
      }
    },
    resetStatus() {
      this.active = false;
      this.touching = false;
    },
    resetActiveIndex() {
      // reset current index
      if (this.currentIndex !== null) {
        if (this.fixAnchor) {
          const activeAnchorIndex = this.indexs.indexOf(this.currentIndex);
          this.children[activeAnchorIndex].reset();
        }
        this.currentIndex = null;
      } else {
        this.children.forEach((anchor) => {
          if (anchor.active) anchor.reset();
        });
      }
    },
    getActiveAnchor(anchorsOffset, scrollTop) {
      const { children } = this;
      // eslint-disable-next-line no-plusplus
      for (let i = children.length - 1; i >= 0; i--) {
        const preHeight = i > 0 ? children[i - 1].height : 0;
        const reachTop = this.fixAnchor ? preHeight : 0;
        const top = anchorsOffset[i].offsetTop;
        if (top <= scrollTop + reachTop) return i;
      }
      return -1;
    },
    getOffsetTop(el, scollerViewTop, scrollTop) {
      const { scoller } = this;
      const elViewTop = el.getBoundingClientRect().top;
      if (scoller === window || scoller === document.body) {
        if (el === window) return 0;
        return elViewTop + getRootPageYOffset();
      }
      return elViewTop - scollerViewTop + scrollTop;
    },
    updateAnchor(anchorIndex, anchorsOffset, scollerViewTop, scrollTop) {
      const curIndex = this.indexs[anchorIndex];
      const preIndex = this.indexs[anchorIndex - 1];
      this.children.forEach((anchor) => {
        const { index } = anchor;
        if (index !== curIndex || index !== preIndex) anchor.reset();
      });

      const activeAnchorEle = this.children[anchorIndex];
      const offsetTop = anchorsOffset[anchorIndex].offsetTop - scrollTop;
      if (anchorIndex > 0) {
        const preAnchorEle = this.children[anchorIndex - 1];
        if (offsetTop > 0) {
          const preHeight = preAnchorEle.height;
          preAnchorEle.update({ top: offsetTop - preHeight + scollerViewTop });
        } else {
          preAnchorEle.reset();
        }
      }
      activeAnchorEle.update({ top: Math.max(0, offsetTop) + scollerViewTop });
    },
    getSelectElement(e, isClick) {
      if (isClick) return e.target;
      const { clientX, clientY } = this.getPoint(e);
      return document.elementFromPoint(clientX, clientY);
    },
    scrollIntoView(e, isClick = false) {
      const indexElement = this.getSelectElement(e, isClick);
      if (!indexElement || !this.isIndexEle(indexElement)) return;
      const { index } = indexElement.dataset;
      if (this.currentIndex !== index) {
        this.currentIndex = index;
        const activeAnchor = this.children.filter((anchor) => anchor.index === index);
        this.scrollTo(activeAnchor[0]);
      }
      this.active = true;
      this.$emit('select', index);
    },
    isIndexEle(child) {
      return this.$refs.indexItem.some((item) => item === child);
    },
    scrollTo(vnode) {
      if (vnode) {
        vnode.$el.scrollIntoView();
      }
    },
  },
};
</script>
