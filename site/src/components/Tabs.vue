<template>
  <div class="demo-tabs">
    <omi-tabs v-model="tab" animated swipleable @change="onChange">
      <omi-tabs-pane name="content1" label="tab1" dot>
        <div class="demo-tab-item">内容1</div>
      </omi-tabs-pane>
      <omi-tabs-pane name="content2" label="tab2" badgeText="16">
        <div class="demo-tab-item">内容2</div>
      </omi-tabs-pane>
      <omi-tabs-pane name="content3" label="tab3" :badgeText="100">
        <div class="demo-tab-item">内容3</div>
      </omi-tabs-pane>
      <omi-tabs-pane name="content4" label="tab4">
        <div class="demo-tab-item">内容4</div>
      </omi-tabs-pane>
      <omi-tabs-pane name="content5" label="tab5">
        <div class="demo-tab-item">内容5</div>
      </omi-tabs-pane>
    </omi-tabs>
  </div>
</template>

<script>
import { TabsPane, Tabs } from 'omi'
export default {
  name: 'DemoTabs',
  data () {
    return {
      tab: 'content2'
    }
  },
  components: {
    [TabsPane.name]: TabsPane,
    [Tabs.name]: Tabs
  },
  methods: {
    onChange (name, label) {
      console.log('name', name)
      console.log('label', label)
    }
  }
}
</script>

<style lang="scss">
.demo-tab-item {
  padding: 16px;
  background-color: #fff;
  text-align: center;
  min-height: calc(100vh - 84px);
}
</style>
