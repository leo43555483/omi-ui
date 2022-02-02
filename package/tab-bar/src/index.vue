<template>
  <div class="omi-tabbar" :style="styles">
    <slot />
  </div>
</template>

<script>
import providerMixin from '../../mixins/provider';

const DEFAULT_ITEM_INDEX = 0;
export default {
  name: 'OmiTabBar',
  mixins: [providerMixin('omiTabBar')],
  props: {
    value: {
      type: [String, Number],
      default: DEFAULT_ITEM_INDEX,
    },
    iconSize: {
      type: Number,
      default: null,
    },
    activeColor: {
      type: String,
      default: null,
    },
    zIndex: {
      type: Number,
      default: null,
    },
  },
  methods: {
    getCildIndex(child) {
      return this.children.indexOf(child);
    },
    setActive(activeIndex) {
      this.$emit('input', activeIndex);
      this.$emit('change', activeIndex);
    },
    isActiveItem(childIndex) {
      return childIndex === this.value;
    },
  },
  computed: {
    styles() {
      return {
        zIndex: this.zIndex,
      };
    },
  },
};
</script>
