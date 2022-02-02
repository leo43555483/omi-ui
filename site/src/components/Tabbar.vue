<template>
  <div class="demo-tabbar">
    <omi-tab-bar v-model="activeTab">
      <omi-tab-bar-item icon-type="homepage" name="home" dot>主页</omi-tab-bar-item>
      <omi-tab-bar-item icon-type="interactive" name="message" dotText="15">消息</omi-tab-bar-item>
      <omi-tab-bar-item icon-type="mine" name="profile" dotText="99">个人</omi-tab-bar-item>
    </omi-tab-bar>
  </div>
</template>

<script>
import { TabBarItem, TabBar } from 'omi'
export default {
  name: 'DemoTabbar',
  data () {
    return {
      activeTab: 'home'
    }
  },
  components: {
    [TabBarItem.name]: TabBarItem,
    [TabBar.name]: TabBar
  }
}
</script>

<style>

</style>
