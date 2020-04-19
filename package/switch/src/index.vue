<template>
  <div
    role="switch"
    :aria-checked="value"
    class="omi-switch"
    @click="onClick"
    :class="swithClasses"
    :style="wrapperStyles"
  >
    <div class="omi-switch__node" :style="switchStyle">
      <omi-loading :size="loadingSize" v-show="loading"></omi-loading>
    </div>
  </div>
</template>

<script>
const LOADING_SIZE = 12;
export default {
  name: 'OmiSwitch',
  props: {
    size: {
      type: Number,
      default: null,
    },
    value: {
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingSize: {
      type: Number,
      default: LOADING_SIZE,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      const { disable, value } = this;
      if (disable) return;
      this.$emit('input', !value);
    },
  },
  computed: {
    swithClasses() {
      const { value, disable } = this;
      return { 'omi-switch__checked': value, 'omi-switch__disable': disable };
    },
    switchStyle() {
      const { value } = this;
      const translateX = value ? '100%' : '0';
      return `transform: translateX(${translateX})`;
    },
    wrapperStyles() {
      const { value, activeColor, size } = this;
      const styles = {
        fontSize: `${size}px`,
      };
      if (value && activeColor) styles.backgroundColor = activeColor;
      return styles;
    },
  },
};
</script>

<style>

</style>
