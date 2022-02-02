<template>
  <div class="demo-rate">
    <div class="demo-item">
      <div>半星</div>
      <omi-rate v-model="rate" halfRate />
    </div>
    <div class="demo-item">
      <div>全星</div>
      <omi-rate v-model="rate2" />
    </div>
    <div class="demo-item">
      <div>只读</div>
      <omi-rate v-model="rate3" readonly/>
    </div>
    <div class="demo-item">
      <div>自定义尺寸</div>
      <omi-rate v-model="rate4" :size="32"/>
    </div>
    <div class="demo-item">
      <div>自定义颜色</div>
      <omi-rate v-model="rate5" fillColor="#35d3c1"/>
    </div>
  </div>
</template>
<script>
import { Rate } from 'omi'

export default {
  name: 'DemoRate',
  data () {
    return {
      rate: 3,
      rate2: 3,
      rate3: 3,
      rate4: 3,
      rate5: 3
    }
  },
  components: {
    [Rate.name]: Rate
  }
}
</script>

<style>

</style>
