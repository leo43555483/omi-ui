<template>
  <div class="switch-demo">
    <div class="demo-item">
      <p>自定义颜色</p>
      <omi-switch v-model="checked" activeColor="red"></omi-switch>
    </div>
    <div class="demo-item">
      <p>加载中</p>
      <omi-switch v-model="checked1" :loading="loading"></omi-switch>
    </div>
    <div class="demo-item">
      <p>回调控制</p>
      <omi-switch :value="checked2" @input="onSwitch" :loading="loading1"></omi-switch>
    </div>
    <div class="demo-item">
      <p>自定义尺寸</p>
      <omi-switch v-model="checked3" :size="30" activeColor="blue"></omi-switch>
      <omi-switch v-model="checked4" :size="12"></omi-switch>
    </div>
    <div class="demo-item">
      <p>禁用</p>
      <omi-switch v-model="checked5" disable></omi-switch>
    </div>
  </div>
</template>

<script>
import { Switch } from 'omi'
export default {
  name: 'DemoSwitch',
  data () {
    return {
      checked: true,
      checked1: true,
      checked2: true,
      checked3: true,
      checked4: true,
      checked5: false,
      loading: true,
      loading1: false
    }
  },
  components: {
    [Switch.name]: Switch
  },
  methods: {
    onSwitch (checked) {
      if (checked) {
        this.checked2 = checked
        return
      }
      this.loading1 = true
      setTimeout(() => {
        this.loading1 = false
        this.checked2 = checked
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.demo-item{
  padding: 16px;
  .omi-switch{
    margin-right: 16px;
    vertical-align: middle;
  }
}
</style>
