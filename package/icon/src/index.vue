<template>
  <i class="omi-icon-font" :class="iconClass" :style="iconSize"></i>
</template>

<script>
export default {
  name: 'OmiIcon',
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
    size: {
      type: [String, Number],
      default: null,
    },
  },
  computed: {
    iconSize() {
      return `font-size: ${this.size}px`;
    },
    iconClass() {
      return [`omi-${this.type}`];
    },
  },
};
</script>

<style>

</style>
