<template>
  <div class="demo-tabbar">
    <omi-tabbar v-model="activeTab">
      <omi-tabbar-item icon-type="homepage" dot>主页</omi-tabbar-item>
      <omi-tabbar-item icon-type="interactive" dotText="15">消息</omi-tabbar-item>
      <omi-tabbar-item icon-type="mine" dotText="99">个人</omi-tabbar-item>
    </omi-tabbar>
  </div>
</template>

<script>
export default {
  name: 'DemoTabbar',
  data() {
    return {
      activeTab: 0,
    };
  },
};
</script>

<style>

</style>
