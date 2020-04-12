<template>
  <div class="omi-cell">
    <div class="omi-cell__title" :class="titleClass" :style="titleStyle">
      <slot name="title">
        <div>{{title}}</div>
      </slot>
      <slot name="label">
        <div v-if="label" class="omi-cell__label">{{label}}</div>
      </slot>
    </div>
    <div class="omi-cell__content" :style="contentStyle" :class="cententClass">
      <slot name="content">
        <span>{{content}}</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OmiCell',
  inheritAttrs: false,
  props: {
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
  },
};
</script>

<style>

</style>
