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
html{
  touch-action: none;
  overflow-x: hidden;
}
body {
  background-color: #ddd;
  -webkit-text-size-adjust: none;
  max-width: 100%;
  overflow-x: hidden;
}
</style>
