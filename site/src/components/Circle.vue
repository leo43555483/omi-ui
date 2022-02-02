<template>
  <div class="demo-circle">
    <div class="demo-item">
      <p>自定义半径</p>
      <omi-circle :percentage="percentage1" :circleRadius="60"></omi-circle>
      <p>最大比率</p>
      <omi-circle :percentage="percentage" :max="60"></omi-circle>
      <p>逆时针</p>
      <omi-circle :percentage="percentage" :clockwise="false" :max="60"></omi-circle>
      <p>自定义线宽</p>
      <omi-circle :percentage="percentage" :strokeWidth="30"></omi-circle>
      <omi-circle :percentage="percentage" :strokeWidth="60"></omi-circle>
      <p>自定义颜色</p>
      <omi-circle :percentage="percentage" strokeColor="#e2583d" text="红色"></omi-circle>
      <omi-circle :percentage="percentage" strokeColor="#3de23f" text="绿色"></omi-circle>
      <omi-circle :percentage="percentage" :strokeColor="strokeColor" text="渐变色"></omi-circle>
    </div>
  </div>
</template>

<script>
import { Circle } from 'omi'
export default {
  name: 'DemoCirlce',
  data () {
    return {
      percentage: 0,
      percentage1: 80,
      strokeColor: {
        '0%': '#4ae23d',
        '100%': '#d8268c'
      }
    }
  },
  components: {
    [Circle.name]: Circle
  },
  mounted () {
    const timer = setInterval(() => {
      if (this.percentage >= 100) clearInterval(timer)
      this.percentage += 1
    }, 20)
  }
}
</script>

<style lang="scss">
.demo-circle{
  // display: flex;
  .demo-item{
    padding: 10px;
    .omi-circle{
      margin-right: 10px;
    }
  }
}
</style>
