<template>
  <div class="demo-tabbar">
    <omi-tabbar v-model="activeTab">
      <omi-tabbar-item icon-type="homepage" name="home" dot>主页</omi-tabbar-item>
      <omi-tabbar-item icon-type="interactive" name="message" dotText="15">消息</omi-tabbar-item>
      <omi-tabbar-item icon-type="mine" name="profile" dotText="99">个人</omi-tabbar-item>
    </omi-tabbar>
  </div>
</template>

<script>
export default {
  name: 'DemoTabbar',
  data() {
    return {
      activeTab: 'home',
    };
  },
};
</script>

<style>

</style>
