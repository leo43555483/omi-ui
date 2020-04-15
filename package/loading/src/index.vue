<template>
  <div class="omi-loading" :class="{'omi-loading__vertical': loadingText}">
    <div class="omi-loading__spinner" :style="customStyles">
      <template v-if="!spinner">
        <svg viewBox="28 28 46 46" class="circular">
          <circle cx="50" cy="50" r="20" fill="none"></circle>
        </svg>
      </template>
      <template v-else>
        <i v-for="item in 12" :key="item"></i>
      </template>
    </div>
    <div v-show="loadingText" class="omi-loading__text" :style="customColor">{{loadingText}}</div>
  </div>
</template>
<script>
import { getSizeString } from '../../../src/utils/shared';

export default {
  name: 'OmiLoading',
  props: {
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
  computed: {
    customStyles() {
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
