<template>
  <div class="omi-cell-group">
    <div class="omi-cell-group__title" v-if="title">{{title}}</div>
    <slot />
    <div class="omi-cell-group__description" v-if="description">{{description}}</div>
  </div>
</template>

<script>
export default {
  name: 'OmiCellGroup',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>

</style>
