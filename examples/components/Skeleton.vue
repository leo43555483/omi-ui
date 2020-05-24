<template>
  <div class="demo-skeleton">
    <div class="demo-item">
      <omi-skeleton :loading="loading" avatar></omi-skeleton>
    </div>
    <div class="demo-item">
      <omi-skeleton :loading="loading" :rows="5" buttonShape="square"></omi-skeleton>
    </div>
    <div class="demo-item">
      <omi-switch v-model="show"/>
      <omi-skeleton :loading="show" :rows="5" :animate="false" buttonShape="square"></omi-skeleton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoSkeleton',
  data() {
    return {
      loading: true,
      show: true,
    };
  },
};
</script>

<style lang="scss">
.demo-item{
  .omi-switch {
    margin-bottom: 16px;
  }
}
</style>
