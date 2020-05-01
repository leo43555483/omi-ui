<template>
  <div class="omi-nav-bar omi-border__bottom">
    <div class="omi-nav-bar__left" @click="(e) => onClick(e, 'clickLeft')">
      <slot name="left-icon">
        <omi-icon type="return"  v-if="showLeftArrow"/>
      </slot>
      <span class="omi-nav-bar__left--text">{{left}}</span>
    </div>
    <div class="omi-nav-bar__middle">{{title}}</div>
    <div class="omi-nav-bar__right" @click="(e) => onClick(e, 'clickRight')">
      <slot name="right">{{right}}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    showLeftArrow: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
    },
    right: {
      type: String,
    },
    left: {
      type: String,
    },
  },
  methods: {
    onClick(e, type) {
      this.$emit(type, e);
    },
  },
};
</script>

<style>
</style>
