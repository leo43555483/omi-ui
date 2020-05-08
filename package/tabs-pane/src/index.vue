<template>
  <div class="omi-tabs-panel" role="tabpanel" :style="panelStyle">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'OmiTabsPane',
  inject: {
    tabsParent: {
      default: null,
    },
  },
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
    parent() {
      return this.tabsParent;
    },
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
  mounted() {
    if (!this.parent) {
      throw new Error('tabs-pane must be wrapped by tabs');
    }
    this.parent.add(this);
  },
  beforeDestroy() {
    if (this.parent) {
      this.parent.remove(this);
    }
  },
};
</script>
