<template>
  <div
    class="omi-collapse-item omi-border__bottom"
    :aria-expanded="String(opened)"
    :class="wrapperClasses"
    tabindex="0"
  >
    <omi-cell
      :clickable="!disable"
      rightArrow titleClass="omi-collapse-item__title"
      @click="onClick"
    >
      <slot name="title">
        <span slot="title">{{title}}</span>
      </slot>
    </omi-cell>
    <transition
      name="collapse"
      @beforeEnter="onBeforeEnter"
      @enter="onEnter"
      @afterEnter="onAfterEnter"
      @beforeLeave="onBeforeLeave"
      @leave="onLeave"
    >
      <div class="omi-collapse-item__wrapper" v-show="opened">
        <div class="omi-collapse-item__inner" ref="inner">
          <slot/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { throttle } from '../../../src/utils/shared';
import { doubleAnimation } from '../../../src/utils/polyfill';

export default {
  name: 'OmiCollapseItem',
  inject: {
    parent: {
      default: null,
    },
  },
  data() {
    return {
      height: 0,
    };
  },
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    name: {
      type: [String, Number],
      default: null,
      required: true,
    },
  },
  methods: {
    fold(el) {
      el.style.height = '0';
    },
    unfold(el) {
      el.style.height = `${this.getHeight()}px`;
    },
    getHeight() {
      const { inner } = this.$refs;
      return inner.offsetHeight;
    },
    onBeforeEnter(el) {
      this.fold(el);
    },
    onEnter(el) {
      this.unfold(el);
    },
    onAfterEnter(el) {
      el.style.height = '';
    },
    onBeforeLeave(el) {
      this.unfold(el);
    },
    onLeave(el) {
      doubleAnimation(() => {
        this.fold(el);
      });
    },
    onClick: throttle(function () {
      const { opened, disable } = this;
      if (disable) return;
      this.opened = !opened;
    }),
  },
  computed: {
    wrapperHeight() {
      const { inner } = this.$refs;
      return inner.offsetHeight;
    },
    wrapperClasses() {
      const { opened, disable } = this;
      return {
        'omi-collapse-item__open': opened,
        'omi-collapse-item__disable': disable,
      };
    },
    opened: {
      get() {
        if (this.parent) {
          return this.parent.hasName(this.name);
        }
        throw new Error('[omi ui]: Cannot find parent in collapse item');
      },
      set(isOpen) {
        this.parent.open(isOpen, this.name);
      },
    },
  },
  created() {
    if (this.parent && this.parent.children) {
      this.parent.children.push(this);
    }
  },
};
</script>

<style>

</style>
