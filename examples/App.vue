<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import '../src/styles/index.scss';
body {
  background-color: #ddd;
}
</style>
