<template>
  <div
    class="omi-loading"
    :class="wrapperClasses"
  >
    <div class="omi-loading__spinner" :style="customStyles">
      <template v-if="!spinner">
        <svg viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none"></circle>
        </svg>
      </template>
      <template v-else>
        <i v-for="(item, index) in 12" :key="item" :class="lazyClass(index+1)"></i>
      </template>
    </div>
    <div v-if="loadingText" class="omi-loading__text" :style="customColor">{{loadingText}}</div>
  </div>
</template>
<script>
import { getSizeString } from '../../../src/utils/shared';

export default {
  name: 'OmiLoading',
  data() {
    return {
      showIndex: 0,
    };
  },
  props: {
    // 内部使用
    lazyShow: {
      type: Boolean,
      default: false,
    },
    spinner: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number],
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    loadingText: {
      type: String,
      default: null,
    },
  },
  methods: {
    show(index) {
      if (!this.spinner) return;
      this.showIndex = index;
    },
    lazyClass(index) {
      if (this.lazyShow && index > this.showIndex) return 'omi-loading__item--lazy';
      return null;
    },
  },
  computed: {
    wrapperClasses() {
      const { loadingText, lazyShow } = this;
      return {
        'omi-loading__vertical': loadingText,
        'omi-loading__lazy': lazyShow,
      };
    },
    customStyles() {
      if (this.lazyShow && this.spinner) return 'animation-name: none';
      let [size] = getSizeString(this.size);
      size = size ? `width: ${size}px; height: ${size}px;` : null;
      const step = this.spinner ? 'animation-timing-function: steps(12);' : null;
      return `${size} ${this.customColor} ${step}`;
    },
    customColor() {
      return `color:${this.color};`;
    },
  },
};
</script>

<style>

</style>
