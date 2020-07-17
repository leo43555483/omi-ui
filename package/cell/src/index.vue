<template>
  <div class="omi-cell" :class="clickAbleClass" v-on="$listeners">
    <route-button
      :to="to"
      :replace="replace"
      :append="append"
      :href="href"
      :tag="tag"
      :event="event"
    >
      <div class="omi-cell__left--icon" v-if="renderSlot('left-icon')">
        <slot name="left-icon"></slot>
      </div>
      <div
        class="omi-cell__title"
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
      <div class="omi-cell__content" :class="contentClass" v-if="renderSlot('content') || content">
        <div class="omi-cell__content--body" :style="customContentStyles">
          <slot name="content">
            <span>{{content}}</span>
          </slot>
        </div>
        <slot name="description" />
      </div>
      <div class="omi-cell__extra" v-if="renderSlot('extra')">
        <slot name="extra"></slot>
      </div>
      <div class="omi-cell__right--icon" v-if="renderSlot('right-icon') || rightArrow">
        <slot name="right-icon">
          <icon type="enter"></icon>
        </slot>
      </div>
    </route-button>
  </div>
</template>

<script>
import Icon from '../../icon';
import RouteButton, { routeButtonProps } from '../../../src/utils/RouteButton';
import { isUnitString, getSizeString } from '../../../src/utils/shared';

const {
  to,
  append,
  tag,
  replace,
  event,
} = routeButtonProps;

export default {
  name: 'OmiCell',
  inheritAttrs: false,
  props: {
    to,
    replace,
    tag,
    event,
    append,
    href: {
      type: String,
      default: null,
    },
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
    contentClass: {
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
  components: { Icon, RouteButton },
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
        let titleWidth = null;
        if (isUnitString(this.titleWidth)) {
          titleWidth = this.titleWidth;
        } else if (/^\d+/.test(this.titleWidth)) {
          titleWidth = `${getSizeString(this.titleWidth)[0]}px`;
        }
        styles = `flex: none; width: ${titleWidth};`;
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
