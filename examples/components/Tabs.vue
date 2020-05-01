<template>
  <div class="demo-tabs" >
    <omi-tabs v-model="tab" animated swipleable @change="onChange">
      <omi-tabs-pane label="tab1">
        <div class="demo-tab-item">内容1</div>
      </omi-tabs-pane>
      <omi-tabs-pane label="tab2">
         <div class="demo-tab-item">内容2</div>
      </omi-tabs-pane>
      <omi-tabs-pane label="tab3">
         <div class="demo-tab-item">内容3</div>
      </omi-tabs-pane>
      <omi-tabs-pane label="tab4">
         <div class="demo-tab-item">内容4</div>
      </omi-tabs-pane>
      <omi-tabs-pane label="tab5">
        <div class="demo-tab-item">内容5</div>
      </omi-tabs-pane>
    </omi-tabs>
  </div>
</template>

<script>
export default {
  name: 'DemoTabs',
  data() {
    return {
      tab: 2,
    };
  },
  methods: {
    onChange(name, label) {
      console.log('name', name);
      console.log('label', label);
    },
  },
};
</script>

<style lang="scss">
.demo-tab-item{
  padding: 16px;
  background-color: #fff;
  text-align: center;
  min-height: calc(100vh - 84px);
}
</style>
