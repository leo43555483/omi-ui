<template>
  <div class="demo-radio">
    <div class="demo-item">
      <omi-radio-group v-model="result">
        <omi-radio prop="a" disable active-color="red"><span>选我</span></omi-radio>
        <omi-radio prop="b" ><span>选我！</span></omi-radio>
        <omi-radio prop="c"><span>选我！！</span></omi-radio>
        <omi-radio prop="d"><span>选我！！！</span></omi-radio>
      </omi-radio-group>
    </div>
  </div>
</template>

<script>
import { RadioGroup, Radio } from 'omi'
export default {
  name: 'DemoRadio',
  data () {
    return {
      result: 'a'
    }
  },
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  }
}
</script>

<style lang="scss">
.demo-radio{
  .demo-item{
    background-color:#fff
  }
}
</style>
