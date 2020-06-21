<template>
  <div class="omi-badge">
    <sup v-if="dot" class="omi-badge__dot"></sup>
    <sup v-else-if="text" class="omi-badge__text">{{text | overFlow}}</sup>
    <slot />
  </div>
</template>

<script>
// default max
const DEFAULT_MAX = 99;
export default {
  name: 'OmiBadge',
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
