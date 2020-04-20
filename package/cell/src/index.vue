<template>
  <div class="omi-cell" :class="clickAbleClass" v-on="$listeners">
    <div class="omi-cell__left--icon" v-if="renderSlot('icon-left')">
      <slot name="icon-left"></slot>
    </div>
    <div class="omi-cell__title"
      :class="titleClass"
      :style="customTitleStyles"
      v-if="renderTitle"
    >
      <slot name="title">
        <div v-if="title">{{title}}</div>
      </slot>
      <slot name="label">
        <div v-if="label" class="omi-cell__label">{{label}}</div>
      </slot>
    </div>
    <div class="omi-cell__content" v-if="renderSlot('content') || content">
      <div class="omi-cell__content--body"
        :style="customContentStyles"
        :class="cententClass">
        <slot name="content">
          <span>{{content}}</span>
        </slot>
      </div>
      <slot name="description"/>
    </div>
    <div class="omi-cell__extra" v-if="renderSlot('extra')">
      <slot name="extra"></slot>
    </div>
    <div class="omi-cell__right--icon" v-if="renderSlot('icon-right') || rightArrow">
      <slot name="icon-right">
        <omi-icon type="enter"></omi-icon>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OmiCell',
  inheritAttrs: true,
  props: {
    rightArrow: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    titleClass: {
      type: String,
      default: '',
    },
    cententClass: {
      type: String,
      default: '',
    },
    titleStyle: {
      type: String,
      default: null,
    },
    contentStyle: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    titleAlign: {
      type: String,
      default: null,
    },
    titleWidth: {
      type: [String, Number],
      default: null,
    },
    contentAlign: {
      type: String,
      default: null,
    },
  },
  methods: {
    renderSlot(name) {
      return this.$slots[name];
    },
  },
  computed: {
    renderTitle() {
      const { title, label } = this;
      const { $slots } = this;
      return title || label || $slots.title || $slots.label;
    },
    clickAbleClass() {
      const { clickable } = this;
      return clickable ? 'omi-cell__clickable' : null;
    },
    customTitleStyles() {
      if (this.titleStyle) return this.titleStyle;
      let styles = '';
      if (this.titleWidth) {
        styles = `flex: none; width: ${this.titleWidth}px;`;
      }
      return `${styles}text-align: ${this.titleAlign}`;
    },
    customContentStyles() {
      if (this.contentStyle) return this.contentStyle;
      return `text-align: ${this.contentAlign}`;
    },
  },
};
</script>

<style>

</style>
