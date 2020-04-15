<template>
  <i class="omi-icon-font" :class="iconClass" ></i>
</template>

<script>
export default {
  name: 'OmiIcon',
  props: {
    type: {
      type: String,
      default: null,
      required: true,
    },
    size: {
      type: [String, Number],
      default: null,
    },
  },
  computed: {
    iconSize() {
      return `font-size: ${this.size}`;
    },
    iconClass() {
      return [`omi-${this.type}`];
    },
  },
};
</script>

<style>

</style>
