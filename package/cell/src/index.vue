<template>
  <div class="omi-cell" :class="clickAbleClass">
    <div class="omi-cell__left--icon">
      <slot name="icon-left"></slot>
    </div>
    <div class="omi-cell__title" :class="titleClass" :style="customTitleStyles">
      <slot name="title">
        <div>{{title}}</div>
      </slot>
      <slot name="label">
        <div v-if="label" class="omi-cell__label">{{label}}</div>
      </slot>
    </div>
    <div class="omi-cell__content" :style="customContentStyles" :class="cententClass">
      <div class="omi-cell__content--body">
        <slot name="content">
          <span>{{content}}</span>
        </slot>
        <div class="omi-cell__extra">
          <slot name="extra"></slot>
        </div>
        <div class="omi-cell__right--icon">
          <slot name="icon-right">
            <i class="omi-icon" v-if="showArrow">></i>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OmiCell',
  inheritAttrs: false,
  props: {
    showArrow: {
      type: Boolean,
      default: false,
    },
    clickAble: {
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
  computed: {
    clickAbleClass() {
      const { clickAble } = this;
      return clickAble ? 'omi-cell__clickable' : null;
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
