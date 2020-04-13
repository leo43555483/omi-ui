<template>
  <div class="demo-loading">
    <div class="loading-items">
      <omi-loading size="20" color="#2d8cf0" loading-text="加载中..."/>
      <omi-loading size="30" color="#2d8cf0"/>
      <omi-loading spinner color="#2d8cf0" size="30"/>
      <omi-loading spinner size="20"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoLoading',
};
</script>

<style lang="scss">
  .loading-items{
    padding: 10px;
    background-color: #fff;
    .omi-loading{
      margin: 0 10px;
    }
  }
</style>
