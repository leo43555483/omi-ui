<template>
  <div class="omi-bage">
    <sup v-if="dot" class="omi-bage__dot"></sup>
    <sup v-else-if="text" class="omi-bage__text">{{text | overFlow}}</sup>
    <slot />
  </div>
</template>

<script>
const DEFAULT_MAX = 99;
export default {
  name: 'OmiBage',
  props: {
    text: {
      type: [String, Number],
      default: '',
    },
    dot: {
      type: Boolean,
      default: false,
    },
    maxNumber: {
      type: Number,
      default: DEFAULT_MAX,
    },
  },
  filters: {
    overFlow(value) {
      if (/^\d*$/.test(value) && value >= DEFAULT_MAX) {
        return '99+';
      }
      return value;
    },
  },
};
</script>
