<template>
  <div class="omi-tabs-panel" role="tabpanel" :style="panelStyle">
    <slot />
  </div>
</template>

<script>
import injectMixin from '../../mixins/inject';

export default {
  name: 'OmiTabsPane',
  mixins: [injectMixin('tabsParent')],
  props: {
    dot: {
      type: Boolean,
      default: false,
    },
    bageText: {
      type: [String, Number],
      default: '',
    },
    bageMaxNumber: {
      type: Number,
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: [String, Number],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    show() {
      const { parent, tabName } = this;
      if (!parent) return false;
      return parent.activeKey === tabName;
    },
    panelStyle() {
      const { parent } = this;
      if (!parent || parent.swipleable || parent.animated) return null;
      const show = this.show ? null : 'display: none';
      return show;
    },
    getIndex() {
      if (!this.parent) return -1;
      return this.parent.children.indexOf(this);
    },
    tabName() {
      const { name, getIndex } = this;
      return name !== null ? name : getIndex;
    },
  },
};
</script>
